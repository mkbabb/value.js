#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.m3 gate runner (serial, one browser at a time, each through the guard). Usage: sh run-m3.sh <round tag>
R=${1:-r1}; cd "$(dirname "$0")"; G="$HOME/.claude/guard/guarded --light --timeout 5 --"
OUT=results/$R.txt; : > "$OUT"
echo "SERVED MODEL: claude-opus-5-5" >> "$OUT"
echo "# round $R $(date '+%Y-%m-%d %H:%M:%S') HEAD $(git rev-parse --short HEAD) $(uptime | sed 's/.*load/load/')" >> "$OUT"
for t in light dark; do
  for v in "360 780" "390 844" "430 932" "844 390"; do
    echo "## m2/probe-dock-layers-m2.mjs $v $t" >> "$OUT"; $G node ../m2/probe-dock-layers-m2.mjs $v $t 2>&1 | grep -E 'GEO|^(RED|GREEN)' | cut -c1-420 >> "$OUT"
    echo "## m3/probe-tools-run-m3.mjs $v $t" >> "$OUT"; $G node probe-tools-run-m3.mjs $v $t 2>&1 | cut -c1-520 >> "$OUT"
  done
  echo "## m3/probe-h1-rung-m3.mjs 844 390 $t" >> "$OUT"; $G node probe-h1-rung-m3.mjs 844 390 $t 2>&1 | cut -c1-700 >> "$OUT"
  echo "## m/probe-shell.mjs l844 $t landscape /" >> "$OUT"; $G node ../m/probe-shell.mjs l844 $t landscape / 2>&1 | cut -c1-260 | tail -1 >> "$OUT"
done
echo "# end $(date '+%H:%M:%S') $(uptime | sed 's/.*load/load/')" >> "$OUT"
