#!/usr/bin/env node
/**
 * stats.mjs — Quick statistics for clawledge data. Zero token cost.
 *
 * Usage:
 *   node scripts/stats.mjs            # Full report with bar charts
 *   node scripts/stats.mjs --brief    # One-line summary
 *   node scripts/stats.mjs --json     # Machine-readable JSON
 *   node scripts/stats.mjs --authors  # Show top authors (power users)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const cases = JSON.parse(readFileSync(resolve(ROOT, "src/data/use-cases.json"), "utf-8"));
const repos = JSON.parse(readFileSync(resolve(ROOT, "src/data/repositories.json"), "utf-8"));

const args = process.argv.slice(2);
const flag = args[0];

// ─── Compute stats ───────────────────────────────────────────

const totalCases = cases.length;
const totalRepos = repos.length;
const verified = cases.filter(c => c.verified).length;
const featured = cases.filter(c => c.featured).length;
const monetizable = cases.filter(c => c.monetizable).length;

// By category
const byCat = {};
for (const c of cases) byCat[c.category] = (byCat[c.category] || 0) + 1;
const catEntries = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
const categories = catEntries.length;

// By source type
const bySrc = {};
for (const c of cases) {
  const t = c.source?.type || "unknown";
  bySrc[t] = (bySrc[t] || 0) + 1;
}
const srcEntries = Object.entries(bySrc).sort((a, b) => b[1] - a[1]);

// By author (power users)
const byAuthor = {};
for (const c of cases) {
  const handle = c.source?.authorHandle || c.source?.author || "unknown";
  if (!byAuthor[handle]) byAuthor[handle] = [];
  byAuthor[handle].push(c.id);
}
const authorEntries = Object.entries(byAuthor)
  .filter(([, ids]) => ids.length >= 2)
  .sort((a, b) => b[1].length - a[1].length);

// Date range
const dates = cases.map(c => c.dateAdded).filter(Boolean).sort();
const dateRange = dates.length ? `${dates[0]} to ${dates[dates.length - 1]}` : "n/a";

// ─── Output ──────────────────────────────────────────────────

if (flag === "--brief") {
  console.log(`${totalCases} cases, ${categories} cats, ${verified} verified, ${totalRepos} repos`);
  process.exit(0);
}

if (flag === "--json") {
  console.log(JSON.stringify({
    totalCases, totalRepos, categories, verified, featured, monetizable,
    byCategory: byCat, bySource: bySrc,
    powerUsers: authorEntries.map(([h, ids]) => ({ handle: h, count: ids.length })),
    dateRange,
  }, null, 2));
  process.exit(0);
}

// Full report
const today = new Date().toISOString().slice(0, 10);
const bar = (n, max) => "█".repeat(Math.round((n / max) * 20));
const maxCat = catEntries[0]?.[1] || 1;

console.log(`
Clawledge Stats — ${today}
${"═".repeat(40)}
Total: ${totalCases} cases | ${totalRepos} repos | ${categories} categories
Verified: ${verified}/${totalCases} (${Math.round(verified/totalCases*100)}%) | Featured: ${featured} | Monetizable: ${monetizable} (${Math.round(monetizable/totalCases*100)}%)
Date range: ${dateRange}

By category:`);

for (const [cat, n] of catEntries) {
  console.log(`  ${cat.padEnd(20)} ${String(n).padStart(3)} ${bar(n, maxCat)}`);
}

console.log("\nBy source type:");
for (const [src, n] of srcEntries) {
  console.log(`  ${src.padEnd(14)} ${String(n).padStart(3)} (${Math.round(n/totalCases*100)}%)`);
}

if (flag === "--authors" || !flag) {
  if (authorEntries.length > 0) {
    console.log(`\nPower Users (2+ cases) — prioritize for weekly check:`);
    for (const [handle, ids] of authorEntries.slice(0, 20)) {
      console.log(`  ${handle.padEnd(25)} ${ids.length} cases`);
    }
  }
}

// Warnings
const emptyCats = [];
for (const cat of ["productivity","development","content-creation","money-making","smart-home","research","finance","health","communication","creative","crypto","freelancer","wild"]) {
  if (!byCat[cat]) emptyCats.push(cat);
}
if (emptyCats.length > 0) {
  console.log(`\n⚠️  Empty categories: ${emptyCats.join(", ")}`);
}

const unverified = cases.filter(c => !c.verified);
if (unverified.length > 0) {
  console.log(`\n⚠️  ${unverified.length} unverified cases`);
}
