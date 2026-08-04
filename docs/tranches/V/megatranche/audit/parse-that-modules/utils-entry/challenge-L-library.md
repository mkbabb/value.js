claude-opus-5[1m]

# CHALLENGE — `utils-entry` · axis L (LIBRARY)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/utils-entry.ts` (14 lines, 598 B)
**Read whole**: target + `utils.ts` (187) + `parsers/json.ts` (53) + `parsers/csv.ts` (21) + `parsers/utils.ts` (24) + `parsers/index.ts` (9) + the transitive core it pulls (`index.ts`, `core.ts`, `parser.ts`, `leaf.ts`, `state.ts`, `lazy.ts`, `diagnostics.ts`, `packrat-entry.ts`) — read-only.
**Measured against**: `typescript/dist/` as built 2026-07-29 14:20 (`packrat-entry-CS1td-8B.js`, `diagnostics-DDazRHgl.js`), node v26.0.0, darwin arm64, default stack unless stated. No diagnostics armed (`enableDiagnostics` never called); no `memoize()` constructed, so `PACKRAT_ARMED` stayed `false` throughout — the one-way latch was **not** tripped by this audit.
**STOP-probe**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` — `ls` → *No such file or directory*. **Absent, as required. No STOP finding.**

---

## VERDICT

**DEFECTIVE — 17 defects, 4 of them BLOCKER.**

The 14-line file is not the defect; it is a clean, honest, correctly-sized barrel. The defect is **what it publishes**. `utils-entry.ts` is the sole public gate for the `"@mkbabb/parse-that/utils"` subpath (`package.json#exports["./utils"]` → `dist/utils.js`), and it elevates to public API three surfaces that are wrong at the value level — `quotedString`/`escapedString` do not unescape, `csvParser` does not parse CSV, and every one of these fails by returning a **plausible partial value** rather than a failure signal. Six of its seven exports have **zero** consumers and **zero** tests anywhere in the repository; the seventh is guarded by a single assertion that **7 of 7** of the repo's own never-read invalid vectors pass.

An entry file's job on the LIBRARY axis is to be a curator. This one curates unowned code.

---

## CORPUS FOLD — O-15 (PT-01..PT-07) re-verified at today's bytes

O-15 was measured 2026-07-27; `dist/` was rebuilt **2026-07-29 14:20**. Re-read rather than re-narrated:

| row | O-15 claim | today's bytes | disposition |
|---|---|---|---|
| **PT-01** | `label` a no-op unless armed; arming couples an unconditional `console.error`; cites `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881` | `diagnostics-DDazRHgl.js:14` = `state.expected = diagnosticsEnabled && label ? [label] : void 0;` ✅ exact. `console.error` is at `packrat-entry-CS1td-8B.js:`**`882`**, not `:881` | **CONFIRMED, one cite drifted +1 line** in the 07-29 rebuild. Source is `parser.ts:67-69`. Wildcard filename in O-15 survives; the line number does not. Flagging so the ask's evidence packet is not quoted stale. |
| **PT-03** | one-way latch: `:678` false, `:722` true, read `:682`/`:714`, no assignment back to false | `grep -n PACKRAT_ARMED packrat-entry-CS1td-8B.js` → **exactly four** hits: `678` `let PACKRAT_ARMED = false;` · `682` `if (!PACKRAT_ARMED) return null;` · `714` `if (!PACKRAT_ARMED) return;` · `722` `PACKRAT_ARMED = true;` | **CONFIRMED BYTE-EXACT — all four line numbers survive the rebuild.** No fifth site ⇒ no disarm. Arm site is `packrat.ts:290`, inside `makeMemoized`, i.e. at *construction*. |
| **PT-04** | `Parser.lazy` arity 1: deepest OK **7,761**, `RangeError` at 7,762 | through the **shipped** `jsonParser` (two `Parser.lazy` back-edges, `json.ts:25`/`:28`): deepest OK **2,966**, `RangeError` at **2,967** | **REFINED — see D-8.** PT-04's number is a synthetic floor; the consumer-facing ceiling on this entry's headline export is **2.6× lower**. |
| **PT-07** | 5/5 non-string inputs throw raw `TypeError`; `.parse()` returns `undefined` on failure, indistinguishable from a successful `undefined` | 5/5 throw raw `TypeError`, in **two** distinct un-unifiable messages ✅ (D-16). But `.parse()` returning `undefined` on failure is the **benign** case — **see D-1** | **CONFIRMED on the throw half; PT-07 UNDERSTATES the ambiguity half.** The failure value is not `undefined`; it is arbitrary partial parse residue. |
| PT-02, PT-05, PT-06 | — | not reachable from this entry's surface | out of scope for this module. |

**Wave specs / registry**: `X/parse-that/waves/W1..W4` and `registry/adjudicated/parser-band.md` scope the **CSS** grammar and the value.js `/css` subpath (`universe-52.json`, the 19 runtime exports, MT-F024). Grepped: **no** wave spec and **no** parser-band row touches `jsonParser`, `csvParser`, `quotedString`, `escapedString`, `numberParser`, `skipWhitespace`, or `skipBlockComments`. This entry is **outside** the adjudicated band — nothing here contradicts the band, and the band offers this entry no cover. Two parser-band findings do transfer as precedent and are cited inline: the "**entry via `parseState` + `isError`, never `parse()` truthiness**" idiom reading (IDIOM READING §), which D-1 shows this entry's own test violates; and cand-F's "**JS-boundary non-string guard**" debt (WHAT CAND-O OWES CAND-F §4), which D-16 shows is unpaid here.

---

## DEFECTS

### D-1 · BLOCKER · `.parse()` returns a plausible, truthy, WRONG value on failure

`utils-entry.ts:7` publishes `jsonParser`. `Parser.parse()` (`parser.ts:77-79`) is `return this.parseState(val).value` — it **never consults `isError`**. Worse, `parseStateInner` builds a correct error view at `parser.ts:60-66` and then **discards it**, returning the raw mutated `state` at `parser.ts:74`. The residue left by the last combinator to touch `state.value` escapes as the caller's result.

Measured:

| input | `.parse()` returns | valid input producing the **same** value |
|---|---|---|
| `"{"` | `[]` | `"[]"` |
| `"["` | `[]` | `"[]"` |
| `"[1,2"` | `[1,2]` | `"[1,2]"` |
| `'{"a": 1, "a": 2'` | `[["a",1],["a",2]]` | — (leaks the pre-`Object.fromEntries` pair array: neither the success type nor `undefined`) |
| `"[1 2 3]"` | `[1]` | `"[1]"` |

Mechanism: `wrap` (`parser.ts:416-423`) restores `offset` and sets `isError` on a missing close delimiter but leaves `state.value` holding the inner result; `map` (`parser.ts:150-153`) then declines to run on error, so even the `Object.fromEntries` normalisation is skipped.

**Falsifier**: exhibit any call path in which `jsonParser.parse(truncated)` is distinguishable from `jsonParser.parse(valid)` by the return value alone. — *Not found. `parse("[")` and `parse("[]")` are `===`-indistinguishable (`[]` vs `[]`, both length 0).* The distinguishing signal exists only on `parseState().isError`, which `parse()` throws away. This is the exact hazard the parser-band adjudication named as the correct idiom ("entry via `parseState` + `isError`, **never `parse()` truthiness**") — and `parse()` is the only method this entry's own test uses.

### D-2 · BLOCKER · `quotedString`/`escapedString` do not unescape; `\uXXXX` payload is discarded

`utils-entry.ts:10-11` publishes both. `parsers/utils.ts:14` documents `quotedString` as "Parse a quoted string **with escape handling**."

`parsers/utils.ts:11` — `.map(([, esc]) => esc)` yields the escape **letter**, never the escaped character. `parsers/utils.ts:10` — `string("u").skip(regex(/[0-9a-fA-F]{4}/))`: `.skip` keeps the left value (`"u"`) and **drops** the four hex digits it consumed, so the entire code point is annihilated.

| call | returns | correct |
|---|---|---|
| `escapedString().parse("\\u0041")` | `"u"` | `"A"` |
| `escapedString().parse("\\n")` | `"n"` | `"\n"` |
| `quotedString().parse('"a\\nb"')` | `"anb"` | `"a\nb"` |
| `quotedString().parse('"a\\u0041b"')` | `"aub"` | `"aAb"` |

**Falsifier**: find one escape sequence for which `quotedString()` produces the unescaped character. — *None exists.* The map is a pure identity on the escape letter; there is no decode table anywhere in the file. Note the sibling `jsonString` (`json.ts:22-24`) does this **correctly**, delegating to `JSON.parse` when a backslash is present — the correct implementation is 30 lines away in the same entry's import set (D-13 is its duplication twin).

### D-3 · BLOCKER · `csvParser` does not split rows, and an empty field silently truncates the row

`utils-entry.ts:9` publishes `csvParser`, documented `csv.ts:19` as "returns array of rows, each an array of string fields."

| input | returns | correct |
|---|---|---|
| `"a,b\nc,d"` | `[["a","b\nc","d"]]` | `[["a","b"],["c","d"]]` |
| `"a,,b"` | `[["a"]]` — **`"b"` is silently destroyed** | `[["a","","b"]]` |

Mechanism, two independent bugs: (i) `csv.ts:14` `regex(/[^,]+/)` excludes only the comma, so a newline is an ordinary field character, and `csv.ts:17` `.trim()` consumes newlines as whitespace — there is **no row production anywhere in the grammar**; `many()` at `csv.ts:20` can therefore only ever yield one row. (ii) On `a,,b`, `sepBy` reads `a`, consumes the separator, then the element matches zero-width; `parser.ts:605` (`state.isError || state.offset === savedOffset`) treats zero-width as trailing-separator and **breaks**, backtracking to before the separator — the remainder of the line is abandoned, not reported.

**Falsifier**: exhibit any multi-row input that `csvParser` splits into ≥2 rows. — *None. `csvParser.parse("a\nb\nc")` → `[["a\nb\nc"]]`.* The name is the whole of the claim; the code does not implement it.

### D-4 · BLOCKER · the entry's only test asserts a property that 7/7 of the repo's own invalid vectors satisfy

`test/json-vectors.test.ts` is the **only** test touching any `/utils` export. Its entire assertion (`:28-29`):

```ts
const result = jsonParser.parse(input);
expect(result).not.toBeUndefined();
```

It reads `valid.jsonl` only (`:22`). `grammar/tests/json/invalid.jsonl` — **7 vectors, sitting in the same directory** — is never opened. I wired them to the existing assertion:

```
{key: "value"}        -> []                    isError=true   passes not.toBeUndefined() = true
{'key': 'value'}      -> []                    isError=true   passes = true
{"a": undefined}      -> []                    isError=true   passes = true
{true: 1}             -> []                    isError=true   passes = true
[1 2 3]               -> [1]                   isError=true   passes = true
{"a": 1, "a": 2       -> [["a",1],["a",2]]     isError=true   passes = true
[}                    -> []                    isError=true   passes = true
>>> 7/7 invalid vectors PASS the suite's only assertion
```

Had the maintainer wired `invalid.jsonl` into the existing test with the existing assertion — the obvious next commit — the suite would have gone **GREEN while accepting every malformed input in it**. The assertion is *structurally incapable* of detecting rejection, because of D-1. The test also never compares the parsed value to `JSON.parse`, so it asserts nothing about correctness either (that it would have passed is D-4's own good news — see S-4).

**Falsifier**: show that `not.toBeUndefined()` discriminates accept from reject for this parser. — *Refuted 7/7 above; `isError` is `true` in all seven and invisible to the assertion.*

### D-5 · MAJOR · `quotedString(quote)` interpolates caller input raw into a `RegExp` character class

`parsers/utils.ts:16` — `regex(new RegExp(`[^${quote}\\\\]+`))`. `quote` is a public `string` parameter with a default; nothing validates it.

| call | result |
|---|---|
| `quotedString("\\")` | **throws `SyntaxError: Invalid regular expression: /[^\\\]+/: Unterminated character class`** — at *construction*, before any input is seen |
| `quotedString("]")` | returns **`[]`** — an **array** from a `Parser<string>`; `[^]` swallows the class and the grammar degenerates |
| `quotedString("^")` | `"x"` — correct *only by accident* (`[^^\\]+` happens to mean the right thing) |

**Falsifier**: argue `quote` is internal-only. — *Refuted: it is re-exported at `utils-entry.ts:10` and is the first positional parameter of a public factory.* Any consumer computing a quote character from configuration hands the library an uncaught `SyntaxError`. The `]` case additionally violates the declared return type at runtime (D-14's twin).

### D-6 · MAJOR · no `eof()` — silent prefix acceptance on the headline export

`json.ts:52` — `export const jsonParser = jsonValue.trim();`. No `.eof()`.

`"1 garbage"` → `1` · `"[1,2] JUNK"` → `[1,2]` · `"nullnull"` → `null` · `"falsey"` → `false`.

The library **has** the machinery: `FLAG_EOF` (`parser.ts:22`), the trailing-content check with its `"unexpected trailing content after parsed value"` suggestion (`parser.ts:466-476`), and `Parser.eof()` (`parser.ts:638-642`). A document parser that is silently a prefix parser is a defect of posture, not of capability; the fix is one method call.

**Falsifier**: read `jsonParser` as an intentional prefix/streaming parser. — *Refuted by its own docstring, `json.ts:51*: "Combinator JSON parser with leading/trailing whitespace trimming" — it claims to handle the trailing region, and does not.

### D-7 · MAJOR · the `/utils` subpath pulls the entire library — the declared tier separation is false

`core.ts:4-5` states the contract explicitly: *"A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers."* The `/utils` tier makes no such promise, but it has no reason to defeat it either. Measured at the built bytes:

```
dist/utils.js:1   import { s, b } from "./diagnostics-DDazRHgl.js";                       (3,516 B)
dist/utils.js:2   import { f as dispatch, n as string, r as regex, P as Parser, c as any }
                    from "./packrat-entry-CS1td-8B.js";                                   (40,576 B)
```

`/utils` — the "batteries-included helpers" tier — drags the **whole** 40,576-byte chunk containing packrat, the LR/GROWING machinery, `debug.ts`'s printers, and the diagnostics chunk. Cause is upstream of the entry and fixable there: `json.ts:5`, `csv.ts:5`, `parsers/utils.ts:4` all import from `"../index.js"` — the **full barrel**, which at `index.ts:8` re-exports `memoize, mergeMemos, resetPackrat` — when every symbol they actually use (`Parser, string, regex, any, dispatch`) is available from `"../core.js"` (`core.ts:7-25`).

The same import choice creates a genuine **ESM cycle**: `index.ts:14` `export * from "./parsers/index.js"` → `parsers/index.ts:5` → `json.ts:5` → `../index.js`. It currently resolves only because `index.ts:14` is the **last** statement, so `leaf.js`'s bindings (`index.ts:9`) are initialised before `json.ts` reads them. **Falsifier**: reorder `index.ts` so line 14 precedes line 9 and the package dies at import time with a TDZ `ReferenceError`. That is a one-line-move fragility in a barrel with no test pinning statement order.

### D-8 · MAJOR · recursion ceiling on the shipped export is 2,966 — not PT-04's 7,761

`json.ts:25` and `json.ts:28` each open a `Parser.lazy` back-edge; nested JSON recurses through both. Binary-searched at default stack, node v26.0.0:

```
DEEPEST OK nesting = 2966  |  at 2967 => RangeError
```

O-15 PT-04 reports 7,761 for a bare arity-1 `Parser.lazy`. Both are true; they measure different things. **The consumer-facing number for this entry's headline export is 2.6× lower**, because each JSON level costs several frames (`dispatch` → `lazy` → `wrap` → `trim` → `sepBy` → `dispatch`), not one. A `RangeError` also **escapes `.parse()` uncaught** — a third failure mode alongside D-1's silent-wrong-value and PT-07's raw `TypeError`, giving this surface three mutually inconsistent postures for three kinds of bad input.

This is precisely the debt parser-band made binding on the wave (WHAT CAND-O OWES CAND-F §3: *"Recursion bounded by construction, not by catch… the stack ceiling becomes an ordinary `ok:false` by construction"*). `jsonParser` is bounded by neither.

### D-9 · MAJOR · six of the entry's seven exports have zero consumers and zero tests

Grepped across `test/` and `src/`, excluding the definition and barrel files themselves:

```
csvParser         consumers=0        quotedString      consumers=0
escapedString     consumers=0        numberParser      consumers=0
skipBlockComments consumers=0        skipWhitespace    consumers=0
jsonParser        consumers=8
```

D-2, D-3 and D-5 are BLOCKERs that survived to a published subpath because **nothing in the repository ever calls this code**. On the LIBRARY axis the finding is not "add tests" — it is that an entry file published six unexercised symbols as public API, and the two of them that are genuinely excellent (S-1) are indistinguishable, from outside, from the three that are broken. The `*Span` precedent is on the record: `index.ts:10-12` documents 15 closure builders **excised in the 1.0.0 cut** precisely for being "a zero-consumer surface." The same rule was not applied here.

**Falsifier**: an external consumer (value.js) using these. — Checked: value.js's canonical CSS grammar drives its hot paths with `skipWhitespace`/`skipBlockComments` per the design note at `utils.ts:150-156`, which justifies **those two**. It justifies neither `csvParser` nor the three string-utility factories.

### D-10 · MINOR · `package.json#sideEffects: false` is untrue

`parser.ts:711` is a bare top-level call, `_initWhitespace();`, present in the built chunk at `packrat-entry-CS1td-8B.js:1416`. It initialises the module-level `whitespace` singleton declared `export let` at `leaf.ts:395`. The declaration is currently unexploitable because the build emits one chunk, but it is a false statement to every bundler that reads it, and it is load-bearing: `Parser.trim()` defaults to that very binding (`parser.ts:481`).

### D-11 · MINOR · the entry duplicates `parsers/index.ts` verbatim

`utils-entry.ts:7-14` and `parsers/index.ts:5-8` are the **same four export statements over the same four specifiers**. Either the entry should re-export `./parsers/index.js` in one line, or `parsers/index.ts` is dead. Two files must now be edited in lockstep for any change to the domain-parser surface, with nothing enforcing it.

### D-12 · MINOR · dead imports

`csv.ts:5` imports `Parser`; `csv.ts` never references it (only `regex`, `any`, `string` are used). `parsers/utils.ts:4` imports `Parser`; likewise unused. Two of the three files behind this entry carry an unused symbol from the barrel whose importation is D-7's root cause.

### D-13 · MINOR · byte-identical number regex, twice

`json.ts:21` and `parsers/utils.ts:22` both hold `/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/`, both `.map(Number)`. `numberParser()` is the extracted form; `json.ts` does not use it. One of the two is redundant and they can silently diverge. (Both share the unguarded `Number` conversion: `numberParser().parse("1e400")` → `Infinity` — the exact hazard parser-band debited cand-F for admitting into `lab()`.)

### D-14 · MINOR · `Parser<any>`; the exported `JsonValue` type is decorative

`json.ts:39-40` disables `@typescript-eslint/no-explicit-any` to type `jsonValue` as `Parser<any>`; `jsonParser` inherits it. `utils-entry.ts:8` then exports `JsonValue` — a precise, well-written 7-member recursive union — which **is connected to nothing**: `jsonParser.parse()` returns `any`, so every consumer gets zero checking and `JsonValue` can only be applied by a manual annotation the library never suggests. The `any` is genuinely needed to break the `jsonValue`/`jsonArray`/`jsonObject` cycle; the fix is a declared return type (`const jsonValue: Parser<JsonValue> = dispatch(...)` with the `any` confined to the `dispatch` argument), not an exported type with no referent.

### D-15 · MINOR · allocation posture is inconsistent *within the single entry file*

`jsonParser` and `csvParser` are module-level `const`s — built once. `escapedString`, `quotedString`, `numberParser` are **factories**: measured `numberParser() !== numberParser()`, `escapedString() !== escapedString()`. Each call allocates a fresh `Parser` graph — and `quotedString` additionally compiles a **new `RegExp`** every call (`parsers/utils.ts:16`). In a library whose own comments boast of eliminating "2 intermediate function frames per invocation" (`parser.ts:397-398`) and "no closure-per-step, no Parser allocation" (`utils.ts:152-153`), three of seven exports on the same entry hand the caller an unmemoised builder with no documented reason. If the factory shape exists to parameterise (`quote`), then `escapedString` and `numberParser` — which take **no** parameters — have no excuse.

### D-16 · INFO · PT-07 non-string: raw `TypeError`, in two un-unifiable messages

5/5 non-string inputs throw, confirming PT-07. But the messages differ by input class:

```
null / undefined  ->  TypeError: Cannot read properties of null (reading 'length')
42 / {} / ["a"]   ->  TypeError: src.charCodeAt is not a function
```

A caller cannot pattern-match one message, and neither names the library, the parser, or the parameter. This is the unpaid half of the parser-band debt "the JS-boundary non-string guard — both candidates converged on these independently; **keep both**." value.js's cure is correctly sited above parse-that (per O-15), so this is INFO, not a request — but the entry re-publishes the unguarded boundary at `utils-entry.ts:7`, `:9`, `:10-13`, seven times over.

### D-17 · INFO · cross-entry latch coupling: `/utils` pays for `/packrat` with no opt-out

`/utils` cannot arm the latch itself (nothing it exports constructs a memoizer). But D-7 puts `/utils` and `/packrat` in the **same chunk** with the **same** `PACKRAT_ARMED` binding, and `parser.ts:43` opens a packrat epoch on **every** `parseState`. So in any process that also imports `/packrat` and constructs one `memoize()`, every `jsonParser.parse()` silently inherits O-15's measured **1.47×** (93.9 → 138.2 ns/parse), permanently — `resetPackrat()` clears the store and leaves it at 139.3. A `/utils` consumer has no way to decline. The S.H1 latch design is sound in itself (S-6); the coupling is D-7's cost, surfacing as a performance cliff at a distance.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · The two exports that are *not* from `parsers/` are exemplary

`utils.ts:159-186`, published at `utils-entry.ts:6`. `skipWhitespace` and `skipBlockComments` are the best code this entry touches: in-place `state.offset` mutation, zero allocation, zero closures, `charCodeAt(i) <= 32` bounded compare rather than a regex, and a memchr-style `src.indexOf("*/", i + 2)` for the comment close instead of a character loop. The unterminated-comment case `break`s at the comment start (`utils.ts:179`) rather than scanning to EOF or looping — a deliberate, documented, **terminating** choice. The provenance comment (`utils.ts:150-156`) honestly records that these were harvested from the removed CSS parser and kept for value.js's hot paths. **Falsifier**: find an input on which either loops or allocates. — *None; both are single monotone `while` loops over `i`, and `state.offset = i` is the only write.*

### S-2 · `many()`'s zero-width guard makes `csvParser` fail safely rather than hang

`parser.ts:538` — `if (state.offset === savedOffset) break;`. `csvParser = line.many()` where `line = token.sepBy(delim).trim()` and `sepBy` with `min = 0` succeeds consuming **nothing** (`parser.ts:623-625`). Without that one line, `csvParser.parse("")` would spin forever. It returns `[]`. The identical guard at `parser.ts:605` is D-3's truncation mechanism — the same defensive instinct is a virtue in one place and a silent data-loss bug in the other, which is worth stating plainly rather than scoring twice.

### S-3 · `Object.fromEntries` closes the prototype-pollution class, and it is not an accident

`json.ts:35`. Verified by probe: `jsonParser.parse('{"__proto__":{"x":1}}')` yields an object carrying `__proto__` as an **own** property, and `({}).x` is `undefined` afterwards — `Object.fromEntries` uses `CreateDataPropertyOrThrow`, which does not trigger the `__proto__` setter, where a naive `for (const [k,v] of pairs) obj[k] = v` would. This is the same class parser-band credited cand-O for ("null-prototype keyword tables closing a real bug class"). Reached here by a different and equally correct route.

### S-4 · The accept path is value-correct on the full valid corpus

All 33 vectors of `grammar/tests/json/valid.jsonl`, differentially compared against native `JSON.parse`:

```
>>> 0/33 valid vectors produce a value differing from JSON.parse
```

This matters for the disposition. The grammar in `json.ts` is **right**. Every BLOCKER above is a *failure-posture* or *sibling-module* defect, not a grammar defect. D-1 through D-4 are curable without touching a single production rule, and the fix for D-4 is to keep the corpus and replace the assertion.

### S-5 · `dispatch()` is used correctly, including the parts that are easy to get wrong

`json.ts:40-49` uses the `"0-9"` range key and relies on `internParser` (`leaf.ts:104-111`) to give `"t"`/`"f"` — both `jsonBool` — a **single** shared slot by reference identity, so the `Int8Array(128)` table stays 6 entries wide for 8 keys. First-char branching is genuinely O(1) with a bounds-checked `ch < 128` guard (`leaf.ts:137`). The label is precomputed at construction (`leaf.ts:128-132`), so the diagnostic string costs nothing on the hot path. This is textbook use of the primitive.

### S-6 · The S.H1 latch design is honest, and its documentation survives adversarial reading

`packrat.ts:210-216` claims the unarmed path "returns `null` and touches no globals." Read at the bytes: `:682` `if (!PACKRAT_ARMED) return null;` is the first statement of `packratEnter`, and `:714` guards the exit symmetrically. The comment at `packrat.ts:286-290` explains *why* arming happens at construction rather than first invocation — so the latch is set before any memoized parse can open an epoch — and that reasoning is correct. The one-way property (PT-03) is a deliberate, documented soundness trade, not an oversight; the honest defect is that it is undocumented **at the `/utils` entry**, which pays for it (D-17).

---

## RETRACTED — a claim that did not survive its own falsifier

I probed `jsonParser.parse("truthy")` → `undefined` against `jsonParser.parse("falsey")` → `false` and drafted this as an asymmetry defect in `string()`'s prefix matching (`leaf.ts:296-306`). **Retracted.** `"truthy"` is `t-r-u-t-h-y`; it does not begin with `"true"`, so `startsWith` correctly returns `false`. `"falsey"` *does* begin with `"false"`. `string()` is correct; the asymmetry is lexical, in my test inputs. Isolation probe (`string("true").parseState("truthy")` → `isError=true, offset=0`) confirmed the primitive, and the observation survives only as a second witness for D-6 (`"falsey"` → `false` **is** silent prefix acceptance).

---

## COUNTS

| | |
|---|---|
| **defects** | **17** (D-1..D-17) |
| **blockers** | **4** (D-1, D-2, D-3, D-4) |
| major | 5 (D-5, D-6, D-7, D-8, D-9) |
| minor | 6 (D-10..D-15) |
| info | 2 (D-16, D-17) |
| **superlatives** | **6** (S-1..S-6) |
| retracted | 1 |

**Disposition.** The 14 lines of `utils-entry.ts` should shrink to a curated three: keep `skipWhitespace`/`skipBlockComments` (S-1, the only exports with a named consumer and a stated design rationale); keep `jsonParser` **after** D-1/D-6 are cured and `JsonValue` is connected (D-14) — its grammar is already correct (S-4). `csvParser`, `quotedString`, `escapedString` and `numberParser` are zero-consumer surfaces that are wrong at the value level (D-2, D-3, D-5) and should take the `*Span` precedent already set at `index.ts:10-12`: excision, not repair. That change is one line of `utils-entry.ts` plus the `parsers/` deletions, and it retires four defects including two BLOCKERs. D-7's `../index.js` → `../core.js` rewrite is three lines and retires a fifth.
