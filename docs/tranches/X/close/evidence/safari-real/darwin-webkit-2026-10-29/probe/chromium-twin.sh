#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.wk — the Chromium twin of each touched spec (smoke project), x2.
set -u
cd /Users/mkbabb/Programming/value.js
D=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29
echo "admitted $(date '+%F %T') HEAD $(git rev-parse --short HEAD) $(sysctl -n vm.loadavg)"
SPECS="${SPECS:-e2e/smoke/oracles/o21-gradient-rail.spec.ts e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/oracles/w7-destructive-seats.spec.ts}"
for n in ${RUNS:-1 2}; do
  VJS_E2E_PORT=8395 VJS_E2E_PERF_PORT=8396 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/runs/chromium-twin-r$n.json \
    npx playwright test --workers=1 --retries=0 --project=smoke $SPECS --reporter=line,json > $D/runs/chromium-twin-r$n.log 2>&1
  echo "run $n exit $? $(date '+%T')"
done
