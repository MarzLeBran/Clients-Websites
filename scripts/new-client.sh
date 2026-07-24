#!/usr/bin/env bash
# Scaffold a new client directory.
# Usage: ./scripts/new-client.sh <slug> ["Business Name"]
set -euo pipefail

SLUG="${1:-}"
NAME="${2:-$SLUG}"

if [ -z "$SLUG" ]; then
  echo "Usage: ./scripts/new-client.sh <slug> [\"Business Name\"]" >&2
  exit 1
fi

case "$SLUG" in
  *[!a-z0-9-]*) echo "Slug must be lowercase letters, digits, and hyphens only." >&2; exit 1 ;;
esac

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
DEST="$ROOT/clients/$SLUG"

if [ -d "$DEST" ]; then
  echo "clients/$SLUG already exists." >&2
  exit 1
fi

for d in intake assets/photos assets/logo assets/reviews assets/existing-site brief; do
  mkdir -p "$DEST/$d"
done

if [ -d "$ROOT/_template" ]; then
  cp -R "$ROOT/_template" "$DEST/site"
  rm -rf "$DEST/site/node_modules" "$DEST/site/.git" 2>/dev/null || true
else
  mkdir -p "$DEST/site"
  echo "Note: _template/ not found — site/ created empty." >&2
fi

cp "$ROOT/_system/intake-form.md" "$DEST/intake/intake-form-BLANK.md" 2>/dev/null || true
cp "$ROOT/_system/intake-demo.md" "$DEST/intake/intake-demo-BLANK.md" 2>/dev/null || true

cat > "$DEST/README.md" <<EOF
# $NAME

- Slug: \`$SLUG\`
- Created: $(date +%Y-%m-%d)

## Drop assets here before starting
- \`intake/\` — intake-demo (minimal, for a demo spin) or intake-form (full, for production), plus call notes
- \`assets/photos/\` — everything from their social, GBP, phone; kebab-case names
- \`assets/logo/\` — transparent PNG required; hand-built SVG welcome; auto-traced SVG exports rejected
- \`assets/reviews/\` — exported Google reviews
- \`assets/existing-site/\` — screenshots of current site / flyers

## Pipeline
\`/new-client $SLUG\` → \`/brand-read $SLUG\` → \`/directions $SLUG\` → \`/architect $SLUG\` → \`/build-site $SLUG\` → \`/ship $SLUG\`
EOF

echo "Created clients/$SLUG"
echo "Next: drop assets into clients/$SLUG/, then run /new-client $SLUG"
