<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FULL-SUBJECT-P3-INTAKE-2026-07-29.md
  original-mtime: 2026-07-29T19:29:43
  original-sha256: 7b5522ea06a830b1cf624b4aa9006b27f384d3df69cc9f710df26f3698dafda6
  original-bytes: 4941
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value full-subject P3 — owner intake

Date: 2026-07-29
Served model: GPT Sol xhigh
Mode: formation-only
Owner verdict: **ACCEPT P3 AS THE THIRD FULL-SUBJECT PASS**

## Immutable output coordinate

```text
/Users/mkbabb/Documents/Codex/2026-07-29/value-full-subject-p3-sol/outputs
```

```text
eebb52f5418bf043c130b795cfecc5b653bd2be9e92c44d440afb438c586e451  FULL-SUBJECT-P3-REGISTRY.json
bc662b1c3c18730238e2841af545fed9c34aacd56be15eb7136b39db764ab07b  FULL-SUBJECT-P3-SOL.md
f90d7b72d2c885d4a56972c4d5149210498ed14a397bc3852770f43023e2da8a  RECEIPT.md
```

P3 binds the exact P2 registry
`82a8b33ee2b57b354cec4ab3daf322f0061dcfee8141901db6a39ba0b6b163a1`
and denominator
`1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85`.
The local fail-closed validator independently reproduced:

- schema `value-full-subject-pass/v1`;
- 18/18 unique family IDs in the exact denominator;
- every required field present and non-empty;
- only `KEEP`, `FOLD`, `MOVE`, `SPLIT`, or `PRUNE`;
- exact P2 predecessor and family-denominator hashes;
- no product-source or repository write.

The sealed outputs are new primary evidence. They do not replay a P1, P2,
specialized-slice, prior-clean-audit, or root receipt.

## Terminal family registry

| Family | P3 disposition |
|---|---|
| V.F0 | FOLD |
| V.L1 | KEEP |
| V.L2 | SPLIT |
| V.L3 | MOVE |
| V.L5 | SPLIT |
| V.L4 | MOVE |
| V.L6 | MOVE |
| V.A1 | FOLD |
| V.A2 | SPLIT |
| V.A3 | FOLD |
| V.U1 | SPLIT |
| V.U2 | PRUNE |
| V.U3 | SPLIT |
| V.U4 | SPLIT |
| V.H1 | SPLIT |
| V.G1 | KEEP |
| V.Q1 | KEEP |
| V.Q2 | KEEP |

P3 accepts the P2 amendments for V.L2, V.U3, and V.H1 as `SPLIT`. It also
keeps V.L5 split between typed SVG path grammar/geometry ownership and the
numeric-only `/transform` leaf. Every disposition remains separate from its
owning-wave action.

## Root graph boundary after the sealed P3 observation

P3's receipt records the graph bytes it last observed. Root subsequently
corrected the graph-validator gap exposed during P3 and resealed the same
direction without reopening or rewriting P3. The current read-only root
authority is:

```text
32e09ae89502a109a5b93dbf072b30c03577dc3263e87d6ca5e8c814113a29ef  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json
bf83a8366615afcd1c99be9ee4887ffea452ff2e0134c7cc8cb5fda0ce39ff9c  CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md
b016b4eeac61c7200f48e92f55322cc3826ecb8f5d2172986cf26d7356e8b95a  validate-constellation-dag.mjs
83fd662e67ce9ee269f153646991488dbacce25c70acea73e9789be62b80e863  CONSTELLATION-DAG-V2-VALIDATION-2026-07-29.json
```

The owner reran the current validator read-only: 124 nodes, 171 edges, exit 0,
and M01–M21 all rejected. The binding Value relations are:

- candidate and execution both require `V.L1 -> V.L2 -> V.L5 -> V.L4`;
- `V.L2 -> V.L3` is also required;
- only V.L3 and V.L4 feed V.L6;
- direct `V.L5 -> V.L6` is forbidden;
- the exact denominator file and SHA are byte-verified;
- satisfied evidence paths and bytes are verified;
- receipt replay is rejected;
- constellation close remains behind root Clean A, later Clean B, and final
  evidence rehash.

The intermediate graph hashes printed in P3's sealed receipt are historical
observation coordinates, not current graph authority. Clean A must bind the
current root tuple above and must not replay the intermediate tuple as a
separate pass.

## P3 adjudication retained

- Parser S5 is formation evidence only. It remains RED with no release or
  public API delta, so V.L1 and V.L5 remain blocked on the signed released
  parse-that successor and exact rebind.
- V.L2 keeps distinct parsed-shorthand inverse and semantic ordered-longhand
  projection contracts.
- V.L5 keeps typed-only total geometry, finite/nonfinite and multi-subpath
  laws; the live string constructor is execution RED.
- Keyframes W2 must classify and remove 49 direct `/css` imports in 47 files
  plus four non-import literals. W3 and W10 retain distinct immutable packs.
- Fourier R2a remains RAW/AMEND. `LOCAL-SNAPSHOT` remains the conservative
  default; complex storage candidates remain unselected.
- V.U3 preserves semantic instruments while pruning debug/decor residue.
- V.H1 separates dependency-residue subtraction from producer artifact
  readiness.
- Existing Browser evidence remains unchanged-coordinate research only. P3
  creates no changed visual claim or product execution credit.

## Gate to Clean A

This owner intake satisfies the P3-intake prerequisite. A fresh Clean A may
now open against:

1. P3 registry SHA `eebb52f5…`;
2. P2 predecessor SHA `82a8b33e…`;
3. denominator SHA `1d6df52a…`;
4. candidate packet SHA `aa684060…`;
5. this intake's final immutable SHA; and
6. the current root graph tuple above.

Opening Clean A is not a clean verdict. Formation remains
**FORMATION CANDIDATE**, no implementation wave is authorized, and Clean B
must remain blocked until Clean A is immutable and its absorption is complete.
