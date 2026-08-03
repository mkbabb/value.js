# Fourier F-L1 R1 hostile Sol falsification

**Date:** 2026-07-29  
**Mode:** tranche development; read-only adjudication  
**R1 output:** `/Users/mkbabb/Documents/Codex/2026-07-29/fourier-luna-provenance-prototypes/outputs`  
**Terminal:** **REJECT as admission evidence; KEEP as a falsified exploratory
prototype**

The four implementations execute and the saved measurements are useful, but the
R1 verdict cannot select the Value/Fourier storage family.

## Blocking defects

### 1. Release identity collapses into payload identity

`VersionInput.version_hash` is exactly `digest(payload)` at
`provenance_harness.py:182-185`. `VersionMeta` has no distinct content digest,
and B keys both its blob and membership with the same hash at
`provenance_harness.py:360-367`.

That contradicts the formed Value contract:

- `releaseHash` identifies an immutable event and includes object identity,
  release number, parent, author and payload reference;
- `contentDigest` identifies only canonical payload bytes.

The R1 collision test requires two objects to have the same `version_hash` at
`test_correctness.py:108-110`. More seriously, every A/B/C/D implementation
rejects a second same-object release with identical content because its physical
key is `(object_id, version_hash)`. R1 therefore cannot represent the required
release history.

### 2. B's membership guard is false-green

`HistoryStore.read()` first searches object-local history at
`provenance_harness.py:269-283`; a cross-object hash fails there before B's
family-specific membership lookup at `provenance_harness.py:369-375`.

The hostile control replaced B's `_read_physical` in memory with the wrong
implementation `self.blobs[meta.version_hash]`. All five correctness tests still
passed. `results/correctness.json` therefore does not prove the advertised B
guard.

### 3. B's storage result uses a maximally favorable denominator

Every performance row writes two byte-identical complete histories
(`README.md:55-60`, `provenance_harness.py:713-725`). That is a useful collision
fixture but a 100% cross-object overlap performance corpus.

A read-only one-object rerun made `LOCAL-SNAPSHOT` A smaller than
`GLOBAL-BLOB-SPLIT` B in every sampled cell:

| workload | A gzip | B gzip |
|---|---:|---:|
| small / low | 2,379 | 2,645 |
| typical / low | 15,121 | 18,297 |
| large / low | 50,929 | 62,164 |
| large / high | 726,281 | 737,225 |

The identical pair remains a correctness adversary. Performance must sweep 0%,
partial and 100% overlap or use a measured representative corpus rate.

### 4. D's terminal result changes with the compression unit

R1 compresses the complete store as one global JSON stream at
`provenance_harness.py:742-744`. A read-only per-record gzip partition changes
the low-churn result:

| workload | D per-record gzip | B per-record gzip |
|---|---:|---:|
| typical / low | 98,383 | 161,488 |
| large / low | 315,064 | 971,191 |

D still has substantial reconstruction/read cost, but no explicit latency
budget is tested. The R1 `PRUNE` result is therefore not sealed.

### 5. Authorized read/revert p95 is absent

The harness has no authorization path and no revert operation.
`historical_hash_read_ns` measures an in-memory linear metadata search plus
reconstruction. `update_ns_per_version` is total build time divided by the
version count at `provenance_harness.py:745`.

The reported p95 interpolates five outer samples in `benchmark.py:24-49`; each
read sample is already a per-run median rather than an operation-level tail.

### 6. Restore does not restore liveness

`restore()` records restore fields but leaves `deleted_at` populated at
`provenance_harness.py:301-305`. The test checks attribution and history length,
not active state.

### 7. Two metrics are mislabeled

- `logical_serialized_bytes` is the common uncompressed workload denominator,
  not family physical storage.
- `physical_record_count = len(store.physical_record())` counts top-level
  dictionary keys, not physical records.

C's R1 `FOLD` is also not a product disposition: no trie mechanism is folded
into B.

## Directional evidence retained

- `LOCAL-SNAPSHOT`: **KEEP/default**.
- `GLOBAL-BLOB-SPLIT`: plausible, but **BLOCKED-ON corrected measurement**.
- `PERSISTENT-TRIE`: **PRUNE product mechanism; KEEP R1 evidence** for this
  implementation.
- `BOUNDED-DELTA`: **not admitted**; prune unless corrected storage partitions
  and explicit p95 budgets both pass.

## Required F-L1 R2

R2 is one bounded identity-and-denominator correction:

1. model separate `releaseHash` and `contentDigest`;
2. key membership by `(objectId, releaseHash)` and B blobs only by
   `contentDigest`;
3. prove distinct release hashes for identical payloads across objects;
4. prove two identical-content releases within one object remain distinct and
   ordered;
5. add read and revert cross-object refusal;
6. add family-specific wrong-answer mutants, including removal of B's membership
   lookup, that must fail;
7. clear deletion state on restore;
8. benchmark independent, partial-overlap and identical histories;
9. report raw bytes, global-archive gzip, backend-relevant collection/record
   compression and index/metadata cost separately;
10. randomize family order and measure operation-level authorized read/revert
    p50/p95 against an explicit budget;
11. count actual physical rows and label logical bytes only as the workload
    denominator;
12. retain exact letter plus semantic-family names in every result.

No Value V.A2 or Fourier provenance storage selection may consume the R1
terminal labels.
