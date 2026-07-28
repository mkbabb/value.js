# CHALLENGE-D — `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly spawned
with. The declaration is honoured; no inherited or undeclared seat.

- Subject: `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue` (272 lines) + its colocated
  `composables/useSpectrumPlateStyle.ts` (68 lines).
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Axis: **design**. Premise accepted: the design is wrong. This report does not argue it is fine.
- Live evidence: 5 Playwright/CDP probes + 5 element captures, all under
  `docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe/` (`SPCD-*`).
  Dev server `http://localhost:9000`, Chromium, DPR 2 unless stated.
- I wrote nothing outside this directory. No source edits.

---

## 0. The first thing to say

**There is no canvas.** This seat's own commissioning brief reads *"Canvas-based spectrum rendering.
Prime suspects: per-frame redraw cost, devicePixelRatio handling…"* — `workflows/args/picker.json:20-22`.
Measured on the live route:

```
plate.querySelectorAll("canvas").length  →  0        (SPCD-probe1.json .probe.canvasInside)
```

The component is a `<div>` carrying two CSS gradients. The misnomer is not cosmetic: it misled the
orchestrator that dispatched this audit into naming four suspects, three of which do not exist. It
also hides the real cost centre, which is the *marker*, not the field (D-07).

And the name points at the cure it does not implement. A canvas is what this instrument would need
to paint a field of the **selected** colour space — which brings us to the blocker.

---

## 1. BLOCKERS

### D-01 — The dominant instrument of a colour-space laboratory is invariant under the colour-space selection

Measured live: switch the space selector and re-read the plate.

| selected space | plate `background-image` (computed) | dot `left`,`top` | headline readout |
|---|---|---|---|
| **Lab** | `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0)), linear-gradient(to right, rgb(255,255,255), rgb(255,0,59))` | `62.7886%`, `0%` | `92.0%, 88.8, 20.0` |
| **OKLCh** | `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0)), linear-gradient(to right, rgb(255,255,255), rgb(255,0,59))` | `62.7886%`, `0%` | `95.8%, 0.3, 9.8deg` |
| **HSL** | `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0)), linear-gradient(to right, rgb(255,255,255), rgb(255,0,59))` | — | `346deg, 0%, 100%` |

`probe/SPCD-probe3.json .spaceInvariance`. The `background-image` strings are **byte-identical**;
the marker does not move; the accessible name does not change. Only the readout changes.

The plate is hard-coded sRGB HSV in `useSpectrumPlateStyle.ts:36-39`:

```ts
background: `
  linear-gradient(to top, #000, transparent),
  linear-gradient(to right, #fff, hsl(${hue}deg, 100%, 50%))
`,
```

Its sole reactive input is the HSV hue. `s` and `v` are axes of a space the user did not select and,
in Lab / OKLCh / XYZ, cannot select.

`VISUAL-CONSTITUTION.md:5` — "value.js is a **chromatic laboratory**… Each screen therefore has one
dominant instrument". `:42` — Picker's protagonist is the "optical color stage". `:182` — "The
optical stage dominates." A laboratory whose dominant instrument is constant under the one
selection the instrument exists to serve is not a laboratory; it is a legacy HSV square with a
readout bolted on. The colour-space selector, the four channel rails, the readout and the entire
`/color` projection machinery all respond to the selection. The stage does not.

**Failure scenario.** A user in OKLCh mode drags to the upper-right of the plate expecting maximum
chroma at high lightness. They get `hsv(H, 1, 1)` projected into OKLCh — an sRGB-corner colour, not
an OKLCh-gamut extreme. The plate cannot express any OKLCh colour outside sRGB, and gives no
indication that a region of the selected space is unreachable.

**Cure (transposition, not patch).** The stage renders a projection of the *selected* space: two of
its axes at the third's current value, gamut-mapped, with the unreachable region marked. CSS
gradients cannot express that for Lab/OKLCh, which is exactly what the file's name has been
promising since it was written. One `<canvas>` (or a `conic`/`image()` painted worklet) owned by the
stage, one projection function per space, one shared `spectrumLuma`-style regime helper. The dot's
`(s, v)` model becomes `(axis1, axis2)` of the selected space, which also supplies D-04's two named
numeric axes for free.

---

### D-02 — Under RTL the marker renders 267 px outside the instrument

```
dir="rtl"  →  dotCenterFractionFromPlateLeft = 1.5682
```
`probe/SPCD-probe4.json .rtl`. The marker's centre sits at **156.8 %** of the plate's inline size —
`0.5682 × 469.06 px = 266.5 px` beyond the plate's right edge, over the About pane.

Root cause, measured:

```
getComputedStyle(document.querySelector(".spectrum-dot")).position  →  "relative"
getComputedStyle(plate).display                                     →  "flex"
```
`probe/SPCD-probe5.mjs` output.

`SpectrumCanvas.vue:260` declares `.spectrum-dot { position: absolute; }`. Vue-scoped, that is
`.spectrum-dot[data-v-…]` — specificity `(0,2,0)`. glass-ui's producer rule is
`.watercolor-swatch[data-v-292b9032]{ … position: relative … }` — also `(0,2,0)`. The tie resolves
on source order, and the producer wins. The marker is therefore an **in-flow flex item**, and
`left`/`top` are *offsets from its static position*:

- LTR: the flex line starts at `x = 0`, so `left: 62.7886%` happens to land the marker correctly.
  The design has been right by coincidence.
- RTL: the flex line starts at `x = width − 28`, so the same offset adds on top of it.
  `(469.06 − 28)/469.06 + 0.6279 = 1.568` — the measured value to four decimals.

`VISUAL-CONSTITUTION §6.1`: "CSS directional keywords and **scientific coordinate axes** preserve
their declared physical/domain meaning" — the axes are correctly physical here; the *marker* is not
positioned at all, it is displaced. This is a design-boundary defect, not a stray CSS bug: it is
owner edict 5 ("style at the shadcn/glass root component level, **never per-instance overrides**")
producing an actual rendering failure in a shipped locale mode.

**Reproduction.** `node probe/SPCD-probe4.mjs` (section 3), or in the live app:
`document.documentElement.setAttribute("dir","rtl")` on `/#/`.

---

### D-03 — `pointercancel` commits the aborted gesture

Measured sequence on the live route (`probe/SPCD-probe4.json .cancel`):

| step | aria state | headline |
|---|---|---|
| before | saturation 63 %, lightness 100 % | `92.0%, 88.8, 20.0` |
| `pointerdown` at (25 %, 75 %) | saturation 25 %, lightness 25 % | `21.7%, 8.0, 0.6` |
| drag to (85 %, 15 %), then **`pointercancel`** | **saturation 85 %, lightness 85 %** | **`48.1%, 68.9, 26.2`** |

The cancelled gesture's terminal position was committed. Neither the pre-gesture colour nor the
pointerdown colour was restored.

`SpectrumCanvas.vue:182-200` — `handleSpectrumCancel`, `handleSpectrumUp` and `onLostPointerCapture`
all call the same `stopDragging()`, and `stopDragging` **flushes** the pending coordinate:

```ts
const stopDragging = () => {
    …
    if (pendingCoords) { updateSpectrumColor(pendingCoords); pendingCoords = null; }
```

Three semantically distinct terminations — *completed*, *aborted by the platform*, *capture stolen*
— collapse into one. No pre-gesture colour is stored anywhere in the component, so a revert is not
merely unimplemented, it is structurally impossible.

`VISUAL-CONSTITUTION §5`: "Tuning is continuous and **interruptible**". An interruption whose
outcome is a commit is not an interruption. On iOS this is the live path: a system edge-swipe or a
scroll takeover mid-drag silently rewrites the user's colour.

**Cure.** Latch the colour at `pointerdown`; `pointercancel` restores it, `lostpointercapture`
restores it, only `pointerup` commits. That is three lines and one `ref`, and it makes the §5
"select → tune → commit" grammar true instead of asserted.

---

### D-04 — Zero keyboard coordinate; the constitution's named axes do not exist

```
tabindex        → null
isFocusable     → false        (element.focus(); document.activeElement !== element)
role            → "img"
innerFocusables → 0
named numeric axes present on the route → ["L channel","A channel","B channel","ALPHA channel"]
```
`probe/SPCD-probe4.json .keyboard`.

`VISUAL-CONSTITUTION §5.2`, the *Spectrum coordinates* row, is explicit:

> "expose **two named numeric axes** using the same Slider law; **pointer canvas is not the sole
> keyboard control** … Home/End apply to the focused axis; both controls and canvas update one
> coordinate model"

and `§5`: "every spatial action has a keyboard/numeric equivalent."

The four axes that do exist are the **selected space's** channels. In Lab they are L/a/b; in OKLCh
they are L/C/H. Neither set contains the plate's `s` or `v`. So the generous reading — "the channel
sliders are the spectrum's numeric equivalent" — is false by measurement: there is no control
anywhere in the product that sets the plate's saturation or its value. The plate's own coordinate
model is reachable by pointer only.

The prior colorpicker seat filed this as `D-03 / V-A137` from the tab-order side. Restated here at
the component's own seat with the clause that seat did not test: **the axes are not merely
unnamed, they are absent from the product**. Curing D-01 supplies them (the selected space's two
plotted axes are, by construction, two named numeric axes already rendered as sliders).

---

## 2. MAJOR

### D-05 — The instrument has no boundary; in every scheme part of it dissolves into the card

At rest: `box-shadow: rgba(0,0,0,0) 0px 0px 0px 0px`, no `border`, no `outline`
(`probe/SPCD-probe1.json`). The plate's own content supplies its extremes — `#fff` at the top-left,
`#000` along the bottom — so its edge can never be self-evident.

Measured WCAG 2.2 SC 1.4.11 non-text contrast, plate interior 6 px inside vs. card 6 px outside
(`probe/SPCD-pixels.json`; luminance per WCAG relative-luminance formula):

| edge sample | light | dark | forced-colors |
|---|---|---|---|
| top-left (field is `#fff`) | **1.538** ✗ | 6.256 | **1.091** ✗ |
| top-right (full hue) | **2.688** ✗ | **1.498** ✗ | 4.137 |
| left mid (mid grey) | **2.464** ✗ | **1.642** ✗ | 4.092 |
| bottom-left (field is `#000`) | 12.423 | **3.065** (marginal) | 20.262 |
| bottom-right | 14.131 | 3.555 | 20.794 |

Three of five sampled edge segments fail the 3:1 floor in light, three in dark, one in
forced-colors — and the forced-colors failure is **1.091:1**, i.e. the plate's upper-left boundary
is *invisible* against `Canvas` white (see `probe/SPCD-forced-colors.png`: the rounded corner simply
is not there).

The forced-colors policy is not the problem — `foundation.css:678-698` deliberately grants
`.spectrum-picker` tier-1 `forced-color-adjust: none` so the colour content survives WHCM, which is
correct. The problem is that the policy preserves the *content* and never gave the *surface* an
edge, so the worst case is white-on-white.

`VISUAL-CONSTITUTION §2`: "One surface has one tier." The plate is assigned no tier: it is not
"Structural glass", not an "Instrument veil" (that tier is defined as "controls genuinely over live
color"), not a "Specimen well" (defined as "the specimen supplies color" over an opaque neutral
stage). It is a chromatic field with no material law, and consequently no boundary vocabulary.

---

### D-06 — Two symmetric [0,1] axes receive anisotropic, viewport-height-dependent resolution

`SpectrumCanvas.vue:11`:

```
h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none
```

Measured plate geometry (`probe/SPCD-probe2.json`, `probe/SPCD-probe1.json`):

| viewport | plate | aspect (S px : V px) |
|---|---|---|
| 1440 × 900 | 469.06 × 224 | 2.094 |
| 1023 × 900 | 469.06 × 160 | 2.932 |
| 390 × 844 | 327.38 × 160 | 2.046 |
| 320 × 568 | 262 × 113.59 | 2.306 |
| **900 × 500** | **469.06 × 100** | **4.691** |
| iPhone 13 (touch) | 327.4 × 132.8 | 2.465 |

`s` and `v` are both normalised `[0,1]` and the pointer maps them linearly
(`SpectrumCanvas.vue:120-121`). So the *precision* the user gets on each axis is the pixel count on
that axis. At 1440×900 one CSS pixel is 0.213 % of `s` but 0.446 % of `v`. At 900×500 it is 0.213 %
vs **1.000 %** — a 4.7× anisotropy on two axes with identical domains and identical semantic weight.
The range across the band is **2.05 … 4.69**, governed by nothing.

Two further consequences of the same declaration:

1. **The block size follows the viewport's height while the inline size follows the card.** The
   instrument's shape is a function of window aspect. Resize vertically and the colour you can
   select changes precision without anything in the design saying so.
2. **A 64 px discontinuous jump at the `lg` breakpoint** — 160 px at 1023 px wide, 224 px at 1024 px
   (measured, table above). `VISUAL-CONSTITUTION §3` law 7: "Spacing is container-scaled from
   glass-ui tokens. **No desktop-tight/mobile-airy fork and no breakpoint pile.**" This is a
   breakpoint fork *and* a pile: an arbitrary `dvh` arm, a `min-h`, a `max-h`, a `lg:` arm and a
   `lg:` max-reset — five height declarations for one box.

**Cure.** One container-scaled arm with a declared ratio (`aspect-ratio: 1` for two symmetric axes,
or the constitution's golden rung if the design wants an argument for asymmetry — but it must be an
argument, not a `dvh`).

---

### D-07 — 20.6 ms of style recalculation per pointer move; two of the three causes are authored here

CDP `Performance.getMetrics`, Chromium, 1440 × 900, 80 synthetic pointer moves per run
(`probe/SPCD-probe3.json`):

| run | wall | `LayoutCount` | `RecalcStyleCount` | `RecalcStyleDuration` | `LayoutDuration` |
|---|---:|---:|---:|---:|---:|
| **spectrum-plate drag** | 6732 ms | **221** | 1152 | **1768.9 ms** | 67.1 ms |
| channel-slider drag (same session update) | 5477 ms | 151 | 746 | 1200.1 ms | 43.8 ms |
| **idle, wall-matched** | 6734 ms | **0** | 344 | 122.8 ms | — |

Net of the wall-matched idle baseline: **1646 ms of style recalculation for 80 committed pointer
moves = 20.6 ms per move**, against a 16.7 ms frame budget. The budget is exceeded by style recalc
alone, before layout, before paint, before compositing. Layout goes 0 → 221 (2.76 per move). The
plate costs **1.49×** the channel slider running the identical colour-session update, so ~⅓ of the
cost is this component's own mechanism, not the shared model.

Two authored causes:

1. **`useSpectrumPlateStyle.ts:40` rewrites an inherited custom property every frame.**
   `"--spectrum-shadow": cssColorOpaque.value` is set on the plate's `style` attribute. A custom
   property is inherited, so every write invalidates the computed style of the plate's entire
   subtree. Its **only** consumer is `SpectrumCanvas.vue:236` — a `:hover` box-shadow. The
   instrument pays a per-frame subtree invalidation to feed a decoration (which D-16 argues should
   not exist at all).
2. **The marker is moved with `left`/`top` percentages** (`useSpectrumPlateStyle.ts:60-61`) on an
   element carrying an SVG `feDisplacementMap` (`filter: url("#watercolor-filter-v-7")`, measured).
   `left`/`top` are layout-inducing; `translate`/`transform` are not. glass-ui's own producer
   documentation is explicit about this hazard class — `useWatercolorBlob.d.ts`: *"a per-frame
   `border-radius` write under the SVG filter forces the filter graph to RE-RASTERIZE every frame,
   which flashes Safari… the liveness rides a seeded COMPOSITOR transform wobble."* The producer
   went to real trouble to keep this element compositor-only; the consumer reintroduces per-frame
   layout on it.

**Cure.** Move the marker with `translate: calc(var(--s) * 100cqw - 50%) …` (or a `transform`
composed with the producer's wobble via the independent `translate` property, which is already what
Tailwind emits — see the negative proof in §4). Delete `--spectrum-shadow` with D-16's hover shadow.

---

### D-08 — Three of the four `.spectrum-dot` declarations are per-instance producer overrides; two are provably dead

`SpectrumCanvas.vue:259-270` styles a glass-ui producer root from the consumer. Measured computed
style on the live marker (`probe/SPCD-probe1.json`, `probe/SPCD-probe2.json`):

| declaration | site | measured outcome |
|---|---|---|
| `position: absolute` | `:260` | **lost** the `(0,2,0)` tie → computed `relative` → **D-02** |
| `box-shadow: var(--shadow-sm)` | `:264` | **lost** the tie → computed shadow is the producer's three shadows only → **never paints** |
| `&:hover { transform: none }` | `:268-270` | producer sets `pointer-events: none` inline (and the consumer repeats it as a class) → `:hover` **can never match** → dead |
| `border: 2px solid var(--dot-border, …)` | `:263` | applies — and is itself the §4.2 violation, D-09 |

Also duplicated-and-lost: `useSpectrumPlateStyle.ts:62` sets `backgroundColor: cssColorOpaque.value`,
but `WatercolorDot` sets `backgroundColor: props.color` **after** the consumer's style in its own
`normalizeStyle` merge — the consumer's write is overwritten by an identical value. And
`pointer-events-none` on `SpectrumCanvas.vue:28` duplicates the producer's inline
`pointerEvents: "none"`.

Owner edict 5 ("never per-instance overrides") and edict 2 ("no dead/masking paths"). The interesting
part is not that the overrides exist but that **the design has no way to know they failed**: two of
them lose a silent specificity tie, one targets an unreachable pseudo-class, one is a redundant
duplicate. Four attempts to style a producer from outside, one of which works and three of which
vanish without a diagnostic. That is what edict 5 is for.

---

### D-09 — The marker defeats the WatercolorDot species

`SpectrumCanvas.vue:263` draws `border: 2px solid var(--dot-border, var(--background))` on the
producer's seeded organic silhouette. The producer's `feDisplacementMap` then wobbles that ring.

Look at `probe/SPCD-zoom200.png` (200 % document zoom, 56 px marker): the mark reads as a **hand-drawn
black rounded square** — a doodled sticky note. The seeded silhouette
(`border-radius: 15.954% 83.45% 19.1765% 33.1628% / 38.1292% 35.2683% 41.781% 37.9911%`, measured)
is not perceptible; the 2px ink ring *is* the shape.

`VISUAL-CONSTITUTION §4.2`: "V **abrogates a selection outline and interactive host on
`WatercolorDot`**… the organic face supplies color/specimen identity only. Selection, activation,
drag and keyboard focus belong to a named enclosing geometric button/seat… **no ring/shadow/
pseudo-element crosses the seeded edge.**"
`OPTICAL-BENCH-COMPOSITIONS.md:108` (P051) names the execution sites and **Spectrum is one of them**:
"W19–W22/W25–W27 execute Dock seal/edit, ColorSpaceSelector, eyedropper, **Spectrum**, channel,
palette, Generate, Mix and Gradient sites."

`VISUAL-CONSTITUTION §1` calls the WatercolorDot species "the second signature" of the product. The
Picker — the front door — is the one place that signature is overpainted.

---

### D-10 — The marker's ink regime is computed from a field the marker is half off

`useSpectrumPlateStyle.ts:53` flips the ring between black and white on
`spectrumFieldIsLight(s, v)` — a shared, correct, single-source predicate (`spectrumLuma.ts:33`).
Its domain assumption is that the 28 px marker sits over the field. Measured, it does not:

```
dotEscape.top = 14.1 px      at v = 1        (probe/SPCD-probe1.json)
plate overflow: visible                      (SpectrumCanvas.vue:234)
```

At `v = 1` half the marker is over the **card**; at `v = 0` half is over the channel rail; the same
at `s = 0` and `s = 1`, and a quarter at each corner. Those four extremes — pure white, pure black,
zero saturation, full saturation — are the coordinates a colour picker's users reach most.

Dark mode, at the boot state (`v = 1`): measured `border: 2px solid rgba(0,0,0,0.8)` — black, because
the *field* under the lower half is light — against a card measured at `rgb(122,77,101)`. Contrast
**1.7:1**. Half the ring is very nearly invisible; see `probe/SPCD-dark.png`.

`PROPORTION-AUDIT §5` card law 3: "Renderer, icon or touch footprints may reserve collision space
only on the axis where collision exists." No space is reserved on either axis; the marker simply
overhangs into whatever is adjacent.

**Cure.** The regime must be a function of what is actually beneath each part of the marker, which
in practice means the marker must not leave the field — inset the reachable domain by the marker
radius, or clip and use a two-tone ring. Either is a design decision the component currently has
not made.

---

### D-11 — The out-of-gamut state is designed, tokenised, rostered in forced-colors *and* print — and does not exist

The canon treats out-of-gamut as a first-class designed state:

- `spectrumLuma.ts:5-6` names a live consumer: "the **gamut overlay's** contour/hatch ink regime
  (`useGamutOverlay`)".
- `foundation.css:291-298` defines the full vocabulary `--gamut-edge`, `--gamut-hatch`,
  `--gamut-edge-paper`, `--gamut-hatch-paper`, with a documented two-round recalibration
  (`:283-291`) against a measured luma-delta floor.
- `foundation.css:682` rosters `.gamut-overlay` as a tier-1 forced-colors surface; `:831` rosters it
  again for print.
- `demo/DESIGN.md:336` calls it "the truth-line overlay's **whole vocabulary**".

Implementation:

```
$ grep -rn "gamut-overlay\|useGamutOverlay\|GamutOverlay" demo/ src/
demo/picker/controls/spectrumLuma.ts:6:  … (`useGamutOverlay`), and the slider-thumb needle
demo/styles/foundation.css:682:    .gamut-overlay,
```

Two hits: one prose comment, one CSS roster entry. No component, no composable, no canvas
(`canvasInside = 0`, §0).

And the state it was designed for is **live at boot**. Measured (`probe/SPCD-probe2.json .colorTruth`):

```
marker fill declared   lab(92 88.8 20)
marker fill in sRGB    [255, 143, 200]
field beneath marker   [255,  95, 132]      (computed from the plate's own gradient stops at s=0.6279, v=1)
Δ                      [  0, +48, +68]
```

The marker and the field disagree by 48/255 in green and 68/255 in blue **at the marker's own
coordinate**. The instrument is displaying a colour it cannot paint, at the exact pixel where it
claims to be painting it, and says nothing. This is visible without instrumentation in
`probe/SPCD-light.png` and unmissable in `probe/SPCD-zoom200.png`.

This is the designed state's *canonical* trigger, present on first paint, with the whole designed
affordance absent. Note that D-01's cure changes the shape of this row (a selected-space field has a
different gamut boundary) but does not remove it — an overlay is still required, and its tokens are
already recalibrated and rostered.

---

### D-12 — The accessible name is factually wrong, contradicts the visible headline, and is never announced

Measured (`probe/SPCD-probe1.json`, `probe/SPCD-probe3.json`):

```
aria-label   "Color spectrum, saturation 63%, lightness 100%"
headline     "92.0%, 88.8, 20.0"        selected space: Lab
```

Three separate defects in one string, produced at `useSpectrumPlateStyle.ts:24-28`:

1. **Wrong channel name.** HSV *value* is called "lightness". At `s = 63 %`, `v = 100 %` the colour
   is `lab(92 88.8 20)` — a vivid pink. "Lightness 100 %" names white.
2. **Channels that do not exist in the selected space.** Neither "saturation" nor "lightness" is a
   Lab or OKLCh channel. The label announces a coordinate system the instrument is not in — D-01
   surfacing in the accessibility layer.
3. **Never announced.** The host is a non-focusable `role="img"` with no live region. No AT
   announces an `aria-label` mutation on a static `img`. The label is recomputed on every frame of
   a drag (it is a `computed` on `dotPos`) and is heard **zero** times. It is a per-frame cost that
   buys nothing.

`VISUAL-CONSTITUTION §4.1`: "Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, **state/value** and associated error/status are explicit."
`§7 Picker`: "ordinary text uses `aria-live="off"`, while the **operable slider** exposes the
identical channel name/value/unit through `aria-valuetext`."

`role="img"` was a deliberate choice — `SpectrumCanvas.vue:4-5` documents it: *"2D saturation×lightness
picker — not a linear slider, so `role="img"` with a reactive descriptive label, not `role="slider"`."*
The reasoning is sound about what the element is *not* and never resolves what it *is*. §5.2 answers
that: two named numeric axes plus a pointer surface that is not the sole control.

---

### D-13 — The touch gate is an undiscoverable mode whose only expression is a 3 px outline authored in a different component

Measured on iPhone 13 (`probe/SPCD-probe4.json .touchGate`):

| action | result |
|---|---|
| first tap at (20 %, 80 %) | **aria-label unchanged** — the colour does not move |
| | `touch-gate-active` = true; `outline-color: color(srgb 0.11 0.098 0.09 / 0.5)`, `outline-width: 3px` |
| second tap at (80 %, 20 %) | saturation 80 %, lightness 80 % — now it commits |

So on every touch device the instrument silently swallows the user's first interaction. The entire
communication of that mode is a 3 px, 50 %-alpha outline. Nothing names it, nothing announces it, and
because the host is `role="img"` an AT user cannot perceive the mode at all.

The rule that draws it is not in this component. It is in
`ComponentSliders.vue:253-263`, an **intentionally unscoped** `<style>` block in a sibling SFC whose
own comment (`:244-247`) explains the reach: *"the block is intentionally UNSCOPED so the cascade
reaches consumers outside this SFC's `data-v-*` attribute scope."*

Counting the cascade owners of this component's visual states:

| owner | what it controls here |
|---|---|
| `SpectrumCanvas.vue` `<style scoped>` | radius, hover shadow, paint-in, marker |
| `ComponentSliders.vue` unscoped block | **the entire touch-activation state** |
| `foundation.css:678-698` | forced-colors tier |
| `foundation.css:820-841` | print tier |
| `animations.css:184-192` | the blunt PRM kill |
| `usePointerDebug.ts:118,121` | runtime selector-based instrumentation |

`SUBTRACTION.md:28` dispositions exactly this: "duplicated/global **spectrum**-range and pane-shell
style ownership → one W21 axis/spectrum owner and W19 shell colocation; **no second cascade owner**."
There are five.

---

## 3. MINOR

### D-14 — Motion is not tokenised, and animates a paint-bound property

`SpectrumCanvas.vue:255`:

```css
animation: field-paint-in 420ms var(--ease-standard) 180ms both;
```

Measured computed: `0.42s cubic-bezier(0.4, 0, 0.2, 1) 0.18s both field-paint-in-ad23e00d`.
`420ms` and `180ms` are magic numbers; the same rule's sibling `transition` at `:233` uses
`var(--duration-normal)` correctly, so the file knows the idiom and abandons it three lines later.
Edict 6 permits animations to be *moved or tokenised*, never deleted — this one has been neither.

The keyframe animates `opacity` (compositor-friendly) **and `background-size` 120 % → 100 %**
(`:246-252`). `background-size` re-rasterises both gradients on a 469 × 224 surface every frame for
420 ms. `VISUAL-CONSTITUTION §6`: "Color/opacity effects use the corresponding short effect curve"
— a background-size settle is neither a colour effect nor a spatial-continuity spring; it is a
third, untokenised motion species.

### D-15 — `<figure>` used as a flex box

`SpectrumCanvas.vue:3`: `<figure class="m-0 min-w-0 w-full flex flex-col">`, measured
`figcaption` count **0**, single child, that child `role="img"`. The element's semantics
(self-contained content referenced from the main flow, optionally captioned) are entirely unused,
and `m-0` immediately cancels the UA margin that is the element's one behavioural difference from a
`div`. Edict 3 (KISS, no contrivance): this is a `<div>` in a semantic costume, and it adds a second
`figure`-shaped node between the plate and its real layout parent for nothing.

### D-16 — The hover affordance is a second cartoon shadow, seed-tinted, pointer-only

`SpectrumCanvas.vue:235-237`:

```css
&:hover { box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black); }
```

Measured: the enclosing `.glass-resting.card` already casts
`color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px` (`probe/SPCD-probe3.json .cardChain`). On hover
the plate grows a **second cartoon shadow of identical geometry, nested inside the first**.

Four canon clauses at once:
- `PROPORTION-AUDIT` PR-05 — "Dividers, **caster shadows** and corner marks repeat a boundary" →
  **REMOVE**.
- `VISUAL-CONSTITUTION §3` law 8 — supporting fixtures must not compete "through equal size or
  **equal shadow**".
- `§2` material table — "Instrument veil … **no drop shadow**".
- `§2` — "Seed tint is forbidden outside the ambient field, active accent, WatercolorDot/specimen,
  and pastel Palettes lanes." A drop shadow tinted by the live specimen colour is in none of those.

It is also hover-only, so it is invisible on every touch device and to every keyboard user
(PR-07: "Hover-only/unlabeled controls and invisible drag state"), and its `--spectrum-shadow` feed
is the per-frame subtree invalidation measured in D-07. Note the fallback is wrong too:
`color-mix(in srgb, transparent 50%, black)` resolves to 50 % black, not to nothing.

### D-17 — Production debug instrumentation, with a per-pointermove RNG

11 `debug.*` calls at `:133, 140, 153, 154, 163-164, 169, 178, 183, 188, 189`, plus
`Math.random() < 0.03` evaluated on **every** `pointermove` (`:163`), plus a hard
`inject(POINTER_DEBUG_KEY)!`.

`SUBTRACTION.md:29`: "production `PointerDebugOverlay`, public `debug=1`, provider and
**Spectrum**/Slider injected logging branches → browser devtools and ordinary focused interaction
tests; **no product-panel successor**" — deletion wave W20. Still on disk at HEAD.

### D-18 — An eighth of the protagonist's area carries no discriminable chroma

Measured over 11,470 samples on a 3 px grid inside the plate, in all three schemes
(`probe/SPCD-pixels.json`):

```
fraction of plate pixels with max(R,G,B) < 32   →  0.1215     (light, dark and forced-colors, identical)
```

**12.15 %** of the product's dominant instrument is a hue-independent black wedge — every hue
collapses to the same pixels there. In dark mode that wedge abuts a dark card at 3.07:1 (D-05), so
it also reads as a hole rather than a region. The identical value across schemes is itself the
finding's other half: the plate does nothing at all for dark mode.

`PROPORTION-AUDIT §1`: "Every element earns its scale, interval, boundary and material from its job
relative to the local protagonist." An eighth of the protagonist earning nothing is a proportion
defect, and it is a direct consequence of choosing HSV `S×V` (D-01) — a perceptual parameterisation
spends its area on distinguishable colours.

---

## 4. State coverage matrix

Every state this component can be in, and whether it was designed.

| state | handled? | evidence |
|---|---|---|
| populated (normal) | yes | boot render |
| **empty / no model** | **no** | `inject(COLOR_MODEL_KEY)!` `:45-50` — non-null assertion, no fallback branch, no empty render |
| **loading** | **no** | no branch; the plate paints a live HSV field before any colour is resolved |
| **error** | **no** | no branch |
| **disabled** | **no** | no prop, no attribute, no style |
| **focused** | **no** | not focusable at all (D-04) |
| hovered | yes, but wrong | D-16 (duplicate seed-tinted caster, pointer-only) |
| active / pressed | partial | `isDragging` drives no visual state whatsoever; only `debug.setGauge` |
| **selected** | n/a | — |
| dragging | **no visual** | `isDragging.value` (`:151`) is never read by any style or class |
| **drag cancelled** | **wrong** | D-03 — commits instead of reverting |
| touch first-tap (gate) | partial | D-13 — 3 px outline only, owned by a sibling SFC, no name, no announcement |
| overflowing / truncated | n/a | fixed box |
| **marker at the four extremes** | **no** | D-10 — marker half off-field, ink regime wrong |
| **RTL** | **broken** | D-02 — marker 267 px outside |
| reduced motion | **yes** | see negative proof below |
| forced colors | partial | colour survives by policy; the boundary does not (D-05, 1.091:1) |
| zoom 200 % | partial | no overflow (`docOverflowX = 0`); aspect swings to 1.63 (D-06); marker escape doubles to 28 px |
| **out of gamut** | **no** | D-11 — designed, tokenised, rostered, absent |
| **space changed** | **no** | D-01 — the plate does not respond |

Nine unhandled or broken states. A state that was never designed is a design defect.

---

## 5. Negative proofs — hypotheses this seat killed

Recorded so no later seat re-files them.

1. **"The producer's `transform` wobble clobbers the consumer's `-translate-x-1/2` centering."**
   FALSE. Tailwind v4 emits the *independent* `translate` property, not `transform`. Measured live:
   `translate: "-50% -50%"`, `transform: "matrix(1.00722, -0.000613604, -0.0198295, 1.0121, 0, 0)"` —
   they compose. The marker **is** centred in LTR (`sFromDotCenter = 0.6279` exactly matches
   `left: 62.7886%`). The RTL failure (D-02) has a different cause entirely.
2. **`prefers-reduced-motion` is unhandled.** FALSE and well done. The `field-paint-in` keyframe is
   nested *inside* `@media (prefers-reduced-motion: no-preference)` (`:243-257`), so under reduce
   the animation name is never assigned — measured computed `animation: "1e-05s"` (name absent, the
   blunt global kill supplying only a duration). The producer's marker wobble is gated too:
   `useRAFLoop(…, { pauseWhenHidden: true, respectReducedMotion: true })`, measured
   `transform: none` under reduce. This file is one of the six PRM-conforming blocks the excavation
   census counted (`DESIGN-CANON-BRIEF.md:88`).
3. **`verbatimModuleSyntax` violation.** NONE. `useSpectrumPlateStyle.ts:8,10,12` correctly use
   `type ComputedRef`, `type PickerColorIn`, and `import type { useTouchGate }`; the SFC imports no
   types.
4. **Non-idiomatic Vue 3.5.** NONE. `useTemplateRef` is used (`:56`); `rawS`/`rawV` are primitive
   `ref`s, which is correct — there is no `defineModel` round-trip here, so the `shallowRef` caveat
   does not apply.
5. **The `spectrumLuma` threshold is copied.** FALSE. One function, one constant, three consumers
   (`ComponentSliders.vue:99,180`, `useSpectrumPlateStyle.ts:11,53`); `SPECTRUM_LUMA_FLIP` is
   exported once and never duplicated. This is a genuinely good piece of the design. Its *domain* is
   wrong at the edges (D-10), not its structure.
6. **Horizontal overflow / blank render / duplicate `main`.** NONE on `/#/` in any matrix —
   `visual/REPORT.md:119,134,149,164` all read `overflowX 0`, `main 1`, `pageErr 0`; document zoom 2
   measured `docOverflowX = 0`. The single console error on `safari-desktop-light /#/`
   (`WebGL: context lost`, `REPORT.md:17`) belongs to `HeroBlob`, not this component.
7. **Per-frame canvas redraw / devicePixelRatio mishandling** (the brief's stated suspects). Neither
   exists — there is no canvas (§0). The per-frame cost is real but its mechanism is different
   (D-07).

---

## 6. Gestalt

Three of the four blockers are the same defect wearing different clothes: **the plate is not
connected to the instrument it lives in.** It ignores the selected space (D-01), it does not expose
that space's axes to the keyboard (D-04), and its marker is positioned by a coincidence of flex
layout rather than by the component (D-02). The remaining blocker (D-03) is the gesture equivalent:
the component does not model its own interaction well enough to distinguish finishing from being
interrupted.

Underneath sits one architectural choice that generates most of the MAJOR rows: **the field is a CSS
gradient**. Because it is a gradient it can only be sRGB HSV (D-01); because it is sRGB HSV it
spends an eighth of the protagonist on black (D-18) and cannot show its own gamut boundary (D-11);
because it is a `background-image` it has no edge of its own (D-05) and its entry animation must
animate `background-size` (D-14); and because a gradient div cannot host a marker, a producer
component was borrowed and then fought with four per-instance overrides, three of which do not work
(D-08, D-09, D-02).

The name on the file — `SpectrumCanvas` — has been describing the cure for as long as the file has
existed. The correct transposition is to make it true: a stage that paints the selected space,
owned by one composable, with the marker inside the stage rather than layered over it, two named
numeric axes as the keyboard model, and the already-tokenised gamut overlay finally built. That one
move closes D-01, D-04, D-05, D-09, D-10, D-11, D-14 and D-18, and makes D-06 and D-07 trivial. The
remaining rows (D-03, D-13, D-16, D-17) are independent subtractions.

---

## 7. Verdict

**DEFECTIVE.** Four blockers, nine majors, five minors. Strongest: **D-01** — the flagship
instrument of a colour-space laboratory is byte-identically invariant under the colour-space
selection, measured across Lab, OKLCh and HSL.

---

## Appendix — probe index

All under `docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe/`.

| file | what it establishes |
|---|---|
| `SPCD-probe1.mjs` / `.json` | plate + marker geometry, computed style, aria, tab order, `canvasInside = 0` |
| `SPCD-probe2.mjs` / `.json` | marker-vs-field colour delta; drag cost; responsive geometry ladder |
| `SPCD-probe3.mjs` / `.json` | **space invariance**; plate-vs-slider cost attribution; card-shadow chain; the four scheme matrices; zoom 200 |
| `SPCD-probe4.mjs` / `.json` | **`pointercancel` commits**; keyboard absence; **RTL 1.5682**; touch-gate first-tap |
| `SPCD-probe5.mjs` | `computedPosition: "relative"` — the D-02 root cause |
| `SPCD-pixels.mjs` / `.json` | WCAG 1.4.11 edge contrast in light / dark / forced-colors; black-area fraction |
| `SPCD-light.png`, `SPCD-dark.png`, `SPCD-forced-colors.png`, `SPCD-reduced-motion.png`, `SPCD-zoom200.png` | element captures at DPR 2 |

Re-run any of them with `node <file>` against a live `http://localhost:9000`.
