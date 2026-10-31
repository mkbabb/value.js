#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut (COHESION §0gx.3): one GPU lhci collect, the gate's own command, with the 1-min load read at its start and end.
# LHCI_CHROME names another binary for the discriminating read (default: the gate's Chrome for Testing).
# Run from the repo root. usage: lhci-draw.sh <label>. Appends one row to runs/lhci-draws.txt whatever the outcome.
D=docs/tranches/X/close/evidence/browser/cut-2026-10-30; L="$1"
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waited=0
while awk "BEGIN{exit !($(load1) > 12)}"; do
  if [ "$waited" -ge 3600 ]; then echo "$L UNMEASURED-LOADED $(load1)" >> "$D/runs/lhci-draws.txt"; exit 3; fi
  /bin/sleep 30; waited=$((waited+30))
done
S=$(load1); ST=$(date '+%H:%M:%S')
~/.claude/guard/guarded --timeout 30 --cpu-cores 0 -- npx --yes @lhci/cli@0.15.x autorun --config=lighthouserc.gpu.json --collect.chromePath="${LHCI_CHROME:-$(node -p "require('playwright').chromium.executablePath()")}" > "$D/runs/lhci-$L.log" 2>&1
rc=$?
E=$(load1)
R=$(for f in .lighthouseci/lhr-*.json; do node $D/lh-read.mjs "$f" ; done | node -e 'const r=require("fs").readFileSync(0,"utf8").trim().split("\n").map(JSON.parse);console.log("mode="+r[0].mode+" tbt="+r.map(x=>x.tbt).join("/")+" optimistic="+Math.min(...r.map(x=>x.tbt))+" longest="+r.map(x=>x.lhLongTasks[0]??0).join("/"))')
V=$(awk "BEGIN{print ($S<=12 && $E<=12)?\"VALID\":\"INVALID-LOADED\"}")
echo "$L $(git rev-parse --short HEAD) $ST $(date '+%H:%M:%S') load_start=$S load_end=$E rc=$rc $R $V" >> "$D/runs/lhci-draws.txt"
