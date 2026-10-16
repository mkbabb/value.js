#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X-W12U close 3 (RESUME 3 close seat): the light gates, round $1, serial, each through the guard
R=${1:?round}; E=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence; C=$E/close3
G="$HOME/.claude/guard/guarded --light --timeout 8 --"
O=$C/light-$R.txt; echo "SERVED MODEL: claude-opus-5-5" > $O
echo "# round $R $(date '+%Y-%m-%d %H:%M:%S') HEAD $(git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $O
echo "## typecheck (close2/tc.sh)" >> $O; $G sh $E/close2/tc.sh >> $O 2>&1
echo "## lint" >> $O; (cd /Users/mkbabb/Programming/value.js && $G npx eslint . --max-warnings=0 > /dev/null 2>&1; echo "rc=$?") >> $O
echo "## k2 static" >> $O; (cd /Users/mkbabb/Programming/value.js && sh $E/k2/check-k2-static.sh 2>&1 | tail -1) >> $O
for t in light dark; do echo "## A2-VA-X-14 r4/diag-admin-room.mjs 1440 900 $t" >> $O; (cd $E/r4 && $G node diag-admin-room.mjs 1440 900 $t 2>&1 | grep -E 'GREEN|RED' | cut -c1-400) >> $O; done
echo "## served pair (k3/served.sh $R-close3)" >> $O; $G sh $E/k3/served.sh close3-$R >> $O 2>&1
echo "# end $(date '+%H:%M:%S') load $(sysctl -n vm.loadavg)" >> $O
