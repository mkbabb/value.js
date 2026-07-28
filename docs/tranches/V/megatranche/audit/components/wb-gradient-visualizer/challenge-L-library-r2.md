# CHALLENGE-L — library structure · round 2 (independent seat) · `GradientVisualizer.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5 seat,
matching the explicit declaration this seat was spawned with. Not an inherited or undeclared seat.

- **Axis**: CHALLENGE-L — the library structure underneath the component is wrong (module
  boundaries / ownership / dependency direction / public surface).
- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 L).
- **Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict**: **DEFECTIVE.**

## Standing on r1

`challenge-L-library.md` (39,252 B, an earlier Opus 5 seat) already carries L-1..L-17 on this axis.
I worked independently and did **not** read it until my own evidence was collected. Per E-3 this is
an **addendum, not a patch** — r1 is not superseded and nothing in it is rewritten.

The reconciliation is at the end (§Reconciliation). The headline: **r1 missed a live BLOCKER — one
click on `/#/gradient` from its landing state destroys the entire application** — and r1's negative
proof **N-1 is a false negative** on the declaration half of the published-surface question.

---

## R2-1 · **BLOCKER** — the eased-ramp concept has no owner; *three* demo copies exist; all three crash on value.js's own shipped presets, and the crash erases the whole app

This is the defect the axis exists to find: a concept with no home, re-implemented by the consumer,
with the re-implementations violating a library contract that nobody owns enforcing.

### The seam that nobody owns

`@mkbabb/value.js/easing` legitimately emits easing outputs **outside `[0,1]`** — CSS-conformant,
and value.js **ships** exactly such presets:

`src/easing.ts:62-64`
```ts
"ease-in-back":     [0.6,   -0.28,  0.735, 0.045],
"ease-out-back":    [0.175,  0.885, 0.32,  1.275],
"ease-in-out-back": [0.68,  -0.55,  0.265, 1.55],
```

`@mkbabb/value.js/color`'s `mixColors` legitimately **rejects** progress outside `[0,1]`
(`color_progress_out_of_range`).

Both contracts are correct in isolation. Their **composition** — "the colour of an eased ramp at
parameter t" — is a real, nameable capability that value.js does not publish. So the demo owns it,
**three times**:

| # | site | shape |
|---|---|---|
| A | `composables/useGradientCSS.ts:175-216` `sampleCoalescedStops` | discrete, 32 sub-stops; inlines `parseColorIn` + `mixColors` |
| B | `GradientVisualizer/GradientVisualizer.vue:64-88` `colorAtPosition` | continuous, per-position; via `interpolateStopColors` |
| C | `GradientVisualizer/easing/useSpecimenRows.ts:52-59` | single midpoint `fn(0.5)`; via `interpolateStopColors` |

`useGradientCSS.ts:4` asserts the module *"owns the ONE sampling law (`sampleCoalescedStops`)"*.
It owns one of three. (r1's L-5 found A and B; **C is new** — the specimen row's ink derivation is a
third independent walk, and it is the one that fires first on the reproduction below.)

### Reproduction A — headless, deterministic, against the real modules

`vite-node`, script at `…/scratchpad/repro-back.mts`:

```
### ease-in-back = cubic-bezier(0.6, -0.28, 0.735, 0.045)
   eased outputs: 0.0000 -0.0427 -0.0754 -0.0944 -0.0935 -0.0636 0.0091 0.1437 0.3584 0.6531 1.0000
   min/max: -0.0944 1.0000
   serializeCoalescedGradient (the render tile + CSS block): THROWS → Gradient color mix failed: color_progress_out_of_range
   serializeRailRamp (the editing rail):                     THROWS → Gradient color mix failed: color_progress_out_of_range
   colorAtPosition-equivalent (the add ghost):               THROWS → Gradient color mix failed: color_progress_out_of_range

### ease-out-back = cubic-bezier(0.175, 0.885, 0.32, 1.275)
   min/max: 0.0000 1.0858
   serializeCoalescedGradient: THROWS   ·   serializeRailRamp: THROWS

### ease-in-out-back = cubic-bezier(0.68, -0.55, 0.265, 1.55)
   min/max: -0.0927 1.0921
   serializeCoalescedGradient: THROWS   ·   serializeRailRamp: THROWS   ·   colorAtPosition: THROWS
```

Throw sites: `useGradientCSS.ts:207` and `useGradientInterpolation.ts:37`. Both sit **inside Vue
`computed`s** (`coalescedCSS` / `railRampCSS`, `useGradientCSS.ts:325-327`), so the throw surfaces
during render, not in an event handler where it could be caught.

### Reproduction B — LIVE, real WebKit, the running dev server

The `back` family is **in the shipped UI**. `easing/easingCatalogue.ts:13` states the catalogue
*"IS value.js `bezierPresets`"*; `easingCatalogue.ts:174`:
```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
```

Enumerated live on `http://localhost:9000/#/gradient` (`…/scratchpad/live-back.mjs`, `webkit`):
```
["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine",…,"ease-in-circ","ease-out-circ",
 "ease-in-out-circ","ease-in-back","ease-out-back","ease-in-out-back","steps","step-start","step-end"]
```

One `click()` on `[data-specimen="ease-in-back"]`, from the pane's **default landing state**:

```
errors BEFORE click: { pageErrors: 0, consoleErrors: 1 }   ← the 1 is the known dev VITE_API_URL notice
after state: {
 "bodyText": 141,        ← was 611  (matches audit/visual/REPORT.json /#/gradient bodyTextLength: 611)
 "tile": null,           ← the render tile is gone
 "cssBlockText": "This panel hit an unexpected error.\n\nGradient color mix failed: color_progress_out_of_range\n\nTry again"
}
```

Screenshot after the click (`…/scratchpad/after-back-click.png`): **the entire application is a
bare "Try again" pill on the aurora.** Dock gone. Both panes gone. The picker gone. The palettes
pane gone.

**Zero setup clicks. One trigger click. Reachable from the landing state of `/#/gradient`.**

### Why the blast radius is total — R2-2 below

`demo/color-picker/App.vue:47-50` places **one** `<ErrorBoundary>` *outside* `pane-container`, so a
throw in any single pane's computed erases every pane plus the dock. The boundary sits one layer too
high in the lattice.

### Additional exposure vectors

- **Drag-authoring.** glass-ui's `useEasingPicker.d.ts:63-64` exposes
  `viewBox: ComputedRef<{minY, height}>` documented as *"clamping overshoot"* — proof that
  authoring an overshooting curve by dragging a bezier handle is a **first-class glass-ui
  affordance**. The crash is therefore reachable by drag as well as by preset. (Not separately
  reproduced — **hypothesis**, but the affordance is documented in the producer's own types.)
- **Picker default seed.** `useEasingPicker.d.ts:29-30` documents `initialPreset` default =
  **`"ease-out-back"`** — one of the three crashing curves. `EasingAuthoringStage.vue:76-82` binds
  `:model-value` (controlled), which likely masks it; any *uncontrolled* `<EasingPicker>` seat in
  this tree boots straight into the crash. **Hypothesis**, evidence is the cited default.

### Mechanism

No home for eased-ramp evaluation → triplicated demo implementation → the `easing → mix` progress
adapter belongs to nobody → every copy forwards a value into a `Result`-returning library function
and then asserts `.ok` away. Three copies, one bug, three times.

### Cure — transposition

value.js grows the capability it is already 90 % of the way to owning. New `src/gradient/ramp.ts`,
published at `@mkbabb/value.js/gradient`:

```ts
export interface RampStop { readonly color: AnyColor; readonly position: number }
export interface RampSpan { readonly easing: EasingFunction }

export function sampleRamp(
  stops: readonly RampStop[], spans: readonly RampSpan[], opts: MixOptions,
): Result<readonly RampSample[], RampError>;

export function rampColorAt(
  stops: readonly RampStop[], spans: readonly RampSpan[], position: number, opts: MixOptions,
): Result<AnyColor, RampError>;
```

`sampleRamp` owns the one decision the demo has nowhere to put: **what an eased `t` outside `[0,1]`
means for a colour mix.** Two honest answers; the library must pick one and name it —

- **clamp** (`t → clamp(t, 0, 1)`) — matches how a browser rasterises an overshooting native
  gradient, and is almost certainly the right default; or
- **extrapolate** — unclamped mix in the working space, which is what a motion-design tool would
  want and which value.js could offer as an opt-in `overshoot: "clamp" | "extend"`.

Either is defensible. *Silently forwarding it into a `Result` whose `.ok` is then thrown on* is not.

Once it exists: A, B and C all delete and become calls; the three-way divergence (r1 L-5, and R2-6
below) cannot exist; and one fix serves every future consumer. Per r1's own greenfield section this
lands alongside `parseGradient` / `serializeGradient` — see R2-3.

---

## R2-2 · **MAJOR** — the `ErrorBoundary` wraps the whole pane grid, so any one pane's throw is a whole-app outage

`demo/color-picker/App.vue:47-50`
```html
<main class="pane-main" aria-label="Color tool panes">
<ErrorBoundary message="This panel hit an unexpected error.">
<div ref="paneContainer" :class="['pane-container', …]">
```

The boundary's own comment claims pane granularity — *"a pane render throw surfaces the
focus-managed, SR-announced boundary IN PLACE of the grid"* — and "in place of the grid" is exactly
the defect: the grid is both panes plus, in effect, the dock's context. Screenshot evidence under
R2-1: a gradient computed throwing removes the picker and the palettes pane, neither of which is
implicated.

- **Reproduction**: R2-1 Reproduction B, screenshot `…/scratchpad/after-back-click.png`.
- **Mechanism**: fault-isolation boundary placed at the composition root rather than at the unit of
  independent failure. `demo/shell/PaneSlot.vue` already exists and is the correct altitude.
- **Cure**: one `<ErrorBoundary>` **inside** `PaneSlot`, per slot. A gradient defect then costs the
  gradient pane and nothing else. This is a two-line move and it converts every future BLOCKER on
  this axis into a MAJOR.

---

## R2-3 · **MAJOR** — 635 lines of framework-free, library-grade gradient code live in `demo/`, and the *library's own* test suite already votes that they are library code

r1's greenfield section proposes moving `gradientParse.ts` up. I add the measurement that makes it
non-optional: **the tests have already migrated, the code has not.**

```
$ grep -rln "gradient" src/
(no output)
```

`src/` has zero gradient support. Meanwhile:

- `composables/gradientParse.ts` — 301 L, pure, **zero Vue imports**, built entirely on
  `@mkbabb/value.js/css` (`gradientParse.ts:21`).
- `composables/useGradientCSS.ts` — 334 L, of which only the last 25 (`useGradientCSS`, 310-334)
  touch Vue.

And both are unit-tested from the **library's** mirrored suite, not the demo's:

```
test/gradient-parse.test.ts:10   import { parseGradientCSS } from "../demo/workbenches/gradient/composables/gradientParse";
test/gradient-parse.test.ts:11   import { serializeGradient }  from "../demo/workbenches/gradient/composables/useGradientCSS";
test/gradient-v4-consume.test.ts:4-8  easingFnOf, linearInterval, sampleCoalescedStops, serializeCoalescedGradient
```

`vitest.config.ts` `include: ["test/**/*.ts", "demo/test/**/*.ts"]`, with `test/` documented as
mirroring the `src/` shape (`test/units/color/…`, `test/parsing/…`). Eleven `test/*.ts` files reach
across into `demo/`; two of them are these. A test file in the library's suite importing
`../demo/workbenches/gradient/composables/…` is the lattice telling you where the code belongs.

- **Reproduction**: the two greps above.
- **Mechanism**: capability recognised as library-grade *after* it was built in a leaf feature; the
  tests were placed correctly and the source never followed.
- **Cure**: `src/gradient/{parse,serialize,ramp,model}.ts` + `exports += "./gradient"`; tests move
  to `test/gradient/`. `demo/workbenches/gradient/composables/` drops **884 → ~80 lines** (only
  `useGradientModel`'s Vue reactivity survives). `test/` stops reaching into `demo/`.

---

## R2-4 · **MAJOR** — `tsconfig.demo.json` `paths` has drifted five rows from `package.json#exports`, and the gate that should catch it is structurally blind

**This corrects r1's N-1**, which declared the published-surface question SOUND. r1 verified the
*import* half and it is right about that. The *declaration* half is broken.

`package.json` `exports` (value 4.0.0) — **seven** keys, **no `.` root**:
```
./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
```

`tsconfig.demo.json` `paths` declares **eight**:
```
@mkbabb/value.js  /color  /parsing  /math  /easing  /units  /transform  /quantize
```

Measured against disk:
```
$ ls dist/subpaths/
color.d.ts color.js  css.d.ts css.js  easing.d.ts easing.js  math.d.ts math.js
quantize.d.ts quantize.js  transform.d.ts transform.js  value.d.ts value.js
$ ls dist/index.d.ts
dist/index.d.ts MISSING
```

Five-row drift:

| row | state |
|---|---|
| `"@mkbabb/value.js": ["./dist/index.d.ts"]` | **dead** — key not exported *and* file does not exist |
| `"@mkbabb/value.js/parsing"` | **dead** — no such export, no such `.d.ts` |
| `"@mkbabb/value.js/units"` | **dead** — no such export, no such `.d.ts` |
| `@mkbabb/value.js/css` | **missing** — yet used at **10 demo sites** |
| `@mkbabb/value.js/value` | **missing** |

The missing `/css` is the most load-bearing subpath in *this component's own graph*:
`useGradientCSS.ts:25,28` (`parseTimingFunction`, `CssLinearStop`, `CssTimingFunction`),
`gradientParse.ts:21` (`parseCssColor`, `parseCssScalar`),
`color-session/picker-color.ts:27` (`parseCssColor`, `serializeCssColor`, `CssColor`, …).

So the subpath this component depends on most resolves by a **different mechanism** than its four
siblings — package self-reference through `exports`, rather than a `paths` mapping — and nothing
declares that.

The gate cannot see it. I ran it:
```
$ node_modules/.bin/vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0
```
Zero errors: the three dead entries are never exercised, and the two missing ones fall through to
self-reference. The tsconfig's own comment asserts *"the `exports` map is a CLOSED 8-key set"* —
stale by the 4.0.0 cut, and no mechanism will ever say so.

Note the asymmetry, which is the cure written down already: `vite.config.ts:37-50` **generates** its
alias set from `package.json#exports` and is therefore correct by construction, with a comment
explaining precisely why hand-rolling it failed before. The TypeScript side was left hand-rolled.

- **Reproduction**: the two `ls`, the two file reads, and the `vue-tsc` run above.
- **Mechanism**: two authorities for one fact (the published surface), one generated and one
  hand-maintained. The hand-maintained one has no failure mode — a wrong `paths` entry that nothing
  imports is invisible forever.
- **Cure**: delete the value.js `paths` block entirely and let package self-reference resolve all
  seven subpaths (`/css` already proves this works under `moduleResolution: bundler`). If a `paths`
  block must stay, generate it from `package.json#exports` the way the Vite alias is. One authority,
  zero drift surface. Then the r1 L-1 lattice rule can additionally ban any value.js specifier not
  in the map.

---

## R2-5 · **MAJOR** — the component types glass-ui's emit with reka-ui's wider union, because glass-ui does not export its own

`GradientVisualizer.vue:28`
```ts
import type { AcceptableValue } from "reka-ui";
```
used three times, each with a downcast:
```
:164  @update:model-value="(v: AcceptableValue) => type = v as GradientType"
:181  @update:model-value="(v: AcceptableValue) => interpolationSpace = v as PickerSpace"
:198  @update:model-value="(v: AcceptableValue) => hueMethod = v as HueInterpolationMethod"
```

What glass-ui actually emits — `dist/components/select/Select.vue.d.ts`:
```ts
export interface SelectEmits { "update:modelValue": [value: SelectionValue]; "update:open": [value: boolean] }
```
`dist/components/_shared/selection.d.ts:2` → `export type SelectionValue = string | number;`

What the demo annotates — `reka-ui/dist/index3.d.ts:231`:
```ts
type AcceptableValue = string | number | bigint | Record<string, any> | null;
```

**Three union members wider than any value that can arrive.** The `as GradientType` cast therefore
bridges a gap that does not exist — and worse, the demo has substituted **reka-ui's contract for
glass-ui's**. Because a wider handler parameter always passes contravariantly, a change to glass-ui's
emit type would produce no diagnostic anywhere in the demo.

Root cause is a producer public-surface hole, verified:
```
$ grep -rln "SelectionValue" node_modules/@mkbabb/glass-ui/dist/ | grep -v components/
(no output)
```
`SelectionValue` is exported from **no** glass-ui public entry — not the root, not `./select`
(`components/select/index.d.ts` re-exports `SelectEmits`/`SelectProps` but not the type they are
built from). The correct import is **unwritable**, so every consumer reaches past the design system
into its transitive primitive instead.

Fan-out: **16 `AcceptableValue` sites across 4 demo files** (`GradientVisualizer.vue` ×4,
`MixConfigBar.vue` ×4, `GenerateControls.vue` ×3, `AuroraPane.vue` ×5); `reka-ui` is a
**devDependency**, so the demo type-depends on a package it does not declare as a runtime dep.

- **Reproduction**: the four cited `.d.ts` line references and the `grep` above.
- **Mechanism**: a design-system component whose emit type is not part of its published surface.
  The consumer cannot name the value it receives, so it names a structurally-compatible foreign type.
- **Cure**: BH relay, two items. (a) glass-ui exports `SelectionValue` (and its file-mates
  `CheckedState`, `SelectionMode` — same hole) from `./select` and the root. (b) Better: make
  `Select` **generic over its value type**, so `<Select v-model="type">` infers `GradientType` and
  all three casts vanish. Demo side, after: delete the reka-ui import at all 16 sites and add
  `reka-ui` to the r1 L-1 lattice's ban list — `demo/workbenches/**` must not reach glass-ui's
  transitive primitives.

---

## R2-6 · **MAJOR** — the barrel r1 found is worse than r1 measured: 7 of its 9 re-exports have *zero* consumers

r1 L-7 correctly nails the `INTERPOLATION_SPACES` three-hop chain. The barrel it lives in is
mostly dead weight on top of that.

`composables/useGradientModel.ts:19-29`
```ts
// ── Re-exports (preserve public API surface) ──
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export { serializeGradient, serializeCoalescedGradient, serializeRailRamp, linearInterval } from "./useGradientCSS";
export { parseGradientCSS } from "./gradientParse";
export type { GradientParseResult, ParsedGradientModel } from "./gradientParse";
```

I enumerated every importer of `useGradientModel` programmatically (regex over all `demo/`,
`test/`, `e2e/` `.ts`/`.vue`, resolving each specifier):

| importer | symbols taken |
|---|---|
| `GradientStopEditor.vue:4` | `type GradientStop` |
| `GradientEasingEditor.vue:40` | `type GradientInterval, GradientModelState, GradientStop` |
| `GradientVisualizer.vue:21` | `useGradientModel, INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS` |
| `GradientVisualizer.vue:22` | `type GradientType` |
| `composables/useGradientCSS.ts:34` | `type GradientModelState, GradientInterval` |
| `composables/gradientParse.ts:27` | `type GradientType, GradientStop, GradientInterval` |
| `easing/easingCatalogue.ts:36` | `type GradientInterval` |
| `easing/useSpecimenRows.ts:21` | `type GradientInterval, GradientModelState, GradientStop` |
| `test/gradient-v4-consume.test.ts:10` | `type GradientModelState` |

**Seven re-exported symbols have zero consumers through the barrel**: `serializeGradient`,
`serializeCoalescedGradient`, `serializeRailRamp`, `linearInterval`, `parseGradientCSS`,
`GradientParseResult`, `ParsedGradientModel`. Every real consumer already imports them from their
actual home (`test/gradient-parse.test.ts:10-11`, `test/gradient-v4-consume.test.ts:4-8`).

So the block labelled *"preserve public API surface"* preserves a surface **nobody consumes**, and
its only live rows are the two r1 already condemned.

Secondary: `useGradientInterpolation()` itself (`useGradientInterpolation.ts:48-56`) is a
"composable" whose entire body is two `ref()`s and a return — a wrapper with no encapsulation, i.e.
contrivance under the KISS edict. Its two refs belong beside their siblings `type` / `direction` in
`useGradientModel`.

- **Reproduction**: the enumeration script over the import graph; each row above is a file:line.
- **Cure**: delete `useGradientModel.ts:19-29` whole (nothing breaks — measured), delete
  `useGradientInterpolation.ts:17`'s re-export per r1 L-7, and fold the two refs into
  `useGradientModel`. `interpolateStopColors` retires into `src/gradient/ramp.ts` per R2-1, at which
  point `useGradientInterpolation.ts` ceases to exist.

---

## R2-7 · **MINOR** — the two surviving sampling laws diverge by 24.3/255 even on a *smooth* easing

r1 L-5 measured 107/255 under `steps(4, jump-end)`, where a step discontinuity makes the
discretisation error maximal. I add the complementary datum: the divergence is not a step artefact.
`ease-in-expo` (`cubic-bezier(0.95, 0.05, 0.795, 0.035)`), sweeping 0→100 % at 0.25 %
(`…/scratchpad/divergence.mts`):

```
WORST divergence between the two laws:
{ "pos": 97.75, "d": 24.31,
  "comp": "oklch(66.088% 0.1767 251.94deg)",
  "rail": "rgb(18.7 148.5 248.8)" }        ← Euclidean sRGB distance, 0-255 scale
```

24 units on a smooth curve is plainly visible. `GradientVisualizer.vue:59-63` documents
`colorAtPosition` as *"feeds the stop editor's add ghost AND the color a bar-click mints"* — so the
ghost misreports the rail beneath it under **any** steep easing, not only stepped ones. Subsumed by
R2-1's single `rampColorAt`.

---

## R2-8 · **MINOR** — `defineModel("selectedStopId")` is a phantom two-way contract

`GradientVisualizer.vue:51`
```ts
const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });
```

The only mount site is `GradientPane.vue:25`:
```html
<GradientVisualizer ref="visualizerRef" />
```
— no `v-model:selected-stop-id`, no props at all.

`defineModel` declares a `selectedStopId` **prop** and an `update:selectedStopId` **emit** on the
public surface that nothing binds and nothing listens to. It degrades to local state and works,
which is why it survives — but the component advertises a parent contract that does not exist, and
per the recorded `shallowRef`/`defineModel` caveat in project memory, a future parent that *did*
bind it would inherit the async round-trip stale-read hazard for free.

- **Cure**: `const selectedStopId = ref<string | null>(null)`. Lift it deliberately if and when a
  parent genuinely needs it.

---

## R2-9 · **MINOR** — the route's one nameless button is this component's Copy control, and `title` is an *undeclared fallthrough attribute*

r1 L-10 correctly identifies `DockControl` misuse via the token-scope angle. I add the precise
accessible-name mechanism and the fleet census.

The visual audit reports exactly 1 `namelessButtons` on `/#/gradient` in all four matrices
(`audit/visual/REPORT.md` §namelessButtons; `REPORT.json`
`results[].probe.a11y.namelessButtons`). Identified live (`…/scratchpad/probe-l.mjs`, webkit):

```json
{ "totalButtons": 49,
  "nameless": [{ "cls": "dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact",
                 "title": "Copy CSS", "rect": { "x": 658, "y": 791, "w": 28, "h": 28 } }],
  "copy":     [{ "title": "Copy CSS", "aria": null, "text": "" }] }
```

Source: `GradientVisualizer.vue:254` — `<DockControl compact title="Copy CSS" @click="copyCSS">`.

The mechanism: **`title` is not a declared prop.**
`dist/components/dock/DockControl.vue.d.ts` `__VLS_Props` lists exactly
`shape · compact · active · type · disabled · as · asChild · class` — no `title`, no `label`. It
lands on the `<button>` as a Vue fallthrough attribute, giving a tooltip and a last-resort accname
that the audit probe (and most AT users' first pass) does not honour.

Every other control in this same component is labelled correctly and consistently:
`aria-label="Gradient type"` (:165), `"Interpolation space"` (:182), `"Hue interpolation"` (:199),
`"Gradient direction"` (:232), and the render tile carries `role="img"` + `aria-label` (:221-222).
The Copy control is the one that reached for an undeclared attribute.

Fleet census — it is a pattern, not a slip: **19 `<DockControl>` call sites in `demo/`, only 3 with
`aria-label`**; the rest label by `title` fallthrough (`MixResultDisplay.vue:123,130,138`,
`ExtractControls.vue:41,50,85`, `ImageEyedropper.vue:11,46,53`, `ExtractWorkbench.vue:52`, …).

- **Cure**: BH relay — `DockControl` is icon-only by construction and must declare a first-class
  `label` prop applied as `aria-label` (optionally *also* surfaced as a tooltip). This composes with
  r1 L-10's `IconButton` proposal: whichever primitive the six non-dock sites migrate to must carry
  the label affordance. Do **not** cure with a demo wrapper — that is the no-contrivance edict and
  would recreate `demo/ui/` (r1 L-6).

---

## R2-10 · **MINOR** — a dead cross-boundary DI edge at the component's mount point

`GradientPane.vue:6,8`
```ts
import { CSS_COLOR_KEY } from "../../color-session/keys";
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
```
`cssColorOpaque` appears nowhere else in the 29-line file — not the template, not the expose. It
survives because `<script setup>` bindings are implicitly template-exposed, so `no-unused-vars`
cannot see it.

`GeneratePane.vue:10` carries the identical dead binding. `MixPane.vue:15` is the honest case
(consumed at `:84`).

- **Reproduction**: `grep -n cssColorOpaque demo/workbenches/gradient/GradientPane.vue` → one hit,
  line 8, the declaration.
- **Mechanism**: a `provide`/`inject` edge kept alive by copy-paste across the three workbench panes;
  Vue's implicit template exposure makes it un-lintable.
- **Cure**: delete both. A DI edge nothing reads is a false statement about the lattice, and under
  r1 L-1's layer-tag rule it would be counted as a real `feature → session` dependency that isn't one.

---

## R2-11 · **INFO** — the clipboard split (r1 L-9) also ignores the producer's own subpath

Confirming r1 L-9 and adding the subpath datum. Both glass-ui helpers live at **`./dom`**
(`dist/composables/dom/useClipboard.d.ts:37`; `dist/dom.d.ts` → `export * from "./composables/dom"`),
and all 26 demo sites import them from the root barrel instead:

```
dist/glass-ui.js (root) : 25,239 B
dist/dom.js             :  4,179 B
```

`GradientVisualizer.vue:12` (`writeClipboard`) and `GradientEasingEditor.vue:29` (`useClipboard`)
are one file apart in the same directory, both from the root. Third path:
`picker/visual/PointerDebugOverlay.vue:112` raw `navigator.clipboard.writeText`.

- **Cure**: r1 L-9's standardisation on `useClipboard`, **plus** importing it from
  `@mkbabb/glass-ui/dom`.

---

## Reconciliation with r1

**Confirmed independently** (same conclusion, arrived at separately): r1 L-5 (dual sampling law — I
add a third copy and a smooth-easing datum, R2-7), L-6 (`demo/ui/*` = 19 pure alias barrels; I
measured 48 demo files through the barrels vs 82 direct, and confirm glass-ui ships `./select` +
`./slider`), L-7 (the `INTERPOLATION_SPACES` re-export chain and Mix's direct import; I add the 7
dead siblings, R2-6), L-10 (`DockControl` outside the dock; I add the undeclared-`title` mechanism
and the 19-site census, R2-9), L-11 (`Ref<any>` + `?.` shell chain — `usePaneRouter.ts:107-111`
`gradient: Ref<any>`, `:208-210` `?.copyCSS?.()`, verified `vue-tsc` exits 0 so a rename is
undetectable), L-4 (the `easingFnOf` fallback is unreachable — confirmed via
`useEasingPicker.d.ts:18` `readonly fn: EasingFn` required; ~65 lines dead in the browser).

**Correction to r1.** r1's **N-1** ("value.js is consumed through the published subpath export map,
exclusively") is right about *imports* and wrong as a negative proof for this axis. The
**declaration** side has drifted five rows, one of them a `paths` entry pointing at a file that does
not exist, and the missing `/css` row is the subpath this very component depends on most — see
**R2-4**. r1's N-2 (`verbatimModuleSyntax`) I independently confirm: the subject's four type-only
imports (:22, :25, :26, :28) are all `import type`, and `vue-tsc -p tsconfig.demo.json --noEmit`
exits 0.

**New in r2, not in r1**: R2-1 (the BLOCKER), R2-2 (boundary blast radius), R2-3 (the library's own
test suite already votes), R2-4 (the `paths`↔`exports` drift), R2-5 (reka-ui / `SelectionValue`),
R2-6's dead-barrel measurement, R2-8 (phantom `defineModel`), R2-9's accname mechanism, R2-10
(dead DI edge), R2-11's subpath datum, and the third sampling-law copy in `useSpecimenRows.ts`.

**In r1, not re-derived here** (I did not independently verify these and defer to r1's evidence):
L-1 (orphaned `no-restricted-imports` globs pointing at the deleted `demo/@` tree), L-2 (the
72-module closure the `LIBRARY_PORT_KEY` import drags across the feature boundary — I confirm the
*edge* at `GradientVisualizer.vue:27` and the silent `if (!pm) return` masking fallback at :111, but
not the closure count), L-3 (the missing `/css`↔`/easing` round-trip halves and the `bezierLiteral`
mirror of glass-ui's private serializer), L-8 (the duplicated interpolation Select pair, Gradient
missing Mix's `PreviewRamp` chips), L-12 (`railRampCSS` recomputing on `direction`), L-13
(`.rail-btn`), L-14 (gh-pages empty build), L-15 (stale `debounce` rationale), L-16
(`InstanceType` ref vs `useTemplateRef`), L-17 (native `linear-gradient(in oklch …)` support).

---

## Negative results — checked, sound

- **Import-side published-surface discipline holds.** `grep -rn "@src/" demo/ --include=*.ts
  --include=*.vue` → **0**. `grep -rn 'from "@mkbabb/value\.js"' demo/` → **0** (correct: `exports`
  has no `.`). Subpath usage `/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4 —
  all real map members. Every library import this component makes is one a real npm consumer could
  write verbatim.
- **glass-ui 7.0.0 uses only value.js subpaths**, so the stale tsconfig comment about aliasing a
  bare root specifier is inert: `grep` over `dist/*.js` → `/color` ×5, `/css` ×3, `/easing` ×1, no
  bare root.
- **Feature-internal data flow is correct.** `useGradientModel()` is called exactly once
  (`GradientVisualizer.vue:49`); child editors receive state by props and emit upward. Props-down /
  events-up holds inside the tree.
- **Animations edict not engaged.** `<style scoped>` (:266-278) declares a paint stack only; no
  keyframes moved or deleted.
- **`REPORT.json` `bleeding` rows are a probe artefact, not a defect.** `div.strip-row`,
  `div.strip-family`, `.family-tiles`, `button.glass-chip.glass-capsule` are
  `EasingSpecimenStrip`'s horizontal-scroll content measuring past the viewport;
  `capture.mjs:107-111` uses a bare `getBoundingClientRect().right > clientWidth` test that does not
  model scroll containers. `overflowX` is **0** on all four matrices and the strip renders correctly
  in `shots/safari-desktop-light/gradient.png`.
- **Named historical suspects are absent from this graph.** `ActionBarLayer`'s local
  `useLayerTransition`, `demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers`,
  and the three parallel `useDark` stores (`useMarkdownHighlighting.ts:76`) are all outside the
  13-file gradient tree. Nothing substitutes for them; they are simply not here.

---

## Strongest defect

**R2-1.** value.js ships `ease-in-back` / `ease-out-back` / `ease-in-out-back` (`src/easing.ts:62-64`),
whose eased output leaves `[0,1]`. value.js's `mixColors` rejects progress outside `[0,1]`. The
composition of those two capabilities is a real concept the library does not own, so the demo owns it
three times (`useGradientCSS.ts:175`, `GradientVisualizer.vue:64`, `useSpecimenRows.ts:52`) and all
three violate the contract. The demo then **catalogues the crashing presets as clickable tiles**
(`easingCatalogue.ts:13,174`). One click on `[data-specimen="ease-in-back"]` from the landing state
of `/#/gradient` throws `color_progress_out_of_range` inside a Vue computed and — because the single
`ErrorBoundary` sits outside the whole pane grid (`App.vue:47-50`) — **replaces the entire
application with a "Try again" pill.** Verified live in WebKit against `http://localhost:9000`:
body text 611 → 141, render tile `null`, screenshot captured.

Not a bug to patch at the throw site. The cure is the transposition: `@mkbabb/value.js/gradient`
owns `sampleRamp` / `rampColorAt` and names, **once**, what an eased `t` outside `[0,1]` means for a
colour mix.
