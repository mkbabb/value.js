#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.a3o (§0fm.2): synthetic hollow rail-track falsifier run.
WT=/Users/mkbabb/Programming/keyframes-wt-W13X-open4
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/a3o
n=$1
{ echo "# $(date '+%F %T') load: $(uptime | sed 's/.*averages: //') head: $(git -C $WT rev-parse --short HEAD)"
  ~/.claude/guard/guarded --light --timeout 5 -- env KF_ROOT=$WT KF_PLAYWRIGHT_DIR=/Users/mkbabb/Programming/value.js node $OUT/falsifier-a3o.mjs 2>&1; echo "EXIT=$?"
  echo "# end $(date '+%T')"; } > "$OUT/falsifier-r$n.log.txt"
