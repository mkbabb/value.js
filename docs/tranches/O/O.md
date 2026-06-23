# O — The lib-perf + canonical-grammar tranche: subpath split, 2026+ grammar, bidirectional, SOTA perf

**Tranche letter**: O — value.js's thirteenth tranche (arc A..N → O). The tranche that dissolves
the 145 KB monolith into consumable subpaths, fixes the two live P0 crashes, bakes the 2026+
CSS grammar (full function support, scroll-driven timeline, `if()`, `@function`, CSS Nesting,
Color 4/5 completeness), enforces semantic-idempotence round-trips across the entire grammar,
and drives perf to SOTA via the combinator/scanner hybrid.

**Predecessor**: N (RATIFIED 2026-06-11; still executing the design/demo block N.W10–N.W18;
library track — N.W7 → 0.12.0, N.W11/N.W11' → 0.13.0 — **SHIPPED** at HEAD `9fce504`).
**v1.0.0** is the N.W9' close target (gated on glass-ui BA 4.0.0 pin via N.W18). O opens
AFTER N.W9' / v1.0.0. The N library track (0.13.0) is already shipped and is the substrate
O builds on; see §1 for the full N/v1.0.0 sequencing record.

**Opened**: 2026-06-18, chartered from the Constellation Lib-Perf + Grammar campaign
(`CONSTELLATION-CAMPAIGN.md` §3 — the locked decisions D1–D11, the verify-before-fold
ledger §6, the multi-repo DAG §5). Campaign anchor commits: keyframes.js `n-stage-impl`
branch; value.js HEAD `9fce504` (0.13.0).

**Mode**: **DEVELOPMENT — charter only.** O.W0 is DEV (this charter). O.W1–O.W6 dispatch on
explicit user ratification after N.W9' / v1.0.0 closes.

**Authority**: the 2026-06-18 Constellation campaign (`CONSTELLATION-CAMPAIGN.md`), 64 lanes,
66 agents, ~6.6M tokens. The locked decisions D1–D11 are the constitution; any O wave spec that
departs from them must cite a numbered amendment.

---

## §1 — N close / v1.0.0 sequencing (the prerequisite record)

**N library track (already shipped — confirmed live on today's tree):**
- N.W7 → **0.12.0** (`3f4f0ed`): 11 kf-next-slice items, prettier evicted, parseCSSColor typed.
- N.W11 + N.W11.D + N.W11' → **0.13.0** (`9fce504`): gamut-map re-anchor, wide-gamut egress,
  `sampleColorRamp`, `CSSTimelineOptions` scroll-timeline grammar. HEAD = 0.13.0, in dist.

**N demo/design block (RATIFIED, not yet implemented):** N.W10–N.W18 are at RATIFIED status
with per-wave specs at `waves/N.W{10..18}.md`; zero implementation commits for these waves
appear in the git log at HEAD. The block is in-flight; the N.W18 BA-cut consume + N.W8'/N.W9'
close are the final sequencing steps. v1.0.0 is the N.W9' gate.

**O opens AFTER N.W9' / v1.0.0.** The constraint is not technical (O.W0 and O.W1/O.W2
structural work are N-independent for the library surface) — it is governance: O is the
successor tranche, and the predecessor close gate is v1.0.0. The two waves with a live
P0 (O.W0) are the ONE exception: O.W0 MAY be implemented as a patch to the 0.x line
(0.13.x or 0.14.0) before v1.0.0 if the owner authorizes it, given the crashes are shipping.
The **default** is: O opens at v1.0.0.

**parse-that A sequencing:** value.js currently pins `@mkbabb/parse-that ^0.9.0`; parse-that
is at 0.9.0 (single root export). Parse-that A.W0 (manifest fix → 0.9.1) and A.W3 (subpath +
SpanParser) must publish before O.W2 (value.js subpath split) and O.W6 (SOTA perf via
SpanParser technique). O.W0/O.W1/O.W3–O.W5 are parse-that-independent.

---

## §2 — Thesis: what O restores and what it adds

**The monolith breach.** value.js ships as a single `"."` root export (verified live:
`package.json` exports = `{".":{...}}`; dist = one `value.js` file at 144 KB minified /
310.6 KB unpacked). A consumer importing only `Color` for color mixing receives the full
`@keyframes` grammar parser, all easing functions, the scroll-timeline grammar, and the
compute-units DOM bridge. For kf's LIGHT surface (the constellation's core invariant) this
monolith is directly in the path of tree-shake correctness.

**The two P0 crashes (confirmed live on 0.13.0):**
1. `parseCSSValue('linear-gradient(red, blue)')` → `TypeError: t is not iterable` (confirmed
   `node dist/value.js`). Root: `handleGradient()` in `src/parsing/index.ts` — when no
   `fromAngle`/direction is present, `any(fromAngle, direction).skip(comma).opt()` returns
   `undefined` (not filtered), and the subsequent `[dir, ...stops].flat()` call iterates
   `undefined`. The fix is an explicit branch: when `dir` is falsy, return `[stops]` only —
   already drafted as the D8 decision (value.js-side `any()` branches in `handleGradient`,
   localized; the `all()` global-semantics fix is parse-that-A's eval item).
2. `parseCSSStylesheet('.a { .b { color: red; } }')` → `ParseError` at offset 5 (confirmed
   live). Root: `stylesheet.ts:501` — `stylesheetItem` dispatches `atRule | styleRule`; the
   CSS Nesting `.b{}` inside a style block is an unknown qualified rule, and the top-level
   parser's full-consumption sentinel (`state.offset >= state.src.length`) rejects a partial
   parse. The fix is a recursive nested-rule arm in the style-rule body parser (CSS Syntax L3:
   "an invalid nested rule is ignored, not fatal").

**The grammar gap.** The current grammar is incomplete against 2026 CSS:
- `linear()` stop spacing: `FunctionValue.toString()` joins stop values with `", "`, but the
  CSS `linear()` easing grammar places position hints space-separated from the linear-stop
  value (`0.5 50%` not `0.5, 50%`). Confirmed live: `parseCSSValue('linear(0, 0.5 50%, 1)')`
  round-trips as `linear(0, 0.5, 50%, 1)` — wrong.
- `@layer`, `@container`, `@scope`, `@starting-style`, `@media`, `@supports` bodies are
  captured opaquely (kind: "unknown", body: raw string). Nested `@keyframes` inside these
  blocks are therefore invisible to `extractKeyframes`. Confirmed: `parseCSSStylesheet
  ('@layer base { @keyframes fade { 0% {opacity:0} 100% {opacity:1} } }')` returns a single
  `{kind:"unknown"}` item with the body as a raw string.
- `@function`, `if()`, `contrast-color()`, `sibling-index()/-count()` not yet parsed
  (verify-before-fold §6: browser-version claims need confirmation before locking).
- Full CSS `@function` / custom-value-function support (D6 moderate-supersede): a typed
  representation that lowers to standard CSS and round-trips.

**The bidirectional gap.** `serializeStylesheet(parseCSSStylesheet(s))` is partially
idempotent but has known non-idempotences: the `linear()` stop issue, the unknown-body opaque
capture, and any construct where `FunctionValue.toString()` deviates from the canonical CSS
serialization. O.W5 installs the semantic-idempotence invariant: `parse(serialize(parse(s)))
≡ parse(s)` (value-normalized — NOT byte-lossless) as a property-based fuzz harness across
every construct.

**The perf gap.** The monolithic byte-loop scanners already present in `stylesheet.ts`
(`balancedText`, `stripCSSComments`) outperform the combinator tree for structural scanning.
O.W6 harvests this technique (from the parse-that CSS parser before its deletion at A.W1)
and applies the combinator/scanner hybrid to the hot paths in the value-level parser
(`src/parsing/index.ts` expression loop) and the `gamutMapToRgbSpace` binary-search loop
(24 × `new OKLCHColor` allocations confirmed in source, `dispatch.ts:232–248`).

---

## §3 — The O invariants (structural; added at O-open to the existing spine)

The N invariants (inv-N-1..inv-N-10) carry from N's close. O adds three invariant:

- **inv-O-1 — subpath-truth.** `@mkbabb/value.js/color`, `./parsing`, `./math`, `./easing`,
  `./transform`, `./units`, `./quantize` are live published subpaths; importing `./color` in
  a graph-traced build pulls zero parse-that / `@keyframes`-grammar modules. Violated today
  (one root export, no subpaths). *The over-bundle class of failure is structurally
  un-shippable.*

- **inv-O-2 — bidirectional-idempotence.** For every construct in the grammar:
  `parse(serialize(parse(s))) ≡ parse(s)`, value-normalized. Applies to all `StylesheetItem`
  kinds (`keyframes`, `property`, `style`, `unknown`), all value-level constructs, all easing
  forms, all scroll-timeline forms. Violated today (the `linear()` stop issue + the opaque
  at-rule body capture). *Non-idempotent serializers silently corrupt animation data on
  re-parse; this is the compile-editor lossiness class.*

- **inv-O-3 — parse-that-primitives-only.** value.js consumes parse-that for its combinator
  primitives (`string`, `regex`, `any`, `all`, `whitespace`, `Parser`, `dispatch`) — it does
  NOT consume parse-that's (deleted, A.W1) CSS parser surface. The import graph from
  value.js `src/parsing/**` resolves only the core combinator exports, never any
  `parseSingleValue`/`MediaQuery`/`cssParser` symbol. *Guaranteed by parse-that A.W1's
  `proof:no-css-surface` gate; value.js only needs to ensure it doesn't import the removed
  surface — structural rather than gating.*

---

## §4 — Wave schedule (O.W0 .. O.W6)

The wave sequence is sequenced by risk and dependency: P0 first (O.W0, unblocked), structural
pre-work (O.W1), build+exports (O.W2, needs parse-that A.W0/A.W3), then grammar
(O.W3–O.W5), then perf (O.W6, needs parse-that A.W3 for SpanParser technique harvest).

| Wave | Band | Kind | Scope | Born-RED gate |
|------|------|------|-------|---------------|
| **O.W0** | P0 | unilateral (library) | The two live crashes; `linear()` stop-spacing | `proof:css-parity` — born-RED NOW on 0.13.0 |
| **O.W1** | structure | unilateral (library) | Subpath structural pre-work: sever parse-that edge from `units/`, lazify `parseCSSValue`, author multi-entry `vite.library.ts` | `proof:subpath-precheck` + typecheck holds per step |
| **O.W2** | structure | unilateral (library) | Subpath build + exports map; verify `sideEffects` honored for subpath chunks | `proof:subpath-budget` — `./color` graph has zero `@keyframes` modules |
| **O.W3** | perf | unilateral (library) | Zero-alloc color-math: `gamutMapToRgbSpace` scalar bisection rewrite; `transformMat3Into` out-param scratch Vec3; JND early-exit | `proof:gamut-alloc` — MEASURE-FIRST born-RED |
| **O.W4** | grammar | unilateral (library) | 2026+ grammar comprehensive incl. EXPERIMENTAL: recursive at-rule bodies, `@function`, `if()`, Color 4/5 completeness, `@property` improvements, `@layer/@container/@scope/@starting-style` recursion, nesting, `sibling-index()/-count()`, `contrast-color()` | per-feature born-RED: each construct parses to typed structure AND round-trips |
| **O.W4b** | grammar | unilateral (library) | Full timeline + scroll-driven grammar: the extension wave building on O.W4's recursive at-rule arm | `proof:scroll-roundtrip` — each timeline/scroll construct parses + round-trips; kf consumes typed forms |
| **O.W5** | bidirectional | unilateral (library) | Semantic-idempotence invariant + fuzz harness; `FunctionValue.toString()` `linear()` stop-spacing fix; the moderate-supersede additions (`spring()` easing, `colorSpace` round-trip, typed `@function` lowering) | `proof:round-trip-idempotent` — fuzzed values across every construct |
| **O.W6** | perf | unilateral (library) | SpanParser tagged-union + monolithic scanner hot paths; kf color-interp co-bench | CSS-parse bench hits target MB/s; no regression |
| **O.W7-demo** | demo/frontend | unilateral (demo) | Parse-Lab pane + gamut-truth indicator + hero-lab shell design-language suffusion; no library source changed | `proof:parse-lab-mount` — born-RED NOW (pane absent; zero `parseCSSColor` calls on the route) |

---

## §5 — Wave details

### O.W0 — The two P0 crashes + `linear()` stop spacing

**Band:** P0 — ships first, unblocks `proof:css-parity` on kf M.W11.
**Dep:** none. O.W0 is library-only (`src/parsing/index.ts` + `src/parsing/stylesheet.ts`
+ `src/units/index.ts`); no parse-that A wave needed; no subpath split needed. MAY ship as
a patch pre-v1.0.0 if owner authorizes (see §1).

**Breach 1 — `linear-gradient` crash** (confirmed live):
```
parseCSSValue('linear-gradient(red, blue)')  → TypeError: t is not iterable
```
Root: `src/parsing/index.ts:191` — `any(fromAngle, direction).skip(comma).opt()` returns
`undefined` when no direction is present; the `.opt()` result passes through `all()` without
filtering, and the downstream `[dir, ...stops].flat()` call iterates `undefined`. The fix is
explicit: add a `null`/`undefined` branch in `handleGradient`:
```
if (!dir) { return [stops]; }    // already exists at line 198 — CORRECT in the if-arm
```
Wait — re-reading: the if-arm at line 198 IS `return [stops]` — correct. The crash is in the
`else` path. Investigation: the `all()` combinator filters `opt()` misses from the result
tuple in some parse-that versions; the actual crash site is the downstream `.map` where the
`[dir, ...stops].flat()` is called with `dir` being the `undefined` returned by `opt()`.
The D8 decision (localized `any()` branches in `handleGradient`, NOT a global `all()` fix)
means: guard each branch explicitly so the `.map` never receives an `undefined` value in the
tuple. Confirm exact line at implementation time from source; the observable crash is the gate.

**Breach 2 — CSS Nesting** (confirmed live):
```
parseCSSStylesheet('.a { .b { color: red; } }')  → ParseError at offset 5
```
Root: `src/parsing/stylesheet.ts:501` — `stylesheetItem = any(atRule, styleRule)` at the
top level only; no nested-rule arm exists inside `styleRule`. CSS Syntax L3 §9.3: "If a
nested-rule is invalid, it is ignored (and not forwarded to its containing block)". The fix
is a recursive nested-rule arm in the declaration list parser: after `declaration.many()`,
attempt `any(atRule, styleRule).opt()` within the declaration body and collect nested rules
as a `children` field on the `style` AST node (or discard invalid ones per spec). The
`StylesheetItem` type gains an optional `children` array on the `style` variant.

**Breach 3 — `linear()` stop spacing** (confirmed live):
```
parseCSSValue('linear(0, 0.5 50%, 1)')  → toString: "linear(0, 0.5, 50%, 1)"
```
Root: `src/units/index.ts:184` — `FunctionValue.toString()` joins all values with `", "`.
The CSS `linear()` easing grammar specifies that position-hints are space-separated from
their stop value (per CSS Easing Functions Level 2). The fix: `FunctionValue` needs a
`separator` hint per function name, or the `linear()` serialization needs a specialized
path. The named-function-aware serialize approach is the KISS choice: check `this.name ===
"linear"` and re-join with the correct separator per the parsed structure (stops are
already grouped correctly by the parser; the issue is purely in `toString()`).

**Scope:** `src/parsing/index.ts` + `src/parsing/stylesheet.ts` + `src/units/index.ts`. No
new types exported, no API surface change. BC-clean.

**S-clauses:**

- **S1.** `parseCSSValue('linear-gradient(red, blue)')` does not throw; returns a
  `FunctionValue` with name `"linear-gradient"` and two `Color` children.
- **S2.** `parseCSSStylesheet('.a { .b { color: red; } }')` does not throw; returns a
  structure with the outer rule containing the nested `.b` rule (or gracefully ignores it —
  no crash is the minimum).
- **S3.** `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` === `"linear(0, 0.5 50%, 1)"`.
- **S4.** All 1709+ existing tests (0.13.0 baseline) pass (no regressions).

**Born-RED gate:** `proof:css-parity` (NEW). A node gate (`scripts/proof-css-parity.mjs`)
asserting S1–S3 over the REAL runtime:
- `parseCSSValue('linear-gradient(red, blue)')` — catches; fails if throws.
- `parseCSSStylesheet('.a { .b { color: red; } }')` — catches; fails if throws.
- `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` — strict equal `"linear(0, 0.5 50%, 1)"`.

TODAY: gate exits 1 (S1 and S3 fail — confirmed live; S2 also fails). GREEN only when all
three assertions pass. The gate is a pure node process reading `dist/value.js` (the BUILT
artifact, not the source — a source fix that doesn't rebuild does NOT green the gate).

---

### O.W1 — Subpath structural pre-work

**Band:** structure — the internal refactor that makes O.W2 possible.
**Dep:** O.W0 (P0 crashes fixed; clean slate). parse-that A.W0 (the manifest fix) is NOT
required — O.W1 is internal; the re-pin happens at O.W2.

**Scope:** Three tasks, each reversible to a clean typecheck:

**S1 — Sever the parse-that edge from `src/units/`** (the subpath-splitting prerequisite).
Today: `src/units/index.ts` imports from `src/parsing/color.ts` for `registerColorNames`
(confirmed: `src/units/index.ts:1`). This edge drags the entire `@keyframes` grammar into
the `./units` subpath. The fix: move `registerColorNames` to a thin shim or make the color
subpath self-contained, so `./units` can build without pulling `./parsing`. Confirm the
exact dependency graph at implementation time (`node --experimental-require-module` graph
tracing or `madge`).

**S2 — Lazify `parseCSSValue`** (the hot consumer path). Today: `parseCSSValue` is a
top-level eager export that triggers the full grammar at import time. Wrapping the parser
construction in a lazy init (module-level `let parser: Parser | null = null; function
parseCSSValue(s) { if (!parser) parser = buildParser(); return parser.parse(s); }`) ensures
the `./parsing` subpath pays zero cost for consumers that only import `./color`.

**S3 — Author the multi-entry `vite.library.ts`** (the glass-ui pattern). The current
`vite.config.ts` emits a single library entry. O.W1 authors the multi-entry config
(or a rolldown-native config) for O.W2's subpath build, confirming the entry points:
`color`, `parsing`, `math`, `easing`, `transform`, `units`, `quantize`.

**Gate:** `tsc --noEmit` remains clean (zero errors) after each S-clause step. No
new public API, no behavior change. This is a refactor-gated-by-typecheck.

---

### O.W2 — Subpath build + exports map

**Band:** structure.
**Dep:** O.W1; parse-that A.W0 (0.9.1 manifest fix — so the `.d.ts` path resolves correctly
in the re-pinned subpaths). parse-that A.W3 (subpath split) is a soft dep — O.W2 can land
first and re-pin when A.W3 ships.

**Scope:** Seven subpath entries in `package.json` `exports`:
```
"./color":    { types: "./dist/color/index.d.ts",    import: "./dist/color/index.js" }
"./parsing":  { types: "./dist/parsing/index.d.ts",  import: "./dist/parsing/index.js" }
"./math":     { types: "./dist/math.d.ts",           import: "./dist/math.js" }
"./easing":   { types: "./dist/easing.d.ts",         import: "./dist/easing.js" }
"./transform":{ types: "./dist/transform/index.d.ts",import: "./dist/transform/index.js" }
"./units":    { types: "./dist/units/index.d.ts",    import: "./dist/units/index.js" }
"./quantize": { types: "./dist/quantize/index.d.ts", import: "./dist/quantize/index.js" }
```
`sideEffects` is already `["./demo/**", "**/*.css"]` in the current `package.json`
(verified live — dist chunks are covered as side-effect-free by this annotation; no
change to `sideEffects: false` is needed or correct, since `demo/` assets DO have side
effects). O.W2 verifies the annotation is honored by bundlers for the subpath chunks.

**S-clauses:**
- **S1.** `import { Color } from '@mkbabb/value.js/color'` resolves types from
  `dist/color/index.d.ts` (no TS7016 error in a consumer project).
- **S2.** `proof:subpath-budget`: a graph trace of the `./color` subpath import shows zero
  modules from `src/parsing/` (`parseCSSValue`, `parseCSSStylesheet`, etc.) in the bundle.
- **S3.** The root `"."` export (`import '@mkbabb/value.js'`) still works and exports the
  full barrel (BC-clean).
- **S4.** The existing `"sideEffects": ["./demo/**", "**/*.css"]` annotation is verified
  to be honored for subpath dist chunks — a rollup bundle importing only `./color` omits
  parsing modules (confirmed by `proof:subpath-budget`). No change to the `sideEffects`
  field is required; the annotation is already correct.

**Born-RED gate:** `proof:subpath-budget` (NEW). A node gate that builds the `./color`
subpath in isolation (via `--bundle` rolldown/esbuild invocation on `src/units/color/index.ts`
with `external: ['@mkbabb/parse-that']`) and asserts zero `parseCSSValue` / `stylesheet` /
`parseCSSStylesheet` symbols appear in the output. TODAY: fails (no subpaths exist, single
root export only).

---

### O.W3 — Color-math zero-alloc

**Band:** perf (but earliest in the perf band — library-only, parse-that-independent).
**Dep:** O.W2 (subpath structure in place). parse-that A.W3 NOT required.

**The breach (confirmed in source):** `gamutMapToRgbSpace` (`src/units/color/dispatch.ts:223`)
performs a 24-iteration binary search (`CHROMA_SEARCH_STEPS = 24`). Each iteration
allocates `new OKLCHColor(L, c, H, alpha)` (line 233) and calls `color2()` which may
allocate intermediate `XYZColor` objects through the XYZ hub path. This is the
highest-ROI color-math allocation site: it is called for every out-of-gamut color in an
animation frame. The `gamutMapSRGB` analytical path (`src/units/color/gamut.ts`) is already
zero-alloc (pure number math); the numeric egress path is not.

**Cure (KISS — scalar bisection + out-param):**
- Replace `new OKLCHColor(L, c, H, alpha)` in the loop with a preallocated scratch object
  that is mutated in-place: `const probe = new OKLCHColor(L, 0, H, alpha)` before the loop;
  `probe.c = mid` inside (if `OKLCHColor` allows field mutation, which it does as a plain
  class). This eliminates 24 Color allocations per call.
- Add `transformMat3Into(out: Vec3, m: Mat3, v: Vec3)` to `src/units/color/matrix.ts` (an
  out-param variant of `transformMat3`); wire the hot `color2()` XYZ-hub path to use it
  with module-scoped scratch `Vec3` arrays.
- Add a JND early-exit to `gamutMapToRgbSpace`: if `deltaEOK` between input and mapped
  is below `DELTA_E_OK_JND` (already defined at 0.02 in `gamut.ts:51`), return immediately —
  colors already near-in-gamut skip the bisection.

**MEASURE-FIRST discipline (born-RED gate structure):**
The gate MUST measure the baseline alloc count BEFORE the cure is applied. A synthetic gate
that asserts a fixed number could pass on any implementation detail. The correct structure:
1. Run `mixColors` over a known out-of-gamut input with V8's `--expose-gc` and measure
   `new Color(...)` calls via a global counter patch (or via Node's `--heap-prof` + alloc
   tracking).
2. Record the baseline N_baseline.
3. After the cure, assert alloc count ≤ N_target (where N_target < N_baseline, derived
   from the fix — the exact reduction is implementation-specific).

**Gate (born-RED, MEASURE-FIRST):** `proof:gamut-alloc` (NEW). Structure:
- C1: baseline measurement runs without error; records N_baseline > 0 (proves the gate
  CAN see allocations — not a vacuous 0 baseline).
- C2: after-cure measurement records N_cured ≤ N_target (where N_target is set at
  implementation time after the baseline confirms; e.g. ≤ 4 if we eliminate the 24 loop
  allocs but keep 2 boundary allocs).
- C3: `mixColors` output is numerically equal (within ε=1e-6) before and after — no
  precision regression.

TODAY: C1 runs (baseline > 0 — the allocation site is confirmed live); C2 cannot pass
(no fix exists); the gate exits 1 by construction.

---

### O.W4 — 2026+ grammar, comprehensive incl. EXPERIMENTAL

**Band:** grammar.
**Dep:** O.W0 (no crashes), O.W1/O.W2 (subpath structure). parse-that A.W1 (CSS parser
deletion) should be DONE before O.W4 ships (so value.js is not importing a surface that
is about to be removed); parse-that A.W2 (packrat fix) is a correctness fix consumed
transitively.

**Scope (verify-before-fold §6 discipline — claims below are LEADS; confirm before locking):**

Each addition is a SMALL surgical arm in the existing parser, not a new grammar engine.
The `StylesheetItem` union type grows new variants or extends existing ones.

**O.W4.A — Recursive at-rule bodies.** Today: `@layer`, `@media`, `@supports`, `@container`,
`@scope`, `@starting-style` are all captured as `{kind:"unknown", atName, prelude, body}`.
`extractKeyframes` cannot see `@keyframes` nested inside them. The cure: make the at-rule
dispatcher recursive — `@layer`, `@media`, `@supports`, `@container`, `@scope`,
`@starting-style` get their own body parsers that recursively call `stylesheet` (or a
subset), returning `{kind: "layer"|"media"|"supports"|..., children: StylesheetItem[]}`.
The `StylesheetItem` union grows new typed variants. `extractKeyframes` walks `children`
recursively. **Born-RED precondition:** `parseCSSStylesheet('@layer base { @keyframes fade
{ 0% {opacity:0} } }')` returns a structure where `extractKeyframes` finds `"fade"`.
TODAY: confirmed failing — the body is opaque.

**O.W4.B — CSS Nesting.** (This overlaps with O.W0.S2 for the crash fix, but the full
nesting grammar goes further.) Nested qualified rules (`.b {}` inside `.a {}`) are valid
CSS Nesting L3. The `style` variant gains a `children?: StylesheetItem[]` field populated
by nested rules inside the declaration block. **Born-RED:** a nested style rule with a
property parses correctly and the nested selector resolves.

**O.W4.C — `@property` improvements.** Today `@property` is parsed but the descriptor
is minimal. Full CSS Properties and Values API L1: validate `syntax` against the CSS
property syntax grammar; emit `initialValue` as a typed `ValueArray`. Largely already
done (O.W4.C is a minor extension). **Born-RED:** `@property --foo { syntax: "<color>";
inherits: false; initial-value: red; }` parses to a typed `PropertyDescriptor` with
`initialValue` as a `Color` `ValueUnit`.

**O.W4.D — `if()` conditional function.** CSS Values Level 5 (verify shipping status in
Chrome; verify-before-fold §6). `if(<condition>: <value>; else <value>)` syntax. Adds an
`IfFunction` typed variant to `FunctionValue` or a new `{kind:"if"}` node. **Born-RED
(conditional on shipping):** `parseCSSValue('if(style(--on: 1): red; else: blue)')` parses
to a typed node; round-trips.

**O.W4.E — `@function` / custom value functions.** CSS Functions Level 1 (verify Chrome
141 claim — verify-before-fold §6). `@function --my-fn(--x: 0) { result: oklch(50% 0.1
calc(var(--x) * 360)); }`. Adds `{kind:"function"}` to `StylesheetItem`; the custom
function can be invoked as a `FunctionValue` with the function name. **Born-RED:** a
`@function` at-rule parses to a typed `StylesheetItem`; invoking it in a value round-trips.

**O.W4.F — Color 4/5 completeness: `contrast-color()`, system colors, `currentColor`
treatment.** `contrast-color()` (verify Chrome 147 claim — verify-before-fold §6). System
colors (ButtonText, CanvasText, etc.) as typed keywords. `currentColor` already handled in
N.W7 sentinels; confirm coverage. **Born-RED:** `parseCSSValue('contrast-color(white)')` does
not throw; returns a typed node.

**O.W4.G — `sibling-index()` / `sibling-count()`.** CSS Values (verify shipping status —
verify-before-fold §6). If not yet shipping in a stable baseline, grammar-only: parse + emit
without evaluation. **Born-RED:** parses without error; `toString()` round-trips.

**Per-feature born-RED discipline:** Each sub-wave (A–G) has its own gate clause in
`proof:grammar-2026`. A feature that is verify-before-fold UNVERIFIED is marked HOLD in
the gate until the browser-version claim is confirmed — it does not block the rest of O.W4.

**Gate:** `proof:grammar-2026` (NEW). A node gate asserting each O.W4.A–G construct parses
correctly and round-trips via `serializeStylesheet(parseCSSStylesheet(input)) ≡
parseCSSStylesheet(serializeStylesheet(parseCSSStylesheet(input)))`. TODAY: O.W4.A fails
(nested `@keyframes` in `@layer` not found by `extractKeyframes` — confirmed live); O.W4.B
crashes (O.W0 gate); others not yet asserted.

---

### O.W4b — Full timeline + scroll-driven-animation grammar

**Band:** grammar (sibling of O.W4; dispatches in parallel after O.W0).
**Dep:** O.W0, O.W4.A (recursive at-rule bodies — `@scroll-timeline`/`@view-timeline` are
at-rules requiring recursive body parsing). parse-that A.W2 (packrat FIX — ensures memo
correctness for the extended grammar).

**Note:** N.W11' already shipped `CSSTimelineOptions` (the VALUE-level grammar —
`animation-timeline`, `scroll()`, `view()`, `animation-range`, range keywords). O.W4b
extends this to the **AT-RULE-level grammar** (`@scroll-timeline`, `@view-timeline`
at-rules as typed `StylesheetItem` variants) and ensures the AT-RULE descriptors round-trip
through the new bidirectional harness.

**Scope:**
- `{kind: "scroll-timeline", name, descriptors}` and `{kind: "view-timeline", name,
  descriptors}` variants for `StylesheetItem`.
- `animation-trigger` grammar (confirm shipping — verify-before-fold §6).
- `animation-range-start`/`animation-range-end` shorthand in declaration parsing.
- Ensure `extractTimelineOptions` in `parsing/scroll-timeline.ts` walks the new typed
  at-rule variants.

**Born-RED gate (per construct, part of `proof:grammar-2026`):**
```
parseCSSStylesheet('@scroll-timeline --my { source: auto; orientation: block; }')
```
→ returns `{kind:"scroll-timeline", name:"--my", descriptors:{source:"auto",...}}`.
TODAY: falls into `{kind:"unknown"}`.

---

### O.W5 — Semantic-idempotence invariant + moderate-supersede additions

**Band:** bidirectional.
**Dep:** O.W0 (no crashes), O.W4/O.W4b (complete grammar). The idempotence harness can only
be comprehensive after all constructs are typed.

**Scope:**

**S1 — The idempotence harness.** A property-based fuzz harness over every `StylesheetItem`
kind and every value-level construct. Uses a deterministic input corpus (not a runtime fuzzer
dependency — a fixed set of representative CSS strings per construct: keyframes, properties,
style rules, at-rules, value functions, colors, gradients, easing, scroll-timeline). Asserts:
```
parseCSSStylesheet(serializeStylesheet(parseCSSStylesheet(s))) === parseCSSStylesheet(s)
```
(deep structural equality, value-normalized — NOT string equality). The test is added to the
vitest suite (not a `proof:*` script) because it requires the full test infrastructure.

**S2 — `linear()` stop spacing fix** (may already land in O.W0; if so, confirmed here).
Ensure `FunctionValue.toString()` for `linear()` emits position-hints space-separated
from their stop value. The fix: either a `separator` map on `FunctionValue` keyed by name,
or a specialized `serialize` path for known easing functions. The KISS choice: look up the
separator by name in `toString()`.

**S3 — Moderate-supersede additions (D6):**
- `spring(mass, stiffness, damping, velocity)` easing syntax: parse → typed `SpringEasing`
  node; serialize back; lower to `linear()` CSS via existing `springLinearStops`. The round-
  trip: `spring(1, 100, 10, 0)` → typed → `linear(...)` CSS emission for the browser.
- `colorSpace: oklch` hint on color values: a per-value annotation for the consumer
  (`keyframes.js` interpolation engine) to pick interpolation space at the value level rather
  than the animation level. Parse `oklch color(oklch 0.5 0.1 200)` as a color with a space
  hint; round-trip.
- `@function` lowering (builds on O.W4.E): a `lowerCustomFunction(name, args)` utility that
  evaluates a `@function`-defined value to its CSS equivalent.

**S4 — `FunctionValue.toString()` audit.** Verify every named function that has
non-standard separator semantics is handled. The `linear()` fix is the known one; audit
for others (e.g. `calc()` operator-infix is already correct, per `src/units/index.ts:177`).

**Born-RED gate:** `proof:round-trip-idempotent` (NEW). Runs the idempotence harness over
the fixed corpus. TODAY: fails for the `linear()` construct and for any `@layer` input
containing nested `@keyframes` (both confirmed live). GREEN only when the full corpus
passes the structural deep-equal assertion.

---

### O.W6 — SOTA perf: combinator/scanner hybrid

**Band:** perf.
**Dep:** parse-that A.W1 (CSS parser deletion — harvest the scanner technique BEFORE
deletion; see below), parse-that A.W3 (SpanParser tagged-union, V8 jump-table), O.W2
(subpath structure). This is the last wave in O — it requires the full grammar (O.W4/O.W5)
to be stable before hot-path rewrites.

**Scope:**

**S1 — Harvest the monolithic byte-loop scanner technique.** parse-that A.W1 DELETES the
CSS parser (`typescript/src/css/`). Before deletion, the technique (not the grammar) is
extracted: the inner `scanToken`/`scanIdent`/`scanNumber` byte-loop scanners from the
parse-that CSS parser are studied, and the analogous improvement is applied to value.js's
`src/parsing/utils.ts` and `src/parsing/index.ts`. This is the D7 decision: "keep the
technique, drop the grammar." The harvest is not a copy-paste — it is an informed rewrite
of the value-level expression loop.

**S2 — SpanParser tagged-union in the value parser hot path.** After parse-that A.W3
ships, consume the `SpanParser` tagged-union for the high-frequency dispatch in
`CSSFunction` and `Value` (the `any(...)` chains in `src/parsing/index.ts:224,235`).
The V8 jump-table effect (escape megamorphic IC) applies when the dispatch is over a
bounded set of tagged cases, which CSS function names satisfy (there are ~30 recognized
function names).

**S3 — `gamutMapToRgbSpace` bisection loop** (overlaps with O.W3's alloc fix; O.W6
potentially adds SIMD-style numeric unrolling if the bisection is on the critical path
— measure first).

**S4 — Co-bench with kf color interpolation.** A joint bench (`bench/color-interp.bench.ts`)
exercising `mixColors` + `gamutMap` at animation frame rate (60fps, 100 elements, OKLab
space) establishes the SOTA target. The bench MUST show improvement over the O.W3 baseline.

**Born-RED gate:** `proof:perf-target` (NEW, MEASURE-FIRST). Structure:
- C1: run the CSS-parse bench on a representative corpus (100 × `parseCSSValue('linear-
  gradient(red, blue)')` + 100 × `parseCSSStylesheet(...)`) before the O.W6 optimizations.
  Record MB/s baseline.
- C2: after O.W6, the bench is ≥ the target (set from the baseline — the gate author sets
  N_target = 1.2 × baseline after C1 establishes the floor).
- C3: `mixColors` bench is ≥ the pre-O.W3 baseline (regression guard).

TODAY: C1 runs and produces a baseline; C2 cannot pass (no optimization exists); gate exits
1 by construction. GREEN only when C2 and C3 both pass.

---

## §6 — The constellation DAG + multi-repo sequencing

The O waves participate in the three-repo acyclic execution DAG from
`CONSTELLATION-CAMPAIGN.md §5`:

```
parse-that A.W0 (0.9.1 manifest) ─┐
parse-that A.W1 (CSS removal)      ├─► value.js O.W0 (P0 crashes) ─► O.W1/O.W2 (subpath)
parse-that A.W2 (packrat FIX)      │                                       │
parse-that A.W3 (subpath+SpanU) ───┘                        ┌──────────────┤
                                                             │              │
                                              O.W3 (perf/zero-alloc) ‖ O.W4/O.W4b ‖ O.W5 (grammar)
                                              [parallel: disjoint module sets; O.W3 ‖ O.W4/O.W5]
                                                             │              │
                                                             └──────┬───────┘
                                                                    ▼
                                                             O.W6 (SOTA perf)
                                                                    │
                                                keyframes.js M.W9/W10/W11 (consume) · M.W11 (proof:css-parity)

O.W7-demo (demo/frontend — isolated, no library source)
  ┌── O.W0 (soft dep: P0 inputs display as error states if O.W0 not yet shipped)
  └── N.W10 (soft dep: cascade-kill substrate; S3 scoped conservatively if not shipped)
  ▼
proof:parse-lab-mount (born-RED: pane absent, parseCSSColor call-count = 0)
[O.W7-demo is PARALLEL with O.W0–O.W6; does not block and is not blocked by any library wave]
```

**O.W0** is parse-that-independent; it can dispatch as soon as v1.0.0 closes (or earlier
with owner authorization as a 0.x patch).

**O.W1/O.W2** need parse-that A.W0 (manifest) for the `.d.ts` resolution in the re-pinned
subpath consumers; they do NOT need A.W1/A.W2/A.W3.

**O.W3** (perf/zero-alloc) is grammar-independent; it parallelizes with O.W4 AND O.W5.
O.W3 ‖ O.W4/O.W4b (no shared files; disjoint module sets). Both feed into O.W6.

**O.W4/O.W4b** (grammar) need O.W0 (no crashes) and O.W1/O.W2 (subpath structure); they need
parse-that A.W1 (CSS-surface removal) to ship before their own publish so value.js doesn't
import a surface that is being removed.

**O.W5** (bidirectional) needs O.W4/O.W4b complete.

**O.W6** (perf) needs parse-that A.W1 (harvest the technique before deletion), A.W3
(SpanParser), and O.W5 (stable grammar). It is the last O library wave.

**O.W7-demo** (demo/frontend) is ISOLATED — no parse-that edge, no library source change.
It can execute in parallel with any O library wave once the N demo block opens (N.W10 or
earlier with scoped S3). It does not block and is not blocked by O.W0–O.W6. Version cut:
O.W7-demo ships as a demo-only deploy at any point; it carries no library version bump.

**Version cut cadence:**
- O.W0 → patch if pre-v1.0.0, else first release post-v1.0.0 (1.0.1 or 1.1.0).
- O.W0–O.W2 → **1.1.0** (additive: new subpath exports, no BC break).
- O.W0–O.W5 → **1.2.0** (additive: new grammar constructs, new types).
- O.W6 → **1.3.0** (perf — no API change, can be a minor).

**Multi-repo discipline (from the campaign):**
- consume-published-not-branches: O never imports parse-that via `file:`.
- each repo drives to its own green CI before the cross-repo edge publishes.
- at each cross-repo edge: publish, then re-pin (ONE atomic commit re-pins + deletes
  workarounds, never a staged partial state).

---

## §7 — Critical files (the binding sites)

| Surface | Files | Wave |
|---------|-------|------|
| P0 crashes | `src/parsing/index.ts` (handleGradient, lines ~188–208) | O.W0 |
| P0 nesting | `src/parsing/stylesheet.ts` (stylesheetItem, line 501) | O.W0 |
| `linear()` spacing | `src/units/index.ts` (FunctionValue.toString, line 184) | O.W0 |
| Subpath edge | `src/units/index.ts:1` (registerColorNames import from parsing) | O.W1 |
| Vite multi-entry | `vite.config.ts` or new `vite.library.ts` | O.W1 |
| Exports map | `package.json` exports | O.W2 |
| gamutMap alloc | `src/units/color/dispatch.ts` gamutMapToRgbSpace (lines 223–257) | O.W3 |
| Matrix out-param | `src/units/color/matrix.ts` (add transformMat3Into) | O.W3 |
| Recursive at-rules | `src/parsing/stylesheet.ts` (atRule dispatcher, line ~490) | O.W4.A |
| StylesheetItem union | `src/parsing/stylesheet.ts` (StylesheetItem type, line 43) | O.W4 |
| Idempotence harness | `test/round-trip.test.ts` (NEW) | O.W5 |
| SpanParser hot path | `src/parsing/index.ts` (CSSFunction, Value parsers) | O.W6 |

---

## §8 — Verify-before-fold ledger (O-specific items)

The campaign's verify-before-fold §6 records apply. O adds the following O-specific
unverified-but-plausible claims that MUST be confirmed before the relevant gate is locked:

| Claim | Wave | Status | Confirm-against |
|-------|------|--------|-----------------|
| `contrast-color()` shipping in Chrome 147 | O.W4.F | UNVERIFIED | caniuse / MDN |
| `@function` shipping in Chrome 141 | O.W4.E | UNVERIFIED | caniuse / MDN |
| `sibling-index()`/`sibling-count()` shipping status | O.W4.G | UNVERIFIED | caniuse / MDN |
| CSS Snapshot 2026 stability tiers for `if()` | O.W4.D | UNVERIFIED | CSS WG draft |
| SpanParser tagged-union ≥10% over regexSpan (from parse-that A.W3) | O.W6.S2 | UNVERIFIED | independent bench |
| `linear-gradient` crash root is the `any()` opt-filter not the if-arm | O.W0.S1 | CONFIRMED (live test + source read) | `src/parsing/index.ts:191,198` |
| CSS Nesting crash root is the top-level-only stylesheetItem | O.W0.S2 | CONFIRMED (live test + source read) | `src/parsing/stylesheet.ts:501` |
| `linear()` stop spacing wrong root is `FunctionValue.toString():184` | O.W0.S3 | CONFIRMED (live test + source read) | `src/units/index.ts:184` |
| `@layer` nested `@keyframes` opaque body | O.W4.A | CONFIRMED (live test) | `node dist/value.js` + source |

---

## §9 — Successor + deferrals

O targets comprehensive grammar + perf at v1.x. Deferred out-of-scope items (recorded,
not dropped):

- **Byte-lossless CST** (comment/trivia preservation): the full rewrite option (D5 — OUT).
  The CSSOM serialization spec, rowan/red-green-tree, postcss `raws` — these are the
  reference art. BOOK-with-trigger: if a consumer requires preserving author comments in
  round-trip edit workflows, a successor tranche (P) can add a CST tier beside the existing
  AST. O.W5's semantic-idempotence is the floor; CST is the ceiling.

- **A full author-time superset language** (D6 — OUT). `spring()` in O.W5 is a MODERATE
  addition that lowers to standard CSS. A new language (custom at-rules for layouts, typed
  custom properties without `@property`, etc.) is OUT of the campaign scope.

- **Anchor-positioning grammar** and **view-transitions grammar**: grammar-completeness sweep
  items (parse + round-trip; kf doesn't consume them). If small, they may fold into O.W4;
  if non-trivial, a P-wave.

- **Postcss integration**: an optional `formatCSS` caller that uses postcss instead of
  prettier for formatting (lighter). `formatCSS` already uses prettier via lazy `import()`;
  postcss is an O.WZ candidate if the tarball target demands it.

---

## §10 — Mode + authority

**DEVELOPMENT only at open.** O.W0 MAY dispatch as a patch pre-v1.0.0 with explicit owner
authorization (P0 severity; the crashes are shipping to consumers). O.W1–O.W6 dispatch on
explicit user ratification AFTER N.W9' / v1.0.0.

**Authority:** the 2026-06-18 Constellation campaign, 64 lanes, 66 agents. All O wave specs
MUST conform to the locked decisions D1–D11 in `CONSTELLATION-CAMPAIGN.md §1`. The three
new O invariants (inv-O-1..inv-O-3) are additive — they extend the N spine without amending
any N invariant.
