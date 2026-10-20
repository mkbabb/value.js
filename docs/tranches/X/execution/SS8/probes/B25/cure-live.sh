#!/bin/zsh
# SS-8 B25 cure live re-read: own vite (hmr/watch off, B19's config) + probe-cure.mjs, torn down on exit.
cd /Users/mkbabb/Programming/value.js
npx vite --config docs/tranches/X/execution/SS8/probes/B19/vite.b19.config.mjs --port 9125 --strictPort > /dev/null 2>&1 &
VPID=$!
trap 'kill $VPID 2>/dev/null; wait $VPID 2>/dev/null' EXIT
for i in {1..120}; do curl -s -o /dev/null -m 3 http://localhost:9125/ && break; sleep 1; done
B25_BASE=http://localhost:9125 node docs/tranches/X/execution/SS8/probes/B25/probe-cure.mjs "$@"
