#!/bin/bash
# SS-8 B13 cure runner — the shared :9000 dev server is unresponsive (2026-10-20 16:08: curl 000 after
# 60 s, listener PID 79993 at 94% CPU; dev.sh not touched). Serve the SAME tree with the repo dev config
# on :9113 (VITE_API_URL=:3000, own deps cache), run cure.mjs <tag> twice sequentially, stop vite on exit.
# Usage (under guard, never --light): guarded --timeout 20 -- bash run-own-vite.sh <tag>
set -u
REPO=/Users/mkbabb/Programming/value.js
HERE=$REPO/docs/tranches/X/execution/SS8/probes/B13
E=$REPO/docs/tranches/X/execution/SS8/evidence/B13-card-swatches
TAG=${1:-run}
cd "$REPO"
VITE_API_URL=http://localhost:3000 VJS_VITE_CACHE_DIR="$REPO/node_modules/.vite-ss8-b13" npx vite --port 9113 --strictPort > "$E/vite-9113-$TAG.log" 2>&1 &
VPID=$!
trap 'kill $VPID 2>/dev/null; wait $VPID 2>/dev/null' EXIT
for i in $(seq 1 180); do curl -s -m 5 -o /dev/null http://localhost:9113/ && break; sleep 1; done
curl -s -m 180 -o /dev/null http://localhost:9113/
export B13_BASE=http://localhost:9113
cd "$HERE"
node cure.mjs "$TAG-1"; echo "exit $?"
node cure.mjs "$TAG-2"; echo "exit $?"
