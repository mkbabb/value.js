#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W11.g8w projects run wrapper (meta: HEAD, load, exit)
cd /Users/mkbabb/Programming/value.js || exit 2
R=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-11-01/runs
N=${1:-webkit-projects}
echo "HEAD $(git rev-parse HEAD) tree=main(dirty-nonproduct:$(git status --porcelain | grep -v '^??' | wc -l | tr -d ' ')) queued $(date '+%Y-%m-%d %H:%M:%S %z') load $(sysctl -n vm.loadavg)" > $R/$N.meta
# keep the warm optimizer cache: the repro runs on a primed tree, as the full run's 83rd test did
VJS_E2E_PORT=9611 VJS_E2E_PERF_PORT=9612 PLAYWRIGHT_JSON_OUTPUT_NAME=$R/$N.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- npx playwright test --workers=1 --retries=0 --project=oracles-safari --repeat-each=8 e2e/smoke/oracles/o2-real-hydration-coldload.spec.ts --reporter=line,json > $R/$N.log 2>&1
rc=$?
echo "exit $rc end $(date '+%Y-%m-%d %H:%M:%S %z') load $(sysctl -n vm.loadavg)" >> $R/$N.meta
