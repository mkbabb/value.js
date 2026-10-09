#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — r4transport: test:demo x2 on the shared tree (the unit's committed bytes + another writer's unstaged WIP in 5 unrelated files, listed in the log); load beside each (§0ev item 2). The detached worktree was void as a vitest instrument (glass-ui mock resolution through a symlinked / cloned node_modules).
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/r4transport
cd /Users/mkbabb/Programming/keyframes.js || exit 1
for i in 1 2; do
  { echo "START load $(sysctl -n vm.loadavg) $(date +%T) HEAD $(git rev-parse --short HEAD)"; git status --porcelain | grep -v '^??'; npm run test:demo > "$E/tdm-$i.full" 2>&1; rc=$?; grep -E "^ FAIL |Test Files|Tests |timed out" "$E/tdm-$i.full" | sort | uniq -c | cut -c1-220; echo "EXIT=$rc END load $(sysctl -n vm.loadavg) $(date +%T)"; } > "$E/test-demo-main-r$i.log" 2>&1
  rm -f "$E/tdm-$i.full"
done
echo DONE >> "$E/test-demo-main-r2.log"
