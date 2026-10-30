#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut: "look unchanged". o18 x2 on the GPU cell (the committed spec through .ref's gpu.config), then visual once at the cut's HEAD.
D=docs/tranches/X/close/evidence/browser/cut-2026-10-30; C=docs/tranches/X/close/evidence/browser/ref-2026-10-30/probe/gpu.config.ts
for r in 1 2; do
  VJS_E2E_PORT=8611 VJS_E2E_PERF_PORT=8612 W12_REAL_GPU=1 PLAYWRIGHT_JSON_OUTPUT_NAME="$D/runs/o18-gpu-r$r.json" ~/.claude/guard/guarded --timeout 30 --cpu-cores 0 -- npx playwright test -c $C --project=gpu e2e/smoke/oracles/o18-contrast-census.spec.ts --workers=1 --retries=0 > "$HOME/.dev-logs/cut/o18-r$r.out" 2>&1
  echo "o18 r$r rc=$?" >> "$D/runs/keep.txt"
done
VJS_E2E_PORT=8613 VJS_E2E_PERF_PORT=8614 PLAYWRIGHT_JSON_OUTPUT_NAME="$HOME/.dev-logs/cut/visual.json" ~/.claude/guard/guarded --timeout 60 -- npx playwright test --project=visual --workers=1 --retries=0 --reporter=json > "$HOME/.dev-logs/cut/visual.out" 2>&1
echo "visual rc=$?" >> "$D/runs/keep.txt"
