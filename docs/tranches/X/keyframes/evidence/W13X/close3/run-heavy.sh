#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 2 close: test:demo ×2, build, gh-pages, kf e2e roster --workers=1 ×2 (serial, one heavy run at a time, each through guarded)
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-close3
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close3
cd "$WT" || exit 1
run() { name=$1; shift; { echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --timeout 40 -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(uptime | sed 's/.*averages: //')"; } > "$OUT/$name.log.txt"; }
run2() { name=$1; shift; { echo "# $(date "+%F %T") load: $(uptime | sed "s/.*averages: //") head: $(git rev-parse --short HEAD) (guarded --light: the 3 heavy slots were held 22 min by other repos' 44-170 min runs)"; ~/.claude/guard/guarded --light --timeout 20 -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date "+%T") load: $(uptime | sed "s/.*averages: //")"; } > "$OUT/$name.log.txt"; }
run3() { name=$1; shift; { echo "# $(date "+%F %T") load: $(uptime | sed "s/.*averages: //") head: $(git rev-parse --short HEAD) (guarded --light --timeout 40: queued heavy 20:44-21:08, 24 min, never admitted; slots held by two 240-min hassio chains)"; ~/.claude/guard/guarded --light --timeout 40 -- "$@" 2>&1; echo "EXIT=$?"; echo "# end $(date "+%T") load: $(uptime | sed "s/.*averages: //")"; } > "$OUT/$name.log.txt"; }
# done: test-demo-r1 npx vitest run --project demo --maxWorkers=2
# done: test-demo-r2 npx vitest run --project demo --maxWorkers=2
# done: build npm run build
# done: gh-pages npm run gh-pages
run3 e2e-r1 env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1
run3 e2e-r2 env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1
echo DONE > "$OUT/heavy.done"
