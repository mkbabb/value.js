# CHALLENGE-D — `picker/controls/ComponentSliders/ComponentSliders.vue`

**Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
**Subject:** `demo/picker/controls/ComponentSliders/ComponentSliders.vue` (395 LoC)
**Repo/base:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
**Verdict: DEFECTIVE** — 9 MAJOR/BLOCKER, 4 MINOR, 2 INFO, 1 labelled hypothesis.

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this seat
was explicitly spawned with. The seat is declared, not inherited.

## Coordination-boundary check (§D pin)

```
$ shasum -a 256 demo/picker/controls/ComponentSliders/ComponentSliders.vue
a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327  demo/picker/controls/ComponentSliders/ComponentSliders.vue
```

Matches `CARRY-LEDGER.md:67` byte-for-byte. **NO DRIFT.** The file is untouched since the
2026-07-22 pin. This report writes only under
`docs/tranches/V/megatranche/audit/components/picker-componentsliders/`; no source edit landed.

## Evidence base

| Source | What it gave |
|---|---|
| `docs/tranches/V/megatranche/audit/visual/REPORT.json` — 4 Safari matrices × route `/#/` | tap-target rows, a11y names, overflow, console/page errors |
| `frames/desktop-1440-focus.png`, `frames/mobile-390-focus.png` | rendered composition, light |
| `frames/forced-colors-console.png`, `frames/forced-colors-rail-focused.png` | forced-colors state loss |
| `frames/D-hex-empty-meters.png`, `frames/D-oklch-ragged-track.png`, `frames/D-rtl-meter-align.png` | captured by this seat (Playwright/Chromium, DPR 2, live dev server) |
| `scratchpad/CSD-probe{,2,3,4,5}.mjs` → `CSD-out{,2,3}.json` | 6 render matrices + a 9-space sweep + cascade + RTL measurements |

All measurements below are from the live dev server at `http://localhost:9000` unless a
`REPORT.json` row is cited.

---

## Findings

### D-1 · BLOCKER — the "ONE container-scaled rhythm law" is a two-state step function with structurally unreachable ceiling arms

`ComponentSliders.vue:318-333` retires a "hard `<lg` band switch" for "ONE container-scaled law
serving BOTH breakpoints … the rhythm is a smooth function of width, never two hand-tuned states":

```css
.channel-rows  { row-gap:        clamp(0.375rem, 1.5cqi, 0.5rem);   }
.channel-strip { min-block-size: clamp(2rem,     7cqi,   2.625rem); }
```

The `cqi` container is `.pane-wrapper` (`demo/styles/shell.css:83`, `container-type: inline-size`).
That container is **itself clamped**: `--pane-max: 32rem` (`demo/styles/foundation.css:441`), and
`demo/DESIGN.md:358` records the grid as `max-width: min(100vw − 2·--app-padding-x, 2·--pane-max +
--pane-gap)`.

Measured `.pane-wrapper` inline-size and the resolved rhythm:

| viewport | container | `7cqi` | `min-block-size` | `1.5cqi` | `row-gap` | arm |
|---|---|---|---|---|---|---|
| 1440 | **512.00** | 35.84 | **35.84px** | 7.68 | **7.68px** | fluid |
| 3440 | **512.00** | 35.84 | **35.84px** | 7.68 | **7.68px** | fluid (identical) |
| 390 | 358.00 | 25.06 | **32.00px** | 5.37 | **6.00px** | floor |
| 390 coarse | 358.00 | 25.06 | 32.00px (rows 44 via `::before`) | 5.37 | **6.00px** | floor |
| 320 | 288.00 | 20.16 | **32.00px** | 4.32 | **6.00px** | floor |

Three consequences, all measured:

1. **The ceilings are dead constants.** `2.625rem` (42px) needs a 600px container; `0.5rem` (8px)
   needs 533px. `--pane-max` caps the container at 512px. **Neither ceiling is reachable at any
   viewport.** Half of each clamp is unexecutable code.
2. **The fluid arm is viewport-invariant on desktop.** 1440 and 3440 produce byte-identical
   35.84px / 7.68px because the container stops growing at 1024-ish and never moves again.
3. **The discontinuity the regime was authored to kill still exists.** The shipped rhythm has
   exactly two values — 35.84/7.68 (desktop) and 32/6 (every phone width) — switching at the
   pane-layout breakpoint. The amplitude fell from the comment's stated 1.83× to **1.12×**; the
   *step* did not become a *function*. The comment's claim ("never two hand-tuned states") is
   falsified by its own output.

Against `VISUAL-CONSTITUTION.md §3.7`: "Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile." The fork survives; only its disguise
changed. And `PROPORTION-AUDIT.md §5.8`: "Real rendered relation wins over token intent … token
presence alone cannot close a row" — a `cqi` clamp is token intent; 35.84/32 is the rendered
relation.

**Cure (transposition, not patch).** The row rhythm is not a function of the pane container — that
container is a clamped constant, so the whole `cqi` apparatus is a no-op dressed as fluidity. The
row is a function of *the control it houses*: track height plus air. Delete both clamps and derive
the row from the instrument metric —

```css
.channel-strip { min-block-size: calc(var(--slider-track-block) + 2 * var(--console-row-air)); }
```

— with `--slider-track-block` fed by the producer (see D-2) and `--console-row-air` a glass-ui
spacing rung. If two densities are genuinely wanted, they are a named `density` rung on the
producer `Slider`/`Card`, declared once, not a clamp that pretends to be continuous. The same
clamp is copy-duplicated at `demo/scenes/ConfigSliderPane.vue:216` — one home, not two.

---

### D-2 · BLOCKER — the drag thumb is a 12px-wide target in every matrix; the coarse-pointer hit extension enlarges the wrong element

Measured `[role="slider"]` bounding rects:

| matrix | thumb w × h | `::before` on `.channel-slider` |
|---|---|---|
| desktop 1440 | **12 × 24** | `content: none` (not applied) |
| desktop 3440 | **12 × 24** | `content: none` |
| narrow 320 | **12 × 24** | `content: none` |
| mobile 390, fine pointer | **12 × 24** | `content: none` |
| mobile 390, **coarse** | **12 × 44** | `content: ""`, `height: 44px`, `position: absolute` |
| forced-colors 1440 | **12 × 24** | `content: none` |

WCAG 2.2 SC 2.5.8 (AA) minimum target size is **24 × 24 CSS px**. The inline axis is 12px in
*every* matrix — including the coarse one the mechanism exists for. Independently corroborated by
the shipped visual matrix: `REPORT.json` lists all four channel thumbs under `smallTapTargets` in
**all four Safari matrices**, e.g.

```json
{"w": 12, "h": 24, "tag": "span", "label": "L channel"}      // safari-desktop-light /#/
{"w": 12, "h": 44, "tag": "span", "label": "ALPHA channel"}  // safari-mobile-dark  /#/
```

The mechanism at `:345-357` is aimed at the wrong node and the wrong axis:

```css
@media (pointer: coarse) {
  .channel-slider::before { inset-inline: 0; block-size: max(100%, var(--dock-touch-target, 2.75rem)); }
}
```

It is on the **SliderRoot**, and it grows only the **block** axis. It therefore enlarges the
*track-tap* zone (a press there is a value **jump**), never the *thumb-drag* zone (a press there is
a **grab**). Measured proof of the miss: under coarse emulation the thumb height went 24 → 44 while
the width stayed **12**.

The comment at `:335-344` asserts the rung is "preserved by HIT-AREA EXTENSION, **not row
inflation** … so the mobile rows read tighter than a 44px row while the tap ergonomics hold."
Measured, the inverse holds on both counts: the desktop row *is* inflated (35.84px row around a
24px control, **+49% of dead block**, and no extension at all on fine pointers) and the ergonomics
do *not* hold (12px inline). `PROPORTION-AUDIT.md §5.7` — "Visual glyph size, operable target size
and layout reservation are separate quantities" — is exactly the law being violated: all three
quantities were conflated into one pseudo-element on the wrong box.

**Cure.** Thumb geometry is a producer concern; a consumer pseudo-element cannot resize a node it
does not own. `Slider` must expose a density/thumb rung whose coarse arm is ≥24px inline (44
preferred) **at the root**, and this consumer deletes `::before` outright. **BLOCKED-ON-GLASS-V8.**

---

### D-3 · MAJOR — two different accessible names for the same control, from two code paths one directory apart

Measured `aria-label` vs `aria-valuetext` on the same thumb, every space:

| space | `aria-label` (template) | `aria-valuetext` (composable) |
|---|---|---|
| lab | `A channel` | `a axis 88.8` |
| lab | `ALPHA channel` | `Alpha 82.7%` |
| oklch | `H channel` | `Hue 359.0deg` |
| hwb | `W channel` / `B channel` | `Whiteness 10%` / `Blackness 10%` |

`ComponentSliders.vue:63` hand-rolls the name:

```
:aria-label="`${component.toUpperCase()} channel`"
```

while the correct, space-disambiguated human name already exists **in the same directory** and is
already imported by the sibling composable —
`composables/sliderAnnouncement.ts:60-66`, `channelLabel(space, component)`, whose own module doc
(`:11-14`) explains precisely why the bare key is wrong: "`b` is Blue in rgb, Blackness in hwb, and
the b* axis in lab/oklab."

An AT reads name-then-value: **"A channel, a axis 88.8."** The component's own stated doctrine —
"one voice, zero new state" (`:44`), "ONE voice" (`:149`) — is broken by the component, in the one
place a user actually hears it. `VISUAL-CONSTITUTION.md §7` requires the slider expose "the
identical channel name/value/unit"; the value half complies, the name half does not.

**Cure.** `:aria-label="channelLabel(currentColorSpace, component)"`. Delete `toUpperCase()`. One
name function, one voice. Not glass-blocked.

---

### D-4 · MAJOR — the meter's `min-width: 6ch` under-reserves the widest legal string, and the overflow lands on the *control*: the instrument's rows are visibly unequal

`ComponentSliders.vue:309-316` reserves `min-width: 6ch`. Measured across a 9-space sweep at 1440:

| space | widest meter | rendered meter w | reserved | **track w (that row)** | siblings |
|---|---|---|---|---|---|
| lab | `-125.0` (6) | 53.11 | 53.09 | 339.42 | 339.44 — spread **0.02px** |
| lch | `359deg` (6) | 53.11 | 53.09 | 338.64 | 338.66 — spread **0.02px** |
| **oklch** | **`359.0deg` (8)** | **70.80** | 53.09 | **320.95** | 338.66 — spread **17.71px** |
| rgb / hsl / hsv / hwb / xyz | ≤6 | 53.09 | 53.09 | — | spread ≤0.01px |

In oklch the hue row's track is **17.71px (5.2%) shorter than its three siblings**. The rows are
ragged. Witnesses: `frames/D-oklch-ragged-track.png` (LTR — the `h` ramp visibly stops short of
`L`, `C`, `α`) and `frames/D-rtl-meter-align.png` (RTL — same defect, mirrored).

`VISUAL-CONSTITUTION.md §4`: "Live numbers use tabular figures and **reserve their widest legal
representation so value changes never reflow the settled chassis**." Here the reservation is
breached and the reflow is absorbed by the *slider*, i.e. by the instrument's signal region — the
worst possible place to put it, because the track's pixel length **is** the channel's resolution.

The aggravating fact: a real, derived, per-space reservation table already exists and **this very
file imports from it** — `readoutReservation.ts`, whose header documents a `ch` derivation
"STATIC, derived at module scope from the library's own `COLOR_SPACE_RANGES` +
`COLOR_SPACE_DENORM_UNITS` — no ResizeObserver, no runtime measurement, no nudged constants"
(`:17-19`). `ComponentSliders.vue:100` imports `readoutDecimals` from it and then ignores the
adjacent machinery in favour of a nudged constant `6ch`.

**Cure.** The meter's reservation must come from the same per-(space, channel) derivation that owns
the least count, so format and lock can never disagree — export `readoutCh(space, component)`
beside `readoutDecimals` and feed `min-inline-size` from it. Delete the `6ch` constant. Not
glass-blocked.

---

### D-5 · MAJOR — `hex` is an undesigned state that ships: four sliders with a permanently blank readout and a valueless announcement

Measured at `?space=hex&color=%23ff8000`:

```
space=hex  consolePresent=true  rows=4
  track=337.30  meter=''  label='R channel'      aria-valuetext='Red'
  track=337.30  meter=''  label='G channel'      aria-valuetext='Green'
  track=337.30  meter=''  label='B channel'      aria-valuetext='Blue'
  track=337.30  meter=''  label='ALPHA channel'  aria-valuetext='Alpha'
```

Witness: `frames/D-hex-empty-meters.png` — four ramps, **zero numbers**, and 53px × 4 rows of empty
reserved meter column hanging off the right edge.

Two laws fail at once. `VISUAL-CONSTITUTION.md §7`: "Its bottom annotation is **the persistent**
per-channel meter bound to the same named selected-color state as the headline" — it is not
persistent, it is absent. And the announcement degrades to a bare noun with no value: the
`sliderValueText` fallback documented as an edge guard ("Empty meter → the name alone (never an
empty announcement)", `sliderAnnouncement.ts:70-71`) fires for an **entire first-class color
space**, so a screen-reader user operating the hex console hears "Red" no matter where the thumb
goes.

The source declares this out of scope — `:157-158`, "Hex mode's single-cell map stays untouched
(its console is not this row's)." The probe falsifies that: it **is** this console, rendering four
of this component's rows.

**Cure.** hex has no per-channel model, so the console must stop claiming a readout it cannot fill.
Either the hex console reads the **rgb projection** — which is already the one voice it paints its
ramps from, so this costs no new state — or hex renders a different composition entirely (a single
hex field, per `PROPORTION-AUDIT.md §5.10`'s readout/editing separation). A persistent blank is not
a state; it is an omission with reserved space around it. Not glass-blocked.

---

### D-6 · MAJOR — forced colors: the gate's rest state paints a permanent black ring, and the ACTIVE state loses its entire delta

Measured under `forcedColors: "active"` at 1440, the five `.touch-gate-target` elements:

```
rest outline-color: rgba(0,0,0,0) , rgb(0,0,0) , rgb(0,0,0) , rgb(0,0,0) , rgb(0,0,0)
rest outline-width: 3px ×5
```

The four **channel** gates have their outline forced from `transparent` to opaque
`rgb(0, 0, 0)` **at rest**. `ComponentSliders.vue:253-257` sets `outline: 3px solid transparent` and
relies on the colour being invisible — but `outline-color` is in the forced-colors adjustment set
(CSS Color Adjust 1 §3.2), so a transparent outline becomes a *visible* one.

The active state then has nothing left. Its only two indicators are both colour-only and both
erased:

- `:261-263` `.touch-gate-active { outline-color: color-mix(in srgb, var(--foreground) 50%, transparent) }` → forced to the same `rgb(0,0,0)` the rest state now wears;
- `:266-268` `.touch-gate-active .slider-track { box-shadow: inset 0 0 0 3px … }` → `box-shadow` is forced to `none`.

⇒ **in forced colors, `touch-gate-active` is pixel-identical to rest.** Corroborated by
`frames/forced-colors-console.png`: four identical black pill rings, no state, no differentiation.

`VISUAL-CONSTITUTION.md §4.1` is explicit twice over: "Selected, failed, pending, withdrawn and
disabled states are **never color-only**" and "Focus remains visibly distinct from selection in both
schemes, **forced colors** and reduced transparency."

**Cure.** Rest must be `outline-style: none` (not a transparent colour), and the gate's active state
needs a non-colour channel — `outline-style: solid` ↔ `none`, or a producer `data-state` treatment
that survives the adjustment. The gate is also a state the *producer* Slider should own (it is a
pointer-modality affordance, not a picker concept). **Cure at the consumer is unblocked; the durable
home is the producer — BLOCKED-ON-GLASS-V8 for the transposition.**

---

### D-7 · MAJOR — the console claims the Instrument-veil tier but reveals nothing, and pays a real blur to reveal it

Measured on the console element, all matrices:

```
background-color : color(srgb 0.953656 0.920577 0.887731 / 0.443)
backdrop-filter  : blur(7px) saturate(1.4) brightness(1.02)
rect             : 469.06 × 190.33 (1440)
```

The source itself records the outcome (`:285-298`): "the landed quiet-glass α (0.50 light / 0.58
dark) read **OPAQUE** — only ~15% of the surviving field variation survives the blur … the deeper
cure — a clarity window in the PLATE behind the console so the blur has a live-field backdrop, not
the opaque cartoon plate — needs `ColorPicker.vue` (out of this lane's tree), **booked**."

`VISUAL-CONSTITUTION.md §2` rules on exactly this case: "Glass earns its blur by revealing live
content; **otherwise it is a neutral well**," and its tier table assigns *Specimen well* =
"opaque/quiet neutral stage." Confirmed visually — in `frames/desktop-1440-focus.png` and
`frames/mobile-390-focus.png` the console reads as a flat warm-cream rectangle on a pink plate; it
is a well wearing a veil, and it pays a 469×190 backdrop-filter compositing layer to do so.

The α override that chases this (D-8) is a symptom: the component is tuning a material toward a
tier it cannot occupy.

**Cure.** This is a composition ruling, not a token nudge — pick a side. Either the plate gets its
clarity window (the veil becomes earned, and the α override dies because the material is finally
doing its job) or the console adopts `surface="opaque" tier="quiet"` and *both* the α override and
the backdrop cost are deleted. It cannot stay in the middle; the middle is what produced the
override. The plate half is `ColorPicker.vue` — that pairing must be executed as one wave, not two.

---

### D-8 · MAJOR — a per-instance redefinition of a glass-ui root token, scheme-forked by a `.dark` descendant selector

```css
/* :299  */ .sliders-console      { --glass-bg-quiet: color-mix(in srgb, var(--card) 42%, transparent); }
/* :301-303 */ .dark .sliders-console { --glass-bg-quiet: color-mix(in srgb, var(--card) 50%, transparent); }
```

This redefines the design system's *quiet glass* token for one consumer element — the exact shape
edict 5 forbids ("style at the shadcn/glass root component level, never per-instance overrides").
The comment names it without flinching: "a DIRECT `--glass-bg-quiet` override on the veil element,
unambiguous across the substitution chain."

Two compounding defects: (a) it is scheme-forked by a `.dark` **descendant selector** rather than a
scheme-aware token, so every future producer change to quiet-glass α silently skips this console in
both schemes; (b) it is a downstream override of a token whose *upstream* is the same producer the
component is otherwise consuming faithfully — the substitution chain now has a consumer link in it.

**Cure.** If quiet glass is wrong for instrument surfaces, that is a producer rung — `surface="veil"`
needs a named clarity/α lever, which is precisely what `VISUAL-CONSTITUTION.md §2` promises
("denser neutral veil with **named alpha/clarity levers**"). The lever does not exist, so the
consumer forged one. **BLOCKED-ON-GLASS-V8.**

---

### D-9 · MAJOR — the whole `<style>` block is global, but only one cluster in it has a justification

`ComponentSliders.vue:238` opens `<style>` with no `scoped`. The comment at `:239-252` justifies
unscoping for the **touch-gate cluster only** — legitimately, since those selectors must reach
SpectrumCanvas/ExtractControls/PointerDebug hosts outside this SFC's `data-v-*` scope.

But the same global block then ships five names that belong to exactly one component:
`.sliders-console` (`:283`), `.channel-meter` (`:309`), `.channel-rows` (`:328`), `.channel-strip`
(`:331`), `.channel-slider` (`:346`, `:363`, `:375`, `:378-383`, `:384`). None of these has a
cross-SFC consumer; all of them are now global surface area.

The cost is already realised: `.channel-strip { min-block-size: clamp(2rem, 7cqi, 2.625rem) }` is
**duplicated verbatim** at `demo/scenes/ConfigSliderPane.vue:216`. The comment at `:326-327` even
offers the rhythm to that population — "Offered to the ConfigSliderPane population (M-34) so the
whole app has ONE rhythm source" — and the offer was declined by copy-paste. Two files now carry
the same magic clamp with no shared owner, which is how D-1's dead ceilings reach two components
instead of one. Edict 1 (no god modules / real encapsulation) and edict 3 (KISS) both bite.

**Cure.** Split by *audience*, which is the only honest axis here: a `scoped` block for the five
private names, and the genuinely-shared touch-gate cluster promoted to a named utility in
`demo/styles/` where its three consumers can see it. Then the rhythm has one home and
`ConfigSliderPane` consumes it instead of cloning it. Not glass-blocked.

---

### D-10 · MINOR — `--type-mono-caption` does not exist; the meter's type falls back to a `vw`-driven token, breaking the container-scaled law

```
$ grep -rn -- "--type-mono-caption:" demo/ node_modules/@mkbabb/glass-ui/dist/   →  0 definitions
```

Live probe confirms: `getComputedStyle(:root).getPropertyValue("--type-mono-caption")` = `""` at
every matrix. Three consumers reference the phantom, each with a **different** fallback:

| site | fallback |
|---|---|
| `ComponentSliders.vue:310` | `var(--type-caption)` |
| `demo/shell/dock/DockStatusLamp.vue:54` | `0.6875rem` |
| `demo/palettes/browser/status/ApiOfflineChip.vue:47` | `0.6875rem` |

So one nominal role renders at three sizes. Here it resolves to
`--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` (glass-ui `typography/scale.css`) — a
**viewport**-driven clamp, against `demo/styles/shell.css:79-81`: "in-card sizing rides `cqi` …
**never `vw`**. Display type rungs are the named exception (viewport-fluid clamps)." A caption
meter is not a display rung.

Measured consequence — at a **fixed 512px container**:

| viewport | container | meter font-size | meter cell w | track w |
|---|---|---|---|---|
| 1440 | 512.00 | 14.384px | 53.09 | **339.44** |
| 3440 | 512.00 | **16.000px** | **59.06** | **333.47** |

The instrument's signal region loses 5.97px to a viewport change that moved its container by zero.
Also a masking fallback for a token that does not exist (edict 2).

**Cure.** `VISUAL-CONSTITUTION.md §4` names the role class: `text-mono-small`, or `mono-caption`
"where the content is a caption." Use the class, delete the raw `font-size` var, and retire the
phantom token's three fallbacks in one sweep. Not glass-blocked.

---

### D-11 · MINOR — RTL: the numeric column uses physical `text-align: right`, so its alignment edge flips to the wrong side

Measured at 390 with `document.documentElement.dir = "rtl"`:

```
rail  x=310.0 w=31.7   (mirrors correctly — right side)
track x= 98.2 w=198.8
meter x= 45.3 w=44.9   text-align: "right"
```

The meter box mirrors to the left correctly, but `:314` `text-align: right` is physical, so the
digits stay flush **right** — flush against the tracks, ragged against the card edge. In LTR they
are flush against the card edge. The optical column inverts: numbers crowd the instrument and rag
on the boundary. Witness `frames/D-rtl-meter-align.png`.

`VISUAL-CONSTITUTION.md §6.1`: "chrome, navigation and layout | logical inline/block direction
follows the document." (§5.2's physical-axis carve-out covers *scientific coordinate meaning*, not
the alignment of a label column.) The file is otherwise logical throughout — `min-block-size`,
`inset-inline`, `block-size` — making `text-align: right` (`:314`) and `min-width` (`:313`) the two
physical holdouts in a logical stylesheet.

**Cure.** `text-align: end`, `min-inline-size`. Not glass-blocked.

---

### D-12 · MINOR — the meter inks the raw CSS unit token `deg`

Measured: `359.0deg` (oklch), `359deg` (lch/hsl/hsv/hwb). The announcement module's own
documentation promises the sign — `sliderAnnouncement.ts:5`, "Hue 210°". Shipped, it is
`Hue 359.0deg`. `%` already renders as a sign in the same column (`92.0%`, `82.7%`), so the meter
is internally inconsistent about whether it speaks display notation or CSS serialization. It also
costs two characters of reservation, which is the proximate trigger for D-4's ragged track.

**Cure.** The meter is a display voice; unit rendering belongs in the same formatter that owns the
least count (`readoutReservation.ts`), mapping `deg → °`. Not glass-blocked.

---

### D-13 · MINOR — the glass-ui boundary is crossed through 1-line re-export barrels

```
demo/picker/controls/ComponentSliders/ComponentSliders.vue:95   import { Card }   from "../../../ui/card";
demo/picker/controls/ComponentSliders/ComponentSliders.vue:96   import { Slider } from "../../../ui/slider";

$ cat demo/ui/slider/index.ts
export { Slider } from "@mkbabb/glass-ui";
```

Two import specifiers resolve to one symbol — a dual path (edict 2: no aliases/dual paths) and the
seam that makes "is this glass-ui or a demo/ui component?" unanswerable at every call site
(edict 4). It is also what let D-2/D-6/D-8 accrete: a `demo/ui/` shim reads like a place where
consumer slider mechanics may legitimately live.

**Cure.** Import `Card`/`Slider` from `@mkbabb/glass-ui` directly; delete the barrels. Not
glass-blocked, but touches four pinned receivers — sequence after the v8 migration.

---

### D-14 · MAJOR — canon §5's named axis composition is not adopted; the label is structurally detached from the control it names

`VISUAL-CONSTITUTION.md §5` names one composition for every axis control in the product:

> The domain-neutral axis composition sits over BI `Slider`: **label, unit, reserved live value,
> optional numeric entry**, focus/target behavior, and a color-bearing or neutral track chosen by
> semantics. Picker, Generate count, Extract, Gradient, Atmosphere and Blob adopt that one
> composition; feature waves own their domain arrangement, **not new slider mechanics**.

Measured against the shipped component:

| element of the composition | shipped |
|---|---|
| label | in a **separate sibling column** (`ConsoleRail`, `:33-38`) inside its own ring; no `<label for>`, no `aria-labelledby`, associated to its row by vertical coincidence only — and carrying a *different* name in the a11y tree (D-3) |
| unit | **absent as a column**; glued into the value string (`92.0%`, `359.0deg`) |
| reserved live value | present (the meter) but under-reserved (D-4) and blank in hex (D-5) |
| numeric entry | **absent** |
| new slider mechanics in the consumer | **four**: `::before` hit extension (`:349`), `::after` notch (`:384`), the cursor grammar (`:363-383`), the gate outline/box-shadow (`:253-274`) |

Two structural boundaries also wrap one group — the console `Card` edge plus the rail's ring —
against `PROPORTION-AUDIT.md §4/PR-05`: "A divider is retained only when grouping would be
ambiguous without it. Spacing plus material already expressing the same boundary makes the line
duplicative." Visible in every frame: `frames/desktop-1440-focus.png`,
`frames/D-oklch-ragged-track.png`.

**Cure.** This is the gestalt cure the other findings converge on. The channel row is
`label · track · unit · value` as **one composition owned by the producer**, so the label is
programmatically bound to its slider, the unit has a column, the value's reservation is a producer
concern, and the four consumer mechanics have somewhere legitimate to live. The letter rail then
becomes what it should have been — a *navigation* affordance over an already-labelled instrument,
not the instrument's only label. **BLOCKED-ON-GLASS-V8** (this is the P5 letter-rail primitive seam
the file itself books at `:22-24`).

---

### D-15 · INFO — dead payload and duplicated watchers

- `:120-125` builds `[meta.key, meta] as [string, unknown]` pairs, including a hand-fabricated
  alpha meta `["alpha", { key: "alpha", min: 0, max: 1, unit: "%" }]`. Every consumer destructures
  only `[component]` (`:34`, `:51`). The `meta` half and the fabricated literal are **never read**.
  The `unknown` cast is the tell: the type says "nobody knows what this is," and nobody does.
- `:138` and `:143` are two `watch(currentColorSpace, …)` doing one job (null the active component,
  bump the animation key) with two comment blocks.

---

### D-16 · INFO · **HYPOTHESIS — NO REPRODUCTION** — the space-change "re-key" does not re-key the element identity map

`:56`'s function ref is `(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }`.
Vue invokes a function ref with `null` on unmount; the `if (el)` guard drops that call, so a key is
only ever **added**, never removed. `useSliderTouchGates.attachSliderListeners`
(`composables/useSliderTouchGates.ts:53`) then iterates `Object.entries(sliderWrapperEls.value)` on
every space change and attaches five listeners per entry — including entries whose element is
detached — and `useSliderAnnouncements.apply()` (`useSliderAnnouncements.ts:37-44`) writes
`aria-valuetext` onto detached thumbs. Predicted: after rgb → lab → hsl the map holds
`{r,g,b,alpha,l,a,h,s}`, and the detached subtrees are strongly retained for the page's lifetime.

This contradicts the chassis-persistence law the file states at `:20-24` ("a space change re-keys
the ROWS (and the rail's letters) ONLY").

**I could not reproduce it in-session.** Hash-only navigation does not re-route the picker space —
an 11-space `location.hash` sweep (`scratchpad/CSD-probe5.mjs`) left the labels at
`R/G/B/ALPHA` throughout. Confirming this requires driving the `ColorSpaceSelector` widget.
**Labelled a hypothesis; it is not a finding until that probe runs.**

---

## Negative proof — what I attacked and could not break

The premise is that the design is wrong. These are the places I expected it to be wrong and it was
not; each is positive evidence, not an absence of looking.

1. **Reduced motion is correct.** `.stagger-children` lives entirely inside
   `@media (prefers-reduced-motion: no-preference)` (`demo/styles/animations.css:44`). Measured
   under `reducedMotion: "reduce"`: the first row child computes `animation-name: "none"`,
   `opacity: 1` — the entrance resolves directly to final geometry, satisfying
   `VISUAL-CONSTITUTION.md §6`. The stagger is fully tokenized (`--duration-normal`,
   `--ease-standard`, `--stagger-base`); no animation was deleted (edict 6 clean).
2. **The gate transition is live — I suspected a lost cascade and disproved it.** An early
   measurement on `.touch-gate-target` returned `transition-property: box-shadow`, suggesting the
   component's `transition: outline-color var(--duration-normal)` had lost. Re-measuring the four
   **channel** gates specifically (`CSD-probe4.mjs`) returned
   `{tp: "outline-color", td: "0.3s"}` on all four — `--duration-normal` = 0.3s, exactly as
   declared. The earlier reading was the SpectrumCanvas gate at index 0. **No finding.**
3. **`aria-live="off"` is correct and deliberate.** `:84`. `VISUAL-CONSTITUTION.md §7` requires it
   by name ("never a routine live region: ordinary text uses `aria-live=\"off\"`").
4. **`aria-valuetext` is present, unit-aware and space-disambiguated on every thumb in all nine
   spaces measured** — the §7 obligation is met on the value half (only the name half fails, D-3).
5. **No horizontal overflow, no page errors.** `REPORT.json` `overflowX: 0` and `pageErrors: []` for
   route `/#/` in all four Safari matrices; the one console error
   (`WebGL: context lost`, safari-desktop-light) belongs to the Blob canvas, not this component.
6. **`verbatimModuleSyntax` is clean.** The SFC imports no types; the composables use
   `import type { usePointerDebug }` (`useSliderTouchGates.ts:16`) and inline
   `type WatchSource` (`:13`). Edict 8 satisfied.
7. **The 400-LoC god-module cap is honoured honestly.** 395 lines, with the touch-gate and
   announcement clusters genuinely lifted into `composables/` with real encapsulation, not shuffled
   (edict 1 satisfied).

---

## Proposed wave — `V·MT / W-PICKER-CONSOLE`

**Status: BLOCKED-ON-GLASS-V8.** No source edit lands from this formation.

### Release condition (verbatim from `CARRY-LEDGER.md:55-73`)

> Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`, hold all consumer edits and
> the `@mkbabb/glass-ui` pin until **one unique immutable v8 candidate proves exact
> source→built→packed→installed→served equality, is neither a workspace/source link nor mutable
> v7, and survives two unchanged-byte Sol critics.**

Until that condition is met, `ComponentSliders.vue` stays byte-frozen at
`a61b5ed3…f327`. The v8 migration itself is scoped by the ledger to *the property name only*
(`--slider-track-bg` → `--glass-slider-track-background`), preserving "the perceptual/alpha-checker
ramps, ancestor-fed certified `--ink-muted`, transparent K/count underlays, kC `trackInk`,
orientation/RTL/inversion and existing pixels; add no `--track-bg`, v7 alias, copied CSS or local
mask." **This wave is therefore strictly downstream of that migration and may not be folded into
it.**

### Ordering

| leg | findings | gate | may land |
|---|---|---|---|
| **L0 — unblocked now, no producer dependency** | D-3, D-4, D-5, D-10, D-11, D-12, D-15 | v8 migration complete and the four pinned receivers re-hashed | immediately after v8 |
| **L1 — consumer restructure** | D-1, D-9 | L0 green; `ConfigSliderPane.vue:216` consumes the single rhythm source | after L0 |
| **L2 — producer transposition** | D-2, D-6, D-8, D-14 | glass v8 exposes: thumb density rung (≥24px inline coarse), forced-colors-safe slider state, a named veil clarity/α lever, and the `label · track · unit · value` axis composition | after the BJ relay lands those rungs |
| **L3 — paired composition ruling** | D-7 | executed jointly with `ColorPicker.vue`'s plate clarity window; one wave, not two | after L2 |
| **L4 — hypothesis discharge** | D-16 | drive `ColorSpaceSelector` across ≥3 spaces and assert `Object.keys(sliderWrapperEls.value).length === 4` | any time (probe-only) |

### BH/BI relay obligation

D-2 (thumb density rung), D-6 (forced-colors-safe slider state), D-8 (veil clarity/α lever) and
D-14 (the axis composition + the P5 letter-rail primitive this file books at `:22-24`) are all
**producer asks**. Per the standing glass-ui BH/BI relay edict, they belong in the active glass-ui
BH inbox at root before L2 can be scheduled. D-2 is the one with a shipped-accessibility
consequence (WCAG 2.2 SC 2.5.8, all four Safari matrices) and should lead the packet.

---

## Report location

`docs/tranches/V/megatranche/audit/components/picker-componentsliders/challenge-D-design.md`
Frames captured by this seat: `…/picker-componentsliders/frames/D-hex-empty-meters.png`,
`D-oklch-ragged-track.png`, `D-rtl-meter-align.png`.
