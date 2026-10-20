# X-OD19 · fourier — DIAGNOSE (OD19-F1..F8 · OD19-V1 fourier half · OD19-ALL fourier half)

SERVED MODEL: fourier-analysis `m/w1-bump-migration` @ `dc30e5e`, Vite DEV server `http://localhost:3100` (unbundled modules), `@mkbabb/glass-ui` 10.1.0 from npm `dist/` (glass `src/components/dock` is byte-identical between `v10.1.0` and glass HEAD `0a3323db3`, so glass file:line below cites glass source), API `:8000` (dev, COMPUTE_CONCURRENCY=1). Fixture: saved visualization `/v/hazy-etching-cream-elk`. Headless Chromium (Playwright default shell), one browser per run and a context per cell, cells = {light, dark} × {1440×900, 390×844} at DPR 2. At 390 the canvas sits behind the "Canvas" tab, and the probe opens that tab first. A WebKit read of V1 (`v1-webkit.mjs`, `guarded --exclusive webkit`) **crashed the page at load in headless WebKit**. It was withdrawn, not retried (WindowServer law), so V1's WebKit half is INCONCLUSIVE.

Evidence: `docs/tranches/X/execution/OD19/fourier/before/`
- probes: `probe.mjs`, `probe-morph.mjs`, `detail.mjs`, `v1-webkit.mjs`, `inv.mjs`
- per-cell results: `probe-<cell>.json`, `detail.json`, `morph-scalars-1440.json`
- rAF traces: `<cell>-F1-trace.json`, `<cell>-F2-trace.json`, `<cell>-routeTx_*.json`
- frames: `<cell>-*.png`; strip sheets: `<cell>-F2-strip-sheet.png`

## Diagnose

| row | reproduced (BEFORE, measured) | root cause (file:line) | owner |
|---|---|---|---|
| **OD19-F1** transport dock collapsed/expanded broken | Every cell. Collapsed dock 102×56. Its `#collapsed` summary pane is forced to a 40×40 square, but it holds the 48 px mini-progress plus the `Metric` "1×". The Metric lays out at x=552 (dock right edge 553, 1440) or x=245 (edge 246, 390), at 0 px wide, so "1" sits on the plate edge and "×" floats outside the pill (`*-F1-transport-collapsed.png`, `dark-390-F4-after-leave.png`). Expand: the box goes 102→958 in **one frame** (t=74 ms) with `scale: 1`; the persistent Play jumps 459→31 px in one frame, and the summary ghost lands at the left edge. Collapse: the width shrinks to **57 px** (below the settled 102), holds there, then snaps to 102 and x 473→451 at settle (7–8 discontinuities; `*-F1-trace.json`, `morph-scalars-1440.json`). | Consumer: `web/src/components/visualization/AnimationControls.vue:176-179` authors a two-item readout into glass's single-glyph summary slot. `:220-222`, the unlayered `.animation-dock:where(.expanded){width:min(…)}`, overrides glass's reserved `inline-size: var(--dock-expanded-px)`. The full face is fluid (`:182` `w-full` + flex timeline), so glass measures nonsense endpoints (`--dock-expanded-px` 164 → 102 at the flip → 1806 at collapse), and the scale clamps at its 0.06 floor (958×0.06 = 57). Glass: `src/components/dock/styles/morph.css:180-198` (`aspect-ratio:1` silently overflows a wider summary); `composables/dockMorphMeasure.ts:90-101` (an endpoint re-published from a flip/fallback); `styles/layers.css:89-104` (the 0.06 clamp, then the snap when `[data-morphing]` clears). | both |
| **OD19-F2** small docks shift around instead of animating in place | The canvas-controls dock (`fit-content`, right-anchored). **Expand:** `--dock-expanded-px` is re-written to the collapsed 96 px at the flip, so `--dock-morph-t` runs 0→1 for ~650 ms with **no size change**, and then the box snaps 96→338 (x 883→641) in one frame. **Collapse:** it shrinks about the reserved box's centre (to x=762, centre 810), then at settle jumps **+121 px** right to its anchor (x=883). Both widths, both themes (`*-F2-trace.json`, `*-F2-strip-sheet.png`). Transport dock: see F1. | Glass: `layers.css:104` `transform-origin: center center` (the "container-justify-agnostic" claim fails for an end-anchored dock); `dockMorphMeasure.ts:90-101` (first expansion has no expanded endpoint: `chrome + fullSize` read at the flip = the collapsed box). Consumer anchor (legitimate, owner allows side docks): `VisualizationView.vue:1029-1034` `.controls-dock-anchor{right:.5rem}`. Consumer contribution for the transport dock = the F1 width override. → O-102 / glass D2 R1-R8 (side-origin morph + first-expand endpoint). | glass (consumer adopts an origin hook when glass ships it; transport half cured in P1) |
| **OD19-F3** Speed/Easing buried in ⋯ | The ⋯ `DropdownMenu` holds both radio groups (menu 180×594 at 1440, 168×588 at 390; `*-F3-overflow-menu.png`). No dock-level Speed or Easing control. | `AnimationControls.vue:189-211` (one ⋯ `DockTrigger` wrapping `SpeedSelect` + `EasingPicker`); `SpeedSelect.vue:61` trailing separator assumes the shared menu. | consumer |
| **OD19-F4** open dropdown survives dock collapse | Open ⋯, move the pointer off both: after 4.8 s the dock is `collapsed`, the menu is **still open**, and its trigger is inside `[inert]`. Every cell (`*-F4-after-leave.png`). | Consumer: `AnimationControls.vue:189` (`<DropdownMenu :modal="false">` with no `@update:open` → the dock's `keepOpen()/release()`, the documented seam at glass `useDockState.ts:215-220`). The same unwired pattern appears at `EditorControlsDock.vue:220` and in `CanvasControlsDock.vue`. Glass: a dock collapse never dismisses a child overlay (`useDockState.ts:194-202` `scheduleCollapse` only checks `keepOpenCount`) → atlas O-99 G-3, glass 10.1.1. | both |
| **OD19-F5** square border in controls panel; route nav should animate | The "Image" `.configurator-layer` carries a 1 px border at **r=4px**. It sits flush, 1 px inside the aside card, which has **r=16px**. That gives a square inner ring at the card's corners in every cell (`dark-1440-F5-layer-top.png`). Route nav: `main > *` swaps in 25–96 ms with opacity 1..1 and y constant in all 4 cells. There is **no transition at all** (`*-routeTx_*.json`). | Consumer: `VisualizationView.vue:893-899` (DS-F-C4 zeroed the stack's inset so the layer is flush) while the shell still publishes `--radius-inset: var(--configurator-pad-inline)` (1.25rem). Glass derives `max(4px, 16px − 20px)` = 4px (glass `configurator/styles.css:150-153`, `Configurator.vue:332-335`). Route: `web/src/App.vue:199` is a bare `<RouterView />`; glass 10.1.0 ships `routeTransition()` (motion-core, `composables/motion/route/useRouteTransition.ts:97`) + `styles/view-transition.css` route grammar, both unused. | consumer |
| **OD19-F6** dark-mode toggle slightly bigger | Toggle box 24×24 (`--icon-xl`), but its **ink** is 20×19 in light and **13×17 in dark** (moon), against the "Log in" glyph's 18×18 ink. The morph path fills only ~55–80 % of its viewBox (`detail.json` F6, `*-F6-appdock.png`). | `web/src/components/layout/DarkModeToggle.vue:38-43` (`view-box="0 0 200 200"` is padded around the sun/moon path); `:219-221` already sets the glyph to `--icon-xl`. | consumer |
| **OD19-F7** sliders double border | `/equation` "Harmonics" row: a 24 px glass `track-well` (inset top edge `0 1px 0 inset`, r=9999px), and inside it a local 6 px gradient rule, plus a 12×24 thumb with a **2 px** border. That makes two outlines (`*-F7-control-row.png`, `detail.json` F7). | `web/src/components/ui/SliderControl.vue:239-251` (`variant="spectrum"`) + `:315-324` (local `--glass-slider-track-background` fill recipe) + `:371-373` (thumb paint). Glass answer: integrated thumb = `Slider variant="scrubber"` (glass `slider/types.ts:5-10`; fill colour via `--slider-range-bg`, `slider/styles.css:141`). | consumer |
| **OD19-F8** time popover in dock clipped | Hover the transport rail: the caret ("t = 0.xx") paints at y=798 (1440) / 754 (390), above the run box 823..871 / 775..823. Its first clipping ancestor is glass's `.dock-layer--full.dock-run` (`overflow: auto hidden`), so only a sliver shows (`*-F8-caret.png`). | Consumer: `web/src/components/shared/FourierTimeline.vue:227-234` + `:265-271` (an absolutely positioned caret at `bottom: calc(100% + 6px)` inside the dock's scroll port). Glass: the run is unconditionally a scroll container since the 10.x lattice (`dock/styles/run.css`, `useDockRun`) → O-99 G-3 "popover clip", 10.1.1. | both |
| **OD19-V1** (fourier half) dock ellipse | Chromium, both themes, both widths: the **collapsed canvas dock's leading corner is `50%`** (an elliptical arc on the 96×56 pill, `start-start 50% / end-end 16px`). Its run overflows while collapsed (scrollWidth 274 / clientWidth 96), so the cut-cap scroll timeline is active and its `from` keyframe resolves 50 % of a non-square box (`*-F2-small-collapsed.png`, `dark-390-F4-after-leave.png`). The app dock's run does not overflow at any of 360–1440 px (`detail.json` V1), so its plate stays at 9999px in Chromium. The owner's 12.50.11 app-dock ellipse (a Safari-class engine) is **not reproduced headless**: the WebKit read crashed (`run-webkit.log`). The mechanism shared with the reproduced small dock is the same cap keyframe, so the falsifier belongs to glass D2. | Glass: `dock/styles/run.css:466-469` `--dock-cap-rest: 50%` + the keyframes at `:557-578`. "`50%` resolves to the stadium's own corner" is false for any non-square box: it is an ellipse. Collapsed full faces overflow the run (glass lattice). No consumer cause found: the consumer authors no radius or plate CSS on any dock. → O-102 / glass D2 C1-C7. | glass |
| **OD19-ALL** (fourier) loading + route transitions | Cold load (dev, unbundled, light): FCP/LCP 228–544 ms; "main ready" 0.28–0.67 s on every route **except `/equation`: 2.1 s (390) – 4.4 s (1440)**. Its `/api/equations/compute` TTFB is **1.7–2.5 s** (`detail.json` eqApi), behind the text loader "Computing…" (`EquationView.vue:425-428`). `/v/:slug` and `/gallery` paint text loaders ("Loading the visualization…", `VisualizationView.vue:464-467`) for 2–3 frames on entry. Route swaps are untransitioned (F5). | Consumer: `App.vue:199` (no route transition); `VisualizationView.vue:464-467` + `EquationView.vue:425-428` (text loaders, not the glass `Skeleton` already used at `GalleryInfiniteGrid.vue:58`); `/equation` waits on a cold server compute for its default function, and nothing prefetches it on navigation intent. | consumer (the shimmer itself is glass's, relayed) |

## Packets (consumer cures; modify-file sets are disjoint)

### P1 · transport + dock overlays — rows F1, F3, F4 (+ the transport half of F2)
Files: `web/src/components/visualization/AnimationControls.vue`, `SpeedSelect.vue`, `EasingPicker.vue`, `EditorControlsDock.vue`, `CanvasControlsDock.vue`.

Brief: (1) `#collapsed` holds ONE glyph-sized readout that fits glass's 40 px square (the mini-progress, at most 2rem). Drop the `Metric` from the summary; speed reads on its own trigger. (2) Delete the posture-keyed `.animation-dock:where(.expanded){width}` rule and give the full face a definite inline-size from `maxWidth`, so glass measures and morphs to a real endpoint. (3) Replace the ⋯ menu with two `DockTrigger for="dropdown"` seats, Speed (mono "1×") and Easing (curve glyph), each with its own `DropdownMenuContent`, and drop SpeedSelect's trailing separator. (4) Wire each dock dropdown's `@update:open` to the dock ref's `keepOpen()`/`release()`. Falsifier: `probe.mjs`. The collapsed summary's kids lie inside the plate. While a menu is open the dock never reaches `collapsed`. The expand trace has ≥5 frames of monotone width (the residual snap is glass D2).

### P2 · sliders + timeline caret — rows F7, F8
Files: `web/src/components/ui/SliderControl.vue`, `web/src/components/shared/FourierTimeline.vue`.

Brief: (1) SliderControl adopts `variant="scrubber"`, with the row hue fed through glass's `--slider-range-bg`. Delete the local gradient-fill recipe (`:315-324`) and the thumb paint (`:371-373`). Name the BL-FW14H-1 "visible thumb" reversal by owner row OD19-F7. (2) The timeline caret leaves the dock's scroll port. It renders through glass's portaled Tooltip/Popover anchored to the slider thumb, open on hover/focus/scrub, with no local top-layer or anchor machinery. Its position still reads `--caret-t`. Falsifier: `detail.mjs`. The F7 row has no `.slider-thumb` border and no local `background-image` on the track. In `probe.mjs` F8, `elementFromPoint` at the caret's centre returns the caret, and its ancestor chain has no clipper. Check light/dark at 1440 and 390 on /v and /equation.

### P3 · shell, route motion, loading, toggle, panel corner — rows F5, F6, ALL
Files: `web/src/App.vue`, `web/src/router/index.ts`, `web/src/components/visualization/VisualizationView.vue`, `web/src/components/equation/EquationView.vue`, `web/src/components/layout/DarkModeToggle.vue`.

Brief: (1) Route changes run under glass `routeTransition({nav:"route"})` at the router seam, with `<main>` tagged `data-route-window`. Under reduced motion they swap with no animation (glass CSS already handles it). (2) The flush layer stack publishes its real inset (`--radius-inset` = the aside's 1 px border) on `.viz-panel-left`, so glass derives a concentric ≈15 px corner. Check the /equation and /morph stacks too. (3) Text loaders become glass `Skeleton` in the stage's shape, with `aria-busy` on the region. (4) Prefetch the route chunk and the default `/equation` compute on nav intent. (5) Tighten the toggle's viewBox to the path's ink bounds. Falsifier: `routeTx` opacity <1 for ≥6 frames per push; zero `loadingText` frames; layer `border-top-left-radius` ≥14 px; toggle ink ≥22 px in both themes; /equation ready <1 s warm.

## glass-rooted sub-rows (for O-102; glass is READ-ONLY here)
- **G-F1** `morph.css:180-198`: the summary pane's `aspect-ratio:1` hides an overflowing `#collapsed` with no warning. It measured 102 px collapsed while its content spans 141 px.
- **G-F2a** `dockMorphMeasure.ts:90-101`: the first expansion publishes `--dock-expanded-px` = the collapsed size (96 / 102 px), so the morph is a no-op for 650 ms and then snaps. **G-F2b** `layers.css:104`: centre origin on an end-anchored dock produces the +121 px settle jump. **G-F2c** `layers.css:98-102`: the 0.06 clamp (the 57 px undershoot) and the snap at the `[data-morphing]` clear.
- **G-F4** collapse does not close or hold child overlays (G-3, 10.1.1).
- **G-F8** run scroll-port clips in-dock popovers (G-3, 10.1.1).
- **G-V1** `run.css:466-469`: `--dock-cap-rest: 50%` produces an ellipse on any non-square plate whenever the run's scroll timeline is active (D2 C1-C7).

### P2-fourier-sliders-caret

Rows **OD19-F7**, **OD19-F8**. fourier `m/w1-bump-migration` **`976a704`** (pushed, fast-forward over `563814d`).

- **OD19-F7 (consumer): cured at the root.** `SliderControl.vue` now uses glass `Slider variant="scrubber"` (`md`), and the row hue reaches glass's own `--slider-range-bg` (`color || undefined`, so D-14's empty colour keeps glass's capsule). Three things are deleted: the local `--glass-slider-track-background` gradient recipe, the `fillFraction`/`--row-fill` computation, and the `:deep(.slider-thumb)` paint. **The owner reverses BL-FW14H-1's visible-thumb demand under OD19-F7**, and the docblock records this. AFTER, in all 4 cells: `.slider-track` has `background-image: none`; `.slider-thumb` is `0×20`, opacity 0, border 0; `.slider-range` is glass's liquid fill tinted with the row hue. The well's edge is now the row's one edge (`*-F7-control-row.png`, `probe.json`).
- **OD19-F8 (both): the consumer half is cured.** `FourierTimeline.vue`'s caret is now glass `Tooltip` + `TooltipContent`, which is portaled (glass's plate, placement and reveal):
  - `reference` is the slider thumb (`role="slider"`).
  - `update-position-strategy="always"`, because the 0-wide thumb moves without resizing, so no observer sees it.
  - `hide-when-detached`.
  - `aria-hidden` (AX-1 two-attribute law kept).
  - It opens on hover, focus or scrub.

  Deleted: the absolute caret, its `--caret-t` inset, its opacity arms and its local fade. No local top layer and no anchor CSS were added. AFTER, in all 4 cells: the caret is outside `.animation-dock`, `elementFromPoint` at its centre returns the caret, and it is centred on the thumb (1440: caret 220..299 at y=808, thumb x=259; 390: 68..135 at y=763, thumb x=101). The only overflow ancestor is glass's own plate, which wraps it whole (`*-F8-caret.png`). The glass half stays G-F8 (O-102). **Retired:** the touch at-rest arm (M-3), because a portaled plate open at rest would float over sheets that cover the dock. A touch reader opens it by scrubbing.
- **Same-concern adjacent lines:**
  - `web/e2e/f-w14-control-row.spec.ts` reads glass's integrated handle as visible: the fill's leading edge sits at the thumb centre, and a painted thumb still counts. A scrubber's liquid fill counts as the fill at the minimum (Max Contours "All"). This follows from the OD19-F7 reversal; no assertion was removed.
  - `web/e2e/f-w14v-u4.spec.ts` u239 hovers the rail and reads the portaled plate (`.timeline-caret`). Its glass-floating and radius assertions are unchanged.
- **Falsifier:** `web/e2e/od19-p2-sliders-caret.spec.ts` covers light/dark × 1440/390, F7 on /equation and F8 on /v. /equation's timeline carries no caret label.
  - RED before the cure: 6/6 cells run failed (`falsifier-RED.txt`; the run was cut by the guard's queue at test 6).
  - GREEN 8/8: `falsifier-GREEN-1.txt`, plus the falsifier inside both touched-spec runs.
- **Gates:**
  - `vue-tsc -b` clean.
  - vitest 116/116.
  - Touched specs (od19-p2 + f-w14-control-row + f-w14v-pd + f-w14v-u4): 27/27 ×2 (`touched-specs-run-{1,2}.txt`).
  - slider-scrub-contrast (MPC-10) + equation-interaction: 3/3 ×2 (`adjacent-specs-run-{1,2}.txt`).
  - No golden re-baselined.
- **Evidence:** `fourier/after/P2-fourier-sliders-caret/` (probe.mjs, probe.json, 8 PNGs, run logs).

### P3-fourier-shell-motion-loading

Rows **OD19-F5**, **OD19-F6**, **OD19-ALL**. fourier `m/w1-bump-migration` **`2a3651d`** (pushed, fast-forward).

- **OD19-F5 (consumer): cured at the root.**
  - **Route motion.** Every path change now runs under glass `routeTransition({ nav: "route" })` at the router seam (`web/src/router/index.ts`). This replaces I.ε's local `document.startViewTransition` bracket, which only covered the /w ↔ /v ↔ /gallery pairs. `<main>` carries `data-route-window` (`App.vue`).
    - Glass gates the transition. Under reduced motion, or with no View Transitions API, the swap happens with no animation.
    - The release is still a `nextTick`, never a frame (G-F9-11).
    - There is one transition per navigation. A navigation that starts while one is still running (the loader's `/visualize` → `/w/` replace, or a second click mid-fade) opens none, so UIA-F-246's "started 1, aborted 0" holds.
    - AFTER, all 4 cells, pushes to /paper, /v, /gallery, /equation and /morph: 6–26 frames with the new root's opacity below 1 (min 0), dock y/h moved in 0 frames, 0 loader-text frames (`probe.json` `routeTx`).
  - **Panel corner.** `.viz-panel-left` and `.eq-panel-left-wrap` now publish `--radius-inset: 1px` (the aside's border). Glass derives the first layer's corner as **15px** inside the 16px card, so it is concentric (BEFORE: 4px). Read on /v and /equation in all 4 cells (`*-F5-layer-top_*.png`). /morph has no configurator layers, so nothing changes there.
- **OD19-F6 (consumer): cured.** `DarkModeToggle.vue` now frames each shape's own ink box:
  - every level the morph draws (≥ `lowLevel`), squared about its centre and padded by the stroke;
  - mid-morph, the frame is lerped by the colour's existing `morphT`, so the motion is kept and nothing jumps;
  - the stroke scales with the frame, so the line stays 1.68 px.
  - Ink measured in the 24px box: sun 21.4 → **23.8 px**, moon 18.3 → **23.7 px** (`*-F6-toggle.png`).
- **OD19-ALL (consumer): cured.**
  - **Loaders.** The /v cold-load loader ("Loading the visualization…") and the /equation cold-compute loader ("Computing…") are now glass `Skeleton` in the stage's shape. The region is `aria-busy`, and the status keeps its accessible name with no visible text (`light-1440-{viz,equation}-skeleton.png`).
  - **Prefetch.** `prefetchRoute()` (router) loads a section's chunk on navigation intent and calls its module's `prefetch()`. EquationView's `prefetch()` starts the default or restored compute. The view then either takes the in-flight promise (`takePrefetch`) or restores the result from the session cache.
  - **Latency.** /paper → hover Equation → click → series painted: **1860 ms BEFORE**, 89–114 ms AFTER with a 1–3 s dwell, and 358 ms with no dwell.
  - The /v first-compute overlay ("Computing the Fourier decomposition…") is a progress state over a drawn stage, not a route loader, and is left as is.
- **Adjacent lines outside the modify set (same concern):**
  - `web/src/components/layout/AppDock.vue`: the prefetch import, plus `@pointerenter`/`@focus` on the section menu items (the nav-intent seat).
  - `web/e2e/f-w14u-vstage.spec.ts` e70: the busy status is located by accessible name (`getByRole("status", { name: /Loading/ })`) instead of visible text, which OD19-ALL removes. The assertion is no weaker.
  - P1's `container-type` hunk in VisualizationView.vue was left unstaged. It was committed blob-wise, never reverted.
- **Falsifier** `web/e2e/od19-p3-shell-motion-loading.spec.ts`: 16 tests, 4 cells.
  - BEFORE: RED 15/16. Radius 4; vtFrames 0; ink 21.4/18.3; no skeleton; 1860 ms. Reduced motion passed.
  - AFTER: GREEN ×2.
- **Checks:**
  - vue-tsc: clean.
  - vitest: 116/116.
  - Touched specs (P3, f-w13-radius, f-w14v-detached, f-w14v-nav, f-w14u-misc, f-w14u-eq, f-w14v-eq2, equation-interaction, f-w14u-vstage, shell-header, f-w14u-shell): 128/130 ×2.
    - The 2 reds are `f-w14u-vstage` e171 (1440, 390), which expects `[style*="--row-fill"]` slider fills. P2 `976a704` deleted `--row-fill` (OD19-F7), so this is a sibling spec debt for P2/F.REL.v3, not this packet's.
  - No golden re-baselined.
- **Residuals:**
  - glass `Skeleton` shimmer is O-102a (10.1.1). Adopt it when it lands.
  - `useFourierMorph.ts`'s FR-AH-6 note names the router as the second home of the reduced-motion predicate. That copy is now gone, because glass owns the route gate.
- **Evidence:** `fourier/after/P3-fourier-shell-motion-loading/` (probe.mjs, probe.json, PNGs, before-red/after-green/touched-run/vitest logs).
- **Re-deploy addendum (2026-10-20):** this was verify-only. No source change was needed, because `2a3651d` already holds every cure.
  - The fourier HEAD is `e928541`. The working tree carries a sibling seat's uncommitted OD19-ALL load hunks, including `DarkModeToggle.vue`'s `sun-moon-shapes` import. Those hunks were left untouched.
  - The falsifier ran 4 times against `BASE_URL=http://localhost:3100`, each run under `guarded` with `--workers=1` (`redeploy-2026-10-20-run-{1..4}.log`):
    - Run 1 was 15/16. In the light-1440 cell, the `/v` push was at `vtFrames` 5 against a bar of 6. Load average was about 22–29. That push had 27 traced frames with min opacity 0, 0 loader frames and 0 dock moves.
    - Runs 2, 3 and 4 were each 16/16.
  - Verdict: the run-1 red is a frame-cadence flake under machine load, not a regression. The assertion is unchanged.
  - Note: the suite defaults `BASE_URL` to `:3000`. Without the override, the e2e seed hits another app and gets a 404.

### P1-fourier-transport-docks
- **Commit:** fourier-analysis `e928541` (`m/w1-bump-migration`, pushed fast-forward).
- **Rows:** OD19-F1, OD19-F3 and OD19-F4 are CURED. The transport half of OD19-F2 is CURED. The canvas-dock half of OD19-F2 stays glass G-F2a/G-F2b.
- **Cures:**
  - **F1, summary.** `AnimationControls.vue` `#collapsed` now holds only the mini-progress, at 2rem. It sits inside glass's 40 px summary square. The `Metric` is dropped.
  - **F1, width.** The `.animation-dock:where(.expanded){width}` rule is deleted. The full face `.transport-face` gets a definite `inline-size`: `min(maxWidth, 100cqi) − (2·--dock-padding-inline + --dock-layer-height + --dock-layer-gap)`. Measured: face = full pane = run = 888 / 270 px, with no overflow. Glass now publishes the real `--dock-expanded-px` (958 / 340).
  - **F3.** The ⋯ menu is replaced by two `DockTrigger for="dropdown"` seats. "Playback speed" shows the rate in mono ("1×"). "Easing" shows the glass `EasingCurve` of the current easing. Each seat has its own `DropdownMenuContent`. `SpeedSelect.vue`'s trailing separator is dropped.
  - **F4.** Every dock dropdown's `@update:open` takes or returns exactly one `keepOpen()`/`release()` count on its dock ref:
    - `AnimationControls` (both seats);
    - `EditorControlsDock` (More editor tools and `ViewLayersMenu`);
    - `CanvasControlsDock` (`ViewLayersMenu`, whose single root `DropdownMenu` receives the listener by attribute fallthrough).
- **Adjacent line (outside the modify set):** `VisualizationView.vue` `.controls-overlay { container-type: inline-size }`. This makes `100cqi` the overlay that holds the dock. Only this hunk was staged.
- **Falsifier:** `web/e2e/od19-p1-transport-docks.spec.ts`, light/dark × 1440/390, 4 tests per cell. It checks:
  - every collapsed kid lies inside the plate;
  - a later expand has ≥5 monotone growth frames and no reversal, and no single frame carries half of Play's travel;
  - the collapse never undershoots and never grows back;
  - Speed and Easing seats exist, each with its own menu;
  - with a menu open and the pointer away, the dock never reaches `.collapsed` for 4.8 s, and after the menu closes and focus leaves, it collapses.
  - **RED 16/16** against HEAD sources (`red-HEAD-sources.{log,json}`): kids outside the plate (+4), expand growth = 1 frame even on the second expand, no seats, F4 timeout.
  - **GREEN 16/16 ×2** (`green-{1,2}-od19-p1-transport-docks.json`). Second-expand traces: 1440 = 6 growth frames, Play max step 205 of 424 px (about 35 frames in headless at DPR2); 390 = 21–28 growth frames, Play max step 19.6 of 115 px. Collapse: settled 102, min 102, 0 regrowth.
  - **Deviation from the brief.** The brief's "no single-frame Play jump > 12 px" cannot hold for a 424 px travel at headless rAF cadence. It is asserted as "no single frame carries half the travel". Before the cure, one frame carried 428 of 428 px.
- **Touched specs re-pointed (owner rows; no assertion weakened):**
  - `f-w14u-d` d1 asserted the collapsed Metric, which OD19-F1 removes. It now asserts that the summary is the one readout inside the plate.
  - `f-w14u-vdock` v9, `visualization-ux` keystone 4 and `f-w14v-au0` opened "More options", which OD19-F3 retires. They now open the Speed and Easing seats, and v9 runs its fit, label and keep-open checks on each menu.
  - All four passed GREEN ×2 (vdock 10, d 6, ux 9, au0 10). `vue-tsc -b` rc 0. vitest 116/116.
- **AFTER frames (LOOKed):**
  - `{light,dark}-{1440,390}-F1-collapsed.png`: Play plus the 2rem bar, inside the pill.
  - `-F1-expanded.png`: timeline, "1×" and the curve glyph.
  - `-F3-speed-menu.png` and `-F3-easing-menu.png`: the two menus.
  - `-F4-after-leave.png`: the dock is expanded with the menu open after 4.8 s, in all 4 cells.
  - Traces: `trace-1440.json` (first flip, G-F2a) and `trace-1440-warm.json` (second expand, monotone 102→145→474→780→930→957→958).
- **glass sub-rows (O-102):**
  - **G-F2a (residual, measured).** On the first expand after load, glass publishes `--dock-expanded-px` from the collapsed root, 164 → 102 px at the flip. The full pane's `offsetWidth` reads 102 while collapsed, even though its content is a definite 888. The first morph therefore runs to 102 for about 600 ms, then snaps to 958. Every later expand is clean.
  - **G-F3 (new).** `EasingCurve` has no caption-free glyph register. At dock-glyph size (20 px) its HTML "0"/"1" axis captions crowd the plot. The same happens at the menu rows' 24 px. A `bare`/glyph mode would be the producer cure.
  - **G-F4.** A collapse still does not dismiss child overlays. The consumer now holds the dock open through `keepOpen()` instead.
- **Re-deploy verify (2026-10-20).** The modify set is unchanged since `e928541` (fourier HEAD, pushed). The falsifier re-ran on the served dev app (:3100) under `guarded`: GREEN 16/16 in 2.0 min. No new code; the residual is still G-F2a.

### load

Row **OD19-ALL** (fourier half): load times on every route, and smooth, subtle route transitions. fourier `m/w1-bump-migration` at **`ac9d514` (pushed, fast-forward over `e928541`)**.

**The instrument.** Every route was read on the production bundle. `vite preview` served it on :4190, and Playwright's `webServer` built and started it under `guarded`, then stopped it when the run ended. `/api` proxied to the dev backend on :8000 (`COMPUTE_CONCURRENCY=1`), and the seed origin was `BASE_URL=http://localhost:3100`.

The browser was headless Chromium (the Playwright headless shell), one browser per run and a context per cell. CPU was throttled ×4 through CDP `Emulation.setCPUThrottlingRate`. The network was localhost and unthrottled, so bytes are read as bytes.

Each route was read in three modes:
- **cold**: a fresh context, then a hard load.
- **warm**: a second hard load in the same context.
- **nav**: an in-app navigation from another section. The pointer goes over the dock section-menu item, then clicks it. Time is measured from the click, and frames are traced over the transition.

Each reading records:
- the decoded JS and CSS bytes;
- the time until the route's own content selector is visible with nothing in `<main>` `aria-busy`;
- long tasks: the count, and TBT = Σ(d − 50 ms);
- for nav, the maximum frame gap and the number of frames over 50 ms.

The time bars count only the page's **own** time: the reading minus `apiMs`, the union of the `/api/` request spans inside the timed window. A cold `/equation` waits 1.4–6.8 s on the backend's compute of the default series. That latency belongs to the server and the shared machine (load 17–28 during these runs), not to the bundle, so the raw `ms` is still recorded beside the own time.

The spec and readings are at `fourier/load/` (`before/`, `after/`; the probes are in `tools/`).

**Root causes measured (BEFORE).** The eager boot set was **1,349 kB** of JS (`index` 520 + `vendor-ui` 369 + `vendor-math` 308 + `vendor-vue` 128 + `vendor-keyframes` 24), and every route parsed all of it before it could start. It held four welds:
1. **The header toggle's sun and moon.** 2 × 10 harmonic levels of JSON (~450 kB raw, 375 kB of the entry chunk) were imported statically by `DarkModeToggle.vue`, which mounts on every route. This is the FR-AH-1 row.
2. **`katex`** (258 kB) was welded into `vendor-math`, which boot needs for `installVizColors`.
3. **`vendor-ui`** (glass-ui, reka-ui and lucide) put every component that any route uses on the boot path.
4. **`vendor-paper`** named the packages' bare `"."` entries, which the app never imports, so it built an **empty** chunk that `/paper` fetched for nothing.

The admin panels loaded only when their tab opened: the Users tab fetched 18 kB of code at click time.

**Cures (root, consumer).**
- `web/vite.config.ts`: the three welds are struck. A named vendor chunk now exists only for a cluster that every route loads (`vendor-vue`, `vendor-math` = the value.js colour subpaths, `vendor-keyframes`). Rollup places katex, glass, reka and lucide where they are imported. The empty `vendor-paper` is gone.
- `web/src/lib/sun-moon-shapes.ts` (new; the shapes' one home): the two shapes ride their own chunks. They are requested when the module evaluates, in parallel with the route chunk, and `main.ts` mounts once `router.isReady()` and the shapes have both landed. The glyph never paints empty. `FourierMorphDemo.vue` reads the same two shapes from there.
- `sun.json` and `moon.json`: coordinates are rounded to 3 decimals, sub-pixel in their 200-unit viewBox. That is 450 → 201 kB, and the P3 falsifier's toggle-ink bars stay green.
- **Prefetch on intent** (beside P3's dock section-menu `prefetchRoute` on `pointerenter`/`focus`):
  - In `GalleryView.vue`, admin mode turning on loads the three admin panels' chunks.
  - An opened gallery card (`selectedSlug`) prefetches `/v/<slug>`'s route chunk.
- Already landed under P3 (`2a3651d`), and re-read here on the production bundle:
  - route changes crossfade under glass `routeTransition({nav:"route"})`, which is View Transitions on opacity only;
  - the text loaders are glass `Skeleton` with `aria-busy`;
  - nav-intent prefetch of the route chunk and of `/equation`'s default compute.

  No visible text loader remains in `web/src`. The admin lists' "Loading users." and "Loading audit entries." live only in their `sr-only` live regions, and no spinner exists.

**Chunk bytes (raw, from the build).**

| chunk | BEFORE kB | AFTER kB |
|---|---|---|
| **eager boot set** (entry + named vendors in `index.html`) | **1,349.2** | **459.7** (−66 %) |
| `index` (entry) | 520.3 | 261.6 |
| `vendor-ui` | 369.4 | — (struck) |
| `vendor-math` | 307.6 | 46.2 |
| `vendor-vue` / `vendor-keyframes` | 127.6 / 24.3 | 127.6 / 24.3 |
| `sun` + `moon` (parallel with the route chunk; gates mount) | in entry | 101.1 + 100.3 |
| `vendor-paper` (empty, fetched by /paper) | 0.0 | — (struck) |
| shared component chunk (glass + katex, loaded by the routes that use them) | in vendors | 261.9 |
| `PaperView` / `VisualizationView` / `GalleryView` / `EquationView` / `FourierMorphDemo` | 481.9 / 74.1 / 44.5 / 33.3 / 10.1 | 510.7 / 77.6 / 53.4 / 33.6 / 10.5 |

**Before/after: every route, CPU ×4, production bundle.**
- BEFORE = `before/load-before-{1,2}.json`.
- AFTER = `after/load-after-{3,4}.json`, both runs GREEN 19/19.
- Times are in ms. "own" is the time minus the API wait.

| route @ width | mode | JS KB BEFORE → AFTER | CSS KB | ms BEFORE r1 / r2 | ms AFTER r1 / r2 (own = less API wait) | long tasks (TBT ms) BEFORE → AFTER | frame gap max / >50 ms BEFORE → AFTER |
|---|---|---|---|---|---|---|---|
| paper@1440 | cold | 1790 → 1432 (-20%) | 441 → 441 | 563 / 566 | 715 (own 715) / 790 (own 790) | 3 (376), 3 (359) → 3 (457), 3 (538) |  |
| paper@1440 | warm | 0 → 0 | 0 → 0 | 353 / 309 | 318 (own 318) / 421 (own 421) | 2 (133), 2 (115) → 1 (117), 2 (212) |  |
| paper@390 | cold | 1790 → 1432 (-20%) | 441 → 441 | 530 / 560 | 387 (own 387) / 535 (own 535) | 3 (339), 3 (368) → 2 (225), 2 (343) |  |
| paper@390 | warm | 0 → 0 | 0 → 0 | 330 / 311 | 246 (own 246) / 342 (own 342) | 1 (77), 1 (72) → 1 (56), 2 (98) |  |
| visualize@1440 | cold | 1444 → 1162 (-20%) | 434 → 434 | 378 / 389 | 363 (own 363) / 457 (own 457) | 2 (205), 2 (204) → 1 (205), 1 (264) |  |
| visualize@1440 | warm | 0 → 0 | 0 → 0 | 248 / 243 | 211 (own 211) / 247 (own 247) | 1 (39), 1 (32) → 1 (32), 1 (47) |  |
| visualize@390 | cold | 1444 → 1162 (-20%) | 434 → 434 | 452 / 349 | 354 (own 354) / 453 (own 453) | 2 (260), 2 (178) → 1 (187), 1 (259) |  |
| visualize@390 | warm | 0 → 0 | 0 → 0 | 245 / 203 | 213 (own 213) / 268 (own 268) | 1 (41), 1 (22) → 1 (30), 1 (55) |  |
| visualization@1440 | cold | 1444 → 1162 (-20%) | 434 → 434 | 1025 / 708 | 783 (own 762) / 998 (own 975) | 4 (639), 3 (397) → 2 (468), 2 (621) |  |
| visualization@1440 | warm | 0 → 0 | 0 → 0 | 780 / 366 | 600 (own 590) / 790 (own 779) | 3 (230), 2 (117) → 2 (149), 3 (242) |  |
| visualization@390 | cold | 1444 → 1162 (-20%) | 434 → 434 | 857 / 707 | 725 (own 700) / 995 (own 887) | 3 (505), 3 (393) → 2 (418), 2 (548) |  |
| visualization@390 | warm | 0 → 0 | 0 → 0 | 403 / 324 | 405 (own 376) / 498 (own 476) | 2 (140), 2 (95) → 2 (131), 2 (179) |  |
| gallery@1440 | cold | 1392 → 798 (-43%) | 422 → 422 | 592 / 613 | 552 (own 537) / 688 (own 672) | 3 (292), 3 (304) → 2 (266), 2 (357) |  |
| gallery@1440 | warm | 0 → 0 | 0 → 0 | 267 / 268 | 259 (own 254) / 329 (own 316) | 1 (34), 1 (38) → 2 (37), 2 (74) |  |
| gallery@390 | cold | 1392 → 798 (-43%) | 422 → 422 | 574 / 501 | 571 (own 566) / 669 (own 664) | 3 (274), 3 (222) → 2 (284), 2 (355) |  |
| gallery@390 | warm | 0 → 0 | 0 → 0 | 298 / 282 | 289 (own 271) / 364 (own 360) | 2 (55), 2 (46) → 2 (50), 2 (95) |  |
| equation@1440 | cold | 1389 → 1079 (-22%) | 427 → 427 | 2129 / 1776 | 1855 (own 417) / 6847 (own 413) | 3 (413), 3 (369) → 3 (476), 4 (506) |  |
| equation@1440 | warm | 0 → 0 | 0 → 0 | 415 / 368 | 401 (own 401) / 353 (own 353) | 3 (201), 3 (165) → 3 (209), 2 (197) |  |
| equation@390 | cold | 1389 → 1079 (-22%) | 427 → 427 | 2336 / 1839 | 1963 (own 384) / 1990 (own 349) | 4 (472), 3 (299) → 3 (446), 3 (407) |  |
| equation@390 | warm | 0 → 0 | 0 → 0 | 381 / 226 | 315 (own 315) / 280 (own 280) | 1 (201), 1 (94) → 1 (168), 1 (148) |  |
| morph@1440 | cold | 1342 → 740 (-45%) | 422 → 422 | 647 / 484 | 628 (own 628) / 570 (own 570) | 2 (454), 2 (312) → 1 (441), 1 (395) |  |
| morph@1440 | warm | 0 → 0 | 0 → 0 | 443 / 358 | 424 (own 424) / 382 (own 382) | 1 (219), 1 (146) → 1 (208), 1 (186) |  |
| morph@390 | cold | 1342 → 740 (-45%) | 422 → 422 | 666 / 478 | 616 (own 616) / 534 (own 534) | 2 (472), 2 (305) → 1 (432), 1 (367) |  |
| morph@390 | warm | 0 → 0 | 0 → 0 | 462 / 352 | 428 (own 428) / 343 (own 343) | 1 (231), 1 (160) → 1 (213), 1 (159) |  |
| paper | nav | 472 → 776 (64%) | 28 → 28 | 584 / 603 | 563 (own 563) / 509 (own 509) | 2 (132), 2 (146) → 2 (223), 2 (175) | 258/1, 284/1 → 359/1, 304/1 |
| visualize | nav | 126 → 232 (84%) | 21 → 21 | 449 / 431 | 398 (own 398) / 472 (own 472) | 1 (30), 1 (21) → 1 (48), 1 (35) | 133/3, 125/5 → 155/5, 143/3 |
| gallery | nav | 73 → 127 (74%) | 8 → 8 | 533 / 523 | 616 (own 610) / 561 (own 556) | 2 (104), 2 (48) → 2 (107), 2 (67) | 258/1, 175/1 → 248/1, 207/1 |
| equation | nav | 71 → 172 (142%) | 13 → 13 | 1464 / 1190 | 1648 (own 182) / 1699 (own 173) | 2 (113), 2 (132) → 3 (198), 2 (171) | 167/8, 166/4 → 231/17, 195/12 |
| morph | nav | 25 → 85 (240%) | 9 → 9 | 568 / 591 | 609 (own 609) / 643 (own 643) | 1 (149), 1 (165) → 1 (255), 1 (201) | 250/1, 266/1 → 366/1, 308/1 |
| admin | cold | 1392 → 839 (-40%) | 422 → 422 | 709 / 587 | 666 (own 405) / 738 (own 445) | 3 (290), 3 (206) → 3 (250), 3 (302) |  |
| admin | users-tab | 18 → 0 (-100%) | 0 → 0 | 304 / 218 | 217 (own 171) / 211 (own 189) | 2 (36), 0 (0) → 1 (3), 1 (6) |  |

**Reading.**
- **Bytes are the cure, and they reproduce exactly.** Each route's cold JS falls by between 20 % (/paper, /visualize, /v) and 45 % (/morph). /gallery falls 43 % and admin 40 %. The admin Users tab now fetches **0** kB, because its code already arrived when admin mode turned on. An opened gallery card has already fetched `VisualizationView`.
- **Nav bytes go up.** /paper 472 → 776 kB and /equation 71 → 172 kB. This is the intended trade: the components that used to sit in the eager `vendor-ui` and the katex in `vendor-math` now load with the first route that uses them. A cold load plus one navigation still moves fewer bytes than before. /morph cold + /paper nav goes from 1,814 kB (1,342 + 472) to 1,516 kB (740 + 776). /paper cold + /visualize nav goes from 1,916 kB (1,790 + 126) to 1,664 kB (1,432 + 232).
- **The time columns are rendering-bound and noisy on a shared machine.** At CPU ×4 on localhost, the first style and layout pass and Vue's mount dominate. The BEFORE runs were taken on 2026-10-19 at a lower load than the AFTER runs (2026-10-20, load 17–28 from other seats). An earlier AFTER run taken at a load close to BEFORE's (`after/load-after-1.json`, which predates the `apiMs` field) read cold times 9–34 % under `before-1` on every route except the server-bound /equation. Examples: /paper@390 530 → 362, /visualize@1440 378 → 304, /morph@1440 647 → 504. Against `before-2`'s spread, some of those readings are level (/morph@1440 484 vs 504, /visualize@390 349 vs 343). So time is a budget bar here, not proof that the bytes cure works.
- **/equation's page time is ~0.4 s cold and ~0.18 s on nav.** Its raw 1.6–6.8 s is the backend's compute of the default series. The P3 nav-intent prefetch hides that compute when the pointer dwells on the menu item (1,860 → 89–114 ms after a 1–3 s dwell, P3 above). The spec moves the pointer straight from hover to click, so it measures the no-dwell worst case.
- **Transitions.** Every nav runs the glass crossfade (opacity only). The maximum frame gap is the route-chunk evaluation frame at CPU ×4: 143–366 ms AFTER against 125–284 ms BEFORE, under the 450 ms bar. /equation's nav has 12–17 frames over 50 ms AFTER, against 4–8 BEFORE: its route chunk now carries its own components (172 kB evaluated at CPU ×4), and the series paints while the compute result lands. That stays under the 20-frame bar, and it is the one transition reading that got worse.

**Falsifier.** `web/e2e/od19-load.spec.ts`, 19 tests.
- 12 tests: cold + warm for each of the 6 routes × {1440, 390}.
- 5 tests: in-app nav with frame tracing.
- 2 tests: gallery card prefetch, and admin cold + Users tab.
- The bars:
  - Cold JS per route sits between its AFTER and BEFORE readings: /paper 1,550, /visualize and /v 1,260, /gallery 870, /equation 1,170, /morph 810, admin 910 kB.
  - The admin Users tab fetches 0 kB.
  - The /v chunk must be present once a gallery card is open.
  - Own-time budgets are about 1.5× the worst AFTER reading. /equation's own-time bars are cold 1,000 ms and nav 700 ms.
  - Frames: max gap ≤ 450 ms, and ≤ 20 frames over 50 ms.
- BEFORE: **RED 14/19** (`before/run-before-2-RED.log`; every byte bar, the card prefetch and the admin tab).
- AFTER: **GREEN 19/19 ×2** (`after/run-after-{3,4}.log`).
- An intermediate AFTER run (`after/run-after-2.log`, under the earlier raw-time bars) went red only on /equation cold (6,801 ms) and nav (3,941 ms). Those are the backend's compute under load, which is why the time bars now read own time. Two runs (`run-after-2-seed-404{,b}.log`) never started: the seed defaulted to :3000, which another app owns.

**Gates.**
- `vue-tsc -b`: clean.
- vitest: 116/116 (`after/vitest.log`).
- Adjacent spec `od19-p3-shell-motion-loading` (toggle ink, route crossfade, skeletons): run 1 15/16 (the /v push `vtFrames` 5 against a bar of 6 under load; this is the same frame-cadence flake as the P3 re-deploy addendum) and run 2 **16/16** (`after/adjacent-p3-run-{1,2}.log`).
- No golden was re-baselined.

**Residuals.**
- The glass `Skeleton` shimmer is O-102a (glass 10.1.1). Adopt it when it lands; it is never a local animation.
- The /equation cold compute is the backend's (the `/api/equations/compute` default series). A server-side cache of the default series is the next root, and it is not a bundle cure.
