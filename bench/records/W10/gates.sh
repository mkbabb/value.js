#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W10 per-unit gates ×2 (run under guarded). usage: gates.sh <out-dir>
R=/Users/mkbabb/Programming/value.js; O=$1; mkdir -p $O
cd $R || exit 1
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do
  step "check-$i"; node scripts/gen-grammar.mjs --check > $O/check-$i.txt 2>&1; echo "exit $?"
  step "e6-$i"; for f in grammar color; do printf '%s %s / %s\n' $f "$(npx esbuild --minify --loader=js < src/css/bbnf/generated/$f.js | wc -c | tr -d ' ')" "$(npx esbuild --minify --loader=js < src/css/bbnf/generated/$f.js | gzip | wc -c | tr -d ' ')"; done > $O/e6-$i.txt; cat $O/e6-$i.txt
  step "self-contained-$i"; for f in grammar color; do printf '%s from@mkbabb=%s import=%s\n' $f "$(grep -c 'from "@mkbabb' src/css/bbnf/generated/$f.js)" "$(grep -cE '^\s*import ' src/css/bbnf/generated/$f.js)"; done > $O/selfcontained-$i.txt; cat $O/selfcontained-$i.txt
  step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " $O/test-css-$i.log
  step "mirror-$i"; npm run test:css-equivalence -- --maxWorkers=2 > $O/mirror-$i.log 2>&1; echo "exit $?"; grep -cE "MIRROR-DEFECTS 0" $O/mirror-$i.log; grep -E "MIRROR-DEFECTS [1-9]" $O/mirror-$i.log | head -3
  step "vc-$i"; npx vite-node bench/wpt-conformance/conformance.ts --misses all > $O/vc-$i.txt 2>&1; echo "exit $?"; tail -1 $O/vc-$i.txt
done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $O/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; node bench/records/W10/delta.mjs $O/equiv-$i.json > $O/delta-$i.txt 2>&1; head -1 $O/delta-$i.txt; done
cmp $O/equiv-1.json $O/equiv-2.json && echo "equiv ×2 cmp-identical"; gzip -f $O/equiv-1.json; rm -f $O/equiv-2.json
step audit; node bench/paired/audit.mjs > $O/audit.log 2>&1; echo "exit $?"; tail -1 $O/audit.log
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1; cat $O/lg3.log
gzip -f $O/vc-1.txt $O/vc-2.txt; step done
