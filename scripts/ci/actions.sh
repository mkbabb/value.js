#!/usr/bin/env bash
# actions.sh — the CI gate, one definition (`npm run ci:actions`).
#
# .github/workflows/ci.yml runs exactly this after `npm ci` and
# `npm ci --prefix api`; run it locally the same way, through the guard:
#   ~/.claude/guard/guarded --light -- npm run ci:actions
# No browser runs here. The browser suites are `npm run preship`.
set -euo pipefail
cd "$(dirname "$0")/../.."

step() { echo "── ci:actions: $*"; }

step lint
npm run lint
step typecheck            # pretypecheck builds dist/
npm run typecheck
step "unit (node/jsdom)"
npm run test:unit
step css-equivalence
npm run test:css-equivalence
step "generated grammar matches bbnf gen"
node scripts/gen-grammar.mjs --check
step "pack + verify the published surface"
FILE="$(node -p "const p=require('./package.json'); p.name.replace(/^@/,'').replace('/','-')+'-'+p.version+'.tgz'")"
npm pack --ignore-scripts > /dev/null
test -f "$FILE"
node scripts/ci/verify-packed-surface.mjs "$FILE"
rm -f "$FILE"
step "api typecheck + tests"
(cd api && npx tsc --noEmit && npm test)
step green
