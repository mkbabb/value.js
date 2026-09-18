# CHALLENGE-D — `demo/workbenches/generate/GenerateControls.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier
explicitly declared at spawn. Declaration matches observation; no inherited or undeclared seat.

## Seat, subject, and coordination boundary

| Field | Value |
|---|---|
| Axis | CHALLENGE-D — the design is flawed; find how |
| Subject | `demo/workbenches/generate/GenerateControls.vue` (311 lines) |
| Sole consumer | `demo/workbenches/generate/GeneratePane.vue` (`demo/shell/usePaneRouter.ts:73,86`) |
| Route | `/#/generate` |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Pinned SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Measured SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Drift | **NONE.** The CARRY-LEDGER §D glass BJ W4 pin holds exactly. |

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**No source edit is proposed or landed by this seat.** Every cure is authored as
`BLOCKED-ON-GLASS-V8` with its exact release condition (§8).

### This is pass 2

A prior CHALLENGE-D pass ran 2026-07-24. It is preserved verbatim at
`challenge-D-design.2026-07-24-pass.md` and is **not superseded** — it is corroborated. This pass
was run independently against the same frozen bytes, in **two engines** (WebKit + Chromium) rather
than one, and it exists to do three things pass 1 could not:

1. **Discharge pass 1's two labelled hypotheses.** Pass 1 marked RTL and 200% zoom `unproven —
   Hypothesis, no reproduction run`. Both are now run. One confirms a *worse* defect than
   hypothesised (§4 · D-9); the other **falsifies** the hypothesis and replaces it with the opposite
   finding (§4 · D-6).
2. **Escalate one BLOCKER with a stronger artifact.** Pass 1's D-1 said the per-swatch copy verb is
   inert for keyboard. It is inert for *every* input path, and a real driver click now times out
   proving it (§4 · D-1).
3. **Add measurements pass 1 did not take** — nine of them, listed in §2.

Probe budget: 6 headless runs (5 measurement, 1 hit-test), ~30 evaluates, 11 frames written.

---

## 1. Verdict

**DEFECTIVE.**

The single strongest defect, stated once and precisely:

> **This is a colour laboratory whose Generate workbench cannot deliver a colour to anyone.**
> The per-swatch copy verb cannot be triggered by keyboard *or* pointer (`pointer-events: none`;
> a real click times out; the clipboard is unchanged). Every colour-bearing element in the plate is
> `aria-hidden`, so assistive technology receives no colour at all. The one path that *does* work —
> Copy-all — emits `oklch(71.504823561991% 0.150951768272 279.521794645116deg)`, fifteen significant
> digits with a `deg`-suffixed hue, which is not pasteable into a stylesheet. And the count ramp,
> the instrument's own depiction of its own palette, destroys **59.9–63.7% of the chroma** at every
> segment midpoint because it interpolates in sRGB.

Every one of those four facts is measured below. None is a matter of taste.

The design failure underneath them is singular and nameable: **the component was authored against a
producer contract that Glass 7 has deleted, and against a T-tranche law book that the V constitution
has closed.** Its comments are a fossil record of both — they confidently assert `tag="button"` is
the copy-verb seat (`:194-196`) and that dropdown option names take the display voice
(`:235-239`), and the canon says the first is *abrogated* and the second is *outside a closed
matrix*. A comment defending a dead contract is itself a design defect, because it is what will stop
the next author from looking.

---

## 2. What this pass adds over pass 1

| # | New finding | Kind |
|---|---|---|
| 1 | Count ramp interpolates in **sRGB**: 59.9–63.7% chroma loss at every midpoint, measured | new BLOCKER |
| 2 | The swatch verb is dead for **pointer too** — `pointer-events: none`, click timeout, clipboard unchanged | escalation of pass-1 D-1 |
| 3 | **RTL**: the ramp renders the palette in the **opposite order** from the strip and dots above it | discharges pass-1 hypothesis; worse than hypothesised |
| 4 | **720 / zoom**: the chrome row does **not** wrap at half-width — it wraps only at 1440 | **falsifies** pass-1 hypothesis |
| 5 | **Forced colors**: specimen strip → white; count track `background-image: none` → no track at all | beyond pass-1's "partial" |
| 6 | Type matrix broken twice, measured: `.section-label` is **Fira Code**; option names are **Fraunces** | new MAJOR |
| 7 | The producer's `slider-range glass-liquid-fill` is measured **transparent** — its fill was killed by the consumer's own override | new MAJOR |
| 8 | Copy-all emits 15-significant-digit `oklch(… deg)` — not code-ready | new MAJOR |
| 9 | glass-ui 7 ships `instrument-chassis`, `labeled-field`, `number-field`, `toast` — none used | new evidence for pass-1 D-10 |
| 10 | `count=1` degenerates to a single-stop gradient; ~70% of the plate becomes one flat colour | new MINOR |
| 11 | Long-name clip quantified: `scrollWidth 687 / clientWidth 388`, `text-overflow: clip` | quantifies pass-1 |

**Cross-engine discipline.** WebKit's tab order omits buttons by default (Safari's "Press Tab to
highlight each item" is off), which makes a WebKit tab probe look catastrophic and mean nothing.
That result was **discarded**. Every keyboard claim below is the Chromium result.

---

## 3. Visual truth

Frames read: the four tracked Safari captures
(`../../visual/shots/safari-{desktop,mobile}-{light,dark}/generate.png`) plus 11 captured by this
seat in `frames/`.

### 3.1 The plate is a strip with chrome bolted on, and the chrome has nowhere to live

Read `safari-desktop-light/generate.png`. The plate reads, top to bottom: a full-bleed 460×40 band
of five hard colours; then a line containing "Generated Palette" at the far left and a lone "5" at
the far right with roughly 340 px of nothing between them; then a *second* line whose left 60% is
empty and whose right holds Regenerate + two icon buttons; then five blobs repeating the band above;
then `seed: 71f806ff`.

That 340 px void and that second line are not composition — they are an overflow, at the primary
desktop viewport (§4 · D-6). The eye is given no reason to travel from the title to the "5", and the
verb cluster floats in an unowned band with no alignment relationship to anything above it.

`VISUAL-CONSTITUTION.md:194` describes this exact object:

> *"The generated palette is a draft specimen, **not a flat strip plus unrelated buttons**."*

The canon wrote that sentence about this component. The component still is it.

### 3.2 The same five colours are drawn three times, and the loudest drawing is the mute one

Strip (460×40, inert), dot row (5 × 40×40, the notional verb seat), count ramp (434×24). One datum,
three depictions, no hierarchy between them. `VISUAL-CONSTITUTION.md:5` requires *"one dominant
instrument, one clear specimen, and one primary action instrument"*; §3.8 requires *"one
full-strength visual protagonist"*.

Worse, the inversion: the **largest** depiction (the strip) carries **no** affordance, while the
smaller dot row is the one that pretends to (and cannot — D-1). The design points the eye at the
thing that does nothing.

At `count=1` this collapses into self-parody: `frames/count1-chromium.png` shows one olive colour
painted at 460×40 **+** 40×40 **+** 434×24 — roughly 70% of the plate is a single flat colour, with
a thumb pinned to the left end of a solid bar that can no longer indicate anything.

At `count=12` the two depictions openly disagree on geometry: measured
`{"n":12,"rows":2,"stripSegs":12}` — the strip shows twelve equal bands while the dots below wrap
**9 + 3**, ragged (`frames/count12-light.png`).

### 3.3 The ramp is visibly a different palette from the strip 40 px above it

In `safari-mobile-light/generate.png` the strip's bands are fully saturated (blue, orange, green,
purple, olive) while the ramp directly below passes through grey-brown between the blue and orange
stops. Same five colours, two chromas, one frame. This is not a rendering artifact — it is measured
at 59.9–63.7% chroma loss in §4 · D-3, and it is the mechanism behind the "washed out" impression in
all four tracked captures.

### 3.4 Dark mode does not rescue it

`safari-desktop-dark/generate.png` and `safari-mobile-dark/generate.png` show the same wrap, the
same void, the same triple depiction, and the same desaturated ramp against a *more* saturated
strip — the chroma gap is more legible in dark, not less, because the surrounding surface is
quieter.

Recorded as sound: the dark chrome does use the restrained neutral pole with no seed tint leaking
onto plate chrome, satisfying `VISUAL-CONSTITUTION.md:21`.

### 3.5 Forced colors erases the instrument

`frames/forced-colors.png`. The 460×40 specimen strip is **gone** — a flat white band. The count
slider has **no track whatsoever**: a bare 12×24 thumb outline floating in white, with no axis, no
extent, no min/max. Only the five blobs survive — and they are `aria-hidden`.

### 3.6 RTL puts the ramp backwards

`frames/rtl.png`. Reading left→right: the strip is blue, olive, magenta, teal, orange; the dots are
blue, olive, magenta, teal, orange; **the ramp is orange … teal … magenta … olive … blue.** Three
depictions of one palette, forty pixels apart, in two different orders.

---

## 4. Defects

### D-1 · BLOCKER · The per-swatch copy verb cannot be triggered by any input path

*(Pass 1 found this at keyboard level. It is worse: it is unreachable by pointer as well.)*

`GenerateControls.vue:199-208`:

```vue
<WatercolorDot :color="css" tag="button" :seed="`gen-${css}-${i}`"
    class="… cursor-pointer active:scale-95 … focus-visible:outline-none"
    :aria-label="`Copy ${css}`" @click="copyColor(css)" />
```

**The producer has no such prop.** `node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/*.d.ts`:

```ts
type __VLS_Props = { color: string; variant?: "solid"|"ghost"; animate?: boolean;
                     cycleDuration?: number; range?: [number,number]; seed?: string; };
```

No `tag`. Glass 7.0.0 landed the P051 cut.

**What renders** (identical, WebKit and Chromium):

```
{"tag":"SPAN","role":null,"tabindex":null,"ariaHidden":"true","ariaLabel":null,"focusable":false}
```

```html
<span aria-hidden="true" class="generate-swatch … cursor-pointer active:scale-95 …"
      data-testid="watercolor-swatch" data-variant="solid" style="ba…
```

The authored `aria-label` is dropped by the producer. `element.focus()` leaves `activeElement`
elsewhere. Chromium tab order from the name input never reaches a swatch:

```
["BUTTON[Regenerate]","BUTTON[Save palette]","BUTTON[Copy all colors]",
 "BUTTON[Generation preset]","BUTTON[Color harmony]","SPAN[Color count]", …]
```

**And the pointer path is dead too — the new measurement:**

```json
{ "pointerEvents": "none", "cursor": "pointer",
  "elementAtCenter": "DIV.px-3.pb-1", "centerIsSwatchOrChild": false,
  "childPointerEvents": ["svg:none"] }
```

A real driver click on `.generate-swatch` **times out after 30 s** — the element never becomes
hit-targetable — and the clipboard sentinel is unchanged:

```
CLICK ERROR: page.click: Timeout 30000ms exceeded.
clipboard after clicking swatch: "SENTINEL-BEFORE"
=> POINTER COPY WORKS: false
```

So `copyColor()` (`:110-113`) and the `@click` at `:207` are **unreachable code**. Meanwhile
`cursor: pointer` is still applied by the consumer's own class — the UI actively advertises a
clickable target that cannot be clicked. That is worse than a missing affordance; it is a false one.

**Canon.** `VISUAL-CONSTITUTION.md:91` predicted the cut and named this site:

> *"V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the
> public `tag="button"`/interactive-host branch in the clean major … W19–W22/W25–W27 execute Dock
> seal/edit, ColorSpaceSelector, eyedropper, Spectrum, channel, palette, **Generate**, Mix and
> Gradient sites."*

Glass shipped the removal; the Generate site was never executed. The component's comment at
`:194-196` still asserts the abrogated law verbatim.

**Why nothing caught it.** Vue template type-checking permits arbitrary extra attributes
(fallthrough `$attrs`), so `tag="button"` on a component without a `tag` prop is not a type error.
Demo typecheck is HARD in CI (`ef57230b`) and green. **The seam is structurally un-typecheckable.**

**Reproduction.** `node gc-probe6.mjs` (hit-test + click + clipboard); `node gc-probe3.mjs` (a11y + tab).

**Cure.** P051 as written: `WatercolorDot` is a face; a named geometric `<button>` seat encloses it
and owns activation, accessible name and focus. Wave-level, not a local shim.

---

### D-2 · BLOCKER · The specimen has no non-visual existence

Chromium, walking the plate and halting at each `aria-hidden="true"` boundary:

```
{ "HIDDEN_SUBTREE": "DIV.overflow-hidden" }      <- PaletteColorStrip, the 460x40 specimen face
{ "ctrl": "INPUT", "name": "Palette name" }
{ "text": "5" }
{ "ctrl": "BUTTON", "name": "Regenerate" }
{ "ctrl": "BUTTON", "name": "Save palette" }
{ "ctrl": "BUTTON", "name": "Copy all colors" }
{ "HIDDEN_SUBTREE": "SPAN.generate-swatch" }  x5
{ "text": "seed: 70b7c345" }
```

`PaletteColorStrip.vue:2-4` is `aria-hidden="true" role="presentation"` **by contract** — its own
comment reads *"W5-a11y: color strip is a decorative visual, hidden from AT."* That is correct for a
Browse/Library palette-entity card, where the card's named button seat carries identity. It is wrong
here, where the strip is the **protagonist** and nothing else names the colours.

A screen-reader user in the "Generated palette" region receives a text field, the numeral 5, three
verbs and a seed. **No colour information of any kind** — the workbench's entire output.

**Canon.** `VISUAL-CONSTITUTION.md:91`: *"data-bearing static faces remain present as
**noninteractive named list/text content** with zero activation/focus/drag semantics."* The
constitution requires exactly the inverse of what ships.

**Design judgement, not an ARIA gap.** The defect is the *architectural* one: a component whose
published contract is "decorative, hidden from AT" was promoted to protagonist. The cure is the
named list the constitution asks for, housed in the chassis stage region (D-7) — not an
`aria-label` sprinkled on a `<span>`.

---

### D-3 · BLOCKER · The ramp destroys ~62% of its own chroma — sRGB interpolation in a colour library

This is the finding that should not exist in this repository.

`GenerateControls.vue:65-73` builds the count track:

```ts
const stops = colors.map((css, i) => `${css} ${pct.toFixed(0)}%`);
return `linear-gradient(to right, ${stops.join(", ")})`;
```

The stops are authored in **OKLCh**. The interpolation space is unspecified, so it is **sRGB**.

Measured (Chromium): each segment midpoint sampled from the painted ramp, converted to OKLCh, and
compared against the perceptual midpoint this repository's own library would produce.

```
declaration: linear-gradient(to right, oklch(0.655701 0.182746 263.37) 0%,
             oklch(0.743545 0.161744 40.8777) 25%, oklch(0.721456 0.132391 178.385) 50%,
             oklch(0.782625 0.16543 315.893) 75%, oklch(0.580056 0.118823 93.401) 100%)
hasInterpolationHint: false
```

| segment | C(a) | C(b) | **C painted at midpoint** | C true OKLCh midpoint | **chroma loss** |
|---|---:|---:|---:|---:|---:|
| 0→1 | 0.1831 | 0.1617 | **0.0626** | 0.1724 | **63.7 %** |
| 1→2 | 0.1617 | 0.1317 | **0.0544** | 0.1467 | **62.9 %** |
| 2→3 | 0.1317 | 0.1648 | **0.0558** | 0.1482 | **62.4 %** |
| 3→4 | 0.1648 | 0.1189 | **0.0569** | 0.1419 | **59.9 %** |

Only 5 of 434 px sit exactly on a stop. **The overwhelming majority of the ramp's area is sRGB mud.**

`:62-64` claims the slider *"carries the generated ramp itself — the instrument shows its own
state."* It shows a ~60%-desaturated impostor of its own state, and §3.3 shows that difference is
plainly visible next to the strip.

**Canon.** `VISUAL-CONSTITUTION.md:143` (§6): *"**No path desaturates through gray.**"* Written for
motion; the ramp is a spatial path and violates it exactly. §1: *"value.js is a chromatic
laboratory."*

**Reproduction.** `node gc-probe4.mjs`. Seed-independent — the loss is a property of the
interpolation, not the palette.

**Cure.** The ramp stops being a hand-rolled CSS gradient. Either the producer `Slider` carries a
colour-bearing track (the `VISUAL-CONSTITUTION.md:104` "colour-bearing or neutral track chosen by
semantics" arm), or the gradient declares `in oklch`. A colour library emitting an un-hinted sRGB
gradient is a contradiction in terms.

---

### D-4 · BLOCKER · Three action species live in two places at once

`VISUAL-CONSTITUTION.md:194`, verbatim:

> *"Regenerate, Save/Publish and Copy live in **one** Dock control set."*

`OPTICAL-BENCH-COMPOSITIONS.md` §5, Generate row: *"stage, inspector and **Dock action species**
remain distinct without a rule."*

| Seat | Location |
|---|---|
| Dock control set | `demo/shell/usePaneRouter.ts:196` `regenerate` · `:197` `save` · `:198` `copy` |
| Plate chrome | `GenerateControls.vue:157-164` · `:165-174` · `:175-184` |

`:115` exposes `{ regenerate, save, copyColors }` **specifically so the Dock can call them**, and
then the same three verbs are rendered inline. The comment at `:120-128` celebrates killing "the
orphan toolbar row" — but the row it killed was not the duplicate; the Dock set is the duplicate
that survived.

`PROPORTION-AUDIT.md` **PR-06**, by name:

> *"Three adjacent action species or duplicated selected fills | **REMOVE** | Primary W23 … One
> action/selection owner across **Generate** and owner/Admin/Mix tabs."*

---

### D-5 · MAJOR · The editable title is inert — the typed name is discarded

`:44-50` is emphatic that the name is load-bearing:

> *"the save carries the plate's own name — the bench title is provenance FOR the save, never
> display-only chrome … this emit is already truthful."*

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
function save() { emit("save", [...palette.value], paletteName.value); }
```

The emit is truthful. The consumer discards it:

```ts
// GeneratePane.vue:14, :19
function onSave(colors: string[]) {                       // `name` never declared
    pm.createPalette("Generated Palette", paletteColors); // hardcoded literal
}
```

**Runtime reproduction.** Chromium: set the title to `ZZ-PROBE-NAME`, click
`[aria-label="Save palette"]`, read storage:

```
AFTER SAVE — names found in localStorage: [{"key":"color-palettes","names":["Generated Palette"]}]
visible palette names in Library: ["Generated Palette"]
```

Frame: `frames/save-name-drop-chromium.png`.

TypeScript cannot catch it — a handler may declare fewer parameters than the emit supplies. The
design defect is shipping a first-class editing affordance (hover-underline, focus ring,
`cursor-text`, `aria-label`, a comment declaring it provenance) for a value with no consumer.

---

### D-6 · MAJOR · The chrome row wraps at desktop and does *not* wrap at half-width

`:139-142` states the intent:

> *"The row WRAPS gracefully … **at 390** the verbs settle onto their own right-aligned line, never
> a clipped title."*

Wrapping is authored as a narrow-viewport accommodation. Measured `regen.top − nameInput.top`:

| Arm | plate width | wrap delta | plate height |
|---|---:|---:|---:|
| 1440 light (WebKit) | 460 | **+36.5 px — wrapped** | 220 |
| 1440 light (Chromium) | 462 | **+37 px — wrapped** | 220 |
| 1440 RTL | 462 | **+37 px — wrapped** | 220 |
| **720** | 462 | **−5 px — one line** | **180** |
| 320 | 254 | +37 px — wrapped | 212 |

**This falsifies pass 1's hypothesis** (`zoomed 200% — unproven; the row already wraps at 100%, so
200% compounds it`). It does not compound — at 720 the row *fits*. The plate is the same 462 px wide
in both arms; the only variable is the fluid type scale (16.4 px at 1440, smaller at 720). The
layout sits ~2 px from its own wrap threshold and the font size decides the composition.

**Mechanism.** `:148` gives the title `flex-1 basis-[10rem]` → `flex: 1 1 10rem`. Flex line-breaking
uses the flex *base* size: 160 px title + badge + the `shrink-0` cluster exceeds the 438 px content
box, so the cluster is pushed to line 2 — after which `flex-grow: 1` inflates the title to 398 px,
manufacturing the 340 px void described in §3.1.

**Cost.** 40 px of plate height (220 vs 180) — 22% of the plate — consumed by an accident.

---

### D-7 · MAJOR · No `InstrumentChassis`, a `Card` that must not exist, and an inverted narrow order

`VISUAL-CONSTITUTION.md:46` (§3.1, binding):

| Distinct member | Protagonist | Support / collapse | Mobile order | Outer housing |
|---|---|---|---|---|
| Generate | generated WatercolorDot specimen | generative-model inspector then commit region | specimen, model inspector, commit action | **`InstrumentChassis`** |

`OPTICAL-BENCH-COMPOSITIONS.md` §5: *"Browse and Library use exactly one Card shell per rendered
palette entity … **the other sixteen compositions have Card count `0`**."*

Shipped: `GeneratePane.vue:31` is `<Card tier="resting">` — Generate's Card count is **1**, must be
**0**. `GenerateControls.vue:119` is a bare `<div class="flex flex-col gap-4">` — no chassis, no
named regions.

**The primitive is installed and unused.** `@mkbabb/glass-ui@7.0.0` exports `./instrument-chassis`
with `InstrumentChassisBoundary | Proportion | Reserve | State` — precisely the P122 vocabulary the
canon specifies (`[]` boundaries, `none` reserve for Generate).

**Narrow order is inverted.** §3.1 requires `specimen → model inspector → commit action`. Shipped:
specimen *containing* the commit verbs → model inspector (preset/harmony) → count, which is a *model
input*, not a commit. The commit region precedes the inspector and the last region is not an action.

---

### D-8 · MAJOR · The count axis invents new slider mechanics and kills the producer's own fill

`VISUAL-CONSTITUTION.md:104` (§5):

> *"The domain-neutral axis composition sits over BI `Slider`: label, unit, reserved live value,
> optional numeric entry, focus/target behavior, and a color-bearing or neutral track chosen by
> semantics. Picker, **Generate count**, Extract, Gradient, Atmosphere and Blob adopt that one
> composition; feature waves own their domain arrangement, **not new slider mechanics**."*

`:292-308` does the forbidden thing: an `absolute inset-0` gradient `<div>` stacked *behind* the
Slider, with the producer's track erased per-instance via `:style="{ '--slider-track-bg': 'transparent' }"`.

**Measured consequence — the producer's state layer is dead:**

```json
{"tag":"SPAN","cls":"slider-track",                   "bg":"rgba(0, 0, 0, 0)","bgImg":"none"}
{"tag":"SPAN","cls":"slider-range glass-liquid-fill", "bg":"rgba(0, 0, 0, 0)","bgImg":"none",
 "rect":[252,643.7,157.8,24]}
```

`slider-range glass-liquid-fill` is correctly sized to the value (157.8 of 434 px) and paints
**nothing**. The consumer disabled the producer's progress affordance to make room for its own
decoration. The value is now carried by thumb position alone, over a track whose appearance never
changes with the value.

Also absent from the mandated composition: **no unit**, **no numeric entry** (glass-ui 7 exports
`./number-field`), no `aria-valuetext` (measured `null`).

Compounding: under forced-colors the gradient is stripped (`background-image: none`) and the
producer's track is already transparent, so **the slider has no track at all** —
`frames/forced-colors.png`.

---

### D-9 · MAJOR · In RTL the ramp renders the palette backwards

*(Discharges pass 1's `RTL — unproven; Hypothesis`. The hypothesis named `ml-auto` and `text-right`;
the real defect is worse.)*

`:72` hardcodes the **physical** keyword `to right`. Everything around it is logical and mirrors:
the strip is a flex row, the dots are a flex row, `ml-auto` moves the cluster.

Measured at `dir="rtl"`, 1440: `{"dir":"rtl","gradBgImg":"linear-gradient(to right, oklch(0.752003 …) 0%, …"}`
— unchanged from LTR while its neighbours mirrored. Frame `frames/rtl.png`, reading left→right:

- strip: blue, olive, magenta, teal, orange
- dots: blue, olive, magenta, teal, orange
- **ramp: orange, teal, magenta, olive, blue** — reversed

Also physical in the same block: `:288` `text-right` on the count label, which in RTL aligns the
number *away* from the track it belongs to.

**Canon.** `VISUAL-CONSTITUTION.md:153` (§6.1): *"palette/release order | **preserve explicit
ordinal identity**; UI movement announces the resulting ordinal."* The ramp inverts it silently.

*(Negative result, for fairness: the seed line **is** correctly bidi-isolated — measured
`unicode-bidi: isolate` — satisfying §6.1's LTR-isolation rule for provenance strings.)*

---

### D-10 · MAJOR · The instrument's one working output is not code-ready

Copy-all works. Measured clipboard content after clicking `[aria-label="Copy all colors"]`:

```
"oklch(71.504823561991% 0.150951768272 279.521794645116deg), oklch(69.202771743294% 0.167397465226 57.029558695154deg), o…"
```

Fifteen significant digits per channel and a `deg`-suffixed hue. No one pastes that into a
stylesheet. `VISUAL-CONSTITUTION.md:5` (§1) states the product promise:

> *"A person brings one color, image, or palette and leaves with an understood, edited,
> **code-ready** color artifact."*

The artifact this workbench delivers is machine noise. (`deg` on an OKLCh hue is legal CSS and
idiomatic nowhere.) The copy verbs at `:106-113` pass `palette.value` straight to the clipboard with
no serialization step; the plate has no output-format decision at all.

---

### D-11 · MAJOR · Copy and Save have neither a success state nor a failure state

```ts
// :106-113
async function copyColors() { await writeClipboard(palette.value.join(", ")); }
async function copyColor(css: string) { await writeClipboard(css); }
```

The producer returns a result **and documents the destructuring idiom**:

```
// node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts:35-37
 * boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`.
export declare function writeClipboard(text: string): Promise<CopyResult>;
```

Both call sites discard it. A failed write — denied permission, insecure context, Safari
user-gesture rules — produces no error, no toast, no state change. A successful write produces the
same nothing. The user cannot distinguish them.

`save()` is the same: it emits and receives no confirmation; the palette silently appears in an
adjacent pane under the wrong name (D-5).

**Canon.** `VISUAL-CONSTITUTION.md:101` (§5): *"Persistent operation state stays with the
entity/workspace. A transient flourish may celebrate success but never carries the only truth."*
Here there is neither. `PROPORTION-AUDIT.md` **PR-08**: *"Pending/failure/export/recovery truth only
transient → **ADD-AFFORDANCE**."* This is worse than transient — it is absent. glass-ui 7 exports
`./toast`; unused.

---

### D-12 · MAJOR · The closed type matrix is broken twice

`VISUAL-CONSTITUTION.md:75` (§4) and `OPTICAL-BENCH-COMPOSITIONS.md` "Binding type matrix":

> *"control or label, **including dropdown options** | `text-small` | **Plus Jakarta Sans,
> non-bold**"* … *"This matrix is closed across all eighteen compositions."*

**Break 1 — the section labels are mono.** Measured computed style of `.section-label` on `PRESET`
and `HARMONY` (`:221`, `:255`):

```json
{"text":"Preset","font-family":"\"Fira Code\", …, monospace","font-size":"14.384px",
 "font-weight":"400","letter-spacing":"1.4384px","text-transform":"uppercase"}
```

Fira Code is reserved by the matrix for *"value, code, or provenance"*. These are control labels.

**Break 2 — option names are Fraunces.** `:240` and `:270` apply `font-display` to the option name
lane, justified at `:235-239` by "P9-R5 … the ColorSpaceSelector precedent … per **T-40**" — a
T-tranche law. V's matrix is closed and supersedes it. The select *triggers* measure correctly as
`"Plus Jakarta Sans"` 16.4 px, so a trigger and its own options render in different typefaces.

---

### D-13 · MAJOR · Casters within casters; two boundary mechanisms on one edge

`:129-132`: `class="rounded-card border border-card-edge bg-well shadow-cartoon-sm min-w-0"` — a 1 px
border **and** a cartoon drop shadow — nested inside `GeneratePane.vue:31`'s `<Card>`, which carries
its own caster. Two nested hard offset shadows are visible in every tracked desktop capture.

- `OPTICAL-BENCH-COMPOSITIONS.md` §5: *"Any additional line … **caster stroke** or corner rule is a defect."*
- `PROPORTION-AUDIT.md` **PR-05**: *"Dividers, **caster shadows** and corner marks repeat a boundary → **REMOVE**."*
- `VISUAL-CONSTITUTION.md:186`: *"…**not cartoon casters stacked within casters**."*
- `VISUAL-CONSTITUTION.md:19`: *"One surface has one tier."* The plate declares `bg-well` (§2
  Specimen-well tier: *"opaque/quiet neutral stage"*) and then adds structural-glass caster chrome.

---

### D-14 · MINOR · Slider thumb is a 12×24 target

Measured live: `{"role":"slider","rect":[405.5,643.7,12,24]}`. Corroborated independently by the
tracked audit in **all four matrices** — `REPORT.json`, `/#/generate`:
`{"w":12,"h":24,"tag":"span","label":"Color count"}`.

WCAG 2.5.8 Target Size (Minimum, AA) requires 24×24 CSS px; the failing axis (12 px) is the only axis
this control travels on. Producer geometry — but adopted without the invisible seat
`PROPORTION-AUDIT.md` §5.7 explicitly permits: *"Visual glyph size, operable target size and layout
reservation are separate quantities."*

*Attribution.* The other four small tap targets on `/#/generate` (a 160×23 input and three 22×22
buttons named "Switch to slug" / "Generate new slug" / "Cancel") belong to
`demo/palettes/browser/slug/PaletteSlugBar.vue` in the adjacent My Palettes pane — **not** to this
component.

---

### D-15 · MINOR · A long palette name is hard-clipped mid-word

Same comment, `:142`: *"never a clipped title."* Measured after typing a 67-character name:

```json
{ "w": 387.8, "scrollW": 687, "clientW": 388, "clipped": true, "textOverflow": "clip" }
```

Frame `frames/longname-light.png` reads `A Deliberately Very Long Generated Pale` and stops. No
ellipsis, no fade, no `title` attribute. 299 px of the user's own text is invisible, and because the
element is an `<input>` the overflow *scrolls away*, so it is not even discoverable by widening the
window. `:148` sets `min-w-0` and no `truncate`; `<input>` defaults to `text-overflow: clip`.

---

### D-16 · MINOR · `count = 1` degenerates the instrument

```
inline: "background: linear-gradient(to right, oklch(0.587307 0.129626 111.598) 50%);"
computedBgImage: "linear-gradient(to right, oklch(0.587307 0.129626 111.598) 50%)"
```

A **single-stop** gradient. Both engines accept it and paint a flat 434×24 solid, so it is not
broken — but the ramp has no ramp semantics left, and §3.2's 70%-one-colour plate results. `:69`'s
`colors.length === 1 ? 50 : …` shows the case was seen arithmetically and never composed visually.

---

### D-17 · MINOR · Dead masking fallback for an unreachable state

`:66-67` — `if (colors.length === 0) return "var(--muted)";`

`count` is bounded `[1,12]` by the slider (`:301-302`) and `generatePalette` returns `count` colours,
so the branch is unreachable. Owner edict 2 (*no masking fallbacks*). Its presence also implies an
"empty" state that was never designed and cannot occur, misleading the reader about the state space.

---

### D-18 · MINOR · The only motion declaration is inert, untokenized, and the real motion is missing

`:205` declares `active:scale-95 transition-transform`. Measured on the rendered dot:

```json
{"transition-property":"transform, border-radius, filter, box-shadow",
 "transition-duration":"0.2s, 0.6s, 0.2s, 0.2s"}
```

The producer's transition wins; the consumer's never applies — and `active:` can never fire anyway
(`pointer-events: none`, D-1). It is also ad hoc rather than one of `--animation-slide-sm/md/lg`
(owner edict 6).

The substantive motion is simply absent: pressing **Regenerate** replaces the strip, every dot and
the ramp instantaneously. The one verb whose entire purpose is *change* communicates change with no
motion design at all.

---

### D-19 · MINOR · The seed provenance is a dead end

`:59-60` and `:212-214` display `seed: <8 hex>` with `select-all`, described as *"the plate's bench
note (provenance, like a specimen label)"*.

```
$ grep -rn "seed.value =" demo/workbenches/generate/
composables/useColorGeneration.ts:31:  seed.value = Math.floor(Math.random() * 0xffffffff);
```

The seed is **only ever** assigned a fresh random value; no seed entry exists anywhere. The one piece
of provenance the plate carries can be copied and never used — the palette it identifies can never
be restored.

**Canon.** `VISUAL-CONSTITUTION.md:194`: *"Regeneration **names which model inputs stay fixed and how
the seed changes**."* The UI names neither. Provenance with no restore path is decoration in the
costume of data.

---

### D-20 · MINOR · Five per-instance overrides of design-system roots

Owner edict 5 (*style at the root, never per-instance*):

| Line | Override | Root |
|---|---|---|
| 150 | `class="text-mono-small shrink-0"` | glass-ui `Badge` |
| 159 | `class="h-9 gap-2 font-medium font-display shrink-0"` | glass-ui `Button` |
| 223 | `class="h-9"` | glass-ui `SelectTrigger` |
| 257 | `class="h-9"` | glass-ui `SelectTrigger` |
| 305 | `:style="{ '--slider-track-bg': 'transparent' }"` | glass-ui `Slider` |

`h-9` appears three times — a root-level height decision made per instance. `demo/ui/{badge,button,select,slider}`
are pure re-exports of glass-ui, so these are direct producer overrides, not shadcn-layer edits.

---

### D-21 · INFO · Three labeled fields hand-rolled against an existing primitive

`:220-252`, `:254-281` and `:286-309` each hand-roll `label + control`. `@mkbabb/glass-ui@7.0.0`
exports `./labeled-field` shipping `LabeledField`, `LabeledInput` and `LabeledSelect`
(`LabeledFieldProps`, `LabeledSelectProps`, `LabeledInputProps`, with `layout`, `invalid`,
`disabled`, `errorLive` and an `error` slot). Owner edicts 4 and 3.

The hand-rolls are why D-12, D-11's missing error surface and D-8's missing unit each exist
independently — the primitive supplies all three.

---

### D-22 · INFO · The count is stated four times

`Badge` (`:150`), the slider `<label>` (`:287-291`), `aria-valuenow`, and the cardinality of the dot
row. With D-2's triple depiction of the palette, the plate restates two facts seven times.

---

## 5. State coverage

| State | Handled? | Evidence |
|---|---|---|
| empty | **dead branch** | unreachable (D-17) |
| loading | n/a | generation is synchronous and pure (`useColorGeneration.ts:26-28`) |
| populated | yes | the only designed state |
| error | **none** | `writeClipboard`'s `{ ok }` discarded (D-11) |
| disabled | **none** | no control has a disabled register |
| focused | **broken** | 0 of N swatches focusable; `focus-visible:outline-none` at `:205` removes the producer ring (measured `outline-width: 3px`, `outline-style: none`) and supplies no replacement |
| hovered | **load-bearing and lost** | the title's only affordance is `hover:underline decoration-dashed` (`:148`); on touch, hover never occurs |
| active / pressed | **dead** | `active:scale-95` can never fire — `pointer-events: none` (D-1) |
| selected | n/a | no selection model |
| dragging | n/a | no reorder |
| overflowing | **partial** | 12 dots wrap 9+3 while the strip shows 12 equal bands (§3.2); the chrome row wraps at 1440/320 but not 720 (D-6) |
| truncated | **unhandled** | quantified: `scrollWidth 687 / clientWidth 388`, `text-overflow: clip` (D-15) |
| RTL | **broken** | ramp order inverted vs strip and dots (D-9) — *pass 1's hypothesis, now reproduced* |
| reduced-motion | **sound** | measured dot `transition-duration` `0.2s,0.6s,0.2s,0.2s` → `0.1s` under `reducedMotion: reduce`; global guard `demo/styles/animations.css:184-193`. Not a defect. |
| forced-colors | **broken** | strip → `rgb(255,255,255)`; ramp `background-image: none`; track invisible (§3.5, D-8) |
| zoomed / 720 | **sound, and it falsifies the hypothesis** | one line, plate 180 px — the row fits at half-width (D-6) |
| post-save confirmation | **none** | no status region; and the name is wrong when it lands (D-5, D-11) |

---

## 6. Mechanism families

| Family | Findings | Mechanism |
|---|---|---|
| **A — dead producer contract** | D-1, D-2 | Authored against `WatercolorDot`'s `tag="button"` interactive host, which Glass 7 removed per P051. Fallthrough attrs are untypecheckable, so nothing surfaced the removal; the specimen silently became ornamental, AT-invisible and `pointer-events: none`. |
| **B — sRGB in a colour lab** | D-3, D-9, D-10 | Hand-rolled `linear-gradient` with OKLCh stops, no interpolation hint, physical `to right`; and raw `oklch()` strings shipped straight to the clipboard. Colour correctness was never given an owner. |
| **C — canon not applied at this site** | D-4, D-7, D-8, D-12, D-13, D-14, D-20, D-21 | The V composition for Generate (`InstrumentChassis`, Dock-only actions, closed type matrix, zero casters, no new slider mechanics) was never executed here; T-era laws survive in the comments and in the markup. |
| **D — flex-basis vs fluid type** | D-6, D-15 | `flex-1 basis-[10rem]` sits ~2 px from the wrap threshold, so the fluid type scale decides the composition; and the same element clips without an ellipsis at any length. |
| **E — states specified in comments, never composed** | D-5, D-11, D-16…D-19, D-22 | Copy/save feedback, name persistence, `count=1`, seed restore, regenerate motion: each is described in a comment and absent from the render. |

**The gestalt.** Families A, C and E share one root: **the comments are the design document, and the
design document is out of date.** This file carries roughly 60 lines of authoritative-sounding law
(`T-17 · the F5 TRUTH LAW`, `WR-6 / T-54`, `T-28's outline law rides`, `P9-R5`, `B.W1 width,
re-verified`) — and several of those laws have been overruled by the V constitution or deleted by
Glass 7. The prose is load-bearing in the worst way: it is confident, specific, and wrong, so it
reads as verification and functions as camouflage.

The cure is therefore not a series of patches. It is: **house the route in `InstrumentChassis` with
its three declared regions, move the verbs to the Dock set that already exists, let the specimen be
one named thing, and delete the commentary that defends the old shape.** Every finding except D-3
and D-10 falls out of that transposition; D-3 and D-10 are the independent colour-correctness wave.

---

## 7. Negative results (checked and sound)

Reported so the positives carry weight.

1. **`prefers-reduced-motion` honoured** — measured, §5.
2. **No horizontal overflow anywhere** — `scrollWidth − clientWidth === 0` at 1440, 720, 320 and RTL;
   matches `REPORT.md:23` (`horizontalOverflow — 0`).
3. **Zero console errors, zero page errors** on `/#/generate` in all four tracked matrices
   (`REPORT.md:124,139,154,169`).
4. **`verbatimModuleSyntax` clean** — all three type-only imports use `import type` (`:21`, `:32`, `:33`).
5. **Vue 3.5 idioms appropriate** — no `defineModel` round-trip so no `shallowRef` hazard; no template
   refs; no props. Edict 7 satisfied.
6. **The preview-truth law genuinely holds.** `presetStops`/`harmonyStops` (`:94-100`) call the same
   pure, mulberry32-seeded `generatePalette` the selection will use, so each dropdown row's
   `PreviewStrip` is byte-identical to what selecting it yields. The claim at `:87-93` is true, and
   `SelectContent` really does unmount when closed, so the rest cost really is zero. **This is the
   best-designed thing in the file** and should survive the transposition intact.
7. **Provenance is bidi-isolated in RTL** — measured `unicode-bidi: isolate` (§6.1 satisfied).
8. **Dark chrome uses the restrained neutral pole** — no seed tint on plate chrome
   (`VISUAL-CONSTITUTION.md:21`).
9. **Copy-all does reach the clipboard** — the only end-to-end working output path in the component
   (its *content* is the D-10 defect, not its plumbing).

---

## 8. Wave — `W·GEN-1` · **BLOCKED-ON-GLASS-V8**

**No edit is proposed and none may land.** `docs/tranches/V/reformation/CARRY-LEDGER.md:55-79` pins
this exact file inside the glass BJ W4 hold:

> *"**glass BJ W4 / v8 Slider post-cut consumer hold (2026-07-22):** … Glass remains
> producer/package/browser RED. Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`,
> **hold all consumer edits** and the `@mkbabb/glass-ui` pin until one unique immutable v8 candidate
> proves exact source→built→packed→installed→served equality, is neither a workspace/source link nor
> mutable v7, and survives two unchanged-byte Sol critics. Then migrate only the property name to
> the inheriting CSS-`background` seam `--glass-slider-track-background` in the four pinned
> receivers: … `GenerateControls.vue`
> (`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`). Preserve the
> perceptual/alpha-checker ramps, ancestor-fed certified `--ink-muted`, transparent K/count
> underlays, kC `trackInk`, orientation/RTL/inversion and existing pixels; **add no `--track-bg`, v7
> alias, copied CSS or local mask.**"*

### Exact release condition (conjunctive — all five)

1. One **unique immutable Glass 8 candidate** exists on the registry — not a workspace link, not a
   source link, not mutable v7.
2. It proves **exact source → built → packed → installed → served equality**.
3. It **survives two unchanged-byte Sol critics**.
4. Value authority is still `c654824e0b252cda7f8490b67f182a48c48cc0ed`, or the hold is re-bound to
   the new authority first.
5. Both installed public CSS entries retain `backdrop-filter: none` **and**
   `-webkit-backdrop-filter: none`, and **a real browser computes both as `none`** — the condition
   for retiring the duplicate spectrum-range blur rule in `demo/styles/foundation.css`.

Until all five hold, `GenerateControls.vue` is byte-frozen at `4f95c57c…ae324f6` and this document
is a **record only**.

### The sequencing collision this seat must escalate

The hold's on-release scope is narrow: *"migrate **only** the property name"*
`--slider-track-bg` → `--glass-slider-track-background` at `:305`, preserving *"transparent K/count
underlays … orientation/RTL/inversion and existing pixels."*

**That collides head-on with D-3, D-8, D-9 and §3.5**, all of which live in the count underlay the
hold instructs us to preserve pixel-for-pixel. Therefore:

- **W·GEN-1a — on release, in scope.** The property-name migration only. Byte-minimal, pixels
  preserved, exactly as the hold specifies. No finding in this document is addressed.
- **W·GEN-1b — a separate wave, requires its own owner ruling.** Everything else. It **cannot** be
  folded into 1a, because 1a is contractually pixel-preserving and D-3/D-8/D-9 are pixel changes to
  that same element.

> **Open question owed to the owner (this seat files it; it does not answer it):** does the hold's
> *"existing pixels"* clause discharge with W·GEN-1a, leaving W·GEN-1b free to change the count
> underlay — or does it bind every future wave touching that element?

### Ordering within W·GEN-1b — dependency-first, not severity-first

1. **D-7** — adopt `InstrumentChassis` with the §3.1 three regions; delete the `Card`
   (`GeneratePane.vue:31`). Everything else needs somewhere to live.
2. **D-4** — the three verbs collapse to the Dock control set alone; the plate stops being "a flat
   strip plus unrelated buttons". This dissolves **D-6** and one of **D-20**'s rows without touching
   them.
3. **D-1 / D-2** — execute the P051 Generate site: named geometric seats around ornamental faces; the
   specimen gains its named-list AT representation. Fixes **D-18**'s dead `active:` too.
4. **D-5** — rule the title: provenance (the pane wires the name) or identity (a static subheading).
   **D-15** follows from whichever is chosen.
5. **D-3 / D-8 / D-9 / D-10** — the colour-correctness wave. The count axis adopts the §5
   domain-neutral composition and the hand-rolled gradient dies; the clipboard gains a serialization
   step. Fixes **D-14**'s seat, **D-16**, and **D-21**'s missing unit.
6. **D-11, D-12, D-13, D-17, D-19, D-20, D-22** — fold into the waves above; none needs its own.
7. **Last: delete the stale commentary.** Per §6, the out-of-date law prose is a defect in its own
   right. A wave that fixes the markup and leaves `:194-196` asserting `tag="button"` is the
   copy-verb seat has not closed the finding.

### Coordination relay owed (standing glass-ui BH/BI edict)

Two findings are **producer-side** and must reach the active glass-ui BH inbox regardless of the
hold, because a consumer cannot fix them:

- **BH-relay-1 (from D-1).** `WatercolorDot` 7.0.0 silently swallows a consumer `aria-label`, forces
  `aria-hidden="true"`, and sets `pointer-events: none` on the root and its `<svg>`. Correct for an
  ornamental face; catastrophic when the face is the *only* representation of data, because P051
  requires data-bearing faces to *"remain present as noninteractive named list/text content"* and
  the producer currently makes attaching that name impossible from the consumer side. Request:
  honour a passed accessible name, **or** make the omission detectable (a dev-mode warning when a
  consumer passes `aria-label`/`tag`, both of which are silently dropped today).
- **BH-relay-2 (from D-14).** `slider-thumb` renders 12×24 CSS px — below the WCAG 2.5.8 24×24 floor
  on its only axis of travel — in all four tracked matrices, across every consumer.

---

## 9. Appendix — commands and artifacts

```bash
shasum -a 256 demo/workbenches/generate/GenerateControls.vue
grep -rn "GenerateControls\|GeneratePane" demo/ --include="*.vue" --include="*.ts"
grep -rn "regenerate\|copyColors" demo/shell/usePaneRouter.ts     # :196 :197 :198
grep -rn "seed.value =" demo/workbenches/generate/                # random only, no entry
node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"   # 7.0.0
cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/*.d.ts     # no `tag` prop
cat node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts    # -> Promise<CopyResult>

node gc-probe.mjs   # WebKit 1440 light+dark — rects, computed type, wrap delta
node gc-probe2.mjs  # WebKit — seat, tab, slider DOM, count=1/12, long name
node gc-probe3.mjs  # Chromium — AT tree, tab order, count=1, save round-trip
node gc-probe4.mjs  # interpolation chroma-loss measurement
node gc-probe5.mjs  # forced-colors / reduced-motion / 720 / RTL / 320
node gc-probe6.mjs  # pointer-events hit-test, real click, clipboard sentinel
```

**Frames.** Tracked set (pre-existing):
`docs/tranches/V/megatranche/audit/visual/shots/safari-{desktop,mobile}-{light,dark}/generate.png`.

Captured by this seat, in `frames/` beside this file:
`plate-light-1440.png` · `count1-light.png` · `count1-chromium.png` · `count12-light.png` ·
`longname-light.png` · `save-name-drop-chromium.png` · `forced-colors.png` · `reduced-motion.png` ·
`rtl.png` · `zoom-200.png` · `narrow-320.png`

**Prior pass.** `challenge-D-design.2026-07-24-pass.md` — corroborated, not superseded.
