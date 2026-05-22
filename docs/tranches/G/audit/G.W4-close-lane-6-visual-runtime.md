# G.W4 close-audit — Lane 6: visual-runtime (Playwright suite re-probe)

**Auditor**: G.W4 close-audit Lane 6 — visual-runtime
**Date**: 2026-05-22
**Branch / HEAD**: `tranche-g` @ `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26`
**Posture**: read-only audit (no git ops, no code modification; one new findings doc; Playwright run only).

---

## §1 — Pre-flight

| Check | Expected | Actual | Status |
|---|---|---|---|
| `git rev-parse HEAD` | `3a25f32…` | `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26` | PASS |
| branch | `tranche-g` | `tranche-g` | PASS |

Pre-flight PASSES. Audit proceeds.

---

## §2 — Spec count

```
find e2e -name '*.spec.ts' | wc -l  →  36
```

**36 spec files** — meets the wave threshold (≥ 36). G.W3 Lane G's
`e2e/smoke/mobile/walk.spec.ts` is present (commit `affbe0e`), lifting the
F-window count of 35 files to 36.

> Note on counting unit: F.W4 Lane 6 counted **test blocks** (36), because
> `reactivity-instant.spec.ts` declares two `test()` blocks. At G HEAD the
> *file* count is now also 36 (mobile-walk added one file). Test-block count
> is 37 (36 files, one of which carries two blocks). Either unit is ≥ 36.

The only G-window change under `e2e/` is `affbe0e` (the mobile-walk spec).
`playwright.config.ts` was **not** touched in G. `package.json` was touched
(`61314fa`, proof scripts + `files` entry) but the Playwright dependency
version was **not** bumped.

---

## §3 — Playwright config (5 projects)

Per `playwright.config.ts`:

| Project | testDir / scope | Engine / device | Worker policy |
|---|---|---|---|
| `smoke` | `e2e/smoke` minus admin/, mobile/, safari/, `reactivity-instant.spec.ts` | desktop Chromium 1280×720 | host default |
| `smoke-admin` | `e2e/smoke/admin` (5 view + admin-walk + 6 flows) | Chromium 1280×720, addInitScript admin-auth fixture | host default |
| `smoke-mobile` | `e2e/smoke/mobile` | Pixel-7 (Chromium engine) | host default |
| `smoke-reactivity` | `reactivity-instant.spec.ts` | Chromium 1280×720 | **workers:1 enforced** |
| `smoke-safari` | `e2e/smoke/safari` | iPhone 14 (WebKit engine) | host default |

---

## §4 — Per-project results

Two probe rounds were run:

1. **Full-fleet** `npx playwright test` (all 5 projects, host-default
   parallelism) — exhibited a large, *non-deterministic* failure cluster
   (18 fails in run A; a partly-different ~17-fail set in run B).
2. **Per-project isolated** re-runs with `--workers=1` — the authoritative
   classification round, per task instruction §5.

### §4.1 — Per-project results table (isolated `--workers=1` round)

| Project | Specs | Pass / Fail | Classification |
|---|---|---|---|
| `smoke` | 20 | **20 / 0** | PASS (clean in isolation) |
| `smoke-admin` | 12 | **12 / 0** | PASS (clean in isolation) |
| `smoke-mobile` | 2 | **2 / 0** | PASS (incl. new `walk.spec.ts`) |
| `smoke-reactivity` | 2 blocks (1 file) | **1 / 1** | 1 fail — environmental wall-clock flake (see §5.1) |
| `smoke-safari` | 1 | **0 / 0 run** | NOT RUN — WebKit binary missing (see §5.2) |
| **Total** | **36 files / 37 blocks** | **35 pass / 1 env-flake / 1 not-run** | — |

### §4.2 — Full-fleet round (for the record)

The full-fleet `npx playwright test` run produced 18 failures spread across
`smoke`, `smoke-admin`, `smoke-reactivity`, and `smoke-safari`. A second
full-fleet run produced a **different** failing set (different `smoke` and
`smoke-admin` specs). This non-determinism — failures that move between runs
and vanish entirely under `--workers=1` — is the textbook signature of the
**parallel-worker contention** flake class, NOT code regression. All
`smoke`/`smoke-admin` full-fleet failures cleared completely when each
project was re-run isolated.

---

## §5 — Failure classification

Per task §5: a failure is a REAL regression only if it is **deterministic**
AND **traceable to a G code change**. Every failure observed was re-run
isolated to classify it.

### §5.1 — `smoke-reactivity` — `slider-keyboard` subtest

```
[smoke-reactivity] reactivity-instant.spec.ts:128:1 (slider-keyboard subtest)
  TimeoutError: page.waitForFunction: Timeout 200ms exceeded.
```

**Classification: ENVIRONMENTAL flake (wall-clock-sensitive). NOT a G regression.**

Evidence:

- **Re-run isolated `--repeat-each=5`**: 4 fail / 1 pass — *non-deterministic*.
  Not deterministic, so it cannot be a real regression by the task's own
  definition.
- The one passing run measured a **median of 23.40 ms** — far under the
  100 ms threshold. The reactivity chain itself is fast and healthy; the
  failure mode is the per-keystroke `waitForFunction` 200 ms *poll* timeout
  being missed under host CPU pressure, not a slow median.
- **This is the exact same failure class F.W4 Lane 6 already documented and
  classified as environmental** (`F.W4-lane-6-visual-runtime.md §"Environmental
  — smoke-reactivity"`, lines 91–98): same spec file, same
  `TimeoutError: page.waitForFunction: Timeout 200ms exceeded`, same project,
  same wall-clock sensitivity. In F.W4 it surfaced on the `spectrum-drag`
  subtest; here it surfaces on the companion `slider-keyboard` subtest — the
  two subtests share the identical 200 ms-poll instrumentation shape, so they
  are interchangeable manifestations of one flake class.
- **No G-window commit touches** `reactivity-instant.spec.ts`, the
  color-picker `controls/` reactivity path, or `playwright.config.ts`
  (`git log master..tranche-g` confirms — empty for all three). There is no
  G code change for this failure to be traceable to.

This is the same RM-1 / G-AUDIT-6 §2.2 environmental class (timing-sensitive
spec, host-noise-driven). It is a known, pre-existing, non-G condition.

### §5.2 — `smoke-safari` — WebKit binary missing

```
browserType.launch: Executable doesn't exist at
  …/ms-playwright/webkit-2287/pw_run.sh
```

**Classification: ENVIRONMENTAL — missing browser binary. NOT a G regression.
NOT remediated (per task §6: do not install browsers).**

Evidence:

- Playwright `1.60.0` (the version installed) expects WebKit build
  **`webkit-2287`** (WebKit 26.4). The local Playwright cache contains only
  **`webkit-2248`** — a stale binary from an earlier Playwright version.
- This is precisely the environment gap G-AUDIT-6 §2.1 / the config docblock
  (`playwright.config.ts` lines 25–34, 105–124) and the G.W0-retired RM-1
  item flagged: `smoke-safari` requires a local `npx playwright install
  webkit` step (CI gets it via E.W4 Lane B's workflow step).
- G did **not** bump the Playwright dependency version (`git show 61314fa --
  package.json` confirms the `package.json` edit was proof-script + `files`
  changes only). The `webkit-2287` requirement therefore predates tranche-G;
  the stale `webkit-2248` is a pre-existing local-environment condition.
- Per task §6, the binary was **not** installed. Reported honestly as an
  environment gap below.

### §5.3 — Classification summary

| Failure | Project | Deterministic? | Traceable to G code? | Classification |
|---|---|---|---|---|
| `slider-keyboard` 200 ms poll timeout | `smoke-reactivity` | No (4/5 under repeat-each) | No (no G change to spec/path) | Environmental (RM-1 wall-clock flake) |
| WebKit binary missing | `smoke-safari` | n/a (project cannot launch) | No (PW version not bumped in G) | Environmental (missing browser binary) |
| ~16 `smoke`/`smoke-admin` full-fleet fails | `smoke`, `smoke-admin` | No (vanish in isolation; vary run-to-run) | No | Environmental (parallel-worker contention) |
| **Real regressions** | — | — | — | **0** |

---

## §6 — Mobile-walk spec confirmation

`e2e/smoke/mobile/walk.spec.ts` (G.W3 Lane G, commit `affbe0e`) runs under
the `smoke-mobile` project and **PASSES**:

```
✓  2 [smoke-mobile] › e2e/smoke/mobile/walk.spec.ts:60:1 ›
     mobile walk: segmented control toggles panes + view-select re-routes (24.2s)
```

Both `smoke-mobile` specs pass (`page-load-mobile.spec.ts` + `walk.spec.ts`,
2/2). The 6-step interaction walk (segmented-control pane toggle + dock
view-select reroute) completes in ~24 s, within its 60 s per-test budget.

---

## §7 — Environment gaps (stated honestly)

1. **WebKit binary version mismatch** — Playwright `1.60.0` expects
   `webkit-2287`; only `webkit-2248` is present in the local
   `ms-playwright` cache. The `smoke-safari` project therefore **could not
   execute** on this host. Remediation is `npx playwright install webkit`
   (NOT performed — out of audit scope per task §6). CI installs WebKit via
   the E.W4 Lane B workflow step, so CI is unaffected. This is a
   local-environment condition that predates tranche-G.

2. No other gaps. Chromium (`chromium-1223`) is current and all
   Chromium-engine projects (`smoke`, `smoke-admin`, `smoke-mobile`,
   `smoke-reactivity`) ran successfully.

---

## §8 — Verdict

**ISSUES — no code regressions; two pre-existing environmental conditions.**

- **0 real regressions.** Every Chromium-engine spec passes in `--workers=1`
  isolation: `smoke` 20/20, `smoke-admin` 12/12, `smoke-mobile` 2/2 (incl.
  the new mobile-walk spec), `smoke-reactivity` `spectrum-drag` subtest 1/1.
- **35 of 37 test blocks pass** under isolated runs. The 2 non-passing items
  are both environmental and both pre-existing (not introduced by G):
  - `smoke-reactivity` `slider-keyboard` subtest — the RM-1 wall-clock
    flake class F.W4 Lane 6 already documented (non-deterministic 4/5;
    healthy 23.40 ms median when it passes).
  - `smoke-safari` — a missing/stale WebKit binary; the project could not
    launch on this host.
- Spec count 36 files — meets the ≥ 36 wave threshold.

The "ISSUES" verdict reflects only the honest reporting of the two
environmental conditions; from a **code-correctness** standpoint the
visual-runtime surface is **clean at G HEAD `3a25f32`** — no G code change
caused any test failure.
