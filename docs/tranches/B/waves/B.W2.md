# B.W2 — Component consolidation + hero-lab pass + UnderlineTabs migration

**Opens after**: B.W1 close.
**Lanes**: 3 — A (component consolidation, Bγ + the hardening-audit extension), B (hero-lab pass), C (UnderlineTabs migration). Lanes B and C are disjoint from A and from each other and run in parallel after Lane A lands its file deletions.
**Status**: planned.

> **Hardening note (2026-05-19).** This was B.W3. Renumbered (six waves → five; old B.W2 layout folded into B.W1). Lane A's scope is **expanded** by the two component-structure audit lanes — the original Bγ found 4 over-fits; the hardening audit found the consolidation is one *architectural transposition*, not 4 disconnected merges, and named a 5th confirmed merge plus a tier of evaluate-at-wave-open candidates. The old Lane D (`--menu-min-w` comments) moved to B.W1 Lane D (it was double-listed).

## Scope

`research/Bg-component-simplification.md` + the hardening audit's component lanes (recorded in `PROGRESS.md` 2026-05-19) — Lane A; `research/Bα §3` + `research/Bζ §8` — Lane B; `research/Bζ §1` + `coordination/Q.md §3` — Lane C.

### Lane A — component consolidation

**Thesis.** The demo's pane-rendering surface is over-decomposed around one root cause: App.vue's template was too dense to inline its computed chains, so layer after layer was lifted into wrappers and composables — `useDesktopPaneRouter` + `useMobilePaneRouter` (parallel codepaths, a precept §5 one-path violation), `PaneSlot.vue` (a Transition/KeepAlive wrapper), `useGenericActionBar.ts`, `DockMainLayer.vue` (a pure 12-prop/5-emit passthrough). Lifting did not *remove* the duplication — it hid it. The transposition: **one `usePaneRouter` as the single source of truth**, App.vue consuming three computed shapes, and the downstream wrappers collapsing because App.vue is no longer too dense to inline them. This is one gestalt move, executed as graded steps.

**Tier 1 — confirmed consolidations** (line-verified by the hardening audit; execute):

1. **Merge `DockMainLayer.vue` (151 lines) into Dock.vue.** Pure passthrough — 12 props forwarded, 5 emits relayed, zero local logic, duplicate `inject()` calls already available in Dock.vue. Move the `<DockLayer id="main">` block and the `.action-bar-toggle-slot` scoped CSS into Dock.vue. Dock.vue grows ~128 → ~230 lines (still ~50% below pre-W4's 426). Replace the 4 parallel `defineModel` mutex calls (`viewSelectOpen`/`mobileMenuOpen`/`profileMenuOpen`/`mbabbMenuOpen`) with a single `popupStates` reactive object.
2. **Inline `useDockLayers.ts` (37 lines) into Dock.vue.** 3 lines of logic (one `ref` + one immediate `watch`) under 16 lines of interface boilerplate. Move into Dock.vue's `// --- Layer dispatch ---` block; inline order preserves the immediate-watch-deps-as-refs contract. Delete the file.
3. **Inline `useAtmosphere.ts` (24 lines) into App.vue.** Two statements (`reactive(structuredClone(DEFAULT_AURORA_CONFIG))` + `useAurora(...)`). Move into App.vue's `// --- Aurora atmosphere ---` block; the `provide` line is already there. Delete the file.
4. **Collapse `useDesktopPaneRouter.ts` (103) + `useMobilePaneRouter.ts` (79) into `usePaneRouter.ts`.** Both `defineAsyncComponent` the same panes — duplicated component registry, parallel switch ladders. Create `usePaneRouter(viewManager, model, callbacks)` returning `{ mobile, desktopLeft, desktopRight }`, each `{ component, key, props }` computeds, with one component registry. Delete both routers.
5. **Fold `useGenericActionBar.ts` (54 lines) into `usePaneRouter`.** The hardening audit found Bγ missed this: the generic action bar is per-pane metadata wired separately from the pane component, for the same three panes the router already dispatches. Expand the router's return shape to `{ component, key, props, actionBar? }`; App.vue stops wiring two sources for one logical concern. Delete `useGenericActionBar.ts`.

**Tier 2 — evaluate at wave open** (the hardening audit's two component lanes split on these; the orchestrator decides each with file:line evidence, default toward consolidation where the file is a pure relay):

| Candidate | Lines | Audit split | Default |
|---|---|---|---|
| `usePaletteManagerWiring.ts` | 103 | "real adapter, keep" vs "pure 7-callback relay, inline" | INLINE if it carries no branching logic — a single-consumer callback bundler is contrivance |
| `PaneSlot.vue` | 45 | Transition+KeepAlive wrapper for 3 slots | INLINE once the routers flatten — App.vue can hold three slots directly |
| `PaneSearchBar.vue` | 15 | passthrough of glass-ui SearchBar + one defineModel | DELETE — use glass-ui SearchBar directly |
| `PaneSegmentedControl.vue` | 34 | thin wrapper of glass-ui BouncyTabs | KEEP if consumed at ≥2 sites (it was a W4 dedup product); else inline — verify consumer count first |
| `useDockActionBar.ts` | 43 | types + a Symbol, no logic | MERGE the type+Symbol into `color-picker/keys.ts` or the `usePaneRouter` surface |

Each Tier-2 decision is recorded in `audit/B.W2-consolidation.md` with the file:line evidence and the verdict — zero silent deferral (invariant B5).

**Routed onward**: the `useViewManager` `VIEW_MAP` schema is re-encoded three times (useViewManager + both routers); after Tier-1 step 4 the duplication is down to one router, but the schema-vs-runtime split in `useViewManager` (237 lines) is a library-shaped concern — routed to **B.W3 Lane A** (the value.js audit explicitly takes the "view-schema unification" gap).

**Tier 1b — `ui/alert/` fossil + dead `ui/` barrels (findings.md §2 N1/N2).** The A.W7 idiomatic-gestalt audit (`docs/tranches/A/audit/W7-idiomatic-gestalt.md`) found two cruft items in `demo/@/components/ui/`:

6. **`demo/@/components/ui/alert/` is a hand-rolled re-implementation**, not a generated shadcn re-export — 3 local SFCs (`Alert.vue`/`AlertTitle.vue`/`AlertDescription.vue`) + a local `alertVariants` cva, duplicating a primitive glass-ui ships (`@mkbabb/glass-ui` `Alert`/`AlertTitle`/`AlertDescription`). 2 consumers (`ColorNutritionLabel.vue`, `Markdown.vue`). Per the glass-ui-first-class precept: convert the `ui/alert/index.ts` barrel to a glass-ui re-export and delete the 3 local SFCs + the local cva; the 2 consumers' imports are unchanged (they already import from the barrel). The general "do not modify `ui/`" rule covers *generated* shadcn components — a hand-rolled fossil masquerading as one is the explicit exception. Verify the glass-ui `Alert` API shape at wave open (`coordination/Q.md §7` re-read rule); if it diverges, record and keep the fossil with a filed gap rather than half-migrate.
7. **Dead unused `ui/` barrels** — `chart`, `table`, `calendar`, and any other `ui/` subdir with zero `demo/` consumers (shadcn scaffolding never wired). Invariant-33: corpus-grep each barrel's exports across `demo/`; for every barrel with a proven-zero consumer count, delete the subdir. Record the grep proof + the deletion list in `audit/B.W2-consolidation.md`.

**Sub-gate A**: Tier-1 deletions confirmed (`git ls-files | grep -E 'DockMainLayer|useDockLayers|useAtmosphere|useMobilePaneRouter|useDesktopPaneRouter|useGenericActionBar'` returns nothing); `usePaneRouter.ts` present and consumed by App.vue; every Tier-2 candidate has a recorded verdict in `audit/B.W2-consolidation.md`; Tier-1b — `ui/alert/` is a glass-ui re-export (the 3 local SFCs + local cva deleted) or the fossil is kept with a filed gap, and the dead `ui/` barrels are deleted with the invariant-33 grep proof recorded; Dock.vue ≤ ~250 lines, App.vue script ≤ ~140 lines; Playwright re-probe walks the DockLayers + pane transitions, 0 console errors; vue-tsc not raised.

### Lane B — hero-lab pass

`demo/hero-lab/` has 31 vue-tsc errors, 4 unguarded WebGL RAF loops, no `prefers-reduced-motion`. DESIGN.md calls it the "design exemplar."

1. **Card migration** — `grep variant="pane" demo/hero-lab/`; apply the tier-API migration if any stale-prop sites exist (glass-ui's `<Card>` now dev-WARNs on stale props — invariant 31).
2. **Index-narrowing type fixes** — `HeroControls.vue`'s 23 errors are `noUncheckedIndexedAccess` + tagged-union narrowing on `TileHeroConfig | AtmosphereHeroConfig`. Add `kind`-discriminated narrowings; index access via destructuring + length check.
3. **`prefers-reduced-motion` guards** on the 4 RAF loops (`CanvasAtmosphereHero.vue`, `WebGLAtmosphereHero.vue`, `CanvasTileHero.vue`, `WebGLTileHero.vue`) — adopt the goo-blob pattern (read `matchMedia` once; render one frame and stop on reduce).
4. **Decision** — does hero-lab stay? After the pass, either honour DESIGN.md's "exemplary visual hierarchy reference" claim (it is now exemplary) or retract it (retired). Update DESIGN.md to the actual state.

**Sub-gate B**: `vue-tsc --noEmit | grep -c 'demo/hero-lab/'` returns 0; the 4 RAF files honour `prefers-reduced-motion`; DESIGN.md TODO resolved.

### Lane C — UnderlineTabs structural migration

glass-ui shipped `<UnderlineTabs>` as a standalone component (verified at Q close `4b16de7` — `coordination/Q.md §2a`), not a `<Tabs variant="underline">` prop.

1. `PaletteDialog.vue:27` — import `<UnderlineTabs>` from glass-ui; replace `<Tabs class="underline-tabs">` with `<UnderlineTabs :options="tabs" v-model="activeTab">`; verify `.palette-tab-content` animations survive the DOM-shape change.
2. `style.css` — DELETE the `.underline-tabs` rule block (`:161-167`) and its marker comment.
3. `coordination/Q.md §3` — mark the row "shipped as standalone; B.W2 migration consumed it; `.underline-tabs` CSS retired."

**Sub-gate C**: `grep underline-tabs demo/` returns nothing (deletion proof); PaletteDialog tabs render correctly under Playwright; `coordination/Q.md §3` updated.

## File bounds

| Lane | Files |
|---|---|
| A | `Dock.vue`, `App.vue`, deleted: `DockMainLayer.vue`, `useDockLayers.ts`, `useAtmosphere.ts`, `useMobilePaneRouter.ts`, `useDesktopPaneRouter.ts`, `useGenericActionBar.ts`; new: `usePaneRouter.ts`; Tier-2 files per the recorded verdicts (`PaneSlot.vue`, `PaneSearchBar.vue`, `PaneSegmentedControl.vue`, `useDockActionBar.ts`, `usePaletteManagerWiring.ts`); Tier-1b: `demo/@/components/ui/alert/` (barrel → glass-ui re-export, 3 SFCs deleted), dead `ui/` barrel subdirs (`chart`/`table`/`calendar`/… per the grep) |
| B | `demo/hero-lab/**` |
| C | `PaletteDialog.vue`, `style.css`, `coordination/Q.md` |

## Gate

Per `B.md §6`: the conjunction of sub-gates A–C plus one Playwright probe (3 viewports light+dark, walks the DockLayers, opens PaletteDialog tabs, switches panes; 0 console errors). `vue-tsc` drops by ~31 (hero-lab); `npm test` 1409+; smoke green.

## Verification artefacts

`audit/B.W2-consolidation.md` (Tier-1 deletion proofs + line counts + every Tier-2 verdict), `audit/B.W2-hero-lab.md`, `audit/B.W2-underline-tabs.md`, `audit/B.W2-playwright/`.

## Commit plan

- `refactor(tranche-b/w2): consolidate the pane-rendering surface — usePaneRouter source-of-truth, merge DockMainLayer, inline composables` (Lane A)
- `fix(tranche-b/w2): hero-lab pass — Card migration, index narrowing (-31 type errors), prefers-reduced-motion on 4 RAF loops` (Lane B)
- `refactor(tranche-b/w2): migrate PaletteDialog tabs to <UnderlineTabs>, retire .underline-tabs CSS` (Lane C)

## Dependencies

- Depends on: B.W1.
- Blocks: B.W3.
