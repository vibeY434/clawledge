#!/usr/bin/env node

/**
 * Review Submissions Script
 *
 * Reads pending submissions from Google Sheet and displays them for review.
 * Claude runs this in each session to process new submissions.
 *
 * Usage:
 *   node scripts/review-submissions.mjs              # List pending submissions
 *   node scripts/review-submissions.mjs --approve ID  # Approve & import a submission (by row index)
 *   node scripts/review-submissions.mjs --reject ID   # Reject a submission (by row index)
 *   node scripts/review-submissions.mjs --stats        # Show submission stats
 */

import { google } from "googleapis";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const USE_CASES_PATH = join(ROOT, "src", "data", "use-cases.json");
const CREDS_PATH = join(ROOT, "Google Cloud Console", "clawledge-283a0ec4dba8.json");

const SHEET_ID = "1EpRMH2yluGaiveu3fQNUG_-ApTfOMHwKiBgLsx-j3H4";

// Column mapping (0-indexed): A=Timestamp, B=Title, C=Description, D=Name, E=Contact,
// F=URL, G=Category, H=Difficulty, I=Cost, J=Skills, K=Monetizable, L=Attribution, M=Status

async function getAuth() {
  // Try local credentials file first, fall back to env vars
  try {
    const creds = JSON.parse(readFileSync(CREDS_PATH, "utf-8"));
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: creds.client_email,
        private_key: creds.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch {
    // Fall back to environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error("❌ No credentials found. Place the JSON in 'Google Cloud Console/' or set env vars.");
      process.exit(1);
    }
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
}

async function getSheetData(sheets) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Tabellenblatt1!A:M",
  });
  return res.data.values || [];
}

async function updateStatus(sheets, rowIndex, status) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Tabellenblatt1!M${rowIndex + 1}`, // +1 because sheets are 1-indexed
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[status]] },
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function rowToUseCase(row) {
  const [timestamp, title, description, name, contact, url, category, difficulty, cost, skills, monetizable] = row;

  const id = slugify(title);
  const validCategories = [
    "productivity", "development", "content-creation", "money-making",
    "smart-home", "research", "finance", "health", "communication",
    "creative", "crypto", "freelancer", "wild"
  ];
  const validDifficulties = ["beginner", "intermediate", "advanced"];

  return {
    id,
    title: title.trim(),
    impactScore: 5,
    description: description.trim(),
    fullContent: description.trim(),
    category: validCategories.includes(category) ? category : "wild",
    tags: skills
      ? skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
      : [],
    difficulty: validDifficulties.includes(difficulty) ? difficulty : "beginner",
    estimatedSetupTime: "Unknown",
    source: {
      type: url ? "community" : "community",
      url: url || "",
      author: name.trim(),
      authorHandle: contact.trim(),
      date: new Date(timestamp).toISOString().split("T")[0],
      quote: "",
    },
    requirements: ["OpenClaw / Clawdbot setup"],
    monthlyApiCost: cost || "Unknown",
    monetizable: monetizable === "Yes",
    revenueEstimate: monetizable === "Yes" ? "Unknown" : undefined,
    verified: false,
    dateAdded: new Date().toISOString().split("T")[0],
    featured: false,
    relatedSkills: skills
      ? skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
      : [],
    relatedRepos: [],
  };
}

async function main() {
  const args = process.argv.slice(2);
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const rows = await getSheetData(sheets);

  if (rows.length <= 1) {
    console.log("📭 No submissions found in the sheet.");
    return;
  }

  const dataRows = rows.slice(1); // Skip header row

  if (args[0] === "--stats") {
    const pending = dataRows.filter((r) => r[12] === "pending").length;
    const approved = dataRows.filter((r) => r[12] === "approved").length;
    const rejected = dataRows.filter((r) => r[12] === "rejected").length;
    console.log("📊 Submission Statistics");
    console.log("═".repeat(40));
    console.log(`Total:    ${dataRows.length}`);
    console.log(`Pending:  ${pending}`);
    console.log(`Approved: ${approved}`);
    console.log(`Rejected: ${rejected}`);
    return;
  }

  if (args[0] === "--approve" && args[1]) {
    const rowIdx = parseInt(args[1], 10);
    if (isNaN(rowIdx) || rowIdx < 1 || rowIdx > dataRows.length) {
      console.error(`❌ Invalid row index. Use 1-${dataRows.length}`);
      return;
    }
    const row = dataRows[rowIdx - 1];
    if (row[12] !== "pending") {
      console.error(`⚠️  Row ${rowIdx} is already "${row[12]}", not pending.`);
      return;
    }

    // Convert to use case and add to JSON
    const useCase = rowToUseCase(row);
    const useCases = JSON.parse(readFileSync(USE_CASES_PATH, "utf-8"));

    // Check for duplicate ID
    if (useCases.some((uc) => uc.id === useCase.id)) {
      console.error(`⚠️  Use case with ID "${useCase.id}" already exists. Skipping.`);
      return;
    }

    useCases.push(useCase);
    writeFileSync(USE_CASES_PATH, JSON.stringify(useCases, null, 2) + "\n");

    // Update sheet status
    await updateStatus(sheets, rowIdx, "approved"); // rowIdx is 1-based, +1 for header = rowIdx+1 in sheet
    console.log(`✅ Approved & imported: "${row[1]}"`);
    console.log(`   ID: ${useCase.id}`);
    console.log(`   Category: ${useCase.category}`);
    console.log(`   Added to use-cases.json (${useCases.length} total)`);
    return;
  }

  if (args[0] === "--reject" && args[1]) {
    const rowIdx = parseInt(args[1], 10);
    if (isNaN(rowIdx) || rowIdx < 1 || rowIdx > dataRows.length) {
      console.error(`❌ Invalid row index. Use 1-${dataRows.length}`);
      return;
    }
    const row = dataRows[rowIdx - 1];
    await updateStatus(sheets, rowIdx, "rejected");
    console.log(`🚫 Rejected: "${row[1]}"`);
    return;
  }

  // Default: list pending submissions
  const pending = dataRows
    .map((row, i) => ({ row, idx: i + 1 }))
    .filter(({ row }) => row[12] === "pending");

  if (pending.length === 0) {
    console.log("✅ No pending submissions to review.");
    return;
  }

  console.log(`📥 ${pending.length} Pending Submission(s)`);
  console.log("═".repeat(60));

  for (const { row, idx } of pending) {
    const [timestamp, title, desc, name, contact, url, category, difficulty, cost, skills, monetizable] = row;
    console.log(`\n[${idx}] ${title}`);
    console.log(`    By: ${name} (${contact})`);
    console.log(`    Category: ${category || "—"}  |  Difficulty: ${difficulty || "—"}  |  Cost: ${cost || "—"}`);
    console.log(`    URL: ${url || "—"}`);
    console.log(`    Skills: ${skills || "—"}`);
    console.log(`    Monetizable: ${monetizable}  |  Submitted: ${new Date(timestamp).toLocaleDateString()}`);
    console.log(`    Description: ${desc.slice(0, 120)}${desc.length > 120 ? "..." : ""}`);
  }

  console.log("\n" + "═".repeat(60));
  console.log("Commands:");
  console.log("  --approve N  →  Import submission N into use-cases.json");
  console.log("  --reject N   →  Mark submission N as rejected");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
