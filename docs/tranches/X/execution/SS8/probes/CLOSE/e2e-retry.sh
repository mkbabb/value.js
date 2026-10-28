#!/usr/bin/env bash
# SS-8 CLOSE: targeted re-read of the e2e falsifiers that did not read GREEN x2 in the full runs.
set -u
cd "$(dirname "$0")/../../../../../../.."
E=docs/tranches/X/execution/SS8/evidence/CLOSE
export VJS_E2E_PORT=8297 VJS_E2E_PERF_PORT=8298
npx playwright test --project=smoke --workers=1 --reporter=list --timeout=90000 \
  e2e/smoke/flows/palette-flag.spec.ts e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts \
  e2e/smoke/ss8-b19-color-chips.spec.ts e2e/smoke/ss8-b26-cures.spec.ts \
  e2e/smoke/oracles/o14-preview-truth.spec.ts \
  > "$E/e2e-$1.txt" 2>&1
echo "exit $?" >> "$E/e2e-$1.txt"
