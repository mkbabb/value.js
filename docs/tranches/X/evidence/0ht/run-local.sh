#!/bin/bash
# Serve the working tree on :${PORT:-5392} (dev) and run probe.mjs against it; the server dies with this script.
cd /Users/mkbabb/Programming/value.js
VJS_VITE_CACHE_DIR=/Users/mkbabb/Programming/value.js/node_modules/.vite-x0ht-${PORT:-5392} npx vite --port ${PORT:-5392} --strictPort > /Users/mkbabb/.dev-logs/x-0ht/vite-run-${PORT:-5392}.log 2>&1 &
V=$!
trap "kill $V 2>/dev/null; pkill -P $V 2>/dev/null" EXIT
for i in $(seq 1 120); do curl -s -o /dev/null http://localhost:${PORT:-5392}/ && break; sleep 0.5; done
cd /Users/mkbabb/.dev-logs/x-0ht && P="$1" && shift && node "$P" "$@"
