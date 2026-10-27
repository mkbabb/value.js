#!/usr/bin/env bash
# SS-8.r GREEN pass: every falsifier this seat touched, on the isolated worktree (committed bytes + this seat's cures).
# Usage: green.sh <run-tag>   (launched via ~/.claude/guard/guarded)
R=/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/probes/SS8r/run.sh
WT=/Users/mkbabb/Programming/value.js/.worktrees/ss8r
$R $WT "$1-smoke" --project=smoke e2e/smoke/ss8-z2-picker-cohort.spec.ts e2e/smoke/oracles/o12-blob-seat.spec.ts \
  e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts e2e/smoke/ss8-b26-cures.spec.ts e2e/smoke/oracles/o14-preview-truth.spec.ts \
  e2e/smoke/flows/palette-flag.spec.ts e2e/smoke/ss8-b19-color-chips.spec.ts e2e/smoke/zz/x5-probe.spec.ts
$R $WT "$1-mobile" --project=smoke-mobile e2e/smoke/mobile/blob-presence-mobile.spec.ts
