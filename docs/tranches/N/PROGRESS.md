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
| **N.W5** — Design-system consummation (blob + aurora + watercolor) | IMPL | semi-unilateral | **DONE** `e32111c`+`ee458e5` (verified ×5 lanes + visual evidence) | fork dirs deleted ✓ (inv-N-4); aurora palette-derived ✓ (paired screenshots); phantom-class sweep green at W5-close — **inv-N-7 RE-OPENED 2026-06-12**: `watercolor-swatch` bare-use phantom (`MixSourceSelector.vue:148`; glass-ui's rule is SFC-scoped, unreachable) → closes at N.W14.E (WAVES-2 §4); blob live-palette paletteStops ✓ |
| **N.W6** — Design-language suffusion (the standing Fable wave) | IMPL | unilateral | **SUPERSEDED-BY-WAVES-2** (DIED un-implemented — zero impl commits, only the dock-first-paint sliver in `199fd15`; the 2026-06-12 user audit re-divined it into **N.W10–N.W18**, `WAVES-2.md`) | — |
| **N.W7** — Library asks (kf next-slice) + perf-truth → 0.12.0 | IMPL | unilateral | **A+B DONE** `9cd815e`+`0deca84`+`ed0dd00` (verified; 1709 tests); **C (0.12.0) after W2.C** | 11 items landed + witness-mirrored ✓; prettier evicted 586→287KB ✓ (≤320KB gate, honest re-target from <200KB — d.ts are half the tarball); lerpArray KEEP (kf consume-edge refuted the demote premise) |
| **N.W8** — Hygiene + reconciliation | IMPL | unilateral | **PLANNED** (+ the wire-deploy ceremony folded in) | master merged + green; tags == registry; submodule clean; docs match tree; prod deploy fires post-merge |
| **N.W9** — v1.0.0 close + π | DEV (close) | unilateral (pin gated on **the BA cut (4.0.0)** — 3.13.0 IS cut 2026-06-12, but BA's 4.0.0 carries the U-fix mass; WAVES-2 §4) | **PLANNED** (re-seq → W9′) | π green; glass-ui pinned at the BA cut; v1.0.0 published; FINAL.md |

## The WAVES-2 board (the re-divined second block — `WAVES-2.md`, authored 2026-06-12)

The 2026-06-12 user audit (LEDGER U1–U33, OUTRANKS all priors) re-opened the design surface the
dead W6 was chartered to fix; the second fleet (lanes2, R1–R4 · D1–D8 · U-* · L-* · X-*)
grounded every finding and `WAVES-2.md` re-divined the remainder. **RATIFIED 2026-06-15** (the
WAVES-2 second block PLANNED→RATIFIED; the grammar fold of `EXECUTION-ORCHESTRATION.md §3` /
`GRAMMAR-FOLD.md` ratified into N's library track — `sampleColorRamp` = N.W11.D, the scroll
grammar = N.W11′, both → 0.13.0). Every per-wave spec at `waves/N.W*.md` carries the matching
RATIFIED stamp; the rows below pointer to those specs. W8/W9 re-sequence AFTER this block
(W8′ absorbs the wire-deploy ceremony; W9′'s pin target moved 3.13.0 → the BA cut).
Note: W2.B's emission fix is in-tree and correct — the live desktop kill is the **unlayered
glass-ui dist CSS cascade** (D8-1, U11's true root), owned by N.W10.D.

| Wave | One line | Status | Spec | Blocked-on-BA? |
|---|---|---|---|---|
| **N.W10** | Functional truth: U9 reset · U33 aurora-motion · save data-loss P0 · kC placebo · the cascade kill (U11) + single-mount | **RATIFIED** | `waves/N.W10.md` | no |
| **N.W11** | Library color-SOTA (U10): gamut-map re-anchor + §13.2 oracle + wide-gamut egress (**+ lane D `sampleColorRamp`**) → **0.13.0** | **RATIFIED** | `waves/N.W11.md` | no |
| **N.W11.D** | `sampleColorRamp(from,to,n,{space,hueMethod})` — the perceptual ramp fold (VJ.W2); lane D of N.W11, composes the shipped color kernels; un-blocks kf-K.W10 CC-2 densify | **RATIFIED** | `waves/N.W11.md` §lane D · `GRAMMAR-FOLD.md` PART I | no |
| **N.W11′** | The scroll-grammar library wave (VJ.W1): the `CSSTimelineOptions` typed extractor + inverse serializer (NEW `parsing/scroll-timeline.ts`); the ONE genuine net-new grammar; → **0.13.0**; un-blocks kf-K.W9 | **RATIFIED** | `waves/N.W11-prime.md` · `GRAMMAR-FOLD.md` PART II | no |
| **N.W12** | THE GRAND HIERARCHY (D6): font root · accent axis · dark ladder · layout clamp · depth laws · ramp + φ tokens | **RATIFIED** | `waves/N.W12.md` | gray-token half free at pin |
| **N.W13** | CONTROLS: sliders/dropdowns/rail/pills/clip + a11y | **RATIFIED** | `waves/N.W13.md` | size-axis, Select bound/rung |
| **N.W14** | CARDS: PaletteCard first-class · depth applied · glassy skeletons · empty-state CTAs | **RATIFIED** | `waves/N.W14.md` | watercolor-ghost |
| **N.W15** | PERF: idle-floor · reflows · reactivity · bundles + the U6/U16 morph harness (born-RED) | **RATIFIED** | `waves/N.W15.md` | dock FLIP A-1 et al. |
| **N.W16** | PER-PANE: picker hero · gradient+easing · mix (inv-N-9 closes) · extract · docs · modern-web carry | **RATIFIED** | `waves/N.W16.md` | easing-configurator → W18 |
| **N.W17** | SHELL + MOTION + POPS: dock scale · 14→3 families · view-select · celebration · nomenclature | **RATIFIED** | `waves/N.W17.md` | spring-clock refines at pin |
| **N.W18** | Cross-repo consume-at-pin: the BA-cut re-pin + adopt sweep · easing-configurator · kf/fourier | **RATIFIED** | `waves/N.W18.md` | **gated on the BA cut** |
| **N.W8′** | (re-seq) Hygiene + reconciliation + **the wire-deploy ceremony** + doc-truth (R4 exact lists) | **RATIFIED** | `waves/N.W8-prime.md` | no |
| **N.W9′** | (re-seq) v1.0.0 close + π + FINAL.md (pin discharged by W18) | **RATIFIED** | `waves/N.W9-prime.md` | pin = the BA cut |

## The dispatch split

- **Unilateral, parallel-capable on ratification:** W1 (the critical path for all demo-visible
  work), W2, W3, W4, W7, W8.
- **W5** needs W1 + a clean local glass-ui dist (`file:` held until the registry pin).
- **W6** needs W5 (the design wave audits the consumed design system).
- **W9** closes; only its glass-ui **pin** waits on the cut — **amended 2026-06-12: 3.13.0
  shipped; the pin target is now the BA cut (4.0.0)**, discharged by N.W18 (the one
  cross-repo wait).

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

**Gate (first block)**: explicit user ratification of the charter + supersede-M. **Status**:
**CLOSED — RATIFIED 2026-06-11**. N.W1 dispatched first (R1) with W2.A and W7.A beside it; glass-ui
3.13.0 remains uncut at dispatch → the W9 registry pin holds as the chartered
BOOK-with-trigger (the pin is the gate, not the work).

**Gate (second block + the grammar fold)**: explicit user ratification of the WAVES-2 revision +
the `EXECUTION-ORCHESTRATION.md §3` / `GRAMMAR-FOLD.md` grammar fold. **Status**: **CLOSED —
RATIFIED 2026-06-15**. N.W10–N.W18 + the re-sequenced W8′/W9′ flip PLANNED→RATIFIED; `sampleColorRamp`
(N.W11.D) + the scroll grammar (N.W11′) fold into N's R2 library track → **0.13.0**, un-blocking
kf-K.W9/K.W10 one beat behind. Dispatch runs in the §2 round structure (R1 N.W10 gate-opener → R2
library + keystone → R3 design body → R4 BA-consume → R5 close); the ONE remaining cross-repo wait
is glass-ui's BA 4.0.0 cut, gating only N.W18 + the N.W9′ registry pin (the pin is the gate, not
the work).
