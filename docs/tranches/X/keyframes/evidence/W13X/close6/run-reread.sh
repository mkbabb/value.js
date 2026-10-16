#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 5 close: §0ev.2 smoke re-reads ×2 (e2e r2's `heavy chunks … vendor-three`, residual R4-3) and the close seat's own re-run of the .a3o synthetic falsifier ×1 (reads the A3 selector from the shipped oracle). Serial, --light, headless, worktree at 389e31d2.
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close6
L() { uptime | sed 's/.*averages: //'; }
for r in 1 2; do ( cd $WT && { echo "# $(date '+%F %T') load: $(L) head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 10 -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1 --only=smoke 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(L)"; } > $OUT/smoke-reread-r$r.log.txt ); done
{ echo "# $(date '+%F %T') load: $(L) head: $(git -C $WT rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 5 -- env KF_ROOT=$WT KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node $OUT/../a3o/falsifier-a3o.mjs 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T')"; } > $OUT/falsifier-close.log.txt
