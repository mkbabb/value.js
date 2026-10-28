#!/bin/bash
# OD19 repair 1 — the dock-settle falsifier, the dock e2e and page-load on the glass 10.1.1 pin, run twice in the
# cure worktree (HEAD + the repair) on its own server pair. usage: r1-e2e.sh <outdir>  (through guarded, never --light)
set -u
WT=/Users/mkbabb/Programming/value.js/.worktrees/r1-after; OUT=$1; mkdir -p "$OUT"
cd "$WT"
export VJS_E2E_PORT=8294 VJS_E2E_PERF_PORT=8295
for i in 1 2; do
  npx playwright test e2e/smoke/od19-v2-dock-settle.spec.ts e2e/smoke/w12-dock.spec.ts e2e/smoke/page-load.spec.ts --project=smoke --workers=1 --reporter=list > "$OUT/e2e-run-$i.txt" 2>&1
  echo "run$i rc=$?"
done
