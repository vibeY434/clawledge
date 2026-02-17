/**
 * schema.mjs — Shared validation, defaults, and utilities for all clawledge scripts.
 * Single source of truth mirroring src/lib/types.ts
 */

export const CATEGORIES = [
  "productivity", "development", "content-creation", "money-making",
  "smart-home", "research", "finance", "health", "communication",
  "creative", "crypto", "freelancer", "wild"
];

export const CATEGORY_ALIASES = {
  dev: "development", code: "development", coding: "development", programming: "development",
  money: "money-making", monetization: "money-making", income: "money-making", earning: "money-making",
  home: "smart-home", iot: "smart-home", "home-automation": "smart-home", homeassistant: "smart-home",
  content: "content-creation", writing: "content-creation", blog: "content-creation", social: "content-creation",
  freelance: "freelancer", business: "freelancer", solopreneur: "freelancer", invoice: "freelancer",
  health: "health", fitness: "health", medical: "health",
  creative: "creative", art: "creative", design: "creative", music: "creative",
  finance: "finance", banking: "finance", tax: "finance", accounting: "finance",
  research: "research", science: "research", academic: "research",
  communication: "communication", email: "communication", chat: "communication", messaging: "communication",
  crypto: "crypto", defi: "crypto", trading: "crypto", blockchain: "crypto",
  wild: "wild", crazy: "wild", fun: "wild", experimental: "wild",
  productivity: "productivity", automation: "productivity", workflow: "productivity",
};

export const SOURCE_TYPES = [
  "x-post", "github", "blog", "reddit", "discord", "youtube", "medium", "hacker-news", "substack"
];

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

/**
 * Resolve a category string (case-insensitive, alias-aware).
 * Returns the canonical category or null if unrecognized.
 */
export function resolveCategory(input) {
  if (!input) return null;
  const lower = input.toLowerCase().trim();
  if (CATEGORIES.includes(lower)) return lower;
  return CATEGORY_ALIASES[lower] || null;
}

/**
 * Detect source type from a URL string.
 */
export function detectSourceType(url) {
  if (!url) return "blog";
  const u = url.toLowerCase();
  if (u.includes("x.com/") || u.includes("twitter.com/")) return "x-post";
  if (u.includes("github.com")) return "github";
  if (u.includes("reddit.com")) return "reddit";
  if (u.includes("news.ycombinator.com")) return "hacker-news";
  if (u.includes("medium.com")) return "medium";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("discord.com") || u.includes("discord.gg")) return "discord";
  if (u.includes(".substack.com")) return "substack";
  return "blog";
}

/**
 * Generate a URL-safe slug from a title string.
 */
export function generateId(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Apply sensible defaults to a partial use case object.
 * Returns a new object (does not mutate input).
 */
export function applyDefaults(partial) {
  const today = new Date().toISOString().slice(0, 10);
  const base = {
    id: partial.title ? generateId(partial.title) : "untitled-case",
    title: "Untitled",
    description: "",
    fullContent: "",
    category: "wild",
    tags: [],
    difficulty: "intermediate",
    estimatedSetupTime: "1-2 hours",
    source: { type: "blog", url: "", author: "Unknown" },
    requirements: ["OpenClaw or Clawdbot", "Always-on machine (Mac Mini, VPS, etc.)", "Claude API Key"],
    monthlyApiCost: "$10-30",
    monetizable: false,
    verified: false,
    dateAdded: today,
    featured: false,
    impactScore: 5,
    relatedSkills: [],
    relatedRepos: [],
  };

  // Deep-merge source object
  const source = { ...base.source, ...(partial.source || {}) };
  if (!source.type || source.type === "blog") {
    source.type = detectSourceType(source.url);
  }

  // Resolve category alias
  const category = resolveCategory(partial.category) || base.category;

  return {
    ...base,
    ...partial,
    source,
    category,
    id: partial.id || generateId(partial.title || "untitled"),
  };
}

/**
 * Validate a use case object. Returns { valid, errors }.
 */
export function validateCase(obj) {
  const errors = [];

  if (!obj.title || obj.title.length < 3) errors.push("title is missing or too short");
  if (!obj.description || obj.description.length < 10) errors.push("description is missing or too short");
  if (!obj.source?.url) errors.push("source.url is missing");
  if (obj.source?.url && !obj.source.url.startsWith("http")) errors.push(`source.url invalid: ${obj.source.url}`);
  if (obj.category && !CATEGORIES.includes(obj.category)) errors.push(`invalid category: ${obj.category}`);
  if (obj.difficulty && !DIFFICULTIES.includes(obj.difficulty)) errors.push(`invalid difficulty: ${obj.difficulty}`);
  if (obj.source?.type && !SOURCE_TYPES.includes(obj.source.type)) errors.push(`invalid source type: ${obj.source.type}`);

  return { valid: errors.length === 0, errors };
}

/**
 * Build a dedup index from an array of use cases.
 * Returns { byUrl: Set, byId: Set }
 */
export function buildDedupIndex(cases) {
  const byUrl = new Set();
  const byId = new Set();
  for (const c of cases) {
    if (c.source?.url) byUrl.add(c.source.url.toLowerCase().replace(/\/$/, ""));
    if (c.id) byId.add(c.id);
  }
  return { byUrl, byId };
}

/**
 * Check if a case is a duplicate against an index.
 */
export function isDuplicate(newCase, index) {
  const url = newCase.source?.url?.toLowerCase().replace(/\/$/, "");
  if (url && index.byUrl.has(url)) return { duplicate: true, reason: `URL exists: ${url}` };
  const id = newCase.id || generateId(newCase.title || "");
  if (index.byId.has(id)) return { duplicate: true, reason: `ID exists: ${id}` };
  return { duplicate: false };
}
