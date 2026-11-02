SERVED MODEL: claude-opus-5-5

# KF.W3 `.d` — close receipts (GREEN ×2 + CI + deploy + G9)

Seat `.d`, 2026-11-02. Sections: COHESION §0hb.2 last bullet (kf typecheck, test and CI GREEN ×2) · §0hb.3 (deploy + post-deploy probe + X-W11 G9 re-read). kf = `/Users/mkbabb/Programming/keyframes.js` (`master`); vjs = `/Users/mkbabb/Programming/value.js`. Every run through `~/.claude/guard/guarded`; vitest `--maxWorkers=2`.

## 1. Crash recovery

⟨`git -C kf status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling, §0hb.1; never staged) · vjs writable set clean ⇒ **0 inherited paths**. kf `HEAD` at open `17a5c34d` = origin/master `5c48e3da` + 4 (`.c1` `c18a9bd9` · `.c3` `bc37f98f` · `.c4` `4ed542d5` · `.c5` `17a5c34d`).

## 2. Local gates

| gate | bytes | run | reading |
| --- | --- | --- | --- |
| ⟨`guarded --light -- npm run check`⟩ | `17a5c34d` | 1 · 2 | rc 0 · rc 0 (`proof:structure — PASS … 0 violations across R1–R6`) |
| ⟨`guarded --timeout 20 -- npx vitest run --maxWorkers=2`⟩ | `17a5c34d` | 1 · 2 | rc 0 · rc 0 — `294 passed \| 5 skipped (299)` files · `2296 passed \| 2 expected fail \| 14 skipped (2312)` |
| ⟨`npm run check`⟩ | `d4148cdc` (settled) | 3 · 4 | rc 0 · rc 0 |
| ⟨`npx vitest run --maxWorkers=2`⟩ | `d4148cdc` (settled) | 3 · 4 | **rc 1** (`1 failed \| 2295 passed`: `test/demo/app/r4dock-share-fallback.test.ts` (2) `expected [ 145, 145 ] to deeply equal [ +0, 145 ]` — `.c5`'s named residual, UIA-KF-321) · rc 0 (`2296 passed`) |

**Reading**: check GREEN ×4 (×2 at each coordinate). vitest GREEN ×2 at `17a5c34d`; at the settled `d4148cdc` it read **1 RED of 2**, on `.c5`'s named UIA-KF-321 race (`r4dock-share-fallback.test.ts:70`, intermittent, A/B-attributed glass-independent by `.c5`; the jsdom demo project, untouched by `d4148cdc`, whose only edit is a chromium-gated library test that is skipped locally). It was not retried into a GREEN, not skipped and not cured here: the cure is `demo/app/dock/menu/SharePopover.vue`'s focus-then-`select()` ordering, a demo seat's concern (UIA-KF-321), not KF.W3's. CI's `demo correctness suite` step passed it once (§4).

## 3. Pre-existing CI REDs, attributed by measurement (baseline run `41433228470` at `5c48e3da`, schedule, 2026-11-02)

⟨`gh run view 41433228470 --json jobs`⟩ → `demo correctness` failed at `browser oracles (EN-a / VT / entry / a11y / trigger)`; `library gates` failed at `publish boundary`. Both REDs are older than this wave: the same two findings appear in run `39071539437` (`df80593c`, 2026-10-17).

**(R-1) `test/compile/entry-roundtrip.test.ts` S1 + S4. THIS WAVE'S CONCERN (UIA-KF-177), CURED AT THE ROOT.**
- S1: `expected '.toast {…' to match /display 350ms allow-discrete/`. The received CSS writes `opacity 0.35s …`.
- S4: `expected 'block' to be 'none'`. Its control strip `/(?:display|overlay) \d+ms allow-discrete/` matches nothing in a `0.35s` list, so allow-discrete stays and the exit holds `block`.
- Cause: ⟨`git log -- src/animation/compile/emit/css-text.ts`⟩ → `ca8c0433` (2026-10-08, *"UIA-KF-177 — reverseCSSTime writes the shortest exact CSS time, seconds on a tie"*). That commit re-aimed 9 jsdom oracles (its `--stat`). It missed this one, which is `describe.skipIf(!chromium)` and so is skipped wherever no Playwright resolves (kf has no `playwright-core` in `node_modules`).
- `.c4` (`4ed542d5`) re-landed that same contract, keeping the authored unit and the shortest exact spelling when none is authored. The test authors `duration: 350` with no unit, so `0.35s` is the ruled emission.
- Reproduced locally: ⟨`KF_PLAYWRIGHT_DIR=<vjs> guarded --timeout 5 -- npx vitest run --project library --maxWorkers=1 test/compile/entry-roundtrip.test.ts`⟩ → `2 failed | 3 passed (5)`. The messages are identical to CI's.
- Cure, kf **`d4148cdc`**, 1 file:
  - S1 asserts `/display 0\.35s allow-discrete/` (plus a 2-line comment naming UIA-KF-177).
  - S4's strip is `/,?\s*(?:display|overlay) \d*\.?\d+m?s allow-discrete/g`, which matches any `<time>` spelling, so the control really removes the allow-discrete entries.
  - No assertion is removed or relaxed.
- After the cure: the same command ×2 → `5 passed (5)` · `5 passed (5)`. CI (§4): step `browser oracles` **success**.

**(R-2) `proof:published-surface` clause (b). NOT THIS WAVE'S CONCERN: ESCALATED, no byte written.**
- Finding: *"5 public export(s) are NEITHER README-taught NOR manifested: `cssIdent` · `resolveTimingFunction` · `reverseCSSTime` · `serializeTimingFunction` · `timingFunctionEntries` (all HEAVY)"*. Read locally ⟨`guarded -- npm run build:lib && npm run proof:publish`⟩ at `d4148cdc` → `FAIL (1 finding(s))`, the same five.
- Origin: ⟨`git log -S timingFunctionEntries -- src/animation/public.ts`⟩ → `2e0d91ae` (2026-09-17, *"fix(kf/w5.c): THE PUBLICATION DECISION — cssIdent, reverseCSSTime, serializeTimingFunction and the easing registry get a published door"*). These are **KF.W5's** doors, opened without the README or manifest row that the gate's row contract requires.
- The root cure is five rows in `docs/published-surface.md` (row contract: name · tier · README anchor or `manifest-only: <reason>`), or README §Beyond CSS teaching. That is a publication-doc decision for KF.W5's publication ruling, not KF.W3's parser-consumption scope. It is never an allowlist.
- Adjacent to the ruling: the same manifest's prose still reads *"The exact `@mkbabb/value.js@4.0.0` pin"* (`docs/published-surface.md:17`), stale since `.c1`'s repin. It is offered to the ruling so that one docs commit can settle both.

## 4. Push + kf CI

⟨`git push origin master`⟩ → `5c48e3da..d4148cdc  master -> master` (an ordinary push of `.c1` · `.c3` · `.c4` · `.c5` + `d4148cdc`; `KeyframeTimeline.vue` never staged).

CI run **`41450770277`** at `d4148cdc` → conclusion **failure**. Step conclusions, read with ⟨`gh run view 41450770277 --json jobs`⟩:

- **`library gates`**: these steps succeeded:
  - `check library types`
  - `check types (SFC + tests + structure)`
  - `build library`
  - `correctness suite`
  - `demo correctness suite` (r4dock passed here)
  - `lint`

  `publish boundary` **failed**: R-2, the same five exports.
- **`demo correctness`**: `browser oracles (EN-a / VT / entry / a11y / trigger)` **succeeded**. It was RED at baseline, and R-1 is cured. `build demo` succeeded. `publish artifact boundary (post-build)` **failed**: R-2 again. Because of that failure, `demo roster (report-all)` and `record last-demo-green` were **skipped**, so the roster behind R-2 is still unmeasured.

**kf CI: RED. R-1 is cured. R-2 is the sole failing finding, and it fails twice: once in each job's `proof:publish` step.**

## 5. Deploy (§0hb.3): BLOCKED, not attempted

⟨`gh run list --workflow deploy-pages`⟩ → `41451374073 d4148cdc deploy-pages skipped`. The deploy rides `workflow_run` and is gated on `ci` `conclusion == 'success'` (`deploy-pages.yml:39-41`).

A `workflow_dispatch` break-glass (`require_demo_green=false`) would be a bypass of a RED gate, so it was **not used**. The §6 round-trip (`scripts/pages-deploy.sh:109-140`) and the post-deploy probe ×2 of `https://keyframes.babb.dev` are therefore **not run**. They are owed after R-2 is ruled and cured and CI is GREEN.

## 6. X-W11 G9 re-read

⟨`cd vjs && npm ls --prefix ../keyframes.js @mkbabb/value.js`⟩ ×2 → `├─┬ @mkbabb/glass-ui@10.1.3 │ └── @mkbabb/value.js@4.1.0 deduped └── @mkbabb/value.js@4.1.0` ×2 → **G9 GREEN (4.1.0)**.

## 7. Gate ledger (`.d`)

| gate | BEFORE | AFTER |
| --- | --- | --- |
| kf `npm run check` ×2 | rc 0 (`.c5`) | **GREEN** ×2 at `17a5c34d` and ×2 at `d4148cdc` |
| kf `vitest run --maxWorkers=2` ×2 | 2296/2296 (`.c4`) | ×2 GREEN at `17a5c34d` (2296 passed). At `d4148cdc`: 1 RED (r4dock UIA-KF-321, `.c5` residual) and 1 GREEN, so **not GREEN ×2 at the settled bytes** |
| kf CI GREEN | RED: R-1 + R-2 | **RED**: R-2 only (R-1 cured `d4148cdc`) |
| deploy-pages + §6 round-trip | skipped | **BLOCKED** on CI (skipped, run `41451374073`) |
| post-deploy probe ×2 | — | **NOT RUN** (no deploy) |
| X-W11 G9 `npm ls` → 4.1.0 | RED (4.0.0) | **GREEN** ×2 |

**Escalations**:
- **ESC-KFW3-d-1 (R-2)**: the five KF.W5-published HEAVY exports have no manifest or README row. A publication-doc ruling is needed, and §3 proposes it.
- **ESC-KFW3-d-2**: the UIA-KF-321 r4dock race is intermittent, so it denies a clean ×2. Its cure is in `SharePopover.vue`, a demo seat's.

**Residuals**:
- The `docs/published-surface.md:17` stale 4.0.0 prose.
- `.c2`'s open escalation, so G-KF3-4 stays RED.

---

## Addendum 2026-11-02 — `.d2` (RESUME 2, COHESION §0hd.5 · §0hb.3 · G-KF3-8 pageerror arm)

SERVED MODEL: claude-opus-5-5. Seat `.d2`. The sections above are left as they were (E-3); this addendum records the `.d2` sitting.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only (sibling's, §0hb.1; never staged). In vjs, ⟨`git status --porcelain -- <3 writable paths>`⟩ → empty. **0 inherited paths.**

### d2.1 Local gates at the final HEAD kf `6a4556d3` (×2, settled bytes)
- ⟨`guarded --timeout 15 -- npm run check`⟩ ×2 → rc **0**, rc **0**.
- ⟨`guarded --timeout 25 -- npx vitest run --maxWorkers=2`⟩ ×2 → `Test Files 295 passed | 5 skipped (300)` · `Tests 2316 passed | 2 expected fail | 14 skipped (2332)`, the same on both runs, rc 0 both times.
- Caveat: the working tree carries the sibling's dirty `KeyframeTimeline.vue`, which neither run staged or touched.

### d2.2 Push (ordinary)
⟨`git log --oneline origin/master..master`⟩ → 4 commits (`8ca052ad` `2f498f0e` `f59d5259` `6a4556d3`). ⟨`git push origin master`⟩ → `d4148cdc..6a4556d3  master -> master` (no force).

### d2.3 kf CI `41462383452` (push `6a4556d3`): **RED on both jobs, one finding**
⟨`gh run view 41462383452 --json conclusion,jobs`⟩ → `failure` · `demo correctness (browser roster) failure` · `library gates (library tests + proof:publish) cancelled`. The library job is marked `cancelled` at the run level, but its steps read: ⟨`gh api …/actions/jobs/125334446633 -q '.steps[]'`⟩ → `demo correctness suite success` · `lint success` · `publish boundary failure`.
- **library gates**: `check:lib` / `check` / `build:lib` passed. The `correctness suite` gave `127 passed | 5 skipped (132)` files and `1332 passed | 2 expected fail | 14 skipped` tests. The `demo correctness suite` gave `166 passed (166)` files and `981 passed (981)` tests, so UIA-KF-321 (`.sp`) is GREEN on CI. `lint` passed. `publish boundary` **FAILED** (log line 1848-1850): `proof:readme-runs — FAIL (1 finding(s); the docs oracle is not runnable truth)` · `✗ snippet [beyond css › compileToEntry #20] FAILED to execute against dist (exit 2)` · `ASSERT FAIL [… #20 line 14]: stated // => true but the dist computed false`.
- **demo correctness**: `browser oracles` passed, and so did `build demo`. `publish artifact boundary (post-build)` **FAILED** on the same finding (log line 783-786; `proof:boundary — PASS` and `proof:published-surface` clause (b) passed before it). `demo roster` and `record last-demo-green` were skipped.
- **R-2 (ESC-KFW3-d-1) is cured on CI**: published-surface (b) no longer appears in either job. The sole finding is the residual that `.ps` routed: ⟨`grep -n '350ms allow-discrete' README.md`⟩ → `834:dialog.css.includes("display 350ms allow-discrete"); // => true`. The dist emits `display 0.35s allow-discrete` (`reverseCSSTime`'s seconds-on-a-tie rule; the same drift that `d4148cdc` cured in the entry-roundtrip oracle).

### d2.4 Deploy · §6 round-trip · post-deploy probe ×2: **BLOCKED, not attempted**
⟨`gh run list -L 3`⟩ → `41463139545 deploy-pages workflow_run skipped`, gated on ci success. A break-glass `workflow_dispatch` would bypass a RED gate, so it was **not used**. The §6 round-trip (`scripts/pages-deploy.sh:109-140`) and the post-deploy probe ×2 of `https://keyframes.babb.dev` (the G-KF3-8 pageerror arm) were **not run**. Probing production now would read the previous build, not the repin, so it would witness nothing.

### d2.5 X-W11 G9 re-read
⟨`npm ls --prefix ../keyframes.js @mkbabb/value.js`⟩ → `├─┬ @mkbabb/glass-ui@10.1.3 │ └── @mkbabb/value.js@4.1.0 deduped └── @mkbabb/value.js@4.1.0` → **G9 GREEN (4.1.0)**.

### d2.6 Gate ledger (`.d2`)
| gate | BEFORE | AFTER |
| --- | --- | --- |
| kf check ×2 | rc0 (`.ps`/`.sp`) | **GREEN** ×2 at `6a4556d3` |
| kf vitest ×2 | 2316 (`.reg`) | **GREEN** ×2 at `6a4556d3` (2316 passed) |
| kf CI GREEN (both jobs) | RED R-2 (`41450770277`) | **RED**: R-2 cured; sole finding `proof:readme-runs` README.md:834, in both jobs (`41462383452`) |
| deploy-pages | skipped (`41451374073`) | **skipped** (`41463139545`); BLOCKED on CI |
| §6 round-trip | not run | **not run** (BLOCKED) |
| post-deploy probe ×2, pageerror 0 (G-KF3-8 arm) | not run | **not run** (BLOCKED) |
| G9 → 4.1.0 | GREEN | **GREEN** |

**Escalation ESC-KFW3-d2-1**: kf `README.md:834` must read `dialog.css.includes("display 0.35s allow-discrete"); // => true`. This is a one-line correction to the README runnable oracle, to the ruled CSS-time spelling. It is outside `.d2`'s writable set, and `.d2` holds no product write. It needs a grant, either to a kf docs seat or to a `.d2` repair. After it lands: CI GREEN → deploy-pages → §6 → probe ×2 → close.

## Addendum 2026-11-02 — `.d3` (RESUME 3, COHESION §0he.3 · §0hd.5 · §0hb.3 · G-KF3-8 pageerror arm)

SERVED MODEL: claude-opus-5-5. Seat `.d3`. The sections above are left as they were (E-3). This addendum records the `.d3` sitting.

**Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → `MM demo/components/instrument/timeline/KeyframeTimeline.vue` only. That path is the sibling's (§0hb.1) and was never staged. In vjs, ⟨`git status --porcelain -- <3 writable paths>`⟩ → empty. **0 inherited paths.**

### d3.1 Push (ordinary)
⟨`git log --oneline origin/master..master`⟩ → 3 commits (`2582da86` `608748e2` `8294a715`). ⟨`git fetch && git log master..origin/master`⟩ → empty. ⟨`git push origin master`⟩ → `fb87dbcd..8294a715  master -> master` (no force). ⟨`git ls-remote origin master`⟩ → `8294a7156f85…`.

### d3.2 kf CI `41504991466` (push `8294a715`): demo job GREEN; library job cancelled by its 4-minute budget
⟨`gh run view 41504991466 --json conclusion,jobs`⟩ → run `cancelled` · `demo correctness (browser roster) success` · `library gates (library tests + proof:publish) cancelled`.
- **demo correctness: GREEN.** The demo job log (`/Users/mkbabb/Programming/.kf-d3-logs/ci-41504991466-demo.log`) reads `passed: 6/6` at 18:59:53Z. ESC-KFW3-r1-1 (S5 · M1/M2) is cured on CI by `.bis` `2582da86` + `608748e2`.
- **library gates: every step passed, and the job then hit its time budget.** ⟨`gh api …/actions/jobs/125481891360 -q '.steps[]'`⟩ → steps 1–11 and the post steps all `success`: `npm ci` 35 s · `check library types` 2 s · `check types` 20 s · `build library` 9 s · `correctness suite` 56 s (`127 passed | 5 skipped (132)` files) · `demo correctness suite` 1 m 55 s (`167 passed (167)` files) · `lint` 5 s · `publish boundary` (`proof:publish`) 16 s. The job ran from 18:54:45Z to 18:59:25Z. ⟨`gh api …/check-runs/125481891360/annotations`⟩ → **`failure: The job has exceeded the maximum execution time of 4m0s`**. The budget is `.github/workflows/ci.yml:31 timeout-minutes: 4`, introduced at `552a19ff` (2026-07-12). The last GREEN library job was `35251074426` (2026-09-17), which took 1 m 50 s.
- **This is a structural RED, it was mis-read before, and it is outside this wave's concern.** The same `cancelled` conclusion appears at `41450770277` (4 m 05 s), `41462383452` (4 m 35 s) and `41466910668` (4 m 36 s). The `.d2` addendum and Checks 1–3 read it as a side effect of the demo-job RED. The demo job is GREEN now, which isolates the cause as the time budget. ⟨`grep -rn 'maximum execution\|timeout-minutes' execution/B/KF-W3.md evidence/W3/*.md COHESION.md`⟩ → 0 hits, so the cause was never recorded. The cure is a `ci.yml` write, and `.d3` holds no product write. It was not re-run in the hope of a faster runner, because the steps alone sum to about 4 m 31 s and a lucky re-run would mask the budget. → **ESC-KFW3-d3-1.**

### d3.3 Deploy · §6 round-trip · post-deploy probe ×2: **BLOCKED, not attempted**
⟨`gh run list -w deploy-pages.yml -L 2`⟩ → `41505833861 completed skipped 8294a715`. `deploy-pages.yml:39-41` gates on `workflow_run.conclusion == 'success'`, and the run concluded `cancelled`. A break-glass `workflow_dispatch` would bypass a RED gate, so it was **not used**. Without a deploy, the §6 round-trip (`scripts/pages-deploy.sh:109-140`) and the post-deploy probe ×2 of `https://keyframes.babb.dev` (the G-KF3-8 pageerror arm on `/#/easing` + `/#/spring`) have no subject. The probe is staged at `/Users/mkbabb/Programming/.kf-d3-logs/d3-probe.mjs`: one headless Chromium, a fresh context per route, both closed in `finally`. It is to be run under `guarded --timeout 5 --` (never `--light`).

### d3.4 X-W11 G9 re-read
⟨`npm ls @mkbabb/value.js`⟩ (kf) → `├─┬ @mkbabb/glass-ui… └── @mkbabb/value.js@4.1.0 deduped └── @mkbabb/value.js@4.1.0`. A second read: ⟨`… | grep -c 'value.js@4.1.0'`⟩ → `2` · ⟨`… | grep 'value.js@' | grep -vc 4.1.0`⟩ → `0`. `package.json:71` → `"@mkbabb/value.js": "4.1.0"`. **G9 GREEN (4.1.0).**

### d3.5 Gate ledger (`.d3`)
| gate | BEFORE | AFTER |
| --- | --- | --- |
| kf CI GREEN (both jobs) | RED: demo roster 4/6, library `cancelled` (`41466910668`) | **RED**: demo job **GREEN** (`passed: 6/6`); library job **cancelled** on the `ci.yml:31` 4 m budget, with every step passing (`41504991466`) |
| deploy-pages success | skipped (`41468193578`) | **skipped** (`41505833861`), BLOCKED on CI |
| §6 round-trip (`pages-deploy.sh:109-140`) | not run | **not run** (BLOCKED) |
| post-deploy probe ×2, pageerror 0 (G-KF3-8 arm) | not run | **not run** (BLOCKED; probe staged) |
| G9 → 4.1.0 | GREEN | **GREEN** ×2 |

**Escalation ESC-KFW3-d3-1 (new RED, outside the concern).** The kf CI `library gates` job has `timeout-minutes: 4` (`.github/workflows/ci.yml:31`, set at `552a19ff`). Its steps now take about 4 m 31 s of wall time. They all pass, and the job is cancelled anyway: the annotation reads `The job has exceeded the maximum execution time of 4m0s`. This has held since at least `41450770277`. The only owner of a fix is a ruling: either a budget that fits the measured step sum, or a split of the job. Both are `ci.yml` writes. No gate assertion would be relaxed, and no step skipped. With that ruling, re-run `.d3` from d3.2: CI → deploy-pages → §6 → probe ×2.
