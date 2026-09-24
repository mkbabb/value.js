#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# KF.W13V.s2 — the unit's served gates, dev + gh-pages, x2 each (headed).
cd "$(dirname "$0")"
mkdir -p logs after
for tgt in dev:http://localhost:5173/ gh:http://127.0.0.1:4176/; do
  name=${tgt%%:*}; url=${tgt#*:}
  for run in 1 2; do
    uptime > logs/$name-$run-load.txt
    node ../s/census.mjs "$url" 1 logs/census-$name-$run.json > logs/census-$name-$run.txt 2>&1
    for vp in 1440x900 390x844; do
      node pane.mjs "$url" $vp $name-$run after 1 >> logs/pane-$name-$run.txt 2>&1
    done
  done
done
echo DONE > logs/DONE
