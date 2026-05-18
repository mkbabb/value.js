# B.W3 — Component consolidation (Bγ) + hero-lab pass + UnderlineTabs migration

**Opens after**: B.W2 close.
**Agents**: 4 lanes (A — consolidations Bγ, B — hero-lab pass, C — UnderlineTabs migration, D — `--menu-min-w` exception sites if not already done in B.W2). Disjoint files. Shared tree.
**Hard gate**: 4 over-fit files deleted (DockMainLayer.vue, useDockLayers.ts, useAtmosphere.ts, useMobilePaneRouter.ts) + 1 new file (usePaneRouter.ts); useDesktopPaneRouter.ts also deleted (folded into usePaneRouter); hero-lab vue-tsc → 0 errors; 4 hero-lab RAF loops carry `prefers-reduced-motion`; `<UnderlineTabs>` consumed by PaletteDialog; `.underline-tabs` CSS rule absent from `style.css`; Playwright clean.
**Status**: planned.

## Scope

`research/Bg-component-simplification.md` (Lane A) + `research/Bα §3` and `research/Bζ §8` (Lane B) + `research/Bζ §1` and `coordination/Q.md §3` row 8 (Lane C).

### Lane A — component consolidations (Bγ)

Four merges, each a small, focused refactor. Bγ recommends per-file verdicts:

1. **Merge `DockMainLayer.vue` back into Dock.vue.** Move the `<DockLayer id="main">` block; remove the 12-prop + 5-emit interface; consolidate the duplicate inject calls; move `.action-bar-toggle-slot` scoped CSS into Dock.vue's `<style>`. Dock.vue grows ~128 → ~230 lines (still 50% below pre-W4 426 lines).
2. **Inline `useDockLayers.ts` into Dock.vue.** Move `const activeLayer = ref("main")` and the layer-dispatch `watch` directly into Dock.vue at the existing `// --- Layer dispatch ---` block. The HARDEN-4 gate (immediate watch deps as refs) is preserved by inline order. Delete `composables/useDockLayers.ts`.
3. **Inline `useAtmosphere.ts` into App.vue.** Move the 2 statements (`reactive(structuredClone(DEFAULT_AURORA_CONFIG))` + `useAurora(...)`) into App.vue's setup at the existing `// --- Aurora atmosphere ---` block. The `provide("auroraConfig", auroraConfig)` line is already in App.vue. Delete `composables/useAtmosphere.ts`.
4. **Collapse dual routers into `usePaneRouter.ts`.**
   - Create `demo/@/composables/usePaneRouter.ts`.
   - Move all 11 `defineAsyncComponent` declarations (currently duplicated across the two routers) here.
   - Implement: `usePaneRouter(viewManager, model, callbacks)` returning `{ mobile, desktopLeft, desktopRight }` each shaped `{ component, key, props }` (computeds).
   - Update App.vue: one import, one call, three destructured shapes consumed by three PaneSlots.
   - Delete `useMobilePaneRouter.ts` and `useDesktopPaneRouter.ts`.

**Sub-gate A**: 4 deletions confirmed (`git ls-files | grep -E 'DockMainLayer|useDockLayers|useAtmosphere|useMobilePaneRouter|useDesktopPaneRouter'` returns nothing); 1 new file present (`usePaneRouter.ts`); Dock.vue ≤ ~250 lines; App.vue script ≤ ~140 lines; Playwright re-probe walks 5 DockLayers and PaneSlot transitions; 0 console errors; vue-tsc count not raised.

### Lane B — hero-lab pass

`demo/hero-lab/` has 31 vue-tsc errors, 4 unguarded WebGL RAF loops, no `prefers-reduced-motion`. DESIGN.md calls it the "design exemplar." A light pass closes the gap:

1. **Card migration**. `grep -rn 'variant="pane"' demo/hero-lab/` and apply the W1-style migration if any sites use the stale prop (likely none — hero-lab predates the demo's Card usage pattern). Audit hero-lab's Card usage for tier/shadow correctness.
2. **Index-narrowing type fixes**. `HeroControls.vue` 23 errors are concentrated on `noUncheckedIndexedAccess` violations and tagged-union narrowing on `TileHeroConfig | AtmosphereHeroConfig`. Add `const cfg = props.config; if (cfg.kind === 'tile') { … } else { … }` narrowings; index access via destructuring + length check.
3. **`prefers-reduced-motion` guards** on the 4 RAF loops (`CanvasAtmosphereHero.vue`, `WebGLAtmosphereHero.vue`, `CanvasTileHero.vue`, `WebGLTileHero.vue`). Adopt the goo-blob pattern (read `matchMedia` once at init; render a single frame and stop on reduce).
4. **Decision**: does hero-lab stay? It is a separate demo (`npm run dev:hero-lab` on port 9010). DESIGN.md's claim "exemplary visual hierarchy reference" should be either honoured (it is now exemplary) or retracted (it is retired). After the pass, update DESIGN.md to reflect the actual state.

**Sub-gate B**: `npx vue-tsc --noEmit 2>&1 | grep -c 'demo/hero-lab/'` returns 0; grep confirms `prefers-reduced-motion` is honoured in each of the 4 RAF files; DESIGN.md TODO checkbox is checked or retracted.

### Lane C — `<UnderlineTabs>` structural migration

glass-ui shipped `<UnderlineTabs>` as a standalone component (not a `<Tabs variant="underline">` prop). The demo's `PaletteDialog.vue:27` currently uses `<Tabs class="underline-tabs">`. Migrate:

1. Update `PaletteDialog.vue` — import `<UnderlineTabs>` from glass-ui; replace the `<Tabs>` block with `<UnderlineTabs :options="tabs" v-model="activeTab">`; remove the `class="underline-tabs"`. Verify the surrounding `.palette-tab-content` animations still work (they may need adjustment if `<UnderlineTabs>` exposes a different DOM shape).
2. `style.css` — DELETE the `.underline-tabs` CSS rule block (`:161-167`). The marker comment goes with it.
3. Update `coordination/Q.md §3` row 67 — "shipped as standalone; B.W3 migration consumed it; `.underline-tabs` CSS retired."

**Sub-gate C**: `grep -n 'underline-tabs' demo/@/styles/style.css` returns nothing (deletion proof); `grep -rn 'underline-tabs' demo/` returns nothing; PaletteDialog tabs render correctly under Playwright; `coordination/Q.md §3` updated.

### Lane D — `--menu-min-w` exception comments (deferred from B.W2 if not done there)

Add inline rationale comments to `Dock.vue` view-select SelectContent and `GenerateControls.vue` SelectContent, per `research/Bα §46`. If B.W2 already did this in its Lane A.3, this lane is a no-op.

## File bounds

| Lane | Files |
|---|---|
| A | Dock.vue, App.vue, DockMainLayer.vue (deleted), dock/composables/useDockLayers.ts (deleted), composables/useAtmosphere.ts (deleted), composables/useMobilePaneRouter.ts (deleted), composables/useDesktopPaneRouter.ts (deleted), composables/usePaneRouter.ts (new), maybe Dock.vue's `<style>` (CSS moved from DockMainLayer) |
| B | demo/hero-lab/** |
| C | PaletteDialog.vue, style.css (delete .underline-tabs block), coordination/Q.md (row update in B.W5 prep — minor) |
| D | Dock.vue or DockViewSelect.vue (rationale comment), GenerateControls.vue (rationale comment) |

## Hard gate

1. Deletion proofs for the 4 file removals (Lane A) + the `.underline-tabs` CSS rule (Lane C).
2. `usePaneRouter.ts` present and consumed by App.vue.
3. `npx vue-tsc --noEmit 2>&1 | grep -c 'demo/hero-lab/'` returns 0.
4. Hero-lab 4 RAF loops carry `prefers-reduced-motion` (grep verifies presence; manual review confirms semantic correctness).
5. PaletteDialog tabs render as `<UnderlineTabs>` (snapshot confirms).
6. Playwright re-probe ×3 viewports light+dark — walks 5 DockLayers, opens PaletteDialog tabs, switches a few panes; 0 console errors.
7. `vue-tsc` count drops by ~31 (hero-lab); `npm test` 1409+; smoke suite green.

## Format and lint cadence

Lint per lane; gate before close.

## Verification artefacts

`audit/B.W3-consolidation.md` (Lane A, with the 4 deletion proofs + line counts), `audit/B.W3-hero-lab.md` (Lane B), `audit/B.W3-underline-tabs.md` (Lane C), `audit/B.W3-playwright/` (re-probe).

## Commit plan

4 commits, one per lane:
- `refactor(tranche-b/w3): consolidate W4 over-fits — merge DockMainLayer, inline useDockLayers/useAtmosphere, collapse dual router to usePaneRouter`
- `fix(tranche-b/w3): hero-lab pass — Card migration, index narrowing (-31 type errors), prefers-reduced-motion on 4 RAF loops`
- `refactor(tranche-b/w3): migrate PaletteDialog tabs to <UnderlineTabs>, retire .underline-tabs CSS override`
- `style(tranche-b/w3): inline rationale on --menu-min-w exception sites` (if needed)

## Dependencies

- Depends on: B.W2.
- Blocks: B.W4.
