**SERVED MODEL ID: `claude-opus-5[1m]`** (Opus 5, 1M context) — solo seat, no subagent. Session 2026-08-04, node v26.0.0, darwin arm64.

# CHALLENGE C — `parsers/` on the CONSUMPTION axis

**REVISION 2 (2026-08-04, second seat).** A first Opus-5 seat authored revision 1 at this path earlier
today (16 defects · 4 superlatives). This revision **folds revision 1 whole** — it is hitherto
corpus, not something to re-invent — **re-verifies its load-bearing measurements**, **corrects one
row of my own independent probe against it**, and adds **two defects (C-17, C-18) and one
superlative (S-5) that revision 1 did not carry**, one of which revision 1 explicitly declined to
measure. Nothing from revision 1 is dropped. Where revision 2's independent probe agreed, the row
is marked **[re-verified r2]**; where it disagreed, the disagreement is adjudicated in the open
(§8).

**Subject**: `@mkbabb/parse-that` module `typescript/src/parse/parsers/` — 103 lines across 4 files
(`index.ts` 8 · `json.ts` 52 · `csv.ts` 20 · `utils.ts` 23), read whole (main checkout, read-only).
Every import read read-only: `src/parse/index.ts`, `parser.ts`, `leaf.ts`, `state.ts`, `utils.ts`,
`lazy.ts`, `split.ts`, `packrat.ts`, and the sibling entries `core.ts` / `diagnostics.ts` /
`utils-entry.ts` / `packrat-entry.ts`. Consume-edge tree read read-only: `value.js` `src/css/**`,
`src/subpaths/css.ts`, `package.json`.

**Public surface**: 5 value exports + 1 type — `jsonParser`, `csvParser`, `escapedString`,
`quotedString`, `numberParser`, `type JsonValue`. Reachable from **two** entries: the root
`@mkbabb/parse-that` (via `export * from "./parsers/index.js"`, `src/parse/index.ts:14`) and the
`./utils` subpath (`src/parse/utils-entry.ts:7-14`).

**Posture**: DEFECTIVE until the tree proves otherwise. Every claim carries severity, `file:line`
provenance, and its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
Measurements are against the **built `dist/`** in the read-only checkout (the shipped artifact a
consumer actually gets), via probes run from this session's scratchpad — **no write of any kind
inside `/Users/mkbabb/Programming/parse-that`**, no browser tooling, no bench that arms diagnostics
or `memoize()` (the PT-03 latch is one-way and was never touched: `enableDiagnostics` and `memoize`
were never called in any probe, in either revision).

**LAW CHECK — clean.** `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` →
`No such file or directory` (re-verified independently this session). **No STOP finding.**
`.worktrees/`, frozen roots, and `~/Documents/Codex` were never entered.

**Ledger: 18 defects — 3 BLOCKER · 9 MAJOR · 6 MINOR — and 5 superlatives.**

---

## 0. The consumption edge, measured

The routing law (`W2.md:133`, PLAW-BIND) makes value.js the sole downstream: *parser → value (X·V
L1/L5 surfaces) → packed release → consumers; direct parse-that→fourier FORBIDDEN.* So the axis
question is exact: **what does value.js consume from this module?**

| edge | measured | receipt |
|---|---|---|
| `@mkbabb/parse-that` in value.js `dependencies` | **absent** | `value.js/package.json` — deps are exactly `@mkbabb/glass-ui ^7.0.0`, `@mkbabb/keyframes.js ^6.0.0`; not in `devDependencies` either. **[re-verified r2]** — matches X·V W9 G31 (`W9.md:373`, RED) and `X/parse-that/waves/W4.md:509` |
| `parse-that` imports in value.js `src/` `demo/` `test/` | **0** | `grep -rn "parse-that" src demo test package.json` → only two comments, `src/subpaths/math.ts:2` and `src/subpaths/transform.ts:4`, both asserting "parse-that-**FREE**" **[re-verified r2]** |
| this module's 5 exports referenced anywhere in value.js | **0** | `grep -rn "jsonParser\|csvParser\|escapedString\|quotedString\|numberParser\|JsonValue" src demo api test scripts` → 0 hits **[re-verified r2]** |
| parse-that **installed** in the value.js workspace | **no** | `ls node_modules/@mkbabb/` → `glass-ui keyframes.js value.js`. New in r2; see C-17's note on probe runnability |
| keyframes.js (the next hop) | **declares itself parse-that-FREE** | `keyframes.js/src/animation/internal/leaves.ts:9-10` |
| inside parse-that itself | **1 of 5 names, in 1 test** | `typescript/test/json-vectors.test.ts:8,28` (`jsonParser` only) **[re-verified r2]** |
| value.js's actual parse technique | hand-rolled string scanning | `src/css/grammar.ts` (483 L) + `src/css/stylesheet.ts` (899 L): 19 `.replace/.split/.match/indexOf` sites, **zero** combinators **[new in r2]** |
| the frozen 52-export `/css` universe | **∅ overlap, both directions** | re-derived independently in r2 from `src/subpaths/css.ts`: **33 types + 19 values = 52** ✓ (matches W1 G-1 and `W2.md:146-148`). No `/css` export is served by, wraps, or names any of the five; no export of this module appears in `src/css/index.ts` |

**The consumption axis has a zero on it.** Everything below is therefore about a *published surface
with no consumer* — which raises, not lowers, the bar: an unconsumed export cannot be defended by
"it works for its user," and its defects are pure semver liability plus a false affordance for the
next consumer who reaches for it.

---

## 1. BLOCKERS

### C-1 — BLOCKER — the only published usage example does not run

`README.md:34-37` and `docs/api.md:230,235` document the API as **callable**:

```ts
import { jsonParser, csvParser } from "@mkbabb/parse-that";
jsonParser().parse('{"key": [1, 2, 3]}');   // combinator-based
csvParser().parse('a,b,c\n1,2,3');          // RFC 4180
```

`docs/api.md:230` — `### jsonParser(): Parser<JsonValue>`; `:235` — `### csvParser(): Parser<string[][]>`.
A third site repeats it: `docs/playground/leaf-parsers.md:122,125,129` (`const json = jsonParser();`).

Both are **`Parser` instances, not functions**: `json.ts:52` `export const jsonParser = jsonValue.trim();`
· `csv.ts:20` `export const csvParser = line.many();`. Shipped as such:
`dist/parsers/json.d.ts` `export declare const jsonParser: Parser<any>;` ·
`dist/parsers/csv.d.ts` `export declare const csvParser: Parser<string[][]>;`.

MEASURED (dist `parse.js`): `typeof jsonParser` → `object` · `typeof csvParser` → `object` ·
calling either → `TypeError: … is not a function`.

A consumer who follows the README's Domain-Parsers block crashes on the first line. This is the
package's front-door quickstart, and it has been wrong across the 1.0.0 cut.
**[re-verified r2 — all three doc sites confirmed at the cited lines.]**

*Falsifier*: `typeof (await import("@mkbabb/parse-that")).jsonParser === "function"` — measured
`"object"`. Or: a compiling `.d.ts` signature `jsonParser(): Parser<JsonValue>` in `dist/` — the
shipped one is a `const`.

*Note*: `docs/api.md` is stale in a second, adjacent way — `:222` still documents
`takeUntilAnySpan(excluded: string): Parser<Span>`, one of the 15 `*Span` builders **excised at
1.0.0** (`src/parse/index.ts:10-12`; gate `proof:no-span-surface`). Cited as context, not counted as
a defect of this module.

### C-2 — BLOCKER — `csvParser` fails both of its documented contracts and silently destroys data

Two contracts are asserted: `README.md:37` *"RFC 4180"* and `docs/api.md:237` *"RFC 4180 CSV parser.
Handles quoted fields with escaped double-quotes."* The grammar is `csv.ts:11-20`.

MEASURED against the shipped dist **[re-verified r2, every row]**:

| input | result | RFC 4180 requires |
|---|---|---|
| `a,b,c\n1,2,3` (the README's own example) | `[["a","b","c\n1","2","3"]]` | two records |
| `a,b\r\nc,d` (CRLF, §2.1) | `[["a","b\r\nc","d"]]` | two records |
| `a,"b""c",d` (§2.7 doubled-quote escape) | `[["a","b"],["c","d"]]` | one record, field 2 = `b"c` |
| `a,,b` (empty field, §2.4) | `[["a"]]` | three fields |
| `x,"y` (unterminated quote) | `[["x","\"y"]]`, `isError=false` | reject |
| `!!!` | `isError=false`, `[["!!!"]]` | — |
| `` (empty input) | `[]`, `isError=false` | — |

Three distinct failures, each silent:

1. **No record separator exists.** `csv.ts:14` `regex(/[^,]+/)` — the negated class excludes only the
   comma, so `\n` and `\r\n` are ordinary field characters. The parser has no concept of a row
   boundary; the whole document collapses to one row. The README's own example demonstrates the bug.
2. **The RFC's escape mechanism produces phantom records and drops a byte.** `a,"b""c",d` → **two**
   rows; the escaped `"` never appears in any output field.
3. **Empty fields truncate the record.** `sepBy` (`parser.ts:594-611`) backtracks past a separator
   whose following element fails or consumes zero, so `a,,b` yields `["a"]` — `b` discarded, no error.

And it can never reject. This is structural, not empirical: `many()`'s success test is
`if (len >= min) return state.ok(matches)` (`parser.ts:552-554`) and `min` defaults to `0`
(`parser.ts:523`), so **no input can produce `isError === true`**. Corroborated in r2 over 500
random 12-char ASCII strings: **0/500** errors. `csvParser` is *total* in the useless direction — it
always returns, and what it returns is frequently wrong.

Under X·P this is a direct **COMP-1** violation (`W2.md:242-245`, `weave(V,C,P) === S`): the three
dropped bytes of `a,,b` land in neither `V` nor `C`.

*Falsifier*: any input on which shipped `csvParser` agrees with RFC 4180 on record splitting — or
any input at all for which `isError === true`. A single `regex(/\r?\n/)` record separator would
refute the first; the file has none. The second is refuted by `parser.ts:552` by construction.

### C-3 — BLOCKER — `escapedString`/`quotedString` do not decode; the `\uXXXX` payload is discarded

`docs/api.md:239-245`: *"`escapedString(): Parser<string>` — Parses backslash-escaped characters
(`\n`, `\t`, `\"`, `\uXXXX`, etc.)"* and *"`quotedString(quote?): Parser<string>` — Parses a quoted
string with escape handling."*

`utils.ts:7-12`:
```ts
return string("\\").then(
    regex(/[bfnrt"'\\/]/)
        .or(string("u").skip(regex(/[0-9a-fA-F]{4}/)))
).map(([, esc]) => esc);
```
`.map(([, esc]) => esc)` takes the **letter after the backslash**, never the character it denotes;
`.skip()` (`parser.ts:189-207`) **discards its argument's value by construction**, so the four hex
digits are consumed and thrown away.

MEASURED **[re-verified r2]**: `escapedString().parse("\\n")` → `"n"` (not a newline) ·
`escapedString().parse("\\t")` → `"t"` · `escapedString().parse("\\u0041")` → `"u"` (not `"A"`, not
`"\\u0041"` — the codepoint is **gone**) · `escapedString().parse('\\"')` → `"\""` (the one arm that
happens to round-trip).

`quotedString` (`utils.ts:15-18`) joins these parts, so the loss propagates into a *silently mangled
string*, not an error: `quotedString().parse('"a\\nb"')` → **`"anb"`** ·
`quotedString().parse('"a\\u0041b"')` → **`"aub"`**.

This is the worst failure class available: a wrong answer with `isError=false`. A consumer parsing
`"line1\nline2"` receives `line1nline2` with no signal. Under X·P it is a second **COMP-1** breach —
the backslash and the four hex digits enter neither `V` nor `C`.

*Falsifier*: `escapedString().parse("\\n") === "\n"` would refute — measured `"n"`. Or: any code path
in `utils.ts` mapping the escape letter to its codepoint (a lookup table, `JSON.parse`,
`String.fromCharCode(parseInt(hex,16))`) — `utils.ts` is 23 lines and contains none.

Note the contrast one file over: `json.ts:22-24` **does** decode correctly (S-2). The module contains
a correct escape decoder and a broken one, and exports the broken one as the reusable utility.

---

## 2. MAJOR

### C-4 — MAJOR — zero consumers anywhere in the constellation; dead by parse-that's own precept

`typescript/scripts/proof-no-dead-combinator.mjs:9-11` states the precept itself:

> *"A never-importable export is not part of the public contract; an export born one prior tranche
> with zero workspace consumers is dead by the precept."*

Applying it with §0 as the measurement: **0 consumers in value.js (no dependency, no import), 0 in
keyframes.js (self-declared parse-that-free), 1 of 5 names in 1 parse-that test.** The module is 5 of
the root barrel's **34** runtime exports — **15% of the package's front door** — serving nothing.
(r2 re-counted the root barrel independently: `Object.keys(dist/parse.js)` → **34**.)

The gate exempts it only by accident of scope: `proof-no-dead-combinator.mjs:29-32` hardcodes a
`banned` list of exactly two names (`thenMap`, `fuse`). The precept is general; the enforcement is a
two-row allowlist inversion. Its own header (`:11-13`) also carries a **vacuity guard** for
`dispatch` — the machinery to sweep a surface exists and is simply not pointed here.

Age receipt (r2): `git log --oneline -- typescript/src/parse/parsers/` → last touch
`c86a149 feat(A.W1): CSS-parser removal … → 0.10.0`. Two minor cuts and one major cut have shipped
over it untouched.

**Contradicting a prior ruling, explicitly.** `parse-that/docs/tranches/A/A.md:214` ruled *"Keep
`jsonParser`, `csvParser`, `escapedString`, `quotedString`, `numberParser`"* and `A.W3.md:320`
confirmed them as re-exported from `.` and their own subpath. This challenge contradicts that ruling
**on the consumption axis only**: it was made during the CSS-excision cut, before the parser-band
adjudication and before PLAW-BIND named value.js the sole downstream. A.md's own zero-consumer
reasoning for the CSS cut applies verbatim to these five and was simply not extended to them. The
1.0.0 cut then *did* apply it to the 15 `*Span` builders (`index.ts:10-12`: *"a zero-consumer
surface"*), with a gate. The precedent, the mechanism, and the precept are all in-tree; only these
five were skipped.

*Falsifier*: one production import of any of the five outside parse-that's own `test/`. Searched:
value.js (`src/`, `demo/`, `api/`, `test/`, `scripts/`, `package.json`), keyframes.js
(`src/`, `package.json`), parse-that (`src/`, `test/`, `scripts/`, `docs/`). The only non-doc,
non-self hits are `README.md:34`, `docs/api.md:230-249`, `docs/playground/leaf-parsers.md:122-145`
— all documentation, and all three show the C-1 broken call form.

### C-5 — MAJOR — `Parser<any>` ships; `JsonValue` types nothing; strict `tsc` proves full infectiousness

`json.ts:39-40` carries an eslint suppression and the escape hatch:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonValue: Parser<any> = dispatch({ … });
```
and it reaches the shipped declaration verbatim: `dist/parsers/json.d.ts`
`export declare const jsonParser: Parser<any>;` **[re-verified r2]**.

Meanwhile `JsonValue` (`json.ts:7-13`) is exported twice — `parsers/index.ts:6` and
`utils-entry.ts:8` — and **types no exported value in the package**. `docs/api.md:230` advertises
`Parser<JsonValue>`; the artifact ships `Parser<any>`.

MEASURED — `tsc --strict --noEmit` (TypeScript from value.js `node_modules`, `moduleResolution:
bundler`, `target: es2022`) over:
```ts
import { jsonParser, csvParser } from "…/parse-that/typescript/dist/index.js";
const n: number  = jsonParser.parse('"a string"');   // a string at runtime
const b: boolean = jsonParser.parse("[1,2,3]");      // an array at runtime
const rows: string[][] = csvParser.parse("a,b");
jsonParser.parse('{"x":1}').anything.at.all.goes;    // arbitrary member chain
```
→ **exit 0, zero diagnostics.** The `any` is not contained; it flows into consumer code and disables
checking at every use site. A codebase with `strict` + `noImplicitAny` loses those guarantees the
moment it touches `jsonParser`. Under X·P this also fails **G-10** directly: `V` must be *"exactly
the frozen `/css` value types, **zero** extra properties"* (`W2.md:236`), and `any` is assignable to
everything.

*Falsifier*: any of the four lines producing a `tsc --strict` error. Measured exit 0 with an empty
diagnostic file. (Control: adding `n.toFixed ? 1 : 2` *does* error `TS2774`, proving the compiler was
running and the config live.)

### C-6 — MAJOR — the module's 5 root exports are invisible to the publish-discipline gate

`test/dist-surface.test.ts` exists precisely to bite source↔dist export drift; its own header
(`:6-12`) cites the scar: *"The shipped 0.8.2 dist exported only 8 of the 15 span fns (a silent
source↔dist version-drift defect: `import { altSpan }` from the pinned dist hit a runtime
`undefined`, and the version number lied about it)."*

Its extractor, `namedExports()` (`dist-surface.test.ts:20-34`), matches **only**
`/export\s*\{([^}]*)\}/g`. The module reaches the root barrel through `src/parse/index.ts:14` —
`export * from "./parsers/index.js";` — a form the regex cannot see. The emitted `dist/index.d.ts:10`
carries the same star, so **both sides of the comparison are blind symmetrically** and the diff is
vacuously empty.

MEASURED (the gate's own `namedExports()` re-run verbatim over `src/parse/index.ts`, r2 rerun):
`jsonParser` **false** · `csvParser` **false** · `escapedString` **false** · `quotedString` **false**
· `numberParser` **false**; control `dispatch` → **true**. Five of the root's runtime exports sit
entirely outside the gate that exists to protect the root's runtime exports.

*Falsifier*: delete `export { csvParser } from "./csv.js";` from `parsers/index.ts`. The gate's
`srcNames` set is unchanged (it never contained it) → `missing` is `[]` → **GREEN**, while
`import { csvParser } from "@mkbabb/parse-that"` becomes `undefined` for every consumer. Exactly the
0.8.2 drift the gate was built to catch, reproduced in the one construct it cannot read. (Simulated
against a copy of the gate's function in scratchpad; **no write to parse-that**.)

### C-7 — MAJOR — `./utils`, the tier that homes this module, has no surface assertion

`package.json` `exports` declares four subpaths; `test/subpath-gate.mjs:26` iterates
`["./core", "./diagnostics", "./packrat", "./utils"]` but only checks **file existence** per field
(`:27-35`). It then resolves and loads exactly two (`:38-41`) and asserts three symbols (`:44-51`:
`core.Parser`, `core.dispatch`, `packrat.memoize`). Its GREEN message (`:53-56`) names only
`./core{Parser,dispatch} + ./packrat{memoize}`. **[re-verified r2]**

So `@mkbabb/parse-that/utils` — whose entire reason to exist is *"the json/csv domain-parser
showcases and the string utility parsers"* (`utils-entry.ts:3-5`) — has **no runtime surface
assertion anywhere in the proof suite**. Together with C-6 and C-4 that is three gates
(`dist-surface`, `subpath-gate`, `no-dead-combinator`) whose coverage claims are, in this corner,
vacuous.

*Falsifier*: repoint `exports["./utils"].import` at `dist/core.js`. Every existence check still
passes, no symbol from the utils tier is loaded or asserted, and `proof:subpath` prints GREEN while
`import { jsonParser } from "@mkbabb/parse-that/utils"` resolves to `undefined`.

### C-8 — MAJOR — the shipped bindings are untested; the tests certify a fork

`grep -rln "csvParser|escapedString|quotedString|numberParser" typescript/test/` → **no matches**.
Four of five exports have **zero tests**. **[re-verified r2]**

What the suite actually does is worse than absence:

- `test/csv.test.ts:1-16` **re-declares** the CSV grammar inline from `../src/parse` primitives —
  near-byte-identical to `csv.ts:5-20` — and its assertions never touch `csvParser`.
- `test/json.test.ts:1-25` re-declares a **different, older** JSON grammar:
  `jsonNumber = regex(/-?(0|[1-9]\d*)(\.\d+)?/)` (**no exponent** — `json.ts:21` has one),
  `jsonString = stringChar.many().wrap(…)` (**no escape handling** — `json.ts:22-24` has the
  `JSON.parse` fast/slow path), `any(...)` instead of `dispatch(...)` (`json.ts:40`). It certifies a
  grammar that is not shipped.
- `test/json-vectors.test.ts` (33 lines) is the **only** file importing a shipped binding (`:8`,
  `jsonParser`). Its single assertion is `:29` `expect(result).not.toBeUndefined();` — no value
  check, and it uses `.parse()` undefined-ness as the success signal: the exact idiom the
  parser-band forbids (`parser-band.md:108`: *"entry via `parseState` + `isError`, never `parse()`
  truthiness"*) and that O-15 **PT-07** names as indistinguishable. r2 note: C-5's defects all pass
  it — `jsonParser.parse("1abc")` → `1`, which is `not.toBeUndefined()`.
- The negative arm exists **on disk and is never read**: `grammar/tests/json/invalid.jsonl` is 7
  lines (`{key: "value"}`, `[1 2 3]`, `[}`, …); `json-vectors.test.ts:23` reads only `valid.jsonl`.
- The other two grep hits in `test/` (`benchmarks/arcsecond.ts:65`, `benchmarks/parjs.ts:58`) are
  competitor implementations with a **local** `jsonParser` binding — not consumers. **[r2]**

*Falsifier*: corrupt `parsers/csv.ts` arbitrarily (e.g. swap the `,` delimiter for `;`) and run
`npm test` — no test imports it, so the suite stays green. Or: point `json-vectors.test.ts` at
`invalid.jsonl` with an `isError` expectation — it is not wired, so the question has never been asked.

### C-9 — MAJOR — `numberParser` is a false friend for the one production value.js would reach for

This is the single export whose name promises reuse by the routing law's sole downstream, and it is
measurably wrong for it. value.js's `<number>` production is `src/css/grammar.ts:129-132`:
```ts
if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) return null;
const value = Number(token);
return Number.isFinite(value) ? value : null;
```
Anchored both ends, `+`/`.5`/`1.` admitted, **non-finite rejected**. `utils.ts:22` is
`regex(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/).map(Number)` — unanchored, no leading `+`, no
leading `.`, no finite guard. It is also **byte-identical** to `json.ts:21`'s `jsonNumber`, which
`json.ts` does not import — two copies of one numeral grammar, free to drift (see C-16).

MEASURED, side by side **[re-verified r2 on the starred rows]**:

| token | CSS `<number>` (css-syntax §4.3.12) | value.js `numberToken` | parse-that `numberParser` |
|---|---|---|---|
| `+1` ★ | valid | `1` | **isError, consumed 0/2** |
| `.5` | valid | `0.5` | **isError, consumed 0/2** |
| `-.5` | valid | `-0.5` | **isError, consumed 0/3** |
| `+.5e-2` | valid | `0.005` | **isError, consumed 0/6** |
| `1.` ★ | valid | `1` | `1`, **consumed 1/2** (silent prefix) |
| `01` / `007` ★ | valid (`1` / `7`) | `1` / `7` | **`0`, consumed 1/2** (silent prefix, wrong value) |
| `1e400` ★ | overflow → `null` | **`null`** | **`Infinity`** |
| `0x10` | invalid | `null` | **`0`, consumed 1/4** |

Four legal CSS numbers rejected outright, three silently prefix-accepted with a wrong value, and
`Infinity` admitted into the value stream. That last one is not a taste call: it is the exact class
the parser band adjudicated **against** — `parser-band.md:97` records `lab(50 1e400 0)` admitting
`a=∞` as *"cand-F's sole adjudicated correctness debit"*, and `:141` preserves the non-finite DISSENT
with cand-F's unclamped pass-through **rejected**. `numberParser` ships that debit.

Adopting it into the `/css` grammar would regress `parseCssValue`/`parseCssScalar` (two of the frozen
19 runtime exports) on eight measured token classes. The export that looks most reusable by the sole
downstream is the one that must not be reused.

*Falsifier*: `numberParser().parse(".5") === 0.5` would refute — measured `undefined`, `isError=true`,
`offset 0`. Or `numberParser().parseState("01").offset === 2` — measured `1`.

### C-10 — MAJOR — `quotedString(quote)` interpolates its parameter unescaped into a character class

`utils.ts:16`: ``const inner = regex(new RegExp(`[^${quote}\\\\]+`)).or(escapedString());``
The signature is `quotedString(quote?: string)` (`dist/parsers/utils.d.ts`) — an arbitrary string,
placed raw inside `[^…]`. No validation, no escaping.

MEASURED **[re-verified r2, including the disputed first row — see §8]**:

| call | outcome |
|---|---|
| `quotedString("\\")` (one backslash) | **`SyntaxError: Invalid regular expression: /[^\\\]+/: Unterminated character class` — thrown at BUILD time**, before any input exists |
| `quotedString("]")` | builds a **silently different grammar** (`[^]\]+` = "any char, then one-or-more `]`"); `parse("]ab]")` → `isError=true, offset 0` — it rejects its own well-formed input |
| `quotedString("^")` / `("-")` / `("\|")` / `(".")` | accept, but only because the metachar lands in a position where it degrades benignly — positional luck, not design |
| `quotedString("")` (empty) | builds `[^\\]+`; accepts **unquoted** `abc` → `"abc"` — a zero-width "quote" that accepts anything **[new in r2]** |
| `quotedString("ab")` (multi-char) | builds `[^ab\\]+`; `parse("abXab")` → `"X"` — accidentally right for the wrong reason |

A caller doing `quotedString(userDelimiter)` gets a build-time throw, a wrong grammar, or a right
answer, with no way to tell which from the signature.

*Falsifier*: one escaping step — `quote.replace(/[\\\]^-]/g, "\\$&")` — would make
`quotedString("]").parse("]ab]")` return `"ab"`. `utils.ts` performs no escaping and the parameter
appears in exactly one place (`:16`).

### C-17 — MAJOR — `.parse()` on failure can return a **truthy, wrongly-typed** value — PT-07 is understated *(new in r2)*

`parsethat-surface-gaps.mjs:57` records the failure signal as *"returns undefined — indistinguishable
from `.opt()`"*, and O-15 **PT-07** says the same. Revision 1's C-11 reproduced exactly that shape.
**Both are correct but incomplete**: the shape depends on *where* in the grammar the failure lands.

MEASURED (r2), same export, two inputs differing by one leading byte:

| call | returns | `Array.isArray` | truthy? |
|---|---|---|---|
| `quotedString().parse("unterminated")` — no opening quote | `undefined` | false | **false** |
| `quotedString().parse('"unterminated')` — opening quote present | **`["unterminated"]`** | **true** | **true** |

Declared type is `Parser<string>` (`dist/parsers/utils.d.ts`). Mechanism: `parse()` is
`this.parseState(val).value` (`parser.ts:77-79`), returning whatever `state.value` holds. When the
opening `wrap` delimiter fails, nothing was ever assigned → `undefined`. When it *succeeds* and the
**closing** delimiter fails, the inner `many()` accumulator is still sitting in `state.value`;
`many`'s `unsafeSetValue([])` (`parser.ts:557`) fires only when `many` itself fails, not when the
enclosing `wrap` does.

This is **strictly worse** than the recorded `undefined` shape, and it defeats the obvious consumer
guard: `const s = quotedString().parse(x); if (s) { … }` passes, and the consumer then holds a
`string[]` where the type and the `if` both say `string`. The C-5 `any`/C-11 type-lie pair means no
compiler catches it either.

*Falsifier*: `quotedString().parse('"unterminated') === undefined` would refute — measured
`["unterminated"]`, `Array.isArray === true`. Filed as a **correction to PT-07's stated scope**, not
a new class; the `undefined` half stands exactly as O-15 and revision 1 recorded it.

### C-18 — MAJOR — DEBT-3 at module altitude: a thrown `RangeError` at a ceiling 2.4×–4.8× worse than the recorded generic figure *(new in r2)*

Revision 1 noted the exposure and **explicitly declined to measure it** (r1 §6: *"Not independently
re-measured (O-15's number stands; re-deriving it would violate the epoch rule). Noted as inherited
exposure, **not counted** as a new defect."*). That caution was right about PT-04's **generic**
number and wrong about the **module's own**: measuring `jsonParser` is measuring a different parser,
not re-deriving the pinned figure. r2 measured it.

`json.ts:25` and `json.ts:28` place **two** `Parser.lazy` back-edges with **no depth bound**
(`Parser.lazy` has arity 1 — `parsethat-surface-gaps.mjs:37`).

MEASURED (r2, shipped dist):

| grammar | deepest OK | failure mode |
|---|---|---|
| `jsonParser` on `[…[1]…]` | **3,262** | `RangeError` **thrown** at 3,263 |
| `jsonParser` on `{"a":…1…}` | **1,631** | `RangeError` **thrown** at 1,632 |
| generic `Parser.lazy` back-edge (O-15 PT-04, **not re-derived**) | 7,761 | `RangeError` thrown at 7,762 |
| native `JSON.parse` (control) | **≥ 20,000** | no failure in range |

The published parser throws where the platform baseline it is presented as an alternative to
(`docs/api.md:230`) does not, at a depth **6× shallower**, and the object arm is **4.8× worse** than
the generic lazy figure because each object level costs two frames. Deeply-nested JSON is the classic
untrusted-input shape, so this is the one defect in the ledger with a plausible reachable trigger.

This is precisely parser-band binding debt #3 (`parser-band.md:118`): *"cand-O's one `lazy` back-edge
should carry an explicit depth bound so the stack ceiling becomes an ordinary `ok:false` by
construction."* Under X·P the same requirement is an algebra law — **bounded back-edge, "the depth
bound an *algebra parameter*"** (`W2.md:252`). This module is where the debt bites hardest and is the
only place the ceiling had never been measured.

*Falsifier*: exhibit a depth bound in `json.ts` — absent (52 lines, `grep` for `depth`/`max` → 0); or
`jsonParser.parseState("[".repeat(4000)+"1"+"]".repeat(4000))` returning `isError: true` rather than
throwing — measured: throws `RangeError`. Bound: N=1 machine, node v26.0.0; the *ordinal* claim
(module ceiling ≪ generic ceiling ≪ `JSON.parse`) is stack-frame-size dependent, the *categorical*
claim (thrown, not `ok:false`) is not.

---

## 3. MINOR

### C-11 — MINOR — `.parse()`'s declared return type lies; the module hands consumers three of them (PT-07 at module altitude)

`parser.ts:77-79` — `parse(val) { return this.parseState(val).value; }` — is typed to `T`, and returns
`undefined` on failure. O-15 **PT-07** names this at the library level; the value-side cure is a named
JS-boundary invariant **above** parse-that. This module is where the type-lie becomes *load-bearing
for a consumer*, because all three factory exports are handed out as `Parser<T>` with `T`
non-nullable.

MEASURED — `tsc --strict --noEmit`, **exit 0, zero diagnostics** on:
```ts
export const n: number = numberParser().parse("+1");            // runtime: undefined
export const s: string = quotedString().parse("unterminated");  // runtime: undefined
export const e: string = escapedString().parse("no backslash"); // runtime: undefined
```
All three runtime values confirmed `undefined`. A strict consumer gets three non-nullable bindings
holding `undefined`. **C-17 shows the fourth shape: a non-nullable binding holding an array.**

*Falsifier*: `parse(): T | undefined` in `dist/parser.d.ts` would refute — it is `T`. Or any of the
three assignments erroring under `--strict` — exit 0, empty diagnostics.

### C-12 — MINOR — mixed lifecycle: two shared mutable singletons among three factories

`jsonParser` (`json.ts:52`) and `csvParser` (`csv.ts:20`) are module-level constants — one instance
per process, shared by every consumer. `escapedString`/`quotedString`/`numberParser`
(`utils.ts:7,15,21`) are factories returning fresh parsers (measured, both revisions:
`escapedString() !== escapedString()`; `numberParser() !== numberParser()`).

`Parser` carries a **public mutable** `state` field (`parser.ts:25` `state: ParserState<T> |
undefined;`), assigned on every parse (`:66` error branch, `:70` success branch). MEASURED: after
consumer A parses `{"a":1}` successfully, `jsonParser.state.isError === false`; after consumer B
parses `@@@`, `jsonParser.state.isError === true` — **for both consumers**, process-globally,
last-writer-wins.

`.parse()`'s *return* is unaffected (it reads the fresh local state). The hazard is `.state` — the
**only channel a caller has for a failure reason**, since `.parse()` gives `undefined` (C-11) or a
wrong-typed array (C-17) and `expected` is empty (C-13). The one diagnostic surface the module leaves
open is the one it shares globally.

r2 addendum, on the factory half: the zero-argument factories have a second cost. `dispatch()` interns
by **reference identity** — `parsers.indexOf(parser)` (`leaf.ts:104-111`) — so the natural
`dispatch({ "-": numberParser(), "0-9": numberParser() })` gets **two** table slots for one grammar,
where `json.ts:44-45` correctly reuses a single `jsonNumber` const and gets one. The module
demonstrates the right idiom internally and exports the wrong one. And no parameter justifies the
factory shape: both are arity 0 (`dist/parsers/utils.d.ts`).

*Falsifier*: making `jsonParser` a factory (as the docs already claim it is — C-1) removes the sharing
entirely; the three sibling exports in the same 103-line module already do this. For the addendum:
name the parameter that justifies `escapedString()`/`numberParser()` being functions — arity 0.

### C-13 — MINOR — DEBT-1 lands here: every failure class yields an empty `expected` set

`parser-band.md:116` (binding on the wave): *"**Labelled failure diagnostics.** … `expected:
["<named-color>"]` beats `(?!)`. This is the single clearest thing cand-F does better."*
`parsethat-surface-gaps.mjs` RED row: `DEBT-1 Parser.prototype.label / .expected combinator — absent`.

MEASURED on this module, diagnostics OFF (the shipping default; arming was **not** performed —
O-15 PT-01 records that arming drags an unconditional `console.error`):

| input | isError | expected | furthest |
|---|---|---|---|
| `""` | true | **undefined** | 0 |
| `"@"` | true | **undefined** | 0 |
| `"{"` | true | **undefined** | 1 |
| `"[1"` | true | **undefined** | 2 |
| `'{"a"'` | true | **undefined** | 4 |
| `"tru"` | true | **undefined** | 0 |

The module is the package's flagship demonstration of `dispatch()` (`json.ts:38-49`), and a `dispatch`
miss produces **no expectation at all** — not an opaque one, none. A consumer's only available error
message is a `furthest` integer. `furthest` is at least correct and non-trivial (1, 2, 4 for the three
structural failures), which is why this is MINOR rather than MAJOR. Structural corroboration (r2):
`grep -rn "label\|expected\|eof" src/parse/parsers/` → **0 hits** across all 103 lines.

*Falsifier*: any non-`undefined` `expected` array from `jsonParser.parseState(x)` with diagnostics off.
Six failure classes probed, all `undefined`.

### C-14 — MINOR — no `.eof()` anywhere; prefix parsers presented as document parsers

`parser.ts:637` provides `.eof()`. Neither `json.ts`, `csv.ts`, nor `utils.ts` calls it, so every
export accepts a **prefix** and discards the tail without signal.

MEASURED **[re-verified r2, with offsets]**: `jsonParser.parseState('{"a":1} GARBAGE')` →
`isError=false`, value `{"a":1}` · `jsonParser.parseState("{}garbage")` → `{}` at offset **2/9** ·
`jsonParser.parseState("1abc")` → `1` at **1/4** · `jsonParser.parseState("[1,2]xyz")` → `[1,2]` at
**5/8** · `jsonParser.parse("nullx")` → `null` · `numberParser().parse("0x10")` → `0`.
`JSON.parse` throws on all of the JSON rows. Meanwhile `docs/api.md:230` says *"Combinator-based JSON
parser"* and `README.md:36` passes a complete document.

*Falsifier*: `jsonParser.eof().parseState('{"a":1} GARBAGE').isError` → `true`. The method exists one
file up; the module simply never composes it.

### C-15 — MINOR — an undeclared JSON conformance divergence from `JSON.parse`

`json.ts:22` — `regex(/"(?:[^"\\]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/)` — the negated class `[^"\\]`
admits raw control characters, which RFC 8259 §7 forbids inside a string.

MEASURED with the input `"<U+0001>"` — a three-character string: a quote, the **raw** control
character U+0001, a quote (constructed as `'"' + String.fromCharCode(1) + '"'`, **not** the
six-character escape): `jsonParser.parseState(input).isError` → **`false`** (accepts);
`JSON.parse(input)` → **throws `SyntaxError`** (rejects). **[re-verified r2, both halves.]**
Checked as parity, no divergence found: `1e400` → `Infinity` (both),
`123456789012345678901234567890` → `1.2345678901234568e+29` (both), `"\/"` → `"/"` (both),
`{"a":1,"a":2}` → `{a:2}` (both), `{"a":1,}` and `[1,2,]` rejected (both).

One divergence out of six probed classes, undeclared in `docs/api.md:230-233`. The corpus that would
have caught it (`grammar/tests/json/invalid.jsonl`) is unread — see C-8.

*Falsifier*: that same U+0001 input returning `isError === true` would refute — measured `false`.

### C-16 — MINOR — circular import with the root barrel, plus two dead `Parser` imports

All three implementation files import the **root barrel**: `json.ts:5`, `csv.ts:5`, `utils.ts:4` —
`from "../index.js"`. And `src/parse/index.ts:14` is `export * from "./parsers/index.js";`. Every file
in the module is in a cycle with the package root, while executing module-level initializers
(`json.ts:15-49`, `csv.ts:7-17`) *during* that cycle.

Two of the three imports are also **dead**: `csv.ts:5` `import { regex, any, string, Parser }` —
`Parser` is never referenced in the file's 20 lines; `utils.ts:4` `import { regex, string, Parser }` —
same. Only `json.ts` uses `Parser` (`:25,:28,:40`, via `Parser.lazy`). **[re-verified r2]**
`tsconfig.json` sets `verbatimModuleSyntax: true` (so the import is preserved in emit) and does **not**
set `noUnusedLocals`, so `tsc` never bites; rollup strips them from `dist/utils.js`, which is why this
is source hygiene rather than a shipped defect.

The tree already knows the barrel path is wrong: `utils-entry.ts:7-13` deliberately imports the leaf
modules directly (`./parsers/json.js`, `./parsers/csv.js`, `./parsers/utils.js`) rather than going
through `../index.js`.

MINOR because it is **latent, not live** — the bundler flattens it and `import(dist/parse.js)` succeeds
today. It becomes live under module reordering, and X.P.W2 §5.i graduates a survivor's slice into
`<p2>/typescript/src/css/**` (`W2.md:180-183`), i.e. re-treads exactly this edge in a fresh root.

*Falsifier*: the cycle is refuted by inspection if `index.ts:14` is not a re-export of the module that
imports it — it is (`index.ts:14` ↔ `json.ts:5`). The cure is one line per file: import from
`../leaf.js` / `../parser.js`, which is what `core.ts:7-25` already re-exports and which drops both
dead `Parser` imports at the same time.

---

## 4. SUPERLATIVES (L-18 — the tree gets its due, with falsifiers)

### S-1 — `many()`'s zero-width guard defuses the footgun `csvParser` walks straight into

`csvParser = line.many()` where `line = token.sepBy(delim).trim()` and `sepBy`'s `min` defaults to `0`
(`parser.ts:569`) — i.e. `line` can succeed consuming nothing. `many()` over a nullable parser is the
canonical combinator hang. `parser.ts:538` — `if (state.offset === savedOffset) break;` — kills it by
construction, and `sepBy` carries the same guard at `:605`. *(Line cite corrected in r2: the guard is
at `parser.ts:538`, not `:539`.)*

MEASURED: `csvParser.parse("")` returns `[]` in finite time; `csvParser.parse("!!!")` returns promptly.
The core protects a composition the module did not think about, and does so silently — which is
simultaneously the indictment: `csv.ts` depends on a core invariant without a word of comment.

*Falsifier*: remove `parser.ts:538` and `csvParser.parse("")` hangs. This is a real, load-bearing
invariant, not a comment. (Not executed — the tree is read-only; the claim is structural and the
finite-time measurement is the positive half.)

### S-2 — `json.ts:22-24` is a genuinely excellent escape-decode strategy

```ts
const jsonString = regex(/"(?:[^"\\]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/).map(
    (s) => (s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s)),
);
```
One regex terminal recognises the whole token (matching the parser-band's idiom reading,
`parser-band.md:108`: *"regexes are single-token terminals"*); the common case is a zero-allocation
`slice`; the rare case delegates to the spec-exact native decoder instead of hand-rolling one.

MEASURED correct across every probe: `"\/"` → `"/"`, lone surrogate `"\ud800"` preserved,
`{"__proto__":{"x":1}}` → an own `__proto__` data property with `Object.getPrototypeOf(result) ===
Object.prototype` and **no global pollution** (`({}).polluted` stays `undefined`) — because
`json.ts:35` uses `Object.fromEntries`, which does `CreateDataProperty`, not `[k]=v` assignment.
**[re-verified r2: `{"__proto__":1}` yields an own data property, `{"a":1,"a":2}` → `{a:2}`, both
matching `JSON.parse`.]**

*Falsifier*: any input where the fast path and `JSON.parse` disagree. Probed the backslash-free path,
the `\/` path, the surrogate path, and the prototype path — no disagreement found. (This also makes
C-3 sharper, not softer: the module contains a correct decoder and exports the broken one.)

**r2 note, recorded against my own first draft**: I initially wrote this up as a *defect* — "the
showcase outsources unescaping to `JSON.parse`, and does not consume its own `escapedString`". That
reading is wrong and revision 1's is right. Delegating a spec-exact decoder is good engineering, and
the sharp point is the contrast with C-3, not the delegation. Withdrawn before it reached the ledger;
recorded here because a withdrawn claim is evidence about the auditor.

### S-3 — the `dispatch` table is the canonical idiom, and this module is its only in-tree witness

`json.ts:38-49` builds a genuine first-character dispatch table
(`{"{":…, "[":…, '"':…, "-":…, "0-9":…, "t":…, "f":…, "n":…}`) — real O(1) branching over an
`Int8Array(128)` (`leaf.ts:101`) with range syntax, interning `jsonNumber` **once** across the `-` and
`0-9` keys (`leaf.ts:104-111`) — not sequential `any()`. `parser-band.md:108` names *"two-level
`dispatch` narrowing"* among the shared virtues of both adjudicated candidates, and it is exactly the
**channel-table dispatch** capability family the X·P algebra enumerates (`W2.md:252`), which AC-2/AC-3
both need a witness for. `test/json.test.ts:1-25` uses `any()` — so the shipped module is the *better*
of the two grammars in the repo on exactly the axis the band ruled canonical.

*Falsifier*: if `dispatch` were sugar over sequential alternation, the empty `expected` set of C-13
would not occur (an `any()` chain merges each arm's expectation). The absence of expectations is itself
evidence the table is real — the superlative and the defect share a receipt.

### S-4 — `parsers/index.ts:1-4` carries its own excision provenance, with a live gate behind it

```
// Domain-parser showcases over the combinator core. The CSS grammar that once
// lived here moved to value.js (the constellation's one canonical CSS grammar,
// D2/D3); parse-that is pure primitives now — json/csv remain as the terse,
// spec-grade combinator examples.
```
Four lines that state what left, where it went, and under which ruling — in-source, where the next
reader is, rather than in a doc that drifts (contrast C-1's `api.md`). And it is not just prose:
`package.json` `scripts` carries `proof:no-css-surface`, so the claim is enforced.

*Falsifier*: if the CSS symbols were still reachable, this comment would be a lie — `dist/index.d.ts`
and `dist/utils-entry.d.ts` carry no `cssParser`/`specificity`/`parseSingleValue`, and the root export
census is 34 names with none CSS-shaped. The comment is true.

### S-5 — the dual-entry split is identity-SOUND; the duplication hazard it usually creates does not exist *(new in r2)*

The five exports are reachable from **two** entries (root `.` → `dist/parse.js`; `./utils` →
`dist/utils.js`). The standard failure mode of that arrangement is two copies of the parser graph and
two `jsonParser` identities in one bundle — which would matter here, because `Parser` carries mutable
per-instance `state` (C-12), so two identities means two divergent diagnostic channels.

MEASURED (r2):
```
import * as root from dist/parse.js;  import * as sub from dist/utils.js;
root.jsonParser === sub.jsonParser   →   true
```
`dist/parse.js:4` re-imports the shared `./utils.js` chunk (`import { csvParser, escapedString,
jsonParser, numberParser, quotedString } from "./utils.js"`) rather than inlining a second copy, and
`dist/parse.cjs:6` does the same via `require("./utils.cjs")` — so the property holds under both
module systems, not just ESM. A consumer mixing `@mkbabb/parse-that` and `@mkbabb/parse-that/utils`
gets one instance.

*Falsifier*: two distinct instances across the entries, or an inlined duplicate of the json/csv graph
in `dist/parse.js` — measured identical, and `dist/parse.js` contains no parser construction at all,
only the re-import. This is correct build hygiene that the replacement surface should preserve.

*Bound*: this is a **build-output** property (vite/rollup chunking), not a source property. It is
re-earned on every build config change and nothing in the proof suite asserts it (cf. C-6/C-7).

---

## 5. The X·P dual-target algebra reading — keep / wrap / retire

W2's binding constraints, applied:

- **W2.md:146-155** — the closed input universe **is** the frozen 52-export `/css` surface, and *"no
  candidate is evaluated on any corpus that is not a declared subset of this universe plus the
  adjudicated fixtures."*
- **W2.md:188-191** — the only parse-that-side citizens W2 admits are **scan primitives**
  (`typescript/src/**`, branch-isolated); *"Value continues to own only the grammar, recovery policy,
  and consumers."*
- **W2.md:193-196** — Not in scope: *"adopting a parser into value.js; adding `@mkbabb/parse-that` to
  `package.json`."* The consumption edge stays **zero through W2 by construction**.
- **W2.md §3c** — every live candidate must host *"the band's adjudicated grammar substance"*;
  discarding a band adjudication *"is a defect, not a design choice."*
- **W2.md:242-253** — **COMP-1** (`weave(V,C,P) === S` for accepted *and* malformed input), the
  capability families, **O-8** (no operator reads or writes process-global mutable state), and the
  **bounded back-edge** with the depth bound as an algebra parameter.

| export | verdict | why, from the tree |
|---|---|---|
| `jsonParser` | **RETIRE** | 0 of 52; not a scan primitive; W2's deliverable is a kill ledger, not a showcase. Carries C-5's `Parser<any>` into any inheritance (fails G-10 on arrival), C-14's unanchored prefix acceptance into **EQ-2**, and C-18's unbounded back-edge into the `W2.md:252` bounded-back-edge family. |
| `csvParser` | **RETIRE** | Same, plus C-2: it would enter the fresh root as a known-wrong grammar under a false RFC claim, and its measured byte-drop (`a,,b` → `[["a"]]`) is a **COMP-1** violation — three bytes in neither `V` nor `C` — so it would fail **EQ-2/EQ-6** on its own showcase corpus. |
| `JsonValue` | **RETIRE** | Types nothing (C-5). A type export with no typed value is pure surface; and `V` is *"exactly the frozen `/css` value types"* (`W2.md:236`), so a second value algebra on the surface has no downstream. |
| `numberParser` | **RETIRE-AND-REPLACE** | The one apparent overlap with the 52, and measurably wrong for it (C-9). Its `Infinity` admission is the class `parser-band.md:97,141` ruled against. The replacement already exists and is correct: `value.js/src/css/grammar.ts:129-132`. Keeping a second, weaker numeral grammar one level down the dependency graph *is* AC-4's predicted failure (a) — *"drift with nothing to stop it"* (`W2.md:376-378`) — instantiated before a candidate is even built. |
| `quotedString` | **RETIRE-AND-REPLACE** | CSS `<string>` needs css-syntax §4.3.7 escapes (1–6 hex digits + optional trailing whitespace); this handles exactly 4 and discards them (C-3), and its parameter is injectable (C-10). Under **AC-4** (`W2.md:370-383`) the quote character is exactly *"a semantic decision expressible as a table row consumed by both siblings"*; under **AC-3** (`:346-369`) it is a span-class matcher row, not a `new RegExp` per call. Either way the replacement is a fresh table-parameterized matcher — nothing of the current 3-line body survives. |
| `escapedString` | **RETIRE-AND-REPLACE** | Same root cause; `.skip()` loses the payload by construction (`utils.ts:10`) — a COMP-1 breach in the smallest function in the module. Repair-in-place changes the observable return (`"n"` → `"\n"`), i.e. a breaking change on a zero-consumer export, so RETIRE costs strictly less. |
| the `dispatch` head-table **pattern** (`json.ts:38-49`) | **KEEP — as an internal fixture, not a public export** | S-3. AC-2/AC-3 need a head-dispatch witness and debt 2 names head-dispatch ordering as the reject-path knob (`parser-band.md:117`). Keep the pattern; demote the export. |
| the dist chunk-sharing property (S-5) | **KEEP — and gate it** | S-5 is real and unasserted. Whatever replaces `./utils` should carry an identity assertion in `subpath-gate.mjs`, which today asserts nothing about that tier (C-7). |
| **anything WRAP-able at the export level** | **none** | Stated deliberately. A wrap verdict would be the comfortable answer and the tree does not support it: every defect above (C-2, C-3, C-9, C-10, C-18) is **in the grammar**, not the packaging. No adapter recovers a record separator that was never parsed, four hex digits that were never captured, or a stack frame that was never bounded. |

**Net.** Under X·P this module contributes **0** of the 52 `/css` exports, **0** capability families,
**0** rows of the §3d shared slice (`parseCssColor` deep + `parseTimingFunction` whole + one malformed
qualified rule), and **5 of the root entry's 34** names.

**The honest cut, and its semver shape.** Excising the five is a **major** bump from both `.` and
`./utils`. The precedent is in-tree and one release old: the 1.0.0 cut removed 15 `*Span` builders for
the identical reason — *"a zero-consumer surface, deprecated in 0.13.0"* (`index.ts:10-12`) — with
`proof:no-span-surface` as the terminal gate and `dist-surface.test.ts:55-60` flipped to assert
absence. The same shape applies: excise, add `proof:no-domain-parser-surface`, flip the dist-surface
keep-gate to an absence-gate. Three defects die as side effects — `parsers/` becomes an empty
directory, so `index.ts:14`'s `export *` (the one construct the publish gate cannot read, C-6) goes
with it, the cycle of C-16 goes with that, and the README/api.md quickstart (C-1) has to be rewritten
rather than left lying. parse-that is at `1.0.0` with a live `1.1.0` ask (O-15) and a downstream that
has never imported it — which is the only argument for doing it now rather than later.

**What is *not* claimed.** That the cut is urgent. Blast radius today is zero (§0), so nothing is
*currently* broken for anyone — with one qualification r2 adds: C-18's `RangeError` is the sole defect
in the ledger with a reachable untrusted-input trigger, and it is reachable only by a consumer who
does not exist. The cost being paid is (a) 15% of the front-door surface and a broken quickstart
standing between a new consumer and the library, (b) a semver obligation on five exports nobody has
ever imported, and (c) three gates (`dist-surface`, `subpath-gate`, `no-dead-combinator`) whose
coverage claims are, in this corner, vacuous. That is a maintenance and first-impression tax, argued
at MAJOR, not an outage.

---

## 6. RED-7 surface-gap touch map

Which rows of `prototypes/css-parser/parsethat-surface-gaps.mjs` land on this module.

| gap row | script line | touches `parsers`? | disposition here |
|---|---|---|---|
| DEBT-1 — `reject()` label under diagnostics-OFF | `:20-24` | **YES** | **C-13** — six failure classes, all `expected: undefined`; `grep "label\|expected"` in `parsers/` → 0 |
| DEBT-1 — `Parser.prototype.label` absent | `:25` | YES (inherited) | unchanged; the module has no workaround |
| DEBT-1 — `enableDiagnostics()` process-global | `:26` | no | never called in either revision |
| DEBT-3 — `Parser.lazy` ceiling / failure mode | `:29-36` | **YES, sharply** | **C-18** — 3,262 / 1,631, thrown `RangeError`; PT-04's generic 7,761 not re-derived |
| DEBT-3 — `Parser.lazy` depth-bound parameter | `:37` | YES | arity 1; `json.ts:25,28` place two back-edges with no bound |
| DEBT-2 / LATCH — packrat arming, `resetPackrat` | `:39-49` | **no** | clean: `grep "memoize\|PACKRAT\|resetPackrat\|enableDiagnostics"` in `parsers/` → **0 hits**. Under **O-8** (`W2.md:249-253`) the module is compliant — the one law it satisfies outright |
| GUARD — `parseState(non-string)` totality | `:52-56` | YES (inherited) | measured **5/5** raw `TypeError` through both `jsonParser` and `csvParser` |
| GUARD — `.parse()` failure signal | `:57` | **YES — and understated** | **C-17** — the `undefined` half is confirmed (C-11); the truthy-wrong-typed-array half is new |
| **probe runnability** | `:11-13` | — | the script `import`s `@mkbabb/parse-that`, which is **not installed** in the value.js workspace (`node_modules/@mkbabb/` = `glass-ui keyframes.js value.js`). It cannot execute there as written; every number in both revisions was measured against `/Users/mkbabb/Programming/parse-that/typescript/dist/` by absolute path |

---

## 7. Corpus fold — where this challenge cites, extends, and contradicts

| source | fold |
|---|---|
| **revision 1 of this file** (16 defects · 4 superlatives, same path, earlier today) | **FOLDED WHOLE.** All 16 defects and 4 superlatives carried forward with their receipts; 11 rows independently re-verified in r2 and marked; 1 row corrected in my own favour-of-r1 direction (§8); 2 defects and 1 superlative added. Severity calibration inherited unchanged — r2 initially rated C-6 a BLOCKER and stands down: r1's "blast radius today is zero" argument is the better-disciplined reading for a surface with no consumers. |
| INBOX **O-15 / PT-07** (`.parse()` failure indistinguishable; 5/5 non-string `TypeError`) | **CONFIRMED and then EXTENDED.** 5/5 non-string throws reproduced through `jsonParser` and `csvParser`. C-11 adds the type-level half. **C-17 corrects the stated scope**: the failure value is not always `undefined` — it can be a truthy, wrongly-typed array. |
| INBOX **O-15 / PT-01** (label is a no-op unless diagnostics armed; arming drags `console.error`) | **Respected, not re-run.** C-13 measures the shipping default only; diagnostics were never armed in either revision. |
| INBOX **O-15 / PT-03** (`PACKRAT_ARMED` one-way latch) | **Untouched by construction** — `memoize()` never called; the module contains zero `memoize` (consistent with `parser-band.md:108` *"zero memoize"*). Recorded as compliance with **O-8**, §6. |
| INBOX **O-15 / PT-04** (lazy depth 7,761 → `RangeError`) | **EXTENDED with a module-specific measurement** — C-18. PT-04's generic figure is **not re-derived** (epoch rule respected); `jsonParser` is a different parser and its own ceiling had never been taken. r1's decision not to count it is named and departed from, with the reason. |
| `parsethat-surface-gaps.mjs` **DEBT-1 / GUARD** rows | **CONFIRMED at this module** — C-13, C-11, C-17; plus the runnability finding (§6). |
| `registry/adjudicated/parser-band.md:97,141` (non-finite; cand-F's sole correctness debit) | **Extended**: C-9 shows `numberParser` ships that debit (`1e400` → `Infinity`) in the *published* utility, one layer below the grammars the band adjudicated. |
| `parser-band.md:108` (idiom: single-token regex terminals · `dispatch` narrowing · `parseState`+`isError` never `parse()` truthiness) | **Cited both ways** — S-2/S-3 award the module its idiom credit; C-8 convicts `json-vectors.test.ts:29` of the forbidden entry idiom. |
| `parser-band.md:116-118` (debts 1, 2, 3) | Debt 1 → C-13. Debt 2 → S-3's keep-verdict on the head-dispatch pattern. **Debt 3 → C-18**, which is where the debt is largest and had not been measured. |
| **X·P W2.md** §2c, §3 scope, §3b (COMP-1/O-8/EQ-1..6/capability families), §3c (AC-1..AC-4 falsifiers), §3d (the shared slice), "Not in scope" | The whole of §5. |
| **X·P W1.md** (G-1, the 52 derived by script) | 52 = 33 + 19 **re-derived independently in r2** from `value.js/src/subpaths/css.ts` — matches. |
| **X·V W9.md:373** (G31: deps RED, parse-that absent) | **Re-confirmed this session**, §0 row 1. |
| `parse-that/docs/tranches/A/A.md:214` + `A.W3.md:320` (*"Keep jsonParser, csvParser, escapedString, quotedString, numberParser"*) | **CONTRADICTED, explicitly and narrowly** — C-4. The keep-ruling predates the parser band and PLAW-BIND; A.md's own zero-consumer reasoning for the CSS cut applies verbatim to these five and was not extended. Contradiction is on the consumption axis only; nothing here disturbs A's CSS-excision ruling, which S-4 finds true and gated. |

---

## 8. Adjudicated disagreements between the two revisions

Two places where r2's independent probe and r1's record could conflict. Both resolved against the
tree, in the open.

**(a) `quotedString("\\")` — r1 says build-time `SyntaxError`; my first r2 probe said `isError=true`.
r1 is RIGHT; my probe was wrong.** My initial probe ran through a shell heredoc-free `node -e` whose
quoting collapsed to a **two-character** quote (`\\`), not one backslash. Re-run from a scratchpad
`.mjs` file with unambiguous literals: `quotedString("\\")` → **`SyntaxError: Invalid regular
expression: /[^\\\]+/: Unterminated character class`, thrown at build time**; `quotedString("\\\\")`
(genuinely two chars) → builds, `isError=true` on its own input. Both behaviours are real; they are
different calls. C-10 carries r1's row verbatim, and r2 adds only the empty-quote row. Recorded
because a mis-quoted probe that silently agrees with a weaker conclusion is exactly the failure L-19
warns about.

**(b) `.parse()` failure shape — r1 measured `undefined`; r2 measured `["unterminated"]`. Both are
right; the inputs differ by one byte.** r1 probed `quotedString().parse("unterminated")` (no opening
quote → the `wrap` prefix fails → nothing assigned → `undefined`). r2 probed
`quotedString().parse('"unterminated')` (opening quote consumed → `many()` accumulates → the closing
quote fails → the accumulator is still in `state.value`). Not a contradiction: two failure sites, two
shapes. Filed as **C-17**, which is why the finding is "PT-07 is understated" rather than "PT-07 is
wrong".

---

## 9. Method and bounds

Read whole (read-only, main checkout): the 4 module files; `src/parse/index.ts`, `parser.ts`,
`leaf.ts`, `state.ts`, `utils.ts`, `lazy.ts`, `split.ts`, `packrat.ts`, `core.ts`, `diagnostics.ts`,
`utils-entry.ts`, `packrat-entry.ts`; `package.json`, `tsconfig.json`, `README.md`, `docs/api.md`,
`docs/playground/leaf-parsers.md`, `typescript/CLAUDE.md`; `test/{json,csv,json-vectors,
validate-parsers,dist-surface}.test.ts`, `test/{manifest,subpath}-gate.mjs`,
`scripts/proof-no-dead-combinator.mjs`; `dist/{index,utils-entry,core,diagnostics}.d.ts`,
`dist/parsers/*.d.ts`, and the built `dist/{parse.js,parse.cjs,utils.js,core.js}`. value.js
read-only: `package.json`, `src/subpaths/css.ts`, `src/css/index.ts`, `src/css/grammar.ts`,
`docs/tranches/X/parse-that/waves/W2.md`, `docs/tranches/X/parse-that/waves/W4.md`,
`docs/tranches/X/waves/W9.md`, `docs/tranches/V/megatranche/registry/adjudicated/parser-band.md`,
`docs/tranches/V/coordination/INBOX.md` (O-15),
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`.

Probes ran from the session scratchpad against the **built dist** by absolute path (`dist/parse.js`,
`dist/utils.js`, `dist/parse.cjs`). `tsc` invoked from value.js's `node_modules` against a scratchpad
`tsconfig.json`. **Zero writes inside `/Users/mkbabb/Programming/parse-that`**; `.worktrees/`, frozen
roots, and `~/Documents/Codex` never entered. `enableDiagnostics()` and `memoize()` were never called
— the one-way latches remain unarmed. No browser tooling. No benchmark of any kind: **no timing claim
appears in this document**, in either revision.

**Bounds.** All measurements are N=1 machine, one node version (v26.0.0), against the dist present in
the read-only checkout — which is **not** verified byte-identical to the published npm tarball (the
band recorded a dist-drift caveat at `parser-band.md:132` for value.js; the analogous check was not
performed for parse-that here). Every defect is a **structural** claim readable in source
(`json.ts`/`csv.ts`/`utils.ts`/`index.ts` line-cited) with the dist run as corroboration, so a tarball
delta would change the corroboration, not the finding. Specifically bounded: C-16 is latent, not live.
S-1's "remove the guard and it hangs" half is structural, not executed. S-5 is a build-output property,
re-earned on every build-config change and asserted by no gate. C-18's *ordinal* claim is
stack-frame-size dependent; its *categorical* claim (thrown `RangeError`, not `ok:false`) is not. Two
claims rest on simulation rather than mutation of the read-only tree — C-6's falsifier (the gate's
`namedExports()` re-run verbatim over the real source in scratchpad) and C-8's (`grep` census, not a
mutation run); both are stated as such.
