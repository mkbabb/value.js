claude-opus-5[1m]

# CHALLENGE · `BasisCanvas.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisCanvas.vue` (547 lines)
**Mode** static, read-only. No browser tooling. Every livable-only claim is tagged `UNPROVEN-NEEDS-LIVE` (SS-13).
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` — the coordinate the intake lane pins as byte-identical to the live tree (`lane-fourier-r3-r6.md` R4-9, §0). glass-ui **4.0.0 installed** (`node_modules/@mkbabb/glass-ui/package.json`), producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a falsifier; L-18 runs both ways, so the four superlatives in §5 carry falsifiers too.

**Read whole (read-only):** the subject; `lib/canvas-drawing/{index,types,transforms,grid,ghost-path,trail,epicycles,labels,placeholder}.ts`; `lib/basis-display.ts`; `composables/{useCanvasSetup,useCanvasHover,useImageOverlay,useViewTransform}.ts`; `src/lib/{colors,golden-shimmer,bases}.ts`; `src/stores/animation.ts`; both consumers (`VisualizationView.vue`, `FullscreenViewer.vue`); `ExportModal.vue`; `src/style.css`; glass-ui 4.0.0 `dist/styles/**` token + card cascade; producer 7.0.0 `src/styles/index.css` + `src/components/card/styles.css`.

**Tally — 27 defects · 4 BLOCKER · 9 MAJOR · 12 MINOR · 2 INFO · 4 superlatives · 2 corpus corrections.**

---

## §0 · The one-paragraph verdict

`BasisCanvas` is a **structurally excellent, chromatically dead** component. Its lifecycle engineering is the best in the fourier tree — reference-counted off-screen rAF gating that cannot leak its credit, a three-way watcher split that keeps the epicycle animation continuous while a second basis loads, a time-invariant bbox that stops the inset from breathing. But its *visible surface* is broken in ways nothing in the corpus has yet named: **the entire `--viz-*` palette resolves to a single fallback grey `#888888`** because the resolver cannot parse the only color form glass-ui 4.0.0 ships (`oklch()` / `light-dark()`), while the legend swatches froze at a *different*, pre-resolution palette at module-eval time — so the legend does not match the mark it labels, and neither responds to the dark-mode toggle the app installs a `MutationObserver` for. On top of that the canvas is wholly absent from the accessibility tree, two of the export dialog's four switches are inert, and the signature epicycle inset is anchored in the one corner that both the bottom dock and the canvas edge contest — then grows *through* that edge on hover. The intake lane's motif holds here exactly: **the measurements are sound, the presentation is not.**

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The viz palette resolves to a single fallback grey — the canvas has no colour system at runtime

**Claim.** Every `VIZ_COLORS.fourier|chebyshev|legendre|green` read on this canvas evaluates to the parser's fallback `"#888888"`, in **both** themes.

**Provenance.**
- `web/src/lib/colors.ts:22-53` — `cssVarToHex()` matches exactly four forms: `#hex` (`:29`), `hsl(…)` (`:32-34`), a bare Tailwind triplet `h s% l%` (`:40`), and `rgb(…)` (`:46-48`). Anything else falls through to **`:53 return "#888888"`**.
- glass-ui 4.0.0 defines those tokens **only** in `oklch()`:
  `dist/styles/tokens/color-radius.css:263-265` → `--viz-fourier: oklch(0.579 0.201 30.4); --viz-chebyshev: oklch(0.484 0.163 265.5); --viz-legendre: oklch(0.532 0.180 317.5);`
  `dist/styles/tokens/dark-arm.css:113-115` → the dark arm, also `oklch()`.
  `dist/styles/tokens/light-dark.css:145-147` → `light-dark(oklch(…), oklch(…))` — **neither arm parseable, and the wrapper isn't either**.
  `--viz-green` is an alias onto `--section-color-4` = `oklch(0.551 0.088 171.1)` (`color-radius.css:245,267`).
- `web/src/lib/colors.ts:90-96` `resolveVizColors()` **overwrites** the reactive defaults with those fallbacks; `App.vue:11` calls it on mount and `App.vue:12-17` re-calls it on every `.dark` class flip.
- fourier overrides exactly **one** viz token into a parseable form — `--viz-amber` (`web/src/style.css:120,125`, `hsl(…)`). The three basis colours are **not** overridden (`grep -rn -- "--viz-" web/src/` → only the amber rows).

**Blast radius inside this component.** `BasisCanvas.vue:127` trail colour · `BasisCanvas.vue:326` multi-mode epicycle colour · `epicycles.ts:258` connecting line (`hexToRgba(VIZ_COLORS.fourier, 0.25)` → `rgba(136,136,136,0.25)`) · `epicycles.ts:283` tip glow · `labels.ts:89` the dead epicycle label. The **traced reconstruction curve — the single most important mark on the surface — draws mid-grey.**

**Falsifier.** Open the app and evaluate `getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')`. If an engine returns an `rgb()`/hex serialisation, `cssVarToHex` resolves and this collapses. It will not: CSS Custom Properties L1 §3 makes the computed value of an *unregistered* custom property the specified token sequence with `var()` substituted — not a parsed colour; and a `@property`-registered `<color>` serialises in its own canonical form (`oklch(…)`/`color(…)`), still unmatched by all four regexes. `UNPROVEN-NEEDS-LIVE` only for the exact rendered swatch; the unreachability of the four branches is static and total.

**Corpus.** Not in `lane-frontend.md` (§8 records the palette pipeline as working: *"Palette resolved once at app boot from CSS custom properties … re-resolved on `.dark` toggle"*). **This challenge contradicts that line**: the pipeline runs, and it produces grey.

---

### D-2 · BLOCKER · Legend swatch ≠ the mark it labels, and neither follows the theme

**Claim.** `basisDisplay` captures `VIZ_COLORS.*` **by value at module-evaluation time**, i.e. before `resolveVizColors()` ever runs, so the legend renders the *original* defaults (`#bf4040` / `#3d72b8` / `#9545b8`) permanently, while the curves and trail render whatever `VIZ_COLORS` holds at draw time (per D-1, `#888888`). The same "Fourier" basis therefore paints in **two different colours on the same canvas**, and the `MutationObserver` at `App.vue:12-17` cannot repaint either.

**Provenance.**
- `lib/basis-display.ts:3-7` — a module-scope object literal: `fourier: { …, color: VIZ_COLORS.fourier }`. A string read, copied once, never re-read. `VIZ_COLORS` is `reactive` (`colors.ts:77`), but this is not a getter, a `computed`, or a render function — nothing re-evaluates it.
- `colors.ts:78-80` — the pre-resolution defaults that get frozen: `fourier "#bf4040"`, `chebyshev "#3d72b8"`, `legendre "#9545b8"`.
- Consumers of the frozen copy: `labels.ts:39` legend fill (`cfg.color`) and `BasisCanvas.vue:257` the multi-basis stroke (`cfg.color`).
- Consumers of the live (grey) value: `BasisCanvas.vue:127`, `:326`; `epicycles.ts:258,283`.

**Failure scenario.** Two bases active. The Chebyshev curve strokes `#3d72b8` (frozen) while the epicycle trail strokes `#888888` (live) — and the ℱ legend row that *names* the trail is painted `#bf4040`. Flip to dark mode: the observer fires, `resolveVizColors()` re-runs, and nothing on the canvas changes colour, because one path is frozen and the other's fallback is theme-independent.

**Falsifier.** If `basis-display.ts` were evaluated lazily *after* `onMounted` (it is not — it is a static import reached from `BasisCanvas.vue:8` and `labels.ts:2`), or if the literal read a getter, the two paths would agree. Neither holds. Independent of D-1: even if `cssVarToHex` gained an oklch branch, the frozen legend would *still* diverge — **D-2 must be fixed even after D-1 is.**

---

### D-3 · BLOCKER · The product's central artifact is invisible to assistive technology, and every affordance it draws is pointer-only

**Claim.** The `<canvas>` carries no accessible name, no `role`, no `aria-*`, and no fallback content; the interactive regions the component draws into it (basis legend rows with hover + pin/unpin) are reachable only by mouse. WCAG 2.2 **1.1.1** and **2.1.1** both fail.

**Provenance.**
- `BasisCanvas.vue:526` — `<canvas ref="canvasRef" class="canvas-el" />`. Self-closing: **no fallback children**, no `aria-label`, no `role="img"`. `grep -rn "<canvas" web/src/` returns three canvases; none carries an accessible name.
- `BasisCanvas.vue:519-525` — the container is a bare `<div>` with `@mousemove` / `@mouseleave` / `@click`. No `tabindex`, no `role`, no `@keydown`.
- `useCanvasHover.ts:102-115` (hover) and `:137-183` (`onClick` → pin/unpin `pinnedBasis`) — a real toggle state, exposed **only** through pointer coordinates hit-tested against `labelHitRegions` (`labels.ts:64`). There is no DOM node per region, so no focus target can exist.
- The changing `N = k` readout (`BasisCanvas.vue:197`, `:370`) has no `aria-live` mirror anywhere in the component or either consumer.

**Why the existing gate is green anyway.** `e2e/visualization-ux.spec.ts:26-38` injects axe-core and asserts zero serious/critical violations over the visualization route. axe ships **no rule that flags a `<canvas>` without an accessible name** — the audit passes precisely because the surface is opaque to it. A green a11y gate here is evidence of the rule set's blind spot, not of conformance.

**Falsifier.** Point a screen reader at `/w/:slug` and enumerate the canvas subtree; if anything is announced beyond the container, the claim collapses (`UNPROVEN-NEEDS-LIVE` for the announcement transcript). The DOM claim itself is static and exhaustive: there is no attribute, no child, no sibling description element.

---

### D-4 · BLOCKER · Two of the four export switches are inert — the dialog reports options the exporter never reads

**Claim.** `ExportModal` presents **Epicycles** and **Trace path** toggles and emits them; `exportFrame` destructures only `withGrid` and `withLabels`. Turning either off changes nothing in the produced PNG.

**Provenance.**
- `ExportModal.vue:36-41` — emits `{ withEpicycles, withTrail, withGrid, withLabels }`.
- `ExportModal.vue:55-70` — all four rendered as `<Switch>` rows with labels *Epicycles*, *Trace path*, *Grid lines*, *Labels*.
- `BasisCanvas.vue:466-469` — `const { withGrid: showGrid = true, withLabels: showLabels = true } = options;` — **`withEpicycles` and `withTrail` are never read.**
- `grep -rn "withEpicycles\|withTrail" web/src/` → 4 hits, all inside `ExportModal.vue`. No other consumer.
- `BasisCanvas.vue:492-496` re-enters `drawEpicycleFrame` / `drawMultiBasesFrame` unconditionally, so the epicycle chain and the trail are always drawn.

**Failure scenario.** A user exporting a clean reconstruction turns *Epicycles* and *Trace path* off, clicks **Save PNG**, and receives a frame with both still in it. Nothing errors; the artifact is silently wrong.

**Falsifier.** Export with `withEpicycles:false` and diff against `withEpicycles:true`; identical bytes confirm. Static path is already conclusive — the identifiers do not appear in the exporter.

---

## §2 · MAJOR

### D-5 · MAJOR · Hover-growing the epicycle inset drives it off the left and bottom edges of the canvas

**Claim.** The inset's fit centre is cached at the **base** scale and never recomputed; the hover multiplier then scales the box about that fixed centre by `0.55 / 0.38 = 1.447×`, pushing its left edge to `pad − 0.2237·baseScaledW`, which goes negative for any `baseScaledW > 53.6 px`.

**Provenance.**
- `epicycles.ts:7-8` — `BASE_EPICYCLE_SCALE = 0.38`, `HOVER_EPICYCLE_SCALE = 0.55`.
- `epicycles.ts:72` `pad = 12`; `:75-86` the centre is computed **once** and memoised into `baseFitCenter` (`cx = pad + baseScaledW/2`, `cy = height − pad − baseScaledH/2`).
- `epicycles.ts:89-92` — `hoverMul = currentScale / BASE_EPICYCLE_SCALE`; `scaledW = bboxW · baseFitScale · hoverMul`.
- `BasisCanvas.vue:161-165` / `:349-353` cache `baseFitCenter` across frames; it is invalidated only by the two data watchers (`:382`, `:405`) and on resize (`:60`), never by hover.
- Draw uses that centre directly: `epicycles.ts:152-156` `translate(targetCX, targetCY) · scale(fitScale) · translate(−bboxCX, −bboxCY)`.

**Arithmetic.** On a 1200×700 stage, `baseRegionW = 0.38·1200 = 456`, so `baseScaledW ≈ 456`. Hovered left edge `= 12 + 228 − 330 = −90 px`; hovered bottom edge `= 700 − 12 − 165 + 239 = 762 > 700`. **≈90 px clipped left, ≈62 px clipped below** — and the container is `overflow: hidden` (`BasisCanvas.vue:533`), so it is a hard cut, not an overflow. The interaction *intended* to reveal more of the chain reveals less of it.

**Falsifier.** If `baseScaledW ≤ 53.6 px` (a bbox so tall the height limit dominates and the fit collapses) the box stays inside. Compute `bboxW·bfs` for any realistic contour — `computeStableEpicycleBbox` (`epicycles.ts:32-53`) unions all circle extents over 32 phase samples, so the bbox tracks the figure and `bfs` is set by whichever of `0.38W / 0.38H` binds. `UNPROVEN-NEEDS-LIVE` for the pixel count; the sign of the inequality is unconditional for any inset wider than ~54 px.

---

### D-6 · MAJOR · The epicycle inset is anchored under the floating transport dock

**Claim.** The inset occupies the bottom-left of the stage; the `AnimationControls` dock is a bottom-centred bar up to 960 px wide sitting 12 px from the same edge. On any stage narrower than ~2400 px they overlap.

**Provenance.**
- Inset: `epicycles.ts:82-83` — `cy = height − pad − baseScaledH/2` with `pad = 12`, `cx = pad + baseScaledW/2`. Bottom-left, 12 px inset, spanning up to `0.38·W × 0.38·H`.
- Dock: `VisualizationView.vue:412-418` `.controls-overlay { position:absolute; bottom:0.75rem; left:0.375rem; right:0.375rem; justify-content:center }` hosting `AnimationControls` (`:235-237`); `AnimationControls.vue:25,135` — `maxWidth: "960px"`, `width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem))`.

**Arithmetic.** Stage 1200 px: the dock spans x ∈ [120, 1080]; the inset spans x ∈ [12, ~468]. Horizontal overlap ≥ 348 px, and both are pinned to `bottom: 12 px`. Under D-5's hover expansion the inset grows *upward and leftward through* the dock. Below ~976 px stage width the dock is effectively full-bleed and the overlap is total.

**Falsifier.** Measure the two bounding boxes live (`UNPROVEN-NEEDS-LIVE` for the vertical extent — the dock's own height is not fixed in source). The horizontal overlap is arithmetically certain for every stage width ≤ 2400 px; a stage that wide does not exist in the `Configurator` grid (`VisualizationView.vue:317-330` caps the aside at 440 px on a 1536 px breakpoint).

---

### D-7 · MAJOR · Every neutral text the canvas draws fails WCAG AA in both themes

**Claim.** The placeholder message, the `N = k` legend row, and the axis labels are painted `rgba(150,150,150,α)` — a hard-coded grey with no theme awareness — over `--card`. Measured contrast: **1.77:1** and **1.97:1** in light, **2.71:1** in dark. AA normal text requires 4.5:1.

**Provenance.**
- Backdrop is exactly `--card`: `web/src/style.css:107-111` `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card) }`, applied at `BasisCanvas.vue:521`. glass-ui 4.0.0: `--card: hsl(36 48% 97%)` light (`tokens/color-radius.css:72`) ≈ `rgb(251,248,244)`; `hsl(24 8% 16%)` dark (`tokens/dark-arm.css:64`) ≈ `rgb(44,40,38)`.
- `placeholder.ts:55-60` — `fillStyle = "rgba(150,150,150,0.6)"`, `font = "500 15px 'Fira Code', monospace"`, text *"Drag & drop an image here"* / *"Computing..."*. Composited: `#BEBDBC` on light → **1.77:1**; `#6C6A69` on dark → **2.71:1**.
- `labels.ts:70-73` — the `N = k` readout at `rgba(150,150,150,0.7)`, `bold 16px`. Composited `#B4B3B2` on light → **1.97:1**. 16 px bold is *not* WCAG large text (needs ≥18.66 px bold), so 4.5:1 applies.
- `grid.ts:90-92` — axis labels at `rgba(150,150,150,0.35)`, worse still.
- The token that already exists and is documented to pass: `--muted-foreground: var(--neutral-5)` = `hsl(30 22% 40%)`, annotated in the producer as *"WCAG AA: 5.21:1 vs page"* (`tokens/color-radius.css:45,85`).

**Corpus.** This is the same class of defect the repo already banked and fixed once — `style.css:113-118` darkens light `--viz-amber` from 3.54:1 to 4.6:1 explicitly for axe. The canvas escaped that sweep because axe cannot read pixels inside a canvas (see D-3).

**Falsifier.** Recompute against the live resolved `--card`; if fourier ever overrides it the numbers move. `grep -rn -- "--card" web/src/` shows only *consumers*, no redefinition — the values above are the shipped ones.

---

### D-8 · MAJOR · Zero `prefers-reduced-motion` handling on the app's primary motion surface, which auto-plays

**Claim.** Three independent rAF drivers repaint this canvas, none gated on reduced motion, and playback starts by itself when data arrives.

**Provenance.**
- `grep -rn "prefers-reduced-motion\|reducedMotion" BasisCanvas.vue useCanvasHover.ts stores/animation.ts` → **no match** in any of the three.
- Driver 1 — the store clock: `stores/animation.ts:51-75` (gated on visibility + `playing`, not on PRM).
- Driver 2 — the hover-scale spring: `useCanvasHover.ts:52-63` `updateHoverScale()` self-schedules `requestAnimationFrame` and calls `onRedraw()` every frame until it settles.
- Driver 3 — the shimmer loop: `useCanvasHover.ts:67-75` `startShimmer()` repaints the **whole canvas** at 60 fps for as long as a basis is hovered *or pinned*, feeding `goldenShimmerAlpha()` (`golden-shimmer.ts:11-13`, a `sin(now/200)` oscillation ≈ 5 Hz). Pinning (`useCanvasHover.ts:170-173`) makes that loop persist with no pointer present.
- Auto-play: `composables/useWorkspaceLoader.ts:96-118` — *"Auto-play when computation data first arrives"* → `anim.reset(); anim.play()`.
- Also unconditional: the tip-dot pulse `0.2 + 0.1·sin(performance.now()/300)` (`epicycles.ts:280`).

**Why this exceeds the census.** `lane-frontend.md §8` flags exactly two ungated clocks (`stores/animation.ts`, `ConvergencePlot.vue`) and books it **P3 / carry 9**. Drivers 2 and 3 are *interaction* animations — WCAG **2.3.3 (Animation from Interactions, AAA)** and the 2.2.2 spirit — and are **not named anywhere in the corpus**. Under `reduce`, hovering a legend row starts a 5 Hz full-canvas luminance oscillation. Severity should rise from P3.

**Falsifier.** Set `prefers-reduced-motion: reduce` and observe. If glass-ui's cascade blanket-kills motion the CSS side is covered — it does not: the three PRM blocks in `dist/styles/animations.css:239,279,369` are scoped to `scrim-breath`, `[data-scrim-animation]`, and `.glass-top-layer[popover]`. None touches canvas painting, which is JS anyway.

---

### D-9 · MAJOR · The `N = k` legend describes nothing that is drawn (single-epicycle mode)

**Claim.** In epicycle-only mode the chain and the trail are always computed from the **full** component list, while the legend animates a term counter derived from `easedT`. The number is decorative and misleading.

**Provenance.**
- `BasisCanvas.vue:140` — `fourierPositionsAt(components, anim.t, components.length)` — **the whole chain, every frame**.
- `BasisCanvas.vue:148-150` — the drawn overlay is `allPositions` sliced to `nVis = min(80, components.length)` (`:135`), which is **independent of `level`**.
- `BasisCanvas.vue:196-197` — `const level = Math.max(1, Math.ceil(anim.easedT * components.length)); drawBasisLabels(s, ["fourier-epicycles"], \`N = ${level}\`, …)`. `level` is used **only** in that template string.
- Contrast the multi-basis path, where `level` is load-bearing: `BasisCanvas.vue:229-241, 274-275` index `partial_sums[level]`.
- **The retired label was correct.** `labels.ts:81-103` `drawEpicycleLabel()` renders `t = 0.42` — the readout that actually describes epicycle mode. It is exported (`index.ts:18`) and called **nowhere** (`grep -rn "drawEpicycleLabel" web/src/` → 2 hits, both declarations).

**Failure scenario.** A viewer watching the epicycles reads *"N = 3"* while a fully-converged reconstruction traces beneath 80 spinning circles, and concludes the series converges at three terms.

**Falsifier.** If any draw call in the epicycle path consumed `level`, the readout would be honest. Trace every use: line 196 defines it, line 197 interpolates it, nothing else in `drawEpicycleFrame` mentions it.

---

### D-10 · MAJOR · No error state — a failed compute shows "Computing…" forever

**Claim.** `drawPlaceholder` has exactly two strings and no error branch; the flag it switches on is *"an image exists"*, not *"a computation is running"*. A failed compute with an image loaded leaves the canvas asserting perpetual progress.

**Provenance.**
- `placeholder.ts:59` — `const msg = hasImage ? "Computing..." : "Drag & drop an image here";` — the complete state vocabulary.
- `BasisCanvas.vue:86-88` — `drawPlaceholder(s, !!store.imageMeta)`. The argument is `imageMeta`, **not** `store.computing`. The component never reads `store.computing` or `store.error` (`grep -n "store\." BasisCanvas.vue` → only `epicycleData`, `basesData`, `imageMeta`).
- The store does produce errors: `stores/workspace.ts:256` *"Contour extraction failed"*, `:303` *"Epicycle computation failed"*, `:332` *"Bases computation failed"*.
- The parent's error branch is gated off for exactly this case: `VisualizationView.vue:162` — `v-else-if="store.error && !store.imageSlug"`. With an image loaded, `imageSlug` is set, so the branch never renders.
- The only surviving error surface is `ContourSettings.vue:311-318` (a retry banner) — which lives in the **controls aside**, and on mobile the aside is a *different tab* (`VisualizationView.vue:181-186`, `:197` `panel-inactive`). A user on the Canvas tab sees "Computing…" and nothing else.

**Falsifier.** Force a 500 on the compute endpoint with an image loaded and read the canvas. If a toast or overlay appears, the claim narrows — `grep -rn "toast(" VisualizationView.vue` shows toasts only on the publish path (`:111,:114`).

---

### D-11 · MAJOR · "Labels off" export punches a blind transparent hole and still misses the legend

**Claim.** Label suppression is implemented as a fixed `clearRect(0, 0, 200, 100)`. It erases *everything* in that rectangle — grid, ghost path, curve, trail — and at three active bases it does not even cover the legend it is meant to remove.

**Provenance.**
- `BasisCanvas.vue:498-500` — `if (!showLabels) { offCtx.clearRect(0, 0, 200, 100); }`. A magic rectangle, not a re-draw-without-labels.
- Legend geometry: `labels.ts:23,26` `xBase = 16`, `yOff = 16`; `:65` rows advance 26 px; `:73` the `N` row is drawn at `yOff − 4` with `bold 16px`. **Three bases** → rows at 16 / 42 / 68, `N` row at **y = 90**, occupying ~90–109 px. **The bottom ~9 px of the `N = k` row survives a `withLabels:false` export.**
- The rectangle is in CSS px (the offscreen ctx is DPR-transformed at `:476`), so it does not scale with content.
- The top-left is exactly where the grid, ghost path and (frequently) the traced curve run — `grid.ts:31-44` strokes the full canvas height/width.

**Failure scenario.** Export a frame with labels off: the PNG has a 200×100 transparent notch in the top-left corner with the grid and any curve passing through it sliced away, plus a sliver of orphaned legend text if three bases are active.

**Falsifier.** Export with `withLabels:false` on a figure whose ghost path crosses the top-left corner (`UNPROVEN-NEEDS-LIVE` for the screenshot). The arithmetic — 4 label rows × 26 px + the 16 px origin > 100 px — is static.

---

### D-12 · MAJOR · The component hard-codes its own card chrome, and its own consumer must strip it

**Claim.** `BasisCanvas`'s root carries `cartoon-card` — a 2 px border, an offset-stamp shadow and a hover-lift — baked into the component rather than supplied by the host. Its fullscreen consumer then spends four `:deep()` resets undoing it.

**Provenance.**
- `BasisCanvas.vue:521` — `class="canvas-container cartoon-card"`. The scoped block (`:530-547`) styles only layout; the entire visual identity comes from the global shim.
- The shim: `style.css:107-111` → `@apply cartoon-surface` + `border-color` + `background`. `cartoon-surface` in the installed 4.0.0 (`dist/styles/cards.css:33-48`) = `border-width: 2px`, `box-shadow: var(--shadow-cartoon-md)`, and on hover `translate: var(--lift-sm) var(--lift-sm)` (`tokens/offsets-sizing.css:10` → `-1px`) + `--shadow-cartoon-lg`, transitioned over `--duration-normal`.
- The undo: `FullscreenViewer.vue:163-175` —
  ```
  .fs-container :deep(.canvas-container)      { border:none; border-radius:0; box-shadow:none; … }
  .fs-container :deep(.canvas-container:hover){ border-color:transparent; box-shadow:none; }
  ```
  Two `:deep()` rules and five property resets exist solely to cancel a decision the child made.

**Secondary consequence.** The hover-lift fires whenever the pointer is anywhere over the canvas — i.e. throughout the hover-target interaction of D-3 — nudging the whole surface by 1 px diagonally with a `--duration-normal` transition on a large box-shadow, on the app's busiest repaint surface.

**Falsifier.** If a consumer needed the card chrome and could not add the class itself, baking it in would be justified. Both consumers wrap `BasisCanvas` in their own container (`VisualizationView.vue:198`, `FullscreenViewer.vue:121`) and one actively removes it — the chrome is host-supplied by construction.

---

### D-13 · MAJOR · The same epicycle chain renders at two different stroke weights and two different z-orders

**Claim.** The single-basis and multi-basis paths draw an identical object with different line weights and a different stacking order, with no stated rationale. Toggling on a *second* basis silently re-weights the *first*.

**Provenance.**
- Weights: `BasisCanvas.vue:172` `{ circle: 4, arm: 3.5 }` vs `BasisCanvas.vue:356` `{ circle: 5, arm: 4.5 }` — the same `drawEpicycleCircles` signature (`epicycles.ts:140`), +25 % / +29 %.
- Z-order: single mode is trail (`:144`) → circles (`:172`) → connecting line (`:189`) → **tip dot (`:193`)**; multi mode is trail (`:330`) → **tip dot (`:333`)** → circles (`:356`) → connecting line (`:365`). The tip dot — a 20 px glow plus a 9 px solid disc (`epicycles.ts:279-296`) — sits **over** the epicycles in one mode and **under** them in the other.

**Falsifier.** If the multi-basis mode drew at a systematically smaller scale, heavier strokes would be a deliberate compensation. It does not: both call sites feed the same `view`, the same `fit`, and the same `eAlpha` (`:153` / `:341`). No comment in either block mentions the difference.

---

## §3 · MINOR

### D-14 · MINOR · The "golden shimmer on epicycle circles" is dead code
`BasisCanvas.vue:168-171` sets `s.ctx.globalAlpha = goldenShimmerAlpha()` before `drawEpicycleCircles`. Every draw operation inside that function assigns its own `globalAlpha` before painting — `epicycles.ts:174, 183, 196, 208, 219, 227` — so the outer value is overwritten before the first stroke lands. The hovered chain recolours but does **not** shimmer; the comment claims otherwise. *Falsifier:* find one paint op in `drawEpicycleCircles` that inherits the ambient alpha — the first, at `:171-175`, sets `0.75 * epicycleAlpha`.

### D-15 · MINOR · Three different insets on the same two edges
Left edge: legend at **16 px** (`labels.ts:23`), epicycle inset at **12 px** (`epicycles.ts:72`). Top edge: legend at **16 px** (`labels.ts:26`) vs the controls dock anchor at **8 px** (`VisualizationView.vue:452-453`, `top: 0.5rem; right: 0.5rem`). Three optical margins on two edges of one surface; nothing aligns to a shared step. *Falsifier:* if the canvas-drawn 16 px were compensating an optical overhang of the ℱ glyph, `iconYAdj` would already do it — `labels.ts:49` handles that separately (`8` / `2`).

### D-16 · MINOR · `image-rendering: crisp-edges` on an anti-aliased vector canvas
`BasisCanvas.vue:545`. The backing store is sized `Math.round(rect.width * dpr)` while the CSS box is `rect.width` px (`useCanvasSetup.ts:25-28`) — at fractional DPR (1.5, 2.25, or any browser zoom) the rounding makes the two disagree and the browser resamples. `crisp-edges` forces nearest-neighbour on content that is entirely smooth curves and anti-aliased text. *Falsifier:* at integer DPR with no zoom the mapping is exact and the property is inert; `UNPROVEN-NEEDS-LIVE` for the visible jaggedness at 150 % zoom. The property is nonetheless the wrong hint for this content class.

### D-17 · MINOR · Canvas typography is unhooked from font loading
The canvas requests `'Computer Modern Serif', Georgia, serif` (`labels.ts:50`, `grid.ts:92`) and `'Fira Code', monospace` (`labels.ts:55,71`; `placeholder.ts:56`) — the app's identity faces, preloaded at `index.html:10-13`. `grep -rn "document.fonts\|FontFace" web/src/` → **no match**. Canvas text does not reflow when a face loads, and nothing schedules a redraw on `document.fonts.ready`, so a first frame drawn pre-load renders in Georgia/monospace and stays there until an unrelated watcher fires. *Falsifier:* throttle the font requests and screenshot the first painted frame (`UNPROVEN-NEEDS-LIVE`); the absence of any font-loading hook is static.

### D-18 · MINOR · The epicycle spectrum is a saturated rainbow in an academic palette
`transforms.ts:3-8` — `hsl((1 − t^0.6) · 300, 85%, 55%)`. A 300° full-saturation sweep, constant lightness, dropped into a surface whose every other colour comes from glass-ui's low-chroma oklch register (`--viz-*` at C ≈ 0.09–0.20) rendered in Computer Modern. Constant `L = 55 %` also means the hue ramp carries no luminance ordering, so the chain reads as noise in greyscale and to dichromats. *Falsifier:* if `spectrumColor` were tokenised or lightness-ramped this would be a style preference; it is a hard-coded HSL literal with no theme arm and no accessibility consideration.

### D-19 · MINOR · The "touch" branch is unreachable and its comment misleads
`useCanvasHover.ts:133` heads the block *"Touch / click toggle for mobile"*, and `:143-146` branches on `"touches" in e` for a `TouchEvent`. The only binding is `@click` (`BasisCanvas.vue:524`); there is no `@touchend` / `@touchstart` anywhere in the template. Touch devices reach it through the synthesised `MouseEvent`, so the feature works and the branch is dead. *Falsifier:* `grep -n "@touch" BasisCanvas.vue` → no match; the `TouchEvent` arm of the `onClick` union type is uninhabited at every call site.

### D-20 · MINOR · `maxCircles` is a `ref` that is never written and never exposed
`BasisCanvas.vue:47` `const maxCircles = ref(80)`; read at `:135` and `:321`, assigned nowhere, absent from `defineExpose` (`:515`) and from both props. The visible-circle budget — a genuinely user-facing quantity, given `BasisSelector` exposes per-basis term sliders — is an inert magic constant wearing reactive clothing. *Falsifier:* `grep -rn "maxCircles" web/src/` → 5 hits: the declaration, two reads, and two unrelated parameter names in `lib/bases.ts:30,35`.

### D-21 · MINOR · A container width is named a device class, and crossing it silently changes the presentation
`BasisCanvas.vue:151` / `:339` — `const isDesktop = s.width >= 768`, where `s.width` is the **container** width (`useCanvasSetup.ts:22-23`), not the viewport. Below the threshold `fit` stays `null` (`:160`, `:348`), which switches the epicycles from a fitted bottom-left inset to a full-scale in-place overlay, drops the connecting line entirely (`:188`, `:358` are `fit`-gated), and zeroes `epicycleBounds` so hover-grow becomes a no-op. Two materially different designs behind one unnamed, uncommented, mis-labelled constant. A wide phone in landscape gets the "desktop" design; a desktop with the 440 px controls aside on a 1280 px window gets it too — but a narrow split-screen does not. *Falsifier:* find a comment or a media query tying 768 to a device; there is none in either file.

### D-22 · MINOR · Export re-enters the live draw path and inherits live interaction state
`BasisCanvas.vue:479-504` swaps `s.ctx` for an offscreen context and calls the *same* draw functions. Consequences: the export overwrites the live hover hit-regions (`:198`, `:371` call `hover.setLabelHitRegions`); it pushes an extra sample into the live trail (`:144`, `:329` call `trail.update`); and it bakes in whatever `hover.getScale()` and `getHoveredBasis()` currently hold. Because a *pinned* basis survives pointer-leave (`useCanvasHover.ts:170-173`), a user who tapped a legend row then exports gets a PNG with that basis recoloured golden and the shimmer frozen at an arbitrary phase. *Falsifier:* pin a basis, export, inspect the PNG (`UNPROVEN-NEEDS-LIVE`); the shared-state coupling is static.

### D-23 · MINOR · Two of three exposed members have no consumers
`BasisCanvas.vue:515` — `defineExpose({ anim, exportFrame, drawImageOverlay })`. `grep -rn "drawImageOverlay" web/src/` shows zero external calls (only the component's own `:81`, `:106` and the composable). `anim` re-exports a **global Pinia store** through a component ref, so any holder of the ref can drive the shared animation clock without declaring the dependency — neither consumer does (`grep -rn "canvasComponent" web/src/` → only `exportFrame`). *Falsifier:* one external call site to either member refutes it; there are none.

### D-24 · MINOR · Exported PNGs have no background
`BasisCanvas.vue:485` clears the offscreen canvas and never fills it, so the artifact carries the alpha channel out. A dark-theme export — whose greys, ghost path (`ghost-path.ts:18`, `rgba(150,150,150,0.25)`) and grid (`grid.ts:29`, `rgba(150,150,150,0.09)`) were tuned against `rgb(44,40,38)` — composites onto whatever the viewer supplies, typically white, where the grid is invisible and D-7's contrast figures get worse still. *Falsifier:* if the export were intended for compositing, the option list would say so; `ExportModal.vue:55-70` offers no background control.

### D-25 · MINOR · Export filenames are opaque epoch milliseconds
`BasisCanvas.vue:509` — `fourier-frame-${Date.now()}.png`. Nothing identifies the workspace, the active bases, the harmonic count or `t`; a folder of exports is unsortable by meaning. The store holds `imageSlug` and the component holds `level`, both trivially available. *Falsifier:* if the slug were private this would be justified; it is already in the URL (`/w/:imageSlug`).

---

## §4 · INFO — the glass-ui pin, precisely scoped

### D-26 · INFO · `grid.ts` hand-rolls an axes renderer that glass-ui 7.0.0 declares as a subpath
`grid.ts:46-105` draws axes, two arrowheads and italic `x` / `y` labels — 60 lines. The 7.0.0 export-map diff (`lane-frontend.md §5`) lists **`./axes`** among the 14 added subpaths, confirmed live: `glass-ui/package.json` `exports["./axes"] → dist/axes.js`. **Caveat, stated honestly:** `ls /Users/mkbabb/Programming/glass-ui/src/components/axes` → *No such file or directory*, so the API behind that entry could not be read and its suitability is **UNPROVEN**. Route to the F.W1 uplift study alongside the census's `fourier-field` convergence target (`lane-frontend.md §4 SOFT SHADOW`, carry 7) — the same 1 311-LOC Canvas2D body is in scope, and `./fourier-field` + `./fourier-math` are exported at **both** 4.0.0 (verified in the installed export map) and 7.0.0 and imported **zero** times.

### D-27 · INFO · The `N = k` readout duplicates a glass-ui primitive the tree already imports elsewhere
The legend row is hand-drawn text (`labels.ts:70-73`). Six sibling files render exactly this kind of scalar through `MetricBadge` (`lane-frontend.md §5`: `metric-badge` ×7 imports / 6 files, including `AnimationControls.vue:10` and `EquationPanel.vue:12` — both of which **overlay this very canvas**). Drawing the harmonic count into the bitmap instead of the overlay is what makes D-3's inaccessibility and D-7's contrast failure unavoidable; hoisting it to the DOM fixes both and lands it on the `./metric` (7.0.0) migration path the census already budgets. *Falsifier:* if the readout had to be inside the exported PNG it would justify canvas text — but `withLabels` already exists to *remove* it from exports (D-11).

### Corpus corrections (not defects)

**C-1 · `cartoon-surface` SURVIVES the 4→7 uplift — the shim does not break.** `lane-frontend.md §3` and carry 8 hold the `@utility cartoon-card` shim as an outstanding upstream carry, which invites the assumption that the uplift breaks it. Measured: the utility moved from `dist/styles/cards.css:33` (4.0.0) to `src/components/card/styles.css:98` (7.0.0) **and remains inside the `@mkbabb/glass-ui/styles` entry cascade** — `glass-ui/src/styles/index.css:183` `@import "../components/card/styles.css";`. Since fourier imports that entry (`style.css:3`), `@apply cartoon-surface` still compiles at 7.0.0 and `BasisCanvas`'s chrome survives. The carry remains a *design* ask (D-12), not a build break.

**C-2 · The census break surface does not touch this file directly.** `BasisCanvas.vue` imports **zero** glass-ui symbols — it is one of the 15-of-66 SFCs outside the 51-file adoption set (`lane-frontend.md §3`). None of `metric-badge` (×7), `hover-card` (×2), `hover-popover` (×2), `DockIconButton` (×2), `DockDropdownTrigger` (×1) or `ToastVariant` appears here. Its entire glass-ui contact is the one shim class of C-1. What *does* break at uplift is its **overlay furniture** — `CanvasControlsDock` (`HoverPopover` + `DockIconButton`), `AnimationControls` (`MetricBadge` + `DockDropdownTrigger`), `EquationPanel` (`MetricBadge`) — every one of which is positioned over this canvas by `VisualizationView.vue:210-248`. So the F.W1 uplift re-lays out the canvas's *surroundings* while the canvas itself is inert, which is precisely the condition under which D-6's dock/inset collision changes geometry without anyone editing this file. **Budget a visual re-baseline of the canvas stage in the uplift wave even though the file has zero diff.**

---

## §5 · SUPERLATIVES (L-18, both ways)

### S-1 · The off-screen rAF gate is the best lifecycle code in the fourier frontend
`BasisCanvas.vue:425-459` + `stores/animation.ts:36-53, 96-106`. Reference-counted across mounted canvases so the inline and fullscreen instances cannot fight; an explicit degradation floor when `IntersectionObserver` is absent (`:436-441` registers as permanently visible — the prior always-on behaviour, stated as the floor in the comment); a `lastVisible` dedupe (`:445-447`) so repeated intersections cannot inflate the count; and `onUnmounted` **releases the credit** (`:458` `if (lastVisible) anim.setCanvasVisible(false)`), which is the exact line most implementations omit. The rationale is written where it lives, not in a doc. *Falsifier:* mount two canvases, scroll one out, confirm the clock keeps running; unmount while visible and confirm `visibleCanvases` returns to 0 (`UNPROVEN-NEEDS-LIVE`). The counting invariant is airtight statically — the only mutation sites are `:437`, `:447`, `:458`, all guarded by `lastVisible`.

### S-2 · The three-way watcher split is a genuine motion-quality decision, argued in place
`BasisCanvas.vue:374-423`. Watcher A clears the trail **only** on epicycle-identity change or epicycle-layer toggle; Watcher B invalidates just the fit centre when `basesData` or the basis list changes; the render watcher deliberately excludes `basesData` — *"basesData is intentionally NOT here — it belongs in the data watcher above"* (`:417`). The effect is that adding a Chebyshev overlay mid-playback does not blink the epicycle trail. That is a *design* invariant (motion continuity) enforced through reactivity granularity, and the reasoning is recorded at the site. *Falsifier:* if `trail.clearTrail()` appeared in Watcher B the split would be decorative — it does not (`:381` only).

### S-3 · `computeStableEpicycleBbox` chooses stability over tightness, and says why
`epicycles.ts:27-53`. Sampling 32 phases and unioning all circle extents costs 32× the work of a single-frame bbox, and buys an inset that never breathes or re-fits during playback. The comment names the trade (*"a tight but stable bound"*). Combined with the `baseFitCenter` memo, the inset is geometrically pinned across the whole cycle — the correct call for a reference figure. (D-5 is the *hover* multiplier applied to this good foundation, not a fault in the foundation.) *Falsifier:* if the bbox were recomputed per frame the inset would jitter; `BasisCanvas.vue:155-157` and `:343-345` compute it once per invalidation only.

### S-4 · The performance prose is exemplary — it names the superseded implementation
`BasisCanvas.vue:137-139` (*"Single pass over the full chain … Prior implementation traversed N components twice per frame"*), `:147-150` (the prefix-slice, with the aliasing case `nVis === components.length` handled without a copy), `:271-273` (the `Record<number,…>` bracket-access justified against the W1-ratified SCHEMA row), and `useViewTransform.ts:15-22` (the variadic-spread hazard quantified at n = 1024 and n ≈ 10 000, with the fix keyed on source identity). This is the standard the intake lane praises in R4-6 — reporting the *defect you fixed*, not just the fix. *Falsifier:* comments that describe code that is not there. Each was checked against its implementation: the single pass is at `:140`, the slice at `:148-150`, the `computed` at `useViewTransform.ts:23-46`. All four are accurate.

---

## §6 · Severity roll-up

| id | sev | one line | anchor |
|---|---|---|---|
| D-1 | BLOCKER | viz palette resolves to `#888888` — `cssVarToHex` cannot parse `oklch()`/`light-dark()` | `colors.ts:22-53` · `tokens/color-radius.css:263` |
| D-2 | BLOCKER | legend colours frozen at module eval ≠ the marks they label; theme flip inert | `basis-display.ts:3-7` |
| D-3 | BLOCKER | canvas absent from the a11y tree; drawn affordances pointer-only | `BasisCanvas.vue:519-526` |
| D-4 | BLOCKER | `withEpicycles` / `withTrail` export switches inert | `BasisCanvas.vue:466-469` |
| D-5 | MAJOR | hover-grow clips the inset off the left + bottom edges | `epicycles.ts:75-92` |
| D-6 | MAJOR | inset anchored under the bottom-centred transport dock | `epicycles.ts:82-83` · `AnimationControls.vue:135` |
| D-7 | MAJOR | all neutral canvas text 1.77–2.71:1 — WCAG 1.4.3 fail, both themes | `placeholder.ts:55` · `labels.ts:70` · `grid.ts:90` |
| D-8 | MAJOR | zero PRM gating over three rAF drivers; playback auto-starts | `useCanvasHover.ts:52-75` |
| D-9 | MAJOR | `N = k` describes nothing drawn; the retired `t =` label was correct | `BasisCanvas.vue:196` · `labels.ts:81-103` |
| D-10 | MAJOR | no error state — failed compute shows "Computing…" forever | `placeholder.ts:59` · `VisualizationView.vue:162` |
| D-11 | MAJOR | labels-off export punches a blind 200×100 hole, misses the `N` row | `BasisCanvas.vue:498-500` |
| D-12 | MAJOR | card chrome baked into the component; consumer strips it with `:deep()` | `BasisCanvas.vue:521` · `FullscreenViewer.vue:163-175` |
| D-13 | MAJOR | same chain, two stroke weights + two z-orders across the draw paths | `BasisCanvas.vue:172` vs `:356` |
| D-14 | MINOR | the epicycle golden shimmer is dead code | `BasisCanvas.vue:168-171` |
| D-15 | MINOR | 16/12/8 px insets on the same two edges | `labels.ts:23,26` · `epicycles.ts:72` |
| D-16 | MINOR | `crisp-edges` on anti-aliased vector content | `BasisCanvas.vue:545` |
| D-17 | MINOR | canvas text unhooked from font loading | `labels.ts:50,55` |
| D-18 | MINOR | 85 %-saturation constant-lightness rainbow spectrum | `transforms.ts:3-8` |
| D-19 | MINOR | unreachable touch branch + misleading comment | `useCanvasHover.ts:133-146` |
| D-20 | MINOR | `maxCircles` ref never written, never exposed | `BasisCanvas.vue:47` |
| D-21 | MINOR | `isDesktop = s.width >= 768` silently switches presentation | `BasisCanvas.vue:151,339` |
| D-22 | MINOR | export mutates hit-regions + trail, bakes in pinned hover state | `BasisCanvas.vue:479-504` |
| D-23 | MINOR | `drawImageOverlay` / `anim` exposed with zero consumers | `BasisCanvas.vue:515` |
| D-24 | MINOR | exported PNG has no background fill | `BasisCanvas.vue:485` |
| D-25 | MINOR | opaque epoch-ms export filename | `BasisCanvas.vue:509` |
| D-26 | INFO | hand-rolled axes vs the 7.0.0 `./axes` subpath (API UNPROVEN) | `grid.ts:46-105` |
| D-27 | INFO | `N = k` should be DOM `Metric`, not canvas bitmap text | `labels.ts:70-73` |

**Fix order.** D-1 → D-2 (one colour-resolution repair unblocks both, and D-2 survives D-1 so both must land) · D-7 rides the same repair (swap the neutral literals for `--muted-foreground` while the resolver is open) · D-3 and D-4 are independent and cheap · D-5/D-6 are one geometry pass · D-9/D-10/D-11 are one state-and-copy pass.
