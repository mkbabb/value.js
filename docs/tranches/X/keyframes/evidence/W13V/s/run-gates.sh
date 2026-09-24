#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# KF.W13V.s — the unit's served-page gates, dev + gh-pages, ×2 each (headed).
cd "$(dirname "$0")"
for tgt in dev:http://localhost:5173/ gh:http://127.0.0.1:4176/; do
  name=${tgt%%:*}; url=${tgt#*:}
  for run in 1 2; do
    uptime > logs/$name-$run-load.txt
    node census.mjs "$url" 1 logs/census-$name-$run.json > logs/census-$name-$run.txt 2>&1
    node items.mjs "$url" 1440x900 > logs/items-$name-$run-1440.txt 2>&1
    node items.mjs "$url" 390x844 > logs/items-$name-$run-390.txt 2>&1
    node landing.mjs "$url" 390x844,360x740,1440x900 light,dark > logs/landing-$name-$run.txt 2>&1
    node sheet.mjs "$url" 390x844,360x740 light,dark > logs/sheet-$name-$run.txt 2>&1
  done
done
echo DONE > logs/DONE
