#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X-W12U close 2 typecheck runner (four programs), run $1
cd /Users/mkbabb/Programming/value.js
for p in lib demo test; do npx vue-tsc -p tsconfig.$p.json --noEmit >/dev/null 2>&1; echo "$p $?"; done
npx tsc -p tsconfig.e2e.json --noEmit >/dev/null 2>&1; echo "e2e $?"
echo "load $(sysctl -n vm.loadavg)"
