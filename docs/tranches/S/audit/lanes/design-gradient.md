# S · Design-assay lane — the GRADIENT page

**Mode**: audit-only · repo `@ c5aa091` (branch `tranche-q`) · live probe against `http://localhost:9000` (dev server), Playwright/Chromium, 2026-07-04.
**Viewports probed**: 1440×900 (light + dark), 390×844 (light). Evidence shots in `design-gradient-shots/` (this dir).
**Owns**: S-6 (netting → perceived-space display), S-13 (easing pane), S-7 (pill cutoffs on this page), stop-editing UX, serializer round-trip UX. Cross-refs: S-2/S-16 (slider thumbs), S-8 (dock), S-9, S-12, S-18, S-24.

**Register assayed against**: the editorial instrument — Fraunces display voice, Fira readout, cartoon-offset shadow, ink+grain, perceptually-true fields. The gradient page's *bones* are right (specimen-row easing accordion, plate hierarchy, per-interval easing model consuming glass-ui `/easing` with 100% value.js curve math). The flesh has one P0 correctness hole, one P0 producer break sitting in the middle of the page, and a set of taste deficits that read as generic furniture.

---

## P0 findings

### P0-1 · The CSS round-trip is a silent model corrupter

**Evidence (measured, live)**: typed `linear-gradient(90deg, notacolor, ???)` into the code editor. Result:

- `applyCSS` **partially applied** the garbage: `type→linear`, `direction→90` took; stops kept the old pair; `intervals` was set to `[]` (parse found 0 color stops → 0 intervals) while 2 stops remained.
- The **entire Easing section vanished** (`intervalPairs.length === 0` with 2 stops live) — probe read `easingHeads: 0`, headings `[Gradient, Interpolation, CSS]`.
- **Zero error feedback**: `parseError` in `GradientCodeEditor.vue` is a dead ref — set `false` at `GradientCodeEditor.vue:109`, **never set true anywhere**; the `border-destructive` class at `:139` is unreachable. Parse failure and parse-garbage-partial-success are both silent.

**Roots**:
- `useGradientModel.ts:144-154` — `applyCSS` is a field-by-field partial apply (`if (parsed.X != null) …`), so a "successful" degenerate parse desyncs `stops` (guarded ≥2) from `intervals` (unguarded). Precept violation: silent handling + a special-case-shaped apply.
- `useGradientCSS.ts:125-236` — `parseGradientCSS` returns a non-null "success" for input in which it consumed nothing meaningful (unknown idents fall through `else { i += 1 }` at `:199-201`). It also **silently drops** whole grammar classes — see P2-15/P2-21.
- Library tie-in (S-24): `parseCSSValue` happily returns a `FunctionValue` whose values include unconsumable junk idents — the demo's only "validity" signal is `instanceof FunctionValue`. The `src/parsing` gradient surface offers no strict-parse affordance a consumer can trust.

**Fix shape (W-item)**: all-or-nothing apply — `parseGradientCSS` returns a *complete* model or `null` (≥2 valid stops, no unconsumed tokens); `applyCSS` swaps the whole state atomically; the editor surfaces failure explicitly (the destructive border + a one-line Fira verdict), or the dead `parseError` ref is excised. **ROOT-ROUTING: value.js demo** (plus an optional strict `parseGradient` helper in **value.js src**).

### P0-2 · glass-ui `EasingPicker` ships its own documented "play button" defect — a clipped ~40px blob in every interval row

**Evidence**: every open easing row renders the playback affordance as a white/dark **40×40 circle with wrapped, clipped text** ("…rac / the…" visible) — shots `gradient-light-1440-easing.png`, `gradient-light-steps-mode.png` (385,594), `gradient-dark-1440-easing.png`, `gradient-mobile-390-mid.png`. Playwright box: 40×40 for a button labeled "Trace the curve".

**Root (CONFIRMED, producer)**: `glass-ui/src/components/custom/easing/EasingPicker.vue:340` — `class="btn-pill glass-btn rounded-pill px-3 py-2 text-sm"`. glass-ui's own `styles/glass/surfaces.css:96-105` declares the two classes **MUTUALLY EXCLUSIVE** and names this exact failure: *"Stacked, the fixed square wins and contain:paint clips the wrapped label into a ~40px blob (the R8-17 'play button' defect)"* — machine-locked by their `proof:demo-affordances` for the demo, but the **published primitive itself** carries the co-occurrence. The one interactive moment of the easing pane is broken furniture.

**Also in the same component** (the known trigger-a11y defect, confirmed): the bezier Preset `SelectTrigger` (`EasingPicker.vue:274`) has **no `aria-label`** (probed `null`); the steps-mode Jump-term trigger (`:303`) has one. The preset combobox's accessible name is whatever preset is selected.

**ROOT-ROUTING: glass-ui producer** (tranche BG/BH is live — dispatch as a paired-authorship fix, not a value.js override).

---

## P1 findings

### P1-3 · "Double-click to add" corrupts the nearest stop first (stop-editing UX)

**Evidence (measured)**: with stops at 0%/100%, a dblclick at x≈46.7% produced `linear-gradient(90deg, rgb(255 0 0) 46.7%, oklch(0.7 0.1 180) 46.7%, rgb(0 0 255) 100.0%)` — the 0% stop was **warped to 46.7%** before the new stop landed on top of it (a 0-width interval, two coincident handles).

**Root**: `GradientStopEditor.vue:32-58` — `onBarPointerDown` warps the *closest stop to the click point* and starts a drag on **every** bar pointerdown; a dblclick fires that twice before `onBarDoubleClick` (`:60-63`) adds. The two gestures fight by construction.

Adjacent stop-editing deficits, same component:
- **Remove is right-click only** (`onHandleContextMenu`, `:96-101`) — undiscoverable, and **impossible on touch**; no mobile remove affordance exists at all.
- The 0%/100% handles hang half outside the bar (`left:0% / translate(-50%)`, `:130-134`) — semicircle collisions with the bar's rounded corners at both ends (all shots; S-7-adjacent cutoff).
- Selected handle takes `z-popover` (`:127`) — a stop handle at popover tier is a z-grammar violation.
- The instruction line ("Double-click to add · Right-click to remove · Drag to reposition", `:146-148`) is 16.4px ink at 40% alpha — instructional chrome standing in for affordance design (S-12 superfluity; excise once the gestures are self-evident).

**ROOT-ROUTING: value.js demo.**

### P1-4 · The code editor rewrites the user's text out from under them

**Evidence (measured)**: typed `conic-gradient(from 45deg, red, oklch(0.7 0.2 200) 50%, blue)`; 500ms after the typing pause the editor content had been **replaced** with `conic-gradient(from 45deg, rgb(255 0 0) 0.0%, oklch(0.7 0.2 200) 50.0%, rgb(0 0 255) 100.0%)` — named colors rewritten to `rgb()`, positions force-appended, the authored literal gone, caret re-seated by character offset into a different-length string.

**Root**: `GradientCodeEditor.vue:113-117` — the `watch(() => modelValue)` re-renders the editor on every model echo, including the echo of the user's own parse, **while the editor is focused**. The 500ms debounce (`:102-104`) turns every typing pause into a steal.

**Fix shape**: never write model→editor while the editor has focus; sync on blur / external reset only; keep the authored color literals (`stops[].cssColor` should carry the source text when it parses, not `val.toString()` — `useGradientCSS.ts:163,187`). **ROOT-ROUTING: value.js demo.**

### P1-5 · S-13 — the easing pane vs. the keyframes.js bar: static where it must be animated, generic where it must be an instrument

The current pane (glass-ui `EasingPicker` seated per interval, `GradientVisualizer.vue:253-303`) against the keyframes.js reference (`../keyframes.js/demo/scenes/easing/` — `EasingSidebar` + `EasingHeroStage` + `PlaybackRibbon` + `useEasingTraceSmear`/`useEasingGhost` + the dblclick gallery egg):

| Facility | keyframes.js bar | gradient page today |
|---|---|---|
| Animated demonstration | hero stage ball + trace smear + ghost curves, looped, scrubbable ribbon (play/reverse + slider) | one-shot `playTravel` rAF (`useEasingPicker.ts:239-248`) behind the P0-2 broken blob; travel dot otherwise **parked at (0,1) overlapping the endpoint marker** (`EasingPicker.vue:264` renders it unconditionally) |
| Curve catalogue | `EasingSelect` dropdown + dblclick gallery tour of the expressive catalogue | a **plain sans dropdown of bare names** (`linear, ease, ease-in…` — shot `gradient-light-preset-open.png`): no curve glyphs, no Fira voice, no descriptions — generic furniture in an app whose *other* selects all carry description sub-lines |
| Duration/feel | full-width duration slider (300–5000ms) | none |
| Readout | complete re-parseable literal + copy (identical) | identical (good — this part landed) |
| Domain preview | ball = the eased *subject* | nothing shows what the ease does to *the gradient* — the model is per-interval color pacing, and the pane never demonstrates it |

**The bar to meet (W-item, two roots)**:
1. **glass-ui producer**: `EasingPicker` v2 — fix P0-2; a real loop/scrub seam (the documented "kf Oscillator loop seam" at `useEasingPicker.ts:111` is the declared slot — kf 5.1.0 exists; consume it or ship a minimal loop); preset menu items carry **mini curve-glyph SVGs** + mono labels; travel dot hidden at rest; PRM-gate the loop.
2. **value.js demo**: per-interval *ramp* demonstration — the open row shows a thin live gradient strip of just that interval with the eased sub-stops marked (the data already exists in `serializeCoalescedGradient`), so "what steps(4, end) does to green→blue" is visible without leaving the row. This is the gradient page's "ball".

### P1-6 · S-6 — the netting expansion: the perceived-space plate (design)

**What is liked**: the spectrum plate's gamut-truth netting — the registered dual-ink 45° hatch (`--gamut-hatch`/`--gamut-hatch-paper`, `style.css:200-212`) painted by `gamutOverlayPaint.ts` over the region sRGB cannot represent, with the boundary polyline from `sampleGamutBoundary` (src `units/color/boundary.ts`). It is the app's most *instrument-true* surface: the netting is measurement, not texture.

**The expansion for the gradient page** — replace the two stacked renderings of the same gradient (the `aria-hidden` preview swatch `GradientVisualizer.vue:167-172` + the stop-editor bar — pure duplication today, P2-16) with **one perceived-space plate + the editing rail**:

1. **Geometry**: an OKLCH **L×C slice** (L vertical, C horizontal) drawn at the ramp's running hue — canvas-painted like the spectrum plate. The gradient's coalesced samples (already computed at resolution 32 in `serializeCoalescedGradient`) project into the slice as an inked **trajectory polyline**, stop handles sitting ON the path. Dragging a stop moves a vertex; authoring an ease redistributes the sample beads along the path *live* — S-6 and S-13 become one instrument.
2. **What the netting encodes** (two nets, one grammar):
   - **Gamut truth** (the liked net, expanded): hatch the slice region outside sRGB — for L×C at fixed hue the boundary is the analytic cusp curve the library already owns (`gamut.ts` Ottosson machinery; `gamutMapOKLabInto` + `deltaEOK` give the jnd-mode locus exactly as `boundary.ts` does for HSV plates). If a wide `interpolationSpace` is selected, the second (paper-ink) net marks the sRGB-vs-wide excess band — the same dual-ink registration discipline.
   - **Perceptual pacing**: **iso-ΔE_OK rungs** across the editing rail — tick the bar at equal `deltaEOK` arc-length intervals along the coalesced ramp. Bunched rungs = fast perceptual change; open rungs = a flat zone. The easing's *perceptual* effect becomes visible netting; a `steps(4)` interval reads as 4 rung-free bands with hard rung clusters at the risers.
3. **Library math consumed (the boundary law — value.js computes, the demo only paints)**: `sampleGamutBoundary`/`sampleGamutBoundaryInto` (`boundary.ts`), `deltaEOK` + `gamutMapOKLabInto` (`gamut.ts`), `okhslToSrgb`/`okhsvToSrgb` (`okhsl.ts` — the alternative S×L plate if the L×C slice proves unreadable at low chroma), `mixColors` (`mix.ts`). **One src ask (S-24 tie-in)**: an L×C-slice boundary sampler twin (`sampleOKLChSliceBoundary(hue, columns)` — the cusp polyline in unit-square coords), so the demo never re-derives gamut geometry. **Zero new demo math.**
4. **Paint discipline (DRY, at the root)**: the hatch painter + ink probe in `gamutOverlayPaint.ts` are currently picker-local; lift the dual-ink hatch/probe primitives to a shared demo module (or glass-ui if a second consumer appears there) rather than copying. The netting idiom must have ONE home.

**ROOT-ROUTING: value.js demo (plate + rail) + value.js src (the slice-boundary sampler).**

### P1-7 · Code-literal typography: label tokens uppercase the code

**Evidence (measured)**: the interval-head literal renders `CUBIC-BEZIER(0, 0, 1, 1)` / `STEPS(4, END)` — computed `text-transform: uppercase` from `text-mono-caption` (`GradientVisualizer.vue:273`), which glass-ui defines as the **uppercase eyebrow token** (`glass-ui/styles/typography/utilities.css:42`, "mono · caption · uppercase"). CSS literals are case-sensitive code wearing a label costume — a Fira-readout register violation. Same misuse risk anywhere `text-mono-caption` wraps a literal. **Fix**: a non-transforming mono-code rung (if the type scale lacks one, add it **at the root** — glass-ui typography); the demo swaps the class. **ROOT-ROUTING: value.js demo (consumer swap) + glass-ui (token, if missing).**

### P1-8 · The CSS editor is a foreign object: stock GitHub hljs themes

`GradientCodeEditor.vue:11-12` imports `github.css` / `github-dark.css` wholesale — a **white paper card in light** (shot `gradient-light-1440-easing.png`, bottom) and a **cold `#0d1117` navy plate in dark** (shot `gradient-dark-1440-easing.png`) with GitHub's blue token palette, sitting on the warm parchment/chocolate card. It is the single most off-register surface on the page. The markdown pane has the same pattern (`useMarkdownHighlighting.ts` — same two imports). **Fix at the root**: ONE house hljs theme authored from the app's tokens (crayon primaries proportioned, Fira), consumed by both. Also: the theme `<style>` is injected into `document.head` per-component-family (`GradientCodeEditor.vue:32-46`) — a second injection idiom to unify. **ROOT-ROUTING: value.js demo.**

### P1-9 · Dark scheme: the page is half-flipped; labels drown

Shots `gradient-dark-1440-top.png` / `-easing.png`:
- The **app field + dock stay light-mode pink** while cards flip to dark chocolate — the shell reads light, the plates read dark; hierarchy inversion (cards darker than the void behind them). Cross-ref S-18 (aurora derives nothing from the current color; owned by the shell/aurora lane) — but the gradient page is where it reads worst because the two big plates are side-by-side against the pink.
- **Section labels/subtitles are near-invisible in dark**: `TYPE/SPACE/HUE` eyebrows + descriptions + the `PRESET` label + the interval-head literal all sit at muted-foreground alphas tuned for light. Measured light-mode: `section-label` `rgb(112,89,66)`; hint line 40% alpha. In dark they fall below comfortable legibility (see `-easing.png`: "PRESET" barely reads).
**ROOT-ROUTING: shell portion → the shell/aurora lane (cross-ref); the label-contrast portion → value.js demo tokens.**

### P1-10 · Sliders on this page have NO visible thumb at rest (S-2/S-16 cross-evidence)

**Measured**: the Direction slider thumb (`.slider-thumb.glass-specular-track.touch-hit-area`) computes **`width: 0, opacity: 0`** at rest — light AND dark shots show a bare filled track for Direction and Steps-(n). A scrubber with an invisible handle is affordance loss, not minimalism. (S-2 says picker thumbs render *black*; here they don't render at all — likely the same root surface in the slider skin.) **ROOT-ROUTING: glass-ui producer** (slider thumb rest-state), verified from this page.

### P1-11 · The Interpolation row's description sub-lines truncate everywhere (S-12)

`GradientVisualizer.vue:191,209,227` render `activeTypeDesc/activeSpaceDesc/activeHueDesc` as one-line subtitles above each select. Measured: at 1440 the 3-col grid truncates "Perceptual, hue-…"; at 390 "Left-to-righ…"/"Perceptual,…" (shots `-top.png` / `gradient-mobile-390-top.png`). The same descriptions already live inside the dropdown items (`:200,218,236`). Duplicated, truncated metadata = superfluity; **excise the subtitle line** (keep descriptions in the menus). **ROOT-ROUTING: value.js demo.**

### P1-12 · Spontaneous idle navigation `#/gradient → #/browse` (observed 2×) + dock occlusion misdirects clicks (S-8 evidence)

- **Twice** in one session, with zero interaction between probes (only DOM reads), the app navigated itself from `#/gradient` to `#/browse` (~seconds of idle; palette API CORS-dead at the time — dev serves against `https://api.color.babb.dev`, `api/client.ts:35` `BASE_URL` default, S-11 context). No `switchView("browse")` call site exists in the tree (grep) — an unowned navigation path. Investigation item; suspect the reka view-Select or wiring watchers under API-failure churn.
- The collapsed dock summary layer **intercepts pointer events over the expanded controls**: Playwright could not click "Toggle action bar" (blocked by `.dock-layer--summary`, then post-expand by the view-select trigger + `.dock-layer-item-host`), and a retried click **landed a navigation to `#/extract`**. The collapsed pill also clips its text ("Gr" over the WatercolorDot — shots `gradient-light-steps-mode.png` top, `gradient-light-preset-open.png`). At 390 the dock's view pill row clips at the container edge ("Gradient | Pale…" — shot `gradient-mobile-390-top.png`) — **S-7 confirmed on this page's dock**.
**ROOT-ROUTING: value.js demo (dock layers + navigation investigation); cross-ref the shell lane which owns S-8.**

---

## P2 findings

- **P2-13** · Sticky pane header scroll-collision: scrolled content ghosts through/behind the "Gradient" header bar ("OKLCh" under the title, "Easing" halved — shots `-easing.png`, `gradient-mobile-390-mid.png`). The `pane-scroll-fade` mask + header opacity don't fully occlude. *value.js demo.*
- **P2-14** · `resolution` (`useGradientInterpolation.ts:68`, fixed 32) has **no UI** — dead affordance state; expose it or inline the constant (KISS). *value.js demo.*
- **P2-15** · Round-trip literal fidelity: `red` → `rgb(255 0 0)`, positions force-decorated `0.0%/100.0%` (measured, P1-4 evidence). Keep source literals on parse. *value.js demo.*
- **P2-16** · The hero preview (`aria-hidden`) and the stop bar are two stacked renderings of the same gradient — duplication the S-6 plate dissolves. *value.js demo.*
- **P2-17** · Radial grammar: unsupported end to end — `radial-gradient(circle at 30% 30%, …)` parses "successfully" and **silently drops** `circle at 30% 30%` (measured round-trip). Either model shape/position or reject explicitly; today it's silent data loss. Conic `from Xdeg` round-trips correctly (measured). *value.js demo (+ src if a strict gradient AST lands).*
- **P2-18** · e2e: `e2e/smoke/views/gradient.spec.ts` is one render-smoke test (32 LoC). No coverage of stop add/remove/drag, round-trip, easing authoring — every P0/P1 above was reachable by a 5-line spec. *value.js demo (e2e).*
- **P2-19** · The pointermove → full `coalescedCSS` recompute (parse 2 colors/interval + 32 `mixColors` + string build) repaints **two** gradient surfaces per event, unthrottled (`GradientStopEditor.vue:76-90` → model → two `:style` bindings). Fine on desktop Chromium; rAF-coalesce for the S-23 posture (Safari conic repaint is the risk). *value.js demo.*
- **P2-20** · `EasingPicker`'s always-rendered travel dot at rest overlaps the (0,1) endpoint marker (`EasingPicker.vue:264`) — a stray bead on every static curve. *glass-ui producer (fold into P0-2/W-G2).*
- **P2-21** · `GradientVisualizer.vue` hand-builds the accordion around bare `EasingPicker` while glass-ui ships `EasingConfigurator` (the chassis register written *for the value.js GradientPane consumer shape* per its own header comment) — divergence to reconcile whichever way the S-13 redesign lands. *value.js demo ↔ glass-ui.*

## Candidate wave-items

| id | scope | root | finding |
|---|---|---|---|
| W-G1 | Atomic `applyCSS` + explicit parse-failure surface (wire-or-excise `parseError`); strict parse contract | value.js demo (+src helper) | P0-1 |
| W-G2 | EasingPicker fixes: play button un-blob (`btn-pill`×`glass-btn`), preset trigger a11y label, travel-dot rest state | glass-ui producer | P0-2, P2-20 |
| W-G3 | Stop-editor interaction rework: dblclick/warp truce, touch remove, end-handle geometry, z-tier, excise hint line | value.js demo | P1-3, P2-13 |
| W-G4 | Code-editor truce: no rewrite while focused; preserve authored literals | value.js demo | P1-4, P2-15 |
| W-G5 | Easing pane v2 to the kf bar: loop/scrub seam + curve-glyph preset menu (producer); per-interval live ramp strip (demo) | glass-ui + value.js demo | P1-5 |
| W-G6 | The perceived-space plate: L×C netting slice + trajectory + iso-ΔE rungs; lift the hatch painter to ONE home; `sampleOKLChSliceBoundary` | value.js demo + src | P1-6, P2-16 |
| W-G7 | ONE house hljs token theme (gradient + markdown), kill GitHub css imports | value.js demo | P1-8 |
| W-G8 | Type hygiene: mono-code rung (no uppercase on literals); excise truncated subtitle row | value.js demo (+glass-ui token) | P1-7, P1-11 |
| W-G9 | Dark-scheme label contrast on the plates (shell field/dock → shell lane) | value.js demo | P1-9 |
| W-G10 | Gradient interaction e2e spec | value.js demo | P2-18 |
| W-G11 | Investigate the unowned idle `#/browse` navigation; dock layer hit-testing | value.js demo | P1-12 |
