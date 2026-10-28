#!/bin/bash
# OD19 repair 1 (C1-V-05) — the hop trace over the three cells, SwiftShader and the ANGLE-Metal GPU witness.
# usage: r1-cells.sh <origin> <outdir> <tag>   (launch through ~/.claude/guard/guarded; one browser per run)
set -u
O=$1; D=$2; T=$3; P=/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/OD19/value/probes/r1-hop-trace.mjs
for cell in "1440 light" "1440 dark" "390 light"; do
  set -- $cell
  node $P "$O" $1 $2 2 > "$D/$T-sw-$1-$2.jsonl" 2>&1
  R1_GPU=1 node $P "$O" $1 $2 2 > "$D/$T-gpu-$1-$2.jsonl" 2>&1
done
