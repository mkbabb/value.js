# V·π ADDENDA-02 — independent adversarial challenge B

2026-07-21 · target: `ADDENDA-02.md` · disposition-only review · no
implementation. This pass read the complete authority chain named by the task
and did not inspect or communicate with the other addenda auditor.

## 0. Verdict

**REJECT.** The proposal retains most of the harden seat's corrected
architecture, and its wave/count arithmetic is internally accurate. It is not
yet safe for Gate 1, however, because five load-bearing contracts admit
incompatible implementations:

1. The Gate-1 source rule is descriptive, not a deterministic standards
   selection rule; PB0 can produce different supposedly complete universes
   while obeying it.
2. The PB0 matrix alternates between source-occurrence identity and
   source-operation identity, so its promised bijection is not mechanically
   defined.
3. PB1 is required both to be the sole shared scanner and merely to replace
   trivia "for the L4 path," leaving the forbidden two-scanner outcome legal.
4. `parseStylesheetL4` has two parallel final owners without a frozen raw-versus-
   typed result boundary or a single integration owner.
5. The stated cost excludes the Phase-A revalidation that the proposal itself
   makes mandatory after PB1, so the arithmetic is a correct subtotal presented
   beside a false totality claim.

These are formation defects, not implementation details PB0 may safely choose.
They must be repaired in the proposal and both challenges rerun before root
gestalt adjudication or owner Gate 1.

## 1. Total-tranche / gestalt analysis

### B-C1 — CONFIRMED: Gate 1 does not select one reproducible CSS universe

The proposal says PB0 will materialize the universe "needed to discharge all
fourteen" families and include the Level-4 modules and extensions "needed" by
those families (`ADDENDA-02.md:44-56`). It correctly says the fourteen families
are not the denominator (`ADDENDA-02.md:58-61`, `224-225`), but it then uses
those same families as the rule deciding which modules enter the denominator.
There is no exact root module set, standards snapshot/date rule, normative-
reference closure rule, replacement/supersession rule, or tie-break for a
module spanning multiple levels. "At the pin" has no pin in this sheet.

This does not satisfy the harden requirement for **one exact scope**
(`formation/harden-l4.md:54-88`). Two PB0 authors can lawfully choose different
source-object sets, especially for typed declarations whose grammar reaches
well beyond the named color/effects/image/transform families. Both could claim
a complete bijection because completeness is evaluated only after each has
chosen its own objects. Gate 2 cannot repair selection bias that Gate 1
authorized.

**Required repair:** Gate 1 must ratify a deterministic selection algorithm:
an exact root module/version manifest (or content-addressed root query), the
normative-reference closure rule, level replacement precedence, draft/obsolete
inclusion predicates, and exclusions. PB0 may still materialize and price that
closure for Gate 2; it may not choose the closure ad hoc.

### B-C2 — CONFIRMED: the occurrence bijection has two different domains

The sheet calls every row "a source occurrence," includes `operation` in the
stable identity, promises a bijection from source occurrences to rows, and then
assigns each row an operation vector plus separate serialization dispositions
(`ADDENDA-02.md:63-86`). One fragment can normatively govern parse acceptance,
recovery, exact serialization, and canonical serialization. If that fragment
becomes one row, `operation` is not part of row identity and the row contains
multiple operations. If it becomes one row per operation, the mapping from raw
source occurrences is one-to-many, not the promised bijection.

The unconditional rule that overlapping rows are RED (`ADDENDA-02.md:77-79`)
also rejects legitimate nested carriers unless "occurrence" is first defined
as an operation-atomic extracted carrier rather than an arbitrary byte span.
This ambiguity originated in HL4-1 (`formation/harden-l4.md:31-53`), so root
adjudication must correct the governing contract rather than asking PB0 to
guess.

**Required repair:** define the denominator domain as exact
`(source object, carrier fragment/span, carrier ordinal, operation)`
obligations; define how one fragment is split across operations; make identical
keys/ambiguous ownership RED; and distinguish forbidden duplicate overlap from
legitimate nested or cross-referenced carriers. State the bijection over those
operation obligations, not over unspecialized source occurrences.

### B-C3 — CONFIRMED: PB1 still permits two CSS-source scanners

HL4-4 is categorical: PB1 **replaces, rather than wraps, the W0 trivia leaf**,
and all feature grammars consume the one PB1 token owner
(`formation/harden-l4.md:109-130`). The proposal instead says PB1 replaces
`skipBlockComments` "for the L4 path" (`ADDENDA-02.md:163`) while preserving a
separate Phase-A path. Later text calls PB1 the final shared substrate and
requires Phase-A gates to rerun (`ADDENDA-02.md:216-220`), and the parsimony
rule says one scanner (`ADDENDA-02.md:289-294`). Those statements cannot all be
implemented literally.

This is not cosmetic. A legacy scanner plus an L4 scanner permits comment,
escape, preprocessing, offset, and limit behavior to diverge while every named
gate appears GREEN. It also defeats the architectural reason PB1 was moved
before final Phase-A closure.

**Required repair:** say that PB1 replaces W0's destructive trivia contract in
the shared lexical substrate; Phase-A grammar adapters consume that owner while
retaining their 52 signatures and legacy result semantics. Require rerunning
W0 plus every already-authored Phase-A wave's born-RED, differential, no-throw,
and two E-1 passes after the replacement.

### B-C4 — CONFIRMED: the recovered stylesheet door has concurrent final owners

The public-surface table assigns `parseStylesheetL4` jointly to PB12a and PB12b
(`ADDENDA-02.md:120-129`). The wave table allows PB12a and PB12b to author in
parallel (`ADDENDA-02.md:175-176`), and the lattice repeats that they may close
in parallel (`ADDENDA-02.md:200-208`). PB12a owns the recovered rule document;
PB12b owns typed overlays. The result contract does not say whether the public
stylesheet door returns only the goal-neutral CST, a CST plus one overlay, or a
sheet whose registered custom-property context can trigger later retyping.

This creates a shared-file/shared-contract collision precisely at the mandatory
PB12 anti-god split. It also conflicts with PB0's rule that each denominator row
has exactly one owner wave (`ADDENDA-02.md:79-86`).

**Required repair:** freeze one of two KISS boundaries before Gate 1: either
(a) PB12a solely owns a raw recovered `parseStylesheetL4` and PB12b exposes
typing through `parseCssTypedValue`/overlay operations, or (b) PB12a produces a
private recovered document and PB12b, after PB12a, solely integrates the public
typed sheet door. Do not give one runtime door two parallel final owners.

### B-C5 — CONFIRMED: cost arithmetic omits a mandatory Phase-A replay

The numeric subtotal is correct: 11 L + 3 L/XL + 2 M/L + 1 M is 17 author
units; treating L/XL at the L floor and M/L at the M floor yields
`22 + 6 + 2 + 1 = 31` author-seat-days. PB1 through PB12b contain 14 feature
closures and therefore 28 first-pass E-1 audits (`ADDENDA-02.md:332-345`).

The completeness claim is not correct. PB1 requires any earlier Phase-A wave
to rerun its structural, born-RED, differential, and E-1 gates
(`ADDENDA-02.md:216-220`), yet the cost section says "Phase-A cost is unchanged
and not included" (`ADDENDA-02.md:345-346`). Once any W1–W5 author/audit has
closed before Gate 2, PB1 creates new Phase-B-caused replay work. The plan is
already designed to permit that provisional authoring.

**Required repair:** keep 31 explicitly as the Phase-B author-unit floor, then
add a conditional replay ledger: W0 structural rerun; two new E-1 passes for
each Phase-A feature wave authored before PB1; differential/born-RED reruns;
and later W6/W7 close work on the shared substrate. Gate 1 needs that exposure
even if exact effort remains conditional.

### Gestalt positives retained

The following boundaries are optimal and should survive repair:

- the exact 52-export legacy barrel and separately censused L4 barrel
  (`ADDENDA-02.md:108-134`);
- PB2 kernel closure separated from PB12b terminal closure
  (`ADDENDA-02.md:164`, `176`, `206-208`);
- dense goal-specific overlays rather than cloned or mutated CSTs
  (`ADDENDA-02.md:136-145`);
- mandatory PB9a/PB9b and PB13G/PB13P splits
  (`ADDENDA-02.md:171-180`);
- operation refusals for cascade/DOM/layout/fetch rather than parser-disguised
  evaluators (`ADDENDA-02.md:34-38`);
- content-addressed, acknowledgement-gated BBNF coordination with current RED
  epoch-5 semantics excluded (`ADDENDA-02.md:296-330`).

## 2. Wave-set / addendum analysis

### 2.1 Gate falsification matrix

| claim | adversarial result |
|---|---|
| Gate 1 authorizes PB0 only | **PASS.** Lines 9-14 and 350-358 make the limit explicit. |
| Gate 1 ratifies a usable scope rule | **FAIL (B-C1).** The rule has no reproducible source-selection closure. |
| Gate 1 ratifies a sound occurrence method | **FAIL (B-C2).** Row identity and bijection domains disagree. |
| Gate 1 can rely on the stated lattice/cost | **FAIL (B-C3/B-C5).** Scanner replacement and replay cost are inconsistent. |
| Gate 1 caps the initial L4 runtime surface at eight doors | **PASS.** The eight are enumerated; a ninth routes to E-3 (`ADDENDA-02.md:116-134`). |
| Gate 2 cannot occur before PB0 review | **PASS.** One structural check, two semantic audits, repair/repeat, and explicit owner ratification are required (`ADDENDA-02.md:94-106`). |
| Gate 2 freezes exact surface/result/limits/diagnostics/cost | **PASS CONDITIONALLY.** The decision ledger is complete (`ADDENDA-02.md:360-370`) once B-C1/B-C2 define what is being frozen. |
| Coordination receipt silently ratifies either gate | **PASS.** It is expressly excluded (`ADDENDA-02.md:372-373`). |
| BBNF exchange can begin despite its task boundary | **PASS.** Active-task acknowledgement is a precondition and repository polling/writes/imports are forbidden (`ADDENDA-02.md:296-300`, `323-330`). |

**Required clarification B-R1:** make the E-3 precondition local to Gate 1:
the two independent challenges of this addendum plus root gestalt adjudication
must be GREEN before the owner can ratify. E-3 already imposes this
(`HANDOFF.md:55-60`), but `ADDENDA-02.md:350-358` currently reads as an
immediate owner decision request.

### 2.2 Count, dependency, and audit arithmetic

- **Wave count:** PASS. The IDs expand to 17 closable units: PB0, PB1, PB2,
  PB3, PB4, PB5, PB6, PB7, PB8, PB9a, PB9b, PB10, PB11, PB12a, PB12b, PB13G,
  PB13P.
- **Grade count:** PASS. The 11/3/2/1 partition in
  `ADDENDA-02.md:334-339` sums to 17.
- **Author floor:** PASS AS A LOWER-BOUND SUBTOTAL. The 31-day arithmetic is
  correct, but XL has no Phase-A planning band and B-C5 prevents using 31 as a
  lifecycle estimate.
- **Feature audit count:** PASS AS A FIRST-CLOSE SUBTOTAL. PB1–PB12b are 14
  feature units, hence 28 passes. PB0 correctly adds one mechanical check and
  two semantic audits. PB13G/P are proof waves, not new feature implementations,
  so E-1 does not mechanically add four passes. Addendum-formation challenges
  and Phase-A replay passes are separate and should be reported, not hidden.
- **Dependency lattice:** PASS except B-C4. PB2/PB3/PB7 fan only after PB1;
  PB4 breaks the matcher-terminal cycle; W2/W3 gate their L4 extensions; PB9a
  owns path before PB9b/PB11; PB12 waits on all terminal/rule owners; PB13G/P
  wait on both PB12 halves.
- **Concurrency:** PASS. Four author seats and three foundation-close seats are
  consistent with the lattice. "Sole seat" is read as a dedicated author seat,
  not a global concurrency barrier.

### 2.3 Born-RED soundness

The born-RED rows are materially testable: they name token partitions, exact
and edit preservation, work `+1`, nullable cycles, precedence, substitution
cycles, maturity flags, forgiving selectors, capability refusals, path stray
input, resource nodes, terminal closure, diagnostics, and performance evidence
(`ADDENDA-02.md:160-178`). The gates do not use browser support as a grammar
vote and do not let performance waive semantics.

Two mechanical holes remain:

**B-R2 — internal-error fixture semantics.** PB0 must give every diagnostic
code a direct fixture while any `internal_error` in the conformance or hostile
corpus is RED (`ADDENDA-02.md:255-260`); PB13G also requires every diagnostic
path reached while no internal error remains (`ADDENDA-02.md:177`). Specify a
fault-injection-only unit fixture for the outer-catch mapping and ban
`internal_error` only from ordinary conformance/hostile execution. Otherwise
the two close requirements appear contradictory.

**B-R3 — argument-shape hostility.** "Non-strings" is insufficient for
structured public doors such as `serializeCss`: malformed documents, foreign
document IDs, overlapping edits, forged node IDs, invalid modes, cyclic
objects, getters that throw, and hostile provider/adapter callbacks must be in
the per-door arbitrary-runtime corpus. The general no-throw sentence at
`ADDENDA-02.md:248` is correct; lines 249-253 need a per-signature shape rule so
implementers cannot discharge it with parser-string mutations alone.

## 3. Core-contract / per-wave analysis

| wave or contract | adversarial disposition |
|---|---|
| **PB0** | **RED:** B-C1 and B-C2 make denominator totality non-falsifiable. Its two-layer audit, diagnostics, limits, surface, oracle, fixture, and exchange outputs are otherwise complete. |
| **PB1** | **RED:** B-C3 must choose shared replacement, not an L4-only sibling. Parse-local recovery, interval partition, boundary map, stable IDs, exact/edit substrate, and `+1` limits are sound. |
| **PB2** | **GREEN design:** kernel-only close avoids the terminal cycle; private VDS compiler is the one justified second language parser. PB0 must freeze the exact supported VDS meta-grammar subset and ambiguity policy. |
| **PB3** | **GREEN design:** source-preserving numerics and context requirements correctly supersede Phase-A `Number` as semantic authority. Fixtures must distinguish authored non-finite text from non-finite runtime arithmetic. |
| **PB4** | **GREEN design:** already-cascaded provider and bounded cycles prevent cascade simulation. Hostile provider exceptions must be covered by B-R3. |
| **PB5** | **GREEN design:** preserves the concrete legacy door, routes contextual forms to the L4 union, and reuses the numeric color DAG. PB0 maturity/profile rows remain the true close denominator. |
| **PB6** | **GREEN design:** stable versus experimental/obsolete separation and no spring solver are honest. Exact draft identities must come from repaired PB0 scope. |
| **PB7** | **GREEN design:** CST, specificity, forgiving branches, adapter boundary, non-ASCII, edit behavior, and work limits form a complete parser boundary without ambient DOM. |
| **PB8** | **GREEN WITH CLARIFICATION:** condition parsing may close before total property terminals only if a `supports-decl`/style-query leaf preserves a component-value declaration plus a capability requirement; it must not claim full typed support evaluation before PB12b. Freeze that rule in PB0. |
| **PB9a** | **GREEN design:** required split makes one bounded geometry/path owner and rejects reuse of the permissive live tokenizer. |
| **PB9b** | **GREEN design:** effects depend on shared geometry/color/numeric identities and make URL/layout requirements explicit. |
| **PB10** | **GREEN design:** one image union and gradient engine, deterministic witnesses, and no pixel validity oracle are the correct boundaries. |
| **PB11** | **GREEN design:** path reuse, order preservation, capability seams, and no decomposition parser dependency are complete. |
| **PB12a** | **RED at public seam:** recovered-rule responsibilities are sound, but B-C4 leaves the stylesheet runtime ownership/result contract unresolved. |
| **PB12b** | **RED at public seam:** registry closure and dense typed overlays are sound, but B-C4 leaves its relationship to `parseStylesheetL4` unresolved. |
| **PB13G** | **GREEN design after repairs:** the semantic census correctly rejects throws, hangs, internal errors, unowned rows, failed vectors, and unclassified divergences. Apply B-R2's fault-injection distinction. |
| **PB13P** | **GREEN design:** separate performance evidence cannot waive semantics; new doors report pinned absolute work/allocation/throughput evidence rather than fabricated LIVE parity. |

### Error fidelity and hostile-input disposition

Legacy error-code/`expected[]` fidelity is explicitly preserved
(`ADDENDA-02.md:255-261`). L4 diagnostic rows bind phase-appropriate expected
results and applicable oracles (`ADDENDA-02.md:65-92`, `263-278`). No catch-all
is allowed to turn invalid syntax into apparent GREEN. Subject to B-R2/B-R3,
this meets the generalized R1 crash-class requirement in `ADDENDA-01.md §2`.

### KISS / LOC disposition

The one-scanner, one-CST, one-overlay-table, one-private-matcher, one-numeric,
one-color, one-path, one-condition architecture is the smallest credible shape
for the claimed lossless and typed surface. The mandated PB9/PB12 splits are
cohesive rather than speculative. Per-wave separation of authored and generated
LOC is explicitly required (`ADDENDA-02.md:280-294`). B-C3 and B-C4 are the two
places the current prose can still generate duplicate machinery or collision
work despite those locks.

### Coordination-safety disposition

**PASS.** The proposal does not overrule the active BBNF task's no-contact
boundary, treats object bytes/digests as leads until independently verified,
requires the same content-addressed batch to be accepted by both sides, carries
UTF-8/UTF-16 boundaries, and excludes source/runtime/private novelty transfer
(`ADDENDA-02.md:296-330`). Lack of acknowledgement means no exchange; it does
not silently authorize repository polling or weaken Value's independent PB0
census. This is narrower and safer than `ADDENDA-01.md §3` read in isolation.

## 4. Required disposition

### Confirmed defects to repair before re-audit

1. B-C1: make Gate-1 source selection reproducible and non-circular.
2. B-C2: define operation-atomic denominator identity and overlap semantics.
3. B-C3: make PB1 the shared W0 replacement, not an L4-only scanner path.
4. B-C4: assign `parseStylesheetL4` one final owner and freeze raw/typed sheet
   semantics.
5. B-C5: expose the PB1-caused Phase-A replay cost and audit count.

### Required clarifications

1. B-R1: add addendum challenge + gestalt adjudication as a Gate-1 precondition.
2. B-R2: distinguish the injected outer-catch fixture from RED corpus internal
   errors.
3. B-R3: define hostile runtime shapes for non-string public signatures.
4. PB8: preserve/delegate supports-declaration typing until PB12b rather than
   claiming an unavailable terminal registry.

### Non-blocking suggestions

1. At Gate 2, ratify the PB0 artifact by manifest digest plus audited exception
   ledger, while retaining row-level evidence; this is more reviewable than an
   unauditable claim that the owner manually inspected every row.
2. Give the `L/XL` band an explicit planning floor/range before Gate 2. The
   current 31-day lower bound is arithmetically valid but not a forecast.
3. Name PB13 exchange cadence as PB13G/P rather than the unsplit research label
   `PB13` (`ADDENDA-02.md:323-326`).

REJECT

## RE-AUDIT AFTER AMENDMENT — 2026-07-21

This is a fresh assume-faulty pass over the amended `ADDENDA-02.md`, the full
authority chain, and the findings above. Audit A was not read and its auditor
was not contacted. Only this section is added; the proposal and code remain
untouched.

### Re-audit verdict

**REJECT.** B-C2, B-C3, B-C4, B-R2, and the PB8 preservation boundary are now
repaired. B-C1 and B-C5 are materially improved but not closed. B-R3 was
expanded into an impossible termination promise for arbitrary foreign
callbacks/proxies. Three blockers remain:

1. The deterministic selection algorithm is conditional on a seed manifest or
   query that is not present, named by path/digest, or included in the artifacts
   these two addendum challenges audit.
2. Gate 2 is required to record a replay count and replay evidence that cannot
   exist until PB1 lands, even though Gate 2 is what authorizes PB1.
3. A synchronous JavaScript parser cannot guarantee termination when it invokes
   an arbitrary hostile callback, getter, or proxy trap; parser work counters
   cannot preempt foreign code.

### B-C1 through B-C5 repair verification

#### B-C1 — PARTIAL, STILL RED: deterministic algorithm; unaudited seed

The amendment supplies the missing closure mechanics: exact seed rows/query,
normative-reference fixed point, level supersession rules, maturity predicates,
exclusions, conflict handling, canonical order, and result digest
(`ADDENDA-02.md:43-98`). Given one exact seed and a frozen carrier-classification
policy, two implementations can now be compared mechanically. This is a sound
repair to the former circular prose.

The load-bearing root set is still absent. No seed manifest/query artifact is
present in `pi/`; the proposal gives neither a path nor a digest. The text says
the Gate-1 packet **must** contain it (`ADDENDA-02.md:47-54`) and the owner must
ratify it (`ADDENDA-02.md:446-447`), but Gate-1 eligibility is defined only as
two GREEN challenges plus root gestalt (`ADDENDA-02.md:8-12`, `454-455`). A
seed can therefore be attached after the challenges and change the entire
standards universe without either auditor challenging it. That does not close
E-3 or the original B-C1 requirement that Gate 1 ratify an exact root
module/version manifest.

**Required repair:** place the seed manifest/query in the formation packet with
its path and digest before the challenges rerun, or state that any later seed is
itself part of `ADDENDA-02` and must receive two independent challenges plus
root gestalt before Gate 1. Add the seed's presence/digest to the header's
Gate-1 preconditions. PB0 may materialize the closure; it may not supply or
silently alter the root set that authorizes PB0.

#### B-C2 — GREEN

The denominator is now explicitly keyed by
`(source-object digest, carrier fragment/span, carrier ordinal, operation)`;
multi-operation carriers split into rows; legitimate nested/cross-reference
overlap is distinguished from duplicate ownership; exact/edit/canonical are
independent operation obligations; and the bijection is stated over that
operation-obligation domain (`ADDENDA-02.md:100-142`). This discharges B-C2.

One implementation detail belongs to PB0 rather than formation: when a carrier
uses an exact fragment instead of a byte span, the ordinal must be computed
against a frozen byte order so repeated identical fragments cannot drift. The
current key permits that; PB0's structural audit must enforce it.

#### B-C3 — GREEN

PB1 now owns the **sole shared prototype** scanner, replaces W0 trivia for both
Phase A and Phase B, forbids any parallel scanner and engine-global recovery,
requires token/component boundary equality, and mandates W0 plus already-
authored Phase-A gate/audit replay (`ADDENDA-02.md:218`, `277-284`). This is a
faithful transpose of HL4-4 and closes B-C3.

#### B-C4 — GREEN

`parseStylesheetL4` is now explicitly raw and goal-neutral with PB12a as its
sole final owner (`ADDENDA-02.md:176-185`, `232`). PB12b owns typed overlays and
`parseCssTypedValue`, may consume raw documents, and expressly does not co-own
the sheet door (`ADDENDA-02.md:233`, `263-269`). This is the KISS option (a)
requested by B-C4 and avoids a shared public contract.

If PB12b's optional raw-document consumption becomes mandatory, its close must
depend on accepted PB12a even if both seats still author against a frozen
interface in parallel. As currently written it is optional, so this is not a
present dependency defect.

#### B-C5 — PARTIAL, STILL RED: honest subtotal; impossible Gate-2 timing

The amendment correctly relabels 31 as a nominal band-anchor **subtotal**, not
a lifecycle floor or cap, and prices XL excess, audits, coordination, growth,
adjudication, and rework as unknown (`ADDENDA-02.md:421-426`). The counts remain
correct: 17 author units; 11/3/2/1 grade partition; 31 nominal anchors; 14
PB1–PB12b feature closures and 28 first-close E-1 passes; PB0's one structural
check plus two semantic audits; and two addendum challenges.

The conditional replay formula is arithmetically sound at PB1 close:
`r` already-authored W1–W7 waves imply `r` wave reruns and `2r` fresh passes,
plus W0's structural replay. But the sheet says **Gate 2 records the concrete
wave names, `r`, replay evidence, and resulting cost**
(`ADDENDA-02.md:428-440`). Gate 2 precedes and authorizes PB1
(`ADDENDA-02.md:13-16`, `457-467`). Phase-A waves can continue to close while
PB1 authors, so Gate 2 cannot know the eventual `r`; no post-PB1 replay evidence
can exist at that earlier gate.

Calling every replay an S-grade mechanical unit also does not price adapter
changes required to make already-authored Phase-A grammars consume PB1. PB1's L
unit may own those changes, but the proposal must say so; otherwise only defects
found after replay reopen a wave while expected re-anchoring work is unowned.

**Required repair:** at Gate 2 record the current closed-wave set, a bounded
replay projection, and PB1 ownership of expected grammar-adapter changes. At
PB1 author close, freeze the actual `r`, evidence ledger, and cost before PB1's
audits/any dependent feature close. Either pause new Phase-A author closures at
Gate 2 or update `r` monotonically until PB1 lands. Treat W0's structural replay
as the one W0 S-grade unit, not language that can be read as two W0 executions.

### B-R1, B-R2, B-R3, and PB8 verification

#### B-R1 — GREEN SUBJECT TO B-C1

The header and owner-decision section now both require two GREEN addendum
challenges and root E-3 gestalt before Gate 1 (`ADDENDA-02.md:8-12`,
`454-455`). The addendum itself cannot bypass E-3. B-C1 separately requires the
scope-defining seed to be inside that challenged packet.

#### B-R2 — GREEN

The amendment cleanly separates one explicit fault-injection fixture for the
outer catch from ordinary hostile/conformance vectors, where any
`internal_error` is RED (`ADDENDA-02.md:327-337`). It also freezes the complete
diagnostic field shape and one absence rule (`ADDENDA-02.md:134-142`). There is
no longer a contradictory demand to both observe and forbid ordinary internal
errors.

#### B-R3 — RED AFTER OVERCORRECTION

The signature-specific bank now includes malformed/cyclic objects, throwing
getters, proxies, foreign/forged IDs, edit conflicts, invalid modes, and hostile
providers/adapters (`ADDENDA-02.md:319-325`). That closes the original
string-only corpus hole.

The final sentence promises deterministic termination for **every** such door.
That promise is unimplementable if a parser calls foreign JavaScript:

```ts
const neverReturns = () => { for (;;) {} };
const neverGets = new Proxy({}, { get() { for (;;) {} } });
```

An in-process parse-that/string-state work counter cannot preempt either call.
An outer catch only handles throws, not non-return. A close gate that quantifies
over arbitrary callbacks/proxy traps can never be proved and invites a vacuous
test corpus that calls only cooperative functions.

**Required repair:** prefer declarative, already-materialized provider and
capability tables at parse doors. If callbacks/adapters remain, freeze the
boundary as: parser-controlled work is bounded; thrown foreign code maps to the
typed diagnostic; no mutation occurs; termination is conditional on foreign
code returning within its declared contract. Never claim to preempt arbitrary
in-process JavaScript. Keep deterministic termination for parser-owned strings,
plain structured data, and limit accounting.

#### PB8 clarification — GREEN WITH A GATE-2 INTERFACE LOCK

PB8 now losslessly preserves/delegates supports-declaration and style-query
leaves, refuses absent capability, and cannot invent typed truth before PB12b
(`ADDENDA-02.md:227`, `299`). This closes the requested clarification. Gate 2
must freeze how PB12b later returns the separate typed overlay so it does not
mutate PB8's final-owned `parseCssCondition` contract; the raw-condition door
can remain stable exactly as the raw stylesheet door does.

### New contradiction, dependency, and coordination sweep

- **Topology:** no wave/category drift. The 17 units and required PB9/PB12/PB13
  splits remain intact. PB3/PB9a reach PB12 transitively; W2/W3/W5 legacy gates
  still protect their L4 consumers.
- **PB12 concurrency:** safe under the repaired raw/typed split. PB12b may
  author against frozen raw types in parallel; mandatory consumption would add
  a close edge as noted above.
- **Audits:** the first-close 28-pass arithmetic and PB0 1+2 review are sound.
  The replay ledger must move actual `r`/evidence to PB1 close per B-C5.
- **Oracle/error fidelity:** exact WPT assertion/prerequisite binding, browser
  unsupported handling, legacy eight-code fidelity, full L4 diagnostic fields,
  and ordinary `internal_error` RED rules are now executable.
- **KISS/LOC:** one scanner/CST/overlay/matcher/numeric/color/path/condition
  architecture remains optimal. Declarative provider tables are also more
  parsimonious than attempting timeout machinery around callbacks.
- **Coordination:** **PASS, no overreach.** Exchange remains owner-mediated,
  active-task-acknowledgement-gated and content-addressed; epoch-5 semantics,
  unproved commit edges, cross-repository reads/writes/imports, source/private
  novelty, and generated runtime remain excluded (`ADDENDA-02.md:375-410`).
  Splitting PB13G semantic manifests from PB13P profile/scenario digests adds no
  authority escalation.

### Re-audit disposition

Confirmed repairs: B-C2, B-C3, B-C4, B-R1 (proposal), B-R2, PB8. Required
before another B re-audit:

1. Include and audit the exact Gate-1 seed manifest/query, closing B-C1.
2. Move actual replay count/evidence to PB1 close and assign expected adapter
   work, closing B-C5.
3. Replace the impossible arbitrary-callback termination promise with a
   truthful foreign-code boundary, closing B-R3.

REJECT

## FINAL PACKET RE-AUDIT — 2026-07-21

This final independent pass read the pinned `ADDENDA-02.md`,
`formation/l4-root-seed-manifest.json`,
`formation/l4-root-seed-research.md`, the full authority chain, and this Audit
B history. Audit A was not read and its auditor was not contacted. The packet
and code were not edited; only this section is appended.

### Final verdict

**REJECT.** The packet's cryptographic evidence and every previously identified
mechanical/API/replay repair now hold. The exact 21-root selection is not,
however, a sufficient seed for the scope it claims. It proves that each of the
fourteen routing labels has at least one root; it cannot produce the full typed-
declaration and current-at-rule universe by the permitted forward normative
closure. Independent CSS modules that *consume* Values/Syntax foundations but
are not referenced by the 21 roots are permanently outside PB0. That recreates
B-C1 as selection bias with an exact digest.

### 1. Mechanical seed recomputation

I parsed the manifest independently and applied its declared canonicalization,
with no use of the research script's expected output.

| check | independently observed | result |
|---|---:|---|
| raw manifest bytes | 25,795 | PASS |
| raw-file SHA-256 | `bd58738b8a734512fedc3cd7213bb8c2cfb316dad24ba6c0ad955529aae7ac8c` | PASS; deliberately not the canonical payload digest |
| canonical payload bytes | 22,315 | PASS |
| declared/recomputed canonical digest | `16c5fc8c57d5f092096a8060024e3884b9474aa941aef8389ac3e0d94b7026ce` | PASS |
| roots | 21 | PASS |
| total pinned root bytes | 2,346,941 | PASS |
| family union | exactly ordinals 1–14 | PASS |
| missing-family summary | empty | PASS |
| root order | unsigned UTF-8 `exact_path` ascending | PASS |
| routed-family order | ascending in every row | PASS |
| duplicate IDs / paths / blob OIDs / source SHA-256s | none | PASS |
| unresolved-owner ledger | exactly family 2, `spring()` | PASS |

All 21 rows use the one declared repository and commit, have valid 40-hex Git
blob IDs, valid 64-hex source digests, positive byte counts, and exact
`Overview.bs` paths. The root count, coverage summary, family ledger, and
foundation-root list agree with the rows. The manifest's path, canonical digest,
commit, tree, and 21/14 counts agree with `ADDENDA-02.md:84-97` and
`l4-root-seed-research.md:6-25`.

### 2. Official commit/tree/blob evidence

I fetched commit `c7573530343759ace8e46438a1fa2c44515b5554` into a fresh bare
repository directly from `https://github.com/w3c/csswg-drafts.git` and did not
use the BBNF checkout or labels. Independent results:

- object type: `commit`;
- raw commit body re-hash: `c7573530343759ace8e46438a1fa2c44515b5554`;
- parsed tree and `^{tree}`: `75bf19c016ed98126381508073de6893c9f756f5`;
- parsed parent: `df2c8d991cdad3582adb549bae076d7a05104ced`;
- `git fsck --strict --no-dangling`: exit 0;
- each of 21 path/blob-OID/byte-count/SHA-256 tuples: exact match to the
  manifest;
- each of 21 pinned raw HTTPS responses: exact byte-count and SHA-256 match to
  the corresponding Git object;
- excluded `css-contain-3/Overview.bs` SHA-256:
  `4355b8e269b044190a0734df5b8ec1c6ccb3da473b123bb51de58c5e38525531`,
  matching the manifest, and its source really declares the current document an
  empty placeholder with the relevant work moved to Conditional 5.

The source metadata `Status`, `Work Status`, `Level`, and `Shortname` match all
21 manifest rows case-insensitively. Human classifications such as
`current_draft`, `experimental_draft`, and `explicit_owner_extension` are kept
separate from those source fields and remain PB0-reviewed dispositions. The
commit/tree/hash claims in `l4-root-seed-manifest.json:7-31` and the byte-proof
claims in `l4-root-seed-research.md:27-66,136-183` are therefore independently
confirmed.

### 3. Root-selection challenge — CONFIRMED BLOCKER

The resolver selects exactly the enumerated family roots and explicitly forbids
directory enumeration (`l4-root-seed-manifest.json:17-25`). Unlisted modules can
enter only through PB0's forward normative closure
(`l4-root-seed-manifest.json:428-432`; `ADDENDA-02.md:58-82,107-111`). That is
not enough to derive the promised full source universe.

At the same verified commit, the official tree contains `css-2026/Overview.bs`,
CSS Snapshot 2026. Its source describes itself as the current CSS definition,
lists the operative module set, and expressly explains that CSS after Level 2
is modular rather than one monolithic "CSS Level 4." It is absent from the
manifest and has zero literal references from the 21 selected roots. Its exact
Git blob is `23b25266cd0d19e10f9a1907b741fb9d8c5955a8`; its raw SHA-256 is
`2d2a7c2704a29e90f06b769f9f514ed03a50318743e97e9e5359879a7793d6f8`.

The official tree also contains parser-bearing modules omitted from the seed.
Representative exact objects are:

| omitted source | source status | property-definition markers | Git blob |
|---|---:|---:|---|
| `css-grid-2/Overview.bs` | CRD | 25 | `82955f59b8017912f617cc6b4c88e4b9cf28326d` |
| `css-flexbox-1/Overview.bs` | ED | 26 | `0a91c321010cd9e47f72377c1d11f622280ebba2` |
| `css-text-4/Overview.bs` | ED | 67 | `8d95f68326718ac13f59765c6fea3dfa68fb2481` |
| `css-box-4/Overview.bs` | ED | 11 | `9283c77a46f451b564b21c12e1a2804d08665d03` |
| `css-logical-1/Overview.bs` | ED | 45 | `66856564dbc3bb1ec132648f154de355fd740b7c` |

None of those five exact shortnames occurs in the 21 root source texts. More
importantly, their dependency direction is the reverse of the packet's closure:
they consume Syntax/Values types while defining new properties and grammars.
Following dependencies *out of* Values 4/5, Syntax 3, Cascade 5, or the feature
roots cannot discover every independent consumer module. The same problem
affects family 10's "current at-rules": independent modules such as Fonts,
Counter Styles, Page, and Namespaces define at-rules/descriptors but need not be
dependencies of the selected roots.

This is not a demand that the seed itself contain the operation denominator.
It is a demand that the deterministic seed-plus-closure algorithm be capable of
producing that denominator. As written it cannot. PB12b's "total terminal/
definition join" and PB12a's "current at-rules" can become vacuously total over
the selected dependency subgraph while omitting valid independent CSS grammar.
That contradicts the authority's ruling that the fourteen gaps are routing
families rather than the denominator (`ADDENDA-02.md:26-28`) and reintroduces
the exact typed-declaration selection bias described by B-C1.

**Required repair:** choose and challenge one exact scope root that can generate
the universe. The smallest defensible options are:

1. seed the pinned CSS Snapshot 2026 membership set, define which snapshot
   stability bands count, then add the already enumerated owner-requested
   experimental/later-level roots and follow normative dependencies; or
2. provide a content-addressed explicit manifest of every in-scope
   parser-bearing CSSWG module, including independent property, descriptor, and
   at-rule owners, with audited exclusions.

If the intended scope is only the 21-root dependency subgraph, rename and
owner-ratify that narrower scope through E-3; it cannot retain the "full CSS"
or total typed-declaration/current-at-rule claims. PB0 cannot cure this by
judgment because `ADDENDA-02.md:109-111` forbids adding unseeded sources except
through the fixed algorithm.

### 4. Spring, maturity, and PB0 boundary

The `spring()` finding is candid and correctly remains PB0 RED. Independent
case-insensitive searches for `spring\s*\(` across every `*.bs` file in the
verified tree returned no match; the only whole-word prose occurrence was the
season in a CSS UI note. Easing 2 is therefore an easing root, not a spring
grammar authority. The three allowed routes in
`l4-root-seed-research.md:185-204` are sound: exact external/historical source,
truthful preserve/delegate/refuse owner ruling, or E-3 scope correction. No
remembered or BBNF syntax may fill the gap.

The seed correctly leaves PB0 responsible for normative closure, every source
digest, carrier extraction, operation-obligation domain and bijection, maturity
and terminal dispositions, fixture/oracle results, L4 surface/types, limits,
diagnostics, browser pins, exchange schema, cost, and its 1+2 reviews
(`l4-root-seed-research.md:206-247`). Subject to the root-set repair above, that
is the correct formation/PB0 boundary.

### 5. Every prior Audit-B repair

| finding | final packet result |
|---|---|
| B-C1 deterministic selection | **RED:** exact and reproducible, but incomplete because the forward closure cannot discover independent modules. |
| B-C2 operation identity | **GREEN:** source digest + exact fragment/span + ordinal + carrier kind + operation; multi-operation split is explicit. |
| B-C2 overlap | **GREEN:** recorded containment/cross-reference overlap is valid; duplicate or ownership-ambiguous overlap is RED; the root amendment expressly supersedes HL4-1 (`ADDENDA-02.md:113-153`). |
| B-C3 scanner | **GREEN:** PB1 is the sole shared scanner and re-anchors every Phase-A/L4 grammar. |
| B-C4 stylesheet ownership | **GREEN:** PB12a solely owns the raw sheet door; PB12b owns typing. |
| B-C5 cost | **GREEN:** 31 is only a nominal subtotal; Gate 2 freezes exposure/quiescence, while PB1 close records actual `r`, adapter work, evidence, `r+1` replay units, `2r` passes, repairs, and cost (`ADDENDA-02.md:450-489`). |
| B-R1 Gate-1 procedure | **GREEN:** addendum and seed each require two challenges plus root gestalt; Gate 1 still authorizes PB0 only. |
| B-R2 `internal_error` | **GREEN:** outer-catch mapping is fault-injected; any ordinary corpus internal error remains RED. |
| B-R3 hostile/foreign code | **GREEN:** inert data is bounded; accessors are rejected without getter execution where possible; thrown/returning foreign code maps deterministically; non-returning foreign code is truthfully outside the synchronous termination claim (`ADDENDA-02.md:338-363`). |
| PB8 typed condition timing | **GREEN:** registry-dependent leaves preserve/delegate until PB12b and PB8 invents no typed truth. |
| overlays/edit carrier | **GREEN:** same-document/range/acyclicity and forged/foreign/edit-conflict gates remain explicit. |
| topology/counts | **GREEN:** 17 units, 11/3/2/1 grades, 31 nominal anchors, 14 feature closures/28 first-close audits, PB0 1+2, PB9/PB12/PB13 splits, and dependencies are unchanged. |
| coordination | **GREEN:** owner-mediated, active-task-acknowledgement-gated, same-digest acceptance; no BBNF semantic import, polling, writes, source/private novelty, or generated runtime. |

One clerical contradiction should be repaired with the scope amendment:
`ADDENDA-02.md:503-506` calls the current exact digest a "RED placeholder,"
while `ADDENDA-02.md:84-97,544-552` and the manifest show a real canonical
digest whose *review status* is RED. The gate itself remains closed, so this is
not an authorization leak; say "challenged exact digest with GREEN reviews"
rather than "in place of the placeholder."

### Final disposition

The packet now proves an exact, authentic 21-root family-routing seed and a
sound PB0 governance process. It does not prove that those roots can generate
the full standards universe promised to PB0. Expand or explicitly narrow the
root scope, update the canonical digest, and rerun both seed/addendum challenges
before Gate 1.

REJECT

## FINAL PACKET RE-AUDIT — Snapshot-union seed v2 — 2026-07-21

This is a fresh independent Audit-B challenge of the amended Gate-1 packet:
`ADDENDA-02.md`, `formation/l4-root-seed-manifest.json` schema v2, and
`formation/l4-root-seed-research.md`. I re-read the governing authority and my
own earlier findings. I did not read or contact Audit A. No packet, parser,
prototype, production, BBNF, or coordination artifact was edited; only this
dated section is appended.

### Final verdict

**ACCEPT.** The 76-root Snapshot-2026 union repairs the prior selection-bias
blocker. It gives PB0 a deterministic reverse-consumer scope containing all 64
members of the four declared Snapshot stability bands, preserves the 21 owner
roots with ten de-duplicated overlaps and eleven additive extensions, and pins
the Snapshot source that proves membership. PB0 can now discover operation
obligations from independent property, descriptor, and at-rule consumers
without pretending that the 76 roots are themselves the denominator.

No exact blocker remains in this packet. This ACCEPT is one Gate-1 challenge
result, not E-3 gestalt adjudication, owner ratification, PB0 authorization, or
permission for PB1+ feature code. The packet's own two-challenge and owner gates
remain binding.

### 1. Manifest recomputation and internal closure

I parsed the v2 JSON independently and reproduced its declared canonicalization
without trusting the research artifact's expected output.

| check | independently observed | result |
|---|---:|---|
| raw manifest bytes | 132,390 | PASS |
| raw-file SHA-256 | `d3700238ea9250c33cd9470fb4779a1d4f5fc11ca2bd34b18078c428138b175f` | PASS; distinct from the canonical payload digest by design |
| canonical payload bytes | 107,362 | PASS |
| declared/recomputed canonical digest | `e4bd163933d5b88d8a4b4b06290bf86934f4183e714b24b61f4d0155aa982d5a` | PASS |
| root rows / unique paths / unique IDs | 76 / 76 / 76 | PASS |
| total pinned root bytes | 9,008,216 | PASS |
| Snapshot members | 64 | PASS |
| explicit owner roots / overlap / additive extensions | 21 / 10 / 11 | PASS |
| root order | unsigned UTF-8 `exact_path` ascending | PASS |
| routed-family order | strictly ascending in every row | PASS |
| family union | exactly ordinals 1–14 | PASS |
| duplicate blob IDs / source SHA-256s | none / none | PASS |

The four band ledgers contain exactly `24 + 8 + 10 + 22 = 64` paths, each
band's count agrees with its array and root-row membership, and every band array
is canonically ordered. The scope arithmetic closes independently as
`64 Snapshot members + 11 non-Snapshot owner extensions + 1 Snapshot evidence
root = 76`. All 21 original owner paths remain present; the ten overlap paths
and eleven extension paths agree exactly with the scope ledger. Every row uses
the one official repository and commit, has a positive byte count and valid
Git/SHA identifiers, and selects the first available source form in the frozen
`Overview.bs -> Overview.src.html -> Overview.html` priority.

The source-form claim also closes: 72 roots are Bikeshed sources, while the
only exceptions are the declared Fonts 3 and Media Queries 3 immutable HTML
objects and the Style Attributes 1 and Selectors 3 legacy source-HTML objects.
For all 72 Bikeshed rows, independently parsed `Shortname`, `Title`, `Level`,
`Status`, and `Work Status` metadata agree case-insensitively with the manifest.

### 2. Official Git and HTTPS evidence

I fetched the exact commit again into a fresh bare repository directly from
`https://github.com/w3c/csswg-drafts.git`. Independent results:

- object type is `commit`;
- raw commit-body re-hash is
  `c7573530343759ace8e46438a1fa2c44515b5554`;
- parsed tree and `^{tree}` both equal
  `75bf19c016ed98126381508073de6893c9f756f5`;
- parsed parent equals
  `df2c8d991cdad3582adb549bae076d7a05104ced`;
- `git fsck --strict --no-dangling` exits zero;
- every one of the 76 path/blob/byte/SHA-256 tuples matches the fetched Git
  object;
- every one of the 76 immutable `raw.githubusercontent.com` HTTPS responses
  matches both the manifest tuple and its Git object;
- the separately recorded Text 4, Box 4, and Page 3 exclusion objects also
  match their declared blobs, bytes, and SHA-256s.

The packet therefore proves a real official commit-to-tree edge and immutable
source bytes. No BBNF checkout, parsed label, generated product, or workspace
copy supplied authority for these checks.

### 3. Independent Snapshot-membership parse

I independently parsed the pinned `css-2026/Overview.bs` object using the
manifest's four exact marker pairs, first membership `<dl>`, top-level `<dt>`
headers, TR links, five declared aliases, and three-form source resolution. The
result matched every declared path, not merely the counts:

| band | independently extracted | exact-path array |
|---|---:|---|
| official definition | 24 | exact match |
| reliable candidate recommendations | 8 | exact match |
| fairly stable / limited implementation | 10 | exact match |
| rough interoperability | 22 | exact match |

The parser correctly retains both links in the combined Transitions 1 /
Animations 1 `<dt>`, applies exactly the five frozen aliases, and introduces no
member from CSS Levels, profiles, the mutable Current Work catalog, or the
feature-level safe-release list. Thus membership is source-derived and
reproducible rather than an internally self-consistent invented ledger.

### 4. Prior reverse-consumer blocker and exclusions

The previous 21-root seed could only follow dependencies forward from
foundations and feature roots. It therefore could not discover independent
consumers. That defect is now discharged:

- Grid 2, Flexbox 1, and Logical 1 are roots through reliable, official, and
  rough-interoperability membership respectively;
- all 64 Snapshot member modules carry the typed-registry-consumer scan role,
  so PB0 must inspect independent property/descriptor grammars rather than
  infer them from Values/Syntax dependencies;
- Fonts 3, Counter Styles 3, Namespaces 3, Conditional 3, CSS Animations 1,
  CSS Cascade 4/5, Fonts 4, CSS2, and other independent rule owners are now
  reachable as roots; PB0, not the root manifest, assigns their operation rows;
- the eleven owner extensions preserve the later/experimental families that
  Snapshot stability membership intentionally does not cover.

The three challenged exclusions are candid and consistent with the frozen
scope:

1. **Text 4:** it is absent from all four membership lists, but Snapshot line
   960 normatively identifies `hyphenate-character` as a safe-release feature.
   The packet excludes the whole module as a root while expressly retaining
   that exact feature reference as a PB0 closure input. Its dependent carriers
   therefore cannot be silently lost, and unrelated Text-4 declarations do not
   gain unreviewed whole-module scope.
2. **Box 4:** it occurs in neither a selected band, the safe-release references,
   nor the owner-root set. Its explicit content-addressed exclusion is a Gate-1
   owner scope decision, not an omission hidden by forward closure.
3. **Page 3:** it likewise occurs in no selected band or owner set. Official
   CSS2 remains rooted for baseline `@page`; later Page-3 carriers require an
   actual normative closure edge or E-3 scope change. The packet does not award
   Page-3 implementation credit through the CSS2 baseline.

Accordingly, “current at-rules” in PB12a is bounded by the ratified §1.1
universe and its closure, not by the mutable CSS Current Work catalog that the
manifest explicitly excludes. If the owner intends that live catalog instead,
that would be a different E-3 scope; it is not a defect in this explicitly
presented Gate-1 choice.

### 5. Spring remains truthfully RED

An independent case-insensitive search over every `*.bs` object at the verified
commit found zero `spring(` carriers. Easing 2 is correctly retained as an
owner-extension root with an unresolved-owner-feature status, never cited as
proof of remembered spring syntax. PB0 must still obtain exact external or
historical evidence, freeze a truthful preserve/delegate/refuse result, or
return through E-3. The wider root set does not launder this RED row into
implementation credit.

### 6. PB0 boundary and gestalt fitness

The amended seed is an appropriate Gate-1 scope root, not a premature PB0
product. It proves selection and source identity only. PB0 still owes normative
fixed-point closure, exact carrier extraction, the operation-obligation domain
and bijection, ambiguity/maturity/support/terminal dispositions, fixtures and
expected results, oracle applicability, exact surface/type/limit/diagnostic
censuses, browser pins, exchange schema, and row-based cost. The two immutable
HTML-only roots remain explicitly RED for carrier-authority review. Scope
discoveries return through E-3 rather than being added by operator judgment.

At total-tranche altitude, the Snapshot union is the smallest of the two
defensible repairs proposed by the prior audit: it removes reverse-dependency
bias without hand-maintaining a guessed global parser-module enumeration. Its
broader non-parser content is controlled by operation-level exclusions in PB0,
and 9,008,216 pinned bytes are a transparent input cost rather than a false
feature count. The packet repeatedly says membership is not semantic credit and
76 roots are not denominator completion. That boundary is both honest and
KISS-forward for the owner-selected scope.

### 7. Governance and regression audit

| invariant | final v2 result |
|---|---|
| two-gate authority | GREEN: two independent Gate-1 challenges plus root gestalt precede owner action; Gate 1 authorizes PB0 only; PB0's 1 structural + 2 semantic reviews and explicit Gate 2 precede PB1+. |
| operation identity/overlap | GREEN: digest + exact fragment/span + ordinal + carrier kind + operation; only duplicate or ownership-indistinguishable overlap is RED. |
| scanner/recovery | GREEN: PB1 owns the sole preprocessing-aware scanner and parse-local recovery; no W0 destructive leaf, parallel scanner, or engine-global collector survives. |
| replay | GREEN: PB1 re-anchors W0 and accepted Phase-A waves; actual `r`, evidence and cost freeze at PB1 close; in-progress waves quiesce/rebase and receive no duplicate first-close audits. |
| PB12 ownership | GREEN: PB12a alone owns the raw recovered sheet door; PB12b owns typed registry/declarations and may consume but not co-own the document. |
| diagnostics/no-throw | GREEN: exact PB0 taxonomy and direct fixtures remain required; ordinary-input `internal_error` is RED; fault injection alone proves the outer catch; returning foreign code is bounded without claiming the impossible for non-returning callbacks. |
| topology/cost | GREEN: 17 units; grade counts 11/3/2/1; 31 nominal anchor units; 14 PB1–PB12b feature closures and 28 first-close E-1 passes; PB9/PB12/PB13 splits and dependency ceilings remain exact. |
| coordination | GREEN: owner/thread mediated, active-BBNF-task acknowledgement gated, content-addressed and same-digest accepted on both sides; no polling, cross-repository write, semantic-label import, source/private novelty, or generated runtime crossing. |
| production boundary | GREEN: prototype/reference work remains under `pi/mirror`; no production execution is authorized. |

No amendment introduced a regression in the legacy 52-export/37-symbol seams,
PB8's preserve/delegate timing, overlay/edit identity gates, oracle hierarchy,
or semantic-versus-performance graduation split.

### Final disposition

The amended packet now presents an exact, authentic, independently reproducible
scope seed capable of reaching the reverse consumers that defeated v1, while
leaving denominator completion and semantic judgment where they belong: PB0
and Gate 2. Audit B has no remaining blocker to Gate-1 gestalt adjudication.

ACCEPT

## FOURTH-AMENDMENT PACKET RE-AUDIT — 2026-07-21

The preceding ACCEPT is stale because the Gate-1 packet changed afterward.
This is a fully fresh independent Audit-B challenge of the current
`ADDENDA-02.md`, `formation/l4-root-seed-manifest.json`, and
`formation/l4-root-seed-research.md`. I re-derived the evidence from the
current artifacts and a new official Git fetch. I did not read or contact Audit
A. No packet, parser, prototype, production, BBNF, or coordination artifact was
edited; only this section is appended.

### Verdict

**ACCEPT.** The current packet repairs both fourth-amendment defects: CSS2's
blank level is now represented by the line-bounded sentinel `"none"`, and Gate
1 no longer pretends the pre-PB0 17-wave skeleton can own the 76-root occurrence
universe. PB0 alone is authorizable at L/XL. Its audited occurrence matrix must
produce a new non-god owner-wave/cost addendum, and that addendum must pass two
independent challenges, root E-3 gestalt adjudication, and explicit owner Gate
2 before any PB1+ feature prototype begins.

No exact blocker remains. This ACCEPT is one current-packet challenge result.
It does not ratify Gate 1, authorize PB0, accept the provisional PB1–PB13
skeleton, or authorize any code.

### 1. Current manifest recomputation

I parsed the current JSON and reproduced its declared recursive-key canonical
form without trusting the research receipt.

| check | independently observed | result |
|---|---:|---|
| raw manifest bytes | 132,608 | PASS |
| raw-file SHA-256 | `769ceff80ecc9f25dbef30ddb3f3dbb04ecdbd2b7f704ed733f29f4ab16fbb32` | PASS; not confused with the canonical digest |
| canonical payload bytes | 107,572 | PASS |
| required/recomputed canonical digest | `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c` | PASS |
| roots / unique paths / unique IDs | 76 / 76 / 76 | PASS |
| total pinned root bytes | 9,008,216 | PASS |
| Snapshot members | 64 | PASS |
| owner roots / Snapshot overlap / additive extensions | 21 / 10 / 11 | PASS |
| stability bands | 24 / 8 / 10 / 22 | PASS |
| family union | exactly 1–14 | PASS |

All root and band path arrays are unsigned-UTF-8 sorted; every per-root family
route is strictly ascending and in range; no path, ID, blob, or source digest
is duplicated. The arithmetic again closes as 64 band members plus eleven
non-Snapshot owner extensions plus the Snapshot evidence root. Every row uses
the declared official repository and commit and the first available source in
the exact `Overview.bs -> Overview.src.html -> Overview.html` priority.

The current digest is present consistently in the normative addendum pin, the
research result and reproduction, and the manifest's terminal digest field.
The superseded `e4bd…82d5a` value appears only in the explicit historical
third-amendment receipt, not as current authority.

### 2. CSS2 blank-level repair — adversarial line test

The old defect was real: a parser using `\s*` after `Level:` can cross the
physical newline and consume `Status: ED` as the level. I therefore did not
reuse such a regex. I split every Bikeshed object into physical lines, matched
each header key only at its own line start, trimmed horizontal space only, and
normalized a blank `Level:` value to `"none"`.

The immutable CSS2 header is exactly:

```text
Title: Cascading Style Sheets (CSS) Level 2
Shortname: css2
Level:
Status: ED
Work Status: Stable
```

Independent results:

- CSS2 is the only one of the 72 Bikeshed roots with a blank physical `Level:`
  line;
- `root-css2.module_level` is exactly `"none"`;
- its status remains `ED` and work status remains `Stable` rather than being
  consumed by the blank level;
- no root contains a colon-bearing cross-key corruption in `module_level`;
- all five line-bounded fields—title, shortname, level, status, and work
  status—match the manifest for all 72 Bikeshed roots;
- Snapshot 2026's literal `Level: none` also remains `"none"`, independently
  of the CSS2 blank sentinel path.

The repair is therefore source-faithful and general enough to prevent the
specific cross-line failure without inferring a semantic level from CSS2's
title or pathname. The digest was changed and prior challenges were reset, so
the repaired metadata was not silently substituted under an accepted identity.

### 3. Official source and Snapshot evidence

I fetched commit `c7573530343759ace8e46438a1fa2c44515b5554` into a fresh bare
repository from the official CSSWG remote. Its type is `commit`; its raw body
re-hashes to the same ID; its parsed and `^{tree}` trees both equal
`75bf19c016ed98126381508073de6893c9f756f5`; its parent equals
`df2c8d991cdad3582adb549bae076d7a05104ced`; and strict fsck passes.

Every one of the 76 Git path/blob/byte/SHA-256 tuples matches the current
manifest. All 76 immutable raw HTTPS responses independently match those Git
objects. The Text 4, Box 4, and Page 3 audit/exclusion objects also match their
separately recorded Git and HTTPS identities.

I independently reran the Snapshot parser from the pinned source using the
four exact marker slices, first membership `<dl>`, top-level `<dt>` headers,
TR-link rule, five aliases, and three-form source priority. Every path array,
not only each count, matches exactly at `24 + 8 + 10 + 22 = 64`. The combined
Transitions/Animations `<dt>` yields both members. No CSS Levels/profile,
mutable Current Work, or safe-release feature reference is promoted into
whole-module membership.

### 4. Scope, exclusions, and spring RED

The reverse-consumer repair remains intact. Grid 2, Flexbox 1, Logical 1, the
independent font/counter/namespace/conditional rule owners, and every other
four-band member enter before forward closure; all 64 band roots retain the
typed-registry-consumer scan role. The eleven later/experimental owner roots
remain distinct from stability membership. Thus PB0 cannot become vacuously
complete over the old 21-root dependency subgraph.

The challenged exclusions remain explicit and acceptable for the owner-chosen
scope:

- Text 4 is not a band or owner root, but Snapshot line 960's exact
  `hyphenate-character` reference remains a PB0 closure input rather than
  promoting all of Text 4.
- Box 4 has no selected membership, safe-release reference, or owner route.
- Page 3 has no selected membership or owner route; CSS2 supplies only baseline
  `@page`, while later Page-3 carriers still require a normative closure edge
  or E-3 scope change.

An independent whole-tree case-insensitive search again finds zero `spring(`
carriers in `*.bs`. Easing 2 therefore remains an unresolved owner-extension
root. PB0 must obtain exact historical/external evidence, freeze a truthful
preserve/delegate/refuse result, or return through E-3; no remembered syntax or
BBNF label can turn the row GREEN.

### 5. New topology boundary — substantive challenge

The current sheet no longer asks Gate 1 to ratify an owner topology before the
occurrence denominator exists:

1. **Authority:** Gate 1 freezes the source-selection/occurrence method, the
   maximum L4 surface, PB0 at L/XL, and permission for PB0 only. PB1–PB13 remain
   queued and RED.
2. **PB0 evidence first:** PB0 must complete fixed-point source closure, the
   operation-occurrence bijection, support/fixture/oracle/diagnostic/surface
   matrices, and a 1× structural plus 2× semantic review before topology can
   advance.
3. **Occurrence-derived ownership:** every matrix row already requires exactly
   one owner. The derived addendum must assign every reviewed terminal,
   descriptor, and rule adapter to a feature owner and introduce or split waves
   wherever the font/grid/flex/text/counter/list/alignment/sizing/at-rule corpus
   requires it.
4. **No PB12 sink:** PB12a may own the thin recovered-rule registry and public
   raw sheet door; PB12b may own the thin terminal/definition join and typed
   public door. They may not absorb missing feature adapters, and neither can
   close until every adapter they join is independently accepted.
5. **Fresh E-3 gate:** the post-PB0 owner-wave/cost addendum is explicitly a
   derived-wave E-3 artifact. It receives two independent assume-faulty
   challenges and root gestalt adjudication before the owner sees it. Standing
   E-3 supplies the governing research/harden/write discipline.
6. **Owner authority:** Gate 2 explicitly ratifies or rejects the sealed lock,
   every semantic row, exact surface/types/limits/diagnostics, the revised
   owner-wave lattice, its replacement audit count and cost, replay exposure,
   and permission for PB1+.

The 17 rows, 31 lower-anchor days, and 28 provisional feature audits are now
labeled consistently as a pre-PB0 planning skeleton. Their mechanical counts
also reproduce: 17 rows at `10 L + 4 L/XL + 2 M/L + 1 M`; PB0 is one of the
four L/XL rows; the lower-anchor arithmetic remains 31; and the retained
PB1–PB12b skeleton would have 14 feature closures/28 passes. The derived
addendum must supersede all three numbers with an exact occurrence-derived
topology, audit count, and row/fixture cost before Gate 2. They cannot be cited
as an authorized ceiling, lifecycle estimate, or complete owner census.

The apparent PB12 wording is not an ownership escape: its registry/door
ownership is a join boundary, while §3 expressly forbids it from swallowing
the feature adapters which PB0 discovers. This is the right anti-god split.

### 6. Remaining architecture and governance regressions

| invariant | current result |
|---|---|
| two gates | GREEN: current packet challenges + root gestalt precede Gate 1; PB0 1+2, derived-addendum 2+gestalt, and explicit owner Gate 2 precede PB1+. |
| legacy/L4 surface | GREEN: 52 direct legacy exports and 37-symbol seam stay frozen; L4 remains a separate, at-most-eight-door barrel whose exact types and `tokenizeCss` exposure are PB0/Gate-2 decisions. |
| scanner/recovery | GREEN: PB1 remains the only shared preprocessing-aware scanner and parse-local recovery authority; no parallel feature scanner or engine-global collector survives. |
| Phase-A replay | GREEN: Gate 2 freezes exposure/quiescence; PB1 close records actual `r`, names/evidence, `r+1` mechanical units, `2r` audits, repairs and cost; in-progress waves rebase without duplicate first-close audits. |
| diagnostics/no-throw | GREEN: PB0 freezes exact codes/fields/counters and direct fixtures; ordinary-input `internal_error` is RED; foreign-code termination is claimed only when control returns. |
| overlays/edit/PB8 | GREEN: same-document/range/acyclicity and edit-conflict gates remain; registry-dependent condition leaves preserve/delegate until typed registry closure. |
| coordination | GREEN: owner/thread mediated, active-task acknowledgement gated, same-digest bilateral acceptance; no polling, cross-repository writes, BBNF semantic-label import, private source, or generated runtime crossing. |
| KISS | GREEN: one scanner, CST, VDS compiler, numeric/color/path engines and condition tree; dense overlays, thin joins, feature-owned adapters, no property-module explosion or parser-disguised evaluator. |
| production boundary | GREEN: all work remains prototype/reference planning under `pi/mirror`; no production execution is authorized. |

### Final disposition

The current `cd505eec…5937c` packet is mechanically authentic, fixes the
line-bounded CSS2 metadata defect, and defers all unknowable owner topology to a
separately challenged, gestalt-adjudicated, owner-ratified post-PB0 addendum.
Audit B finds no remaining blocker to current-packet Gate-1 gestalt
adjudication.

ACCEPT

Model-served receipt: inherited Codex audit route; exact backend alias not exposed.
