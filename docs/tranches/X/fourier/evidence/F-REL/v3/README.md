SERVED MODEL: claude-opus-5-5

# F-REL.v3 — master's non-mongo reds (visual-checkpoint items 1·6·7 / 2 / 8), COHESION §0gh.2

Unit: F-REL.v3 (Track C · X·F). Spec: COHESION §0gh.2; F-REL.md §Units `.g` (L31) + §Gates (L36-37); ADDENDUM (d) `.vb2` (L62-66); record RESUME (i) Baseline row v3.

## 1. The reds, read from CI (no heavy run)

- ⟨`gh run view 39292117114 --log-failed | grep -E 'Expected an image|visual-checkpoint.spec.ts:[0-9]+:[0-9]+$' | sort | uniq -c`⟩ (master `24a524a`) →
  - `3 ected an image 277px by 238px, received 245px by 214px. 12335 pixels (ratio 0.19 …)` at `visual-checkpoint.spec.ts:99:28` (items 1·6·7, `checkpoint-card-resting`);
  - `3 ected an image 277px by 238px, received 245px by 214px. 11973 pixels (ratio 0.19 …)` at `:120:28` (item 2, `checkpoint-card-hover`);
  - `3 ected an image 1248px by 161px, received 1120px by 161px. 9684 pixels (ratio 0.05 …)` at `:161:30` (item 8, `checkpoint-admin-banner`).
- m/w1 `39304717107` (`9519b6f`, post-.m2) carries the same three, byte-for-byte the same sizes and pixel counts (`3 failed · 3 flaky · 524 passed`).
- **Drifted anchor, recorded.** The Baseline (i) row v3 names `:99` as `toHaveAttribute` and `:161` as `toBeVisible`. At the true bytes (`web/e2e/visual-checkpoint.spec.ts` at `563814d`) `:99`, `:120` and `:161` are all `toHaveScreenshot(…)`, and every one of the nine failures (3 tests × 3 attempts) is a golden-size mismatch. The `toHaveAttribute` lines in that log belong to other specs (`spellcheck`, `aria-pressed`: the flaky set). The intent (items 1·6·7 / 2 / 8 RED) holds.

## 2. The goldens' own history (read-only)
- ⟨`sips -g pixelWidth -g pixelHeight web/e2e/visual-checkpoint.spec.ts-snapshots/*.png`⟩ at `563814d` →
  - `checkpoint-card-resting` darwin **245×214**, linux **277×238**;
  - `checkpoint-card-hover` darwin **245×214**, linux **277×238**;
  - `checkpoint-admin-banner` darwin **1120×161**, linux **1248×161**;
  - the other three (modal 448×628, disclosure 424×608, tooltip 87/85×55) agree in size across platforms.
- ⟨`git log --format='%h %s' 24a524a^1..563814d -- web/e2e/visual-checkpoint.spec.ts-snapshots web/e2e/visual-checkpoint.spec.ts`⟩ → ONE commit: `47c5f71 fix(web · X-DS fourier pass 8 · critic F8C): /gallery sits in /paper's 72rem page measure (DS-F8C-C1)`.
- ⟨`git show --stat 47c5f71`⟩ → `web/src/components/gallery/GalleryView.vue` (+7 −1: the route column takes `px-[max(0px,calc((100%-var(--container-6xl))/2))]`), `web/e2e/f-w14v-au1.spec.ts`, and **three darwin goldens only**: `checkpoint-admin-banner-chromium-darwin.png`, `checkpoint-card-hover-chromium-darwin.png`, `checkpoint-card-resting-chromium-darwin.png`. Its message states the re-baseline by name: *"NAMED RE-BASELINE (X-DS §0ej, owner-ordered de-slop canon; DS-F8C-C1): … checkpoint-card-resting, checkpoint-card-hover (277x238 -> 245x214) and checkpoint-admin-banner (1248 -> 1120 wide), chromium-darwin. Geometry only: the same card and banner in the narrower measure."*
- The CI deltas are exactly the commit's stated deltas. 1120 = 72rem (1152 px, `--container-6xl`) − 2 × the 16 px page gutter, in the 1280-wide chromium project viewport.

## 3. Bisect in the noble container, under the guard (2026-10-20 00:04:59–00:06:28Z)
Harness: `~/.fourier-frel/vb/r7-outer.sh` → `~/.claude/guard/guarded --rss-gb 20 --timeout 90 -- r7.sh`. r7 is r6 (the `.vb2` harness) changed in three ways: one guard admission runs a plan of `REF:TAG` legs; the container tree is re-synced after each checkout; and the run aborts unless the sync prints `synced`. Linux = container `frel-vb`, `mcr.microsoft.com/playwright:v1.61.0-noble` (Playwright 1.61.0; lock sha `62eef0049f0f0be7` on host and in the container). Darwin = headless chromium from the scratch worktree. API `:8191` with `COMPUTE_CONCURRENCY=1`. Chromium project only, `--workers=1`.

**A void first pass, recorded.** The first admission (23:53:52Z) measured the container's linux legs against a STALE tree. Its sync ran `bash -c 'pkill -f vite; …'`, and the `pkill -f` matched the bash command line itself, so the copy never ran. ⟨`docker exec frel-vb diff -rq /src/web/src /repo/web/src`⟩ → 10+ files differ. Those four linux logs are renamed `*.INVALID-stale.log` and not cited. The fix is `pkill -f "[v]ite"`, plus the `synced` abort guard. The darwin leg of that pass (`Dhead`, vite served from the checked-out worktree) is valid and is cited below.

| leg | ref | result |
|---|---|---|
| Lpre (items 1·6·7, 2, 8) | `47c5f71^` = `a1dc2eb` | ⟨`linux-r7-Lpre.log`⟩ → `3 passed (14.6s)` rc=0 |
| Lpost (same three) | `47c5f71` | ⟨`linux-r7-Lpost.log`⟩ → `3 failed`: `Expected an image 277px by 238px, received 245px by 214px` ×2 (12335 / 12007 px), `1248px by 161px, received 1120px by 161px` (9660 px) |
| Lhead (all 5) | `563814d` | ⟨`linux-r7-Lhead.log`⟩ → `3 failed · 2 passed` (items 5 and 3 pass); the same three size mismatches. **CI's reds reproduced locally** |
| Dhead (all 5) | `563814d` | ⟨`vb7-darwin-Dhead.log`⟩ → `5 passed (8.9s)` rc=0 |

**Cause, per item.** One commit moved all three: **`47c5f71`** (X-DS fourier pass 8, DS-F8C-C1, in the `24a524a` range).
- Items 1·6·7 (`checkpoint-card-resting`) and item 2 (`checkpoint-card-hover`): the /gallery column now centres in the 72rem measure. Auto-fill makes narrower cards (277×238 → 245×214).
- Item 8 (`checkpoint-admin-banner`): the banner spans the measure (1248 → 1120).

The commit re-baselined these goldens for `chromium-darwin` only. The `chromium-linux` goldens kept the old geometry. **No later X-DS commit moves them:**
- Darwin passes 5/5 at HEAD with 47c5f71's goldens.
- `6226157`'s stats-row change sits outside both card crops. The Lpost and Lhead pixel counts differ by 10 px on the hover (12007 vs 11997), and both are size mismatches.

**Not a web/src defect.** The narrower measure is the ratified X-DS design (§0ej canon), so a web/src "cure" would revert owner-ordered work. The defect is the instrument's stale linux half. The lawful cure is the one attributed linux re-baseline that 47c5f71 named and did not mint.

## 4. The one re-baseline, read before commit
- ⟨`MODE=update` leg `LU`: `--update-snapshots -g 'items 1 · 6 · 7|item 2 |item 8'` at `563814d` in the container⟩ → `3 passed`, three `…-chromium-linux.png is re-generated, writing actual`. The six container goldens were copied out (`snap-r7-LU/`).
- ⟨`cmp` each against the committed linux golden⟩ →
  - `checkpoint-admin-banner` 1120×161, CHANGED 25539→25064 B;
  - `checkpoint-card-hover` 245×214, CHANGED 7654→7001 B;
  - `checkpoint-card-resting` 245×214, CHANGED 3037→2936 B;
  - `checkpoint-card-modal`, `checkpoint-disclosure-body`, `checkpoint-tooltip-trigger-mobile`: **same**.
- Read (image view), new linux against old linux and the darwin twin:
  - **card-resting / card-hover:** the same green-thumbnail card with the "Amber fox spiral" caption, narrower. The hover keeps its radial highlight. Linux text rasterisation differs from darwin, as before.
  - **admin-banner:** the same banner ("Admin Mode", Exit admin mode, six stat cells: ENTRIES 128 · FEATURED 7 · SAVED 41 · VIEWS 9.3K · LIKES 452 · STORAGE 70.0 MB), cells narrower.
  - **Geometry only; no content, colour or state change.**
- sha256 (first 16): banner `fb8222ab8a9e1fce` · hover `29208c3ea95f2a4b` · resting `6ef9850d69f741ea`.
- Darwin goldens: **not re-baselined.** They are already current (`Dhead` 5/5), and re-minting an unchanged golden would be a blind act.

## 5. Commit and first verify: a new red from a sibling commit
- fourier `f7d17f0` (m/w1, pathspec: the three `*-chromium-linux.png`) sits on two sibling commits that landed during this unit:
  - `976a704` X·OD19 P2-fourier-sliders-caret (OD19-F7/F8, web/src);
  - `d5a48cf` X·W11.h18 (deploy nginx; no web path).
- ⟨plan `f7d17f0:D1 L1 D2 L2`, 00:14:41–00:15:45Z⟩ → D1 `1 failed 4 passed` · L1 `1 failed 4 passed` · D2 `1 failed 4 passed` · L2 `1 failed 4 passed`.
  - Items 1·6·7, 2, 8 and 5 pass on both platforms, twice. **This unit's three reds are cured.**
  - The one failure is **item 3** `checkpoint-disclosure-body`: 1124 px darwin / 1014 px linux (ratio 0.01). Item 3 passed at `563814d` on both platforms (`Dhead`/`Lhead`).
- Diff read (darwin expected/actual/diff): the only changed region is the Series section's Harmonics slider. The old two-part slider (filled track and a separate thumb) became glass's integrated-thumb scrubber, with the fill and thumb as one pill. "Displayed harmonics" sits ~4 px lower. That is OD19-F7, the owner's 2026-10-19 docket row "Sliders have a double border: use glass-ui sliders with the integrated thumb", landed by `976a704`, which re-baselined no visual-checkpoint golden.

## 6. Item 3, attributed, then the verify that counts
- **Void legs, recorded.** The first item-3 admission (00:24:52Z) collided on port 8191. Another seat's `node e2e/smoke/perf/serve-built.mjs` held `127.0.0.1:8191`, while our uvicorn bound `0.0.0.0:8191`, so `POST /api/sessions` returned that server's HTML and `global-seed` threw `Unexpected token '<'`. Those four logs are renamed `*.INVALID-port.log` and not cited. The harness API moved to `:8197` (`linux-in7.sh`).
- ⟨plan `976a704:D3a L3a` (item 3), `f7d17f0:DU3 LU3` (item 3, update), 00:27:22–00:28:29Z⟩ →
  - D3a `1 failed` (1124 px), L3a `1 failed` (1014 px), the same counts as at `f7d17f0`. With `563814d` passing, **`976a704` is the commit that moved item 3**.
  - DU3 / LU3 → `1 passed`, `checkpoint-disclosure-body-chromium-{darwin,linux}.png is re-generated`. The other five linux goldens re-generated byte-identical (`cmp` same).
- Read: the new linux golden shows the same panel as the darwin actual (Function / Domain / Compute / Presets / Series), with the Harmonics slider now one integrated pill. Bytes: darwin 49944→49855, linux 42055→41984. sha256 (first 16): darwin `d082f1d5223a280c` · linux `e204690ff5ac9377`.
- fourier **`924df31`** (pathspec: the two `checkpoint-disclosure-body-*.png`). It sits on `2a3651d` (X·OD19 P3, which also landed meanwhile and changed `EquationView.vue`).
- ⟨plan `924df31:D1v L1v D2v L2v` (all 5, no update), 00:31:30–00:32:44Z⟩ →

| run | darwin (headless) | linux (`playwright:v1.61.0-noble`) |
|---|---|---|
| 1 | ⟨`vb7-darwin-D1v.log`⟩ → `5 passed (9.3s)` rc=0 | ⟨`linux-r7-L1v.log`⟩ → `5 passed (19.1s)` rc=0 |
| 2 | ⟨`vb7-darwin-D2v.log`⟩ → `5 passed (6.4s)` rc=0 | ⟨`linux-r7-L2v.log`⟩ → `5 passed (15.6s)` rc=0 |

**visual-checkpoint 5/5 GREEN ×2 in the container and ×2 on darwin, at `924df31`.**

## 7. vue-tsc, vitest, and the fresh m/w1 CI
- Gate worktree `fourier/.worktrees/v3`, detached and clean, with `web/node_modules` linked to the scratch tree's (no web package change in `24a524a..924df31`: ⟨`git diff --stat … -- web/package.json web/package-lock.json`⟩ → empty).
  - ⟨`guarded --light -- npx vue-tsc -b`⟩, tsbuildinfo deleted before each run: rc 0 ×2 at `563814d`, ×2 at `f7d17f0`, ×2 at `924df31`.
  - ⟨`guarded -- npx vitest run --maxWorkers=2`⟩: `Test Files 20 passed (20) · Tests 116 passed (116)` ×2 at each of those three SHAs.
- m/w1 pushed: ⟨`git push origin m/w1-bump-migration`⟩ → `origin/m/w1-bump-migration` = `924df31`. `f7d17f0` had already reached origin through a sibling's push of `2a3651d`.
- ⟨`gh workflow run ci.yml --ref m/w1-bump-migration`⟩ → run **`39348303989`** (`924df31`, workflow_dispatch, 00:33:01Z → 01:37:19Z) → **failure**:
  - api ✓ · web ✓ · prod-compose ✓;
  - e2e ✘ `8 failed · 5 flaky · 3 skipped · 541 passed (57.9m)`;
  - **visual-checkpoint 6/6 ✓**: chromium `:81` `:102` `:123` `:145` `:164` + mobile-chromium `:199`.
- The 8 failures (5 tests). None was in the post-.s1 reading `39340556816` (`563814d`: `3 failed` = the three visual items · `1 flaky` · `526 passed`):
  - `f-w14u-vedit.spec.ts:345` v242: `hovered Save wears the Fourier red`, expected `oklab(0.488282 0.130899 0.0775813)`, received `oklab(0.456907 0.122488 0.0725963 / 0.98419)`;
  - `f-w14u-vedit.spec.ts:573` v178: `the Terms track is found`, received `null`;
  - `f-w14u-vstage.spec.ts:373` e171 (1440 + 390): `[style*="--row-fill"]` count, expected > 3, received 0;
  - `od19-p3-shell-motion-loading.spec.ts:98` F5·ALL (light/dark × 1440/390): `/paper: frames with the route window below opacity 1 {"frames":32,"vtFrames":1,…}`, expected ≥ 6.
- **Attribution by elimination.** ⟨`git log --oneline 563814d..924df31 -- web/src`⟩ → exactly two commits, both X·OD19: `976a704` (P2 sliders: `SliderControl.vue` rewritten; the `--row-fill` / Terms-track probes) and `2a3651d` (P3 shell motion: the route crossfade; its own falsifier is one of the reds; a mid-crossfade alpha of 0.98419 on the hover colour). `d5a48cf` touches no web path. This unit's commits are PNG-only.
- **Consequence:** the fresh m/w1 CI is RED outside this unit's items. The merge to master is **not made**. A merge would carry a known e2e red to master, where the gate is GREEN ×2 with no retry-until-green.
  - The reds are the X·OD19 fourier lane's (§0gf.5: its paths, its in-flight unit, never touched by this seat).
  - `e928541` (X·OD19 P1) has landed on m/w1 since, and no CI has read it.

## 8. State at hand-off
- **Done:** items 1·6·7 / 2 / 8 (and item 3, which a sibling commit reddened during this unit) are GREEN ×2 in the container and ×2 on darwin, and 6/6 on CI `39348303989`. vue-tsc rc 0 ×2 and vitest 116/116 ×2.
- **Not done (blocked; escalated):**
  - fresh m/w1 CI GREEN;
  - the merge to master;
  - master CI GREEN ×2. That reading also discharges `.m2`'s and `.s1`'s master gate, so it is not discharged.
- Harness (private, not in a repo): `~/.fourier-frel/vb/r7.sh`, `r7-outer.sh`, `v3-plan.txt`, `linux-out/linux-in7.sh`; logs in `~/.dev-logs/frel/vb7-*` and `~/.fourier-frel/vb/linux-out/linux-r7-*`.
