# Dm (Dν) — Parser architecture audit

**Scope**: `src/parsing/**` + `src/parsing/grammars/*.bbnf`, the four B.W3-committed parsers (`animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`), and consumption from `keyframes.js`.

**Date**: 2026-05-19. **Mode**: planning-only / READ-ONLY. **HEAD**: `w.w2.1-value-js-prebuild`.

**Dependency surface**: `@mkbabb/parse-that@^0.7.0`, exposing `Parser`, `ParserState`, `any`, `all`, `string`, `regex`, `whitespace`, `dispatch`, `Parser.lazy`, plus methods `.map`, `.chain`, `.skip`, `.next`, `.opt`, `.many`, `.sepBy`, `.wrap`, `.trim`, `.not`, `.minus`, `.peek`, `.lookAhead`, `.recover`, `.memoize`, `.mergeMemos`, and a built-in **`cssParser`** that covers `@keyframes`, `@media`, `@supports`, `@font-face`, `@import`, qualified rules, selectors, and a `specificity()` helper. The `cssParser` surface is **not consumed** by value.js's `parsing/`. parse-that also ships `splitBalanced` / `containsDelimiter` zero-copy helpers that are likewise not consumed (re-implemented locally — see §3.4).

---

## §1 Parser inventory

| File | LoC | Purpose | Public-export status (`src/index.ts`) |
|---|---:|---|---|
| `parsing/utils.ts` | 50 | primitives: `istring`, `identifier`, `number`, `integer`, `none`, `succeed`, `fail`, `tryParse`, `parseResult` | all re-exported |
| `parsing/units.ts` | 129 | dimension parsers: `Length`, `Angle`, `Time`, `Frequency`, `Resolution`, `Flex`, `Percentage`, `TimePercentage`, `Slash`, `Value`, `sep`; `parseCSSValueUnit`, `reverseCSSTime`, `reverseCSSIterationCount` | `CSSValueUnit`, `parseCSSValueUnit`, `reverseCSSTime`, `reverseCSSIterationCount` exported |
| `parsing/color.ts` | 549 | 15 color spaces + hex + kelvin + `color-mix()` + `color()` + relative color syntax; `parseCSSColor`, `registerColorNames`, `clearCustomColorNames`, `getCustomColorNames` | `CSSColor`, `parseCSSColor` exported (color-name registry helpers NOT re-exported from root) |
| `parsing/math.ts` | 503 | calc() AST + min/max/clamp/round/mod/rem + trig + exp + CSS constants (pi/e/infinity/NaN); `createMathFunctionParsers`, `createCalcParser`, `evaluateMathFunction`, `inferResultUnit` | `evaluateMathFunction` exported (factory helpers internal) |
| `parsing/index.ts` | 279 | top-level: `parseCSSValue`, `parseCSSPercent`, `parseCSSTime`; gradients; transforms; `var()`; `cubic-bezier()`; CSS-wide keywords; `CSSString`, `CSSJSON`, `CSSValues`, `CSSFunction` | `CSS_WIDE_KEYWORDS`, `CSSString`, `CSSFunction`, `CSSJSON`, `CSSValues`, `parseCSSValue`, `parseCSSPercent`, `parseCSSTime` exported |
| `parsing/stylesheet.ts` ⬅ **B.W3** | 515 | `Stylesheet` / `StylesheetItem` / `Declaration` / `KeyframeRule` / `KeyframeSelector` / `PropertyDescriptor` AST; `parseCSSStylesheet` | full surface exported |
| `parsing/extract.ts` ⬅ **B.W3** | 200 | `AnimationOptions` type; `extractKeyframes`, `extractProperties`, `extractStyleRules`, `extractAnimationOptions` | full surface exported |
| `parsing/serialize.ts` ⬅ **B.W3** | 156 | `serializeKeyframeSelector`, `serializeDeclaration`, `serializeStylesheetItem`, `serializeStylesheet`; lazy `formatCSS`, `stylesheetToString` (prettier dynamic import) | full surface exported |
| `parsing/animation-shorthand.ts` ⬅ **B.W3** | 286 | `parseAnimationShorthand`, `reverseAnimationShorthand` (hand-rolled string scanner — NOT parse-that) | both exported |
| `grammars/css-values.bbnf` | 99 | documentation grammar — referenced by `bbnf-equivalence.test.ts` (snapshot only; does NOT actually compare against the BBNF execution) | n/a |
| `grammars/css-color.bbnf` | 136 | documentation grammar — same status as above | n/a |

**Total**: 9 TS files, 2 grammar files; 2667 LoC TS + 235 LoC BBNF.

**keyframes.js consumption** (`keyframes.js/src/animation/`):
- `adapter.ts` imports `extractAnimationOptions`, `extractKeyframes`, `extractProperties`, `parseCSSStylesheet` (the full B.W3 surface).
- `index.ts` imports `parseCSSStylesheet`, `parseCSSTime`, `parseCSSValueUnit`.
- No parsers in keyframes.js itself — it is a **pure consumer**. There is one indirect test (`test/format.test.ts`) that exercises `resolveKeyframes`, hence `extractKeyframes` + `extractAnimationOptions` + `parseCSSStylesheet`.

---

## §2 Combinator-usage idiom audit

### 2.1 Combinators in active use

`any`, `all`, `string`, `regex`, `whitespace`, `Parser.lazy`, `.map`, `.chain`, `.skip`, `.next`, `.opt`, `.many`, `.sepBy`, `.wrap`, `.trim`, `.not` — the standard surface. Idiomatic.

### 2.2 Combinators **NOT** used (could be)

| Combinator | Where it should apply | Classification |
|---|---|---|
| **`dispatch`** (O(1) first-char alternation, parse-that's leaf-level) | `color.ts` `Value` — 14-branch `any()` of color spaces all anchored on a fixed leading character (`#`, `r`, `h`, `l`, `o`, `x`, `c`, kelvin digit); `units.ts` `Value` — 11-branch `any()` keyed by trailing unit; `math.ts` `allMathFunctions` — 21-branch `any()` all keyed on the function identifier | PERFORMANCE / ARCHITECTURE |
| **`splitBalanced`** / **`containsDelimiter`** (zero-copy split helpers in parse-that) | `stylesheet.ts` re-implements its own `balancedText`/`splitSelectorList`; `animation-shorthand.ts` reimplements `tokeniseShorthand` + `splitTopLevelCommas` | DRY |
| **`cssParser`** (parse-that's built-in CSS parser with keyframes/media/supports) | `stylesheet.ts` reinvents qualified-rule + at-rule scanning; the built-in covers the same surface plus `@media`, `@supports`, `@font-face`, `@import` (which `stylesheet.ts` lumps into `kind: "unknown"`) | ARCHITECTURE |
| **`.memoize()` / `.mergeMemos()`** (parser-level memoization) | Memoization is applied at the public-API layer (`memoize(parseCSSValue)`, etc.) but never at the combinator layer for sub-parsers that re-run inside `any()` chains — the per-color-space `colorOptionalAlpha` calls each rebuild `optionalAlpha`/`args` parsers from scratch on construction (cheap, one-time) but the parse-state work repeats | PERFORMANCE |
| **`.recover(sync, sentinel)`** (recoverable failure for `many()`/`sepBy()` loops) | Long gradients with one malformed stop fail the entire parse; with `.recover()` they could emit one diagnostic per stop and keep going | FAIL-EXPLICIT (error reporting) |
| **`.peek()`** / **`.lookAhead()`** | Several `.opt()` + flag-on-success patterns could be lookahead instead | minor ARCHITECTURE |

### 2.3 Per-color-space alternation explosion (color.ts §270-330)

```
rgbParser  = any(relativeColorParser("rgb"), colorOptionalAlpha("rgb"))
hslParser  = any(relativeColorParser("hsl"), colorOptionalAlpha("hsl"))
…
xyzParser  = any(relativeColorParser("xyz"), colorOptionalAlpha("xyz"))
```

Eight identical 2-branch alternations differing only by name; one space (`hsv`) has no relative form. Then a 14-branch top-level `any()` mixes hex/kelvin/all-eight-spaces/named/colorMix/colorFunction. Worst case (input = a named color near the end of the priority list, like `"yellowgreen"`): parser tries `colorMix` (fails fast on first char), `colorFunction` (fails fast), `hex` (fails on first char), then runs `colorOptionalAlpha` for **eight** different space-name `string()` parsers before reaching `nameParser`. Each `colorOptionalAlpha` constructs (then discards) a 3-`colorValue` `all()` after the name match fails, but the name-match itself probes against literal `string("rgb")`, `string("hsl")`, …, each O(prefix-length).

A `dispatch({'r': rgbParser, 'h': any(hslParser, hsvParser, hwbParser), 'l': any(labParser, lchParser), 'o': any(oklabParser, oklchParser), 'x': xyzParser, '#': hex, 'c': any(colorMix, colorFunction), '0-9': kelvin, 'a-zA-Z': nameParser, …})` collapses 14 trials to 1 lookup.

### 2.4 Case-sensitivity inconsistency (FAIL-EXPLICIT / DRY)

- `colorOptionalAlpha` (`color.ts:216`) uses `string(colorSpace)` — **case-sensitive**.
- `relativeColorParser` (`color.ts:238`) uses `string(cssName)` — **case-sensitive**.
- `math.ts` uses `string("calc")`, `string("min")`, etc. — **case-sensitive**.
- CSS Color L4 §4.3 specifies all color-function names are **ASCII case-insensitive**. CSS Values L4 §2.4 specifies all function-name keywords (calc, min, max, …) are **ASCII case-insensitive**.
- The `xyzParser` etc. however **lowercase the input via `colorMixSpace = any(utils.istring("xyz"), …)`** for `color-mix(in XYZ, …)` but the same input fed to `xyz(…)` directly would fail.
- Inputs like `RGB(255, 0, 0)`, `CALC(1px + 2px)`, `oklch(...)` work but `OKLCH(...)` does not.

This is FAIL-EXPLICIT in the *wrong* direction — it should be silent acceptance (case-fold). Currently the parser fails silently for a perfectly valid CSS input.

### 2.5 Ordering bug — `index.ts` `Value` vs `ValuesValue`

```ts
// line 235
const Value:       any(CSSWideKeyword, CSSValueUnit.Value, Function_, CSSString)
// line 251
const ValuesValue: any(MathFunction,   CSSValueUnit.Value, Function_, CSSJSON, CSSString)
```

`ValuesValue` is missing `CSSWideKeyword`. Effect: `parseCSSValue("inherit")` works (Value top-level via `ValuesValue` includes the `Function_` arm which doesn't match `inherit`, and falls to `CSSString` — which captures it as a string-typed `ValueUnit`, not a keyword-typed one). Inputs like `unset` round-trip as `ValueUnit("unset", undefined)` instead of `ValueUnit("unset", "string", ["keyword"])`. The `Value` constant (line 235) is only exported via `CSSFunction.Value` and not used by `parseCSSValue`. **ARCHITECTURE / DOC-DRIFT.**

### 2.6 Lazy / circular references

`Parser.lazy()` is used correctly to break:
- `units.ts ↔ color.ts` (Color depends on units; units' `Value` depends on `CSSColor.Value`)
- `index.ts:13` `FunctionArgs ↔ Value`
- `color.ts:187` `colorValue` lazy (used in `componentExpr`)
- `color.ts:244` relative color `from <color>` lazy
- `math.ts:47` calcSum recursive via lazy
- `math.ts:104` `mathFunction` forward decl for nested math in calc

The pattern is consistent and idiomatic.

---

## §3 Fail-explicit audit

Invariant D3: a real parse error must be EXPLICIT, not a silent fallback to a default value.

### 3.1 `tryParse` (utils.ts:35) — correct

Throws a generic `Error("Parse error at offset N")`. **Note**: the error includes the byte offset but **NOT the line/column**, **NOT the expected token list** (`state.expected: string[]` is populated by parse-that's diagnostic surface but discarded). **D3 partial-compliance**; D9 (error-message quality) — see §3.6.

### 3.2 `parseCSSColor` (color.ts:534-549) — fail-explicit ✓

```ts
const result = utils.parseResult(Value, input);
if (result.status) return result.value;
// Fallback: custom color names
const resolved = customColorNames.get(key);
if (resolved) return utils.tryParse(Value, resolved);
// Re-throw original parse failure
return utils.tryParse(Value, input);
```

The final line re-runs the parser to surface the error. Fail-explicit ✓ but **wasteful**: re-parses the whole input. Cleaner: capture the first `state` and re-throw with its `expected`/`offset`.

### 3.3 `parseDeclarationValue` (stylesheet.ts:212-235) — **FAIL-EXPLICIT VIOLATION**

```ts
const result = utils.parseResult(CSSValues.Values, trimmed);
if (result.status && Array.isArray(result.value) && result.value.length > 0) { /* … */ }
return new ValueArray(new ValueUnit(trimmed, "string"));     // ← silent fallback
```

Any declaration value the rich parser can't handle — be it a font-family list (`Arial, sans-serif`, designed-for fallback) or a **genuinely malformed CSS value** — silently becomes an opaque string ValueUnit. There is no signal at the call site that the rich parsing failed vs. that the value was simply outside the rich-parser's scope. **D3 violation.** The intention is documented in the comment but the implementation has no way to distinguish "the parse legitimately bottoms out" from "the parse failed at column 17".

**Severity**: high — this is called for every declaration in every stylesheet parsed by keyframes.js's `resolveKeyframes`. A malformed property value disappears into an opaque string.

### 3.4 `extract.ts` `tryParseTime` / `tryParseIterationCount` (extract.ts:93-106) — **FAIL-EXPLICIT VIOLATION**

```ts
const tryParseTime = (text: string): number | undefined => {
    try { return parseCSSTime(text); }
    catch { return undefined; }
};
```

Wraps `parseCSSTime` in a try/catch and returns `undefined` on any error. Then `applyLonghand` writes `if (n != null) out.duration = n;` — so a malformed `animation-duration: 1ms` (where the "1ms" was accidentally `1 ms`) is **silently dropped**. The animation runs with no duration, no diagnostic. **D3 violation.**

### 3.5 `animation-shorthand.ts` (line 184) — **FAIL-EXPLICIT VIOLATION**

```ts
// Unknown token — ignored.
```

The shorthand parser's last fall-through silently drops tokens it doesn't recognise. A typo in the shorthand (`animation: 1s ease-inn 2s`) silently loses the timing function and the second time is taken as `delay`. Tokens are dropped without any signal. **D3 violation.**

### 3.6 Error reporting (D9-adjacent)

`tryParse` throws `Error("Parse error at offset N")` — no line/column, no expected token. parse-that's `ParserState` carries `furthest`, `expected`, plus a global `getCollectedDiagnostics()` surface that `tryParse` discards. The demo cannot show a useful error message even if it tried. **ARCHITECTURE / FAIL-EXPLICIT.**

### 3.7 `.opt()` inventory — non-violations

| Site | Compliance |
|---|---|
| `index.ts:191` gradient direction `.opt()` | correct — direction is genuinely optional in CSS |
| `color.ts:216,239` `istring("a").opt()` | correct — `rgb` vs `rgba` |
| `color.ts:248,364,379` alpha/percentage/hue-method `.opt()` | correct — optional by CSS spec |
| `math.ts:145` round-strategy `.opt()` | correct |
| `stylesheet.ts:240` `importantFlag.opt()`, line 242 `semi.opt()`, 361 keyframes name `.opt()` | all correct |

All `.opt()` uses are at spec-defined optional points. ✓

### 3.8 `?? null` / `?? <default>` audits

- `color.ts:86` `bindings[expr.name] ?? 0` — silent default for unresolved relative-color reference. If `r` is referenced but missing, returns 0. **DESIGN CHOICE / FAIL-EXPLICIT MINOR** — the comment doesn't justify why the silent default is correct.
- `color.ts:121` `bindings.alpha ?? 1` — fine, the CSS spec defaults alpha to 1.
- `color.ts:139` `CONSTRUCTORS[targetSpace] ?? RGBColor` — silent fallback to RGB if target space is unknown. **FAIL-EXPLICIT VIOLATION** — should throw.
- `color.ts:395` `COLOR_MIX_SPACE_MAP[spaceName] ?? "oklab"` — silent fallback to oklab. **FAIL-EXPLICIT VIOLATION** — but the parser's `colorMixSpace` already restricts the alternatives so this is dead code. Either way the `?? "oklab"` should be a `throw`.

### 3.9 `evaluateSimpleCalc` (color.ts:78-81) — **SECURITY + ARCHITECTURE**

```ts
function evaluateSimpleCalc(expr: string): number {
    const sanitized = expr.replace(/[^0-9.+\-*/() e]/g, "");
    return new Function(`return (${sanitized})`)() as number;
}
```

Used **only** in relative-color-syntax `calc(r * 0.8)` expressions. Uses `new Function()` to evaluate arithmetic with a regex-based sanitiser. **The whole `parsing/math.ts` already builds a real calc AST** with proper operator precedence and unit propagation — but it's **not consumed** here. This is:
1. **A second math evaluator** in the codebase that doesn't share semantics with the first (DRY violation).
2. **A dynamic eval** that runs at parse time on user input. The regex sanitiser blocks letters except `e` (for scientific notation) — but `e` could be exploited as a variable in a Function-constructed scope (not in this isolation, but the precedent is bad).
3. **Drops unit information** — the result of `calc(r * 0.8)` in `rgb(from red calc(r * 0.8) g b)` is a raw number, but if the spec ever allows `calc(L * 1deg)` for OKLCH hue offsets the unit dimension is lost.

**Severity**: medium — limited blast radius today (only relative color syntax), but the architectural duplication is real and the dynamic eval is unjustified given that the AST parser already exists.

### 3.10 Summary — fail-explicit violations

| # | Site | Class | Severity |
|---|---|---|---|
| FE1 | `stylesheet.ts:234` `parseDeclarationValue` silent string fallback | D3 violation | **high** |
| FE2 | `extract.ts:93/101` `tryParseTime`/`tryParseIterationCount` swallow | D3 violation | **high** |
| FE3 | `animation-shorthand.ts:184` unknown token dropped | D3 violation | **medium** |
| FE4 | `color.ts:139,395` `CONSTRUCTORS[…] ?? RGBColor`, `…SPACE_MAP[…] ?? "oklab"` | D3 violation | low (dead) |
| FE5 | `color.ts:86` `bindings[expr.name] ?? 0` | undocumented default | low |
| FE6 | `utils.ts:38` `tryParse` discards expected/line/col | error-message quality | **medium** |
| FE7 | `color.ts:78` `evaluateSimpleCalc` dynamic-eval + DRY violation against `math.ts` | architecture | medium |

7 sites total. **3 are high/medium D3 violations.**

---

## §4 Hot-path allocation findings

### 4.1 Per-`map` callback closure & object allocations

Every successful parse arm runs a `.map()` callback that allocates one or more wrapper objects:

- `units.ts` Length/Angle/Time/… each allocate a fresh `superType: string[]` array on **every** parse (line 32: `["length"]`, line 41: `["angle"]`, …). For a 500-stop gradient with 500 lengths, that's 500 superType arrays.
- `color.ts` `createColorValueUnit` allocates a fresh `["color", value.colorSpace]` array per color (`color.ts:34`). For a 500-stop gradient, 500 fresh 2-element arrays.

**Fix**: hoist the literal arrays to module-level constants (`const LENGTH_SUPERTYPE = ["length"] as const;` then `new ValueUnit(value, unit, LENGTH_SUPERTYPE)`). Saves N×K array allocations for an N-token gradient with K-component value-units.

**PERFORMANCE — easy win, ~10 lines of edits.**

### 4.2 `colorOptionalAlpha` rebuilds the alpha-branch parser per call

```ts
const colorOptionalAlpha = (colorSpace: string) => {
    const name = string(colorSpace).skip(utils.istring("a").opt());
    const optionalAlpha = any(…);    // rebuilt 9 times
    const args = all(…).trim(whitespace).wrap(lparen, rparen);
    return name.next(args).map(…);
};
```

Each of the 9 colorspace parsers rebuilds `optionalAlpha` and `args` (and the internal `colorValue.skip(sep)`-chains) at module-init time. Each is constructed once but the **shape** (8 identical `optionalAlpha` parsers, 8 identical `args` parsers differing only by trailing `name`) means 9 copies of the same combinator-tree. The runtime parse cost is correct but the per-color-space `any(relativeColorParser, colorOptionalAlpha)` doubles the trial count on every color parse (`relative` is rare, but is tried first).

**Fix**: factor the args-shape (3 `colorValue` + optional alpha) into one shared sub-parser; the name-with-optional-`a` becomes a separate prefix. `any(...spaceNames).chain(name => sharedArgs.map(args => buildColor(name, args)))` collapses 8 trials to 1.

### 4.3 `nameParser` 148-branch `any()` with sort-on-construction

```ts
const nameParser = any(
    ...Object.keys(COLOR_NAMES)
        .sort((a, b) => b.length - a.length)
        .map(utils.istring),
).chain(x => /* lookup */);
```

148 named colors → 148-branch `any()` with each branch a fresh `istring()` (which compiles a regex). The sort-by-length-desc is correct (`whiteSmoke` must beat `white`) but the **worst-case branch fan-out** for an input that's not a color name (e.g. an unknown identifier) is 148 regex tests. `dispatch({…})` first-char dispatch reduces this to ~26 branches keyed by first letter. Better: a single `regex(/[a-zA-Z]+/)` followed by `.chain` that does a `Map` lookup.

**PERFORMANCE — significant for stylesheets with many bare-identifier declarations** (e.g. `display: flex`, where `flex` is checked against every color name before falling through).

### 4.4 `handleVar` nested-paren recursion

`index.ts:28-36` rebuilds the `varContent` recursive parser **inside** `handleVar()` on every call to `handleVar()` (only invoked once at module-init, so harmless in practice — but the inner `lazy` self-reference means each call to the parser repeatedly enters the lazy guard). Counts are bounded by paren depth (usually ≤2).

No action needed but should be flagged for the `cssParser` migration story (§6).

### 4.5 Stylesheet `balancedText` allocation

`stylesheet.ts:99-181` `balancedText` is a hand-rolled raw `Parser` that scans the input char-by-char tracking 3 depth counters + string state — **zero allocations during the scan** (other than the final `input.slice(start, i)` for the captured text). This is well-implemented and the right model.

`splitSelectorList` (line 409) and `splitTopLevelCommas` (animation-shorthand.ts:207) and `tokeniseShorthand` (animation-shorthand.ts:11) are **three near-identical re-implementations** of the same balanced-split scanner. parse-that exports `splitBalanced` / `containsDelimiter` (zero-copy span helpers) that could replace all three. **DRY.**

### 4.6 Memoize at the wrong layer

`memoize(parseCSSValue)` etc. caches by full input string. Effective for repeated identical inputs (CSS variables, design tokens) — correct. But the underlying parsers don't share memoization, so:
- `parseCSSValue("red")` → `parseCSSColor("red")` re-parses through the full Value chain.
- `extractAnimationOptions` calls `parseCSSTime` per declaration — each cached, ✓.

No action needed but the memoize cache is unbounded — a long-running consumer pumping many distinct values keeps every result alive forever. Worth flagging.

### 4.7 Hot-path allocation summary

| # | Site | Severity |
|---|---|---|
| HP1 | `Length`/`Angle`/`Time`/… per-parse `superType: string[]` allocation | medium (N× allocations per gradient) |
| HP2 | `colorOptionalAlpha` 9 copies of the args-tree | low (init-time only) |
| HP3 | `nameParser` 148-branch `any()` for bare identifiers | **high** (every non-color identifier hits 148 regex tests) |
| HP4 | Memoize caches unbounded | low (long-running consumers) |
| HP5 | 3 hand-rolled balanced scanners duplicating parse-that primitives | DRY |

---

## §5 BBNF grammar drift check

The two grammar files (`css-values.bbnf`, `css-color.bbnf`) describe the CSS spec, intended as the executable form for migration. **Reality**: they are documentation snapshots; the test file `bbnf-equivalence.test.ts` does **NOT** actually execute the BBNF — it only snapshots the hand-written parsers' output and labels the snapshot "BBNF equivalence". The doc claims drift-tracking; the test does no such tracking.

### 5.1 css-values.bbnf — drift items

| Item | BBNF says | Parser does | Drift |
|---|---|---|---|
| `flex` | declared as a top-level alternative in `value` (line 97) | yes, `units.ts` Flex ✓ | none |
| `mathFunction` | enumerates `calc, min, max, clamp, round, mod, rem, abs, sign` (line 78) | `math.ts` adds `sin, cos, tan, asin, acos, atan, atan2, pow, sqrt, hypot, log, exp` + constants `e, pi, infinity, -infinity, NaN` | **YES — 12 functions + 5 constants undocumented in BBNF** |
| `calcExpr` | `/[^)]+/` regex placeholder (line 67) | proper precedence-climbing AST | **structural — BBNF understates** |
| `envFn` | declared (line 82) | NOT implemented in parser (parser only has `var`) | **YES — BBNF over-declares** |
| `attrFn` | declared (line 85) | NOT implemented | **YES — BBNF over-declares** |
| `toggleFn` | declared (line 88) | NOT implemented | **YES — BBNF over-declares** |
| `cssWideKeyword` | 5 keywords (line 62) | matches parser | none |
| transforms / gradients / cubic-bezier / var | NOT in BBNF | full implementations in `index.ts` | **YES — BBNF understates** |
| Container-query units `cqw/cqh/cqi/cqb/cqmin/cqmax` (line 32) | declared | NOT in `LENGTH_UNITS` (verify) | needs spot-check; likely drift |

**Total drift items in css-values.bbnf**: ~5-6 significant.

### 5.2 css-color.bbnf — drift items

| Item | BBNF says | Parser does | Drift |
|---|---|---|---|
| `colorType` | 9 spaces: `oklab, oklch, rgb, hsl, hsv, hwb, lab, lch, xyz` (line 34) | parser has these 9 ✓ | none |
| `colorFn` predefined spaces | 9: `srgb-linear, srgb, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz-d65, xyz-d50, xyz` (line 66) | parser handles all 9 ✓ | none |
| `colorMix` mixSpace | 14 spaces (line 80) | parser `COLOR_MIX_SPACE_MAP` has 14 ✓ | none |
| `lightDark` | declared (line 93) | NOT implemented in parser | **YES — BBNF over-declares** |
| `colorContrast` | declared (line 98) | NOT implemented | **YES — BBNF over-declares** |
| `systemColor` | 19 system colors enumerated (line 110) | parser falls through to `nameParser` (148 named colors) — system colors are NOT a distinct branch; if any system color happens to share a name with a CSS color it'd work, else fail | **YES — BBNF declares; parser does not** |
| `deprecatedSystemColor` | 23 deprecated system colors (line 118) | NOT implemented | **YES** |
| `namedColor` regex `/[a-zA-Z]+/` (line 106) | matches `nameParser` ✓ | none |
| Relative color | declared with custom syntax `<<` / `>>` operators | implemented for the 9 main spaces ✓ | none |
| `kelvin = number , "k"` (line 128) | matches parser ✓ | none |
| Hex `/#[0-9a-fA-F]{3,8}/` (line 61) | matches ✓ | none |
| `componentRef` literal list (line 27) | parser regex `/\b(alpha|r|g|b|h|s|l|c|w|a|x|y|z)\b/` matches ✓ | none |
| `componentExpr` | `calcExpr | none | componentRef | colorValue` (line 29) | parser uses `evaluateSimpleCalc` (see §3.9) — semantically equivalent enough | minor |
| `colorFunction` `<<` / `>>` operators | BBNF uses operators that may or may not be implemented in parse-that's BBNF runtime | n/a (BBNF not executed) | grammar quality |

**Total drift items in css-color.bbnf**: ~4 significant (`lightDark`, `colorContrast`, `systemColor`, `deprecatedSystemColor` all declared but unimplemented).

### 5.3 BBNF-equivalence test misnaming

`test/bbnf-equivalence.test.ts` does NOT compare BBNF parse output vs. hand-written parser output — it only snapshots the hand-written output. The "BBNF Equivalence" naming is **misleading**. Either (a) rename the file, (b) actually wire BBNF parsing into the test, or (c) delete the file. **DOC-DRIFT.**

### 5.4 Total drift

- css-values.bbnf: 5-6 items (envFn, attrFn, toggleFn over-declared; transforms/gradients/cubic-bezier understated; container-query units status TBD).
- css-color.bbnf: 4 items (lightDark, colorContrast, system/deprecatedSystemColor over-declared).
- 1 grammar-runtime-not-executed test (misleading name).

**Total: ~10 drift items + 1 misnamed test.**

---

## §6 The 4 B.W3-committed parsers — per-file readiness verdict

All four committed without tests in value.js's own test suite. Indirect coverage exists in keyframes.js's `test/format.test.ts` (one file) via `resolveKeyframes`.

### 6.1 `parsing/animation-shorthand.ts` (286 LoC)

- **Idiom**: hand-rolled string scanner; does NOT use parse-that combinators. Justified for tokeniser (`tokeniseShorthand`) but `parseSingleAnimation` could have been a `any()` of token-typed parsers.
- **Public surface**: `parseAnimationShorthand`, `reverseAnimationShorthand` — both exported ✓.
- **Spec compliance**: handles duration/delay/iteration-count/direction/fillMode/composition/play-state/timingFunction/name; `play-state` is parsed-then-dropped (line 168-170 — "no AnimationOptions field; ignored"); composition order assumption (first time → duration, second → delay) matches the spec ✓.
- **Issues**:
  - **FE3** (§3.5): unknown tokens silently dropped.
  - DRY: `splitTopLevelCommas` (line 207) + `tokeniseShorthand` (line 11) re-implement the same scanner; could share with `stylesheet.ts`.
  - The `play-state` token is in the spec's grammar but `AnimationOptions` has no field for it — drop or add the field; current silent-discard is half-built.
  - No test coverage in value.js; minimal coverage via keyframes.js's `format.test.ts`.
- **Readiness verdict**: **functional, low risk, untested**. Needs (a) test suite, (b) `play-state` decision (drop or surface), (c) FE3 fix.

### 6.2 `parsing/extract.ts` (200 LoC)

- **Idiom**: pure walk over the `Stylesheet` AST; no parse-that combinators (correct — it's a tree-walker, not a parser). The four extractors (`extractKeyframes`, `extractProperties`, `extractStyleRules`, `extractAnimationOptions`) follow the same shape.
- **Public surface**: all four extractors + `AnimationOptions` type — exported ✓.
- **Spec compliance**: extract semantics straightforward; merging logic for cross-rule animation longhands documented inline (`extract.ts:182-188`).
- **Issues**:
  - **FE2** (§3.4): `tryParseTime`/`tryParseIterationCount` swallow errors silently.
  - `applyLonghand` (line 108) routes `"animation"` shorthand into `parseAnimationShorthand` and only takes the **first** segment (`segs[0]`); the comment acknowledges this. Multi-animation stylesheets reduce to one. Acceptable as a documented limitation but should be flagged.
  - **DRY**: `DIRECTION_VALUES` / `FILL_VALUES` / `COMPOSITION_VALUES` constants (line 84-91) duplicate `DIRECTIONS` / `FILL_MODES` / `COMPOSITIONS` Sets in `animation-shorthand.ts` (line 77-85). Both files import from each other for types but neither shares the constant sets.
  - No tests in value.js.
- **Readiness verdict**: **functional, untested**. Needs (a) tests, (b) FE2 fix, (c) consolidate the constant sets with `animation-shorthand.ts`.

### 6.3 `parsing/serialize.ts` (156 LoC)

- **Idiom**: pure tree-walker → string. No parse-that combinators (correct).
- **Public surface**: `serializeKeyframeSelector`, `serializeDeclaration`, `serializeStylesheetItem`, `serializeStylesheet`, `formatCSS`, `stylesheetToString` — all exported ✓.
- **Spec compliance**: emits standard CSS; comment on line 30-37 documents the keyframe-level `animation-timing-function` hoist (correct per CSS Animations §3).
- **Issues**:
  - **None significant.** This is the cleanest of the four.
  - `formatCSS` uses dynamic `import("prettier")` + `import("prettier/plugins/postcss")` — must be in the consumer's bundle if they call it. The lazy import is correct, but the dependency isn't declared in `package.json` `dependencies` (only `devDependencies` likely — verify). If `formatCSS` is called at runtime in a consumer without prettier installed, it explodes with a non-helpful module-not-found.
  - Round-trip property: not verified. A round-trip test (`parse → serialize → parse` equality) is missing.
- **Readiness verdict**: **functional, low risk, untested round-trip**. Needs round-trip test; verify prettier dependency declaration.

### 6.4 `parsing/stylesheet.ts` (515 LoC)

- **Idiom**: uses parse-that combinators idiomatically PLUS a hand-rolled raw `balancedText` Parser (line 99-181) — justified for CSS's awkward parens/braces/brackets nesting. The `atRule` dispatcher (line 488-495) uses `.chain()` correctly.
- **Public surface**: `parseCSSStylesheet` + 7 types (Stylesheet, StylesheetItem, KeyframeRule, KeyframeSelector, Declaration, PropertyDescriptor) — all exported ✓.
- **Spec compliance**: handles `@keyframes`, `@property` (both with first-class AST); everything else (`@media`, `@supports`, `@font-face`, `@layer`, `@import`) is `kind: "unknown"` with opaque body. Documented limitation. Trailing-content failure on full-input mismatch (line 502-507) is correct ✓.
- **Issues**:
  - **FE1** (§3.3): `parseDeclarationValue` silent string fallback.
  - **ARCHITECTURE**: re-implements a subset of parse-that's own `cssParser`. The built-in covers `@media`/`@supports`/`@font-face`/`@import` with their own ASTs; the local impl reduces them to opaque strings. Worth considering whether to migrate to `cssParser` and ADAPT its output (probably yes, in a future tranche).
  - **DRY**: `splitSelectorList` (line 409) is another copy of the balanced-comma-split scanner.
  - `keyframesBody` (line 360-373): the comment on line 364-366 ("parse-that's `all()` filters out values from `.opt()` that didn't match") is **load-bearing parser behavior** — a sharp edge. If parse-that ever changes `all()` semantics, this breaks silently. Brittle.
  - No tests in value.js; the only test (via keyframes.js's format.test.ts) doesn't exercise the `@property` or unknown-at-rule paths.
- **Readiness verdict**: **functional but brittle, lightly tested**. Needs (a) tests for `@property`/`@media`/`@supports`/unknown at-rules, (b) FE1 fix, (c) docu on the parse-that `all()` semantics dependency.

### 6.5 B.W3 verdict summary

| File | Lines | Idiom | Spec | Tests | Verdict |
|---|---:|---|---|---|---|
| animation-shorthand.ts | 286 | hand-rolled scanner (justified) | mostly ✓ (FE3) | none | **functional, low risk, untested** |
| extract.ts | 200 | tree-walker | ✓ (FE2) | none | **functional, untested** |
| serialize.ts | 156 | tree-walker | ✓ | none (no round-trip) | **functional, low risk, untested round-trip** |
| stylesheet.ts | 515 | combinator + balanced-scanner (justified) | partial (unknown for non-keyframes/property) (FE1) | indirect via keyframes.js | **functional but brittle, lightly tested** |

All four are "shipped" but none have direct value.js test coverage; the implicit policy of "we ship what keyframes.js tests" is fragile.

---

## §7 Prioritized P1/P2/P3

### P1 — fail-explicit violations + correctness bugs

| ID | Site | Fix |
|---|---|---|
| **P1-a** | `stylesheet.ts:212` `parseDeclarationValue` silent string fallback (§3.3, FE1) | distinguish "intentional bottom-out" from "parser failure"; require the consumer to opt into the string-fallback OR add a `diagnostic` field on the declaration |
| **P1-b** | `extract.ts:93,101` `tryParseTime`/`tryParseIterationCount` swallow (§3.4, FE2) | bubble up; let `applyLonghand` decide whether to drop or signal |
| **P1-c** | `animation-shorthand.ts:184` unknown-token drop (§3.5, FE3) | collect unknown tokens, return them on the result; caller decides |
| **P1-d** | `index.ts:251` `ValuesValue` missing `CSSWideKeyword` (§2.5) | add `CSSWideKeyword` as the first arm; align with `Value` on line 235 |
| **P1-e** | `color.ts` case-sensitivity inconsistency (§2.4) | change `string(colorSpace)`→`istring(colorSpace)` in `colorOptionalAlpha` and `relativeColorParser`; same for `math.ts` function-name `string()` calls |
| **P1-f** | `color.ts:78` `evaluateSimpleCalc` dynamic-eval + DRY (§3.9, FE7) | route relative-color `calc(…)` through the existing `parseCSSValue("calc(…)")` + `evaluateMathFunction` pipeline; delete `evaluateSimpleCalc` |
| **P1-g** | `utils.ts:38` `tryParse` discards line/column/expected (§3.6, FE6) | surface `state.expected`, `state.furthest`, derived line/column on the thrown error |

### P2 — DRY + performance hot-spots

| ID | Site | Fix |
|---|---|---|
| **P2-a** | `nameParser` 148-branch `any()` (§4.3, HP3) | replace with `regex(/[a-zA-Z]+/)`+`Map` lookup; or `dispatch` by first letter |
| **P2-b** | Length/Angle/Time per-parse `superType: string[]` alloc (§4.1, HP1) | hoist literals to module-level frozen consts |
| **P2-c** | 14-branch top-level color `Value` `any()` (§2.3) | `dispatch({…})` by first char |
| **P2-d** | 3 hand-rolled balanced-split scanners across `stylesheet.ts`/`animation-shorthand.ts` (§4.5, HP5) | consolidate into one shared helper; consider parse-that's `splitBalanced` |
| **P2-e** | `DIRECTION_VALUES` / `FILL_VALUES` etc. duplicated between `animation-shorthand.ts` and `extract.ts` (§6.2) | extract to a shared constants module |
| **P2-f** | `color.ts:139,395` `?? RGBColor`/`?? "oklab"` silent fallbacks (§3.8, FE4) | replace with `throw new Error(…)` (the parser layer already restricts inputs, so the throw should be unreachable — making the throw correct fail-explicit) |

### P3 — BBNF / tests / docs

| ID | Site | Fix |
|---|---|---|
| **P3-a** | BBNF css-values drift: envFn/attrFn/toggleFn over-declared; transforms/gradients/cubic-bezier understated (§5.1) | bring BBNF in line with parser surface OR explicitly mark BBNF as a CSS-spec snapshot, not a parser-shadow |
| **P3-b** | BBNF css-color drift: lightDark/colorContrast/system colors over-declared (§5.2) | same as above |
| **P3-c** | `bbnf-equivalence.test.ts` doesn't execute BBNF (§5.3) | rename or wire to actual BBNF runtime |
| **P3-d** | B.W3 parsers untested in value.js (§6.5) | direct unit tests for `animation-shorthand`, `extract`, `serialize`, `stylesheet` (round-trip property tests for serialize↔parse) |
| **P3-e** | `serialize.ts` prettier dependency not declared at root `dependencies` (§6.3) | declare prettier in optional/peer deps OR document the lazy-import behaviour |
| **P3-f** | `stylesheet.ts:364` documents the load-bearing `all()`+`.opt()` parse-that semantic (§6.4) | guard with an assertion + a comment that this is the contract |
| **P3-g** | `tryParse` error doesn't include the input fragment around the failure | optional UX nicety after P1-g |
| **P3-h** | Memoize caches unbounded (§4.6, HP4) | bound the cache size OR make it WeakMap-keyed |
| **P3-i** | Consider migrating `stylesheet.ts` to consume parse-that's built-in `cssParser` (§6.4, ARCH) | future-tranche; would unify `@media`/`@supports`/`@font-face`/`@import` ASTs |

---

**Summary metrics**:
- 9 parser TS files, 2 BBNF grammars; 2667 + 235 LoC.
- 7 fail-explicit findings (3 high/medium severity D3 violations).
- 5 allocation/perf hot-spots (1 high: `nameParser` 148-branch fan-out).
- ~10 BBNF drift items + 1 misleadingly-named test.
- 4 B.W3 parsers: all functional, none directly tested in value.js, indirect coverage via keyframes.js for 1 of 4.
