#!/usr/bin/env node
/**
 * Sync project CHANGELOG.md into the OpenClaw global changelog path.
 *
 * Target: /home/openclaw/.openclaw/CHANGELOG.md
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const REPO_CHANGELOG = resolve(process.cwd(), 'CHANGELOG.md');
const TARGET_DIR = '/home/openclaw/.openclaw';
const TARGET_FILE = `${TARGET_DIR}/CHANGELOG.md`;
const SOURCE_TAG = 'Source: /workspace/clawledge/CHANGELOG.md';

if (!existsSync(REPO_CHANGELOG)) {
  console.error(`Missing repo changelog: ${REPO_CHANGELOG}`);
  process.exit(1);
}

const sourceContent = readFileSync(REPO_CHANGELOG, 'utf-8').trim();
mkdirSync(TARGET_DIR, { recursive: true });

const now = new Date().toISOString();
const block = [
  `\n\n## Sync ${now}`,
  SOURCE_TAG,
  '',
  sourceContent,
  ''
].join('\n');

if (!existsSync(TARGET_FILE)) {
  writeFileSync(TARGET_FILE, '# OpenClaw Global Changelog\n' + block, 'utf-8');
  console.log(`Created ${TARGET_FILE}`);
  process.exit(0);
}

const current = readFileSync(TARGET_FILE, 'utf-8');
if (current.includes(sourceContent)) {
  console.log('Global changelog already contains current repo changelog content.');
  process.exit(0);
}

writeFileSync(TARGET_FILE, current.trimEnd() + block, 'utf-8');
console.log(`Updated ${TARGET_FILE}`);
