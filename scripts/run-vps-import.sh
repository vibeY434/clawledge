#!/usr/bin/env bash
set -euo pipefail

# Run the clawledge Excel import flow on a VPS runtime.
#
# Usage:
#   bash scripts/run-vps-import.sh
#   bash scripts/run-vps-import.sh --file /home/openclaw/clawledge/openclawusecases.xlsx
#   bash scripts/run-vps-import.sh --fallback-url https://clawledge.com --apply
#
# Defaults:
#   --file         /home/openclaw/clawledge/openclawusecases.xlsx
#   --fallback-url https://clawledge.com
#   mode           dry-run (no writes)

FILE_PATH="/home/openclaw/clawledge/openclawusecases.xlsx"
FALLBACK_URL="https://clawledge.com"
APPLY=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --file)
      FILE_PATH="${2:-}"
      shift 2
      ;;
    --fallback-url)
      FALLBACK_URL="${2:-}"
      shift 2
      ;;
    --apply)
      APPLY=1
      shift
      ;;
    --help|-h)
      sed -n '1,24p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

if [[ ! -f "$FILE_PATH" ]]; then
  echo "❌ Excel file not found: $FILE_PATH" >&2
  exit 1
fi

echo "▶ Import source: $FILE_PATH"
echo "▶ Fallback URL: $FALLBACK_URL"

if [[ $APPLY -eq 0 ]]; then
  echo "\n[1/1] Dry run import validation"
  node scripts/import-excel.mjs "$FILE_PATH" --dry-run --fallback-url "$FALLBACK_URL"
  echo "\n✅ Dry run complete. No files changed."
  echo "If output looks good, run again with --apply."
  exit 0
fi

echo "\n[1/3] Import Excel -> scripts/pending"
node scripts/import-excel.mjs "$FILE_PATH" --fallback-url "$FALLBACK_URL"

echo "\n[2/3] Merge pending cases -> src/data/use-cases.json"
node scripts/add-cases.mjs

echo "\n[3/3] Verify URLs"
node scripts/verify-urls.mjs

echo "\n✅ Import pipeline finished."
