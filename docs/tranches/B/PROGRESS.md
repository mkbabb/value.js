# B — Progress

Execution log for tranche B. Updated at wave boundaries. Planning-only at B open per user directive; no implementation commits exist at the time of this entry.

## 2026-05-18 — B open

### User directive

The user interrupted A's W5 lane mid-flight (`research/Bd-w5-audit.md §3` documents the "hung on e2e" condition) with the turn-4 directive (`B-PROMPTS.md §1` and `findings.md §1`):

> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward … NO quick solutions, NO workarounds: idiomatic, gestalt approaches … NO legacy code … This is NOT an implementation phase. Tranche development only.

The orchestrator stopped the running W5-C e2e agent's downstream actions and opened Tranche B in planning-only mode.

### Audit round — 6 parallel lanes

Six read-only audit lanes dispatched as `Explore` agents.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| Bα | chronically + A-deferred items ledger | `research/Ba-deferred-ledger.md` | **51 items**. Most surprising: hero-lab's `HeroControls.vue` is the highest-error file in the repo (23 vue-tsc errors); W5 is functionally complete in the working tree but officially closed nowhere ("hung on e2e" diagnosed). |
| Bβ | layout simplification | `research/Bb-layout-simplification.md` | The dock-pos centring is a real design choice but implemented via two independent layout mechanisms (grid clearance + fold-back formula). **Proposal B**: delete `--dock-pos` entirely, flex+fixed layout. ≈15 lines deleted, 1 token deleted. Visual delta only at 21:9. |
| Bγ | component-structure simplification | `research/Bg-component-simplification.md` | **4 over-fits**: DockMainLayer.vue (151 lines, pure passthrough) → MERGE; useDockLayers.ts (37 lines) → INLINE; useAtmosphere.ts (24 lines) → INLINE; useDesktopPaneRouter + useMobilePaneRouter → MERGE to usePaneRouter (One-Path violation, duplicated `defineAsyncComponent`). Net: −4 files. |
| Bδ | W5 audit (a11y + animation + e2e) | `research/Bd-w5-audit.md` | A11y sweep mostly correct; 2 over-reaches (SpectrumCanvas invalid `role="slider"`, SwatchHoverMenu ghost `role="toolbar"`). Reduced-motion sledgehammer acceptable + optional overlay-opacity carve-out. **E2e gate shape is the root cause of "hung on e2e"** — smoke-suite + nightly-full is the correct gate. |
| Bε | original-mandate coverage | `research/Be-mandate-coverage.md` | 8 mandates fully addressed; 5 partially. Mandate 12 ("gaps in value.js AND glass-ui") — the AND is broken: A scoped `src/` out. **B.W4 owns the library-side audit.** |
| Bζ | legacy + cruft sweep | `research/Bz-legacy-cruft.md` | 31 items. Most surprising: glass-ui shipped `UnderlineTabs` as a standalone component (not a `<Tabs variant="underline">` prop) — the demo's `.underline-tabs` CSS override needs a structural migration. `floating-panel-item` is an orphan class (zero CSS rule anywhere). Vue dedup still required. Custom typecheck cluster ~155 errors B-fixable. |

### Plan synthesis

`B.md` synthesized — thesis (close A, abrogate four over-fits, complete Mandate 12 AND, reshape e2e gate, retire residual legacy), five invariants (B1–B5), a 6-wave schedule, per-wave hard gates, the A↔Q coordination reflection. Wave specs `waves/B.W0..B.W5.md`.

### State at B open

Plan substrate: `B.md` (master plan), `B-PROMPTS.md` (user-prompt + precept recap), `findings.md` (user directive recap + W5 status), `research/Ba..Bζ` (six audit docs), `coordination/Q.md` (A↔Q reflection at B open), `dispatch/AGENT.md` (B agent contract), `waves/B.W0..B.W5.md` (six wave specs), this file. **No implementation has run — planning-only.**

### Pre-B working-tree state (the "hung on e2e" condition)

At B open, the working tree carries A.W5's uncommitted source modifications:

- 30+ modified SFCs (W5-A a11y additions)
- `animations.css` (reduced-motion block; W5-B)
- `useMetaballRenderer.ts`, `GooBlob.vue` (tab-hidden + aria-hidden; W5-B)
- 16 modified e2e specs (W5-C in flight when interrupted)
- 2 untracked audit docs (`docs/tranches/A/audit/W5-a11y.md`, `W5-animation.md`)
- A's PROGRESS.md still records W5 as `planned`

B.W0 ratifies, gates, and commits this work as part of closing A.

### The pre-existing src/ WIP

Eight files in the working tree predate A. They are not B's to commit until B.W4 dispositions them: `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts` (all `M`); plus untracked `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`. All five untracked files are re-exported from `src/index.ts` — public-API debt. B.W4 audits and dispositions.

## 2026-05-18 — e2e assay round

The user followed the turn-4 directive with: "Most of our e2e tests are likely superfluous, and the playwright-driven ones are likely nonsense and can be totally abrogated. Deploy 4 agents in parallel to assay, and fold your findings into the B tranche."

The orchestrator stopped the still-running W5-C e2e agent (`TaskStop` — its selector-migration work was superseded and it was mutating the assay's read target) and dispatched 4 read-only assay lanes.

| Lane | Deliverable | Verdict |
|---|---|---|
| e2e-census | `research/B-e2e-census.md` | 4 NONSENSE, 6 SUPERFLUOUS, 6 essential-but-entangled |
| e2e-overlap | `research/B-e2e-overlap.md` | `color-visual-validation` is a unit test routed through a browser — ~120 assertions duplicate `color-validation.test.ts` |
| e2e-brittleness | `research/B-e2e-brittleness.md` | ≈3,510 lines; ~42 `.lucide-*`, ~132 `waitForTimeout`, ~34 `page.evaluate()`, ~29 `test.skip`; 10/16 score ≥3 nonsense; 2 dead live-API specs. **This lane dissented** — recommended keep-and-migrate. |
| e2e-target | `research/B-e2e-target.md` | Recommendation: abrogate all 16; replace with 3 role/label smoke specs; add a browser CI gate |

**Orchestrator synthesis**: census + overlap + target + the user's directive + the precept "abrogate before patch" all converge — **delete all 16 specs, replace with a 3-spec smoke suite.** The brittleness lane's keep-and-migrate dissent was overridden: keep-and-migrate is the exact W5-C hang pattern, and the lane's own claim "`color-visual-validation` is the best spec" is contradicted by the overlap lane's proof that it is a misplaced unit test. The dissent is recorded, not silently dropped.

**Folded into B.W4 Lane D** — revised from "stand up a 4–5-spec smoke suite, keep the 16 full" to "delete all 16; create exactly 3 `e2e/smoke/` specs; `playwright.config.ts` gains `smoke`, loses `mobile`; CI gains a `playwright test --project=smoke` step." `B.md §1/§3/§5/§6`, `findings.md §2 G`, `dispatch/AGENT.md`, and `waves/B.W0.md` (no commit of the soon-deleted e2e specs) updated accordingly.

## 2026-05-19 — Q-close realignment round

The user directed: "assay what was recently done by the completed Q agent, and what was done herein, and what needs to be done hereof. This is in glass-ui — and align our extant tranche therewith."

B's plan was drawn against glass-ui's pre-execution HEAD `888d227`. glass-ui's tranche Q has since fully executed W0–W6 and **closed at HEAD `4b16de7` (v1.9.2)**. A 3-lane read-only assay re-aligned B.

| Lane | Deliverable | Verdict |
|---|---|---|
| Q-scope ledger | (assay-only, no doc) | Q ran W0–W6: dev-resolution contract (W0), fleet consumer un-break (W1), Card props fail-explicit (W2), core-feature cohesion + ScrollPane/CartoonCard DEMOTE (W3), token co-location (W4), keyframes.js demo restoration (W5), strengthened close + phantom-class gate + precept advance (W6). v1.8.5 → v1.9.2. |
| Gap re-verification | `coordination/Q.md §2a` | 8 of 10 B-filed gaps unchanged at Q close. `Card` SHIPPED (Q.W2, already consumed by A.W1; + `surface` prop Q.W3). `UnderlineTabs` unchanged-PARTIAL. 7 primitive/blob gaps + `floating-panel-item` NOT SHIPPED. No consumer breakage from the W3 DEMOTE (value.js uses neither demoted component). |
| Contested-boundary check | `coordination/Q.md §4` | **MOOT** — Q never wrote value.js; round-4 audit retired the contested lanes; the picker-0×0 fix was handed over as a patch whose content already lives in committed value.js history. |

**Precept advance**: glass-ui Q.W6 advanced the shared `docs/precepts` submodule `3310a8c` → `3c32fae` — invariants 30 (cross-repo dev-resolution), 31 (props fail-explicit), 32 (phantom-class corpus-grep), 33 (dead-code corpus-grep), + π-lane re-activation. value.js's pin is still `3310a8c`; **B.W0 advances it to `3c32fae`** (new Lane 0).

**Realignment edits** (planning-only, no implementation): `coordination/Q.md` (header, new §2a, §4 resolution, §6 rewrite, §8 table), `B.md` (§0 header, §2 invariants note, §7 cross-tranche debt), `findings.md` (§2 G + H, new §2 K), `waves/B.W0.md` (Lane 0 + invariant-31 probe check + gate + commit plan), `waves/B.W1.md` (invariant 32/33 on the `floating-panel-item` strip), `waves/B.W4.md` (invariant-33 pre-deletion grep on the e2e abrogation; invariant-30 in the library audit), `waves/B.W5.md` (precept SHA `3c32fae`; contested-boundary closed-state; integrity-sweep expectation). No new wave; no scope change beyond gate hardening.

## 2026-05-19 — Hardening round (six waves → five)

The user re-issued the turn-4 audit directive scoped to harden Tranche B *itself* — "harden B in place" — naming three overfit surfaces: component structure, the tranche apparatus, the e2e/test scaffolding (layout explicitly excluded). Six read-only `Explore` agents audited B's plan in parallel.

| Lane | Angle | Headline finding |
|---|---|---|
| 1 | wave structure | The standalone layout wave (old B.W2) is a single-lane, 1-commit refactor — wave-inflation. Merge into B.W1. The other waves are appropriately sized; the close ceremony is precept policy, not over-fit. **6 → 5 waves.** |
| 2 | apparatus / docs / gates | 22 docs / ~2,713 lines — 30–40% over-built. `findings.md §1` duplicates `B-PROMPTS.md`; the 4 e2e assay docs should consolidate; the gate apparatus is 5 tiers where 3 suffice. |
| 3 | B.W2 consolidation depth | All 4 Bγ consolidations verified correct; the audit found a 5th (`useGenericActionBar` → fold into `usePaneRouter`) and reframed the lane as one architectural transposition, not 4 disconnected merges. |
| 4 | actual component tree | 7 over-engineering candidates beyond Bγ's 4 — `usePaletteManagerWiring`, `PaneSlot`, `PaneSearchBar`, `PaneSegmentedControl`, `useDockActionBar`, the `DockMainLayer` defineModel tax. Folded as B.W2 Tier-2 (evaluate-at-wave-open). |
| 5 | e2e gate model | Smoke suite + per-wave probe are complementary, not redundant — keep both. The 6-capture probe is over-provisioned for library-only waves → probe wave-qualification (invariant B4). |
| 6 | A's landed changes + prompt recap | All 5 A over-fits already captured in B's plan. 13 mandates: 7 closed by A, 6 routed to B; mandates 12/13 foregrounded in `findings.md §4`. No coverage gap. |

**Hardening applied to the substrate** (planning-only): six waves → five (old B.W2 layout folded into B.W1 Lane D; old W3/W4/W5 renumbered to W2/W3/W4); B.W2's consolidation lane expanded (Tier-1 confirmed + Tier-2 evaluate-at-open + the view-schema routed to B.W3); the 4 `B-e2e-*` research docs merged into one `B-e2e-investigation.md`; `findings.md §1` deleted (duplicate), §2 pared to a mapping table; `B.md §1/§5/§6` pared, gate model collapsed 5 tiers → 3; the Playwright probe wave-qualified (B4). No new wave, no scope dropped — every finding still lands; the apparatus is leaner.

## 2026-05-19 — keyframes.js parity round

The user directed an audit of value.js ↔ `@mkbabb/keyframes.js` parity and abstraction — "in both their libraries AND their demos" — folded into Tranche B, planning-only. Six read-only `Explore` agents audited in parallel: library API/module conventions, build/tooling, shared-logic duplication, cross-consumption coupling, demo parity, and precept/convention conformance.

**Headline**: the coupling is **architecturally sound**. keyframes.js → value.js is a clean one-way dependency (~14 imports across 12 modules); value.js imports nothing from keyframes.js. **Zero shared-math duplication** — keyframes.js consumes value.js's easing/bezier/`lerp`/`timingFunctions` rather than re-implementing. Dev resolution is idiomatic (the `development` export condition, no hard `dist/` alias). keyframes.js is invariant-30 compliant on its root export.

**Findings folded** (`research/B-keyframes-parity.md`, `findings.md §2 M`):
- value.js-side (B-actionable) → **B.W3** (vestigial keyframes.js devDependency K1; tsconfig/vitest drift K2/K3; `solveCubicBezierX` export K5) + **B.W4** (Prettier-doc gap K4).
- keyframes.js-side (6 gaps) + the precept-pin desync (value.js `3310a8c`, keyframes.js `458c2d1`, glass-ui `3c32fae`) → **filed in `coordination/Q.md §9`**; B writes value.js only, so these route to keyframes.js's own maintenance.

No new wave; no scope change. The audit added one research doc and §9 to the coordination manifest.

## 2026-05-19 — B execution authorized; B.W0 HEADLINE close

The user lifted the planning-only constraint and authorized tranche execution in totality ("Begin and continue the current tranche … do not relinquish control … until you have completed the plan IN TOTALITY"). Execution runs on the branch `tranche-b` off `master` HEAD `f9a47ca` (the system-prompt git rule — branch off the default branch before committing execution work).

### B.W0 — close A

- **Lane 0 — precept advance.** `docs/precepts` submodule advanced `3310a8c` → `3c32fae` (glass-ui Q.W6's advance — invariants 30–33 + π-lane). Commit `de8c573`. B operates under invariants 30–33 for the rest of the tranche.
- **Lane A — A.W5 ratify + commit.** The working tree was ratified against `docs/tranches/A/audit/W5-a11y.md` / `W5-animation.md` — not re-done. Gate matrix: `vitest` 1409 passed; `vue-tsc` 243 (the W5 ARIA additions did not raise it — B.W0 expected ~290, actual is better); Playwright boot re-probe 3 viewports × light+dark, **0 console errors, 0 stale-prop warnings** (invariant-31 check passes). Committed as 2 logical commits (`7088da4` a11y, `5247313` animation) + the close doc (`36a4ad0`). The 16 modified `e2e/*.spec.ts` left uncommitted — B.W3 deletes them. `style.css` was W5-a11y collateral (landmark integration) folded into the a11y commit.
- **Lane B — A.W6 disposition.** Re-verified the metaballs/aurora/`BlobDot` APIs against glass-ui's **current** HEAD `e2e5303` (post-Q-close): none shipped. A.W6 closed by formal re-scope — `docs/tranches/A/audit/W6-deferred.md`; commit `065c6fe`. Adjacent finding: glass-ui `ce5aad8` (contract-v2, v1.9.3) abrogates the `development` dev-resolution condition — a B.W3 invariant-30 audit concern, noted for that wave.
- **Lane C — A.W7 close ceremony.** 6 read-only close-audit lanes dispatched as parallel agents + the integrity sweep run by the orchestrator. All clean. `docs/tranches/A/FINAL.md` written; A's wave-log shows zero `planned`; commit `a9b6a94`. Tranche A is **closed**.

### W7 close-audit findings folded into B (invariant B5)

The A.W7 close audit surfaced B-actionable items, folded into the wave specs and `findings.md §2 N`: the `ui/alert/` hand-rolled fossil + dead `ui/` barrels → **B.W2** Lane A Tier-1b; the `--animation-slide-md` phantom token → **B.W1** Lane C; the `cssColorToRgb` per-frame hot-spot → routed with `audit/W6-deferred.md`; 14 doc-drift items → **B.W4** (its doc-drift lane already owns the scope).

### Gate

B.W0 hard gate MET — precepts advanced + committed; A's wave-log zero `planned`; `A/FINAL.md` cites every commit; `audit/W6-deferred.md` exists; A.W5 working-tree paths clean (e2e specs deliberately uncommitted); integrity sweep clean; `npm test` 1409; `vue-tsc` 243 recorded; Playwright 0 stale-prop warnings.

## 2026-05-19 — B.W1 close — W5 corrections + layout transposition

Four lanes — A/B/C dispatched as parallel agents on disjoint file sets, D (layout) owned by the orchestrator (the user named layout the "contrived/overfit" surface — kept in one hand).

- **Lane A — W5 a11y corrections.** SpectrumCanvas `role="slider"` → `role="img"` + reactive `:aria-label`; SwatchHoverMenu hover panel `role="toolbar"` → `aria-hidden`; PaletteCardGrid `role="list"`; 3 redundant GradientVisualizer SelectTrigger aria-labels removed. Commit `bda38b6`.
- **Lane B — reduced-motion carve-out.** `animations.css` gains an overlay opacity-fade carve-out after the global guard (reka-ui `[data-state]` overlays keep a 150ms opacity fade). Commit `2a13de3`.
- **Lane C — phantom retirement.** `floating-panel-item` stripped from 6 sites (zero CSS rule — invariant 32/33 corpus-grep proof); `--animation-slide-md` phantom token (undefined, invalidated PaletteCard's `.rename-slide` transform) replaced with the literal `0.5rem`; Markdown `rounded-2xl` documented as content-element exceptions. `audit/B.W1-floating-panel-item.md` is value.js's retired-class/token registry. Commit `e7da1b5`.
- **Lane D — layout transposition (Bβ Proposal B).** `--dock-pos` + `--layout-padding` deleted (9 → 7 layout tokens); `.app-layout` grid → flex column; the `--dock-pos` fold-back gone. Commit `ff6354d`.

### Gate

Wave closes on the conjunction of the 4 sub-gates A–D + the layout-class Playwright probe. Probe: 4 viewports (375×667 / 1280×720 / 1280×800 / 2520×1080) × light+dark, **0 console errors, 0 stale-prop warnings**; dock pins at `--dock-inset` (16px mobile / 8px desktop) on every viewport — 0 drift from the W4 baseline at standard viewports, and the one accepted Proposal-B delta at 21:9 (dock at 8px vs the old ~173px float). `vue-tsc` 243 (unchanged); `vitest` 1409. Captures in `audit/B.W1-layout/`.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| B.W0 HEADLINE — close A + precept advance | closed | 2026-05-19 | 2026-05-19 | de8c573, 7088da4, 5247313, 36a4ad0, 065c6fe, a9b6a94 |
| B.W1 — W5 a11y corrections + reduced-motion + floating-panel-item strip + layout simplification | closed | 2026-05-19 | 2026-05-19 | bda38b6, 2a13de3, e7da1b5, ff6354d |
| B.W2 — component consolidation (usePaneRouter transposition) + hero-lab + UnderlineTabs | planned | — | — | — |
| B.W3 — library gap audit + WIP disposition + custom typecheck + e2e abrogation | planned | — | — | — |
| B.W4 HEADLINE close — FINAL.md, doc drift, Q.md update, A close-residuals | planned | — | — | — |

## Open dependencies

- B.W0 inherits A.W6's conditional dependency on glass-ui shipping the metaballs/aurora APIs. Re-verified at Q close (`coordination/Q.md §2a`, 2026-05-19): still NOT shipped at glass-ui's closed HEAD `4b16de7`. B.W0 executes the formal re-scope per `A.md §9` — names the successor (glass-ui successor tranche + value.js successor) and records in `audit/W6-deferred.md`. Q being closed means the successor is a *future* glass-ui tranche, not a wave of the in-flight Q.
- The 7 standing glass-ui §3 primitive/blob gaps (`coordination/Q.md §2a, §3`) — NOT SHIPPED at Q close; route to a glass-ui successor tranche; no B wave blocks on them.
- The A↔Q contested boundary — **resolved/MOOT**. Q closed without writing value.js (`coordination/Q.md §4`). B.W4 records the closed-state in FINAL.md.
- `docs/precepts` pin: B opens at `3310a8c`; glass-ui Q.W6 advanced the shared submodule to `3c32fae`. **B.W0 Lane 0 advances value.js's pin to `3c32fae`**; B.W4 pins it in FINAL.md.
