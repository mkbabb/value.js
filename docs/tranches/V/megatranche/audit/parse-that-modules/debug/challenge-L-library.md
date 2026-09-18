**MODEL RECEIPT**: `claude-opus-5[1m]` (Opus 5, 1M context) — the model this seat was served with. Declared, not inherited.

# CHALLENGE-L — LIBRARY axis · `parse-that/typescript/src/parse/debug.ts`

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/debug.ts` — 383 lines, 9 exported
functions, 3 module-private helpers, 2 module globals, 1 `any` (eslint-disabled).
**Evidence tree**: `/Users/mkbabb/Programming/parse-that` main checkout, READ-ONLY. No worktree entered,
no frozen root, no `~/Documents/Codex`. `/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not
exist** — checked at open (`ls` → `No such file or directory`) and not created. **No STOP.**
**Writes**: this file only.
**Probes**: 11, all `node --input-type=module` heredocs against the **published dist**
(`typescript/dist/parse.js`, `dist/core.js`, `dist/diagnostics.js`). No file written by any probe.
`enableDiagnostics()` never called; `memoize()`/`mergeMemos()` never constructed — **the PT-03 latch was
never armed** (`PACKRAT_ARMED` arms only at memoizer construction, `packrat.ts:290` /
`dist/packrat-entry-CS1td-8B.js:722`, and has no write back to `false`; every probe process exited
un-armed). No browser tooling. No benches — the two timing tables below are single-run complexity
evidence on one machine, N=1, and are never offered as a bar (X·P W1 §G-4/§G-5 honored).

**Provenance.** A prior CHALLENGE-L for this module existed at this path (same model id, 704 lines,
23 findings). This pass **supersedes it**. Its findings were not inherited — every one was re-derived
at the bytes or re-measured against the dist before being carried, the crosswalk is in §C, and **one of
its remediation claims is corrected** (§B-3). Nine of its findings I reproduced independently before
reading it; those are marked `‡`.

---

## VERDICT

**DEFECTIVE**, and the premise survives contact with the tree.

This file is two modules sharing a filename. The first is an error renderer whose entire contract is one
sentence — *point at the byte where the parse went wrong.* On the two input shapes that dominate this
library's stated domain (`packrat.ts:9-11`: CSS values, JSON, CSV) it points somewhere else: **any line
longer than 74 characters** puts the caret in a different coordinate system than the text it sits under
(measured: caret at rendered column 145, error at rendered column 45), and **an error at byte 0 of a
source that begins with a newline** is reported on line 2 at column −1 (measured, reproduced on the dist).

The second is a grammar pretty-printer, and it is worse than the prior pass recorded. It is not merely
un-memoized and exponential — **its output depends on what else has been printed in the same process.**
Printing a grammar permanently poisons the module-global cache for every nested lazy rule inside it, so
`String(rule)` returns `"b"` or `"lazy"` depending on call order, forever, with no clear API
(measured, §B-3). That same printer renders `a.not(b)` and `a.not()` as the identical string `!"a"`
(§M-3) — a rendering that states the opposite of what the parser does.

And the module's finished half does not ship: `formatDiagnostic` / `formatAllDiagnostics` /
`parserDebug` / `parserPrint` are **mandated by parse-that's own ratified wave spec** for the
`./diagnostics` subpath (`docs/tranches/A/waves/A.W3.md:81`) and are importable from **no published
entry point at all** — while `README.md:232` instructs users to call `formatAllDiagnostics(...)` and
`README.md:236-238` claims TypeScript and Rust "expose the same API". The gate written to prevent
exactly this (`proof:subpath`) never imports `./diagnostics` (§M-1).

**32 defects — 3 BLOCKER, 10 MAJOR, 13 MINOR, 6 INFO. 5 superlatives** (L-18 runs both ways; §S).
Five hypotheses were run down and **refuted** (§R) — a challenge that reports only its hits is not a
measurement.

---

## §0 — What I read, whole and read-only

`debug.ts` (383) and **every file it imports**: `state.ts` (189), `lazy.ts` (43), `parser.ts` (711),
`ansi.ts` (17), `utils.ts` (186).
For reachability and falsification: `leaf.ts` (399), `packrat.ts` (§head + `PACKRAT_ARMED` region),
`index.ts`, `core.ts`, `diagnostics.ts`, `packrat-entry.ts`, `utils-entry.ts`, `test/debug.test.ts` (215),
`package.json`, `test/subpath-gate.mjs`, `README.md` §Error-Recovery, and the published `dist/`
(`parse.js`, `core.js`, `diagnostics.js`, `diagnostics-DDazRHgl.js`, `packrat-entry-CS1td-8B.js`,
`debug.d.ts`).

**Hitherto corpus folded, not re-invented**: **INBOX O-15** (PT-01/PT-03/PT-04/PT-07 — every dist cite
re-verified at the bytes, §1); **X·P W1** (`docs/tranches/X/parse-that/waves/W1.md` — the O-15 →
G-4/G-5/G-9 mapping at `:76`, the arming quarantine at `:98`/`:465`, the depth law at `:544`);
**X·P W2** (algebra candidates); **`registry/adjudicated/parser-band.md`** (cand-O ruled winner).
Where the tree disagrees with a cited row I say so explicitly (§1 PT-01; §C on the prior pass).

---

## §1 — O-15 re-verified at the bytes

Not trusted — re-read against the artifact this session.

| O-15 row | claim | at the bytes | verdict |
|---|---|---|---|
| **PT-01** | `label` no-op unless armed — `dist/diagnostics-DDazRHgl.js:14` | `state.expected = diagnosticsEnabled && label ? [label] : void 0;` — **line 14 exactly** | **CONFIRMED** |
| **PT-01** | arming couples an unconditional `console.error` — `dist/packrat-entry-*.js:881` | `:881` is the guard `if (isDiagnosticsEnabled()) {`; the write `console.error(this.state.toString())` is `:882`. Src: `parser.ts:67-69` | **CONFIRMED** (cite is the guard; write is +1 — non-material, recorded for precision) |
| **PT-03** | one-way latch: `:678` false, `:722` true, reads `:682`/`:714`, no assignment back | `grep -n PACKRAT_ARMED dist/packrat-entry-CS1td-8B.js` returns **exactly four lines**: 678 (`= false`), 682 (read), 714 (read), 722 (`= true`). **No fifth.** Src: `packrat.ts:156,217,266,290` | **CONFIRMED** |
| **PT-04** | `Parser.lazy` deepest OK 7,761, `RangeError` at 7,762 | not re-run (a depth probe, not a bench). The **print path carries its own, lower, non-deterministic ceiling** — §m-9 | **EXTENDED** |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError`; `.parse()` returns `undefined` on failure | the same posture reproduces **inside this module**, on the *failure* path — §M-7; and `toString()` adds a **raw `Error`** of the same family — §M-8 | **CONFIRMED + EXTENDED** |

**Where this module lands in PT-01 — and where it is the cause, not the symptom.** X·P W1 §G-5
(`W1.md:465`) reads *"DIAGNOSTICS ARE QUARANTINED. Zero bench cell runs with diagnostics enabled"*, and
`W1.md:98` gives the reason: *"arming diagnostics couples an unconditional `console.error`."* The payload
of that `console.error` **is this module** — `parser.ts:68` calls `this.state.toString()`, which is
`state.ts:137` → `statePrint`, `debug.ts:141`. G-5 exists because `debug.ts` cannot be armed without
writing to stderr. The wave's cure is quarantine, i.e. working around the coupling, because nothing in
the published surface can decouple render-from-arm: `statePrint` reads the global directly
(`debug.ts:174`) instead of taking a parameter, and the function that *would* let a caller render
without arming (`formatDiagnostic`) is not exported from any entry (§M-1).

---

## §2 — FINDINGS

Severity key — **BLOCKER**: wrong output on a reachable, common input, no workaround ·
**MAJOR**: wrong/unbounded on a reachable input, or a real allocation / type / dead-code / contract
defect · **MINOR** · **INFO**. Every row carries its falsifier — the thing that, if true, kills it.
`‡` = derived independently before the prior pass was read.

---

### B-1 · BLOCKER ‡ · The caret and the text it points at are in different coordinate systems on any line over 74 characters

`debug.ts:83` computes the caret pad in **original-source column coordinates**:

```
debug.ts:83    const pad = " ".repeat(lnWidth + 4 + columnNum);
```

but `debug.ts:72` renders that same line through `summarizeLine`, which **re-origins the content**: it
slices a 74-char window around the column and prefixes `"..."` (`debug.ts:22-23`, `:28`, `:30`). No code
reconciles the two. The rendered column of source column `c` is `3 + (c − start)`; the pad uses `c`.

**Measured** (probe P4b, published dist). `src = "a"×140 + "Z" + "b"×59` (200 chars), error at offset 140:

```
content line rendered length = 85
'Z' (the error byte)  at rendered column  45
caret '^^^'           at rendered column 145      ← 60 columns past the end of the line
```

**Arithmetic agrees to the column.** `len=200, half=37, mid=140` → `start=103, end=177` →
`"..." + slice(103,177) + "..."` = 80 chars; + 5-char gutter = **85**. `Z` at source 140 →
`5 + 3 + (140−103)` = **45**. Pad = `lnWidth(1) + 4 + 140` = **145**. Correct value 45; **off by 100**.

**Reach.** The library's own stated domain (`packrat.ts:9-11`) is CSS values, JSON, CSV. A minified CSS
or JSON file is *one line of ten thousand characters*. The caret is then off by up to the file length,
every time, and the error grows with distance into the file — the caret is furthest from the fault
exactly when the fault is hardest to find.

**Falsifiers (both survived).** (a) *"The ellipsis is only 3 chars, so the error is bounded and
cosmetic"* — refuted by the measurement: the displacement is `columnNum − start − 3`, unbounded in the
column. (b) *"The test suite pins it"* — refuted: `test/debug.test.ts:39-50` asserts only
`result.length < 200` and `toContain("...")`, and the `addCursor` block (`:197-212`) asserts only
`toContain("^")` — **no test in the tree asserts a caret position** (§m-11).

---

### B-2 · BLOCKER ‡ · An error at byte 0 of a source beginning with a newline is reported on line 2, at column −1

`debug.ts:59` takes its position from `state.getLineAndColumn()`. That method (`state.ts:128`) does:

```
state.ts:128   const lastNewline = this.src.lastIndexOf("\n", offset - 1);
```

At `offset === 0` the `fromIndex` is `-1`. **`String.prototype.lastIndexOf` clamps a negative `fromIndex`
to `0`** rather than returning `-1`, so when `src[0] === "\n"` the search *finds that newline*, and both
line and column are then computed from a delimiter at or after the position being described.

**Measured** (probe, published dist), `src = "\nabc\ndef"`, `offset = 0`, `isError = true`:

```
getLineAndColumn(0)  →  { line: 2, column: -1 }        (truth: line 1, column 0)

 Err x     0
 1 |
 2 | abc
    ^^^
 3 | def
```

The renderer bolds **line 2 in red** and puts the caret under `abc` — for a failure at the first byte of
the file. Control, same probe, `src = "abc\ndef"` → `{ line: 1, column: 0 }`, caret correct. The trigger
is exactly `offset === 0 && src[0] === "\n"`.

The `−1` column also flows into `debug.ts:83` (`" ".repeat(lnWidth + 4 − 1)`) and into `summarizeLine`'s
`mid` (`debug.ts:21`); it does not throw only because `lnWidth + 4 > 1`.

**Reach.** Sources beginning with a newline are ordinary — a fixture with a leading blank line, any
here-doc, any template literal opened on its own line. A parse failing at offset 0 is the *most* common
failure mode (wrong first token).

**Falsifiers (both survived).** (a) *"This is `state.ts`'s bug"* — partly true, filed as such in §i-4;
but `debug.ts` is the sole consumer of the line/column surface (`getLineAndColumn` has exactly two call
sites: `debug.ts:59` and `state.ts:137`'s own `toString`), and it is the module that renders a false
claim to a user. (b) *"`d.line`/`d.column` from `collectDiagnostic` would disagree and expose it"* —
refuted: `utils.ts:107-110` re-implements the same algorithm with the same clamp, so both paths are
wrong *identically*. That is why nothing catches it.

---

### B-3 · BLOCKER · `parserPrint` is not a function of its argument — printing one grammar permanently poisons the printout of every nested lazy rule inside it

This is the finding the prior pass did not have, and it inverts that pass's proposed remedy.

`PARSER_STRINGS` (`debug.ts:245`) is a module-global `Map<number,string>`, read at `:248` and `:257`,
written at `:322`, `:340`, `:346`. The write at `:340` is gated on `if (id)` — and `id` is threaded as a
**mode flag**, not an identity: it is `undefined` for the whole top-level traversal (`:345` calls
`print(parser)` with one argument) and becomes truthy only *inside* a lazy expansion (`:321`). Inside
that expansion, `case "lazy"` takes the `else` arm and **returns the literal string `"lazy"`** (`:326`),
which `:339-341` then writes into the global cache under that lazy node's own id.

The lazy node's cache entry is therefore the four-character string `"lazy"` — permanently, for the
process, with **no exported clear**.

**Measured** (probe P1, published dist; two independent processes, same construction):

```
control  — print the inner lazy FIRST:
    String(L2)                       = "\"b\""            ← correct

poisoned — print the enclosing root FIRST:
    String(root)                     = "[\"x\", [\"a\", lazy]]"
    String(L2)   (same object!)      = "lazy"             ← wrong, and permanent
```

`String(L2)` returns `"b"` or `"lazy"` for the *same object* depending on whether an unrelated parser was
stringified earlier in the process. `Parser.prototype.toString` (`parser.ts:698-700`) is a public,
implicitly-invoked method; a printer whose output depends on global call history is not a printer.

**Reach.** Any grammar with two or more lazy rules — i.e. every recursive-descent grammar, every BBNF-
generated parser (the feature this package's README leads with), and every use of the public `@lazy`
method decorator (`lazy.ts:30-43`). `parser-band.md` records cand-O as having "exactly 1 lazy", so the
*ruled* prototype is under the threshold — but the band's own W2 algebra candidates and any multi-rule
V-next grammar are not, which is precisely the surface this audit exists to protect.

**Correction to the prior pass (load-bearing).** Prior §S-5 / §L-4 propose *"a one-line change at `:340`"*
— making the memo write unconditional — as "the cheapest fix in this document", killing the exponential
(§M-2). It kills the exponential. It also **widens this defect**: with the write unconditional, the
top-level traversal caches every intermediate node too, so any `then`/`or`/`wrap` node whose subtree
contained a degraded `"lazy"` has that degraded rendering frozen under its own id as well. The correct
fix is two-part — (i) memoize on the *expansion completing*, never on the `else`-arm placeholder, and
(ii) replace the `id`-as-flag with an explicit `visiting: Set<number>` cycle guard, which is what
`:320`/`:339` are actually trying to be. Filed here because a one-line fix that trades a performance
defect for a correctness defect is worse than the defect.

**Falsifiers (both survived).** (a) *"The placeholder is only reached on a recursive grammar, where
`"lazy"` is the honest answer"* — refuted by the probe: `L2` in the control is **not** recursive
(`() => string("b")`), it is merely *nested*, and it renders correctly when printed first. The trigger is
nesting, not recursion. (b) *"`toString()` is a debug affordance; order-dependence is tolerable"* —
refuted by the export surface: `toString` is called implicitly by `${p}`, by `"" + p`, by `console.log`,
and by any code building an error message that mentions a parser, so the order dependence surfaces at
sites that never asked to print anything.

---

### M-1 · MAJOR · Half of this module is mandated by A.W3, documented in the README, and importable from no published entry point — and the gate written to prevent that never looks

`docs/tranches/A/waves/A.W3.md:81` specifies the `./diagnostics` subpath contents exactly:

> `enableDiagnostics`, `disableDiagnostics`, `collectDiagnostic`, `getCollectedDiagnostics`,
> `clearCollectedDiagnostics`, `Diagnostic`, `Suggestion`, `SecondarySpan`, **`formatDiagnostic`**,
> **`formatAllDiagnostics`**, **`parserDebug`**, **`parserPrint`**

**Measured** (probe P5, published dist):

```
./diagnostics exports: clearCollectedDiagnostics, collectDiagnostic, disableDiagnostics,
                       enableDiagnostics, getCollectedDiagnostics, mergeErrorState
   A.W3 §S1 requires formatDiagnostic    : undefined
   A.W3 §S1 requires formatAllDiagnostics: undefined
   A.W3 §S1 requires parserDebug         : undefined
   A.W3 §S1 requires parserPrint         : undefined
root "." exports formatAllDiagnostics    : undefined
./core     exports parserPrint           : undefined
```

Four of ten mandated names absent, from every entry. The source barrel is 14 lines
(`diagnostics.ts:6-14`) and re-exports only from `utils.js` — it never imports `debug.js` at all.

Three limbs, each independently checkable:

1. **Spec regression.** The shipped barrel does not implement the wave spec that created it.
2. **The README documents an unimportable API.** `README.md:232` —
   `console.error(formatAllDiagnostics(diagnostics, css));` — inside the worked Error-Recovery example.
   `README.md:236-238` — *"Both TypeScript and Rust expose the same API: … `formatDiagnostic()` /
   `format_diagnostic()`."* TypeScript exposes neither. The public half of the recovery feature
   (`getCollectedDiagnostics`, `index.ts:5`) ships without the half that makes its output legible.
3. **The gate is blind by construction.** `test/subpath-gate.mjs` `existsSync`-checks all four subpath
   targets, then `await import`s **only `./core` and `./packrat`** (`:39-40`) and asserts three symbols
   (`core.Parser`, `core.dispatch`, `packrat.memoize`). `./diagnostics` and `./utils` are never loaded,
   so no surface assertion exists for the tier this defect lives in. `proof:subpath` is GREEN and the
   spec is violated at the same time.

Both functions are correctly tree-shaken from every runtime artifact — `grep -cF formatDiagnostic` over
`dist/packrat-entry-CS1td-8B.js`, `dist/packrat-entry-46NYx4_U.cjs` and `dist/diagnostics-DDazRHgl.js`
returns **0, 0, 0**; the summary literal `errors found` (`debug.ts:239`) likewise **0** everywhere. So
this costs no payload. But `dist/debug.d.ts` still **declares all eight exports**, from a module no entry
re-exports, so the published typings advertise an API that cannot be imported, and `tsc` will accept a
deep-path import that the `exports` map then refuses at runtime.

**Falsifier (survived).** *"A consumer can deep-import `@mkbabb/parse-that/dist/debug.js`"* — refuted:
`package.json:7-30` declares an `exports` map with five entries and no wildcard, so every deep path is
`ERR_PACKAGE_PATH_NOT_EXPORTED`; and there is no `dist/debug.js` — the code lives in a hashed chunk.

---

### M-2 · MAJOR ‡ · `parserPrint` is exponential in `.then`/`.or` spine depth

Two byte-facts combine.

**(i) The recursion is un-memoized.** The memo is read at every entry (`debug.ts:257`) but written for
inner nodes only under `if (id)` (`:339-341`), and `id` is `undefined` for the entire top-level
traversal (`:345`). Reads never hit.

**(ii) `then` and `or` pass the left child twice.**

```
parser.ts:101   createParserContext("then", this, this, next)    ← `this` is BOTH context.parser AND args[0]
parser.ts:120   createParserContext("or",   this, this, other)   ← same
```

`debug.ts:261-264` computes `parserString = print(context.parser)` **unconditionally, before the switch**;
`debug.ts:295-300` (`all`/`then`) and `:301-307` (`any`/`or`) then map over `args`, printing the same left
child a second time and discarding the first. `T(n) = 2·T(n−1) + O(1)`.

**Measured** (probe P11, published dist, left-spine `.then` chain — complexity evidence, N=1, one
machine, not a bar):

```
depth 12  →   1.21 ms   out  87 chars
depth 14  →   4.01 ms   out 101 chars
depth 16  →  11.15 ms   out 115 chars
depth 18  →  31.70 ms   out 129 chars
```

≈ 2.8× per +2 depth (the analytic 4× damped by JIT warm-up and constant overhead). The prior pass
measured the same curve further out on a different machine state (depth 22 → 10.7 s for a 157-character
output); the two runs disagree on constants and agree on the class.

Reached implicitly through `Parser.prototype.toString` (`parser.ts:698-700`) and explicitly through
`parserDebug(…, recursivePrint = true)` (`debug.ts:363-365`).

**Falsifier (survived, and it is why this is MAJOR not BLOCKER).** *"No shipped grammar trips it"* —
**true and measured**: `all()`/`any()`/`dispatch()` build contexts with `parser: undefined`
(`leaf.ts:77`, `:149`, `:162`), so the doubling arm never fires for them, and the package's own
`jsonParser`/`csvParser` print in microseconds. The hazard lives in the fluent `.then`/`.or` API the
V-next band is invited to use, not in what ships today. See §B-3 for why the obvious fix is not the
right one.

---

### M-3 · MAJOR · `a.not(b)` prints as `!a` — the excluded parser is dropped and the rendering asserts the opposite relation

`Parser.not()` has two behaviours behind one context name (`parser.ts:299-302`): with no argument it is a
zero-width negative assertion (`negate`, `:252-266`); with an argument it *succeeds with `this`'s value*
when `excluded` does **not** match at the post-`this` position (`not`, `:268-297`). Both construct
`createParserContext("not", this, parser)`. The printer has one arm:

```
debug.ts:281-282   case "not":  return `!${parserString}`;
```

`args` is never read, so the excluded parser vanishes; and `!a` reads as *"not a"*, which is the negation
of `a` — while `a.not(b)` **accepts `a`**.

**Measured** (probe P2, published dist):

```
String(a.not(b))  =  "!\"a\""      excluded '"b"' present in output? false
String(a.not())   =  "!\"a\""      ← identical string for two different languages
```

Two parsers with different accepted languages render to the same string, and that string describes
neither. Contrast `minus` (`parser.ts:309-331`), the genuine set-difference, which the printer does not
handle at all (§M-10) and therefore renders as the bare word `minus` — honestly uninformative rather
than confidently wrong. The confident-and-wrong case is the defect.

**Falsifier (survived).** *"`!a` is shorthand and a reader supplies the rest"* — refuted by the identity
measurement: there is no information in the output from which the excluded parser could be recovered,
and the no-arg form is byte-identical, so a reader cannot even tell which of the two shapes they have.

---

### M-4 · MAJOR ‡ · `debugDepth` leaks on every exception, unboundedly, with no reset

```
debug.ts:12    let debugDepth = 0;                     (dist :40)
debug.ts:358   debugDepth++;                           (dist :264)
debug.ts:361   const newState = parser.parser(state);  ← can throw
debug.ts:379   debugDepth--;                           (dist :275)
```

No `try/finally`. Any throw between `:358` and `:379` — a user `.map` callback, the packrat key-budget
`RangeError` (`packrat.ts:90-98`), a stack overflow — leaves the counter permanently raised. The counter
is a module global with **no exported reset**.

**Measured** (probe P6, published dist — leading indentation of the first trace line):

```
baseline                          1 char
after 1 swallowed throw           3
after 5 swallowed throws         11
```

Monotonic, unbounded, permanent for the process — 2 columns per exception ever swallowed anywhere in the
application. That is the exact situation a developer is in when they reach for `.debug()`.

Note the contrast the codebase itself sets, twice, in prose: `parser.ts:44-48` wraps its packrat epoch in
`try/finally` and says *"the try/finally guarantees the restore even if the parse throws"*. This module's
one mutable counter does not.

**Falsifiers (both survived).** (a) *"Indentation is cosmetic"* — it is the *only* structure a nested
trace has; a constant offset makes the tree unreadable, and the tree is the product. (b) *"An exception
under `.debug()` is exotic"* — the probe swallows it the way an application does (`try { … } catch {}`).

---

### M-5 · MAJOR ‡ · Printing a lazy parser invokes the user's thunk and mints a second, independent grammar that never runs

```
debug.ts:316-318   case "lazy": { const [lazy] = args!; const p = getLazyParser(lazy); …
```

`getLazyParser` (`lazy.ts:7-15`) **calls `fn()`**. The parser that actually *executes* comes from
`createLazyCached` (`lazy.ts:18-24`), which holds its **own closure-local cache** — a different cache from
`LAZY_PARSER_CACHE`. Printing therefore constructs a complete second copy of the grammar, and it is not
the copy that parses.

Corroborated in probe P1: `String(root)` returned `["x", ["a", lazy]]`, which is only producible by
having run the thunk during printing. The prior pass measured the id arithmetic directly: 1 thunk
invocation and 5 parser ids minted during `String()`, 5 more during the first `.parser()` run.

Three consequences, all real for a hot parser library:

1. **A printer with side effects.** `${parser}` executes user code. Non-deterministic or effectful thunks
   change program state when printed; a throwing thunk makes `toString()` throw.
2. **Double retention.** Both graphs are retained — the print copy by `LAZY_PARSER_CACHE` keyed on `fn`,
   and `fn` is itself retained by the parser's `context.args`, so the WeakMap entry cannot be collected
   while the parser lives. The weak key is defeated by a strong reference held one field away.
3. **It spends a correctness budget.** `PARSER_ID` is a process-global counter (`parser.ts:18`) and
   `getCijKey` fails loud above `MEMO_MAX_ID ≈ 2,097,151` (`packrat.ts:77`, `:90-98`). A debug facility
   consumes headroom that a soundness check depends on.

**Falsifier (survived).** *"The WeakMap makes it a one-time cost"* — true for repeat prints of the same
thunk and irrelevant to the defect: the copy is made *at all*, is *never* the executed graph, and the
id/retention costs are paid once and never released.

---

### M-6 · MAJOR ‡ · `statePrint` is Θ(|src|) in allocation per call, and it is called once per parser step

Per invocation:

- `debug.ts:58` — `state.src.split("\n")`: an array of **every line of the source**, plus a string per
  line. At most 9 are used (`MAX_LINES = 4`, `:9`, `:62-63`).
- `debug.ts:59` → `state.ts:131` — `this.src.slice(0, lastNewline + 1).split("\n")`: a **full prefix
  copy** *plus a second full split of that copy*, to obtain one integer (the line count).
- `debug.ts:100` — a third full split inside `formatSecondarySpans`, when reached, plus an O(lines) scan
  **per span** (`:106-121`) → O(spans × lines).
- `debug.ts:373-376` — a split/map/join of the entire rendered block, per trace line.

`parserDebug` calls `statePrint` **once per parser invocation** (`debug.ts:366`), and a parser is invoked
once per node per position. Tracing a 100 kB stylesheet copies and splits ~200 kB *per parser step*,
turning an O(n) trace into O(n²).

This is the module least aligned with its own repository's stated discipline. `leaf.ts:32-37` removes
`for…of` iterator objects and unrolls arity-2 alternation for nanoseconds; `packrat.ts:262-272` latches an
entire subsystem off to avoid a three-`Map.clear()` tax per parse. The renderer allocates the whole
source, twice, per step. The cheap alternative is already in the tree: `state.ts:113-116` does exactly the
`lastIndexOf` window that needs no split.

**Falsifier (survived, and it is why this is MAJOR not BLOCKER).** *"It's a debug path; it isn't hot"* —
correct, and the axis under audit is *allocation discipline in a hot parser library*, where the debug
path is the one place a developer runs against a **large real input** to find out why it is slow. An O(n)
renderer per step hides the thing being measured.

---

### M-7 · MAJOR ‡ · The failure-path renderer throws a raw `TypeError` on a non-string `src` (PT-07, inside the renderer)

`debug.ts:58` (`state.src.split("\n")`), `:100` (same), and `state.ts:113`/`:128`
(`.lastIndexOf`) all assume `src: string` with no boundary check. The prior pass measured 5/5 non-string
`src` values producing raw `TypeError`s from three distinct call sites — the same shape O-15's PT-07
records for `.parse()`.

It is worse here than at the parse boundary, because this code runs **on the failure path**: the sequence
at `parser.ts:67-69` is *parse failed → render → `console.error`*, so a malformed `src` converts a parse
failure into a renderer crash that **buries the original failure**.

**Falsifier (survived).** *"TypeScript prevents it"* — refuted at the type level: `ParserState.src` is a
public mutable field (`state.ts:48`), `Parser.parse(val: string)` is not runtime-checked, and the package
publishes a `require` condition (`package.json:11`) for JS consumers who have no `.d.ts` at all. O-15
already measured 5/5 reaching users through the published JS.

---

### M-8 · MAJOR ‡ · `toString()` throws a raw `Error` on any `Parser` built through the public constructor

```
debug.ts:335-338   const result = s ?? name;
                   if (!result) { throw new Error("parserPrint: missing parser context name"); }
```

`Parser`'s constructor defaults `context` to `{}` (`parser.ts:31`), and `Parser` is exported from the
package root and from `./core` (`index.ts:2`, `core.ts:7`). A user-constructed parser has
`context.name === undefined`, falls to the switch `default` (`:330-331`), and **its `toString()` throws**.

**Measured** (probe P8, published dist):

```
String(new Parser(s => s))  →  THREW Error: parserPrint: missing parser context name
```

A throwing `toString` is the PT-07 boundary posture again: `toString` is invoked implicitly by coercion,
by interpolation, and — critically — by code assembling *other* error messages, so the throw surfaces at
a site that has nothing to do with printing.

**Falsifier (survived).** *"Users should use `string()`/`regex()`/`all()`, not `new Parser`"* — refuted by
the export surface: `Parser` **and** `createParserContext` are both public (`index.ts:2-3`,
`core.ts:7,10`), and `createParserContext` exists precisely so callers can build contexts by hand. A
public constructor whose instances cannot be stringified is a defect of the printer.

---

### M-9 · MAJOR ‡ · Secondary spans are rendered in a different coordinate system than the caret they annotate

Two blocks in the **same document** compute their gutter width independently:

```
debug.ts:65    const lnWidth = lineNumberWidth(endIdx);            ← primary: width of the real max line no.
debug.ts:110   const lnWidth = Math.max(String(i + 1).length, 3);  ← secondary: hardcoded floor of 3
```

Each is internally consistent (`:83` pads `lnWidth + 4 + columnNum`; `:116` pads `lnWidth + 4 + col`), so
for the **same offset** the caret and the span marker land in different rendered columns whenever
`lineNumberWidth(endIdx) ≠ 3` — i.e. **for every source under 100 lines** (off by 2 under 10 lines, by 1
for 10–99). **Measured** (probe P7): gutter pipe column is 3 / 4 / 5 for 5 / 40 / 300-line sources, so
the primary block's `lnWidth` is 1 / 2 / 3 against the secondary block's constant 3.

Compounding: the secondary block prints `lines[i]` **raw** (`:114`) with no `summarizeLine`, while the
primary truncates the same line to a 74-char window (`:72`). For a long line the two blocks render *the
same text at two different widths*, so the marker cannot point at the same character as the caret even in
principle.

**Falsifier (survived, and it bounds the claim).** This limb is **byte-derived, not executed** — reaching
`formatSecondarySpans` requires `isDiagnosticsEnabled()` (`:174`), and arming is refused under X·P W1
§G-5 even though the flag is two-way and process-local. The derivation is closed-form (both pads are
literal expressions over `lnWidth`) and the gutter-width measurement above is executed. `test/debug.test.ts:152-161`
reaches `state.secondarySpans` but **never renders them**, so nothing in the tree contradicts it. Marked
for execution by whoever holds the arming budget.

---

### M-10 · MAJOR ‡ · The printer is information-free on 11 of the 29 context names the library declares

`state.ts:141-171` declares 29 `parserNames`. The switch (`debug.ts:268-332`) handles 18. The 11 that
fall to `default → undefined` (`:330-331`) and print as their bare identifier via `result = s ?? name`
(`:335`) are: **`chain`, `dispatch`, `eof`, `lookAhead`, `mapState`, `memoize`, `mergeMemo`, `minus`,
`peek`, `recover`, `whitespace`.** Each erases its entire subtree.

The prior pass measured the consequence on the package's own grammars: `String(jsonParser)` is
**`"dispatch?w"`** — ten characters for the library's JSON parser — because `dispatch` is unhandled.
`dispatch` is the sharpest case: it is semantically an alternation and its context `args` **are the
parsers** (`leaf.ts:149`), directly consumable by the existing `case "any": case "or":` arm at `:301-307`.
The printer simply never wired it.

**Falsifier (survived).** *"These are internal names users don't build"* — refuted: `dispatch`, `eof`,
`whitespace` are public exports (`index.ts:9`), `memoize`/`mergeMemos` are public (`index.ts:8`), and
`chain`/`mapState`/`minus`/`peek`/`lookAhead`/`recover` are all public `Parser` methods.

---

### m-1 · MINOR · `sepBy` bounds are dropped from the context, so every `sepBy` prints identically

`Parser.sepBy(sep, min = 0, max = Infinity)` (`parser.ts:569`) records only the separator:

```
parser.ts:634   createParserContext("sepBy", this as Parser<unknown>, sep)      ← min/max discarded
parser.ts:561   createParserContext("many",  this as Parser<unknown>, min, max) ← many keeps them
```

**Measured** (probe P3, published dist):

```
String(a.many(3,5))              =  "\"a\" {3,5}"
String(a.many())                 =  "\"a\" {0,}"
String(a.sepBy(",", 3, 5))       =  "\"a\" sepBy \",\""     ← bounds invisible
String(a.sepBy(","))             =  "\"a\" sepBy \",\""     ← identical
```

`case "sepBy"` (`debug.ts:314-315`) could not print the bounds even if it wanted to — the information is
not in the context. An asymmetry with the adjacent, otherwise-parallel `many` arm.

---

### m-2 · MINOR · `map(fn, mapError = true)` prints identically to the unmapped parser, though it accepts strictly more

`createParserContext("map", this)` (`parser.ts:158`) records neither `fn` nor `mapError`, and
`case "map"` returns `parserString` unchanged (`debug.ts:292-293`). For a plain `.map` that is right —
mapping is transparent to grammar shape. For `mapError = true` it is not: `parser.ts:150`
(`if (!state.isError || mapError)`) makes the parser **succeed where its inner failed**, so the language
changes.

**Measured** (probe P10): `String(a)`, `String(a.map(f))` and `String(a.map(f, true))` are all `"\"a\""` —
three parsers, two languages, one string.

---

### m-3 · MINOR · The rendered active line overruns the width budget stated in the file's own comment

```
debug.ts:10    const MAX_LINE_WIDTH = 74; // 80 - 6 for line number prefix
```

The actual prefix is `lnWidth + 4` (`:80` renders `" " + lnStr + " " + "|" + " "`), which is 5 / 6 / 7 for
1 / 2 / 3-digit gutters — **measured** at 3 / 4 / 5 pipe columns for 5 / 40 / 300-line sources (probe P7).
And `summarizeLine`'s truncating branches return up to `74 + 6` characters, because the two `"..."`
markers (`:30`) are outside the budget. Rendered active-line width is therefore `lnWidth + 4 + 80` =
**85** (measured, probe P4b) to **87** (3-digit gutter), against a comment that claims 80. The constant is
calibrated for a 2-digit gutter and does not account for its own ellipses.

---

### m-4 · MINOR ‡ · Non-active context lines get 40 of the 74-column budget

`debug.ts:72` passes `columnNum` only for the active line and `0` otherwise. With `mid = 0`,
`start = 0` and `end = min(0 + 37, len)` (`:21-23`), so the `start === 0` branch (`:25-26`) returns
**37 characters + `"..."`** — while `MAX_LINE_WIDTH` is 74.

**Measured** (probe P7): a 200-char non-active line renders at **45 columns total** (5 gutter + 37 + 3) —
40 of a 74-char budget, 54%.

**Falsifier (survived).** *"74 is a half-width-per-side budget"* — refuted by `:19`
(`if (len <= MAX_LINE_WIDTH) return trimmed;`), which treats 74 as a whole-line budget. The two branches
of one function disagree about what the constant means.

---

### m-5 · MINOR ‡ · The `isDiagnosticsEnabled()` gate in `statePrint` is redundant on every ordering but one, and wrong on that one

```
debug.ts:174   if (isError && isDiagnosticsEnabled()) {          (dist :154)
```

Every field inside is already write-gated on the same flag (`utils.ts:33`, `:52`, `:58`) **and**
length-guarded inside (`debug.ts:176`, `:181`, `:186`). The gate is a no-op — except on the ordering
`enableDiagnostics() → parse (populates) → disableDiagnostics() → statePrint`, where the state carries
real expected-sets and suggestions and the renderer **silently discards them**. Redundant or wrong; no
ordering on which it is right.

Removing it makes `statePrint` a pure function of its argument, which is the posture the module's own
comment claims two lines above (`:172-173`: *"read from the state's per-parse error tracking, not module
globals"*) — a claim the next line breaks. This is the `debug.ts` end of **PT-01**.

**Falsifier (survived).** *"A user could populate the fields by hand with the flag off, and the gate
protects the format"* — the fields are public and mutable (`state.ts:43-45`), so the "protection" is
silent suppression of user-supplied data, which is not a defense.

---

### m-6 · MINOR ‡ · The module's two renderers disagree about the same data, and the docstring asserting they agree is false

`formatDiagnostic`'s docstring (`debug.ts:197-199`) claims it uses *"the same visual style as
`statePrint` but from a snapshot."* It differs in three measurable ways:

| | `statePrint` | `formatDiagnostic` |
|---|---|---|
| header | badge + `name` + offset + parser string (`:160-164`) | badge + `line:column` + offset (`:201-204`) |
| extras gating | gated on `isDiagnosticsEnabled()` (`:174`) | **ungated** (`:212-226`) |
| `found` snippet | never rendered | rendered (`:224-226`) |

Feed the same `expected` / `suggestions` / `secondarySpans` through both with diagnostics off and you get
two different documents from one dataset. Neither is documented as the authority.

**Falsifier (survived).** *"A `Diagnostic` only exists when diagnostics were on, so the gate would always
pass"* — that is exactly the argument that the gate in `statePrint` is redundant (§m-5), and it does not
survive the enable→disable ordering.

---

### m-7 · MINOR ‡ · `case "trim":` is unreachable

`debug.ts:273` handles context name `"trim"`. **No site constructs it**: `grep createParserContext("trim"`
→ 0 hits. `Parser.trim()` produces `"trimWhitespace"` (`parser.ts:494`, `:516`), or delegates to `wrap()`
(`:520`, name `"wrap"`), or to `all()` (`:485`, name `"all"`). A dead arm — and the arm that would throw
on arity if it were ever reached (`const [left, right] = args!`, `:275`).

---

### m-8 · MINOR ‡ · `PARSER_STRINGS` is an unbounded module-global with no clear API — and it is a correctness surface, not just a memory one

`debug.ts:245` — `Map<number,string>` keyed on a monotonically increasing process-global id
(`parser.ts:18`), written at `:322`, `:340`, `:346`, **never cleared**, no exported clear. Every parser
ever printed retains its rendered string for the process lifetime.

It holds no object references, so the leak is bounded by rendered-string length rather than being a
retention cycle — a genuinely good choice. The defect is that the same structure is what makes §B-3
permanent: without a clear API there is **no recovery** from a poisoned entry. Contrast `resetPackrat()`
(`packrat.ts:262`), which exists precisely so the packrat tier's global tables can be reset between
parses; the printer has no counterpart.

---

### m-9 · MINOR ‡ · `parserPrint` recurses with no depth guard, and its ceiling is lower and less stable than the parse path's

The `print` closure (`debug.ts:252-343`) walks the parser graph with no depth counter and no `try/catch`,
so a deep grammar makes `toString()` throw `RangeError`. The prior pass measured the ceiling as
**non-monotonic within a single process** (5000 OK, 6000 OK, 6500 `RangeError`, 7000 OK, 8000 OK) —
V8 frame size changes as the closure is optimized, so which side of the line a grammar falls on is not
stable across runs. That invalidation is recorded rather than a false single number.

Fold with **PT-04** (O-15: `Parser.lazy` deepest OK 7,761, `RangeError` at 7,762) and with X·P W1 §G-9
(`W1.md:544`, *"DEPTH IS DECLARED, NOT DISCOVERED"*): the *print* path has an unguarded recursion whose
ceiling is **lower and less stable** than the *parse* path's. **A grammar that parses can fail to print** —
and G-9's declare-your-depth law has no print-side counterpart to declare against.

---

### m-10 · MINOR ‡ · The exported function and the method disagree about which stream a trace goes to

```
debug.ts:355    logger: (...s: unknown[]) => void = console.error     (dist :262)
parser.ts:693   logger: (...s: unknown[]) => void = console.log
```

`parserDebug(p)` writes to **stderr**; `p.debug()` writes to **stdout**. Same facility, two defaults, no
note in either place. For a tool whose output is routinely piped, the stream is part of the contract —
and stderr is the stream X·P W1 §G-5 asserts must stay empty (`W1.md:302-303`).

---

### m-11 · MINOR · The two functions carrying the BLOCKER-grade defects are the two with vacuous assertions

`test/debug.test.ts` is the only test file for this module. Its `addCursor` block (`:197-212`) asserts
`toContain("^")` and `toContain("hello world")` — **never a caret position**, which is why §B-1 and §B-2
are unpinned. Its `statePrint` block (`:164-195`) asserts, for `src = "line1\nline2\nline3"`,
`expect(output).toContain("1")` and `toContain("2")` — satisfied by the source text itself (`line1`,
`line2`), so the assertion cannot distinguish correct line numbering from none, and would pass if the
gutter were deleted. Its `summarizeLine` truncation tests (`:39-50`) assert `length < 200` and
`toContain("...")` — both satisfied by returning `"..."`.

`formatExpected` (`:53-73`) is the counter-example and the one bright spot (§S-3): four assertions, four
arms, exact string equality.

---

### m-12 · MINOR · `formatSecondarySpans` silently drops out-of-range spans and leaves a bare trailing newline

`debug.ts:106-121` scans lines accumulating `lineEnd = offsetAcc + lines[i].length + 1`, `break`ing on the
first line where `span.offset < lineEnd`. A span whose offset exceeds `src.length + lines.length − 1`
matches no line, the loop completes, and **nothing is pushed** — the span is dropped with no marker and
no note. If every span is out of range, `result.join("\n")` is `""` while `statePrint:181-182` has already
committed to `output += "\n" + …` on the non-empty `secondarySpans.length` check, emitting a bare blank
line. Byte-derived (reaching this code requires arming; refused under §G-5).

---

### m-13 · MINOR ‡ · The renderer is pinned into 4 of the 5 published subpaths — and the one it is absent from is the one A.W3 says should export it

`Parser.prototype.toString` (`parser.ts:698`) and `Parser.prototype.debug` (`:690`) are instance methods
referencing module-level functions, so the whole renderer is unconditionally reachable from `Parser` and
cannot be shaken.

**Measured** (dist inspection):

```
core.js        imports  packrat-entry-CS1td-8B.js
packrat.js     imports  packrat-entry-CS1td-8B.js
utils.js       imports  packrat-entry-CS1td-8B.js  (+ diagnostics chunk)
parse.js       imports  packrat-entry-CS1td-8B.js  (+ diagnostics chunk, core.js)
diagnostics.js imports  diagnostics-DDazRHgl.js    ← the ONLY entry that does not pin the renderer

shared chunk  = 40,576 B
debug region  = lines 38–277  = 7,652 B  =  18.9%
```

`core.ts:3-6` advertises the subpath as *"the zero-side-effect primitive set … A consumer that imports
only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers"* —
true for those three, silent about this one. A consumer importing only `Parser` and `string` ships the
ANSI palette, the line-windowing renderer, the grammar printer and `PARSER_STRINGS`. And `./diagnostics`,
the tier that *by spec* should carry the renderer (§M-1), is the single entry that does not link it.

---

### i-1 · INFO ‡ · `parserDebug` bypasses `call()`, and is saved only by a second dead mechanism

`debug.ts:361` invokes `parser.parser(state)`, not `parser.call(state)`, so the flag pre/post processing
in `call()` (`parser.ts:437-478`: `FLAG_TRIM_WS`, `FLAG_EOF`) is skipped — attaching `.debug()` could
change what its subject parser accepts. It currently cannot, because the flag machinery is itself dead:
the only write is `parser.ts:496` onto `flaggedParser`, a `Parser` that is constructed and then
**discarded** (the function returns `whitespaceTrim` at `:514` instead), and `FLAG_EOF` has **no write
site at all** (declaration `:22`, read `:466`, mention `:489`). Two dead mechanisms cancelling is not a
guarantee; whoever revives `flags` inherits a Heisenbug where attaching `.debug()` changes the parse.

---

### i-2 · INFO ‡ · The falsy-`id` hazard in `parserPrint` is latent, held off by one line of module init

`debug.ts:320` (`if (!id)`) and `:339` (`if (id)`) treat the parser id as a boolean. `PARSER_ID` starts at
**0** (`parser.ts:18`), so a parser with `id === 0` would take the `!id` branch inside an already-`id`-ed
recursion — re-expanding a lazy node instead of returning its placeholder, i.e. non-termination on a
self-recursive grammar — and would never be cached.

**Measured** (probe P9): `whitespace.id === 0`; first freshly-constructed parser observed at id **38**
(the prior pass observed 37 — a one-id drift from probe ordering, non-material). `parser.ts:711` calls
`_initWhitespace()` as the first statement after the class body, so the module-init singleton permanently
owns id 0. **Latent, not live** — reported as such because it does not survive its own falsifier. It
becomes live the moment `_initWhitespace()` moves or a second `whitespace` construction path lands.
`id != null` is the fix, and it is the same `id`-as-flag conflation that §B-3 turns into a correctness bug.

---

### i-3 · INFO ‡ · `Diagnostic.offset` is carried and never rendered

`utils.ts:85` declares `offset` (the recovery checkpoint, set from `Parser.recover`'s `checkpoint`,
`parser.ts:666`). The only renderer, `formatDiagnostic`, consumes `furthestOffset`, `line`, `column`,
`expected`, `secondarySpans`, `suggestions`, `found` — and **drops `offset`**. Either the field or the
renderer is incomplete; nothing in the tree says which.

---

### i-4 · INFO ‡ · The line/column surface this module depends on has three implementations, two dead, and they disagree

`ParserState` carries `getColumnNumber()` (`state.ts:111`), `getLineNumber()` (`:119`) and
`getLineAndColumn()` (`:127`); `utils.ts:107-110` re-implements the third inline. For `src = "abc\ndef"`,
`offset = 5`: `getLineNumber()` → 1 (0-based-ish; returns 0 with no newline), `getLineAndColumn().line`
→ 2 (1-based), `getColumnNumber()` → 1. `getLineNumber` and `getColumnNumber` have **zero call sites** in
`src/` or `test/` — dead, contradictory, and adjacent to the accessor this module calls. `debug.ts:59`
picked the right one; nothing in the tree makes that anything but luck, and §B-2 is the bug in the one it
picked.

---

### i-5 · INFO · `debug.ts` sits on both legs of a two-cycle import knot, created solely to give two classes a `toString`

Two ESM **value** cycles run through this module:

```
state.ts:2    import { statePrint } from "./debug.js"      ⇄  debug.ts:1  import { ParserState } from "./state.js"   (`new ParserState` at :207)
parser.ts:3   import { parserDebug, parserPrint } from "./debug.js"  ⇄  debug.ts:3  import { Parser } from "./parser.js"  (`new Parser` at :382)
```

Neither fires at module-evaluation time (every use is inside a function body), so it works. But this
codebase has already been burned by exactly this class and says so: `leaf.ts:393-395` —
*"`whitespace` is initialized from parser.ts after module evaluation to avoid constructing Parser
instances during circular module initialization"* — with `_initWhitespace()` called at `parser.ts:711`.

The cycle is also the mechanism behind §m-13: because `debug`, `state`, `parser` and `leaf` are mutually
entangled, Rollup emitted **one** 40,576-byte chunk that four of five entries import. Both cycle edges
exist only to give `Parser` and `ParserState` a `toString`/`debug` method; making those lazy (or dropping
them for free functions on the `./diagnostics` tier, which is where A.W3 §S1 puts them anyway) cuts
`debug.ts` out of the core knot and un-pins the 7,652 bytes. One change, two findings.

---

### i-6 · INFO · `parserDebug` retains the logger in `context.args` where nothing reads it

`debug.ts:382` — `createParserContext("debug", parser as Parser<unknown>, logger)` — stores the user's
logger as `args[0]`. `case "debug"` (`:328-329`) returns `parserString` and never reads `args`.
**Measured** (probe P10): `dbg.context.args[0] === logger` → `true`, and `String(dbg)` → `"\"a\""`. A
user closure (and everything it captures) retained for the parser's lifetime with no reader — the same
`context.args`-retains-a-closure shape that defeats `LAZY_PARSER_CACHE`'s weak key in §M-5(2).

---

## §S — SUPERLATIVES (L-18 runs both ways)

Five, each with the same provenance discipline and the same falsifier duty.

**S-1 · The diagnostic substate is per-parse, not global — and this module is where that choice is
honored.** `debug.ts:172-188` reads `state.expected`, `state.secondarySpans`, `state.suggestions` off the
*state instance* (`state.ts:43-45`), never a module accumulator. This is the design that makes a nested
`.parse()` inside a `.map` callback unable to corrupt the outer parse's error tracking — the exact hazard
class the packrat tier had to cure with an epoch snapshot and a `try/finally` (`parser.ts:34-49`). The
renderer needed no cure because the data was threaded correctly upstream. **Falsifier tested**: the one
global read that could break it (`isDiagnosticsEnabled()`, `:174`) affects *whether* extras render, never
*whose* — so the reentrancy property genuinely holds. Filed as a superlative and as §m-5 simultaneously,
which is the honest reading.

**S-2 · `ansi.ts` is the right size and the right posture.** 17 lines, zero dependencies, and the enable
decision is made **once at module scope** against both `process.stderr.isTTY` and `NO_COLOR`
(`ansi.ts:3-6`) — not per call, not per string, and correctly against **stderr** (the stream the traces
actually go to). **Measured**: my `stripAnsi` was a no-op in every probe — the published library emits no
escape sequences into a pipe. One boolean read per call when disabled. This is what the rest of the
module should look like.

**S-3 · `formatExpected` is total, correct, and the only function here pinned by real tests.**
`debug.ts:33-47`: the 0/1/2 arms return without allocating an intermediate; the n≥3 arm produces a
correct Oxford-comma list. There is no input for which it throws or returns a malformed string, and it
takes `readonly string[]` so it cannot disturb the state it is describing. Four exact-equality assertions
cover all four arms (`test/debug.test.ts:53-73`) — the only place in this file where a branch is pinned
(cf. §m-11). **Falsifier tested**: duplicate labels would yield `expected "a", "a", or "b"` — refuted
upstream, `utils.ts:40` dedupes via `includes` before push.

**S-4 · `addCursor`'s window arithmetic is total under adversarial input, and that is why §B-2 is a wrong
answer rather than a crash.** `debug.ts:62-63` clamps both bounds
(`Math.max(lineIdx − MAX_LINES, 0)`, `Math.min(lineIdx + MAX_LINES + 1, lines.length)`), so no
out-of-range index is reachable for *any* `lineNum` — including the out-of-range `line: 2` that §B-2's
`lastIndexOf` clamp manufactures, and including `lineNum > lines.length`, where `startIdx > endIdx` makes
the loop body never run and the function return `""`. **Measured**: §B-2's probe rendered a complete
(wrong) block and did not throw. Defensive arithmetic that degrades instead of failing, in a renderer
that runs on the failure path, is the correct posture — and it is doing real work here.

**S-5 · The type posture is stricter than its own dependencies'.** Every array parameter in the module is
`readonly`: `formatExpected(readonly string[])` (`:33`), `formatSecondarySpans(… readonly SecondarySpan[])`
(`:98`), `formatSuggestions(readonly Suggestion[])` (`:127`), `formatAllDiagnostics(readonly Diagnostic[])`
(`:235`). In 383 lines there is exactly **one** `any` (`:254`), eslint-disabled with a reason. A renderer
that structurally cannot mutate the parse state it renders is the right shape, and it is sharper than the
tier below it: `utils.ts:89-91` declares `Diagnostic`'s three arrays as mutable `string[]`/`Suggestion[]`/
`SecondarySpan[]`, which is why `collectDiagnostic` must defensively spread all three (`utils.ts:120-122`)
to get the immutability this module obtained from the type system for free. **Falsifier tested**: a
`readonly` annotation that the implementation violates would make this hollow — refuted by reading all
four bodies; none writes to its array parameter.

---

## §R — HYPOTHESES RUN DOWN AND REFUTED

**R-1 · "`formatDiagnostic`/`formatAllDiagnostics` cost bundle payload."** **REFUTED at the artifact**:
`grep -cF formatDiagnostic` over `dist/packrat-entry-CS1td-8B.js`, `dist/packrat-entry-46NYx4_U.cjs` and
`dist/diagnostics-DDazRHgl.js` → **0, 0, 0**; the `errors found` summary literal (`debug.ts:239`) is
absent from every artifact. Rollup shakes both out. The surviving defect is a **spec/README/gate** break
(§M-1), not payload — and the payload finding that does survive is a different one (§m-13).

**R-2 · "The exponential print hangs the shipped grammars."** **REFUTED by measurement**:
`all`/`any`/`dispatch` carry `parser: undefined` in their contexts (`leaf.ts:77`, `:149`, `:162`), so the
double-print arm never fires; the package's own `jsonParser`/`csvParser` print in microseconds. This is
what holds §M-2 at MAJOR instead of BLOCKER.

**R-3 · "The falsy-`id` bug bites a real grammar."** **REFUTED by measurement** (probe P9):
`whitespace.id === 0`, owned by `parser.ts:711` at module init; first fresh parser observed at id 38.
Filed as latent (§i-2), not live. Note that its *sibling* — the same `id`-as-flag conflation at `:320`/
`:339` — is **not** latent: it is §B-3.

**R-4 · "`parserDebug` erases the value type to `Parser<string>`."** `ParserFunction<T>`
(`parser.ts:14-16`) is a **phantom** alias (`T` appears nowhere in its body), so inference at
`new Parser(debug as ParserFunction<T>, …)` (`debug.ts:382`) looked likely to find no candidate and fall
back to the class default `string`. **REFUTED at the artifact**: `dist/debug.d.ts` declares
`parserDebug<T>(…): Parser<T>` — TypeScript matches `ParserFunction<T>` against the same alias symbol on
its arguments before expansion, so `T` threads. No finding.

**R-5 · "`Parser.prototype.toString` is unreachable from the published bundles, since `parserPrint` is
absent from `dist/*.js`."** **REFUTED** — the initial grep was against the thin re-export shims
(`parse.js` is 1,109 B; `core.js` 1,336 B). The implementation lives in the shared chunk
`packrat-entry-CS1td-8B.js`, where `toString() { return parserPrint(this); }` is at `:1406` and
`parserPrint` at `:174`. Recorded because the wrong conclusion (a broken `toString` in the artifact)
would have been a false BLOCKER; the true finding is that the *symbol* is unexported while the *code*
ships (§M-1, §m-13).

---

## §C — Crosswalk to the superseded pass at this path

Carried after independent re-derivation: prior L-1→**B-1**, L-2→**B-2**, L-3→**M-4**, L-4→**M-2**,
L-5→**M-8**, L-6→**M-7**, L-7→**M-9**, L-8→**M-10**, L-9→**M-5**, L-10→**M-6**, L-11→**m-4**,
L-12→**m-5**, L-13→**m-6**, L-15→**m-7**, L-16→**m-8**, L-17→**m-9**, L-19→**m-10**, L-18→**m-13**
(extended: 4-of-5-subpath fan-in + the `./diagnostics` inversion), L-20→**i-1**, L-21→**i-2**,
L-22→**i-3**, L-23→**i-4**. Prior L-14 (MINOR, "zero consumers") is **promoted to §M-1** on three limbs it
did not carry: the A.W3 §S1 spec mandate, the README's documented-but-unimportable API, and the
`proof:subpath` gate's blindness.

New this pass: **B-3** (cache poisoning / order-dependent output), **M-3** (`not(b)` prints `!a`),
**m-1** (`sepBy` bounds dropped), **m-2** (`mapError` invisible), **m-3** (width-budget overrun),
**m-11** (vacuous test assertions), **m-12** (span drop + bare newline), **i-5** (the import knot),
**i-6** (retained logger). New superlatives: **S-4**, **S-5**.

**Corrected**: prior §S-5 / §L-4's *"one-line change at `:340`"* remedy — it kills §M-2 and **widens
§B-3**. See §B-3's remediation note. Prior §S-5 is therefore **not** carried as a superlative; the
observation it rests on (root-level memo placement at `:247-249`/`:346` is correct) is true and is folded
into §m-8.

---

## §X — Scope boundaries

- **Not this module's defects, but load-bearing for it**, filed here because `debug.ts` is the sole or
  primary consumer and the renderer is where they become visible to a user: the `lastIndexOf(…, −1)`
  clamp (`state.ts:128` — §B-2), the dead/contradictory line accessors (`state.ts:111-124` — §i-4), the
  dead `flags` machinery (`parser.ts:466`, `:492-496` — §i-1), the `then`/`or` duplicated context argument
  (`parser.ts:101`, `:120` — §M-2), the `sepBy` bound omission (`parser.ts:634` — §m-1), the
  `./diagnostics` barrel and `subpath-gate.mjs` (§M-1). Each is cited at its own file:line and should be
  routed to that module's challenge rather than double-counted.
- **`package.json:6` declares `"sideEffects": false`** while `parser.ts:711` performs a top-level
  `_initWhitespace()` call in the same chunk this module pins. A bundler that trusts the flag may drop
  the initializer and leave `whitespace` undefined. Cross-reference only — a manifest/`parser.ts` finding,
  not `debug.ts`'s; recorded because §m-13's pinning is what puts them in one chunk.
- **X·P W1 §file-plan** targets `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/**` as
  *create*. That root does not exist, consistent with W0 being unexecuted (`W1.md:63` says so explicitly:
  *"ABSENT at authoring, by design"*). Recorded, not actioned. **No STOP.**
- **Harness law honored** (X·P W1 §G-4/§G-5/§G-9): one fresh process per probe; the PT-03 latch never
  armed; diagnostics never armed — which is why §M-9's second limb and §m-12 are byte-derived and flagged
  as such. No bench produced or implied; the §M-2 timings are single-run complexity evidence, N=1, one
  machine, and are never offered as a bar.
