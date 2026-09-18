# CHALLENGE-L — library structure under `EasingAuthoringStage.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
explicitly spawned with. Declared, not inherited.

- Subject: `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (116 lines, `wc -l`)
- Repo/HEAD: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface
- Verdict: **DEFECTIVE** (2 BLOCKER · 6 MAJOR · 5 MINOR · 2 INFO)

## Consolidation note

This is **pass 2** of the CHALLENGE-L seat. A pass-1 report existed at this path (findings L-1…L-9).
I re-derived the axis independently before reading it, then merged. Every carried-forward finding
below is marked with what *I* did to it:

- **CONFIRMED** — I reproduced or re-measured it myself, by a different route where possible.
- **CORRECTED** — I ran the decisive probe and the pass-1 claim does not hold; the corrected finding
  and its evidence are stated.
- **AMENDED** — confirmed, plus new evidence that widens or sharpens it.

L-10…L-15 are new in this pass. Nothing from pass 1 was dropped.

---

## 0. What the seat actually is

116 lines rendering exactly one child — glass-ui's `<EasingPicker>` — plus three "seat laws"
imposed on the producer from outside it:

| law | mechanism | file:line | live status (my measurement) |
|---|---|---|---|
| 1 — one column | `:deep([data-testid="easing-picker"]) { grid-template-columns: 1fr }` | `:88-90` | **LIVE** — measured `gridTemplateColumns: "1fr"` |
| 2 — wells, not cards | `:deep(.glass-card) { box-shadow: none; backdrop-filter: none; … }` | `:93-99` | **LIVE** — `.glass-card` present in the shipped bundle (`easing.js:139`) |
| 3 — zero letterbox (O-17) | `syncVbRatio()` DOM scrape + `--vb-ratio` + `:deep(svg[role="img"])` | `:44-67, :74, :104-115` | **DEAD** — selector matches 0 elements |

All three reach *through* the package boundary into glass-ui's private DOM. That is the axis defect.
One of the three has already silently died of it.

---

## L-1 · BLOCKER — no library home for "an eased colour mix"; the seat's own emission kills the pane

**CONFIRMED** (pass 1 measured it in the browser; I re-derived it analytically from the shipped
library, which pins the mechanism independently of any UI).

**The defect.** `@mkbabb/value.js/easing` legitimately emits values outside `[0,1]` (overshoot
curves). `@mkbabb/value.js/color` **rejects** exactly those values. Two public subpaths of the same
library have contradictory contracts at their composition point, and the library ships no composer.

```
src/color/operations.ts:65   if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
src/color/operations.ts:90   if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
```

**My independent verification — against the built `dist/`, no browser:**

```
$ node -e "…import('./dist/subpaths/easing.js')…"
bezierPresets count = 30
back presets: ease-in-back=[0.6,-0.28,0.735,0.045]  ease-out-back=[0.175,0.885,0.32,1.275]
              ease-in-out-back=[0.68,-0.55,0.265,1.55]
ease-in-back      min=-0.0969 max=1.0000  f(0.5)=-0.0636
ease-out-back     min= 0.0000 max=1.0868  f(0.5)= 1.0676
ease-in-out-back  min=-0.0923 max=1.0927  f(0.5)= 0.6067
```

The seam is owned by the demo, which does not adapt — it throws:

```
demo/.../easing/useSpecimenRows.ts:52-59      const fn = easingFnOf(interval);
                                              const mid = interpolateStopColors(…, fn(0.5), …)
                                                → useGradientInterpolation.ts:37  throw
demo/workbenches/gradient/composables/useGradientCSS.ts:202-207
                                              if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`)
```

So for `ease-out-back` the row derivation throws at `fn(0.5) = 1.0676 > 1` **synchronously inside a
`computed`**, on the very first render after selection; `ease-in-back` throws at `f(0.5) = -0.0636 < 0`;
`ease-in-out-back` survives the midpoint but its 32-sample coalesce hits `max = 1.0927 > 1`. That is
exactly the crash set pass 1 measured in the browser — `{ease-in-back, ease-out-back,
ease-in-out-back}`, 3 of 27 tiles — reached by a completely different route. **Both passes agree.**

**Pass-1 browser reproductions, retained** (`scratchpad/wbL-probe5.mjs`, `wbL-probe8.mjs`):
two `Shift+ArrowUp` presses on the picker's second bezier handle — *through the subject component* —
take the readout from `cubic-bezier(0, 0, 1, 1.1)` (survives, peak ≈ 0.996) to a destroyed pane
(peak ≈ 1.02 > 1). `heads: 0`; `ErrorBoundary.vue:59-69` returns `false` from `onErrorCaptured`, so
**zero console and zero pageerror output** — invisible to every console-scraping gate, which is why
`audit/visual/REPORT.json` shows `pageErr 0 / consoleErr 0` for `/#/gradient`.

**Aggravating.** glass-ui's own published default is one of the three fatal curves —
`dist/components/easing/constants.d.ts`: `DEFAULT_BEZIER_PRESET: "ease-out-back"`. Any future seat
that mounts `<EasingPicker>` without a `modelValue` crashes this pane on mount.

**Mechanism.** Missing module. "Sample an easing function into colour space" has no home, so it is
performed ad hoc at two demo call sites with no shared law, against a library function whose domain
is narrower than the library function feeding it.

**Cure (transposition, not patch).** `src/color/ramp.ts`, public at `@mkbabb/value.js/color`:

```ts
export function easedMix(a: AnyColor, b: AnyColor, t: number, easing: EasingFunction,
                         opts: MixOptions & { overshoot?: "clamp" | "extrapolate" | "error" }): Result<AnyColor, ColorIssue>
export function easedRamp(a: AnyColor, b: AnyColor, easing: EasingFunction, samples: number, opts): Result<readonly AnyColor[], ColorIssue>
```

`overshoot` defaults to `"clamp"` — CSS itself clamps easing output when interpolating non-numeric
values. One rule, one home; both demo call sites collapse to one call; the `back` family becomes
usable instead of fatal. Do **not** clamp in the demo: that buries a library-contract mismatch in a
consumer and leaves the next consumer to rediscover it.

---

## L-2 · BLOCKER — the seat styles and reads glass-ui's private DOM; the coupling already died silently

**CONFIRMED and AMENDED.** I re-measured on a different viewport and added a static bundle proof.

**The defect.** glass-ui 7.0.0's picker canvas renders with **`role="group"`**. The seat targets
`svg[role="img"]` — twice (`:48-50` querySelector, `:104` stylesheet). It matches nothing.

**Static proof — the whole shipped easing module contains no `role="img"`:**

```
$ grep -o 'role: *"[a-z]*"' node_modules/@mkbabb/glass-ui/dist/easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
```

The canvas element, `dist/easing.js:326-341`:

```js
h("svg", { ref_key: "svgEl", class: "block w-full touch-none select-none",
           viewBox: rt.value, preserveAspectRatio: "xMidYMid meet",
           style: { "aspect-ratio": "1", "block-size": "clamp(200px, 38cqi, 320px)", "margin-inline": "auto" },
           "aria-label": e.label, role: "group", … })
```

**My live measurement** (Playwright/WebKit, `http://localhost:9000/#/gradient`, authoring disclosure
opened, narrower pane than pass 1):

```json
{ "vbAttr": "0 -0.1 1 1.2000000000000002", "trueRatio": 1.2000000476837158,
  "roleImgMatches": 0, "stageVbRatioVar": "1.2",
  "computed": { "aspectRatio": "1 / 1", "blockSize": "200px", "inlineSize": "272px" },
  "boxRect": { "w": 272, "h": 200 }, "drawnPlot": { "w": 166.7, "h": 200 },
  "letterboxPxPerSide": { "x": 52.7, "y": 0 }, "deadPixelPct": 38.7 }
```

Pass 1 measured the same defect at a 410 px box: `243.3 px empty / 59.3 %`. Two independent
measurements, two viewport widths, same conclusion — **the drawn plot is always `166.7 × 200 px`
regardless of the box**, because the producer's `aspect-ratio: 1` + `block-size: clamp(…)` survive
and `xMidYMid meet` then pillarboxes the `1 × 1.2` viewBox. The dead-pixel fraction is a pure
function of pane width; the letterbox itself is unconditional. This is precisely the O-17 "zero
letterbox" law the file header (`:18-21`) says it enforces.

Three further consequences of the same dead selector, all confirmed:

1. `vbRatio` is frozen at its seed (`stageVbRatioVar: "1.2"`); `syncVbRatio` early-returns at `:51`
   forever, so `onMounted` (`:62`), the `watch` (`:63-67`) and both `requestAnimationFrame` calls
   (`:58`, `:65`) are dead work on every keystroke of every drag.
2. The seat's `inline-size: min(100%, 19rem)`, `block-size: auto !important`,
   `aspect-ratio: calc(…) !important` and `margin-inline: 0 !important` never apply.
3. **The T-48 "liquid morph" animation is deleted by selector drift** (`transition: aspect-ratio`,
   `:114`). Owner edict 6 — animations are never deleted, only moved or tokenized — is violated by
   accident, and no gate noticed.

**Provenance (pass 1, retained).** The laws were certified green
(`docs/tranches/U/audit/w-visual-close-artefacts.md:36` — "zero letterbox (getScreenCTM 0/0/0/0)")
against glass-ui 6.x; `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0` landed after
`a61094e3`, the seat file was never touched, and the census green is now stale. **No type, no test,
no lint and no CI gate can see a CSS attribute selector aimed at another package's DOM.**

**Two further boundary crimes in the same block:**

- `:deep([data-testid="easing-picker"])` (`:88`) — a **test hook** used as a styling contract.
  Verified live to still match (`gridTemplateColumns: "1fr"` against the producer's own
  `grid gap-4 lg:grid-cols-[1fr_18rem]`), which is luck, not contract.
- `:deep(.glass-card)` (`:93`) — a producer-internal class repainted with demo tokens
  (`--well-bg`, `--card-edge`). Owner edict 4 (variants belong in glass-ui) and edict 5 (root-level
  styling, never per-instance overrides); the `!important` pair at `:106-108` is the tell.

**Cure (transposition).** The three laws are a *variant*, and variants live in glass-ui:

```ts
layout?: "split" | "stacked"        // kills the lg: 18rem rail — law 1
surface?: "card" | "well" | "bare"  // kills the .glass-card repaint — law 2
fit?: "square" | "viewbox"          // aspect ≡ live viewBox — law 3, computed INSIDE the producer
```

`useEasingPicker` already returns `viewBox: ComputedRef<{minY, height}>`
(`useEasingPicker.d.ts:63-66`) — **the producer already owns the number the consumer scrapes out of
the DOM with a rAF.** It then overrides it with a hardcoded `aspect-ratio: 1`. It also offers the
consumer no legitimate door: no `defineExpose` (`grep -n "expose" dist/easing.js` → no match), the
only slot is `footer` with `{ value }` (`EasingPicker.vue.d.ts`), and no CSS custom property carries
the ratio. **The DOM scrape was forced, not chosen.**

With those three props the subject file deletes entirely and the coupling becomes type-checked.
Relay via the standing glass-ui BH inbox law.

---

## L-3 · MAJOR — dependency inverted: the domain model is typed by the design system's widget payload

**CONFIRMED.**

```
demo/workbenches/gradient/composables/useGradientModel.ts:49
    export type GradientInterval = EasingPickerValue;   // ← from "@mkbabb/glass-ui/easing"
demo/.../easing/EasingAuthoringStage.vue:32-37
    const { value, label } = defineProps<{ value: EasingPickerValue; … }>();
        /** The interval truth; Glass owns exact two-way authoring. */
```

The comment states the inversion outright: "Glass owns". A gradient interval's easing is **domain
truth** — persisted, serialized to CSS, re-parsed, sampled. Typing it as a UI widget's v-model
payload means the gradient model cannot be constructed or serialized without a Vue component
library; a glass-ui *minor* can change the persisted domain shape; and `EasingPickerValue.fn` (a
live closure) is stored *in the model*, so it is not serializable and `easingFnOf` needs a
`fn ?? reparse` two-path fallback (`useGradientCSS.ts:119-133`).

value.js **already publishes the correct type**, strictly more expressive (`src/css/types.ts:32-37`,
exported at `@mkbabb/value.js/css`):

```ts
export type CssTimingFunction =
    | Readonly<{ kind: "keyword"; name: "linear"|"ease"|"ease-in"|"ease-out"|"ease-in-out" }>
    | Readonly<{ kind: "cubic-bezier"; x1: number; y1: number; x2: number; y2: number }>
    | Readonly<{ kind: "steps"; count: number; position: JumpPosition }>
    | Readonly<{ kind: "linear-function"; stops: readonly CssLinearStop[] }>;
```

`EasingPickerValue` is a lossy 6-field shadow of it: no `linear()`, no keyword identity, a
non-serializable closure, and two always-present-but-mode-irrelevant fields — the demo admits it at
`easingCatalogue.ts:148-152`: `points: [0, 0, 1, 1]` / *"Neutral transient cache — steps mode never
reads points."*

**Cure.** `GradientInterval = CssTimingFunction`; `<EasingPicker>` v-models `CssTimingFunction` too
(glass-ui already depends on value.js — `useEasingPicker.d.ts:2` imports `jumpTerms` from
`@mkbabb/value.js/easing`). Direction restored: **value.js ← glass-ui ← demo**.

---

## L-4 · MAJOR — now **four** mints of the CSS timing literal; the library's own is an orphan

**CONFIRMED and AMENDED** — pass 1 found three homes; I found a fourth, and established that the
library's own is dead code.

The interval's `css` string is the **identity key** of the entire feature
(`easingCatalogue.ts:220`: `SPECIMEN_TILES.find((t) => t.css === interval.css)`). Four independent
implementations mint it:

| # | home | rule | consumers |
|---|---|---|---|
| 1 | `src/foundation/math.ts:113 cubicBezierToString` | `toFixed(2)` | **zero runtime consumers** |
| 2 | glass-ui `useEasingPicker.readout` (`easing.js:32-35`) | `+n.toFixed(3)` | the picker |
| 3 | `demo/.../easingCatalogue.ts:48 bezierLiteral` + `:54 stepsLiteral` | `+n.toFixed(3)` | the tile catalogue |
| 4 | `demo/workbenches/gradient/composables/useGradientCSS.ts:55` | the literal string `"cubic-bezier(0, 0, 1, 1)"` | the interval seed |

**New in this pass — #1 is an orphan public API:**

```
$ grep -rn "cubicBezierToString" src/ demo/ test/
src/foundation/math.ts:113   (definition)
src/subpaths/math.ts:16      (export at @mkbabb/value.js/math)
test/v4-c1.test.ts:334       (surface census)
test/math.test.ts:11,407-442 (unit tests)
```

Published, tested, and called by **nothing** that ships. Meanwhile #3 and #4 exist solely to mirror
#2, and both files say so in prose — `easingCatalogue.ts:40-45` (*"MUST be byte-identical"*) and
`useGradientCSS.ts:46-51` (*"byte-identical to what glass-ui's `<EasingPicker>` emits"*). Byte
identity is maintained by **comment**, across a package boundary, with no test binding the four.

**Measured divergence (mine):**

```
demo bezierLiteral([0.25,0.1,0.25,1])        = "cubic-bezier(0.25, 0.1, 0.25, 1)"
value.js cubicBezierToString(0.25,0.1,0.25,1)= "cubic-bezier(0.25, 0.10, 0.25, 1.00)"
demo bezierLiteral([0,0,1,1])                = "cubic-bezier(0, 0, 1, 1)"
value.js cubicBezierToString(0,0,1,1)        = "cubic-bezier(0.00, 0.00, 1.00, 1.00)"
```

Pass 1's preset-level table agrees (`ease-out-back` lib `0.17, 0.89, 0.32, 1.27` vs demo
`0.175, 0.885, 0.32, 1.275` — the library's `toFixed(2)` also **loses precision**, so it could not be
adopted as-is even if someone tried). The shipped readout is the demo form — visible in
`audit/visual/shots/safari-desktop-light/gradient.png`: `cubic-bezier(0, 0, 1, 1)`.

value.js has **no steps serializer at all** (`grep -rn "cubic-bezier" src/` → 6 hits, none `steps(`).

**The asymmetry that causes all of it:** `parseTimingFunction` is public
(`src/subpaths/css.ts`, used correctly at `useGradientCSS.ts:126`); **the inverse is absent from the
public surface**, while `/css` does publish `serializeCssColor` and `serializeTimelineOptions`.

**Failure mode.** Change either rounding rule in any of the four homes and every specimen tile
silently deselects (`tileIdFor` → `null`, head reads `custom`). No test fails.

**Cure.** `serializeTimingFunction(t: CssTimingFunction): string` in `src/css/`, exported at
`@mkbabb/value.js/css`, spec-minimal (shortest round-tripping `<number>` form, no trailing zeros),
covering all four arms. Then retire `cubicBezierToString` into it, delete
`bezierLiteral`/`stepsLiteral` and the hardcoded seed, and have glass-ui's `readout` call the
library. Round-trip property test: `parse ∘ serialize ≡ id`.

---

## L-5 · MAJOR — the catalogue silently drops 6 of the library's 30 presets

**CONFIRMED** — I re-counted from the built `dist/`.

```
$ node -e "import('./dist/subpaths/easing.js').then(E=>console.log(Object.keys(E.bezierPresets).length))"
30
```

The strip renders **27** tiles (24 bezier + 3 steps, roster in pass 1's probe output).
`ease-in/out/in-out-quart` and `ease-in/out/in-out-quint` are absent — filtered by a hand-maintained
whitelist built on a regex that reverse-engineers library naming:

```
easingCatalogue.ts:168   const m = /^ease-(in-out|in|out)-(.+)$/.exec(name);
easingCatalogue.ts:174   const FAMILY_ORDER = ["css","sine","quad","cubic","expo","circ","back","steps"];
easingCatalogue.ts:191   return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…)
```

Family taxonomy is data *about the library's own catalogue*, re-derived in a consumer by
string-scraping, then truncated by an array the library cannot see. Adding a preset to
`src/easing.ts` yields a tile only if its family name already happens to be in a demo constant.

**Cure.** Taxonomy is library data. Ship `family`/`variant` alongside the points (or a parallel
`bezierPresetFamilies` export to preserve the tuple shape). Consumer groups by `family`, orders by
first appearance. No regex, no whitelist, no silent loss.

---

## L-6 · MAJOR — three live implementations of "sample an easing into an SVG path"

**CONFIRMED.**

| home | symbol | evidence |
|---|---|---|
| demo | `glyphPath(fn, samples = 48)` | `easingCatalogue.ts:66-75` |
| glass-ui | `bezierPathD`, `stepPathD` (240 samples, `easing.js:61-66`) | `useEasingPicker.d.ts` |
| keyframes.js | `generateCurveSVGPath` | named by the demo's own header, `easingCatalogue.ts:16-19` |

The demo's doc comment says it is transposing the keyframes.js idiom — the duplication is documented
and deliberate. Three repos, three samplers, three sampling-density and y-flip conventions, for one
pure function of `EasingFunction → string`.

**Cure.** Pure numerics over a callable — it belongs in `@mkbabb/value.js/easing`, which is
framework-free and already owns `EasingFunction`:

```ts
export function sampleEasing(fn: EasingFunction, samples: number): Float64Array
export function easingPathD(fn: EasingFunction, opts?: { samples?: number; flipY?: boolean; precision?: number }): string
```

glass-ui and keyframes.js both already depend on value.js. Three deletions, one home.

---

## L-7 · MINOR — a magic constant duplicating a producer constant the producer does not publish

**CONFIRMED and AMENDED** (I established the true seed ratio live).

```
EasingAuthoringStage.vue:45   const vbRatio = ref(1.2); // linear's padded box (1 + 2·VIEW_PAD)
```

glass-ui declares the real constants — `VIEW_PAD = 0.1`, `MAX_OVERSHOOT = 0.6`,
`VIEWBOX_FIT_SAMPLES = 16` (`dist/components/easing/constants.d.ts`) — but
`components/easing/index.d.ts` re-exports only the two SFCs, `useEasingPicker` and five types, and
the package `exports` map has no `./easing/constants` key. **The consumer cannot import the number
it is duplicating**, so it hardcodes the arithmetic result in a comment.

The value is correct today — live viewBox `0 -0.1 1 1.2000000000000002` → ratio `1.2000000476837158`
— by luck, and unrepairable if the producer changes `VIEW_PAD`. Producer public-surface gap; relay
alongside L-2 (under `fit="viewbox"` it stops being consumer business at all).

---

## L-8 · MINOR — `tsconfig.demo.json#paths` is stale and does not match the export map · **CORRECTED**

**CONFIRMED (the drift) · CORRECTED (the consequence).**

The drift is real and I re-verified every row:

| tsconfig entry (`:42-49`) | reality |
|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | not an `exports` key; `ls dist/index.d.ts` → **No such file** |
| `@mkbabb/value.js/parsing` → `./dist/subpaths/parsing.d.ts` | not an `exports` key; file does not exist |
| `@mkbabb/value.js/units` → `./dist/subpaths/units.d.ts` | not an `exports` key; file does not exist |
| `@mkbabb/value.js/css` | **MISSING** — yet imported 10× in `demo/` |
| `@mkbabb/value.js/value` | **MISSING** |

```
$ node -e "console.log(Object.keys(require('./package.json').exports))"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]
$ ls dist/subpaths/
color.* css.* easing.* math.* quantize.* transform.* value.*
```

The block's comment claims *"the `exports` map is a CLOSED 8-key set"* — it is a closed **7**-key set
with no `.` root. Three dead entries are plain legacy residue (edict 2). (No demo file actually
imports the bare root — `grep -rn '@mkbabb/value\.js"' demo` → no output — so that entry is dead but
harmless.)

**CORRECTION.** Pass 1 concluded that, because no `paths` entry covers `/css`, *"the demo typechecks
against a published snapshot and runs against the working tree"*. **That does not hold.** I ran the
decisive probe:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "@mkbabb/value.js/css"
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
'/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID
'@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`paths` misses, and TypeScript then resolves it by **package self-reference** — this repo's own
`package.json#name` + `exports` — landing on the local `dist/subpaths/css.d.ts`, the same artifact
Vite aliases to. Types and runtime agree. The `.d.ts` difference pass 1 measured against
`node_modules/@mkbabb/value.js@4.0.0` is real (`diff` shows the `Alpha_2`/`Channel_2`/`Color_2`
`vite-plugin-dts` duplicate-declaration artifact, `css` only — `easing`/`math`/`color` are
identical), but nothing resolves to that copy, so it is inert.

Net: the `paths` block is **both drifted and redundant** — a latent trap, not a live dual path.
Severity accordingly MINOR, not the dogfood-keystone breach pass 1 recorded.

**Cure.** Delete the seven hand-written `@mkbabb/value.js*` entries — self-reference already does
the job. If they must stay, *generate* them from `package.json#exports` exactly as
`vite.config.ts:41-49` already generates the runtime aliases from the same source. The asymmetry is
the defect: one half of the "one consistent published surface" invariant is generated, the other is
a hand list, and the hand list has already drifted.

---

## L-10 · MAJOR — the demo's import-boundary lint governs 0 of the 250 files it names *(new)*

**The defect.** `eslint.config.js` carries three demo module-graph guards — G-DEMO-1, G-DEMO-3a,
G-DEMO-3b — written against the `demo/@/…` tree. That tree was deleted by
`a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)` — **the same commit that
created the subject component's current home**. The rules were never re-homed.

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ for g in demo/@/components demo/@/lib demo/@/composables demo/color-picker; do
    echo "$g -> $(find $g -type f \( -name '*.ts' -o -name '*.vue' \) 2>/dev/null | wc -l | tr -d ' ') files"; done
demo/@/components -> 0 files
demo/@/lib        -> 0 files
demo/@/composables -> 0 files
demo/color-picker -> 16 files

$ find demo -type f \( -name '*.ts' -o -name '*.vue' \) | wc -l
     250

$ find demo -type d -name "palette-browser"
(no output)
```

Three of the four configured globs (`eslint.config.js:234-238`, `:275-277`) match **zero files**.
The one surviving glob covers 16 of 250 demo files, and the single pattern it applies —
`@components/custom/palette-browser/**/*.vue` (`:247-252`) — targets a directory that no longer
exists. **Net enforced demo import boundaries: none.** `demo/workbenches/**` (where the subject
lives), `demo/shell/**`, `demo/scenes/**`, `demo/color-session/**`, `demo/picker/**` — all
ungoverned.

The only *live* `no-restricted-imports` rule in the file is inv-K-1
(`files: ["src/**/*.ts"]`, `:204-218`), banning glass-ui from the library. That one still works, and
is why the library half of the topology is sound.

**Why this is the enabling mechanism.** Every other finding here is a boundary crossing — a
`:deep()` into a producer, a domain type imported from a widget, a literal minted in three places.
Nothing in the toolchain is currently positioned to object to any of them.

**Reproduction.** `npx eslint demo/workbenches/gradient/GradientVisualizer/easing/` applies no
boundary rule, because no config object carrying `no-restricted-imports` matches that path.

**Cure.** Re-home the guards onto the real lattice. For this tree: `demo/workbenches/*/**` may
import `demo/shared/**`, `demo/color-session/**`, `demo/ui/**`, published `@mkbabb/*` subpaths, and
its own feature subtree — and must not import `demo/shell/**`, `demo/color-picker/**` (app-root
boot), or another workbench's internals. Add a rule banning `:deep(` selectors that contain
`[data-testid=` in `demo/**/*.vue` — that is the one class of cross-package coupling no type system
can see, and it is exactly what killed L-2.

*(Today `easing/useSpecimenRows.ts:13` reaches `../../../../color-session/useContrastSafeColor` —
four levels up into a sibling top-level layer. That is probably legitimate: `color-session` is the
shared colour spine. It is currently unverifiable because no rule states the direction.)*

---

## L-11 · MAJOR — value.js's own `/css` and `/easing` do not compose; the bridge lives in the demo *(new)*

**The defect.** value.js publishes the parser (string → `CssTimingFunction`, `@mkbabb/value.js/css`)
and the evaluators (`CubicBezier`, `steppedEase`, `easing`, `linearEasing`, `@mkbabb/value.js/easing`).
It does **not** publish the join. So the demo carries it:

```
demo/workbenches/gradient/composables/useGradientCSS.ts
  :71-77    easingValue        — Result unwrap
  :79-103   linearStops        — the full CSS linear() optional/double-position expansion algorithm
  :106-117  timingFunctionValue — the 4-arm CssTimingFunction → EasingFunction switch
```

47 lines of pure library work — including a complete implementation of the CSS `linear()` stop-input
inference rules — living in a gradient workbench composable. Nothing about it is gradient-specific;
it is the missing half of value.js's own timing-function story. Confirmed that glass-ui does *not*
carry a second copy (it only round-trips for `reparseOk`, `easing.js:36-40`), so this is a **missing
surface**, not yet a duplication — but the next consumer will write it again.

**Reproduction.** NONE — surface-shape finding, established by reading `src/subpaths/css.ts`,
`src/subpaths/easing.ts` and the demo composable.

**Cure.** `evaluateTimingFunction(t: CssTimingFunction): Result<EasingFunction, EasingIssue>` in
`src/easing.ts`, exported at `@mkbabb/value.js/easing`. Pairs with `serializeTimingFunction` (L-4)
and `easedRamp` (L-1) to close the parse → evaluate → sample → mix chain inside the library, which
is where all four steps' domain knowledge already lives.

---

## L-12 · MINOR — the seat forks a component-type glass-ui already ships *(new)*

Owner edict 4 requires reusing existing component-type names rather than minting parallel ones.
glass-ui `@mkbabb/glass-ui/easing` exports **two** components:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/easing/index.d.ts
export { default as EasingPicker } from "./EasingPicker.vue";
export { default as EasingConfigurator } from "./EasingConfigurator.vue";
export { useEasingPicker, type EasingPickerMode, type EasingPickerValue, … };
```

`EasingConfigurator` is precisely "the picker seated in a labelled layer" — `label`, `name`, and the
same `v-model` (`EasingConfigurator.vue.d.ts`). The demo forked a second seat-wrapper named
`EasingAuthoringStage` instead of extending it, and then implemented its seat laws as `:deep()`
overrides rather than as producer variants.

**Reproduction.** NONE — structural.

---

## L-13 · MINOR — the wrapper degrades `v-model` to a bespoke event, forcing a masking fallback *(new)*

`EasingAuthoringStage.vue:39-41, :57-60` re-emits the producer's `update:modelValue` as a custom
`authored` event. The parent therefore cannot write `v-model` and must hand-wire the callback —
and hand-guard the union arm Vue would otherwise handle:

```
GradientEasingEditor.vue:78-81
    function onPickerAuthored(index: number, v: EasingPickerValue | undefined) {
        if (!v) return;                       // ← silent drop
        emit("update-interval", index, v);
    }
```

A silent drop is a masking fallback (owner edict 2). It is unreachable today — the producer's
`useModel` (`easing.js:182`) does not emit `undefined`; I label the *reachability* a **hypothesis**
and the *code shape* confirmed. Under the L-2 cure the wrapper and its guard both delete.

---

## L-14 · MINOR — `easingCatalogue.ts` is gradient-agnostic but homed four levels inside the gradient visualizer *(new)*

`demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts` is 230 lines containing
**zero** gradient-specific logic. Its inputs are `bezierPresets`/`steppedEase`/`CubicBezier` from
`@mkbabb/value.js/easing` and `EasingPickerValue`/`JumpTerm`/`BezierPoints` from
`@mkbabb/glass-ui/easing`; its only gradient reference is `GradientInterval`, which is a bare alias
of `EasingPickerValue` (L-3) — so `tileIdFor` and `specimenNameFor` are in fact functions of the
glass-ui payload type. It is unreachable by the other three workbenches (`extract`, `generate`,
`mix`) without a five-segment relative climb, and it duplicates the preset menu the picker already
owns (its own header, `:13-15`: *"the SAME catalogue the glass-ui `<EasingPicker>`'s preset menu
speaks"*). Under the greenfield lattice it becomes glass-ui's gallery.

---

## L-15 · INFO — the visual-audit matrix has zero coverage of this component *(new)*

Every `/#/gradient` row in `audit/visual/REPORT.md` (4 matrices) and `STATES.json` (6 further
matrices: zoom-200, reduced-motion, forced-colors, rtl-desktop, rtl-mobile, keyboard-focus) reports
`pageErrors: []`, and every `clipped` list contains only `EasingSpecimenStrip` selectors —
`div.strip-row`, `div.strip-family`, `span.family-eyebrow`, `div.family-tiles`,
`button.glass-chip.glass-capsule`. **`.easing-authoring` appears in none of the ten matrices**,
because the authoring stage is disclosure-gated (`tuneOpen`, default `false`,
`GradientEasingEditor.vue:84`) and no state script opens it.

Consequence: L-2's letterbox and L-1's pane annihilation are both invisible to the whole visual
programme. The clean `/#/gradient` rows are not evidence *about* this component; they are evidence
that it was never photographed. `shots/safari-desktop-light/gradient.png` shows the collapsed rail
only.

**Cure.** Add a `gradient-easing-authoring` state to `audit/visual/states.mjs` that clicks
`button[aria-label="Author a custom curve"]`, and a `gradient-easing-back` state that selects
`ease-out-back`, before capture.

---

## Negative proofs — what I checked and found SOUND

Stated positively so the absence of a finding is evidence, not silence.

1. **Every import goes through a published export-map key.** `@mkbabb/glass-ui/easing` is a real key
   in `node_modules/@mkbabb/glass-ui/package.json#exports`; `@mkbabb/value.js/easing` is one of the 7
   keys in this repo's `exports`. A real consumer could write both verbatim. No deep path, no `dist/`
   reach, no `@src/*`, no surviving `demo/@` alias anywhere under `demo/workbenches/`:
   ```
   $ grep -rn 'from "\.\./\.\./\.\./\.\./src\|from "@src\|value.js/dist\|/src/units\|/src/easing' demo/workbenches/
   (no output)
   ```
   **The demo is not proving a false public API through its imports.** The violating edges are a
   `querySelector` and three `:deep()` selectors — not an `import` statement.
2. **`verbatimModuleSyntax` clean.** `import type { EasingPickerValue }` correctly split at `:30`;
   same for all four files in `easing/` (`easingCatalogue.ts:27-35`, `useSpecimenRows.ts:12,17-21`,
   `EasingSpecimenStrip.vue:12`).
3. **Idiomatic Vue 3.5.** `useTemplateRef<HTMLElement>("rootEl")` (`:44`, matching `ref="rootEl"`
   `:72`) and reactive props destructure (`:32`). No `$refs`, no options API, no stale `defineModel`
   round-trip.
4. **Not a god module.** 116 lines, one concern, four imports. The named historical suspects are
   absent: no local reimplementation of a removed `useLayerTransition`; no second `useDark`; the
   clipboard path uses glass-ui's own `useClipboard` (`GradientEasingEditor.vue:29,94`) rather than a
   hand-rolled copy+timer.
5. **The one-literal law holds at runtime.** `:readout="false"` is honoured by the producer
   (`EasingPicker.vue.d.ts`, `readout?: boolean` default `true`) — verified in the captured
   screenshot: the literal renders in exactly one place.
6. **The library→consumer topology is acyclic and enforced where it matters.**
   `eslint.config.js:204-218` bans `@mkbabb/glass-ui*` from `src/**/*.ts` (inv-K-1); that glob is
   live and correct. Direction glass-ui → value.js confirmed by glass-ui's peer dep
   `"@mkbabb/value.js": "^4.0.0"` and `useEasingPicker.d.ts:2`.
7. **A dual-path claim I raised, tested and killed** — see L-8 CORRECTED. TS package self-reference
   resolves `@mkbabb/value.js/css` to the local `dist/`, not the installed tarball.
8. **A glass-ui round-trip bug I raised and killed.** I suspected `reparseOk` (`easing.js:36-40`)
   compared raw dragged points against a 3-decimal-rounded literal and would go false on every drag.
   `setHandle` (`easing.js:24-27`) stores `+a.toFixed(3)`, so the invariant holds. Not reported.

---

## The greenfield lattice

Stated concretely, no hedging. Arrows are the only permitted dependency direction.

```
@mkbabb/value.js  — pure, framework-free, the ONE home for CSS-value semantics
  easing.ts        EasingFunction · bezierPresets{points, family, variant}         [L-5]
                   CubicBezier · steppedEase · linearEasing
                 + sampleEasing / easingPathD                                      [L-6]
                 + evaluateTimingFunction(CssTimingFunction) → EasingFunction      [L-11]
  css/timing.ts    CssTimingFunction · parseTimingFunction            (exist)
                 + serializeTimingFunction                                         [L-4]
  color/ramp.ts  + easedMix / easedRamp — overshoot policy owned HERE              [L-1]
  math.ts        − cubicBezierToString                                    (DELETE) [L-4]
        ▲
        │  glass-ui already depends on value.js (peer ^4.0.0)
@mkbabb/glass-ui/easing
  useEasingPicker  already publishes `viewBox` — keep
  <EasingPicker>   v-models CssTimingFunction                                      [L-3]
                   OWNS its own no-letterbox law (aspect ≡ live viewBox);
                     no inline aspect-ratio:1, no fixed block-size                 [L-2]
                   props += layout="split|stacked" · surface="card|well|bare" · fit="square|viewbox"
                   re-export the easing constants (VIEW_PAD, …)                    [L-7]
  <EasingConfigurator>  the existing seated-picker type — extend, never fork       [L-12]
  <EasingGallery>       the preset specimen strip
                          ← demo easingCatalogue.ts (230 ln) + EasingSpecimenStrip.vue (215 ln),
                            both gradient-agnostic                                 [L-14]
        ▲
demo/workbenches/gradient
  composables/useGradientModel.ts   GradientInterval = CssTimingFunction           [L-3]
  composables/useGradientCSS.ts     ramp serialization + COALESCE_RESOLUTION only;
                                      the timing evaluator moves down              [L-11]
  GradientVisualizer/
    GradientEasingEditor.vue        mounts <EasingGallery> + <EasingPicker …> directly;
                                      zero :deep, zero querySelector, zero !important
    easing/useSpecimenRows.ts       KEPT — genuinely gradient-specific (per-interval ink =
                                      the certified eased-ramp midpoint)
    easing/EasingAuthoringStage.vue ── DELETED ──
```

The authoring-disclosure block in `GradientEasingEditor.vue` then reads, in full:

```html
<EasingPicker v-model="intervals[row.index]" layout="stacked" surface="well" fit="viewbox"
              :readout="false" :playback="false" :label="`Easing curve ${row.label}`" />
```

**Net: one demo file deleted (116 lines — 30 of cross-package `:deep` surgery, 25 of dead DOM-scrape
sync); three duplicate serializers and two duplicate samplers deleted; a BLOCKER crash class made
structurally impossible; and every remaining edge type-checked instead of attribute-matched.**

Enforcement must land with it, or the lattice decays again exactly as L-10 shows it already has:
`no-restricted-imports` over `demo/workbenches/*/**`, plus a ban on `:deep(` selectors containing
`[data-testid=`.

---

## Reproduction assets

Pass-1 probes, all under
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
(read-only, against the live dev server; no source touched):

| script | proves |
|---|---|
| `wbL-easingstage-probe.mjs` | `roleImg: 0`, producer inline clamp intact, `--vb-ratio` frozen, laws 1+2 live |
| `wbL-probe2.mjs` | pane annihilation on tile select, zero console output |
| `wbL-probe3.mjs` | the 27-tile roster; the `color_progress_out_of_range` detail string |
| `wbL-probe4/5.mjs` | keyboard-authored overshoot through the SUBJECT component (2 keystrokes) |
| `wbL-probe6.mjs` | recovery costs the model (retry → `cubic-bezier(0, 0, 1, 1)`) |
| `wbL-probe7.mjs` | letterbox geometry at 410 px: 166.7×200 drawn, 243.3 px / 59.3 % empty |
| `wbL-probe8.mjs` | crash set = exactly `{ease-in-back, ease-out-back, ease-in-out-back}` (3/27) |
| `wbL-stage-letterbox.png`, `wbL-after-tile.png` | the letterbox and the destroyed pane, visually |

Pass-2 probes (this seat), re-runnable inline:

| probe | proves |
|---|---|
| `grep -o 'role: *"[a-z]*"' node_modules/@mkbabb/glass-ui/dist/easing.js \| sort \| uniq -c` | no `role="img"` in the shipped producer |
| Playwright `browser_evaluate` on `/#/gradient` (authoring opened) | `roleImgMatches: 0`; box 272×200, drawn 166.7×200, **38.7 % dead** — L-2 at a second viewport |
| `node -e "…import('./dist/subpaths/easing.js')…"` | 30 presets; `ease-out-back` f(0.5)=1.0676 > 1 — L-1 analytically, browser-free |
| `node -e "cubicBezierToString vs bezierLiteral"` | the two minters diverge at both 2- and 3-dp inputs — L-4 |
| `npx tsc -p tsconfig.demo.json --noEmit --traceResolution \| grep '@mkbabb/value.js/css'` | resolves to the LOCAL `dist/` via self-reference — **L-8 CORRECTED** |
| `find demo/@/... \| wc -l` + `find demo -type d -name palette-browser` | the demo boundary lint governs 0 of 250 files — L-10 |
