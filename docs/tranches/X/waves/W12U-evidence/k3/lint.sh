#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.W12U.k3 lint runner, run $1 (rc is eslint's own)
cd /Users/mkbabb/Programming/value.js
echo "load $(sysctl -n vm.loadavg)"
npx eslint . --max-warnings=0 > /dev/null 2>&1; echo "rc=$?"
