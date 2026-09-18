# V·π ADDENDA-02 — Phase-B CSS L4 formation sheet (2026-07-21)

> **PROPOSED · NOT RATIFIED · NO PHASE-B FEATURE CODE AUTHORIZED.** This is
> the wave-writing seat of the Phase-B formation triumvirate. It transposes
> `formation/research-l4-architecture.md` only as corrected by
> `formation/harden-l4.md`. It is a prototype/refinement plan for
> `pi/mirror/`, never production execution.
>
> **Gate 1 — formation ratification authorizes PB0 only.** Gate 1 may be put
> to the owner only after two independent adversarial challenges of this
> addenda are GREEN, root has completed the E-3 gestalt adjudication, and the
> separately challenged root seed manifest has an exact non-placeholder digest.
> That seed condition is currently RED. Gate 1 does not authorize PB1 or any L4
> feature prototype.
>
> **Gate 2 — PB0-lock and derived-wave ratification authorizes PB1+.** It
> occurs only after PB0's mechanical structural check and two independent
> semantic audits, followed by an occurrence-derived wave/cost addendum that
> itself receives two independent challenges and root gestalt adjudication.
> Until the owner ratifies that exact lock and revised topology, every PB1–PB13
> wave is only a provisional skeleton and remains queued and RED.

Authority chain: `HANDOFF.md` E-1–E-5 → `CHARTER.md` → ratified Phase-A
`PI.md` → owner scope order `ADDENDA-01.md` → Phase-B research → Phase-B
harden. On any conflict, the hardened rulings HL4-1–HL4-14 govern this sheet.

## 0. Formation verdict

Phase B is feasible over published `@mkbabb/parse-that@1.0.0`, but the fourteen
growth gaps are routing families, not a proof denominator, and they are not a
set of independent generic-`CssCall` modules. The KISS architecture is:

1. one preprocessing-aware, lossless CSS Syntax-3 string-state scanner;
2. one goal-neutral component-value/rule CST with stable dense node IDs;
3. one dense typed-overlay table, one numeric/unit/math spine, one bounded
   value-definition matcher, one color engine, one geometry/path vocabulary,
   and one condition tree;
4. exact, edit-preserving, and disposition-limited canonical serialization;
5. explicit capability requirements/refusals for contextual operations.

The frozen Phase-A contract remains exact. Phase B adds a separately censused
prototype surface. It does not simulate cascade, inheritance, DOM selector
matching, layout, viewport/container measurement, URL fetch, display profiles,
worklets, CSSOM identity, animation playback, or rendering. Those operations
are represented as typed requirements, delegations, or refusals.

## 1. Scope rule and the PB0 source lock

### 1.1 Deterministic scope-selection algorithm proposed for Gate 1

PB0 does not select modules ad hoc. Gate 1 freezes the following deterministic
algorithm; PB0 executes it, materializes the bytes, and records the digests:

1. **Seed.** Begin from a content-addressed root manifest whose rows name an
   exact module, version/date or commit-edge status, source-object digest, and
   which of the fourteen `PI.md §2e` families requires it. An equivalent
   content-addressed root query is allowed only if its query text, resolver
   version, output ordering, and result digest are themselves frozen. The
   Gate-1 packet must contain this explicit seed manifest/query; ambient CSSWG,
   BBNF, browser, or workspace state is never a seed.
2. **Normative closure.** Recursively follow every normative grammar-bearing
   reference that affects preprocessing, tokenization, parsing, recovery,
   typing, serialization, diagnostics, or a contextual parser disposition.
   Add the exact referenced source object and carrier; repeat in canonical
   `(object digest, carrier start, carrier ordinal)` order to a fixed point.
3. **Level resolution.** For two levels of one module, the newer pinned level
   supersedes an earlier carrier only when the newer source explicitly replaces
   or obsoletes it. Retain an earlier carrier when the newer level normatively
   imports it or leaves it operative. Amendments/extensions join the base at
   their exact carriers; they do not replace an entire module by filename.
4. **Maturity predicates.** Stable/current rows enter by normative closure.
   Draft, experimental, or at-risk rows enter only when named by the seed or
   reached by a normative dependency and retain that maturity. Obsolete rows
   enter only when needed to preserve the frozen Phase-A contract or explicitly
   seeded as a preserve/refuse compatibility row; they receive no current
   implementation credit.
5. **Exclusions.** Exclude non-parser operations in §0, informative examples,
   issue notes, vendor/browser-private syntax, and test prose unless a seeded
   normative carrier incorporates them. Record every exclusion with exact
   source identity and predicate rather than silently dropping it.
6. **Tie-break and output.** Resolve duplicate references by exact object digest
   and carrier identity; when two sources conflict without an explicit
   supersession edge, retain both as an ambiguity RED for owner adjudication.
   Sort the resulting lock canonically by digest, span, ordinal, and operation;
   serialize it deterministically and record its digest.

The required seed artifact is
`formation/l4-root-seed-manifest.json`, pinned here as SHA-256
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.
It independently verifies CSSWG commit
`c7573530343759ace8e46438a1fa2c44515b5554` and tree
`75bf19c016ed98126381508073de6893c9f756f5`, then pins 76 raw-source roots:
the 64 modules in the four frozen CSS Snapshot 2026 stability bands, eleven
distinct owner-requested later/experimental extensions, and the snapshot
source itself as scope evidence. This union covers all fourteen routing
families while admitting independent property, descriptor, and at-rule owners
that a forward closure from the family roots could not discover. The companion
evidence, exact exclusions, resolver, and digest reproduction are in
`formation/l4-root-seed-research.md`. **The seed condition and Gate 1 remain
RED until this manifest and the amended sheet have survived two independent
adversarial challenges.** The manifest is only the root set; snapshot
membership grants no semantic implementation credit, and PB0 still owns the
normative fixed-point closure and operation-obligation denominator. Its
verified Easing-2 root contains no `spring()` carrier, so that owner-requested
feature remains explicitly RED pending an exact source pin or owner-ratified
preserve/delegate/refuse disposition.

This algorithm materializes the grammar-bearing source universe needed to
discharge all fourteen families, including the normative CSS Syntax and
Values/Units foundations, inherited operative earlier-level productions,
level-4 modules and extensions, and the explicitly seeded spring/color/
timeline-trigger maturity rows. Grammar, prose/algorithm, serialization,
diagnostic/recovery, and contextual-operation carriers enter when they alter a
parser obligation.

The old fifteen-module topology, the BBNF 84-spec union, the epoch-5 96-object
selection, and the fourteen gaps are evidence inputs, not interchangeable
denominators. Gate 1 ratifies this algorithm and its seed plus PB0 work only.
PB0 then freezes the resulting object lock and prices its denominator for Gate
2; it may not choose extra sources by judgment during materialization.

### 1.2 Occurrence-atomic denominator

The denominator domain is **operation-atomic source obligations**. One row key
contains, at minimum:

```text
(source-object digest,
 exact carrier fragment or byte span,
 carrier ordinal,
 carrier kind,
 operation)
```

`name`, `for`, `base-or-extension`, family, and maturity are attributes, not
identity. A single carrier that governs multiple operations
(for example parse, recover, type, and serialize) splits into one row per
operation; those rows deliberately share its source coordinates. Nested spans
and cross-reference spans legitimately overlap when their carrier identities
or operation obligations differ and the relationship is recorded. Two rows
are duplicate/ambiguous RED when they claim the same operation for the same
carrier identity, or when overlapping fragments claim indistinguishable
ownership without an explicit containment/reference edge.

Root adjudication ratifies this operation-atomic overlap rule as the explicit
refinement and supersession of HL4-1's blanket “overlapping rows are RED”
wording. Recorded nested/cross-reference overlap is therefore valid by design;
only duplicate or ownership-ambiguous overlap is RED. This is not a silent
conflict with the governing harden report.

PB0 proves a bijection from the independently pinned operation-obligation
domain to matrix rows. Missing, duplicate, ambiguous, or orphan obligations are
RED; overlap alone is not. Each row has exactly one:

- fourteen-gap routing family and owner wave;
- reviewed support disposition and maturity;
- one terminal disposition for the keyed operation (implement, preserve,
  delegate, or typed refuse);
- deterministic fixture set and applicable oracle rails;
- expected result for that operation: accept/recover/reject plus normalized
  typed result or diagnostic. Exact, edit, and canonical serialization are
  independently keyed operation rows, not extra operations hidden in this row.

Generated source facts and reviewed semantic support remain distinct joins.
Preservation or refusal is a terminal operation disposition but is not semantic
implementation credit. PB0 also freezes direct and reachable L4 type censuses;
all public limits/work increments; browser pins; the coordination batch schema;
and an exact diagnostic-shape and code census. Every L4 diagnostic carries
`code`, `phase`, `severity`, recovery action/disposition, processed and original
spans, `expected`, `actual`, and the applicable resource counter. Fields that do
not apply are represented by a single frozen absence rule, not omitted ad hoc.
The legacy eight-code diagnostic shape remains unchanged.

### 1.3 PB0 close and Gate 2

PB0 has two review layers:

- its schema/generator/mechanical source lock receives one structural check;
- its source scope, occurrence bijection, support/operation matrix, fixtures,
  limits, diagnostics, surface, and cost receive two independent adversarial
  three-altitude audits under E-1.

Confirmed defects repair and repeat the affected audits. Scope discoveries
return through E-3. PB0 must materialize an occurrence-derived wave/cost
addendum assigning every reviewed terminal, descriptor, and rule adapter to a
non-god feature owner. That addendum receives two independent assume-faulty
challenges and root gestalt adjudication before it can be put to the owner.
The owner then decides Gate 2 against the sealed source lock, audit findings,
exact surface, revised owner-wave lattice, and cost re-estimate. Only an
explicit Gate-2 ratification of that complete packet authorizes PB1 or later
feature prototyping.

## 2. Frozen legacy surface and additive L4 surface

`pi/mirror/index.ts` remains exactly the Phase-A **19 runtime + 33 type = 52
direct exports**, with byte/signature parity and the 37-symbol keyframes seam.
In particular, the concrete `parseCssColor`, stable four-kind
`parseTimingFunction`, fail-fast nine-kind `parseStylesheet`, and legacy
eight-code `ParseIssue` contracts do not widen.

Phase B lives behind `pi/mirror/l4/index.ts` and a prototype-local package
subpath. PB0 freezes its direct export census and transitively reachable type
closure. The initial L4 surface has **at most eight runtime doors**:

| runtime door | operation | final owner |
|---|---|---|
| `tokenizeCss` | lossless token/trivia/recovery partition | PB1 |
| `parseCssComponentValues` | lossless component-value document | PB1 |
| `parseCssTypedValue` | property/descriptor/type/definition goal | PB12b |
| `parseCssColorExpression` | concrete + relative/mix/light-dark/contrast syntax | PB5 |
| `parseCssSelectorList` | selector CST and specificity inputs | PB7 |
| `parseCssCondition` | media/container/supports condition goal | PB8 |
| `parseStylesheetL4` | raw, goal-neutral ordered recovered L4 document | PB12a |
| `serializeCss` | exact, accepted edits, or row-authorized canonical form | PB1 + feature owners |

PB0 may make `tokenizeCss` proof-only only by an explicit Gate-2 owner ruling;
otherwise it is the direct gap-11 door. A ninth runtime door requires a later
E-3 addenda. Internal modules do not become public merely because they exist.
Exact type names and counts are a PB0 deliverable, not invented by this sheet.

The L4 CST is goal-neutral. Typed parses return a dense overlay table keyed by
stable node ID plus a typed root/reference; they neither copy nor mutate CST
nodes, and separate goals produce separate overlays. `CssParseResult<T>` has
these semantics:

- `ok:true`: the requested root was produced within limits; recoverable
  diagnostics may be present;
- `ok:false`: no usable requested root was produced; an optional `partial` is
  recovery evidence, not success, and diagnostics are non-empty;
- contextual evaluation refusals are operation results, not parse diagnostics.

Every overlay records the exact source-document identity it belongs to. PB2
proves its kernel cannot emit an out-of-range node reference; PB12b proves all
public typed roots and terminal adapters reference nodes from that same
document, stay within the dense node range, and are acyclic wherever the typed
contract requires a tree/DAG. PB13G repeats the foreign-document, forged-ID,
out-of-range, and required-acyclicity properties over the graduated surface.
Malformed, cyclic, forged, or cross-document references deterministically
refuse with the frozen typed diagnostic; they never silently bind or reach
`internal_error`.

PB1 defines an explicit edit carrier: original-document identity, stable
node/span target, typed replacement, non-overlap, and conflict refusal. Exact
mode accepts no edits and reproduces the original UTF-16 string. Edit mode
changes only accepted ranges and proves every untouched range identical.
Canonical mode exists only for PB0 rows carrying that disposition; there is no
generic promise to canonicalize arbitrary CSS.

## 3. Corrected Phase-B waves

All paths are under the self-contained `pi/mirror/` prototype. No wave below
authorizes a production swap or edits repo `src/`, `vnext/`, parse-that, BBNF,
keyframes, `scripts/dev/dev.sh`, or any `INBOX.md`.

**PB0 is the only Gate-1-authorizable row. PB1–PB13 are a provisional
architecture skeleton, not a closed or ratified owner topology.** The 76-root
seed intentionally exposes independent font, grid, flex, text, counter/list,
alignment, sizing, descriptor, and at-rule grammars whose exact occurrence
ownership is not knowable before PB0. PB0's derived addendum must add or split
feature-owned terminal/rule-adapter waves wherever the occurrence matrix
requires them; PB12a/PB12b remain thin joins and may not absorb those owners.
That revised lattice supersedes this skeleton before Gate 2.

| wave | mission and deliverable boundary | dependency / born-RED close | grade |
|---|---|---|---|
| **PB0 — STANDARDS + SURFACE LOCK** | Occurrence-atomic source lock; generated-fact/reviewed-support join; fourteen-family routing; exact L4 barrel/type closure; maturity/operation/oracle/fixture matrices; diagnostics, limits, browser pins, exchange schema; and the occurrence-derived owner-wave/cost addendum. No parser feature code. | W0. RED until the bijection and every terminal row are complete; 1× mechanical check + 2× semantic audit; derived addendum 2× challenge + gestalt; owner Gate 2. The 76-root input raises the formation grade from L to L/XL. | **L/XL** |
| **PB1 — LOSSLESS SYNTAX-3 FOUNDATION** | `SourceText` preprocessing/boundary map; the sole shared prototype CSS-source token leaf; token/trivia/recovery interval partition; component values/blocks; parse-local recovery/work counters; stable IDs; L4 result/diagnostics; limits; exact/edit substrate. | W0 + Gate 2. Replaces W0's destructive trivia leaf for every re-anchored Phase-A and L4 grammar; no parallel scanner survives and parse-that's engine-global recovery collector is forbidden. RED on Unicode/bad-token/partition/recovery/exact-edit/non-string and every limit `+1`, plus exact `tokenizeCss`/`parseCssComponentValues` equality for preprocess, significant-token, trivia and recovery boundaries with no gaps/overlap and correct original↔processed offsets. After landing, replay W0 and every already-ACCEPTED Phase-A wave's born-RED/differential/no-throw gates and both E-1 passes; quiesce/rebase in-progress waves before their ordinary author/audit close. | **L** |
| **PB2 — VALUE-DEFINITION MATCHER KERNEL** | Private VDS meta-grammar, bounded IR/compiler, registry interface, references/combinators/multipliers/ranges, nullable-cycle rejection, ambiguity policy, deterministic work accounting. | PB0+PB1; may author with PB3/PB7. Kernel closes on foundation/synthetic conformance plus same-document and in-range overlay-reference gates; total terminal/definition closure deliberately stays RED until PB12b. | **L/XL** |
| **PB3 — NUMERIC + UNIT + MATH** | Source-preserving literals, precedence/grouping tree, calc type/percentage hints, dimension vectors, inventoried units/math calls, pure canonicalization, explicit context requirements. | PB1. RED on operator/nesting/dimension/function matrix, signed-zero/non-finite policy, context propagation and limits. Phase-A `numUnit`/`Number` is not this semantic model. | **L** |
| **PB4 — SUBSTITUTION** | Typed `var()`/`env()`/`attr()`, component-value fallbacks, explicitly already-cascaded provider, bounded dependency graph and refusal results. | PB1+PB2+PB3. RED on cycles, fallbacks, registered goals, poisoned globals, work limits, and generalized R2/R12 seams; no cascade simulation. | **M/L** |
| **PB5 — COLOR EXPRESSIONS** | Relative colors, color-mix, light-dark, contrast-color, profile/context/maturity nodes, row-limited canonical serializer; reuse the one numeric color DAG. | Accepted W2 + PB3+PB4; sole seat. RED until every PB0 color row terminates and R1/R3/R6/R9 pass; legacy concrete door unchanged. | **L** |
| **PB6 — EASING + ANIMATION/TIMELINE VALUES** | Experimental `spring()` syntax/delegation, selector depth, animation values, current timelines/ranges/triggers, serializers, exact maturity/version data. | Accepted W3 + PB3+PB4. RED until stable/experimental gates, obsolete/current distinction, limits, round trips and browser-capability rows pass; no spring solver. | **L** |
| **PB7 — SELECTORS** | Typed selector CST, forgiving rejected branches, namespaces, nesting, specificity, serializer/edit behavior, explicit matching adapter. | PB1; may author with PB2/PB3; sole seat. RED on pinned vectors, non-ASCII, specificity and work `+1`; no ambient DOM. | **L** |
| **PB8 — CONDITIONS** | One media/container/supports/style/general-enclosed boolean tree, range syntax, PB7 `selector()` reuse, capability/refusal model and serializers. Supports-declaration and style-query leaves remain losslessly preserved/delegated until PB12b can type them through the sealed registry; PB8 never invents a typed truth value. | PB2+PB3+PB7. RED on every condition family, absent-capability refusal, serializer/limit matrix and preservation/delegation of registry-dependent leaves; unsupported browsers never skip-GREEN. | **M/L** |
| **PB9a — GEOMETRY/PATH** | Shared positions, reference boxes, basic shapes, bounded SVG path syntax, and serializers. Independently verified pure math may be transposed; the live permissive path tokenizer may not. | PB3+PB4+PB5. RED on the complete geometry/path matrix, stray-input rejection, context requirements and limits. | **L** |
| **PB9b — EFFECTS** | Filter lists, shadows, URL/resource nodes and capability map over PB9a/PB3/PB5. | PB9a + PB3+PB4+PB5. RED on all effect/filter/shadow/resource rows, ordering, shared color/numeric identity, serializers and limits. | **L** |
| **PB10 — GRADIENTS + IMAGE UNION** | Linear/radial/conic/repeating gradients, stops/hints/positions/interpolation, full pinned image union/aliases/resources. | PB3+PB4+PB5; may author beside PB9; sole seat. RED on every image row, N-stop/fix-up/alias/resource/canonical/limit vector and deterministic visual/numeric witnesses; pixels do not decide grammar validity. | **L** |
| **PB11 — TRANSFORMS + MOTION** | Ordered transforms, typed lowering inputs, PB9a path/basic-shape/ray/reference-box motion, serializers and capability seams. | PB3+PB4+PB9a; sole seat. RED on order, 2D/3D, units, paths, context/limit vectors, shared path identity, and no-decomposition/no-second-matrix edges. | **L** |
| **PB12a — RECOVERED RULES** | Sole owner of the raw, goal-neutral `parseStylesheetL4` door: thin ordered stylesheet/rule registry, deterministic recovery, unknown preservation, layers/nesting/current at-rules, feature-owned rule adapters and rule serializers. | PB2+PB4+PB5+PB6+PB7+PB8+PB9b+PB10+PB11+accepted W5; sole long-pole seat. RED until every PB0 rule row joins once and malformed/order/duplicate/trivia/exact/edit vectors pass; legacy W5 fail-fast and keyframes seam stay GREEN. | **L/XL** |
| **PB12b — TYPED REGISTRY** | Total terminal/definition join, typed declarations/descriptors, same-document dense overlays, public `parseCssTypedValue`, stable collected views. It may consume PB12a raw documents but does not co-own `parseStylesheetL4`. | PB2+PB4+PB5+PB6+PB7+PB8+PB9b+PB10+PB11+accepted W5; may author beside PB12a; sole long-pole seat. RED until every reviewed reference resolves exactly once, every goal passes, overlay IDs are in-range/same-document and required typed graphs are acyclic; no property switch or generated TS-per-property. | **L/XL** |
| **PB13G — SEMANTIC GRADUATION** | Exact legacy/L4 direct+reachable censuses; denominator ownership; conformance/oracle classification; deterministic hostile corpus; no-throw/limits; diagnostic reachability; overlay document/range/acyclicity; exact/edit/canonical properties; legacy/keyframes seams. | Accepted PB12a+PB12b. RED on any throw, hang, ordinary-input `internal_error`, forged/foreign/out-of-range overlay acceptance, required cycle, unowned row, failed vector, unclassified divergence or broken seam. | **L** |
| **PB13P — PERFORMANCE GRADUATION** | Pinned legacy comparisons plus L4-door throughput, allocation/work slopes, scenario digests, raw profiles and limit costs. | Accepted PB12a+PB12b; runs beside PB13G. Reports rather than inventing LIVE-relative bars for new doors and can never waive PB13G. | **M** |

PB9a/PB9b, PB12a/PB12b, and PB13G/PB13P are required splits. They are
anti-god boundaries, never permission to duplicate the scanner, matcher,
numeric, color, geometry, condition, recovery, or registry machinery.
They are necessary but not sufficient: the PB0-derived addendum must introduce
the additional feature-owner splits required by the frozen occurrence matrix.

## 4. Dependency lattice and pipeline

The graph below is the pre-PB0 skeleton only. The audited occurrence-derived
addendum replaces its PB1+ owner nodes and exact edges before Gate 2; no node
shown after PB0 gains authority merely by appearing here.

```text
W0 -------------------------------> Phase-A W1..W7 (unchanged gates)
 |
 +-> PB0 -> 1+2 reviews -> derived-wave E-3 -> owner Gate 2 -> PB1
                                                               |  \
                                                               |   -> Phase-A replay
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

PB11 depends on PB9a, not PB9b. The explicit prerequisite set for both PB12
halves is `{PB2, PB4, PB5, PB6, PB7, PB8, PB9b, PB10, PB11, accepted W5}`;
PB3 and PB9a arrive transitively. PB12a/PB12b may author in parallel but close
only after every terminal and rule adapter they census is accepted. PB12a alone
owns the raw goal-neutral recovered-sheet door. PB12b may consume that document
but owns typing only; PB12b, not PB2, closes the value-definition registry and
typed-value door.

Authoring ceiling is four. Foundation close ceiling is three
(`PB2 || PB3 || PB7`). Later features fan to four only after named
dependencies are accepted. PB5, PB7, PB10, PB11, PB12a, and PB12b each retain
a sole long-pole seat. Two E-1 audits launch as soon as each feature author
closes; audit availability never permits dependency-early closure.

PB1 is the owner-ratified tokenizer overlay before Phase-B features and before
Phase-A work may claim closure on the final shared substrate. It replaces W0's
destructive trivia scanner as the shared prototype scanner: every re-anchored
Phase-A grammar and every L4 feature grammar consumes PB1, and no W0/feature-
local parallel scanner survives. Any earlier Phase-A prototype remains
provisional. After PB1 it reruns W0, then every already-ACCEPTED Phase-A wave's
born-RED, differential and no-throw gates plus two fresh E-1 passes. A wave then
in progress quiesces, rebases, and completes its ordinary first author/audit
close instead of being counted as a replay. The 52 signatures and semantic
acceptance contracts remain unchanged.

## 5. Fourteen-gap routing ledger

The fourteen rows remain the owner-visible routing summary required by
`ADDENDA-01.md`; only PB0's occurrence matrix is the close denominator.

| gap family | Phase-B owners | governing boundary |
|---|---|---|
| 1. full color inventory | PB5 | concrete legacy color stays intact; L4 expressions use PB3/PB4 and one color DAG |
| 2. full easing / `spring()` | PB6 | experimental syntax/delegation only; no runtime solver |
| 3. filters, URL, shapes, shadow | PB9a+PB9b | one geometry/path vocabulary; resource/layout capabilities explicit |
| 4. calc/math | PB3 | precedence-preserving numeric tree, not generic calls |
| 5. gradients/image union | PB10 | reuse PB3/PB5; one image/gradient engine |
| 6. keyframes/timeline/trigger depth | PB6+PB12a | value grammar then ordered/recovered rule adapters; exact maturity pins |
| 7. media/container/supports | PB8+PB12a+PB12b | one condition tree then thin at-rule integration; supports-declaration/style-query leaves preserve/delegate until PB12b typing |
| 8. typed declarations/value matcher | PB2+PB12b | bounded kernel first, terminal/definition closure last; raw CST retained |
| 9. typed selectors | PB7 | syntax/specificity owned; matching only through an adapter |
| 10. at-rule model/recovery | PB1+PB12a | parse-local generic recovery before rule registry |
| 11. CSS-Syntax-L3 tokenizer | PB1 | sole source scanner, interval partition and boundary map |
| 12. full transform + motion | PB9a+PB11 | shared bounded path grammar; no decomposition dependency |
| 13. unit algebra/context | PB3 | dimension vector plus explicit resolution capabilities |
| 14. typed `var`/`env`/`attr` | PB4 | already-cascaded provider only; bounded fallback/cycle model |

## 6. Standing hardening and proof rules

### 6.1 No-throw, limits, and diagnostics

Every public legacy and L4 entry is no-throw on arbitrary runtime input. Its
deterministic corpus includes non-strings, empty input, every-prefix truncation,
Unicode preprocessing cases, unclosed/nested delimiters/comments/strings/URLs,
escapes, delimiter/list mutations, R1–R12 mutations, and exact at-limit/`+1`
cases for input, nesting, tokens/nodes, recovery and work. Random fuzz may find
cases; only minimized seed-bound vectors gate close.

The hostile bank is signature-specific, not string-only. Public APIs accept
inert declarative data and capability descriptors. Structured document,
overlay, edit, goal, option, and mode arguments include malicious cyclic/plain
objects, forged and foreign document/node IDs, out-of-range IDs, overlapping or
conflicting edits, invalid serialization modes, and accessor-bearing shapes.
Structural validation inspects own descriptors and rejects accessors without
invoking user getters wherever avoidable; it never invokes a provider/adapter
merely to decide that its container shape is valid.

No synchronous API can promise termination when arbitrary foreign callback,
getter, or proxy code is invoked and does not return. That impossibility is not
laundered into a parser gate. A separately authorized provider/selector/
condition adapter invocation is no-throw and terminating only conditional on
the foreign call returning; a returned rejection or thrown callback maps to the
frozen deterministic result/diagnostic and never mutates caller data. Throwing
or returning getter/proxy/callback fixtures remain required where execution can
regain control; a deliberately non-returning foreign call is outside the
termination claim. Parser-owned traversal of inert cyclic/plain data remains
bounded and unconditionally no-throw.

PB0 freezes the exact L4 diagnostic shape and code census specified in §1.2,
covering invalid runtime input, preprocess/token/syntax classes, typed/selector/
condition/rule invalidity, experimental-disabled, resource-limit, and
internal-error. Every ordinary code and recovery action has a direct fixture.
The outer-catch-to-`internal_error` mapping is reached only by an explicit
fault-injection fixture; no hostile input is crafted merely to execute an
implementation throw. **Any `internal_error` reached by an ordinary hostile or
conformance vector is RED.** Legacy entries retain their exact eight-code
contract and Phase-A `expected[]` fidelity. Every L4 field mapping, recovery
action, processed↔original span projection, expected/actual population rule,
and applicable counter state has a direct fixture.

### 6.2 Applicable oracle rails

Each occurrence row names executable expectations and only the rails that can
witness its operation:

1. LIVE differential is primary on Phase-A overlap; R1–R12 and later ratified
   corrections are asserted divergences.
2. Exact pinned specification/conformance evidence is primary for growth and
   arbitrates LIVE divergence. Citations alone are not expected ASTs. A WPT
   vector becomes evidence only after its exact assertion identity, prerequisite
   disposition, and binding to the claimed parser operation are recorded; file
   membership or an aggregate route is insufficient.
3. Browser CSSOM/Typed OM/rendered witnesses apply only where they observe the
   claimed operation. Unsupported is recorded, never skip-GREEN.
4. BBNF is a cross-check only for a mutually accepted content-addressed batch.

“Zero mirror defect” applies to LIVE-overlap rows. Phase-B close requires zero
failed ratified vector and zero unclassified divergence. Pixel or browser
majority never decides grammar validity.

### 6.3 Audits and parsimony

Every feature-author closure in the final PB0-derived topology receives two
independent adversarial passes at total-tranche, wave, and per-feature
altitudes; this includes every retained PB1–PB12b skeleton row. PB0 follows §1.3.
Confirmed defects repair and repeat both feature passes; scope change invokes
E-3. Every review reports authored LOC separately from generated data, looks
for duplicated scanner/matcher/registry logic, and names the smallest safe
deletion or consolidation.

The parsimony locks are: one CSS scanner, one private VDS compiler, one
goal-neutral CST, dense overlays rather than cloned trees, thin feature-owned
adapters/data registries, no generated TypeScript module per property, no
public export per grammar module, no parser-disguised evaluator, no second
numeric/color/path engine, and no profile-free optimization. G-2/semantic
correctness is never relaxed for throughput.

## 7. BBNF coordination boundary

Coordination is owner/thread-mediated and acknowledgement-gated. Value-side
authorization does not override the active BBNF task's own no-contact rule.
Neither side polls, writes, patches, links, or imports the other's repository.

Each proposed batch contains:

```text
schema/version + batch digest
sender epoch/status + receiver acknowledgement/status
source-object digest + exact fragment/span + commit-edge status
feature occurrence id + family + maturity + operation
raw UTF-8 bytes + decoded UTF-16 + byte<->UTF-16 boundary vectors
parse goal + accept/recover/reject expectation
normalized AST/canonical form or typed diagnostic/recovery action
R-ledger id + exact spec evidence + browser witness applicability
vector status: proposed | audited | accepted | withdrawn
```

An item becomes shared authority only after both sides record `accepted` for
the **same batch digest**. Until independently verified, current epoch-5 source
objects may be cited only by their bytes/digests; named CSSWG commit edges are
unproved labels. Epoch-5 parsed labels, denominator rows, unresolved WPT
aggregates, generated runtime and candidate/product claims are adversarial
leads, never imported semantic rows.

Exchange cadence, once the active task explicitly acknowledges the boundary:
PB0 source identities/occurrence schema; PB1/PB2 offset/recovery/VDS vectors;
each feature's audited AST and conformance deltas; PB13G accepted semantic/
manifest digests and unresolved differences; and PB13P separately identified
profile/scenario digests. R6–R12 cross first as candidates with exact evidence,
not as truth by receipt. No parse-that/BBNF source, private novelty,
StructuralIndex/SIMD path, or generated runtime crosses. Scalar byte-class
ideas may be independently reimplemented only after a grammar-side floor and
profile prove need.

## 8. Cost and owner decisions

This proposal contains a **17-unit pre-PB0 architecture skeleton**, not the
final independently closable Phase-B author census:

- 10 × L: PB1, PB3, PB5, PB6, PB7, PB9a, PB9b, PB10, PB11, PB13G;
- 4 × L/XL: PB0, PB2, PB12a, PB12b;
- 2 × M/L: PB4, PB8;
- 1 × M: PB13P.

Using only the Phase-A band anchors (M ≈1 seat-day and the L lower anchor of
2), **31 author-seat-days is only the provisional skeleton's nominal lower-
anchor subtotal**: `10×2 + 4×2 + 2×1 + 1×1`. It is neither a lifecycle floor
nor a claim that 17 units close the 76-root scope. Missing feature-owner waves,
XL excess, audits, adjudication, coordination, denominator growth, and rework
are unpriced. The post-PB0 E-3 addendum replaces both the topology and this
number with a row/fixture-based estimate before Gate 2.

The review ledger before conditional replay is: **2 packet challenges** before
Gate 1; PB0's **1 structural check + 2 semantic audits**; then **2 challenges
+ root gestalt** for the occurrence-derived wave/cost addendum before Gate 2.
The provisional skeleton's PB1–PB12b rows would contribute 14 feature closures
× 2 = 28 E-1 passes, but the derived topology supersedes that count and must
publish the exact replacement. The shared-scanner overlay also creates a
conditional Phase-A replay ledger, but its actual membership cannot be known
at Gate 2 because PB1 does not yet exist.

At Gate 2 the owner freezes the **provisional exposure and quiescence/rebase
plan**, not an invented final `r`: W0 will receive one structural replay; every
then-accepted Phase-A wave is provisionally exposed to one S-grade mechanical
replay plus two fresh E-1 passes; and any Phase-A wave in progress when PB1 is
ready must quiesce at a file-safe boundary, rebase its adapters onto the shared
scanner, then resume its ordinary author and two-audit close. An in-progress
wave is not counted as an already-closed replay and does not receive duplicate
replay audits on top of its first close.

At **PB1 close**, define `r` as the number of Phase-A W1–W7 waves already
ACCEPTED before the PB1 re-anchor. Record the actual wave names, adapter work,
W0 evidence, `r + 1` S-grade mechanical replay units (W0 plus those accepted
waves), `2r` fresh E-1 passes, repair work, evidence, and cost. Any defect
repair reopens its Phase-A wave at the original grade and is added rather than
hidden in the S-grade rerun. W6/W7 that have not already closed perform their
ordinary graduation/bench work only after the shared-scanner replay is GREEN;
if already ACCEPTED, they are included in `r` and replayed like the other
accepted Phase-A waves.

### Gate-1 decisions requested now

The owner must explicitly ratify or reject:

1. the §1.1 deterministic algorithm and its content-addressed seed manifest/
   query, plus the operation-atomic PB0 method;
2. PB0 at L/XL and the PB1–PB13 skeleton only as a planning hypothesis,
   including its mandatory anti-god splits and 31-day lower-anchor subtotal;
   **Gate 1 does not ratify PB1+ topology, grades, audit count, or cost**;
3. the separate `mirror/l4/index.ts` surface with at most eight runtime doors;
4. permission to prototype **PB0 only**;
5. the two-gate rule and acknowledgement-gated BBNF exchange.

This decision list is not eligible for owner action until the two independent
addendum challenges are GREEN, root records the gestalt adjudication, and
`formation/l4-root-seed-manifest.json` has a separately challenged exact digest
with GREEN reviews. A real digest proves identity, not review acceptance.

### Gate-2 decisions requested only after PB0 audits

The owner then ratifies or rejects:

1. the exact source-object lock and occurrence denominator;
2. every maturity, operation, support, owner, fixture and oracle row;
3. exact L4 direct/reachable type census and whether `tokenizeCss` is public;
4. `CssParseResult`, dense overlay and edit-carrier contracts;
5. closed diagnostic taxonomy, concrete limits/work accounting and browser pins;
6. the audited BBNF exchange batch boundary;
7. the twice-challenged, gestalt-adjudicated PB0-derived owner-wave lattice,
   its exact audit count and Phase-B cost re-estimate;
8. provisional Phase-A replay exposure, the quiescence/rebase plan, and
   permission for PB1+ prototyping.

No silence, partial acceptance, Phase-A activity, or coordination receipt
constitutes either ratification.

## 9. Close

After all author/audit/adjudication gates, PB13G and PB13P run in parallel and
feed the V·π perfection verdict. PB13P cannot waive PB13G. The final close
requires the unchanged Phase-A G-1/G-2/G-3 rails plus the exact L4 census,
ratified vectors, no-throw/limits, serialization properties and separate L4
performance evidence. The result is a proven prototype/reference. Production
execution remains a later megatranche authorization.

---

Formation receipt: Phase-B addenda-writing seat; model served `gpt-5.6-terra`;
2026-07-21.

Amendment/review receipt: root adjudication accepted and repaired A-01,
A-05–A-08 and B-C1–B-C5, incorporated A-02–A-04, B-R1–B-R3 and the PB8
clarification, and preserved the 17-unit topology. This amended sheet returns
to two independent assume-faulty challenges; neither prior challenge is treated
as GREEN by repair.

Second-amendment receipt: second root adjudication restores `carrier kind` to
the stable obligation identity and expressly refines HL4-1 overlap semantics;
moves actual Phase-A replay membership/evidence/cost from Gate 2 to PB1 close
while freezing quiescence/rebase exposure at Gate 2; bounds callback/descriptor
claims to inert data and returning foreign code. Root then supplied and
mechanically reverified the then-current 21-root seed at manifest digest
`16c5fc8c57d5f092096a8060024e3884b9474aa941aef8389ac3e0d94b7026ce`;
that seed later failed the independent reverse-consumer scope challenge and is
superseded.

Third-amendment receipt: root accepted the reverse-consumer finding and replaced
the narrow family-root seed with the deterministic 76-root Snapshot-2026 union
at manifest digest
`e4bd163933d5b88d8a4b4b06290bf86934f4183e714b24b61f4d0155aa982d5a`.
Root independently recomputed the digest, 76/76 unique sorted paths, four-band
`24 + 8 + 10 + 22 = 64` membership, eleven additive owner extensions, all
fourteen family routes, and 9,008,216 pinned bytes. The first v2 challenge then
found a corrupt blank CSS2 level and an unclosed owner topology.

Fourth-amendment receipt: CSS2's blank `Level:` now uses the line-bounded
`"none"` sentinel, with a parser rule forbidding cross-key consumption; the
manifest was re-digested as
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.
The 17-unit/31-day PB1+ layout is now explicitly a provisional skeleton. PB0
is L/XL and must produce an occurrence-derived non-god owner-wave/cost addendum
that is twice-challenged, gestalt-adjudicated, and explicitly ratified at Gate
2 before any PB1+ code. The exact amended packet now returns to two independent
challenges. Gate 1 is not ready until both are GREEN. Status remains
**PROPOSED / NOT RATIFIED**.
