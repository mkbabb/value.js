# PI-1 — the per-wave Lighthouse delta ledger (Q14 PERF REDEMPTION tracking instrument)

**Opened**: T.W0 (2026-07-10) · **Gate item**: T.W0 §Hard gate 7 / Q14
(RATIFICATION-2026-07-09 §1).

## What this is (and is NOT)

Q14 was RULED **"Accept no failures — divine a proper and idiomatic fix. No
compormises."** — the honestly-red Lighthouse LCP/TBT budgets are now
**must-go-green-by-close HARD GATES**. No re-baseline, no preset-swap, no
deferral; the cure is architectural and idiomatic (the reveal / hydration /
payload chain — the W2 overture's LCP reveal-only law, the L20 / GAP-L5 payload
landings at W7, dead-payload abrogation, font / KaTeX delivery), **never a gate
edit**.

This ledger is the **TRACKING instrument for that gate** — NOT a deferral
record. Every richness wave re-runs LHCI and records the delta (up OR down)
against the baseline below. The named gate rows (W2 / W7 / W9) are the
adjudication points; W9 closes ONLY with green budgets or a **triumvirate-level
owner escalation naming the physical blocker**.

## The budgets (fixed — never edited here)

| Metric | Budget | Source |
|--------|--------|--------|
| LCP | ≤ **2500 ms** | §6.2 / lighthouserc |
| TBT | ≤ **300 ms** | §6.2 / lighthouserc |

## The noise rule (PP-10)

Run-to-run spread is **large** (the baseline's own TBT samples span 5618 → 6593;
the prior run 28833754238 read TBT 4170.5). **Treat any single-run delta < ~30%
as noise** — a real movement is a sustained multi-sample shift or a > 30% swing,
not one lucky/unlucky run. Record the 3-sample spread, not just the median, so a
noise-vs-signal call is auditable.

## The ledger

| Wave | Run (id / sha) | LCP (ms) | TBT (ms) | Δ vs baseline | Notes |
|------|----------------|----------|----------|---------------|-------|
| **W0 baseline** | 28836873580 / `80c5888` (2026-07-07) | **5563** (7340/5653/5563) | **5618** (5618/6029/6593) | — | HONESTLY RED — LCP ~2.2× over, TBT ~19× over. No gate weakened. Prior run 28833754238/`29ea8ac`: LCP 5098 / TBT 4170.5 (variance context). |
| **W1 (restructure)** | [29099567050](https://github.com/mkbabb/value.js/actions/runs/29099567050) / `9cc1949` (2026-07-10) | **5500** (6367/5500/5514) | **5858** (9552/6482/5858) | LCP −1.1% · TBT +4.3% (both < the PP-10 30% bar = NOISE) | **NOT a named gate row** — recorded per the integrator W1 delta (Q1 restructure). The colocation restructure is chunk-graph-neutral: O-23 no-blast (eager JS −0.09%, demo total −0.13%, no lazy→eager promotion), the demo dogfoods the SAME published subpaths, zero eager payload moved. So the expectation is FLAT vs the W0 baseline. **3-sample spread APPENDED at round-2 integration** (the LHCI job completed; bold = the LHCI optimistic/min assertion value, parenthetical = the 3 runs in order): both deltas read as NOISE around the baseline — a restructure that moved no eager payload, exactly as priced. Not a cure, not a regression. |
| **W2 (gate)** | local-lab LHCI 0.15.1 ×3 / W2-close tree (branch `worktree-wf_5011a3ae-57c-1`, unpushed at close — the same-instrument CI run rides the merge; recorded, never silently deferred) | **4919** (5812/4907/4919) | **125** (2152/105/125) | LCP ~−12% vs baseline (cross-INSTRUMENT caveat: Apple M5 Max vs the CI runner; below the PP-10 30% bar on its own). TBT NOT comparable (CPU class; the cold run-1 2152 shows the eager-parse cliff). | **MEASURED + ATTRIBUTED** (gate 8, `pi/w2/w2-close-artefacts.md §4`): the reveal-only law's SAME-instrument before/after = O-24 built-bundle **light 2484→2128ms (−14%)**, dark 1332→1476 (lab floor); LCP identity converged (the picker plate, both schemes, opacity pinned 1). Named cures landed: reveal-only law · the Google-Fonts strike (0 cross-origin font requests) · hydration-first. **What remains is the PAYLOAD half**: FCP ≈ 4353 ≈ the LCP floor — the ONE eager-payload mount task (RP-2 / the O-5 spike leg, `test.fail()` standing) gates first paint → the W7 row (L20/GAP-L5, dead-payload abrogation). Budgets stay honestly RED — measured, named, routed; no re-baseline. |
| **W2/W3 (CI gate — same-instrument confirm)** | [29131814948](https://github.com/mkbabb/value.js/actions/runs/29131814948) / `ba0706e` (2026-07-11) | **5151** (6138/5152/5151) | **4223** (8740/4223/6431) | LCP −7.4% (NOISE) · TBT: the 4223–8740 spread IS the eager-parse-cliff variance (optimistic-min −25%, median +14%) — both < the PP-10 30% signal bar | **THE SAME-INSTRUMENT CI RUN THE W2 ROW PROMISED** ("the same-instrument CI run rides the merge") — now measured on the CI runner (the baseline `28836873580`'s own instrument class, so the cross-instrument caveat that qualified the local-lab W2 numbers is GONE; this is the apples-to-apples read). State = the round-2 integration head (W2 boot/overture + W3 material-ladder/ink/shadow all merged). W2's landed cures stand (reveal-only law · the Google-Fonts strike — 0 cross-origin font requests · hydration-first); **W3 is eager-payload-neutral** (render-blocking CSS +0.5 KiB gz from the ladder/seat/ink tokens — 86.6→87.1 KiB, 32.9 headroom; `ink.ts`/`ShadowPalette` are boot-composable/component-lazy, not eager-mount payload). **The read**: both budgets stay honestly RED (LCP ~2.1× over at 5151; TBT 14–29× over across the 3 runs, dominated by the eager-parse cliff — run-1 8740 vs the 4223 optimistic, the SAME cold-parse spike the W2 local-lab run-1 2152 and the baseline's own 5618→6593 TBT spread show). The deltas vs baseline are NOISE (PP-10, < 30%): the reveal-only law's LCP-identity cure (proven same-instrument **−14%** at W2 close) cannot move the CI LCP floor while FCP ≈ 4.3s (the eager-payload mount) gates first paint — that is the W7 PAYLOAD half, not a W2/W3 regression. **Gate 8 (the W2 LCP-contribution) is SATISFIED by this measured close** — an unmeasured close would have REDDENED it. The payload half (RP-2 / the O-5 spike leg, still `test.fail()`; L20/GAP-L5 / dead-payload abrogation) is UNLANDED → the W7 gate row; budgets stay honestly RED — measured, named, routed, no re-baseline. |
| _W7 (gate)_ | _pending_ | _—_ | _—_ | _—_ | **GATE ROW**: the payload landings' TBT / JS-eager deltas (L20 / GAP-L5 / dead-payload abrogation named). Measured at W7 close. |
| _W9 (close)_ | _pending_ | _—_ | _—_ | _—_ | **CLOSE GATE**: budgets GREEN (LCP ≤ 2500 · TBT ≤ 300) **or** a triumvirate-level owner escalation naming the physical blocker. No re-baseline / preset-swap / deferral. |

## Append protocol

Each subsequent wave gate appends its row here (never rewrites the baseline).
Record: the run id + built sha, the median + 3-sample spread for LCP and TBT, the
signed Δ vs the W0 baseline, and a one-line notes cell naming the idiomatic cure
that wave landed (or why the number moved). A wave that re-runs LHCI without a
richness landing still records its row (drift is signal too).

## Provenance

Baseline + budgets + variance context: `audit/lanes/t-ci-lighthouse-record.md`
§Lighthouse record. Q14 ruling: `audit/RATIFICATION-2026-07-09.md §1` (Q14 row) +
`waves/T.W0.md` §Hard gate 7 + the Rider (Lighthouse disposition). Gate
propagation (W2 / W7 / W9): §6.2 cascade 2.
