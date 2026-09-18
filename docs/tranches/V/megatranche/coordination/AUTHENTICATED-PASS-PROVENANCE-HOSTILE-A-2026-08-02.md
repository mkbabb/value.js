# Authenticated pass-provenance hostile A — 2026-08-02

Status: `AMEND_SOURCE_RED / CORRECTION_REQUIRED / ZERO_AUTHORITY`

Mode: tranche-development source review only

## Reviewed immutable coordinate

| Object | SHA-256 |
|---|---|
| law | `aae33795016080760b72d03a1ccfcf11aa26daeedaf8a9d9e58d885e6831a721` |
| first-seal matrix | `e26705513f874c8eebb6fb40ab5039e11e50bac9857a226dc412a34054c9f4aa` |
| first-seal checksum packet | `4218286203d0667708b22290ceced10d522362c9405e14f7b7680173b0b91f9b` |
| first-seal root checksum packet | `c5ea2b2af3f33a22f2f1958bbca52b5d572f15b349bd1465918d40b28b07afaf` |

The reviewer was an independent read-only hostile seat. Its exact model, task
ID, turn ID, and tool marker are not authenticated by an immutable external
receipt and therefore remain `null`; no identity credit is inferred.

## First exact falsifier

`PP.fourier.P1.research`, ordinal 46, was the first inadmissible phase cell.
The matrix classified it `PARTIAL` from `E.FOURIER_O1` selector
`#/137-row-owner-intake`, then reused the same receipt and selector for all five
Fourier P1 phases.

The exact O1 owner receipt, SHA
`f6a270f2eabb0b928e6062ef80fdefb7c4dfe4844cd4b716205b72767fe9aef0`,
authenticates only operation-source availability: 137 rows, all `PARTIAL`, zero
`COMPLETE`. It grants no P1, source, product, count, or authority credit and
contains no distinct `research`, `synthesis`, `prototype`, `critique`, or
`ownerAgglomeration` phase field. Reusing it as five phase coordinates violates
the law's distinct field-level evidence requirement.

The first-seal summary `30 authenticated / 5 partial / 25 stale` was therefore
RED. The O1 subfacet remains valid archaeology but cannot contribute a pass
phase numerator.

## Correction law

The corrected matrix must:

1. classify all five Fourier P1 phase cells `ABSENT` unless phase-specific
   evidence is separately authenticated;
2. preserve O1 as context-only operation-source archaeology at
   `137 PARTIAL / 0 COMPLETE`;
3. derive `30 authenticated / 0 partial / 25 stale / 5 absent` over the exact
   60-cell denominator;
4. preserve current-eligible coverage at `0/60`, subject passes at `0/12`,
   Fourier passes at `0/3`, and all five input slots null;
5. reseal before a fresh hostile B. Hostile A may not repair or review the
   correction.

## Checks completed before the falsifier

- pass checksum replay `2/2`;
- root checksum replay `20/20`;
- exact 60 IDs in declared order with no duplicates;
- all 34 evidence files matched SHA-256, bytes, mode semantics, and nlink;
- Value and Keyframes phase/admission evidence was substantively reopened;
- historical/current separation and all zero-credit fields were preserved.

No product, parser, Browser, Safari, API, Docker, package, release, rebind, or
candidate command ran. This receipt grants no pass, clean-audit, owner-slot, or
constellation credit.
