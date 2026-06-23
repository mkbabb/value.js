# O.W0 — The two P0 crashes (linear-gradient + CSS Nesting)

- **Band:** A · **Class:** P0 crash-fix — ships FIRST; unblocks `proof:css-parity` in kf-M.W11
- **Gate (new):** `proof:css-parity` (NEW) — born-RED on today's tree over the REAL runtime
  observables; GREEN only when both crashes are cured and the round-trip assertion holds
- **Folds (lane #):** D8 (P0 linear-gradient, value.js-side fix decision) · D11 (CSS Nesting
  as a comprehensive spec coverage item) · kf-M.W11 (the kf consume-side born-RED gate that
  depends on this wave)
- **Precept cure:** two active P0 crashes + one serialization wrong-output in the published
  0.13.0 surface, confirmed born-RED via `node dist/value.js` on today's tree (2026-06-18)

---

## Context

The campaign blueprint (CONSTELLATION-CAMPAIGN.md §3 O.W0) names two P0 crashes to fix first:

1. **`linear-gradient(red, blue)` throws** — explicit `any()` branches in
   `src/parsing/index.ts:188-207` (`handleGradient`)
2. **CSS Nesting throws** — recursive nested-rule arm absent in
   `src/parsing/stylesheet.ts:501-510` (`stylesheetItem`)

Both are confirmed born-RED on 2026-06-18 HEAD (0.13.0) via `node dist/value.js`:

```
node -e "
const { parseCSSValue, parseCSSStylesheet } = await import('./dist/value.js');
try { parseCSSValue('linear-gradient(red, blue)'); }
catch(e) { console.log('P0-1:', e.constructor.name + ':', e.message); }
try { parseCSSStylesheet('.a { .b { color: red; } }'); }
catch(e) { console.log('P0-2:', e.constructor.name + ':', e.message); }
console.log('Breach 3:', parseCSSValue('linear(0, 0.5 50%, 1)').toString());
"

P0-1: TypeError: t is not iterable
P0-2: Error: Parse error at offset 5: "....a { .b { col..."
Breach 3: linear(0, 0.5, 50%, 1)
```

(No `test/p0-crash-verify.test.ts` file exists; the crashes reproduce directly against the
BUILT `dist/value.js` artifact.)

### Root cause — P0-1: linear-gradient no-direction crash

`handleGradient()` at `src/parsing/index.ts:188-207` builds:

```ts
const linearGradient = all(
    name,
    all(
        any(fromAngle, direction).skip(comma).opt(),  // ← opt() returns undefined
        colorStopList,
    )
    .trim(whitespace)
    .wrap(lparen, rparen)
    .map(([dir, stops]: [any, any]) => {              // ← destructure crash site
        if (!dir) {
            return [stops];
        } else {
            return [dir, ...stops].flat();            // ← TypeError: stops is not iterable
        }
    }),
```

The `all()` combinator in parse-that (verified at
`node_modules/@mkbabb/parse-that/dist/parse.js:550`) silently drops `undefined`
values — `if (state.value !== void 0) { matches.push(state.value) }`. When
`any(fromAngle, direction).skip(comma).opt()` returns `undefined` (no direction
present), `all()` emits `[colorStopList_result]` not
`[undefined, colorStopList_result]`. Destructuring `([dir, stops])` therefore
assigns `dir = colorStopList_result`, `stops = undefined`. The `if (!dir)` branch
is skipped (dir is truthy), and `[dir, ...stops].flat()` throws `TypeError: stops
is not iterable`.

This is the D8-documented `all()` drop-undefined footgun. The fix is NOT to change
parse-that's `all()` global semantics (D8 records that as a cross-consumer ripple);
the fix is VALUE.JS-SIDE: replace the `opt()` pattern with an explicit `any()`
branch that handles the direction-absent case without relying on `all()`'s
undefined-drop.

### Root cause — P0-2: CSS Nesting throws

`stylesheet.ts` line 501 defines `stylesheetItem = any(atRule, styleRule)` where
`styleRule` parses a selector list then a `declarationList` block. A
`declarationList` only parses CSS declarations (`name: value;`); it cannot parse
nested qualified rules (`.b { color: red; }`). When the body of `.a { ... }`
contains `.b { color: red; }`, the `declarationList` parser stops at `.` (not a
valid declaration name start), leaves unconsumed input, and the `stylesheet` full-
input-consumption guard (`src/parsing/stylesheet.ts:503-510`) fires:

```ts
const stylesheet: Parser<Stylesheet> = stylesheetItem.many().trim(ws).skip(
    new Parser((state) => {
        if (state.offset >= state.src.length) return state.ok(null, 0);
        return state.err(undefined as never, 0);  // ← fires on '.b { color:red; }'
    }),
);
```

Per CSS Syntax Level 3 §5.3.5 (Parsing a style block's contents): an invalid
nested rule inside a style block is **ignored** — consumed and discarded — not
fatal. The CSS Nesting spec (CSS Nesting Module Level 1) further requires that a
qualified rule or at-rule nested inside a style block body be parsed as a
`StylesheetItem` (a nested rule), not as a declaration. The fix is to add a
nested-rule arm to the style rule body parser: before `declarationList`, attempt
to match `stylesheetItem` (recursive), and treat any unrecognized content
inside a block as an error-recovery skip rather than a full-parse failure.

---

## Scope

### S1 — P0-1 fixed: `handleGradient` direction-opt rewritten (no `all()` opt-undefined reliance)

**Breach.** `src/parsing/index.ts:188-207` — the `any(fromAngle, direction).skip(comma).opt()`
/ `all(opt, colorStopList)` / `([dir, stops])` destructuring crashes on direction-absent
gradients (`linear-gradient(red, blue)`, `radial-gradient(circle, red, blue)`, etc.).

**Cure.** Rewrite the inner combinator so both branches are EXPLICIT and the destructuring
is sound regardless of direction presence. The canonical fix is to use TWO explicit `any()`
branches in place of the `opt()` + `all()` combination:

```ts
// Option A — explicit any() over two fully-specified alternatives:
const gradientBody = any(
    // branch 1: direction-first (angle OR side-or-corner, then comma, then stops)
    all(
        any(fromAngle, direction).skip(comma.trim(whitespace)),
        colorStopList,
    ).map(([dir, stops]: [any, any[]]) => [dir, ...stops.flat()]),
    // branch 2: stops-only (no direction)
    colorStopList.map((stops: any[]) => stops.flat()),
);
```

This removes the `opt()`/`all()` combination entirely. No `undefined` is ever produced;
the `all()` drop-undefined footgun cannot fire. Both branches produce a
`(ValueUnit | FunctionValue)[]` array — the subsequent `.map(([name, values]) => new
FunctionValue(name, values))` is unchanged.

**Scope constraint.** This S-clause touches ONLY `handleGradient()` in
`src/parsing/index.ts`. The `all()` drop-undefined footgun is recorded as a parse-that
evaluation item per D8 but is NOT fixed globally here — that is parse-that A.W2/A.W3
territory. The localized fix is the KISS choice.

**Falsifiable check.** `parseCSSValue('linear-gradient(red, blue)')` does not throw AND
returns a `FunctionValue` with `name === 'linear-gradient'` and at least two child color
values. Also: `parseCSSValue('linear-gradient(to right, red, blue)')` (the direction-first
form) continues to work — regression absent.

### S2 — P0-2 fixed: CSS Nesting — nested qualified rules inside style block bodies parsed (not fatal)

**Breach.** `src/parsing/stylesheet.ts:501-510` — the `declarationList`-only body parser
for style rules cannot consume nested qualified rules (`.b { }`, `&:hover { }`,
`@media { }` inside a style rule). The full-input-consumption guard turns this into a hard
throw.

**Cure.** Extend the style rule body parser to handle nested structure. The minimal KISS
fix: replace the `declarationList` parser used inside `styleRule` with a
`styleBlockContent` parser that accepts any mix of declarations and nested items:

```ts
// styleBlockContent: a mix of declarations and nested qualified rules / at-rules
const styleBlockContent: Parser<Declaration[]> = Parser.lazy(() =>
    any(
        declaration.map((d) => [d]),          // a CSS declaration → keep
        stylesheetItem.map(() => []),          // a nested rule → parsed, discarded structurally
        balancedText(/* unknown token */        // unrecognized → skip (error recovery)
            (input, i) => input[i] === ";" || input[i] === "}"
        ).skip(semi.opt()).map(() => []),
    ).many().map((groups: Declaration[][]) => groups.flat()),
);
```

The typed `StylesheetItem` AST can be extended in a successor wave (O.W4) to carry nested
rules as a `children` field — that is the FULL nesting AST. O.W0's KISS goal is
**not-fatal**: nested content is parsed successfully without throwing (consumed and
discarded structurally as the CSS Syntax L3 error-recovery spec requires), not yet
represented in the typed output.

**Falsifiable check.** `parseCSSStylesheet('.a { .b { color: red; } }')` does not throw
AND returns a `Stylesheet` with at least one `kind: "style"` item with `selectors` containing
`".a"`. `parseCSSStylesheet('.a { color: blue; }')` (the non-nested form) continues to
work unchanged.

### S3 — `linear()` stop spacing fixed: `FunctionValue.toString()` emits position-hints space-separated

**Breach.** `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` returns
`"linear(0, 0.5, 50%, 1)"` — the position hint `50%` is joined with `", "` instead of
`" "`. Confirmed live on 0.13.0: `node dist/value.js` yields the wrong serialization.
Root: `src/units/index.ts:184` — `FunctionValue.toString()` joins all values with `", "`.
The CSS Easing Functions Level 2 `linear()` grammar specifies that position hints are
space-separated from their stop value (`0.5 50%` not `0.5, 50%`).

**Cure.** A function-name-aware separator path in `FunctionValue.toString()`: when
`this.name === "linear"`, re-join adjacent (value, position-hint) pairs with `" "` and
stop pairs with `", "`. The KISS implementation: check the function name and apply the
correct grouping. No new types, no API surface change.

**Falsifiable check.** `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` ===
`"linear(0, 0.5 50%, 1)"`. The regression guard: `parseCSSValue('linear(0, 1)')
.toString()` === `"linear(0, 1)"` (no position hints — unaffected).

### S4 — Round-trip: all three fixed forms serialize and re-parse without loss

**Breach.** The two crash constructs (Breach 1, 2) produce no output before the fix. The
`linear()` construct (Breach 3) re-parses to the wrong structure.

**Cure.** After all three fixes: for each construct, `parseCSSValue(str).toString()`
produces a string that re-parses to a value that is value-equivalent (same named values,
same structure). Specifically:
- `parseCSSValue('linear-gradient(red, blue)').toString()` → re-parseable
- `parseCSSStylesheet('.a { color: blue; }')` → `[{kind:'style', selectors:['.a'],
  declarations:[{name:'color', ...}]}]` → re-serializable
- `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` → re-parse ≡ parse of original

The full semantic-idempotence invariant (D5) is O.W5's property-based harness; O.W0 only
asserts the three fixed constructs are parse-serialize-reparse stable.

**Falsifiable check.** For each fixed construct: `parseCSSValue(serialize(parseCSSValue(s)))` does
not throw and produces a structurally equivalent result to `parseCSSValue(s)`.

---

## Born-RED gate

**Gate name:** `proof:css-parity` (NEW — `scripts/proof-css-parity.mjs`).
**Tier:** correctness (a real runtime observable over live parse output — no source-shape proxy).

**The REAL observable (inv-M-observable-truth, applied here).** The gate must exercise the
ACTUAL parser over the ACTUAL inputs and assert the ACTUAL outputs — not inspect source text,
not grep for the `opt()` pattern, not check file shapes. A source-grep gate (e.g.
`grep -c "\.opt()" src/parsing/index.ts`) would pass even if the crash persisted behind a
renamed pattern. The gate must run the REAL parser and observe the REAL result.

**Structure.** A vitest test file `test/css-parity.test.ts` (or a node gate
`scripts/proof-css-parity.mjs` that runs vitest programmatically) exercising:

| Clause | Input | Today (born-RED) | After cure (born-GREEN) |
|---|---|---|---|
| C1 — no-throw gradient no-dir | `parseCSSValue('linear-gradient(red, blue)')` | `TypeError: t is not iterable` (confirmed `node dist/value.js`) | does not throw; result is `FunctionValue` |
| C2 — no-throw gradient dir-first | `parseCSSValue('linear-gradient(to right, red, blue)')` | passes (regression guard) | still passes |
| C3 — gradient round-trip | `toString()` of parsed result re-parses without throw | n/a (crashes before) | re-parse succeeds |
| C4 — no-throw CSS nesting | `parseCSSStylesheet('.a { .b { color: red; } }')` | `Error: Parse error at offset 5` (confirmed `node dist/value.js`) | does not throw; result is `Stylesheet` |
| C5 — nesting preserves outer rule | result of C4 has `kind:'style'` item with selector `.a` | n/a (crashes before) | present |
| C6 — non-nested stylesheet unaffected | `parseCSSStylesheet('.a { color: blue; }')` | passes (regression guard) | still passes |
| C7 — gradient family coverage | `parseCSSValue('radial-gradient(circle, red, blue)')` | crashes | does not throw |
| C8 — @keyframes nesting unaffected | `parseCSSStylesheet('@keyframes fade { from { opacity: 0; } to { opacity: 1; } }')` | passes | still passes |
| C9 — `linear()` stop spacing | `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` | `"linear(0, 0.5, 50%, 1)"` (wrong — confirmed `node dist/value.js`) | `"linear(0, 0.5 50%, 1)"` (correct) |
| C10 — `linear()` regression guard | `parseCSSValue('linear(0, 1)').toString()` | passes | still passes |

**Today's tree result.** `proof:css-parity` exits 1 on today's tree: C1 and C4 throw on
the REAL `parseCSSValue`/`parseCSSStylesheet` calls (confirmed via `node dist/value.js`);
C9 fails its strict-equal assertion (`"linear(0, 0.5, 50%, 1)"` ≠ `"linear(0, 0.5 50%, 1)"`
— also confirmed via `node dist/value.js`). C2, C6, C8, C10 pass today (the regression
guards are green). This is the born-RED witness — the gate REDs because the real
observables (C1, C4, C9) are broken on the real parser/serializer.

**Green condition.** All ten clauses pass: the two P0 crashes are cured, the `linear()`
stop-spacing serialization is correct, and none of the regression guards regress. The gate
exits 0.

**Why this is the genuine defect, not a proxy.** C1 and C4 run the real `parseCSSValue`
/ `parseCSSStylesheet` functions over real CSS input strings and observe the real throw.
C9 calls `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` on the real built artifact
and asserts the real serialized string — not a source-grep for the separator literal.
No source-grep, no file-presence check, no AST-shape proxy stands between the gate and
the crash or wrong output. A fix that silences the throw by catching-and-swallowing would
FAIL C3/C5 (the structural assertions). A `FunctionValue.toString()` change that emits
the correct separator only for some inputs would fail C10 (the regression guard). The
gate bites the genuine behavior at all three breach sites.

---

## Fix anatomy (implementation substrate)

These are design notes for the implementer — not the spec itself, which is the S-clauses.

### P0-1 fix site: `src/parsing/index.ts:188-207` (`handleGradient`)

Replace the `any(fromAngle, direction).skip(comma).opt()` + `all()` + `([dir, stops])`
pattern with explicit two-branch `any()`:

```ts
// BEFORE (crashes on direction-absent gradients):
const linearGradient = all(
    name,
    all(
        any(fromAngle, direction).skip(comma).opt(),
        colorStopList,
    )
    .trim(whitespace)
    .wrap(lparen, rparen)
    .map(([dir, stops]: [any, any]) => {
        if (!dir) { return [stops]; }
        return [dir, ...stops].flat();   // ← TypeError when stops is undefined
    }),
);

// AFTER (explicit branches; no opt/undefined):
const gradientBody = any(
    all(
        any(fromAngle, direction).skip(comma.trim(whitespace)),
        colorStopList,
    ).map(([dir, stops]: [any, any[]]) =>
        new ValueArray(dir, ...stops.flat()) // or inline array build
    ),
    colorStopList.map((stops: any[]) =>
        new ValueArray(...stops.flat())
    ),
).trim(whitespace).wrap(lparen, rparen);

const linearGradient = all(name, gradientBody)
    .map(([n, values]: [string, ValueArray]) =>
        new FunctionValue(n, [...values])
    );
```

The exact output shape must match the pre-existing direction-first behavior so consumers
that already work (`linear-gradient(to right, red, blue)`) are unaffected. Adjust the
`ValueArray` / spread to match the existing `FunctionValue(name, values)` constructor
signature.

### P0-2 fix site: `src/parsing/stylesheet.ts` (style rule body + full-input-consumption guard)

Two changes:

1. **Relax the style-rule body parser** to accept nested qualified rules and at-rules via
   a `styleBlockContent` parser (see S2). The content can be treated as `Declaration[]`
   where nested items produce `[]` (structurally consumed, not represented — the O.W4
   nesting AST extends this later).

2. **Reconsider the full-input-consumption guard** at `stylesheet.ts:503-510`. It currently
   fires on ANY unconsumed input — including whitespace after a `}`. Audit whether the guard
   is over-strict for the nesting case; the fix may be that `styleBlockContent` consumes
   everything successfully so the guard never fires, not that the guard itself is removed.
   The guard is CORRECT for the top-level stylesheet; it should NOT fire on valid nested CSS.
   Do NOT remove it — silence the false positive by making the body parser complete.

---

## Dependencies

- **None (value.js-internal, no cross-repo edge).** O.W0 touches only `src/parsing/index.ts`
  and `src/parsing/stylesheet.ts` — two modules with no external-boundary consequence.
- **parse-that A.W0/A.W1 are NOT prerequisites** for this fix. The `all()` drop-undefined
  footgun is a known parse-that behavior that O.W0 works around VALUE.JS-SIDE (D8). The
  parse-that fix, if it ever comes, would be additive compatibility — O.W0's explicit `any()`
  branch approach is correct under both the current and any future `all()` semantics.
- **O.W1/O.W2 (subpath split) are NOT prerequisites.** The fix is in the monolithic
  `src/parsing/index.ts` and does not interact with the subpath architecture.
- **kf-M.W11 (the downstream consumer gate `proof:css-parity`)** depends on this wave:
  once value.js publishes a post-O.W0 build, kf consumes it and the born-RED
  `proof:css-parity` gate on the kf side flips green. The cross-repo edge is:
  `value.js O.W0 publish → kf re-pin → kf proof:css-parity GREEN`.

---

## Excluded from this wave

- **Full CSS Nesting typed AST** (nested rules as `children: StylesheetItem[]` on the
  `style` node) — O.W4 adds the full nesting grammar including typed nested output,
  `@scope`, `@layer`, `@container` recursive bodies.
- **`all()` drop-undefined fix in parse-that** — parse-that A.W2's packrat fix; D8 records
  this as a parse-that evaluation item, not a value.js P0 action.
- **`radial-gradient` / `conic-gradient` full option grammar** — O.W4. O.W0 only fixes the
  crash; a direction-absent radial or conic gradient (S-clause C7) must not throw, but full
  `ellipse`, `at <position>`, `from <angle>` grammar completeness is O.W4.
- **Semantic-idempotence property-based harness** (D5) — O.W5.
- **Any new public API symbols** — O.W0 is bug-fix only; no new exports.
