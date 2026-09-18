# Fourier R4 terminal source RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

Read-only verification confirms the R4 failed-root boundary:

- 339 regular files, 57 directories including root, zero symlinks/specials;
- 6,948,329 regular-file bytes;
- files mode `0644`, nlink 1; directories mode `0755`;
- independently serialized 395 non-root nodes at identity `a1e61722…` and
  339 regular-file rows at identity `81bb5911…`;
- no regular file newer than terminal receipt `1e8c6d95…`.

Terminal, C01 plan/raw/receipt, snapshot manifest/closure/identity, control
registry, and derived registry hashes independently match the local intake.
The snapshot has 327 members / 381 nodes: 318 repository, six authority, and
three generated checkout receipts. The protected checkout matches its snapshot
HEAD/tree/status identities.

The material first failure is exact. `R4.C01.plan.json` stores its mutation at
`operationPlan.mutation`; `R4-BUILD.mjs:230` reads `plan.mutation`, and line
232 dereferences `mutation.kind`. Normal, owner-bypass, and nonowner-sweep exit
1 with a TypeError before `input.member-bytes`; the three control-of-control
runs exit 42, but closure is false. Later controls and hostiles did not run.

The out-of-root `/tmp/fourier-r4-files.sha256` residue remains preserved as one
regular mode-`0644`, nlink-1 file / 74,507 bytes / 339 lines / SHA `e7054390…`.
Its bytes equal a fresh absolute-path sorted shasum stream, but none of its rows
is consumed because its creation was outside the authorized root.

## Integration result

Local intake `FOURIER-R4-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` is SHA
`e90f983138f59f3c03a7dbe93100ce6ea48298276e3d2c56845b1fbdb25769b2`.
After additive integration:

| Root document | SHA-256 |
|---|---|
| `docs/tranches/V/apotheosis/pi/HANDOFF.md` | `d828fe240e21ff657348611010e91e4a0e52eae26f588457e9bb5e71ceef691c` |
| `CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md` | `9394308a5e710e3e6b56e6085eff77481a7dc7a71e2258222d540db22275fd0a` |
| `CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json` | `49b024546929159d6dfea01a94659c6d97a955717ceeae9d9d11fc442267e03b` |

R4 is terminal source archaeology with control closure 0/37, not P1 and not an
owner slot. It receives no hostile, pass, source-admission, Apple, API, product,
release, or authority credit. No repair, retry, cleanup, seal, or successor is
authorized.

All three historical source authorizations are now conclusively stopped:
Value v7 is held before creation, Keyframes B19 is terminal mechanics RED, and
Fourier R4 is terminal source RED. Created coordinates are 2/3, constructible
coordinates 0/3, owner-accepted packets 0/3, and slots 0/5. Glass remains
independent and unblocked; parser remains paused at 14/34. Candidate generation
and global Clean A/B remain forbidden.
