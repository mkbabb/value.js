#!/bin/zsh
# SERVED MODEL: claude-opus-5-5 · SS-8 B23 — sequential queue; every run through the guard, one at a time.
cd /Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/probes/B23 || exit 1
export B23_BASE=${B23_BASE:-http://localhost:9119}
E=../../evidence/B23-mix-canvas-result
G=~/.claude/guard/guarded
log() { echo "[$(date +%H:%M:%S)] $*" | tee -a $E/run-all.log; }
log start

$G --timeout 6 -- node k13.mjs chromium > $E/k13-chromium.out 2>&1; log "k13 chromium exit $?"
$G --timeout 20 -- node canvas.mjs landing deact nullctx admin > $E/canvas-run1.out 2>&1; log "canvas run1 exit $?"
$G --timeout 20 -- node canvas.mjs seam contrast > $E/canvas-run2.out 2>&1; log "canvas run2 exit $?"
$G --timeout 25 -- node result.mjs tone swap order turb > $E/result-run1.out 2>&1; log "result run1 exit $?"
$G --timeout 25 -- node result.mjs zoom400 c6 throw teleport pcm > $E/result-run2.out 2>&1; log "result run2 exit $?"
(cd /Users/mkbabb/Programming/value.js && VJS_E2E_PORT=${B23_BASE##*:} $G --timeout 10 -- npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --workers=1 --reporter=list) > $E/r4-mix-spec-run.txt 2>&1; log "mix spec exit $?"
$G --exclusive webkit --timeout 6 -- node k13.mjs webkit > $E/k13-webkit.out 2>&1; log "k13 webkit exit $?"
log done
