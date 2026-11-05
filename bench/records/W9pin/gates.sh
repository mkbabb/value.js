#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W9 `.pin` gates on @mkbabb/bbnf-lang 0.3.0 (published, provenance) — run under guarded
R=/Users/mkbabb/Programming/value.js; W=$R/.worktrees/w9pin; O=$R/bench/records/W9pin
cd $R || exit 1
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do
  step "check-$i"; node scripts/gen-grammar.mjs --check > $O/check-$i.txt 2>&1; echo "exit $?"
  step "e6-$i"; for f in grammar color; do printf '%s %s / %s\n' $f "$(npx esbuild --minify --loader=js < src/css/bbnf/generated/$f.js | wc -c | tr -d ' ')" "$(npx esbuild --minify --loader=js < src/css/bbnf/generated/$f.js | gzip | wc -c | tr -d ' ')"; done > $O/e6-$i.txt; cat $O/e6-$i.txt
  step "self-contained-$i"; for f in grammar color; do printf '%s from@mkbabb=%s import=%s\n' $f "$(grep -c 'from "@mkbabb' src/css/bbnf/generated/$f.js)" "$(grep -cE '^\s*import ' src/css/bbnf/generated/$f.js)"; done > $O/selfcontained-$i.txt; cat $O/selfcontained-$i.txt
  step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"
  step "mirror-$i"; npm run test:css-equivalence -- --maxWorkers=2 > $O/mirror-$i.log 2>&1; echo "exit $?"
  step "vc-$i"; npx vite-node bench/wpt-conformance/conformance.ts --misses all > $O/vc-$i.txt 2>&1; echo "exit $?"
done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $W/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; gunzip -c bench/records/W8ifsemi/equiv-1.json.gz | cmp - $W/equiv-$i.json > $O/cmp-ifsemi-$i.txt 2>&1; echo "cmp exit $?" >> $O/cmp-ifsemi-$i.txt; cat $O/cmp-ifsemi-$i.txt; done
step audit; node bench/paired/audit.mjs > $O/audit.log 2>&1; echo "exit $?"
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1; cat $O/lg3.log
step done
