# CHALLENGE-D — `PreviewRamp.vue` is design-defective

**Seat:** CHALLENGE-D (assume the design is wrong).
**Subject:** `demo/color-session/color-chips/PreviewRamp.vue` (50 lines, area *core*).
**Sole consumer:** `demo/workbenches/mix/MixConfigBar.vue:111,133` (route `/#/mix`).
**Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
**Date:** 2026-07-28.

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the 1M-context Opus 5
variant, spawned with an explicit Opus 5 declaration. The seat is declared, not inherited.

## Verdict

**DEFECTIVE.** Twelve defects, two of them BLOCKER. The two blockers are independent:

- **D-1** — the component renders **zero instances** in the shipped app. Not "rarely"; never.
  Its own e2e oracle is RED on both positive legs, live, today.
- **D-2** — the "four-arc quartet" the design is built to show **can never be four arcs**.
  Maximum 2 distinct ramps, ever; exactly 1 (all four byte-identical) in 4 of the 9 selectable
  spaces — including `oklab`, which is the app's **default**.

D-2 is the strongest *design* defect: it is wrong in the drawing, survives every fix to D-1, and
was provable at design time from the library's own `HUE_INDEX`.

The component is also, genuinely, well-built in several respects; §6 records the negative proofs
so this report is not mistaken for a uniform condemnation.

---

## 1. The component, as written

```
demo/color-session/color-chips/PreviewRamp.vue:19-36
const { stops } = defineProps<{ stops: readonly string[] }>();
const gradient = computed(() => `linear-gradient(90deg, ${stops.join(", ")})`);
<span v-if="stops.length >= 2" class="preview-chip" aria-hidden="true"
      :data-stops="stampStops(stops)" :style="{ backgroundImage: gradient }"></span>

demo/color-session/color-chips/PreviewRamp.vue:40-49
.preview-chip {
    display: inline-block; flex: none;
    inline-size: 2.618rem;   /* one golden plate — φ² × 1em (F7) */
    block-size: 1em;
    border-radius: var(--radius-sm);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
}
```

It is mounted only inside `SelectContent` `#description` slots, 9 rows in the Color-space menu
and 4 in the Hue-method menu — 13 possible instances, one route.

---

## 2. BLOCKER defects

### D-1 — BLOCKER — Zero instances render. The design has never been seen.

`<PreviewRamp>` renders iff `sampleInterpolationRamp(operandColors, …)` is non-null, which
requires `operandColors.length >= 2` (`sample.ts:58`). Mix's operand rack is empty on arrival
and **there is no reachable affordance that adds an operand.**

Every operand-add affordance in `MixSourceSelector.vue` is a `WatercolorDot` with `tag="button"`
plus `@click` — the add-slot ghost (`:165-175`) and the from-palettes swatches (`:210-220`).
glass-ui 7.0.0 removed the interactive host (this is V's own ruling — `VISUAL-CONSTITUTION.md:91`,
"V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the
public `tag="button"`/interactive-host branch in the clean major"). The producer now renders,
unconditionally:

```
node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js   (version 7.0.0)
  inheritAttrs: !1,
  __name: "WatercolorDot",
  props: { color, variant, animate, cycleDuration, range, seed },     ← no `tag`
  return (t, n) => (d(), o("span", {
      "aria-hidden": "true",
      ...
      style: u([f.value, { backgroundColor: …, borderRadius: …,
          pointerEvents: "none",                                       ← inline, unconditional
```

`inheritAttrs: false` with only `class`/`style` re-bound means the consumer's `@click`,
`aria-label` and `:disabled` are **dropped on the floor**. Measured live on the running dev
server at `http://localhost:9000/#/mix`:

```
$ node /tmp/pr_paths.mjs
{ "wellText": "Selected",
  "addSlotPE": "none",          ← pointer-events
  "addSlotTag": "SPAN",
  "addSlotAria": null,          ← aria-label was dropped
  "addSlotHidden": "true",
  "addSlotTabbable": -1 }
```

Cascade origin, via CDP `CSS.getMatchedStylesForNode`:

```
$ node /tmp/pr_pe.mjs
pointer-events declarations matching .add-slot-ghost:
[ { "sel": "INLINE style attribute", "value": "none" } ]
inherited pointer-events from ancestors:      (none)
```

So the affordance is dead to pointer (`pointer-events:none`), to keyboard (`tabIndex: -1`,
`<span>`), and to AT (`aria-hidden="true"`, no accessible name). A real `page.mouse.click()` at
its exact centre adds nothing:

```
$ node /tmp/pr_live5.mjs
{ "tag":"SPAN", "rect":{x:767,y:346.2,w:48,h:48}, "pointerEvents":"none",
  "topEl":"DIV.swatch-row flex items-center gap-2.5 flex-wrap", "topIsSelfOrChild": false }
operands after real mouse click: 0
```

Consequence in the DOM — the Color-space menu opens with 9 options and 0 chips, each description
lane holding a bare comment node where the chip should be:

```
$ node /tmp/pr_live3.mjs
{ "options": 9, "chips": 0,
  "optHtml": "<div … role=\"option\" …><div class=\"flex flex-col gap-0.5 min-w-0\">
    <span id=\"reka-select-item-text-v-1-16\">OKLCh </span>
    <span class=\"flex items-center gap-2\"><!--v-if--><span class=\"text-micro text-muted-foreg…" }
```

The component's **own guard suite is RED**, live:

```
$ npx playwright test e2e/smoke/oracles/o14-preview-truth.spec.ts --project=smoke \
    -g "T-17 chip referent" --reporter=line
  2 failed
    › O-14 · the T-17 chip referent (mix Space/Hue ramps) › every open-menu chip's painted
      gradient carries exactly its stamped stops
    › O-14 · the T-17 chip referent (mix Space/Hue ramps) › the chip feasibility leg: every
      preview chip is perceptible against the menu surface …
  1 passed  (1.3m)

    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:  - waiting for getByRole('button', { name: 'Add current color to the mix' })
      353 |             name: "Add current color to the mix",
    > 355 |         await addSlot.click();
```

The one green test is `honest absence: with <2 operands the rows carry NO chip`
(`o14-preview-truth.spec.ts:334-344`) — it asserts `count() === 0` and **passes vacuously**,
because the count is now permanently 0. The suite's negative leg has become an accidental
tautology guarding a dead component.

The Safari matrix agrees: `shots/safari-desktop-{light,dark}/mix.png` both show the rack holding
one dashed empty slot labelled `Selected`, with `OKLab` / `Shorter` beneath it. No chips exist to
photograph, at any of the four matrix cells.

**Design reading.** Two things are wrong here at the design level, not just the wiring level.
First, the chip's absence is *silent and indistinguishable from health*: the row simply loses
2.618rem + `gap-2` of leading inset and the description text slides left. Nothing in the design
says "the preview has nothing to say"; `PreviewRamp.vue:13` asserts "the a11y truth stays label +
description", which is only true if the chip carried nothing — and if the chip carries nothing,
it should not exist. Second, the design placed its entire value behind an affordance owned by
another component and another package, with no contract holding that affordance alive.

**Cure (gestalt, not patch).** The absence case is a first-class design state and must be drawn:
the description lane reserves the plate footprint always, and when there is no truth it renders
the *reason* (a hairline empty plate plus "add a second color") rather than collapsing. That
single change makes D-1 self-announcing instead of invisible, at every future producer break.
The wiring cure belongs to `MixSourceSelector`: the add affordance must be a real
`<button>`/glass-ui action **wrapping** the WatercolorDot face, per `VISUAL-CONSTITUTION.md:91`
("Selection, activation, drag and keyboard focus belong to a named enclosing geometric
button/seat") — the constitution already ruled this and the consumer never followed.

---

### D-2 — BLOCKER — The four-arc quartet can never be four arcs; in the default space it is one.

`MixConfigBar.vue:127-128` names the design intent: "the four-arc quartet, drawn with the user's
own colors (current space, candidate arc)". Four rows, four labels, four ramps.

Hue interpolation is applied only when the mixing space has a hue channel:

```
src/color/anchors.ts:360-366
export const HUE_INDEX = { hsl: 0, hsv: 0, hwb: 0, lch: 2, oklch: 2 } as const;

src/color/operations.ts:101-111
const hueIndex = HUE_INDEX[options.space as keyof typeof HUE_INDEX];
…
        if (i === hueIndex) { … const mixed = interpolateHue(a, b, progress, options.hue);
```

`INTERPOLATION_SPACES` (`demo/color-session/color-space-meta.ts:26-36`) offers nine spaces, four
of which — `oklab`, `lab`, `rgb`, `xyz` — have no hue index. For those the `hue` option is a
total no-op. Running the shipped sampler algorithm verbatim against the shipped library:

```
$ node /tmp/pr_probe3.mjs        # operands #e11d48 → #0ea5e9
space      | distinct hue-ramps out of 4 | identical?
oklch      |  2  | differ
oklab      |  1  | *** ALL FOUR IDENTICAL ***
lab        |  1  | *** ALL FOUR IDENTICAL ***
lch        |  2  | differ
hsl        |  2  | differ
hsv        |  2  | differ
hwb        |  2  | differ
rgb        |  1  | *** ALL FOUR IDENTICAL ***
xyz        |  1  | *** ALL FOUR IDENTICAL ***
```

**The app's default space is `oklab`** — `demo/workbenches/mix/composables/useMixingState.ts:44`,
`const colorSpace = ref<PickerSpace>("oklab")`, confirmed visually in both Safari `/mix`
screenshots. So in the shipped default configuration all four Hue-method rows would paint the
identical ramp, and the Hue-method `Select` (`MixConfigBar.vue:122-139`, no `:disabled` binding)
remains a live, enabled, four-option control that provably cannot change the result.

And even in the five polar spaces the quartet is never four. `increasing`/`decreasing` are
`shorter`/`longer` re-labelled, with the pairing flipping on the sign of the hue delta:

```
$ node /tmp/pr_probe4.mjs
oklch  #e11d48→#0ea5e9  distinct=2  groups=shorter=decreasing  longer=increasing
oklch  #0ea5e9→#e11d48  distinct=2  groups=shorter=increasing  longer=decreasing
oklch  #ff0000→#00ff00  distinct=2  groups=shorter=increasing  longer=decreasing
oklch  #111111→#eeeeee  distinct=1  groups=shorter=longer=increasing=decreasing
hsl    #808080→#7f7f80  distinct=2  groups=shorter=decreasing  longer=increasing
…
```

Achromatic or near-achromatic operands (`#111111→#eeeeee`) collapse all four to one in every
space, polar included.

So the truthful count of distinct previews in the Hue menu is: **1** (non-polar space, or
achromatic operands) or **2** (polar space, chromatic operands). Never 3. Never 4.

**Design reading.** This is the purest design defect in the component's deployment. A preview
exists to differentiate; four identical previews next to four different labels actively teach the
user a falsehood — that the four arcs are four things. `VISUAL-CONSTITUTION.md:194` demands
"Preset and harmony expose truthful previews"; `PROPORTION-AUDIT.md:70` (§5.5) requires a small
mark to be "data, status, labeled action, drag affordance, focus/selection register or removed" —
four copies of one datum are not data, they are decoration with a caption.

**Cure (architectural transposition).** The hue menu is the wrong shape. The polar-ness of the
selected space is a *fact of the space*, and the arc-direction quartet is a *fact of the operand
pair*. The menu should be derived from both:

1. `INTERPOLATION_SPACES` gains a `polar: boolean` (it is already the `HUE_INDEX` keyset; there is
   exactly one true source and it lives in the library). When the selected space is non-polar the
   Hue-method row is disabled with a named reason — the control disappears from the tab order and
   the preview lane says why, rather than showing four lies.
2. In a polar space, the two distinct trajectories are shown as two, with the direction named for
   the current pair ("Shorter — counter-clockwise for these colors"), so `increasing`/`decreasing`
   are exposed as the *orientation restatement* they are rather than as two more arcs.

That is a subtraction, and it resolves the defect at the vocabulary rather than in the chip.

---

## 3. MAJOR defects

### D-3 — MAJOR — "One golden plate (φ² ≈ 2.618rem)" is φ² at no viewport the app ships.

`PreviewRamp.vue:43-44` sets `inline-size: 2.618rem` and `block-size: 1em`, and comments the pair
"one golden plate — φ² × 1em (F7)". The φ² relation holds only where the inherited font-size
equals the root font-size. It never does: the chip sits in an untyped wrapper inheriting the
SelectItem's fluid `text-dropdown` rung. The width is root-relative and viewport-invariant; the
height is font-relative and fluid. The aspect ratio is therefore a function of viewport width.

```
$ node /tmp/pr_live7.mjs        # real /#/mix, Color-space menu open, chip injected per row
viewport        lane font-size   chip W      chip H     aspect    error vs φ²
desktop-1440    16.4px           41.875px    16.391px   2.5548    −2.41 %
mobile-390      14px             41.875px    14.000px   2.9911    +14.25 %
mobile-320      14px             41.875px    14.000px   2.9911    +14.25 %

$ node /tmp/pr_states.mjs
zoom-200        14.6px           41.88px     14.59px    2.869     +9.6 %
```

φ² = 2.6180339887. The rendered plate is off by 2.4 % on desktop and **14.25 % on both mobile
arms** — a proportion error an eighth of the way to 3:1, in a component whose entire proportional
identity is the golden plate.

`PROPORTION-AUDIT.md:73` (§5.8) is exactly on point: *"Real rendered relation wins over token
intent. Adjacent rungs, measured rects and ink gaps appear in DELTA; token presence alone cannot
close a row."* The `2.618` literal is token intent; 2.9911 is the rendered relation.

**Cure.** One unit family, one sized axis. `block-size: 1em; inline-size: calc(1em * 2.618)`, or
better `block-size: 1em; aspect-ratio: 2.618;` — the ratio then holds by construction at every
clamp arm and cannot drift when the type rung is retuned.

### D-4 — MAJOR — The chip does not join the line it claims to join, and it sets the row's height.

`PreviewRamp.vue:9` — "the chip joins the description line — height 1em". It does not. The
description text is `text-micro` at **11px / 13.75px line-height, Plus Jakarta Sans**; the chip
inherits **16.4px** from `<span class="flex items-center gap-2">` (`MixConfigBar.vue:110`), an
untyped wrapper carrying the SelectItem rung. Measured:

```
$ node /tmp/pr_live6.mjs   (desktop 1440)
"descFontSize": "11px", "descLineHeight": "13.75px", "descFamily": "Plus Jakarta Sans",
"chipComputed": { "blockSize": "16.3906px", "fontSize": "16.4px" },
"chipCenterY": 535.38, "descLineBoxCenterY": 535.38
```

The chip is **19 % taller than the line box it annotates** and, being the tallest flex child, it
*defines* that line box. Injecting the chip into all nine rows and measuring before/after:

```
$ node /tmp/pr_live7.mjs   (desktop 1440, 9 options)
laneHeight:   before 13.75 → after 16.39   (delta +2.64px)
optHeight:    before 52.36 → after 55.00   (delta +2.64px)
menuHeight:   384 → 384                    (max-height clamp; content overflows further)
```

Nine rows × 2.64px ≈ **23.8px of extra content inside a 384px-capped scroller** — roughly half an
option row of visible list, spent by an `aria-hidden` ornament. The row grows for decoration.

`PROPORTION-AUDIT.md:72` (§5.7): *"Visual glyph size, operable target size and layout reservation
are separate quantities."* Here they are one quantity, and the ornament is the one setting it.

(Vertical centring itself is exact — chip centre and description line-box centre coincide at
535.38px. The defect is scale, not alignment.)

**Cure.** Size the plate from the type rung it belongs to. The chip should be a child of the
`text-micro` span (or take `font-size: inherit` from it) so `1em` means *the description's em*,
and the lane's block size should be reserved from type, never from the ornament.

### D-5 — MAJOR — `forced-colors` annihilates the chip. No fallback, no substitute, no coverage.

Measured under Chromium `forcedColors: "active"` on the live route:

```
$ node /tmp/pr_states.mjs
"forced-colors": {
   "w": 41.88, "h": 16.39,                    ← still occupies layout
   "bgImage": "none",                          ← the entire ramp, gone
   "bgColor": "rgba(255, 255, 255, 0)",
   "boxShadow": "NONE (forced away)",          ← the hairline ring, gone
   "forcedColorAdjust": "auto"                 ← never set to none
}
```

100 % of the chip's information is colour; 100 % of it is removed; and because the element is
`aria-hidden="true"` (`PreviewRamp.vue:33`) there is no text substitute either. What survives is
a **41.88 × 16.39px invisible void that still inflates every description row by 2.64px** (D-4).
The design's answer to forced colors is an empty rectangle plus a layout tax.

This state was never examined: the visual matrix's `forced-colors-desktop` set covers exactly
five routes —

```
$ ls docs/tranches/V/megatranche/audit/visual/shots/forced-colors-desktop/
adminusers.png  blob.png  browse.png  gradient.png  picker.png
```

— and `/mix` is not among them. `VISUAL-CONSTITUTION.md:82,84,90` require rendered contrast on
the actual tier and *nonzero* forced-colors deltas for state-bearing marks; nothing here was
measured against that.

**Cure.** The chip depicts colour rather than branding a surface — the same exemption
`VISUAL-CONSTITUTION.md:23` grants "chromatic specimens and data-bearing WatercolorDots". It
should claim it explicitly: `forced-color-adjust: none` on the plate, plus a
`@media (forced-colors: active)` boundary drawn in a system colour so the plate keeps an edge.
That is one declaration and one media block, and it is the difference between a specimen and a
hole.

### D-6 — MAJOR — The hairline ring fails its own stated job by ≈2.4×.

`PreviewRamp.vue:46-48` — "The inset hairline ring (F7/F8): designed color out-ranks bleed" and
`:10-12` — "an inset hairline ring (`--foreground` 12%) so light chips survive light glass, dark
chips dark glass". Measured tokens on the live route:

```
$ node /tmp/pr_live6.mjs
light  "ringShadow": "oklab(0.216128 0.00350075 0.00518669 / 0.12) 0 0 0 1px inset"
       "menuBg":     "oklab(0.955857 0.0095643 0.0296614 / 0.7488)"
       "fgToken":    "light-dark(hsl(24 10% 10%), hsl(30 14% 90%))"
dark   "ringShadow": "oklab(0.925196 0.00238398 0.00574207 / 0.12) 0 0 0 1px inset"
       "menuBg":     "oklab(0.398985 0.0137168 0.032461 / 0.845248)"
```

Composited and scored (`$ node -e …`, WCAG 2.x relative-luminance formula):

```
--foreground light hsl(24 10% 10%) = [28,25,23]   dark hsl(30 14% 90%) = [233,230,226]

LIGHT, ring 12% --foreground over a WHITE chip stop:  ring px [228,227,227]  contrast 1.281:1
DARK,  ring 12% --foreground over a BLACK chip stop:  ring px [ 28, 28, 27]  contrast 1.231:1
LIGHT, white chip vs menu surface:                                           contrast 1.150:1
LIGHT, ring       vs menu surface:                                           contrast 1.114:1

WCAG 1.4.11 non-text floor = 3.0:1
```

A white ramp end on the light menu reads **1.150:1** against the surface — invisible — and the
ring meant to rescue it reads **1.114:1** against that same surface. The exact failure the
docstring claims to have solved is the failure that is shipping. Both schemes fail the 3:1
non-text floor by roughly 2.4×.

**Cure.** A 12 % single-tone ring cannot bound an arbitrary colour against an arbitrary
translucent glass — the problem is scheme-symmetric and the answer must be too. Draw the boundary
as a two-tone hairline (an inner `--background`-derived stroke and an outer `--foreground`-derived
stroke, each ≥ the alpha that clears 3:1 against its own neighbour), the same construction
glass-ui already uses on `.watercolor-swatch` (`inset 0 0 6px …background 35%…, inset 0 -2px 4px
…foreground 6%…, 0 2px 6px …foreground 10%…`). One ring, both schemes, no per-scheme override.

### D-7 — MAJOR — `.preview-chip` is two independent copies of one grammar.

The module's own charter, `demo/color-session/color-chips/index.ts:2-4`: *"born colocated, E-1:
ONE focused common module for the multi-feature chip grammar, never a per-pane copy."* The copy is
inside the module. Enumerating the live stylesheets:

```
$ node /tmp/pr_live6.mjs
"chipRulesFound": 2,
"chipRules": [
 ".preview-chip[data-v-137069d9] { display: inline-block; flex: 0 0 auto; inline-size: 2.618rem;
    block-size: 1em; border-radius: var(--radius-sm); box-shadow: inset 0 0 0 1px
    color-mix(in oklab, var(--foreground) 12%, transparent); }",
 ".preview-chip[data-v-f149a66f] { display: inline-flex; flex: 0 0 auto; inline-size: 2.618rem;
    block-size: 1em; border-radius: var(--radius-sm); overflow: hidden; box-shadow: inset 0 0 0 1px
    color-mix(in oklab, var(--foreground) 12%, …" ]
```

`137069d9` is `PreviewRamp.vue:40-49`; `f149a66f` is `PreviewStrip.vue:56-65`. Both are `<style
scoped>`, so the shared class name binds nothing — five declarations are duplicated verbatim and
must be kept in sync by hand. A shared name that is not shared is worse than two different names:
it advertises a single owner for the F7 plate where none exists. Every cure in this report (D-3's
unit fix, D-5's forced-colors block, D-6's ring) has to be written twice and can silently diverge.

Owner edict 1 (focused modules with real encapsulation) and edict 5 (root-level styling, never
per-instance) both land here.

**Cure.** The F7 plate is one object. Hoist the five shared declarations to a single unscoped
`.preview-chip` rule owned by the module (a sibling `chip.css` imported by both), leaving each
component only its differentia — `background-image` for the ramp, `overflow`/segment flex for the
strip. Per edict 4, the better destination is glass-ui: this is a colour-bearing primitive of the
same family as `./watercolor-dot`, and glass-ui 7 exports no equivalent (`./chip` is the tag/pill
species, not a colour plate) — so it is a legitimate producer request rather than a demo-local
invention.

---

## 4. MINOR defects

### D-8 — MINOR — An unregistered second ornamental colour-bearing species.

`VISUAL-CONSTITUTION.md:17` — the material table names "Watercolor/data | swatches, active mark,
pastel `Palettes` identity | **the only ornamental color-bearing species**". `PreviewRamp` is a
hard-edged `radius-sm` rectangular colour plate: a different silhouette language, a second
species, and it is registered nowhere in the V canon.

```
$ grep -rn "PreviewRamp\|preview chip\|preview-chip\|T-17\|golden plate" \
     docs/tranches/V/*.md docs/tranches/V/reformation/*.md
(no output)
$ grep -rn "PreviewRamp\|preview" docs/tranches/V/research/proportion-register.md
(only PR-09/PR-10/PR-16 rows, all about route-level preview *stages*, none about the chip)
```

`PROPORTION-AUDIT.md:25` (§3): *"One row exists for every route-level region and every repeated
card/header/title/readout/space/padding/divider/icon/button/**ornament**/status/drag/focus
species."* `PROPORTION-AUDIT.md:83` (§6): *"W18 cannot complete while any register row lacks a
terminal verb/owner."* A missing row is strictly worse than a verbless one. The chip's only
governing authority is the superseded T-era `t-nav F6/F7/F8`, cited in the docstring
(`PreviewRamp.vue:3,9-12`) and nowhere in the constitution in force.

**Cure.** A register row with a terminal verb, or adoption into the WatercolorDot family so the
"only ornamental colour-bearing species" claim stays true.

### D-9 — MINOR — O-14's own doctrine is re-admitted between samples.

`sample.ts:5-11` states the sampling law: ramps are library samples *"never CSS `in <space>`
gradient interpolation, because the preview must show what THE APP computes, not what the
browser's engine would"*. `PreviewRamp.vue:25` then paints
`linear-gradient(90deg, ${stops.join(", ")})` — no `in <space>` — so between the 17 library
samples the paint is the browser's default gradient interpolation (oklab), in every row,
regardless of which of the nine candidate spaces the row is previewing. Sixteen of seventeen
segments of the chip's width are browser math in a component whose module forbids browser math.

Measured deviation at each segment midpoint, painted pixel vs a direct `mixColors` recompute at
the same `t` (RGB Euclidean, 0–255 scale, chip rendered at 100× width for sampling precision):

```
$ node /tmp/pr_o14b.mjs        # operands #e11d48 → #0ea5e9, 17 stops
hsl/longer    worst 15.6 at segment 5   painted 217,216,23   library 228,227,24
hsv/longer    worst 15.6 at segment 5
oklch/longer  worst  5.1 at segment 8   painted  89,162,10   library  88,162, 5
```

The magnitude is small — 17 samples across 41.9 CSS px is dense — so this is MINOR, not a
blocker. But the e2e guard checks only the stop *list*
(`o14-preview-truth.spec.ts:360-392`, `painted.length === stamped.length` plus per-component
equality of the declared stops), so the forbidden mechanism is present, unmeasured, and invisible
to the oracle that exists to forbid it.

**Cure.** Choose one. Either paint hard segments like `PreviewStrip` and the divergence is
identically zero (and the two components collapse toward one), or state honestly in the docstring
that the chip is a 17-sample approximation whose inter-sample paint is the UA's, and add a
midpoint leg to the oracle with a declared tolerance.

### D-10 — MINOR — A dead guard, and the absence law owned in two places.

`PreviewRamp.vue:31` — `v-if="stops.length >= 2"` — can never evaluate false. `sample.ts:69`
computes `perSegment = Math.max(2, Math.ceil(k / segments) + 1)` and segment 0 pushes `perSegment`
stops, so the sampler returns either `null` or an array of length ≥ 2. The host already guards
`v-if="spaceRamps.get(s.value)"` (`MixConfigBar.vue:111`) and
`v-if="hueRamps.get(m.value)"` (`:133`). Two guards, one reachable — a masking fallback, owner
edict 2. The "honest absence" law therefore has two owners and no owner.

**Cure.** Delete the unreachable `v-if` and let the sampler's `null` be the single absence
authority — which is exactly what D-1's cure needs anyway, since the absence state must be *drawn*
by one component rather than silently skipped by two.

### D-11 — MINOR — RTL is undesigned.

`PreviewRamp.vue:25` hardcodes `linear-gradient(90deg, …)` — a physical angle — in a component
that is otherwise scrupulously logical (`inline-size`, `block-size`). The file contains no `[dir]`
handling and the V canon records no direction ruling for the ramp;
`VISUAL-CONSTITUTION.md:150-154` (§6.1) requires one per domain. `PreviewStrip` has the same shape
plus a physically-anchored truncation mask (`PreviewStrip.vue:74`,
`mask-image: linear-gradient(90deg, black 20%, transparent 95%)`) that fades the visual right
regardless of reading direction.

*Labelled hypothesis, not verified:* in RTL the operand rack (a `flex` row, `MixSourceSelector.vue:
121`) reverses while the ramp does not, so the ramp's operand order would read against the rack's.
My RTL probe could not confirm this — setting `dir="rtl"` on `documentElement` after hydration did
not flip the portaled listbox's computed direction (`$ node /tmp/pr_states.mjs` → `"rtl": { "dir":
"ltr" }`), so the rendered consequence is unproven. The *absence of a decision* is the finding and
is proven from source.

### D-12 — INFO — Test scaffolding ships in the production DOM.

`PreviewRamp.vue:34` stamps `:data-stops="stampStops(stops)"` — the full 17-stop OKLCh
serialization, joined by `|`, roughly 500 bytes per chip and ~6.5 KB across the 13 possible
instances — purely so the vitest oracle and the e2e leg have a referent (`sample.ts:15-19`). It is
deliberate and it is the O-14 mechanism, so it is INFO rather than a defect; but it is
observability shipped to every user, and it deserves an explicit ruling rather than inheritance
from the T tranche.

---

## 5. Motion

No defect. The docstring's claim (`PreviewRamp.vue:14`, "Static paint — no motion, PRM-neutral")
is **true and verified**. The component declares no `animation`, no `transition`, no `@keyframes`;
it animates no property, layout-forcing or otherwise. Under `reducedMotion: "reduce"` the rendered
geometry and paint are byte-identical to baseline:

```
$ node /tmp/pr_states.mjs
"baseline":       { w: 41.88, h: 16.39, aspect: 2.555, bgImage: "linear-gradient(90deg, …)", … }
"reduced-motion": { w: 41.88, h: 16.39, aspect: 2.555, bgImage: "linear-gradient(90deg, …)", … }
```

Owner edict 6 (animations are never deleted, only moved or tokenized) is not engaged — there was
never an animation here to move.

---

## 6. Negative proofs — what is genuinely right

Recorded so this report is not read as uniform condemnation, and so a later seat does not re-open
settled ground.

1. **Vue 3.5 idiom is correct.** `const { stops } = defineProps<{ stops: readonly string[] }>()`
   (`:19-22`) is reactive props destructure, used properly. No `defineModel` round-trip exists, so
   no `shallowRef` cache is warranted. No template ref is needed, so `useTemplateRef`'s absence is
   correct rather than an omission.
2. **`verbatimModuleSyntax` is clean.** Both imports (`:16-17`) are value imports (`computed`,
   `stampStops`); there is no type-only import to mis-declare. Owner edict 8 satisfied.
3. **No god module, no legacy path, no contrivance.** 50 lines, one job, one prop, one computed.
   No alias, no shim, no dual path, no new `shared/` directory, no wrapper component. Owner edicts
   1, 2 and 3 satisfied by the file itself (D-7's duplication is a module-boundary failure, not a
   god-module failure; D-10's dead guard is the one masking-fallback trace).
4. **The rest-cost claim holds.** `MixConfigBar.vue:20-22` asserts the sampling "costs nothing at
   rest" because reka unmounts `SelectContent` when closed. `spaceRamps`/`hueRamps` are Vue
   `computed` (`:57-74`), which are lazy and untracked while unrendered; nothing else reads them.
   True as written.
5. **Vertical centring is exact.** Chip centre and description line-box centre coincide to the
   measured hundredth of a pixel (535.38 / 535.38). The `items-center` choice is right; only the
   chip's *scale* is wrong (D-4).
6. **The sampler is honest about what it is.** `sample.ts` takes zero new colour math — parsing
   rides `parseColorIn`, sampling rides `mixColors`, serialization rides `colorToCss` — and its
   joint-dedup (`:74`) is correct: I verified stop spacing stays uniform at 2, 3, 5, 7, 10 and 12
   operands, so the gradient's equal-position distribution matches the sample parameterization.
   D-9 is about the paint *between* samples, not about the samples.

---

## 7. Defect table

| ID | Severity | Defect | Mechanism family |
|---|---|---|---|
| D-1 | BLOCKER | Zero instances render; own O-14 oracle RED on both positive legs | producer-contract rot |
| D-2 | BLOCKER | The four-arc quartet is at most 2 arcs, and 1 in the default space | preview untruth |
| D-3 | MAJOR | `rem` width × `em` height — φ² holds at no shipping viewport | unit-family mismatch |
| D-4 | MAJOR | Chip 19 % taller than the line it "joins"; sets the row height | reservation conflation |
| D-5 | MAJOR | `forced-colors` erases paint + ring; no fallback, no coverage | state never designed |
| D-6 | MAJOR | 12 % ring reads 1.28:1 / 1.23:1 vs a 3:1 floor | contrast by token-faith |
| D-7 | MAJOR | `.preview-chip` duplicated across two scoped stylesheets | false shared primitive |
| D-8 | MINOR | Unregistered second ornamental colour-bearing species | canon gap |
| D-9 | MINOR | Browser interpolation re-admitted between the 17 samples | doctrine leak |
| D-10 | MINOR | Unreachable `v-if`; absence law owned twice | masking fallback |
| D-11 | MINOR | Physical `90deg` with no direction ruling | direction undesigned |
| D-12 | INFO | `data-stops` ships test scaffolding to production DOM | observability cost |

## 8. Reproduction index

All probes are read-only against the live dev server (`http://localhost:9000`) or the built
library in `dist/`. No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified.

| Probe | Proves |
|---|---|
| `/tmp/pr_probe3.mjs` | D-2 — per-space distinct-ramp counts |
| `/tmp/pr_probe4.mjs` | D-2 — the shorter/longer ≡ increasing/decreasing collapse |
| `/tmp/pr_live3.mjs` | D-1 — 9 options, 0 chips, `<!--v-if-->` in the lane |
| `/tmp/pr_live5.mjs` | D-1 — add-slot geometry, `pointer-events`, real click = 0 operands |
| `/tmp/pr_paths.mjs` | D-1 — every add path enumerated and dead |
| `/tmp/pr_pe.mjs` | D-1 — CDP: `pointer-events:none` is an inline style |
| `/tmp/pr_live6.mjs` | D-3/D-4/D-6/D-7 — geometry, type rungs, ring/menu colours, duplicate rules |
| `/tmp/pr_live7.mjs` | D-3/D-4 — aspect at 1440/390/320, lane and row height deltas |
| `/tmp/pr_states.mjs` | D-5, §5 — forced-colors, reduced-motion, 200 % zoom, RTL |
| `/tmp/pr_o14b.mjs` | D-9 — painted pixel vs library truth at segment midpoints |
| `npx playwright test … -g "T-17 chip referent"` | D-1 — 2 failed, 1 vacuously passed |
