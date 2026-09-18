# Fourier R4 terminal source RED — dependency intake

**Date:** 2026-08-02

**Verdict:** `TERMINAL_AMEND_SOURCE_RED / NO_RETRY / NO_HOSTILES`

**Authority and credit:** `NONE / 0`

## Frozen source root

Root:

`/Users/mkbabb/Documents/Codex/2026-08-02/fourier-mobile-safari-instance-source-plan-r4/outputs`

Independent read-only census confirms 339 regular files, 56 child directories
(57 directories including the root), zero symlinks or special nodes, and
6,948,329 regular-file bytes. All files are mode `0644`, nlink 1; all
directories are mode `0755`. An independently declared UTF-8-bytewise preorder
serialization over the 395 non-root nodes hashes to
`a1e61722f817a0a20a4e2be7ddcba95d4219160d51c026ec4f03851efe8c1e29`;
its 339 regular-file rows hash to
`81bb59114cca3f96f25d01c4165f3ff4025d973ff97ec4dd9e09d9880588eada`.

The owner terminal report separately labels a diagnostic codepoint tree as
`12274f39bbaa028ee40fd33fd1afc628d414635ae954db79aa0092b92b725015`;
the regular-file-set identity is
`c9ba3de171dc5dc5ad4f10fb7c48c62eca84cfe2bc4d5df6f3042e2b60de595b`.
Because that report does not publish its exact record serialization, those two
diagnostic identities remain owner-scoped rather than substitutes for the
explicit independent serialization above. No root file is newer than
`TERMINAL-RED.json`.

| Terminal artifact | SHA-256 |
|---|---|
| `TERMINAL-RED.json` | `1e8c6d95adb97ab378866ea601c51608e132c043f00cc2022fc00ff11b7c3f16` |
| `controls/R4.C01.raw.json` | `ea371fb863c7612625d620bc80edce7d3c08f2dd02495ac1bbefe2b8cc2f7ffc` |
| `controls/R4.C01.receipt.json` | `e1fa57a596d1959c710e1a286ec4a341e1b3b76703329fa75456ecf83b3db531` |
| `SNAPSHOT-MANIFEST.json` | `a5f9ad2e16ec33cf2b27ba762807a3cef1e09b294bad03d2a5e1183b85524608` |
| `DERIVED-REGISTRIES.json` | `cd80105ea30f903263c8d4419e131dcc52bdd3c88344134250b4a7d767777fb9` |
| `CONTROL-REGISTRY.json` | `c3e04b4ffd53bc04450b7363a271c444027d5121084a53fc4cd1b634e6c56fbe` |

The snapshot identity is
`1727d153562aca4806e891f3012510d1e763b71bceb6c814d0470e9c99774ee2`.
Membership is 318 repository members + six authority members + three generated
checkout receipts = 327 members / 381 nodes, ordered
`UTF8_BYTEWISE_CODEPOINT`. Snapshot closure SHA is
`b37993695bc5b7cb0f090c91ad249d7e035a835d592855097b0c7f99bdca65c0`.

## First RED

The first control is `R4.C01`, owning leaf `input.member-bytes`. Its plan SHA is
`b22b75e8d7066916eaf43a5f9f3e0289f2884f3ff51d126be21ec3a59be3122b`.
The serialized plan stores the mutation at `operationPlan.mutation`, while the
control runner reads `plan.mutation` at `R4-BUILD.mjs:230`.
`applyMutation` therefore dereferences undefined at line 232 before the owning
predicate executes.

The exact six-run result is:

- normal, owner-bypass, and nonowner-sweep: exit 1, empty stdout, TypeError;
- no-delta, wrong-code, and synthetic-receipt: expected exit 42 with their
  declared control codes;
- before/after root identity remains equal at
  `286eabdae3b21d6f4b05f125d932751c414f6c431ec8b58bf4cb13dc662ee39f`;
- residue is empty;
- C01 closure is false, total control closure is 0/37, and later controls were
  not run.

This is a terminal source-mechanics falsifier. There was no repair, retry,
cleanup, seal, or static hostile A/B.

## Zero-credit archaeology retained

The authenticated snapshot and baseline byte derivation provisionally report
571 module edges, 66 workflows, nine routes, 512 physical callsites, 1,105
mounted subjects, 900 explicit OPEN gaps, 45 Python operations, 20 client
functions, two clients without an operation, and 33 visible-state rows. These
are archaeology only: the control gate is RED, so they grant no denominator,
slot, pass, product, API, Browser, Safari, P29, release, or authority credit.

The protected Fourier checkout remains HEAD `cd26c653…`, tree `9a66411d…`,
status identity `a087c90d…`; the snapshot and live checkout agree. R2/R3
checksum packets remain `a780cb72…` and
`0d44e81f…`. Canonical formation remains 14 waves / 72 units / 158 terminal
rows, while P29 remains 0/137 COMPLETE, passes 0/3, and cleans 0/2.

## Preserved out-of-root residue

The owner reports that a read-only census command inadvertently materialized
`/tmp/fourier-r4-files.sha256` outside the authorized writer root. Independent
stat/hash inspection finds one regular mode-`0644`, nlink-1 file, 74,507 bytes
and 339 lines,
SHA-256
`e70543907dcd4517b550042c82bf90d981fae5164611e40781579fbc50467aa9`.
It is preserved without cleanup. None of its internal rows or claims is
consumed as evidence.

R4 supersedes the earlier “authorized and absent” chronology only with this
terminal failed source coordinate. It does not fill Fourier P1 or any owner
slot. Any successor requires a fresh explicit owner/root ruling.
