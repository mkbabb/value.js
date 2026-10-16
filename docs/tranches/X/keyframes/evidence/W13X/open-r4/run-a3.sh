#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 4 open: BEFORE baseline of the A3 ghost rail (READ-ONLY; clean worktree at kf HEAD)
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/open-r4
cd "$WT" || exit 1
n=$1
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 10 -- npm run gh-pages 2>&1 | tail -2; ~/.claude/guard/guarded --light --timeout 15 -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1 --only=live-session-mobile 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T')"; } > "$OUT/a3-57fb241a-r$n.log.txt"
