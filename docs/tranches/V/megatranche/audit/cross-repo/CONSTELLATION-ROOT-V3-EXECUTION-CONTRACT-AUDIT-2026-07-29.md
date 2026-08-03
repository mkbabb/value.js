# Constellation root v3 execution-contract audit

Date: 2026-07-29

Status: **FORMATION DESIGN RULING — NO RESEAL — ZERO EXECUTION CREDIT**

This independent read-only audit fixes the cross-repository contract
denominator for the future parsimonious root v3. It does not promote the root,
admit parse-that or Fourier, start execution, publish a package, or satisfy a
consumer.

It supplements
`CONSTELLATION-ROOT-V3-PARSIMONY-RULING-2026-07-29.md`. That ruling correctly
removes repository-local pass and wave topology from root authority. A literal
reading of its short execution-contract list, however, would over-prune three
live boundaries:

1. Glass 7 consumed by Keyframes;
2. Glass 8 candidate and published artifacts consumed by Value;
3. accepted Fourier provenance consumed by Value.

The smallest complete contract graph is approximately **26 addressable
endpoints and 24 dependency edges**, plus one inline Keyframes demo-crater row.
Counts are derived from live contracts and are not admission targets.

## Independent source checks

- Parse-that `B.md` binds the exact order: private source freeze, one immutable
  unpublished pack, Value plus parse-that `jsonParser` consumption, consumer
  equivalence/deletion/formal proof, execution Clean A/B, release, Value
  released-coordinate rebind, then parse-that sends one generic ABI packet to
  BBNF after `V.L6.css-path-abi-freeze`. BBNF is the recipient, not the issuer.
- Fourier `N.W1` requires one atomic released Value 4 / Glass 7 / Keyframes 6
  tuple through built public artifacts. Fourier is the tuple consumer and
  receipt issuer; the constellation does not produce a synthetic tuple.
- Value's producer boundary distinguishes an immutable Glass 8 candidate for
  development from the published immutable Glass 8 artifact required for final
  Value closure. Candidate evidence cannot substitute for the release.
- Rejected Fourier A2/A3 and R2/reseal-B prototypes cannot feed Value. Only an
  accepted inventory/provenance endpoint exposed through Fourier's signed
  formation binding may do so.
- The current root graph's BBNF direction, fictitious JSON repository,
  constellation-owned Fourier tuple, null-identity Glass artifact and rejected
  Fourier positive edges are therefore not reusable authority.

## Universal zero-credit law

Every endpoint starts with the exact closed vector below:

```json
{
  "formation": false,
  "execution": false,
  "product": false,
  "visual": false,
  "packageDeploy": false,
  "release": false,
  "constellationClose": false
}
```

A satisfied endpoint proves only its named artifact availability or receipt
claim. It never changes another credit field implicitly.

## Exact endpoint denominator

### Parser release boundary

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `pt.runtime-candidate` | candidate artifact | parse-that; parse-that → Value and `parse-that#jsonParser` | Parser formation admitted; private production source frozen; exact source commit, unpublished tarball SHA and closure manifest |
| `pt.value-candidate-receipt` | consumer receipt | Value → parse-that | Exact candidate SHA; equivalent values, spans, diagnostics, recovery and failures; displaced machinery deleted; WPT/Browser evidence; every-scale/every-result-plane CI-low `>=10x` |
| `pt.json-candidate-receipt` | logical-consumer receipt | `parse-that#jsonParser` → parse-that release gate | Same candidate SHA and generic primitives; equivalent JSON products, deletion and formal performance |
| `pt.runtime-release` | release artifact | parse-that → Value | Both receipts bind the unchanged candidate; execution Clean A/B accept the same bytes; published coordinate has exact registry, tarball, closure and source identities |
| `value.pt-release-rebind-receipt` | consumer receipt | Value → parse-that | Published coordinate maps to the admitted candidate; Value tests, build, WPT/Browser and pack proof rerun |
| `value.css-path-abi-freeze` | freeze manifest | Value → root/BBNF | Release rebind, Keyframes adoption and tier-pack receipts, and Value L3/L4 closure; exact ABI manifest hash |
| `pt.bbnf-abi-handoff` | outbound handoff receipt | parse-that → BBNF | Release rebind plus ABI freeze; one generic packet, no CSS parser or implementation dependency |

`jsonParser` is a logical consumer owned by parse-that. It is not a fictitious
repository.

### Value CSS/path to Keyframes

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `value.css-path-surface-candidate` | typed surface manifest | Value → Keyframes | One manifest replaces five local candidate nodes and enumerates `/css`, `/path`, numeric `/transform`, `/easing`, inverses, diagnostics, recovery, identity hashes and refusals |
| `keyframes.value-surface-adoption-receipt` | consumer receipt | Keyframes → Value | Exact adoption and deletion of local grammar/scanner/serializer work; no raw alias or compatibility export |
| `keyframes.tier-candidate-pack` | candidate artifact | Keyframes → Value | W3 immutable tier/evaluation pack; CSS-free root versus engine split; exact tarball, closure and peer identities |
| `value.keyframes-tier-pack-receipt` | closure receipt | Value → Keyframes | Packed tier behavior and identity verified; no Value runtime dependency on Keyframes |

### Keyframes integrated-pack craters

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `keyframes.integrated-candidate-pack` | candidate artifact | Keyframes → demo, Glass, Atlas and Slides | Exact post-W4–W9 pack; identity distinct from W3 and the Keyframes 6 release pack |
| `glass.keyframes-crater-receipt` | consumer row | Glass → Keyframes | Actual packed Glass crater evidence |
| `atlas.keyframes-crater-receipt` | discriminated consumer row | Atlas → Keyframes | Exactly `PASS`, `CONFLICT` or `NO_EDGE`; conflict has exact failing evidence; no-edge has graph hash |
| `slides.keyframes-crater-receipt` | consumer row | Slides → Keyframes | Actual packed Slides crater evidence |
| `keyframes.atlas-conditional-disposition` | conditional receipt | Keyframes → Atlas | `PASS` emits no packet; `CONFLICT` emits one bounded delta; `NO_EDGE` emits graph-backed `NO_CONFLICT` |

The independently evidenced Keyframes demo crater remains a typed row inside
the integrated-pack manifest. It is not a separate root node.

### Released tuple and Glass 7

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `value.v4-release-pack` | release artifact | Value → Fourier | Published v4 registry/package identity and complete closure |
| `glass.v7-release-pack` | release artifact | Glass → Fourier and Keyframes | Complete JS/d.ts/CSS/style/font/watch closure, peers, tag/commit and tarball |
| `keyframes.v6-release-pack` | release artifact | Keyframes → Fourier | Exact annotated-tag truth, tag object, peeled commit, tarball and closure |
| `fourier.producer-tuple-receipt` | multi-subject consumer receipt | Fourier → Value, Glass, Keyframes and root | Clean install of the exact tuple on Node 22; one physical package each; exports, peers, types, unit, Vite, build and Browser proof |
| `keyframes.glass-v7-consumption-receipt` | consumer receipt | Keyframes → Glass | Complete built Glass 7 artifact consumed through registry bytes, without source alias or copied CSS |

If Keyframes' Glass artifact proves distinct from Glass 7, it becomes one
additional fully identified artifact. A null-version duplicate is forbidden.

### Glass 8 to Value

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `glass.v8-candidate-pack` | candidate artifact | Glass → Value | Immutable development pack with complete closure; cannot grant final Value close |
| `value.glass-v8-candidate-receipt` | development receipt | Value → Glass | Atomic candidate-only demo adoption with zero release/final-close scope |
| `glass.v8-release-pack` | release artifact | Glass → Value | Published identity and complete JS/d.ts/CSS/style/font/watch closure |
| `value.glass-v8-release-receipt` | final consumer receipt | Value → Glass | Atomic published adoption, local-compensation deletion, packed demo and Browser acceptance |

Glass declaration/style/font/watch defects are release conditions on these
endpoints. They do not create another root wave or resend the acknowledged
Glass batch.

### Fourier provenance to Value

| ID | Kind | Owner and parties | Exact trigger |
|---|---|---|---|
| `value.fourier-provenance-receipt` | external-binding consumer receipt | Value → Fourier/root | Accepted Fourier inventory and provenance adjudications exposed through Fourier's signed formation binding; rejected prototype chronology stays in Fourier history |

## Exact dependency edges

```text
pt.runtime-candidate -> pt.value-candidate-receipt
pt.runtime-candidate -> pt.json-candidate-receipt
pt.value-candidate-receipt -> pt.runtime-release
pt.json-candidate-receipt -> pt.runtime-release
pt.runtime-release -> value.pt-release-rebind-receipt
value.pt-release-rebind-receipt -> pt.bbnf-abi-handoff
value.css-path-abi-freeze -> pt.bbnf-abi-handoff

value.css-path-surface-candidate -> keyframes.value-surface-adoption-receipt
pt.value-candidate-receipt -> keyframes.value-surface-adoption-receipt
keyframes.value-surface-adoption-receipt -> value.css-path-abi-freeze
keyframes.tier-candidate-pack -> value.keyframes-tier-pack-receipt
value.keyframes-tier-pack-receipt -> value.css-path-abi-freeze
value.pt-release-rebind-receipt -> value.css-path-abi-freeze

keyframes.integrated-candidate-pack -> glass.keyframes-crater-receipt
keyframes.integrated-candidate-pack -> atlas.keyframes-crater-receipt
keyframes.integrated-candidate-pack -> slides.keyframes-crater-receipt
atlas.keyframes-crater-receipt -> keyframes.atlas-conditional-disposition

value.v4-release-pack -> fourier.producer-tuple-receipt
glass.v7-release-pack -> fourier.producer-tuple-receipt
keyframes.v6-release-pack -> fourier.producer-tuple-receipt
glass.v7-release-pack -> keyframes.glass-v7-consumption-receipt

glass.v8-candidate-pack -> value.glass-v8-candidate-receipt
glass.v8-release-pack -> value.glass-v8-release-receipt

formation/fourier#acceptedProvenanceAdjudication
  -> value.fourier-provenance-receipt
```

Candidate-to-release lifecycle and owner-local wave order are endpoint
predicates or repository-binding facts, not root edges.

## Current-family dispositions

| Disposition | Current family | Future root treatment |
|---|---|---|
| MOVE | Repository P1/P2/P3/Clean A/Clean B/admission chains | One signed formation binding per repository in `FORMATION.json` |
| MOVE/FOLD | Parser PB1, private freeze, internal proof and execution clean nodes | PB1 to history; remaining facts become candidate/release predicates |
| KEEP/REWIRE | Parser candidate receipts, release/rebind and BBNF prerequisites | Keep direct semantic endpoints; correct parties and require both receipts |
| FOLD | Parser↔Value local wave mirrors | One Value receipt, one candidate-surface manifest, one release rebind |
| FOLD | Five Value candidate nodes feeding Keyframes | One typed surface manifest and one adoption receipt |
| KEEP/FOLD | Keyframes W3 pack and Value closure | Keep distinct artifact and bilateral receipt; remove local wave nodes |
| FOLD | Keyframes W10 crater fan-out/fan-in | One manifest with four independently typed rows; external issuers remain addressable |
| KEEP/SPLIT | Atlas conditional edge | Separate Atlas evidence from Keyframes' conditional outbound disposition |
| KEEP/MOVE | Released tuple members and tuple | Keep three pack inputs; Fourier owns the consumption receipt |
| KEEP/SPLIT | Glass→Value and Glass→Keyframes | Candidate versus release is explicit; reuse Glass 7 only if identity proves it |
| PRUNE/REPLACE | Rejected Fourier provenance source | Delete rejected positive edges; use one accepted Fourier binding reference |
| PRUNE | Synthetic root execution-close and repository-local terminal edges | Owner bindings and typed receipts report satisfaction |
| PRUNE | Rejected Fourier prototype iterations | Preserve only in Fourier's append-only terminal history |

## Required schema

`EXECUTION-CONTRACTS.json` contains only:

```text
schemaVersion
schemaAuthority { path, sha256 }
invariantCatalogAuthority { path, sha256 }
externalBindings[] { repo, path, sha256, projectionSha256 }
endpoints[]
edges[]
```

The schema and invariant catalog are external to the candidate. Endpoint kinds
are discriminated:

- `candidateArtifact`;
- `releaseArtifact`;
- `surfaceManifest`;
- `consumerReceipt`;
- `conditionalReceipt`;
- `freezeManifest`;
- `handoffReceipt`.

Common required fields are `id`, `kind`, `ownerRepo`, `state`,
`disposition`, `triggerExpression`, `evidenceRefs` and the closed credit
vector. Receipt kinds additionally require typed issuer, subject identities,
recipients, claim scope and assertions hash.

Candidate artifacts require source commit, tarball and closure identity plus an
explicit unpublished state; they do not carry null tag boilerplate. Release
artifacts require the published coordinate, registry integrity, source commit,
tarball and exact tag-kind/signature facts. Package closures enumerate JS,
declarations, CSS, copied styles, fonts, exports, peers and realpath/one-copy
proof.

Triggers use an expression AST (`all`, `any`, `not`, `stateIs`,
`outcomeIs`), not free prose. Owner-local pass/wave IDs are invalid edge
endpoints. The inline demo and logical `jsonParser` consumer are closed,
reason-coded exceptions, not permission to recreate repository DAGs.

## Own-reason mutant families

The future validator generates mutants from invariant families and requires
the exact primary diagnostic. There is no fixed mutant count.

| Code | Family |
|---|---|
| `E_AUTHORITY_HASH` | External schema, invariant catalog or binding drift |
| `E_EVIDENCE_HASH` | Missing, unreadable or stale evidence in any state |
| `E_BINDING_PROJECTION` | Covered set, projection, credit or binding-node drift |
| `E_ENDPOINT_KIND` | Wrong variant or missing variant-required field |
| `E_ARTIFACT_IDENTITY` | Version-only pack, incomplete closure, unresolved peer/realpath or false signature |
| `E_LIFECYCLE_CONFLATION` | Candidate as release, W3 as W10, or W10 as Keyframes 6 |
| `E_RECEIPT_PARTIES` | Owner/issuer/recipient/subject swap |
| `E_SCOPE_LOCAL_TOPOLOGY` | Repository-local wave/pass edge or fake repository |
| `E_ZERO_CREDIT` | Credit flip, omission, extra key or type drift |
| `E_PARSER_RELEASE_GATE` | Release without both exact receipts, unchanged candidate, formal proof or clean pair |
| `E_VALUE_REBIND` | Rebind before release or to non-candidate-equivalent bytes |
| `E_VALUE_KF_SURFACE` | Missing surface/refusal row, local parser residue or missing adoption/tier receipt |
| `E_BBNF_FREEZE` | Early handoff, reversed parties or competing CSS parser |
| `E_CRATER_COVERAGE` | Missing, replayed or swapped crater row |
| `E_ATLAS_CONDITIONAL` | Invalid outcome or missing conflict/no-edge evidence |
| `E_FOURIER_TUPLE` | Missing, mutable or mismatched tuple member |
| `E_GLASS_CLOSURE` | JS-only readiness or missing declarations/CSS/style/font/watch output |
| `E_GLASS_BATCH_DUPLICATE` | New gap node instead of producer-lifecycle amendment |
| `E_NONPOSITIVE_SOURCE` | Positive edge from rejected/superseded evidence |
| `E_PROVENANCE_BINDING` | Value consumes rejected or mismatched Fourier evidence |
| `E_GRAPH_REFERENCE` | Dangling, duplicate, unexpected or cyclic contract edge |
| `E_REPLAY` | One evidence object reused for independent receipts/adjudications |

## Promotion boundary

This denominator is frozen as a design input only. Do not create or promote
`EXECUTION-CONTRACTS.json` until parse-that and Fourier formation bindings are
admitted and the root v3 promotion conditions in the parsimony ruling are
green. At promotion, re-derive the endpoint set from those exact signed
bindings; a changed artifact identity may add or remove an endpoint, but a
target count may not.
