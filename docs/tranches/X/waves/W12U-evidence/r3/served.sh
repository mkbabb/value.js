#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X-W12U Repair 3: close2/served.sh with the k2 probe's full output kept (r3/k2-$1.txt), run $1
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence
echo "# load $(sysctl -n vm.loadavg)"
cd $E/k2 && BASE=http://localhost:9000 node probe-k2-rows.mjs 390 844 light > $E/r3/k2-$1.txt 2>&1; grep -E ' RED |^RED|^GREEN' $E/r3/k2-$1.txt | cut -c1-600
cd $E/m2 && X2_OUT=$E/r3/x2-$1.json node probe-x2.mjs 390 844 light "/,/palettes,/admin/users" 2>&1 | grep -E 'GREEN|RED' | cut -c1-160
echo "# load $(sysctl -n vm.loadavg)"
