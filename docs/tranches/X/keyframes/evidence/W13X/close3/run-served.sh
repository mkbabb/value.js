#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X RESUME 2 close: per-row served probes at kf c761d639 (clean worktree, own vite --force :5398), serial, each through guarded --light; load recorded.
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X
O=$E/close3/served; mkdir -p $O; B=http://localhost:5398/
cd $O
r() { n=$1; shift; { echo "# $(date '+%T') load: $(sysctl -n vm.loadavg) base=$B kf=c761d639"; ~/.claude/guard/guarded --light --timeout 15 -- "$@" 2>&1 | cut -c1-400; echo "EXIT=$?"; echo "# end $(date '+%T') load: $(sysctl -n vm.loadavg)"; } > $O/$n.log.txt; }
for i in 1 2; do r pc2-r$i env TAG=close3-r$i node $E/pc2/probe.mjs $B; done
for i in 1 2; do r r4ribbon-r$i node $E/r4ribbon/probe.mjs $B; done
for i in 1 2; do r r4fade-r$i node $E/r4fade/fade.mjs $B close3-r$i $O/fade-frames; done
for i in 1 2 3; do r r4press-collapse-r$i env BASE=http://localhost:5398 MODE=collapse node $E/r4press/press-diag.mjs; done
for i in 1 2; do r ket10-r$i node $E/close3/ket10.mjs $B; done
for i in 1 2; do r pc-r$i node $E/pc/measure.mjs $B close3-r$i $O/pc-r$i; done
echo DONE > $O/served.done
