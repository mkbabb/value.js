# T.W1 · MOVE-MAP — the demo tree (W1-demo lane)

**Wave**: T.W1 (the colocation grand restructure). **Lane**: W1-demo (`demo/@/**` excl. vendored
`components/ui/` + `styles/` UNCHANGED; `demo/color-picker/` shell wiring; e2e spec imports).
**Substrate / wave head**: `tranche-t` @ `879ea36` (the demo-dogfood keystone).

This is the demo third of the wave's ONE three-tree MOVE-MAP (§The MOVE-MAP, T.W1.md); the api +
src thirds are their lanes' own tables. Every downstream wave re-derives its `file:line` anchors
against this table at wave-open (PP-11). Maintained **incrementally — committed WITH each named
batch** (§Commit plan). Notation: `→` old path → new path; **DROP** = deleted; **KEEP** = verified
already-correct, no move.

**Spec re-derivation note**: the two colocation censuses (`t-coloc-components.md`,
`t-coloc-composables-lib.md`) were written at `cc4f4fa`; W0-3 excisions + the keystone drifted the
tree. This MOVE-MAP is re-derived against the ACTUAL `879ea36` tree (live import-graph greps), so
where a census row named a file W0-3 already removed (e.g. `BulkActionToolbar`, `SortFilterMenu`,
`dark-mode-toggle/`) or a shape that no longer exists (`PaletteDialog/` is now a lone composable,
not a `components/`-owning folder), this table records the real disposition.

---

## Batch 1 — DROP / dissolve  (§Lane-order beat A) — DISCHARGED-BY-W0-3

The census DROP/dissolve set is already gone from the `879ea36` tree (W0-3 lane
`t-legacy-sweep`, commit `9599319` "the dead named set + CC-6 orphan removed, code grep-zero").
No code change remains for this batch; recorded for MOVE-MAP completeness.

| census row | disposition on the live tree |
|---|---|
| `palette-browser/BulkActionToolbar.vue` (F8, zero importers) | DROP — already removed (W0-3); grep-zero confirmed |
| `palette-browser/SortFilterMenu.vue` (F8, zero importers) | DROP — already removed (W0-3); grep-zero confirmed |
| `components/custom/dark-mode-toggle/` (F9, 2-line re-export alias) | DISSOLVE — already removed (W0-3); consumers import `DarkModeToggle`/`useGlobalDark` from glass-ui directly |

## Batch 2 — gradient  (contained feature; 1 external edge)  — LANDED

`GradientVisualizer` (1 external importer: `panes/GradientPane.vue`) promoted to a folder owning
its 4 single-parent children; `PerceivedSpacePlate` further promoted to a sub-folder owning its
single-consumer paint satellite. Feature-shared composables KEEP.

| old path | new path |
|---|---|
| `gradient/GradientVisualizer.vue` | `gradient/GradientVisualizer/GradientVisualizer.vue` |
| `gradient/GradientCodeEditor.vue` | `gradient/GradientVisualizer/GradientCodeEditor.vue` |
| `gradient/GradientEasingEditor.vue` | `gradient/GradientVisualizer/GradientEasingEditor.vue` |
| `gradient/GradientStopEditor.vue` | `gradient/GradientVisualizer/GradientStopEditor.vue` |
| `gradient/PerceivedSpacePlate.vue` | `gradient/GradientVisualizer/PerceivedSpacePlate/PerceivedSpacePlate.vue` |
| `gradient/perceivedSpacePaint.ts` | `gradient/GradientVisualizer/PerceivedSpacePlate/perceivedSpacePaint.ts` |
| `gradient/composables/{gradientParse,useGradientCSS,useGradientInterpolation,useGradientModel,usePerceivedRamp}.ts` | KEEP (feature-shared; all importers within `gradient/`) |

**External edge rewritten** (1): `panes/GradientPane.vue:5` →
`@components/custom/gradient/GradientVisualizer/GradientVisualizer.vue`.
**Gates**: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18 (no drops).
**Batch-2 residual** (folded into batch 3): `lib/gamut-ink.ts:9` comment path updated to the
new `perceivedSpacePaint.ts` home (prose, not a shim).

## Batch 3 — mix  (contained feature; 1 external edge)  — LANDED

`MixAnimationCanvas` (external importer: `panes/MixPane.vue`) promoted to a folder owning its
private animation pipeline (`useMixingAnimation` → `mixStage`, a single-parent consumer chain);
`useMixingState` (5 consumers incl. `panes/MixPane`) KEEPs feature-shared.

| old path | new path |
|---|---|
| `mix/MixAnimationCanvas.vue` | `mix/MixAnimationCanvas/MixAnimationCanvas.vue` |
| `mix/composables/useMixingAnimation.ts` | `mix/MixAnimationCanvas/composables/useMixingAnimation.ts` |
| `mix/composables/mixStage.ts` | `mix/MixAnimationCanvas/composables/mixStage.ts` |
| `mix/composables/useMixingState.ts` | KEEP (feature-shared) |
| `mix/{MixConfigBar,MixResultDisplay,MixSourceSelector}.vue` | KEEP root |

**External edge rewritten** (1): `panes/MixPane.vue:8` →
`@components/custom/mix/MixAnimationCanvas/MixAnimationCanvas.vue`.
**Gates**: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18.
