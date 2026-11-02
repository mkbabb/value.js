#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W11.g8w projects run wrapper (meta: HEAD, load, exit)
cd /Users/mkbabb/Programming/value.js || exit 2
R=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-11-01/runs
N=${1:-webkit-projects}
echo "HEAD $(git rev-parse HEAD) tree=main(dirty-nonproduct:$(git status --porcelain | grep -v '^??' | wc -l | tr -d ' ')) queued $(date '+%Y-%m-%d %H:%M:%S %z') load $(sysctl -n vm.loadavg)" > $R/$N.meta
rm -rf node_modules/.vite-e2e-9611
VJS_E2E_PORT=9611 VJS_E2E_PERF_PORT=9612 PLAYWRIGHT_JSON_OUTPUT_NAME=$R/$N.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- npx playwright test --workers=1 --retries=0 --project=smoke-safari --project=oracles-safari --reporter=line,json > $R/$N.log 2>&1
rc=$?
echo "exit $rc end $(date '+%Y-%m-%d %H:%M:%S %z') load $(sysctl -n vm.loadavg)" >> $R/$N.meta
