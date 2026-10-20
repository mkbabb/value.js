#!/bin/bash
# Z2 fallback when the shared :9000 dev server is DOWN (2026-10-20 14:35: curl 000, no listener):
# serve the SAME tree with the repo's own dev config on :8096 (VITE_API_URL=:3000 as dev.sh sets it,
# own deps cache), run the given probe(s) against it via ORIGIN, stop it on exit.
# Usage (always under guard, never --light): guarded --timeout N -- bash run-own-vite.sh <probe.mjs[:cell,cell]> ...
set -u
REPO=/Users/mkbabb/Programming/value.js
HERE=$REPO/docs/tranches/X/execution/SS8/probes/Z2-picker-cohort
EV=$REPO/docs/tranches/X/execution/SS8/evidence/Z2-picker-cohort
cd "$REPO"
VITE_API_URL=http://localhost:3000 VJS_VITE_CACHE_DIR="$REPO/node_modules/.vite-ss8-z2" npx vite --port 8096 --strictPort > "$EV/own-vite.log" 2>&1 &
VPID=$!
trap 'kill $VPID 2>/dev/null; wait $VPID 2>/dev/null' EXIT
for i in $(seq 1 120); do curl -s -m 5 -o /dev/null http://localhost:8096/ && break; sleep 1; done
curl -s -m 120 -o /dev/null http://localhost:8096/
# each arg = probe.mjs[:cell,cell] — several probes share one served tree, run sequentially (one browser at a time)
rc=0
for spec in "$@"; do P=${spec%%:*}; C=""; [ "$spec" != "$P" ] && C=${spec#*:}
  ORIGIN=http://localhost:8096 node "$HERE/$P" ${C//,/ } || rc=$?; done
exit $rc
