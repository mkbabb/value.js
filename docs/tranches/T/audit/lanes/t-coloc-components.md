# Lane t-coloc-components — COLOCATION CENSUS 1 (E-1, demo components)

**Tranche T · DEVELOPMENT ONLY** (zero product-code changes; this file is the sole write).
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close).
**Scope**: `demo/@/components/custom/**` (the shadcn vendor tree `demo/@/components/ui/`
is excluded per E-1). Cross-referenced against `demo/@/composables/`, `demo/@/lib/`,
`demo/@/styles/`, and the `demo/color-picker/App.vue` composition root, because the E-1
verdict for a helper depends on WHO consumes it, which routinely lives outside `custom/`.

**The edict (E-1, verbatim, MANDATE §2)**: "components colocated with their
sub-components/composables/skeletons/constants/styles; truly module/global-level composables
(and kin) live in a `composables/` dir at their level; long-running dirs broken into common
modules and encapsulated" — **recursive** (nested components colocate their own satellites).

**Method**: full file inventory (146 files / 20,501 LoC under `custom/`) + a
basename reverse-dependency map (every helper `.ts` and every `.vue` → its importer set),
disambiguated for the colliding basenames (`keys.ts` ×2, `constants.ts` ×3). The importer
set is the ground truth for the **shared vs colocatable** verdict and the **blast radius**.

---

## §0 The verdict vocabulary (how each helper is classified)

| Verdict | Test | E-1 action |
|---|---|---|
| **NEST-DOWN** | single sibling sub-component consumes it, but it sits in a feature-level bucket | move it INTO that sub-component's colocated folder (promote the sub-component to a dir) |
| **KEEP** | ≥2 sibling sub-components of the SAME feature consume it | correct already — lives in `<feature>/composables/` (or `<feature>/constants.ts`) |
| **LIFT-UP** | consumed across ≥2 features, or by a module/global composable | rises to the neutral home beside its true consumer (`@composables/`, `@lib/`, or glass-ui) |
| **INVERTED** | a module/global unit depends DOWN into a feature's private helper | the helper rises to sit beside its global consumer (a LIFT forced by the inversion) |

The two **already-recursive exemplars** in the tree prove the pattern is known in-repo and
the edict is "generalize these two everywhere":
- `image-palette-extractor/ImageEyedropper/` — a sub-component folder owning its **own**
  `composables/{useImageSampler,useLoupeCanvas}.ts` + `constants.ts`, colocated with
  `ImageEyedropper.vue`. Both satellites have importers only within the `ImageEyedropper/`
  subtree. This is the E-1 target shape realized.
- `palette-browser/PaletteDialog/` — owns `components/`, `composables/`, `constants.ts`.

Everything below is measured against those two shapes.

---

## §1 Feature census (11 feature groups)

| Feature dir | files | LoC | current sub-structure | external deep-importers | E-1 state |
|---|--:|--:|---|--:|---|
| `color-picker/` | 33 | 5,624 [AMENDED-AT-HARDENING: LoC re-measured, h-evidence-censuses H-EC-3] | `composables/ controls/ display/ visual/` + **6 loose root `.ts`** | **18** | partial; loose root `.ts` + a grab-bag `composables/` + an app-wide `keys.ts` buried inside |
| `palette-browser/` | 48 | 5,491 | **31 `.vue` FLAT at root** + `composables/` + `PaletteDialog/` [AMENDED-AT-HARDENING: 45→48 files / 33→31 root `.vue` / LoC re-measured — H-EC-1/H-EC-3] | 9 | **the flagship "long-running dir" offender** — one flat namespace, no sub-feature folders |
| `panes/` | 16 | 1,850 | flat (`.vue` + `keys.ts` + `index.ts`) | 4 | composition layer; `keys.ts` is mis-domained (holds Aurora, not pane, contracts) |
| `gradient/` | 11 | 2,332 [AMENDED-AT-HARDENING] | `composables/` + loose `perceivedSpacePaint.ts` | 1 | near-correct; 1 loose paint helper + single-consumer composables to nest |
| `image-palette-extractor/` | 12 | 1,727 | `composables/` + `ImageEyedropper/` (recursive) | 1 | good; one composable mis-homed above its only consumer |
| `mix/` | 7 | 1,200 [AMENDED-AT-HARDENING] | `composables/` + 4 flat `.vue` | 1 | near-correct; 2 single-consumer composables to nest |
| `dock/` | 10 | 1,217 | `composables/ layers/ menus/` | 1 | good [AMENDED-AT-HARDENING: 9→10 — `DockViewSelect.vue` (156 LoC) was omitted; it has 1 external importer (`ColorSpaceSelector`), so "fully self-contained" is corrected — H-EC-4] |
| `markdown/` | 4 | 553 | `composables/` | 0 | good |
| `generate/` | 2 | 474 | `composables/` (1) | 2 | trivial |
| `katex/` | 2 | 40 | flat | 0 | trivial |
| `dark-mode-toggle/` | 1 | 2 | barrel-only (re-exports glass-ui) | 0 | not a component — a 2-line re-export alias |

**Styles**: there are **zero** colocated `.css`/`.glsl`/`.scss` under `custom/`. All component
styling is SFC `<style scoped>` (colocated by construction — E-1-satisfied) or the 4 genuinely
global files in `@styles/` (`animations.css`, `style.css`, `utils.css`, `hljs.css`). The
formerly-local WebGL blob (`.glsl`) was extirpated to glass-ui (`@mkbabb/glass-ui/goo-blob`);
`HeroBlob.vue`/`BlobPane.vue` are thin demo consumers. **E-1 "styles" clause: essentially
already satisfied** — no finding beyond the note that `animations.css` is a global-keyframe
registry by prior design (memory: "Global keyframes centralized in animations.css; scoped
keyframes remain in components").

---

## §2 Findings (numbered; each: evidence → root-cause → owner → gestalt cure)

### F1 — The feature-level `composables/` grab-bag holds single-sub-component composables (the recursive-colocation is only ONE level deep) · owner: demo

**Evidence** (`color-picker/composables/` reverse-dep map):
- `useGamutDetent.ts`, `useGamutOverlay.ts`, `useSpectrumCrossfade.ts`, `useSpectrumPlateStyle.ts`
  — **each has exactly one importer: `controls/SpectrumCanvas.vue`**.
- `useSliderTouchGates.ts` — one importer: `controls/ComponentSliders.vue`.
- Loose root `readoutReservation.ts` — one importer: `display/ColorComponentDisplay.vue`.
- Loose root `gamutOverlayPaint.ts` — one importer: `composables/useGamutOverlay.ts`
  (i.e. part of the SpectrumCanvas gamut cluster).

**Root cause**: H.W3/S.W-era decomposition stopped at the feature's first tier
(`composables/ controls/ display/ visual/`). It never recursed: a sub-component
(`SpectrumCanvas`) that owns a private satellite constellation still keeps those satellites in
the feature-wide `composables/` bucket, one directory away from their sole consumer. This is
the literal E-1 gap — colocation done to depth 1, edict demands depth-N.

**Cure (gestalt)**: promote every sub-component that owns single-consumer satellites to a
**folder**, per the `ImageEyedropper/` exemplar. `SpectrumCanvas` becomes
`controls/SpectrumCanvas/` = `SpectrumCanvas.vue` + `composables/{useGamutDetent,useGamutOverlay,useSpectrumCrossfade,useSpectrumPlateStyle}.ts`
+ `gamutOverlayPaint.ts` + `spectrumLuma.ts` + its two caption children
(`SpectrumDetentLabel.vue`, `SpectrumPlateCaption.vue`). `ComponentSliders/` absorbs
`useSliderTouchGates.ts`. `ColorComponentDisplay/` absorbs `readoutReservation.ts`. What
survives in `color-picker/composables/` after this is ONLY the genuinely feature-wide set
(see F2). This is the single most repeated pathology (also present in `gradient/`, `mix/`,
`image-palette-extractor/` — see the per-feature tables in §3).

### F2 — INVERTED dependency: the module-global `useColorPipeline` reaches DOWN into three picker-nested composables (the load-bearing knot) · owner: demo

**Evidence**: `@composables/color/useColorPipeline.ts` (383 LoC, the app-wide color state,
consumed by `App.vue`, `useAtmosphere`, panes, dock…) imports **downward** into the feature:
- `color-picker/composables/useColorNameResolution.ts` (its ONLY importer is the pipeline)
- `color-picker/composables/useColorParsing.ts` (ONLY importer: the pipeline)
- `color-picker/composables/useSliderGradients.ts` (ONLY importer: the pipeline)

Plus the sibling color-name cluster `normalizedColorNames.ts` / `useCustomColorNames.ts` /
`useColorUrl.ts` is consumed by `App.vue` + the resolution composable — never by a picker
sub-component's render tree.

**Root cause**: the color DOMAIN (parse → resolve names → pipeline state → url sync) is
app-global, but half its modules are physically nested inside the `color-picker` FEATURE
because that is where the picker UI first grew them. The result is a global module importing a
feature's private folder — the exact inversion E-1's "truly module/global-level composables
live in a `composables/` dir at their level" clause exists to forbid.

**Cure (gestalt)**: the color pipeline + its private helpers + the color injection keys are
ONE cohesion unit that today straddles `@composables/color/`, `color-picker/composables/`, and
`color-picker/keys.ts`. **Unify them under `@composables/color/`** (the domain is global, so
the picker-nested helpers rise to sit beside `useColorPipeline`). `useColorParsing`,
`useColorNameResolution`, `useSliderGradients`, and the color-name cluster become
`@composables/color/`; the picker feature keeps only what its own `.vue` tree renders. This is
the same move the repo already made once for `lib/color-space-meta.ts` ("these are color-space
FACTS, not gradient facts … this `@lib/` module is the neutral home" — S.W5-6 F16), so the
idiom is established precedent, not invention.

### F3 — `color-picker/keys.ts` is the app-wide COLOR CONTRACT but is buried three levels deep inside the picker feature · owner: demo

**Evidence**: `color-picker/keys.ts` exports `COLOR_MODEL_KEY`, `CSS_COLOR_KEY`,
`SAFE_ACCENT_KEY`, `EDIT_TARGET_KEY`, `ActionBarContext`. Importer census (disambiguated):
**8 in-feature + ~15 out-of-feature** = `dock/Dock.vue`, `dock/layers/ActionBarLayer.vue`,
`image-palette-extractor/ExtractWorkbench.vue`, 4× `palette-browser/*`, 6× `panes/*`,
`@composables/color/useAtmosphereBoot.ts`, and `App.vue`. Its own types come from
`@composables/color/useColorPipeline` (`UseColorPipelineReturn`) and its barrel (`EditTarget`).

**Root cause**: an injection contract consumed by the whole shell was filed as if it were a
picker-private detail. Every non-picker consumer must deep-reach `…/color-picker/keys` for a
symbol that has nothing to do with the picker component specifically.

**Cure (gestalt)**: the color contract rises to the color domain — `@composables/color/keys.ts`
(colocated with `useColorPipeline`, which already types `COLOR_MODEL_KEY`). This is the
partner move to F2: keys + pipeline + helpers reunify as the color domain. It also breaks the
awkward `keys.ts → barrel (EditTarget) → keys.ts` back-reference by relocating both into one
place. **Highest single-symbol blast radius in the tree (~24 import sites)** — see §5.

### F4 — `palette-browser/` is a 31-`.vue` FLAT namespace [AMENDED-AT-HARDENING: 33→31 — H-EC-1]: the direct "long-running dirs must be broken into common modules" violation · owner: demo

**Evidence**: 31 `.vue` files sit at `palette-browser/` root with no sub-feature grouping
(only `composables/` and the one nested `PaletteDialog/`). The flat set contains at least five
distinct sub-features, each already legible from names + the import graph:
- **card cluster** (9): `PaletteCard` + `PaletteCardMenu`, `PaletteCardSwatches`,
  `PaletteRenameInput`, `ActionFeedback`, `SwatchHoverMenu`, `PaletteCardGrid`,
  `PaletteCardSkeleton`, `PaletteColorStrip` + composables `useHeightTransition`,
  `useHoverPopover`, `useLeaveTimer`, `useSwatchActions`.
- **admin cluster** (7+): `Admin{Audit,Flagged,Names,Tags,Users}Panel`, `AdminListItem`,
  `AdminListSkeleton`, `PaginationBar`.
- **search/filter cluster** (4): `SearchFilterBar` (+ its child `MiniColorPicker`),
  `SortFilterMenu`, `UserSortMenu`, `TagEditPopover`.
- **dialog/status cluster**: `FlagReportDialog`, `MigratePalettesDialog`, `DevMisconfigBanner`,
  `ApiOfflineChip`, `EmptyState`.
- **slug cluster**: `PaletteSlugBar`.

**Root cause**: the feature grew file-by-file with a flat naming convention (`Palette*`,
`Admin*`) standing in for directory structure. Names are the only grouping — the filesystem is
one bucket.

**Cure (gestalt)**: decompose into `card/`, `admin/`, `search/`, `dialog/`, `slug/`
sub-feature folders, each recursively owning its composables (per §3 table). `PaletteCard`
becomes `card/PaletteCard/` owning `PaletteCardMenu`/`PaletteCardSwatches`/`PaletteRenameInput`
/`ActionFeedback`/`SwatchHoverMenu` + the four card composables. This is the `PaletteDialog/`
pattern applied to the sibling clusters that never got it.

### F5 — Two module-global composables are type-coupled DOWN to specific palette-browser components (mis-homed feature-local composables) · owner: demo

**Evidence**:
- `@composables/auth/useAdminUsers.ts:14` — `import type AdminUsersPanel from
  "@components/custom/palette-browser/AdminUsersPanel.vue"` then `ref<InstanceType<typeof
  AdminUsersPanel>>` (a template-ref type).
- `@composables/palette/useSlugMigration.ts:6` — same shape against
  `palette-browser/PaletteSlugBar.vue`.

**Root cause**: these composables own a template ref into ONE palette-browser component, so
they are functionally palette-browser-local, yet they live in the global `@composables/auth/`
and `@composables/palette/` buckets. A global folder that `import type`-reaches a single
feature component is a mis-home (the inverse of F2 — feature-local logic parked in the global
bucket rather than global logic parked in a feature).

**Cure**: fold `useAdminUsers` into the new `palette-browser/admin/`, `useSlugMigration` into
`palette-browser/slug/`. More broadly, `@composables/palette/` (13 modules) and
`@composables/auth/` (4) should be audited pane/feature-by-feature: the ones bound to a single
feature colocate into it; only the genuinely cross-feature (e.g. `usePaletteStore`,
`usePaletteManager`) stay global. This lane flags the two proven-single-consumer cases; the
full `@composables/` down-audit is the natural companion lane (see F9 note).

### F6 — `panes/keys.ts` holds AURORA-atmosphere contracts, not pane contracts (domain-misfiled key file; the `keys.ts` basename collision) · owner: demo

**Evidence**: `panes/keys.ts` exports `AURORA_ATOMS_KEY` + `DEFAULT_AURORA_ATOMS`
(`AuroraAtoms` from `@mkbabb/glass-ui/aurora`). Its only importers are `panes/AuroraPane.vue`
(one pane) and `@composables/color/useAtmosphere.ts` (global). Nothing pane-generic uses it.
Meanwhile a second `keys.ts` (color-picker) is the actual shell contract — two `keys.ts` files,
unrelated domains, colliding on basename.

**Root cause**: the aurora atoms door was filed under "panes" because AuroraPane is where it is
tuned, not by its domain (atmosphere). It is the aurora sibling of `BLOB_CONFIG_KEY` (glass-ui
provided) and belongs with the atmosphere composables.

**Cure**: relocate to `@composables/color/` (beside `useAtmosphere`/`useAtmosphereBoot`) as
e.g. `@composables/color/aurora-atoms.ts` — named by domain, not by the "panes" accident. Under
recursive colocation, resist minting a generic `panes/keys.ts`: pane injection contracts, if
any emerge, name themselves; domain contracts live with their domain.

### F7 — Cross-feature shared atoms live inside one feature with NO public-surface discipline (deep imports bypass the vestigial barrels) · owner: demo (EmptyState: joint/glass-ui candidate)

**Evidence** — feature barrels (`index.ts`) export only the top 1-2 components; every
cross-feature consumer deep-imports internals instead:
- `palette-browser/PaletteCard.vue` — **9 importers across 5 features** (generate,
  image-palette-extractor, mix, palette-browser, panes). Barrel-exported (good).
- `palette-browser/PaletteCardGrid` / `PaletteCardSkeleton` / `PaletteColorStrip` —
  cross-feature-imported (mix, panes, extractor) but **NOT barrel-exported** → deep imports.
- `palette-browser/EmptyState.vue` — **8 importers across 3 features**; it is a GENERIC
  empty-state, nothing palette-specific.
- `color-picker/controls/{ActionButton,ActionToolbar,ColorInput}.vue` — deep-imported by
  `dock/layers/{GenericActionBar,ActionBarLayer}.vue` (the dock's action bar IS the picker's
  action toolbar relocated).
- `color-picker/display/ColorSpaceSelector.vue` — deep-imported by `panes/AboutPane.vue`.

**Root cause**: barrels were authored as thin "top component" re-exports, not as the feature's
public surface. Recursive colocation MOVES the very paths these deep imports name, and there is
no insulation layer — so today every cross-feature edge is a hard-coded internal path.

**Cure (gestalt)**: two moves. (a) For domain atoms (PaletteCard family, picker action
controls) — make the barrel the REAL public surface (export the cross-consumed atoms) and route
external consumers through it, so recursion behind the barrel is invisible to consumers. (b)
For `EmptyState` (feature-neutral) — it is a generic primitive; per E-6 glass-ui-first it is a
**request-packet candidate for glass-ui** (joint owner), not a palette-browser resident. Same
question applies to the picker action controls: are they a picker export the dock consumes, or
a shared "action-bar" primitive? — flag for the E-2 request-packet lane.

### F8 — Two zero-importer orphan components (E-3 "NO legacy code") · owner: demo

**Evidence**: `palette-browser/BulkActionToolbar.vue` (35 LoC) and
`palette-browser/SortFilterMenu.vue` (52 LoC) have **zero importers** across the entire demo
(verified: no `.vue`/`.ts` references either). Dead surface carried through the S close.

**Root cause**: superseded during prior palette-browser refactors, never deleted.

**Cure**: excise both as part of the F4 decomposition (do not re-home dead files — E-3 binds:
no legacy). Confirm at move-time they are not template-string/dynamic-referenced (grep clean).

### F9 — `dark-mode-toggle/` is a directory wrapping a 2-line re-export (structure without substance) · owner: demo

**Evidence**: `dark-mode-toggle/index.ts` (2 lines) is
`export { DarkModeToggle } from "@mkbabb/glass-ui/controls"; export { useGlobalDark } from
"@mkbabb/glass-ui/dark"`. No local component, no satellites.

**Root cause**: an alias folder from before the toggle moved wholesale to glass-ui.

**Cure**: dissolve the folder — consumers import the toggle from glass-ui (or a single shared
re-export line), not from a `custom/` "feature" that owns nothing. Trivial blast radius (see
§5); include in the sweep as an E-1 tidiness item, not a headline.

---

## §3 Per-feature TARGET-STRUCTURE tables (current path → target path)

Notation: `→ NEST` = move into a sub-component folder; `→ LIFT` = rise to a neutral/global
home; `→ KEEP` = already correct; `→ DROP` = delete (dead/dissolve). `[folder]` = the
sub-component is promoted from a lone `.vue` to a directory owning its satellites.

### 3.1 `color-picker/` (the highest-coupling feature — recurse LAST)

| current | verdict | target |
|---|---|---|
| `ColorPicker.vue` | KEEP | `color-picker/ColorPicker.vue` (root) |
| `controls/SpectrumCanvas.vue` | NEST[folder] | `controls/SpectrumCanvas/SpectrumCanvas.vue` |
| `composables/useGamutDetent.ts` | NEST | `controls/SpectrumCanvas/composables/useGamutDetent.ts` |
| `composables/useGamutOverlay.ts` | NEST | `controls/SpectrumCanvas/composables/useGamutOverlay.ts` |
| `composables/useSpectrumCrossfade.ts` | NEST | `controls/SpectrumCanvas/composables/useSpectrumCrossfade.ts` |
| `composables/useSpectrumPlateStyle.ts` | NEST | `controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts` |
| `gamutOverlayPaint.ts` (root) | NEST | `controls/SpectrumCanvas/gamutOverlayPaint.ts` |
| `spectrumLuma.ts` (root) | NEST* | `controls/SpectrumCanvas/spectrumLuma.ts` (*also read by ComponentSliders — see note) |
| `controls/SpectrumDetentLabel.vue` | NEST | `controls/SpectrumCanvas/SpectrumDetentLabel.vue` |
| `controls/SpectrumPlateCaption.vue` | NEST | `controls/SpectrumCanvas/SpectrumPlateCaption.vue` |
| `controls/ComponentSliders.vue` | NEST[folder] | `controls/ComponentSliders/ComponentSliders.vue` |
| `composables/useSliderTouchGates.ts` | NEST | `controls/ComponentSliders/composables/useSliderTouchGates.ts` |
| `display/ColorComponentDisplay.vue` | NEST[folder] | `display/ColorComponentDisplay/ColorComponentDisplay.vue` |
| `readoutReservation.ts` (root) | NEST | `display/ColorComponentDisplay/readoutReservation.ts` |
| `composables/usePointerDebug.ts` | KEEP | feature-wide (6 in-tree consumers) → `color-picker/composables/` |
| `visual/{HeroBlob,PointerDebugOverlay,DebugEventLog}.vue` | KEEP | `visual/` (debug cluster) |
| `colorSpaceInfo.ts` (root, 334 LoC) | KEEP | feature-shared data (ComponentSliders + ColorNutritionLabel) → `color-picker/colorSpaceInfo.ts` |
| `display/ColorNutritionLabel.vue` | KEEP | barrel-exported shared atom (also AboutPane) |
| `display/ColorSpaceSelector.vue` | KEEP* | shared (ColorPicker + AboutPane) — route AboutPane via barrel (F7) |
| `composables/useColorParsing.ts` | **LIFT (F2)** | `@composables/color/useColorParsing.ts` |
| `composables/useColorNameResolution.ts` | **LIFT (F2)** | `@composables/color/useColorNameResolution.ts` |
| `composables/useSliderGradients.ts` | **LIFT (F2)** | `@composables/color/useSliderGradients.ts` |
| `composables/normalizedColorNames.ts` | **LIFT (F2)** | `@composables/color/` (color-name cluster) |
| `composables/useCustomColorNames.ts` | **LIFT (F2)** | `@composables/color/` |
| `composables/useColorUrl.ts` | **LIFT (F2)** | `@composables/color/` |
| `keys.ts` (root) | **LIFT (F3)** | `@composables/color/keys.ts` |

*`spectrumLuma.ts` note: read by SpectrumCanvas's `useSpectrumPlateStyle` + `gamutOverlayPaint`
(nesting home) AND by `ComponentSliders`. It is a spectrum-luma primitive shared by two sibling
controls → strictly it is `controls/`-shared, not SpectrumCanvas-private. **Verdict: KEEP at
`controls/` level** (a `controls/spectrumLuma.ts`) rather than force it into one sub-folder —
this is the honest reading of the "≥2 sibling consumers ⇒ KEEP at their common ancestor" rule.

### 3.2 `palette-browser/` (the long-running-dir decomposition — F4)

| cluster → target folder | members (current root `.vue`) | composables to fold in |
|---|---|---|
| `card/` — `PaletteCard/` [folder] | `PaletteCard` (+ children `PaletteCardMenu`, `PaletteCardSwatches`, `PaletteRenameInput`, `ActionFeedback`, `SwatchHoverMenu`) | `useHeightTransition`, `useHoverPopover`, `useLeaveTimer`, `useSwatchActions` (all currently in `palette-browser/composables/`) |
| `card/` (siblings) | `PaletteCardGrid`, `PaletteCardSkeleton`, `PaletteColorStrip` | — (barrel-export: cross-feature, F7) |
| `admin/` | `Admin{Audit,Flagged,Names,Tags,Users}Panel`, `AdminListItem`, `AdminListSkeleton`, `PaginationBar` | `useAdminUsers`, `useAdminAudit`, `useAdminFlagged`, `useAdminTags` (LIFT-DOWN from `@composables/{auth,palette}/` — F5) |
| `search/` | `SearchFilterBar` (+ child `MiniColorPicker`), `UserSortMenu`, `TagEditPopover` | — |
| `dialog/` | `PaletteDialog/` (already recursive — KEEP), `FlagReportDialog`, `MigratePalettesDialog`, `DeleteAllConfirm`* | `useDialog*` (already in `PaletteDialog/composables/` — KEEP) |
| `slug/` | `PaletteSlugBar` | `useSlugMigration` (LIFT-DOWN from `@composables/palette/` — F5) |
| `status/` | `ApiOfflineChip`, `DevMisconfigBanner` | — |
| `card/` (edit chrome) [AMENDED-AT-HARDENING — M-27/H-EC-1: two real root components were dropped from this census] | `CurrentPaletteEditor` (305 LoC; 3 importers — PalettesPane, DevMisconfigBanner, PaletteSavedTab; `.dashed-well` kinship per t-card-color-census B1 → seats beside `PaletteCard`) | — |
| `dialog/` (drawer) [AMENDED-AT-HARDENING — M-27/H-EC-1] | `VersionHistoryDrawer` (164 LoC; 3 importers — BrowsePane, PaletteDialog, useDialogModalStack; PaletteDialog is its own importer → seats in `dialog/`) | `useVersionHistory` (already palette-domain) |
| **LIFT-OUT** | `EmptyState` → glass-ui request packet OR `@components/` shared atom (F7) | — |
| **DROP** | `BulkActionToolbar`, `SortFilterMenu` (zero importers — F8) | — |

*`DeleteAllConfirm.vue` currently lives in `PaletteDialog/components/`; it is PaletteDialog-private
(one importer) — KEEP there; listed only to show the dialog family membership.

### 3.3 The contained features (recurse FIRST — low blast radius)

| feature | current | verdict → target |
|---|---|---|
| **gradient/** | `perceivedSpacePaint.ts` (root) | NEST → `PerceivedSpacePlate/perceivedSpacePaint.ts` (only importer: PerceivedSpacePlate) |
| | `composables/usePerceivedRamp.ts` | KEEP-or-NEST (3 consumers: GradientVisualizer, PerceivedSpacePlate, perceivedSpacePaint) → `gradient/composables/` (feature-shared) |
| | `composables/{gradientParse,useGradientCSS,useGradientInterpolation,useGradientModel}.ts` | KEEP (feature-shared across Gradient* siblings) |
| | `GradientVisualizer.vue` [folder?] | it owns `GradientCodeEditor`/`GradientEasingEditor`/`GradientStopEditor`/`PerceivedSpacePlate` as single-parent children → NEST them into `GradientVisualizer/` |
| **mix/** | `composables/mixStage.ts` | NEST → `MixAnimationCanvas/` cluster (consumer chain: mixStage→useMixingAnimation→MixAnimationCanvas) |
| | `composables/useMixingAnimation.ts` | NEST → `MixAnimationCanvas/composables/` (one importer) |
| | `composables/useMixingState.ts` | KEEP (5 consumers incl. panes/MixPane — feature-shared) → `mix/composables/` |
| **image-palette-extractor/** | `composables/useInertiaGesture.ts` | **NEST → `ImageEyedropper/composables/`** (only importer: `ImageEyedropper.vue`; currently one level too high) |
| | `composables/{useExtractSession,useImageQuantize}.ts` | KEEP (extractor-shared) |
| | `ImageEyedropper/` | KEEP — the exemplar |
| **dock/** | `composables/{useDockAdminMode,usePopupMutex}.ts`, `layers/`, `menus/` | KEEP — already correct & self-contained |
| **markdown/** | `composables/{useMarkdownColors,useMarkdownHighlighting}.ts` | KEEP (both Markdown-only, but 2 siblings → `markdown/composables/` is fine; optional NEST into `Markdown/`) |
| **generate/** | `composables/useColorGeneration.ts` | KEEP* — BUT note it is cross-imported by `color-picker/composables/useColorParsing.ts` (a color↔generate cross-feature edge; resolves cleanly once useColorParsing LIFTs to `@composables/color/` per F2) |
| **katex/** | flat | KEEP |
| **panes/** | `keys.ts` | LIFT (F6) → `@composables/color/`; `ConfigSliderPane` (child of AuroraPane+BlobPane) + `PaneHeader` (10 consumers) + `PaneSlot` + `PaneSegmentedControl` stay as the pane-shared kit |

---

## §4 Shared-vs-colocatable verdict ledger (roll-up)

| verdict | count | modules (abbrev) |
|---|--:|---|
| **NEST-DOWN** | ~14 | picker: 4 spectrum composables + gamutOverlayPaint + readoutReservation + useSliderTouchGates + 2 caption `.vue`; gradient: perceivedSpacePaint + 4 editor `.vue`; mix: mixStage + useMixingAnimation; extractor: useInertiaGesture |
| **KEEP (feature-shared)** | ~16 | picker: usePointerDebug, colorSpaceInfo, spectrumLuma(@controls), visual/*; gradient: 4 gradient composables + usePerceivedRamp; mix: useMixingState; extractor: useExtractSession/useImageQuantize; dock/*; markdown/*; PaletteDialog/*; pane kit |
| **LIFT-UP / INVERTED** | ~11 | **color domain (F2/F3/F6)**: useColorParsing, useColorNameResolution, useSliderGradients, normalizedColorNames, useCustomColorNames, useColorUrl, color-picker/keys.ts, panes/keys.ts(aurora); **feature-local mis-homed globals (F5)**: useAdminUsers, useSlugMigration (+ candidate: useAdminAudit/Flagged/Tags) |
| **LIFT-OUT (neutral/glass-ui)** | 1–4 | EmptyState (F7); candidates: picker action controls, PaletteCard family public surface |
| **DROP** | 2 (+1 dissolve) | BulkActionToolbar, SortFilterMenu (F8); dark-mode-toggle/ folder (F9) |

**Net effect on the two global buckets**: `@composables/color/` GAINS the picker color helpers
+ keys + aurora atoms (F2/F3/F6) — it becomes the true color domain. `@composables/palette/` +
`@composables/auth/` SHED their feature-bound members into `palette-browser/` (F5). E-1's
"truly module/global-level composables live in a `composables/` dir at their level" becomes
literally true: what remains global is only what ≥2 features share.

---

## §5 Collision & import-blast-radius estimate

**Blast radius = number of import sites whose specifier path is rewritten by a move.** There is
NO insulating barrel for deep imports (feature `index.ts` files export only the top 1-2
components; §1/§2-F7), so every cross-feature and internal edge is a hard path.

| move | rewritten import sites | risk |
|---|--:|---|
| **color-picker/keys.ts → @composables/color/** (F3) | **~24** (8 in-feature + ~15 external + App) | **highest** — app-wide contract; do behind a codemod, single atomic commit |
| **color-picker color helpers → @composables/color/** (F2) | ~8 (pipeline + App + the color-name cluster's mutual edges) | high — but all edges are already color-domain, low semantic risk |
| **palette-browser flat → 5 sub-folders** (F4) | **~60+** internal + 9 external deep-import edges | high volume, low semantic risk (mechanical); the 9 external edges (mix/generate/extractor/panes) are the ones to barrel-insulate FIRST (F7) |
| **SpectrumCanvas.vue → SpectrumCanvas/** (F1) | ~10 (its 6 satellites + 2 caption children + ColorPicker + luma) | contained within `color-picker/controls/` |
| **useAdminUsers/useSlugMigration → palette-browser/** (F5) | ~4 | low |
| **panes/keys.ts → @composables/color/** (F6) | 2 | trivial |
| **contained features (gradient/mix/extractor)** | ~2–4 each | **safe — recurse these first** |
| **DROP orphans + dissolve dark-mode-toggle** (F8/F9) | 0 / ~1 | trivial |

**Basename-collision hazard (structural, not per-move)**: recursive colocation MULTIPLIES
same-basename files. Today there are already `keys.ts` ×2 (color-picker, panes — colliding
domains, F6), `constants.ts` ×3 (ImageEyedropper, PaletteDialog, lib/palette), `index.ts` ×11
(barrels). Full recursion mints one `composables/`, `constants.ts`, `index.ts` per promoted
sub-component folder — dozens of identically-named files. **Compiler-safe** (specifiers are
path-qualified) but it degrades: (a) grep-by-basename tooling (this very census had to
disambiguate `keys`/`constants`), (b) editor tab/quick-open ambiguity, (c) barrel re-export
chains. **Mitigation to encode in the T plan**: a naming/barrel convention — either keep
domain-qualified filenames (`aurora-atoms.ts` not `panes/keys.ts`) or mandate that every
promoted folder re-exports through a local `index.ts` so cross-tree imports name the folder,
not the leaf. This is the standing cost of E-1 recursion and must be a ratified convention, not
an emergent mess.

**Sequencing (the churn-minimizing order)**: (1) DROP orphans + dissolve dark-mode-toggle;
(2) recurse the CONTAINED features (dock is already done; gradient/mix/extractor — 0–2 external
edges); (3) decompose palette-browser behind a hardened barrel (F4+F7); (4) unify the color
domain LAST (F2/F3/F6 as one atomic codemod — it is the load-bearing app-wide contract, and
doing it last means every earlier move is already stable when the highest-blast edge lands).

---

## §6 Interactions with sibling T lanes & edicts

- **E-2 (glass-ui request packets)**: `EmptyState` and possibly the picker action controls are
  glass-ui-first candidates (F7) — hand to the request-packet lanes as "should this be a
  glass-ui primitive?" rather than resolving here.
- **E-3 (no legacy)**: F8 orphans + F9 dissolve are E-3 items folded into the colocation sweep.
- **Companion lane needed**: the `@composables/` DOWN-audit (F5) — `@composables/palette/` (13)
  + `@composables/auth/` (4) each vetted feature-bound-vs-global. This lane proved 2 of them
  single-feature; the rest need the same reverse-dep pass. (Likely the sibling
  `t-coloc-composables`/backend-E-1 lane's remit — flagged for the synthesis.)
- **E-1 backend clause**: out of this lane's scope (`api/`), noted only because the edict is
  "ALL file directories" — a parallel `api/` census is required for completeness.

**Nothing in this lane is a product-code change.** Every row is a design direction; the moves,
the barrel-hardening convention, and the sequencing are the ratifiable T-plan inputs.
