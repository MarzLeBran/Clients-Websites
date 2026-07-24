#!/usr/bin/env bash
# Mechanical QA gates, run per client site. Usage:
#   scripts/verify.sh clients/<slug>/site [--mode=demo|production] [--fast]
#
# Mode defaults to the site's own site.config.ts `mode:` value.
#   demo       — sentinel, raw-hex, consent, astro check, build, internal
#                links, a11y (a sales tool must still be clean and accessible)
#   production — everything above plus metadata/canonical/schema validation,
#                near-duplicate detection, and provider-config gates
#   --fast     — static source checks only (sentinel, hex, consent); used by
#                the pre-commit hook. No build, no dist checks.
#
# Never run against _template/ — its sentinels are intentional.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_ARG="${1:?usage: verify.sh <client-site-path> [--mode=demo|production] [--fast]}"
shift || true

MODE=""
FAST=0
for arg in "$@"; do
  case "$arg" in
    --mode=demo) MODE="demo" ;;
    --mode=production) MODE="production" ;;
    --fast) FAST=1 ;;
  esac
done

SITE="$(cd "$SITE_ARG" 2>/dev/null && pwd)" || { echo "FAIL: $SITE_ARG not found"; exit 2; }
case "$SITE" in
  */_template|*/_template/*) echo "FAIL: never verify _template/ — its sentinels are intentional"; exit 2 ;;
esac

if [ -z "$MODE" ]; then
  MODE=$(grep -oE "mode: '(demo|production)'" "$SITE/src/config/site.config.ts" 2>/dev/null | grep -oE "demo|production" | head -1)
  MODE="${MODE:-demo}"
fi

FAILURES=0
pass() { printf '  ok   %s\n' "$1"; }
fail() { printf '  FAIL %s\n' "$1"; FAILURES=$((FAILURES + 1)); }

echo "verify: $SITE (mode: $MODE$([ "$FAST" = 1 ] && echo ', fast'))"

# --- 1. sentinel tokens ------------------------------------------------------
if grep -qi 'FF00FF' "$SITE/src/styles/tokens.css"; then
  fail "sentinel #FF00FF remains in tokens.css — theme the site (scripts/derive-tokens.py) before shipping"
else
  pass "no sentinel tokens"
fi

# --- 2. raw hex in components ------------------------------------------------
if node "$ROOT/scripts/verify/check-hex.mjs" "$SITE"; then
  pass "no raw hex in .astro components"
else
  fail "raw hex in .astro components (tokens only; '// verify-ignore' to override)"
fi

# --- 3. consent present ------------------------------------------------------
if node "$ROOT/scripts/verify/check-consent.mjs" "$SITE"; then
  pass "phone-collecting forms carry unchecked consent + data-consent-language"
else
  fail "consent check — see output above"
fi

if [ "$FAST" = 1 ]; then
  echo "fast checks done: $FAILURES failure(s)"
  exit $((FAILURES > 0 ? 1 : 0))
fi

# --- 4. astro check ----------------------------------------------------------
if (cd "$SITE" && npx astro check 2>&1 | grep -qE '^- 0 errors'); then
  pass "astro check: 0 errors"
else
  fail "astro check reported errors"
fi

# --- 5. build ----------------------------------------------------------------
if (cd "$SITE" && npm run build >/dev/null 2>&1); then
  pass "build succeeds"
else
  fail "build failed"
  echo "verify aborted: no dist to check"
  exit 1
fi

# --- 6. dist checks (links always; metadata/schema/dupes/provider in production)
if node "$ROOT/scripts/verify/check-dist.mjs" "$SITE" "$MODE"; then
  pass "dist checks ($MODE set)"
else
  fail "dist checks — see output above"
fi

# --- 7. accessibility (axe via system Chrome) --------------------------------
if node "$ROOT/scripts/verify/check-a11y.mjs" "$SITE"; then
  pass "axe: no serious/critical violations"
else
  status=$?
  if [ "$status" = 3 ]; then
    printf '  warn a11y skipped — no Chrome found (set CHROME_PATH)\n'
  else
    fail "axe found serious/critical violations"
  fi
fi

echo "done: $FAILURES failure(s)"
exit $((FAILURES > 0 ? 1 : 0))
