#!/usr/bin/env node
/**
 * collector-template.mjs
 *
 * PREPARATION ONLY:
 * This file is a template/skeleton and intentionally does not perform
 * live collection yet.
 *
 * Planned usage (future):
 *   node scripts/collect/collector-template.mjs --date 2026-02-22
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", "..");
const SOURCES_PATH = resolve(__dirname, "sources.json");
const INBOX_DIR = resolve(ROOT, "scripts", "inbox");

function loadSources() {
  return JSON.parse(readFileSync(SOURCES_PATH, "utf-8"));
}

function getTargetDate(args) {
  const idx = args.indexOf("--date");
  return idx !== -1 ? args[idx + 1] : new Date().toISOString().slice(0, 10);
}

function buildRunManifest(date, sources) {
  return {
    date,
    status: "prepared-only",
    note: "No live collection executed. This is a scaffold for future implementation.",
    plannedCollectors: ["xQueries", "xProfiles", "githubSearches", "webSources"],
    sourceCounts: {
      xQueries: sources.xQueries?.length || 0,
      xProfiles: sources.xProfiles?.length || 0,
      githubSearches: sources.githubSearches?.length || 0,
      webSources: sources.webSources?.length || 0
    },
    candidates: []
  };
}

function main() {
  const args = process.argv.slice(2);
  const date = getTargetDate(args);
  const sources = loadSources();

  const manifest = buildRunManifest(date, sources);

  mkdirSync(INBOX_DIR, { recursive: true });
  const out = resolve(INBOX_DIR, `${date}.prepared.json`);
  writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n", "utf-8");

  console.log("Prepared collection scaffold written:");
  console.log(`  ${out}`);
  console.log("No external requests were made.");
}

main();
