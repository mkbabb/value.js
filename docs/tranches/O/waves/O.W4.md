# O.W4 — Comprehensive 2026+ grammar (full function support + nesting + Color 4/5 + @function)

- **Band:** C · **Class:** grammar completeness (D11 — "latest + EXPERIMENTAL, each a small
  surgical addition") · **Dep:** O.W0 (the two P0 crashes fixed; nested-rule arm from O.W0
  S2 is the substrate for the full nesting AST delivered here); O.W1 / O.W2 (subpath layout
  stable before grammar symbols are added to the `./parsing` subpath) — implementation order;
  no gate dependency
- **Gate (new):** `proof:grammar-2026` — born-RED on today's tree (each sub-gate is a per-
  feature parse-to-typed-structure AND round-trip assertion over the REAL parser functions)
- **Folds (campaign lanes):** D11 (comprehensive spec coverage, full function support,
  full nesting, Color 4/5, `@property`, `if()`, `@function`, `sibling-index/-count`,
  `contrast-color()`); CONSTELLATION-CAMPAIGN.md §3 O.W4 row; verify-before-fold ledger §6
  (browser-version claims flagged TO-VERIFY — do not assert shipping status; gate the PARSE
  behavior only)
- **Precept cures:** no-legacy (the `kind: "unknown"` opaque fallback is the legacy cop-out
  for every at-rule the parser hasn't typed; each S-clause below replaces a specific opaque
  arm with a typed one), KISS (each feature is ONE surgical addition; the grammar does not
  become a new language)

---

## Context

value.js 0.13.0 parses a wide CSS surface but has several systematic gaps where the parser
falls back to an opaque string or throws:

1. **Value functions** — `calc()`, `clamp()`, `min()`, `max()`, `round()`, `mod()`, `rem()`,
   `abs()`, `sign()`, trig functions (`sin()`, `cos()`, `tan()`, `asin()`, `acos()`,
   `atan()`, `atan2()`), and exponential functions (`pow()`, `sqrt()`, `hypot()`, `log()`,
   `exp()`) are ALL **fully implemented** in `createMathFunctionParsers`
   (`src/parsing/math.ts:136-221`), with 57 passing tests (`test/math-functions.test.ts`).
   The remaining gaps are the **inline conditional** `if()` and the **custom function at-rule**
   `@function` — those are the genuine born-RED items (S6 + S7 below).

2. **Color functions** — `color-mix()` is **fully implemented** in `src/parsing/color.ts`
   (lines 406–504), including the `colorMixHueMethod` parser at lines 426–433 that handles
   `shorter`/`longer`/`increasing`/`decreasing hue`. `light-dark()` — verify current parse
   behavior (listed in N.W7 as a "sentinel" item; may or may not have a typed arm in
   `src/parsing/color.ts` — gate the round-trip either way). `contrast-color()` status is
   TO-VERIFY (caniuse — Chrome 147 EXPERIMENTAL per the campaign §6 list; gate the PARSE
   behavior only, not the browser shipping state).

3. **`if()`** — CSS Values Level 5 inline conditional (`if(<condition>: <value>; else:
   <value>)`) — no consumer in `src/parsing/index.ts` today; parses as a generic
   `FunctionValue` at best.

4. **`@function`** — CSS Functions and Mixins Level 1 (`@function --my-fn(...) { result: ...; }`)
   — not in `stylesheet.ts`'s at-rule dispatcher; falls through to `kind: "unknown"`. Chrome
   141+ per campaign §6 TO-VERIFY.

5. **Recursive at-rule bodies** — `@media`, `@layer`, `@container`, `@scope`,
   `@starting-style`, `@supports` all capture their body as an opaque `body: string` in the
   current `unknownBody` fallback (`stylesheet.ts:471-485`). An `@layer` that wraps a
   `@keyframes` block makes `extractKeyframes` invisible to the outer `@layer` body — the
   kf consumer cannot find `@keyframes fade {}` nested inside `@layer base {}`. This is a
   live gap: keyframes.js `CSSKeyframesAnimation.fromString()` passes CSS through
   `parseCSSStylesheet` → `extractKeyframes`; if the `@keyframes` is inside an `@layer`,
   it is silently lost.

6. **CSS Nesting AST** — O.W0 made nesting NOT-FATAL (nested rules are consumed and
   discarded as `[]`). O.W4 promotes the nested rules to typed `children: StylesheetItem[]`
   on the `style` node, completing the representation.

7. **Color 4/5 additions** — `oklch-interpolation-method`, `hue-shorter/longer/increasing/
   decreasing` within `color-mix()`, P3/Rec2020 predefined spaces in `color()` — partially
   handled; gate coverage needed.

8. **`@property` extensions** — `syntax: "<color>"`, `inherits: true|false`,
   `initial-value: ...` — already parsed (`stylesheet.ts:378-407`). Gap: the `syntax`
   descriptor accepts a more complex grammar in CSS Properties and Values API Level 1. Gate
   the round-trip for the common cases.

9. **System colors** — `Canvas`, `ButtonText`, `CanvasText`, `LinkText`, `VisitedText`,
   `ActiveText`, `ButtonFace`, `ButtonBorder`, `Field`, `FieldText`, `Highlight`,
   `HighlightText`, `SelectedItem`, `SelectedItemText`, `Mark`, `MarkText`, `GrayText`,
   `AccentColor`, `AccentColorText` plus the legacy set — may fall through to `CSSString`
   (no type tag); gate the named-color parse.

10. **`sibling-index()` / `sibling-count()`** — CSS Values Level 5 tree-counting functions
    (`n`th-position of an element among its siblings). Status TO-VERIFY (Chrome/Firefox
    shipping state as of 2026-06-18). Gate only the parse-to-typed-structure behavior.

11. **`@scope`** — CSS Cascading Level 6 `@scope (.root) to (.limit) { ... }` — parses as
    `kind: "unknown"` today; the body is opaque. A typed arm extracts the selector pairs and
    the contained style rules.

12. **`@starting-style`** — CSS Transitions Level 2 (`@starting-style { selector { ... } }`)
    — parses as `kind: "unknown"`; body opaque.

---

## Scope

Each S-clause is a concrete, falsifiable deliverable. Each adds ONE typed construct;
together they constitute `proof:grammar-2026` GREEN.

### S1 — Math function roster: ALREADY IMPLEMENTED (gate-only; verify coverage)

**Status.** `round()`, `mod()`, `rem()`, `abs()`, `sign()`, all trig functions (`sin`,
`cos`, `tan`, `asin`, `acos`, `atan`, `atan2`), and exponential functions (`pow`, `sqrt`,
`hypot`, `log`, `exp`) are **fully implemented** in `src/parsing/math.ts:136-221`
(`createMathFunctionParsers` — the `allMathFunctions` combinator at lines 200–223). The
`round()` optional strategy (`nearest`/`up`/`down`/`to-zero`) is implemented at lines
136–154. 57 tests in `test/math-functions.test.ts` pass on today's tree — verified.

**No cure required in S1.** The gate clauses C1–C3 (see Born-RED gate section) are
**NOT born-RED** for the math functions; they are already green. S1's deliverable is
reduced to: add ROUND-TRIP assertions for each function to `test/grammar-2026.test.ts`
(C17 covers the round-trip invariant; the per-function parse shape is covered by
`math-functions.test.ts`).

**Falsifiable check (gate-only).** `parseCSSValue('round(25px, 5px)')`,
`parseCSSValue('abs(-5px)')`, etc. each return a `FunctionValue` with the correct `.name`
and children on today's tree — confirmed by the 57 passing math-functions tests. The
`test/grammar-2026.test.ts` C1–C3 clauses MUST be authored as already-green assertions
(born-GREEN on today's tree) — do not flip them born-RED. The genuine born-RED math-related
gates are S6 (`if()`) and S7 (`@function`) below.

### S2 — `color-mix()` hue interpolation: ALREADY IMPLEMENTED (gate-only)

**Status.** `color-mix()` with full `in <colorspace> [<hue-method>]?` grammar is
**fully implemented** in `src/parsing/color.ts:406-504`. The `colorMixHueMethod` parser
at lines 426–433 handles `shorter`/`longer`/`increasing`/`decreasing hue`. The optional
`<percentage>` per color stop is parsed at lines 435–440. The `colorMix` combinator at
lines 442–504 wires these together. This is born-GREEN on today's tree.

**No cure required.** S2's deliverable is reduced to: add round-trip gate assertions for
`color-mix()` in `test/grammar-2026.test.ts` (C4 and C5 in the born-RED gate table, which
must be authored as already-GREEN assertions against the current parser).

**Falsifiable check (gate-only).**
```
parseCSSValue('color-mix(in oklch, red, blue)')
// → already returns a typed Color value (the color-mix parser produces a Color, not a
//   raw FunctionValue — verify the exact return shape in color.ts:468-504)

parseCSSValue('color-mix(in oklch shorter hue, red 30%, blue 70%)')
// → already parsed with hue method present — confirm round-trip
```
Round-trip: `toString()` re-parses to the same structure. Gate the specific serialized
form to lock the canonical output.

### S3 — `light-dark()` typed (sentinel value for system-scheme)

**Breach.** `light-dark(white, #1a1a1a)` — verify current parse behavior in
`src/parsing/color.ts`. If it already parses, gate the round-trip; if it falls through,
add the typed arm.

**Cure.** Add a `light-dark()` parser to `color.ts` that accepts two `<color>` arguments
and emits `FunctionValue("light-dark", [lightColor, darkColor])`. This is a two-argument
color function; the argument grammar reuses the existing color parser.

**Scope constraint.** value.js does NOT resolve `light-dark()` against the system color
scheme — that is a rendering concern (TIME / environment). The parser emits the VALUE
VERBATIM; the caller (keyframes.js or a browser) resolves it at render time. Division-of-
labour law (stated at `scroll-timeline.ts:24-25`).

**Falsifiable check.**
```
parseCSSValue('light-dark(white, #1a1a1a)')
// → FunctionValue("light-dark", [whiteColor, darkColor])
```
Round-trips without structural loss.

### S4 — `contrast-color()` typed (TO-VERIFY shipping status)

**Status:** `contrast-color()` shipping state is TO-VERIFY (campaign §6: "Chrome 147 EXPERIMENTAL").
The gate asserts the PARSE behavior only — NOT that browsers ship it. The implementation
adds the typed arm to `color.ts` regardless of shipping status (it is EXPERIMENTAL CSS that
value.js can accept and round-trip; consumers that receive it decide what to do with it).

**Breach.** `contrast-color(white)` and `contrast-color(#123456 vs. black white)` — both
should return a typed `FunctionValue`. Verify current behavior.

**Cure.** Add `contrast-color()` parser accepting:
- `contrast-color(<color>)` — single-argument form (returns the accessible contrast color
  against the UA-determined background; implementation note: value.js emits VERBATIM)
- `contrast-color(<color> vs <color> <color>)` — explicit comparison form (Chrome 147+)

Emit `FunctionValue("contrast-color", [...args])`.

**Falsifiable check.** Both forms parse to `FunctionValue("contrast-color", ...)`. Round-
trips. The gate does NOT assert any computed contrast value — that is a rendering concern.

### S5 — `sibling-index()` and `sibling-count()` typed (TO-VERIFY shipping status)

**Status:** Shipping state TO-VERIFY. Gate asserts parse behavior only.

**Breach.** `sibling-index()` and `sibling-count()` — both zero-argument functions. Verify
current behavior: likely parse to `FunctionValue("sibling-index", [])` via the generic
`handleFunc()` fallback — if so, the parse works but the round-trip needs a dedicated test.
If they throw, a typed arm is needed.

**Cure.** If the generic fallback handles them, the cure is to add round-trip assertions only
(they already produce `FunctionValue` with the correct name). If they throw, add explicit
istring arms in `src/parsing/index.ts`'s `Function_` parser.

**Falsifiable check.**
```
parseCSSValue('sibling-index()')
// → FunctionValue("sibling-index", []) — no throw
parseCSSValue('sibling-count()')
// → FunctionValue("sibling-count", []) — no throw
```
Round-trips.

### S6 — `if()` typed (CSS Values Level 5 inline conditional)

**Status:** `if()` is an EXPERIMENTAL CSS feature (CSS Values Level 5). Chrome 117+ for
early spec iterations; the current spec shape (`if(<condition>: <value>; else: <value>)`)
is still evolving. Gate asserts the PARSE behavior for the CURRENT spec syntax; mark the
clause as TO-VERIFY against the latest CSS Values L5 editor's draft.

**Breach.** `if(style(--theme: dark): black; else: white)` — verify current parse. Likely
falls through to generic `handleFunc()` or `CSSString`. The colon-separated `<condition>:
<consequent>` syntax is NOT a standard function argument list; generic `FunctionArgs`
(comma-separated `Value.sepBy(any(comma, whitespace))`) will fail to parse it.

**Cure.** Add a dedicated `if()` parser in `src/parsing/index.ts`'s `Function_` dispatch
BEFORE the generic `handleFunc()` fallback. The parser:
1. Consumes the `if(` token.
2. Uses `balancedText` (the `stylesheet.ts` scanner — import it or replicate the pattern)
   to capture the raw body up to `)`.
3. Splits the body on `;` into `condition-branch` + `else-branch` segments.
4. Emits `FunctionValue("if", [conditionString, valueString, elseString])` where the
   three strings are the raw text of each clause (VALUE VERBATIM — no conditional evaluation).

The division-of-labour law: value.js emits the condition VERBATIM. It does NOT evaluate the
condition or resolve the result. The consumer (a browser or keyframes.js future conditional
layer) resolves the condition against a live computed style.

**Scope.** Single-level `if()` only. Nested `if()` inside a condition value re-enters the
same parser recursively via the `balancedText` delimiter counting (the `if(` token inside
a condition sub-expression does not confuse the outer paren tracker).

**Falsifiable check.**
```
parseCSSValue('if(style(--theme: dark): black; else: white)')
// → FunctionValue("if", ["style(--theme: dark)", "black", "white"])
```
Round-trips: `toString()` re-parses to the same FunctionValue.

### S7 — `@function` typed at-rule (CSS Functions and Mixins Level 1)

**Status:** TO-VERIFY Chrome 141+ EXPERIMENTAL. Gate asserts the PARSE behavior.

**Breach.** `@function --double(--x: <length>) { result: calc(var(--x) * 2); }` — the
current `stylesheet.ts` at-rule dispatcher (`atRule`) routes `@function` through `unknownBody`
(the generic opaque catch-all), producing `kind: "unknown", atName: "function", body: "..."`.
The typed surface loses the function name, parameter list, and result body.

**Cure.** Add a `functionBody` parser to `stylesheet.ts` alongside `keyframesBody` and
`propertyBody`:

```ts
export type CustomFunctionDescriptor = {
    parameters?: Array<{ name: string; type?: string; defaultValue?: string }>;
    result?: ValueArray;
    declarations?: Declaration[];
};

// StylesheetItem gains a new variant:
// | { kind: "function"; name: string; descriptor: CustomFunctionDescriptor }
```

The `functionBody` parser:
1. Captures the `--function-name` (`customPropertyName`).
2. Parses `(` ... `)` parameter list: `<dashed-ident>: <syntax>` pairs, comma-separated,
   optional defaults.
3. Parses the block body as a `declarationList` (the same pattern as `@property`), hoisting
   a `result:` declaration into `descriptor.result` (CSS Functions Level 1 §4.4 — `result`
   is a special descriptor, not a general declaration).
4. Emits `{ kind: "function", name: "--double", descriptor: { parameters: [...], result: ... } }`.

Add `"function"` to the at-rule dispatcher switch.

**Falsifiable check.**
```
parseCSSStylesheet(`@function --double(--x: <length>) { result: calc(var(--x) * 2); }`)
// → [{ kind: "function", name: "--double", descriptor: { ... } }]
```
Round-trips: re-parsing the serialized form yields the same structure.

### S8 — Recursive at-rule bodies: `@layer`, `@media`, `@container`, `@scope`, `@starting-style`

**Breach.** The `unknownBody` parser (`stylesheet.ts:471-485`) captures the body of any
unrecognized at-rule (including `@layer`, `@media`, `@container`, `@scope`,
`@starting-style`) as a raw `body: string`. This means:

1. `extractKeyframes` called on a Stylesheet containing `@layer base { @keyframes fade { ... } }`
   returns an empty Map — the `@keyframes fade` block is inside the opaque `body: string`
   of the `@layer`, invisible to the extractor.
2. No nested `@property` or nested `@function` is visible to the typed extractors.

This is a live kf gap: `CSSKeyframesAnimation.fromString()` passes user CSS through
`parseCSSStylesheet` → `extractKeyframes`. If the user writes:
```css
@layer base {
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
}
```
…the keyframe is silently lost.

**Cure.** Extend `StylesheetItem` with `children: StylesheetItem[]` on the `unknown` kind
(or promote the common at-rules to typed variants). The KISS fix without new typed variants:
change the `unknown` item's `body` from a raw string to a `children: StylesheetItem[]`
(recursively parsed). The `unknownBody` parser replaces `blockBody.wrap(...)` with a
recursive `stylesheetItem.many().trim(ws).wrap(...)` for the block body case.

**CRITICAL — init-order:** In `stylesheet.ts`, `unknownBody` is defined at line 471 and
`stylesheet` at line 503 — `stylesheet` is NOT yet in scope when `unknownBody` executes.
Any direct reference to `stylesheet` inside `unknownBody` is a JavaScript temporal dead
zone ReferenceError. The recursive call MUST be wrapped with `Parser.lazy(() => ...)` to
defer resolution until runtime (when `stylesheet` is defined). Use `stylesheetItem`
(defined at line 501, also after `unknownBody`) via the same lazy wrapper, or factor the
recursion through a shared lazy ref:

```ts
// At the top of the stylesheet module, declare a lazy ref for the recursive call:
const lazyStylesheetItems: Parser<StylesheetItem[]> = Parser.lazy(
    () => stylesheetItem.many().trim(ws),
);

// unknownBody (revised) — uses lazyStylesheetItems, NOT the bare `stylesheet` name:
all(
    atRulePrelude.map((s) => s.trim()),
    any(
        semi.map(() => ({ kind: "empty" as const })),
        // For block bodies: parse recursively via the lazy ref
        lazyStylesheetItems.wrap(lcurly.trim(ws), rcurly.trim(ws))
            .map((children) => ({ kind: "block" as const, children })),
    ),
).map(([prelude, bodyPart]) => ({
    kind: "unknown" as const,
    atName,
    prelude,
    body: bodyPart.kind === "empty" ? null : undefined,
    children: bodyPart.kind === "block" ? bodyPart.children : undefined,
}))
```

The `Parser.lazy(() => ...)` pattern is already used throughout `stylesheet.ts` and
`math.ts` (e.g. `Parser.lazy(() => calcValue)` in math.ts:49) — this is the established
idiom for forward references in the combinator graph.

**Type change.** `StylesheetItem`'s `kind: "unknown"` gains an optional
`children?: StylesheetItem[]`. The `body: string | null` field remains for the semicolon
form; for the block form, `body` becomes `undefined` and `children` carries the parsed
sub-items.

**Backward compatibility.** All existing consumers that check `kind === "unknown"` and
read `body` continue to work: `body` is still present (as `undefined` for block bodies;
`null` for semicolon bodies). The `children` field is new and optional.

**`extractKeyframes` update.** `src/parsing/extract.ts:extractKeyframes` gains a recursive
arm: if an item is `kind === "unknown"` and has `children`, walk the children recursively
for `kind === "keyframes"` items. This closes the kf gap: `@layer base { @keyframes fade { ... } }`
→ `extractKeyframes` finds `"fade"`.

**Falsifiable check.**
```
parseCSSStylesheet('@layer base { @keyframes fade { from { opacity: 0; } to { opacity: 1; } } }')
// → [{ kind: "unknown", atName: "layer", prelude: "base",
//      children: [{ kind: "keyframes", name: "fade", rules: [...] }] }]

// And:
extractKeyframes(parseCSSStylesheet('@layer base { @keyframes fade { from { opacity: 0; } to { opacity: 1; } } }'))
// → Map { "fade" => [...rules] }
```
Round-trips: re-parsing the serialized form yields the same nesting structure.

### S9 — Full CSS Nesting typed AST (`style` node gains `children: StylesheetItem[]`)

**Breach.** O.W0 S2 made nesting not-fatal by consuming nested qualified rules and
discarding them as `[]`. The `style` node's `declarations` field does not represent the
nested rules; a consumer walking the Stylesheet cannot reach `inner { color: red; }` inside
`.outer { inner { color: red; } }`.

**Cure.** Extend `StylesheetItem`'s `kind: "style"` with:
```ts
| {
    kind: "style";
    selectors: string[];
    declarations: Declaration[];
    children?: StylesheetItem[];   // NEW — nested qualified rules and at-rules
  }
```

Revise the `styleBlockContent` parser (introduced by O.W0 S2) to collect parsed
`stylesheetItem` results into the `children` array instead of discarding them.

**Scope.** `children` is optional to preserve backward compatibility. Existing consumers
that read `kind: "style"` and walk `declarations` are unaffected. The nesting depth is
bounded by the `Parser.lazy` recursion (the same depth the `stylesheet.many()` recursion
imposes — a style block that nests another style block re-enters `stylesheetItem` lazily).

**Falsifiable check.**
```
parseCSSStylesheet('.outer { color: blue; .inner { color: red; } }')
// → [{
//     kind: "style",
//     selectors: [".outer"],
//     declarations: [{ name: "color", value: ..., important: false }],
//     children: [{ kind: "style", selectors: [".inner"], declarations: [...] }]
//   }]
```
The outer `declarations` contains only `color: blue`; the inner rule is in `children`.

### S10 — `@scope` typed at-rule

**Cure.** Add a `scopeBody` parser to `stylesheet.ts`:

```ts
export type ScopeItem = {
    kind: "scope";
    root?: string[];      // the (<scope-start>) selector list, if present
    limit?: string[];     // the to (<scope-end>) selector list, if present
    children: StylesheetItem[];
};
```

`@scope (<root>) to (<limit>) { ... }` → parse the optional selector pairs and the block
body recursively (the same recursive `stylesheet.many()` pattern as S8).

Add `"scope"` to the at-rule dispatcher; promote the new kind into `StylesheetItem`.

**Falsifiable check.**
```
parseCSSStylesheet('@scope (.card) to (.footer) { p { color: blue; } }')
// → [{ kind: "scope", root: [".card"], limit: [".footer"],
//      children: [{ kind: "style", selectors: ["p"], ... }] }]
```

### S11 — `@starting-style` typed at-rule

**Cure.** Add a `startingStyleBody` parser to `stylesheet.ts`:

```ts
// StylesheetItem gains:
// | { kind: "starting-style"; children: StylesheetItem[] }
```

`@starting-style { selector { declarations } }` — the block body is a stylesheet; parse
recursively. Add `"starting-style"` to the at-rule dispatcher.

**Falsifiable check.**
```
parseCSSStylesheet('@starting-style { .box { opacity: 0; } }')
// → [{ kind: "starting-style",
//      children: [{ kind: "style", selectors: [".box"], declarations: [...] }] }]
```

### S12 — System colors typed (named color fallback tag)

**Breach.** System color keywords (`Canvas`, `ButtonText`, `CanvasText`, etc.) may fall
through to `CSSString` (unit: `"string"`, no `"system-color"` tag) — verify by running
`parseCSSValue('Canvas')` and checking the returned `ValueUnit.unit`.

**Cure.** Add a `systemColor` parser to `src/parsing/color.ts` or `src/parsing/units.ts`
that recognizes the complete CSS system color set (CSS Color 4 §6 + legacy `ButtonHighlight`,
`ButtonShadow`, `ThreeDDarkShadow`, etc.). Emit `new ValueUnit(name.toLowerCase(), "system-color")`.
Integrate into the color value parser so `color: Canvas` in a `Declaration` value is tagged
as a system color rather than a bare string.

**Scope.** value.js does NOT resolve system colors to RGB at parse time — that is a
rendering concern. The parser emits the name VERBATIM with the `"system-color"` unit tag.

**Falsifiable check.**
```
parseCSSValue('Canvas')     // → ValueUnit("Canvas", "system-color")
parseCSSValue('ButtonText') // → ValueUnit("ButtonText", "system-color")
parseCSSValue('GrayText')   // → ValueUnit("GrayText", "system-color")
// Legacy:
parseCSSValue('ButtonHighlight') // → ValueUnit("ButtonHighlight", "system-color")
```
Round-trips: `toString()` → `"Canvas"` (lowercase-normalized or original — commit to ONE
form and gate it).

---

## Born-RED gate

**Gate name:** `proof:grammar-2026` (NEW — `test/grammar-2026.test.ts`).
**Tier:** correctness (runs over the REAL parse functions; no source-shape proxy).

**The REAL observable (per inv-M-observable-truth).** Each clause calls the REAL
`parseCSSValue` / `parseCSSStylesheet` / `extractKeyframes` with a REAL CSS input string and
asserts the REAL typed output. A source-grep gate (e.g. checking that `"round"` appears in
`math.ts`) would pass even if the parser still returned `CSSString` for `round()`. The gate
must run the parser and read the result.

**Structure.** One vitest test file `test/grammar-2026.test.ts`:

| Clause | Input | Today (born-RED?) | After cure |
|---|---|---|---|
| C1 — `round()` | `parseCSSValue('round(25px, 5px)')` | **ALREADY GREEN** — implemented in math.ts:136-221; 57 passing tests | stays `FunctionValue("round", [25px, 5px])` |
| C2 — `mod()`/`rem()` | `parseCSSValue('mod(18, 5)')` | **ALREADY GREEN** — same roster | stays `FunctionValue("mod", ...)` |
| C3 — `abs()`/`sign()` | `parseCSSValue('abs(-5px)')` | **ALREADY GREEN** — same roster | stays `FunctionValue("abs", ...)` |
| C4 — `color-mix()` method | `parseCSSValue('color-mix(in oklch, red, blue)')` | **ALREADY GREEN** — implemented in color.ts:406-504 | verify exact return shape + round-trip |
| C5 — `color-mix()` hue | `parseCSSValue('color-mix(in oklch shorter hue, red 30%, blue)')` | **ALREADY GREEN** — colorMixHueMethod parser at color.ts:426-433 | verify round-trip |
| C6 — `light-dark()` | `parseCSSValue('light-dark(white, #1a1a1a)')` | verify today (may be present — check color.ts) | `FunctionValue("light-dark", ...)` or already green |
| C7 — `contrast-color()` | `parseCSSValue('contrast-color(white)')` | likely born-RED (throws or `CSSString`) | `FunctionValue("contrast-color", ...)` (TO-VERIFY browser support) |
| C8 — `sibling-index()` | `parseCSSValue('sibling-index()')` | verify today (generic handleFunc may pass) | `FunctionValue("sibling-index", [])` |
| C9 — `if()` | `parseCSSValue('if(style(--t: dark): black; else: white)')` | **born-RED** — parse fail or opaque | `FunctionValue("if", [...])` |
| C10 — `@function` | `parseCSSStylesheet('@function --dbl(--x: <length>) { result: calc(var(--x)*2); }')` | **born-RED** — `kind: "unknown"` | `kind: "function"` |
| C11 — `@layer` recursion | `parseCSSStylesheet('@layer base { @keyframes fade { from { opacity: 0; } } }')` | **born-RED** — keyframe in opaque body | `children: [kind:"keyframes", name:"fade", ...]` |
| C12 — `extractKeyframes` depth | `extractKeyframes(parseCSSStylesheet(...))` on a `@layer`-wrapped `@keyframes` | **born-RED** — Map empty | Map has `"fade"` key |
| C13 — nesting AST | `parseCSSStylesheet('.a { color: blue; .b { color: red; } }')` | **born-RED** — `children` absent | `children: [{kind:"style", selectors:[".b"], ...}]` |
| C14 — `@scope` | `parseCSSStylesheet('@scope (.card) { p { color: blue; } }')` | **born-RED** — `kind: "unknown"` | `kind: "scope"` |
| C15 — `@starting-style` | `parseCSSStylesheet('@starting-style { .box { opacity: 0; } }')` | **born-RED** — `kind: "unknown"` | `kind: "starting-style"` |
| C16 — system color | `parseCSSValue('Canvas')` | verify today (may fall to `"string"` unit) | `ValueUnit("Canvas", "system-color")` |
| C17 — round-trip each | Each of C6–C16 (the genuine gaps): `parse(serialize(parse(s)))` ≡ `parse(s)` | n/a where crashes | passes for each |

**Today's tree result.** `proof:grammar-2026` exits 1 on today's tree: the definite reds
are C9 (`if()` parse fails), C10 (`@function` → `kind: "unknown"`), C11 + C12 (the
`@layer`-wrapped `@keyframes` is silently lost), C13 (no `children` on the style node),
C14 (`@scope` opaque), and C15 (`@starting-style` opaque). C1–C5 are **already GREEN**
(math roster and color-mix fully implemented — verified against source and 57 passing
math-functions tests). C6, C7, C8, C16 must be verified against current source before
asserting born-RED — the gate-authors use the verify-before-fold discipline and mark each
clause's CURRENT state (green or red) before flipping.

**Green condition.** All 17 clauses pass on the post-O.W4 tree.

**Why this is the genuine defect, not a proxy.** C11 + C12 together: `parseCSSStylesheet`
over a real `@layer`-wrapped `@keyframes` string, then `extractKeyframes` called on the
result — the consumer returns an empty Map where the user's animation name should appear.
This is a behavior fault with a directly observable consequence in keyframes.js
(`CSSKeyframesAnimation.fromString()` silently produces an empty animation). No source-grep
catches this; only running the real extract pipeline does.

---

## Dependencies

- **O.W0 (the P0 crashes + `styleBlockContent` nesting not-fatal)** — O.W0 S2 is the
  substrate for S9 (the full nesting AST): the `styleBlockContent` parser that O.W0 added
  to make nesting not-fatal is extended here to emit `children` instead of discarding.
  O.W4 MUST NOT be implemented before O.W0; the `styleBlockContent` body of O.W0 is the
  departure point for S9.
- **O.W1 / O.W2 (subpath pre-work + exports map)** — no gate dependency; O.W4's new
  grammar symbols land in `src/parsing/` (the `./parsing` subpath). The O.W2 exports map
  must include `./parsing` in its multi-entry set, so the subpath build picks up O.W4
  additions automatically once O.W2 lands. Author O.W4 in the monolithic src; O.W2's build
  makes it available as a subpath consumer.
- **parse-that A.W1 (CSS parser removal)** — NOT a prerequisite. The D2/D3 parse-that CSS
  parser removal is a separate subtraction. O.W4 builds only on parse-that's CORE
  combinator surface (the same `all`, `any`, `regex`, `string`, `whitespace`, `Parser.lazy`
  that `stylesheet.ts` already uses). No new parse-that API is required.
- **O.W5 (semantic-idempotence harness)** — C17 in this wave's gate is a per-construct
  round-trip (not the full property-based fuzz). O.W5 authors the comprehensive fuzz harness
  over the whole grammar; O.W4's C17 is a targeted pre-check that each new construct's
  `toString()` is re-parseable.

---

## DAG position

```
O.W0 (P0 crashes + not-fatal nesting) ──► O.W4 (full nesting AST S9; recursive bodies S8)
O.W1/O.W2 (subpath) ──────────────────► O.W4 (grammar symbols land in ./parsing subpath)
                                             │
                                             ▼
                        kf-M.W9/W10 (consume: @layer-wrapped @keyframes now findable via
                                     extractKeyframes depth-walk)
                        O.W5 (full idempotence harness over O.W4 constructs)
```

O.W4 is parallel to O.W3 (zero-alloc) — they touch disjoint modules. O.W4 is parallel to
O.W4b (scroll grammar) — they are in disjoint files (`parsing/index.ts` + `stylesheet.ts`
vs `parsing/scroll-timeline.ts`). O.W4 precedes O.W5 (the idempotence harness fuzz-tests
the O.W4 constructs) and O.W6 (the SOTA-perf wave — any hot-path grammar scanner benefits
from the completed roster).

---

## Excluded from this wave

- **The full CSS Custom Properties Level 2 `syntax` grammar** — `@property`'s `syntax`
  descriptor today accepts a raw string (`"<color>"`, `"<length>"`). Parsing the full
  `<syntax-component>` grammar tree is CSS Properties and Values API Level 2 territory. O.W4
  gates the common string-form cases; the typed syntax grammar is O.W5 or later.
- **`color()` with author-defined color spaces** — `color(--my-space 1 2 3)` where
  `--my-space` is a custom `@color-profile` at-rule. The predefined color-space extensions
  (`display-p3`, `rec2020`, `a98-rgb`, `prophoto-rgb`, `srgb`, `srgb-linear`, `xyz-d65`,
  `xyz-d50`) are already handled by value.js's color parser (verify coverage in C4 gate).
  Author-defined spaces are out of scope — no browser ships this.
- **`@counter-style`** — CSS Counter Styles Level 3; consumer demand is low; deferred.
- **`@font-face`, `@font-feature-values`** — currently captured as `kind: "unknown"`;
  their descriptor grammar is distinct from general declarations. Deferred to a later wave.
- **`@layer import` with conditions** — `@layer base;` (empty prelude form) and
  `@import url(...) layer(base)` — the import form lives in a separate `<import-condition>`
  grammar; out of O.W4 scope.
- **Selector grammar completeness** — `:has()`, `:is()`, `:where()`, `:not()`, nesting
  `&` combinator, `:nth-child(... of <selector>)` — these are selector syntax, not value
  syntax. The stylesheet parser captures selectors as opaque strings; a typed selector AST
  is a separate feature request, not part of this wave.
- **`@view-transition`** — CSS View Transitions Level 2. The at-rule captures `name`,
  `navigation`, `types` descriptors. Deferred — grammar simple but consumer demand not yet
  established.
- **`@anchor-positioning`** — CSS Anchor Positioning Level 1 value grammar. The
  `anchor()`, `anchor-size()` functions and `position-area` property. Deferred as a
  grammar-completeness sweep item (can be added in a follow-on S-clause with a per-feature
  born-RED).
- **CSS Conditionals `@supports selector()` / `@supports font-format()`** — `@supports`
  is currently captured opaquely. Typed extraction is deferred; the recursive body parse
  from S8 makes the `@supports` body's `@keyframes` findable via `extractKeyframes` once
  S8 lands, which is the kf-critical gap.
