#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# usage (under guarded): run-first-expand.sh <tag>; own vite on :8476 with its own cache, stopped on exit.
set -u
cd /Users/mkbabb/Programming/value.js
E=docs/tranches/X/close/evidence/browser/g13-2026-10-30
VITE_API_URL=http://localhost:8476 VJS_VITE_CACHE_DIR=$PWD/node_modules/.vite-e2e-8476 npx vite --port 8476 --strictPort >/dev/null 2>&1 &
V=$!
trap 'kill $V 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -s -o /dev/null http://localhost:8476/ && break; sleep 1; done
for r in 1 2; do
  node $E/first-expand-frame.mjs http://localhost:8476 > $E/first-expand-$1-r$r.json 2> $E/first-expand-$1-r$r.err
  echo "$1 r$r exit $?"
done
