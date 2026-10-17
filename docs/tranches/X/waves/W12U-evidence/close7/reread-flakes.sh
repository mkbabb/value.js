#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X-W12U Close 7: isolated re-read (x2) of the two rows that failed in one smoke batch only
# (cl7a reactivity :137, cl7b webgl-blob :13). usage (repo root): sh close7/reread-flakes.sh <tree>
T=${1:?tree}; O=$(pwd)/docs/tranches/X/waves/W12U-evidence/close7/smoke/reread-flakes.txt
for i in 1 2; do
  for pair in "smoke|e2e/smoke/webgl-blob.spec.ts:13" "smoke-reactivity|e2e/smoke/reactivity-instant.spec.ts:137"; do
    P=${pair%%|*}; S=${pair#*|}
    echo "### $S ($P) r$i load1=$(sysctl -n vm.loadavg | awk '{print $2}')" >> "$O"
    ( cd "$T" && VJS_E2E_PORT=9171 VJS_E2E_PERF_PORT=9172 "$HOME/.claude/guard/guarded" --timeout 10 -- \
      npx playwright test "$S" --project="$P" --workers=1 --reporter=list --output="$HOME/.dev-logs/w12u-close7/out/reread" 2>&1 \
      | grep -E '✓|✘|median|passed|failed' ) >> "$O"
  done
done
