# O.W5 — Semantic-idempotence invariant + moderate-supersede additions

- **Band:** C · **Class:** bidirectional correctness + moderate-supersede (D5/D6) ·
  **Dep:** O.W4 + O.W4b complete (the idempotence harness is only comprehensive after all
  constructs are typed); O.W0 (no crashes in the corpus runners); O.W3 (alloc baseline
  stable — the harness must not pressure GC during corpus sweeps) ·
  **Gate (new):** `proof:round-trip-idempotent`
- **Folds (campaign lanes):** CONSTELLATION-CAMPAIGN §3 O.W5 (semantic-idempotence
  invariant D5; moderate-supersede D6: `spring()`, `colorSpace` round-trip, `@function`
  lowering; property-based fuzz harness; `FunctionValue.toString()` `linear()` stop-spacing
  fix); D5 (semantic idempotence, owner-confirmed: `parse(serialize(parse(s)))≡parse(s)`,
  value-normalized, NOT byte-lossless CST); D6 (moderate-supersede: bounded primitives +
  typed `@function` + computed-value extensions, NOT a new language); the
  verify-before-fold §6 discipline (spring() browser-status: CONFIRMED native Spring
  easing not yet in CSS — value.js lowers to `linear()` stops)
- **Precept cures:** no-legacy (the `FunctionValue.toString()` comma-join that corrupts
  `linear()` round-trips — a five-line fix that unblocks the whole idempotence class);
  KISS (the fuzz harness is a deterministic fixed corpus + deep structural equality, NOT a
  runtime property-based fuzzer dependency); inv-O-2 (the bidirectional-idempotence
  structural invariant, installed by this wave)

---

## Context

The semantic-idempotence invariant (`inv-O-2`) was chartered at O-open as a structural
requirement: for EVERY construct in the grammar, `parse(serialize(parse(s))) ≡ parse(s)`
(value-normalized, deep structural equality — not byte equality). Two known violations exist
on 0.13.0 HEAD; additional ones may surface when the O.W4/O.W4b typed constructs are added
without careful serializer coverage:

**Known breach 1 — `linear()` stop spacing (confirmed live, 0.13.0).**

```
parseCSSValue('linear(0, 0.5 50%, 1)').toString()  →  "linear(0, 0.5, 50%, 1)"
```

Root: `src/units/index.ts:184` — `FunctionValue.toString()` joins ALL argument values with
`", "` unconditionally. The CSS Easing Functions Level 2 `linear()` grammar places position
hints as space-separated hints attached to their stop value, not as independent comma-
separated arguments. The parser already represents this correctly in the `FunctionValue`
(the stop value and position hint are already structured differently by the time they reach
`toString()`); the error is purely in the emitter. Confirmed via the O.W0 gate (this is
Breach 3 of O.W0, to be fixed there if O.W0 dispatches first; O.W5 confirms the fix is
in place and covered by the idempotence harness).

**Known breach 2 — opaque `@layer`/`@media` bodies (confirmed live, 0.13.0).**

```
serializeStylesheet(parseCSSStylesheet('@layer base { @keyframes fade { 0%{opacity:0} } }'))
→ '@layer base {\n@keyframes fade { 0%{opacity:0} }\n}'   (re-parses as {kind:"unknown"})
```

Root: before O.W4.A, `@layer` is captured as `{kind:"unknown", body: rawString}`. The
serialize/re-parse cycle wraps the content back in the unknown representation; idempotence
only holds vacuously (round-trip produces the same unknown, not a typed tree). After O.W4.A
types `@layer` with recursive children, the serializer MUST emit canonical CSS that parses
back to the SAME typed tree, not just the same raw string.

**Known breach 3 — O.W4 new constructs require serializer coverage.**

Every O.W4/O.W4b new `StylesheetItem` variant (`layer`, `media`, `supports`, `container`,
`scope`, `starting-style`, `scroll-timeline`, `view-timeline`, `function`, `if`) needs a
corresponding arm in `serializeStylesheetItem`. Without it, `serializeStylesheet` throws
or falls through to the `unknown` arm, failing the idempotence assertion.

**The moderate-supersede additions (D6).**

D6 defines "moderate-supersede" as bounded extensions that lower to standard CSS and
round-trip. Three additions are in scope for O.W5:

1. `spring(mass, stiffness, damping, velocity)` — a typed easing node that lowers to
   `linear()` CSS via the existing `springLinearStops` (keyframes.js already ships this;
   value.js parses and round-trips the author-side `spring()` syntax, then emits `linear()`
   for the browser). This is the SOLE supersede-syntax addition; it is small, fully lowers,
   and value.js already has the `springLinearStops` helper from N.W7.

2. `colorSpace: oklch` annotation — a per-value hint on Color `ValueUnit` nodes that
   signals the intended interpolation space to a consumer. NOT a new serialization syntax;
   it is an additional field on the existing typed structure, emitted in `@keyframes`
   declaration values as `color(in oklch ...)` via Color 4 `color()` function notation.
   Round-trips through the existing color parser.

3. `@function` lowering — builds on O.W4.E. Once typed `@function` at-rules are parsed,
   `lowerCustomFunction(stylesheet, name, args)` resolves a custom-function invocation to
   its CSS-equivalent string. This is a utility function, not a parser change. Round-trips:
   the `@function` definition round-trips through serialize/parse; the lowered call is
   standard CSS that round-trips through the value parser.

**The scope fence.** O.W5 is the SERIALIZER/HARNESS wave. It does NOT:
- Add new parser arms (those are O.W4/O.W4b's territory);
- Change the type system for `StylesheetItem` (done in O.W4);
- Fix allocation patterns (O.W3);
- Add new optimizations to the hot path (O.W6).

O.W5 adds serializers for the new constructs, installs the fuzz harness, and fixes the
`FunctionValue.toString()` linear-spacing issue.

---

## Scope

Each S-clause is a concrete, falsifiable deliverable. Together they install `inv-O-2`
(bidirectional-idempotence) as a TESTED structural property of the grammar.

### S1 — `FunctionValue.toString()` `linear()` stop-spacing fix

**Breach (confirmed live, `src/units/index.ts:184`).**

`FunctionValue.toString()` at line 184:
```ts
return `${this.name}(${this.values.map((v) => v.toString()).join(", ")})`;
```
This emits ALL arguments comma-separated. For `linear(0, 0.5 50%, 1)`, the parser produces
a `FunctionValue("linear", [VU(0), VU(0.5), VU(50, "%"), VU(1)])` — four separate
`ValueUnit` nodes (the parser correctly tokenizes the space-separated position hint as a
distinct token). The emitter re-joins them all with `", "`, losing the space-separation.

**Cure (KISS — named-function aware separator).** The minimal fix: in `FunctionValue.toString()`,
detect the `linear` function name and emit with the `linear()` grammar's stop structure.
The CSS Easing Level 2 grammar for `linear()`:
```
linear( <linear-stop-list> )
<linear-stop-list> = [ <number> && <linear-stop-length>{0,2} ]#
<linear-stop-length> = <percentage>
```
Each stop is `<number> [<percentage> [<percentage>]]?` — stop values comma-separated,
position hints space-separated from their stop value and from each other.

The parser groups stops BEFORE they enter `FunctionValue.values`; the fix MUST match
whatever structure the O.W4 parser establishes for `linear()` stops. Two implementation
paths:

**Option A (preferred — no structural change required today).** The current parser produces
a flat `FunctionValue` with four `ValueUnit` children for `linear(0, 0.5 50%, 1)`:
`[VU(0), VU(0.5), VU(50,"%"), VU(1)]`. In `toString()`, detect `this.name === "linear"`
and re-group: emit the first stop, then for subsequent children, if the child has unit `%`,
emit it space-separated from the previous; otherwise emit with `", "`. The heuristic:
`unit === "%"` → space-separated position hint; else → comma-separated stop value.

**Option B (cleaner — requires a structural parser change).** Change the `linear()` parser
to produce a `FunctionValue("linear", [LinearStop, LinearStop, ...])` where each
`LinearStop` is a `FunctionValue("linear-stop", [VU(output), VU(pos, "%")?])`. Then
`LinearStop.toString()` emits `"output pos"` (space-joined), and the parent joins with
`", "`. This is the CORRECT structural representation but requires a parser change
(O.W4/O.W0 territory). If O.W0 dispatches first and changes the `linear()` parser
structure, Option A may not apply.

**Decision (for O.W5 authoring):** The KISS path is to confirm which parser structure
O.W0/O.W4 leaves in place and write the serializer to match. If Option A applies (flat
ValueUnit list), implement the `unit === "%"` heuristic with a named-switch in `toString()`.
If Option B structure is in place, implement the `LinearStop.toString()` approach. Either
way: **the `linear()` fix MUST be in place before `proof:round-trip-idempotent` is run**;
the gate exercises `linear(0, 0.5 50%, 1)` directly.

**Falsifiable check.** `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` ===
`"linear(0, 0.5 50%, 1)"`. This is also O.W0's S3 gate clause — if O.W0 dispatched first,
this clause is already green; O.W5 ensures it stays green under the full harness.

### S2 — Serializers for all O.W4/O.W4b new `StylesheetItem` variants

**Breach (structural — will arise when O.W4 types the new constructs).** Today,
`serializeStylesheetItem` (`src/parsing/serialize.ts:95`) has a `switch` over
`"keyframes" | "property" | "style" | "unknown"`. O.W4 adds:
`"layer" | "media" | "supports" | "container" | "scope" | "starting-style"` (O.W4.A),
`"style"` with `children` field (O.W4.B), `"function"` (O.W4.E), `"if"` (O.W4.D).
O.W4b adds `"scroll-timeline" | "view-timeline"`.

Each new variant needs a `serialize<Variant>` function and a corresponding `case` in
the switch. Without these, `serializeStylesheetItem` falls through to TypeScript's
exhaustiveness error (if the union is total) or the `unknown` arm (if there is a default).
Either way the round-trip fails.

**Cure.** For each O.W4/O.W4b new variant, add a `serializeXxx` function in
`src/parsing/serialize.ts` that emits canonical CSS matching what the parser expects
on re-parse. The canonical forms are the CSS spec serialization of each at-rule:

| Variant | Canonical emission |
|---------|-------------------|
| `layer` | `@layer <name> { <children> }` or `@layer <name>;` (statement form) |
| `media` | `@media <prelude> { <children> }` |
| `supports` | `@supports <condition> { <children> }` |
| `container` | `@container <name> <condition> { <children> }` |
| `scope` | `@scope <limits> { <children> }` |
| `starting-style` | `@starting-style { <children> }` |
| `scroll-timeline` | `@scroll-timeline <name> { <descriptors> }` |
| `view-timeline` | `@view-timeline <name> { <descriptors> }` |
| `function` | `@function <name>(<params>) { result: <body>; }` |

The `children` field of recursive at-rules serializes as
`items.map(serializeStylesheetItem).join("\n\n")`.

The `style` variant with `children` (O.W4.B CSS nesting) serializes nested rules inline
within the declaration block:
```
.a {
  color: red;
  .b { color: blue; }
}
```

**Falsifiable check.** For each variant V in `{layer, media, supports, container, scope,
starting-style, scroll-timeline, view-timeline, function}`: a corpus string `s_V` parses
to `{kind: V, ...}`; `serializeStylesheetItem(parseCSSStylesheet(s_V)[0])` re-parses to a
structurally equal node (the idempotence harness in S4 covers this). TypeScript
exhaustiveness: `serializeStylesheetItem` should have no `default` arm — the TypeScript
`never` check enforces total coverage.

### S3 — `spring()` easing moderate-supersede (D6)

**Scope.** Parse `spring(mass, stiffness, damping, velocity)` as a typed easing node;
serialize back to `spring(...)` author-syntax; lower to `linear(...)` CSS via the existing
`springLinearStops` utility (from kf's `src/animation/springLinearStops.ts`, or the
equivalent logic inlined in value.js — the formula is self-contained and small).

**Why here.** `spring()` is not native CSS (as of 2026-06-18; the CSS Working Group has a
spring() proposal but it is not shipped in any browser). It is a value.js MODERATE-SUPERSEDE
addition (D6): it parses, round-trips as `spring(...)` in the AST, and lowers to `linear()`
for browser consumption. The lowering path uses the existing ODE closed-form solution;
value.js already ships `springLinearStops` from N.W7 (`src/easing.ts` or the keyframes
re-export). This wave moves the logic to `src/parsing/easing.ts` as a canonical location.

**Parser addition.** In `src/parsing/easing.ts` (or a new `spring` arm in the easing
parser already present there), add:
```
spring(<number>, <number>, <number>, <number>)
```
Produces a typed node `{ kind: "spring", mass, stiffness, damping, velocity }` wrapped in
a `ValueUnit(node, "spring")` or a `FunctionValue("spring", [...args])`. The KISS choice:
use `FunctionValue("spring", [VU(mass), VU(stiffness), VU(damping), VU(velocity)])` — no
new wrapper type required, and `toString()` already handles `functionName(args...)`.

**Lowering utility.** `lowerSpringEasing(mass, stiffness, damping, velocity, steps?: number): string`
returns a `linear(...)` CSS string with N evenly-spaced stops (default N=16, configurable).
Added to `src/parsing/easing.ts` (the serialization layer, not the interpolation layer).
This is a PURE function (no DOM, no rAF) using the closed-form spring ODE:
```
position(t) = exp(-damping/2m × t) × (A×cos(ωₙt) + B×sin(ωₙt))
```
where ωₙ = sqrt(stiffness/mass - (damping/2m)²). The existing `SpringProgress` from kf
already embeds this math; the formula is reproduced in value.js to avoid a circular dep.

**Round-trip.** `parseCSSValue('spring(1, 100, 10, 0)')` → a typed node →
`toString()` → `"spring(1, 100, 10, 0)"` (author round-trip). `lowerSpringEasing(1, 100,
10, 0, 16)` → `"linear(0, ...16 stops...)"` (browser emission). The lowered form also
parses correctly (it is standard CSS `linear()`).

**Falsifiable check.** `parseCSSValue('spring(1, 100, 10, 0)').toString()` ===
`'spring(1, 100, 10, 0)'` (author round-trip). `lowerSpringEasing(1, 100, 10, 0, 16)` does
not throw and the result string begins with `"linear("`. `parseCSSValue(lowerSpringEasing(
1, 100, 10, 0, 16)).toString()` === the same string (the lowered form is self-idempotent).

### S4 — Property-based round-trip fuzz harness (`test/round-trip.test.ts`)

**Structure.** A vitest test file (not a `proof:*` script — requires the full test
infrastructure for deep structural equality utilities) that runs the
`parse(serialize(parse(s))) ≡ parse(s)` assertion over a deterministic fixed corpus.

**Design principles:**
- **No runtime fuzzer dependency** — the corpus is a hardcoded array of CSS strings, chosen
  to cover every grammar construct. No `fast-check` or `@vitest/coverage` required; the
  corpus is the spec. KISS.
- **Deep structural equality** — uses a recursive `deepEqualAST(a, b)` helper (authored in
  the test file) that compares `StylesheetItem` trees ignoring whitespace-only `prelude`
  differences. NOT string equality.
- **Per-construct sections** — the test is structured as one `describe` block per
  `StylesheetItem` kind, with corpus entries per O.W4/O.W4b variant. Adding a new construct
  requires adding one corpus entry and nothing else.
- **Deterministic** — no `Math.random()`, no timer-dependent behavior. Runs identically in
  CI and locally.

**Corpus coverage (one representative per construct minimum):**

| Construct | Representative corpus string |
|-----------|------------------------------|
| `@keyframes` | `'@keyframes slide { 0% {transform: translateX(0)} 100% {transform: translateX(100px)} }'` |
| `@property` | `'@property --color { syntax: "<color>"; inherits: false; initial-value: red; }'` |
| `style` (flat) | `'.foo { color: oklch(0.5 0.1 200); transform: scale(1.2); }'` |
| `@layer` (nested `@keyframes`) | `'@layer base { @keyframes fade { 0% {opacity:0} 100% {opacity:1} } }'` |
| `@media` (recursive) | `'@media (max-width: 768px) { .foo { display: none; } }'` |
| `@container` | `'@container sidebar (min-width: 400px) { .card { flex-direction: row; } }'` |
| `@scope` | `'@scope (.card) { .title { font-size: 1.5em; } }'` |
| `@starting-style` | `'@starting-style { .dialog { opacity: 0; } }'` |
| `@scroll-timeline` | `'@scroll-timeline --my-tl { source: auto; orientation: block; }'` |
| `@view-timeline` | `'@view-timeline --my-vt { subject: selector(.card); }'` |
| CSS Nesting | `'.parent { color: red; .child { color: blue; } }'` |
| `linear()` stops | `'@keyframes f { from { animation-timing-function: linear(0, 0.5 50%, 1); } to { opacity: 1; } }'` |
| `spring()` | `'@keyframes f { from { animation-timing-function: spring(1, 100, 10, 0); } to { opacity: 1; } }'` |
| `color()` with space hint | `'.foo { color: color(in oklch 0.5 0.1 200); }'` |
| gradient | `'.foo { background: linear-gradient(to bottom right, oklch(0.7 0.2 30), oklch(0.4 0.15 250)); }'` |
| `cubic-bezier` | `'@keyframes f { from { animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1); } to {} }'` |
| `steps()` | `'@keyframes f { from { animation-timing-function: steps(4, end); } to {} }'` |
| `var()` | `'.foo { color: var(--primary-color, oklch(0.5 0.1 200)); }'` |
| `calc()` | `'.foo { width: calc(100% - 2rem); }'` |
| `@function` | `'@function --brand-color(--lightness: 0.5) { result: oklch(var(--lightness) 0.15 200); }'` |
| `if()` (hold if unverified) | `'.foo { color: if(style(--on: 1): red; else: blue); }'` |

**Assertion.** For each corpus string `s`:
```ts
const parsed1 = parseCSSStylesheet(s);
const serialized = serializeStylesheet(parsed1);
const parsed2 = parseCSSStylesheet(serialized);
expect(deepEqualAST(parsed1, parsed2)).toBe(true);
```

**The `deepEqualAST` helper.** A recursive structural comparator that:
- Compares `StylesheetItem` arrays by kind, name/prelude, children;
- Compares `Declaration` by name + value (normalized: trim whitespace on `toString()`,
  or compare `ValueArray` structurally);
- Does NOT compare raw body strings for `unknown` items — the unknown fallback for
  unrecognized at-rules may normalize whitespace;
- Treats `null`/`undefined` children as empty arrays (vacuous nesting equality).

**Falsifiable check.** On 0.13.0 HEAD (before O.W5 lands), the test file fails on at least:
- The `linear()` corpus entry (the comma-separator bug);
- The `@layer` corpus entry (opaque body before O.W4.A lands).
After O.W5 (with O.W4/O.W4b complete), all corpus entries pass. The test is added to the
vitest suite (`"test"` script in `package.json` already runs `vitest run`). CI picks it up
automatically.

### S5 — `FunctionValue.toString()` named-function audit (completeness sweep)

**Scope.** Verify every function name that has non-standard separator semantics is handled
by `toString()`. The `linear()` fix is S1's known case; the audit checks for others:

- `calc()` operator-infix: ALREADY CORRECT (`src/units/index.ts:177`): the arithmetic
  operator arm emits `"left op right"` (infix). Confirm in source; no change needed.
- `cubic-bezier()`: standard comma-separated args → CORRECT with the default join.
- `steps()`: standard comma-separated → CORRECT.
- `color()` with `in <space>` syntax: `color(in oklch 0.5 0.1 200)` — the `in` keyword and
  color space name are arguments alongside the numeric components. The parser produces a
  `FunctionValue("color", [VU("oklch","string"), VU(0.5), VU(0.1), VU(200)])` or similar.
  The emitter must emit `color(in oklch 0.5 0.1 200)` — the `in` keyword space-separated.
  Confirm the current serialization; add an `"in oklch"` prefix handling if needed.
- `linear-gradient()` direction argument: already handled by the gradient serializer path
  in `handleGradient()` — the `FunctionValue` for a gradient has the direction as a
  `ValueUnit` child. `toString()` on `VU(90, "deg")` → `"90deg"`, so `linear-gradient(90deg,
  red, blue)` → `FunctionValue("linear-gradient", [VU(90,"deg"), Color, Color])` →
  `"linear-gradient(90deg, red, blue)"`. No special casing needed.
- `spring()` (new, S3): `FunctionValue("spring", [...])` → standard comma-join is CORRECT
  (all four args are plain numbers: `spring(1, 100, 10, 0)`).

**Falsifiable check.** For each function in the audit: construct a corpus string, parse it,
call `toString()`, parse the result, deep-equal the two ASTs. No additional failures after
S1 is applied. Document any "confirmed correct" functions in a comment in `toString()` to
close the known-functions checklist.

---

## Born-RED gate

**Gate name:** `proof:round-trip-idempotent` (NEW).
**Tier:** hygiene (a node gate over the BUILT artifact, plus the vitest round-trip test).
**Two-part structure:** the gate has a node-script part (fast, born-RED immediately) and
the vitest test part (S4 — runs under `npm test`).

**The REAL observable (inv-O-2 — NOT a proxy).** The proxy to AVOID: asserting that
`FunctionValue.toString()` no longer contains `join(", ")` (a source-shape check that
a different equally-wrong emitter could pass). The gate must bite the ACTUAL failure
mode — *"a round-tripped CSS string produces a structurally different parse result,
silently corrupting animation data on re-parse."*

**Gate script: `scripts/proof-round-trip-idempotent.mjs`.**

A node gate that imports the BUILT `dist/value.js` and runs a targeted born-RED corpus:

| Clause | Input | Today (0.13.0) | After cure |
|---|---|---|---|
| C1 — `linear()` stop spacing | `parseCSSValue('linear(0, 0.5 50%, 1)').toString()` | `"linear(0, 0.5, 50%, 1)"` — WRONG | `"linear(0, 0.5 50%, 1)"` — CORRECT |
| C2 — `@layer` recursive | `parseCSSStylesheet('@layer base { @keyframes fade { 0%{opacity:0} 100%{opacity:1} } }')` re-serialized and re-parsed → `extractKeyframes` finds `"fade"` | FAILS (opaque body before O.W4.A) | PASSES |
| C3 — gradient round-trip | `parseCSSValue('linear-gradient(to right, red, blue)').toString()` parses identically | TODAY: may work (the gradient serializer is separate) | CONFIRMED |
| C4 — `spring()` round-trip | `parseCSSValue('spring(1, 100, 10, 0)').toString()` === `'spring(1, 100, 10, 0)'` | FAILS (spring() not yet parsed) | PASSES (S3) |
| C5 — color space hint | `parseCSSValue('color(in oklch 0.5 0.1 200)').toString()` parses identically | Confirm at implementation | PASSES |
| C6 — vitest suite green | `npm run test` runs `test/round-trip.test.ts` | S4 harness not present (FAIL by absence) | All corpus entries pass |

**Today's tree result.** `proof:round-trip-idempotent` exits 1 on today's tree:
- C1 FAILS — confirmed live (the linear() comma-join bug);
- C2 FAILS — O.W4.A not yet implemented;
- C4 FAILS — `spring()` not yet parsed;
- C6 FAILS — `test/round-trip.test.ts` does not exist.

**Green condition.** All six clauses pass: `linear()` serializes correctly (C1),
recursive at-rules survive a round-trip (C2), gradients are stable (C3), `spring()` is
author-idempotent (C4), `color()` space hints serialize correctly (C5), and the full vitest
corpus is green (C6). The gate is added to `proof:hygiene` membership (node + vitest, per
the tier partition).

**Why this is the genuine defect, not a proxy.** C1 and C2 run the REAL parser and emitter
from the REAL built dist against REAL CSS strings and compare the REAL parse results. A
re-ordering of `toString()` branches that still produces the wrong separator fails C1. An
opaque at-rule serializer that emits the raw body string but the parser reads it back as
`unknown` fails C2. No source-grep, no file-presence check, no type assertion stands between
the gate and the parse/serialize behavior.

---

## Dependencies

- **O.W0 (P0 crashes).** The C1 `linear()` corpus entry overlaps with O.W0 S3. If O.W0
  dispatches before O.W5, C1 may already be green; O.W5 confirms it survives the full
  harness. O.W0's fix is a PREREQUISITE (the gate runs against the built dist; a crash
  in the builder blocks the gate run).

- **O.W4 + O.W4b (complete grammar).** S2's serializers cannot be authored without knowing
  the exact `StylesheetItem` shapes O.W4 establishes. O.W5 is spec'ed against O.W4's type
  definitions; the implementation awaits O.W4 completion. The GATE (C2) cannot be green
  until O.W4.A (recursive at-rules) is implemented.

- **O.W3 (alloc baseline).** The round-trip harness corpus-sweeps ~18 strings through
  `parseCSSStylesheet` + `serializeStylesheet` + `parseCSSStylesheet` again. With O.W3's
  alloc reductions in place, this is GC-cheap. Without O.W3, the harness still passes
  (correctness is not alloc-dependent) but may produce more GC pressure in CI timing-
  sensitive runs. O.W3 is not a hard dependency; the harness correctness is independent.

- **No parse-that cross-repo edge.** O.W5 is purely value.js-internal. All serialize/parse
  operations import from value.js's own grammar — no parse-that API changes are consumed.
  The only parse-that constraint is that A.W2 (packrat FIX) is incorporated by the time the
  harness runs long corpus strings (transitive correctness; see O.md §6 DAG).

---

## DAG position

```
O.W0 (P0 crashes fixed) ─┐
O.W4 (typed at-rules)     ├─► O.W5 (serializers + harness + spring()) ─► O.W6 (perf — stable grammar)
O.W4b (scroll-timeline)  ─┘
        │
O.W3 (zero-alloc) ──────────── (parallel, not a hard dep for O.W5 correctness)
```

O.W5 → kf-M.W9/W10/W11 (the kf consume edge — kf's `proof:css-parity` gate consumes the
published dist; `proof:round-trip-idempotent` GREEN is a confidence signal that the grammar
kf consumes is semantically stable under editor round-trip workflows).

---

## Bite — what regression each clause catches

| Clause | Regression it prevents |
|---|---|
| S1 `linear()` fix | Re-introduction of a comma-join that corrupts linear() position hints — C1 bites the real emitter output |
| S2 serializers complete | An O.W4 variant without a serializer (throws or falls to unknown) — TypeScript exhaustiveness + C2 corpus entry |
| S3 `spring()` round-trip | A parser change that re-names or re-structures spring() args — C4 bites the author round-trip |
| S4 vitest corpus | Any future parser/emitter change that breaks an existing construct's idempotence — the fixed corpus is the regression oracle |
| C2 recursive at-rules | O.W4.A serializer emitting raw body string instead of canonical typed CSS — re-parse produces `unknown`, deep-equal fails |
| C6 vitest green | A harness entry that was accidentally skipped — the test count in CI is the signal |

---

## Excluded from this wave

- **`mixColorsInto` out-param (zero-alloc `mixColors`).** A public-surface change; deferred
  to O.W5-MIXCOLORS or a successor wave. O.W3 MEASURES it; O.W5 does not add it.

- **Byte-lossless CST (comment/trivia preservation).** D5 explicitly OUT. `parse(serialize
  (parse(s))) ≡ parse(s)` is VALUE-NORMALIZED semantic equality, not byte equality. The CST
  tier is a successor-tranche (P) item.

- **A full author-time superset language.** D6 OUT. `spring()` is the ONE supersede-syntax
  addition. No new at-rule types for layout, no custom property syntax beyond `@property`,
  no transpiler architecture.

- **`@function` evaluation engine.** O.W4.E adds parsing; O.W5 adds `lowerCustomFunction`
  as a utility. Full evaluation (resolving arbitrary CSS expressions with variable
  substitution, recursive calls, etc.) is a P-wave scope item. O.W5's lowering is KISS:
  parameter substitution only, no recursive call resolution.

- **`if()` corpus entry (conditional hold).** `if()` is in the O.W4.D verify-before-fold
  ledger as UNVERIFIED shipping status. The corpus entry in S4 is marked HOLD until the
  browser-version claim is confirmed. It can be added to the harness in the same commit that
  O.W4.D is implemented — no separate wave needed.

- **Anchor-positioning grammar**, **view-transitions grammar.** Grammar-completeness sweep
  items (O.md §9 deferred). Not in O.W5 scope.
