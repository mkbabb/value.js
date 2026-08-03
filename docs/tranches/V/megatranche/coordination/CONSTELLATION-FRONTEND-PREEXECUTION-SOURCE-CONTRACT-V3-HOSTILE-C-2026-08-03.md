# Frontend pre-execution source contract v3 — hostile C

Verdict: `AMEND / SOURCE_CONTRACT_RED`

Stable reviewed identities are v3 Markdown `e39cd8d1…` and JSON
`13e675de…`; JSON parsing and duplicate-key checks are green.

## First material falsifier

`ROOT_AUTHORIZATION_CHECKSUM_ACK_CYCLE`, gate 1.

The authorization embeds the checksum and acknowledgement that are required
to be written after and cover it. If embedded hashes name predecessors, those
predecessors cannot cover the new authorization; if they name later bytes, a
cryptographic fixed point is required.

## Secondary defects

1. issuer-lineage and acknowledgement bytes have no allowed external paths;
2. capture/writer independence has no author-lineage foreign keys, and capture
   raw streams are not sealed members;
3. applicability/state cardinality and expectation `N/A` are ambiguous;
4. runtime-controller and per-control result bytes are not sealed artifacts;
5. terminal tuple lacks issuer-lineage and authorization-chain proof.

The correct trust sequence is upstream-only authorization, later covering
checksum, later one-way acknowledgement, then final dispatch receipt.
