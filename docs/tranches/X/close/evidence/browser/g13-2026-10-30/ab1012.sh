#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — A/B control: the tree at 3d0514738 (glass 10.1.2), own npm ci, own ports.
set -u
cd ~/.dev-logs/g13/t1012
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/close/evidence/browser/g13-2026-10-30
npm ci --no-audit --no-fund > /dev/null 2>&1; echo "npm ci exit $?"
grep -m1 '"version"' node_modules/@mkbabb/glass-ui/package.json
VITE_API_URL=http://localhost:8479 VJS_VITE_CACHE_DIR=$PWD/node_modules/.vite-e2e-8479 npx vite --port 8479 --strictPort >/dev/null 2>&1 &
V=$!
trap 'kill $V 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -s -o /dev/null http://localhost:8479/ && break; sleep 1; done
for r in 1 2; do node first-expand-frame.mjs http://localhost:8479 > $OUT/first-expand-g1012-r$r.json 2> $OUT/first-expand-g1012-r$r.err; echo "probe r$r exit $?"; done
VJS_E2E_PORT=8479 VJS_E2E_PERF_PORT=8480 npx playwright test --project=smoke --workers=1 --retries=0 --repeat-each=2 --reporter=line e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts -g "0132" > $OUT/dock-specs-g1012-o33.txt 2>&1; echo "o33 exit $?"
