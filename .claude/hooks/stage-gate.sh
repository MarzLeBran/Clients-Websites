#!/usr/bin/env bash
# Blocks writes into a client's site/ directory until their design direction
# is approved. Exit 2 = block, and the message on stderr goes back to Claude.
set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR/_extract-path.sh"

FILE="$(_hook_extract_path "$(cat)")"
[ -z "$FILE" ] && exit 0

case "$FILE" in
  *clients/*/site/*) ;;
  *) exit 0 ;;
esac

SLUG=$(printf '%s' "$FILE" | sed -n 's|.*clients/\([^/]*\)/site/.*|\1|p')
[ -z "$SLUG" ] && exit 0

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
DIRECTIONS="$ROOT/clients/$SLUG/brief/02-design-directions.md"

if [ ! -f "$DIRECTIONS" ]; then
  echo "BLOCKED: no design directions exist for '$SLUG'. Run /brand-read then /directions before writing site code." >&2
  exit 2
fi

if ! grep -q '^APPROVED:' "$DIRECTIONS"; then
  echo "BLOCKED: '$SLUG' has directions but none is approved. Add a line starting with 'APPROVED:' naming the chosen direction to brief/02-design-directions.md, then continue." >&2
  exit 2
fi
exit 0
