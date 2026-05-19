# B.W2 Lane A — Component consolidation

**Wave**: B.W2 Lane A — the pane-rendering-surface transposition. Orchestrator-owned (one architectural move, kept coherent in one hand).

## Thesis executed

App.vue's template was too dense to inline its computed chains, so layer after layer was lifted into wrappers and composables — the duplication was *hidden*, not removed. B.W2 Lane A makes **one `usePaneRouter` the single source of truth**; the downstream wrappers collapse because App.vue is no longer too dense to hold its composition directly.

## Tier-1 — confirmed consolidations (executed)

| # | Move | Result |
|---|---|---|
| 1 | Merge `DockMainLayer.vue` (151 lines, pure 12-prop/5-emit passthrough) into `Dock.vue` | `Dock.vue` 128 → 229 lines (≤ ~250 target; ~46% below pre-W4's 426). The `<DockLayer id="main">` block + `.action-bar-toggle-slot` CSS moved in. |
| 2 | Inline `useDockLayers.ts` (37 lines — 3 lines of logic under 16 of interface boilerplate) into `Dock.vue` | `activeLayer` ref + the immediate layer-dispatch watch now live in Dock.vue's `// Layer dispatch` block. File deleted. |
| 3 | Inline `useAtmosphere.ts` (24 lines, 2 statements) into `App.vue` | `reactive(structuredClone(DEFAULT_AURORA_CONFIG))` + `useAurora(...)` in App.vue's `// Aurora atmosphere` block. File deleted. |
| 4 | Collapse `useDesktopPaneRouter.ts` (103) + `useMobilePaneRouter.ts` (79) → `usePaneRouter.ts` | Two parallel route tables (a precept §5 one-path violation — duplicated `defineAsyncComponent` registry, parallel switch ladders) → one component registry + one `componentFor`/`leftProps`/`rightProps` triple. `usePaneRouter` returns `{ mobile, desktopLeft, desktopRight }` as `PaneSlot` computeds. Both routers deleted. |
| 5 | Fold `useGenericActionBar.ts` (54 lines) into `usePaneRouter` | The router's return gains `actionBar` — per-view dock metadata for the very generate/gradient/mix panes the router already dispatches. App.vue stops wiring two sources for one concern. File deleted. |

**Deletion proof**: `git ls-files | grep -E 'DockMainLayer|useDockLayers|useAtmosphere|useMobilePaneRouter|useDesktopPaneRouter|useGenericActionBar'` → zero.

`usePaneRouter.ts` is 229 lines and consumed by App.vue. App.vue script is **140 lines** (≤ ~140 target — it shed two router calls, the action-bar composable, and the atmosphere composable for one `usePaneRouter` + a 4-line inline `useAurora`).

The 4 popup-mutex models in Dock.vue were **kept** as 4 named `popupModel(...)` refs (the plan floated a `popupStates` reactive object). Evidence-based deviation: `popupModel()` *is* the `usePopupMutex` API — it hands out one mutex-bound model per key; a `reactive` wrapper would not consume that API, it would re-implement the mutex. Four named refs is the idiomatic consumption. No churn applied.

## Tier-1b — `ui/alert` fossil + dead `ui/` barrels (A.W7 finding N1/N2)

- **`ui/alert/`** — was a hand-rolled shadcn re-implementation (3 SFCs + a local `alertVariants` cva) of a primitive glass-ui ships (verified: glass-ui exports `Alert`/`AlertTitle`/`AlertDescription`/`AlertVariants` from its root barrel; the demo's and glass-ui's component contracts — `{ class?, variant? }` props, slot bodies — are identical). `ui/alert/index.ts` converted to a glass-ui re-export; the 3 local SFCs + the local cva deleted. The 2 consumers (`ColorNutritionLabel.vue`, `Markdown.vue`) import from the barrel unchanged.
- **Dead `ui/` barrels** — invariant-33 corpus grep: `ui/table` has **zero** references anywhere in `demo/` (no `<Table*>` usage in `custom/`, no import path) → deleted (10 files). `ui/chart` and `ui/calendar` are NOT independently dead — `ui/chart` feeds `ui/chart-{bar,line,area,donut}` and `ui/calendar` feeds `ui/auto-form`; both belong to `ui/`-internal shadcn families routed to the generator-update / vendoring effort B.W3 records. Untangling a connected family is not B.W2's commit to make.

## Tier-2 — evaluate-at-wave-open verdicts

| Candidate | Consumers | Verdict | Evidence |
|---|---|---|---|
| `usePaletteManagerWiring.ts` (102) | 1 (App.vue) | **KEEP** | Not a relay — `emitAddColor` carries ~38 lines of colour-normalisation + dedup logic, `emitStartEdit`/`emitApply` carry retry/fallback branching. A real adapter; inlining it re-bloats App.vue. |
| `PaneSlot.vue` (45) | 3 (App.vue, ×3 slots) | **KEEP** | A genuine 3-consumer dedup of the Transition+KeepAlive+`component:is` triple-nest. Inlining re-introduces the duplication it removed. |
| `PaneSearchBar.vue` (15) | 3 SFCs | **DELETE** | A pure relay — `<SearchBar v-model :placeholder><slot/></SearchBar>`, zero logic, only renaming the model key. The 3 consumers (`BrowsePane`, `AdminPane`, `PalettesPane`) now use glass-ui `SearchBar` directly; removed from `panes/index.ts`. |
| `PaneSegmentedControl.vue` (34) | 1 (Dock.vue, post-merge) | **KEEP** | 1 consumer, but not a relay — it carries `tabOptions` + `Number`/`String` 0\|1↔string conversion. A cohesive control; inlining moves `BouncyTabs` adapter detail into Dock.vue. Orchestrator override of the "else inline" default, on the "not a pure relay" evidence rule. |
| `useDockActionBar.ts` (43) | — | **DELETE** | `DOCK_ACTION_BAR_KEY` injection symbol had **zero** consumers (invariant-33 dead) → dropped. The live `DockAction`/`DockActionBar` types moved into `usePaneRouter.ts` (its new owner). `GenericActionBar.vue`'s `DockAction` import re-pointed. |

## View-schema unification — routed to B.W3

`useViewManager.ts` (~237 lines) still owns both the view *schema* (`VIEW_MAP`) and runtime *state*. With the dual router collapsed, the remaining schema-vs-runtime split is a library-shaped cohesion concern — routed to **B.W3 Lane A** per the wave plan.

## Regression caught + fixed by the wave probe (invariant B4)

The B.W2 view-switch Playwright probe surfaced a runtime error on the Palettes view: `SortableJS: el must be an HTMLElement, not [object Text]`. Root cause — **a B.W1 regression**: B.W1 Lane A's a11y pass added a leading HTML comment before `PaletteCardGrid.vue`'s root `<div>`, making it a multi-root component; `PalettesPane`'s `useSortable` reads `PaletteCardGrid`'s `$el`, which on a fragment root resolves to the comment node, not the `<div>`. Fix: the comment moved to be the `<div>`'s first child, restoring single-root and a valid `$el`. Post-fix probe: switching to Palettes is clean (0 console errors). Committed separately as a `fix(tranche-b/w2)`.

## Runtime evidence

- `vue-tsc` **212** — unchanged by the whole transposition (no new type errors in `usePaneRouter.ts`, the merged `Dock.vue`, or `App.vue`).
- Playwright boot probe (`audit/B.W2-playwright/bw2-*.png`): 3 viewports × light+dark, **0 console errors**.
- Playwright interaction probes: dock expand + view-select + switch to Generate (the action bar "Tools" appears — the folded `useGenericActionBar` works) and to Palettes (`useSortable` clean post-fix) — **0 console errors**.
