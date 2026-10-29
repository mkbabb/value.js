#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.wk3 (COHESION §0gv.6) — ONE guarded --exclusive webkit admission:
# o18-contrast-census on oracles-safari x2 (--workers=1: one browser per run,
# one context per test; Playwright closes both in its own teardown).
set -u
cd /Users/mkbabb/Programming/value.js
D=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29-wk3
echo "admitted $(date '+%F %T') HEAD $(git rev-parse --short HEAD) $(sysctl -n vm.loadavg)"
for n in ${RUNS:-1 2}; do
  VJS_E2E_PORT=8397 VJS_E2E_PERF_PORT=8398 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/runs/webkit-o18-r$n.json \
    npx playwright test --workers=1 --retries=0 --project=oracles-safari e2e/smoke/oracles/o18-contrast-census.spec.ts --reporter=line,json > $D/runs/webkit-o18-r$n.log 2>&1
  echo "run $n exit $? $(date '+%T')"
done
