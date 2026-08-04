claude-opus-5[1m]

# CHALLENGE — `typescript/src/parse/index.ts` · axis **C (CONSUMPTION)**

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/index.ts` (14 lines + trailing
newline; `@mkbabb/parse-that@1.0.0`, the `.` entry of the `exports` map).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries a severity, a `file:line` provenance, and the falsifier that would kill it. Superlatives
carry the same burden (L-18 runs both ways).
**Writes**: this file only. `/Users/mkbabb/Programming/parse-that` was read-only throughout; no
worktree, frozen root, or `~/Documents/Codex` path was entered.
**STOP-check**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` →
`No such file or directory` (2026-08-04). The forbidden root does **not** exist and was not created.
**Latch hygiene**: no bench was run that arms diagnostics or packrat. `memoize()`/`mergeMemos()` were
never called in any probe process; `PACKRAT_ARMED` was never set. The one diagnostics toggle used
(§D-14) is the reversible flag, in a disposable process, with no timing taken.

---

## 0. The module, whole

```
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

Every file it imports was read whole: `parser.ts` (25,378 B), `state.ts`, `utils.ts`, `lazy.ts`,
`packrat.ts` (22,785 B), `leaf.ts` (14,876 B), `split.ts`, `parsers/index.ts` + `json.ts` / `csv.ts` /
`utils.ts`. Transitively reachable and also read: `debug.ts` (12,586 B), `ansi.ts`. Sibling entries
read for the tier comparison: `core.ts`, `diagnostics.ts`, `packrat-entry.ts`, `utils-entry.ts`.

**Measured surface** (live, against the vendored `1.0.0` install at
`docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that`):

| entry | runtime exports |
|---|---|
| `@mkbabb/parse-that` (this module) | **34** |
| `/core` | 18 |
| `/diagnostics` | 6 |
| `/packrat` | 3 |
| `/utils` | 7 |
| union of the four tiers | **34** — set-difference **∅ both ways** vs the root |

29 of the 34 are named in the barrel text; 5 arrive through the `export *` on line 14.

---

## 1. Corpus concordance and one explicit contradiction

**Folded, not re-invented** — INBOX **O-15** (PT-01 / PT-03 / PT-04 / PT-07, `INBOX.md:77`, with the
dist line-cites); the X·P wave specs at `docs/tranches/X/parse-that/waves/` (W1's harness
constraints as cited by W2 §OP-3; **W2 §3b/§3c/§3e** read in full, the candidate algebra used as the
disposition frame in §4 below); `registry/adjudicated/parser-band.md` (the five binding debts, the
seven divergences, the preserved dissents). Where a finding overlaps a corpus id, the id is cited
inline. Where the tree disagrees with the corpus, it is called out here, not buried:

> **CONTRADICTION — the task's stated consume-edge path does not exist.** The brief directs
> "read value.js `src/parsing/` read-only for the consume edges". `/Users/mkbabb/Programming/value.js/src/parsing/`
> **does not exist** in the current tree. The CSS surface lives at `src/css/` (`grammar.ts`,
> `named-colors.ts`, `stylesheet.ts`, `syntax.ts`, `timeline.ts`, `types.ts`, `index.ts`). The
> memory note "`src/parsing/grammars/` — BBNF spec grammars" is stale. I audited `src/css/` instead
> and re-derived the 52 there.
>
> **CONFIRMATION** of W2 §3.2's count against the tree: `src/css/index.ts` lines 1–35 are the type
> block (**33** names, lines 2–34); lines 36–60 the runtime block (**19** = 7 `grammar` + 1 `syntax`
> + 3 `timeline` + 8 `stylesheet`). **33 + 19 = 52.** W2's `src/css/index.ts:36-60` / `:1-35`
> citation is exact.

---

## 2. The governing fact

### D-1 — **BLOCKER** — the routing law's sole downstream consumes **zero** of this module's 34 exports; every keep/retire ruling must therefore be made on specification, and the package's own dead-code precept then condemns most of the surface.

*Provenance.* `/Users/mkbabb/Programming/value.js/package.json` — `version 4.0.0`,
`dependencies = {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`. No
`@mkbabb/parse-that`. `require.resolve("@mkbabb/parse-that")` from the value.js root →
`MODULE_NOT_FOUND`. `grep -rn "parse-that" src/ test/ demo/ package.json` returns **two comment
lines that assert its absence** — `src/subpaths/math.ts:2` ("parse-that-FREE") and
`src/subpaths/transform.ts:4` ("zero parsing, zero parse-that") — and nothing else.
`grep -n parse-that package-lock.json` → no hits. The next hop is empty too:
`/Users/mkbabb/Programming/keyframes.js/package.json` → `dependencies = {"@mkbabb/value.js":"4.0.0"}`,
consistent with the parse-that CHANGELOG's own "kf is parse-that-free" (`CHANGELOG.md`, 1.0.0
preamble). PLAW-BIND's chain — parser → value → packed release → consumers (W2 §2c) — has **zero**
parse-that edges at **every** hop.

The only live consumer anywhere in this workspace is the audit instrument itself:
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs:11-13`, which resolves
parse-that from a **prototype-local `node_modules` sandbox** —
`…/prototypes/css-parser/node_modules/@mkbabb/parse-that/dist/parse.cjs` (resolution traced live) —
not from value.js's dependency graph. This is consistent with W2 §3 *Not in scope*: "adding
`@mkbabb/parse-that` to `package.json` (X-W9 G31 measures that set and it stays as measured)".

*Why BLOCKER on this axis.* CONSUMPTION asks how the module serves its consumers. It has none. The
consequence is not rhetorical: parse-that's own dead-code precept, written into its own gate, reads
*"A never-importable export is not part of the public contract; an export born one prior tranche with
zero workspace consumers is dead by the precept"* (`scripts/proof-no-dead-combinator.mjs:10-12`), and
that gate's own consumer sweep (`:63-68`) targets exactly `../../value.js/src` and
`../../keyframes.js/src` — both now empty of parse-that. Applied honestly to itself, the precept
condemns the barrel wholesale. Every §3 finding below inherits this: **no export in this file can be
defended by usage evidence, because none exists.**

*Falsifier.* A single `import`/`require` of `@mkbabb/parse-that` in value.js's or keyframes.js's
shipped tree, or the name in either lockfile. Grepped `src/`, `test/`, `demo/`, `package.json`,
`package-lock.json` — none. **Survives.**

*Honest scope (L-18).* This is a defect of the module's **justification**, not of its syntax. The
resolver works; the types resolve; the code is correct where measured. What is defective is that the
file publishes a 34-name contract that nothing in the constellation has agreed to.

---

## 3. Defects

### D-2 — **BLOCKER** — line 8 puts an irreversible process-global latch on the **default** import path and names its non-reset `resetPackrat`.

*Provenance.* `index.ts:8` exports `memoize, mergeMemos, resetPackrat`. `packrat.ts:156`
`let PACKRAT_ARMED = false;`. `packrat.ts:290` — inside `makeMemoized()`, reached from both
`memoize()` (`:482`) and `mergeMemos()` (`:486`) — `PACKRAT_ARMED = true;` **at construction, not at
invocation** (the source comment says so: *"The latch never disarms"*, `:288`). `resetPackrat()`
(`:262-273`) clears `MEMO` / `HEADS` / `GROWING` / `LR_STACK` / `CURRENT_SRC` and **never assigns
`PACKRAT_ARMED`**. Grep of the whole file for assignments: `:156` (init `false`) and `:290`
(`true`) — the only two; `:217` and `:266` are reads.

*The consumption failure.* A consumer reading only this barrel sees a symmetric pair —
`memoize` / `resetPackrat` — and reasonably infers reversibility. It is not reversible. O-15 PT-03
(`INBOX.md:77`) measured the cost: UNARMED **93.9 ns/parse** → ARMED **138.2** = **1.47×**, and
`resetPackrat()` leaves it at **139.3** — *"clears the memo store, does not disarm"*. One
`memoize()` call anywhere in the process — a transitive dependency, a test helper, a devtool —
permanently taxes every parse in that process by ~47 %, and the barrel's own reset primitive cannot
undo it. The name is a promise the implementation cannot keep, and the barrel is where the promise
is made.

*X·P disposition.* Outlawed outright by **W2 §3b O-8** ("No operator reads or writes process-global
mutable state. Arming, memoization, and diagnostics are **parameters of a parse**, never latches …
no algebra with a global absorbing state can satisfy EQ-1 across two lowerings that arm at different
times") and killable by **K-6** ("observable cross-parse state … or reset with residue").

*Falsifier.* Any assignment of `false` to `PACKRAT_ARMED` outside the initializer, or any exported
API that reaches one. Grepped the whole of `packrat.ts` — none. **Survives.**

*Honest scope (L-18).* The latch is a genuine and well-documented *performance* win for the unarmed
path (CHANGELOG 1.0.0, S.H1: the removed per-parse 3-Map allocation, "mid-teens % throughput on
short CSS values … ~34 % less retained heap"). The defect is not the latch; it is publishing
`resetPackrat` on the default surface under a name that misdescribes it.

### D-3 — **BLOCKER** — line 5's `enableDiagnostics` is the only door to labelled failures, and it is the exact door W2's G-4 nails shut.

*Provenance.* `index.ts:5` exports `enableDiagnostics, disableDiagnostics`. `utils.ts:6-14`: a
module-scope `let diagnosticsEnabled = false` with two nullary setters. `parser.ts:66-69`, inside
`parseStateInner`:

```ts
if (isDiagnosticsEnabled()) {
    console.error(this.state.toString());
}
```

— an **unconditional stderr write on every failed parse**, once the flag is on. This is O-15 **PT-01**
verbatim ("arming couples an unconditional `console.error`", with the dist cites
`diagnostics-DDazRHgl.js:14` + `packrat-entry-*.js:881`); the source sites are `utils.ts:16` and
`parser.ts:68`.

*The consumption failure.* The flag is not optional decoration — it is load-bearing for the label
surface. `utils.ts:33`: `state.expected = diagnosticsEnabled && label ? [label] : undefined;` and
`:38`: `if (diagnosticsEnabled && label)`. **Every** write to `expected[]` is behind the global
(grep `diagnosticsEnabled` in `utils.ts` → `:6, :9, :13, :17, :33, :38, :52, :58, :71`; no other
path). So the barrel offers labelled diagnostics only through a switch that also makes the library
print. **W2 §6 G-4**'s R-LAW-3 probe *"monkey-patches `console.error`/`console.warn` to **throw** over
the full corpus — a lowering that prints cannot pass (the PT-01 coupling made unpassable)"*. A
candidate that reaches for this barrel export to satisfy debt 1 fails G-4 **by construction**.

*Live receipt, re-run today* (`node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`):
`RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default)   undefined`.

*Falsifier.* A path that seeds `expected[]` without setting the global. `utils.ts:28-49` is the whole
of `mergeErrorState`; there is none. **Survives.**

### D-4 — **MAJOR** — line 7 exports a symbol named `lazy` that is **not** the `lazy` every consumer means.

*Provenance.* `index.ts:7` exports `lazy` from `lazy.ts:30-43` — a **TypeScript method decorator**,
`(target, _propertyName, descriptor)`, arity 3, returning `void`. The combinator consumers actually
use is `Parser.lazy` — a static at `parser.ts:702-707`, arity 1 — and it is **not** a barrel export.

Who means which: the surface-gaps probe writes `Parser.lazy(() => …)` (`parsethat-surface-gaps.mjs:29`);
the band's idiom reading credits cand-O with *"exactly one `Parser.lazy` on the one true back-edge
(balanced tail)"* (`parser-band.md`, IDIOM READING); O-15 **PT-04** measures `Parser.lazy` (arity 1,
deepest OK 7,761, `RangeError` at 7,762). Nobody in the corpus means the decorator. The barrel
carries **three** lazy-shaped names — `getLazyParser`, `createLazyCached`, `lazy` — and none of them
is the one the ecosystem uses.

*Live receipts.*
```
typeof lazy       : function | arity 3
typeof Parser.lazy: function | arity 1
lazy(fn) THREW: TypeError: Cannot read properties of undefined (reading 'value')
```
(the throw is `lazy.ts:35`, `descriptor.value!` on `undefined`).

*Honest scope (L-18) — this is MAJOR, not BLOCKER.* TypeScript catches the misuse at compile time.
Consumer probe under `moduleResolution: bundler`, tsc 6.0.3:
`probe.ts(7,13): error TS2554: Expected 3 arguments, but got 1.` Only untyped/JS consumers reach the
runtime throw. The defect is the naming collision on the public surface, not an unguarded footgun.

*Falsifier.* A `Parser.lazy` re-export on the barrel, or a decorator-only convention documented at
the export site. Neither exists — `index.ts:7` names it beside two other lazy helpers with no comment.

### D-5 — **MAJOR** — the diagnostics surface is exported half-way: the data type ships, the renderer is unreachable from every entry point.

*Provenance.* `index.ts:6` exports `type Diagnostic`; `index.ts:5` exports `getCollectedDiagnostics`,
which returns `readonly Diagnostic[]` (`utils.ts:138`). The **only** renderers for that shape are
`formatDiagnostic` (`debug.ts:200`) and `formatAllDiagnostics` (`debug.ts:235`) — on no barrel, no
subpath, and unreachable by deep import.

*Live receipts.*
```
BLOCKED  @mkbabb/parse-that/dist/debug.js  -> ERR_PACKAGE_PATH_NOT_EXPORTED
BLOCKED  @mkbabb/parse-that/debug          -> ERR_PACKAGE_PATH_NOT_EXPORTED
BLOCKED  @mkbabb/parse-that/dist/parse.js  -> ERR_PACKAGE_PATH_NOT_EXPORTED
```
and, probing all five public entries for
`formatDiagnostic, formatAllDiagnostics, isDiagnosticsEnabled, parserNames, addSuggestion,
popLastDiagnostic, resetErrorState, statePrint, parserPrint`:
```
@mkbabb/parse-that              exports=34 | found: NONE
@mkbabb/parse-that/core         exports=18 | found: NONE
@mkbabb/parse-that/diagnostics  exports=6  | found: NONE
@mkbabb/parse-that/utils        exports=7  | found: NONE
@mkbabb/parse-that/packrat      exports=3  | found: NONE
```

*The consumption failure.* A consumer receives structured `Diagnostic` values and must reimplement
line/column framing, caret placement, and `expected`-list prose — all of which already exist,
tested, 7,724 built bytes of them, inside the chunk the consumer is *already loading* (§D-8). The
barrel hands over the payload and withholds the reader.

*Falsifier.* Any public entry exposing a formatter. All five enumerated — none. **Survives.**

### D-6 — **MAJOR** — `isDiagnosticsEnabled` is unreachable, so a library consumer cannot save and restore the global it is told to flip.

*Provenance.* `utils.ts:16-18` exports `isDiagnosticsEnabled`. `index.ts:5` omits it.
`diagnostics.ts:6-13` (the `/diagnostics` tier that exports its two *setters*) omits it. The
reachability probe above returned `NONE` on all five entries.

*The consumption failure.* Given only `enableDiagnostics()` / `disableDiagnostics()`, a well-behaved
library that wants labels for one parse cannot restore the caller's state — it can only guess
`disableDiagnostics()`, which is wrong whenever the caller had it on. A getter/setter pair where the
getter is unreachable is not a toggle, it is a one-way write.

*Falsifier.* Reachability of `isDiagnosticsEnabled` from any public entry, or a save/restore idiom
that does not need it. Neither. **Survives.**

### D-7 — **MAJOR** — the barrel is an exact superset of the four-tier split, and the tier that promises isolation ships the tier it disclaims.

*Provenance — set algebra, live.* root 34 = core 18 ∪ diagnostics 6 ∪ packrat 3 ∪ utils 7; **root
not in any tier: NONE; tier not in root: NONE**; each tier is 18/18, 6/6, 3/3, 7/7 also-on-root. The
A.W3 split created **zero** exclusive exports. `index.ts:5` re-advertises the `/diagnostics` tier,
`:8` the `/packrat` tier, `:5` + `:14` the `/utils` tier — so nothing about the tiering is
*enforceable* from the default path.

*Provenance — the artifact.* `dist/core.js:1` reads
`import { … } from "./packrat-entry-CS1td-8B.js";`. That chunk contains
`let PACKRAT_ARMED = false;` (`:678`) and `function makeMemoized(parser, name)` (`:721`). But
`core.ts:4-5` states: *"A consumer that imports only this never pulls the diagnostics accumulator,
the packrat tier, or the json/csv domain parsers."* Sourcemap byte attribution of that chunk
(VLQ-decoded, per-line source ownership; 39,961 of 40,576 bytes attributed):

| source | bytes | share |
|---|---|---|
| `parser.ts` | 15,096 | 37.8 % |
| `debug.ts` | 7,724 | 19.3 % |
| `leaf.ts` | 7,601 | 19.0 % |
| **`packrat.ts`** | **5,412** | **13.5 %** |
| `state.ts` | 2,842 | 7.1 % |
| `lazy.ts` | 651 | 1.6 % |
| `ansi.ts` | 635 | 1.6 % |

The packrat tier is inseparable because `parser.ts:7` statically imports `packratEnter, packratExit`
and calls them on every `parseState` (`:43`, `:47`). `dist/packrat.js` — the whole `/packrat`
entry — is 158 bytes re-exporting three names from that same chunk.

*Honest scope (L-18) — the claim is 2/3 true.* The json/csv half holds:
`grep -c "jsonParser\|csvParser" dist/packrat-entry-CS1td-8B.js` → **0**. The diagnostics
*accumulator* also holds — it lives in a separate 3,516-byte chunk (`diagnostics-DDazRHgl.js`) that
`core.js` does not import. Exactly one third of the sentence is false, and it is the 5,412-byte
third.

*Falsifier.* Rebuild and re-attribute; or produce a `/core` artifact that omits `packrat.ts`. The
static call at `parser.ts:43/47` makes the latter impossible without a source change.

### D-8 — **MAJOR** — line 3's `ParserState` welds an ANSI terminal renderer into every consumer bundle, including browsers, and `sideEffects:false` cannot shake it.

*Provenance — the static chain.* `index.ts:3` exports `ParserState`. `state.ts:136-138`:
`toString() { return statePrint(this as ParserState<unknown>); }`, over `state.ts:2`
`import { statePrint } from "./debug.js";`. `parser.ts:3` statically imports `parserDebug, parserPrint`.
`debug.ts:5` statically imports the ten ANSI helpers. `ansi.ts:3-6` evaluates
`process.stderr?.isTTY === true && !process.env.NO_COLOR` at module init.

*Measured cost.* `debug.ts` 7,724 B + `ansi.ts` 635 B = **8,359 B = 20.9 %** of the attributed chunk
that **both** `.` and `/core` load — and by §D-5 **none of it is reachable through the exports map**.
A fifth of the payload is a terminal renderer that no consumer can call.

*Why tree-shaking cannot help.* `sideEffects: false` (`package.json`) permits dropping unused
*modules*; it cannot drop a method body reachable from an exported class. `ParserState.prototype.toString`
and `Parser.prototype.toString`/`.debug` hold live references, and `Parser` is the barrel's headline
export. The dead weight is welded to the one export nobody can decline.

*Falsifier.* A bundle of `import { string } from "@mkbabb/parse-that/core"` in which `debug.ts`
and `ansi.ts` are absent. Not achievable while those method bodies exist; the built `core.js` proves
the current answer.

### D-9 — **MAJOR** — `export *` on line 14 leaves the public surface undeclared, and not one of the ten proof gates locks it.

*Provenance.* `index.ts:14` `export * from "./parsers/index.js";`. Named in the barrel: 29 runtime
symbols (line 2: 1; line 3: 4; line 5: 8; line 7: 3; line 8: 3; line 9: 8; line 13: 2). Measured on
the built root: **34**. The 5 invisible ones — `jsonParser`, `csvParser`, `escapedString`,
`quotedString`, `numberParser`, plus the `JsonValue` type — arrive through the star.
**14.7 % of the package's public runtime contract is not readable from the file that declares it.**

*Semver consequence.* Adding an export to `parsers/index.ts` widens the package's public surface
with no edit to `index.ts` and no review of the barrel — a minor-version obligation incurred in a
file nobody watching the surface is reading.

*Provenance — no gate locks it.* All ten `proof:*` scripts are **deny-lists**: `proof:manifest`
checks three manifest properties (`test/manifest-gate.mjs:23-48`); `proof:subpath` checks three
symbols (`test/subpath-gate.mjs:45-55`); `proof:no-css-surface` 16 banned names
(`scripts/proof-no-css-surface.mjs:22-27`); `proof:no-span-surface` 15 banned names
(`scripts/proof-no-span-surface.mjs:30-34`); `proof:no-dead-combinator` 2
(`scripts/proof-no-dead-combinator.mjs:29-32`). **No script asserts the export set.** parse-that
documents this exact hazard against itself: `scripts/proof-no-css-surface.mjs:6-14` —
*"the barrel re-exports the parsers tier via `export * from './parsers/index.js'`, so the CSS symbols
never appear inlined in `index.d.ts` … A substring grep of `index.d.ts` would pass GREEN with the
CSS parser still shipping."*

*Honest scope (L-18).* The two historically dangerous families are still caught, because those two
gates read the **built dist** rather than the barrel text (`proof-no-css-surface.mjs:31-42`;
`proof-no-span-surface.mjs:44-61`). The uncovered case is only a **new** name — which is precisely
the semver-hygiene case.

*Falsifier.* Any gate that snapshots the root's 34-name export set. Enumerated all ten
`package.json` scripts — none.

### D-10 — **MAJOR** — the Span excision is incomplete: lines 3–4 still export a type and two helpers that nothing in the library produces, and the "terminal" span gate passes anyway.

*Provenance.* `index.ts:3` exports `spanToString, mergeSpans`; `index.ts:4` exports `type Span`.
Repo-wide grep (`src` + `test`, `*.ts`/`*.mjs`):

| symbol | every occurrence in the repository |
|---|---|
| `spanToString` | `state.ts:13` (definition), `core.ts:11`, `index.ts:3` |
| `mergeSpans` | `state.ts:17` (definition), `core.ts:12`, `index.ts:3` |
| `Span` | `state.ts:8/13/17`, `core.ts:14`, `index.ts:4`, `parser.ts:2`, `leaf.ts:3` |

`parser.ts:2` and `leaf.ts:3` are **type imports whose identifier appears nowhere else in either
file** — dead imports. **No exported function or method anywhere in the library returns a `Span`.**
The producers were the 15 `*Span` builders, deleted in the 1.0.0 cut.

*The corpus is wrong here.* `CHANGELOG.md`, 1.0.0 "Removed — BREAKING": *"The `Span` type and its two
helpers (`spanToString`, `mergeSpans`) are UNAFFECTED — they operate on the surviving `Span` value,
not the deleted builders."* **There is no surviving `Span` value.** Nothing constructs one, nothing
returns one, nothing consumes the helpers. The retention rationale, stated at the cut, does not hold
against the tree.

*And the gate cannot see it.* `scripts/proof-no-span-surface.mjs` describes itself as *"the terminal
owner of 'everything span is dead'"* (`:5-7`) but tests only the 15 builder names
(`SPAN_BUILDERS`, `:30-34`). It passes GREEN with the residue in place. The barrel comment at
`index.ts:10-12` therefore over-claims: the span surface was 15/18 excised, and the file says
"EXCISED".

*Falsifier.* Any producer of a `Span` — a return type, a constructed literal, a field. The seven
sites above are exhaustive. **Survives.**

### D-11 — **MINOR** — six barrel exports are dead by the package's **own** written precept.

*Provenance.* Consumer counts across `src` + `test`, excluding definition sites and the barrel/tier
re-export lines:

| export | in-repo consumers | value.js | keyframes.js |
|---|---|---|---|
| `spanToString` (`:3`) | 0 | 0 | 0 |
| `mergeSpans` (`:3`) | 0 | 0 | 0 |
| `getCollectedDiagnostics` (`:5`) | 0 | 0 | 0 |
| `clearCollectedDiagnostics` (`:5`) | 0 | 0 | 0 |
| `skipWhitespace` (`:5`) | 0 | 0 | 0 |
| `skipBlockComments` (`:5`) | 0 | 0 | 0 |
| `getLazyParser` (`:7`) | 1 — `debug.ts:318`, internal | 0 | 0 |
| `createLazyCached` (`:7`) | 2 — `lazy.ts:39`, `parser.ts:704`, internal | 0 | 0 |

Downstream columns per D-1. The precept: *"A never-importable export is not part of the public
contract; an export born one prior tranche with zero workspace consumers is dead by the precept"*
(`scripts/proof-no-dead-combinator.mjs:10-12`), whose own consumer sweep targets exactly
`../../value.js/src` and `../../keyframes.js/src` (`:63-68`). The instrument agrees; it simply was
never pointed at these eight names — its `banned` list holds two (`thenMap`, `fuse`, `:29-32`).

*Honest scope (L-18) — MINOR, not MAJOR.* `getLazyParser`/`createLazyCached` have real internal
callers and are plausibly deliberate escape hatches for grammar authors; `skipWhitespace`/
`skipBlockComments` are documented at `utils.ts:150-157` as the byte-scan primitives *"a hand-rolled
grammar (value.js's canonical CSS grammar) drives its hot paths with"* — an anticipated consumer
that never materialized. Anticipation is a defensible reason to publish; it is not a reason to
*keep* publishing after the anticipation is falsified.

*Falsifier.* A consumer anywhere in the constellation. Grep table above; D-1's dependency evidence.

### D-12 — **MINOR** — `./package.json` is not exported, so the X·P substrate receipt cannot read this package's version through its own surface.

*Provenance.* `package.json` `exports` has exactly five keys: `.`, `./core`, `./diagnostics`,
`./packrat`, `./utils`. No `"./package.json": "./package.json"`. Live:
`require.resolve("@mkbabb/parse-that/package.json")` → `ERR_PACKAGE_PATH_NOT_EXPORTED`.

*Consumption consequence, concrete.* **W2 §3e Stage 4** requires *"every number carries a **substrate
receipt** (repo, commit, **package version**, node version, dist-or-tree)"*, and **W2 §4** names
`harness/w2/substrate-receipt.mjs` as a gate-invoked script for G-7 and G-9. That harness cannot read
`@mkbabb/parse-that`'s version through the package's public surface; it must reach around the
exports map with filesystem path arithmetic.

*Honest scope (L-18) — MINOR.* The workaround is one line and I used it
(`createRequire(...).resolve(...)` + a relative path) to read `1.0.0`. This is friction and a
convention miss, not impossibility.

*Falsifier.* A resolvable `@mkbabb/parse-that/package.json`. Blocked; receipt above.

### D-13 — **INFO** — no legacy-resolver fallback; recorded because it is a **declared** trade-off, not a regression.

*Provenance.* `package.json` fields: `name, version, description, type, sideEffects, exports,
scripts, files, devDependencies`. No `main`, no `types`, no `module`, no `typesVersions`. Under
`moduleResolution: node10` (still TypeScript's default for `module: commonjs`), tsc 6.0.3:

```
probe10.ts(1,24): error TS2307: Cannot find module '@mkbabb/parse-that' …
probe10.ts(2,25): error TS2307: Cannot find module '@mkbabb/parse-that/packrat' …
```

*Why INFO.* `test/manifest-gate.mjs:7-9` scopes the decision explicitly: *"the `exports` map already
resolves types correctly for every modern resolver"*. That is true, and the sentence declares the
boundary. Recorded so the X·P consumer-side survey does not rediscover it as news.

### D-14 — **MAJOR** — dual-package hazard: the CJS and ESM builds carry independent copies of every process-global this barrel exports.

*Provenance — live receipt* (one disposable process; the reversible diagnostics flag only, packrat
untouched):
```
same Parser identity?  false
cjs keys 34 | esm keys 34
ESM instance sees diagnostics armed by CJS instance? expected[] = undefined
```
`cjs.enableDiagnostics()` did not cross to the ESM instance. The state that diverges:
`diagnosticsEnabled` (`utils.ts:6`), `collectedDiagnostics` (`utils.ts:95`), `PACKRAT_ARMED`
(`packrat.ts:156`) — all module-scope `let`/`var` bindings. Confirmed there is no cross-realm
anchor: `grep -rn "globalThis\|Symbol.for" src/parse/` → **no hits**.

*Why this is the barrel's defect specifically.* `index.ts:5` and `:8` place, on the **default**
import path, the module's *only* global-state mutators. A mixed graph — one dependency on `require`,
one on `import` — gets silently divergent diagnostics and latch state with no error, no warning, and
no way to detect it. This is W2 §3b **O-8**'s named failure ("no algebra with a global absorbing state
can satisfy EQ-1 across two lowerings that arm at different times") reproduced across two **build
outputs of one package** — the same shape, one level below where W2 expects it.

*Falsifier.* A `globalThis`/`Symbol.for` anchor, or per-parse state. Grep shows neither;
`utils.ts:20-26` explicitly makes only the *error tracking* per-parse and leaves the three globals
module-scope. **Survives.**

### D-15 — **MAJOR** — line 5 exports `mergeErrorState(state, label)`, whose `label` argument is silently discarded on the shipping default.

*Provenance.* `index.ts:5`. `utils.ts:28-49`:
`state.expected = diagnosticsEnabled && label ? [label] : undefined;` (`:33`) and
`if (diagnosticsEnabled && label)` (`:38`). With diagnostics off — the shipping default
(`utils.ts:6`) — the parameter is accepted, type-checked, and thrown away.

*Consumption consequence.* This is the primitive the band's runner-up reaches for. cand-F's
`reject()` is `new Parser((s) => { mergeErrorState(s, label); s.isError = true; return s; })`
(`parsethat-surface-gaps.mjs:20`, verbatim from `cand-f/color.ts:159-164`) — the idiom
`parser-band.md` calls *"the single clearest thing cand-F does better"* (debt 1). On the published
surface it yields `expected === undefined`. There is no type-level or name-level signal; the
signature promises labelling and the default configuration silently declines.

*Falsifier.* A call path in which `label` survives with diagnostics off. `utils.ts:28-49` is the
entire function; there is none. **Survives.**

---

### 3a. Boundary of culpability — what this module could **not** fix

Re-ran `parsethat-surface-gaps.mjs` today against the vendored `1.0.0` (root import = `dist/parse.cjs`;
no `--arm`, so nothing was latched):

```
RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default) undefined
RED  DEBT-1  Parser.prototype.label / .expected combinator      absent
RED  DEBT-1  enableDiagnostics() is process-global (arity)      0 args
RED  DEBT-3  Parser.lazy ceiling (deepest OK = 7761), failure mode RangeError thrown at depth 7762
RED  DEBT-3  Parser.lazy depth-bound parameter                  arity 1 — (fn) only
     UNARMED median 60.0 ns/parse
ok   LATCH   PACKRAT_ARMED is a module-global one-way flag
RED  GUARD   parseState(non-string) totality                    5/5 throw raw TypeError
RED  GUARD   .parse() failure signal                            returns undefined
RED — 7 gap(s)
```

RED-7 reproduces exactly. Where these touch `index.ts`: row 1 is **D-15**, row 3 is **D-3**, rows 4–5
name a symbol the barrel does not export at all (**D-4**). But **zero of the seven are curable by
editing this file** — rows 2 and 4–5 need APIs that do not exist (`Parser.prototype.label`,
`Parser.lazy(fn, maxDepth)`), and rows 6–7 need a totality guard on `parseState` and a
distinguishable failure signal from `.parse()` (`parser.ts:77-79`, O-15 **PT-07**). That is why W2
§3.3 folds all five band debts as **contract clauses** rather than surface asks — and this audit
agrees rather than contradicts. *(The `60.0 ns` line is the probe's own printout, not a measurement I
took or interpret; no speed claim is made outside it — the folklore scar, W2 §2c.)*

---

## 4. What the X·P dual-target algebra would KEEP, WRAP, or RETIRE in this module

Frame: **W2 §3b** fixes the laws (state `(V,C,P,D)`; COMP-1; **O-8** anti-latch; **R-LAW-3**
diagnostics-are-values); **§3c** fixes the four candidates; **§3e** the kill rules K-1..K-10; **§3**
item 12 keeps any scan/SIMD layer *inside* the combinator library. Disposition of all 34 root
exports:

| barrel line | exports | disposition | binding citation |
|---|---|---|---|
| `:2` `Parser`, `ParserFunction` | **KEEP — the carrier** | the source-direct JS lowering is defined as *"the combinator library's own surface"* (§2a); AC-1 instantiates its signature with *"the combinator library's own constructors"*, AC-4's cand-O sibling is written against it | §2a; §3c AC-1/AC-4 |
| `:3` `ParserState`, `createParserContext` | **KEEP, with D-8 unwelded** | `parseState` + `isError` is the band's ruled entry idiom (*"entry via `parseState` + `isError`, never `parse()` truthiness"*) | `parser-band.md` IDIOM READING |
| `:3-4` `spanToString`, `mergeSpans`, `Span` | **RETIRE** — zero producers, zero consumers, retention rationale refuted | D-10; the excision's own logic (S.H2 "zero-consumer surface") |
| `:5` `mergeErrorState` | **WRAP** — it is the only labelling primitive, and its label is discarded (D-15). The algebra's *labelled zero-width failure with named expectations* is a §3b capability family; debt 1 is a **contract clause**, §3.3 | §3b capability families; §3.3 debt 1 |
| `:5` `enableDiagnostics`, `disableDiagnostics` | **RETIRE** — O-8 forbids it as a latch; G-4's R-LAW-3 probe makes it unpassable (D-3) | §3b O-8; §6 G-4 |
| `:5` `collectDiagnostic`, `getCollectedDiagnostics`, `clearCollectedDiagnostics` | **RETIRE the module-global buffer; WRAP the shape.** `D` is *"an append-only ordered list of `ParseIssue` values"* threaded in the parse state, compared by **EQ-4 structurally, never rendered strings**. A module-scope `collectedDiagnostics` array (`utils.ts:95`) cannot be a `(V,C,P,D)` component | §3b state table; EQ-4 |
| `:5` `skipWhitespace`, `skipBlockComments` | **KEEP as scan-layer seed** — §3 item 12 lands scan primitives as *"parse-that-owned combinator-surface citizens"*; these are the existing byte-scanners (`utils.ts:150-157`) and AC-3's natural starting point (`typescript/src/**`, branch `w2/ac3-scan-union`) | §3 item 12; §4 Surface B; §3c AC-3 |
| `:6` `Suggestion`, `SecondarySpan`, `Diagnostic` | **WRAP** — re-typed as `ParseIssue` over the frozen 8-code union (`src/css/types.ts:10-24`); the failure arm is a **non-empty tuple** (`types.ts:27`), which forecloses PT-07 at the type level | §3b "Contract details held load-bearing" |
| `:7` `lazy` (decorator) | **RETIRE** — zero consumers, wrong referent, throws when called as named (D-4) | D-4; the dead-code precept |
| `:7` `getLazyParser`, `createLazyCached` | **RETIRE from the public surface**, keep internal — the algebra's back-edge is *"bounded back-edge (the depth bound an **algebra parameter**)"*, which neither offers | §3b capability families; §3.3 debt 3 |
| `:8` `memoize`, `mergeMemos`, `resetPackrat` | **RETIRE** — the O-8 exemplar, cited by name in the law text; **K-6** kills any candidate carrying it. The band's idiom reading records **`memoize = 0`** in both winning grammars | §3b O-8; §3e K-6; `parser-band.md` G8 |
| `:9` `eof, any, dispatch, all, string, regex, trimStateWhitespace, whitespace` | **KEEP — the operator floor.** These map onto §3b's families (sequence · ordered committed choice · token-class scan · channel-table dispatch). `dispatch` is the band's *"two-level `dispatch` narrowing"* and `proof:no-dead-combinator`'s own vacuity anchor | §3b; `parser-band.md` IDIOM READING; `proof-no-dead-combinator.mjs:49-58` |
| `:13` `containsDelimiter`, `splitBalanced` | **RETIRE or re-home** — pure string utilities documented for *"BBNF-generated `toDoc()` code"* (`split.ts:3`) with **zero** consumers here; they are not algebra operators and not parser combinators | D-11 method; §3b (no operator family fits) |
| `:14` `export *` → `jsonParser`, `JsonValue`, `csvParser`, `escapedString`, `quotedString`, `numberParser` | **RETIRE from the root; keep at `/utils`.** Domain showcases (`parsers/index.ts:1-4`) on the default surface, invisible in the barrel text (D-9). The star itself is the semver defect | D-9; `parsers/index.ts:1-4` |

**Net**: of 34 root exports, the algebra **keeps 13** (Parser + ParserState + createParserContext +
8 leaf combinators + the 2 byte-scanners), **wraps 4** (`mergeErrorState` + the 3 diagnostic types),
and **retires 17** — half the barrel. **W2 §3 *Not in scope*** is explicit that no parser is adopted
into value.js and `package.json` is not touched, so none of this is authorized today; it is the
disposition the ratified algebra implies, recorded for `.c`/`.h`.

**One cross-check the algebra owes this module.** W2's Surface-B table grants
`typescript/src/**` modify to the **AC-3 seat only**, on branch `w2/ac3-scan-union`, with the
condition *"the library's own test suite stays green on the branch, or the union is a fork, not a
citizen"*. Every one of D-2 / D-3 / D-7 / D-8 / D-14 is a **pre-existing** condition of that library
surface, present at the clone point. Under **OP-7** the seat may *measure* on it but may not *adopt*
it as ruled-good — so a scan-union that lands on this barrel inherits an unarmable-then-unresettable
latch and a print-coupled diagnostics flag it did not create and may not fix. That is a live risk to
G-7's substrate-receipt clause, and it is not currently named in W2's OP table.

---

## 5. Superlatives (L-18, same evidentiary burden)

### S-1 — **Type-export hygiene is exact at all six type positions.**
`index.ts:2` uses inline `type ParserFunction`; `:4` and `:6` use `export type { … }`. Under the
repo's own `verbatimModuleSyntax: true` (`tsconfig.json`) this is correct at every position, and no
type-only symbol leaks into the runtime bundle. Live consumer probe (tsc 6.0.3,
`moduleResolution: bundler`, `strict`) importing `Parser`, `string`, `type Diagnostic`, `type Span`,
`type JsonValue`, `getCollectedDiagnostics` typechecks with **exactly one** error — the deliberate
`lazy` misuse of D-4. *Falsifier*: any type-only symbol appearing in `dist/parse.js`'s runtime export
list — the 34 measured names contain no type. **Survives.**

### S-2 — **The excision comment (`:10-12`) is a model of surface archaeology.**
Three comment lines carry five provenance facts — the removed family (15 `*Span` builders), the wave
(S.H2), the ledger row (fold row 48), the deprecation release (0.13.0, PT-Q4), and the enforcing gate
(`proof:no-span-surface`) — placed on the exact line where a reader asks "where did they go?". Most
barrels carry no record of a removal at all; a reader of this one can reconstruct the decision without
leaving the file. *Falsifier*: the facts being wrong — CHANGELOG 1.0.0 "Removed — BREAKING" confirms
all five. (The comment nonetheless **over-claims** completeness; see D-10. Both are true.)

### S-3 — **The built type surface is byte-faithful to the source barrel.**
`diff` of `src/parse/index.ts` against `dist/index.d.ts` (comments and the sourcemap trailer aside)
→ **identical**. The file a maintainer edits *is* the contract a consumer's IDE reads; there is no
hand-maintained `.d.ts` to drift, and no generated re-declaration that could disagree. *Falsifier*:
any line present in one and not the other — none.

### S-4 — **Exactly one resolution answer per specifier, and a gate that checks it.**
The `exports` map declares five entries, each with `types`/`import`/`require`, and **no**
`browser`/`node`/`development`/`default` conditions — so there is no condition-order trap and no
divergent build served to different resolvers. `test/subpath-gate.mjs:24-36` verifies every declared
subpath's three targets exist on disk, reading the map itself *"so the gate tracks the manifest, not
a hardcoded path"* (`:5-8`). My live probe imported all five entries with the expected counts
(34/18/6/3/7). *Falsifier*: a subpath whose declared target is missing, or a condition producing two
different modules for one specifier — none.

---

## 6. Ledger

| id | severity | claim | anchor |
|---|---|---|---|
| D-1 | **BLOCKER** | zero downstream consumers; the surface has no usage justification | value.js `package.json`; keyframes.js `package.json`; `proof-no-dead-combinator.mjs:10-12` |
| D-2 | **BLOCKER** | irreversible packrat latch on the default path; `resetPackrat` does not reset | `index.ts:8`; `packrat.ts:156,262-273,290`; O-15 PT-03 |
| D-3 | **BLOCKER** | `enableDiagnostics` is the only door to labels and is gate-failing under G-4 | `index.ts:5`; `parser.ts:66-69`; `utils.ts:33,38`; O-15 PT-01; W2 G-4 |
| D-4 | MAJOR | barrel `lazy` is the decorator, not `Parser.lazy` | `index.ts:7`; `lazy.ts:30-43`; `parser.ts:702` |
| D-5 | MAJOR | `Diagnostic` ships; its renderers are unreachable from all five entries | `index.ts:5-6`; `debug.ts:200,235` |
| D-6 | MAJOR | `isDiagnosticsEnabled` unreachable — the global cannot be saved/restored | `utils.ts:16`; `index.ts:5`; `diagnostics.ts:6-13` |
| D-7 | MAJOR | tier split is an exact subset of the root; `/core` ships packrat (5,412 B) | live set algebra; `dist/core.js:1`; `core.ts:4-5` |
| D-8 | MAJOR | `ParserState` welds `debug.ts`+`ansi.ts` (8,359 B, 20.9 %) into every bundle | `index.ts:3`; `state.ts:2,136`; `parser.ts:3`; `ansi.ts:3-6` |
| D-9 | MAJOR | `export *` hides 5 of 34 exports; no gate locks the surface | `index.ts:14`; `proof-no-css-surface.mjs:6-14`; all ten `proof:*` |
| D-10 | MAJOR | Span residue: 3 exports, zero producers; CHANGELOG rationale refuted | `index.ts:3-4`; `state.ts:8,13,17`; `proof-no-span-surface.mjs:30-34` |
| D-11 | MINOR | six exports dead by the package's own precept | grep table; `proof-no-dead-combinator.mjs:10-12,63-68` |
| D-12 | MINOR | `./package.json` unexported — the W2 substrate receipt cannot read the version | `package.json` exports; W2 §3e Stage 4, §4 |
| D-13 | INFO | no `main`/`types`/`typesVersions`; node10 resolution fails (**declared**) | `package.json`; `manifest-gate.mjs:7-9`; TS2307 receipt |
| D-14 | MAJOR | dual-package hazard — CJS/ESM carry independent copies of every exported global | live identity + flag-crossing receipt; `utils.ts:6,95`; `packrat.ts:156` |
| D-15 | MAJOR | `mergeErrorState`'s `label` is silently discarded on the default | `index.ts:5`; `utils.ts:33,38`; RED-7 row 1 |
| S-1 | superlative | exact type-export hygiene under `verbatimModuleSyntax` | tsc receipt |
| S-2 | superlative | five-fact excision archaeology in three comment lines | `index.ts:10-12` |
| S-3 | superlative | `dist/index.d.ts` byte-faithful to the barrel | diff receipt |
| S-4 | superlative | one resolution answer per specifier, gate-checked | `package.json` exports; `subpath-gate.mjs:24-36` |

**Totals — defects 15 (BLOCKER 3 · MAJOR 9 · MINOR 2 · INFO 1) · superlatives 4.**

**Verdict.** DEFECTIVE, and the three blockers are not craft failures. D-1 says the barrel serves no
one. D-2 and D-3 say that the two things it puts on the *default* import path which are not
combinators — the packrat latch and the diagnostics flag — are both irreversible process-globals that
the successor algebra outlaws by name (O-8) and whose use its gates make unpassable (G-4/K-6). A
14-line file cannot cure any of the seven RED-7 rows (§3a); what it *can* be held to is that it chose
to publish, at the top of the package, exactly the surface the X·P algebra will have to retire.
