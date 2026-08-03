# Constellation frontend pre-execution source contract v4 — hostile B

Date: 2026-08-03

Verdict: `AMEND / SOURCE_RED`

Authority and credit: 0

## Authenticated coordinate

- v4 Markdown: `429dff419782a736972cc1dfea369d5f60ee6224922139fc310b8dea8e580e3d`
- v4 JSON: `24a7cf655bd3f87d07ca8946f6bd122afd80ffc7e700fc04937c49996200fbc8`
- independently recomposed effective v4: 23,375 canonical bytes, SHA-256
  `1e3af794c11107fa87ca2520e812f0057d827835ea416da892193136ef7c0169`

## First material falsifier

`COMPLETE_REPLACEMENT_ERASES_CLAIMED_V3_LAWS`

V4 explicitly deletes and completely replaces `axisAndStateDomains`,
`surfaceAndStateContracts`, `designAndOracles`, and `controlRegistry`; deep
merge is forbidden. Their replacements contain inert `retainsV3...: true`
flags rather than the deleted machine definitions. The effective bytes
therefore lack axis IDs, state kinds, the joint-predicate grammar,
applicability fields, surface/state/action/timepoint schemas, D1/D2 laws,
mutation kinds, and owner/non-owner production-control law.

V3 is neither an allowed external read nor an inner member. A coherently
resealed packet can reduce those domains or submit templated D1/control data
while satisfying every remaining v4-local boolean. The earliest failure is
axis/state validation gate 6.

The review was read-only. No packet, product execution, slot, or credit follows.
