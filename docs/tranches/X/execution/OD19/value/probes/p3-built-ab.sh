#!/bin/bash
# OD19 P3 — run the pane-swap falsifier against a BUILT bundle: $1 = phase, $2 = dir holding dist/gh-pages.
set -u
R=/Users/mkbabb/Programming/value.js
LOG=$R/.worktrees/od19-p3-$1-serve.log
(cd "$2" && PERF_PORT=8191 node $R/e2e/smoke/perf/serve-built.mjs > "$LOG" 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
until curl -s -m 3 -o /dev/null http://127.0.0.1:8191/; do sleep 1; done
cd $R
for i in 1 2; do
  OD19_PHASE="$1-built" VJS_E2E_PORT=8191 VJS_E2E_PERF_PORT=8193 npx playwright test e2e/smoke/od19-pane-swap.spec.ts --project=smoke --workers=1 > "$R/.worktrees/od19-p3-$1-run$i.log" 2>&1
  echo "$1 run$i rc=$?"
done
