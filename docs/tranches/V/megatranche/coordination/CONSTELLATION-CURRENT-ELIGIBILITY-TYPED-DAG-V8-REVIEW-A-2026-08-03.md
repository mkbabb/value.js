# Current-eligibility typed DAG v8 — independent Review A

Date: 2026-08-03  
Verdict: **CLEAN / no material falsifier**  
Scope: raw protocol, totality, source authentication, evidence reconciliation  
Mode: tranche development only  
Authority and credit: `0`

## Packet authentication

- root: `/Users/mkbabb/Documents/Codex/2026-08-03/constellation-current-eligibility-typed-dag-v8-source/outputs`;
- census: 9 regular mode-`0644`/nlink1 files, no other nodes, 126,373 bytes;
- full codepoint-sorted `basename|bytes|0644|nlink|sha256\n` identity:
  `540c17f0507fb804bb08e0bb4737978ea68624e21f3f5729a7579a393b637f70`;
- `checksums.sha256`:
  `b696d4f96103077838ec590b7f1b74d4dc28b3ef88459986e49a89595ef60e64`,
  replay 8/8;
- all 16 external pins authenticated; the pinned root checksum replayed 65/65;
- packet identity was unchanged after review.

## Independent probes

Baseline direct and CLI validation returned zero findings and exit `0`.
Additional canonical booleans, positive/negative/fractional numbers, strings,
arrays, and malformed nested shapes returned structured envelopes without
exceptions. Non-record JSON returned only `model.object-required` at exit `64`.
Invalid and overlong UTF-8 returned `raw.invalid-utf8` at exit `65`, retaining
the original byte count and SHA. Duplicate keys, whitespace drift, and other
noncanonical encodings returned `raw.noncanonical`; invalid JSON returned
`raw.invalid-json`. Semantic RED returned `64`; source authentication failure
is routed to `70`. Caller-supplied finding-like fields did not bypass computed
validation.

Catalog/result reconciliation was exact: 43 catalog cases, 43 result cases,
43 exact expected finding sets, 43 fail-closed exits, 38 semantic direct/raw
agreements, and five raw-protocol cases. Source-before and source-after
identities matched.

## Ruling

Review A is CLEAN for the bounded source packet. It is not product execution,
an owner-input admission, a candidate seal, or authority.

