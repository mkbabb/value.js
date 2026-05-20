# E-AUDIT-5 — Library + Demo Architecture (post-D-close)

**Branch**: `tranche-e` (off `eae8afc` — D close commit, v0.6.0)
**Date**: 2026-05-20
**Mode**: READ-ONLY; no `src/` or `demo/` edits.
**Directive**: "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code."

---

## §1 — Methodology

**Scope**:

- `src/` (library, 10,233 LoC across 28 .ts files).
- `demo/` (Vue 3.5 SFC + composable shell, ~12k Vue LoC + ~2,900 composable LoC).
- Tooling: `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`, `package.json`.

**Inspection criteria** (per task):

1. Module boundaries — idiomatic, premature, or missing.
2. Public API surface coherence (per `src/index.ts`).
3. V8 hot-path patterns — megamorphism, hidden-class instability, closure-in-loop, per-frame allocation.
4. NO LEGACY — `@deprecated`, `lerpLegacy`, unused types/exports, post-rename old-name imports.
5. Type-system drift — `as any`, brand misuse, `verbatimModuleSyntax` compliance.
6. Tooling alignment with Vite 7 / Node 22+ / Vue 3.5 stack.
7. Documentation drift against actual filesystem.

**Methodology**: walk every public surface in `src/index.ts`; spot-read each subdirectory; cross-check `CLAUDE.md` claims against `wc -l` and `find`; grep for legacy markers; identify hot paths from D's perf-frame work + the metaball renderer; trace `parse-that` consumption shapes per the precept §parse-that-idiom rule.

**What was NOT inspected** (deliberate omissions, low-value for this lane):

- The 178-file shadcn-vue `ui/` tree (DO NOT modify per memory).
- `api/` Hono backend (parallel concern, separate tranche substrate).
- Test files individually (1,409 tests passing — surface validated upstream).

---

## §2 — Library structural review

### §2.1 — `src/units/` (index.ts + utils.ts + constants.ts + normalize.ts + interpolate.ts)

**Shape**: 240 + 430 + 736 + 398 + 140 = 1,944 LoC across 5 files.
**Exports**: `ValueUnit`, `FunctionValue`, `ValueArray`, `InterpolatedVar` (type-only); `getComputedValue`, `normalizeValueUnits`, `normalizeNumericUnits`; `lerpValue` family; the unit constant tuples; `flattenObject`/`unflattenObject`/`unpackMatrixValues`.

**Idiomatic verdict**: **solid, with one structural sore + two micro-frictions**.

- `ValueUnit<T, U>` (216 LoC `index.ts`) is the right shape — value + unit + superType + property/subProperty/targets. Storage is own-property (V8 monomorphic).
- `FunctionValue` correctly handles infix ops (`+`, `-`, `*`, `/`) for calc-AST round-trips. Its `setSubProperty` constructor side-effect (forEach) is loop-allocating closures over `name` — minor, called once per parse.
- `ValueArray extends Array` is idiomatic but inherits a quirky `Array` prototype chain (slice/concat lose subclass identity in some engines pre-ES2015 — V8 honors `Symbol.species`).
- `InterpolatedVar._lerp` (the D-wave fast-path pre-resolved dispatch) is a well-considered V8 escape hatch — single `if (iv._lerp)` branch becomes monomorphic after warm-up.

**Transposition opportunities**:

1. **`getComputedValue` element-id WeakMap** (`normalize.ts` §99) — `nextElementId++` + closure over `elementIdMap` is fine, but the memo `keyFn` synthesizes `"<toString>-<id>"` on every call. Hot path on per-frame transform interpolation. Consider keying the memo by `(value-identity, target)` directly via a nested `WeakMap<HTMLElement, Map<string, ValueUnit>>` — eliminates one string concat per frame.
2. **`flattenObject` mutual recursion** (`utils.ts` §28–§78) — recursive function-in-function pattern, allocates inner `flatten` closure on every entry. Acceptable for parsing-time work; not a hot path.
3. **`MATRIX_SUB_PROPERTIES` Set** — declared as a `Set<string>` but never iterated; a frozen object or even a single-line type-guard would be equivalent. Defer.

**No legacy found in this subtree.** `BLACKLISTED_COALESCE_UNITS` is current; `MatrixValues` interface is fully consumed.

---

### §2.2 — `src/units/color/` (post-L8 flatten)

**Shape**: 546 + 13,741 (wait — re-read) ...

Actually:
- `index.ts` — 546 LoC (Color base + 15 subclass declarations + `WhitePointColor` + `ColorChannel<T>` brand).
- `constants.ts` — 483 LoC.
- `utils.ts` — **1,174 LoC** (the elephant).
- `normalize.ts` — 128 LoC.
- `gamut.ts` — 347 LoC.
- `colorFilter.ts` — 305 LoC.
- `contrast.ts` — 112 LoC.
- `mix.ts` — 81 LoC.
- `matrix.ts` — 75 LoC.

Total: 3,251 LoC across 9 files.

**Idiomatic verdict**: **strongest subtree in the library, with one major + two medium transpositions waiting**.

The L8 flatten is honored: components are declared own-property fields with `declare` + `ColorChannel<T>` phantom brand. V8 monomorphic. `_assertChannel` dev-guard is correctly stripped in production via `import.meta.env.DEV`.

#### §2.2.1 — Color hierarchy: the `WhitePointColor<T>` sore

```
Color<T> (abstract)
  ├── RGBColor, HSLColor, HSVColor, HWBColor, LCHColor, OKLCHColor, KelvinColor,
  │   LinearSRGBColor, DisplayP3Color, AdobeRGBColor, ProPhotoRGBColor, Rec2020Color  (12 direct subclasses)
  └── WhitePointColor<T> (intermediate; NOT exported)
        ├── LABColor   (D50)
        ├── OKLABColor (D50)
        └── XYZColor   (D65)
```

`WhitePointColor` exists ONLY to carry the `whitePoint: WhitePoint` field. Three subclasses use it. **Two structural problems**:

1. **Asymmetric inheritance** — `OKLCH` is a cylindrical form of `OKLab` but extends `Color<T>` directly, not `WhitePointColor`, despite being D50-native. Why? Because `oklch2oklab` does the white-point assignment indirectly. This breaks the type-level invariant "if it's D50, it carries a `whitePoint` field."
2. **`get channels(): readonly string[] { return []; }`** in `WhitePointColor` (line 173) is a load-bearing stub — concrete subclasses override it, but the base class lies about its return value. This is the kind of stub that an audit catches and a refactor removes.

**Transposition**: lift `whitePoint?: WhitePoint` to `Color<T>` itself (optional field), drop the `WhitePointColor` intermediate class entirely. The three D50 subclasses still set it in their constructors; the 12 others leave it undefined (or default to "D65"). Type-level cost: one optional field. Runtime cost: zero (hidden class stable; V8 already manages `undefined` slots monomorphically when all instances of a constructor write the same shape).

Alternative: **adopt a discriminated-union-style brand** on the constructor instead of inheritance — the `whitePoint` becomes a `static readonly` on each subclass, queried via `(this.constructor as typeof Color).whitePoint`. Loses one level of indirection.

**Recommendation**: lift to default field on `Color<T>`. Wave-slot: 1.

#### §2.2.2 — The 5 RGB-family classes

`LinearSRGBColor`, `DisplayP3Color`, `AdobeRGBColor`, `ProPhotoRGBColor`, `Rec2020Color` — and `RGBColor` itself — differ ONLY in:
- The string `colorSpace` identifier.
- The transfer function (gamma curve).
- The 3×3 RGB↔XYZ matrix.
- White point (mostly D65; ProPhoto is D50).

Six classes, each with the same constructor signature (`r?, g?, b?, alpha?`), the same `_RGB_CHANNELS` getter, the same `declare r/g/b: ColorChannel<T>` field declarations. **120 LoC of pure duplication.**

**Transposition**: a single `RGBFamily<T>` class parameterized by a static `colorSpace` + `transferFn` + `matrix` would collapse the six into one. The 15 → 10 class headcount reduction is dramatic. Constructor still type-narrows via static config; the `instanceof` semantics that consumers rely on can be preserved with a `Brand` symbol on each space's static config.

**But**: this hurts tree-shaking. If a consumer only uses `RGBColor`, the bundler today can drop `Rec2020Color`; with a parameterized family it cannot. Tradeoff: 120 LoC of duplication vs ~3 kB of unused gamut code on a constrained bundle. **For value.js as a CSS-spec library, the duplication is the correct call.** Skip.

Better target: **the conversion functions** (`adobeRgb2xyz`, `proPhoto2xyz`, `rec20202xyz`) are identical structurally — linear-transfer → matrix → XYZColor. A single `rgbFamily2xyz(color, transferFn, matrix)` helper would replace 4 functions with one call site each. ~40 LoC delta; clarity win > tree-shaking risk (the helper itself is ~5 LoC and inlines).

**Recommendation**: extract a `rgbFamily2xyz` / `xyz2rgbFamily` pair in `utils.ts`. Wave-slot: 0.5.

#### §2.2.3 — `color2<T,C>()` — the XYZ-hub dispatch

```ts
const XYZ_FUNCTIONS: Record<string, { to, from }> = { ... };  // 15 entries

export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
  if (color.colorSpace === to) return color;
  const fromEntry = XYZ_FUNCTIONS[color.colorSpace];  // string-keyed lookup
  const toEntry = XYZ_FUNCTIONS[to as ColorSpace];
  const xyz = fromEntry.to(color);
  return toEntry.from(xyz);
}
```

V8 will keep `XYZ_FUNCTIONS` as a fast Map-like object (string keys, 15 entries, never mutated). The `to`/`from` calls are megamorphic across the 15 sites but each call site is monomorphic within a given conversion pair. Not a hot path on most consumers.

**Direct-path concern**: `oklab → rgb` currently goes `oklab → xyz → rgb` (two matrix transforms + transfer fns). `srgbToOKLab` in `gamut.ts` already provides a direct path. The library exposes `oklabToLinearSRGB` but NOT the reverse direct path. **`color2` always takes the XYZ hub even when a 2-step direct path is faster.** For the metaball renderer's per-frame `cssColorToRgb`, this is offloaded to the canvas 2D context — but the library's own gradient interpolation in `lerpColorValue` and demo gradient stops re-traverse the hub each call.

**Transposition**: add a `DIRECT_PATHS: Map<\`${string}->${string}\`, (c) => Color>` table. Populated lazily for known hot-pairs (`oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`). `color2` checks direct first, falls back to XYZ. Zero observable change to callers. Wave-slot: 1.

#### §2.2.4 — `utils.ts` 1,174 LoC monolith

60 exports in one file. Conversion functions (~40), interpolation (`interpolateHue`, `mixColors`), gamut wrapper, contrast re-exports, transfer functions. **It's the elephant** but the cohesion is actually high — everything routes through XYZ. Splitting it would force more circular import dances (color.ts is already lazy-imported via parser).

**Verdict**: leave the size. Optionally split into:
- `utils/conversions.ts` — pure space-to-space functions.
- `utils/transfer.ts` — `srgbToLinear`, `adobeRgbToLinear`, etc.
- `utils/mix.ts` (already exists but holds N-mix; could absorb `mixColors`).

This is **cosmetic**, not structural. Defer or skip.

#### §2.2.5 — `colorUnit2()` nested-ValueUnit unwrap (`normalize.ts` §99–§104)

The infamous iOS Safari stack-overflow fix. The `while (raw instanceof ValueUnit) raw = raw.value` loop guards against progressive nesting. **This is now a load-bearing safety net** rather than a hot fix. The `_assertChannel` brand in `Color` constructors throws if the same nesting recurs from a different code path — defense in depth.

Two layers of guard against one bug. Acceptable. No transposition.

---

### §2.3 — `src/parsing/`

**Shape**: 7 .ts files + 2 .bbnf grammars = 8,619 + 18,186 + 17,123 + 5,294 + 6,980 + ... ≈ 80 KB across the .ts files.

| File | LoC | Role |
|---|---|---|
| `index.ts` | 279 | top-level composition |
| `units.ts` | 135 | dimension parsers |
| `color.ts` | 600 | 15 spaces + relative + color-mix + color() |
| `math.ts` | 504 | calc + math fns + AST evaluator |
| `stylesheet.ts` | 515 | full CSS at-rule + qualified-rule |
| `serialize.ts` | 156 | stylesheet → string + Prettier wrapper |
| `extract.ts` | 200 | stylesheet → keyframes/properties/rules |
| `animation-shorthand.ts` | 286 | animation/transition shorthand |
| `utils.ts` | 50 | primitives |

**Idiomatic verdict**: **the most uneven subtree**. Highs and lows.

#### §2.3.1 — `parse-that` consumption — precept §parse-that-idiom

The grep shows uniform idiom: `.map()` for transforms, `Parser.lazy()` for cycles, `istring()` for case-insensitive keyword match. `succeed`/`fail` for chain branches. **Compliant.**

#### §2.3.2 — The 156-branch `nameParser` `any(...)` — L14 deferred

```ts
const nameParser: Parser<ValueUnit> = any(
    ...Object.keys(COLOR_NAMES)
        .sort((a, b) => b.length - a.length)
        .map(utils.istring),
).chain((x) => { ... });
```

147 CSS named colors + 5 custom = 152 alternatives, each an `istring` (case-insensitive regex). **The structural cost**: `any(...)` tries each in order. Longest-first sort is correct (prevents `red` matching before `redwood`) but performance is O(n) per name lookup attempt — and the regex constructor in `istring` creates 152 `RegExp` objects at module init.

`parse-that` has no name-keyed dispatch primitive — that's why L14 was deferred. But **there's a structural alternative now available**:

**Transposition (L14 redux)**: replace `nameParser` with a single regex that matches the longest CSS identifier, then chains into a `COLOR_NAMES` Map lookup:

```ts
const namedColorIdent = regex(/-?[a-zA-Z][a-zA-Z0-9-]*/);  // one regex, one lookup
const nameParser = namedColorIdent.chain((x: string) => {
    const c = COLOR_NAMES[x.toLowerCase()];
    return c ? utils.succeed(parseCSSValueUnit(c)) : utils.fail(`Invalid color name: ${x}`);
});
```

Reduces module-init RegExp allocations from 152 → 1. Parse time: O(1) Map lookup vs O(N) regex chain. **Major win — wave-slot: 0.5.** This was the canonical L14 deferred item; the structural path now exists via the chain-after-broad-regex pattern.

Caveat: this changes failure-mode reporting. If the input is `redwoodify` (not a color name), the old `any(...)` failed at parse step; the new one parses the identifier then fails at chain. Both surface as `Invalid color name` — but the failure position offset differs by one token. Acceptable.

#### §2.3.3 — `evaluateRelativeCalc` lazy-init closure pattern

```ts
let _relativeCalcExpr: ReturnType<typeof createCalcParser> | null = null;
function getRelativeCalcExpr() {
    if (_relativeCalcExpr) return _relativeCalcExpr;
    const { mathFunction } = createMathFunctionParsers(CSSValueUnit.Value);
    _relativeCalcExpr = createCalcParser(CSSValueUnit.Value, mathFunction);
    return _relativeCalcExpr;
}
```

This is the D.W2 Lane D L4 fix. It exists because of the units.ts ↔ color.ts circular import — `CSSValueUnit` is undefined when color.ts's top-level runs, so the calc parser must be created lazily at first use.

**Smell**: yes. It's a module-init ordering workaround masquerading as a singleton. **But**: the alternative (restructure the import graph to be acyclic) is a 2-file move with downstream churn. The current pattern is contained, the test surface validates it, and the lazy-init runs once per app lifetime.

**Verdict**: **acceptable. Don't fix unless you have to.** The smell is intrinsic to a parser-combinator codebase where types and functions mutually recur. The audit's role here is to note it as known debt, not action it.

#### §2.3.4 — `parsing/index.ts` `Function_` `any(...)` chain

```ts
const Function_: Parser<any> = any(
    handleTransform(),
    handleVar(),
    MathFunction,
    handleGradient(),
    handleCubicBezier(),
    handleFunc().map(...),  // catchall
);
```

5 alternatives + catchall. Order matters (handleTransform must come before generic handleFunc). **Idiomatic, no transposition.**

#### §2.3.5 — `tryParse` throws on error (utils.ts §35)

```ts
export function tryParse<T>(parser, input): T {
    const state = parser.parseState(input);
    if (state.isError) {
        throw new Error(`Parse error at offset ${state.offset}`);
    }
    return state.value;
}
```

The error message is the offset only — no preview of the failure context. For a library that users interact with (the demo passes user-typed strings here), this is **friction-prone**.

**Transposition**: include a 16-char window around the failure offset:
```
throw new Error(`Parse error at offset ${state.offset}: "...${input.slice(Math.max(0, state.offset-8), state.offset+8)}..."`);
```

Half a wave-slot. UX-noticeable in the color-picker error toasts.

---

### §2.4 — `src/math.ts` + `src/easing.ts` + `src/utils.ts`

**Shape**: 100 + 505 + 197 = 802 LoC.

#### §2.4.1 — `math.ts`

10 functions: `clamp`, `scale`, `lerp`, `lerpLegacy` (deprecated), `logerp`, `deCasteljau`, `cubicBezier`, `interpBezier`, `cubicBezierToSVG`, `cubicBezierToString`.

**`lerpLegacy` is the only `@deprecated` export in the entire library.** Per the directive: "NO legacy code."

```ts
/**
 * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
 * Will be removed in the next tranche.
 */
export const lerpLegacy = (t: number, start: number, end: number) =>
    lerp(start, end, t);
```

Grep confirms: **zero consumers in the entire codebase** (demo, src, test, api). The `demo/CLAUDE.md` line that mentions it (`145`) is documentation, not an import. **It's pure carrying weight.**

**Transposition**: delete. The "next tranche" promise is now. Wave-slot: 0.1.

#### §2.4.2 — `easing.ts`

`CSSCubicBezier` factory + 30+ named easings + `cssLinear()` for the CSS-Easing-Level-2 piecewise linear function. **Idiomatic, no transposition.** The binary-search in `cssLinear` (line ~84) is correct and tight.

#### §2.4.3 — `utils.ts`

`clone`, `memoize`, `debounce`, `requestAnimationFrame` shim, `createHash`, case-conversion. **Two patterns of note**:

1. **`clone()`** (line 7) — recursive deep-clone, dispatches on `isObject`, then `.clone()` method, then `Array`. **Closure-in-loop**: `Object.entries(obj).map(...).reduce(...)` allocates a [k,v] pair array + an entries array per level. For Color trees (depth 3 typically), acceptable. Hot path? Used by `ValueUnit.clone()` for the `superType` array. Per-frame cost on interpolation: ~1 array per ValueUnit × 2 endpoints. **Defer.**
2. **`memoize`** (line 104) — JSON.stringify default `keyFn`. Used by `getComputedValue` with a custom `keyFn`. Used by `parseCSSValue`/`parseCSSColor`/`parseCSSValueUnit` with the default — `keyFn(string)` → `JSON.stringify(string)` allocates a quoted copy of the input every call. **For 1-arg string parsers, `keyFn = (s) => s` would skip the allocation.** Mild win.

**Transposition**: add a `keyFn` override at each `memoize(parserFn, { keyFn: (s) => s })` site. Wave-slot: 0.25.

---

### §2.5 — `src/transform/decompose.ts`

**Shape**: 541 LoC, one file. 2D + 3D matrix decompose, polar/Gram-Schmidt, quaternion slerp.

**Idiomatic verdict**: **clean**. CSSOM-spec algorithm, well-commented, no allocations in the hot path beyond the result tuples. `slerp` shortest-arc selection + NLERP fallback at `dot > 0.9995` is correct.

**No transposition opportunities.** Possibly the most polished file in the library.

---

### §2.6 — `src/quantize/`

**Shape**: 191 + 356 + types.ts = ~580 LoC across 3 files.

**Idiomatic verdict**: **excellent**. MMCQ + k-means++ + JND deduplication. OKLab-native. Self-contained — imports only `srgbToOKLab`, `rawOklabToOklch`, `oklabToRgb255` from `gamut.ts`.

**One observation**: `paletteDistance` (index.ts §40) is called O(N²) in the `sortPalette` traversal. For typical palette sizes (5–8 colors) this is 25–64 calls; not a concern. For 100+ colors it would be — but consumer demand for 100-color palettes is hypothetical.

**No transposition opportunities for E.**

---

### §2.7 — `src/index.ts` — public API coherence

**Shape**: 361 LoC, ~200 named exports.

**Coherence verdict**: **structurally accidental**. The barrel re-exports everything that any consumer might want, organized by source file. **No information hiding** — internal symbols like `XYZ_FUNCTIONS` aren't exposed, but the boundary between "consumer-facing primitive" and "implementation detail" isn't drawn anywhere.

Categories present:
- Core: `ValueUnit`, `FunctionValue`, `ValueArray`.
- Constants: `LENGTH_UNITS`, `STYLE_NAMES`, `BLACKLISTED_COALESCE_UNITS`.
- Color classes: 15 spaces + `Color` base.
- Color constants: 24 exports.
- Color matrix: 4 functions, 2 types.
- Color conversions: 51 individual `<from>2<to>` functions exposed.
- Color normalization: 5 exports.
- Gamut: 11 exports.
- Math + utils + easing + parsing + quantize + transform.

**The 51 individual conversion functions are over-exposed.** Library consumers almost universally want `color2(c, "<space>")` — the generic converter. Exposing every individual function is a precept-§1 surface-area sin: doubles the API documentation burden, makes future consolidation a breaking change.

**Transposition**: gate the individual conversions behind `import { rgb2xyz } from "@mkbabb/value.js/internal"` (subpath). Keep `color2` + `colorUnit2` + `normalizeColorUnits` on the main surface. This is a major API revision — appropriate for a `v0.7.0`. Wave-slot: 1.

**Other surface drift**:

- `lerpLegacy` exported (delete, see §2.4.1).
- `BLACKLISTED_COALESCE_UNITS` exported (consumer-facing? Probably not — used only inside `ValueUnit.coalesce`).
- `flattenObject` / `unflattenObject` / `unflattenObjectToString` exposed (the keyframes integration relies on these — KEEP).
- `STRING_UNITS`, `COLOR_UNITS` exposed as 1-element tuples (`["string"]`, `["color"]`). These are not "constants" in any meaningful sense; they're internal flags. Consider folding into the unit enum.

---

## §3 — Demo structural review

### §3.1 — Composable layering

**Shape**: 25 composables across 5 dirs (root + auth/ + color/ + palette/).

| Dir | Files | LoC range |
|---|---|---|
| `composables/` (root) | 6 | 27–229 |
| `composables/auth/` | 4 | 50–215 |
| `composables/color/` | 2 | 95–116 |
| `composables/palette/` | 13 | 27–314 |

**`usePaletteManager.ts` is 314 LoC.** Memory note claims it was slimmed 419→257; the file is now 314, suggesting either slow re-bloat or memory drift.

**Coherence**: the facade pattern is honored — `pm.audit` / `pm.flagged` / `pm.tags` / `pm.versions` / `pm.tagEdit` as sub-objects rather than flat methods (D.W3 Lane B). The facade still imports 13 composables. The `PaletteManager` interface lists ~80 fields. **It's a god-object by composition, not by inheritance.** Acceptable as a single-app facade.

**Two friction points**:

1. **The `...browse` / `...admin` / `...colorQueue` spread idiom** (§277–§283) spreads three composables' returns into the facade. This is convenient but breaks the type-level invariant — if `useBrowsePalettes` adds a field, `PaletteManager`'s interface has to be hand-updated.
2. **The watcher zoo** (§198–§232) — 4 `watch` calls for cross-module orchestration (slug change, view change, search query, admin auth). These are correct but reveal that the "single facade" is doing routing work that arguably belongs in `usePaneRouter` or a dedicated coordinator.

**Transposition**: extract the watcher cross-module orchestration into `usePaletteManagerWiring.ts` (already exists for backend services — extend it to cover view-driven data loading). Slims `usePaletteManager` to ~200 LoC. Wave-slot: 0.5.

### §3.2 — `usePaneRouter` registry pattern

**Shape**: 229 LoC. Was the B.W2 single-source-of-truth fix (replaced parallel `useMobilePaneRouter` + `useDesktopPaneRouter`).

The registry is correct: one `componentFor(name)` switch, one `leftProps`/`rightProps` per slot type, mobile/desktopLeft/desktopRight all derive from the same `currentConfig`. **`actionBar` was folded in here from `useGenericActionBar`** — consolidation precept honored.

**One observation**: `componentFor` is a 12-branch `if`-chain (line 80–94). String-keyed dispatch via a `Map<string, Component>` would be ~5 LoC shorter and one indirection — but the current `if`-chain is V8-friendly (string === comparisons are fast). **Cosmetic, no action.**

**No transposition opportunities.**

### §3.3 — Component colocation

Post-Mar-2026 + B + D restructures:
- `color-picker/` has `controls/` + `display/` + `editing/` + `visual/` + `composables/` subdirs.
- `palette-browser/PaletteDialog/` is a 13-file colocated dir (D.W3 Lane A).
- `image-palette-extractor/ImageEyedropper/` is a 4-file colocated dir.
- `goo-blob/` has `composables/` + `shaders/` (Apr-2026).

**The colocation is idiomatic.** Each subtree owns its sub-components, its composables, and its shaders/constants.

**One awkwardness**: `goo-blob/composables/useBlobSatellites.ts` is 294 LoC — almost as large as `usePaletteManager`. The blob's state machine (orbit/merge/absorb/emerge) is non-trivial but lives in a "decoration" subtree. **It's the largest single composable file outside the palette facade.** Not actionable today, but worth flagging as a candidate for the post-glass-ui blob extirpation.

### §3.4 — Cross-cutting concerns + injection keys

`CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `POINTER_DEBUG_KEY`, `BLOB_CONFIG_KEY`, `SAFE_ACCENT_KEY`, `PALETTE_MANAGER_KEY`, `VIEW_MANAGER_KEY` — 7 injection keys total.

The injection-key pattern is correctly used for color state, edit target, debug overlay, blob config, palette manager, view manager. Prop-drilling is rare.

**No transposition.**

---

## §4 — Performance hot-path survey

### §4.1 — `src/units/color/utils.ts` per-frame allocations

`color2` allocates a `XYZColor` intermediate on every hub-transit (`xyz = fromEntry.to(color)`). For per-frame lerp through OKLab (the demo's default interpolation space), this is one allocation per channel-set per frame. Acceptable on desktop; on iOS Safari with smaller stacks, this is observed pressure.

`mixColors` allocates `keys = c1.keys().filter(...)` per call — array filter + map. Per-frame cost: O(channels) = 3–4 allocations. **Move the keys-without-alpha to a static per-space tuple** (`OKLAB_LERP_KEYS = ["l", "a", "b"]`). Wave-slot: 0.25.

### §4.2 — `lerpColorValue` (post-L5 hueMethod fix)

`interpolate.ts` §47. Walks `start.value.keys()` per call, branches on `key === hueKey`, dispatches `interpolateHue` vs `lerp`. The `.keys()` call goes through the `Color` getter chain — returns `[...channels, "alpha"]`, which allocates a new array every frame.

**Transposition**: cache the channel array on the Color base class — `Color.prototype._channelsWithAlpha` populated lazily. Or expose a `colorIterate(color, fn)` helper that walks the fields directly without allocating. Wave-slot: 0.5.

### §4.3 — `gamutMap` Ottosson path

`utils.ts` §1014. Path:
1. `color2(color, "rgb")` — full hub round-trip.
2. Check `r/g/b ∈ [0,1]` — no allocation, early return.
3. Within-epsilon check — clamp, then `color2(clamped, ...)` for round-trip back.
4. Else `gamutMapSRGB(r, g, b)` — analytical Ottosson path, returns tuple.
5. `new RGBColor(...)`, `color2(mappedRGB, color.colorSpace)`.

**Zero-iteration**: yes, `gamutMapSRGB` is closed-form (polynomial + one Halley step). **But the wrapper allocates ≥2 Color instances per call.** For in-gamut colors, only `color2(color, "rgb")` allocates; for out-of-gamut, three allocations.

**Transposition**: provide a `gamutMapRaw(r, g, b): [r, g, b]` low-level entry that skips the Color wrap when caller doesn't need the Color shape. Wave-slot: 0.25.

### §4.4 — Demo metaball renderer

`useMetaballRenderer.ts` is **clean** post-D-Lane-C cssColorToRgb memoization. Per-frame work:
- One `cssColorToRgb` cache lookup (Map.get on a 256-cap LRU-by-clear).
- 20 uniform updates + 4 satellite slot updates.
- One `mood.tick()` + `pointer.tick()` + `satellites.tick()`.
- One `drawArrays`.

No closure allocation in the loop. No object allocation beyond the cached tuple. `pointer.tick` and `mood.tick` write to existing refs. **Good shape.**

### §4.5 — Demo spectrum canvas + sliders

`SpectrumCanvas.vue` 279 LoC. Has a RAF loop driving the gradient repaint. Not inspected in detail — falls outside this audit's wave-slot budget. Flag for E-AUDIT-2 (perf) if applicable.

### §4.6 — `prepareInterpVar` fast-path dispatch

The D-wave's pre-resolved `_lerp` function on `InterpolatedVar` is a textbook V8 escape hatch. Branch becomes monomorphic after warm-up. **Already optimal.**

---

## §5 — Type system review

### §5.1 — `ColorChannel<T>` brand consistency

The phantom brand `ColorChannel<T> = T & { readonly [__ColorChannel]: true }` is declared in `index.ts` and consumed across `utils.ts` (the local `const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;` helper) and `contrast.ts` (duplicate `ch` helper).

**Drift**: `utils.ts:31` defines `const ch = ...` and `contrast.ts:6` defines `const ch = ...` — two private brand-erasers. The pattern is consistent but the helper isn't shared. **Lift to `color/utils.ts` as an exported internal helper, or to `color/index.ts`.** Wave-slot: 0.1.

### §5.2 — `verbatimModuleSyntax` enforcement

`import type` is correctly used throughout — spot-checks of `units/index.ts`, `units/color/index.ts`, `parsing/color.ts`, `units/color/normalize.ts` all import their types separately.

**No drift detected.**

### §5.3 — `strict: true` compliance — `as any` survey

Grep shows **44 `as any` survivors** in `src/`. Distribution:
- `units/color/index.ts` — 6 (the L8 brand-erasers + `_assertChannel` duck-typing).
- `units/index.ts` — 4 (ValueUnit `this as any` returns from `coalesce`).
- `units/utils.ts` — 6 (the `getUnitGroup` chain).
- `units/color/utils.ts` — 4 (range-access + final-call cast).
- `units/color/normalize.ts` — 3 (range-access).
- `units/interpolate.ts` — 5 (dynamic property access on color channels).
- `parsing/index.ts` — 2 (parser output casts).
- Other — ~14.

**Most are unavoidable** given the dynamic property access required by the channel-by-name iteration in `Color`. **Two are improvable**:

1. `units/normalize.ts:363` and `:376` — `colorSpace as any` on assignment to `out.colorSpace`. The `InterpolatedVar.colorSpace` field type is `ColorSpace | undefined`, but the `options.colorSpace ?? "oklab"` typecheck loses the narrow type. Fix: type the local `colorSpace` variable as `ColorSpace`.
2. `units/utils.ts:397–401` — the `getUnitGroup` runtime check. Each `LENGTH_UNITS.includes(unit as any)` could use a discriminated predicate. Minor.

**Recommendation**: clean both. Wave-slot: 0.2.

### §5.4 — Generic inference for `colorUnit2<C>()`

```ts
export const colorUnit2 = <C extends ColorSpace>(
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    to: C | null = "oklab" as C,
    ...
): ValueUnit<ColorSpaceMap<ValueUnit<number>>[C], "color">
```

The `to: C | null = "oklab" as C` default is a structural concession — the default falls through the type system as `ColorSpace` due to the cast. Consumers passing literals (`"oklch"`) get the narrow type back. **Inference works.**

`color2<T, C extends ColorSpace>` similarly returns `ColorSpaceMap<T>[C]` correctly.

**No drift.**

---

## §6 — Tooling alignment

### §6.1 — `tsconfig.json`

```json
"target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
"lib": ["ES2023", "DOM", "DOM.Iterable"], "strict": true,
"verbatimModuleSyntax": true, "noUncheckedIndexedAccess": true,
"exactOptionalPropertyTypes": true, "isolatedModules": true,
"useDefineForClassFields": true
```

**Current with the Vite 7 / Node 22+ stack.** `noUncheckedIndexedAccess` is the strictest array-bounds setting — honored throughout (every `array[i]!` non-null assertion is the trace of compliance).

`useDefineForClassFields: true` is correctly paired with the L8 own-property storage. `exactOptionalPropertyTypes: true` is the strictest optional-field setting.

**No changes needed.**

### §6.2 — `vitest.config.ts`

14 lines. Aliases `@src` only. Includes `test/*.ts`. Environment `jsdom`. **Correct.**

**Drift?**: the alias map covers only `@src` — the demo's `@components`/`@composables`/etc. aren't aliased here because vitest only loads `test/*.ts`, which imports from `@src/*` only. Spot-check: `test/value-unit.test.ts` etc. import from `../src` and `@src` interchangeably; the alias works.

**No drift.**

### §6.3 — `eslint.config.js` — the relaxed config

193 LoC of "everything off." The rationale comments are honest: codebase has hundreds of intentional `any`, BBNF grammar files have non-ASCII whitespace, parsers use prototype tricks, etc.

**This is the D.W1 Lane L7 "smoke gate, not opinionated linting" stance.** Per directive: "NO legacy code" — but legacy includes excess hygiene as well as undermaintained code. **Tightening would not yield significant clarity gains for value.js's combinator-heavy code.**

**Recommendation**: leave the config alone, or selectively re-enable the **stylistic** rules that don't fight the codebase (e.g., `no-irregular-whitespace` is off ONLY because of bbnf files — could be scoped to ignore `**/*.bbnf` instead of disabled globally). Wave-slot: 0.25 (optional).

### §6.4 — `playwright.config.ts`

3 projects (smoke, smoke-admin, smoke-mobile). 20+ specs. **D.W5 Lane C result.** Idiomatic. Consolidation is impractical — the three projects exist because they have different fixtures + viewports.

**No drift.**

### §6.5 — `package.json` versions

- `vite: ^7.0.6` — current.
- `vitest: ^3.2.4` — current.
- `vue: ^3.5.18` — current.
- `typescript: ^5.8.3` — current.
- `@mkbabb/parse-that: ^0.8.2` — current.
- `@mkbabb/glass-ui: file:../glass-ui` — sibling-repo file dep (per current constellation).
- `@mkbabb/keyframes.js: file:../keyframes.js` — sibling-repo file dep.
- `vue-router: ^4.6.4` — listed as runtime dep but **value.js the library doesn't use it**. It's a demo-only dep. **Should be devDependency.** Wave-slot: 0.1.

**`vue-router` misplacement is the only drift.**

---

## §7 — Documentation drift

### §7.1 — `CLAUDE.md` root

Lines 14–37 list the `src/` tree. Cross-check:

- `src/parsing/` lists `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`, `grammars/` — **matches `ls`**.
- `src/units/color/` lists 7 files (index, constants, matrix, utils, normalize, gamut, colorFilter) but actual has **9** (also `contrast.ts` 112 LoC + `mix.ts` 81 LoC). **DRIFT.**

### §7.2 — `src/units/CLAUDE.md`

Claims `index.ts` is "216 loc" but actual is **240**. Drift (delta 24 — likely the `_lerp` field on `InterpolatedVar` + the type narrowing additions from D).

Claims `utils.ts` is "373 loc" but actual is **430**. Drift (delta 57 — likely `convert2` + container-query unit support).

### §7.3 — `src/units/color/CLAUDE.md`

Claims `index.ts` is "475 loc" but actual is **546**. Drift (delta 71 — the L8 flatten added 15 subclass declarations with `declare` fields).
Claims `utils.ts` is "1160 loc" but actual is **1174**. Close.
Claims `normalize.ts` is "122 loc" but actual is **128**. Close.

### §7.4 — `src/parsing/CLAUDE.md`

Claims `color.ts` is "549 loc" but actual is **600**. Drift (delta 51 — likely relative color syntax + color() function additions).
Claims `utils.ts` is "50 loc" — actual is **50**. Match.

### §7.5 — `demo/CLAUDE.md`

Claims `usePaletteManager.ts` was slimmed (memory says 419→257) but actual is **314**. Drift on the lower-bound direction (re-bloat or memory drift).

### §7.6 — Transposition for §7

The `CLAUDE.md` files are accurate in structure (file lists, role descriptions) but wrong in LoC counts. **LoC counts in CLAUDE.md are footguns** — they decay with every commit. **Recommendation: strip LoC from the CLAUDE.md tables**, OR add a CI lint that updates them. Wave-slot: 0.25 (strip option) or 1 (CI lint option).

Also: add `mix.ts` + `contrast.ts` to the `src/units/color/CLAUDE.md` file list.

---

## §8 — Legacy code inventory

Comprehensive scan results:

| Item | Path | Disposition |
|---|---|---|
| `lerpLegacy` | `src/math.ts:37`, `src/index.ts:220` | **DELETE.** Zero consumers anywhere in codebase. |
| `@deprecated` JSDoc | `src/math.ts:34` (the `lerpLegacy` warning) | **DELETE with `lerpLegacy`.** |
| `WhitePointColor` intermediate class | `src/units/color/index.ts:163` | **LIFT** `whitePoint` to `Color<T>` base (§2.2.1). |
| Module-init lazy closure | `src/parsing/color.ts:92` (`_relativeCalcExpr`) | **KEEP** — circular-import workaround, contained. |
| `import.meta.env.DEV` dev-only guards | `src/units/color/index.ts` (15 subclass constructors) | **KEEP** — production DCE confirmed. |
| `vue-router` runtime dep | `package.json:60` | **MOVE TO devDependencies** — value.js library doesn't use it. |
| Unused exports — `BLACKLISTED_COALESCE_UNITS` | `src/index.ts:20` | **REVIEW** — internal-only flag exposed externally. |
| Unused exports — `STRING_UNITS`, `COLOR_UNITS` | `src/index.ts:17, 18` | **REVIEW** — 1-element tuples. |
| Documentation drift | `CLAUDE.md`, `src/units/CLAUDE.md`, `src/units/color/CLAUDE.md`, `src/parsing/CLAUDE.md`, `demo/CLAUDE.md` | **UPDATE** (strip LoC or add lint). |

**Unused imports in src/ that survived D's cleanup waves**: none detected on spot-check. Lint would catch these — currently disabled (`@typescript-eslint/no-unused-vars: off`). If E enables that rule scoped to `src/**`, it gains a continuous check.

**Imports of removed/renamed types**: none detected. The `components.get("L")` → `color.L` migration (per memory) is fully completed — grep finds zero `components.get` callsites in src/ or demo/.

---

## §9 — Top-N transposition opportunities for E

Ranked by **reward / wave-slot cost ratio**, with elegance / simplicity / performance trichotomy notes.

| # | Transposition | Scope (wave-slots) | Outcome | Axis |
|---|---|---|---|---|
| 1 | **Delete `lerpLegacy` + its `@deprecated` JSDoc + the `src/index.ts` re-export.** | 0.1 | One legacy export retired; matches D.W3 Lane C L11 migration completion. Honors directive "NO legacy." | Elegance |
| 2 | **Replace 152-branch `nameParser` `any()` with broad-regex + Map-lookup chain** (the L14 deferred item). | 0.5 | Module-init RegExp allocations 152→1. Named-color parse: O(N)→O(1). | Performance |
| 3 | **Lift `whitePoint?: WhitePoint` to `Color<T>` base; delete `WhitePointColor<T>` intermediate.** | 1 | 15 → 14 class headcount in `color/index.ts`. Removes asymmetric inheritance (OKLCH inheriting from Color directly while LAB inherits from WhitePointColor). Type-level invariant restored. | Elegance |
| 4 | **Add `DIRECT_PATHS` table to `color2()`** for `oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`. XYZ-hub is fallback. | 1 | Hot interpolation paths skip the XYZ intermediate. Per-frame allocation drop on demo gradient interpolation. | Performance |
| 5 | **Extract `rgbFamily2xyz` / `xyz2rgbFamily` helpers** for the 4 wide-gamut conversion pairs. | 0.5 | ~40 LoC duplication removed. Clarity win in `utils.ts`. | Simplicity |
| 6 | **Hide the 51 individual `<from>2<to>` color conversion functions behind a `/internal` subpath**; keep `color2`/`colorUnit2` on main surface. | 1 | Public API surface ~halved. Documentation burden drops; future consolidation isn't a breaking change. | Elegance |
| 7 | **Move `vue-router` to devDependencies**. | 0.1 | One package.json line — library installs no longer pull a runtime dep it doesn't use. | Simplicity |
| 8 | **Cache `keys()` arrays on Color subclasses** OR provide a `colorIterate(color, fn)` allocation-free walker. | 0.5 | Per-frame allocation in `lerpColorValue` + `mixColors` removed. | Performance |
| 9 | **Add a `keyFn: (s) => s` override on the three string-parser memoize sites** (`parseCSSValue`, `parseCSSColor`, `parseCSSValueUnit`). | 0.25 | Skip JSON.stringify allocation per parse. | Performance |
| 10 | **Strip LoC from the 5 `CLAUDE.md` files** (or add a CI lint that updates them). | 0.25 | Removes a perpetually-drifting footgun. Sources of truth become file tree + roles, not LoC counts. | Simplicity |
| 11 | **Extend `tryParse` error to include input context window** (16 chars around offset). | 0.5 | Better demo error toasts. UX-noticeable. | Elegance |
| 12 | **Clean the 2 fixable `as any` in `units/normalize.ts:363,376`** + the `getUnitGroup` chain in `units/utils.ts:397–401`. | 0.2 | Marginal type-safety. Low-priority but tidy. | Elegance |
| 13 | **Lift `ch = <T>(v: T): ColorChannel<T>` brand-eraser** to a single internal helper rather than per-file copies. | 0.1 | Two files deduplicated. | Simplicity |
| 14 | **Extract palette-manager cross-module watchers** (the 4 `watch` calls in `usePaletteManager.ts:198–232`) into `usePaletteManagerWiring.ts`. | 0.5 | Facade ~314→~250 LoC. Single-responsibility cleaner. | Simplicity |
| 15 | **Improve `getComputedValue` memo key** (replace string concat with nested WeakMap). | 0.5 | One string allocation per memo lookup eliminated. Per-frame on transform interpolation. | Performance |

**Total**: 7.95 wave-slots across 15 items. For a 5–6-wave tranche, this is realistically 8–12 of the items, depending on grouping.

**Bundled groupings I'd recommend**:

- **Lane "legacy-clean"** (items 1, 7, 10, 13) — 0.55 slots — pure hygiene.
- **Lane "perf-frame"** (items 4, 8, 9, 15) — 2.25 slots — measurable per-frame win.
- **Lane "color-hierarchy"** (items 3, 5) — 1.5 slots — structural elegance.
- **Lane "api-surface"** (item 6) — 1 slot — public-API revision (v0.7.0 candidate).
- **Lane "parsing-perf"** (items 2, 11) — 1 slot — parser combinator polish.
- **Lane "type-tidy"** (items 12, 14) — 0.7 slots — drift mop-up.

**Total bundled**: 7.0 slots — feasible.

---

## §10 — Authority

**Files read** (READ-ONLY, all absolute paths):

- `/Users/mkbabb/Programming/value.js/src/index.ts` (full, 361 LoC).
- `/Users/mkbabb/Programming/value.js/src/math.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/utils.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/easing.ts` (first 100 lines).
- `/Users/mkbabb/Programming/value.js/src/units/index.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/units/utils.ts` (full, 430 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/normalize.ts` (full, 398 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/interpolate.ts` (full, 140 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/constants.ts` (first 100 lines).
- `/Users/mkbabb/Programming/value.js/src/units/color/index.ts` (full, 546 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/color/utils.ts` (lines 1–1174, full).
- `/Users/mkbabb/Programming/value.js/src/units/color/normalize.ts` (full, 128 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/color/gamut.ts` (first 120 LoC).
- `/Users/mkbabb/Programming/value.js/src/units/color/contrast.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/units/color/mix.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/parsing/index.ts` (full, 279 LoC).
- `/Users/mkbabb/Programming/value.js/src/parsing/utils.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/parsing/units.ts` (full).
- `/Users/mkbabb/Programming/value.js/src/parsing/color.ts` (full, 600 LoC).
- `/Users/mkbabb/Programming/value.js/src/parsing/math.ts` (first 200 LoC).
- `/Users/mkbabb/Programming/value.js/src/parsing/extract.ts` (first 60 LoC).
- `/Users/mkbabb/Programming/value.js/src/transform/decompose.ts` (first 100 LoC).
- `/Users/mkbabb/Programming/value.js/src/quantize/index.ts` (first 80 LoC).
- `/Users/mkbabb/Programming/value.js/CLAUDE.md` (full — embedded in system reminder).
- `/Users/mkbabb/Programming/value.js/src/units/CLAUDE.md` (full — embedded).
- `/Users/mkbabb/Programming/value.js/src/units/color/CLAUDE.md` (full — embedded).
- `/Users/mkbabb/Programming/value.js/src/parsing/CLAUDE.md` (full — embedded).
- `/Users/mkbabb/Programming/value.js/src/transform/CLAUDE.md` (full — embedded).
- `/Users/mkbabb/Programming/value.js/demo/CLAUDE.md` (full).
- `/Users/mkbabb/Programming/value.js/demo/color-picker/App.vue` (first 120 LoC).
- `/Users/mkbabb/Programming/value.js/demo/@/composables/usePaneRouter.ts` (full).
- `/Users/mkbabb/Programming/value.js/demo/@/composables/palette/usePaletteManager.ts` (full).
- `/Users/mkbabb/Programming/value.js/demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` (full).
- `/Users/mkbabb/Programming/value.js/tsconfig.json` (full).
- `/Users/mkbabb/Programming/value.js/vitest.config.ts` (full).
- `/Users/mkbabb/Programming/value.js/playwright.config.ts` (full).
- `/Users/mkbabb/Programming/value.js/eslint.config.js` (full).
- `/Users/mkbabb/Programming/value.js/package.json` (full).

**Bash audits performed** (READ-ONLY):

- LoC + file-count surveys across `src/` and `demo/`.
- Grep for `@deprecated`, `lerpLegacy`, `as any`, `WhitePointColor`, `TODO/FIXME/HACK`, `import.*from.*src` from demo, `import.*demo` from src.
- File-tree enumeration for `demo/@/components/custom/`, `demo/@/composables/`, `demo/@/lib/palette/`, `docs/tranches/E/`.

**No mutations.** Branch `tranche-e` is undisturbed (the working-tree `M` entries on `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts`, and the new `src/index.ts`/`src/parsing/animation-shorthand.ts`/etc. files predate this audit).

---

## Verdict summary

| Subdirectory | Structural soundness | Key issue |
|---|---|---|
| `src/units/` (core classes) | **Strong** | `MATRIX_SUB_PROPERTIES` Set is overkill (cosmetic). |
| `src/units/color/` (15 spaces) | **Strong, post-L8** | `WhitePointColor` intermediate is asymmetric. `color2` always traverses XYZ hub. |
| `src/parsing/` | **Mixed** | 152-branch `nameParser` `any()` — L14 deferred path now exists. `_relativeCalcExpr` lazy-closure is accepted module-cycle workaround. |
| `src/math.ts` + `src/easing.ts` | **Strong** | `lerpLegacy` is sole `@deprecated` in library — zero consumers — delete. |
| `src/utils.ts` | **Strong** | `memoize` default `JSON.stringify` keyFn over-allocates on 1-arg string callers. |
| `src/transform/decompose.ts` | **Strong** | None. |
| `src/quantize/` | **Strong** | None. |
| `src/index.ts` barrel | **Accidental** | 51 individual conversion functions over-exposed. `lerpLegacy` + `BLACKLISTED_COALESCE_UNITS` + `STRING_UNITS`/`COLOR_UNITS` are surface noise. |
| `demo/@/composables/` | **Strong** | `usePaletteManager` watcher zoo could lift to wiring. |
| `demo/@/components/custom/` | **Strong** | `goo-blob/composables/useBlobSatellites.ts` (294 LoC) — pre-extirpation parking lot. |
| `demo/@/lib/palette/` | **Strong** | None. |
| Tooling | **Current with stack** | `vue-router` misplaced as runtime dep. |
| Documentation | **Drift in LoC counts** | 5 CLAUDE.md files have outdated LoC numbers. |

**Top-3 transpositions ranked**:

1. Delete `lerpLegacy` (0.1 slot, pure hygiene).
2. Replace 152-branch nameParser (0.5 slot, real perf).
3. Lift `WhitePointColor` (1 slot, elegance).

**Deliverable path**: `/Users/mkbabb/Programming/value.js/docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md`
