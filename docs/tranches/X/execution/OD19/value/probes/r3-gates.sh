#!/bin/bash
# OD19 repair 3 — the gates, twice, in the main tree (HEAD + repair 3 + the other seats' uncommitted hunks, which
# the receipt names): <vitest|e2e> <outdir>.  vitest = the full suite at --maxWorkers=2; e2e = the specs that read
# the dock's colour-input face, the boot and the walk, --workers=1.  (through guarded; e2e is a browser run)
set -u
cd /Users/mkbabb/Programming/value.js
KIND=$1; OUT=$2; mkdir -p "$OUT"
export VJS_E2E_PORT=8494 VJS_E2E_PERF_PORT=8495
for i in 1 2; do
  if [ "$KIND" = vitest ]; then
    npx vitest run --maxWorkers=2 > "$OUT/vitest-full-$i.txt" 2>&1; echo "vitest run$i rc=$?"
  else
    npx playwright test e2e/smoke/page-load.spec.ts e2e/smoke/flows/color-propose.spec.ts e2e/smoke/oracles/o10d-display-voice-census.spec.ts e2e/smoke/ss8-z2-picker-cohort.spec.ts e2e/smoke/walk.spec.ts --project=smoke --workers=1 --reporter=list > "$OUT/e2e-run-$i.txt" 2>&1; echo "e2e run$i rc=$?"
  fi
done
