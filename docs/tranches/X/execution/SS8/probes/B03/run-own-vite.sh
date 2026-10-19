#!/bin/bash
# B03 fallback when the shared :9000 dev server is wedged: serve the SAME tree with the repo's own dev config
# (exactly the e2e webServer command, own deps cache) on :8093, run the given probe(s) against it, stop it.
# Usage (always under guard): guarded [--exclusive webkit] -- bash run-own-vite.sh <probe.mjs> [...]
set -u
REPO=/Users/mkbabb/Programming/value.js
cd "$REPO"
VJS_VITE_CACHE_DIR="$REPO/node_modules/.vite-ss8-b03" npx vite --port 8093 --strictPort > "$REPO/docs/tranches/X/execution/SS8/evidence/B03-hero-atmosphere/own-vite.log" 2>&1 &
VPID=$!
trap 'kill $VPID 2>/dev/null; wait $VPID 2>/dev/null' EXIT
for i in $(seq 1 120); do curl -s -m 5 -o /dev/null http://localhost:8093/ && break; sleep 1; done
# warm the module graph once (first transform is slow)
curl -s -m 120 -o /dev/null http://localhost:8093/
rc=0
for p in "$@"; do B03_BASE=http://localhost:8093/ node "$REPO/docs/tranches/X/execution/SS8/probes/B03/$p" || rc=$?; done
exit $rc
