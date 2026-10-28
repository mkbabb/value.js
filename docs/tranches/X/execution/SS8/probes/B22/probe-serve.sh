#!/bin/bash
# SS-8 B22: a private dev server (same tree, same vite config as dev.sh's web half) on :9022,
# used because the shared :9000 was wedged (index not served in 30 s, vite pegged); then the probe.
# Server and probe live in ONE guarded tree; the server is killed on exit.
cd /Users/mkbabb/Programming/value.js
E=docs/tranches/X/execution/SS8/evidence/B22-gradient-specimen
VITE_API_URL=http://localhost:3000 npx vite --port 9022 --strictPort > $E/vite-9022.log 2>&1 &
V=$!
trap 'kill $V 2>/dev/null; pkill -P $V 2>/dev/null' EXIT
for i in $(seq 1 120); do curl -s -o /dev/null -m 5 http://localhost:9022/ && break; sleep 2; done
# warm the gradient module graph once (cold transform) before the timed cells
curl -s -m 300 -o /dev/null http://localhost:9022/
BASE=http://localhost:9022 CELLS="${CELLS:-}" node docs/tranches/X/execution/SS8/probes/B22/main.mjs
