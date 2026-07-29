# CHALLENGE-L — library structure under `EasingAuthoringStage.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was explicitly spawned
with. Declared, not inherited.

- Subject: `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (117 lines)
- Repo/HEAD: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface
- Verdict: **DEFECTIVE** (2 BLOCKER, 4 MAJOR, 3 MINOR)

---

## 0. What the seat actually is

117 lines that render exactly one child — glass-ui's `<EasingPicker>` — plus three "seat laws"
imposed from outside the producer:

| law | mechanism | file:line | live status |
|---|---|---|---|
| 1 — one column | `:deep([data-testid="easing-picker"]) { grid-template-columns: 1fr }` | `:88-90` | **LIVE** (measured `grid-template-columns: 436px`) |
| 2 — wells, not cards | `:deep(.glass-card) { … box-shadow: none; backdrop-filter: none }` | `:93-99` | **LIVE** (measured `box-shadow: none`) |
| 3 — zero letterbox (O-17) | `syncVbRatio()` DOM scrape + `--vb-ratio` + `:deep(svg[role="img"])` | `:44-67, :74, :104-115` | **DEAD** — selector matches 0 elements |

Every one of those three mechanisms reaches *through* the package boundary into glass-ui's private
DOM. That is the axis defect, and one of the three has already silently died from it.

---

## L-1 · BLOCKER — no library home for "an eased colour mix"; the seat's own emission kills the pane

**The defect.** `@mkbabb/value.js/easing` legitimately emits values outside `[0,1]` (overshoot
curves: `ease-out-back` has `y2 = 1.275`, `ease-in-back` has `y1 = -0.28` — `src/easing.ts:62-64`).
`@mkbabb/value.js/color` **rejects** exactly those values:

```
src/color/operations.ts:65   if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
src/color/operations.ts:90   if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
```

Two public subpaths of the *same library* have contradictory contracts at their composition point,
and the library provides no composition. The seam is therefore owned by the demo — which does not
adapt at all, it just throws:

```
demo/workbenches/gradient/composables/useGradientCSS.ts:202-207
    const easedT = easing(t);
    const mixed = mixColors(c0, c1, easedT, { space: interpolationSpace, hue: hueMethod });
    if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);

demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts:53-56
    const mid = interpolateStopColors(s0.cssColor, s1.cssColor, fn(0.5), …)
    → useGradientInterpolation.ts:37  throw new Error(`Gradient color mix failed: …`)
```

**Reproduction A — through the SUBJECT component (2 keystrokes).**
`node scratchpad/wbL-probe5.mjs` (Chromium, `http://localhost:9000/#/gradient`, storage cleared):
open the authoring disclosure, focus the picker's second bezier handle (`role="slider"`,
`aria-label="Bezier control point 2"`, starts at `y 1.000`), press `Shift+ArrowUp` twice.

```
FOCUSED handle2: true
[ { "press": 1, "heads": 1, "readout": "cubic-bezier(0, 0, 1, 1.1)", "detail": "· empty plate ·" },
  { "press": 2, "heads": 0, "readout": null,
    "detail": "Gradient color mix failed: color_progress_out_of_range" } ]
```

`heads: 0` = the entire gradient workbench pane is gone, replaced by `ErrorBoundary.vue`'s
"Try again" fallback. The boundary returns `false` from `onErrorCaptured`
(`demo/color-picker/ErrorBoundary.vue:59-69`), so **nothing reaches the console** — `page.on("console")`
and `page.on("pageerror")` captured zero entries for this crash. It is invisible to every
console-scraping gate, including `audit/visual/REPORT.json` (`/#/gradient` rows show `pageErr 0`,
`consoleErr 0` — the route is only ever loaded, never driven).

The threshold is exactly the contract boundary: `cubic-bezier(0,0,1,1.1)` peaks at
`max_t f(t) ≈ 0.996` → survives; `cubic-bezier(0,0,1,1.2)` peaks at `≈ 1.02` → `> 1` → throw.

**Reproduction B — the full catalogue matrix.** `node scratchpad/wbL-probe8.mjs` clicks each of the
27 specimen tiles with a hard reload between each:

```
TOTAL 27 CRASHED 3
CRASHED: ease-in-back, ease-out-back, ease-in-out-back   (all "Gradient color mix failed: color_progress_out_of_range")
OK: linear, ease, ease-in, ease-out, ease-in-out, ease-in-sine, ease-out-sine, ease-in-out-sine,
    ease-in-quad, ease-out-quad, ease-in-out-quad, smooth-step-3, ease-in-cubic, ease-out-cubic,
    ease-in-out-cubic, ease-in-expo, ease-out-expo, ease-in-out-expo, ease-in-circ, ease-out-circ,
    ease-in-out-circ, steps, step-start, step-end
```

11% of the shipped catalogue is a pane-destroying trap on first click. Recovery costs the user their
whole gradient: `wbL-probe6.mjs` shows "Try again" restores the pane with the model reset to
`cubic-bezier(0, 0, 1, 1)` — the authored work is discarded, not repaired.

Aggravating: glass-ui's own published default is one of the three fatal curves —
`node_modules/@mkbabb/glass-ui/dist/components/easing/constants.d.ts`:
`DEFAULT_BEZIER_PRESET: "ease-out-back"`. Any future seat that mounts `<EasingPicker>` without a
`modelValue` crashes this pane on mount.

**Mechanism.** Missing module. The concept "sample an easing function into colour space" has no home,
so it is performed ad hoc at two demo call sites with no shared law, against a library function whose
domain is narrower than the library function feeding it.

**Cure (transposition, not patch).** `src/color/ramp.ts` — a new first-class library module, public at
`@mkbabb/value.js/color`:

```ts
export function easedMix(a: AnyColor, b: AnyColor, t: number, easing: EasingFunction,
                         opts: MixOptions & { overshoot?: "clamp" | "extrapolate" | "error" }): Result<AnyColor, ColorIssue>
export function easedRamp(a: AnyColor, b: AnyColor, easing: EasingFunction, samples: number, opts): Result<readonly AnyColor[], ColorIssue>
```

`overshoot` defaults to `"clamp"` because CSS itself clamps easing output when interpolating
non-numeric values. One rule, one home, both demo call sites collapse to a single call, and the
`back` family becomes usable instead of fatal. Do **not** fix this by clamping in the demo — that
buries a library-contract mismatch in a consumer and leaves the next consumer to rediscover it.

---

## L-2 · BLOCKER — the seat styles and reads glass-ui's private DOM; the coupling already died silently

**The defect.** The subject file's only real content is three overrides that reach across the package
boundary. One of the three is now **dead**, and nothing noticed.

glass-ui 7.0.0's picker canvas, from the shipped bundle
(`node_modules/@mkbabb/glass-ui/dist/easing.js`, offset ~10535):

```js
h("svg", { ref_key: "svgEl", class: "block w-full touch-none select-none",
           viewBox: rt.value, preserveAspectRatio: "xMidYMid meet",
           style: { "aspect-ratio": "1", "block-size": "clamp(200px, 38cqi, 320px)", "margin-inline": "auto" },
           "aria-label": e.label, role: "group", … })
```

`role: "group"`. The seat targets `svg[role="img"]` — twice:

- `EasingAuthoringStage.vue:48-50` — `rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal`
- `EasingAuthoringStage.vue:104` — `.easing-authoring :deep(svg[role="img"]) { … }`

Grep of the whole shipped easing chunk returns `role: "group"`, `role: "slider"`, `role: "status"` —
`"img"` appears **0** times.

**Measured consequence** (`node scratchpad/wbL-probe7.mjs`, desktop 1440×900, `ease-in-sine` selected):

```json
{ "vb": [0, -0.1, 1, 1.2], "box": [410, 200], "drawn": [166.7, 200],
  "emptyInlinePx": 243.3, "pctEmpty": 59.3,
  "computedAspect": "1 / 1", "computedBlock": "200px", "par": "xMidYMid meet",
  "vbRatioVar": "1.2", "roleImg": 0 }
```

- `roleImg: 0` — the selector matches nothing.
- `computedAspect: "1 / 1"`, `computedBlock: "200px"` — the producer's inline clamp survives intact.
  The seat's `block-size: auto !important` and `aspect-ratio: calc(1 / var(--vb-ratio)) !important`
  never apply.
- **59.3% of the authoring canvas is empty letterbox** (243.3 px of 410 px). See
  `scratchpad/wbL-stage-letterbox.png`: the curve plot is a small square marooned in a wide well.
  This is precisely the O-17 "zero letterbox" law the file header (`:18-21`) says it enforces.
- `vbRatioVar: "1.2"` — `vbRatio` never moved off its hardcoded seed (`:45`). `syncVbRatio` early-returns
  on `if (!vb …) return` every time, so `onMounted` (`:62`), the `watch` (`:63-67`) and both
  `requestAnimationFrame` calls (`:58`, `:65`) are pure dead work on every keystroke of every drag.

**Provenance — it was certified, then a producer bump killed it.**

```
docs/tranches/U/audit/w-visual-close-artefacts.md:36
  zd3-easing (T-22/T-47) … O-17 seat laws measured (3 cells): zero letterbox (getScreenCTM 0/0/0/0),
  one column, box-shadow:none well, one bezier literal … CENSUS-GREEN (retires-with-the-O-17-cite)
```

```
$ git log --oneline -- demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)

$ git log --format='%h %ad %s' --date=short -S'"@mkbabb/glass-ui"' -- package.json | head -1
f2c8f565 2026-07-17 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface

$ git merge-base --is-ancestor a61094e3 f2c8f565 && echo YES
YES
```

The seat was authored against glass-ui 6.x, glass-ui 7.0.0 landed afterwards, the seat file was never
touched, and the census green is now stale. **No type, no test, no lint, no CI gate can see a
CSS attribute selector aimed at another package's DOM.** That is the structural indictment: the
dependency is real, load-bearing, and completely unchecked.

**Two further boundary crimes in the same block:**

- `:deep([data-testid="easing-picker"])` (`:88`) — a **test hook** used as a styling contract. It
  happens to still exist (`"data-testid": "easing-picker"` is in the shipped bundle), which is luck.
- `:deep(.glass-card)` (`:93`) — an internal producer class, restyled with demo-owned tokens
  (`--well-bg`, `--card-edge`, defined in `demo/styles/utils.css:57,97,105`). The demo is
  reaching in and repainting a design-system primitive from the outside. This is exactly what owner
  edict 4 ("variants/primitives belong in glass-ui") and edict 5 ("root-level styling, never
  per-instance overrides") forbid, and the `!important` pair (`:106-108`) is the tell.

**Cure (transposition).** The three laws are a *variant*, and variants live in glass-ui. Add to
`EasingPicker`:

```ts
layout?: "split" | "stacked"     // kills the lg: 18rem rail — law 1
surface?: "card" | "well" | "bare" // kills the .glass-card repaint — law 2
fit?: "square" | "viewbox"        // canvas aspect ≡ live viewBox — law 3, computed INSIDE the producer
                                  //   where `viewBox` is already a first-class ComputedRef
```

`useEasingPicker` already returns `viewBox: ComputedRef<{minY, height}>` — the producer *has* the
number the consumer is scraping out of the DOM with a rAF. With those three props the entire subject
file deletes: `GradientEasingEditor.vue` mounts `<EasingPicker layout="stacked" surface="well"
fit="viewbox" :readout="false" :playback="false">` directly. **117 lines → 6 attributes, and the
coupling becomes type-checked.** Relay via the standing glass-ui BH inbox law.

---

## L-3 · MAJOR — dependency inverted: the domain model is typed by the design system's widget payload

```
demo/workbenches/gradient/composables/useGradientModel.ts:49
    export type GradientInterval = EasingPickerValue;   // ← from "@mkbabb/glass-ui/easing"

demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:32-37
    const { value, label } = defineProps<{ value: EasingPickerValue; … }>();
        /** The interval truth; Glass owns exact two-way authoring. */
```

The comment states the inversion outright: "Glass owns". A gradient interval's easing is **domain
truth** — it is persisted, serialized to CSS, re-parsed, and sampled. Typing it as a UI widget's
v-model payload means:

- the gradient model cannot be constructed, tested, or serialized without importing a Vue
  component library;
- a glass-ui *minor* release that adds a field to `EasingPickerValue` changes the persisted
  domain shape;
- `EasingPickerValue.fn` (a live closure) is stored *in the model* (`useGradientModel.ts:136-139`),
  so the model is not serializable and `easingFnOf` needs a `fn ?? reparse` two-path fallback
  (`useGradientCSS.ts:120-133`).

value.js **already publishes the correct type**, and it is strictly more expressive:

```
src/css/types.ts:31-36
export type CssTimingFunction =
    | Readonly<{ kind: "keyword"; name: "linear"|"ease"|"ease-in"|"ease-out"|"ease-in-out" }>
    | Readonly<{ kind: "cubic-bezier"; x1: number; y1: number; x2: number; y2: number }>
    | Readonly<{ kind: "steps"; count: number; position: JumpPosition }>
    | Readonly<{ kind: "linear-function"; stops: readonly CssLinearStop[] }>;
```

exported at `@mkbabb/value.js/css` (`src/subpaths/css.ts`) alongside its parser `parseTimingFunction`.
`EasingPickerValue` is a lossy 6-field shadow of it (no `linear()`, no keyword identity, plus a
non-serializable closure and two always-present-but-mode-irrelevant fields — see the
`points: [0,0,1,1] // Neutral transient cache` hack at `easingCatalogue.ts:157`).

**Cure.** `GradientInterval = CssTimingFunction`. glass-ui's `EasingPicker` v-models
`CssTimingFunction` too (it already depends on value.js — `useEasingPicker.d.ts:2` imports
`jumpTerms` from `@mkbabb/value.js/easing`). The callable is derived at the point of use through
`easingFnOf`'s existing memo cache, never stored. Direction restored: **value.js ← glass-ui ← demo**,
with the design system and the demo both naming the library's type.

---

## L-4 · MAJOR — three mints of the CSS timing literal; the library's own is unusable

The demo re-implements the producer's private formatting, byte for byte, on purpose:

```
demo/.../easing/easingCatalogue.ts:38-55
// glass-ui `useEasingPicker.readout` mints `cubic-bezier(…)` by mapping each
// coordinate through `+n.toFixed(3)` and joining with `", "` …
export function bezierLiteral(quad) { const [x1,y1,x2,y2] = quad.map(n => +n.toFixed(3));
                                      return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`; }
export function stepsLiteral(n, term) { return `steps(${n}, ${term})`; }
```

value.js already ships a serializer, publicly:

```
src/foundation/math.ts:113-119   export function cubicBezierToString(x1,y1,x2,y2)  // toFixed(2)
src/subpaths/math.ts:16          exported at @mkbabb/value.js/math
```

The two mints **disagree**, measured:

```
ease-out-back      lib: cubic-bezier(0.17, 0.89, 0.32, 1.27)   demo: cubic-bezier(0.175, 0.885, 0.32, 1.275)
ease-in-out-quad   lib: cubic-bezier(0.46, 0.03, 0.52, 0.95)   demo: cubic-bezier(0.455, 0.03, 0.515, 0.955)
ease               lib: cubic-bezier(0.25, 0.10, 0.25, 1.00)   demo: cubic-bezier(0.25, 0.1, 0.25, 1)
```

The library's version loses precision *and* emits non-idiomatic trailing zeros, so it cannot be used
for the identity match `tileIdFor` performs (`easingCatalogue.ts:219-223`, `t.css === interval.css`).
And value.js has **no steps serializer at all** — `grep -rn "cubic-bezier" src/` returns 6 hits, none
of them `steps(`. So the demo mints its own, three implementations deep: value.js's,
glass-ui's private `readout`, and the demo's mirror.

Note the asymmetry this exposes: `parseTimingFunction` is public
(`src/subpaths/css.ts`), and `useGradientCSS.ts:126` uses it correctly. The **inverse is missing from
the public surface**. That gap is the entire cause of the duplication.

**Cure.** `serializeTimingFunction(t: CssTimingFunction): string` in `src/css/`, exported at
`@mkbabb/value.js/css`, spec-minimal (CSS `<number>` serialization: shortest round-tripping form, no
trailing zeros), covering all four `CssTimingFunction` arms. Then: retire
`cubicBezierToString` from `@mkbabb/value.js/math` (it is a partial duplicate of a `css`-layer
concern living in `foundation/math`), delete `bezierLiteral`/`stepsLiteral`, and have glass-ui's
`readout` call the library. One mint, byte-identity free by construction rather than by comment.

---

## L-5 · MAJOR — the catalogue silently drops 6 of the library's 30 presets

`src/easing.ts:34-65` defines **30** bezier presets. The strip renders **27** tiles — measured:

```
TILES(27): linear, ease, ease-in, ease-out, ease-in-out, ease-in-sine, ease-out-sine, ease-in-out-sine,
ease-in-quad, ease-out-quad, ease-in-out-quad, smooth-step-3, ease-in-cubic, ease-out-cubic,
ease-in-out-cubic, ease-in-expo, ease-out-expo, ease-in-out-expo, ease-in-circ, ease-out-circ,
ease-in-out-circ, ease-in-back, ease-out-back, ease-in-out-back, steps, step-start, step-end
```

24 bezier + 3 steps. **`ease-in/out/in-out-quart` and `ease-in/out/in-out-quint` are absent** — silently
filtered by a hand-maintained whitelist:

```
easingCatalogue.ts:174   const FAMILY_ORDER = ["css","sine","quad","cubic","expo","circ","back","steps"];
easingCatalogue.ts:184   return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…)
```

built on top of a regex that *reverse-engineers* library naming
(`familyLabelFor`, `:167-172`: `/^ease-(in-out|in|out)-(.+)$/`). Family taxonomy is data about the
library's own catalogue, re-derived in a consumer by string-scraping, then truncated by an array the
library cannot see. Adding a preset to `src/easing.ts` today produces a tile only if its family name
happens to already be in a demo constant.

**Cure.** Taxonomy is library data. `bezierPresets` becomes
`Readonly<Record<BezierPresetName, { points: readonly [number,number,number,number]; family: string; variant: "in"|"out"|"in-out"|null }>>`
(or a parallel `bezierPresetFamilies` export to keep the tuple shape). The consumer groups by
`family` and orders by first appearance. No regex, no whitelist, no silent loss.

---

## L-6 · MAJOR — three live implementations of "sample an easing into an SVG path"

| home | symbol | evidence |
|---|---|---|
| demo | `glyphPath(fn, samples = 48)` | `easingCatalogue.ts:66-75` |
| glass-ui | `bezierPathD`, `stepPathD` | `dist/components/easing/composables/useEasingPicker.d.ts` |
| keyframes.js | `generateCurveSVGPath` | named by the demo's own header, `easingCatalogue.ts:22-24` |

The demo's own doc comment says it is transposing the keyframes.js idiom — i.e. the duplication is
documented and deliberate. Three repos, three samplers, three sets of sampling-density and
y-flip conventions for one pure function of `EasingFunction → string`.

**Cure.** It is pure numerics over a callable — it belongs in `@mkbabb/value.js/easing`, which is
framework-free and already owns `EasingFunction`:

```ts
export function sampleEasing(fn: EasingFunction, samples: number): Float64Array
export function easingPathD(fn: EasingFunction, opts?: { samples?: number; flipY?: boolean; precision?: number }): string
```

glass-ui and keyframes.js both already depend on value.js. Three deletions, one home.

---

## L-7 · MINOR — a magic constant duplicating a producer constant the producer does not publish

```
EasingAuthoringStage.vue:45   const vbRatio = ref(1.2); // linear's padded box (1 + 2·VIEW_PAD)
```

glass-ui declares the real constant — `VIEW_PAD = 0.1`, `MAX_OVERSHOOT = 0.6`,
`VIEWBOX_FIT_SAMPLES = 16` in `dist/components/easing/constants.d.ts` — but the export map cannot
reach it:

```
$ python3 -c "…json.load(open('node_modules/@mkbabb/glass-ui/package.json'))['exports']…"
wildcard/deep entries: ['./fonts/*']
has './easing/constants'? False
```

74 export keys, no path to the geometry constants. So the consumer hardcodes the arithmetic result in
a comment. Producer public-surface gap; relay to glass-ui alongside L-2 (if `fit="viewbox"` lands,
the constant stops being consumer business at all).

---

## L-8 · MINOR — the demo's value.js type-resolution path is stale and does not match the export map

`package.json#exports` publishes **7** keys: `./color ./value ./css ./easing ./math ./transform
./quantize` — and **no `.` root**. `tsconfig.demo.json:42-49` lists **8** paths:

| tsconfig entry | reality |
|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | **not exported**; `dist/index.d.ts` does not exist (`ls` → No such file) |
| `@mkbabb/value.js/parsing` → `./dist/subpaths/parsing.d.ts` | **not exported**; file does not exist |
| `@mkbabb/value.js/units` → `./dist/subpaths/units.d.ts` | **not exported**; file does not exist |
| `@mkbabb/value.js/css` | **MISSING** — yet imported 10× in `demo/` |
| `@mkbabb/value.js/value` | **MISSING** |

(demo import census: `color` 25, `css` 10, `math` 6, `easing` 5, `quantize` 4.) The comment above the
block claims "the `exports` map is a CLOSED 8-key set" — it is a closed **7**-key set with no root.

Consequence, measured: because no `paths` entry covers `/css`, TypeScript resolves
`@mkbabb/value.js/css` (`useGradientCSS.ts:25`, the gradient tree's parser import) through the
*installed tarball* `node_modules/@mkbabb/value.js@4.0.0`, while Vite resolves it to this checkout's
`dist/` (`vite.config.ts:41-49`, aliases generated from `exports` → `conditions.import`). Those two
artifacts differ **today**:

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
3,4d2
< declare type Alpha_2 = number | "none";
39,40d36
< declare type Channel_2 = number | "none";
      (easing / math / color: IDENTICAL — css only)
```

So the demo **typechecks against a published snapshot and runs against the working tree**. That is a
dual path in the dogfood keystone itself: the mechanism whose whole purpose is to prove the public
surface is honest currently proves a *different* surface than the one that executes. Three dead
entries are also plain legacy residue (edict 2).

**Cure.** Generate `tsconfig.demo.json#paths` from `package.json#exports` at build time, exactly as
`vite.config.ts` already generates the runtime aliases from the same source — or drop the `paths`
block entirely and let the self-installed `node_modules/@mkbabb/value.js` be the single resolution
authority for both type and runtime (then the alias set exists only to point at fresh output). Two
generators reading one map; never a hand list.

---

## L-9 · INFO — the seat should not exist; the greenfield lattice

Compliance notes first, so they are not mistaken for silence: the subject file is **clean** on
edicts 1 (117 lines, single concern), 3, 6 (no keyframes touched; its `transition` is scoped and
carved out under PRM), 7 (`useTemplateRef` `:44`, reactive props destructure `:32`) and 8 (`import
type` correctly split at `:30`). Its imports — `vue` and `@mkbabb/glass-ui/easing` — are both
real published specifiers (`glass-ui/package.json#exports` has `./easing`). There is **no** deep
`src/` reach and no demo→shell edge from this file. The defects are all structural, not stylistic.

Greenfield, with no legacy:

```
@mkbabb/value.js  (pure, framework-free, the ONE home for CSS-value semantics)
  easing.ts          EasingFunction, bezierPresets{points,family,variant}, CubicBezier, steppedEase
                     + sampleEasing / easingPathD                              [L-6]
  css/timing.ts      CssTimingFunction  ·  parseTimingFunction (exists)
                     + serializeTimingFunction                                 [L-4]
  color/ramp.ts      easedMix / easedRamp — overshoot policy owned HERE        [L-1]
        ▲
        │ (glass-ui already depends on value.js)
@mkbabb/glass-ui/easing
  EasingPicker       v-models CssTimingFunction; owns its own chrome:
                     layout="split|stacked" · surface="card|well|bare" · fit="square|viewbox"   [L-2]
        ▲
demo/workbenches/gradient
  composables/useGradientModel.ts     GradientInterval = CssTimingFunction     [L-3]
  GradientVisualizer/easing/
      easingCatalogue.ts   tiles + identity ONLY (no literal mint, no glyph painter, no whitelist)
      EasingSpecimenStrip.vue   selection
      ── EasingAuthoringStage.vue DELETED ──
```

The authoring-disclosure block in `GradientEasingEditor.vue` (the `<EasingAuthoringStage>` mount
inside `v-show="tuneOpen[row.index]"`) then reads:

```html
<EasingPicker v-model="intervals[row.index]" layout="stacked" surface="well" fit="viewbox"
              :readout="false" :playback="false" :label="`Easing curve ${row.label}`" />
```

Net: one demo file deleted (117 lines, of which 30 are cross-package `:deep` surgery and 25 are a
dead DOM-scrape sync); two duplicate serializers
and two duplicate samplers deleted; one BLOCKER crash class made structurally impossible; and every
remaining edge is type-checked instead of attribute-matched.

---

## Reproduction assets

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
(read-only probes against the live dev server at `http://localhost:9000`; no source touched):

| script | proves |
|---|---|
| `wbL-easingstage-probe.mjs` | `roleImg: 0`, producer inline clamp intact, `--vb-ratio` frozen at 1.2, laws 1+2 live |
| `wbL-probe2.mjs` | pane annihilation on tile select, zero console output |
| `wbL-probe3.mjs` | the 27-tile roster; the `color_progress_out_of_range` detail string |
| `wbL-probe4/5.mjs` | keyboard-authored overshoot through the SUBJECT component (2 keystrokes) |
| `wbL-probe6.mjs` | recovery costs the model (retry → `cubic-bezier(0, 0, 1, 1)`) |
| `wbL-probe7.mjs` | letterbox geometry: 410×200 box, 166.7×200 drawn, 243.3 px / 59.3% empty |
| `wbL-probe8.mjs` | crash set = exactly `{ease-in-back, ease-out-back, ease-in-out-back}` (3/27) |
| `wbL-stage-letterbox.png`, `wbL-after-tile.png` | the letterbox and the destroyed pane, visually |
