# N — PROGRESS

**Status board.** N is **planning-only at open** (authored 2026-06-11 from the 32+5-lane deep
audit; evidence base at `audit/lanes/`). N.W1–N.W9 are IMPL, **hard-blocked on explicit user
ratification** of this charter + the supersede-M decision (`N.md §0`).

## Wave status

| Wave | Disposition | Kind | Status | Gate |
|---|---|---|---|---|
| **N.W0** — Charter | DEV | — | **AUTHORED 2026-06-11** | `N.md` + audit ledgers + `audit/lanes/` committed; awaits ratification |
| **N.W1** — Boot-truth substrate | IMPL | unilateral | **PLANNED** | typecheck 0 vs a dts-complete glass-ui dist (the W1 precondition — 74 of 91 HEAD errors are its absence); demo mounts console-clean fresh; e2e baseline; CI boot-smoke live |
| **N.W2** — Type hardening | IMPL | unilateral | **PLANNED** | 26 WithId casts → 0 (4 models); desktop `@source` live; resolvers 4→1; 11+2 parse casts → 0 |
| **N.W3** — CRUD right-sizing + contract honesty | IMPL | unilateral | **PLANNED** | TOCTOU fixed; txns 18→≤14; indexes right-sized; URN decision + conformance gaps closed |
| **N.W4** — Deploy-truth (Ask 3) | IMPL | unilateral infra | **PLANNED** | committed artifact executes txns (rs0); prod == HEAD lineage; /health /docs /openapi 200; webhook deploy |
| **N.W5** — Design-system consummation (blob + aurora + watercolor) | IMPL | semi-unilateral | **PLANNED** | fork dirs deleted; aurora palette-derived; zero phantom classes; π blob-footprint |
| **N.W6** — Design-language suffusion (the standing Fable wave) | IMPL | unilateral | **PLANNED** | per-pane DELTA evidence; type-ramp + empty-state + celebratory-motion landed; router 5 |
| **N.W7** — Library asks (kf next-slice) + perf-truth → 0.12.0 | IMPL | unilateral | **PLANNED** | kf `it.fails` witnesses flip; prettier out of tarball; 0.12.0 published |
| **N.W8** — Hygiene + reconciliation | IMPL | unilateral | **PLANNED** | master merged + green; tags == registry; submodule clean; docs match tree |
| **N.W9** — v1.0.0 close + π | DEV (close) | unilateral (pin gated on glass-ui 3.13.0) | **PLANNED** | π green; glass-ui `^3.13.0` pinned; v1.0.0 published; FINAL.md |

## The dispatch split

- **Unilateral, parallel-capable on ratification:** W1 (the critical path for all demo-visible
  work), W2, W3, W4, W7, W8.
- **W5** needs W1 + a clean local glass-ui dist (`file:` held until the 3.13.0 registry cut).
- **W6** needs W5 (the design wave audits the consumed design system).
- **W9** closes; only its glass-ui **pin** waits on the 3.13.0 cut (the one cross-repo wait).

## Verified-counts ledger (V-fleet, primary evidence — `audit/lanes/n-verify-V*.md`)

| Fact | Count/verdict | Source |
|---|---|---|
| WithId escape casts | **26** (25 strict + `forks.ts:206` parenthetical); 9 annotations separate | V2 |
| `withTransaction` sites | **18** real (19 grep − 1 JSDoc) | V2 |
| `createIndex` calls | **26**; 3 write-only (`palette_versions`) confirmed | V2 |
| compose.yaml replica set | **ABSENT** — committed artifact cannot run any txn | V2 |
| Prod wire lineage | **I-era `23a7b27`** (2026-05-29); K/L/F-handoff never deployed; NCSU alias alive, byte-identical | V3 |
| Demo first fatal | value.js-own `./glass-carousel` import (no glass-ui version ever exported it) | V1 |
| glass-ui registry 3.12.0 | ships `./goo-blob ./watercolor-dot ./aurora ./dock ./tabs ./carousel`; CSS clean; `deriveAurora`+`deriveBlobPalette` present; peer `^0.10.0 \|\| ^0.11.0` | V1/V4 |
| glass-ui lineage | 3.11/3.12 self-declared stale-lineage; clean cut = **3.13.0** → hold `file:` | V1 |
| Per-satellite blob color | **infeasible without shader change** (geometry-only uniforms) → `uSatColor[]` glass-ui ask | V4 |
| Kill-list refutations | `Katex.vue` NOT dead (11 consumers); `ImagePaletteExtractor.vue` NOT orphaned (PaletteDialog); `gold-shimmer` IS defined (glass-ui) | V5 |
| Phantom classes confirmed | `pastel-rainbow-text` (3 use sites, 2 outside its defining scope), `glass-elevated` (retired), `dashed-well` (undefined), `stagger-children` (undefined) | V5/K2/K3 |
| PRM census | 8 RAF sites; LIVE hole = mix-canvas (`useMixingAnimation.ts:116,206`); watercolor fork's = dormant | E1 |
| Tarball weight | 560.7KB unpacked; 54% = bundled prettier (not rolldown-external); CI gate blind to it | E3 |
| Gates at HEAD | vitest 1607/36 ✓ · lint ✓ · api tsc ✓ · api 161/28 ✓ · lib build ✓ · **typecheck ✗ 91** (1 own TS2307 + 16 TS7006 + 74 TS7016 from the dts-less local glass-ui dist; K1 corrected the transient "3") · **e2e 0-passed-of-37 ✗** (boot-break) | B1/B2/K1 |
| Session TTL | 7d mint (`auth.ts:36`) vs the 30d contract → the 30d cron arm is dead code | D2/K2/K3 |
| `forkOfHash` | **live on the wire** (`format/palette.ts:74`) — D4's delete-claim refuted; only the 3 `palette_versions` *indexes* are write-only | K1 |
| glass-ui abrogations | full re-alias/retire census + the standing pin-bump sweep (inv-N-10) | `audit/abrogation-ledger.md` |

## Dispatch gate

**Gate**: explicit user ratification of the charter + supersede-M. **Status**: **OPEN**.
On ratification, N.W1 dispatches first; W2/W3/W4/W7 may dispatch beside it.
