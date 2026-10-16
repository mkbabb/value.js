#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 5 close (verify-only, §0ev.2). check ×2 · lint ×2 · build · gh-pages in the clean worktree at kf 389e31d2; kf e2e roster --workers=1 ×2 over that dist; test:demo ×2 in the main tree (R3-4). --light throughout (§0fl.4: chromium only, one run at a time, serial; RESUME 3 measured heavy-queue starvation).
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
MAIN=/Users/mkbabb/Programming/keyframes.js
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close6
L() { uptime | sed 's/.*averages: //'; }
run() { dir=$1; name=$2; to=$3; shift 3; ( cd "$dir" && { echo "# $(date '+%F %T') load: $(L) dir: $dir head: $(git rev-parse --short HEAD) dirty: $(git status --porcelain -uno | tr '\n' ' ')"; ~/.claude/guard/guarded --light --timeout $to -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > "$OUT/$name.log.txt" ); }
for r in 1 2; do run "$WT" check-r$r 15 npm run check; done
for r in 1 2; do run "$WT" lint-r$r 15 npm run lint; done
run "$WT" build 15 npm run build
run "$WT" gh-pages 15 npm run gh-pages
for r in 1 2; do run "$WT" e2e-r$r 40 env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1; done
for r in 1 2; do run "$MAIN" test-demo-r$r 30 npx vitest run --project demo --maxWorkers=2; done
echo DONE > "$OUT/all.done"
