# X-OD19 · CLOSE (owner docket 2026-10-19; COHESION §0gf)

Close seat, 2026-10-21, `claude-opus-5-5`, verify-and-record only (no source change). Inputs: the docket (`waves/owner-2026-10-19/DOCKET.md`, 25 rows, 19 frames), the three lane receipts (`OD19/value.md`, `OD19/keyframes.md`, `OD19/fourier.md`), each lane's critic passes and repairs, the glass 10.1.1 adoption receipts and the fourier CI-green receipt. Every commit cited below was re-read with `git log -1` in its own repo at this close.

**Verdict: CLOSED 2026-10-21 honest-RED.**
The 25 rows fall into four groups:
- **CURED whole, with commit and falsifier: 14.** V4, V6, V8, F1, F3, F4, F5, F7, F8, K1, K2, K3, K4, K6.
- **CURED at every consumer root, with the budget ESCALATED: 4.** V3, V5, V7, ALL.
- **Consumer half CURED, glass half GLASS-HELD under O-102: 4.** V2, F2 (canvas-dock half), F6 (the ellipse), K7 (the glyph-less dot).
- **GLASS-HELD whole, with the glass cause measured: 3.** V1, K5, K8. No consumer cause exists for these.

The letter is `V/coordination/valuejs-outbound-2026-10-19-o102-owner-dock-docket.md`, mirrored to glass `BK/coordination/`.

The escalated budgets have measured reasons:
- the V3 latency bar;
- the V5/V7/ALL frame and hop bars at 390 and under software GL;
- fourier's ESC-FREL-ci-1 (one red left in CI);
- the keyframes warm-swap frames.
- Critics: fourier's pass 1 was CLEAN. value and keyframes each ran three passes. Each pass's consumer findings were cured or routed, but neither app's last pass was clean, so §0gf.6's stopping rule is **not discharged** for value or keyframes (see §4).

## 1. Rows

Commits name their repo: v = value.js (`tranche-u`), kf = keyframes.js (`master`), f = fourier-analysis (`m/w1-bump-migration`). All are pushed.

| row | state | commit(s) | falsifier / measured close |
|---|---|---|---|
| OD19-V1 dock ellipse (value) | **GLASS-HELD (O-102 §1)** | — (no consumer cause found) | The diagnose finds glass twice. (a) `run.css` `.glass-dock{--dock-cap-rest: 50%}`: tools@1440 plate 342×61 paints `50% calc(45.83% + 1.33px)`. (b) `crossfade.css` absolute inactive faces overflow the run (sw 322 > cw 318 @1440 tools; 318 > 164 @390 rest), which arms the cut-cap timeline. Re-read in the 10.1.1 dist at this close: `--dock-cap-rest: 50%` is unchanged. The docket's "consumer cause cured locally" has no object: no consumer selector touches the plate radius. |
| OD19-V2 dock motion (value) | **CURED (consumer half) · GLASS-HELD (glass half, O-102 §2)** | v `006fd567a` (vj-settle armed after `[data-morphing]` clears, on the trigger/seal, never the host) · v `7b437814e` (C3-V-02: the dock's field takes glass's `--dock-control-size`) | `e2e/smoke/od19-v2-dock-settle.spec.ts`: RED, then GREEN ×2 at 006fd567a and GREEN 2/2 again on 10.1.1 (host transform in 0 frames; cx drift 0 px at 1440 and 390). `probes/r3-dock-height.mjs` RED→GREEN. Glass half: V2-a (swap/collapse width does not interpolate: 2–3 distinct widths), V2-b (start-edge clip-path reveal), V2-p (crossfade peak latches a 3 px `scale` overflow). Limit: a hash view switch never enters `[data-morphing]`, so the gate was never exercised mid-morph. w12-dock was not re-certified on 10.1.1 (machine-bound goto timeouts); its known two-test regression is Track A's. |
| OD19-V3 colour latency | **CURED at every consumer root · ESCALATED (budget)** | v `61867fc32` (scheme tokens read once) · v `6095ee100` (certify memo) · v `9ed00b5cd` (C1-V-06 HeroBlob parked repaint coalesced into the frame) · v `de51e13c1` (C2-V-01 ink referent settles off the drag clock) | `colour-frame-cost.test.ts` case 5 RED ×2 → GREEN ×2. `probes/r1-hero-gbcr.mjs` base RED ×6 → cure GREEN ×6. `ink-referent-settle.test.ts` GREEN. Measured: `getPropertyValue` went from 839 ms self to under 16 ms; certify went from 1353 to 136 ms per drag; picker light-390 p50/p95 is 26.0–26.7 / 30–34 ms and light-1440 31–33 / 54–58 ms (BEFORE 72–140 / 103–320). The bar (p50 ≤ 25, p95 ≤ 50) is still missed by ≤ 8 ms. On the built bundle the consumer script is 0.3–1.2 ms per frame (C3-V-04); the residual is frame production under SwiftShader, plus glass sub-row V3-g (O-102 §8). |
| OD19-V4 "Home" caption shift | **CURED** | v `bdd97b752` | `e2e/smoke/page-load.spec.ts`: the Gradient→Home pane-row y-delta is 0 at 1440 and 390 (RED: 88→113 / 104→127). A5's DOM label and `MAIN_PANE` are kept. |
| OD19-V5 complex routes slow | **CURED (route roots) · ESCALATED (title budget at 1440)** | v `091f86da2` (intent + idle warm) · v `bf1f02d8a` (the deep link's pane graph starts at router module evaluation) | `e2e/smoke/perf/od19-route-load.spec.ts` RED 14/15 failed → GREEN 15/15 ×2 (pane-request gap 258–673 → 82–135 ms). The od19-pane-swap hop to gradient makes 0 pane requests. Still over: gradient title @1440 487–544 ms against 400, which is incoming-pane mount/draw under software GL (P3 residual 1). |
| OD19-V6 loading text → skeleton shimmer | **CURED** (glass shimmer adopted from 10.1.1) | v `bdd97b752` (wordless plate; status on its own root) · v `9ed00b5cd` (`<Skeleton shimmer>` on 10.1.1) · v `de51e13c1` (plate reserves the band) | `pane-plate-shimmer.test.ts` RED ×2 → GREEN. page-load V6 falsifier: role=status, aria-busy, aria-label, innerText ''. Live re-read on 10.1.1 (`probe-v6-menu-1.json`): `::after` `skeleton-shimmer` moving at 1440 and 390. No local animation. Glass sub-row V6-b (Card clobbers a consumer `role`) is O-102 §9. |
| OD19-V7 pane transitions janky | **CURED (consumer roots) · ESCALATED (frame budget)** | v `091f86da2` (±1.5 rem opacity-led swap, no rotate, out-in kept) · v `9ed00b5cd` (C1-V-05: incoming mount frame cut 30–40 %) | od19-pane-swap: mix@1440 is within budget. Still over: the 390 moving window is 508–867 ms against 450, and no-frame-over-50 ms is not met under SwiftShader (VizCompositorThread 826 ms against 230 ms main). Carried as C1-V-05 / C3-V-05. |
| OD19-V8 rail border | **CURED** | v `bdd97b752` | page-load V8: `.channel-rail` border-top and border-left are 1 px solid (RED: 0 px). |
| OD19-F1 transport dock collapsed/expanded | **CURED** | f `e928541` | `web/e2e/od19-p1-transport-docks.spec.ts` 16/16 (re-run on the re-deploy). GREEN on CI `39595581721` after the test-only fix 73fca89 (no-snap arm). |
| OD19-F2 small docks shift | **CURED (transport half) · GLASS-HELD (canvas-dock half, O-102 §2)** | f `e928541` | Same falsifier. Glass: G-F2a (first expand publishes `--dock-expanded-px` = collapsed size, 650 ms no-op then a 96→338 snap), G-F2b (centre origin on an end-anchored dock, +121 px settle jump), G-F2c (0.06 scale clamp, 57 px undershoot). |
| OD19-F3 Speed/Easing in ⋯ | **CURED** | f `e928541` | od19-p1 (two `DockTrigger for="dropdown"` seats). Glass sub-row G-F3 (EasingCurve has no caption-free glyph mode) is O-102 §7. |
| OD19-F4 dropdowns survive collapse | **CURED** (consumer `keepOpen()/release()` + glass 10.1.1 collapse-close) | f `e928541` · f `e4c2e1d` (10.1.1 repin) | od19-p1. The 10.1.1 MIGRATION names keepOpen/release as the hold seam. |
| OD19-F5 square border + route motion | **CURED** | f `2a3651d` | `web/e2e/od19-p3-shell-motion-loading.spec.ts` 16/16 ×3 (run 1 15/16 was a vtFrames cadence flake under load 22–29, assertion unchanged). CI's od19-p3 reads the View Transition record (f `a354b68`). |
| OD19-F6 toggle bigger + ellipse | **CURED (toggle) · GLASS-HELD (ellipse = V1, O-102 §1)** | f `2a3651d` | Toggle ink sun 23.8 / moon 23.7 px (BEFORE 20×19 / 13×17). Ellipse: G-V1, the collapsed 96×56 canvas dock reads `start-start 50%` while its run overflows (274/96). |
| OD19-F7 slider double border | **CURED** | f `976a704` | `web/e2e/od19-p2-sliders-caret.spec.ts` RED 6/6 → GREEN 8/8; glass `Slider variant="scrubber"`. The BL-FW14H-1 visible-thumb ruling is reversed by owner row OD19-F7. |
| OD19-F8 time popover clipped | **CURED** | f `976a704` (caret is glass's portalled Tooltip) | od19-p2. Glass's half (G-F8, floats portal by default with a guard test) shipped in 10.1.1 per O-102c. |
| OD19-K1 remove "Pause the title animation" | **CURED** | kf `eb4048fe` (KF.DS.r1, §0gf.2(b)) | `test/demo/instrument/hero-motion-park.test.ts` + `hero-wave-pause.test.ts`. Motion still honours reduced motion and parks when hidden or offscreen. |
| OD19-K2 docks centred | **CURED** | kf `13762e6e` | `chrome-dock-containment` + `dock-surface-items` RED ×2 → GREEN ×2 (14/14). Probe: dock cx = innerWidth/2 in all 16 cells (BEFORE 957.6 against 720). |
| OD19-K3 direction/fill icons | **CURED** | kf `eb2b7bc1` · kf `e414a40f` · kf `6ab81299` (C2-KF-02: one `OPTION_GLYPHS` table) | `channel-options-w13x` (17) RED → GREEN ×2. Probe: 2 svgs per trigger; glyph x equals the easing glyph's. Glass sub-row: SelectTrigger's chevron rotates under any open ancestor (C1-KF-09, O-102 §6). |
| OD19-K4 Reverse/Preview into the ball | **CURED** | kf `eb2b7bc1` · kf `2457f241` (C1-KF-11) · kf `6ab81299` (C2-KF-02) | `playback-ribbon-contract`. Live: no verb row; Reverse and Preview are discs with aria-pressed; the row stays 64 px. |
| OD19-K5 title hover not rounded | **GLASS-HELD (O-102 §4)** | — (the consumer only hosts glass's configurator) | `.configurator-layer-trigger:hover` (configurator/styles.css:255-261) paints a 5 % fg wash at radius 0 inside a 16 px (390: 12 px) unclipped layer. Frames: `keyframes/before/K5-title-hover-*.png`, `critic1-kf/K5-title-hover-*.png`. |
| OD19-K6 icon trio → titled dropdown | **CURED** | kf `13762e6e` · kf `2457f241` (C1-KF-10 radio rows) · kf `6ab81299` (C2-KF-03 titles) · kf `8876e82e` (C3-KF-04 at 390) | `dock-surface-items` GREEN ×2. Residual outside the set: `scripts/lib/demo-driver.mjs:941` and `scripts/observe/demo/live-session{,-mobile}.mjs` still read `[data-dock-surface-item][data-selected]` (a script fix, not a product row). |
| OD19-K7 code colours + bigger dot | **CURED (consumer half) · GLASS-HELD (glyph-less dot, O-102 §5)** | kf `be52ee80` · kf `2457f241` (C1-KF-04: six inks of six hues) | `css-code-editor-seam` RED → GREEN ×2. 6 distinct inks in `.view-lines` (BEFORE 3). The status word is the StatusDot label; the dot is 10–11.6 px (BEFORE 7/6). The check glyph is glass's `.feedback-mark[data-state=success]::after` and is not masked. |
| OD19-K8 dock left side not rounded | **GLASS-HELD (O-102 §1)** | — | The collapsed run overflows (419/56 @1440, 333/56 @390), so the cut cap paints `50% 16px 16px 50%`. Frames: `keyframes/before/K8-collapsed-puck-zoom-dark-1440.png`, `K8-spring-settled-*.png`. |
| OD19-ALL loading + route motion | **CURED (each app's measured roots) · ESCALATED (residual budgets)** | v `bf1f02d8a` `091f86da2` · kf `9439cfb7` `38951f24` `2457f241` `8876e82e` · f `ac9d514` `2a3651d` | `od19-route-load.spec.ts` (v) GREEN 15/15 ×2. kf `route-load.mjs` + `scene-swap-w13x` 5/5. f `web/e2e/od19-load.spec.ts` 19 tests: local GREEN, but CI 39595581721 has one red (ESC-FREL-ci-1, §5). Tables in §2. |
| X-DS residual · PaneShell `seated` | **DISCHARGED before the wave** | v `4fe9b05b9` | Census: 10 `<PaneShell` users, none seated (records corrected by C1-V-07). |

## 2. Load, before → after

Instrument for every app: production build, headless Chromium, CPU 4×, guarded, one browser per run and a context per cell, runs interleaved on a shared machine (load 17–42). Full tables are in each receipt's `### load`.

### value (`value.md` ### load; cure `bf1f02d8a`)
Cold deep link, pane chunk requested after the entry chunk: **258–673 → 82–135 ms** on every lazy route (falsifier RED 14/15 → GREEN 15/15 ×2). On localhost, cold content does not move beyond noise. Under a stated network (150 ms RTT, 1.6 Mbps, CPU 4×, 1440), median cold content:

| route | before ms | after ms | Δ |
|---|---|---|---|
| gradient | 5356 | 5385 | neutral (130 KB CSS grammar in the chunk, escalated) |
| mix | 4382 | 4140 | −242 |
| palettes | 4418 | 4101 | −317 |
| extract | 4673 | 4370 | −303 |
| generate | 4453 | 4229 | −224 |
| blob | 3627 | 3466 | −162 |

Localhost, CPU 4×, 1440, cold content (r1 / r2): gradient 993 / 1063 → 970 / 1100 · mix 949 / 1187 → 997 / 927 · palettes 972 / 1868 → 832 / 1137 · home 1596 / 1073 → 819 / 1188.

### keyframes (`keyframes.md` ### load; cure `9439cfb7`, repairs `2457f241` `8876e82e`)

| cold route | content ms (before → run 1 / 2) | JS KB before content | home-only Aurora fetched |
|---|---|---|---|
| home | 577 → 553 / 498 | 1096 → 1096 | yes → yes |
| cube | 833 → 652 / 652 | 1096 → 885 | yes → no |
| amiga | 1113 → 699 / 800 | 1704 → 1424 | yes → no |
| square | 934 → 729 / 831 | 1111 → 901 | yes → no |
| easing | 1063 → 794 / 936 | 1109 → 898 | yes → no |
| spring | 1059 → 651 / 798 | 1138 → 927 | yes → no |
| sequence | 887 → 577 / 639 | 1105 → 894 | yes → no |

Warm swaps, total ms: cube→amiga 1371 → 949 / 1031, sequence→cube 1304 → 980 / 1110, square→easing 1080 → 891 / 952. Scene-swap input→hash: **451–479 → 37–76 ms** (`38951f24`). Editor open: 276–407 → 46–67 ms input→paint (`be52ee80`).

### fourier (`fourier.md` ### load; cure `ac9d514`)
Eager boot JS **1,349 → 460 kB (−66 %)**. Cold JS per route, KB: paper 1790 → 1432, visualize/visualization 1444 → 1162, gallery 1392 → 798, equation 1389 → 1079, morph 1342 → 740, admin 1392 → 839. Cold content @1440, ms (r1 / r2): visualization 1025 / 708 → 783 / 998, gallery 592 / 613 → 552 / 688, morph 647 / 484 → 628 / 570. equation 2129 / 1776 → 1855 / 6847, but its own time is 413–417 ms; the rest is the `/api/equations/compute` wait (escalated). Prefetch on intent: input → painted series 1860 → 89–114 ms (`2a3651d`).

## 3. glass 10.1.1 (adopted in all three apps)
- value `9ed00b5cd` pin + `f77db7842` (five `z-popover` lifts retired).
- keyframes `8876e82e` pin + `f8d6077b` (three lifts retired).
- fourier `e4c2e1d` repin, with the cold-load Skeletons shimmering.
- Delivered from O-102: (3) collapse closes face overlays, (4) the Skeleton shimmer, and (6) floats portalled by default with a guard test.
- Still open in glass: §1–§9 of the O-102 letter.

## 4. Critic verdicts (one fresh adversarial critic per app, §0gf.6)

| app | pass | findings | cured | left open (verdict) |
|---|---|---|---|---|
| fourier | 1 | — | — | **CLEAN** |
| value | 1 | 4 consumer | C1-V-01, C1-V-06, C1-V-07 | C1-V-05 PARTIAL (mount frame −30–40 %, frame budget unmet) |
| value | 2 | 3 | C2-V-01 (root; bar missed by ≤ 8 ms), C2-V-03 @1440, C2-V-05 | C2-V-03 @390 PARTIAL (0.766; 223 px below the fold) |
| value | 3 | 4 | C3-V-01 (Tailwind `source(none)`; the :9000 stall), C3-V-02 (consumer half) | C3-V-04 PARTIAL (raster, V3-g), C3-V-05 carried under C1-V-05 |
| keyframes | 1 | 5 | C1-KF-04, -10, -11; -03 partial | C1-KF-09 GLASS-ROOTED (chevron, O-102 §6) |
| keyframes | 2 | 3 | C2-KF-02, -03 | C2-KF-01 ENVIRONMENT-ROOTED (SwiftShader; GPU witness clean) |
| keyframes | 3 | 4 | C3-KF-01, -02, -04 | C3-KF-03 MEASURED (forced capture of the View Transition's suppressed update window) |

**The stopping rule is not met for value or keyframes:** neither app's third pass was clean, and a fourth pass was not run. The open items are frame-production budgets under software GL plus glass sub-rows; none is an unrouted consumer defect. They are carried by §5.

## 5. Escalated (owed a ruling or a follow-up packet)
1. **OD19-V3 budget** (p50 ≤ 25 / p95 ≤ 50): the consumer roots are all cured, and the residual is raster plus glass V3-g. Ask: re-rule the bar on a GPU instrument, or route it whole to O-102 §8.
2. **OD19-V5/V7/ALL (value) frame and hop budgets:**
   - gradient title @1440 487–544 ms (bar 400);
   - 390 moving window 508–867 ms (bar 450);
   - the hop has no bar (310–1460 ms quiet, 2.2–6.2 s at load 30+).
   The cause is incoming-pane mount/draw under SwiftShader (C1-V-05). value routes:
   - the gradient chunk's 130 KB CSS grammar goes to the V·π / BBNF law;
   - warm-reload entry evaluation (1.6–4.5 s) goes to X.W11.p2 (Track A);
   - the API CORS allowlist names only :9000 (measured harmless to content).
3. **ESC-FREL-ci-1 (fourier):** `od19-load` equation nav frame bars RED on CI 39595581721 (@73fca89): over50 33/39/39 against 20, and max gap 500/650 ms against 450. Three arms are proposed (exclude the /api wait span; move the frame arm to `@gpu`; server-cache the default series). No bar was moved. Track C's F.REL merge stays blocked until m/w1 is green. Six pre-existing CI flakes need a cure seat.
4. **keyframes frame residuals:** warm swaps keep 3–7 frames over 50 ms inside the View Transition commit span. The Spring mount's forced layout (`AnimationVisualizer.vue:73`, `useFoldLanding.ts:358`) belongs to the scene/pane packets. Keyframes-editor open is 763–889 ms at 4× (Monaco evaluation is the floor). Hover-warm of the Scene trigger needs `ChromeDock.vue`.
5. **Not re-certified on 10.1.1:** value `w12-dock.spec.ts` (machine-bound goto timeouts, and the known two-test HEAD regression routed to Track A). The last green is 6/6 ×2 at `006fd567a`.

## 6. Law kept
- No golden was re-baselined by any OD19 unit.
- No test was deleted, skipped or weakened. The fourier CI-green commits are test-only and their assertions are unchanged.
- glass-ui was untouched by every lane. This close writes only the BK mirror letter, and does not push glass.
- shadcn `demo/@/components/ui/**` was untouched.
- Commits were pathspec-only. Other seats' dirty hunks (SS-8, Track A) were never staged or reverted.
