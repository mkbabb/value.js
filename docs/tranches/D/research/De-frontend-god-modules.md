# De — Frontend components/composables god-module + encapsulation audit (read-only)

Tranche D, Lane De. Scope: `demo/@/composables/**`, `demo/@/components/custom/**`, `demo/color-picker/**`. Post-B state.

Audit performed `2026-05-19`. All citations are `file:line`.

---

## §1 — God modules (>500 lines) + medium-large (300–500)

### >500 lines (god modules)

| LOC | Path |
| --- | --- |
| 652 | `demo/@/components/custom/palette-browser/PaletteDialog.vue` |

Only one true god module remains in the post-B demo (the dock and color-picker were already broken up). It is, however, the worst kind: a 652-line Vue SFC whose `<script setup>` block is **401 lines** (the template is 188, style 56). It is also the only file that wires up `usePaletteManager`'s constituent composables *manually* rather than consuming the `PALETTE_MANAGER_KEY` (see §4).

### 300–500 lines (medium-large — split candidates)

| LOC | Path | Verdict (see §2) |
| --- | --- | --- |
| 484 | `demo/@/lib/palette/api.ts` | **Cohesive** — pure REST client; split optional (by section). |
| 447 | `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` | **Cohesive presentational** — 229 LOC of scoped CSS dominates. |
| 426 | `demo/@/components/custom/palette-browser/PaletteCard.vue` | **Split candidate** — 173 LOC script doing 4 things. |
| 399 | `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue` | **Split candidate** — 258 LOC script, image+sample+loupe+actions. |
| 376 | `demo/@/components/custom/color-picker/index.ts` | **Borderline** — 276 LOC of `colorSpaceInfo` data table. |
| 375 | `demo/@/components/custom/color-picker/controls/ColorInput.vue` | **Acceptable** — 164 LOC script; cohesive single concern. |
| 343 | `demo/@/components/custom/image-palette-extractor/composables/useInertiaGesture.ts` | **Cohesive** — one composable, one concern (pointer/pan/zoom/inertia). |
| 333 | `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` | **Cohesive** — WebGL render loop, one resource lifecycle. |
| 323 | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` | **Acceptable** — 100 LOC script; bulk is template (~150). |
| 316 | `demo/@/components/custom/markdown/Markdown.vue` | **Cohesive** — 248 LOC of `<style>` dominates; script is 42 LOC. |
| 303 | `demo/@/components/custom/palette-browser/AdminUsersPanel.vue` | **Cohesive** — single admin table; 162 LOC script is dense but unitary. |

---

## §2 — Per-god-module cohesion verdict + sketched split

### §2.1 PaletteDialog.vue (652 LOC, P1)

**Verdict — NOT cohesive.** The script alone does at least five separable things and bypasses the `PaletteManager` facade that already exists for exactly this purpose.

What the 401-line `<script>` actually does (`PaletteDialog.vue:192–593`):

1. Wires `useAdminAuth`, `useUserAuth`, `useSession`, `usePaletteStore`, `usePaletteDialogState`, `useBrowsePalettes`, `useAdminUsers`, `useColorNameQueue`, `useSlugMigration` (lines 261–352). **All nine** composables are also wired by `usePaletteManager` (`demo/@/composables/palette/usePaletteManager.ts:118–284`), which would be reachable via `inject(PALETTE_MANAGER_KEY)`.
2. Hosts `commitColorEdit` for the parent's `EditTarget` flow (lines 402–425) — touches `props.savedColorStrings`, `savedPalettes`, `remotePalettes`.
3. Hosts the Dialog overlay-dismiss guards (`isTeleportedTarget`, `onPointerDownOutside`, `onInteractOutside`, lines 429–453) — a self-contained interaction concern.
4. Hosts version-history drawer state + `onRevert` (lines 518–536), flag-report dialog state + `onFlagSubmit` (lines 540–556), and "delete all" confirm state (lines 493–501) — three independent modal flows lifted into one parent.
5. Hosts publish/fork/export pipelines that all call `@lib/palette/api` directly (lines 468–572) — same call sites duplicated in `usePaletteManager`'s sub-composables.

The dialog is **rendered from `PalettesPane.vue`** (`demo/@/components/custom/panes/PalettesPane.vue:115` injects `PALETTE_MANAGER_KEY` and reads `pm.*`). The fact that PalettesPane has access to the manager but the dialog it owns does not, is the architectural smell.

**Sketched split** — sub-component directory with colocated parts:

```
palette-browser/PaletteDialog/
├── PaletteDialog.vue                    # ~120 LOC: shell + Tabs + overlay-guard
├── components/
│   ├── DialogOverlayGuards.vue          # isTeleportedTarget + pointer-down-outside
│   ├── VersionHistoryDrawer.vue         # moved from sibling (already exists)
│   ├── FlagReportDialog.vue             # moved from sibling (already exists)
│   └── DeleteAllConfirm.vue             # ConfirmDialog wrapper
├── composables/
│   ├── usePaletteDialogState.ts         # already exists — fix TabValue drift (§3.2)
│   ├── useDialogModalStack.ts           # version/flag/delete-all dialog state
│   └── useDialogPaletteActions.ts       # commit, publish, fork, export, revert, flag
└── constants.ts                         # CURRENT_PALETTE_ID = "__current__" (§5)
```

**Critical**: make `PaletteDialog.vue` `inject(PALETTE_MANAGER_KEY)` instead of re-wiring all sub-composables — eliminates ~80 LOC of duplicate wiring (lines 261–352).

### §2.2 PaletteCard.vue (426 LOC, P2)

**Verdict — mostly cohesive but template renders four distinct UI clusters.** The script (173 LOC) does one card-level thing per concern, but the template stuffs (a) metadata row, (b) inline rename, (c) action feedback, (d) expandable swatch grid into a single SFC.

The script `handleMenuAction` dispatcher (lines 327–358) hard-codes 14 action keys to emits — a strategy table that belongs in a colocated `cardMenuActions.ts`.

**Sketched split** (optional, only if expansion grows further — currently acceptable):

```
palette-browser/PaletteCard/
├── PaletteCard.vue                      # shell + metadata row (~150 LOC)
├── components/
│   ├── PaletteCardMetadata.vue          # name + badges + tags + vote button
│   └── PaletteCardSwatchGrid.vue        # expanded swatch grid + slug pill
└── constants.ts                         # menuActionTable: Record<string, (palette) => Emit>
```

Priority P3 — not urgent, fix only after PaletteDialog.

### §2.3 PointerDebugOverlay.vue (447 LOC, P3)

**Verdict — cohesive.** 218 LOC template + 229 LOC scoped `<style>` for a single floating debug panel. Acceptable as-is; no split needed.

### §2.4 ImageEyedropper.vue (399 LOC, P2)

**Verdict — mixed concerns in 258-LOC script.** The script combines (a) gesture wiring (`useInertiaGesture`), (b) offscreen-canvas pixel sampling, (c) loupe canvas drawing, (d) color-space formatting, (e) keyboard shortcuts. These are testable in isolation.

**Sketched split**:

```
image-palette-extractor/ImageEyedropper/
├── ImageEyedropper.vue                  # shell + template (~140 LOC)
├── composables/
│   ├── useImageSampler.ts               # offscreen canvas + sampleAt + formatInColorSpace
│   ├── useLoupeCanvas.ts                # drawLoupe (already named LOUPE_*)
│   └── usePinnedSampleState.ts          # sampledColor, pinned, swatchPulse
└── constants.ts                         # LOUPE_SIZE = 110, LOUPE_PIXELS = 11
```

Priority P2.

### §2.5 PaletteCardMenu.vue, AdminUsersPanel.vue, CurrentPaletteEditor.vue, Markdown.vue

All cohesive single-concern components in 300–500 LOC range. No split necessary. AdminUsersPanel at 303 LOC is on the boundary — if more admin functionality lands, split row→`AdminUserRow.vue`.

---

## §3 — Composables encapsulation assessment

### §3.1 Current shape

```
demo/@/composables/
├── prng.ts                     (utility, not a composable — fine at root)
├── useFilteredList.ts          (generic list utility — fine at root)
├── usePaneRouter.ts            (cross-cutting routing — fine at root)
├── useSafeStorage.ts           (generic — fine at root)
├── useViewManager.ts           (cross-cutting view registry — fine at root)
├── auth/         (6: useAdminAuth, useAdminOperations, useAdminUsers, useColorNameQueue, useSession, useUserAuth)
├── color/        (2: useAppColorModel, useContrastSafeColor)
└── palette/      (7: useBrowsePalettes, usePaletteActions, usePaletteExport, usePaletteManager, usePaletteManagerWiring, usePaletteStore, useSlugMigration)
```

### §3.2 Cohesion verdicts

- **`auth/`** — cohesive. `useAdminOperations.ts` is a 2-line barrel re-exporting `useAdminUsers` + `useColorNameQueue`. `useColorNameQueue` is *not* about auth — it's about an admin moderation queue for color *names*. Recommend moving `useColorNameQueue.ts` → `palette/useColorNameQueue.ts` (or `admin/useColorNameQueue.ts`), since the data it manages (proposed/approved color names) is not authentication. Then delete the `useAdminOperations.ts` barrel.
- **`color/`** — cohesive but tiny (2 files). Fine.
- **`palette/`** — mostly cohesive. Note `usePaletteActions` (167 LOC) and `usePaletteManager` (284 LOC) form a tight pair; `usePaletteManagerWiring` is a 70-LOC App-side adapter that should arguably be inside `usePaletteManager.ts` or named explicitly `useAppPaletteManager.ts`. The current split-by-call-site is sound, just over-decomposed.

### §3.3 Drift / bugs

- **`TabValue` drift** (B.W2 Lane C carry-over): `demo/@/components/custom/palette-browser/composables/usePaletteDialogState.ts:5` declares
  ```ts
  TabValue = "saved" | "browse" | "extract" | "admin-users" | "admin-names"
  ```
  but `PaletteControlsBar.vue:31–46` renders 5 admin triggers (`admin-users`, `admin-names`, `admin-audit`, `admin-flagged`, `admin-tags`). `useViewManager.ts:20–34` ALSO defines a `ViewId` union that includes all 5 admin views. **There are two parallel tab-id unions**: `TabValue` (5 values, partial admin) and `ViewId` (13 values, full admin). The dialog and the dock/router disagree on which admin tabs exist.

  Fix: in tranche D, retire `TabValue` and have `usePaletteDialogState` accept `ViewId` (or a narrowed subset, derived from `ViewId`).

- **Parallel state**: `usePaletteManager` (line 213) defines `searchPlaceholder` and `filteredSaved` (line 221), AND `usePaletteDialogState` (lines 20, 29) defines the same two values. Whichever consumer happens to mount first wins. After PaletteDialog migrates to `PALETTE_MANAGER_KEY`, drop the duplicates from `usePaletteDialogState`.

- **Composable colocated next to its sole consumer**: `palette-browser/composables/useHoverPopover`, `useHeightTransition`, `useCardMenu`, `useLeaveTimer`, `useSwatchActions`, `usePaletteDialogState` — all six are correctly colocated. Good.

### §3.4 Per-component composable trees

- `color-picker/composables/`: 8 files — cohesive split (useColorModel orchestrator + 7 focused: parsing, gradients, name-resolution, url, custom-names, pointer-debug, color-generation).
- `goo-blob/composables/`: 4 files — cohesive (mood FSM, pointer, satellites, renderer).
- `gradient/composables/`: 2 files (useGradientCSS + useGradientModel) — fine.
- `mix/composables/`: 1 file (useMixingAnimation) — fine.
- `markdown/composables/`: 3 files — fine.
- `image-palette-extractor/composables/`: 1 file (useInertiaGesture) — fine.
- `panes/`: no `composables/` subdir, but the panes are thin shells that inject `PALETTE_MANAGER_KEY` and forward — no composables needed.
- `dock/composables/`: 3 files (usePopupMutex, useDockAdminMode, useLayerTransition) — cohesive.

---

## §4 — State / store management assessment

### §4.1 Current pattern

- No Pinia. No Vuex. Vue 3 `shallowRef` + composables + `provide/inject` only.
- Cross-cutting state lives in three places:
  - **Color model**: `useAppColorModel(model: ShallowRef<ColorModel>)` (`demo/@/composables/color/useAppColorModel.ts`), provided via `COLOR_MODEL_KEY` from `ColorPicker.vue:84` (NOT App.vue — see §5).
  - **View routing**: `useViewManager()` provided via `VIEW_MANAGER_KEY` from `App.vue:143`.
  - **Palette CRUD/auth/admin/browse facade**: `usePaletteManager()` provided via `PALETTE_MANAGER_KEY` from `usePaletteManagerWiring` → `App.vue:183`.
- Local UI state stays per-component in `ref` / `shallowRef`.

### §4.2 Verdict — KEEP THE CURRENT PATTERN, DO NOT ADOPT PINIA

The composable-facade pattern is working correctly for this codebase:
- All three cross-cutting facades are typed `InjectionKey<T>` with a single provider in `App.vue` (or `ColorPicker.vue` for the color model).
- Six pane consumers correctly inject `PALETTE_MANAGER_KEY` (BrowsePane, ExtractPane, AdminPane, MixPane, GeneratePane, PalettesPane) and read state declaratively.
- The model is **already** a store-like facade — `PaletteManager` has 50+ members (`usePaletteManager.ts:17–113`), but the interface is structured by domain (auth, browse, admin-users, admin-color-names, slug-migration, actions, search-UI).

Adopting Pinia would require:
- Rewriting `usePaletteManager` as a `defineStore` (negative DX — losing colocation with sub-composables).
- Re-typing the 50-member return interface as store state/getters/actions.
- Pulling in another dependency.

**Verdict: PaletteManager facade + InjectionKey is the right shape.** Tranche D's lane De should *enforce* the facade by removing the bypass in PaletteDialog (§2.1), not by introducing Pinia.

### §4.3 Single state-management gap (P1)

`PaletteDialog.vue` independently wires `useAdminAuth`, `useUserAuth`, `useSession`, `usePaletteStore`, `useBrowsePalettes`, `useAdminUsers`, `useColorNameQueue`, `useSlugMigration`, `usePaletteActions` — all of which are *also* wired by `usePaletteManager`. Because `usePaletteStore` is module-singleton-shaped (it uses module-scoped `ref`s under the hood — confirm during tranche D), the data may stay in sync, but the **watchers and side-effects fire twice** (e.g., the `watch(activeTab, ...)` lazy-loaders in `PaletteDialog.vue:367–378` duplicate the `watch(currentView, ...)` in `usePaletteManager.ts:182–193`).

The fix is to delete lines 261–352 of `PaletteDialog.vue` and replace them with `const pm = inject(PALETTE_MANAGER_KEY)!`, then read everything off `pm`. This is the single highest-impact change in lane De.

---

## §5 — DI / typed keys assessment

### §5.1 Typed keys inventory

All cross-cutting keys are typed `InjectionKey<T>` symbols:

| Key | Type | Provided at | File |
| --- | --- | --- | --- |
| `COLOR_MODEL_KEY` | `UseColorModelReturn` | `ColorPicker.vue:84` (and `ActionBarLayer.vue:23`) | `color-picker/keys.ts:5` |
| `CSS_COLOR_KEY` | `ComputedRef<string>` | `App.vue:136` | `color-picker/keys.ts:6` |
| `SAFE_ACCENT_KEY` | `ComputedRef<string>` | `App.vue:139` | `color-picker/keys.ts:7` |
| `EDIT_TARGET_KEY` | `ShallowRef<EditTarget \| null>` | `App.vue:135` | `color-picker/keys.ts:8` |
| `VIEW_MANAGER_KEY` | `ViewManager` | `App.vue:143` | `composables/useViewManager.ts:187` |
| `PALETTE_MANAGER_KEY` | `PaletteManager` | `usePaletteManager.ts:281` (called from App.vue via wiring) | `composables/palette/usePaletteManager.ts:115` |
| `BLOB_CONFIG_KEY` | `BlobConfig` | `App.vue:219` | `goo-blob/types.ts:135` |
| `POINTER_DEBUG_KEY` | `UsePointerDebugReturn` | `ColorPicker.vue:87` | `color-picker/composables/usePointerDebug.ts:236` |

### §5.2 Untyped provide (P2)

One single offender: `App.vue:215` provides `auroraConfig` with a **string key**, not an `InjectionKey`:

```ts
provide("auroraConfig", auroraConfig);
```

Grep confirms zero consumers (`grep -rn "auroraConfig" demo` returns only the App.vue site itself). The provide is dead — should be removed in tranche D. If the consumer comes later, add `AURORA_CONFIG_KEY: InjectionKey<AuroraConfig>` to a `keys.ts`.

### §5.3 Provider locality

- `COLOR_MODEL_KEY` is provided by `ColorPicker.vue` itself — correct, since not every view mounts a color picker (e.g. the `atmosphere` and `admin-*` views).
- `EDIT_TARGET_KEY` provided in `App.vue:135`. Only one consumer (`useSwatchActions.ts:22`), but App-level provision is fine since `activeEditTarget` is a top-level state shared by Dock and ColorPicker.
- `CSS_COLOR_KEY` provided in `App.vue:136`. Eight consumers across panes + dialog + dock. Correct.
- `PALETTE_MANAGER_KEY` provided in `usePaletteManager.ts:281`, called from `usePaletteManagerWiring` from `App.vue:183`. The provide happens inside the composable — slightly tricky but Vue-legal. Document this.

### §5.4 Verdict

DI surface is **clean** with one cosmetic fix needed (untyped `auroraConfig` provide). No leaking implicit globals. P2.

---

## §6 — Modern Vue 3.5 patterns gaps

### §6.1 `useTemplateRef` vs `ref<HTMLElement>`

`useTemplateRef` is used in 14 sites (verified via `grep useTemplateRef`). The following 7 sites still use the old `ref<HTMLElement | null>(null)` pattern:

| File:Line | Variable |
| --- | --- |
| `demo/@/components/custom/gradient/GradientCodeEditor.vue:27` | `editorRef` |
| `demo/@/components/custom/gradient/GradientStopEditor.vue:19` | `barRef` |
| `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:109` | `logRef` |
| `demo/@/components/custom/palette-browser/PaletteControlsBar.vue:116` | `tabsScrollRef` |
| `demo/@/components/custom/palette-browser/MiniColorPicker.vue:82–83` | `canvasRef`, `hueRef` |
| `demo/@/components/custom/dock/layers/SlugEditLayer.vue:14` | `slugInputRef` |
| `demo/@/components/custom/palette-browser/composables/useCardMenu.ts:8` | `menuTriggerRef` (composable, fine to keep) |
| `demo/color-picker/App.vue:118–119` | `atmosphereCanvas`, `colorPickerRef` |

Modernize the 8 SFC sites to `useTemplateRef<T>("name")`. P3.

### §6.2 Reactive props destructure

**38 of 40** custom components use the old `const props = defineProps<...>()` pattern; only `Markdown.vue:34` and one other use the Vue 3.5 destructured form:

```ts
// Old
const props = defineProps<{ foo: string }>();
// ...use props.foo
// New (Vue 3.5+)
const { foo } = defineProps<{ foo: string }>();
// ...use foo directly
```

This is the largest single Vue-3.5 modernization gap. Tranche D could codemod all 38 SFCs. P2 (style-only, no behavior change).

### §6.3 `shallowRef` / `defineModel` usage

27 sites use `shallowRef` or `defineModel` — appropriate (the `defineModel`/`shallowRef` cache pattern is documented in MEMORY.md). Good.

### §6.4 `withDefaults` 

10+ SFCs use `withDefaults(defineProps<...>(), {...})`. In Vue 3.5 with reactive destructure, defaults can be provided inline:
```ts
const { layout = "default" } = defineProps<{ layout?: "default" | "aside" }>();
```
This pairs with §6.2 — codemod together. P3.

---

## §7 — Nested imports + test-in-src checks

### §7.1 Nested relative imports (`../../../` or deeper)

`grep -rn 'from\s*"\(\.\./\)\{2,\}'` across `demo/@/components` and `demo/@/composables` returns **zero matches**. All cross-tree imports already use the `@components/`, `@composables/`, `@lib/`, `@src/`, `@styles/`, `@utils/` aliases. **Pass.**

### §7.2 Tests colocated in src

`grep -rn 'describe(|^\s*it(|^\s*test(|from "vitest"' demo/@/components demo/@/composables` returns **zero real test invocations** (the only `it(` matches were `emit(...)` event handlers in templates). **Pass.**

### §7.3 Direct API calls from components (encapsulation leak — P2)

`grep -rn 'from "@lib/palette/api"' demo/@/components` returns 10 component-side imports that bypass the composable layer:

- `panes/BrowsePane.vue:132`, `palette-browser/PaletteDialog.vue:216` — should go through `PALETTE_MANAGER_KEY`.
- `color-picker/composables/useCustomColorNames.ts:5` — composable, OK.
- `color-picker/controls/ColorInput.vue:117` (`proposeColorName`) — single endpoint, OK to keep direct.
- `palette-browser/AdminAuditPanel.vue:75`, `AdminUsersPanel.vue:147`, `AdminTagsPanel.vue:83`, `AdminFlaggedPanel.vue:108`, `AdminPanel.vue:46` — these admin panels each call the API directly. Could be lifted into `palette/useAdminAudit.ts`, `useAdminTags.ts`, `useAdminFlagged.ts` to mirror existing `useAdminUsers` / `useColorNameQueue` pattern.
- `palette-browser/TagEditPopover.vue:46` — direct call to `getTags` + `updatePalette`.

### §7.4 Magic strings

`"__current__"` is used in 3 places (`PaletteDialog.vue:403`, `useSwatchActions.ts:25,78`). Move to a colocated `palette-browser/constants.ts` as `CURRENT_PALETTE_ID`. P3.

---

## §8 — Prioritized recommendations for tranche D

### P1 — must-do (one PR)

**P1.1 Break `PaletteDialog.vue` (652 LOC) into a `PaletteDialog/` sub-component dir, AND migrate it to consume `PALETTE_MANAGER_KEY`.** This single change:
- Removes ~80 LOC of duplicate composable wiring (`PaletteDialog.vue:261–352`).
- Eliminates double watchers (`PaletteDialog.vue:367–378` ↔ `usePaletteManager.ts:182–193`).
- Eliminates the `searchPlaceholder` / `filteredSaved` parallel-state bug (§3.3).
- Allows colocated dialog-only composables (`useDialogModalStack`, `useDialogPaletteActions`) per the §2.1 sketch.

**P1.2 Fix `TabValue` drift in `usePaletteDialogState.ts`.** Either widen to all 5 admin tabs or derive from `ViewId`. (Could be folded into P1.1.)

### P2 — should-do (separate PRs)

**P2.1 Reactive props destructure codemod** (§6.2) — convert 38 SFCs from `const props = defineProps<>` to destructured form. Pair with `withDefaults` → inline defaults (§6.4).

**P2.2 Split `ImageEyedropper.vue` (399 LOC, 258 LOC script) into colocated composables** (§2.4 sketch).

**P2.3 Lift remaining direct `@lib/palette/api` calls in admin panels into `palette/useAdminAudit.ts`, `useAdminTags.ts`, `useAdminFlagged.ts`** — mirrors existing pattern, completes the facade (§7.3).

**P2.4 Remove dead `provide("auroraConfig", ...)` at `App.vue:215`** (no consumers — §5.2). Or add typed key + consumer if intended.

**P2.5 Move `useColorNameQueue.ts` out of `auth/` into `palette/` or `admin/`** — it's about color-name moderation, not authentication (§3.2).

### P3 — nice-to-have

**P3.1 Convert 8 SFC sites from `ref<HTMLElement>` to `useTemplateRef`** (§6.1).

**P3.2 `PaletteCard.vue` split into `PaletteCard/` sub-component dir** (§2.2) — only after P1, only if expansion grows.

**P3.3 Extract `__current__` magic string to `palette-browser/constants.ts`** (§7.4).

**P3.4 Delete the 2-line `useAdminOperations.ts` barrel; import directly** (§3.2).

---

## Summary table — what tranche D's frontend lane should touch

| File | Action | Priority |
| --- | --- | --- |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue` | Split into `PaletteDialog/` dir + use `PALETTE_MANAGER_KEY` | **P1** |
| `demo/@/components/custom/palette-browser/composables/usePaletteDialogState.ts:5` | Fix `TabValue` to align with `ViewId` admin tabs | **P1** |
| All 38 SFCs using `const props = defineProps` | Reactive destructure codemod | P2 |
| `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue` | Split to sub-component dir | P2 |
| `demo/@/composables/auth/useColorNameQueue.ts` | Move to `palette/` or `admin/` | P2 |
| `demo/color-picker/App.vue:215` | Delete dead untyped provide | P2 |
| 5 admin panels in `palette-browser/` | Lift direct API calls into `palette/use*.ts` | P2 |
| 8 SFC template refs | `ref<HTML*>` → `useTemplateRef` | P3 |
| `demo/@/components/custom/palette-browser/PaletteCard.vue` | Optional sub-component dir | P3 |
| `demo/@/composables/auth/useAdminOperations.ts` | Delete 2-line barrel | P3 |

**State management verdict: keep composable-facade + `InjectionKey` pattern; do NOT adopt Pinia.** The facade is sound; tranche D's job is to enforce it by eliminating PaletteDialog's bypass.
