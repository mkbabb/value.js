#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.m — the Lens-2 falsifier matrix, run serially (host load): <run-tag> <tag:theme>...
R=$1; shift
A=L2-1,L2-2,L2-5,L2-6,L2-8,L2-11,SA
for c in "$@"; do t=${c%%:*}; th=${c##*:}
  node probe-rows.mjs $t $th $A results/m-$R-$t-$th.json > results/m-$R-$t-$th.log 2>&1
done
