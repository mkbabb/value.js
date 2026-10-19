#!/bin/sh
# Fresh-process paired cells: one process per (repetition, entry); base + variants interleaved inside it.
cd "$(dirname "$0")/.."
TAG=${TAG:-iso}; REPS=${REPS:-3}; VARIANTS=${VARIANTS:-bbnf,aot-text}
mkdir -p runs/$TAG
for r in $(seq 1 $REPS); do
  for e in parseCssColor parseCssScalar parseCssValue parseCssValues parseKeyframeSelector parseTimingFunction parseStylesheet; do
    OUT=runs/$TAG/rep$r-$e.json ROUNDS=${ROUNDS:-11} ENTRIES=$e VARIANTS=$VARIANTS node harness/bench.mjs | tail -1
  done
done
