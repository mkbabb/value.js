# Value v7 quiescent capture terminal mechanics RED — integration audit

**Date:** 2026-08-02

**Verdict:** `PASS / FIRST_RED_ORDER_AUTHENTICATED / ZERO_AUTHORITY`

Independent read-only inspection confirms:

- owner release SHA `32da65a2…`, 26,173 bytes, mode `0644`, nlink 1;
- capture root census one regular file / 18,133 bytes / no other nodes;
- source SHA `2b7d03a1ccfba0f412964de5fd137316cf9c4280c33eec1623ac785116bb6315`;
- source lines 89–90 mix BigInt `stat.mode` with Number `0o7777`;
- the first preflight call at line 318 reaches that defect before owner-release
  read at line 320;
- all six derived filenames are absent; and
- the preceding root checksum boundary remained 39/39 through the failed
  invocation.

The failure is capture-harness mechanics, not a Value product or semantic
registry finding. The packet remains frozen. No repair, rerun, cleanup,
successor, v7 source, hostile, owner slot, candidate, execution, authority, or
credit is inferred.
