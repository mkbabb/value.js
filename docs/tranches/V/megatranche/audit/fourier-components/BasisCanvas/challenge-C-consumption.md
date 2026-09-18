claude-opus-5[1m] (served model id)

# CHALLENGE — `BasisCanvas.vue` · AXIS C · CONSUMPTION

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisCanvas.vue` (547 lines).
**Axis.** How this component consumes value.js 0.13.0, keyframes.js 4.3.0, glass-ui 4.0.0, and the 45-operation fourier API; props/emits contract quality; integration seams.
**Method.** Static + source-derived only, over the component whole plus its complete transitive import set (below) and the corresponding API models. No browser tooling; livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Stance.** The component was assumed DEFECTIVE until the tree proved otherwise. Every claim below — defect and superlative alike (L-18 runs both ways) — carries severity, `file:line` provenance, and the falsifier that would kill it.

**Read set (read-only).** `BasisCanvas.vue`; `web/src/lib/{bases,evaluators,colors,golden-shimmer,types,defaults,api}.ts`; `web/src/stores/{workspace,animation}.ts`; `web/src/components/visualization/lib/basis-display.ts`; `.../lib/canvas-drawing/{index,types,transforms,grid,ghost-path,trail,labels,placeholder,epicycles}.ts`; `.../composables/{useCanvasSetup,useCanvasHover,useImageOverlay,useViewTransform,useWorkspaceLoader}.ts`; consumers `VisualizationView.vue`, `FullscreenViewer.vue`, `ExportModal.vue`; `web/src/{App.vue,style.css,package.json,package-lock.json,tsconfig.json}`; `web/node_modules/@mkbabb/{value.js,keyframes.js,glass-ui}` (published typings + dist + token CSS); `api/models/{visualization,shared}.py`, `api/routers/{images,contours}.py`, `api/services/computation.py`, `api/main.py`, `src/fourier_analysis/bases_evaluation.py`, `nginx/fourier.conf`, `web/Dockerfile`, `docker-compose.prod.yml`.

**Tally.** 18 findings (2 BLOCKER · 7 MAJOR · 7 MINOR · 2 INFO) + 5 superlatives.

**Hitherto corpus folded, not re-invented.** The 45-operation figure, the `client↔operation` non-isolability lesson (`R6-8`, ADOPT-AS-FACT → F.W5), and the "2 clients without an operation" census row are taken as established from `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` §0/§4/§6 and `formation/fourier/CENSUS-2026-08-03.md`. C-5, C-7 and C-18 below are the BasisCanvas-local instances of `R6-8`'s general finding; C-18 names the specific pair behind the census's "2 clients without an operation". No corpus row is contradicted by this lane.

---

## The one-paragraph verdict

BasisCanvas imports nothing from value.js, nothing from keyframes.js, and nothing from glass-ui — while its every visual decision routes through a 117-line hand-rolled color arm (`web/src/lib/colors.ts`) that **cannot parse the design system's own tokens**, two hand-rolled rAF easing loops that duplicate keyframes primitives already in the dependency graph, and a stringly-typed export contract that silently discards half of what its sibling modal emits. The component's *internal* engineering is genuinely good — the memoized bbox, the single-pass epicycle chain, the reference-counted visibility credit and the A/B watcher split are all careful, documented, correct work (S-1…S-5). The defects are almost entirely at the **seams**: what it consumes, and what it fails to consume.

---

## BLOCKERS

### C-1 · BLOCKER · `VIZ_COLORS` can never resolve glass-ui's `--viz-*` tokens; every basis color the canvas draws collapses to the `#888888` sentinel

`web/src/lib/colors.ts:22-54` resolves a CSS custom property through exactly four regex arms — leading `#` (`:29`), `hsl(...)` (`:32-37`), a bare Tailwind HSL triplet (`:40-43`), `rgb(...)` (`:46-51`) — and falls through to `return "#888888"` at `:53`.

glass-ui 4.0.0 declares `--viz-fourier` in **oklch on every arm**:

- `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263` — `--viz-fourier: oklch(0.579 0.201 30.4);`
- `.../tokens/dark-arm.css:113` — `--viz-fourier: oklch(0.693 0.151 28.1);`
- `.../tokens/light-dark.css:145` — `--viz-fourier: light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1));`

`--viz-chebyshev` and `--viz-legendre` are the same at `light-dark.css:146-147`. `App.vue:10-18` calls `resolveVizColors()` on mount and again on every `.dark` class mutation; `colors.ts:90-96` writes the result into `VIZ_COLORS.fourier / .chebyshev / .legendre / .amber / .green`.

**So `resolveVizColors()` actively degrades the palette.** `VIZ_COLORS.fourier` is seeded with the literal `#bf4040` (`colors.ts:78`) and is overwritten with `#888888` the moment `App` mounts. The consumers of that value are the canvas's primary marks:

| mark | site | paints |
|---|---|---|
| epicycle trail (both modes) | `BasisCanvas.vue:127`, `:326` | `#888888` |
| dashed tip→trace connector | `canvas-drawing/epicycles.ts:258` | `rgba(136,136,136,0.25)` |
| pulsing tip glow | `canvas-drawing/epicycles.ts:283` | `rgba(136,136,136,~0.25)` |
| epicycle-only label | `canvas-drawing/labels.ts:89` | `#888888` |

Mid-grey — the same family as the grid (`rgba(150,150,150,0.09)`, `grid.ts:29`) and the ghost path (`rgba(150,150,150,0.2/0.25)`, `ghost-path.ts:18`). The figure's signal and its chrome converge.

**Falsifier (survived).** A `--viz-fourier` re-declaration in fourier's own CSS, in a form the arm parses, winning the cascade. `grep -rn -- "--viz-fourier:" web/src` → **zero**. The *only* local `--viz-*` override is `--viz-amber` at `style.css:120` / `:125`, written `hsl(35 76% 35%)` / `hsl(37 73% 67%)` — which the `hsl(...)` arm **does** parse. The one token fourier happened to re-declare resolves correctly; the three basis tokens do not. That is corroboration, not refutation.

**Second falsifier (survived).** If `--viz-*` were `@property`-registered with `syntax: "<color>"`, `getComputedStyle().getPropertyValue()` would return a *resolved* color and the arm's `rgb(...)` branch might catch it. glass-ui states the opposite as binding discipline at `light-dark.css:52-56`: "these tokens **MUST** stay UNREGISTERED … glass-ui's only `@property` registrations (§18) are non-color". Verified in `tokens/property-regs.css`: the registrations are `--progress-crescendo` (`:38`), `--phase-tint-amount` (`:44`), `--specular-{x,y,intensity}` (`:76,82,88`), `--glass-level` (`:111`), `--ui-scale` (`:126`). No color property is registered.

**`UNPROVEN-NEEDS-LIVE` (SS-13).** Which exact string `getPropertyValue("--viz-fourier")` returns — `light-dark(oklch(…), oklch(…))` under the `@supports` arm, or bare `oklch(…)` under the fallback floor. Immaterial to the finding: **both** candidate strings fail all four regex arms, so `"#888888"` is returned either way. What needs a live probe is only the *visual* magnitude.

**The cure is already installed, twice.** value.js 0.13.0 exports `parseCSSColor` / `CSSColor` (`node_modules/@mkbabb/value.js/dist/index.d.ts`, from `./parsing/color`) and the whole `Color` space family. glass-ui 4.0.0 exports, from `@mkbabb/glass-ui/color` (`dist/composables/color/index.d.ts`), `cssToOklch` (`:63`) — documented verbatim as "Resolve any CSS color string to an OKLCh stop via value.js's parser — **the single canonical core (inv-K-2)**. DOM-free" — plus `oklchStopToHex` (`:65`) and `defaultBlobColorResolver` (`:73`). `cssVarToHex`'s entire body is `oklchStopToHex(cssToOklch(raw))`.

**Two caveats the repair wave must carry, not gloss.** (a) `cssToOklch` **throws** on invalid input (`index.d.ts:59-62`) and does not itself resolve `light-dark()`; the token must first be read as a *used* value (a probe element's resolved `color`, or the 1×1-canvas resolver) before any parser sees it. (b) value.js's own parser-proof gate records **R1: a live `parseCssColor("oklch()")` shipping crash** (`apotheosis/parser-proof/GATE-VERDICT.md`) — pointing fourier straight at value.js's parser inherits that. glass-ui's `cssToOklch` wrapper is the safer target of the two.

---

### C-2 · BLOCKER · `exportFrame` silently discards two of `ExportModal`'s four toggles, and never draws the image overlay

`ExportModal.vue:35-42` emits four flags:

```
withEpicycles: props.hasEpicycles && withEpicycles.value,
withTrail:     withTrail.value,
withGrid:      withGrid.value,
withLabels:    withLabels.value,
```

`BasisCanvas.vue:466-469` destructures **two**:

```
const { withGrid: showGrid = true, withLabels: showLabels = true } = options;
```

`withEpicycles` and `withTrail` appear nowhere else in the file. The "Epicycles" and "Trace path" switches (`ExportModal.vue:55-62`) are inert: flipping either changes nothing in the produced PNG. The signature `exportFrame(options: Record<string, boolean> = {})` (`BasisCanvas.vue:462`) is precisely the hole this fell through — a shared typed `ExportOptions` interface would have made the drop a compile error under `strict: true` (`web/tsconfig.json`).

**Second half.** `drawFrame` draws the overlay at `BasisCanvas.vue:105-107` when `props.showImageOverlay` is set. `exportFrame`'s own draw block (`:482-501`) calls `drawGrid`, then `drawEpicycleFrame` or `drawMultiBasesFrame` — and **never** `drawImageOverlay`. The exported frame omits the reference image the user is looking at. `grep -n "drawImageOverlay" BasisCanvas.vue` → `:81` (composable destructure), `:515` (defineExpose). Never inside `exportFrame`.

**Falsifier (survived).** `grep -n "withEpicycles\|withTrail" web/src/components/visualization/BasisCanvas.vue` → zero hits.

**Aggravating.** `FullscreenViewer.vue:138` invokes `canvasComponent?.exportFrame()` with **no argument at all**, so from the fullscreen path every option silently defaults to `true` — a second, undeclared export contract for the same component.

---

## MAJOR

### C-3 · MAJOR · `basisDisplay` freezes `VIZ_COLORS` at module-evaluation, so the same basis paints two different colors in the same frame

`components/visualization/lib/basis-display.ts:1-7` copies `VIZ_COLORS.fourier` — a *string* — into a plain object literal at import time, which is strictly before `App.vue:11`'s `resolveVizColors()` ever runs. `VIZ_COLORS` is `reactive()` (`colors.ts:77`) and mutated in place (`colors.ts:91-95`); the copied string never updates.

Divergent consumers, same component:

- `BasisCanvas.vue:257` — `ctx.strokeStyle = isHovered ? VIZ_COLORS.golden : cfg.color` → **frozen** `#bf4040`
- `BasisCanvas.vue:127` / `:326` — `VIZ_COLORS.fourier` → **live** (and, per C-1, `#888888`)
- `labels.ts:39` (frozen) vs `labels.ts:89` (live)

Composed with C-1: in multi-basis mode the fourier **curve** strokes stale crimson while the fourier **trail** strokes grey, in the same `drawMultiBasesFrame` pass.

**Falsifier (survived).** A getter, `computed`, or a `resolveVizColors` that also rewrote `basisDisplay`. `basis-display.ts` is seven lines with no reactivity, and `grep -n "basisDisplay" web/src/lib/colors.ts` → zero.

### C-4 · MAJOR · the canvas holds no reactive dependency on `VIZ_COLORS`, so a theme toggle never repaints a paused or off-screen canvas

Every `VIZ_COLORS` read sits inside `drawFrame` / `drawEpicycleFrame` / `drawMultiBasesFrame`, which execute only from `watch` callbacks (`BasisCanvas.vue:378-423`) and from rAF callbacks (`useCanvasHover.ts:52-75`). Reads inside a watcher callback are **not** tracked as dependencies, and there is no watcher whose source mentions `VIZ_COLORS`.

`App.vue:13`'s `MutationObserver` therefore updates the palette while the canvas keeps its old pixels until `anim.t` next changes. That wait is unbounded whenever `anim.playing` is false (`animation.ts:90-94` cancels the rAF) or the canvas is off-screen (`animation.ts:99-106` parks the clock).

**Falsifier (survived).** `grep -n "VIZ_COLORS" BasisCanvas.vue` → `6, 127, 172, 257, 261, 326`. All inside draw functions; none in a `watch` source array.

**Note the interaction.** C-1 currently masks this — with every basis token collapsing to `#888888` in both themes there is nothing to repaint. Curing C-1 without curing C-4 makes the staleness newly visible. Ship them together.

### C-5 · MAJOR · the multi-basis path re-derives the server's `partial_sums` operation on the main thread: ~160k transcendentals per frame

`BasisCanvas.vue:300-312` — when `basesData` is null, `epicycleData` is present, and two or more bases are active, the component falls back to client-side evaluation at `nEval = 800` samples **per frame**:

```
const nTerms = Math.min(level, components.length);
const nEval = 800;
for (let i = 0; i <= nEval; i++) { … evaluateFourier(components, tEval, nTerms) … }
```

`evaluateFourier` (`lib/evaluators.ts:9-26`) is O(nTerms) with one `Math.cos` and one `Math.sin` per term. `level` climbs to `Math.ceil(anim.easedT * components.length)` (`BasisCanvas.vue:239`), and the default harmonic count is 200 (`lib/defaults.ts:7`, `n_harmonics: 200`). Worst case per rendered frame: **801 × 200 = 160,200 iterations, 320,400 transcendental calls** — inside the same rAF tick that also runs the epicycle pass, the trail, the grid and the labels.

**Reachability (falsifier survived).** The branch needs `props.activeBases.length > 1` (routing at `:110-116`; `onlyEpicycles` requires length === 1) **and** `basesData == null`. `computeEpicycles` and `computeBases` are separate async operations (`stores/workspace.ts:285-337`) and the auto-play watcher starts the clock as soon as **either** lands (`useWorkspaceLoader.ts:99-122`, `{ immediate: true }`). The window is the ordinary "user added a second basis and the bases job hasn't returned" state, not a corner. Line `:96` returns early only when *both* payloads are null.

This is the BasisCanvas instance of the corpus's `R6-8` lesson (`lane-fourier-r3-r6.md` §4, ADOPT-AS-FACT): a client leaf that re-implements a server operation, with no shared identity by which a divergence between the two could be attributed to either side.

### C-6 · MAJOR · `AnimationSettings` is a three-way-divergent contract, and `max_circles` never reaches the renderer at all

| field | server `api/models/shared.py:65-71` | client `web/src/lib/defaults.ts:18-25` | value actually rendered |
|---|---|---|---|
| `fps` | `30` | `60` | **never read** |
| `duration` | `30.0` | `5000` | `animation.ts:23` → `ref(20000)` |
| `max_circles` | `80` | `100` | `BasisCanvas.vue:47` → literal `ref(80)` |
| `easing` | `"sine"` | `"sine"` | seeded ✓ (`useWorkspaceLoader.ts:56`) |
| `speed` | `1.0` | `1` | seeded ✓ (`useWorkspaceLoader.ts:57`) |

`BasisCanvas.vue:47` is `const maxCircles = ref(80)` and is never assigned again — `grep -rn "maxCircles" web/src` → `BasisCanvas.vue:47, :135, :321` plus the unrelated parameter name in `lib/bases.ts:30,35`. `useWorkspaceLoader.ts:50-60` seeds only `active_bases`, `easing`, `speed`; `VisualizationView.vue:54-62` writes back only those three.

So `fps`, `duration` and `max_circles` are faithfully round-tripped — into the IndexedDB draft (`workspace.ts:99`), into `POST /visualizations` (`workspace.ts:356`, `animation_settings: toRaw(...)`), and back out of `loadVisualization` (`workspace.ts:217-220`) — and read by **nobody**. Two consequences: a client-created visualization persists `max_circles: 100` while rendering 80 (the renderer accidentally matches the *server* default and diverges from its own client default), and `duration` disagrees with itself in **units** across the seam (30.0 reads as seconds, 5000 and 20000 as ms).

**Falsifier (survived).** `grep -rn "max_circles" web/src` → `lib/types.ts:47` (declaration), `lib/defaults.ts:21` (default). No consumer.

### C-7 · MAJOR · two `AnimationData` types share one name and one field name with incompatible shapes — and the server model's docstring names `BasisCanvas.vue` as its consumer

**Server, the converged entity's embedded state** — `api/models/visualization.py:64-78`:

```python
class AnimationData(BaseModel):
    active_bases: list[str]
    n_harmonics: int
    partial_sums: dict[str, Point2D]   # Point2D = {x: float, y: float}   (:55-61)
```

Its docstring (`:65-72`) reads: *"Precomputed partial-sum trajectories the renderer consumes per rAF … The consumer-side `BasisCanvas.vue` drops its `(sumsForBasis as any)?.[level]` cast in favour of typed bracket access over `Record<string, {x, y}>`."*

**Client** — `web/src/lib/types.ts:14-20`:

```ts
export interface AnimationData {
    original: { x: number[]; y: number[] };
    decompositions: Record<string, BasisDecomposition>;
    partial_sums: Record<string, Record<number, { x: number[]; y: number[] }>>;
    eval_points: number[];
    levels: number[];
}
```

Server: **two** levels of nesting, terminal value a scalar point. Client: **three** levels, terminal value a pair of polylines. `BasisCanvas.vue:278-287` requires the client shape (`sumLo.x.length`, `sumLo.x[i]`, `sumHi.x[i]`) — a `Point2D` cannot satisfy it. And the component's own inline comment at `:271-273` cites the **server** row as its authority: *"`partial_sums` is typed `Record<number, {x,y}>` per the W1-ratified SCHEMA.md row"*.

The client shape is the *compute endpoint's*, not the entity's: `src/fourier_analysis/bases_evaluation.py:134-166` builds `dict[str, dict[int, dict[str, list[float]]]]`, returned through `api/services/computation.py:132-146` and `api/routers/contours.py:56-76`. So the live path is coherent; the **entity model** is the outlier, and both sides document the mismatch as agreement.

Compounding: `Visualization.animation_data: AnimationData | None` exists at `api/models/visualization.py:130`, but the client's mirror `Visualization` interface (`web/src/lib/types.ts:207-239`) and `VisualizationCreate` (`:241-252`) **omit the field entirely**.

**Falsifier (survived, and it is what caps the severity).** If `loadVisualization` consumed `animation_data`, the shape clash would be a live crash. `workspace.ts:197-232` reads `viz.slug`, `viz.image_slug`, `viz.contour_settings`, `viz.animation_settings`, `viz.contour_hash` — never `animation_data`; and `saveVisualization` (`:347-357`) never sends it. The field is written by nobody and read by nobody, so this is MAJOR (a documented, load-bearing-looking contract that is false in both directions) rather than BLOCKER. It is a direct trap for the F.W5 shared-provenance contract that `R6-8` was adopted to constrain.

### C-8 · MAJOR · glass-ui 4.0.0's declared `@mkbabb/value.js` peer range excludes the installed 0.13.0

`web/package-lock.json` records `node_modules/@mkbabb/glass-ui` at `4.0.0` with `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`, while `node_modules/@mkbabb/value.js` resolves to `0.13.0`. `0.13.0` satisfies neither range. `find web/node_modules -type d -name "value.js"` → exactly **one** directory: the hoisted 0.13.0.

The coupling is live, not nominal — glass-ui's color arm imports value.js at runtime:

- `dist/color-DweYl7pE.js:1` — `import { colorUnit2, gamutMapOKLab, interpolateHue, isInSRGBGamut, oklabToLinearSRGB, oklabToRgb255, parseCSSColor, rawOklabToOklch, rawOklchToOklab, srgbToOKLab } from "@mkbabb/value.js"`
- `dist/aurora.js:1` — `interpolateHue`, `rawOklabToOklch`, `srgbToOKLab`
- `dist/motion-curves.js` — the `easeInOut*` / `linear` family

So the design system's entire OKLCh pipeline executes against a value.js two minors outside its declared support window. By contrast keyframes.js 4.3.0 declares `"@mkbabb/value.js": "^0.13.0"` as a hard **dependency** (its `package.json`) — satisfied and current. The unsatisfied pin is glass-ui's alone.

**Falsifier (survived).** A nested `glass-ui/node_modules/@mkbabb/value.js` at 0.11.x would isolate the skew. There is none.

**`UNPROVEN-NEEDS-LIVE`.** Whether any of the ten imported symbols changed signature or semantics between 0.11 and 0.13 — resolvable statically against the two published typings, but the 0.11 tarball is not in this tree.

### C-9 · MAJOR · the off-screen rAF gate does not do what its own comment claims: fullscreen never parks the inline canvas

`stores/animation.ts:36-42`: *"Park the shared animation clock when this canvas is scrolled out of the viewport **or hidden behind the fullscreen layer**."* `BasisCanvas.vue:442-450` implements it as `new IntersectionObserver(cb, { threshold: 0 })` against the default (viewport) root.

`IntersectionObserver` reports **geometric viewport intersection**. It does not model occlusion. When `showFullscreen` flips true, `VisualizationView.vue:282` mounts `FullscreenViewer`, which teleports a **second** `BasisCanvas` (`FullscreenViewer.vue:105` `<Teleport to="body">`, `:121-127`) over the top. The inline canvas keeps its full rect: the only hiding rule is `VisualizationView.vue:404-409`, which applies `.is-hidden` **only** when `isEditing && store.contour`, and even then sets `opacity: 0` + `z-index: 0` + `pointer-events: none` — never `display: none`. An `opacity: 0` element still intersects.

Result: `visibleCanvases` reaches 2 (`animation.ts:99-106`), the gate reports `anyCanvasVisible`, and **both** canvases run the full `drawFrame` at 60 fps. With C-5's fallback live, that is two 160k-trig passes per frame.

**Falsifier (survived).** `display: none`, `content-visibility: hidden`, or an unmount on the inline canvas would zero its rect. `grep -n "is-hidden" VisualizationView.vue` → `:404-409`, opacity only; the `<BasisCanvas>` at `:199` has no `v-if`.

The *mechanism* is otherwise sound — see S-3. It is the prose that overclaims, which is worse than silence, because it retires a real optimisation from the backlog.

---

## MINOR

### C-10 · MINOR · asymmetric optional chaining on `partial_sums`: the non-fourier branch throws where the fourier branch is guarded

`BasisCanvas.vue:268-270`:

```ts
const sumsForBasis = basisName === "fourier"
    ? basesData?.partial_sums?.fourier      // double-guarded
    : basesData?.partial_sums[basisName];   // single-guarded
```

`types.ts:17` declares `partial_sums` non-optional, so the `?.` on the fourier branch is *documenting a doubt the type does not carry*. If a `basesData` ever lands without the key, chebyshev/legendre raises a `TypeError` inside the render loop and kills the frame; fourier degrades to the `:300` fallback.

**Falsifier (partially survived — this is why it is MINOR).** The compute service always writes all three keys (`bases_evaluation.py:137`, `:152-153`) and `markRaw(result)` (`workspace.ts:328`) passes the body through unmodified, so the throw is unreachable via the compute path *today*. It becomes reachable the moment `basesData` is fed from the persisted `animation_data` (C-7), from `compute_cache` (`routers/contours.py:59-66`, which replays whatever it stored), or from a migrated document. Latent, not live — but the guard asymmetry means the two paths would fail differently, which is the harder bug.

### C-11 · MINOR · the hover-scale ease is frame-rate dependent, and keyframes.js 4.3.0 — already a dependency — ships the primitive it hand-rolls

`composables/useCanvasHover.ts:52-63`:

```ts
const diff = targetScale - currentScale;
if (Math.abs(diff) < 0.002) { currentScale = targetScale; … return; }
currentScale += diff * 0.12;
hoverAnimFrame = requestAnimationFrame(updateHoverScale);
```

A per-**frame** geometric decay, not a per-**time** one. `updateHoverScale` takes no timestamp and consults no clock. The 0.38 → 0.55 grow (`epicycles.ts:7-8`) therefore completes in roughly half the wall-clock time on a 120 Hz display that it takes at 60 Hz, and crawls on a throttled tab. The shimmer loop beside it (`:67-82`) is a second hand-rolled rAF.

keyframes.js 4.3.0 exports `NumericAnimation`, `RAFPlayback`, `decay`, `decayRest`, `probeVelocity`, `reseatToSpring`, `reducedMotionScale` and `resolveEasing` (`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts`) — the exact scalar-tween family this reimplements, including the reduced-motion hook these two loops do not honour at all. `stores/animation.ts:47-50` records that the `Animation` import was deliberately excised as dead substrate; that excision was correct for the dead graph, but the two **live** hand-rolled loops were never revisited in the same pass.

**Falsifier.** A `dt`-normalized step would kill this. There is none.

### C-12 · MINOR · `withLabels: false` punches a fixed 200×100 transparent hole through the export

`BasisCanvas.vue:498-500`:

```ts
if (!showLabels) { offCtx.clearRect(0, 0, 200, 100); }
```

Executed **after** the full draw. `clearRect` does not repaint background — it erases to transparent — so the grid (`grid.ts:31-44`, drawn full-canvas) and any curve crossing the top-left corner are erased along with the labels, leaving a transparent rectangle in the PNG.

It also under-covers. Labels advance `yOff += 26` per basis from a start of 16 (`labels.ts:26`, `:65`), then the `N =` row draws at `yOff - 4` (`:73`): three active bases put that baseline at 90 with ~16px of glyph beneath it, past the 100px box. Horizontally, `xBase 16 + iconW + measureText(" Chebyshev")` at `bold 16px 'Fira Code'` (`:55`) plus a 22px icon (`:48`) runs well past 148 and a fourth row would exceed 200 outright.

**Falsifier / `UNPROVEN-NEEDS-LIVE` (SS-13).** The exact label extents need `measureText` in a live context; the *transparent-hole* half needs no measurement, since `clearRect` after an unconditional `drawGrid` (`:487`) is plainly visible in the source. The honest repair is to skip the label pass rather than erase it — `drawBasisLabels` is already a separate call at `:197` / `:370`.

### C-13 · MINOR · the epicycle spectrum is theme-blind and bypasses both installed color substrates

`canvas-drawing/transforms.ts:3-8`:

```ts
const hue = (1 - Math.pow(i / Math.max(total - 1, 1), 0.6)) * 300;
return `hsl(${hue}, 85%, 55%)`;
```

A hardcoded 300° → 0° rainbow at fixed 85% / 55%. It paints up to 80 circles plus their arms, centre dots and endpoint dots (`epicycles.ts:158-230`) — the single most prominent element on the canvas — **identically in light and dark mode**, with no relation to the `--viz-*` ladder or to `--section-color-*`.

value.js 0.13.0 exports `sampleColorRamp` and `mixColorsN` (`dist/index.d.ts`, `./units/color/mix`); glass-ui 4.0.0 exports `deriveBlobPalette` (`dist/composables/color/index.d.ts:135`), `deriveHue` (`:92`) and `gamutMapStop` (`:99`), all documented as routing through value.js's Ottosson core. Neither substrate is used. Same class: the hardcoded `#ff3b3b` tip dot and `rgba(255,255,255,0.85)` highlight at `epicycles.ts:289`, `:295`.

**Falsifier.** If 85%/55% HSL were established as contrast-safe against both `--background` arms. Not established anywhere in the tree — and note `style.css:113-119` shows the project already had to hand-darken `--viz-amber` for exactly this class of failure, on a token that *was* in the ladder.

### C-14 · MINOR · the exposed surface is three members, of which consumers use one and one is structurally uncallable

`BasisCanvas.vue:515` — `defineExpose({ anim, exportFrame, drawImageOverlay })`.

Both consumers use only `exportFrame` (`VisualizationView.vue:100`, `FullscreenViewer.vue:138`).

- `anim` re-exports the entire pinia animation store through the component ref. Every consumer already calls `useAnimationStore()` directly (`VisualizationView.vue:33`, `FullscreenViewer` via `AnimationControls`), so this is a second, undeclared path to the same singleton — the class of out-of-band exposure `VisualizationView.vue:75-78` records the codebase as having *already deliberately retired* for `CanvasControlsDock` ("converts its out-of-band `defineExpose(dockExpanded)` to a typed emit").
- `drawImageOverlay(s: CanvasSurface, view: ViewTransform)` cannot be called by a parent at all: `surface` is not exposed and `getViewTransform` is not exposed, so neither argument is constructible from outside.

**Falsifier (survived).** `grep -rn "canvasComponent" web/src` → the six lines cited; no other consumer of the ref.

### C-15 · MINOR · no emits, and the props contract is stringly typed over a closed set

`BasisCanvas.vue:33-40` declares `activeBases?: string[]`, where the domain is a closed set the file itself enumerates: `"fourier-epicycles"` (`:109`, `:318`, `:379`, `:489`), `"fourier-series"` (`labels.ts:33`), and the `basisDisplay` keys `fourier | chebyshev | legendre` (`basis-display.ts:4-6`). A `type BasisKey` union would retire the `if (!cfg) continue` guards (`:252`, `labels.ts:31`) and would catch a typo at the selector seam (`VisualizationView.vue:267`, `activeBases = $event`) instead of silently rendering nothing.

Zero `defineEmits`. The component owns state its siblings visibly want and currently recompute: the hovered basis, the epicycle hit bounds (`:177-185`), and the derived level `N` (`:196`, `:370`) that `AnimationControls` and `CoefficientsPanel` present separately. The codebase's own idiom is typed emits — `FullscreenViewer.vue:20-24`, `ExportModal.vue:18-21`.

**Falsifier.** If a parent needed none of it. `VisualizationView.vue:122` recomputes `hasEpicycles` from `activeBases` independently — the derivation is duplicated, not absent.

### C-16 · MINOR · `drawEpicycleFrame` types its data parameter off the pinia store instead of the imported domain type

`BasisCanvas.vue:120-124` — `data: typeof store.epicycleData & {}`. `EpicycleData` is exported from `@/lib/types` (`types.ts:22-27`), and the file already imports from that module at `:9` for `BasisComponent`. Typing a pure drawing function's parameter off a *store instance* couples the renderer's signature to pinia; the `& {}` NonNullable idiom is also opaque next to `NonNullable<EpicycleData>` or a plain `EpicycleData`.

**Falsifier.** None needed — it compiles and behaves. This is a coupling/clarity defect, not a correctness one, and is scoped MINOR accordingly.

---

## INFO

### C-17 · INFO · `useImageOverlay` fetches an overlay it will then refuse to draw

`composables/useImageOverlay.ts:15-19` falls back to `store.contourSettings?.resize ?? 768` when `store.contour?.image_bounds` is absent, and `:36-72` issues `overlayUrl(...)` unconditionally on any `imageSlug` change. But `drawImageOverlay` returns at `:77-78` when `image_bounds` is null. `ContourAsset.image_bounds` is explicitly `ImageBounds | null` (`types.ts:76`), and `workspace.ts:154-159` re-fetches a draft contour *precisely* to trigger the backend's lazy backfill — so the null state is real and modeled, not hypothetical.

The wasted request is not cheap on the server: a full PIL decode, EXIF transpose, LANCZOS resize and AVIF (or WEBP) encode on a thread-pool worker (`api/routers/images.py:180-199`). It sits behind nginx's 30 r/s general zone, not the 2 r/s compute zone (`nginx/fourier.conf:16-17`, `:31`), so it is never rate-limited into visibility.

### C-18 · INFO · `overlayUrl` is a raw string-concat client leaf outside the fetch core, and doubles its own prefix under the Dockerfile's default

`api.ts:288-298` — `imageUrl`, `thumbnailUrl`, `overlayUrl` each build `` `${BASE}/api/...` `` by hand, entirely outside `coreFetch` (`:165`): no session header, no abort registry (`:52-58`), no `ApiProblem` decode, no 429 retry. `overlayUrl` is the sole API surface BasisCanvas reaches (via `useImageOverlay.ts:69`), and it is exactly the "client without an operation" class the census counts at 2 of 20 (`CENSUS-2026-08-03.md` / `lane-fourier-r3-r6.md` §6).

`BASE = import.meta.env.VITE_API_URL || ""` (`api.ts:24`) and `web/Dockerfile:18` declares `ARG VITE_API_URL=/api`. A plain `docker build web/` therefore produces `/api/api/images/{slug}/overlay` — and, since `coreFetch` concatenates the same way, `/api/api/...` for all 45 operations.

**Falsifier (survived, and it caps this at INFO).** `docker-compose.prod.yml:47` passes `VITE_API_URL: ${VITE_API_URL:-}` — empty — restoring the single prefix. The composed deploy is correct; the standalone image build is not. Config-gated latency, not a live break.

**Second concern, falsified.** The cross-origin case: with a real absolute `VITE_API_URL`, `img.crossOrigin = "anonymous"` (`useImageOverlay.ts:50`) makes the overlay a CORS request, and the route sets only `Cache-Control` + `X-Image-{Width,Height}` (`api/routers/images.py:201-209`). But `api/main.py:55-62` installs `CORSMiddleware` with configurable `allow_origins`, which covers the route. **Claim withdrawn** — recorded here so the next lane does not re-raise it.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · the memoized data bbox — a correctly diagnosed, correctly fixed, correctly *justified* hot-path allocation

`composables/useViewTransform.ts:15-46`. The comment names the real defect (`Math.min(...xs)` allocating an arguments array of length `n_points` — four of them per rAF at n=1024, approaching V8's argument ceiling at n≈10k), the real fix (a single linear scan), and the real mechanism (hoisting into a `computed` keyed on **source-path identity** rather than contents). All three are accurate.

**And it actually holds**, which is the part that usually fails: `store.epicycleData` / `store.basesData` are `shallowRef`s (`workspace.ts:44-45`) carrying `markRaw`'d payloads (`:299`, `:328`), so the computed's dependency set is exactly the two ref identities. Nothing in `drawFrame` writes either. The cache survives every frame between compute passes.

**Falsifier (survived).** Per-frame re-evaluation would kill it; there is no write path from the draw functions to either ref.
**Honest debit.** The superseded `getPathBounds` (`transforms.ts:10-38`) still carries the variadic spread and is still exported from the barrel (`canvas-drawing/index.ts:2`) — dead but reachable, so the defect can be reintroduced by a future caller reaching for the obvious-looking helper.

### S-2 · the single-pass epicycle chain

`BasisCanvas.vue:137-150` and `:322-338`. One `fourierPositionsAt(components, anim.t, components.length)` call yields the cumulative-position array; the tip is its last element; the visible-circles overlay is the same array sliced. The comment states both the change and what it replaced ("Prior implementation traversed N components twice per frame"), and the guard at `:148` avoids the slice entirely in the `nVis === components.length` case.

**Honest debit.** In the default case (`nVis` 80 of up to 200) `allPositions.slice(0, nVis + 1)` allocates a fresh 81-element array every frame — a traversal traded for an allocation. `drawEpicycleCircles` already takes `nVis` as a parameter (`epicycles.ts:137`) and indexes `visPositions[i]` / `[i+1]` (`:159-160`), so passing the full array plus the bound would have been zero-allocation. Still net-positive; not free.

### S-3 · the reference-counted visibility credit

`BasisCanvas.vue:432-459` with `stores/animation.ts:96-106`. Three things this class of code usually gets wrong, all correct here:

- **No double-counting.** `if (visible === lastVisible) return;` (`:445`) before touching the counter, so a re-fired entry with an unchanged state cannot inflate it.
- **No leak on unmount-while-hidden.** `if (lastVisible) anim.setCanvasVisible(false);` (`:458`) releases the credit only if one was taken — the failure mode where a canvas unmounts off-screen and permanently decrements the shared counter is closed. `Math.max(0, …)` at `animation.ts:102` is belt-and-braces on top.
- **An explicit floor, not a silent stall.** No `IntersectionObserver` → register as permanently visible (`:436-441`), so the degraded path is the *prior* always-on loop rather than a canvas that never animates. The comment says exactly this.

The intent gating `playing` (user intent) separately from the clock (`animation.ts:38-42`, `:104-105`) is the right decomposition: the loop resumes seamlessly on return. Only the prose overclaims (C-9); the mechanism is sound.

### S-4 · `useImageOverlay`'s async-race discipline

`composables/useImageOverlay.ts:51-68`. Both handlers re-derive `cacheKey()` and compare it to the key captured at request time before mutating shared state:

```ts
img.onload  = () => { … cache.set(key, img); if (cacheKey() === key) { currentImage = img; … } };
img.onerror = () => { if (cacheKey() === key) { currentImage = null; … } };
```

This is the correct pattern for an out-of-band `<img>` load racing a store change, and it is applied on **both** paths — the `onerror` half is the one almost every implementation omits, leaving a stale `loading` flag when a superseded request fails. The module-scoped cache (`:9`) surviving unmount/remount across gallery → visualizer is a deliberate, documented choice with a bounded size and eviction (`:6`, `:52-55`).

### S-5 · the A/B/render watcher split — the one seam in the file whose reactive contract is stated, justified, and honored

`BasisCanvas.vue:374-423`. Watcher A keys on epicycle **identity** plus epicycle-layer membership and is the only one that clears the trail and re-precomputes it. Watcher B keys on `basesData` plus the full `activeBases` list and invalidates *only* the fit centre. Watcher C is the 60 fps render tick and carries exactly four sources — `anim.t`, `anim.easedT`, and the two display booleans.

Each carries the invariant it protects, and the code matches: *"Trail is only cleared when the epicycle data itself changes or the epicycle layer is toggled, NOT when basesData arrives"* (`:376-377`) and *"does NOT touch trail so epicycle animation stays continuous"* (`:401`) are both true of `:378-397` and `:402-413`. The render watcher's exclusion note (*"basesData is intentionally NOT here"*, `:417`) closes the obvious regression. Both watchers correctly handle the not-yet-mounted case by deferring to `setupCanvas()` (`:391-395`, `:407-411`) rather than drawing into a null surface.

This is what the rest of the file's seams should look like — and its existence is the strongest evidence that C-1 through C-9 are neglect at the boundaries rather than incapacity.

---

## Disposition summary

| id | sev | one line | seam |
|---|---|---|---|
| C-1 | BLOCKER | `cssVarToHex` cannot parse glass-ui's `oklch()` / `light-dark()` tokens → `#888888` | value.js 0.13 + glass-ui 4.0 |
| C-2 | BLOCKER | `exportFrame` drops `withEpicycles` + `withTrail`, and never draws the overlay | props/emits (sibling contract) |
| C-3 | MAJOR | `basisDisplay` freezes `VIZ_COLORS` at module eval → two colors, one basis | glass-ui tokens |
| C-4 | MAJOR | no reactive dep on `VIZ_COLORS` → theme toggle never repaints a paused canvas | Vue reactivity seam |
| C-5 | MAJOR | client re-derives `partial_sums`: ~320k transcendentals/frame | API operation↔client (`R6-8`) |
| C-6 | MAJOR | `AnimationSettings` three-way divergent; `max_circles` unread by the renderer | API ↔ store ↔ renderer |
| C-7 | MAJOR | two `AnimationData` shapes, one name; entity field absent from the client mirror | API operation↔client (`R6-8`) |
| C-8 | MAJOR | glass-ui 4.0.0 peer `^0.10 \|\| ^0.11` vs installed value.js 0.13.0 | dependency graph |
| C-9 | MAJOR | IO gate cannot see occlusion → fullscreen runs two 60 fps canvases | lifecycle / store |
| C-10 | MINOR | asymmetric `?.` on `partial_sums`: non-fourier branch throws | API ↔ client typing |
| C-11 | MINOR | frame-rate-dependent hover ease; keyframes 4.3 primitives unused | keyframes.js 4.3 |
| C-12 | MINOR | `withLabels:false` clears a fixed 200×100 hole through the export | export contract |
| C-13 | MINOR | hardcoded HSL rainbow; `sampleColorRamp` / `deriveBlobPalette` unused | value.js + glass-ui |
| C-14 | MINOR | 3 exposed members, 1 used, 1 uncallable | exposed surface |
| C-15 | MINOR | stringly-typed `activeBases`; zero emits | props/emits |
| C-16 | MINOR | data param typed off the pinia store, not `EpicycleData` | type coupling |
| C-17 | INFO | overlay fetched then refused when `image_bounds` is null | API seam |
| C-18 | INFO | `overlayUrl` bypasses the fetch core; `/api/api` under the Dockerfile default | API seam / deploy |

**Ship-together pairs.** C-1 + C-4 (curing the palette makes the staleness visible). C-5 + C-9 (the duplicated evaluation and the doubled canvas multiply). C-2 + C-15 (a typed `ExportOptions` is the mechanical fix for the dropped flags).

**The single highest-leverage change.** Delete `web/src/lib/colors.ts`'s four-regex arm and route the token read through a resolved used-value probe into `cssToOklch` / `oklchStopToHex` from `@mkbabb/glass-ui/color` — carrying the two caveats in C-1 (the `light-dark()` resolution step, and value.js's own R1 `oklch()` parser crash). That one edit closes C-1, unblocks C-3 and C-13, and makes C-4 the only remaining palette defect.
