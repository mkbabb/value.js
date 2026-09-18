# Constellation frontend pre-execution source contract v4 — hostile A

Date: 2026-08-03

Verdict: `AMEND / SOURCE_RED`

Authority and credit: 0

## Authenticated coordinate

- v4 Markdown: `429dff419782a736972cc1dfea369d5f60ee6224922139fc310b8dea8e580e3d`
- v4 JSON: `24a7cf655bd3f87d07ca8946f6bd122afd80ffc7e700fc04937c49996200fbc8`
- v3 base JSON: `13e675deb55fe051736f6b9a963e5fe00d59f89fb407d5a84ee6fdc2b216cc85`
- v3 owner adjudication: `2c5202f0ce481036d324c1424ea07d82ce525d0036b953c6c7d384c50ba981ee`
- independently recomposed effective v4: 23,375 canonical bytes, SHA-256
  `1e3af794c11107fa87ca2520e812f0057d827835ea416da892193136ef7c0169`

## First material falsifier

`CAPTURE_AUTHOR_PUBLIC_KEY_UNRESOLVABLE`

The trust anchor cannot verify mandatory `CAPTURE-PACKET.sig`. The machine
schema supplies `captureAuthorKeyIds`, but no capture-author public-key bytes,
key-resolution map, or key-ID derivation law. Root-owner and coordinator keys
have explicit public-key fields; capture-author keys do not. Capture-author
lineage fields likewise contain only an ID and receipt/task/root hashes. This
contradicts the Markdown claim that the anchor contains approved capture-author
public keys and fails validation gate 1.

## Verified secondary defects

- complete replacement erases v3's repository HEAD/tree/object-membership,
  raw-porcelain, and peer-receipt capture schema despite prose saying it remains;
- the claimed authorization-pinned leaf-extraction receipt has no authorization
  field or inner receipt member;
- `candidateGeneratorLineageId` is required on packet and oracles but absent
  from the packet field list;
- one expectation disposition per state-case/kind does not close the seven
  declared timepoints;
- replacement drops the exact validator-process-receipt field schema.

The review was read-only. No packet, product execution, slot, or credit follows.
