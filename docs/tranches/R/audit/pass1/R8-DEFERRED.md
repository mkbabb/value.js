# Lane R8-DEFERRED — the chronic-deferral sweep (zero drops)

**Lane**: R8 (chronic-deferral census). **Date**: 2026-07-02. **Branch**: `tranche-q`, v1.2.0 published.
**Mode**: tranche-development ONLY — nothing implemented; this file is the durable artifact.
**Charge**: sweep `docs/tranches/{A..O}` + the sibling coordination letters for EVERY deferred/BOOK/gated/
parked/punted/"not shipped"/"later tranche" item; for each give provenance, age (CHRONIC = ≥2 tranches),
live-tree-verified status, and a fold recommendation (fold-to-R / already-landed / genuinely-obsolete).

---

## §0 — The spine finding (the frame for everything below)

**The entire N demo/design/close/hygiene block never executed, and O/P/Q could not touch it.**

- The N-open + N-execution census (`docs/tranches/N/audit/lanes2/R3-fold-ledger-v2.md`, the
  authoritative pre-O ledger, 2026-06-12) re-divined **~40+ design-suffusion survivors** (incl. all 33
  user-audit rows), **~14 W8′ hygiene/deploy rows**, **2 W9′ close rows**, **~18 cohort asks**, into a
  successor "N2" block — the waves **N.W8′, N.W9′, N.W10–N.W18** (`docs/tranches/N/waves/*.md`,
  `WAVES-2.md`). Those specs were **RATIFIED 2026-06-15** (`WAVES-2.md §1`;
  `EXECUTION-ORCHESTRATION.md §0`) but **NEVER IMPLEMENTED** (`O/PROGRESS.md:5,9`: "N demo/design block
  (N.W10–N.W18): RATIFIED, not yet implemented"; the constellation-state note: "RATIFIED 2026-06-13 but
  NEVER IMPLEMENTED … now ~3 weeks stale").
- **O, P, Q were library-only tranches.** O shipped the parser/color-math library through **1.0.0**
  (`O/PROGRESS.md`); P shipped `parseCSSSubValue` + `color2Into` (1.1.0); Q shipped `contrast-color()` +
  the out-param family + grammar fixes (1.1.1/1.2.0). **None of them touched `demo/`, the wire, the tree
  hygiene, the tags, or the design body.** So every N2 survivor sat frozen from N-close (2026-06-13)
  through R-open (2026-07-02), untouched, and is verified STILL OPEN against the live tree below.

**Consequence**: R8's census is, in the main, a re-confirmation that the R3-v2 survivors are all still
live, PLUS the drift O/P/Q introduced (more untagged versions, ComponentSliders crept over the god-module
cap, the P/Q record-docs never authored), MINUS the handful that O/P/Q closed silently (verified per row).

**Silently CLOSED by O/P/Q (verified — do NOT re-fold)**:
- **VJ-P.W0 `setSubProperty` O(N²) ctor bug** — FIXED in P (`src/units/index.ts:188-194`, the
  `values.forEach((v) => v.setSubProperty(name))` correction, self-commented "VJ-P.W0 O(N²) fix").
- **VJ-P1 `color2Into` deferred egress-wrapper half** (O.W3.md:140 "deferred, out of O.W5 scope") —
  CLOSED: P shipped the OKLCH→XYZ leg (84→37), Q's VJ-Q2 re-opened + shipped the dropped egress half
  (37→<12). Commit `e80b359` "VJ-Q2…Q9".
- **`mixColorsInto` out-param** (`O.W5.md:453` "deferred") — CLOSED via VJ-Q3 (Q, `e80b359`).
- **VJ-L3 `parseCSSSubValue`** (O deferred → P ask) — SHIPPED 1.1.0.
- **VJ-Q1 `contrast-color()`** platform-parity gap — SHIPPED 1.1.1 (`fd3c7ce`).
- **VJ-Q5..Q9** (`/math` subpath, dashed-call arm, `if()` multibranch, serialize-fidelity) — SHIPPED
  1.2.0 (`e80b359`). The kf P/Q ask roster is materially discharged.

**GENUINELY OBSOLETE (evidence, not fatigue)**:
- **N.W9′ "v1.0.0 close as a version event"** — OBSOLETE. O already cut **v1.0.0** on 2026-06-19
  (`O/PROGRESS.md:28,70`), and the library is now at **1.2.0**. The version-milestone framing is spent;
  the *residual* W9′ hygiene (the FINAL.md for N, the glass-ui pin-discharge, the phantom-keyframes-devDep
  drop) survives and folds below — but "reach 1.0.0" is done.
- **The N-era glass-ui pin targets `3.13.0` / "BA cut 4.0.0"** — OBSOLETE targets. glass-ui is now
  **v4.2.0, tranche BG executing** (constellation state). The pin-discharge ASK survives but must
  re-target the current glass-ui line, not the dead 3.13.0/BA anchors.

---

## §1 — The CHRONIC ledger (each row: provenance · age · live status · fold)

Age counts tranches from first defer through R. O/P/Q count as "skipped" for demo/hygiene/design rows
(they could not advance them) but the dormancy still accrues.

### §1.A — The hygiene / ceremony cluster (N.W8′ — never fired; the largest un-fired closure)

| # | Item | Provenance | Age | Live status (verified 2026-07-02) | Fold |
|---|------|-----------|-----|-----------------------------------|------|
| **R8-1** | **Dirty-tree residue** — `$OUT` (66726 B), `.w6a-audit{,2,3,4,5}.mjs`, `mix-1440-snapshot.md`, `shot3-dataurl.txt`, `suffuse-dataurl.txt`, + 2 TRACKED `docs/tranches/N/audit/impl/shots/w6a-shell-{console,probes}.json`, + staged `D CHANGELOG.md/CONTRIBUTING.md/VENDOR-POLICY.md`, + dirty `docs/precepts` submodule; NO `.gitignore` class rule | `N.W8′.B` (`N.W8-prime.md:106-119,284`); `N/fold-ledger §5`; `M/audit/fold-ledger §5` | M→N→[O,P,Q]→R ≈ **5 (CHRONIC)** | **STILL LIVE** — `git status` + `ls` confirm all 8 untracked + 3 staged + submodule present, unchanged since 2026-06-15 | **fold→R** (mechanical B-lane sweep + `.gitignore` class) |
| **R8-2** | **tags == registry** — retro-tag the published versions | `N.W8′.A` (`N.W8-prime.md:143-160,319`); `N-P0-5` | N→R, **WORSENED** | **LIVE + WORSE** — `git tag` jumps `v0.11.1 → v1.1.0`; **MISSING**: `v0.11.2, v0.12.0, v0.13.1, v0.14.0, v0.15.0, v0.16.0, v1.0.0` (7 published-but-untagged versions, incl. the **v1.0.0 milestone itself**). The "tags==registry" gate has degraded every tranche since N | **fold→R** (annotated retro-tags for all 7; this is now the single most-degraded hygiene gate) |
| **R8-3** | **master-merge hygiene** — merge the tranche branch → master via PR, CI-green | `N.W8′.A` (`N.W8-prime.md:162-172`); recurring per-tranche | Recurring discipline | **LIVE** — `git rev-list --left-right master...tranche-q` = `0 3`; master HEAD `15b0382` (1.0.2) while registry serves 1.2.0. The branch-lag pattern repeats every tranche (P/Q asked it too: VJ-Q.W0 "merge `tranche-p → master`") | **fold→R** (recurring; low-effort; R should merge the O/P/Q lineage to master) |
| **R8-4** | **Wire-deploy ceremony** — prod serves I-era `23a7b27`; deploy HEAD api (X1/N-P0-3), NCSU-alias on-host retirement (X2/DEC-9), first CF-Pages run (X3/CH-14a/A5), N-P0-2 wire half, X5 rollback note | `N.W4→N.W8′.D.1` (`N.W8-prime.md:174-193,411`); `N/fold-ledger §1 P0-2/3` | I(prod origin)→K/L/N→R ≈ **7+ (CHRONIC)** | **LIVE** — `api/apache-vhost.conf:25-26` STILL carries the NCSU retirement as a pending on-host action item; the deploy artefacts exist (`scripts/deploy-hook.sh`, rs0 `compose.yaml`) but the ceremony was gated on `{N.W10..W17 green}` which never happened. Prod wire un-verifiable here but the ceremony demonstrably never fired | **fold→R** (needs a maintainer on-host op for X2; X1/X3 are CI-gated on the merge) |
| **R8-5** | **Doc-truth** — RELEASE.md (RM-1..8: dead `node.js.yml` cites, excised `proof:*` ladder, stale v0.9.0 version map), CLAUDE.md (CM-1..7: parse-that pin, indexes 22 not 27, port 8130, typecheck split), DESIGN.md (X13 catalog refresh), demo/CLAUDE.md | `N.W8′.D.2` (`N.W8-prime.md:195-237,413`); `M/audit/fold-ledger §6` | M→N→R ≈ **4 (CHRONIC)** | **LIVE + WORSE** — `CLAUDE.md:~113` still reads `@mkbabb/parse-that@^0.7.0`; the REAL pin is now `^0.13.0` (constellation state), so the drift widened past even the N-era `^0.9.0` finding | **fold→R** (measure-then-write; the drift grows each tranche) |
| **R8-6** | **Kill-list** — delete `useCardMenu.ts`, `useCodeFormatting.ts`, the DUPLICATE `usePaletteExport.ts` (NOT Katex/ImagePaletteExtractor — V5-refuted) | `N.W8′.E` (`N.W8-prime.md:239-253,414`); `N/fold-ledger §5` | M→N→R ≈ **4** | **LIVE** (per N.W8′ §State-verified row 7; the wave never ran so the 3 orphans + 2 `usePaletteExport.ts` copies persist) | **fold→R** (verify still-dead, then delete) |
| **R8-7** | **P/Q record-hygiene** — value.js's own P & Q tranche docs never authored; PROGRESS-honesty | `VJ-P.W0` (`keyframes.js/…/P/KF-TO-VALUEJS-P.md`); `VJ-Q.W0` (`…/Q/KF-TO-VALUEJS-Q.md`) | P→Q→R ≈ **2 (CHRONIC)** | **LIVE** — `docs/tranches/P/` and `docs/tranches/Q/` are **EMPTY** dirs; the two tranches shipped (1.1.0, 1.1.1, 1.2.0 per `git log`) with **zero durable wave-record**. (O docs ARE committed + PROGRESS reads CLOSED — that half of VJ-P.W0 landed) | **fold→R** (author the lean P/Q close records or fold their content into R's ledger) |

### §1.B — The design-suffusion cluster (N.W10–N.W17, all W6-orphaned)

| # | Item | Provenance | Age | Live status | Fold |
|---|------|-----------|-----|-------------|------|
| **R8-8** | **inv-N-9 / T16 — mix-canvas RAF PRM hole** (the ONE live un-gated RAF) | `N.W6.C` T16 (`N/fold-ledger §4`); `R3-v2 §1.3 T16`; `M/audit/fold-ledger §4 E2/T1`; constellation-grand-audit PRM-RAF epidemic (K-era) | K→M→N.W6(died)→R ≈ **6 (CHRONIC)** | **CONFIRMED LIVE** — `demo/@/components/custom/mix/composables/useMixingAnimation.ts` has 5 `requestAnimationFrame` calls (lines 77,83,99,189,196) and **ZERO** `prefers-reduced-motion`/`matchMedia`/PRM guard | **fold→R** (a PRM gate; the last live PRM hole) |
| **R8-9** | **inv-N-7 — `watercolor-swatch` phantom class** (MixSourceSelector.vue:148) | `N.W5.E` inv-N-7 (`N/fold-ledger §5`); named chronic suspect | N→R ≈ **2** | **PARTIAL-FIX, phantom SURVIVES** — the sweep MINTED `.dashed-well` (`demo/@/styles/utils.css:52-66`, real now) but `watercolor-swatch` at `MixSourceSelector.vue:148` has **NO CSS definition anywhere** (grep across `demo/assets/src` → zero) — a live no-op hook the inv-N-7 sweep missed | **fold→R** (define or delete the dead class hook) |
| **R8-10** | **The 33 user-audit findings (U1–U33)** — typography, blob-expressivity + `uSatColor[]`, dead aurora (U33), dock-motion, selects, controls, cards/depth-grammar, docs-φ-ladder, easing-pane, **U9 reset-color functional bug**, **U10 LAB→RGB library color-fidelity bug** | `N/audit/user-audit-2026-06-12/LEDGER.md`; `R3-v2 §4`; `WAVES-2.md §5` → N.W10–N.W17 | N→R ≈ **2**, but re-states A/D-era design mandates ≈ **10** | **ALL LIVE** — the design body never executed. U9 (functional) + U10 (a claimed **library** color bug) are the highest-severity | **fold→R** (the design body; U10 is a library-correctness row R must reproduce/diff) |
| **R8-11** | **T19/T20/T21 — extract-pane discards population/dominance · ExtractPane↔ImagePaletteExtractor ~90% dup · EditDrawer `display:none` dead UI** | `N.W6.C` (`N/fold-ledger §4`); `R3-v2 §1.3` | M→N.W6(died)→R ≈ **4** | **LIVE** (W6 died un-implemented; no impl report) | **fold→R** |
| **R8-12** | **The modern-web carry — K-W3DIFF · K-PALID · K-INV5 · K-DISP (dispatch.ts hue-cluster→mix.ts real decomp) · K-W5RT (router 4→5)** | `M.W6` → `N.W6.D` (`N/fold-ledger §2`); `M/audit/fold-ledger §3` | K→M→N.W6(died)→R ≈ **6 (CHRONIC, twice+deferred)** | **LIVE** — the 5-item M.W6 carry, deferred M→N.W6→[skipped]→R | **fold→R** |
| **R8-13** | **X6 dual-mount WebGL blob** (both breakpoint panes hold live 200×200 WebGL2 contexts; off-breakpoint paints nothing) · **X8 R1 pane-router cold-hash residual** (direct `/#/palettes` mounts in hidden slot) · **X9 R2 tags-warn** (`availableTags` Object-not-Array, 20× Vue warn) | `R3-v2 §2` X6/X8/X9 (`W5-defectA.md:152`; `W1D-closure.md:153,178`) | N→R ≈ **2** | **LIVE** (execution-born handoffs; W6 died) | **fold→R** |
| **R8-14** | **ComponentSliders.vue god-module breach** — 418 LoC, over the ≤400 demo cap | precept (`CLAUDE.md` demo-god-module); `H.W3` audit measured it at **333 LoC** | crept **H(333)→now(418)**, silent | **NEW LIVE BREACH** — `wc -l` = 418; it is the ONLY demo file (excl. `ui/`) over 400. Crept over the cap during the N-era touches (never re-audited because N.W13 controls never ran) | **fold→R** (sub-component lift; a real precept violation) |

### §1.C — Demo/library visibility

| # | Item | Provenance | Age | Live status | Fold |
|---|------|-----------|-----|-------------|------|
| **R8-15** | **O.W7-demo — Parse-Lab pane + gamut-truth indicator** (`GamutTruthBadge`, `ParseLabPane`, `ValueUnitTree`) — the parser identity is invisible in the demo | `O.W7-demo.md` (born-RED gate `proof:parse-lab-mount`); folds `M.W6`→`N.W6`(died)→`N.W16` | M→N→O(deferred, demo-only)→R ≈ **4 (CHRONIC)** | **NOT SHIPPED** (`O/PROGRESS.md:29,58` "demo-only; deferred — not a library-close blocker"); no `ParseLabPane.vue` in the tree | **fold→R** (the demo's only value.js-parser-identity surface; O explicitly left it) |

### §1.D — Close (N.W9′) — residual hygiene only (the version event is obsolete, §0)

| # | Item | Provenance | Age | Live status | Fold |
|---|------|-----------|-----|-------------|------|
| **R8-16** | **N close residuals** — the glass-ui registry pin-discharge (inv-N-6) · the phantom `@mkbabb/keyframes.js` devDep drop (inv-30) · `docs/tranches/N/FINAL.md` (never authored) | `N.W9′` (`N.W9-prime.md:17-23,40-46`) | N→R ≈ **2** | **PARTIAL** — the "reach v1.0.0" event is OBSOLETE (O shipped it, §0); the pin-target `3.13.0`/BA is OBSOLETE (glass-ui @ 4.2.0/BG, §0). But: no `N/FINAL.md` exists (`ls docs/tranches/N` → no FINAL.md); the phantom-devDep + pin-hygiene need re-verification against the current `demo/package.json` | **fold→R** (author N/FINAL.md; re-target + verify the pin/devDep; drop the obsolete v1.0.0 framing) |

### §1.E — Cohort asks (cross-repo — sibling-owned CARRIES, not value.js writes)

| # | Item | Provenance | Age | Live status | Fold |
|---|------|-----------|-----|-------------|------|
| **R8-17** | **glass-ui asks** — `uSatColor[]` per-satellite shader (PROMOTED load-bearing by U3) · `AuroraConfig` slider descriptor · CH-4..8 EXPANDED (U7 dropdown-font, U8 dropdown-bounds/scroll, U15/U28 slider first-class, U18 watercolor-ghost variant, U27 easing-selector port) · C-DTS `build:watch` dts · devDep bump · `.retired-classes.txt` | `N.md §8` (`R3-v2 §3.1`); `M/W7 W-ASKS`; `CH-4..8` A→K carry | A/K→M→N→R ≈ **8–10 (CHRONIC)** | **glass-ui-owned CARRY** — glass-ui is @ **4.2.0, tranche BG executing** (aurora-metal, dock-fission per constellation state); the N-era `3.13.0`/BA targets are STALE. The asks survive but must re-anchor on the current glass-ui line | **fold→R as cohort-carry** (re-target to glass-ui BG/BH; verify which already shipped) |
| **R8-18** | **fourier asks** — conformance-matrix corrections (value.js now emits `urn:contract:*`) · fourier-web `^0.11.0` pin bump | `N.md §8` (`R3-v2 §3.2`); `J` cohort | J→N→R ≈ **4** | **fourier-owned CARRY** (fourier @ tranche M per constellation state; value.js side already emits the URN scheme) | **carry** (fourier-owned; value.js has nothing to write) |
| **R8-19** | **keyframes asks — VJ-Q1..Q9, VJ-L3, VJ-P1, VJ-P3** | `KF-TO-VALUEJS-{P,Q}.md` | P→Q | **LANDED** — shipped via 1.1.0/1.1.1/1.2.0 (`git log` `fd3c7ce` VJ-Q1, `e80b359` VJ-Q2..Q9; P shipped VJ-L3/P1/P3). Residual: MCI-5 pad re-wire, P3-keyframe, light-dark per-target = **kf BOOK** (kf-side consumes value.js sentinels) | **already-landed** (value.js side); kf-side BOOKs are kf-owned |

### §1.F — BOOK-with-trigger carries (no R action unless the trigger fires)

| # | Item | Provenance | Trigger | Fold |
|---|------|-----------|---------|------|
| **R8-20** | CH-10 keyframes precept-pin convergence | `N/fold-ledger §2`; M→K carry ≈ **9** | maintainer-signal | **carry** (unchanged) |
| **R8-21** | CH-13 fourier Phase-0 quiescence | `N/fold-ledger §2` ≈ **6** | fourier-owned | **carry** |
| **R8-22** | X5 rollback runbook · X14 SwiftShader e2e harness residual · X4 openapi table-vs-source drift gate | `R3-v2 §2` | operational / decision | **carry** (fold X5/X4 into the R.W8-equivalent deploy runbook + record the X4 decision) |

### §1.G — Minor grammar-completeness defers (verify-obsolete candidates)

| # | Item | Provenance | Status | Fold |
|---|------|-----------|--------|------|
| **R8-23** | `@scroll-timeline`/`@view-timeline` timing longhands not-yet-in-stable-CSS | `O.W4b.md:451,460` "deferred as a gap item" | genuinely-later (spec-tier gated) | **carry** (add gate clauses when the CSS spec stabilizes; not fatigue — a real upstream-spec dependency) |
| **R8-24** | Typed `<syntax>` grammar for `@property` (string-form gated in O.W4) | `O.W4.md:582` "the typed syntax grammar is O.W5 or later" | partially met by VJ-Q6 (`<syntax>` validator confirm) | **verify** (VJ-Q6 asked to expose the validator; confirm it shipped in 1.2.0) |

---

## §2 — Zero-drop attestation + roll-up

**Every deferred marker across `{A..O}` + the sibling P/Q letters is accounted for**: the pre-O census
(`R3-fold-ledger-v2.md`) already dispositioned the A→N corpus with zero drops; R8 re-verifies its OPEN
survivors against the live tree and adds the O/P/Q-era drift.

- **CLOSED by O/P/Q (do NOT re-fold, §0)**: setSubProperty O(N²), color2Into egress half, mixColorsInto,
  parseCSSSubValue, contrast-color(), VJ-Q5..Q9. **~8 rows.**
- **GENUINELY OBSOLETE (evidence, §0)**: the "reach v1.0.0" version event (O did it); the `3.13.0`/BA
  glass-ui pin targets (glass-ui @ 4.2.0/BG). **2 framings** (their residual hygiene survives in R8-16/17).
- **CHRONIC → fold-to-R**: R8-1..16 (hygiene 7, design 7, demo 1, close 1) + R8-17 cohort-carry +
  R8-24 verify. **The largest un-fired clusters are the N.W8′ hygiene/deploy (R8-1..7) and the
  W6-orphaned design body (R8-8..14, incl. all 33 user-audit rows).**
- **CARRY (sibling/BOOK-owned)**: R8-18 (fourier), R8-19 (kf-side BOOKs), R8-20..23. **~5 rows.**

**The headline for R**: O/P/Q perfected the *library* and left the *demo, the wire, the tree, the tags,
and the design language* exactly where N-death left them. The two oldest user mandates (aurora, blob) are
still tuning-broken (U33 dead aurora, U3 white satellite-less blob); the mix-RAF PRM hole is the last live
PRM gap; ComponentSliders silently breached the god-module cap; **7 published versions incl. v1.0.0 are
untagged**; the prod wire still serves I-era code; and the demo still cannot show what value.js parses
(O.W7 Parse-Lab). Zero silent drops — every row above has a provenance, an age, a live-verified status,
and a disposition.
