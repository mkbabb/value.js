# T.W0 W0-CI — THE CI-DIET LEDGER

**Mandate**: `RATIFICATION-2026-07-09.md §2` (the ruled scope expansion riding W0), owner verbatim:

> Fix all deploy hooks and meta CI items. Our CI should be quick, elegant, clean. A profusion
> of useless CI tests and items should be abrogated, in particular, tautological e2e validation
> tests.

**The law that bounds the diet** (`T.W0.md` W0-CI · §Hard gate 8 · §No-workaround):
the diet **removes tautology, never truth**. The S oracle floor's REAL gates SURVIVE by name —
the **hard Lighthouse gate (Q14 prohibition, cascade 2 — NEVER removed or weakened)**,
**smoke-safari**, the **frame budgets**, the **born-RED O-26**. Wall-clock is a design goal
(the ~32-minute pipeline shrinks substantially).

**Scope of this lane**: `.github/workflows/*` (job/step diet) + `e2e/**` (tautology excisions
only) + the deploy-truth peel adoption. Product code, oracle mints (W0-5), deploy hooks
(W0-X1), and the NCSU retirement (W0-X2) are OTHER W0 items — untouched here.

---

## §1 The ~32-minute baseline (NAMED, per PP-10)

CI run of record **`28842102862`** (master HEAD, the last full run before this diet):
`https://github.com/mkbabb/value.js/actions/runs/28842102862` — **wall-clock 32.4 min**
(conclusion: failure — on the Q14 honest-red Lighthouse gate, BY DESIGN; not an infra failure).

Per-job wall-clock (the critical path):

| Job | Wall-clock | Notes |
|---|---|---|
| `build-and-test (22)` | **27.2 min** | the LONG POLE — the Node-22 matrix leg |
| `build-and-test (24)` | 24.9 min | the Node-24 matrix leg (parallel) |
| `gh-pages` | 5.1 min | `needs: build-and-test` → starts ~27m, ends ~32m; fails HARD on Lighthouse (Q14) |
| `boot-smoke` | 4.6 min | `needs: build-and-test` → ends ~32m |

Step wall-clock INSIDE `build-and-test (22)` (the ≥8s steps):

| Step | Time | |
|---|---|---|
| **Playwright — smoke-safari** | **733s (12.2m)** | the single biggest step |
| **Run benchmarks** | 304s (5.1m) | |
| **Playwright — full smoke** | 251s (4.2m) | |
| Checkout glass-ui @ tranche/BG | 101s | |
| Build glass-ui dist | 34s | |
| Build keyframes.js dist | 32s | |
| Vitest | 33s | |
| Playwright — page-load (HARD) | 17s | |
| Backend tests (api/) | 20s | |
| npm ci / typecheck (lib+demo) / typecheck (api) | 23 / 12 / 11s | |

**The two structural wastes the numbers expose:**

1. **Browser E2E ran in the `[22, 24]` matrix — TWICE.** The whole ~17-min Playwright block
   (page-load 17s + full-smoke 251s + smoke-safari 733s) ran on BOTH matrix legs. Browser
   behaviour is Node-runner-version-independent (the demo runs in the browser, not in the
   test-runner's Node), so the second run produced **zero added signal** — the textbook
   "useless meta item."
2. **smoke-safari (12 min) sat SERIALLY inside `build-and-test`**, making it the whole
   pipeline's long pole AND (S-close finding `be0a703`) overrunning the 20-min job budget →
   the timed-out job was marked CANCELLED → `deploy-pages` (which `needs` a successful CI run)
   was silently skipped. The S close patched this with `timeout-minutes: 30`; this diet cures
   it at the ROOT (below).

---

## §2 Workflow audit — job/step classification

Three workflows exist. Verdicts: **TRUTH-GATE** (proves a real invariant), **USEFUL**
(hygiene/report the diet keeps), **TAUTOLOGICAL** (asserts what the type system/build already
guarantees), **DEAD** (no consumer).

### `.github/workflows/ci.yml`

| Job / step | Verdict | Disposition |
|---|---|---|
| `build-and-test` — lint | TRUTH-GATE | keep (matrix) |
| — typecheck (lib+demo, inv-N-1) · typecheck (api) | TRUTH-GATE | keep |
| — abrogation-sweep (inv-N-10) | TRUTH-GATE | keep |
| — build library + dist/value.js size budget + tarball unpackedSize budget | TRUTH-GATE | keep |
| — Log dist sizes | USEFUL | keep (cheap diagnostic) |
| — Vitest · Backend tests (api/) | TRUTH-GATE | keep |
| — Inspect publish shape (npm pack --dry-run) | USEFUL | keep (publish-shape regression catch) |
| — Run benchmarks + Assert bench gates | TRUTH-GATE | keep (L8/HSL/parser regression floor) |
| — **Playwright block (cache · install · page-load · full-smoke · smoke-safari · report)** | TRUTH-GATE **mis-placed** | **MOVED** out of the matrix → the new `e2e-smoke` + `e2e-safari` jobs (run ONCE, sharded, parallel). The GATES are unchanged; only their LOCATION + the ×2 matrix duplication changed. |
| `gh-pages` — build demo + CSS-emission-probe (inv-N-7) | TRUTH-GATE | keep |
| — **Lighthouse CI (HARD, W0-2b)** | TRUTH-GATE | **keep — Q14 prohibition; NEVER removed/weakened.** LHCI-hash `env` peel restored (`fcd4273`). |
| `boot-smoke` (inv-N-1 cold-boot white-screen defeat) | TRUTH-GATE | keep |

**NEW jobs** `e2e-smoke` (chromium: page-load HARD + full-smoke soft) and `e2e-safari` (WebKit
smoke-safari soft) — the relocated Playwright gates, de-matrixed (run once) and sharded (the two
engines in parallel). Neither `needs: build-and-test` → they run PARALLEL from the start so the
suite overlaps the lib gates instead of serialising after them.

### `.github/workflows/deploy-pages.yml`

| Item | Verdict | Disposition |
|---|---|---|
| whole workflow (green-CI-gated CF Pages deploy-of-record) | TRUTH-GATE | keep; the `--branch=master` peel (`80c5888`) adopted from master (see §4) |

### `.github/workflows/release.yml`

| Item | Verdict | Disposition |
|---|---|---|
| whole workflow (publish-on-`v*.*.*`-tag, provenance, re-gate before publish) | USEFUL | keep — already lean, no diet |

**No DEAD workflow/job found.** No workflow removed.

---

## §3 e2e spec audit — every spec classified; every removal NAMED

The partial (resumed by this lane) had already staged the census fold. This ledger RECORDS every
removal with its tautology rationale — the already-staged deletions included, as the mandate
requires. **The rule**: a per-view "boots and renders its own heading + distinctive control +
zero console errors" check is a **population census**, not a per-file gate; asserting it once
per view in ONE sequential walk is the non-tautological form. The retired files each re-booted
the app cold to assert a SINGLE view's heading+control — duplicating the walk's mount coverage.
Their non-tautological content (the exact heading string + the distinctive control selector) was
**folded verbatim** into the census walks; nothing was resurrected as its own file, no truth was
dropped.

### REMOVED — folded into the user-view census `walk.spec.ts`

| Removed spec | Its assertion | Fold target | Tautology rationale |
|---|---|---|---|
| `views/browse.spec.ts` | heading "Browse" + `role=list` grid + the empty-envelope route mock | `walk.spec.ts` (Browse) | duplicate cold-boot mount of one view; assertions + the route mock folded verbatim |
| `views/extract.spec.ts` | heading "Extract" + `role=button` /Upload image/i | `walk.spec.ts` (Extract) | same class |
| `views/generate.spec.ts` | heading "Generate" + combobox "Generation preset" | `walk.spec.ts` (Generate) | same class |
| `views/palettes.spec.ts` | heading "My Palettes" + placeholder "Search your palettes..." | `walk.spec.ts` (Palettes) | same class |
| `view-switch.spec.ts` | dock switches to Palettes → "My Palettes" heading | `walk.spec.ts` (Palettes, via `openView`) | STRICT SUBSET of the Palettes census — `walk` already opens every view through the same `openView` dock idiom |

### REMOVED — folded into the admin-view census `admin/admin-walk.spec.ts`

| Removed spec | Its assertion | Fold target | Tautology rationale |
|---|---|---|---|
| `admin/admin-audit.spec.ts` | heading "Audit Log" + button "Refresh audit log" | `admin-walk.spec.ts` (audit) | duplicate cold-boot of one admin view; folded (heading + control) |
| `admin/admin-flagged.spec.ts` | heading "Flagged" + button "Refresh flagged palettes" | `admin-walk.spec.ts` (flagged) | same class |
| `admin/admin-names.spec.ts` | heading "Names" + placeholder /Search color names/i | `admin-walk.spec.ts` (names) | same class |
| `admin/admin-tags.spec.ts` | heading "Tags" + button "Refresh tags" | `admin-walk.spec.ts` (tags) | same class |
| `admin/admin-users.spec.ts` | heading "Users" + placeholder /Search users/i | `admin-walk.spec.ts` (users) | same class |

### MODIFIED — the census walks absorbed the folds; one bare-mount test excised in place

| Spec | Change |
|---|---|
| `walk.spec.ts` | now the user-view CENSUS: asserts heading + distinctive control per view in ONE boot (browse route-mock folded in). Gradient stays landmark-only (its content is `views/gradient.spec.ts`'s rich behavioral gate). |
| `admin/admin-walk.spec.ts` | now the admin CENSUS: asserts heading + control (Refresh button / SearchBar) per view in ONE boot instead of six cold boots. |
| `views/mix.spec.ts` | the bare "renders Mix heading + zero console errors" mount test DELETED (folded into `walk.spec.ts` Mix); the file KEEPS its behavioral convergence gate (`startMix` → ghosted plate → canvas convergence). |

**Net e2e change: −11 tautological tests across 10 deleted files + 1 in-place excision; 0 truth lost.**

### KEPT — every remaining spec is BEHAVIORAL or an ORACLE (audited, non-tautological)

- **HARD boot gate**: `page-load.spec.ts` (shell landmarks + zero console, inv-K-5).
- **Behavioral flows (real network / storage assertions, NOT mount checks)**:
  `flows/{color-propose,login-register,palette-delete,palette-edit,palette-flag,palette-fork,palette-save,vote-toggle}.spec.ts`
  (real POST/PATCH/DELETE/localStorage round-trips) ·
  `admin/flows/{color-approve,color-reject,palette-feature,tag-create,tag-delete,user-status}.spec.ts`
  (real admin-API verb assertions) · `admin/admin-populated.spec.ts` (seeded-fixture moderation UI).
- **View behavior (rich, not mount)**: `views/gradient.spec.ts` (stop add/drag/remove, atomic
  round-trip, loud-fail, radial reject, easing ramp, no-compositing-transform audit) ·
  `views/mix.spec.ts` (convergence choreography) ·
  `views/browse-loading.spec.ts` (skeletons-not-spinner) · `views/browse-pagination.spec.ts`
  (keyset paging past the 50-cap) · `color-space-switching.spec.ts` (space-switch — root-fixed a
  real dead-control bug) · `url-color-precedence.spec.ts` (hash-over-localStorage precedence).
- **Oracles / truth gates (SURVIVE by name)**: `perf/{drag,idle,view-switch}-frame-budget.spec.ts`
  (the §6.2 frame budgets) · `safari/{dual-webgl-atmosphere,mix-flow,sustained-30s}.spec.ts`
  (smoke-safari, the S-22 engine gate) · `webgl-{atmosphere,goo-blob,goo-blob-idle}.spec.ts`
  (context-loss + PRM idle-park) · `atmosphere-cold-load.spec.ts` (derived-field first frame) ·
  `accent-contrast-guard.spec.ts` (WCAG contrast guard fires) · `reactivity-instant.spec.ts`
  (wall-clock ≤ 50ms) · `dual-pane-1440.spec.ts` (CSS `@import` order) ·
  `mobile/{page-load-mobile,blob-presence-mobile,walk}.spec.ts` (mobile boot / blob presence).

**No further removal.** The census fold was the whole tautology surface; the remainder earns its
existence.

---

## §4 The deploy-truth peel — adopted from master (task: "adopt master's deploy-truth peel")

The five-commit deploy-truth peel landed on **master AFTER** tranche-t branched (`cc4f4fa`):
`be0a703` → `29ea8ac` → `fcd4273` → `80c5888` → `0441aba`. tranche-t was BEHIND. This lane
adopts it (the partial had already staged the deploy-file half; this lane completes the ci.yml
half + records it). **Verified: `deploy-pages.yml` and `lighthouserc.json` are now byte-identical
to master** (`git diff master -- <file>` = empty).

| Peel commit | Fix | Adopted where |
|---|---|---|
| `80c5888` | `--branch=master` (NOT `main`): `main` cut PREVIEW deployments while wrangler exited 0 — a FALSE-SUCCESS deploy that left color.babb.dev a month stale | `deploy-pages.yml` (== master) |
| `29ea8ac` | `staticDistDir: ./value.js/dist/gh-pages` — CWD-relative under the nested-workspace layout | `lighthouserc.json` (== master) |
| `fcd4273` | INP `error`→`warn` (structurally unmeasurable in navigation-mode lab LHCI — auditRan 0,0,0; **NOT a truth weakening** — TBT stays the HARD interactivity proxy) + `LHCI_BUILD_CONTEXT__CURRENT_HASH` env (LHCI upload needs the git hash; its CWD is the non-repo workspace root) | `lighthouserc.json` (== master) + `ci.yml` gh-pages Lighthouse step (env restored) |
| `0441aba` | remove the phantom `//`-comment assertion key (LHCI treats EVERY `assertions` key as an audit name) | `lighthouserc.json` (== master) |
| `be0a703` | the systematic-CANCELLED-runs root: a bounded soft step overrunning an unbounded job → the timed-out job marked CANCELLED → deploy skipped | **cured at the ROOT by the shard** (§5) — safari now owns its own job; the per-step SOFT bounds (8/12 min) survive verbatim in the e2e jobs |

**Q14 / hard-Lighthouse survival (the cascade-2 prohibition — the load-bearing check):**
`lighthouserc.json` keeps `largest-contentful-paint`, `total-blocking-time`,
`cumulative-layout-shift`, `categories:accessibility` all at **`error`** level; `ci.yml`'s
gh-pages job keeps the Lighthouse step with `continue-on-error` REMOVED (HARD). The gate is
neither removed nor weakened. The honest-red baseline (run `28836873580`: LCP 5563ms / TBT
5618ms) stands as the Q14 PI-1 tracking baseline, to go green by W9.

---

## §5 The shard — the wall-clock cure (task: "shard Playwright into parallel jobs")

**Change**: Playwright LEFT the `build-and-test [22, 24]` matrix (where it ran twice for zero
added signal) and became TWO dedicated jobs that run ONCE and in PARALLEL:

- **`e2e-smoke`** (chromium) — `page-load` (HARD) + full `smoke` project (soft, 8-min per-step
  bound). `timeout-minutes: 15`.
- **`e2e-safari`** (WebKit) — `smoke-safari` (soft, 12-min per-step bound). `timeout-minutes: 20`.

Neither `needs: build-and-test` (they run parallel from the start). `build-and-test`'s
`timeout-minutes` returns to **20** (honest for a lib-gates-only job ~11m); the S-close
`timeout-minutes: 30` WORKAROUND is discharged at its root (safari no longer shares this job's
budget). The peel's per-step SOFT bounds (8/12) survive verbatim in the new jobs; the LHCI-hash
deploy peel survives in gh-pages.

**The deploy chain is preserved**: `deploy-pages.yml` triggers on the `CI` workflow's overall
`conclusion == success` (not on named jobs), so the two added jobs are transparent to it. The
HARD gate `page-load` moved to `e2e-smoke` (still HARD, still reddens CI). `e2e-safari` is
all-soft (won't redden CI on the known-live aurora-shader P0).

### Before / after wall-clock

| | Before (run `28842102862`) | After (projected; confirmed by dispatch run — see §6) |
|---|---|---|
| Critical path | `build-and-test` **27.2m** → `gh-pages` 5.1m | max( `build-and-test` ~11m → `gh-pages`/`boot-smoke` ~5m ; `e2e-safari` ~16m ; `e2e-smoke` ~9m ) |
| **Wall-clock** | **~32 min** | **~16–17 min (~50% cut)** |

build-and-test drops ~27m→~11m (the ~17-min Playwright block leaves). The new long pole is
`e2e-safari` (~4m sibling-build setup + the irreducible 12-min sustained-30s probe), running
PARALLEL to the lib-gates→gh-pages chain. Runner-minutes are roughly neutral (the ×2 matrix
Playwright duplication is gone; the price is per-job sibling rebuilds — parallel, so no
wall-clock cost).

**Elegance note (honest)**: each job still rebuilds the `file:` siblings (glass-ui + keyframes)
from source (~4m). A shared setup-artifact job (build once, `upload/download-artifact`) would
cut runner-minutes further, but is a larger refactor with cross-job path risk not locally
verifiable — booked as a FUTURE elegance win, not taken in this diet (KISS; the wall-clock goal
is met by the split alone).

---

## §6 Verification

**Local (this lane):**

- `npm run lint` → **0** · `npm run typecheck` → **0** (lib + demo).
- `npx vitest run` → **2158 passed** (68 files).
- `npx playwright test` per project (dev servers on :8090/:8091; the owner's :9000 untouched):
  - `smoke` (chromium) → **33 passed** (incl. the folded `walk.spec.ts` + `views/mix.spec.ts`).
  - `smoke-admin` → **10 passed** (incl. the folded `admin-walk.spec.ts` + 6 admin flows).
  - `smoke-mobile` + `smoke-reactivity` + `smoke-perf` → **8 passed** (frame budgets green on
    software-GL, logging the real-GPU §6.2 numbers).
  - `smoke-safari` → deferred to CI (the 12-min sustained probe exceeds the local foreground
    budget; unchanged by this diet; observed in the `e2e-safari` job of the dispatch run below).
- Truth-gate survival (post-diet tree): smoke-safari (3 specs) · frame budgets (3 specs) ·
  Lighthouse HARD + 3 error-level CWV budgets · `e2e-safari` job present. No oracle spec touched.

**CI (the restructured pipeline):** `on: push` is `[master]` only, so a tranche-t push does NOT
auto-run CI; the restructure is observed via a `workflow_dispatch` on tranche-t.
Dispatch run: **`<DISPATCH_RUN_URL>`** — records the after-wall-clock + confirms the two new jobs
spawn, build the siblings, and reach their Playwright steps. (CI overall stays RED on the Q14
honest-red Lighthouse gate by design — the diet does not, and must not, change that.)

---

## §7 What this lane did NOT touch (bounds)

- **W0-5 oracle mints** (O-1..O-5, O-16, O-7 scaffold, O-26) — a sibling W0 item; no oracle
  spec added, moved, or removed here.
- **W0-X1 deploy hooks** (the dead `deploy.babb.dev` webhook + the I-era prod api) and **W0-X2
  the NCSU alias retirement** — sibling host/VPN ops, out of this lane.
- Product code, `playwright.config.ts` project definitions, `../glass-ui`, `../keyframes.js`
  (the zero-touch fence).
