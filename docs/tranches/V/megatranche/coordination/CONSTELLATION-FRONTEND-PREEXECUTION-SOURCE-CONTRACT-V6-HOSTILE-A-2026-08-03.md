# V6 hostile A — revocation issuance time

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Reviewed bytes: JSON `d4820f25e3b2668e1dc1929be6967e4e499353587fb9277d22821c5ca8d8124a`;
Markdown `2351ffca48167de78fabd18a21d548a873ae99fe7f3d5487e0c03fbc3e0ffe6c`.

## First falsifier

`REVOCATION_RECORD_SIGNATURE_ISSUANCE_TIME_UNBOUND`

V6 requires an embedded domain-separated signature on every revocation record
and requires every signature issuer to be valid and nonrevoked at
`issuedAtNs`. The closed revocation-record schema carries `effectiveAtNs` but
not `issuedAtNs`. The containing registry timestamp cannot substitute because
it is outside the signed record preimage: the same signed record can be placed
in registries issued at different times and checked against different issuer
states. Unknown-field rejection prevents supplying the missing field.

Positive census before the stop: 65 source and 65 trust/review members, both
unique and disjoint; four inner-admin, 24 outer-evidence, and three outer-admin
members; all artifact-level signed receipts have literal issuance time. The
failure is confined to embedded revocation-record signatures.

No bytes were changed. Authority and credit remain zero.
