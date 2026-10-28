#!/bin/bash
# OD19 repair 3 — one guarded run = one arm server (r3-serve.mjs) + the probe command(s) against it; the server
# stops on exit. usage: r3-run.sh <base|cure> <port> <cmd...>   (launch via ~/.claude/guard/guarded, never --light)
set -u
ARM=$1; PORT=$2; shift 2
P=$(cd "$(dirname "$0")" && pwd)
node "$P/r3-serve.mjs" "$ARM" "$PORT" 60 > "${R3_LOG:-/dev/null}" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for _ in $(seq 1 120); do curl -s -m 3 -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
curl -s -m 120 -o /dev/null "http://localhost:$PORT/"
"$@"
