# Dι — V8 hot-paths + shape stability + deopt triggers

**Lane**: Di (Dι) — V8 hot-paths + shape stability + deopt triggers.
**Date**: 2026-05-19.
**Status**: read-only research; planning-only.
**Repos read**: `value.js/src/**`, `keyframes.js/src/**`. parse-that is external (not surveyed; assume out of scope).
**Frequency model**: HOT = per-frame / per-pixel / per-parse in tight loops; WARM = per-user-interaction; COLD = per-module-load / per-construction.
**Discipline**: a deopt or shape concern is only claimed where the evidence is concrete (file:line). Speculative "could be" patterns are filed but **not** promoted to P1.

---

## §1 — Hot-path inventory

The graph of code that runs per frame or per render pixel, narrowed to functions with concrete callers.

### Render-loop / per-frame (HOT)

| Function | Source | Caller | Per-frame allocation? |
|---|---|---|---|
| `NumericAnimation.at(progress)` | `keyframes.js/src/animation/numeric.ts:135` | rAF playback / canvas loops | **No** — pre-allocated `result`, no closures, monomorphic field reads on the cached `seg`. The cleanest hot loop in either repo. |
| `Animation.interpFrames(t)` | `keyframes.js/src/animation/index.ts:600-646` | `Animation.tick(t)` per frame | **Yes** — `processFrame` arrow allocated per `interpFrames` call (line 612). `for (const iv of frame.allInterpVars)` calls `lerpValue(eased, iv)` (line 618) per InterpVar. |
| `lerpValue(t, iv)` | `value.js/src/units/interpolate.ts:84` | `interpFrames` per-frame per-InterpVar | **Yes** — reads `(iv as any)._lerp` then dispatches. The `_lerp` hidden property is the deopt vector (see §3). |
| `lerpNumericValue` / `lerpColorValue` / `lerpComputedValue` | `value.js/src/units/interpolate.ts:46-74` | dispatched from `lerpValue._lerp` | `lerpColorValue` allocates per-call: `start.value.keys()` returns a fresh array (line 50, see §3 `Color.keys()`), then a `forEach` closure. |
| WebGL render → `cssColorToRgb(color)` | `value.js/demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:53-60` | per-frame inside `render(now)` (line 174) | **Yes** — every frame allocates a fresh `[number, number, number]` tuple. Uses Canvas2D `getImageData` per frame (expensive even with `willReadFrequently: true`). Already flagged for memoise per `MEMORY.md`. |

### Color conversion (HOT during interpolation; WARM during one-shot parsing)

| Function | Source | Frequency when called from `lerpColorValue`-driven animation |
|---|---|---|
| `color2(color, to)` | `value.js/src/units/color/utils.ts:975` | Per-frame inside `lerpColorValue`-driven animation only if endpoint normalization changes mid-animation. Normally **WARM**: collapses are pre-computed by `normalizeValueUnits` in `prepareInterpVar`. |
| `colorUnit2(color, to, …)` | `value.js/src/units/color/normalize.ts:81-112` | Same — runs WARM (once at `prepareInterpVar`), not per frame. |
| `transformMat3(v, m)` | `value.js/src/units/color/matrix.ts:19-26` | Allocates a new 3-tuple per call. Called inside every cross-space conversion (e.g. `rgb2xyz` line 534, `xyz2rgb` line 544, etc.). HOT only when conversion happens per frame; WARM otherwise. |
| `gamutMapSRGB(r,g,b)` | `value.js/src/units/color/gamut.ts:305` | Called from `gamutMap` (`utils.ts:1004`) which is called inside `xyz2rgb` when `correctGamut === true` (line 551). HOT only on color-mix per frame; otherwise WARM. |
| `computeMaxSaturation(a_,b_)` | `value.js/src/units/color/gamut.ts:96` | Allocates a closure for `.find()` (line 98). Called from `findCusp` → `gamutMapOKLab` → `gamutMapSRGB` per gamut hit. |

### Quantize loops (HOT per-pixel within a single quantize call)

| Function | Source | Pixel cost |
|---|---|---|
| `kmeansIterate(pixels, count, seeds, …)` | `value.js/src/quantize/cluster.ts:229-304` | O(iterations × pixelCount × k). Uses `Float64Array` for sums + counts; monomorphic `chromaDistSq` call inside the inner loop. **Already well-optimised.** |
| `medianCutOKLab` / `splitBucket` | `value.js/src/quantize/cluster.ts:113-153` / `76-104` | Sort+scan over `Float64Array`. Per-split: allocates `Uint32Array` indices + closure `(a,b) => pixels[a*3+ch] - pixels[b*3+ch]`. HOT but per-quantize-call, not per-frame. |
| `chromaDistSq(L1,a1,b1,L2,a2,b2,kC)` | `value.js/src/quantize/cluster.ts:21-31` | Pure numeric. Monomorphic. Inlinable. |

### Other HOT-eligible call sites (background)

- `SmoothProgress.tick()` in `keyframes.js/src/animation/smooth.ts` — per-frame numeric only, no shape concerns.
- `Color.keys()` / `Color.entries()` / `Color.values()` (`value.js/src/units/color/index.ts:82-92`) — called from `lerpColorValue`, `mixColors`, `normalizeColor`, `colorUnit2`. **Each call allocates a fresh `string[]` from a `Map`.**

---

## §2 — Deoptimisation findings, classified

Each finding cites a file:line and a frequency class. Findings are conservative — only filed where the evidence is concrete.

### F1 — `lerpValue` fast-path hidden-class transition  **(HOT)**

**File**: `value.js/src/units/interpolate.ts:117-124` (`prepareInterpVar`) + `interpolate.ts:84-107` (`lerpValue`).

```ts
export function prepareInterpVar(iv: InterpolatedVar<any>): InterpolatedVar<any> {
    (iv as any)._lerp = iv.computed ? lerpComputedValue : iv.start.unit === "color" ? lerpColorValue : lerpNumericValue;
    return iv;
}
```

`InterpolatedVar` is declared as a plain type literal with four fields (`start, stop, value, computed`). `prepareInterpVar` bolts on a fifth `_lerp` property **after** construction. V8 transitions the hidden class on the first such write — every previously-allocated InterpolatedVar literal is on shape-A; every prepared one is on shape-B. `lerpValue` is then called with both shapes (the fast-path branch handles shape-B; the fallback handles shape-A). The call site is polymorphic.

**Impact**: bimorphic (not megamorphic). Probably still well-inlined by TurboFan, but it precludes the monomorphic-inline-cache that would otherwise apply.

**Fix sketch**: declare `_lerp?: typeof lerpComputedValue | …` as an optional field on the `InterpolatedVar` type and **initialise it in the construction site** (`normalizeValueUnits` at `units/normalize.ts:352` builds the literal — add `_lerp: undefined` and have `prepareInterpVar` write the real dispatch into the already-existing slot).

### F2 — `Color<T>` uses `Map<string, T>` for components + index-signature dispatch  **(HOT)**

**File**: `value.js/src/units/color/index.ts:28-101`.

The `Color` base class stores components in `this.components: Map<string, T>` (line 31, initialised line 37). Every channel getter (e.g. `RGBColor.r` at line 122) calls `this.getComponent("r")` → `this.components.get("r")`. Every channel setter calls `Map.set`. The class is also typed `[key: string]: any` (line 29) — index-signature.

V8 can monomorphise `Map.get/set` for string keys (the same hidden inline cache for a given Map shape), but vs. **direct field access** (e.g. `this.r`/`this.g`/`this.b` stored as own properties initialised in the constructor with the same order), Map.get carries:
- one hash lookup
- one bucket walk
- one boxed return value (unwrapped from internal Map entry)

per channel access. `lerpColorValue` iterates all keys and does two Map lookups per channel per frame (line 51-52: `(start.value as any)[key]` triggers the getter → `getComponent` → `Map.get`).

Additionally, the index-signature `[key: string]: any` on the class prevents V8 from using the class's fixed hidden class for property reads — V8 cannot tell at JIT time whether `color.r` is a getter-defined own property or a dynamic-bag property.

**Impact**: 3-4 channel accesses per InterpVar per frame × multiple Color allocations per `mixColors` call (line 1133-1161 of utils.ts allocates one `Color` then sets via `new ResultClass(...resultComponents, resultAlpha)`). Map.get is the bottleneck of a Color-heavy animation hot path.

**Fix sketch**: replace `Map<string, T>` with own properties in the subclass constructors (e.g. `this.r = r; this.g = g; this.b = b;`), keep the index-signature for backward-compatible string access, and delete the `getComponent`/`setComponent` indirection. The 15 subclasses each have 1-4 components — no real benefit to the Map abstraction.

### F3 — `Color.keys()` / `.entries()` / `.values()` allocate per-call  **(HOT)**

**File**: `value.js/src/units/color/index.ts:82-92`.

```ts
keys(): string[]   { return [...this.components.keys(), "alpha"]; }
values(): T[]      { return [...this.components.values(), this.alpha]; }
entries(): [string, T][] { return [...this.components.entries(), ["alpha", this.alpha]]; }
```

Each call allocates a spread-array + (for `entries`) a tuple per entry. Callers:

- `lerpColorValue` (`interpolate.ts:50`): `start.value.keys().forEach(...)` — per-frame.
- `mixColors` (`utils.ts:1125`): `c1.keys().filter(k => k !== "alpha")` — closure + filter + spread = 3 allocs per mix.
- `normalizeColor` (`normalize.ts:47`): `color.keys().forEach(...)` — per-color-unit normalize.
- `colorUnit2` (`normalize.ts:96`): `convertedColor.entries().forEach(...)` — per-color-conversion.
- `Color.toJSON()` / `.valueOf()` / `.toString()` — when stringified.

**Impact**: per-frame extra string-array + (in `entries`'s case) per-entry tuple allocation. Pure overhead — the consumers only need to iterate.

**Fix sketch**: add `forEachComponent(cb)` that iterates the Map directly with no array allocation, or (if F2 lands) iterate own properties via a per-subclass component-names constant (`["r","g","b"]`, `["h","s","l"]`, …). Keep `.keys()` etc. for the JSON / API surface but route the hot iteration through the new path.

### F4 — `transformMat3` allocates a 3-tuple per call  **(HOT during conversion)**

**File**: `value.js/src/units/color/matrix.ts:19-26`.

```ts
export function transformMat3(v: Vec3, m: Mat3): Vec3 {
    const [x, y, z] = v;
    return [m[0]*x + m[1]*y + m[2]*z, m[3]*x + m[4]*y + m[5]*z, m[6]*x + m[7]*y + m[8]*z];
}
```

Every space conversion (`rgb2xyz`, `xyz2rgb`, `lab2xyz`, `xyz2lab`, ...) calls `transformMat3` 1-2 times and **each call returns a fresh array literal**. For a single `color2(rgb, "oklab")`, the chain is rgb→xyz→oklab — at least 4 `transformMat3` calls = 4 transient `[number, number, number]` allocations.

This is HOT only when conversion runs per frame (e.g. inside `lerpColorValue` if endpoints aren't pre-collapsed — they generally are, via `normalizeValueUnits`). For one-shot parse → animate → render with pre-collapse, this is WARM.

**Impact**: known minor-GC pressure when many colors are converted in a loop (e.g. a gradient with N stops, all converted to OKLab at gradient build time). Minor compared to F1-F3.

**Fix sketch**: a `transformMat3Into(out: Vec3, v: Vec3, m: Mat3): void` variant that writes into a caller-provided tuple. Or convert all conversion functions to take `out: Vec3` parameters. Worth doing **only** if benchmarks confirm gradient construction is GC-bound.

**Note**: the `units/color/CLAUDE.md` claims `matrix.ts` uses "f64 typed arrays". It does **not** — `Vec3` and `Mat3` are plain tuple types (line 10-16 of matrix.ts). The doc is misleading; flag for fix in D.W4 doc-drift or here.

### F5 — `computeMaxSaturation` allocates a closure for sector dispatch  **(HOT inside gamut-mapping)**

**File**: `value.js/src/units/color/gamut.ts:98`.

```ts
const sector = GAMUT_SECTOR_COEFFICIENTS.find(s => s.test(a_, b_))!;
```

`.find` with an arrow allocates a closure per call. `computeMaxSaturation` is called from `findCusp` which is called from `gamutMapOKLab` which is called from `gamutMapSRGB` — runs once per gamut-out-of-range color. If a per-frame animation has out-of-gamut endpoints, this fires every frame.

**Impact**: one closure + a Function.prototype.find walk over 3 entries per gamut hit. The closure also makes the `test` call site polymorphic (the 3 `test` closures are 3 different function identities → polymorphic in V8 if all three are exercised across the corpus).

**Fix sketch**: replace `.find` with an inline if-ladder (3 sectors → 3 ifs). Eliminates both the closure and the cross-test polymorphism.

### F6 — `XYZ_FUNCTIONS` Record dispatch in `color2`  **(WARM)**

**File**: `value.js/src/units/color/utils.ts:951-997`.

`color2` uses a string-keyed `Record<string, {to, from}>` to dispatch on `colorSpace`. The lookup is `XYZ_FUNCTIONS[color.colorSpace]` — V8 optimises string-keyed object property reads well for stable shapes (the object literal is constant). Each `to`/`from` is then called as `fromEntry.to(color)`. The call site is **polymorphic across colorSpaces** — `color2` sees up to 15 different `to` functions and 15 different `from` functions; V8 keeps these IC sites in a polymorphic state.

**Impact**: WARM. The dispatch overhead is minor; if `color2` were per-frame this would matter. Since `normalizeValueUnits` pre-collapses endpoints, `color2` is typically WARM.

**Status**: leave as-is unless evidence shows per-frame conversion. Current design is the cleanest dispatch strategy for 15 spaces.

### F7 — `evaluateSimpleCalc` uses `new Function(...)`  **(COLD/WARM, but D6-violating)**

**File**: `value.js/src/parsing/color.ts:78-81`.

```ts
function evaluateSimpleCalc(expr: string): number {
    const sanitized = expr.replace(/[^0-9.+\-*/() e]/g, "");
    return new Function(`return (${sanitized})`)() as number;
}
```

This is invoked only via relative-color syntax (`rgb(from oklch(50% 0.2 90) calc(r * 2) g b)`) — COLD/WARM. But:
1. V8 deopt boundary — `new Function` can't be inlined, prevents any TurboFan optimisation around it.
2. **Directly violates D6** ("No effusive dynamicism. NO nested imports... no `Function` constructor").
3. Bundle-level concern — `new Function` is a CSP-unfriendly pattern (any `Content-Security-Policy` without `unsafe-eval` blocks it).

**Impact**: not a hot-path performance issue, but a directive violation that should land separately. The `parsing/math.ts` `evaluateMathFunctionInternal` (line 282) already implements a switch-based AST evaluator — extending it to handle bound variables would eliminate `new Function`.

**Fix sketch**: replace with the existing FunctionValue-AST evaluator. The parser already produces a binary-op AST in `createCalcParser`; route relative-color components through that path with a variable-binding extension.

### F8 — `memoize`'s default keyFn is `JSON.stringify`  **(WARM)**

**File**: `value.js/src/utils.ts:112`.

```ts
keyFn = (JSON.stringify as (...args: any[]) => string),
```

`JSON.stringify` is the slowest hash-key function for any non-trivial argument. `parseCSSValue`, `parseCSSPercent`, `parseCSSTime` (parsing/index.ts:258-279) all use `memoize` with default keyFn → every parse-cache hit costs a full `JSON.stringify(args)`.

For parsers that take a single string arg, `JSON.stringify("foo")` ≈ `'"foo"'` (two extra quote chars + an allocation). Not catastrophic, but trivially fixable by passing `keyFn: (input) => input` for the string-typed parsers.

**Impact**: WARM. Parse-cache hits are cheap-but-not-free. Cumulative over a stylesheet's worth of parses.

**Fix sketch**: pass an explicit `keyFn: (input: string) => input` to the 3 string-parsing memoize sites (lines 258, 262, 266 of parsing/index.ts) and `keyFn: (value: ValueUnit, target?) => …toString-id…` to the existing `getComputedValue` (normalize.ts:128 — it already has this, good).

### F9 — `clone()` is polymorphic on input shape  **(WARM)**

**File**: `value.js/src/utils.ts:7-22`.

Branches on `isObject(obj)`, `typeof obj.clone === "function"`, `Array.isArray(obj)`, falls through to identity. Called from `ValueUnit.clone()`, `FunctionValue.clone()`, `Color.clone()`, etc. The single call site (`clone(value)` in `ValueUnit.clone()`) sees: `number`, `string`, `Color`, `ValueUnit`, `FunctionValue`, `null`, `undefined`, `string[]`, `number[]`. **Megamorphic.**

**Impact**: WARM. `clone()` runs on `ValueUnit.clone()` paths — interpolation prep, not per-frame. But the megamorphism prevents V8 from inlining anything.

**Fix sketch**: not worth touching unless benchmarks show it. The flexibility is the API.

### F10 — `interpFrames`'s `processFrame` closure  **(HOT)**

**File**: `keyframes.js/src/animation/index.ts:612-629`.

`processFrame` is an arrow allocated per `interpFrames` call (i.e., per `tick`, i.e., per frame). It closes over `t`, `transformFrames`, `result`, `this` — 4 captured bindings, fresh closure each frame.

**Impact**: small per-frame allocation. V8 typically pools these. Real cost is preventing call-site monomorphism for the two `processFrame(frames[i])` call sites.

**Fix sketch**: hoist `processFrame` to a method on `Animation` taking `(frame, t, result, transformFrames)` as args, or hand-inline. Tradeoff: hoisting hurts readability for marginal win.

---

## §3 — Shape-stability findings

V8-specific concerns beyond §2's deopts.

| # | Site | Finding |
|---|---|---|
| S1 | `InterpolatedVar` literal + `_lerp` bolt-on | F1 (above). The single most important shape concern — fast-path dispatch on an InterpolatedVar bolt-on property. |
| S2 | `Color<T>` index-signature `[key: string]: any` | F2 (above). Class-level dynamic-bag declaration; getters via `Map.get`. |
| S3 | `ValueUnit` constructor with 6 optional positional args | `value.js/src/units/index.ts:7-14`. Every `ValueUnit` is allocated with `unit?, superType?, subProperty?, property?, targets?` — 5 optional slots. The construction `new ValueUnit(value)` produces a shape with 5 `undefined`-typed slots; later assignment (`vu.unit = "px"`, `vu.superType = [...]`) inside `coalesce` or `setProperty` may transition the hidden class **if** the slot was inferred-undefined vs assigned-undefined. V8 generally handles this well (constructor-arg-undefined slots stay typed-undefined; later writes to the same slots typically just transition the value type, not the slot). **Conservative**: this is a *potential* concern; without benchmarks, no claim. |
| S4 | `FunctionValue` constructor `setSubProperty(name)` in constructor body | `value.js/src/units/index.ts:108-116`. The constructor calls `values.forEach(v => this.setSubProperty(name))` which calls `v.setSubProperty(name)` on every child during parent construction. Child ValueUnit's `subProperty` field is then written. The forEach is monomorphic (V8 sees same ValueUnit shape). Fine. |
| S5 | `getComputedValue` writes to `style[prop]` via `Record<string, string>` cast | `value.js/src/units/normalize.ts:147,154,160`. Direct CSSStyleDeclaration write; V8 sees a `Record<string, string>` cast which is not a hidden-class concern — CSSStyleDeclaration is a host object, not a regular JS object. Fine. |
| S6 | `interpolate.ts` `processFrame` closure | F10. |
| S7 | `prepareInterpVar` only runs on InterpolatedVars built through `normalizeValueUnits` | `value.js/src/units/normalize.ts:341-390` builds InterpolatedVar literals (object literals with 4 fields). The shape is fixed at construction. `prepareInterpVar` (interpolate.ts:117) bolts on `_lerp` later → shape transition. **Only InterpolatedVars that pass through `prepareInterpVar` have `_lerp`**; externally-constructed ones (the `lerpValue` fallback at line 95-106 handles this case) keep the original shape. Therefore `lerpValue` is **at best bimorphic** at its call sites. |

---

## §4 — Inlining-barrier findings

V8 11+ can inline `try/catch` and most `arguments`-using functions, but still bails on `new Function`, `eval`, `with`. The 2026 fleet should target V8 13+ (Node 24 in CI per `MEMORY.md`), so `try/catch` is no longer a barrier — but other patterns still matter.

| # | Site | Barrier? | Notes |
|---|---|---|---|
| B1 | `evaluateSimpleCalc` in `parsing/color.ts:78` | **YES — `new Function`** | F7 above. Deopt boundary + D6 violation. |
| B2 | `tryParse` (`parsing/utils.ts:35`) | NO | Throws on parse fail, but the throw is the slow-path; the hot path returns normally. V8 13+ inlines functions containing `throw new Error`. |
| B3 | parse-that `Parser` combinators | External — not surveyed | Out of scope per task constraints. If parse-that itself uses `try/catch` for error propagation, that would be the relevant inlining concern. Flag for parse-that-side review (filed as `D-residual` if needed). |
| B4 | No `arguments` accesses found | NO | grep'd both repos. |
| B5 | No `with` blocks | NO | grep'd both repos. |
| B6 | No `eval` calls | NO | grep'd both repos. |
| B7 | `Function.prototype.apply` use in `memoize`/`debounce` (`utils.ts:120,132,64,73`) | NO | V8 handles `.apply(this, args)` as a fast path; not an inlining barrier. |

**Summary**: only **one** real inlining-barrier site in the surveyed corpus — F7/B1 (`new Function` in `evaluateSimpleCalc`). And it's COLD/WARM, not HOT.

---

## §5 — Prioritised recommendations

**Discipline**: only HOT-path findings get P1. WARM is P2 unless egregious. COLD is at most P3. The user's "we mustn't change things just to change them" precept binds — each P1 must be backed by §2 evidence.

### P1 — HOT-path, evidence-backed

**P1.a — Pre-declare `_lerp` on `InterpolatedVar`** (F1 / S1)
- Add `_lerp?: typeof lerpComputedValue | typeof lerpColorValue | typeof lerpNumericValue` to the `InterpolatedVar<T>` type at `units/index.ts:209-216`.
- Initialise it to `undefined` in `normalizeValueUnits` (`units/normalize.ts:352-357`).
- `prepareInterpVar` then writes to an **existing** slot rather than creating one. Eliminates the bimorphic call site at `lerpValue:88`.
- **Verification**: `npm test` (all 1409 existing tests must pass); inspect `Animation.tick` micro-bench if D wave adds one.

**P1.b — Flatten `Color<T>` components to own properties** (F2 / S2)
- Replace `protected components: Map<string, T>` with own properties initialised in each subclass constructor.
- Keep getter/setter syntax (already idiomatic Vue/TS); but back them with direct field access (or delete the getters and use `this.r`/`this.g`/`this.b` directly).
- Remove the index-signature `[key: string]: any` from `Color`; expose a `getComponent(name)` method for the rare dynamic-key path.
- This is **the largest-evidence finding** — Color allocation+access dominates the color-heavy animation loop.
- **Verification**: every color test (~100 cases) must pass identically. Add a micro-bench for `lerpColorValue` × 60fps × 100 frames if D wave is implementing rather than planning.

**P1.c — Memoise `cssColorToRgb` in `useMetaballRenderer`** (already filed in `MEMORY.md`; this lane confirms)
- File: `value.js/demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:53-60,174`.
- Cache by string-equality: if `color.value === lastColor`, return last RGB. Avoids canvas2D fillRect+getImageData per frame.
- **Verification**: visual probe (Playwright WebGL smoke) shows no regression.

### P2 — WARM or HOT-but-modest

**P2.a — Replace `.find(s => s.test(...))` in `computeMaxSaturation`** (F5)
- Inline a 3-way if-ladder. Eliminates per-call closure + cross-sector polymorphism. Tiny patch.

**P2.b — Pass explicit `keyFn` to string-parser memoizations** (F8)
- 3 sites in `parsing/index.ts:258,262,266`. One-line patches.

**P2.c — Add `forEachComponent` to `Color`, route hot iteration through it** (F3)
- Only worth it after P1.b lands; if P1.b uses own-property fields, F3 falls out for free (subclass-known component lists).

**P2.d — `Vec3 out` parameter for `transformMat3`** (F4)
- Add `transformMat3Into(out, v, m)`. Convert hot space-conversion paths (`rgb2xyz`, etc.). Only worth doing if a real gradient-construction benchmark shows GC pressure. **Plan-but-don't-implement-without-evidence.**

### P3 — COLD/WARM, low-value or non-V8

**P3.a — Replace `new Function` in `evaluateSimpleCalc`** (F7 / B1)
- File: `value.js/src/parsing/color.ts:78-81`.
- Route through `parsing/math.ts` AST evaluator with variable bindings.
- COLD performance impact, but **violates directive D6** ("No effusive dynamicism, no `Function` constructor"). Belongs in D.W3 or a dedicated lane, not Di.
- **Recommendation**: file as a coordination row for D.W3 (frontend-cohesion wave already touches parser-related code), tagged as a D6-conformance fix rather than a perf fix.

**P3.b — Fix `units/color/CLAUDE.md` "f64 typed arrays" claim** (F4 note)
- The doc says `matrix.ts` uses f64 typed arrays; it uses plain `number[]` tuples. **Doc drift, not code change.** File under D.W4 doc-cleanup if not already there.

**P3.c — `clone()` megamorphism** (F9)
- Don't touch. WARM path; flexibility is the API.

### P-not — Items deliberately not promoted

- `XYZ_FUNCTIONS` Record dispatch (F6). Cleanest possible 15-space dispatch; no action.
- `ValueUnit` 6-arg constructor (S3). Conservative — no concrete evidence of shape-transition cost.
- `processFrame` closure in `interpFrames` (F10 / S6). Sub-millisecond per frame; not worth the readability cost.
- All quantize hot loops. Already well-optimised with typed arrays.
- `tryParse`'s `throw` (B2). V8 13+ inlines throw-containing functions; no concern.
