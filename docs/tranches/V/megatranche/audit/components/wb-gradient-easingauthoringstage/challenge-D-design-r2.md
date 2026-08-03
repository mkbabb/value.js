# CHALLENGE-D (r2) — `EasingAuthoringStage.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)**, the tier this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## 0. Why this file is `-r2` and not `challenge-D-design.md`

The brief named `challenge-D-design.md`. That path was **already occupied** by a completed D-round
(610 lines, findings D-1…D-14, dated to an earlier pass; provenance HEAD `9268f054`). Overwriting
it would have destroyed another seat's evidence, so this round lands beside it under the sibling
directory's established convention (`wb-gradient-easingeditor/challenge-D-design-r2.md`,
`-r3`). **`challenge-D-design.md` is untouched.**

**Convergence, stated up front.** r1 and I independently reached the same two BLOCKERs — the dead
zero-letterbox law and the two-keystroke route kill. I found them with my own instruments before
reading r1 and re-measured both here; I do not claim novelty for them. The material that is new in
r2 is flagged **[r2-NEW]** in the findings table and carries its own reproduction.

---

## 1. Provenance

| Field | Value |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (117 lines) |
| Repo HEAD at audit | `e39da983` (brief named `c654824e`; the subject file is unchanged between them) |
| Sole consumer | `GradientEasingEditor.vue:32, :207-212` — `grep -rn EasingAuthoringStage demo/` returns those 2 hits and nothing else |
| Route | `/#/gradient` only. **`/#/easing` does not exist** — `demo/color-picker/router/index.ts:22-37` enumerates 14 routes + a catch-all; no `easing`, no `about`. |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json`), `dist/easing.js` (19 375 B) read whole |
| Live probes | Chromium/Playwright 1.60.0 against the live dev server `http://localhost:9000`, DPR 2, 9 matrices + 6 interaction transcripts. Scripts + JSON in `./probes/`, frames in `./frames/`. |
| Canon read | `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md`, `OPTICAL-BENCH-COMPOSITIONS.md` |
| Static evidence | `docs/tranches/V/megatranche/audit/visual/REPORT.md` + `shots/safari-{desktop,mobile}-{light,dark}/gradient.png`, `shots/{forced-colors,zoom-200,rtl,reduced-motion,keyboard-focus}-desktop/gradient.png` |

### 1.1 The static visual matrix cannot see this component — that is itself the first datum

`REPORT.md` records `/#/gradient` across four matrices with `blankOrNearBlank 0`, `pageErrors 0`,
`horizontalOverflow 0`. I read all four `gradient.png` frames. **The authoring stage does not appear
in any of them.** It is behind a *second* disclosure (`GradientEasingEditor.vue:204`
`v-show="tuneOpen[row.index]"`, default `{}` → false) nested inside the first (`:144`
`v-show="openInterval === row.index"`). The route capture therefore certifies a surface the
component never reaches.

Every measurement below required driving the live app: navigate `/#/gradient` → click
`button[aria-label="Author a custom curve"]`.

---

## 2. Verdict

**DEFECTIVE.** 3 BLOCKER · 6 MAJOR · 5 MINOR · 1 INFO.

The gestalt reading is simpler than the finding list. `OPTICAL-BENCH-COMPOSITIONS.md:45` — the
binding topology decision for the Easing member — reads, verbatim:

> | **Easing** | P122 `golden`: **centered 19–22rem curve/time stage** 61.8033989%; catalogue/code
> inspector 38.1966011%. | curve; catalogue/specimen; code/action. | Landmark-neutral chassis;
> **no tiny nested Card**. | W27. Close clamp, neutral time, axes and **no local picker**. |

This component is a **tiny nested Card** containing a **local picker**, at **10.4 rem**, behind two
disclosures, on the wrong route. Every clause of the binding row names it. It is not a component
that needs tuning; it is a component the ratified topology deletes.

---

## 3. Visual truth

### 3.1 Desktop, light — `frames/D-01-desktop-light-stage-59pct-letterbox.png`

A 436 × 226 beige slab with a small square graph marooned in the middle of it. The plotted unit box
is **166.7 px wide inside a 410 px canvas element**; ~121 px of empty well on each side. The graph's
bounding rectangle and its 4 × 4 grid are a pale tan that barely separates from the paper. The two
draggable control points sit exactly on the two endpoint dots (linear ⇒ `(0,0,1,1)`), so the only
operable objects on the surface are visually identical to decoration. The "1" axis annotation
collides with the upper handle; the "0" annotation is occluded by the lower one.

Below the well, `PRESET` in Fira Code 14.38 px **uppercase**, then a full-width select reading
**"Pick a curve"** — the placeholder — while `linear` is the live, pressed, named curve 40 px above.

A **full-width horizontal tonal seam** crosses the well at ≈56 % of its height. See D2-06.

### 3.2 Desktop, dark — `frames/D-02-desktop-dark-stage.png`

Warm dark-brown well on a mauve plate; the two are close enough in lightness that the well reads as
a smudge rather than a recessed stage. The curve inks to `oklch(0.876 0.131 205)` — a neon cyan at
**8.31 : 1** against the well, where the light arm's teal `oklch(0.438 0.075 205)` sits at
**5.81 : 1**. The specimen is not perceptually paired across schemes: L 0.44 → 0.88 is a different
weight of mark, not the same mark in a different scheme. `VISUAL-CONSTITUTION §2`: "Dark chrome uses
the restrained neutral pole."

### 3.3 Mobile 390 — `frames/D-03-mobile-light-stage.png`

Card 298 px, canvas 272 px, **drawn ink still 166.7 px**. The plot does not respond to viewport at
all; only the dead paper around it shrinks (59.3 % → 38.7 % → 17.5 % at 1440/390/320). The
composition improves as the viewport gets *worse*, which is the signature of a stage that is not
sized by any law.

### 3.4 Forced colors — `frames/D-04-forced-colors-stage.png`

The curve stays teal. The grid and the plot frame stay tan. The handles lose their rim (
`stroke-background` → Canvas → white on white). **Nothing in the specimen adapts.** The well's
`::before` *is* suppressed (`glass/a11y-fallback.css` sets `.glass-card::before{display:none}` under
`forced-colors: active`), which is how I proved the seam is that layer — see D2-06.

### 3.5 Steps regime — `frames/D-05-steps-regime.png`

Pressing the `steps` specimen flips `data-mode` to `steps`. The chrome swaps a one-row Preset select
for a two-row Steps-slider + Jump-term pair. Measured stage height **311.58 px → 377.2 px**: the
disclosure lurches **65.6 px** on the block axis, unanimated. The slider's filled range is **amber**.

---

## 4. Measured geometry — the full matrix

`probes/p1-geometry-matrix.json` (9 matrices, DPR 2, live).

| matrix | card w | canvas box | drawn ink | dead | `grid-template-columns` | `svg[role='img']` matches |
|---|---:|---:|---:|---:|---|---:|
| desktop light 1440 | 436 | 410 × 200 | **166.67 × 200** | **59.3 %** | `436px` | **0** |
| desktop dark 1440 | 436 | 410 × 200 | 166.67 × 200 | 59.3 % | `436px` | 0 |
| mobile light 390 | 298 | 272 × 200 | 166.67 × 200 | 38.7 % | `298px` | 0 |
| mobile dark 390 | 298 | 272 × 200 | 166.67 × 200 | 38.7 % | `298px` | 0 |
| 320 | 228 | 202 × 200 | 166.67 × 200 | 17.5 % | `228px` | 0 |
| zoom 200 (720 CSS) | 436 | 410 × 200 | 166.67 × 200 | 59.3 % | `436px` | 0 |
| forced-colors | 436 | 410 × 200 | 166.67 × 200 | 59.3 % | `436px` | 0 |
| reduced-motion | 436 | 410 × 200 | 166.67 × 200 | 59.3 % | `436px` | 0 |
| RTL | 436 | 410 × 200 | 166.67 × 200 | 59.3 % | `436px` | 0 |

Document horizontal overflow is `0` in every matrix. `--vb-ratio` reads `1.2` in every matrix and in
every interaction state I drove — bezier, arrow-authored, preset-picked, strip-selected, and steps.

The producer's own inline geometry survives untouched everywhere:

```
style="aspect-ratio: 1 / 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto;"
computed: inline-size 410px · block-size 200px · aspect-ratio 1/1 · margin-inline 0px/0px
```

`38cqi` resolves against `DIV.pane-wrapper` (`container-type: inline-size`, 512 px at desktop /
358 px mobile / 288 px at 320), giving 194.6 / 136 / 109 px → all clamped to the 200 px floor. The
canvas height is therefore a constant 200 px at every viewport, decided by a container two levels
above the component, and the component's own sizing law never runs.

---

## 5. Findings

| ID | Sev | Finding | New in r2? |
|---|---|---|---|
| D2-01 | BLOCKER | Law 3 binds to zero elements; 59.3 % of the canvas is dead letterbox | converges with r1 D-1 |
| D2-02 | BLOCKER | The stage's own controls destroy the route — **6 distinct entry points**, incl. its own dropdown | keyboard arm converges with r1 D-2; **dropdown arm + entry-point census [r2-NEW]** |
| D2-03 | BLOCKER | The ratified topology forbids this object by name: "no tiny nested Card", "no local picker" | **[r2-NEW]** (r1 D-4 cites the rem band only) |
| D2-04 | MAJOR | The plot's reference frame renders at **1.56 : 1 / 1.66 : 1** — the graph has no readable axes | **[r2-NEW]** |
| D2-05 | MAJOR | The temporal rail carries the wrong accent — amber slider vs teal specimen | **[r2-NEW]** |
| D2-06 | MAJOR | Law 2 is a four-property override that does not flatten the material; the glass pseudo-layer, its hover/active response and a full-width seam all survive, and the producer's focus elevation is suppressed | **[r2-NEW]** (r1 D-13 covers forced-colors only) |
| D2-07 | MAJOR | Two selection surfaces, 40 px apart, with **unequal catalogues**, that disagree — measured t0/t1/t2 transcript | sharpens r1 D-3 with **[r2-NEW]** catalogue delta + transcript |
| D2-08 | MAJOR | The regime flip lurches the layout **65.6 px** on the block axis, unanimated — the exact lurch Law 3's transition claims to prevent, on the axis it never addressed | **[r2-NEW]** (r1 D-8 has the dead/layout-forcing half) |
| D2-09 | MAJOR | The protagonist measures 10.4 rem where canon requires a centered 19–22 rem stage, and is 0 % of the stage at rest | converges with r1 D-4 |
| D2-10 | MINOR | The specimen ink is contrast-certified against the wrong surface (`resting`, not `well`) | **[r2-NEW]** |
| D2-11 | MINOR | The well hand-re-mints the `--well-bg` recipe that `.console-well` exists to prevent; via `:deep()` + a `data-testid` hook + 4 `!important` | partially converges with r1 D-7; **`.console-well` cite [r2-NEW]** |
| D2-12 | MINOR | 13 px chrome↔plot misalignment; the one support label is Fira Code 14.38 px uppercase where §4 assigns `text-small` PJS non-bold | **[r2-NEW]** |
| D2-13 | MINOR | Axis annotations render 5.14 × 11 px and collide with the handles | converges with r1 D-9 |
| D2-14 | MINOR | The well is a Card with no identity line and no visible name | **[r2-NEW]** |
| D2-15 | INFO | The failure state this component reaches paints only "Try again" — statement and machine truth are laid out but never rendered | **[r2-NEW]**, owner = `ErrorBoundary` seat |

---

### D2-01 · BLOCKER · Law 3 binds to zero elements; the "zero-letterbox" stage is 59.3 % letterbox

The file's header calls Law 3 "the canvas sizes by ONE law: inline-size driven, aspect ≡ the LIVE
viewBox ratio … The drawn plot IS the element box."

The mechanism targets `svg[role='img']` in two places:

- `EasingAuthoringStage.vue:48-50` — `rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")`
- `EasingAuthoringStage.vue:104` — `.easing-authoring :deep(svg[role="img"])`

glass-ui 7.0.0 renders that node as **`role="group"`**:

```
$ cd node_modules/@mkbabb/glass-ui/dist && grep -o 'role: "[a-z]*"' easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
```

Live census, every matrix (`probes/p1-geometry-matrix.json`):

```json
"census": { "svg[role='img']": 0, "svg[role='group']": 1, ".glass-card": 1, "picker": 1 }
```

Consequences, all measured, none inferred:

1. `syncVbRatio()` returns at its guard on every call. `vbRatio` never leaves `ref(1.2)`
   (`:45`). `--vb-ratio` reads `1.2` in all 9 matrices and in bezier, steps, arrow-authored,
   preset-picked and strip-selected states.
2. `onMounted(syncVbRatio)` (`:62`), the `watch(() => value.css, …)` (`:63-67`) and both
   `requestAnimationFrame` schedulers (`:58`, `:65`) do work that cannot have an effect.
3. The whole `:deep(svg[role="img"])` block (`:104-115`) — the `min(100%, 19rem)` clamp, the
   `block-size: auto !important`, the `aspect-ratio: calc(1 / var(--vb-ratio)) !important`, the
   `margin-inline: 0 !important` and the aspect-ratio transition — is dead CSS.
4. The producer's inline `aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px)` therefore
   governs. Inline size and block size are both specified, so `aspect-ratio` is ignored and the box
   becomes 410 × 200. `preserveAspectRatio="xMidYMid meet"` then letterboxes a 1 : 1.2 viewBox into
   a 2.05 : 1 box.

```
viewBox 0 -0.1 1 1.2  →  scale = min(410/1, 200/1.2) = 166.67
element box 410 × 200 · drawn ink 166.67 × 200 · dead 48 667 px² = 59.3 %
```

**Reproduction:** `node probes/probe1.mjs ./out` with the dev server up.

**Cure.** Not a selector repair. A consumer must not re-derive a producer's own viewBox from the
DOM at all — that is edict-3 contrivance and edict-5 per-instance override in one. Delete the
`--vb-ratio` apparatus and the `:deep()` block entirely; the producer owns the letterbox and must
either publish the ratio (a model field or a `--easing-vb-ratio` custom property) or size the canvas
correctly itself. The design-level cure is D2-03.

---

### D2-02 · BLOCKER · The instrument's own controls destroy the route — six entry points

Three independent arms, all reproduced live:

**Arm A — the stage's own keyboard, 2 keystrokes** (`probes/p3-overshoot-keyboard-crash.json`):

```
focus '.easing-authoring [role="slider"]' (control point 2)
Shift+ArrowUp ×1 → literal "cubic-bezier(0, 0, 1, 1.1)"   · stage alive
Shift+ArrowUp ×2 → { "alive": false }                     · route gone
```

**Arm B — the stage's own Preset dropdown** (`probes/probe9` transcript) — **[r2-NEW]**:

```
click [aria-label="Easing preset"] → option "ease-out-back"
→ { "stageAlive": false,
    "boundary": "This panel hit an unexpected error.
                 Gradient color mix failed: color_progress_out_of_range
                 Try again" }
```

**Arm C — the specimen strip** (`probes/probe2` transcript): clicking `[data-specimen="ease-out-back"]`
produces the same boundary.

Machine truth, captured through the boundary (`probes/p4-crash-forensics.json`):

```
"boundaryText": "This panel hit an unexpected error.\n\nGradient color mix failed: color_progress_out_of_range\n\nTry again"
"remainingRouteNodes": { "easingHeads": 0, "gradientRail": 0, "main": 1 }
```

Frame: `frames/D-07-route-crash-after-two-keystrokes.png`.

**This is a design defect, not only a bug.** The producer's own screen-reader instruction, rendered
into this stage verbatim, is:

> "Left and Right change x from 0 to 1. **Up and Down change y from −0.6 to 1.6.** Hold Shift for
> larger steps."

The stage therefore *advertises* a y-domain of `[−0.6, 1.6]` — the correct domain for a CSS easing
curve — while the consumer that owns the value can only survive `[0, 1]`. Nobody reconciled the two.
The overshoot region is offered through **six** doors: 3 strip tiles (`ease-in-back`,
`ease-out-back`, `ease-in-out-back`), 3 dropdown options (same names — the dropdown lists 30 presets
including all three), plus unbounded pointer drag and unbounded arrow authoring.

**Cure.** The gradient interval domain is `[0,1]`; either the interval model clamps `fn(t)` at the
mix boundary and the stage renders the clamp visibly (a shaded legal band on the plot, the CSS
`overshoot` semantics made visible), or the stage's authoring domain is genuinely restricted and the
back family is removed from both catalogues. Silently offering an authoring range the consumer
cannot render is the defect; a `try/catch` that swallows it would be worse.

---

### D2-03 · BLOCKER · The ratified topology forbids this object by name — **[r2-NEW]**

`OPTICAL-BENCH-COMPOSITIONS.md` is declared binding by `VISUAL-CONSTITUTION.md:56`
("`OPTICAL-BENCH-COMPOSITIONS.md` is the binding topology decision"). Its Easing row (`:45`):

> Landmark-neutral chassis; **no tiny nested Card**. | W27. Close clamp, neutral time, axes and
> **no local picker**.

and `:31`:

> Easing sits adjacent to Gradient in navigation but **owns a separate route/chassis**.

`VISUAL-CONSTITUTION.md:50` gives Easing its own member row (protagonist "neutral curve/time
stage"), `:58` puts `/easing` in the member-route inventory, and `:210`:

> The curve is a **centered, container-clamped 19–22rem stage** … Catalogue and specimen strips
> support the curve **rather than reducing it to a tiny nested widget.**

Against that, the shipped design is:

| Canon | Shipped | Evidence |
|---|---|---|
| own route `/easing` | does not exist | `demo/color-picker/router/index.ts:22-37` |
| curve = 61.8 % protagonist | 0 % at rest (two disclosures deep) | `GradientEasingEditor.vue:144, :204` |
| centered 19–22 rem stage | 166.7 px = **10.4 rem**, at every viewport | §4 table |
| no tiny nested Card | `.glass-card` 436 × 226 inside the gradient plate | live census `.glass-card: 1` |
| no local picker | `<EasingPicker>` seated locally | `EasingAuthoringStage.vue:76-82` |
| catalogue *supports* the curve | catalogue is always-visible; curve is hidden behind a toggle | `GradientEasingEditor.vue:161-165` vs `:203-213` |

`PROPORTION-AUDIT.md:53` PR-09 books the same row: "Gradient/Easing protagonist subordinated →
**ENLARGE**. One 19–22rem protagonist; support subordinate." It is unmet by 45 % of the band floor,
and it is unmet in the inverted direction — the support (strip) is primary and the protagonist
(curve) is disclosed.

**Cure — architectural transposition, not a patch.** Build the `/easing` member the canon already
ratified: the producer's `<EasingPicker>` at full `golden` scale as the route protagonist, the
specimen catalogue as its 38.2 % inspector, no consumer geometry surgery, no nested Card. The
gradient interval row keeps its specimen label, its live ramp and its one literal, and hands
authoring to that route with the interval as context. `EasingAuthoringStage.vue` then has no reason
to exist: its `<script>` body is dead already (D2-01) and its `<style>` block is three overrides
that all become unnecessary once the picker is seated at the size it was designed for.

---

### D2-04 · MAJOR · The plot's reference frame renders at 1.56 : 1 — the graph has no readable axes — **[r2-NEW]**

Measured against the actual well the marks are drawn on (`probes/p6-contrast-steps.json`):

| mark | light | dark | WCAG 1.4.11 floor |
|---|---:|---:|---|
| plot bounding rect (`stroke-border`) | **1.56 : 1** | **1.66 : 1** | 3 : 1 |
| grid lines (`stroke-border/40`) | **1.56 : 1** | **1.65 : 1** | 3 : 1 |
| diagonal reference (`stroke-muted-foreground/30`) | 5.06 : 1 | 5.97 : 1 | 3 : 1 |
| curve (`--motion-accent`) | 5.81 : 1 | 8.31 : 1 | 3 : 1 |

A curve editor is a *graph*: the unit box and the quartile grid are what make a bezier readable —
they are the only thing that tells you where 0.5 is. At 1.56 : 1 they are decoration. Look at
`frames/D-01`: the tan frame all but dissolves into the paper.

This is doubly damning because **the seat already knows the rule and applied it 60 lines away**.
`EasingSpecimenStrip.vue:182-187`:

> Resting portrait ink (P8-R2): 45 % floated the sparkline under the WCAG 1.4.11 3 : 1 graphics
> floor (~2.6 : 1, both schemes) … 65 % clears 3 : 1 in both schemes.

The 22 px sparkline portraits were cured to 3 : 1. The 167 px authoring plot — the larger, primary,
*reading* surface — was left at 1.56 : 1.

**Cure.** One graphics-ink rung on the well tier, shared by the strip portraits and the authoring
plot, floor-clamped against `--well-bg` (not `resting` — see D2-10). Producer-side: glass-ui's
`stroke-border` / `stroke-border/40` are chrome tokens being used as data tokens.

---

### D2-05 · MAJOR · The temporal rail carries the wrong accent — **[r2-NEW]**

`VISUAL-CONSTITUTION.md:7`:

> **Easing uses a neutral temporal rail carrying the selected specimen color**; Mix derives color
> only from its operands.

In steps mode the Steps-(n) slider *is* the temporal rail. Measured
(`probes/p7-alignment-accents.json`):

```
--motion-accent (the specimen ink)              oklch(43.810195780825% 0.074812296191 205deg)   ← teal
SPAN.slider-range.glass-liquid-fill  background  oklab(0.88 0.0258819 0.0965926 / 0.88)          ← amber
```

Frame `frames/D-05-steps-regime.png` shows an amber fill 40 px under a teal staircase inside one
436 px instrument. The specimen ink door exists and the seat already uses it — `GradientEasingEditor.vue:115`
writes `--motion-accent` onto the row and glass-ui's picker root reads it into
`--easing-curve-accent` — but it stops at the curve and never reaches the rail. Two unrelated
accents in one instrument also collides with `PROPORTION-AUDIT.md:50` PR-06 ("duplicated selected
fills → REMOVE. One action/selection owner").

**Cure.** Thread the specimen ink through the producer's slider accent at the same root that already
carries `--motion-accent`; the rail is neutral by default and takes the specimen colour when seated
in an easing instrument. Root-level, one token, no per-instance override.

---

### D2-06 · MAJOR · Law 2 does not flatten the material — **[r2-NEW]**

Law 2 declares "Wells, not cards — the hardcoded `.glass-card` internals become **flat opaque
tone-steps** of the plate: zero drop shadow, zero backdrop-filter". It is implemented as four
property overrides (`:93-99`): `background`, `border`, `box-shadow`, `backdrop-filter`.

glass-ui's `.glass-card` is not four properties. `dist/styles/glass/material.css` gives it a
`::before` layer that the seat never touches:

```
.glass-card::before { content:""; position:absolute; inset:0; z-index:1;
  background: conic-gradient(...) , radial-gradient(...);
  box-shadow: inset 0 0 0 var(--glass-specular-hairline-width,0.75px) ...;
  opacity: max(var(--specular-intensity,0), var(--glass-specular-rest-hairline,0.07));
  mix-blend-mode: plus-lighter; }
.glass-card:hover::before  { --specular-intensity: var(--glass-specular-intensity-hover, 0.1); }
.glass-card:active::before { --specular-intensity: var(--glass-specular-intensity-active, 0.16); }
```

Measured live (`probes/probe2` transcript):

```
rest   → beforeOpacity 0.07 · mixBlendMode plus-lighter · boxShadow color(srgb .948 .929 .892/.7) 0 0 0 0.75px inset
hover  → beforeOpacity 0.10        ← the well brightens under the pointer
```

So a **non-interactive specimen well has an interactive glass response**: a 43 % specular lift on
hover and 129 % on press, over the stage the constitution says must be "opaque/quiet neutral"
(`§2`), where "Glass earns its blur by revealing live content; otherwise it is a neutral well"
(`§19`).

**The seam.** A full-width horizontal tonal step crosses the well at ≈56 % of its height in light
and dark, and is **absent under forced-colors** (where `--glass-level: 0` and
`.glass-card::before{display:none}`). I isolated it: forcing `background:#ff0000 !important` on the
card and `visibility:hidden` on the SVG leaves the seam plainly visible over flat red —
`frames/D-06-well-seam-over-red-svg-hidden.png`. It is therefore painted **above** the well's own
background by the producer's glass layer, i.e. by exactly the material Law 2 believes it turned off.
It tracks the card, not the viewport (card `y=746.3` and `y=564.25` in two runs, seam at the same
card-relative offset both times).

**And Law 2 breaks the producer's focus design.** `dist/styles/glass/surfaces.css`:

```
.glass-card:has(:focus-visible) { --card-focus-shadow: var(--shadow-md);
                                  --card-focus-border: var(--glass-border-floating); }
```

The seat's `box-shadow: none` / `border: 1px solid var(--card-edge)` are **unlayered** scoped styles;
the producer's are inside `@layer components`. Unlayered wins over layered regardless of
specificity, so when either `role="slider"` handle takes focus — the only pointer-free way to author
a curve — the card-level focus response the producer designed is silently suppressed.

**Cure.** Stop hand-flattening a glass rung from the consumer. glass-ui needs a real *well* rung
(`variant="well"` / `.glass-well`, already booked as producer packet P3 per
`demo/styles/foundation.css:322-324`) that is opaque, specular-free and focus-correct by
construction. `foundation.css:350 .console-well` exists in-house for precisely this and this seat
ignored it (D2-11).

---

### D2-07 · MAJOR · Two selection surfaces, unequal catalogues, measured disagreement — **[r2-NEW] transcript**

`probes/p8-preset-desync.json`, one continuous session:

| t | action | row literal | pressed strip tile | stage's Preset trigger |
|---|---|---|---|---|
| t0 | initial | `cubic-bezier(0, 0, 1, 1)` | `linear` | **"Pick a curve"** (placeholder) |
| t1 | pick `ease-in-out-quad` **in the stage** | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | `ease-in-out-quad` | `ease-in-out-quad` |
| t2 | press `ease-out-sine` **in the strip** | `cubic-bezier(0.39, 0.575, 0.565, 1)` | `ease-out-sine` | **"Pick a curve"** (reverts) |

The stage is a *partially* controlled component: its canvas follows the model, its labelled control
does not. At rest and after every strip selection, the one named control inside the authoring
instrument reads empty while a named curve is live. `VISUAL-CONSTITUTION §4.1`: "Selected … states
are never colour-only. Role, accessible name, **state/value** … are explicit."

The two catalogues are also **not the same set**:

```
strip tiles  (27): linear ease ease-in ease-out ease-in-out · sine×3 · quad×3 · smooth-step-3
                   cubic×3 · expo×3 · circ×3 · back×3 · steps step-start step-end
preset select(30): the 24 bezier presets above  +  quart×3  +  quint×3   (no steps family)
```

Six curves are reachable only from the dropdown; three only from the strip. Two overlapping,
unequal, disagreeing selection surfaces for one quantity, 40 px apart, is `PROPORTION-AUDIT.md:50`
PR-06 ("Three adjacent action species or duplicated selected fills → **REMOVE**. One
action/selection owner") stated as a picture.

**Cure.** One catalogue, one owner. Under D2-03's transposition the route's catalogue inspector is
the single selection surface and the producer's Preset select is dropped (`:readout="false"` already
establishes the precedent of removing a producer control the seat owns elsewhere).

---

### D2-08 · MAJOR · The regime flip lurches 65.6 px, unanimated — on the axis the transition ignores — **[r2-NEW]**

`EasingAuthoringStage.vue:108-114` justifies its transition:

> The liquid morph (T-48 bar): a regime flip (linear → back → steps) re-shapes the live viewBox —
> the canvas EASES to its new ratio instead of **lurching the layout below**.

Measured across the actual flip (`probes/p6-contrast-steps.json`):

| | bezier | steps | Δ |
|---|---:|---:|---:|
| canvas box | 410 × 200 | 410 × 200 | **0** |
| drawn ink | 166.7 × 200 | 183.3 × 200 | +16.6 px, instantaneous |
| **stage height** | **311.58 px** | **377.2 px** | **+65.6 px, unanimated** |

The canvas box does not move at all, so the property the transition targets never changes. The thing
that *does* lurch is the stage's block size — the chrome column swapping one control row for two —
and nothing eases it. The written animation is dead (D2-01), aimed at a quantity that is constant,
and aimed away from the quantity that jumps.

Independently: `transition: aspect-ratio` is a transition on a **layout-driving** property inside a
container-query container. Were the selector ever repaired, every frame would reflow the pane and
re-resolve `38cqi`. The global PRM guard (`demo/styles/animations.css:184-192`,
`transition-duration: 0.01ms !important` on `*, *::before, *::after`) would neutralise it, so the
reduced-motion claim in the comment is true — of a rule that never runs.

**Cure.** Delete the aspect-ratio transition with the rest of Law 3. If the disclosure's height
change is worth easing, ease it at the disclosure (`grid-template-rows` / `interpolate-size`) with a
house duration token, not at the canvas.

---

### D2-09 · MAJOR · 10.4 rem protagonist, 0 % of the stage at rest

Covered by D2-03's table; recorded separately because it is the row `PROPORTION-AUDIT` PR-09 owns.
Rendered plot 166.7 px = **10.4 rem** against a required **19–22 rem**; 45 % below the floor, and
invariant across 1440 / 720 / 390 / 320 and 200 % zoom.

---

### D2-10 · MINOR · The ink is certified against the wrong surface — **[r2-NEW]**

`useSpecimenRows.ts:39` mints the specimen ink with `useSafeAccentFn("resting")`. The surface the
mark is actually drawn on is the well. `useContrastSafeColor.ts:49-53` shows both tokens exist and
are distinct:

```ts
const TIER_BG_TOKEN: Partial<Record<InkSurface, string>> = {
    resting: "--glass-bg-resting",
    floating: "--glass-bg-floating",
    well: "--well-bg",
};
```

Measured delta (`probes/p6-contrast-steps.json`, light): the ink clears **6.92 : 1** against the
`resting` token it was certified on, and **5.81 : 1** against the well it is painted on — the
certification is running against a surface **1.19×** more favourable than reality. Both clear 3 : 1
today, so this is latent, not live: a mid-lightness interval midpoint can pass the guard and land
under the floor on the well. The guard's whole thesis (`useContrastSafeColor.ts:23-34` — "the
referent is … the material ladder's per-rung composited lightness") is defeated by passing the wrong
rung.

**Cure.** `useSafeAccentFn("well")` for marks drawn inside the well; or, better, one specimen-ink
composable that takes the surface from the seat rather than the caller's memory.

---

### D2-11 · MINOR · The well re-mints a recipe the house minted to stop exactly that — **[r2-NEW] cite**

`demo/styles/foundation.css:340-354`:

> The rung-2 WELL as a seated sub-card CLASS — ONE home for the console species … **so no consumer
> ever re-mints the recipe.** Opaque tone-step of the plate (`--well-bg`), the ONE hairline
> (`--card-edge`), the panel radius rung; NO backdrop-blur … NO cartoon shadow.
> ```css
> .console-well { background: var(--well-bg); border: 1px solid var(--card-edge);
>                 border-radius: var(--radius-panel); }
> ```

`EasingAuthoringStage.vue:93-99` re-mints the same three declarations by hand, through `:deep()`,
onto a producer node, keyed on a **`data-testid` hook** (`:88`) and defended with four
`!important`s (`:105-107`). That is edict 4 (variants belong in glass-ui), edict 5 (style at the
root, never per-instance) and edict 3 (KISS) in one 27-line block, and the file itself concedes it
is temporary ("the overrides retire at the adopt", `:12`) — a booked debt that is now shipped
behaviour.

---

### D2-12 · MINOR · 13 px chrome↔plot misalignment; the one support label is out of type jurisdiction — **[r2-NEW]**

`probes/p7-alignment-accents.json`, desktop 1440:

```
card   x 237.0 → 673.0
canvas x 250.0 → 660.0        ← the plot's content edges
chrome x 237.0 → 673.0        ← the label + select + slider
label  "Preset"  Fira Code / 14.384px / uppercase
```

The support column runs **13 px wider on each side** than the object it supports, so the label's
stem and the plot's left edge never share a line. `PROPORTION-AUDIT.md:68` card law 3 puts
header→headline on the title gap and §5.8 requires "real rendered relation wins over token intent".

`VISUAL-CONSTITUTION.md:75` assigns "control or label, including dropdown options → `text-small`,
Plus Jakarta Sans, non-bold". The rendered label is Fira Code 14.38 px uppercase — the mono/value
jurisdiction — applied to a control label. Producer-authored, consumer-adopted; the seat overrides
three other producer properties on this node and not this one.

---

### D2-13 · MINOR · Axis annotations render 5.14 × 11 px and collide with the handles

`probes/p6-contrast-steps.json`: the `"0"` glyph measures **5.14 × 11 CSS px** (font-size
`0.05` viewBox units × scale 166.67 ≈ 8.3 px), constant at every viewport because the ink scale is
constant. In `frames/D-01` the `"1"` sits under the upper control point and the `"0"` is occluded by
the lower one — the two annotations that establish the plot's domain are placed exactly where the
two operable objects rest at the default value.

---

### D2-14 · MINOR · A Card with no identity line and no visible name — **[r2-NEW]**

`PROPORTION-AUDIT.md:67` card law 2: "A card has **one protagonist, one identity line**, and at most
one persistent action/status region."

The disclosed region (`GradientEasingEditor.vue:203-213`) contains only the stage. The stage renders
only the well and the chrome column. There is no heading, no eyebrow, no visible name — the `label`
prop is consumed solely as the SVG's `aria-label` (`:79` → `aria-label="Easing curve 1 → 2"`). A
sighted user who presses the sliders icon gets an unlabelled slab appearing below an unlabelled rail.
The accessible name exists; the visible identity line does not.

---

### D2-15 · INFO · The failure state this component reaches paints only "Try again" — **[r2-NEW]**

Owner: the `ErrorBoundary` seat. Recorded here because this component reaches it in two keystrokes
(D2-02) and because a design audit must say what the user actually sees.

`ErrorBoundary.vue:18-33` renders an alert glyph, a Fraunces statement and a Fira machine-truth
detail above the recovery button. Live, after the crash (`probes/p4-crash-forensics.json`):

```json
"boundaryText": "This panel hit an unexpected error.\n\nGradient color mix failed: color_progress_out_of_range\n\nTry again",
"statement": { "color": "rgb(28, 25, 23)", "opacity": "1", "visibility": "visible",
               "rect": { "x": 498, "y": 437, "w": 445, "h": 36 } },
"topEl": "P.font-display text-heading text-foreground"   ← the statement is the topmost element at its own centre
```

Every computed signal says it should paint. It does not. `frames/D-07-route-crash-after-two-keystrokes.png`
and a 520 × 200 viewport clip taken directly over the statement's rect both show bare ambient field;
only the "Try again" pill renders. The user is left with a naked button on an empty gradient and no
statement of what failed — the opposite of the boundary's own stated contract ("NEVER a silent
white-screen dead plate").

**Status: observation CONFIRMED (pixel evidence, reproduced 3×); mechanism UNRESOLVED.** Ruled out:
`opacity`, `visibility`, `-webkit-text-fill-color`, `background-clip`, `clip-path`, `transform`,
`filter`, `mix-blend-mode`, ancestor opacity/filter/blend (all probed, all inert), an overlaying
body child (`elementsFromPoint` puts the `<p>` on top; the one absolutely-positioned body child
computes to a zero-area box). Handed to the `ErrorBoundary` seat with the transcript.

---

## 6. State coverage

Enumerated exhaustively; every row driven live unless marked.

| State | Handled? | Evidence |
|---|---|---|
| default / populated | broken | 59.3 % letterbox (D2-01) |
| **empty** (no interval) | **unhandled** | `GradientEasingEditor.vue:208` `v-if="intervals[row.index]"` — the stage vanishes leaving a disclosed region with `aria-expanded="true"` and no content, no placeholder. *Not directly reachable at ≥2 stops — labelled **hypothesis**.* |
| **loading** | **absent** | no busy/skeleton path exists anywhere in the file |
| **disabled** | **absent** | no `disabled` prop, no `aria-disabled`, no disabled register |
| hovered (well) | wrong | specular lifts 0.07→0.10 on a non-interactive stage (D2-06) |
| hovered (handle) | producer | `cursor: move` only |
| focused (handle) | partial | handle gets `focus-visible:stroke-(--easing-curve-accent)`; the card-level focus elevation is suppressed by the seat (D2-06) |
| pressed / active | wrong | specular 0.16 on the well |
| dragging | **absent** | no drag register on the handle, the curve, or the well; nothing changes but the point position |
| selected | **broken** | Preset trigger reads placeholder while a named curve is live; reverts after every strip selection (D2-07) |
| **error / invalid** | **absent → catastrophic** | no invalid state; an out-of-range author destroys the route (D2-02) and lands on a boundary that paints only a button (D2-15) |
| overflowing / truncated | n/a | `docOverflowX 0` in all 9 matrices |
| RTL | **handled** | stage mirrors (`x 237 → 767`); the plot keeps physical axes, correct per `VISUAL-CONSTITUTION §6.1`. Note this is accidental: the seat's `margin-inline: 0` (a direction-aware left-align) is dead, and the producer's `margin-inline: auto` is direction-neutral. |
| reduced motion | vacuously ok | global PRM guard covers it; the only authored transition never runs |
| **forced colors** | **unhandled** | curve, grid and frame all keep custom colour; handles lose their rim; zero forced-colors delta (`frames/D-04`) — against `VISUAL-CONSTITUTION §4.1` |
| 200 % zoom | unchanged | 436 px card, 166.7 px ink, dead 59.3 % — no reflow benefit |
| mobile 390 / 320 | degrades *upward* | dead paper 38.7 % / 17.5 %; the plot itself never changes size |
| multi-instance | scales linearly | `pickersInDoc: 1` at the default 2-stop gradient; `GradientEasingEditor.vue:204` keeps one live `<EasingPicker>` (incl. a 30-option select) per interval, all mounted, `v-show`-hidden |

---

## 7. Seat-law scorecard

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · no god modules | **PASS** | 117 lines, one job |
| 2 · no legacy / dual paths | **PASS with a caveat** | no shims; but `:45`'s `ref(1.2)` is a permanent fallback for a sync that never runs, and `:11-12` books an override retirement that has not happened |
| 3 · KISS, no contrivance | **FAIL** | 25 lines of script + a `:style` binding + 2 rAFs to re-derive a number the producer owns, against a selector that matches nothing (D2-01) |
| 4 · glass-ui is the design system | **FAIL** | the well recipe, the column collapse and the canvas sizing are all authored in the consumer; the producer needs a `well` rung and a published viewBox ratio (D2-06, D2-11) |
| 5 · root-level styling | **FAIL** | 3 `:deep()` blocks, 4 `!important`s, keyed on `[data-testid="easing-picker"]` — a test hook used as a style hook (`:88`) |
| 6 · animations never deleted | **PASS** | the only motion is authored here and tokenized (`--duration-normal`, `--ease-standard`); it is dead, but present |
| 7 · idiomatic Vue 3.5 | **PASS** | `useTemplateRef` (`:44`), reactive props destructure (`:32`), `watch` with `flush: "post"` |
| 8 · `verbatimModuleSyntax` | **PASS** | `:30` `import type { EasingPickerValue }`; `:28-29` runtime-only |

---

## 8. The gestalt cure

Ordered by what subsumes what. 1 makes 2–4 unnecessary.

1. **Build `/easing` and delete this seat.** The ratified topology (`OPTICAL-BENCH-COMPOSITIONS.md:45`,
   `VISUAL-CONSTITUTION.md:50,58,210`) already specifies it: golden split, centered 19–22 rem
   curve/time stage as protagonist, catalogue/specimen as inspector, no nested Card, no local
   picker. The gradient interval row keeps its label, its live ramp and its one literal and links
   into that route with the interval as context. `EasingAuthoringStage.vue` disappears: its script
   is already inert, and its three seat laws exist only because a 19-rem instrument was crammed into
   a 436 px slot. (D2-03, D2-01, D2-09, D2-07, D2-11)
2. **Reconcile the authoring domain with the consumer domain** before any of that ships. Either the
   interval model clamps `fn(t)` into `[0,1]` at the mix boundary and the plot renders the legal
   band visibly, or the back family leaves both catalogues. Six doors currently lead to a route
   kill. (D2-02)
3. **Producer asks, in one packet to glass-ui:** a real opaque `well` rung with no specular layer and
   a correct focus response; the live viewBox ratio published as data (model field or custom
   property) so no consumer scrapes the DOM; a slider accent that inherits the seated instrument's
   specimen ink; a graphics-ink rung for plot frame/grid that clears 3 : 1 on the well tier in both
   schemes and under forced colors. (D2-04, D2-05, D2-06)
4. **In-house:** `useSafeAccentFn("well")` for marks drawn on the well (D2-10); one identity line on
   any surface that is a Card (D2-14); the disclosure's own height change eased at the disclosure,
   not at the canvas (D2-08).

---

## 9. Negative proof — what I attacked and could not break

Recorded so the DEFECTIVE verdict is not read as "everything is wrong".

- **Horizontal overflow: none.** `docOverflowX = 0` in all 9 matrices including 320 px and 200 % zoom.
- **RTL: correct.** The stage mirrors as chrome; the scientific axes do not, per `VISUAL-CONSTITUTION §6.1`.
- **Reduced motion: safe.** The global guard at `animations.css:184-192` covers `*, *::before, *::after`.
- **Curve ink contrast: passes.** 5.81 : 1 light, 8.31 : 1 dark against the well — well clear of 3 : 1,
  and the diagonal reference clears too (5.06 / 5.97). Only the frame and grid fail (D2-04).
- **Keyboard reachability: real.** Both control points are `role="slider"`, `tabindex="0"`, with
  `aria-valuenow` / `aria-valuetext` (`x 0.000, y 0.000`) and a described-by instruction span;
  arrow authoring works and writes the same model as the pointer (`cubic-bezier(0, 0.03, 1, 1)`
  after three ArrowUps).
- **Two-way binding: genuinely controlled on the canvas.** Pressing a strip tile flips the canvas,
  including `data-mode` bezier↔steps. Only the Preset trigger fails to follow (D2-07).
- **Vue 3.5 idiom and `verbatimModuleSyntax`: clean.** No violations found.
- **No god module, no legacy shim, no back-compat path.** Searched; none.
- **The `.glass-card` selector is live** (census `1`), so Law 2 does fire — it is simply insufficient
  (D2-06). Only Law 3 is wholly dead.

---

## 10. Evidence index

| Artifact | Path |
|---|---|
| desktop light stage, 59.3 % letterbox | `frames/D-01-desktop-light-stage-59pct-letterbox.png` |
| desktop dark stage | `frames/D-02-desktop-dark-stage.png` |
| mobile 390 light stage | `frames/D-03-mobile-light-stage.png` |
| forced-colors stage | `frames/D-04-forced-colors-stage.png` |
| steps regime (amber rail, +65.6 px lurch) | `frames/D-05-steps-regime.png` |
| well seam over flat red, SVG hidden | `frames/D-06-well-seam-over-red-svg-hidden.png` |
| route crash after two keystrokes | `frames/D-07-route-crash-after-two-keystrokes.png` |
| 9-matrix geometry + selector census | `probes/p1-geometry-matrix.json` (`probes/probe1.mjs`) |
| overshoot keyboard crash transcript | `probes/p3-overshoot-keyboard-crash.json` (`probes/probe3.mjs`) |
| crash forensics (boundary text, mechanism) | `probes/p4-crash-forensics.json` |
| contrast + steps regime measurements | `probes/p6-contrast-steps.json` (`probes/probe6.mjs`) |
| alignment + accent census | `probes/p7-alignment-accents.json` (`probes/probe7.mjs`) |
| preset desync t0/t1/t2 transcript | `probes/p8-preset-desync.json` (`probes/probe8.mjs`) |
| prior D round (untouched) | `challenge-D-design.md` |
