claude-opus-5[1m] (served model id)

# CHALLENGE — `SliderControl.vue` · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/SliderControl.vue` (150 LOC).
**Substrate.** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the exact tree the intake lane
pinned (`intakes/lane-fourier-r3-r6.md` §0: "the audited scope is the exact tree F.W0 will open on").
**Pin under audit.** `@mkbabb/glass-ui@^4.0.0` installed (`web/package.json:14`, resolved 4.0.0);
producer latest = **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method.** Static + source-derived only. No browser. Read whole: the SFC; the installed glass-ui
`Slider` (`dist/slider-DQ95MET2.js`, `dist/components/ui/slider/index.d.ts`, `Slider.vue.d.ts`), its
compiled scoped CSS (19 rules extracted from `dist/glass-ui.css`), the token arms
(`dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`), the producer's 7.0.0
`src/components/slider/{Slider.vue,types.ts}`, all 9 call sites, and `web/src/style.css`.

**Verdict — the component is DEFECTIVE, and its central design promise does not execute.**
The `color` prop — the one thing this wrapper adds over the shipped glass-ui chassis — is **wholly
inert against the installed pin**. Every slider in fourier-analysis paints the same near-black bar.

Tally: **18 defects — 3 BLOCKER · 6 MAJOR · 6 MINOR · 3 INFO** · **4 superlatives** · **1 explicit
contradiction of the hitherto corpus**.

---

## §0 — THE HEADLINE

`SliderControl.vue:143-149` retints the slider through five custom properties:

```css
.slider-track-host {
    --slider-scrub-track-height: 16px;
    --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 25%, transparent);
    --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 35%, transparent);
    --slider-scrub-thumb-bg:        var(--track-color);
    --slider-scrub-thumb-bg-hover:  var(--track-color);
}
```

**Not one of those five names exists in glass-ui 4.0.0.** The shipped `Slider` reads
`--slider-track-height`, `--slider-track-bg`, `--slider-range-bg`, `--slider-range-blur`,
`--slider-range-shadow`, `--slider-thumb-size`, `--slider-thumb-bg`, `--slider-thumb-border-color`,
`--slider-thumb-shadow`, `--slider-thumb-spring`. There is **no `scrub` infix anywhere in the
package** and **no `*-hover` tint token at all** — hover is a `box-shadow` ring
(`--surface-tint-8`), not a background swap.

The plumbing that *delivers* the value is correct — `:style` falls through to the `SliderRoot`
(4.0.0's `Slider` declares no `inheritAttrs: false`), Vue's parent scope-id lands on the child root,
and custom properties inherit. The wiring is sound. **Only the names are wrong**, and that is
sufficient to kill the entire feature.

---

## §1 — BLOCKERS

### D-1 · BLOCKER — the `color` prop is inert; every slider paints near-black `--primary`, not its instance colour

**Provenance.** `SliderControl.vue:88` (`:style="{ '--track-color': color }"`) →
`SliderControl.vue:144-148` (the five dead names) vs the shipped rule
`dist/glass-ui.css` → `.slider-range[data-v-534634a7]{background:color-mix(in oklab,
var(--slider-range-bg,var(--primary)) 88%, transparent); …}`.

`--slider-range-bg` is never written, so the fallback `--primary` wins. Resolved:

| | intended (`--track-color` @ 25%) | actual (`--primary` @ 88%) |
|---|---|---|
| light | `oklch(0.579 0.201 30.4)` @25% — a 25 %-alpha vermilion wash | `hsl(24 10% 10%)` @88% — a **near-opaque near-black slab** |
| dark | same hue @25% | `oklch(0.739 0.134 318.1)` @88% — an **opaque violet-pink** |

Token sources: `dist/styles/tokens/color-radius.css:263` / `dark-arm.css:113` (`--viz-fourier`);
`--primary` from the same arms. Consumers passing colour: `EquationPanel.vue:101` and
`FunctionInput.vue:185,218` pass `var(--viz-fourier)`; `ContourSettings.vue:236,249,275,288,301` pass
`VIZ_COLORS.amber` (`src/lib/colors.ts:81` = `#b37a2d`). **Nine call sites, two distinct intended
hues, one rendered hue.** The app's per-domain colour language on its primary control surface is
silently erased, and the substitute in light mode is a value the design never chose — an 88 %-alpha
10 %-lightness black bar sitting inside a warm paper card (`--card: hsl(36 48% 97%)`).

**Falsifier.** `grep -ro -- "slider-scrub" web/node_modules/@mkbabb/glass-ui/dist/` returns any hit,
**or** the fourier tree defines `--slider-scrub-range-bg` at a scope that reaches this element.
I ran both: the first returns **zero bytes**; the second finds the token *written* at 7 fourier sites
(`BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `GlassTimeline.vue:125`,
`SliderControl.vue:144-148`, `ConvergenceTimeline.vue:136`, `HarmonicLevelGrid.vue:210-213`,
`MorphPhaseConfig.vue:207-210`) and **never read anywhere**. Falsifier fails; the claim stands.

**Scope note.** SliderControl is the canonical chassis and the head of this epidemic — the six other
sites are copies of this block. Curing it here is the pattern fix.

### D-2 · BLOCKER — the numeric input has no conformant focus indicator (1.93:1), and focus is visually identical to hover

**Provenance.** `SliderControl.vue:132` `outline: none;` — the UA indicator is destroyed.
`SliderControl.vue:136-138`:

```css
.inline-number:hover,
.inline-number:focus { border-bottom-color: color-mix(in srgb, var(--foreground) 30%, transparent); }
```

Two failures in one rule:

1. **Contrast.** The replacement indicator is a 1 px underline at 30 % `--foreground` over `--card`.
   Computed (sRGB relative luminance, WCAG formula): **1.93:1 light** (`hsl(24 10% 10%)` @30 % over
   `hsl(36 48% 97%)`), **2.39:1 dark** (`hsl(48 10% 90%)` @30 % over `hsl(24 8% 16%)`). WCAG **1.4.11
   Non-text Contrast (AA)** requires **3:1** for the visual information identifying component state.
   Fails in both themes, and it is 1 px — under 2.4.13's 2 px-perimeter path too.
2. **State collision.** `:hover` and `:focus` resolve to the *same declaration*, so a keyboard user
   cannot distinguish "focused" from "the mouse is nearby", and a pointer user gets a phantom focus
   read. This is a state-coverage defect, not only a contrast one.

Compounding: `:focus` (not `:focus-visible`) means the indicator also fires on pointer-down.

**glass-ui conformance.** The correct token is already loaded and already used by the sibling element:
`dist/glass-ui.css` → `.glass-slider:not([data-variant=spectrum]):focus-within .slider-track{box-shadow:var(--focus-ring-shadow)}`,
and the CVA emits a `focus-ring` class (`slider-DQ95MET2.js`, `E = C("glass-slider focus-ring …")`).
The repo also has the canonical local pattern — `style.css` declares
`.sidebar-link:focus-visible, … { outline: 2px solid var(--ring); }` for exactly this reason
("D.W4.d — `:focus-visible` rings"). **The wrapper opted out of a convention its own repo booked in a
prior wave.**

**Falsifier.** `--focus-ring-shadow` or `--ring` is absent from the loaded stylesheet (then there is
no cheaper cure), or the computed ratio clears 3:1. Both checked: the tokens exist; the ratios are
1.93 / 2.39.

### D-3 · BLOCKER — the subtitle fails WCAG 1.4.3 AA in both themes (2.85:1 / 3.56:1) at ~10.5 px

**Provenance.** `SliderControl.vue:123-127`:

```css
.slider-subtitle { font-weight: 400; font-size: 0.75em; opacity: 0.7; }
```

inheriting `color: var(--muted-foreground)` from `.slider-label:118`.

`--muted-foreground: var(--neutral-5)` = `hsl(30 22% 40%)` light / `hsl(34 14% 62%)` dark. Against
`--card`, **unmodified** it measures **5.12:1 light / 5.68:1 dark — it passes**. The `opacity: 0.7`
composite drops it to **2.85:1 light / 3.56:1 dark**. Size: `0.75em` of `@apply text-sm` (0.875 rem) =
**0.65625 rem ≈ 10.5 px** — unambiguously "normal text" (the large-text exemption starts at 18.66 px
regular), so the bar is **4.5:1**. Fails by a wide margin in light and by a clear margin in dark.

**The single declaration `opacity: 0.7` is the entire cause.** Deleting it clears AA with the existing
token, no palette change.

Live sites: `FunctionInput.vue:182` (`subtitle="terms in the Fourier sum"`) and `:215`
(`subtitle="shown in expanded (a+b) view"`). Both are the only human explanation of what the control
does — this is not decorative chrome.

**In-policy, and the repo already knows.** `style.css` carries a **"D.W4.d — light-mode `--viz-amber`
darken (axe contrast carry)"** block that darkened a token from ≈3.54:1 to ≈4.6:1 for exactly this
reason, and `@axe-core/playwright@^4.11.3` is a devDep (`package.json:32`). The team has ruled on this
class of defect; this instance escaped because axe's contrast rule is evaluated on the composited
element and `opacity` on an inline `<span>` inheriting a parent colour is a known blind spot.

**Falsifier.** The subtitle never renders over `--card` (it renders over a darker glass surface where
the ratio inverts), or my luminance arithmetic is wrong. The first is testable and I mark the surface
assumption explicitly: both live sites sit inside `FunctionInput`'s panel body — a `--card`-family
surface. If a live probe (SS-13) shows the composited backdrop is materially darker, the light-mode
number moves; **the dark-mode 3.56:1 still fails**, so the finding survives either way.
`[UNPROVEN-NEEDS-LIVE: exact composited backdrop]` — severity unchanged.

---

## §2 — MAJOR

### D-4 · MAJOR — `variant="standard"` is a hard `vue-tsc` break at F.W1, and it is **not** on the census break surface

**Provenance.** `SliderControl.vue:82` `variant="standard"` vs producer
`/Users/mkbabb/Programming/glass-ui/src/components/slider/types.ts:10`:

```ts
export type SliderVariant = "scrubber" | "spectrum";
```

4.0.0's union was `"standard" | "spectrum"` (`dist/components/ui/slider/index.d.ts`, `sliderVariants`
props). **7.0.0 renamed `standard` → `scrubber`.** `"standard"` is not assignable → `vue-tsc -b`
(`package.json:7`, the *only* type gate) errors the moment glass 7 lands.

**Census delta.** `CENSUS-2026-08-03.md:102-105` enumerates the uplift break surface as
`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2,
`DockDropdownTrigger` ×1, `ToastVariant` (definition-absent). **`SliderVariant` is absent from that
list.** So is the sibling `--slider-*` token drift (7.0.0 drops `--slider-track-bg` and
`--slider-thumb-bg` entirely and adds `--slider-range-origin` / `--slider-touch-target` /
`--slider-target-floor`). This is a **new break-surface row for F.W1's cure list**, and it is not a
one-off: it is a *variant-union rename*, the class of break the census's enumeration method (removed
subpaths + removed members + absent types) structurally does not catch.

**Falsifier.** `"standard"` still appears in 7.0.0's `SliderVariant`, or `./slider` no longer exports
a `variant` prop. Checked: the union is exactly the two strings above; `./slider` is still exported
(`glass-ui/package.json` exports contains `./slider` and `./labeled-field`), and the subpath survives —
so the import line is fine and *only the value* breaks. Quiet, one-token, gate-caught. Good.

### D-5 · MAJOR — the corpus's "keep, it's a thin adapter" verdict rests on a justification the tree falsifies

**Contradiction, stated explicitly.** `formation/fourier/lane-frontend.md:371` rules:

> **Verdict:** these three `components/ui/` files are **thin API-shape adapters, not shadows.**
> `SliderControl.vue:3-20` and `Tooltip.vue:2-12` document the adaptation explicitly (scalar↔array
> model, single-component tooltip API). They are the correct posture — keep.

The **scalar↔array model** is named as the load-bearing justification. It is not load-bearing:
**glass-ui 4.0.0 already ships that adapter.** `web/node_modules/@mkbabb/glass-ui/package.json`
exports `./labeled-field`; `dist/components/custom/labeled-field/LabeledSlider.vue.d.ts`:

```ts
type __VLS_Props = { modelValue: number; label: string; tooltip: string;
                     labelClass?: string; min: number; max: number; step: number;
                     required?: boolean; hideLabel?: boolean; };
// emits: "update:modelValue": (value: number) => any
```

Scalar `modelValue: number`, the label chassis, `min`/`max`/`step`, plus `required` and `hideLabel`
(the double-label-leak guard SliderControl lacks — see D-6). **The stated reason to keep is already
in the box.**

I do **not** conclude "delete it": `LabeledSlider` has no `subtitle`, no `formatValue`, no inline
numeric readout, and *requires* `tooltip` — three of the four live consumers wrap SliderControl in
their own `<Tooltip>` (`ContourSettings.vue:229,242,268,281,294`), so the adoption is not free.
I conclude the **verdict's reasoning must be re-grounded**: the keep-case is *subtitle + formatValue +
the editable numeric readout*, not the model shape. That matters because the honest keep-case is
exactly the surface carrying D-1, D-2, D-3 and D-8 — i.e. **the only original code in this file is
where all the defects are.**

**Falsifier.** `./labeled-field` is not exported at 4.0.0, or `LabeledSlider`'s model is an array.
Both checked against the installed package; neither holds.

### D-6 · MAJOR — accessible-name divergence: the two controls that edit one value carry different names, and `subtitle` reaches only one of them

**Provenance.** `SliderControl.vue:66-79` — the `<label>` wraps *both* the text span and the
`<input>`, so the input's accessible name is the full label text **including the subtitle**
("Harmonics — terms in the Fourier sum"). `SliderControl.vue:87` gives the slider
`:aria-label="label"` — **the prop only**, "Harmonics".

Two controls bound to the same model announce differently. Worse, the subtitle — the only prose
telling a user what the control means — is invisible to a screen-reader user operating the *slider*,
which is the primary affordance.

Second divergence, latent: `SliderControl.vue:68` is `<slot>{{ label }}</slot>`. A consumer rendering
slot content gets a visible name from the slot and an AT name from `label` — they can be arbitrarily
different with no warning. No live consumer uses the slot today (all 9 call sites are self-closing),
so this is latent, not active. Cure is one line: build the aria-label from `label` + `subtitle`, and
either drop the slot or derive the name from it.

**Falsifier.** `subtitle` is decorative and duplicated elsewhere in the accessible tree. Read both
sites: `FunctionInput.vue:181-182` and `:214-215` — the subtitle text appears nowhere else in the
subtree. Falsifier fails.

### D-7 · MAJOR — no `aria-valuetext`: AT hears `0` where the eye reads `All`. Unfixable at 4.0.0 — **the uplift cures it**

**Provenance.** `SliderControl.vue:91-93` computes `displayValue` through `formatValue`, then
`ContourSettings.vue:289` supplies `(v: number) => v === 0 ? 'All' : String(v)`. The visible readout
says **"All"**; reka's `SliderThumb` mints `aria-valuenow="0"` and nothing overrides it, so the
announcement is **"0, slider, minimum"** — semantically the *opposite* of what the control does at
that position. The `toFixed` consumers are milder but still drift ("0.15" vs "0.15000000000000002"-
class raw values).

**4.0.0 cannot fix this from the wrapper**: `Slider.vue.d.ts` exposes no value-text hook, and the
compiled chunk hands the thumb only `aria-label` (`slider-DQ95MET2.js`:
`"aria-label": n.$attrs["aria-label"] ?? void 0`) — an `aria-valuetext` fallthrough would land on the
*root*, not the thumb that carries `role="slider"`.

**This is a surface the F.W1 uplift IMPROVES.** Producer 7.0.0 `types.ts:29-33`:

```ts
/** Humane readout for assistive tech … Authored per thumb onto `aria-valuetext`; reka mints none. */
valueText?: (value: number, index: number) => string;
```

`formatValue` maps onto `valueText` almost exactly. **Book this as an F.W1 opportunity row, not just a
break row**: `:value-text="(v) => formatValue?.(v) ?? String(v)"` is a one-line adoption that closes
a real a11y defect at zero design cost. 7.0.0 also adds `invalid?: boolean`, `marks`, and `motion` —
see D-8/D-12.

**Falsifier.** reka's `SliderThumb` already derives `aria-valuetext` from a slot or child text. It does
not — it emits `aria-valuenow`/`-valuemin`/`-valuemax`, and 7.0.0's own doc-comment says so verbatim
("reka mints none").

### D-8 · MAJOR — the readout has no error state; invalid input silently destroys the value, and the input's `type` mutates under the cursor

**Provenance.** `SliderControl.vue:40-49`:

```ts
function clamp(v, lo, hi) { return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : lo; }
function onInput(e) { emit("update:modelValue", clamp(parseFloat(e.target.value), props.min, props.max)); }
```

`NaN → lo`. On `@input` (every keystroke), so:

- **Clearing the field** (select-all + Delete) → `parseFloat("") = NaN` → **the value jumps to `min`.**
  For `ContourSettings.vue:284-287` (`maxContours`, min 0) that means every "clear and retype" round-trip
  passes through 0 = "All" and re-runs the contour compute at the extreme.
- **Typing a leading `-` or `.`** → NaN → jump to `min`.
- There is **no invalid state at all** — no `:invalid` rule, no `aria-invalid`, no message. The
  browser's native constraint state (`min`/`max`/`step` are emitted at `:74-76`) is painted nowhere.

Second half: `SliderControl.vue:70` `:type="isNumericDisplay ? 'number' : 'text'"`, driven by
`:94` `!Number.isNaN(Number(displayValue))`. With `ContourSettings.vue:289`'s formatter, the input's
`type` **flips between `number` and `text` as the bound value crosses 0** — i.e. while the user is
editing it. Changing an `<input>`'s `type` reconstructs the control: selection and caret are lost, and
`inputmode`/keypad flips alphabetic mid-entry on touch. `min`/`max`/`step` are simultaneously dropped
(`:74-76` gate on the same flag), so the field silently loses its constraints exactly at the boundary.

**7.0.0 relevance.** `invalid?: boolean` lands on `SliderProps` at 7.0.0 — the wrapper could then
reflect a rejected keystroke instead of swallowing it.

**Falsifier.** `@change` semantics (commit-on-blur) would make the clear-to-`min` unreachable — but the
binding is `@input` (`:77`). Or `formatValue` never returns a non-numeric string — but
`ContourSettings.vue:289` does. Both fail.

### D-9 · MAJOR — no `disabled` / busy pass-through: the sliders stay live while their own panel is computing or errored

**Provenance.** `SliderControl.vue:25-34` — the prop set is `label, subtitle, modelValue, min, max,
step, color, formatValue`. **No `disabled`.** And `disabled` cannot arrive by fallthrough: attrs on
`<SliderControl>` land on the wrapper's root `<div class="slider-control">` (`:65`), never on the
nested `<Slider>`. glass-ui 4.0.0 *does* support it — `Slider` declares `disabled` and
`dist/glass-ui.css` paints `.glass-slider[data-disabled] .slider-range{opacity:var(--opacity-disabled)}`.
**A shipped state is unreachable through this wrapper.**

Concrete failure scenario, from the immediate neighbours:

- `ContourSettings.vue:309-317` renders a retry banner on `store.error` whose button is
  `:disabled="store.computing"` — the five sliders 40 lines above it stay fully interactive during
  both the error and the compute, so a user can keep scrubbing `mlThreshold` into a request queue that
  is already failing.
- `EquationPanel.vue:107-110` renders a spinner on `loading` and an error line on `error`, directly
  under the `Terms` slider (`:97-103`) — same posture.

Both consumers **have** loading and error states; the control that drives them can reflect neither.
That is the definition of a state-coverage gap.

**Falsifier.** A parent disables the slider by other means (pointer-events, a fieldset, an overlay).
`grep -n "disabled\|fieldset\|pointer-events" ContourSettings.vue EquationPanel.vue` shows `disabled`
only on `<Button>`s; no fieldset, no gating overlay. Falsifier fails.

---

## §3 — MINOR

### D-10 · MINOR — `space-between` with no `gap`: a long label can butt flush against the numeric readout

`SliderControl.vue:114-121` — `.slider-label { display:flex; align-items:center;
justify-content:space-between; }` and **no `gap`**. `space-between` guarantees *distribution*, never a
*minimum gutter*: once the label span's content width plus the input's fixed 2.75 rem meets the
container, free space is 0 and the two touch. The live worst case is
`FunctionInput.vue:181-182` — `"Harmonics — terms in the Fourier sum"` — inside a `flex-1` cell
sharing its row with a `<Button size="icon">` (`:189-191`). One declaration (`gap: 0.75rem`) fixes it.
`[UNPROVEN-NEEDS-LIVE: the exact viewport at which they collide]` — the *absence of the gutter* is
static and certain; the collision width is not.

### D-11 · MINOR — the vertical rhythm is cramped against the capsule it labels

`SliderControl.vue:107-111` — `.slider-control { gap: 0.25rem }` = **4 px** between a ~20 px label
line (`text-sm`, line-height 1.25 rem) and a **20 px** glass capsule
(`.glass-slider[data-size=md]{--slider-track-height:1.25rem}`). Aristotelian reading: the separator
between two ~20 px bands is 1/5 of a band — below the threshold at which the eye reads them as
*related but distinct*; they read as one 44 px smear. glass-ui's own scale (`typography.css`: "Golden-
ratio scale (√φ ≈ 1.272)") would put the gap near 0.375–0.5 rem. The four `ContourSettings` sliders
stack directly (`:230-303`), so the intra-control gap is not visually separable from the inter-control
gap — the grouping cue is lost. `[UNPROVEN-NEEDS-LIVE: the perceptual read; the metrics are static]`

### D-12 · MINOR — the track is 25 % thicker than the author specified, and cannot be corrected

`SliderControl.vue:144` declares `--slider-scrub-track-height: 16px`. Dead (D-1). The rendered height
is the `md` default, `--slider-track-height: 1.25rem` = **20 px** — a **+25 % miss** against the stated
intent, and the reason D-11's proportion reads worse than the author designed. Note the wrapper also
never passes `size`, so it cannot reach `sm` (0.75 rem = 12 px), which is nearer the declared 16 px
than `md` is. Cure is `size="sm"` **or** the correct token name — the second is strictly better because
`GlassTimeline.vue:125` and `ConvergenceTimeline.vue:136` want 24 px and 20 px respectively and are
equally dead.

### D-13 · MINOR — motion is hand-rolled off-token and carries no reduced-motion posture

`SliderControl.vue:134` `transition: border-color 0.15s;` — a literal duration, an **implicit `ease`**
timing function, against glass-ui's `--duration-fast: 0.2s` + `--ease-standard`, which the sibling
element uses two DOM nodes away (`.slider-track{transition:background var(--duration-fast)
var(--ease-standard), …}`). A 25 % duration drift and a different curve on the same interaction.
`grep -c "prefers-reduced-motion" SliderControl.vue` → **0**. A border-colour fade is not vestibular,
so the reduced-motion omission is INFO-grade *in isolation*; it is recorded because CENSUS §"Hygiene
banked / gaps" books "18 reduced-motion references" as an asset — this file is not one of them, and
7.0.0 adds a first-class `motion?: Motion` axis to `SliderProps` that would make the posture explicit.

### D-14 · MINOR — the numeric readout is a ~20 px tall tap target (WCAG 2.5.8 floor is 24 × 24)

`SliderControl.vue:128-135` — `width: 2.75rem; padding: 0;` with no height. The box is the inherited
`text-sm` line-height ≈ **20 px**. WCAG **2.5.8 Target Size (Minimum), AA** requires 24 × 24 CSS px
unless spacing or an equivalent exemption applies — and it does not: the target sits inside a
`space-between` row with the slider capsule 4 px below (D-11), so the 24 px spacing exemption is also
unmet. glass-ui ships the idiom the wrapper needed — the `touch-hit-area` class on the thumb
(`slider-DQ95MET2.js`, `class: "slider-thumb glass-specular-track touch-hit-area"`), and 7.0.0 adds
`--slider-touch-target` / `--slider-target-floor` outright. Cure: `padding: 0.125rem 0` + a
`min-height`, or the `touch-hit-area` pseudo-element idiom.

### D-15 · MINOR — a fixed 2.75 rem readout on a caller-supplied formatter, with no shrink guard

`SliderControl.vue:129` `width: 2.75rem` (44 px) with `text-align: right` and no `min-width`/
`overflow`/`text-overflow`. Today's formatters top out at 4 glyphs ("0.90", "20.0", "100", "All") and
fit in Fira Code at 14 px (≈8.4 px advance → ~34 px). But `formatValue` is a **public prop typed
`(v: number) => string`** — any unit suffix ("2.5 Hz", "π/2") overflows, and with right alignment the
*leading* characters clip, i.e. the magnitude is lost while the unit survives. Separately,
`.slider-control` sets no `min-width: 0`, so under `FunctionInput.vue:180`'s `class="flex-1"`
(`flex: 1 1 0%`, `min-width: auto`) the row's shrink floor is the label's min-content plus 44 px.
`[UNPROVEN-NEEDS-LIVE: the narrow-viewport row behaviour]` — the missing declarations are static.

---

## §4 — INFO

### D-16 · INFO — the header comment's version archaeology is three majors stale and its cited authority is not resolvable from here

`SliderControl.vue:19-23`: *"the v1.8.x `<Slider>` acquires the typed `DockContext` token internally"*
— the installed package is **4.0.0** and the producer is **7.0.0**; the `v1.7.0`/`v1.8.x` coordinates
name a version line that no longer exists. `SliderControl.vue:14-15` cites
`` `audit/W3-adoption-ledger.md` `` as a relative path; the file resolves only at
`/Users/mkbabb/Programming/fourier-analysis/docs/tranches/A/audit/W3-adoption-ledger.md` — six levels
up and two branches over. Twenty of 150 lines (13 %) are tranche archaeology that a reader of *this
repo at this HEAD* cannot verify. Prose quality: the *reasoning* is excellent (see S-2); the *anchors*
have rotted. Fold: `lane-frontend.md:382` already books `SliderControl.vue:3,16,140` as
`glass-track`/`glass-fill`/`glass-thumb` prose-only residue and `lane-frontend.md:70` books `:51` as
one of reka-ui's six comment-only mentions — **this row is the design-side reading of the same three
lines**, not a new discovery.

### D-17 · INFO — `-moz-appearance` without the unprefixed form; no `inputmode`

`SliderControl.vue:133` `-moz-appearance: textfield;` with no `appearance: textfield`. Spinner
suppression is covered on WebKit/Blink by `:139-142`, so the *effect* is complete; the *spelling* is
legacy-only and will be the first thing a lint sweep flags. Also no `inputmode` — harmless while
`type="number"`, but D-8's type-flip drops to `text` and takes the numeric keypad with it.

### D-18 · INFO — `aria-label` double-writes under 4.0.0's attribute fallthrough

`SliderControl.vue:87` sets `:aria-label` on `<Slider>`. 4.0.0's `Slider` declares no
`inheritAttrs: false`, so the attribute lands on the `SliderRoot` element **and** is separately read
back out of `$attrs` and forwarded to each `SliderThumb` (`slider-DQ95MET2.js`). The root is a
role-less `<span>`, so AT ignores its label and the outcome is correct — but it is correct by
accident, and the same fallthrough is what makes D-1's `:style` delivery work. Recording it so the
F.W1 uplift does not "fix" the double-write and silently break the `--track-color` delivery path at
the same time.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · the scalar↔array adapter clamps on **both** directions — the rarer, correct half is present

`SliderControl.vue:53-56`:

```ts
const sliderModel = computed<number[]>({
    get: () => [props.modelValue],
    set: (arr) => emit("update:modelValue", clamp(arr[0] ?? props.min, props.min, props.max)),
});
```

The `?? props.min` guards reka emitting `[]`/`[undefined]`, and the write path is **clamped** — not
just the keyboard path. This matters concretely at `FunctionInput.vue:216-217`, where `:max` is
`Math.max(2, vizHarmonics ?? nHarmonics)` — a **reactive maximum**. When `vizHarmonics` drops while the
thumb sits above the new ceiling, an unclamped adapter would emit an out-of-range scalar upward. Most
wrappers clamp the typed input and trust the slider; this one does not. **Falsifier:** reka clamps
before emitting, making it redundant — reka clamps to `min`/`max` *as known at emit time*, which is
exactly the window a reactive `max` opens. The guard is load-bearing.

### S-2 · the `variant` retirement records its own falsifier, and the falsifier still holds today

`SliderControl.vue:9-17` retires the legacy `variant?: "timeline" | "default"` prop and states the
check that justified it: `` git grep '<SliderControl' | xargs grep variant ``. I re-ran it as a
regex over every `<SliderControl …>` element in `web/src`: **zero call sites pass `variant`** (the only
textual hit is the comment quoting its own command). A decision comment that publishes a *reproducible
predicate* rather than an assertion — and that still reproduces two waves later — is the standard the
rest of the header (D-16) should be held to. **Falsifier:** a call site passes `variant`, or the prop
is still declared. Neither.

### S-3 · `min`/`max`/`step` are correctly withheld from the `text`-mode input

`SliderControl.vue:70-76` gates `:min`/`:max`/`:step` on `isNumericDisplay`, emitting them only when
`type="number"`. On `type="text"` those attributes are invalid HTML and, worse, would be *silently
ignored* while looking like active constraints to the next reader. Withholding them is a subtle,
deliberate correctness care. (It is also, per D-8, the mechanism by which the constraints vanish at
the boundary — the same care creates a second-order problem, but the local judgement is right.)
**Falsifier:** `min`/`max`/`step` are valid on `input[type=text]` — they are not, per HTML §4.10.5.3.

### S-4 · the dock-hold delegation is genuinely delegated — the wrapper adds nothing redundant

`SliderControl.vue:19-23` claims the v1.8.x+ `<Slider>` acquires the `DockContext` token internally and
that the old string-key `dockKeepOpen`/`dockRelease` injects were retired. Verified against the
compiled 4.0.0 chunk: `slider-DQ95MET2.js` defines `useDockHold(getRootEl, {enabled})`, attaches native
`pointerdown`/`touchstart` on the resolved root, calls `keepOpen()`/`release()`, and cleans up on
`pointerup`/`pointercancel` **and** `onBeforeUnmount`; `keepDockOpen` defaults `true`. The wrapper
injects nothing and re-implements nothing. Given that this file's *other* delegation claim (the
`--slider-scrub-*` retint, D-1) is entirely false, the discipline shown here is worth naming: **the
behavioural delegation was verified against the package; the visual delegation was not.**
**Falsifier:** a residual `inject("dockKeepOpen")` in the SFC — `grep -n "inject" SliderControl.vue`
→ zero. Clean.

---

## §6 — CARRY ROWS FOR F.W1 / F.W4

| # | row | wave |
|---|---|---|
| 1 | `SliderVariant` `"standard"` → `"scrubber"` — **new break-surface row**, absent from `CENSUS:102-105` | **F.W1** |
| 2 | `--slider-scrub-*` → `--slider-{track-height,range-bg,thumb-bg}` — **7 fourier files, ~20 dead declarations**; SliderControl is the head of the epidemic. Cure at 4.0.0 (don't wait for the uplift — the light-mode near-black bar is shipping today) | **F.W1 pre-work / F.W4** |
| 3 | `formatValue` → 7.0.0 `valueText` — a one-line a11y **improvement** the uplift unlocks (D-7) | **F.W1** |
| 4 | 7.0.0 `invalid` + `motion` + `marks` — the state axes this wrapper has never had (D-8, D-9, D-13) | **F.W4** |
| 5 | `--slider-track-bg` / `--slider-thumb-bg` are **removed at 7.0.0** — token-drift row, not just a subpath row | **F.W1** |
| 6 | Re-ground `lane-frontend.md:371`'s keep-verdict: the keep-case is subtitle + formatValue + readout, **not** the model shape (`LabeledSlider` already ships it) | **F.W4** |
| 7 | Contrast pair (D-2 `outline:none`, D-3 `opacity:.7`) — both token-decidable, both in the same class as the already-booked `--viz-amber` axe carry (`style.css` D.W4.d) | **F.W4** |

---

## §7 — TALLY

**Defects 18** — BLOCKER **3** (D-1 dead colour / D-2 focus indicator / D-3 subtitle contrast) ·
MAJOR **6** (D-4 · D-5 · D-6 · D-7 · D-8 · D-9) · MINOR **6** (D-10 … D-15) · INFO **3** (D-16 … D-18).
**Blockers 3. Superlatives 4.** Corpus contradictions **1** (D-5 vs `lane-frontend.md:371`).
Live-dependent claims, all marked in place: 4 (D-3 backdrop, D-10 collision width, D-11 perceptual
read, D-15 narrow-viewport row) — **no severity in this file depends on a live probe**; each
`UNPROVEN` marker bounds a *magnitude*, never a *verdict*.
