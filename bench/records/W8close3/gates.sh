#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W8 RESUME 2026-10-14 close seat gate runner (sequential, one process at a time)
R=/Users/mkbabb/Programming/value.js; O=$R/bench/records/W8close3; W=$R/.worktrees/w8close3
cd $R
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do step "falsifier-prior-$i"; (cd $W/prior && npx vitest run test/css/bbnf-semicolon.test.ts --maxWorkers=2) > $O/falsifier-prior-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "falsifier-head-$i"; npx vitest run test/css/bbnf-semicolon.test.ts --maxWorkers=2 > $O/falsifier-head-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "vc-$i"; npx vite-node bench/wpt-conformance/conformance.ts --misses all > $O/vc-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "css-equiv-$i"; npm run -s test:css-equivalence -- --maxWorkers=2 > $O/css-equiv-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"; done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $W/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; done
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1
for i in 1 2; do step "check-$i"; node $W/gen-pinned.mjs --check > $O/check-$i.log 2>&1; echo "exit $?"; done
step audit; node $W/audit-pinned.mjs > $O/audit.log 2>&1; echo "exit $?"
for i in 1 2; do step "size-$i"; { git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js | wc -c; git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js | gzip | wc -c; } > $O/size-$i.log 2>&1; done
step vue-tsc; npx vue-tsc -p tsconfig.lib.json --noEmit > $O/vue-tsc-lib.log 2>&1; echo "lib exit $?"; npx vue-tsc -p tsconfig.test.json --noEmit > $O/vue-tsc-test.log 2>&1; echo "test exit $?"
step eslint; npx eslint src/css test/css bench/wpt-conformance bench/css-equivalence/w6-classes.ts --max-warnings=0 > $O/eslint.log 2>&1; echo "exit $?"
step build; npm run build > $O/build.log 2>&1; echo "exit $?"
step lg1-audit; rm -rf $W/tree; mkdir -p $W/tree; git archive HEAD bench/records/W8lg1r | tar -x -C $W/tree
for i in 1 2; do (cd $W/tree/bench/records/W8lg1r && shasum -a 256 -c MANIFEST.sha256 | grep -c ': OK$') > $O/lg1-manifest-$i.log; node bench/paired/bootstrap.mjs $W/tree/bench/records/W8lg1r/node/*.json $W/tree/bench/records/W8lg1r/browser/*.json > $W/boot-$i.txt 2>&1; shasum -a 256 $W/boot-$i.txt >> $O/lg1-manifest-$i.log; done
step done
