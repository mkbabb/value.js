#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W8 RESUME 5 Close runner (sequential, verify-only; run under ~/.claude/guard/guarded --light)
R=/Users/mkbabb/Programming/value.js; W=$R/.worktrees/w8close6; O=$R/bench/records/W8close6
cd $R || exit 1; mkdir -p $W
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do step "probe-$i"; npx vite-node bench/records/W8semi/probe.ts 'a{width:if(supports(color: red): red; else: blue)}' 'a{width:if(style(--x: 1): red; else: blue;)}' 'a{width:if(foo)}' 'a{transform:rotate(0;1deg)}' '@keyframes k{0%{transform:translate(0;1px)}}' 'a{--x:f(a;b)}' 'a{--x:[a;[b]]}' 'a{--x:{a;b}}' 'a{--x:"a;b"}' 'a{--x:a;b}' 'a{--x:[a;b}' 'a{--x: ;}' > $O/probe-$i.txt 2>&1; echo "exit $?"; done
for i in 1 2; do step "falsifiers-$i"; npx vitest run test/v4-css-emerging.test.ts test/css/bbnf-if-semicolon.test.ts test/css/bbnf-semicolon.test.ts test/css/bbnf-custom-semicolon.test.ts --maxWorkers=2 > $O/falsifiers-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "vc-$i"; npx vite-node bench/wpt-conformance/conformance.ts --misses all > $O/vc-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "css-equiv-$i"; npm run -s test:css-equivalence -- --maxWorkers=2 > $O/css-equiv-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"; done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $W/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; gzip -c -n $W/equiv-$i.json > $W/equiv-$i.json.gz; node bench/records/W8ifsemi/delta.mjs $W/equiv-$i.json.gz > $O/delta-$i.txt 2>&1; gunzip -c bench/records/W8ifsemi/equiv-1.json.gz | cmp - $W/equiv-$i.json > $O/cmp-ifsemi-$i.txt 2>&1; echo "cmp exit $?" >> $O/cmp-ifsemi-$i.txt; done
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1
for i in 1 2; do step "check-$i"; node bench/records/W8cust/gen-pinned.mjs --check > $O/check-$i.log 2>&1; echo "exit $?"; done
step audit; node bench/records/W8cust/audit-pinned.mjs > $O/audit.log 2>&1; echo "exit $?"
for i in 1 2; do step "size-$i"; { git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js | wc -c; git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js | gzip | wc -c; } > $O/size-$i.log 2>&1; done
step vue-tsc; npx vue-tsc -p tsconfig.lib.json --noEmit > $O/vue-tsc-lib.log 2>&1; echo "lib exit $?"; npx vue-tsc -p tsconfig.test.json --noEmit > $O/vue-tsc-test.log 2>&1; echo "test exit $?"
step eslint; npx eslint src/css test/css bench/wpt-conformance bench/css-equivalence --max-warnings=0 > $O/eslint.log 2>&1; echo "exit $?"
step build; npm run build > $O/build.log 2>&1; echo "exit $?"
step entry-diff; node bench/records/W8lg1c/entry-diff.mjs $W/ed 7516f0d8c 4eaf27fbe > $O/entry-diff.txt 2>&1; echo "exit $?"
step lg1-audit; rm -rf $W/tree; mkdir -p $W/tree; git archive HEAD bench/records/W8lg1c3 | tar -x -C $W/tree
for i in 1 2; do (cd $W/tree/bench/records/W8lg1c3 && shasum -a 256 -c MANIFEST.sha256 | grep -c ': OK$') > $O/lg1-manifest-$i.log; node bench/paired/bootstrap.mjs $W/tree/bench/records/W8lg1c3/node/*.json $W/tree/bench/records/W8lg1c3/browser/*.json > $W/boot-$i.txt 2>&1; shasum -a 256 $W/boot-$i.txt >> $O/lg1-manifest-$i.log; cmp $W/boot-$i.txt bench/records/W8lg1c3/bootstrap-read.txt >> $O/lg1-manifest-$i.log 2>&1; echo "cmp exit $?" >> $O/lg1-manifest-$i.log; grep -cE 'STRADDLE|RED' $W/boot-$i.txt >> $O/lg1-manifest-$i.log; done
step done
