<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FULL-SUBJECT-P3-POST-INTAKE-CORRECTION-2026-07-29.md
  original-mtime: 2026-07-29T19:34:54
  original-sha256: d342d0c711693490f2cfe9dcc9494de4187a87e116250c8602f6bf7aa59ecff5
  original-bytes: 1874
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value full-subject P3 — post-intake report correction

Date: 2026-07-29
Mode: formation-only boundary receipt
Verdict: **REPORT CORRECTION CLOSED; REGISTRY AND OWNER INTAKE REMAIN VALID**

After owner intake SHA
`7b5522ea06a830b1cf624b4aa9006b27f384d3df69cc9f710df26f3698dafda6`,
root found one stale sentence in `FULL-SUBJECT-P3-SOL.md` that contradicted the
registry and receipt's historical-observation boundary. The fresh P3 task
removed that sentence and amended its report/receipt only.

Final isolated output hashes are:

```text
eebb52f5418bf043c130b795cfecc5b653bd2be9e92c44d440afb438c586e451  FULL-SUBJECT-P3-REGISTRY.json
875681c8d626f0847a94d7072bc48a7ee1b528dacc3a5cf8f16c1ae7432a359b  FULL-SUBJECT-P3-SOL.md
de720ea3eee46d9de01b01e255996e28c10d9debd2eb8055c3e0b36efe605cc1  RECEIPT.md
```

The authoritative registry hash is unchanged. Official and custom
full-subject validators and the three-file allowlist remain green. The prior
report/receipt hashes in the immutable owner intake are superseded historical
coordinates; they do not invalidate the intake because it binds registry
`eebb52f5…`, predecessor `82a8b33e…`, denominator `1d6df52a…`, and separately
reconciles the evolving root graph.

The current read-only root boundary after P3, Keyframes restart, and Fourier
R2a reseal is:

```text
cbe9c5812b32092047030c61cb010f1e274e66276fd9722cf4e2646ea9fb7371  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json
d1d7213298f9786d35b2a95bf92a8e207dad856c9d682bacb8981151766ba5c2  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md
b016b4eeac61c7200f48e92f55322cc3826ecb8f5d2172986cf26d7356e8b95a  validate-constellation-dag.mjs
```

The owner reran the validator read-only: 124 nodes, 171 edges, exit 0, with
M01–M21 rejected. `V.form.P3` is satisfied with zero execution credit. Fresh
Clean A is active against the post-P3 corpus; Clean B remains blocked.
