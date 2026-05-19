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

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| B.W0 HEADLINE — close A | planned | — | — | — |
| B.W1 — W5 a11y corrections + reduced-motion refinement + floating-panel-item | planned | — | — | — |
| B.W2 — layout simplification (Bβ Proposal B) | planned | — | — | — |
| B.W3 — component consolidation (Bγ) + hero-lab + UnderlineTabs | planned | — | — | — |
| B.W4 — library gap audit + WIP disposition + custom typecheck + e2e abrogation | planned | — | — | — |
| B.W5 HEADLINE close — FINAL.md, doc drift, Q.md update, A close-residuals | planned | — | — | — |

## Open dependencies

- B.W0 inherits A.W6's conditional dependency on glass-ui shipping the metaballs/aurora APIs. Re-verified at Q close (`coordination/Q.md §2a`, 2026-05-19): still NOT shipped at glass-ui's closed HEAD `4b16de7`. B.W0 executes the formal re-scope per `A.md §9` — names the successor (glass-ui successor tranche + value.js successor) and records in `audit/W6-deferred.md`. Q being closed means the successor is a *future* glass-ui tranche, not a wave of the in-flight Q.
- The 7 standing glass-ui §3 primitive/blob gaps (`coordination/Q.md §2a, §3`) — NOT SHIPPED at Q close; route to a glass-ui successor tranche; no B wave blocks on them.
- The A↔Q contested boundary — **resolved/MOOT**. Q closed without writing value.js (`coordination/Q.md §4`). B.W5 records the closed-state in FINAL.md.
- `docs/precepts` pin: B opens at `3310a8c`; glass-ui Q.W6 advanced the shared submodule to `3c32fae`. **B.W0 Lane 0 advances value.js's pin to `3c32fae`**; B.W5 pins it in FINAL.md.
