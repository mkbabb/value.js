#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 3 close (verify-only, §0ev.2): check ×2, lint ×2, test:demo ×2, build, gh-pages, kf e2e roster --workers=1 ×2 — serial, one heavy run at a time, each through guarded, at a clean worktree of the kf head
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-close3
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close4
cd "$WT" || exit 1
L() { uptime | sed 's/.*averages: //'; }
lite() { name=$1; shift; { echo "# $(date '+%F %T') load: $(L) head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 20 -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > "$OUT/$name.log.txt"; }
heavy() { name=$1; shift; { echo "# $(date '+%F %T') load: $(L) head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --timeout 40 "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > "$OUT/$name.log.txt"; }
for r in 1 2; do lite check-r$r npm run check; done
for r in 1 2; do lite lint-r$r npm run lint; done
echo FLOOR > "$OUT/floor.done"
for r in 1 2; do heavy test-demo-r$r -- npx vitest run --project demo --maxWorkers=2; done
lite build npm run build
lite gh-pages npm run gh-pages
for r in 1 2; do heavy e2e-r$r --exclusive webkit -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1; done
echo DONE > "$OUT/heavy.done"
