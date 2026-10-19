#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.m2 — the L2-10 box-level docSH matrix: every route × 360/390/430 × light/dark, run $TAG.
cd "$(dirname "$0")"
for t in light dark; do for wh in "360 780" "390 844" "430 932"; do
  set -- $wh
  echo "# load $(uptime | sed 's/.*averages: //')"
  node probe-docsh.mjs $1 $2 $t "" "results/docsh-$TAG-$1-$t.json" 2>&1 | grep -v "^$"
done; done
