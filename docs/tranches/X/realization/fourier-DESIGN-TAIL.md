# fourier — the realization DESIGN pass, tail (2026-11-05)

**Why this file exists.** `fourier-DESIGN.md` (sealed, E-3) says its inventory was cut off inside the O-97 (glass O-98) CONTRAST-FLOOR row and that the rows after it "must be routed to a follow-up seat". PLAN.md §4 names that seat F-TAIL. This file is it. The rows were recovered whole from the inventory seat's own output (workflow `wf_d4a8fc1e-39d`, the inventory JSON). The O-97 row's visible text was already designed (relay R-F4 → O-146). After it come 35 rows. The last 13 (DEPLOY-ALERT-5001d2f through O-132-ID-COLLISION) are the ones `fourier-DESIGN.md` §1–§3 already designed (F-D1, D-4/O-F1, F-D2, F-D3, O-F4, R-F1, R-F2, R-F6, F-D9). The first 22 had never been seen by a design seat. Each one is designed below: owner, cure, falsifier, and where it executes. Nothing here is deferred. A row waits only on an event that is not ours (a glass publish, an owner ruling, a host act).

**Law.** The same as `fourier-DESIGN.md`. Glass is read-only. Identity is the owner's. Every falsifier is RED before and GREEN after, ×2.

## A · Glass-held (adopt on the pin; no consumer copy)

| Row | Cure (glass) | fourier's adoption falsifier | Executes at |
|---|---|---|---|
| **O-74b** CARD-TITLE-RUNG (producer-held row 1, au3 L1-12) | `.card-title` on `--type-title` | the held row flips: the honest-red reporter fails when a held row passes, so the row is deleted on the pin | F-G2 (10.2.0) |
| **O-76** MAGNET-STATE-HIDDEN (producer-held row 2, c3m) | a DockTrigger state mark | same | F-G2 |
| **O-77/O-77a · O-82 · O-85 · O-86 · L2-12 · L2-18ˢ/L3-14 (O-74a E-2)**: held with no RED test | each per its glass letter | **unit F-T1 (self, now):** every row a test can carry gets a `producer-held.json` row whose test asserts the glass contract. It reads RED on 10.1.3, so a glass landing turns it GREEN and the reporter forces the adoption. Any row no test can carry is listed as such, with the reason. | F-T1 now; flips at F-G2 |
| **O-55 · O-62 · O-63 · O-65 · O-66 · O-67** dock and veil holds, with no live test (0 token hits in `web/` at 5001d2f) | glass BL formation (10.2.0) | folded into F-T1 on the same terms. O-68 is excluded, because it shipped in 10.1.0 and was adopted. | F-T1 now; flips at F-G2 |
| **OD19-F2** (canvas-dock half) · **OD19-F6** (ellipse = V1) | glass O-102 §1/§2 (G-F2a/b/c, G-V1). The consumer halves were cured at e928541 and 2a3651d. | re-read the OD19-F2 first-expand trace and the F6 corner radius on the new pin ×2 | F-G1 / F-G2, whichever release names O-102 |

## B · Self-owned, executed in this seat (fourier `x/realize-f2`)

| Row | Cure | Falsifier | Receipt |
|---|---|---|---|
| **OPERATOR-6** worker count | `workers` defaults to 1 unless `PW_WORKERS` is set (CI already pinned 1) | the resolved config, with CI and PW_WORKERS unset: `workers` 9 → 1, ×2 | fourier `c02b5b2` |
| **F.REL INFO-2** contour-extraction skips | `assets/animals` is committed (10 images), so each `length === 0 → test.skip()` becomes an `expect` on the set | `test.skip` in the spec 3 → 0; the spec runs in CI | fourier `10b3573` |
| **G-F10-3** probe substrate | discharged by value V-D11: `scripts/probes/drift-subpath.mjs` is the dated successor beside the stale probe (E-3), and it read GREEN ×2 (`bench/records/rc-p-4.2.0/r2-drift-subpath-r{1,2}.txt`, COHESION §0hw.10) | n/a: the successor's own ×2 | value V-D11 |

## C · Self-owned, designed here with their own units

- **F-T2 · R-k4, the prod-verify budget tracker.** Root: the tracker starts empty in each process, so a second run inside the 60 s window spends a budget the first run already spent and reads the API's correct 429. Only `ETag` and `RateLimit-Reset` are CORS-exposed (`api/config.py` `CORS_EXPOSE_HEADERS`). The probe can therefore read when its window resets, but not how much of it remains. Cure: on a 429 from a budgeted bucket on a call that is not the probe's own deliberate 429 leg, `call()` waits the exposed `RateLimit-Reset` and retries once. That is the app's own protocol (`web/src/lib/api.ts` reads a 429 as "wait RateLimit-Reset and retry"), not a mask, because the probe still asserts every row on the retried answer. Falsifier: two back-to-back prod runs 5 s apart. Before the cure the second run false-REDs. After it, both runs are GREEN, ×2.
- **F-T3 · R-k7, stale worktrees.** Run `git worktree remove` on each registered worktree that is clean and whose HEAD is reachable from `origin/master` (`.worktrees/ct2-A/B/C`, `f3b`, `f3d`, `f3e`, `~/.fourier-frel/g-wt`). Keep the RETAIN-AS-RECORD ones by name (`~/.codex/worktrees/d0be`), and keep any worktree with uncommitted bytes. Falsifier: `git worktree list` lists only live seats and the retained record. Each removal is preceded by `git -C <wt> status --short` being empty. **Executed 2026-11-05 in this seat:** removed `f3b`, `f3d`, `f3e`, `~/.fourier-frel/g-wt` and `~/.fourier-frel/defects-wt/integrate` (each clean, with HEAD an ancestor of `origin/master`). Kept: `ct2-A/B/C`, which are clean but **not** merged, so they hold unmerged F.CT work and stay as record; `d0be` (RETAIN-AS-RECORD); `~/.dev-logs/x-0hm-cures/fourier/wt` (another seat's evidence tree); and the two realization worktrees.
- **F-T4 · OPERATOR-8, J-audit PNG churn.** The 15 `web/e2e/screenshots/f-w14/after-page-*.png` are audit captures that a full run rewrites, not goldens. Cure: the capture writes to a gitignored `web/e2e/.captures/`, and the committed copies are removed in one pathspec commit, after each one is Read. The primary checkout then moves to master by an ordinary checkout once its tree is clean, with no stash and no reset. Falsifier: a full run leaves `git status --short web/e2e/screenshots` empty, ×2.
- **F-T5 · SS-13, the probe and denominator sweep.** One sitting runs each carried F.W3 and F.W4 SS-13 probe against fourier master and closes each leg GREEN with its receipt. A leg that does not reproduce is homed by a dated addendum to a named unit.
- **F-T6 · RECORDS-REREAD.** A verify-only seat re-runs each gate's own command ×2 at fourier master: F.W0 G-4/G-5/G-8, F.W1 G9, F.W3 g11, F.W4 G-F4-VUE-TSC-CLEAN, G-F4-NO-UNUSED and G-F4-ZERO-CONSOLE, FW6-G7, and the two-run G-F12-3-LOAD. It appends one LEDGER event per row moved GREEN, rewrites no cell (E-3), and lists any row that does not reproduce.
- **F-T7 · the CARRY-LEDGER sweep.** Classify each of the 543 rows (F-W1-CARRY 105, F-W4-CARRY 438) at fourier master as cured-at-bytes (with a grep or read receipt), homed (wave or O-id) or open, and publish the open remainder as rows. This is a mechanical grep pass plus spot reads.
- **F-T8 · G-F7-3, G-F7-11 (records).** A value-side API-row acknowledgement of F.W7's one-object-kind re-scope (citing F-W7 §13.3 and O-119), and the three far-end reciprocals (F-W10 spec, SS-4 synthesis, API-row ledger), each a dated addendum. Falsifier: F-W7's own grep for each of them, RED → GREEN.
- **F-T9 · G-F7-4, palette version identity (value.js API).** `paletteVersion.findByHash` is a bare `findOne({_id: hash})`. Execute F.W7 clause E1: a compound `(paletteSlug, hash)` version `_id`, a migration, and a test that two palettes sharing a content hash resolve to their own versions. This is value.js API work, routed to the value track as a unit beside V-D4. The alternative, retiring E1, needs a dated ruling (OA ask below).

## D · Owner or host acts (exact asks)

| Row | The ask | Recommendation |
|---|---|---|
| **G-F10-6 ≡ G-F9-21** (corpus leg, RED by construction) | "May the corpus leg be ruled RETIRED-BY-DESIGN in a COHESION addendum? Its falsifier forbids any edit to `fr-*.md`, so it can never turn GREEN." | Yes. It is an instrument with no reachable GREEN. |
| **G-F9-23 leg (a)** (pre-F.W1 visual capture) | "Leg (a) needs a capture taken before F.W1's transaction, which can no longer be taken. Rule it RETIRED (unobtainable), with the post-hoc checkpoint as the base? Leg (b) is met: 6 linux goldens, CI in mcr playwright v1.61.0-noble." | Yes. |
| **G-F9-19** (one docker/nginx host authority) | "May a seat read the host's live nginx include for fourier, read-only over ssh (with O-F5's host log read in the same session)?" | Yes, in one session with O-F5. |
| **F.REL R-k3** (prod probe tombstones) | "Hard-delete the 23+ probe-titled tombstones and the PD-1 draft `blazing-soaking-mango-koala` through the admin API, after an export (the §0ge.8 R-4 precedent)?" | Yes. Export first, admin API only, never mongosh. |
| **F.CT residuals** (phase 4) | "Open a phase-4 contour pass, starting from the judged baseline (9 rows under the judge bar, 2.135× median runtime, .mem2 recall)?" | Owner's call. The pipeline is ruled accepted (§0ge.6). |
| **F-T9 alternative** | "Retire F.W7 clause E1 instead of executing VO-1/VO-2?" | No. Execute it; it is the precondition for any sharing key. |
