#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — X.W11.ref GPU cell. args: <tree> <tag> <port> <grep>
T=$1; tag=$2; port=$3; g=$4
cd "$HOME/.dev-logs/ref/$T" || exit 2
[ -d dist ] || npm run build >"$HOME/.dev-logs/ref/$T-build.log" 2>&1
export VJS_E2E_PORT=$port VJS_E2E_PERF_PORT=$((port+1)) W12_REAL_GPU=1
C=docs/tranches/X/close/evidence/browser/ref-2026-10-30/probe/gpu.config.ts
for r in 1 2; do
  npx playwright test -c $C --project=gpu --project=gpu-renderer --grep "$g" > "$HOME/.dev-logs/ref/out/$tag-r$r.json" 2>"$HOME/.dev-logs/ref/out/$tag-r$r.err"
  echo "$tag r$r exit $?"
done
