# Authenticated pass-provenance hostile B — 2026-08-02

Status: `AMEND_SOURCE_RED / SCHEMA_CORRECTION_REQUIRED / ZERO_AUTHORITY`

Mode: fresh independent tranche-development source review only

## Reviewed coordinate

| Object | SHA-256 |
|---|---|
| law | `aae33795016080760b72d03a1ccfcf11aa26daeedaf8a9d9e58d885e6831a721` |
| hostile-A-corrected matrix | `13b46db5edcb6c1876da5887e84cc5c676ce0384b02ae9fcb02de9d488e4cf0c` |
| three-row checksum packet | `b0265796601a66045bcca2ce2ba1ca7cb133593bf06dda20147faa5a76bd1f8d` |
| hostile A receipt | `71af1ef358637eff3f596d954e87142ba3ac280662fb6ebcad4273294f76ef95` |

The reviewer was a fresh independent read-only hostile seat. Exact model,
task/turn ID, seat ID, and tool marker are not authenticated by an immutable
external receipt and remain `null`. No reviewer identity or authority credit is
inferred.

## Hostile-A correction result

The Fourier correction is clean. Cells 46–50 are `ABSENT`; O1 remains a
context-only `137 PARTIAL / 0 COMPLETE` operation-source subfacet. The matrix
derives exactly `30 AUTHENTICATED_COMPLETE / 25 STALE_UNAUTHENTICATED / 5
ABSENT / 0 PARTIAL`, current-eligible cells `0/60`, subject passes `0/12`, and
owner slots `0/5`.

## First orthogonal falsifier

The law requires every cell to machine-carry model, reasoning, task/session ID,
and tool marker, using explicit `null` when evidence does not authenticate a
field. The first defect occurs at ordinal 1, `PP.value.P1.research`.

Its `modelAndSeat` object carried `modelRoute`, `reasoningEffort`, `taskId`,
`turnId`, `seatId`, and `evidenceAuthenticatesTaskIdentity`, but omitted
`toolMarker`. Mechanical census found the same omission in all `60/60` cells.
Therefore the reviewed bytes could not receive a clean source verdict or owner
adjudication.

## Required correction

Insert explicit `"toolMarker": null` into every one of the 60 `modelAndSeat`
objects, preserve every other classification and evidence coordinate, reseal,
then obtain a fresh independent hostile review. Hostile B may not repair or
review the correction.

## Checks completed before stop

- exact law/matrix/hostile-A hashes and checksum replay `3/3`;
- duplicate JSON keys `0`;
- exact ordered unique cells `60/60`;
- all 34 evidence files rehashed with bytes, mode semantics, and nlink exact;
- Value and Keyframes phase fields, family coverage, owner joins, and P1 -> P2
  -> P3 pins reopened;
- parse-that/Fourier incompleteness, summary arithmetic, and zero-credit fields
  coherent.

No product, parser, Browser, Safari, API, Docker, package, release, rebind, or
candidate command ran. This receipt grants no pass, clean-audit, owner-slot, or
constellation credit.
