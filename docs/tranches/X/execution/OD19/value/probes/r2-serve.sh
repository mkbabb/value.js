#!/bin/bash
# OD19 repair 2 — serve a worktree's demo on its own vite dev server + deps cache (API pointed at a dead
# :3000, so the app is OFFLINE unless a probe stubs it), then run "$3..." against it. Stops the server on exit.
# usage: r2-serve.sh <worktree> <port> <cmd...>   (launch through ~/.claude/guard/guarded, never --light)
set -u
WT=$1; PORT=$2; shift 2
(cd "$WT" && VITE_API_URL=http://localhost:3000 VJS_VITE_CACHE_DIR="$WT/node_modules/.vite-r2-$PORT" exec npx vite --port "$PORT" --strictPort > "$WT/../r2-dev-$PORT.log" 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null; pkill -f "vite --port $PORT" 2>/dev/null' EXIT
for _ in $(seq 1 120); do curl -s -m 3 -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
curl -s -m 120 -o /dev/null "http://localhost:$PORT/" ; sleep 2
"$@"
