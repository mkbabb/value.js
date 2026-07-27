# GROUND-B — what "idiomatic parse-that" actually means

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context seat), running as a
subagent of the mega-tranche parser band. Every measurement below was produced by running
code in this session; nothing is quoted from a prior report.

---

## §0 · Method, and what is actually deliverable here

**Sources read (READ-ONLY, never written):**
`/Users/mkbabb/Programming/parse-that/typescript/src/parse/` — `parser.ts` (708 lines),
`leaf.ts`, `lazy.ts`, `packrat.ts`, `state.ts`, `utils.ts`, `core.ts`, `index.ts`; the
author's own domain parsers `parsers/json.ts`, `parsers/csv.ts`, `parsers/utils.ts`; and
the tests `test/math.test.ts`, `test/memoize.test.ts`, `test/chain.test.ts`,
`test/reentrancy.test.ts`.

**Package identity.** The prototype workspace consumes the PUBLISHED
`@mkbabb/parse-that@1.0.0` from `node_modules`, not the source tree. The source tree's
`package.json` is also at `1.0.0`, so the reading above describes the bundle the
prototypes actually link against. No source-tree import appears anywhere in the workspace.

**Deliverables — running code, not a document about code:**

| File | Lines | Content |
| --- | --- | --- |
| `docs/tranches/V/megatranche/prototypes/css-parser/idiom/example.ts` | 246 | The worked grammar: CSS Values L4 §10 math functions, end to end |
| `docs/tranches/V/megatranche/prototypes/css-parser/idiom/example.test.ts` | 272 | 40 tests — terminals, precedence, arity, whitespace grammar, totality, recovery |
| `docs/tranches/V/megatranche/prototypes/css-parser/idiom/skip-caveat.test.ts` | 270 | 23 tests — the V·π §7.3 caveat reproduced and characterised |
| `docs/tranches/V/megatranche/prototypes/css-parser/idiom/antipatterns.test.ts` | 230 | 14 tests — every anti-pattern in §3 built for real and pinned to its failure |

**Gate — verbatim, run from
`docs/tranches/V/megatranche/prototypes/css-parser`:**

```
$ npm run check && npm test

> @value-js/mt-css-parser@0.0.0 check
> tsc --noEmit


> @value-js/mt-css-parser@0.0.0 test
> vitest run


 RUN  v3.2.7 /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser

 ✓ idiom/skip-caveat.test.ts (23 tests) 5ms
 ✓ idiom/antipatterns.test.ts (14 tests) 5ms
 ✓ idiom/example.test.ts (40 tests) 15ms

 Test Files  3 passed (3)
      Tests  77 passed (77)
   Start at  15:13:58
   Duration  630ms (transform 115ms, setup 0ms, collect 193ms, tests 25ms, environment 0ms, prepare 373ms)
```

Environment: darwin 25.4.0 (arm64), node v26.0.0, typescript 5.8.3
(`./node_modules/.bin/tsc --version` → `Version 5.8.3`), vitest 3.2.7. `tsconfig.json` is
`strict` + `noUncheckedIndexedAccess` + `verbatimModuleSyntax`. Repo `value.js` @
`c654824e`, branch `tranche-u`.

**Counts, measured not quoted.** `idiom/example.ts` contains **0** non-null assertions and
**4** `Parser.lazy` calls. The subject `src/css/grammar.ts` (483 lines) contains **72**
postfix `!` by the pattern `[A-Za-z_0-9)\]]!`, of which **70** are index-`!`
(`\[[^]]*\]!`). The brief says 74; the 70 index-`!` figure matches exactly, and I report my
own measurement of the total rather than parroting the brief's.

**No benchmark is claimed anywhere in this document.** The prior gate measured the live
regex parser as fastest (~1.8×). Nothing here contradicts or supersedes that. The idiom is
argued from correctness, totality and maintainability only.

---

## §1 · The idiom

Fifteen rules. Each is grounded in the library's own source or in the author's own domain
parsers — that is the whole point of the exercise, so that three candidate authors cannot
each invent a house style.

### R-1 — A production is a `const` bound to `Parser<AstNode>`

Not `Parser<string>`. The type of a production is the type of the thing it produces. When a
production's type is `string`, the parsing has been deferred to a second pass, and the
second pass is where index-`!` breeds.

> `json.ts`: `const jsonArray = Parser.lazy(…)`, `const jsonObject = Parser.lazy(…)`,
> `const jsonValue: Parser<any> = dispatch({…})`. Each production is one binding.

### R-2 — A `regex()` is a TERMINAL: exactly one token, no structure in capture groups

`regex()` without a `matchFunction` returns the **whole matched substring**
(`leaf.ts` → `state.unsafeSetValue(state.src.substring(savedOffset, end))`). Capture groups
are not reachable. Reaching one requires the `matchFunction` overload, which has a trap
(§5.3). So a regex that carries structure in groups is a regex parser wearing a combinator
as a hat.

> `json.ts`'s `jsonNumber` and `jsonString` are each one token. `parsers/utils.ts`'s
> `numberParser()` is one token. None of them span a delimiter.

Two further facts a candidate must know:

* `regex()` **always fails at end-of-input**, even for a pattern that can match empty:
  `regex(/\s*/).parseState("").isError === true` (`leaf.ts`, the `offset >= src.length`
  guard runs before the match). Pinned in `skip-caveat.test.ts` §4.
* An **empty match yields `undefined`**, not `""` (`leaf.ts`, the `end > savedOffset`
  branch). Combined with R-4 this is a silent arm-dropper.

### R-3 — Alternation: `.or()` for two, `any()` for N, `dispatch()` when first chars separate

`any()` is sequential trial with offset restore per arm; its arity-2 form is unrolled.
`dispatch()` is an `Int8Array(128)` first-character table — O(1), no trial. Use it whenever
the arms are distinguishable by their first byte, and put an `any()` inside a bucket when
two keywords share one.

> `json.ts` uses `dispatch({"{": …, "[": …, '"': …, "-": …, "0-9": …, t: …, f: …, n: …})`
> as the top-level value production. `csv.ts` uses `any(...)` for three field shapes.

`dispatch` interns identical `Parser` objects (`parsers.indexOf(parser)`), so mapping four
keys to the same production costs one slot.

### R-4 — Sequence: `all()` for a flat tuple, `.then()` for a pair, `.skip()`/`.next()`/`.wrap()` to discard

`.skip(p)` keeps the left value, `.next(p)` keeps the right, `.wrap(open, close)` keeps the
inside and additionally emits an unclosed-delimiter diagnostic. None of these needs a
positional index, so none of them needs a `!`.

**The hard constraint:** `all()` **drops `undefined` arms at runtime**
(`leaf.ts` → `if (state.value !== undefined) out[w++] = state.value`) while its TypeScript
tuple type keeps the position. So:

> **Never put `.opt()`, or any regex that can match empty, inside `all()`.** Use `.then()`,
> which builds its pair unconditionally.

This is not theoretical. It is live in parse-that's own `test/math.test.ts` (lines 18–22):

```ts
const exponent = all(regex(/[eE]/), regex(/[-+]/).opt(), digits)
    .map(([, exponentSign, exponent]) => `e${exponentSign ?? ""}${exponent}`)
    .opt();
```

With no sign, `all()` yields `["e", "2"]`, so `exponentSign` binds `"2"` and `exponent`
binds `undefined` — the producer emits the string `"e2undefined"`. The suite is green only
because `parseFloat("123.456e2undefined")` stops at the first invalid character and returns
`12345.6`. Pinned in `skip-caveat.test.ts` §4, last case. **This is recorded as evidence
about the published semantics, not as a proposal to change upstream** — 1.0.0 is the
contract this band builds on.

### R-5 — Optionality is `.opt()`, and it is the only value-scrubbing combinator

`.opt()` restores the offset and calls `state.ok(undefined)` on failure (`parser.ts` line
241). Every other combinator leaves the last value in place on the error path (§4).

### R-6 — Separated lists are `.sepBy(sep, min, max)`, and arity lives in the combinator

CSS's `#` multiplier maps directly: `#` → `sepBy(comma)`, `#{3}` → `sepBy(comma, 3, 3)`,
`#{1,}` → `sepBy(comma, 1, Infinity)`. A post-hoc `if (parts.length !== 3) return failure()`
is the non-idiomatic form — it moves a grammatical fact out of the grammar.

`sepBy` **never accepts a trailing separator**: it checkpoints before the separator and
backtracks past it if the following element fails (`parser.ts` lines 592–611). You do not
need to guard for that.

> `json.ts`: `jsonValue.sepBy(comma).trim().wrap(string("["), string("]"))`.

### R-7 — Repetition is `.many(min, max)`, which has a no-progress guard

`many` breaks on `state.offset === savedOffset`, so a zero-width element cannot spin. That
guard is also why a `recover()` sync parser must consume (R-13).

### R-8 — Whitespace: `.trim()` by default; an explicit whitespace parser only where the grammar requires one

`.trim()` with no argument uses the module `whitespace` parser and takes a flag-optimised
path (`parser.ts` → `FLAG_TRIM_WS`, `trimStateWhitespace`). Reach for
`regex(/\s+/)` only when whitespace is *significant* — e.g. CSS Values L4 §10.9, where `+`
and `-` MUST be surrounded by whitespace and `*` and `/` need not be. `example.ts` encodes
exactly that distinction, and `example.test.ts` asserts `calc(1+2)` fails while
`calc(1*2)` passes.

### R-9 — `Parser.lazy` is required at each back-edge of the recursion cycle, and nowhere else

The combinator graph is built eagerly at module evaluation. A production that names a
`const` declared **later** in the file must be wrapped, or it reads a TDZ binding and
throws. A backward reference must **not** be wrapped — `Parser.lazy(() => number)` is
noise, and `lazy`-everywhere is the cargo-cult form.

> `json.ts` does exactly this: `jsonArray` and `jsonObject` are lazy because they name
> `jsonValue`, declared after them; `jsonString` and `jsonNumber` are not.

`example.ts` has a five-production mutual recursion and carries **four** `Parser.lazy`
calls — the three forward references inside `calcValue`'s dispatch table, and
`parenthesized`'s forward reference to `calcSum`. `calcProduct`, `calcSum` and
`argumentList` read only already-initialised bindings and are built eagerly. (This was
verified by removing the redundant wrappers and re-running the gate: 77/77 still green.)

`Parser.lazy` caches on first invocation via a closure-local slot (`lazy.ts` →
`createLazyCached`), so the wrapper costs one branch, not a re-build per parse.

### R-10 — Precedence is written WITHOUT left recursion; `memoize()` is for genuine left recursion only

The idiomatic precedence shape is the climb:

```ts
const higher = /* … */;
const lower  = all(higher, all(op, higher).many()).map(([head, tail]) => fold(head, tail));
```

> `test/math.test.ts` uses exactly this for `multDiv` and `addSub`, and right-recursion
> through `Parser.lazy` for `unary`/`pow`. **It does not memoize.**

`memoize()` / `mergeMemos()` implement Warth–Douglass–Millstein packrat-with-left-recursion,
keyed on `(id, offset)`. They are **opt-in and off the default parse path**, and using them
correctly requires `resetPackrat()` per parse (`test/memoize.test.ts` does this in
`beforeEach`).

**Why a cargo-cult `memoize()` is not free.** Constructing *any* memoized wrapper sets
`PACKRAT_ARMED = true` at construction time, process-wide, and **the latch never disarms**
(`packrat.ts` → `makeMemoized`). Until it is armed, `packratEnter` / `packratExit` /
`resetPackrat` are true no-ops; once armed, **every top-level `parseState()` in the
process** — including parses of grammars that never touch the memoized parser — pays an
epoch snapshot/restore. One decorative `memoize()` in a CSS colour parser therefore taxes
every other parse in value.js. That is the sourced argument, and it is why the answer here
is: **do not memoize a CSS value grammar.** CSS values are LL(1)-ish; the library's own
comment says so.

### R-11 — The entry point goes through `parseState()` and branches on `isError`. Never `parse()`.

`parse()` is literally `parseState(val).value` (`parser.ts` lines 77–79) with no `isError`
consult. On a *failed* parse it hands back whatever the last successful sub-parser left
behind. This is the single rule that makes a parser total, and it is the direct cure for the
R1 class of bug. See §4.

### R-12 — Error position is `state.furthest`, not `state.offset`; labels need diagnostics ON

Three facts that are easy to get wrong:

1. `parseState()` returns the **mutated state**, whose `offset` has been *rewound* by the
   failing top-level combinator. The furthest position the parse reached is
   `state.furthest`. `parser.ts` builds a separate error *view* positioned at `furthest`
   and stores it on `this.state` — but **returns the rewound state** (lines 51–75). Read
   `state.furthest >= 0 ? state.furthest : state.offset`.
2. `state.expected` is populated **only** while `enableDiagnostics()` is on
   (`utils.ts` → `mergeErrorState` gates the label push on `diagnosticsEnabled`). A parser
   that promises an expected-set unconditionally is promising `[]`.
3. Labels are produced by the leaf constructors and are already good: `string("x")` →
   `"\"x\""`, `regex(/…/)` → `"/…/flags"`, `dispatch({…})` → `"one of ['a', 'b'-'c']"`.
   There is no `.label()` combinator; do not invent one — shape the grammar so the leaf
   labels read well.

### R-13 — `recover(sync, sentinel)` is for list-shaped grammars, and `sync` must consume

`recover` snapshots the failure as a collected diagnostic, runs `sync` to skip the bad span,
and yields `sentinel` so an enclosing `sepBy`/`many` keeps going. If `sync` fails, the
diagnostic is popped back off and the error propagates normally.

It is **warranted** when the caller wants *every* error in a list. It is **cargo cult** on a
single-value production such as `parseCssColor`, where the correct answer to bad input is
one clean failure. `example.ts` exports `resilientArguments` to demonstrate the warranted
case and says so in place.

The sync parser must consume (`regex(/[^,)]+/)`, not `*`): a zero-width sync leaves the
offset unmoved and `sepBy`'s no-progress guard ends the loop.

### R-14 — `chain` only when the parsed value chooses the grammar of the tail

`chain(fn)` calls `fn` and builds a fresh `Parser` **on every parse**. If the continuation
does not depend on the value *grammatically* — if it is a pure transformation — `map` is the
answer. `antipatterns.test.ts` §4 pins both: the factory-call counter, and a legitimate
length-prefixed token that `map` cannot express.

(1.0.0 note, from `test/chain.test.ts`: `chain` now threads falsy seeds. The pre-1.0.0 form
short-circuited on `0` / `""` / `false`. If a candidate copies a pre-1.0.0 snippet with a
second `chainError` argument, that parameter no longer exists.)

### R-15 — Zero-width assertions: prefer `x.skip(y.not())` to a bare `.not()` inside `all()`

`peek()` is zero-width positive; `not()` with no argument is zero-width negative;
`lookAhead(p)` parses `this` then asserts `p` follows without consuming; `minus(p)` is
EBNF set-difference at the same start position.

**Sharp edge:** zero-argument `.not()` succeeds via `state.ok(savedValue)` where
`savedValue` is the *ambient* threaded value — i.e. the previous sibling's. Inside `all()`
it is therefore not `undefined`, is not dropped, and appears as a **phantom duplicate
element**:

```ts
all(string("a"), string("b").not(), string("c")).parseState("ac").value
// → ["a", "a", "c"]      ← the "a" is duplicated
```

The declared return type `Parser<string>` is a further lie: the value is the ambient one, of
whatever type that happens to be. Pinned in `skip-caveat.test.ts` §5. The idiomatic form
attaches the assertion to a real element — `string("a").skip(string("b").not())` — which
adds no positional element and cannot duplicate.

---

## §2 · The worked example

`idiom/example.ts` implements **CSS Values and Units Level 4 §10 math functions** end to
end:

```
<math-function> = calc( <calc-sum> ) | min( <calc-sum># ) | max( <calc-sum># )
                | clamp( <calc-sum>#{3} )
<calc-sum>      = <calc-product> [ [ '+' | '-' ] <calc-product> ]*   ‹ws REQUIRED›
<calc-product>  = <calc-value>   [ [ '*' | '/' ] <calc-value>   ]*   ‹ws OPTIONAL›
<calc-value>    = <number> | <percentage> | <dimension> | ( <calc-sum> ) | <math-function>
```

Chosen because it is small, real, and exercises every axis of the idiom on one page:
alternation (R-3), sequence and discard (R-4), optionality (R-5), separated lists with
exact arity (R-6), mutual recursion through `lazy` (R-9), precedence without left recursion
(R-10), significant whitespace (R-8), keyword case-folding, and a total entry point (R-11).

It is deliberately **not** the colour grammar. This is the yardstick the colour-parser
candidates are measured against, not a head start on their work.

What `example.test.ts` asserts, at 40 tests:

* terminals — `<number>` / `<percentage>` / `<dimension>`, including `.5em` and `-1.5e2px`;
* case-folding of function names *and* units in one pass (`CALC(1PX * 2)`);
* precedence and left-associativity (`calc(100% - 2 * 8px)`, `calc(1 - 2 - 3)`);
* recursion through parentheses, through nested math functions, and 64 levels deep;
* arity in `sepBy` — `clamp()` takes exactly three, `calc()` exactly one, `min()` one or
  more, and no trailing separator is accepted;
* CSS L4 §10.9 whitespace — `calc(1 + 2)` passes, `calc(1+2)` / `calc(1 -2)` / `calc(1- 2)`
  fail;
* **totality over 26 hostile inputs** — including `""`, `"calc("`, `"calc(,)"`,
  `"calc(1px))"`, `"((((((((((", and a 2000-term expression. None throws; every failure
  reports an integer offset;
* the furthest-offset caret points past `calc(1px` for `calc(1px + )`;
* `recover()` collects exactly one diagnostic for `(1px, ?, 3)` and zero for a clean list.

The public surface is:

```ts
export type ParseOutcome = { ok: true; node: CalcNode }
                         | { ok: false; offset: number; expected: readonly string[] };
export function parseMath(source: string): ParseOutcome;
```

A discriminated union with no `null`-in-a-tuple and no thrown exception. There is no way for
a caller to read `node` without having proven `ok`.

---

## §3 · The anti-pattern list

Each item is built for real and pinned in `idiom/antipatterns.test.ts` (14 tests, green).

### AP-1 — A hand-rolled cursor beside the combinators

*Tell:* a `for (let i = 0; …)` loop with `depth`, `start`, `quote` locals sitting next to
parser code; `source[i]!`; `parts.push` filtered by truthiness.

*Failure, pinned:* the transcribed `splitTopLevel` returns `[]` for an empty or
whitespace-only body, because both push sites are guarded by `if (part)`. The caller's
`slash[0]!.replace(/,/g, " ")` then throws `TypeError`. That is the **live R1 crash** in
`src/css/grammar.ts:181`, reproduced here from the *technique* rather than imported from
the one file — any truthiness-filtered hand scanner has this hole.

The `!` is not incidental. Under `noUncheckedIndexedAccess`, `slash[0]` is
`string | undefined`; the type system stated the defect at compile time and the `!` overrode
it. Seventy such overrides is seventy statements of "I know better", one of which ships as a
crash.

*Contrast, pinned:* `parseMath("calc()")` returns `{ ok: false, … }`. There is no array to
index and therefore no index to assert on.

### AP-2 — Regex doing the parsing, combinators as decoration

*Tell:* one long regex with capture groups, wrapped in `regex(...).map(...)`; a second
`RegExp.exec` inside the `.map`.

*Failure, pinned:* three ways.
1. `regex(RGB).parse("rgb(1,2,3)")` returns `"rgb(1,2,3)"` — the whole match. The capture
   groups are **not reachable** through the default path, so the "structure" in them is
   inert and the combinator contributes nothing.
2. Reaching a group needs the `matchFunction` overload, which routes a `""` return to
   `state.ok(undefined)` — **success, no value, and nothing consumed**. An optional group
   that legitimately matched empty becomes a zero-width success that a `many()` above it
   reads as no-progress. Pinned: `regex(/(a?)(b)/, m => m?.[1] ?? null).parseState("b")` is
   not an error, has `value === undefined`, and `offset === 0`.
3. A flat regex cannot see nesting: `/min\(([^,]+),([^,]+)\)/` matches the wrong span of
   `min(min(1px, 2px), 3px)` (it stops at `min(min(1px, 2px)`). `parseMath` on the same
   input succeeds correctly.

### AP-3 — Broad `.*` / `[^)]*` remainder capture

*Tell:* a production whose value type is `string` and whose regex is a negated class up to a
delimiter.

*Failure, pinned:*
* `string("rgb(").next(regex(/.*/)).skip(string(")"))` **rejects the valid input**
  `rgb(1,2,3)` — `.*` is greedy, eats the closer, and the `skip` then finds nothing.
* `[^)]*` "works" until the body nests: `calc(min(1px, 2px))` is rejected, while
  `parseMath` accepts it.
* The captured value's type is `string`, not an AST node — every such capture defers the
  real parsing to a second pass, which is precisely where index-`!` and split-on-comma
  heuristics breed.

### AP-4 — `chain` where `map` suffices

*Tell:* `.chain(v => somethingThatIgnoresTheGrammar(v))`.

*Failure, pinned:* a factory-call counter shows `chain` constructing a fresh `Parser`,
closure and context object on **every** parse for a transformation with no grammatical
dependency on the value, while `map` constructs none and produces the identical result. The
legitimate case is also pinned — `regex(/\d/).chain(n => regex(new RegExp(`[a-z]{${n}}`)))`
parses `"3abc"` → `"abc"` — because there the value *chooses the grammar of the tail*.

### AP-5 — One god-production

*Tell:* a single `all(...)` of eight-plus arms with one `.map` destructuring the tuple
positionally, usually with an `.opt()` somewhere in the middle.

*Failure:* R-4's drop-`undefined` behaviour means every position after the optional arm
shifts by one at runtime while TypeScript still reports the wide tuple. The compiler cannot
help, the destructure binds the wrong names, and the repair reached for is `parts[4]!` —
which is how the subject accumulated 70 of them. Decomposed productions are independently
testable, which is what lets `example.test.ts` assert totality at four grammar levels rather
than only at the root.

### AP-6 — Imperative balanced-delimiter scanning

*Tell:* `depth++` / `depth--` inside a character loop, with a `quote` state variable
alongside.

*Failure:* it is AP-1 with a nesting counter, and it carries the same defects — `depth` can
go negative without anyone noticing, the empty-component case is filtered out by truthiness,
and the result is a `string[]` that a second pass must re-parse. `.wrap(open, close)` plus
`Parser.lazy` expresses the same thing in two lines, is total, and emits an
unclosed-delimiter diagnostic for free. If a raw balanced split is genuinely wanted,
parse-that already ships `splitBalanced` / `containsDelimiter` (`src/parse/split.ts`,
exported from the package root) — write neither.

### AP-7 — Reading `parse()`'s return value as a success signal

*Tell:* `const v = p.parse(src); if (v) { … }`.

*Failure:* §4 below. This is the R1 bug class re-implemented in a new library and is the
single most likely way a candidate turns a correct grammar into an incorrect parser.

### AP-8 — Decorative `memoize()`

*Tell:* `memoize(...)` on a grammar with no left recursion, or without `resetPackrat()`.

*Failure:* R-10. It arms `PACKRAT_ARMED` process-wide and permanently, taxing every
unrelated top-level parse in value.js with an epoch snapshot, and buys nothing for an
LL(1)-ish CSS value grammar.

---

## §4 · The `skip` caveat — verdict

**V·π §7.3 reports:** after `leaf.skip(suffix)` consumes a successful leaf and the suffix
fails, the offset rewinds but the child value remains.

### It is REAL, and it reproduces exactly as reported

`idiom/skip-caveat.test.ts` §1, run against the published 1.0.0 bundle:

```ts
const leafSkipSuffix = string("a").skip(string("b"));
const state = leafSkipSuffix.parseState("ax");

state.isError  // true   — the parse failed …
state.offset   // 0      — … the offset rewound to the start …
state.value    // "a"    — … and the leaf's value survived.
```

### It is NOT a `skip` defect

`then`, `next`, `all` and `wrap` all do the same thing — pinned individually in §2 of that
file:

| combinator | input | `isError` | `offset` | `value` |
| --- | --- | --- | --- | --- |
| `a.skip(b)` | `"ax"` | true | 0 | `"a"` |
| `a.then(b)` | `"ax"` | true | 0 | `"a"` |
| `a.next(b)` | `"ax"` | true | 0 | `"a"` |
| `all(a, b)` | `"ax"` | true | 0 | `"a"` |
| `regex(/x/).wrap(a, b)` | `"ax"` | true | 0 | `"x"` (the *inner* value) |
| `any(a, b)` | `"zz"` | true | 0 | `undefined` |
| `a.skip(b).opt()` | `"zz"` | **false** | 0 | `undefined` |

This is the library's **uniform state discipline**, visible in every error path in
`parser.ts`: a combinator restores `offset` and sets `isError`, and does *not* scrub
`value`, because `value` is only defined when `isError === false`. Scrubbing it would cost a
write on every failed alternative in every backtracking parse for no benefit. `.opt()` is
the sole exception, and it must be — it converts failure into a defined success.

So: **not a defect. A documented-by-construction invariant that the V·π note did not
state.**

### The exploitable surface is `Parser.parse()`, and that is MISUSE

`parse()` is `parseState(val).value` with no `isError` consult (`parser.ts` lines 77–79).
Therefore a failed parse hands back a plausible-looking stale value:

```ts
string("a").skip(string("b")).parse("ax")   // → "a"   (the parse FAILED)
```

And in the shape that matters to this band (§6 of that file):

```ts
const colourish = regex(/[a-z]+/).skip(string("(")).skip(string(")"));
colourish.parse("oklch(")   // → "oklch"   ← an unclosed function, "successfully parsed"
colourish.parse("zzz")      // → "zzz"
```

That is **the R1 bug reconstituted in a new library**. A candidate who ports the grammar to
parse-that and keeps a `if (parse(src))` call site has moved the crash, not fixed it.

**The cure is one line**, and it is R-11:

```ts
const state = p.parseState(src);
return state.isError ? failure(...) : success(state.value);
```

Through `parseState`, every one of `"oklch("`, `"zzz"`, `""`, `"()"`, `"oklch)"`,
`"oklch(  )"` is cleanly unparseable, and `"oklch()"` is cleanly parsed. Pinned.

### Verdict, stated plainly

| question | answer |
| --- | --- |
| Is the reported behaviour real? | **Yes**, reproduced exactly. |
| Is it specific to `skip`? | **No** — `then`, `next`, `all`, `wrap` are identical. |
| Is it a parse-that defect? | **No.** It is the uniform error-path discipline; `value` is undefined-by-contract when `isError`. |
| Is it a real integration hazard? | **Yes** — via `Parser.parse()`, which is the ergonomic default and the one a candidate will reach for. |
| Whose fault when it bites? | **The consumer's.** It is misuse, and it is exactly the R1 shape. |
| Mitigation the candidates must implement | Every entry point goes through `parseState()` and branches on `isError`. No exceptions. Root productions end in `.eof()`. |

One corollary, pinned in §3 of that file: a *succeeding* alternative overwrites the stale
value, so it cannot leak into a later success — but a zero-width success (`regex(/x*/)`
matching nothing) is itself a trap, which is why every root production must end in `.eof()`.
`withoutEof.parseState("ax").isError === false` while `withEof.parseState("ax").isError ===
true`.

---

## §5 · Adjacent findings, pinned in passing

These were found while characterising the `skip` caveat. All are properties of published
1.0.0 and all are pinned as executable assertions. **None is filed as an upstream change
request** — 1.0.0 is the contract this band builds on, and the epoch rule holds.

| # | finding | where |
| --- | --- | --- |
| A | `all()` drops `undefined` arms at runtime; the TS tuple type keeps them. Live in parse-that's own `test/math.test.ts`, masked by `parseFloat`. | `skip-caveat.test.ts` §4 |
| B | Zero-argument `.not()` succeeds with the **ambient** value, so inside `all()` it duplicates the previous arm rather than contributing nothing. Its declared `Parser<string>` type is not the value's type. | `skip-caveat.test.ts` §5 |
| C | `regex()` with a `matchFunction` returning `""` yields `state.ok(undefined)` — success, no value, **zero-width**. | `antipatterns.test.ts` §2 |
| D | `many(min)` / `sepBy(sep, min)` set `value = []` on min-failure but do **not** rewind `offset` to the start. Contained in practice (every parent restores its own `savedOffset`), but a hand-written driver reading `state.offset` after a failed `many` reads a position the parse did not keep. | `skip-caveat.test.ts` §2 |
| E | `regex()` **always fails at end-of-input**, even for a pattern that can match empty. | `skip-caveat.test.ts` §4 |
| F | `parseState()` returns the **rewound** state; the error view positioned at `furthest` is stored on `parser.state` and is not what you get back. | R-12 |

---

## §6 · The reviewer's checklist

A candidate colour parser is "idiomatic parse-that" if, and only if:

1. Zero non-null assertions. Zero `as` casts into the AST. (`example.ts`: 0 and 0.)
2. No `for` loop over `source[i]`, no `depth`/`start`/`quote` locals, no `splitTopLevel`.
3. Every production is a named `const` typed `Parser<AstNode>` — not `Parser<string>`.
4. Every regex is one token. No capture-group structure. No `.*` remainder.
5. Optionality never appears inside `all()`.
6. Arity multipliers are `sepBy(sep, min, max)`, not post-hoc length checks.
7. `Parser.lazy` appears once per back-edge, not once per production.
8. No `memoize()` / `mergeMemos()` / `resetPackrat()` anywhere.
9. `chain` appears only where the parsed value chooses the grammar of the tail.
10. The public entry point uses `parseState()` + `isError`, returns a discriminated union,
    ends in `.eof()`, and never throws — proven against a hostile corpus, not asserted.
11. `recover()` appears only if the grammar is list-shaped and the caller wants every error.
12. `npm run check && npm test` is green with `strict` + `noUncheckedIndexedAccess` +
    `verbatimModuleSyntax`.

Point 10 is the one that retires R1. The other eleven are what keep it retired.
