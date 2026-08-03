<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FULL-SUBJECT-P3-FINAL-OWNER-INTAKE-2026-07-29.md
  original-mtime: 2026-07-29T19:39:46
  original-sha256: a08857a2d0a9f65fccdb5d66b72f638967324db8a959aa22729ffb78cb1d7af0
  original-bytes: 5048
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value full-subject P3 — final owner re-intake

Date: 2026-07-29
Served model: GPT Sol xhigh
Mode: formation-only
Owner verdict: **ACCEPT THE EVIDENCE-IDENTITY-RESEALED P3 TRIPLE**

## Final immutable output coordinate

```text
/Users/mkbabb/Documents/Codex/2026-07-29/value-full-subject-p3-sol/outputs
```

The three files were resealed together after root invalidated the raced first
intake:

```text
00fd0b7957cad35643addf31b8c990eb83515414841c6bc9f2452b16672216dc  FULL-SUBJECT-P3-REGISTRY.json
ddf1af06164acf40071bc34d8c4e64b0fbf1b0d18f1c7b629df9b8e351330e60  FULL-SUBJECT-P3-SOL.md
5a3245e990f0592692634fe401feb11e7435ed2aa35435de01f583f1148ac496  RECEIPT.md
```

This re-intake binds all three hashes. It does not inherit approval from the
invalidated intake or either superseded report/receipt pair.

## Exact predecessor and coverage authority

The final P3 registry binds:

```text
82a8b33ee2b57b354cec4ab3daf322f0061dcfee8141901db6a39ba0b6b163a1  exact P2 predecessor
1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85  exact 18-family denominator
aa6840601388258246677c1c619deeadd763d5dbddb56f9feb92b2b803961840  immutable formation candidate packet
b94d0687e374386f4d2e84a50c3a04c7ad996fa28386d42d37e235cc38e29bc6  P2 owner intake
```

The owner reran the local fail-closed full-subject validator against the final
registry and exact P2 predecessor. It returned:

- schema `value-full-subject-pass/v1`;
- pass SHA `00fd0b79…`;
- denominator SHA `1d6df52a…`;
- 18/18 unique denominator-exact family IDs;
- no missing or extra IDs;
- every required field present and non-empty;
- only `KEEP`, `FOLD`, `MOVE`, `SPLIT`, or `PRUNE`;
- no failures.

The final registry retains the accepted terminal family matrix:

| Family | Disposition | Family | Disposition |
|---|---|---|---|
| V.F0 | FOLD | V.A2 | SPLIT |
| V.L1 | KEEP | V.A3 | FOLD |
| V.L2 | SPLIT | V.U1 | SPLIT |
| V.L3 | MOVE | V.U2 | PRUNE |
| V.L5 | SPLIT | V.U3 | SPLIT |
| V.L4 | MOVE | V.U4 | SPLIT |
| V.L6 | MOVE | V.H1 | SPLIT |
| V.A1 | FOLD | V.G1 | KEEP |
| V.Q1 | KEEP | V.Q2 | KEEP |

Every disposition remains separate from its owning-wave action. No product
implementation or execution credit is claimed.

## Evidence-identity correction

The mandatory race invalidation is:

```text
a6aecec332c9bea64b0e9fd3d0c6500fb4ccee74817dde76fdfdb94a5bc25679  FULL-SUBJECT-P3-INTAKE-INVALIDATION-2026-07-29.md
```

The owner independently searched all three final P3 outputs and confirmed:

- orphan validator hashes `9ca0680b…` and `cf7e06…` are absent;
- mutable formation-status hash/path `8bcdc0…` and
  `FORMATION-AUTHORITY-STATUS-2026-07-29.md` are absent;
- validator citations consistently use the exact P3-observed historical
  validator SHA
  `b016b4eeac61c7200f48e92f55322cc3826ecb8f5d2172986cf26d7356e8b95a`;
- V.Q2 cites durable P2-intake, candidate-packet, and historical-validator
  evidence;
- `cleanAState` is `HOLD_PENDING_OWNER_REINTAKE`;
- exactly the three allowed output files exist.

The report and receipt distinguish P3's observed historical graph tuple from
later root graph authority. Their historical tuple is not replayed as another
pass, intake, clean audit, or current root receipt.

## Current root graph coordinate at re-intake

The owner independently read and validated the then-current live-root tuple:

```text
d0f9ad0dad1f46b329f49de54a52c3137ff032279a24692549af45e124afe2dc  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json
787b96694ee3018ab7351a2152467c8bb2f1a419387ce043155b550b559e56bd  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md
b016b4eeac61c7200f48e92f55322cc3826ecb8f5d2172986cf26d7356e8b95a  validate-constellation-dag.mjs
```

The read-only validator exited 0 with 124 nodes, 171 edges, and M01–M21 all
rejected. At this pre-rebind coordinate `V.form.P3` is intentionally RED and
`V.form.cleanA` is BLOCKED. Root will rehash the validation receipt after it
binds this final intake; this document does not pre-claim that future receipt
hash.

The required Value topology remains:

- candidate and execution `V.L1 -> V.L2 -> V.L5 -> V.L4`;
- required `V.L2 -> V.L3`;
- only V.L3 and V.L4 feed V.L6;
- direct `V.L5 -> V.L6` forbidden;
- exact denominator and satisfied-evidence bytes verified;
- primary receipt replay rejected;
- root Clean A -> later Clean B -> final rehash -> close.

## Owner ruling

The final P3 triple is accepted as the third full-subject formation pass.
This re-intake authorizes root to:

1. bind P3 registry `00fd0b79…` with predecessor `82a8b33e…` and denominator
   `1d6df52a…`;
2. reseal the current graph and its validation receipt;
3. verify that the existing Clean A output root is uncontaminated; and
4. resume task `019fb037-71d8-7d01-8839-38b4575daa30` against this exact
   post-rebind corpus.

It does not itself satisfy Clean A, open Clean B, admit formation, or authorize
product execution. Clean A remains on HOLD until root performs and reports the
rebind. Clean B remains blocked until a clean, immutable, owner-intaken Clean A
and its absorption exist.
