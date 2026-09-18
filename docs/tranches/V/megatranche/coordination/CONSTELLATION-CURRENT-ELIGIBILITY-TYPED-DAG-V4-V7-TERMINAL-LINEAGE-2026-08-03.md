# Current-eligibility typed DAG v4-v7 terminal lineage

Date: 2026-08-03  
Mode: tranche development only  
Verdict: `FOUR_TERMINAL_AMEND_COORDINATES_PRESERVED`  
Authority and credit: `0`

## Exact immutable coordinates

| Coordinate | Files / bytes | Full codepoint `0644` identity | Checksum / replay | Terminal first falsifier |
|---|---:|---|---|---|
| v4 | 9 / 73,804 | `3b0491d4b57c6c5a9ec02ac96e65713a5973663cb2515535f9025ed53d9ba7a0` | `858a4d0819a2d4aa1f56a3c44499d10e5dce0d6d9de46a3f4af69b2e11311f4e`, 8/8 | raw semantic RED emitted findings but returned exit `0`; lifecycle state and extra top-level state were also outside the production predicate |
| v5 | 9 / 81,252 | `6c0557fe1f8dbaf75053aca1b68435ba8fbed08c774560da8445737a15440284` | `2617ef63280bace0c2ac9c3a53c144d71484ff095c1abcfb0deb24e4beb81da9`, 8/8 | duplicate raw lifecycle keys were accepted through last-key-wins decoding; the orthogonal graph reading was clean apart from that known protocol defect |
| v6 | 9 / 90,718 | `db80a596e9608017734c5fb04fd2eba9ec5f6064128b3ee76c988999a7750a20` | `c99d8907f2c5f95e521c1cbc3c8ba85f1bcfcf7239af3afe9c7399f86212211a`, 8/8 | invalid UTF-8 was lossily decoded to U+FFFD before canonical comparison; canonical `null` and malformed nested shapes could throw with exit `1` |
| v7 | 9 / 113,476 | `194ae0528b3471fe3014c56352321c55c69ea3a45be166fe016f528b88345bc0` | `43b23500de83bc29d8b9277157af7c3ff7b462d2f474b923c6d6ccdf77ca8a01`, 8/8 | parser topology was exact-bound incorrectly: direct parser-to-candidate was required and the governing direct parser-to-close edge was absent |

All files were regular mode `0644`, nlink `1`; each packet remained unchanged
after review.

## Review disposition

The sequence is cumulative archaeology, not repeated credit:

1. v4 closed the v3 edge-registry and endpoint-cycle false-greens but did not
   fail closed at the raw process boundary or bind lifecycle membership.
2. v5 bound lifecycle and fail-closed semantic exits but admitted duplicate raw
   keys and noncanonical input.
3. v6 added canonical raw-byte comparison but performed it only after lossy
   UTF-8 decoding and was not total over canonical JSON values.
4. v7 closed the raw and totality domains. Its independent raw/protocol review
   was CLEAN. Its orthogonal graph review found that the packet itself encoded
   the wrong caller topology. It also omitted Value non-owner retention
   `0/1,892`, package exports `7/8`, admitted API classes `0/9`, and the
   unsatisfied owner-input evidence law from claimed exact current facts.

No packet may be repaired or resealed in place. V8 is a separate coordinate
and is adjudicated separately.

## Boundary

- v4-v7 source acceptance: `0/4`;
- current pass cells: `0/60`;
- native owner inputs: `0/4`;
- parser receiver: `0/1`, `PAUSED`;
- strict root coordinates: `0/5`;
- candidate, ordered cleans, owner intake, close: absent;
- product, Browser, Safari, API, Docker, package, release, rebind, admission,
  authority, and credit: `0`.

