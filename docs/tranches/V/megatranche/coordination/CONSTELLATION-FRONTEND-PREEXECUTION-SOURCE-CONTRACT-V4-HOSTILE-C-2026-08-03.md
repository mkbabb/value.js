# Constellation frontend pre-execution source contract v4 — hostile C

Date: 2026-08-03

Verdict: `AMEND / SOURCE_RED`

Authority and credit: 0

## Authenticated coordinate

- v4 Markdown: `429dff419782a736972cc1dfea369d5f60ee6224922139fc310b8dea8e580e3d`
- v4 JSON: `24a7cf655bd3f87d07ca8946f6bd122afd80ffc7e700fc04937c49996200fbc8`
- independently recomposed effective v4: 23,375 canonical bytes, SHA-256
  `1e3af794c11107fa87ca2520e812f0057d827835ea416da892193136ef7c0169`

## First material falsifier

`TOP_LEVEL_REPLACEMENT_DROPS_DECLARED_RETAINED_V3_LAWS`

Independent recomposition confirms that v4's no-deep-merge replacements erase
the definitions which several replacement booleans claim to retain. In
addition to the axis/state, surface/state, D1/D2, oracle, and control losses,
the effective validator-process-receipt section has no exact field schema. A
malicious writer can therefore provide weak schemas and still satisfy the
advertised effective hash.

## Verified secondary defects

- root and coordinator keys need not be distinct; validity and revocation are
  not checked at each signed artifact's issuance time;
- one early absence receipt does not prove continuous writer-root absence
  through dispatch;
- the leaf-extraction receipt is neither authorization-pinned nor an inner
  member;
- `stateVectorId` has no record, member, or derivation target;
- final-tree membership is ambiguous around terminal tuple/signature bytes;
- repository-universe discovery lacks a separately pinned seed/search-root
  denominator and sealed oracle-execution receipt.

The review was read-only. No packet, product execution, slot, or credit follows.
