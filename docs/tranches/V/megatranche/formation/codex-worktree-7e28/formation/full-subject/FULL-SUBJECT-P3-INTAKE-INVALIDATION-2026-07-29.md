<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FULL-SUBJECT-P3-INTAKE-INVALIDATION-2026-07-29.md
  original-mtime: 2026-07-29T19:35:49
  original-sha256: a6aecec332c9bea64b0e9fd3d0c6500fb4ccee74817dde76fdfdb94a5bc25679
  original-bytes: 1913
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value full-subject P3 — raced-intake invalidation

Date: 2026-07-29
Mode: formation-only boundary correction
Verdict: **PRUNE FROM CLOSING AUTHORITY; PRESERVE AS RACE EVIDENCE**

Independent root recheck proves that owner intake
`7b5522ea06a830b1cf624b4aa9006b27f384d3df69cc9f710df26f3698dafda6`
preceded the final P3 seal. It binds:

```text
bc662b1c3c18730238e2841af545fed9c34aacd56be15eb7136b39db764ab07b  stale report
f90d7b72d2c885d4a56972c4d5149210498ed14a397bc3852770f43023e2da8a  stale receipt
```

The first report correction already produced later bytes:

```text
875681c8d626f0847a94d7072bc48a7ee1b528dacc3a5cf8f16c1ae7432a359b  superseded report
de720ea3eee46d9de01b01e255996e28c10d9debd2eb8055c3e0b36efe605cc1  superseded receipt
```

Mtimes confirm that the intake was written before the corrected output seal.
Therefore the intake cannot be P3 closing evidence even though its independent
18-family validation was accurate at the registry coordinate it read.

The follow-up receipt
`d342d0c711693490f2cfe9dcc9494de4187a87e116250c8602f6bf7aa59ecff5`
is also superseded. Its claim that the raced intake remained valid is
withdrawn.

Deeper identity defects are being corrected in the P3 output set:

- orphan validator hashes `9ca0680b…` and `cf7e06…` must be replaced by the
  exact historical observed validator `b016b4ee…`;
- mutable formation-status evidence `8bcdc0…` is not resolvable and must be
  removed in favor of durable packet, P2-intake, and root-validator evidence;
- registry, report, and receipt must be sealed together and independently
  rehashed.

Until that reseal and a new owner intake:

- `V.form.P3` closing evidence is reopened;
- Clean A task `019fb037-71d8-7d01-8839-38b4575daa30` is on HOLD;
- Clean B remains blocked;
- no formation admission or product execution credit exists.

This correction changes no owning wave, product contract, or execution order.
