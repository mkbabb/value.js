# Root Repair R3 Skeptic A3

- Role: independent software-quality and contract-boundary reviewer
- Scope: RR-14 through RR-18 in the literal V-next formation corpus
- Reviewed corpus epoch: vnext-formation-corpus-epoch/1
- Reviewed files: 183
- Reviewed SHA-256: 3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03
- Product execution status: 0/190; this report grants no production credit

## Verdict

NOT CLEAN.

RR-14, RR-15, RR-16, and RR-18 retained their focused boundary controls under
this review. RR-17 does not. Two independently reproduced contract defects let
the consumer-universe boundary either omit/misclassify supported source edges
while returning resolvable, or make documented unavailable dispositions
impossible to carry end to end. Because C00U receipts are shared by Value,
Keyframes, deletion, and later consumer closure, these are formation-root
defects rather than local test omissions.

## Finding 1 — RR-17 source discovery is incomplete and can still return resolvable

The declared boundary says C00U scans static runtime, type, dynamic, and CSS
imports and gives every supported edge one disposition:

- waves/M-C.md:37
- PROVENANCE.md:95-104
- PROVENANCE.md:108-118
- CONSUMER-UNIVERSE-BOUNDS.json:32-57

The implementation does not recognize that whole declared language:

- tools/resolve-consumer-universe.mjs:447-456 recognizes dynamic imports only
  when the specifier uses a single- or double-quoted string and the closing
  parenthesis immediately follows it. A zero-substitution template literal is
  a static specifier but is not matched.
- tools/resolve-consumer-universe.mjs:451-454 recognizes a type edge only when
  the statement begins with import type or export type. The valid TypeScript
  form import { type T } from "pkg" falls through to the runtime expression.
- tools/resolve-consumer-universe.mjs:457-480 records only matches produced by
  those expressions.
- tools/resolve-consumer-universe.mjs:677-725 compares declarations only with
  that incomplete observed map, so an unobserved static edge cannot trigger the
  omitted-edge rejection.

### Reproduction

From docs/tranches/V/vnext, an isolated fixture was created with
prepareConsumerFixtureConstellation, giving the canonical 15 Git roots and six
required subdirectories. Its Keyframes primary contained these exact bytes:

    import { type Value } from "@mkbabb/value.js";
    export type Wrapped = Value;
    export const load = () => import(\u0060@mkbabb/value.js\u0060);

The fixture declared only this edge:

    {
      "id": "keyframes/value-inline-type",
      "source": "keyframes",
      "target": "value",
      "package": "@mkbabb/value.js",
      "specifier": "@mkbabb/value.js",
      "kind": "runtime"
    }

It then called resolveConsumerFixtureUniverse, whose implementation runs the
resolver twice and validates both receipts through
validateConsumerUniverseReceipt at
tools/consumer-universe-fixture.mjs:299-325. The observed result was:

    {
      "fixture_and_return_validation": "exit 0",
      "roots": 15,
      "source_mentions": [
        "inline type import",
        "static template-literal dynamic import"
      ],
      "reported_edges": [
        {
          "kind": "runtime",
          "locators": ["runtime:1:1"]
        }
      ]
    }

Thus the full fixture and return-layer validation accepted a resolvable
15-root receipt that omitted the static dynamic edge on line 3 and recorded
the line-1 type-only edge as runtime. This is a direct positive reproduction,
not an inference from missing test cases.

The current focused suite remains green because its source examples cover the
recognized forms. Its advertised result was:

    {"schema":"vnext-consumer-universe-selftest/2","valid_real_git_receipts":2,"resolver_adversarial_rejections":29,"receipt_projection_adversarial_rejections":8,"unavailable_blocking_receipts":1,"valid_return_annex_controls":1}

tools/selftest-consumer-universe.mjs:300-346 validates the green receipt and
annex control; tools/selftest-consumer-universe.mjs:613-627 checks omitted
runtime, lock, and transitive rows, but no zero-substitution template dynamic
import or inline type-only import is present.

### Cross-formation effect

The shared 15-root fixture marks every root and caller-supplied edge included
at tools/consumer-universe-fixture.mjs:248-285, then validates the resolver
receipt at tools/consumer-universe-fixture.mjs:303-316. It is consumed by:

- tools/selftest-deletion-judgment.mjs:399 and
  tools/selftest-deletion-judgment.mjs:168
- tools/selftest-keyframes-public-package.mjs:675 and
  tools/selftest-keyframes-public-package.mjs:729
- tools/selftest-keyframes-target-transpose.mjs:238, 1268, 1743, and 1879
- tools/value-target-resolution-fixture.mjs:919 and 932
- tools/value-target-transpose-fixture.mjs:482 and 642

Consequently a missing or wrongly typed C00U edge can be inherited by the
Value transpose, Keyframes transpose/package, and deletion-casualty controls
without any downstream layer being able to reconstruct the omitted source
fact. The hash joins can faithfully bind the wrong edge set; hashing does not
restore an edge the scanner never emitted.

### Required RR-17 correction

Reopen RR-17/C00U. Replace the expression-only source projection with a
deterministic parser-backed projection for the claimed static grammar, or fail
closed on syntax the projector cannot classify. At minimum it must:

1. recognize zero-substitution template-literal dynamic imports and static
   dynamic imports with supported option syntax;
2. classify pure inline TypeScript import/export type specifiers as type, not
   runtime;
3. retain exact occurrence coordinates and reject unsupported ambiguous forms
   before a resolvable receipt;
4. add 15-root positive and omission/kind boundary cases for each form; and
5. rerun every shared Value, Keyframes, deletion, C00U, and C05 consumer
   fixture after the resolver and receipt hashes change.

## Finding 2 — unavailable is not an end-to-end inhabitable disposition

The prose and schemas deliberately expose included, excluded, and unavailable
branches. Required roots, including Slides-K, may be included or unavailable;
a valid unavailable row must name a retrigger, produce a blocking receipt, and
exit 2:

- PROVENANCE.md:101-118
- RETURN-CONTRACT.md:494-505
- consumer-universe.schema.json:210-273
- waves/M-C.md:42

Four executable boundaries disagree with that contract.

First, the bounds authority authenticates live availability before the
receipt's typed root disposition is considered:

- tools/consumer-bounds-authority.mjs:185-204 requires every required root
  canonical_realpath to exist as a directory.
- tools/consumer-bounds-authority.mjs:208-255 likewise requires every required
  repository subdirectory to exist.
- tools/consumer-universe-return.mjs:137-148 invokes that authority check before
  it inspects the required root record's disposition.

The resolver itself has the opposite rule: it accepts a missing root declared
unavailable at tools/resolve-consumer-universe.mjs:623-639, and it skips a
required subdirectory when its parent root is unavailable at
tools/resolve-consumer-universe.mjs:146-201. A receipt that the resolver is
specified to emit therefore cannot pass the return boundary.

Second, an included source with an observed edge to an unavailable internal
target has no legal disposition:

- included is rejected when the target root is not included at
  tools/resolve-consumer-universe.mjs:704-708;
- unavailable is rejected whenever the source root is available at
  tools/resolve-consumer-universe.mjs:697-712; and
- the receipt validator requires every unavailable edge to have zero
  observations at tools/consumer-universe-return.mjs:185-207, although the
  source occurrence is available in this case.

Excluded is not a valid substitute: the dependency occurrence remains active,
and the contract says unavailable names a retrigger rather than inferred
inactivity at PROVENANCE.md:101-105.

Third, even a blocking receipt that does not involve a required missing root
cannot enter the universal return:

- validateConsumerUniverseReceipt defaults requireResolvable to true at
  tools/consumer-universe-return.mjs:93-101 and rejects the blocking receipt at
  tools/consumer-universe-return.mjs:225-228.
- tools/validate-return.mjs:877-890 calls that function for both C00U and C05
  without selecting the blocking branch. C05 must indeed be resolvable, but
  this also prevents C00U from returning the documented audit receipt through
  its typed annex.

### Reproductions

1. A self-hash-correct clone of CONSUMER-UNIVERSE-BOUNDS.json changed only the
   Slides-K canonical coordinate to a unique nonexistent path beneath the same
   bounded search root and recomputed bounds_sha256, manifest_hash, and the
   three-field binding. Calling validateConsumerBoundsAuthority with
   requireCanonicalPath:false produced:

       {
         "typed_branch": "required root unavailable",
         "authority_result": "rejected before receipt disposition validation",
         "error": "consumer-universe required root is unavailable: slides-k"
       }

2. A canonical 15-root fixture first proved an included Keyframes-to-Value
   runtime edge. The Value target checkout was then removed inside the
   temporary fixture; its root and the observed edge were assigned exact
   unavailable dispositions with C00U retriggers. The resolver produced:

       {
         "baseline_edge_detected_and_validated": true,
         "source_status": "included",
         "target_status": "unavailable",
         "edge_status": "unavailable",
         "resolver_exit": 1,
         "stderr": "edge keyframes/value-runtime from available root cannot be unavailable"
       }

3. A canonical 15-root fixture added one non-required, nonexistent consumer
   record with an unavailable disposition. All required authority roots stayed
   present, isolating the return-mode issue. The resolver wrote its blocking
   receipt and exited 2. The same receipt passed with
   requireResolvable:false but failed under the default used by
   validate-return.mjs:

       {
         "resolver_exit": 2,
         "receipt_resolvable": false,
         "blockers": 1,
         "default_validation": "consumer-universe receipt is blocking, not dependency green",
         "explicit_blocking_validation": "accepted with requireResolvable:false"
       }

The suite's one unavailable positive at
tools/selftest-consumer-universe.mjs:669-697 stops after reading the resolver
receipt. It does not send that receipt through the authority/return validation
used by the green annex control at tools/selftest-consumer-universe.mjs:300-346.
It also makes the source root unavailable, so it does not cover an available
source pointing to an unavailable target.

### Required RR-17 correction

Reopen RR-17/C00U and its C05 join:

1. Make the bounds authority authenticate semantic identity and containment
   without precluding a typed missing required root. Apply live existence and
   realpath checks according to the universe disposition: included/excluded
   roots must be observable; unavailable roots must be absent and evidenced;
   required subdirectories are checked only when their owning root is
   available.
2. Define and implement the unavailable-edge cases for both an unavailable
   source and an unavailable internal target. An observed incoming edge to an
   unavailable target must retain exact source occurrence observations rather
   than being forced to zero observations.
3. Route a resolver-produced blocking C00U receipt through the universal return
   with requireResolvable:false and the appropriate non-complete wave outcome.
   Keep C05 completion strictly requireResolvable:true.
4. Add end-to-end positive controls for included, excluded, unavailable-source,
   unavailable-target, required-root-unavailable, and required-path-under-
   unavailable-root branches. Each control must traverse resolver output,
   authority validation, receipt validation, annex projection, and universal
   return validation.
5. Recompute the affected resolver/schema/contract hashes and rerun the shared
   Value, Keyframes, deletion, C00U, and C05 boundary suites.

## Other reviewed RR-14 through RR-18 boundaries

No additional reproducible defect was found in these focused mechanisms:

- RR-14: canonical launch/poll sources are closed at
  tools/clean-exec-contract.mjs:708-776; result shape and terminal exit are
  checked at tools/clean-exec-contract.mjs:792-848; contiguous ownership,
  elapsed time, poll count, output size, terminal closure, and report ordering
  are enforced at tools/clean-exec-contract.mjs:1211-1463. Its focused result
  was 21 positives and 225 mutation rejections with the documented 120-poll,
  3,900,000-ms, and 1,048,576-byte limits.
- RR-15: pre-campaign same-parent bootstrap validation is enforced at
  tools/clean-provider-bootstrap-authority.mjs:72-153. Continuous custody and
  closing rechecks are joined by tools/clean-coordinator-custody.mjs and
  tools/validate-clean-passes.mjs:837-897. Focused results were bootstrap 1/6,
  custody 6/32, and report-hash helper 2/12.
- RR-16: the formation layer fixes the order born RED, partition, implement,
  freeze, critics, adjudicator, sole gate, receipt, return at
  tools/formation-proof-layer.mjs:10-23 and waves/P-V.md:15-29. The universal
  return requires both critics before adjudication and adjudication before
  every gate at tools/validate-return.mjs:2363-2378, then joins the exact
  challenge hash at tools/validate-return.mjs:2382-2389.
- RR-18: the six D19-D24 effect/N/A rows are exact at
  tools/formation-proof-layer.mjs:25-41 and waves/G-D.md:90-96, projected into
  wave contracts at tools/wave-contract.mjs:42-85, and checked against the
  source layer at tools/formation-proof-layer.mjs:140-199. The focused proof
  layer returned 2 positives and 14 mutation rejections; D25's contract SHA-256
  was c8134771c46870de8764624f51d3a80766366a3c297720ecc89ffbe76ca3e2f2.

These focused greens do not offset the two RR-17 findings.

## Commands and evidence

Completed from docs/tranches/V/vnext:

    node tools/corpus-epoch.mjs
    node tools/selftest-clean-exec-contract.mjs
    node tools/clean-provider-bootstrap-authority.mjs
    node tools/selftest-clean-provider-bootstrap-authority.mjs
    node tools/selftest-clean-coordinator-custody.mjs
    node tools/selftest-formation-proof-layer.mjs
    node tools/validate-wave-contracts.mjs D25
    node tools/validate-consumer-bounds.mjs
    node tools/selftest-consumer-universe.mjs

The three isolated boundary reproductions used:

    node --input-type=module

with temporary real-Git constellations created through
tools/consumer-universe-fixture.mjs. Every temporary directory was removed in a
finally block. The source bytes, disposition mutations, calls, and observed
outputs are recorded above.

A supplemental node tools/validate-corpus.mjs run progressed through the
focused Value and Keyframes stages but was stopped at coordinator-directed
finalization with exit 130. It is not used as evidence for this verdict. The
focused commands above all completed; the NOT CLEAN verdict derives from the
three positive boundary reproductions, not from an incomplete aggregate run.

No product repository was mutated, staged, or committed. This report records
formation QA only and does not implement or adjudicate the correction.
