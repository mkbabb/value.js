# Fourier R5 terminal source RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

The R5 root independently replays as 442 regular files / 62 child directories
/ 7,537,703 file bytes, with zero links or special nodes. Files are all
mode `0644`, nlink 1; directories are mode `0755`. Newline-canonical identities
are `27c77c54…` for all 504 non-root nodes and `dc575b4b…` for the 442 file
rows. Terminal receipt `7c1b1d59…` is the newest regular file.

All eleven persisted preflight rows independently hash-match and close: one
C01 six-run row and ten pointer-hostile rows. Snapshot membership, copies,
node records, byte hashes, modes, nlinks, and identity `61cc65d4…` reproduce
exactly; reads after closure are zero. C01–C16 plan/raw/receipt and operation
pins close in order. C17 is first RED, with closure false and normal result
`control.wrong-reason` / empty errors. No C18 or seal/final artifact exists.

The causal defect is source-visible: the copied `PaperSidebar.vue` has a native
`li v-for` at line 65, but the derived baseline loop leaf is empty because only
registered component callsites feed that leaf. C17's successful byte mutation
cannot exercise `instance.loop.paper-sidebar`.

The protected checkout and R4 residue are unchanged. No R5 command was rerun
during integration.

## Integration result

R5 supersedes R4 only for the now-closed schema/mutation-pointer preflight and
the larger authenticated snapshot. It is still terminal, unsealed,
unadmitted source archaeology. No hostile, owner acceptance, pass, clean audit,
slot, product action, real-platform execution, release, or credit follows.
Any successor requires a fresh explicit non-overlapping owner ruling.
