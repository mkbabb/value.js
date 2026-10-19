
#### Act 1 · `.t` r2 alpha leg by the §0ev.1 protocol (C3-5) — GREEN ×2
Instrument `q/alpha-31.spec.ts` under `q/playwright.q.config.ts`: the alpha leg of `e2e/smoke/w12u-p-drag.spec.ts` restated without touching that spec (same boot, same 2000 ms there-and-back path over 8 % → 92 % of the slider, the same CDP profiler at 200 µs and timeline trace through every drag, 400 ms rest; helpers imported from `e2e/smoke/perf/frame-budget.ts` and `real-gpu.ts`). The one difference is that it drags alpha N times where the committed spec drags surface, L, a, b once before it. ≥ 31 drags, more in blocks of 10 up to 101 while the bootstrap bound straddles the budget; per drag p50 and p95 of the rAF deltas; the statistic is the **median over drags** with a seeded (mulberry32) percentile bootstrap of that median, 10 000 resamples. The gate is stricter than the spec's single read: median ≤ budget AND the 97.5th-percentile bound ≤ budget, for both p50 (≤ T + 1 ms) and p95 (≤ 2·T + 1 ms).

⟨`Q_ALPHA_OUT=q/results/alpha-rN.json npx playwright test --config q/playwright.q.config.ts`⟩ (renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` asserted in the test; real Chrome new-headless; mirror `:9141`); figures read from `results/alpha-r{1,2}.json` and again from `logs/alpha-r{1,2}.log.txt`, identical:

| run | load start → end | drags | T | budget p50 / p95 | p95 median · u95 · u97.5 (min–max) | p50 median · u97.5 (max) | drags over | long tasks | verdict |
|---|---|---|---|---|---|---|---|---|---|
| r1 15:47 | 144 → 114 | 31 | 16.70 | 17.70 / 34.40 | **16.80 · 16.80 · 16.80** (16.7–16.8) = 1.006 T | 16.70 · 16.70 (16.7) | 0 / 31 | 0 | **GREEN** |
| r2 15:49 | 111 → 117 | 31 | 16.70 | 17.70 / 34.40 | **16.80 · 16.80 · 16.80** (16.7–16.8) = 1.006 T | 16.70 · 16.70 (16.7) | 0 / 31 | 0 | **GREEN** |

62 drags, none over either budget, no long task, 45–61 pointer moves and 121–129 frames per drag. `.t`'s r2 reading (alpha p95 116.6 ms, 12 long tasks, 26 moves, load 73) does not reproduce at load 111–144: it was one starved drag, as `.t` read it. **C3-5 is closed.** The bound did not straddle, so no round past 31 was owed.

#### Act 2 · typecheck · lint — GREEN ×2
⟨`npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit; npx tsc -p tsconfig.e2e.json --noEmit`⟩ r1 (15:51, load 119, HEAD `2c9738567`) → `lib EXIT 0 · demo EXIT 0 · test EXIT 0 · e2e EXIT 0`; r2 (15:58, load 90, HEAD `b45cf83d4`) → the same four `EXIT 0` (`logs/typecheck-r{1,2}.log.txt`). ⟨`npx eslint . --max-warnings=0`⟩ r1 → `LINT EXIT 0` (15:52–15:58) · r2 → `LINT EXIT 0` (15:58–16:05) (`logs/lint-r{1,2}.log.txt`). Both over the working tree with the 11 orphan paths. They were read again after this unit's own edits (Act 7).
