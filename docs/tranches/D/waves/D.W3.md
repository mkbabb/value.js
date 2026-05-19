# D.W3 — Frontend cohesion — PaletteDialog split + facade completion + codemod

**Opens after**: D.W2 close.
**Lanes**: 3 — A (`PaletteDialog.vue` split + `PALETTE_MANAGER_KEY` migration + `TabValue` reconcile), B (palette-manager facade completion — lift 10 component-side `@lib/palette/api` imports into composables), C (Vue 3.5 codemod — reactive-props destructure + `useTemplateRef` + dead-provide cleanup). All three are file-disjoint enough to run in parallel after Lane A lands the dir-split.
**Status**: planned.

Source: `research/De-frontend-god-modules.md`.

## Scope

### Lane A — `PaletteDialog.vue` split + `PALETTE_MANAGER_KEY` migration

`PaletteDialog.vue` is 652 lines (401 script). `research/De-frontend-god-modules.md §2 P1` found it independently re-wires the 9 composables `usePaletteManager` already exposes — ~80 lines of parallel wiring + parallel watchers (`PaletteDialog.vue:367–378` ↔ `usePaletteManager.ts:182–193`) + parallel `searchPlaceholder`/`filteredSaved` state. The split is colocated per the directive ("Complex components should be structured into sub-component dirs with components, composables, constants, skeletons"):

```
demo/@/components/custom/palette-browser/PaletteDialog/
├── PaletteDialog.vue          # the outer shell (≤ ~200 lines)
├── components/
│   ├── PaletteDialogHeader.vue   # (existing, moved)
│   └── (any new sub-component the split produces)
├── composables/
│   └── usePaletteDialogState.ts  # (existing, moved; TabValue reconciled)
└── constants.ts                  # (if needed)
```

1. Read `PaletteDialog.vue` end-to-end. Identify the parallel re-wiring of `usePaletteManager`'s 9 composables — replace with `const pm = inject(PALETTE_MANAGER_KEY)!` consumption.
2. Split the 652 / 401-script lines into: outer dialog shell, sub-components (per `research/De-frontend-god-modules.md §2`'s sketched split — likely a `PaletteDialogBody.vue` + a `PaletteDialogFooter.vue` or similar), composables (moved into the dir).
3. **`TabValue` reconcile** — `usePaletteDialogState.ts:5` lists 5 tab values; `PaletteControlsBar.vue:31–46` renders 8 triggers; `ViewId` lists 13. Make `TabValue` match the rendered set. Add a type-test if the union goes back out of sync.

**Sub-gate A**: `wc -l demo/@/components/custom/palette-browser/PaletteDialog/**/*.vue` shows every file ≤ ~250; zero parallel-wire of `usePaletteManager`'s composables in the dialog; `TabValue` count = `PaletteControlsBar` trigger count.

### Lane B — palette-manager facade completion

`research/De-frontend-god-modules.md §8 P2` named 10 component-side `@lib/palette/api` imports across 5 admin panels + the dialog + `BrowsePane`. The facade pattern (centralized in `usePaletteManager`) is incomplete — components reach into the api directly, bypassing the facade. Lift each into a `usePaletteManager` method (or a colocated `palette/use*.ts` composable) so components consume only the facade.

**Sub-gate B**: `grep -rln '@lib/palette/api' demo/@/components/custom/` returns zero (or only the facade-internal composables).

### Lane C — Vue 3.5 codemod

`research/De-frontend-god-modules.md §6 P2/P3`: 38 of 40 custom SFCs use `const props = defineProps<...>()` instead of the Vue 3.5 reactive-props destructure (`const { foo, bar = … } = defineProps<...>()`); 8 SFCs use `ref<HTMLElement>` instead of `useTemplateRef`. Plus one dead `provide("auroraConfig", …)` in `App.vue` (zero consumers; verify and remove).

1. Reactive-props destructure — automatable via a codemod. The pattern: `const props = defineProps<T>()` and downstream `props.x` references → `const { x, y } = defineProps<T>()` + downstream `x`/`y`. Where defaults exist, port via destructure-default (`{ x = 5 }`). Vue 3.5+ preserves reactivity in destructured refs.
2. `useTemplateRef` — replace the 8 sites' `const el = ref<HTMLElement>()` + `<div ref="el">` with `const el = useTemplateRef("el-name")` + `<div ref="el-name">`.
3. Dead `provide("auroraConfig", …)` — verify zero consumers and remove.

**Sub-gate C**: `grep -rln 'const props = defineProps<' demo/@/components/custom demo/color-picker` ≤ 2 (the truly-justified hold-outs are recorded in `audit/D.W3-codemod.md`); 8 `ref<HTMLElement>` → `useTemplateRef`; `App.vue` no longer carries `provide("auroraConfig", …)`.

## File bounds

| Lane | Files |
|---|---|
| A | `demo/@/components/custom/palette-browser/PaletteDialog.vue` (move into a dir), the new `PaletteDialog/` dir contents, `usePaletteDialogState.ts` (move into the dir; reconcile `TabValue`), `PaletteControlsBar.vue` (only if the union reconcile requires it) |
| B | 10 consumer SFCs (5 admin panels + the dialog + `BrowsePane.vue`), `usePaletteManager.ts` (or colocated `palette/use*.ts`) |
| C | The 38 SFCs (codemod), 8 `useTemplateRef` migration sites, `App.vue` (dead-provide removal) |

## Gate

The conjunction of sub-gates A + B + C + a 3-viewport-light Playwright probe that walks the palette views (palettes, browse, admin) — 0 console errors. `vue-tsc` ≤ 126 (no new errors); `vitest` 1409; smoke 3/3.

## Verification artefacts

`audit/D.W3-palette-dialog.md` (Lane A — the split + the line counts + the facade migration), `audit/D.W3-facade.md` (Lane B — the 10 lifts), `audit/D.W3-codemod.md` (Lane C — the 38-SFC + 8-templateref + 1-dead-provide migration), `audit/D.W3-playwright/`.

## Commit plan

- `refactor(demo/w3): split PaletteDialog into a colocated dir; consume PALETTE_MANAGER_KEY; reconcile TabValue drift` — Lane A.
- `refactor(demo/w3): complete the palette-manager facade — lift 10 component-side @lib/palette/api imports into composables` — Lane B.
- `refactor(demo/w3): Vue 3.5 codemod — reactive-props destructure + useTemplateRef + retire dead provide('auroraConfig')` — Lane C.

## Dependencies

- Depends on: D.W2 (the backend's repository layer informs the facade's shape; the demo consumes `pm.X` not `apiFetch(X)` after Lane B).
- Blocks: D.W4 (component splits change CSS scope a bit).
