#!/bin/bash
# OD19 · load — serve a BUILT tree (dist/gh-pages) with vite preview on $2 and run "$3..." against it.
# usage: load-serve.sh <tree> <port> <cmd...>   (launch through ~/.claude/guard/guarded)
set -u
TREE=$1; PORT=$2; shift 2
(cd "$TREE" && exec npx vite preview --mode gh-pages --port "$PORT" --strictPort > /dev/null 2>&1) &
SRV=$!
trap 'kill $SRV 2>/dev/null; pkill -P $SRV 2>/dev/null' EXIT
for _ in $(seq 1 60); do curl -s -m 2 -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
"$@"
