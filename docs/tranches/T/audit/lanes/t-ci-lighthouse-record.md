# T lane record — the deploy-fully chain + the first instrumented Lighthouse figures

**Lane**: OPERATIONAL fix lane, owner order "deploy fully" (the S close must reach
color.babb.dev). Executed 2026-07-07 (UTC). **Outcome: color.babb.dev serves the S
build in production** (CF Pages deployment `7573d1fb`, Environment=Production,
branch=master, source `80c5888`; assets `index-ByclGIr5.js` / `index-CftdUdfI.css`
verified live, byte-exact vs the build log). CI is **honestly red** on the genuine
CWV budget breaches below — no gate was weakened to ship.

## The five-layer peel (each a latent defect the previous layer masked)

Presenting symptom: three consecutive master CI runs CANCELLED at ~20.5 min
(28829168848, 28830166314, 28831415010); every downstream deploy-pages run
SKIPPED; the live site stale. The concurrency-collision hypothesis was
**disproven** (groups already distinct: `ci-${{ github.workflow }}-${{ github.ref }}`
vs `deploy-pages-<sha>`); deploy-pages starting at the cancellation minute was an
effect (workflow_run fires on `cancelled` too), not the canceller.

1. **Job-timeout canceller** — `be0a703`. `build-and-test` had
   `timeout-minutes: 20`; the S.W0 W0-2(a) smoke-safari (WebKit) step pushed both
   matrix jobs past 20:00 (killed mid-safari at exactly +20m; GitHub reports a
   timed-out job as "cancelled"). Fix: job 20→30 + per-step bounds on the two
   soft Playwright steps (full-smoke 8, smoke-safari 12) so a hang self-fails
   SOFT instead of consuming the job budget into a HARD timeout.

2. **LHCI collect ENOENT** — `29ea8ac`. First-ever execution of the W0-2b HARD
   Lighthouse gate crashed before measuring anything:
   `scandir <workspace>/dist/gh-pages` — the treosh action is a `uses:` step, so
   `defaults.run.working-directory` does not apply; LHCI resolves
   `staticDistDir` against CWD (the workspace root), one nested `value.js/`
   segment short (the R.W7 X3 nested checkout). Fix: workspace-relative
   `./value.js/dist/gh-pages`.

3. **INP auditRan-impossible assertion + upload hash** — `fcd4273`. INP is
   structurally unmeasurable in navigation-mode lab Lighthouse (no interactions
   occur): `auditRan` 0,0,0 across all runs — an error-level assertion that can
   only ever fail. Flipped to warn (TBT stays the HARD lab interactivity proxy);
   `LHCI_BUILD_CONTEXT__CURRENT_HASH: ${{ github.sha }}` added (the `uses:` CWD
   is not a git repo). Residual cosmetic: the "Saving URL map" phase still
   fails on its own git lookup; the median-LHR upload itself now succeeds.
   **Coda** — `0441aba`: the JSON comment-key idiom is NOT safe inside
   `ci.assert.assertions`; LHCI parsed the `"//interaction-to-next-paint"`
   comment key as a phantom audit assertion (error-level auditRan failure in run
   28836873580, beside — not changing — the genuine breaches). Removed; comment
   folded into the root `"//"` note.

4. **smoke-safari hangs in CI (bounded, soft, NOT fixed here — a T finding)**.
   `Running 4 tests using 1 worker` then **zero output for ~12 min** to the
   step-kill (same silhouette at 9m46+ in run 28831415010; never completed in
   any CI run). All safari specs have bounded timeouts (max `test.setTimeout(60_000)`
   in sustained-30s; 4–8s waits in mix-flow) + webServer bound 180s — a fully
   red suite must self-terminate < ~8 min WITH output, so the wedge is outside
   Playwright's test-timeout jurisdiction (WebKit browser/worker or
   server-readiness under CI software-GL; the config's own "Tearing down
   context exceeded the test timeout" note marks teardown-hangs as a known
   WebKit pattern). The W0-2 softness (`continue-on-error`) is intact and
   functioned — both matrix jobs green despite the kill. Consequence: the kill
   leaves **no playwright-report artifact**, so the step's
   surface-the-L1-aurora-defect purpose is currently defeated in CI.
   **T ask**: identify the wedge (add `--reporter=line` for progress
   visibility; consider the smoke-perf real-GPU-guard pattern). Do not raise
   the 12-min bound — it correctly contains a hang, not a slow suite.

5. **deploy-pages shipped PREVIEWS, never production** — `80c5888` (the
   false-success footgun). The CF Pages project `color`'s production branch is
   **`master`**; the workflow's `--branch=main` cut branch-alias **Preview**
   deployments (main.color-enw.pages.dev updated; production never moved).
   wrangler exits 0 and prints "Deployment complete" for previews, so every
   deploy run — **including the "green" R-close-era deploys** — went green
   while color.babb.dev stayed stale. `wrangler pages deployment list`
   evidence: the only Production deployment before the fix was `a2119a8d`
   (source `16129e0`) — a month old. Fix: `--branch=master` (must equal the
   project's production branch). Verified: deployment `7573d1fb`
   Environment=Production, and color.babb.dev + color-enw.pages.dev flipped to
   the S asset hashes within a minute.

## The T perf finding — first instrumented CWV figures (sits beside RP-2)

The W0-2b gate comment spoke of a "captured CWV baseline"; no capture ever
existed (the M5.2 zero-instrumented-runs gap). These are the **first** figures,
against the gh-pages artifact under LHCI defaults (emulated mobile + simulated
slow-4G/4x-CPU throttling, 3 runs, static serve):

Run **28836873580** (sha `80c5888`, 2026-07-07 — the run of record):

| Metric | Budget | Median/representative | All 3 runs | Verdict |
| --- | --- | --- | --- | --- |
| LCP | ≤ 2500 ms | **5563 ms** | 7340 / 5653 / 5563 | **FAIL ~2.2x** |
| TBT | ≤ 300 ms | **5618 ms** | 5618 / 6029 / 6593 | **FAIL ~19x** |
| Perf score | ≥ 0.5 (warn) | **0.36** | 0.30 / 0.36 / 0.36 | warn |
| INP | ≤ 200 ms (warn) | auditRan 0 | 0 / 0 / 0 | unmeasurable in nav-mode lab |
| CLS | ≤ 0.1 | — | — | **PASS** |
| a11y | ≥ 0.9 | — | — | **PASS** |

Prior run 28833754238 (`29ea8ac`) for variance context: LCP 5098, TBT 4170.5,
perf 0.41/0.41/0.40 — run-to-run spread is large (TBT 4170→6593), so treat
single-run deltas < ~30% as noise.

**Open adjudication for T**: the budgets are Google *field* CWV thresholds
applied to a *lab simulated-mobile* collection of a KaTeX+WebGL-heavy SPA — the
gate will stay red until either the artifact gets faster (TBT ~19x over is a
real payload/main-thread finding: `index-ByclGIr5.js` 601.6 kB + glass-ui
380.5 kB + vendor-katex 258.9 kB) or the budget/preset pairing is re-specified
(e.g. desktop preset, or lab-appropriate budgets). Re-baselining was
deliberately NOT done in this operational lane.

## Chain of record

- CI fix commits on master (path-scoped, sanctioned): `be0a703` → `29ea8ac` →
  `fcd4273` → `80c5888` → `0441aba`.
- Runs: 28832463506 (cancellation cured; exposed layer 2) → 28833754238
  (exposed layers 3+5's first figures) → 28836873580 (the run of record:
  build-and-test 22/24 + boot-smoke green; gh-pages red on LCP/TBT only).
- Deploys: 28836569824 (dispatch, still `--branch=main` → Preview `e75b90bd` —
  the false-success proof) → 28836880612 (dispatch post-fix → **Production
  `7573d1fb`**, live).
- The S ship used deploy-pages' **designed** `workflow_dispatch` manual lane
  (deploy-pages.yml header: "workflow_dispatch allows a manual re-ship") while
  CI stands red on the genuine budget record — no gate weakened. The
  workflow_run auto-deploy resumes the moment CI goes green (fix the TBT/LCP
  finding or adjudicate the budgets).
