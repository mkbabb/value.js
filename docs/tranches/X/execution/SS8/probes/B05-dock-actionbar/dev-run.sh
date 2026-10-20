#!/bin/zsh
# SERVED MODEL: claude-opus-5-5 — SS-8 B05: run one probe script against the quiet dev server
# (vite.b05.config.ts). Usage: [B05_RED=1] dev-run.sh <port> <probe.mjs>
set -u
ROOT=/Users/mkbabb/Programming/value.js
cd $ROOT
VITE_API_URL=http://localhost:3000 npx vite --config docs/tranches/X/execution/SS8/probes/B05-dock-actionbar/vite.b05.config.ts --port "$1" --strictPort > /dev/null 2>&1 &
SRV=$!
trap 'pkill -P $SRV 2>/dev/null; kill $SRV 2>/dev/null' EXIT
for i in {1..300}; do curl -s -o /dev/null --max-time 5 http://localhost:$1/ && break; perl -e 'select(undef,undef,undef,1)'; done
ORIGIN=http://localhost:$1 node docs/tranches/X/execution/SS8/probes/B05-dock-actionbar/$2
