# N.W16 — PER-PANE: the picker hero, gradient+easing as one hero motif, mix (inv-N-9 closes), extract's dominant hero, the structurally-dead docs stylesheet, the modern-web carry (router 4→5)

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15 — `EXECUTION-ORCHESTRATION.md §0`/`§5`).
No longer PLANNED.

**Round:** R3 (the design body — `EXECUTION-ORCHESTRATION.md §2`, `:74`). Runs beside N.W13 (controls),
N.W14 (cards), N.W15 (perf), N.W17 (shell/motion/pops). **Consumes W12's keystone** (the font root that
makes Fraunces paint + the accent axis + the φ ladder + the depth laws — DAG `WAVES-2.md:276-287`) and
**W10's gate-opener** (the cascade kill at W10.D, the save-P0 at W10.C, and the kC-placebo thread at
W10.C — the per-pane π gate is structurally blind until the desktop renders). Carries one BA-gated
half — the `EasingConfigurator` consume (lane B's WO-E1) — that is an INTERIM in-repo restyle now and
DIES at the W18 glass-ui-cut consume (`WAVES-2.md:36` "easing-configurator consume = W18").

**Disposition:** IMPL unilateral (Fable) — every lane is demo-owned design work over the per-pane
surfaces; the one cross-repo edge (the easing-configurator port) is an ASK filed in the BA letter and
consumed at W18, never authored here. The standing W6.A per-pane Fable structure governs (per-pane
Fable agents + 1 synthesis lane, re-runnable; the W0-style gate = boot-green console-clean on all 14
routes — now REAL post-W10.D).

**Idiom:** matches `N.md §4` + `WAVES-2.md §N.W16` + the N.W10–N.W15 wave-spec precedent — §-structured,
hard-gate-per-lane, file:line-grounded; every claim cites a `demo/` (or `src/`) file:line, an audit-lane
§, or a command+output run TODAY against the working tree / the built `dist/gh-pages` / the installed
glass-ui 3.13.0 (inv ε). **DEVELOPMENT doc — nothing implemented; no source/test/CI edits.** Every
anchor is a SPEC binding-site, not a change.

---

## §0 — One-paragraph reading

The picker (the HERO pane) carries its loudest typographic element — the color numbers — at a raw
`text-4xl` (`ColorComponentDisplay.vue:3`, not a φ rung) in a system fallback face, on a card occupying a
third of the viewport, with the blob a grid child that lands top-CENTER and physically collides with
those numbers (`ColorPicker.vue:4,22` — `grid grid-cols-3` + the blob `col-start-2 col-span-2 row-span-2`,
`HeroBlob.vue:8` `w-[7rem]`), and a `text-title sm:text-display` space trigger whose `sm:` half is a
measured cascade no-op (D1 §0). The gradient pane opens with two stacked near-identical rectangles and
buries its one math motif (the per-interval easing) in a 48×32 postage-stamp SVG drawn in a hardcoded
`hsl(248, 88%, 71%)` literal (`EasingSelector.vue:56,63`). The mix pane computes its result synchronously
at t=0 then withholds it 3.06 s behind hardcoded `setTimeout(800/2300/2900)` timers and a
`v-if="… animationPhase === 'done'"` gate (`useMixingState.ts:84-89`, `MixPane.vue:109`), runs the ONE
LIVE un-gated rAF loop in the demo with zero `matchMedia` (`useMixingAnimation.ts:77,83,99,189,196` — the
inv-N-9 hole), and paints an sRGB-mean preview that diverges from the OKLab result it celebrates. Extract
discards `population`/`dominant` at the consumer boundary (`ExtractPane.vue:119-122` maps to `{css,
position}` only) and duplicates a 247-LoC twin (`ImagePaletteExtractor.vue`). The docs panes carry a
STRUCTURALLY DEAD `<style scoped>` block (`Markdown.vue:68-316`) whose every nested selector can never
match the foreign-rendered markdown children — every h2/p/pre computes 16px/0-margin/0-padding — while
KaTeX renders `output:"mathml"` at both sites (`Katex.vue:21`, `useMarkdownHighlighting.ts:89`), mangling
matrices and clipping a 564px formula. And the twice-deferred modern-web carry (router 4→5, the
hash-write debounce + no-op `scrollBehavior`, the `dispatch.ts` hue-cluster decomposition into `mix.ts`,
`Palette` id-honesty, the `/diff` decision) is still on `vue-router ^4.6.4` (`package.json:121`). N.W16
re-authors each pane to its house gestalt: the number system on the display ramp with `AnimatedDigit`
cells + a ch-reservation card-lock; ONE gradient hero surface with the eased curve drawn on the gradient
in a tokenized stroke; mix un-withheld (result-appears ≤ 150 ms, the animation becomes celebration, the
PRM gate at the composable boundary — inv-N-9 CLOSES); extract's max-population dominant hero + a
population-proportional strip + the dup-shell collapse; the scoped markdown block DELETED for an unscoped
`docs-prose.css` on the glass-ui ladder with a computed-style witness in CI (the anti-P9 gate); and
vue-router@5 in the lockfile.

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit **U31** | "The hero numbers must NOT resize the card; lock it" — the picker card-lock constraint (lane A) | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` U31 row |
| User audit **U2** | the prose-flow (atomic cells, no orphaned commas mid-list) — the non-columnar number flow (lane A) | `LEDGER.md` U2 row |
| User audit **U30a/U30b** | the audacious space dropdown (a) + the blob's place: big, absolutely top-right (b) (lane A) | `LEDGER.md` U30a/U30b rows |
| User audit **U3** | the blob pallor (the near-white SEED, NOT the deriver — `U-BLOB` disproved `chromaCeiling`) (lane A; the seed half) | `LEDGER.md` U3 row |
| User audit **U25** | the easing-section hierarchy (the postage-stamp curve → a hero canvas) (lane B) | `LEDGER.md` U25 row |
| User audit **U27** | the first-class easing-configurator (keyframes.js donor → glass-ui port, consumed at W18) (lane B WO-E1) | `LEDGER.md` U27 row |
| User audit **U4/U5** | the docs definition gap (U4) + the sectional φ rhythm "padding around dividing lines" (U5) (lane E) | `LEDGER.md §G` U4/U5 rows |
| Lane **D1** | the picker design answer (full): the dual-hero diagonal, the hero-number system spec (§2), the audacious space dropdown (§3), the blob place (§4), the in-card φ rhythm (§6), the work-orders D1-1..D1-7 + the T21 EditDrawer aside | `docs/tranches/N/audit/lanes2/D1.md` (full lane; WOs `:269-287`) |
| Lane **D2** | the gradient/easing/mix design answer (full): the easing hierarchy + the donor anatomy + the WO-E1 port spec (§1), the gradient hero motif (§2), mix un-withhold + preview-honesty + the PRM hole + wash discipline (§3), the WO index + π gates (§4) | `docs/tranches/N/audit/lanes2/D2.md` (full lane; WOs `:136-155`) |
| Lane **D3** | extract's dominant hero + population threading (§4b) + the ExtractPane↔ImagePaletteExtractor dup-shell collapse (§5) — the D3-5/D3-6 work-orders (the rest of D3 → N.W14) | `docs/tranches/N/audit/lanes2/D3.md:136-211,256-266` |
| Lane **D4** | the docs design answer (full): the structurally-dead stylesheet headline (F2), the definition gap (F3), the φ ladder (D1), `docs-prose.css` + the computed-style witness (D2), the AboutPane recomposition (D3), KaTeX `output:"html"` (D4/F6), the 68ch cap (D5), the WO ledger | `docs/tranches/N/audit/lanes2/D4.md` (full lane; WOs `:233-244`) |
| Lane **U-BLOB** | the blob pallor root: the near-white SEED, not the deriver (disproves `chromaCeiling`); the `uSatColor[]` satellite half is W18 | `docs/tranches/N/audit/lanes2/U-BLOB.md` (lane A seed half) |
| Lane **R3 fold-ledger v2** | the modern-web carry rows: K-W5RT (router-5), K-DISP (dispatch→mix), K-PALID (id-honesty), K-W3DIFF (the `/diff` decision), X8 (direct-hash boot), X12 — all "OPEN → N2 modern-web", twice-deferred M→N.W6→N2 (lane F) | `docs/tranches/N/audit/lanes2/R3-fold-ledger-v2.md:76,147,151` |
| WAVES-2 §N.W16 | the ratified lane table A–F + the hard gate | `docs/tranches/N/WAVES-2.md:166-182` |
| WAVES-2 §4 (inv deltas) | inv-N-9 (PRM-complete) — the ONE live un-gated rAF is the mix-canvas loop, closes at W16.C | `docs/tranches/N/WAVES-2.md:313-335` |
| WAVES-2 §5 (coverage) | U31/U2/U30a/U30b → W16.A; U25/U27 → W16.B; U4/U5 → W16.E | `docs/tranches/N/WAVES-2.md:337-377` |
| EXECUTION-ORCHESTRATION §2 | R3 placement; the W10.D gate-opener precondition (the cascade kill is the substrate every later per-pane gate stands on); the W12 keystone precedence | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:56-83` |

**Source-tree roots (the live defects + the live substrate, all verified 2026-06-15 at `tranche-f-handoff`):**

| File:line | What lives there | Lane |
|---|---|---|
| `demo/@/components/custom/color-picker/display/ColorComponentDisplay.vue:3` | `class="flex h-fit text-4xl w-full m-0 p-0 … gap-x-2 flex-wrap font-normal"` — the hero numbers at a raw Tailwind size, NOT a φ rung; the orphaned-comma flex-wrap break | A |
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:17` | `class="… italic text-title sm:text-display …"` — the `sm:` display half is a measured cascade no-op (32.9px ≠ the 41.9px it claims; D1 §0) | A |
| `demo/@/components/custom/color-picker/ColorPicker.vue:4` | `<CardHeader class="… grid grid-cols-3 grid-rows-[auto_auto] …">` — the 3-column grid that flows the blob top-center | A |
| `demo/@/components/custom/color-picker/ColorPicker.vue:22` | `<HeroBlob … class="col-start-2 col-span-2 row-span-2 justify-self-end" …/>` — the blob as a grid CHILD (lands top-center, collides with the numbers) | A |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue:8` | `class="w-[7rem]"` — the 112px puck (the satellites sub-perceptual; U-BLOB) | A |
| `demo/@/components/custom/color-picker/ColorPicker.vue:33` | `<EditDrawer …/>` mounted UNCONDITIONALLY (the T21 mounted-`display:none` drawer) | A |
| `demo/@/components/custom/gradient/EasingSelector.vue:56` | `<svg width="48" height="32" …>` — the 48×32 postage-stamp curve | B |
| `demo/@/components/custom/gradient/EasingSelector.vue:63` | `<polyline … stroke="hsl(248, 88%, 71%)" …/>` — the hardcoded violet literal (NOT a token; C2-4) | B |
| `demo/@/components/custom/gradient/GradientVisualizer.vue:118-230` | the two stacked near-identical rectangles (preview `:121-126` + stop bar) + the Easing section + the flat `text-muted-foreground` section heads | B |
| `demo/@/components/custom/gradient/GradientStopEditor.vue:104-149` | the interactive stop bar (same `coalescedCSS` as the preview — the redundant second rectangle) + the 40%-opacity discoverability hint | B |
| `demo/@/components/custom/mix/composables/useMixingState.ts:84-89` | `setTimeout(…"mixing",800); setTimeout(…"revealing"+set mixResult,2300); setTimeout(…"done",2900)` — the result computed at t=0, withheld 3.06 s behind hardcoded timers | C |
| `demo/@/components/custom/panes/MixPane.vue:109` | `v-if="mixResult && animationPhase === 'done'"` — the withholding gate (the result exists at t=0, shown at t≈3061ms) | C |
| `demo/@/components/custom/mix/composables/useMixingAnimation.ts:77,83,99,189,196` | the rAF loop (`requestAnimationFrame(render)`) with ZERO `matchMedia` anywhere under `mix/` — the ONE live un-gated rAF (the inv-N-9 hole) | C |
| `demo/@/components/custom/mix/composables/useMixingAnimation.ts:151-181` | the sRGB-channel-mean suffuse overlay (written twice) — the non-perceptual preview that diverges from the OKLab result | C |
| `demo/@/components/custom/mix/composables/useMixingState.ts:65` | `startMix` checks only `canMix` — no re-entry guard (a second click stacks a second timer chain) | C |
| `demo/@/components/custom/panes/ExtractPane.vue:119-122` | the result mapping `{ css, position }` — `population` discarded at the consumer boundary | D |
| `demo/@/components/custom/panes/ExtractPane.vue:143-145` | `runQuantize()` → `quantizeFromFile(lastFile.value, colorCount.value)` — `chromaWeight` never forwarded (the kC placebo's call site; the worker thread fix is W10.C) | D |
| `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue` (247 LoC) | the dup-shell twin (95 identical normalized lines vs `ExtractPane.vue`; D3 §5) | D |
| `demo/@/components/custom/palette-browser/PaletteColorStrip.vue:20-22` | the equal-width segments — `population`-proportional `:weights` absent (hardcoded equal) | D |
| `demo/@/components/custom/markdown/Markdown.vue:68-316` | the `<style scoped>` block — every nested selector unmatchable against the foreign-rendered children (the structurally-dead stylesheet, F2) | E |
| `demo/@/components/custom/markdown/Markdown.vue:10` | `class="markdown-wrapper font-display"` — the blanket `font-display` over the ENTIRE docs body (the latent Fraunces flip, F7) | E |
| `demo/@/components/custom/katex/Katex.vue:21` | `output: "mathml"` — the matrix-mangle root (F6) | E |
| `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts:89` | `output: "mathml"` — the second KaTeX render site | E |
| `demo/@/components/custom/markdown/composables/useMarkdownColors.ts:43-45` | the `--md-color-*` OKLab safe-accent producer (alive, EXCELLENT) with ZERO living consumers — the orphan to reconnect (F2) | E |
| `demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue` + `panes/AboutPane.vue:16-27` | the definition gap (the 1px seam) + the flat nutrition rhythm + the "Detailed Guide" inverted ramp | E |
| `package.json:121` | `"vue-router": "^4.6.4"` — the router on v4 (the K-W5RT carry, twice-deferred) | F |
| `demo/@/composables/usePaneRouter.ts`, `demo/@/composables/viewSchema.ts` | the pane-router + the `VIEW_MAP` single-source the router-5 migration + typed routes land on | F |
| `demo/@/components/custom/color-picker/composables/useColorUrl.ts:52,73` | the model→URL debounced writer + `router.replace({query})` — the hash-write debounce + no-op `scrollBehavior` carry (LP3-4) | F |
| `src/units/color/dispatch.ts` (the LIBRARY file; hosts `mixColors`/`interpolateHue`/`gamutMap`) + `src/units/color/mix.ts` | the K-DISP carry: the hue-cluster decomposition lands in `mix.ts` (which exists) — a library decomposition, NOT a demo file | F |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below was run against the working tree at `tranche-f-handoff` (or the built
`dist/gh-pages/` artifact / the installed glass-ui 3.13.0). The probes are the born-RED witnesses the
§Hard gate inverts.

### SV-A — The picker hero: raw size, colliding grid blob, the no-op trigger pair (lane A)

```
$ grep -n "text-4xl" demo/@/components/custom/color-picker/display/ColorComponentDisplay.vue
3:        class="flex h-fit text-4xl w-full m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap font-normal"
$ grep -n "grid-cols-3\|col-start-2 col-span-2 row-span-2\|w-\[7rem\]" \
     demo/@/components/custom/color-picker/ColorPicker.vue \
     demo/@/components/custom/color-picker/visual/HeroBlob.vue
ColorPicker.vue:4:  …grid grid-cols-3 grid-rows-[auto_auto] gap-x-3 items-start…
ColorPicker.vue:22: <HeroBlob … class="col-start-2 col-span-2 row-span-2 justify-self-end" …/>
HeroBlob.vue:8:     class="w-[7rem]"
$ grep -n "text-title sm:text-display" demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue
17:            class="w-fit h-fit italic text-title sm:text-display tracking-tight …"
$ grep -n "<EditDrawer" demo/@/components/custom/color-picker/ColorPicker.vue
33:        <EditDrawer
```

**Confirmed born-RED:** the hero numbers ride `text-4xl` (a raw Tailwind size, not the display-3 φ rung
the design wants — D1 §2); the blob is a 3-column grid CHILD at `col-start-2 col-span-2 row-span-2`
(lands top-center, measured canvas center-x 452 vs card center 468 — collides with the numbers, D1 §4)
sized `w-[7rem]` (112px puck); the `text-title sm:text-display` trigger pair is the measured cascade
no-op (D1 §0 — the `sm:` variant never wins against the custom-utility cascade order); the `EditDrawer`
mounts unconditionally (T21). All five live.

### SV-B — The gradient/easing: the postage-stamp curve in a hardcoded violet (lane B)

```
$ grep -n "width=\"48\" height=\"32\"\|hsl(248, 88%, 71%)" \
     demo/@/components/custom/gradient/EasingSelector.vue
56:        <svg width="48" height="32" viewBox="-0.05 -0.3 1.1 1.6" preserveAspectRatio="none"
63:            <polyline :points="curvePoints" fill="none" stroke="hsl(248, 88%, 71%)" stroke-width="0.06" …/>
$ wc -l demo/@/components/custom/gradient/EasingSelector.vue
      66 demo/@/components/custom/gradient/EasingSelector.vue
```

**Confirmed born-RED:** the pane's one math motif renders at 48×32 postage-stamp scale (`:56`) in a
hardcoded `hsl(248, 88%, 71%)` literal (`:63`) — not a token (C2-4). The whole component is 66 LoC; it is
RESTYLED in place by WO-E2 (NOT a parallel component) and DELETED at the W18 configurator consume (WO-E1).
The donor lives in keyframes.js (`EasingEditor.vue`/`EasingCurveCanvas.vue`/`EasingSelect.vue` —
D2 §1.2); value.js is the math substrate (`timingFunctions`/`CSSCubicBezier`).

### SV-C — Mix: the withheld result + the live un-gated rAF (the inv-N-9 hole) (lane C)

```
$ grep -n "setTimeout\|animationPhase.value = " demo/@/components/custom/mix/composables/useMixingState.ts
84:            setTimeout(() => { animationPhase.value = "mixing"; }, 800);
85:            setTimeout(() => {
86:                animationPhase.value = "revealing";
87:                mixResult.value = { type: "color", css };
88:            }, 2300);
89:            setTimeout(() => { animationPhase.value = "done"; }, 2900);
$ grep -n "v-if=\"mixResult && animationPhase === 'done'\"" demo/@/components/custom/panes/MixPane.vue
109:                        v-if="mixResult && animationPhase === 'done'"
$ grep -nc "requestAnimationFrame" demo/@/components/custom/mix/composables/useMixingAnimation.ts
5
$ grep -nc "matchMedia\|prefers-reduced" demo/@/components/custom/mix/composables/useMixingAnimation.ts
0
```

**Confirmed born-RED:** the result `css` is set at the t=2300 timer (`:87`) but shown only at
`animationPhase === 'done'` (the t=2900 timer, `:89` × `MixPane.vue:109`) — D2 §3.1 measured the result
APPEARING at **t≈3061ms** for a computation that completes synchronously at t=0. The mix-canvas rAF loop
has FIVE `requestAnimationFrame` sites and ZERO `matchMedia` — the one LIVE un-gated continuous render
loop in the demo (the inv-N-9 hole; the watercolor fork's dormant hole already died at N.W5's consume,
`WAVES-2.md:175`). The sRGB-mean preview at `useMixingAnimation.ts:151-181` diverges from the OKLab result
(D2 §3.3 measured: paints `rgb(145,51,162)` vs the true `rgb(156,91,173)` for #ff2244+#2244ff).

### SV-D — Extract: population discarded, the dup-shell, the equal strip (lane D)

```
$ sed -n '119,122p' demo/@/components/custom/panes/ExtractPane.vue
const extractedPalette = computed<Palette | null>(() => {
    if (palette.value.length === 0) return null;
    const colors: PaletteColor[] = palette.value.map((c, i) => ({
        css: c.css,
        position: i / Math.max(1, palette.value.length - 1),
$ grep -n "quantizeFromFile(lastFile" demo/@/components/custom/panes/ExtractPane.vue
145:        quantizeFromFile(lastFile.value, colorCount.value);
$ wc -l demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue
     247 demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue
```

**Confirmed born-RED:** the result map carries ONLY `{css, position}` (`:119-122`) — `QuantizedColor.population`
(computed and returned by the worker, `src/quantize/types.ts:41`) is discarded at the consumer boundary;
`dominantColor()` (public API, `src/quantize/index.ts:176`) has zero demo consumers (D3 §4b). The
`runQuantize` call forwards only `colorCount` (`:145`) — `chromaWeight` never reaches the worker (the kC
placebo; the worker-signature thread is W10.C's, lane D wires the hero off the corrected output). The
247-LoC twin is the dup-shell (D3 §5 — 95 identical normalized lines). The strip is equal-width
(`PaletteColorStrip.vue:20-22`, no `:weights`).

### SV-E — Docs: the structurally-dead scoped stylesheet + KaTeX mathml (lane E — THE headline)

```
$ grep -n "style scoped\|markdown-wrapper font-display\|& > h2\|& > p\|& > pre" \
     demo/@/components/custom/markdown/Markdown.vue
10:    <div … class="markdown-wrapper font-display" :style="mdColorVars">
68:<style scoped>
$ wc -l demo/@/components/custom/markdown/Markdown.vue
     316 demo/@/components/custom/markdown/Markdown.vue
$ grep -n "output: \"mathml\"" \
     demo/@/components/custom/katex/Katex.vue \
     demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts
Katex.vue:21:                output: "mathml",
useMarkdownHighlighting.ts:89:                output: "mathml",
```

**Confirmed born-RED — THE W16 headline.** `Markdown.vue:68-316` is a `<style scoped>` block: the Vue
scoped compiler appends a `[data-v-…]` scope attribute to every NESTED child selector, but the
markdown-rendered children (compiled by unplugin-vue-markdown into a SEPARATE component) carry NO scope
attribute — so every nested rule is unmatchable. D4 §F2 measured the live consequence (Lab doc, 1440px):
`> h2` → 16px/400 (intended 30px/600); `> p`/`ul`/`li`/`hr` → margin 0; `> pre` → padding 0/margin 0 (a
flush white slab); the `content-visibility:auto` perf rule → dead; KaTeX `> div…:has(>.katex)` → dead
(formulas clip). The `--md-color-*` producer (`useMarkdownColors.ts:43-45`) is alive and excellent with
ZERO living consumers — the orphan to reconnect. This is inv-N-7's sibling failure mode: **phantom
SELECTORS** (rules that exist but can never match). KaTeX renders `output:"mathml"` at BOTH sites —
mangling matrices (D4-06) and clipping Lab's widest formula (564px in a 454px body, D4-05). The blanket
`font-display` (`:10`) over the whole docs body is the LATENT Fraunces flip: the moment W2.B's emission
lands, every paragraph silently flips to serif unless WO-3 strips it first (F7).

### SV-F — The modern-web carry: router on v4 (lane F)

```
$ grep -n "vue-router" package.json
121:        "vue-router": "^4.6.4",
$ grep -n "\"vue-router\"" package-lock.json | head -3
60:                "vue-router": "^4.6.4",     ← the demo's direct dep
196:                "vue-router": "^5.1.0",     ← a transitive (NOT the demo's)
$ grep -n "router.replace\|debounce" \
     demo/@/components/custom/color-picker/composables/useColorUrl.ts
52:    const syncModelToUrl = debounce(() => {
73:        router.replace({ query: { ...route.query, space, color } });
$ ls src/units/color/dispatch.ts src/units/color/mix.ts
src/units/color/dispatch.ts   src/units/color/mix.ts
```

**Confirmed born-RED:** the demo's direct `vue-router` dep is `^4.6.4` (`package.json:121`, lockfile
`:60`) — the router-5 migration (K-W5RT) + typed routes + the `VIEW_MAP` single-source are unaddressed
(twice-deferred M→N.W6→N2, `R3-fold-ledger-v2.md:76`). The hash-write debounce + no-op `scrollBehavior`
(LP3-4) ride `useColorUrl.ts:73`'s `router.replace`. The K-DISP carry is a LIBRARY decomposition: the
hue-cluster lives in `src/units/color/dispatch.ts` (which hosts `mixColors`/`interpolateHue`/`gamutMap`);
it decomposes into the existing `src/units/color/mix.ts` — NOT a demo file (the §Design-decisions
re-scopes this honestly).

### SV-gate-opener — The cross-wave born-RED roots (W10.C / W10.D), proven on the live built demo

W16's per-pane π gate (boot-green console-clean on all 14 routes + the per-pane before/after element
pairs) is structurally blind until N.W10 lands — the cascade kill means the desktop never renders, so any
in-viewport / element-shot evidence is meaningless (`EXECUTION-ORCHESTRATION.md:56-62`; the gate-opener
ordering). Both W10 roots are born-RED TODAY:

**The cascade kill (W10.D, U11's true root) — LIVE on the BUILT demo artifact.** The demo imports
glass-ui's styles UNLAYERED at the source root:
```
$ grep -n "@import \"@mkbabb/glass-ui/styles\"" demo/@/styles/style.css
52:@import "@mkbabb/glass-ui/styles";
53:@import "@mkbabb/glass-ui/styles.css";       ← bare, NO layer(glass-ui)
```
And the shipped bundle proves the cascade conflict directly. The display utilities are emitted OUTSIDE
every `@layer` block, while the responsive `lg:*` utilities are INSIDE `@layer utilities`:
```
$ BD=dist/gh-pages/assets/index-OigTVKLL.css      # the SHIPPED demo CSS
$ grep -oE "@layer [a-z, -]+" $BD                  → properties / theme / base / components / utilities
# net brace depth at each emission (0 = top-level/unlayered; >0 = nested/layered):
$ python3 - <<'PY'
css=open("dist/gh-pages/assets/index-OigTVKLL.css").read()
for needle in [".hidden{display:none}", ".lg\\:flex{display:flex}"]:
    import re
    for m in re.finditer(re.escape(needle), css):
        d = css[:m.start()].count("{") - css[:m.start()].count("}")
        print(f"{needle!r:28} at {m.start():>7}  brace-depth {d}")
PY
'.hidden{display:none}'      at  118348  brace-depth 2     ← Tailwind's own (inside @layer utilities)
'.hidden{display:none}'      at  288211  brace-depth 0     ← glass-ui's, UNLAYERED (top-level)
'.lg\\:flex{display:flex}'   at  171931  brace-depth 2     ← the demo's desktop driver (layered)
# context of the unlayered .hidden:
…overflow:hidden}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}…
```
The shipped `dist/gh-pages/assets/index-OigTVKLL.css` emits a bare top-level
`.block/.flex/.grid/.hidden{display:none}` (brace-depth 0) alongside the layered demo `.lg\:flex`
(brace-depth 2, inside `@layer utilities` + a `@media`). Per CSS Cascade Level 5 an UNLAYERED declaration
beats ALL layered ones regardless of specificity or source order — so glass-ui's bare `.hidden`
(applied via `App.vue:45`'s `hidden lg:flex` / `App.vue:58`'s `hidden lg:block`) defeats the demo's
layered `lg:*` → both desktop pane wrappers compute `display:none` → the desktop dual-pane never renders
(D8-1 / U-DOCK §2; U11's true root). **Born-RED on the live built demo, not merely the source.**

**The save-data-loss P0 (W10.C) — LIVE in source.** The local-first contract is inverted at the await
order:
```
$ sed -n '58,62p' demo/@/lib/palette/composables/usePaletteActions.ts
    async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
        await ensureUser();
        const palette = deps.createPalette(name, colors);
        expandedId.value = palette.id;
    }
```
`onCurrentPaletteSaved` `await`s `ensureUser()` (a network call to the down/I-era backend, polluted by
the `VITE_API_URL` hack + the live CORS errors) BEFORE `createPalette` — a failing/down backend throws,
the `createPalette` line never runs, and the user's colors are silently destroyed (D7 §3.4). This is
W10.C's to FIX; it bounds W16.D's extract-save honesty and the per-pane console-clean gate (the CORS
noise). Born-RED: the await-order is the data-loss path today.

---

## §Goal

**Goal criterion.** Each pane speaks the house gestalt — audacious, fluid, color-forward — with its one
true hero at hero scale and its math motifs singing within proportion.

- **The PICKER** carries the color numbers as the typographic hero on the display-3 φ ramp with
  per-channel `AnimatedDigit` cells damping toward target, a ch-reservation card-lock so values/spaces
  never reflow the card (U31), and prose-flow atomic cells so the orphaned-comma break is impossible by
  construction (U2); the space wordmark on a single fluid `text-display-2` rung (the no-op pair killed,
  U30a) with a specimen-row menu; the blob the MATERIAL hero — big (`w-[11rem]`), absolutely top-right,
  breaking the card corner with a static footprint reservation so it never collides (U30b); the pallor
  cured at the near-white SEED (U3); the dead `EditDrawer` deleted (T21).
- **The GRADIENT pane** has ONE hero surface: the eased gradient WITH its per-interval piecewise curve
  drawn ON it in a TOKENIZED stroke (the `hsl(248…)` literal dead), stop handles riding up, the
  redundant second rectangle gone (U25/the charter motif); the Easing section restyled in place to the
  hero-curve hierarchy (the interim that dies at W18).
- **The MIX pane** renders the result IMMEDIATELY (≤ 150 ms vs the 3.06 s baseline), the animation a
  CELEBRATION not a gate, the PRM gate at the composable boundary (inv-N-9 CLOSES — the one live un-gated
  rAF gated), a re-entry guard, and an honest result-colored preview (the perceptual library no longer
  ships a non-perceptual preview).
- **The EXTRACT pane** surfaces the max-population color as the protagonist (a large WatercolorDot + its
  oklch numerals on the display ramp + "**41%** of the image" as an audacious stat) derived from the
  RETURNED palette (no second worker call), a population-proportional strip (floor 8%), and the dup-shell
  collapsed to `useExtractSession()` + ONE workbench with unified capabilities (D3-5/D3-6).
- **The DOCS panes** drop the structurally-dead scoped stylesheet for an UNSCOPED `docs-prose.css` on the
  glass-ui ladder (h2/p/pre actually styled; the `--md-color-*` orphan reconnected) with a computed-style
  witness in CI (the anti-P9 gate); KaTeX renders `output:"html"` at both sites (matrices un-mangled,
  the 564px formula un-clipped) in display-math glass wells; the φ ladder applied (U5); the blanket
  `font-display` adjudicated (Fraunces reserved for the display rungs, F7).
- **The MODERN-WEB carry** lands: vue-router@5 + typed routes + the `VIEW_MAP` single-source, the
  hash-write debounce + no-op `scrollBehavior` (the 103ms reflow class dies), the `dispatch.ts`
  hue-cluster decomposition into `mix.ts` (a real library decomposition), `Palette` id-honesty, and the
  `/diff` decision (serve + wire, or record cohort-only and stop persisting).

**Completion criterion.** All §Hard-gate clauses verify against artefacts: the per-pane π element-pair
before/after evidence (the W6.A structure) shows each hero applied; result-appears ≤ 150 ms (vs 3061 ms
baseline); ZERO rAF frames under emulated PRM on `/mix` (inv-N-9 closes); the markdown h2 computed
font-size == `--type-heading` (the anti-P9 witness); `population` visibly threaded into the strip + the
dominant hero; the `hsl(248,88%,71%)` literal grep returns ZERO; vue-router@5 in the lockfile; suites
green. The π gate is captured AFTER N.W10.D's cascade kill (the desktop renders).

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly the per-pane display/visual/composable surfaces named below + the new
`docs-prose.css` + the router/url/viewSchema modern-web sites + the library `dispatch.ts`/`mix.ts`
decomposition. It CONSUMES W12's keystone (the font root that makes Fraunces paint, the accent axis, the
φ ladder, the depth laws) and stands ON W10's gate-opener (the cascade kill, the save-P0, the kC thread).
No test/CI edits beyond the new computed-style witness the W2.B emission probe already hosts (lane E).
(DEVELOPMENT doc — SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — Picker (the hero pane)** (U31/U2/U30a/U30b/U3) | D1-1 hero-number system: `text-hero` @ display-3, per-channel `AnimatedDigit` cells, the ch-reservation table from `COLOR_SPACE_RANGES`, 2-line block lock, demoted commas (`opacity-40 font-light`), em-scaled units, atomic `nowrap` cells (U2's orphaned-comma break impossible by construction); D1-2 trigger → single `text-display-2` rung (the no-op pair killed) + em-scaled chevron; D1-3 specimen-row menu (display-face names + live per-space conversion line + WatercolorDot swatch + glass material; needs `COLOR_MODEL_KEY` injection; the bound fix is U-DROPDOWN's); D1-4 blob absolute top-right `w-[11rem]` with negative-inset corner break + static header footprint reservation (out of the grid, onto the relative Card); D1-7 in-card φ rhythm (spectrum the φ anchor `lg:h-[16rem]`, φ-stepped section gaps); the U3 demo halves (seed L-floor/saturate before `deriveBlobPalette`, `brightnessShift` trim, the default-color reseed decision — pairs W11); DELETE the mounted-`display:none` `EditDrawer` (T21) | `display/ColorComponentDisplay.vue` (re-author), `display/ColorSpaceSelector.vue:17,21-37`, `ColorPicker.vue:4,22,33`, `visual/HeroBlob.vue:8`, the reservation table beside `colorSpaceInfo.ts` | the dual-hero diagonal seam — numbers = typographic hero (reading axis), blob = material hero (top-right corner-break); never the same channel at the same position |
| **B — Gradient + easing (U25)** | WO-G1 ONE hero surface (the eased gradient WITH its piecewise curve drawn on it — stop handles ride up, interval select highlights its segment, dual-ring handles + position badge, the redundant second rectangle dies, the curve in a TOKENIZED stroke with a contrast halo); WO-G2 φ rhythm + tinted section heads (the `--section-color-*` ladder); WO-E2 the easing hierarchy INTERIM (hero curve canvas 160–280px with grid/diagonal/axis labels, chip rail, tokenized stroke — the `hsl(248,88%,71%)` literal dies, de-italicized control register, `resolution` expose-or-delete) — RESTYLES `EasingSelector` in place, NO parallel component; it DIES at the W18 configurator consume (WO-E1, the X-GU C-3 ask) | `GradientVisualizer.vue:118-230`, `GradientStopEditor.vue:104-149`, `EasingSelector.vue:56-64` | the hero-motif seam — the mathematics of the gradient drawn ON the gradient; ONE surface, ONE math motif, the interim that dies at the pin |
| **C — Mix (inv-N-9 closes)** | WO-M1 un-withhold the result (computed at t=0, gated 3.06 s behind hardcoded timers — render immediately, the animation becomes celebration); **the PRM gate at the composable boundary** (the ONE live un-gated rAF, gated WITH the 0.12.0 inv-N-9 close — one check, not five); re-entry guard (`startMix` guards `animationPhase !== idle && !== done`); ONE ~900ms beat on the Family-B `--duration-celebration` tokens (their first consumer); WO-M2 preview honesty (pass the REAL result css into `useMixingAnimation` — `resultColor` prop; `cssToRgb255(resultColor)` replaces both sRGB-mean blocks; the perceptual library must not ship a non-perceptual preview); WO-M3 wash discipline (cap suffuse alpha ≤ 0.5 over the header band or inset the canvas below the header — the title never drowns); WO-M4 CTA pop + register unification + result numerals on the display ramp; 1440-clipping re-verify post-W10.D | `useMixingState.ts:64-104`, `useMixingAnimation.ts:77-206,151-181`, `panes/MixPane.vue:63-114`, `MixResultDisplay.vue:31-47` | the celebration seam — a zero-latency computation made a celebration not a gate; the PRM gate at the composable boundary (inv-N-9 closes) |
| **D — Extract** | D3-5 the dominant hero (max-population swatch derived from the RETURNED palette — NO second worker call; the library `dominantColor` re-quantizes and is the wrong tool here — + oklch numerals on the display ramp + "**41%** of the image" as the audacious stat); population-proportional strip (`:weights`, floor 8%) + swatch-popover share (T19); D3-6 the dup-shell collapse (`useExtractSession()` + ONE workbench, capabilities UNIFIED — the pane gains camera, the dialog gains eyedropper — `ExtractPane` → ~40-LoC shell, T20) | `panes/ExtractPane.vue:117-181`, `image-palette-extractor/ImagePaletteExtractor.vue:125-232`, `palette-browser/PaletteColorStrip.vue:20-22` | the dominance seam — the perceptual story the quantizer tells (population/dominance) made visible; consumption ≠ non-duplication (the twins UNIFY) |
| **E — Docs (U4/U5) — THE headline** | D4 WO-1 the structurally-dead stylesheet: DELETE the scoped block (`Markdown.vue:68-316`), author UNSCOPED `markdown/docs-prose.css` on the glass-ui ladder rooted at `.markdown-body`, reconnect the `--md-color-*` orphan, restore `content-visibility:auto`, + the computed-style witness in CI (the anti-P9 gate); WO-2 KaTeX `output:"html"` ×2 + display-math glass wells with the live-accent rule + `overflow-x-auto` restored (kills the MathML matrix mangle + the 564px clip); WO-3 adjudicate the font flip (strip the blanket `font-display`; Fraunces reserved for the display rungs — lands BEFORE/WITH W2.B which DETONATES it); WO-5 the Definition lede (frost card, mono eyebrow, Fraunces-italic pull-quote, φ³ seam); WO-6 pane-h1 ramp + sticky glass tier (the bleed-through F8) + the "Detailed Guide" divider demotion; WO-7 68ch element cap + tabular nutrition values; the φ ladder APPLIED (U5 — dividers breathe φ² both sides) | `markdown/Markdown.vue:10,68-316`, new `markdown/docs-prose.css`, `katex/Katex.vue:21`, `markdown/composables/useMarkdownHighlighting.ts:89`, `markdown/composables/useMarkdownColors.ts:43-45`, `display/ColorNutritionLabel.vue`, `panes/AboutPane.vue:16-27` | the phantom-SELECTOR seam — a scoped sheet that can NEVER match its foreign-rendered target replaced by a public unscoped contract; the anti-P9 witness makes a regression fail loud |
| **F — Modern-web carry** (the twice-deferred M.W6→N.W6.D set) | Router 4→5 + typed routes + `VIEW_MAP` single-source (K-W5RT) + the hash-write debounce + no-op `scrollBehavior` (LP3-4 — the 103ms `computeScrollPosition` reflow class dies); the `dispatch.ts` hue-cluster decomposition into `mix.ts` (K-DISP/X12 — a LIBRARY decomposition); demo `Palette` id-honesty (K-PALID); the `/diff` decision (serve `/diff` + wire the demo diff render, OR record cohort-only and stop persisting — the W3.F decision falls due, K-W3DIFF) | `package.json:121`, `composables/usePaneRouter.ts`, `composables/viewSchema.ts`, `color-picker/composables/useColorUrl.ts:52,73`, `src/units/color/dispatch.ts`, `src/units/color/mix.ts` | the modern-web seam — the router on a current major, the URL writes debounced, the library decomposition honest, the persisted-but-unconsumed surface decided |

**Note on lane B vs W18.** WO-E2 (the in-repo easing-section hierarchy) is the INTERIM — it restyles
`EasingSelector` in place and MUST NOT grow a parallel component (the §No-workaround binding). WO-E1 (the
`EasingConfigurator` consume) is the BA-gated half: glass-ui ports the keyframes.js donor into
`@mkbabb/glass-ui/easing-configurator` (the filed X-GU C-3 ask, `WAVES-2.md:210`), value.js DELETES
`EasingSelector.vue` and consumes the configurator at W18.B (`WAVES-2.md:224`). The interim dies there.

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today (per
the SV-N probes). For the WO-E1 configurator half the born-RED is the **capability-ABSENT** sense — the
glass-ui `easing-configurator` subpath does not yet exist (the X-GU C-3 ask); cite the absence probe.
P6 posture (the π / measured-evidence discipline) is named per clause. **This rides N.W16's WAVES-2 gate
verbatim** ("per-pane π DELTA evidence; result-appears ≤ 150ms vs 3061ms; zero rAF frames under PRM on
`/mix` — inv-N-9 closes; markdown h2 computed == `--type-heading`; population visibly threaded; vue-router@5
in lockfile; suites green", `WAVES-2.md:180-182`) — the clauses below decompose it.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A1** | The hero numbers ride the display-3 φ ramp via `text-hero` (NOT `text-4xl`) with per-channel `AnimatedDigit` cells; the card-lock holds (the card does NOT resize as the value or space changes) | the π picker element pair showing display-3 numbers; a value-sweep + space-switch DOM assert that `ColorPicker` card `getBoundingClientRect().width` is invariant; `grep "text-4xl" ColorComponentDisplay.vue` = 0 | YES — SV-A: `text-4xl` raw size, no AnimatedDigit, no reservation | **π before/after element pair** (vs u27/u28 the intent mock) + **DOM invariance assert** |
| **HG-A2** | The space trigger is ONE fluid `text-display-2` rung (the no-op `sm:` pair killed); the blob is absolutely top-right (NOT a grid child), `w-[11rem]`, and does NOT collide with the numbers | `grep "text-title sm:text-display" ColorSpaceSelector.vue` = 0; a DOM assert that the blob canvas bounding box does NOT intersect the numbers block; `grep "col-start-2 col-span-2 row-span-2" ColorPicker.vue` = 0 | YES — SV-A: the no-op pair + the colliding grid blob + `w-[7rem]` | **grep-absence** + **π non-collision DOM assert** |
| **HG-A3** | The mounted-`display:none` `EditDrawer` is ABSENT from `ColorPicker.vue` (T21) | `grep "EditDrawer" ColorPicker.vue` = 0 (the editing UX re-homed or the dead mount removed) | YES — SV-A: `ColorPicker.vue:33` mounts it unconditionally | **deletion/presence proof** |
| **HG-B1** | The gradient pane has ONE hero surface painting `coalescedCSS` with the per-interval easing curve drawn over it; the redundant second rectangle is gone | a DOM assert of exactly ONE `coalescedCSS`-painted box on `/gradient`; the π gradient pair showing the curve-over-gradient | YES — SV-B + D2 §2.1: two stacked near-identical rectangles live | **π before/after element pair** + **DOM count assert** |
| **HG-B2** | NO `hsl(248, 88%, 71%)` literal anywhere under `demo/` — the curve stroke is tokenized (`var(--primary)`/the section accent); the curve renders at hero scale (160–280px), NOT 48×32 | `grep -rn "hsl(248, 88%, 71%)" demo/` = 0; the π easing pair showing the hero curve canvas | YES — SV-B: `EasingSelector.vue:63` the hardcoded literal at `:56` postage-stamp scale | **grep-absence proof** + **π element pair** |
| **HG-C1** | The mix result appears ≤ 150 ms post-click (vs the 3061 ms baseline); the `=== 'done'` withholding gate is gone | a Playwright timeline on `/mix`: the result card present ≤ 150 ms after the Mix click; `grep "animationPhase === 'done'" MixPane.vue` over the result `v-if` = 0 | YES — SV-C + D2 §3.1: result APPEARS at t≈3061ms, gated behind `=== 'done'` | **π measured timeline** (result-appears latency) |
| **HG-C2** | ZERO rAF frames under emulated `prefers-reduced-motion` on `/mix` — inv-N-9 CLOSES (the one live un-gated rAF gated at the composable boundary) | a Playwright run under emulated PRM counting `requestAnimationFrame` callbacks on `/mix` = 0; `grep -c "matchMedia\|prefers-reduced" useMixingAnimation.ts` ≥ 1 | YES — SV-C: 5 rAF sites, 0 `matchMedia` — the inv-N-9 hole | **π under emulated PRM** (the inv-N-9 closing witness) |
| **HG-C3** | The suffuse preview pixel == the result-css RGB ±2/channel (the perceptual preview no longer averages sRGB means) | a probe sampling the canvas suffuse pixel vs `cssToRgb255(resultColor)` — ≤ 2/channel divergence (vs the measured Δ up to 40/channel) | YES — SV-C + D2 §3.3: paints `rgb(145,51,162)` vs the true `rgb(156,91,173)` | **π pixel-vs-truth assert** |
| **HG-D1** | The extract pane shows a max-population dominant hero (a WatercolorDot + oklch numerals + the "N% of the image" stat) derived from the RETURNED palette (no second worker call); `population` is threaded into a proportional strip (floor 8%) | the π extract pair showing the dominant hero + the proportional strip; `grep "population" ExtractPane.vue` present; a DOM assert the strip segments have non-equal widths when populations differ | YES — SV-D: the map carries `{css,position}` only; the strip is equal-width | **π before/after element pair** + **DOM width assert** |
| **HG-D2** | The dup-shell is collapsed: `useExtractSession()` exists, `ExtractPane.vue` is a ~40-LoC shell, capabilities are unified (the pane has camera, the dialog has eyedropper) | `wc -l ExtractPane.vue` ≈ 40; `test -f …/composables/useExtractSession.ts`; the duplicate-line count vs `ImagePaletteExtractor.vue` → ~0 | YES — SV-D: 247-LoC twin, 95 identical normalized lines | **LoC + duplicate-line census** |
| **HG-E1** | THE HEADLINE: the markdown `<style scoped>` block is GONE; an unscoped `docs-prose.css` styles the foreign-rendered children — the live computed `getComputedStyle(markdown h2).fontSize === --type-heading` (the anti-P9 witness, wired into the W2.B emission probe) | the computed-style assert green on a mounted docs route (h2 == `--type-heading`, p margin ≠ 0, pre padding ≠ 0); `grep "style scoped" Markdown.vue` = 0; `test -f …/markdown/docs-prose.css` | YES — SV-E: the scoped block at `:68-316`, every nested rule unmatchable (h2 → 16px/400 live) | **computed-style witness** (the anti-P9 gate — a phantom-selector regression fails LOUD) |
| **HG-E2** | KaTeX renders `output:"html"` at BOTH sites; matrices un-mangle and the 564px formula does not clip (display-math wells with `overflow-x-auto`) | `grep -c "output: \"mathml\"" Katex.vue useMarkdownHighlighting.ts` = 0; the π docs pair showing un-mangled matrices + a non-clipping wide formula; a DOM `.katex-html` count > 0 | YES — SV-E: `output:"mathml"` at both sites; D4-05/06 the mangle + clip | **grep-absence** + **π docs element pair** |
| **HG-E3** | The blanket `font-display` is adjudicated (stripped from the docs body; Fraunces reserved for the display rungs) — the W2.B emission no longer detonates a whole-register serif flip | `grep "markdown-wrapper font-display" Markdown.vue` = 0 (or the deliberate display-rung-only application); the decision recorded | YES — SV-E + F7: `Markdown.vue:10` blanket `font-display` (latent flip) | **grep-absence** + **doc reconciliation** |
| **HG-F1** | `vue-router@5` is the demo's direct dep AND in the lockfile; typed routes + the `VIEW_MAP` single-source land | `grep "\"vue-router\": \"\\^5" package.json` present; the lockfile root entry = `^5.x`; `npm run check` green | YES — SV-F: `package.json:121` `^4.6.4`; lockfile `:60` `^4.6.4` | **lockfile/manifest assert** + **typecheck** |
| **HG-F2** | The hash-write debounce + a no-op `scrollBehavior` land (the 103ms `computeScrollPosition` reflow class dies); the `dispatch.ts` hue-cluster decomposes into `mix.ts`; the `/diff` decision is recorded | the `scrollBehavior` returns `false`/no-op in the router config; a profiler trace showing no `computeScrollPosition` reflow on hash navigation; the hue-cluster moved to `mix.ts` (grep); the `/diff` decision in the doc | YES — SV-F: `useColorUrl.ts:73` the live hash write; the hue-cluster in `dispatch.ts` | **profiler trace** (reflow class gone) + **doc reconciliation** |
| **HG-gate-opener** | The per-pane π evidence (HG-A1, B1, C1, D1, E2) is captured AFTER N.W10.D's cascade kill lands — until the desktop renders, in-viewport element shots are structurally blind | the π captured against a rendering desktop (W10.D `display ≠ none @1440` assert green); the console clean on all 14 routes (no CORS noise — W10.C) | YES — SV-gate-opener: the built demo emits unlayered `.hidden{display:none}` → desktop dead; the save-P0 await-order pollutes the console | **cross-wave precondition** — W10 is the substrate gate |

**The gate-opener precondition (cross-wave, BINDING).** Per `EXECUTION-ORCHESTRATION.md:56-62`, W10 is the
gate-opener: until the cascade kill (SV-gate-opener) closes, the desktop dual-pane never renders, so EVERY
W16 π element-shot (the picker/gradient/mix/extract/docs pairs) and the "console-clean on 14 routes" gate
is structurally blind. W16's SOURCE-SHAPE gates (HG-A2/A3 grep-absences, HG-B2 the literal grep, HG-D2 the
LoC census, HG-E1's `style scoped` absence, HG-F1 the lockfile) are demo-INDEPENDENT and provable WITHOUT
the demo rendering. Only the VISUAL π pairs + the latency/PRM measured gates sit behind W10. The source
gates do not wait; the π does. W16 also stands on W12's keystone — the audacious type (HG-A1, HG-E3)
paints in the fallback face until W12's font root makes Fraunces actually load (D1 §279-281, D2 §S4).

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO parallel easing component (lane B).** The WO-E2 interim RESTYLES `EasingSelector.vue` IN PLACE
  (tokenized stroke, hero curve, chip rail) — it MUST NOT spin up a second easing component beside it
  (`WAVES-2.md:174` "restyles `EasingSelector` in place, NO parallel component; it dies at the W18
  configurator consume"; D2 §1.3 "the interim in-repo lift must NOT grow a parallel component"). The ONE
  configurator is the glass-ui port (WO-E1), consumed at W18 — never a demo-authored twin that would
  become legacy the moment the port lands.
- **NO demo-authored `EasingConfigurator`.** The configurator is glass-ui-owned (the three-way boundary
  law: math = value.js · time/spring = keyframes · component = glass-ui; D2 §1.3, X-GU C-3). value.js
  CONSUMES it at W18; authoring it demo-side is forbidden (it would vendor a component the constellation
  has a producer for — the acyclic-spine violation).
- **NO `:deep()` contortion to revive the scoped markdown sheet (lane E).** The scoped block is the WRONG
  TOOL for foreign-rendered content (D4 §D2) — the fix is to DELETE it for an unscoped public-contract
  stylesheet, NOT to `:deep()`-pierce the scope or hand-stamp the scope attribute onto the markdown
  children. Scoping was the category error; revive nothing.
- **NO raising the mix timer or "skip" affordance instead of un-withholding (lane C).** The result is
  computed at t=0 (`useMixingState.ts:80-82`); the fix is to RENDER it immediately and make the animation
  a celebration (D2 §3.2) — NOT to shorten the `setTimeout` chain, NOT to add a "skip" button that papers
  over a zero-latency computation being withheld.
- **NO second worker call for the dominant color (lane D).** Derive the dominant from the ALREADY-RETURNED
  `palette.value` (max population, chroma-tiebreak); the library's `dominantColor()` re-quantizes and is
  the wrong tool here (D1 §4b, D3 §4b §2). A second quantize is a contrivance the data already answers.
- **NO non-perceptual preview from the perceptual library (lane C).** The mix preview MUST paint the real
  OKLab result css (`cssToRgb255(resultColor)`), not the sRGB-channel mean (D2 §3.3). The whole thesis of
  this app is perceptual mixing; a non-perceptual preview is a self-contradiction, not a shortcut.
- **NO hand-tuned magic offset for the picker centering or the blob footprint (lane A).** The number
  card-lock is a STATIC ch-reservation table derived at module scope from `COLOR_SPACE_RANGES` + a 2-line
  block lock (D1 §2) — no `ResizeObserver`, no runtime measurement; the blob footprint is a static
  `padding-right` reservation (D1 §4). Centering and locking are BY CONSTRUCTION, never a nudged constant.
- **NO `dispatch.ts` decomposition that re-introduces a hot-path indirection (lane F).** The K-DISP
  hue-cluster move into `mix.ts` is a cohesion decomposition, not a layer — it must not add a call-frame
  to the hot `mixColors` path (the perf lane's measured idiom). It is a SOURCE re-org, measure-neutral.
- **NO fixing W10.C/W10.D inside W16.** The save-P0 (the await-order at `usePaleteActions.ts:60`) and the
  cascade kill (the unlayered `@import` at `style.css:52`) are W10's. W16 STANDS on them (its π gate is
  blind until they close) but does not patch them — that would duplicate the gate-opener and split the fix.

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Fold | Row | Audit lane + finding | Discharge |
|---|---|---|---|
| **U31** | the picker hero numbers must not resize the card | `LEDGER.md` U31; D1 §2 (the ch-reservation card-lock + 2-line block lock) | HG-A1 (the card-invariance assert) |
| **U2** | prose-flow numbers, no orphaned comma mid-list | `LEDGER.md` U2; D1 §2 (atomic `nowrap` cells) | HG-A1 (the flow is the number system) |
| **U30a** | the audacious space dropdown | `LEDGER.md` U30a; D1 §3 (single `text-display-2` rung + specimen-row menu) | HG-A2 (the no-op pair killed) |
| **U30b** | the blob big, absolutely top-right | `LEDGER.md` U30b; D1 §4 (absolute, `w-[11rem]`, corner-break, footprint reservation) | HG-A2 (the non-collision assert) |
| **U3** | the blob pallor | `LEDGER.md` U3; U-BLOB §1 (the near-white SEED, not the deriver — `chromaCeiling` disproved) | lane A (the seed half; the `uSatColor[]` satellite half is W18) |
| **T21** | the mounted-`display:none` `EditDrawer` | D1 §0/§8 (the dual-mount aside); `ColorPicker.vue:33` | HG-A3 (the deletion proof) |
| **U25** | the easing-section hierarchy (the postage-stamp curve) | `LEDGER.md` U25; D2 §1.4 (WO-E2 the hero curve) | HG-B2 (the literal dies, the hero curve lands) |
| **U27** | the first-class easing-configurator | `LEDGER.md` U27; D2 §1.3 (WO-E1 the glass-ui port) | the BA-gated half → W18.B (the interim dies; capability-absent born-RED today) |
| the gradient hero motif | the chartered "easing-curve as the gradient pane's hero motif + tokenized stroke" | `N.md:152`/`:178`; D2 §2 (WO-G1) | HG-B1/HG-B2 (one surface, tokenized stroke) |
| **inv-N-9** | the one LIVE un-gated rAF (the mix-canvas loop) | `WAVES-2.md:313-335`/`N.md:204`; D2 §3.2 (the composable-boundary PRM gate) | HG-C2 (zero rAF frames under PRM — inv-N-9 CLOSES) |
| the mix gate | the withheld result (3.06s) | the W6-dead charter item; D2 §3.1/§3.2 (WO-M1) | HG-C1 (result ≤ 150ms) |
| mix preview honesty | the sRGB-mean preview | D2 §3.3 (WO-M2); `useMixingAnimation.ts:151-181` | HG-C3 (pixel == result ±2/channel) |
| extract dominant hero | the chartered "dominant-color hero + population threading end-to-end" | `N.md:152`; D3 §4b (D3-5) | HG-D1 (the dominant hero + proportional strip) |
| the extract dup-shell | the chartered `ExtractPane`↔`ImagePaletteExtractor` collapse | `N.md:152`; D3 §5 (D3-6) | HG-D2 (the ~40-LoC shell + `useExtractSession`) |
| **U5** | the docs structurally-dead stylesheet root + the φ rhythm "padding around dividing lines" | `LEDGER.md §G` U5; D4 §F2/§D1/§D2 (WO-1) | HG-E1 (the unscoped sheet + the anti-P9 witness) |
| **U4** | the docs definition gap | `LEDGER.md §G` U4; D4 §F3/§D3 (WO-5 the lede) | HG-E1 (the φ³ seam + the lede card) |
| KaTeX matrix mangle | the chartered KaTeX `output:"html"` | `N.md:152`; D4 §F6/§D4 (WO-2) | HG-E2 (both sites `html`, the clip un-clipped) |
| the font flip (F7) | the latent blanket `font-display` Fraunces flip | D4 §F7/§WO-3 | HG-E3 (the blanket stripped; Fraunces reserved) |
| **K-W5RT** | router 4→5 + typed routes + `VIEW_MAP` single-source | `R3-fold-ledger-v2.md:76`; the M.W6→N.W6.D carry | HG-F1 (vue-router@5 in lockfile) |
| **LP3-4** | the hash-write debounce + no-op `scrollBehavior` (the 103ms reflow class) | `R3-fold-ledger-v2.md`; D2/LP perf; `useColorUrl.ts:73` | HG-F2 (the reflow class gone) |
| **K-DISP / X12** | `dispatch.ts` hue-cluster → `mix.ts` (a library decomposition) | `R3-fold-ledger-v2.md:151`; `src/units/color/dispatch.ts` | HG-F2 (the hue-cluster in `mix.ts`) |
| **K-PALID** | demo `Palette` id-honesty | `R3-fold-ledger-v2.md:76`; the M.W6.D carry | HG-F2 (recorded with the modern-web set) |
| **K-W3DIFF** | the `/diff` `forkedFromHash` arm decision | `R3-fold-ledger-v2.md:76`; the W3.F decision (zero in-repo consumers) | HG-F2 (serve+wire OR record cohort-only + stop persisting) |

**Note on the W14↔W16 split of lane D3.** D3's work-orders split by wave: D3-1/2/3/7/8/9 (PaletteCard
first-class, the depth grammar, glassy skeletons, empty-state CTAs, the pill, the sticky bar) land at
**N.W14** (cards); only D3-5 (the extract dominant hero) and D3-6 (the dup-shell collapse) are W16.D. The
kC-placebo worker thread (D3-4) is W10.C's (lane D wires the hero off the corrected worker output). The
split is disjoint: W16.D touches `ExtractPane.vue`/`ImagePaletteExtractor.vue`/`PaletteColorStrip.vue`;
W14 touches `PaletteCard.vue`/`PaletteCardSkeleton.vue`/the empty-state components.

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

**Cross-wave (within N, BINDING):**

- **W16 ⟵ W10 (the gate-opener, MUST PRECEDE the π).** W16's per-pane π evidence + the "console-clean on
  14 routes" gate are structurally blind until W10.D's cascade kill lands (the desktop renders) and
  W10.C's save-P0 + `VITE_API_URL` degraded-backend land (the console stops emitting CORS noise). W16's
  SOURCE gates (the grep-absences, the deletions, the LoC census, the lockfile) do NOT wait. The W10.C kC
  worker thread (`useImageQuantize.ts:91-99`) precedes W16.D's dominant hero (the hero reads the corrected
  worker output). (`EXECUTION-ORCHESTRATION.md:56-83`.)
- **W16 ⟵ W12 (the keystone, MUST PRECEDE the type).** The audacious type (the picker hero numbers HG-A1,
  the docs ramp HG-E3, the space wordmark HG-A2) paints in the system fallback face until W12's font root
  makes Fraunces actually load (D1 §279-281, D2 §S4 — glass-ui's one-register typography wins the cascade
  today). W16 CONSUMES W12's accent axis + φ ladder + display rungs; it does not mint them.
- **W16 ⟶ W18 (the interim that dies at the pin).** WO-E2 (the in-repo easing-section restyle) is the
  INTERIM; W18.B consumes the glass-ui `EasingConfigurator` and DELETES `EasingSelector.vue`
  (`WAVES-2.md:224`). The grep `EasingSelector.vue absent` is a W18 gate, not a W16 one.
- **W16 ∥ W14 (file-disjoint, parallel in R3).** D3 splits cleanly (see §Folds note); no shared
  `modify`/`modify-carve` path. The extract surfaces are W16.D's; the card surfaces are W14's.

**Cross-repo (the constellation spine — PUBLISHED-consume, born-RED-gated, acyclic; NEVER a `file:` link
or vendored copy):**

- **glass-ui (BA, the producer) ⟶ value.js W18.** The `EasingConfigurator` is the FILED X-GU C-3 ask
  (`../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md`, Register C-3;
  `WAVES-2.md:210`): glass-ui ports the keyframes.js donor (`EasingEditor`/`EasingCurveCanvas`/`EasingSelect`,
  D2 §1.2) into `@mkbabb/glass-ui/easing-configurator`, with value.js's `timingFunctions`/`CSSCubicBezier`
  as the math substrate (the existing peer edge — value.js remains the pure sink, the spine stays acyclic).
  The capability is ABSENT today (the absence probe: `ls node_modules/@mkbabb/glass-ui/dist/easing-configurator*`
  → no match on 3.13.0). value.js consumes it at W18.B, born-RED against the consume edge; until then WO-E2
  is the interim.
- **glass-ui (BA) ⟶ value.js W18 (the `uSatColor[]` satellite half of U3).** The blob satellite-color
  expressivity (the second half of U3, beyond lane A's seed fix) is the FILED X-GU C-1 ask
  (`WAVES-2.md:209`); lane A ships only the SEED fix (L-floor/saturate before `deriveBlobPalette`); the
  satellite shading consumes at W18.A. A consume-only delta — no value.js authoring.
- **keyframes.js — NO blocking ask from this wave.** keyframes.js is the easing DONOR (the configurator
  port source); the donor lives in its tree (`demo/@/components/custom/EasingEditor.vue` &c., D2 §1.2). It
  is verified clean at the X-KF fold (`WAVES-2.md:216-217`, no addendum owed). Post-port, its two hosts
  may consume the glass-ui primitive back — a K-tranche item, not value.js's.
- **glass-ui (BA) ⟶ value.js W12 (the font root + the φ ladder tokens).** The Fraunces display face + the
  φ spacing rungs as first-class tokens (D4 §D6, the D1 ladder) are W12's keystone consume; W16 stands on
  them. The φ ladder interim is demo-local in `style.css` `@theme` until the BA pin migrates it
  (D4 §D1 "migrated at the 3.13.0 pin"; the target is the BA cut per `inv-N-6` amendment).

---

## §Design-decisions — trade-offs RESOLVED

- **The picker's dual hero: BOTH, on different channels (not pick-one).** The picker has two candidate
  heroes — the numbers (U31) and the blob (U30b) — and today they literally overlap. RESOLVED (D1 §1):
  the number IS the TYPOGRAPHIC hero (foreground voice, reading axis, bottom-left gravity); the blob IS
  the MATERIAL hero (atmosphere, top-right, corner-breaking, half-outside the card). A diagonal
  composition puts no two elements on the same channel at the same position. The φ ladder sets the size
  relation (blob body ≈ card-width/φ² ≈ 183px; numbers one √φ rung above the space name). The blob never
  carries information the numbers carry — it IS the color the numbers describe.
- **The easing interim restyles in place; the configurator is glass-ui's (the three-way boundary law).**
  RESOLVED (D2 §1.3): WO-E2 restyles `EasingSelector.vue` IN PLACE (no parallel component) and dies at
  W18; the ONE configurator is the glass-ui port (math = value.js, time/spring = keyframes, component =
  glass-ui). The trade-off named: the interim is throwaway work, but it is a small restyle (66 LoC) that
  delivers the U25 hierarchy NOW without blocking on the BA cut, and a demo-authored configurator would
  become legacy the instant the port lands (a no-legacy violation). The interim is the correct
  measure-first bridge.
- **Mix: un-withhold, don't shorten.** RESOLVED (D2 §3.2): the result is computed synchronously at t=0,
  so the fix is to RENDER it immediately and re-cast the animation as celebration — not to shorten the
  3-stage `setTimeout` chain or add a "skip" button. The PRM gate lives at the composable boundary (one
  check, not five — the five rAF sites all guard off one `matchMedia`). This discharges inv-N-9's last
  live hole with the 0.12.0 PRM idiom, not a per-call-site sprinkle.
- **Extract dominant: derive from the returned palette, never re-quantize.** RESOLVED (D3 §4b §2): the
  dominant color comes from `palette.value` (max population, chroma-tiebreak), NOT the library's
  `dominantColor()` (which re-quantizes — the wrong tool, a second worker call for data the result
  already carries). `population` becomes an optional additive field on the demo's `PaletteColor` type —
  additive, demo-owned, no library change.
- **Docs: delete the scoped sheet, don't `:deep()` it.** RESOLVED (D4 §D2): the `<style scoped>` block is
  a CATEGORY ERROR — scoping a stylesheet whose target is foreign-rendered (a separate markdown component
  with no scope attribute) makes every nested selector unmatchable. The fix is an UNSCOPED public-contract
  `docs-prose.css` rooted at `.markdown-body`, not `:deep()` piercing or hand-stamping the scope. The
  anti-P9 witness (the live computed-style assert) makes a future phantom-selector regression fail loud —
  the gate that catches the failure mode that hid this defect for tranches.
- **The K-DISP decomposition is a LIBRARY re-org, not a demo move.** RESOLVED (this spec, correcting the
  WAVES-2 lane-F shorthand): `dispatch.ts` is `src/units/color/dispatch.ts` (the library — it hosts
  `mixColors`/`interpolateHue`/`gamutMap`), NOT a demo file. The hue-cluster decomposes into the existing
  `src/units/color/mix.ts`. It is a cohesion fold (measure-neutral, no hot-path indirection added), filed
  under lane F because it is part of the same modern-web/decomposition carry the K ledger routed here.
  The router/url/viewSchema half is demo; the dispatch half is library — both ship in this wave because
  they are the same twice-deferred carry (`R3-fold-ledger-v2.md:76,151`).
- **The `/diff` decision falls due here (K-W3DIFF).** RESOLVED-AS-A-FORK: the stored `atomDiff`/`/diff`
  surface has ZERO in-repo consumers (D4-era finding); W16.F decides — either serve `/diff` and wire the
  demo diff render (the PaletteDiff view), OR record cohort-only status and STOP persisting the write-only
  `atomDiff`. The decision is the deliverable (HG-F2 reconciliation); the wave does not carry a
  write-only-forever surface (the no-legacy edict).
- **W12/W10 precede; W16 does not duplicate the substrate.** RESOLVED (the gate-opener ordering): W16 is
  pure per-pane design work that STANDS on W10's render-substrate + W12's type-keystone. It does not patch
  the cascade kill, the save-P0, or the font root — those are owned upstream, and duplicating them would
  split the fix and re-introduce the legacy-beside-replacement anti-pattern. W16's source gates run
  unilaterally now; its π gates wait for W10 + W12 (the honest dependency, not a contrivance).
