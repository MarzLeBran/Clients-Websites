#!/usr/bin/env bash
# Warns (never blocks) when business facts are hardcoded into components
# instead of read from site.config.ts.
set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR/_extract-path.sh"

FILE="$(_hook_extract_path "$(cat)")"
[ -z "$FILE" ] && exit 0
case "$FILE" in
  *clients/*/site/src/components/*|*clients/*/site/src/layouts/*|*clients/*/site/src/pages/*) ;;
  *) exit 0 ;;
esac
case "$FILE" in *site.config.ts) exit 0 ;; esac
[ -f "$FILE" ] || exit 0

if grep -qE '\(?[0-9]{3}\)?[-. ][0-9]{3}[-. ][0-9]{4}' "$FILE"; then
  echo "Note: $FILE contains a literal phone number. Business facts belong in site.config.ts." >&2
fi
exit 0
