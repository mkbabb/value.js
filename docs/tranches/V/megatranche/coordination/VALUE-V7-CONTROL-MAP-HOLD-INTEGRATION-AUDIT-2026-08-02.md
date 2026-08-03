# Value v7 control-map HOLD — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_HOLD_PRESERVED`

**Authority and credit:** `NONE / 0`

## Inputs replayed

The independent read-only replay found no material falsifier in the owner
control-map packet or its local dependency intake.

| Input | Exact result |
|---|---|
| owner packet root | three regular mode-`0644`, nlink-1 files; zero child directories, symlinks, or specials; 61,311 bytes |
| canonical packet identity | `d59ef809f228b87ad1354b6708b72a713d69ae99e332c6beaf38f622b3ccca5b` |
| `CONTROL-MAP.json` | 57,602 bytes; `25f9545ac62f914ef2188f8260ab56f53835e74d2a3a3e7683772fa28cd39f45` |
| `RECEIPT.md` | 3,549 bytes; `3c00fa4dd2a4f60ab277a020a0b974fe2e6aa2455b78abe0242fb5521fba2223` |
| `checksums.sha256` | 160 bytes; `d784658d2c1cb4c6f13cf82373975d3462f6a17eacadb7eb6ed400fd2c9c4767`; replay 2/2 |
| local intake | `VALUE-V7-CONTROL-MAP-HOLD-INTAKE-2026-08-02.md`; `51e6ab7cc865fc34e87f1804430c845b0c1b095a752d81fc301bbfd28e3be150` |

JSON parsing and uniqueness checks are green. The replay independently
reproduced 54/54 unique v5 rows, 44/44 unique v6 rows, and dispositions of 14
`CARRY`, one `MERGED_INTO`, 39 `HISTORICAL_ONLY`, and zero `SUPERSEDED`.
Thirteen v6 rows have one unique historical predecessor and one has an exact
merged source group, for 14/44 semantically consumed and 30/44 unconsumed.
All v6 execution flags remain false. The ordered nonowner-retention law is
`44 * 43 = 1,892`; admission remains 0/1,892.

The authorized v7 parent and output roots remain absent. No quiescent-capture
evidence object exists. The owner law names no separate capture filesystem
coordinate, so this audit claims absence of capture evidence, not a stat for an
invented path.

## Integration result

The current root documents now bind the HOLD additively:

| Root document | SHA-256 after integration |
|---|---|
| `docs/tranches/V/apotheosis/pi/HANDOFF.md` | `8b064ee8d4fd349a04eae00a45e17cf388a9e1379b653672f75102cce8de1754` |
| `CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md` | `7e232bcee2b3b0c3efc6bbe84a4ad0d892e0a3469696062392715059b2a3c4c4` |
| `CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json` | `c5f2916085606c665d2cea26338f49d39088ade485767f09d9be9c1d6ea122c9` |

The sealed owner-slot overlay remains byte-identical at `e3301607…`; its
machine matrix, hostile, owner adjudication, and 17/17 checksum packet are not
rewritten. The present integration supersedes only Value's constructibility:
the former v7 source authorization remains chronology, while capture and v7
source creation are forbidden pending a separate owner law that either defines
an exact new 44-row semantic registry or retains all 54 controls and amends the
denominator.

Keyframes B19 and Fourier R4 remain independent source-only lanes. Glass stays
independent and unblocked. Parser remains paused at 14/34. All five owner slots,
candidate generation, real Apple execution, product/release authority, and
credit remain zero. The one-way cross-repository acknowledgement is chronology
only and is not rebound into this root, preventing a coordinate cycle.
