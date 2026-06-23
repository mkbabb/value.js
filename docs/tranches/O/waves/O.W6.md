# O.W6 — SOTA perf: combinator/scanner hybrid

- **Band:** D (last wave) · **Class:** perf — hot-path rewrites, no grammar change, no
  API change · **Dep:** O.W5 (stable grammar — rewrites the expression loop over the
  final grammar set; doing this while the grammar is still in flux from O.W4/O.W5 would
  require re-integration); parse-that A.W1 (CSS parser deletion — the scanner technique
  is HARVESTED before deletion per D7; A.W1 must be PLANNED before O.W6 implements S2
  to confirm the harvest is complete and the deleted parser's technique is safely
  extracted); parse-that A.W3 (SpanParser tagged-union published — the V8 jump-table
  optimization in S3 requires consuming the SpanParser API from parse-that `./core`) ·
  **Gate (new):** `proof:perf-target` (MEASURE-FIRST)
- **Folds (campaign lanes):** CONSTELLATION-CAMPAIGN §3 O.W6 (combinator/scanner-hybrid
  hot paths: SpanParser tagged-union consume parse-that A.W3, monolithic scanners from
  the CSS-parser harvest; CSS-parse MB/s bench target after baseline; no regression);
  D7 (SOTA perf: "SpanParser tagged-union (V8 jump-table, escape megamorphic IC) +
  monolithic byte-loop scanners harvested from the deleted CSS parser"); the
  verify-before-fold §6 (SpanParser ≥10% claim: UNVERIFIED — confirmed after A.W3's own
  bench, not assumed here; the gate sets the target from the measured baseline, NOT from
  the claimed improvement percentage)
- **Precept cures:** no-legacy (the `any(...)` megamorphic IC in the value-parser hot
  path — the function-name dispatch has ~30 known cases that V8 cannot predict; the
  `dispatch()` table already exists in parse-that but is not yet wired to the CSS
  function-name hot path); KISS (the scanner harvest is an informed rewrite, not a
  copy-paste — the grammar is value.js's own; the scanner TECHNIQUE is what transfers);
  MEASURE-FIRST (the gate sets its target from the baseline run, never from an assumed
  percentage improvement)

---

## Context

The value-level parser (`src/parsing/index.ts`) and the stylesheet parser
(`src/parsing/stylesheet.ts`) have two classes of hot-path inefficiency that the
CONSTELLATION campaign identified as addressable without a grammar change:

**Hot-path class 1 — Megamorphic `any(...)` dispatch in the value parser.**

The `Function_` combinator (`src/parsing/index.ts:224`) is an `any(...)` over six
parsers, each of which SEQUENTIALLY tries to match. For the common case (a named CSS
function like `linear-gradient`, `oklch`, `translate`, `cubic-bezier`, `calc`,
`spring`), the parser always tries `handleTransform()` and `handleVar()` first, fails,
then reaches the generic `handleFunc()`. For the value atom (`Value` at line 235),
`any(CSSWideKeyword, CSSValueUnit.Value, Function_, CSSString)` tries four alternatives
sequentially for every token.

V8's inline cache for the `any()` combinator is megamorphic: up to 30 different parser
objects arrive at the same `any()` call site on successive parse calls (one per function
name in the grammar). The `dispatch()` primitive — already present in parse-that
(`leaf.ts:60`) and used for the first-character lookup table — is the idiomatic escape:
it maps ASCII character codes to parsers in O(1) without polymorphic branching. parse-
that A.W3's `SpanParser` tagged-union extends this to a named-tag dispatch over a
`Record<string, SpanParser>`, further narrowing the IC to a single jump.

**Hot-path class 2 — Combinator overhead for structural tokens.**

The stylesheet parser spends significant time in whitespace, comment, and balanced-block
scanning that can be done with a monolithic byte loop instead of a recursive combinator
tree. parse-that's existing CSS parser (BEFORE A.W1 deletes it) embeds exactly this
pattern: `scanToken`, `scanIdent`, `scanNumber`, `balancedBlock` are all implemented as
tight `for`/`while` byte-loops over `charCodeAt`, without combinator overhead. The
technique is already proven — the ONLY issue is that the grammar attached to it is
value.js's responsibility, not parse-that's. D7 says: "keep the technique, drop the
grammar."

**Hot-path class 3 — `gamutMapToRgbSpace` bisection (overlap with O.W3).**

O.W3 cures the allocation budget of the bisection. O.W6 adds a potential numeric
unrolling optimization IF the bisection is still on the critical path after O.W3's
scalar rewrite. This is CONDITIONAL on measurement: if O.W3's alloc cure already
moves the bisection out of the bench bottleneck, O.W6 S4 is a no-op for `gamutMap`
and the bench co-targets `parseCSSValue` instead.

**The MEASURE-FIRST discipline.**

The gate target (`proof:perf-target`) is set from the actual baseline measurement run
against the BUILT `dist/value.js` on TODAY's tree, not from the campaign's `"≥10%"` or
`"MB/s target"` claims. Those claims appear in the verify-before-fold §6 ledger as
UNVERIFIED (the SpanParser ≥10% claim comes from parse-that A.W3's own bench, not from
an independent O.W6 measurement). The gate ALWAYS derives its threshold at gate-authoring
time from the baseline run. If the baseline measures 50 MB/s, the target is ≥60 MB/s
(20% headroom). If it measures 200 MB/s, the target is ≥220 MB/s. The improvement
direction is what matters; the minimum gain floor is set realistically from what
measurements show.

**Scope boundary.** O.W6 is HOT-PATH REWRITES ONLY. It does not:
- Change any grammar or AST types (those are O.W4/O.W5 territory);
- Add new public API (no new exports);
- Touch the color-math zero-alloc path (O.W3);
- Change the packrat memoization policy (parse-that A.W2/A.W3 territory).

A parse that was correct before O.W6 must produce an identical result after. The born-
RED gate enforces this via a regression clause (C4 — test suite must stay green).

---

## Scope

Each S-clause is a concrete, falsifiable deliverable. Together they constitute
`proof:perf-target` GREEN, the `SpanParser` dispatch wired to the CSS function-name
hot path, and the scanner technique harvested and applied.

### S1 — The born-RED bench exists and establishes baselines (`bench/css-parse-perf.mjs`)

**Breach.** No CSS-parse throughput bench exists today (verified: `ls bench/` contains
`color-interp.bench.ts`, `computed-endpoint.bench.ts`, and analogues — none measures
`parseCSSValue` or `parseCSSStylesheet` MB/s throughput). The MEASURE-FIRST discipline
requires the bench be born-RED on the current tree (the gate exits 1 because the
post-O.W6 target cannot be met on the unoptimized implementation).

**Deliverable.** `bench/css-parse-perf.mjs` — a Node.js throughput bench that:

- Runs N=1000 iterations of each scenario, records `wall-clock / bytes-parsed → MB/s`.
- Uses `performance.now()` (Node.js built-in; no external timing dep).
- Scenarios:
  1. **Value-parser hot path:** `parseCSSValue` on a corpus of 10 representative CSS
     value strings (covering all function dispatch branches: `oklch(...)`, `linear(0,
     0.5 50%, 1)`, `linear-gradient(to right, red, blue)`, `translateX(100px)`,
     `calc(100% - 2rem)`, `var(--color, red)`, `cubic-bezier(0.42,0,0.58,1)`, a plain
     number `42px`, a color keyword `blue`, `spring(1,100,10,0)`). Total corpus ~450
     bytes/iteration.
  2. **Stylesheet-parser hot path:** `parseCSSStylesheet` on a representative stylesheet
     containing 5 rules (`@keyframes`, `@layer`, `@media`, `style`, `@property`). Total
     corpus ~500 bytes/iteration.
  3. **Co-bench with O.W3:** `mixColors` on an out-of-gamut display-p3 color pair
     (exercises the gamut-map path O.W3 de-allocates; O.W6 verifies no regression after
     its rewrites).

- **Prints a structured baseline table:**
  ```
  scenario            baseline  MB/s
  value-parser        XXX.X
  stylesheet-parser   XXX.X
  mixColors-gamut     XXX.X   (ns/call)
  ```
- **Exits 1** (born-RED today) because the post-cure targets are embedded in the gate
  and the current implementation cannot meet them (the targets are set AFTER the first
  baseline run and written into `scripts/proof-perf-target.mjs` at gate-authoring time).

**Falsifiable check.** `node bench/css-parse-perf.mjs` exits 1 on today's tree (the
targets in `proof:perf-target.mjs` are unmet — before the O.W6 optimizations land).
The exact MB/s numbers are UNKNOWN until the first baseline run; the gate spec does not
pre-specify them (MEASURE-FIRST law: spec says "≥ target derived from baseline", not
"≥ N MB/s").

### S2 — Harvest the monolithic byte-loop scanner technique from parse-that's CSS parser

**Context.** parse-that A.W1 DELETES `typescript/src/css/` (1,202 L) and its tests.
Before deletion, the relevant scanner functions are studied and their TECHNIQUE is applied
to value.js's `src/parsing/utils.ts`. This is D7: "keep the technique, drop the
grammar."

**What to harvest (technique, not grammar).** The parse-that CSS parser uses:
- A `scanIdent(src, pos)` byte-loop over `charCodeAt` returning `{end, value}` — no
  regex, no combinator overhead, no allocation until the matched substring is needed.
- A `scanNumber(src, pos)` similar pattern for integer/float literals.
- A `balancedBlock(src, pos, open, close)` byte-loop that counts bracket depth —
  identical to the `balancedText` already in `src/parsing/stylesheet.ts` (the technique
  is already partially present; O.W6 extends it to the value-level parser's hot path).

The harvest is an INFORMED REWRITE of value.js's `src/parsing/utils.ts`:
- Add `scanIdentFast(src: string, pos: number): number` — returns the end offset of the
  maximal identifier token starting at `pos`, or `pos` if no identifier character is
  present. Used to replace the `regex(/-?[a-zA-Z][a-zA-Z0-9-]*/)` in the CSS function
  name dispatch path (the most frequent sub-parser call in `handleFunc`).
- Add `scanNumberFast(src: string, pos: number): number` — returns the end offset of the
  numeric literal at `pos`, or `pos` if no digit is present. Used in the numeric value
  parser (`CSSValueUnit.Number`) to replace the existing numeric regex for the common
  (non-scientific-notation) case.

**Scope.** These are INTERNAL utils in `src/parsing/utils.ts` — not exported in the
public surface. The existing `regex` / `istring` combinator API is unchanged.

**Falsifiable check.** `grep "scanIdentFast\|scanNumberFast" src/parsing/utils.ts | wc -l`
→ ≥ 2 (both functions exist after S2). `npm run test` passes — the byte-loop replacements
produce identical tokenization as the regex combinators for all test inputs (the
existing test corpus covers identifier and number parsing via indirect calls through the
value parser). The bench (S1) shows improvement on the value-parser scenario.

### S3 — `dispatch()` table for CSS function-name dispatch

**Dep:** parse-that A.W3 (SpanParser + `dispatch` export from `./core`). This S-clause is
GATED on parse-that A.W3 publishing; the implementation can be stubbed in value.js and
activated when A.W3 ships.

**Context.** The `Function_` combinator (`src/parsing/index.ts:224`) is:
```ts
const Function_: Parser<any> = any(
    handleTransform(),
    handleVar(),
    MathFunction,
    handleGradient(),
    handleCubicBezier(),
    handleFunc().map(...),  // generic fallback
);
```
Six sequential alternatives. Every function token tries all six in order. The first
character of a CSS function name is already a useful discriminator:
- `t`: `translate*`, possibly `translateX`/`Y`/`Z`
- `v`: `var`
- `c`: `calc`, `clamp`, `cos`, `conic-gradient`, `cubic-bezier`, `color`, `contrast-color`
- `l`: `linear`, `linear-gradient`, `lab`, `lch`, `light-dark`
- `r`: `radial-gradient`, `round`, `rem`, `rotate*`
- `s`: `scale*`, `sin`, `skew*`, `scroll`, `sign`, `sqrt`
- `o`: `oklch`, `oklab`
- `m`: `max`, `min`, `mod`
- `a`: `abs`, `asin`, `acos`, `atan`, `atan2`
- `h`: `hsl`, `hwb`, `hypot`
- etc.

The `dispatch()` primitive from parse-that maps ASCII char codes to parsers in O(1)
(a 128-entry `Int8Array` lookup — `leaf.ts:60`). Parse-that A.W3's `SpanParser` tagged-
union extends this to a named-tag approach over bounded string sets. Either primitive
eliminates the sequential `any(...)` trial for the function-name head character.

**Cure.** Rewrite `Function_` to use first-character dispatch:
```ts
// Group parsers by first character of function name
const functionByChar: Record<string, Parser<any>> = {
    "t": any(handleTransform(), handleFunc()),    // translate*, or generic
    "v": handleVar(),
    "c": any(handleCubicBezier(), MathFunction, handleGradient(), handleFunc()),
    "l": any(MathFunction, handleGradient(), handleFunc()), // linear, linear-gradient, lab...
    "r": any(handleGradient(), MathFunction, handleFunc()),  // radial-gradient, round...
    "s": any(handleTransform(), MathFunction, handleFunc()), // scale*, sin, scroll...
    // ... other heads
    "*": handleFunc(),  // fallback for unrecognized heads
};
const Function_: Parser<any> = dispatch(functionByChar);
```

The `dispatch()` table fires O(1) for known first characters, then the per-character
`any()` sub-tree is much smaller (2–4 alternatives instead of 6). For the overwhelming
majority of CSS function calls in animation data (color functions, math functions, gradient
functions), this is a ~2-4× reduction in tried alternatives before the first successful
match.

**SpanParser integration (post-A.W3).** When parse-that A.W3 publishes its `SpanParser`
tagged-union, the inner `any()` sub-trees for each character bucket can be further replaced
with `SpanParser` dispatch over the exact function name (matching the full identifier span
before the `(`). This is the V8 jump-table optimization: the IC for `SpanParser.dispatch`
sees one type per tagged case, not N different parser closure types. The O.W6 implementation
MUST include this if A.W3 is published; if A.W3 is still pending at O.W6 authoring time,
the `dispatch()` table in O.W6.S3 provides the first-character win and the `SpanParser`
integration becomes a follow-up micro-wave (O.W6b or a P-wave).

**Falsifiable check.** `grep "dispatch(" src/parsing/index.ts | wc -l` → ≥ 1 (the table
is wired). `npm run test` passes (the dispatch table routes identical to the old `any()`
chain). The bench (S1) shows ≥ the target MB/s improvement on the value-parser scenario
(the exact threshold is set from the S1 baseline — see `proof:perf-target`).

### S4 — `gamutMapToRgbSpace` numeric micro-optimization (CONDITIONAL on measurement)

**Gate condition.** This S-clause is authored ONLY if the S1 bench shows `mixColors-gamut`
is still on the critical path AFTER O.W3's alloc cure. If O.W3 already moves `gamutMap`
out of the bottleneck, S4 is a documented NO-OP (the clause exists, records the
measurement, and concludes "no further work needed").

**If active.** The post-O.W3 scalar bisection still computes six arithmetic operations per
step (the OKLCh → linear-RGB formula: L/c/H → linearRGB components). These can be
unrolled manually or compiled by the JIT into a tighter inner loop by removing the function
call overhead of `directOklchToRgb`. A micro-benchmark in S1 C3 drives the decision.

**Cure (if warranted).** Inline the innermost `directOklchToRgb` computation into the
bisection loop body: the six scalar operations (two matrix multiplies, a cuberoot pair, a
gamut-clamp) are written out as explicit assignments in the loop body of `gamutMapToRgbSpace`.
This eliminates one function call per bisection step; V8 can then inline and eliminate any
remaining call overhead.

**Scope.** `src/units/color/dispatch.ts` only — strictly the bisection inner loop. No change
to the gamut policy, the sRGB analytical path, or the wide-gamut clamp.

**Falsifiable check.** S1 C3 bench: the `mixColors-gamut` scenario shows improvement
(≥ the target set from the O.W3 baseline). `npm run test` passes (color conversion
correctness unchanged — same floating-point ordering, same coefficients).

### S5 — `proof:perf-target` gate exists and is born-RED on today's tree

**Breach.** No `proof:perf-target` script exists in `package.json` today (verified:
`grep "proof:perf-target" package.json` → empty). The gate is ABSENT.

**Deliverable.** `scripts/proof-perf-target.mjs` — a thin gate script that:

1. Runs the S1 bench scenarios against the BUILT `dist/value.js`.
2. Compares the measured MB/s values against embedded thresholds (written into the script
   at gate-authoring time after the first baseline run establishes the floor).
3. Asserts `parseCSSValue` throughput ≥ `VALUE_PARSER_TARGET` MB/s.
4. Asserts `parseCSSStylesheet` throughput ≥ `STYLESHEET_PARSER_TARGET` MB/s.
5. Asserts `mixColors-gamut` ns/call ≤ `GAMUT_NS_TARGET` (a regression guard for O.W3).
6. Exits 0 iff all assertions hold; exits 1 otherwise.

`package.json` gains `"proof:perf-target": "node scripts/proof-perf-target.mjs"`.

**Threshold derivation discipline.** The three threshold constants in the script are:
```js
const VALUE_PARSER_TARGET    = BASELINE_VALUE_PARSER_MBS    * IMPROVEMENT_FACTOR;
const STYLESHEET_PARSER_TARGET = BASELINE_STYLESHEET_PARSER_MBS * IMPROVEMENT_FACTOR;
const GAMUT_NS_TARGET        = BASELINE_GAMUT_NS            * REGRESSION_GUARD;
```
where:
- `BASELINE_*` values are measured on the FIRST run of S1 against the unoptimized dist;
- `IMPROVEMENT_FACTOR` = 1.15 (15% minimum improvement — a realistic floor given the
  dispatch and scanner changes; if the baseline shows the parser is already fast, this
  may be adjusted to 1.10; if it shows a clear bottleneck, to 1.25);
- `REGRESSION_GUARD` = 1.10 for `mixColors-gamut` (the gamut path should not regress
  more than 10% from O.W3's post-cure baseline — O.W6 must not undo O.W3's alloc wins).

**Today's tree result.** `proof:perf-target` exits 1 by construction: the script does not
exist (the gate cannot run = failure), AND even if run against the current dist, C1/C2 fail
(unoptimized throughput is below the targets that will be set after the baseline confirms).

**Green condition.** S2 (scanner harvest) + S3 (dispatch table) + S4 (conditional gamut
unroll) are implemented; `node scripts/proof-perf-target.mjs` exits 0; `npm run test`
is green; `bench/css-parse-perf.mjs` is committed and runs without error.

---

## Born-RED gate

**Gate name:** `proof:perf-target` (NEW).
**Tier:** hygiene (a node bench-gate — no browser; added to `proof:hygiene` membership).

**The REAL observable (MEASURE-FIRST — NOT a proxy).** The proxy to AVOID: asserting
that `any(...)` no longer appears in `Function_` (a source-shape check that a different
equally-slow structure could pass), or asserting that `scanIdentFast` exists in `utils.ts`
(file-presence). The gate must bite the ACTUAL failure mode — *"the value-level parser
throughput is below the SOTA target; animation-data parsing is on the critical path for
editor integrations and the keyframes.js frame-compiler."*

**Structure.** `scripts/proof-perf-target.mjs` (S5):

| Clause | Mechanism | Today | After cure |
|---|---|---|---|
| C1 — value-parser MB/s | `parseCSSValue` bench, S1 corpus, N=1000 | < VALUE_PARSER_TARGET (exits 1) | ≥ VALUE_PARSER_TARGET (exits 0) |
| C2 — stylesheet-parser MB/s | `parseCSSStylesheet` bench, S1 corpus | < STYLESHEET_PARSER_TARGET | ≥ target |
| C3 — gamut regression guard | `mixColors` on OOG display-p3, ns/call | baseline from O.W3 (set at gate-authoring) | ≤ GAMUT_NS_TARGET |
| C4 — test suite green | `npm run test` | baseline green | green (correctness unchanged) |
| C5 — baseline recorded | `bench/css-parse-perf.mjs` baseline committed | n/a (bench absent) | Baseline numbers committed in a comment in the gate script |

**Today's tree result.** `proof:perf-target` exits 1 by construction: the script is
absent (C1/C2/C3/C5 cannot run = failure), and even once S1's first run establishes the
baseline, C1/C2 fail because the unoptimized implementation is below the derived targets.

**Why this is the genuine defect, not a proxy.** C1 and C2 run the REAL parser from the
REAL built dist against a REAL byte corpus and measure REAL wall-clock MB/s. A `dispatch()`
table that routes to the same parser chain without the first-character savings still fails
C1. A scanner harvest that doesn't reduce regex overhead fails C1 because the throughput
doesn't rise. No source-grep, no type assertion stands between the gate and the runtime
throughput measurement.

---

## Dependencies

- **O.W5 (stable grammar).** Hot-path rewrites of the parser must target the FINAL grammar
  shape (after O.W4/O.W4b/O.W5). A dispatch table written against a grammar that still
  adds new function arms (O.W4) would need to be extended again. O.W6 is the LAST O wave;
  it assumes the grammar is stable.

- **parse-that A.W1 (CSS-parser deletion — harvest before deletion).** The scanner
  technique must be harvested from `parse-that/typescript/src/css/` BEFORE A.W1 deletes
  it. The harvest is informational (informed rewrite, not copy-paste); it can be done by
  reading the source during O.W6 implementation. The cross-repo discipline: value.js
  reads the parse-that CSS parser source before the deletion commit merges. This is a
  SEQUENCING constraint, not a publish constraint — value.js does not import the parse-that
  CSS parser surface; it only studies the technique.

- **parse-that A.W3 (SpanParser tagged-union).** S3's SpanParser integration is GATED on
  A.W3 publishing (consume-published-not-branches discipline). If A.W3 ships before O.W6
  dispatches: the full SpanParser integration is included in O.W6. If A.W3 ships after:
  the `dispatch()` first-character table (S3's primary win) is delivered in O.W6; the
  SpanParser follow-up is a one-clause O.W6b micro-wave. Either way, the perf target
  is measured from the actual result, not from the expected A.W3 contribution.

- **O.W3 (alloc cure baseline).** The `GAMUT_NS_TARGET` in C3 is set from O.W3's post-cure
  baseline (the O.W3 bench result). O.W6 must not regress O.W3's gamut-map improvements.
  The regression guard (1.10× headroom) is conservative; O.W6 should not touch `gamutMap`
  unless S4's measurement says it is still a bottleneck.

- **No glass-ui / kf cross-repo edge.** O.W6 is value.js-internal. It publishes as
  1.3.0 (perf, no API change); kf-M.W9/W10 pin-bump to consume it. The publish/re-pin
  discipline: value.js CI goes green on 1.3.0, then kf re-pins in ONE atomic commit.

---

## DAG position

```
parse-that A.W1 (CSS removal — harvest technique) ─┐
parse-that A.W3 (subpath + SpanParser)              ├─► O.W6 (perf: scanner + dispatch)
O.W5 (stable grammar — the target grammar surface)  ┘
                                                            │
                                              value.js 1.3.0 publish
                                                            │
                                    keyframes.js M.W9/W10 (pin to 1.3.0, tree-shake verifies)
```

O.W6 is the LAST O wave. After O.W6 GREEN, the O tranche is complete.

---

## Bite — what regression each clause catches

| Clause | Regression it prevents |
|---|---|
| S1 bench (baseline) | Prevents "we optimized the structure but throughput didn't change" — forces measurement before claim; baseline is the oracle |
| S2 scanner harvest | A future parser change that re-introduces regex for ident/number scanning (e.g. "cleaner code") — C1 bites the runtime throughput |
| S3 dispatch table | A revert of the `dispatch()` table to a flat `any(...)` (e.g. "easier to extend") — C1 catches the IC regression |
| S4 gamut unroll (conditional) | A change to the bisection inner loop that re-introduces function call overhead — C3 regression guard bites |
| C3 regression guard | An O.W6 change that accidentally un-inlines O.W3's scalar bisection (e.g. a mistaken refactor that re-allocates Color objects) — C3 catches throughput regression |
| C4 test suite | Any correctness regression introduced by the parser rewrite — the full value.js test suite is the oracle |

---

## Excluded from this wave

- **The `@vitest/browser` migration.** Not in value.js scope (no browser gates in value.js
  at this time). The bench uses Node.js `performance.now()`.

- **SIMD / WASM acceleration.** D7 specifies the scanner/SpanParser technique from the
  parse-that CSS parser. SIMD-accelerated parsing (the simdjson technique) is a P-wave
  item IF the baseline shows the scanner approach saturates and further gains require
  SIMD. The verify-before-fold §6 record: the simdjson paper (Langdale-Lemire) is cited
  as a lead but unverified for CSS string parsing — the CSS grammar is NOT SIMD-friendly
  in the same way NDJSON is (the irregular token structure and frequent context-switches
  mean the simdjson technique applies at best to the numeric/whitespace-scanning inner
  loops, not the full grammar). BOOK-with-trigger: if the O.W6 bench shows the scanner
  approach is insufficient and SIMD acceleration for CSS is independently verified, add
  a P.W1 (wasm-scanner) scope item.

- **`formatCSS` (Prettier) performance.** `formatCSS` calls prettier lazily; it is NOT
  in the value-parser or stylesheet-parser hot path. O.W6 does not optimize it. If
  `stylesheetToString` latency becomes a user issue, a postcss-instead-of-prettier option
  (O.md §9 deferred) is the KISS path.

- **Packrat tuning.** parse-that A.W2 fixes the packrat key from `p.id` to
  `getCijKey(p,state)` (the unsound→sound fix). O.W6 does NOT tune the packrat policy
  (hit rate, eviction, etc.) — that is parse-that's responsibility. value.js only
  consumes the fixed API.

- **Source-map aware parsing.** A `Span`-returning parse API for source-location tracking
  (useful for editor integrations). This is a P-wave scope item; O.W6 uses `regexSpan` /
  `stringSpan` only where they produce a measurable throughput improvement over the
  allocation-bearing `regex` / `string` combinators. Full span-threaded parsing is a
  separate project.

- **`mixColorsInto` out-param.** Excluded from O.W3 (measured, not cured) and O.W5
  (out of scope). Still deferred. O.W6 only adds the gamut regression guard (C3) —
  it does not add a new `mixColorsInto` API.
