#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X-W12U close 2: served falsifiers at 390x844 light on :9000, run $1
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence
echo "# load $(sysctl -n vm.loadavg)"
cd $E/k2 && BASE=http://localhost:9000 node probe-k2-rows.mjs 390 844 light 2>&1 | tail -1
cd $E/m2 && X2_OUT=$E/close2/x2-$1.json node probe-x2.mjs 390 844 light "/,/palettes,/admin/users" 2>&1 | grep -E 'GREEN|RED' | cut -c1-160
echo "# load $(sysctl -n vm.loadavg)"
