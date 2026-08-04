`claude-opus-5[1m]`

# CHALLENGE · `parse-that` module **index** · axis **L (LIBRARY)**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/index.ts` (14 lines, barrel).
**Read whole**: `index.ts` + every module it re-exports — `parser.ts` (711) · `state.ts` (189) · `utils.ts` (186) · `lazy.ts` (43) · `packrat.ts` (488) · `leaf.ts` (399) · `split.ts` (58) · `parsers/{index,json,csv,utils}.ts` (8/52/20/23) — plus the transitive `debug.ts` (383) / `ansi.ts` (17), the four sibling subpath entries (`core.ts` · `diagnostics.ts` · `packrat-entry.ts` · `utils-entry.ts`), `package.json`, `test/subpath-gate.mjs`, `scripts/proof-packrat-armed.mjs`, and the **published `dist/`** bytes.
**Posture**: module assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its own falsifier. Superlatives carry the same burden (L-18 runs both ways). All runtime evidence is a throwaway `node --input-type=module -e` process against `dist/parse.js` — **no bench, no `enableDiagnostics()`, no `memoize()`**, so the PT-03 latch was never armed in any measuring process. `parse-that` was read-only; `/Users/mkbabb/Programming/parse-that-css-totality-p2` was checked and **does not exist** (no STOP condition).
**Environment**: node v26.0.0 · darwin arm64 · 2026-08-04. `parse-that` HEAD `ef10d5b`, `typescript/src/parse/index.ts` last touched at `043c4d1` (S.H2, the 1.0.0 legacy cut).

**Hitherto corpus folded, not re-invented**: INBOX **O-15** (`value.js/docs/tranches/V/coordination/INBOX.md:77`, letter at `parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md`) — PT-01/PT-03/PT-04/PT-07; the X·P wave specs `docs/tranches/X/parse-that/waves/W1.md` (harness constraints G-4/G-5/G-9) and `W2.md` (algebra candidates, R-LAW-3, O-8, K-6); `docs/tranches/V/megatranche/registry/adjudicated/parser-band.md`. **Two O-15 rows are contradicted at the bytes below (B-1, B-3) and one cite is corrected (C-2).**

---

## SCORECARD

| | count |
|---|---|
| **BLOCKER** | 3 |
| **MAJOR** | 9 |
| **MINOR** | 7 |
| **INFO** | 1 |
| **defects total** | **20** |
| **superlatives** | **6** |
| corpus corrections | 2 (C-1 folded into B-1/B-3; C-2 standalone) |

---

## THE MODULE, VERBATIM

```ts
 1  // Barrel re-exports — all sub-modules
 2  export { Parser, type ParserFunction } from "./parser.js";
 3  export { ParserState, createParserContext, spanToString, mergeSpans } from "./state.js";
 4  export type { ParserContext, Span } from "./state.js";
 5  export { mergeErrorState, enableDiagnostics, disableDiagnostics, collectDiagnostic, getCollectedDiagnostics, clearCollectedDiagnostics, skipWhitespace, skipBlockComments } from "./utils.js";
 6  export type { Suggestion, SecondarySpan, Diagnostic } from "./utils.js";
 7  export { getLazyParser, createLazyCached, lazy } from "./lazy.js";
 8  export { memoize, mergeMemos, resetPackrat } from "./packrat.js";
 9  export { eof, any, dispatch, all, string, regex, trimStateWhitespace, whitespace } from "./leaf.js";
10  // The 15 closure-based `*Span` builders were EXCISED in the 1.0.0 cut (S.H2,
11  // fold row 48): a zero-consumer surface, deprecated in 0.13.0 (PT-Q4). Gate:
12  // proof:no-span-surface.
13  export { containsDelimiter, splitBalanced } from "./split.js";
14  export * from "./parsers/index.js";
```

**The audit thesis.** A barrel has exactly three jobs: name the public contract, cost nothing to import, and stay derivable from what it re-exports. This one fails all three. It publishes primitives whose runtime shape contradicts their published types (B-1, B-2), it publishes a boundary posture the hitherto corpus mis-describes (B-3), it charges every consumer 36 eager `Parser` constructions for domain parsers most will never call while `package.json` swears it has no side effects (M-1), and it is one of **five** hand-maintained export lists over the same symbol set with a gate that checks three symbols (m-4). The sub-modules underneath are, in places, genuinely excellent — the packrat key budget and the re-entrancy unwind are better than most published parser libraries — and the superlatives section says so at the same evidentiary standard.

---

## BLOCKERS

### B-1 · `.parse()`'s failure sentinel is **not** `undefined` — `many(min≥1)` / `sepBy(min≥1)` return a **truthy `[]`** on failure

**Severity**: BLOCKER · **Provenance**: `index.ts:2` (exports `Parser`) → `parser.ts:77-79`, `parser.ts:550-556`, `parser.ts:626-629`.

`parse()` is one line:

```ts
// parser.ts:77-79
parse(val: string) {
    return this.parseState(val).value;
}
```

`parseStateInner` (`parser.ts:51-75`) builds a separate `errorState` for *display* on the failure branch (`:61-66`) but **returns `state`** (`:74`) — the live state, whose `.value` is whatever the last combinator wrote. Two combinators write a non-`undefined` value on their own failure path:

```ts
// parser.ts:553-556 (many)          // parser.ts:626-629 (sepBy)
mergeErrorState(state ...);          mergeErrorState(state ...);
state.isError = true;                state.isError = true;
state.unsafeSetValue([]);            state.unsafeSetValue([]);
return state ...;                    return state ...;
```

**Measured** (`dist/parse.js`, node v26.0.0):

```
1  many(1).parse fail  -> []   typeof object   truthy? true
1b isError: true  value: []
1c sepBy(1).parse fail -> []   truthy? true
```

**Why BLOCKER.** The idiomatic JS-consumer guard is `const v = p.parse(s); if (v === undefined) fail()` — or worse, `if (!p.parse(s))`. Both report **success** for a failed `many(1)`/`sepBy(1)` parse and hand the caller an empty array as if the grammar had legitimately matched zero elements. This is a silent-wrong-answer at the library's most prominent entry point, reachable with two combinators and no configuration.

**This corrects the corpus (C-1a).** O-15 PT-07 states flatly: "**`.parse()` returns `undefined` on failure** — indistinguishable, at the type level, from a successful parse that legitimately produced `undefined`" (`valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md:75-76`). That is true only for leaf-shaped grammars. The real hazard is strictly worse than the letter describes: the failure value is **an arbitrary partial value**, not `undefined`, so the ambiguity is not `undefined`-vs-`undefined` but *any value* vs a real value. W2.md:294 already forbids the shape ("the frozen contract already forbids the PT-07 shape (`undefined`-on-failure)") — that prohibition must be widened: the algebra must forbid a value-carrying failure, not merely an `undefined`-carrying one.

**Falsifier.** Find any published entry point that reports failure without requiring the caller to hold the `ParserState`. There is none: `parse()` is the only value-returning entry, and it discards `isError`. Alternatively, show that `many`/`sepBy` do not write `[]` before returning an errored state — refuted at `parser.ts:555` / `:628` and by the measurement above. To falsify the *severity*, show that no consumer would branch on `parse()`'s return — refuted by the shape of the API, which offers nothing else, and by parser-band.md:108's own idiom rule ("entry via `parseState` + `isError`, **never `parse()` truthiness**"), which exists precisely because this trap was found empirically.

---

### B-2 · `all()`'s tuple type is a lie — its runtime arity is **data-dependent**

**Severity**: BLOCKER · **Provenance**: `index.ts:9` (exports `all`) → `leaf.ts:154-163` (type), `leaf.ts:161` (arity-1 shortcut), `leaf.ts:199, 207, 230, 238, 246, 267` (drop-`undefined`).

The declared type is a fixed tuple:

```ts
// leaf.ts:154-163
export function all<T extends Array<Parser<any>>>(...parsers: T) {
    type ExtractValue<T ...> = { [K in keyof T]: T[K] extends Parser<infer V> ? V : never };
    type Result = ExtractValue<T>;
    return makeParser(
        parsers.length === 1 ? parsers[0].parser : fuseAll<Result>(parsers), ...
    ) as Parser<Result>;
}
```

The runtime is not. Two separate divergences:

1. **Arity-1 short-circuit** (`leaf.ts:161`): `all(p)` returns a `Parser` whose `.parser` **is `p.parser` itself** — the inner function object, unwrapped. The value never enters an array. Type says `[V]`; runtime yields `V`.
2. **Drop-`undefined`** (`leaf.ts:199`, `:207`, `:230`, `:238`, `:246`, `:267` — `if (state.value !== undefined) out[w++] = state.value;` then `out.length = w`): any arm producing `undefined` is **elided from the result array**, shortening it. The arms that produce `undefined` are not exotic — `eof()` (`leaf.ts:14`), `.opt()` on failure (`parser.ts:241`), `regex` on an empty match (`leaf.ts:355`), and `regex` with a `matchFunction` returning `""` (`leaf.ts:342`).

**Measured**:

```
2  all(one).parse            -> "a"              isArray: false   (type says [string])
3  all(a, opt(b), c) on "abc" -> ["a","b","c"]   (len 3)
3  all(a, opt(b), c) on "ac"  -> ["a","c"]       (len 2 — type says [string, string|undefined, string])
4  all(a, eof()) on "a"       -> ["a"]           (len 1 — type says [string, unknown])
```

**Why BLOCKER.** Positional destructuring — the only reason to use a tuple-typed sequencer — is unsound: `const [x, y, z] = all(a, b.opt(), c).parse(s)` binds `z = undefined` and `y = c`'s value whenever `b` misses, with **no type error and no runtime error**. `tsc` cannot catch it; `noUncheckedIndexedAccess` cannot catch it (the type is a tuple, so indices are "known"); tests catch it only if they exercise the arm that elides.

**This contradicts the hitherto corpus.** `parser-band.md:108` records as a *shared virtue* of both adjudicated candidates: "fixed arity as `all()` typed tuples (zero `!` under `noUncheckedIndexedAccess`)". That claim is sound **only** under a side condition nothing in the library enforces — that no arm can ever yield `undefined`. The band discovered the side condition empirically and encoded it as an idiom rule on the same line — "`.opt()` only ever behind `.then()`/`.next()`, **never inside `all()`**" — and the wave-spec idiom gate `G8` (`parser-band.md:134`) hard-codes "no `opt` under `all()`". **That gate is a workaround for this defect, not an idiom preference**, and it is incomplete: it names `.opt()` but not `eof()`, not empty-matching `regex`, not `matchFunction`-returning-`""`. A grammar that puts `eof()` or `regex(/\s*/)` inside `all()` passes G8 and is still unsound.

**Falsifier.** Show the drop-`undefined` is modelled in the type — it is not; `ExtractValue` is an unconditional homomorphic mapped type over `T`. Show the behaviour is accidental and fixable without a contract break — it is not: `leaf.ts:172` records it as deliberate and load-bearing ("the EXACT drop-`undefined` + backtracking/offset-restore semantics of the original `all()`"). So the runtime is intentional and the **type was never updated to match it**. To falsify the arity-1 arm, show `all(p)` wraps — refuted by `leaf.ts:161` and measurement 2. (`any(p)`'s equivalent shortcut at `leaf.ts:76` is **correct** — its `Result` type is `V`, not `[V]` — see S-6.)

---

### B-3 · The non-string boundary is **three-valued** (throw / silent-reject / **silent-accept**), not "5/5 throw"

**Severity**: BLOCKER · **Provenance**: `index.ts:2` → `parser.ts:34-49` (`parseState`, zero input validation) → whichever leaf touches `state.src` first: `leaf.ts:12-19` (`eof`), `leaf.ts:285` / `:297` (`string`), `leaf.ts:327` / `:344` / `:350` (`regex`).

`parseState` (`parser.ts:34-49`) performs **no** validation of `val`. `parseStateInner` does `new ParserState(val)` (`:52`) and calls the grammar. Whether a non-string throws, rejects, or **parses** is therefore a property of the grammar's first leaf and of the value's duck-type, not of the library.

**Measured** — `regex(/[0-9]+/)` and `eof()` over nine non-string inputs:

| input | `regex(/[0-9]+/).parseState(v)` | `eof().parseState(v)` |
|---|---|---|
| `123` | **THREW** `TypeError: state.src.substring is not a function` | `isError=true` (no throw) |
| `null` | **THREW** `TypeError: Cannot read properties of null (reading 'length')` | **THREW** |
| `undefined` | **THREW** `TypeError: … (reading 'length')` | **THREW** |
| `{a:1}` | `isError=true` **(no throw)** | `isError=true` |
| `[1,2]` | **THREW** `state.src.substring is not a function` | `isError=true` |
| `true` | `isError=true` **(no throw)** | `isError=true` |
| `Symbol("s")` | **THREW** `TypeError: Cannot convert a Symbol value to a string` | `isError=true` |
| `new String("abc")` | `isError=true` (no digits) | `isError=true` |
| `0` | **THREW** `state.src.substring is not a function` | `isError=true` |

And the silent-**accept** arm, which no row of the corpus anticipates:

```
E1  regex(/[a-z]+/).parseState(new String("abc"))  -> isError=false  value="abc"   (typeof input: "object")
E2  eof().parseState([])                            -> isError=false   ← a NON-STRING parsed SUCCESSFULLY
E3  eof().parseState({length: 0})                   -> isError=false
E4  eof().parse([])                                 -> undefined
```

**Mechanism.** `eof` is `state.offset >= state.src.length` (`leaf.ts:13`). For `[]` that is `0 >= 0` → **true** → `state.ok(undefined)`. Any duck-typed `{length: 0}` is accepted as end-of-input. `regex` guards with the same expression (`leaf.ts:327`), so for a value whose `.length` is `undefined` the guard `0 >= undefined` is **false**, execution falls through, and `sticky.test(state.src)` **coerces the value to a string** (`leaf.ts:344`) — the parse proceeds against `"[object Object]"` / `"true"` / `"123"`, and only then may die at `state.src.substring(...)` (`leaf.ts:350`). A `String` object survives every step and **parses normally**.

**Why BLOCKER, and this is the sharpest corpus contradiction (C-1b).** O-15 PT-07 states: "**5/5 non-string inputs throw a raw `TypeError`** from `parseState` — not a parse failure, an exception, before any parsing semantics apply" (`…ask-addendum.md:73-74`). Every clause is false as a general statement: (a) it is not 5/5 — 3 of 9 do not throw for `regex`, 7 of 9 do not throw for `eof`; (b) it is not "from `parseState`" — `parseState` never touches `val`, the throw comes from a leaf, so the message and the throw-vs-not outcome **vary by grammar**; (c) it is not "before any parsing semantics apply" — `regex` runs a full `sticky.test` against the coerced string first, so parsing semantics apply to a coerced value; (d) most importantly, a non-string can **succeed**.

This is load-bearing on downstream work. `W1.md:582` records "The two GUARD rows are O-15 PT-07, **reproduced exactly**"; `W2.md:161-162` / `W2-fable-author.md:91-92` make "non-string inputs die at a named JS-boundary invariant above the algebra" a design law. A boundary invariant designed against *"it always throws, so catch it"* is the wrong shape: the guard must be a **positive `typeof x === "string"` admission test executed before any parse**, because there is no exception to catch on the `{a:1}` / `true` / `[]` / `new String(…)` paths and the last two can return a *successful* parse. The invariant as currently motivated would let `parseColor([])` through as a successful end-of-input match.

**Falsifier.** Show `parseState` validates `val` — `parser.ts:34-49` contains no `typeof` check, no coercion, no throw. Show the O-15 corpus was measured on a representative sample — the letter names five inputs and does not list them; the nine above span every primitive JS type plus the boxed-string and empty-array cases that break the claim. Show `eof().parseState([])` errors — measurement E2 says `isError=false`. To falsify the *severity*, show no realistic consumer passes a non-string — refuted by `parser-band.md:119`, which already makes "the JS-boundary non-string guard" a binding wave debt precisely because both adjudicated candidates hit it independently.

---

## MAJOR

### M-1 · `"sideEffects": false` is **false**: the barrel mints 36 `Parser` instances at import time

**Severity**: MAJOR · **Provenance**: `package.json:6` (`"sideEffects": false`) vs `index.ts:14` (`export * from "./parsers/index.js"`) → `parsers/json.ts:15-52`, `parsers/csv.ts:7-20` → `parser.ts:18, 25` (`let PARSER_ID = 0` / `id = PARSER_ID++`).

`parsers/json.ts` and `parsers/csv.ts` construct their entire grammars at **module scope** — `json.ts:15-52` builds ~12 parsers including a `dispatch()` table, `csv.ts:7-20` builds six more. Every `new Parser(...)` executes `id = PARSER_ID++` (`parser.ts:25`), a mutation of module-global state; `dispatch()` additionally allocates an `Int8Array(128)` (`leaf.ts:101`) and runs an O(n²) `indexOf` intern loop (`leaf.ts:104-111`); `regex()` compiles a second sticky `RegExp` per call (`leaf.ts:322`).

**Measured** (id of the first parser minted *after* import — i.e. the count minted *during* it):

```
root barrel (dist/parse.js): first fresh parser id = 37   → 37 instances built at import
./core      (dist/core.js) : first fresh parser id =  1   →  1 instance  (`whitespace`)
grep -c 'jsonParser|csvParser|jsonValue'  dist/parse.js = 3 · dist/core.js = 0
```

**36 `Parser` instances, 2 `Int8Array(128)`, and every JSON/CSV regex compiled**, charged to every consumer of `import { string } from "@mkbabb/parse-that"` who never touches JSON or CSV. `./core` is clean, which proves the cost is entirely the barrel's `export *`.

The contradiction is not a matter of degree. `PARSER_ID++` is observable global mutation; `package.json:6` asserts the package performs none. A bundler that trusts the flag is entitled to reorder or elide these evaluations, and a consumer who reasons about parser ids (packrat's `getCijKey` keys on them, `debug.ts:245`'s `PARSER_STRINGS` caches on them) gets a different id space depending on which entry point was imported first.

**Falsifier.** Show `new Parser` is side-effect-free — refuted at `parser.ts:25`. Show `export *` from `parsers/index.js` is tree-shaken at the *evaluation* level rather than the *export* level — refuted by the measurement: the ids were consumed in a real ESM import of the published `dist/parse.js`. Show the cost is negligible — 36 constructions against O-15 PT-03's own **93.9 ns whole-parse budget** is roughly the cost of the first several hundred parses, paid unconditionally at load; more to the point, the falsifiable claim here is the `package.json` contradiction, which is binary.

**Cure shape** (not requested, stated for the wave): make `parsers/{json,csv}` lazily constructed (`Parser.lazy`, already exported at `index.ts:2`), or drop `index.ts:14`'s `export *` in favour of the `./utils` subpath that already carries them (`utils-entry.ts:7-11`).

---

### M-2 · `whitespace` is an uninitialised `export let` published by the barrel, initialised by a module-scope call under `"sideEffects": false`

**Severity**: MAJOR · **Provenance**: `index.ts:9` (exports `whitespace`) → `leaf.ts:395` (`export let whitespace: ReturnType<typeof regex>;`, no initialiser) → `parser.ts:711` (`_initWhitespace();`, bare module-scope call) → consumed as a **default parameter** at `parser.ts:481`.

```ts
// leaf.ts:393-399
// `whitespace` is initialized from parser.ts after module evaluation to avoid
// constructing Parser instances during circular module initialization.
export let whitespace: ReturnType<typeof regex>;
export function _initWhitespace() { whitespace = regex(/\s*/); whitespace.context.name = "whitespace"; }
```
```ts
// parser.ts:711
_initWhitespace();
```
```ts
// parser.ts:480-488
trim<S>(parser: Parser<S> = whitespace as unknown as Parser<S>, discard = true) {
    ...
    if (parser.context?.name === "whitespace") {   // ← `parser.context` on `undefined` throws
```

`leaf.ts:1` imports `Parser` from `parser.ts`; `parser.ts:6` imports from `leaf.ts` — a genuine ESM cycle, resolved by deferring the construction. Under plain node ESM this works (measured: `core.whitespace !== undefined` → `true`), and the `let` + live-binding design is the correct shape for the cycle. The defect is the interaction with `package.json:6`.

`"sideEffects": false` maps to Rollup's `treeshake.moduleSideEffects: false`, under which a top-level call expression in a module whose used exports are otherwise reachable **may** be dropped, because the bundler has been told the module has no effects to preserve. `_initWhitespace()` is exactly such a statement. If it is dropped, `whitespace` ships as `undefined`, and the *first* `.trim()` with no argument dereferences `undefined.context` at `parser.ts:488` — a hard `TypeError`, at parse-graph construction time, in a bundled consumer only.

**Honest bound.** I did **not** run a bundler — that would be a write, outside my single-file mandate. Webpack's `sideEffects` flag is module-granular (it skips a module only when *no* export of it is used, and `Parser` is used by `leaf.ts`), so webpack is very likely safe. Rollup's statement-level `moduleSideEffects: false` is the exposed case. The claim is therefore: **the package makes a declaration that is false and that a documented bundler mode is entitled to act on**, not "every bundler breaks today".

**Falsifier.** Build the published tarball with Rollup, `treeshake.moduleSideEffects: false`, entry `import { string } from "@mkbabb/parse-that"; console.log(string("a").trim().parse(" a "))`. If `_initWhitespace()` survives, the exposure narrows to "a false `sideEffects` declaration with no observed victim" (still a defect, downgraded to MINOR). If it is elided, the crash reproduces. Either way `package.json:6` is falsified independently by M-1.

---

### M-3 · `Parser.prototype.toString()` **throws** for any parser built with the public constructor's default context

**Severity**: MAJOR · **Provenance**: `index.ts:2` (exports `Parser`) → `parser.ts:31` (`public context: ParserContext = {}`) → `parser.ts:698-700` (`toString()`) → `debug.ts:335-338`.

```ts
// debug.ts:335-338
const result = s ?? name;
if (!result) {
    throw new Error("parserPrint: missing parser context name");
}
```

`new Parser(fn)` — the two-argument constructor with the argument omitted — defaults `context` to `{}` (`parser.ts:31`), so `name` is `undefined`, the `switch` in `parserPrint` falls to `default: return undefined` (`debug.ts:330-331`), and `result = undefined ?? undefined` is falsy. **Measured**:

```
A   String(bareParser)  THREW  Error: parserPrint: missing parser context name
A2  `${bareParser}`     THREW  parserPrint: missing parser context name
```

**Why MAJOR, and why it is index-attributable.** `toString()` is invoked implicitly — template literals, `console.log` in a browser devtools inspection, `String(x)`, `x + ""`, `JSON.stringify` on an object with a custom replacer, and every error message that interpolates a parser. A library whose headline exported class throws on stringification converts a debugging action into a secondary exception that masks the original fault. The barrel publishes `Parser` (`index.ts:2`) with a public, documented constructor whose *default* argument produces this state, and publishes no way to construct a safe context without also importing `createParserContext` (`index.ts:3`) and knowing that its `name` must be one of the 29 strings in `parserNames` — **which the barrel does not export** (see M-4).

**Corpus link.** `parser-band.md:112` records that cand-F "builds `succeed`/`reject` on the public `Parser` constructor". Every such parser in cand-F's grammar throws on stringification, and the adjudication's recommended wave base inherits cand-F's labelled-failure debt (`parser-band.md:116`) — so the wave will construct more of them, not fewer.

**Falsifier.** Show `new Parser(fn)` is not a supported construction — `parser.ts:29-32` makes `context` optional with a default, and `leaf.ts:7-9`'s own `makeParser` helper passes `context?: ParserContext` (optional), so the library itself models a context-less parser as legal. Show `parserPrint` is unreachable from the public surface — it is `Parser.prototype.toString` (`parser.ts:698`), the most reachable method there is. Show the throw is intentional and documented — no doc comment on `parserPrint` mentions it, and the sibling `ParserState.toString` (`state.ts:136`) never throws.

---

### M-4 · The collected-diagnostics feature is **amputated by the barrel**: you can collect diagnostics but cannot render them

**Severity**: MAJOR · **Provenance**: `index.ts:5` exports `collectDiagnostic` / `getCollectedDiagnostics` / `clearCollectedDiagnostics`; `index.ts:6` exports the `Diagnostic` type; `parser.ts:653-688` implements `recover()`. The renderers — `formatDiagnostic` (`debug.ts:200`) and `formatAllDiagnostics` (`debug.ts:235`) — are exported from **no** entry point.

`Parser.recover(sync, sentinel)` (`parser.ts:653`) exists, per its own doc comment (`:645-651`), to let "`many()` / `sepBy()` loops keep going — each failed element produces a diagnostic but doesn't halt the overall parse." The consumer then calls `getCollectedDiagnostics()` and receives `readonly Diagnostic[]`. `debug.ts:200-241` contains a complete, ANSI-styled, compiler-grade renderer for exactly that array. It is unreachable.

**Measured** (root entry `dist/parse.js`, and every subpath):

```
formatAllDiagnostics exported?  false        isDiagnosticsEnabled exported?  false
formatDiagnostic     exported?  false        getCijKey            exported?  false
                                             parserNames          exported?  false
grep -c 'function formatDiagnostic' dist/parse.js dist/diagnostics.js dist/diagnostics-DDazRHgl.js  →  0 0 0
package.json exports map = { ".", "./core", "./diagnostics", "./packrat", "./utils" }   ← no "./debug"
ls dist/debug*  →  debug.d.ts  debug.d.ts.map      ← types ship; there is NO dist/debug.js
```

So the functions are tree-shaken out of every bundle (they are not shipped dead weight — that half is clean), but `dist/debug.d.ts` **is** shipped by `package.json:57` (`"files": ["./dist"]`), declaring `formatDiagnostic` / `formatAllDiagnostics` / `statePrint` / `parserPrint` / `parserDebug` with **no corresponding runtime file**. A consumer who finds the `.d.ts` and deep-imports `@mkbabb/parse-that/dist/debug.js` gets `ERR_MODULE_NOT_FOUND`.

Four further exported-from-source-but-not-from-the-barrel symbols compound it: `isDiagnosticsEnabled` (`utils.ts:16`) — a consumer cannot query the flag they set with the barrel's own `enableDiagnostics`; `popLastDiagnostic` (`utils.ts:146`) — no way to undo a collection; `parserNames` (`state.ts:141`) — the value backing `ParserContext["name"]`, needed to construct a valid context (see M-3); `getCijKey` (`packrat.ts:79`).

**Falsifier.** `import { formatAllDiagnostics } from "@mkbabb/parse-that"` → `undefined` (measured). Show a supported rendering path exists — `Diagnostic` (`utils.ts:84-93`) is a plain data record with `offset`/`furthestOffset`/`line`/`column`/`expected`/`suggestions`/`secondarySpans`/`found`, so a consumer *can* hand-roll a renderer; the defect is that the library ships one and hides it, duplicating ~40 lines of layout logic into every consumer. To falsify the `.d.ts` orphan claim, produce `dist/debug.js` — it does not exist.

---

### M-5 · Error recovery is **O(n) per diagnostic** → O(n·k) for k errors, in the feature designed to collect many

**Severity**: MAJOR · **Provenance**: `index.ts:5` exports `collectDiagnostic` → `utils.ts:102-128`; driven by `parser.ts:653-688` (`recover`).

```ts
// utils.ts:106-113
const before = src.slice(0, furthest);                                  // O(n) copy
const lastNl = before.lastIndexOf("\n");                                // O(n) scan
const line = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;  // O(n) copy + O(n) array
const column = lastNl === -1 ? furthest : furthest - lastNl - 1;
const found = src.slice(furthest, furthest + 20).replace(/\n/g, "\\n");
```

Four full-source passes plus one full line-array allocation **per collected diagnostic**. `recover()`'s stated purpose (`parser.ts:645-651`) is to survive many failures inside a `many()`/`sepBy()` loop, so k scales with the number of errors in the input, and n with the input. A 1 MB file with 200 recoverable errors performs ~800 MB of `slice` copying and allocates ~200 line-arrays — before anything is rendered.

The fix is textbook and the library already computes the ingredients: build a newline-offset index **once** per parse (the `ParserState` already exists and is threaded), then line/column is a binary search — O(n) once + O(log n) per diagnostic.

The same O(n)-per-call pattern recurs in the render path: `addCursor` does `state.src.split("\n")` (`debug.ts:58`) and `formatSecondarySpans` does it **again** (`debug.ts:100`), so `formatDiagnostic` splits the source twice per diagnostic and `formatAllDiagnostics` (`debug.ts:238`) maps that over the whole array — 2k full-source splits.

**Falsifier.** Show `furthest` is bounded independently of `n` — it is `state.offset` at the deepest failure (`utils.ts:29-31`), which for a late error is ≈ n. Show `recover()` is a rare path — its doc comment names the many-errors case as its purpose. Show `String.prototype.slice` on a substring is O(1) via V8 sliced strings — true for `slice`, but `.split("\n")` on the result is unconditionally O(n) with an array of every line, and `lastIndexOf` is an O(n) scan regardless.

---

### M-6 · Dead flag machinery on the hot object shape — `flags`, `call()`, `FLAG_EOF`, `unsafeCall` are all unreachable, and `.trim()` allocates a parser it throws away

**Severity**: MAJOR · **Provenance**: `parser.ts:20-22` (flag constants), `parser.ts:27` (`flags: number = FLAG_NONE` — a field on **every** `Parser`), `parser.ts:437-478` (`call()`), `parser.ts:466-476` (`FLAG_EOF` branch), `parser.ts:488-517` (`.trim()`), `state.ts:91-94` (`unsafeCall`).

```ts
// parser.ts:492-517 — the whitespace-trim path
const flaggedParser = new Parser(
    ((state) => inner.call(state)) as ParserFunction<T>,
    createParserContext("trimWhitespace", this as Parser<unknown>),
) as Parser<T>;
flaggedParser.flags = this.flags | FLAG_TRIM_WS;
// Also provide the inline version for direct .parser() callers
const whitespaceTrim = (state) => { /* … 14 lines … */ };
return new Parser(whitespaceTrim as ParserFunction<T>, createParserContext("trimWhitespace", …));
```

`flaggedParser` is constructed, has its `flags` set, and is **never returned, stored, or referenced again** — it is garbage the instant `.trim()` returns `whitespaceTrim`'s parser. Each `.trim()` therefore wastes one `new Parser` + one `createParserContext` (which allocates an `args` rest array, `state.ts:182-188`) + one closure, at grammar-construction time.

The consequence is larger than the waste. Grepped across the whole `src/`:

```
$ grep -rn "\.flags\s*=\|unsafeCall(\|FLAG_EOF" src/
src/parse/state.ts:92    unsafeCall(parser: Parser<unknown>): void {     ← definition only
src/parse/parser.ts:22   const FLAG_EOF = 2;                             ← definition only
src/parse/parser.ts:438  if (this.flags === 0) {                         ← read only
src/parse/parser.ts:442  if (this.flags === FLAG_TRIM_WS) {              ← read only
src/parse/parser.ts:466  if (this.flags & FLAG_EOF) {                    ← read only
src/parse/parser.ts:496  flaggedParser.flags = this.flags | FLAG_TRIM_WS; ← the DEAD parser
$ grep -rn "unsafeCall\b" src/ | grep -v "state.ts:92"     →  (empty)
$ grep -rn "\.call(" src/parse/*.ts                        →  parser.ts:493 only (inside the dead closure)
```

So: **`FLAG_EOF` is never set** — its entire branch (`parser.ts:466-476`), including the `"<end of input>"` label and the `trailing-content` suggestion, is unreachable dead code. `call()` (42 lines) is reachable only from the dead `flaggedParser`'s closure. `ParserState.unsafeCall` (`state.ts:91-94`) has **zero callers** — despite its doc comment calling itself "single choke point for combinator type casts". And `flags` is an eighth field on **every `Parser` instance** in every grammar, existing solely to be read by unreachable code.

**Falsifier.** Produce one live caller of `Parser.prototype.call` outside `parser.ts:493`, or one assignment to `.flags` on a parser that is returned. Produce one write of `FLAG_EOF`. Produce one caller of `unsafeCall`. Note `Parser.prototype.eof()` (`parser.ts:638-642`) does **not** use the flag — it composes `this.skip(eof())` and overwrites the context, confirming the flag path is vestigial. (`unsafeCallRaw`, `state.ts:97-99`, **is** live — `parser.ts:218, 313, 376, 402, 416`; the sibling being live is what makes `unsafeCall`'s deadness a real asymmetry rather than a naming artefact.)

---

### M-7 · `regex()` at EOF silently skips `mergeErrorState` — `furthest` is not advanced and the label is dropped

**Severity**: MAJOR · **Provenance**: `index.ts:9` (exports `regex`, and `mergeErrorState` at `index.ts:5`) → `leaf.ts:326-330` vs `leaf.ts:360`.

```ts
// leaf.ts:326-330 — the EOF arm
if (state.offset >= state.src.length) {
    state.isError = true;          // ← no mergeErrorState, no label
    return state;
}
…
// leaf.ts:360 — every OTHER failure arm
mergeErrorState(state as ParserState<unknown>, label);
state.isError = true;
```

`mergeErrorState` (`utils.ts:28-49`) is the sole writer of `state.furthest` and `state.expected`. The EOF arm bypasses it, so a regex that fails *because input ran out* contributes nothing to the furthest-offset tracking that `parseStateInner` renders errors from (`parser.ts:60`).

**Measured** (no diagnostics armed — `furthest` is updated unconditionally at `utils.ts:31`, only `expected` is flag-gated, so this is observable unarmed):

```
5   regex(/[0-9]+/).parseState("")   isError=true   furthest=-1   ← the hole
5b  regex(/[0-9]+/).parseState("x")  isError=true   furthest= 0   ← correct
```

**Consequence in composition.** In `string("a").then(any(regex(/[0-9]+/), string("b")))` against `"a"`, the regex alternative fails at EOF contributing no label, while `string("b")` merges at the same offset with label `"b"`. Under armed diagnostics the report reads `expected "b"` — **silently omitting every regex alternative that failed at end-of-input**. Since regex terminals are the library's dominant leaf (`parser-band.md:108`: "regexes are single-token terminals"), a truncated-input error — the single most common real-world parse failure — systematically under-reports what was expected.

**Falsifier.** Show the EOF arm is unreachable — it is the first statement of every `regex` invocation. Show `mergeErrorState` at EOF would be a no-op — at `state.offset === state.src.length > state.furthest` it takes the `>` branch (`utils.ts:29`) and sets `furthest = offset`, which is precisely what is missing. Show some caller compensates — `any()` (`leaf.ts:69`) and `then()` (`parser.ts:93`) call `mergeErrorState` **without a label**, so they repair `furthest` but never the expected-set. Measurement 5 is the direct refutation: `furthest` is `-1` after a completed failing parse.

---

### M-8 · PT-01 sharpened: arming diagnostics couples an unconditional `console.error` **and** a full-source line-split, per failed top-level parse — and `ParserState.toString()` is the same path

**Severity**: MAJOR · **Provenance**: `index.ts:5` (exports `enableDiagnostics`) → `utils.ts:6-14` → `parser.ts:67-69` → `state.ts:136-138` → `debug.ts:58`.

O-15 PT-01 is **confirmed** at the bytes, with its coupling exactly as described:

```
src/parse/utils.ts:33     state.expected = diagnosticsEnabled && label ? [label] : undefined;
src/parse/parser.ts:67-69 if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }
dist/diagnostics-DDazRHgl.js:14    state.expected = diagnosticsEnabled && label ? [label] : void 0
dist/packrat-entry-CS1td-8B.js:881-883   if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }
```

Labels are inert unless armed; arming drags stderr output; there is no third posture. The barrel exports both halves of the coupling and neither half of the escape (`isDiagnosticsEnabled` is not exported — M-4).

**Three sharpenings O-15 does not carry**, all index-attributable:

1. **Per-attempt, not per-run.** The `console.error` fires in `parseStateInner` (`parser.ts:67`), i.e. once per *top-level* `parseState`/`parse` call. A driver that probes N candidate grammars against one input under armed diagnostics emits N stderr blocks. This is what makes `W1.md:466`'s gate — "the bench emits **zero** `console.error`" with a "**byte-empty** `harness/bench/bench.stderr`" (`W1.md:492`) — achievable only by never arming in the bench process, and what makes `W2.md:282-283`'s probe (monkey-patch `console.error` to **throw**) the correct instrument.
2. **The message costs a full-source line array.** `this.state.toString()` → `statePrint` (`state.ts:137`) → `addCursor` (`debug.ts:168`) → **`state.src.split("\n")`** (`debug.ts:58`), plus a second full split in `formatSecondarySpans` (`debug.ts:100`) when secondary spans exist. For a 1 MB source that is a multi-megabyte allocation **per failed parse**, on top of the I/O.
3. **The same O(n) path is reachable without arming anything.** `ParserState.prototype.toString` (`state.ts:136-138`) *is* `statePrint`. `ParserState` is exported by the barrel (`index.ts:3`). Any accidental stringification of a state — a template literal in a user's log line, `console.log(state)` in a browser, `` `${state}` `` in a thrown error message — performs the full-source split and ANSI render regardless of the diagnostics flag.

**Falsifier.** Show a way to obtain labelled `expected` sets without stderr — `enableDiagnostics` (`utils.ts:8-10`) sets the single module flag both behaviours read; there is no second toggle. Show `addCursor` avoids the split for large sources — `debug.ts:58` splits unconditionally before consulting `MAX_LINES`. Show `ParserState.toString` is cheap — it is `statePrint`, measured to be the same function that PT-01's `console.error` invokes.

---

### M-9 · No published observer for `PACKRAT_ARMED`, and the latch arms at **construction** — so a never-invoked `memoize()` taxes the process forever

**Severity**: MAJOR · **Provenance**: `index.ts:8` (exports `memoize`, `mergeMemos`, `resetPackrat`) → `packrat.ts:156` / `:290` / `:217` / `:266`.

O-15 PT-03 is **confirmed exactly**, source and dist:

```
src/parse/packrat.ts:156   let PACKRAT_ARMED = false;
src/parse/packrat.ts:290   PACKRAT_ARMED = true;          ← inside makeMemoized(), i.e. at CONSTRUCTION
src/parse/packrat.ts:217   if (!PACKRAT_ARMED) return null;
src/parse/packrat.ts:266   if (!PACKRAT_ARMED) return;    ← resetPackrat's early-out
dist/packrat-entry-CS1td-8B.js:678 / :722 / :682 / :714   ← O-15's four cites, all exact
$ grep -n "PACKRAT_ARMED" dist/packrat-entry-CS1td-8B.js  →  678, 682, 714, 722.  No assignment to false.
```

**Two sharpenings**, both consequences of what the barrel does and does not export:

1. **Arming is a property of construction, not of use.** `PACKRAT_ARMED = true` sits at `packrat.ts:290`, the first statement of `makeMemoized`, before any parser is returned. A grammar module that builds a memoized alternative behind a feature flag, or retains a memoized parser that no code path reaches, arms the process at **import time** — and O-15's measured 1.47× (93.9 → 138.2 ns/parse) is then paid by every unrelated parse for the process lifetime. The design note at `packrat.ts:284-289` states this deliberately ("Arming at CONSTRUCTION (not first invocation) guarantees the latch is set before any memoized parse can open its epoch"), which makes it a considered trade, not an oversight — but the trade is unstated at the public surface. `W2.md:254-255` makes exactly this the law it derives ("Arming, memoization, and diagnostics are **parameters of a parse**, never latches"), and `W2.md:962` lists the latch as one of four inherited counter-examples.

2. **The latch is unobservable from the published surface.** Measured: the root barrel exports **34** symbols, and the only one matching `/arm|packrat/i` is `resetPackrat` — which is a mutator, not a reader:
   ```
   Object.keys(M).filter(k => /arm|packrat/i.test(k))  →  [ 'resetPackrat' ]
   getCijKey exported?  false
   ```
   `W1.md:434` (G-4) requires "Every bench cell proves `PACKRAT_ARMED === false` **at entry and exit**", and `W1.md:124` names the failure mode outright: "**A bench cell that cannot prove itself unarmed.**" With no exported reader, that assertion is **unimplementable in-process** — which is precisely why `W1.md:279` must mandate "**One fresh process per cell (PT-03)**" and why `scripts/proof-packrat-armed.mjs:16-27` must resort to subclassing the global `Map` before importing the dist to count allocations, plus a spawned poison child. A one-line `export function isPackratArmed(): boolean` would collapse all of that harness machinery. Its absence is the barrel's, and it is a measurable downstream cost, not a stylistic gripe.

**Falsifier.** Find an assignment of `false` to `PACKRAT_ARMED` anywhere in source or dist — there is none (grep above; `resetPackrat` at `packrat.ts:262-272` clears three Maps and two references, and never touches the latch). Find an exported reader — none in 34 root exports or any subpath. Show arming happens at invocation rather than construction — `packrat.ts:290` is unconditional at the top of `makeMemoized`, before `evalParser`/`recall`/`memoizeFn` are even defined.

---

## MINOR

### m-1 · Three line/column APIs on the exported `ParserState`, and they disagree with each other

**Severity**: MINOR · **Provenance**: `index.ts:3` (exports `ParserState`) → `state.ts:111-117` (`getColumnNumber`), `state.ts:119-124` (`getLineNumber`), `state.ts:126-134` (`getLineAndColumn`).

`getLineNumber` uses `lastIndexOf("\n", this.offset)` and returns `0` when there is no newline; `getLineAndColumn` uses `lastIndexOf("\n", offset - 1)` and returns `1`. `getColumnNumber` uses `offset`; `getLineAndColumn` uses `offset - 1`. **Measured** on `"a\nb"`:

```
C   offset 2:        getLineNumber()   → 1    getLineAndColumn() → {line: 2, column: 0}
C2  offset 1 (on \n): getColumnNumber() → 0    getLineAndColumn() → {line: 1, column: 1}
```

`getLineNumber` is 0-based-and-off-by-one against its 1-based sibling and has **zero callers** in the library (`debug.ts:59` uses `getLineAndColumn`); `getColumnNumber` likewise has zero callers. Both are shipped public API that is wrong and unused.

**Falsifier.** Show one library caller of `getLineNumber`/`getColumnNumber` (`grep -rn "getLineNumber\|getColumnNumber" src/` → definitions only). Show the two conventions are documented as different — only `getLineAndColumn` carries a doc comment (`state.ts:126`, "1-based line and 0-based column"); the other two carry none.

### m-2 · Two dead empty arrays allocated per `ParserState`, and `clone()` silently drops the accumulated diagnostics

**Severity**: MINOR · **Provenance**: `state.ts:44-45`, `state.ts:101-109`, consumed at `packrat.ts:351`.

```ts
// state.ts:43-45
expected?: string[];
suggestions: Suggestion[] = [];         // ← allocated on every construction
secondarySpans: SecondarySpan[] = [];   // ← allocated on every construction
```

Both are written only under `diagnosticsEnabled` (`utils.ts:52`, `:58`) — i.e. never, on the default path — yet a fresh `[]` is allocated for each on **every** `ParserState`. States are constructed per `parseState` (`parser.ts:52`), per error-view (`parser.ts:61`), and per packrat `clone()` (`state.ts:102`, called at `packrat.ts:351` for each eval-set re-entry inside a left-recursive grow). Against O-15 PT-03's own 93.9 ns/parse budget, two unconditional array allocations are not free. `Object.freeze([])`-style shared-empty-sentinel with copy-on-write is the standard cure and costs nothing when diagnostics are off.

Separately, `clone()` (`state.ts:101-109`) copies only `src/value/offset/isError/furthest` — **measured**: after setting `expected = ["X"]` and a suggestion, the clone reports `expected: undefined, suggestions: []`. Inside packrat's `recall` the scratch clone (`packrat.ts:351`) therefore discards any expected-set accumulated during a left-recursive re-evaluation, so **diagnostics collected inside an LR grow are silently lost**. Narrow (needs packrat + diagnostics + left recursion together) but real, and undocumented on a method named `clone`.

**Falsifier.** Show the arrays are lazily created — `state.ts:44-45` are unconditional field initialisers, and the measured `Object.keys` shows all eight fields present on a default-path state. Show `clone` is not meant to be a full copy — it is named `clone`, has no doc comment, and copies five of eight fields.

### m-3 · `dispatch()` has no bound on its parser count; past 127 the `Int8Array` index wraps negative and the arm becomes a silent rejection

**Severity**: MINOR · **Provenance**: `index.ts:9` (exports `dispatch`) → `leaf.ts:101` (`new Int8Array(128)`), `leaf.ts:104-111` (`internParser`), `leaf.ts:119`/`:122` (writes), `leaf.ts:137-139` (read).

`internParser` returns `parsers.length` for each newly seen parser, unbounded. `tbl` is `Int8Array` (range −128…127). If the table has ≥128 **distinct parsers** and the ≥128th is the last writer of some character, `tbl[c]` stores a negative value, `idx >= 0` is false (`leaf.ts:139`), and dispatch **rejects a character for which a parser is registered** — no throw, no warning, a wrong answer.

**Reachability, stated honestly.** With single-character keys the entry count is capped at 128 by the ASCII table, so the maximum index is 127 and it fits — this arm is *unreachable*. It becomes reachable only with multi-character or overlapping keys (`{"a": p0, "aa": p1, "aaa": p2, …}`), which is pathological. I therefore rate it MINOR, not MAJOR.

What is not pathological is the **inconsistency of error posture inside one library**. `getCijKey` (`packrat.ts:90-98`) guards its own numeric budget and throws a `RangeError` rather than alias a memo cell, with an explicit rationale ("Fail loud at the boundary rather than silently alias… so a degenerate input can never produce a wrong answer"). `dispatch` faces the identical class of hazard at `leaf.ts:119`/`:122` and takes the opposite posture — silent truncation. One `if (parsers.length > 127) throw new RangeError(...)` would align them. `internParser`'s `parsers.indexOf(parser)` is also O(n²) over entries, which is the other half of "no bound was ever considered".

**Falsifier.** Show `Int8Array` writes clamp rather than wrap — they wrap (`Int8Array` uses modular conversion; `Uint8ClampedArray` is the clamping type). Show the entry count cannot exceed 127 — `Object.entries(table)` (`leaf.ts:113`) is bounded by distinct *keys*, not distinct characters. Show a guard exists — `leaf.ts:100-125` contains none.

### m-4 · Five hand-maintained export lists over one symbol set, with a gate that checks three symbols

**Severity**: MINOR · **Provenance**: `index.ts` + `core.ts` + `diagnostics.ts` + `packrat-entry.ts` + `utils-entry.ts`; gate at `test/subpath-gate.mjs:44-56`.

**Measured** — the barrel is *exactly* the union today, which is the good news:

```
core 18 · diagnostics 6 · packrat 3 · utils 7   UNION = 34   ROOT = 34
in-union-not-root: []      in-root-not-union: []
```

Nothing pins it. `proof:subpath` (`test/subpath-gate.mjs`) verifies that the four subpaths resolve and that `core.Parser`, `core.dispatch`, and `packrat.memoize` are functions — **three symbols out of thirty-four**. Delete `whitespace` from `core.ts`, or add an export to `leaf.ts` and forget the barrel, and the gate stays green. The value.js band has already named this exact failure mode in its own tree: `W1.md:378` — "*Falsifier*: add an export to `src/css/index.ts` and a hand-maintained manifest silently keeps [passing]" — and answered it with a `--check` mode that **re-derives** the manifest from the source (`W1.md:225-228`). parse-that has the same problem and no such derivation.

**Falsifier.** Read `test/subpath-gate.mjs:44-56`; count the assertions (three `typeof … !== "function"` checks). Show a separate gate pins the union — `package.json:33-45` lists `proof:manifest`, `proof:no-css-surface`, `proof:subpath`, four packrat proofs, `proof:no-span-surface`, `proof:no-dead-combinator`, `proof:perf`; none derives the barrel from the subpaths. (`proof:no-dead-combinator` is the closest neighbour and did not catch M-6's dead flag machinery.)

### m-5 · The subpath split is partly cosmetic: `utils.ts` is two unrelated modules fused, so `./diagnostics` still drags the byte-scanners into the chunk

**Severity**: MINOR · **Provenance**: `utils.ts:1-148` (diagnostics accumulator) vs `utils.ts:150-186` (imperative byte-scanners); `diagnostics.ts:6-14` vs `utils-entry.ts:6`; `core.ts:4-5` (the stated rationale).

`core.ts:4-5` states the split's purpose: "A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers." The *export surface* honours that — measured, `./diagnostics` exports exactly six symbols and no scanners. The *chunk* does not:

```
$ head -1 dist/diagnostics.js
import { c, a, d, e, g, m } from "./diagnostics-DDazRHgl.js";
$ grep -c "skipBlockComments\|skipWhitespace" dist/diagnostics-DDazRHgl.js
4
```

`skipWhitespace`/`skipBlockComments` (`utils.ts:159-186`) share **zero symbols** with the diagnostics accumulator above them — the two halves are separated by a section banner (`utils.ts:150-157`) that says so — yet they live in one file, so the bundler emits one shared chunk and `import "@mkbabb/parse-that/diagnostics"` pulls the scanners' bytes. The split was performed at the entry-file level (`diagnostics.ts` takes lines 1-148, `utils-entry.ts` takes 150-186) without performing it at the source level. Splitting `utils.ts` into `diagnostics.ts` + `scan.ts` makes the entry files honest.

**Falsifier.** Show the shared chunk is not loaded by `./diagnostics` — `dist/diagnostics.js:1` imports from it directly. Show the two halves are coupled — `skipWhitespace`/`skipBlockComments` reference only `state.src` and `state.offset`; they touch neither `diagnosticsEnabled` nor `collectedDiagnostics` nor any type from lines 1-148.

### m-6 · `parserPrint` builds a **second, duplicate** parser graph for lazy parsers, and caches strings in a never-evicted global keyed by a monotonic id

**Severity**: MINOR · **Provenance**: `index.ts:7` (exports `getLazyParser`) → `lazy.ts:5-15`; `debug.ts:245` (`PARSER_STRINGS`), `debug.ts:316-327`.

`Parser.lazy(fn)` (`parser.ts:702-707`) builds its parser via `createLazyCached(fn)` (`lazy.ts:18-24`), whose cache is **closure-local**. `parserPrint`'s `lazy` case (`debug.ts:318`) reaches for `getLazyParser(lazy)` instead, whose cache is a separate module-global `WeakMap` (`lazy.ts:5`). The two caches never see each other, so the first `toString()` of a lazy grammar invokes `fn()` a **second** time — minting a complete duplicate sub-graph (and consuming that many `PARSER_ID` values) purely to print.

`PARSER_STRINGS` (`debug.ts:245`) is a module-global `Map<number, string>` written at `debug.ts:322`, `:340`, `:346` and **never cleared**. Keys are `Parser.id`, drawn from a strictly monotonic process-global counter (`parser.ts:18`), so entries can never be hit again by a later-constructed parser — the map grows without bound in any process that stringifies parsers, holding a rendered string per parser forever.

**Falsifier.** Show `createLazyCached` and `getLazyParser` share a cache — `lazy.ts:19` (`let cached`) is closure-scoped; `lazy.ts:5` is module-scoped; nothing bridges them. Show `PARSER_STRINGS` is evicted or bounded — `grep -n "PARSER_STRINGS" src/parse/debug.ts` → `245, 248, 249, 258, 259, 322, 340, 346`; no `.delete`, no `.clear`, no size bound.

### m-7 · `getLazyParser`'s `undefined` sentinel conflates "not cached" with "cached `undefined`"

**Severity**: MINOR · **Provenance**: `index.ts:7` → `lazy.ts:7-15`.

```ts
const cached = LAZY_PARSER_CACHE.get(fn);
if (cached !== undefined) return cached as T;
```

If `fn()` legitimately returns `undefined`, the value is stored (`lazy.ts:13`) but never served — every call re-invokes `fn`. `WeakMap.has(fn)` is the correct test and costs the same. `getLazyParser<T>` is generic over `T` with no `T extends object` bound, so `T = undefined` is a legal instantiation of the published signature.

**Falsifier.** Show `T` is constrained to exclude `undefined` — `lazy.ts:7` is `export function getLazyParser<T>(fn: () => T): T`, unconstrained. Show the miss is harmless — for a `Parser`-returning `fn` it is; the defect is that the published generic signature admits the case and the implementation silently degrades to no caching, which for a *lazy* helper is the whole point.

---

## INFO

### i-1 · `index.ts:10-12` documents code that no longer exists, in the file that defines the public surface

Three of the module's fourteen lines are an archaeological note about fifteen `*Span` builders excised in the 1.0.0 cut. It cuts both ways and I am recording it as INFO, not MINOR: it names a live gate (`proof:no-span-surface`, `package.json:41`), which makes it *provenance* rather than clutter, and `core.ts:6` carries the same note for the same reason. The cost is that the highest-traffic file in the package spends 21% of its lines on a tombstone. **Falsifier**: the gate it cites is real and runnable (`package.json:41`), so deleting the comment without the gate would lose information — the correct disposition is to move it to the gate script, not to delete it.

---

## CORPUS CORRECTIONS

### C-1 · O-15 PT-07 is wrong in both arms — see **B-1** and **B-3**

`…ask-addendum.md:73-76` states (a) "5/5 non-string inputs throw a raw `TypeError` from `parseState`" and (b) "`.parse()` returns `undefined` on failure". At the bytes: (a) 3 of 9 non-string inputs do **not** throw for `regex`, 7 of 9 do not for `eof`, the throw originates in a *leaf* rather than `parseState`, and `eof().parseState([])` **succeeds**; (b) `many(min≥1)` and `sepBy(min≥1)` return a truthy `[]` on failure. Both corrections make the hazard **worse**, not milder, and both bear on `W1.md:582` and `W2.md:161-162, :294`, which currently encode the letter's shape. The JS-boundary invariant must be a positive `typeof === "string"` admission test, and the algebra's failure contract must forbid a *value-carrying* failure, not merely an `undefined`-carrying one.

### C-2 · O-15's `console.error` dist cite is off by one; its four PT-03 cites are exact

`…ask-addendum.md:25` cites `dist/packrat-entry-*.js:881` for `if (isDiagnosticsEnabled()) console.error(...)`. In `dist/packrat-entry-CS1td-8B.js`, `:881` is the `if (isDiagnosticsEnabled()) {` and `:882` is the `console.error(this.state.toString());`. The `diagnostics-DDazRHgl.js:14` cite is exact, and all four PT-03 cites (`:678`, `:722`, `:682`, `:714`) are exact. Recorded for hygiene; the substance of PT-01 and PT-03 is confirmed in full (M-8, M-9).

---

## SUPERLATIVES — held to the same evidentiary standard (L-18)

### S-1 · `getCijKey`'s float64 key budget is genuinely correct, and fails loud where m-3 aliases silently
`packrat.ts:71-100`. The reasoning is right (a 2³² offset span leaves ~2²¹ of safe-integer headroom for ids; `id * SPAN + offset` is exact below 2⁵³), the offset is added **whole** rather than masked so it cannot alias below the span, and the boundary is a thrown `RangeError` (`:94-97`) rather than a wrapped key. The comment records both prior defects it cures — the int32 shift aliasing at id ≥ 4096 and the 20-bit span aliasing above 1 MB — with the exact collisions each produced. **Falsifier attempted**: I looked for the mask that the old code used (`& (2^20 - 1)`) — it is gone; and for an unguarded path into the multiply — `getCijKey` is the sole key constructor, called at `packrat.ts:306`, `:437`; both are behind the guard. This is the fail-loud posture m-3 lacks, in the same package, which is what makes m-3 a genuine inconsistency rather than a style note.

### S-2 · Zero-advance guards make empty-matching parsers non-looping
`parser.ts:538` (`if (state.offset === savedOffset) break;`), `parser.ts:582` (`else if (state.offset !== savedOffset)`), `parser.ts:605` (`if (state.isError || state.offset === savedOffset)`). `string("")` matches unconditionally (`leaf.ts:297`, `startsWith("", off)` is always true) and `regex(/\s*/)` matches empty (`leaf.ts:354-357`) — both are constructible from the barrel, and neither can hang `many()` or `sepBy()`. **Falsifier attempted**: I looked for an unguarded repetition combinator — `many` and `sepBy` are the only two, both guarded, and both are iterative rather than recursive, so neither contributes to the PT-04 stack ceiling.

### S-3 · The packrat re-entrancy unwind is genuinely sound, and `growLR`'s "no count cap needed" claim holds
`parser.ts:43-48` opens the epoch in a `try` and restores it in `finally`; `packrat.ts:390-406` does the same for the per-head `GROWING`/`HEADS` bookkeeping. A nested `parse(differentSrc)` inside a `.map` mid-grow gets clean tables and cannot wipe the parent's (`packrat.ts:158-185`), and a throw anywhere discards the child's tables wholesale rather than leaving them on the parent's stack. The design note's claim that no iteration cap is needed (`packrat.ts:50`) **verifies**: `growLR`'s `while (true)` (`:392`) breaks at `:398` on `ans.isError || ans.offset <= seed.offset`, seeds advance strictly monotonically, and offsets are bounded by `src.length` — so the loop is bounded by input length. **Falsifier attempted**: I looked for a path where the seed can advance without bound (offsets only ever move forward within one `src`) and for a `finally`-less mutation of `LR_STACK` (`packrat.ts:452-454` restores it on the linear path; a throw discards the whole epoch at `parser.ts:47`). This is better re-entrancy hygiene than most published parser combinator libraries carry.

### S-4 · `ParserState`'s object shape is stable — the V8 hazard I went looking for is absent
`state.ts:43` declares `expected?: string[]` with no initialiser, which under a pre-ES2022 emit would leave the property *absent* until `mergeErrorState`'s first write (`utils.ts:33`) added it — a shape transition on every first error, polymorphising every `state.expected` read site. `tsconfig.json:3` sets `"target": "ES2022"`, so `useDefineForClassFields` defaults on and the field is defined. **Measured**: `Object.keys(state)` on a default-path state returns all eight fields in fixed declaration order — `['expected','suggestions','secondarySpans','src','value','offset','isError','furthest']`. One shape, no transition. **Falsifier attempted**: I checked for the absent-property case directly rather than inferring it from the target setting, and it is not there.

### S-5 · `dispatch()`'s two obvious bugs are both absent
`leaf.ts:136-137`: at end-of-input `charCodeAt` returns `NaN`, and `NaN < 128` evaluates **false**, so EOF routes to the labelled error arm (`:142-144`) rather than reading `tbl[NaN]` — correct, and non-obvious. Non-ASCII (`ch >= 128`) takes the same arm. The `Int8Array(128)` is exactly right-sized for the ASCII domain, and the label is precomputed at construction (`leaf.ts:128-132`) rather than rebuilt per failure. **Falsifier attempted**: I probed for `tbl[NaN]` returning `undefined` (which would make `idx >= 0` false anyway — the same outcome by accident) and for a `>= 128` fall-through; both are explicitly handled. m-3's index-wrap is a *different* hazard, in the construction path, and does not diminish this.

### S-6 · `fuseAll`'s unrolling is an honest allocation win, and `any()`'s arity-1 shortcut is type-correct where `all()`'s is not
`leaf.ts:179-273`: arity-2 and arity-3 are fully unrolled with positional bindings and a pre-sized result array; the general arm uses `new Array(n)` with an indexed write cursor and a classic `for` (no `for…of` iterator object). The comparison it claims (`leaf.ts:174-176`) is real — `a.then(b).then(c)` builds N−1 nested 2-tuples; the fused form builds one flat array. `any()`'s arity-1 shortcut (`leaf.ts:76`) returns `parsers[0].parser` under `Result = V` — **type-correct**, because `any` of one *is* the inner parser. That the sibling shortcut at `leaf.ts:161` is a type lie (B-2) is a defect of `all`'s tuple type, not of the fusion technique, and the contrast is what isolates it.

---

## LAW COMPLIANCE

- `/Users/mkbabb/Programming/parse-that` read-only; main checkout only; no `.worktrees/`, no frozen root, no `~/Documents/Codex`.
- `/Users/mkbabb/Programming/parse-that-css-totality-p2` — **checked, does not exist**, not created. No STOP finding.
- Single write: this file. No browser tooling. No bench. **`enableDiagnostics()` never called and `memoize()`/`mergeMemos()` never constructed in any measuring process** — the PT-03 latch was not armed; every probe ran in a throwaway process against `dist/parse.js` and observed only `furthest`/`isError`/`value`/`Object.keys`, all of which are flag-independent.
