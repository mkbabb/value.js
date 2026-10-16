#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — serve a COMMITTED export tree on a private port the way the e2e
# webServer does (VITE_API_URL = same origin, no backend), run one probe
# against it, stop the server. usage: sh serve-probe.sh <tree> <probe.mjs> [probe args...]
T=${1:?tree}; PR=${2:?probe}; shift 2
PORT=9171
cd "$T" || exit 3
VITE_API_URL=http://localhost:$PORT VJS_VITE_CACHE_DIR="$T/node_modules/.vite-e2e-9161" npx vite --port $PORT --strictPort > "$T.serve-probe.log" 2>&1 &
SV=$!
trap 'kill $SV 2>/dev/null' EXIT
i=0; until curl -s -m 3 -o /dev/null localhost:$PORT/ || [ $i -ge 40 ]; do sleep 1; i=$((i+1)); done
node "$PR" "http://localhost:$PORT" "$@"
