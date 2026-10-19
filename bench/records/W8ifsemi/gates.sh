#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W8 `.ifsemi` gate runner (sequential; run under ~/.claude/guard/guarded --light)
R=/Users/mkbabb/Programming/value.js; O=$R/bench/records/W8ifsemi; W=$R/.worktrees/w8ifsemi
cd $R || exit 1; mkdir -p $W
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do step "falsifiers-$i"; npx vitest run test/v4-css-emerging.test.ts test/css/bbnf-if-semicolon.test.ts test/css/bbnf-semicolon.test.ts test/css/bbnf-custom-semicolon.test.ts --maxWorkers=2 > $O/falsifier-after-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "vc-$i"; npx vite-node bench/wpt-conformance/conformance.ts --misses all > $O/vc-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "css-equiv-$i"; npm run -s test:css-equivalence -- --maxWorkers=2 > $O/css-equiv-$i.log 2>&1; echo "exit $?"; done
for i in 1 2; do step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"; done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $W/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; gzip -c -n $W/equiv-$i.json > $O/equiv-$i.json.gz; node $O/delta.mjs $O/equiv-$i.json.gz > $O/delta-$i.txt 2>&1; done
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1
for i in 1 2; do step "check-$i"; node bench/records/W8cust/gen-pinned.mjs --check > $O/check-$i.log 2>&1; echo "exit $?"; done
step audit; node bench/records/W8cust/audit-pinned.mjs > $O/audit.log 2>&1; echo "exit $?"
step vue-tsc; npx vue-tsc -p tsconfig.lib.json --noEmit > $O/vue-tsc-lib.log 2>&1; echo "lib exit $?"; npx vue-tsc -p tsconfig.test.json --noEmit > $O/vue-tsc-test.log 2>&1; echo "test exit $?"
step eslint; npx eslint src/css test/css bench/wpt-conformance bench/css-equivalence --max-warnings=0 > $O/eslint.log 2>&1; echo "exit $?"
step build; npm run build > $O/build.log 2>&1; echo "exit $?"
step done
