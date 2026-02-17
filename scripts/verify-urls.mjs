#!/usr/bin/env node
/**
 * verify-urls.mjs — URL health checker for clawledge cases
 *
 * Usage:
 *   node scripts/verify-urls.mjs                  # Check all use-cases.json
 *   node scripts/verify-urls.mjs --pending        # Check only pending files
 *   node scripts/verify-urls.mjs --id crypto      # Check cases matching ID pattern
 *   node scripts/verify-urls.mjs --fix            # Set broken cases to verified:false
 *   node scripts/verify-urls.mjs --authors        # Show power user X profiles to check
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/data/use-cases.json");
const PENDING_DIR = resolve(__dirname, "pending");

const args = process.argv.slice(2);
const pendingOnly = args.includes("--pending");
const fixMode = args.includes("--fix");
const showAuthors = args.includes("--authors");
const idIdx = args.indexOf("--id");
const idPattern = idIdx !== -1 ? args[idIdx + 1] : null;

// Known hosts that block HEAD requests
const BLOCKED_HOSTS = ["x.com", "twitter.com", "instagram.com", "facebook.com", "linkedin.com"];

// ─── Load cases ──────────────────────────────────────────────

let cases = [];
let sourceFile = DATA_PATH;

if (pendingOnly) {
  if (!existsSync(PENDING_DIR)) {
    console.log("No scripts/pending/ directory.");
    process.exit(0);
  }
  const files = readdirSync(PENDING_DIR).filter(f => f.endsWith(".json"));
  for (const f of files) {
    try {
      const data = JSON.parse(readFileSync(resolve(PENDING_DIR, f), "utf-8"));
      cases.push(...(Array.isArray(data) ? data : [data]));
    } catch { /* skip */ }
  }
  sourceFile = null;
} else {
  cases = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
}

if (idPattern) {
  cases = cases.filter(c => c.id?.includes(idPattern));
}

if (cases.length === 0) {
  console.log("No cases to check.");
  process.exit(0);
}

// ─── Power Users mode ────────────────────────────────────────

if (showAuthors) {
  const allCases = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const byAuthor = {};
  for (const c of allCases) {
    const handle = c.source?.authorHandle || c.source?.author || "unknown";
    if (!byAuthor[handle]) byAuthor[handle] = { count: 0, urls: new Set() };
    byAuthor[handle].count++;
    // Extract X profile URL from source URL if it's an x-post
    if (c.source?.type === "x-post" && c.source?.url) {
      const m = c.source.url.match(/x\.com\/([^/]+)/);
      if (m) byAuthor[handle].urls.add(`https://x.com/${m[1]}`);
    }
  }

  const powerUsers = Object.entries(byAuthor)
    .filter(([, d]) => d.count >= 2)
    .sort((a, b) => b[1].count - a[1].count);

  console.log(`\nPower Users — Check these X profiles for new posts:\n`);
  for (const [handle, data] of powerUsers) {
    const profileUrls = [...data.urls];
    const profileStr = profileUrls.length > 0 ? ` → ${profileUrls[0]}` : "";
    console.log(`  ${handle.padEnd(25)} ${data.count} cases${profileStr}`);
  }
  process.exit(0);
}

// ─── Check URLs ──────────────────────────────────────────────

console.log(`\nChecking ${cases.length} URLs...\n`);

const results = { ok: 0, redirect: 0, blocked: 0, gone: 0, timeout: 0, error: 0 };
const broken = [];
const redirected = [];

// Process in batches of 5
const BATCH_SIZE = 5;
const TIMEOUT = 10000;

for (let i = 0; i < cases.length; i += BATCH_SIZE) {
  const batch = cases.slice(i, i + BATCH_SIZE);

  const promises = batch.map(async (c) => {
    const url = c.source?.url;
    if (!url) {
      results.error++;
      broken.push({ id: c.id, url: "(missing)", status: "NO_URL" });
      return;
    }

    // Check if host is known to block
    try {
      const host = new URL(url).hostname.replace("www.", "");
      if (BLOCKED_HOSTS.some(h => host.includes(h))) {
        // Try oEmbed for X/Twitter
        if (host.includes("x.com") || host.includes("twitter.com")) {
          try {
            const oembed = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
            const r = await fetch(oembed, { signal: AbortSignal.timeout(TIMEOUT) });
            if (r.ok) { results.ok++; return; }
            if (r.status === 404) {
              results.gone++;
              broken.push({ id: c.id, url, status: "404 (oEmbed)" });
              return;
            }
          } catch { /* fall through to blocked */ }
        }
        results.blocked++;
        return;
      }
    } catch {
      results.error++;
      broken.push({ id: c.id, url, status: "INVALID_URL" });
      return;
    }

    // Normal HEAD request
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT);
      const r = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ClawledgeBot/1.0)" }
      });
      clearTimeout(timer);

      if (r.ok) {
        // Check for redirect
        if (r.url && r.url !== url && new URL(r.url).pathname !== new URL(url).pathname) {
          results.redirect++;
          redirected.push({ id: c.id, from: url, to: r.url });
        } else {
          results.ok++;
        }
      } else if (r.status === 403 || r.status === 429) {
        results.blocked++;
      } else if (r.status === 404 || r.status === 410) {
        results.gone++;
        broken.push({ id: c.id, url, status: String(r.status) });
      } else {
        results.error++;
        broken.push({ id: c.id, url, status: String(r.status) });
      }
    } catch (e) {
      if (e.name === "AbortError" || e.name === "TimeoutError") {
        results.timeout++;
        broken.push({ id: c.id, url, status: "TIMEOUT" });
      } else {
        results.error++;
        broken.push({ id: c.id, url, status: e.code || e.message });
      }
    }
  });

  await Promise.all(promises);

  // Rate limit delay between batches
  if (i + BATCH_SIZE < cases.length) {
    await new Promise(r => setTimeout(r, 200));
  }

  // Progress
  const done = Math.min(i + BATCH_SIZE, cases.length);
  process.stdout.write(`\r  ${done}/${cases.length} checked...`);
}

// ─── Report ──────────────────────────────────────────────────

console.log(`\n\nURL Verification Report`);
console.log(`${"─".repeat(40)}`);
console.log(`OK: ${results.ok} | Redirect: ${results.redirect} | Blocked: ${results.blocked} | Gone: ${results.gone} | Timeout: ${results.timeout} | Error: ${results.error}`);

if (broken.length > 0) {
  console.log(`\n❌ BROKEN (${broken.length}):`);
  for (const b of broken) {
    console.log(`  ${b.id} → ${b.status} ${b.url}`);
  }
}

if (redirected.length > 0) {
  console.log(`\n↪️  REDIRECTED (${redirected.length}):`);
  for (const r of redirected) {
    console.log(`  ${r.id}`);
    console.log(`    from: ${r.from}`);
    console.log(`    to:   ${r.to}`);
  }
}

// ─── Fix mode ────────────────────────────────────────────────

if (fixMode && broken.length > 0 && sourceFile) {
  const allCases = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const brokenIds = new Set(broken.map(b => b.id));
  let fixed = 0;
  for (const c of allCases) {
    if (brokenIds.has(c.id) && c.verified) {
      c.verified = false;
      fixed++;
    }
  }
  if (fixed > 0) {
    writeFileSync(DATA_PATH, JSON.stringify(allCases, null, 2) + "\n");
    console.log(`\n🔧 Set ${fixed} broken cases to verified: false`);
  }
}
