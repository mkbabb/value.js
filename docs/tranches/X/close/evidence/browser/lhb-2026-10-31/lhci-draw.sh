# SERVED MODEL: claude-opus-5-5
# (no shebang: line 1 is the SERVED MODEL receipt; run as `bash lhci-draw.sh <label>`)
# X.W11.lhb (COHESION §0gy.6, §0gx.3): one GPU lhci run (collect x3 + assert), the gate's own command on the config's
# own binary (lighthouserc.gpu.json collect.chromePath), with the 1-minute load read at its start and end and the browser
# version read from every LHR. Run from the repo root. usage: lhci-draw.sh <label>. Appends one row whatever the outcome.
D=docs/tranches/X/close/evidence/browser/lhb-2026-10-31; L="$1"
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waited=0
while awk "BEGIN{exit !($(load1) > 12)}"; do
  if [ "$waited" -ge 3600 ]; then echo "$L UNMEASURED-LOADED load=$(load1) waited=${waited}s" >> "$D/runs/lhci-draws.txt"; exit 3; fi
  /bin/sleep 30; waited=$((waited+30))
done
S=$(load1); ST=$(date '+%H:%M:%S')
~/.claude/guard/guarded --timeout 30 --cpu-cores 0 -- npx --yes @lhci/cli@0.15.x autorun --config=lighthouserc.gpu.json > "$D/runs/lhci-$L.log" 2>&1
rc=$?
E=$(load1)
BV=$("$(node -p 'require("./lighthouserc.gpu.json").ci.collect.chromePath')" --version | tr -d ' ' | sed 's/GoogleChrome/GoogleChrome\//')
for f in .lighthouseci/lhr-*.json; do node $D/lh-row.mjs "$f"; done > "$D/runs/lhci-$L.rows.jsonl"
R=$(node -e 'const r=require("fs").readFileSync(0,"utf8").trim().split("\n").map(JSON.parse);console.log("browser="+[...new Set(r.map(x=>x.browser))].join(",")+" mode="+r[0].mode+" tbt="+r.map(x=>x.tbt).join("/")+" optimistic="+Math.min(...r.map(x=>x.tbt))+" lcp="+r.map(x=>x.lcp).join("/")+" longest="+r.map(x=>x.longest[0]??0).join("/"))' < "$D/runs/lhci-$L.rows.jsonl")
V=$(awk "BEGIN{print ($S<=12 && $E<=12)?\"VALID\":\"INVALID-LOADED\"}")
echo "$L $(git rev-parse --short HEAD) $ST $(date '+%H:%M:%S') waited=${waited}s load_start=$S load_end=$E rc=$rc binary=$BV $R $V" >> "$D/runs/lhci-draws.txt"
