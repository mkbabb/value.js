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
| **W1 (restructure)** | [29099567050](https://github.com/mkbabb/value.js/actions/runs/29099567050) / `9cc1949` (2026-07-10) | _run in-flight_ | _run in-flight_ | _~flat (expected)_ | **NOT a named gate row** — recorded per the integrator W1 delta (Q1 restructure). The colocation restructure is chunk-graph-neutral: O-23 no-blast (eager JS −0.09%, demo total −0.13%, no lazy→eager promotion), the demo dogfoods the SAME published subpaths, zero eager payload moved. So the expectation is FLAT vs the W0 baseline. LCP/TBT 3-sample spread appended when the LHCI job completes; the noise rule (PP-10, >30% = signal) applies — a restructure that moves no eager payload should read as noise around the baseline, not a cure and not a regression. |
| _W2 (gate)_ | _pending_ | _—_ | _—_ | _—_ | **GATE ROW**: the overture's LCP contribution, measured at W2 close, attributed against this baseline (§6.2 cascade 2). The W2 overture's LCP reveal-only law is the first idiomatic cure — an unmeasured W2 close is RED. |
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
