#!/bin/bash
# OD19 repair 3 (C3-V-04) — the picker drag on a BUILT bundle: serve <dir>/dist/gh-pages with the repo's
# zero-dependency static server, then run latency-load.mjs (ONLY=v3: the drag cells) once per pass.
# KIND=routes (C3-V-05) runs load-routes.mjs instead (cold/warm/hop per route, no screenshots, CPU unthrottled)
# at 1440 and 390, once per pass.
# usage: [KIND=routes] r3-built.sh <dir holding dist/gh-pages> <port> <outdir> <passes>   (via guarded, never --light)
set -u
R=/Users/mkbabb/Programming/value.js
DIR=$1; PORT=$2; OUTDIR=$(mkdir -p "$3" && cd "$3" && pwd); PASSES=$4
(cd "$DIR" && PERF_PORT=$PORT exec node $R/e2e/smoke/perf/serve-built.mjs > "$OUTDIR/serve-built.log" 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for _ in $(seq 1 120); do curl -s -m 3 -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 1; done
cd $R
for i in $(seq 1 "$PASSES"); do
  mkdir -p "$OUTDIR/pass-$i"
  if [ "${KIND:-drag}" = routes ]; then
    for w in 1440 390; do node docs/tranches/X/execution/OD19/value/probes/load-routes.mjs "http://127.0.0.1:$PORT" "$OUTDIR/pass-$i/routes-$w.json" $w 1; done
    echo "pass $i rc=$?"; continue
  fi
  ONLY=v3 BASE="http://127.0.0.1:$PORT" OUT="$OUTDIR/pass-$i" CELLS=light-1440,dark-1440,light-390,dark-390 node docs/tranches/X/execution/OD19/value/probes/latency-load.mjs
  echo "pass $i rc=$?"
done
