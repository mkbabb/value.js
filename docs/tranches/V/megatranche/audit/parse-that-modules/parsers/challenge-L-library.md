claude-opus-5[1m]

# CHALLENGE · `parse-that` module **`parsers`** · axis **L (LIBRARY)**

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/parsers/` — `index.ts` (8) +
`json.ts` (52) + `csv.ts` (20) + `utils.ts` (23) = **103 lines**, read whole, plus every file it
imports (`../index.js` → `parser.ts` 711 · `leaf.ts` 399 · `state.ts` 189 · `utils.ts` 186 ·
`packrat.ts` 488 · `lazy.ts` 43 · `split.ts` 58 · `debug.ts` 383 · `diagnostics.ts` 14 ·
`utils-entry.ts` 14 · `packrat-entry.ts` 5 · `core.ts` 26).

**Provenance**: `parse-that` main checkout at `ef10d5b`, read-only. Working tree carries three
unrelated modifications (`.cargo/config.toml`, `README.md` 1 line, `rust/Cargo.lock`); the README
diff does **not** touch the lines cited here (`git diff README.md | grep jsonParser` → empty), so
every cite is committed content.
**Environment**: node v26.0.0 · darwin arm64 · 2026-08-04.
**Writes performed**: this file only. `/Users/mkbabb/Programming/parse-that-css-totality-p2` was
checked and is **ABSENT** (`ls` → "No such file or directory"); it was not created. No browser
tooling. No bench armed diagnostics or packrat — every probe below is a cold `parseState`/`parse`
call on a module that references neither `memoize`, `mergeMemos`, nor `enableDiagnostics` (proved
in S4), so **`PACKRAT_ARMED` was never set** and O-15 PT-03's one-way latch was not tripped.

**Evidence modes (L-16 — never impersonate one another).** Every row is labelled:
`SOURCE` = read at the source bytes · `DIST` = read at the built-artifact bytes ·
`API-TEST` = executed against `typescript/dist` (built 2026-07-29, **newer** than every
`src/parse/**.ts` mtime — 2026-07-16 latest — so the artifact reflects the source read here).
No row is labelled a proof of the product.

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim carries
its own falsifier. Superlatives carry falsifiers too (**L-18 runs both ways**) — six are recorded in
§4 and three defect hypotheses are **refuted at the bytes** in §5, including the one an auditor is
most likely to assert on reflex.

**Score**: **19 defects** (2 BLOCKER · 10 MAJOR · 7 MINOR) · **6 superlatives** · **4 refuted
hypotheses**.

---

## 0. Standing corpus folded (cite, do not re-invent)

| id | source | how this challenge uses it |
|---|---|---|
| **PT-01** | INBOX O-15 → `parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md:19-34` | folded whole. Extended here: the module's terminals mint labels that are **discarded by default** (`src/parse/utils.ts:33`), so this module's rejections are label-less — §3.MINOR-4, §5.R4 |
| **PT-03** | O-15 → addendum `:36-59` (`PACKRAT_ARMED` one-way; 93.9 → 138.2 ns = 1.47×) | folded whole, **and discharged for this module** — §4.S4 proves `parsers/**` cannot arm the latch |
| **PT-04** | O-15 → addendum `:61-67` (`Parser.lazy` arity 1, deepest OK **7,761**, `RangeError` at 7,762) | **contradicted in the composed case**: the shipped `jsonParser` ceiling is **~3,300**, 2.4× shallower than the bare-`lazy` figure — §3.MAJOR-4 |
| **PT-07** | O-15 → addendum `:69-80` (non-string raw `TypeError`; `.parse()` → `undefined` on failure) | folded. It is the **amplifier** on MAJOR-2: trailing-garbage acceptance is undetectable through `.parse()` |
| **X.P.W1** | `docs/tranches/X/parse-that/waves/W1.md` §2c (harness constraints; PT-03 → G-4, PT-01 → G-5, PT-04 → G-9, PT-07 → the JS-boundary invariant) | this challenge supplies **G-9's subject**: the composed-parser depth ceiling, measured |
| **X.P.W2** | `docs/tranches/X/parse-that/waves/W2.md` §1 (algebra candidates; kill-by-number-never-taste) | MAJOR-8 supplies a kill-by-number row: the `FLAG_*` algebra is provably dead |
| **parser-band** | `registry/adjudicated/parser-band.md` §IDIOM READING, §"WHAT CAND-O OWES CAND-F" debt **#3** ("Recursion bounded by construction, not by catch") | MAJOR-4 is that debt realized on the **incumbent library's own showcase**; §4.S5 measures this module against the band's idiom reading |

---

## 1. What the module claims to be

`parsers/index.ts:1-4` — *"Domain-parser showcases over the combinator core… parse-that is pure
primitives now — json/csv remain as the terse, **spec-grade** combinator examples."*

`docs/api.md:230-247` documents five exports with signatures. `README.md:34-37` gives the first-run
example. `typescript/CLAUDE.md:28-30` calls `csv.ts` *"RFC 4180 CSV"*.

Three claims are therefore load-bearing and testable: **(a)** these are functions returning parsers;
**(b)** `csvParser` is RFC 4180; **(c)** the pair is spec-grade. All three are false. §2 and §3 are
the receipts.

---

## 2. BLOCKERS

### BLOCKER-1 — `csvParser` has **no rejection power**: it accepts every input, including an unterminated quoted field

**Provenance (SOURCE)**: `csv.ts:17` `const line = token.sepBy(delim).trim();` · `csv.ts:20`
`export const csvParser = line.many();`

The mechanism is three defaults compounding, each individually defensible:

1. `sepBy` defaults `min = 0` (`parser.ts:569`). On total element failure it takes the
   `len >= min` branch at `parser.ts:623` and returns `state.ok(matches)` — **success with `[]`,
   offset unmoved**.
2. `many` defaults `min = 0` (`parser.ts:523`) and likewise succeeds with `[]` at `parser.ts:550`.
3. Nothing on the chain calls `.eof()` (`parser.ts:638`), and `FLAG_EOF` is never set anywhere
   (MAJOR-8), so no trailing-input check exists.

So `csvParser` is a **total-accept function**. It is not a parser in the sense the surrounding
library uses the word: it partitions no input space.

**Falsifier (API-TEST, executed)** — "find one input `csvParser` rejects":

```
in="x"               isError=false consumed=1/1   val=[["x"]]
in="\"unterminated"  isError=false consumed=13/13 val=[["\"unterminated"]]
in="!!!"             isError=false consumed=3/3   val=[["!!!"]]
in=""                isError=false consumed=0/0   val=[]
in=";;;"             isError=false consumed=3/3   val=[[";;;"]]
REJECTIONS: 0 of 5
```

An **unterminated quoted field** — the single defect every CSV reader must catch — is returned as a
field whose value includes the orphan quote. The falsifier stands unmet: no input rejects.

**Why BLOCKER and not MAJOR**: this is not a corner. It is the public export's entire contract, and
`.parse()` (`parser.ts:77-79`) returns only the value, so a consumer following the documented API
has **no channel at all** through which malformed CSV can be reported (PT-07). Consumers of
`@mkbabb/parse-that/utils` are structurally unable to detect bad input.

---

### BLOCKER-2 — unquoted CSV fields swallow newlines: a multi-row file collapses into one row. The README's own example is wrong.

**Provenance (SOURCE)**: `csv.ts:14` — the fallback arm of `token` is `regex(/[^,]+/)`. The negated
class excludes **only the comma**; `\n` and `\r` are ordinary members. `csv.ts:7`
`string(",").trim()` compounds it: `trimStateWhitespace` (`leaf.ts:372-391`) treats charCodes 9–13
and 32 as whitespace, so the delimiter also absorbs newlines. Nothing in the module encodes a record
separator at all — `line.many()` at `csv.ts:20` re-runs `line`, and `line` has no terminator.

**Falsifier (API-TEST, executed)** — `README.md:37`'s literal input, `'a,b,c\n1,2,3'`:

```
unquoted multiline actual: [["a","b","c\n1","2","3"]]
rfc4180 expected:          [["a","b","c"],["1","2","3"]]
```

**One row of five fields**, one of which carries an embedded newline. The README labels this line
`// RFC 4180`.

**Why the existing tests do not catch it** (this is the sharp part): every multi-row case in
`test/csv.test.ts:49-71` uses **fully quoted** fields. The quoted arm (`csv.ts:12`,
`regex(/[^"]+/).wrap(dq, dq)`) *cannot* cross a newline into the next record because the closing
quote binds first — so quoted CSV rows separate correctly and the suite is green. The defect lives
exactly in the untested half, which is the half the README documents.

**Falsifier attempted and failed to clear it**: I tried to construct an unquoted multi-row input
that parses correctly. There is none — any newline between records is either eaten by
`regex(/[^,]+/)` (if a field is adjacent) or by `delim`'s `.trim()`.

---

## 3. MAJOR

### MAJOR-1 — `escapedString` / `quotedString` do not unescape. `\uXXXX` decodes to the letter `u` and the four hex digits are **discarded**.

**Provenance (SOURCE)**: `utils.ts:7-12`.

```ts
return string("\\").then(
    regex(/[bfnrt"'\\/]/)
        .or(string("u").skip(regex(/[0-9a-fA-F]{4}/)))
).map(([, esc]) => esc);
```

Two independent errors in three lines:

* The `\uXXXX` arm is `string("u").skip(regex(/[0-9a-fA-F]{4}/))`. `skip` (`parser.ts:189-210`)
  returns the **left** value and discards the right — so the parser matches four hex digits and then
  throws them away, yielding `"u"`. The code point never exists.
* The simple-escape arm returns the *escape letter*, not the character it denotes. `\n` yields the
  string `"n"`.

`quotedString` (`utils.ts:15-18`) then `.join("")`s these fragments, so the corruption is silent and
in-band.

**Falsifier (API-TEST, executed)** — decode each escape class, oracle = `JSON.parse`:

(source spellings below are the *literal input bytes*; `A` is six characters, backslash-u-0-0-4-1.)

| input (literal) | `quotedString()` | `JSON.parse` | verdict |
|---|---|---|---|
| `"aAb"` | **`aub`** | `aAb` | WRONG — the letter `u` survives, the four hex digits are dropped |
| `"a\nb"` | **`anb`** | `a` + LF + `b` | WRONG — no decode |
| `"a\tb"` | **`atb`** | `a` + TAB + `b` | WRONG — no decode |
| `"a\\b"` | `a\b` | `a\b` | correct (identity escape) |
| `"a\"b"` | `a"b` | `a"b` | correct (identity escape) |
| `""` | *(empty)* | *(empty)* | correct |

**3 of 6 escape classes corrupt.** The two that pass do so only because they are identity escapes —
i.e. the function passes exactly the cases where doing nothing is correct.

**Direct doc contradiction**: `docs/api.md:239-241` — *"Parses backslash-escaped characters (`\n`,
`\t`, `\"`, `\uXXXX`, etc.)"*. Three of the four named examples are the three that fail.

---

### MAJOR-2 — `jsonParser` accepts trailing garbage; PT-07 makes it undetectable through `.parse()`

**Provenance (SOURCE)**: `json.ts:52` `export const jsonParser = jsonValue.trim();` — no `.eof()`.
`Parser.eof()` exists at `parser.ts:638-642` and is not used.

**Falsifier (API-TEST, executed)**, oracle = `JSON.parse`:

| input | `jsonParser` | consumed | `JSON.parse` |
|---|---|---|---|
| `1 2` | `1` | 2/3 | SyntaxError |
| `{"a":1} garbage` | `{"a":1}` | 8/15 | SyntaxError |
| `[1,2] [3]` | `[1,2]` | 6/9 | SyntaxError |
| `01` | `0` | 1/2 | SyntaxError |
| `null null` | `null` | 5/9 | SyntaxError |
| `true false` | `true` | 5/10 | SyntaxError |

**6/6 silently accepted.** `parseState().offset` exposes the shortfall, but `.parse()`
(`parser.ts:78`) returns only `.value` — so the documented entry point cannot distinguish
`parse('{"a":1} DROP TABLE')` from `parse('{"a":1}')`. This is **PT-07 with teeth**: O-15 recorded
the `undefined`-on-failure ambiguity; this is the same channel losing a *successful-looking* partial
parse.

---

### MAJOR-3 — `jsonParser` accepts raw control characters U+0001–U+001F inside strings (RFC 8259 §7)

**Provenance (SOURCE)**: `json.ts:22` — `regex(/"(?:[^"\\]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/)`.
The unescaped-character class is `[^"\\]`, which admits every code point except `"` and `\` —
including the C0 controls RFC 8259 §7 requires to be escaped.

The `json.ts:23` fast path makes it worse: `s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s)`.
An input containing a raw control char and no backslash takes the **fast path**, so the JSON.parse
oracle that would have rejected it is bypassed by construction.

**Falsifier (API-TEST, executed)**:

```
ctrl U+0001 | parse-that: ACCEPT "a<U+0001>b" | JSON.parse: THROWS SyntaxError
ctrl U+0009 | parse-that: ACCEPT "a\tb"     | JSON.parse: THROWS SyntaxError
ctrl U+000a | parse-that: ACCEPT "a\nb"     | JSON.parse: THROWS SyntaxError
ctrl U+000d | parse-that: ACCEPT "a\rb"     | JSON.parse: THROWS SyntaxError
ctrl U+001f | parse-that: ACCEPT "a<U+001F>b" | JSON.parse: THROWS SyntaxError
```

Each input is a JSON string literal holding one **raw** control character: `"` `a` `<CTRL>` `b` `"`.
The output column is `JSON.stringify` of the returned value; `<U+0001>` / `<U+001F>` stand for the
raw byte, written as notation so this document stays plain text.

5/5 over-accepted — a **raw** newline inside a JSON string is admitted. **Cure is one range**: widen
the exclusion class at `json.ts:22` from `[^"\\]` to one that also excludes U+0000 through U+001F.

---

### MAJOR-4 — `jsonParser` throws a raw `RangeError` at ~3,300 nesting depth (≈6.6 KB). PT-04's 7,761 does **not** transfer to the composed parser.

**Provenance (SOURCE)**: `json.ts:25-27` and `json.ts:28-36` — two `Parser.lazy` back-edges;
`lazy.ts:18-24` `createLazyCached`; `parser.ts:702-707` `Parser.lazy`. Each JSON nesting level costs
several JS frames (dispatch → lazy closure → `wrap` closure → `sepBy` loop → dispatch), so the
composed ceiling is a fraction of the bare-`lazy` ceiling.

**Falsifier (API-TEST, executed, three independent processes)** — ramp `"[".repeat(d) + "1" + "]".repeat(d)`:

```
run 1: first failure depth ~3300 (6601 input bytes) -> RangeError: Maximum call stack size exceeded
run 2: first failure depth ~3300 (6601 input bytes) -> RangeError: Maximum call stack size exceeded
run 3: first failure depth ~3300 (6601 input bytes) -> RangeError: Maximum call stack size exceeded
deepest OK observed: 3275 (all three runs)
```

Reproducible to the same 25-step bucket across three processes. **Oracle**, same box, same process
class:

```
JSON.parse deepest OK: 200000  (no RangeError in the swept range)
```

Native `JSON.parse` is iterative and survives ≥ 200,000; the combinator showcase dies at ~3,300 —
**~60× shallower** — on **6.6 KB** of input, and it dies as a *thrown exception*, not `isError`.

**This explicitly contradicts a folded figure and says so.** O-15 PT-04 measured `Parser.lazy`
nesting at deepest-OK **7,761**. That number is correct for what it measured (bare `lazy` nesting)
and **must not be read as a bound on shipped parsers**: the composed ceiling is 2.4× lower. Any
harness that budgets against 7,761 (X.P.W1 §2c routes PT-04 → G-9) will pass a grammar that crashes.

**Band linkage**: this is `registry/adjudicated/parser-band.md` debt **#3** — *"Recursion bounded by
construction, not by catch"* — realized on the incumbent library's own showcase. The band held
cand-O to a depth-bounded back-edge; `jsonParser` has neither a bound nor a shield.

---

### MAJOR-5 — the tests do not test this module. Two of three suites re-declare a private copy of the parser.

**Provenance (SOURCE)**:

* `test/csv.test.ts:1-16` — imports `regex, all, any, string` from `../src/parse` and then
  **re-declares** `delim`, `doubleQuotes`, `singleQuotes`, `token`, `line`, `csv` byte-for-byte from
  `csv.ts:7-20`. It never imports `csvParser`. Grep confirms: the only `csvParser` references in
  `typescript/` are its definition, three re-export lines, and `CLAUDE.md`.
* `test/json.test.ts:1-40` — same pattern, and the copy is **not even the same grammar**: no
  `dispatch`, `.opt()` inside the array/object bodies, `parseFloat`, and a number regex
  `/-?(0|[1-9]\d*)(\.\d+)?/` with **no exponent support** (vs `json.ts:21`, which has one).
* `test/json-vectors.test.ts:8` is the **only** file that imports the shipped parser. Its entire
  oracle is `test/json-vectors.test.ts:29` — `expect(result).not.toBeUndefined()`.

**Falsifier**: mutate `csv.ts` or `json.ts` arbitrarily and the suite stays green — the assertions
bind copies. The one suite that binds the real artifact asserts only "did not return `undefined`",
which under PT-07 is precisely "did not fail", never "returned the right value". There is **no
structural-equality assertion against `JSON.parse` anywhere** for the shipped `jsonParser`.

**Aggravation — the negative corpus ships and is never read.**
`grammar/tests/json/invalid.jsonl` contains 7 vectors. `json-vectors.test.ts:23` reads
`valid.jsonl` only. I ran the unused corpus (API-TEST):

```
reject  "{key: \"value\"}"    reject  "{'key': 'value'}"   reject  "{\"a\": undefined}"
reject  "{true: 1}"           reject  "[1 2 3]"            reject  "{\"a\": 1, \"a\": 2"
reject  "[}"
SPURIOUS ACCEPTS: 0 of 7
```

**All seven already pass.** Wiring them costs one `readVectors("invalid.jsonl")` call and would be
green on the first run. The omission is pure oversight, not deferred work — which is why this is a
defect of the module's evidence posture rather than a backlog item.

**Aggravation 2**: `test/csv.test.ts:73-78` reads the real `data/csv/data.csv` and asserts only
`expect(result.length).toBeGreaterThan(0)`. Given BLOCKER-1 (`csvParser` never fails) that assertion
holds for every non-empty file on disk — it is vacuous by construction.

---

### MAJOR-6 — `csvParser` mis-handles both quoted-field edge cases RFC 4180 defines

**Provenance (SOURCE)**: `csv.ts:11-15`. The quoted arms are `regex(/[^"]+/).wrap(dq, dq)` — the
`+` requires **at least one** inner character, and the class `[^"]` cannot express a doubled-quote
escape.

**Falsifier (API-TEST, executed)**:

| input | actual | RFC 4180 |
|---|---|---|
| `a,"",b` | `[["a","\"\"","b"]]` | `[["a","","b"]]` |
| `"say ""hi"""` | `[["say "],["hi"],["\"\""]]` | `[["say \"hi\""]]` |

* **Empty quoted field**: arm 1 fails (`+` needs ≥1 char), arm 2 fails, arm 3 `regex(/[^,]+/)`
  matches the two quote characters literally — so the field's value is the two-character string
  `""` rather than the empty string. Silent, in-band.
* **Doubled-quote escape**: one logical field is shredded into **three separate rows**. `many()`
  keeps looping because each fragment advances the offset (`parser.ts:538`), so the failure never
  surfaces as an error (BLOCKER-1 again).

`typescript/CLAUDE.md:29` and `docs/api.md:235-237` both assert *"RFC 4180 … Handles quoted fields
with escaped double-quotes."* Measured: it does not.

---

### MAJOR-7 — the three `utils.ts` exports are per-call factories: 15 / 8 / 2 fresh `Parser` instances every call, nothing cached, identity unstable

**Provenance (SOURCE)**: `utils.ts:7`, `:15`, `:21` — all three are `export function`, and
`utils.ts:16` additionally constructs a **fresh `RegExp` object** (`new RegExp(...)`) on every call.
Contrast the same module's own sibling: `json.ts:15-52` and `csv.ts:7-20` bind everything at module
scope with `const`, once.

**Falsifier (API-TEST, executed)** — `Parser.id` is a process-global `PARSER_ID++`
(`parser.ts:18`, `:25`), so the delta between two consecutive calls counts instances minted:

```
quotedString():  Parser instances minted per call = 15   | identity reused? false
escapedString(): Parser instances minted per call = 8
numberParser():  Parser instances minted per call = 2
```

Consequences, in the order they bite:

1. **V8 shapes.** `dispatch`/`any`/`then` all call through `parser.parser` — a *per-instance closure
   property* (`parser.ts:30`). Rebuilding the graph per call guarantees a fresh closure identity at
   every call site, so the ICs at `leaf.ts:140`, `leaf.ts:62`, `parser.ts:83` can never stabilise.
   A cached module-scope parser lets them.
2. **Allocation.** 15 `Parser` + 15 context objects + ≥15 closures + 1 `RegExp` per `quotedString()`.
3. **Memo-key budget.** `PARSER_ID` is monotone and process-global. `packrat.ts:77` caps ids at
   `MEMO_MAX_ID ≈ 2,097,151`, above which `getCijKey` **throws `RangeError`** (`packrat.ts:94-97`).
   A long-lived process calling `quotedString()` in a loop burns 15 ids per iteration toward a
   hard, fail-loud ceiling.

**The docs teach the bad pattern**: `docs/playground/leaf-parsers.md:139-145` shows
`escapedString('"')` / `quotedString("'")` / `numberParser()` as call-site expressions.
(`escapedString` also takes **no parameters** — `utils.ts:7`, measured `.length === 0` — so the
documented argument is silently ignored.)

---

### MAJOR-8 — the `FLAG_*` algebra is dead, and this module's construction path pays for it: `Parser.trim()` mints two parsers and throws one away

**Provenance (SOURCE)** — `parser.ts:488-518`:

```ts
if (parser.context?.name === "whitespace") {
    const inner = this;
    const flaggedParser = new Parser(                      // :492
        ((state) => inner.call(state)) as ParserFunction<T>,
        createParserContext("trimWhitespace", ...),
    ) as Parser<T>;
    flaggedParser.flags = this.flags | FLAG_TRIM_WS;       // :496
    const whitespaceTrim = (state) => { ... };             // :498
    return new Parser(whitespaceTrim, ...);                // :514  ← different object
}
```

`flaggedParser` is constructed, configured, and **never returned or referenced again**. Grep over
`typescript/src/` for `.flags`:

```
parser.ts:438  if (this.flags === 0)          ← read
parser.ts:442  if (this.flags === FLAG_TRIM_WS) ← read
parser.ts:456/465/466                          ← read
parser.ts:496  flaggedParser.flags = ...        ← the ONLY write, on the discarded object
```

Therefore, transitively:

* **`FLAG_EOF` (`parser.ts:22`) is never set anywhere** → `parser.ts:466-476` (the trailing-content
  check + its `"trailing-content"` suggestion) is **unreachable**. That dead branch is the exact
  cure MAJOR-2 needs, sitting three lines away, wired to nothing.
* **`Parser.call()`'s entire non-zero-flag body (`parser.ts:442-477`) is unreachable** — every live
  `Parser` has `flags === 0`, so `call()` is only ever its `parser.ts:438-440` passthrough.
* **`ParserState.unsafeCall` (`state.ts:92-94`)** — documented as *"single choke point for
  combinator type casts"* — has **zero callers** in `src/`. Grep: one hit, its own definition.

**Falsifier (API-TEST, executed)**:

```
Parser.trim(): Parser instances minted per call = 2   (returned parser is 1; excess = discarded flaggedParser)
jsonParser.context.name = "trimWhitespace"            (confirms the :514 object is the one returned)
```

**Charge to this module**: `parsers/**` calls `.trim()` **8 times** — `json.ts:15, 16, 26, 31, 33,
52` and `csv.ts:7, 17` — so building the showcase leaks 8 `Parser` instances, 8 closures and 8
context objects, and burns 8 `PARSER_ID`s, at module load and on first lazy expansion. Small in
absolute terms; the point is that it is **provably zero-value**, which is what makes it a
kill-by-number row for X.P.W2 rather than a taste argument.

---

### MAJOR-9 — the shipped type is `Parser<any>`; the precise `JsonValue` union is exported and never used

**Provenance (DIST)**: `dist/parsers/json.d.ts:6` — `export declare const jsonParser: Parser<any>;`
**Provenance (SOURCE)**: `json.ts:39-40` —

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonValue: Parser<any> = dispatch({...});
```

`json.ts:7-13` defines a complete, correct `JsonValue` union and `parsers/index.ts:6` re-exports it —
but nothing is ever typed with it. `jsonParser.parse(x)` returns `any`, so the union is decorative
and every consumer's type-checking silently evaporates at the library boundary.

**Falsifier**: `const n: number = jsonParser.parse("{}")` type-checks under `strict: true`. The
`any` is load-bearing only at the recursive knot (`json.ts:40`, forward-referenced by the two
`Parser.lazy` bodies); the *exported* binding at `json.ts:52` can be narrowed to
`Parser<JsonValue>` with a single cast at that knot without touching the runtime graph.

**Contrast within the same module**: `dist/parsers/csv.d.ts:3` — `Parser<string[][]>`. `csv.ts` gets
this right; `json.ts` does not.

---

### MAJOR-10 — every published doc calls these exports as functions. `jsonParser()` throws.

**Provenance (SOURCE)**: `json.ts:52` and `csv.ts:20` export `const` **Parser instances**.
Every document describes callables:

* `README.md:34-37` — `jsonParser().parse('{"key": [1, 2, 3]}');` / `csvParser().parse('a,b,c\n1,2,3');  // RFC 4180`
* `docs/api.md:230` — `### jsonParser(): Parser<JsonValue>` · `:235` — `### csvParser(): Parser<string[][]>`
* `docs/playground/leaf-parsers.md:125,129` — `const json = jsonParser(); const csv = csvParser();`
* `typescript/CLAUDE.md:28-29` — `jsonParser()`, `csvParser()`

**Falsifier (API-TEST, executed)**:

```
typeof jsonParser = "object"   typeof csvParser = "object"
jsonParser() -> TypeError: jsonParser is not a function
csvParser() -> TypeError: csvParser is not a function
```

The README's very first library example throws before it parses anything. `docs/api.md:230` is
additionally wrong about the *return type* (MAJOR-9: it is `Parser<any>`, not `Parser<JsonValue>`)
and `:235-237` about the *behaviour* (MAJOR-6/BLOCKER-2: not RFC 4180). Three independent errors in
one three-line doc block, each verifiable in under a second — which is itself the finding: nothing
in CI reads the docs against the artifact.

---

## 4. SUPERLATIVES (L-18 runs both ways — each carries its falsifier)

### S1 — `dispatch()` is the right instrument, used exactly right; the interning is real

`json.ts:38-49` routes the eight JSON first-characters through `leaf.ts:100-151`. The `"0-9"` range
key exercises `leaf.ts:116-119`, and `internParser` (`leaf.ts:104-111`) collapses the repeats.

**Falsifier — "the interning is decorative; there are 8 parser slots"**: measured, there are **6**.

```
jsonParser.context.name = trimWhitespace
dispatch distinct interned parsers = 6 (table has 8 keys)
```

`jsonBool` (`t`,`f`) and `jsonNumber` (`-`,`0-9`) each occupy one slot. The result is an
`Int8Array(128)` built **once at module load** and an O(1) branch with **no backtracking** on the
reject path — which is why the 7 invalid vectors in §3.MAJOR-5 all fail at **offset 0**. Compare
`parser-band.md` §IDIOM READING, which lists "two-level `dispatch` narrowing" among the virtues it
credits to both prototype candidates: the incumbent showcase already does the one-level form
correctly.

### S2 — `jsonString`'s escape strategy is exactly right, and it indicts `utils.ts` from inside the same module

`json.ts:22-24`: `(s) => (s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s))`.

A single `indexOf` selects between a zero-decode `slice` (the overwhelmingly common case) and the
engine's C++ unescaper (the hard case). It hand-rolls nothing, and it is **correct for every escape
class** — measured in MAJOR-1's oracle column, `JSON.parse` gets all six right.

**Falsifier — "the fast path is a correctness hole"**: the only input class where it diverges from
`JSON.parse` is raw C0 controls, and that divergence is caused by the **regex** at `json.ts:22`
(MAJOR-3), not by the fast-path branch: fix the character class and the fast path is exact. The
branch itself never mis-decodes.

The sharpness: `utils.ts:7-12` hand-rolls the same problem in the same module and gets 3 of 6
classes wrong. The module contains its own counter-example.

### S3 — once-only, module-scope graph construction on the parse path

`json.ts:15-52` and `csv.ts:7-20` bind every combinator at module scope with `const`. The per-parse
cost is **pure graph traversal** — zero `Parser` allocation, zero `RegExp` construction, zero
context objects.

**Falsifier — "they rebuild per parse like `utils.ts` does"**: refuted by MAJOR-7's measurement.
`quotedString()` mints 15 instances per call; `jsonParser`/`csvParser` mint **0** per parse (they are
`const` bindings whose ids are fixed at module evaluation — `typeof jsonParser === "object"`, not
`"function"`, is the same fact MAJOR-10 charges the docs with getting wrong).

### S4 — packrat-inert and diagnostics-inert **by construction**; this module cannot trip PT-03 or PT-01

**SOURCE proof**: `PACKRAT_ARMED` is set at exactly one site, `packrat.ts:290`, inside
`makeMemoized`, reachable only from `memoize` / `mergeMemos` (`packrat.ts:482-488`). Grep over
`src/parse/parsers/`:

```
memoize | mergeMemos | enableDiagnostics  →  NONE
```

Therefore a consumer who imports `@mkbabb/parse-that/utils` and uses `jsonParser`/`csvParser`
**never arms the latch** and keeps O-15 PT-03's unarmed **93.9 ns/parse** rate for the life of the
process, and never reaches PT-01's `console.error` coupling.

**Falsifier — "importing the module arms it anyway, via a transitive edge"**: `utils-entry.ts:6-14`
pulls only `./utils.js` and `./parsers/**`; the `packrat` surface is a **separate subpath export**
(`package.json` `"./packrat"` → `dist/packrat.js`), and its three exports (`memoize`, `mergeMemos`,
`resetPackrat`) are not re-exported by `utils-entry`. Importing and parsing through this module in
the probes above left the process on the unarmed path throughout.

This is a genuine, load-bearing property for **X.P.W1 G-4** (a bench that provably never runs with
the latch armed): `parsers/**` is a *safe* corpus to bench first, and that is provable at the source
rather than assumed.

### S5 — `Parser.lazy` at exactly the two true back-edges, and nowhere else

`json.ts:25` (array) and `json.ts:28` (object) are the only two `lazy` sites; both are genuine
grammar back-edges through `jsonValue`. `csv.ts` has **zero** recursion.

`parser-band.md` §IDIOM READING credits cand-O with *"exactly 1 lazy"* on *"the one true back-edge"*
as an idiom virtue measured structurally. By the same measure this module scores 2-for-2 necessary.

**Falsifier — "one of the two is removable, so the count is padded"**: neither is. `jsonArray` and
`jsonObject` are both defined *above* `jsonValue` (`json.ts:40`) and both reference it; without
`lazy` at both sites the module-scope `const` graph cannot be built (TDZ). The recursion is
minimal, not merely small. (Its **unbounded depth** is nonetheless MAJOR-4 — minimal is not bounded,
and the band's debt #3 is about the bound.)

### S6 — `sepBy`'s trailing-separator rejection buys spec-correct rejection for free

`parser.ts:592-618` checkpoints *before* the separator and backtracks past it when the following
element fails, so a trailing separator is never accepted. `json.ts:26` / `json.ts:32` inherit this
with **no grammar special-casing** — `[1,2,]` and `{"a":1,}` reject because the combinator's default
is the spec's default.

**Falsifier (API-TEST) — "the negative corpus is aspirational"**: all 7 shipped invalid vectors
reject, **0 spurious accepts**, each at consumed offset 0 (§3.MAJOR-5). The rejection power is real;
MAJOR-5's charge is that nothing *asserts* it, not that it is absent.

---

## 5. REFUTED HYPOTHESES — where the tree disagrees with the obvious defect claim

Stated explicitly, because an L-axis auditor is likely to assert each of these on reflex and each is
**wrong at the bytes**.

### R1 — REFUTED: "`ParserState.expected` is an optional field with no initializer, so the first error triggers a hidden-class transition and the V8 shape goes polymorphic."

`state.ts:43` declares `expected?: string[];` with no initializer, which under
`useDefineForClassFields: false` would emit nothing and let `utils.ts:33`'s assignment add the
property later — a real map transition on a hot state object.

**It does not.** `tsconfig.json` sets `"target": "ES2022"` and does **not** set
`useDefineForClassFields`, so TypeScript defaults it to `true`. Read at the artifact bytes —
`dist/packrat-entry-CS1td-8B.js:300-302`:

```js
  expected;
  suggestions = [];
  secondarySpans = [];
```

The field **is** defined at construction. Every `ParserState` has one map from birth; the
`state.expected = …` at `utils.ts:33` is a store to an existing slot, not a transition. **No
defect.** The shape discipline here is correct and, given the file's silence about it, arguably
accidental — but it is correct, and asserting otherwise would be a fabricated finding.

### R2 — REFUTED: "`Object.fromEntries` at `json.ts:35` is a prototype-pollution sink."

**Falsifier (API-TEST, executed)** on `{"__proto__":{"polluted":1}}`:

```
parsed: {"__proto__":{"polluted":1}}
own __proto__ property? true
({}).polluted === undefined
Object.getPrototypeOf(o) === Object.prototype: true
```

`Object.fromEntries` is specified over `CreateDataPropertyOrThrow`, which bypasses the `__proto__`
setter. The key lands as an **own data property** and the prototype is untouched — the same
behaviour as native `JSON.parse`. The hand-rolled `for` loop in `test/json.test.ts:39-44` (which
assigns `obj[key] = value`) is the shape that *would* be a sink; the shipped module is not.
**No defect** — and it is one more reason the test copy is not a valid stand-in for the module
(MAJOR-5).

### R3 — REFUTED (as scoped): "the `regex()` EOF early-return is unreachable dead code."

`leaf.ts:326-330` returns `isError = true` at end-of-input **without** calling `mergeErrorState`, so
the terminal does not participate in furthest-offset tracking. I initially could not reach it
through `jsonParser` — `dispatch` (`leaf.ts:142`) labels the EOF failure first in every JSON shape I
constructed. It **is** reachable through a module export, so it survives as MINOR-4 below rather
than as a refutation. Recorded here because the scoping matters: the composed combinators mask it,
and a reviewer testing only through `jsonParser` will wrongly conclude it is dead.

### R4 — REFUTED: "PT-01 means this module emits misleading diagnostics."

It emits **none**. `utils.ts:33` gates the expected-set on `diagnosticsEnabled`, which this module
never arms (S4), so every rejection carries `expected: undefined`.

**Falsifier (API-TEST, executed)**:

```
in="{\"a\":1"  isError=true furthest=6 len=6 expected=undefined
in="[1,2"      isError=true furthest=4 len=4 expected=undefined
in="{\"a\":"   isError=true furthest=5 len=5 expected=undefined
```

The *position* is correct in all three (`furthest` lands exactly at end-of-input); only the label set
is empty. So the honest statement is narrower than PT-01's framing suggests: this module's failures
are **positionally accurate and textually silent**, not misleading. Any wave asserting on rejection
*shape* through these parsers must assert on `furthest`, never on `expected`.

---

## 6. MINOR

**MINOR-1 — `quotedString(quote)` interpolates its argument raw into a `RegExp` character class.**
`utils.ts:16`: `new RegExp(`[^${quote}\\\\]+`)`. No escaping.
**Falsifier (API-TEST, executed)**:

```
quote="]"  -> builds; parse("]xy]") isError=true    ← rejects its own well-formed input
quote="\\" -> THROWS SyntaxError: Invalid regular expression: /[^\\\]+/: Unterminated character class
quote="-"  -> builds; parses (accidentally fine)
quote="ab" -> builds; accepts the two-char "quote" (undocumented)
```

A raw `SyntaxError` at *construction* time for `quotedString("\\")`, and silent
mis-parsing for `"]"`. One `replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")` closes it.

**MINOR-2 — duplication: two copies of the number grammar, two incompatible string grammars.**
`json.ts:21` and `utils.ts:22` hold the **byte-identical** regex
`/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/` with the same `.map(Number)`. `json.ts` does not call
`numberParser()`. Separately, `json.ts:22` and `utils.ts:15-18` are two different string parsers with
**different and differently-wrong** escape semantics (§4.S2 vs §3.MAJOR-1).
**Falsifier**: diff the two regex literals — identical. Drift risk is not hypothetical: `test/json.test.ts:10` already carries a *third* copy that lacks exponent support.

**MINOR-3 — dead imports.** `csv.ts:5` imports `Parser`; `csv.ts` never references it.
`utils.ts:4` imports `Parser`; `utils.ts` never references it.
**Falsifier**: grep `Parser` in each file body — only the import line. `tsconfig.json` sets neither
`noUnusedLocals` nor `noUnusedParameters`, and `verbatimModuleSyntax: true` means **tsc preserves
the import statement in its emit** (only the bundler elides it), so nothing in the toolchain flags
or removes them at the type-check step.

**MINOR-4 — `regex()` skips furthest-offset tracking at EOF, and it is reachable through a module export.**
`leaf.ts:326-330` returns without `mergeErrorState`, unlike every other failure path in the file
(`:291`, `:303`, `:360`).
**Falsifier (API-TEST, executed)**:

```
regex terminal at EOF : isError=true furthest=-1   ← never advanced
string terminal at EOF: isError=true furthest=0
```

Two terminals, same input, same failure, **different error-position bookkeeping**. Downstream,
`parser.ts:60` compensates with `state.furthest >= 0 ? state.furthest : state.offset`, which masks
the divergence when the offsets coincide — but a regex failing at EOF can never *become* the
recorded furthest position even when it is.

**MINOR-5 — the primitives barrel re-exports the domain showcases, contradicting the module's own header.**
`src/parse/index.ts:14` — `export * from "./parsers/index.js";` — while `parsers/index.ts:2-3`
declares *"parse-that is pure primitives now"*. Two consequences: the root entry carries the
showcases whether a consumer wants them or not, and `export *` means **any future export added to
`parsers/index.ts` silently widens the root public API** with no edit to the barrel.
**Falsifier**: `import { jsonParser } from "@mkbabb/parse-that"` resolves (`README.md:34` does exactly
this) despite the dedicated `"./utils"` subpath existing for it. `package.json` sets
`"sideEffects": false`, so bundlers may drop it — but that is the bundler's mercy, not the module's
boundary.

**MINOR-6 — zero-consumer surface, against the repo's own stated excision policy.**
`escapedString` / `quotedString` / `numberParser` have **no consumer anywhere** outside their
definition, three re-export lines, and four doc files. Meanwhile `src/parse/index.ts:10-12` records:
*"The 15 closure-based `*Span` builders were EXCISED in the 1.0.0 cut (S.H2, fold row 48): **a
zero-consumer surface**, deprecated in 0.13.0 (PT-Q4)."*
**Falsifier**: repo-wide grep (excluding `dist/`, `node_modules/`) returns only definitions,
re-exports (`parsers/index.ts:8`, `utils-entry.ts:10-14`), and docs. The policy that killed 15
exports is not applied to these 3 — which are additionally **broken** (MAJOR-1). The gate
`proof:no-span-surface` exists in `package.json:47`; no analogous gate covers this trio.

**MINOR-7 — Goldilocks: the module is *under*-sized and under-cohesive, not over-large.**
103 lines across 4 files is well inside band — but `utils.ts` (23 lines) is a third file that
duplicates `json.ts`'s terminals (MINOR-2), has no consumer (MINOR-6), and is wrong (MAJOR-1). The
correct size here is smaller: fold `numberParser` into `json.ts` or delete the file. Against the
module's own "spec-grade" claim (`parsers/index.ts:3`), neither surviving parser is spec-grade —
`json` over-accepts on three axes and `csv` cannot reject at all.
**Falsifier — "it's 103 lines, size is not a finding"**: agreed as to line count; the Goldilocks
charge is on *cohesion*, and the evidence is that one of three source files is dead weight by three
independent measures.

---

## 7. Disposition — what the parser waves should take from this

1. **Both blockers are `csv.ts`.** BLOCKER-1 and BLOCKER-2 together mean the shipped CSV parser
   neither separates records nor rejects anything. `X.P.W1`'s totality corpus must include a
   *rejection* leg for csv, or the wave will inherit a parser that scores 100% on any
   acceptance-only harness.
2. **MAJOR-5 is the meta-defect and should be fixed first.** Two of three suites bind private copies;
   the shipped negative corpus is unread and **already green**. Wiring `invalid.jsonl` and replacing
   the two copies with imports is a same-day change that converts every other finding here into a
   test.
3. **MAJOR-4 corrects a folded number and must be relayed.** O-15 PT-04's **7,761** is a bare-`lazy`
   figure; the composed `jsonParser` ceiling is **~3,300** on ~6.6 KB. `X.P.W1` §2c routes PT-04 →
   G-9; G-9 must budget against the composed figure, not the bare one, or it will certify a grammar
   that crashes. This is `parser-band.md` debt #3 on the incumbent.
4. **MAJOR-8 is a kill-by-number row for `X.P.W2`**: `FLAG_EOF` is never set, `Parser.call()`'s
   flagged body is unreachable, `ParserState.unsafeCall` has zero callers, and `Parser.trim()` mints
   a parser it discards. Four dead surfaces, all provable by grep, no taste required. Note the
   irony worth carrying into the wave: the dead `FLAG_EOF` branch (`parser.ts:466-476`) is the exact
   trailing-content check MAJOR-2 is missing.
5. **S4 is usable law**: `parsers/**` is provably packrat-inert and diagnostics-inert at the source,
   which makes it the correct first corpus for `X.P.W1` **G-4** ("a bench that provably never runs
   with the packrat latch armed"). That is a *proof*, not an assumption — and it is the one thing in
   this module I would preserve unchanged.
6. **R1–R4 are guardrails.** Four plausible L-axis findings are wrong at the bytes. A wave that
   re-asserts the `expected` hidden-class transition, the `__proto__` sink, the dead EOF branch, or
   "misleading diagnostics" will be re-litigating a settled reading.

---

*Challenge authored 2026-08-04 · Opus 5 (`claude-opus-5[1m]`) · single-write law observed (this file
only) · `parse-that` read-only at `ef10d5b` · `parse-that-css-totality-p2` verified ABSENT and not
created · no diagnostics armed, no packrat armed, no browser tooling.*
