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

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| B.W0 HEADLINE — close A | planned | — | — | — |
| B.W1 — W5 a11y corrections + reduced-motion refinement + floating-panel-item | planned | — | — | — |
| B.W2 — layout simplification (Bβ Proposal B) | planned | — | — | — |
| B.W3 — component consolidation (Bγ) + hero-lab + UnderlineTabs | planned | — | — | — |
| B.W4 — library gap audit + WIP disposition + custom typecheck + e2e smoke | planned | — | — | — |
| B.W5 HEADLINE close — FINAL.md, doc drift, Q.md update, A close-residuals | planned | — | — | — |

## Open dependencies

- B.W0 inherits A.W6's conditional dependency on glass-ui shipping the metaballs/aurora APIs. Verified at B open (`coordination/Q.md §2`): NOT shipped at glass-ui HEAD `888d227`. B.W0 executes the formal re-scope per `A.md §9` — names the successor (glass-ui successor tranche + value.js successor) and records in `audit/W6-deferred.md`.
- The 8 standing glass-ui §3 gaps (`coordination/Q.md §3`) — filed; no B wave blocks on them.
- The A↔Q contested boundary (`A coord §0-1`) — Q.W1 Lane C + Q.W2 Lane B never deleted from Q's plan; no response recorded. B.W5 logs the latest state at close.
- `docs/precepts` pin (3310a8c). If Q.W5 advances precepts during B, B.W5 acknowledges the new SHA.
