#!/usr/bin/env node
/**
 * import-excel.mjs — Parse multi-sheet Excel file into pending cases.
 *
 * Handles free-form sheets (copy-pasted from different LLMs).
 * Each sheet can have different column layouts — the script detects
 * URL columns, title/description columns, and category columns heuristically.
 *
 * Usage:
 *   node scripts/import-excel.mjs                           # Default: ./openclawusecases.xlsx
 *   node scripts/import-excel.mjs path/to/file.xlsx         # Custom path
 *   node scripts/import-excel.mjs --dry-run                 # Preview without writing
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";
import { resolveCategory, applyDefaults, validateCase, buildDedupIndex, isDuplicate } from "./lib/schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/data/use-cases.json");
const PENDING_DIR = resolve(__dirname, "pending");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const customPath = args.find(a => a.endsWith(".xlsx") || a.endsWith(".xls"));
const excelPath = customPath ? resolve(customPath) : resolve(ROOT, "openclawusecases.xlsx");

if (!existsSync(excelPath)) {
  console.error(`❌ Excel file not found: ${excelPath}`);
  process.exit(1);
}

// ─── Load existing data for dedup ────────────────────────────

const existing = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
const dedupIndex = buildDedupIndex(existing);

// ─── Parse Excel ─────────────────────────────────────────────

const workbook = XLSX.readFile(excelPath);
const allCases = [];
const sheetReports = [];

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  if (rows.length < 2) {
    sheetReports.push({ name: sheetName, rows: 0, parsed: 0, note: "empty or header-only" });
    continue;
  }

  // ─── Detect column layout ───────────────────────────────

  const headerRow = rows[0].map(String);
  const colMap = detectColumns(headerRow, rows);

  if (colMap.url === -1 && colMap.title === -1) {
    // Try treating as single-column (e.g. grok format: all text in one column)
    const singleColCases = parseSingleColumn(rows, sheetName);
    allCases.push(...singleColCases);
    sheetReports.push({ name: sheetName, rows: rows.length - 1, parsed: singleColCases.length, note: "single-column" });
    continue;
  }

  let parsed = 0;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every(cell => !cell)) continue; // skip empty rows

    const c = extractCase(row, colMap, sheetName);
    if (c) {
      allCases.push(c);
      parsed++;
    }
  }
  sheetReports.push({ name: sheetName, rows: rows.length - 1, parsed, note: "multi-column" });
}

// ─── Dedup and validate ──────────────────────────────────────

const validCases = [];
let dupes = 0;
let invalid = 0;

for (const raw of allCases) {
  const c = applyDefaults(raw);
  const { valid, errors } = validateCase(c);
  if (!valid) {
    invalid++;
    continue;
  }
  const dup = isDuplicate(c, dedupIndex);
  if (dup.duplicate) {
    dupes++;
    continue;
  }
  // Add to index to prevent intra-batch dupes
  dedupIndex.byUrl.add((c.source?.url || "").toLowerCase().replace(/\/$/, ""));
  dedupIndex.byId.add(c.id);
  validCases.push(c);
}

// ─── Output ──────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);
const outFile = resolve(PENDING_DIR, `excel-${today}.json`);

console.log(`\nExcel Import Summary`);
console.log(`${"─".repeat(40)}`);
console.log(`File: ${excelPath}`);
console.log(`Sheets:`);
for (const r of sheetReports) {
  console.log(`  ${r.name.padEnd(15)} ${r.rows} rows → ${r.parsed} parsed (${r.note})`);
}
console.log(`\nTotal parsed:   ${allCases.length}`);
console.log(`Valid new cases: ${validCases.length}`);
console.log(`Duplicates:      ${dupes}`);
console.log(`Invalid:         ${invalid}`);

if (validCases.length === 0) {
  console.log(`\nNo new cases to add.`);
  process.exit(0);
}

if (dryRun) {
  console.log(`\n[DRY RUN] Would write ${validCases.length} cases:`);
  for (const c of validCases) console.log(`  - ${c.title} [${c.category}]`);
  process.exit(0);
}

mkdirSync(PENDING_DIR, { recursive: true });
writeFileSync(outFile, JSON.stringify(validCases, null, 2));
console.log(`\n✅ Output: ${outFile} (${validCases.length} cases)`);
console.log(`Next: run "node scripts/add-cases.mjs" to merge into use-cases.json`);

// ─── Column detection ────────────────────────────────────────

function detectColumns(headers, rows) {
  const map = { title: -1, url: -1, author: -1, category: -1, description: -1, difficulty: -1, cost: -1, tags: -1 };

  // Try header-based detection
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase().trim();
    if (h.match(/^(title|name|use.?case|projekt|titel)$/i)) map.title = i;
    else if (h.match(/^(url|link|source|quelle|href)$/i)) map.url = i;
    else if (h.match(/^(author|user|creator|verfasser|handle)$/i)) map.author = i;
    else if (h.match(/^(category|kategorie|cat|typ|type)$/i)) map.category = i;
    else if (h.match(/^(desc|description|beschreibung|summary|zusammenfassung)$/i)) map.description = i;
    else if (h.match(/^(difficulty|schwierigkeit|level)$/i)) map.difficulty = i;
    else if (h.match(/^(cost|kosten|price|preis|api.?cost)$/i)) map.cost = i;
    else if (h.match(/^(tags?|labels?|stichworte?)$/i)) map.tags = i;
  }

  // Fallback: detect by cell content patterns in first few data rows
  if (map.url === -1 || map.title === -1) {
    const sample = rows.slice(1, Math.min(6, rows.length));
    for (let col = 0; col < (rows[0]?.length || 0); col++) {
      const vals = sample.map(r => String(r[col] || "")).filter(Boolean);
      if (vals.length === 0) continue;

      // URL column: most values start with http
      if (map.url === -1 && vals.filter(v => v.startsWith("http")).length >= vals.length * 0.5) {
        map.url = col;
        continue;
      }

      // Category column: values match known categories
      if (map.category === -1 && vals.filter(v => resolveCategory(v) !== null).length >= vals.length * 0.5) {
        map.category = col;
        continue;
      }

      // Title column: longest text column that isn't URL or category
      if (map.title === -1 && col !== map.url && col !== map.category) {
        const avgLen = vals.reduce((s, v) => s + v.length, 0) / vals.length;
        if (avgLen > 10 && avgLen < 200) {
          map.title = col;
        }
      }
    }
  }

  // If we still don't have a title, use the first non-URL, non-category column
  if (map.title === -1) {
    for (let col = 0; col < (rows[0]?.length || 0); col++) {
      if (col !== map.url && col !== map.category) {
        map.title = col;
        break;
      }
    }
  }

  return map;
}

function extractCase(row, colMap, sheetName) {
  const get = (idx) => idx >= 0 && idx < row.length ? String(row[idx] || "").trim() : "";

  const title = get(colMap.title);
  const url = get(colMap.url);
  const author = get(colMap.author);
  const category = get(colMap.category);
  const description = get(colMap.description);

  // Need at least a title or URL
  if (!title && !url) return null;

  const resolved = resolveCategory(category) || guessCategoryFromContent(title + " " + description);

  return {
    title: title || "Untitled Case",
    description: description || title || "",
    category: resolved,
    source: {
      url: url || "",
      author: author || sheetName || "Unknown",
    },
  };
}

function parseSingleColumn(rows, sheetName) {
  // For sheets like grok: all content in one column, separated by empty rows
  const cases = [];
  let current = [];

  for (let i = 1; i < rows.length; i++) {
    const text = String(rows[i][0] || "").trim();
    if (!text) {
      if (current.length > 0) {
        const c = parseFreeText(current.join("\n"), sheetName);
        if (c) cases.push(c);
        current = [];
      }
      continue;
    }
    current.push(text);
  }
  if (current.length > 0) {
    const c = parseFreeText(current.join("\n"), sheetName);
    if (c) cases.push(c);
  }

  return cases;
}

function parseFreeText(text, sheetName) {
  // Extract URL from text
  const urlMatch = text.match(/https?:\/\/[^\s)]+/);
  const url = urlMatch ? urlMatch[0] : "";

  // First line is usually the title
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  let title = lines[0].replace(/^\d+[\.\)]\s*/, "").replace(/\*\*/g, "").trim();
  if (title.length > 120) title = title.slice(0, 117) + "...";
  if (title.length < 3) return null;

  const description = lines.slice(1, 3).join(" ").replace(/https?:\/\/[^\s)]+/g, "").trim();
  const category = guessCategoryFromContent(text);

  return {
    title,
    description: description || title,
    category,
    source: {
      url,
      author: sheetName || "Unknown",
    },
  };
}

function guessCategoryFromContent(text) {
  const t = text.toLowerCase();
  const scores = {
    development: ["code", "developer", "github", "api", "build", "deploy", "debug", "programming"],
    productivity: ["automat", "workflow", "task", "calendar", "schedule", "organize", "notion"],
    "money-making": ["revenue", "income", "monetiz", "earning", "sell", "saas", "business"],
    "smart-home": ["home assistant", "smart home", "iot", "raspberry", "sensor", "light", "thermostat"],
    "content-creation": ["blog", "content", "write", "newsletter", "social media", "post", "youtube"],
    freelancer: ["invoice", "freelanc", "client", "billing", "contract", "solopreneur", "accounting"],
    crypto: ["crypto", "trading", "defi", "blockchain", "nft", "token", "wallet"],
    health: ["health", "fitness", "workout", "medical", "sleep", "nutrition", "exercise"],
    finance: ["finance", "budget", "expense", "tax", "bank", "invest", "portfolio"],
    research: ["research", "paper", "study", "academic", "science", "analysis"],
    communication: ["email", "slack", "telegram", "whatsapp", "message", "notification", "chat"],
    creative: ["music", "art", "design", "video", "photo", "creative", "animation"],
    wild: ["crazy", "wild", "hack", "experiment", "tinder", "dating"],
  };

  let best = "productivity";
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(scores)) {
    const score = keywords.filter(k => t.includes(k)).length;
    if (score > bestScore) { bestScore = score; best = cat; }
  }
  return best;
}
