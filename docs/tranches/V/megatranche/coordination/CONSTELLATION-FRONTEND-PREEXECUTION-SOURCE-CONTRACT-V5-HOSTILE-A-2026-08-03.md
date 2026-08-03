# V5 hostile A — trust chronology and seal membership

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Authority and credit: `0`

Reviewed immutable inputs:

- V5 JSON SHA `8be6b8148ceef4bca96284bfe0500c8c582713c2a522e7744a7260f377fd9d93`
- V5 Markdown SHA `b61e5dab5235697d5647448de314b55efd744a0e5b8022cf01ea3956eb9d4203`

## First falsifier

`SIGNED_ARTIFACT_ISSUANCE_TIME_UNREPRESENTABLE`

The trust law requires every signature to validate key-role validity and
nonrevocation at `issuedAtNs`. Signed `CONSTRUCTION-GUARD.json` has the closed
field `createdAtNs` instead, while signed `INNER-SEAL.json` and
`OUTER-SEAL.json` expose `sealedAtNs`, and signed
`VALIDATOR-PROCESS-RECEIPT.json` exposes start/end times. Exact schemas and
`unevaluatedProperties: false` prohibit supplying the required issuance field.

The validator must therefore reject these signed artifacts or invent an
undeclared timestamp alias. Either path leaves role validity, revocation, and
strict forward chronology outside the machine law.

## Secondary defects

- each revocation record carries `issuerSignatureSha256`, but no independent
  per-record signature artifact is in exact membership; pointing at the
  registry signature creates a registry/signature self-cycle;
- `innerSeal.writeJournalSha256` has no exact journal artifact in inner or
  outer membership, so write order cannot be independently replayed.

The positive census remains exact: 46 unique source members, 49 unique
trust/capture members, zero overlap, and seven outer members.

No reviewed bytes were changed. This review authorizes no repository packet,
execution, slot, or successor beyond a separate owner-routed common-law
correction.
