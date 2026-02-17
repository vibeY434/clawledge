#!/usr/bin/env node
/**
 * add-cases.mjs — Merge pending cases into use-cases.json
 *
 * Usage:
 *   node scripts/add-cases.mjs                    # Process all scripts/pending/*.json
 *   node scripts/add-cases.mjs --file path.json   # Process a specific file
 *   echo '[{...}]' | node scripts/add-cases.mjs --stdin   # Read from stdin
 *   node scripts/add-cases.mjs --dry-run          # Preview without writing
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, renameSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";
import { applyDefaults, validateCase, buildDedupIndex, isDuplicate } from "./lib/schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/data/use-cases.json");
const PENDING_DIR = resolve(__dirname, "pending");
const DONE_DIR = resolve(PENDING_DIR, "done");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const fromStdin = args.includes("--stdin");
const fileIdx = args.indexOf("--file");
const specificFile = fileIdx !== -1 ? args[fileIdx + 1] : null;

// ─── Load pending cases ──────────────────────────────────────

let pendingCases = [];
let processedFiles = [];

if (fromStdin) {
  // Read from stdin
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const input = Buffer.concat(chunks).toString("utf-8").trim();
  if (input) {
    try {
      const parsed = JSON.parse(input);
      pendingCases = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error("❌ Invalid JSON from stdin:", e.message);
      process.exit(1);
    }
  }
} else if (specificFile) {
  // Read specific file
  const p = resolve(specificFile);
  try {
    pendingCases = JSON.parse(readFileSync(p, "utf-8"));
    if (!Array.isArray(pendingCases)) pendingCases = [pendingCases];
    processedFiles.push(p);
  } catch (e) {
    console.error(`❌ Cannot read ${p}:`, e.message);
    process.exit(1);
  }
} else {
  // Read all *.json from pending/
  if (!existsSync(PENDING_DIR)) {
    console.log("No scripts/pending/ directory. Nothing to process.");
    process.exit(0);
  }
  const files = readdirSync(PENDING_DIR).filter(f => f.endsWith(".json"));
  if (files.length === 0) {
    console.log("No pending files found in scripts/pending/. Nothing to process.");
    process.exit(0);
  }
  for (const f of files) {
    const p = resolve(PENDING_DIR, f);
    try {
      const data = JSON.parse(readFileSync(p, "utf-8"));
      const arr = Array.isArray(data) ? data : [data];
      pendingCases.push(...arr);
      processedFiles.push(p);
    } catch (e) {
      console.error(`⚠️  Skipping ${f}: ${e.message}`);
    }
  }
}

if (pendingCases.length === 0) {
  console.log("No cases to add.");
  process.exit(0);
}

// ─── Load existing data & dedup ──────────────────────────────

const existing = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
const index = buildDedupIndex(existing);

let added = 0;
let skippedDupe = 0;
let skippedInvalid = 0;
const addedByCategory = {};
const newCases = [];

for (const raw of pendingCases) {
  // Apply defaults first
  const c = applyDefaults(raw);

  // Validate
  const { valid, errors } = validateCase(c);
  if (!valid) {
    console.error(`⚠️  Invalid: "${c.title || "untitled"}" — ${errors.join(", ")}`);
    skippedInvalid++;
    continue;
  }

  // Dedup
  const dup = isDuplicate(c, index);
  if (dup.duplicate) {
    skippedDupe++;
    continue;
  }

  // Auto-generate fullContent if missing
  if (!c.fullContent || c.fullContent.length < 20) {
    const author = c.source?.author || "A user";
    const handle = c.source?.authorHandle ? ` (${c.source.authorHandle})` : "";
    c.fullContent = [
      `${author}${handle} shared their OpenClaw setup.`,
      "",
      `## Overview`,
      "",
      c.description,
      "",
      `## Setup`,
      "",
      `**Requirements:** ${c.requirements.join(", ")}`,
      "",
      `**Estimated setup time:** ${c.estimatedSetupTime}`,
      `**Monthly API cost:** ${c.monthlyApiCost}`,
      "",
      `## Source`,
      "",
      `[Original post](${c.source.url})`,
    ].join("\n");
  }

  // Add to index (prevent self-duplication within batch)
  index.byUrl.add((c.source?.url || "").toLowerCase().replace(/\/$/, ""));
  index.byId.add(c.id);

  newCases.push(c);
  addedByCategory[c.category] = (addedByCategory[c.category] || 0) + 1;
  added++;
}

// ─── Write results ───────────────────────────────────────────

if (added === 0) {
  console.log(`No new cases to add (${skippedDupe} duplicates, ${skippedInvalid} invalid).`);
  process.exit(0);
}

if (dryRun) {
  console.log(`\n[DRY RUN] Would add ${added} cases:`);
  for (const c of newCases) console.log(`  - ${c.id}: ${c.title} [${c.category}]`);
  console.log(`\nSkipped: ${skippedDupe} duplicates, ${skippedInvalid} invalid`);
  process.exit(0);
}

// Append and write
existing.push(...newCases);
writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");

// Move processed files to done/
if (processedFiles.length > 0) {
  mkdirSync(DONE_DIR, { recursive: true });
  for (const f of processedFiles) {
    const dest = resolve(DONE_DIR, basename(f));
    try { renameSync(f, dest); } catch { /* ignore if stdin */ }
  }
}

// ─── Report ──────────────────────────────────────────────────

console.log(`\n✅ Added ${added} cases to use-cases.json`);
console.log(`Total cases: ${existing.length}`);
if (skippedDupe) console.log(`Skipped: ${skippedDupe} duplicates`);
if (skippedInvalid) console.log(`Skipped: ${skippedInvalid} invalid`);
console.log(`\nBy category:`);
for (const [cat, n] of Object.entries(addedByCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: +${n}`);
}
