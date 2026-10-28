#!/bin/bash
R=/Users/mkbabb/Programming/value.js
cd $R
VITE_API_URL=http://localhost:8194 VJS_VITE_CACHE_DIR=$R/node_modules/.vite-e2e-8194 npx vite --port 8194 > $R/.worktrees/p3-resume/vite.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
until curl -s -m 3 -o /dev/null http://localhost:8194/; do sleep 1; done
node $R/.worktrees/p3-resume/err-probe.mjs http://localhost:8194
