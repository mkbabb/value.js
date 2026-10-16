#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 4 close, second runner: run-close.sh omitted `npm run build`, so the roster's subject-animates read "dist/keyframes.js not built" (instrument; logs kept as e2e-r1-nodist-instrument / e2e-r2-nodist-stopped). This runner builds, then e2e ×2, then test:demo ×2 in the main tree. --light throughout (reason in run-close.sh).
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
MAIN=/Users/mkbabb/Programming/keyframes.js
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close5
L() { uptime | sed 's/.*averages: //'; }
run() { dir=$1; name=$2; to=$3; shift 3; ( cd "$dir" && { echo "# $(date '+%F %T') load: $(L) dir: $dir head: $(git rev-parse --short HEAD) dirty: $(git status --porcelain -uno | tr '\n' ' ')"; ~/.claude/guard/guarded --light --timeout $to -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > "$OUT/$name.log.txt" ); }
run "$WT" build 15 npm run build
run "$WT" gh-pages2 15 npm run gh-pages
for r in 1 2; do run "$WT" e2e-r$r 40 env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1; done
for r in 1 2; do run "$MAIN" test-demo-r$r 30 npx vitest run --project demo --maxWorkers=2; done
echo DONE > "$OUT/all.done"
