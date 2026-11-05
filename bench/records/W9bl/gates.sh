#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W9 `.bl` gates with the x-p-w9-emitter-size emission in src/ (run under guarded)
R=/Users/mkbabb/Programming/value.js; W=$R/.worktrees/w9bl; O=$R/bench/records/W9bl
cd $R || exit 1
step(){ echo "=== $1 $(date +%T) load: $(uptime | sed 's/.*averages: //')"; }
for i in 1 2; do step "test-css-$i"; npx vitest run test/css --maxWorkers=2 > $O/test-css-$i.log 2>&1; echo "exit $?"; done
step build-paired; node bench/paired/build.mjs > $O/paired-build.log 2>&1; echo "exit $?"
for i in 1 2; do step "equiv-$i"; node bench/paired/equiv.mjs product $W/equiv-$i.json > $O/equiv-$i.log 2>&1; echo "exit $?"; gunzip -c bench/records/W8ifsemi/equiv-1.json.gz | cmp - $W/equiv-$i.json > $O/cmp-ifsemi-$i.txt 2>&1; echo "cmp exit $?" >> $O/cmp-ifsemi-$i.txt; done
step audit; node bench/paired/audit.mjs > $O/audit.log 2>&1; echo "exit $?"
step L-G3; grep -rln "instrument\|__prof\|PC\[\|NOW()" src/css/bbnf/generated | wc -l > $O/lg3.log 2>&1
step done
