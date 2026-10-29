#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.wk2 — the Chromium twin x2: o18-contrast-census + ss8r-ruled-rows
# (SS8-0440 elevation parity) on the smoke project, --workers=1.
set -u
cd /Users/mkbabb/Programming/value.js
D=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29/wk2
echo "admitted $(date '+%F %T') HEAD $(git rev-parse --short HEAD) $(sysctl -n vm.loadavg)"
for n in 1 2; do
  VJS_E2E_PORT=8397 VJS_E2E_PERF_PORT=8398 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/runs/chromium-twin-r$n.json \
    npx playwright test --workers=1 --retries=0 --project=smoke e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/ss8r-ruled-rows.spec.ts --grep "O-18|SS8-0440" --reporter=line,json > $D/runs/chromium-twin-r$n.log 2>&1
  echo "run $n exit $? $(date '+%T')"
done
