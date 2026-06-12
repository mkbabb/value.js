# N — PROGRESS

**Status board.** N was **RATIFIED 2026-06-11** (explicit user dispatch: "Begin and continue the
current tranche… completed the plan IN TOTALITY"). N.W1–N.W9 are IMPL, now executing. Round
structure: R1 = W1 ∥ W2.A ∥ W7.A · R2 = W3 ∥ W5 ∥ W7.B · R3 = W2.BC ∥ W4 → W7.C (0.12.0) ·
R4 = W6 · R5 = W8 → W9. The W1 precondition (dts-complete glass-ui dist) was **met at dispatch**
— glass-ui's own watch now emits d.ts (551 files, fresh 2026-06-11 17:52); HEAD typecheck
against it = **3 errors** (exactly the 3 re-aliased import sites), not 91.

## Wave status

| Wave | Disposition | Kind | Status | Gate |
|---|---|---|---|---|
| **N.W0** — Charter | DEV | — | **DONE** (ratified 2026-06-11) | `N.md` + audit ledgers + `audit/lanes/` committed |
| **N.W1** — Boot-truth substrate | IMPL | unilateral | **DONE** `d9c3b9f` (e2e closure runs with W2's gate) | typecheck 0 ✓; boot-smoke PASS cold ✓; CI boot-smoke + abrogation sweep wired ✓; the glass-ui CSS-gap unblocked by the paired-authorship fix `glass-ui@537c7f80` |
| **N.W2** — Type hardening | IMPL | unilateral | **A DONE** `e4b5f60` (26→0 verified); **B/C executing** | 26 WithId casts → 0 ✓; desktop `@source` live; resolvers → 1; parse casts → 0 |
| **N.W3** — CRUD right-sizing + contract honesty | IMPL | unilateral | **DONE** `fe3c00c` (verified) | TOCTOU ✓; txns 18→14 justified-each ✓; indexes 26→22 + sessions TTL ✓; 30d contract ✓; urn:contract:* adopted ✓; api 161→214 |
| **N.W4** — Deploy-truth (Ask 3) | IMPL | unilateral infra | **ARTIFACTS DONE** `e62567a`+`b0cb867` (verified; wire deploy = the W8 ceremony) | rs0 docker mutation proof PASSED ✓; deploy-hook authored ✓; /health /docs /openapi 200 ✓; vhost :8130 ✓; deploy-pages.yml ✓; DEC-9 honesty: NCSU retirement = W8 on-host item |
| **N.W5** — Design-system consummation (blob + aurora + watercolor) | IMPL | semi-unilateral | **DONE** `e32111c`+`ee458e5` (verified ×5 lanes + visual evidence) | fork dirs deleted ✓ (inv-N-4); aurora palette-derived ✓ (paired screenshots); zero phantom classes ✓ (sweep green, inv-N-7); blob live-palette paletteStops ✓ |
| **N.W6** — Design-language suffusion (the standing Fable wave) | IMPL | unilateral | **PLANNED** (needs W2.B — in flight) | per-pane DELTA evidence; type-ramp + empty-state + celebratory-motion landed; router 5 |
| **N.W7** — Library asks (kf next-slice) + perf-truth → 0.12.0 | IMPL | unilateral | **A+B DONE** `9cd815e`+`0deca84`+`ed0dd00` (verified; 1709 tests); **C (0.12.0) after W2.C** | 11 items landed + witness-mirrored ✓; prettier evicted 586→287KB ✓ (≤320KB gate, honest re-target from <200KB — d.ts are half the tarball); lerpArray KEEP (kf consume-edge refuted the demote premise) |
| **N.W8** — Hygiene + reconciliation | IMPL | unilateral | **PLANNED** (+ the wire-deploy ceremony folded in) | master merged + green; tags == registry; submodule clean; docs match tree; prod deploy fires post-merge |
| **N.W9** — v1.0.0 close + π | DEV (close) | unilateral (pin gated on glass-ui 3.13.0 — still uncut) | **PLANNED** | π green; glass-ui `^3.13.0` pinned; v1.0.0 published; FINAL.md |

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

**Gate**: explicit user ratification of the charter + supersede-M. **Status**: **CLOSED —
RATIFIED 2026-06-11**. N.W1 dispatched first (R1) with W2.A and W7.A beside it; glass-ui
3.13.0 remains uncut at dispatch → the W9 registry pin holds as the chartered
BOOK-with-trigger (the pin is the gate, not the work).
