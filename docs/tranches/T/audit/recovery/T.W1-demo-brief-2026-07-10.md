# T.W1-demo — RECOVERY / RESUME BRIEF (2026-07-10)

> **RESOLVED (2026-07-10, second run)** — the resume executed batches **5·6·7·8·9** + cargo
> **PI-DRIFT-1** (audit) + the e2e admin-fixture glob fix, all all-gates-green (final: vitest
> 2158/2158 · lint 0 · tc 0 · build clean · playwright smoke+admin+mobile 51 passed/3 skipped/0
> failed · O-23 aggregate −0.128%, eager flat · PP-8 clean · zero `export *`/shim). The **sole
> remaining item is cargo MOB-1**, DEFERRED to Fable/frontend-design per §3's own clause (a
> discovered D8-1 producer-ownership conflict — see `w1-move-map-demo.md §MOB-1 note`). The live
> tree is internally consistent; MOB-1 is not half-applied. This brief below is the point-in-time
> batch-4-checkpoint record; the authoritative final status is `w1-move-map-demo.md §Lane status`.

Per the standing §Recovery rider (`T.W1.md §Recovery`, `T.md §8`, PP-14/PP-15). This lane landed
a clean, all-gates-green CHECKPOINT (batches 1-4 + 2 cargo) and stopped at a session wall before
the high-blast batches. The tree is internally consistent — **no partial/atomic hunk is
half-applied** (the canonical W1 hazard is ABSENT here; verified below). A resume continues from
the work-order in §3 against the LIVE tree.

## §1 Audit-partial — what is landed vs deferred

**Branch/head at handoff**: `worktree-wf_23a1e55a-aaa-2`, tip commit = the MOVE-MAP status commit
(see `git log`). Base = `879ea36` (the tranche-t demo-dogfood keystone).

**LANDED (all gates green each)** — commit order:
1. `docs(PR-7)` — the keyframe/animation census (gate 9b): 18 identities, the survival contract.
2. `refactor(batch 2 · gradient)` — `GradientVisualizer/` folder + nested `PerceivedSpacePlate/`.
3. `refactor(batch 3 · mix)` — `MixAnimationCanvas/` folder + its animation pipeline.
4. `refactor(batch 4 · extractor)` — `useInertiaGesture` nested + `quantize-worker` colocated (CL-3).
5. `refactor(cargo · dup-useDark)` — the 2 vueuse `useDark` holdouts fold onto `useGlobalDark`.
6. `fix(cargo · MOB-2)` — route-derived mobile pane index (the hash-nav leak dead).
   (The MOVE-MAP `w1-move-map-demo.md` was committed WITH each batch; batch 1 = verify-only.)

**Close gates run on the landed state** — ALL GREEN:
- typecheck 0 · lint 0 · vitest **2158/2158** (68 files).
- keyframe census re-grep **18/18** (no drops).
- O-23 gzip per named chunk vs the post-batch-4 reference: worst **−1.44%** (a 4-byte tiny-chunk
  move), aggregate **−0.084%** — inside ±2%. (Move batches are pure path-rewrites; PI-6-neutral.)
- playwright **smoke + smoke-admin + smoke-mobile: 51 passed, 3 skipped**. Notably
  `mobile/walk.spec.ts` ("segmented control toggles panes + view-select re-routes") — the MOB-2
  witness — PASSES.

**DEFERRED** (this brief's subject): batch 5 (hardened barrels) · batch 6 (palette-browser
decomposition) · batch 7 (color-domain atomic codemod) · batch 8 (app-shell `app/composables/boot/`) ·
batch 9 (per-feature recursion) · cargo MOB-1 · cargo PI-DRIFT-1.

## §2 Partial-detector sweeps (the seam-audit) — CLEAN

- **No stray `export *`**: `rg -n "export \*" demo/@/components/custom` → the only barrels touched
  (gradient/mix/extractor) use NAMED default re-exports; the flat `palette-browser/index.ts` still
  exports only `PaletteCard` (untouched — batch 5 not started).
- **No re-export shim at any old path**: the moved files (batches 2-4) leave no forwarding stub;
  every importer was rewritten at the root. `git status` clean.
- **No half-applied atomic codemod**: batch 7 (the ~24-site color-domain keys hunk) was NOT
  started — `color-picker/keys.ts` is untouched, all 17 external import lines still name
  `@components/custom/color-picker/keys`.
- **Worktree**: single lane worktree; the api ∥ src siblings are writer-disjoint (a dead lane
  cannot have corrupted this tree).

## §3 Resume work-order (each batch is an independent PP-14 unit; re-derive anchors vs the LIVE tree)

**On resume the MOVE-MAP commits FIRST if any move landed uncommitted** (none pending here). The
spec drift the censuses carry is already reconciled in `w1-move-map-demo.md` (the PaletteDialog/
shape + the W0-3 DROP set) — trust the LIVE tree, re-grep, don't follow the cc4f4fa census blindly.

### Batch 5 — palette-browser HARDENED BARRELS (insulate the external deep edges FIRST)
The live external-edge map (files OUTSIDE `palette-browser/` importing its components), re-derived
`rg -n "palette-browser/" demo/ -g '!*.md' | rg -v "^demo/@/components/custom/palette-browser/"`:
- `PaletteCard` ← generate/GenerateControls, mix/MixSourceSelector, extractor/ExtractWorkbench, panes/PalettesPane, panes/BrowsePane (5)
- `PaletteColorStrip` ← MixSourceSelector · `EmptyState` ← MixSourceSelector, BrowsePane (2) · `PaletteCardSkeleton` ← ExtractWorkbench, BrowsePane (2) · `PaletteCardGrid` ← PalettesPane, BrowsePane (2)
- `CurrentPaletteEditor` ← PalettesPane · `PaletteSlugBar` (type) ← composables/palette/useSlugMigration
- `MigratePalettesDialog` + `DevMisconfigBanner` ← App.vue (**EAGER `index.js` chunk — the PI-6 hot spot**)
- `AdminUsersPanel/AdminNamesPanel/AdminAuditPanel/AdminFlaggedPanel/AdminTagsPanel` + `UserSortMenu` ← panes/AdminPane
- `SearchFilterBar/VersionHistoryDrawer/FlagReportDialog/TagEditPopover` ← panes/BrowsePane · `useDialogBrowseActions` ← BrowsePane
**PI-6 HARD CONSTRAINT (the reason this batch is deferred, not rushed)**: a barrel is NAMED
re-exports only, NEVER `export *`. Vue SFC `<style scoped>` is a side-effecting import
tree-shaking cannot remove — a barrel that re-exports MORE than a consumer needs can pull the whole
cluster's styles into that consumer's chunk. **The eager `index.js` (App.vue's chunk) is the
danger**: route App's 2 imports through a NARROW barrel (dialog/status only), never one fat
palette-browser barrel. **REQUIRED before commit**: build `npm run gh-pages` and diff per-chunk
gzip vs `scratchpad/o23-pre-batch5.json`; if `index.js` (or any chunk) moves >±2%, HALT (§Triumvirate
"never ship the blast") and go per-cluster. Recommend: create the per-cluster barrels the batch-6
target names (`card/`, `admin/`, `search/`, `dialog/`, `slug/`, `status/`) as the insulation, so
batch 6's moves are one-barrel edits.

### Batch 6 — palette-browser decomposition (behind the batch-5 barrels)
Target sub-folders (census §3.2, reconciled to the live tree — note `PaletteDialog/` is now ONLY
`PaletteDialog/composables/useDialogBrowseActions.ts`, NOT a `components/`-owning folder):
`card/` (PaletteCard[folder: +PaletteCardMenu/Swatches/PaletteRenameInput/ActionFeedback/SwatchHoverMenu
+ the 4 card composables useHeightTransition/useHoverPopover/useLeaveTimer/useSwatchActions] · siblings
PaletteCardGrid/PaletteCardSkeleton/PaletteColorStrip · CurrentPaletteEditor per H-EC-1) · `admin/`
(the 5 Admin*Panel + AdminListItem + AdminListSkeleton + PaginationBar; LIFT-DOWN useAdminUsers from
`@composables/auth/`, useAdminAudit/Flagged/Tags from `@composables/palette/` per F5) · `search/`
(SearchFilterBar[+child MiniColorPicker] · UserSortMenu · TagEditPopover) · `dialog/`
(FlagReportDialog · MigratePalettesDialog · VersionHistoryDrawer[+useVersionHistory] · the existing
PaletteDialog/ composable) · `slug/` (PaletteSlugBar; LIFT-DOWN useSlugMigration from `@composables/palette/`) ·
`status/` (ApiOfflineChip · DevMisconfigBanner — **both carry a scoped @keyframes: offline-dot-pulse,
dev-misconfig-pulse; PR-7 census #17/#18 — verify they survive the move**). `EmptyState` → a shared
demo atom (Q16 book: lift to `common/` or a shared `@components/` atom; NOT a palette-browser resident).
Update the batch-5 barrels' INTERNAL re-export paths only; external consumers unchanged. Volume:
~60 internal edges — mechanical. Keyframe re-grep + O-23 after.

### Batch 7 — the color-domain ATOMIC codemod (LAST of the moves; ALL-OR-NOTHING)
**DISCARD any half-application and re-drive from these rows** (§Recovery). Unify the color domain
under `@composables/color/` (F2/F3/F6). LIVE anchors:
- **F3 keys** (`color-picker/keys.ts` → `@composables/color/keys.ts`): **17 import lines** across 15
  external files (Dock ×2, ActionBarLayer ×2, App ×3, PalettesPane, GeneratePane, MixPane,
  useAtmosphereBoot, CurrentPaletteEditor, AdminPane, ExtractWorkbench, BrowsePane, GradientPane,
  AdminUsersPanel, useSwatchActions, ColorNutritionLabel) + the color-picker/index.ts back-ref.
  All name `@components/custom/color-picker/keys` — one atomic specifier rewrite.
- **F2 helpers** (each single-importer, mostly the pipeline) → `@composables/color/`:
  `useColorParsing` (1), `useColorNameResolution` (1), `useSliderGradients` (1), `useCustomColorNames` (1),
  `useColorUrl` (1), `normalizedColorNames` (0 external — internal to the color-name cluster).
- **F6 aurora atoms** (`panes/keys.ts` → `@composables/color/aurora-atoms.ts`): 1 importer
  (`useAtmosphere` — AURORA_ATOMS_KEY/DEFAULT_AURORA_ATOMS). Domain-qualify the filename (NOT a
  second `panes/keys.ts`).
This is one commit (own body). Coordinated AFTER the keystone (already landed) — the keystone
crossing is done, so W1-demo owns this hunk cleanly.

### Batch 8 — app-shell home `app/composables/boot/` (W2's single-writer surface, made legible)
Give `demo/color-picker/App.vue` a colocated composables home (`app/composables/` or
`demo/color-picker/composables/`). Move the 5 SHELL units (CL-2/CL-5): `useDevicePixelSnap`,
`usePaletteManagerWiring`, and the boot chain `boot/` = `useAtmosphereBoot` + `useAtmosphere` +
`useViewAccents` + `lib/view-accents.ts` (CL-4: unify view-accents' pure+reactive halves). **NOTE:
`useViewAccents.ts` + `useContrastSafeColor.ts` were edited by the useDark cargo — re-grep their
imports before moving.** Composable moves = low bundle risk (no SFC styles), typecheck-gateable.
Sequence AFTER batch 7 (both restructure `@composables/color/`; the boot files vs the picker helpers
are disjoint sets, but the wave orders 7 before 8).

### Batch 9 — per-feature recursion (color-picker + panes residue)
`controls/SpectrumCanvas.vue` → `SpectrumCanvas/` [folder] owning its 4 composables
(useGamutDetent/useGamutOverlay/useSpectrumCrossfade/useSpectrumPlateStyle) + gamutOverlayPaint.ts +
its 2 caption children (SpectrumDetentLabel/SpectrumPlateCaption); `spectrumLuma.ts` stays
`controls/`-level (2-sibling KEEP). `ComponentSliders.vue` → `ComponentSliders/` + useSliderTouchGates.
`ColorComponentDisplay.vue` → `ColorComponentDisplay/` + readoutReservation.ts. **`SpectrumCanvas.vue`
carries scoped @keyframes field-paint-in + plate-crossfade-out (PR-7 #10/#11) — verify survival.**
Generalize `ImageEyedropper/`, `PaletteDialog/` exemplars. Keyframe re-grep after.

### Cargo MOB-1 — the ONE stamped `data-layout` witness (owner P0)
App (sole owner of `isDesktop`, App.vue:232-233) stamps the root element `data-layout="desktop|mobile"`;
every layout fork keys on the stamp: the dock mobile toggle (`Dock.vue:213` `lg:hidden`), the dock
desktop sections, the mobile slot, the blob arm (`ColorPicker.vue:368` `@media min-width:1024px`).
**`styles/style.css:435` exception rule DIES** (it exists only to out-cascade the wrong width-only
witness — E-3). ACCEPTANCE (playwright at 1024×1366 portrait): both panes of every dual view
reachable; dock renders full mobile chrome; at 1024×640 landscape the dual grid + desktop dock
unchanged. **Requires a NEW/updated playwright probe at 1024×1366** (the current smoke-mobile is
390 Pixel-7). Design-sensitive — route through Fable/frontend-design per E-6 if taste-judged.

### Cargo PI-DRIFT-1 — the 10-site `<Transition mode="out-in">` audit (pi-w5b hard-fail rider)
Enumerate the 10 `out-in` transition sites (`rg -n 'mode="out-in"' demo/`), audit each for the
PI-DRIFT-1 layout/paint drift; the pi-w5b rider is a HARD fail if a site regresses. Read
`t-perf-implications.md` + the pi1-delta-ledger before landing.

## §4 Toolchain note (for the resume)
node_modules is a symlink to the main worktree's install (`ln -s
/Users/mkbabb/Programming/value.js/node_modules node_modules`) — its inner `@mkbabb/glass-ui` etc.
symlinks resolve correctly from the real (main) location. `dist/` is built (`npm run build`) — demo
typecheck resolves `@mkbabb/value.js/*` via `tsconfig.demo.json` paths → `./dist/subpaths/*.d.ts`;
rebuild dist only if `src/` changes (this lane never touches `src/`). O-23 reference:
`scratchpad/o23-pre-batch5.json` (post-batch-4 chunk sizes). Playwright auto-starts vite on :8090
(NOT the owner's :9000).
