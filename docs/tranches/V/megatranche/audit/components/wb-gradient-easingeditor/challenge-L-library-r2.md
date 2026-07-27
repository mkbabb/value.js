# CHALLENGE-L (round 2) — library structure · `GradientEasingEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier
this seat was spawned with. Declared, not inherited.

---

## Why this file is `-r2` and not `challenge-L-library.md`

The orchestrator named `challenge-L-library.md`. That path was **already occupied** when this
seat opened:

```
$ ls -la docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/
-rw-r--r--  1 mkbabb  staff  32005 Jul 27 13:47 challenge-L-library.md
```

Its header names the same component, the same axis, the same HEAD (`c654824e`) — it is round 1 of
this seat, landed earlier today. Overwriting it would delete a peer's evidence. The sibling
component directory already encodes the resolution
(`wb-gradient-stopeditor/challenge-L-library.md` + `challenge-L-library-r2.md`), so this round
lands as `-r2`. **Both files are the seat's record; read them together.**

I read r1 only *after* completing my own trace, so the overlaps below are independent
convergence, not restatement — and I say where I confirm it versus where I go past it.

---

- **Axis**: L — the library structure underneath the component is wrong (module boundaries,
  ownership, direction of dependency, public surface).
- **Subject**: `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (296 lines)
- **Repo/HEAD**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- **Verdict**: **DEFECTIVE** — 8 MAJOR, 5 MINOR, 2 INFO in this round (r1 carries 2 BLOCKER +
  6 MAJOR + 3 MINOR + 1 INFO; the two rounds share 6 findings by mechanism).

The premise held. One sentence for this round's shape:

> **Every law this component needs is already owned by something — and in six cases it is owned
> by the wrong thing, or by two things at once, because the layer that should own it has no
> public door.** The demo forks what value.js declines to publish, patches what glass-ui declines
> to parameterize, and the lint rule that was supposed to catch either of these has matched zero
> files since the W43 restructure.

---

## Negative proof, stated first

Recorded before the findings, because these are the defects the premise most obviously predicts
and they are **absent**:

- **The demo consumes value.js only through the published `exports` map.** No `@src/` import
  exists anywhere in this component's chain:
  ```
  $ grep -rn "@src" demo/workbenches/gradient/ | wc -l
  0
  ```
  Every library edge is `@mkbabb/value.js/easing` (`easingCatalogue.ts:22-30`), `/color` +
  `/easing` + `/css` (`useGradientCSS.ts:12-29`), `/color` (`useGradientInterpolation.ts:8-9`),
  `/css` (`gradientParse.ts:21`) — specifiers a real npm consumer can write verbatim. The T.W1
  dogfood keystone holds at this seat. **This is not a false proof of the public API.**
- **`verbatimModuleSyntax` is satisfied.** Subject lines 30, 34, 36–40 are all `import type`;
  lines 27–29, 31–33, 35 are value imports of values. Zero violations in the component or its
  four sub-modules.
- **The workbench layer does not reach up.** Despite the guard being dead (L-r2-1), no workbench
  imports app-root boot or shell:
  ```
  $ grep -rn "color-picker/" demo/workbenches | wc -l
  0
  $ grep -rn 'from "\.\./\.\./\(shell\|scenes\)' demo/workbenches | wc -l
  0
  ```
  The 28 `workbenches → color-session` and 17 `workbenches → palettes` edges all point
  *downward* into shared domain layers. The intended lattice is intact by discipline.
- **Runtime is clean.** Visual audit `/#/gradient`, all four Safari matrices: `pageErrors 0`,
  `consoleErrors 0`, `overflowX 0`, `main 1`
  (`docs/tranches/V/megatranche/audit/visual/REPORT.json`, four rows). The route's six
  `smallTapTargets` are all *other* components' (22×22 slug controls, 20×20 gradient-stop
  handles); this component's rail buttons measure **24×24**, which clears WCAG 2.5.8's 24 px
  floor. I measured them live rather than inferring:
  `railBtns: ["24x24", "24x24"]`.

---

## The import graph, traced

```
GradientEasingEditor.vue
├─ vue                                       computed, ref                             ok
├─ @lucide/vue                               4 icons                                   ok
├─ @mkbabb/glass-ui            ← useClipboard        ROOT BARREL; leaf is ./dom   [r2-9 / r1 L-7]
├─ @mkbabb/glass-ui/easing     ← type EasingPickerValue                          [r2-2 / r1 L-2]
├─ ../composables/useGradientCSS             serializeIntervalRamp
├─ ../composables/useGradientModel           type Gradient{Stop,Interval,ModelState}
└─ ./easing/
   ├─ EasingAuthoringStage.vue → @mkbabb/glass-ui/easing  EasingPicker + 3 :deep() patches [r2-4]
   ├─ EasingSpecimenStrip.vue  → @mkbabb/glass-ui/{fading-scroll,chip}                 ok
   ├─ easingCatalogue.ts       → @mkbabb/value.js/easing      ✅ published subpath
   │                           → @mkbabb/glass-ui/easing      BezierPoints, JumpTerm   [r2-5]
   └─ useSpecimenRows.ts       → ../../../../color-session/useContrastSafeColor         ok
                               → ../../composables/{useGradientCSS,useGradientInterpolation}
```

Not one edge crosses a boundary in the wrong *direction*. Every defect below is about
**ownership** and **the absence of a door**, which is the harder half of the premise.

---

## L-r2-1 — MAJOR · The demo module-graph guard has matched zero files since W43

This is the finding that explains why every other finding survived.

`eslint.config.js` carries three objects whose entire purpose is structural enforcement of the
demo's acyclic module graph — G-DEMO-1 (no feature→boot), G-DEMO-3a (no shared→feature-internal),
G-DEMO-3b (barrel seams, no raw `.vue` reach). Their file globs:

```
eslint.config.js:232-238    demo/color-picker/**/*.{ts,vue}
                            demo/@/components/**/*.{ts,vue}
                            demo/@/lib/**/*.{ts,vue}
eslint.config.js:276-279    demo/@/composables/**/*.{ts,vue}
```

`demo/@/` does not exist:

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ ls demo
DESIGN.md  color-picker  color-session  palettes  picker  platform
scenes     shared        shell          styles    test    ui        workbenches
```

The W43/RF-15 restructure moved the demo to `workbenches/ color-session/ palettes/ shell/
scenes/ platform/ shared/ ui/` and, per `vite.config.ts:70-73`, "**killed the demo `@…` path
aliases**". So four of the five globs match nothing, and the fifth (`demo/color-picker/**`, which
does exist) carries a *pattern* — `@components/custom/palette-browser/**/*.vue` — that no import
specifier in the tree can match:

```
$ grep -rn 'from "@components/' demo | wc -l
0
```

Measured on the subject itself:

```
$ npx eslint --print-config demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue \
  | node -e "…c.rules['no-restricted-imports']…"
no-restricted-imports => undefined
```

**Mechanism.** A structural invariant was encoded against a directory layout, and the layout was
refactored without the encoding. The guard did not fail loudly — flat-config globs that match
nothing are silent. The demo has been unguarded for the whole of W43→W51.

**Reproduction**: the `--print-config` command above. Contrast with a file the surviving glob
covers: `demo/color-picker/App.vue` resolves a rule whose only pattern is dead.

**Not currently violated** — see the negative proof. The defect is that nothing would catch it if
it were, including the root-barrel edge at subject line 29 and the dual paths at L-r2-7.

**Cure — architectural, not a glob patch.** Encode the *layer*, not the directory-of-the-day. The
demo has exactly four tiers; state them as one `no-restricted-imports` object per tier, keyed on
the physical trees that exist today:

```
demo/color-picker/**          boot         may import anything below
demo/shell/**, demo/scenes/** shell        may not import color-picker
demo/workbenches/**,          features     may not import shell, scenes, color-picker
  demo/picker/**
demo/color-session/**,        shared       may not import features, shell, scenes, color-picker
  demo/palettes/**, demo/platform/**,
  demo/shared/**, demo/ui/**
```

Four objects, each banning `**/{tier-above}/**` by relative-path group. Add one CI assertion that
every configured glob matches ≥1 file — the class of failure this finding *is*.

---

## L-r2-2 — MAJOR · The gradient's persisted domain type is a Vue widget's v-model payload

(Converges with r1 L-2 by conclusion; the evidence below is the ownership arithmetic r1 did not
run.)

```ts
// demo/workbenches/gradient/composables/useGradientModel.ts
12: import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
49: export type GradientInterval = EasingPickerValue;
```

The interval — the thing the gradient model persists, parses into (`gradientParse.ts`), sorts,
serializes and round-trips — **is** the design system's picker payload. The arrow points from
domain model to widget.

The cost is measurable in dead fields. `EasingPickerValue` has six members
(`useEasingPicker.d.ts`): `mode`, `css`, `fn`, `points`, `steps`, `term`. Three of them are read
by *nothing* in the gradient tree:

```
$ grep -rn "\.points\b|\.steps\b|\.term\b" demo/workbenches/gradient/
easingCatalogue.ts:109:    const fn = easingValue(CubicBezier(...points), name);
easingCatalogue.ts:123:            points: [...points] as BezierPoints,
```

Both hits are inside the tile factory — i.e. the demo *writes* `points`/`steps`/`term` **only in
order to satisfy the widget's type**, and never reads them back. The code says so out loud:

- `easingCatalogue.ts:148-152` — steps tiles carry `points: [0, 0, 1, 1]` commented
  *"Neutral transient cache — steps mode never reads points."*
- `easingCatalogue.ts:124-125` — bezier tiles carry `steps: 4, term: "jump-end"` as pure filler.
- `useGradientCSS.ts:53-62` — the `linearInterval()` seed hand-fills all six.

So the persisted model is 6 fields wide to carry 2 facts (`css`, plus `fn` as an admitted cache —
`useGradientModel.ts:44`: *"the persisted TRUTH … the picker callable is only a live cache"*).

**Mechanism**: the layer with the *narrowest* lifetime (a picker's transient authoring state) was
made the type of the layer with the *longest* (persisted, parseable gradient truth).

**Reproduction (deterministic from source)**: any future glass-ui minor that adds a seventh
member to `EasingPickerValue` — a `duration`, a `presetKey` — becomes a required field of the
gradient's persisted model and of `gradientParse`'s output, with no gradient reason.

**Cure — transposition.** The interval's truth is a CSS timing function; value.js already owns
that concept as `CssTimingFunction` (`src/subpaths/css.ts`, exported today).

```ts
// demo/workbenches/gradient/model/gradient-model.ts   (types only, leaf)
export interface GradientInterval { readonly css: string }
```

`easingFnOf` already resolves `css → EasingFunction` and memoizes
(`useGradientCSS.ts:120-133`), so the `fn` cache moves into the resolver where it belongs. The
`EasingPickerValue ↔ GradientInterval` adaptation becomes two four-line functions **at the seat**
(`EasingAuthoringStage`, `easingCatalogue`), which is exactly where a widget boundary should be.
The model stops importing glass-ui at all.

---

## L-r2-3 — MAJOR · One invariant catalogue, instantiated once per interval — measured

The 27 specimen tiles are a module-level constant:

```ts
// easingCatalogue.ts:198
export const SPECIMEN_FAMILIES: SpecimenFamily[] = buildFamilies();
```

They are identical in every row. Yet `EasingSpecimenStrip` **and** `EasingAuthoringStage` are
both inside the `v-for` (subject lines 111–215), so each interval mounts its own full copy of
both.

Measured live against the running dev server (`http://localhost:9000/#/gradient`, default 2-stop
gradient = 1 interval):

```json
{ "docNodes": 625,
  "rowCount": 1,
  "perRow": [ { "nodes": 193, "tiles": 27, "svgPaths": 41,
                "pickers": 1, "pathPointChars": 18541 } ] }
```

**One interval row is 193 of the route's 625 DOM elements — 30.9%** — carrying 27 `Chip`
components, 41 SVG paths and 18,541 characters of path `d` data, plus one full `EasingPicker`.
The `v-for` makes that linear in interval count: a 5-stop gradient (4 intervals) is ~772
elements of easing editor, more than doubling the route's DOM for a surface where **at most one
row is open at a time** (`openInterval` is a single `ref<number|null>`, subject line 61).

The component's own children document the consequence rather than the cause:

- `EasingSpecimenStrip.vue:41` — *"sibling rows mount hidden twins of every data-specimen id"* —
  which is why its reveal watcher must scope its `querySelector` to `rowEl` (line 55) and why it
  cannot use `scrollIntoView` (lines 39-46, the O-19 flat-netting root cause).
- Subject lines 16-18 — the `v-show`-never-`v-if` law for pickers, adopted to avoid remount echo,
  which is only a problem because there are N pickers instead of 1.

Three separate workarounds, all downstream of instantiating an invariant per row.

**Mechanism**: shared, stateless, invariant UI placed inside the iteration that consumes it.

**Reproduction**: the evaluate above; add stops via the rail and re-measure — `perRow.nodes`
stays 193 and `rowCount` tracks interval count.

**Cure — hoist the invariants out of the iteration.**

```
GradientEasingEditor.vue
  v-for row in specimenRows          ← head + ramp only (~12 nodes/row)
  ─────────────────────────────────
  <EasingSpecimenStrip               ← ONE instance
     :selected-id="openRow?.tileId"
     @select="tile => emit('update-interval', openInterval, tile.payload())" />
  <EasingAuthoringStage              ← ONE instance
     v-if="openRow" :value="openRow.interval" />
```

The strip's `visible` prop, its per-strip scroll scoping, the `tuneOpen: Record<number, boolean>`
map (subject line 84) and the v-show-not-v-if law all delete. Row cost drops ~193 → ~12; the
route's easing DOM becomes O(1) in interval count instead of O(n).

---

## L-r2-4 — MAJOR · The seat patches glass-ui's internals, and scrapes the DOM for state glass-ui already publishes

`EasingAuthoringStage.vue:86-115` reaches into the producer through three `:deep()` selectors
tied to its internal DOM shape, with three `!important`s:

```css
.easing-authoring :deep([data-testid="easing-picker"]) { grid-template-columns: 1fr; }
.easing-authoring :deep(.glass-card)                   { background: var(--well-bg); … }
.easing-authoring :deep(svg[role="img"])               { block-size: auto !important;
                                                          aspect-ratio: … !important; … }
```

A consumer styling a design-system component by its **test id** and its **internal class names**
is the inverse of edict 4 (variants belong in glass-ui) and edict 5 (root-level, never
per-instance). The file's own header (lines 13-15) concedes it: *"each recorded on the P7
EasingPicker-v2 packet; **the overrides retire at the adopt**"* — an acknowledged temporary that
has outlived two tranches.

The sharper half is line 44-67. To implement its zero-letterbox law the stage does:

```ts
const vb = rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal;
…
onMounted(syncVbRatio);
watch(() => value.css, () => requestAnimationFrame(syncVbRatio), { flush: "post" });
```

— a `requestAnimationFrame`-deferred DOM scrape, on mount and after every authored change, to
recover a number the producer **already publishes as reactive state**:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts
/** The bezier-canvas viewBox `{ minY, height }` clamping overshoot. */
viewBox: ComputedRef<{ minY: number; height: number }>;
```

`useEasingPicker` is exported from `@mkbabb/glass-ui/easing`
(`dist/components/easing/index.d.ts:3`). The demo is reading through the DOM what it could read
through the module boundary.

**Mechanism**: a producer that exposes its geometry to its *own* SFC but not through its
*component* contract, and a consumer that closes the gap by scraping instead of filing.

**Reproduction (deterministic from source)**: rename the `data-testid` or drop `role="img"` from
glass-ui's canvas `<svg>` in any 7.x patch — no type error, no lint error; the stage silently
letterboxes and the one-column law silently reverts to the 18 rem chrome rail inside a ~430 px
pane.

**Cure — three props, filed at the producer.** `EasingPicker` gains `layout?: "auto" | "stacked"`,
`surface?: Surface` (the axis already exists — `Chip` takes `surface?: Surface`), and either
`fit?: "viewbox"` or an `@resize` emission of the live viewBox. All three `:deep()` blocks, all
three `!important`s, `vbRatio`, `syncVbRatio`, the rAF and the `watch` delete — `EasingAuthoringStage`
becomes a `<EasingPicker layout="stacked" surface="well" fit="viewbox" :playback="false"
:readout="false">` and nothing else. This is a glass-ui BH/BI relay item.

---

## L-r2-5 — MAJOR · Four names for three types across the value.js↔glass-ui seam, bridged by casts

r1's L-4 found the `JumpTerm`/`JumpPosition` pair. The family is larger, and one member of it is
a duplication **inside value.js itself**.

| concept | value.js | glass-ui | bridged by |
|---|---|---|---|
| `(t)=>number` | `EasingFunction = (progress: number) => number` (`src/easing.ts:4`) | `EasingFn = (t: number) => number` (`useEasingPicker.d.ts`, commented *"the value.js family shape"*) | structural identity, silent |
| step jump term | `JumpPosition` (`src/easing.ts:13`) **and** `jumpTerms` (`src/easing.ts:68`) | `JumpTerm = (typeof jumpTerms)[number]` | `term as JumpPosition` — `easingCatalogue.ts:136` |
| bezier quad | `readonly [number,number,number,number]` (inline in `bezierPresets`, `src/easing.ts:67`) — no exported name | `BezierPoints = [number,number,number,number]` | `[...points] as BezierPoints` — `easingCatalogue.ts:108,123` |

value.js writes the jump union **twice, independently**, in one file:

```
13: export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";
68: export const jumpTerms = ["jump-start", "jump-end", "jump-none", "jump-both"] as const;
```

and the tell that the author did not trust the result is at line 136 — a **runtime** membership
check against a union the type system already closes:

```ts
if (!(jumpTerms as readonly string[]).includes(position)) return err({ code: "jump_position_invalid" });
```

**Mechanism**: the boundary vocabulary was re-declared downstream instead of imported, and
value.js gave it two spellings to re-declare from.

**Reproduction (deterministic from source)**: add `"jump-both-inclusive"` to `jumpTerms` (line
68) and forget line 13. `JumpTerm` widens, `JumpPosition` does not, and
`easingCatalogue.ts:136`'s `as` **silences the error** — the demo compiles and `steppedEase`
rejects at runtime with `jump_position_invalid`.

**Cure**: in value.js — `export type JumpPosition = (typeof jumpTerms)[number];` (one line, kills
the drift and the runtime guard) and `export type BezierQuad = readonly [number, number, number,
number];` exported from `/easing`. In glass-ui — delete `EasingFn`, `JumpTerm`, `BezierPoints`;
import `EasingFunction`, `JumpPosition`, `BezierQuad` from `@mkbabb/value.js/easing`, which it
already depends on (`useEasingPicker.d.ts` line 2 imports `jumpTerms` from it today). Both casts
in `easingCatalogue.ts` delete.

---

## L-r2-6 — MAJOR · `/easing` publishes curves but no way to draw one; the sampler is forked three ways

`glyphPath` (`easingCatalogue.ts:66-74`) samples an `EasingFunction` into a unit-box SVG polyline.
Its own header (lines 58-65) names it as an assay of keyframes.js's `generateCurveSVGPath`. And
glass-ui ships two more inside the picker:

```ts
// useEasingPicker.d.ts
/** The bezier path `d` (`M 0 1 C …`). */        bezierPathD: ComputedRef<string>;
/** The sampled staircase path `d` (steps mode). */ stepPathD: ComputedRef<string>;
```

Three implementations of *curve → SVG path* in the constellation, none of them in the package
that owns curves. value.js `/easing` exports the callables (`CubicBezier`, `steppedEase`,
`easing`, `linearEasing`, `bezierPresets`) and nothing to render them, so every consumer that
wants to *show* a curve writes the loop again.

`glyphPath` is pure math over a pure function — no DOM, no Vue, no CSS. It is library code
sitting in a demo leaf.

**Mechanism**: the library published the semantics and withheld the presentation-neutral
projection, so the projection was re-derived at each consumer.

**Reproduction**: none — this is a structural claim about three files, all quoted. Not a runtime
hypothesis.

**Cure**: `export function sampleCurvePath(fn: EasingFunction, samples = 48): string` in
`src/easing.ts`, exported from `/easing`. `glyphPath` deletes; `stepPathD` deletes; kf's copy
deletes; `bezierPathD` stays (it is an *analytic* `C` path, a genuinely different artifact —
and that difference becomes visible instead of buried).

---

## L-r2-7 — MAJOR · Dead re-export barrels, and a live dual path to the same constant

Confirms r1 L-6 and extends it with the *live* half.

**Dead.** `useGradientModel.ts:19-29` re-exports seven names under a comment that names the
mechanism — *"Re-exports (preserve public API surface)"*. Zero consumers:

```
$ for n in serializeGradient serializeCoalescedGradient serializeRailRamp \
           linearInterval parseGradientCSS GradientParseResult ParsedGradientModel; do
    grep -rn "$n" demo --include='*.ts' --include='*.vue' \
      | grep -v "workbenches/gradient/composables/"; done
demo/.../GradientStopEditor.vue:9:     * The rail-normalized 90° projection (`serializeRailRamp`, …
demo/.../easingCatalogue.ts:44:       // payload for the same curve MUST be byte-identical — the `linearInterval()`
```

Two hits, both **prose inside comments**. Every real in-tree consumer imports from the origin
module: `gradientParse.ts:22` and `useGradientModel.ts:15` take `linearInterval` from
`./useGradientCSS`; the subject takes `serializeIntervalRamp` from `../composables/useGradientCSS`
directly (line 31). The barrel exists to preserve a surface nobody consumes — edict 2.

**Live.** `useGradientInterpolation.ts:17` is the same shim, and its comment states the intent:

```ts
// Re-exported here so the gradient tree's own consumers keep their import path.
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../../color-session/color-space-meta";
```

`useGradientModel.ts:21` then re-exports it *again*. The result is two live paths to one constant:

```
GradientVisualizer.vue:19  ← useGradientModel ← useGradientInterpolation ← color-session/color-space-meta   (3 hops)
MixConfigBar.vue:18        ← color-session/color-space-meta                                                 (1 hop)
```

Two sibling workbenches, one constant, two import paths. That is the textbook dual path, and it
is exactly what a live boundary rule would have refused (L-r2-1).

**Cure**: delete both re-export blocks; `GradientVisualizer.vue` imports the constants from
`color-session/color-space-meta` like `MixConfigBar` already does. One name, one door.

---

## L-r2-8 — MAJOR · The library returns `Result` and publishes no way to unwrap it; the demo hand-rolls 17

r1 L-9 caught the two byte-identical `easingValue` copies. The family is the whole demo.

```
$ cat src/foundation/result.ts
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
export const ok  = …;
export const err = …;
```

`ok`/`err` are **not** re-exported by any subpath — `src/subpaths/color.ts:9` exports the
`Result` *type* alone, and no subpath exports an unwrap. So every consumer writes the same four
lines. Seventeen sites, measured:

```
$ grep -rn "throw new Error(\`" demo --include='*.ts' --include='*.vue' | grep -i "error.code"
… 17 lines across useGradientCSS.ts(×3), useGradientInterpolation.ts, easingCatalogue.ts,
  mixStage.ts, useMarkdownColors.ts(×2), generate-color.ts(×3), color-utils.ts,
  ink.ts(×4), palettes/mix.ts
```

Five of them are in this component's own dependency chain. Two of them are the *same function*
five files apart, differing only in the error prefix (`useGradientCSS.ts:71-77` /
`easingCatalogue.ts:98-104`) — and, as r1 notes, both are typed `ReturnType<typeof CubicBezier>`
while also being fed `steppedEase(…)` results, which only type-checks by coincidence of shape.

**Mechanism**: a failure-explicit library (the package description's own word) published the
discipline and withheld the ergonomic, so seventeen consumers re-invented the escape hatch —
each with its own message format, none with a shared type.

**Cure**: publish the unwrap from the foundation, as the eighth subpath:

```ts
// src/foundation/result.ts
export function unwrap<T, E extends { code: string }>(r: Result<T, E>, context: string): T {
    if (r.ok) return r.value;
    throw new Error(`${context}: ${r.error.code}`);
}
```

Seventeen hand-rolled sites collapse to seventeen call sites of one function with one message
grammar, and `easingValue` stops existing twice.

---

## L-r2-9 — MINOR · Root-barrel import of a composable the route has already loaded

Subject line 29: `import { useClipboard } from "@mkbabb/glass-ui";`

glass-ui 7.0.0 publishes **74** subpaths, and `useClipboard`'s home is `./dom`
(`dist/dom.js:134` exports it; `dist/composables/dom/useClipboard.d.ts` declares it). Measured
cost of the barrel, from the live dev server's own prebundle cache:

```
$ ls -la node_modules/.vite/deps/@mkbabb_glass-ui*.js
231357  @mkbabb_glass-ui.js        ← what line 29 imports
  4256  @mkbabb_glass-ui_dom.js    ← where useClipboard lives
```

54×. Static-graph closure over the published `dist/` agrees: root barrel 66 modules / 224,193 B
versus `dom.js` 8 modules / 12,599 B.

But the sharper fact is that this is not even a size trade at this seat. On the live route
**both chunks are already fetched**:

```
glassChunks: [ "@mkbabb_glass-ui_dark.js", "@mkbabb_glass-ui.js", "@mkbabb_glass-ui_dom.js", … ]
domChunk:    [ "@mkbabb_glass-ui_dom.js", "useClipboard-D36OTaeT-Cb2LWiW5.js" ]
```

`@mkbabb/glass-ui/dom` is in the route's graph regardless. So line 29 is a **second door to a
module the page already has** — pure dual path, edict 2, with no compensating benefit. The same
edge exists at `GradientVisualizer.vue:12` (`writeClipboard`) and across the 19 `demo/ui/*`
one-line barrels (r1 L-11).

**Cure**: `import { useClipboard } from "@mkbabb/glass-ui/dom";` — and a lint rule
(`no-restricted-imports`, group `@mkbabb/glass-ui`, allowing `@mkbabb/glass-ui/*`) so the class
cannot recur. Which requires L-r2-1 first.

---

## L-r2-10 — MINOR · Three props where one suffices; two of them are the same objects

```vue
<!-- GradientVisualizer.vue:242-247 -->
<GradientEasingEditor :stops="stops" :intervals="intervals" :model-state="modelState" … />
```

```ts
// useGradientModel.ts:102-109
const modelState = computed<GradientModelState>(() => ({
    type, direction,
    stops: stops.value,          // ← the same array as :stops
    intervals: intervals.value,  // ← the same array as :intervals
    interpolationSpace, hueMethod,
}));
```

`stops` and `intervals` are not derived from `modelState` — they are *identical references* inside
it. The component takes all three (lines 42-46), forwards all three as getters to
`useSpecimenRows` (lines 54-58), and the composable then uses `model` for nothing but
`interpolationSpace`/`hueMethod` (`useSpecimenRows.ts:56-58`). Meanwhile
`serializeIntervalRamp(modelState, …)` (line 66) reads the stops back *out* of `modelState`.

**Mechanism**: the prop surface grew per-need instead of being the model.

**Cure**: one prop, `:model="modelState"`. `useSpecimenRows(model)` takes one getter. Three
props → one, three getters → one, and the "which stops are authoritative" question stops being
askable.

---

## L-r2-11 — MINOR · A type cycle between the model, the serializer and the parser

```
useGradientModel.ts:15  import { useGradientCSS, linearInterval } from "./useGradientCSS"   value
useGradientModel.ts:16  import { parseGradientCSS }              from "./gradientParse"     value
useGradientCSS.ts:31-34 import type { GradientModelState, GradientInterval } from "./useGradientModel"
gradientParse.ts:22     import { linearInterval }                from "./useGradientCSS"    value
gradientParse.ts:23-27  import type { GradientType, GradientStop, GradientInterval } from "./useGradientModel"
```

`useGradientModel ⇄ useGradientCSS` and `useGradientModel → gradientParse → useGradientModel`.
Both back-edges are `import type`, so `verbatimModuleSyntax` erases them and there is **no runtime
cycle** — I checked, and I am not claiming one. It is a real cycle in the *type* graph, and it is
why the module named for the composable is also the module that owns the types, which is why the
dead re-export barrel (L-r2-7) felt necessary in the first place.

**Cure**: a leaf `model/gradient-model.ts` holding `GradientStop`, `GradientInterval`,
`GradientModelState`, `GradientType` and nothing else. Everything imports down into it; nothing
imports back out. The cycle and the barrel both vanish.

---

## L-r2-12 — MINOR · A published type name exists for the exact cast the demo writes

`src/subpaths/easing.ts:2` exports `BezierPresetName`. The demo uses it zero times:

```
$ grep -rn "BezierPresetName" demo | wc -l
0
```

`easingCatalogue.ts:107` re-derives it instead:

```ts
const quad = bezierPresets[name as keyof typeof bezierPresets];
```

`name` arrives from `Object.keys(bezierPresets)` (line 178), which TypeScript types `string[]` —
so the cast is load-bearing. `BezierPresetName` is the published name for exactly that, and
`Object.keys` should be a typed `bezierPresetNames: readonly BezierPresetName[]` on the library
side so no cast is needed at all.

---

## L-r2-13 — MINOR · Per-instance override of a variant the component is simultaneously requesting

Confirms r1 L-8(c) with the producer's own recipe quoted.
`EasingSpecimenStrip.vue:98-107` asks for `shape="cell"`, which
`chipVariants.d.ts` defines as `"glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`.
Lines 163-170 then override the padding and gap it just requested:

```css
.specimen-tile { display: flex; flex-direction: column; align-items: center;
                 gap: 0.125rem; padding: 0.3125rem 0.375rem 0.25rem; min-width: 2.75rem; }
```

This is a *size* variant of `shape="cell"`, not a one-off. Edict 5 says it lives at the root:
`Chip` already takes `size?: "sm" | "md" | "lg"` — the cure is `size="xs"` in glass-ui's `SIZE`
map, filed on the BH relay, and six declarations delete here.

---

## L-r2-14 — INFO · Hypothesis: the route restores over the requested hash

Observed while probing, **not** deterministically reproduced, and outside this seat's axis —
recorded so a routing seat can take it. Navigating Playwright to `http://localhost:9000/#/gradient`
and reading the page a few seconds later:

```json
{ "href": "http://localhost:9000/#/browse", "gradientSfc": 0, "rowsRendered": 0,
  "headingText": ["Browse", "My Palettes1 (1 saved)"] }
```

Setting `location.hash = "#/gradient"` afterwards mounted the pane in ~1.0 s and it stayed. So a
persisted-route restore appears to win a race against the initial hash on a cold context. The
visual-audit matrix does not show this (its settle is 3586 ms and its captures are correct), so
if real it is timing-sensitive. **Labelled a hypothesis.** No claim is built on it.

---

## L-r2-15 — INFO · Resource-timing buffer capped my network measurement

For the record, so no one re-derives a wrong number from my probes:
`performance.getEntriesByType('resource').length` returned exactly **250** — the default buffer
size. Entries past 250 were dropped, which is why `gradientSfc: []` appeared in one probe on a
page that had plainly loaded the gradient modules. The chunk facts in L-r2-9 come from the
network log and the on-disk prebundle sizes, not from that truncated buffer.

---

## The lattice, greenfield

Stated concretely, as the challenge asks. Arrows point downward only.

```
value.js /easing        EasingFunction · JumpPosition = (typeof jumpTerms)[number] · BezierQuad
                        bezierPresets · bezierPresetNames · CubicBezier · steppedEase · easing
                      + sampleCurvePath(fn, samples)                    ← NEW  (kills 3 forks)
value.js /css           parseTimingFunction  ⇄  serializeTimingFunction ← NEW  (kills 4 forks)
value.js /foundation    Result · ok · err · unwrap(r, context)          ← NEW  (kills 17 forks)
        │  one direction only (inv-K-1, lint-enforced today)
        ▼
glass-ui /easing        EasingPicker · useEasingPicker
                        EasingFn / JumpTerm / BezierPoints  DELETED → imported from value.js
                        readout = serializeTimingFunction(ast)
                        props += layout("auto"|"stacked") · surface(Surface) · fit("viewbox")
glass-ui /dom           useClipboard · writeClipboard                   (exists; use it)
glass-ui /chip          Chip · SIZE += "xs"
        ▼
demo/color-session      color-utils · ink · useContrastSafeColor · color-space-meta   (shared tier)
        ▼
demo/workbenches/gradient/
  model/gradient-model.ts    types ONLY — leaf, imports nothing in-tree
                             GradientInterval = { readonly css: string }
  model/useGradientModel.ts  state + actions
  model/serialize.ts         serializeGradient · Coalesced · Rail · IntervalRamp · easingFnOf
  model/parse.ts             parseGradientCSS
  easing/catalogue.ts        tiles = bezierPresets × serializeTimingFunction × sampleCurvePath
  GradientVisualizer.vue
    GradientEasingEditor.vue     :model="modelState" — ONE prop
      │  v-for row → head + ramp only
      ├─ EasingSpecimenStrip.vue     ONE instance, bound to the open row
      └─ EasingAuthoringStage.vue    ONE instance, zero :deep(), zero !important, zero rAF
```

What dies in the transposition: the demo's `bezierLiteral`, `stepsLiteral`, `glyphPath`, both
`easingValue` copies, the `as JumpPosition` and `as BezierPoints` casts, both re-export barrels,
the `.rail-btn` block, the `.specimen-tile` geometry block, the three `:deep()` blocks, `vbRatio`
+ `syncVbRatio` + its rAF and watch, the `tuneOpen` map, the `visible` prop and the strip's
scroll-scoping workaround, and two of the three props. What is added: three functions in
value.js, three props in glass-ui, one leaf types module in the demo.

---

## Verdict

**DEFECTIVE.**

- **Strongest defect**: **L-r2-2** — `GradientInterval = EasingPickerValue`. The premise names
  *wrong direction of dependency*, and this is it in one line: the persisted domain type of the
  library's own showcase is a Vue widget's transient v-model payload, three of whose six fields
  are written solely to satisfy the widget and read by nothing
  (`grep "\.points\b|\.steps\b|\.term\b" demo/workbenches/gradient/` → 2 hits, both writes in the
  tile factory). Every other ownership defect in this report is downstream of the same instinct:
  when a layer has no door, take the type from whichever neighbour does.
- **Runner-up by measurement**: **L-r2-3** — 193 DOM elements per interval row, 30.9% of the
  route's DOM, for an invariant 27-tile catalogue that is a module constant.
- **Runner-up by blast radius**: **L-r2-1** — the demo module-graph guard has matched zero files
  since W43 (`no-restricted-imports => undefined` on the subject). The invariant still holds by
  discipline; nothing enforces it.

Three of the eight MAJORs are **value.js's own public surface**, not the demo's: no
`serializeTimingFunction` (r1 L-3 / this round's L-r2-5 family), no curve sampler (L-r2-6), no
`unwrap` (L-r2-8), plus the doubled `JumpPosition`/`jumpTerms` declaration inside `src/easing.ts`.
That is the seat's finding in its most useful form: **the demo's forks are a readout of the
library's missing doors.** Fixing the demo without adding the three exports would simply move the
forks.

---

### Probe log

| # | command / call | result used for |
|---|---|---|
| 1 | `grep -rn "@src" demo/workbenches/gradient/ \| wc -l` → `0` | negative proof |
| 2 | `ls -d demo/@` → `No such file or directory` | L-r2-1 |
| 3 | `grep -rn 'from "@components/' demo \| wc -l` → `0` | L-r2-1 |
| 4 | `npx eslint --print-config <subject>` → `no-restricted-imports => undefined` | L-r2-1 |
| 5 | `grep -rn "\.points\b\|\.steps\b\|\.term\b" demo/workbenches/gradient/` → 2 hits, both writes | L-r2-2 |
| 6 | Playwright evaluate on `localhost:9000/#/gradient` → `{docNodes:625, perRow:[{nodes:193, tiles:27, svgPaths:41, pickers:1, pathPointChars:18541}]}` | L-r2-3 |
| 7 | Playwright evaluate → `railBtns: ["24x24","24x24"]` | negative proof (tap targets) |
| 8 | `cat …/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts` → `viewBox: ComputedRef<…>` | L-r2-4 |
| 9 | `grep -n "jumpTerms\|JumpPosition" src/easing.ts` → lines 13, 68, 133, 136 | L-r2-5 |
| 10 | `for n in serialize… ; do grep …` → 2 hits, both in comments | L-r2-7 |
| 11 | `grep -rn "throw new Error(\`" demo … \| grep error.code` → 17 sites | L-r2-8 |
| 12 | `ls -la node_modules/.vite/deps/@mkbabb_glass-ui*.js` → 231357 vs 4256 B | L-r2-9 |
| 13 | static closure over `dist/`: root 66 mod / 224193 B, dom 8 mod / 12599 B | L-r2-9 |
| 14 | `browser_network_requests(filter: glass-ui)` → both `@mkbabb_glass-ui.js` and `_dom.js` fetched | L-r2-9 |
| 15 | `grep -rn "BezierPresetName" demo \| wc -l` → `0` | L-r2-12 |
| 16 | `REPORT.json` `/#/gradient` × 4 matrices → `pageErrors 0`, `consoleErrors 0`, `overflowX 0` | negative proof |
| 17 | read `shots/safari-desktop-light/gradient.png` | render confirmed correct; no visual defect found |

**Files written by this seat**: this file only. No source edits.
