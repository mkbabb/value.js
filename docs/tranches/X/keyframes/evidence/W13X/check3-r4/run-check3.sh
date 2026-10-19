#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 4 Check 3 (L-20 pass 3): READ-ONLY gate re-reads at kf 57fb241a (clean worktree)
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/check3-r4
set -o pipefail
G=~/.claude/guard/guarded
cd "$WT" || exit 1
for g in check lint; do { echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD)"; $G --light --timeout 10 -- npm run $g 2>&1 | tail -4; echo "EXIT=$?"; } > "$OUT/$g.log.txt"; done
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //')"; $G --light --timeout 10 -- npm run build 2>&1 | tail -2; $G --light --timeout 10 -- npm run gh-pages 2>&1 | tail -2; echo "EXIT=$?"; } > "$OUT/build-ghpages.log.txt"
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //')"; $G --light --timeout 15 -- env KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node scripts/run-demo-roster.mjs --workers=1 --only=live-session-mobile 2>&1 | tail -40; echo "EXIT=$?"; echo "# end $(date '+%T')"; } > "$OUT/a3-r1.log.txt"
cd /Users/mkbabb/Programming/keyframes.js || exit 1
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') main tree head: $(git rev-parse --short HEAD); dirty: $(git status --porcelain -uno | tr '\n' ' ')"; $G --light --timeout 15 -- npx vitest run --project demo --maxWorkers=2 2>&1 | tail -6; echo "EXIT=$?"; } > "$OUT/test-demo.log.txt"
echo DONE > "$OUT/done"
