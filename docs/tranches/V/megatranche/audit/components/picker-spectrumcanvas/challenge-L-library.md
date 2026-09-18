# CHALLENGE-L — library structure · `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. The declaration is present and matches; the seat is not inherited or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD **`e79fcd43`** at the time of
this audit (the brief cited `c654824e`; the core band landed `e79fcd43` in between — all
file:line references below are against `e79fcd43`).

**Verdict: DEFECTIVE.** 13 findings, 2 BLOCKER.

---

## 0. The first fact: the component is not a canvas

Before any import tracing. The subject is named `SpectrumCanvas`, sits in a directory named
`SpectrumCanvas/`, and the workflow brief that spawned this seat says *"Canvas-based spectrum
rendering. Prime suspects: per-frame redraw cost, devicePixelRatio handling…"*.

There is no canvas. Live probe against `http://localhost:9000/#/`:

```
$ node scratchpad/probe.mjs      # playwright chromium, 1440x900, networkidle + 2.5s
{
 "canvasInsideSpectrum": 0,
 "canvasOnPage": 2,                      # goo-blob + aurora, neither is the spectrum
 "computed": {
  "background": "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)),
                 linear-gradient(to right, rgb(255, 255, 255), rgb(255, 0, 59))"
 },
 ...
}
```

The plate is two stacked CSS gradients on a `<div>` (`useSpectrumPlateStyle.ts:36-39`). There is
no `getContext`, no `devicePixelRatio`, no per-frame redraw anywhere in the component or its
composable. The name misdirected the audit brief itself — that is the measure of how much the
name costs.

Why it is named that is §L-4.

---

## 1. Import ledger — every edge traced to its home

`SpectrumCanvas.vue:36-43`, all eight edges:

| # | Specifier | Resolves to | Verdict |
|---|-----------|-------------|---------|
| 1 | `vue` | host `vue` | ok |
| 2 | `@mkbabb/value.js/math` (`clamp`) | `package.json#exports["./math"]` → `dist/subpaths/math.js` | **correct published subpath** |
| 3 | `@mkbabb/glass-ui/watercolor-dot` (`WatercolorDot`) | glass-ui `exports["./watercolor-dot"]` | **correct subpath** |
| 4 | `@mkbabb/glass-ui` (`useTouchGate`) | glass-ui `exports["."]` → `dist/glass-ui.js` | **WRONG — `./dom` exists** (L-7) |
| 5 | `../../../color-session/picker-color` (`channelNumber`, `withChannel`) | demo domain layer | edge ok, **contents wrong** (L-2) |
| 6 | `../../composables/usePointerDebug` (`POINTER_DEBUG_KEY`) | picker-level composable | **cyclic** (L-6) |
| 7 | `./composables/useSpectrumPlateStyle` | colocated | ok |
| 8 | `../../../color-session/keys` (`COLOR_MODEL_KEY`) | demo domain keys | ok |

Plus `useSpectrumPlateStyle.ts:8-12`: `vue`, `@mkbabb/value.js/math`, `../../../../color-session/picker-color`, `../../spectrumLuma`, `import type { useTouchGate } from "@mkbabb/glass-ui"` (same L-7 defect).

**The good news, stated plainly so the negative is proved where it holds.** Edge 2 is exactly
right. `clamp` comes through `@mkbabb/value.js/math`, which is a real key in `package.json#exports`
(verified: the exports map has `./color ./value ./css ./easing ./math ./transform ./quantize`).
A real consumer could write that import verbatim. There is **no** `@src/*` deep import, no
`../../src/…`, no reach into `dist/` internals. The T.W1 dogfood keystone holds *in this file*.
Live confirmation from the same probe — the dev server served exactly three value.js modules for
the picker route, all published subpaths, no internals:

```
value.js modules requested: /dist/subpaths/color.js  /dist/subpaths/css.js  /dist/subpaths/math.js
```

There is also **no feature→shell edge from this component**. (Its parent has one —
`ColorPicker.vue:125` imports `OVERTURE_KEY` from `../color-picker/composables/boot/useOverture`,
a feature reaching into the app shell's boot tree — but that is the parent's finding, not this
seat's subject, and I decline to bill it here.)

The defects are not in *where* the imports point. They are in *what is on the other end*.

---

## L-1 · BLOCKER — a second, whole SpectrumCanvas exists, and it computes different colors

`demo/palettes/browser/search/MiniColorPicker.vue` (165 lines, live — imported at
`demo/palettes/browser/search/SearchFilterBar.vue:132`, rendered at `:66`) is a complete
reimplementation of this component.

The plate gradient is the same formula, transposed into a CSS custom property:

```
useSpectrumPlateStyle.ts:37-38   linear-gradient(to top, #000, transparent),
                                 linear-gradient(to right, #fff, hsl(${hue}deg, 100%, 50%))

MiniColorPicker.vue:160-162      linear-gradient(to top, #000, transparent),
                                 linear-gradient(to right, #fff, hsl(calc(var(--hue) * 1deg), 100%, 50%))
```

The pointer→(s,v) maths is the same, minus the library:

```
SpectrumCanvas.vue:117-121       clamp(coords.clientX - rect.left, 0, rect.width) / rect.width      // value.js clamp
                                 clamp(1 - y / rect.height, 0, 1)

MiniColorPicker.vue:138-139      Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))     // hand-rolled
                                 Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height))
```

The dot placement is the same (`left: ${s*100}%; top: ${(1-v)*100}%` — `useSpectrumPlateStyle.ts:60-61`
vs `MiniColorPicker.vue:19`). Its CSS class is `sv-canvas` and its comment calls it a canvas
(`MiniColorPicker.vue:7`) — so **both** spectrum pickers in this repo are named "canvas" and
neither is one.

**And then it reimplements the library.** `MiniColorPicker.vue:85-105` hand-rolls HSV→RGB→hex in
20 lines. `MiniColorPicker.vue:110-125` hand-rolls hex→HSV in 16 more. This is a demo whose entire
reason to exist is to be the dogfood proof of `@mkbabb/value.js` — a color library that publishes
`hsv()`, `convertColor()`, `toRgba8()` on `./color` and `parseCssColor()` on `./css`, and whose own
demo already wraps them as `pickerColorToHex()` (`picker-color.ts:213`) and `parsePickerColor()`
(`:109`).

**It does not agree with the library.** Measured — `scratchpad/dup.mjs`, MiniColorPicker's
function verbatim vs `hsv()`+`toRgba8({gamut:"clip"})` from the built `dist/subpaths/color.js`,
over a 361 hue × 6 saturation × 5 value grid:

```
$ node scratchpad/dup.mjs
samples=10830 disagreements=295 (2.72%)
┌─────────┬────┬──────┬──────┬───────────┬───────────┐
│ (index) │ h  │ s    │ v    │ mini      │ lib       │
├─────────┼────┼──────┼──────┼───────────┼───────────┤
│ 0       │ 0  │ 0.6  │ 0.25 │ '#401a1a' │ '#40191a' │
│ 2       │ 8  │ 0.5  │ 1    │ '#ff9180' │ '#ff9080' │
│ 6       │ 14 │ 1    │ 1    │ '#ff3c00' │ '#ff3b00' │
│ 7       │ 18 │ 1    │ 1    │ '#ff4d00' │ '#ff4c00' │
└─────────┴────┴──────┴──────┴───────────┴───────────┘
```

**Mechanism.** `src/color/operations.ts:324` quantizes with `roundHalfEven` — banker's rounding,
which is what CSS Color 4 specifies. `MiniColorPicker.vue:103` uses `Math.round` — half-up. The
duplicate did not merely repeat the library; it repeated it *wrong*, and the wrongness is exactly
the spec decision the library was written to own. 295 of 10,830 sampled colors are a different
color depending on which of the two pickers the user reaches for. Palette search by color
(`SearchFilterBar` emits `search(currentHex)`) queries with the divergent hex.

**Cure.** Delete `MiniColorPicker.vue`'s color math and its plate outright. The 2D field is one
concept and gets one implementation (see §6). Interim, if the deletion must wait: `currentHex`
becomes `pickerColorToHex(hsv(hue, sat, val, 1))` and the hex watcher becomes
`convertPickerColor(parsePickerColor(hex), "hsv")` — 36 lines to 2, and the disagreement goes to
zero by construction.

---

## L-2 · BLOCKER — the library already owns the channel model, and withholds it, so the demo cloned it

`SpectrumCanvas.vue:127` is the component's entire write path:

```js
const hsv = withChannel(withChannel(HSVCurrentColor.value, "s", s), "v", v);
```

`withChannel` lives at `demo/color-session/picker-color.ts:165-176`. It resolves the channel index
through `PICKER_CHANNELS` and rebuilds the color through `buildColor`. Both of those are the
library's job, and the library has already done it.

`src/color/model.ts:56-74` defines `SPACE_SCHEMA` — per-space channel names, hue-channel index,
CSS-serializability. `src/color/model.ts:136-142` exports `makeColor(space, channels, alpha)` — a
generic constructor over any `SpaceId`.

`demo/color-session/picker-color.ts:52-70` re-declares the channel table. `:92-95` re-declares the
CSS-serializability set. `:123-144` hand-writes a 22-line, 17-arm `switch` dispatching to the 17
named factories — a reimplementation of `makeColor`.

Measured against each other — `scratchpad/tbl.mjs` parses both source tables and diffs them:

```
$ node scratchpad/tbl.mjs
spaces compared            : 17
channel-name lists IDENTICAL: 17/17  (49 channel names duplicated verbatim)
css-serializable flag match : 17/17
hue-channel position match  : 17/17
mismatches: []
```

Not "similar". **Identical, 17 for 17, 49 channel names, 17 booleans, 17 hue positions.**

**The mechanism is the export map, not the demo author.** Neither `src/color/index.ts` (the
internal barrel — I read all 41 lines) nor `src/subpaths/color.ts` (the published one) exports
`SPACE_SCHEMA`, `SPACE_IDS`, `makeColor`, or `isAnyColor`. All four exist. All four are internal.
The published surface offers 17 *named* factories and nothing generic, so any consumer that needs
to address a channel by name, or build a color from a runtime-chosen space, **must** re-derive the
table and hand-write the switch. The demo did exactly that. So would any real consumer. The
duplication is a property of the public API's shape, and this component sits directly on top of it.

Note what this makes `picker-color.ts`: a 220-line module whose only genuinely picker-specific
content is `PICKER_SPACE_NAMES` (display strings) and the min/max/unit display ranges. Everything
else is library.

**Cure — architectural, and it shrinks both sides.** Publish the generic surface that already
exists on `@mkbabb/value.js/color`:

```ts
export { SPACE_SCHEMA, SPACE_IDS, makeColor, isAnyColor } from "../color/model";
export { channelNumber, normalizedChannel, withChannel, withNormalizedChannel, withAlpha }
    from "../color/channels";   // new: ~40 lines, lifted verbatim from picker-color.ts
export { channelRange } from "../color/channels";   // min/max/unit/hue per (space, key)
```

Channel addressing over `AnyColor` is a pure library operation with zero picker semantics — it
belongs beside `convertColor` and `mixColors`, not in a demo folder. After the lift,
`picker-color.ts` is ~35 lines of display strings, `buildColor` is deleted, `PICKER_CHANNELS` is
deleted, `CSS_PICKER_SPACES` is deleted, and `SpectrumCanvas.vue:40` imports `withChannel` from
`@mkbabb/value.js/color` — a real consumer can write the same line.

---

## L-3 · MAJOR — this component's root styling is owned by its sibling's unscoped `<style>`

`SpectrumCanvas.vue:11-12` puts `touch-gate-target` and `touch-gate-active` on the root element.
Neither class is defined in this file, in `demo/styles/`, or in glass-ui. They are defined in
**`demo/picker/controls/ComponentSliders/ComponentSliders.vue:253-274`**, in a `<style>` block that
is deliberately not scoped — its own comment says so:

```
ComponentSliders.vue:244-246
 *  (ComponentSliders, SpectrumCanvas, plus the ExtractControls/PointerDebug
 *  touch-gate-target uses) — the block is intentionally UNSCOPED so the
 *  cascade reaches consumers outside this SFC's data-v-* attribute scope.
```

The dependency is live. Same probe, rule-matching against `.spectrum-picker`:

```
"matched": [
 { "sel": ".spectrum-picker",   "css": "" },
 { "sel": ".touch-gate-target", "css": "outline: transparent solid 3px; outline-offset: 1px;
                                        transition: outline-color var(--duration-normal) …" }
],
"computed": { "outlineWidth": "3px", "outlineStyle": "solid", "outlineColor": "rgba(0, 0, 0, 0)" }
```

So SpectrumCanvas's touch-activation affordance — the 3px outline that tells a mobile user the
plate is armed — is emitted by a different component's SFC. If ComponentSliders is ever
lazy-loaded, reordered, or removed, this component's activation state becomes invisible with no
type error, no test failure, and no lint. Nothing declares the edge.

It gets worse in the other direction: `demo/styles/foundation.css:577` records that the cluster
was deliberately moved *out of* the shared stylesheet *into* the component —

```
/* D.W4 Lane A: .touch-gate-* cluster colocated into ComponentSliders.vue's
 * unscoped <style>; … */
```

— and `demo/workbenches/extract/ExtractControls.vue:140` declares `.touch-gate-target` a **third**
time, in its own scoped block, with a conflicting rule (`border-radius: var(--radius-pill)` flat,
vs ComponentSliders' `:has(.slider-track)`-conditional pill). One class name, three declaration
sites, two of them components.

This violates owner edict 5 (root-level styling) by inversion: the shared vocabulary was pushed
down into a leaf instead of up into the root.

**Cure.** `useTouchGate` is glass-ui's composable and glass-ui owns the state the classes express.
The class contract goes with it: move the `.touch-gate-*` rules into glass-ui's stylesheet, and —
better — have `useTouchGate()` return the class binding so no consumer ever spells the name:

```ts
const gate = useTouchGate();
// <div :class="gate.classes.value" …>   →  ["touch-gate-target", isActive && "touch-gate-active"]
```

Three declaration sites collapse to zero at the consumer, and the cross-SFC cascade dependency
stops existing.

---

## L-4 · MAJOR — the name, the `<figure>`, the dead tokens and the dangling docstring are all residue of a deleted canvas

There *was* a canvas. `git show --stat a68ecdc1` (feat(demo)!: v4 consumer migration + ruled
retirements) deleted, in one commit:

```
.../SpectrumCanvas/SpectrumCanvas.vue                | 137 +------
.../SpectrumCanvas/SpectrumDetentLabel.vue           |  57 ---
.../SpectrumCanvas/SpectrumPlateCaption.vue          |  81 -----
.../SpectrumCanvas/composables/useGamutDetent.ts     | 115 ------
.../SpectrumCanvas/composables/useGamutOverlay.ts    | 309 ----------------
.../SpectrumCanvas/gamutOverlayPaint.ts              | 217 -----------
```

The pre-deletion template (`git show a68ecdc1^:…/SpectrumCanvas.vue`) carried three `<canvas>`
elements — the gamut overlay, its no-canvas fallback, and the space-switch crossfade snapshot —
and a real caption. What survived the deletion, unmaintained:

1. **The name.** `SpectrumCanvas.vue` + `SpectrumCanvas/`, describing a technique the file no
   longer uses. Live-verified zero canvases (§0). This is the single highest-cost item in the
   report per byte: it misled the brief for this very audit.
2. **The orphan `<figure>`.** `SpectrumCanvas.vue:3` is `<figure class="m-0 min-w-0 w-full flex flex-col">`
   wrapping one non-caption child. A `<figure>` exists to pair content with a `<figcaption>`;
   `SpectrumPlateCaption.vue` was the figcaption and it is deleted. What remains is a semantic
   element used as a flex div.
3. **A docstring naming a deleted module.** `demo/picker/controls/spectrumLuma.ts:5-7` still says
   the predicate is shared by *"the gamut overlay's contour/hatch ink regime (`useGamutOverlay`)"*.
   `useGamutOverlay` has not existed since `a68ecdc1`. The module was created to be the ONE home
   for a three-consumer predicate; it now has two, and its own header lies about the third.
4. **Dead design tokens.** Three of the four gamut tokens in `demo/styles/foundation.css:292-300`
   have zero consumers:

```
$ for t in --gamut-edge --gamut-hatch --gamut-edge-paper --gamut-hatch-paper; do
      grep -rn -- "var($t" demo/; done
== --gamut-edge ==
demo/picker/controls/ComponentSliders/ComponentSliders.vue:392:  background: var(--slider-thumb-border-color, var(--gamut-edge));
== --gamut-hatch ==          (nothing)
== --gamut-edge-paper ==     (nothing)
== --gamut-hatch-paper ==    (nothing)
```

   And the surviving one is *repurposed*: a token named for a gamut-truth overlay now paints a
   slider thumb border — a token whose name no longer denotes its meaning. The comment above it
   (`foundation.css:279`) still reads *"The overlay canvas resolves all four via a computed-style
   probe"*. There is no overlay canvas and it resolves one.

Owner edict 2 is "no legacy code — no aliases, migration shims, dual paths, masking fallbacks".
This is the fifth kind: **nomenclature that outlived its referent**, which is worse than a shim
because it costs on every read and nothing ever fails.

**Cure.** Rename to `ColorField/` + `ColorField.vue` (it is a 2D color field; "canvas" was never
the concept, only once the technique). `<figure>` → `<div>`. Delete `--gamut-hatch`,
`--gamut-edge-paper`, `--gamut-hatch-paper`; rename `--gamut-edge` to what it now means
(`--instrument-edge`) or fold it into the slider's own token. Fix the `spectrumLuma.ts` header to
name its two real consumers.

---

## L-5 · MAJOR — the typecheck advertises a public surface that does not exist

The demo consumes value.js through bare package subpaths. Two files declare what those subpaths
are, and they disagree:

```
$ node -e '…compare package.json#exports with tsconfig.demo.json#paths…'
PUBLISHED exports  : @mkbabb/value.js/color @mkbabb/value.js/css @mkbabb/value.js/easing
                     @mkbabb/value.js/math @mkbabb/value.js/quantize @mkbabb/value.js/transform
                     @mkbabb/value.js/value
tsconfig.demo paths: @mkbabb/value.js @mkbabb/value.js/color @mkbabb/value.js/easing
                     @mkbabb/value.js/math @mkbabb/value.js/parsing @mkbabb/value.js/quantize
                     @mkbabb/value.js/transform @mkbabb/value.js/units
IN tsconfig, NOT published: @mkbabb/value.js @mkbabb/value.js/parsing @mkbabb/value.js/units
PUBLISHED, missing from tsconfig: @mkbabb/value.js/value @mkbabb/value.js/css
```

The three phantom entries point at files that are not there:

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

`package.json#exports` has **no `"."` key at all** — a bare `import … from "@mkbabb/value.js"` is
not a thing a real consumer can write. `tsconfig.demo.json` says it is. `./parsing` and `./units`
are retired subpaths still advertised to the typechecker.

The header comment on `tsconfig.demo.json:3-7` asserts *"Resolves the value.js library through its
PUBLISHED subpath `exports`"* and `:41` asserts *"the `exports` map is a CLOSED 8-key set"*. The
exports map is a closed **7**-key set and it is a different 7. Both assertions are false.

**The irony is load-bearing.** `vite.config.ts:28-50` generates its alias set *from*
`package.json#exports` at build time, with a comment explaining why:

```
vite.config.ts:28-29
// GENERATED (not hand-rolled) so the alias set can never drift from the exports
// map: add or rename a subpath in `package.json#exports` and the alias follows.
```

The runtime mirror is generated and correct. The typecheck mirror is hand-maintained and has
drifted five ways. The exact failure the vite comment was written to prevent, reproduced one file
over.

Today it is latent — no demo file imports the three phantoms (`grep` over `demo/`: 24 × `/color`,
10 × `/css`, 6 × `/math`, 5 × `/easing`, 4 × `/quantize`, and nothing else). But it is a live trap:
an import of `@mkbabb/value.js` bare would typecheck green against a nonexistent `.d.ts` and then
fail at runtime, because the vite alias set is generated from `exports` and would not alias it.
**A green typecheck that certifies an unpublishable import is a false proof of the public API** —
precisely the defect class this seat was asked to find.

**Cure — delete the block, do not fix it.** I measured that the `paths` entries are entirely
redundant. `@mkbabb/value.js/css` has **10 live demo imports and no `paths` entry**, and the demo
program typechecks green:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
EXIT=0
```

TypeScript's self-name resolution already resolves bare `@mkbabb/value.js/*` specifiers through
this package's own `exports` map. So: remove all eight `@mkbabb/value.js*` entries from
`tsconfig.demo.json#paths`. `package.json#exports` becomes the single source of truth for vite
(already generated from it) *and* tsc, the drift becomes structurally impossible, and the file
gets shorter.

---

## L-6 · MAJOR — ownership cycle: the debug instrument reaches into this component's private CSS class

`SpectrumCanvas.vue:41,52` injects the debug instrument from `../../composables/usePointerDebug`.
Data flows down: parent provides, leaf consumes. Correct.

`demo/picker/composables/usePointerDebug.ts:117-122` flows back up:

```js
const els = document.querySelectorAll(
    ".spectrum-picker, .slider-track, .slider-thumb, [data-reka-collection-item], …",
);
const wrappers = document.querySelectorAll(
    ".touch-gate-target, .spectrum-picker",
);
```

`.spectrum-picker` is declared inside `SpectrumCanvas.vue:230`'s **`<style scoped>`** block. It is
this component's private class. A parent-level composable hardcodes it — twice — so the ownership
graph has a cycle: SpectrumCanvas → usePointerDebug → SpectrumCanvas.

It works only because Vue's scoping adds a `data-v-*` attribute without mangling the class name
(live probe confirms `classList` contains the literal `spectrum-picker`). Rename the class, restructure
the element, or move the plate into a child, and `forceReleaseAllPointers()` silently stops covering
the spectrum — the exact iOS pointer-capture leak recovery that composable exists for. No type
error. No test. No lint. Discovered only by an iOS user whose picker freezes.

**Cure.** Invert the edge. `usePointerDebug` exposes `registerSurface(el: HTMLElement)`; the
components that own a capture surface register their own element:

```js
// SpectrumCanvas.vue
onMounted(() => debug.registerSurface(spectrumRef.value!));
```

The composable's selector list is deleted, it knows nothing about any component, and the
dependency points one way.

---

## L-7 · MINOR — the wrong glass-ui edge, one line after the right one

```
SpectrumCanvas.vue:38   import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";   // correct
SpectrumCanvas.vue:39   import { useTouchGate }  from "@mkbabb/glass-ui";                   // barrel
```

`useTouchGate` is published at `@mkbabb/glass-ui/dom` — verified:
`node_modules/@mkbabb/glass-ui/dist/composables/dom/index.d.ts:2` re-exports `./useTouchGate`, and
`package.json#exports["./dom"] → ./dist/dom.js` (4,179 bytes).

The root barrel is `dist/glass-ui.js`, which statically imports 43 internal chunks:

```
$ node -e '…extract import specifiers from dist/glass-ui.js…'
import specifiers: 46
./data-table-BygKg6ZA.js  ./dialog-TNRDkcE4.js  ./command-SFqDQ65h.js  ./select-BcBAyLXA.js
./toast-CH5mnsYT.js  ./configurator-M5OaIlJd.js  ./dropdown-menu-BlbnvMaZ.js  … (+36)
```

The correct edge is proven inside the same feature tree — `ColorPicker.vue:124` writes
`import { useIdleReady } from "@mkbabb/glass-ui/dom"`, and `HeroBlob.vue:34-39` uses `/blob`,
`/color`, `/dom`, `/dark`. `demo/picker/` gets it right in 11 places and wrong in 3
(`SpectrumCanvas.vue:39`, `useSpectrumPlateStyle.ts:12`, `useSliderTouchGates.ts:15` — all three
for the *same* symbol, `useTouchGate`, which has the *same* correct subpath).

Honest scoping: glass-ui declares `sideEffects: ["*.css"]`, so Rollup can tree-shake the JS, and
`ColorPicker.vue:138` pulls the barrel anyway for `writeClipboard` — so the marginal prod cost of
*this* line is not established, and I do not claim it. The defect is the inconsistent edge: three
imports of one symbol taking a path the codebase has already decided against, in files that sit
beside files taking the right one.

**Cure.** `import { useTouchGate } from "@mkbabb/glass-ui/dom";` in all three. Then a lint rule
banning bare `@mkbabb/glass-ui` in `demo/`, which is enforceable the moment L-8 lands.

---

## L-8 · MINOR — `demo/ui/` is 19 files of pure alias, and this component is the proof it can go

```
$ find demo/ui -type f | wc -l
19
$ find demo/ui -type f ! -name index.ts
(none)
$ cat demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
$ cat demo/ui/slider/index.ts
export { Slider } from "@mkbabb/glass-ui";
```

All 19 are one-line re-exports of glass-ui root-barrel symbols (only `alert/index.ts` runs to 11
lines, still 2 pure re-exports). Zero local components, zero variants, zero added behaviour. This
is an alias layer — owner edict 2 forbids aliases and dual paths, edict 4 says the design system is
glass-ui and not `demo/ui/`. And because every shim imports the root barrel, every consumer of
`demo/ui` is forced onto the L-7 edge.

**SpectrumCanvas.vue:38 is the counter-proof**: it imports `WatercolorDot` straight from
`@mkbabb/glass-ui/watercolor-dot`, no shim, and nothing is worse for it. Meanwhile
`MiniColorPicker.vue:62-63` goes through `../../../ui/popover` and `../../../ui/button`. Two paths
to the same components, one of them empty.

**Cure.** Delete `demo/ui/` entirely; rewrite each consumer to the glass-ui subpath. 19 files
removed, one dual path closed, and the L-7 lint becomes enforceable.

---

## L-9 · MINOR — two writers own `touch-action` on the same element

glass-ui's `useTouchGate` writes the property imperatively — decompiled from
`dist/useTouchGate-B4mzQcHJ.js`:

```js
function y(e){ o.value = !0, e.style.touchAction = "none", v(); }          // activate
function x(){ …, u &&= (u.style.touchAction = "", null); }                 // deactivate
```

`useSpectrumPlateStyle.ts:41-44` writes the same inline property declaratively:

```js
touchAction: spectrumGate.isTouchDevice
    ? (spectrumGate.isActive.value ? "none" : "pan-y")
    : "none",
```

Same element (`SpectrumCanvas.vue:135` passes `event.currentTarget`, which is the `:style`-bound
div). Live probe, desktop:

```
"inlineStyle": "background: …; --spectrum-shadow: lab(92% 88.8 20); touch-action: none;"
```

Vue's style patcher diffs against its own previous value and is blind to glass-ui's writes;
glass-ui's writes are blind to Vue's. On my trace the two converge (glass-ui writes synchronously,
Vue re-renders on the next tick and restores its computed value) — **I could not produce a
permanent divergence, and I label the "they can drift apart" claim a hypothesis, not a finding.**
The confirmed finding is the shared ownership itself: one DOM property, two writers, no protocol,
converging by luck of ordering.

Compounding it, the component *also* expresses the same state as classes (`touch-gate-target` /
`touch-gate-active`, `SpectrumCanvas.vue:11-12`). Three mechanisms for one boolean.

**Cure.** glass-ui owns the gate, so glass-ui owns `touch-action`. Give `useTouchGate` the inactive
value it currently lacks — `useTouchGate({ inactiveTouchAction: "pan-y" })` — and delete
`touchAction` from the style computed. One writer.

---

## L-10 · MINOR — two idioms for "write a CSS color", inside one feature

`useSpectrumPlateStyle.ts:38` builds a color by string template:

```js
linear-gradient(to right, #fff, hsl(${hue}deg, 100%, 50%))
```

Its sibling `demo/color-session/useSliderGradients.ts:37,44` builds every gradient stop through the
library:

```js
const cssStr = serializePickerColor(step);          // → value.js serializeCssColor
```

`@mkbabb/value.js/css` publishes `serializeCssColor` and exists to own CSS color syntax. One
composable in the picker dogfoods it; the other hand-writes the string. (`MiniColorPicker.vue:34`
is a third site, same template.) Trivial in isolation; as a pattern it is the same disease as L-1
and L-2 — the demo not consuming the library it exists to prove.

---

## L-11 · MINOR — `isTouchDevice` copied from glass-ui's internals under a comment claiming reuse

```
useSliderTouchGates.ts:25-27
    // Touch gate check — reuse the same detection as spectrum
    const isTouchDevice =
        typeof window !== "undefined" && "ontouchstart" in window;
```

It is not reuse; it is a verbatim copy of glass-ui's own line (`useTouchGate-B4mzQcHJ.js`:
`l = typeof window < "u" && "ontouchstart" in window`), and `useTouchGate()` already returns it on
every gate the file constructs (`sliderGates[comp].isTouchDevice`). SpectrumCanvas does it right
(`SpectrumCanvas.vue:138`, `spectrumGate.isTouchDevice`); its sibling copies the predicate and
labels the copy "reuse". Delete the local const; read it off any gate.

---

## L-12 · INFO — the two sibling controls split at opposite seams

Both controls in `demo/picker/controls/` handle the same three concerns — touch gate, pointer
capture, debug wiring — and decomposed them in mirror-image ways:

| | gesture cluster | presentation |
|---|---|---|
| `ComponentSliders/` | lifted → `composables/useSliderTouchGates.ts` (133 L, takes `debug` as a param — testable) | inline in the SFC |
| `SpectrumCanvas/` | **inline in the SFC** (`:77-200`, ~95 L: capture bookkeeping, rAF coalescer, gate wiring, debug) | lifted → `composables/useSpectrumPlateStyle.ts` |

Neither concern has one home, and both lifts are justified in their headers by the *same* reason —
"keeping the SFC under the 400-LoC cap" (`useSliderTouchGates.ts:2-4`, `useSpectrumPlateStyle.ts:2-4`).
The seam was chosen by line count, not by concept. That is why the same three concerns ended up on
opposite sides of it.

Consequence, measured: `grep -rln "picker-color\|PICKER_CHANNELS\|withChannel" test/` returns two
files, and **nothing** under `test/` or `demo/test/` covers `spectrumLuma`, `useSpectrumPlateStyle`,
or the spectrum gesture path. `spectrumLuma()` is a two-line pure function and
`useSpectrumPlateStyle` is a pure computed factory — both trivially unit-testable — yet the only
things that exercise them are full-browser e2e specs. The gesture cluster, being inline in an SFC
that hard-asserts two injections (`inject(COLOR_MODEL_KEY)!`, `inject(POINTER_DEBUG_KEY)!` —
`SpectrumCanvas.vue:50,52`, no fallback, unlike `ColorSpaceSelector.vue:142`'s
`inject(COLOR_MODEL_KEY, null)`), cannot be mounted at all outside `ColorPicker`.

*(Hypothesis, not reproduced: mounting `SpectrumCanvas` without providers throws
`TypeError: Cannot destructure property 'model' of 'undefined'` at `:45-50`. I could not construct
the repro without writing under `test/`, which this seat may not do.)*

---

## L-13 · INFO — the plate announces HSV *value* as "lightness", and models a space the user did not pick

`useSpectrumPlateStyle.ts:27`:

```js
return `Color spectrum, saturation ${sPct}%, lightness ${vPct}%`;
```

`dotPos.v` is HSV **value**, not lightness — different quantities. Live accessible name in the
captured state (`docs/tranches/V/megatranche/audit/visual/REPORT.json`, route `/#/`, space `lab`):

```
"ariaLabel": "Color spectrum, saturation 63%, lightness 100%"
```

At `v = 1` the plate's top row runs white→fully-saturated-hue; announcing that as "lightness 100%"
tells a screen-reader user the color is white. It is not.

Underneath it: the plate is a fixed sRGB/HSV field (`hsl(H,100%,50%)` + black overlay) regardless
of the picker's selected space. The captured state has the user in **Lab** with Lab sliders, while
the 2D field models HSV and round-trips every drag through `withChannel(HSV,…)` →
`setCurrentColor(hsv, selectedColorSpace)` (`SpectrumCanvas.vue:127-129`). The component is an HSV
instrument named and presented as *the* spectrum. That naming is the same defect class as L-4 — a
module labelled for something other than what it owns. Say "value" in the label, and name the
component for the field it actually is.

---

## 2. The greenfield lattice

No legacy, no compat, stated concretely.

**Tier 1 — `@mkbabb/value.js` (published).** The library owns every fact about a color space.
`./color` gains the generic surface it already implements privately: `SPACE_SCHEMA`, `SPACE_IDS`,
`makeColor`, `isAnyColor`, and a new `src/color/channels.ts` (~40 lines, lifted verbatim out of
`picker-color.ts`) exporting `channelRange`, `channelNumber`, `normalizedChannel`, `withChannel`,
`withNormalizedChannel`, `withAlpha`. Nothing about channel addressing is picker-specific. Kills
L-2 and half of L-1.

**Tier 2 — `@mkbabb/glass-ui` (design system).** Owns the *gesture*, because the gesture is generic
and glass-ui already owns half of it:

```ts
// @mkbabb/glass-ui/dom
export function useField2dPointer(opts: {
    el: Ref<HTMLElement | null>;
    onChange: (u: number, v: number) => void;   // both normalized 0..1, v upward
    inactiveTouchAction?: string;
}): { classes: ComputedRef<string[]>; isDragging: Ref<boolean> };
```

Internally: `useTouchGate` (already exists) + pointer capture with safe release + rAF coalescing +
`getBoundingClientRect` normalization + the `touch-action` write. It also returns the
`touch-gate-*` class binding, so the CSS contract lives in glass-ui's stylesheet where its state
machine lives. Kills L-3, L-9, L-11, and 95 of SpectrumCanvas's 272 lines. Both spectrum pickers
consume it — kills the rest of L-1.

Relayed to the glass-ui BH inbox per the standing fond (owner edict, 2026-07-12): this proposes a
new `dom` composable + a stylesheet addition in glass-ui 7.x.

**Tier 3 — `demo/`.** Two files, one concept per file:

```
demo/picker/controls/ColorField/
    ColorField.vue     ~95 L   template + useField2dPointer binding + the model write
    plate.ts           ~45 L   pure: plateGradient(hue), plateLuma(s,v), plateFieldIsLight(s,v),
                               dotPosition(s,v), fieldLabel(s,v)
```

`plate.ts` absorbs today's `spectrumLuma.ts` **and** `useSpectrumPlateStyle.ts` — they are one
concept ("the HSV plate's geometry and ink"), split today only by a LoC cap (L-12). Being pure
functions with no Vue dependency, they are unit-testable without a browser, closing the coverage
hole. The gradient is built with `serializeCssColor` (L-10).

`ComponentSliders`' thumb-needle contrast, the surviving external consumer of `spectrumFieldIsLight`,
should not import a plate function at all — "which ink reads on this color" is
`safeAccentColor`, already published on `@mkbabb/value.js/color`. Then `plate.ts` has exactly one
consumer and the shared-helper module stops needing to exist.

**Deletions this lattice forces:** `demo/ui/` (19 files, L-8) · `MiniColorPicker.vue`'s 36 lines
of hand-rolled color math and its whole plate (L-1) · `picker-color.ts`'s `PICKER_CHANNELS`,
`CSS_PICKER_SPACES`, `buildColor` (L-2, ~90 lines) · the eight `@mkbabb/value.js*` entries in
`tsconfig.demo.json#paths` (L-5) · `usePointerDebug`'s hardcoded selector list (L-6) · three dead
`--gamut-*` tokens (L-4).

Net: roughly **−400 demo lines, +85 library lines**, one home per concept, and the demo's imports
become lines a real consumer could write — which is the only thing that makes the demo a proof of
anything.

---

## 3. Where the negative is proved

Stated because a finding-only report is not an audit:

- **No deep-path import into value.js internals.** `grep -rhn 'from "@mkbabb/value.js[^"]*"' demo/`
  returns 49 imports across exactly 5 specifiers, every one a real key in `package.json#exports`
  (`/color` 24, `/css` 10, `/math` 6, `/easing` 5, `/quantize` 4). No `@src/*`, no `../../src/`,
  no `dist/` reach-through from this component or anywhere in `demo/`. The T.W1 dogfood keystone
  holds at the specifier level. (What is on the other end of those specifiers is L-2.)
- **`verbatimModuleSyntax` is clean.** `SpectrumCanvas.vue:36-43` — all eight are value imports
  (injection-key symbols are values). `useSpectrumPlateStyle.ts:8` uses inline `type ComputedRef`,
  `:10` inline `type PickerColorIn`, `:12` `import type`. Compliant.
- **Vue 3.5 idioms are correct.** `useTemplateRef` at `:56` (not the legacy `ref` + matching name).
  No props, so no destructure question. No `defineModel` round-trip, because the component reads
  an App-owned `ShallowRef` through `COLOR_MODEL_KEY` — the S.W2 transposition, which is the right
  shape and removes the stale-read hazard entirely.
- **Animations were moved, not deleted.** The `field-paint-in` keyframe (`SpectrumCanvas.vue:243-257`)
  is scoped and PRM-gated, which edict 6 explicitly permits. Live-confirmed running:
  `"animationName": "field-paint-in-ad23e00d"`.
- **a11y is right in the hard place.** `role="img"` with a reactive `aria-label`, not a bogus
  `role="slider"` — correct for a 2D field. The visual audit's `smallTapTargets` rows for route
  `/#/` (8 desktop / 8 mobile) name the slug buttons and channel spans; **the spectrum plate is
  not among them** in any of the four matrices. Zero page errors, zero horizontal overflow, zero
  blank captures on this route. The label's *wording* is L-13; its *presence and mechanism* are
  correct.
- **The rAF is gated.** Against the named "ungated-rAF epidemic": `scheduleSpectrumUpdate`
  (`:97-108`) coalesces to one frame via a null-guard, `stopDragging` cancels (`:195-198`), and
  `onUnmounted` cancels again (`:217-224`). It is a one-shot coalescer, not a self-perpetuating
  loop. No defect.

---

## 4. Reproduction assets

Scratch scripts, re-runnable, outside the repo:

```
/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-.../scratchpad/
    dup.mjs     L-1 — MiniColorPicker's HSV→hex vs dist/subpaths/color.js over 10,830 samples
    tbl.mjs     L-2 — parses SPACE_SCHEMA and PICKER_CHANNELS from source, diffs the tables
    probe.mjs   L-3/L-4/L-9/L-13 — playwright: matched CSS rules, computed style, canvas count,
                inline style, dot geometry, accessible name, dev module graph
```
