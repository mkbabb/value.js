#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.P.W8.cust2 gates, serial (one run at a time), each under ~/.claude/guard/guarded --light (each measured quick: <= 2.6 GB peak, seconds).
cd /Users/mkbabb/Programming/value.js || exit 1
R=bench/records/W8cust2
G="$HOME/.claude/guard/guarded --light"
for i in 1 2; do $G --timeout 10 -- npx vitest run test/css --maxWorkers=2 > $R/test-css-$i.log 2>&1; echo "test-css-$i rc=$?" >> $R/gates.log; done
for i in 1 2; do $G --timeout 15 -- npm run -s test:css-equivalence -- --maxWorkers=2 > $R/css-equiv-$i.log 2>&1; echo "css-equiv-$i rc=$?" >> $R/gates.log; done
$G --timeout 15 -- node bench/paired/build.mjs > $R/build-paired.log 2>&1; echo "build-paired rc=$?" >> $R/gates.log
for i in 1 2; do $G --timeout 20 -- node bench/paired/equiv.mjs product $R/equiv-$i.json > $R/equiv-$i.txt 2>&1; echo "equiv-$i rc=$?" >> $R/gates.log; done
$G --timeout 10 -- npm run build > $R/build.log 2>&1; echo "build rc=$?" >> $R/gates.log
echo DONE >> $R/gates.log
