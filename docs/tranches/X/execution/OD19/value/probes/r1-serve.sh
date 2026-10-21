#!/bin/bash
# OD19 repair 1 — serve a worktree's demo on its own vite dev server and its own deps cache, isolated from the
# shared tree's live edits, then run "$3..." against it.   usage: r1-serve.sh <worktree> <port> <cmd...>
set -u
WT=$1; PORT=$2; shift 2
(cd "$WT" && VJS_VITE_CACHE_DIR="$WT/node_modules/.vite-r1-$PORT" exec npx vite --port "$PORT" --strictPort > "$WT/../r1-dev-$PORT.log" 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null; pkill -f "vite --port $PORT" 2>/dev/null' EXIT
for _ in $(seq 1 90); do curl -s -m 3 -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
"$@"
