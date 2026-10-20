#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — seat-private dev server on 8213 for the duration of one probe, stopped on exit.
cd "$(dirname "$0")/../../../../../../.."
VITE_API_URL=http://localhost:8213 VJS_VITE_CACHE_DIR=$PWD/node_modules/.vite-e2e-8213 npx vite --port 8213 >/dev/null 2>&1 &
VP=$!
trap 'kill $VP 2>/dev/null' EXIT
i=0; until curl -s -m 3 -o /dev/null http://localhost:8213/ || [ $i -gt 60 ]; do i=$((i+1)); sleep 2; done
node docs/tranches/X/execution/SS8/probes/Z1-app-chassis/cure-diag13.mjs
