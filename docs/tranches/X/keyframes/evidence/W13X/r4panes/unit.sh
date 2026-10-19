#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4panes unit falsifiers: BEFORE (pristine 2739c16d + the new/re-pointed
# test files) and AFTER (the cure bytes), each x2, the 1-minute load recorded (§0ev.2).
E=$(cd "$(dirname "$0")" && pwd)
FILES="test/demo/instrument/css-code-editor-seam.test.ts test/demo/instrument/CSSPasteDialog.test.ts test/demo/scenes/r4panes-entry-artifact.test.ts test/demo/scenes/r4panes-artifact-ink.test.ts test/demo/instrument/timeline-selected-stop.test.ts"
for i in 1 2; do
  for arm in before cure; do
    cd /Users/mkbabb/Programming/keyframes-wt-W13X-r4panes-$arm
    echo "unit-$arm-r$i start load $(sysctl -n vm.loadavg)"
    npx vitest run --project demo $FILES > $E/unit-$arm-r$i.log 2>&1
    echo "unit-$arm-r$i EXIT=$? end load $(sysctl -n vm.loadavg)"
  done
done
