# Bγ — Component-structure simplification

**Lane Bγ — W4 decomposition audit.** Read-only, 2026-05-18.

## §1 — Dock composables verdict

| File | Lines | Consumer(s) | Verdict |
|---|---|---|---|
| `useDockAdminMode.ts` | 73 | Dock.vue (call); type-only in DockMainLayer, DockViewSelect | **KEEP** — admin-mode + view-entries + 2 watchers is a real concern |
| `useDockLayers.ts` | 37 | Dock.vue only | **INLINE** — `const activeLayer = ref()` + 1 watch is not a composable's worth |
| `usePopupMutex.ts` | 85 | Dock.vue only | **KEEP** — swap-delay timer + `WritableComputedRef` factory is non-trivial |
| `useLayerTransition.ts` | 123 | ActionBarLayer.vue only | **KEEP** — FLIP width animation algorithm |
| `useDockActionBar.ts` | 42 | 0 runtime, 2 type-import | **KEEP as type module** — it is interface code |
| `useGenericActionBar.ts` | 54 | App.vue only | **BORDERLINE → KEEP** — inlining 54 lines of nested `computed(() => [...])` into App.vue clutters the shell |

`useDockLayers.ts` is the clear over-fit. Its entire body is "make a ref, watch it." Inlining it back into Dock.vue removes one file, one import, with zero behavioural change.

## §2 — App composables verdict

| File | Lines | Consumer(s) | Verdict |
|---|---|---|---|
| `useAtmosphere.ts` | 24 | App.vue only | **INLINE** — 2 statements |
| `usePaletteManagerWiring.ts` | 102 | App.vue only | **KEEP** — real adapter wrapping `usePaletteManager` with callback closures |
| `useDesktopPaneRouter.ts` | 103 | App.vue only | **MERGE** into `usePaneRouter` |
| `useMobilePaneRouter.ts` | 79 | App.vue + `useDesktopPaneRouter` | **MERGE** into `usePaneRouter` |

`useAtmosphere.ts` extracts two statements (`auroraConfig = reactive(structuredClone(DEFAULT_AURORA_CONFIG))` + `useAurora(...)`). Inlining them into App.vue's setup is cleaner.

## §3 — DockMainLayer.vue — MERGE back

DockMainLayer.vue is 151 lines. It receives **12 props** (every prop Dock.vue once consumed inline) and emits **5 events**. It contains **zero local logic**: every event handler is a passthrough emit, every prop is forwarded directly to `<DockLayer>` children. It duplicates the inject calls Dock.vue already has.

**Verdict**: the extraction is a near-pure forward — the abstraction adds an interface (12 props + 5 emits) without isolating any behaviour. Merging it back into Dock.vue makes the component a coherent unit and removes the prop-passing layer. Dock.vue grows ~128 → ~230 lines (still 50% below pre-W4 426).

## §4 — Dual pane router — One-Path violation

`useMobilePaneRouter.ts` and `useDesktopPaneRouter.ts` each `defineAsyncComponent` for `AboutPane`, `PalettesPane`, `BrowsePane` — the **same three components defined twice**. They share the same `useViewManager`-derived `currentConfig`. They serve "the demo's pane route table" — Ae-3 explicitly called for "one shared route table."

The legitimate parallel claim (mobile = single slot, desktop = left+right) is true at the consumer surface but does not justify two router composables. A single `usePaneRouter` returning `{ mobile, desktopLeft, desktopRight }` (each a `{component, key, props}` triple) expresses the same intent with one component registry and shared dispatch logic.

**Verdict**: One-Path violation. Collapse to `usePaneRouter.ts`.

## §5 — `<PaneSlot>` — KEEP

PaneSlot wraps `<Transition><KeepAlive :max><component :is :key v-bind /></KeepAlive></Transition>` and exposes `on-mount` callbacks. It is consumed 3× in App.vue (mobile, desktop-left, desktop-right) with the same shape. Inlining would re-create the 5-line wrapper at 3 call sites. The component is a real primitive — keep.

## §6 — `<ConfigSliderPane>` — verify, then KEEP

The W4-app-decomposition.md claim was "composes glass-ui `./configurator` ConfiguratorRow (HARDEN-4 §5.1)." Verifying the source:

- `ConfigSliderPane.vue:21` — imports `ConfiguratorRow` from `@mkbabb/glass-ui/configurator`
- `ConfigSliderPane.vue:100` — uses `<ConfiguratorRow>` for each slider entry

The claim is honest. ConfigSliderPane wraps a section header + a list of ConfiguratorRows + copy-JSON/reset dock. It is a thin demo-side composition, not a rebuild. Once AuroraPane is rewritten (W6) to consume it with real sections, BlobPane and AuroraPane share the same primitive. **KEEP — verified honest, no W4 close-honesty gap.**

## §7 — Inert wrapper sweep

- `Dock.vue:73-74` — double wrapper (`fixed pointer-events-none` outer + `pointer-events-auto` inner) — both load-bearing.
- `DockMainLayer.vue:63-87` — action-bar grid expand pattern — both divs load-bearing.
- `App.vue:25-30` — `<main aria-label>` + `<div class="pane-container">` — a11y landmark + grid container — not inert.

No remaining single-child inert wrappers found.

## §8 — Recommended B consolidations

1. **B.W3-A**: Merge `DockMainLayer.vue` → Dock.vue. Net: −1 file, +102 lines in Dock.vue, −151 in DockMainLayer.
2. **B.W3-B**: Inline `useDockLayers.ts` → Dock.vue. Net: −1 file, +6 lines in Dock.vue.
3. **B.W3-C**: Inline `useAtmosphere.ts` → App.vue. Net: −1 file, +3 lines in App.vue.
4. **B.W3-D**: Collapse `useDesktopPaneRouter.ts` + `useMobilePaneRouter.ts` → `usePaneRouter.ts`. Net: −1 file (2→1); one shared component-import block; one dispatch function family; App.vue's two imports → one.

**Total**: −4 files, +1 file (usePaneRouter), zero behaviour change. The dock and App.vue stay well below their pre-W4 god-module sizes.

## §9 — What W4 got right

The W4 decomposition wasn't wrong in spirit — it correctly identified the god-module pattern and applied structural relief. The over-fits (DockMainLayer, useDockLayers, useAtmosphere) are real but small; the One-Path violation (dual router) is the most significant. The composables that should stay (`useDockAdminMode`, `usePopupMutex`, `useLayerTransition`, `usePaletteManagerWiring`, `useGenericActionBar`) carry genuine algorithmic content. The PaneSlot and ConfigSliderPane primitives are honest abstractions consumed in multiple places.

**Net assessment**: W4 over-decomposed by 4 files out of ~9 created. Tranche B's consolidation pass is small and surgical — not a re-litigation of the wave.
