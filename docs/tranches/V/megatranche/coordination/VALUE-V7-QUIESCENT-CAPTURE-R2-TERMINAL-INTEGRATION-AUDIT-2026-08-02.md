# Value V7 quiescent capture R2 terminal RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

Two read-only snapshots reproduce the one-file 31,688-byte root and source SHA
`4ffd76c7…`; every expected derived file is absent. The owner rebind
`695358c0…` matches its exact 8,660-byte JSON file, the four predecessor root
pins rehash, and predecessor checksum `fbe7e882…` replays 48/48.

The immutable source calls its capability routine before either the 310-member
or 40-member capture. Within that routine, line 548 requires runtime mode
`0755`; the authenticated Node binary is mode `0555`, nlink 1, 68,384 bytes,
SHA `08dad058…`. `INPUT_STAT_MISMATCH` is raised before the first possible
receipt write at line 561. Member capture and git-coordinate work are later
and unreachable.

No source command was rerun during this audit. The missing raw stderr is kept
as an evidence limitation rather than reconstructed.

## Integration result

R2 supersedes only the prior stale-decision and `AUTHORIZED_ABSENT`
chronology. It is not an accepted capture and authorizes no V7 source. Value's
mobile/Kronecker denominator remains OPEN; concrete production-consumed
hostiles remain 0/54; real Apple execution remains zero; the Value owner slot
remains null. Any successor requires a new ruling and root. No candidate,
rebase, seal, global audit, admission, authority, or credit follows.
