claude-opus-5[1m]

# CHALLENGE — `BasisCanvas.vue` · axis **L** (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisCanvas.vue` (547 lines; 515 of script)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its falsifier.
**Method** static + source-derived only. No browser. `fourier-analysis` read read-only; the only write is this file.
**Coordinate** `fourier-analysis` @ branch `m/w1-bump-migration`, `cd26c65`, **28 uncommitted paths** — the exact WT state lane-frontend §9 carry #2 flagged ("Land or abandon the WT bump first"). `BasisCanvas.vue` and every module it imports are **clean** at that commit, so all primary line refs are against committed content. The one dirty file I cite is `VisualizationView.vue` (consumer context only: BC-2's option forwarding `:100`, BC-7/BC-10's `is-hidden` binding `:198`, BC-17's `useMediaQuery` `:70`) — those are working-tree refs and should be re-read at wave-open if the bump lands.
**Tally** 25 defects (2 BLOCKER · 9 MAJOR · 9 MINOR · 5 INFO) · 6 superlatives.
Findings are ordered by severity; the `BC-n` id is stable and not contiguous within a section (BC-20 was promoted MINOR→MAJOR by its own falsifier — see its note).

## Read set (whole, read-only)

Component: `BasisCanvas.vue` (547).
Direct imports, all read whole: `stores/workspace.ts` (471) · `stores/animation.ts` (146) · `lib/bases.ts` (46) · `lib/colors.ts` (117) · `lib/golden-shimmer.ts` (68) · `lib/types.ts` (391) · `visualization/lib/basis-display.ts` (7) · `visualization/lib/canvas-drawing/{index,types,transforms,ghost-path,placeholder,trail,grid,labels,epicycles}.ts` (764 total) · `composables/{useCanvasSetup,useCanvasHover,useImageOverlay,useViewTransform}.ts` (49/202/93/77).
Consumer context (read for falsification, not audited): `VisualizationView.vue`, `FullscreenViewer.vue`, `ExportModal.vue`, `BasisSelector.vue`, `App.vue`, `lib/defaults.ts`, `tsconfig.json`, `e2e/*.spec.ts`, and the installed `@mkbabb/glass-ui@4.0.0` token CSS.

## Corpus folded (not re-invented)

- **CENSUS-2026-08-03 §3a** — "three independent canvases … Canvas2D throughout, WebGL/WebGPU ABSENT"; "SOFT — `BasisCanvas` + `canvas-drawing/` (1 311 LOC Canvas2D) vs glass-ui's GPU-backed `FourierField` … highest-value, highest-risk convergence"; §2 C-5 corrects the shadow aggregate to 2 079 LOC incl. the canvas lib. **Accepted, unchallenged.**
- **lane-frontend §6 Path A** (`:516-556`) — the call-graph of this exact component, incl. "the epicycle loop is *not* draw-on-rAF … redraws coalesce on Vue's scheduler". **Accepted; BC-10 and BC-25 extend it, BC-10 contradicts one of its §8 "already banked" credits.**
- **lane-frontend §8** (`--viz-amber` WCAG darken, `style.css:119-131`) — recorded as an upstream carry. **BC-1 shows this override is the sole reason the palette resolver is not visibly 100 % dead; the lane recorded the override without noticing what it masks.** Explicit extension, not contradiction.
- **intake lane-fourier-r3-r6 R5-7** (ADOPT-AS-FACT + CARRY→F.W4) — "template-loop evidence keyed to *component* callsites is blind to native HTML element loops"; **R6-5** cures it with a `NATIVE_TEMPLATE_LOOP` family. **§R5-7 below shows the cure does not reach this component, and why.**
- **R3-10** (six dynamic-`:is` families, four registered) — no `<component :is>` in this file; not applicable. Falsifier: `grep -n "component :is" BasisCanvas.vue` → empty.

---

# BLOCKERS

## BC-1 · BLOCKER · the viz palette resolver cannot parse the tokens it resolves — every Fourier colour in this component renders `#888888` grey

`BasisCanvas.vue:6` imports `VIZ_COLORS`. That object is a `reactive()` seeded with hard-coded hexes (`lib/colors.ts:77-87`, `fourier: "#bf4040"`) and then **overwritten at boot** by `resolveVizColors()` (`lib/colors.ts:90-96`), called from `App.vue:11` and again on every theme flip via the `MutationObserver` at `App.vue:13-17`.

`resolveVizColors` routes every token through `cssVarToHex` (`lib/colors.ts:22-54`), which matches exactly four shapes: leading `#` (`:29`), `hsl(…)` (`:32-37`), a bare `h s% l%` triplet (`:40-43`), and `rgb(…)` (`:46-51`). Anything else falls through to `return "#888888"` (`:53`).

The installed producer authors **every** `--viz-*` token in `oklch()`:

- `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-267` — `--viz-fourier: oklch(0.579 0.201 30.4)`, `--viz-chebyshev: oklch(0.484 0.163 265.5)`, `--viz-legendre: oklch(0.532 0.180 317.5)`, `--viz-green: var(--section-color-4)` (also oklch, `:250-256`).
- `tokens/dark-arm.css:113` — the dark arm, oklch.
- `tokens/light-dark.css:145-147` — `light-dark(oklch(…), oklch(…))`.

None of the three declarations matches any of the four regexes. **`VIZ_COLORS.fourier`, `.chebyshev`, `.legendre`, `.green` are all set to `"#888888"` on mount** — actively worse than the seeded defaults, because the seed at least carried the brand hues.

Consequences inside this component's render path, all four:

| Site | What draws grey |
|---|---|
| `BasisCanvas.vue:127` → `trail.draw(…, trailColor)` `:145` | the Fourier trace — the product's primary mark |
| `BasisCanvas.vue:326` → `trail.draw` `:330` | same, multi-basis mode |
| `canvas-drawing/epicycles.ts:258` `hexToRgba(VIZ_COLORS.fourier, 0.25)` | the dashed tip↔inset connector |
| `canvas-drawing/epicycles.ts:283` `hexToRgba(VIZ_COLORS.fourier, glowAlpha)` | the pulsing tip-dot glow |

Also `BasisSelector.vue:203` (`--track-color`) and `labels.ts:89`.

**Provenance of the rot.** `style.css:113-118` records, in prose: *"glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)`"* — i.e. the resolver was written against an **hsl-era** producer. The producer has since migrated to oklch. The app's own D.W4.d override (`style.css:119-127`) re-declares `--viz-amber`/`--section-color-5` **in `hsl()`**, so amber is the one token that still parses. That local WCAG carry is why the whole palette does not read as obviously dead: the only token anyone re-checked is the only one still in a parseable form.

**Why it survived CI.** No test asserts a rendered pixel. `e2e/visual-baseline.spec.ts` *writes* paired captures (its header, `:1-17`) but asserts only overflow; `settings-persistence.spec.ts:59-60`, `visualization-ux.spec.ts:51-52,239-240`, `gallery.spec.ts:100` assert `toBeVisible()` / `boundingBox()` on `page.locator("canvas")`. `grep -rn "toHaveScreenshot" e2e/` → empty.

**Falsifier (four ways to kill this claim, all checked):**
1. *A parseable `--viz-fourier` declaration wins the cascade.* `grep -rn -- "--viz-fourier:" node_modules/@mkbabb/glass-ui/dist/styles/ src/` returns **exactly three** declarations, all oklch/`light-dark(oklch)`. Dead.
2. *The token is `@property`-registered so CSSOM serialises a resolved colour.* `grep -rn -A2 "@property" node_modules/@mkbabb/glass-ui/dist/styles/ | grep -i viz` → empty. Dead.
3. *A browser serialises an unregistered custom property's computed value as `rgb()`.* It does not — CSS Variables §3: the computed value of an unregistered custom property is the specified token sequence after `var()` substitution. Dead.
4. *`resolveVizColors()` never runs.* It runs at `App.vue:11` and on every theme flip. Dead.

The only residue is cosmetic-exactness: whether the observed grey is `#888888` (regex fall-through, `:53`) or `#888888` (empty-string fall-through, `:26`). Both are `#888888`. A one-line console read (`getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")`) is the 30-second live confirmation for SS-13 — **not** a dependency of the claim.

**Attribution.** Root cause `lib/colors.ts:22-54`; BasisCanvas is the largest victim and the reason it matters. The cure is one `oklch(…)`/`color()`/`lab()` branch, or — better — one `ctx.fillStyle = "var-resolved string"` pass: Canvas2D accepts `oklch()` directly in all current engines, so the hex round-trip exists only for `hexToRgba` (`colors.ts:101-107`) and KaTeX (`useCoeffHover.ts:64`).

---

## BC-2 · BLOCKER · two of the four export toggles are silently discarded

`ExportModal.vue:36-41` emits four keys:

```ts
emit("export", {
    withEpicycles: props.hasEpicycles && withEpicycles.value,
    withTrail:     withTrail.value,
    withGrid:      withGrid.value,
    withLabels:    withLabels.value,
});
```

`VisualizationView.vue:100` forwards the bag verbatim to `canvasComponent.value?.exportFrame(options)`. `BasisCanvas.vue:462-469` destructures **two** of them:

```ts
function exportFrame(options: Record<string, boolean> = {}) {
    …
    const { withGrid: showGrid = true, withLabels: showLabels = true } = options;
```

`options` is never read again (`:469-513`). **`withEpicycles` and `withTrail` are inert.** The user is shown two switches (`ExportModal.vue:55-62`, one of them the *only* toggle that is conditionally rendered on `hasEpicycles` — i.e. the one the UI takes most seriously) that change nothing about the PNG.

**Falsifier:** *the flags reach the draw through another channel.* `grep -n "withEpicycles\|withTrail" src/` → two hits, both inside `ExportModal.vue`. `drawEpicycleFrame` (`:120-199`) and `drawMultiBasesFrame` (`:202-372`) take no options parameter and read no module-level flag. Dead.

**Why it typechecked:** BC-13. `Record<string, boolean>` is total under `strict: true` without `noUncheckedIndexedAccess` (`tsconfig.json:4-17` — the flag is absent), so TS believes `options.withGrid` is `boolean`, the `= true` defaults are unreachable-but-legal, and an unread key is indistinguishable from a read one. A declared options interface would have made both drops a compile-visible unused-property.

---

# MAJOR

## BC-3 · MAJOR · `exportFrame` is a hand-forked `drawFrame` that has drifted — the image overlay is silently dropped from every PNG

`drawFrame` composites in four steps (`:98-116`): clear → grid → **image overlay if `props.showImageOverlay`** (`:104-107`) → basis frame. `exportFrame` reproduces three of the four (`:485-496`): clear → grid → basis frame. `drawImageOverlay` is never called on the export path.

So a user who turns the overlay on, sees their source photograph behind the curve, and exports gets a PNG **without the photograph**. The export is not WYSIWYG and gives no signal that a layer was dropped.

**Falsifier:** *`drawEpicycleFrame`/`drawMultiBasesFrame` draw the overlay themselves.* They do not — `grep -n "drawImageOverlay" BasisCanvas.vue` → `:81` (destructure), `:106` (drawFrame only), `:515` (defineExpose). Dead.

This is the mechanical cost of BC-11: `exportFrame` re-derives `data`/`basesData`/`view`/`hasEpic`/`onlyEpic` (`:482-496`) from the same sources as `drawFrame` (`:92-116`) instead of parameterising one function on a target surface. Every future layer added to `drawFrame` inherits the same silent drop.

## BC-4 · MAJOR · `withLabels: false` punches a transparent hole in the PNG and under-covers the reachable 3-basis legend

`BasisCanvas.vue:498-500`:

```ts
if (!showLabels) { offCtx.clearRect(0, 0, 200, 100); }
```

Two defects in one line.

**(a) It erases, it does not suppress.** The offscreen canvas is never filled with a background (`:485` is a `clearRect`; nothing paints an opaque base). `clearRect` therefore removes the grid (`grid.ts:29-44`) and any curve/ghost/trail pixels crossing that corner, leaving a hard-edged 200×100 transparent rectangle in the exported PNG — visible as a notch against any viewing background. The correct shape is to skip `drawBasisLabels` (`:197`, `:370`), which requires the parameterisation BC-11 asks for.

**(b) The magic rect under-covers the reachable maximum.** `drawBasisLabels` (`labels.ts:23-73`) starts at `yOff = 16` and advances `+26` per basis (`:65`), then paints the `N = …` row at `yOff - 4` (`:73`) with `textBaseline = "top"` at 16 px. `BasisSelector.vue:11,96-105` makes the two fourier modes mutually exclusive, so the reachable maximum is **3 rows** (one fourier mode + chebyshev + legendre). At 3 rows the `N` text occupies y ≈ 90…106 — **its bottom survives the clear**. The exported "labels off" PNG carries a clipped remnant of `N = 200`.

**Falsifier:** *4+ bases are unreachable, so the rect suffices.* Wrong direction — 3 already overflows; the arithmetic is above and needs no live run. *The rect is in device px so it is 2× larger on retina.* No: `offCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)` (`:476`) puts the export context in CSS px, matching `labels.ts`'s coordinate space. The mismatch is real at dpr = 1 and identical at dpr = 2.

## BC-5 · MAJOR · `basisDisplay` snapshots `VIZ_COLORS` at module-eval — the curve colour and the trail colour of the *same* basis disagree in the same frame

`basis-display.ts:3-7` is a plain object literal:

```ts
export const basisDisplay: Record<string, {icon, label, color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },   // read ONCE, at import time
```

`VIZ_COLORS` is `reactive()` (`colors.ts:77`) and is mutated later, at `App.vue:11` and on every theme flip. A property **read** at module-evaluation captures the value then and is never re-read — `basisDisplay.fourier.color` is frozen at the seed `"#bf4040"` (`colors.ts:78`) for the process lifetime.

`BasisCanvas.vue:251,257` strokes multi-basis curves with `cfg.color`; `:127` / `:326` draws the trail with the live `VIZ_COLORS.fourier`. Combined with BC-1 this yields, in a single frame of multi-basis mode: the **Fourier curve in `#bf4040`** and the **Fourier trail + tip glow + connector in `#888888`**. Two colours, one basis. `labels.ts:39` inherits the frozen value for the legend, so the legend swatch agrees with the curve and disagrees with the trace.

Independent of BC-1, this also means the three basis colours never respond to the dark-mode flip the `MutationObserver` at `App.vue:13-17` exists to serve.

**Falsifier:** *`basisDisplay` is a getter / `computed` / `reactive`.* It is a bare literal — `basis-display.ts` is 7 lines and reproduced in full above. *The snapshot happens after `resolveVizColors()`.* Module evaluation of `basis-display.ts` is hoisted through the import graph (`BasisCanvas.vue:8`, `labels.ts:2`, four gallery SFCs) and completes before `createApp().mount()` at `main.ts:11`, hence before `App.vue`'s `onMounted`. Dead both ways.

**Blast radius beyond this component (for the wave, not this challenge):** `GalleryCard.vue:40`, `GalleryCardModal.vue:45`, `GalleryDraftsSection.vue:44`, `GallerySearchBar.vue:31`, `BasisSelector.vue:139` read the same frozen object.

## BC-6 · MAJOR · the golden shimmer on hovered epicycle circles is a dead statement — six of six paint ops clobber it

`BasisCanvas.vue:168-173`:

```ts
if (epicycleHovered) { s.ctx.globalAlpha = goldenShimmerAlpha(); }
drawEpicycleCircles(…);
s.ctx.globalAlpha = 1;
```

`drawEpicycleCircles` (`epicycles.ts:132-233`) sets `globalAlpha` explicitly immediately before **every** painting operation and resets to `1` after each: DC marker fill `:174`, DC arm stroke `:183`, circle stroke `:196`, arm stroke `:208`, centre dot `:219`, endpoint dot `:227`. Six of six. It also brackets the whole body in `save()`/`restore()` (`:151`, `:232`), so the caller's value is discarded twice over. **No pixel ever reads `goldenShimmerAlpha()`.** The intended pulsing hover feedback on the epicycle inset does not exist.

The multi-basis twin (`:356`) does not even attempt it — so the same inset, in the same hover state, is inconsistent between the two code paths (BC-11).

**Falsifier:** *some paint op inherits `globalAlpha`.* Enumerated exhaustively above; the six sites are the complete set of `fill()`/`stroke()` calls in the function. *`epicycleAlpha` carries the shimmer.* No — `eAlpha` comes from `epicycleAlphaFromScale(hover.getScale())` (`:153`), a pure function of the hover *scale* ramp (`epicycles.ts:123-126`), unrelated to `goldenShimmerAlpha()`'s `performance.now()` oscillation (`golden-shimmer.ts:10-12`). Dead.

## BC-7 · MAJOR · `epicycleBounds` is never cleared in the multi-basis path — a phantom hover region survives mode and viewport changes

`drawEpicycleFrame` handles both branches (`:176-185`):

```ts
if (fit) { epicycleBounds = {…}; } else { epicycleBounds = {x:0,y:0,w:0,h:0}; }
```

`drawMultiBasesFrame` has only the positive branch (`:358-366`) — **no `else`**. `epicycleBounds` is a component-scoped `let` (`:52`) closed over by `isInEpicycleRegion` (`:69-72`) and consumed by `isMouseInEpicycleBounds` (`epicycles.ts:109-120`), which pads the rect by 16 px on all sides.

Reachable failure: on desktop with `["fourier-epicycles"]`, `fit` is computed and `epicycleBounds` is set to the inset rect. The user adds Chebyshev — control now flows to `drawMultiBasesFrame`. Narrow the canvas below the 768 threshold (`:339`; a stage resize, a `Configurator` panel expansion, or the mobile tab at `VisualizationView.vue:197`), so `fit` stays `null` at `:347`. `epicycleBounds` retains the *stale desktop rect*. Hovering empty canvas in that region now: flips `targetScale` to `HOVER_EPICYCLE_SCALE` (`useCanvasHover.ts:94-99`), starts a rAF scale tween (`:52-63`) that redraws the whole frame every frame until it settles, and shifts `epicycleAlphaFromScale` from 0.65 to 1.0 (`epicycles.ts:123-126`) — a global alpha jump on an inset that is not being drawn.

Second reachable failure: deactivating `fourier-epicycles` entirely (`:318-319` false) leaves the last-known rect live forever, since neither watcher touches `epicycleBounds` (`grep -n "epicycleBounds" BasisCanvas.vue` → `:52, 71, 177, 184, 359` only).

**Falsifier:** *another site resets it.* The five occurrences are enumerated above; only `:184` writes zeros, and only from the single-basis path. Dead. *`fit` is always non-null on the multi path.* `:348` gates on `isDesktop && nVis > 0` and `computeEpicycleFit` itself returns `null` when the bbox degenerates (`epicycles.ts:70`). Dead.

## BC-8 · MAJOR · the `N = k` legend is false in epicycle-only mode — and the correct label function exists, is exported, and is dead

`:196-197`:

```ts
const level = Math.max(1, Math.ceil(anim.easedT * components.length));
const { hitRegions } = drawBasisLabels(s, ["fourier-epicycles"], `N = ${level}`, hoveredBasis);
```

`level` is used **nowhere else in the function** (`grep -n "level" BasisCanvas.vue` within `:120-199` → `:196, :197` only). The geometry is unconditionally full-order: `fourierPositionsAt(components, anim.t, components.length)` at `:140` takes every component; the trail is precomputed by `evaluateFourier(components, i/n)` with no `maxTerms` (`trail.ts:20`) and rebuilt the same way on scrub (`trail.ts:64`). `nVis = min(maxCircles, n)` (`:135`) bounds only how many *circles* are stroked, never the tip or the trace.

So a viewer watching the epicycle animation reads "N = 1 … N = 200" as a convergence story, while the traced curve is the *full* N-term reconstruction from t = 0 — the animation is a **time** sweep, not an **order** sweep. In multi-basis mode the same string is honest (`:229-241` indexes real precomputed partial-sum levels, and the fallback at `:300-311` slices `nTerms = min(level, n)`), so one legend means two different things depending on which sibling drew it.

The tree contains the correct label for this mode: `labels.ts:81-103` `drawEpicycleLabel(surface, tValue)` renders `ℱ Epicycles` + `t = 0.42`. It is exported from `canvas-drawing/index.ts:18` and **imported by nobody** (`grep -rn "drawEpicycleLabel" src/` → the definition and the re-export, nothing else). The right answer was written, exported, and abandoned.

**Falsifier:** *`level` reaches the geometry indirectly.* The only other `level` in scope is a fresh `let` inside `drawMultiBasesFrame` (`:226`). *`nVis` encodes the level.* `nVis` is `min(maxCircles.value = 80, n)` — constant across the animation (BC-9). Dead.

## BC-9 · MAJOR · half the persisted `AnimationSettings` contract is write-only — this renderer hardcodes the values instead

`:47` `const maxCircles = ref(80);` — the only reads are `:135` and `:321`; there is **no write anywhere in the file**. It is a `ref` that never changes: `grep -n "maxCircles" BasisCanvas.vue` → `:47, 135, 321`.

Meanwhile `max_circles` is a first-class field of the persisted contract: declared at `lib/types.ts:47` (`AnimationSettings`), defaulted to **100** at `lib/defaults.ts:21`, `structuredClone`d into every IndexedDB draft (`workspace.ts:95-104`), and shipped to the backend on save inside `animation_settings` (`workspace.ts:356`, matching `Visualization.animation_settings` at `types.ts:238`).

Field-by-field audit of all six (`grep -rn "\b<field>\b" src/`):

| field | declared | defaulted | **read by the renderer?** |
|---|---|---|---|
| `max_circles` | `types.ts:47` | `defaults.ts:21` (100) | **NO** — `BasisCanvas.vue:47` hardcodes 80 |
| `duration` | `types.ts:45` | `defaults.ts:20` (5000) | **NO** — `animation.ts:23` hardcodes 20000; nothing ever writes `anim.duration` |
| `fps` | `types.ts:45` | `defaults.ts:19` (60) | **NO** — zero reads repo-wide |
| `easing` | `types.ts:48` | `defaults.ts:22` | yes — `VisualizationView.vue:56-63` |
| `speed` | `types.ts:49` | `defaults.ts:23` | yes — same |
| `active_bases` | `types.ts:50` | `defaults.ts:24` | yes — `VisualizationView.vue:46` |

**Three of six** round-trip user → draft → API → entity → draft → user and are discarded at the one place they mean anything. Two of the three also *disagree* with the hardcoded value they shadow (100 vs 80; 5000 vs 20000), so a reader of the persisted document is actively misinformed about what was rendered — and a gallery entry replayed from `animation_settings` cannot reproduce its own frame. BC-20 is the downstream consequence of the `duration` half.

**Falsifier:** *some other component consumes them.* The greps are repo-wide over `src/`; `fps` returns three hits, all of which are the declaration, the default, and a *comment* at `BasisCanvas.vue:415`. `duration` returns `animation.ts:23,56,145` (the store's own unrelated ref) plus toast/CSS/morph hits, and **no** `anim.duration = …` anywhere. Dead. *`maxCircles` is written via `defineExpose`.* `:515` exposes `anim`, `exportFrame`, `drawImageOverlay` only. Dead.

## BC-20 · MAJOR · the trail array grows unbounded for the whole session — the loop-back predicate is unreachable at every selectable speed

**Promoted from MINOR by its own falsifier.** I filed this as "the reverse leg rebuilds O(n) per frame"; checking the arithmetic showed the opposite and worse.

`animation.ts:66-69` ping-pongs `t`. `TrailManager.update` (`trail.ts:41-74`) has two branches: rebuild-from-precompute when `scrubbing || t < this.lastT - 0.01` (`:48`), else **append one point** (`:70-71`). The append branch has no bound and no eviction.

The per-frame Δ`t` is `16.7 / (duration / speed)`. `anim.duration` is `ref(20000)` (`animation.ts:23`) and — per BC-9 — **is never written by anything**. `SpeedSelect.vue:38-42` offers exactly `{0.25, 0.5, 1, 2, 4}`. The fastest reachable regime is `20000/4 = 5000` ms, giving Δ`t` = **0.0033 < 0.01**. The predicate's tolerance is therefore **never satisfied by the clock at any selectable speed**; it fires only via `scrubbing`.

Consequences:

1. **Unbounded growth.** `trail.x` and `trail.y` accumulate ~60 entries/second for the entire session — ~216 000 entries/hour each — never truncated. The only resets are `clearTrail()` from watcher A (`BasisCanvas.vue:381`, i.e. an epicycleData change or an epicycle-mode toggle) and the scrub branch.
2. **Linear frame-time degradation.** `draw()` (`trail.ts:76-95`) strokes the whole polyline every frame with one `view.toScreen` call per point (`:90`). Frame cost grows without bound in lockstep. This is the same surface the I.γ gate (BC-10) was built to protect.
3. **Perfectly silent.** After the first forward leg the trail already covers the closed contour, so every subsequent point paints over pixels that are already the same colour. The leak has no visual tell — which is why it is still here.
4. **The reverse leg doubles the polyline back over itself** rather than shrinking it, so the "trail" semantic (a comet tail) is lost after the first half-cycle regardless of the growth.

The tolerance was evidently tuned for a `duration` an order of magnitude shorter — precisely the `defaults.ts:20` value of 5000 ms that BC-9 shows was never wired into `anim.duration`. The two defects are one event: the duration wiring was dropped, and the constant that depended on it silently stopped firing.

**Falsifier (four, all checked):**
1. *Some path writes `anim.duration` to a smaller value.* `grep -rn "anim\.duration\|\.duration =" src/` → no assignment to the store's `duration`. Dead.
2. *A higher speed is selectable.* `SpeedSelect.vue:38-42` is the complete option list; `AnimationControls.vue` is its only host. Max 4×. Dead.
3. *The cycle seam trips the predicate.* At the reverse→forward seam `t` ≈ 0 and `lastT` ≈ 0.0033, so `t < lastT - 0.01` is `0 < -0.0067` — false. The seam is the *least* likely frame to fire it. Dead.
4. *`clearTrail()` runs often enough to bound it.* Its two callers are watcher A (`BasisCanvas.vue:381`) and `reset()` (`trail.ts:26-32`, called at `:388` when epicycleData becomes null). Neither fires during uninterrupted playback. Dead.

Exact frame-time curves are **UNPROVEN-NEEDS-LIVE (SS-13)**; the unbounded growth and the dead predicate are pure arithmetic over the source.

## BC-10 · MAJOR · the I.γ gate covers the store clock only — two rAF loops in this component's own path are ungated, and IntersectionObserver cannot see the occlusion the comment claims it handles

The comment at `:425-431` states the design intent: *"Park the shared animation clock when this canvas is scrolled out of the viewport **or hidden behind the fullscreen layer**"*. `stores/animation.ts:34-42` repeats it. Two independent gaps.

**(a) IntersectionObserver does not report occlusion.** `:442-451` observes `containerRef` with `{threshold: 0}`. IO measures intersection with the viewport (or a root), never overlap by other elements. `FullscreenViewer.vue:105-127` mounts its `BasisCanvas` inside a `Teleport to="body"` fixed backdrop; `VisualizationView.vue:198-201` keeps the inline `BasisCanvas` mounted and laid out (the `is-hidden` class at `:198` is bound to `isEditing && store.contour`, **not** to `showFullscreen`). Both instances therefore report `isIntersecting: true`, `visibleCanvases` reaches 2 (`animation.ts:99-106`), and **both** run the full `drawFrame` on every `anim.t` tick — the inline one painting an invisible surface. The gate's headline case is exactly the case it misses.

**(b) Two rAF loops sit outside the gate entirely.** `useCanvasHover.ts:67-75` `startShimmer()` and `:52-63` `updateHoverScale()` each drive `onRedraw()` — which is `:74` `() => { if (surface.value) drawFrame(); }`, the whole frame. Neither consults `anim.anyCanvasVisible`, `anim.playing`, or `document.visibilityState`. `startShimmer` self-terminates only when `hoveredBasis` clears (`:70`); `hoveredBasis` can be **pinned by tap** (`:170-172`) and pinning is never cleared by `onMouseLeave` (BC-16). A pinned label therefore holds a 60 fps full-frame redraw loop alive across scroll-away, tab-hide, and fullscreen occlusion.

This **extends** lane-frontend §7's flag — *"the two ungated animation clocks are `stores/animation.ts` … and `ConvergencePlot.vue`'s own rAF"* — to **four**, two of them in this file's composable. It also **contradicts, in scope, one §8 "already banked" credit**: "Off-screen rAF gating with reference counting". The counting is sound (S-5); the *sensor* under-reports and the *coverage* is partial. The credit should read "gated for the store clock, on the scroll axis only".

**Falsifier:** *IO reports occlusion in some engine.* No engine implements occlusion in IO v1; `IntersectionObserverEntry` has no occlusion field. Dead. *The inline canvas is `display:none`d when fullscreen opens.* `VisualizationView.vue:198`'s class binding is reproduced above and keys on `isEditing`. Dead. *`startShimmer` is gated elsewhere.* `useCanvasHover.ts` (202 lines, read whole) contains no visibility reference: `grep -n "visible\|hidden\|playing" useCanvasHover.ts` → empty. Dead.
The precise frame-cost figures are **UNPROVEN-NEEDS-LIVE (SS-13)**; the absence of the gates is not.

---

# MINOR

## BC-11 · MINOR · ~60 lines duplicated between the two draw modes, with four measured drifts

`:147-190` and `:320-366` are the same algorithm — positions → trail → `visPositions` slice → `isDesktop` → `stableEpicycleBbox` → `computeEpicycleFit` → `drawEpicycleCircles` → bounds → connector — written twice. The four measured divergences:

| | single (`:120-199`) | multi (`:319-367`) |
|---|---|---|
| stroke weights | `{circle: 4, arm: 3.5}` `:172` | `{circle: 5, arm: 4.5}` `:356` |
| tip-dot z-order | after the circles, `:193` | **before** the circles, `:333` |
| `colorOverride` sentinel | `undefined` `:172` | `null` `:356` |
| `epicycleBounds` reset | present `:183-185` | **absent** (BC-7) |

Rows 1–2 mean the same epicycle inset changes stroke weight and paint order depending on whether a *second, unrelated* basis happens to be active. Row 3 is harmless (`colorOverride ?? …` at `epicycles.ts:162` treats both as nullish) but signals the copies drifted independently. Row 4 is BC-7, a live behavioural bug — the duplication is its proximate cause.

**Falsifier:** *the two modes require different geometry.* They call the identical helpers with identical arguments except the four cells above; the shared body is extractable as `drawEpicycleLayer(s, view, epicycleData, hoveredBasis, widths)` with no branching. Dead.

## BC-12 · MINOR · `exportFrame` mutates the shared `CanvasSurface` with no `try`/`finally`

`:479-504` writes `s.ctx = offCtx`, draws, then restores. `s` **is** `surface.value` (`:464`) — the object every subsequent `drawFrame` reads (`:92`). Any throw between `:480` and `:504` leaves the live surface permanently pointing at a detached offscreen canvas: the visible canvas freezes forever with no error surfaced to the user, and no recovery short of remount.

The swap window is synchronous, so no rAF can interleave — but it spans two 130-line draw functions, `toScreen` on every path point, `ctx.arc` (which throws `IndexSizeError` on a negative radius: `epicycles.ts:194`, `r = components[i].amplitude * scale`), and `hexToRgba` on a possibly-malformed hex (`colors.ts:101-107` → `parseInt` of a slice). A `try { … } finally { s.ctx = origCtx; }` costs one line.

**Falsifier:** *no throw is reachable in the swapped region.* I cannot exhibit a live-data path that throws, so this is a **latent** robustness defect, filed MINOR rather than MAJOR. The claim is about the *shape* (unguarded mutation of shared state across ~40 lines of third-party-ish canvas calls), which is provable from the source and independent of reachability.

## BC-13 · MINOR · `Record<string, boolean>` is the wrong type and is why BC-2 shipped

`:462`. Under `strict: true` without `noUncheckedIndexedAccess` (`tsconfig.json:4-17`; the flag is absent), the index signature is *total*: `options.withGrid` types as `boolean`, so the `= true` defaults at `:467-468` read as dead code to the checker while being load-bearing at runtime, and an unread key is invisible. The honest type is `{ withGrid?: boolean; withLabels?: boolean; withEpicycles?: boolean; withTrail?: boolean }`, which would surface BC-2 as unused properties and make the defaults meaningful. `ExportModal.vue:19` declares the emit with the same lie, so neither side of the contract is typed.

**Falsifier:** *`noUncheckedIndexedAccess` is on via an extended config.* `tsconfig.json` has no `extends` (reproduced fully in the read set; 20 lines). Dead.

## BC-14 · MINOR · asymmetric optional chaining on `partial_sums`

`:268-270`:

```ts
const sumsForBasis = basisName === "fourier"
    ? basesData?.partial_sums?.fourier          // guarded
    : basesData?.partial_sums[basisName];       // NOT guarded
```

Two problems. The ternary is vacuous — `partial_sums["fourier"]` **is** `partial_sums.fourier`, so both arms compute the same lookup and the branch can be deleted. And the guards disagree: the first arm defends against an absent `partial_sums`, the second dereferences it. `lib/types.ts:17` declares the field non-optional, so either the `?.` on the fourier arm is dead code or the polynomial arm is a latent `TypeError` on a backend that omits the key. Exactly one of those is true and the source does not say which.

**Falsifier:** *the arms differ because `partial_sums.fourier` is a distinct typed member.* `types.ts:17` is `Record<string, Record<number, {x,y}>>` — one uniform index signature, no named members. Dead.

## BC-15 · MINOR · `typeof store.epicycleData & {}` instead of the declared `EpicycleData`

`:122`. `lib/types.ts:22-27` exports `EpicycleData`; the file already imports from that module (`:9`, for `BasisComponent`). Writing the parameter as a store-derived intersection couples a pure draw function's signature to Pinia's inferred unwrapping, defeats go-to-definition, and re-encodes "non-null" as an obscure `& {}` idiom rather than the readable `EpicycleData`. Adding `EpicycleData` to the `:9` type-import is a strict improvement with zero behaviour change.

**Falsifier:** *the store type is wider than `EpicycleData`.* `workspace.ts:44` is `shallowRef<EpicycleData | null>(null)`; the intersection removes exactly the `null`. Identical. Dead.

## BC-16 · MINOR · `pinnedBasis` and `hoveredBasis` desynchronise — the tap-to-pin affordance needs two taps after a mouse-out

`useCanvasHover.ts:135-183` maintains `pinnedBasis` as the touch/click latch and mirrors it into `hoveredBasis`. `onMouseLeave` (`:118-131`) clears `hoveredBasis` but **not** `pinnedBasis`. After pin → mouse-out, state is `{pinned: "chebyshev", hovered: null}`. The next tap on that same label takes the `pinnedBasis === tapped` branch (`:164`) and *unpins* — producing no visible change, because nothing was highlighted. The user must tap twice to re-pin. On a touch device, where `onMouseLeave` also fires on the next tap elsewhere, this is the common path.

Same block feeds BC-10(b): the `hoveredBasis` set at `:171` starts an ungated shimmer rAF that `onMouseLeave` does not stop (it clears the flag at `:126` and relies on the tick self-terminating at `:70` — correct, but only after one more full-frame redraw).

**Falsifier:** *`onMouseLeave` clears the pin.* `:118-131` reproduced in the read set; it touches `mouseX`, `mouseY`, `targetScale`, `hoveredBasis`, `el.style.cursor`. Dead.

## BC-17 · MINOR · `768` is a magic number, duplicated, and `isDesktop` is a misnomer

`:151` `const isDesktop = s.width >= 768;` and `:339` `const isDesktop = width >= 768;`. Both measure the **canvas box**, not the viewport. `VisualizationView.vue` nests the canvas inside a `Configurator` stage (`:194-201`) whose width depends on the aside; the epicycle inset therefore vanishes on a 1440 px desktop whenever the stage falls under 768 CSS px. The sibling real-viewport query in the same feature uses `useMediaQuery("(min-width: 1024px)")` (`VisualizationView.vue:70`) — a third, different breakpoint under a similar name. Two literals, no shared constant, in a file that already exports `BASE_EPICYCLE_SCALE`/`HOVER_EPICYCLE_SCALE` from `epicycles.ts:7-8` for exactly this purpose.

**Falsifier:** *`s.width` is the viewport width.* `useCanvasSetup.ts:18-23` sets it from `containerRef.getBoundingClientRect().width`. Dead.

## BC-18 · MINOR · watchers A and B both fire on an `activeBases` change — two full frames per toggle

Watcher A (`:378-397`) watches `() => props.activeBases.includes("fourier-epicycles")`; watcher B (`:402-413`) watches `() => props.activeBases`. Toggling *into or out of* epicycle mode changes both sources, both watchers fire in the same flush, and each calls `drawFrame()` unconditionally (`:394`, `:410`). One redundant full frame — including the `computeStableEpicycleBbox` 33-sample × nVis reconstruction (`epicycles.ts:32-53`) that watcher A just invalidated at `:382`.

Relatedly, the render watcher's source list (`:419`) carries both `anim.t` and `anim.easedT`; `easedT` is a `computed` of `t` (`animation.ts:27-30`) and cannot change independently, so it contributes nothing to the trigger set.

**Falsifier:** *the two watchers are mutually exclusive.* Both source getters read `props.activeBases`; a prop-array identity change (`VisualizationView.vue:199` binds a `ref` reassigned wholesale at `:280` `activeBases = $event`) re-evaluates both. The `include` result changing is a strict subset of the array changing. Dead.

## BC-19 · MINOR · no error posture: a failed compute shows "Computing…" forever

`drawPlaceholderFrame` (`:86-88`) passes `!!store.imageMeta` to `drawPlaceholder`, which selects the message at `placeholder.ts:59`: `hasImage ? "Computing..." : "Drag & drop an image here"`. After a failed `computeEpicycles`/`computeBases`, the store holds `error` set, `computing: false`, `epicycleData: null`, `imageMeta` **non-null** (`workspace.ts:301-307, 330-336`) — so `drawFrame` takes the `:96` early return and the canvas asserts "Computing…" indefinitely.

The parent surfaces `store.error` only when there is no workspace at all (`VisualizationView.vue:161` `v-else-if="store.error && !store.imageSlug"`), so the post-load failure has **no** presentation anywhere. Neither `drawFrame` nor `exportFrame` has a `try`/`catch`, and the component never reads `store.error`: `grep -n "store.error" BasisCanvas.vue` → empty.

**Falsifier:** *a toast covers it.* `useToast` is imported by `VisualizationView.vue:13` and fired only from `handlePublish` (`:107-112`); the compute path rethrows into `useWorkspaceLoader`. *`computing` keeps the message honest.* The placeholder never reads `computing` — `placeholder.ts` takes one boolean, `hasImage`. Dead.

*(BC-20 was drafted here as a MINOR — "the trail rebuilds O(n) per frame on the reverse leg" — and its own falsifier inverted it. `grep`ing for a writer of `anim.duration` and enumerating `SpeedSelect`'s options showed the rebuild branch is **unreachable** from the clock, which makes the append branch unbounded instead. Promoted and relocated to MAJOR above. Recorded rather than quietly deleted, because the inversion is the evidence that the falsifier discipline is load-bearing.)*

---

# INFO

## BC-21 · INFO · `defineExpose` leaks two members nobody can use

`:515` exposes `anim` (the Pinia store — already reachable from anywhere via `useAnimationStore()`) and `drawImageOverlay` (signature `(s: CanvasSurface, view: ViewTransform)`, both of which are component-private: `surface` is never exposed and `getViewTransform` needs one). Repo-wide, only `exportFrame` is called (`VisualizationView.vue:100`, `FullscreenViewer.vue:138`). Two-thirds of the public surface is unusable by construction.

## BC-22 · INFO · exporting with no data downloads a fully transparent PNG

`:484` `if (data || basesData)` guards the draw but not the download — `:506-512` runs unconditionally, so a click with both datasets null saves an empty transparent PNG named `fourier-frame-<ts>.png`. In practice the export affordance is gated by `hasData` upstream (`VisualizationView.vue:230`), so this is defence-in-depth, not a live path.

## BC-23 · INFO · `needsMove || i === 0` — the second disjunct is unreachable-true

`:293`. `needsMove` initialises to `true` at `:280` and is only cleared at `:295`, so at `i === 0` the first disjunct already holds. Dead condition.

## BC-24 · INFO · per-frame tuple allocation in the hot path

`fourierPositionsAt` (`bases.ts:26-45`) allocates one `[number, number]` per component per call, plus the array. At the `n_harmonics: 200` default (`defaults.ts:7`) that is 201 arrays per call; `:140` and `:322` each call it once per frame, and `:150`/`:338` allocate a `slice` on top whenever `nVis < n`. ~12 000 short-lived arrays/second at 60 fps. The comment at `:137-139` correctly claims the *traversal* was halved; the allocation was not addressed. A caller-supplied `Float64Array` scratch buffer removes it entirely, matching the pattern `TrailManager` already uses (`trail.ts:12-13`).

## BC-25 · INFO · the shimmer and glow oscillators are a second reduced-motion gap

`golden-shimmer.ts:10-12` (`Math.sin(performance.now()/200)`) and `epicycles.ts:280` (`Math.sin(performance.now()/300)`) are time-driven oscillators with no `prefers-reduced-motion` consultation, reached from this component at `:170`, `:255`, `:261` and `epicycles.ts:280`. lane-frontend §7 flags the *clock*; these are two further motion sources on the same surface. Their observability is coupled to whatever redraw loop is running, so they are also the reason BC-10(b)'s shimmer loop must redraw the whole frame rather than a cached bitmap.

---

# The R5-7 class, applied

**R5-7 (ADOPT-AS-FACT, carry → F.W4):** loop evidence keyed to *component* callsites is blind to native element loops; **R6-5** cures it by adding a `NATIVE_TEMPLATE_LOOP` family (16 native loops, 17 diagnostics).

**This component is a strictly harder case, and R6-5's cure does not reach it.**

`BasisCanvas.vue`'s entire template is 9 lines (`:518-527`): one `<div ref="containerRef">` with three listeners, wrapping one bare `<canvas>`. Zero `v-for` of either kind — `grep -n "v-for" BasisCanvas.vue` → empty. A component-callsite deriver counts 0 loops; R6's native-element deriver also counts 0 loops. **Both are correct, and both are blind**, because the repetition is real and lives one layer below the DOM:

- `labels.ts:28-66` iterates `activeBases` and emits **one interactive row per basis** — icon, label, and a `LabelHitRegion` pushed at `:64`.
- Those regions are handed back through `:197` / `:370` to `hover.setLabelHitRegions`, and become the hit targets of a hand-rolled dispatcher at `useCanvasHover.ts:103-109` (hover) and `:154-160` (click/tap).

So there are **N interactive controls with 0 DOM nodes**: no element, no role, no accessible name, no focus, no keyboard path, and nothing for `page.getByRole()` to find. The generalisation R5-7 asks for is therefore one notch wider than R6-5 wrote it:

> Loop evidence keyed to *any* template construct — component callsite or native element — is blind to **imperatively-rendered repetition**. Canvas/WebGL instruments are the systematic case: repetition, hit-testing, hover state, and pinning all move out of the template into a bitmap and a hand-rolled dispatcher.

**Concrete consequence for F.W4's per-component D/L/C audit.** Any instance denominator built on this component reads "1 element, 0 loops, 0 interactive descendants". The truth is 1 element and up to 3 interactive rows (BC-4's arithmetic bounds it: `BasisSelector.vue:11,96-105` makes the fourier modes exclusive). Both R5's and R6's derivations under-count this file by the same 3. The census's own architecture row — CENSUS §3a, "three independent canvases … Canvas2D throughout" — is the population marker: **every** canvas surface in the fourier tree is a candidate for this blind spot, and `ConvergencePlot.vue` (410 LOC, own rAF) and `FrequencyGraph.vue` (247, hover-dispatching at `:196`) should be checked for the same pattern before any percentage is published.

**Falsifier:** *the labels are also rendered in the DOM somewhere.* `BasisCanvas.vue`'s template is 9 lines, reproduced in the read set; there is no overlay, no `<ul>`, no ARIA live region. `BasisSelector.vue:139` renders a *separate* DOM control list — a different affordance (selection), in a different panel, not a mirror of the canvas legend's hover/pin state. Dead.
*R6-5's `NATIVE_TEMPLATE_LOOP` family covers it.* R6-5 keys on native template elements; there is no template loop of any kind here. Dead.

---

# Superlatives (L-18 runs both ways)

## S-1 · `useViewTransform.ts:15-46` — the memoised data bbox, with the *before* still in the tree as proof

The `computed` hoists the path-bounds scan out of the per-frame path and replaces a variadic `Math.min(...xs)` with a single linear pass. The 8-line comment names the exact mechanism it avoids (an arguments array of length `n_points`, and V8's argument-count ceiling at n ≈ 10k). This is not decoration: the superseded implementation is **still in the tree** at `canvas-drawing/transforms.ts:15-18`, spread and all, so the diff is verifiable without archaeology.

**Falsifier:** *the `computed` re-evaluates per frame anyway.* Its dependencies are `store.epicycleData` / `store.basesData`, both `shallowRef` (`workspace.ts:44-45`) written only with `markRaw` results (`:171-172, 224, 252, 299, 328`). Identity is stable across a compute pass, so the memo holds for every intervening frame. Survives.

## S-2 · `workspace.ts:57-58, 138-139, 289, 298, 314, 327` — split revision counters that name the bug they cure

Splitting `epicycleRevision`/`basesRevision` out of the shared `revision` is a precise fix to a precise race, and the comment states the failure mode rather than the mechanism: *"so that `loadWorkspace` incrementing `revision` doesn't cause compute results to be silently discarded, which triggers an infinite retry loop in the auto-compute watcher."* Cause → symptom → consequence in one sentence. This is the standard the rest of the file's comments meet and most codebases do not.

**Falsifier:** *the split is cosmetic — one counter would do.* `loadWorkspace` bumps all three (`:138-141`) while `runComputeEpicycles` compares against only its own (`:289, 298`); with a single counter a concurrent load would invalidate an in-flight compute whose result is still wanted. The asymmetry is load-bearing. Survives.

## S-3 · `BasisCanvas.vue:374-423` — a three-way watcher split along the right seams

Trail-invalidating (A) / layout-invalidating (B) / clock-driven (C), each with a written rationale for what is *deliberately absent* — "`basesData` is intentionally NOT here — it belongs in the data watcher above" (`:417`), "does NOT touch trail so epicycle animation stays continuous" (`:401`). The non-obvious property this buys: the epicycle trail survives the arrival of a Chebyshev/Legendre dataset mid-animation, which a single naive watcher would visibly reset. Correct decomposition, correctly justified.

**Falsifier:** *BC-18's double-fire means the split is wrong.* No — BC-18 is a redundant *trigger*, curable by narrowing watcher B's source to the polynomial subset; it does not argue for merging the three. The seams are right; one source is too wide. Survives.

## S-4 · `epicycles.ts:164-190` — DC-term suppression, argued from the physics

The `index === 0` branch replaces the c₀ circle with a centre marker because *"the chain is amplitude-sorted, so the `index === 0` (frequency 0) component lands first and would render as a stationary disc of radius |c₀| — potentially the size of the whole figure"* — and it still draws the arm, so the chain is not broken. Correct reasoning, correct fix, and the non-obvious half (keep the arm) is explained rather than left to be re-derived.

**Falsifier:** *the DC term never has large magnitude, so the branch is dead.* c₀ is the centroid of the contour in image coordinates; `ContourAsset.image_bounds` (`types.ts:76`) is an arbitrary pixel-space box, so |c₀| is routinely the same order as the figure. The branch is load-bearing. Survives.

## S-5 · `animation.ts:99-106` + `BasisCanvas.vue:454-459` — airtight visibility bookkeeping

Reference-counted with an underflow clamp (`Math.max(0, …)`, `animation.ts:102`), an explicit stop at zero (`:104`), a resume that respects user intent rather than overriding it (`:105`, `playing` stays the intent flag), and — the part usually forgotten — a **conditional release on unmount** guarded by the instance's own last-known state (`BasisCanvas.vue:458` `if (lastVisible)`), so a canvas that unmounts while off-screen does not double-decrement. The `lastVisible` dedupe at `:445` also prevents IO's initial-state callback from double-counting.

**Falsifier:** *the count can still leak.* Trace every path: mount-with-IO registers nothing until the first callback (`:442-451`); mount-without-IO registers `+1` and sets `lastVisible = true` (`:438-439`); every callback toggles both together (`:446-447`); unmount releases iff `lastVisible` (`:458`). Balanced on all four. BC-10 attacks the **sensor**, not the counter — the counter is correct for whatever it is told. Survives.

## S-6 · `trail.ts:12-38, 51-68` — the scrub buffer discipline (narrowed by BC-20)

Two things here are genuinely good and stay good under BC-20. First, `precompute` builds two `Float64Array`s once per dataset (`:15-24`) and `update`'s scrub branch (`:51-59`) reconstructs an arbitrary-`t` prefix from them in a single pass — so dragging the scrubber backwards produces the *correct* trail rather than a smeared one, which is the hard half of the interaction. Second, the `reset()` / `clearTrail()` split (`:26-38`) lets a mode toggle drop the visible trail while **keeping** the expensive buffers, and drop the buffers only when the dataset itself goes away — exactly the right seam, and `BasisCanvas.vue:381-389` uses both correctly.

**Falsifier — and this one bites, so the superlative is narrowed:** *BC-20 shows the module is wrong.* BC-20 shows the **predicate** at `:48` is mis-tuned into unreachability, and that the append branch is unbounded. Neither touches the buffer machinery or the reset/clear split, which are what is being credited here — and the `Float64Array`s are precisely what makes BC-20's cure (a length cursor) a few lines rather than a rewrite. **Credit narrowed from "handles all three regimes" to "the scrub path and the buffer lifecycle"; the loop-back regime is BC-20's defect, not this superlative's.** Survives as narrowed; would not have survived as originally written.

---

# Standing (what this challenge asserts)

The component is **DEFECTIVE**, and its defects are not evenly distributed. The engineering *inside* the extracted modules is good and in several places excellent (S-1, S-2, S-4, S-6). The failures cluster at exactly three seams:

1. **The palette boundary** (BC-1, BC-5) — a resolver written for an hsl-era producer, plus a module-eval snapshot, jointly kill colour correctness. One is a BLOCKER; together they make the same basis render in two wrong colours in one frame. This is the single highest-value repair in the file and it is ~6 lines.
2. **The export fork** (BC-2, BC-3, BC-4, BC-12, BC-13) — `exportFrame` is a hand-copied `drawFrame` that has drifted in three directions, typed with a bag that hides the drift. Five defects, one root cause: `drawFrame` is not parameterised on its target surface.
3. **The two-mode fork** (BC-6, BC-7, BC-8, BC-11) — `drawEpicycleFrame` and `drawMultiBasesFrame` share ~60 lines that have drifted in four places, one of which (BC-7) is a live behavioural bug and one of which (BC-6) silently deletes an intended effect.

Plus three standalone truths worth carrying independently: **half the persisted animation contract is write-only** (BC-9 — `max_circles`, `duration`, `fps`; two of them shadowed by disagreeing hardcoded constants, so a gallery entry cannot reproduce its own frame); an **unbounded trail array** whose bounding predicate was rendered unreachable by the same dropped `duration` wiring (BC-20 — one event, two defects); and an off-screen gate whose comment overstates its own coverage in the exact case it names (BC-10).

None of the 25 requires a browser to establish. Two carry an explicitly scoped **UNPROVEN-NEEDS-LIVE (SS-13)** tail — BC-10's frame-cost figures and BC-20's degradation curve — and in both cases the *existence* of the defect is arithmetic over the source while only the *magnitude* awaits a live read. One finding (BC-20) was inverted mid-audit by its own falsifier and is recorded as such rather than silently corrected. The live tree is the whole evidence base, and every claim above — superlatives included, per L-18 — carries the falsifier that would kill it.
