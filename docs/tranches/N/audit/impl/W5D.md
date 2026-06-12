# N.W5.D — Dock adoptions (`useLayerTransition` + `DockSeparator`)

**Lane**: W5.D — dock adoptions. **Ownership**: `demo/**` dock surfaces only.
**Status**: GREEN. All four gates pass.

Adopts two glass-ui `/dock` surfaces the demo was still forking: the
`useLayerTransition` composable (a ~108-LoC local CSS-width fork) and the raw
`dock-separator` `<div>` sites (13, across 7 files) → the shipped `<DockSeparator>`
component. Every symbol resolved from
`node_modules/@mkbabb/glass-ui/dist/components/custom/dock/` (dist verified healthy:
551 `.d.ts`, `styles/segmented-tabs.css` present).

---

## 1 — `useLayerTransition`: local fork → upstream

### What died

`demo/@/components/custom/dock/composables/useLayerTransition.ts` (the ~108-LoC
"Local fork") is **deleted**. Its sole importer was
`layers/ActionBarLayer.vue:9` (the action-bar's actions↔input sub-layer swap). No
other importer existed (grep-verified).

### Mechanism delta (the documented behavior change)

| | Local fork (deleted) | Upstream `@mkbabb/glass-ui/dock` |
|---|---|---|
| **Animation engine** | CSS-width FLIP: capture `getBoundingClientRect().width`, pin inline `el.style.width`, `nextTick` re-measure natural width, `requestAnimationFrame` to the to-width, `transitionend(width)` (or a 400 ms `setTimeout` fallback) clears the pin | **ONE analytic spring ODE.** A normalized progress scalar (0→1) is written once per frame to `--dock-morph-t` on the `.glass-dock` root; every animated axis (inline-size, padding, radius, scale, color, child stagger) is a pure `calc()` read off that scalar in `dock.css`/`layers.css`. FLIP measures from→to **once** per swap into `--dock-morph-from`/`--dock-morph-to` px vars; the live scalar interpolates between them. `[data-morphing]` gates the morph styles; `overflow:clip` makes the box the reveal aperture |
| **Interruptibility** | None — a mid-flight re-toggle restarts the width transition from the current (CSS-interpolated) width with no velocity carry; the 400 ms cleanup timer can fight a fast re-swap | **Velocity-continuity**: a re-toggle mid-flight re-bases the live solver onto the new span *from its current velocity* (the analytic re-seat) — inertia carries, no snap-from-rest. Universal across engines (iOS interruptible-physics is not capability-gated) |
| **Spring constant** | n/a (linear `transition` per `dock.css`) | published `--spring-dock` (response 0.32, ζ 0.7, ≈+4.6% overshoot), the same analytic ODE the build-time `linear()` token samples |
| **Determinism** | frame depends on wall-clock + the browser's transition timing | a frame captured at a given `--dock-morph-t` is byte-reproducible (the dock owns its own clock via `SpringProgress.play(onFrame)`) |

**Net visible delta**: the actions↔input sub-layer swap now eases on the dock's
springy morph (a slight overshoot + interruptible re-target) instead of a flat
CSS-width tween. This is the *same* engine the outer collapse↔expand morph already
rides, so the sub-layer swap and the dock morph now read as one motion language
(previously the sub-layer used an independent linear width tween — a subtle
incongruence the consolidation removes).

### The `layerProps()` adapter decision

The fork exposed a `layerProps(id) → { class, inert }` helper that upstream **does
not ship**. Upstream exposes the two raw refs — `currentLayer` (post-swap) and
`leavingLayer` (fading-out, or `null`) — plus `onTransitionEnd`.

I authored a **minimal consumer-side `subLayerProps(id)`** (7 LoC) in
`ActionBarLayer.vue` that derives `{ class, inert }` from those two refs. This is
**not** a shim preserving an old shape for its own sake — it is the *exact* binding
glass-ui's own `DockLayerGroup` applies to its layer panes (verified in the dist:
`class: ["dock-layer", { "is-active": …, "is-leaving": … }]`, `inert: r ? void 0 :
!0`). The helper exists only because the consumer template has **two** call sites
(`subLayerProps('actions')` and `subLayerProps('input')`) bound via `v-bind`, so
inlining the per-id computation twice in the template would be noisier than the
named helper. It packages upstream's documented refs into the consumer's idiom; it
does not re-introduce the fork's API surface. (The fork's `layerProps` carried the
*algorithm* too — that algorithm is gone; only the trivial class/inert projection of
upstream's refs remains.)

The container/layer **CSS contract** is fully supplied by glass-ui's
`@import "@mkbabb/glass-ui/styles.css"`: `.dock-layer-grid`, `.dock-layer`,
`.is-active`/`.is-leaving`, and the `[data-morphing]` + `--dock-morph-*` wiring all
live in `dist/styles/dock/layers.css`. No local dock-layer CSS existed to delete
(the fork drove inline `el.style.width`, not a stylesheet). The sub-layer grid sits
**inside** a `GlassDock`, so the `.glass-dock[data-morphing]` morph gating applies.

`axis`/`directionTypes` are optional upstream and omitted — the single symmetric
spring runs the inline axis by default, matching the fork's horizontal width morph.

**Files**: deleted `composables/useLayerTransition.ts`; rewired
`layers/ActionBarLayer.vue` (import + the 7-LoC adapter + the swap `<div>`).

---

## 2 — `DockSeparator`: raw divs → component (fresh census)

**Fresh grep census** (`class="dock-separator"`): **13 sites across 7 files** (the
ledger's earlier "13" held; W5.A/B/C did not shift the dock-separator footprint).
All 13 replaced with `<DockSeparator />`:

| File | Sites | Notes |
|---|---|---|
| `dock/Dock.vue` | 5 | 2 carried `lg:hidden` → preserved as `class="lg:hidden"` on the component; 1 was a `v-if="hasAnyActionBar"` div → `<DockSeparator v-if="hasAnyActionBar" />` |
| `dock/layers/ActionBarLayer.vue` | 1 | |
| `dock/layers/SlugEditLayer.vue` | 1 | |
| `dock/menus/ProfileSection.vue` | 2 | new `@mkbabb/glass-ui/dock` import added |
| `mix/MixResultDisplay.vue` | 1 | not in a dock context (see §3) |
| `image-palette-extractor/ExtractControls.vue` | 2 | not in a dock context |
| `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` | 1 | not in a dock context |

`DockSeparator` (verified in `dist/dock.js`) takes **no props**; it renders
`<div class="dock-separator" role="separator" data-orientation aria-orientation>`,
deriving orientation via `useOptionalDockContext()` (fallback `"horizontal"`). The
replacement is a structural + **a11y improvement** (the prior bare divs carried no
`role`/`aria-orientation`); the visual is byte-identical because the `.dock-separator`
class rule is the same one glass-ui already ships and the demo already imports
(`dist/styles/dock/layer-group.css`).

### §3 — The rail opt-out: where it actually lives

The lane brief asked to "document the rail opt-out where the design wants a separator
sans rail." Resolving against the d.ts: **there is no rail concept on
`DockSeparator`** — it has no props at all. The rail is a **`DockLayerGroup`**
feature, gated by its **`showRail?: boolean`** prop (default `true`; with
`railPosition?: "start" | "end"`). `DockLayerGroup` renders "an optional Figma-style
switcher rail built from each child's metadata" (its d.ts), which is *hidden when
there is 0 or 1 layer*.

The demo's design wants the dock's layer panes (`mobile-edit` / `slug-edit` /
`action-bar` / `main`) to morph **without** the switcher rail. That opt-out is
**already correctly wired** at `Dock.vue:94`:

```vue
<DockLayerGroup v-model:active="activeLayer" :show-rail="false">
```

So the "separator sans rail" intent is satisfied by `:show-rail="false"` on
`DockLayerGroup` — not by anything on `DockSeparator`. The ledger §3's
`:show-rail=false` note was anticipating exactly this prop; the actual prop name from
the d.ts is **`showRail`** (kebab `show-rail` in template). No change needed; documented
here per the lane requirement. (The richer hairline-borne carousel rail is the
separate `<DockRail>` component with `extent`/`position`/`items`/`icon`/`iconLabel` —
unused by the demo and out of scope.)

---

## Gates

| Gate | Result |
|---|---|
| `npm run typecheck` | **0** (both `tsconfig.lib.json` + `tsconfig.demo.json`, exit 0) |
| `npm run lint` | **0** (`eslint . --max-warnings=0`, exit 0) |
| `npm run boot-smoke` | **PASS** — demo mounted, console clean, cold dep-optimizer cache |
| raw `dock-separator` divs | **0** (`grep class="dock-separator"` → no matches) |

glass-ui dist health re-verified before the typecheck gate (551 `.d.ts`,
`segmented-tabs.css` present); no rebuild was needed (no flap occurred during the lane).

## Files touched

- `demo/@/components/custom/dock/composables/useLayerTransition.ts` — **DELETED**
- `demo/@/components/custom/dock/layers/ActionBarLayer.vue` — upstream `useLayerTransition` + 7-LoC adapter + `<DockSeparator>`
- `demo/@/components/custom/dock/Dock.vue` — `<DockSeparator>` ×5 (import + sites)
- `demo/@/components/custom/dock/layers/SlugEditLayer.vue` — `<DockSeparator>` ×1
- `demo/@/components/custom/dock/menus/ProfileSection.vue` — `<DockSeparator>` ×2 (new import)
- `demo/@/components/custom/mix/MixResultDisplay.vue` — `<DockSeparator>` ×1
- `demo/@/components/custom/image-palette-extractor/ExtractControls.vue` — `<DockSeparator>` ×2
- `demo/@/components/custom/image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` — `<DockSeparator>` ×1
