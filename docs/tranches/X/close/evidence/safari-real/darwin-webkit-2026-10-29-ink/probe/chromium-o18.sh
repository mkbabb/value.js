#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.ink (COHESION §0gw.3-.4) — Chromium x2: o18-contrast-census (both
# schemes) + ss8r-ruled-rows SS8-0440 on the smoke project, --workers=1.
set -u
cd /Users/mkbabb/Programming/value.js
D=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29-ink
echo "admitted $(date '+%F %T') HEAD $(git rev-parse --short HEAD) $(sysctl -n vm.loadavg)"
for n in ${RUNS:-1 2}; do
  VJS_E2E_PORT=8411 VJS_E2E_PERF_PORT=8412 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/runs/chromium-o18-r$n.json \
    npx playwright test --workers=1 --retries=0 --project=smoke e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/ss8r-ruled-rows.spec.ts --grep "O-18|SS8-0440" --reporter=line,json > $D/runs/chromium-o18-r$n.log 2>&1
  echo "run $n exit $? $(date '+%T')"
done
