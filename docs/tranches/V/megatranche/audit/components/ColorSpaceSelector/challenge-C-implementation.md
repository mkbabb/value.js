# ColorSpaceSelector — CHALLENGE-C · implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, read from this
seat's own system prompt (`You are powered by the model named Opus 5 (1M context). The exact model ID
is claude-opus-5[1m]`), matching the explicit declaration this seat was spawned with. Not inherited,
not undeclared.

**Seat**: challenge-C (implementation) · **Subject**: `demo/color-session/ColorSpaceSelector.vue`
(311 lines, area core) · **Branch**: `tranche-u` · **Repo HEAD at report time**: `7775473b`
(the seat brief cites `c654824e`; the subject file is byte-identical between the two —
`git diff c654824e..HEAD -- demo/color-session/ColorSpaceSelector.vue` is empty).
**Date**: 2026-07-28 · **Live target**: `http://localhost:9000` (Chromium/Playwright, headless,
1440×900).

Evidence written to `docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/evidence/`.
No source file was edited by this seat.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component ships **a live, gesture-reachable crash that destroys the entire picker pane**, and
**a catalog that advertises numbers the application will not deliver**. Both are owned by one
17-line function, `specimenFor()` (lines 154–166). A third defect — the function's documented cost
model is false by a factor of infinity (it claims zero rest cost; it runs 72 full colour-space
conversions per colour tick into a detached `DocumentFragment`) — is the mechanism that makes the
crash reachable *without ever opening the dropdown*, and it has been propagated to three other
components as "the ColorSpaceSelector precedent".

---

## C-1 · BLOCKER — `specimenFor()` throws in render; the picker pane dies on a reachable colour

### The defect

`specimenFor()` (lines 154–166) calls three APIs that **throw** on failure, from inside a template
expression, with no guard:

```ts
// ColorSpaceSelector.vue:154-166
function specimenFor(space: DisplayColorSpace): string {
    if (!colorModel) return "";
    if (space === "hex") return colorToHexString(colorModel.model.value.color);   // → toRgba8 + valueOrThrow
    const converted = convertPickerColor(                                        // → valueOrThrow (THROWS)
        colorModel.model.value.color,
        resolveColorSpace(space),
    );
    if (CSS_PICKER_SPACES.has(converted.space)) return serializePickerColor(converted); // → valueOrThrow
    …
}
```

`convertPickerColor` is `valueOrThrow(convertColor(...))` — `picker-color.ts:115-117`, and
`valueOrThrow` is an unconditional `throw new PickerColorError(result.error.code)`
(`picker-color.ts:104-107`). The template calls it **once per catalog row, for all 18 rows**
(line 91, inside the `v-for` at line 61).

The sibling code in the same domain treats the identical call as fallible: `useColorPipeline.ts:88-95`
wraps `convertPickerColor(m.color, "hsv")` in `try/catch`, and `useColorPipeline.ts:219-224` /
`247-257` wrap `parseColor` the same way. `ColorSpaceSelector` is the only surface in the color
session that converts the live colour into **every** space, and it is the only one with no guard.

### Reproduction A — pure user gesture, no deep link, dropdown never opened

Boot the picker in RGB at a near-white colour, then press `End` on the R slider and `End` on the
G slider (the sliders' own keyboard contract: jump to channel maximum).

```
$ node live-white.mjs
booted, triggers: 2  boundary: 0
sliders: 4
     0 R channel 0.9921568627450981
     1 G channel 0.996078431372549
     2 B channel 1
     3 ALPHA channel 1
   after slider 0 -> boundary: 0
   after slider 1 -> boundary: 1        ← the pane is DEAD
   slider 2 gone (pane already dead)
after End x3 -> boundary: 1  triggers: 0
URL: http://localhost:9000/#/?space=rgb&color=rgb(255+255+255)
non_finite errors captured: 1
color_non_finite
Error: color_non_finite
    at valueOrThrow (demo/color-session/picker-color.ts:154:8)
    at convertPickerColor (demo/color-session/picker-color.ts:162:9)
    at Proxy.specimenFor (demo/color-session/ColorSpaceSelector.vue:50:22)
```

(`picker-color.ts:154`/`:162` and `ColorSpaceSelector.vue:50` are **compiled** offsets served by
Vite; the sources are `picker-color.ts:106` `valueOrThrow`, `picker-color.ts:116`
`convertPickerColor`, `ColorSpaceSelector.vue:157` the `convertPickerColor` call inside
`specimenFor`.)

**The colour that kills it is pure white.** Not a pathological input — the most common colour in
the sRGB gamut, reachable by dragging three sliders to the right.

### Reproduction B — deep link (two variants), crash at first paint

```
$ node q.mjs
### C1-white-rgb  rgb / rgb(255 255 255)
   boundary=1 :: This panel hit an unexpected error. |  | color_non_finite |  | Try again
   triggers=0

### C1-white-hex  hex / #ffffff
   boundary=1 :: This panel hit an unexpected error. |  | color_non_finite |  | Try again
   triggers=0

### C1-nearwhite-rgb  rgb / rgb(254 255 255)
   boundary=0
   triggers=2
   AFTER OPEN: options=18 boundary=0
```

Full stack captured by patching `globalThis.Error` before module evaluation
(`stack.mjs`, `#/?space=rgb&color=rgb(255 255 255)`):

```
color_non_finite
Error: color_non_finite
    at valueOrThrow (demo/color-session/picker-color.ts:154:8)
    at convertPickerColor (demo/color-session/picker-color.ts:162:9)
    at Proxy.specimenFor (demo/color-session/ColorSpaceSelector.vue:50:22)
    at demo/color-session/ColorSpaceSelector.vue:144:35
    at renderFnWithContext (vue.runtime.esm-bundler)
    at renderSlot (vue.runtime.esm-bundler)
    at node_modules/.vite/deps/select-…js:1679:8
```

`#/?space=hex&color=%23ffffff` is the same crash — `resolveColorSpace("hex") === "rgb"`
(`color-model.ts:32-34`), so the stored colour is `rgb(255 255 255)` either way.

### The library-level mechanism (isolated, no browser)

```
$ node white.mjs
rgb(255 255 255)           -> hsl THROWCODE color_non_finite
hsl(0 0% 100%)             -> hsl [0,0,1]
lab(100% 0 0)              -> hsl [325.71…, 1.75, 0.9999999999999998]
color(display-p3 1 1 1)    -> hsl THROWCODE color_non_finite
hwb(0 100% 0%)             -> hsl THROWCODE color_non_finite
rgb(254 255 255)           -> hsl [180.0000000000034, 0.9999999999999434, 0.9980392156862745]
```

RGB→HSL at `max === min === 1` divides by `2 - max - min === 0`. Only **exact** white trips it,
which is why `rgb(254 255 255)` is fine and the defect reads as intermittent.

### Blast radius

Reproduction A/B kill **the whole picker pane**, not the dropdown: the throw propagates up the
component tree to `ErrorBoundary` (`App.vue:50`), whose `onErrorCaptured` returns `false`
(`ErrorBoundary.vue:59-69`) and replaces the entire `<slot>` subtree. Screenshot
`evidence/C1-white-rgb-dead.png` shows the result the user actually sees: **a flat grey field with
a single "Try again" pill**. The boundary's `role="alert"` statement and its `color_non_finite`
detail line are in the DOM (`innerText` = `This panel hit an unexpected error. |  | color_non_finite
|  | Try again`) but paint invisibly at this colour — so the user sees no explanation at all.
(That last part is `ErrorBoundary`'s own ink defect, out of this seat's scope; recorded because it
raises *this* crash's user-visible severity from "error card" to "blank app".)

### Adjacent crash class, same function, unreachable-today (labelled HYPOTHESIS for the open path)

Colours with a CSS `none` channel throw `color_missing_channel` for every non-native target:

```
=== oklch(0.5 0.2 none) (space oklch) ===
  rgb THROW convert FAIL rgb :: {"code":"color_missing_channel"}
  …16 more…
  hex THROW toRgba8 FAIL {"code":"color_missing_channel"}
```

`specimenFor` would throw on all 17 rows. **Today this is masked**: `useColorPipeline.ts:75-76`
crashes first (`channelNumber(convertPickerColor(color,"hsv"),"h")`), measured as
`PickerColorError: Missing hsv.h at useColorPipeline.ts:58 at setup (App.vue:77)` for
`#/?space=oklch&color=oklch(0 0 0)`. So the *pipeline* dies before the selector gets the chance.
That masking is incidental, not a fix: any future `none`-tolerance in the pipeline exposes 17
simultaneous throws here. Recorded as a co-morbid hazard, not an independent reproduction.

### Cure (gestalt, not patch)

`specimenFor` is a **display formatter** built out of a **fallible domain API**. The idiomatic
transposition is to stop calling the throwing wrappers at all and consume the `Result` the library
already returns — `convertColor`/`serializeCssColor`/`toRgba8` are total functions returning
`Result` (`picker-color.ts:104`), and `picker-color.ts` throws them away. Add a total sibling to
`picker-color.ts` — `tryConvertPickerColor(color, space): PickerColorIn<S> | null` and
`trySerializePickerColor(color): string | null` — and let `specimenFor` render an em-dash for the
`null`. A row that cannot be converted is *information* ("this colour has no HSL"), not a fatal
error. **No `try/catch` in the template, no `v-if` scaffolding: the fallibility belongs in the type,
which is where the library already put it.** The picker pane must never be able to die because a
closed dropdown could not name a colour.

---

## C-2 · BLOCKER — the catalog LIES: every preview is unclamped, every result is clamped

### The defect

`specimenFor` computes the preview with the raw `convertPickerColor` (line 157). The **write path**
clamps: `updateToColorSpace` → `setCurrentColor` → `updateModel`, and `updateModel` runs
`clampColorToSpaceDomain(patch.color)` (`useColorPipeline.ts:64-71`, the "ONE write gate" of the
T-33a value-domain law). The preview therefore computes a *different number* from the one the app
will store the instant you click the row.

### Reproduction — measured promise vs. measured result, three spaces

App default colour `lab(92% 88.8 20 / 82.7%)` (out of sRGB gamut — the shipped default).

```
$ node lie.mjs
CATALOG PROMISE for RGB : RGB | rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)
URL after select        : #/?space=rgb&color=rgb(255 143.376536829596 199.64311881105 / 82.7%)
HEADER after select     : RGB | 255 | , | 143 | , | 200
CATALOG RGB row now     : RGB | rgb(255 143.376536829596 199.64311881105 / 82.7%)
```

```
$ node hsl.mjs
PROMISE HSL: HSL | hsl(346.045357898758deg -1295.152156124318% 103.662622110611% / 82.7%)
RESULT  URL: #/?space=hsl&color=hsl(346.045357898758deg 0% 100% / 82.7%)
RESULT  HDR: HSL | 346 | deg | , | 0 | % | , | 100 | %
```

```
$ node about.mjs
after XYZ via ABOUT  URL: #/?space=xyz&color=color(xyz 1 0.787798986715 0.629624515433 / 82.7%)
   (the catalog had promised  color(xyz 1.266749228777 0.787798986715 0.629624515433 / 82.7%))
```

| space | catalog promises | app delivers | error |
|---|---|---|---|
| RGB | `r = 385.302835934518` | `r = 255` | **+51 %** |
| HSL | `s = -1295.152156124318 %` | `s = 0 %` | a hyper-saturated pink promised; **white delivered** |
| XYZ | `x = 1.266749228777` | `x = 1` | **+27 %** |

The HSL row is the clearest statement of the defect: the catalog offers a colour, the app hands you
a different colour, and nothing in the UI acknowledges the substitution.

### Second-order: the previews are not valid CSS

`hsl(… -1295.152156124318% 103.662622110611% …)`, `hwb(… -51.09915134687%)`,
`color(srgb-linear 2.580409706575 …)` — negative percentages and out-of-range components. The
component's own comment calls these rows "SPECIMEN entries … live per-space conversion" (lines
54-57). They are neither live-accurate nor CSS-valid.

### Cure

The preview must be computed through **the same gate the write goes through**. `specimenFor` should
format `clampColorToSpaceDomain(converted)` — one call, the existing exported function
(`valueDomain.ts:44`), zero new machinery. The domain law's own thesis is
"*every* color that LANDS on the demo model enters its space's domain … so the readout's worst case
is TRUE BY CONSTRUCTION" (`valueDomain.ts:5-13`); the catalog is the one surface that promises a
landing and is not held to it. Fixing it makes the preview *definitionally* equal to the result.

---

## C-3 · MAJOR — the file's cost model is false; 72 conversions per colour tick into a detached fragment

### The claim under test

```ts
// ColorSpaceSelector.vue:152-153
// The specimen line: the LIVE color read through each catalog space —
// computed only while the dropdown renders (SelectContent unmounts closed).
```

### The measurement — V8 precise coverage, `callCount: true`

```
$ node cov.mjs
dropdown CLOSED. DOM probes:
  .specimen-caption in DOM: 0
  .specimen-dot in DOM: 0
  [role=option] in DOM: 0
  .space-trigger count: 2
[after boot, never opened] setup=2  specimenFor=90  get SelectItem=36  get WatercolorDot=90  _sfc_render=2
[after 10 color changes, still CLOSED] specimenFor=720  get SelectItem=720  get WatercolorDot=720  _sfc_render=20
[after ONE open] specimenFor=145
  [role=option] after open: 18
```

- **Boot, dropdown never opened, zero option rows in the DOM: `specimenFor` ran 90 times.**
- **10 colour changes with the dropdown closed: 720 further calls** — 72 per colour tick
  (2 mounted instances × 18 rows × 2 render passes) producing **zero painted pixels**.

### The mechanism, named at the producer source

`reka-ui`'s `SelectContent`, when **closed**, does not unmount its slot — it teleports it into an
off-document `DocumentFragment`:

```js
// node_modules/reka-ui/dist/Select/SelectContent.js:122-124, 158-161
onMounted(() => { fragment.value = new DocumentFragment(); });
…
: fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(), createBlock(Teleport, { to: fragment.value }, [
      createVNode(SelectProvider_default, { context: unref(rootContext) }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),   ← ALL 18 ITEMS RENDER
```

reka does this so the item collection exists for value→label resolution and typeahead. The comment
at line 153 is therefore **false**, and it is the load-bearing justification for doing full colour
science in a template expression.

### The cost, measured in-browser against the app's own modules

```
$ node inbench.mjs
in-browser: 18 rows, ONE specimen pass = 2.511 ms
measured 72 specimenFor calls per colour tick (2 mounted instances) => 10.04 ms per colour tick,
ALL of it into a detached DocumentFragment
```

**10.04 ms of a 16.7 ms frame budget, per colour tick, for nothing.** Node micro-bench agrees in
order of magnitude (`bench.mjs`: 3.613 ms/pass, 14.45 ms/tick). A CPU profile over 40 colour ticks
with the dropdown closed attributes **10.6 % of all samples** to `dist/anchors-*.js` /
`dist/operations-*.js` (the colour-conversion core) — `prof.mjs`, 7500 samples / 6025 ms.

### The propagation — the false claim is now canon

```
$ grep -rn "ColorSpaceSelector" demo | grep -v node_modules
demo/workbenches/mix/MixConfigBar.vue:21:   // is mounted (reka unmounts it closed — the ColorSpaceSelector precedent),
demo/workbenches/generate/GenerateControls.vue:91: // — the ColorSpaceSelector precedent), so zero rest cost; 10 rows × 5-12
demo/shell/dock/DockViewSelect.vue:102:     (the ColorSpaceSelector precedent — the owner's
```

Three sibling components cite this component's false premise ("reka unmounts it closed",
"so zero rest cost") to justify their own per-row work. The defect is a **doctrine**, not a line.

### Cure

Make the catalog's data a `computed`, not a per-row function call, and gate it on `openModel`:

```ts
const specimens = computed(() =>
    openModel.value && colorModel
        ? Object.fromEntries(spaceEntries.map(([s]) => [s, formatSpecimen(s)]))
        : EMPTY,
);
```

One derivation per colour change instead of 36 per render pass per instance; nothing computed while
closed; and — because the gate is `openModel` rather than a claim about reka's internals — the
correctness no longer depends on a producer implementation detail that is already untrue.
The three propagated comments must be corrected in the same wave or the doctrine outlives the fix.

---

## C-4 · MAJOR — 16 of 18 specimen lines are visually clipped; the formatter rounds one branch and not the other

`specimenFor` rounds the **non-CSS** branch to 4 decimals (line 163) and applies **no rounding at
all** to the CSS branch (line 161, `serializePickerColor` emits full float precision). The row is
then `truncate`d inside `max-w-[16rem]` (lines 80, 89).

```
$ node trunc.mjs
captions: 18  clipped: 16
  CLIP  638> 234  rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)
  CLIP  720> 234  hsl(346.045357898758deg -1295.152156124318% 103.662622110611% / 82.7%)
  CLIP  319> 234  hsv · 346.0454 · 0.6279 · 1.511
  CLIP  247> 234  lab(92% 88.8 20 / 82.7%)
  CLIP  741> 234  color(prophoto-rgb 1.270097960811 0.688918884826 0.734567553273 / 82.7
  ok    134> 134  kelvin · 5309
  ok     93>  93  #ff8fc8d3
  … (16 CLIP, 2 ok)
distinct dot colors: 1 of 18
listbox: {"w":302,"h":384,"scrollH":382}
```

Screenshot `evidence/C-catalog-open-outofgamut.png` confirms it visually: every visible row reads
`hsl(346.045357898758d…`, `hwb(346.045357898758d…`, `lab(92% 88.8 20 / 82.…`. **The entire
informational payload of the catalog is invisible.** Even `lab(92% 88.8 20 / 82.7%)` — 24
characters — overflows by 13 px, because the popover is only 302 px wide and the caption box 234 px.

The 12-significant-digit tails are pure float noise: they exist only because the CSS branch skips
the rounding the sibling branch four lines below performs.

**Cure**: one formatter, one precision policy. Round before serialization (the library's
`serializeCssColor` accepts already-rounded channels), and size the caption to the longest *rounded*
specimen so `truncate` never fires — or drop `truncate` and let the row wrap to two lines, which the
80.7 px row height already affords.

---

## C-5 · MAJOR — vacuous gate: no test asserts a specimen value; `return "—"` keeps every gate green

### Census of everything that touches this component

```
$ grep -rn "space-trigger|Select color space|specimen" e2e test demo/test
e2e/smoke/color-space-switching.spec.ts:16       getByRole("combobox", { name: "Select color space" })
e2e/smoke/page-load.spec.ts:38                   getByRole("combobox", { name: "Select color space" })
e2e/smoke/url-color-precedence.spec.ts:80        getByRole("combobox", { name: "Select color space" })
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:174   .space-trigger  → fontFamily
e2e/smoke/oracles/o10-type-locks.spec.ts:65,66,279        .space-trigger  → font-size rung
e2e/smoke/oracles/o18-contrast-census.spec.ts:1017,1036   .specimen-name → fontWeight 400
                                                          .specimen-caption → contrast ratio
```

No unit or component test exists: `grep -rn "ColorSpaceSelector|specimenFor" test demo/test` returns
**nothing**.

### What the gates actually assert

- `color-space-switching.spec.ts:29` — `await expect(trigger).toHaveText(target)`. The trigger label.
- `o18-contrast-census.spec.ts:1049-1056` — every `.specimen-name` computes `font-weight: 400`
  (`expect(weights.length, "option letterforms mounted")` at :1054).
- `o18-contrast-census.spec.ts:1073-1078` — `.specimen-caption` contrast ratio ≥ `TEXT_FLOOR`
  (`expect(cap, "specimen caption mounted")` at :1073).
- `o10-type-locks` / `o10d` — the trigger's font family and size rung.

**Not one assertion reads a specimen value.**

### The mutation that keeps every gate green

```ts
function specimenFor(_space: DisplayColorSpace): string { return "—"; }
```

`.specimen-caption` still mounts (its `v-if` is `colorModel`, not the string), still computes weight
400, still passes the contrast census (an em-dash is text on the same rung), the trigger still
switches, the type locks still hold. **Every existing gate stays green while the catalog's entire
reason to exist is deleted.** A second mutation with the same property: return
`serializePickerColor(colorModel.model.value.color)` for all 18 rows — identical string 18 times,
all green.

The clamp oracle `test/value-domain-clamp.test.ts` is the sharpest irony: it proves
`clampPickerColor` is correct in isolation (6 `it()` blocks under
`describe("clampPickerColor physical-coordinate contract")`, `test/value-domain-clamp.test.ts:31-115`)
— and passes precisely *because* the selector never calls it (C-2).

**Cure**: a component test that mounts `ColorSpaceSelector` with a provided pipeline and asserts
(a) each row's caption equals the clamped conversion for that space, (b) mounting with
`rgb(255 255 255)` renders 18 rows without throwing, (c) `specimenFor` is not invoked while
`open === false`. All three are the C-1/C-2/C-3 defects turned into born-RED gates.

---

## C-6 · MAJOR — a11y: one hardcoded `aria-label` produces a WCAG 2.5.3 failure and two identical comboboxes

`aria-label="Select color space"` is hardcoded on the trigger (line 43).

### Measured accessible-name tree (CDP `Accessibility.getFullAXTree`, 1440×900, default route)

```
$ node a11y.mjs
triggers: 2
  [0] {"text":"Lab","aria":"Select color space","role":"combobox","tag":"BUTTON","w":111.5,"h":85,…,"host":"picker"}
  [1] {"text":"Lab","aria":"Select color space","role":"combobox","tag":"BUTTON","w":88.6,"h":48,…,"host":"about"}

AX comboboxes: 3
   name= "Select view"         value= "Home"
   name= "Select color space"  value= "Lab"
   name= "Select color space"  value= "Lab"
```

**(a) WCAG 2.5.3 Label in Name (Level A) — fail.** The visible label is `Lab`. The accessible name
is `Select color space`, which does not contain `Lab`. A speech-input user saying "click Lab" — the
only text they can see — cannot activate the control.

**(b) Two identically named comboboxes** are simultaneously in the a11y tree at desktop width
(picker + About pane), same name, same value, driving the same state. A screen-reader user tabbing
the page meets "Select color space, combobox, Lab" twice with nothing to distinguish them. This is a
direct consequence of the label being a hardcoded constant in the component rather than a host-
supplied prop — note the file already has a host-differentiation prop (`inline`, line 131) and uses
it only for font-size.

**Cure**: delete `aria-label` and let the name come from content, adding a visually-hidden qualifier
inside the trigger so the name reads `Color space Lab` (name contains the visible label → 2.5.3
satisfied, value in name → still self-describing). Differentiate the two hosts by extending the
existing host prop (`inline` → a `label` or `context` prop) rather than minting a second mechanism.
Note that three e2e specs currently select on `{ name: "Select color space" }`
(`color-space-switching.spec.ts:16`, `page-load.spec.ts:38`, `url-color-precedence.spec.ts:80`) and
must move to the new name in the same change — they are load-bearing on the defect.

---

## C-7 · MINOR — the specimen line is in no accessible name; combined with C-4 it reaches nobody

```
AX options: 18
   name= "RGB"    selected= false
   name= "HSL"    selected= false
   name= "HSV"    selected= false
   name= "HWB"    selected= false
```

The `#description` slot (lines 79-94) carries the entire per-space conversion and contributes
**nothing** to the option's accessible name, and there is no `aria-describedby` wiring it in. Paired
with C-4 (16 of 18 captions visually clipped), the catalog's payload is unavailable to sighted users
*and* to assistive technology. Whatever this row is for, no user currently receives it.

---

## C-8 · MINOR — redundant duplicate close; reka already closes on select

```html
<!-- ColorSpaceSelector.vue:10-15 -->
@update:model-value="
    (colorSpace: any) => {
        emit('update:modelValue', colorSpace);
        openModel = false;                       ← redundant
    }
"
```

reka closes the select itself, at the producer source:

```js
// node_modules/reka-ui/dist/Select/SelectItem.js:67
if (!rootContext.multiple.value) rootContext.onOpenChange(false);
```

So every selection emits `update:open(false)` **twice** — once from reka's `onOpenChange`, once from
this line's write to the `defineModel` (line 144). Benign today (idempotent boolean, and the write
is not read back so the `defineModel` stale-read hazard does not bite), but it is dead control flow
that hardcodes an assumption about producer behaviour, and it is precisely the shape that becomes a
race the day reka defers its close. Delete the line — edict 3 (KISS, no contrivance).

---

## C-9 · MINOR — type erosion: the component's own prop type forces `any` at three call sites

```ts
modelValue: string;                              // line 126 — should be DisplayColorSpace
"update:modelValue": [value: string];            // line 147 — same
const spaceEntries = Object.entries(DISPLAY_COLOR_SPACE_NAMES);   // line 150 → [string, string][]
```

Because the prop and the emit are typed `string` and `Object.entries` discards the key type, the
component must cast in its own template (`space as DisplayColorSpace`, line 91) and **both hosts**
must launder through `any`:

```
demo/color-session/ColorSpaceSelector.vue:11   (colorSpace: any) => { emit('update:modelValue', colorSpace); … }
demo/picker/ColorPicker.vue:42                 @update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
demo/scenes/about/AboutPane.vue:25             @update:model-value="(colorSpace: any) => { model = { …model, selectedColorSpace: colorSpace }; }"
```

The domain type exists and is imported two lines away (`import type { DisplayColorSpace }`, line 122).
Widening it to `string` at the boundary means an invalid space reaches `resolveColorSpace` and
`PICKER_CHANNELS[space]` with no compiler objection — the same class of hole that
`useColorUrl.ts:32` papers over with `space as DisplayColorSpace` and a runtime `try/catch`.

**Cure**: `modelValue: DisplayColorSpace`, emit `[value: DisplayColorSpace]`, and
`const spaceEntries = Object.entries(DISPLAY_COLOR_SPACE_NAMES) as [DisplayColorSpace, string][]`
(or better, key off `DISPLAY_COLOR_SPACE_NAMES` directly in the `v-for`). All three `any`s and the
in-template cast disappear.

---

## C-10 · MINOR — the two injections disagree about their own contract

```ts
const safeAccent  = inject(SAFE_ACCENT_KEY)!;        // line 134 — non-null assertion
const colorModel  = inject(COLOR_MODEL_KEY, null);   // line 142 — explicitly null-tolerant
```

with an eight-line comment above line 142 justifying the tolerance: *"a future host outside any
provider renders the catalog without the conversion line rather than crashing."* The reasoning is
sound and the very next injection contradicts it. In practice `safeAccent` undefined degrades
silently (the `color-mix()` at line 191 becomes invalid and the declaration is dropped) — so the
`!` is not protecting anything, it is asserting a fact the file elsewhere refuses to assume. Pick
one contract.

---

## C-11 · MINOR — per-instance overrides of the design-system component (edicts 4 and 5)

The trigger's live class list, read off the DOM (`dom.mjs`), carries **the producer's utility and
the consumer's contradiction of it, both**:

```
class="… px-3 py-2 text-dropdown … [&>span]:line-clamp-1 …            ← glass-ui SelectTrigger ships these
       space-trigger inline-flex w-fit h-fit align-baseline font-display italic
       … [&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block …"   ← the consumer's rebuttal
computed padding: "0px 0px 5.0616px"        ← the scoped block beat px-3 py-2 by unlayered specificity
```

`[&>span]:line-clamp-1` and `[&>span]:line-clamp-none` are both present on one element; glass-ui's
slim `cn` does not conflict-resolve (the file says so itself at lines 219-222), so the winner is
decided by emitted-CSS order — a property of the build, not of either author's intent. The scoped
block then reaches into the producer's internals three more times (`:deep(svg)` line 239,
`> :deep(span)` lines 249, 261, 269). The file marks each as a "BOOKED SWAP … the day P10 ships"
(lines 197-199, 212, 296-299) — an acknowledged standing violation of edict 4 (variants belong in
glass-ui) and edict 5 (style at the root component level, never per-instance).

Measured mitigating fact: the trigger currently has exactly one direct `<span>` and one `<svg>`
(`"directChildren": ["SPAN.w-full", "svg.lucide lucide-chevron-down-icon"]`), so `> :deep(span)`
is presently precise. It is a producer-shape dependency, not a bug today.

**Cure**: the ghost-title face is a glass-ui `SelectTrigger` **variant**, not a consumer class list.
Ship `variant="title"` (padding 0, em-relative caret, editorial underline) in glass-ui and delete
the entire scoped block plus the arbitrary-variant utilities. That is the booked swap; it is also
the only way the three `:deep()` reaches stop being load-bearing.

---

## C-12 · INFO — 18 identical swatches

```
distinct dot colors: 1 of 18
```

Every `WatercolorDot` receives the same `:color="cssColor"` (line 83) — the live colour, not the
per-space rendering of it. Eighteen identical dots. The only information the dot carries is the
selected/idle opacity step (line 85, `.specimen-dot-idle { opacity: 0.35 }`). Recorded as
implementation observation; whether the dot should differ per space is challenge-D's call.

---

## Negative proof — what I attacked and could not break

Reported so the absence of a finding here is evidence, not silence.

| probe | result |
|---|---|
| **Leaks / cleanup** | The component registers **no** listener, observer, timer, `requestAnimationFrame`, or async call. `grep -nE '\b(addEventListener\|requestAnimationFrame\|setTimeout\|setInterval\|onMounted\|onUnmounted\|onBeforeUnmount\|watch\|watchEffect\|ResizeObserver\|IntersectionObserver)\b' demo/color-session/ColorSpaceSelector.vue` → **0 hits** (exit 1). No PRM-RAF exposure, no unmount cleanup surface, no unbounded growth. |
| **`defineModel` stale-read hazard** | `openModel` (line 144) is written at line 13 and **never read after the write** in the same tick. No stale read exists. Verified live: `about.mjs` selects XYZ → Kelvin → Hex in rapid succession from the About host; picker and About triggers both land on `Hex`, URL `#/?space=hex&color=#ffe4ced3`. No desync. |
| **Dual-instance sync** | Two instances mount simultaneously at 1440 px and share the App-provided pipeline. Selecting from either updates both: `before picker=Lab about=Lab` → `after XYZ via ABOUT picker=XYZ about=XYZ`. Opening one does not open the other (`about expanded: true  picker expanded: false  listboxes: 1`). |
| **Keyboard operability** | `Enter` opens (18 options, `aria-expanded=true`); `ArrowDown` moves the highlight; typeahead works (`type("oklch")` → highlighted `OKLCh`); `Enter` selects (trigger → `OKLCh`, URL updated); focus returns to the trigger (`{t:'BUTTON', a:'Select color space'}`). `Escape` closes and restores focus to the trigger. All producer-provided; none broken by this component. |
| **Tap targets** | picker trigger **111.5 × 85 px**, About trigger **88.6 × 48 px**, option rows **284 × 80.7 px** — all ≥ 24 px. **This component contributes 0 to the visual REPORT's 60 `smallTapTargets`.** |
| **Nameless buttons** | The trigger is a `<button>` with a non-empty accessible name. **0 contribution to the REPORT's 18 `namelessButtons`** — the name is *wrong* (C-6), not *missing*. |
| **`verbatimModuleSyntax`** | Compliant. Line 122 `import type { DisplayColorSpace }` is the only type-only import and it is `import type`. All other imports (lines 102-123) are value imports. |
| **Vue 3.5 idioms** | Reactive props destructure with default (`const { modelValue, cssColor, inline = false } = defineProps<…>()`, lines 125-132) — correct. No template ref needed. `shallowRef` cache not required (see stale-read row). |
| **God module** | 311 lines, one responsibility. Not a god module; nothing was added to one. |
| **Animations** | No keyframes deleted; the transitions at lines 192, 254 are tokenized (`--duration-fast`, `--ease-standard`) and defer to the global PRM guard. Edict 6 satisfied. |
| **Legacy / dual paths** | No aliases, shims, or back-compat branches. Edict 2 satisfied. |
| **Healthy-path console** | On a boot-safe colour: zero page errors, zero component-attributable console errors (the only console error is the dev-server `VITE_API_URL` misconfiguration banner, unrelated). Matches the visual REPORT's `pageErrors — 0`. |
| **Horizontal overflow** | None; the popover is `302 px` wide with internal scroll (`scrollHeight 382` vs `height 384`). Matches the REPORT's `horizontalOverflow — 0`. |

---

## Defect summary

| id | severity | defect | one-line mechanism |
|---|---|---|---|
| C-1 | **BLOCKER** | picker pane dies on white | throwing conversion API called unguarded in render |
| C-2 | **BLOCKER** | catalog advertises numbers the app won't deliver | preview skips the clamp the write gate applies |
| C-3 | MAJOR | 72 conversions / colour tick into a detached fragment | false premise: reka teleports closed content, it does not unmount |
| C-4 | MAJOR | 16/18 captions clipped | CSS branch skips the rounding the sibling branch applies |
| C-5 | MAJOR | vacuous gate | no test asserts a specimen value; `return "—"` stays green |
| C-6 | MAJOR | WCAG 2.5.3 fail + duplicate combobox names | hardcoded `aria-label` replaces the visible label |
| C-7 | MINOR | specimen absent from every accessible name | `#description` not wired into naming |
| C-8 | MINOR | duplicate close emission | reka already closes at `SelectItem.js:67` |
| C-9 | MINOR | `any` at three call sites | prop typed `string` instead of `DisplayColorSpace` |
| C-10 | MINOR | contradictory injection contracts | `inject(...)!` beside `inject(..., null)` |
| C-11 | MINOR | per-instance overrides of glass-ui | consumer class list rebuts the producer's shipped utilities |
| C-12 | INFO | 18 identical swatches | every dot gets the same `cssColor` |

**Strongest defect: C-1.** Pressing `End` twice on the RGB sliders — a documented keyboard gesture
on the app's own controls — destroys the picker pane and leaves the user on a blank grey screen,
because a *closed* dropdown could not convert white to HSL.

---

## Evidence index

Scripts (scratchpad, this seat):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/css-seatC/`
— `p.mjs` (boot), `q.mjs` (crash matrix), `stack.mjs` (Error-proxy stack capture), `cov.mjs`
(V8 precise coverage), `prof.mjs` (CPU profile), `inbench.mjs` (in-browser bench), `trunc.mjs`
(clip census), `a11y.mjs` (CDP AX tree), `lie.mjs` / `hsl.mjs` (promise vs result), `about.mjs`
(dual host), `kb.mjs` (keyboard), `dom.mjs` (trigger DOM), `live-white.mjs` (gesture repro),
`bench.mjs` (library-level micro-bench, no browser).
The two library-level crash-matrix probes (`spec.mjs`, `white.mjs` — the `=== rgb(255 255 255) ===`
and `-> hsl THROWCODE color_non_finite` tables quoted in C-1/C-2) were written to the **shared**
scratchpad root, which sibling seats in this session also write to; treat the pasted outputs above as
the record. Both are ~20 lines and reconstruct from the quoted `SPACES`/`CSS_PICKER_SPACES` loops
against `dist/subpaths/{color,css}.js`.

Screenshots — `docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/evidence/`:
- `C1-white-rgb-dead.png` · `C1-white-hex-dead.png` — C-1, the blank grey pane
- `C-live-slider-to-white.png` — C-1, the gesture reproduction
- `C-catalog-open-outofgamut.png` · `C-open-catalog-1440.png` — C-2 / C-4, the lying, clipped catalog
- `C-after-hsl-select.png` — C-2, the delivered colour
- `C1-nearwhite-rgb-open.png` · `C0-default-lab-open.png` — healthy-path controls
