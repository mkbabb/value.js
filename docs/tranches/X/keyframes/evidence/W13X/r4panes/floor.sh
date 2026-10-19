#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4panes floor at the final bytes (the cure worktree = kf 403064f7):
# check x2, lint x2, test:demo x2, the 1-minute load recorded beside each (§0ev.2).
E=$(cd "$(dirname "$0")" && pwd)
cd /Users/mkbabb/Programming/keyframes-wt-W13X-r4panes-cure
for g in check:check lint:lint test-demo:test:demo; do
  name=${g%%:*}; cmd=${g#*:}
  for i in 1 2; do
    echo "$name-r$i start load $(sysctl -n vm.loadavg)"
    npm run $cmd > $E/final-$name-r$i.log 2>&1
    echo "$name-r$i EXIT=$? end load $(sysctl -n vm.loadavg)"
  done
done
echo DONE
