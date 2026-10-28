#!/usr/bin/env bash
# SS-8 CLOSE: re-read every e2e cure falsifier on the current tree, one playwright run per call.
# Usage: e2e-falsifiers.sh <run-tag>   (always launched via ~/.claude/guard/guarded by the caller)
set -u
cd "$(dirname "$0")/../../../../../../.."
E=docs/tranches/X/execution/SS8/evidence/CLOSE
export VJS_E2E_PORT=8297 VJS_E2E_PERF_PORT=8298
npx playwright test --project=smoke --project=smoke-admin --workers=1 --reporter=list \
  e2e/smoke/ss8-b07-pane-shell.spec.ts e2e/smoke/ss8-b12-card-shell.spec.ts \
  e2e/smoke/ss8-b14-skeleton-ink.spec.ts e2e/smoke/ss8-b15-palette-cards.spec.ts \
  e2e/smoke/ss8-b19-color-chips.spec.ts e2e/smoke/ss8-b20-gradient.spec.ts \
  e2e/smoke/ss8-b22-gradient-specimen.spec.ts e2e/smoke/ss8-b26-cures.spec.ts \
  e2e/smoke/ss8-z1-app-chassis.spec.ts e2e/smoke/ss8-z2-picker-cohort.spec.ts \
  e2e/smoke/oracles/o14-preview-truth.spec.ts e2e/smoke/oracles/o22-status-lamp.spec.ts \
  e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/flows/palette-flag.spec.ts \
  e2e/smoke/admin/ss8-b17-admin-names.spec.ts e2e/smoke/admin/ss8-b18-admin-panels.spec.ts \
  > "$E/e2e-$1.txt" 2>&1
echo "exit $?" >> "$E/e2e-$1.txt"
