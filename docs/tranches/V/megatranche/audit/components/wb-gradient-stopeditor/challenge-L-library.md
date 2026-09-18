# CHALLENGE-L — library structure under `GradientStopEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M-context seat)** — the tier declared at spawn.
The seat is declared, not inherited.

- Subject: `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (392 lines by `wc -l`; the
  brief says ~393)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Premise accepted: the library structure underneath this component is wrong. It is. Fourteen edges below.
- Live probes: dev server `http://localhost:9000/#/gradient` (Playwright, read-only gestures), `vite-node`
  against the demo's own modules, `node` against `dist/` and against the installed `@mkbabb/value.js@4.0.0`.
- Written artefacts: this file + `evidence-rail-after-reorder.png` (both under this seat's directory).
  **No source edits.**

---

## 0. What the component actually imports

```
GradientStopEditor.vue
├── vue                                        {ref, computed, useTemplateRef}
├── @lucide/vue                                {X}                    ← devDependency, icon
└── ../composables/useGradientModel             type GradientStop     ← import type ✓
```

Three edges. Two are trivially correct. The third is the apex of a type-graph cycle (§L-7) and drags the
component's prop contract onto the module that also owns state construction, CSS serialization re-exports,
and the parser re-export.

The component imports **nothing** from `@mkbabb/value.js`. That is itself the finding in §L-12: it hand-rolls
`clamp` twice while the published `@mkbabb/value.js/math` exports `clamp` and `scale`, and the sibling
`SpectrumCanvas.vue:37` imports exactly that.

`verbatimModuleSyntax` (edict 8): **satisfied** — the sole type import is `import type` (line 4).
Vue 3.5 idiom (edict 7): **satisfied** — `useTemplateRef` (28), reactive props destructure (6), `defineModel`
(26). Both recorded as negative proofs in §NP.

---

## L-1 — BLOCKER — the stop-ordering invariant has three owners and three contradictory policies

**Defect.** "Stops are non-decreasing in position" is asserted, enforced, and ignored in three different
modules. The drag path this component drives is the one that ignores it, and the result is a model whose own
serializer emits CSS that its own parser rejects.

| owner | policy | site |
|---|---|---|
| parser | **reject** — `"stop positions must be non-decreasing"` | `demo/workbenches/gradient/composables/gradientParse.ts:284-290` |
| add | **sort** — `[...stops, newStop].sort((a,b) => a.position - b.position)` | `demo/workbenches/gradient/composables/useGradientModel.ts:118` |
| drag (this component) | **none** — `stops.value.map(s => s.id===id ? {...s, ...patch} : s)` | `demo/workbenches/gradient/composables/useGradientModel.ts:127-131` |

The component emits `update:position` on every pointermove (`GradientStopEditor.vue:94, 145`) and on every
arrow keypress (`:179`). `GradientVisualizer.vue:94-96` routes that straight into the unsorted `updateStop`.
`getPosition()` clamps to `[0,100]` and **nothing** clamps against the neighbours.

**Evidence — live, fresh mount, `http://localhost:9000/#/gradient`.** Added a stop at 50%, then dragged the
first handle to 80%:

```
handles (DOM order) : ["Gradient stop at 80%", "Gradient stop at 50%", "Gradient stop at 100%"]
CSS readout         : linear-gradient(90deg, oklch(0.75 0.15 145) 80%,
                                              oklch(70% 0.165 205deg) 50%,
                                              oklch(0.65 0.18 265) 100%)
computed --rail-ramp: linear-gradient(90deg, oklch(75% …) 80.00%,
                                              oklch(74.68% …) 78.13%,
                                              oklch(74.37% …) 76.25%, …   ← DECREASING
```

CSS clamps each gradient stop to `max(previous, own)`, so every one of those descending sub-stops collapses
onto 80% and the whole first interval paints as one flat slab. See
`evidence-rail-after-reorder.png` in this directory: the rail is a solid green field from 0% to ~78% with a
hard band to blue — the eased ramp is gone, and the 50% handle floats in a colour that has nothing to do with
its own stop.

**Evidence — the round trip, live.** Feeding the app's own CSS output back into its own editor
(`[aria-label="Gradient CSS"]`, `@input` → `applyCSS`):

```
fed     : linear-gradient(90deg, … 50%, … 0%, … 0.2%, … 100%)
verdict : "stop positions must be non-decreasing (hard-stop reordering isn't modeled)"
```

The `data-testid="gradient-parse-verdict"` row renders in `text-destructive`. **The application declares its
own output invalid.**

**Evidence — headless, deterministic** (`vite-node`, demo modules, no browser):

```
$ npx vite-node scratch/p2.ts
serialized : linear-gradient(90deg, oklch(0.75 0.15 145) 70%, oklch(0.7 0.16 200) 50%, oklch(0.65 0.18 265) 100%)
re-parse   : REJECT — stop positions must be non-decreasing (hard-stop reordering isn't modeled)
```

(script: three stops at 0/50/100, `updateStop("a", {position:70})` exactly as the drag path does, then
`serializeGradient` → `parseGradientCSS`.)

**Reproduction.** `http://localhost:9000/#/gradient` → click the rail at ~50% → drag the leftmost handle to
80% → read the CSS box. Positions descend. Select all in the CSS box, retype it, and the destructive verdict
appears.

**Why the gates missed it.** `e2e/smoke/views/gradient.spec.ts:161-172` drags the **middle** handle to 75% —
strictly between its neighbours, so ordering can never break. The round-trip test at `:189` only exercises
*authored CSS → model*, never *model → CSS → model*. The invariant has no test in either direction.

**Mechanism.** Unique semantic ownership violated: a model invariant is enforced by whichever mutator happens
to remember it, instead of by the type that carries it.

**Cure (transposition, not patch).** The stop list stops being a bare array. A `stops.ts` module owns the
ordering algebra and is the *only* module allowed to produce a `GradientStop[]`:

```ts
// demo/workbenches/gradient/model/stops.ts
export type OrderedStops = readonly GradientStop[] & { readonly __ordered: unique symbol };
export function insertStop(s: OrderedStops, stop: GradientStop): OrderedStops;
export function moveStop(s: OrderedStops, id: string, position: number): OrderedStops; // re-sorts, stable
export function removeStop(s: OrderedStops, id: string): OrderedStops;
```

`serializeGradient` / `sampleCoalescedStops` / `parseGradientCSS` all take `OrderedStops`. `moveStop` re-sorts
(the CSS-native behaviour a user expects from dragging a handle past another) and the parser's reject-branch
becomes unreachable-by-construction rather than a runtime tripwire aimed at the app itself.

---

## L-2 — BLOCKER — the published `/css` surface is not total, so the demo's "library oracle" idiom is unsound

**Defect.** `gradientParse.ts` is architected on an explicit premise, stated in its own header at lines 16-17:

> "Each token is then validated by the LIBRARY's own parsers (`parseCssColor` / `parseCssScalar` — the
> validity oracles; the demo never hand-validates a color)."

`parseCssColor` is not a validity oracle. It **throws** on eight empty-argument colour functions instead of
returning `{ok:false}`, so `isColorToken` (`gradientParse.ts:92-94`, `return parseCssColor(token).ok`) is a
crash site, and the throw escapes the whole model-or-reject contract.

**Evidence — the shipped package.** Both the working-tree `dist/` and the installed `@mkbabb/value.js@4.0.0`
in `node_modules`:

```
$ node -e "…dist/subpaths/css.js…"
"oklch()"  -> THROW: TypeError Cannot read properties of undefined (reading 'replace')
"rgb()"    -> THROW: …   "hsl()" -> THROW: …   "lab()"  -> THROW: …
"lch()"    -> THROW: …   "oklab()" -> THROW: … "hwb()"  -> THROW: …   "color()" -> THROW: …
"rgb(1 2 3)" -> ok   "red" -> ok   "oklch(0.7 0.1 30)" -> ok

$ node -e "…node_modules/@mkbabb/value.js/dist/subpaths/css.js…"
THROW: Cannot read properties of undefined (reading 'replace')       ← the PUBLISHED 4.0.0 has it too
```

**Evidence — in the browser, on the exact module the demo consumes** (dynamic import of the aliased file from
the live page):

```json
{"oklch()": "THROW: Cannot read properties of undefined (reading 'replace')",
 "rgb()"  : "THROW: Cannot read properties of undefined (reading 'replace')",
 "oklch(0.7 0.1 30)": "ok"}
```

**Evidence — through the demo's own parser** (`vite-node`, demo module + aliased library):

```
linear-gradient(90deg, oklch(), blue)  -> UNCAUGHT TypeError: Cannot read properties of undefined (reading 'replace')
linear-gradient(90deg, rgb(), blue)    -> UNCAUGHT TypeError: …
linear-gradient(90deg, color(), blue)  -> UNCAUGHT TypeError: …
linear-gradient(90deg, red, blue)      -> ok
```

**Root cause.** `src/css/grammar.ts:181`:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

`slash[0]!` is a non-null assertion over `splitTopLevel("", "/")`, which returns `[]` for an empty body. The
`!` is a lie, and it is the only thing standing between a `Result`-typed public API and a `TypeError`.

**Reproduction.** `npx vite-node` on the three-line script above, or type `linear-gradient(90deg, oklch(), blue)`
into the gradient CSS box on a mounted pane.

**Mechanism.** A published API whose *type* says `ParseResult<CssColor>` and whose *runtime* says "or I throw".
Every consumer written against the type is structurally wrong, and this component's tree is the proof.

**Cure.** Totality is the contract, and it belongs in the library, not in a demo try/catch. Replace the
non-null assertions in `parseFunctionalColor` with an explicit empty-body reject (`failure(source, "css_syntax",
["components"])`), and add a property test over the cross-product `{fn} × {"", " ", "/", ",,"}` so the surface
can never regress to partiality. **Do not** wrap `isColorToken` in a try/catch — that would move the library's
contract into its consumer, which is the disease this challenge is looking for.

---

## L-3 — MAJOR — the rail axis is mapped twice, in two languages, over two different boxes

**Defect.** The forward map (pointer → position) is TypeScript over the **border box**; the inverse map
(position → pixels) is CSS `calc` over the **padding box**. They disagree by the rail's 1px border at each
end.

```ts
// GradientStopEditor.vue:75-81   forward: origin rect.left, span rect.width - 20
const rect = barRef.value.getBoundingClientRect();      // border-box: x=224, width=462
const x = e.clientX - rect.left - HANDLE_HALF;
const span = Math.max(1, rect.width - HANDLE_HALF * 2); // 442
```
```ts
// GradientStopEditor.vue:55-57   inverse: CSS `100%` = the padding box of the positioned rail
return `calc(${HANDLE_HALF}px + (100% - ${HANDLE_HALF * 2}px) * ${position / 100})`;  // 100% = 460, origin 225
```

**Evidence — measured live.**

```
rail  : x=224.0  width=462.0  borderLeft=1px          (padding box: origin 225, width 460)
handle "Gradient stop at 0%"   : style.left="calc(0% + 10px)"    measured centre cx = 235
handle "Gradient stop at 100%" : style.left="calc(100% - 10px)"  measured centre cx = 675
forward map at those pixels    : pos(235) = (235-234)/442*100 = 0.226      pos(675) = 99.774
```

Then I clicked the rail at **x = 235 — the exact pixel where the 0% handle is painted** (y = rail top + 4px, above
the 24px hit-expander so the bar owns the gesture). The app minted a stop at **0.2%**, drawn at cx 235.88:

```
css after the click : linear-gradient(90deg, … 0%, … 0%, oklch(74.98% 0.15006 145.24deg) 0.2%, … 100%)
new handle          : style.left = "calc(0.2% + 9.96px)"   cx = 235.88
```

Click where 0% is drawn, get 0.2%, and the new handle lands ~0.9px to the right of your pointer. The error is
antisymmetric about the centre (zero at 50%, ±0.23% at the ends) — precisely the "pointer maths at container
edges" the brief suspected, and it is invisible in the middle where every test drags.

**Mechanism.** One geometric law, two implementations, two coordinate origins. The CSS one silently changes
meaning if anyone ever adds a border or padding to `.gradient-rail`; the TS one does not.

**Cure.** One axis, one owner, both directions:

```ts
// demo/workbenches/gradient/GradientVisualizer/useRailGeometry.ts
export function useRailGeometry(el: Readonly<ShallowRef<HTMLElement|null>>, halfPx: number) {
  const box = () => el.value!.getBoundingClientRect();          // ONE box, chosen once
  return {
    toPosition: (clientX: number) => clamp(scale(clientX, box().left + halfPx, box().right - halfPx, 0, 100), 0, 100),
    toOffsetPx: (position: number) => scale(position, 0, 100, halfPx, box().width - halfPx),
  };
}
```

with `clamp`/`scale` imported from `@mkbabb/value.js/math` (§L-12) and the handle positioned in `px`, not
`calc(%)`, so the two directions are provably inverse. Both the ghost and the handle then ride the same map by
construction.

---

## L-4 — MAJOR — the "ONE sampling law" is implemented twice, and the model's interpolation space never reaches the CSS

**Defect (a) — duplication.** `useGradientCSS.ts:171-174` declares itself:

> "The ONE sampling law: eased sub-stops consumed by the coalesced renderer, the normalized editing rail, and
> each interval specimen."

`GradientVisualizer.vue:64-88` (`colorAtPosition`) re-implements it — the same interval walk, the same
`easingFnOf(interval)(t)`, the same `interpolateStopColors` — and hands it to **this component** as an optional
function prop (`GradientStopEditor.vue:16`, `colorAt?: (position:number) => string`). So the ghost dot and the
rail it floats over are painted by two different implementations of one law.

**Defect (b) — the space is dropped.** `rampGradient` (`useGradientCSS.ts:219-224`) emits

```ts
return `linear-gradient(90deg, ${parts.join(", ")})`;
```

with **no `in <space>` clause**, even though `model.interpolationSpace` is right there. The browser therefore
blends between the 32 sub-stops in sRGB while the model's law is oklch. `COALESCE_RESOLUTION = 32`
(`useGradientCSS.ts:42`) exists to make that error small — i.e. the coalescing machinery is a polyfill for a
CSS Color 4 feature the platform already ships (`linear-gradient(in oklch, …)`, Safari 16.2+, which the audit
matrix is).

**Evidence.** `useGradientCSS.ts:171-216` vs `GradientVisualizer.vue:64-88` — two interval walks, byte-different,
same intent. `useGradientCSS.ts:223` — the emitted string carries no interpolation space. Live computed
`--rail-ramp` (§L-1) confirms it: `linear-gradient(90deg, oklch(75% …) 80.00%, …)`, no `in oklch`.

**Reproduction.** Structural (two call sites); the sRGB-vs-oklch inter-sub-stop deviation is bounded by the
32-sample density and was not separately measured — **that half is labelled a hypothesis.**

**Mechanism.** The concept "the colour of this ramp at position p" has no home. It leaks into a component prop
because no module exports it.

**Cure.** Export the point query from the sampling module and delete the prop:

```ts
// model/sample.ts
export function sampleAt(model: GradientModelState, position: number): AnyColor;   // ← the ghost + the mint
export function sampleRamp(model: GradientModelState): CoalescedSample[];          // ← the ramps
export function serializeRamp(model): string;   // emits `linear-gradient(90deg in ${model.interpolationSpace}, …)`
```

and coalesce **only** where an interval's easing is non-linear. With the `linear` seed on every interval — which
is what `parseGradientCSS` produces for every parsed gradient (`gradientParse.ts:295-298`) — the correct output is
a two-stop `linear-gradient(in oklch, …)`: shorter, exact, and no longer a 32-stop approximation of something
CSS does natively.

---

## L-5 — MAJOR — two dead re-export shims, one three-hop alias chain (edict 2: no aliases, no dual paths)

**Defect.** `useGradientModel.ts:19-29` is a re-export block whose own comment names it:

```ts
// ── Re-exports (preserve public API surface) ──
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export { serializeGradient, serializeCoalescedGradient, serializeRailRamp, linearInterval } from "./useGradientCSS";
export { parseGradientCSS } from "./gradientParse";
export type { GradientParseResult, ParsedGradientModel } from "./gradientParse";
```

"Preserve public API surface" is the literal definition of a back-compat shim. Five of the seven re-exported
names have **zero** consumers through this door:

```
$ grep -rn "serializeGradient|serializeCoalescedGradient|serializeRailRamp|linearInterval|parseGradientCSS|GradientParseResult|ParsedGradientModel" demo/ test/ e2e/
demo/…/GradientEasingEditor.vue:31  import { serializeIntervalRamp } from "../composables/useGradientCSS";   ← direct
test/gradient-parse.test.ts:10      import { parseGradientCSS }   from "…/composables/gradientParse";        ← direct
test/gradient-parse.test.ts:11      import { serializeGradient }  from "…/composables/useGradientCSS";       ← direct
test/gradient-v4-consume.test.ts:4  import { easingFnOf, linearInterval, … } from "…/composables/useGradientCSS";  ← direct
```

Every real consumer already uses the canonical home. The barrel is dead weight that nonetheless forces the
type-graph cycle in §L-7.

**Defect (second shim, three hops).** `useGradientInterpolation.ts:13-17`:

```ts
// … Re-exported here so the gradient tree's own consumers (`useGradientModel` → visualizer) keep
// their import path.
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../../color-session/color-space-meta";
```

so the chain is `color-session/color-space-meta` → `useGradientInterpolation:17` → `useGradientModel:21` →
`GradientVisualizer.vue:19`. The sibling workbench does it correctly in one hop:

```
demo/workbenches/mix/MixConfigBar.vue:18  import { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../color-session/color-space-meta";
```

Two doors to one symbol, and the comment states the reason is import-path preservation — a migration shim that
outlived its migration.

**Cure.** Delete both blocks. `GradientVisualizer.vue` imports `color-space-meta` directly, exactly as
`MixConfigBar.vue` does. Zero call-site churn beyond one line, because nothing else uses the door.

---

## L-6 — MAJOR — `demo/ui/*` is a 19-module alias barrel over glass-ui, and this component's parent uses three doors at once

**Defect.** Every module under `demo/ui/` is a bare re-export of the design system:

```
$ cat demo/ui/slider/index.ts   →  export { Slider } from "@mkbabb/glass-ui";
$ cat demo/ui/button/index.ts   →  export { Button } from "@mkbabb/glass-ui";
$ grep -rl "@mkbabb/glass-ui" demo/ui/ | wc -l   →  19
```

Nineteen alias modules, no variants, no adaptation — the pure shim edict 2 forbids and the shadow layer edict 4
forbids. `GradientVisualizer.vue`, the subject's only parent, then imports the design system through **three
different doors in one file**:

```
:9   import { Select, … }  from "../../../ui/select";      ← the shim
:10  import { Slider }     from "../../../ui/slider";      ← the shim
:12  import { writeClipboard } from "@mkbabb/glass-ui";     ← the package
:13  import { DockControl }    from "@mkbabb/glass-ui/dock";← the subpath
```

**Cure.** Delete `demo/ui/`. Import `@mkbabb/glass-ui/<subpath>` everywhere — the package publishes 60+
subpaths including `./select`, `./slider`, `./chip`, `./button`, so the deep-import door already exists and is
the tree-shakeable one.

---

## L-7 — MAJOR — the domain types live inside the state factory, producing a type-graph cycle the component sits on top of

**Defect.** `GradientStop`, `GradientType`, `GradientInterval`, `GradientModelState` are declared in
`useGradientModel.ts:33-62` — the module that also constructs reactive state, owns the mutators, and re-exports
the serializers and the parser. Every module that needs only a *shape* must import the *factory*:

```
useGradientModel.ts:15  →  useGradientCSS        (value: useGradientCSS, linearInterval)
useGradientCSS.ts:31-34 →  useGradientModel      (type: GradientModelState, GradientInterval)     ← cycle
useGradientModel.ts:16  →  gradientParse         (value: parseGradientCSS)
gradientParse.ts:23-27  →  useGradientModel      (type: GradientType, GradientStop, GradientInterval) ← cycle
GradientStopEditor.vue:4→  useGradientModel      (type: GradientStop)                             ← the component
```

Two cycles. Both are **type-only**, so `verbatimModuleSyntax` erases them and the *runtime* graph stays acyclic
(`model → css`, `model → parse → css`) — stated precisely so this is not overclaimed. But the *declaration*
graph is cyclic, and it is why §L-5's dead barrel cannot simply be deleted without also moving the types.

**Cure.** A leaf types module with zero intra-tree imports:

```
model/types.ts   ← GradientStop | GradientType | GradientInterval | GradientModelState | GradientParseResult
                   (imports only `@mkbabb/value.js/color` and `@mkbabb/glass-ui/easing` types)
```

Everything depends on the leaf; nothing depends on the factory except the Vue layer. `GradientStopEditor.vue:4`
becomes `import type { GradientStop } from "../model/types"` and the component stops transitively naming the
parser, the serializers, and Vue's `watch`.

---

## L-8 — MAJOR — the demo type-resolves against the *installed* package while it runtime-resolves against the *working tree*, and its `paths` advertise three specifiers the exports map does not publish

**Defect (a) — phantom public specifiers.** `tsconfig.demo.json` `compilerOptions.paths`:

```
@mkbabb/value.js          -> ['./dist/index.d.ts']              ← package.json#exports has NO "." key
@mkbabb/value.js/parsing  -> ['./dist/subpaths/parsing.d.ts']   ← NO "./parsing" key
@mkbabb/value.js/units    -> ['./dist/subpaths/units.d.ts']     ← NO "./units" key
@mkbabb/value.js/color|math|easing|transform|quantize            ← real
(no entry for @mkbabb/value.js/css, which 10 demo files import)
```

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
```

`package.json#exports` publishes exactly seven subpaths and **no root**. So `paths` declares three specifiers a
real consumer cannot write (`ERR_PACKAGE_PATH_NOT_EXPORTED`) and points two of them at files that do not exist,
while `vite.config.ts:41-50` generates its alias set *from the exports map* and therefore has no runtime alias
for any of them. Nothing imports them today (verified by grep) — they are dead entries whose only function is to
make an unpublishable import typecheck. Edict 2.

**Defect (b) — two value.js's in one build.** The demo's *types* resolve to the installed package; its *runtime*
resolves to the working-tree `dist/`:

```
$ npx tsc -p tsconfig.demo.json --noEmit --explainFiles | grep subpaths/css
dist/subpaths/css.d.ts
  Imported via "@mkbabb/value.js/css" from 'demo/color-session/picker-color.ts'
  with packageId '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'          ← node_modules, v4.0.0

$ cmp node_modules/@mkbabb/value.js/dist/subpaths/css.js dist/subpaths/css.js
DIFFERENT
```

vite aliases to `path.resolve(dirname, conditions.import)` = the repo's own `dist/`. So typecheck reads one
build and the browser executes another, and they are byte-different today. This is exactly the crack through
which §L-2 shipped: the `.d.ts` promises `ParseResult`, the `.js` throws.

**Cure.** Remove the three phantom `paths` entries and add the missing `./css`, or — better — delete the
`paths` block entirely and let `node_modules/@mkbabb/value.js` be a workspace link to the repo, so exactly one
artefact serves both types and runtime and the exports map is the single gate. A demo that dogfoods a *different
build* than it typechecks is not a dogfood.

---

## L-9 — MINOR — every drag frame emits `update:position` twice; the comment that explains why it does not is wrong

**Defect.** `GradientStopEditor.vue:91-99`:

```ts
function onBarPointerMove(e: PointerEvent) {
    if (draggingId.value) {
        // Fallback path while a handle drag is live (capture sits on the handle).
        emit("update:position", draggingId.value, getPosition(e));
        return;
    }
```

Pointer capture retargets events to the handle — it does **not** stop them bubbling to the handle's ancestor.
The handle's own `@pointermove="onHandlePointerMove"` (`:266`) fires, then the same event bubbles to the bar and
fires `onBarPointerMove`, which takes the `draggingId` branch and emits the identical value again. It is not a
fallback; it is the always-path.

**Evidence — measured live.** A capture-free listener added to the bar element, counting pointermoves whose
`target` is not the bar, during a four-step handle drag:

```
handleMovesThatAlsoReachedBar : 4     (of 4 dispatched on the handle)
```

Every handle move reaches the bar. Two emits per frame, two model rewrites, two full `computed` recomputations
of `railRampCSS` / `coalescedCSS` (32 colour mixes each) per pointer frame.

**Cure.** `onHandlePointerMove` ends with `e.stopPropagation()`, or — in the greenfield lattice — the bar owns
no drag branch at all, because the gesture FSM (§L-13) owns capture and dispatch.

---

## L-10 — MINOR — the selected stop has two write channels, and the outer `defineModel` is bound by nobody

**Defect.** The component writes the selection twice, over two mechanisms:

```
GradientStopEditor.vue:26   const selectedId = defineModel<string|null>("selectedId", { default: null });
GradientStopEditor.vue:129  selectedId.value = id;      // channel 1: the model
GradientStopEditor.vue:130  emit("select", id);         // channel 2: an event carrying the same fact
GradientVisualizer.vue:140  v-model:selected-id="selectedStopId"
GradientVisualizer.vue:144  @select="(id) => selectedStopId = id"     ← writes the SAME ref again
```

`@select` is redundant by construction: the model write already landed. And the ref it writes is itself a
phantom API — `GradientVisualizer.vue:51` declares `defineModel<string|null>("selectedStopId")`, but its only
parent renders `<GradientVisualizer ref="visualizerRef" />` (`GradientPane.vue:24`) with no binding. A
`defineModel` no parent binds is a local `ref` wearing a public-API costume (edict 3, contrivance).

**Cure.** Delete the `select` emit and the `@select` handler; demote `selectedStopId` to `ref` until a parent
actually needs it.

---

## L-11 — MINOR — an optional collaborator with a masking fallback, and a `= undefined` default

```ts
// GradientStopEditor.vue:6
const { stops, railRamp, colorAt = undefined } = defineProps<{ … colorAt?: (position:number) => string }>();
// :71-73
const ghostColor = computed(() => hoverPos.value !== null ? (colorAt?.(hoverPos.value) ?? null) : null);
// :219-221  → falls back to a bare `var(--alpha-checker)` ghost
```

`colorAt` has exactly one call site (`GradientVisualizer.vue:139`) and it always passes it. The optionality is
dead, and `?.() ?? null` is a masking fallback that degrades the add-affordance to a transparent dot instead of
failing — edict 2 forbids masking fallbacks. `= undefined` as a destructure default is a no-op (edict 3).

**Cure.** Under §L-4 the prop disappears entirely: the component calls `sampleAt(model, p)` from the model
module, or receives a required non-optional `ramp` object. Either way there is no branch to mask.

---

## L-12 — MINOR — the component hand-rolls `clamp` while the library publishes it, in a repo whose demo *is* the dogfood proof

`vite.config.ts:63-66` states the constitutional position: *"T.W1 (the demo-dogfood keystone) retired every
`@src/*` import from the DEMO tree — the demo consumes value.js ONLY through the published `@mkbabb/value.js`
subpaths."* The component then writes:

```ts
GradientStopEditor.vue:80   Math.round(Math.max(0, Math.min(100, (x / span) * 100)) * 10) / 10
GradientStopEditor.vue:177  Math.max(0, Math.min(100, stop.position + delta))
gradientParse.ts:282        s.position = Math.min(100, Math.max(0, s.position));
```

while `@mkbabb/value.js/math` publishes `clamp` **and** `scale` (`src/subpaths/math.ts` → `src/foundation/math.ts:2,7`)
— `scale(value, fromMin, fromMax, toMin, toMax)` is literally the rail's axis map. The sibling
`SpectrumCanvas.vue:37` and `mixStage.ts:15` both import `clamp` from the package. Two idioms for one primitive
inside one demo; the `/math` subpath's proof-of-use is therefore inconsistent.

**Cure.** `import { clamp, scale } from "@mkbabb/value.js/math"` in `useRailGeometry.ts` (§L-3) and in
`gradientParse.ts`. Zero new surface; it deletes hand-rolled arithmetic and makes the axis map one expression.

---

## L-13 — MINOR — a track-with-thumbs instrument built from raw divs while glass-ui publishes `./slider`, `./chip`, `./button`

The component's own comments repeatedly locate it inside the design system's vocabulary — *"a pill-silhouette
instrument (T-46 — the glass-ui slider-track rounding register)"* (`:196-198`), *"the ONE
`--focus-ring-inner/-outer` recipe, focus-ring.css"* (`:335`) — and then implements it entirely from
`<div class="gradient-rail …">` + `<button class="rail-handle …">` + `<button class="rail-remove-chip …">`
with 88 lines of scoped CSS re-deriving focus rings, forced-colors handling, and touch-target inflation.
glass-ui 7.0.0 publishes `./slider` (a reka-ui `SliderRoot`, which supports an array model and therefore N
thumbs), `./chip`, and `./button` — the three primitives this file re-creates. Edict 4 puts variants in glass-ui
and edict 5 puts styling at the root component level; the focus-ring and hit-inflation recipes here are exactly
the kind of thing that should exist once, in the producer.

**Honest bound:** a gradient rail is genuinely more than a Slider — it inserts and deletes thumbs and each thumb
carries its own colour fill. The cure is not "use `Slider`"; it is *"land a `variant="rail"` (or a
`SliderThumb` slot accepting per-thumb content) in glass-ui and consume it"*, with the focus-ring +
`--touch-target` inflation moving into the producer's `SliderThumb` root where all seven consumers get them.

---

## L-14 — MINOR — the add path destroys the authored-literal invariant the parse path is built to protect

`gradientParse.ts:17-18` calls literal preservation a "welcome corollary" and `serializeGradient` keeps
`stop.cssColor` verbatim. The bar-click mint does the opposite. Live, after one click on the rail:

```
linear-gradient(90deg, oklch(0.75 0.15 145) 0%,
                       oklch(74.979999519572% 0.150060001441 145.240005765141deg) 0.2%,   ← minted
                       oklch(0.65 0.18 265) 100%)
```

Fifteen significant digits, lightness re-expressed as a percentage, hue re-expressed with a `deg` unit — a
different literal *grammar* for the same concept, in the same string, in a readout the user is meant to copy.
The model now carries two dialects of `oklch()`.

**Mechanism.** `colorToCss` (`demo/color-session/color-utils.ts:23`) is a full-precision debug serializer being
used as an authoring serializer. One concept, one home: the model needs a single `formatColorLiteral` with a
declared precision, used by the mint, the parse fallback, and the readout alike.

---

## NP — negative proofs (checked, and sound)

- **Edict 8, `verbatimModuleSyntax`:** the component's only type import is `import type { GradientStop }`
  (`:4`). `npx tsc -p tsconfig.demo.json --noEmit` resolves it through the type layer without a value emit.
  Clean.
- **Edict 7, Vue 3.5 idiom:** `useTemplateRef` (`:28`), reactive props destructure (`:6`), `defineModel`
  (`:26`), no `defineExpose`-of-internals. Clean (the `= undefined` default in L-11 is style, not idiom).
- **Edict 6, animations:** nothing deleted; the handle's spring retime rides `--spring-snappy` /
  `--spring-snappy-duration` inline (`:262-263`) and the scoped keyframe-free transitions stay local. The
  global tokens live in `demo/styles/`. Clean.
- **Deep `src/` reach:** the component imports **no** `@src/*` and no `src/` path; `grep -rn '"@mkbabb/value.js"'`
  over `demo/ test/ e2e/` returns **zero** bare-root imports. The demo's runtime import surface is subpath-only
  — L-8's defect is in the *type* configuration, not in the imports themselves. This is a real success of T.W1
  and should be stated as such.
- **The `smallTapTargets` rows for `/#/gradient`:** the visual audit reports 6, two of which are this component
  (`{"w":20,"h":20,"label":"Gradient stop at 0%"}`, `…100%`), and I reproduced the 20×20 box live. These are
  **measurement artifacts, not defects**: the `::before` hit-expander (`:374-391`) makes the real pointer target
  `max(24px, 100%)` on fine pointers and `var(--touch-target, 2.75rem)` on coarse, which is what WCAG 2.5.8
  measures. The structural remark stands (a11y contract invisible to `getBoundingClientRect`, hence invisible to
  every probe), but the a11y outcome is sound. Rated INFO, not a finding.
- **No god module:** 392 lines, of which 88 are scoped CSS and ~60 are load-bearing comment. The gesture state is
  five variables, not fifty. The component is not a god module — it is a *correctly sized component with the
  wrong things inside it*, which is a different disease.

---

## The lattice I would build greenfield

```
demo/workbenches/gradient/
├── model/
│   ├── types.ts        LEAF. GradientStop | GradientType | GradientInterval | GradientModelState
│   │                   | OrderedStops (branded). Imports only value.js + glass-ui TYPES. No vue.
│   ├── stops.ts        The ordering algebra — insertStop / moveStop / removeStop / autofill.
│   │                   The ONLY producer of OrderedStops. Kills L-1 by construction.
│   ├── sample.ts       The ONE sampling law — sampleAt(model, p) + sampleRamp(model). Kills L-4a.
│   ├── serialize.ts    model → CSS. Emits `linear-gradient(<dir> in <space>, …)`; coalesces ONLY
│   │                   across non-linear intervals. Kills L-4b and most of COALESCE_RESOLUTION.
│   ├── parse.ts        CSS → Result<model>. Consumes a TOTAL parseCssColor (L-2 fixed upstream).
│   └── literal.ts      formatColorLiteral(color, precision) — the one authoring dialect. Kills L-14.
├── useGradientModel.ts The ONLY vue-aware model file: refs + actions delegating to stops.ts.
│                       No re-export barrel (L-5 deleted).
└── GradientVisualizer/
    ├── useRailGeometry.ts   toPosition/toOffsetPx over ONE box, via clamp+scale from
    │                        @mkbabb/value.js/math. Provably inverse. Kills L-3, L-12.
    ├── useRailGesture.ts    the pointer FSM: idle | pressing | dragging | ghosting. Owns capture,
    │                        owns stopPropagation, emits INTENTS. Kills L-9.
    └── GradientRail.vue     presentation only. props { stops: OrderedStops; ramp: string;
                             selectedId: string|null }; emits { move, insert, remove, select }.
                             Chrome from @mkbabb/glass-ui/slider (variant="rail"). Kills L-13.
```

Library side, upstream of all of it:

- `@mkbabb/value.js/css` — `parseCssColor` becomes **total**. The `!` at `src/css/grammar.ts:181` is the bug.
- `@mkbabb/value.js/math` — already correct; the demo simply has to use it.
- `package.json#exports` — remains the one gate; `tsconfig.demo.json#paths` is deleted so it cannot
  contradict it (L-8).
- `demo/ui/` — deleted; glass-ui subpaths imported directly (L-6).

The through-line: **every defect above is one concept with two homes.** Ordering (three homes), the axis map
(two), the sampling law (two), the interpolation space (declared in the model, absent from the output), the
selection (two channels), the design system (three doors), the colour literal (two dialects), the library build
(two artefacts). The cure is never a guard — it is a home.

---

*Probe scripts used for the headless evidence lived in the session scratchpad and are reproduced inline above;
the only artefacts written to the repository by this seat are this file and
`evidence-rail-after-reorder.png`, both under `docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/`.*

---

## ADDENDUM (R2, 2026-07-27, Opus 5) — read `challenge-L-library-r2.md` alongside this file

A second independent CHALLENGE-L seat ran at the same HEAD (`c654824e`) and did **not**
overwrite this report (E-3: addenda, not patch — this directory is untracked, so an overwrite
would have been unrecoverable). Its findings are in
`challenge-L-library-r2.md`, same directory. Two material deltas:

- **L-8(b) is WITHDRAWN as a false positive.** Types and runtime both resolve to the *repo's*
  `dist/`, not to `node_modules`. `packageId '@mkbabb/value.js/…@4.0.0'` is TypeScript's
  package *identity* for the repo's own package, not a `node_modules` provenance marker;
  `--traceResolution` prints the absolute path `/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts`
  with no `node_modules` segment. L-2 therefore did **not** ship through this crack — it ships
  through the `!` at `src/css/grammar.ts:181` in every build. **L-8(a) stands and is enlarged:
  delete the whole `paths` block; no workspace link is needed.**
- **L-1 confirmed by a stronger reproduction** — keyboard-only, on the two-stop default
  gradient, no pointer geometry involved: the invariant is absent from the *model*, not an
  artifact of the drag path.

R2 also confirms L-3, L-5, L-6, L-7, L-10, L-13 by independent evidence, and adds three minor
findings (min-2-stops rule duplicated; two clipboard idioms; the paint stack replicated ×4).
