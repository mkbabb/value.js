#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut (COHESION §0gx.3): one G3 draw of the eager-payload gate on the real-GPU cell under the load condition.
# usage: draw.sh <label>   (run from the repo root; appends one row to runs/draws.tsv whatever the outcome)
# Condition: 1-min load <= 12 at the start and end of the draw; waits at most 60 min for the start, then UNMEASURED-LOADED.
HERE="$(cd "$(dirname "$0")" && pwd)"; L="$1"; RUNS="$HERE/runs"; OUT="$RUNS/gpu-eager-$L.json"; LOG="$RUNS/gpu-eager-$L.log"
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waited=0
while awk "BEGIN{exit !($(load1) > 12)}"; do
  if [ "$waited" -ge 3600 ]; then printf '%s\t%s\t%s\t-\t-\tUNMEASURED-LOADED\n' "$L" "$(git rev-parse --short HEAD)" "$(load1)" >> "$RUNS/draws.tsv"; exit 3; fi
  sleep 30; waited=$((waited+30))
done
S="$(load1)"; ST="$(date '+%H:%M:%S')"
W12_REAL_GPU=1 VJS_E2E_PORT=8621 VJS_E2E_PERF_PORT=8622 X_W2_CWV_OUT="$OUT" ~/.claude/guard/guarded --timeout 30 --cpu-cores 0 -- \
  npx playwright test --project=smoke-perf e2e/smoke/perf/eager-payload.spec.ts -g "G3/G4" --workers=1 --retries=0 --reporter=line > "$LOG" 2>&1
rc=$?
E="$(load1)"
P="$(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1]));const c=j.configs||j;const m=c["mobile-4x-cpu"];console.log(m.p75Tbt.toFixed(0)+"\t"+m.maxTbt.toFixed(0))' "$OUT" 2>/dev/null || printf 'NA\tNA')"
V=$(awk "BEGIN{print ($S<=12 && $E<=12)?\"VALID\":\"INVALID-LOADED\"}")
printf '%s\t%s\t%s %s\tload_start=%s\tload_end=%s\tp75=%s\trc=%s\t%s\n' "$L" "$(git rev-parse --short HEAD)" "$ST" "$(date '+%H:%M:%S')" "$S" "$E" "$P" "$rc" "$V" >> "$RUNS/draws.tsv"
