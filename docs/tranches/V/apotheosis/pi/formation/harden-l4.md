# V·π PHASE-B HARDEN — adversarial disposition of the L4 architecture

2026-07-21 · target: `research-l4-architecture.md` · authorities:
`../HANDOFF.md`, `../PI.md`, `../ADDENDA-01.md`, `../CHARTER.md`,
`research-architecture.md`, and `harden.md`.

This is the independent hardening seat. It assumes the Phase-B research is
faulty. It changes neither that report nor any parser, BBNF, parse-that,
keyframes, production, inbox, or addenda artifact.

## 0. Verdict

**Architecture direction ACCEPTABLE ONLY WITH MANDATORY AMENDMENTS; the wave
proposal as written is NOT ready to become `ADDENDA-02`.**

The research correctly rejects “fourteen generic `CssCall` modules” and finds
the necessary spine: one lossless CSS Syntax owner, a component-value CST,
typed overlays, one numeric algebra, one bounded value-definition matcher, and
explicit contextual refusals. It also correctly preserves the Phase-A contract
and refuses current BBNF epoch-5 semantic credit.

Seven load-bearing defects prevent direct adoption:

1. PB0's proposed key is not occurrence-atomic and its scope mixes differently
   governed standards sets; it cannot yet prove a full denominator.
2. PB1 does not say how lossless trivia/recovery coexists with W0's destructive
   `skipBlockComments`, nor how recovery avoids parse-that 1.0.0's global
   diagnostic collector.
3. PB2 promises total definition compilation before the feature terminals it
   references exist, creating a closure cycle.
4. Adding the L4 exports to the legacy barrel would invalidate the exact
   52-export Phase-A parity gate.
5. The typed-overlay and edit-preserving contracts are incomplete: a singular
   `typed?` field is not a reusable overlay, and no edit operation exists.
6. PB9 and PB12 are god-wave risks, while PB13 combines semantic graduation
   and profiling that Phase A deliberately separated.
7. The BBNF contract overstates what may be reused from epoch 5: the named
   CSSWG commit edge and unresolved WPT occurrence ledger are not accepted
   facts.

The later addenda writer may adopt the corrected lattice in §4. It must not
describe PB0–PB13 as ratified, “full,” or code-ready until the two decision
gates in §3 are owner-ratified.

## 1. Adversarial findings

### HL4-1 — CONFIRMED: fourteen gaps are routing families, not the denominator

`coverage.md` Surface 3 enumerates fourteen feature gaps against fifteen thin
prototype modules. It does not census every grammar-bearing occurrence in a
pinned standards universe. The research is correct to reject a fourteen-row
close.

Its replacement is still under-specified. The proposed key
`(kind,name,for,source,base-or-extension,maturity,operation)` can collide when a
source repeats the same named carrier, an extension amends more than one base
occurrence, or prose/algorithm obligations have no unique `name`. It also does
not distinguish source identity from a mutable section label.

**Mandatory correction:** PB0 rows are source-occurrence rows. Their stable
identity includes exact source-object digest, carrier kind, byte span (or an
equally exact source-fragment identity), occurrence ordinal, and operation.
`kind/name/for/base-or-extension/maturity` are attributes, not sufficient
identity. PB0 proves a bijection between independently pinned source
occurrences and rows; missing, duplicate, overlapping, ambiguous, or orphan
rows are RED. Every row then has exactly one family, owner wave, support
disposition, fixture set, and terminal operation vector.

The fourteen named gaps remain the routing summary required by
`ADDENDA-01.md`; they are not discarded or relabelled as the census.

### HL4-2 — CONFIRMED: “CSS L4” needs one exact scope, not a blended universe

The evidence contains at least three non-equivalent sets: the old fifteen-module
topology, the earlier BBNF 84-spec union, and epoch 5's 96 selected source
objects. Epoch 5 is RED on source-native denominator totality and semantic
consumption. A phrase such as “July-2026 pinned CSS parser universe” is a useful
candidate name, but it is a scope change from the literal fourteen-gap order
and cannot be silently ratified by research.

**Mandatory correction:** `ADDENDA-02` authorizes PB0 only and names the scope
rule, including foundations, inherited earlier levels, extensions, drafts,
obsolete rows, and exclusions. PB0 materializes one source lock from that rule.
The owner then ratifies the sealed PB0 scope/cost/surface before PB1 or any L4
feature code. Stable/experimental/at-risk/obsolete is an independent field;
preserve/refuse is not semantic implementation credit.

### HL4-3 — CONFIRMED: PB0 is semantic governance, not a scaffold exemption

PB0 assigns standards membership, maturity, support, operations, ownership,
fixtures, and public surface. Those are semantic decisions. Calling the whole
wave “non-feature” and giving it one structural check misapplies E-1's W0
exception.

**Mandatory correction:** the mechanical source-lock generator/schema gets one
structural check; the resulting scope, occurrence join, support matrix, and
surface ledger get two independent adversarial passes before owner
ratification. This is substantive denominator review, not ceremony.

### HL4-4 — CONFIRMED with a feasibility retraction: PB1 can use parse-that
1.0.0, but not W0's leaf contract unchanged

The strong concern that a token buffer or second parser is required is
**RETRACTED**. Published parse-that exposes `Parser`, mutable string offset
state, and custom leaves; PB1 can consume the processed JavaScript string
directly and return spanned tokens/component values without an engine edit or
`TokenCursor`.

The research nevertheless leaves two confirmed implementation conflicts:

- W0 `lexeme()` calls `skipBlockComments`, which advances past whitespace and
  comments without returning their ranges. That cannot prove a total
  token/trivia/recovery partition.
- parse-that 1.0.0 `Parser.recover()` writes to a module-global collected
  diagnostic list. It is unsuitable as the public L4 recovery authority for
  nested/reentrant parses and cannot carry the L4 taxonomy or original spans.

**Mandatory correction:** PB1 replaces, rather than wraps, the W0 trivia leaf.
One PB1 token leaf owns preprocessing-aware token recognition and returns the
significant token plus leading/trailing trivia intervals. All feature grammars
consume that owner on the same string state; no feature-local raw rescan,
splitter, or tokenizer exists. Recovery diagnostics and work counters are
parse-local values owned by PB1; engine-global diagnostic collection is not
used. The CSS value-definition *meta-language* compiler is the sole explicit
exception: it parses pinned definition strings, not CSS source, and remains a
private PB2 build/runtime-initialization concern.

PB1 is a feature wave (public tokenizer/component-value behavior), so it gets
two E-1 passes. After it lands, W0's lexeme/scanner/freeze/parity gates and every
then-unimplemented Phase-A born-RED door rerun on the re-anchored substrate.

### HL4-5 — CONFIRMED: PB2 has a terminal-registry closure cycle

Definitions refer to `<color>`, `<image>`, transforms, effects, easing, and
other terminals owned by PB5–PB11. PB2 cannot both close before those waves and
prove that every reviewed definition compiles with all references resolved.
PB4 also depends on PB2, so making total reference closure an early PB2 gate
creates a cycle.

**Mandatory correction:** PB2 is the **matcher kernel**, not total registry
closure. It closes the value-definition meta-grammar, IR, terminal-registry
interface, nullable-cycle rejection, deterministic work accounting, and
synthetic/foundation conformance. Each feature wave owns its terminal adapters
and definition rows. PB12b closes the total registry and the public
`parseCssTypedValue` door after all terminal owners exist. Unresolved or
multiply-owned references are RED at PB12b, not silently preserved.

### HL4-6 — CONFIRMED: additive exports require a distinct L4 barrel

Phase A's gate compares the legacy barrel to exactly 19 runtime plus 33 type
exports. “Additive” names in that same barrel make exact parity fail even if all
legacy signatures remain unchanged.

**Mandatory correction:** keep `pi/mirror/index.ts` at exactly 52 direct
exports. Put Phase B behind a distinct prototype barrel such as
`pi/mirror/l4/index.ts` (and a package subpath only inside the self-contained
prototype). Its direct export census and its transitively exposed type closure
are separately frozen by PB0. No grammar module is public merely because it
exists.

The eight proposed runtime doors are accepted as the maximum initial surface:
`tokenizeCss`, `parseCssComponentValues`, `parseCssTypedValue`,
`parseCssColorExpression`, `parseCssSelectorList`, `parseCssCondition`,
`parseStylesheetL4`, and `serializeCss`. PB0 may make `tokenizeCss` proof-only
only by an explicit owner ruling; otherwise gap 11 has a direct public door.
Any ninth runtime door requires a later E-3 addenda.

### HL4-7 — CONFIRMED: result and overlay contracts need mechanical semantics

A declaration's singular `typed?: CssTypedValue` contradicts the claimed
reusable overlay. The same component-value node can be interpreted under
different goals, and registered custom-property typing can be known only after
sheet context. Embedding a copied typed tree in every CST node also defeats the
allocation rationale.

**Mandatory correction:** the lossless CST is goal-neutral. Typed parses return
a dense overlay table keyed by stable node ID plus a typed root/reference; they
do not mutate or clone CST nodes. Multiple goals are separate typed results.
PB1 proves node IDs/spans stable across exact serialization; PB2/PB12b prove
overlay references are in range and acyclic where required.

`CssParseResult` also needs one rule for recovery. Adopt:

```ts
type CssParseResult<T> =
    | Readonly<{ ok: true; value: T; diagnostics: readonly CssDiagnostic[] }>
    | Readonly<{
          ok: false;
          partial?: T;
          diagnostics: readonly [CssDiagnostic, ...CssDiagnostic[]];
      }>;
```

`ok:true` means the requested root was produced within limits; recoverable
diagnostics may accompany it. `ok:false` means no usable requested root was
produced; `partial` is recovery evidence, not success. Severity and recovery
action are diagnostic fields. Contextual evaluation refusals remain operation
results, never parse diagnostics.

### HL4-8 — CONFIRMED: edit-preserving serialization has no edit contract

`serializeCss(document, mode)` cannot prove edit preservation when every shown
node is readonly and no edit operation, conflict rule, or changed-node carrier
exists.

**Mandatory correction:** PB1 defines the minimal public edit carrier consumed
by `serializeCss`: stable node/span target, typed replacement, non-overlap,
original-document identity, and conflict refusal. Exact mode requires zero
edits and reproduces the original UTF-16 string; edit mode rewrites only
accepted ranges and proves every untouched range byte-for-byte/string-unit
identical; canonical mode is available only for matrix rows with a canonical
operation disposition. There is no generic “canonical CSS” promise.

### HL4-9 — CONFIRMED: numeric and path reuse boundaries need sharpening

W1 `numUnit` converts immediately to `number`; it cannot be the authoritative
Phase-B numeric representation because lexical form, very large magnitudes,
and exact source spans matter. PB3 may reuse it only as a Phase-A fast leaf;
PB3 derives semantic numeric nodes from PB1 spans and applies the pinned calc
type/percentage-hint algebra.

`src/transform/path.ts` contains useful geometry math but also a permissive
regex tokenizer which skips stray input and is explicitly born-RED in the
megatranche inventory. PB9/PB11 may reuse independently verified pure math
primitives, never that tokenizer or its acceptance behavior. SVG path/basic
shape syntax has one bounded owner.

### HL4-10 — CONFIRMED: PB9 and PB12 need anti-god boundaries

PB9 currently combines basic shapes, positions, SVG path syntax, shadows,
filters, URLs, and capability mapping. PB12 combines all rules, all typed
declarations, recovery, collectors, and all serializers. “PB12a/PB12b may
split” is not strong enough for two known long poles.

**Mandatory correction:** pre-authorize and require:

- **PB9a GEOMETRY/PATH** — positions, reference boxes, basic shapes, bounded
  path syntax, and shared serializers only.
- **PB9b EFFECTS** — filter/shadow/resource nodes over PB9a/PB3/PB5.
- **PB12a RECOVERED RULES** — thin ordered stylesheet/rule registry, recovery,
  unknown preservation, and rule serializers. Feature owners provide their own
  rule adapters; PB12a contains no cross-feature grammar switch beyond a data
  registry.
- **PB12b TYPED REGISTRY** — total VDS terminal/definition join, typed
  declarations/descriptors, `parseCssTypedValue`, and collected views.

Each is independently feature-audited. A split is not permission to duplicate
the scanner, matcher, numeric, color, geometry, or condition engines.

### HL4-11 — CONFIRMED: no-throw and diagnostic gates must detect swallowed bugs

The outer catch is necessary for the public no-throw contract but insufficient
as proof. It can convert every implementation defect into apparent robustness.

**Mandatory correction:** PB0 freezes one closed L4 diagnostic-code table,
including invalid runtime input, syntax/token classes, typed/selector/condition/
rule invalidity, experimental-disabled, resource-limit, and internal-error.
Every code and every recovery action has a direct fixture. Invalid syntax must
not normally reach `internal_error`; any `internal_error` observed by the
conformance/hostile corpus is wave RED even though the API did not throw.
Legacy entries preserve the eight-code contract and H's exact code/expected
rules.

Every public door gets non-string runtime values, every-prefix truncation,
Unicode preprocessing, delimiter/comment/string/URL mutation, R1–R12 mutations,
and exact at-limit/`+1` vectors. Limits and work-counter increments are frozen
in PB0 from explicit evidence before PB1; recursive depth, regex backtracking,
and recovery loops may not escape the counter. Random discovery is permitted;
only minimized deterministic vectors enter a close gate.

### HL4-12 — CONFIRMED with retractions: the oracle applicability matrix is
sound, but the close language is not yet executable

The concerns that LIVE must remain primary for new features, that browser
majority decides validity, or that current BBNF labels can vote on semantics are
**RETRACTED**. The research correctly limits LIVE to overlap, makes pinned spec
evidence primary for growth, and treats browser/accepted BBNF results as
witnesses.

**Mandatory correction:** each PB0 row names the applicable rails and an exact
expected observation. A spec citation by itself is not an executable expected
AST; reviewed vectors must bind input, goal, accept/recover/reject, normalized
typed result or diagnostic, and serializer disposition. WPT routing is evidence
only after the exact test assertion and prerequisites are understood. Browser
unsupported is recorded, never skip-GREEN. “Zero mirror defect” applies only
to LIVE-overlap rows; Phase-B close is zero unclassified divergence and zero
failed ratified vectors.

### HL4-13 — CONFIRMED: PB13 combines independent proof rails

Hardening, semantic graduation/census, and performance profiling have different
failure meanings. Combining them makes a performance issue look like a semantic
block or invites semantic waivers. Phase A already separates W6 and W7.

**Mandatory correction:** split PB13 into **PB13G** (inventory, conformance,
no-throw, limits, exact/edit/canonical properties, legacy/kf seams) and
**PB13P** (profiles, allocation/work slopes, legacy performance regression,
new-door measurements). They may run in parallel after PB12a/PB12b. The Phase-A
P-3 thresholds govern only the frozen comparable scenarios; new L4 doors need
reported pinned scenarios and bounds, not a fabricated LIVE-relative bar. The
perfection verdict waits for both and never relaxes semantics for throughput.

### HL4-14 — CONFIRMED: the BBNF exchange boundary needs one more lock

Epoch-5 adjudication grants narrow exact byte/tree/object facts but explicitly
does not prove the named CSSWG commit-to-tree edge, source-native denominator,
consuming CSS VDS semantics, WPT test membership/outcomes, or per-occurrence
unresolved WPT provenance. The research is right to refuse parsed labels but is
wrong to call the named commit and unresolved-obligation ledger reusable pins
without qualification.

**Mandatory correction:** Value independently verifies every source object and
any named commit edge it claims. Until then, the exchange may cite object bytes
and digest only, with the commit as an unproved label. Epoch-5 denominator and
unresolved WPT rows may be adversarial leads, never imported matrix rows.

The BBNF campaign's no-contact rule remains binding on its side. Value-side
authorization does not lift it. Exchange begins only after the owner-mediated
active BBNF task explicitly acknowledges the schema, cadence, and accepted/RED
boundary. No autonomous repository polling or cross-repository write is part of
coordination.

## 2. Confirmed research rulings retained unchanged

The addenda writer should retain these decisions:

- Frozen Phase-A signatures/types and fail-fast `parseStylesheet` stay intact;
  recovery uses a new L4 entry and result.
- One lossless CST plus typed overlays is preferable to forcing L4 into
  `CssScalar | CssCall | CssList` or the nine-kind legacy sheet union.
- Context-dependent parse results expose capability requirements/refusals; π
  does not simulate cascade, inheritance, DOM matching, layout, fetch, display,
  playback, or live CSSOM.
- Stable and experimental syntax are separately pinned. `spring()` remains
  syntax/delegation only; obsolete timeline at-rules remain legacy-only.
- One numeric spine, one matcher, one color engine, one geometry vocabulary,
  and one condition tree are correct anti-duplication boundaries.
- No parse-that/BBNF source, private novelty, StructuralIndex, SIMD path, or
  generated runtime crosses into the prototype. Published parse-that 1.0.0 is
  the only engine dependency.

## 3. Two required owner decision gates

1. **Formation ratification:** owner ratifies `ADDENDA-02`'s scope rule,
   corrected lattice, maximum eight-door L4 runtime surface, grades/cost, and
   permission to implement PB0 only.
2. **PB0 lock ratification:** after PB0's structural check and two semantic
   audits, owner ratifies the exact source lock, occurrence denominator,
   maturity/operation matrix, additive direct+reachable type census, limits,
   diagnostics, and cost re-estimate. Only then may PB1 or feature prototypes
   begin.

This resolves the circular demand to freeze an exact denominator/surface before
PB0 has built it without allowing feature code to start on an unfrozen scope.

## 4. Accepted dependency lattice and concurrency

Research labels remain provisional; `a/b/G/P` are required splits, not new
scope.

```text
W0 -------------------------------> Phase-A W1..W7 (unchanged gates)
 |                                      ^
 +-> PB0 -> owner lock -> PB1 ----------+  (all W0 gates rerun after PB1)
                         |
                         +-> { PB2-kernel || PB3 || PB7 }
                                  |          |       |
                         {PB2,PB3}->PB4      +-------+-> PB8
                                           
 {PB3,PB4,accepted W2}->PB5
 {PB3,PB4,accepted W3}->PB6
 {PB3,PB4,PB5}->PB9a->{ PB9b || PB11 }
 {PB3,PB4,PB5}->PB10

 {PB2,PB4,PB5,PB6,PB7,PB8,PB9b,PB10,PB11,accepted W5}
                         -> { PB12a || PB12b }
                         -> { PB13G || PB13P }
                         -> perfection verdict
```

PB11 depends on PB9a's shared geometry/path vocabulary, not PB9b effects.
PB12a and PB12b may author in parallel but close only when all feature terminal
and rule adapters they census are accepted. PB12b, not PB2, closes every VDS
reference and the public typed-value door.

Authoring ceiling is four seats. Foundation close ceiling is three
(`PB2/PB3/PB7`). Feature authors may fan to four only after their named
dependencies are accepted. PB5, PB7, PB10, PB11, PB12a, and PB12b each hold a
sole long-pole seat. Each feature's two audits pipeline immediately after its
author closes; audit availability never licenses dependency-early closure.

## 5. Born-RED and close-gate amendments

| wave | mandatory born-RED/close amendment |
|---|---|
| PB0 | RED until one exact source lock and occurrence-bijection census exist; every row has one family/owner/fixture/operation vector; generated facts and reviewed support are disjoint; direct and reachable L4 type surfaces, diagnostics, limits, browser pins, and exchange schema are exact. Mechanical scaffold 1× checked; semantic matrix 2× audited; owner lock required. |
| PB1 | RED on preprocessing boundary vectors, bad string/URL/escape, total interval partition, component blocks, recovery, exact/edit serialization, stable IDs, non-string input, and every limit `+1`. `tokenizeCss` and component parsing must report identical token/trivia boundaries. No `skipBlockComments`, engine-global recovery collector, second token cursor, or feature rescan. Rerun W0 and Phase-A born-RED gates. |
| PB2 | Kernel only: RED until the complete pinned VDS meta-grammar subset, IR, registry interface, nullable-cycle rejection, ambiguity policy, and deterministic work limits pass. Total feature-reference closure is explicitly still RED for PB12b. |
| PB3 | RED until source-preserving numerics, precedence/grouping, calc type/percentage hints, all inventoried units/functions, signed zero/non-finite policy, context requirements, canonical dispositions, and limits pass. W1 `Number` values are not the semantic oracle. |
| PB4 | RED until var/env/typed-attr token fallbacks, already-cascaded provider, cycles, missing/invalid fallbacks, registered-property goals, poisoned globals, work limits, and R2/R12 legacy seams pass. |
| PB5 | RED until every PB0-owned color syntax row, including contextual/profile/maturity rows, has a typed or preserved/refused result; R1/R3/R6/R9 and color DAG reuse pass; legacy concrete color door remains unchanged. |
| PB6 | RED until every animation/easing/timeline/trigger row has an exact pin and maturity, stable/experimental gates pass, obsolete/current syntax is distinguished, serializers/limits pass, and no Value spring/runtime solver appears. |
| PB7 | RED until selector rows, forgiving rejected branches, namespaces/nesting/specificity, adapter boundary, serializer/edit behavior, non-ASCII and work `+1` pass; no ambient DOM. |
| PB8 | RED until one condition tree covers media/container/supports/style/general-enclosed rows, `selector()` reuses PB7, absent capabilities refuse/delegate, browser unsupported cannot skip, and serializers/limits pass. |
| PB9a/b | PB9a RED until shared geometry/basic-shape/path syntax and limits pass without the live permissive path tokenizer. PB9b RED until all effect/filter/shadow/resource rows, ordering, color/numeric identity, capabilities, serializers, and limits pass. |
| PB10 | RED until every image/gradient row, alias spelling, N-stop/hint/fix-up/interpolation structure, resource refusal, canonical disposition, deterministic visual/numeric witnesses, and limits pass. No pixel witness decides grammar validity. |
| PB11 | RED until ordered transforms and motion rows, 2D/3D/unit/path/reference-box behavior, context refusals, serializers, limits, shared PB9a path identity, and no-decomposition/no-second-matrix edges pass. |
| PB12a | RED until all PB0 rule rows join once, malformed sheets recover deterministically, unknowns/duplicates/order/trivia survive, exact/edit modes pass, and the registry remains thin. Legacy W5 fail-fast behavior and kf seam stay GREEN. |
| PB12b | RED until every reviewed definition/terminal reference resolves exactly once, typed declaration/descriptor overlays retain raw CST, the typed-value public door passes every goal, collectors are stable, and no property switch or generated TS-per-property exists. |
| PB13G | RED until both legacy and L4 direct/reachable export censuses are exact, denominator ownership is total, every applicable oracle/vector passes, no throw/hang/internal-error remains, every diagnostic path is reached, deterministic hostile mutations pass, exact/edit/canonical properties hold by disposition, and legacy/kf seams remain GREEN. |
| PB13P | RED until pinned legacy comparisons, new-door throughput/allocation/work slopes, scenario digests, raw profiles, and limit costs are reported. It cannot waive PB13G. |

Every feature wave receives the two independent three-altitude E-1 audits. A
confirmed defect repairs and reruns both passes; a scope discovery returns to
E-3 rather than being appended to PB13.

## 6. Accepted BBNF exchange schema

Each owner-mediated batch is content-addressed and contains:

```text
schema/version + batch digest
sender epoch/status + receiver acknowledgement/status
source object digest + exact fragment/span + commit-edge status
feature occurrence id + family + maturity + operation
raw UTF-8 bytes + decoded UTF-16 + byte<->UTF-16 boundary vectors
parse goal + accept/recover/reject expectation
normalized AST/canonical form or typed diagnostic/recovery action
R-ledger id + exact spec evidence + browser witness applicability
vector status: proposed | audited | accepted | withdrawn
```

An item is shared authority only when both sides record `accepted` against the
same batch digest. R6–R12 cross first as candidate corrections with their exact
evidence; they do not become BBNF truth by receipt. Current epoch-5 parsed
labels, denominator rows, unresolved WPT aggregate, generated runtime, and
candidate/product claims never cross as accepted semantics.

## 7. Parsimony ruling

The corrected plan is large because the denominator is large, not because it
licenses framework growth. Reviews enforce these concrete KISS boundaries:

- one CSS-source scanner and parse-local recovery authority;
- one small, private VDS meta-language compiler;
- one lossless CST with dense node IDs and overlay tables, not cloned trees;
- feature-owned terminal/rule adapters and thin data registries at PB12;
- no generated TypeScript module per property, function, or rule;
- no public export per internal grammar module;
- no evaluator, DOM, fetch, layout, or CSSOM simulation disguised as parsing;
- no module-local splitters, duplicate numeric/color/path engines, or
  profile-free optimizer.

Each E-1 feature analysis reports authored source LOC, generated-data LOC
separately, duplicated scanner/matcher/registry logic, and the smallest deletion
or consolidation found. PB9/PB12 splits are anti-god boundaries, not permission
for sand-like one-production files.

## 8. Final disposition for the addenda writer

**CONDITIONAL ACCEPT.** Transpose the research architecture only with HL4-1
through HL4-14 and the lattice/gates above. The addenda must explicitly mark:

- PB0 as the only initially authorized Phase-B work after formation
  ratification;
- PB1 as the owner-ratified tokenizer overlay before Phase-A feature code;
- the legacy 52-export barrel and separate L4 barrel;
- PB2 kernel versus PB12b total registry closure;
- mandatory PB9a/PB9b, PB12a/PB12b, and PB13G/PB13P splits;
- per-row oracle applicability and deterministic hardening;
- BBNF coordination as owner-mediated and acknowledgement-gated.

Without those corrections the verdict is RED: PB0–PB13 would relabel a broad
standards ambition without a proved denominator, create a matcher cycle, and
risk breaking the already-ratified Phase-A contract. With them, the design is
fit to be written into `ADDENDA-02` and then challenged twice before owner
ratification. It does not authorize prototyping or production execution.

— V·π Phase-B independent hardening seat, 2026-07-21.
