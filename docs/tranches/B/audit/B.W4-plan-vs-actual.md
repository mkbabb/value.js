# B.W4 close-audit — Lane 1: plan-vs-actual

**Scope**: tranche B, every wave's planned scope (`B.md`, `waves/B.W0..B.W4.md`, `findings.md`) against what landed in git and the working tree.
**Mode**: read-only. Git read-only; no mutations.
**Date**: 2026-05-19.
**Branch audited**: `w.w2.1-value-js-prebuild` (B execution branch; HEAD `31da0d6`).

## §1 — Per-wave plan-vs-actual

| Wave | Planned headline | Actual / commits | Verdict |
|---|---|---|---|
| **B.W0 HEADLINE** | Close A — precept advance to `3c32fae`, commit A.W5, execute/re-scope A.W6, A.W7 close + A's `FINAL.md`. | Lane 0 precept advance `de8c573`; A.W5 a11y `7088da4` + animation `5247313` + close `36a4ad0`; A.W6 formal re-scope `065c6fe` (`audit/W6-deferred.md` exists); A.W7 close `a9b6a94` (`A/FINAL.md` exists, cites every A commit + `3c32fae`); B.W0 close-doc `40609ce`. A's wave-log shows **zero `planned`** rows; all 8 A wave rows `closed`. All 6 cited hashes resolve and match their subject lines. | **MATCH** |
| **B.W1** | W5 a11y corrections + reduced-motion overlay carve-out + `floating-panel-item` strip + layout transposition (Bβ Proposal B). | Lane A `bda38b6`; Lane B `2a13de3`; Lane C `e7da1b5`; Lane D `ff6354d`; close-doc `5db9746`. `--dock-pos` gone (`style.css:25` explicitly documents "no `--dock-pos` formula"; `:54` "7 — B.W1 dropped `--dock-pos` and `--layout-padding`"). `floating-panel-item` corpus-grep over `demo/` + `src/` returns zero callsites. SpectrumCanvas now `role="img"` with reactive label (SpectrumCanvas.vue:3-6). | **MATCH** |
| **B.W2** | Component consolidation — `usePaneRouter` transposition + hero-lab + UnderlineTabs migration. | Lane B hero-lab `9091e12`; Lane C UnderlineTabs `c2efa83`; Lane A regression-fix `fa57f02` + consolidation `4fde60e`; close-doc `d36ff5d`. `usePaneRouter.ts` present and consumed by `demo/color-picker/App.vue:102,168`. `git ls-files \| grep -E 'DockMainLayer\|useMobilePaneRouter\|useDesktopPaneRouter\|useDockLayers\|useAtmosphere\|useGenericActionBar'` returns **empty**. `4fde60e` deletes 21 files (7 consolidation/component + 3 `ui/alert` SFCs + 11 `ui/table`). Lane C re-filed (not migrated) — recorded disposition, see §2 row F. | **MATCH** (see Discrepancy D2 — headline says "UnderlineTabs migration", actual is a recorded non-migration) |
| **B.W3** | value.js library gap audit + `src/` WIP disposition + typecheck cluster + e2e abrogation. | Lane A audit `7b6b473`; Lane B WIP `8d6dfac`; Lane C typecheck `92ee51f`; Lane D e2e `afe102a`; close-doc `31da0d6`. `e2e/smoke/` holds exactly 3 specs; root `e2e/*.spec.ts` count **0**; `playwright.config.ts` has `smoke`, no `mobile`. `8d6dfac` commits the 5 untracked `src/` WIP files + 3 modifications + `plugins/vite-source-export.ts` + `package.json` — working tree clean of untracked `src/**.ts`. vue-tsc 212→126 (commit msg "-86" = the 86 custom-bucket errors cleared; consistent with PROGRESS). | **MATCH** |
| **B.W4 HEADLINE close** | Strengthened close — `FINAL.md`, doc drift, `Q.md` update, A close-residuals. | **OPEN** — this is the running ceremony. `docs/tranches/B/FINAL.md` not yet written; CLAUDE.md still reads "1372 tests, 24 files" (B.W4 doc-drift item); A research dir still `Aa/Ab/Ad/Ae/Ag` (B.W4 rename task pending). | **OPEN (expected)** |

All four closed waves followed the linear critical path W0→W1→W2→W3. Every commit hash cited in `PROGRESS.md` resolves via `git show` and its subject line matches the wave-log description.

## §2 — Findings disposition (`findings.md §2` rows A–N)

| Row | Finding | Claimed wave | Landed evidence | Verdict |
|---|---|---|---|---|
| A | A.W5 uncommitted; A.W6/W7 unrun | B.W0 | `7088da4`/`5247313`/`36a4ad0` (W5), `065c6fe` (W6 re-scope), `a9b6a94` (W7 close). `A/FINAL.md` exists; A wave-log zero `planned`. | LANDED |
| B | `--dock-pos` centring fold-back | B.W1 | `ff6354d`; `style.css` carries 7 layout tokens, `--dock-pos`/`--layout-padding` gone; grep over `demo/`+`src/` zero. | LANDED |
| C | 4 W4 over-fits + wider pane-surface | B.W2 | `4fde60e`; `usePaneRouter.ts` present + consumed; 6 target composables/components deleted (grep empty). | LANDED |
| D | W5 a11y over-reaches | B.W1 | `bda38b6`; SpectrumCanvas `role="img"` confirmed (SpectrumCanvas.vue:6). | LANDED |
| E | `floating-panel-item` phantom class | B.W1 | `e7da1b5`; corpus-grep zero callsites; `audit/B.W1-floating-panel-item.md` registry exists. | LANDED |
| F | `UnderlineTabs` shipped standalone | B.W2 → re-filed | `c2efa83` is a `docs(...)` commit — Lane C verified glass-ui `<UnderlineTabs>` is header-only, **decided not to migrate**; `.underline-tabs` override kept; gap re-filed to glass-ui. `findings.md` row F itself records this named cross-repo destination + `audit/B.W2-underline-tabs.md §9`. | LANDED (recorded re-file — invariant-B5 valid; see D2) |
| G | 16-spec Playwright suite | B.W3 | `afe102a`; root `e2e/*.spec.ts` = 0; `e2e/smoke/` = 3 specs; `playwright.config.ts` smoke/no-mobile; brittleness-lane dissent override recorded. | LANDED |
| H | Mandate 12 AND — `src/` library never audited | B.W3 | `7b6b473` (`audit/B.W3-library-gap.md` exists); `8d6dfac` dispositions the 5 WIP files. | LANDED |
| I | hero-lab — 31 type errors, 4 RAF loops | B.W2 | `9091e12` touches 9 `demo/hero-lab/` files; commit msg "-31 type errors, prefers-reduced-motion on 4 RAF loops". | LANDED |
| J | Doc drift + A close-residuals | B.W4 | B.W4-owned; **not yet executed** (ceremony in flight — CLAUDE.md still 1372/24, research dir un-renamed). | PENDING B.W4 (on schedule) |
| K | glass-ui Q closed; precept advance `3310a8c`→`3c32fae` | B.W0/W1/W3/W4 | `de8c573` advances the pin; `git -C docs/precepts` pin verified at `3c32fae` per PROGRESS. B.W4 portion (FINAL.md pin) pending. | LANDED (B.W4 portion pending, on schedule) |
| L | B's own apparatus bloat (6 waves, 22 docs, 5 gate tiers) | plan | Applied to the substrate pre-execution: 5 waves shipped (W0–W4); gate model 3 tiers in `B.md §6`. | LANDED (planning-time) |
| M | value.js↔keyframes.js parity | B.W3/W4 | `7b6b473` Lane A records K1–K5 dispositions in `audit/B.W3-library-gap.md`; K4 Prettier-doc gap is B.W4-owned (pending). | LANDED (K4 pending B.W4, on schedule) |
| N | A.W7 close-audit fold-ins (N1–N5) | B.W1/W2/W4 | N1 `ui/alert/` → glass-ui re-export (`index.ts` confirmed re-exports `@mkbabb/glass-ui`, 3 SFCs deleted in `4fde60e`); N2 dead `ui/table/` barrel deleted in `4fde60e` (11 files); N3 `--animation-slide-md` stripped in `e7da1b5`; N4 routed with `audit/W6-deferred.md`; N5 14 doc-drift items → B.W4 (pending). | LANDED (N5 pending B.W4, on schedule) |

**No silently dropped finding.** Every row A–N either landed with a commit hash, is owned by the still-open B.W4 ceremony, or carries a recorded named destination (rows F, K-cross-repo, N4). Row F's "re-file" is explicitly recorded in `findings.md` itself and in `audit/B.W2-underline-tabs.md §9` — it satisfies invariant B5 (named cross-repo destination), not a deferral.

**N2 note (not a discrepancy, an observation)**: `findings.md §2 N2` and `B.W2.md` Tier-1b name `chart`, `table`, `calendar` as dead-barrel deletion candidates "per the grep". `4fde60e` deleted only `ui/table/`. `ui/chart*` and `ui/calendar`/`range-calendar`/`v-calendar` remain in the tree. The wave spec wording is conditional ("for every barrel with a proven-zero consumer count, delete") — keeping a barrel with a live consumer is correct behaviour, and `audit/B.W2-consolidation.md` is named as the place the grep proof + deletion list is recorded. This is a verdict-recorded outcome, not a dropped finding; flagged here only so B.W4's `FINAL.md` can confirm the `audit/B.W2-consolidation.md` grep evidence backs the partial deletion.

## §3 — Discrepancies

Three discrepancies, all doc-drift class (no scope loss, no missing deliverable). The first is a concrete `PROGRESS.md` defect that B.W4's doc-drift lane should correct before B's `FINAL.md` is cut.

**D1 — `PROGRESS.md` wave-log carries stale duplicate `planned` rows.**
`docs/tranches/B/PROGRESS.md:180-184` — the wave-log table has B.W2 and B.W3 listed **twice**: once `closed` with commit hashes (lines 180-181) and again `planned` with em-dashes (lines 182-183), followed by the genuine B.W4 `planned` row (184). The duplicate rows 182-183 are a stale carry-over from the six-wave→five-wave hardening renumber and should be deleted; only B.W4 should remain `planned`. As written, the table self-contradicts (B.W2/B.W3 are both `closed` and `planned`). **B.W4 doc-drift fix**: delete `PROGRESS.md:182-183`.

**D2 — B.W2 headline wording vs actual UnderlineTabs outcome.**
`B.md §3` and `waves/B.W2.md` title both say "UnderlineTabs **migration**". The actual B.W2 Lane C outcome (`c2efa83`, a `docs(...)` commit) is a **decision not to migrate** — glass-ui's `<UnderlineTabs>` is header-only and cannot replace `PaletteDialog`'s reka-ui `<Tabs>` provider without an a11y regression; the gap was re-filed to glass-ui. This is a correct, evidence-backed outcome (recorded in `findings.md §2 F` and `audit/B.W2-underline-tabs.md §9`) — the *headline label* is simply stale relative to the landed decision. Not a scope loss; `findings.md` row F already documents the re-file. Optional B.W4 cosmetic fix: soften the headline to "UnderlineTabs disposition".

**D3 — `PROGRESS.md` wave-log omits the per-wave close-doc commits.**
The four `closed` wave-log rows (180-181 and the W0/W1 rows above them) cite only the lane commits. The per-wave close-documentation commits — `40609ce` (B.W0 close), `5db9746` (B.W1 close), `d36ff5d` (B.W2 close), `31da0d6` (B.W3 close) — are real commits on the branch but absent from the wave-log Commits column. The wave-prose sections do describe each close, so this is incomplete citation rather than a missing artefact. B.W4's `FINAL.md` should cite the full commit set including the close-docs.

**Items checked and found clean (no discrepancy):**
- All 18 lane commit hashes in `PROGRESS.md` resolve and match their descriptions.
- `A/FINAL.md` exists, cites every A wave's commits + the precept SHAs `3310a8c`/`3c32fae`.
- A's wave-log shows zero `planned` rows.
- B.W0 headline: `A/FINAL.md` + `audit/W6-deferred.md` both exist.
- B.W1 headline: `--dock-pos` and `floating-panel-item` both fully gone (corpus-grep zero).
- B.W2 headline: `usePaneRouter.ts` exists and is consumed; the 6 target composables/components fully deleted.
- B.W3 headline: `e2e/smoke/` has exactly 3 specs; root `e2e/*.spec.ts` zero; `src/` WIP committed.
- `e2e/smoke/` specs carry no `lucide`/`page.evaluate(`/`waitForTimeout` selectors (grep clean).

## §4 — Verdict

Tranche B's four closed waves (B.W0–B.W3) landed their planned headline deliverables in full; every cited commit resolves and matches; every `findings.md` row A–N either landed with a commit hash or is owned by the open B.W4 ceremony or carries a recorded named destination — **zero silently dropped findings**. Three doc-drift discrepancies surfaced, all correctable inside B.W4's doc-drift lane; the only concrete defect is **D1**, the self-contradicting duplicate `planned` rows at `PROGRESS.md:182-183`. The plan-vs-actual audit passes.
