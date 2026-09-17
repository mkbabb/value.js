# V·π ADDENDA-02 — independent adversarial audit A

2026-07-21 · target: `ADDENDA-02.md` · posture: assume faulty ·
authorities: `HANDOFF.md`, `PI.md`, `ADDENDA-01.md`, `CHARTER.md`,
`formation/research-l4-architecture.md`, and
`formation/harden-l4.md`.

This pass was performed independently against the proposed addendum and its
authority chain. It changes neither the addendum nor any prototype or
production code.

## 0. Verdict

The corrected architecture, two owner gates, wave splits, and denominator
model are substantially faithful to the hardened formation. The proposal is
not yet fit for Gate-1 ratification, however. Four mandatory hardened
contracts are absent or weakened: PB1 does not unambiguously become the one
scanner for both the L4 and re-anchored Phase-A paths; the two public PB1 doors
do not have a boundary-equality gate; dense overlay references have no
range/acyclic close condition; and the L4 diagnostic record and WPT evidence
contracts are incomplete. These are specification defects, not implementation
details that PB0 may invent.

No arithmetic or census-count defect was found. The proposal must be amended
and both independent addendum challenges rerun before owner Gate 1.

## 1. Total-tranche altitude — gestalt, optimality, and sequence

### What is sound

- `ADDENDA-02 §0–§2` correctly replaces the fourteen-family pseudo-
  denominator with an occurrence-atomic PB0 source lock. Digest + exact
  fragment/span + ordinal + carrier + operation is the identity required by
  hardened HL4-1, while family, maturity, and support remain attributes.
- The two owner decisions in the preamble, `§1.3`, and `§8` correctly
  prevent a broad scope rule from authorizing feature code. Gate 1 permits PB0
  only; Gate 2 follows PB0's structural check and two semantic audits and is
  the first possible authority for PB1+.
- `§2` correctly preserves the exact legacy 19-runtime + 33-type barrel and
  places no more than eight L4 runtime doors behind a separate barrel. This
  avoids invalidating Phase A's exact 52-export and 37-symbol proof rails.
- The corrected sequence in `§3–§4` removes the PB2 closure cycle, makes PB1
  foundational, and retains the mandatory PB9a/PB9b, PB12a/PB12b, and
  PB13G/PB13P anti-god splits. The PB13 semantic/performance split preserves
  the rule that performance cannot waive semantics.
- `§5` maps each of the fourteen owner-visible families exactly once, while
  retaining PB0 occurrences as the actual close denominator. No family is
  orphaned or duplicated.
- `§6–§7` correctly makes the pinned specification primary for growth,
  limits LIVE to overlap, treats browsers as witnesses, refuses semantic
  credit to current BBNF epoch-5 labels, and requires acknowledgement of the
  same content-addressed batch before cross-engine data becomes shared
  authority.

### Findings

#### A-01 — CONFIRMED DEFECT: PB1's one-scanner re-anchor is weakened

`ADDENDA-02 §0` promises one CSS scanner and `§6.3` repeats that parsimony
lock, but the PB1 row in `§3` says only that PB1 replaces
`skipBlockComments` "for the L4 path." That qualifier permits the destructive
W0 leaf and a second scanner to remain the Phase-A path. `§4` says Phase-A
work reruns on the final shared substrate, but it never explicitly says that
Phase-A feature grammars consume PB1's sole token/trivia owner.

This fails hardened HL4-4's mandatory ruling: PB1 replaces rather than wraps
the W0 trivia leaf, all feature grammars consume the same source scanner, and
there is no feature-local raw rescan/splitter/tokenizer. It also undermines the
reason PB1 is sequenced before final Phase-A closure.

Required repair: remove "for the L4 path"; state that PB1 is the sole
CSS-source scanner for the re-anchored prototype, including Phase A after the
overlay; and make the absence of any surviving destructive/parallel scanner a
close gate. Legacy signatures and semantics remain unchanged.

#### A-02 — REQUIRED CLARIFICATION: Gate 1 lacks an explicit E-3 formation prerequisite

The preamble and `§8` ask for Gate-1 ratification, but the sheet does not say
that Gate 1 may occur only after this addendum itself has received two
independent assume-faulty challenges and a root gestalt adjudication.
`HANDOFF.md` E-3 and `ADDENDA-01 §4` already impose that rule, so this omission
does not erase the authority. It does make the otherwise self-contained gate
sequence easy to misread as direct writer-to-owner ratification.

Required clarification: add the two addendum challenges and gestalt
adjudication as explicit Gate-1 prerequisites, distinct from PB0's later one
structural + two semantic reviews.

## 2. Addendum/wave-set altitude — completeness and hardened adherence

### Mechanical census and cost verification

The counts in `ADDENDA-02 §8` reconcile:

| check | mechanical result |
|---|---:|
| independently closable units | 17 |
| L units | 11 |
| L/XL units | 3 |
| M/L units | 2 |
| M units | 1 |
| total grade rows | 11 + 3 + 2 + 1 = 17 |
| nominal minimum arithmetic | 11×2 + 3×2 + 2×1 + 1×1 = 31 |
| PB1 through PB12b feature closures | 14 |
| required E-1 passes for those closures | 14×2 = 28 |
| PB0 reviews | 1 structural + 2 semantic |
| L4 runtime doors listed in `§2` | 8 unique names |
| fourteen-gap routing rows in `§5` | 14 unique ordinals |

The 31-day number is arithmetically correct only when L/XL is costed at the L
minimum and M/L and M are costed at the nominal M value.

#### A-03 — REQUIRED CLARIFICATION: 31 is a nominal planning minimum, not a defined floor

`PI.md §1` defines M as approximately one seat-day and L as at least two; it
does not define XL or make M a lower bound. `ADDENDA-02 §8` therefore cannot
mechanically prove 31 as a literal floor from the published bands, although
the displayed arithmetic is correct under the assumptions above.

Required clarification: either define the Phase-B estimating convention
(`M=1`, `M/L=1`, `L=2`, `L/XL=2` for a nominal minimum), or call 31 the
"nominal band-anchor estimate." Continue to state that it excludes audits,
adjudication, Phase A, and PB0-discovered growth.

#### A-04 — NONBLOCKING SUGGESTION: replace the PB12 dependency shorthand

The PB12a/PB12b rows in `§3` use `PB2+PB4–PB11`, while `§4` gives the exact
set `{PB2,PB4,PB5,PB6,PB7,PB8,PB9b,PB10,PB11,accepted W5}`. The exact lattice
is correct: PB3 and PB9a arrive transitively, and both joins wait for all named
terminal/rule owners. The range-like shorthand is nevertheless ambiguous now
that PB9 has `a/b` identities. Use the explicit set in both locations.

### Hardened-ruling coverage

HL4-1/2/3/5/6/8/9/10/11/13/14 are materially present. HL4-4 is defective as
described in A-01. HL4-7 and HL4-12 have the additional omissions below.

#### A-05 — CONFIRMED DEFECT: PB1 omits cross-door boundary identity

The PB1 row in `§3` gates a token/trivia/recovery partition, and `§2` lists
both `tokenizeCss` and `parseCssComponentValues`, but nowhere requires those
doors to report identical token and trivia boundaries for the same input.
Hardened HL4-4 makes that equality a mandatory PB1 close condition. Without
it, two public views may drift while each passes its own internally consistent
partition tests.

Required repair: add a differential property over the full PB1 corpus that
the tokenizer and component-value parser expose identical significant-token,
trivia, preprocessing-boundary, and recovery intervals wherever both
operations apply. Include no-gap/no-overlap totality and original/processed
offset agreement.

#### A-06 — CONFIRMED DEFECT: dense-overlay safety has no close gate

`ADDENDA-02 §2` correctly chooses a dense table keyed by stable node ID and
separate overlays per goal, but it omits hardened HL4-7's mechanical
invariants: every overlay reference is in range, refers to the intended CST
document/node, and is acyclic where the typed relation requires acyclicity.
The PB12b row's "every reviewed reference resolves exactly once" concerns VDS
terminal/definition closure, not overlay-reference integrity.

Required repair: assign range/document-identity checks to PB2's overlay
interface and exhaustive range/identity/acyclic fixtures to PB12b and PB13G.
Malformed or cross-document references must refuse deterministically, never
silently bind or reach `internal_error`.

#### A-07 — CONFIRMED DEFECT: the L4 diagnostic record is under-specified

`ADDENDA-02 §2` defines result success/failure semantics and `§6.1` freezes
code categories and requires fixtures, but neither section freezes the
diagnostic record fields. Hardened HL4-7 requires severity and recovery action
as fields. The retained research contract also makes phase, processed span,
original span, expected/actual data, and the applicable resource counter gate
data. A closed code list alone cannot prove offset fidelity or distinguish a
recovered success from the same code emitted as an unrecovered failure.

Required repair: Gate 1 must fix the diagnostic *shape obligation*, and PB0
must freeze its exact field/type census. At minimum each applicable record
needs code, phase, severity, recovery action, processed and original spans,
expected/actual detail, and resource counter state. Every field mapping and
every recovery action needs a direct fixture; legacy `ParseIssue` stays
unchanged.

#### A-08 — CONFIRMED DEFECT: WPT routing lacks the assertion/prerequisite lock

`ADDENDA-02 §6.2` correctly says citations alone are not expected ASTs, but it
does not carry hardened HL4-12's mandatory WPT rule: a WPT route is evidence
only after the exact test assertion and its prerequisites have been inspected
and bound to the occurrence operation. This omission matters because current
epoch-5 WPT occurrence/semantic labels are explicitly RED.

Required repair: add exact WPT assertion identity, prerequisite disposition,
and claimed-operation mapping to the PB0 oracle/vector join. Uninspected or
aggregate WPT routing remains an adversarial lead and cannot satisfy a row.

## 3. Feature/contract altitude

### PB0 denominator and surface

The PB0 contract in `§1` is otherwise strong: it separates generated facts
from review, uses occurrence identity rather than fourteen family labels,
demands a bijection, distinguishes maturity from operation, and prevents
preserve/refuse outcomes from laundering semantic implementation credit. The
legacy and L4 barrels in `§2` have correct separation and an eight-door
maximum. No denominator or export-count defect was found.

### PB1 losslessness, recovery, and edits

Parse-local recovery, a total interval partition, original-document identity,
non-overlapping edits, conflict refusal, exact untouched ranges, and
row-limited canonicalization are correctly assigned. A-01 and A-05 remain
blocking because these properties do not establish a single scanner or
cross-door identity by themselves.

### PB2/PB12b matcher and overlays

The kernel/registry split is correct and breaks the former terminal-closure
cycle. Nullable-cycle rejection, deterministic work accounting, feature-owned
adapters, and exactly-once total closure are present. A-06 remains blocking at
the representation boundary: definition references can be perfect while the
returned overlay table still contains invalid node references.

### PB3–PB11 feature families

The numeric source-preservation rule, contextual refusals, one color DAG,
experimental spring boundary, selector adapter, shared condition tree,
geometry/effects split, gradient/image union, and no-decomposition transform
boundary all conform to the hardened rulings. The live permissive path
tokenizer is explicitly excluded. No feature-family ownership gap was found.

### PB12a recovered rules and PB13 graduation

PB12a remains a thin registry with unknown/order/trivia preservation and keeps
the legacy fail-fast seam green. PB13G/P correctly separate semantic and
performance evidence. The hostile corpus, limit `+1` vectors, diagnostic-code
reachability, zero `internal_error`, exact/edit/canonical dispositions, and
legacy/keyframes seams are all represented. A-07 must be fixed so diagnostic
reachability tests a complete diagnostic contract rather than code names
alone.

### BBNF coordination

`ADDENDA-02 §7` faithfully honors the active task's independent no-contact
boundary: owner/thread mediation, explicit acknowledgement, no polling or
cross-write, content-addressed batches, mutually recorded acceptance, and no
epoch-5 semantic import. Object bytes/digests are distinguished from unproved
commit labels. A-08 is the only confirmed evidence-contract gap.

## 4. Disposition

Confirmed defects: **A-01, A-05, A-06, A-07, A-08**.

Required clarifications: **A-02, A-03**.

Nonblocking suggestions: **A-04**.

The architecture and counts are salvageable without changing the wave count or
dependency shape. The mandatory contracts must be added through the E-3
formation artifact, then this independent challenge and its peer must rerun
against the amended sheet.

**REJECT**

## 5. RE-AUDIT AFTER AMENDMENT — 2026-07-21

This re-audit read the amended `ADDENDA-02.md`, this audit's original findings,
and the full authority chain. It did not read or communicate with the other
auditor. The posture remained assume-faulty; prior findings were not treated as
GREEN merely because the amendment receipt named them.

### 5.1 Original Audit-A repair ledger

| item | re-audit result | amended evidence |
|---|---|---|
| A-01 shared scanner | **REPAIRED** | `§3` PB1 and `§4` now replace W0's destructive trivia scanner for every re-anchored Phase-A and L4 grammar, forbid parallel scanners, and require the replay. |
| A-02 pre-Gate-1 E-3 process | **CLARIFIED** | The preamble and `§8` now require two GREEN addendum challenges plus root gestalt adjudication before Gate 1 may be put to the owner. |
| A-03 cost terminology | **CLARIFIED** | `§8` calls 31 the nominal band-anchor subtotal, gives the exact assumptions, and explicitly denies that it is a lifecycle floor or cap. |
| A-04 PB12 shorthand | **CLARIFIED** | `§3–§4` now enumerate the exact nine PB prerequisites plus accepted W5 and identify PB3/PB9a as transitive. |
| A-05 PB1 cross-door identity | **REPAIRED** | `§3` requires exact tokenizer/component-value equality across preprocessing, significant-token, trivia, recovery, gap/overlap, and original/processed offset observations. |
| A-06 overlay safety | **REPAIRED** | `§2`, PB2, PB12b, and PB13G now gate same-document identity, range, required acyclicity, and forged/foreign/cyclic refusal. |
| A-07 diagnostic shape | **REPAIRED** | `§1.2` freezes code, phase, severity, recovery action/disposition, both spans, expected/actual, counter, and one absence rule; `§6.1` gives each mapping a direct fixture. |
| A-08 WPT evidence | **REPAIRED** | `§6.2` requires exact assertion identity, prerequisite disposition, and binding to the claimed parser operation; membership/aggregate routes are insufficient. |

The repairs introduce no new export or feature wave. The surface still has
eight unique runtime doors and a separate L4 barrel; the fourteen routing rows
remain unique and complete; the lattice still has 17 closable units. Grade
counts remain 11 L + 3 L/XL + 2 M/L + 1 M = 17, and the stated nominal
subtotal remains `11×2 + 3×2 + 2×1 + 1×1 = 31`. PB1–PB12b still contains
14 feature closures and therefore 28 first-pass E-1 challenges. PB0 still has
one structural check plus two semantic audits.

### 5.2 New adversarial findings

#### RA-A1 — CONFIRMED DEFECT: the mandatory Gate-1 seed is outside the audited artifact

Amended `§1.1` makes a content-addressed seed manifest/query a load-bearing
input: Gate 1 freezes it, PB0 may not add sources by judgment, and the chosen
seed determines draft/experimental/obsolete inclusion and the entire normative
closure. The same section says the Gate-1 packet **must contain** that explicit
seed. `§8` likewise asks the owner to ratify the algorithm "and its
content-addressed seed manifest/query."

No seed manifest/query, digest, or referenced seed artifact is present in the
amended sheet. The preamble simultaneously says the two challenges of *this
addenda* must be GREEN before Gate 1. Supplying the seed after these challenges
would let the scope-determining input bypass them; asking PB0 to create it after
Gate 1 would be circular because Gate 1 is supposed to freeze it before PB0 is
authorized.

Required repair: the formation packet must attach or content-addressably
reference the exact seed before the two addendum re-challenges. Alternatively,
define a separately named pre-PB0 formation artifact with the same two semantic
challenges and root adjudication before Gate 1. In either form, auditors must
be able to verify seed identity, family coverage, ordering/resolver pins, and
the absence of ambient inputs. Gate 1 cannot be GREEN on the current packet.

#### RA-A2 — CONFIRMED DEFECT: the amended occurrence key conflicts with governing HL4-1

Hardened HL4-1 requires stable row identity to include source-object digest,
**carrier kind**, exact span/fragment, occurrence ordinal, and operation. The
amended tuple in `ADDENDA-02 §1.2` drops carrier kind and explicitly demotes it
to an attribute. This is a regression from the prior proposal and permits two
different carrier kinds at the same coordinates/ordinal/operation to collide.

The same section says recorded nested/cross-reference overlap is legitimate
and "overlap alone is not" RED, while hardened HL4-1 says overlapping rows are
RED. The amended interpretation is more mechanically plausible for nested
carriers and operation-split rows, but the addendum's authority paragraph says
HL4-1–HL4-14 govern **on any conflict**. The text therefore cannot both relax
the overlap clause and claim no governing exception.

Required repair: restore carrier kind to the stable key. Name the overlap rule
as an explicit root-adjudicated E-3 refinement of HL4-1 (ambiguous duplicate
ownership RED; recorded containment/reference or different-operation overlap
permitted), rather than leaving it in conflict with the declared authority
precedence. This refinement must be part of both re-challenges.

#### RA-A3 — REQUIRED CLARIFICATION: replay accounting has no in-progress-wave boundary

The replay formula in `§8` is mechanically correct for its declared `r`:
closed Phase-A author seats contribute `r` wave replays and `2r` fresh passes,
while W0 contributes one structural replay. It does not cover a Phase-A seat
that is partially authored or actively touching the old scanner when PB1 is
ready to land. Such a seat is not in `r`, yet it cannot safely continue across
the scanner replacement and its rework/collision cost is not represented.

Required clarification: Gate 2 must record both closed and in-progress Phase-A
seats, establish a quiescent PB1 landing boundary, and require partial work to
be rebased/restarted on PB1 before author closure. Price that work separately;
do not count it as a closed-wave S-grade replay or permit concurrent edits to
the shared scanner.

### 5.3 Re-audit disposition

The original A-01–A-08 findings are discharged, and no defect was found in the
amended public surface, dependency lattice, feature ownership, diagnostics,
overlay gates, proof-rail applicability, or acknowledgement-gated BBNF
boundary. RA-A1 and RA-A2 are new confirmed formation defects; RA-A3 is a
required replay clarification. Because the exact seed and occurrence identity
define what Gate 1 would authorize, neither may be deferred to PB0
implementation.

**REJECT**

## 6. FINAL PACKET RE-AUDIT — 2026-07-21

This final pass challenged the now-pinned Gate-1 packet: amended
`ADDENDA-02.md`, `formation/l4-root-seed-manifest.json`, and
`formation/l4-root-seed-research.md`, together with this Audit-A history and
the complete authority chain. It did not read or communicate with the other
auditor. Acceptance below is one independent GREEN challenge of the packet;
it is not owner ratification and does not authorize PB0 by itself.

### 6.1 Mechanical seed reproduction

All declared mechanical invariants reproduced:

| check | independent result |
|---|---|
| canonical manifest payload SHA-256 | `16c5fc8c57d5f092096a8060024e3884b9474aa941aef8389ac3e0d94b7026ce` — exact match |
| JSON/schema parsing | valid `value.pi.l4-root-seed/v1`; no placeholder digest |
| root rows | 21 |
| root IDs / exact paths | 21/21 unique |
| root path order | exact unsigned-UTF-8 ascending order |
| family ledger | unique ordinals 1–14 in order |
| routed coverage | every ordinal 1–14 reached; no invalid ordinal or unrouted root |
| duplicate source identities | no duplicate Git blob OID or raw SHA-256 |
| total pinned root bytes | 2,346,941 |
| root Git evidence | all 21 path memberships, blob OIDs, byte counts, and SHA-256 values match the pinned commit tree |
| pinned HTTPS evidence | all 21 raw URLs independently refetched; every byte count and SHA-256 matches both manifest and Git object |

A fresh bare repository fetched the exact object from
`https://github.com/w3c/csswg-drafts.git`. The object type is `commit`; its raw
body re-hashes to
`c7573530343759ace8e46438a1fa2c44515b5554`; its parsed tree is
`75bf19c016ed98126381508073de6893c9f756f5`; its parent is
`df2c8d991cdad3582adb549bae076d7a05104ced`; and strict fsck is clean. This is
independent of the BBNF epoch-5 commit label and confirms the seed's official
commit-to-tree edge.

The declared route counts also reproduce: families 1–14 have respectively
`1,1,3,2,1,3,3,5,2,4,1,3,2,3` direct roots. These are routing counts, not
occurrence or implementation credit.

### 6.2 Seed minimality, maturity, and route challenge

The 21-root set is minimal under its declared root rule, not under a false
whole-universe claim. Every row directly seeds at least one owner family or a
mandatory Syntax/Values foundation. Operative earlier levels, referenced
position/path/property-registration sources, amendments, and other normative
dependencies are deliberately left to PB0's content-addressed fixed-point
closure. Removing any singleton-routed root would orphan its family; the
multi-routed roots have direct syntax ownership that is not supplied merely by
their eventual dependencies. No ambient directory enumeration, BBNF label,
WPT route, generated HTML, browser result, or branch HEAD participates.

The manifest's `Status`, `Work Status`, shortname, level, and title values match
the headers in all 21 pinned Bikeshed sources. Root-level classifications keep
experimental/working/current/foundation and explicit-owner-extension status
visible; PB0 still owes occurrence-level maturity and terminal dispositions.
In particular, Color 5, Values 5, animation triggers, scroll animations, and
other beyond-literal-Level-4 roots enter only because the owner's fourteen-
family order explicitly requires those extensions. They do not silently gain
stable status.

The exact tree-wide `spring(` search still returns zero carriers. The easing
root is consequently marked
`VERIFIED_ROOT_WITH_UNRESOLVED_OWNER_FEATURE`, and the packet gives `spring()`
no grammar or semantic credit. PB0 must retain that owner requirement RED until
an E-3-governed exact external/historical pin, an owner-ratified
preserve/delegate/refuse disposition, or a scope correction exists. Remembered
syntax and BBNF labels remain forbidden substitutes. This is honest scope
accounting, not a missing root concealed by 14/14 routing.

### 6.3 Seed versus PB0 boundary

The packet now draws the boundary mechanically:

- Gate 1 freezes only the exact root seed, deterministic closure algorithm,
  wave architecture, maximum-eight-door surface, cost anchor, and permission
  to prototype PB0.
- PB0 still owns normative fixed-point materialization, all newly reached
  source digests, exact carrier/operation extraction, occurrence bijection,
  maturity/support review, fixtures/oracles, surface type closure, diagnostics,
  limits, browser pins, exchange schema, and cost re-estimate.
- PB0 receives one structural check plus two semantic audits; only the later
  owner Gate 2 can authorize PB1+.

The manifest does not claim that 21 roots, 14 family routes, source hashes, or
module names are a denominator or expected AST. There is no remaining
seed-before-Gate-1/PB0-after-Gate-1 circle.

### 6.4 Repair and regression verification

- **RA-A1 repaired:** the exact manifest is attached, its digest is pinned in
  the sheet and research, and this pass challenged its identity, coverage, and
  boundary before Gate 1.
- **RA-A2 repaired:** `carrier kind` is restored to the stable operation-row
  identity. The root-adjudicated overlap refinement is explicit: recorded
  containment/reference or different-operation overlap is allowed; duplicate
  or ownership-ambiguous overlap remains RED.
- **RA-A3 repaired:** Gate 2 freezes provisional exposure and a quiescence/
  rebase plan; PB1 landing triggers replay; final PB1 close records the actual
  accepted-wave set `r`, `r+1` mechanical units, `2r` fresh passes, evidence,
  repair work, and cost. In-progress work quiesces and rebases before its
  ordinary first close rather than being miscounted as replay.
- Original A-01 through A-08 remain discharged: one shared scanner,
  cross-door boundary equality, overlay identity/range/acyclicity, complete
  diagnostic shape, executable WPT prerequisites, exact PB12 dependencies,
  E-3 pre-Gate-1 challenges, and nominal-not-floor cost language all remain
  present.

The foreign-code timing contract is now honest. Parser-owned traversal of
inert declarative data is bounded and unconditional; accessors are rejected by
descriptor inspection where possible; thrown or returning callbacks/proxies
map deterministically when control returns; and no synchronous parser promises
termination for deliberately non-returning foreign code. Adapter invocation
is explicit and conditional rather than smuggled into parse validity.

No count or lattice regression was found: 17 units = 11 L + 3 L/XL + 2 M/L +
1 M; nominal subtotal 31; 14 PB1–PB12b feature closures = 28 initial audit
passes; eight unique L4 runtime doors; fourteen routing families; PB9a/b,
PB12a/b, and PB13G/P remain required splits. The legacy 52-export and
37-symbol seams remain isolated.

The BBNF boundary also remains correct: official CSSWG bytes were verified
independently; epoch-5 semantic/denominator/WPT claims are excluded; exchange
is owner/thread-mediated, acknowledgement-gated, and content-addressed; and no
cross-repository source, runtime, polling, or mutation is authorized.

### 6.5 Final disposition

No confirmed defect, unresolved required clarification, arithmetic failure,
scope laundering, or new contradiction remains in this Gate-1 packet. The
packet is fit to join the peer challenge and root gestalt adjudication. Gate 1
still requires those process conditions and an explicit owner decision; this
verdict authorizes no implementation on its own.

**ACCEPT**

## 7. FRESH FINAL PACKET RE-AUDIT — 2026-07-21 (seed v2)

This pass treats the preceding acceptance as stale. It independently challenged
the current `ADDENDA-02.md`, `formation/l4-root-seed-manifest.json` v2,
`formation/l4-root-seed-research.md`, this Audit-A history, and the authority
chain. It did not read or contact the other auditor. No packet or prototype
file was edited by this pass.

### 7.1 Mechanical reproduction

The v2 identity and selection arithmetic reproduce exactly:

| check | independent result |
|---|---|
| canonical payload SHA-256 | `e4bd163933d5b88d8a4b4b06290bf86934f4183e714b24b61f4d0155aa982d5a` — exact match |
| root rows / IDs / paths | 76 / 76 unique / 76 unique |
| canonical root ordering | exact unsigned-UTF-8 path order |
| total root bytes | 9,008,216 |
| Snapshot stability members | 64 unique |
| band counts | 24 official + 8 reliable + 10 fairly-stable + 22 rough = 64 |
| explicit owner roots | 21 |
| Snapshot/owner overlap | 10 |
| additive owner extensions | 11 |
| scope-evidence roots | 1 |
| union arithmetic | 64 + 11 + 1 = 76 |
| routed families | every ordinal 1–14; no invalid or unrouted row |
| source forms | 72 Bikeshed + 2 legacy source HTML + 2 immutable HTML-only = 76 |

An independently written Snapshot parser sliced the pinned
`css-2026/Overview.bs` at the four exact markers, parsed the first top-level
membership `<dl>` in each band, collected only top-level `<dt>` TR links,
applied exactly the five declared aliases, and resolved the three source forms
in priority order against the pinned tree. It reproduced all four manifest
path sets exactly at 24/8/10/22. The Snapshot source itself independently
hashes to
`2d2a7c2704a29e90f06b769f9f514ed03a50318743e97e9e5359879a7793d6f8`.

A fresh bare fetch from `https://github.com/w3c/csswg-drafts.git` re-hashed
commit `c7573530343759ace8e46438a1fa2c44515b5554`, parsed tree
`75bf19c016ed98126381508073de6893c9f756f5`, parsed parent
`df2c8d991cdad3582adb549bae076d7a05104ced`, and passed strict fsck. All 76
manifest path memberships, blob OIDs, byte counts, and SHA-256 values match the
Git objects. All 76 commit-pinned HTTPS sources were also independently
refetched; all 9,008,216 bytes and all 76 SHA-256 values match.

The reverse-consumer and at-rule signal rows reproduce mechanically:

- `propdef`: Grid 2 = 10, Flexbox 1 = 13, Text 4 = 33, Box 4 = 5,
  Logical 1 = 22;
- literal `@`: Fonts 3 = 85, Counter Styles 3 = 203, Namespaces 3 = 25,
  Conditional 3 = 77, Page 3 = 258.

These counts remain signals rather than carriers or denominator credit.

### 7.2 Selection-bias and exclusion challenge

The old forward-only source-selection defect is repaired **at the root-set
level**. The four-band union includes independent modules that consume the
Syntax/Values foundations even when no family root points forward to them.
Grid, Flexbox, Logical, Fonts, Counter Styles, Namespaces, and other independent
property/rule owners are now immutable inputs to PB0 rather than invisible
reverse dependencies. Snapshot membership, source status, work status, and
owner-extension classification remain separate, so inclusion does not launder
stability or implementation credit.

The three named exclusions are candid under the proposed Snapshot-based scope:

- Text 4 is absent from all four band lists, but pinned Snapshot line 960
  normatively names only `hyphenate-character`. Its exact source blob/hash and
  33-`propdef` signal are recorded; PB0 may follow that exact feature carrier
  without promoting the whole module.
- Box 4 has no band membership, safe-release reference, or owner route. Its
  exact five-`propdef` source is recorded as outside the proposed root scope.
- Page 3 likewise has no band or owner route. Its 258-`@` signal is recorded;
  official CSS2 remains the baseline `@page` source, while later Page 3 needs a
  normative closure edge or E-3 scope change.

Thus the exclusions are not hidden denominator holes. They are scope choices
presented for Gate-1 owner ratification. If the owner intends every live CSSWG
draft rather than the pinned Snapshot stability union plus named extensions,
Gate 1 must reject that scope explicitly; the packet does not silently claim
those excluded whole modules.

The wider tree still contains zero literal `spring(` carriers. Easing 2 remains
`VERIFIED_OWNER_EXTENSION_ROOT_WITH_UNRESOLVED_OWNER_FEATURE`, and no grammar
or semantic credit is claimed. Spring must stay RED pending exact external/
historical evidence, an owner-ratified preserve/delegate/refuse disposition,
or E-3 scope correction.

### 7.3 Confirmed packet defects

#### V2-A1 — CONFIRMED DEFECT: CSS2's frozen module-level field is corrupt

The v2 manifest records `root-css2.module_level` as the string `"Status: ED"`.
The pinned source has a blank `Level:` line followed by `Status: ED`; the
generator consumed the next metadata line as the level value. `"Status: ED"`
is neither a module level nor the manifest's explicit `"none"` sentinel.

This is not a hash failure, but it is a false frozen source fact in the exact
Gate-1 artifact, and level resolution is part of `ADDENDA-02 §1.1`. Repair the
value to a schema-defined CSS2 level/sentinel, add validation that a blank
metadata field cannot consume the next key, recompute the manifest digest, and
rerun both packet challenges.

#### V2-A2 — CONFIRMED DEFECT: the expanded source scope is not closed by the ratified wave-owner topology

The manifest now marks **64** Snapshot modules for
`typed_registry_consumer_scan`; **68** roots route to family 8 and **19** route
to family 10. This successfully makes their declarations, descriptors, and
at-rules visible. The wave sheet still routes all family-8 work only to the PB2
kernel and PB12b, and all family-10 work only to PB1 and PB12a.

That is incompatible with the same sheet's hardened anti-god boundary:

- PB2 is kernel-only and cannot own terminal semantics.
- PB12b is required to be a thin total registry over **feature-owned** terminal
  adapters, but there are no owner waves for known font, grid, flex, text,
  counter/list, alignment, sizing, and other Snapshot-module terminal
  families.
- PB12a is required to be a thin rule registry over **feature-owned** rule
  adapters, but the expanded scope now knowingly includes independent
  `@font-face`, `@counter-style`, `@namespace`, baseline `@page`, and other rule/
  descriptor owners not assigned to PB3–PB11.

PB0 may discover the exact carrier count, but these module classes are already
known in the Gate-1 seed. Letting PB12a/PB12b absorb them would recreate the god
waves HL4-10 forbids; preserving/refusing all of them would not discharge a
"full typed declarations/current at-rule" implementation. The generic VDS
kernel removes per-property switches, but it does not eliminate feature-
specific terminals, descriptors, rule bodies, or prose-defined grammars.

The authority problem is concrete: Gate-1 decision 2 asks the owner to ratify
the current corrected lattice, while Gate 2 asks for a cost re-estimate but not
an occurrence-derived owner-wave lattice re-ratification. The 17-unit topology
and nominal 31-day subtotal therefore read as the Phase-B plan even though the
known v2 scope cannot truthfully close through its thin PB12 joins.

Required repair, either:

1. add the missing module/terminal/rule adapter waves now; or
2. mark PB1+ as an explicitly provisional topology skeleton, authorize only
   PB0 at Gate 1, and make an occurrence-derived E-3 addendum with two
   challenges, root gestalt, updated grades/cost, and explicit owner
   ratification a mandatory checkpoint after PB0 and before Gate 2/PB1.

Under option 2, Gate-1 decision 2 must not ratify PB2–PB13 as a final lattice,
Gate 2 must include the exact expanded owner-wave topology, and the nominal 31
must be labelled the pre-PB0 skeleton subtotal. PB0's known 76-root input also
needs an honest grade review rather than silently retaining the old narrow-
seed L estimate.

### 7.4 Other contract regression checks

No additional regression was found:

- Gate 1 still authorizes PB0 only after two packet challenges and root E-3
  adjudication; Gate 2 alone can authorize PB1+ after PB0's structural check
  and two semantic audits.
- The 76 roots remain inputs, not an occurrence denominator or expected AST;
  PB0 still owns fixed-point closure, exact carriers, operation bijection,
  support/maturity, fixtures/oracles, surfaces, diagnostics, limits, browser
  pins, coordination schema, and cost.
- The operation key retains carrier kind and the explicit overlap refinement.
- The legacy 52-export/37-symbol seam, separate maximum-eight-door L4 barrel,
  one shared scanner, cross-door interval equality, parse-local recovery,
  overlay identity/range/acyclicity, edit carrier, complete diagnostic shape,
  WPT prerequisite rule, hostile/no-throw limits, PB9/PB12/PB13 splits, and
  semantic/performance separation remain intact.
- Phase-A replay membership is frozen at PB1 close; accepted waves replay,
  while in-progress work quiesces/rebases before its ordinary first close.
- Foreign non-returning code is honestly outside unconditional synchronous
  termination, while parser-owned inert traversal stays bounded.
- BBNF exchange remains owner/thread-mediated, acknowledgement-gated, and
  content-addressed; no epoch-5 semantic label, source patch, generated
  runtime, polling, or cross-write gains authority.

### 7.5 Final disposition

The v2 root selection is authentic and materially better, and its explicit
Snapshot scope/exclusions are auditable. It is not yet a GREEN Gate-1 packet:
V2-A1 freezes one false metadata fact, and V2-A2 leaves the now-visible typed-
declaration/current-at-rule breadth without a non-god owner-wave and cost
ratification checkpoint. Both defects affect what Gate 1 asks the owner to
ratify and must be repaired before the two challenges can be GREEN.

**REJECT**

## 8. POST-V2 REPAIR RE-AUDIT — 2026-07-21

This pass independently re-challenged the current Gate-1 packet after the two
confirmed v2 defects. It read the amended addenda, current seed manifest and
seed research, but did not read or contact the other auditor. It edited no
packet, prototype, or source file.

### 8.1 Manifest identity, source bytes, and metadata repair

The current canonical payload independently hashes to
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`,
exactly matching `manifest_content_digest` and every packet citation. The
digest calculation removed only the top-level digest field, recursively sorted
object keys, preserved array order, serialized compact UTF-8 JSON, and applied
SHA-256.

The remaining mechanical facts reproduce without exception:

| check | independent result |
|---|---|
| roots / IDs / paths | 76 / 76 unique / 76 unique |
| root order | exact unsigned-UTF-8 path order |
| routed families | ordinals 1–14 all present; no invalid or unsorted row |
| root bytes | 9,008,216 |
| source forms | 72 Bikeshed + 2 legacy source HTML + 2 HTML-only |
| Snapshot bands | 24 official + 8 reliable + 10 fairly-stable + 22 rough = 64 |
| owner union | 21 owner roots, 10 overlap, 11 additive, plus 1 scope root = 76 |
| official Git edge | commit `c7573530343759ace8e46438a1fa2c44515b5554`, tree `75bf19c016ed98126381508073de6893c9f756f5`, parent `df2c8d991cdad3582adb549bae076d7a05104ced` |

A fresh bare fetch from the official CSSWG remote re-hashed the commit and
tree and passed strict fsck. All 76 path memberships, Git blob OIDs, byte
counts, and SHA-256 values match the pinned Git objects. A separate fresh HTTPS
read of all 76 raw GitHub objects also matched all 9,008,216 bytes and all 76
hashes.

The four Snapshot sections were independently reparsed from the pinned source:
exact section markers, first membership `<dl>`, top-level `<dt>` TR links, only
the five declared aliases, and the declared source-resolution priority. The
resulting path sets match the manifest exactly at 24/8/10/22. Exact-path arrays
and every per-root family array are canonically ordered.

V2-A1 is fully repaired. The pinned CSS2 header is physically:

```text
Title: Cascading Style Sheets (CSS) Level 2
Shortname: css2
Level:
Status: ED
Work Status: Stable
```

The manifest now records `module_level: "none"`, while
`source_maturity.source_status` remains `ED` and
`source_work_status` remains `Stable`. An independent line-by-line parser
compared `Title`, `Shortname`, `Level`, `Status`, and `Work Status` against all
72 Bikeshed rows: every present value matches its manifest field, blank level
normalization is confined to its own physical line, and zero values begin with
or consume another metadata key. Scanning all four non-Bikeshed source forms
found no additional line-crossing candidate or physical-header mismatch. The
resolver and research now state the same line-bounded rule, so the repair is
both present in the artifact and reproducible.

The representative reverse-consumer signals remain exact at
`10/13/33/5/22`, the independent at-rule signals remain
`85/203/25/77/258`, and no literal `spring(` carrier exists in the pinned
`*.bs` tree. These are still evidence signals, not denominator credit.

### 8.2 Adversarial topology and gate challenge

V2-A2 is fully repaired by making uncertainty an explicit gate boundary rather
than pretending the narrow lattice closes the wider seed:

- Gate 1 authorizes **PB0 only**, and PB0 is honestly regraded **L/XL** for the
  76-root formation input. No PB1+ feature prototype is authorized.
- PB1–PB13, the 17-unit count, the 31-day arithmetic, and the 28-pass count are
  expressly a provisional pre-PB0 planning skeleton. The sheet says they are
  neither a closed author census nor a lifecycle floor and that Gate 1 does not
  ratify their topology, grades, audit count, or cost.
- PB0 must assign every reviewed terminal, descriptor, and rule adapter to a
  non-god feature owner in an occurrence-derived wave/cost addendum. The sheet
  requires added or split feature-owner waves wherever the frozen matrix calls
  for them. PB12a and PB12b remain thin joins and are expressly forbidden from
  absorbing missing owners.
- That derived addendum must receive two independent assume-faulty challenges
  and root gestalt adjudication. Gate 2 then requires the owner's explicit
  ratification of the sealed occurrence lock, revised owner-wave lattice, exact
  audit count, and cost re-estimate before PB1 or any later code.

The graph now labels itself a pre-PB0 skeleton, places `1+2` PB0 reviews and
the derived-wave E-3 checkpoint before owner Gate 2, and denies authority to
every displayed post-PB0 node. The two decision ledgers agree: Gate 1 asks for
the algorithm/seed, PB0 L/XL, the skeleton only as a planning hypothesis, the
bounded surface, PB0-only permission, and the two-gate/coordination rules;
Gate 2 alone asks for the exact lock, matrices, contracts, limits, audited
derived lattice/cost, replay plan, and PB1+ permission. Silence, partial
acceptance, Phase-A work, and coordination receipt cannot substitute for either
decision.

The provisional arithmetic itself is correct: 17 rows = 10 L + 4 L/XL + 2
M/L + 1 M; the declared lower anchors yield `10×2 + 4×2 + 2×1 + 1 = 31`;
and the provisional PB1–PB12b census contains 14 feature closures, hence 28
passes. Crucially, each number is now explicitly superseded by PB0's
row/fixture-derived topology and estimate. This preserves KISS: one kernel and
thin registries remain shared, while feature-specific terminal and rule
semantics cannot be hidden inside PB2 or either PB12 join.

### 8.3 Prior-contract regression check

No new defect or regression was found. The root seed remains an input rather
than an AST or operation denominator; PB0 still owns normative fixed-point
closure, operation bijection, reviewed support, fixtures/oracles, diagnostics,
limits, browser pins, surface/types, coordination schema, and pricing. Text 4,
Box 4, and Page 3 exclusions remain explicit and the unresolved spring feature
remains RED.

The frozen 52-export/37-symbol legacy seam, at-most-eight-door L4 surface, one
shared scanner, goal-neutral CST, same-document dense overlays, edit carrier,
cross-door boundary equality, parse-local recovery, exact diagnostic shape,
hostile/no-throw limits, WPT prerequisite rule, semantic/performance split,
and conditional Phase-A replay ledger remain intact. Every feature closure in
the final derived topology receives two E-1 passes. BBNF coordination remains
owner/thread-mediated, acknowledgement-gated, and content-addressed, with no
polling, cross-write, source/runtime import, or semantic authority by receipt.

### 8.4 Final disposition

Both prior confirmed defects are discharged, the amended gate topology is
internally consistent, and no further confirmed defect or required
clarification remains. This is Audit A's GREEN packet challenge only. It does
not ratify Gate 1, authorize PB0, satisfy the independent peer challenge, or
replace root gestalt and the owner's explicit decision.

Model-served receipt: inherited Codex audit route; exact backend alias was not exposed to this seat.

**ACCEPT**
