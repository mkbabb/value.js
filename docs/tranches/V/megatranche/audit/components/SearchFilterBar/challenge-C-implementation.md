# CHALLENGE-C — SearchFilterBar.vue · the implementation is defective (r4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was declared with and the tier I served for every line below. Nothing was
inherited from an ambient default; nothing was delegated to another model; no sub-agent wrote any
part of this report or ran any probe in it.

---

| | |
|---|---|
| **Subject** | `demo/palettes/browser/search/SearchFilterBar.vue` — 249 lines, sha256 `c7e1ce515e78c069…`, area `palettes` |
| **Child** | `demo/palettes/browser/search/MiniColorPicker.vue` (152 lines) — the subject's only non-`ui/` child, and the source of two of the five blockers |
| **Sole consumer** | `demo/palettes/BrowsePane.vue:15-27` (slotted into `SearchBar`) |
| **Repo** | `/Users/mkbabb/Programming/value.js` · branch `tranche-u` |
| **HEAD at audit time** | `9268f054`. The brief cites `c654824e`; the branch advanced during the mega-tranche. The **subject file is unchanged since `a61094e3`** (`git log --oneline -1 -- demo/palettes/browser/search/SearchFilterBar.vue` → `a61094e3 feat(v-w43b3)!: home the feature UI trees`), so every measurement below is against the bytes the brief points at. |
| **Verdict** | **DEFECTIVE** — on its one verb ("Find by Color") it returns a silently wrong answer for **11 of 13 inputs**, and its picker can be left in a state where **hovering** changes the colour. |

### Relationship to r2 and r3

Two C seats have written to this path before me. Both are preserved verbatim:

- `challenge-C-implementation-r2-32b4040e.md` — banked **C-1 … C-14**
- `challenge-C-implementation-r3-f36f780c.md` — banked **C-15 … C-22**, re-verified r2's blockers

This report is **r4**. It does not restate their arguments. It does three things:

1. **Nine new defects, C-23 … C-32**, none of which appears in r2 or r3. Four are reproduced with
   *zero* fixtures and *zero* route interception — a bare dev server, a click, a measurement.
2. **Independent re-derivation** of the three prior claims that carry the most weight, using
   different instruments than either seat used (a full `strictTemplates` compile of my own; a CDP
   accessible-name walk; the glass-ui *source* of the utility layer rather than the CSSOM).
3. **A negative-proof section longer than most seats' findings sections** (§4). Nine hypotheses I
   formed from the brief's own hazard list, probed, and *killed*. Two are claims a careless auditor
   would have shipped as findings; one (`hover:shadow-cartoon-md`) I "confirmed" with an instrument
   that was lying to me, and I say so and retract the instrument.

| prior claim | r4 disposition |
|---|---|
| C-1 Checkbox `:checked`/`@update:checked` drift | **CONFIRMED by my own compile** — `TS2353` ×2 at `SearchFilterBar.vue:52,53` (§2.1) |
| C-2 hex-only masking fallback | **CLOSED by exhaustive enumeration** — 13-input domain table, 11 silently wrong (§1.3) |
| C-3 / C-15 popover has no height contract | **CONFIRMED on mobile independently, and ESCALATED to plain desktop** (§1.6) |
| C-4 `variant` is not a glass-ui 7 prop | **CONFIRMED twice** — my compile (`TS2353` ×3) *and* the rendered class list, which contains no variant class at all (§1.5, §2.1) |
| C-16 `p-0` inert | CONFIRMED — `padding: 20.352px 16px` measured; **and the same mechanism found on `h-8`** (§1.5) |
| C-17 `hover:shadow-cartoon-md` generates no rule | **CONFIRMED, but r3's CSSOM instrument cannot prove it and neither could mine.** Proven instead from glass-ui *source*: `.shadow-cartoon-md` is `@layer components`, not `@utility` (§2.2). My own CSSOM walk returned `[]` for rules that demonstrably exist — §4.8. |
| C-7 zero tests | CONFIRMED — 94 spec files, `grep -rl SearchFilterBar test/ e2e/` → **0** (§2.3) |
| C-9 "no rAF, no `defineModel`, no lossy roundtrip" | **The rAF/`defineModel` half CONFIRMED (§4.1, §4.2). The "no lossy roundtrip" half is now the largest defect in the component** — §1.1 and §1.2 both live inside that loop. |

---

## 0. Method

**Static.** Full read of the subject and of `MiniColorPicker.vue`; `BrowsePane.vue:1-30, 205-232,
318-360`; the four `demo/ui/*` barrels (all four re-export straight from `@mkbabb/glass-ui`); the
**published** glass-ui 7.0.0 surface — `dist/components/input/{Input.vue.d.ts,types.d.ts}`, the
compiled `dist/Input-9BlLluik.js`, `dist/field-control…js`, `dist/styles/utilities/components.css`;
and `api/src/modules/palette/{schema.ts,service/crud-list.ts,service/oklab.ts}` for the server
contract the component's emit is supposed to reach.

**Compile.** One full `vue-tsc` run under `vueCompilerOptions.strictTemplates: true` (§2.1). Ten
errors land inside the subject pair. The count is not the finding — the **classification** is: three
of the ten are false positives against runtime behaviour I measured, and saying so is the point.

**Live.** Six Playwright probe batches against the running dev server at `http://localhost:9000`,
engine **chromium** (stated explicitly: the repo's certified visual matrix is Safari/WebKit; where a
finding could plausibly be engine-specific I say so). **No route interception, no mocked tag list,
no fixture, in any of the six.** Sources in `probes/`, results in `evidence-r4/`.

| probe | what it decides | output |
|---|---|---|
| `probe-C-r4-1.mjs` | first-open state, button/`type` inventory, label-row activation, nested-popover behaviour, Escape ladder, wall counts | `evidence-r4/probeC-r4-1.json` |
| `probe-C-r4-2.mjs` | CDP accessible names, aria wiring, the typed-query clobber, `miniPickerOpen` leak test, **the 13-input domain table**, post-search geometry, tab walk | `evidence-r4/probeC-r4-2.json` |
| `probe-C-r4-3.mjs` | CSSOM cascade, trigger box, swatch hover shadow, field overflow contract, **41-pointermove aria churn**, panel overlap | `evidence-r4/probeC-r4-3.json` |
| `probe-C-r4-4.mjs` | field caret/scroll, and an independent mobile re-confirmation at `390×664` | `evidence-r4/probeC-r4-4.json`, `C-r4-mobile-390.png` |
| `probe-C-r4-5.mjs` | canvas text metrics — what actually fits in the field | `evidence-r4/probeC-r4-5.json`, `C-r4-field-placeholder.png` |
| `probe-C-r4-6.mjs` | focus owner during a drag; **the `pointercancel` stuck-drag, driven with real CDP touch events, with a control** | `evidence-r4/probeC-r4-6.json` |

**Environment honesty.** The dev server at `:9000` emits, on every load:

```
[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is
targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
excludes localhost — every palette request will be blocked.
```

The repo's own certified visual capture recorded the same condition
(`audit/visual/REPORT.json`, `/#/browse`: `consoleWarnings: ["Failed to load remote palettes:
SyntaxError…"]`). **The browse wall is therefore empty in every environment this mega-tranche has
measured, including the one that produced the shipped screenshots.** Every finding below is stated so
the empty wall is irrelevant to it — none of the nine new defects needs a palette to exist. Where the
empty wall *does* matter (§1.8) I say exactly what it prevented me from measuring and what I
substituted.

---

# 1. New defects — C-23 … C-32

## 1.1 BLOCKER — C-23: after a cancelled touch gesture, **hovering** the colour canvas changes the colour. The drag flag is never reset, and there is no `pointercancel` handler.

This is the exact hazard on the brief's own list — *"reka-ui slider pointer-capture leaks needing
`pointercancel`/`lostpointercapture` recovery"* — reproduced in the subject's only child, with a
control that rules out the alternative explanation.

### Mechanism

`MiniColorPicker.vue:126-137`:

```ts
let canvasDragging = false;
function onCanvasPointer(e: PointerEvent) {
    canvasDragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateCanvas(e);
}
function onCanvasMove(e: PointerEvent) { if (canvasDragging) updateCanvas(e); }
function onCanvasUp() { canvasDragging = false; }
```

bound at `MiniColorPicker.vue:13-15` as `@pointerdown` / `@pointermove` / `@pointerup`. The identical
shape governs the hue strip at `:143-149` (`hueDragging`).

`canvasDragging` is set `true` on `pointerdown` and cleared **only** by `pointerup`. Per the Pointer
Events spec, when the user agent takes a gesture over — iOS Safari scroll takeover, a system edge
gesture, a stylus mode switch, an orientation change — the sequence terminates with **`pointercancel`
and no `pointerup`**. Neither `pointercancel` nor `lostpointercapture` is handled anywhere in the file:

```
$ grep -nE "pointercancel|lostpointercapture|releasePointerCapture" demo/palettes/browser/search/MiniColorPicker.vue
(no matches)
```

The flag latches `true` for the life of the mounted component, and every subsequent `pointermove` —
including a bare mouse hover with no button held — runs `updateCanvas(e)`.

### Reproduction — `probes/probe-C-r4-6.mjs`, no fixture, real CDP touch events

Real touch input via `Input.dispatchTouchEvent` (synthetic `new PointerEvent` would have thrown
inside `setPointerCapture` and invalidated the test — I tried that first and discarded it):

```
touchStart(12,12) → touchMove(30,30) → touchCancel[]   then: eleven mouse moves, buttons = 0
```

`evidence-r4/probeC-r4-6.json`:

```json
"stuckDrag": {
  "beforeTouch":    "Open color picker, current color #7e93a4",
  "midTouch":       "Open color picker, current color #9badbb",
  "afterCancel":    "Open color picker, current color #9badbb",
  "afterHoverOnly": "Open color picker, current color #000509",
  "dragStuckAfterCancel": true
},
"control": {
  "base":    "Open color picker, current color #a7b7c4",
  "after":   "Open color picker, current color #a7b7c4",
  "changed": false
}
```

Read it in order. The touch drag works (`#7e93a4` → `#9badbb`). `touchCancel` correctly changes
nothing. Then **eleven mouse moves with no button held drive the colour from `#9badbb` to
`#000509`** — a collapse to near-black the user did not ask for. The **control** is the same eleven
hover moves after a clean `pointerup`: `changed: false`. The stuck flag, not the hover, is the cause.

### Why this is a blocker and not a curiosity

Three multipliers:

1. **It propagates into the subject.** `MiniColorPicker.vue:105` —
   `watch(currentHex, (hex) => emit("update:hex", hex))` — reaches `SearchFilterBar.vue:175-178`,
   which writes **both** `pickerHex` **and** `colorText`. A stuck drag does not merely misdraw a
   swatch; it rewrites the text the user typed (§1.2) and the value the next `Search` press will
   actually search — because `applyColorSearch` falls back to `pickerHex` for all non-`#rrggbb`
   input (§1.3). **The component's answer changes because the pointer moved.**
2. **`pointercancel` is a touch phenomenon**, and touch is exactly where §1.6 shows the panel already
   does not fit. On a touch laptop or tablet where the panel *does* fit, this is live today.
3. **The cure exists in this tree, five times over, in the same widget shape.**

```
$ grep -rn "pointercancel\|lostpointercapture" demo/ | head
demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:208:  @pointercancel="onBarPointerUp"
demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:268:  @pointercancel="onHandlePointerUp"
demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:332:  el.addEventListener("pointercancel", onPointerUp);
demo/picker/composables/usePointerDebug.ts:230:  document.addEventListener("pointercancel", onGlobalPointerCancel, { capture: true });
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:18:  @pointercancel="handleSpectrumCancel"
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:19:  @lostpointercapture="onLostPointerCapture"
```

`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue` **is the same component**: an SV spectrum
canvas that calls `el.setPointerCapture(event.pointerId)` at `:148` and handles `@pointerdown`
(`:15`), `@pointercancel` (`:18` → `handleSpectrumCancel`, `:182`) and `@lostpointercapture`
(`:19` → `onLostPointerCapture`, `:168`). `MiniColorPicker` is a hand-rolled second implementation of
that widget with the recovery removed. This is not an oversight in a line; it is a re-implementation
that dropped the part the first implementation exists to teach.

### Cure

Do not add three more handlers to a hand-rolled machine — delete the machine. The idiomatic
transposition is either (a) **consume `SpectrumCanvas`**, which already solves this, or (b)
`@vueuse/core` (already a dependency — glass-ui's own `Input` uses `useVModel`) with a
capture-aware teardown, expressing "drag until the pointer session ends, however it ends" once. If
the hand-rolled form is kept, the flag must be cleared by the *session*, not by one of its
terminators: `@pointerup`, `@pointercancel` and `@lostpointercapture` all clear it, with
`e.buttons !== 0` in `updateCanvas` as the belt.

---

## 1.2 BLOCKER — C-24: the picker silently overwrites what the user typed. The text field is not an input; it is an editable readout.

### Measurement — `probes/probe-C-r4-2.mjs` §B, no fixture

Type `rebeccapurple` into the colour field. Open the mini picker. Perform **one** SV-canvas drag.

`evidence-r4/probeC-r4-2.json`:

```json
"clobber": {
  "typed": "rebeccapurple",
  "beforeDrag": "rebeccapurple",
  "afterDrag": "#081f33",
  "clobbered": true,
  "swatchAria": "Open color picker, current color #081f33"
}
```

The query is gone. Not merged, not warned about, not restorable — `colorText` has no history and the
picker has no cancel.

### Mechanism

`SearchFilterBar.vue:175-178`:

```ts
function onPickerHexUpdate(hex: string) {
    pickerHex.value = hex;
    colorText.value = hex;      // ← unconditional
}
```

bound at `:70` to `@update:hex`, which `MiniColorPicker.vue:105` fires from a `watch` on a
`computed` — i.e. **once per reactive tick of the drag**, not once at commit. §1.9 measures the rate:
41 emissions for 41 pointermoves.

There is no guard distinguishing "the user has authored text here" from "this field is echoing the
swatch". `colorText` is a single `ref("")` serving two roles that disagree.

### Why every gate is blind to it

The two writers live in different files. `MiniColorPicker` emits; `SearchFilterBar` assigns. No type
error (the emit is correctly typed `[hex: string]`), no lint rule, and — per §2.3 — no test at all. A
reviewer reading `onPickerHexUpdate` in isolation sees three plausible lines.

### Cure

Separate the two roles, which is also the smaller component:

- `pickerHex` is the picker's value; the swatch and the picker bind to it.
- `colorText` is the user's query; written by the user, and by `applyColorSearchFromPicker`
  **only** (`:180-187` — the explicit "search from the picker" commit, where overwriting the field
  *is* the user's instruction).
- Delete `colorText.value = hex` from `onPickerHexUpdate`. The live echo is then the swatch, which
  is what a swatch is for.

A one-line deletion that also removes 41 of the 41 spurious writes measured in §1.9.

---

## 1.3 BLOCKER (closes C-2 by enumeration) — every one of thirteen inputs reports success; eleven of them search a colour the user never named.

r2 found the hex-only fallback. r3 found the empty-string entry path. Neither enumerated the domain.
I did, live, with the badge as the success oracle.

### Measurement — `probes/probe-C-r4-2.mjs` §D, no fixture

For each input: click **Clear all filters** (badge → `null`), reopen, `fill(input)`, press `Enter`,
read the badge. `evidence-r4/probeC-r4-2.json` → `inputDomain`:

| # | input | badge before | badge after | what `applyColorSearch` actually searched | honest? |
|---|---|---|---|---|---|
| 1 | `""` | `null` | **`1`** | `pickerHex` | ✗ the empty string performs a search |
| 2 | `"   "` | `null` | **`1`** | `pickerHex` | ✗ |
| 3 | `"#fff"` | `null` | **`1`** | `pickerHex` | ✗ **valid CSS 3-digit hex, rejected** |
| 4 | `"#FF0000"` | `null` | **`1`** | `#FF0000` | ✓ |
| 5 | `"  #ff0000  "` | `null` | **`1`** | `#ff0000` | ✓ (`.trim()` at `:217`) |
| 6 | `"#ff0000ff"` | `null` | **`1`** | `pickerHex` | ✗ valid 8-digit hex |
| 7 | `"rebeccapurple"` | `null` | **`1`** | `pickerHex` | ✗ valid named colour |
| 8 | `"hsl(210 50% 50%)"` | `null` | **`1`** | `pickerHex` | ✗ **the syntax the placeholder advertises** |
| 9 | `"oklch(0.7 0.1 30)"` | `null` | **`1`** | `pickerHex` | ✗ the repo's own native space |
| 10 | `"rgb(255 0 0)"` | `null` | **`1`** | `pickerHex` | ✗ |
| 11 | `"#gggggg"` | `null` | **`1`** | `pickerHex` | ✗ **malformed input reports success** |
| 12 | `"NaN"` | `null` | **`1`** | `pickerHex` | ✗ |
| 13 | `"#00000"` | `null` | **`1`** | `pickerHex` | ✗ 5-digit hex, malformed |

**13 of 13 report success. 2 of 13 are honest. 0 of 13 report failure.** `pageErrors: 0` throughout —
the component never throws, which is precisely the problem: the malformed rows are indistinguishable
from the correct ones at every surface the user can see.

### The line

`SearchFilterBar.vue:218`:

```ts
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

A masking fallback of the exact species **owner edict 2** forbids. It converts *"I cannot parse this"*
into *"here is an answer to a different question"*, then sets `colorSearchActive = true` so the badge
asserts a filter is applied.

### What makes it inexcusable rather than merely wrong

`src/` — this repository's own published library — exports a **total** CSS colour parser, and
`demo/color-session/color-utils.ts:11` already wraps it:

```ts
export function parseColorIn<S extends PickerSpace>(source: string, space: S): PickerColorIn<S> {
    return convertPickerColor(parsePickerColor(source), space);
}
```

The component **imports this function** (`SearchFilterBar.vue:145`) and then, at `:218`, guards it
with a six-digit-hex regex — declining to hand the parser anything it might not like. That parser
handles `#fff`, `#ff0000ff`, `rebeccapurple`, `hsl()`, `oklch()` and `rgb()`: rows 3, 6, 7, 8, 9 and
10. **Six of the eight wrong answers are wrong because the component refuses to call the code it
already imported.**

### Cure

Delete the regex. Parse, and make failure visible:

```ts
const parsed = tryParseColorIn(colorText.value.trim(), "oklab");   // Result, not throw
if (!parsed.ok) { parseError.value = parsed.error; return; }       // aria-live + Input invalid state
```

glass-ui's `Input` already declares `invalid?: boolean` (`dist/components/input/types.d.ts`) and maps
it to `aria-invalid` and `data-state="invalid"` (`dist/field-control…js` — `ariaInvalid`, `state`).
**The error surface exists and is unused; wiring it is the whole fix.** `hexToOklab` at `:205-211` —
misnamed (it takes any CSS colour) and carrying a `throw` the regex makes unreachable — is then
deleted, and `applyColorSearchFromPicker` at `:180`, which calls it with **no `try` at all**, loses
its latent crash path.

---

## 1.4 MAJOR — C-25: the placeholder is 188% too wide to render, and the syntax it advertises is one of the eleven the code discards.

### Measurement — `probes/probe-C-r4-5.mjs`, canvas text metrics against the field's own computed font

`evidence-r4/probeC-r4-5.json`:

```json
"placeholderFits": { "placeholder": "#hex, hsl(...)", "textPx": 123.9, "contentPx": 66, "fits": false }
```

The content box is **66px** — not the field, which is 148px wide (`clientWidth 146`), but
`146 − 16px paddingLeft − 64px paddingRight = 66px`. `pr-16` at `SearchFilterBar.vue:94` reserves
**64px, 44% of the field's entire width**, for a Search button measured at **52.6px**.

| value | rendered px | fits in 66px |
|---|---|---|
| `#hex, hsl(...)` *(the placeholder)* | 123.9 | **✗ 188%** |
| `#ff0000` | 61.9 | ✓ (4.1px of slack) |
| `hsl(210 50% 50%)` | 141.6 | ✗ 215% |
| `rebeccapurple` | 115.0 | ✗ 174% |

### The screenshot — `evidence-r4/C-r4-field-placeholder.png`

I looked at it. The placeholder renders as **`#hex, h`** — cut mid-token, running under the Search
pill, with no ellipsis (computed `text-overflow: ellipsis` with `overflow: clip`, measured in
`probeC-r4-3.json` → `input`, produces a hard cut on a form control, not an ellipsis).

The only affordance in the entire component that tells a user what this field accepts is destroyed by
the component's own layout — **and the half that survives, `#hex`, happens to be the only half that is
true.** The truncated token is `hsl`, which per §1.3 row 8 is silently discarded.

### Cure

The button does not belong inside the field. It measures 52.6 × 24.0px — exactly the WCAG 2.5.8
floor — and costs 64px of a 148px field to host. Move it to its own row beneath: the panel is a
vertical stack of `.filter-section`s already, and a full-width `Search` under a full-width field is
both the smaller layout and the larger target. `pr-16` and the whole
`absolute right-1 top-1/2 -translate-y-1/2` block at `:97-104` disappear. Then the placeholder fits —
and it should be corrected to advertise only what §1.3's cure actually accepts.

---

## 1.5 MAJOR — C-26: `h-8` is inert on the filter trigger. The author designed a 32×32 square; the DOM ships 32×40, and the badge is anchored to a box that does not exist.

r3 found `p-0` losing to `px-(--overlay-pad-inline)` on the panel. That is not a one-off — the same
mechanism sits on the trigger, in the same file, four lines from the top.

### Measurement — `probes/probe-C-r4-3.mjs` §B, no fixture

```json
"trigger": {
  "classAttr": "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover relative h-8 w-8",
  "rect":      { "w": 32, "h": 40 },
  "height":    "40px",
  "minHeight": "40px",
  "paddingBlock": "0px", "paddingInline": "0px"
}
```

`SearchFilterBar.vue:5` asks for `class="relative h-8 w-8"` — 32 × 32. **`w-8` wins. `h-8` loses to
glass-ui's `min-height: 40px`.** The rendered control is 32 wide and 40 tall: a 1.25 aspect ratio
where a circle was drawn.

### The consequence the author could not have predicted

`SearchFilterBar.vue:7-12` positions the count badge `absolute -right-1 -top-1` — offsets computed
against the 32×32 box the class list requested. Against the real 32×40 box the badge sits 4px higher
relative to the glyph than designed, on a capsule whose corner radius is that of a 40px pill rather
than a 32px circle. The design and the DOM disagree and nothing reports it.

### The same measurement independently confirms C-4

Read the `classAttr` again: `button tap-squish focus-ring glass-wash glass-capsule
glass-capsule-hover relative h-8 w-8`. `variant="ghost"` at `:5` contributed **no class**. Not a
wrong class — *no* class. A runtime confirmation of C-4 that needs neither the `.d.ts` nor a
compiler: the prop was accepted, ignored, and dropped. (My compile independently agrees — §2.1.)

### Cure

Both halves are edict-5 violations (per-instance override of a design-system root) and both should be
retired rather than made to win. **`icon-only` is a real glass-ui 7 `ButtonProps` member and is
already passed on the same line** — it is the design system's own expression of "a square icon
button". `h-8 w-8` is a second, contradictory statement of the same intent that the system then
half-honours. Delete `h-8 w-8`, keep `icon-only`; if 32px is genuinely wanted, that is a **`size`**
token request to glass-ui — relay §6.

---

## 1.6 MAJOR — C-27: the panel exceeds its own available height at plain desktop 1440×900, with zero tags and one filter. And the mobile trap re-confirms independently.

r3 proved C-15 on `devices["iPhone 14"]`. I reproduced it on a different day with a different probe,
and then found the same structural failure at the desktop viewport.

### Desktop — `probes/probe-C-r4-2.mjs` §E, 1440×900, **no fixture, zero tags**

State: one colour search applied, so the `v-if="activeFilterCount > 0"` Clear-all row at `:110-120`
is mounted. Nothing else.

```json
"postSearchGeometry": {
  "panel":              { "top": 381, "bottom": 902.3, "h": 521.3 },
  "viewportH":          900,
  "clearRow":           { "top": 836.7, "bottom": 873.2, "visible": true },
  "availableHeightVar": "519.3125px",
  "wrapperVar":         "519.3125px"
}
```

reka measures the space and publishes it: **`--reka-popper-available-height: 519.3125px`**. The panel
renders **521.3px**. It overflows the space its own positioner computed, and its bottom edge sits
2.3px past the viewport. Clear-all is (barely) reachable; the panel's border, radius and shadow are
clipped.

The magnitude is small. The mechanism is not: `max-height: none`, `overflow-y: visible`, no scroll
container, and a variable carrying the correct answer that nothing reads. **The desktop case is not
"fine" — it is the same defect at a viewport where it happens to cost 2px.** One tag section (`v-if`
at `:47`), a shorter window, a user font scale, or a browser chrome band converts 2.3px into the
mobile figure.

### Mobile — `probes/probe-C-r4-4.mjs` §B, chromium 390×664, no fixture

```json
"mobile": {
  "viewport":  { "w": 390, "h": 664 },
  "panel":     { "top": 297.3, "bottom": 756.7, "h": 459.4, "w": 240 },
  "maxHeight": "none",
  "overflowY": "visible",
  "availableHeight": "366.6856079101563px",
  "fieldBottom": 723.4,     "fieldBelowFold": true,
  "searchBtnBottom": 708.4, "searchBelowFold": true,
  "pxBelowFold": 92.7
},
"mobileSearchClickable": false,
"mobileSearchClickError": "TimeoutError: locator.click: Timeout 4000ms exceeded."
```

459.4px rendered into 366.7px available. **92.7px below the fold.** The swatch, the field and the
Search button are all off-device, and Playwright cannot click the button in four seconds because
there is nowhere to scroll it into view — the panel is not a scroll container and the page behind it
is not the panel.

I looked at `evidence-r4/C-r4-mobile-390.png`. The last legible thing at the fold is the section
label **FIND BY COLOR**. The section it labels is not on the phone.

Different engine, different probe, different session from r3 — same result. **C-15 is confirmed, and
it is not mobile-only.**

### Cure

`PopoverContent` needs a height contract, and it belongs in glass-ui, not here (relay §6):

```
max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto overscroll-contain
```

reka already publishes the variable on the wrapper — measured above at both viewports. glass-ui's own
Combobox family ships this exact idiom; `PopoverContent` does not.

---

## 1.7 MAJOR — C-28: `v-model="colorText"` is type-unsound, and `applyColorSearch` calls `.trim()` on the result without a guard.

### Measurement — my own `strictTemplates` compile (§2.1)

```
demo/palettes/browser/search/SearchFilterBar.vue(89,46): error TS2322:
    Type 'string | number' is not assignable to type 'string'.
```

Line 89 is `v-model="colorText"`. glass-ui 7's `Input` declares
`"update:modelValue": (value: string | number) => any` (`dist/components/input/Input.vue.d.ts`) and
`modelValue?: string | number` (`types.d.ts`). `colorText` is `ref("")` — inferred `Ref<string>`.

Then `SearchFilterBar.vue:217`:

```ts
const text = colorText.value.trim();
```

If a `number` ever reaches `colorText`, this is `TypeError: colorText.value.trim is not a function`
inside an `async` function whose `try` has **`finally` but no `catch`** (`:216-224`) — an unhandled
rejection, not a caught error.

**This is latent, not live, and I say so plainly.** `type="text"` is passed at `:90`; glass-ui's
`Input` forwards `type` to the native element (`Input-9BlLluik.js` — `type` is in the computed that
spreads onto the `<input>`); a text input's `value` is always a string. My 13-input sweep produced
`pageErrors: 0`. The defect is that nothing *prevents* the number branch: changing `type` to `"tel"`,
or binding `defaultValue` to a numeric literal, makes it live — and the compiler that would catch it
is switched off (§2.3).

---

## 1.8 MAJOR — C-29: "Find by Color" cannot see the commons. The emit shape carries no radius and no verb, and the sole consumer downgrades it to an in-memory filter over the page already on screen.

### The emit

`SearchFilterBar.vue:159` — `colorSearch: [L: number, a: number, b: number]`. Three positional
numbers. No radius. No indication of whether this is a *query* or a *filter*.

### What the consumer does with it — `BrowsePane.vue:336-355`

```ts
const colorSearchParams = ref<{ L: number; a: number; b: number } | null>(null);

const displayedBrowse = computed(() => {
    const palettes = pm.filteredBrowse.value;
    if (!colorSearchParams.value) return palettes;
    const { L, a, b } = colorSearchParams.value;
    const radius = 0.15;
    return palettes.filter((p: any) => {
        const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
    });
});

function onColorSearch(L: number, a: number, b: number) {
    colorSearchParams.value = { L, a, b };
    // Filter loaded palettes client-side by OKLab distance
    // (API also supports server-side via colorL/colorA/colorB params, but client-side is instant)
}
```

Three consequences, ascending:

1. **The radius is a magic literal in the consumer.** The component that owns the search UI cannot
   express tolerance; a second consumer would silently get a different one.
2. **Palettes without `oklabColors` are dropped, not skipped** (`return false`). A palette the user
   can see on the wall vanishes because of a denormalised field it has no control over.
3. **The search never leaves the browser.** The server route exists —
   `api/src/modules/palette/schema.ts:89-92` declares `colorL`, `colorA`, `colorB`, `colorRadius`,
   and `api/src/modules/palette/service/crud-list.ts:155-167` implements the matcher with the same
   `0.15` default. It is **unused**. The comment calls this a performance choice ("client-side is
   instant"), but the thing made instant is the wrong thing: `displayedBrowse` can only ever
   *subtract* from `pm.filteredBrowse`, which is one page.

Under a pane header reading **"Discover palettes from the community"** and a field reading **"Search
the commons…"** (`BrowsePane.vue:3, 16`), the colour filter can only remove cards already on screen.
A user who colour-searches an empty first page gets an empty result and has been told nothing false
in words and everything false in effect.

**Scope honesty.** The filter body is the consumer's code. What is the *subject's* defect is the emit
contract that makes the downgrade invisible: a three-number payload with no radius and no verb cannot
distinguish "filter what you have" from "ask the server", so nothing in the component's own surface
reveals which one it got.

**What I could not measure.** The dev API is CORS-blocked (§0), so the wall is empty
(`probeC-r4-1.json` → `wallBefore.cards: 0`, `wallAfter.cards: 0`; my in-page
`fetch("/colors/palettes?limit=20")` returned the SPA's `index.html`, not JSON). I cannot put a
number on how many real palettes carry non-empty `oklabColors`. Consequences 1 and 3 are proven from
source and from the unused route. **Consequence 2's blast radius is a hypothesis until the API is
reachable** and is labelled as one.

### Cure

Emit the query, not the coordinates:

```ts
colorSearch: [query: { L: number; a: number; b: number; radius: number }];
```

and have the consumer pass it to the store as server query params, which the API already accepts. The
client-side filter then becomes what it should be — an optimistic pre-filter while the round-trip
lands — rather than the whole feature.

---

## 1.9 MINOR / INFO — C-30, C-31, C-32: the small ones, all measured.

**C-30 — 41 accessible-name mutations per drag, on an element that is not focused.**
`probes/probe-C-r4-3.mjs` §F, MutationObserver on the swatch, 41 pointermoves:

```json
"churn": { "ariaLabelMutations": 41, "distinctNames": 41, "pointerMovesIssued": 41,
           "sample": ["…current color #020e19", "…current color #010b13", "…current color #00080e"] }
```

One `aria-label` DOM write per pointermove — the interpolation
`` `Open color picker, current color ${pickerHex}` `` (`:78`) recomputed and committed 41 times where
the design needs it once, at commit. **I checked whether this is an announcement storm and it is
not**: `probe-C-r4-6.mjs` §A measures `document.activeElement` *during* the drag and it is the
popover content `<div role="dialog">`, not the swatch (`focusDuringDrag`). The a11y cost is therefore
not chatter but a moving accessible name — unstable for name-based automation and for a virtual
cursor parked on the element. The perf cost is 41 attribute mutations plus 41 style recalcs for the
`backgroundColor` binding on the same node. Both vanish with §1.2's cure plus debouncing
`update:hex` to `pointerup`.

**C-31 — `border-2 border-border` restates a rule the design system already applies.**
glass-ui `dist/styles/utilities/components.css` contains
`:where(.shadow-cartoon-sm, .shadow-cartoon-md, .shadow-cartoon-lg) { border: 2px solid var(--border); }`.
`SearchFilterBar.vue:76` writes `shadow-cartoon-sm` **and** `border-2 border-border` on the same
element — a per-instance restatement of a design-system rule, i.e. edict 5. Delete the two utilities;
the border is already there.

**C-32 — the mini picker covers 45,487px² of the panel it belongs to.**
`probes/probe-C-r4-3.mjs` §G: outer panel `top 381 → bottom 849.3` (240 wide), mini `top 560 →
bottom 778.7` (208 × 218.7), overlap **45,487px²**, `fieldCovered: false`. `side="top" align="start"`
(`MiniColorPicker.vue:6`) inside a 240px-wide parent means the picker sits *on* the Sort and Tier
controls it shares a panel with. The field it feeds stays visible, which is the part that matters;
the rest of the filter UI does not. Recorded because it compounds §1.6 — on any viewport where the
panel is already taller than its space, `side="top"` has nowhere honest to go.

---

# 2. Independent re-verification of the standing claims

## 2.1 The `strictTemplates` compile — run by me, classified by me

```
$ npx vue-tsc -p docs/.../probes/tsconfig.strictTemplates-probe.json --noEmit \
    | grep -E "SearchFilterBar|MiniColorPicker"
```

Ten errors in the subject pair. The count is not the finding; the **classification** is:

| # | site | error | class |
|---|---|---|---|
| 1 | `SearchFilterBar.vue(5,25)` | `'variant' does not exist in type '{ emphasis?…iconOnly?…}'` | **LIVE — C-4.** Confirmed at runtime by the class list, §1.5 |
| 2 | `SearchFilterBar.vue(52,38)` | `'checked' does not exist in type '{ modelValue?: CheckedState \| null …}'` | **LIVE — C-1.** Tag checkbox bound to a prop glass-ui 7 does not have |
| 3 | `SearchFilterBar.vue(53,38)` | `''onUpdate:checked'' does not exist` | **LIVE — C-1.** `toggleTag` is unreachable |
| 4 | `SearchFilterBar.vue(89,46)` | `Type 'string \| number' is not assignable to type 'string'` | **LATENT — C-28, §1.7** |
| 5 | `SearchFilterBar.vue(112,29)` | `'variant' does not exist` (Clear-all Button) | **LIVE — C-4, second site** |
| 6 | `SearchFilterBar.vue(93,37)` | `''aria-label'' does not exist in type InputProps` | **FALSE POSITIVE.** Measured live: CDP reports the field's accessible name as `"Search by CSS color"`, `nameFrom: "attribute"`. glass-ui's `Input` spreads all non-`aria-invalid` attrs onto the native `<input>` (`field-control…js` → `forwardedAttrs`). **Declaration gap** |
| 7 | `SearchFilterBar.vue(95,38)` | `'onKeydown' does not exist in type InputProps` | **FALSE POSITIVE.** `@keydown.enter` demonstrably fires — it drove all 13 rows of §1.3. Declaration gap |
| 8 | `SearchFilterBar.vue(115,30)` | `'onClick' does not exist` (Clear-all) | **FALSE POSITIVE.** Clear-all fires — it reset the badge before each of the 13 rows. Declaration gap |
| 9–10 | `MiniColorPicker.vue(48,21)`, `(51,22)` | `'variant'`, `'onClick'` | one **LIVE** (C-4, third site), one declaration gap |

**This classification is the substance.** Turning `strictTemplates` on today yields ten errors of
which **four are real defects and three are glass-ui's failure to declare its native attribute
surface**. That ratio is why the flag is off — and the flag being off is how C-1 and C-4 shipped. The
unblocking move is a glass-ui change, not a demo change (§6).

Config used, authored by r3 and re-run by me:
`probes/tsconfig.strictTemplates-probe.json`. Repo-wide there is no `vueCompilerOptions` at all:
`grep -rn "strictTemplates\|vueCompilerOptions" tsconfig*.json` → no matches.

## 2.2 C-17 — confirmed, but not by the instrument r3 used, and not by mine either

r3 proved `hover:shadow-cartoon-md` generates no rule via a CSSOM scan. **I ran the same scan and it
returned `[]` for rules that provably exist** (`probeC-r4-3.json` → `cssom`: `p0Rules: []`,
`pxOverlay: []`, `h8: []` — while the panel's *measured* padding is `20.352px 16px`, which **is**
`px-(--overlay-pad-inline)`). My `cssRules` walk is silently failing on the Vite-served sheets. **A
CSSOM scan cannot prove this negative and neither seat should have relied on one.** See §4.8.

The proof is in glass-ui's **source**, `dist/styles/utilities/components.css`:

```css
@layer components {
  :where(.shadow-cartoon-sm, .shadow-cartoon-md, .shadow-cartoon-lg) { border: 2px solid var(--border); }
  .shadow-cartoon-sm { box-shadow: var(--shadow-cartoon-sm); translate: 0 -1px; }
  .shadow-cartoon-md { box-shadow: var(--shadow-cartoon-md); translate: 0 -1px; }
}
@utility shadow-cartoon       { box-shadow: var(--shadow-cartoon); }
@utility shadow-cartoon-hover { box-shadow: var(--shadow-cartoon-hover); }
@utility shadow-soft          { box-shadow: var(--shadow-soft); }
```

`shadow-cartoon-sm/md/lg` are **hand-authored classes in `@layer components`**. `shadow-cartoon`,
`shadow-cartoon-hover` and `shadow-soft` are **`@utility` declarations**. Tailwind v4 generates
variants (`hover:`, `focus-visible:`, `dark:`) only for utilities it knows. `hover:shadow-cartoon-md`
therefore matches nothing — proven from the same file that defines the class the author reached for.

Behavioural confirmation, `probeC-r4-3.json` → `swatchHover`:

```json
"restShadow":  { "shadow": "oklab(0.28 …/0.32) -2px 2px 0px 0px, … -3px 3px …, … -4px 4px …",
                 "transition": "box-shadow" },
"hoverShadow":          "oklab(0.28 …/0.32) -2px 2px 0px 0px, … -3px 3px …, … -4px 4px …",
"identical": true
```

Byte-identical. `transition-shadow` at `:76` transitions nothing.

**And the cure is one token away.** `@utility shadow-cartoon-hover` exists and *does* accept variants:
`hover:shadow-cartoon-hover` would work. The author wrote the one name in the family that cannot.

## 2.3 Test truth — the vacuous gate, re-counted

```
$ find test e2e -name "*.test.ts" -o -name "*.spec.ts" | wc -l
      94
$ grep -rl "SearchFilterBar" test/ e2e/ | wc -l
       0
$ grep -rn "strictTemplates\|vueCompilerOptions" tsconfig*.json
(no matches)
```

94 spec files. Zero reference the subject, its child, or its route's filter panel. The certified
visual gate never opens the popover: `audit/visual/REPORT.json`, `/#/browse`, all four matrices —
`"counts": { …, "dialog": 0, … }`.

**Name the mutation that would keep the suite green.** There is no single one to name, because
*every* mutation does. Delete the file's entire `<script setup>` and the 94 specs still pass; the
demo typecheck still passes (all four live type errors sit behind the unset `strictTemplates`); the
visual gate still passes because it never clicks the ⋮. **This is the maximal vacuous gate: the
subject has no gate at all, and three separate green signals assert that it does.**

The four cheapest tests that would have caught four blockers:

| test | catches |
|---|---|
| mount, `fill("#fff")`, `Enter`, assert emitted `colorSearch` ≈ oklab(white) | C-2 / §1.3 |
| mount, set `colorText`, emit `update:hex` from the child, assert `colorText` unchanged | C-24 / §1.2 |
| mount child, `pointerdown` → `pointercancel` → `pointermove`, assert no `update:hex` | C-23 / §1.1 |
| open the popover at 390×664, assert the Search button is inside the viewport | C-15 / §1.6 |

## 2.4 A11y — the CDP accessible-name walk

`probeC-r4-2.json` → `namesViaCDP` and `ariaSnapshot`. What is **correct** (see §4.3):

```
radio "Newest"       nameFrom: relatedElement      radio "All"      nameFrom: relatedElement
radio "Most Popular" nameFrom: relatedElement      radio "Featured" nameFrom: relatedElement
radio "Most Forked"  nameFrom: relatedElement
button  "Open color picker, current color #4488cc"  nameFrom: attribute
textbox "Search by CSS color"                       nameFrom: attribute
button  "Search"                                    nameFrom: contents
```

What is **wrong**, confirming r2's C-8 on a second instrument:

- **both `radiogroup`s have `name: ""`** — `- radiogroup:` twice in the aria snapshot. The visible
  "Sort" and "Tier" labels (`:20`, `:32`) are plain `<div class="section-label">` with no
  `aria-labelledby` from the group. A screen-reader user hears "radio group, Newest, selected" with
  no statement of *what* is being sorted or tiered.
- **the trigger's name omits the badge** — `triggerAria: "Filters"` while the badge reads `1`
  (`probeC-r4-1.json` → `wallAfter.badge: "1"`). The only signal that filters are active is visual.
- **no `aria-live` anywhere.** A search's result is a silent change to a card grid in another
  component.
- **the hand-written `<button>` has `type: "submit"`** (`probeC-r4-1.json` → `freshOpen.buttons[6]`)
  while all six reka/glass-ui siblings carry `type="button"`. Inert today (content is portalled to
  `document.body`, no form ancestor) and latent for exactly as long as that stays true.

Tab order is sound (`probeC-r4-2.json` → `tabWalk`): field → Search → Clear all → sort radio → tier
radio → swatch → field — a correct roving-tabindex trap that wraps. Focus is restored to the ⋮
trigger after the Escape ladder (`probeC-r4-1.json` → `focusAfterEscapes`: `BUTTON` / `"Filters"`).

---

# 3. Edict ledger

| # | edict | verdict | evidence |
|---|---|---|---|
| 1 | No god modules | **PASS** | 249 lines, one job, one child; the `.filter-section`/`.filter-option` pair is the only local abstraction and it is used 7× |
| 2 | **No legacy / no masking fallbacks** | **FAIL — BLOCKER** | `:218` turns unparseable input into a search of a different colour and reports success, 11 times in 13 (§1.3). The parser that makes the fallback unnecessary is imported at `:145` |
| 3 | KISS, no contrivance | **PASS with one note** | No new dirs, no wrappers. Note: `colorSearchActive` (`:171`) duplicates state the parent owns as `colorSearchParams`, and the two cannot be reconciled — r2's C-11, still live |
| 4 | glass-ui is the design system | **FAIL** | `variant="ghost"` (3 sites across the pair) speaks shadcn-vue at a glass-ui 7 component and is dropped (§1.5, §2.1). The bespoke `<button>` at `:97-104` re-implements a Button glass-ui ships. `MiniColorPicker` re-implements `SpectrumCanvas` (§1.1) |
| 5 | **Root-level styling** | **FAIL — 4 sites** | `p-0` inert on the panel (C-16); `h-8` inert on the trigger (§1.5); `pr-16` reserving 44% of a field for a button (§1.4); `border-2 border-border` restating `:where(.shadow-cartoon-*)`'s own rule (C-31) |
| 6 | Animations never deleted | **PASS, vacuously** | `transition-shadow` (`:76`) and `transition-colors duration-fast` (`:99`) are both present. The first animates nothing (§2.2) — that is C-17, not an edict-6 breach; nothing was removed |
| 7 | Idiomatic Vue 3.5 | **MIXED** | Reactive props destructure at `:147` — correct, and correctly *not* carried across a reactive boundary. But: `$emit` in the template (`:21`, `:33`) alongside a typed `emit` in the script (r2's C-14); `MiniColorPicker` uses `useTemplateRef` correctly while hand-rolling pointer state `@vueuse/core` already solves (§1.1). The `defineModel` hazard is **absent** (§4.1) |
| 8 | `verbatimModuleSyntax` | **PASS** | `import type { Tag }` at `:144` is the only type-only import and it is correct; `import { ref, computed }` are value imports. Verified across `MiniColorPicker.vue` too |

---

# 4. Negative proof — nine hypotheses I formed, probed, and killed

The brief names specific hazards. Most are not here, and a seat that cannot say so is not auditing,
it is confirming. Each row is a claim I was prepared to file and then could not.

**4.1 — `defineModel()` stale-read hazard: ABSENT.**
`grep -nE "defineModel" SearchFilterBar.vue MiniColorPicker.vue` → no matches. Both use `defineProps`
+ `defineEmits`. `colorText`, `pickerHex`, `miniPickerOpen`, `searching` and `colorSearchActive` are
local `ref`s — synchronous by construction. The repo's `shallowRef` cure is not needed and correctly
not applied.

**4.2 — ungated `requestAnimationFrame` (the PRM-RAF epidemic): ABSENT.**
`grep -nE "requestAnimationFrame|setTimeout|setInterval|addEventListener|IntersectionObserver|ResizeObserver|MutationObserver|onUnmounted|onBeforeUnmount"`
over both files → **no matches at all**. No loop, no timer, no manually-registered listener — nothing
to leak, nothing to gate on `prefers-reduced-motion`. The subject has **zero cleanup surface**, which
is the right amount. (This is also why C-23 is a *state* bug, not a *leak* bug: the flag is a plain
`let`, and it dies with the component.)

**4.3 — "the `<label>` rows are decorative; only the tiny control is clickable": FALSE.**
I expected this: `.filter-option` is a `<label>` wrapping a reka `<button role="radio">`, and buttons
are famously named from content, not from `<label>`. Both halves of my hypothesis were wrong.
*Naming*: CDP reports `nameFrom: "relatedElement"` for all five radios (§2.4). *Activation*:
`probeC-r4-1.json` → `labelActivation` clicks the **word** "Most Popular" at (568.7, 514.4) and
`aria-checked` moves `["true","false","false",…]` → `["false","true","false",…]`. The whole 31px row
is live. **This is a correctly built control.**

**4.4 — `RadioGroupItem value=""` never checks, because reka treats `""` as unset: FALSE.**
`probeC-r4-1.json` → `freshOpen.buttons[3]`: `{ role: "radio", checked: "true", state: "checked" }`,
named "All". The empty-string tier default round-trips correctly.

**4.5 — the nested Popover breaks the outer one: FALSE, and the Escape ladder is correct.**
`probeC-r4-1.json`: clicking the swatch gives `{ dialogCount: 2, outerPresent: true, miniPresent:
true }` — the outer layer survives. First `Escape` → `{ outer: true, mini: false }`; second → `{
count: 0 }`; `focusAfterEscapes` → `BUTTON` / `"Filters"`. reka's dismissable-layer stack is used
correctly and focus returns to the invoker.

**4.6 — `miniPickerOpen` leaks across an outer close: FALSE.**
`probeC-r4-2.json` → `afterOutsideClick1/2` then `leakOnReopen`: after both layers dismiss, reopening
the filter panel gives `{ outer: true, miniStillOpen: false }`. The child's `:open`/`@update:open`
pair round-trips and the unmount does not strand the flag.

**4.7 — the live `parseCssColor` crash class reaches this component: NO.**
Thirteen inputs including `#gggggg`, `NaN`, `#00000` and `oklch(0.7 0.1 30)` — the exact family of
the repo's recorded `oklch()` shipping crash — produced `"pageErrors": []` in every probe. The reason
is unflattering rather than reassuring: §1.3's regex means the parser is **never called** on user
input, so the crash class cannot be reached from here. **Curing §1.3 puts this component on the crash
path**, and the cure must therefore land with `tryParse`-shaped error handling, not a bare call.

**4.8 — "no `.shadow-cartoon-md` rule exists in any stylesheet": UNPROVEN BY MY OWN INSTRUMENT, and I nearly shipped it.**
My CSSOM walk (`probeC-r4-3.json` → `cssom`) returned `cartoonRules: []`, `hoverCartoon: []` — which
reads as a clean proof of C-17. It is not. The same walk returned `p0Rules: []`, `pxOverlay: []` and
`h8: []`, while the panel's *measured* padding is `20.352px 16px` and the trigger's *measured* width
is 32px — rules that demonstrably exist and demonstrably apply. My `sheet.cssRules` access is
silently failing for the Vite-served sheets and my `catch { continue; }` swallowed it. The finding
survives on the two instruments that do not lie (glass-ui source, §2.2; measured rest-vs-hover
box-shadow identity) — but **the CSSOM figure is retracted as evidence for anything**, including the
parts of it that agreed with me.

**4.9 — `overflow: clip` on the field breaks caret scrolling: FALSE.**
`probeC-r4-4.json` → `fieldOverflow`: with a 34-char value, `scrollWidth 381`, `clientWidth 146`;
`End` gives `scrollLeft: 234`, `Home` gives `scrollLeft: 0`. The caret reaches both ends. `truncate`
on this input buys a hard right-edge cut and nothing else — that is §1.4's mechanism, not a separate
defect.

---

# 5. Defect ledger

| id | sev | defect | reproduction | origin |
|---|---|---|---|---|
| **C-23** | **BLOCKER** | After `pointercancel`, `canvasDragging`/`hueDragging` latch `true`; plain hover then drives the colour (`#9badbb` → `#000509`), with a clean-`pointerup` control showing `changed: false`. Propagates through `update:hex` into `colorText`/`pickerHex`, so the *searched* colour changes on hover. No `pointercancel`/`lostpointercapture` handler exists — while `SpectrumCanvas.vue:18-19` in the same tree handles both. | `probeC-r4-6.json` `stuckDrag` + `control`, real CDP touch | **NEW (r4)** |
| **C-24** | **BLOCKER** | `onPickerHexUpdate` writes `colorText` unconditionally on every `update:hex`, which the child emits per reactive tick. Typed `rebeccapurple` → one drag → field reads `#081f33`. No history, no cancel. | `probeC-r4-2.json` `clobber` | **NEW (r4)** |
| C-2 / **§1.3** | **BLOCKER** | 13-input domain table: 13/13 report success, 2/13 honest, 0/13 report failure. `#fff`, `#ff0000ff`, `rebeccapurple`, `hsl()`, `oklch()`, `rgb()`, `#gggggg`, `NaN`, `#00000` and the empty string all search `pickerHex`. Edict-2 masking fallback over a parser the file already imports. | `probeC-r4-2.json` `inputDomain` | r2, **closed by enumeration (r4)** |
| C-15 / C-3 | **BLOCKER** | 390×664: panel 459.4px into 366.7px available, `max-height:none`, `overflow-y:visible`, 92.7px below the fold, Search button unclickable (4s timeout). | `probeC-r4-4.json` `mobile`; `C-r4-mobile-390.png` | r3, **re-confirmed independently (r4)** |
| C-1 | **BLOCKER** | Tag checkboxes bound to `:checked`/`@update:checked`; glass-ui 7 exposes `modelValue`/`update:modelValue`. `toggleTag` unreachable; the row still announces `aria-checked`. | my `strictTemplates` run — `TS2353` ×2 at `:52,:53` | r2, **re-verified (r4)** |
| **C-25** | MAJOR | Placeholder `#hex, hsl(...)` measures 123.9px into a 66px content box (188%); renders as `#hex, h` under the Search pill. `pr-16` reserves 64px — 44% of the field — for a 52.6px button. The advertised `hsl(...)` is one of the 11 silently discarded formats. | `probeC-r4-5.json`; `C-r4-field-placeholder.png` | **NEW (r4)** |
| **C-26** | MAJOR | `class="relative h-8 w-8"`: `w-8` wins, `h-8` loses to glass-ui `min-height:40px` → 32×40, not 32×32; the badge's `-right-1 -top-1` anchors to a box that does not exist. The same class list contains **no** variant class, independently proving C-4. | `probeC-r4-3.json` `trigger` | **NEW (r4)** |
| **C-27** | MAJOR | 1440×900, zero tags, one filter: panel 521.3px vs `--reka-popper-available-height: 519.3125px`; bottom 902.3 vs viewport 900. The height defect is not mobile-only. | `probeC-r4-2.json` `postSearchGeometry` | **NEW (r4)** |
| **C-28** | MAJOR | `v-model="colorText"` binds `Ref<string>` to an emit typed `string \| number` (`TS2322` at `:89`); `:217` then calls `.trim()` in an `async` `try` with `finally` but no `catch`. Latent unhandled rejection. | my `strictTemplates` run | **NEW (r4)** |
| **C-29** | MAJOR | `colorSearch: [L, a, b]` carries no radius and no verb; the sole consumer filters the already-fetched page in memory (`BrowsePane.vue:340-355`), drops palettes lacking `oklabColors`, hardcodes `radius = 0.15` — while the server route (`schema.ts:89-92`, `crud-list.ts:155-167`) goes unused. "Search the commons" cannot leave the browser. | source + api contract; wall count unmeasurable (CORS, §0) | **NEW (r4)** |
| C-16 | MAJOR | `p-0` inert on `PopoverContent` (`padding: 20.352px 16px` measured) while `w-60` in the same class string wins. | `probeC-r4-3.json` `panelPad` | r3, re-measured |
| C-17 | MAJOR | `hover:shadow-cartoon-md` generates no rule — `.shadow-cartoon-md` is `@layer components`, not `@utility`, in glass-ui's own `components.css`, which declares `@utility shadow-cartoon-hover` three lines later. Rest and hover box-shadow byte-identical. | glass-ui source + `probeC-r4-3.json` `swatchHover` | r3, **re-proven on a sound instrument (r4)** |
| C-4 | MAJOR | `variant` is not a glass-ui 7 `ButtonProps` member; 3 sites across the subject pair; the rendered class list contains no variant class at all. | `TS2353` ×3 + `probeC-r4-3.json` `trigger.classAttr` | r2, **re-verified twice (r4)** |
| C-5 | MAJOR | `applyColorSearch` is `async` with no `await`; `searching` is never observable, so the spinner, `:disabled` and the reentrancy guard at `:214` are all dead. | r2 (5 clicks / 43ms, spinner never present) | r2 |
| C-6 | MAJOR | Clear-all unmounts itself under focus (`v-if="activeFilterCount > 0"` wraps its own trigger) → focus to `<body>`, panel dismisses. | r2 | r2 |
| C-7 | MAJOR | **94** spec files, **0** references; visual gate `"dialog": 0` ×4; `strictTemplates` unset, hiding 4 live type errors. Every mutation keeps the suite green. | §2.3 | r2, **re-counted + 4 named tests (r4)** |
| C-18 | MAJOR | Colour filter has no undo; `Enter` on an empty field performs a search (row 1 of §1.3); the only exit is the self-unmounting Clear-all. | r3 + `inputDomain` | r3, extended |
| C-19 | MAJOR | After a valid-hex search the swatch and its `aria-label` name a different colour than the applied filter. | r3 | r3 |
| **C-30** | MINOR | 41 `aria-label` DOM mutations / 41 distinct accessible names per 41-pointermove drag. **Not** an announcement storm — `activeElement` during the drag is the popover `<div role="dialog">`, measured. Cost is a moving accessible name plus 41 needless style recalcs. | `probeC-r4-3.json` `churn`; `probeC-r4-6.json` `focusDuringDrag` | **NEW (r4)** |
| **C-31** | MINOR | `border-2 border-border` at `:76` restates `:where(.shadow-cartoon-sm,…) { border: 2px solid var(--border) }` from glass-ui's own components layer — edict-5 per-instance restatement. | glass-ui `components.css` | **NEW (r4)** |
| C-8 | MINOR | Both `radiogroup`s nameless (`name: ""` ×2 via CDP); badge count absent from the trigger's name (`"Filters"` vs badge `1`); no `aria-live`; no headings. | §2.4 | r2, **re-verified on CDP (r4)** |
| C-20 | MINOR | The one hand-written `<button>` is `type: "submit"`; all six siblings are `type="button"`. Inert (portalled, no form ancestor), latent. | `probeC-r4-1.json` `freshOpen.buttons[6]` | r3, re-measured |
| C-21 | MINOR | Latent nameless button — `Loader2`-only content, no accessible name, while `searching`. Unreachable **only** because C-5 is broken; curing C-5 alone ships a nameless button. | source `:97-104` | r3 |
| C-22 | INFO | Search button 52.6 × **24.0**px — exactly the WCAG 2.5.8 floor, inside the field's own lane. | `probeC-r4-1.json` `freshOpen.buttons[6]` | r3, re-measured |
| **C-32** | INFO | Mini picker overlaps its own parent panel by **45,487px²** (`side="top" align="start"`, 208×218.7 over a 240px panel); the field it feeds stays visible, the Sort/Tier controls do not. | `probeC-r4-3.json` `overlap` | **NEW (r4)** |
| C-9…C-14 | INFO | 16px Checkbox vs 44px RadioGroupItem in a 31px row; `colorSearchActive` duplicates parent state; double clear emit; no idempotence; `hexToOklab` misnamed with an unreachable `throw`; inert wrapper `<div>`; mixed `$emit`/`emit` idiom. | r2 | r2, carried |

**Totals: 5 BLOCKER · 12 MAJOR · 6 MINOR · 3+ INFO. Nine defects are new in r4; four of the nine are
reproduced with no fixture whatsoever.**

---

## Strongest defect

**C-23 — the stuck drag.**

C-15 costs the most (on a phone the feature is not on the device). C-2 / §1.3 is the most
embarrassing (a component that imports a total CSS parser, guards it with a six-digit-hex regex, and
gets the wrong answer 11 times in 13). But C-23 is the strongest **defect**, on three grounds:

1. **It breaks the causal contract of a pointer UI.** Every other defect here produces a wrong answer
   to something the user *did*. C-23 produces a wrong answer to something the user did **not** do:
   after a cancelled gesture, moving the mouse across the canvas with no button held rewrote the
   colour from `#9badbb` to `#000509` and — through `update:hex` → `onPickerHexUpdate` — rewrote the
   text in the search field and the value the next `Search` press will send. A control that responds
   to hover as though it were a drag is not a control.

2. **It has a control, and the control is clean.** `dragStuckAfterCancel: true` against
   `control.changed: false`: same eleven moves, same canvas, same session. There is no alternative
   explanation to argue about. That is the difference between a finding and a suspicion, and it is
   why this outranks the geometry findings whose severity depends on a viewport.

3. **The cure is in this tree, in the same widget, and was removed on the way past.**
   `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue` is an SV spectrum canvas that calls
   `setPointerCapture` at `:148` and handles `@pointercancel` (`:18`) and `@lostpointercapture`
   (`:19`) — written for exactly this failure on iOS Safari. `MiniColorPicker` is a second, hand-rolled
   implementation of that widget with the recovery absent. Four other sites in `demo/` handle
   `pointercancel` too. This is not an oversight in a line; it is the absence of the mechanism by
   which this codebase remembers things — and §2.3 names that mechanism precisely: 94 spec files,
   zero of which touch this surface, and three green gates that assert otherwise.

The three facts compound. The reason a hover can change the searched colour is C-23. The reason the
changed colour then eats the user's typed query is C-24. The reason the user cannot tell which colour
was actually searched is §1.3 and C-19. The reason none of it was caught is §2.3. **Fix the height
contract (C-15) and six other defects become visible to the naked eye on the first open; fix the test
surface (C-7) and none of them can be re-introduced.**

---

# 6. Relay obligations created by this report

Per the standing BH/BI edict, five items are glass-ui-level and must reach the active glass-ui inbox
rather than being patched in `demo/`. Items 1, 2 and 4 restate r3's relay with new evidence; 3 and 5
are new.

1. **`PopoverContent` has no height contract** (C-15 / C-27) — add
   `max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto
   overscroll-contain` to the root class list. reka publishes the variable correctly at both
   viewports I measured (`519.3125px` at 1440×900, `366.686px` at 390×664); nothing reads it. The
   Combobox family already ships this idiom.
2. **`PopoverContent` padding is not overridable by consumers** (C-16) — `p-0` loses to
   `px-(--overlay-pad-inline)`/`py-(--overlay-pad-block)` while `w-60` beats `w-72` in the same class
   string. Either expose `pad="none"` or document that the pad is fixed; the current asymmetry teaches
   consumers to write code that silently does nothing.
3. **`Button`'s `min-height` beats consumer `h-*`** (C-26, NEW) — `h-8` on an `icon-only` Button
   yields 32×40. Either honour the utility or expose the size as a token. Today `icon-only` and
   `h-8 w-8` are two statements of one intent and the system honours half of each.
4. **Hand-authored utilities carry no variants** (C-17) — `.shadow-cartoon-sm/md/lg` are
   `@layer components` classes while `shadow-cartoon`, `shadow-cartoon-hover` and `shadow-soft` in the
   *same file* are `@utility`. `hover:shadow-cartoon-md` therefore produces no rule while
   `hover:shadow-cartoon-hover` would. Promote the family to `@utility`, or ship the variants. Ship
   the note with C-31: `:where(.shadow-cartoon-*)` already sets the 2px border, so consumers adding
   `border-2 border-border` are duplicating the system.
5. **7.0.0 declares no native attribute or emit surface** (C-4, C-28, C-7, NEW detail) — my
   `strictTemplates` run over this component pair produced ten errors of which **three are glass-ui
   declaration gaps**: `aria-label` and `onKeydown` on `Input`, `onClick` on `Button` — all three
   measured working at runtime. Until `InputProps`/`ButtonProps` extend their native attr/emit types,
   any consumer turning `strictTemplates: true` on drowns real defects (`variant`, `checked`) in
   false positives — which is precisely why the flag is still off and precisely how C-1 and C-4
   shipped. In the same note: `Input`'s `update:modelValue` typed `string | number` regardless of
   `type` (C-28); `Checkbox`'s 16px control against `RadioGroupItem`'s 44px in the same 31px row; and
   `ButtonProps` declaring `type` while defaulting it nowhere (reka supplies `type="button"`;
   glass-ui does not).

---

## Provenance

| | |
|---|---|
| Report | `docs/tranches/V/megatranche/audit/components/SearchFilterBar/challenge-C-implementation.md` |
| Probes | `probes/probe-C-r4-{1,2,3,4,5,6}.mjs` — chromium, playwright, **no fixtures, no route interception** |
| Evidence | `evidence-r4/probeC-r4-{1,2,3,4,5,6}.json` |
| Images | `evidence-r4/C-r4-mobile-390.png`, `C-r4-field-placeholder.png`, `C-r4-nested-open.png`, `C-r4-mini-over-panel.png`, `C-r4-post-search-panel.png`, `C-r4-field-overflow-desktop.png`, `C-r4-after-search.png` |
| Superseded | `challenge-C-implementation-r2-32b4040e.md`, `challenge-C-implementation-r3-f36f780c.md` — both preserved verbatim |
| Source edits | **none.** This seat wrote only under `docs/tranches/V/megatranche/audit/components/SearchFilterBar/`. |
