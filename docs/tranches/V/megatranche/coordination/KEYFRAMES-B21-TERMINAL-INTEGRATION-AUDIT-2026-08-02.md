# Keyframes B21 terminal source RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

Two read-only snapshots reproduce exactly two regular files / 22,991 bytes,
hashes `20827e45…` and `e7b7ca98…`, and canonical two-record identity
`184ddd0c…`. All five generator inputs match their source pins. The capability
JSON parses and preserves the selected Ruby runtime, byte-equality probes,
zero writes before gate, no fallback, authority none, and credit zero.

Source ordering is exact: capability write line 304, TREE-envelope check line
313, possible derivation write line 405. The pinned TREE file contains eight
keys while the source admits five, so the three omitted seal-law fields make
`baseline.tree-envelope` the first deterministic RED. No generator command
was rerun during integration. The unpersisted stderr hash is not treated as
authenticated packet evidence.

## Integration result

B21 supersedes only B20's mechanics route and its own prior
`AUTHORIZED_ABSENT` chronology. It does not supersede B18's substantive source
finding, admit Keyframes v8, or populate the Keyframes owner slot. Source
specification remains 357/414 with 57 explicit RED cells; real Apple execution
remains 0/73,568; substantive Review B remains 0/1. Any successor requires a
fresh owner decision and root. No candidate, rebase, seal, global audit,
admission, authority, or credit follows.
