# Fourier F-L1 R2 hostile Sol adjudication

**Date:** 2026-07-29  
**Model route:** fresh GPT Sol xhigh  
**Mode:** read-only adjudication of the complete isolated R2 output  
**Terminal disposition:** **AMEND — SAME-LEVEL RERUN**  
**Product-source edits:** none

## Ruling

The conservative recommendation remains valid:

> `KEEP-BASELINE-NO-FINAL-SELECTION`

F-L1 A, local full snapshots, remains the correctness/default baseline.
F-L1 B, C, and D remain BLOCKED/UNSELECTED. The full 250-version operation
timing absence remains explicit and the 64-version timing diagnostic receives
no admission credit.

R2 is nevertheless not admission-clean as published. The smallest honest
remedy is a same-level R2 rerun with regenerated raw samples, receipts, and
checksums. Relabeling the existing output cannot repair the measured bytes or
missing controls; the bounded measurement defects do not justify an R3
architecture reset.

## Independently retained evidence

- The 144-run corpus is exact: 48 × 25-version admission timing, 48 ×
  100-version admission timing, 24 × 250-version admission storage-only, and
  24 × 64-version diagnostic-only rows.
- `benchmark.py:244-259` excludes the 64-version diagnostic rows from
  recommendation comparisons.
- `releaseHash` is event identity and `contentDigest` is payload identity.
  Across all 375 manifest events, zero release hashes equal their content
  digests.
- Same-object repeated content and two-object identical content preserve
  ordered release membership, authorship, read, diff, and revert isolation.
- Five correctness tests pass; all current 12 direct membership,
  authorization, and revert wrong-answer controls reach the fault and are
  refused by the corrected path.
- Restore liveness, digest corruption, reconstruction, and injected
  post-physical-write rollback pass.
- Requested 0/50/100 overlap is recorded with its actual denominator. The
  25-version partial cell honestly reports 52 percent, or 13/25; the 64, 100,
  and 250 partial cells are exactly 50 percent.
- All 144 raw storage rows satisfy record-count and raw/backend arithmetic.
- Every 25/100 timing row contains authorized current/historical read and
  revert p50/p95; no 250 row contains operation timing.
- All 171 recorded checksums verify; the receipt records both command exits,
  overall exit zero, and CPython 3.14.5.

## Required corrective rows

| ID | Defect | Exact evidence | Required correction |
|---|---|---|---|
| R2-A1 | mixed compression level | `provenance_harness.py:484-486` uses level 6 for per-record and metadata/index records, but `:488` hard-codes level 9 for payloads; `:499-502` adds the two into one total while `environment.json:13` and `report.md:23` claim level 6 | use `COMPRESSION_LEVEL` everywhere, add a one-codec/one-level invariant and wrong-answer control, rerun |
| R2-A2 | metadata/index gzip is mislabeled and unsplit | `metadata_index_gzip` compresses metadata plus indexes at `:485-486`, then emits as `metadata_index_aware_metadata_gzip_bytes` at `:499`; no independent index-gzip field exists | emit separate metadata, index, and payload gzip fields plus their sum |
| R2-A3 | direct read mutant absent | `mutants/manifest.json:4-16` and `test_correctness.py:152-176` define membership, authorization, and revert only, although the Fourier union requires membership, authorization, read, and revert | add one direct family-specific read wrong-answer mutant for A/B/C/D; require 16/16 total cells |
| R2-A4 | mutating-operation warmup claim is false | `benchmark.py:50-56` prepares six targets but passes `warmups=0`; raw/report claim one warmup. Storage-only rows also carry timing metadata despite no timings | actually consume one prepared warmup; emit null/zero timing metadata for storage-only rows |
| R2-A5 | exact operation samples are discarded | `provenance_harness.py:796-805` returns only aggregates and `benchmark.py:106-111` flattens p50/p95, so saved raw cannot recompute them | retain all five `samples_ns` values and derive saved aggregates from them |

The mixed metadata/index-aware column does not contaminate the current
recommendation comparison: `backend_shaped_gzip_bytes` is derived from the
all-level-6 `per_record_gzip` plus explicit 32-byte record overhead, and
`benchmark.py:255-257` selects on that field. The decision therefore stays
conservative while the evidence remains blocked.

## Admission order

1. Preserve the current R2 output immutable as falsified evidence.
2. Produce one isolated R2 amendment output with R2-A1 through R2-A5.
3. Run the complete 25/100/250 plus diagnostic matrix and regenerate
   environment, command, raw-sample, result, report, and checksum receipts.
4. Dispatch one fresh Sol critic over the amendment.
5. Fold the admitted result into Fourier N.W4 and Value V.A2 without selecting
   B, C, or D unless the complete 250-operation and immediate-consumer gates
   independently justify it.

Until then: **R2 RAW/AMEND; A DEFAULT; B/C/D UNSELECTED; NO PRODUCT
PRESCRIPTION**.
