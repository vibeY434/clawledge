#!/usr/bin/env node
/**
 * Tweet Queue Manager for @clawledge
 *
 * Usage:
 *   node scripts/content/schedule.mjs              # Show queue overview
 *   node scripts/content/schedule.mjs --next        # Show next tweet to post
 *   node scripts/content/schedule.mjs --next 3      # Show next 3 tweets
 *   node scripts/content/schedule.mjs --posted ID   # Mark tweet as posted
 *   node scripts/content/schedule.mjs --scheduled ID YYYY-MM-DD  # Mark as scheduled
 *   node scripts/content/schedule.mjs --add "text"  # Add new tweet
 *   node scripts/content/schedule.mjs --thread      # Show next thread to post
 *   node scripts/content/schedule.mjs --stats        # Posting statistics
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = join(__dirname, "tweet-queue.json");

// Pillar rotation: what pillar fits which day
const DAY_PILLARS = {
  0: "engagement",  // Sunday
  1: "stats",       // Monday (new cases day → stats recap)
  2: "featured",    // Tuesday
  3: "tip",         // Wednesday
  4: "hottake",     // Thursday
  5: "engagement",  // Friday
  6: "thread",      // Saturday
};

const DAY_NAMES = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

// Optimal posting times (EST → these work for US + EU audiences)
const POSTING_TIMES = {
  primary: "10:00 EST (16:00 CET)",
  secondary: "17:00 EST (23:00 CET)",
};

function loadQueue() {
  try {
    return JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));
  } catch {
    console.error("❌ Could not read tweet-queue.json");
    process.exit(1);
  }
}

function saveQueue(queue) {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf-8");
}

function showOverview(queue) {
  const pending = queue.filter(t => t.status === "pending" && !t.thread);
  const scheduled = queue.filter(t => t.status === "scheduled");
  const posted = queue.filter(t => t.status === "posted");
  const threads = [...new Set(queue.filter(t => t.thread && t.status === "pending").map(t => t.thread))];

  console.log("🦞 Clawledge Tweet Queue");
  console.log("═".repeat(50));
  console.log(`📊 Pending: ${pending.length} | Scheduled: ${scheduled.length} | Posted: ${posted.length}`);
  console.log(`🧵 Pending threads: ${threads.length}`);
  console.log();

  // Today's recommendation
  const today = new Date().getDay();
  const pillar = DAY_PILLARS[today];
  console.log(`📅 Today is ${DAY_NAMES[today]} → Recommended pillar: ${pillar}`);
  console.log(`⏰ Best time: ${POSTING_TIMES.primary}`);
  console.log();

  // By pillar breakdown
  const byPillar = {};
  for (const t of pending) {
    byPillar[t.pillar] = (byPillar[t.pillar] || 0) + 1;
  }
  console.log("Pending by pillar:");
  for (const [p, count] of Object.entries(byPillar).sort((a, b) => b[1] - a[1])) {
    const bar = "█".repeat(count);
    const marker = p === pillar ? " ← today" : "";
    console.log(`  ${p.padEnd(12)} ${String(count).padStart(2)} ${bar}${marker}`);
  }
  console.log();

  // Next 5 pending
  console.log("Next up:");
  const next5 = getNextTweets(queue, 5);
  for (const t of next5) {
    const preview = t.text.split("\n")[0].substring(0, 60);
    console.log(`  [${t.id}] (${t.pillar}) ${preview}...`);
  }

  if (scheduled.length > 0) {
    console.log();
    console.log("Scheduled:");
    for (const t of scheduled.sort((a, b) => (a.scheduledFor || "").localeCompare(b.scheduledFor || ""))) {
      const preview = t.text.split("\n")[0].substring(0, 50);
      console.log(`  [${t.id}] ${t.scheduledFor} — ${preview}...`);
    }
  }
}

function getNextTweets(queue, count = 1) {
  // Prioritize by today's pillar, then rotate through others
  const today = new Date().getDay();
  const todayPillar = DAY_PILLARS[today];
  const pending = queue.filter(t => t.status === "pending" && !t.thread);

  // First: today's pillar
  const pillarMatch = pending.filter(t => t.pillar === todayPillar);
  // Then: everything else in order
  const others = pending.filter(t => t.pillar !== todayPillar);

  return [...pillarMatch, ...others].slice(0, count);
}

function showNext(queue, count = 1) {
  const next = getNextTweets(queue, count);
  if (next.length === 0) {
    console.log("✅ No pending tweets! Time to generate new content.");
    return;
  }

  for (let i = 0; i < next.length; i++) {
    const t = next[i];
    if (i > 0) console.log("\n" + "─".repeat(50) + "\n");
    console.log(`📝 [${t.id}] (${t.pillar})`);
    console.log(`⏰ Post at: ${POSTING_TIMES.primary}`);
    console.log("─".repeat(50));
    console.log(t.text);
    console.log("─".repeat(50));
    console.log(`Characters: ${t.text.length}/280`);
  }
}

function showThread(queue) {
  const threadIds = [...new Set(queue.filter(t => t.thread && t.status === "pending").map(t => t.thread))];
  if (threadIds.length === 0) {
    console.log("✅ No pending threads!");
    return;
  }

  const threadId = threadIds[0];
  const tweets = queue
    .filter(t => t.thread === threadId && t.status === "pending")
    .sort((a, b) => a.threadIndex - b.threadIndex);

  console.log(`🧵 Thread: ${threadId} (${tweets.length} tweets)`);
  console.log("═".repeat(50));
  for (const t of tweets) {
    console.log(`\n[${t.threadIndex}/${tweets.length}] ${t.id}`);
    console.log("─".repeat(50));
    console.log(t.text);
  }
  console.log("\n" + "═".repeat(50));
  console.log("Post as thread: Type first tweet → click '+' → type next → repeat");
}

function markPosted(queue, id) {
  const tweet = queue.find(t => t.id === id);
  if (!tweet) {
    console.error(`❌ Tweet "${id}" not found`);
    process.exit(1);
  }
  tweet.status = "posted";
  tweet.postedAt = new Date().toISOString().split("T")[0];
  saveQueue(queue);
  console.log(`✅ Marked [${id}] as posted (${tweet.postedAt})`);
}

function markScheduled(queue, id, date) {
  const tweet = queue.find(t => t.id === id);
  if (!tweet) {
    console.error(`❌ Tweet "${id}" not found`);
    process.exit(1);
  }
  tweet.status = "scheduled";
  tweet.scheduledFor = date || new Date().toISOString().split("T")[0];
  saveQueue(queue);
  console.log(`📅 Marked [${id}] as scheduled for ${tweet.scheduledFor}`);
}

function addTweet(queue, text, pillar = "engagement") {
  const id = `CUSTOM-${String(queue.length + 1).padStart(3, "0")}`;
  const tweet = {
    id,
    pillar,
    status: "pending",
    scheduledFor: null,
    postedAt: null,
    text,
  };
  queue.push(tweet);
  saveQueue(queue);
  console.log(`✅ Added [${id}] (${pillar})`);
  console.log(`Characters: ${text.length}/280`);
}

function showStats(queue) {
  const posted = queue.filter(t => t.status === "posted");
  const pending = queue.filter(t => t.status === "pending");
  const scheduled = queue.filter(t => t.status === "scheduled");

  console.log("📊 Posting Statistics");
  console.log("═".repeat(40));
  console.log(`Total tweets:  ${queue.length}`);
  console.log(`Posted:        ${posted.length}`);
  console.log(`Scheduled:     ${scheduled.length}`);
  console.log(`Pending:       ${pending.length}`);

  if (posted.length > 0) {
    const dates = posted.map(t => t.postedAt).filter(Boolean).sort();
    console.log(`\nFirst post:    ${dates[0]}`);
    console.log(`Last post:     ${dates[dates.length - 1]}`);

    const byPillar = {};
    for (const t of posted) {
      byPillar[t.pillar] = (byPillar[t.pillar] || 0) + 1;
    }
    console.log("\nPosted by pillar:");
    for (const [p, c] of Object.entries(byPillar)) {
      console.log(`  ${p}: ${c}`);
    }
  }

  // Days of content remaining
  const soloTweets = pending.filter(t => !t.thread).length;
  const threads = [...new Set(pending.filter(t => t.thread).map(t => t.thread))].length;
  console.log(`\n📅 Content runway: ~${soloTweets + threads} posting days remaining`);
  if (soloTweets + threads < 7) {
    console.log("⚠️  Less than a week of content! Time to generate new tweets.");
  }
}

// --- CLI ---
const args = process.argv.slice(2);
const queue = loadQueue();

if (args[0] === "--next") {
  const count = parseInt(args[1]) || 1;
  showNext(queue, count);
} else if (args[0] === "--posted") {
  if (!args[1]) { console.error("Usage: --posted ID"); process.exit(1); }
  markPosted(queue, args[1]);
} else if (args[0] === "--scheduled") {
  if (!args[1]) { console.error("Usage: --scheduled ID [YYYY-MM-DD]"); process.exit(1); }
  markScheduled(queue, args[1], args[2]);
} else if (args[0] === "--add") {
  if (!args[1]) { console.error("Usage: --add \"tweet text\" [pillar]"); process.exit(1); }
  addTweet(queue, args[1], args[2] || "engagement");
} else if (args[0] === "--thread") {
  showThread(queue);
} else if (args[0] === "--stats") {
  showStats(queue);
} else {
  showOverview(queue);
}
