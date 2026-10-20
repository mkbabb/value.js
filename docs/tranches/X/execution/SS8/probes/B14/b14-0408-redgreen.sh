#!/bin/sh
# SS8-0408 RED x2 (tree as-is) -> apply cure patch -> GREEN x2. Run under guarded.
cd /Users/mkbabb/Programming/value.js || exit 1
export VJS_E2E_PORT=8194 VJS_E2E_PERF_PORT=8195
SPEC=e2e/smoke/ss8-b14-skeleton-ink.spec.ts
run() { echo "=== $1"; npx playwright test $SPEC --project=smoke --workers=1 --reporter=list 2>&1 | grep -E "SS8-0408|passed|failed|Expected|Received"; }
run BEFORE-1; run BEFORE-2
git apply docs/tranches/X/execution/SS8/probes/B14/b14-0408-cure.patch && echo "=== cure applied"
sleep 3
run AFTER-1; run AFTER-2
