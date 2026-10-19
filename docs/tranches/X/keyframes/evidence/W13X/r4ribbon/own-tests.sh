#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.r4ribbon (RESUME 2, 2026-10-15): the unit's own and touched demo test files,
# one file per run, serially, each a --light guarded run (the guard's "single unit file" class), --maxWorkers=2.
# Usage: own-tests.sh <tag> [tree]   → own-tests-<tag>.log beside this script (tree defaults to the kf checkout).
d=$(cd "$(dirname "$0")" && pwd); cd "${2:-/Users/mkbabb/Programming/keyframes.js}" || exit 1
out="$d/own-tests-$1.log"; : > "$out"
echo "start $(date +%T) load=$(sysctl -n vm.loadavg) kf=$(git rev-parse --short HEAD)" >> "$out"
F=$(grep -rlE "RibbonBar|ChannelControls|AnimationControlsGroup|useAnimationSync|ChannelOptions\b|ControlsPaneWrapper|EditorShell|demo-driver|SpringScene|EasingScene" test | sort)
fail=0
for f in $F; do
  r=$(~/.claude/guard/guarded --light --timeout 10 -- npx vitest run --project demo "$f" --maxWorkers=2 2>&1 | grep -E "^ +Tests " | tail -1)
  case "$r" in *failed*|"") fail=$((fail+1)); echo "FAIL $f :: $r" >> "$out";; *) echo "ok   $f :: $r" >> "$out";; esac
done
echo "end $(date +%T) load=$(sysctl -n vm.loadavg) files=$(echo $F | wc -w) failedFiles=$fail" >> "$out"
