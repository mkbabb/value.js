#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 4 close (verify-only, §0ev.2 + §0fl.4): check ×2, lint ×2, gh-pages, kf e2e roster --workers=1 ×2 at the clean worktree of the kf head; test:demo ×2 in the main tree (R3-4: the worktree's symlinked node_modules cannot load one glass subpath). Serial, one run at a time. --light throughout, reason: heavy-queue starvation measured at RESUME 3 close (20-min webkit-lock + 12-min slot waits); the roster launches chromium only (scripts/lib/demo-driver.mjs:564).
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
MAIN=/Users/mkbabb/Programming/keyframes.js
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close5
L() { uptime | sed 's/.*averages: //'; }
run() { dir=$1; name=$2; to=$3; shift 3; ( cd "$dir" && { echo "# $(date '+%F %T') load: $(L) dir: $dir head: $(git rev-parse --short HEAD) dirty: $(git status --porcelain -uno | tr '\n' ' ')"; ~/.claude/guard/guarded --light --timeout $to -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > "$OUT/$name.log.txt" ); }
for r in 1 2; do run "$WT" check-r$r 20 npm run check; done
for r in 1 2; do run "$WT" lint-r$r 20 npm run lint; done
run "$WT" gh-pages 15 npm run gh-pages
for r in 1 2; do run "$WT" e2e-r$r 40 env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1; done
for r in 1 2; do run "$MAIN" test-demo-r$r 30 npx vitest run --project demo --maxWorkers=2; done
echo DONE > "$OUT/all.done"
