#!/bin/bash
# OD19 repair 1 — isolate the two w12-dock failures: HEAD code on glass 10.1.0 (r1-g100) vs HEAD code on glass 10.1.1 (r1-red).
set -u
R=/Users/mkbabb/Programming/value.js; OUT=$1; mkdir -p "$OUT"
for arm in g100:8296 red:8298; do
  name=${arm%%:*}; port=${arm##*:}
  cd "$R/.worktrees/r1-$name"
  VJS_E2E_PORT=$port VJS_E2E_PERF_PORT=$((port+1)) npx playwright test e2e/smoke/w12-dock.spec.ts --project=smoke --workers=1 --reporter=list > "$OUT/w12-dock-head-$name.txt" 2>&1
  echo "$name rc=$?"
done
