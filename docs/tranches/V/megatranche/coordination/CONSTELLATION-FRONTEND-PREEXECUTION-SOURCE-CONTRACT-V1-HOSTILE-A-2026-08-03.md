# Frontend pre-execution source contract v1 — hostile A

Verdict: `AMEND / SOURCE_CONTRACT_RED`

Mode: read-only tranche audit

Authority and credit: 0

## Reviewed coordinate

| File | SHA-256 | Bytes | Lines |
|---|---|---:|---:|
| `CONSTELLATION-FRONTEND-PREEXECUTION-SOURCE-CONTRACT-2026-08-03.md` | `edd6bf6e9be80e093e704697a6fb76256a95f17c93a4def84ea7b7d0db9b3ba1` | 13,307 | 266 |
| `CONSTELLATION-FRONTEND-PREEXECUTION-SOURCE-CONTRACT-2026-08-03.json` | `70bec13105b6042aa0d85e8e956e074bec6f02a142a154a0d3a5441f262bc6ce` | 16,766 | 629 |

JSON parsing is green and the 17 declared packet-member names are unique.

## First material falsifier

`CONTRACT_AND_VALIDATOR_TRUST_ROOT_UNBOUND`, validation gate 1.

The only external semantic pin is the broad Safari law. `PACKET.json`,
`VALIDATOR.mjs`, its process receipt, and checksums are mutually self-authored
packet members. No machine schema hard-pins the reviewed contract Markdown and
JSON identities, an owner adjudication, or an independently expected validator
identity/derivation. A weaker validator and matching packet can therefore
authenticate each other while claiming the same broad law.

The same gate contains a second mechanical defect: `checksums.sha256` is in the
exact member set while every member must be hashed. No inner/outer domain,
self-exclusion, ordering, checksum-last rule, or external final seal resolves
the fixed-point problem. The validator receipt also cannot preexist the
validation it records.

## Secondary defects

1. Source closure has no authenticated full snapshot, discovery program, or
   independent expected-membership root.
2. Subject null encoding, path normalization, ordinal derivation, and the
   closed repository namespace are unspecified.
3. Topology edges may reference arbitrary nodes because no node/root registry
   or root-to-leaf closure exists.
4. The 12 axis names have no closed member universe or cross-axis predicate;
   applicability rows also lack IDs even though cells reference them.
5. D1/D2 fields are not machine typed, their semantic projections are
   undefined, and neither foreign-keys the author-lineage registry.
6. Kronecker states, actions, expectations, oracles, and exact copy/a11y/motion
   products lack typed schemas and cardinalities.
7. Platform/performance records omit complete later runtime, percentile,
   cold/warm, origin, command, and raw-evidence receipt law.
8. zero-credit and validator-process receipts lack exact schemas and an
   authenticated owner stop.

## Disposition

Preserve v1 unchanged as terminal RED archaeology. A v2 coordinate must define
an externally pinned packet envelope, a noncircular inner/outer seal, typed
record schemas and joins, and an independently derived full source closure.
No execution or successor packet follows from this review.
