#!/bin/bash
# OD19 repair 2 — A/B over two worktrees, each on its own dev server: base (HEAD) then cure (HEAD + repair 2).
# usage: r2-ab.sh <pass>   (launch through ~/.claude/guard/guarded, never --light; one browser per probe run)
set -u
R=/Users/mkbabb/Programming/value.js; P=$R/docs/tranches/X/execution/OD19/value/probes
OUT=$R/docs/tranches/X/execution/OD19/value/after/repair-2/ab/pass-$1; mkdir -p "$OUT"
for arm in base cure; do
  if [ $arm = base ]; then WT=$R/.worktrees/r2-base; PORT=8391; else WT=$R/.worktrees/r2-cure; PORT=8392; fi
  mkdir -p "$OUT/$arm/lat"
  $P/r2-serve.sh "$WT" $PORT bash -c "
    node $P/r2-geo.mjs http://localhost:$PORT '$OUT/$arm' > '$OUT/$arm/geo.txt' 2>&1 ;
    BASE=http://localhost:$PORT OUT='$OUT/$arm/lat' CELLS=light-1440,light-390 node $P/latency-load.mjs > '$OUT/$arm/lat/run.txt' 2>&1
  "
  echo "$arm done"
done
