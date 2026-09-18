# CHALLENGE-C — `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (1M-context variant), as
declared in this seat's system prompt. The declaration is explicit and present — this is not an
undeclared or inherited seat. I cannot independently attest the served weights from inside the
harness; what I can attest is that the declaration was made, names Opus 5, and matches the tier
this seat was commissioned at (M-12 tri-fold: Opus solo for mechanical/challenge work).

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- Working HEAD at report time: `e79fcd43` (the seat brief cites `c654824e`; the tree moved forward
  one docs commit during the mega-tranche run — `git log --oneline -1` → `e79fcd43 docs(V·mega):
  core band COMPLETE 21/21 validated`). No source file in scope differs.
- **No source edits made.** Everything written by this seat lives under
  `docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/`.

---

## Verdict

**DEFECTIVE.** Seventeen findings; **six MAJOR, all with live reproductions**. The premise held.

The single most load-bearing correction before anything else: **this component has no canvas.**
Measured — `document.querySelector(".spectrum-picker").querySelectorAll("canvas").length` → **0**
(probe1). It is a `<div>` with two stacked CSS gradients (`useSpectrumPlateStyle.ts:36-39`). The
seat brief's prime suspects ("per-frame redraw cost, devicePixelRatio handling") therefore have no
referent, and the ungated-rAF epidemic is **absent here** — the one `requestAnimationFrame`
(`SpectrumCanvas.vue:100`) is a single-shot coalescer, cancelled at `:196` and `:219-222`. Those
three suspicions are cleared with positive evidence below (§ Negative proof).

The real defects are elsewhere and they are worse: the plate has **no pointer-identity discipline
and no button discipline** (a second finger, or a right-click, drives it), its **documented
dot-persistence invariant is false** (measured: it survives 300 ms then the URL echo wipes it),
it **writes picks blindly through the selected colour space** (in Kelvin the bottom 60 % of the
plate collapses to a single value, measured), its **dot border is hue-blind and hits 1.07:1
contrast** on yellow, it is **completely keyboard-inoperable while announcing itself as an image**,
and the only spec that touches it would stay green through an inverted axis.

---

## Evidence index

Every probe script and capture is committed beside this report:

| Artifact | What it proves |
| --- | --- |
| `probe/probe1.mjs` | static DOM/a11y facts (role, tabIndex, canvas count, rect) |
| `probe/probe3.mjs` | in-page drag frame budget, idle control, Kelvin via the real Select |
| `probe/probe4.mjs` | synchronous per-pointerdown cost, default vs Kelvin |
| `probe/probe5.mjs` | dot-persistence trail, multi-pointer steer, Kelvin snap-back |
| `probe/probe6.mjs` | right-button pick, stuck-drag hover paint, Kelvin bottom-half collapse |
| `probe/probe7.mjs` | live dot-border colour at hue 60 vs hue 240 |
| `probe/probe8.mjs` | `none`-channel deep links, 40-Tab sweep, arrow keys |
| `probe/probe9.mjs` | spectrum-drag vs L-slider-drag frame budget, same session |
| `probe/kbench.ts`, `probe/kmap.ts` | `xyzToKelvin` cost + the (s,v)→K degeneracy table |
| `probe/luma.mjs` | exact plate composite vs `spectrumLuma`, WCAG 1.4.11 contrast |
| `probe/*.png` | rendered captures (yellow/blue corner dot, Kelvin plate) |

All browser probes ran against the LIVE dev server at `http://localhost:9000/` (`curl -o /dev/null
-w "%{http_code}"` → `200`) with headless Chromium via the repo's own Playwright 1.60.0. The
Chrome DevTools MCP and Playwright MCP browsers were both already claimed by concurrent seats
("Browser is already in use for …"), so I drove Playwright directly — same engine, same input
plumbing, and it let me run the probes to a file rather than burning context on snapshots.

---

## MAJOR findings

### C-1 — MAJOR · CONFIRMED · no `pointerId` guard: a foreign pointer steers *and* kills the drag

**Where.** `SpectrumCanvas.vue:159-166` (`handleSpectrumMove`), `:177-180` (`handleSpectrumUp`),
`:182-185` (`handleSpectrumCancel`).

```ts
const handleSpectrumMove = (event: PointerEvent) => {
    if (isDragging.value) {          // ← the ONLY predicate
        scheduleSpectrumUpdate(event);
    }
```

`capturedPointerId` is tracked (`:78`, `:149`) and used for exactly one thing — `releasePointerCapture`
(`:84`). It is never compared against `event.pointerId` on move, up, or cancel. `isDragging` is a
single boolean for a surface that is explicitly a **multi-touch mobile control** (it carries the
`touch-gate-target` class and a `useTouchGate`).

**Reproduction** (`probe/probe5.mjs`, section P2 — pointer 1 presses top-left, pointer 2 merely
*moves* across the plate, pointer 2 lifts, pointer 1 keeps moving):

```
P2 multi-pointer: {"afterP1":{"left":"10%","top":"10%"},
                   "afterP2Move":{"left":"90%","top":"90%"},
                   "afterP1Continues":{"left":"90%","top":"90%"}}
```

Two distinct defects in one sequence:

1. **A pointer that never pressed on the plate steers the colour.** Pointer 2's `pointermove`
   moved the pick from (10 %, 10 %) to (90 %, 90 %).
2. **A foreign pointer's release terminates the primary drag.** After pointer 2's `pointerup`,
   `stopDragging()` (`:187-200`) ran; pointer 1's subsequent move to (50 %, 50 %) was ignored —
   the dot stayed at 90 %/90 %. On a phone this is: *rest your thumb on the plate while picking
   with your index finger, and the picker dies under your finger until you lift and re-press.*

**Proposed cure (transposition, not patch).** Replace the `isDragging: boolean` + two loose
`capturedPointerId`/`capturedElement` module locals with **one** `activePointer: { id: number; el:
HTMLElement } | null`. Every handler opens with `if (activePointer?.id !== event.pointerId) return;`.
`isDragging` becomes `activePointer !== null` and disappears as separate state. This is a
three-variable → one-variable collapse; it makes the bug unrepresentable rather than guarded.

---

### C-2 — MAJOR · CONFIRMED · no button discipline: right-click picks a colour; a swallowed `pointerup` turns the plate into a hover-paints surface

**Where.** `SpectrumCanvas.vue:132-157` (`handleSpectrumDown`) — no `event.button`, no
`event.isPrimary`, no `event.buttons` check anywhere in the file:

```
$ grep -n "event.button\|isPrimary\|\.buttons" demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue
(no output)
```

**Reproduction A — real right mouse button** (`probe/probe6.mjs`, `page.mouse.down({ button: "right" })`):

```
A0 before:                                Color spectrum, saturation 63%, lightness 100%
A1 after right-press at 15%/85%:          Color spectrum, saturation 15%, lightness 85%
```

A right-press — the gesture a user makes to reach "Inspect element" or "Save image as" — **destroys
the user's colour** and takes a pointer capture (`:148`).

**Reproduction B — the `pointerup` swallow** (`probe/probe6.mjs`, section A′; right-press with the
`pointerup` withheld, as a context menu that is dismissed elsewhere does, then two *buttonless*
hovers):

```
A' stuck-drag: {"afterRightPress":"…saturation 20%, lightness 80%",
                "afterHover1":   "…saturation 80%, lightness 20%",
                "afterHover2":   "…saturation 35%, lightness 40%"}
```

`isDragging` stays `true` and **every mouse movement over the plate with no button held rewrites
the colour**. There is no `event.buttons === 0` self-heal anywhere; recovery depends entirely on a
`pointerup`/`pointercancel`/`lostpointercapture` arriving, which is precisely the class of event
this repo already knows gets lost (the reka-ui pointer-capture-leak record, and the whole
`usePointerDebug.forceReleaseAllPointers()` brute-force recovery walker at
`usePointerDebug.ts:112+`, whose selector list *begins* with `.spectrum-picker`). The existence of
that recovery walker is itself an admission that this surface leaks captures.

**Proposed cure.** `handleSpectrumDown` opens with `if (!event.isPrimary || event.button !== 0)
return;`. `handleSpectrumMove` opens with `if (event.buttons === 0) { stopDragging(); return; }` —
the standing self-heal, so no lost-event class can leave the plate live. Both are one line, but
the point is the *rule*: the plate accepts exactly one primary left-button pointer and re-checks
its own liveness on every move.

---

### C-3 — MAJOR · CONFIRMED · the documented dot-persistence invariant is false — the URL echo wipes the raw coords 300 ms after release

**Where.** `SpectrumCanvas.vue:58-75`. The comment states the contract:

```ts
// Raw spectrum coords to avoid HSV roundtrip jitter.
// Persists after mouseup so the dot stays where the user placed it.
// Cleared when color changes from a non-spectrum source (slider, input, space change).
```

The mechanism is a single boolean sentinel consumed by one watch:

```ts
watch(() => model.value.color, () => {
    if (spectrumIsSource) { spectrumIsSource = false; return; }
    rawS.value = null; rawV.value = null;
});
```

`useColorUrl.ts:51-64` debounces a model→URL write at **300 ms**; `useColorUrl.ts:72-74` watches
`route.query.color` and calls `applyUrlToModel()`, which calls `updateModel(...)` with **no guard
against its own echo** (the `syncGen` counter guards the *other* direction only). That echo is an
external-origin write. The sentinel is already spent. The raw coords are wiped.

**Reproduction** (`probe/probe5.mjs`, section P3 — one pick at s = 20 %, v = 80 %, then sample the
dot's inline style every 100 ms with no further input):

```
   t= 109ms left=20% top=20%       Color spectrum, saturation 20%, lightness 80%
   t= 209ms left=20% top=20%       Color spectrum, saturation 20%, lightness 80%
   t= 310ms left=51.1529% top=0%   Color spectrum, saturation 51%, lightness 100%
   t= 412ms left=51.1529% top=0%   …unchanged for the remaining 800 ms
```

**The dot the user placed jumps, unbidden, 300 ms after they let go.** The invariant the comment
asserts holds for 300 ms and then fails. This is invisible in a lossless space (probe P1, default
space: the dot holds 25 %/25 % for the full 1424 ms — because the recomputed HSV *equals* the raw
coords, not because the wipe did not happen) and glaring in a lossy one. It will also fire on any
out-of-gamut pick that `clampColorToSpaceDomain` (`useColorPipeline.ts:64-68`) bites.

**Attribution note (honest).** The 300 ms coincidence plus the URL string changing across the same
interval is strong but circumstantial. I ruled out the only other debounced writer:
`useColorPersistence.ts:94-99` is 200 ms and writes to `colorStore.value.inputColor`
(localStorage), never to the model. `updateColorComponentDebounced` is 500 ms
(`useColorPipeline.ts:209`) and is not on this path. `useColorUrl`'s 300 ms is the only external
model writer at that latency.

**Proposed cure.** Delete the boolean sentinel. The write-origin question is not a *timing*
question, it is an *identity* question, and the pipeline already answers it for `stableHue` with
exactly the right idiom — a `lastWrittenModel` reference sentinel (`useColorPipeline.ts:57`,
`:81`). Expose the same discipline to the plate: the spectrum stores the exact model reference it
produced, and the watch clears the raw coords iff `model.value !== myLastWrite`. A reference cannot
be spent twice, cannot be swallowed by batching, and cannot be stranded by a throw. (The batching
hazard is real and separate: two model writes inside one Vue flush window collapse to **one** watch
invocation, so a spectrum write coinciding with an external write in the same tick silently
swallows the external one. Not reproduced — labelled a hypothesis — but the reference sentinel
kills it too.)

---

### C-4 — MAJOR · CONFIRMED · the plate writes picks blindly through `selectedColorSpace`; in Kelvin the map is degenerate and the plate lies

**Where.** `SpectrumCanvas.vue:127-129`:

```ts
const hsv = withChannel(withChannel(HSVCurrentColor.value, "s", s), "v", v);
setCurrentColor(hsv, model.value.selectedColorSpace, true);
```

There is no check that the destination space can *represent* a two-dimensional (s, v) family.
`kelvin` is a one-channel space (`src/color/model.ts:20,66`) and it is selectable in the UI —
`DISPLAY_COLOR_SPACE_NAMES` is spread from `PICKER_SPACE_NAMES` (`color-model.ts:73-76`) and
`ColorSpaceSelector.vue:150` iterates all of it.

**Reproduction A — the plate is a lie across its whole lower band** (`probe/probe6.mjs`, section
C; switch to Kelvin through the real Select, then three picks down the s = 50 % column):

```
C kelvin pick at s=50% v=50% -> readout ["1000.0"] dot 50% / 50%
C kelvin pick at s=50% v=30% -> readout ["1000.0"] dot 50% / 70%
C kelvin pick at s=50% v=10% -> readout ["1000.0"] dot 50% / 90%
```

Three visibly different picks, **one colour**. The dot obediently sits where the user clicked while
the model holds a fixed 1000 K. The rendered result is in
`probe/kelvin-plate-after-bottom-pick.png`: the indicator is parked in the near-black bottom of the
plate and its **fill is bright orange** — the contradiction is on screen.

**Reproduction B — the degeneracy quantified** (`probe/kmap.ts`, exercising the shipped
`convertColor(…, "kelvin")` directly):

```
       |      s=0    0.2    0.4    0.6    0.8    1.0
v=1.0 |   6600   5046   3904   3106   2559   2184
v=0.8 |   4298   3377   2607   1582   1089   1000
v=0.6 |   1319   1000   1000   1000   1000   1000
v=0.4 |   1000   1000   1000   1000   1000   1000
v=0.2 |   1000   1000   1000   1000   1000   1000

distinct kelvin values over a 21x21 (s,v) sweep at h=35.2: 135
```

**The bottom 60 % of the plate by height maps to the single value 1000 K.** 441 distinct pointer
positions produce 135 distinct outputs, heavily clustered at the floor.

**Reproduction C — and it is expensive** (`probe/probe4.mjs`, the synchronous duration of one
`pointerdown` dispatch, which runs `updateSpectrumColor` inline at `:156`):

```
pointerdown sync cost (DEFAULT space): {"samples":[0.4,0,0,0.1,0,0]}
KELVIN space, pointerdown sync cost:   {"samples":[2,2,3,2.3,1.9,2.1]}
```

2–3 ms of blocking main thread **per frame of drag**, versus ~0 ms in every other space, because
`xyzToKelvin` (`src/color/anchors.ts:317-329`) is a **39 001-iteration linear search** that calls
`kelvinToXyz` — three `Math.log`/`**` calls plus a 3×3 matrix multiply — on every step. Isolated in
Node (`probe/kbench.ts`):

```
hsv->kelvin: 4.269 ms/op (n=20)
hsv->oklch:  0.0014 ms/op (n=2000)      ← ~3000× cheaper
```

**Proposed cure.** Two seams, and the component owns the first. (i) The plate must declare its
domain: it is an **HSV s×v instrument**, so it should write HSV and let the pipeline's *display*
projection handle the selected space — or, where the selected space cannot round-trip s×v, the
plate must present as unavailable rather than as a working control that discards input. A
`role="img"` div that silently ignores 60 % of its own surface is worse than an absent control.
(ii) `xyzToKelvin`'s brute-force scan is a library defect worth its own relay to the src seat: a
monotone ternary/binary search over the same objective is ~15 evaluations instead of 39 001, and
the objective should normalise luminance before comparing (its current raw-XYZ metric is what
drags dim colours to the 1000 K floor).

---

### C-5 — MAJOR · CONFIRMED · the dot's border regime is hue-blind; measured 1.07:1 on yellow (WCAG 1.4.11 requires ≥ 3:1)

**Where.** `demo/picker/controls/spectrumLuma.ts:20-25`, consumed at
`useSpectrumPlateStyle.ts:53-57`:

```ts
export const SPECTRUM_LUMA_FLIP = 0.5;
export function spectrumLuma(s: number, v: number): number {
    return v * (1 - s * 0.5);
}
```

The docblock states the model's own premise: the plate is `linear-gradient(to top, #000,
transparent)` over `linear-gradient(to right, #fff, hue)`. That composite is exactly
`out = v · mix(white, hue, s)` — and `mix(white, hue, s)`'s luminance depends **entirely on which
hue**. The shipped model replaces that term with the constant `0.5`. Pure yellow has relative
luminance 0.928; pure blue has 0.072. One constant cannot serve both.

**Reproduction — computed against the exact composite** (`probe/luma.mjs`, sRGB relative
luminance, WCAG contrast):

```
h   s    v    modelLight trueLum border  contrast pass(>=3:1)
 60 1.00 1.00  false     0.928   white    1.07   **FAIL**
 60 1.00 0.90  false     0.731   white    1.35   **FAIL**
 60 1.00 0.75  false     0.485   white    1.96   **FAIL**
120 1.00 1.00  false     0.715   white    1.37   **FAIL**
120 1.00 0.90  false     0.563   white    1.71   **FAIL**
120 1.00 0.75  false     0.374   white    2.48   **FAIL**
180 1.00 1.00  false     0.787   white    1.25   **FAIL**
180 1.00 0.90  false     0.62    white    1.57   **FAIL**
180 1.00 0.75  false     0.411   white    2.28   **FAIL**
240 1.00 1.00  false     0.072   white    8.59   PASS
  0 1.00 1.00  false     0.213   white       4   PASS

9/30 sampled (h,s,v) fail WCAG 1.4.11 non-text contrast (3:1) for the dot border.
```

**Reproduction — live** (`probe/probe7.mjs`, hue 60 vs hue 240, top-right corner pick):

```
YELLOW top-right pick: { "label": "…saturation 98%, lightness 98%",
                         "dotBorder": "rgba(255, 255, 255, 0.9)",
                         "dotBg": "rgb(250, 250, 5)" }
BLUE   top-right pick: { "dotBorder": "rgba(255, 255, 255, 0.9)" }
```

Same white border on both. See `probe/yellow-corner-dot-border.png` (the indicator all but
vanishes) against `probe/blue-corner-dot-border.png` (crisp). The 2 px border is the dot's **only**
boundary against the field — `SpectrumCanvas.vue:263`.

**Proposed cure.** `spectrumLuma` should take the hue it is already being handed and compute the
composite's actual relative luminance — `v · relLum(mix(white, hslHue(h), s))`, ~six lines of
arithmetic already present in the library. Keep the "one function, one threshold" law the docblock
rightly insists on; fix the function so the law is worth obeying. Better still: flip on measured
contrast rather than a luminance threshold, so the predicate answers the question the border is
actually asking.

---

### C-6 — MAJOR · CONFIRMED · zero keyboard operability, `role="img"` on an interactive control, no live announcement

**Where.** `SpectrumCanvas.vue:6-22`. The template comment defends the choice:

```html
<!-- W5-a11y: 2D saturation×lightness picker — not a linear slider,
     so role="img" with a reactive descriptive label, not role="slider". -->
```

The premise (not a linear slider) is correct. The conclusion (therefore an image) is not. `role="img"`
tells assistive technology this is **static graphical content**. The element then binds
`pointerdown`/`pointermove`/`pointerup`/`pointercancel`/`lostpointercapture`.

**Reproduction** (`probe/probe1.mjs`, `probe/probe8.mjs`):

```
FACTS  role: "img" · tabIndex: -1 · hasTabindexAttr: false · ariaLive: null
       closestFocusable: false · canvasChildren: 0 · figureHasCaption: false
KEYBOARD {"inTabOrder":false,"focusableCount":28}

B tab sweep hit spectrum: false
B focus order (40 tabs): BUTTON:Select view > BUTTON:Toggle action bar > BUTTON:Login >
  BUTTON:@mbabb > BUTTON:Select color space > SPAN:l component value > … > (cycles twice, never the plate)

C arrows: "…saturation 21%, lightness 55%" -> "…saturation 21%, lightness 55%" | changed: false
C activeElement after plate click: BODY.relative
```

Forty Tab presses cycle the entire page twice and **never** reach the plate. Clicking the plate
leaves focus on `BODY` — the control does not even take focus when operated. Arrow keys do nothing.
`aria-live` is absent, so the label's continuous updates during a drag
(`useSpectrumPlateStyle.ts:24-28`) are announced to **nobody** — a `role="img"` name change is not
a live region.

The usual mitigation — "an equivalent keyboard path exists via the sliders" — is weak here: the
sliders expose the channels of the *selected display space* (measured on `/`: `L`, `A`, `B`, `ALPHA`
— see the REPORT.json tap-target rows below), which are **not** s and v. Unless the user first
switches to HSV, there is no keyboard route to the function this control performs.

**Proposed cure.** The 2-D-picker pattern is settled: make the plate `tabindex="0"` with
`role="application"` (or two coupled `role="slider"` children), give it Arrow / Shift+Arrow /
Home / End / PageUp / PageDown on both axes, move focus to it on pointerdown, and render the
live position through `aria-valuetext` on the coupled sliders (which *are* announced) rather than
a mutating `role="img"` name. Also rename the announced channel — see C-8.

---

### C-7 — MAJOR · CONFIRMED · the gates are vacuous: name the mutation that keeps them green

**What exists.** Exactly two specs touch this component, plus one that does not.

1. `e2e/smoke/reactivity-instant.spec.ts:41-135` — the only spec that *drives* the plate. It
   performs five mouse paths and asserts (a) the readout text diverges from baseline within 2000 ms
   and (b) the median wall-clock is ≤ 50 ms. **It never asserts what colour resulted.**
2. `e2e/smoke/a11y-modality-support.spec.ts:91-119, 300-303` — asserts
   `forced-color-adjust: none` on `.spectrum-picker` (the rule lives at
   `demo/styles/foundation.css:678-696`, `.spectrum-picker` on line 681, not in this SFC) and that a `role="img"` named
   `/Color spectrum/` exists. It **certifies the very a11y defect in C-6** as the expected shape.
3. `e2e/smoke/perf/drag-frame-budget.spec.ts:33-70` — the repo's §6.2 frame oracle (p50 ≤ 20 ms,
   0 long tasks > 50 ms). It drives **the L-channel slider**, not the plate. The plate has no
   frame gate.

**No unit test exists at all:**

```
$ grep -rln "spectrumLuma\|useSpectrumPlateStyle\|spectrumFieldIsLight" test/ demo/test/ e2e/
NONE
```

**The mutations that keep everything green** (each is a single-token edit to
`SpectrumCanvas.vue:110-130`):

| Mutation | Effect on the product | Suite |
| --- | --- | --- |
| `const v = clamp(y / rect.height, 0, 1)` (drop the `1 -` at `:121`) | **the vertical axis is inverted** — the picker is upside down | GREEN |
| `const s = clamp(x / rect.width, 0, 1)` → swap `s` and `v` at `:127` | the axes are transposed | GREEN |
| delete both `clamp` calls at `:117-118` | drags past the edge produce out-of-domain picks | GREEN |
| delete `rawS`/`rawV` and the whole watch at `:61-75` | the dot jitters and snaps on every roundtrip | GREEN |
| delete the rAF throttle at `:97-108`, call `updateSpectrumColor` inline | one full fan-out per `pointermove` | GREEN (the median might rise, but the drive is 5 slow protocol paths) |
| return `0.5` unconditionally from `spectrumLuma` | the dot border stops adapting entirely | GREEN (no test reads it) |

The readout diverges under every one of these, which is the *only* thing the spec checks. This is
a textbook vacuous gate: the spec proves the wire is connected, and is marketed (file docblock,
line 7) as proving "the topology REACTIVITY-B verified is INSTANT."

**Proposed cure.** Two born-RED oracles, both cheap because the maths is pure:
(i) a **vitest unit** over an extracted `plateCoords(rect, clientX, clientY) → {s, v}` — a pure
function this component does not currently have, because the arithmetic is welded into
`updateSpectrumColor` between a DOM read and a model write. Extract it and the corners, the
out-of-bounds clamps, a zero-width rect and NaN become table-driven rows.
(ii) a **vitest unit** over `spectrumLuma`/`spectrumFieldIsLight` asserting ≥ 3:1 measured contrast
across an (h, s, v) grid — the exact grid in `probe/luma.mjs`, which is born RED at 9/30 today.
(iii) extend the §6.2 oracle with a spectrum-drag case so C-9's number has a gate.

---

## MINOR findings

### C-8 — MINOR · CONFIRMED · the accessible name misnames the channel

`useSpectrumPlateStyle.ts:24-28` announces `` `Color spectrum, saturation ${sPct}%, lightness ${vPct}%` ``
for the HSV **value** channel. `PICKER_CHANNELS.hsv` is `[h, s, v]` (`picker-color.ts:56`); HSV *value*
is not HSL *lightness*. Measured live at the top-right corner (`probe/probe7.mjs`): the plate
announces **"saturation 98 %, lightness 98 %"** for `rgb(250, 250, 5)`, whose actual HSL lightness
is 50 %. The one channel name a screen-reader user receives is the wrong one. Cure: "brightness"
or "value", matching the space the plate actually edits.

### C-9 — MINOR · CONFIRMED · the drag costs materially more per frame than the gated slider path, and has no gate

Two sessions, both dev-server (`localhost:9000`, unbundled) on a **contended host** (three other
mega-tranche seats were running):

Quieter session (`probe/probe3.mjs`, in-page `PointerEvent` dispatch at rAF cadence — no protocol
RTT contamination):

```
IDLE(no drag):       {"p50":17.1,"p90":34.3,"max":35.6}
DRAG default-space:  {"p50":45,"p90":62.2,"max":78.6,"longTasks":[50,52],"totalLong":102}
```

Loaded session, same cadence for both paths back to back (`probe/probe9.mjs`):

```
IDLE            {"p50":50.4,"longOver50":0}
SLIDER-DRAG     {"p50":58.3,"longOver50":30}     ← the path §6.2 gates at p50 ≤ 20ms / 0 long
SPECTRUM-DRAG   {"p50":66.6,"longOver50":44}     ← ungated
```

Marginal cost over the same-session idle baseline: slider **+7.9 ms**, spectrum **+16.2 ms** —
roughly double, with 44 long tasks > 50 ms against the slider's 30. The absolute numbers are not
comparable to the §6.2 built-bundle gate and I do not present them as such; the *relative* result
is a controlled within-session comparison and it says the ungated path is the more expensive one.

The component's own arithmetic is not the cost (`probe/probe4.mjs`: 0–0.4 ms per synchronous
pointerdown in the default space). The cost is the app-wide fan-out the plate drives, which is
`ColorPicker`/atmosphere territory. What is spectrum-owned: `updateSpectrumColor` calls
`getBoundingClientRect()` (`:114`) **inside the rAF callback, every frame**, after the previous
frame mutated the dot's inline style — a forced synchronous layout per frame that could be read
once at pointerdown and invalidated on resize/scroll.

### C-10 — MINOR · CONFIRMED · the indicator leaves the control it indicates

`SpectrumCanvas.vue:234` sets `overflow: visible` on the plate; `:28` applies
`-translate-x-1/2 -translate-y-1/2` to a 28 px dot positioned at `left: 100·s%` / `top: 100·(1−v)%`
(`useSpectrumPlateStyle.ts:60-61`). At the edges half the dot is outside the plate; at the corners
three-quarters is. This is visible in the **shipped** capture
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` — the dot floats
above the plate's top edge onto the card — and in `probe/yellow-corner-dot-border.png`. Combined
with C-5 (a 1.07:1 border) the top edge of the yellow plate has effectively no visible indicator at
all.

### C-11 — MINOR · CONFIRMED · this component's touch-gate affordance is defined in a sibling SFC

`SpectrumCanvas.vue:11-12` applies `touch-gate-target` and `touch-gate-active`. Neither class is
defined in this file. They are defined in **`ComponentSliders.vue:238-268`**, in an
**intentionally unscoped** `<style>` block whose own comment names this component as a consumer:

```
 * (ComponentSliders, SpectrumCanvas, plus the ExtractControls/PointerDebug
 * touch-gate-target uses) — the block is intentionally UNSCOPED so the
 * cascade reaches consumers outside this SFC's data-v-* attribute scope.
```

A deliberate cross-SFC global leaking out of a scoped-style file. The spectrum's activation
affordance (`outline: 3px solid` → `outline-color: color-mix(…)`) silently disappears if
`ComponentSliders` is ever unmounted, code-split, or converted to scoped styles. Owner edict 5
(root-level styling) points the other way: a shared affordance belongs in `demo/styles/` — or,
since `useTouchGate` is a **glass-ui** primitive, in glass-ui beside it (edict 4). `ComponentSliders`
is under the glass-v8 pin, so the cure must land in `demo/styles/` or as a producer letter, not as
an edit there.

### C-12 — MINOR · the touch gate deactivates mid-drag, and two owners write one inline property

`SpectrumCanvas.vue:144-146` calls `spectrumGate.resetTimer()` **only on pointerdown**. The gate's
deactivate timer is 3000 ms by default (`useTouchGate`, `l(a = 3e3)` in
`node_modules/@mkbabb/glass-ui/dist/useTouchGate-B4mzQcHJ.js`). A touch drag longer than three
seconds — routine when hunting a shade — fires `x()`: `isActive` flips false, the
`touch-gate-active` outline vanishes under the finger, and the *next* press is gate-blocked again.

Separately: `useTouchGate`'s `y()`/`x()` write `el.style.touchAction` **imperatively**, while
`useSpectrumPlateStyle.ts:41-43` writes `touchAction` **reactively** through Vue's `:style` binding
on the same element. Two owners of one inline property; Vue's `patchStyle` only re-applies values
that changed between binding objects, so an imperative clobber can persist across a re-render whose
computed value did not change. Not reproduced on a desktop harness (`isTouchDevice` is false there)
— **labelled a hypothesis**, and the cure is structural either way: let the gate own
`touch-action` entirely and drop it from `spectrumStyle`, or vice versa. Never both.

### C-13 — MINOR · a consumer-side override of a glass-ui component's chrome

`SpectrumCanvas.vue:259-270` restyles `WatercolorDot`'s border and box-shadow from the consumer
scope. Under edict 4/5 an indicator-dot variant belongs in glass-ui (the producer already ships the
component and its internal filter); a per-instance border/shadow override in the consumer is the
shape those edicts forbid. Low severity — the override is small and coherent — but it is the seam
where the dot's contrast regime (C-5) currently lives, so curing C-5 correctly means moving the
regime to the producer as a prop/variant rather than deepening the override.

---

## INFO findings

### C-14 — INFO · the component is named `SpectrumCanvas` and contains no canvas

Measured: `canvasChildren: 0` (`probe/probe1.mjs`). The rendering is two CSS gradients
(`useSpectrumPlateStyle.ts:36-39`). The name has already cost audit time — this seat's own brief
specifies "Canvas-based spectrum rendering… devicePixelRatio handling" as prime suspects that do
not exist. The directory, the file, and the component name should say what it is (`SpectrumPlate`);
the codebase already calls it "the plate" in every comment (`spectrumLuma.ts:5`,
`useSpectrumPlateStyle.ts:1`, `SpectrumCanvas.vue:202`).

### C-15 — INFO · `dotPos` calls a throwing accessor unguarded where every sibling guards it

`SpectrumCanvas.vue:205-210` calls `channelNumber(HSVCurrentColor.value, "s")`, which throws
`PickerColorError("Missing hsv.s")` on a `"none"` (powerless) channel (`picker-color.ts:152-158`).
Every sibling call site in the pipeline wraps the same accessor in `try/catch` precisely because
powerless colours exist — `useColorPipeline.ts:88-95`, `useColorParsing.ts:39-46` ("Powerless
colors have no numeric hue"), `useColorParsing.ts:76-83`. This computed does not.
**HYPOTHESIS**, not reproduced: the upstream crash in C-16 fires first, so the spectrum never gets
the chance to throw today. If C-16 is cured by admitting `none` channels rather than rejecting
them, `dotPos` becomes the next crash site.

### C-16 — INFO (CROSS-REF; BLOCKER, but not this component) · a `none`-channel deep link blanks the whole app

Reproduction (`probe/probe8.mjs`):

```
A "oklch(none none none)" -> {"spectrum":false,"label":null,"dot":null,"bodyLen":0}
                              errors: ["PAGEERROR: color_missing_channel"]
A "oklch(50% none none)"  -> {"spectrum":false,…,"bodyLen":0}
A "hsl(none none none)"   -> {"spectrum":false,…,"bodyLen":0}
```

`http://localhost:9000/#/?space=oklch&color=oklch(none%20none%20none)` renders an **empty body**.
`resolveHydratedBootModel` (`demo/color-picker/composables/boot/hydrate.ts:96-129`) try/catches
correctly, but `parsePickerColor` *succeeds* on `none` channels and the same-space
`convertPickerColor` is an identity, so a model with `"none"` channels reaches
`useColorPipeline.ts:75` — `const initHsv = convertPickerColor(model.value.color, "hsv")`, unguarded
at setup — and `valueOrThrow` throws `color_missing_channel`, killing the mount. CSS Color 4 makes
`none` a first-class channel value, so this is a valid shareable URL. **Not a SpectrumCanvas
defect** — relayed here because it is a live shipping crash class of exactly the kind the seat
brief names, and because the plate is its nearest downstream (C-15).

### C-17 — INFO · a reactive ref that is never reactive; a docblock citing a composable that does not exist

- `SpectrumCanvas.vue:55` — `const isDragging = ref(false)` is never read in the template
  (`grep -n "isDragging" SpectrumCanvas.vue` → `55, 151, 153, 160, 172, 188, 199` — all inside
  `<script setup>`, and `153`/`188` are only the debug gauge label string). A plain
  `let` suffices; the ref buys a reactive dependency nothing consumes. (Moot if C-1's cure lands:
  it collapses into `activePointer !== null`.)
- `spectrumLuma.ts:6` names `useGamutOverlay` as one of the three consumers that make the
  "one function, one threshold" coherence claim true. It does not exist:
  `grep -rn "useGamutOverlay" demo/ src/` → one hit, that comment. The only surviving
  `.gamut-overlay` reference is a CSS selector at `demo/styles/foundation.css:682`. Two of the
  three named consumers of the shared regime are gone; the "instrument coherence" the file is
  built to guarantee currently has one consumer.
- Registered contrivance, cross-referenced not re-litigated: `SpectrumCanvas/composables/` is a
  single-tenant directory — `excavation/CONTRIVANCE-REGISTER.md` **L-D9**, census **C-02**,
  disposition CONSOLIDATE.

---

## Negative proof — what I checked and did NOT find

The premise was that the implementation is defective, and it is. These are the specific hazards
from the seat brief and the repo's record that this component **does not** exhibit, each with the
evidence that proves the negative:

| Hazard | Verdict | Evidence |
| --- | --- | --- |
| ungated rAF loop (PRM-RAF epidemic) | **ABSENT** | one `requestAnimationFrame` at `:100`, single-shot (guarded by `spectrumRafId === null` at `:99`), cancelled at `:196` (`stopDragging`) and `:219-222` (`onUnmounted`). Not a loop. |
| `defineModel()` stale-read round-trip | **ABSENT** | the component `inject`s `COLOR_MODEL_KEY` (`:45-50`); `useColorPipeline.ts:30-42` documents that the picker's second `shallowRef` copy and its `defineModel` round-trip were deliberately deleted at S.W2. Reads after writes are synchronous (`model.value = next`, `useColorPipeline.ts:70`). |
| `stableHue` / oklch→HSV hue loss at low chroma | **HANDLED** | `setCurrentColor(hsv, space, /* fromSpectrum */ true)` (`:129`) makes `useColorParsing.ts:38` return before touching `stableHue`, and `HSVCurrentColor` re-imposes `stableHue` (`useColorPipeline.ts:106-109`). Dragging to s = 0 or v = 0 preserves hue. |
| `ValueUnit` nesting accumulation | **N/A** | no `ValueUnit` in this component's graph; `withChannel` (`picker-color.ts:165-176`) copies the channel array and rebuilds through the frozen `buildColor` factory — no wrapping of a possibly-wrapped value. |
| WebGL context loss / eager WebGL boot | **N/A** | 0 canvases; no GL. The `"WebGL: context lost."` console error on `/#/` in `visual/REPORT.json` (safari-desktop-light) belongs to `HeroBlob`. |
| listener / observer / timer leaks | **CLEAN** | all five pointer listeners are template-bound (`:15-21`) and die with the node; `releaseCapture()` runs on unmount (`:218`); `useTouchGate` self-disposes via `onScopeDispose` (glass-ui `useTouchGate`, `t() && n(E)`). No `setInterval`, no `addEventListener` in script. |
| unbounded growth | **CLEAN** | the only mutable state is two `number \| null` refs and three module locals. `debug.logEvent` is a no-op unless `?debug=1` (`usePointerDebug.ts:65, 78`) and its buffer is capped at 80 (`MAX_EVENTS`). `Math.random()` at `:163` is short-circuited by `debug.state.enabled`. |
| pointer maths at the domain boundary | **CORRECT** | `probe/probe2.mjs`: dragging 900 px past the top-left → `saturation 0%, lightness 100%`; 900 px past the bottom-right → `saturation 100%, lightness 0%`, dot `left:100% top:100%`. The `clamp` calls at `:117-121` and the zero-rect guard at `:115` hold. Non-finite input is impossible downstream — `withChannel` rejects it (`picker-color.ts:170`). |
| `parseCssColor` crash class inside this component | **ABSENT** | the component never parses. `grep -n "parse" SpectrumCanvas.vue` → no output. (The parse-adjacent crash is C-16, upstream.) |
| horizontal overflow / nameless buttons / small tap targets | **ZERO CONTRIBUTION** | `visual/REPORT.json`, all four `/#/` matrices: `overflowX: 0`. The `namelessButtons: 1` (desktop) and the eight `smallTapTargets` rows are the slug buttons (22×22), the channel thumbs (`12×24` desktop, `12×44` mobile — glass-ui `Slider`, producer-owned) and an unlabelled `input` — **none is this component**. The plate measures 469×224 CSS px (`probe/probe1.mjs`) and the dot is 29.6×28.8. |
| `verbatimModuleSyntax` (edict 8) | **COMPLIANT** | `SpectrumCanvas.vue:36-43` imports only values; `useSpectrumPlateStyle.ts:8-12` correctly uses `type ComputedRef`, `type PickerColorIn`, and `import type { useTouchGate }` for a `ReturnType<typeof …>` position. |
| god module (edict 1) | **COMPLIANT** | 272 lines, one colocated composable, one shared pure helper. |
| legacy shims / dual paths (edict 2) | **COMPLIANT** | no aliases, no back-compat branches, no masking fallbacks. The two `try {} catch {}` blocks are `releasePointerCapture` on a possibly-detached node (`:84-87`) — legitimate. |
| animations deleted (edict 6) | **COMPLIANT** | `field-paint-in` (`:243-257`) is scoped-and-kept, correctly wrapped in `@media (prefers-reduced-motion: no-preference)` — one of the six conforming PRM blocks the DESIGN-CANON-BRIEF counts at `:88`. Verified live: `animationName: "field-paint-in-ad23e00d"`. |
| Vue 3.5 idioms (edict 7) | **COMPLIANT** | `useTemplateRef` at `:56`; no props to destructure; no `defineModel`. |

---

## Ranked disposition

| # | Finding | Severity | Status |
| --- | --- | --- | --- |
| C-1 | no `pointerId` guard — foreign pointer steers *and* kills the drag | MAJOR | CONFIRMED |
| C-2 | no button guard — right-click picks; swallowed `pointerup` → hover paints | MAJOR | CONFIRMED |
| C-3 | dot-persistence invariant false — URL echo wipes raw coords at 300 ms | MAJOR | CONFIRMED |
| C-4 | blind write through `selectedColorSpace` — Kelvin plate degenerate + 2–3 ms/frame | MAJOR | CONFIRMED |
| C-5 | hue-blind dot border — 1.07:1 measured, 9/30 grid points fail WCAG 1.4.11 | MAJOR | CONFIRMED |
| C-6 | zero keyboard operability, `role="img"`, no `aria-live` | MAJOR | CONFIRMED |
| C-7 | vacuous gates — an inverted axis stays green; no unit test exists | MAJOR | CONFIRMED |
| C-8 | accessible name says "lightness" for HSV value | MINOR | CONFIRMED |
| C-9 | ungated drag cost, ~2× the gated slider path's marginal frame cost | MINOR | CONFIRMED |
| C-10 | dot escapes the plate at edges/corners | MINOR | CONFIRMED |
| C-11 | touch-gate affordance defined in a sibling SFC's unscoped style | MINOR | CONFIRMED |
| C-12 | gate deactivates mid-drag; two owners write `touch-action` | MINOR | one CONFIRMED by read, one HYPOTHESIS |
| C-13 | consumer-side override of a glass-ui component's chrome | MINOR | CONFIRMED |
| C-14 | named `SpectrumCanvas`, contains no canvas | INFO | CONFIRMED |
| C-15 | `dotPos` calls a throwing accessor where every sibling guards | INFO | HYPOTHESIS |
| C-16 | `none`-channel deep link blanks the app (upstream, cross-ref) | INFO here / BLOCKER there | CONFIRMED |
| C-17 | dead reactive ref; docblock cites a composable that does not exist | INFO | CONFIRMED |

**Strongest defect: C-1.** Not because it is the most severe in the abstract — C-6 arguably locks
out more users, and C-4 is the most embarrassing on screen — but because it is the cleanest example
of the component's actual disease. `capturedPointerId` is *already tracked* at `:78` and `:149`.
The state needed to prevent the bug is sitting in a module-scope variable three lines above the
handler that ignores it. The plate does not lack information; it lacks a rule about which pointer
owns it. C-2, C-3 and C-12 are the same illness in different organs — loose parallel state
(`isDragging` / `capturedPointerId` / `capturedElement` / `spectrumIsSource` / `pendingCoords`, five
module locals with no invariant tying them together) where one owned object belongs. Cure the
ownership model and four findings die at once; patch them individually and the sixth variable
arrives next tranche.

---

*Seat: CHALLENGE-C (implementation), picker band, mega-tranche component audit.
Model: Opus 5 (`claude-opus-5[1m]`). No source edits. All probes read-only against the dev server.*
