#!/bin/sh
# SS8-0408 GREEN re-run (cure in tree). Run under guarded.
cd /Users/mkbabb/Programming/value.js || exit 1
export VJS_E2E_PORT=8194 VJS_E2E_PERF_PORT=8195
for i in 1 2; do echo "=== AFTER-$((i+2))"; npx playwright test e2e/smoke/ss8-b14-skeleton-ink.spec.ts --project=smoke --workers=1 --reporter=list 2>&1 | grep -E "SS8-0408|passed|failed|Expected|Received|Error"; done
