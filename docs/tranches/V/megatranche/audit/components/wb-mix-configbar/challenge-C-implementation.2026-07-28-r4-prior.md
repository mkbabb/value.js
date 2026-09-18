# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation (r4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. This seat was spawned with an explicit Opus 5 declaration and is serving it as
declared. Nothing here is inherited or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`,
glass-ui `7.0.0` installed, dev server live on `:9000`.

**Pass note.** Three prior passes of this seat exist and are preserved verbatim:
`challenge-C-implementation.2026-07-27-r1-prior.md`,
`…2026-07-28-r2-prior.md`, `…2026-07-28-r3-prior.md`. r3 was a careful pass; its ledger
(C-1…C-16, N-1…N-3) is real and I re-measured its two blockers independently before reading
it. **This pass exists because r1–r3 all audited the same surface — the props, the tokens,
the a11y wiring, the gates — and none of the three ever executed the component's own
vocabulary against a color.** That is what I did. The nine `INTERPOLATION_SPACES` rows this
file renders are not decoration: each is a promise that the app can mix in that space. One
of them is false, and it takes the whole application down.

Tags: **[NEW]** = absent from r1/r2/r3. **[CONFIRMED]** = prior claim, re-derived here by my
own probe. **[REFUTED]** = prior claim I could not reproduce.

---

## Verdict

**DEFECTIVE — and the defect is now larger than the component.**

r3's headline was "the T-17 preview apparatus has never rendered." True, and confirmed. But
it is a *dormant* defect: nothing renders, nothing breaks. This pass found a **live** one.

> **Selecting `HSL` — row 5 of the nine this component's Color-space Select offers
> (`MixConfigBar.vue:107`, `color-space-meta.ts:31`) — with pure white among the operands
> destroys the application.** Not the pane: the application. `convertColor(white, "hsl")`
> returns `color_non_finite`; nothing on the mix path catches it; the throw climbs to the
> app-root `ErrorBoundary` (`App.vue:50`), which replaces the entire two-pane grid with
> "This panel hit an unexpected error." I reproduced this end-to-end in the shipped app at
> `http://localhost:9000` — two user actions, no devtools, screenshot below — through the
> *identical* nine-space vocabulary module this file imports at `:18`.

Pure white is not an edge case in a color tool. It is the first color anyone picks.

---

## Scope read

| artifact | path |
|---|---|
| subject | `demo/workbenches/mix/MixConfigBar.vue` — 173 lines, read whole |
| parent / state | `MixPane.vue`, `composables/useMixingState.ts`, `MixSourceSelector.vue` |
| sampler | `demo/color-session/color-chips/{sample.ts,PreviewRamp.vue}` |
| vocabulary | `demo/color-session/color-space-meta.ts`, `picker-color.ts`, `color-utils.ts` |
| strategy | `demo/palettes/mix.ts` (the `leftoverStrategy` this bar owns) |
| library | `src/color/{anchors.ts,operations.ts}`, `src/css/grammar.ts` |
| sibling consumer | `demo/workbenches/gradient/composables/useGradientInterpolation.ts` (same vocabulary) |
| boundary | `demo/color-picker/{App.vue,ErrorBoundary.vue}` |
| gates | `.github/workflows/ci.yml`, `test/preview-chips.test.ts`, `test/v4-color-behavior.test.ts` |
| live | 5 headless Chromium sessions on `http://localhost:9000` |
| visual | `audit/visual/REPORT.json` (4 `/#/mix` rows), `shots/safari-desktop-light/mix.png` read visually |

## What I executed

| # | probe | tool | verdict |
|---|---|---|---|
| P1 | 14 edge operand sets × sampler + `startMix` | `vite-node` | §R4-1, §R4-2 |
| P2 | 9 spaces × 4 arcs × 4 operand sets = 144 sampler combos | `vite-node` | §R4-3 |
| P3 | sRGB cube sweep, 4096 samples, rgb→hsl | `vite-node` | §R4-1 (exactly 1 failure) |
| P4 | `distribute` trajectory + output palette | `vite-node` | §R4-6 |
| P5 | **live end-to-end reproduction of the throw** | playwright | §R4-1 (screenshot) |
| P6 | accessible-name computation on both triggers | playwright | §R4-5 |
| P7 | menu census: rows, chips, `data-stops`, `aria-selected`, heights | playwright | §R4-3, negative proofs |
| P8 | `CSS.supports` on all four stop shapes the sampler emits | playwright | negative proof |
| P9 | the exact one-operand mutation on `test/preview-chips.test.ts` | `vite-node` | §R4-4 |
| P10 | CI workflow grep for any e2e step | `grep` | §R4-4 |

All probes were written to the session scratchpad (`/private/tmp/claude-504/…`) and run from
there. **The repository tree is unmodified**; this seat wrote only inside its own audit
directory.

---

# Part 1 — new findings

## R4-1 · BLOCKER **[NEW]** — the `HSL` row is a live application-killer, and the component hides the warning

### The library fact

`src/color/anchors.ts:167-174`:

```ts
function encodedToHsl(rgb: Vec3): readonly [number, number, number] {
    const hsv = encodedToHsv(rgb);
    const max = Math.max(...rgb);
    const min = Math.min(...rgb);
    const lightness = (max + min) / 2;
    const delta = max - min;
    return [hsv[0], delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1)), lightness];
}
```

The saturation divides by `1 − |2L − 1|`, which is **exactly zero at L = 1**. The
`delta === 0` guard is meant to cover the achromatic case — and it does, at black. It fails
at white, because `convertColor` routes every cross-space conversion through XYZ
(`operations.ts:47-52`) and the round trip is not bit-exact:

```
$ npx vite-node …/cfgbar-r4-probe4.ts
=== C. the arithmetic, exposed ===
  white -> xyz     : [ 0.9504559270516717, 1, 1.0890577507598784 ]
  white -> srgb-lin: [ 1.0000000000000004, 0.9999999999999998, 1 ]
  white -> hsv     : [ 336, 5.551115123125782e-16, 1.0000000000000002 ]  (no division -> survives)
  white -> hwb     : [ 336, 0.9999999999999997, -2.220446049250313e-16 ]  (no division -> survives)
```

`delta ≈ 6e-16 ≠ 0`, denominator `= 0` ⟹ `Infinity` ⟹ `operations.ts:52` returns
`color_non_finite`.

**It is exactly one color.** Sweeping the sRGB cube at step 17:

```
=== A. sRGB cube sweep, step 17 (16^3 = 4096 samples) ===
samples=4096  failures=1
rgb(255 255 255) -> color_non_finite
```

Every spelling of white fails except the one that never converts (native `hsl()`):

```
=== B. named / common spellings of white ===
  #fff                   FAIL color_non_finite
  #ffffff                FAIL color_non_finite
  white                  FAIL color_non_finite
  rgb(255 255 255)       FAIL color_non_finite
  rgb(100% 100% 100%)    FAIL color_non_finite
  color(srgb 1 1 1)      FAIL color_non_finite
  hsl(0 0% 100%)         ok  [0,0,1]           ← same-space early return, never divides
  #fffffe                ok  [59.999999999994884,1.000000000000085,0.9980392156862745]
```

### The component's exposure

`MixConfigBar.vue:107` renders one `SelectItem` per `INTERPOLATION_SPACES` entry;
`color-space-meta.ts:31` is `{ value: "hsl", label: "HSL", description: "Web-native
cylindrical" }`. Choosing it writes `colorSpace`, and `useMixingState.ts:87` then does:

```ts
const colors = selectedColors.value.map((selection) =>
    parseColorIn(selection.css, colorSpace.value),   // ← throws. no try. no catch.
);
```

There is no error handling anywhere on the path:

```
$ grep -rn "catch\|try {\|error\|Error" demo/workbenches/mix/*.vue demo/workbenches/mix/composables/*.ts
(end)          ← zero matches in the entire mix workbench
```

Per-space, with the two most ordinary operands in existence:

```
=== 1. startMix() for grayscale operands, per offered space (the ONE verb) ===
  oklch  chip=chip         startMix=oklch(50% 0 none)
  oklab  chip=chip         startMix=oklab(50% 0 0)
  lab    chip=chip         startMix=lab(50% 0 0)
  lch    chip=chip         startMix=lch(50% 0 none)
  hsl    chip=NULL(hidden) startMix=!!! THREW: color_non_finite
  hsv    chip=chip         startMix=oklch(59.818073052685% 0 none)
  hwb    chip=chip         startMix=hwb(336deg 50% 50%)
  rgb    chip=chip         startMix=rgb(127.5 127.5 127.5)
  xyz    chip=chip         startMix=color(xyz 0.475227963526 0.5 0.54452887538)
```

### The live reproduction — executed

I could not populate the mix operands in the live app, because C-2 (below) is real and the
add-color affordance is inert. So I reproduced the *identical* defect through the *identical
vocabulary module* in the sibling workbench, whose controls do work.
`useGradientInterpolation.ts:33-38` calls the same `parseColorIn(css, space)` with the same
nine-row Select. Two user actions:

1. type `linear-gradient(90deg, #ffffff 0%, #ff0000 100%)` into the **Gradient CSS** field;
2. choose **HSL** from **Interpolation space**.

```
$ node …/cfgbar-r4-live4.mjs
### 1. after entering a WHITE stop (space still OKLCh)
{ "errors": "none" }
### 2. after switching Interpolation space -> HSL
{ "errors": "none" }
### 3. what the user now sees
{ "boundaryVisible": true,
  "bodyText": "dev misconfigured — run `npm run dev` This panel hit an unexpected error. color_non_finite Try again",
  "panes": 0,
  "mainCount": 1 }
```

Screenshot: `scratchpad/cfgbar-r4-hsl-white.png` — **both panes are gone.** The picker, the
workbench, the user's entire session state: replaced by an aurora field and a lone "Try
again" pill. `App.vue:47-50` wraps the whole grid in one boundary, and
`ErrorBoundary.vue:68` returns `false`, so the throw stops there — which is why **`errors`
is `none` in both steps**: neither `console.error` nor `pageerror` fires.

**Corollary [NEW] — the visual audit is blind to this class.** `REPORT.json`'s four `/#/mix`
rows record `consoleErrors: []`, `pageErrors: []`. My reproduction produced a total UI
collapse with *both of those arrays empty*. The harness's error columns cannot see a
boundary-caught throw. Clean rows are not evidence of absence here.

### Why this component is culpable, not merely adjacent

`MixConfigBar.vue` is the surface that **offers** `HSL`. It offers it identically to the
eight that work, with no gating and no warning, and — see R4-3 — the one signal that
something is wrong (the missing preview chip) is rendered as the same blank the file uses
for "honest absence."

**Cure (gestalt, not patch).** Two independent repairs, both small:

1. **Library**: `anchors.ts:173` — the guard must key on the *denominator*, not the
   numerator. `const denom = 1 - Math.abs(2 * lightness - 1); denom === 0 ? 0 : delta / denom`.
   One expression; kills the entire class at L∈{0,1}. (This is the library seat's edit; it is
   stated here because the reproduction is this component's.)
2. **Demo**: `startMix` (`useMixingState.ts:79-101`) must not be able to throw into a render
   tree. The library is `Result`-typed by design (`operations.ts` returns `err(...)`, never
   throws); `parseColorIn`/`convertPickerColor` (`picker-color.ts:105-117`) exist *only* to
   convert that discipline back into exceptions. The idiomatic repair is to keep the Result
   at the call site the user can reach and render an honest failure, exactly as the sampler
   already does at `sample.ts:64,81`. The mix path is the only one of the two that lies.

---

## R4-2 · MAJOR **[NEW]** — near-white in HSL yields **negative saturation**, and the app stores it

The same division does not only blow up at exactly L = 1; it degenerates on approach. The
picker's own white — `oklch(100% 0 h)`, which is what the color model actually emits — does
not throw. It produces something worse:

```
=== A. the picker's own white: oklch(L% 0 h) as L -> 100% ===
  oklch(99.9  % 0 250)  -> hsl [337.5,0,0.998681]
  oklch(99.99 % 0 250)  -> hsl [343.636364,0,0.999868]
  oklch(100   % 0 250)  -> hsl [342.857143,-2.625,1]        ← saturation = −262.5 %
```

and the mix result is then serialized, stored, and re-parsed without a murmur:

```
=== C. what the MIX then produces + whether it round-trips ===
  picker-white + red
     startMix -> hsl(351.428571428571deg -81.25% 75%)
     reparse  -> hsl(351.428571428571deg -81.25% 75%)
     chip     -> 17 stops, first=oklch(100% 0 none)
```

`MixPane.vue:38-47` hands exactly this string to `pm.createPalette(...)`. A saved palette can
therefore contain `hsl(… -81.25% …)` — a color outside its own space's domain, indefinitely,
re-loaded on every visit. CSS clamps it on paint, so it *looks* plausible; every arithmetic
consumer downstream inherits the corruption.

**Cure.** The denominator guard of R4-1 fixes the sign. Independently, `makeColor`
(`model.ts:87`) validates finiteness but not domain — a range assertion for `hsl.s ∈ [0,1]`,
`hwb.w+b`, etc. would have caught this at the boundary where it was created rather than
three modules downstream.

---

## R4-3 · MAJOR **[NEW]** — the chip `v-if` overloads "nothing true to say" with "this row will crash your mix"

`sample.ts:50-51` states the honesty law: return `null` when "the preview has nothing TRUE to
say — fewer than 2 parseable operands (honest absence, never a canned swatch)". The component
implements it at `:111` and `:133` as a bare `v-if`.

But `sample.ts:60-66` also returns `null` when `parseColorIn` **throws** — which is now known
to include "this candidate space cannot represent this operand at all." The two are rendered
identically. Measured census of what the open Space menu would show:

```
=== white + red (the commonest pair) ===
  space rows : OKLCh=chip  OKLab=chip  Lab=chip  LCh=chip  HSL=BLANK  HSV=chip  HWB=chip  RGB=chip  XYZ=chip
  hue rows @hsl  : Shorter=BLANK  Longer=BLANK  Increasing=BLANK  Decreasing=BLANK
=== red + blue (chromatic) ===
  space rows : OKLCh=chip  OKLab=chip  Lab=chip  LCh=chip  HSL=chip   HSV=chip  HWB=chip  RGB=chip  XYZ=chip
```

Eight rows carry a ramp; one is blank. A user reads the blank as "HSL has no preview." It
means "HSL will take the app down." And if HSL is already the current space, **all four hue
rows go blank simultaneously** — the strongest possible signal, rendered as absence.

This is a *component-level* defect independent of the library bug: the guard collapses three
distinct states (no operands / unparseable operand / unrepresentable in this space) into one
pixel. The file demonstrably knows how to withhold an inapplicable control —
`v-if="showLeftoverStrategy"` at `:144` — and applies that discipline to the one control that
is never inapplicable while applying none to the one that is.

**Cure.** `sampleInterpolationRamp` should return a discriminated result
(`{ kind: "ramp", stops } | { kind: "insufficient" } | { kind: "unsupported", code }`) —
the module already speaks `Result` internally; it throws the discrimination away at the
`return null`. The row then renders a ramp, nothing, or a disabled row with a reason. Three
states, three renderings, no new component and no new directory.

---

## R4-4 · BLOCKER **[NEW]** — CI runs no end-to-end tests at all, and the one unit oracle that walks the broken path is one operand away from red

r3 correctly reported that `o14-preview-truth.spec.ts` fails locally (2 of 3) and that
`vue-tsc` is structurally blind to the prop family. The sharper fact is upstream of both:

```
$ grep -rn "playwright" .github/workflows/
(no playwright step in any workflow)

$ grep -n '"e2e\|"test' package.json
67:        "test": "vitest run",
68:        "test:e2e": "playwright test"
```

`.github/workflows/ci.yml:31-37` is the whole producer gate: `npm run lint`, `vue-tsc` ×2,
`npm run build`, `npm test` (vitest), pack-verify — then a separate `api` job. **The
`test:e2e` script exists and nothing invokes it.** Every oracle under `e2e/smoke/**` —
the O-14 paint≡stamp leg, `safari/mix-flow.spec.ts`, all of it — is a local-only artifact.
That is the structural reason C-1, C-2 and this pass's R4-1 could all ship green.

And the vitest oracle that *does* cover the sampler walks the broken path already —
`test/preview-chips.test.ts:78-88` loops `["hsv", "xyz", "lab", "hsl"]` — but with two
chromatic operands (`:35`). One operand changes the colour of the suite:

```
$ npx vitest run test/preview-chips.test.ts
 ✓ test/preview-chips.test.ts (4 tests) 14ms

# the mutation: OPERANDS[1] := "#ffffff"
$ npx vite-node …/cfgbar-r4-mut.ts
  hsv   stops.length = 17  -> assertion at :81 PASSES
  xyz   stops.length = 17  -> assertion at :81 PASSES
  lab   stops.length = 17  -> assertion at :81 PASSES
  hsl   TypeError: Cannot read properties of null (reading 'length')  -> the suite ERRORS at :81
```

The library suite cannot help either. **The entire test tree converts a color into `hsl`
exactly once**, and that once is the same-space identity case which returns at
`operations.ts:44` before `encodedToHsl` is ever called:

```
$ grep -rn "convertColor(.*hsl" test/ demo/test/
test/v4-color-behavior.test.ts:58:    expect(convertColor(source, "hsl")).toEqual({ ok: true, value: source });
                                       // source = unwrap(hsl(210, 0.5, 0.4))  ← already hsl
```

`test/v4-color-behavior.test.ts:90-92`'s "carries powerless hue" case likewise mixes two
*native* `hsl()` colors. `encodedToHsl`'s division has never been executed by a test at its
boundary.

**Cure.** (1) Add the e2e job to `ci.yml` or delete the specs — a suite nothing runs is worse
than no suite, because it reads as coverage. (2) Give the sampler oracle a *domain-boundary*
operand row: white, black, transparent, and a neutral gray, crossed with all nine spaces —
that is 36 assertions and it would have caught R4-1, R4-2 and R4-7 in one go.

---

## R4-5 · MAJOR (a11y) **[NEW]** — `aria-label` on the trigger suppresses the current value, and the name is not unique on its own page

`MixConfigBar.vue:100,123,147` each hand-write an `aria-label` on the `SelectTrigger`. That
string *replaces* the trigger's content as the accessible name — and the trigger's content is
`<SelectValue />`, the only place the current selection is exposed. Measured live:

```
### 2b. is the CURRENT VALUE part of the accessible name?
{ "combobox named exactly 'Color space'": 1,
  "combobox whose name contains 'OKLab'": 0,
  "combobox whose name contains 'Shorter'": 0,
  "comboboxes matching /color space/i (ambiguity)": 2 }
```

A screen-reader user tabbing into this bar hears *"Color space, combobox, collapsed"* and is
never told that the space is OKLab. Sighted users read it off the trigger (`text: "OKLab"`,
measured); AT users cannot. The visible label and the accessible name are the same string, so
no automated name-check flags it — the *value* is what went missing, and nothing audits that.

Second half: the name is **ambiguous on its own route**. `/#/mix` ships two comboboxes whose
names both match `/color space/i`:

```
### D1. colors mode
"combos": [ "Select view", "Select color space", "Color space", "Hue method" ]
```

`"Select color space"` is the picker's own space control, reading **"Lab"**; `"Color space"`
is this bar's, reading **"OKLab"**. Both are visible simultaneously — confirmed in
`shots/safari-desktop-light/mix.png`, where the picker plate is titled *Lab* in display
italic while the mix bar's eyebrow reads *COLOR SPACE · OKLab*. Two different color spaces,
two nearly identical names, one screen.

**Cure.** glass-ui ships `Label` with `for?: string` and `demo/ui/label/index.ts` already
re-exports it. `<Label for="mix-space">Color space</Label>` + `:id="'mix-space'"` on the
trigger, and **delete the `aria-label`** — the computed name then composes label + value the
way the platform intends, the orphan-`<label>` defect (C-7) dies in the same edit, and the
disambiguation comes free because the picker's control keeps its own name.

---

## R4-6 · MAJOR **[NEW]** — `Distribute`, one of the three rows this bar's third Select offers, walks a non-monotonic trajectory

`demo/palettes/mix.ts:7` documents the strategy as *"linearly interpolate shorter palettes
across the longest length."* The implementation only remaps indices **past the end** of the
short palette — `getColorAtIndex` returns the exact source color for every `index < len`
(`mix.ts:79-81`) and only then enters the `distribute` branch (`:90-103`), which computes
`fracPos = (index * (len - 1)) / (resultLength - 1)` — a formula written for the *whole*
range. The two halves disagree:

```
-- the raw source-index trajectory distribute walks (len=3, resultLength=7) --
  i=0  -> exact source index 0
  i=1  -> exact source index 1
  i=2  -> exact source index 2
  i=3  -> fracPos 1.0000 (lo=1)      ← jumps BACKWARD from 2 to 1
  i=4  -> fracPos 1.3333 (lo=1)
  i=5  -> fracPos 1.6667 (lo=1)
  i=6  -> fracPos 2.0000 (lo=2)
```

The resulting palette, measured (red/green/blue distributed over 7 rows against a gray
palette — each row is the 50 % mix, so the source trajectory is directly legible in the hues
29° → 142° → 264° → **142°** → 183° → 223° → 264°):

```
distribute  n=7  ["oklch(61.39% 0.128 29.23deg)","oklch(73.31% 0.147 142.49deg)",
                  "oklch(52.59% 0.156 264.05deg)","oklch(73.31% 0.147 142.49deg)",
                  "oklch(66.40% 0.150 183.01deg)","oklch(59.50% 0.153 223.53deg)",
                  "oklch(52.59% 0.156 264.05deg)"]
```

Row 3 is byte-identical to row 1, and row 6 to row 2. The palette runs red → green → blue →
**green again** → teal → blue. That is not a distribution; it is a stutter. `Repeat to pad`
(the row above it) produces a *deliberate* cycle and is correct; `Distribute` produces an
accidental one.

**Cure.** Delete the `index < len` short-circuit for this strategy and let the one formula own
the whole range — `distribute` should map every output row through `fracPos`, which already
reduces to the identity when `resultLength === len`. One branch removed, not one added.

---

## R4-7 · MINOR **[NEW]** — the Hue quartet's inputs are numerical noise for every neutral operand

`MixConfigBar.vue:66-74` samples the four arcs to draw "the four-arc quartet … with the
user's own colors." Arc interpolation is only meaningful between two meaningful hues. For
neutrals there are none, and the library manufactures them from round-trip dust:

```
=== D. neutral-gray hue is numerical noise (the Hue-quartet's input) ===
  #808080  hsl=[300,1.11e-16,0.5019…]  hsv=[300,2.21e-16,0.5019…]
  #7f7f7f  hsl=[340,3.34e-16,0.4980…]  hsv=[340,6.68e-16,0.4980…]
  #c0c0c0  hsl=[300,4.49e-16,0.7529…]  hsv=[300,2.94e-16,0.7529…]
  #404040  hsl=[  0,1.10e-16,0.2509…]  hsv=[  0,2.21e-16,0.2509…]
  #000000  hsl=["none",0,0]            hsv=["none",0,0]
```

`#808080` is hue 300°, `#7f7f7f` is 340°, white is 336° — three neighbouring neutrals, three
unrelated hues, all from a delta of ~1e-16. `encodedToHsv` (`anchors.ts:155-166`) only yields
hue 0 when `delta` is *exactly* zero, which survives only the same-space path. This is the
repo's documented "HSV hue drift" hazard (`MEMORY.md`) living inside the component's headline
feature: a user mixing two grays through the hue rows sees four visibly different arcs and
believes the choice matters. It is float noise, amplified 360×.

**Cure.** The library should carry `none` for a powerless hue the way it already does for
exact black — it has the vocabulary (`"none"` appears in the channel type) and uses it
correctly one branch away. An ε-threshold on `delta` relative to `max` is the honest
predicate.

---

## R4-8 · MINOR **[NEW]** — two derived props encode one fact, with an unenforced invariant between them

`MixPane.vue:101-103` computes two props from the same primitive:

```vue
:show-leftover-strategy="mode === 'palettes'"
:operand-colors="mode === 'colors' ? selectedColors.map((sc) => sc.css) : []"
```

`showLeftoverStrategy === true` ⟺ `operandColors === []` is an invariant that nothing states
and nothing checks; the component's own doc comment (`:38-44`) *relies* on it ("Palettes mode
passes `[]` by the same restraint"). Two derived booleans-of-the-same-mode is precisely the
contrivance edict 3 exists to prevent: pass `mode` once and let the bar derive both, or pass
the operands and let emptiness speak for itself. As a bonus the `.map()` at `:103` mints a
new array identity on every parent render, which invalidates both computeds (r3 measured the
cost as sub-frame, and I do not contest that) — passing `selectedColors` directly and mapping
inside the computed removes the churn as a side effect of removing the duplication.

---

# Part 2 — the prior ledger, re-measured

I re-derived the load-bearing claims myself before reading r3. **Nothing in r1–r3 is
refuted.** The ones I executed this pass:

| id | prior severity | this pass | evidence |
|---|---|---|---|
| C-1 | BLOCKER | **CONFIRMED** | live: `<button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="md" … class="… glass-wash glass-capsule h-10 …" variant="primary-audacious" …>`, `opacity: 0.5`, `cursor: not-allowed`, 462×40. `variant` is a raw invalid attribute; the resolved register is `secondary`. |
| C-2 | BLOCKER | **CONFIRMED** | live: `.add-slot-ghost` → `{ tag: "SPAN", ariaHidden: "true", ariaLabel: null, role: null, tabIndex: -1, pointerEvents: "none", rect: 48×48 }`. No operand can be added in colors mode, so `canMix` is false forever and every chip is permanently absent (menu census: `chips: 0`, `dataStops: 0`). |
| C-7 | MAJOR | **CONFIRMED** | live: `[{text:"Color space",htmlFor:null,control:null},{text:"Hue method",htmlFor:null,control:null}]`; the third appears in palettes mode. R4-5 supersedes the cure. |
| N-1 | MAJOR | **CONFIRMED** | live: Mix button viewport `top` = **497 px** (colors) → **705 px** (palettes) = 208 px jump, un-animated. |
| C-4 | MAJOR | **CONFIRMED** | independently: `hue rows @oklab: distinct=1/4` for every operand set I tried; `@hsl: distinct=2/4` for chromatic pairs. The shipped default space is `oklab` (`useMixingState.ts:44`). |
| C-16 | INFO | **CONFIRMED + sharpened** | menu census: this bar offers **9** rows; the picker's own space control on the same route offers **18**. |
| C-6(c) | MAJOR | **CONFIRMED** | `grep -rn MixConfigBar` over code → two hits, both `MixPane.vue`. Nothing mounts it. |
| C-9 | MINOR | **CONFIRMED** | the ` / 1)` strip is dead: the serializer emits `oklch(62.79% 0.2576 29.23deg)` and `oklch(100% 0 none)`, never ` / 1)`. |

r3's C-3, C-5, C-8, C-10–C-15 and N-3 I re-read against source and found accurately stated;
I did not re-execute them and do not claim to have. **C-8 is upgraded from hypothesis to
fact by this pass**: r3 flagged "`rgba()`/`hsla()` comma forms throw while the chip hides
silently" as unproven-reachable. It is the same mechanism as R4-1 and now has a reproduction:

```
  rgba comma           chip=NULL(hidden)   startMix=THREW: Invalid CSS color
  hsla comma           chip=NULL(hidden)   startMix=THREW: Invalid CSS color
  currentColor         chip=NULL(hidden)   startMix=THREW: Invalid CSS color
```

Three input classes, one silent blank, one application collapse.

---

# Part 3 — negative proof

Absences I checked and can defend as evidence rather than silence.

- **The chip's own CSS is valid — my leading hypothesis, killed.** I expected
  `oklch(100% 0 none)` (emitted for grayscale operands) or `oklch(7147% 29.3 29deg)` (emitted
  for out-of-range operands) to invalidate the whole `linear-gradient` and paint a blank
  plate. It does not:
  ```
  { "none-hue stop (grayscale operands)": true,
    "deg-hue stop (normal operands)": true,
    "alpha stop": true,
    "L>100% stop (huge operand)": true,
    "single stop only": true }
  ```
  All four shapes pass `CSS.supports`. **Not a finding.**
- **This is not general conversion rot.** 4096 cube samples, one failure. The library's
  cross-space machinery is sound; a single denominator is not. Scoping this correctly matters
  — the cure is one expression, not a rewrite.
- **The serializer round-trips.** Everything `colorToCss` emits, `parseColorIn` re-reads
  (`oklch(50% 0 none)`, `oklch(100% 0 none)`, `hsl(none 0% 50%)`, `%`+`deg` forms, even
  `L = 7147%`). I went looking for a save→reload break and there is none.
- **The menu semantics are correct.** 9 space rows / 4 hue rows / 3 strategy rows, exactly as
  authored; `aria-selected="true"` lands on the current row (`OKLab`) and nowhere else;
  option rows are 52 px; `Escape` closes and restores focus to the trigger.
- **No hazard-class code in the file.** All 173 lines: no `requestAnimationFrame` (no PRM-RAF
  exposure), no `addEventListener`, no observers, no timers, no lifecycle hooks, no `async`,
  no `fetch`, no WebGL, no `defineModel` (so no stale-read round trip), no `ValueUnit`
  construction, no reka slider. Nothing to leak or cancel.
- **`verbatimModuleSyntax` clean** — all four type-only imports (`:12,13,14,15`) are
  `import type`; both value imports are used.
- **Tap targets and nameless buttons: zero contribution.** `REPORT.json` `/#/mix` lists 8
  small targets (the picker's `12×24` channel handles, three `22×22` slug controls, one
  `160×23` input) and 1 nameless button — none of them this component's. Triggers measure
  227×36, the verb 462×40, option rows ≥ 52 px.
- **Not a god module.** 173 lines, one job, no invented `shared/` directory, no wrapper
  component. Edicts 1 and 3 hold apart from R4-8.

---

## Findings table (r4)

| id | severity | status | one line |
|---|---|---|---|
| **R4-1** | **BLOCKER** | **NEW · live-reproduced** | the `HSL` row + a white operand throws `color_non_finite` (`anchors.ts:173`) with no `try`/`catch` anywhere in the mix tree; the app-root boundary swallows the whole two-pane grid — reproduced end-to-end through the identical vocabulary at `/#/gradient`, screenshot attached, **zero console/page errors emitted** |
| **R4-4** | **BLOCKER** | **NEW** | CI runs **no** Playwright step at all (`ci.yml:31-37`); `test:e2e` exists and nothing calls it; the one vitest oracle that walks the hsl path uses chromatic-only operands and *errors* the moment `#ffffff` joins them (executed) |
| C-1 | BLOCKER | CONFIRMED | `variant="primary-audacious"` is not a glass-ui 7 prop; the verb ships `data-emphasis="secondary"`, wash tier, `opacity 0.5` |
| C-2 | BLOCKER | CONFIRMED | the add-color affordance is an `aria-hidden` `<span>` with `pointer-events:none`; no operand can ever be added; every chip permanently absent |
| **R4-2** | **MAJOR** | **NEW** | picker-white in HSL yields saturation **−262.5 %**; the mix result `hsl(351.43deg -81.25% 75%)` is serialized, saved to a palette, and re-parsed without complaint |
| **R4-3** | **MAJOR** | **NEW** | the chip `v-if` renders "unrepresentable in this space" identically to "honest absence" — 8 chips + 1 blank for white+red; all 4 hue rows blank when HSL is current |
| **R4-5** | **MAJOR** | **NEW** | `aria-label` suppresses the current value from the accessible name (`/OKLab/` → 0 matches) and the name is ambiguous with the picker's own control on the same route (2 matches for `/color space/i`) |
| **R4-6** | **MAJOR** | **NEW** | `Distribute` walks a non-monotonic source-index trajectory (0,1,2,**1**,1.33,1.67,2) and emits a palette with two duplicated, back-tracking rows |
| C-3 | MAJOR | carried (r2) | with ≥3 operands the chip's piecewise chain ≠ `mixColorSequence`'s weighted accumulation |
| C-4 | MAJOR | CONFIRMED | default space `oklab` ⟹ the Hue control is inert and its four chips are byte-identical (1 distinct of 4) |
| C-5 | MAJOR | carried (r2) | the chip paints a continuous gradient — the engine `sample.ts:5-11` forbids by name |
| C-6 | MAJOR | CONFIRMED | zero unit coverage of the component; the O-14 byte-identity regex matches 0 of 17 stops; five named green-keeping mutations |
| C-7 | MAJOR | CONFIRMED | three `<label>` elements with `control === null` — cured by R4-5's edit |
| N-1 | MAJOR | CONFIRMED | the pane's only verb jumps 208 px on a mode switch, un-animated |
| C-8 | MINOR | **upgraded to fact** | `rgba()`/`hsla()`/`currentColor` operands: chip hides silently, verb throws |
| **R4-7** | MINOR | **NEW** | neutral operands carry noise hues (300°/340°/336°) — the Hue quartet's inputs are float dust amplified 360× |
| **R4-8** | MINOR | **NEW** | `showLeftoverStrategy` + `operandColors` are two derived encodings of `mode` with an unenforced invariant |
| C-9…C-16 | MINOR/INFO | carried / confirmed | dead ` / 1)` strip · `h-9`/`h-10` de-tokenized · reka `AcceptableValue` reach + 3 unchecked casts · `<Blend>` lacks `aria-hidden` · `STRATEGIES` not exhaustiveness-checked · disabled verb with no reason and no `aria-live` · 9 rows for a 17-member union |
| — | negative | **NEW** | `CSS.supports` passes all four stop shapes; 4095 of 4096 cube samples convert cleanly; the serializer round-trips; menu semantics and focus restoration are correct |

---

## The one mechanism

r3 named a real mechanism: *glass-7 changed the producer's prop vocabulary, the demo never
migrated, `strictTemplates` is off.* That explains C-1, C-2, C-10. It is correct and I confirm
it.

But it does not explain R4-1, and R4-1 is the one that takes the application down. The second
mechanism, which no prior pass named:

> **This component publishes a menu of nine capabilities and has never been executed against
> a color.** The nine rows are a `v-for` over a metadata array; nothing — not a type, not a
> unit test, not a CI step — connects "the array offers `hsl`" to "the pipeline can do `hsl`."
> The library is `Result`-typed precisely so that this connection can be *checked*; the demo's
> `parseColorIn`/`convertPickerColor` boundary (`picker-color.ts:105-117`) converts every one
> of those Results back into a throw, and then the mix path forgets to catch it. Meanwhile the
> only surface that *does* handle the failure — the preview chip — renders it as a blank
> indistinguishable from "nothing to say."

Three edits close it, and none of them is a patch:

1. `anchors.ts:173` — guard the denominator, not the numerator. (Kills R4-1, R4-2, and the
   whole L∈{0,1} class.)
2. `sample.ts` — return the discrimination instead of `null`, so the component can render
   *why* a row has no preview. (Kills R4-3, makes R4-1 self-announcing even before the
   library lands.)
3. `ci.yml` — run the e2e suite, and cross the sampler oracle with domain-boundary operands
   (white, black, transparent, neutral gray) × all nine spaces. (Turns R4-1, R4-2, R4-7 and
   C-8 from invisible to born-RED, and turns C-1/C-2 red for the first time.)

Without (3), the next color the library cannot convert ships exactly the same way: silently,
with a green CI, behind a menu row that looks identical to the eight that work.
