claude-opus-5[1m]

# CHALLENGE — `parse/debug.ts` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/debug.ts`, 383 lines,
12,586 bytes, 8 exported functions (`summarizeLine` · `formatExpected` · `addCursor` ·
`statePrint` · `formatDiagnostic` · `formatAllDiagnostics` · `parserPrint` · `parserDebug`).
**Imports read whole**: `state.ts` (190) · `lazy.ts` (43) · `parser.ts` (25,378 B, read at the
`call`/`debug`/`toString`/`parseStateInner` seams) · `ansi.ts` (17) · `utils.ts` (187).
**Downstream read read-only**: value.js `src/css/**` (the routing law's sole consumer; `src/parsing/`
no longer exists — the tree says `src/css/` at 1,948 lines across 7 files, and this file cites the
tree, not the prompt).

**Posture**: the module was assumed DEFECTIVE until the tree proved otherwise. It did not prove
otherwise on this axis. Every row below carries file:line provenance and the falsifier that would
kill it; the two rows whose falsifiers *did* fire are recorded as refutations (§4), not quietly
dropped. **16 defects (3 BLOCKER · 8 MAJOR · 4 MINOR · 1 INFO), 5 superlatives.**

**Law compliance**: `/Users/mkbabb/Programming/parse-that` was read-only throughout (main checkout,
no `.worktrees/`, no frozen root, no `~/Documents/Codex`).
`ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → `No such file or directory`, re-verified
this session — **no STOP finding**. No browser tooling. **No probe armed diagnostics or packrat**:
`enableDiagnostics()` was never called and `memoize()` was never called in any process this session;
`parsethat-surface-gaps.mjs` was run in its UNARMED form only. Measurements are one machine, N=1,
`@mkbabb/parse-that@1.0.0` as resolved from
`docs/tranches/V/megatranche/prototypes/css-parser/node_modules` (the O-15 / W1 OP-3 workspace).

---

## 0. The one-sentence finding

`debug.ts` is the only module in the package whose entire product is a **string for a Unix
terminal**, and **not one byte of that product is reachable through any published export path** —
while 8,444 bytes of it (20.8 % of the 40,576-byte shared runtime chunk) ship inside `/core`, the
subpath whose own header promises a consumer "never pulls the diagnostics accumulator".

---

## 1. What value.js actually consumes (the consume-edge census)

Measured, not assumed:

| edge | state in the tree |
|---|---|
| `@mkbabb/parse-that` in value.js `package.json` | **ABSENT**. `dependencies` = `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`. X·P W2 §3 "Not in scope" keeps it that way; X-W9 G31 measures the set. |
| any `import` of parse-that in value.js `src/**` | **ZERO**. `grep -rn "parse-that" src/` returns two *comments* only: `src/subpaths/transform.ts:4` and `src/subpaths/math.ts:2`, both asserting parse-that-**freedom**. |
| value.js's own diagnostic carrier | `ParseIssue = Readonly<{code, start, end, expected: readonly string[], actual: string \| null}>` — `src/css/types.ts:10-24`; built at `src/css/grammar.ts:45-62`, deep-frozen, **offset-based, no line/column, no rendering**. |
| value.js's failure posture | `ok:false` is **normal control flow**, not an exception: `ParseResult<T>` union at `src/css/types.ts:25-27`; `failure()` returns a frozen value at `grammar.ts:45-62`. |

So the honest consumption baseline is: **today, zero consumption**. The axis question is therefore
what the sole downstream *would* consume if X·P adopts, and the answer the tree gives is: of the 8
functions, exactly **one** (`formatExpected`) is shaped for value.js's carrier — and it is
unreachable. The remaining seven either require a live `ParserState` (a type value.js does not
have), emit ANSI (a format value.js's browser target cannot use), or write to a console (an effect
value.js's frozen-value contract forbids).

**Falsifier for this whole section**: produce one line in value.js `src/**` that imports anything
from `@mkbabb/parse-that`, or one `ParseIssue` field that carries a rendered string. Neither exists.

---

## 2. Defects

### C-1 — BLOCKER — Zero of the 8 exports is reachable from any published entry point

`debug.ts` appears in **no** barrel: `src/parse/index.ts:1-14` (root), `core.ts:7-27`,
`diagnostics.ts:6-14`, `packrat-entry.ts:5`, `utils-entry.ts:6-12`. `package.json:8-33` declares
exactly five subpath doors and none is `./debug`. Measured against the published dist:

```
@mkbabb/parse-that                 debug exports: NONE | total exports: 34
@mkbabb/parse-that/core            debug exports: NONE | total exports: 18
@mkbabb/parse-that/diagnostics     debug exports: NONE | total exports:  6
@mkbabb/parse-that/packrat         debug exports: NONE | total exports:  3
@mkbabb/parse-that/utils           debug exports: NONE | total exports:  7
deep import /dist/debug.js   ERR_PACKAGE_PATH_NOT_EXPORTED
deep import /dist/debug.d.ts ERR_PACKAGE_PATH_NOT_EXPORTED
deep import /debug           ERR_PACKAGE_PATH_NOT_EXPORTED
```

The shared runtime chunk's own export list confirms it structurally —
`dist/packrat-entry-CS1td-8B.js:1417-1437` exports 20 mangled names (`P`,`a`,`b`,`c`,`d`,`e`,`f`,
`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`r`,`s`,`t`,`w`), **none** a debug formatter.

The consumption consequence is exact: `/diagnostics` exports `getCollectedDiagnostics(): readonly
Diagnostic[]` (`diagnostics.ts:6-13`), and the **only** two functions in the package that turn a
`Diagnostic` into anything a human or a log reads — `formatDiagnostic` (`debug.ts:200`) and
`formatAllDiagnostics` (`debug.ts:235`) — have no door. A consumer who arms diagnostics gets a bag
of structs and must hand-roll the renderer the package already wrote.

This directly contradicts the tranche-A thesis that authored the subpath split:
`parse-that/docs/tranches/A/A.md:62-64` names `debug.ts` and `ansi.ts` as **"the product"**, and
`A.md:71-73` states the subpath corollary — *"if the library is primitives, consumers should be
able to import exactly what they need"*. The A.W3 split shipped four tiers and left the module its
own thesis calls product with no door.

**Falsifier**: name one specifier resolvable from outside the package that yields any of the 8.
Deep-import escapes are closed by the `exports` map (no wildcard, no `./dist/*` pattern) and there
is no `dist/debug.js` emitted at all — only `dist/debug.d.ts`. The falsifier finds nothing.

### C-2 — BLOCKER — `dist/debug.d.ts` is a phantom typed surface no gate can see

The published package ships `dist/debug.d.ts` declaring all 8 functions as `export declare
function`, complete with the JSDoc for `formatDiagnostic`/`formatAllDiagnostics` — a type surface
with **no runtime counterpart and no exports-map path**. `import type` fails identically
(`ERR_PACKAGE_PATH_NOT_EXPORTED`, measured above).

The semver hazard is that no gate covers this direction:

- `test/dist-surface.test.ts:14-15,18-34` parses named exports out of **`src/parse/index.ts`** and
  asserts each is present in `dist/index.d.ts`. `debug.ts` is not in `index.ts`, so the gate is
  structurally blind to it. Its own header (`:6-11`) records that it exists because the shipped
  0.8.2 dist exported 8 of 15 span fns and *"the version number lied about it"* — it cures
  source-barrel→dist and leaves published-`.d.ts`→exports-map uncovered.
- `test/subpath-gate.mjs:25,45-56` checks exactly three names (`core.Parser`, `core.dispatch`,
  `packrat.memoize`) plus file existence. Blind likewise.

Net: any signature change to those 8 declarations is simultaneously (a) invisible to every
consumer, and (b) a visible `.d.ts` diff that will read as a public-API change at review. Both
readings are wrong, in opposite directions. That is the definition of broken semver hygiene.

**Falsifier**: show a gate whose failure mode includes "a `.d.ts` shipped in `files` declares a name
no `exports` entry resolves". `proof:all` (`package.json:35-46`) runs 10 proofs; none does.

### C-3 — BLOCKER — `toString()` throws on the band's own adjudicated `reject()` node

`parserPrint`'s tail (`debug.ts:335-338`):

```ts
const result = s ?? name;
if (!result) {
    throw new Error("parserPrint: missing parser context name");
}
```

`Parser`'s constructor defaults `context` to `{}` (`parser.ts:28-31`), so a bare `new Parser(fn)`
has `context.name === undefined` → `switch` default returns `undefined` (`debug.ts:330-331`) →
`result` is `undefined` → **throw**. And `Parser.prototype.toString()` (`parser.ts:697-699`) is
`parserPrint(this)`. Measured:

```
String(raw Parser)                THREW: Error: parserPrint: missing parser context name
String(grammar containing raw)    THREW: Error: parserPrint: missing parser context name
template literal `${raw}`         THREW: parserPrint: missing parser context name
```

`new Parser((s) => {...})` is not a hypothetical shape — it is **cand-F's `reject()` verbatim**,
carried into the audit corpus at
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs:20` with the citation
`cand-f/color.ts:159-164`, and it is the mechanism DEBT-1 of `registry/adjudicated/parser-band.md`
(§"WHAT CAND-O OWES CAND-F", clause 1) makes **binding on the wave**: *"Replace `never` in the
keyword/colourspace `chain` arms with a labelled zero-width failure in cand-F's style"*. So the
adjudicated grammar the X·P candidates must host is precisely the grammar whose `toString()`
throws.

Severity is BLOCKER rather than MAJOR because `toString` is a **total-function contract in
JavaScript**: it is invoked implicitly by template literals, `+`, `String()`, `Array#join`, and —
worst — by error-message construction. A consumer writing `` throw new Error(`bad parser: ${p}`) ``
gets a *different* exception that masks the original. A debugging aid that destroys diagnostic
information when used in a diagnostic is inverted.

**Falsifier**: find a code path by which a consumer-constructed `new Parser(fn)` acquires a
`context.name`. `createParserContext` (`state.ts:179-189`) is only called by the combinators; the
public constructor never populates it. The falsifier finds nothing.

### C-4 — MAJOR — The documented `debug()` API silently discards the consumer's logger

`parse-that/docs/api.md:81` documents:

> `debug(name: string = "", logger: (...s: any[]) => void = console.error): Parser<T>`
> …*"Logs a rich status line to **stderr**"*

The shipped method (`parser.ts:690-696`) is **three** parameters with a **stdout** default:

```ts
debug(name = "", recursivePrint = false, logger = console.log) { return parserDebug(this, name, recursivePrint, logger); }
```

A consumer following the published API writes `p.debug("A", myLogger)`; `myLogger` binds to
`recursivePrint` (truthy → forces the expensive recursive `parserPrint` walk, see C-9) and the
logger silently falls back to `console.log`. Measured:

```
documented 2-arg form -> custom logger invocations: 0 (expected 1)
```

Zero. The output went to stdout instead. Three further divergences in the same two doc lines:
`api.md:83` says stderr, the method ships stdout; `debug.ts:355` defaults the *same* parameter to
`console.error` while `parser.ts:693` defaults it to `console.log` — **two entry points to one
feature with opposite sinks**; and `api.md:111` documents `toString(indent: number = 0)`, a
parameter `parser.ts:697` does not have (`toString.length === 0`, measured).

**Falsifier**: run `p.debug("A", fn)` and observe `fn` being called. It is not.

### C-5 — MAJOR — The caret is not re-based after center-truncation: it points at nothing on minified CSS

`addCursor` truncates the active line through `summarizeLine(lines[i], columnNum)` (`debug.ts:72`),
which for `len > 74` returns `"..." + trimmed.slice(start, end) + "..."` with `start = columnNum -
37` (`debug.ts:21-30`) — i.e. it **re-bases the content**. Two lines later it pads the caret with
the **un-re-based** column:

```ts
const pad = " ".repeat(lnWidth + 4 + columnNum);   // debug.ts:83
```

Measured on the shape value.js actually parses — a minified single-line stylesheet
(`"a{color:red}".repeat(20)`, 240 chars, error at offset 150):

```
rendered content cols: 85 | ends with ellipsis: true
caret column: 158 | overshoot past rendered line: 73
char under the caret in the RENDERED line: <past end of line>
char at the true error offset: "r"
```

The caret lands 73 columns past the end of the line it is supposed to annotate. `README.md:205-206`
advertises *"center-truncation of long lines around the error column"* as a feature; the feature is
half-implemented and the missing half is the half a consumer reads.

The identical defect, worse, in `formatSecondarySpans`: it emits `lines[i]` **raw and untruncated**
(`debug.ts:114`) while padding its marker with the raw column (`debug.ts:116`). For a 100 KB
minified sheet — one line — a single secondary span emits the entire 100 KB line to the sink.

This is the CSS-shaped defect: value.js's `parseStylesheet` (`src/css/stylesheet.ts`, 899 lines)
consumes whole stylesheets, and minified CSS is one line. Both the primary caret and every
secondary marker are mis-registered exactly there.

**Falsifier**: `new ParserState(src, undefined, 150, true).toString()` on a 240-char single line and
show the caret index ≤ the rendered line length. Measured 158 vs 85.

### C-6 — MAJOR — `debugDepth` leaks permanently on any throw; there is no reset

`parserDebug`'s wrapper (`debug.ts:357-381`) increments a module global, calls the wrapped parser,
and decrements — with **no `try`/`finally`**:

```ts
debugDepth++;                                   // debug.ts:358
const newState = parser.parser(state);          // debug.ts:361  ← may throw
...
debugDepth--;                                   // debug.ts:379
```

Measured — baseline indentation, then four throws, then a clean parse:

```
baseline indent: 1 (0 levels + the badge's intrinsic leading space)
caught: RangeError
indent AFTER 4 throws: 9   →  +8 columns = 4 leaked levels, permanent
```

`debugDepth` is module-private with no exported reset, so the process never recovers. The coupling
is not theoretical: the one exception parse-that is *known* to throw is **O-15 PT-04** —
`Parser.lazy` deepest OK 7,761, `RangeError` thrown at 7,762 — reproduced this session by
`parsethat-surface-gaps.mjs` (`RED DEBT-3 … RangeError thrown at depth 7762`). A consumer who wraps
a recursive grammar in `.debug()` to find out *why* it blows the stack corrupts the instrument with
the first blow-up.

**Falsifier**: find a reset path (`resetDebugDepth`, a `finally`, a per-parse reset). `grep -n
debugDepth debug.ts` yields exactly `:12`, `:358`, `:359`, `:379`. None resets.

### C-7 — MAJOR — `/core`'s minimality promise is false, and `debug.ts` is a principal reason

`core.ts:4-6` promises, verbatim:

> *"A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier, or
> the json/csv domain parsers."*

The shipped `dist/core.js` is 1,336 bytes and its **line 1** is
`import { P, a, b, … } from "./packrat-entry-CS1td-8B.js"` — a 40,576-byte chunk that contains the
packrat tier, `isDiagnosticsEnabled`, and the whole of `debug.ts` + `ansi.ts` at lines 28–281
(`const enabled` :28 · `summarizeLine` :41 · `addCursor` :74 · `formatSecondarySpans` :103 ·
`statePrint` :135 · `PARSER_STRINGS` :173 · `parserPrint` :174 · `parserDebug` :262). That region
measures **8,444 bytes = 20.8 %** of the chunk every subpath imports. The CJS twin is 41,041 bytes.

`debug.ts` is a principal cause rather than a passenger, because the coupling is **structural, not
incidental**: `state.ts:2` imports `statePrint` so that `ParserState.prototype.toString()`
(`state.ts:136-138`) can call it, and `parser.ts:3` imports `parserDebug`/`parserPrint` for
`Parser.prototype.debug`/`toString` (`:690-699`). Both are **methods on live exported classes**, so
no bundler may drop them, and every entry needs `Parser` and `ParserState`. The renderer is
therefore welded to the primitive core by two `toString` conveniences that no consumer asked for
and — per C-1 — no consumer can reach the useful half of.

**Falsifier**: build a graph that imports only `@mkbabb/parse-that/core` and show the debug region
absent. `core.js:1` makes it unconditional.

### C-8 — MAJOR — `PARSER_STRINGS` is an unbounded, un-resettable module global — the O-8 latch class

`debug.ts:245`: `const PARSER_STRINGS = new Map<number, string>();` — written at `:322`, `:340`,
`:346`; read at `:248`, `:258`. **Never cleared, no exported reset, no bound.** Keys are
`PARSER_ID++` values (`parser.ts:18,25`) which are monotone for process lifetime, so the map grows
without limit in any long-lived process that stringifies parsers.

This is precisely the class X·P W2 §3 clause 3 makes a contract clause — *"no one-way global latch
of any kind (PT-03 / O-8)"* — and which K-6 turns into a candidate-killer: *"kills any candidate
whose parse #100,001 is distinguishable from parse #1"* (W2 §3c AC-3(d)). The same package already
learned this lesson once and shipped the cure for its *other* global: `resetPackrat` is exported
from `index.ts:8` and `packrat-entry.ts:5`. `debug.ts` carries **two** mutable module cells
(`PARSER_STRINGS` :245 and `debugDepth` :12) and exports a reset for neither. The inconsistency is
the finding.

**Falsifier**: name the exported function that empties `PARSER_STRINGS`. There is none.

### C-9 — MAJOR — `String(parser)` re-invokes lazy thunks, permanently duplicating the grammar

`parserPrint`'s lazy arm (`debug.ts:316-327`) calls `getLazyParser(lazy)` (`lazy.ts:7-15`), which
on a cache miss **invokes the thunk** — constructing a *second, shadow* parser graph distinct from
the one `createLazyCached` (`lazy.ts:18-24`) built for parsing. Measured on a 2-rule recursive
grammar:

```
Parser objects constructed by ONE String(parser): 5
second String(parser) constructs: 0 | identical output: true
```

Five fresh `Parser` allocations from a single implicit string coercion. They are not transient: the
`LAZY_PARSER_CACHE` `WeakMap` is keyed on the thunk (`lazy.ts:5,13`), and the thunk is strongly
retained by the live parser's `context.args` (`parser.ts:704-707` via `createParserContext("lazy",
undefined, fn)`), so the shadow graph is retained for the live grammar's lifetime. `PARSER_STRINGS`
is then keyed on the **shadow** ids, not the live ones (C-8's map, holding entries for objects the
consumer never made).

Consumption consequence: `toString()` is neither cheap nor pure, and it is reachable by accident
(template literal, `join`, log line). Under W1 §3.5's one-fresh-process-per-bench-cell discipline
this makes `parserPrint` unusable inside a measured process — a single stringification perturbs
allocation counts and the id space that packrat memo keys are drawn from.

**Falsifier**: show `String(p)` allocating zero parsers on first call. Measured 5.

### C-10 — MAJOR — Every recursion point renders as the bare token `lazy`

`debug.ts:316-327`: inside a lazy expansion (`id` truthy) a re-encountered lazy returns `name` —
the literal `ParserContext.name`, which for this arm is always the string `"lazy"`. Measured on
`print.test.ts`'s own fixture:

```
parserPrint(recursive) = "\"this is a really long string\" | \"b\" | lazy"
String(nested)         = "[\"(\", lazy, \")\"] | \"x\""
```

Two structurally different recursive grammars render their recursion identically, with no rule name
and no back-reference. Grammar visualization is the entire value proposition of `parserPrint`, and
it degrades to a placeholder exactly at recursion — the only place a human needs it.

The suite cannot catch this: `test/print.test.ts:22` constructs precisely the recursive fixture
`mijn = Parser.lazy(() => any(inner, string("b"), mijn))` and asserts, at `:29-30`, only
`expect(s).toBeTruthy()`. A gate that cannot fail for its intended reason (L-19) is not a gate; this
one would pass on the string `"lazy"` alone.

**Falsifier**: produce a rendered recursive grammar in which the recursion carries a name or a
back-reference. Both measurements say `lazy`.

### C-11 — MAJOR — PT-01's coupling *is* `debug.ts`: arming diagnostics renders the full ANSI view on every failed parse

INBOX **O-15 / PT-01** records that arming diagnostics couples an unconditional `console.error`
(`dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`). The tree names the payload:
`packrat-entry-CS1td-8B.js:880-882` is

```js
if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }
```

whose source is `parser.ts:67-68`, and whose `this.state.toString()` is `ParserState.toString`
(`state.ts:136-138`) → **`statePrint` (`debug.ts:141`)**. So `debug.ts` is not merely adjacent to
PT-01: it is the thing that gets printed. There is no logger parameter, no sink override, no
suppression flag on that path — it is `console.error`, hard-coded, at the `parseState` boundary.

For value.js this is disqualifying on its own terms. `ok:false` is *expected* control flow
(`src/css/grammar.ts:45-62`), so a UI that validates a colour input as the user types would emit a
multi-line ANSI block to `console.error` on every intermediate keystroke — plus the C-5 blowup on
minified input. And DEBT-1's labelled failures, which the band makes **binding**, are only
obtainable by arming (surface-gaps row 1, RED, reproduced this session: *"cand-F reject() label,
diagnostics OFF (shipping default) → undefined"*). The consumer must therefore choose between
labelled diagnostics and a silent console. That is the coupling W2 §3 clause 3 forbids as
*"diagnostics are algebra products that may never ride an armed-diagnostics path"*.

**Falsifier** (declined by law, stated for the record): arm diagnostics in a throwaway process, fail
one parse, count stderr writes. I did not run it — the standing instruction forbids arming. The
structural claim stands on `parser.ts:67-68` being unconditional inside its `if`, with no sink
parameter anywhere in `parseStateInner`. Refute it by naming the suppression path; I found none.

### C-12 — MINOR — The two gutters in one rendered diagnostic disagree by 2 columns

`addCursor` computes the gutter width exactly: `lineNumberWidth(endIdx)` (`debug.ts:65,49-51`).
`formatSecondarySpans` computes it as `Math.max(String(i + 1).length, 3)` (`debug.ts:110`) — a
floor of 3. For any source under 100 lines the primary block renders a 1- or 2-wide gutter and the
secondary-span block renders a 3-wide gutter, in the **same** `statePrint` output (`debug.ts:177-187`
appends one after the other). The flagship visual is misaligned by construction in the common case.

**Falsifier**: show the two width computations agreeing for a 5-line source. `lineNumberWidth(5)`=1;
`max(1,3)`=3.

### C-13 — MINOR — ANSI is decided once, globally, from `process.stderr`, and applied to every sink

`ansi.ts:3-6` computes `enabled` as a module-load `const` from `process.stderr?.isTTY` and
`NO_COLOR`. There is no setter, no export of the flag, no per-call option. Two consequences:

1. **The gate reads the wrong stream.** `Parser.prototype.debug`'s default sink is `console.log` =
   **stdout** (`parser.ts:693`), while the colour decision reads **stderr** (`ansi.ts:5`). The two
   streams are independently redirectable, so the decision is uncorrelated with the destination.
2. **Consumer-supplied loggers get escapes they never asked for.** Measured under a pty, with a
   logger that is a plain `arr.push`:

```
stdout.isTTY= true  stderr.isTTY= true
custom logger received ESC bytes? true | count: 20
"[42m[1m Done √ [22m[49m    [33m[3mA[23m…"
```

Twenty escape sequences into an array. A snapshot test, a JSON log shipper, a browser overlay, or a
value.js `ParseIssue` would each have to strip them — which `test/debug.test.ts:22-24` in fact does
(`stripAnsi`), the package's own tests conceding the point.

**Falsifier**: name the API that disables colour for a given call or sink. `grep -n "export" ansi.ts`
yields 9 formatters and no control.

### C-14 — MINOR — The two formatters have zero tests, and the tests that exist reach a forbidden path

`grep -rn "formatDiagnostic\|formatAllDiagnostics\|parserDebug" typescript/test/` → **empty**. The
two functions that render collected diagnostics — the module's stated reason to exist for the
error-recovery feature (`README.md:209-212`) — are untested.

Worse for this axis: `test/debug.test.ts:15-20` imports `summarizeLine, addCursor, statePrint,
formatExpected` from `"../src/parse/debug.js"` — a **source deep path no consumer can use** (C-1).
The suite therefore validates a surface the `exports` map forbids, and by construction can never
detect that the surface is unreachable. Same for `print.test.ts:3`.

Semver consequence: if the standing 1.1.0 ask (`docs/tranches/A/VALUEJS-PT-E-2026-07-05.md`, PT-E1
HIGH) is answered by exposing the renderers on `/diagnostics`, that minor bump would move **two
never-executed functions** straight onto the public surface.

**Falsifier**: name a test that calls `formatDiagnostic`. The grep is empty.

### C-15 — INFO — `id` is overloaded as cache key *and* as an "inside a lazy expansion" boolean

In `print(innerParser, id?)` the parameter is read three ways: as a recursion flag (`if (!id)`,
`debug.ts:320`), as a cache-write predicate (`if (id)`, `:339`), and as a value passed down
(`:264,276,286,…`). A parser whose `id` is `0` would therefore (a) never be cached and (b) fail to
terminate the lazy recursion at `:325`, since `!0` is true and the memo write at `:322` happens only
*after* `print` returns.

**Falsifier — and it fires**: id 0 is unreachable for consumer parsers in the shipped build. Measured
first user-observable id in `@mkbabb/parse-that@1.0.0`: **38** — ids 0–37 are consumed by parse-that's
own module-init parsers (`_initWhitespace()` at `parser.ts:709` and the leaf singletons). The defect
is therefore **latent, surviving on module-initialisation ordering**, not live. Recorded at INFO
because a change to `_initWhitespace` that frees id 0 turns it into a stack overflow with no warning
and no gate.

### C-16 — MINOR — README and `api.md` describe a `debug.ts` the tree does not contain

Beyond C-4's signature drift:

- `README.md:189`: *"Color-coded: BBNF nonterminals in blue, stringified parsers in yellow."* The
  tree renders the **name** yellow (`debug.ts:160`) and the **stringified parser** green
  (`debug.ts:162`) — inverted — and `ansi.ts:8-17` exports no blue at all.
- `README.md:206-207`: *"Shared test vectors in `grammar/tests/debug/` ensure isomorphic output
  between TypeScript and Rust."* `grammar/tests/debug/expected-output.txt` exists;
  `grep -rn "tests/debug" typescript/` → **zero** references. Nothing on the TypeScript side reads
  the vectors, so nothing is ensured.
- `docs/api.md:251` heads the diagnostics section *"(`utils.ts` / `debug.ts`)"* and then documents
  only `utils.ts` symbols — the `debug.ts` half of the heading has no entries, an accurate reflection
  of C-1 that reads as an omission.

**Falsifier**: show one `typescript/**` file consuming `grammar/tests/debug/`, or one blue escape in
`ansi.ts`. Neither exists.

---

## 3. Superlatives (L-18 runs both ways)

**S-1 — `formatExpected` is the one function value.js could adopt verbatim, today.**
`debug.ts:33-47`. Signature `(readonly string[]) => string`; no `ParserState`, no ANSI, no global,
no allocation beyond the join; total for length 0/1/2/n with correct Oxford comma. It maps exactly
onto value.js's `ParseIssue.expected: readonly string[]` (`src/css/types.ts:22`), which today has no
renderer on either side of the routing law. Highest consumption value per line in the module — and
unreachable (C-1). *Falsifier*: find an input for which it throws or mis-punctuates. `[]`→`""`;
1→`expected a`; 2→`expected a or b`; 3→`expected a, b, or c`. Total.

**S-2 — `statePrint` reads diagnostics from the state, never from a module global.**
`debug.ts:172-188`, with the intent written down at `:172-173`: *"read from the state's per-parse
error tracking, not module globals."* It honours the reentrancy model `utils.ts:20-26` and
`state.ts:36-45` establish, and it is the one part of the diagnostic render path that is
interleave-safe. The contrast with `debugDepth` and `PARSER_STRINGS` **in the same file** is what
makes C-6 and C-8 defects rather than house style: the module demonstrably knows better.

**S-3 — One renderer serves both live and snapshotted diagnostics.**
`formatDiagnostic` (`debug.ts:200-229`) reconstructs a `ParserState` from the `Diagnostic` snapshot
at `:207` purely so it can reuse `addCursor`, rather than forking a second renderer. Genuinely
economical: one visual style, one truncation policy, one caret rule (bugs included — C-5 is
inherited exactly once, not twice). Under the X·P algebra this is the shape to keep.

**S-4 — `ansi.ts` is a 17-line zero-dependency colour layer that respects `NO_COLOR`.**
`ansi.ts:1-17`. No `chalk`, no `picocolors`, no `supports-color`; honours the `NO_COLOR` standard and
guards `typeof process !== "undefined"` so a browser bundle degrades to plain text instead of
throwing. For a library whose whole thesis is primitives (`A.md:62-64`), refusing a colour dependency
is the right call, and it is why C-13 is MINOR rather than MAJOR — the defect is the *placement* of
the switch, never a supply-chain cost.

**S-5 — `summarizeLine` is total.**
`debug.ts:14-31`. Short-circuits at `len <= MAX_LINE_WIDTH`; clamps `mid` to `len`, `start` to
`[0, len]`, `end` to `len`; three explicit ellipsis cases. Probed with `columnNum` far past the line
end and with negative columns — no throw, no `NaN`, no unbounded allocation. It is the caller
(`addCursor`, C-5) that fails to honour the re-basing this function correctly performs; the function
itself is clean.

---

## 4. Refutations — claims I formed and the tree killed

Recorded because a challenge that reports only its survivors is a sales document.

**R-1 — "`.debug()` is an observer effect: it bypasses `Parser.call()`'s flag machinery."**
`parserDebug` invokes `parser.parser(state)` directly (`debug.ts:361`), not `parser.call(state)`,
and `call` (`parser.ts:437-470`) applies `FLAG_TRIM_WS`/`FLAG_EOF`. Predicted: wrapping a flagged
parser changes its parse. **Measured — REFUTED**: `p.flags === 0` for `string("a").trim()`, and
`all(p, string("b"))` vs `all(p.debug(...), string("b"))` agree on both `isError` and `offset`.
Cause: `trim()` builds `flaggedParser` and sets `flaggedParser.flags = this.flags | FLAG_TRIM_WS`
(`parser.ts:491-496`) — then **returns a different parser** at `:514-517` with flags 0. Nothing in
the shipped tree ever writes a nonzero `flags` (`grep` finds one write, at :496, on the discarded
object). The `debug` bypass is therefore **latent, not live**; and the discovery is a `parser.ts`
dead-allocation finding (a `Parser` constructed and thrown away on every `.trim()` call), out of
this module's axis, flagged for the parser.ts seat.

**R-2 — "`lineNumberWidth(endIdx)` uses an exclusive bound as a display maximum, so wide files
mis-pad."** `debug.ts:65` passes `endIdx`, an exclusive loop bound, into a width function whose
argument reads like a maximum line number. **Checked — REFUTED**: the loop at `:69` runs `i <
endIdx` and displays `ln = i + 1`, so the largest displayed number is exactly `endIdx`. The
computation is correct for every bound, including the clamped `lines.length` case. No defect.

---

## 5. RED-7 touch points (`parsethat-surface-gaps.mjs`, reproduced UNARMED this session)

```
RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default)   undefined
RED  DEBT-1  Parser.prototype.label / .expected combinator               absent
RED  DEBT-1  enableDiagnostics() is process-global (arity)               0 args
RED  DEBT-3  Parser.lazy ceiling (deepest OK = 7761), failure mode       RangeError thrown at depth 7762
RED  DEBT-3  Parser.lazy depth-bound parameter                           arity 1 — (fn) only
RED  GUARD   parseState(non-string) totality                             5/5 throw raw TypeError
RED  GUARD   .parse() failure signal                                     returns undefined
     UNARMED median 60.9 ns/parse
RED — 7 gap(s)
```

Where they touch this module:

| RED row | `debug.ts` involvement |
|---|---|
| DEBT-1 rows 1–2 (labelled failures / no `.label`) | `debug.ts` owns the **render half** of DEBT-1 (`formatExpected` :33, `statePrint`'s expected block :174-179) and delivers it through no door — **C-1**. Even if `.label` landed tomorrow, the consumer still could not render it. |
| DEBT-1 row 3 (`enableDiagnostics()` process-global, arity 0) | the same global is what `statePrint` gates on at `debug.ts:174` (`isDiagnosticsEnabled()`), and what makes `parser.ts:67-68` print — **C-11**. |
| DEBT-3 (`RangeError` at 7,762) | the exact exception that permanently corrupts `debugDepth` — **C-6**. W1 §3.7 exists to keep corpora under this ceiling; a `.debug()` wrapper is the one construct that turns hitting it into lasting state. |
| GUARD row 2 (`.parse()` returns `undefined` on failure) | is *why* a reachable renderer matters: the only failure signal is absence, so the diagnostic view is the sole channel — and it is closed (C-1) or forced to a console (C-11). |
| GUARD row 1 (5/5 non-string → raw `TypeError`) | O-15 PT-07's cure is a JS-boundary invariant **above** parse-that (W2 §3 clause 3). `debug.ts` sits below it and would render nothing for a boundary rejection — no defect, recorded as a non-touch. |

`debug.ts` contributes **0** of the frozen 52-export surface (19 runtime `src/css/index.ts:36-60`,
33 types `:1-35`) — verified by reading value.js `src/css/index.ts` whole. That is the point, not an
exoneration: 383 source lines and 8,444 shipped bytes that no row of the 52 needs, riding in every
subpath (C-7).

---

## 6. What the X·P dual-target algebra would KEEP · WRAP · RETIRE

Read against W2 §3 clauses 1–3, §3c's four live candidates (AC-1 TAGLESS-TWIN · AC-2 CLOSED-IR ·
AC-3 SPAN-ALGEBRA · AC-4 SIBLINGS-ORACLE), and the R-LAW-3 fold *"diagnostics are values, never
effects"* (W2 §2c, O-15 row). **Nothing here authorizes execution; X·P awaits the owner's
begin-word (W2 OP-1), and this is an audit reading, not a wave act.**

**KEEP — `formatExpected` (`debug.ts:33-47`), promoted to a real door.**
Already a pure value→value function over `readonly string[]`; already R-LAW-3-conformant; already
shaped for value.js's `ParseIssue.expected`. It is the only export that survives the algebra's own
laws unmodified. Keeping it means *exporting* it — from `/diagnostics`, beside the `Diagnostic` type
it serves.

**WRAP — `summarizeLine` + `addCursor` + `statePrint` + `formatDiagnostic`, behind a value-returning
renderer.** The current contract is `Diagnostic → string-with-ANSI`, which fails R-LAW-3 by
construction: the escape decision is a process-global effect (C-13) and the product is a terminal
artifact, not a value. The wrapped form the algebra wants is
`render(Diagnostic, src) → { gutterWidth, rows: {n, text, truncatedFrom}[], caret: {row, col},
notes: […] }`, with ANSI applied by an explicit adapter at the consumer boundary — which also
**fixes C-5 by construction**, since a caret expressed as `{row, col}` relative to the rendered rows
cannot disagree with the truncation that produced them. `formatDiagnostic`'s snapshot-reconstruction
idiom (S-3) is the right seam to wrap; keep it.

**RETIRE — `parserDebug` / `Parser.prototype.debug` (`debug.ts:351-383`, `parser.ts:690-696`).**
Three independent kills under the wave's own rules: the un-`finally`'d module counter is an O-8
latch with no reset (C-6, C-8) and a K-6 candidate-killer; the console side effect is an effect where
the algebra demands a value (R-LAW-3); and the documented signature does not exist (C-4). AC-1..AC-4
are all measured through W1's instruments under the one-fresh-process-per-cell discipline (W1 §3.5) —
an instrument that leaks state on the one exception the corpus is depth-bounded against (W1 §3.7) is
an instrument that corrupts its own measurement. If tracing is wanted, it is a harness concern in
`harness/w2/**`, not a combinator on the shipped surface.

**RETIRE — `parserPrint` / `Parser.prototype.toString` in their current form (`debug.ts:245-349`,
`parser.ts:697-699`).** Throws on the band's adjudicated `reject()` node (C-3, DEBT-1 clause 1);
allocates a shadow grammar per call and retains it (C-9); renders every recursion as `lazy` (C-10);
writes an unbounded global (C-8). Note the candidate-specific bearing: **AC-2 CLOSED-IR** would make
grammar-as-data first class, and a printer that must re-invoke thunks to see the graph is exactly the
affordance a closed IR removes — under AC-2 this module's replacement is a fold over the IR, not a
walk over closures. Under **AC-4 SIBLINGS-ORACLE**, whose whole argument is that the shared table is
the algebra carrier, a printer that reads `context.args` is reading the wrong artifact.

**RETIRE — the `ParserState.toString` / `Parser.toString` welds (`state.ts:2,136-138`;
`parser.ts:3,697-699`).** These two conveniences are the sole reason 8,444 bytes of terminal renderer
ride inside `/core` (C-7) and the sole reason C-3's throw is reachable by string coercion. Cutting
them makes `debug.ts` a leaf that a `./debug` subpath can carry honestly — and makes `/core`'s
docstring true for the first time.

**Coverage posture (W2 §11, OP-8 — report, never cure).** Slice coverage of the 52 attributable to
`debug.ts`: **0 of 19 runtime, 0 of 33 types.** Inherited baseline restated, not moved.

---

## 7. Verdict

`debug.ts` is a competently written renderer — S-1 through S-5 are real, and two of my own
hypotheses died against the tree (§4) — attached to the package by the wrong seam and delivered
through no seam at all. On the CONSUMPTION axis it fails at three levels simultaneously: it **cannot
be reached** (C-1/C-2), it **cannot be trusted when reached** (C-3 throws, C-5 mis-points, C-6 leaks,
C-10 elides), and it **cannot be avoided** (C-7 ships it into every subpath, C-11 makes it the
mandatory sink for armed diagnostics). For the routing law's sole downstream — a browser library
whose diagnostics are frozen offset-based values and whose dominant input is a one-line minified
stylesheet — the module's single most useful function is 15 lines long, and it is behind the same
locked door as the rest.

**Defects 16 · Blockers 3 · Superlatives 5 · Refutations 2.**
