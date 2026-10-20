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
- **Re-check 2026-10-20 after the glass 10.1.1 adoption (`4d806342b`).** No code change; the cure `006fd567a` is pushed on `origin/tranche-u`.
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
