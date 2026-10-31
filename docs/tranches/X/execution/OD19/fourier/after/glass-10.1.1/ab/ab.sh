#!/bin/bash
# A/B: od19-p1 on glass 10.1.0 (base worktree at HEAD) vs 10.1.1 (shared tree), alternating, 3 passes.
E=$(dirname "$0")
BASE=/Users/mkbabb/Programming/fourier-analysis/.worktrees/g1011-base/web
CURE=/Users/mkbabb/Programming/fourier-analysis/web
for p in 1 2 3; do
  for arm in base cure; do
    [ $arm = base ] && D=$BASE || D=$CURE
    cd "$D" && BASE_URL=http://localhost:4190 ~/.claude/guard/guarded --timeout 30 -- npx playwright test --workers=1 --reporter=line e2e/od19-p1-transport-docks.spec.ts > "$E/p$p-$arm.txt" 2>&1
    echo "p$p $arm rc=$? $(sed 's/\x1b\[[0-9;]*[A-Za-z]//g' "$E/p$p-$arm.txt" | grep -E '^\s+[0-9]+ (passed|failed|flaky)' | tr -s ' ' | tr '\n' ' ')"
  done
done
