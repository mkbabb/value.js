# Keyframes B19 terminal mechanics RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

Two read-only census/hash snapshots of
`/Users/mkbabb/Documents/Codex/2026-08-02/keyframes-v8-review-b19-source/outputs`
were identical:

- directory mode `0755`, nlink 3, size 96;
- exactly one child node;
- `derive-b19-receipts.rb`, regular mode `0644`, nlink 1, 7,362 bytes,
  SHA-256
  `3ada36eafa4bc5ea270b107a5628535c296f8579fa62e61f5d650ec2d01323c7`;
- zero child directories, symlinks, or special nodes.

The Keyframes `relativePath|kind|mode|nlink|bytes|sha256\n` record convention
independently reproduces identity
`d5fe8c15302628134c5752d71c7b65b13ed4445b782c598825b760201016b1d1`.
The owner decision rehashes exactly to `029ff5e9…`, 6,495 bytes, mode `0644`,
nlink 1.

Ruby is `2.6.10p210`; `Array`/`Enumerable#filter_map` is absent. All three
source pins match, the B18 schema/count is 18/18, and the first receipt's seven
archaeology comparisons rederive true. The source then reaches line 57 and
calls `filter_map` before the only declared write at line 171. The declared
`B19-DERIVATION-RECEIPTS.json` and every receipt, declaration, verifier,
`SOURCE-READY`, result, manifest, checksum, terminal verdict, hostile, and
Review B artifact are absent.

The raw error SHA `a6ad8e55…` remains owner-reported in-memory chronology; no
file carries that stream. No builder rerun was performed during verification.
The Keyframes checkout remains HEAD `8281638c…`, porcelain identity
`89b7303b…`, with an empty staged diff.

## Integration result

The exact local intake is
`KEYFRAMES-B19-TERMINAL-MECHANICS-RED-INTAKE-2026-08-02.md`, SHA
`c066651e22e55901145f207e6f26a1978e566d6f3fc3e65504371ad25824dc60`.
After additive integration:

| Root document | SHA-256 |
|---|---|
| `docs/tranches/V/apotheosis/pi/HANDOFF.md` | `a7924dd7387f8ae5110c205f5ec0b2330a394b896e9742bdb39ffe3c0478d549` |
| `CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md` | `17146197ebf652ad6e9fd365663101b04aec982f64218bf5d38f02ca88ec35a4` |
| `CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json` | `7439731a3921da6f592b3e59056e725ff5a91d91524b69173e104f9de20f90a6` |

B19 is terminal failed-root mechanics evidence, not a Keyframes v8 scientific
finding and not a source packet. No compatibility patch, cleanup, rerun,
successor, hostile, or substantive Review B is authorized. B18 remains the
latest substantive terminal source evidence. Keyframes remains 357/414 with 57
RED cells, real Apple execution 0/73,568, Review B 0/1, slot null, and credit
zero.

Value v7 remains independently terminal HOLD. Fourier R4 is the sole currently
constructible coordinate among the three historical source authorizations.
Glass remains independent and unblocked; parser remains paused at 14/34. No
candidate, rebase, seal, global audit, product action, release, or authority
follows.
