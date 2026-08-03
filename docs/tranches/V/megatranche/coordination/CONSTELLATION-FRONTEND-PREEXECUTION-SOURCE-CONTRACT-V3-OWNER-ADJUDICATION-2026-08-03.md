# Frontend pre-execution source contract v3 — owner adjudication

Ruling: `REJECT_V3 / AUTHORIZE_V4_SOURCE_CONTRACT_ONLY`

Authority outside common source-contract authorship: none

Execution and credit: 0

## Exact inputs

- v3 Markdown `e39cd8d1949c5fc7f21a493977860ea30863c4dd0d9e11e0e347334c5f530a51`;
- v3 JSON `13e675deb55fe051736f6b9a963e5fe00d59f89fb407d5a84ee6fdc2b216cc85`;
- hostile A `fe984339ca335457d507178049e360b59289ee1c19b8714a588d7139c411aa48`;
- hostile B `a48c4cf82827bcaaf515129ebe719bde1b7c10268fda8de00c6116431f53bd53`;
- hostile C `3993f3aa045e65cf0e0dc9a943d9dbadecea9850a703aec11761529bd92f164f`.

## Ruling

V3 is terminal source RED. It closes v2's omitted snapshot/capture/root and
cross-repository universe design, but its new root authorization is
cryptographically cyclic: authorization contains hashes of the checksum and
acknowledgement required to cover it.

V4 must use a strictly forward trust DAG:

1. `A` — authorization payload containing only predecessor and capture pins;
2. `C` — checksum packet written after and covering `A`;
3. `R` — one-way acknowledgement written after, binding `A` and `C`;
4. `D` — dispatch receipt written last, binding `A/C/R`, writer absence, and
   issuer lineage.

No upstream artifact may contain a downstream hash. All four exact bytes are
allowlisted external validator inputs and byte-identical inner copies.

V4 must also close the secondary joins: external consumer-universe
denominator; state-kind applicability and collision-free cell identity;
expectation-level `N/A`; D1 equivalence witness; capture/writer lineage;
runtime controller and raw capture/control artifacts; control-leaf extraction;
and terminal issuer/authorization chain.

V4 is authorized only as a common source-contract coordinate. It requires two
fresh hostile reviews and later owner adjudication. No repository packet,
execution, candidate, admission, or credit follows.
