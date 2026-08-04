**MODEL RECEIPT**: `claude-opus-5[1m]` (Opus 5, 1M context) — the model this seat was spawned with. Declared, not inherited.

# CHALLENGE-L — LIBRARY axis · `parse-that/typescript/src/parse/debug.ts`

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/debug.ts`, 383 lines, 9 exported
functions, 3 module-private helpers, 2 module globals.
**Evidence tree**: `/Users/mkbabb/Programming/parse-that` main checkout, READ-ONLY. No worktree, no frozen
root, no `~/Documents/Codex` entered. `/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not
exist** — checked at open (`ls` → `No such file or directory`); not created. No STOP.
**Writes**: this file only.
**Probes**: 14, all `node --input-type=module` one-shots against the **published dist**
(`typescript/dist/parse.js`), no files written, no `enableDiagnostics()` called, no `memoize()`/
`mergeMemos()` constructed — **the PT-03 latch was never armed** (`PACKRAT_ARMED` arms at
`makeMemoized` construction, `packrat.ts:290` / `dist/packrat-entry-CS1td-8B.js:722`, and never
disarms; every probe process exited un-armed). No browser tooling. No benches.

---

## VERDICT

**DEFECTIVE.** The premise holds, and it holds at the module's own contract.

This is an error renderer. Its entire job is one sentence: *point at the place in the source where the
parse went wrong.* On two input shapes that dominate this library's actual domain — a source line longer
than 74 characters, and a source file that begins with a newline — **it points somewhere else and says so
with confidence.** Both are measured below, both reproduce on the published dist, and both agree with the
arithmetic read off the bytes to the column.

Around that core there is a second module wearing the same file: a grammar pretty-printer whose
memoization is wired to the wrong recursion arm, making it **exponential in `.then`/`.or` spine depth**
(measured: **10.7 seconds to produce a 157-character string**), whose output is **information-free on 11
of the 27 context names the library actually constructs** (measured: `String(jsonParser)` === `"dispatch?w"`
— ten characters for the library's own JSON grammar), and which **invokes user thunks and mints a second,
independent copy of the grammar as a side effect of printing** (measured: 5 parser ids minted during
`String()`, 5 more during the first `.parser()` run).

**23 defects — 2 BLOCKER, 8 MAJOR, 9 MINOR, 4 INFO. 5 superlatives** (L-18 runs both ways; §S).
Four hypotheses were run down and **refuted**; they are recorded in §R rather than dropped, because a
challenge that only reports its hits is not a measurement.

---

## §0 — What I read

Whole, read-only: `debug.ts` (383) and **every file it imports** —
`state.ts` (189), `lazy.ts` (43), `parser.ts` (711), `ansi.ts` (17), `utils.ts` (186).
Plus, for reachability and falsification: `leaf.ts` (399), `packrat.ts` (488), `index.ts`, `core.ts`,
`diagnostics.ts`, `test/debug.test.ts` (215), `test/print.test.ts`, `package.json`, and the published
`dist/` (`parse.js`, `core.js`, `diagnostics-DDazRHgl.js`, `packrat-entry-CS1td-8B.js`).

Hitherto corpus folded, not re-invented: **INBOX O-15** (PT-01/PT-03/PT-04/PT-07, dist line-cites —
re-verified at the bytes in §1); **X·P W1** §OP/§harness constraints (O-15 → G-4/G-5/G-9 mapping);
**X·P W2** (algebra candidates); **`registry/adjudicated/parser-band.md`** (cand-O ruled winner, the
preserved DISSENTs). Where the tree disagrees with a cited row, I say so explicitly (§1, PT-01).

---

## §1 — O-15 re-verified at the bytes (fold, with one correction)

O-15's dist cites were re-read against the artifact, not trusted:

| O-15 row | claim | at the bytes | verdict |
|---|---|---|---|
| **PT-01** | `label` is a no-op unless diagnostics armed — `dist/diagnostics-DDazRHgl.js:14` | `state.expected = diagnosticsEnabled && label ? [label] : void 0` — **line 14 exactly** | **CONFIRMED** |
| **PT-01** | arming couples an unconditional `console.error` — `dist/packrat-entry-*.js:881` | the guard `if (isDiagnosticsEnabled()) {` is at **:881**, the `console.error(this.state.toString())` at **:882** | **CONFIRMED**, cite is the guard line; the write is :882. Non-material, recorded for precision |
| **PT-03** | one-way latch: `:678` false, `:722` true, read `:682`/`:714`, no assignment back | `let PACKRAT_ARMED = false` **:678**; `PACKRAT_ARMED = true` **:722**; reads **:682**, **:714**; `grep -n PACKRAT_ARMED` returns **exactly those four lines** — no fifth | **CONFIRMED** |
| **PT-04** | `Parser.lazy` deepest OK 7,761, `RangeError` at 7,762 | not re-run (a depth probe, not a bench). The **print path has its own, lower, and non-deterministic ceiling** — new datum, §L-16 | **EXTENDED** |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError` | reproduced **inside this module**: 5/5 non-string `src` values make the *renderer* throw a raw `TypeError`, on the failure path — §L-6 | **CONFIRMED + EXTENDED** |

**Where this module lands in PT-01.** O-15 states the coupling correctly at the `parser.ts` end. The
`debug.ts` end is sharper than O-15 records, and cuts the other way: `statePrint` gates its diagnostic
extras on `isDiagnosticsEnabled()` (`debug.ts:174` / dist `:154`), but **every field that gate protects is
already write-gated on the same flag** (`utils.ts:33`, `:52`, `:58`) **and already length-guarded**
(`debug.ts:176`, `:181`, `:186`). The global read is therefore redundant on every ordering except one — and
on that one it is *wrong* (§L-9). That is a contradiction of the implied "the gate is load-bearing"
reading, filed explicitly.

---

## §2 — FINDINGS

Severity key: **BLOCKER** = wrong output on a reachable, common input, no workaround ·
**MAJOR** = wrong/unbounded on a reachable input, or a real allocation/type/dead-code defect ·
**MINOR** · **INFO**. Every row carries its falsifier — the thing that, if true, kills the finding.

---

### L-1 · BLOCKER · The caret points at nothing on any line longer than 74 characters

`debug.ts:83` computes the caret pad in **original-source column coordinates**:

```
debug.ts:83   const pad = " ".repeat(lnWidth + 4 + columnNum);
```

but `debug.ts:72` renders the line through `summarizeLine`, which **re-origins the content** — it slices a
74-char window around the column and prefixes `"..."` (`debug.ts:28`, `:30`). Nothing reconciles the two
coordinate systems.

**Measured** (probe P1, published dist). Source: 140×`a` + `Z` + 59×`b` (200 chars), error at offset 140:

```
content line rendered length = 85
the error character 'Z' lands at rendered column 45
the caret is emitted at rendered column 145      ← 60 columns past the end of the line
```

**Arithmetic agrees to the column**: `len=200, half=37, mid=140` → `start=103, end=177` →
`"..." + slice(103,177) + "..."` = 80 chars, + 5-char gutter = **85**; `Z` at source 140 → `5 + 3 + (140−103)` =
**45**; pad = `lnWidth(1) + 4 + 140` = **145**. Correct value: 45. **Off by 100.**

**Reach**: this library's stated domain is CSS values, JSON and CSV (`packrat.ts:9-11`). A minified CSS or
JSON file is *one line of ten thousand characters*. On that input the caret is off by up to the file
length, every time, and the further into the file the error is, the further the caret is from it.

**Falsifier** (survived): "the ellipsis prefix is only 3 chars, so the error is bounded and cosmetic" —
refuted by the measurement: the error is `columnNum − (start_offset_correction)`, i.e. unbounded in the
column, not bounded by the ellipsis. Second falsifier: "the test suite would catch it" — refuted:
`test/debug.test.ts:39-50` asserts only `result.length < 200` and `toContain("...")`, and never renders a
caret against a truncated line at all.

---

### L-2 · BLOCKER · An error at offset 0 of a source beginning with a newline is reported on the wrong line, at column −1

`debug.ts:59` takes the position from `state.getLineAndColumn()`. That method (`state.ts:128`) does:

```
state.ts:128   const lastNewline = this.src.lastIndexOf("\n", offset - 1);
```

At `offset === 0` the `fromIndex` is `-1`. **`String.prototype.lastIndexOf` clamps a negative `fromIndex`
to 0** rather than returning `-1`, so if `src[0] === "\n"` the search *finds it*, and both the line and the
column are computed from a newline that is at or after the position being described.

**Measured** (probe P12, published dist), `src = "\nabc\ndef"`, `offset = 0`, `isError = true`:

```
getLineAndColumn(0)  →  { line: 2, column: -1 }        (truth: line 1, column 0)

 Err x     0
 1 |
 2 | abc
    ^^^
 3 | def
```

The renderer highlights **line 2 in bold red** and puts the caret under `abc` — for an error at the very
first byte of the file. Control (probe P12b): the same source without the leading newline returns
`{line: 1, column: 0}` correctly, isolating the trigger to exactly `offset === 0 && src[0] === "\n"`.

The negative column also flows into `debug.ts:83` (`" ".repeat(lnWidth + 4 + (−1))`) and into
`summarizeLine`'s `mid` (`debug.ts:21`) — it does not throw only because `lnWidth + 4 > 1`.

**Reach**: source files that begin with a newline are ordinary — a `.css`/`.json` fixture written with a
leading blank line, any here-doc, any template literal opened on its own line. A parse that fails at
offset 0 is the single most common failure (wrong first token).

**Falsifier** (survived): "this is `state.ts`'s bug, not `debug.ts`'s" — partly true and recorded as such
in §L-23; but `debug.ts` is the **sole consumer** of the line/column surface (grep: `getLineAndColumn` has
exactly two call sites, `debug.ts:59` and `state.ts:137`'s own `toString`), it is the module that *renders
a false claim to a user*, and its dependency offers a second, contradictory accessor it did not choose
(§L-23). Second falsifier: "`d.line`/`d.column` from `collectDiagnostic` would disagree and expose it" —
refuted: `utils.ts:108-110` re-implements the same algorithm with the same `lastIndexOf` clamp, so the two
paths are wrong *identically*, which is why nothing catches it.

---

### L-3 · MAJOR · `debugDepth` leaks on every exception, unboundedly, with no reset

```
debug.ts:12    let debugDepth = 0;                      (dist :40)
debug.ts:358   debugDepth++;                            (dist :264)
debug.ts:361   const newState = parser.parser(state);   ← can throw
debug.ts:379   debugDepth--;                            (dist :275)
```

No `try/finally`. Any throw between 358 and 379 — a user `.map` callback, a `RangeError` from the packrat
key budget (`packrat.ts:94`), a stack overflow — leaves the counter permanently raised. The counter is a
module global with **no exported reset**.

**Measured** (probe P6, published dist), indentation of the first trace line:

```
baseline            " "        (1 char: the badge's own leading space)
after ONE throw     "   "      (+2)
after FIVE throws   "           "  (+10)
```

Monotonic, unbounded, permanent for the process. Every subsequent debug trace in the application is
indented by 2×(number of exceptions ever swallowed) — the exact scenario a developer is in when they reach
for `.debug()`.

Note the contrast the module itself sets: `packrat.ts:390-406` and `parser.ts:44-48` both wrap their
global-state mutation in `try/finally` and say so in prose ("the try/finally guarantees the restore even if
the parse throws"). This module's one mutable global does not.

**Falsifier** (survived): "the indentation is cosmetic" — it is the *only* structure a nested trace has;
a trace whose indentation is offset by a constant is a trace whose tree structure is unreadable, which is
the whole product. Second falsifier: "an exception under `.debug()` is exotic" — the probe swallows it the
way an application does (`try { … } catch {}`), which is the ordinary shape.

---

### L-4 · MAJOR · `parserPrint` is exponential in `.then`/`.or` spine depth

The memo (`PARSER_STRINGS`, `debug.ts:245`) is **read** at every recursion entry (`:258`) but **written for
inner nodes only under `if (id)`** (`:339-341`) — and `id` is `undefined` for the entire top-level
traversal (`:345` calls `print(parser)` with one argument). So the read never hits and the recursion is
un-memoized.

That would be merely linear-with-no-caching, except that `then` and `or` pass the left child **twice**:

```
parser.ts:101   createParserContext("then", this, this, next)   ← `this` is BOTH context.parser AND args[0]
parser.ts:120   createParserContext("or",   this, this, other)  ← same
```

and `debug.ts:261-264` computes `parserString = print(innerInnerParser)` **unconditionally, before the
switch**, while `debug.ts:295-300` / `:301-307` then map over `args` — printing the same left child a
second time and discarding the first. `T(n) = 2·T(n−1) + O(1)`.

**Measured** (probe P3/P9, published dist, `String(p)` on a left-spine chain):

```
.then depth=14   →     6.2 ms      output 101 chars
.then depth=16   →    17.5 ms      output 115 chars
.then depth=18   →   815.6 ms      output 129 chars
.then depth=20   →  2432.5 ms      output 143 chars
.then depth=22   → 10697.2 ms      output 157 chars      ← 10.7 seconds for 157 characters
.or   depth=16   →    10.0 ms  |  depth=18 → 38.0 ms  |  depth=20 → 139.1 ms   (ratio ≈ 2² per +2)
```

Reached implicitly: `Parser.prototype.toString` (`parser.ts:698-700`) is `parserPrint`, so `${parser}`,
`"" + parser`, or a parser interpolated into a thrown error message triggers it. Also from
`parserDebug(…, recursivePrint = true)` (`debug.ts:363-365`).

**Falsifier** (survived, and it narrows the severity honestly): "no shipped grammar trips it" — **true, and
measured**: probe P10 shows `String(csvParser)` = 0.055 ms and `String(jsonParser)` = 0.003 ms, because
both are built from `all()`/`any()`/`dispatch()` whose contexts carry `parser: undefined`
(`leaf.ts:77`, `:149`, `:162`) and so never double. `cand-o/grammar.ts` (the ruled band winner) uses
`.then()` at 19 sites but at a shallow left-spine depth. **That is exactly why this is MAJOR and not
BLOCKER**: the hazard is in the fluent API the V-next band is being invited to use, not in what ships
today. It is also why the fix is one line (`parserString` is already computed; feed the memo with it).

---

### L-5 · MAJOR · `toString()` throws a raw `Error` on a `Parser` built through the public constructor

```
debug.ts:335-338   const result = s ?? name;
                   if (!result) { throw new Error("parserPrint: missing parser context name"); }
```

`Parser`'s constructor defaults `context` to `{}` (`parser.ts:31`), and `Parser` is exported from the
package entry (`dist/parse.js` → `P as Parser`). So a user-constructed parser has `context.name ===
undefined`, falls to the switch `default` (`debug.ts:330-331`), and **its `toString()` throws**.

**Measured** (probe P4, published dist):

```
String(new Parser(s => s))  →  THREW Error "parserPrint: missing parser context name"
```

A throwing `toString` is a boundary-posture defect of the PT-07 family: `toString` is called implicitly by
string coercion, by template interpolation, and — critically — by code building *other* error messages, so
the throw surfaces at a site that has nothing to do with printing.

**Falsifier** (survived): "users are meant to use `string()`/`regex()`/`all()`, not `new Parser`" — refuted
by the export surface: `Parser` **and** `createParserContext` are both public (`index.ts:2,3`;
`core.ts:7,10`), and `createParserContext` exists precisely so callers can build contexts by hand. A
public constructor whose object cannot be stringified is a defect of the printer, not of the caller.

---

### L-6 · MAJOR · The failure-path renderer throws a raw `TypeError` on a non-string `src` (PT-07, inside the renderer)

`debug.ts:58` (`state.src.split("\n")`), `:100` (same), and `state.ts:113`/`:128` (`.lastIndexOf`,
`.length`) all assume `src: string` with no boundary check.

**Measured** (probe P14, published dist), `String(new ParserState(x))` for five non-string `x`:

```
123    → TypeError: state.src.split is not a function
null   → TypeError: Cannot read properties of null (reading 'length')
undefined → TypeError: Cannot read properties of undefined (reading 'length')
{}     → TypeError: state.src.split is not a function
["a"]  → TypeError: state.src.split is not a function
```

5/5, three distinct messages from three distinct call sites — the same shape O-15's PT-07 records for
`.parse()`. It is worse here than at the parse boundary, because this code runs **on the failure path**:
the sequence in `parser.ts:67-68` is *parse failed → render → `console.error`*, so a malformed `src`
converts a parse failure into a renderer crash that buries the original failure.

**Falsifier** (survived): "TypeScript prevents it" — refuted at the type level: `ParserState`'s `src` is a
public mutable field (`state.ts:48`), `Parser.parse(val: string)` is not runtime-checked, and O-15 already
measured 5/5 raw `TypeError`s reaching users through the published JS. The `.d.ts` is not a guard for a JS
consumer, which is the consumer this package's `require` export exists for.

---

### L-7 · MAJOR · Secondary spans are rendered in a different coordinate system than the caret they annotate

Two blocks in the **same output** compute their gutter width independently:

```
debug.ts:65    const lnWidth = lineNumberWidth(endIdx);          ← primary block: width of the real max line no.
debug.ts:110   const lnWidth = Math.max(String(i + 1).length, 3); ← secondary block: hardcoded floor of 3
```

Each block is internally consistent (`debug.ts:83` pads `lnWidth + 4 + columnNum`; `:116` pads
`lnWidth + 4 + col`), so the marker and the caret for the **same offset** land in different rendered
columns whenever `lineNumberWidth(endIdx) ≠ 3` — i.e. **for every source under 100 lines** (off by 2 for
<10 lines, by 1 for 10–99).

Compounding it: the secondary block prints `lines[i]` **raw** (`debug.ts:114`) with no `summarizeLine`,
while the primary block truncates the same line to a 74-char window (`debug.ts:72`). For a long line the
two blocks therefore render *the same text at two different widths*, so the marker cannot point at the
same character as the caret even in principle.

**Falsifier** (survived, and bounds the claim): this is **derived from the bytes, not executed** — reaching
`formatSecondarySpans` requires `isDiagnosticsEnabled()` (`debug.ts:174`), and I declined to arm
diagnostics under the wave's no-arming law even though the flag is two-way and process-local. The
derivation is closed-form (both pads are literal expressions over `lnWidth`), and the test suite reaches
`state.secondarySpans` (`test/debug.test.ts:152-161`) but **never renders them**, so nothing in the tree
contradicts it. Marked for execution by whoever holds the arming budget.

---

### L-8 · MAJOR · `parserPrint` is information-free on 11 of the 27 context names the library constructs

The switch handles 18 names (`debug.ts:268-332`). Constructed names, enumerated from the tree
(`grep createParserContext` across `src/parse/**`, plus the two variable-name sites at `packrat.ts:479`),
are **27**. The gap is 11: `chain`, `dispatch`, `eof`, `lookAhead`, `mapState`, `memoize`, `mergeMemo`,
`minus`, `peek`, `recover`, `whitespace`. Each falls to `default → undefined` (`:330-331`) and prints as its
bare name via `result = s ?? name` (`:335`), erasing the entire subtree.

**Measured** (probe P10, published dist) — the library's own shipped grammars:

```
String(jsonParser)  =  "dispatch?w"                                            (10 characters)
String(csvParser)   =  "\"\"\" /[^\"]+/ \"\"\" | \"'\" /[^']+/ \"'\" | /[^,]+/ sepBy \",\"?w?w {0,}"
```

The headline feature of this module renders **the package's own JSON parser as ten characters**, and the
CSV parser with a `?w?w` double-trim artifact. `dispatch` is the sharpest case: it is semantically an
alternation and its context args **are the parsers** (`leaf.ts:149`), directly usable by the existing
`case "any": case "or":` arm — the printer simply never wired it.

**Falsifier** (survived): "these are internal names users don't build" — refuted: `dispatch`, `eof` and
`whitespace` are public exports (`index.ts:9`), `memoize`/`mergeMemos` are public (`index.ts:8`), and
`peek`/`lookAhead`/`minus`/`recover`/`chain`/`mapState` are all public `Parser` methods.

---

### L-9 · MAJOR · Printing a lazy parser invokes the user's thunk and mints a second, independent grammar

```
debug.ts:316-318   case "lazy": { const [lazy] = args!; const p = getLazyParser(lazy); …
```

`getLazyParser` (`lazy.ts:7-15`) **calls `fn()`**. But the parser that actually *runs* comes from
`createLazyCached` (`lazy.ts:18-24`), which holds its **own closure-local cache** — a different cache from
`LAZY_PARSER_CACHE`. So printing constructs an entire second copy of the grammar, and it is not the copy
that executes.

**Measured** (probe P5, published dist), thunk returning a 3-node grammar:

```
fn invocations during String()              = 1
parser ids minted during String()           = 5
parser ids minted during the first .parser() run = 5   ← a second, independent grammar instance
out = "[[\"x\", \"y\"], \"z\"]"
```

Three consequences, all real for a "hot parser library":
1. **A printer with side effects.** `${parser}` executes user code. If the thunk is non-deterministic or
   effectful, printing changes program state; if the thunk throws, `toString()` throws.
2. **Double retention.** Both graphs are retained — the print copy by `LAZY_PARSER_CACHE` keyed on `fn`,
   and `fn` itself is retained by the parser's `context.args`, so the WeakMap entry cannot be collected
   while the parser lives.
3. **It spends the packrat id budget.** `PARSER_ID` is a process-global counter (`parser.ts:18`) and
   `getCijKey` fails loud above `MEMO_MAX_ID ≈ 2,097,151` (`packrat.ts:77,90-98`). Printing inflates the
   counter — a debug facility consuming a correctness budget.

Additionally, a self-recursive rule prints its own recursive reference as the **literal string `"lazy"`**
(`debug.ts:325`), because the `else` arm returns `name`, and `Parser` carries no rule name to return
instead.

**Falsifier** (survived): "the WeakMap makes it a one-time cost" — true for repeat prints of the same
thunk, and irrelevant to the defect: the copy is *made at all*, is *never the executed graph*, and the
`PARSER_ID` and retention costs are paid once and never released.

---

### L-10 · MAJOR · `statePrint` is Θ(|src|) in allocation per call, and it is called per parser step

Per `statePrint` invocation:

- `debug.ts:58` — `state.src.split("\n")`: allocates an array of **every line of the source**, plus a
  string per line. Only ≤9 of them are ever used (`MAX_LINES = 4`, `debug.ts:9`, `:62-63`).
- `debug.ts:59` → `state.ts:131` — `this.src.slice(0, lastNewline + 1).split("\n")`: a **full prefix copy**
  of the source *plus a second full split of that prefix*, to obtain a single integer (the line count).
- `debug.ts:100` — a third `src.split("\n")` inside `formatSecondarySpans`, when reached.

`parserDebug` calls `statePrint` **once per parser invocation** (`debug.ts:366`), and a parser is invoked
once per node per position. Tracing a 100 kB stylesheet therefore copies and splits ~200 kB **per parser
step**, plus `debug.ts:373-376`'s split/map/join of the rendered block.

This is the module in the repository least aligned with its own file's stated discipline — `leaf.ts:27-37`
removes `for…of` iterator objects and unrolls arity-2 alternation for a few nanoseconds; `packrat.ts:137-155`
latches an entire subsystem off to avoid a **three-Map allocation per parse**. Meanwhile the renderer
allocates the whole source, twice, per step. The cheap fix is already present in the same class: a
`lastIndexOf`/`indexOf` window (`state.ts:113-116` does exactly this for the column) needs no split at all.

**Falsifier** (survived, and it is the reason this is MAJOR not BLOCKER): "it's a debug path, it isn't
hot." Correct — and the axis under audit is *allocation discipline in a hot parser library*, where the
debug path is the one place a developer runs against a **large real input** to find out why it is slow.
An O(n) renderer per step turns an O(n) parse trace into O(n²) and hides the thing being debugged.

---

### L-11 · MINOR · Non-active context lines get 54% of the width budget

`debug.ts:72` passes `columnNum` only for the active line, `0` otherwise. In `summarizeLine`, `mid = 0`
drives `start = 0` and `end = min(0 + 37, len)` (`debug.ts:21-23`), so the `start === 0` branch
(`:25-26`) returns **37 characters + "..."** — while `MAX_LINE_WIDTH` is 74.

**Measured** (probe P2): a 200-char non-active line renders at **45 columns total** (5 gutter + 37 + 3),
i.e. **40 of a 74-char budget**. Context lines are truncated to just over half the width the constant
declares.

**Falsifier** (survived): "the constant is a half-width-per-side budget" — refuted by `debug.ts:19`
(`if (len <= MAX_LINE_WIDTH) return trimmed;`), which treats 74 as a whole-line budget; the two branches
of the same function disagree about what the constant means.

---

### L-12 · MINOR · The `isDiagnosticsEnabled()` gate in `statePrint` is redundant on every ordering but one, and wrong on that one

```
debug.ts:174   if (isError && isDiagnosticsEnabled()) {   (dist :154)
```

Every field inside is write-gated on the same flag (`utils.ts:33`, `:52`, `:58`) **and** length-guarded
inside (`debug.ts:176`, `:181`, `:186`). So the gate is a no-op — except in the order
`enableDiagnostics() → parse (populates) → disableDiagnostics() → statePrint`, where the state carries real
expected-sets and suggestions and the renderer **silently discards them**. Either redundant or wrong;
there is no ordering on which it is right.

Removing it makes `statePrint` a pure function of its argument, which is the posture the module's own
comment claims (`debug.ts:172-173`: *"read from the state's per-parse error tracking, not module globals"*)
— a claim the very next line breaks. This is the `debug.ts` end of **PT-01**, and it contradicts the
implied reading that the gate carries weight.

**Falsifier** (survived): "a user could populate the fields by hand with the flag off, and the gate
protects the format" — the fields are public and mutable (`state.ts:43-45`), so the "protection" is
suppression of user-supplied data with no diagnostic, which is not a defense.

---

### L-13 · MINOR · The module's two renderers disagree about the same data

`statePrint` gates its extras on the global (`debug.ts:174`); `formatDiagnostic` renders the identical
extras **ungated** (`debug.ts:212-226`). Feed the same `expected`/`suggestions`/`secondarySpans` through
the two functions with diagnostics off and you get two different documents. Neither is documented as the
authority.

**Falsifier** (survived): "a `Diagnostic` only exists when diagnostics were on, so the gate would always
pass anyway" — that is precisely the argument that the gate in `statePrint` is redundant (§L-12), and it
does not survive the enable→disable ordering.

---

### L-14 · MINOR · `formatDiagnostic` and `formatAllDiagnostics` have zero consumers anywhere

`grep` across `src/`, `test/`, `scripts/` and all four entry barrels (`index.ts`, `core.ts`,
`diagnostics.ts`, `utils-entry.ts`): **not one call site, not one re-export**. 30 lines
(`debug.ts:200-241`), zero test coverage, and they are the only consumer of `Diagnostic.line`/`.column`.

They are correctly **tree-shaken out of the bundle** (`grep formatDiagnostic dist/*.js` → nothing), so this
costs no payload — but `dist/debug.d.ts` still *declares* both, from a module no entry re-exports, so the
published typings advertise an API that cannot be imported.

**Falsifier** (survived): "the collected-diagnostics buffer is public, so a user renders them" — the
buffer is public (`getCollectedDiagnostics`, `index.ts:5`) but the renderer for it **is not exported**, so
the public half of the feature ships without the half that makes it legible. That is the defect, stated
precisely.

---

### L-15 · MINOR · `case "trim":` is unreachable

`debug.ts:273` handles context name `"trim"`. **No site constructs it**: `grep createParserContext("trim"` →
0 hits; `Parser.trim()` produces `"trimWhitespace"` (`parser.ts:494`, `:516`), delegates to `wrap()`
(`:520`, name `"wrap"`), or to `all()` (`:485`, name `"all"`). Dead arm, and it is the arm that would
crash if reached with the wrong arity (`const [left, right] = args!`).

---

### L-16 · MINOR · `PARSER_STRINGS` is an unbounded module-global cache with no clear API

`debug.ts:245` — a `Map<number, string>` keyed on a monotonically increasing process-global id
(`parser.ts:18`), written at `:322`, `:340`, `:346`, **never cleared**, with no exported clear. Every parser
ever printed retains its rendered string for the process lifetime. It holds no object references, so it is
a bounded-by-string-length leak rather than a retention cycle — and it is the same structure whose
mis-placed writes cause §L-4.

---

### L-17 · MINOR · `parserPrint` recurses without a depth guard, and its ceiling is non-deterministic

The `print` closure (`debug.ts:252-343`) recurses over the parser graph with no depth counter and no
`try/catch`, so a deep grammar makes `toString()` throw `RangeError`.

**Measured** (probe P7, published dist, linear `.map` spine — same process, in order):

```
depth 5000 → OK      6000 → OK      6500 → RangeError: Maximum call stack size exceeded
depth 7000 → OK      8000 → OK
```

**Non-monotonic.** My first attempt binary-searched for a ceiling and produced "6249" — an artifact, and I
record the invalidation rather than the number: V8's frame size changes as the closure is optimized, so the
ceiling moves *within a single process*. The honest statement is that `parserPrint` overflows somewhere
around 6–8k nodes of spine depth and **which side of the line a given grammar falls on is not stable
across runs**.

Fold with **PT-04** (O-15: `Parser.lazy` deepest OK 7,761, `RangeError` at 7,762): the *print* path has its
own unguarded recursion with a **lower and less stable** ceiling than the *parse* path. A grammar that
parses can fail to print.

---

### L-18 · MINOR · The renderer is pinned into `@mkbabb/parse-that/core`, whose docstring promises a primitive set

`core.ts:3-6` states the subpath is *"the zero-side-effect primitive set … A consumer that imports only this
never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers."* True for those
three — and silent about this one. Because `Parser.prototype.toString` (`parser.ts:698`) and
`Parser.prototype.debug` (`parser.ts:690`) are instance methods referencing module-level functions, the
whole renderer is unconditionally reachable and cannot be shaken.

**Measured**: the debug region occupies `dist/packrat-entry-CS1td-8B.js:40-277` = **7,604 bytes of the
40,576-byte shared chunk `core.js` imports — 18.7%**. A consumer importing only `Parser` and `string` ships
the ANSI palette, the line-windowing renderer, the grammar printer and `PARSER_STRINGS`.

---

### L-19 · MINOR · The exported function and the method disagree about which stream a trace goes to

```
debug.ts:355    logger: (...s: unknown[]) => void = console.error    (dist :262)
parser.ts:693   logger: (...s: unknown[]) => void = console.log
```

`parserDebug(p)` writes to **stderr**; `p.debug()` writes to **stdout**. Same facility, two defaults, no
note. For a tool whose output is routinely piped, the stream is part of the contract.

---

### L-20 · INFO · `parserDebug` bypasses `call()`, and is saved only by a second dead mechanism

`debug.ts:361` invokes `parser.parser(state)`, not `parser.call(state)` — so the flag pre/post processing
in `call()` (`parser.ts:437-478`: `FLAG_TRIM_WS`, `FLAG_EOF`) is skipped, meaning a `.debug()` wrapper could
change what its subject parser does. It currently cannot, because **the flag machinery is itself dead**:
the only write is `parser.ts:496`, onto `flaggedParser`, a `Parser` that is **constructed and then
discarded** (the function returns the `whitespaceTrim` parser at `:514` instead), and `FLAG_EOF` has **no
write site at all** (`grep FLAG_EOF` → declaration `:22`, read `:466`, mention `:489`). Two dead mechanisms
cancelling is not a guarantee; the first person to revive `flags` gets a Heisenbug where attaching
`.debug()` changes the parse.

---

### L-21 · INFO · The falsy-`id` hazard in `parserPrint` is latent, and one line of module init is all that hides it

`debug.ts:320` (`if (!id)`) and `:339` (`if (id)`) treat the parser id as a boolean. `PARSER_ID` starts at
**0** (`parser.ts:18`), so a parser with `id === 0` would take the `!id` branch inside an already-`id`-ed
recursion — re-expanding a lazy node instead of returning its name, i.e. non-termination on a
self-recursive grammar — and would never be cached.

**Measured** (probe P11): `whitespace.id === 0`. `parser.ts:711` calls `_initWhitespace()` as the first
statement after the class body, so the module-init singleton permanently owns id 0 and **no user parser can
ever have it** (first user parser observed: id 37). **The finding is therefore latent, not live** — and I
report it as such rather than as a bug, because it does not survive its own falsifier. It becomes live the
moment `_initWhitespace()` moves, or a second `whitespace` construction path lands. `!= null` is the fix.

---

### L-22 · INFO · `Diagnostic.offset` is carried and never rendered

`utils.ts:85` declares `offset` (the recovery checkpoint, set from `Parser.recover`'s `checkpoint`,
`parser.ts:666`). The only renderer, `formatDiagnostic`, uses `furthestOffset`, `line`, `column`,
`expected`, `secondarySpans`, `suggestions`, `found` — and **drops `offset`**. Either the field or the
renderer is incomplete.

---

### L-23 · INFO · The line/column surface this module depends on has three implementations, two dead, and they disagree

`ParserState` carries `getColumnNumber()` (`state.ts:111`), `getLineNumber()` (`:119`) and
`getLineAndColumn()` (`:127`); `utils.ts:107-110` re-implements the third inline. **Measured** (probe P13),
same state, `src = "abc\ndef"`, `offset = 5`:

```
getLineNumber()            → 1     (0-based-ish; returns 0 when there is no newline)
getLineAndColumn().line    → 2     (1-based)
getColumnNumber()          → 1
```

`getLineNumber` and `getColumnNumber` have **zero call sites** in `src/` and `test/` — dead, contradictory,
and adjacent to the accessor this module actually calls. `debug.ts` picked the right one; nothing in the
tree makes that anything other than luck.

---

## §S — SUPERLATIVES (L-18 runs both ways)

Five, each with the same provenance discipline and the same falsifier duty.

**S-1 · The diagnostic substate is per-parse, not global — and this module is where that choice is
honored.** `debug.ts:172-188` reads `state.expected`, `state.secondarySpans`, `state.suggestions` off the
*state instance* (`state.ts:43-45`), never a module accumulator. This is the design that makes a nested
`.parse()` inside a `.map` callback unable to corrupt the outer parse's error tracking — the exact hazard
class that PT-Q1 had to cure with an epoch snapshot on the packrat side (`packrat.ts:158-185`). The
renderer needed no such cure because the data was already threaded correctly. **Falsifier tested**: the
one global read that would break it (`isDiagnosticsEnabled()` at `:174`) affects *whether* extras render,
never *whose* extras — so the reentrancy property genuinely holds. Filed as a superlative and as §L-12
simultaneously, which is the honest reading.

**S-2 · `ansi.ts` is the right size and the right posture.** 17 lines, zero dependencies, and the enable
decision is made **once at module scope** against both `process.stderr.isTTY` and `NO_COLOR`
(`ansi.ts:3-6`) — not per call, not per string. **Measured**: every probe's output came back with no
escape sequences at all (my `stripAnsi` was a no-op in all 14 probes). A library renderer that cannot
pollute a piped stream, and that costs one boolean read per call when disabled. This is what the rest of
the module should look like.

**S-3 · `formatExpected` is total, correct, and the only fully-tested function here.** `debug.ts:33-47`:
the 0/1/2 cases return without allocating an intermediate, the n≥3 case produces a correct Oxford-comma
list, and there is no input for which it throws or returns a malformed string. Four assertions cover all
four arms (`test/debug.test.ts:53-73`) — the only place in this file where a branch is pinned by a test.
**Falsifier tested**: duplicate labels would produce `expected "a", "a", or "b"` — refuted upstream,
`utils.ts:40` dedupes via `includes` before push.

**S-4 · One offset, one line/column computation, one caret origin — in `statePrint`.** The badge, the line
window and the caret in `addCursor` all derive from a single `state.getLineAndColumn()` call
(`debug.ts:59`), so the header and body of a `statePrint` block cannot disagree about *where* the error is.
That discipline is exactly what `formatDiagnostic` abandons (header from `d.line`/`d.column`, body
recomputed from `d.furthestOffset` through a fresh `ParserState`, `debug.ts:204-208`) and what
`collectDiagnostic` re-implements a third time (`utils.ts:107-110`). The good pattern is in the file; it
simply was not carried across the §L-14 boundary.

**S-5 · The root-level memo placement is right.** `debug.ts:247-249` checks `PARSER_STRINGS` before any work
and `:346` writes the root after, so repeated `toString()` on the same parser is O(1) — the second
`String(p)` on the depth-22 chain that costs 10.7 s returns from the map. The memo's *entry* placement is
correct; only its *recursive* placement (`:339`, gated on a truthy id) is not. Byte-derived from `:247-249`
and `:345-348`; a one-line change at `:340` converts the correct idea into the correct implementation, which
is the cheapest fix in this document and kills §L-4 outright.

---

## §R — HYPOTHESES RUN DOWN AND REFUTED

Recorded because a challenge that reports only its hits is not a measurement.

**R-1 · "`parserDebug` erases the value type to `Parser<string>`."** `ParserFunction<T>`
(`parser.ts:14-16`) is a **phantom** alias — `T` appears nowhere in its body — so I expected inference at
`new Parser(debug as ParserFunction<T>, …)` (`debug.ts:382`) to find no candidate and fall back to the
class default `string`, silently mistyping every `.debug()` result. **REFUTED at the artifact**:
`dist/debug.d.ts` declares `parserDebug<T>(…): Parser<T>`. TypeScript's same-alias-symbol inference rule
matches `ParserFunction<T>` against `ParserFunction<T_class>` on the alias arguments before expansion, so
`T` threads correctly. No finding.

**R-2 · "The exponential print hangs the shipped grammars."** **REFUTED by measurement** (probe P10):
`String(csvParser)` 0.055 ms, `String(jsonParser)` 0.003 ms — `all`/`any`/`dispatch` carry
`parser: undefined` in their contexts (`leaf.ts:77,149,162`), so the double-print arm never fires for them.
This is what holds §L-4 at MAJOR instead of BLOCKER.

**R-3 · "The falsy-`id` bug bites a real grammar."** **REFUTED by measurement** (probe P11):
`whitespace.id === 0`, owned by `parser.ts:711` at module init; the first user parser observed is id 37.
Filed as latent (§L-21), not as a live defect.

**R-4 · "The dead renderer costs bundle payload."** **REFUTED**: `grep formatDiagnostic dist/*.js` returns
nothing — Rollup shakes both functions out. The defect is dead *source* plus an orphaned *declaration*
(§L-14), not payload. The payload finding that does survive is a different one (§L-18, 7,604 B pinned by
`toString`/`debug`).

---

## §X — Cross-references and scope boundaries

- **Not this module's findings, but load-bearing for it**, filed here because `debug.ts` is the sole or
  primary consumer and the renderer is where the defect becomes visible to a user: the `lastIndexOf(…, −1)`
  clamp (`state.ts:128` — §L-2), the dead/contradictory line accessors (`state.ts:111-124` — §L-23), the
  dead `flags` machinery (`parser.ts:492-496`, `:466` — §L-20), the `then`/`or` duplicated context argument
  (`parser.ts:101`, `:120` — §L-4). Each is cited at its own file:line and should be routed to that
  module's challenge rather than double-counted.
- **X·P W1 §file-plan** targets `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/**` as
  *create*. That root **does not exist**, consistent with the wave being unexecuted. Recorded, not
  actioned; no STOP.
- **Harness constraints honored** (W1 §OP, O-15 → G-4/G-5/G-9): one fresh process per probe; the packrat
  latch never armed; diagnostics never armed (which is why §L-7 is byte-derived and flagged as such); no
  bench numbers produced or implied — the timings in §L-4/§L-8 are single-run *orders of magnitude* on one
  machine, N=1, and are stated as complexity evidence, never as a bar.
