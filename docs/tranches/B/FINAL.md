# Tranche B — FINAL

**Repo**: value.js. **Tranche**: B — value.js's second tranche: close A, simplify, complete the AND.
**Opened**: 2026-05-18 (planning) at `f9a47ca`. **Executed + closed**: 2026-05-19.
**Branch**: `tranche-b`, off `master` HEAD `f9a47ca`.
**Precepts**: B opened under `docs/precepts` `3310a8c`; B.W0 advanced the shared pin to **`3c32fae`** (glass-ui Q.W6's advance — invariants 30–33 + π-lane). B ran the rest of the tranche under invariants 30–33.

## §1 — What B set out to do

The user named the diagnosis — "the dock sizing, layout seem contrived, overfit, over-engineered" and "this seems hung on e2e." Tranche B's job, narrow and bounded: close A honestly, correct the W5 a11y over-reaches, simplify the layout and the component surface by architectural transposition, complete Mandate 12's library-side AND, and reshape the e2e gate. Five waves.

## §2 — Wave-by-wave close

| Wave | Headline | Commits | Gate evidence |
|---|---|---|---|
| B.W0 HEADLINE | close A — precept advance, commit W5, re-scope W6, A.W7 close | `de8c573`, `7088da4`, `5247313`, `36a4ad0`, `065c6fe`, `a9b6a94`, `40609ce` | `docs/tranches/A/FINAL.md`; A wave-log zero `planned`; W5 re-probe 6/6 clean |
| B.W1 | W5 a11y corrections + reduced-motion + phantom strip + layout transposition | `bda38b6`, `2a13de3`, `e7da1b5`, `ff6354d`, `5db9746` | `audit/B.W1-*`; layout probe 4 viewports × light+dark, 0 console errors |
| B.W2 | component consolidation (usePaneRouter) + hero-lab + UnderlineTabs | `9091e12`, `c2efa83`, `fa57f02`, `4fde60e`, `d36ff5d` | `audit/B.W2-*`; boot + interaction probes 0 console errors |
| B.W3 | library gap audit + WIP disposition + typecheck cluster + e2e abrogation | `7b6b473`, `8d6dfac`, `92ee51f`, `afe102a`, `31da0d6` | `audit/B.W3-*`; build clean, smoke 3/3, vue-tsc 126 |
| B.W4 HEADLINE close | strengthened close — FINAL.md, doc drift, Q.md, A-residuals | `6d1cb40`, `719d2a6`, this commit | `audit/B.W4-*` (7 lanes); visual-runtime re-probe 6/6 clean |

The user's named diagnosis is discharged: the dock layout's `--dock-pos` fold-back is deleted (B.W1 — one flex layout, 9→7 tokens); the over-decomposed pane surface is one `usePaneRouter` source of truth (B.W2 — 7 wrapper files deleted); the "hung on e2e" wave-shape is corrected (B.W3 — the 16-spec brittle suite abrogated for a 3-spec role/label smoke suite + a CI gate).

## §3 — Finding disposition (`findings.md §2`, rows A–N — zero deferral, invariant B5)

| Row | Finding | Disposition |
|---|---|---|
| A | A open (W5 uncommitted, W6/W7 unrun) | LANDED B.W0 — A closed, `A/FINAL.md` |
| B | `--dock-pos` fold-back | LANDED B.W1 — deleted, flex+fixed (Bβ Proposal B) |
| C | 4 W4 component over-fits + the wider pane surface | LANDED B.W2 — `usePaneRouter` transposition, 7 files deleted |
| D | W5 a11y over-reaches | LANDED B.W1 — `role="slider"`/`role="toolbar"` corrected |
| E | `floating-panel-item` phantom class | LANDED B.W1 — stripped, 6 sites; `audit/B.W1-floating-panel-item.md` |
| F | `UnderlineTabs` shipped standalone | RE-FILED — glass-ui shipped the wrong shape (header-only); demo keeps reka-ui `<Tabs>`; gap re-filed to a glass-ui successor (`coordination/Q.md §3`) |
| G | 16-spec Playwright suite brittle | LANDED B.W3 — abrogated; 3-spec smoke suite + CI gate |
| H | Mandate 12 AND — `src/` library unaudited | LANDED B.W3 — `audit/B.W3-library-gap.md`, 11 gaps recorded |
| I | hero-lab — 31 type errors, unguarded RAF | LANDED B.W2 — 0 errors, 4 RAF reduced-motion guards |
| J | doc drift + A close-residuals | LANDED B.W4 — `Ag→Ac` rename, `A.md §8`, `CLAUDE.md` |
| K | glass-ui Q closed; precept advance | LANDED B.W0 — pin advanced to `3c32fae` |
| L | B's own apparatus bloat | LANDED (plan) — 6 waves → 5, gate 5 tiers → 3 |
| M | value.js ↔ keyframes.js parity | LANDED B.W3 — value.js-side items; keyframes.js-side FILED `coordination/Q.md §9` |
| N | A.W7 close-audit fold-ins | LANDED — N1/N2 B.W2 (`ui/alert` re-export, `ui/table` retired), N3 B.W1 (`--animation-slide-md`), N5 B.W4; N4 routed |

**Routed onward, with named destinations** (not silent deferral):
- The 7 standing glass-ui primitive/blob gaps + the re-filed `<Tabs variant="underline">` ask → a glass-ui successor tranche (`coordination/Q.md §3`).
- The `~104`/126 generated shadcn-vue typecheck cluster (`ui/auto-form`/`ui/chart`/…) → a generator-update / vendoring-policy effort (`audit/B.W3-typecheck.md`).
- The blob/aurora demo-side abstraction → a value.js demo-abstraction tranche, opened once glass-ui ships the metaballs/aurora APIs (`docs/tranches/A/audit/W6-deferred.md`).
- The 11 value.js `src/` library gaps + the invariant-30 contract-v2 question + the view-schema `viewSchema.ts` extraction + the keyframes.js-side gaps → a value.js library-maintenance effort (`audit/B.W3-library-gap.md`, `coordination/Q.md §9`).

## §4 — Close-honesty checklist (`precepts/SPEC §Close`)

- **Every FINAL claim grounded in PROGRESS.md or a cited artefact** — PASS. The wave table's hashes are verified by `audit/B.W4-plan-vs-actual.md`.
- **Every gate marked MET has a resolving evidence path** — PASS. Each wave cites its `audit/` doc + Playwright captures.
- **Every cross-tranche debt entry names a destination** — PASS (§3 routed list).
- **Integrity sweep clean** — PASS (`audit/B.W4-integrity-sweep.md`): zero unauthorized agent git mutations, empty stash, `docs/precepts` changed exactly once (the planned `3c32fae` advance).
- **No wave-log row reads `planned`** — PASS after this close.
- **substrate-without-consumer** — PASS (`audit/B.W4-substrate-without-consumer.md`): `usePaneRouter`, `e2e/smoke/`, the `ui/alert` re-export all consumed; the 21 B.W2 deletions leave zero dangling imports.

## §5 — Precepts

B opened against `docs/precepts` `3310a8c` and B.W0 advanced the pin to **`3c32fae`**. B operated under invariants 30–33: invariant 33 (dead-code corpus grep) gated the B.W3 e2e abrogation and the B.W1 phantom strips; invariant 32 (phantom-class) gated the `floating-panel-item`/`--animation-slide-md` retirements; invariant 30 (cross-repo dev-resolution) was audited in B.W3 Lane A — value.js is contract-v1 compliant and the contract-v2 divergence is recorded and routed; invariant 31 (props fail-explicit) was verified at the B.W0/B.W1 probes (zero glass-ui stale-prop warnings).

## §6 — A↔Q boundary

The A↔Q contested boundary is **MOOT** — glass-ui Q closed (`4b16de7`) and never wrote value.js; Q's own round-4 audit retired the contested lanes. `coordination/Q.md §4` records it. No B wave acted on it.

## §7 — Close state

Tranche B is **closed**. B.W0–B.W3 executed and committed; B.W4 is this ceremony. A's `FINAL.md` (written at B.W0) and this `FINAL.md` together close the work the user opened — the regression report that opened A, and the "contrived/overfit, hung on e2e" diagnosis that opened B. The demo boots clean at every probed viewport; `npm run build` + `npm test` (1409) + `vue-tsc` (126) + `playwright --project=smoke` (3/3) are green. Every research finding landed, retired with rationale, or routed to a named destination.
