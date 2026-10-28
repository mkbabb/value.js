#!/bin/bash
# OD19 repair 3 — attribute an e2e failure: run the named specs against each arm's server (r3-serve.mjs) on the
# e2e port, which playwright then reuses as its webServer.  usage: r3-e2e-ab.sh <outdir> <spec...>   (via guarded)
set -u
R=/Users/mkbabb/Programming/value.js; P=$R/docs/tranches/X/execution/OD19/value/probes
OUT=$1; shift; mkdir -p "$OUT"; cd "$R"
export VJS_E2E_PORT=8594 VJS_E2E_PERF_PORT=8595 VITE_API_URL=http://localhost:8594
for arm in base cure; do
  R3_CACHE=$R/node_modules/.vite-r3-$arm "$P/r3-run.sh" "$arm" 8594 npx playwright test "$@" --project=smoke --workers=1 --reporter=list > "$OUT/e2e-$arm.txt" 2>&1
  echo "$arm rc=$?"
done
