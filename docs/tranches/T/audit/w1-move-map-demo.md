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

## Batch 5 — palette-browser HARDENED BARRELS (insulate the 9 external deep edges FIRST) — LANDED

The 6 per-cluster barrels are minted as the feature's REAL public surface (F7). **NAMED
re-exports only, never `export *`** (PI-6). Batch 5 re-exports from the still-flat file
locations (`../X.vue`); batch 6 repoints the barrels' internal paths to the moved sub-folders,
so every external consumer is insulated from the batch-6 moves. Files are NOT moved in this
batch.

| new barrel | named exports (batch-5 source = `../X.vue`) |
|---|---|
| `palette-browser/card/index.ts` | PaletteCard · PaletteCardGrid · PaletteCardSkeleton · PaletteColorStrip · CurrentPaletteEditor |
| `palette-browser/admin/index.ts` | AdminUsersPanel · AdminNamesPanel · AdminAuditPanel · AdminFlaggedPanel · AdminTagsPanel |
| `palette-browser/search/index.ts` | SearchFilterBar · UserSortMenu · TagEditPopover |
| `palette-browser/dialog/index.ts` | FlagReportDialog · VersionHistoryDrawer · MigratePalettesDialog · useDialogBrowseActions |
| `palette-browser/slug/index.ts` | PaletteSlugBar |
| `palette-browser/status/index.ts` | ApiOfflineChip · DevMisconfigBanner |
| `palette-browser/index.ts` | **DROP** — vestigial top barrel (only `PaletteCard`, zero importers); dead surface (E-3) |

**External edges rerouted through the barrels** (8 lazy importers): `generate/GenerateControls.vue`
(→ card) · `mix/MixSourceSelector.vue` (→ card; EmptyState still direct, lifts in batch 6) ·
`image-palette-extractor/ExtractWorkbench.vue` (→ card) · `panes/PalettesPane.vue` (→ card) ·
`panes/BrowsePane.vue` (→ card + search + dialog) · `panes/AdminPane.vue` (→ admin + search) ·
`composables/auth/useAdminUsers.ts` (type → admin) · `composables/palette/useSlugMigration.ts`
(type → slug).

**PI-6 exception — App.vue's two imports stay DIRECT** (NOT barrel-routed): `App.vue` is the
EAGER `index.js` chunk. A first attempt routing its `MigratePalettesDialog`/`DevMisconfigBanner`
through the dialog/status barrels grew `index.js` **+1.04%** — the barrels' named re-exports of
side-effecting SFC `<style>` do NOT tree-shake the lazy siblings (FlagReportDialog,
VersionHistoryDrawer, ApiOfflineChip) out of the eager chunk (the PI-6 hazard, materialized +
measured). Reverting App to direct `.vue` imports restored `index.js` to baseline. Batch 6
repoints App's two direct imports to the moved `dialog/` + `status/` files.

**F5 CORRECTION (trust-the-live-tree, RE-DERIVED)**: the census F5 "LIFT-DOWN
`useAdminUsers`/`useAdminAudit`/`useAdminFlagged`/`useAdminTags`/`useSlugMigration` INTO
palette-browser" is **REFUTED against the live tree** — every one of these is consumed by
`@composables/palette/usePaletteManager.ts` (the global 25-consumer facade), i.e. they are
pm-encapsulated sub-composables (the composables-lib census §2 classification: MODULE, palette,
encapsulated). Moving them into `palette-browser/admin|slug/` would make the GLOBAL facade import
DOWN into the feature — the exact E-1 inversion F2 forbids. **They STAY** in `@composables/`; only
their `import type` template-ref specifiers repoint to the moved `.vue` (through the admin/slug
barrels). This resolves the two-census contradiction in favour of the anti-inversion invariant.

**O-23 verdict (batch 5, vs `o23-pre-batch5.json`)**: **aggregate +0.035%** · total CSS −115 B ·
**eager `index.js` flat** (restored) · **no lazy→eager promotion**. The barrels became new
auto-chunk boundaries, so Rollup re-derived several auto-chunk NAMES (`PaletteCard.js`→`card.js`
+ regrouped shared chunk; the pre-existing glass-ui `search`/`input` chunks collide on basename
in the strip-hash roll-up) — a benign rename/regroup, NOT a blast: aggregate + eager + CSS-total
are flat. The literal "±2% per named chunk" is evaluated at the stable level (aggregate · eager ·
CSS-total · promotion) since the mandated barrels legitimately reshuffle auto-chunk names.
**Gates**: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18.

## Batch 6 — palette-browser DECOMPOSITION (the flat 31-`.vue` namespace → 6 sub-feature folders) — LANDED

The flat namespace decomposes into `card/`·`admin/`·`search/`·`dialog/`·`slug/`·`status/` behind
the batch-5 barrels. External consumers are UNCHANGED (routed through the barrels last batch);
only the barrels' INTERNAL re-export paths + the moved files' intra-tree relative imports update.
`EmptyState` lifts OUT to a shared atom; `dateFormat.ts` colocates IN (CL-3).

| old path (flat `palette-browser/`) | new path |
|---|---|
| `PaletteCard.vue` (+ children `PaletteCardMenu`, `PaletteCardSwatches`, `PaletteRenameInput`, `ActionFeedback`) | `card/PaletteCard/*` (folder owns its render-private children) |
| `PaletteColorStrip.vue`·`PaletteCardGrid.vue`·`PaletteCardSkeleton.vue`·`CurrentPaletteEditor.vue`·`SwatchHoverMenu.vue` | `card/*` (cluster-shared siblings; SwatchHoverMenu has 2 consumers ⇒ card/ level) |
| `composables/{useHeightTransition,useHoverPopover,useLeaveTimer,useSwatchActions}.ts` | `card/composables/*` (card-cluster-shared) |
| `Admin{Users,Names,Audit,Flagged,Tags}Panel.vue`·`AdminListItem`·`AdminListSkeleton`·`PaginationBar` | `admin/*` |
| `SearchFilterBar.vue` (+ child `MiniColorPicker`)·`UserSortMenu`·`TagEditPopover` | `search/*` |
| `FlagReportDialog`·`MigratePalettesDialog`·`VersionHistoryDrawer` | `dialog/*` |
| `PaletteDialog/composables/useDialogBrowseActions.ts` (the lone survivor of the dialog god-module) | `dialog/composables/useDialogBrowseActions.ts` (empty `PaletteDialog/` removed) |
| `PaletteSlugBar.vue` | `slug/PaletteSlugBar.vue` |
| `ApiOfflineChip.vue`·`DevMisconfigBanner.vue` (each carries a scoped `@keyframes` — census #17/#18) | `status/*` (keyframes travel with the SFC via `git mv`) |
| `@lib/dateFormat.ts` (CL-3; consumers = admin + dialog) | `palette-browser/dateFormat.ts` (feature-root shared) |
| `palette-browser/EmptyState.vue` (F7 lift-out; 8 consumers across 3 features, generic) | **`@components/common/EmptyState.vue`** (a NEW shared demo atom; Q16 book — glass-ui-first candidate still open, parked as a shared atom) |

**Internal edge rewrites** (barrels → `./`-relative; moved files → cross-cluster relatives):
6 barrels repoint to `./…`; `card/PaletteCard/PaletteCard.vue` → `../composables/*` + `../PaletteColorStrip.vue`;
`card/PaletteCard/PaletteCardSwatches.vue` → `../SwatchHoverMenu.vue`; `card/CurrentPaletteEditor.vue`
`./ApiOfflineChip.vue` → `../status/ApiOfflineChip.vue`; `admin/AdminUsersPanel.vue` `./PaletteCard.vue`
(default) → `{ PaletteCard } from "../card"` (barrel, cross-cluster); the 3 `dateFormat` consumers
`@lib/dateFormat` → `../dateFormat`; the 6 `EmptyState` consumers (2 external + 4 internal) →
`@components/common/EmptyState.vue`; App.vue's 2 direct imports → `dialog/` + `status/` paths.

**BUILD-only trap fixed** (vue-tsc does NOT see it): `slug/PaletteSlugBar.vue` +
`search/SearchFilterBar.vue` carry a Tailwind `@reference "../../../styles/style.css"` in their
`<style>` block — the one-level-deeper move broke the relative path → `../../../../styles/…`. Only
`npm run build` catches this class (a moved SFC's scoped-`<style>` relative CSS `@reference`).

**PP-8**: App.vue was 399 (cap edge); the batch-5 PI-6 comment tipped it to 402 → trimmed to a
1-line note (**400**, ≤ cap). No other demo file > 400.

**O-23 verdict (batch 6, vs `o23-pre-batch5.json` = the whole barrels+decomposition restructure)**:
**aggregate −0.129%** · total CSS −208 B · **eager `index.js` flat** · **no lazy→eager promotion**.
The auto-chunk regroup settled (`PaletteCard.js`+`EmptyState.js`+`dateFormat.js`+card CSS → the one
shared `card.js`/`card.css`; the glass-ui `search`/`input` basename collisions persist in the
strip-hash roll-up). Same stable-level interpretation as batch 5. **Gates**: typecheck 0 · lint 0 ·
vitest 2158/2158 · keyframe census 18/18 · build clean.

## Batch 7 — the color-domain ATOMIC codemod (F2/F3/F6; the LAST of the moves, all-or-nothing) — LANDED

The color domain unifies under `@composables/color/`: the picker-nested color helpers RISE beside
`useColorPipeline` (F2), the app-wide color contract keys RISE (F3), and the mis-domained aurora
atoms RISE (F6). ONE commit — the highest-blast edge in the tree, sequenced after every other move
so the tree was stable when it landed.

| old path | new path |
|---|---|
| `color-picker/composables/{useColorParsing,useColorNameResolution,useSliderGradients,useCustomColorNames,useColorUrl,normalizedColorNames}.ts` (F2) | `@composables/color/*` (the intra-cluster `./` refs survive — all 6 move together) |
| `color-picker/keys.ts` (F3 — `COLOR_MODEL_KEY`·`CSS_COLOR_KEY`·`SAFE_ACCENT_KEY`·`EDIT_TARGET_KEY`·`ActionBarContext`) | `@composables/color/keys.ts` |
| `panes/keys.ts` (F6 — `AURORA_ATOMS_KEY`·`DEFAULT_AURORA_ATOMS`; domain-qualified, NOT a 2nd `panes/keys`) | `@composables/color/aurora-atoms.ts` |

**F3 blast radius = the census's ~24 (NOT the recovery-brief's 17)**: the brief listed the **17
out-of-feature** `@components/custom/color-picker/keys` importers; the census's **8 in-feature**
importers use RELATIVE `./keys`/`../keys` (`ColorPicker` ×2, `ColorInput`, `SpectrumCanvas`,
`ComponentSliders`, `ParseEchoReadout`, `display/ColorSpaceSelector`, `visual/HeroBlob`) — **the
alias-grep missed them; vue-tsc caught them** (the atomic-codemod gate working as designed). All
repoint to `@composables/color/keys`. Plus the barrel back-ref (`color-picker/index.ts`
`export type { ActionBarContext } from "./keys"` → `@composables/color/keys`) and keys.ts's own
`EditTarget from "."` → `@components/custom/color-picker` (the type-only picker↔color pair stays
acyclic — both `import type`). `useColorPipeline`'s 3 F2 imports → `./…`; App.vue's 2
(`useCustomColorNames`, `useColorUrl`) → `@composables/color/…`; `useAtmosphere` + `AuroraPane` →
`@composables/color/aurora-atoms`. F2 helpers keep their `@components/custom/color-picker` barrel
imports (color utils — the picker's PUBLIC surface, not its private folder; the F2 inversion is cured).

**Consumer migration (PP-3)**: `test/aurora-motion.test.ts` imported the old `panes/keys` — repointed
to `@composables/color/aurora-atoms` (a demo file this unit test consumes; the move's consumer).

**O-23 (batch 7, vs `o23-pre-batch5.json`)**: aggregate **−0.131%** · eager `index.js` flat. Pure
composable import-path rewrites (no SFC styles move) — chunk-graph-neutral. **Gates**: typecheck 0 ·
lint 0 · vitest 2158/2158 · keyframe census 18/18 · build clean · zero `export *`, zero shim.

## Batch 8 — app-shell home `demo/color-picker/composables/` + `boot/` (W2's single-writer surface, made legible) — LANDED

`App.vue` (the shell) gets a colocated composables home beside it (CL-2's sanctioned "add
`demo/color-picker/composables/`" option — App.vue stays the Vite entry, so `@/app/` promotion is
NOT taken). The 5 SHELL units (+ the view-accents pure half) leave the SHARED module tree.

| old path | new path |
|---|---|
| `@composables/useDevicePixelSnap.ts` (CL-2, 1←App) | `demo/color-picker/composables/useDevicePixelSnap.ts` |
| `@composables/palette/usePaletteManagerWiring.ts` (CL-2, 1←App) | `demo/color-picker/composables/usePaletteManagerWiring.ts` |
| `@composables/color/useAtmosphereBoot.ts` (CL-5, 1←App) | `demo/color-picker/composables/boot/useAtmosphereBoot.ts` |
| `@composables/color/useAtmosphere.ts` (CL-5, 1←Boot) | `demo/color-picker/composables/boot/useAtmosphere.ts` |
| `@composables/color/useViewAccents.ts` (CL-5, 1←Boot) | `demo/color-picker/composables/boot/useViewAccents.ts` |
| `@lib/view-accents.ts` (CL-4/CL-5, the pure half, 1←useViewAccents) | `demo/color-picker/composables/boot/view-accents.ts` |

**CL-4 disposition (the view-accents twin)**: the two-HOMES split (`@composables/color/` reactive +
`@lib/` pure) **DISSOLVES** — both halves now sit side-by-side in `boot/`. The pure `view-accents.ts`
(221 LoC) is KEPT as its own file, NOT physically merged into the reactive `useViewAccents.ts` (119),
because it is a deliberately Vue-free unit-probed resolver (`test/view-accents.test.ts`); merging it
into a composable that imports Vue + glass-ui's `useGlobalDark` would destroy that clean pure-module
test boundary. The recovery brief's own batch-8 enumeration lists both as separate `boot/` files —
co-location IS the unify (one directory unit), the pure/reactive FILE boundary preserved.

**Import rewrites**: App.vue's 3 imports → `./composables/{useDevicePixelSnap,usePaletteManagerWiring}`
+ `./composables/boot/useAtmosphereBoot`. Intra-boot `./useAtmosphere`/`./useViewAccents` survive
(all in `boot/`); the boot→color edges repoint to the alias
(`useContrastSafeColor` STAYS in `@composables/color/`, imported now via `@composables/color/…`);
`useViewAccents` `@lib/view-accents`→`./view-accents`; `view-accents` `./color-utils`→`@lib/color-utils`;
`usePaletteManagerWiring` `./usePaletteManager`→`@composables/palette/usePaletteManager`.
**PP-3 test migration**: `test/view-accents.test.ts` (2 imports: the pure resolver + the composable's
`PRIMARY_VIEW_IDS`/`PRIMARY_VIEW_SHIFTS`) → the new `boot/` paths. (test/ is outside the typecheck
tsconfig, so vitest — not vue-tsc — is the gate that catches a test's stale demo import.)

**O-23 (batch 8)**: aggregate **−0.135%** · eager `index.js` flat (composable moves, no SFC styles,
chunk-graph-neutral). **Gates**: typecheck 0 · lint 0 · vitest 2158/2158 · keyframe census 18/18 ·
build clean. **W2 hand-off**: `demo/color-picker/composables/boot/` EXISTS by name — the load-animation
wave's single-writer surface is legible.

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
