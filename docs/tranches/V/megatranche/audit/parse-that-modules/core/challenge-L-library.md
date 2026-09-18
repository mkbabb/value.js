claude-opus-5[1m]

# CHALLENGE — parse-that module `core`, LIBRARY axis (L)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/core.ts` (26 lines) and the
whole of what it re-exports.
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries a `file:line` provenance and its own falsifier; claims that did not survive their falsifier
were struck and are recorded as such in §6.
**Evidence root**: `/Users/mkbabb/Programming/parse-that` main checkout, READ-ONLY, at
`ef10d5b` (`git status` dirty only in `rust/`, `.cargo/`, `README.md` — no TypeScript source
modified). `/Users/mkbabb/Programming/parse-that-css-totality-p2` verified **ABSENT**
(`ls` → `No such file or directory`, 2026-08-04); no STOP finding on that count.
**Writes**: this file only. Probe scripts were written to the session scratchpad
(`/private/tmp/claude-504/…/scratchpad/`), never into either repo.
**Latch hygiene**: no probe called `memoize()`, `mergeMemos()`, or `enableDiagnostics()`. The
`PACKRAT_ARMED` latch (PT-03) was never armed; every measurement below ran with diagnostics OFF, in
a fresh short-lived node process. No benches.

**Tally: 30 defects (2 BLOCKER · 15 MAJOR · 13 MINOR) · 6 superlatives.**

---

## 0. What `core` actually is

`core.ts` is a 26-line barrel with zero logic. It is the `"./core"` subpath entry
(`package.json:12-16` → `dist/core.js`), and its entire product is a **claim**, stated in its own
header at `core.ts:3-5`:

> the Parser core, state, leaf parsers, lazy, and the balanced-split helpers. **A consumer that
> imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv
> domain parsers.**

A barrel cannot be judged on its own bytes — there are none to judge. It is judged on (a) whether
that claim holds in the shipped artifact, and (b) the library quality of the surface it elects to
publish. Both are audited below. The re-exported tree read whole: `parser.ts` (711) · `state.ts`
(189) · `leaf.ts` (399) · `lazy.ts` (43) · `split.ts` (58), plus the transitively-required
`utils.ts` (186) · `packrat.ts` (488) · `debug.ts` (383) · `ansi.ts` (17).

**Goldilocks verdict on the module itself: CORRECTLY SIZED, WRONGLY COMPOSED.** 26 lines for a
tier boundary is right. But it publishes a *format-time text helper* (`splitBalanced`,
`containsDelimiter` — `split.ts:1-3` calls them "for format-time text processing", used by
"BBNF-generated `toDoc()` code") inside a surface whose header calls itself "the zero-side-effect
primitive set" of a parser. That is a cohesion defect (see D-27), not a sizing one.

---

## 1. BLOCKERS

### B-1 — `regex()` treats end-of-input as unconditional failure; every nullable pattern fails at EOF, including the exported `whitespace` singleton

**Severity: BLOCKER** · `src/parse/leaf.ts:326-330`

```ts
const regexParser = (state: ParserState<string>) => {
    if (state.offset >= state.src.length) {
        state.isError = true;
        return state;
    }
```

The guard fires before the regex is ever consulted. A pattern that matches the empty string —
`/\s*/`, `/;?/`, `/[a-z]*/` — therefore **fails** at end of input, where it must succeed.

This is not theoretical. `whitespace` itself is `regex(/\s*/)` (`leaf.ts:397`), and it is on the
`core` surface (`core.ts:24`).

Measured against the published `dist/core.js` (diagnostics off, packrat unarmed):

| probe | construction | input | `isError` |
|---|---|---|---|
| A | `regex(/\s*/)` at `offset === src.length` | `"ab"` | **true** |
| B | `all(ws, string("ab"), ws)` — the exact shape `.trim(ws, discard=false)` builds (`parser.ts:485`) | `"ab"` | **true** |
| C | `string("ab").trim(regex(/\s*/))` → `wrap()` path (`parser.ts:520`) | `"ab"` | **true** |
| C′ | same parser | `"ab "` | **false** |
| E | `all(string("a"), regex(/;?/))` | `"a"` | **true** |
| F | the exported `whitespace` singleton, `offset === src.length` | `"ab"` | **true** |

Row **C/C′** is the sharpest statement of the bug: **appending a trailing space makes the parse
succeed.** A trim that only works when there is something to trim is inverted.

Why it survived: `Parser.trim()` has a fast path keyed on `parser.context?.name === "whitespace"`
(`parser.ts:488`), a name mutated onto the singleton at `leaf.ts:398`. That path uses the charCode
loop `trimStateWhitespace` (`leaf.ts:372-391`), which is correct at EOF. So the *default* `.trim()`
(probe D → `isError: false`) masks the defect entirely. The bug is reachable only through
`.trim(p, false)`, `.trim(userWhitespaceRegex)`, `wrap()`, or any hand-built `all()` with a nullable
regex in trailing position — i.e. exactly the constructions a CSS grammar writes for optional
suffixes.

**Falsifier (survived).** *"`/\s*/` genuinely has nothing to match at EOF, so failing is defensible."*
No: `/\s*/` matches the empty string, and the non-EOF branch of this very function has a dedicated
"Empty match" arm (`leaf.ts:354-357`) that returns **success** with `undefined`. The function
contradicts itself across the boundary — inside the string an empty match succeeds, at the end it
fails. Second falsifier: *"maybe the guard is a cheap fast-exit and the sticky regex would fail
anyway."* Probe A refutes it directly — remove the guard and `sticky.test("ab")` with
`lastIndex = 2` returns `true`.

**Corpus relation.** Not in O-15 (which measured `dist` surface postures, not nullable-at-EOF
semantics), not in `parser-band.md`'s 22-row divergence ledger, not in the W1/W2 harness
constraints. **New.** It belongs in X.P.W1's equivalence oracle as a corpus row: the 403-string
corpus cannot have contained an input whose last token is a nullable regex, or P-1 would not have
come back GREEN with zero mirror-defects.

---

### B-2 — `.parse()` returns a success-shaped value on failure; `parseState()` returns a different object than `.state`

**Severity: BLOCKER** · `src/parse/parser.ts:51-79`

O-15 PT-07 records this as "`.parse()` returns `undefined` on failure (indistinguishable from a
successful `undefined`)". **The tree is worse than the letter.** `parseStateInner` builds an
`errorState`, assigns it to `this.state` (`parser.ts:66`), and then **returns `state`** — the
original, un-repositioned object (`parser.ts:74`). `parse()` returns `state.value`
(`parser.ts:77-79`), which is whatever the last combinator left behind.

Measured against `dist/core.js`:

| construction | call | returned value | `p.state.isError` |
|---|---|---|---|
| `all(regex(/\s*/), string("ab"), regex(/\s*/))` | `.parse("ab")` | **`"ab"`** | `true` |
| `string("a").many(1)` | `.parse("z")` | **`[]`** | `true` |
| `string("a").many(0)` | `.parse("z")` | **`[]`** | `false` |

The last two rows are the finding: **identical return value, opposite verdict, no way to tell them
apart from the return.** `many()`'s failure path explicitly writes the plausible value
(`parser.ts:555`, `sepBy` likewise at `:628`: `state.unsafeSetValue([])`), so failure is disguised
as an empty success. Row 1 shows the value can even be the *correct parse of the payload* while the
overall parse failed — a consumer that trusts the return ships a wrong answer with no exception, no
sentinel, and no flag.

Compounding, `parseState()` also lies about identity:

```
ret === p.state ?  false
ret.expected === p.state.expected ?  true
```

The object you are handed is **not** the object carrying the rendered error, but the two share the
`expected` array by reference (`parser.ts:62`) — so a consumer that dedupes or sorts
`p.state.expected` silently mutates the returned state's, and vice versa. There is no typed result
(`Result<T,E>`), no `isOk()`, no throw. The only truthful failure signal is reading `p.state.isError`
*after* the call, on a mutable field of a parser instance that is shared across every parse of that
grammar — which is itself unsafe under any interleaving.

**Falsifier (survived).** *"The library's contract is `parseState()`, and `.parse()` is a convenience
for grammars that cannot fail."* Two refutations. (i) `parseState()` has the identity defect above,
so the "correct" API is also broken. (ii) `parse()` is the API every consumer reaches for and the
one O-15 PT-07 measured; `parse(val: string)` is typed `=> T`, not `=> T | undefined`, so
TypeScript actively asserts the failure mode away. A third: *"the caller can check
`p.state.isError`."* That field is per-Parser-instance, not per-call — two `.parse()` calls on the
same grammar overwrite it, and `parseStateInner` writes it on **both** branches (`:66`, `:71`), so
there is no stale-detection either.

**Corpus relation.** O-15 **PT-07** — corroborated and **sharpened**: the ambiguity is not
`undefined`-vs-`undefined`, it is *plausible-value*-vs-*plausible-value*. O-15's stated cure ("a
named JS-boundary invariant **above** parse-that, not a request to them") is **still correct and now
strictly more urgent**: an invariant that only checks for `undefined` would pass rows 1–3 above.
Any value-side boundary wrapper must assert on `parser.state.isError`, not on the return.

---

## 2. MAJOR

### D-03 — the module's sole documented product is falsified by the shipped artifact

**Severity: MAJOR** · `core.ts:3-5` vs `dist/core.js:1`, `dist/packrat-entry-CS1td-8B.js:1`

`dist/core.js:1` is:

```js
import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
```

The `core` entry imports **the packrat chunk**. That chunk's own line 1 is:

```js
import { i as isDiagnosticsEnabled, m as mergeErrorState, r as reportUnclosedDelimiter,
         f as addSuggestion, a as collectDiagnostic, p as popLastDiagnostic }
  from "./diagnostics-DDazRHgl.js";
```

Measured composition of what a `/core`-only consumer loads:

| artifact | bytes |
|---|---|
| `dist/core.js` (own code — `splitBalanced` + the re-export list) | 1,336 |
| `dist/packrat-entry-CS1td-8B.js` (dragged whole) | 40,562 |
| `dist/diagnostics-DDazRHgl.js` (dragged transitively) | 3,516 |
| — of the packrat chunk: debug/print/ansi region, lines 28–285 | **8,512** |
| — of the packrat chunk: packrat region, lines 661–849 | **5,411** |

**≈34% of the dragged chunk is machinery the header says is not pulled**, plus the entire
diagnostics accumulator as a hard import.

And it is not a bundler-configuration accident that downstream tree-shaking will fix:

- **diagnostics — unshakeable.** `Parser`'s error paths call `mergeErrorState` on essentially every
  combinator failure (`parser.ts:93, 201, 223, 239, 258, 291, 410, 418, 447, 460, 468`;
  `leaf.ts:16, 54, 69, 142, 291, 303, 360`). No import of `Parser` can drop it.
- **debug/print — unshakeable.** `parserDebug`/`parserPrint`/`statePrint` are reached from
  `Parser.debug()` (`parser.ts:695`), `Parser.toString()` (`parser.ts:699`) and
  `ParserState.toString()` (`state.ts:137`). Class methods are retained by every production
  bundler; the 8.5 KB region is permanent.
- **packrat — partially unshakeable.** `Parser.parseState` calls `packratEnter`/`packratExit`
  unconditionally (`parser.ts:43, 47`), so `PACKRAT_ARMED`, `MEMO`, `HEADS`, `GROWING`, `LR_STACK`,
  `CURRENT_SRC` and the `PackratEpoch` machinery are live even for a consumer that never memoizes.
  Only `memoize`/`mergeMemos`/`makeMemoized`/`getCijKey`/`resetPackrat` are shakeable.

**One of the three clauses is true**: json/csv are genuinely absent
(`grep -E 'jsonParser|csvParser|escapedString'` over the chunk → no match). Two of three are false.

**Falsifier (survived).** *"The claim is about the source-level tier boundary, not the bundle."* The
sentence is "A consumer that **imports only this** never **pulls** …" — that is a statement about
what a consumer loads, and the consumer loads `dist/core.js`, which pulls it. *"A different bundler
config would split it."* Not for the two unshakeable tiers above; and `vite.config.ts:15-22` is the
config that ships.

### D-04 — the EOF short-circuit in `regex()` never calls `mergeErrorState`, so the error is rendered at offset 0

**Severity: MAJOR** · `leaf.ts:327-330` + `parser.ts:60`

Every other failure arm of `regex()` calls `mergeErrorState(state, label)` (`leaf.ts:360`). The EOF
arm does not — it sets `isError` and returns. `furthest` therefore never advances, and
`parseStateInner` positions the rendered error at `state.furthest >= 0 ? state.furthest :
state.offset` (`parser.ts:60`) — i.e. at **offset 0**.

Measured:

```
all(string("a"), regex(/\d+/)).parseState("a")   →  isError: true,  furthest: -1
all(string("a"), regex(/\d+/)).parseState("ax")  →  isError: true,  furthest:  1
```

Same grammar, same failing rule; truncating the input by one character moves the reported error from
offset 1 to offset 0. The label (`/\d+/`) is also never contributed to the expected-set.

**Falsifier (survived).** *"With diagnostics off, `mergeErrorState` only advances `furthest` and
labels are dropped anyway (`utils.ts:33`), so nothing is lost."* `furthest` advancement is
**unconditional** in `mergeErrorState` (`utils.ts:29-31`) — it is not gated on
`diagnosticsEnabled`. The position is lost in both modes; only the label is diagnostics-gated.

### D-05 — `getLineNumber()` and `getLineAndColumn().line` are off by one; `getColumnNumber()` and `.column` disagree at a newline offset

**Severity: MAJOR** · `state.ts:111-134`

Three public line/column methods on one class, using three different arithmetic conventions.
`getColumnNumber` scans `lastIndexOf("\n", offset)`; `getLineAndColumn` scans
`lastIndexOf("\n", offset - 1)`. Reproduced in pure JS (no parse-that import):

| src | offset | `getLineNumber()` | `getColumnNumber()` | `getLineAndColumn()` |
|---|---|---|---|---|
| `"a\nb"` | 2 | 1 | 0 | `{line: 2, column: 0}` |
| `"ab\ncd"` | 2 | 1 | **0** | `{line: 1, **column: 2**}` |
| `"ab\ncd"` | 3 | 1 | 0 | `{line: 2, column: 0}` |
| `"x"` | 0 | **0** | 0 | `{**line: 1**, column: 0}` |
| `"a\nb\nc"` | 4 | 2 | 0 | `{line: 3, column: 0}` |

`getLineNumber` is 0-based in every row; `getLineAndColumn().line` is 1-based (and documented as such
at `state.ts:126`). Row 2 is the column defect: with `offset` pointing **at** the newline,
`getColumnNumber` computes `2 - (2+1) = -1` and the `Math.max(0, …)` at `state.ts:116` clamps it to
`0` — **the clamp exists only to hide the off-by-one**, and it converts a detectable negative into a
plausible wrong answer. All three are on the `core` surface via `ParserState`; none has a single
test (`grep` over `test/` → 0 hits for all three).

**Falsifier (survived).** *"They are three different APIs with three documented conventions."* Only
`getLineAndColumn` is documented (`state.ts:126`); the other two carry no JSDoc and no convention
statement. *"`getLineNumber` is deliberately 0-based."* Then it disagrees with the only documented
member of its own family, and `collectDiagnostic` (`utils.ts:109-110`) independently reimplements the
1-based convention — three implementations, two conventions, one class.

### D-06 — `Parser.trim()` constructs and discards a whole Parser on every call

**Severity: MAJOR** · `parser.ts:490-517`

```ts
const flaggedParser = new Parser(
    ((state: ParserState<T>) => inner.call(state)) as ParserFunction<T>,
    createParserContext("trimWhitespace", this as Parser<unknown>),
) as Parser<T>;
flaggedParser.flags = this.flags | FLAG_TRIM_WS;      // :496
// … 20 lines later …
return new Parser(whitespaceTrim as ParserFunction<T>, …);   // :514 — a DIFFERENT parser
```

`flaggedParser` is built, configured, and never returned or referenced again. Each `.trim()` call
therefore allocates: 2 `Parser` instances, 2 closures, 2 context objects (each with a rest-args
array), and burns 2 slots of the process-global `PARSER_ID` counter (`parser.ts:18, 25`) — one set of
which is immediate garbage.

Measured against `dist/core.js`: 100 `.trim()` calls consumed **200** parser ids.

The id burn is not cosmetic: `PARSER_ID` is the packrat memo key's high component, budgeted at
≈2.1M (`packrat.ts:77`) with a fail-loud `RangeError` above it (`packrat.ts:94`). Doubling the mint
rate on the most-used decorator halves that headroom.

**Falsifier (survived).** *"Dead but harmless — construction happens once per grammar."* Not for
grammars that build parsers inside `Parser.lazy` bodies or per-request factories, which is the
idiom `createLazyCached` exists to serve (`lazy.ts:18-24`). And it is not harmless in the second
order — see D-07.

### D-07 — the entire flag machinery is unreachable dead code, and it strands a public `Suggestion` variant

**Severity: MAJOR** · `parser.ts:20-22, 437-478` · `state.ts:26, 91-94`

`.flags` is assigned exactly once in the repository — `parser.ts:496`, on the discarded
`flaggedParser` of D-06. Nothing that is ever *returned* to a caller has non-zero flags. Therefore:

- `Parser.call()`'s entire post-fast-path body (`parser.ts:441-477`, 37 lines) is unreachable in
  production. The `flags === 0` early return at `:438` is the only live line.
- `FLAG_TRIM_WS` and `FLAG_EOF` (`parser.ts:21-22`) are dead constants.
- `ParserState.unsafeCall()` (`state.ts:92-94`), documented as "the single choke point for
  combinator type casts", has **zero call sites** in `src/` or `test/`. It is the only caller of
  `.call()` in the library.
- The `FLAG_EOF` branch (`parser.ts:466-476`) contains the **only** construction site of
  `kind: "trailing-content"` — so that member of the public `Suggestion` union (`state.ts:26`) can
  never be produced. A consumer switching on `suggestion.kind` writes a permanently-dead arm.

**Falsifier (survived).** *"`test/debug.test.ts:115` calls `pEof.call(state3)`."* It does — with
`flags === 0`, so it exercises only the fast path at `:438-439`. It proves the method is callable,
not that the flag branches are reachable. *"A consumer could set `.flags` — it is a public field."*
It is public and untyped-as-API (`flags: number`), with no documented constants exported; and if a
consumer did set it, `many()`/`sepBy()`/`then()`/`all()` all invoke `this.parser(state)` directly
(`parser.ts:531, 604, 84`; `leaf.ts:44, 193`), bypassing `.call()` entirely — so the flags would be
honoured only at the one call site that no longer exists.

### D-08 — `ParserState.clone()` copies 5 of 8 fields, silently dropping the diagnostic substate

**Severity: MAJOR** · `state.ts:101-109` vs the fields declared at `state.ts:43-45`

```ts
clone(): ParserState<T> {
    return new ParserState<T>(this.src, this.value, this.offset, this.isError, this.furthest);
}
```

`expected`, `suggestions`, `secondarySpans` are not copied. Measured:

```
clone of a state with expected=["<x>"], suggestions=[…], secondarySpans=[…]
  →  expected: undefined   suggestions: []   secondarySpans: []
```

`clone()`'s only production caller is packrat's `recall()` scratch re-evaluation
(`packrat.ts:351`), so within a left-recursive grow pass the accumulated expected-set is
discarded — and the two fresh `[]` allocations are paid to discard it. A method named `clone` that
loses 3/8 of the object is a correctness trap for any future caller.

**Falsifier (survived).** *"The diagnostic substate is per-parse, not per-state, so dropping it is
deliberate."* The header comment at `state.ts:37-42` says the opposite: these fields exist *on the
state* precisely so error tracking is "threaded per-parse" rather than global. And `utils.ts:20-26`
argues the same design at length. Dropping them in `clone()` contradicts the stated model.

### D-09 — `ParserFunction<T>`'s type parameter is unused; 34 cast sites assert nothing

**Severity: MAJOR** · `parser.ts:14-16`

```ts
export type ParserFunction<T = string> = (val: ParserState<any>) => ParserState<any>;
```

`T` appears nowhere in the signature. Every `as ParserFunction<X>` in the tree — **34 sites** across
`parser.ts` and `leaf.ts` (`grep -c "ParserFunction<"`) — is a cast to a type that is structurally
identical for all `X`. `as ParserFunction<T[]>` (`parser.ts:560`), `as ParserFunction<S>`
(`parser.ts:141`), `as ParserFunction<Result>` (`leaf.ts:57`) are all the same type. They read as
type-preserving plumbing and preserve nothing; a wrong one would never be caught. This is the
central type of the library — `Parser`'s only constructor parameter (`parser.ts:30`).

**Falsifier (survived).** *"The `any` is required for variance, as the eslint-disable comment at
`:13` says."* The `any` in the parameter positions may be; that does not require `T` to be
**absent**. `(val: ParserState<any>) => ParserState<T>` would keep the variance escape hatch on the
input and make the 34 casts mean something on the output. *"It's a phantom type for documentation."*
A phantom type that no checker reads and that defaults to `string` on a type whose instantiations are
overwhelmingly `T[]`, `S`, and `Result` is worse than no parameter: it is documentation that is
wrong in most of its uses.

### D-10 — the `lazy` decorator is legacy-form under a tsconfig that has no `experimentalDecorators`, and its doc-comment is false

**Severity: MAJOR** · `lazy.ts:26-43`, exported at `core.ts:15`

`tsconfig.json` sets `"target": "ES2022"` with **no** `experimentalDecorators`. TypeScript 5.8
(`package.json` devDependency `^5.8.0`) therefore defaults to **TC39 stage-3** decorators, whose
signature is `(value, context)`. `lazy` is written in the legacy three-argument form
(`target, _propertyName, descriptor: TypedPropertyDescriptor<…>`) and mutates `descriptor.value`
without returning. **It cannot be used as a decorator under this repository's own compiler
settings.** It has zero usages: `grep -rn "@lazy" src/ test/` → no matches.

Second defect, independent of the first — the JSDoc at `lazy.ts:27-29` claims "Defers parser
construction until first invocation, **then caches**". The body:

```ts
descriptor.value = function () {
    return new Parser(createLazyCached(method), createParserContext("lazy", undefined, method));
};
```

allocates a **fresh** `Parser` with a **fresh** `createLazyCached` closure — i.e. a fresh cache — on
every call. Two calls to the decorated method produce two parsers with two independent caches, each
invoking `method()` once. Nothing is cached across calls. The sibling in the same file,
`getLazyParser` (`lazy.ts:7-15`), does cache correctly via a `WeakMap` — so the file contains a
working reference implementation ten lines above the broken one.

Third: `descriptor.value!.bind(target)` (`lazy.ts:35`) binds to the **prototype** (what a legacy
method decorator receives as `target`), so `this` inside the rule body is the prototype, not the
instance.

**Falsifier (survived).** *"A consumer can enable `experimentalDecorators` themselves."* They can —
and then hit the caching and `this`-binding defects. The point stands that the shipped surface is
untestable and untested under the repository's own configuration.

### D-11 — PT-01 corroborated at source, and sharpened: there is no label-without-console path

**Severity: MAJOR** · `parser.ts:67-69` · `utils.ts:33, 38` · O-15 **PT-01**

O-15's dist cites verify exactly. `dist/diagnostics-DDazRHgl.js:14` is
`state.expected = diagnosticsEnabled && label ? [label] : void 0;`. The `console.error` sits at
`dist/packrat-entry-CS1td-8B.js:**882**` inside `if (isDiagnosticsEnabled())` at `:881` — O-15 cited
`:881`, the guard line; the call is one line below. Immaterial, but recorded for exactness.

Sharpening the letter: the coupling is **total in both directions**. `expected` is populated *only*
when `diagnosticsEnabled` (`utils.ts:33` and `:38` — both arms gated), and enabling it arms an
**unconditional** `console.error(this.state.toString())` on every failed top-level parse
(`parser.ts:67-69`). `toString()` routes to `statePrint` (`state.ts:137` → `debug.ts`), which is the
full rendered error frame. There is no `enableDiagnostics({ silent: true })`, no logger injection at
this site (contrast `Parser.debug()`, which *does* accept a `logger` parameter at `parser.ts:693`),
and no way to read labels without it. A library consumer that wants an expected-set — the whole point
of the tier — must accept unconditional stderr writes from inside a parse.

**Falsifier (survived).** *"A consumer can stub `console.error`."* Globally, for all code in the
process, for the duration of every parse. That is not a library affordance; it is a workaround whose
cost is borne by unrelated modules. *"O-15 already said this."* O-15 said the two are "reachable only
together"; this adds the *reason* — the gate is inside `mergeErrorState`, not at the render site —
which is what makes it a design defect rather than a missing option.

### D-12 — PT-03 corroborated at source, and sharpened: the latch arms at **construction**, so one memoizer taxes every unrelated parse in the process forever

**Severity: MAJOR** · `packrat.ts:156, 290, 217, 266` · O-15 **PT-03**

Verified at the bytes, both trees:

| | source | dist |
|---|---|---|
| initialiser `= false` | `packrat.ts:156` | `packrat-entry-CS1td-8B.js:678` |
| assignment `= true` | `packrat.ts:290` | `:722` |
| reads | `:217`, `:266` | `:682`, `:714` |
| any assignment back to `false` | **none** | **none** |

`grep -n "PACKRAT_ARMED"` returns exactly those rows in both. O-15's line cites are **exact**.
`resetPackrat()` (`packrat.ts:262-272`) clears `MEMO`/`HEADS`/`GROWING` and nulls `LR_STACK` /
`CURRENT_SRC` but does not touch the latch — corroborating O-15's measurement that `resetPackrat()`
leaves the cost at 139.3 ns vs 138.2 armed vs 93.9 unarmed (**1.47×**).

Sharpening: the latch arms inside `makeMemoized` (`packrat.ts:290`) — at **wrapper construction**,
explicitly and deliberately ("Arming at CONSTRUCTION (not first invocation)", `:287-289`). The
consequence the comment does not draw: arming is **process-global and grammar-agnostic**. A module
that constructs `memoize(expr)` at import time — the normal shape for a left-recursive grammar —
permanently converts every subsequent top-level `parseState()` **anywhere in the process**, for
**every unrelated grammar**, into a three-`Map` allocation plus a five-field snapshot object
(`packrat.ts:218-230`). For value.js, importing any left-recursive parse-that grammar would tax the
CSS colour path — which never memoizes — at O-15's measured 1.47×.

Second-order finding, offered as **UNPROVEN-but-reasoned**: if the first memoizer is constructed
*during* a parse (the standard `Parser.lazy(() => memoize(rule))` idiom, where `createLazyCached`
calls `fn()` on first invocation — `lazy.ts:21`), that parse's `packratEnter()` already returned
`null` and installed no epoch. Its memo writes therefore land in the module-init globals and are
never discarded, because `packratExit(null)` is a no-op (`packrat.ts:243`). Subsequent parses
snapshot-and-replace those tables, so **no cross-input mis-restore occurs** — I checked this
specifically and it is sound — but the first parse's cells (including its parsed values) are
retained for process lifetime unless `resetPackrat()` is called explicitly, which nothing documents
as required. Classified MINOR-retention, folded into D-24; recorded here because the reasoning had to
run to clear the soundness question, and clearing it is a result.

### D-13 — `dispatch()` silently drops non-ASCII table keys while its label still advertises them

**Severity: MAJOR** · `leaf.ts:101, 116-124, 128-132`

`const tbl = new Int8Array(128)`. Keys are written by `tbl[chars.charCodeAt(i)] = idx`
(`leaf.ts:122`). For any key outside `0..127`, this is an out-of-bounds typed-array write — a
**silent no-op** in both strict and sloppy mode. Verified: `tbl["é".charCodeAt(0)] = 0` then
`tbl[233]` → `undefined`, array length still 128.

Meanwhile the label is built from `Object.keys(table)` unconditionally (`leaf.ts:128-132`), so the
error message advertises a character the table structurally cannot dispatch on. Measured:

```
dispatch({ "é": string("état"), "a": string("abc") }).parseState("état")  →  isError: true
```

No throw, no warning, no build-time check. A CSS/i18n grammar keyed on any non-ASCII first character
fails silently and its diagnostics lie about why.

**Falsifier (survived).** *"The JSDoc says 'Maps ASCII characters to parsers' (`leaf.ts:83-84`)."* It
does — and `Record<string, Parser<T>>` (`leaf.ts:100`) accepts every string, so the type system
invites the mistake the doc-comment quietly forbids. A `RangeError` at construction (the posture
`getCijKey` takes for its own budget overflow, `packrat.ts:94`) would cost nothing and is the
library's own established idiom.

### D-14 — PT-04 corroborated; the specific number **contradicted** — the ceiling is stack-size dependent, not 7,761

**Severity: MAJOR** · no depth guard anywhere in `parser.ts` / `lazy.ts` / `leaf.ts` · O-15 **PT-04**

O-15 records "`Parser.lazy` arity 1, deepest OK **7,761**, thrown `RangeError` at 7,762". I could not
reproduce that boundary, and the tree explains why: **there is no ceiling in the library at all.**
No depth counter, no `maxDepth` option, no typed `DepthExceededError` — the limit is purely the V8
frame budget, which is a launch-flag and platform property.

Measured, same construction (`Parser.lazy` chain, arity 1), against `dist/core.js`:

| node stack | deepest OK | first failure |
|---|---|---|
| default | ≥ 9,000 | 10,000 → `RangeError: Maximum call stack size exceeded` |
| `--stack-size=1000` | 10,000 | 12,000 → same |

**Explicit contradiction with the corpus**: O-15's "7,761 / 7,762" is *one harness on one machine*,
not a property of the library — and it should not be carried into X.P.W1's **G-9** as a fixed
expectation, because a gate asserting 7,761 will flap on any runner with a different stack budget.
This *strengthens* O-15's underlying point (there is no bounded, typed depth posture) while
correcting the number's status from ceiling to observation. O-15's own "N=1, one machine" bound was
stated for PT-03; it applies to PT-04 with equal force and was not attached there.

Consequence for value.js: nested CSS (`calc((((…))))`) from untrusted input produces a raw
`RangeError` crossing the library boundary, on a platform-variable threshold. Project memory records
the same class biting before — the `ValueUnit` nesting recursion that hit the limit at ~294 frames on
iOS Safari specifically because its stack is smaller. A stack-dependent ceiling is exactly the shape
that passes CI and fails on a phone.

### D-15 — PT-07 boundary posture corroborated 5/5 at the live dist

**Severity: MAJOR** · `parser.ts:34, 52` · O-15 **PT-07**

`parseState(val: string)` performs no runtime validation; `new ParserState(val)` stores whatever it
is given, and the first `charCodeAt`/`.length` access throws. Measured against `dist/core.js`:

| input | thrown |
|---|---|
| `null` | `TypeError: Cannot read properties of null (reading 'charCodeAt')` |
| `undefined` | `TypeError: Cannot read properties of undefined (reading 'charCodeAt')` |
| `42` | `TypeError: state.src.charCodeAt is not a function` |
| `{}` | `TypeError: state.src.charCodeAt is not a function` |
| `["a"]` | `TypeError: state.src.charCodeAt is not a function` |

5/5, exactly as O-15 measured. The messages leak library internals (`state.src`) and carry no parser
identity, no offset, no input excerpt. O-15's disposition — a named JS-boundary invariant **above**
parse-that, our cure not their ask — is **endorsed unchanged**; see B-2 for why that invariant must
also cover the success-shaped-failure case.

### D-16 — `mapState` mints a prototype-chained view object per invocation — the exact hazard the sibling module documents avoiding

**Severity: MAJOR** · `parser.ts:176-180` vs `lazy.ts:17`

```ts
const oldView = Object.create(state);
oldView.offset = oldOffset;
oldView.value  = oldValue;
return fn(state, oldView);
```

`Object.create(state)` produces an object whose prototype is a `ParserState` **instance**, with two
own properties added post-creation. That is a distinct hidden class from `ParserState` and from every
other `oldView` shaped by a different property-addition order — so any user callback that touches
both `newState` and `oldState` sees two shapes at one site and its inline caches go polymorphic, then
megamorphic. `lazy.ts:17` names this hazard by name — *"avoids mutating function objects
(megamorphic IC pollution)"* — while `mapState` commits it forty lines away in the hotter module.

The comment at `parser.ts:169` justifies it as *"avoids full clone on success"*. It trades a
`clone()` (a monomorphic `new ParserState(...)`, five arguments, one shape) for a dictionary-prone
`Object.create` — the more expensive of the two on every modern V8.

`mapState` has **zero** call sites in `src/` or `test/` outside its own definition and the
`parserNames` registry (`state.ts:167`).

**Falsifier (survived).** *"`Object.create` is cheap and V8 handles it."* V8 handles the allocation;
it does not unify the hidden class. *"Zero call sites means zero impact."* Then it is dead code on a
published surface (D-25), which is the other finding — it cannot be both harmless and worth
shipping.

### D-17 — the gate that names this module tests existence, not the isolation claim

**Severity: MAJOR** · `test/subpath-gate.mjs:44-55`

`proof:subpath` — the only gate that exercises `./core` — asserts:

```js
if (typeof core.Parser !== "function") fail(…);
if (typeof core.dispatch !== "function") fail(…);
if (typeof packrat.memoize !== "function") fail(…);
```

Three `typeof` checks. The gate verifies that the subpath **resolves**; it never verifies the one
property `core.ts` exists to provide. A single assertion — that the module graph reachable from
`./core` does not contain the packrat or diagnostics chunk — would have failed on the day it was
written and would have caught D-03 at build time. `dist-surface.test.ts` likewise checks exported
names, not the graph.

**Falsifier (survived).** *"Bundle-graph assertions are brittle."* The repository already ships nine
`proof:*` scripts including `proof:no-span-surface` and `proof:no-dead-combinator`, which are
precisely this kind of structural assertion over the built artifact. The idiom exists; it was not
pointed at the claim.
*(Note for the value.js side: the `proof:*` class is dead law in **our** tree — the 2026-06-02
never-reintroduce ruling, re-affirmed by atlas H-3 at INBOX I-27. This finding observes what
parse-that's own gates do and do not cover; it is **not** a recommendation to author `proof:*` scripts
anywhere in value.js.)*

---

## 3. MINOR

**D-18** — `ParserState` allocates two throwaway arrays per construction (`state.ts:44-45`), and
`mergeErrorState` reallocates two more on **every** furthest-offset advance (`utils.ts:34-35`),
unconditionally — the reset is outside the `diagnosticsEnabled` gate that guards their only writers
(`utils.ts:52-53, 58-59`). Verified: after a failing parse with diagnostics off, `suggestions.length
=== 0` — the arrays were allocated to hold nothing. In a backtracking grammar `mergeErrorState` fires
on essentially every leaf failure, so this is the highest-frequency allocation on the error path.
*Falsifier considered*: "V8's young-generation collector makes short-lived arrays free." Nearly free
to collect, not free to allocate — and the write barrier on `state.suggestions = []` is paid per
advance regardless.

**D-19** — `new Array(n)` in `many()` (`parser.ts:526`), `sepBy()` (`parser.ts:572`) and `fuseAll`'s
general arm (`leaf.ts:257`) creates **HOLEY** element-kind arrays, while the arity-2/3 unrolled arms
use packed literals `[undefined, undefined]` (`leaf.ts:191, 222`). V8's element-kind lattice is
one-way: filling the holes never restores PACKED, so every subsequent load pays a prototype-chain
check. The file contains both the right and the wrong choice, 60 lines apart, with the wrong one on
the general path.

**D-20** — `errorState.expected = state.expected` (`parser.ts:62`, and `:63-64` for the other two)
aliases rather than copies. Verified: `parseState()`'s return and `p.state` share the array
identity. `collectDiagnostic` gets this right two files away (`utils.ts:120-122` uses `[...spread]`).

**D-21** — `regex()` strips only `y` before re-adding it (`leaf.ts:321-322`), forcing sticky matching
on a pattern the caller may have written for non-sticky use. A `^`-anchored pattern then never
matches at `offset > 0`. Verified: `all(string("a"), regex(/^\d+/)).parseState("a12")` →
`isError: true`; the same grammar with `/\d+/` → `false`. Silent, and `^` is the most common idiom a
consumer ports from other combinator libraries.

**D-22** — `regex()`'s `label` is built from `r.flags` (`leaf.ts:324`), the **original** flags, while
the parser executes `sticky` with modified flags (`leaf.ts:322`). The diagnostic advertises a regex
that is not the one that ran.

**D-23** — `regex()`'s custom-match arm reads `sticky.lastIndex` at `leaf.ts:340`, **after** invoking
user code at `:337`. `sticky` is captured per-parser and shared across invocations, so a
`matchFunction` that runs any regex against the same object — or re-enters the same parser —
corrupts the offset arithmetic. *Falsifier*: no current consumer passes a re-entrant `matchFunction`,
so this is latent, not live. Recorded at MINOR for that reason.

**D-24** — packrat retention: the first-parse-arms path (analysed under D-12) leaves memo cells,
including parsed values, in the module-init `MEMO` for process lifetime, recoverable only by an
explicit `resetPackrat()` that nothing documents as required. **Not** a soundness defect — I traced
the snapshot/restore and confirmed no cross-input mis-restore is reachable.

**D-25** — dead public surface reachable from `core`: `ParserState.save()` / `restore()` / `err()` —
**zero** callers in `src/` or `test/`; `mapState` and `recover` — zero callers outside their own
definitions and the `parserNames` registry; `spanToString`, `mergeSpans`, `getLineNumber`,
`getColumnNumber`, `getLineAndColumn` — zero tests. `getLazyParser` has exactly one caller, in
`debug.ts:318`, i.e. the tier `core` claims not to pull.

**D-26** — `getLazyParser` (`lazy.ts:8-11`) tests `cached !== undefined`, so a memoized function that
ever returns `undefined` is re-invoked forever — the cache silently degrades to a no-op. Its map is
typed `WeakMap<Function, unknown>`, using the `Function` type that typescript-eslint's
`no-unsafe-function-type` exists to forbid, in a repo that otherwise annotates every `any` with a
justifying disable comment (`parser.ts:13`, `leaf.ts:27`).

**D-27** — cohesion: `splitBalanced` / `containsDelimiter` (`split.ts`) are, by their own header
(`split.ts:1-4`), "format-time text processing" for "BBNF-generated `toDoc()` code". They are neither
parsers nor combinators nor state, yet they are published in a surface whose header calls itself "the
zero-side-effect primitive set" of the parser core (`core.ts:3`). They are also the only members with
substantial test coverage (13 hits in `test/split.test.ts`) — a tell that they belong to a different
tier that has a different consumer.

**D-28** — `splitBalanced` has no escape handling: a backslash-escaped quote inside a quoted section
toggles `inString` (`split.ts:30-37`), so `"a\",b"` splits inside the string. Quote nesting is
likewise flat. Acceptable for BBNF doc-generation input; undocumented as a limitation, and the
function is on the general-purpose `core` surface where a consumer will reach for it with arbitrary
text.

**D-29** — `Parser.eof()` (`parser.ts:638-642`) allocates a fresh `eof()` parser **and** a `skip()`
parser per call, then immediately overwrites the context `skip()` just built (`:640`). Three
allocations, one discarded, per `.eof()`.

**D-30** — `package.json:6` declares `"sideEffects": false`, but the module graph has a required
top-level side effect: `_initWhitespace()` (`parser.ts:711`; `dist/packrat-entry-CS1td-8B.js:1416`)
is what gives the exported `let whitespace` (`leaf.ts:395`) a value. The declaration is currently
harmless because the binding lives in the same emitted chunk as the call, but it is a false purity
claim on a graph whose one required initialiser is load-bearing for a `core` export.

---

## 4. SUPERLATIVES (L-18 runs both ways)

**S-1 — the zero-allocation result discipline is real and held.** `ParserState.ok/err/from`
(`state.ts:55-73`) mutate in place and return `this`; **every** combinator in `parser.ts` and
`leaf.ts` threads one state object through the whole parse with `savedOffset` locals for
backtracking. Twenty-plus combinators, no exceptions, no result wrapper allocated per step. For a hot
parser this is the correct architecture and the consistency is the achievement — one combinator
returning a fresh state would poison the invariant, and none does.
*Falsifier*: "in-place mutation is just how combinators are written." It is not — arcsecond,
parsimmon and parjs all allocate a result object per step. This is a deliberate, uniformly-enforced
divergence.

**S-2 — `getCijKey` is a model of how to handle a numeric-precision hazard.** `packrat.ts:79-100`
names the *previous* bug (`id << 32` overflowing int32 at `id >= 4096`, aliasing
`getCijKey(4096,0) === getCijKey(0,0)`), derives the replacement from the float64 mantissa ceiling,
shows the 32+21=53 bit budget arithmetic, and then **fails loud** with a `RangeError` at the boundary
rather than aliasing (`:94-97`). The comment preserves the reasoning so the next reader cannot
re-introduce the shift. Hazard named, bound computed, gate installed, history retained — this is the
standard the rest of the library should be held to, and D-13's silent `Int8Array` OOB is the same
class of hazard handled the opposite way in the same package.

**S-3 — the re-entrancy hardening is genuinely sound, at two levels.** `parseState` wraps
`parseStateInner` in `try/finally` around `packratEnter`/`packratExit` (`parser.ts:43-48`), and
`growLR` wraps its grow loop in a second `try/finally` restoring the per-head `GROWING`/`HEADS`
bookkeeping (`packrat.ts:390-406`). I traced the nested-parse and mid-grow-throw paths specifically,
including the awkward arm-mid-parse case (D-12), and found **no** reachable cross-input mis-restore.
The PT-Q1 regression it replaced (per-node reset inside `memoizeFn`, which wiped an outer grow's
cells) is documented with its exact failure mode at `packrat.ts:169-172`. Fixing a re-entrancy bug
*and* leaving the falsified prior design in the tree as a warning is rare.

**S-4 — `fuseAll`'s unrolling makes the right V8 choices for the right stated reason.**
`leaf.ts:179-273`: arity-2 and arity-3 fully unrolled into positional closures with constant-folded
parser bindings, packed-literal result arrays, one array per invocation instead of the N−1 nested
2-tuples `a.then(b).then(c)` would build. The comment states the consumer shape it targets ("the
value.js hot shapes — 59 `all()` sites") rather than asserting a generic speedup. That D-19 shows the
general arm regressing to `new Array(n)` does not diminish the unrolled arms; it makes them the
correct reference the general arm should be conformed to.

**S-5 — the PT-Q5 `subTable` retraction.** `leaf.ts:88-98` records a shipped optimisation being
**deleted** because it had zero production consumers and was gated against a synthetic corpus no
consumer runs, with an explicit re-entry condition ("if value.js's coordinated Q session measures an
on-path win … not before"). Removing one's own optimisation for want of a real consumer is the rarest
discipline in a performance-oriented library, and the note makes the retraction auditable rather than
silent.

**S-6 — the two classic combinator footguns are both closed.** `many()` guards zero-width matches
(`parser.ts:538`: `if (state.offset === savedOffset) break;`) — without it a nullable inner parser is
an infinite loop. `sepBy()` checkpoints **before** the separator (`parser.ts:595`, restored at `:608`)
so a trailing separator is rejected by backtracking past it, with the design decision stated as a
grammar-vs-combinator boundary at `:566-568`. Both are the errors this genre of library ships with;
both are handled, and one is handled with its rationale.

---

## 5. Corpus relation (fold, not re-invent)

| corpus id | this challenge |
|---|---|
| O-15 **PT-01** | **CORROBORATED at source + SHARPENED** → D-11. Dist cites verified; `console.error` is at `:882`, the `isDiagnosticsEnabled()` guard O-15 cited at `:881`. Added: the gate lives inside `mergeErrorState`, so no label-without-console path can exist. |
| O-15 **PT-03** | **CORROBORATED at the bytes + SHARPENED** → D-12. `grep -n PACKRAT_ARMED` returns exactly O-15's four dist rows (`:678` false · `:722` true · reads `:682`/`:714`), zero assignments back to false, in both source and dist. Added: arming is at *construction*, hence process-global and grammar-agnostic. |
| O-15 **PT-04** | **CORROBORATED in kind, CONTRADICTED in number** → D-14. No depth guard exists anywhere; the ceiling is stack-budget dependent (default node: ≥9,000 OK / 10,000 fails; `--stack-size=1000`: 10,000 OK / 12,000 fails). "7,761/7,762" is one machine's observation. **X.P.W1 G-9 must not assert it as a constant.** |
| O-15 **PT-07** | **CORROBORATED 5/5 + SHARPENED past the letter** → D-15, B-2. The failure return is not `undefined` — it is a success-shaped value (`"ab"`, `[]`). O-15's cure posture (a JS-boundary invariant above parse-that) is endorsed and must widen to assert on `state.isError`, never on the return. |
| `X/parse-that/waves/W1.md` §2c | Constraint honoured: no measurement here ran with the latch armed or diagnostics coupled. Per **L-16**, every number above is labelled: §1–§3 measurements are **API-TEST** against the published `dist/`; none is a BENCH-PROCESS and none is offered as a proof of the product. |
| `X/parse-that/waves/W1.md` OP-3 | Noted: this challenge measured `parse-that/typescript/dist` **as committed at `ef10d5b`**, not the prototype workspace's `node_modules` copy. A workspace reinstall changes those bytes; the chunk hashes cited (`packrat-entry-CS1td-8B.js`, `diagnostics-DDazRHgl.js`) pin what was read. |
| `registry/adjudicated/parser-band.md` | The 22-row divergence ledger and the R1 crash class are grammar-level; B-1 and D-04 are **engine**-level and are not in it. The band's "totality without try/catch" DISSENT (cand-F) gains a datum: with B-1 live, a totality claim over any grammar with nullable trailing regexes cannot hold on this engine. |
| `X/parse-that/waves/W2.md` | No overlap claimed. W2's algebra candidates concern the CSS grammar layer; every finding here is below it, in the combinator engine. |

---

## 6. Struck claims (raised, did not survive falsification)

Recorded so the next auditor does not re-spend the hours.

1. **"Duplicated diagnostics module state across chunks."** Hypothesised that `dist/diagnostics.js`
   and the core path each carry their own `diagnosticsEnabled`, so `enableDiagnostics()` from the
   `/diagnostics` subpath would not affect a `/core` parse. **FALSE.** Both resolve to the single
   `diagnostics-DDazRHgl.js` chunk (`dist/diagnostics.js:1`, `packrat-entry-CS1td-8B.js:1`). One
   module instance, one flag. Correct build behaviour.
2. **"Packrat cross-input unsoundness when the latch arms mid-parse."** Traced fully; the
   snapshot/restore ordering makes mis-restore unreachable. Downgraded to retention only (D-24). The
   PT-Q1 fix is correct.
3. **"`Int8Array` index overflow at >127 interned parsers in `dispatch`."** Bounded: at most 128 ASCII
   slots exist, so a reachable index cannot exceed 127. Only the *key*-side OOB is real (D-13).
4. **"Circular-import initialisation hazard on `whitespace`."** Traced the ESM evaluation order
   (`core` → `parser` → … → `leaf` → back to partially-initialised `parser`); `_initWhitespace()` at
   `parser.ts:711` runs after `leaf.ts`'s body completes. Sound. Only the `sideEffects: false`
   declaration is questionable (D-30).
5. **"`.parse()` on a stack overflow leaves the packrat epoch open."** `parseState`'s `finally`
   (`parser.ts:46-48`) restores it. Sound.

---

## 7. Disposition

`core.ts` as a file is 26 correct lines. The module **fails its own axis** on two counts that are not
about the file: it publishes a surface with two blocker-grade engine defects (a nullable regex that
fails at end of input, B-1; and an API that returns success-shaped values on failure, B-2), and its
single documented product — tier isolation — does not exist in the artifact it ships (D-03, ≈34% of
the dragged chunk plus a hard diagnostics import).

The engine underneath is not weak — S-1 through S-6 are real, and S-2's fail-loud precision posture
is a standard most parser libraries never reach. That is what makes B-1 and D-13 sting: the package
demonstrably knows how to name a hazard and gate it, and did not, at two boundaries where a
three-line guard was available.

**Nothing here is an ask on parse-that.** Consistent with O-15's posture, the value.js-side cures are
ours: the JS-boundary invariant (B-2 + D-15), a depth bound above the library (D-14), and — if
`/core` is adopted for payload reasons — a measurement of D-03 before that reason is believed.
