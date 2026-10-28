#!/bin/zsh
# glass-10.1.2 gates x2 (keyframes then fourier), sequential, every run through guarded.
KE=/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/OD19/keyframes/after/glass-10.1.2
FE=/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/OD19/fourier/after/glass-10.1.2
G=~/.claude/guard/guarded
for i in 1 2; do
  (cd /Users/mkbabb/Programming/keyframes.js && $G --timeout 30 -- npm run check > $KE/check-$i.txt 2>&1; echo "rc=$?" >> $KE/check-$i.txt)
  (cd /Users/mkbabb/Programming/keyframes.js && $G --timeout 45 -- npx vitest run --project demo --maxWorkers=2 > $KE/vitest-demo-$i.txt 2>&1; echo "rc=$?" >> $KE/vitest-demo-$i.txt)
  (cd /Users/mkbabb/Programming/fourier-analysis/web && $G --timeout 30 -- npx vue-tsc -b --force > $FE/vue-tsc-$i.txt 2>&1; echo "rc=$?" >> $FE/vue-tsc-$i.txt)
  (cd /Users/mkbabb/Programming/fourier-analysis/web && $G --timeout 30 -- npx vitest run --maxWorkers=2 > $FE/vitest-$i.txt 2>&1; echo "rc=$?" >> $FE/vitest-$i.txt)
done
echo ALLDONE
