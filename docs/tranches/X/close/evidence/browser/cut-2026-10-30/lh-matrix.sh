#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut, Check 3 D-5: the discriminating read. Run from the repo root, inside withserver.sh on :8604, inside guarded --cpu-cores 0.
# Rows: Lighthouse simulate | Lighthouse devtools (real 4x) | no Lighthouse, new browser per load, at 1x and 4x. Load is recorded per row.
D=docs/tranches/X/close/evidence/browser/cut-2026-10-30; O="$HOME/.dev-logs/cut"; U=http://localhost:8604
LH="$HOME/.npm/_npx/04de8c36dee094cd/node_modules/lighthouse/cli/index.js"
CH="$(node -p "require('playwright').chromium.executablePath()")"
TAG="${1:-m}"; OUT="$D/runs/lh-matrix-$TAG.txt"; FRESH="$D/runs/fresh-$TAG.jsonl"
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for mode in ${MODES:-simulate devtools}; do for r in 1 2 3; do
  L0=$(load1)
  node "$LH" "$U/index.html" --chrome-path="$CH" --chrome-flags="--headless=new --use-angle=metal --disable-field-trial-config" --throttling-method=$mode --only-categories=performance --output=json --output-path="$O/$TAG-$mode-$r.json" --save-assets --quiet
  echo "$mode r$r load ${L0} to $(load1) $(node $D/lh-read.mjs "$O/$TAG-$mode-$r.json" "$O/$TAG-$mode-$r-0.trace.json")" >> "$OUT"
done; done
for rate in 1 4; do for r in 1 2 3 4; do node $D/fresh-load.mjs "$U" $rate 8000 "$FRESH" "fresh-$rate-$r"; done; done
