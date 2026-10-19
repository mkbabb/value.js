#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 2 close: check ×2, lint ×2 at a clean worktree of the kf head
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-close3
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/close3
cd "$WT" || exit 1
for g in check lint; do for r in 1 2; do
  { echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git rev-parse --short HEAD)"; ~/.claude/guard/guarded --light --timeout 20 -- npm run $g 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(uptime | sed 's/.*averages: //')"; } > "$OUT/$g-r$r.log.txt"
done; done
echo DONE > "$OUT/floor.done"
