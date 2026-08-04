claude-opus-5[1m] (served model id)

# CHALLENGE — `ConvergencePlot.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/ConvergencePlot.vue` (410 lines)
**Substrate.** fourier `cd26c653` + the frozen M.W1a working tree. **`ConvergencePlot.vue` itself is CLEAN** (`git status --porcelain -- web/src/components/equation/` → it is not listed); **both of its children ARE modified** — `convergence/ConvergenceLegend.vue` and `convergence/ConvergenceTimeline.vue`. I read the WT diff for both (`git diff -- web/src/components/equation/convergence/`) and say so wherever a claim rides a WT byte.
**Pin.** `@mkbabb/glass-ui ^4.0.0` / installed `4.0.0` (`web/package.json:14`); producer at **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json:3`). Every 4→7 consequence is in §3 — **including one the census break surface does not name.**
**Method.** Static + source-derived only. No browser. **Read whole:** the subject; `convergence/ConvergenceLegend.vue`; `convergence/ConvergenceTimeline.vue`; `lib/grid.ts`; `lib/harmonics.ts`; `lib/hit-test.ts`; `composables/useCurveTransition.ts`; `lib/golden-shimmer.ts`; `lib/colors.ts`; `lib/equation/types.ts`; the mount site `EquationView.vue`; the in-directory sibling `FrequencyGraph.vue`; `src/style.css`; `web/index.html`; `api/routers/equations.py`; installed glass-ui 4.0.0 `dist/slider*.js`, `dist/button*.js`, `dist/components/ui/{slider,button}/*.d.ts`, `dist/styles/tokens/*`, `dist/styles/glass/ladder.css`, `dist/styles/typography/utilities.css`, `dist/styles/animations.css`, `dist/styles/dock-controls/touch-floor.css`; `node_modules/reka-ui/dist/Slider/*`; and producer 7.0.0 `src/components/{slider,button}/*`, `src/components/_shared/*`. **No file outside this one written; no product source touched in any repo.**
**Priors.** Read as instructed: `formation/fourier/{CENSUS-2026-08-03.md, lane-frontend.md, lane-crud.md}` and `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Row ids cited inline; §7 records the reconciliation, including **one place the tree extends a prior** and **one place it contradicts a fourier-side coordination note**.

**Tally. 27 defects — 5 BLOCKER · 8 MAJOR · 11 MINOR · 3 INFO. 5 superlatives.** (`defects` = the full finding count; `blockers` is the subset.)

The component is **DEFECTIVE**. Its *mathematics* is careful — the endpoint-convention triptych, the blend feather, the axis-bounds lerp are all genuinely good (§4) — and its *rendering* is the least conformant surface I have read in this lane: a five-family literal colour palette that fails non-text contrast on **every single mark** in the light theme, a nameless transport button, and a keyboard path that the animation loop overwrites 60 times a second. It is a plot that is correct about Fourier series and wrong about who can see them.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · The canvas palette is theme-blind — **every** mark fails SC 1.4.11 in the light theme, and the legend disagrees with the curve it labels

**Claim.** The plot paints five colour families, and **not one** is routed through a token:

| mark | source | value |
|---|---|---|
| sum curve (the primary datum) | `lib/colors.ts:13` → `golden-shimmer.ts:50` | `VIZ_COLORS.golden` = **static `#f0b632`** |
| original `f(x)` (the convergence target) | `ConvergencePlot.vue:189` | `rgba(180,180,180,0.55)` / hovered `rgba(220,220,220,0.85)` |
| grid lines | `lib/grid.ts:41` | `rgba(150,150,150,0.07)` |
| x=0 / y=0 axes | `lib/grid.ts:59` | `rgba(150,150,150,0.2)` |
| harmonics | `lib/harmonics.ts:87` | `hsla(h, 85%, 55%, α)` — see D-2 |

`VIZ_COLORS.golden` is the sharpest case. `lib/colors.ts:77` seeds it from `STATIC.golden` (`:13`), and `resolveVizColors()` (`:89-95`) — the function whose entire job is to re-read the `--viz-*` custom properties on mount and on theme toggle — updates `fourier`, `chebyshev`, `legendre`, **`amber`**, `green`, and **not `golden`**. So a token-derived amber (`VIZ_COLORS.amber`) sits unused, one property away, while the sum curve is a frozen hex.

**Numbers.** Default arm is light (`index.html:24-31` applies `.dark` only on an explicit save or a `prefers-color-scheme: dark` match). `--background: var(--neutral-0)` = `hsl(40 30% 98%)` ≈ `#FBFAF8`, relative luminance **0.960** (`glass-ui/dist/styles/tokens/color-radius.css:40,57`). Dark arm `--neutral-0: hsl(24 9% 4%)`, luminance **0.0031** (`tokens/dark-arm.css:42`). Canvas strokes composite over that page surface (the card is `--card`, a near-identical cream). At the resting `globalAlpha 0.9` (`golden-shimmer.ts:48`, non-hovered non-playing):

| mark | LIGHT | DARK | 1.4.11 needs |
|---|---|---|---|
| sum `#f0b632` | **1.66 : 1** | 8.82 : 1 | 3 : 1 |
| original `rgba(180,180,180,.55)` | **1.43 : 1** | 3.55 : 1 | 3 : 1 |
| axes `rgba(150,150,150,.2)` | **1.19 : 1** | ~1.9 : 1 | 3 : 1 |

Every mark that carries meaning fails in the light theme; two of three fail in both. This is not a hairline — the sum curve is at **55 % of the requirement**.

**The second consequence: the legend lies.** `ConvergenceLegend.vue:78` paints the "Sum" swatch `background: var(--viz-amber)`, and `src/style.css:120` sets light `--viz-amber: hsl(35 76% 35%)` = `#9D6515`, a dark burnt orange at **4.69 : 1**. The curve it identifies is `#f0b632`, a bright amber at 1.66 : 1. In the light theme the key and the datum are **different colours** — Δ relative luminance ≈ 0.39 — so the one device that maps mark→meaning is wrong about its own primary entry. `ConvergenceLegend.vue:94` repeats the mismatch on the label.

**The repo already knows the law and this file is the exception.** `src/style.css:113-122` is a documented D.W4.d carry that darkens light `--viz-amber` from 3.54 : 1 to 4.6 : 1 *specifically because the light arm failed axe*. That carry cannot reach a canvas literal.

**Falsifier.** Dies if (a) the app had no light arm — refuted at `style.css:119-127` + `index.html:24-31`; (b) the canvas sat on a dark plate regardless of theme — refuted, the plot's container has no background and the ancestor `.cartoon-card` is `background: var(--card)` (`style.css:107-110`); (c) `resolveVizColors()` did update `golden` — refuted by enumeration at `lib/colors.ts:89-95` (five assignments, `golden` absent); (d) 1.4.11 exempted the marks — it does not; these are "graphical objects required to understand the content", and the content *is* the graph. **Cheap live corroboration** (sample the composited pixels) — mark **UNPROVEN-NEEDS-LIVE for SS-13** as corroboration only; the arithmetic is complete from source.

**Cure (one edit, both consequences).** Add `golden` to `resolveVizColors()` — or read `VIZ_COLORS.amber`, already token-derived — and the curve tracks `--viz-amber`, which the D.W4.d carry has already made AA in both arms, and which the legend already paints.

---

### D-2 · BLOCKER · `spectrumColor` is a fixed-lightness HSL ramp — it fails 3 : 1 at one end of the spectrum in **every** theme, so no tokenisation can cure it

**Claim.** `lib/harmonics.ts:81-88`:

```
const hue = (1 - i / Math.max(total - 1, 1)) * 300;
return `hsla(${hue}, 85%, 55%, ${alpha})`;
```

Lightness is pinned at 55 % across a 300° sweep. HSL lightness is not perceptual lightness: at `L=55 %` the yellow rung has ~5× the relative luminance of the blue rung. The ramp therefore *cannot* clear a contrast floor at both ends against any single background. Non-hovered curves draw at **α 0.55** (`ConvergencePlot.vue:207`); legend swatches at **α 1.0** (`ConvergenceLegend.vue:36`).

**Numbers** (α 0.55, composited over the two page surfaces of D-1):

| hue | i/(n−1) | LIGHT | DARK |
|---|---|---|---|
| 60 (yellow) | 0.80 | **1.13 : 1** | 5.21 : 1 |
| 120 (green) | 0.60 | **1.33 : 1** | ~4.6 : 1 |
| 180 (cyan) | 0.40 | **1.25 : 1** | ~4.3 : 1 |
| 240 (blue) | 0.20 | **2.92 : 1** | **1.47 : 1** |
| 300 (magenta) | 0.00 | **2.10 : 1** | ~2.6 : 1 |

**Light fails at all five sampled rungs. Dark fails at the blue end.** Raising to α 1.0 does not save it (yellow at full strength is 1.20 : 1 on the cream page) — so the legend dots, the *sole* key mapping curve→harmonic order, fail with the curves.

**Aggravator — the ramp is also unusable as an identifier at scale.** `FunctionInput.vue:184` sets the harmonics slider `:max="100"`, and `EquationView.vue:53` feeds `vizHarmonics` straight into `:n-harmonics`. At N = 100 the ramp allocates **3° of hue per harmonic**; adjacent legend dots are metamers. The legend's `n={{ h.k }}` text is then doing all the work, and see D-6 for what a 100-row legend does to the plot.

**Falsifier.** Dies if the marks were decorative (refuted — the harmonic curves are the pedagogical payload and are individually hit-tested and tooltipped, `:204-219`, `:265-268`); dies if the ramp had a lightness compensation term (refuted — `:87` is a single template literal with a constant `55%`); dies if the composite arithmetic were wrong — it is sRGB alpha compositing followed by WCAG relative luminance, and I show the inputs so it can be recomputed. **The load-bearing point survives even if a ratio is off by 0.1: a constant-L HSL sweep cannot bracket 3 : 1 at both ends, which is why the failures invert between themes.**

**Note for the wave.** `spectrumColor` is **shared** — `FrequencyGraph.vue:196` paints its tooltip swatch from the same function. The cure belongs in `lib/harmonics.ts`, not here, and `@mkbabb/value.js` (already a dependency, `package.json:19`) ships the OKLCH machinery to build a perceptually-even ramp.

---

### D-3 · BLOCKER · The transport control is a **nameless button**

**Claim.** `ConvergenceTimeline.vue:61-66`:

```
<Button variant="glass" size="icon" class="play-btn" :class="{ 'is-playing': playing }" @click="emit('toggle-play')">
    <Transition name="icon-swap" mode="out-in">
        <svg v-if="playing" class="size-3" viewBox="0 0 320 512" fill="currentColor"><path …/></svg>
        <svg v-else       class="size-3" viewBox="0 0 384 512" fill="currentColor"><path …/></svg>
    </Transition>
</Button>
```

No `aria-label`, no `aria-labelledby`, no `title`, no `<title>` inside either `<svg>`, no visually-hidden text. The accessible name computation yields **empty**. `grep -n "aria-" ConvergenceTimeline.vue` returns exactly four hits, all four on the `<Slider>` (`:75-78`). This is axe's `button-name`, WCAG 4.1.2 — on the only control that starts and stops the instrument.

`<Button>` does not supply one: the installed 4.0.0 chunk contains **zero** occurrences of `aria-label` (`dist/button-BNDWhAZb.js`, verified by index scan), and producer 7.0.0's `hostAttrs` computes only `type` / `disabled` / `aria-disabled` (`glass-ui/src/components/button/Button.vue:53-59`).

**The app knows better, in the same repo, on the same control.** `AnimationControls.vue:67` and `:82` both bind `:aria-label="anim.playing ? 'Pause animation' : 'Play animation'"` — the state-swapped APG transport pattern, awarded as a superlative in that component's D-axis challenge. The convergence transport ships the same glyph pair with none of it.

**Falsifier.** Dies if `Button` injected a name (refuted above at both pins); dies if the SVGs carried `<title>` (refuted — `:63` and `:64` each contain a single bare `<path>`); dies if an ancestor supplied `aria-labelledby` (refuted — `.timeline-dock`, `:60`, is a bare `<div>`). Dies if the `class="play-btn"` never reaches a real `<button>` — it does: 4.0.0's Button chunk has no `inheritAttrs` key (verified by index scan → `-1`), so `$attrs` land on the `Primitive`-rendered `<button>`.

---

### D-4 · BLOCKER · Keyboard scrubbing is overwritten by the animation loop — and playing is the **default state on mount**

**Claim.** Three source facts compose into an inoperable control.

1. `ConvergencePlot.vue:324` — `onMounted(() => { nextTick(() => { draw(); t.value = 0; playing.value = true; startLoop(); }); })`. **Autoplay is the mount state.**
2. `ConvergenceTimeline.vue:80` binds the scrub-suspend to **`@pointerdown`** only → `onPointerDown` (`:46-50`) → `emit("scrub-start")` → `ConvergencePlot.vue:282` `stopLoop()`. A keyboard interaction (`ArrowRight` on the focused thumb) fires **no** `pointerdown`.
3. The loop's phase anchor is latched, not re-derived: `startLoop` (`:57-70`) sets `loopStartTime` on the first tick as `now - t.value * animDuration.value` and **never again**; every subsequent tick recomputes `t.value` from `elapsed` alone (`:62-65`).

So an arrow-key press reaches `onScrubMove` (`:285-288`), writes `t.value = newT`, draws one frame — and the very next `requestAnimationFrame` tick recomputes `t.value` from the stale `loopStartTime` and discards it. **The scrubber is a no-op from the keyboard for as long as the animation is playing, which is from mount onward until a pointer user presses pause.**

`onValueCommit` (`:52-56`) cannot rescue it: it early-returns unless `scrubbing` is true, and `scrubbing` is only set by `onPointerDown`. Even if it ran, `onScrubEnd` (`:289-291`) merely restarts the loop.

**Consequence.** WCAG 2.1.1: the control receives focus, announces a value, accepts input, and produces no effect. That is worse than an inert control — a screen-reader user is told the value changed.

**Falsifier.** Dies if reka synthesised a `pointerdown` on keydown — it does not (`reka-ui/dist/Slider/SliderThumbImpl.js` handles `keydown` and the root handles pointer events; they are separate paths); dies if `loopStartTime` were re-derived from `t` each frame — refuted at `:61`, the assignment is guarded by `if (loopStartTime === null)`; dies if `stopLoop()` ran on any keyboard path — `grep -n "scrub-start" ConvergenceTimeline.vue` yields exactly one emitter, `onPointerDown`. **Cure is two lines**: bind `scrub-start` to the reka value-change with a `scrubbing` latch, or re-anchor `loopStartTime` inside `onScrubMove`.

---

### D-5 · BLOCKER · The instrument is mouse-only — no touch, no keyboard, no focus target, and the canvas has no accessible representation at all

**Claim.** Every path into the plot's information is a pointer-hover path:

- `ConvergencePlot.vue:341-342` — `@mousemove="onCanvasMove"` / `@mouseleave="onCanvasLeave"`. `mousemove` has no touch equivalent; a touch device produces at most a single synthesised event on tap, and never a hover track.
- `ConvergenceLegend.vue:19,24,33-34` — `@pointerenter` / `@pointerleave`. `pointerenter` on a coarse pointer fires only while a finger is down; the rows are `<div>`s (`:18`, `:23`, `:29`) with `cursor-default` (`:58`), **no `tabindex`, no `role`, no `<button>`**, so they are not in the tab order.
- The canvas is `<canvas ref … class="block size-full text-muted-foreground">` (`:338-343`): **no `role`, no `aria-label`, no `<figcaption>`, no fallback content between the tags** (it is self-closed). WCAG 1.1.1 — the entire visualisation is absent from the accessibility tree.
- The curve tooltips (`:260-270`), which are the only place `n` and the amplitude `A` are surfaced per-harmonic, are reachable **only** by hovering a curve within 12 px (`lib/hit-test.ts:19`).

Net: on a phone or from a keyboard, the plot renders and is otherwise inert. There is no focusable element inside `.convergence-container` at all.

**Falsifier and its limit.** Dies if the same information were reachable elsewhere — **partially true, and I state it against myself**: `EquationView.vue` renders the LaTeX series, a coefficients panel, an energy `MetricBadge`, and `FrequencyGraph`. So the *numbers* survive. What does not survive is (a) the mark→meaning mapping (which curve is `n=3`), (b) any indication that a graphic is present, and (c) the hover tooltip's per-harmonic amplitude at 4 decimals (`:267`), which appears nowhere else in this view. Dies if `@mousemove` fired usefully on touch — it does not produce a hover track by specification. Dies if the legend rows were focusable — refuted by enumeration above. **I grade this BLOCKER rather than MAJOR because the component ships zero accessible surface, not a degraded one**; the systemic half (sibling canvases share the pattern — `FrequencyGraph.vue:178-183` is also `@mousemove`-only) belongs to an F-wave a11y sweep, not to this file alone.

---

## §2 — MAJOR

### D-6 · MAJOR · The legend occupies the plot it annotates — no reserved gutter, and unbounded height

`PAD` is `{ top: 14, bottom: 18, left: 12, right: 12 }` (`:53`) and every curve is projected across `plotW = w - PAD.left - PAD.right` (`:177-181`). The legend is `absolute top-2 right-2` with `min-width: 100px` (`ConvergenceLegend.vue:46,54`). **12 px of reserved right gutter against a ≥100 px overlay**: the legend sits on top of the plot's top-right quadrant — precisely where the highest-order harmonics have their tightest oscillation and where the sum curve's Gibbs overshoot lives.

It is also unbounded downward. `max-height: calc(100% - 16px)` + `overflow-y: auto` (`:47-49`) against a container whose floor is `min-height: 200px` (`:385`), holding `2 + 1 + N` rows at ~26 px each (`gap-0.5` + `px-2 py-1` on a 10 px dot, `:46,58,74-75`). At the shipped ceiling **N = 100** (`FunctionInput.vue:184`) that is a ~2 700 px scroller clamped to the full plot height — the legend becomes the plot.

Aristotle's mean is not being missed by a little: the component reserves 3 % of its width for an element that claims 15–100 %.

**Falsifier.** Dies if the legend were outside the plot box — refuted, it is a child of `.convergence-container` (`:357-362`) with `position: absolute` and the container is the canvas's own box (`:337-343`, canvas is `size-full`). Dies if `PAD.right` were widened for it — it is the literal `12` at `:53`, unchanged for every N. Dies if the legend were opaque enough to read as a separate plane — see D-7, it is not.

### D-7 · MAJOR · `glass-wash` is the **sub-perceptual** rung — the legend is a 30 %-opaque panel floating over animated saturated strokes

`ConvergenceLegend.vue:17` applies `glass-wash`, and the panel declares **no background of its own** (`:45-55` sets only padding, radius, scrollbar, z-index, min-width, overflow). So its entire opacity is the rung's:

- `--glass-bg-wash: color-mix(in srgb, var(--card) 30%, transparent)` — `--glass-opacity-wash: **0.30**` (`glass-ui/dist/styles/tokens/glass.css:22,137`)
- `--glass-blur-wash: blur(1px) saturate(1.05)` — `--glass-blur-wash-radius: **1px**` (`:43,67`)

The producer's own comment calls this rung **"sub-perceptual"** (`dist/styles/glass/ladder.css:53`). The neighbouring rungs are `--glass-opacity-resting: 0.65` and `--glass-opacity-floating: 0.80` (`tokens/glass.css:24-25`).

**Consequence.** Per D-6 the harmonic curves are drawn *underneath* this panel. A 30 % plate with a 1 px blur does not separate 13 px `--muted-foreground` text from a saturated stroke passing beneath it — the text/backdrop ratio becomes a **function of the animation frame**, which is exactly the SC 1.4.3 failure mode that a determinate ratio is supposed to preclude. The value is not merely low; it is *indeterminate*, and no static audit can certify it.

**The same view already gets this right.** `EquationView.vue:261` gives the coefficient popover `class="coeff-popover glass-floating"` — the 0.80 rung — for an overlay with a far quieter backdrop.

**WT provenance.** The `glass-subtle` → `glass-wash` swap is a WT byte (`git diff`, `ConvergenceLegend.vue:17`). The *rename* is correct and necessary — `glass-subtle` is definition-absent at 4.0.0 (`grep -rn "glass-subtle" dist/styles/` → empty), and census FE `lane-frontend.md:382` names `glass-wash`/`glass-resting`/`glass-floating` as the post-4.0.0 tier names. **The migration picked the wrong rung of the right ladder.**

**Falsifier.** Dies if the legend had its own opaque background (refuted by enumeration of `:45-55`); dies if the curves stopped short of the legend (refuted — `PAD.right = 12`, D-6); dies if `glass-wash` were the heaviest rung (refuted — 0.30 vs 0.65 vs 0.80). Live pixel sampling would quantify the worst frame — **UNPROVEN-NEEDS-LIVE for SS-13** for the exact worst-case ratio only; the rung arithmetic and the geometry are source-decidable.

### D-8 · MAJOR · Three of the four ARIA attributes on the scrubber are invalid, the fourth is duplicated, and the values contradict the control

`ConvergenceTimeline.vue:75-78` passes `:aria-valuenow="activeCount"`, `aria-valuemin="0"`, `:aria-valuemax="totalHarmonics"`, `aria-label="Harmonics timeline"` to `<Slider>`.

Where they land is decidable:

- reka's slider root renders a roleless `<span>` (`reka-ui/dist/Slider/SliderRoot.js:77-80` `as` default `"span"`; `SliderImpl.js:14-17` likewise). `grep -n "role" reka-ui/dist/Slider/*.js` returns **exactly one hit**: `SliderThumbImpl.js:55` `role: "slider"`.
- glass-ui 4.0.0's `<Slider>` declares no `inheritAttrs` (index scan of `dist/slider-DQ95MET2.js` → `-1`), so `$attrs` fall through to that roleless root; separately it forwards **only** `aria-label` onward: `"aria-label": n.$attrs["aria-label"] ?? void 0` on the thumb.
- the thumb computes its own range semantics: `"aria-valuenow": value.value`, `"aria-valuemin": rootContext.min.value`, `"aria-valuemax": rootContext.max.value` (`SliderThumbImpl.js:60-62`).

Therefore: `aria-valuenow` / `-valuemin` / `-valuemax` sit on a **generic** element where they are not allowed (axe `aria-allowed-attr`) and are ignored by AT; `aria-label` is emitted **twice** (root + thumb). And the intent is semantically contradictory — the consumer is describing *harmonics activated* (`activeCount` of `totalHarmonics`, `ConvergencePlot.vue:298-304`) on a control whose real, announced range is the **0–100 timeline percent** (`ConvergenceTimeline.vue:71-73`). A screen reader will read "Harmonics timeline, slider, 47" and mean 47 % of the loop, not 47 harmonics.

**Falsifier.** Dies if reka's root carried `role="slider"` — refuted by the single-hit grep above; dies if glass-ui stripped `$attrs` from the root — refuted, no `inheritAttrs` key; dies if `aria-valuenow` were permitted on a generic role — it is not (ARIA 1.2 restricts it to range roles). The correct expression of "N = 3 / 20" is the visible `.timeline-count` (`:85`) promoted to `aria-live="polite"`, or an `aria-valuetext` on the slider — **neither is present**.

### D-9 · MAJOR · `prefers-reduced-motion` covers **1 of 5** animated surfaces, and the one clock that matters is the one that is ungated

The trio ships exactly one reduced-motion block — `ConvergencePlot.vue:405-409`, disabling the 0.1 s tooltip entrance. Ungated:

1. **The rAF loop itself** (`:57-70`), autoplaying from mount (`:324`) for `animDuration` between **2 000 and 12 000 ms** per sweep (`:37-41`), ping-ponging forever (`:65`).
2. The 500 ms curve-transition rAF on every function change (`useCurveTransition.ts:26,36-53`).
3. The golden shimmer's ~0.8 Hz alpha oscillation and pulsing `shadowBlur` (`golden-shimmer.ts:11-13,54-60`).
4. `.icon-swap-*` opacity + `scale(0.7)` on the transport glyph (`ConvergenceTimeline.vue:140-145`).
5. `.legend-entry { transition: background 0.1s }` (`ConvergenceLegend.vue:59`).

WCAG 2.2.2 is *satisfied* — there is a real pause control (`ConvergenceTimeline.vue:61`) — so I do not claim a 2.2.2 failure. What fails is the **user preference**: a declared `prefers-reduced-motion: reduce` produces a page whose centrepiece animates indefinitely from first paint.

This **confirms and localises** census `lane-frontend.md:624` — *"the two ungated animation clocks are `stores/animation.ts` and `equation/ConvergencePlot.vue`'s own rAF (`:67-69`; the file's `reduce` block at `:405` is CSS-only and does not stop `tick`)"*. The prior is exactly right; this challenge adds the four other surfaces and the mount-time autoplay as the actual seat of the cure (`:324` — gate `playing.value` on `window.matchMedia("(prefers-reduced-motion: reduce)")`).

**Falsifier.** Dies if a global reduced-motion reset captured these — it cannot: the rAF is JavaScript, and glass-ui's own reduced-motion blocks in `dist/glass-ui.css` are per-component scoped-id selectors that cannot match consumer-scoped rules. Dies if `:405` did stop the loop — it is a CSS block containing one `animation: none`.

### D-10 · MAJOR · The cursor tooltip has no collision handling in either axis — while the **immediate sibling** clamps one

`ConvergencePlot.vue:346-354` positions the tooltip at raw cursor offsets:

```
left: (mousePos.x - containerLeft + 14) + 'px',
top:  (mousePos.y - containerTop  - 32) + 'px',
```

with `white-space: nowrap` (`:398`) and KaTeX content whose width is unbounded — `f(x) = ${props.expression}` (`:263-264`) renders the user's *entire typed expression*. Near the right edge the box extends past the container; near the top, `- 32` produces a **negative** `top`. Neither is clamped, flipped, or measured.

Both directions are clipped in the shipped layout: `EquationView.vue` sets `.eq-grid { overflow: hidden }` at `≥1024px` (`:344`), so anything escaping the plot card is cut rather than allowed to spill.

**The exemplar is 100 lines away, in the same directory.** `FrequencyGraph.vue:191` — `top: ${Math.max(tooltipPos.y - 56, 4)}px` — a top clamp, plus `-translate-x-1/2` horizontal centring (`:188`). Same problem, same author-team, solved once and not reused.

**Falsifier.** Dies if a clamp existed elsewhere in the binding — the whole `:style` object is the four lines quoted at `:349-352`; dies if the container clipped gracefully — `overflow` is unset on `.convergence-container` (`:382-385`), so the escape reaches the grid's `overflow: hidden` and is truncated mid-glyph. The exact overflow threshold is viewport-dependent — **UNPROVEN-NEEDS-LIVE for SS-13** for the pixel; the absence of any clamp is source-decidable.

### D-11 · MAJOR · The component is a two-root fragment — it silently **discards** the parent's `class`, and warns in dev

`ConvergencePlot.vue`'s template has two element roots: the `<div ref="containerRef">` (`:337-363`) and `<ConvergenceTimeline>` (`:366-375`). Vue 3 auto-inherits fall-through attrs only onto a **single** root; a multi-root fragment drops them and emits the dev warning *"Extraneous non-props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text root nodes."* No `inheritAttrs` declaration exists to acknowledge the choice (`grep -n "inheritAttrs" ConvergencePlot.vue` → empty).

`EquationView.vue:310` passes `class="flex-1"`. **It is dropped.**

The layout survives by accident: `.convergence-container` sets `@apply w-full relative flex-1` on itself (`:383`), so the intended flex behaviour happens for an unrelated reason. That is precisely the failure mode worth flagging — the public styling contract is inert, a future consumer's `class` will vanish, and the dev console carries a permanent warning on the equation route.

There is a design point underneath the mechanics: the component is named `ConvergencePlot` and renders a plot **plus a transport dock as a sibling**, leaking its chrome into the parent's flex column rather than owning a box. Either name it for what it is or wrap it.

**Falsifier.** Dies if one root were the sole non-comment root — refuted, both `:337` and `:366` are elements; dies if `inheritAttrs: false` were declared (which would make the drop deliberate) — refuted by grep; dies if Vue inherited onto fragments — it does not, by documented behaviour. The dev warning's exact text is version-dependent — the **drop** is the claim, and it is structural.

### D-12 · MAJOR · A quantitative plot with **no axis labels and no tick values**

`lib/grid.ts` computes a genuinely careful adaptive step (`niceStep`, `:13-20`) and then draws **lines only** — `drawPlotGrid` (`:23-75`) issues `moveTo`/`lineTo`/`stroke` and never a single `fillText`. There is no `ctx.fillText` anywhere in the component or its libs (`grep -rn "fillText" web/src/components/equation/` → no hits in this trio). So the plot renders:

- an x-axis over `[domA, domB]` with no endpoint values, though the domain is user-set (`EquationView.vue:314`);
- a y-axis with 8 % headroom padding (`:165`) and no scale;
- a hover tooltip reporting amplitude to **four decimal places** (`:267`).

Four significant digits of precision on a hover, and no order of magnitude on the page. The reader cannot tell whether the sum curve overshoots by 0.02 or by 2. The `niceStep` machinery exists precisely to place labels and is used to place none.

**Falsifier.** Dies if the axes were labelled by the parent — refuted, `EquationView.vue:308-315` wraps the component in a bare `.cartoon-card` with no axis chrome; dies if a caption carried the domain — refuted by reading `EquationView.vue:305-316`; dies if the plot were qualitative by intent — refuted by `:267` (a 4-decimal readout) and by `FrequencyGraph.vue:203-208`, which does surface amplitude/phase numerically in the same view.

### D-13 · MAJOR · `.play-btn`'s literal `1.75rem` **destroys** the library's WCAG-2.5.5 touch-floor clamp

`ConvergenceTimeline.vue:106-113` overrides the primitive's geometry with fixed literals:

```
.play-btn { … width: 1.75rem; height: 1.75rem; … }
```

glass-ui's `size="icon"` resolves to `h-(--control-h-md) w-(--control-h-md)` (`dist/button-BNDWhAZb.js`, size map), and `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` (`dist/styles/tokens/offsets-sizing.css:151`), where the coarse-pointer arm lifts `--control-floor: var(--touch-target, 2.75rem)` (`tokens/light-dark.css:20`). The producer documents this exactly: *"the WCAG-2.5.5 44px touch floor survives as a `max(…, --control-floor)` clamp inside the scaled control-size"* (`offsets-sizing.css:130-132`).

A scoped `width: 1.75rem` is **not** a `max()`. It wins on cascade and removes the clamp. Rendered size: **28 px** at the desktop root and **31.5 px** on mobile (root is `1.125rem` below 768 px — `src/style.css:40-49`), against the design system's own **44 px** floor. It clears WCAG 2.2 SC 2.5.8's 24 px minimum and fails 2.5.5 and the library's declared standard — on the *only* interactive element the whole instrument has on a touch device (D-5).

The same block also re-paints the entire glass recipe it asked for — `border`, `background`, `backdrop-filter`, `color` (`:110-113`) on top of `variant="glass"`. Requesting a material and then overwriting it is the pattern the census's glass-tier work exists to retire.

**Falsifier.** Dies if the scoped rule lost the cascade — it will not: Vue's scope attribute gives `.play-btn[data-v-…]` specificity (0,2,0) against the utility's single class, and utilities sit in Tailwind's `utilities` layer beneath unlayered scoped CSS. Dies if `1.75rem` already exceeded the floor — 1.75 < 2.75 by construction. Dies if the button were exempt as "inline" — it is a standalone circular control, not inline text.

---

## §3 — Glass-ui conformance **under the old pin**, and the F.W1 tri-package uplift surface

Installed `4.0.0`; producer `7.0.0`. Census break surface cited: **metric-badge, hover-card/-popover, dock members, `ToastVariant`** (`lane-frontend.md:463-477`, §5 risk table).

**Against that named surface, this trio is CLEAN — and I say so as a negative result, verified by enumeration.** The trio's only glass-ui imports are `ConvergenceTimeline.vue:19` `@mkbabb/glass-ui/button` and `:20` `@mkbabb/glass-ui/slider`. No `metric-badge`, no `hover-card`, no `hover-popover`, no dock member, no `ToastVariant`, no `lucide-vue-next` (the transport glyphs are inlined Font-Awesome path data, `:63-64`). Both subpaths **survive** at 7.0.0 (`glass-ui/src/components/{button,slider}/` present) and the Slider's variant axis is byte-stable: `SliderVariant = "standard" | "spectrum"` (`glass-ui/src/components/slider/types.ts:5`) — the WT's `glass-scrubber` → `standard` migration lands on a name that still exists at the next pin.

**BREAK the census does not name — and it is the largest import in the tree:**

| # | line | 4.0.0 | 7.0.0 | consequence |
|---|---|---|---|---|
| **B-a** | `ConvergenceTimeline.vue:61` | `<Button variant="glass" size="icon">` — `buttonVariants` accepts `variant: … \| "glass" \| "glass-wash" \| "ai"` and `size: … \| "icon" \| "icon-sm"` (`dist/components/ui/button/index.d.ts:3-6`) | **`variant` PROP IS GONE.** `ButtonProps` = `emphasis: "primary"\|"secondary"\|"quiet"\|"text"` · `tone: Tone` · `size: "xs"\|"sm"\|"md"\|"lg"` · `iconOnly: boolean` · `loading: boolean` (`glass-ui/src/components/button/Button.vue:15-31`). `"icon"` is **not** a `ButtonSize`; icon geometry moved to `iconOnly` | **two-token typecheck break per callsite.** Cure here: `<Button emphasis="secondary" icon-only>`. `lane-frontend.md:213` counts **35 `@mkbabb/glass-ui/button` imports** — this is the single largest consumer subpath in fourier, and the census's break table does not carry it. |

**This is a corpus extension, filed as such.** The census's 4→7 budget (`lane-frontend.md:508`: *"3 removed subpaths in live use, 3 removed dock members, a removed type, a peer-package rename (35 sites)"*) should gain a row: **a prop-surface break on `<Button>` across 35 sites**, mechanical but not free, and invisible to a subpath-existence check because `./button` still resolves.

**Also live at this pin:**

- **value.js peer floor.** `ConvergencePlot.vue:5`, `lib/harmonics.ts:5`, `composables/useCurveTransition.ts:8` all import `easeInOutSine` — **3 of the 5 sites** census `lane-frontend.md:480` enumerates. Installed `0.13.0` (`node_modules/@mkbabb/value.js/package.json`); producer 7.0.0 peers `@mkbabb/value.js@^4.0.0` (`glass-ui/package.json` peerDependencies). The symbol exists at 0.13.0 (`dist/easing.d.ts:48`); **whether `easeInOutSine` survives value.js 4.x is UNPROVEN — 4.x is not installed in this tree.** Verify before F.W1 sequencing. *(Contradiction with a fourier-side note, recorded: fourier HEAD `cd26c653`'s own commit message states the peer floor moves `^0.13.0 → ^2.0.0`. The producer's `package.json` says `^4.0.0`. The census is right; the fourier coordination note is stale.)*
- **Dead custom property.** `ConvergenceTimeline.vue:135-137` sets `--slider-scrub-track-height: 20px`. That property **does not exist at 4.0.0** (`grep -rn "slider-scrub-track-height" dist/` → empty). The 4.0.0 geometry axis is `--slider-track-height` / `--slider-thumb-size`, lifted by the `size` prop (`dist/components/ui/slider/index.d.ts` doc block), and `size="md"` — the default — **is** the 20 px track. The declaration is a leftover of the retired `glass-scrubber` recipe: inert, expressing an intent that the default already satisfies. See D-14.

**IMPROVES (the uplift makes this file better):**

- **I-a · `motion` axis.** 7.0.0 `SliderProps` gains `motion?: Motion`, documented as *"default `full`; **PRM > prop > default**"* (`glass-ui/src/components/_shared/axes.ts:39`; `slider/types.ts:24`). A first-class reduced-motion honour on the scrubber — a partial, free cure for D-9's surface (4).
- **I-b · nameless-thumb diagnostics.** 7.0.0's Slider dev-warns when neither `aria-label` nor `aria-labelledby` is present (`glass-ui/src/components/slider/Slider.vue:198-216`) and forwards `aria-labelledby` / `-describedby` / `-errormessage` / `-invalid` explicitly to the thumb (`:281-285`). This trio already passes `aria-label`, so the warning will not fire — but the forwarding surface is what D-8's cure needs.
- **I-c · `Button loading`.** `loading?: boolean` — *"Marks an in-flight command and suppresses activation until it settles"* (`Button.vue:26`). The transport currently has no in-flight state during the parent's `computing` window (`EquationView.vue:239-242` shows a "Recomputing…" strip while the plot keeps animating stale data underneath).
- **I-d · `Slider marks`.** `marks?: readonly number[]` — *"Decorative checkpoints in the numeric domain"* (`slider/types.ts:22`). The scrubber's natural marks are the harmonic entry points, which `harmonicProgress` already computes (`lib/harmonics.ts:59-76`). Free legibility for the timeline's actual structure.

**REGRESSES / DOES NOT IMPROVE:**

- **R-a · D-8's invalid attributes survive.** 7.0.0 still forwards `$attrs` to the roleless reka root and still forwards only the *naming* aria attributes to the thumb (`Slider.vue:281-285` — no `aria-valuenow` / `-valuetext` in the list). `aria-valuenow` / `-valuemin` / `-valuemax` remain misplaced at both pins; the cure is consumer-side (delete them; use `aria-valuetext` or a live region on `.timeline-count`).
- **R-b · Nothing in the uplift touches D-1 through D-5.** The canvas palette, the nameless button, the keyboard clobber, and the mouse-only interaction model are all consumer-owned. Do not schedule them behind F.W1.

---

## §4 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The endpoint-convention triptych is correct, cited, and load-bearing

Three comments (`:111-113`, `:123-127`, `:174-175`) explain why the original curve is drawn on a **closed** grid while the partial sum keeps the backend's **open** one:

> *"X-grid for the partial-sum curve (endpoint=false matches backend convention: the canonical equispaced Fourier sampling drops x = domB since the periodic wrap identifies it with x = domA — see api/routers/equations.py:61)."*

and the code does exactly that: `xGrid` steps `i/nPts` (`:115`, open), while `oxClosed = [...ox, domB]` / `oyClosed = [...oyLerped, oyLerped[0]]` (`:128-129`) appends the wrap sample `y(b) = y(a)`.

**Falsifier applied, and the claim survives.** I read the cited backend: `api/routers/equations.py` contains `np.linspace(domain[0], domain[1], req.n_eval_points, endpoint=False)` — the convention is real. Without the closure the reference curve would render with a visible gap of one sample at the right edge, and a reviewer would file it as an off-by-one; with the comment, the *absence* of a gap is auditable. This is the rare case of a comment that prevents a correct behaviour from being "fixed" into a wrong one. (Its one flaw is a line-number drift — see D-21 — which is exactly the kind of decay this pattern invites and does not invalidate.)

### S-2 · The `BLEND` cursor feather is a real motion-quality decision most implementations miss

`:147-155`:

```
const BLEND = 10;
const wt = j <= c - BLEND ? 1 : j >= c + 1 ? 0 : Math.max(0, Math.min(1, (c - j + 1) / (BLEND + 1)));
val += curves[hi][j] * wt;
```

Each harmonic is ramped into the partial sum over a 10-sample window at its own drawing cursor rather than switched on. **Falsifier applied:** the claim dies if the weight were binary — it is a clamped linear ramp, and the two guard branches are the saturation ends. Without it, every harmonic's arrival would inject a step discontinuity into the sum curve that sweeps across the plot — a visible tear on the one mark the user is watching. The constant is unexplained and the ramp is linear rather than smooth-stepped, so it is not perfect; it is nonetheless a considered answer to a problem the naive implementation does not know it has.

### S-3 · The transition lerps the **axis bounds**, not just the data

`useCurveTransition.ts:69-81` snapshots the previous y-extent alongside the previous samples, and `ConvergencePlot.vue:167-172` interpolates `minY` / `maxY` toward the new extent over the same 500 ms eased curve (`useCurveTransition.ts:26,46`). **Falsifier applied:** dies if only the sample values lerped — refuted at `:170-171`, where the bounds are explicit `lerp` calls with their own snapshot fields. Nearly every hand-rolled plot I have read re-derives its extent instantaneously and lets the whole curve jump-scale under a smooth data transition, which reads as a glitch. Doing the harder half is the mark of someone who watched their own animation.

### S-4 · The reduced-motion block ships with its duplicate-keyframe excision documented and *verified*

`:400-409`:

> *"A.W3.d — `tooltip-in` is canonical in glass-ui's animations.css; the consumer-side shadow keyframe has been excised. Resolves via global cascade."*

**Falsifier applied, and the claim survives at the byte level:** `@keyframes tooltip-in` exists at `glass-ui/dist/styles/animations.css:41`, `animations.css` is on the `@import "@mkbabb/glass-ui/styles"` cascade (`dist/styles/index.css`, cascade block), and `src/style.css:3` issues that import. The excision is real and the resolution path is intact. A consumer that deletes a shadowing keyframe, states why, and leaves the path checkable is doing the exact hygiene the constellation's dead-class carries exist to enforce — even though D-9 shows the block covers the least significant of the file's five motion surfaces.

### S-5 · `animDuration` scales with the harmonic count, and the comment states the pedagogy rather than the arithmetic

`:37-41`:

```
// Few harmonics: slower to appreciate each term; many: faster per-term
return Math.max(2_000, Math.min(12_000, 3_000 + Math.max(0, n - 3) * 200));
```

**Falsifier applied:** dies if the duration were constant (it is not) or if the comment merely restated the clamp (it does not — it names the *tradeoff*, per-term legibility against total wait, which is the only thing a later editor needs to know before touching the constants). The clamp is well-chosen: 2 s floor, 12 s ceiling reached at n ≈ 48. On the prose sub-axis this is the file's best line — it explains a decision instead of narrating code.

---

## §5 — MINOR

- **D-14 · MINOR** — Dead custom property. `--slider-scrub-track-height: 20px` (`ConvergenceTimeline.vue:135-137`) names a token absent from glass-ui 4.0.0 (`grep -rn "slider-scrub-track-height" dist/` → empty); the live geometry axis is the `size` prop, whose `md` default already is the 20 px track (`dist/components/ui/slider/index.d.ts`, sizes block). Inert. *Falsifier:* dies if the token were defined anywhere in the consumer — `grep -rn "slider-scrub-track-height" web/src/` → this one site.
- **D-15 · MINOR** — Raw font family ×3 where a utility exists. `ConvergencePlot.vue:390`, `ConvergenceLegend.vue:88`, `ConvergenceTimeline.vue:97` each hard-code `font-family: "Fira Code", monospace`. glass-ui ships `@utility fira-code { font-family: var(--font-mono); font-feature-settings: "liga","calt"; }` (`dist/styles/typography/utilities.css:69-72`) over `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace` (`tokens/scheme-motion.css:46`). **20 files in the tree use the utility**, including the mount site (`EquationView.vue:232,241,245`) and the immediate sibling (`FrequencyGraph.vue:202`). The literals lose the fallback chain and the ligature settings. *Falsifier:* dies if `.fira-code` were undefined at this pin — refuted above.
- **D-16 · MINOR** — Un-tokenised px type under a responsive root. `13px` (`ConvergencePlot.vue:391`), `13px` (`ConvergenceLegend.vue:90`), `12px` (`ConvergenceTimeline.vue:98`) are absolute against a root that is `1.125rem` below 768 px and `1rem` above (`src/style.css:40-49`) — so the trio's type is the only text on the equation route that does **not** scale down at the desktop breakpoint. The sibling uses the scale step (`FrequencyGraph.vue:187` `text-xs`). *Falsifier:* dies if the app had a single root size — refuted at `style.css:40-49`.
- **D-17 · MINOR** — Wrong z-rung. `.curve-tooltip { z-index: var(--z-controls) }` (`:399`) = **20**, while `--z-tooltip` = **120** exists two lines away in the same token block (`dist/styles/tokens/scheme-motion.css:335-343`). `.convergence-container` is `position: relative` with `z-index: auto`, so it forms **no stacking context** — the tooltip competes globally at rung 20 against every other `--z-controls` consumer, including `EquationView.vue:428` in its own ancestor tree. Ordering is decided by source order, not by intent. *Falsifier:* dies if the container established a context — `:382-385` sets no `z-index`, `transform`, `filter`, `opacity`, or `isolation`.
- **D-18 · MINOR** — Inert class on the canvas. `class="block size-full text-muted-foreground"` (`:340`). A 2D context never reads the element's computed `color`; every stroke in this component is a literal (`:189`, `:207`, `golden-shimmer.ts:50`) and nothing uses `currentColor`. The class is decoration on a decoration. *Falsifier:* dies if any draw call resolved `getComputedStyle(canvas).color` — `grep -rn "getComputedStyle" web/src/components/equation/` → no hit in this trio.
- **D-19 · MINOR** — Three affordance-signal defects in one interaction surface: `.legend-overlay` declares `pointer-events-auto` (`ConvergenceLegend.vue:46`) though nothing above it sets `pointer-events: none` — a no-op; `.legend-entry` declares `cursor-default` (`:58`) on rows that *are* hover-interactive, actively signalling "not interactive"; and the canvas sets **no** `cursor` despite hosting 12 px hit regions (`hit-test.ts:19`) — while the sibling canvas does (`FrequencyGraph.vue:179` `cursor-pointer`). *Falsifier:* dies if an ancestor disabled pointer events — `.convergence-container` (`:383`) applies only `w-full relative flex-1 select-none`.
- **D-20 · MINOR** — The tooltip hand-rolls the popover surface. `background: color-mix(in srgb, var(--popover) 92%, transparent)` + `border: 1.5px solid var(--border)` + `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` (`:394-397`). The literal shadow is theme-blind (a 12 %-black drop shadow is invisible on the dark arm), and the 8 % transparency admits the moving curves beneath it. The sibling composes the same surface from tokens: `bg-popover text-popover-foreground border-[1.5px] border-border shadow-[…]` (`FrequencyGraph.vue:188-190`) — fully opaque. *Falsifier:* dies if `--popover` were unavailable — it is a glass-ui token in the same cascade as `--border`, which this rule already consumes.
- **D-21 · MINOR** — Comment provenance drift, two sites. (a) `:113` cites *"api/routers/equations.py:61"*; the `endpoint=False` call is at **line 59** (`grep -n "endpoint=False" api/routers/equations.py`). (b) `ConvergenceTimeline.vue:8-12` still describes *"the variant's internal `useOptionalDockContext()`"* after the WT migrated off `glass-scrubber` — at 4.0.0 the dock-hold is a **component-level prop** (`keepDockOpen`, default `true`, applying to every variant: `dist/components/ui/slider/Slider.vue.d.ts`), not a variant internal. The conclusion drawn (no-op outside a dock) is still correct; the mechanism named is not. *Falsifier:* dies if `keepDockOpen` were variant-gated — the d.ts declares it on `__VLS_Props` with no variant condition.
- **D-22 · MINOR** — Unmotivated padding asymmetry. `PAD = { top: 14, bottom: 18, left: 12, right: 12 }` (`:53`). Asymmetric padding earns its keep when it reserves space for axis labels — and there are none (D-12). The extra 4 px at the bottom and the 2 px top/side differential correspond to nothing in the render path, while the one direction that genuinely needs a reserve (right, for the ≥100 px legend — D-6) gets the minimum. *Falsifier:* dies if the sum curve's stroke needed the room — its half-width is 2.5–3.5 px plus up to 14 px `shadowBlur` (`:223`), which the 8 % y-headroom (`:165`) already absorbs, and which would argue for *symmetric* growth, not this pattern.
- **D-23 · MINOR** — Two inert declarations on the tooltip. (a) `font-family: "Fira Code", monospace` (`:390`) is overridden for the element's actual content — every child is KaTeX output, and `.katex` sets its own faces (`src/style.css:59-61` sizes it, `katex.min.css` supplies the families); only the fallback path on a KaTeX render failure (`:257`, `catch { return latex; }`) ever sees Fira Code. (b) `animation: tooltip-in …` scales from `0.96` (`glass-ui/dist/styles/animations.css:41-48`) with no `transform-origin`, so a cursor-anchored box grows from its own centre — the anchor point drifts during the 0.1 s entrance. *Falsifier:* (a) dies if KaTeX inherited the family — it sets `font-family` on `.katex` explicitly; (b) dies if an origin were set — `:388-403` declares none.
- **D-24 · MINOR** — Glyph hygiene and proportion on the transport. The two `<svg>`s (`ConvergenceTimeline.vue:63-64`) carry no `aria-hidden="true"` and no `focusable="false"` (the latter matters for legacy IE/Edge tab-order, cheap to add), and they are `class="size-3"` — **12 px inside a 28 px button**, a 43 % fill. glass-ui's own glyph register scales the icon *with* the box (`dist/styles/tokens/offsets-sizing.css:283-285`); at `size="icon"`'s intended 40 px the same glyph would read as a 30 % fill. Either way the play triangle is small for a primary control, and — since it is Font Awesome's `0 0 384 512` path, whose visual centroid sits left of its bounding box — it is box-centred rather than optically centred, so the perceived centre shifts on every play/pause toggle. *Falsifier:* dies if the paths were pre-nudged — `M73 39c…` starts at the left edge of the viewBox; they are not.

## §6 — INFO

- **D-25 · INFO** — `min-height: 200px` (`:385`) is the container floor. Subtracting `PAD.top + PAD.bottom` leaves a **168 px** plot, into which the legend can place up to 102 rows behind a scrollbar (D-6) and across which up to 100 harmonic curves are drawn. The floor and the ceiling of this component's content were set independently.
- **D-26 · INFO** — The loop does not stop when the plot is not visible. `playing` survives a tab switch (the equation route is a tab panel — `src/style.css:82-84` animates `[data-state="active"][role="tabpanel"]`), and `draw()` early-returns at zero size (`:85`) while `tick` keeps scheduling (`:67`). So the clock advances invisibly and the animation resumes at an arbitrary phase rather than from the start — and the work is wasted, not merely hidden. This is the second half of census `lane-frontend.md:558-559`'s *"a second, ungated clock"*.
- **D-27 · INFO** — The staged-reveal pedagogy dissolves at the default N. `harmonicProgress` (`lib/harmonics.ts:67-70`) floors each harmonic's window at **25 %** of the timeline while distributing starts across `1 − sliceW`. At the default `nHarmonics = 20` (`FunctionInput.vue:28`) the starts are 3.9 % apart against 25 %-wide windows — roughly **six harmonics draw simultaneously**, so "watch each term arrive" becomes "watch six terms arrive". The comment at `:56-57` describes the floor accurately; nothing describes what the floor costs above n ≈ 4. Worth a deliberate ruling rather than a silent constant.

---

## §7 — Corpus reconciliation

**Folded, not re-invented:**

- Census **[FE §8] / `lane-frontend.md:624`** (*"the two ungated animation clocks … the file's `reduce` block at `:405` is CSS-only and does not stop `tick`"*) → **confirmed verbatim** and localised at **D-9**, with the four additional ungated surfaces enumerated and `:324` (mount-time `playing = true`) identified as the seat of the cure.
- Census **`lane-frontend.md:558-559`** (Path B — *"own rAF, independent … not gated by `stores/animation.ts` — a second, ungated clock"*; cites `:93`, `:67-69`, `:308`, `:319`) → **confirmed**, all four line references land, and extended at **D-26** with the hidden-panel consequence.
- Census **`lane-frontend.md:382`** (post-4.0.0 tier names are `glass-wash` / `glass-resting` / `glass-floating`) → **confirmed** — and **sharpened at D-7**: the WT's `glass-subtle → glass-wash` migration adopted a live name but the *sub-perceptual* rung (0.30 opacity / 1 px blur) for a floating overlay, where the same view's `.coeff-popover` correctly uses `glass-floating` (0.80).
- Census **`lane-frontend.md:382`** also notes `ConvergenceTimeline.vue:6`'s `glass-track`/`glass-fill`/`glass-thumb` mentions are *prose only* → **confirmed** (they survive in the header comment at `:5`), and **D-21(b)** adds that the same header's `useOptionalDockContext` mechanism claim is now inaccurate.
- Census **`lane-frontend.md:480`** (value.js peer floor, 5 sites incl. `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) → **confirmed, 3 of the 5 are in this trio**, and §3 records that the producer's declared peer is `^4.0.0` while fourier HEAD `cd26c653`'s own commit message says `^2.0.0` — **the census is right, the fourier-side note is stale.**
- Census **§5 risk** (*"uplift lands with no unit-test net; vitest ABSENT"*) → **D-4** and **D-11** are exactly the class a unit test catches and a typecheck-plus-Playwright net does not: a keyboard path silently overwritten by a rAF, and a fall-through attribute silently dropped by a fragment root.
- Intake **R3-7a** (adjudicated TRUE; the 35-callsite / 9-consumer `ui/tooltip` migration budget for F.W3, enumerated over nine named consumer files) → **this trio contributes zero.** `grep -n "Tooltip" ConvergencePlot.vue ConvergenceLegend.vue ConvergenceTimeline.vue` → no hits; the curve tooltip is a hand-rolled `<div v-html>` (`:346-354`). Recorded so F.W3's exhaustiveness sweep marks this trio *clean*, not *unexamined* — **and so the sweep notices that a hand-rolled tooltip exists here that the 35-count does not see** (D-10, D-20, D-23).
- Intake **R5-7 / R6-5** (adjudicated TRUE; *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*, carried to F.W4) → **this trio contains exactly one such loop**: `ConvergenceLegend.vue:29-38`, a native `<div v-for>` over the harmonics. Any instance denominator built on component callsites drops the legend's entire row set — the same blind spot R5-7 found in `PaperSidebar.vue`. Booked here so F.W4's per-component D/L/C audit counts it.

**Where the tree extends a prior — explicitly.** Census `lane-frontend.md:463-508` builds the 4→7 break table from **removed export subpaths and removed members**. `./button` survives, so it does not appear. But `<Button>`'s *prop surface* is replaced wholesale at 7.0.0 — `variant` deleted in favour of `emphasis` + `tone`, `size="icon"` deleted in favour of `iconOnly` (`glass-ui/src/components/button/Button.vue:15-31`, read whole) — across the census's own count of **35 import sites** (`:213`). A subpath-existence check cannot see this. **§3 B-a files it as a new row on the F.W1 break table**, with this trio's single callsite (`ConvergenceTimeline.vue:61`) as the worked example. This is the one place where the corpus's method, not its data, needs widening.

**Where the tree contradicts a prior.** None of the four named priors is contradicted by this trio. The single contradiction found is between the census (`@mkbabb/value.js@^4.0.0`) and a fourier-side coordination note in HEAD's commit message (`^2.0.0`); the producer's `package.json` settles it for the census.

---

*Read-only audit. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` treated as evidence; no product source touched in any repo. The only file written is this one.*
