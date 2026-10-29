#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W11.wk — ONE guarded --exclusive webkit admission: the engine-fact probe,
# then the six row specs on oracles-safari x2 (--workers=1: one browser per run,
# one context per test, Playwright closes both).
set -u
cd /Users/mkbabb/Programming/value.js
D=docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29
echo "admitted $(date '+%F %T') HEAD $(git rev-parse --short HEAD) $(sysctl -n vm.loadavg)"
node $D/probe/engine-facts.mjs webkit chromium > $D/probe/engine-facts.json 2>&1; echo "probe exit $?"
[ -n "${DIAG:-}" ] && { npx playwright test -c $DIAG --project=webkit > $D/runs/w7-diag-webkit.log 2>&1; echo "diag exit $?"; }
SPECS="e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts e2e/smoke/oracles/o30-space-catalog-truth.spec.ts e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/oracles/w7-destructive-seats.spec.ts"
for n in ${RUNS:-1 2}; do
  VJS_E2E_PORT=8397 VJS_E2E_PERF_PORT=8398 PLAYWRIGHT_JSON_OUTPUT_NAME=$D/runs/webkit-rows-r$n.json \
    npx playwright test --workers=1 --retries=0 --project=oracles-safari $SPECS --reporter=line,json > $D/runs/webkit-rows-r$n.log 2>&1
  echo "run $n exit $? $(date '+%T')"
done
