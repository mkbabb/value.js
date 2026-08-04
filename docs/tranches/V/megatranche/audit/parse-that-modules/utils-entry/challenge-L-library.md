claude-opus-5[1m]

# CHALLENGE — `utils-entry` · axis L (LIBRARY)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/utils-entry.ts` — 14 lines, 598 B, 7 value exports + 1 type export.
**Read whole (read-only)**: the target, plus every file it imports and their transitive core —
`src/parse/utils.ts` (187) · `src/parse/parsers/json.ts` (53) · `src/parse/parsers/csv.ts` (21) · `src/parse/parsers/utils.ts` (24) · `src/parse/parsers/index.ts` (9) · `src/parse/index.ts` (15) · `src/parse/core.ts` · `src/parse/diagnostics.ts` · `src/parse/packrat-entry.ts` · `src/parse/parser.ts` (712) · `src/parse/leaf.ts` (400) · `src/parse/state.ts` (190) · `src/parse/lazy.ts` (44) · `src/parse/packrat.ts` §§ latch/epoch. Plus the built bytes, the manifest (`package.json`, `vite.config.ts`, `tsconfig.json`), the two gates that touch the subpath family (`test/subpath-gate.mjs`, `scripts/proof-no-dead-combinator.mjs`), and the only tests that name any of this code (`test/json-vectors.test.ts`, `test/csv.test.ts`, `test/json.test.ts`).

**Measurement environment**: `typescript/dist/` as built **2026-07-29 14:20** (`packrat-entry-CS1td-8B.js`, `diagnostics-DDazRHgl.js`); node v26; darwin arm64; default stack. **`enableDiagnostics()` was never called and no `memoize()`/`mergeMemos()` was ever constructed in any probe process — `diagnosticsEnabled` stayed `false` and `PACKRAT_ARMED` stayed `false` throughout. The one-way latch was NOT tripped by this audit.** No bench was run; every number below is a count or a boundary, not a timing.

**STOP-probe**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → *No such file or directory*. **Absent, as required. No STOP finding.** No worktree, frozen root, or `~/Documents/Codex` path was entered; `/Users/mkbabb/Programming/parse-that` was read at `HEAD = ef10d5b` and not written.

---

## VERDICT

**DEFECTIVE — 22 defects, 4 of them BLOCKER.**

The 14 lines are not the defect. As a barrel `utils-entry.ts` is correct, correctly sized, and honestly commented. The defect is **curation**: it is the sole public gate of `"@mkbabb/parse-that/utils"` (`package.json#exports["./utils"] → dist/utils.js`), and it promotes to published API three surfaces that are wrong at the *value* level and one that cannot be *called* from the subpath it is published on.

The sharpest finding, and the one that reframes the module: **`csvParser` silently mangles the repository's own CSV fixture and reports complete success.** `data.csv` has 5 non-empty lines; `csvParser` returns **4 rows**, row 1 carrying **2 fields instead of 10** — with `isError === false` and `offset === 1409 === src.length`. There is no signal. Not the return value, not `isError`, not the consumed-offset check. The parser-band adjudication's own prescribed idiom (*"entry via `parseState` + `isError`, never `parse()` truthiness"*, `parser-band.md` IDIOM READING §) is **insufficient** for this entry's exports — a fact worth carrying into the wave, because the band states that idiom as sufficient.

Second: **not one of the seven exports has a consumer anywhere in the constellation.** value.js 4.0.0 does not depend on `@mkbabb/parse-that` at all (`package.json#dependencies` = `{@mkbabb/glass-ui, @mkbabb/keyframes.js}`; zero `@mkbabb/parse-that` imports in `src/`). The design note that justifies the two best functions in the file — *"the primitives a hand-rolled grammar (value.js's canonical CSS grammar) drives its hot paths with"* (`utils.ts:150-156`) — is **stale prose**, not a live contract. parse-that's own gate encodes the disposition: *"an export born one prior tranche with zero workspace consumers is dead by the precept"* (`scripts/proof-no-dead-combinator.mjs:10-11`).

---

## CORPUS FOLD — O-15 (PT-01…PT-07) re-verified at today's bytes

O-15 measured the **published** dist on 2026-07-27; the working dist was rebuilt **2026-07-29 14:20**. Re-read, not re-narrated.

| row | O-15 claim | today's bytes | disposition |
|---|---|---|---|
| **PT-01** | `label` a no-op unless diagnostics are armed; arming couples an unconditional `console.error`; cites `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881` | `diagnostics-DDazRHgl.js:14` = `state.expected = diagnosticsEnabled && label ? [label] : void 0;` — **exact**. `console.error(this.state.toString())` is at `packrat-entry-CS1td-8B.js:`**`882`** (source `parser.ts:68`), and the only other `console.error` in the chunk is the `parserDebug` default logger at `:262` | **CONFIRMED; one cite drifted +1 line** in the 07-29 rebuild. Flagged so the evidence packet is not quoted stale (D-22). |
| **PT-03** | one-way latch: `:678` false, `:722` true, read at `:682`/`:714`, no assignment back to false | `grep -n PACKRAT_ARMED packrat-entry-CS1td-8B.js` → **exactly four** hits, byte-exact: `678 let PACKRAT_ARMED = false;` · `682 if (!PACKRAT_ARMED) return null;` · `714 if (!PACKRAT_ARMED) return;` · `722 PACKRAT_ARMED = true;`. No fifth site ⇒ no disarm. Arm site is `packrat.ts:290`, inside `makeMemoized`, at **construction** | **CONFIRMED BYTE-EXACT — all four line numbers survive the rebuild.** Its blast radius *at this entry* is D-21. |
| **PT-04** | `Parser.lazy` arity 1: deepest OK **7,761**, `RangeError` at 7,762 | Through this entry's shipped `jsonParser` (two `Parser.lazy` back-edges, `json.ts:25`/`:28`): cold-process bisect (one parse per fresh node process) → **deepest OK 1,493, `RangeError` at 1,494**. Warmed in-process (repeated bisect probes in one process) → **2,859 / 2,863 / 3,583 / 4,139 / 4,139** across five searches. A bare arity-1 lazy chain measured **6,672** warm here, not 7,761 | **CONTRADICTED as a number, confirmed as a class.** The ceiling is not a constant; it is a JIT-state-dependent **range**. See D-11. |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError`; `.parse()` returns `undefined` on failure, indistinguishable from a successful `undefined` | Throw half: **CONFIRMED and widened** — 7/7 for `jsonParser`, `csvParser`, `quotedString()`, `escapedString()`, in **three** un-unifiable messages. Ambiguity half: **UNDERSTATED and, for one export, CONTRADICTED.** `.parse()` on failure does not return `undefined`; it returns arbitrary parse residue (D-3). And `numberParser()` is **not** 7/7: `{}` and `["a"]` return `undefined` with **no throw**, and `new String("42")` returns **`42`** — a non-string input that silently *succeeds* | **CONFIRMED on throws; the corpus row's "5/5 throw" does not hold across this entry's surface.** Four-way non-uniformity documented at D-20. |
| PT-02 · PT-05 · PT-06 | — | not reachable from any of this entry's seven exports | out of scope for this module. |

**Wave specs / registry.** `docs/tranches/X/parse-that/waves/W0..W4` + `CONFORMANCE-2026-08-03.md` and `registry/adjudicated/parser-band.md` scope the **CSS** grammar, value.js's `/css` subpath, and MT-F024. Grepped: no wave spec and no parser-band row names `jsonParser`, `csvParser`, `quotedString`, `escapedString`, `numberParser`, `skipWhitespace`, or `skipBlockComments`. **This entry is outside the adjudicated band** — nothing here contradicts the band, and the band extends this entry no cover. Three band findings transfer as precedent and are cited inline:

- *"entry via `parseState` + `isError`, never `parse()` truthiness"* (IDIOM READING §) — D-1 shows this idiom is **not sufficient** for `csvParser`; the wave should widen it to `parseState().isError === false && offset === src.length`, and even that is insufficient for D-1's `data.csv` case.
- *"Recursion bounded by construction, not by catch… the stack ceiling becomes an ordinary `ok:false` by construction"* (WHAT CAND-O OWES CAND-F §3) — `jsonParser` is bounded by neither (D-11).
- *"the JS-boundary non-string guard — both candidates converged on these independently; keep both"* (§4) — unpaid here, and non-uniformly unpaid (D-20).

---

## DEFECTS

### D-1 · BLOCKER · `csvParser` mangles unquoted CSV and reports unqualified success — no signal exists

`utils-entry.ts:9` publishes `csvParser`, documented at `csv.ts:19` as *"returns array of rows, each an array of string fields."*

Measured against the repository's own fixture, `data/csv/data.csv`:

```
data.csv non-empty lines = 5   csvParser rows = 4   isError = false   offset = 1409/1409
row0 fields = 10   ["Column 1","Column 2", … ,"Column 10"]
row1 fields =  2   ["58","This is a sentence,"]
```

and on minimal inputs:

| input | `parseState` result | correct |
|---|---|---|
| `"a,b\nc,d"` | `[["a","b\nc","d"]]` · `isError=false` · `offset=7/7` | `[["a","b"],["c","d"]]` |
| `"a,,b"` | `[["a"]]` · `isError=false` · `offset=1/4` — **`,,b` silently destroyed** | `[["a","","b"]]` |
| `'"a","","b"'` | `[["a","\"\"","b"]]` — empty quoted field becomes the **two-character literal** `""` | `[["a","","b"]]` |
| `name,age\r\nJohn,30` | one row, `["name","age\r\nJohn","30"]` · `isError=false` · `offset=len` | two rows |

Three independent mechanisms: **(i)** `csv.ts:14` `regex(/[^,]+/)` excludes only the comma, so `\n`/`\r` are ordinary field characters — an unquoted field swallows the row boundary. **(ii)** `csv.ts:11-13`'s quoted arms are `regex(/[^"]+/)`, which cannot express RFC 4180 `""` escaping and requires ≥1 character, so `""` falls through to the `[^,]+` arm as literal text. **(iii)** on `a,,b`, `sepBy` (`parser.ts:603-611`) treats a zero-width element after a separator as a trailing separator and **breaks**, backtracking to `cpBeforeSep` and abandoning the remainder of the input without setting `isError` — `many()` then terminates on the zero-width guard (`parser.ts:538`) and `state.ok(matches)` reports success.

**Falsifier — is there *any* return-path signal a caller can read?** Checked all three: return value (a well-formed `string[][]`), `parseState().isError` (`false`), and `offset === src.length` (**true** for `data.csv` and for `a,b\nc,d`). *No signal exists.* The only detection available to a consumer is to already know the answer. This is the case that defeats the parser-band's prescribed idiom, and it is why this is a BLOCKER rather than a MAJOR.

**Falsifier — is the export perhaps a "single-line" parser by design?** Refuted twice: the docstring says *rows*; and the grammar **does** split rows when every field is quoted — `'"name","age"\r\n"John","30"'` → 2 rows, measured. Row production exists (`many()` at `csv.ts:20` + the `.trim()` at `:17` consuming the newline); it is defeated only by the unquoted arm. The defect is therefore narrow and precisely locatable, not architectural.

### D-2 · BLOCKER · `quotedString`/`escapedString` do not unescape; the `\uXXXX` payload is destroyed

`utils-entry.ts:10-11` publishes both. `parsers/utils.ts:14` documents `quotedString` as *"Parse a quoted string **with escape handling**."*

`parsers/utils.ts:11` — `.map(([, esc]) => esc)` yields the escape **letter**, never the escaped character. `parsers/utils.ts:10` — `string("u").skip(regex(/[0-9a-fA-F]{4}/))`: `.skip` (`parser.ts:189-210`) keeps the **left** value (`"u"`) and discards the four hex digits it consumed, annihilating the code point.

| call | returns | correct |
|---|---|---|
| `escapedString().parse("\\u0041")` | `"u"` | `"A"` |
| `escapedString().parse("\\n")` | `"n"` | `"\n"` |
| `quotedString().parse('"a\\nb"')` | `"anb"` | `"a\nb"` |
| `quotedString().parse('"a\\u0041b"')` | `"aub"` | `"aAb"` |
| `quotedString().parse('"\\\\"')` | `"\\"` | `"\\"` ✓ (the one escape that is right, and only because the letter *is* the character) |

**Falsifier**: exhibit one escape sequence for which `quotedString()` produces the unescaped character. — *Only `\\` and `\/` and `\"` and `\'`, i.e. exactly the escapes whose letter equals their value. Every semantic escape (`\n \r \t \b \f \uXXXX`) is wrong.* There is no decode table anywhere in the file. The correct implementation is **30 lines away in this entry's own import set**: `json.ts:22-24` delegates to `JSON.parse` when a backslash is present. That it was not reused is D-15's twin.

### D-3 · BLOCKER · `.parse()` publishes parse residue as the result, and violates the declared return type doing so

`Parser.parse` (`parser.ts:77-79`) is `return this.parseState(val).value` — it **never consults `isError`**. `parseStateInner` (`parser.ts:51-75`) constructs a correct error view at `:60-66` and then **discards it**, returning the raw mutated `state` at `:74`. Whatever the last combinator to touch `state.value` left behind escapes as the caller's result.

| input | `.parse()` returns | `isError` | a *valid* input producing the same value |
|---|---|---|---|
| `"{"` | `[]` | true | `"[]"` |
| `"["` | `[]` | true | `"[]"` |
| `"[1,2"` | `[1,2]` | true | `"[1,2]"` |
| `"[1 2 3]"` | `[1]` | true | `"[1]"` |
| `'{"a": 1, "a": 2'` | `[["a",1],["a",2]]` | true | — (leaks the pre-`Object.fromEntries` pair array: **neither** the success type nor `undefined`) |

Mechanism: `wrap` (`parser.ts:416-423`) restores `offset` and sets `isError` on a missing close delimiter but leaves `state.value` holding the inner result; `map` (`parser.ts:150-153`) then declines to run on error, so even the `Object.fromEntries` normalisation at `json.ts:35` is skipped.

**The type violation is worse than the ambiguity.** `quotedString()` is declared `Parser<string>` (`dist/parsers/utils.d.ts`). Measured:

```
quotedString().parseState('"abc')  ->  value = ["abc"]   (an ARRAY)   isError=true
quotedString("]").parse('"x"')      ->  value = []        (an ARRAY)   isError=false
```

So `const s: string = quotedString().parse(input)` is **statically `string` and dynamically `string[]`** for ordinary unterminated input. A consumer calling `.trim()` or `.toUpperCase()` on it gets a `TypeError` at a site the type system declared safe.

**Falsifier**: exhibit a call path where `jsonParser.parse(truncated)` is distinguishable from `jsonParser.parse(valid)` by the return value alone. — *Not found. `parse("[")` and `parse("[]")` are both `[]` and `JSON.stringify`-identical.* The distinguishing signal exists only on `parseState().isError`, which `parse()` throws away — and `parse()` is the only method this entry's own test uses (`test/json-vectors.test.ts:28`).

### D-4 · BLOCKER · six of seven exports are untested; the seventh's only assertion is satisfied by 7/7 of the repo's own invalid vectors

Grepped `test/` for each export name (excluding the benchmark files' unrelated local `jsonParser` bindings in `test/benchmarks/arcsecond.ts:65` and `parjs.ts:58`):

```
jsonParser         test/json-vectors.test.ts:8,28   (1 file)
csvParser          — 0 references
quotedString       — 0 references
escapedString      — 0 references
numberParser       — 0 references
skipWhitespace     — 0 references
skipBlockComments  — 0 references
```

**`test/csv.test.ts` does not test `csvParser`.** It re-declares the entire grammar inline at `:9-16` — byte-identical to `csv.ts:11-20` — and exercises the *copy*. Two consequences, both bad: the shipped export has zero coverage; and the copy will silently diverge from the export the moment either is edited. Worse, the copy's nine cases are chosen such that **every multi-row case uses fully quoted fields** (`:49`, `:63`) — precisely the input class that works (D-1) — and the one case that reads the real fixture asserts only `expect(result.length).toBeGreaterThan(0)` (`:77`), which is satisfied by the 4-row mangling at `4 > 0`. The suite is **GREEN on a file it corrupts**.

`test/json-vectors.test.ts` is the only test touching any `/utils` export. Its entire assertion (`:28-29`):

```ts
const result = jsonParser.parse(input);
expect(result).not.toBeUndefined();
```

It reads `valid.jsonl` only (`:23`). `grammar/tests/json/invalid.jsonl` — **7 vectors in the same directory** — is never opened. Wired to the existing assertion:

```
{key: "value"}       -> []                  isError=true   not.toBeUndefined() PASSES
{'key': 'value'}     -> []                  isError=true   PASSES
{"a": undefined}     -> []                  isError=true   PASSES
{true: 1}            -> []                  isError=true   PASSES
[1 2 3]              -> [1]                 isError=true   PASSES
{"a": 1, "a": 2      -> [["a",1],["a",2]]   isError=true   PASSES
[}                   -> []                  isError=true   PASSES
>>> 7/7 INVALID vectors satisfy the suite's only assertion
```

Had the maintainer wired `invalid.jsonl` into the existing test with the existing assertion — the obvious next commit — the suite would have gone GREEN **while accepting every malformed input in it**. The assertion is *structurally incapable* of detecting rejection, because of D-3.

**Falsifier**: show that `not.toBeUndefined()` discriminates accept from reject for this parser. — *Refuted 7/7; `isError` is `true` in all seven and invisible to the assertion.*

### D-5 · MAJOR · `/utils` is not self-sufficient: it publishes two functions whose parameter type it does not export

`utils-entry.ts:6` publishes `skipWhitespace` / `skipBlockComments`. Their signature (`utils.ts:159`, `:168`; emitted at `dist/utils.d.ts:35`, `:38`) is `(state: ParserState<unknown>) => void`.

```
/utils runtime exports: csvParser, escapedString, jsonParser, numberParser,
                        quotedString, skipBlockComments, skipWhitespace
"ParserState" in /utils  ->  false
"Parser"      in /utils  ->  false
```

`dist/utils-entry.d.ts` re-exports five value bindings plus `type JsonValue` — and **no** state type, **no** class, **no** factory. A TypeScript consumer who imports only `"@mkbabb/parse-that/utils"` cannot construct an argument: `ParserState` carries **8 own data properties** (`expected, suggestions, secondarySpans, src, value, offset, isError, furthest`) and **13 prototype methods** (`ok, err, from, save, restore, unsafeSetValue, unsafeCall, unsafeCallRaw, clone, getColumnNumber, getLineNumber, getLineAndColumn, toString`), so an object literal `{ src, offset }` is not assignable. The consumer must reach a **second** subpath (`/core` or the root barrel) to use the first subpath's headline exports.

**Falsifier**: does structural typing rescue it? — *No: TS reports the literal missing 6 required data properties and 13 methods.* **Falsifier**: does it work at runtime? — *Yes — `skipWhitespace({src:"   abc", offset:0})` duck-types correctly to `offset:3`, and `skipBlockComments({src:"  /*c*/ x", offset:0})` to `offset:8`.* That is the sharp form of the defect: the functions are **structurally** two-field, and the signature over-constrains them to a 21-member class the subpath refuses to export. Narrowing the parameter to `{ src: string; offset: number }` would make `/utils` self-sufficient in one line and cost nothing — `utils.ts:159-186` touches only those two fields.

### D-6 · MAJOR · neither domain parser terminates at EOF — silent prefix acceptance

`json.ts:52` — `export const jsonParser = jsonValue.trim();`. No `.eof()`. `csv.ts:20` likewise.

```
"1 garbage"   -> 1        isError=false  offset=2/9
"[1,2] JUNK"  -> [1,2]    isError=false  offset=6/10
"nullnull"    -> null     isError=false  offset=4/8
"falsey"      -> false    isError=false  offset=5/6
'"a"b' (quotedString) -> "a"  isError=false  offset=3/4
```

The library **has** the machinery: `FLAG_EOF` (`parser.ts:22`), the trailing-content check with its `"unexpected trailing content after parsed value"` suggestion (`parser.ts:466-476`), and `Parser.eof()` (`parser.ts:638-642`). A document parser that is silently a prefix parser is a defect of posture, not of capability; the fix is one method call per export.

**Falsifier**: read `jsonParser` as an intentional prefix/streaming parser. — *Refuted by its own docstring, `json.ts:51`: "Combinator JSON parser with leading/trailing whitespace trimming" — it claims to handle the trailing region and does not.* Note this is the **only** failure class in the module for which the offset check is a sufficient detector; D-1's is not.

### D-7 · MAJOR · `quotedString(quote)` interpolates caller input raw into a `RegExp` character class

`parsers/utils.ts:16` — ``regex(new RegExp(`[^${quote}\\\\]+`))``. `quote` is a public `string` parameter with a default (`:15`); nothing validates it.

| call | result |
|---|---|
| `quotedString("\\")` | **throws `SyntaxError: Invalid regular expression: /[^\\\]+/: Unterminated character class`** — at *construction*, before any input is seen |
| `quotedString("]")` | returns **`[]`** — an array from a `Parser<string>`; `[^]` swallows the class and the grammar degenerates (D-3's type violation) |
| `quotedString("^")` | `"x"` — correct **only by accident** (`[^^\\]+` happens to mean the right thing) |
| `quotedString("")` | `"x"` — silently parses an unquoted token; the "quoted string" parser now requires no quotes |

**Falsifier**: argue `quote` is internal-only. — *Refuted: it is re-exported at `utils-entry.ts:12` and is the first positional parameter of a public factory.* Any consumer computing a delimiter from configuration hands the library an uncaught `SyntaxError` at construction time.

### D-8 · MAJOR · zero consumers — repo-wide **and** constellation-wide; the design-note justification is stale

parse-that's own precept, written into a gate: *"A never-importable export is not part of the public contract; an export born one prior tranche with zero workspace consumers is dead by the precept"* (`scripts/proof-no-dead-combinator.mjs:10-11`), whose consumer sweep spans `parse-that/src`, `parse-that/test`, `value.js/src`, `keyframes.js/src` (`:62-67`). Applying that same sweep to this entry's seven exports:

- `parse-that/src` — only the definition and barrel sites (`utils-entry.ts`, `parsers/index.ts`, `index.ts:5`).
- `parse-that/test` — 1 reference total (`json-vectors.test.ts` → `jsonParser`); D-4.
- **`value.js/src` — zero, and structurally so: value.js 4.0.0 does not depend on `@mkbabb/parse-that` at all.** `package.json#dependencies` = `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `devDependencies` has no `@mkbabb/parse-that`; zero `from "@mkbabb/parse-that"` imports in `src/` or `demo/`.
- `keyframes.js/src` — zero; its own comment records the subpath as *"`parse-that`-FREE"* (`src/animation/internal/leaves.ts:9-10`).
- The megatranche CSS-parser prototypes **do** consume parse-that — from the **root barrel**, `/core`, and `/diagnostics`. Grepped: **zero** imports of `@mkbabb/parse-that/utils` and zero uses of any of the seven names.

This makes the provenance note at `utils.ts:150-156` — *"These are the primitives a hand-rolled grammar (value.js's canonical CSS grammar) drives its hot paths with"* — **false at today's tree**. It may have been true when the CSS grammar left for value.js (D2/D3); it is not true now, and it is the only stated justification for keeping `skipWhitespace`/`skipBlockComments`.

**Falsifier**: an external (non-workspace) consumer. — *Unfalsifiable from inside the repo, and I do not claim it is falsified: `/utils` is a published subpath of a published package, so unknown consumers may exist.* That bounds the disposition (excision is a breaking change requiring a major), not the finding. The record already sets the precedent both ways: `index.ts:10-12` documents 15 `*Span` closure builders **excised in the 1.0.0 cut** precisely for being *"a zero-consumer surface"*. The same rule was not applied here.

### D-9 · MAJOR · the `/utils` tier drags the entire library; the declared tier separation is false at the built bytes

`core.ts:4-5` states the contract for the family: *"A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers."* Measured:

```
dist/utils.js:1  import { s, b } from "./diagnostics-DDazRHgl.js";            (3,516 B)
dist/utils.js:2  import { f as dispatch, n as string, r as regex,
                          P as Parser, c as any }
                   from "./packrat-entry-CS1td-8B.js";                        (40,576 B)
```

`/utils` — the "batteries-included helpers" tier — pulls **44,092 B** of chunk to expose 2,039 B of entry, including the whole packrat/LR machinery (`grep -c "growLR|makeMemoized|MEMO"` → 27 hits in that chunk), `debug.ts`'s printers, and `ansi.ts`. Node ESM parses and **evaluates** all of it at import; there is no lazy boundary.

Cause is upstream of the entry and fixable there: `json.ts:5`, `csv.ts:5`, `parsers/utils.ts:4` all import from `"../index.js"` — the **full barrel**, which at `index.ts:8` re-exports `memoize, mergeMemos, resetPackrat` — when every symbol they actually use (`Parser, string, regex, any, dispatch`) is exported by `"../core.js"` (`core.ts:7-25`). A three-line rewrite.

Two riders, stated so the finding is not overclaimed:

- **The separation is equally false for `/core` itself.** `dist/core.js:1` imports from the *same* `packrat-entry-CS1td-8B.js` chunk. So `core.ts:4-5`'s promise is unmet for its own subpath — a family-level defect this module inherits rather than causes. Recorded here because it is the reason the `../index.js` → `../core.js` fix alone would **not** shrink the chunk; the chunking strategy in `vite.config.ts:11-19` (five entries, shared-chunk output, no `manualChunks`) is the load-bearing cause.
- **The same import choice creates a genuine ESM cycle**: `index.ts:14` `export * from "./parsers/index.js"` → `parsers/index.ts:5` → `json.ts:5` → `../index.js`. It currently resolves only because `index.ts:14` is the **last** statement, so `leaf.js`'s bindings (`index.ts:9`) are initialised before `json.ts` reads them. **Falsifier**: move `index.ts:14` above `:9` and the package dies at import with a TDZ `ReferenceError`. A one-line-move fragility in a barrel with no test pinning statement order.

### D-10 · MAJOR · `mergeErrorState` allocates two provably-unreachable arrays per furthest-advance, on the accept path, with diagnostics off

`utils.ts:32-35`:

```ts
state.furthest = state.offset;
state.expected = diagnosticsEnabled && label ? [label] : undefined;
state.suggestions = [];        // ← unconditional
state.secondarySpans = [];     // ← unconditional
```

`expected` is correctly gated on `diagnosticsEnabled`. `suggestions` and `secondarySpans` are **not** — yet the only two writers of those arrays, `addSuggestion` (`utils.ts:51-55`) and `addSecondarySpan` (`utils.ts:57-61`), are **both** gated on the same flag. With diagnostics off every one of these arrays is allocated, assigned, and provably never pushed to.

Measured by replacing the three own properties with counting accessors on a `ParserState` and invoking `jsonParser.parser(state)` directly (`diagnosticsEnabled === false` throughout):

| input | bytes | furthest-advances | unreachable arrays allocated | arrays / KB |
|---|---|---|---|---|
| `[{id,name,tags,ok}]` ×1 | 49 | 3 | 6 | 125.4 |
| ×10 | 486 | 26 | 52 | 109.6 |
| ×100 | 5,031 | 251 | 502 | 102.2 |
| ×400 | 20,781 | 1,001 | **2,002** | 98.7 |

**Linear in input size, ~100 arrays per KB, on the successful path.** (Reject-path inputs allocate only 2 — `furthest` advances once and stops.) These are small young-generation objects and I make **no timing claim**; the finding is allocation discipline, in a library whose own comments in this very file boast *"no closure-per-step, no Parser allocation"* (`utils.ts:152-153`) and whose `parser.ts:397-398` counts *"2 intermediate function frames per invocation"* as worth inlining away.

**Falsifier**: are the arrays reachable with diagnostics off? — *No. `addSuggestion`/`addSecondarySpan` are the sole `push` sites and both early-return on `!diagnosticsEnabled`; `collectDiagnostic` (`utils.ts:120-122`) spreads them but is reachable only via `recover()` (`parser.ts:666`), which this entry never composes.* **Falsifier**: is the assignment needed to *clear* stale state? — *Only when diagnostics are on; when off the arrays are permanently empty, so `if (diagnosticsEnabled) { state.suggestions = []; state.secondarySpans = []; }` is semantics-preserving.* One conditional retires the whole class.

### D-11 · MAJOR · the recursion ceiling on the shipped export is a JIT-dependent range (1,493 → 4,139), and `RangeError` escapes `.parse()`

`json.ts:25` and `json.ts:28` each open a `Parser.lazy` back-edge (`parser.ts:702-707` → `createLazyCached`, `lazy.ts:18-24`); nested JSON recurses through both, and each level costs several frames (`dispatch` → `lazy` → `wrap` → `trim` → `sepBy` → `dispatch`), not one.

```
COLD (one parse per fresh node process, bisected):   deepest OK = 1,493 ; RangeError at 1,494
WARM (bisect within one process, 5 searches):        2,859 · 2,863 · 3,583 · 4,139 · 4,139
Fresh-process spot checks:  1,000 OK · 2,000 RangeError · 3,000 RangeError · 50,000 RangeError
Bare arity-1 lazy chain, warm, same box:             6,672   (O-15 PT-04 reports 7,761)
```

Three things follow. **(a)** PT-04's crisp "7,761 / 7,762" is not a property of the library; it is a sample. Even the bare arity-1 chain measured 6,672 here. **(b)** The consumer-facing ceiling on this entry's headline export is up to **5× lower** than the corpus number, and in a cold process — the realistic case for a CLI or a serverless invocation — it is **1,493**. **(c)** The failure escapes: `jsonParser.parse(deep)` **throws `RangeError: Maximum call stack size exceeded`** out of `.parse()`, giving this surface a *third* mutually inconsistent posture for bad input alongside D-3's silent-wrong-value and D-20's raw `TypeError`.

**Falsifier**: is the variance my harness? — *Partly, and that is the point: the ceiling moves with JIT tiering, which is exactly why it cannot be pinned as a constant. The cold number is stable — 1,493 OK / 1,494 RangeError reproduced by bisection across ~10 fresh processes; and 1,494 flips to OK the moment a prior parse warms the same process (measured 3×).* A ceiling that depends on whether the caller parsed anything earlier is not a bound.

This is precisely the debt parser-band made binding on the wave (WHAT CAND-O OWES CAND-F §3): *"the stack ceiling becomes an ordinary `ok:false` by construction."* `jsonParser` has neither a construction bound nor a catch.

### D-12 · MINOR · `package.json#sideEffects: false` is untrue

`parser.ts:711` is a bare top-level call, `_initWhitespace();`, present in the built chunk at `packrat-entry-CS1td-8B.js:1416`. It initialises the module-level `whitespace` singleton declared `export let` at `leaf.ts:395-399`, which `Parser.trim()` defaults to (`parser.ts:481`) — i.e. it is load-bearing for `jsonParser` and `csvParser`, both of which are `.trim()`-terminated (`json.ts:52`, `csv.ts:17`). The declaration is currently unexploitable because the build emits one chunk, but it is a false statement to every bundler that reads it.

### D-13 · MINOR · the entry duplicates `parsers/index.ts` verbatim

`utils-entry.ts:7-14` and `parsers/index.ts:5-8` are the **same four export statements over the same four specifiers**. Either the entry should re-export `./parsers/index.js` in one line, or `parsers/index.ts` is dead (it is reachable only via `index.ts:14`, which is D-9's cycle edge). Two files must now be edited in lockstep with nothing enforcing it.

### D-14 · MINOR · dead imports

`csv.ts:5` imports `Parser`; `csv.ts` never references it (only `regex`, `any`, `string`). `parsers/utils.ts:4` imports `Parser`; likewise unreferenced. Under `verbatimModuleSyntax: true` (`tsconfig.json`) these are emitted as real value imports. Two of the three files behind this entry carry an unused symbol from the very barrel that is D-9's root cause.

### D-15 · MINOR · byte-identical number regex, twice, both unguarded

`json.ts:21` and `parsers/utils.ts:22` both hold `/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/`, both `.map(Number)`. `numberParser()` is the extracted form; `json.ts` does not use it. One is redundant and they can silently diverge. Both share the unguarded conversion: `numberParser().parse("1e400")` → **`Infinity`** (measured; `Number.isFinite` → false) — the exact hazard parser-band debited cand-F for admitting into `lab()` (MEASURED §, `lab(50 1e400 0)` row).

### D-16 · MINOR · `Parser<any>`; the exported `JsonValue` type is decorative

`json.ts:39-40` disables `@typescript-eslint/no-explicit-any` to type `jsonValue` as `Parser<any>`; `jsonParser` inherits it (`dist/parsers/json.d.ts`: `export declare const jsonParser: Parser<any>`). `utils-entry.ts:8` then exports `JsonValue` — a precise, well-written 7-member recursive union (`json.ts:7-13`) — which **is connected to nothing**: `jsonParser.parse()` returns `any`, so every consumer gets zero checking and `JsonValue` can only be applied by a manual annotation the library never suggests. The `any` is genuinely needed to break the `jsonValue`/`jsonArray`/`jsonObject` initialisation cycle; the cure is a declared binding type (`const jsonValue: Parser<JsonValue> = dispatch(…)`, `any` confined to the argument), not an exported type with no referent.

### D-17 · MINOR · allocation posture is inconsistent *within the single entry file*

`jsonParser` and `csvParser` are module-level `const`s — built once at import. `escapedString`, `quotedString`, `numberParser` are **factories**: measured `numberParser() !== numberParser()` and `escapedString() !== escapedString()`. Each call allocates a fresh `Parser` graph, and `quotedString` additionally compiles a **new `RegExp`** every call (`parsers/utils.ts:16`). If the factory shape exists to parameterise (`quote`), then `escapedString` and `numberParser` — which take **no** parameters and close over nothing — have no excuse; both could be `const`s exactly as `jsonNumber` (`json.ts:21`) already is.

### D-18 · MINOR · RFC 4180 is unimplemented and undeclared

`csv.ts:11-13`'s quoted arms are `regex(/[^"]+/)` / `regex(/[^']+/)`. Doubled-quote escaping (`""`) — the RFC 4180 mechanism, used throughout the repository's own `data/csv/data.csv` — terminates the field at the first inner quote (D-1's row-1 truncation). Neither the docstring (`csv.ts:2-3`, `:19`) nor the entry (`utils-entry.ts:9`) declares the dialect or the limitation. A CSV parser that names no dialect is under-specified regardless of its bugs.

### D-19 · MINOR · `proof:subpath` does not gate this subpath's surface

`test/subpath-gate.mjs:26-36` checks that all four subpaths' `types`/`import`/`require` targets **exist**; `:39-55` then imports and asserts *symbols* for `./core` (`Parser`, `dispatch`) and `./packrat` (`memoize`) only. `./utils` and `./diagnostics` get existence checks and nothing else. The gate's own success message (`:57-60`) is accurate about this, so it is not dishonest — but it means **no gate anywhere asserts that `@mkbabb/parse-that/utils` exports anything at all**, and combined with D-4 (zero tests for six of seven) the subpath is unguarded end to end.

### D-20 · INFO · PT-07 refined and partially contradicted: non-string handling is four-way non-uniform

Seven non-string inputs (`null, undefined, 42, {}, ["a"], Symbol, 1n`) against each export:

```
jsonParser       7/7 throw   TypeError: Cannot read properties of null|undefined (reading 'length')
                             TypeError: src.charCodeAt is not a function
csvParser        7/7 throw   (same three messages)
quotedString()   7/7 throw   TypeError: Cannot read properties of null|undefined (reading 'charCodeAt')
escapedString()  7/7 throw   TypeError: state.src.charCodeAt is not a function
numberParser()   5/7 throw   — and:
                 {}      -> returns undefined, NO THROW
                 ["a"]   -> returns undefined, NO THROW
                 Symbol  -> TypeError: Cannot convert a Symbol value to a string
plus, across the entry:
  new String("42")     -> numberParser() returns 42   (a non-string that SUCCEEDS)
  new String("[1,2]")  -> jsonParser returns [1,2], isError=false
```

Mechanism for the non-throwing cases: `regex` (`leaf.ts:326-330`) tests `state.offset >= state.src.length`; `({}).length` is `undefined`, so `0 >= undefined` is `false` and the guard passes; `sticky.test(state.src)` then coerces to `"[object Object]"`, fails to match, and the parser reports an ordinary error. When the coercion *does* match (`42` → `"42"`, `1n` → `"1"`), `state.src.substring` (`leaf.ts:350`) throws instead.

So the corpus row **"5/5 non-string inputs throw a raw `TypeError`"** does not generalise across this entry: the surface throws (in three un-unifiable messages, none naming the library, parser, or parameter), silently returns `undefined`, **or silently succeeds**, depending on the input's `.length` and its string coercion. value.js's cure is correctly sited above parse-that (per O-15), so this remains INFO and not a request — but the entry re-publishes the unguarded boundary seven times over, and the "guard the JS boundary" debt parser-band made binding (§4) has more shapes here than the corpus records.

### D-21 · INFO · cross-entry latch coupling: `/utils` pays for `/packrat` with no opt-out

`/utils` cannot arm the latch itself — nothing it exports constructs a memoizer. But D-9 puts `/utils` and `/packrat` in the **same chunk** with the **same** `PACKRAT_ARMED` binding (`packrat-entry-CS1td-8B.js:678`), and `parser.ts:43-48` opens a packrat epoch on **every** `parseState`. Once any code in the process constructs one `memoize()` (`packrat.ts:290`, at *construction*), `packratEnter` (`packrat.ts:216-231`) begins allocating **three `Map`s plus one snapshot object per top-level parse**, forever: `resetPackrat` (`packrat.ts:262-272`) clears the tables and explicitly does **not** disarm, and no fifth assignment site exists in the bundle. A `/utils` consumer inherits the cost with no way to decline and no documentation of it at this entry. O-15's measured figure (93.9 → 138.2 ns/parse, 1.47×; 139.3 after `resetPackrat`) is cited as the corpus's own N=1 bound and **not** re-measured here — arming the latch is outside this audit's law.

### D-22 · INFO · O-15's PT-01 line cite has drifted

`dist/packrat-entry-*.js:881` → the `console.error` is now at **`:882`** in the 2026-07-29 rebuild (source `parser.ts:68`). The wildcard filename in O-15 survives the rebuild; the line number does not. The `diagnostics-DDazRHgl.js:14` cite is exact. Flagged so the evidence packet attached to the standing 1.1.0 ask is not quoted stale — the claim is unaffected, only the coordinate.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · The two byte-scanners are the best code this entry touches

`utils.ts:159-186`, published at `utils-entry.ts:6`. In-place `state.offset` mutation, zero allocation, zero closures, `charCodeAt(i) <= 32` bounded compare rather than a regex, and a memchr-style `src.indexOf("*/", i + 2)` (`:178`) for the comment close instead of a character loop. The unterminated-comment case `break`s at the comment start (`:179`) rather than scanning to EOF or looping — measured: `{src:"/*unterminated", offset:0}` leaves `offset` at `0` and returns.

**Falsifier**: find an input on which either loops or allocates. — *None exists. Both are single monotone `while` loops over a local `i`; `state.offset = i` is the only write in each, and no object, array, closure, or string is created on any path.* The provenance comment (`:150-156`) honestly records where they came from — its **claim about who consumes them** is what fails (D-8), not the code.

### S-2 · The JSON grammar is value-correct on the entire valid corpus

All 33 vectors of `grammar/tests/json/valid.jsonl`, differentially compared against native `JSON.parse`:

```
0/33 valid vectors produce a value differing from JSON.parse
33/33 fully consumed (offset === src.length, isError === false)
```

This matters for the disposition. The grammar in `json.ts` is **right**. Every BLOCKER above is a failure-posture, curation, or sibling-module defect — not a grammar defect. D-3, D-4 and D-6 are curable without touching a single production rule, and the cure for D-4 is to *keep* the corpus and replace the assertion.

### S-3 · `Object.fromEntries` closes the prototype-pollution class, and not by accident

`json.ts:35`. Verified: `jsonParser.parse('{"__proto__":{"x":1}}')` yields an object carrying `__proto__` as an **own** property (`hasOwnProperty` → `true`), and `({}).x` is `undefined` afterwards — `Object.fromEntries` uses `CreateDataPropertyOrThrow`, which does not trigger the `__proto__` setter, where the naive `for (const [k,v] of pairs) obj[k] = v` would. That naive form is exactly what the repo's *other* JSON grammar does (`test/json.test.ts:37-41`), so the shipped parser is strictly safer than its in-repo twin. Same bug class parser-band credited cand-O for ("null-prototype keyword tables closing a real bug class"), reached by a different and equally correct route.

### S-4 · `dispatch()` is used correctly, including the parts that are easy to get wrong

`json.ts:40-49` uses the `"0-9"` range key (`leaf.ts:116-119`) and relies on `internParser` (`leaf.ts:104-111`) to give `"t"`/`"f"` — both `jsonBool` — a **single shared slot by reference identity**, so the `Int8Array(128)` table (`leaf.ts:101`) holds 6 distinct parsers for 8 keys. First-char branching is genuinely O(1) behind a bounds-checked `ch < 128` guard (`leaf.ts:137`), and the diagnostic label is precomputed at construction (`leaf.ts:128-132`) so it costs nothing on the hot path. Textbook use of the primitive.

### S-5 · `jsonString`'s two-mode map is the right zero-alloc fast path

`json.ts:22-24` — `s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s)`. The common case (no escapes) avoids the `JSON.parse` call entirely with one `indexOf`; the rare case delegates to the spec-correct native decoder rather than hand-rolling a table. This is both faster and more correct than a uniform hand decode — and it is the implementation `parsers/utils.ts` needed and did not reuse (D-2). Worth naming as the in-file model for the D-2 repair.

### S-6 · `many()`'s zero-width guard makes `csvParser` terminate rather than hang

`parser.ts:538` — `if (state.offset === savedOffset) break;`. `csvParser = line.many()` where `line = token.sepBy(delim).trim()`, and `sepBy` with `min = 0` succeeds consuming **nothing** (`parser.ts:623-625`). Without that one line `csvParser.parse("")` would spin forever; it returns `[]`. Stated plainly rather than scored twice: the identical guard at `parser.ts:605` is one of D-1's three mechanisms — the same defensive instinct is a virtue in the outer loop and a silent-data-loss bug in the inner one.

### S-7 · The S.H1 latch design is honest, and its documentation survives adversarial reading

`packrat.ts:210-216` claims the unarmed path *"returns `null` and touches no globals."* At the bytes: `packrat-entry-CS1td-8B.js:682` `if (!PACKRAT_ARMED) return null;` is the **first** statement of `packratEnter`, and `:714` guards `resetPackrat` symmetrically; `packratExit(null)` short-circuits at `packrat.ts:244`. The comment at `packrat.ts:284-290` explains *why* arming happens at construction rather than first invocation — so the latch is set before any memoized parse can open an epoch — and that reasoning is correct and load-bearing. PT-03's one-way property is a **deliberate, documented soundness trade**, not an oversight. The honest defect is only that it is undocumented at the entry that pays for it (D-21).

---

## RETRACTED — claims that did not survive their own falsifier

1. **"The `/utils` entry carries its own duplicate copy of the `diagnosticsEnabled` module global, so `enableDiagnostics()` imported from the root does not reach it."** Drafted from the multi-entry `vite.config.ts:11-19` build. **Refuted at the bytes**: Rollup emits **one** shared `diagnostics-DDazRHgl.js` chunk, imported by both `dist/utils.js:1` and `dist/diagnostics.js:1`, so the ESM graph has a single binding. (An ESM/CJS mixed-graph consumer would hold two — `utils.js` vs `utils.cjs` import different chunk files — but I did not construct such a consumer and therefore do not claim it.)

2. **"`csvParser` has no row production anywhere in its grammar; `many()` can only ever yield one row."** **Refuted by measurement**: `'"name","age"\r\n"John","30"\r\n"Jane","25"'` → **3 rows**. Row production exists (`many()` at `csv.ts:20` plus the newline-consuming `.trim()` at `:17`); it is defeated **only** by the unquoted `[^,]+` arm at `csv.ts:14`. The correct, narrower claim is D-1, and the difference matters: the repair is one character class, not a new production.

3. **"`mergeErrorState`'s unconditional array allocation is O(1) per parse and therefore INFO."** **Refuted by measurement**: it is linear in input size (≈100 arrays/KB; 2,002 for a 20,781-byte document). Promoted to MAJOR as D-10.

---

## SUPERSEDES — corrections to the prior draft at this path

A prior challenge existed at this path (same served model id, 268 lines). Independently re-derived; converging findings are not re-credited, but three of its claims are **wrong at today's tree** and are corrected here rather than silently dropped:

| prior claim | correction |
|---|---|
| *"value.js's canonical CSS grammar drives its hot paths with `skipWhitespace`/`skipBlockComments`, which justifies **those two**"* | **False.** value.js 4.0.0 has no dependency on `@mkbabb/parse-that` and zero imports of it; `keyframes.js` likewise; the megatranche prototypes import the root barrel / `/core` / `/diagnostics`, never `/utils`. All **seven** exports are zero-consumer (D-8). The prior draft's own falsifier was accepted without checking `package.json#dependencies`. |
| *"there is **no row production anywhere in the grammar**; `many()` can therefore only ever yield one row"* | **False.** Quoted-field CSV splits rows correctly (3 rows measured). See RETRACTED §2 — and note the consequence: the prior draft's disposition ("excise `csvParser`") is heavier than the evidence requires. |
| *"`RangeError` at 2,967; deepest OK 2,966"* stated as a fact | **Not reproducible.** That is one sample from a JIT-dependent range: cold 1,493, warm 2,859–4,139 across five in-process searches on this box (D-11). A crisp ceiling should not enter the ledger. |

Additionally, the prior draft did not measure: `csvParser` against the repo's own `data.csv` (the strongest single piece of evidence in this file), `test/csv.test.ts`'s inline-copy problem, the `mergeErrorState` allocation scaling, `numberParser()`'s non-uniform non-string behaviour, `/utils`'s inability to name `ParserState`, or the `proof:subpath` coverage gap.

---

## COUNTS

| | |
|---|---|
| **defects** | **22** (D-1 … D-22) |
| **blockers** | **4** (D-1, D-2, D-3, D-4) |
| major | 7 (D-5 … D-11) |
| minor | 8 (D-12 … D-19) |
| info | 3 (D-20, D-21, D-22) |
| **superlatives** | **7** (S-1 … S-7) |
| retracted | 3 |
| STOP findings | 0 |

**Disposition.** The 14 lines should shrink to a curated set, in this order of confidence:

1. **Keep `skipWhitespace` / `skipBlockComments`** — the only exemplary code here (S-1) — but narrow the parameter to `{ src: string; offset: number }` so `/utils` becomes self-sufficient (D-5), and **replace the stale provenance claim** at `utils.ts:150-156` with the truth: zero current consumers, retained as primitives (D-8).
2. **Keep `jsonParser`** — its grammar is correct (S-2, S-3, S-4, S-5) — after `.eof()` (D-6), a `parseState`-based public surface or a documented `isError` contract (D-3), `JsonValue` connected to the binding (D-16), and a declared depth bound (D-11). Replace `test/json-vectors.test.ts`'s assertion with a `JSON.parse` differential and wire `invalid.jsonl` (D-4) — that single edit turns a vacuous suite into a real one and would have caught D-3 and D-6 on the day they were written.
3. **`csvParser`** — repair or excise, but **declare a dialect either way** (D-18). The repair is small (a row production plus RFC 4180 `""`); the excision follows the `*Span` precedent at `index.ts:10-12`. What must not persist is the current state: a published, untested, zero-consumer parser that corrupts the repository's own fixture and reports success.
4. **`escapedString` / `quotedString` / `numberParser`** — excise. They are zero-consumer (D-8), wrong at the value level (D-2), unsafe at the boundary (D-7), duplicative (D-15), and inconsistently shaped (D-17); `parse-that`'s own precept (`proof-no-dead-combinator.mjs:10-11`) already names the disposition. If any is kept, `numberParser` is the only defensible one, and only as a `const`.
5. **Independent of the above**, two cheap repairs retire whole classes: `../index.js` → `../core.js` in `json.ts:5` / `csv.ts:5` / `parsers/utils.ts:4` (D-9's cycle and its dead imports, D-14), and the one conditional at `utils.ts:34-35` (D-10's ~100 unreachable allocations per KB, on every parse in the library, not just this entry's).
