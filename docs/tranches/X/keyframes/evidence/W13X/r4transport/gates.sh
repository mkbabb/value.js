#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4transport: floor gates, load recorded beside each (§0ev item 2)
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/r4transport
cd /Users/mkbabb/Programming/keyframes.js || exit 1
run() { n=$1; shift; { echo "START load $(sysctl -n vm.loadavg) $(date +%T)"; "$@" > "$E/$n.full" 2>&1; rc=$?; tail -25 "$E/$n.full"; rm -f "$E/$n.full"; echo "EXIT=$rc END load $(sysctl -n vm.loadavg) $(date +%T)"; } > "$E/$n.log" 2>&1; }
tag=$1
run check-$tag npm run check
run lint-$tag npm run lint
run lib-group-$tag npx vitest run --project library test/group
run test-demo-$tag npm run test:demo
echo DONE >> "$E/test-demo-$tag.log"
