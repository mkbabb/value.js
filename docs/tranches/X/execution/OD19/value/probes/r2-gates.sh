#!/bin/bash
# OD19 repair 2 — the gates, twice, in the cure worktree (HEAD + repair 2): the e2e that read the plate, the lamp and
# the scene enter, then the full vitest suite.  usage: r2-gates.sh <outdir>   (through guarded, never --light)
set -u
WT=/Users/mkbabb/Programming/value.js/.worktrees/r2-cure; OUT=$1; mkdir -p "$OUT"
cd "$WT"
export VJS_E2E_PORT=8394 VJS_E2E_PERF_PORT=8395
for i in 1 2; do
  npx playwright test e2e/smoke/page-load.spec.ts e2e/smoke/oracles/o22-status-lamp.spec.ts e2e/smoke/oracles/cold-nav-scene-enter.spec.ts e2e/smoke/walk.spec.ts --project=smoke --workers=1 --reporter=list > "$OUT/e2e-run-$i.txt" 2>&1
  echo "e2e run$i rc=$?"
done
for i in 1 2; do
  npx vitest run --maxWorkers=2 > "$OUT/vitest-full-$i.txt" 2>&1
  echo "vitest run$i rc=$?"
done
