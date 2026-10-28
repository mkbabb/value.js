#!/bin/bash
# SERVED MODEL: claude-opus-5-5 · SS-8 B23 — the shared :9000 dev server flapped 2026-10-20 14:35-14:48
# (curl 000 / ERR_CONNECTION_RESET, listener PID changing). Serve the SAME tree with the repo's own dev
# config on :9119 (VITE_API_URL=:3000 as dev.sh sets it, own deps cache), run the B23 queue against it
# sequentially (one browser at a time), stop vite on exit.
# Usage (always under guard, never --light): guarded --timeout N -- bash run-own-vite.sh
set -u
REPO=/Users/mkbabb/Programming/value.js
HERE=$REPO/docs/tranches/X/execution/SS8/probes/B23
E=$REPO/docs/tranches/X/execution/SS8/evidence/B23-mix-canvas-result
cd "$REPO"
VITE_API_URL=http://localhost:3000 VJS_VITE_CACHE_DIR="$REPO/node_modules/.vite-ss8-b23" npx vite --port 9119 --strictPort > "$E/vite-9119.log" 2>&1 &
VPID=$!
trap 'kill $VPID 2>/dev/null; wait $VPID 2>/dev/null' EXIT
for i in $(seq 1 180); do curl -s -m 5 -o /dev/null http://localhost:9119/ && break; sleep 1; done
curl -s -m 180 -o /dev/null http://localhost:9119/
export B23_BASE=http://localhost:9119
log() { echo "[$(date +%H:%M:%S)] $*" >> "$E/run-all.log"; }
log "own-vite up (9119)"
cd "$HERE"
Q=${B23_QUEUE:-full}
if [ "$Q" = "retake" ]; then
  node canvas.mjs seam contrast2 > "$E/canvas-run3.out" 2>&1; log "canvas run3 (seam contrast2) exit $?"
  node result2.mjs tone2 copy teleport2 > "$E/result2-run.out" 2>&1; log "result2 run exit $?"
else
node k13.mjs chromium > "$E/k13-chromium.out" 2>&1; log "k13 chromium exit $?"
node canvas.mjs landing deact nullctx admin > "$E/canvas-run1.out" 2>&1; log "canvas run1 exit $?"
node canvas.mjs seam contrast > "$E/canvas-run2.out" 2>&1; log "canvas run2 exit $?"
node result.mjs tone swap order turb > "$E/result-run1.out" 2>&1; log "result run1 exit $?"
node result.mjs zoom400 c6 throw teleport pcm > "$E/result-run2.out" 2>&1; log "result run2 exit $?"
cd "$REPO"
VJS_E2E_PORT=9119 VJS_E2E_PERF_PORT=9119 npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --workers=1 --reporter=list > "$E/r4-mix-spec-run.txt" 2>&1; log "mix spec exit $?"
fi
log "queue done"
