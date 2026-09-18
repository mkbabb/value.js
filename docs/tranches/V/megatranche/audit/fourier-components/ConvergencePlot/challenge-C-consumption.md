claude-opus-5[1m] (served model id)

# CHALLENGE C — CONSUMPTION · `ConvergencePlot.vue` (fourier-analysis)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/ConvergencePlot.vue` (410 lines).

**Axis.** How this component consumes `@mkbabb/value.js` (`^0.13.0` pinned, 4.0.0 upstream — the F.W2 migration
surface), `@mkbabb/keyframes.js` (`^4.3.0`), `@mkbabb/glass-ui` (`^4.0.0` pinned, 7.0.0 upstream), and the
fourier API's 45-operation surface; plus props/emits contract quality and integration seams.

**Closure read whole (read-only).** `ConvergencePlot.vue` · `lib/harmonics.ts` (88) · `lib/grid.ts` (75) ·
`lib/hit-test.ts` (36) · `composables/useCurveTransition.ts` (87) · `convergence/ConvergenceLegend.vue` (97) ·
`convergence/ConvergenceTimeline.vue` (146) · `@/lib/golden-shimmer.ts` (68) · `@/lib/colors.ts` (117) ·
`@/lib/equation/types.ts` (53). Plus, for seam evidence: `EquationView.vue` (mount site),
`composables/useCoeffHover.ts`, `api/routers/equations.py`, `api/models/equations.py`, and the installed
`node_modules/@mkbabb/{value.js,glass-ui,keyframes.js}` dists + the live `glass-ui@7.0.0` source tree.

**Method.** Static + source-derived only; no browser tooling. Every figure below was re-derived by
`grep`/`node -e`/file read against the live trees named. Claims that need a running page are marked
**UNPROVEN-NEEDS-LIVE (SS-13)**.

**Hitherto folded (not re-invented).** `formation/fourier/lane-frontend.md` §2 (version ladder, L57-59),
§3 (glass-ui census, L198-224), §5 table (L131/142/144-146); `formation/fourier/CENSUS-2026-08-03.md` L38
(bare-root value.js specifiers, "latent, not live") and L87 (ConvergencePlot's ungated rAF);
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**, **R5-7**, **R6-5**, **R6-8**, **X-3**.
Where this challenge *contradicts* the corpus it says so explicitly (see §0.2).

---

## §0 — Verdict

**24 defects · 2 BLOCKER · 13 MAJOR · 6 MINOR · 3 INFO · 4 superlatives.**

### §0.1 The one-paragraph finding

ConvergencePlot is the fourier repo's **weakest consumption surface in a repo the corpus calls its strongest
consumer**. Its own module imports **zero glass-ui**, and every capability it hand-rolls — a DPR-sized
Canvas2D lifecycle, a reduced-motion-gated rAF loop, an offscreen park, a 0..1 scrubber with keyboard a11y, a
color ramp, a `lerp` — is **shipped, by name, in a dependency this package.json already declares**
(`glass-ui/canvas` `useCanvas2D`, `glass-ui/motion` `useRAFLoop` + `useIntersectionPause`,
`glass-ui/timeline` `GlassTimeline variant="scrubber"`, `value.js` `lerp`/`oklch`/`sampleColorRamp`,
`keyframes.js` `respectReducedMotion`). The three value.js imports it *does* make are the pinned-root
specifier that 4.0.0 deletes. And on the API seam it discards two of five `FourierTermDTO` fields, recomputes
one of them under a *different convention* that disagrees with a sibling panel in the same view by exactly
2×, and renders SymPy source through KaTeX while `ComputeEquationResponse.latex` — computed by the backend
for precisely that purpose — goes unread.

### §0.2 Explicit contradiction of the corpus

`lane-frontend.md:198` — "**Adoption is deep and idiomatic, not superficial** … This is the cleanest glass-ui
consumer posture in the constellation." **Repo-level: confirmed** (I re-derived 51 files / 21 subpaths / 0
direct `reka-ui` imports). **Component-level: contradicted.** `ConvergencePlot.vue` imports zero glass-ui
symbols; the two subpaths its children reach (`./button`, `./slider`) are each *partially defeated* — the
Button's `variant="glass"` paint is overridden wholesale (C-13), the Slider is fed a token that does not
exist at 4.0.0 **or** 7.0.0 (C-3), and it was the wrong primitive to reach for at all when `./timeline`
ships the exact contract (C-4). The census's repo aggregate is true; it hides that this 410-line surface is
the outlier inside it. **Falsifier:** exhibit one `@mkbabb/glass-ui` import statement anywhere in
`ConvergencePlot.vue`, `lib/harmonics.ts`, `lib/grid.ts`, `lib/hit-test.ts`, or
`composables/useCurveTransition.ts` — `grep -rn "@mkbabb/glass-ui"` over those five files returns nothing.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · value.js root specifier is deleted at 4.0.0 — three sites in this closure

**Provenance.**
`web/src/components/equation/ConvergencePlot.vue:5` — `import { easeInOutSine } from "@mkbabb/value.js";`
`web/src/components/equation/composables/useCurveTransition.ts:8` — same statement.
`web/src/components/equation/lib/harmonics.ts:5` — same statement.

**Claim.** All three are **bare-root** specifiers. `value.js@0.13.0` (installed:
`web/node_modules/@mkbabb/value.js/package.json`) declares `"exports": { "." : {…} }` and re-exports
`easeInOutSine` from `./easing` at `dist/index.d.ts:27`. **`value.js@4.0.0`
(`/Users/mkbabb/Programming/value.js/package.json`) declares exactly seven export keys — `./color`,
`./value`, `./css`, `./easing`, `./math`, `./transform`, `./quantize` — and NO `"."` key.** The moment the
`^0.13.0` pin moves, all three resolve to `ERR_PACKAGE_PATH_NOT_EXPORTED` and the module graph fails to
build. This is three of the repo's five value.js import statements
(`lane-frontend.md` §5 "5 sites"); the other two are `src/lib/easings.ts:9,16`, outside this closure.

**Cure (exact).** `import { easeInOutSine } from "@mkbabb/value.js/easing";` — verified present in
`value.js/src/subpaths/easing.ts:16`, and the implementation is byte-identical
(`value.js/src/easing.ts:22` — `-(Math.cos(Math.PI * p) - 1) / 2`), so this is a specifier rewrite with zero
behavioral delta.

**Falsifier.** Show a `"."` key in `value.js@4.0.0`'s exports map, or show that Vite's resolver falls back to
`main`/`module` when an `exports` map exists. Neither holds: the exports map is authoritative and
`4.0.0`'s has no root, and `"type": "module"` + an `exports` field disables legacy fallback.

**Corpus fold.** `CENSUS-2026-08-03.md:38` books this as "**latent, not live**, while 0.13.0 remains
installed" — correct, and this challenge supplies the three exact `file:line` sites in this closure plus the
verified subpath cure, so F.W2 need not rediscover them.

---

### C-2 · BLOCKER · Perpetual auto-play rAF with no `prefers-reduced-motion` gate — while two declared deps ship the cure default-ON, and the component's own CSS honors PRM 80 lines away

**Provenance.**
`ConvergencePlot.vue:323-327` — `onMounted(() => { nextTick(() => { draw(); t.value = 0; playing.value = true; startLoop(); }); … })`.
`ConvergencePlot.vue:57-70` — `startLoop()`'s `tick` gates on **`playing.value` only**; no `matchMedia`, no
`document.visibilityState`, no IntersectionObserver.
`ConvergencePlot.vue:63-65` — `t.value = cycle % 2 === 0 ? frac : 1 - frac;` — an **unbounded ping-pong**;
nothing ever sets `playing` false but a user click.
`ConvergencePlot.vue:405-409` — the component's own scoped CSS **does** gate on
`@media (prefers-reduced-motion: reduce)` — for a *0.1 second tooltip fade*.

**Claim.** The component honors reduced-motion for a 100 ms opacity transition and ignores it for an
infinite, auto-started, full-canvas animation. Both declared dependencies ship the exact gate, **on by
default**:

| dep (declared in `web/package.json`) | API | PRM default |
|---|---|---|
| `@mkbabb/glass-ui@^4.0.0` | `useRAFLoop(cb, opts)` — `dist/composables/motion/useRAFLoop.d.ts:20` | `respectReducedMotion?: boolean` — **"Honor prefers-reduced-motion by pausing the loop. Default true."** Also `pauseWhenHidden` default true. |
| `@mkbabb/glass-ui@^4.0.0` | `useCanvas2D({canvas, setup, …})` — `dist/composables/glass/canvas2d/useCanvas2D.d.ts` | `respectReducedMotion` — **"paint ONE static frame then park the loop … Live-monitored via a `matchMedia` `change` listener. Default `true`."** |
| `@mkbabb/keyframes.js@^4.3.0` | `Animation.play()` — `dist/keyframes.d.ts:690,1986,2461` | `respectReducedMotion` — snap to final frame. |

`grep -rn "useRAFLoop\|useCanvas2D\|useIntersectionPause" web/src/` → **zero hits repo-wide.** The cure is
installed, documented, default-on, and unreached.

**Severity rationale.** Not a WCAG 2.2.2 failure — the play button at `ConvergenceTimeline.vue:61` is a
pause mechanism. It *is* a `prefers-reduced-motion` failure of unbounded duration, on a vestibular-trigger
surface (continuously redrawn oscillating curves), in a component that demonstrably knows the media query
exists. Blocker because the fix is a dependency swap, not new engineering.

**Falsifier.** Show a `matchMedia("(prefers-reduced-motion: reduce)")` read, a `visibilitychange` listener,
or an IntersectionObserver anywhere in `ConvergencePlot.vue` / `useCurveTransition.ts` — `grep -n
"matchMedia\|visibilitychange\|IntersectionObserver"` over both files returns nothing. The only observer is
`ResizeObserver` at `:325`.

**Corpus fold.** `CENSUS-2026-08-03.md:87` already names "ConvergencePlot with its own ungated rAF"; this
challenge adds the two named default-on substrates that make it a one-line cure, and the internal
inconsistency at `:405`.

---

## §2 — MAJOR

### C-3 · MAJOR · `--slider-scrub-track-height` is a dead custom property at **both** glass-ui 4.0.0 and 7.0.0

**Provenance.** `convergence/ConvergenceTimeline.vue:135-137`
```css
.convergence-slider { --slider-scrub-track-height: 20px; }
```

**Claim.** glass-ui's Slider geometry contract is `--slider-track-height` + `--slider-thumb-size` — stated
verbatim in the shipped types: `dist/components/ui/slider/index.d.ts:10-12` ("*The size axis lifts pure
geometry via CSS vars (`--slider-track-height`, `--slider-thumb-size`)*"). The declared name has **zero
occurrences** in the installed 4.0.0 dist (`grep -rn -- "--slider-scrub-track-height"
node_modules/@mkbabb/glass-ui/dist/` → empty) and **zero occurrences** in the 7.0.0 source tree
(`/Users/mkbabb/Programming/glass-ui/src/`, which defines `--slider-track-height: 0.75rem / 1.25rem` at
`src/components/slider/Slider.vue:325,329`). The declaration is inert; the intended 20 px never applies.

**Compounding.** It is also redundant — the same d.ts (`:38-41`) states "`md — 20px track (default)`", and
the component passes no `size`, so it already gets 20 px. The line encodes an intent that is both dead and
already satisfied, which means nobody has ever verified it.

**Falsifier.** Produce a glass-ui version in the fourier resolution path whose Slider reads
`--slider-scrub-track-height`. Both endpoints of the migration ladder (4.0.0 installed, 7.0.0 upstream per
`lane-frontend.md:57`) were grepped; neither does.

---

### C-4 · MAJOR · `glass-ui/timeline` `GlassTimeline variant="scrubber"` is the exact contract this file hand-rolls — and it is unconsumed, replaced by a lossy ×100 integer adapter over `./slider`

**Provenance.** `ConvergenceTimeline.vue:1-17` (the header comment documenting the *Slider* migration),
`:38-44` (the ×100 adapter), `:69-82` (the `<Slider :min="0" :max="100" :step="1">` mount).

**Claim.** glass-ui exports `./timeline` (verified in the installed 4.0.0 exports map). Its
`GlassTimeline.vue.d.ts:6-7` declares: *"`variant="scrubber"` (default): **single-track normalized 0..1
scrubber with full keyboard a11y (role=slider + arrow-key step + shift-step)**"*, with props
`modelValue?: number` (0..1) + `label?: string`, and emits `update:modelValue(v: number)`, **`scrubStart`**,
**`scrubEnd`**. That is ConvergenceTimeline's contract *exactly*: a 0..1 `t` and a
`scrub-start`/`scrub-move`/`scrub-end` trio (`:29-34`). The 7.0.0 source confirms the same surface with a
richer implementation (`glass-ui/src/components/timeline/ScrubberTimeline.vue:59-61` emits,
`:157-167` Home/End + arrow + shift step, `:212-214` `role="slider"` + `aria-valuenow`).

Instead the file adapts a **discrete integer** Slider: `get: () => [Math.round(props.t * 100)]` (`:39`),
`set: arr => emit("scrub-move", clamp(arr[0]/100))` (`:41-43`). Two consequences:

1. **Quantization.** A continuous animation axis is rendered through a 101-step integer model. The thumb
   position is truncated to 1 % — visible as thumb stair-stepping against a smoothly-moving canvas.
   **UNPROVEN-NEEDS-LIVE (SS-13)** for the perceptual claim; the arithmetic (`Math.round(t*100)`) is proven.
2. **Precision loss on scrub.** Round-tripping `t → round(t·100) → /100` bounds user-set `t` to 2 decimals
   while the loop's `t` is float — a discontinuity at the scrub→resume handoff (`onScrubEnd` at
   `ConvergencePlot.vue:289-291` restarts the loop, and `startLoop` re-derives `loopStartTime` from the
   quantized `t.value` at `:61`).

The **local shadow is already known to the repo**: `web/src/components/visualization/GlassTimeline.vue` (127
lines) is a *consumer-side file of the same name as the glass-ui component*, and it too was migrated to
`<Slider variant="standard">` (its header, `:5-11`) rather than to `@mkbabb/glass-ui/timeline`. So the wrong
primitive was chosen twice. `grep -rn "glass-ui/timeline" web/src/` → zero hits.

**Falsifier.** Show that `GlassTimeline`'s scrubber cannot express this surface — e.g. that it lacks a
`scrub-move`-equivalent. It emits `update:modelValue(v: number)` continuously during drag
(`ScrubberTimeline.vue:143`), which *is* `scrub-move`.

---

### C-5 · MAJOR · Keyboard scrubbing emits `scrub-move` without `scrub-start`/`scrub-end` — so while playing, keyboard input is silently overwritten by the rAF loop

**Provenance.**
`ConvergenceTimeline.vue:46-50` — `onPointerDown()` is the **sole** emitter of `scrub-start`, and it is bound
to `@pointerdown` (`:80`).
`ConvergenceTimeline.vue:52-56` — `onValueCommit()` early-returns unless `scrubbing.value` is already true.
`ConvergencePlot.vue:282-291` — `onScrubStart` is the **only** caller of `stopLoop()` on the scrub path.

**Claim.** reka's Slider supports arrow/Home/End keyboard adjustment on the focused thumb. A keyboard
adjustment fires `update:modelValue` → `tArr`'s setter → `emit("scrub-move", …)`, but **never** `pointerdown`,
so `scrubbing` stays `false`, `scrub-start` never fires, and `stopLoop()` is never called. The rAF loop is
still running and overwrites `t.value` on the very next frame (`ConvergencePlot.vue:65`). Net: **while
playing, keyboard scrubbing has no effect** — the value is clobbered within ~16 ms. On release,
`onValueCommit` early-returns, so `scrub-end` never fires either; the state machine is left half-open.

**Why this is a consumption defect, not just a bug.** The primitive named in C-4 owns this state machine
internally (`ScrubberTimeline.vue:157-167` handles keys *and* the scrub lifecycle in one place). Hand-rolling
`scrubbing` from a raw `pointerdown` is exactly the "manual pointer-state-machine" the file's own header
(`:5-7`) claims to have retired.

**Falsifier.** Show that glass-ui's Slider suppresses keyboard `update:modelValue`, or that reka's
`SliderThumbImpl` synthesizes a `pointerdown` for key events. Neither: `Slider.vue` forwards reka's emits
verbatim via `useForwardPropsEmits` (`glass-ui/src/components/slider/Slider.vue:60`), and reka's thumb
handles keys on `keydown`. **UNPROVEN-NEEDS-LIVE (SS-13)** only for the observed frame-timing of the
clobber; the missing-emit path is proven statically.

---

### C-6 · MAJOR · `aria-valuenow`/`aria-valuemin`/`aria-valuemax` land on a **roleless** element and contradict the real slider's 0–100 range

**Provenance.** `ConvergenceTimeline.vue:74-77`
```
:aria-valuenow="activeCount"   aria-valuemin="0"   :aria-valuemax="totalHarmonics"
```

**Claim.** glass-ui's Slider forwards to the reka thumb **exactly four** ARIA attributes — verified in the
installed dist: `dist/slider-DQ95MET2.js` → `"aria-label": n.$attrs["aria-label"] ?? void 0` (plus
`aria-labelledby` / `aria-describedby` / `aria-errormessage`; the 7.0.0 source shows the same list at
`glass-ui/src/components/slider/Slider.vue:277-282`). **`aria-valuenow` appears zero times in the entire
slider dist** (`grep -c "aria-valuenow" node_modules/@mkbabb/glass-ui/dist/slider*.js` → `0, 0`). The three
value attributes therefore fall through to the root `<SliderRoot>` element, which carries **no role**
(`role="slider"` lives on `SliderThumbImpl.js:55`). `aria-valuenow` on a roleless `<span>` is invalid ARIA
and is ignored by AT.

Worse, they are *semantically incompatible* with what they'd have annotated: the thumb reports the real
0–100 timeline position, while these three describe a completely different quantity — the harmonic count
(`activeCount` / `totalHarmonics`). Two contradictory value spaces on one widget. The user-facing "N=3/8"
readout at `:85` therefore reaches sighted users only.

**Cure.** Move the count to the visible `<span class="timeline-count">` as an `aria-live="polite"` region, or
adopt `GlassTimeline` (C-4), whose scrubber owns a correct `role="slider"` + `aria-valuenow`
(`ScrubberTimeline.vue:212-214`).

**Falsifier.** Show glass-ui forwarding `aria-valuenow` to the thumb, or reka giving `SliderRoot` a range
role. Both greps are empty.

---

### C-7 · MAJOR · Two contradictory "amplitude" conventions render **in the same view**, differing by exactly 2×, both labeled `A`

**Provenance.**
`lib/harmonics.ts:41-44` — `a_n = crP + crN; b_n = -(ciP - ciN); amp = Math.sqrt(a_n*a_n + b_n*b_n);`
`ConvergencePlot.vue:267` — `renderKatexInline(\`n = ${harm.k},\\; A = ${harm.amplitude.toFixed(4)}\`)`
`composables/useCoeffHover.ts:92` — `lines.push(\`{\\color{${amber}}A_{${t.n}}} = ${t.amplitude.toFixed(4)}\`)`
`api/models/equations.py:9-14` — `FourierTermDTO { n, coefficient_re, coefficient_im, amplitude, phase }`
`EquationView.vue:76` — `useCoeffHover(coefficients, notation)` mounts alongside `ConvergencePlot` at `:309`.

**Claim.** For real-valued `f`, `c_{-k} = conj(c_k)`, so `groupTrigHarmonics` computes
`a_k = 2·Re(c_k)`, `b_k = -2·Im(c_k)`, hence `amplitude = √(a_k²+b_k²) = **2·|c_k|**`. The DTO's `amplitude`
is `|c_k|` (`src/fourier_analysis/symbolic/models.py:15`, populated from `term.amplitude` at
`api/routers/equations.py:19-26`). Both are rendered as `A` in the **same** `/equation` view — the curve
tooltip says `A = 0.8106`, the notation-pill hover says `A_1 = 0.4053` — for the same harmonic. A third
surface, `FrequencyGraph.vue:81,202`, plots the DTO convention. Two of three surfaces agree; the plot
disagrees by a factor of 2 with no disclosure.

**The consumption defect underneath.** `groupTrigHarmonics` receives `FourierTermDTO[]` and reads only
`n`, `coefficient_re`, `coefficient_im` — **discarding `amplitude` and `phase`, 2 of the DTO's 5 fields**
(`harmonics.ts:28-45`). It then recomputes a quantity it *names* `amplitude` under a different definition.
`EquationView.vue:59-67` shows the same DTO being mapped *with* `amplitude`/`phase` preserved for
`BasisComponent`, so the fields are live on the wire and consumed correctly elsewhere.

**Corpus fold — R6-8.** The adjudicated intake's headline contract lesson is that *"an API-operation model
that embeds derived client back-references cannot attribute a defect to one side of the seam."* This is the
mirror-image failure on the same seam: a **client** that shadows a server-derived field with a
same-named, different-valued local re-derivation. F.W5's shared-provenance contract needs a rule for
*both* directions — server fields are authoritative for their own name, and client re-derivations must be
renamed (`trigAmplitude`) or the DTO field consumed.

**Falsifier.** Show `c_{-k} ≠ conj(c_k)` for the tier-1/tier-3 outputs (i.e. that the backend can return a
non-Hermitian spectrum for real input), which would break the exact-2× relation. `symbolic_fourier_coefficients`
and `spline_fourier_coefficients` both operate on a real `y_eval` grid (`equations.py:56-90`). Even if the
factor were not exactly 2, the two surfaces still disagree — the falsifier only softens the *exactness*.

---

### C-8 · MAJOR · The tooltip renders **SymPy source** through KaTeX; `ComputeEquationResponse.latex` / `latex_sigma` — computed by the backend for exactly this — are never passed in

**Provenance.**
`ConvergencePlot.vue:21` — `expression?: string;`
`ConvergencePlot.vue:263-264` —
```ts
if (h === "sum")      return renderKatexInline(`f(x) = ${props.expression ?? "\\text{sum}"}`);
if (h === "original") return renderKatexInline(`f(x) = ${props.expression ?? "f(x)"}`);
```
`EquationView.vue:315` — `:expression="expression"`; `EquationView.vue:25` — `const expression = ref(cached?.expression ?? "x*(pi - x)")`.
`api/routers/equations.py:104` (request build) → `parse_expression(req.expression)` at `:51` — SymPy syntax.
`api/models/equations.py:29-30` — `latex: str` and `latex_sigma: str` on the response.

**Claim, three parts.**

1. **Wrong string, silently mis-rendered.** `expression` is user-typed **SymPy** source
   (`"x*(pi - x)"`), not LaTeX. KaTeX is called with `throwOnError: false` (`:256`), so
   `x*(pi - x)` renders as juxtaposed italics with a literal asterisk — `x ∗ p i (−x)` — never `\pi`, never a
   multiplication dot. No error, no warning: a **silent** garbage render.
2. **The right string exists and is already in hand.** The API returns `latex` and `latex_sigma` on the same
   `ComputeEquationResponse` the parent already holds as `result`; `EquationView` passes
   `result.original_points`, `result.coefficients` — but not `result.latex`. Two of the response's ten fields
   are computed server-side specifically to be rendered, and the component that draws the series doesn't
   receive them.
3. **The sum curve is mislabeled as the original.** Lines `:263` and `:264` produce the **identical** string.
   The golden curve is the Fourier partial sum; it is labeled `f(x) = <the original function>`. That is not a
   cosmetic slip — it asserts the two curves are the same function, which is the exact proposition the plot
   exists to disprove.

**Cure.** Widen the props contract to `latex?: string` / `latexSigma?: string` and route
`result.latex_sigma` to the sum, `expression`→`latex` to the original.

**Falsifier.** Show that `expression` is LaTeX-normalized before reaching the prop. It is not: the ref is
seeded with raw SymPy (`EquationView.vue:25`), fed verbatim to the request body (`:104`, `:164`), and the
backend hands it to `parse_expression` — a SymPy parser, not a LaTeX one.

---

### C-9 · MAJOR · `v-html` with an un-escaped raw-input fallback

**Provenance.** `ConvergencePlot.vue:255-258`
```ts
function renderKatexInline(latex: string): string {
    try { return katex.renderToString(latex, { throwOnError: false, displayMode: false }); }
    catch { return latex; }
}
```
`ConvergencePlot.vue:353` — `v-html="tooltipHtml"`.

**Claim.** The success path is safe: KaTeX defaults `trust: false`, which disables `\href`/`\url`/`\html*`.
**The catch path is not.** It returns the *raw input string* — which is
`` `f(x) = ${props.expression}` `` — straight into `v-html`, unescaped. `props.expression` is user-typed and
round-trips through `useEquationCache` / localStorage (`EquationView.vue:25` reads `cached?.expression`), so
a persisted payload survives reload. `throwOnError: false` suppresses `ParseError` only; non-parse throws
(e.g. `maxExpand` exhaustion, macro recursion) still propagate to the `catch`.

Contrast `useCoeffHover.ts:98-101`, which uses `trust: true` **deliberately** for its own `\color` markup —
i.e. the codebase is aware of the trust axis; this site simply lacks the escape on its fallback.

**Cure.** `catch { return escapeHtml(latex); }`, or render the fallback as a text node.

**Falsifier.** Demonstrate that `renderToString` with `throwOnError: false` can never throw. KaTeX's own
docs scope `throwOnError` to `ParseError`; `\edef`-style expansion limits raise plain `Error`.
**UNPROVEN-NEEDS-LIVE (SS-13)** for an end-to-end exploit; the unescaped path is proven statically.

---

### C-10 · MAJOR · `canvas.width`/`height` reassigned **every frame** — a full backing-store reallocation at 60 fps — while `glass-ui/canvas` ships the sized substrate

**Provenance.** `ConvergencePlot.vue:87-96`, inside `draw()`, which runs once per rAF tick (`:66`):
```ts
const dpr = window.devicePixelRatio || 1;
canvas.width  = Math.round(rect.width  * dpr);
canvas.height = Math.round(rect.height * dpr);
canvas.style.width  = `${rect.width}px`;
…
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);  ctx.lineCap = "round";  ctx.lineJoin = "round";
```

**Claim.** Per HTML spec, assigning `canvas.width` or `canvas.height` **always** resets the bitmap and the
entire 2D context state — *even when the assigned value is unchanged*. So every frame: reallocate the
backing store, discard the state stack, then re-apply transform + lineCap + lineJoin (which is why lines
`:94-96` exist — they are the symptom). Also `getBoundingClientRect()` at `:84` forces a synchronous layout
read at the top of every frame.

**The substrate exists.** `glass-ui/canvas` → `useCanvas2D` (`dist/composables/glass/canvas2d/useCanvas2D.d.ts`)
owns exactly this: *"`ctx` is pre-transformed for CSS px (**the dpr scale is applied by the substrate's
resize**)"*, with `setup(ctx)`/`render(ctx, now)` split so per-instance state is built **once** and the frame
callback only paints. It additionally ships `respectReducedMotion` (C-2), an IntersectionObserver offscreen
park (`rootMargin` default `200px`), a `"tab-hidden"` suspend reason, and `resolveCanvasColor` (C-14).

**Falsifier.** Show a browser that no-ops a same-value `canvas.width` assignment. The spec's
`set width` steps unconditionally run "reset the rendering context to its default state". The `ctx.setTransform`
+ lineCap/lineJoin re-application at `:94-96` is the code's own admission that the reset happens.
**UNPROVEN-NEEDS-LIVE (SS-13)** for the frame-cost magnitude.

---

### C-11 · MAJOR · Frame-invariant math recomputed every frame

**Provenance.**
`ConvergencePlot.vue:144` — `const curves = lerpH.map(h => xGrid.map(x => h.a_n*Math.cos(h.k*omega*x) + h.b_n*Math.sin(h.k*omega*x)));`
`ConvergencePlot.vue:159-163` — `fullSum`, an *independent second* full evaluation over the same 500-point grid.
`ConvergencePlot.vue:108` — `const nPts = 500;`

**Claim.** `curves` depends only on `lerpH` + `omega` + `xGrid` — all constant except during the 500 ms
transition (`useCurveTransition.ts:26`). `fullSum` depends only on `harmonics` + `dc` — constant *always*; it
exists solely to derive the Y-bounds at `:164`. Both are rebuilt on every one of ~60 frames/s. At the
backend's default `n_harmonics = 20` (`api/models/equations.py:20`) that is
`2 × 500 × 20 × 2 ≈ 40,000` trig evaluations per frame, ≈ **2.4 M/s**, of which the frame-varying portion is
zero outside the transition window.

Two cheaper structures are already latent in the file: `transition.progress >= 1` is the exact
"nothing is interpolating" predicate (`:109`, `:119`, `:133`, `:167`), and `easedT` is the only genuinely
per-frame input — it enters through `cursors` (`:141`) and the blend weights (`:148-156`), which operate on
*indices*, not on the trig values.

**Falsifier.** Show `curves` or `fullSum` depending on `t`/`easedT`. Neither expression references them:
`curves` closes over `lerpH`, `xGrid`, `omega`; `fullSum` over `harmonics`, `dc`, `xGrid`, `omega`.

---

### C-12 · MAJOR · The canvas rAF loop writes a Vue `ref` 60×/s, driving a full re-render of the Slider subtree every frame

**Provenance.**
`ConvergencePlot.vue:28` — `const t = ref(0);`
`ConvergencePlot.vue:65` — `t.value = cycle % 2 === 0 ? frac : 1 - frac;` **inside `tick`**.
`ConvergencePlot.vue:367` — `<ConvergenceTimeline :t="t" … :active-count="activeCount" …>`.
`ConvergenceTimeline.vue:38-40` — `const tArr = computed<number[]>({ get: () => [Math.round(props.t * 100)], … })`.

**Claim.** Each canvas frame invalidates `easedT` (`:34`) and `activeCount` (`:298-304`, itself an O(n) loop
over harmonics), pushes a new `t` prop into `ConvergenceTimeline`, invalidates `tArr`, and re-renders the
reka Slider tree — i.e. a **Vue component render per animation frame** stacked on top of the canvas draw,
for a widget whose visible state changes by at most 1 integer step per frame (C-4's quantization means most
frames produce an *identical* `tArr` and re-render for nothing).

**The idiom the dep prescribes.** `useRAFLoop`'s callback signature is
`(timing: {now, delta, elapsed, frame}) => void` — timing is delivered **by argument, not by ref**
(`dist/composables/motion/useRAFLoop.d.ts:2-13`), precisely so per-frame values never enter the reactive
graph. glass-ui additionally ships `useAnimatedNumber` / `useNumericTransition` for the cases where a number
*must* be reactive.

**Falsifier.** Show that Vue skips the child render when the prop's rendered output is unchanged. Vue's
reactivity invalidates on the *prop value*, not on rendered output; `Math.round(t*100)` changing 0→0 still
re-executes `get` and the render function (the vdom diff is then a no-op, but the work is done).
**UNPROVEN-NEEDS-LIVE (SS-13)** for the measured render cost.

---

### C-13 · MAJOR · `<Button variant="glass">` is consumed and then its entire paint is overridden per-instance

**Provenance.** `ConvergenceTimeline.vue:61` — `<Button variant="glass" size="icon" class="play-btn" …>`
against `ConvergenceTimeline.vue:106-128`:
```css
.play-btn {
    @apply … rounded-full cursor-pointer;
    width: 1.75rem; height: 1.75rem;
    border: 1.5px solid color-mix(in srgb, var(--foreground) 10%, transparent);
    background: color-mix(in srgb, var(--background) 60%, transparent);
    backdrop-filter: blur(8px);
    color: var(--muted-foreground);
    transition: color …, background-color …, border-color …;
}
.play-btn:hover      { background: …; color: var(--foreground); }
.play-btn.is-playing { background: …; border-color: …; color: var(--foreground); }
```

**Claim.** Border, background, backdrop-filter, foreground colour, geometry, and all three hover/active
transitions are re-specified locally — i.e. everything `variant="glass"` and `size="icon"` exist to supply.
What survives from glass-ui is the DOM shape, the focus ring, and the `data-slot` hooks. This is the
per-instance-override anti-pattern the constellation's standing precept forbids (memory:
`feedback_root_styling`, `feedback_glass_ui_first_class` — *"Glass-ui is the design system; add
variants/primitives there, not in demo/ui/"*). The `is-playing` state in particular is a genuine missing
*variant* (a toggle-pressed glass button), not a consumer concern.

**Compounding.** `backdrop-filter: blur(8px)` is hardcoded where glass-ui owns a blur token ladder
(`dist/styles/glass/material.css`), so this button will not track a theme's material recalibration — the
exact drift the 4→7 migration will surface.

**Falsifier.** Show that `variant="glass"` supplies none of these properties, making the overrides additive
rather than substitutive. `glass-ui/dist/styles/glass/{material,surfaces,ladder}.css` all define
`.glass-wash`-family background/border/blur — and `ConvergenceLegend.vue:17` consumes `glass-wash` directly,
proving the consumer knows the recipe exists.

---

### C-14 · MAJOR · The hand-rolled color arms duplicate shipped value.js **and** glass-ui capability, and the harmonic ramp is perceptually non-uniform

**Provenance.**
`lib/harmonics.ts:81-88` —
```ts
const hue = (1 - i / Math.max(total - 1, 1)) * 300;
return `hsla(${hue}, 85%, 55%, ${alpha})`;
```
`@/lib/golden-shimmer.ts:8` — `import { VIZ_COLORS, hexToRgba } from "@/lib/colors";` (the *only* colour
source ConvergencePlot's sum curve uses, `:50-59`).
`@/lib/colors.ts:22-74` — `cssVarToHex` + `hslToHex` + `rgbToHex`: a hand-written CSS-colour parser
(regexes for `hsl(...)`, a bare Tailwind-v4 triplet, `rgb(...)`) with a `"#888888"` silent-failure sentinel
at `:27` and `:53`.
`@/lib/colors.ts:101-117` — `hexToRgba`, `hexToRgb`.

**Claim, two arms.**

**(a) Duplication.** The pinned `value.js@0.13.0` already exports, from the very package this closure imports
on three lines: `color2`, `oklch`, `oklab`, `lch`, `hsl`, `hsv`, `mixColors`, `mixColorsN`,
**`sampleColorRamp`** (`dist/index.d.ts:16,19,21`), `gamutMapSRGB`, `deltaEOK`. `sampleColorRamp` is
*literally* an N-stop ramp sampler — the function `spectrumColor` reimplements. At 4.0.0 the same surface
lives at `@mkbabb/value.js/color` (`value.js/src/subpaths/color.ts:14-38`). Separately, glass-ui ships
`resolveCanvasColor(cssVar, el)` — *"Resolve a CSS custom property or color value to a Canvas2D-VALID
`rgb()`/`rgba()` string … `light-dark(...)`, `color-mix(...)`, `var(...)`, `oklch()`, `hsl()`, hex, a named
color"* (`dist/composables/glass/canvas2d/resolveCanvasColor.d.ts`) — which is `cssVarToHex`'s entire job,
done by the browser instead of by three regexes.

**(b) Correctness.** The 300°-HSL sweep at fixed `S=85% L=55%` is not perceptually uniform: at constant HSL
lightness, hue ≈ 60° (yellow) has roughly twice the relative luminance of hue ≈ 240° (blue). On a harmonic
spectrum this makes low-`k` and high-`k` curves read as different *weights*, not just different hues, which
is a false visual encoding — the index is nominal, the ramp implies magnitude. `value.js`'s `oklch` ramp at
fixed `L` is the correct instrument and is already installed.

**Falsifier for (a).** Show `sampleColorRamp` absent from the installed 0.13.0 — `dist/index.d.ts:19`
exports it. **Falsifier for (b).** Show HSL at constant `L` to be iso-luminant; it is not (sRGB luma
coefficients 0.2126/0.7152/0.0722 are hue-asymmetric by construction).

---

### C-15 · MAJOR · Orphaned, unkillable rAF loop when the component unmounts inside its own mount `nextTick`

**Provenance.**
`ConvergencePlot.vue:323-327`
```ts
onMounted(() => {
    nextTick(() => { draw(); t.value = 0; playing.value = true; startLoop(); });
    resizeObserver = new ResizeObserver(() => draw()); …
});
```
`ConvergencePlot.vue:329-333` — `onUnmounted(() => { stopLoop(); cancelTransition?.(); resizeObserver?.disconnect(); });`
`ConvergencePlot.vue:60` — `function tick(now) { if (!playing.value) return; … }`

**Claim.** The `nextTick` callback is fire-and-forget — it is **not** awaited and **not** guarded by an
unmount flag. If the component unmounts before that microtask runs (route change, `v-if` flip, Suspense
resolution), the teardown runs first: `stopLoop()` nulls `rafId`. Then the callback fires, sets
`playing.value = true`, and calls `startLoop()`. `tick` reads `playing.value === true` → schedules
`requestAnimationFrame(tick)` → forever. `draw()` bails early at `:82` because the template refs are null, so
it is *invisible* — but the loop reschedules itself for the page's lifetime, and nothing holds a handle to
cancel it.

**One line from safe.** `onUnmounted` cancels `rafId` but never sets `playing.value = false` — which is the
loop's own kill switch (`:60`). Adding it makes the orphan self-terminate on its first tick.

**Falsifier.** Show that Vue drops queued `nextTick` callbacks for unmounted components. It does not —
`nextTick` resolves a promise on the global scheduler flush; it has no component binding. **UNPROVEN-NEEDS-LIVE
(SS-13)** for reproducing the race; the code path is proven statically.

---

## §3 — MINOR

### C-16 · MINOR · The parent's `class="flex-1"` is silently dropped (fragment root) and emits a dev warning

`EquationView.vue:309-315` mounts `<ConvergencePlot class="flex-1" … />`. `ConvergencePlot.vue:336-376`
renders **two** root nodes — `<div ref="containerRef">` and `<ConvergenceTimeline>` — a fragment root. With
no `defineOptions({ inheritAttrs: false })` and no `v-bind="$attrs"` anywhere in the file, Vue cannot
auto-inherit and logs *"Extraneous non-props attributes (class) were passed to component but could not be
automatically inherited because component renders fragment or text root nodes."* The class is discarded.
Visually harmless — `.convergence-container` already carries `flex-1` (`:382-385`) — which is exactly why
nobody noticed. **Falsifier:** show `inheritAttrs: false` or an `$attrs` bind in the SFC; `grep -n
"inheritAttrs\|\$attrs" ConvergencePlot.vue` is empty.

### C-17 · MINOR · Zero emits — the parent has no control over, and no visibility into, playback

`ConvergencePlot.vue:16-22` declares props; the file contains **no `defineEmits`**. `playing` (`:29`) and
`t` (`:28`) are private, auto-started (`:324`), and unobservable. The parent cannot pause the plot when its
tab is hidden, cannot sync it to `EquationView`'s loading state (`EquationView.vue:57`), and cannot restore
scrub position across the `useEquationCache` round-trip. Compare `ConvergenceTimeline.vue:29-34`, which
*does* declare a proper typed emit contract — the discipline exists one level down but not at the boundary
the route shell touches. **Falsifier:** exhibit a `defineEmits` or an exposed `t`/`playing` in the SFC.

### C-18 · MINOR · `TrigHarmonic` is declared twice, in two modules, and joined only by structural typing

`lib/harmonics.ts:10-15` and `composables/useCurveTransition.ts:10-15` declare byte-identical but
**nominally distinct** `TrigHarmonic` interfaces. `ConvergencePlot.vue:10` imports the type from
`harmonics`, then passes those values to `snapshotForTransition` (`:311`), which is typed against the
*composable's* copy (`useCurveTransition.ts:60`). It compiles only because TS is structural. Adding a field
to one copy silently degrades the other side to a widening cast. **Falsifier:** show a re-export linking
them; `useCurveTransition.ts` imports nothing from `../lib/harmonics`.

### C-19 · MINOR · Hand-rolled `lerp` duplicates a `lerp` the same file already imports from value.js

`useCurveTransition.ts:85-87` defines `export function lerp(a, b, t) { return a + (b - a) * t; }` — eight
lines below `import { easeInOutSine } from "@mkbabb/value.js";` (`:8`). `value.js@0.13.0` exports `lerp` from
`./math` (`dist/index.d.ts:23`); at 4.0.0 it is `@mkbabb/value.js/math` (`value.js/src/subpaths/math.ts`),
implemented identically at `value.js/src/foundation/math.ts:28`. `ConvergencePlot.vue:11` then imports the
local copy. **Falsifier:** show a signature divergence — both are `(start, end, t) => start + (end-start)*t`.

### C-20 · MINOR · `{ deep: true }` watch over two 500-point float arrays

`ConvergencePlot.vue:308-317` deep-watches `[props.originalPoints, props.coefficients]`. `original_points`
carries `x[]` and `y[]` at `n_eval_points` (default 500, max 5000 — `api/models/equations.py:21`), so each
invalidation walks ≥1,000 numbers to build the dependency set. The API **replaces** the response object
(`EquationView`'s `result` is reassigned per compute), so reference equality already suffices; `deep` buys
nothing and additionally makes the `old` argument at `:308` unreliable for in-place mutation — which the
handler then relies on at `:309-311`. **Falsifier:** show a call site that mutates `original_points` in
place rather than replacing `result`.

### C-21 · MINOR · Undisclosed double-easing, and a provenance line-number drift

**Double ease.** `t` is linear in time (`:63-65`); `easedT = easeInOutSine(t)` (`:34`); `harmonicProgress`
then applies `easeInOutSine` **again** to the local fraction (`harmonics.ts:75`). The net per-harmonic curve
is `easeInOutSine ∘ easeInOutSine`. The doc-comment at `harmonics.ts:53-58` says only *"Local fraction uses
easeInOutSine"* — it does not disclose that its input is already eased. Whether the compounded S is intended
is a design call; the doc/code mismatch is not. value.js ships `CSSCubicBezier` / `bezierPresets` /
`cssLinear` for composing a single explicit curve.

**Drift.** `ConvergencePlot.vue:112-113` cites *"see api/routers/equations.py:61"* for the
`endpoint=False` sampling convention. The live line is **`equations.py:59`** — the convention is exactly
right (see S-1), the pointer is 2 lines stale. Cross-repo line citations need a symbol anchor, not a number.

---

## §4 — INFO

### C-22 · INFO · `@mkbabb/keyframes.js@^4.3.0` is a declared dependency this surface never touches

`grep -rn "@mkbabb/keyframes.js" web/src/` → two hits, neither in the equation tree:
`src/composables/useFourierMorph.ts:14` (a real consumer) and `src/stores/animation.ts:47` (a **prose
comment** recording a *removed* import). The equation surface — which owns two independent rAF tweens
(`ConvergencePlot.vue:57-70`, `useCurveTransition.ts:36-54`) — consumes none of the animation engine the
package declares. Recorded as scope evidence for F.W2's keyframes budget, not as a defect in itself.

### C-23 · INFO · `N={{ activeCount }}/{{ totalHarmonics }}` does not mean what it reads

`ConvergenceTimeline.vue:85` renders `N=3/8`. `activeCount` (`ConvergencePlot.vue:298-304`) counts harmonics
whose *draw progress* exceeds `0.5` — a rendering-completion proxy, not a count of harmonics in the partial
sum. All 8 are always in the sum (`:148-156` blends every harmonic with a per-index weight); the readout
tracks the animation, not the mathematics. It is also the value wrongly wired to `aria-valuenow` (C-6).

### C-24 · INFO · Zero test coverage for the entire closure; the web package has no unit-test runner

`web/package.json` scripts are `dev` / `build` / `preview` / `test:e2e` / `test:e2e:ui` — **no `test`, no
vitest dependency, no `vitest.config.*`** (`ls vitest.config.*` → no matches; `find src -name "*.test.ts" -o
-name "*.spec.ts"` → empty). So `groupTrigHarmonics` (the amplitude-convention site, C-7), `harmonicProgress`
(the double-ease site, C-21), `niceStep`, `hitTestCurves` and `lerp` — five pure, trivially-testable
functions carrying the component's entire mathematical contract — have no unit coverage and **no mechanism
to acquire it**. On the e2e side, `/equation` is reached by exactly one spec, and only as a screenshot
target: `e2e/visual-baseline.spec.ts:34` — `{ slug: "equation", path: "/equation" }`. No spec asserts the
canvas, the timeline, the legend, or any tooltip. Given C-2's auto-play, a visual-baseline screenshot of an
unstopped animation is also a flake source. **Falsifier:** produce any unit test file or a `test` script in
`web/package.json`.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The endpoint-convention provenance comment is genuinely excellent cross-repo API consumption

`ConvergencePlot.vue:111-115` and `:123-129`:
> *"X-grid for the partial-sum curve (endpoint=false matches backend convention: the canonical equispaced
> Fourier sampling drops x = domB since the periodic wrap identifies it with x = domA — see
> api/routers/equations.py:61)."* … *"Closed grid for the ORIGINAL curve only (endpoint=true) — visual
> closure over [a, b]. The Fourier expansion treats f as periodic with period (b − a) (paper
> §ch:interpreting …), hence the wrap sample y(b) = y(a). The partial-sum curve below retains the backend's
> endpoint=false grid so the numerical convention is preserved."*

**Verified.** `api/routers/equations.py:59` — `x_eval = np.linspace(domain[0], domain[1], req.n_eval_points,
endpoint=False)`. The convention is exactly as described; the two grids are *deliberately different*
(`xGrid` at `:114-115` open, `oxClosed`/`oyClosed` at `:128-129` closed with the wrap sample) and the reason
is written down, cited to the API file **and** to the paper's section. Across this whole audit corpus this is
the only client comment I found that names a server-side numerical convention, explains why the client
diverges from it on one curve, and preserves it on the other. That is the standard the F.W5
shared-provenance contract should codify. (Line-number drift noted at C-21 — the drift is why the *symbol*,
not the line, should be the anchor.)

**Falsifier.** Show `endpoint=True` at the API, or the two grids being accidentally rather than deliberately
different. Both refuted above.

### S-2 · Design-token consumption is 100 % glass-ui-sourced and stable across the entire 4→7 migration ladder

Every token and utility this component's CSS reaches is defined upstream at **both** the installed 4.0.0
and the upstream 7.0.0:

| consumed at | token / class | glass-ui 4.0.0 (installed) | glass-ui 7.0.0 (upstream) |
|---|---|---|---|
| `ConvergencePlot.vue:399` | `--z-controls` | `dist/styles/tokens/scheme-motion.css:336` | `src/styles/tokens/scheme-motion.css:215` |
| `ConvergenceLegend.vue:53` | `--z-content` | `…:335` | `…:214` |
| `ConvergencePlot.vue:402`, `ConvergenceTimeline.vue:116-118` | `--ease-standard` | `dist/styles/theme/bridges.css:325` | present |
| `ConvergencePlot.vue:402` | `@keyframes tooltip-in` | `dist/styles/animations.css:41` | `src/styles/animations.css:7` |
| `ConvergenceLegend.vue:17` | `.glass-wash` | `dist/styles/glass/{ladder,material,surfaces}.css` | `src/styles/glass/{material,rim}.css` |
| `ConvergenceLegend.vue:78,94` | `--viz-amber` | shipped + consumer-rebaselined at `web/src/style.css:113-125` | present |

**Zero hardcoded `z-index`, zero hardcoded transition curve** anywhere in the three SFCs. The `A.W3.d`
comment at `ConvergencePlot.vue:400-402` records that the consumer-side shadow `tooltip-in` keyframe was
*excised* in favour of the canonical one, and `ConvergenceTimeline.vue:114` records that `transition: all`
was replaced by three named properties. That is disciplined, auditable, migration-proof token consumption —
and it is the reason C-3's dead `--slider-scrub-track-height` stands out so sharply: it is the single
exception in an otherwise clean register.

**Falsifier.** Name one token in the table absent from either version. All twelve greps returned hits.

### S-3 · `aria-label` is precisely the attribute glass-ui forwards — the never-nameless floor is already met

`ConvergenceTimeline.vue:78` passes `aria-label="Harmonics timeline"`. glass-ui's Slider forwards exactly
`aria-label` / `aria-labelledby` / `aria-describedby` / `aria-errormessage` to the reka `SliderThumb`
(installed dist: `"aria-label": n.$attrs["aria-label"] ?? void 0`; 7.0.0 source:
`glass-ui/src/components/slider/Slider.vue:277-282`). glass-ui 7 emits a **DEV console warning** for a
single-thumb Slider with neither (`Slider.vue:205-218`, *"its role="slider" thumb is nameless to a screen
reader"*). This consumer satisfies that floor **already**, before the upgrade lands — a rarity worth
booking, and the exact contrast that makes C-6 legible: the consumer picked the one ARIA attribute the
component contract honours and three it does not.

**Falsifier.** Show `aria-label` not reaching the thumb — refuted by the dist grep above.

### S-4 · The three-file decomposition is clean, one-directional, and honestly documented

`ConvergencePlot` delegates its two chrome surfaces to `ConvergenceLegend` (typed props
`harmonics`/`hoveredCurve`, typed emits `hover`/`leave` — `ConvergenceLegend.vue:5-13`) and
`ConvergenceTimeline` (typed props + a four-event typed emit contract — `ConvergenceTimeline.vue:22-34`).
**No `provide`/`inject`, no shared mutable module state, no back-channel** — `grep -n "provide\|inject"` over
all three SFCs is empty; the children are pure functions of their props. `ConvergenceTimeline.vue:1-17`
further documents its own migration provenance *including a correct negative observation* — that the
variant's internal `useOptionalDockContext()` resolves to `null` here because the site is not a `GlassDock`
descendant, and that this is a deliberate no-op. Writing down why a consumed contract is *inert* at your
site is the discipline the rest of this audit is asking for; this file did it unprompted.

**Falsifier.** Show a shared ref, an inject key, or a child mutating parent state. The only parent-state
writes originate in the parent's own handlers (`ConvergencePlot.vue:282-296`).

---

## §6 — Corpus folds and carries

| corpus row | how this challenge relates |
|---|---|
| `CENSUS-2026-08-03.md:38` — value.js bare-root specifiers, "latent, not live" | **CONFIRMED + sharpened.** Three of the five sites are in this closure; exact `file:line` + the verified `/easing` cure at **C-1**. |
| `CENSUS-2026-08-03.md:87` — "ConvergencePlot with its own ungated rAF" | **CONFIRMED + deepened.** **C-2** supplies the three named default-ON substrates in the *declared* deps, and the internal PRM inconsistency at `:405`. |
| `lane-frontend.md:198` — "cleanest glass-ui consumer posture in the constellation" | **CONTRADICTED at component scope** — see §0.2. |
| `lane-frontend.md:131,142` — ConvergencePlot 410 LOC / "rAF curve tween (`easeInOutSine` from value.js)" | **CONFIRMED.** Both figures exact. |
| `lane-frontend.md:57-59` — version ladder (glass-ui 4→7, value.js 0.13→4.0.0) | **CONFIRMED** against both live trees; used as the falsifier baseline for C-1 and C-3. |
| intake **R3-7a** — 35 Tooltip callsites / 9 consumers → `@mkbabb/glass-ui/tooltip` (F.W3) | **EXTENDS the budget.** `ConvergencePlot.vue:346-354` is a **10th** tooltip surface *outside* R3's consumer set — a hand-rolled cursor-following `v-html` div that bypasses `./tooltip` entirely. F.W3 should count it (and C-9's escape defect rides on it). |
| intake **R5-7 / R6-5** — deriver blind to native template loops | **NEW INSTANCE.** `ConvergenceLegend.vue:29-38` renders the whole harmonic legend through a native `<div v-for="(h, i) in harmonics">`. This is the `NATIVE_TEMPLATE_LOOP` family R6 had to add; any F.W4 instance denominator keyed on component callsites drops this subtree exactly as it dropped `PaperSidebar`'s TOC. |
| intake **R6-8** — operation records must not embed derived client back-references (F.W5) | **MIRROR CASE at C-7.** Here the *client* shadows a server field (`amplitude`) with a same-named, 2×-different local re-derivation. The F.W5 contract needs the rule in both directions. |
| intake **X-3** — 45 total ops / 30 public-non-admin / 13 admin | This component sits behind exactly **one** operation, `POST /api/equations/compute` (`api/routers/equations.py:29`), consumed via the parent. Two of that operation's ten response fields (`latex`, `latex_sigma`) are **unconsumed by the surface that needs them** (**C-8**) — a client-side gap of the same family as R3-7c's "36 client edges / 9 gap operations", but *within* an operation rather than across them. Recommend F.W5 count field-level gaps, not only operation-level ones. |

---

## §7 — Tally

| severity | ids | n |
|---|---|---:|
| **BLOCKER** | C-1, C-2 | **2** |
| **MAJOR** | C-3 … C-15 | **13** |
| **MINOR** | C-16 … C-21 | **6** |
| **INFO** | C-22, C-23, C-24 | **3** |
| **defects total** | | **24** |
| **SUPERLATIVE** | S-1 … S-4 | **4** |

**Claims requiring live confirmation (SS-13):** C-4 (thumb stair-step perception), C-5 (observed clobber
timing), C-9 (end-to-end injection), C-10 (frame-cost magnitude), C-12 (measured render cost), C-15 (race
reproduction). Every other claim above is proven statically against a named `file:line` in a live tree.

## §8 — Method and limits

- **Read-only** in `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`.
  This file is the lane's only write. No product source touched in any repo.
- Evidence commands: `grep`/`sed`/`find`/`ls`/`wc`/`node -e` over the fourier tree, its
  `web/node_modules/@mkbabb/{value.js@0.13.0, glass-ui@4.0.0, keyframes.js@4.3.0, reka-ui}` dists, the
  upstream `glass-ui@7.0.0` and `value.js@4.0.0` source trees, and the fourier Python API.
- No browser tooling was used, per lane law.
- **Not adjudicated here:** the A-axis (accessibility proper), D-axis (design), and the correctness of the
  harmonic math itself beyond the two convention collisions (C-7, C-21) that surfaced as *consumption*
  defects. Findings that are simultaneously a11y and consumption (C-2, C-5, C-6) are booked once, on the
  consumption reading, and flagged for the A-axis challenger.
