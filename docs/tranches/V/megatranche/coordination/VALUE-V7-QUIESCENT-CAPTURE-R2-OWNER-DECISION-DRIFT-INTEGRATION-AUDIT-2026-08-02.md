# Value v7 quiescent capture R2 decision drift — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_FAIL_CLOSED_INTEGRATION / R2_NOT_CONSTRUCTIBLE`

**Authority and credit:** `NONE / 0`

Independent read-only replay authenticated owner ruling `ea5eed7a…`, 12,484
bytes, mode `0644`, nlink 1, and confirmed both R2 parent and output root
absent. R1 reproduces one regular file / 18,133 bytes / SHA `2b7d03a1…` and
contains no derived capture artifact.

The BigInt law, six ordered capability checks, exact eight-file output bound,
310×2 source reads, 40×2 governing reads, and v7-source prohibition are all
present. The ruling also sets `captureR2MayBeCreatedByThisRuling: true`; its
construction authority is real but conditional on every closed input pin.

The governing checksum member is stale at `797dc887…`, so current input
authentication fails before writer authority can be consumed. This is a
coordinate-drift stop, not an R2 execution result. No R2 source, capability
receipt, capture artifact, or v7 source was created.

Registry specification remains 44/44; controls 0/44; retentions 0/1,892;
accepted source closure 0/5; current passes 0/12; D2 0/887; slots 0/5; parser
14/34 PAUSED; every credit remains zero.
