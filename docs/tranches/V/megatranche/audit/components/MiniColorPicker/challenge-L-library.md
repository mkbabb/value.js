# CHALLENGE-L — Library structure · `demo/palettes/browser/search/MiniColorPicker.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M-context variant), the tier
explicitly declared at spawn. The seat is declared, not inherited.

> **Second-pass receipt (re-run seat, HEAD `d19da6d3`).** This axis was re-run by a second Opus 5
> seat, which found the first pass materially correct but carrying **one false negative that
> inverted a verdict**: N-2 ruled out live colour corruption. It is real, and it is reproducible in
> four interactions. The re-run adds **L-9 (BLOCKER)** with a live, twice-confirmed, *irreversible*
> reproduction; rewrites **N-2**; and leaves every other finding of the first pass standing as
> written. Amendments are marked ⟐. No source file was edited by either seat.

## Provenance

| field | value |
|---|---|
| subject | `demo/palettes/browser/search/MiniColorPicker.vue` (164 lines) |
| area | palettes · browser · search cluster |
| repo HEAD **as briefed** | `c654824e` |
| repo HEAD **as observed** | `e39da983` — *`docs(V·mega): M-19 — glass execution HERALDED; O-19 consolidated manifest sent`* |
| branch | `tranche-u` |
| live probe | `http://localhost:9000/#/browse` (dev server 200) |

> **Drift notice.** The brief pins `c654824e`; the first pass observed `e39da983` and read every
> line number below at that commit. ⟐ The re-run seat observed `d19da6d3`, re-read the subject and
> every cited sibling, and confirms all quoted line numbers still hold. No source file was edited by
> either seat.

## Verdict

**DEFECTIVE.** The premise holds, and it holds at the sharpest possible point. This repository
publishes a colour library. Its demo exists to prove that library. `MiniColorPicker.vue` is a
**colour picker inside that demo that imports no colour code the project owns** — not the published
package, not the demo's colour session. Its entire import list is three lines:

```
61  import { ref, computed, watch, useTemplateRef } from "vue";
62  import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
63  import { Button } from "../../../ui/button";
```

It then hand-rolls HSV→RGB→hex (`:85-105`) and hex→HSV (`:110-125`). Measured against the published
`@mkbabb/value.js/color` surface it declines to import, that hand-rolled math **disagrees on
4.2313% of the HSV lattice (39,730 / 938,961 samples)**.

This is not a component defect that happens to touch the library. It is a library-structure defect
wearing a component as a costume: the single most load-bearing dogfood claim in the repo —
*"the demo consumes value.js ONLY through the published subpaths"* (`vite.config.ts:63-66`) — is
locally false, because this component consumes value.js **not at all** and reimplements it instead.

⟐ **And it is not inert.** The re-run seat drove the live product and found that the private copy,
married to a hex `string` wire type and a parent that echoes it straight back, **destroys the user's
chosen hue on an ordinary drag and cannot restore it** — measured 210° → 240°, twice, irreversible
(**L-9**). The first pass explicitly ruled this out in N-2; that negative is withdrawn. The
structural finding and the user-visible failure are the same defect at two altitudes.

---

## Evidence ledger — what I actually ran

First-pass scripts under
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`.

⟐ The re-run seat's two probes are **persisted beside this report**, since the scratchpad is
session-temporary and L-9 is a BLOCKER whose evidence must outlive the session:
`probe-L9-hsv-drift.mjs` (round-trip drift + state collapse) and `probe-L9-hsv-magnitude.mjs`
(exact-grid divergence bound). Both run against the built `dist/subpaths/color.js` with
`node <file>`. The live browser evidence in L-9 was gathered read-only via Playwright against the
running dev server.

### E1 — the component is the *only* such file in the demo

```
$ for f in $(grep -rl "toString(16)" demo | grep '\.vue$'); do
    echo "$f  libraryOrSessionImports=$(grep -c "value\.js\|color-session" "$f")"; done
demo/workbenches/generate/GenerateControls.vue  libraryOrSessionImports=3
demo/palettes/browser/search/MiniColorPicker.vue  libraryOrSessionImports=0

$ grep -rln "Math.max(r, g, b)\|Math.max(r,g,b)" demo
demo/palettes/browser/search/MiniColorPicker.vue
```

Two `.vue` files in the whole demo contain colour-conversion math. One of them routes through the
library. The other is the subject. It is likewise the **sole** site of the `Math.max(r,g,b)` HSV
decode in the entire demo tree.

### E2 — the dogfood invariant is otherwise intact repo-wide

```
$ grep -rn '"@src' demo/ | grep -v '\.md' | wc -l
0
```

Zero `@src` deep imports in the demo. The T.W1 keystone holds everywhere — which is precisely what
makes this component's silent opt-out a *structural* breach rather than ambient sloppiness. The
demo does not reach into `src/`; it simply does not reach at all.

### E3 — 4.2313% disagreement with the published API

Channel conventions were verified identical before comparing (h ∈ [0,360], s/v ∈ [0,1], rgb ∈
[0,255]):

```
$ node -e "... convertColor(U(rgb(82,143,204)),'hsv') ..."
rgb(82,143,204)->hsv: {"space":"hsv","channels":[210,0.5980392156862744,0.8000000000000002],"alpha":1}
toRgba8(rgb(82,143,204)): {"ok":true,"value":[82,143,204,255]}
```

The library is a drop-in on conventions. Then, sweeping 361 hues × 51 saturations × 51 values with
the component's algorithm transcribed verbatim from `:85-105`:

```
$ node scratchpad/hsv-diff2.mjs
probe hsv(210,0.6,0.8): component #528fcc | library #528fcc
sweep 938961 samples -> 39730 disagreements (4.2313%)
   {"h":0,"s":0,"v":0.3,"component":"#4d4d4d","library":"#4c4c4c"}
   {"h":0,"s":0,"v":0.7,"component":"#b3b3b3","library":"#b2b2b2"}
   {"h":0,"s":0.02,"v":0.3,"component":"#4d4b4b","library":"#4c4b4b"}
   ...
```

**Mechanism.** `src/color/operations.ts:305-312` implements `roundHalfEven` (banker's rounding) and
`:324` applies it as the byte quantiser. `MiniColorPicker.vue:103` uses `Math.round` (half-up).
`0.3 × 255 = 76.5` → library `76` (`#4c`), component `77` (`#4d`). Two quantisation laws, one
concept.

### E4 — the cure is lossless *and strictly more capable*

```
$ node scratchpad/cure.mjs
A. library decode handles what the component's gate accepts:
   #4488cc -> hsv(210, 0.667, 0.8) -> #4488cc  roundtrip=true
   #FFFFFF -> hsv(336, 0, 1)       -> #ffffff  roundtrip=true
   #000000 -> hsv(none, 0, 0)      -> #000000  roundtrip=true

B. library decode ALSO handles what the component REJECTS outright:
   #48c                 -> OK  hsv(210, 0.667, 0.8)     -> #4488cc
   #4488ccff            -> OK  hsv(210, 0.667, 0.8)     -> #4488cc
   rebeccapurple        -> OK  hsv(270, 0.667, 0.6)     -> #663399
   hsl(210 60% 50%)     -> OK  hsv(210, 0.75, 0.8)      -> #3380cc
   oklch(0.7 0.1 210)   -> OK  hsv(188.326, 0.653, 0.756) -> #43afc1

C. exhaustive round-trip fidelity of the CURE: 0/4096 corrupt -> cure is lossless
```

The replacement is not a trade. It is a strict superset, and it is already written and shipping:
`parseColorIn` (`demo/color-session/color-utils.ts:11`) and `pickerColorToHex`
(`demo/color-session/picker-color.ts:213-217`).

Note `#000000 -> hsv(none, 0, 0)`: the library returns CSS Color 4 **powerless** channels. The
demo already has the law for that (`stableHue`, see L-3). The component invented a weaker one.

### E5 — live DOM probe (single navigation, popover opened)

```
$ // http://localhost:9000/#/browse → "Filters" → "Open color picker"
{ "svRect": { "w": 174, "h": 112 },
  "svAccessibility":       { "role": null, "aria": null, "tabindex": null },
  "hueStripAccessibility": { "role": null, "aria": null, "tabindex": null },
  "thumbBorderColor": "rgb(255, 255, 255)",
  "thumbLeft": "66.6667%", "thumbTop": "20%",
  "svBackgroundImage": "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0)),
                        linear-gradient(to right, rgb(255,255,255), rgb(0,128,255))",
  "focusableInside": 1 }
```

Live capture of the plate in its default state, saved beside this report as
`live-sv-plate-default.png`:

![the live SV plate at default state](./live-sv-plate-default.png)

The plate itself renders correctly (see Negative results N-1); the white thumb ring at
(66.7%, 20%) is the state measured in L-4.

---

## Findings

### L-1 · BLOCKER · The component reimplements the published library it exists to demonstrate

**Evidence.** `MiniColorPicker.vue:61-63` (import list — zero library imports);
`:85-105` (HSV→hex); `:110-125` (hex→HSV). Published surface: `package.json#exports` declares seven
subpaths; `src/subpaths/color.ts` exports `hsv`, `rgb`, `convertColor`, `toRgba8`, `mixColors`, and
20 more. E1, E3, E4.

**Mechanism.** Ownership inversion. The library owns colour conversion; a leaf presentation
component has taken a private copy. Because the copy is private, no test, no type, and no build
gate binds it to the definition — so it drifted, and E3 measures the drift at 4.2313%.

**Why this is the worst possible place for it.** `vite.config.ts:63-66` records the T.W1 keystone in
prose: *"the demo consumes value.js ONLY through the published `@mkbabb/value.js` subpaths … never
`src/` internals."* The seven-entry self-alias set (`vite.config.ts:37-50`) is *generated from the
exports map* specifically so the demo can never consume a specifier a real npm consumer could not
write. That machinery is excellent — and this component walks past it. The audit question "does it
import through the export map or a deep path?" has a third, worse answer here: **neither.** A deep
import would at least have been a true proof of *some* API. Reimplementation is a false proof of
none, and it silently understates the library's surface — a reader of this file would conclude
value.js cannot do HSV.

**Reproduction.** `node scratchpad/hsv-diff2.mjs` → 39,730/938,961 disagreements. Live: open
`/#/browse` → Filters → the colour swatch; every hex the popover shows is produced by the private
copy.

**Cure.** Delete `:85-125` entirely. The component should not hold a hex string at all — see L-8 and
the lattice below.

---

### L-2 · MAJOR · Second implementation of the SV-plate concept; the gradient recipe is copied byte-for-byte

**Evidence.** The canonical saturation/value field is
`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue` (272 lines), whose plate style lives in
`demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts`.

`useSpectrumPlateStyle.ts:38-41`:
```
background: `
  linear-gradient(to top, #000, transparent),
  linear-gradient(to right, #fff, hsl(${hue}deg, 100%, 50%))
`,
```
`MiniColorPicker.vue:159-163`:
```
.sv-canvas {
    background:
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(calc(var(--hue) * 1deg), 100%, 50%));
}
```

Same two-layer recipe, same order, same stops. Thumb placement is copied too —
`useSpectrumPlateStyle.ts:63-64` `left: ${100*sClamped}%` / `top: ${100*(1-vClamped)}%` versus
`MiniColorPicker.vue:19` `left: ${sat*100}%` / `top: ${(1-val)*100}%`.

**Mechanism.** Duplicated concept with no shared home. Two SV plates exist; the canonical one is
library-backed (`SpectrumCanvas.vue:39` imports `clamp` from `@mkbabb/value.js/math`, `:41-42`
imports `channelNumber`/`withChannel` from the colour session) and instrumented (touch gate, pointer
debug, gamut overlay, `WatercolorDot`). The copy is none of those things. This is the edict-2
dual-path violation in its textbook form.

**Reproduction.** Diff the two blocks above.

**Cure.** One SV plate. See the lattice.

---

### L-3 · MAJOR · The hue-stability domain law is re-invented with a weaker threshold

**Evidence.** The canonical law appears **twice** in the colour session, identically:

- `demo/color-session/useColorPipeline.ts:92` — `if (s * v > 0.01) stableHue.value = channelNumber(hsv, "h");`
- `demo/color-session/useColorParsing.ts:43`  — `if (saturation * value > 0.01) stableHue.value = channelNumber(hsv, "h");`

documented at `useColorPipeline.ts:73-76`: *"oklch→HSV loses hue at low chroma (atan2(0,0)=0)"*.
`MiniColorPicker.vue:119` substitutes:

```
119    if (d === 0) return; // keep existing hue
```

`d === 0` (exact achromatic) is strictly weaker than `s·v > 0.01` (near-achromatic).

**Measured divergence band.** Exhaustive over all 16,777,216 sRGB hexes:

```
$ node scratchpad/huelaw.mjs
divergence band: 4578 / 16777216 sRGB hexes (0.027%)
   {"hex":"#000001","s":1,"v":0.0039,"sv":0.00392,"miniHue":240}
   {"hex":"#000100","s":1,"v":0.0039,"sv":0.00392,"miniHue":120}
   {"hex":"#000102","s":1,"v":0.0078,"sv":0.00784,"miniHue":210}
```

In that band the component slams its hue to a fully-saturated value derived from a 1/255 channel
difference, where the canonical law would hold the hue steady. E4 shows the library itself returns
`hue: "none"` for `#000000` — the exact powerless-channel case the canonical law is built around,
and which `d === 0` handles only by accident and only at the single point.

**Reproduction.** `node scratchpad/huelaw.mjs`. Note the band is small (0.027%) but is exactly the
region users hit when dragging into the black corner of the plate.

**Cure.** Do not hold hue locally. Read `HSVCurrentColor` (`useColorPipeline.ts:106-109`), which
already applies `stableHue`.

---

### L-4 · MAJOR · The shared luma helper is bypassed — the one thing its own docstring forbids

**Evidence.** `demo/picker/controls/spectrumLuma.ts` exists solely to prevent this, and says so:

```
 3  * ONE function, ONE threshold — instrument coherence. …
 9  * Share the function, never copy the constant (`overlay-amendment.md §4.1`).
21  export const SPECTRUM_LUMA_FLIP = 0.5;
33  export function spectrumFieldIsLight(s, v) { return spectrumLuma(s, v) > SPECTRUM_LUMA_FLIP; }
```

`useSpectrumPlateStyle.ts:55-60` consumes it to flip the thumb border black/white.
`MiniColorPicker.vue:18` hardcodes `border-2 border-white`, unconditionally — it neither shares the
function nor copies the constant; it drops the concept.

**Measured.** By the canonical model, **30.70%** of the SV field reads LIGHT (`spectrumLuma > 0.5`),
where the canonical instrument mandates a dark border. The live default state measured in E5 —
`left 66.6667%`, `top 20%` ⇒ s = 0.667, v = 0.8 ⇒ `luma = 0.8 × (1 − 0.667/2) = 0.5333` — is
**inside** that region on first open.

**Reproduction.** `node -e "const luma=(s,v)=>v*(1-s*0.5); console.log(luma(0.667,0.8))"` → `0.5333`
> 0.5. E5 confirms `thumbBorderColor: "rgb(255,255,255)"` at that exact position.

**Honesty note — the visual consequence is a HYPOTHESIS, not confirmed.** I captured the live plate
and looked at it: the white ring remains legible at the default position because
`shadow-cartoon-sm` supplies an offset dark shadow the canonical instrument does not rely on. So the
*structural* defect (a third instrument disagreeing about the same (s,v) region, in direct defiance
of the helper's stated contract) is CONFIRMED; the *contrast failure* it would normally imply is
mitigated by accident and I do not claim it as observed.

---

### L-5 · MAJOR · A fourth HSV store, outside the colour session that owns HSV

**Evidence.** `MiniColorPicker.vue:76-78`:
```
76  const hue = ref(210);
77  const sat = ref(0.6);
78  const val = ref(0.8);
```
The demo already owns HSV state: `useColorPipeline.ts:106-109` derives `HSVCurrentColor` and
`:76` holds `stableHue`; consumers reach it by injection —
`SpectrumCanvas.vue:44-49` `inject(COLOR_MODEL_KEY)`, `ComponentSliders.vue:113` likewise.

**Mechanism.** Ownership duplication of *state*, compounding L-1's duplication of *behaviour*. Three
magic numbers seed a colour model that the session would otherwise supply, and the seed
(`hue 210, sat 0.6, val 0.8`) is a third literal encoding of the same default that
`SearchFilterBar.vue:170` writes as `pickerHex = ref("#4488cc")`.

**Reproduction.** `grep -rn "COLOR_MODEL_KEY" demo/palettes/` → no hits; the palettes area is wholly
disconnected from the colour session's model despite `SearchFilterBar.vue:137` importing
`parseColorIn` from it.

---

### L-6 · MAJOR · Canonical accessibility affordances are lost in the copy

**Evidence.** Canonical (`SpectrumCanvas.vue:5-12`):
```
 5   so role="img" with a reactive descriptive label, not role="slider". -->
 8   role="img"
 9   :aria-label="spectrumAriaLabel"
```
with the label recomputed live (`useSpectrumPlateStyle.ts:25-30`).

Live measurement of the copy (E5):
`svAccessibility: {role: null, aria: null, tabindex: null}`,
`hueStripAccessibility: {role: null, aria: null, tabindex: null}`,
`focusableInside: 1`.

Both interactive surfaces are unnamed, unroled, and unreachable by keyboard; the only focusable
element in the popover is the *Search* button. Colour cannot be chosen without a pointer.

**Why the visual audit missed it.** `docs/tranches/V/megatranche/audit/visual/REPORT.md:97-104`
reports `namelessButtons` = 1 for `/#/palettes` desktop light and dark, and the per-capture table
(`:120,135,150,165`) shows `pageErr 0 / consoleErr 0 / overflowX 0`. The popover content is not in
the DOM until opened, and `STATES.json` enumerates only `#/`, `#/gradient`, `#/browse`, `#/blob`,
`#/admin/users` — no palettes interaction state. **This component's entire interactive surface has
never been captured by the visual audit.** That is itself a coverage finding for the audit harness.

**Reproduction.** E5, reproducible in ~4 tool calls from a cold page.

---

### L-7 · MAJOR · The public contract is a hex `string`, which caps the whole feature at 6-digit hex

**Evidence.** `MiniColorPicker.vue:65-74` types props and emits as bare `string`. The decode gate:

```
111    if (!incomingHex || !incomingHex.startsWith("#") || incomingHex.length < 7) return;
```

silently rejects `#48c`, any named colour, and every functional CSS colour — all of which the
library accepts (E4). The cap propagates upward: `SearchFilterBar.vue:92` advertises
`placeholder="#hex, hsl(...)"`, but `:218` reads

```
218    const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

so a user who types the `hsl(...)` the placeholder invites gets **the picker's current colour
searched instead, with no error** — a masking fallback (edict 2). The parent already holds the
library-backed `parseColorIn` (`:137`) that would parse it correctly; it is unused for this input
because the sibling contract is a hex string.

**Mechanism.** A stringly-typed boundary between two components that both sit above a typed colour
model. `AnyColor` / `PickerColorIn<"hsv">` are exported from `demo/color-session/picker-color.ts`
and would make the invalid states unrepresentable.

**Reproduction.** Read `SearchFilterBar.vue:92` against `:218`. Typing `hsl(210 60% 50%)` into the
colour field searches `pickerHex` instead. (Code-path confirmed by reading; I did not drive it live.)

---

### L-8 · INFO · `demo/ui/*` is a 19-directory pure re-export shim

**Evidence.**
```
$ for d in demo/ui/*/; do ... done
alert files=1 pureGlassReexport=1   … popover files=1 pureGlassReexport=1  (19 dirs, all 1 file)
$ cat demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```
Every one of the 19 directories is a single `index.ts` re-exporting glass-ui and nothing else — 65
names, zero added behaviour. The subject reaches them at `../../../ui/popover` (`:62`) and
`../../../ui/button` (`:63`).

**Honest correction — this is NOT the dual path I first suspected.** I tested whether the same
symbols were also imported directly:

```
Button direct=0 barrel=22   Input direct=0 barrel=4   Checkbox direct=0 barrel=2
Badge  direct=0 barrel=7    Skeleton direct=0 barrel=4  Separator direct=0 barrel=3
```

Zero direct imports for every barrelled symbol. The 59 files importing `@mkbabb/glass-ui` directly
import *different* things (`WatercolorDot`, `useTouchGate`, `writeClipboard`) that the barrel does
not re-export. The convention is therefore **consistent**, and I withdraw the dual-path charge.

What remains is a pure indirection layer that edict 3 (no wrapper dirs that need not exist) and
edict 4 (glass-ui *is* the design system) argue against: 19 directories whose only function is to
rename a bare specifier into a `../../../` relative one. Graded INFO because it is uniform,
harmless, and demo-wide — a lattice question, not a defect in this component.

---

### L-9 ⟐ · BLOCKER · The hex wire type destroys the user's hue, irreversibly, on an ordinary drag

*Added by the re-run seat. This is L-3's mechanism and L-7's stringly-typed contract meeting in the
live product. The first pass ruled it out in N-2 by measuring hex→hex; the user's path is
float→hex.*

**The loop, in source.** Every edge is explicit:

| step | site |
|---|---|
| pointer → **float** `sat`/`val` (no quantisation) | `MiniColorPicker.vue:138-139` |
| floats → 8-bit hex | `:103` `Math.round(c * 255)` |
| child emits hex | `:107` `watch(currentHex, (hex) => emit("update:hex", hex))` |
| parent stores it | `SearchFilterBar.vue:175-178` `onPickerHexUpdate(hex) { pickerHex.value = hex }` |
| parent feeds it straight back as the prop | `SearchFilterBar.vue:68` `:hex="pickerHex"` |
| **child rewrites its own `hue` from the damaged hex** | `MiniColorPicker.vue:110-125` (`hue.value = h * 360`) |

The component's hue state is therefore downstream of an 8-bit encoding of itself.

**Live reproduction — dev server, Playwright, twice.** `http://localhost:9000/#/browse` → `⋮`
Filters → the swatch (`aria-label^="Open color picker"`) → drag **inside the SV canvas only**. The
hue strip is never touched. `setPointerCapture` was stubbed to a no-op because the platform rejects
synthetic `pointerId`s; the component's own math ran untouched and no application source was
modified.

| step | `--hue` | hue-thumb `left` | readout |
|---|---:|---|---|
| initial (untouched) | **210** | 58.3333% | `#4488cc` |
| SV drag → sat .60 val .80 | 210 | 58.3333% | `#528fcc` |
| **SV drag → sat .60 val .03** | **240** | **66.6667%** | `#010102` |
| SV drag → sat .02 val .50 | 240 | 66.6667% | `#727275` |
| SV drag → sat .01 val .40 | 240 | 66.6667% | `#5b5b5c` |

**A 30° hue swing from a purely vertical drag.** The hue-strip thumb visibly jumps 8.33% of the
strip width and the plate's background gradient re-renders at the wrong hue.

**Mechanism, exactly.** At val ≈ 0.008 the hex quantises to `#010102` = bytes `(1, 1, 2)`. Feeding
that back through `:110-124`: `max = b`, `d = 1`, so `h = ((r − g)/d + 4)/6 = ((1 − 1)/1 + 4)/6 =
4/6` → **exactly 240°**. Eight-bit quantisation at low value collapses chroma onto a lattice point
whose hue is a fabrication, and the echo installs that fabrication as truth.

**Irreversible** — second probe, same session:

| step | `--hue` | thumb | readout |
|---|---:|---|---|
| state after the dark excursion | 240 | 66.6667% | `#5b5b5c` |
| drag **back** to the original sat .60 val .80 | **240** | 66.6667% | `#5252cc` |
| drag to a fully bright, saturated point | **240** | 66.6667% | `#1818f2` |

Returning to the *identical* SV coordinate yields `#5252cc`, not the original `#528fcc`. The hue is
unrecoverable without manually re-dragging the hue strip. Since this picker exists solely to seed a
colour search, the search then runs on a colour the user never chose — and `SearchFilterBar.vue:186`
emits those OKLab coordinates without any further gate.

**Why this is not the 0.027% edge case L-3 describes.** L-3 measured the divergence band over the
*hex lattice* and correctly found it tiny. But the trigger is not a rare hex — it is **the bottom
region of the SV plate**, which is ordinary target area a user drags through constantly. Measured
state collapse there (`probe-L9-hsv-drift.mjs` (beside this report) TEST4, 513 horizontal drag positions across the
full plate width):

| value | distinct colours the plate can express |
|---|---:|
| V = 1.0 | 383 |
| V = 0.5 | 129 |
| V = 0.1 | 27 |
| V = 0.03 | **13** |

**Independent confirmation of L-1's drift, on an exact grid.** The re-run also re-measured the
component against the published engine using integer-derived samples (no float accumulation in the
loop), and bounds the disagreement the first pass reported at 4.2313%:

```
$ node probe-L9-hsv-magnitude.mjs
EXACT grid: 53361 samples, 6024 byte-level mismatches (11.29%), MAX |delta| = 1 of 255
no sample diverged by >=2 bytes
```

Stated precisely: the sample rate differs from the first pass's sweep because the grids differ, but
both agree on the finding, and the re-run adds the bound — **the divergence is never more than 1
LSB**. That confirms the first pass's `roundHalfEven` mechanism (`src/color/operations.ts:305-312`
vs `MiniColorPicker.vue:103`) as the sole cause and rules out a deeper algebraic error. L-1 remains
an ownership defect, not a rendering bug; **L-9 is the rendering bug**, and its cause is the wire
type, not the arithmetic.

**Cure.** L-9 is not separately fixable and must not be patched — clamping the guard or widening the
threshold would only shrink the band. The wire type is the defect: the component must carry
`PickerColorIn<"hsv">`, not `string`. Then there is no 8-bit round-trip, and hue destruction becomes
**unrepresentable** rather than guarded. This is move 2 of the greenfield lattice below, which
already prescribed it for other reasons — L-9 makes it non-negotiable.

---

## Negative results — what I checked and found SOUND

Findings without these would be unbalanced; each is positive evidence of a negative.

**N-1 · The SV plate is mathematically correct.** The two-layer CSS recipe genuinely reproduces HSV:
the base layer is `lerp(white, hue)` (that is saturation), the overlay multiplies by the vertical
fraction (that is value), and both interpolate in gamma-encoded sRGB, which is the space HSV is
defined over. Live-confirmed: `svBackgroundImage` resolves to
`linear-gradient(to right, rgb(255,255,255), rgb(0,128,255))` at `--hue: 210`, and `hsl(210,100%,50%)`
= `#0080ff` = HSV(210,1,1). The rendered capture matches. The duplication in L-2 is a duplication of
something *correct*.

**N-2 ⟐ WITHDRAWN — the first pass tested the wrong direction; the loop DOES corrupt. See L-9.**

The first pass wrote: *"The hex round-trip is stable; there is no emit feedback loop … 0/200000
corrupt … I make no claim of live user-visible colour corruption from L-1."* That conclusion rests
on `scratchpad/roundtrip.mjs`, which measured **hex → HSV → hex**:

```
achromatic ramp: 0/256 corrupt on round-trip
chromatic random sample: 0/200000 corrupt (0.0000%)
```

That measurement is correct and its fixed-point reasoning is sound — **for that direction.** But it
is not the direction the user drives. A hex is already on the 8-bit lattice, so starting from one
begs the question. The live path starts from **continuous pointer coordinates**:

```
pointer (float sat, val)  →  currentHex (8-bit)  →  parent echo  →  hue.value REWRITTEN
      MiniColorPicker.vue:138-139     :103            SearchFilterBar.vue:175-178   :110-125
```

`updateCanvas` (`:134-140`) writes `sat`/`val` as **unquantised floats** from
`getBoundingClientRect`. Those never appear in a hex→hex sweep. Quantising them at `:103` is where
the information is destroyed, and the parent's echo then writes the damaged value back into the
component's own `hue` ref. The re-run reproduced this live, twice, on the running dev server: the
hue moves **210° → 240°** on a purely vertical drag and **never returns**. Full evidence in L-9.

What survives from the first pass: the fixed-point argument itself is right, and it is *why* the
corruption is permanent rather than oscillating — the loop settles immediately onto the wrong
colour and stays there. Stability was never the reassurance it was read as.

**N-3 · Encapsulation of the cluster barrel is correct.** `search/index.ts` declares *"hardened
public surface (T.W1 F7). NAMED re-exports only (PI-6)"* and exports `SearchFilterBar`,
`UserSortMenu`, `TagEditPopover` — deliberately **not** `MiniColorPicker`, which is consumed only by
its sibling (`SearchFilterBar.vue:132`). That is correct cluster-private scoping, and
`demo/palettes/browser/index.ts:35` re-exports the same three. No barrel leak.

**N-4 · Vue 3.5 idiom and `verbatimModuleSyntax` are clean.** `:65` uses reactive props destructure;
`:82-83` use `useTemplateRef`; `:110` correctly wraps the destructured prop as `() => hex`. All three
imports are value imports, so no `import type` is owed. Edicts 7 and 8: satisfied.

**N-5 · No god module.** 164 lines, one concern. Edict 1: satisfied. The defect is the opposite of a
god module — it is a *shadow* module, small and duplicative.

**N-6 · The route is otherwise clean.** `REPORT.md:120,135,150,165` — `/#/palettes` shows
`overflowX 0`, `pageErr 0`, `consoleErr 0` across all four Safari matrices.

---

## The greenfield lattice

Asked what I would build today with no legacy: **this component would not exist.** Not "would be
refactored" — would not exist. It is a second SV picker in a codebase that already ships a
well-instrumented one, in a repo whose entire purpose is to prove a colour library that already
does every computation it performs by hand.

Concretely, four strata with one home per concept:

```
  @mkbabb/value.js/color            ← colour truth. hsv/rgb/convertColor/toRgba8.
       │                              ONE quantiser (roundHalfEven). No copies. Ever.
       ▼
  demo/color-session/               ← session truth. picker-color.ts (pickerColorToHex,
       │  picker-color.ts             parseColorIn, channelNumber, withChannel),
       │  useColorPipeline.ts         useColorPipeline (HSVCurrentColor, stableHue law
       │                              s·v > 0.01 — stated ONCE, not twice; see below).
       ▼
  demo/picker/controls/spectrum/    ← instrument truth. ONE SV plate.
       │  SpectrumPlate.vue            useSpectrumPlateStyle · spectrumLuma
       │  (size/instrument via props)   role="img" + reactive aria-label BUILT IN.
       ▼
  demo/palettes/browser/search/     ← feature truth. SearchFilterBar composes
     SearchFilterBar.vue              <Popover><SpectrumPlate density="compact"/></Popover>
                                      and speaks AnyColor, never a hex string.
```

Four concrete moves:

1. **Delete `MiniColorPicker.vue`.** Extract the plate from `SpectrumCanvas.vue` as `SpectrumPlate`
   taking a `density` prop (`comfortable | compact`). It already has the right seams — the plate
   style is *already* lifted into `useSpectrumPlateStyle.ts`, explicitly *"keeping the SFC under the
   400-LoC cap"*. That lift did the hard half of this work; the second consumer just never arrived.
   Root-level styling (edict 5) means `density` is a variant on the root, not per-instance classes.

2. **Give the plate an `AnyColor` model, not a hex string.** `defineModel<PickerColorIn<"hsv">>()`.
   L-1, L-3, L-5 and L-7 all collapse into this one change: no local HSV refs, no local hue law, no
   local quantiser, no 6-digit ceiling. `SearchFilterBar` then feeds `parseColorIn(text, "oklab")`
   directly and the `hsl(...)` its own placeholder advertises finally works.

3. **Move the hue strip to glass-ui, or drop it.** A 1-D hue rail is a design-system primitive
   (edict 4). Either it becomes a glass-ui `Slider` variant — reusing the existing component-type
   name, per edict 4 — or the plate carries hue internally. What it must not be is a third
   hand-rolled pointer-capture rail.

4. **State the `stableHue` law once.** Note L-3 found it written *twice* inside the session itself
   (`useColorPipeline.ts:92`, `useColorParsing.ts:43`) before this component wrote it a third time,
   differently. The constant `0.01` deserves the same treatment `spectrumLuma.ts` gave `0.5`: a named
   export with a docstring. **The copied-constant failure this component commits is one the session
   was already quietly committing** — which is the honest root cause, and the reason a patch to
   `MiniColorPicker.vue` alone would not be a cure.

**Transposition, not patch.** Fixing the eight findings in place would leave two SV plates that
agree — for now. The cure is that there is one plate, one HSV store, one quantiser, one hue law, and
the feature layer composes rather than reimplements. The net is roughly −164 lines of component and
−40 lines of colour math, against +1 `density` prop.

---

## Summary

| id | severity | defect |
|---|---|---|
| L-1 | BLOCKER | Reimplements published `@mkbabb/value.js/color`; 4.2313% measured disagreement; breaks the T.W1 dogfood keystone by consuming the library not at all |
| L-2 | MAJOR | Second SV-plate implementation; gradient recipe copied byte-for-byte from `useSpectrumPlateStyle.ts:38-41` |
| L-3 | MAJOR | Re-invents the `stableHue` law with a weaker threshold; 4,578/16,777,216 hex divergence band |
| L-4 | MAJOR | Bypasses `spectrumFieldIsLight`, whose docstring forbids exactly this; 30.70% of the plate affected, incl. the live default state |
| L-5 | MAJOR | Fourth HSV store, outside the colour session that owns HSV |
| L-6 | MAJOR | Canonical `role`/`aria-label`/keyboard affordances dropped; live `focusableInside: 1`; never captured by the visual audit |
| L-7 | MAJOR | Stringly-typed hex contract caps the feature at 6-digit hex; parent silently masks `hsl(...)` input it advertises |
| L-8 | INFO | `demo/ui/*` = 19 pure re-export shims (dual-path charge withdrawn — barrel usage is consistent) |
| **L-9** ⟐ | **BLOCKER** | Hex wire type + parent echo destroys the user's hue **irreversibly** on an ordinary SV drag; live-reproduced 210°→240°, twice; plate collapses to 13 distinct colours at V=0.03 |

**Strongest defect: L-9** (re-run). In a repository whose demo exists to prove a colour library, the
one component that picks colours does not merely fail to prove it — **it silently gives the user the
wrong colour and cannot give it back.**

L-1 remains the *structural* root: L-9 exists only because colour conversion was privately
reimplemented, in a wire format the library would never have chosen. The two are one defect seen at
two altitudes — ownership at L-1, consequence at L-9 — and move 2 of the lattice discharges both.

⟐ **Disposition of the first pass.** Findings L-1 through L-8 stand as written and were independently
re-read at `d19da6d3`. N-1 and N-3 through N-6 stand. **N-2 is withdrawn** — it was a false negative
produced by measuring hex→hex where the user drives float→hex, and it had the effect of downgrading
a BLOCKER to a curiosity. Recording it as a method note for the programme: *a round-trip that starts
on the quantised lattice cannot detect quantisation.* Begin round-trip probes at the continuous
input, never at the encoded one.
