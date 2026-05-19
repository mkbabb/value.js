# D.W3 — Frontend cohesion — PaletteDialog split + facade completion + codemod + viewSchema

**Opens after**: D.W1 close. **May run in parallel with D.W2** (file-disjoint per D-HARDEN-1).
**Lanes**: 4 — A (`PaletteDialog.vue` split + `PALETTE_MANAGER_KEY` migration + `PaletteControlsBar` trigger bug), B (facade completion — 11 consumer lifts into 5 colocated sub-composables as facade sub-objects), C (Vue 3.5 codemod — 32 SFCs + `useTemplateRef` + dead-provide + `cssColorToRgb` per-frame memoise), D (`viewSchema.ts` extraction). All four are file-disjoint enough to run in parallel after Lane A lands the dir-split. Worktree isolation for B and C (they share many SFC files).
**Status**: planned.

Source: `research/De-frontend-god-modules.md`; hardening corrections from `audit/D-HARDEN-4-frontend.md`.

## Scope

### Lane A — `PaletteDialog.vue` split + `PALETTE_MANAGER_KEY` migration + the controls-bar trigger bug

`PaletteDialog.vue` is 652 lines (401 script). `research/De-frontend-god-modules.md §2 P1` found it independently re-wires the 9 composables `usePaletteManager` already exposes — ~80 lines of parallel wiring + parallel watchers (`PaletteDialog.vue:367-378` ↔ `usePaletteManager.ts:182-193`) + parallel `searchPlaceholder`/`filteredSaved` state.

**Concrete split** (per `D-HARDEN-4 §2` — 12 files):

```
demo/@/components/custom/palette-browser/PaletteDialog/
├── PaletteDialog.vue                       # outer shell, ≤ ~200 lines
├── components/
│   ├── PaletteDialogHeader.vue             # (existing, moved)
│   ├── PaletteControlsBar.vue              # (existing, moved + trigger bug fixed — see ▼)
│   ├── PaletteSavedTab.vue                 # (existing, moved)
│   ├── PaletteBrowseTab.vue                # (existing, moved)
│   ├── PaletteSearchEmpty.vue              # (existing, moved)
│   └── DeleteAllConfirm.vue                # NEW — extracted from the inline confirm-dialog
├── composables/
│   ├── usePaletteDialogState.ts            # (existing, moved)
│   ├── useDialogModalStack.ts              # NEW — extracts the stack-of-overlays bookkeeping
│   └── useDialogOverlayGuards.ts           # NEW — extracts the pointer/escape-key guards
└── constants.ts                            # NEW — dialog-local constants
```

No `skeletons/` dir — D-HARDEN-4 §2 verified there is no `<Suspense>` boundary inside the dialog today; skeleton scaffolding would be contrivance.

1. Read `PaletteDialog.vue` end-to-end. Identify the parallel re-wiring of `usePaletteManager`'s 9 composables — replace with `const pm = inject(PALETTE_MANAGER_KEY)!` consumption.
2. Land the 12-file split per the tree above. Each component / composable is single-concern.
3. **`PaletteControlsBar` trigger bug** (D-HARDEN-4 §2 REFRAME of the "TabValue drift"): the apparent 5-vs-8 union mismatch is NOT a `TabValue` enumeration drift — `PaletteControlsBar.vue:38-46` renders 3 admin-only triggers (`admin-audit`, `admin-flagged`, `admin-tags`) that have **no matching `<TabsContent>` in `PaletteDialog`** (those views render in `AdminPane.vue`, not in the dialog at all). **Fix the controls bar, not `TabValue`** — remove the 3 stray admin triggers (the views are reachable via the dock view-select, which is the correct entry point). `TabValue` stays the union of the 5 dialog-resident tabs.

**Sub-gate A** (3 numbered conditions):
- A-1: `wc -l demo/@/components/custom/palette-browser/PaletteDialog/**/*.vue` shows every component ≤ ~250; the outer shell ≤ ~200.
- A-2: Zero parallel-wire of `usePaletteManager`'s composables in the dialog tree; `pm = inject(PALETTE_MANAGER_KEY)` is the single consumption.
- A-3: `PaletteControlsBar` renders `TabValue.length` triggers (= 5); the 3 stray admin-triggers removed; the admin views still reachable from the dock view-select (verified by smoke).

### Lane B — facade completion — 11 lifts into 5 sub-composables as facade sub-objects

`research/De-frontend-god-modules.md §8 P2` named 10 component-side `@lib/palette/api` imports; **`D-HARDEN-4 §3` recount: 11** (missed `VersionHistoryDrawer.vue:110`). `usePaletteManager` already exposes 50+ members; adding 11 more flat methods bloats it toward 70+. **Architectural decision** (D-HARDEN-4 §3): lift into **5 new colocated `palette/use*.ts` composables**, expose them on `usePaletteManager` as **sub-objects**, NOT flat methods:

- `demo/@/composables/palette/useAdminAudit.ts` — admin-audit fetch + filter.
- `demo/@/composables/palette/useAdminFlagged.ts` — flagged palettes CRUD.
- `demo/@/composables/palette/useAdminTags.ts` — tags CRUD.
- `demo/@/composables/palette/useVersionHistory.ts` — version-drawer fetch + revert.
- `demo/@/composables/palette/useTagEdit.ts` — tag-edit popover state + commit.

Facade exposure: `pm.audit.loadAuditLog()`, `pm.flagged.list()`, `pm.tags.create()`, `pm.versions.list()`, `pm.tagEdit.save()` — sub-object addressing keeps `usePaletteManager`'s top-level shape stable.

**2 defensible KEEPs** (D-HARDEN-4 §3): `demo/@/composables/useCustomColorNames.ts:5` (a composable's own concern; not a leaky `@lib/palette/api` consumer) and `ColorInput.vue:117` (`proposeColorName` is a single direct endpoint with no domain logic worth a wrapper).

**Sub-gate B**: `grep -rln '@lib/palette/api' demo/@/components/custom/` returns ≤ 1 (only the `ColorInput.vue` recorded exception); the 5 sub-composables exist and are exposed on `usePaletteManager`.

### Lane C — Vue 3.5 codemod + cssColorToRgb micro-fix + dead-provide cleanup

`research/De-frontend-god-modules.md §6 P2/P3`; **D-HARDEN-4 §4 recount: 32 SFCs**, not 38 (the De estimate was inflated; fresh grep is the authority).

1. **Reactive-props codemod (32 SFCs)** — `const props = defineProps<T>()` and downstream `props.x` → `const { x, y = … } = defineProps<T>()` + downstream `x`/`y`. Vue 3.5+ preserves reactivity in destructured refs. Mechanical via codemod EXCEPT 2 hand-conversion sites:
   - `GooBlob.vue:41` uses `toRef(props, "color")` — this pattern needs an explicit rewrite to `toRef(() => color)` (the destructured-reactive form). Hand-convert.
   - `ImageEyedropper.vue:336` is codemod-safe BUT **must wait on the ImageEyedropper P2 split** (Lane A's De §8 P2.2 fold-in — see §"Other fold-ins" below). Order codemod AFTER the split.
2. **`useTemplateRef` migration (8 sites)** — `const el = ref<HTMLElement>()` + `<div ref="el">` → `const el = useTemplateRef("el-name")` + `<div ref="el-name">`.
3. **`cssColorToRgb` per-frame memoise** (chronically-deferred Da §3 item 13, A.W7 performance finding) — `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:174` calls `cssColorToRgb(color.value)` every frame, doing a full 2D-canvas `getImageData` + a 3-element array allocation. 5-line memoise on the input-string key; correctness-neutral optimisation.
4. **Dead `provide("auroraConfig", …)` removal** — `App.vue` provides it with zero consumers (D-HARDEN-4 confirms). Remove the provide + the import.

**Library-perf research+challenge fold-ins** (per `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §1-3`, items L3 + L5 + L8 + L11 + L12):

5. **L3 — `parseCSSColor` memoisation + invalidation hook** (Dj P1 + CHALLENGE upheld). value.js's siblings `parseCSSValue` / `parseCSSPercent` / `parseCSSTime` / `parseAnimationShorthand` / `parseCSSStylesheet` / `getComputedValue` all memoize today (per CLAUDE.md contract); `parseCSSColor` does not, despite the doc promising parity. Mirror the existing memo wrapper at `src/parsing/color.ts:534` + add the invalidation hook called from `registerColorNames`/`clearCustomColorNames`. JSDoc warns "returned ValueUnit MUST NOT be mutated" (hardens an implicit invariant). ≤ 10 lines library-side.

6. **L8 — `parseCSSValueUnit` memo parity** (Dj M1 added at CHALLENGE). Same contract as L3; same call-pattern stability.

7. **L5 — `lerpColorValue` carries `hueMethod`** (Dl P1 + CHALLENGE UPHELD as load-bearing). `normalizeColorUnits` returns `hueMethod` in a 3-tuple that the downstream destructure drops; animations between `oklch(50% 0.2 350°) → oklch(50% 0.2 10°)` go the long way round (340° via 180°) instead of CSS Color 4 §12.4's default `shorter` (20° via 360→0). **CHALLENGE rejected the "one-branch fix" claim** — `InterpolatedVar<T>` has 4 fields, none for `hueMethod`/`colorSpace`. The fix is a 3-file change:
   - `InterpolatedVar<T>` type extension to carry `hueMethod?: HueInterpolationMethod` + `colorSpace?: ColorSpace`.
   - `normalizeColorUnits` producer: write the hueMethod into the IV instead of dropping it.
   - `lerpColorValue` consumer: dispatch `interpolateHue(a, b, t, hueMethod)` for the hue channel of cylindrical spaces instead of plain `lerp`.

8. **L11 — interpolation argument-order canonicalisation** (Dl P4 + CHALLENGE upheld as cheap). Three different t-positions across `lerp(t, a, b)` / `interpolateHue(a, b, t, method)` / `slerp(a, b, t)`. Bundle with L5 so the interpolation surface is touched once. Pick the canonical (`(a, b, t, opts?)` — value-pair first, parameter last) and migrate the ~8 call sites; provide a 1-tranche aliased export for the old signatures with a `@deprecated` JSDoc.

9. **L12 — `_lerp` bolt-on cleanup** (Di F1 post-CHALLENGE demotion to P3, optional, gated on bandwidth). `(iv as any)._lerp` bolt-on at `src/units/interpolate.ts:117` creates a non-stable call site. Pre-declare `_lerp` on `InterpolatedVar` and initialise it in `normalizeValueUnits`. Small cleanup; only ships if Lane C has time and the L5/L8 storage transposition didn't already address it.

**Sub-gate C** (extended): `grep -rln 'const props = defineProps<' demo/@/components/custom demo/color-picker` ≤ 2 (the 2 hand-converted holds get an inline rationale); 8 `useTemplateRef` migrations land; `cssColorToRgb` memoised; `App.vue` no longer carries `provide("auroraConfig", …)`; **library-perf fold-ins L3/L5/L8/L11 land**: `parseCSSColor` + `parseCSSValueUnit` carry the memo wrapper (verified by `grep` for the wrapper pattern); `InterpolatedVar` carries `hueMethod`/`colorSpace`; a `lerpColorValue` unit test asserts the short-way-round answer for the 350°→10° oklch pair; interpolation signatures consistent at the canonical `(a, b, t, opts?)`; L12 lands or is recorded as deferred.

### Lane D — `viewSchema.ts` extraction (the chronically-deferred Da §3 item 12)

`useViewManager.ts` (~237 lines) owns both the view *schema* (`VIEW_MAP` — the pane route table) and runtime *state* (current view, mobile pane index). `usePaneRouter.ts` (B.W2) re-derives shapes from that schema. `usePaletteDialogState.ts:5` re-enumerates `ViewId`. `router/index.ts` (if present) re-enumerates again. **4-copy `ViewId` enumeration** — recorded in B.W3 Lane A as a finding "routes to B.W3 Lane A's library audit (recommendation only)" but never folded into any D wave. **D-HARDEN-4 §5** declared this a strict D5 violation if unfolded; Lane D folds it.

1. Extract `demo/@/composables/viewSchema.ts` — owns `ViewId` (the union), `VIEW_MAP` (the pane route table), and any shared type-helpers. Pure data + types, no reactivity.
2. `useViewManager.ts` becomes runtime-only (current view ref, mobile pane index, switchView, etc.) and imports `ViewId`/`VIEW_MAP` from `viewSchema.ts`.
3. `usePaneRouter.ts` imports from `viewSchema.ts` (deletes its inline component-name strings if they're enumerable from `VIEW_MAP`).
4. `PaletteDialog/composables/usePaletteDialogState.ts` imports `ViewId` from `viewSchema.ts` — the `TabValue` union derives from `viewSchema.ViewId` (the 5 dialog-resident tabs are a `TabValue extends ViewId` subset; the type-system enforces the no-stray-trigger rule from Lane A by construction).
5. Verify `router/index.ts` doesn't exist as a 4th re-enumeration (the audit was uncertain). If it does, route through `viewSchema.ts` too.

**Sub-gate D**: `demo/@/composables/viewSchema.ts` exists; `useViewManager`/`usePaneRouter`/`PaletteDialog`'s `usePaletteDialogState` all import from it; `grep` for inline `ViewId` enumeration outside `viewSchema.ts` returns zero.

### Other fold-ins (small, sequenced into Lane A or C)

Per `D-HARDEN-4 §1`:
- **`ImageEyedropper.vue` P2 split** (De §8 P2.2) — `ImageEyedropper.vue` is 300+ lines with index-narrowing complexity. Split into a colocated `ImageEyedropper/` dir if befitting the same component/composable pattern as `PaletteDialog/`. Handled inside Lane A (Lane A owns the "split god/medium-large components" thesis); the codemod (Lane C) waits on this split for that file.
- **`useColorNameQueue` move + `useAdminOperations` barrel deletion** (De §8 P2.5+P3.4) — move `useColorNameQueue` into the appropriate `palette/` subdir; if the `useAdminOperations` barrel has zero consumers post-Lane-B, delete it. Handled inside Lane B.
- **`CURRENT_PALETTE_ID` constant extraction** (De §8 P3.3) — move into `PaletteDialog/constants.ts` or a higher `palette/constants.ts` if used outside the dialog. Handled inside Lane A.
- **`ConfigSliderPane → ./configurator` adoption** (Da §3 item 9 — the glass-ui-UNBLOCKED half; `./configurator` already ships in glass-ui) — `demo/@/components/custom/panes/ConfigSliderPane.vue` (built in W4 Lane D) was meant to migrate onto glass-ui's existing `./configurator` surface; this half is not glass-ui-blocked. Either fold here (a small Lane A sub-step) or file in `coordination/Q.md`. Folded here — it's a single-file demo-side migration.

## File bounds

| Lane | Files |
|---|---|
| A | `demo/@/components/custom/palette-browser/PaletteDialog.vue` (move into `PaletteDialog/`), the new `PaletteDialog/` dir contents (12 files), `PaletteControlsBar.vue` (trigger bug fix), `ImageEyedropper.vue` (split into `ImageEyedropper/` dir if befitting), `ConfigSliderPane.vue` (migrate onto glass-ui `./configurator`) |
| B | 11 consumer SFCs (5 admin panels + dialog + BrowsePane + VersionHistoryDrawer + …), `demo/@/composables/palette/useAdminAudit.ts` + `useAdminFlagged.ts` + `useAdminTags.ts` + `useVersionHistory.ts` + `useTagEdit.ts` (5 new), `usePaletteManager.ts` (sub-object exposure), `useColorNameQueue` move, `useAdminOperations` barrel disposition |
| C | 32 SFCs (codemod), 8 `useTemplateRef` migration sites, `App.vue` (dead-provide removal), `useMetaballRenderer.ts` (cssColorToRgb memoise) |
| D | `demo/@/composables/viewSchema.ts` (new), `useViewManager.ts` (refactor), `usePaneRouter.ts` (import), `PaletteDialog/composables/usePaletteDialogState.ts` (`TabValue` derives from `ViewId`) |

## Gate

The conjunction of sub-gates A + B + C + D + a 3-viewport-light Playwright probe walking the palette views (palettes, browse, admin) — 0 console errors. `vue-tsc` ≤ 126 (no new errors); `vitest` 1409; smoke 3/3.

## Verification artefacts

`audit/D.W3-palette-dialog.md` (Lane A), `audit/D.W3-facade.md` (Lane B), `audit/D.W3-codemod.md` (Lane C), `audit/D.W3-view-schema.md` (Lane D), `audit/D.W3-playwright/`.

## Commit plan

- `refactor(demo/w3): split PaletteDialog into a colocated 12-file dir; fix PaletteControlsBar stray admin-triggers; split ImageEyedropper + ConfigSliderPane adopts ./configurator` — Lane A.
- `refactor(demo/w3): complete the palette-manager facade — 11 consumer lifts into 5 sub-composables exposed as pm.audit/flagged/tags/versions/tagEdit sub-objects` — Lane B.
- `refactor(demo/w3): Vue 3.5 codemod (32 SFCs reactive-props destructure + 8 useTemplateRef + cssColorToRgb per-frame memoise + retire dead provide(auroraConfig))` — Lane C.
- `refactor(demo/w3): extract viewSchema.ts as the canonical ViewId + VIEW_MAP source; useViewManager/usePaneRouter/PaletteDialog consume it` — Lane D.

## Dependencies

- Depends on: **D.W1** (contract-v2 resolution stable; no longer waits on D.W2 — see D-HARDEN-1 §3 critical-path correction).
- Blocks: D.W4 (component splits change CSS scope a bit; styling probe runs after).
