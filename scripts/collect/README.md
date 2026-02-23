# Daily Case Collection (Preparation Only)

> Status: **Preparation scaffold only** — no active collection is implemented yet.

This folder defines the structure and code plan for an automated daily discovery pipeline for new OpenClaw/Clawdbot use cases.

## Goal
Collect candidates from trusted sources daily, keep provenance, and feed structured candidates into the existing validation/dedup pipeline later.

## Planned Flow (not wired yet)
1. Load configured sources from `sources.json`.
2. For each source, collect candidate links/posts (X/GitHub/Reddit/Blogs/etc.).
3. Normalize into a common candidate schema.
4. Write one daily JSON artifact to `scripts/inbox/YYYY-MM-DD.json`.
5. (Later) pass to existing import/validate/add flow.

## Candidate schema (planned)

```json
{
  "candidateId": "string",
  "collectedAt": "ISO timestamp",
  "sourceCatalog": "x-builders",
  "sourceType": "x-post|github|reddit|blog|youtube|discord|other",
  "sourceUrl": "https://...",
  "author": "string",
  "authorHandle": "@handle",
  "title": "string",
  "claimText": "string",
  "evidenceUrls": ["https://..."],
  "tags": ["automation", "dev"],
  "raw": {}
}
```

## Why this preparation
- Keeps your current workflow, but removes fragile copy/paste from many Excel sheets.
- Preserves provenance (where each candidate came from).
- Makes quality checks and prioritization much easier before final curation.
