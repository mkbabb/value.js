#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# KF.W13V.c — the unit's served-page gates (headed Chromium), dev + gh-pages x2, then occlusion.mjs x2 (built dist).
cd "$(dirname "$0")"
export KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js
for tgt in dev:http://localhost:5173 gh:http://127.0.0.1:4176; do
  name=${tgt%%:*}; url=${tgt#*:}
  for run in 1 2; do
    uptime > logs/$name-$run-load.txt
    for sc in cube amiga square easing spring; do
      for vp in 1440x900 390x844; do
        node probe.mjs "$url" $sc $vp logs/probe-$sc-${vp%%x*}-$name-$run.json > /dev/null 2>logs/probe-$sc-${vp%%x*}-$name-$run.err
      done
    done
    node rail.mjs "$url" easing 1440x900 > logs/rail-easing-1440-$name-$run.json 2>&1
  done
done
cd /Users/mkbabb/Programming/keyframes.js
for run in 1 2; do
  uptime > $OLDPWD/logs/occlusion-after-$run.log
  node scripts/observe/demo/occlusion.mjs >> $OLDPWD/logs/occlusion-after-$run.log 2>&1
  echo "exit $?" >> $OLDPWD/logs/occlusion-after-$run.log
done
echo DONE > $OLDPWD/logs/DONE
