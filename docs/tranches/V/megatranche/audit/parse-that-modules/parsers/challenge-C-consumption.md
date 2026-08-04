**SERVED MODEL ID: `claude-opus-5[1m]`** (Opus 5, 1M context) — solo seat, no subagent. Session 2026-08-04, node v26.0.0, darwin arm64.

# CHALLENGE C — `parsers/` on the CONSUMPTION axis

**Subject**: `@mkbabb/parse-that` module `typescript/src/parse/parsers/` — 103 lines across 4 files
(`index.ts` 8 · `json.ts` 52 · `csv.ts` 20 · `utils.ts` 23), read whole at `ef10d5b` (main checkout,
read-only). Every import read read-only: `src/parse/index.ts`, `parser.ts`, `leaf.ts`, `state.ts`,
`utils.ts`, `lazy.ts`, `split.ts`, `packrat.ts`, and the three sibling entries `core.ts` /
`diagnostics.ts` / `utils-entry.ts`. Consume-edge tree read read-only: `value.js@4.0.0`
`src/css/**` + `package.json`.

**Posture**: DEFECTIVE until the tree proves otherwise. Every claim below carries severity,
`file:line` provenance, and its own falsifier. Superlatives carry falsifiers too (L-18 runs both
ways). Measurements are against the **built `dist/`** in the read-only checkout (the shipped
artifact a consumer actually gets) via probes in this session's scratchpad — **no write of any kind
inside `/Users/mkbabb/Programming/parse-that`**, no browser tooling, no bench that arms diagnostics
or `memoize()` (the PT-03 latch is one-way and was never touched: `enableDiagnostics` and
`memoize` were never called in any probe).

**LAW CHECK — clean.** `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` →
`No such file or directory` (re-verified this session). **No STOP finding.** The fresh root remains
absent, as W2.md:9-12 requires at authoring time.

**Ledger**: **16 defects — 3 BLOCKER · 7 MAJOR · 6 MINOR — and 4 superlatives.**

---

## 0. The consumption edge, measured

The routing law (`W2.md:133`, PLAW-BIND) makes value.js the sole downstream: *parser → value (X·V
L1/L5 surfaces) → packed release → consumers; direct parse-that→fourier FORBIDDEN.* So the axis
question is exact: **what does value.js consume from this module?**

| edge | measured | receipt |
|---|---|---|
| `@mkbabb/parse-that` in value.js `dependencies` | **absent** | `value.js/package.json` — deps are exactly `@mkbabb/glass-ui ^7.0.0`, `@mkbabb/keyframes.js ^6.0.0`; not in `devDependencies` either |
| `parse-that` imports in value.js `src/` `demo/` `test/` | **0** | `grep -rn "parse-that" src/ demo/ test/` → no matches |
| this module's 5 exports referenced anywhere in value.js | **0** | same grep, plus name-by-name |
| keyframes.js (the next hop) | **declares itself parse-that-FREE** | `keyframes.js/src/animation/internal/leaves.ts:9-10` — *"The subpath is `parse-that`-FREE (… 0 parse-that … modules — VERIFIED"* |
| inside parse-that itself | **1 of 5 names, in 1 test** | `typescript/test/json-vectors.test.ts:8,28` (`jsonParser` only) |
| the frozen 52-export `/css` universe (W2.md:146-148: 19 runtime `src/css/index.ts:36-60` + 33 types `:1-35`; re-counted here = 33 + 19 = **52** ✓) | **∅ overlap, both directions** | no `/css` export is served by, wraps, or names `jsonParser`/`csvParser`/`escapedString`/`quotedString`/`numberParser`; no export of this module appears in `src/css/index.ts` |

**The consumption axis has a zero on it.** Everything below is therefore about a *published
surface with no consumer* — which raises, not lowers, the bar: an unconsumed export cannot be
defended by "it works for its user," and its defects are pure semver liability plus a false
affordance for the next consumer who reaches for it.

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

Both are **`Parser` instances, not functions**: `json.ts:52` `export const jsonParser = jsonValue.trim();`
· `csv.ts:20` `export const csvParser = line.many();`. Shipped as such:
`dist/parsers/json.d.ts:5` `export declare const jsonParser: Parser<any>;` ·
`dist/parsers/csv.d.ts:2` `export declare const csvParser: Parser<string[][]>;`.

MEASURED (dist `parse.js`): `typeof jsonParser` → `object` · `typeof csvParser` → `object` ·
calling either → `TypeError: … is not a function`.

A consumer who follows the README's Domain-Parsers block crashes on the first line. This is the
package's front-door quickstart, and it has been wrong across the 1.0.0 cut.

*Falsifier*: `typeof (await import("@mkbabb/parse-that")).jsonParser === "function"` — measured
`"object"`. Or: a compiling `.d.ts` signature `jsonParser(): Parser<JsonValue>` in `dist/` — the
shipped one is a `const`.

*Note*: `docs/api.md` is stale in a second, adjacent way — `:222` still documents
`takeUntilAnySpan(excluded: string): Parser<Span>`, one of the 15 `*Span` builders **excised at
1.0.0** (`src/parse/index.ts:10-12`; gate `proof:no-span-surface`, `package.json` scripts). Cited
as context, not counted as a defect of this module.

### C-2 — BLOCKER — `csvParser` fails both of its documented contracts and silently destroys data

Two contracts are asserted: `README.md:37` *"RFC 4180"* and `docs/api.md:237` *"RFC 4180 CSV
parser. Handles quoted fields with escaped double-quotes."* The grammar is
`csv.ts:11-20` — `token = any(regex(/[^"]+/).wrap(dq,dq), regex(/[^']+/).wrap(sq,sq), regex(/[^,]+/))`,
`line = token.sepBy(delim).trim()`, `csvParser = line.many()`.

MEASURED against the shipped dist:

| input | result | RFC 4180 requires |
|---|---|---|
| `a,b,c\n1,2,3` (the README's own example) | `[["a","b","c\n1","2","3"]]` | two records |
| `a,b\r\nc,d` (CRLF, §2.1) | `[["a","b\r\nc","d"]]` | two records |
| `a,"b""c",d` (§2.7 doubled-quote escape) | `[["a","b"],["c","d"]]` | one record, field 2 = `b"c` |
| `a,,b` (empty field, §2.4) | `[["a"]]` | three fields |
| `""` (empty quoted field) | `[["\"\""]]` | one empty field |
| `!!!` | `isError=false`, `[["!!!"]]` | — |
| `` (empty input) | `[]`, `isError=false` | — |

Three distinct failures, each silent:

1. **No record separator exists.** `csv.ts:14` `regex(/[^,]+/)` — the negated class excludes only
   the comma, so `\n` and `\r\n` are ordinary field characters. The parser has no concept of a row
   boundary; `many()` iterates only because `sepBy` bails, and the whole document collapses to one
   row. The README's own example demonstrates the bug.
2. **The RFC's escape mechanism produces phantom records and drops a byte.** `a,"b""c",d` →
   **two** rows; the `""` is read as an empty-quoted-field boundary, the record splits, and the
   escaped `"` never appears in any output field.
3. **Empty fields truncate the record.** `sepBy` (`parser.ts:594-611`) backtracks past a separator
   whose following element fails or consumes zero, so `a,,b` yields `["a"]` — `b` is discarded
   with no error signal.

And it can never reject: `line.many()` with `min=0` over `sepBy(…, min=0)` means every string,
including garbage, is a success. `csvParser` is *total* in the useless direction — it always
returns, and what it returns is frequently wrong.

*Falsifier*: any input on which shipped `csvParser` agrees with RFC 4180 on record splitting.
`a,b\n c,d` → `[["a","b\n c","d"]]`; no newline handling exists anywhere in `csv.ts` to find.
A single `regex(/\r?\n/)` record separator would refute the first row; the file has none.

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
`.skip()` (`parser.ts:189-207`) **discards its argument's value by construction** — the four hex
digits are consumed and thrown away, and the `u` arm returns the literal `"u"`.

MEASURED: `escapedString().parse("\\n")` → `"n"` (not a newline) · `escapedString().parse("\\u0041")`
→ `"u"` (not `"A"`, not `"\\u0041"` — the codepoint is **gone**) · `escapedString().parse('\\"')` → `"\""`
(the one arm that happens to round-trip).

`quotedString` (`utils.ts:15-18`) joins these parts, so the loss propagates into a *silently
mangled string*, not an error: `quotedString().parse('"a\\nb"')` → **`"anb"`** ·
`quotedString().parse('"a\\u0041b"')` → **`"aub"`**.

This is the worst failure class available: a wrong answer with `isError=false`. A consumer parsing
`"line1\nline2"` receives `line1nline2` and has no signal that anything happened.

*Falsifier*: `escapedString().parse("\\n") === "\n"` would refute — measured `"n"`. Or: any code
path in `utils.ts` mapping the escape letter to its codepoint (a lookup table, `JSON.parse`,
`String.fromCharCode(parseInt(hex,16))`) — `utils.ts` is 23 lines and contains none.

Note the contrast one file over: `json.ts:22-24` **does** decode correctly
(`s.indexOf("\\") === -1 ? s.slice(1,-1) : JSON.parse(s)`, verified in S-2 below). The module
contains a correct escape decoder and a broken one, and exports the broken one as the reusable
utility.

---

## 2. MAJOR

### C-4 — MAJOR — zero consumers anywhere in the constellation; dead by parse-that's own precept

This is the axis's central finding, and the tree states the precept itself.
`typescript/scripts/proof-no-dead-combinator.mjs:9-11`:

> *"A never-importable export is not part of the public contract; an export born one prior tranche
> with zero workspace consumers is dead by the precept."*

Applying that precept to this module, with §0's table as the measurement: **0 consumers in value.js
(no dependency, no import), 0 in keyframes.js (self-declared parse-that-free), 1 of 5 names in 1
parse-that test.** The module is 5 of the root barrel's **34** runtime exports — **15% of the
package's front door** — serving nothing.

The gate exempts it only by accident of scope: `proof-no-dead-combinator.mjs:29-32` hardcodes a
`banned` list of exactly two names (`thenMap`, `fuse`). The precept is general; the enforcement is
a two-row allowlist inversion.

**Contradicting a prior ruling, explicitly.** `parse-that/docs/tranches/A/A.md:214` ruled *"Keep
`jsonParser`, `csvParser`, `escapedString`, `quotedString`, `numberParser`"* and `A.W3.md:320`
confirmed them as re-exported from `.` and their own subpath. I contradict that ruling **on the
consumption axis only**: it was made during the CSS-excision cut, before the parser-band
adjudication (`registry/adjudicated/parser-band.md`) and before PLAW-BIND named value.js the sole
downstream. A.md's own §S1-S7 reasoning for the CSS cut — zero consumers after excision, semver
contraction accepted — applies verbatim to these five and was simply not extended to them. The
1.0.0 cut then *did* apply it to the 15 `*Span` builders (`index.ts:10-12`: *"a zero-consumer
surface"*), with a gate. The precedent, the mechanism, and the precept are all in-tree; only these
five were skipped.

*Falsifier*: one production import of any of the five outside parse-that's own `test/`. Searched:
value.js (`src/`, `demo/`, `test/`, `package.json`), keyframes.js (`src/`, `package.json`),
parse-that (`src/`, `test/`, `scripts/`, `docs/`). The only non-doc, non-self hits are
`README.md:34`, `docs/api.md:230-249`, `docs/playground/leaf-parsers.md:122-145` — all
documentation, and all three show the C-1 broken call form.

### C-5 — MAJOR — `Parser<any>` ships; `JsonValue` types nothing; strict `tsc` proves full infectiousness

`json.ts:39-40` carries an eslint suppression and the escape hatch:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonValue: Parser<any> = dispatch({ … });
```
and it reaches the shipped declaration verbatim: `dist/parsers/json.d.ts:5`
`export declare const jsonParser: Parser<any>;`.

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
→ **exit 0, zero diagnostics.** The `any` is not contained; it flows into consumer code and
disables checking at every use site. A codebase with `strict` + `noImplicitAny` loses those
guarantees the moment it touches `jsonParser`.

*Falsifier*: any of the four lines producing a `tsc --strict` error. Measured exit 0 with an empty
diagnostic file. (Control: adding `n.toFixed ? 1 : 2` *does* error `TS2774`, proving the compiler
was running and the config live.)

### C-6 — MAJOR — the module's 5 root exports are invisible to the publish-discipline gate

`test/dist-surface.test.ts` exists precisely to bite source↔dist export drift; its own header
(`:6-12`) cites the scar: *"The shipped 0.8.2 dist exported only 8 of the 15 span fns (a silent
source↔dist version-drift defect: `import { altSpan }` from the pinned dist hit a runtime
`undefined`, and the version number lied about it)."*

Its extractor, `namedExports()` (`dist-surface.test.ts:20-34`), matches **only**
`/export\s*\{([^}]*)\}/g`. The module reaches the root barrel through
`src/parse/index.ts:14` — `export * from "./parsers/index.js";` — a form the regex cannot see.

MEASURED (the gate's own `namedExports()` re-run verbatim over `src/parse/index.ts`): **29 names
seen; `jsonParser` false · `csvParser` false · `escapedString` false · `quotedString` false ·
`numberParser` false**; control `dispatch` → **true**. So five of the root's runtime exports sit
entirely outside the gate that exists to protect the root's runtime exports.

*Falsifier*: delete `export { csvParser } from "./csv.js";` from `parsers/index.ts`. The gate's
`srcNames` set is unchanged (it never contained it) → `missing` is `[]` → **GREEN**, while
`import { csvParser } from "@mkbabb/parse-that"` becomes `undefined` for every consumer. Exactly the
0.8.2 drift the gate was built to catch, reproduced in the one construct it cannot read. (Simulated
against a copy of the gate's function in scratchpad; **no write to parse-that**.)

### C-7 — MAJOR — `./utils`, the tier that homes this module, has no surface assertion

`package.json` `exports` declares four subpaths; `test/subpath-gate.mjs:26` iterates
`["./core", "./diagnostics", "./packrat", "./utils"]` but only checks **file existence** per field
(`:27-35`). It then resolves and loads exactly two (`:38-41`) and asserts three symbols
(`:44-51`: `core.Parser`, `core.dispatch`, `packrat.memoize`). Its GREEN message (`:53-56`) names
only `./core{Parser,dispatch} + ./packrat{memoize}`.

So `@mkbabb/parse-that/utils` — whose entire reason to exist is *"the json/csv domain-parser
showcases and the string utility parsers"* (`utils-entry.ts:3-5`) — has **no runtime surface
assertion anywhere in the proof suite**.

*Falsifier*: repoint `exports["./utils"].import` at `dist/core.js`. Every existence check still
passes, no symbol from the utils tier is loaded or asserted, and `proof:subpath` prints GREEN while
`import { jsonParser } from "@mkbabb/parse-that/utils"` resolves to `undefined`.

### C-8 — MAJOR — the shipped bindings are untested; the tests certify a fork

`grep -rln "csvParser|escapedString|quotedString|numberParser" typescript/test/` → **no matches**.
Four of five exports have **zero tests**.

What the suite actually does is worse than absence:

- `test/csv.test.ts:1-16` **re-declares** the CSV grammar inline from `../src/parse` primitives —
  near-byte-identical to `csv.ts:5-20` — and its 79 lines of assertions never touch `csvParser`.
- `test/json.test.ts:1-25` re-declares a **different, older** JSON grammar:
  `jsonNumber = regex(/-?(0|[1-9]\d*)(\.\d+)?/)` (**no exponent** — `json.ts:21` has one),
  `jsonString = stringChar.many().wrap(…)` (**no escape handling** — `json.ts:22-24` has the
  `JSON.parse` fast/slow path), `any(...)` instead of `dispatch(...)` (`json.ts:40`). 105 lines of
  JSON assertions certify a grammar that is not shipped.
- `test/json-vectors.test.ts` (33 lines total) is the **only** file importing a shipped binding
  (`:8`, `jsonParser`). Its single assertion is `:29` `expect(result).not.toBeUndefined();` — no
  value check, and it uses `.parse()` undefined-ness as the success signal, the exact idiom the
  parser-band forbids (`parser-band.md:108`: *"entry via `parseState` + `isError`, never `parse()`
  truthiness"*) and that INBOX **O-15 PT-07** names as indistinguishable.
- The negative arm exists **on disk and is never read**: `grammar/tests/json/invalid.jsonl` is 7
  lines (`{key: "value"}`, `[1 2 3]`, `[}`, …); `json-vectors.test.ts:23` reads only
  `valid.jsonl`; `grep -n invalid test/json-vectors.test.ts` → no match.

*Falsifier*: corrupt `parsers/csv.ts` arbitrarily (e.g. swap the `,` delimiter for `;`) and run
`npm test` — no test imports it, so the suite stays green. Or: point `json-vectors.test.ts` at
`invalid.jsonl` with an `isError` expectation and observe whether it passes — it is not wired, so
the question has never been asked.

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
leading `.`, no finite guard.

MEASURED, side by side:

| token | CSS `<number>` (css-syntax §4.3.12) | value.js `numberToken` | parse-that `numberParser` |
|---|---|---|---|
| `+1` | valid | `1` | **isError, consumed 0/2** |
| `.5` | valid | `0.5` | **isError, consumed 0/2** |
| `-.5` | valid | `-0.5` | **isError, consumed 0/3** |
| `+.5e-2` | valid | `0.005` | **isError, consumed 0/6** |
| `1.` | valid | `1` | `1`, **consumed 1/2** (silent prefix) |
| `01` | valid (`1`) | `1` | **`0`, consumed 1/2** (silent prefix, wrong value) |
| `1e400` | overflow → `null` | **`null`** | **`Infinity`** |
| `0x10` | invalid | `null` | **`0`, consumed 1/4** |

Four legal CSS numbers rejected outright, three silently prefix-accepted with a wrong value, and
`Infinity` admitted into the value stream. That last one is not a taste call: it is the exact class
the parser band adjudicated **against** — `parser-band.md:97` records `lab(50 1e400 0)` admitting
`a=∞` as *"cand-F's sole adjudicated correctness debit"*, and `:141` preserves the non-finite
DISSENT with cand-F's unclamped pass-through **rejected**. `numberParser` ships that debit.

Adopting `numberParser` into the `/css` grammar would regress `parseCssValue`/`parseCssScalar`
(two of the frozen 19 runtime exports) on eight measured token classes. The export that looks most
reusable by the sole downstream is the one that must not be reused.

*Falsifier*: `numberParser().parse(".5") === 0.5` would refute — measured `undefined`,
`isError=true`, `offset 0`. Or `numberParser().parseState("01").offset === 2` — measured `1`.

### C-10 — MAJOR — `quotedString(quote)` interpolates its parameter unescaped into a character class

`utils.ts:16`: ``const inner = regex(new RegExp(`[^${quote}\\\\]+`)).or(escapedString());``
The signature is `quotedString(quote?: string)` (`dist/parsers/utils.d.ts`) — an arbitrary string,
placed raw inside `[^…]`.

MEASURED:

| call | outcome |
|---|---|
| `quotedString("\\")` | **`SyntaxError: Invalid regular expression: /[^\\\]+/: Unterminated character class` — thrown at BUILD time**, before any input exists |
| `quotedString("]")` | builds a **silently different grammar** (`[^]\]+` = "any char, then one-or-more `]`"); `parse("]ab]")` → `isError=true, offset 0` — it rejects its own well-formed input |
| `quotedString("^")` / `("-")` / `("\|")` / `(".")` | accept, but only because the metachar lands in a position where it degrades benignly |
| `quotedString("ab")` (multi-char) | builds `[^ab\\]+`; `parse("abXab")` → `"X"` — accidentally right for the wrong reason (it now excludes `a` and `b` from field content) |

A caller doing `quotedString(userDelimiter)` gets a build-time throw, a wrong grammar, or a right
answer, with no way to tell which from the signature.

*Falsifier*: one escaping step — `quote.replace(/[\\\]^-]/g, "\\$&")` — would make
`quotedString("]").parse("]ab]")` return `"ab"`. `utils.ts` performs no escaping and the parameter
appears in exactly one place (`:16`).

---

## 3. MINOR

### C-11 — MINOR — `.parse()`'s declared return type lies; the module hands consumers three of them (PT-07 at module altitude)

`parser.ts:77-79` — `parse(val) { return this.parseState(val).value; }` — is typed to `T`, and
returns `undefined` on failure. INBOX **O-15 PT-07** names this at the library level (*".parse()
returns `undefined` on failure (indistinguishable from a successful `undefined`)"*) and the
value-side cure is a named JS-boundary invariant **above** parse-that. This module is where the
type-lie becomes *load-bearing for a consumer*, because all three of its factory exports are
handed out as `Parser<T>` with `T` non-nullable.

MEASURED — `tsc --strict --noEmit`, **exit 0, zero diagnostics** on:
```ts
export const n: number = numberParser().parse("+1");            // runtime: undefined
export const s: string = quotedString().parse("unterminated");  // runtime: undefined
export const e: string = escapedString().parse("no backslash"); // runtime: undefined
```
All three runtime values confirmed `undefined` in the same session. A strict consumer gets three
non-nullable bindings holding `undefined`.

*Falsifier*: `parse(): T | undefined` in `dist/parser.d.ts` would refute — it is `T`. Or any of the
three assignments erroring under `--strict` — exit 0, empty diagnostics.

### C-12 — MINOR — mixed lifecycle: two shared mutable singletons among three factories

`jsonParser` (`json.ts:52`) and `csvParser` (`csv.ts:20`) are module-level constants — one instance
per process, shared by every consumer. `escapedString`/`quotedString`/`numberParser`
(`utils.ts:7,15,21`) are factories returning fresh parsers (measured: `escapedString() !==
escapedString()` → `true`).

`Parser` carries a **public mutable** `state` field (`parser.ts:26` `state: ParserState<T> |
undefined;`), assigned on every parse (`:66` error branch, `:70` success branch). MEASURED: after
consumer A parses `{"a":1}` successfully, `jsonParser.state.isError === false`; after consumer B
parses `@@@`, `jsonParser.state.isError === true` — **for both consumers**, process-globally,
last-writer-wins.

`.parse()`'s *return* is unaffected (it reads the fresh local state). The hazard is `.state` — which
is the **only channel a caller has for a failure reason**, since `.parse()` gives `undefined`
(C-11) and `expected` is empty (C-13). The one diagnostic surface the module leaves open is the one
it shares globally.

*Falsifier*: making `jsonParser` a factory (as the docs already claim it is — C-1) removes the
sharing entirely; the three sibling exports in the same 103-line module already do this.

### C-13 — MINOR — DEBT-1 lands here: every failure class yields an empty `expected` set

`parser-band.md:116` (binding on the wave): *"**Labelled failure diagnostics.** … `expected:
["<named-color>"]` beats `(?!)`. This is the single clearest thing cand-F does better."*
`parsethat-surface-gaps.mjs` RED row: `DEBT-1 Parser.prototype.label / .expected combinator —
absent`.

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

The module is the package's flagship demonstration of `dispatch()` (`json.ts:38-49`), and a
`dispatch` miss produces **no expectation at all** — not an opaque one, none. A consumer's only
available error message is a `furthest` integer. `furthest` is at least correct and non-trivial
(1, 2, 4 for the three structural failures), which is why this is MINOR rather than MAJOR.

*Falsifier*: any non-`undefined` `expected` array from `jsonParser.parseState(x)` with diagnostics
off. Six failure classes probed, all `undefined`.

### C-14 — MINOR — no `.eof()` anywhere; prefix parsers presented as document parsers

`parser.ts:637` provides `.eof()`. Neither `json.ts`, `csv.ts`, nor `utils.ts` calls it, so every
export accepts a **prefix** and discards the tail without signal.

MEASURED: `jsonParser.parse('{"a":1} GARBAGE')` → `{"a":1}` · `jsonParser.parse("1 2 3")` → `1` ·
`jsonParser.parse("nullx")` → `null` · `numberParser().parse("0x10")` → `0`. Meanwhile
`docs/api.md:230` says *"Combinator-based JSON parser"* and `README.md:36` passes a complete
document.

*Falsifier*: `jsonParser.eof().parseState('{"a":1} GARBAGE').isError` → `true`. The method exists
one file up; the module simply never composes it.

### C-15 — MINOR — an undeclared JSON conformance divergence from `JSON.parse`

`json.ts:22` — `regex(/"(?:[^"\\]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/)` — the negated class
`[^"\\]` admits raw control characters, which RFC 8259 §7 forbids inside a string.

MEASURED with the input `"<U+0001>"` — a three-character string: a quote, the **raw**
control character U+0001, a quote (constructed as `'"' + String.fromCharCode(1) + '"'`, **not**
the six-character escape sequence): `jsonParser.parseState(input).isError` → **`false`** (accepts);
`JSON.parse(input)` → **throws** (rejects). Checked as parity, no divergence found: `1e400` → `Infinity` (both),
`123456789012345678901234567890` → `1.2345678901234568e+29` (both), `"\/"` → `"/"` (both),
`{"a":1,"a":2}` → `{a:2}` (both), `{"a":1,}` and `[1,2,]` rejected (both).

One divergence out of six probed classes, undeclared in `docs/api.md:230-233`. The corpus that
would have caught it (`grammar/tests/json/invalid.jsonl`) is unread — see C-8.

*Falsifier*: that same U+0001 input returning `isError === true` would refute — measured `false`.

### C-16 — MINOR — circular import with the root barrel, plus two dead `Parser` imports

All three implementation files import the **root barrel**: `json.ts:5`, `csv.ts:5`, `utils.ts:4` —
`from "../index.js"`. And `src/parse/index.ts:14` is `export * from "./parsers/index.js";`. Every
file in the module is in a cycle with the package root, while executing module-level initializers
(`json.ts:15-49`, `csv.ts:7-17`) *during* that cycle.

Two of the three imports are also **dead**: `csv.ts:5` `import { regex, any, string, Parser }` —
`Parser` is never referenced in the file's 20 lines; `utils.ts:4` `import { regex, string, Parser }`
— same. Only `json.ts` uses `Parser` (`:25,:28,:40`, via `Parser.lazy`).

The tree already knows the barrel path is wrong: `utils-entry.ts:7-13` deliberately imports the
leaf modules directly (`./parsers/json.js`, `./parsers/csv.js`, `./parsers/utils.js`) rather than
going through `../index.js`.

MINOR because it is **latent, not live** — the bundler flattens it and `import(dist/parse.js)`
succeeds today. It becomes live under module reordering, and X.P.W2 §5.i graduates a survivor's
slice into `<p2>/typescript/src/css/**` (W2.md:180-183), i.e. re-treads exactly this edge in a
fresh root.

*Falsifier*: the cycle is refuted by inspection if `index.ts:14` is not a re-export of the module
that imports it — it is (`index.ts:14` ↔ `json.ts:5`). The cure is one line per file: import from
`../leaf.js` / `../parser.js`, which is what `core.ts:7-25` already re-exports and which drops both
dead `Parser` imports at the same time.

---

## 4. SUPERLATIVES (L-18 — the tree gets its due, with falsifiers)

### S-1 — `many()`'s zero-width guard defuses the footgun `csvParser` walks straight into

`csvParser = line.many()` where `line = token.sepBy(delim).trim()` and `sepBy`'s `min` defaults to
`0` (`parser.ts:569`) — i.e. `line` can succeed consuming nothing. `many()` over a nullable parser
is the canonical combinator hang. `parser.ts:539` — `if (state.offset === savedOffset) break;` —
kills it by construction, and `sepBy` carries the same guard at `:601` and `:611`.

MEASURED: `csvParser.parse("")` returns `[]` in finite time; `csvParser.parse("!!!")` returns
promptly. The core protects a composition the module did not think about.

*Falsifier*: remove `parser.ts:539` and `csvParser.parse("")` hangs. This is a real, load-bearing
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

*Falsifier*: any input where the fast path and `JSON.parse` disagree. Probed the backslash-free
path, the `\/` path, the surrogate path, and the prototype path — no disagreement found. (This
also makes C-3 sharper, not softer: the module contains a correct decoder and exports the broken
one.)

### S-3 — the `dispatch` table is the canonical idiom, and this module is its only in-tree witness

`json.ts:38-49` builds a genuine first-character dispatch table
(`{"{":…, "[":…, '"':…, "-":…, "0-9":…, "t":…, "f":…, "n":…}`) — real O(1) branching, not
sequential `any()`. `parser-band.md:108` names *"two-level `dispatch` narrowing"* among the shared
virtues of both adjudicated candidates, and W2's AC-2/AC-3 both need a head-dispatch witness
(`W2.md` §3c, the head-dispatch/early-commitment mechanism debt 2 cites). `test/json.test.ts:1-25`
uses `any()` — so the shipped module is the *better* of the two grammars in the repo on exactly the
axis the band ruled canonical.

*Falsifier*: if `dispatch` were sugar over sequential alternation, the empty `expected` set of C-13
would not occur (an `any()` chain merges each arm's expectation). The absence of expectations is
itself evidence the table is real — the superlative and the defect share a receipt.

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
and `dist/utils-entry.d.ts` carry no `cssParser`/`specificity`/`parseSingleValue`, and the root
export census is 34 names with none CSS-shaped. The comment is true.

---

## 5. The X·P dual-target algebra reading — keep / wrap / retire

W2's binding constraints, applied:

- **W2.md:146-155** — the closed input universe **is** the frozen 52-export `/css` surface, and *"no
  candidate is evaluated on any corpus that is not a declared subset of this universe plus the
  adjudicated fixtures."*
- **W2.md:188-191** — the only parse-that-side citizens W2 admits are **scan primitives**
  (`typescript/src/**`, branch-isolated); *"Value continues to own only the grammar, recovery
  policy, and consumers."*
- **W2.md:193-196** — Not in scope: *"adopting a parser into value.js; adding `@mkbabb/parse-that`
  to `package.json`."* The consumption edge stays **zero through W2 by construction**.
- **W2.md §3c** — every live candidate must host *"the band's adjudicated grammar substance (spec
  table, labelled failures, hue unwrapped at parse time, §8.1/§4.2 clamps)"*; discarding a band
  adjudication *"is a defect, not a design choice."*
- **W2.md:158-161** — debt clauses bind: labelled zero-width failures over opaque failure; the
  reject path as its own measured leg; recursion bounded by construction; `(value * num) / den`.

| export | verdict | why, from the tree |
|---|---|---|
| `jsonParser` | **RETIRE** | 0 of 52; not a scan primitive; W2's deliverable is a kill ledger, not a showcase. Carries C-5's `Parser<any>` into any inheritance. |
| `csvParser` | **RETIRE** | Same, plus C-2: it would enter the fresh root as a known-wrong grammar under a false RFC claim. |
| `JsonValue` | **RETIRE** | Types nothing (C-5). A type export with no typed value is pure surface. |
| `numberParser` | **RETIRE-AND-REPLACE** | The one apparent overlap with the 52, and measurably wrong for it (C-9). Its `Infinity` admission is the class `parser-band.md:97,141` ruled against. The replacement already exists and is correct: `value.js/src/css/grammar.ts:129-132`. |
| `quotedString` | **RETIRE-AND-REPLACE** | CSS `<string>` needs css-syntax §4.3.7 escapes (1–6 hex digits + optional trailing whitespace); this handles exactly 4 and discards them (C-3), and its parameter is injectable (C-10). |
| `escapedString` | **RETIRE-AND-REPLACE** | Same root cause; `.skip()` loses the payload by construction (`utils.ts:10`). |
| the `dispatch` head-table **pattern** (`json.ts:38-49`) | **KEEP — as an internal fixture, not a public export** | S-3. AC-2/AC-3 need a head-dispatch witness and debt 2 names head-dispatch ordering as the reject-path knob (`parser-band.md:117`). Keep the pattern; demote the export. |
| **anything WRAP-able** | **none** | Stated deliberately. A wrap verdict would be the comfortable answer and the tree does not support it: every defect above (C-2, C-3, C-9, C-10) is **in the grammar**, not the packaging. No adapter recovers a record separator that was never parsed or four hex digits that were never captured. |

**The honest cut, and its semver shape.** Excising the five is a **major** bump from both `.` and
`./utils`. The precedent is in-tree and one release old: the 1.0.0 cut removed 15 `*Span` builders
for the identical reason — *"a zero-consumer surface, deprecated in 0.13.0"* (`index.ts:10-12`) —
with `proof:no-span-surface` as the terminal gate and `dist-surface.test.ts:55-60` flipped to assert
absence. The same shape applies here: excise, add `proof:no-domain-parser-surface`, flip the
dist-surface keep-gate to an absence-gate. Two defects die as side effects — `parsers/` becomes an
empty directory, so `index.ts:14`'s `export *` (the one construct the publish gate cannot read,
C-6) goes with it, and the cycle of C-16 goes with that.

**What I am *not* claiming.** That the cut is urgent. Blast radius today is zero (§0), so nothing is
*currently* broken for anyone. The cost being paid is (a) 15% of the front-door surface and a
broken quickstart standing between a new consumer and the library, (b) a semver obligation on five
exports nobody has ever imported, and (c) three gates (`dist-surface`, `subpath-gate`,
`no-dead-combinator`) whose coverage claims are, in this corner, vacuous. That is a maintenance and
first-impression tax, argued at MAJOR, not an outage.

---

## 6. Corpus fold — where this challenge cites, extends, and contradicts

| source | fold |
|---|---|
| INBOX **O-15 / PT-07** (`.parse()` failure indistinguishable; 5/5 non-string `TypeError`) | **CONFIRMED at this module and sharpened**: reproduced 5/5 non-string throws through `jsonParser`; C-11 adds the **type-level** half O-15 did not measure — `tsc --strict` exit 0 on three non-nullable bindings holding `undefined`. |
| INBOX **O-15 / PT-01** (label is a no-op unless diagnostics armed; arming drags `console.error`) | **Respected, not re-run.** C-13 measures the shipping default only; diagnostics were never armed. |
| INBOX **O-15 / PT-03** (`PACKRAT_ARMED` one-way latch) | **Untouched by construction** — `memoize()` never called; this module contains zero `memoize` (consistent with `parser-band.md:108` *"zero memoize"*). |
| INBOX **O-15 / PT-04** (lazy depth 7,761 → `RangeError`) | **Reachable here**: `json.ts:25,28` place two `Parser.lazy` back-edges with no depth bound. Not independently re-measured (O-15's number stands; re-deriving it would violate the epoch rule). Noted as inherited exposure, **not counted** as a new defect. |
| `parsethat-surface-gaps.mjs` **DEBT-1** row | **CONFIRMED at this module** — C-13, six failure classes, all `expected: undefined`. |
| `parsethat-surface-gaps.mjs` **GUARD** rows | **CONFIRMED at this module** — C-11 (`.parse()` signal) and the 5/5 non-string throws. |
| `registry/adjudicated/parser-band.md:97,141` (non-finite; cand-F's sole correctness debit) | **Extended**: C-9 shows `numberParser` ships that debit (`1e400` → `Infinity`) in the *published* utility, one layer below the grammars the band adjudicated. |
| `parser-band.md:108` (idiom: single-token regex terminals · `dispatch` narrowing · `parseState`+`isError` never `parse()` truthiness) | **Cited both ways** — S-2/S-3 award the module its idiom credit; C-8 convicts `json-vectors.test.ts:29` of the forbidden entry idiom. |
| `parser-band.md:116-117` (debts 1 & 2: labelled failures; reject path as its own leg) | Debt 1 → C-13. Debt 2 → S-3's keep-verdict on the head-dispatch pattern. |
| **X·P W2.md** §2c, §3 scope 2/12, §3c, "Not in scope" | The whole of §5. |
| **X·P W1.md:355-381** (G-1, the 52 derived by script) | 52 = 33 + 19 **re-derived here** from `value.js/src/css/index.ts:1-35` / `:36-60` and it matches. |
| `parse-that/docs/tranches/A/A.md:214` + `A.W3.md:320` (*"Keep jsonParser, csvParser, escapedString, quotedString, numberParser"*) | **CONTRADICTED, explicitly and narrowly** — C-4. The keep-ruling predates the parser band and PLAW-BIND; A.md's own zero-consumer reasoning for the CSS cut applies verbatim to these five and was not extended. Contradiction is on the consumption axis only; nothing here disturbs A's CSS-excision ruling, which S-4 finds true and gated. |

---

## 7. Method and bounds

Read whole (read-only, main checkout `ef10d5b`): the 4 module files; `src/parse/index.ts`,
`parser.ts`, `leaf.ts`, `state.ts`, `utils.ts`, `lazy.ts`, `split.ts`, `packrat.ts`, `core.ts`,
`diagnostics.ts`, `utils-entry.ts`, `packrat-entry.ts`; `package.json`, `README.md`, `docs/api.md`,
`docs/playground/leaf-parsers.md`, `typescript/CLAUDE.md`; `test/{json,csv,json-vectors,
validate-parsers,dist-surface}.test.ts`, `test/{manifest,subpath}-gate.mjs`,
`scripts/proof-no-dead-combinator.mjs`; `dist/{index,utils-entry,core,diagnostics}.d.ts` and
`dist/parsers/*.d.ts`. value.js read-only: `src/css/index.ts`, `src/css/grammar.ts`, `package.json`.

Probes ran from the session scratchpad against the **built dist** by absolute path
(`dist/parse.js`, `dist/utils.js`, `dist/core.js`). `tsc` invoked from value.js's `node_modules`
against a scratchpad `tsconfig.json`. Zero writes inside `/Users/mkbabb/Programming/parse-that`;
`.worktrees/`, frozen roots, and `~/Documents/Codex` never entered. `enableDiagnostics()` and
`memoize()` were never called — the one-way latches remain unarmed. No browser tooling. No
benchmark of any kind (no timing claim appears in this document).

**Bounds on the findings.** All measurements are N=1 machine, one node version (v26.0.0), against
the dist present in the read-only checkout — which is **not** verified byte-identical to the
published npm tarball (the band recorded a dist-drift caveat at `parser-band.md:132`: *"the repo's
own `dist/subpaths/css.js` differs from what 4.0.0 ships"*, for value.js; the analogous check was
not performed for parse-that here). Every defect above is a **structural** claim readable in
source (`json.ts`/`csv.ts`/`utils.ts`/`index.ts` line-cited) with the dist run as corroboration, so
a tarball delta would change the corroboration, not the finding. C-16 is explicitly latent. S-1's
"remove the guard and it hangs" half is structural, not executed. Two claims rest on simulation
rather than mutation of the read-only tree — C-6's falsifier (the gate's `namedExports()` re-run
verbatim over the real source in scratchpad) and C-8's (`grep` census, not a mutation run); both
are stated as such.
