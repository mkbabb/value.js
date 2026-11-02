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
