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

## Batch 4 — image-palette-extractor  (contained feature; CL-3 lib colocation)  — LANDED

`useInertiaGesture` (sole consumer `ImageEyedropper.vue`) nests one level down into the exemplar
`ImageEyedropper/composables/`; the `quantize-worker.ts` Web Worker (CL-3; sole consumer
`useImageQuantize.ts`, a `?worker` import) colocates OUT of the module `lib/` tree into the feature.

| old path | new path |
|---|---|
| `image-palette-extractor/composables/useInertiaGesture.ts` | `image-palette-extractor/ImageEyedropper/composables/useInertiaGesture.ts` |
| `lib/quantize-worker.ts` | `image-palette-extractor/quantize-worker.ts` |
| `image-palette-extractor/composables/{useExtractSession,useImageQuantize}.ts` | KEEP (extractor-shared) |
| `image-palette-extractor/ImageEyedropper/` | KEEP (the E-1 exemplar) |

**Edges rewritten** (2): `ImageEyedropper.vue:94` → `./composables/useInertiaGesture`;
`composables/useImageQuantize.ts:10-11` `@lib/quantize-worker` → `../quantize-worker` (+ `?worker`).
**Gates**: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18.

---

## Cohesion cargo (distinct commits — §Commit plan)

| cargo | disposition | files | gates |
|---|---|---|---|
| **dup-`useDark` fold** onto `useGlobalDark` | LANDED | `composables/color/useViewAccents.ts` + `useContrastSafeColor.ts` — the last two `@vueuse/core` `useDark` holdouts fold onto the glass-ui `useGlobalDark` singleton (markdown did this at S.W4-8; zero vueuse `useDark` left in demo/) | tc 0 · lint 0 · vitest 2158/2158 |
| **MOB-2** route-derived pane index | LANDED | `viewSchema.ts` (+`defaultPaneIndex`), `useViewManager.ts` (ref→view-tagged writable computed; X8 seed + per-switchView re-derivation die), `usePaletteManagerWiring.ts` (edit-flow override deferred to the settled tick) | tc 0 · lint 0 · vitest 2158/2158 · **playwright `mobile/walk` (pane-toggle + view-select re-route) PASS** |
| **MOB-1** stamped `data-layout` witness | NOT STARTED (see recovery brief) | App.vue (stamp `data-layout`), Dock.vue + ColorPicker.vue + `styles/style.css:435` exception DIES | — |
| **PI-DRIFT-1 + the 10-site `out-in` audit** | NOT STARTED (see recovery brief) | the 10 `<Transition mode="out-in">` sites + the pi-w5b hard-fail rider | — |

## O-23 bundle verdict (landed batches 2-4 + cargo)

Measured `dist/gh-pages` gzip per named chunk, current HEAD vs the post-batch-4 reference
(`scratchpad/o23-pre-batch5.json`): **worst per-chunk delta −1.44%** (`dateFormat.js` 278→274, a
4-byte move on a tiny chunk) · `AdminPane.js` +1.19% · aggregate **−0.084%** — all inside the O-23
±2% band. The move batches are pure path-rewrites (chunk-graph-neutral, PI-6); the two cargo folds
are logic-only. **O-23 SATISFIED** for the landed work; the barrel/decomposition batches (5-6) that
carry the real PI-6 side-effect-bloat risk are NOT YET LANDED (recovery brief).

## Lane status (partial — checkpoint at batch 4 + 2 cargo)

**LANDED**: PR-7 census · MOVE-MAP · batch 1 (verify: DROP/dissolve discharged by W0-3) · batch 2
(gradient) · batch 3 (mix) · batch 4 (extractor) · cargo dup-`useDark` · cargo MOB-2. **Lane-close
gates on the landed state: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18 · O-23
±2% (worst −1.44%, aggregate −0.084%) · playwright smoke+admin+mobile 51 passed / 3 skipped.**
**DEFERRED** (recovery brief `audit/recovery/T.W1-demo-brief-2026-07-10.md`): batch 5 (hardened
barrels) · batch 6 (palette-browser decomposition) · batch 7 (color-domain atomic codemod — the
all-or-nothing ~24 keys hunk) · batch 8 (app-shell `app/composables/boot/`) · batch 9 (per-feature
recursion) · cargo MOB-1 · cargo PI-DRIFT-1. The three trees are writer-disjoint; this demo lane's
landed state is internally consistent (all gates green) and each deferred batch is an independent
PP-14 resumption unit re-derivable against the live tree.
