#!/bin/bash
# OD19 · load — serve a BUILT tree with vite preview and run load-routes.mjs.
# usage: load-run.sh <tree (holds dist/gh-pages)> <port> <out-prefix> [widths="1440 390"] [cpu=4]
# Launch through ~/.claude/guard/guarded (it reaps the server and the browser).
set -u
R=/Users/mkbabb/Programming/value.js
TREE=$1; PORT=$2; OUT=$3; WIDTHS=${4:-"1440 390"}; CPU=${5:-4}
(cd "$TREE" && exec npx vite preview --mode gh-pages --port "$PORT" --strictPort > "$OUT-preview.log" 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null; pkill -P $SRV 2>/dev/null' EXIT
for _ in $(seq 1 60); do curl -s -m 2 -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
for W in $WIDTHS; do
  node "$R/docs/tranches/X/execution/OD19/value/probes/load-routes.mjs" "http://localhost:$PORT" "$OUT-$W.json" "$W" "$CPU" > "$OUT-$W.log" 2>&1
  echo "width $W rc=$?"
done
