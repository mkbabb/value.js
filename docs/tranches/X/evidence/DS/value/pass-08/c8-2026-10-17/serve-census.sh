#!/bin/bash
# X-DS value pass 8: the dev server and the census in ONE guarded slot (the machine's heavy
# pool was full; a separately queued census could outlive its server). Stops the server on exit.
cd /Users/mkbabb/Programming/value.js || exit 1
E=docs/tranches/X/evidence/DS/value/pass-08/c8-2026-10-17
VITE_API_URL=http://localhost:9263 VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9263 npx vite --port 9263 --strictPort >> $E/server.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; pkill -P $SRV 2>/dev/null' EXIT
for i in $(seq 1 90); do curl -s -o /dev/null -w '%{http_code}' http://localhost:9263/ | grep -q 200 && break; sleep 2; done
node scripts/ds-census.mjs --base http://localhost:9263 --widths 1440 --themes light,dark --settle 15000 --gpu --out $E/census-after.json
