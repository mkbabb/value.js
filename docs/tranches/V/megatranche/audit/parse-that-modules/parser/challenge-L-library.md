claude-opus-5[1m]

# CHALLENGE — `parse-that` module `parser` · axis L (LIBRARY)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/parser.ts` (711 lines, 25 members on
one class). Read whole, together with every file it imports: `state.ts` (189) · `debug.ts` (383) ·
`utils.ts` (186) · `lazy.ts` (43) · `leaf.ts` (399) · `packrat.ts` (488) · and `debug.ts`'s own import
`ansi.ts` (17). Subpath entries `index.ts` · `core.ts` · `diagnostics.ts` · `packrat-entry.ts` ·
`utils-entry.ts` · `split.ts` read for surface reachability.

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a
severity, a `file:line` provenance, and its own falsifier. Superlatives are reported on the same terms
(**L-18** runs both ways). Where a claim is executed rather than read, the probe is pasted and labelled
**API-TEST** (L-16); no probe wrote a byte into the evidence root, no probe called `memoize()` /
`mergeMemos()` / `enableDiagnostics()`, and the `PACKRAT_ARMED` latch was therefore never armed by this
audit. All probes ran as `node --input-type=module -e '…'` against `typescript/dist/parse.js`, cwd
`/Users/mkbabb/Programming/parse-that/typescript`, 2026-08-04, node v26 / darwin arm64.

**Law compliance**: `/Users/mkbabb/Programming/parse-that` was read only. `.worktrees/`, frozen roots and
`~/Documents/Codex` were never entered. `test -e /Users/mkbabb/Programming/parse-that-css-totality-p2` →
**ABSENT** (`ls` → `No such file or directory`, 2026-08-04) — no STOP finding; the X.P.W2 preamble's
re-verification reproduces.

**Standing context (not a defect)**: `grep -rn "@mkbabb/parse-that" value.js/src value.js/package.json` →
**zero hits**. value.js does not consume this library today, so every defect below is *pre-adoption* — which
is the only reason the BLOCKER rows are challenges rather than incidents. This is consistent with X.P.W2 §3
("Not in scope: … adding `@mkbabb/parse-that` to `package.json`; X-W9 G31 measures that set and it stays as
measured").

**Tally**: **25 defects — 4 BLOCKER · 11 MAJOR · 10 MINOR** · **6 superlatives**.

---

## 0. What the hitherto corpus already established, and where this challenge departs from it

| corpus row | status at the bytes | this challenge |
|---|---|---|
| **O-15 PT-01** — label is a no-op unless diagnostics armed; arming couples an unconditional `console.error` (dist `diagnostics-DDazRHgl.js:14`, `packrat-entry-*.js:881`) | **CONFIRMED, and now sourced**: `utils.ts:33` / `utils.ts:38` gate `expected` on `diagnosticsEnabled && label`; `parser.ts:67-69` is the unconditional `console.error`. The corpus had dist coordinates only. | upheld + source cites + **L-M7** (the sink is unconfigurable while `debug()` two lines away takes a `logger`) |
| **O-15 PT-03** — `PACKRAT_ARMED` one-way latch, `:678`/`:722`/`:682`/`:714`, no assignment back to false; 93.9 → 138.2 ns = 1.47×; `resetPackrat()` leaves 139.3 | **CONFIRMED at both layers.** Source: `packrat.ts:156` (`false`), `:290` (`true`), read at `:217` / `:266`; `grep -rn PACKRAT_ARMED src/ dist/` returns exactly those five source rows and the four dist rows the corpus cited, and **no other assignment**. `resetPackrat` (`:262-272`) early-returns unarmed and never disarms when armed. | upheld — and sharpened to **L-B4**: the latch arms at **construction**, not at first invocation (`packrat.ts:290`, inside `makeMemoized`), so a memoized parser that is *built and never called*, in an unrelated module, taxes every parse in the process forever |
| **O-15 PT-04** — `Parser.lazy` arity 1; deepest OK 7,761; `RangeError` at 7,762 | **CONFIRMED structurally**: `parser.ts:702-707` takes `(fn)` only; `lazy.ts:18-24` has no counter, no ceiling, no `ok:false` arm. Re-measured twice independently (O-15 2026-07-27; X.P.W1 G-9 2026-08-03) at the same 7,761 — I did **not** re-measure: a third identical number adds nothing and the ceiling is box-state-dependent (X.P.W1 G-4's own 55.6 vs 93.9 ns drift is the precedent). | upheld as **L-M9** |
| **O-15 PT-07** — 5/5 non-string inputs throw a raw `TypeError`; `.parse()` returns `undefined` on failure (indistinguishable from a successful `undefined`) | **BOTH HALVES ARE UNDERSTATEMENTS, and I contradict them explicitly.** `.parse()` on failure returns a **stale partial value**, not `undefined` (PROBE-1). The non-string boundary is a **three-way split** — throw *or* silent failure *or* **silent success** — depending on which leaf touches `src` first (PROBE-4, PROBE-8). | **L-B1**, **L-B2**. O-15's *cure* (a named JS-boundary invariant above parse-that) is more necessary than O-15 argued, not less: a caller who adds `try/catch` to cure "5/5 throw" still gets a silent wrong answer from a regex-headed or `eof`-headed grammar |
| **parser-band** G8 idiom gate — "no `.opt()` child of any `all()`" (`parser-band.md:108`, `:134`) | The gate is correct and necessary. **Why** it is necessary is a library defect, not a grammar style rule: `all()` drops `undefined` positionally (`leaf.ts:199`, `:207`, `:230-246`, `:267`) | **L-M4** — the band had to build a graph-walking external gate to police a footgun the library could have closed |
| **X.P.W1 §3.5 / G-4** — one fresh process per bench cell because the latch is one-way | correct, and this challenge supplies the *construction*-time arming detail that makes the harness rule stricter: "we did not call `memoize`" was already forbidden as evidence (**W1 §3a**); "no memoized parser was *constructed*" is the actual predicate | reinforces **L-B4** |
| **X.P.W1 §3.6 / G-5** — quarantine diagnostics from the bench | correct: `parser.ts:67-69` writes to `console.error` on **every failed top-level parse** once armed, so a bench that arms diagnostics measures I/O | reinforces **L-M7** |
| **X.P.W2 §3b O-8** — "no operator reads or writes process-global mutable state" | the algebra law is right, and the incumbent breaches it in **three** places, not one: `PACKRAT_ARMED` (`packrat.ts:156`), `diagnosticsEnabled` (`utils.ts:6`), and `collectedDiagnostics` (`utils.ts:95`) | **L-B3** is the third one, and it is the one the corpus has not yet named |

---

## 1. BLOCKERS

### L-B1 — `.parse()` returns a stale, plausible-looking value on failure

**Severity**: BLOCKER · `parser.ts:77-79`, with the mechanism at `parser.ts:74` and the leaves that never
clear `value` on failure (`leaf.ts:291-293`, `:303-305`).

`parse(val)` is `return this.parseState(val).value`. `parseStateInner` returns the *original* `state`
(`:74`) — not the `errorState` it built at `:61-66` — and no combinator on the failure path clears
`state.value`. A failed sequence therefore hands back the value of the last arm that happened to succeed.

**API-TEST**:

```
$ node --input-type=module -e '… const p = string("a").then(string("b")); p.parse("ax") …'
PROBE-1 .parse() failure returns: "a" | isError: true
PROBE-1b success: ["a","b"]
PROBE-7 many(2) on miss -> value: [] isError: true
```

`string("a").then(string("b")).parse("ax")` returns `"a"`. `string("q").many(2).parse("zz")` returns `[]`
(`parser.ts:555` writes the empty array *into the error state*). Both are values a consumer would accept.
The failure is only detectable by not using the documented convenience method at all.

**Why this is worse than O-15 PT-07 states**: PT-07 recorded `undefined`-on-failure as "indistinguishable
from a successful `undefined`". The tree is one step worse — the failure value is indistinguishable from a
successful value **of the expected type**. A grammar ending in `.map(xs => xs[0])` returns a `string` on
failure exactly as it does on success.

**Falsifier**: exhibit any failing parse whose `.parse()` return is distinguishable from a success return by
inspection of the returned value alone, for a grammar whose success type includes `string`, `[]`, or
`undefined`. If `parseStateInner` returned `errorState` (which has `value === undefined` by construction,
`:61`) the claim would weaken to PT-07's original; it returns `state` (`:74`), so it does not. Falsified
also by a test pinning the failure return — `grep -rn "\.parse(" test/*.ts` = 55 call sites, none asserting
a failure-mode return value.

---

### L-B2 — the non-string boundary is a three-way split: throw / silent failure / **silent success**

**Severity**: BLOCKER · `parser.ts:34-52` (no guard at the entry), `state.ts:47-53` (`src: string` is a
compile-time claim only), `leaf.ts:326-357` (the regex leaf).

`parseState(val: string)` performs no runtime check. What a non-string does is decided by whichever leaf
first touches `state.src`:

**API-TEST**:

```
PROBE-2 [object Number]    -> TypeError: state.src.charCodeAt is not a function
PROBE-2 [object Null]      -> TypeError: Cannot read properties of null (reading 'charCodeAt')
PROBE-2 [object Undefined] -> TypeError: Cannot read properties of undefined (reading 'charCodeAt')
PROBE-2 [object Object]    -> TypeError: state.src.charCodeAt is not a function
PROBE-2 [object Array]     -> TypeError: state.src.charCodeAt is not a function

PROBE-4  eof().parse(12345)              -> NO THROW, value: undefined, isError: true
PROBE-8  regex(/a*/).parseState(12345)   -> isError: FALSE, value: undefined, offset: 0
PROBE-8b regex(/\d+/).parseState(12345)  -> TypeError: state.src.substring is not a function
PROBE-8c regex(/a*/).parseState({})      -> isError: FALSE
```

Three regimes from one input class. `eof()` (`leaf.ts:13`) compares `0 >= undefined` → `false` → returns an
ordinary parse failure. `regex(/a*/)` reaches `sticky.test(state.src)` (`leaf.ts:344`), where `RegExp.test`
**coerces the number to a string**, matches empty, and takes the empty-match arm (`leaf.ts:355-357`) —
`isError: false`. **A number parses successfully.** Change the pattern to `/\d+/` and the same input throws
at `substring` (`leaf.ts:350`) instead.

**Why this matters beyond PT-07**: O-15's stated cure — a JS-boundary invariant *above* parse-that — is not
merely "our cure rather than their ask"; it is the **only** cure, because a `try/catch` (the obvious
consumer reflex, and the one the parser-band's cand-O shield posture debates at `parser-band.md:142`) does
not catch the silent-success regime at all. X.P.W1 §3.9 and G-10's `RED GUARD parseState(non-string)
totality 5/5 throw raw TypeError` row should be read as a *lower bound* on the class, not its
characterization; the harness that asserts the invariant must assert **typed failure**, never "it throws".

**Falsifier**: find a runtime guard on `src` anywhere between `Parser.parseState` and the leaves —
`grep -n "typeof.*string" src/parse/*.ts` returns nothing on the parse path. Or exhibit a leaf ordering
under which all non-string inputs converge to one regime; PROBE-2 vs PROBE-8 exhibit two, which is
sufficient to refute convergence.

---

### L-B3 — `recover()`'s diagnostics live in a module-global array with a LIFO pop; the module's own header claims otherwise

**Severity**: BLOCKER · `parser.ts:653-688` (esp. `:666`, `:674`) · `utils.ts:95`, `:115-124`, `:127`,
`:146-148`.

`utils.ts:20-26` states the design law: *"The furthest-offset / expected-set / suggestions /
secondarySpans live on the ParserState instance …, not on module globals. This makes a parse reentrant and
interleave-safe."* That is true of the four fields it names and **false of the fifth artifact in the same
file**: `let collectedDiagnostics: Diagnostic[] = []` (`utils.ts:95`) is a module global with no epoch, no
per-parse ownership, and no automatic clearing.

Three consequences, each independent:

1. **Wrong-diagnostic pop.** `recover()` pushes a diagnostic (`:666` → `utils.ts:115`), runs `sync`, and on
   sync failure pops "the" diagnostic back off (`:674` → `utils.ts:147` `collectedDiagnostics.pop()`). If
   anything pushed in between — a nested `.parse()` inside a `.map`, exactly the re-entrancy scenario
   `parser.ts:35-42` was written to make sound, or a second `recover()` deeper in the same `sync` parser —
   the pop removes **the wrong record**. The pop is positional; the push carried no identity.
2. **Unbounded growth.** Nothing clears the array except a manual `clearCollectedDiagnostics()`
   (`utils.ts:142`). A long-running process using `recover()` retains every diagnostic ever produced, each
   holding copied `expected` / `suggestions` / `secondarySpans` arrays and a 20-char `found` slice
   (`utils.ts:113`).
3. **The re-entrancy cure is half-applied.** `packratEnter`/`packratExit` (`parser.ts:43-48`) snapshot and
   restore *five* packrat globals. `collectedDiagnostics` is not among them (`packrat.ts:196-202`
   `PackratEpoch` has `memo/heads/growing/lrStack/currentSrc`). The nested-parse hazard PT-Q1 closed for
   memo cells is wide open for diagnostics.

This is the third breach of X.P.W2 §3b **O-8** ("no operator reads or writes process-global mutable
state"), alongside `PACKRAT_ARMED` and `diagnosticsEnabled` — and the one the corpus has not yet named.

**Aggravating**: `recover()` also calls `resetErrorState(state)` transitively (`utils.ts:127`), which sets
`state.furthest = -1`. Any *enclosing* failure after a recovery therefore reports its position from a
reset baseline, discarding the outer parse's furthest-offset tracking — the precise corruption
`test/reentrancy.test.ts:50-56` exists to forbid for the nested-`.parse()` case.

**Falsifier**: `recover()` has **zero callers and zero tests** in the entire repository
(`grep -rn "recover" src/ test/` returns only the `parserNames` string at `state.ts:168`, two comment
headers, and the definition). So this defect is currently unreachable in practice — which is the falsifier's
other edge: it is unreachable *because the combinator is dead* (**L-M11**), not because the coupling is
sound. Wire one consumer and it is live. To falsify the mechanism itself, exhibit an identity on the pushed
record that `popLastDiagnostic()` checks; `utils.ts:146-148` checks none.

---

### L-B4 — the packrat latch arms at **construction**, taxing every parse in the process forever, cross-module

**Severity**: BLOCKER · `packrat.ts:290` (`PACKRAT_ARMED = true`, first statement of `makeMemoized`) ·
`parser.ts:43` (`packratEnter()` on every `parseState`) · `packrat.ts:216-231`, `:243-250`, `:262-272`.

Confirmed one-way at the bytes, both layers:

```
$ grep -rn "PACKRAT_ARMED" src/ dist/
src/parse/packrat.ts:156:let PACKRAT_ARMED = false;
src/parse/packrat.ts:217:    if (!PACKRAT_ARMED) return null;
src/parse/packrat.ts:266:    if (!PACKRAT_ARMED) return;
src/parse/packrat.ts:290:    PACKRAT_ARMED = true;
dist/packrat-entry-CS1td-8B.js:678:let PACKRAT_ARMED = false;
dist/packrat-entry-CS1td-8B.js:682:  if (!PACKRAT_ARMED) return null;
dist/packrat-entry-CS1td-8B.js:714:  if (!PACKRAT_ARMED) return;
dist/packrat-entry-CS1td-8B.js:722:  PACKRAT_ARMED = true;
```

The dist coordinates reproduce **O-15 PT-03 exactly** (`:678` false, `:722` true, read at `:682`/`:714`, no
assignment back). Two assignments in the whole bundle; the second is monotone.

What the corpus has not stated: `PACKRAT_ARMED = true` is at `makeMemoized`'s **first line** — arming is a
side effect of *building* a memoized parser, not of running one. The comment at `packrat.ts:284-289`
defends this deliberately ("Arming at CONSTRUCTION (not first invocation) guarantees the latch is set before
any memoized parse can open its epoch"). The soundness argument is correct; the blast radius is the defect:

- A module that constructs `memoize(p)` at import time and **never calls it** arms the process.
- The tax is paid by *every unrelated grammar* in the process — three `new Map()` plus one snapshot object
  per top-level `parseState` (`packrat.ts:218-229`), on a library whose whole-parse budget O-15 measured at
  **93.9 ns**. O-15's measured cost: **138.2 ns armed = 1.47×**, with `resetPackrat()` leaving **139.3**.
- There is no disarm, no scoped arm, no per-parse opt-in parameter. `resetPackrat()` (`:262-272`) is named
  as though it restores the initial state and does not.

**Falsifier**: exhibit any code path assigning `false` after line 290 (none exists — the grep above is
exhaustive over source and dist), or a per-parse arming parameter (`packratEnter()` takes none, `:216`).
The blast-radius half is falsifiable by constructing `memoize()` in one module and measuring an unrelated
grammar's parse in the same process — **not run here**, because arming the latch is forbidden by this
audit's law and is irreversible within a process. The source is unambiguous without it: `parser.ts:43`
calls `packratEnter()` unconditionally for every `parseState`, and `packratEnter`'s only gate is the
process-global latch.

**Cross-reference**: this is the concrete instance behind X.P.W2 §3b **O-8** ("a one-way `PACKRAT_ARMED`
costing 1.47× forever, whose reset does not disarm, is a state machine with one absorbing state") and it
strengthens X.P.W1 G-4's construction rule: the harness predicate must be "no memoizer was **constructed**",
not "no memoizer was called".

---

## 2. MAJORS

### L-M1 — `mergeErrorState` allocates two arrays on every furthest-advance, with diagnostics off

**Severity**: MAJOR · `utils.ts:34-35`, inside the `state.offset > state.furthest` branch (`:29`).

```ts
state.furthest = state.offset;
state.expected = diagnosticsEnabled && label ? [label] : undefined;   // :33 — correctly gated
state.suggestions = [];                                               // :34 — NOT gated
state.secondarySpans = [];                                            // :35 — NOT gated
```

`mergeErrorState` is the hottest non-leaf function in the library: it is called from `then` (`parser.ts:93`),
`skip` (`:201`), `next` (`:223`), `opt` (`:239`), `not` ×3 (`:258`, `:273`, `:291`), `wrap` ×2 (`:410`,
`:418`), `call` ×3 (`:447`, `:460`, `:468`), `many` (`:553`), `sepBy` (`:626`), plus `any` (`leaf.ts:54`,
`:69`), `dispatch` (`:142`), `string` ×2 (`:291`, `:303`), `regex` (`:360`), `eof` (`:16`). Every time a
backtracking parse advances its furthest offset — which on a forward-progressing parse is *often* — it
allocates two fresh arrays.

Under the shipping default (`diagnosticsEnabled === false`, `utils.ts:6`) those arrays are **write-only**.
The complete reader set is `debug.ts:180`/`:185` (both inside `if (isError && isDiagnosticsEnabled())`,
`:174`), `utils.ts:121-122` (the `recover` path only — dead, L-M11), and `parser.ts:63-64` (reference copy,
no allocation).

**Falsifier**: gate `:34-35` on `diagnosticsEnabled`, or point them at one shared frozen `EMPTY` sentinel,
and run `npm test` (16 test files, 1,513 lines). If any test reds, the arrays are read with diagnostics off
and the claim dies. The reader grep above says none can be.

---

### L-M2 — `wrap()` slices the source on every close-delimiter failure, then throws the slice away

**Severity**: MAJOR · `parser.ts:419` · `utils.ts:66-71`.

```ts
reportUnclosedDelimiter(state, state.src.slice(savedOffset, openEnd), savedOffset);
```

The argument is evaluated eagerly; `reportUnclosedDelimiter`'s first statement is
`if (!diagnosticsEnabled) return;` (`utils.ts:71`). So in the shipping default every failing `wrap`
allocates a string that is discarded one frame later — on the *reject* path, which the parser-band's
**DEBT-2** identifies as the leg where the incumbent regex engine genuinely wins and which X.P.W1 §5.d.3
makes its own bench leg precisely so it cannot be averaged away. A CSS grammar with `wrap`-based
`(`…`)` / `[`…`]` alternatives pays one throwaway substring per rejected alternative.

**Falsifier**: hoist the slice inside `reportUnclosedDelimiter` (pass `savedOffset`/`openEnd` and let the
reporter slice after its own early return) and show a reject-leg measurement that does not move; the
allocation is real either way, so the falsifier is about magnitude, not existence. The existence claim dies
only if `reportUnclosedDelimiter` is shown to consume the text before its guard — `utils.ts:71` is the
first line of the body.

---

### L-M3 — every root `Parser` retains its last input string for the process lifetime

**Severity**: MAJOR · `parser.ts:26` (`state: ParserState<T> | undefined`), `:66`, `:71`.

`parseStateInner` assigns `this.state` on both arms. A `Parser` is a long-lived object — grammars are built
once at module init and `Parser.lazy` caches its target permanently (`lazy.ts:20-23`,
`LAZY_PARSER_CACHE: WeakMap` at `:5`) — so the root parser holds a `ParserState` holding the whole `src`.

**API-TEST**:

```
PROBE-6 parser retains src of length: 1001
```

after `p.parse("a" + "z".repeat(1000))`. A 10 MB stylesheet parsed once is retained by the grammar root
until the next parse replaces it. Nothing clears `this.state`; nothing reads it except `toString()`
(`state.ts:136-138`) and the `console.error` at `:68`.

**Falsifier**: find a clear site (`grep -n "this.state" src/parse/parser.ts` → `:66`, `:71` only, both
assignments). Or argue the field is required by the public API — it is used only for the error render, which
already has the state in hand at `:68`; a caller wanting the error view already receives a state from
`parseState()`.

---

### L-M4 — `all()` drops `undefined` positionally, so `opt()` inside `all()` silently shifts arity

**Severity**: MAJOR · `leaf.ts:199`, `:207` (arity-2), `:230`, `:238`, `:246` (arity-3), `:267` (general);
interaction with `parser.ts:241` (`opt` yields `state.ok(undefined)`).

**API-TEST**:

```
PROBE-3 all(a, b.opt(), c) — present: ["a","b","c"]   absent: ["a","c"]
```

Positional destructuring (`const [x, y, z] = …`) silently binds the wrong values. Every parser that can
legitimately succeed with `undefined` is affected, not just `opt()`: `eof()` (`leaf.ts:14`), a regex with an
empty match (`leaf.ts:355-357`), `regex` with a `matchFunction` returning `""` (`leaf.ts:342`).

This is not a style question. The parser-band had to build a **graph-walking structural gate** to police it
(`parser-band.md:108` "`.opt()` only ever behind `.then()`/`.next()`, never inside `all()`"; `:134` G8 "no
`opt` under `all`") and observes that "a grep cannot prove that, the graph can" (`:17`). An external
structural gate over consumer grammars is the cost of a library-side decision to make a sequence combinator
variadic in its output length.

**Falsifier**: show the drop is documented at the API boundary — `leaf.ts:154-164` (`all`) has no doc
comment; the behavior is described only inside the private `fuseAll` implementation comment (`:166-177`,
"the EXACT drop-`undefined` … semantics of the original `all()`"). Or show a typed signature that reflects
it: `all()` returns `Parser<ExtractValue<T>>` (`leaf.ts:158`, `:163`) — a **fixed-length tuple type** for a
variable-length runtime array. The type is a lie in exactly the case that bites.

---

### L-M5 — a whole dead flag tier: `FLAG_EOF` unreachable, `flaggedParser` constructed and discarded, `call()` unreachable, `unsafeCall()` uncalled

**Severity**: MAJOR · `parser.ts:20-22`, `:27`, `:437-478`, `:488-517` · `state.ts:91-94`.

Four dead artifacts, each verified by exhaustive grep:

1. **`FLAG_EOF` is never assigned.** `grep -rn "FLAG_EOF\|\.flags\s*=" src/` → `parser.ts:22` (the
   constant), `:466` (the read), `:496` (the only `.flags =` in the tree, and it writes
   `this.flags | FLAG_TRIM_WS`). Since no parser is ever born with `FLAG_EOF`, `parser.ts:466-476` — 11
   lines including the trailing-content suggestion and the `<end of input>` merge — is **unreachable**.
2. **`flaggedParser` is built and thrown away.** `parser.ts:492-496` constructs a `Parser`, sets its flags,
   and the function returns a *different* parser at `:514-517`. The intervening comment ("Also provide the
   inline version for direct `.parser()` callers", `:497`) describes an intent the code inverts: the inline
   version is the *only* version returned. One wasted `Parser` allocation per `.trim()` call site — 33 in
   the tree (`grep -rn "\.trim(" src/ test/` → 9 src + 24 test).
3. **`Parser.call()` is unreachable from any combinator.** Its non-zero-flag branches (`:442-477`) can only
   run for a parser with non-zero `flags`, which only `flaggedParser` ever had. `grep -rn "\.call("` finds
   `state.ts:93`, the discarded closure at `parser.ts:493`, and `test/debug.test.ts:115`. Every combinator
   in the library calls `.parser()` directly.
4. **`ParserState.unsafeCall()` has zero callers** (`state.ts:92-94`; the grep above is its only hit besides
   its own definition), while its sibling `unsafeCallRaw` has five (`parser.ts:218`, `:313`, `:376`,
   `:402`, `:416`).

**Why MAJOR and not MINOR**: this repository has a codified precept against exactly this, with a gate to
enforce it — `scripts/proof-no-dead-combinator.mjs:10-12`: *"A never-importable export is not part of the
public contract; an export born one prior tranche with zero workspace consumers is dead by the precept."*
The gate cannot catch any of the four, because its ban list is **two hardcoded names**
(`proof-no-dead-combinator.mjs:29-32`: `thenMap`, `fuse`). The gate has a vacuity guard for its own grep
(`:52-59`) but none for its own *coverage*. A precept with a gate that only knows yesterday's two violations
is a precept that ratchets backwards.

**Falsifier**: exhibit a public path that sets `flags` (none: the only assignment is `:496`), or a caller of
`unsafeCall` (none), or show `trim()` returns `flaggedParser` on some branch (`:514` returns the
`whitespaceTrim` parser unconditionally; the `parser.context?.name === "whitespace"` branch at `:488` has a
single `return`).

---

### L-M6 — the `min`-sized pre-allocation forces HOLEY elements kind, contradicted by the same repo 70 lines away

**Severity**: MAJOR · `parser.ts:526`, `:572` · `leaf.ts:257` (vs `leaf.ts:191`, `:222`).

`many()` and `sepBy()` pre-size the result when `min > 0`: `const matches: T[] = est > 0 ? new Array<T>(est)
: []` (`:526`, `:572`), then fill by index (`:540`, `:585`, `:613`). `fuseAll`'s general arm does the same
(`leaf.ts:257`). `new Array(n)` produces a **holey** array in V8 and index-filling does **not** transition
it back to packed.

**API-TEST** (`node --allow-natives-syntax`, `%DebugPrint`):

```
new Array(2) filled by index      -> HOLEY_SMI_ELEMENTS
[] then push, push                -> PACKED_SMI_ELEMENTS
[undefined, undefined] filled     -> PACKED_ELEMENTS
```

So the "optimization" pessimizes the elements kind of every `many(min≥1)` / `sepBy(min≥1)` result and of
every `all()` with arity ≥ 4 — for the life of the array, including in the consumer's downstream loops.
The same file already knows this: `fuseAll`'s arity-2 and arity-3 arms deliberately write
`[undefined, undefined]` / `[undefined, undefined, undefined]` (`leaf.ts:191`, `:222`) — **packed** — and
the general arm at `:257` does not. Two contradictory allocation idioms, 66 lines apart, with the packed one
labelled "the deliverable" in the comment (`:189-190`).

**Falsifier**: the probe above is the falsifier and it ran; to overturn, exhibit a V8 version where
`new Array(n)` + index fill yields PACKED, or show `matches.length = len` (`:548`, `:621`) restores packed —
it does not (truncation preserves the map). A weaker rebuttal — "the holey penalty is smaller than the
push-growth penalty for large `min`" — is measurable and would bound the claim to small `min`; note the
observed grammars use `min` of 0, 1, or 2.

---

### L-M7 — PT-01, sourced: the diagnostic sink is unconfigurable, two lines from a combinator that takes a logger

**Severity**: MAJOR · `parser.ts:67-69` · `utils.ts:33`, `:38`, `:6-18`.

```ts
if (isDiagnosticsEnabled()) {
    console.error(this.state.toString());     // :68
}
```

Confirms O-15 PT-01 at the source (the corpus had `dist/diagnostics-DDazRHgl.js:14` and
`packrat-entry-*.js:881` only). Three compounding facts:

- `expected` is populated **only** when `diagnosticsEnabled` (`utils.ts:33`, `:38`), so the machine-readable
  half of the diagnostic is unavailable without arming.
- Arming produces an **unconditional write to `console.error`** on every failed top-level parse. There is no
  sink parameter, no return-the-string mode, no level.
- `Parser.debug()` — 25 lines below, `parser.ts:690-696` — accepts `logger: (...s: unknown[]) => void =
  console.log`. The library already knows how to take a sink; the diagnostics path does not.
- `enableDiagnostics()` is arity-0 process-global (`utils.ts:8-10`), reproducing X.P.W1 G-5's
  `RED DEBT-1 enableDiagnostics() is process-global (arity) 0 args`.

Consequence for X.P.W1 G-5 (zero `console.error` on the bench's stderr): the quarantine is not merely
prudent, it is **structurally required** — you cannot obtain labelled expectations and a silent stderr from
one process.

**Falsifier**: find a way to read `state.expected` with diagnostics off (`utils.ts:33` sets `undefined`), or
a way to arm diagnostics without the print (`parser.ts:67` is the only gate and it has no else-branch, no
sink argument). Either would falsify. Note the print is on `parseState` only, so combinator-internal
failures do not print — that bounds the volume, not the coupling.

---

### L-M8 — `parseState()` hands back a state positioned at the backtracked offset while the library's own error view sits at `furthest`

**Severity**: MAJOR · `parser.ts:55-74` (esp. `:60-66` vs `:74`) · `state.ts:127-138`, `debug.ts:59`.

**API-TEST**:

```
PROBE-5 returned === this.state: false | returned.offset: 0  this.state.offset: 1
PROBE-9 returned.offset: 0  returned.furthest: 1 | this.state.offset: 1
```

`parseStateInner` builds `errorState` at `furthest` (`:61`), stores it on `this.state` (`:66`) — and returns
the *other* object (`:74`). A consumer holding the returned state and calling `.toString()` gets
`statePrint` → `addCursor` → `state.getLineAndColumn()` (`debug.ts:59`), which reads `this.offset` = the
**backtracked** offset. The cursor lands at column 0 for a failure at offset 1. The correct render is only
available from `parser.state`, an undocumented instance field that the next parse overwrites (L-M3).

Two error views of one parse, with the better one on the mutable side. The error-path allocation itself
(a whole `ParserState`, `:61`) is acceptable on a cold path; the divergence is not.

**Falsifier**: return `errorState` from `:74` and re-run the suite — but note that would *also* change
`.parse()`'s failure return to `undefined` (weakening L-B1 to PT-07's original reading), which is evidence
the two defects share one root. To falsify as stated, show a documented reason the caller should receive the
backtracked state; `parser.ts:56-59`'s comment explains the *errorState* construction and is silent on why
it is not what is returned.

---

### L-M9 — no recursion ceiling exists anywhere; the failure crosses the boundary as a throw

**Severity**: MAJOR · `parser.ts:702-707` · `lazy.ts:18-24`.

`Parser.lazy(fn)` is arity-1; `createLazyCached` is a two-line memo with no counter and no bound. There is
no depth parameter on any combinator, no `ok:false` arm for exhaustion, and no guard in `parseState`. The
consequence is measured twice independently (O-15 PT-04, 2026-07-27: deepest OK **7,761**, `RangeError` at
7,762; X.P.W1 G-9, 2026-08-03: reproduced exactly) — and it is a **throw**, not a returned failure, so a
consumer's failure handling never sees it.

I did not re-measure: two independent reproductions of the same integer already exist, and the ceiling is
box-state-dependent in the same way X.P.W1 G-4 documents for the ns figures (55.6 vs 93.9 on two dates).
A third identical number would be ceremony.

This is the library-side half of `parser-band.md:118` **DEBT-3** ("recursion bounded by construction, not by
catch") and of X.P.W2 §3b's "bounded back-edge (the depth bound an **algebra parameter**)". The band framed
it as a grammar act; at the library altitude the point is sharper — a grammar **cannot** bound its own
recursion while `Parser.lazy` takes no bound, so cand-O's shield is load-bearing by construction of the
library, not by choice of the grammar. That partially adjudicates the preserved try/catch DISSENT
(`parser-band.md:142`) in cand-O's favour *for as long as the library ships this signature*.

**Falsifier**: find a depth parameter or counter (`grep -n "depth\|MAX_" src/parse/parser.ts src/parse/lazy.ts`
→ nothing), or exhibit a `RangeError` being converted to `isError` anywhere on the parse path (no `try` exists
in `parser.ts` except the packrat epoch's `finally`, `:44-48`).

---

### L-M10 — `map(fn, mapError = true)` converts a failure into a success and maps the stale error-path value

**Severity**: MAJOR · `parser.ts:146-154`.

```ts
if (!state.isError || mapError) {
    return state.ok(fn(state.value as T));    // :151 — ok() sets isError = false (state.ts:58)
}
```

With `mapError = true` the combinator (a) calls `fn` on `state.value`, which on the error path is the stale
value of L-B1, and (b) **clears the error flag** via `ok()`. A failed parse becomes a successful parse of a
function applied to garbage. The parameter is undocumented (no doc comment on `map`), and `state.value as T`
is a cast asserting exactly the invariant that fails.

**Falsifier**: exhibit a consumer relying on the error-clearing (`grep -rn "map(.*,\s*true)" src/ test/` →
no hits in the tree), or a documented contract for the error-path value. Weakest form of the claim — "the
parameter is a footgun with no consumers" — survives even if some grammar wants error-mapping, because the
value it maps is unspecified.

---

### L-M11 — `mapState()` and `recover()` are dead public surface: zero consumers, zero tests

**Severity**: MAJOR · `parser.ts:162-187` (`mapState`), `:653-688` (`recover`).

```
$ grep -rn "mapState" src/ test/
src/parse/state.ts:167:    "mapState",          # the parserNames literal
src/parse/parser.ts:162,168,184,185            # the definition
$ grep -rn "recover" src/ test/
src/parse/state.ts:168:    "recover",           # the parserNames literal
src/parse/debug.ts:194, src/parse/utils.ts:82  # comment headers
                                                # (+ the definition)
```

Neither has a call site in `src/`, a test in `test/` (16 files, 1,513 lines), or a consumer in value.js
(which does not depend on the package at all). By this repository's own precept —
`proof-no-dead-combinator.mjs:10-12` — both are dead. `recover()` additionally carries the L-B3 global-state
coupling and `mapState()` carries L-m6's `Object.create` view; each is an untested 26-line and 36-line
liability on the public surface.

**Falsifier**: a consumer outside the three trees the gate sweeps (`proof-no-dead-combinator.mjs:63-68`
sweeps parse-that `src`/`test`, value.js `src`, keyframes.js `src`). If one exists, the deadness claim
narrows to "untested" — which is still MAJOR for a combinator whose failure mode is silent diagnostic
mis-attribution.

---

## 3. MINORS

| id | severity | claim | provenance | falsifier |
|---|---|---|---|---|
| **L-m1** | MINOR | `then` / `skip` / `next` are three copies of one 15-line closure differing only in which value survives and whether the second parser is called via `.parser()` or `unsafeCallRaw`. A single `seq(keep)` factory expresses all three. | `parser.ts:82-97`, `:190-205`, `:213-227` | Show a semantic difference beyond value selection. `next` uses `state.unsafeCallRaw` (`:218`) where `then`/`skip` call `.parser()` directly (`:88`, `:196`) — that difference is a *type-cast* choke point, not behavior, and is itself evidence of the duplication drifting. |
| **L-m2** | MINOR | `or()` and `any()`-arity-2 are the same algorithm in two modules, and they **disagree**: `any` merges error state before failing (`leaf.ts:54`), `or` does not. Two-way alternation therefore reports differently depending on which spelling the grammar used. | `parser.ts:106-116` vs `leaf.ts:42-57` | Show the merge is unnecessary in `or` because the last-tried arm always merged — true for leaf arms, false for an arm whose failure path skips the merge (`chain`, `minus`, `peek`). |
| **L-m3** | MINOR | Dead type + dead import in the first 11 lines: `ExtractValue` (`parser.ts:9-11`) has zero references in the file and is re-declared locally in `leaf.ts:155-157`; `Span` (`parser.ts:2`) is imported and never used. | `grep -n "ExtractValue" src/parse/parser.ts` → line 9 only; `grep -n "Span" src/parse/parser.ts` → line 2 (import) + `:64` (`secondarySpans`, unrelated) | Compile with `noUnusedLocals` — `tsconfig.json` sets `strict: true` but not `noUnusedLocals`/`noUnusedParameters`, which is why these survive. |
| **L-m4** | MINOR | `chain()` neither restores the offset nor merges error state when the continuation fails, unlike every sibling combinator. A `chain` inside a hand-written loop leaves the offset mid-parse. | `parser.ts:131-138` (`return fn(state.value).parser(...)` with no failure arm) vs `:93-95`, `:201-203`, `:223-225` | Argue the enclosing `or`/`any` always restores — true for those enclosures, not for `many`'s loop body, which restores only its own `savedOffset` (`:534`) — that is in fact sufficient. So the claim reduces to *inconsistent posture*, which is what MINOR records. |
| **L-m5** | MINOR | Choke-point discipline is declared and then bypassed: `peek()` writes `state.value = value` directly (`:350`) rather than `unsafeSetValue`, which `state.ts:86-89` declares "the single choke point for the mutable-state cast pattern"; `minus()` never calls `mergeErrorState` (`:311-325`), so a `minus` failure contributes nothing to furthest tracking. | `parser.ts:350`, `:311-325`; `state.ts:86-89` | Show `peek`'s direct write is type-safe by construction (it is — `value: T`), which reduces the claim to policy drift; and show `minus`'s inner parsers always merge (the *excluded* parser's success is the failure cause, and success never merges — so the gap is real). |
| **L-m6** | MINOR | `mapState()` builds its "old state" view with `Object.create(state)` (`:177-179`), producing an object with a different hidden class from every real `ParserState` at the callback site (guaranteed polymorphic), a prototype-shadowing write hazard (a callback calling `oldView.ok(...)` mutates the view, not the state), and a type lie (declared `ParserState<T>`, not constructed by it). The comment claims it "avoids full clone on success" — it still allocates. | `parser.ts:168-181` | Replace with `state.clone()` (`state.ts:101-109`) and show the cost; or show the callback is contractually read-only (nothing enforces it). Currently unreachable — see L-M11. |
| **L-m7** | MINOR | The class's type parameter is largely unenforced. `ParserFunction<T>` declares `T` and never uses it (`parser.ts:13-16`: `(val: ParserState<any>) => ParserState<any>`), so `new Parser<Foo>(anyFn)` type-checks against any function. The file carries **86** `as Parser…`, **37** `as ParserState…`, **5** `as unknown as`, and one non-null assertion (`:282`) in 711 lines — roughly one cast every 5.5 lines. | `parser.ts:13-16`; `grep -c` counts above; `:282` `parser!.parser(...)` | Show the casts are all provably safe (several are — `:282` is guarded by `:300`); the claim is about *checkability*, so it dies only if the erasure at `:13-16` is removed and the file still compiles. |
| **L-m8** | MINOR | `many`/`sepBy` allocate a fresh `[]` for the failure value (`:555`, `:628`) instead of reusing the already-allocated `matches`, and that empty array becomes `.parse()`'s failure return (PROBE-7) — a plausible success value, compounding L-B1. | `parser.ts:550-556`, `:623-629` | Reuse `matches` (already trimmed at `:548`/`:621`) and show a behavior change; there is none, the array is discarded by every non-`.parse()` caller. |
| **L-m9** | MINOR | `Parser.eof()` overwrites the composed parser's context (`:640`), discarding `skip`'s args, so `parserPrint` loses the composition and falls through `debug.ts:330` `default: return undefined` → prints the bare name `"eof"`. The printer's own switch has no `"eof"` case though `"eof"` is a registered `parserName` (`state.ts:163`). | `parser.ts:638-642`; `debug.ts:267-333` | Print a `.eof()`-terminated grammar and compare to the pre-overwrite string; or show `"eof"` is deliberately opaque — `state.ts:163` registers it as a first-class name, which argues otherwise. |
| **L-m10** | MINOR | Goldilocks: 711 lines / 25 members on one class, mixing four concerns — the combinator algebra (18 methods), the parse entry + error rendering (`:34-79`), an entirely dead flag tier (`:20-22`, `:437-478`, `:488-517`, L-M5), and print delegation (`:690-700`). Removing the dead tier alone returns ~60 lines; the entry pair is the natural second seam. | whole file; `wc -l` = 711 | Argue a combinator core is cohesive by nature — true for the 18 algebra methods, which is why this is MINOR and scoped to the two non-algebra tiers rather than to the class as such. |

---

## 4. SUPERLATIVES (L-18 runs both ways — each with provenance and falsifier)

**S-1 — the PT-Q1 epoch is the correct shape, and it is free when unarmed.** `parser.ts:34-49` opens the
packrat epoch at the `parseState` **entry boundary** inside a `try/finally`, so a nested top-level parse
(a `.map` callback re-parsing a different source mid-grow) gets its own tables and the parent's are restored
*even on a throw*. Paired with the null-latch fast path (`packrat.ts:216-217` returns `null`;
`:243-244` early-returns on `null`) the unarmed cost is one call and one comparison. This is the correct
cure for module-global memo tables and it is strictly better than the 0.12.0 per-node `state.src !==
CURRENT_SRC` reset it replaced (`packrat.ts:164-171` documents the regression that motivated it).
*Falsifier*: exhibit an interleaving the snapshot misses — the `finally` covers throws, and
`test/reentrancy.test.ts` pins the furthest-offset half. The honest bound: it snapshots five packrat globals
and **not** `collectedDiagnostics` (**L-B3**), so the superlative is "correct shape, incomplete membership".

**S-2 — the zero-width progress guards close the classic combinator hang by construction.**
`parser.ts:538` (`many`) and `:605` (`sepBy`) break when an iteration consumes nothing, so
`regex(/a*/).many()` terminates. One comparison, no counter, no cap. *Falsifier*: a zero-width parser that
advances a *different* piece of state per iteration would still loop — none exists in this library, where
progress is `state.offset` alone.

**S-3 — `getCijKey`'s float64-exact key with a fail-loud boundary.** `packrat.ts:71-100` replaces a 32-bit
signed shift (which aliased at `parser.id >= 4096`, silently colliding two parsers' memo cells) with
`id * 2^32 + offset`, exact for `id ≤ 2,097,151` and any addressable offset, and **throws a `RangeError`
rather than aliasing** outside the budget (`:90-98`). The comment shows the arithmetic and names the failure
it prevents. This is the right way to kill an aliasing class: with arithmetic and a loud edge, not a wider
mask. *Falsifier*: `2^53` overflow inside the guard — the guard is `id > MEMO_MAX_ID || offset >= SPAN`,
which is exactly the safe-integer envelope. The one honest debit: the throw is a `RangeError` at parse time,
i.e. the same boundary posture L-B2/L-M9 criticize elsewhere — consistent with the module, and here it is
the *correct* trade because the alternative is a wrong answer.

**S-4 — `sepBy` rejects trailing separators by checkpointing before the separator.**
`parser.ts:594-611`: the checkpoint is taken *before* the separator, and a failed element rewinds past the
separator. No lookahead, no post-hoc trim, no `.opt()`. The doc comment (`:565-568`) states the semantics and
declares trailing-separator acceptance a grammar concern — a correct layering call. *Falsifier*: a grammar
wanting `a,b,` must now write it explicitly, which is the stated design, not a defect.

**S-5 — the hand-fused hot combinators are real work, correctly done.** `wrap()` inlines
`start.next(this).skip(end)` into one closure, removing two frames per invocation (`parser.ts:397-426`), and
`fuseAll`'s arity-2/3 unrolls (`leaf.ts:183-251`) build exactly one flat array with **packed** literals
where the unfused `a.then(b).then(c)` would build N−1 nested 2-tuples. The reasoning is written down at
`leaf.ts:166-177`. *Falsifier*: **L-M6** shows the general arm (`leaf.ts:257`) regresses to holey and
**L-M2** shows `wrap`'s reject path leaks a slice — so the superlative is bounded to the unrolled arms and
the success path, which is where it was measured.

**S-6 — the comments are evidence-linked, and that is rare.** Every non-obvious decision carries a ledger
id and its rationale: C-16 Option A at `parser.ts:125-130` (why `chain` threads falsy values, and that the
retired `chainError` had zero callers), PT-Q1 at `:35-42`, S.H1 at `packrat.ts:137-156`, PT-Q2 at
`packrat.ts:54-77`, PT-B3 at `leaf.ts:33-37`, PT-Q5's RETRACT note at `leaf.ts:92-98` (a *removed*
optimization documented with why it was removed — the rarest kind of comment). An auditor can trace a line
to a decision. *Falsifier and honest rider*: several comments assert **numbers no test pins** — "~30 ns /
3-Map alloc per parse; mid-teens % throughput on short CSS values" (`packrat.ts:141-143`), "eliminate 2
intermediate function frames" (`parser.ts:397-398`). Under **L-16** those are BENCH-PROCESS claims living in
SOURCE; they are unfalsifiable in the tree and, if they drift, the comment becomes an authority that outlives
its measurement. The superlative is the *linkage*; the debit is the *unpinned numbers*.

---

## 5. Adjudication notes for the wave that consumes this

1. **L-B1 and L-M8 share one root** — `parseStateInner` returning `state` (`:74`) instead of `errorState`
   (`:61`). One two-character change collapses both, and reduces the boundary problem to PT-07's original
   (documented) reading. It is the single highest-leverage line in the module.
2. **L-B2 is the reason X.P.W1 §3.9's JS-boundary invariant must assert a typed failure, not a throw.**
   A harness row reading "5/5 throw" is a lower bound; the silent-success regime (PROBE-8) is the one that
   corrupts a corpus without a red.
3. **L-B4 tightens X.P.W1 G-4's construction rule** from "no `memoize` called" to "no memoizer
   **constructed**", and makes X.P.W2's **O-8** concrete: the incumbent has three process-global mutables,
   and only one of them (`PACKRAT_ARMED`) is in the corpus today.
4. **L-M9 partially adjudicates the preserved try/catch DISSENT** (`parser-band.md:142`) in cand-O's favour,
   at the library altitude: no grammar can bound its own recursion while `Parser.lazy` has arity 1, so a
   shield is load-bearing by construction of the library. The dissent becomes tenable again only if the
   library grows a depth parameter — which is X.P.W2's "depth bound as an algebra parameter", not a grammar
   act.
5. **L-M5's second half is the meta-finding**: this repo has a dead-code precept *and* a gate, and the gate
   is a two-name hardcoded list (`proof-no-dead-combinator.mjs:29-32`). Four current violations sit outside
   it. Any wave that inherits these proof scripts should treat their coverage, not their greenness, as the
   thing to gate.

*Read-only audit. No byte of `/Users/mkbabb/Programming/parse-that` was written. `parse-that-css-totality-p2`
verified ABSENT and not created. `PACKRAT_ARMED` never armed by this session; `enableDiagnostics()` never
called. Sole write: this file.*
