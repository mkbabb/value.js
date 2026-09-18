# Root Repair R3 Adjudication

## Global verdict

**NOT CLEAN.** RR-17/C00U is reopened. The current source projector can omit a
supported static dynamic import and misclassify a pure inline TypeScript type
import while still deriving `resolvable:true`. The required-root unavailable
branch is also contradictory across bounds authority, resolver, receipt,
annex schema, live universal-return replay, and observed incoming edges.

RR-14, RR-15, RR-16, and RR-18 have no additional reproduced mechanism defect
on the authenticated subject. The 32 recorded implementation-ledger byte
identities still match. Those local results do not offset RR-17 and do not
grant production credit. Production implementation remains **0/190**; no
product or parser workload was executed.

## Authenticated evidence boundary

The two admissible critic inputs were hashed before being read:

| Input | Required SHA-256 | Observed SHA-256 | Result |
|---|---|---|---|
| `reviews/ROOT-REPAIR-R3-SKEPTIC-A3.md` | `289f665ae6374dac6171f751220977650d95cf3c9f1e7509fd6e13fe3d5eb767` | `289f665ae6374dac6171f751220977650d95cf3c9f1e7509fd6e13fe3d5eb767` | authenticated |
| `reviews/ROOT-REPAIR-R3-SKEPTIC-B.md` | `b5ce469d9163934e85b6b17000b8e4ed2d05cb95e081a42207325f7dc81d62e9` | `b5ce469d9163934e85b6b17000b8e4ed2d05cb95e081a42207325f7dc81d62e9` | authenticated |

No other report whose basename begins `ROOT-REPAIR-R3-` was opened or used.

The original subject was independently projected with a recursive regular-file
walker that skipped every basename beginning `ROOT-REPAIR-R3-` before including
the entry. The projection then used `tools/corpus-epoch.mjs`'s canonical
algorithm: its declared clean-pass exclusions, its two external coordination
inputs, canonical path order, per-file SHA-256 rows, RFC 8785/JCS
canonicalization, and a final SHA-256. The result was:

```json
{"files":183,"sha256":"3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03"}
```

Thus neither critic report nor this adjudication is part of the authenticated
183-file subject.

All reproductions below were read-only. They used source inspection, pure
in-memory projections, or in-process read interception. No fixture directory,
product repository, parser checkout, staging area, or Git history was changed.

## Per-finding verdicts

| Matter | Verdict | Adjudication |
|---|---|---|
| Critic A3 finding 1: zero-substitution template dynamic import is omitted | **UPHELD** | The exact dynamic-import expression accepts only single- or double-quoted specifiers and requires the close parenthesis immediately after the literal. A template literal produces no detection. |
| Critic A3 finding 1: pure inline TypeScript type specifier is classified as runtime | **UPHELD** | `import { type T } from "pkg"` does not match the statement-level `import type` expression and does match the runtime expression. The same defect applies to a pure inline type re-export. |
| Critic A3 finding 1: C00U can return `resolvable:true` over an incomplete or wrongly typed source-edge set | **UPHELD** | The omitted template occurrence never enters the observed map; the wrongly typed inline occurrence can satisfy a caller-declared runtime tuple; with no unavailable disposition, blockers remain empty and the receipt derives `resolvable:true`. |
| Critic A3 finding 2 and Critic B R3B-RR17-01: required unavailable root cannot cross canonical authority | **UPHELD** | The authority requires the canonical required-root directory before receipt dispositions are inspected, while the resolver expressly accepts an absent root with an unavailable disposition, evidence, retrigger, blocker, exit 2, and `resolvable:false`. |
| Required-subdirectory unavailable concern | **NARROWED** | A missing required subdirectory under an available root is correctly fatal. The defect is the inherited branch under an unavailable owning root: the resolver skips that path, but the disposition-blind authority requires it after already requiring the absent parent. There is no independent required-path disposition in the current schema. |
| Critic A3 finding 2: observed incoming edge to an unavailable internal target has no legal disposition | **UPHELD** | For an available source, `included` rejects a non-included target and `unavailable` is unconditionally rejected. The receipt validator separately requires every unavailable edge to have zero observations, even though the source occurrence is observable. |
| Critic A3 finding 2: blocking C00U receipt cannot enter universal return | **UPHELD AND BROADENED** | The default receipt mode requires green; the caller does not override it; the annex schema itself fixes `resolvable:true` and `blockers:[]`; and live replay rejects the resolver's contractually valid exit 2. All three layers preclude the typed branch. |
| C05 dependency-green separation | **UPHELD AS CORRECT, NOT A C05 DEFECT** | C05 is specified to accept only fresh exit 0, `resolvable:true`, and no blockers. A blocked C00U return must be valid audit evidence but must not satisfy the static C00U→C05 completion edge. |
| Critic B statement that only one RR-17 integration defect survives | **REJECTED** | Its required-root authority finding is valid, but the independently reproduced source-projection, incoming-edge, annex-schema, and live-replay defects are additional surviving RR-17 contract failures. |
| RR-14 | **UPHELD / LOCALLY CLOSED** | Canonical launch/poll classification, exact receipt shape, physical chronology and ownership, same-session continuity, output reconstruction, limits, terminal exit, and report ordering remain joined. |
| RR-15 | **UPHELD / LOCALLY CLOSED** | Bootstrap authority, prompt digest/task identity, encrypted carrier equality, continuous custody, descriptor-secured report hashing, and closing rechecks remain present and consistent with the declared external provider boundary. |
| RR-16 | **UPHELD / LOCALLY CLOSED** | Formation critique remains separate from final-state challenge, and the final-state order and exact challenge-to-gate hash join remain executable. |
| RR-18 | **UPHELD / LOCALLY CLOSED** | D19-D24 retain one exclusive effects/N/A row each, and D25 carries the exact six-row ledger. |
| Implementation-ledger identities | **UPHELD AS BYTE IDENTITY ONLY** | All 32 recorded paths hash to their recorded SHA-256 values. Matching bytes do not prove the cross-file RR-17 semantics, and two relevant surfaces, `tools/consumer-universe-return.mjs` and `return.schema.json`, are not rows in that identity table. |

## Finding 1 — source projection can produce a false green

### Contract boundary

`PROVENANCE.md:95-118` requires recursive runtime, type, dynamic, and CSS import
discovery, an exact disposition for every supported edge, literal specifiers,
and an auditable non-resolvable branch. `waves/M-C.md:37` repeats static
runtime/type/dynamic/CSS imports, exact occurrence evidence, and omission
rejection. `CONSUMER-UNIVERSE-BOUNDS.json:32-57` authorizes all eight kinds for
all five package scopes.

### Executable mismatch

`tools/resolve-consumer-universe.mjs:447-480` projects source with six regular
expressions. The decisive expressions are:

```text
dynamic  /\bimport\s*\(\s*(["'])([^"']+)\1\s*\)/
type     /\b(?:import|export)\s+type\b...\bfrom\s*(["'])([^"']+)\1/
runtime  /\b(?:import|export)\b(?!\s+type\b)...\bfrom\s*(["'])([^"']+)\1/
```

The dynamic expression has no template-literal arm. The type expression
recognizes only statement-level `import type` or `export type`; a declaration
whose named specifier is `type` enters the runtime arm.

The exact expressions were applied in memory to these bytes:

```ts
import { type Value } from "@mkbabb/value.js";
export type Wrapped = Value;
export const load = () => import(`@mkbabb/value.js`);
```

The read-only result was:

```json
{"matches":[{"kind":"runtime","specifier":"@mkbabb/value.js","locator":"runtime:1:1"}],"dynamic_template_detected":false,"inline_type_classified_as_type":false}
```

This is sufficient to prove the false-green path without executing the
filesystem-writing resolver. `scanEdges` calls this projector at lines 483-529.
`observedEdgeMap` can therefore contain only the runtime tuple. If the input
declares that one runtime tuple, lines 716-725 find neither an undeclared
observed tuple nor an unproved declared tuple. The missed template occurrence
never participates in either comparison. With all roots and the one declared
edge included, `blockers` remains empty and lines 825-831 derive
`resolvable:true` and a self-hashed receipt. The return validator cannot
reconstruct syntax the resolver did not observe; its occurrence check at
`tools/consumer-universe-return.mjs:174-207` validates only receipt observations
and path coverage against the already misclassified input.

The current focused control does not close this grammar. Its source fixture at
`tools/selftest-consumer-universe.mjs:105-142` uses a conventional quoted
runtime import. Its omitted-edge mutations at lines 613-627 remove recognized
runtime, lock, or transitive rows. No control supplies a zero-substitution
template import, a pure inline type import/export, or the combined false-green
case above.

The finding is **UPHELD**. The critic's proposed technology is not uniquely
required: a particular parser library is an implementation choice. The
contractual obligation is a deterministic syntax-aware projection for the
claimed static grammar, with fail-closed handling of unsupported or ambiguous
candidate import syntax before any resolvable receipt.

## Finding 2 — the unavailable branch is not end-to-end inhabitable

### Normative branch and current authority

`PROVENANCE.md:101-118`, `RETURN-CONTRACT.md:494-505`, and
`waves/M-C.md:37,42` define a required root as included or unavailable, never
excluded. A valid unavailable root or edge carries evidence and an
existing-wave retrigger, produces a blocking receipt, sets `resolvable:false`,
and exits 2. The input schema implements unavailable root and edge arms at
`consumer-universe.schema.json:210-273`.

The canonical bounds bytes are internally consistent:

```json
{"file_sha256":"aefd4ff211c644a8b96916cfb1229ccd4b535a6304497e44696948f0db246437","bounds_sha256":"43029aea41d939ec908778d26b3763668599c7c2ac4afc65ba85d55e65c05d83","manifest_hash":"390038efc53df1e60ae3c89a98b4db55bbbfbe93c6a15ae61bae23e0da402b88"}
```

All 15 required roots and six required paths are currently observable. That
explains the ordinary green path but does not authenticate the typed absent
branch.

`tools/consumer-bounds-authority.mjs:185-204` unconditionally requires every
required root to exist as a directory and resolve to its declared realpath.
Lines 206-255 do the same for every required subdirectory. In contrast,
`tools/resolve-consumer-universe.mjs:623-639` requires an unavailable root to be
absent, validates evidence and retrigger, and adds a blocker. Its required-path
logic at lines 146-201 skips a child only when its owning root is unavailable.

Two in-process read interceptions independently reproduced the authority
boundary without changing any filesystem byte:

```json
{"branch":"required-root-absent","result":"REJECTED","message":"consumer-universe required root is unavailable: slides-k"}
{"branch":"required-subdirectory-absent","result":"REJECTED","message":"consumer-universe required path is unavailable: words/frontend"}
```

The second result is correct when `words` is available. It becomes
contradictory only when the owning required root has the valid unavailable
disposition; the authority has no disposition input and cannot distinguish the
two states. The required-root finding is **UPHELD** and the subdirectory claim
is **NARROWED** to this inherited case.

`tools/consumer-universe-return.mjs:137-148` invokes the disposition-blind
authority before it reads the matching input-root disposition. Consequently a
resolver-produced unavailable required-root receipt cannot reach receipt
projection validation even with `requireResolvable:false`.

### Observed incoming edge

An available source can still contain a supported import of a package whose
internal target root is unavailable. The scanner observes that source
occurrence. The resolver nevertheless offers no valid disposition:

- `tools/resolve-consumer-universe.mjs:704-708` rejects `included` when the
  internal target root is not included;
- lines 709-712 reject `unavailable` for every edge from an available source;
- `excluded` does not express the contract's blocking unavailable state.

If this resolver restriction were removed alone, the receipt layer would
still reject the result. `tools/consumer-universe-return.mjs:193-207` requires
zero observations for every unavailable edge instead of distinguishing an
unobservable unavailable source from an observed incoming edge to an
unavailable target. This finding is **UPHELD**.

### Universal return and C05 separation

Three independent return controls preclude the blocking C00U annex:

1. `validateConsumerUniverseReceipt` defaults `requireResolvable` to true at
   `tools/consumer-universe-return.mjs:93-101` and enforces it at line 228.
   `tools/validate-return.mjs:883-890` does not select the blocking mode.
2. `return.schema.json:1017-1072` permits both C00U and C05 as annex owners but
   fixes every such annex to `resolvable:true` and `blockers:[]`. Schema
   validation occurs before annex logic at `tools/validate-return.mjs:303-315`.
3. Live annex replay at `tools/validate-return.mjs:897-918` treats every
   nonzero resolver status as failure. The specified unavailable receipt exits
   exactly 2.

The existing unavailable control at
`tools/selftest-consumer-universe.mjs:669-697` checks only resolver output and
exit 2. The return-annex control at lines 294-346 uses the earlier green
receipt. It does not exercise authority, blocking receipt validation, blocking
annex schema, outer C00U return, or live exit-2 replay together.

The universal-return finding is **UPHELD AND BROADENED** by the annex-schema
and replay-status evidence.

C05 must not be loosened. `PROVENANCE.md:118-124` and
`waves/M-C.md:50` require a fresh exit-zero, blocker-free receipt.
`tools/validate-return.mjs:560-582` enforces the central edge policy, whose
default completion predecessor requires C00U `COMPLETE`; a C00U `BLOCKED`
return therefore cannot advance C05. The correct composition is:

- C00U `COMPLETE` requires exit 0, `resolvable:true`, and no blockers;
- C00U `BLOCKED` may carry the authenticated exit-2 unavailable receipt and an
  exact blocking routed remainder;
- C05 and deletion consumers continue to require exit 0,
  `resolvable:true`, no blockers, and a completion-eligible C00U predecessor.

This separation is **UPHELD AS CORRECT**.

## RR-14, RR-15, RR-16, RR-18, and ledger checks

### RR-14

`tools/clean-exec-contract.mjs:708-776` constructs and classifies the exact
launch/poll sources. Lines 792-848 enforce exact outer result shape and terminal
exit. Lines 1211-1463 enforce contiguous call/output records, chronology,
same-session ownership, output reconstruction, poll/time/byte limits, terminal
closure, and report/interruption ordering.

An independent in-memory fold produced one valid two-poll run and rejected a
wrong-session poll:

```json
{"valid":{"runs":1,"polls":2,"output":"abc","elapsed_ms":400,"failures":[]},"wrong_session":{"runs":0,"failures":["calls/p: poll session 42 does not own pending run 41","runs/s: pending run has no terminal poll"]}}
```

RR-14 is **LOCALLY CLOSED**.

### RR-15

`tools/clean-provider-bootstrap-authority.mjs:72-153` checks exact authority
keys, file/self hashes, the eight-record calibration prefix, same-parent
identity, calibration chronology, and the observed provider digest projection.
The current read-only validation returned:

```json
{"schema":"vnext-clean-provider-bootstrap-authority/1","calibrated_at":"2026-07-19T20:05:53.477Z","calibration_session_id":"019f7bfc-2eb2-7a70-b52a-d6be55dea6b7","manifest_hash":"8f0a30a2f6321ee4682dc8aa3646ef8ff31c0e6b888a331f8c75aca43f410f08"}
```

`tools/clean-pass-prompts.mjs:31-52` seals the prompt body and puts its digest
in the task identity. A one-byte digest mutation was rejected. The carrier
join at `tools/clean-exec-contract.mjs:683-695` accepted byte equality and
rejected unequal ciphertext. `tools/clean-coordinator-custody.mjs:318-363`
requires one continuous physical interval; lines 435-837 consume the exact
quiescence, absence, spawn, completion observation, persistence, and immediate
hash sequence through the pass-2 adjudicator hash. `tools/hash-clean-report.mjs:47-100`
uses no-follow descriptor identity and metadata continuity.
`tools/validate-clean-passes.mjs:837-897` revalidates custody and rehashes
sessions, reports, bootstrap authority, manifest, and corpus at close.

The explicitly documented inability of local content validation to prove
provider existence or plaintext delivery remains an external trust boundary,
not an overclaim in these local mechanisms. RR-15 is **LOCALLY CLOSED**.

### RR-16

`tools/formation-proof-layer.mjs:10-23` fixes the order `born_red`, `partition`,
`implement`, `freeze`, both critics, adjudicator, acceptance gate/crater,
receipt, and return. `waves/P-V.md:5-36` keeps pre-implementation formation
critique distinct from that immutable final-state challenge.
`tools/validate-return.mjs:2269-2378` requires distinct critics, exact critic
inputs, adjudication after both critics, and every gate after adjudication;
lines 2382-2388 join the exact challenge hash to every gate receipt.

The read-only formation-proof load returned no failures and proof SHA-256
`3a3301eee756102a80068d180d51209eb56299273df1ac299c13ba33b282cd8c`.
RR-16 is **LOCALLY CLOSED**.

### RR-18

`tools/formation-proof-layer.mjs:25-41` fixes six rows: D19 `relocate`; D20,
D21, and D23 `engage`/`release`; D22 the only N/A arm with reason and evidence;
and D24 `birth`. `waves/G-D.md:29-33,90-96` carries the same exclusive marker
and row text. `tools/wave-contract.mjs:42-105` injects the per-wave or D25 full
ledger projection into the hashed wave contracts.

The independent contract load returned the exact six rows, no proof failures,
and D25 contract SHA-256
`c8134771c46870de8764624f51d3a80766366a3c297720ecc89ffbe76ca3e2f2`.
RR-18 is **LOCALLY CLOSED**.

### Ledger identities

Every SHA-256 row at
`reviews/ROOT-REPAIR-IMPLEMENTATION.md:155-190` was recomputed from current
bytes:

```json
{"rows":32,"mismatches":[]}
```

The identity claim is **UPHELD**. It authenticates those bytes only. In
particular, it cannot cure a semantic contradiction among matching files, and
the correction ledger must cover every amended return surface rather than rely
on the present selected list.

## Minimal correction waves

The following three dependent formation-only slices are sufficient. They do
not authorize production work.

### Slice 1 — C00U static-source projection

1. Replace or front the expression-only source scan with a deterministic
   syntax-aware projection for the grammar C00U claims. At minimum, recognize
   zero-substitution template dynamic imports and classify pure inline
   TypeScript import/export type specifiers as `type`. Mixed value/type forms
   must have an explicit, tested projection.
2. Preserve exact occurrence coordinates and literal specifiers. Any candidate
   import syntax outside the supported projection must fail closed before a
   resolvable receipt; it may not disappear silently.
3. Add positive and mutation controls for quoted dynamic import, template
   dynamic import, statement-level type import/export, pure inline type
   import/export, mixed type/value declarations, omission, wrong kind, and the
   combined same-file false-green reproduction.

### Slice 2 — disposition-aware bounds, resolver, and receipt

1. Separate immutable bounds-shape authentication from disposition-aware live
   presence. Preserve exact authority bytes/self-hash, 15 IDs, six typed path
   laws, absolute declared coordinates, containment, scopes, kinds, quarantine
   exclusions, and limits.
2. Require included or excluded roots to be present canonical Git roots. Permit
   a required unavailable root only when the declared path is absent and its
   evidence/retrigger are valid. Required roots remain non-excludable.
3. Require each typed subdirectory when its owning root is available. When the
   owner is validly unavailable, carry the root blocker and do not require an
   impossible child realpath. Continue to reject a missing child under an
   available root.
4. Define and implement the edge matrix. An edge from an unavailable source is
   unavailable and has no source observations. An observed edge from an
   available source to an unavailable internal target is unavailable, retains
   every exact source observation, carries evidence/retrigger, and contributes
   a blocker. Receipt validation must apply the same distinction rather than a
   blanket zero-observation rule.

### Slice 3 — C00U blocking return with strict C05 separation

1. Allow the annex schema to represent a blocking C00U receipt, while retaining
   `resolvable:true` and `blockers:[]` as constants for C05. Enforce the outer
   C00U status relation in code: `COMPLETE` is green; the typed unavailable
   branch is `BLOCKED` with a nonempty exact blocker/routed-remainder join.
2. Invoke receipt validation with `requireResolvable:false` only for that C00U
   blocking branch. Accept live resolver exit 2 only there and validate the
   emitted receipt. Continue to require exit 0 everywhere dependency green is
   claimed.
3. Add one end-to-end control for each of: included root, excluded available
   root, unavailable required root, required path under unavailable owner,
   missing path under available owner, unavailable source edge, observed
   incoming edge to unavailable target, C00U `COMPLETE`, C00U `BLOCKED`, and C05
   rejection of every blocking predecessor. Each blocking control must traverse
   resolver, authority, receipt, annex schema/projection, universal return, and
   live replay.

## Revalidation and reset consequences

1. Amend only formation contracts/tools/tests needed by the three slices. The
   semantic bounds need not change. If `CONSUMER-UNIVERSE-BOUNDS.json` remains
   byte-identical, its current file, semantic-bounds, and manifest hashes remain
   valid; no hash should be changed merely to signal a repair.
2. Recompute every genuinely affected code/schema/contract identity. At
   minimum the resolver, bounds authority, receipt validator, universal return
   validator, return annex schema, and their controls will acquire new hashes.
   Refresh the implementation ledger and include the corrected return surfaces.
   Every earlier receipt bound to the old resolver/schema hashes must be
   regenerated.
3. Revalidate the C00U and C05 source/authority/receipt/universal-return matrix,
   then the shared formation consumers located by direct reference:
   deletion judgment, Keyframes public-package and target-transpose controls,
   and Value target-resolution and target-transpose controls. Revalidate wave
   contracts and the non-production formation aggregate after all hash joins
   settle.
4. Freeze a new corpus projection and record its new count and SHA-256. Do not
   reuse either authenticated critic input or this adjudication as evidence for
   that new subject. Run one wholly fresh RR-14-through-RR-18 critic A/critic B
   pair and adjudicator after the correction freezes. RR-14, RR-15, RR-16, and
   RR-18 require no presently identified source repair, but the combined
   focused review must bind the new epoch.
5. The whole-formation clean-pass manifest is absent. The clean-pass count
   therefore remains zero, and any correction preserves/reset it at zero. Only
   after the new focused triad is clean may the two required fresh
   whole-formation clean triads begin. Production remains **0/190** throughout.

No correction was implemented, no product or parser workload was executed, and
nothing was staged or committed by this adjudication.
