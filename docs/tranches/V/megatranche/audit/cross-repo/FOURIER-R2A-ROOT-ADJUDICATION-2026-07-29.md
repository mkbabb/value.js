# Fourier R2A root adjudication

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Verdict:** **AMEND — SAME-LEVEL EVIDENCE-INTEGRITY RESEAL**  
**Storage selection:** A remains the correctness default; B/C/D remain
blocked and unselected

## Independent result

The Fourier owner adjudication and fresh external Sol falsification converge:

- XR-22 A1–A5 pass 5/5;
- the 144-row matrix and 96 summary groups reproduce;
- all 7,200 retained samples reproduce their p50/p95 values;
- 16/16 family-specific membership, authorization, read and revert mutants
  reach the wrong answer and pass after repair;
- uniform gzip level 6, split partition arithmetic, warmup truth and the
  24 full-250 null-timing rows are honest; and
- all 170 R2A-listed and 171 original-R2-listed checksums verify.

Those listed manifests are not recursive seals of the promised `outputs/**`
trees. R2A loaded original R2 test code with bytecode enabled after the R2
seal, creating an unlisted
`R2/outputs/__pycache__/test_correctness.cpython-314.pyc`. This is an
evidence-integrity failure, not an A5 failure or an algorithm mismatch.

Fresh Sol authority:

- report
  `3e2368983a4aca8a9c9597470de1cfa9ffbe771644ff1befb460475f9bcc6eaa`;
- findings
  `e4753a23daac96f01a206fc0872bbe16d1e04efff079e3f1f2e0fc758180aa40`;
- recomputation
  `be2d920bb60b83f0bdda7f3cba730d713d57e6a737c613535af57979db765405`;
- integrity reseal
  `5c7c31151100346b65b7730d23cf18e3868ff16da3520d6b6b64e18e120c434a`.

## Admission split

The later P35–P43 controls do not reopen XR-22. They split as follows.

### Storage-admission prerequisites

These must close before the measurements may select a storage family:

- **P35 — ordered index:** A/B/C/D accept `[0, 99]`; require contiguous
  append index and family-wide wrong-answer controls.
- **P36 — malformed-root and family-write atomicity:** rejected roots and
  generic post-write exceptions leave metadata/payload/trie residue; require
  pre-validation and transaction-complete rollback across A/B/C/D.
- **P37 — declared-tail and full-250 timing:** existing 250 rows truthfully
  omit timing, while existing update timing appends item 1 to a one-release
  history. Preserve the honest null rows; add a separate 24-cell 250-version
  selection-timing companion and measure update at the declared history tail
  for every timed denominator.
- **P38 — canonical release envelope:** erasing any of 13 canonical fields
  remains false-green across A/B/C/D; independently recompute and validate the
  full envelope rather than trusting the supplied release hash.
- **P43 — live workload schema:** bind the exact Value palette and current
  Fourier visualization/version payload shapes in the manifest and fixtures;
  do not call a hybrid fixture schema-faithful without that label.

These rows **FOLD** into Fourier N.W4.U1–U6 and the Value V.A2 admission
mirror. They are benchmark truth and selection prerequisites.

### W4 implementation gates

These are direct product-policy obligations independent of A/B/C/D
measurement:

- **P39:** private history and diff authorization;
- **P40:** restore actor/time attribution;
- **P41:** revert actor/user/parent/time attribution; and
- **P42:** append refusal while deleted.

They **MOVE** to Fourier N.W4's policy/consumer implementation gates and the
Value V.A1–V.A3 mirror. They do not force another storage-family benchmark
dimension.

## Bounded reseal contract

Continue the same genuine-Luna provenance task into a new isolated output
root. Preserve R2 and R2A byte-for-byte as forensic evidence.

1. Copy and hash every executable input dependency into the isolated root.
2. Run only with `-B` and `PYTHONDONTWRITEBYTECODE=1`.
3. Record recursive, closed-allowlist, whole-tree hashes before and after for
   every external input and the complete output; no cache or extension
   exclusion.
4. Reproduce the original 144 rows and their deterministic storage fields.
5. Add P35/P36/P38 family-wide controls and the P43 exact schema manifest.
6. Preserve the 24 honest storage-only 250 rows and add a separately labeled
   24-cell full-250 selection-timing companion.
7. Measure every update at the actual declared tail for 25, 64, 100 and 250;
   retain one warmup and five samples per measured operation.
8. Retain P39–P42 as born-RED wave evidence, not benchmark dimensions.
9. Return `KEEP-BASELINE-NO-FINAL-SELECTION`; a fresh Sol must falsify the
   reseal before Fourier N.W4 or Value V.A2 can consume it.

Terminal dispositions: **KEEP** A1–A5; **SPLIT** evidence sealing from
benchmark mechanics; **FOLD** P35/P36/P37/P38/P43 into measurement admission;
**MOVE** P39–P42 to W4 implementation; **PRUNE** any attempt to relabel this
work R3, select B/C/D, rewrite R2/R2A, or prescribe product source.

No product source or repository state was changed.
