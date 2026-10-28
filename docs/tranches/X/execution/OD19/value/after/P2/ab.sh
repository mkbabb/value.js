#!/bin/bash
# A/B: serve one worktree on its own port, probe it, stop the server.
set -u
WT=$1; PORT=$2; OUTD=$3
R=/Users/mkbabb/Programming/value.js
P=$R/docs/tranches/X/execution/OD19/value/probes
mkdir -p $OUTD
cd $R/.worktrees/$WT
node node_modules/.bin/vite --port $PORT --strictPort > $OUTD/vite.log 2>&1 &
VP=$!
trap 'kill $VP 2>/dev/null; wait $VP 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -s -m 3 -o /dev/null http://localhost:$PORT/ && break; sleep 3; done
cd $R
BASE=http://localhost:$PORT OUT=$OUTD node $P/v3-profile.mjs > $OUTD/profile.stdout.txt 2>&1; echo "prof $?"
BASE=http://localhost:$PORT OUT=$OUTD CELLS=dark-1440,light-390 node $P/latency-load.mjs > $OUTD/latency.stdout.txt 2>&1; echo "lat $?"
