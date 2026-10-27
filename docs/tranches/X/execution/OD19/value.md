# OD19 · value · DIAGNOSE (owner docket 2026-10-19, rows OD19-V1..V8, the value half of OD19-ALL, and the X-DS value residual)

SERVED MODEL: vite dev at http://localhost:9000 (pid 12243, started 2026-10-19 14:02:04, cwd /Users/mkbabb/Programming/value.js), API :3000, value.js HEAD `9f99eb5fd` plus Track A's dirty hunks (color-model.ts, useColorPipeline.ts, useColorNameResolution.ts, useCustomColorNames.ts, ColorPicker.vue, header.css, HeroBlob.vue, foundation.css), glass-ui 10.1.0 from node_modules. Probes ran headless (Playwright headless shell, one browser per run, one context per cell) through `guarded`. Machine load during the runs was 17–42 (1-minute).

The dev server is a shared seat. From 14:38 to 14:46 port 9000 answered nothing (curl timed out at 60 s and 90 s; the vite process held 3.5 GB RSS at 58–65 % CPU). Two motion cells (light-1440, dark-390) timed out on `goto` in the second motion run for that reason. Every row is still measured in at least one light and one dark cell, and at 1440 and 390, across `motion.json` and `latency-load.json`.

Evidence: `value/before/` (PNGs, `motion.json`, `latency-load.json`, `detail.json`, `v3-profile.json`). Probe scripts: `value/probes/motion.mjs`, `latency-load.mjs`, `detail.mjs`, `v3-profile.mjs`, `v1-ellipse.mjs`, `dom-dump.mjs`.

## Diagnose

| row | reproduced (BEFORE, measured) | root cause (file:line) | owner |
|---|---|---|---|
| OD19-V1 | Reproduced (`v1-dock-tools-1440-dark.png`, `v1-band-tools-dark-1440.png`, `v1-band-rest-light-390.png`). With Tools open at 1440 the plate paints `border-radius: 50% calc(45.83% + 1.33px) …` on a 342×61 box, which draws an ellipse inside the pill. The run measures scrollWidth 322 against clientWidth 318, so its scroll timeline is active. At 1440 rest the run fits (463/463) and the radius is 9999px. At 390 rest the run is 318/164 and the radius is `50% / calc(0% + 16px)`, so the left cap is elliptical. | glass, twice. (a) `dist/components/dock/styles/run.css`: `.glass-dock{--dock-cap-rest: 50%}` feeds the `gl-dock-cap-inline-*` scroll-timeline keyframes on `.dock-plate`. A percentage radius on a non-square plate is an ellipse; the rest value should be the pill radius. (b) `crossfade.css`: an inactive `.dock-face` is `position:absolute; inset:0`, and its nowrap content overflows the run. That makes the run scrollable and arms the cap timeline even when the active face fits. No consumer code sets either one. | glass |
| OD19-V2 | Reproduced, dark-1440 and light-390 (`motion.json` v2_*, `v2-strip-*`). Home→Tools: the plate width goes 487→342 with only 3 distinct widths across a 1.6 s trace, a snap and not a morph. The 390 swap has 2 distinct widths (188↔342). The idle collapse snaps: 2 changed frames in the 3.6–4.2 s window. Expand does interpolate (26 distinct widths, 56→487 over ~260 ms) and stays centred (cx drift ≤1 px), but the active face content is revealed from the inline-start edge, not from the centre. The 1440 cells show 16–26 frames over 34 ms during the swaps. | glass: the layer-swap and collapse width morph does not interpolate, and `crossfade.css` `.dock-face.is-active > .dock-face-content{clip-path: inset(0 calc((1 - var(--dock-morph-t))*100%) 0 0)}` reveals left→right (D2 R1-R8). consumer: `demo/shell/dock/Dock.vue:173-182` (`dockSettle` re-armed on every view change) with `:418-420` (`.dock-settle { animation: vj-settle }`, scale 1→1.03→1 on the dock HOST, `animations.css:170-174`). It runs on top of glass's own width morph on the same frame, so two transforms compound on a view switch. | both |
| OD19-V3 | Reproduced on the picker's channel slider in all four cells (`latency-load.json` v3_pickerSlider). Input→paint p50/p95 is 72/127 ms dark-1440, 140/320 light-1440, 53/103 dark-390 and 111/285 light-390. There were 34–43 long animation frames per 41-step drag, with 488–3513 ms blocking. The gradient workbench slider is fast (p50 12–23 ms, 0 LoAF), so the cost is in the picker colour fan-out. The profile (`v3-profile.json`, dark-1440): `getPropertyValue` self time is 839 ms, and all of it is under `schemeTokenCss`. `goldIdentityCss` accounts for 695 ms inclusive, `certifyAccentInk` 589, `resolvePalettesRamp` 356. LoAF attributes the frames to `useAtmosphereFrameCoalesce.ts::publish`, the rAF clock everything above hangs off. | consumer. (1) `demo/color-session/useContrastSafeColor.ts:491-496` `schemeTokenCss` calls `getComputedStyle(documentElement).getPropertyValue()` for a scheme-constant token (`--color-gold`, `--destructive`). It is called from the computeds at `:401,:415,:435,:443,:456`, from `Dock.vue:119` and from `useViewAccents.ts:217`, and each call lands after that frame's `setProperty` writes, which forces a full style recalc. (2) `demo/app/composables/boot/useViewAccents.ts:160-194` re-mints two `resolvePalettesRamp` ramps on every colour frame (`palettes-ramp.ts:115-134`, one `certifyAccentInk` bisection per stop, `ink.ts:119/256`). They feed the view-select menu and the Palettes title, neither of which is on screen during a picker drag. | consumer |
| OD19-V4 | Reproduced, dark-1440 and light-390 (`v4-strip-toHome-*`). Gradient→Home: the visible `h1#route-title` "Home" mounts at y88 (17 px tall, 1440) or y104 (390), and the pane row is pushed from y88 to y113 (+25 px, 1440) and from ~104 to 127 (+23 px, 390). The reverse shift happens on every Home→titled route. | consumer: `demo/app/App.vue:90-97` (`<h1 v-if="!routeTitledByPane" class="route-title …">`, a visible in-flow block) with `App.vue:481-505` (`.route-title` margin 0 auto 0.5rem, caption type). The §0gf.2(a) cure is visually-hidden text, kept in `<main>`. | consumer |
| OD19-V5 | Gradient and Mix load in every cell; no console errors and no failed requests (`latency-load.json` v5_*). The cold-load title paints at 0.45–1.38 s (gradient) and 0.36–0.45 s (mix) when the server is quiet, and at 11.1 s (gradient) and 3.4 s (mix) light-1440 under contention, with the loading plate seen. A cold load issues 327–383 requests (250 resources). The in-app second visit is 257–352 ms. The "does not load" report reproduces only as the shared dev server's stall (14:38–14:46, above). Inside a stall the pane's 20 s bound (`PANE_LOAD_TIMEOUT_MS`) fires the error plate. | consumer: there is no intent prefetch. `preloadPane` (`demo/shell/usePaneRouter.ts:273-276`) is called only when the swap commits (`demo/shell/PaneSlot.vue:188`), so a route's chunk graph is fetched only after the click. `usePaneRouter.ts:322-337` lazy panes are never warmed after first paint. The served model is unbundled dev, so each first visit pays the per-module request fan-out. Boot is X.W11.p2's and is not duplicated here (§0gf.4). | consumer |
| OD19-V6 | Reproduced in all four cells (`v6-loading-plate-*.png`, gradient chunk held 4 s): the plate shows "Loading the scene…" in display type under two skeleton bars. The plate is shorter than the pane it stands in for, so the height jumps when the chunk lands. | consumer: `demo/shell/PaneLoadingPlate.vue:23` (the visible `<p>`). The busy name belongs on the `role="status"` Card (`:18`, `aria-label`). glass: the shimmer is declined on glass's record and relayed as the owner's ask (DOCKET glass answers). The consumer keeps glass `Skeleton` and adds no local animation. | both |
| OD19-V7 | Reproduced, dark-1440 and light-390 (`motion.json` v7_*). Home→Mix: the inspector pane leaves to x1548 (110 % plus 2° rotate), and only then does the incoming pane travel back in. The moving window is 305→1161 ms (1440) and 40→763 ms (390). The worst frame mid-swap is 214 ms (1440); LoAF for the swap is 105 ms, which is the incoming pane's mount. | consumer: `demo/shell/PaneSlot.vue:325-329` (`<Transition mode="out-in">`) serialises leave (`--duration-normal` 0.3 s) then enter (`--spring-present`). The travel is `demo/styles/animations.css:254-262` (`translateX(±110%) rotate(±2deg)`), mirrored at `:279-284`, so each swap crosses more than a card width twice. | consumer |
| OD19-V8 | Reproduced in all four cells (`v8-rail-*.png`): the L/a/b/α rail has `border: 0px`, `box-shadow: none` and a transparent ground, so the letters float with no enclosure. | consumer: `demo/picker/controls/ComponentSliders/ConsoleRail.vue:229-236` (X-DS pass 1 V1-21 removed the ring). The owner's word restores an enclosure as a single hairline. | consumer |
| OD19-ALL (value) | Route swaps are V7. Route loads are V5, which is cold-dev request fan-out with no intent prefetch. Colour latency is V3. | V5 + V7 roots above. | consumer |
| X-DS residual · PaneShell `seated` | DISCHARGED before this wave. Commit `4fe9b05b9` (2026-10-19 12:44) retired the prop and the `.card-scroll-host` branch at all 10 call sites. A census of every `<PaneShell` in demo/ finds no `seated` attribute, and PaneShell.vue declares no such prop. | none | none |

### glass-rooted sub-rows (named for O-102, measured)
- **V1-a** `run.css` `.glass-dock{--dock-cap-rest: 50%}`: the percentage cap radius paints an ellipse on a 342×61 plate (`50% calc(45.83% + 1.33px)`). The rest value should be the pill radius (`--radius-pill`).
- **V1-b** `crossfade.css` `.dock-crossfade > .dock-face{position:absolute; inset:0}`: an inactive face's nowrap content overflows the run (tools@1440 sw 322 > cw 318; main@390 sw 318 > cw 164). That arms the cut-cap scroll timeline on a run the active face fits. Same mechanism as keyframes K8.
- **V2-a** A layer swap and the idle collapse change the plate width in 2–3 discrete steps (no interpolation); expand interpolates (26 steps).
- **V2-b** The active face reveals with `clip-path: inset(0 calc((1 - t)*100%) 0 0)`, from the inline-start edge, not the centre (owner: "expand FROM the dock from the centre").
- **V6** The Skeleton shimmer variant (the owner's verbatim "skeleton shimmer").

## Packets (consumer cures; modify-file sets disjoint; none touches a path dirty with another seat)

| id | rows | files |
|---|---|---|
| P1 | V4, V6, V8 | `demo/app/App.vue`, `demo/shell/PaneLoadingPlate.vue`, `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, `e2e/smoke/page-load.spec.ts`, `e2e/smoke/walk.spec.ts`, `e2e/smoke/fixtures/dock.ts` |
| P2 | V3 | `demo/color-session/useContrastSafeColor.ts`, `demo/app/composables/boot/useViewAccents.ts` |
| P3 | V5, V7, ALL | `demo/shell/PaneSlot.vue`, `demo/shell/usePaneRouter.ts`, `demo/styles/animations.css`, `demo/shell/dock/DockViewSelect.vue` |
| P4 | V2 (consumer half) | `demo/shell/dock/Dock.vue` |

P1: App.vue:90-97: keep `h1#route-title` in `<main>` (same id, `tabindex=-1`, `v-if`), make it visually hidden (`sr-only`), and delete `.route-title` and its media rule (481-505). Rewrite the comment to cite §0gf.2(a). page-load/walk A5 keep count, text and toBeVisible (a 1 px sr-only box passes); re-word their comments only. PaneLoadingPlate: delete the `<p>` and put `aria-label="Loading the scene"` on the status Card; size the plate to the pane (`h-full`). ConsoleRail `.channel-rail`: one hairline (`border: 1px solid var(--card-edge)`; owner word reverses V1-21). Falsifier: Gradient→Home pane-row y-delta 0 (motion.mjs v4) at 1440 and 390; plate innerText ''; rail border-width 1px; A5 e2e green.

P2: useContrastSafeColor.ts:491 `schemeTokenCss`: read each scheme-constant token ONCE per scheme (a memo keyed on token+dark, cleared when `isDark` flips). No computed reads `getComputedStyle` per colour frame. useViewAccents.ts:160-194: keep `--accent-view` per frame. Move the two `resolvePalettesRamp` mints off the drag clock to a trailing settle (one mint after the input settles, plus one on view or scheme change). No new module. Falsifier (latency-load.mjs + v3-profile.mjs, dark-1440 and light-390): picker slider input→paint p50 ≤ 25 ms and p95 ≤ 50 ms; `getPropertyValue` self time < 50 ms; the ramp tokens equal their pre-cure values once settled (unit test on the resolver unchanged).

P3: Warm intent. DockViewSelect calls `preloadPane` for an option on pointerenter/focus and for all options on menu open. usePaneRouter warms the remaining lazy panes once on idle (`requestIdleCallback`, after the boot's first paint; it does not touch p2's boot graph). PaneSlot keeps the `mode="out-in"` contract (ESC-W5t-2) but shortens the leave to `--duration-fast` opacity. animations.css:254-284: cut the role travel to a subtle offset (`translateX(±1.5rem)`, no rotate, mirror kept), so the family is kept but subtler. Falsifier: in-app first visit to gradient/mix title ≤ 400 ms on a cold-warmed page; swap moving window ≤ 450 ms; no frame > 50 ms in the swap trace at 390; walk/view-switch e2e green.

P4: Dock.vue:173-182 + :418-420: the `vj-settle` beat (kept, per the preserve-animations edict) no longer composes with glass's width morph. It is armed when the dock leaves `[data-morphing]`, not on the view-change tick, and it is moved from the dock host to the seal/trigger glyph. No local copy of glass's morph. The glass half (V2-a/b, V1-a/b) waits for the 10.1.1/10.2 repin. Falsifier: view switch at 1440 shows a single plate transform per frame (no `scale` on the host while `[data-morphing]`); cx drift ≤ 1 px; the dock-settle e2e stays green. Sequence behind Track A's ci4 if Dock.vue is dirty at dispatch.

### P4
**Row OD19-V2, consumer half. CURED.** File changed: `demo/shell/dock/Dock.vue`. New files: the falsifier `e2e/smoke/od19-v2-dock-settle.spec.ts` and evidence `docs/tranches/X/execution/OD19/value/after/P4/`.
- **Root.** The `dockSettle` watch re-armed `.dock-settle` on the view-change tick, and `.dock-settle` played `vj-settle` (scale 1→1.03→1) on the dock **host**, the plate glass morphs. The cure keeps the beat (preserve-animations edict; the keyframe in `animations.css` is untouched). It is now **armed only once `.glass-dock` is not `[data-morphing]`**: on the view change the arm is held for one rAF, then checked, and `useMutationObserver` on glass's `data-morphing` attribute releases it when the morph ends. The beat is **seated on the view glyph's carrier**: `.dock-settle :deep(.view-select-trigger)` when expanded, `.dock-settle .dock-seal` when collapsed. The host only holds the state class. `@animationend.self` became a handler filtered on `animationName === "vj-settle"`, because the event now bubbles from the seat. Glass's morph is only read (its attribute), never copied. The trigger's press `scale` is a separate property from the beat's `transform`, so the two compose.
- **Falsifier RED → GREEN ×2** (headless chromium, one context per cell, per-rAF trace across `#/`→`#/gradient` at 1440 and 390; `after/P4/trace.jsonl`).
  - RED (`red-run.txt`): the vj-settle start was `onHost: true` with no seat at both widths. The host carried a transform in 2 frames (1440) and 3 frames (390).
  - GREEN (`green-run-1.txt`, `green-run-2.txt`): 2/2 passed both runs. Host-transform frames 0. Each vj-settle start was seated on `trigger` or `seal` with `morphing: false`. cx drift was 0 px (≤ 1 px budget).
  - Honest limit: none of these hash switches entered `[data-morphing]` (morphingFrames 0 in every trace). The "no host transform while morphing" assertion passes because the host never transforms, and the morph gate was not exercised under a live morph.
- **Gates.** `vue-tsc -p tsconfig.demo.json` is clean. `tsc -p tsconfig.e2e.json` is clean for the new spec; its remaining errors are in other seats' untracked or dirty specs (ss8-b17, od19-pane-swap, ss8-b07). `vitest demo/test/shell/` passed 8 files / 34 tests (`vitest-shell.txt`). The dock e2e `e2e/smoke/w12-dock.spec.ts` passed 6/6 ×2 (`w12-dock-run-1.txt`, `w12-dock-run-2.txt`); its layer-switch census still waits on the vj-settle `animationend`, which now bubbles from the seat. No golden was re-baselined.
- **Glass half (O-102, not cured here):** V2-a (the swap/collapse width does not interpolate) and V2-b (start-edge clip-path reveal) are still adopted at the 10.1.1/10.2 repin.
- **Re-check 2026-10-20 ~~after the glass 10.1.1 adoption (`4d806342b`)~~ [2026-10-21 · repair 1, C1-V-01: this re-check ran on glass **10.1.0**. `4d806342b` changed only a workflow script, and value's `package.json` and `node_modules` both stayed at 10.1.0 until repair 1 repinned them. "Glass 10.1.1 does not change the result" below therefore reads "glass 10.1.0". The 10.1.1 re-run is under `### repair 1`].** No code change; the cure `006fd567a` is pushed on `origin/tranche-u`.
  - The falsifier `od19-v2-dock-settle.spec.ts` passed 2/2 in both runs (`after/P4/recheck-10.1.1-od19-{1,2}.txt`). In every trace, host-transform frames were 0, each vj-settle start was seated on the trigger and the seal with `morphing: false`, and drift was 0 px. Glass 10.1.1 does not change the result. `[data-morphing]` still did not fire on a hash view switch (morphingFrames 0), so the honest limit above still stands.
  - The dock e2e `w12-dock.spec.ts` was **not re-certified**: all 6 tests failed at `page.goto(... "load")` 60 s timeouts, before any dock assertion ran (`recheck-10.1.1.txt`, `recheck-10.1.1-w12-dock.txt`, `recheck-10.1.1-w12-dock-1.txt`).
    - The cause is the environment, not the dock. In the same window the falsifier's own `goto` timed out the same way. Port 8090 was held by another seat's guarded `vite --port 8090` (pid 88854, 90 % CPU, no HTTP reply in 30 s), and Playwright reuses that server. A rerun on a fresh server (`VJS_E2E_PORT=8097`) also timed out. Load was 25–45, with 90+ guarded runs queued.
    - The last green dock e2e is still the P4 6/6 ×2 at `006fd567a`. It needs a re-run on a quiet machine.

### P2

**Row OD19-V3. Code `61867fc32`. Verdict: PARTIAL.** Both named roots are cured and measured at about zero. The input→paint budget (p50 ≤ 25 / p95 ≤ 50 ms) is **not met**; the residual roots are outside the P2 modify set and are named below.

- **Cure 1** (`demo/color-session/useContrastSafeColor.ts` `schemeTokenCss`). The token is read from the cascade once per token per scheme. The memo is stamped by (caller `dark`, root `.dark` class, probe epoch), the same idiom as the tint cache above it, so a read that raced the class flip self-corrects. Empty reads are not memoised. The callers (the five computeds, `Dock.vue:119`, `useViewAccents` seal gold) are unchanged.
- **Cure 2** (`demo/app/composables/boot/useViewAccents.ts`). `--accent-view` is still written on every colour frame. The two `resolvePalettesRamp` mints moved off the drag clock. They run as one trailing mint 120 ms after the input settles, reading the latest accent and surface, so the settled tokens are byte-equal to a per-frame mint. They mint at once on the first run, a view change or a scheme flip. No new module, no shim.
- **Falsifier** `demo/test/color-session/colour-frame-cost.test.ts` (new; the only file outside the modify set). It checks:
  - (a) 40 colour frames trigger 0 `getComputedStyle` calls once the scheme is primed, and a flip re-reads;
  - (b) a 21-step drag writes `--accent-view` each frame and leaves the ramps on the pre-drag mint, and after settle the menu and title ramps equal a direct `resolvePalettesRamp` mint byte for byte;
  - (c) a view change mints at once;
  - (d) a scheme flip mints at once.
  - RED ×2 on the parent: 2 failed / 2 passed (`after/P2/vitest-red-{1,2}.txt`). GREEN ×2 on the cure: 4/4 (`vitest-green-{1,2}.txt`).
- **Gates.**
  - `vue-tsc` demo + test configs: clean (`typecheck.txt`). eslint on the 3 files: clean.
  - The tests touching these modules (`view-accents`, `contrast-floor`, the falsifier): 42/42 (`vitest-touched.txt`).
  - Full vitest: 1262 passed, 1 failed, 8 skipped (`vitest-full.txt`). Both failing files are browser-harness palette tests unrelated to P2. On rerun (`vitest-palettes-rerun.txt`), `plate-mass` passes. `palette-card-layout.test.ts` is a dirty SS-8 B13 born-RED spec owned by another seat.
  - No e2e spec covers these modules. No golden was re-baselined.
- **AFTER, clean A/B** (`after/P2/ab/`, `ab.sh`). Detached worktrees at the parent `bf5fcaa91` and the cure `61867fc32` were each served on their own dev server. Order base, cure, base, cure; the same probes (`latency-load.mjs`, `v3-profile.mjs`); dark-1440 and light-390.

| measure | base r1 / r2 | cure r1 / r2 |
|---|---|---|
| `getPropertyValue` self | 770 / 892 ms | absent from the top 25 (< 16 ms) ✔ |
| `resolvePalettesRamp` incl. | 320 / 379 ms | 6 / 7 ms (the settle mint) |
| dark-1440 picker p50 / p95 | 57.7/115.2 · 66.2/125.7 | 44.4/65.4 · 36.1/60.5 |
| dark-1440 LoAF n / blocking | 27/345 · 38/568 | 9/7 · 15/9 |
| light-390 picker p50 / p95 | 105.1/243.6 · 92.8/245.0 | 41.2/157.1 · 48.2/210.3 |
| light-390 LoAF n / blocking | 24/2379 · 27/2416 | 11/745 · 20/1212 |

- **Residual (budget not met; outside the modify set):**
  - (1) `certifyAccentInk` stays per frame at 171 ms inclusive per drag (`ink.ts:93/95/201`). It is reached through the live accent guard (`useContrastSafeColor.ts:248`) and the `safeCss` consumers: `ColorNutritionLabel.vue:33`, `useMarkdownColors.ts:24`, `ProfileSection.vue:56`, `useContrastSafeColor.ts:413/445`. These are about-scene and dock-menu inks mounted under the picker.
  - (2) light-390 still blocks 0.7–1.2 s per drag, so most of the light-cell cost lies outside these two roots.
  - (3) The main-tree runs (`run1/`, `run2/`, against the then-dirty tree, now committed as `143c778a2`) show `HeroBlob.vue:281` `repaintParked` (from the `watch.deep` at :301) at 482 ms inclusive per drag, through `getBoundingClientRect` at 543 ms self. This is the software-raster tier: per-frame forced layout on the headless tier. It was not in either A/B worktree.
  - These three need a follow-up packet (ink certify memo per (colour, surface), or keeping the off-screen `safeCss` consumers off the drag clock, plus the HeroBlob parked repaint). The shared `:9000` dev server, and a fresh one of ours, both hung at about 96 % CPU / 3.2–3.6 GB RSS after repeated loads, so the A/B used fresh servers per run.

### P3

Rows OD19-V5, OD19-V7 and the value half of OD19-ALL. Verdict: **PARTIAL — cured at the consumer roots, measured faster in every cell, and the falsifier's absolute budgets are still RED on two arms** (see residuals). Modify set only: `demo/shell/usePaneRouter.ts`, `demo/shell/dock/DockViewSelect.vue`, `demo/shell/PaneSlot.vue` (contract comment), `demo/styles/animations.css`. Falsifier added: `e2e/smoke/od19-pane-swap.spec.ts`. Probes: `value/probes/p3-warm.mjs`, `p3-swap-timeline.mjs`, `p3-vsfb-loaf.mjs`, `p3-built-ab.sh`.

**Cures**
- **V5, intent and idle warm.** `usePaneRouter.ts` exports `preloadView(id)`, which starts a view's lazy pane chunks now, and `warmViews(ids)`. One idle queue loads one pane at a time, each in its own `requestIdleCallback` slice (setTimeout hop on Safari; Save-Data warms nothing). `usePaneRouter` queues every lazy pane once, on `onMounted` after the window `load` event. The boot graph is untouched (X.W11.p2). `DockViewSelect.vue` calls `preloadView` on an option's `pointerenter`/`focus` and `warmViews(all options)` when the menu opens. The menu-open warm goes through the queue: a first cut fired every import at once and the view-switch run logged a 1329 ms task. A rejected warm is dropped, and the swap's own load still reports it. Probe `p3-warm.mjs`: on a fresh dev server every lazy pane is requested before the first hop, and the hop issues **0 pane requests** (`coldDuringGradient: []` in every after-run record).
- **V7, the pane swap.** `mode="out-in"` is kept (ESC-W5t-2). In `animations.css`, the role travel `translateX(±110%) rotate(±2deg)` / `translateY(±110%)` becomes `translateX(±1.5rem)` / `translateY(±1.5rem)` with no rotate. Enter-from and leave-to are `opacity: 0`, so the swap is opacity-led. The leave stays on `--duration-fast` and the enter on `--spring-panel`. The back-direction mirror and the role family are kept, and so are the `will-change` and `contain` windows. An A/B with `will-change` removed was slower at 1440 (gradient title 691–760 ms), so the hint stays.

**Falsifier** `od19-pane-swap.spec.ts` (an in-app hash hop after the page has warmed; rAF trace of the region roots; title is input → destination `main h1`; window is the first → last moving frame; budgets title ≤ 400 ms and window ≤ 450 ms). The ms values are min–max across runs, and every record is in `after/P3/SUMMARY.json`.

| arm | gradient title | gradient window | mix title | mix window |
|---|---|---|---|---|
| dev, BEFORE ×2 (`before`) | 1719–4345 | 992–2850 | 334–639 | 749–1323 |
| dev, AFTER ×5 (`after`) | 258–799 | 408–1268 | 243–435 | 400–817 |
| built, BEFORE ×2 (`before-built`, HEAD worktree) | 457–925 | 1066–1940 | 329–386 | 867–1025 |
| built, AFTER ×4 (`after-built` + `final-built`) | 262–806 | 402–1142 | 231–354 | 367–707 |

- Passing: mix title in every AFTER cell, and the gradient title at 390 on the built bundle (262–377 ms).
- RED: the gradient title at 1440 (435–806 ms built) and the moving window (above 450 ms in most cells, worst at 390 mix).
- 390 frame budget (≤ 50 ms), recorded and not met. On swiftshader the worst swap frame is 225–351 ms after (BEFORE: 268–449).

**Residuals (measured, outside P3's modify set)**
1. **Incoming-pane mount and raster frame.** The `p3-swap-timeline` run on the built AFTER bundle at 1440: leave classes at 28–39 ms, the old pane removed and the new one inserted at 236–297 ms, `enter-to` at 377–468 ms. The frame between insert and `enter-to` costs 130–220 ms, which is mount plus style/layout. In the falsifier runs the first frame after input sometimes arrives 435–760 ms late, with no script over 5 ms in the LoAF (`render@…` only). That is a raster/GPU stall on swiftshader, with the 7459 px About pane as the leaving layer. It sets the gradient@1440 title.
2. **Neighbour shift at 390.** On Home→Mix the stage (Picker) moves −60 px in the first frames, and that opens the 390 mix window at t≈0. This is V4's route caption (packet P1, `App.vue`), not the swap.
3. The out-in floor is about 200 ms leave + mount + spring settle, so a 450 ms window is not reachable on software GL while `out-in` stands.

**Gates (all through `guarded`)**
- `npm run typecheck`: lib, demo and test clean. The e2e tsc errors are only in other seats' untracked specs (`ss8-b17-admin-names`, `ss8-b07-pane-shell`, `ss8-b15-palette-cards`); my spec is clean (`after/P3/typecheck.txt`).
- vitest full (`--maxWorkers=2`): 1279 passed, 2 failed, both in `demo/test/palettes/palette-card-layout.test.ts`, which is dirty with another seat's SS-8 B13 hunks and unrelated to P3.
- `walk.spec.ts` + `oracles/cold-nav-scene-enter.spec.ts` ×2: 3 passed / 3 passed.
- `perf/view-switch-frame-budget.spec.ts` on the AFTER built bundle ×2: passed / passed, first frame 8.3 / 9.3 ms (BEFORE 291 / 1166 ms). Software-GL maxTask is 1052–1208 ms against BEFORE's 153–543 ms. The `p3-vsfb-loaf` A/B places that task in the incoming pane's mount, `import.then` / `onanimationend`, present in both arms. Residual 1.

**Escalated** — the gradient@1440 title, the moving-window budget and the 390 frame budget need (a) residual 1's mount/raster cost (the pane's own mount, GradientPane/PalettesPane, outside P3) and (b) P1's V4 cure to land. Or the orchestrator can re-rule the window budget under `out-in`.

**Machine note** — the guard held the BEFORE run for about 3.5 h (load 85–150). The shared `:9000` server stopped answering at 19:48, so every run used private ports (8190/8191/8192), and each server was stopped after its run.

**Resume 2026-10-20 (after the reboot, HEAD `4d806342b`, which includes the glass 10.1.1 adoption)**: re-verify only. No code change; P3's code is still `091f86da2`, pushed. Evidence is in `value/after/P3/resume-2026-10-20/`.
- `npm run typecheck`: lib, demo and test are clean. The 44 e2e tsc errors are all in other seats' untracked specs (`ss8-b17-admin-names` 39, `ss8-b18-admin-panels` 4, `ss8-b07-pane-shell` 1).
- `walk.spec.ts`: passed ×2 on a private Playwright-owned dev server at :8190. The shared `:9000` server did not answer (curl timed out after 10 s), so the first pair of runs there failed at `goto`/`networkidle`. Those runs are kept as `e2e-run{1,2}.txt`; they are a substrate stall, not a P3 result.
- `od19-pane-swap.spec.ts` ×2 at :8190: the V5 root cure holds. Every cell has `warmed: true` and `coldDuringGradient: []`, so the hop issues 0 pane requests.

  | ms | gradient title @1440 | gradient window @1440 | mix title @1440 | mix window @1440 | gradient title @390 | gradient window @390 | mix title @390 | mix window @390 |
  |---|---|---|---|---|---|---|---|---|
  | run 1 | 544 | 491 | 248 | 408 | 317 | 659 | 383 | 867 |
  | run 2 | 487 | 792 | 295 | 367 | 337 | 508 | 239 | 691 |

  Mix at 1440 is GREEN on both budgets, and the 390 titles are GREEN. The two RED arms are the same ones as above: the gradient@1440 title, and the windows at 390. That is residual 1 (incoming-pane mount/raster under software GL) and residual 2 (P1's V4 caption shift). They are not P3 regressions; the numbers fall inside the earlier AFTER band. The escalation stands as written.
- While these runs were going, the private dev server logged `TypeError: Cannot assign to read only property '0' of object '[object Array]'` (window.error). A standalone probe (`err-probe.mjs`, the same boot and gradient/mix hops at 1440 and 390, headless, on its own :8194 server) logged **0 page errors**. My reading is that HMR churn from other seats' live edits to the shared working tree (`demo/color-session/*` is dirty with SS-8 hunks) caused it; P3 did not. I did not chase it further, and P3's modify set does not touch it.

### P2 (r2, 2026-10-20 redeploy)

**Row OD19-V3. Code `6095ee100` (on top of `61867fc32`). Verdict: PARTIAL; the budget is still not met.** This seat re-checked the r1 cure and cured the one residual root that lies in the P2 modify set. The rest of the latency sits outside the set and is named below.

- **r1 still holds** at HEAD `4d5d0dbdc`. `getPropertyValue` is absent from the top 25 self frames in all four arms (< 16 ms; budget < 50 ms ✔). `resolvePalettesRamp` costs 7–8 ms inclusive per drag (the settle mint only).
- **Cure** (`demo/color-session/useContrastSafeColor.ts`, `certifyAccentInkOnce`). r1's residual (1) was `certifyAccentInk` running on every colour frame. Part of it was the same pure walk asked twice per frame:
  - the boot writer's `safeAccentCss` and the Nutrition label's `useSafeAccentFn("resting").safeCss` both certify the live pick on the resting rung at the default floor;
  - the profile menu and the mobile menu both certify it on the floating rung.

  A bounded memo keyed (colour, surface L, floor), the `tintColorCache` idiom with 64 entries, now serves `safeAccentCss`, `useSafeAccentFn.safeCss` and `useChromeAccentFn.safeCss`. It returns the walk's own string, so the output is byte-equal. No new module and no shim. Nothing else was touched; `useViewAccents.ts` is unchanged from r1.
- **Falsifier** `demo/test/color-session/colour-frame-cost.test.ts`, new case 5. A pass-through spy wraps `certifyAccentInk`. Over 18 colour frames, four consumers on two rungs must cost 2 walks per frame, and their answers must equal the real walk.
  - RED ×2 on the parent source: 4 walks, 1 failed / 4 passed (`after/P2/r2/vitest-red-{1,2}.txt`).
  - GREEN ×2: 5/5 (`vitest-green-{1,2}.txt`).
- **Gates.**
  - Touched tests: `colour-frame-cost`, `test/view-accents`, `test/contrast-floor` all pass (`vitest-touched.txt`).
  - Also in that run: `demo/test/shell/dock-profile-menus.test.ts`, an untracked SS-8 born-RED spec owned by another seat, has 7 failures. The same 7 fail on the parent source (`ss8-dock-profile-menus-on-head.txt`), so they are not P2's.
  - `vue-tsc` demo + test: the only errors are that same SS-8 file's 3 (`typecheck.txt`).
  - eslint clean on both files.
  - No e2e spec covers these modules. No golden was re-baselined.
- **AFTER, clean A/B** (`after/P2/r2/ab/`, `SUMMARY.json`, `summarize.py`, `cure.diff`). Two detached worktrees at HEAD `4d5d0dbdc`, the cure arm being HEAD plus `cure.diff`, each with its own dev server (:8291 / :8292) and the shared `dist/`. Order base, cure, base, cure, run through `guarded` with the same `ab.sh` and probes (`latency-load.mjs`, `v3-profile.mjs`, dark-1440 and light-390). Load averaged 22–32 throughout.

| measure | base r1 / r2 | cure r1 / r2 |
|---|---|---|
| `certifyAccentInk` incl. per drag | 202 / 225 ms | 169 / 175 ms (−20 %) |
| `getPropertyValue` self | absent / absent | absent / absent ✔ |
| dark-1440 picker p50 / p95 | 39.9/55.8 · 37.3/56.6 | 50.1/76.6 · 41.3/56.0 |
| light-390 picker p50 / p95 | 43.1/166.9 · 57.4/215.4 | 43.6/174.8 · 53.8/201.6 |

Today's base is already well below r1's base (dark-1440 p50 57–66 → 37–40 ms). At this load, the latency difference between the base and cure arms is within run-to-run noise. The certify cut is real, but too small to move p50/p95 on its own.

- **Residual (budget p50 ≤ 25 / p95 ≤ 50 ms not met; outside the P2 modify set):**
  - (1) `HeroBlob.vue:281` `repaintParked`, reached from its `watch.deep` at `:301`: 417 ms inclusive per drag, through `getBoundingClientRect` at 468 ms self. This is a forced layout on every colour frame, now the largest single cost in the cure arm. It is the same row as r1 residual (3).
  - (2) About-scene inks mounted under the picker: `useMarkdownColors.ts:24`, which calls `certifyAccentInk` directly (55 ms), and `ColorNutritionLabel.vue` render (51 ms). Both are off-screen during a picker drag.
  - (3) light-390 still blocks 0.9–1.3 s per drag. `useAtmosphere::publish` dominates its LoAF script attribution (1856 ms in cure-r2).
  - These need a follow-up packet: HeroBlob's parked repaint read off the colour clock, the About-scene inks kept off the drag clock while the scene is not visible, and the atmosphere publish.

### P1
**Rows OD19-V4, OD19-V6, OD19-V8. All CURED.** Files changed: `demo/app/App.vue`, `demo/shell/PaneLoadingPlate.vue`, `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, `e2e/smoke/page-load.spec.ts` (the falsifiers), `e2e/smoke/walk.spec.ts` and `e2e/smoke/fixtures/dock.ts` (comment rewording only). Evidence: `value/after/P1/`. No golden was re-baselined. No assertion was weakened: A5 keeps its count, text and `toBeVisible` checks.
- **V4 root.** `App.vue:90-97` rendered a visible in-flow `h1.route-title`, and `:481-505` gave it margin and caption type. Cure: the H1 stays in `<main>` with the same id, `tabindex="-1"` and `v-if`, but it is `class="sr-only"`. The `.route-title` rule and its short-viewport media rule are deleted. The comment cites §0gf.2(a), which reverses §0ge.7 VC5-01. A 1 px sr-only box still passes A5's `toBeVisible`.
- **V6 root.** The visible `<p>` at `PaneLoadingPlate.vue:23` was deleted. **Measured finding:** the plate's busy status was never in the accessibility tree. glass `Card` merges `role: selected ? "option" : undefined` AFTER `$attrs`, so a consumer's `role="status"` on a non-selectable Card is dropped. RED aria snapshot: `region "Gradient"` → `paragraph: Loading the scene…`, with no `status`. Consumer cure: `role="status"`, `aria-busy="true"` and `aria-label="Loading the scene"` now sit on the plate's own root `div.pane-plate`. glass `Skeleton` is kept and no local shimmer is added. **O-102 sub-row V6-b (glass):** `Card` should not clobber a consumer `role` when `selected` is undefined, for example by emitting `role` only when it is selectable.
- **V8 root.** `ConsoleRail.vue:229-236` `.channel-rail` gets `border: 1px solid var(--card-edge)`, the in-chrome tier's one ink hairline. This is the owner's word reversing V1-21. It is not the old accent die-rim.
- **Falsifier** (`e2e/smoke/page-load.spec.ts`, 4 new tests). V4: Gradient→Home pane-row y-delta is 0 at 1440 and at 390. V6: the gradient chunk is held from before boot, then Home→Gradient; the plate root is `role=status`, `aria-busy=true`, `aria-label="Loading the scene"`, and `innerText` is `''`. V8: rail `border-top/left-width` is `1px`, `solid`.
  - **RED** (`red-head.txt`, HEAD sources in a throwaway worktree with the new spec): V4 is `88→113` (1440) and `104→127` (390), matching the diagnosis. V6: status element not found. V8: `0px`. A5 tests 1 and 2 are green at HEAD.
  - **GREEN ×2** on one warm e2e server (`green-warm-2.txt`, `green-warm-4.txt`): page-load and walk, **7/7 both runs**.
  - Honest limit: the first run after each fresh vite start (`green-warm-1`, `green-warm-3`, `green-cold-1/2`) failed page-load test 1 on a cold-compile `goto` timeout or a dep-reoptimise `ERR_ABORTED`. `green-warm-3` also failed walk on a titled pane's H1 count of 0, a pane still loading under load 20–30. All 4 falsifiers were green in every one of those runs, and the same failures do not occur warm.
- **Gates.** `vue-tsc` (lib, demo and test) is clean for P1 files. The remaining `typecheck` errors are only in other seats' SS-8 specs and tests (`ss8-b17/b18/b07`, `ss8-b11-cures`). vitest: 99/101 files and 1272 tests passed. The 2 failing files (`palette-card-layout`, `plate-mass`) are `page.goto` 30 s harness timeouts in the palettes browser harness, outside P1 (`vitest.txt`).
- **Adjacent lines outside the modify set:** none.

### load

OD19-ALL, the value half of route loading: "All loading times for all apps needs to be improved, every page, every app", and route-to-route navigation "smoothly and subtly". Boot (the first paint of `/`) is X.W11.p2's and is not touched here. The pane swap (OD19-V7), intent prefetch and the idle warm (OD19-V5) landed in P3 (`091f86da2`), and the wordless skeleton plate (OD19-V6) landed in P1 (`bdd97b752`). This seat re-measured all of them on a production build and cured the one route-level root still open.

**Verdict: PARTIAL.** The cold deep link's pane-chunk waterfall is cured at its root, and the falsifier goes RED to GREEN. On localhost the end-to-end time to content does not move beyond noise. Under a stated slow network, five of six heavy routes improve by 160–320 ms (median) and gradient is neutral. The remaining costs are measured and routed (residuals below).

**Cure:** `bf1f02d8a`, file `demo/app/router/index.ts`. Falsifier: `e2e/smoke/perf/od19-route-load.spec.ts`.

**Method.**
- Production build `vite build --mode gh-pages` (`VITE_API_URL=http://localhost:3000`), served by `vite preview` from a clean worktree, inside a `guarded` run that stops the server on exit (`value/probes/load-run.sh`, `load-serve.sh`).
  - BEFORE = HEAD `bdd97b752` (`.worktrees/load-head`).
  - AFTER = the same tree plus the cure (`.worktrees/load-after`).
  - Neither tree carries Track A's in-flight `prerenderShell` (the uncommitted `vite.config.ts` hunk).
- Headless Chromium (headless shell, SwiftShader GL) at **CPU 4×** (CDP `Emulation.setCPUThrottlingRate`), with no network throttle (localhost) unless stated. One browser per run, one context per route, and a warm-up load first.
- Probe `value/probes/load-routes.mjs`, three cells for every route in the router:
  - **cold**: empty cache, deep link `#/<route>`;
  - **warm**: the same context reloaded, HTTP cache primed;
  - **hop**: from a settled `#/` (the idle warm has run), set the hash.
- **Content** means every scene region holds a mounted pane, none holds the loading plate, and the route's H1 is in `<main>`. Measured: JS bytes on the wire up to content, long tasks up to content (count·sum ms), and for the hop the max rAF frame from input to content + 700 ms.
- Runs were interleaved BEFORE r1 → AFTER r1 → BEFORE r2 → AFTER r2 on 2026-10-20, 18:40–19:45, at load 25–42 on a shared machine. Raw data is in `value/load/before-head/r{1,2}-{1440,390}.json` and `value/load/after/r{1,2}-{1440,390}.json`.

**Root causes measured on the built bundle.**
1. **The deep link's pane graph waited for the mount (CURED).**
   - Cold `#/gradient` (`load-waterfall.mjs`): the entry chunk arrived at 54 ms, but `GradientPane` was requested at **654 ms**. PaneSlot asks for a lazy pane only when it mounts, which is after the entry evaluates, the router resolves and `app.mount` begins.
   - Cure: `router/index.ts` resolves the address at module evaluation (`router.resolve(location.hash)`, which is synchronous under hash history) and calls P3's `preloadView` for the linked view. An admin view is warmed only for a held token. The chunks then download and compile off-thread while the boot evaluates.
   - AFTER: `GradientPane` was requested at **164 ms**.
   - Through the falsifier, every lazy route's pane-request gap after the entry is **82–129 ms (AFTER) against 258–673 ms (BEFORE)**.
2. **Already in place, re-verified on the build and not re-authored.**
   - Route-level splitting: every non-home pane is its own chunk (`usePaneRouter.ts` `lazyPane`).
   - Intent prefetch on the view menu (pointerenter/focus, and menu open) plus the idle warm (P3).
   - The loading plate is glass `Skeleton` with no text (P1).
   - The pane swap animates opacity and transform only (`animations.css` `vj-enter` family, the leave on `--duration-fast` for both properties).

**Before → after, every route.** Each cell reads `before r1 / r2 → after r1 / r2`, CPU 4×, localhost. Long tasks are given as count·sum ms. ¹ = the served API refuses the probe's admin token (403), so the route bounces to `#/` and the cell times Home. The falsifier below stubs the admin endpoints and times the admin pane itself.

1440×900:

| route | cold content ms | cold JS KB | cold long tasks | warm content ms | hop content ms | hop max frame ms |
|---|---|---|---|---|---|---|
| home (picker + about) | 1596 / 1073 → **819 / 1188** | 367 / 367 → 367 / 367 | 3·1085 / 3·1052 → 1·583 / 4·1207 | 2740 / 4783 → 2022 / 2640 | — / — → — / — | — / — → — / — |
| palettes | 972 / 1868 → **832 / 1137** | 394 / 398 → 394 / 394 | 2·772 / 3·934 → 2·680 / 3·1126 | 1730 / 2631 → 1213 / 1129 | 446 / 430 → 770 / 514 | 259 / 252 → 369 / 335 |
| browse | 677 / 744 → **700 / 708** | 406 / 406 → 406 / 406 | 2·507 / 2·542 → 2·525 / 2·538 | 413 / 432 → 919 / 956 | 1045 / 1677 → 982 / 3372 | 822 / 1142 → 657 / 1040 |
| extract | 739 / 767 → **736 / 921** | 402 / 402 → 403 / 403 | 2·556 / 2·586 → 2·566 / 2·739 | 944 / 778 → 740 / 1687 | 568 / 974 → 581 / 1325 | 502 / 765 → 353 / 312 |
| mix | 949 / 1187 → **997 / 927** | 376 / 376 → 376 / 376 | 2·751 / 3·1034 → 2·815 / 2·825 | 1239 / 3267 → 1719 / 1404 | 798 / 1100 → 667 / 662 | 371 / 580 → 340 / 292 |
| generate | 765 / 813 → **761 / 781** | 382 / 382 → 382 / 382 | 2·576 / 2·625 → 2·587 / 2·598 | 1180 / 1283 → 986 / 900 | 900 / 1717 → 1757 / 664 | 387 / 539 → 813 / 306 |
| gradient | 993 / 1063 → **970 / 1100** | 455 / 455 → 455 / 455 | 2·796 / 2·845 → 2·790 / 2·909 | 1445 / 1486 → 1172 / 1415 | 589 / 772 → 826 / 574 | 330 / 527 → 322 / 331 |
| atmosphere | 523 / 512 → **603 / 556** | 338 / 338 → 339 / 339 | 2·558 / 2·540 → 1·437 / 2·592 | 926 / 778 → 800 / 1048 | 542 / 1168 → 774 / 918 | 311 / 404 → 258 / 229 |
| blob | 997 / 871 → **900 / 1121** | 365 / 365 → 365 / 365 | 2·861 / 2·777 → 2·811 / 2·907 | 1423 / 1929 → 1346 / 1478 | 537 / 483 → 810 / 633 | 313 / 273 → 338 / 300 |
| admin/users ¹ | 1342 / 1266 → **1364 / 1106** | 386 / 386 → 387 / 418 | 4·1133 / 3·986 → 4·1185 / 4·972 | 1716 / 1759 → 1717 / 1311 | 371 / 292 → 315 / 300 | 702 / 567 → 459 / 316 |
| admin/names ¹ | 1225 / 1303 → **1288 / 1121** | 386 / 386 → 387 / 387 | 4·1051 / 4·1159 → 3·988 / 4·984 | 2020 / 1657 → 1544 / 1278 | 278 / 270 → 368 / 116 | 420 / 454 → 258 / 256 |
| admin/audit | 517 / 534 → **637 / 485** | 383 / 383 → 379 / 383 | 2·455 / 2·476 → 1·455 / 2·429 | 1192 / 1390 → 1217 / 1061 | 738 / 708 → 687 / 381 | 993 / 809 → 302 / 818 |
| admin/flagged | 566 / 535 → **541 / 544** | 383 / 383 → 383 / 383 | 2·508 / 2·486 → 2·486 / 2·495 | 1118 / 2532 → 1102 / 1810 | 503 / 669 → 432 / 673 | 302 / 314 → 615 / 328 |
| admin/tags | 585 / 538 → **1002 / 538** | 379 / 383 → 383 / 383 | 2·530 / 2·492 → 2·973 / 2·499 | 1427 / 1111 → 1579 / 1370 | 407 / 328 → 1154 / 677 | 787 / 283 → 636 / 476 |
| no-such-route | 89 / 87 → **90 / 95** | 329 / 329 → 329 / 329 | 1·396 / 1·410 → 1·467 / 1·413 | 81 / 59 → 84 / 57 | 331 / 368 → 1856 / 585 | 156 / 182 → 530 / 217 |

390×844:

| route | cold content ms | cold JS KB | cold long tasks | warm content ms | hop content ms | hop max frame ms |
|---|---|---|---|---|---|---|
| home (picker + about) | 899 / 982 → **1211 / 1030** | 367 / 367 → 367 / 367 | 2·717 / 2·735 → 3·1069 / 2·773 | 1611 / 2032 → 3374 / 2788 | — / — → — / — | — / — → — / — |
| palettes | 833 / 748 → **839 / 1138** | 394 / 394 → 394 / 394 | 2·682 / 1·552 → 2·701 / 3·988 | 1192 / 746 → 1197 / 967 | 440 / 378 → 429 / 392 | 105 / 113 → 154 / 162 |
| browse | 687 / 691 → **687 / 681** | 411 / 411 → 412 / 412 | 2·491 / 2·514 → 2·519 / 2·514 | 710 / 773 → 417 / 600 | 614 / 700 → 2914 / 1418 | 395 / 470 → 638 / 749 |
| extract | 725 / 702 → **743 / 773** | 408 / 408 → 408 / 403 | 2·546 / 2·544 → 2·575 / 2·597 | 688 / 582 → 782 / 1795 | 426 / 593 → 438 / 2740 | 200 / 750 → 376 / 1471 |
| mix | 838 / 888 → **863 / 812** | 381 / 381 → 381 / 381 | 2·732 / 2·718 → 2·827 / 1·603 | 1022 / 2471 → 1131 / 873 | 482 / 611 → 537 / 782 | 114 / 222 → 279 / 340 |
| generate | 743 / 836 → **784 / 703** | 403 / 397 → 403 / 403 | 2·568 / 2·621 → 2·605 / 2·533 | 798 / 939 → 1306 / 934 | 714 / 461 → 1909 / 480 | 368 / 150 → 939 / 142 |
| gradient | 898 / 1039 → **984 / 966** | 455 / 455 → 455 / 459 | 2·725 / 2·811 → 2·791 / 2·792 | 1185 / 1062 → 894 / 961 | 475 / 478 → 557 / 942 | 103 / 133 → 221 / 550 |
| atmosphere | 512 / 512 → **555 / 558** | 404 / 404 → 369 / 404 | 2·533 / 2·527 → 2·585 / 2·577 | 601 / 376 → 723 / 645 | 462 / 485 → 449 / 488 | 235 / 200 → 371 / 207 |
| blob | 913 / 903 → **813 / 871** | 369 / 365 → 365 / 365 | 2·783 / 2·903 → 2·790 / 2·822 | 839 / 1241 → 1165 / 867 | 497 / 578 → 516 / 491 | 119 / 248 → 247 / 104 |
| admin/users ¹ | 1071 / 1240 → **1257 / 1263** | 443 / 418 → 418 / 387 | 4·939 / 4·1052 → 4·1110 / 4·1104 | 613 / 1626 → 2770 / 2070 | 168 / 133 → 166 / 138 | 244 / 289 → 369 / 268 |
| admin/names ¹ | 1214 / 1360 → **1303 / 1238** | 418 / 386 → 418 / 418 | 4·1072 / 4·1101 → 4·1149 / 4·1093 | 1702 / 1683 → 1985 / 1347 | 192 / 126 → 349 / 159 | 272 / 274 → 233 / 222 |
| admin/audit | 524 / 533 → **562 / 539** | 383 / 383 → 383 / 383 | 2·466 / 2·473 → 2·494 / 2·483 | 1895 / 1433 → 1454 / 1654 | 338 / 413 → 463 / 329 | 259 / 698 → 316 / 259 |
| admin/flagged | 535 / 553 → **556 / 544** | 383 / 379 → 383 / 383 | 1·374 / 2·496 → 2·499 / 2·492 | 1327 / 968 → 1470 / 1182 | 325 / 366 → 309 / 416 | 364 / 360 → 366 / 399 |
| admin/tags | 535 / 533 → **496 / 564** | 383 / 383 → 383 / 383 | 2·466 / 1·370 → 2·447 / 2·496 | 1607 / 1843 → 1992 / 990 | 320 / 630 → 305 / 357 | 241 / 825 → 243 / 344 |
| no-such-route | 86 / 83 → **87 / 85** | 329 / 329 → 359 / 329 | 0·0 / 0·0 → 1·372 / 1·385 | 72 / 66 → 52 / 62 | 747 / 365 → 318 / 396 | 764 / 189 → 123 / 242 |

How to read these tables: on localhost the route chunk arrives within a few ms, so cold content is set by the main thread (entry evaluation plus pane mount), and the cure's earlier request does not move it beyond run-to-run noise. Hop outliers (for example browse 3372 ms and extract 2740 ms) recur in BEFORE and AFTER alike and follow machine load. Cold JS bytes are unchanged: the cure moves *when* the chunk is fetched, not what is fetched.

**Under a stated network** (`load-cold-net.mjs`): 150 ms RTT, 1.6 Mbps down / 750 kbps up (CDP `Network.emulateNetworkConditions`), CPU 4×, 1440. Each row has 4 samples per build (2 runs × 2 reps), interleaved. Gradient has 4 more per build in r3.

| cold route | content ms, before → after (median) | pane request gap after entry, ms |
|---|---|---|
| gradient | 5498 / 4913 / 5788 / 4863 · r3 5699 / 5427 / 4856 / 5284 → 5738 / 5140 / 5947 / 5058 · r3 7051 / 5545 / 5109 / 5225 (5356 → 5385, neutral) | 211–292 → 57–77 |
| mix | 4248 / 4250 / 4534 / 4513 → 4272 / 4072 / 4208 / 3991 (4382 → 4140, **−242**) | 284–366 → 56–80 |
| palettes | 4423 / 4388 / 4412 / 4443 → 4156 / 4048 / 4154 / 4022 (4418 → 4101, **−317**) | 234–373 → 56–78 |
| extract | 4622 / 4466 / 4723 / 4917 → 4392 / 4347 / 4445 / 4321 (4673 → 4370, **−303**) | 180–269 → 57–68 |
| generate | 4514 / 4385 / 4442 / 4463 → 4481 / 4204 / 4237 / 4220 (4453 → 4229, **−224**) | 197–265 → 48–71 |
| blob | 3588 / 3597 / 3683 / 3657 → 3441 / 3490 / 3614 / 3432 (3627 → 3466, **−162**) | 312–362 → 50–69 |

Gradient is neutral. Its pane graph (182 KB `GradientPane` + 32 KB `vendor-highlight`) now downloads alongside the boot's own chunks, so what the earlier start saves, the shared bandwidth spends. Residual 1 names the bytes.

**Falsifier** `e2e/smoke/perf/od19-route-load.spec.ts` (smoke-perf project, built bundle, CPU 4×, all 15 routes). It runs each route cold and asserts:
- (1) the route's pane chunk is requested ≤ **180 ms** after the entry chunk arrives. This is the discriminating bar.
- (2) time to content stays under the route's regression bar: 2500 ms, and 1500 ms for not-found. AFTER measured 541–1509 ms.
- (3) the in-app hop from a settled `#/`, with the route's chunk already landed by the idle warm, reaches its content, and its time is logged. The hop has no ms bar (residual 3).

Admin cells seed a token and stub the admin endpoints with empty envelopes. The file opens with one throwaway load, as the probe does.
- **RED** on BEFORE: **14 failed / 1 passed** (`value/load/falsifier/final/before-1.txt`; also `r3/before-1.txt` 14 failed / 1 passed). Every lazy route failed (1). The one pass is not-found, which has no lazy pane.
- **GREEN** on AFTER: **15/15 ×2** (`final/after-{1,2}.txt`).
- How the bars were set, from the drafts kept in `value/load/falsifier/`:
  - A first draft without the warm-up read 5–12 s on its first two cells on a fresh browser (`red-before.txt`, `green-after-{1,2}.txt`).
  - At a 300 ms gap bar, BEFORE on a quieter machine read 8 failed / 7 passed with gaps of 216–418 ms (`r2/before-1.txt`). The bar was moved to 180; AFTER's gap never exceeded 135 ms in any run.
  - A hop bar of 2500 and then 4000 ms failed on AFTER at load 31–33 (`r3/after-{2,3,4}.txt`: palettes 5536/6210, mix 4545, browse 4481 ms). The same spread appears in BEFORE (browse 3372 ms in the probe), so the hop was made a logged measurement.

**Residuals (measured, outside this seat's cure)**
1. **The gradient route carries the whole CSS value grammar.** `GradientPane` is 182 KB: 130 KB of it is the library's `css-grammar` chunk (attributed with `load-chunk-attr.mjs` over the sourcemapped build), pulled in for `parseTimingFunction` (`model/sample.ts:114`) and `parseCssScalar` (`gradientParse.ts:111,125`). `parseCssColor` already has a colour-only parser (`src/css/bbnf/color-parse`, X-W12U `.g2s`). A timing/scalar-rooted parser compiled alone would cut most of the 130 KB from the gradient route. That is library parser work (the BBNF grammar law, V·π edicts) and is routed there; no demo-side cure exists without a local parser, which the law forbids.
2. **A warm reload costs more than a cold load** (warm content 1.1–4.8 s against cold 0.5–1.6 s in both builds). `load-warm-loaf.mjs` attributes it to one long animation frame, the entry chunk's evaluation: 1.6–4.5 s on the second load against about 0.6 s cold. A storage-cleared reload is also slow, so it is not app state. This is Chrome's second-visit code-cache production over the 469 KB entry chunk at CPU 4×, so it is boot-graph size and belongs to **X.W11.p2 (Track A)**. Relayed, not cured here.
3. **The hop is load-bound and has no bar: ESCALATED with P3.** Measured 310–1460 ms on a quiet machine and 2.2–6.2 s at load 30+ (palettes 5536/6210, mix 4545, browse 4481 ms), in BEFORE and AFTER alike. Its cost is the incoming pane's mount, the same finding as P3 residual 1. `load-hop-loaf.mjs` attributes the hop's largest frame to Vue's out-in leave timer, which mounts the incoming pane: gradient 293 ms, generate 131 ms. A glass `createCanvasLifecycle` ResizeObserver → `resize()` runs 124–231 ms on browse and the admin hops. `load-canvas-resize.mjs` shows the leaving Home's hero-blob canvas growing 180→282 px during its leave on one admin hop. That run was not reproducible on every hop, so it is recorded and not cured. The out-in floor (leave + mount + settle) stands as P3 escalated it.
4. **API-refused origin.** The served API's CORS allowlist names `:9000` only, so a preview or perf origin sees every API call fail. `load-api-down.mjs` shows that Home and Palettes still reach content in about 1.6 s with the API refused, so a refusing API costs no route content. The probe runs with web security off so that it measures the API-up path.

**Gates.**
- `vue-tsc -p tsconfig.demo.json`: clean for this change. The remaining errors are only in other seats' `ss8-*` tests.
- `tsc -p tsconfig.e2e.json`: clean for the new spec.
- eslint on both files: clean.
- vitest (`demo/test/shell` plus `admin-u3-cures`, `--maxWorkers=2`): 57/58 passed (`value/load/vitest-shell.txt`). The one failure is `button-voice.test.ts` V16-06, which flags `ImageEyedropper.vue:20` (another seat's SS-8 B25 `605daabe7`). It is unrelated to the router.
- No golden was re-baselined. No test was deleted, skipped or weakened.

### repair 1

Critic 1's four consumer findings on value (C1-V-01, -05, -06, -07). Code `9ed00b5cd`. Evidence: `value/after/repair-1/`. Every browser run went through `guarded` and was headless, with one browser per run and one context per cell. **A/B:** two detached worktrees at HEAD `29798d5df`, each on its own vite dev server and its own deps cache, so the shared tree's live edits from other seats never reached either arm. `base` is HEAD (`.worktrees/r1-red`, :8291); `cure` is HEAD plus this repair (`.worktrees/r1-after`, :8292). Both arms read the same `node_modules` (glass 10.1.1). Order: base, then cure, in each of three passes (`ab/pass-{1,2,3}/`, `probes/r1-ab.sh`). Pass 1's cure carried only the epoch half of C1-V-05. Load was 17–31 throughout.

| row | verdict | cure | falsifier |
|---|---|---|---|
| **C1-V-01** glass pin | **CURED** | `package.json` and the lockfile pin `@mkbabb/glass-ui` **10.1.1** (`npm i --save-exact`; `v01/pin.txt`: `npm ls` 10.1.1, lock `resolved …glass-ui-10.1.1.tgz`). `PaneLoadingPlate.vue` passes `shimmer` on both Skeleton bars (OD19-V6). glass draws the sheen, so no local shimmer is added. The dock-collapse overlay close (G-3) arrives with the pin. This repair adds no consumer code for it, and the dock e2e below is run on the new pin. The P4 re-check receipt is corrected in place: it measured **10.1.0**. | `demo/test/shell/pane-plate-shimmer.test.ts`: both bars carry glass's `data-shimmer`, and the plate has no text. **RED ×2** on HEAD (`v01/vitest-shimmer-RED-{1,2}.txt`); GREEN on the cure and in both full-suite runs. |
| **C1-V-05** view-switch frames | **PARTIAL. The incoming pane's mount frame is cut 30–40 % at two roots. The OD19-V7 frame budget (no frame > 50 ms) is still not met. ESCALATED with P3 for an explicit re-rule.** | See below. | `demo/test/color-session/probe-epoch-mount.test.ts` (2 cases) and `demo/test/gradient/code-editor-idle-highlight.test.ts`: **RED ×2** on HEAD (`v05/vitest-epoch-RED-{1,2}.txt`: `expected 3 to be 2`; `v05/vitest-hljs-RED-{1,2}.txt`: highlight called at mount). GREEN on the cure and in both full-suite runs. The GPU hop witness is `probes/r1-v05-verdict.py` (mount frame ≤ 70 ms on every hop): base RED in all three passes (max 98 / 101 / 117 ms). The full cure was GREEN in pass 2 (max 64) and RED in pass 3, where one 1440-light hop read 79 ms at load 24–27. |
| **C1-V-06** hero parked repaint | **CURED at the consumer root (the forced layout). The OD19-V3 budget is still not met. The residual is the software-raster frame itself.** | `HeroBlob.vue` `repaintParked` is coalesced to one per animation frame and runs inside that frame's callback, cancelled on unmount. The measure is glass's: `resume()` re-measures through `createCanvasLifecycle`'s `getBoundingClientRect`. In the post-flush of each colour write, after that write's root `setProperty` calls, the measure forced a synchronous style and layout. Inside the frame callback it reads the layout the frame computes anyway. | `probes/r1-hero-gbcr.mjs` (reads of the bead's subtree outside an animation-frame callback must be 0, at most one per frame). **base RED ×6 runs** (passes 1–3, dark-1440 and light-390): 41–42 reads, every one outside a frame, 455–613 ms. **cure GREEN ×6**: 0 outside, one per frame, 90–271 ms in total. |
| **C1-V-07** record count | **CURED (records only).** | `DS/CLOSE.md:175` and `DS/value.md:1790, 1834` read "9 call sites". Each is corrected in place to ~~9~~ 10 with a dated bracket. A census finds 10 `<PaneShell` users, and `4fe9b05b9` names 10. This file's DIAGNOSE row already said 10. | — |

**C1-V-05, what the frames are.** Before any cure, the Home → Gradient hop was traced on two renderers (`v05/before-{sw,gpu}-*.jsonl`, `v05/tracing-before-1440-light.json`):
- **SwiftShader** (the critic's renderer, the headless default): 12–17 frames over 34 ms at 1440, in both directions. A Chrome trace of the hop puts **826 ms on `VizCompositorThread`** against 230 ms on the renderer main thread. Most of the long frames have no script in their LoAF. They are the software display compositor drawing every frame of the opacity/offset enter. That is the environment, as in keyframes repair-2's C2-KF-01. Changing the kept motion to suit a software compositor would overfit the test environment. The cure did not move it: 12–14 at 1440 in both arms (`ab/pass-{2,3}/*/hop-sw-*`).
- **ANGLE-Metal**, the GPU witness (the same headless shell with `--use-angle=metal`, `probes/r1-hop-trace.mjs` with `R1_GPU=1`; it exits 2 when only SwiftShader is served): 0–5 frames over 34 ms. Two frames are long:
  - the click frame, 58–68 ms;
  - the incoming pane's mount frame (the out-in leave timer → mount), 64–117 ms.
  
  Per-frame attribution (`probes/r1-hop-trace.mjs`, which slices the CPU profile to each LoAF window with a clock beacon) gave these two consumer roots:
  1. **The probe epoch re-ran every live-ink computed in the app.** The easing rows certify their ink (`useSafeAccentFn`), so their `onMounted` bumped the one global probe epoch. That invalidated every tint memo, and every live-ink consumer re-probed inside the mount frame: `useContrastSafeColor` 22–24, `ink.ts` 19–22, colour parsing 21 ms (`v05/prof-frames-before-gpu-1440-light.jsonl`). **Cure** (`useContrastSafeColor.ts`): the bump fires only after a probe **missed**, meaning a tier read that found no painted referent or an empty token read. A mount over an already-measured referent re-drives nothing, and a missed probe is still re-driven by the next mount (the epoch's purpose, kept as the falsifier's second case). After the cure, all three fall out of the mount frame (`v05/prof-frames-cure-gpu-1440-light.jsonl`).
  2. **hljs tokenized the CSS well inside the mount** (12–13 ms) for a well below the fold. **Cure** (`GradientCodeEditor.vue`): the mount paints the same text plain, and the crayons land in an idle slice (`requestIdleCallback`, with a timer on Safari). The text and the box are the same, so no layout changes, and focus still holds the editor truce.
- **A/B on the GPU witness, full cure (passes 2–3):**

| | mount frame (ms) | worst frame (ms) |
|---|---|---|
| base | 87–117 | 82–110 |
| cure | 56–79 | 37–71 |

- **Residuals (measured, still over 50 ms):**
  - (a) Vue's own mount of the above-fold pane, 61–84 ms of Vue runtime in the mount frame: the stop rail, the interpolation fields and glass's select and scroll-trigger setup. The Easing and CSS sections were not deferred: mounting them after the enter would add content to a pane the reader is already looking at, and their own script is under 3 ms of the frame. Only hljs, which repaints the same text, was moved.
  - (b) The click frame. glass's dock morph springs are about 40 ms (`@mkbabb_glass-ui_dock` 14–16, `useLiquidPress` 12–14, `motionTempo` 11–14, `useSpring` 11–14): **O-102 sub-row V7-g**. `useViewAccents`'s immediate ramp mint on a view change is about 25 ms. P2 ruled that mint immediate so the Palettes title never opens stale.
  - (c) SwiftShader's compositor.
  
  The P3 escalation stands narrowed: the budget needs (a) and (b), or the orchestrator re-rules it for the out-in mount.

**C1-V-06, latency.** `latency-load.mjs` was run at dark-1440 and light-390 in both arms (passes 1–2; `ab/pass-*/*/lat/latency-load.json`). Picker slider input→paint, p50/p95 in ms:

| cell | base | cure |
|---|---|---|
| dark-1440 | 44.8/89.1, 43.3/71.9 | 39.5/83.4, 40.3/85.4 |
| light-390 | 62.6/228.3, 61.9/196.4 | 61.5/216.9, 72.3/216.1 |

That is within noise, and the budget (p50 ≤ 25 / p95 ≤ 50) is **not met**. The forced layout was real (455–613 ms per drag, all of it in the input path). It is gone, but the frame is bound by the bead's software draw: on SwiftShader the parked engine rasters one metaball frame per colour frame on the CPU, which is the X-W11 software-raster tier. **O-102 sub-row V3-g:** a parked Blob has no repaint seam that skips the re-measure. `pause()`/`resume()` is the only seam the Blob exposes, and `resume()` always runs `resize()`.

**Glass 10.1.1 re-run** (`v01/e2e-run-{1,2}.txt`, cure worktree, `--project=smoke --workers=1`):
- `od19-v2-dock-settle.spec.ts`: **2/2 ×2**.
- `page-load.spec.ts`: **6/6 ×2**, including OD19-V6, the wordless plate.
- `w12-dock.spec.ts`: **4/6 ×2**. The same two tests fail the same way on **HEAD with glass 10.1.0** (`v01/w12-dock-head-g100.txt`, a HEAD worktree overlaid with the 10.1.0 tarball) and on HEAD with 10.1.1 (`w12-dock-head-red.txt`). The failures are "(1) Login hover plate `rgba(0,0,0,0)`" and "(2) layer switch mobile-edit: after `W12e seed` ≠ `Tools`". They are a regression on HEAD between `006fd567a` (last 6/6) and `29798d5df`, and neither the pin nor this repair causes them. Routed to the dock seat (Track A, X-W11 dock at 390).

**Gates ×2 (guarded):**
- vitest full in the cure worktree, `--maxWorkers=2`: **1474 / 1475 passed ×2** (`vitest-full-{1,2}.txt`). The one failure is `button-voice.test.ts` V16-06, which fails identically on HEAD (`vitest-button-voice-on-head.txt`; another seat's `ImageEyedropper.vue`, as in `### load`).
- `vue-tsc` demo and test projects: clean (`typecheck-{demo,test}-1.txt`).
- eslint on the touched files: clean.
- `o18-contrast-census.spec.ts`: 30–31 / 32 ×2 on the cure against 30 / 32 ×2 on HEAD. The failing set is the same pre-existing one, the identity leg (light) plus the admin-pill row, whose failing scheme alternates between runs on both arms. The epoch change adds no census failure.

No golden was re-baselined. No test was deleted, skipped or weakened.

### repair 2

Critic 2's three consumer findings on value: C2-V-01, C2-V-03 and C2-V-05. Code `de51e13c1`. Evidence is in `value/after/repair-2/`. Every browser run went through `guarded`, headless, with one browser per run and one context per cell. **A/B:** two detached worktrees at HEAD `02f8e58f5`, each on its own vite dev server and deps cache, with the API pointed at a dead `:3000` (`probes/r2-serve.sh`). `base` is HEAD (`.worktrees/r2-base`, :8391). `cure` is HEAD plus this repair (`.worktrees/r2-cure`, :8392). Order: base, then cure, in each of two passes (`ab/pass-{1,2}/`, `probes/r2-ab.sh`). Load on the machine was shared throughout. `base-1/` is a first run whose 1440 geometry cells hit a dev-server dependency re-optimise reload, so the probe now warms every route first; `base-2/` adds every stage's landed height.

| row | verdict | cure | falsifier |
|---|---|---|---|
| **C2-V-01** picker drag latency | **CURED at the root named by the finding. Measured: light-390 meets p95 and misses p50 by 1 ms. light-1440 misses both bars by 4–8 ms.** | `useAtmosphereBoot.ts`: the ink referent holds while the colour moves and publishes the latest ambient after a 120 ms quiet. This is the same settle the P2 ramps use. | `demo/test/color-session/ink-referent-settle.test.ts` plus `latency-load.mjs` (below) and `probes/r2-inks.mjs` |
| **C2-V-03** loading plate size | **CURED at 1440 (0.934 of the landed pane). PARTIAL at 390 (0.766): the plate covers the whole visible band, and the remaining 223 px of the 955 px pane land below the fold.** | `shell.css` declares `--scene-band-block` on `.app-layout`, next to the paddings it subtracts. `PaneLoadingPlate.vue` reserves it (`min-block-size`), with the plate as a flex column and the Card as `flex-1`. The no-op `h-full` is gone. | `probes/r2-geo.mjs` v03 |
| **C2-V-05** offline chip over the dock | **CURED** | `ApiStatusChip.vue`: below the desktop band, the dock-seat lamp moves to the band's block-end corner, under the pill's edge. The band is floored at 72 px around a 42 px pill. The lamp is still out of flow, so the dock's centring does not shift. Desktop keeps the lamp on the pill's axis, which the o22 oracle asserts at 1280. | `probes/r2-geo.mjs` v05 |

**C2-V-01, the root and why light costs about 10× more.**
- The certified inks are WCAG walks keyed on the atmosphere's ambient, and that ambient moves with the picked colour. These inks are the boot's plate, muted, modal and destructive inks and its four gold rungs, the dock band's gold and plate inks (`Dock.vue` `bandGoldStyle`/`bandInkStyle`), and every `safeCss` consumer. So every colour frame re-walked all of them.
- Why light is worse (`v01/walk-count-sweep.txt`, static model, library `safeAccentColor` calls per frame across the five surface-only inks): 8 walks on most grounds, but **75–103 walks** where the resting surface lands at L 0.53–0.65. That is the 4.58:1 dead band (Y ≈ 0.18), where the 5.75:1 headroom target is unreachable. There every `certify` runs its 10-step headroom bisection, and each gold rung adds the 16-step far-side bisection and then the plate ink. The light field's mid-lightness grounds cross that band during a hue drag. The dark field sits below it.
- Repair 1 called the residual "the software-raster frame itself". That attribution was wrong for this cost, as the critic said, and this receipt corrects it.
- **Cure:** `heldLightness` in `useAtmosphereBoot.ts`.
  - It republishes at once when the ambient moves without a colour move (a scheme flip, the field arriving), so a flip never shows stale inks.
  - It is provided as `INK_AMBIENT_KEY` and fed to `useContrastSafeColor` and `useViewAccents`. `--ink-ambient-l` stamps the same held number, so the O-18 census still reads the referent the guard used.
  - The picked colour's own inks (`--accent-live`, the label and menu inks) still certify every frame, against the held ground.
- **CPU profile of the same 41-step light-1440 drag** (`prof/{base,cure}/v3-profile.json`; `v3-profile.mjs` now takes `SCHEME`):
  - `certify` inclusive: **1353 → 136 ms**.
  - `certifyIdentityInk`: 607 ms → gone.
  - The library walk's self time (`color-*.js:185`): 619 → 87 ms.

**Picker channel-slider input→paint** (`latency-load.mjs`, CELLS light-1440 and light-390; p50/p95 ms; LoAF count · blocking ms; the top LoAF script is `useAtmosphere::publish`, the coalesced colour frame):

| cell | base pass 1 | base pass 2 | cure pass 1 | cure pass 2 |
|---|---|---|---|---|
| light-1440 | 55.2/163.6 · 28·739 · publish 1222 ms | 69.5/174.8 · 25·734 | **33.1/57.6 · 6·7** · publish 46 ms | **31.1/54.4 · 8·5** |
| light-390 | 39.9/146.4 · 12·689 · publish 940 ms | 38.8/141.6 · 11·655 | **26.7/33.5 · 1·6** · publish 10 ms | **26.0/29.9 · 1·0** |

The gradient slider is unchanged in both arms (p50 17–18 ms at 1440, 7–9 ms at 390). That is the scheme-independent floor the critic compared against.

- **Residual against the bar (p50 ≤ 25 / p95 ≤ 50):**
  - light-390 is GREEN on p95 and 1.0–1.7 ms over on p50.
  - light-1440 is 6–8 ms over on p50 and 4–8 ms over on p95.
  - What is left in the cure profile is `HeroBlob.vue:295`, the parked-bead repaint (228 ms inclusive), with `getBoundingClientRect` at 249 ms self. That is glass `resume()` → `createCanvasLifecycle` re-measure, already named as **O-102 sub-row V3-g** in repair 1. The consumer half (the forced layout outside a frame) was cured in repair 1. The measure inside the frame belongs to glass.
  - The double-rAF metric cannot read below one frame (≈ 16.7 ms).
- **Settled inks equal the pre-cure inks.**
  - Browser check (`probes/r2-inks.mjs`, `v01/inks-{base,cure}.json`): the same drag, then 1.5 s of settle, then 17 root tokens read in each arm (every `--ink-*`, `--accent-live`, `--accent-view`, the ramp heads). The two arms are **byte-equal at light-1440, light-390 and dark-1440**.
  - Unit falsifier: after settle, every token equals a fresh mint at the final colour and ambient, in light and in dark.
- **Unit falsifier `ink-referent-settle.test.ts`.** It mounts `useAtmosphereBoot` with the atmosphere's ambient driven by the test, and has three cases:
  - (1) light and (2) dark: a 21-step drag calls `certifyIdentityInk`, `resolvePlateInk` and `resolveMutedInk` 0 times mid-drag, leaves every surface token unchanged, keeps `--accent-live` equal to the accent certified on the held ground every frame, and after settle equals a fresh mint.
  - (3) an ambient move with no colour move publishes at once.
  - **RED ×2** on HEAD (`v01/vitest-RED-{1,2}.txt`: 2 failed / 1 passed, `certifyIdentityInk` called 2 and 4 times in one frame). **GREEN ×2** on the cure, together with P2's `colour-frame-cost.test.ts` (`v01/vitest-GREEN-{1,2}.txt`, 8/8).

**C2-V-03.** Home → Gradient, with the Gradient chunk held 3 s after a reload. Plate box against the landed pane, both passes identical (`ab/pass-{1,2}/{base,cure}/geo.json`):

| cell | base plate → pane | cure plate → pane | cure row y / row height across the land |
|---|---|---|---|
| 1440 (light, dark) | 108 → 861 (0.125) | **804 → 861 (0.934)** | y 88 → 88 · 804 → 861 (base 480 → 861) |
| 390 (light, dark) | 108 → 955 (0.113) | 732 → 955 (0.766) | y 104 → 104 · 1116 → 1339 (base 492 → 1339) |

- At 390, `--scene-band-block` is the band the 844 px viewport shows under the dock (732 px). The Gradient pane is taller than the viewport, so the 223 px still to come land below the fold, where they move nothing on screen.
- A per-pane reserved height would meet the 10 % bar at 390, but it would be a hand-measured number per pane that drifts with every content change. I did not mint one; the orchestrator can rule on that.
- The landed stage heights for every lazy route are recorded in `base-2/geo.json`. At 1440: 400–861 against an 812 band. At 390: 381–955 against a 740 band.
- A pane shorter than the band (browse, generate) now shrinks once on landing, instead of growing ~300–750 px.

**C2-V-05.** At 390, offline, with Tools on, the dock plate spans x 30–360 and y 28–70.
- **base**, both passes and both schemes: chip at (352, 45, 26×14), **intersects: true** (the end cap).
- **cure**, both passes and both schemes: chip at (352, 74, 26×14), **intersects: false** at rest and with Tools on. `scrollWidth` is 390 (no horizontal scroll).
- Frames: `ab/pass-*/*/v05-*.png`.

**Gates ×2 (guarded, cure worktree, `probes/r2-gates.sh`):**
- vitest full, `--maxWorkers=2`: **127/127 files, 1478/1478 tests ×2** (`gates/vitest-full-{1,2}.txt`).
- e2e (`--project=smoke --workers=1`; page-load, o22-status-lamp, cold-nav-scene-enter, walk): **13/14 ×2** (`gates/e2e-run-{1,2}.txt`). OD19-V4, V6 and V8 and every o22 lamp test pass. The one failure is `cold-nav-scene-enter` `/#/`, "the loading plate shows on a slow chunk", and it **fails identically on HEAD** (`gates/cold-nav-on-base.txt`), so it is pre-existing and not caused by this repair.
- `vue-tsc` demo and test projects: 0 errors (`typecheck-{demo,test}.txt`; main tree).
- eslint on the four touched files and the new test: clean (`eslint.txt`).

No golden was re-baselined. No test was deleted, skipped or weakened.

### repair 3

Critic 3's four consumer findings on value: C3-V-01, C3-V-02, C3-V-04 and C3-V-05. Code ``7b437814e``. Evidence is in `value/after/repair-3/` (`v01/`, `v02/`, `v04/`, `v05/`, `gates/`). Every browser run went through `guarded`, headless, with one browser per run and one context per cell. **A/B without worktrees:** each arm is a vite dev server started in-process from the repo's own `vite.config.ts`, on its own port and deps cache (`probes/r3-serve.mjs`, `r3-run.sh`, `r3-watch-ab.mjs`). `cure` serves the tree as written. `base` serves this repair's two files as HEAD has them: a pre-transform swaps foundation.css's first line back, and a load hook reads `ColorInput.vue` from git at `7b437814e~1` (`BASE_REV`). Order: base, then cure, in each of two passes.

| row | verdict | cure | falsifier |
|---|---|---|---|
| **C3-V-01** the :9000 server stalls | **CURED at the root: the event source was Tailwind's automatic source detection, not chokidar.** | `demo/styles/foundation.css`: `@import "tailwindcss" source(none);`. The two explicit `@source` globs already in that file (`demo/**/*.{vue,ts,html}`) become the whole scan. | `probes/r3-watch-ab.mjs` (a write burst outside the served root, measured from inside the server) plus `r3-tw-scan.mjs` and `r3-dom-classes.mjs` (no served utility lost) plus `r3-uptime.sh` (the live :9000, one hour) |
| **C3-V-02** dock grows after Tools | **CURED for the consumer cause. A glass-rooted remainder is named as O-102 sub-row V2-p (below).** | `ColorInput.vue`: the field's block size is glass's `--dock-control-size` (the 40 px dock row), and `align-content: center` centres its one line. `py-2` and the no-op `items-center` are gone. | `probes/r3-dock-height.mjs` (plate height per rAF before, through and after Tools, 4 cells) plus `r3-field-shot.mjs` |
| **C3-V-04** picker drag at 1440 | **PARTIAL, carried. The built-bundle re-read finds 0.3–1.2 ms of consumer script per frame, under the 15 ms bar, so the publish stays on the frame. The residual is frame production (raster), O-102 V3-g.** | none (the cure's condition is not met) | `latency-load.mjs` (`ONLY=v3`, plus per-frame script sums) on a gh-pages build (`probes/r3-built.sh`) |
| **C3-V-05** view switch at 1440 | **Carried under C1-V-05 (P3), re-read on the built bundle without capture.** | none | `load-routes.mjs` hop rows on the gh-pages build (`r3-built.sh`, `KIND=routes`) |

**C3-V-01: the root.**
- **What the stall was.** The `sample` the critic took shows the main thread inside chokidar's fsevents dispatch. That dispatch hands every filesystem event under its stream root to every watched path's listener (`cont.listeners.forEach` → `indexOf`). A stream watching ~600 files costs nothing. The :9000 watcher held **74,637 files**.
- **Where they came from.** I traced every `watcher.add()` back to the stylesheet compile that asked for it, using an AsyncLocalStorage keyed on vite:css's module id (`R3_TRACE=1` in `r3-watch-ab.mjs`).
  - 74,311 came from `demo/styles/foundation.css`.
  - That file's `@import "tailwindcss"` left Tailwind's automatic source detection on. Rooted at the cwd (the repo root), detection walks every file that is not gitignored.
  - `.worktrees/` is untracked, not ignored, so its 13 GB was in scope, along with `docs/` and `bench/`.
  - Each walked file comes back as a postcss dependency, and vite watches every dependency.
- **Measured through vite's own CSS pipeline** (`r3-tw-scan.mjs`, `preprocessCSS` on the repo config, one mode per process; `v01/tw-scan-1.json`):

| | auto (HEAD) | `source(none)` (cure) |
|---|---|---|
| dependencies vite watches | **74,923** (.worktrees 54,492 · docs 17,818 · glass 812 · bench 599 · demo 559 · …) | **610** (demo 332 · glass 276 · tailwind · tw-animate) |
| one compile of foundation.css | **14,845 ms** | **319 ms** |
| rule selectors emitted | 3,277 | 2,019 |

- **What the 1,258 dropped selectors are.** All of them are utilities minted from words in files the app never serves. Examples: `.paper-underpaint`, `.cartoon-surface`, `.end-1.5`, `.@container/scrolled`, plus `bg-card` and `ease-standard`, which `demo/DESIGN.md` names in prose.
  - Both modes scan every served file with the same extractor, so a class in a served file can't be lost.
  - **Browser check** (`r3-dom-classes.mjs`, ×2, `v01/dom-classes-{1,2}.json`): every route at 1440 and 390, light and dark, with the Tools face and its colour-input face opened. **595–597 DOM classes, and 0 in the dropped set: GREEN ×2.**
- **The falsifier** (`r3-watch-ab.mjs`, `v01/ab-{base,cure}-{1,2}.json`):
  - Setup: the dev server, then every route loaded in a browser, then a child process makes 20,000 writes across 500 files under `.worktrees/.r3-probe-<arm>/`. That is outside the served root, like a sibling seat's run.
  - It measures the server's own event-loop lag and its GET / latency during the burst and for 10 s after.
  - Liveness: an add inside the served root and a change to an out-of-root watched file must both still reach the watcher.
  - GREEN means lag under 250 ms, every read under 1 s, and both liveness events seen.

| pass | arm | watched | loop lag max | GET / during burst | GET / after | verdict |
|---|---|---|---|---|---|---|
| 1 | base | 74,637 | **46,518 ms** | 2 reads (the loop was blocked) | **5,724 ms** (Tailwind's re-scan) | **RED** |
| 1 | cure | 595 | **7 ms** | 12 reads, max 14 ms | 10 ms | **GREEN** |
| 2 | base | 74,639 | **42,187 ms** | 2 reads | **6,137 ms** | **RED** |
| 2 | cure | 595 | **8 ms** | 8 reads, max 15 ms | 15 ms | **GREEN** |

- **What I tried first and reverted.** First I set chokidar `useFsEvents: false` in vite.config.ts's dev branch. That gave 25 s → 42 ms lag, but the watcher still held 73,911 entries over 9,847 directories, so the cost had only moved. With `source(none)` and HEAD's chokidar defaults (fsevents on), the lag is 7–8 ms. So vite.config.ts is unchanged.
  - The finding's other candidates: `demo/app/.vite-critic-9216/` (14 MB, last written 2026-10-16) is dormant and is not where the 74k files came from. `test-results/` is already in vite's default `ignored` list.
- **`seededGroundInline` (0bab8ea8a), re-read.** Its `watcher.on("change")` is one `Set.has` per event. Its `build()` re-runs only on the next `index.html` transform after one of its own bundled modules changes. It is not an event source, and it is not on any path the trace saw.
- **Production gets the same cure.** The gh-pages build also runs from the repo root, so it was scanning 13 GB and shipping the 1,258 junk utilities. The `source(none)` build has the same 2,019-selector set.
- **The live :9000 server.**
  - Before: pid 79993, up 13 h 22 min, 95.7 % CPU, 4.78 GB RSS. GET / timed out at 10 s (`000`).
  - I stopped that one vite process and started the same command `scripts/dev/dev.sh` runs (`VITE_API_URL=http://localhost:3000 npx vite --port 9000 --strictPort`) under `guarded --timeout 720` (`GUARD_ALLOW_LONG=1`, `--rss-gb 8`; 9000 is in keep-ports). The log is `.dev/logs/web-9000-r3.log`. dev.sh itself, its API and its watch-builds were not touched.
  - Every route was then loaded once in a browser (`v01/uptime-9000/crawl-start.json`).
  - **One hour** of `r3-uptime.sh` (`v01/uptime-9000/`): **120 samples, 30 s apart, 04:14–05:14.**
    - Each sample timed GET / and GET /main.ts (the entry module).
    - **0 non-200. GET / max 69 ms, /main.ts max 2 ms.**
    - The server sat at 1–62 % CPU and **0.98 GB RSS, flat** (983,664 → 985,216 KB), against 4.8–5.3 GB and 94–99 % before.
    - Files the other seats wrote under the repo in that hour (`writes-by-dir.txt`): `dist/` 212 (value's `build --watch`), `docs/` 12, `test-results/` 3, `e2e/` 2.
    - That was a light hour, so the burst falsifier above is the stronger proof. It replays a 20,000-write sibling run, and the cured server's loop stays under 8 ms.

**C3-V-02: the field, and what glass still does.**
- **Falsifier** (`r3-dock-height.mjs`). Plate height at rest (before the first Tools visit), then sampled every rAF through Home→Tools and Tools→Back, then after Back. GREEN means every sample equals the rest height within ±0.5 px.
  - **`keyboard` mode** parks the pointer off the dock and presses Enter on each control, so the only variable is the field (`v02/keyboard-{base,cure}-{1,2}.json`):

| pass | arm | 1440 light/dark: rest / Tools / after Back (range through swaps) | 390 light/dark | verdict |
|---|---|---|---|---|
| 1, 2 | base | 40 / **45** / **45** ([42,45], [45,45]); field 45.9 | 40 / **42** / **42**; field 42 | **RED ×2** |
| 1, 2 | cure | 40 / 40 / 40 ([40,40], [40,40]); field 40 | 40 / 40 / 40; field 40 | **GREEN ×2** |

  - With the colour-input face open (`v02/field-{base,cure}.json`, PNGs): base field and plate are 45.9/46 at 1440 and 42/42 at 390, and the plate's top moves 3 px (20.5 → 17.5). Cure field and plate are 40/40 at both widths, and the plate's top stays at 20.5/29. The text's centre offset is the same in both arms (−0.95 px at 1440, −0.5 px at 390).
- **`pointer` mode** (`v02/pointer-{base,cure}-1.json`): the mouse rests on the dock, as an owner's does. base: 40/45/45 at 1440, and 40/42/44 and 40/42/43 at 390. cure: **40/40/43 in all four cells.**
- **The remaining 3 px is glass-rooted: O-102 sub-row V2-p (measured).**
  - `DockCrossfade` keeps a monotonic peak, `max(face.scrollHeight)`, re-measured on register and resize, as its `min-block-size` (`dist/dock.js`, `f()` → `--dock-crossfade-peak`).
  - The control under the pointer takes glass's `.dock-icon-button:hover { scale: var(--scale-hover-dock) }` (computed `scale: 1.1`, a 40 px button → 44 px box). A transform counts toward its face's scrollable overflow (face `scrollHeight` 42–43).
  - So Back, or the resize that follows it, latches the run at 43 px for the rest of the session. No consumer element is involved: the hovered control is glass's own `.dock-icon-button`, and the peak is glass's own measure.
  - Cure belongs in glass: the peak should read the layout box, not the overflow, or skip `scale`d descendants. The consumer does not patch this locally.

**C3-V-04: the built-bundle re-read** (`v04/pass-{1,2}/latency-load.json`). Build: `vite build --mode gh-pages` of the cure tree into a scratch outDir, served by `e2e/smoke/perf/serve-built.mjs`. Picker channel slider, 40 moves; p50/p95 ms; LoAF count; consumer script ms per frame (all LoAF script time over every drag frame) and per long frame (p50/max):

| cell | pass 1 | pass 2 | rAF interval p50 (pass 1/2) |
|---|---|---|---|
| light-1440 | 41.5/59.2 · 8 LoAF · **1.2 ms/frame** (5/22 per LoAF) | 39.8/59.2 · 10 · **1.2** (7/16) | 43.4 / 43.2 ms |
| dark-1440 | 41.0/59.5 · 3 · **0.4** (10/11) | 38.5/44.7 · 2 · **0.3** (10/10) | 38.2 / 43.9 ms |
| light-390 | 17.7/26.9 · 0 · 0 | 17.9/21.2 · 0 · 0 | 8.4 / 8.3 ms |
| dark-390 | 18.2/23.2 · 0 · 0 | 18.4/21.7 · 0 · 0 | 8.8 / 8.2 ms |

- The gradient slider: 1440 p50 18–20 ms, p95 42–47 ms; 390 p50 6–8 ms, p95 12–18 ms; 0–1 LoAF.
- **The repair-3 condition** ("if consumer scripts still sum to more than 15 ms per frame") **is not met:** 0.3–1.2 ms per frame, at most 22 ms in a single long frame. The top LoAF script is Vue's scheduler (`vue.runtime…::n`, 10–43 ms over the whole drag), then HeroBlob's rAF (6–19 ms). `useAtmosphereFrameCoalesce` `publish` no longer appears.
- So the publish stays on the frame. Moving it would trade the live atmosphere for nothing measurable.
- **What is left at 1440 is frame production.** The rAF cadence there is ~43 ms (≈ 23 fps) with almost no script, against 8 ms at 390. That is SwiftShader rastering the 1440×900 scene with its canvases. It stays with **O-102 V3-g**.
- Against the bar (p50 ≤ 25, p95 ≤ 50): 390 meets both. 1440 is PARTIAL.

**C3-V-05: the built re-read** (`v05/pass-{1,2}/routes-{1440,390}.json`, `load-routes.mjs` hop rows, CPU unthrottled, no screenshots). From a settled Home, an in-app hop to the route, framed from the input to content plus 700 ms:

| hop | 1440 pass 1 | 1440 pass 2 | 390 pass 1 | 390 pass 2 |
|---|---|---|---|---|
| Home → Mix | max 144 ms · 2/37 frames > 50 | max 119 · 9/23 | max 54 · 1/64 | max 54 · 1/55 |
| Home → Gradient | max 152 · 5/26 | max 154 · 6/27 | max 60 · 1/59 | max 56 · 1/59 |

- Every hop has `ltMax 0`: no main-thread task over 50 ms. The long frames at 1440 are not script.
- So without capture the frame budget is no better, and C1-V-05's raster attribution is reinforced.
- Carried under **C1-V-05 (P3)**. No new cure.

**Gates ×2 (guarded, main tree):**
- The main tree is HEAD plus this repair plus the other seats' uncommitted hunks in `demo/palettes/PalettesPane.vue`, `demo/scenes/about/AboutPane.vue`, `demo/shell/PaneShell.vue`, `demo/test/palettes/palette-card-layout.test.ts` and foundation.css line ~708. I committed only my hunks.
- vitest full, `--maxWorkers=2`: **1479/1480 ×2** (`gates/vitest-full-{1,2}.txt`).
  - The one failure is `palette-card-layout.test.ts` › "SS-8 B13 … L-3: the attribution ink …". That case is part of another seat's **uncommitted** addition to the file (+69 lines, `git diff`), and it fails in its own `querySelector("[data-palette-swatches] .font-mono")`. It touches neither file of this repair.
- e2e (`--project=smoke --workers=1`; page-load, flows/color-propose, o10d-display-voice-census, ss8-z2-picker-cohort, walk): **23/25 ×2** (`gates/e2e-run-{1,2}.txt`).
  - The two failures are the same in both runs, and neither comes from this repair.
  - (a) `o10d-display-voice-census` › "every heading … speaks the display voice": `Home: heading "Home" off the display face`. That heading is P1's `<h1 class="sr-only">` (`bdd97b752`, OD19-V4). It carries no display-face class, so it speaks the body face. The census has asserted the display face on every heading since P1.
  - (b) `ss8-z2-picker-cohort` › desktop 1440 › "Z-ColorPicker-14: the label→readout seam": 42.578125 against < 14.87.
  - **Attribution** (`probes/r3-e2e-ab.sh`, `gates/attrib/e2e-{base,cure}.txt`, both specs against each arm's server):
    - (b) fails with the identical 42.578125 on base.
    - (a) fails on base too. That run stops one step earlier, at an `element(s) not found` visibility wait, and its third case ("gated title surfaces") also failed in base only. That third case passed on cure and in both gate runs.
- `vue-tsc -p tsconfig.demo.json`: 0 errors (`gates/typecheck-demo.txt`). eslint on `ColorInput.vue`: clean (`gates/eslint.txt`).
- gh-pages build of the cure tree: rc 0 (`v04`/`v05` ran on it).

No golden was re-baselined. No test was deleted, skipped or weakened. glass-ui is untouched. V2-p is named for O-102 with the measurements above.

### glass-10.1.1

Adopting `@mkbabb/glass-ui` **10.1.1** (tag `v10.1.1` at `d7baa1dc3`). Read before the work: MIGRATION §10.1.1 and the CHANGELOG 10.1.1 section, both whole. Code `f77db7842`. Evidence: `value/after/glass-10.1.1/`. Every run went through `guarded`, headless Chromium, one browser per run and one context per cell. Runs were in the shared tree. It carried other seats' uncommitted hunks: SS-8's comment edits and its `palette-card-layout.test.ts` addition, plus `e2e/visual/*`.

| item | verdict | detail |
|---|---|---|
| pin | **ALREADY ADOPTED** | `package.json` and the lockfile pin `10.1.1` exact. Commit `9ed00b5cd` (repair 1, C1-V-01). `node_modules` reads 10.1.1. `DockContext.expanded` needs nothing here, because value never calls `provideDockContext`. |
| G-2 menus on the popover rung | **RETIRED** (`f77db7842`) | The consumer `z-popover` class is removed from all five `DropdownMenuContent` sites: `UserSortMenu`, `PaletteCardMenu`, `GenericActionBar`, `MobileMenuDropdown`, and `ProfileSection` ×3. The `shell.css` paint-order note now names the producer rung. Live (`probe-v6-menu-1.json`, 390): the dock "Menu" content carries `z-popover` from glass's `overlayContentAttrs`, at z-index 130. All 5 of 5 hit points land on the menu. |
| O-102(3) collapse closes face overlays | **NO CONSUMER CODE TO RETIRE** | value has no hand-closing code on dock collapse (grep over `demo/**`). The release delivers the close. |
| G-1 Sheet fixed | nothing to retire | value has no `SheetContent` position override. |
| G-3 seat roving, O-102(6) floats portalled | nothing to retire | value has no consumer workaround for either. |
| Skeleton shimmer (OD19-V6) | **ALREADY ADOPTED, RE-READ LIVE** | `PaneLoadingPlate` passes `shimmer` on both bars (`9ed00b5cd`). The live run held the gradient chunk on Home → Gradient (`probe-v6-menu-1.json`) and read, at 1440 and at 390: plate text `""`, `aria-busy=true`, both bars `data-shimmer`, `::after` animation `skeleton-shimmer`, and the `::after` transform moving between reads 400 ms apart. No local shimmer CSS exists. The `--skeleton-shimmer-delay`/`-tint` writes in `PaletteCardSkeleton`/`utils.css` are dormant producer seams that glass 10.1.1 does not read. They are not a local animation, so they are left alone. |

**Gates ×2 (guarded):**
- `npm run typecheck` (lib, demo, test and e2e projects): rc 0 ×2 (`typecheck-{1,2}.txt`).
- `vitest run --maxWorkers=2`: **1490 / 1491 ×2** (`vitest-{1,2}.txt`). The one failure is `palette-card-layout.test.ts` "SS-8 B13 … L-3". It belongs to another seat: an uncommitted, born-RED addition of 69 lines in the shared tree. It is not touched here.
- e2e `--project=smoke --workers=1`, on `od19-v2-dock-settle`, `page-load`, `w12-dock`, `oracles/v7r-overlay-layer` and `ss8-b14-skeleton-ink`: **16 / 18 ×2** (`e2e-{1,2}.txt`). The two failures are the known `w12-dock` pair: "Login hover plate `rgba(0,0,0,0)`" and "layer switch: `W12e seed` ≠ `Tools`". They are the same HEAD regression that `### repair 1` measured on 10.1.0 and 10.1.1 alike, and it is routed to the dock seat (Track A). The v7r overlay paint-order oracle passes with the class retired.

No golden was re-baselined. No test was deleted, skipped or weakened. glass-ui is untouched.

### residue (§0gp)

Residue seat, 2026-10-27, `claude-opus-5-5`. Binding: COHESION §0gp (2: every OD19 frame/latency budget is gated on the real-GPU cell of record, ×2; software raster asserts liveness only, the form ruled LAWFUL at §0fr.3), §0fr.2–.3, §0gf, §0dm. Evidence: `value/residue/` (`gpu-read-2/` the spec reads, `anatomy/` profiles and LoAF, `probes/` the instruments, `gates/`). An earlier residue seat (2026-10-21) left `gpu-read/`, `v3-trace/`, the uncommitted `od19-v3-colour-latency.spec.ts` and the `useRealGpuCell()` line in `od19-pane-swap.spec.ts`; this seat adopted and finished them. Every run went through `guarded`. Browser runs were headless, with one browser per run and one context per cell. Machine load was 28–83 throughout, from other seats.

**The cell of record.** Headless real Chrome, `channel:'chrome'`, `--use-angle=metal`. WebGL renderer: "ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)". The cell is opted in by `W12_REAL_GPU=1` (`perf/real-gpu.ts`), and each spec file names the need (a GPU/ANGLE-Metal frame-production measurement).

#### Spec changes (instrument only; no assertion moved)
- `e2e/smoke/od19-pane-swap.spec.ts`:
  - **§0gp.2 split.** Liveness ("title paints", "the swap moves") is asserted on every renderer. The title ≤ 400 and window ≤ 450 legs assert only off a software rasteriser. `renderer` and `realGpu` are banked in the record.
  - **Instrument bug cured.** The LoAF observer sorted `e.scripts` in place. That array is frozen, so every long frame threw `TypeError: Cannot assign to read only property '0'` into the app's `window.error` handler (the 2026-10-21 `gpu-read/run-1.txt` shows it on every LoAF) and lost the attribution. It now sorts a copy. The error count in `gpu-read-2/head-{2,3}.txt` is **0 ×2**.
  - `OD19_OUT` can now redirect the output.
- `e2e/smoke/od19-v3-colour-latency.spec.ts` (new; carries the same split): it now also banks the **instrument floor**, `floorP50`/`floorP95`. That is the same double-rAF read over 41 hover moves across the inert left gutter. It is recorded and never asserted.

#### Budget reads on the real-GPU cell (×3, `gpu-read-2/`)
| budget | head-1 | head-2 | head-3 | verdict |
|---|---|---|---|---|
| gradient title @1440 (≤ 400) | 400 | 272 | 281 | **GREEN ×2** (head-1 was under load 80, with glass readback frames, below) |
| gradient / mix window @1440 (≤ 450) | 483 / 433 | 450 / 433 | 450 / 433 | **GREEN ×2** |
| gradient window @390 (≤ 450) | 450 | 450 | 450 | GREEN |
| **mix window @390 (≤ 450)** | 500 | 500 | 500 | **RED ×3, deterministic. Root named; the cure is routed (below).** |
| V3 p50 / p95 (≤ 25 / ≤ 50), 4 cells | 22.3–27.7 / 31.8–87.6 | 28.6–38.9 / 45.4–48.5 | 20.5–34.6 / 40.1–46.1 | p95 GREEN in 11/12 cells. p50 RED in 7/12. **Instrument floor 29.1–30.6 in every cell.** |

The swap's designed moving window is 433 ms: the leave, plus the commit, plus the enter. At 1440 a 450 reading is one 16.7 ms frame over that.

#### The 390 window: the outgoing panes reorder at the input frame (consumer root, owner Track A)
- Probe: `probes/mix390-jump.mjs` (390, GPU).
- At t ≈ 9 ms after Home → Mix, **before** the leave begins at about 75 ms, the stage child jumps from y 104 to y 7766, and the inspector's outgoing About (h 7646) jumps to y 104.
- So the user taps Mix, the picker vanishes below 7.6k px of About text, and that text is what fades out. The same jump affects every hop between Home and the picker-stage routes (palettes, mix, blob), and every hop between those routes and the non-picker-stage routes.
- **Root:** shell.css's one-track rule (`A2-VA-L2-5`), `.app-layout:not([data-view="picker"]) .pane-wrapper--stage[data-pane="color-picker"] { order: 1 }`. It keys on `data-view` and on the wrapper's `data-pane`. App.vue binds both from the route (`viewManager.currentView`, `region.key`), and the route moves at the input. `PaneSlot` commits the displayed key only after its rAF/preload hold, with the out-in leave after that.
- **The cure:** the order must key on the **displayed** pane. App.vue already receives the displayed key from every slot (`slotReports(role).onMount(instance, liveKey)`). Stamp it on the region wrapper, for example as `data-shown`, and key the rule on the stage showing `color-picker` while the inspector shows something other than `about`.
  - That keeps the settled order byte-identical: the subject comes first on palettes, mix and blob, and the picker comes first on Home.
  - It moves the flip to the commit.
- **Not landed here.** `demo/app/App.vue` is dirty with Track A's X.W11.v1 O-10d hunk, and `PaneSlot.vue` belongs to Track A (§0gp task law). A CSS-only form was tried on paper and ruled out:
  - an About marker (`.about-card`) misorders a cold Home, because About is lazy;
  - the `[inert]` leave marker does not cover the 0–75 ms pre-commit window, which is where the jump happens.
- **Routed to Track A (X-W11) by id as `OD19-V7-390-ORDER`.** Falsifier of record: od19-pane-swap 390 mix window on the GPU cell, RED 500 ×3. The first move must come at the leave (≈ 75 ms), giving ≈ 433.

#### V3: the p50 bar sits below the instrument's own floor (measured), and the tail is glass
- **The instrument is phase-locked, and it reads in reverse** (`probes/v3-floor-spin.mjs`, `anatomy/floor-spin-r{1,2}.json`, ×2). Setup: the same double-rAF read over 41 Playwright hover moves on the inert gutter at light-1440, with a synthetic busy-wait added inside the pointermove listener.

| added main-thread work per move | run 1 p50 / p95 | run 2 p50 / p95 |
|---|---|---|
| 0 ms | 31.1 / 31.4 | 30.7 / 32.1 |
| 4 ms | 27.1 / 28.2 | 26.2 / 28.0 |
| 8 ms | 23.0 / 24.0 | 22.4 / 23.8 |
| 12 ms | 18.8 / 19.4 | 18.9 / 20.0 |

  - **More work reads lower.** Playwright injects each move after the renderer acknowledges the previous one, so where the injection lands in the frame depends on how long the handler held the thread. The read is that phase plus one frame. It is not the time the product takes to paint the input.
  - With zero work, the floor (29.1–30.6 in 8 of 8 spec cells, 29.5–31.1 in the probes) is already above the 25 ms p50 bar. A p50 under 25 is reachable only by a handler that takes long enough to shift the phase. That is why the picker drag (22–39) sometimes reads below its own floor.
  - **No product cure can make this p50 bar hold. Re-ruling the instrument is an orchestrator act (W2.md §11 guardrail 1),** so it is ESCALATED as **ESC-OD19-V3-instr**, not changed here.
  - A lawful product-latency read on the same cell would be one of two things: frames missed during the drag (`rafP50` is **16.7 in 12/12 cells**, so the drag is painted frame-on-frame), or Event Timing / LoAF `renderStart` minus input.
- **What the drag costs, named** (`anatomy/head-{1,2}.json`, `loaf-1.json`; CDP CPU profile, GPU cell, dev build, a 41-move drag of about 1.9 s):
  - **Consumer.**
    - `certify` 90–101 ms inclusive, about 2.3 ms per input. These are distinct questions, already memoised per (colour, ground, floor) in `certifyAccentInkOnce`.
    - `ColorNutritionLabel` render 43 ms, and `Dock.vue:133` 42 ms.
    - `useAtmosphereFrameCoalesce` `publish` 8–17 ms per frame.
    - The pointermove invoker 8–15 ms, including Vue's flush.
    - Per-input consumer script is about 5–8 ms on the Vue dev runtime, inside the 16.7 ms frame. The 50–60 ms LoAFs (1–10 per drag) are `invoker` + `publish` + glass `useRAFLoop`.
  - **Glass: the live backdrop sampler's synchronous GPU readback.** New measured sub-row **V3-s**, cited under O-102 and not re-filed.
    - GlassDock's `useGlassBackdropLuminance` live mode, opted in by SS-8 Z-Dock-13 (`Dock.vue` `:background-canvas="fieldCanvas"`), runs `Te()`: `drawImage(<WebGL field canvas>)` → `getImageData(0,0,32,32)`. It runs from its `useRAFLoop` tick (≥ 250 ms) and from its ResizeObserver.
    - On a real GPU that is a sync readback: 17–19 ms `getImageData` plus 11–19 ms `getBoundingClientRect` (`Ee` → `elementsFromPoint`) per drag.
    - Under load it is the tail. One `useRAFLoop` frame took **433 ms** of script inside a **1038 ms** frame (the light-1440 1033 ms input). A `useResizeObserver h` frame took **161 ms**.
    - In the hops it is the 149–155 ms LoAFs (head-1, 1440 and 390), and the Home→Mix **283 ms** frame (`getImageData` 286.8 ms, `anatomy/hop-head-2.json`).
    - **Ask (glass):** an async readback (`createImageBitmap` / PBO+fence), or a sample from the field's own colour model, never a sync `getImageData` on a WebGL source.
  - **Glass: liquid press reads a token every spring tick.** New sub-row **V5-h**, cited under O-102. `useLiquidPress` → `useSpring` → `motionTempo` reads `getPropertyValue` 15–17 ms per hop, plus `writeVelocityWeight` `maxStretch` 4–5 ms. **Ask:** read the tempo token once per press, not per tick.
- **V3-g (HeroBlob `resume()` → `createCanvasLifecycle` re-measure, O-102 §8)** was re-read at HEAD. It has **0 samples** among the drag's native-caller attributions (only glass dock frames remain; `anatomy/head-2.json` `callers`). It is no longer measurable on this cell, so §8 stays open in glass and costs this drag nothing.

#### The critic residue beyond the budgets (passes 1–3)
| row | state at HEAD | verdict |
|---|---|---|
| C1-V-05 / C3-V-05, incoming mount frame / view switch | On GPU, gradient and mix 1440 hold the designed 433–450 window ×2. The remaining long frames are glass V3-s/V5-h (above). | **DISCHARGED at 1440 on the cell of record.** 390 mix is `OD19-V7-390-ORDER` (Track A). |
| C2-V-03 @390, plate 0.766 of the landed pane | Unchanged. The plate fills the visible band, and the rest lands below the fold. A per-pane hand-measured reserve was declined at repair 2 for the orderer's ruling. | **Carried to the orchestrator as before.** Nothing moves on screen, so there is no root cure without a drifting constant. |
| C3-V-04, picker drag @1440 raster | On GPU, rAF stays at 16.7 and consumer script is about 5–8 ms per input. What is left is V3-s (glass) plus the instrument floor. | **Consumer DISCHARGED.** Glass V3-s is cited under O-102. The bar is ESC-OD19-V3-instr. |
| o10d census, sr-only H1 off the display face (repair 3 gate (a)) | Track A's uncommitted X.W11.v1 O-10d hunk in App.vue adds `font-display`. | Owned by Track A. Not touched. |

#### Gates (×2, guarded)
- `npm run typecheck`: rc 0 ×2 (`gates/typecheck-{1,2}.txt`).
- `vitest run --maxWorkers=2`: **1490/1491 ×2** (`gates/vitest-{1,2}.txt`). The one failure is `palette-card-layout.test.ts` "SS-8 B13 … L-3". It belongs to another seat: an uncommitted, born-RED addition, the same row every OD19 gate since repair 3 has shown.
- Touched e2e, software cell (`--project=smoke --workers=1`): od19-v3-colour-latency plus od19-pane-swap, **6/6 ×2** (`gates/e2e-soft-{1,2}.txt`). This is liveness only; the readings are banked as INFORMATIONAL per §0gp.2.
- Touched e2e, real-GPU cell: the budget table above. RED rows are named with their roots, and no assertion moved.

No golden was re-baselined. No test was deleted, skipped or weakened. glass-ui is untouched. Neither shadcn `ui/**` nor `scripts/dev/dev.sh` was touched. App.vue and PaneSlot (Track A) were not touched.
