#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 2 Repair 1: the kf e2e roster x2 at --workers=1 over the gh-pages dist of kf 71480d85 (clean worktree), guarded --light (heavy FIFO starved: 20 min unadmitted at load 21; ESC-W13X-close3-1 precedent), load recorded.
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/repair-r2c1
cd /Users/mkbabb/Programming/keyframes-wt-W13X-close3
for i in 1 2; do
  { echo "# $(date '+%T') load: $(sysctl -n vm.loadavg) kf=$(git rev-parse --short HEAD)"; KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js ~/.claude/guard/guarded --light --timeout 40 -- node scripts/run-demo-roster.mjs --workers=1 2>&1; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(sysctl -n vm.loadavg)"; } > $E/e2e-r$i.log.txt
done
echo DONE > $E/e2e.done
