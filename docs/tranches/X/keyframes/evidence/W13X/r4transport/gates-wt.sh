#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4transport: floor gates at the committed bytes (a detached worktree at the unit's HEAD; the shared tree carries another writer's WIP), load recorded beside each (§0ev item 2)
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/r4transport
cd /private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/kf-before-r4t || exit 1
run() { n=$1; shift; { echo "START load $(sysctl -n vm.loadavg) $(date +%T)"; "$@" > "$E/$n.full" 2>&1; rc=$?; tail -25 "$E/$n.full"; rm -f "$E/$n.full"; echo "EXIT=$rc END load $(sysctl -n vm.loadavg) $(date +%T)"; } > "$E/$n.log" 2>&1; }
tag=$1
run check-$tag npm run check
run lint-$tag npm run lint
run lib-group-$tag npx vitest run --project library test/group
run test-demo-$tag npm run test:demo
echo DONE >> "$E/test-demo-$tag.log"
