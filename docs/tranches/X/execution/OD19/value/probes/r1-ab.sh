#!/bin/bash
# OD19 repair 1 — A/B over two worktrees, each on its own dev server: base (HEAD) and cure (HEAD + the repair).
# usage: r1-ab.sh <pass>   (launch through ~/.claude/guard/guarded; one browser per probe run)
set -u
R=/Users/mkbabb/Programming/value.js; P=$R/docs/tranches/X/execution/OD19/value/probes
OUT=$R/docs/tranches/X/execution/OD19/value/after/repair-1/ab/pass-$1; mkdir -p "$OUT"
for arm in base cure; do
  if [ $arm = base ]; then WT=$R/.worktrees/r1-red; PORT=8291; else WT=$R/.worktrees/r1-after; PORT=8292; fi
  mkdir -p "$OUT/$arm"
  $P/r1-serve.sh "$WT" $PORT bash -c "
    curl -s -m 60 -o /dev/null http://localhost:$PORT/#/ ;
    $P/r1-cells.sh http://localhost:$PORT '$OUT/$arm' hop ;
    for c in dark-1440 light-390; do node $P/r1-hero-gbcr.mjs http://localhost:$PORT \$c 2 > '$OUT/$arm/hero-'\$c'.jsonl' 2>&1; done ;
    [ "${SKIP_LAT:-0}" = 1 ] || { mkdir -p '$OUT/$arm/lat' ; BASE=http://localhost:$PORT OUT='$OUT/$arm/lat' CELLS=dark-1440,light-390 node $P/latency-load.mjs > '$OUT/$arm/lat/run.txt' 2>&1 ; }
  "
  echo "$arm done"
done
