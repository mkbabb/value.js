# V·π PHASE-B RESEARCH — CSS L4 prototype architecture and wave proposal

2026-07-21 · research only · authority: `../HANDOFF.md`, `../PI.md`,
`../ADDENDA-01.md`, `../CHARTER.md` · Phase-A architecture:
`./research-architecture.md` + `./harden.md`.

This report proposes the architecture and sequence for the Phase-B addenda. It
is **not** `ADDENDA-02`, does not ratify a surface, and authorizes no prototype
or production implementation. No existing file, `src/`, `vnext/`, parser
engine, BBNF tree, keyframes tree, or inbox is changed by this seat.

## 0. Research verdict

Phase B is feasible over published `@mkbabb/parse-that@1.0.0`, but it is not a
wide collection of thin `CssCall` modules. Four facts change the proposed
shape in `ADDENDA-01.md`:

1. The fourteen Surface-3 rows are **feature-family buckets**, not an
   exhaustive CSS Level-4 standards census. The current BBNF input assay counts
   thousands of source obligations across a much larger pinned standards union.
   Closing fourteen handwritten checklists cannot substantiate “full CSS L4.”
2. The frozen Phase-A types cannot express Phase B. `CssValue` is only
   scalar/call/list (`src/value.ts:3-23`); `CssColor` is a resolved concrete
   color (`src/css/types.ts:6-9`); `StylesheetItem` has nine fail-fast kinds
   (`src/css/types.ts:109-128`); `ParseResult` cannot return a recovered tree
   (`src/css/types.ts:25-27`). Relative colors, math precedence, typed
   substitutions, selector/condition trees, recovery, and exact source spans
   cannot be made truthful by stuffing them into those shapes.
3. CSS-Syntax preprocessing/tokenization and recovery are upstream
   foundations. Landing them after the feature modules would force a second
   parser or a rewrite of every module. The syntax substrate therefore belongs
   immediately after W0, under an explicit owner-ratified schedule overlay.
4. The LIVE parser is a valid primary oracle only on the frozen overlap. It
   does not implement most Phase-B semantics and has known R1–R12 divergences.
   New L4 rows require the pinned specification and conformance vectors as the
   primary semantic oracle; browser CSSOM is a witness, not a majority oracle.

The KISS-forward target is consequently **one lossless string-state syntax
spine + one typed semantic overlay + one generic value-definition matcher**.
Feature modules reuse that spine. The existing 52-export surface remains an
unchanged Phase-A proof surface; a small additive L4 prototype surface exposes
syntax, typed values, selectors, conditions, recovered sheets, and
serialization without pretending that parsing owns layout, cascade, fetch,
display, or browser state.

## 1. Evidence base and epoch boundaries

### 1.1 Value authorities read

- Frozen contract and current behavior: `src/css/index.ts`, `src/css/types.ts`,
  `src/css/grammar.ts`, `src/css/stylesheet.ts`, `src/css/timeline.ts`,
  `src/css/syntax.ts`, `src/value.ts`, `src/color/model.ts`,
  `src/color/operations.ts`, and `src/transform/path.ts`.
- Proof evidence: `../../parser-proof/coverage.md`,
  `../../parser-proof/equivalence.md`,
  `../../parser-proof/equivalence-results.json`,
  `../../parser-proof/PROFILE-ANALYSIS.md`,
  `../../parser-proof/bench-results.json`, and
  `../../parser-proof/UPSTREAM-SURVEY.md`.
- Epoch-pinned formation inventory:
  `../../snapshot-vnext-2/CSS-MODULE-ISOMORPHISM.json`,
  `../../snapshot-vnext-2/PARSER-CSS-COLOR.md`,
  `../../snapshot-vnext-2/CANON-SUPPLEMENT-INVENTORY.json`, and
  `../../snapshot-vnext-2/waves/P-V.md`.
- Thin topology witnesses:
  `../../snapshot-vnext-2/prototypes/c14-css/src/css/grammar/l4/*.ts` and
  their isomorphic external tests. These prove topology and selected W0 shapes,
  not semantic depth (`../../parser-proof/coverage.md §Surface 3`).

The value.js revision observed by this seat is
`c654824e0b252cda7f8490b67f182a48c48cc0ed` on `tranche-u`. The Phase-B
research must continue to use committed/pinned corpus identities rather than
ambient dirty bytes.

### 1.2 BBNF coordination evidence read-only

The old value-side topology pin is the fifteen-module graph at BBNF revision
`af15f63e0d2d3d719938c13b906a50acbb92ea3b`, recorded in
`../../snapshot-vnext-2/CSS-MODULE-ISOMORPHISM.json`. Its exact source peers
remain `/Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/*.bbnf`.

The current BBNF campaign truth is newer and materially more cautious:

- `/Users/mkbabb/Programming/bbnf-lang/restart/skinny/tranches/sk-v25/CAMPAIGN-STATE.md`
- `/Users/mkbabb/Programming/bbnf-lang/restart/skinny/tranches/sk-v25/conformance/css-l4/README.md`
- `/Users/mkbabb/Programming/bbnf-lang/restart/skinny/tranches/sk-v25/conformance/css-l4/epoch-5/README.md`
- `/Users/mkbabb/Programming/bbnf-lang/restart/skinny/tranches/sk-v25/conformance/css-l4/epoch-5/GESTALT-3-ADJUDICATION.md`

Epoch 5 retains exact CSSWG/WPT bytes and narrow root/tree/route facts, but its
Gestalt-3 adjudication is RED: 20/20 findings survive, semantic CSS credit is
zero, and candidate/product credit is zero. In particular, its parsed
denominator, dialect consumers, WPT occurrence relation, and schema authority
are not accepted. **Value may coordinate on its byte identities and exchange
vectors, but must not import epoch-5 parsed labels as a CSS semantic oracle.**

The useful shared pins are CSSWG commit
`c7573530343759ace8e46438a1fa2c44515b5554`, WPT commit
`37cd7ff74eb974fd41600bf7bc01d37576abf8b5`, the sealed source objects beneath
the epoch-5 `inputs/objects/sha256/` tree, and the exact unresolved-obligation
ledger. The value-side coordination draft is
`../../../coordination/value-inbox-2026-07-20-bbnf-coordination.md`.

## 2. What “full CSS L4 parser” means here

Phase B must use a total operation disposition, adapted from
`../../snapshot-vnext-2/PARSER-CSS-COLOR.md:128-181`, rather than a scalar
“supported” flag. For this **prototype parser tranche**:

- **Required GREEN:** preprocessing, tokenization, parse, syntax-preserving
  recovery, typed representation where the reviewed support row says typed,
  exact untouched serialization, edit-preserving serialization, canonical
  serialization where a canonical semantic form exists, diagnostics, limits,
  and no-throw behavior.
- **Permitted explicit outcomes:** preserve syntax only, delegate a contextual
  operation, or refuse it with a typed reason. Every inventory row still has a
  terminal disposition.
- **Not owned by π:** cascade, inheritance, selector matching against an
  ambient DOM, layout, viewport/container measurement, URL fetch, worklet or
  element capture, display profiles, computed/used-value evaluation, live
  CSSOM identity, animation playback, and rendering. Phase B defines the typed
  capability seams and refusal results that later megatranche waves consume.

Thus “full” means **the pinned inventory is total and honest**, not that every
browser-context operation is simulated. Experimental, at-risk, obsolete, and
browser-specific rows carry independent maturity flags. `spring()` and draft
animation triggers, for example, cannot silently become stable defaults merely
because the owner asked for the July-2026 universe.

### Atomic coverage contract

Before the first feature wave, PB0 must produce a checked feature matrix whose
key is at least:

```text
(kind, name, for, source, base-or-extension, maturity, operation)
```

Each row binds exact source bytes/section, a reviewed support disposition, its
own fixtures, and its wave owner. The fourteen gaps become **routing families
over this matrix**; they are not the denominator themselves. Missing, duplicate,
or ambiguous joins are RED. A future accepted BBNF corpus can be joined by
digest, but it cannot replace the value-side independent census.

## 3. Target architecture

```text
exact SourceText + boundary map
          |
          v
one CSS-Syntax lexical owner (same parse-that string state)
          |
          +--> interval sidecar: token | trivia | recovery, total partition
          |
          v
component values / blocks / declarations (lossless CST)
          |
          +--> selector grammar
          +--> condition grammar
          +--> value-definition grammar + matcher IR
          |
          v
typed semantic overlay
  numeric/unit/math/substitution
  color/easing/effect/image/transform
  animation/timeline/rule/stylesheet
          |
          v
exact | edit-preserving | canonical serializers
```

### 3.1 Syntax substrate

PB1 owns the only character-level recognition layer:

- CSS preprocessing over UTF-16 with `SourceText { original, processed,
  boundaryMap }`; boundary entries carry left- and right-biased original
  offsets through CRLF collapse, CR/FF/NUL replacement, lone surrogates,
  astral pairs, and escapes.
- parse-that custom leaves over the processed **string state**. There is no
  second token parser, encoded token buffer, `TokenCursor`, or feature-local
  regex rescan. O-1/O-2/O-3 from `PROFILE-ANALYSIS.md` remain mandatory.
- One compact interval sidecar records significant tokens, trivia, and recovery
  ranges. It is an output/proof structure, not the parse input. Its intervals
  partition the processed source, preventing vacuous “exact serialization” by
  returning an unproved root string.
- Iterative balanced scanning and bounded recursion. Quotes, escapes, comments,
  bad string/URL tokens, CDO/CDC, delimiters, functions, blocks, and EOF each
  have one owner. Phase-A `splitTopLevel`-style scanners do not survive as a
  parallel L4 parser path.
- `CssLimits` is checked at every public entry: maximum code units, nesting,
  tokens/nodes, recovery events, and deterministic work. At-limit is accepted;
  `+1` returns `resource_limit`, never throws, hangs, recurses to stack failure,
  or allocates without bound.

This retains the measured fast lexeme strategy while making Syntax-3 recovery
and exact/edit serialization possible.

### 3.2 Lossless CST plus typed overlay

Do not force all information into one enormous AST and do not create a second
tree per feature. The parser produces a compact lossless document:

```ts
type CssDocument<T> = Readonly<{
    source: SourceText;
    root: T;
    intervals: CssIntervalTable;
}>;

type CssNodeBase = Readonly<{
    id: number;
    span: CssSpan;
}>;
```

Structural CST nodes own source order, delimiters, trivia/recovery relations,
and unknown syntax. Typed nodes are discriminated overlays referencing those
node IDs/spans; they do not copy raw substrings. Unknown or context-dependent
syntax remains a real component-value node, not an opaque string keyword.

Declarations retain both layers:

```ts
type CssDeclarationNode = CssNodeBase & Readonly<{
    kind: "declaration";
    name: string;
    important: boolean;
    value: CssComponentValueList;
    typed?: CssTypedValue;
}>;
```

Failure to type a syntactically recoverable declaration does not delete it.
This is required for custom properties, forward-compatible at-rules, exact/edit
serialization, and recovery.

### 3.3 Numeric, unit, and substitution spine

`numUnit` remains a lexical primitive, not the Phase-B semantic model. PB3 owns
one numeric tree preserving precedence:

- literal number/percentage/dimension;
- sum and product nodes (including negate/invert without losing authored
  grouping);
- closed math-call node set for `calc`, `min`, `max`, `clamp`, stepped,
  trigonometric, exponential, sign, root, and hypot functions;
- a dimension vector and percentage hint computed separately from syntax;
- explicit context requirements for relative font, viewport, container,
  percentage-basis, and other non-pure units.

No ambient evaluator belongs here. Pure compatible-unit folding may canonicalize
where the spec permits; context-dependent resolution returns a capability
requirement/refusal.

PB4 owns `var()`, `env()`, and typed `attr()` nodes and bounded substitution over
an explicitly already-cascaded provider. Fallbacks are component-value lists,
not strings. It never simulates cascade, inheritance, sheet order, selector
matching, computed style, or global environment. This preserves R2 acceptance
without its current opaque math-head slotting approximation and replaces R12's
raw-keyword fallback with a lossless token value.

### 3.4 Value-definition matcher

Typed declarations require a real CSS value-definition language, not a switch
per property and not regex strings in source. PB2 parses the pinned definition
rows into one bounded matcher IR supporting references, alternatives,
juxtaposition, `&&`, `||`, multipliers, ranges, grouping, and aliases. It:

- rejects nullable cycles and ambiguous/unresolved references at compile time;
- uses deterministic work counters and no unbounded backtracking;
- matches the component-value CST and returns typed overlay nodes;
- keeps generated source facts separate from reviewed semantic support;
- uses one data-driven registry, never generated TypeScript modules per
  property.

This is the longest foundation after tokenization. Any proposal that calls
typed declarations “generic `CssCall` wiring” has not discharged gap 8.

### 3.5 Feature overlays

- **Color:** retain `CssColor` for concrete context-free colors. Add
  `CssColorExpression` with absolute, relative, mix, light-dark, and contrast
  variants. Relative channels and percentages use PB3 numeric nodes;
  substitutions use PB4. Existing `src/color/model.ts` conversions and
  `src/color/operations.ts:83-123` mixing are reused as numeric authorities
  where their contracts match, not reimplemented in grammar. Parsing does not
  claim to resolve `currentColor`, backgrounds, display profiles, or UA choice.
- **Easing/animation/timeline:** keep stable `CssTimingFunction` intact. A
  separate expression union adds experimental `spring()` parameters behind the
  shared maturity flag; no Value-side spring solver. Timeline/trigger syntax is
  versioned to its exact draft pin. Obsolete scroll/view at-rules are not
  presented as current merely because Phase A preserves their frozen shape.
- **Effects/geometry:** one shared basic-shape/position/shadow/URL vocabulary
  feeds filters and motion. Resource filters and layout-dependent geometry are
  typed capability nodes, not fetched or measured.
- **Images/gradients:** one `<image>` union owns URL, image/image-set aliases,
  cross-fade, element/paint/resource nodes, gradients, image-1D/stripes, and
  image-form light-dark. Gradients reuse PB5 colors and PB3 numeric positions;
  no gradient-local color engine.
- **Transforms/motion:** one ordered transform list over PB3 numerics; a shared
  basic-shape/path/reference-box vocabulary for motion. Reuse the mathematical
  primitives proved useful in `src/transform/path.ts`; do not import or revive
  unrelated decomposition as a parser dependency.
- **Selectors:** typed selector CST, forgiving-list rejected branches,
  namespaces, nesting, specificity, and limits. Matching requires an explicit
  adapter and is not a parser close condition.
- **Conditions:** one boolean condition tree serves media, container, and
  supports. Feature/style/general-enclosed leaves remain distinct. `selector()`
  reuses PB7. Evaluation consumes caller-supplied capabilities or refuses;
  absent browser/layout facts never yield invented booleans.
- **Stylesheets:** ordered lossless rules, declarations, layers, nesting,
  current at-rules, unknown at-rules, and recovery nodes. Syntax recovery does
  not imply cascade or CSSOM liveness.

## 4. Public prototype surface

### 4.1 Preserve the Phase-A proof surface

The 19 runtime + 33 type exports remain byte/signature-identical for G-1 and
keyframes seam proof. In particular:

- `parseCssColor` stays context-free and concrete; L4 expressions route to the
  new expression entry.
- `parseTimingFunction` stays the stable four-kind contract; experimental
  `spring()` routes through the typed-value entry.
- `parseStylesheet` remains the frozen fail-fast nine-kind contract. Recovery
  uses a new result and entry; silently changing this function would invalidate
  Phase A and the keyframes dependency confirmed in `./harden.md` §5 (W5/Q8).
- The eight-code `ParseIssue` union remains the legacy diagnostic contract.

These are proof-contract boundaries inside the prototype, not authorization for
production shims. The later megatranche decides the clean-break public surface.

### 4.2 Recommended additive L4 exports

Keep the new API small; grammar modules are not automatically public exports.
The addenda writer should freeze exact type names, but the recommended runtime
doors are:

| export | purpose | owner |
|---|---|---|
| `tokenizeCss` | lossless Syntax-3 token/trivia/recovery partition | PB1 |
| `parseCssComponentValues` | generic lossless component-value document | PB1 |
| `parseCssTypedValue` | property/descriptor/type/definition goal through the one matcher | PB2 + PB12 |
| `parseCssColorExpression` | absolute + relative/mix/light-dark/contrast syntax | PB5 |
| `parseCssSelectorList` | selector CST, forgiving branches, specificity inputs | PB7 |
| `parseCssCondition` | media/container/supports condition goal | PB8 |
| `parseStylesheetL4` | ordered recovered L4 document | PB12 |
| `serializeCss` | exact, edit-preserving, or canonical mode over `CssDocument` | PB1 + feature owners |

Filter, gradient/image, transform/motion, easing, and substitution values are
reached through `parseCssTypedValue` goals; exporting a parser per internal
module would add surface without capability. Direct feature helpers should be
added only when a real consumer seam requires one.

Recommended new types cluster around `CssDocument`, `CssSpan`,
`CssDiagnostic`, `CssParseResult`, `CssLimits`, `CssComponentValue`,
`CssTypedValue`, `CssValueGoal`, `CssNumericValue`, `CssColorExpression`,
`CssSelectorList`, `CssCondition`, and the recovered rule union. PB0 freezes the
exact barrel census before implementation.

### 4.3 Recovery and diagnostics

Do not widen legacy `ParseResult`. The recovered L4 surface needs:

```ts
type CssParseResult<T> =
    | Readonly<{ ok: true; value: T; diagnostics: readonly [] }>
    | Readonly<{
        ok: false;
        partial?: T;
        diagnostics: readonly [CssDiagnostic, ...CssDiagnostic[]];
      }>;
```

Diagnostics carry phase (`preprocess | tokenize | parse | type | recovery |
limit`), severity, code, processed span, original span, expected, and actual.
The closed parse-code taxonomy must cover at least syntax, bad string/URL or
escape, invalid typed value/selector/condition/rule, experimental-disabled, and
resource-limit classes. Contextual evaluation refusals are operation results,
not parse errors. Every public L4 entry has one outer no-throw boundary and one
code mapping; caught implementation exceptions are test failures even though
the caller receives a deterministic diagnostic.

## 5. Zero-drop mapping of the fourteen pulled gaps

| gap | architectural owner | key dependency / ruling |
|---|---|---|
| 1 color L4+ | PB5 | concrete `CssColor` remains; expressions are a new union; reuse the color DAG |
| 2 full easing + `spring()` | PB6 | spring is experimental syntax only; no Value solver |
| 3 filters, URL, shapes, shadow | PB9 | one shared geometry/effect vocabulary; resource/layout capabilities explicit |
| 4 calc/math | PB3 | precedence-preserving numeric tree + bounded typing, not generic calls |
| 5 gradients/image union | PB10 | reuse PB3/PB5; one image union, one gradient engine |
| 6 keyframes/timeline/trigger depth | PB6 + PB12 | value grammars in PB6; ordered/recovered rules in PB12; maturity/version pins |
| 7 media/container/supports | PB8 + PB12 | one condition tree; at-rule integration in PB12 |
| 8 typed declarations/value matcher | PB2 + PB12 | one VDS compiler/matcher; typed overlay never deletes raw value |
| 9 typed selectors | PB7 | syntax/specificity owned; matching only via adapter |
| 10 at-rule model/recovery | PB1 + PB12 | generic block/recovery substrate first; rule union joins later |
| 11 CSS-Syntax-L3 tokenizer | PB1 | sole lexical owner; source map + total interval partition |
| 12 full transform + motion | PB11 | PB3 numeric + PB9 geometry/path; no decomposition dependency |
| 13 unit algebra/context requirements | PB3 | dimension vector + explicit resolution capabilities |
| 14 typed var/env/attr | PB4 | already-cascaded provider only; bounded cycles/fallbacks; no ambient DOM |

## 6. Proposed Phase-B waves

The addenda should not number these as final until harden and owner
ratification. `PB*` is a research label only.

| id | mission and prototype deliverables | deps / close order | grade and born-RED seal | BBNF exchange |
|---|---|---|---|---|
| **PB0** | **STANDARDS + SURFACE LOCK.** Independent pinned inventory; generated facts/reviewed support total join; exact additive export/type ledger; maturity and operation rows; conformance-vector schema. | formation prerequisite; may run beside W0; no feature code | **L, non-feature.** RED while any pinned row lacks one disposition/wave/fixture or BBNF input identity is ambient. After the required E-3 design challenges/ratification, its implemented data/scaffold gets a structural audit. | exchange CSSWG/WPT/object digests, module graph, coordinate contract; do not import RED parsed labels |
| **PB1** | **SYNTAX + LOSSLESS FOUNDATION.** preprocessing, boundary map, CSS tokens, component values, blocks, interval partition, generic recovery, limits, L4 result/diagnostics, exact/edit substrate. | W0; must precede every PB feature; proposed schedule overlay before W1–W5 feature code | **L.** tokenizer/Syntax-3 corpus, Unicode/pathological, at-limit/`+1`, partition and exact/edit tests GREEN; all typed doors remain born RED | exchange token/offset vectors in UTF-8 bytes + UTF-16 boundaries, recovery cases, resource limits |
| **PB2** | **VALUE-DEFINITION MATCHER.** definition CST, bounded matcher IR/compiler, references/combinators/multipliers/ranges, generated facts join, `CssValueGoal`. | PB0+PB1; authors in parallel with PB3/PB7 | **L/XL.** every reviewed definition compiles or has a typed disposition; nullable cycles and work `+1` reject; no property switch | exchange CSS VDS source carriers and normalized definition vectors; independently validate BBNF rows |
| **PB3** | **NUMERIC + UNIT + MATH.** typed dimensions, unit registry, precedence tree, math functions, canonicalization and context requirements. | PB1; closes before PB4/PB5/PB6/PB9/PB10/PB11 | **L.** operator/nesting/dimension matrix, signed zero/non-finite, context propagation, limits and canonical round-trip GREEN | exchange grammar/AST normalization and dimension vectors |
| **PB4** | **SUBSTITUTION.** typed var/env/attr, token fallbacks, already-cascaded provider, bounded dependency graph/cycles/refusals. | PB1+PB2+PB3 | **M/L.** R2/R12 generalized; cycles/fallbacks/typed attr and poisoned-global corpus GREEN | exchange substitution vectors and explicit no-cascade boundary |
| **PB5** | **COLOR EXPRESSIONS.** relative colors, color-mix, light-dark, contrast-color, maturity/profile/context nodes, canonical serializer; extend W2 without changing its concrete door. | accepted W2 + PB3+PB4 | **L, sole seat.** full pinned color inventory + R1/R3/R6/R9 + relative/mix/context matrices GREEN; absolute lowering reuses one numeric color DAG | exchange R6/R9 and new spec corrections, color AST/canonical vectors, context refusals |
| **PB6** | **EASING + ANIMATION/TIMELINE VALUES.** spring syntax flag, keyframe selector depth, animation values, current timelines/ranges/triggers, serializers and version/maturity data. | accepted W3 + PB3+PB4; stylesheet rules wait PB12 | **L.** stable + experimental gates, obsolete/current distinction, limits, canonical round trips and browser capability rows GREEN | exchange easing/timeline grammar vectors; mark draft pins and unsupported browsers explicitly |
| **PB7** | **SELECTORS.** typed CST, forgiving lists, namespaces, nesting, specificity, serializer, adapter interface and work limits. | PB1; authors beside PB2/PB3 | **L, sole seat.** pinned selector/WPT vectors, rejected forgiving branches, specificity and `+1` work GREEN; no ambient DOM | exchange selector production/AST/specificity vectors and WPT route identities |
| **PB8** | **CONDITIONS.** media/container/supports/style/general-enclosed tree, range syntax, selector reuse, capability/refusal model, serializers. | PB2+PB3+PB7 | **M/L.** parse/canonical differentials and absent-capability tests GREEN; no invented viewport/container/support booleans | exchange condition AST, general-enclosed preservation, pure/capability witness rows |
| **PB9** | **EFFECTS + SHARED GEOMETRY.** basic shapes/positions, shadows, filter list, URL/resource filter nodes, serializer and capability map. | PB3+PB4+PB5 | **L.** all filter/shape/shadow functions, resource/layout refusal, ordering, limits and CSSOM witnesses GREEN | exchange effect/shape grammar and resource-boundary vectors |
| **PB10** | **GRADIENTS + IMAGE UNION.** linear/radial/conic/repeating gradients, N stops/hints/positions/interpolation; full pinned image union/aliases/resources. | PB3+PB4+PB5; authors beside PB9 | **L, sole seat.** stop/fix-up syntax, image union, alias spelling, limits, canonical and fixed visual/numeric witness rows GREEN | exchange image/gradient grammar, stop AST and conformance vectors; no pixel oracle laundering |
| **PB11** | **TRANSFORMS + MOTION.** full ordered transforms, typed lowering inputs, basic-shape/path/ray/reference-box motion, serializers/capabilities. | PB3+PB4+PB9 | **L, sole seat.** order/2D↔3D/unit/path grammar, no-decomposition edge, context refusals, limits and browser differentials GREEN | exchange transform/motion AST/canonical vectors and geometry capability rows |
| **PB12** | **TYPED RECOVERED STYLESHEET JOIN.** property/descriptor matching, declarations, layers/nesting, media/container/supports, keyframes/timelines, current and unknown at-rules, recovery nodes, collected views, all serializers. | PB2+PB4–PB11 + accepted W5 | **XL; pre-authorize PB12a syntax/rules and PB12b typed wiring.** All atomic rule/declaration rows, malformed recovery, order/duplicate/trivia preservation, limits and keyframes seam GREEN | exchange rule/recovery vectors and feature-matrix row outcomes; BBNF grammar decisions only after its own acceptance |
| **PB13** | **HARDEN + GRADUATE + PROFILE.** deterministic hostile/mutation corpus per door, no-throw/limits, full inventory census, spec/live/browser rails, exact/edit/canonical properties, kf seam, profile and perfection verdict inputs. | all PB waves; pipeline audits already complete | **L.** zero unowned rows/throws/mirror defects; every divergence classified; corpus digest exchanged; both Phase-A and Phase-B surfaces censused; perf reported without semantic waiver | exchange final accepted vectors, R-ledger, corpus/schema/digests and unresolved differences |

### Sequencing and useful fan-out

The correct critical path is:

```text
W0 -> PB0 ratification -> PB1
PB1 -> {PB2 || PB3 || PB7}
{PB2,PB3} -> PB4
{PB3,PB4,W2/W3} -> {PB5 || PB6}
{PB3,PB4,PB5} -> {PB9 || PB10}
{PB2,PB3,PB7} -> PB8
{PB3,PB4,PB9} -> PB11
all feature owners + W5 -> PB12 -> PB13
```

PB0 can proceed beside W0. PB1 should be an owner-ratified overlay immediately
after W0; otherwise Phase A and Phase B build two lexical foundations. Phase-A
W1–W7 still close their unchanged gates on the refined substrate. PB2/PB3/PB7
may author while Phase-A feature audits pipeline, but PB5/PB6/PB12 close only
after the Phase-A owners they extend are accepted.

The genuine wide fan-out is three seats after PB1 and up to four feature seats
after PB3/PB4. Starting one seat per named gap directly after W1 would create
AST forks and rewrite debt. PB5, PB7, PB10, PB11, and PB12 are L/XL long poles
and should not share author seats.

## 7. Cross-cutting hardening

### 7.1 No-throw and bounded work

Every public legacy and L4 door must be tested with:

- non-string runtime values despite TypeScript signatures;
- empty/truncated input and truncation at every UTF-16 boundary;
- unclosed and adversarially nested functions, blocks, comments, strings, URLs,
  and escapes;
- lone surrogates, astral characters, NUL/CR/FF/CRLF, escaped newlines, long
  identifiers/numbers, and non-ASCII dispatch;
- empty/trailing list items, delimiter mutation, duplicated separators,
  comments at every seam, and R1–R12 mutations;
- exact at-limit and `+1` cases for input, nesting, tokens/nodes, recovery, and
  work.

The property lane is deterministic and seed-bound. Random fuzz may discover
fixtures but never makes a non-reproducible close gate. Every found crash or
hang becomes a minimized permanent vector owned by its feature wave.

### 7.2 Diagnostic fidelity

For the frozen doors, keep H's equality: ok bit, value tree, first code, and
`expected[]` gate; spans record and escalate where meaningful. For L4 doors,
original and processed spans, recovery disposition, code, phase, and resource
counter are gate data. A diagnostic mapping table belongs to PB1/PB0 and every
emission site must be reachable by a fixture. No catch-all exception path may
be the normal implementation of an invalid syntax arm.

### 7.3 Proof rails by applicability

The E-4 order needs a Phase-B applicability matrix:

1. **LIVE differential** — primary for Phase-A overlap and expected-agreement
   rows; R1–R12 and future ratified corrections are asserted divergences.
2. **Pinned spec/conformance** — primary for every new L4 row and arbiter on
   LIVE divergence. Every expected result cites exact source bytes/section and
   maturity.
3. **Browser CSSOM witness** — `CSS.supports`, `selector()`, stylesheet
   insertion/replacement, computed style, Typed OM, or a fixed rendered surface
   only where that API witnesses the claimed operation. Unsupported is evidence,
   not parser rejection and not skip-GREEN.
4. **BBNF cross-check** — only against content-addressed vectors and only after
   the BBNF side labels its semantic row accepted. Current epoch-5 parsed labels
   are not an oracle.

Examples: absolute color/transform/filter/gradient values may use
`CSS.supports` plus fixed `getComputedStyle`; selectors may use
`CSS.supports("selector(...)")` and explicit DOM fixtures for adapter behavior;
conditions use parse/canonical witnesses without inventing container truth;
spring and draft triggers rely on their pinned grammar and flags if the browser
lacks them. Browser serialization differences are recorded separately from
spec validity.

## 8. BBNF / parse-that coordination contract

### 8.1 Authority and transport

The BBNF campaign currently declares Value a no-contact boundary while the
owner has lifted the value-side boundary. Therefore coordination is
**owner/thread-mediated**, not repository polling and not direct mutation. The
owner bridge must acknowledge the active BBNF task's current constraints before
any exchange is called accepted. Neither side edits the other's repository.

Use one content-addressed exchange document per accepted batch, not narrative
chat as authority. A row should contain:

```text
schema/version
source repository + commit + object digest + section/production
feature-matrix key + maturity + operation
raw UTF-8 bytes + UTF-16 source + byte<->UTF-16 boundary vectors
parse goal + expected accept/recover/reject
normalized AST/canonical form or typed diagnostic
R-ledger id, browser witness, and provenance
sender status: proposed | audited | accepted | withdrawn
```

UTF-8-byte versus JavaScript UTF-16 offsets are a first-class join; a shared
string with incomparable offsets is not a shared conformance vector.

### 8.2 Exchange points

1. **PB0:** Value sends its independent feature keys and exact pins; BBNF sends
   byte/object identities and any independently accepted denominator repair.
2. **PB1/PB2:** exchange token/preprocess/offset/recovery and CSS VDS vectors.
3. **Each feature close:** exchange the audited grammar/AST choices and fixture
   additions. R6–R12 ship immediately as candidate cross-engine corrections;
   new R rows require spec citation and E-3 adjudication.
4. **PB13:** exchange only the final accepted corpus/manifest digests,
   unresolved differences, and operation dispositions.

### 8.3 What never crosses

- no parse-that or BBNF source patch, generated runtime, private API, T/U
  novelty, or workspace link;
- no StructuralIndex/SIMD import. Its scalar byte-class ideas may be
  independently reimplemented TS-side only after the grammar-side floor and a
  profile prove need;
- no current dirty BBNF generated/runtime file as an oracle or production
  dependency;
- no claim that matching grammar filenames establishes semantic parity.

## 9. Parsimony / LOC rulings

1. **One scanner.** Feature modules consume PB1 primitives; no module-local
   splitters, tokenizers, or “temporary” regex parser.
2. **One generic CST.** Unknown preservation, recovery, exact/edit support, and
   typed overlays share node IDs/spans rather than cloning source trees.
3. **One numeric spine, one value matcher, one color engine, one geometry
   vocabulary, one condition tree.** These are the principal anti-duplication
   boundaries.
4. **Tables over ladders.** Closed function/unit/at-rule registries are small
   data tables; `dispatch()` or name-keyed records land only where a measured or
   obvious wide ladder exists. No generated file per CSS property.
5. **Exports follow consumer capability, not module count.** Internal parser
   modules remain internal unless an actual public operation needs a direct
   door.
6. **No premature optimizer.** O-1/O-2/O-3 are foundations; O-4 is local and
   profile-confirmed; memoization and byte-class reimplementation require
   measured backtracking/hot leaves. G-2 is never relaxed for throughput.
7. **No evaluator disguised as parser.** Typed context requirements and
   refusal/delegation are less code and more truthful than mock DOM/layout
   machinery.

## 10. Scope contradictions and proposed resolutions

| contradiction | evidence | proposed resolution requiring owner/addenda action |
|---|---|---|
| “14 gaps = full CSS L4” | `coverage.md §Surface 3` is a feature registry, while the BBNF pinned corpus exposes a much larger standards/obligation union | PB0 total atomic inventory; fourteen rows become routing families, not close denominator |
| “largely independent over `CssCall`/`numUnit`” | current `src/value.ts:3-23` loses math precedence, typed substitution, selectors, conditions and recovery | PB1/PB2/PB3 foundations first; `CssCall` survives only Phase A/fallback preservation |
| Phase A “unchanged/appended” versus tokenizer “may re-anchor lexeme” | `ADDENDA-01.md §1` and its tokenizer row | owner-ratified schedule overlay: PB1 after W0, rerun all Phase-A structural/feature gates; semantics and 52 signatures unchanged |
| Phase-A fail-fast versus Phase-B recovery | `./research-architecture.md §0`; gap 10 | preserve `parseStylesheet`; add `parseStylesheetL4` + `CssParseResult.partial` |
| frozen AST/export totality versus new typed features | `PI.md §2b`, `src/css/types.ts` | maintain 52 proof surface and freeze a separate additive L4 ledger at PB0; later clean-break production surface is megatranche-owned |
| LIVE is “primary oracle” for new features it lacks | `HANDOFF.md` E-4 versus `coverage.md §Surface 3` | applicability matrix: LIVE primary on overlap, pinned spec primary on growth, browser/accepted BBNF as witnesses |
| “CSS L4” includes experimental/draft/non-L4 rows | `ADDENDA-01.md` spring/contrast/triggers; `P-V.md` V14/V20/V25/V28 maturity rulings | name scope “July-2026 pinned CSS parser universe”; require maturity + operation dispositions; no default stable laundering |
| Phase A accepts obsolete scroll/view at-rules while the newer registry tombstones them | frozen `StylesheetItem` at `src/css/types.ts:124-125`; `P-V.md` V27 | legacy door preserves Phase-A contract; L4 door follows pinned current syntax and marks obsolete syntax invalid/preserved per reviewed row |
| owner-lifted coordination versus BBNF campaign no-contact | value draft letter versus current BBNF `CAMPAIGN-STATE.md` | owner/thread bridge only; no autonomous polling or writes; explicit acknowledgement before semantic exchange |
| handoff says both “nothing running” and “W0 is running now” | `HANDOFF.md` §0/§3; `pi/mirror/` was absent when inspected | treat workflow/live task ledger as state authority; correct handoff status in the addenda, never infer acceptance from prose |
| BBNF is described as building usable CSS verticals | current epoch-5 adjudication grants zero semantic/candidate credit | exchange pins and candidate vectors only; no BBNF semantic import until its own hostile acceptance |

## 11. Questions for the harden and addenda seats

1. Ratify or reject the PB1-after-W0 schedule overlay. Rejecting it must price
   the duplicate-lexing/rewrite cost explicitly.
2. Freeze the exact PB0 standards denominator and decide whether Value waits for
   a corrected BBNF source census or independently seals the same CSSWG/WPT
   bytes now. It must not consume the RED parsed denominator.
3. Freeze the additive export/type ledger. In particular, decide whether
   `tokenizeCss` is public or proof-only and whether the later megatranche
   replaces or retains the frozen Phase-A doors.
4. Ratify `CssParseResult.partial` and the Phase-B diagnostic taxonomy; define
   recovery success/error semantics mechanically.
5. Set concrete `CssLimits` per entry and the deterministic work accounting
   method before grammar implementation.
6. Freeze maturity flags and exact draft/spec pins for spring, relative/color
   functions beyond Color 4, contrast-color, image variants, and animation
   triggers.
7. Decide PB12a/PB12b boundaries before dispatch; do not let the stylesheet
   join become a god seat.
8. Obtain the active BBNF task's explicit acknowledgement of the owner-mediated
   exchange schema/cadence and record its current accepted-vs-RED boundaries.

## 12. Formation recommendation

Proceed to harden on this architecture, not directly to addenda writing. The
harden seat should attack five load-bearing claims: PB0 denominator totality,
PB1 single-scanner feasibility on parse-that 1.0.0, the CST/overlay allocation
cost, value-definition matcher termination, and PB12 join size. If those hold,
the addenda writer can freeze PB0–PB13, the exact additive barrel, owner-ratified
schedule overlay, BBNF exchange schema, and close gates. If any fails, amend the
owning wave before Phase-B code, per E-3.

— V·π Phase-B independent design-research seat, 2026-07-21.
