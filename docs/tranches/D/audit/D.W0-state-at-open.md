# D.W0 State at Open — Lane A Audit

Read-only audit of the repo state at D.W0 open, run after Lane 0's precept advance landed. Records the B-residual cleanliness check, the D-open gate-matrix baseline, and the cold-start boot probe at 1280×800 light.

Lane spec: `docs/tranches/D/waves/D.W0.md §Lane A`.

## §1 Repo state at D.W0 open

| Field | Value | Source |
|---|---|---|
| Branch | `tranche-b` | `git status` |
| HEAD SHA | `11abd862ccab3bf23a67b073a6fe3c2b5244f73a` | `git log -1 --format=%H HEAD` |
| HEAD subject | `chore(precepts): advance shared submodule to 68d9b20 (contract-v2 codification)` | `git log -1 --format=%s HEAD` |
| Precept submodule SHA | `68d9b20b56e420b0336733a82a10a909b4c6a69c` | `git submodule status docs/precepts` |
| Stash | empty | `git stash list` returns nothing |
| Untracked | `docs/tranches/C/` only — the tranche-C scaffold acknowledged in the wave spec | `git status` |
| Tracked diffs | none | `git status` shows "nothing added to commit" |

Working tree is clean save for the C scaffold; the precept pin is on the contract-v2 codification SHA that Lane 0 advanced into; HEAD carries that advance commit.

## §2 B-close cleanliness

| # | Check | Result | Citation |
|---|---|---|---|
| 1 | `docs/tranches/A/FINAL.md` exists | PASS | file present, 7098 bytes, mtime 2026-05-19 16:42 |
| 2 | `docs/tranches/B/FINAL.md` exists | PASS | file present, 7220 bytes, mtime 2026-05-19 16:48 |
| 3 | A's `PROGRESS.md` shows zero `planned` rows | PASS | `grep -c '^\|.*planned' docs/tranches/A/PROGRESS.md` → `0`; only narrative mention is the W7 integrity-sweep prose at L235 |
| 4 | B's `PROGRESS.md` shows zero `planned` rows | PASS | `grep -c '^\|.*planned' docs/tranches/B/PROGRESS.md` → `0`; only narrative mentions are historical (L45 cites A's stale state at B.W0 open; L122/L130/L187 cite the close-gate state, both pre-resolution) |
| 5 | `git stash list` is empty | PASS | empty output |
| 6 | `git status` shows only `docs/tranches/C/` untracked | PASS | the C scaffold is the sole untracked path; no WIP outside the named scope |

All six items clean. The B close held across the precept advance — Lane 0's commit touched only the submodule pointer (`11abd86` parent `70e61e9`), so the working tree remained as B left it.

## §3 Gate matrix baseline

| Gate | Expected | Actual | Result | Artefact |
|---|---|---|---|---|
| vue-tsc errors (`npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'`) | 126 | **126** | PASS | `/tmp/d-w0-vuetsc.log`; final error trails in `demo/@/components/ui/v-calendar/Calendar.vue:90` — the residual generated-shadcn cluster |
| vitest run (`npx vitest run`) | 1409 passing across 26 files | **1409 passing, 26 files** | PASS | `Test Files  26 passed (26)` / `Tests  1409 passed (1409)` in 3.02s |
| playwright smoke (`npx playwright test --project=smoke`) | 3/3 green | **3/3 passing** | PASS | `view-switch.spec.ts`, `color-space-switching.spec.ts`, `page-load.spec.ts` all green in 8.4s |

The 126-error count matches the post-`92ee51f` custom-component-cluster clearance recorded at B.W3. No drift across the precept advance — the contract-v2 codification only changes the precept doc, not the type or runtime surface.

## §4 Boot probe (1280×800 light)

Cold-start `npm run dev` on port 9000 (per `package.json` "dev" script); probe script at `/tmp/d-w0-probe.mjs`; absolute import of `playwright` from the repo `node_modules` to dodge ERR_MODULE_NOT_FOUND.

| Field | Value | Result |
|---|---|---|
| URL | `http://localhost:9000` | reached, `networkidle` settled |
| Viewport | 1280×800 | as specified |
| Color scheme | light | as specified |
| Screenshot | `docs/tranches/D/audit/D.W0-playwright/boot-1280x800-light.png` (196 812 bytes) | PASS |
| Console errors | 0 | PASS |
| Stale-prop warnings | 0 | PASS — invariant-31 holds across the contract-v2 boundary |
| Network non-2xx (excl. 304) | 0 | PASS — every in-app fetch returned 2xx |
| Generic page warnings | 3 (informational, not stale-prop) | non-blocking |

The probe captured all `console.error` and `pageerror` events plus every response status; the JSON envelope is preserved at `/tmp/d-w0-probe.json` for the orchestrator. The dev server was killed cleanly after capture (SIGTERM, exit 143).

## §5 Sub-gate A verdict

**PASS.**

The state-at-open matches the B-close gate to the line — 126 vue-tsc errors, 1409 vitest passing across 26 files, 3/3 smoke green, 0 console errors and 0 stale-prop warnings at the 1280×800 light boot probe; the precept submodule is pinned at `68d9b20`; the only untracked path is the `docs/tranches/C/` scaffold called out in the wave spec.

D may proceed to W1 against this baseline.
