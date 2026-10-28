#!/bin/zsh
# SERVED MODEL: claude-opus-5-5 — SS-8 B05 CURE runner (dev-served): start the quiet dev server
# (vite.b05.config.ts; B05_RED=1 serves the four cured files from HEAD), warm it, run the o33 oracle
# with one worker, stop the server. Usage: [B05_RED=1] o33-dev.sh <port> <run-name>
set -u
ROOT=/Users/mkbabb/Programming/value.js
cd $ROOT
VITE_API_URL=http://localhost:3000 npx vite --config docs/tranches/X/execution/SS8/probes/B05-dock-actionbar/vite.b05.config.ts --port "$1" --strictPort > docs/tranches/X/execution/SS8/evidence/B05-dock-actionbar/vite-$2.log 2>&1 &
SRV=$!
trap 'pkill -P $SRV 2>/dev/null; kill $SRV 2>/dev/null' EXIT
for i in {1..300}; do curl -s -o /dev/null --max-time 5 http://localhost:$1/ && break; perl -e 'select(undef,undef,undef,1)'; done
curl -s -o /dev/null -w "warm %{http_code} %{time_total}\n" --max-time 300 http://localhost:$1/
ORIGIN=http://localhost:$1 RUN=$2 npx playwright test -c docs/tranches/X/execution/SS8/probes/B05-dock-actionbar/o33.config.mjs --workers=1
