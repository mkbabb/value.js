SERVED MODEL: claude-opus-5-5

# KF.W13U — execution record (Track B · X·KF)

Spec: `docs/tranches/X/keyframes/waves/KF-W13.md` §ADDENDUM 2026-09-23 (`:315-328`; units `:324-327`, close `:328`) · minted COHESION §0be · model law §0bc (Opus 5.5 every seat) · frames `keyframes/evidence/W13U/owner-2026-09-23-{easing-label,timeline-grey}.png` (both read at this seat).

## Open

- **Date**: 2026-09-23 (SEAT 0, OPEN). kf substrate `cfecfbce` = `origin/master` = HEAD (⟨`git -C ../keyframes.js rev-parse HEAD` / `log -1 origin/master`⟩ → `cfecfbce…` both).
- **Crash-recovery**: `git status --porcelain` — kf: only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (not in any KF.W13U writable set; untouched); value.js: `CARRY-LEDGER.md` + `scripts/dev/dev.sh` (both outside this wave; never touched). **0 inherited paths.**
- **Precondition "Opens after: KF.W13T CLOSED"** — LEDGER `:57` status cell **CLOSED 2026-09-17 ⟵ CHECK 1 (RESUME, L-20 pass 1) CONFORMANT**; record `execution/B/KF-W13T.md` carries `## Close — WAVE CLOSE SEAT` (`:682`) and `## Check 1 — RESUME` (`:729`); the named artefacts land at kf `cfecfbce` (the `.k3` tip). **MET.**
- **Rulings cited (never re-opened)**: §0be (the served-page instrument rule; OA-26..29) · §0bc (Opus 5.5; O-55 `DOCK-SCROLL-MORPH`) · §0bd (O-56 `DOCK-MORPH-ROOT`, glass READ-ONLY) · §0be glass BL ack of O-53..O-56 (banked glass `a97a9ddd`; honest-RED ids stand).
- **E13 Step-0 mail sweep** (four paths, read-only, against the last sweep clock 2026-09-23 06:32:48, `find -maxdepth 1 -type f -newermt`): value.js `V/` + `V/coordination/` → `INBOX.md` only · glass: newest tranche dir is **BL** (`ls -t` → `BL BK BJ …`) but BL has no `coordination/` (`CHARTER.md` · `FORMATION-PROGRESS.md` · `audit/`) → **BK stays the live inbox**; BK new = our own O-55/O-56 mirrors only · keyframes `V/coordination/` → none · atlas `*/coordination/` → none. **0 new I-n.** Every BK `glass-outbound-*` letter already rowed (grep counts ≥1 each). UNREAD rows: I-40 only (Track C, outside KF.W13U). Sweep line appended to `INBOX.md`.

## Baseline (BEFORE — served page, headed real GPU, read-only)

Instrument: `http://localhost:5173/` (kf dev server, HTTP 200), headed Chromium via value.js's Playwright, `--ignore-gpu-blocklist`; WebGL renderer ⟨probe⟩ → `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, …)` (real GPU, not SwiftShader). Probes banked: `keyframes/evidence/W13U/baseline/probe2.mjs` (cube rest/play + slider + triggers) and `probe3.mjs` (easing dropdown); frames `baseline/cube-after-play-1440.png`, `baseline/easing-dropdown-1440.png`. Each probe run ×2; both runs agree.

| gate (unit) | limb | BEFORE ×2 | reading |
|---|---|---|---|
| G-KFW13U-w (`.w`) | `#/cube` `.cube` computed transform across 1 s **at rest** | `none` → `none` ×2 | **RED — owner OA-27 reproduced** (cube does not animate on load) |
| G-KFW13U-w (`.w`) | same, **after Play** (`getByRole('button',{name:/^play/i})`) | `matrix(1,0,0,1,0,0.304)` → `matrix(1,0,0,1,0,3.192)`; `document.getAnimations()` 0 → 2 | **limb moves — translateY only** (no rotation component). kf's own `scripts/observe/demo/subject-animates.mjs` (header) warns the bob/tilt move independently of the engine's subject write; `.w` MUST discriminate engine write vs. idle bob before counting this limb. Listed in greenBeforeCure. |
| G-KFW13U-w (`.w`) | `#/` home | "Select an animation…" hero; `.cube` transform `none` ×1 s; 20 running doc animations (chrome) | RED-consistent (no scene animation selected at boot) |
| G-KFW13U-t (`.t`) | slider "Scrub animation timeline" at boot | `data-disabled` **true**, `aria-valuenow` 0, ×2 | **RED — owner OA-29 reproduced** (greyed until an animation starts; `PlaybackRibbon.vue:50` `:disabled="!isAnimStarted"`, `:109` `.is-disabled`) |
| G-KFW13U-t (`.t`) | same after Play | `data-disabled` false, `aria-valuenow` 1462.4 | enabled only once playing — the drag-scrubs-cube limb unmeasured (owed by `.t`) |
| G-KFW13U-e (`.e`) | easing trigger (`button[role=combobox]` hasText ease-in-out) | text `"ease-in-outslow start & end"` (concatenated) · SVGs = `lucide-chevron-down` only, ×2 | **RED — owner OA-28 trigger limb reproduced** (no curve glyph; name+description unseparated; source `ChannelOptions.vue:298-346`) |
| G-KFW13U-e (`.e`) | dropdown rows `[role=option]` | n **29**, rows with a non-lucide `svg path` **29**, ×2; rendered rows show glyph · mono name · muted description, visually separated (frame `easing-dropdown-1440.png`); `textContent` concatenates (`"linearconstant velocity"`) | **GREEN-before-cure on the row-glyph clause** (R.2 finding: the owner's "or in the dropdown" is not reproduced at this surface for glyph presence; `.e` must test glyph TRUTH — each path matches its easing, several glyphs read near-identical at 1440 — and the a11y name separation) |
| G-KFW13U-d (`.d`) | dock transition blur/jitter, WebM | not captured at SEAT 0 (the WebM before-capture is `.d`'s own first act per spec) | owed; honest-RED ids `DOCK-MORPH-ROOT` (O-56) · `DOCK-SCROLL-MORPH` (O-55) stand |
| close | `npm run check` · vitest · kf e2e · gh-pages leg | not run at SEAT 0 (KF.W13T close banked `check` exit 0, `test:demo` 505/505 at `cfecfbce`); gh-pages build writes `dist/` → owed by each unit's served-page gate and the close seat | cited, not re-run |

Pageerrors on every probe run: **0**.

## Unit plan

Order (spec: "Units, strictly serial"): **[`.w`] → [`.t`] → [`.e`] → [`.d`]**, one unit at a time; ESCALATED units do not halt the wave. Model: Opus 5.5 every seat (§0bc; spec "Model"). The addendum declares no §File Bounds of its own: the writable sets below are drawn from the spec's named locations (the addendum's own "name the break … cure at its owner", and the §0ao.1 `.e` grant it succeeds); any write outside a unit's set is an ESCALATION. Every unit's record/evidence rows: this record, `docs/tranches/X/keyframes/evidence/W13U/**`, its LEDGER cells (append-only). glass-ui READ-ONLY. Every gate is read on the served dev page (headed, real GPU) AND the gh-pages build; each unit first reproduces the owner's observation there (baseline above) or ESCALATES with frames.

| unit | model | spec | writable (kf unless noted) | gates |
|---|---|---|---|---|
| `KF.W13U.w` | opus (effort high) | addendum `:324` | `demo/scenes/**` · `demo/components/instrument/transport/**` · `demo/components/playback/**` · `demo/state/**` · `demo/composables/**` · `demo/kf-engine.ts` · `demo/app/lifecycle/**` · `demo/app/scene/**` · `src/animation/**` (only if the break's owner is the library) · `vite.config.ts` (the dist/source resolution row only) · `test/**` (witness) | G-KFW13U-w: `.cube` engine-written transform changes across 1 s at rest AND after play ×2 (frame diff + `getAnimations()`/rAF sample, bob discriminated); every animation in the list plays; vue-tsc 0 · test:demo green · push |
| `KF.W13U.t` | opus | `:325` | `demo/components/playback/**` · `demo/components/instrument/timeline/**` · `demo/composables/useDragScrub.ts` · `demo/state/**` · `test/demo/**` | G-KFW13U-t: served page, slider enabled (no `data-disabled`, no grey token) at boot, pointer drag moves playhead AND cube ×2; vue-tsc 0 · test:demo green · push |
| `KF.W13U.e` | opus | `:326` | `demo/components/instrument/transport/channel-controls/**` · `demo/utils/reference-data/easingGroups.ts` · `demo/scenes/easing/**` · `test/demo/**` | G-KFW13U-e: trigger contains an SVG path matching the selected easing (from the easing function) with the name and description separated; every dropdown row renders its own (true) curve ×2; vue-tsc 0 · test:demo green · push |
| `KF.W13U.d` | opus (effort high) | `:327` | `demo/app/dock/**` · `demo/app/App.vue` (dock consumer end) · `demo/app/transition/**` · `demo/styles/**` · `test/demo/app/**` · value.js `INBOX.md` (append only, O-55/O-56 addenda-beside if a new producer fact) | G-KFW13U-d: WebM of each dock transition before/after; 0 elements with two animation owners per property; text pixel-sharp at rest after a morph; producer halves honest-RED `DOCK-MORPH-ROOT` (O-56) / `DOCK-SCROLL-MORPH` (O-55), no consumer copy; vue-tsc 0 · test:demo green · push |

Close (wave close seat, after `.d`): `npm run check` exit 0 · vitest GREEN · kf e2e GREEN · the four served-page gates re-read by the check seat itself (spec `:328`).

## Unit receipts

### KF.W13U.w

SERVED MODEL: claude-opus-5-5 · effort high · spec `KF-W13.md:324` + COHESION §0be · writable per the Unit plan row.

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (outside the set; untouched). **0 inherited paths.**

**Acts, in order.**

1. **Reproduced OA-27 on the served page** (`http://localhost:5173/`, headed Chromium, `--ignore-gpu-blocklist`; probe `evidence/W13U/w/probe-w1.mjs`, which reads the engine's INLINE write on `.cube` plus `.idle-hover`): at rest `.cube` inline `""`, computed `none` → `none`; after Play the inline write was `translateY(0.258px)` → `translateY(1.351px)` → `translateY(3.124px)` — the ONLY engine write, and it is the Hover channel's bob; no rotate component ever. `document.getAnimations()` on the cube subtree: 0 (the group paints by rAF, not WAAPI).
2. **Named the break at the bytes.** kf `demo/scenes/cube/useCubeDemo.ts` (pre-cure `setTargets`) put all three channels — `Rotations` (`rotateX/Y/Z` list), `Matrix` (`matrix3d`), `Hover` (`presets.hover`, `translateY`) — on ONE element, `.cube`. Since the Value-4 transposition (kf `5a9183a7`) a `transform` is ONE structural key (formerly flattened per function name: `transform.rotateX` …), and `src/animation/constants/defaults.ts:94` `op: "replace"` + README `AnimationGroup` ("**replace**: highest zIndex wins") keep one writer per property per element. Scratch drive of the REAL group in the demo vitest project (deleted after): rotation alone → `rotateX(1.875deg) rotateY(0.0625turn) rotateZ(22.5deg)`; rotation + hover (either order) → `translateY(2.5px)`; the composite's grouped keys → `["transform"]`. The library honours its written contract; the demo authored three whole-transform writers on one node → **owner = the demo scene, not `src/animation/**`** (no library byte touched). Second limb: the cube never plays on entry — `useSceneMachineShellBinding.ts:206-208` PLAYs only an `autoPlays` scene or an explicit gesture, and CubeScene exposed no `autoPlays`.
3. **Cure (kf `d78bed01`, one commit, pushed).** `CubeTarget.vue`: the die is nested `.cube-bob` › `.cube-pose` › `.cube` inside the roll element (each `preserve-3d`; the house idiom the roll's own element already follows — CubeTarget.css `:58-62`), refs exposed. `useCubeDemo.ts`: `setTargets({ cubeEl, bobEl, poseEl, graphEl }: CubeTargets)` — spin → `.cube`, pose → `.cube-pose`, bob → `.cube-bob`; the group DECLARES `singleTarget = false` (the supported opt-out, KF-W5R4(4); SquareScene precedent — the constructor derives it before any target exists and the per-child `setTargets` never re-derives). `CubeScene.vue`: `onMounted` hands the four targets; `defineExpose` gains `autoPlays: true` (spec: "the cube … must animate on load and on play"; home stays excluded by the binding's `!isHome`). Composition order is now bob · pose · spin (was the string order spin · pose · bob) — the bob reads in world space, the spin about the posed die; recorded as INTENT.
4. **Witness** `test/demo/scenes/cube-channels-compose.test.ts` — drives the REAL `useCubeDemo` group over 0…1600 ms: `.cube` ≥3 distinct `rotateY(` lists, `.cube-bob` `translateY(` ×≥2, `.cube-pose` `matrix3d(`. Born RED: with the pre-cure targets restored in the working copy (then restored back, byte-identical) ⟨`npx vitest run --project demo test/demo/scenes/cube-channels-compose.test.ts`⟩ → `AssertionError: expected '' to match /^matrix3d\(/` (1 failed); with the declaration also reverted → `expected true to be false`. At the cure: 1 passed.

**Gate readings (BEFORE → AFTER).**

| gate | BEFORE (baseline, ×2) | AFTER dev `:5173` ×2 | AFTER gh-pages ×2 (`npm run gh-pages` → `dist/gh-pages/`, served statically on `:4187`) |
|---|---|---|---|
| G-KFW13U-w `.cube` engine write across 1 s **at rest** (`probe-w1.mjs`) | `none` → `none` | run1 `rotateX(329.621deg) rotateY(0.915613turn)…` → `rotateX(360deg) rotateY(1turn)…`; run2 `rotateX(289.458deg)…` → `rotateX(351.892deg)…` | run1 `rotateX(303.564deg)…` → `rotateX(356.044deg)…`; run2 `rotateX(277.617deg)…` → `rotateX(347.612deg)…` |
| engine-write discrimination (Pause holds) | — | Pause → two samples 600 ms apart IDENTICAL both runs (e.g. `rotateX(359.725deg) rotateY(0.999237turn)` ×2) — the motion is the engine's, not an idle CSS bob | identical ×2 both runs |
| G-KFW13U-w `.cube` **after Play** | `translateY` only (bob) | 3 samples over 1 s, each a distinct rotate list (e.g. `353.852°` → `332.581°` → `292.537°`), `.cube-bob` `0.35px` → `3.34px` | distinct rotate lists both runs |
| frame diff (`.graph` clip, 1 s at rest) | identical (baseline `none`) | `dev-cube-rest-t0.png` `b135fa22` ≠ `t1` `f278fb7d` | `gh-cube-rest-t0.png` `f8cd513e` ≠ `t1` `30fa9cbb` |
| rAF write sample (MutationObserver, 1 s, `probe-writes.mjs`) | — | at rest: `.cube` 31 · `.cube-bob` 31 writes; after Play 29 · 29 (×2) | same shape ×2 |
| every scene plays after Play (`probe-writes.mjs` subject writes + stage frame diff; `probe-amiga.mjs` canvas clip) | cube bob-only; others unmeasured by subject | cube spin+bob · square `.demo-box` + tether · easing `.tile-ball` · spring spring/sampler/preset balls + marker · sequence `.seq-ball` · amiga canvas clip hash changes over 700 ms (`0d68c39f`→`9724b432`, `34b29317`→`03687f75`), rest clip constant — ×2 | identical verdicts ×2 (amiga `63631481`→`c6ce2d9a`, `d46e9512`→`513ae702`) |
| pageerrors | 0 | 0 ×2 | 0 ×2 |
| `vue-tsc` (`tsconfig.json` · `tsconfig.test.json`) | 0 · 0 | 0 · 0 | — |
| `npm run test:demo` | 63/63 · 505/505 (banked) | **64/64 · 506/506** | — |
| kf pushed | `cfecfbce` | `d78bed01` = `origin/master` | — |

Frames: `evidence/W13U/w/{dev,gh}-cube-rest-t{0,1}.png`, `{dev,gh}{1,2}-cube-play.png`, `{dev,gh}{1,2}-amiga-canvas-play.png`; probes `probe-w1.mjs` · `probe-writes.mjs` · `probe-amiga.mjs`.

**Residuals (named, not cured here — outside `.w`'s wiring cure or its gate).**
- R-w-1: the `Matrix` channel animates `matrix3dStart` → `matrix3dEnd`, both identity until the user edits the matrix, so `.cube-pose` stays `matrix3d(1,0,…,1)` at a fresh entry — it plays (its writer runs) but has nothing to show; by construction, not a wiring break.
- R-w-2: CubeScene's `isPlaying` ref (`CubeScene.vue`, passed to CubeTarget) is never written (the binding writes only `isStarted`), so `.idle-hover.playing .cube { will-change: transform }` (CubeTarget.css `:99`) never applies and the new `.cube-bob`/`.cube-pose` carry no transient hint. A motion-quality row → routed to `.d` (compositor promotion / blur), not changed here.
- R-w-3: `autoPlays: true` supersedes the T.G3 "the die rests at idle" posture (CubeTarget.css `:67-76`, verdict #19) for `#/cube` by the 2026-09-23 spec; home (`#/`) still rests. The perf-counter proof's idle reading for `#/cube` is owed a re-read at the close seat.
- Other scenes stay `autoPlays: false` (spec names the cube only); each plays on Play (table above).

**Escalations**: none. **Commits**: kf `d78bed01`; this record (value.js, below).

### KF.W13U.t

SERVED MODEL: claude-opus-5-5 · spec `KF-W13.md:325` + COHESION §0be (§0bf read: the animation-audit register routes to this wave or KF.W13V; it consumes nothing of `.t`) · writable per the Unit plan row.

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (outside the set; untouched); kf HEAD `d78bed01` = `origin/master` (the `.w` tip). **0 inherited paths.**

**Acts, in order.**

1. **Reproduced OA-29 on the served page** (`http://localhost:5173/`, headed Chromium, `--ignore-gpu-blocklist`, dark scheme; probe `evidence/W13U/t/probe-t1.mjs`, at `d78bed01`): ⟨`node probe-t1.mjs`⟩ → `#/square` boot `{dis:true, now:"0", rangeOp:"0.5", greyAncestor:true}` · `#/amiga` boot `{dis:true, now:"0", rangeOp:"0.5", greyAncestor:true}` — greyed and inert until Play. `#/cube` boot now reads `{dis:false}` only because `.w`'s `autoPlays: true` starts it (the baseline row's `data-disabled true` ×2 was read before `.w`); a paused drag there already moved playhead + cube (2300 → 3800; `rotateX(155.273deg)` → `(317.237deg)`), frame `before-t1-cube-scrubbed.png`.
2. **Named the cause at the bytes.** kf `demo/components/playback/PlaybackRibbon.vue` (pre-cure) `:50` `:disabled="!isAnimStarted"` on the scrub Slider and `:109` `!isAnimStarted ? 'is-disabled' : ''` on the AnimationVisualizer twin (`demo/styles/style.css:321-324` `.is-disabled { opacity: 0.5; pointer-events: none }`). `isAnimStarted` is `animation.started` polled by `useAnimationSync` (`…/channel-controls/composables/useAnimationSync.ts:35,45`) — false for every scene until its first Play. The scrub seat never needed it: `useAnimationGroupPlayback.ts:133-145` `sliderUpdate` → `group.setChildTime(anim, t).render()`; `src/animation/group/group.ts:301-309` `setChildTime` sets `anim.t` (pausedTime only if a startTime exists) and `render()` → `renderMultiTarget` (`src/animation/group/entries.ts:91-100`) interpolates each child at its own `t` with no `started` read; the keyboard helper `scrubActive` (`:165-174`) already seated never-started animations; and `test/demo/scenes/cube-channels-compose.test.ts` drives a never-played cube group through exactly that seat. So the grey was a lifecycle flag mis-used as a capability gate — "a `disabled` derived from a broken wiring", owned by the ribbon.
3. **Cure (kf `3c8199c5`, one commit, pushed).** Both derivations deleted at their one owner (the ribbon): the Slider carries no `disabled`, the twin no `.is-disabled`. The header comment is made true (D-6's costume history + OA-29). `isAnimStarted` stays DECLARED with a retirement note: its three mounts (`ChannelOptions.vue:586` · `EasingScene.vue:114` · `SpringScene.vue:196`) are outside this unit's carve, and an undeclared prop would fall through as a DOM attribute on the ribbon root (vue-tsc tolerates it — measured: removing the declaration → vue-tsc 0 — so the leak would be silent). → residual R-t-1.
4. **Witness.** `test/demo/instrument/playback-ribbon-contract.test.ts` — the D-6 case (which PINNED the defect: "before the animation starts the thumb is DISABLED") is superseded in place as `(D-6 → OA-29, KF.W13U.t)`: mounted with `isAnimStarted: false`, the thumb has `tabindex="0"`, no `data-disabled`, no `.glass-slider[data-disabled]`, no `.is-disabled`, and one `ArrowRight` emits `scrubStart → sliderUpdate → scrubbed → scrubEnd`. Born RED at the pre-cure ribbon (restored byte-identical after): ⟨`npx vitest run --project demo test/demo/instrument/playback-ribbon-contract.test.ts`⟩ → `AssertionError: expected null to be '0'` (1 failed · 17 passed); at the cure 18/18.

**Gate readings (BEFORE → AFTER).** Probe `evidence/W13U/t/probe-t2.mjs` (boot 2 s with no Play; rail state; cube Paused then dragged; square + amiga dragged NEVER PLAYED; pointer drag 15 % → 45 % → 80 % of the rail, release, re-sample 700 ms later). gh-pages = `npm run gh-pages` → `dist/gh-pages/`, served statically on `:4187`.

| gate limb | BEFORE (`d78bed01`, dev) | AFTER dev `:5173` ×2 | AFTER gh-pages ×2 |
|---|---|---|---|
| rail at boot, `#/square` · `#/amiga` | `data-disabled` true · `aria-valuenow` 0 · range opacity 0.5 · dimmed ancestor | `dis:false · tabindex 0 · rangeOp 1 · .is-disabled 0 · no ancestor opacity<1` both scenes, both runs | same, both runs |
| rail at boot, `#/cube` | enabled (post-`.w` autoPlay) | enabled, same readings ×2 | same ×2 |
| drag moves playhead — square (never played) | not draggable | `0 → 820 → 1520` ×2 | `0 → 820 → 1520` ×2 |
| drag moves subject — square `.demo-box` | — | `translate(0px, 0px) rotate(0deg)` → `translate(24.3146px, 41.37px) rotate(155.685deg)` → `translate(-89.723px, -89.723px) rotate(270.277deg)` ×2 | identical ×2 |
| drag — amiga (never played; `.amiga-canvas` clip sha1) | not draggable | playhead `0 → 3280 → 6080` ×2; canvas `12fa9c0f → 56ddc6ad → aa360f6e` / `12fa9c0f → d0bb8372 → 7a303258` | playhead `0 → 2160 → 5040` ×2; canvas `35b65bbb → 503920e6 → 629c26fe` / `→ 03cdd68c → 8c9932ef` |
| drag — cube while PAUSED (`.cube` inline rotate) | moved (enabled by autoPlay) | run1 `3000 → 4400 → 4400` (see R-t-3) · run2 `3433 → 2050 → 3800`, `rotateX(294.035deg) → (125.271deg) → (317.237deg)` | `2817 → 4200 → 5000`, `rotateX(228.868deg) → (341.418deg) → (360deg)` · `2600 → 4000 → 5000`, `(200.633deg) → (330.602deg) → (360deg)` (both R-t-3; re-runs `2050 → 3800` ×2) |
| seat holds on release (no resume on a paused / never-played scene) | — | rail + subject unchanged across 700 ms after up, all scenes ×2; Play buttons still read Play | same ×2 |
| cube scrub fidelity sweep (`probe-t6.mjs`, 6 fresh pages; pointer fraction vs `aria-valuenow`/max) | — | stray (>10 %) steps **0/30**: `0.15:800 · 0.3:1400 · 0.45:2150 · 0.6:2850 · 0.8:3850` identical ×6 | **0/30** ×6 |
| held drag holds still (`probe-t4.mjs` ×3) | — | Paused `[4367,4367,4367]`; held at 30 % `[1500,1500,1500]`; at 60 % `[2650 ×3]`; after up `[2650 ×3]`, Play label kept | — |
| pageerrors | 0 | 0 ×2 | 0 ×2 |
| `vue-tsc` (`tsconfig.json` · `tsconfig.test.json`) | 0 · 0 | exit 0 · exit 0 | — |
| `npm run test:demo` | 64/64 · 506/506 (`.w`) | **64/64 · 506/506** ×2 (uncommitted bytes, then at `3c8199c5`) | — |
| kf pushed | `d78bed01` | `3c8199c5` = `origin/master` | — |

Frames: `evidence/W13U/t/{dev1,dev2,gh1,gh2}-{cube,square,amiga}-scrubbed.png`; before `before-t1-cube-scrubbed.png`. Probes `probe-t1.mjs` (BEFORE) · `probe-t2.mjs` (gate) · `probe-t3.mjs` (pointer-fraction fidelity, cube/amiga/square: 0.1→0.1/0.08/0.08 … 0.9→0.88/0.86/0.86 — the thumb-width offset) · `probe-t4.mjs` · `probe-t5.mjs` (the t2-style drag, stepwise: `700, 900 … 2050` ×4, dev + gh alternating) · `probe-t6.mjs`.

**Residuals (named, not cured here).**
- **R-t-1** — `isAnimStarted` is declared on the ribbon with no reader. Its deletion rides with its three mounts, all outside `.t`'s carve: `ChannelOptions.vue:586` (`…/channel-controls/**`, `.e`'s set) · `EasingScene.vue:114` (`demo/scenes/easing/**`, `.e`'s set) · `SpringScene.vue:196` (`demo/scenes/spring/**`, no W13U unit's set). Routed to the orchestrator: fold into `.e` (two of three sites already in its carve) or the close seat, with the SpringScene line granted.
- **R-t-2 — `KF-TIMELINE-FILL` (producer, honest-RED; BK relay owed, not written — `INBOX.md` is outside this unit's set).** The owner's frame `owner-2026-09-23-timeline-grey.png` shows the thumb at the RIGHT end — an ENABLED rail, not the disabled one (disabled sat at `aria-valuenow 0`, the left). The enabled rail itself reads grey: glass-ui 7.0.0's `spectrum` variant paints the track `var(--slider-track-bg, var(--secondary))` (measured `rgb(47, 40, 35)` dark) and HARD-CODES the range transparent (`.glass-slider[data-variant=spectrum] .slider-range { background: 0 0 }` — no custom-property hook), so a playback timeline on it shows no elapsed fill; enabled and disabled differ only by the thumb (frame `dev1-square-scrubbed.png`). Cured at the consumer only by re-authoring producer paint (a copied selector, or reviving the `--slider-*-bg` overrides OA-8 deleted) or by leaving D-2's ruled `spectrum` variant — none lawful here. The capability ask for glass BK/BL: a spectrum-variant range fill hook (e.g. `--slider-range-bg` honoured on `spectrum`), or a timeline variant with a visible thumb AND an elapsed range. The owner's "always greyed out" is therefore cured for the disabled state (the rail was inert before Play) and stays honest-RED on this paint half until that producer row lands.
- **R-t-3** — in 4 of the 11 completed `probe-t2.mjs` runs (the first dev run, and dev run 1 + BOTH gh runs of the ×2 table above), the cube's playhead ran ahead of or stalled behind the pointer mid-drag (`4400 → 5000`, `4400 → 4400`, `4200 → 5000`, `4000 → 5000` where faithful runs read `2050 → 3800`) — it still moved and the cube still followed the playhead, so the gate limb (drag moves playhead AND cube) reads green, but not faithfully; the other 7 t2 runs (incl. 2 gh + 1 dev re-runs), all 12 `probe-t6` sweeps (0/60 stray steps) and every `probe-t4/t5` run were faithful. Cube-only (square/amiga never strayed), and independent of this cure (the cube rail was already enabled by `.w`'s autoPlay; the seat path is untouched). Not reproduced under instrumented probes; handed to the close seat / the §0bf animation audit as an observed intermittent, not claimed cured.

**Escalations**: none (the producer half R-t-2 is a relay row for the orchestrator, per LOCKS "a missing slider capability → BK relay, never a local control"). **Commits**: kf `3c8199c5`; this record + `evidence/W13U/t/**` (value.js, below).

### KF.W13U.e

SERVED MODEL: claude-opus-5-5 · seat 2026-09-23 · spec KF-W13.md addendum `:326` + second addendum `:330` (OA-31, §0bg) + fifth addendum `:336` (OA-34, §0bj — joins `.e`) · §0be instrument rule · §0ao.1 OA-7 lineage.

**Crash-recovery.** ⟨`git -C ../keyframes.js status --porcelain`⟩ → only the two untracked `V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (outside the set, untouched); value.js dirty paths `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `execution/C/F-W13.md` · `chassis/ui-audit.js` · `evidence/animation-audit/` — none in `.e`'s set, none touched. **0 inherited paths.** kf substrate `3c8199c5` (the `.t` tip) = origin/master.

**Reproduction (served page, headed real GPU).** Baseline limb stands (SEAT 0, ×2): trigger text `"ease-in-outslow start & end"`, SVGs = `lucide-chevron-down` only. OA-34: frame `e/before-cube-{light,dark}-card.png` shows the owner's hard left edge + squared bottom-left corner; pixel delta 3 px vs 22 px left of the card, lower half → **0** in both themes (shadow absent at the clip column).

**Root cause, OA-28/OA-31 (at the bytes).** reka 2.9.9 `SelectValue` prints `getOption(modelValue).textContent`, registered by `SelectItemText` (`node_modules/reka-ui/dist/Select/SelectValue.js:37-38`, `SelectItemText.js:33`); glass 7.0.0 `SelectItem` wraps its whole default slot in `SelectItemText` and renders a separate `description` slot beside it (`select-BcBAyLXA.js:286`). `ChannelOptions.vue` put name AND description in the default slot, so the label read the run-on string; `:text-value` feeds typeahead only (`SelectItem.js:50,100`). glass `SelectValue` forwards reka's scoped default slot `{ selectedLabel, modelValue }` (`select-BcBAyLXA.js:68-72`) — the producer seat for the trigger face. **No producer gap** (no SS-6 row owed for the trigger/description slots).

**Acts.**
1. **kf `cd2cd88f`** — OA-28/OA-31. `ChannelOptions.vue`: the trigger fills glass `SelectValue`'s scoped slot (`v-slot="{ modelValue }"`) with `svg.curve-glyph` (path from the same `curveGlyphs` map every row reads — `curveGlyphPath` = `generateCurveSVGPath(resolveTimingFunction(key).easing, 64)`, the easing the key installs) + the NAME in a mono span; the description never renders in the trigger; a key matching no row keeps the placeholder (`CURVE_PLACEHOLDER`, one constant for the prop and the slot's no-match arm). Each row's description moves to glass `SelectItem`'s own `#description` slot (outside `SelectItemText` → the registered label is the name alone; own secondary line), `aria-hidden="true"` and referenced by the item's `aria-describedby` (per-instance `useId()` base). `curveGlyphs` typed `Map<string, string>` so the slot's scalar `modelValue` looks up by its string form (no cast). Witness `test/demo/instrument/channel-options-render-edge.test.ts` case **(6)**: trigger text = the stored key alone, glyph true to the engine's LIVE `a.options.timingFunction.fn`; a pick through the model edge (`ease-out-back`) re-draws it true to the new engine easing AND to `@mkbabb/value.js/easing`'s `easing("ease-out-back")`; all 29 rows true to their easing sampled from value.js directly (draft rows from the store's live params), 29 distinct, item text = name, description = `aria-describedby` target, `aria-hidden`. The Select stubs in that file and in `playback-ribbon-contract.test.ts` now honour the producer's slot scope (`SelectValue` default slot `{ selectedLabel, modelValue }`, `SelectItem` default + `description`). **Born RED** at the pre-cure bytes (⟨`git show HEAD:…/ChannelOptions.vue > …; vitest -t OA-28`⟩ → `expected '' to be 'ease-in-out'`; cured bytes restored from scratch copy, 1 passed).
2. **kf `57b4815c`** — OA-34. Clipping ancestor found by probe `e/probe-e-clip.mjs`: `ChannelControls.vue:23`/`:45` `div.flex-1.min-h-0.overflow-y-auto.flex.flex-col.pb-1` (card box left 71 = scroller left 71; cut l 7 px, b 3 px). The pane inset `pl-4 pr-7 pt-2 pb-2` sat on the non-clipping wrapper OUTSIDE the scroller. Cure at the owner: the inset moves INTO the scroller (`pl-4 pr-7 pt-2 pb-3` = `pb-2`+`pb-1`), both mounts; content box unchanged (card `71,62,407,392` before = after); shadow paints in the scroller's padding; no shadow deleted, no per-card rule.
3. Push: ⟨`git push origin HEAD:master`⟩ → origin/master `57b4815c`.

**Gate readings (BEFORE → AFTER).** Probes `evidence/W13U/e/probe-e1.mjs` (trigger + rows + pick; truth sampled in Node from `@mkbabb/value.js/easing` — `dist/subpaths/easing.js` — not from the demo's path helper; accname via `getByRole('option',{name,exact:true})`, AX description via CDP `Accessibility.getPartialAXTree`), `probe-e-shadow.mjs` (each visible `.card.cartoon-surface` cropped 24 px beyond its box, light+dark), `probe-e-clip.mjs` (every outer-shadowed element vs its nearest clipping ancestor, 7 routes). gh-pages = `npm run gh-pages` → `dist/gh-pages/` served statically on `:4187` (rebuilt after each cure). Pageerrors 0 every run.

| gate limb | BEFORE | AFTER dev `:5173` ×2 | AFTER gh-pages ×2 |
|---|---|---|---|
| G-KFW13U-e trigger text | `ease-in-outslow start & end` | `ease-in-out` (= name exactly; no description substring) | same |
| trigger SVG | chevron only | `curve-glyph` + chevron; max \|err\| vs `easing("ease-in-out")` **5e-4** (the 3-dp print), 65 points | same |
| trigger after pick `ease-out-back` | — | text `ease-out-back`, max \|err\| **5e-4** | same |
| rows with a path / distinct | 29 / (not measured) | **29 / 29** | **29 / 29** |
| named rows true to their easing | not measured | **27/27** (worst 5e-4); draft rows `steps`/`cubic-bezier` witnessed in case (6) vs store params | same |
| name/description separated | textContent concatenated (`linearconstant velocity`) | **29/29** description own element below the name, aria-hidden, in row; accname = name exactly **29/29**; AX name+description **29/29** | same |
| OA-34 left-shadow delta (3 px vs 22 px out), `#/cube` controls card | **0** light / **0** dark (all rows) | card0 373 / 96, card1 367.4 / 89.2, 0 zero rows | card0 373 / 95, card1 367.4 / 88.2, 0 zero rows |
| OA-34 sweep (home·cube·easing·spring·amiga·square·sequence), card lateral cuts | 7 px on every scene's controls card | **0** light ×2 · dark ×2 | **0** light ×2 · dark ×2 |
| vue-tsc (`tsconfig.json` · `tsconfig.test.json`) | 0 · 0 | **0 · 0** ×2 | — |
| `npm run test:demo` | 64/64 · 506/506 | **64/64 · 507/507** ×2 | — |
| eslint (4 touched files) | — | exit 0 | — |
| kf pushed | `3c8199c5` | origin/master **`57b4815c`** | — |

Frames: `e/{dev1,dev2,gh1,gh2}-{trigger,trigger-picked,dropdown}.png` · `e/before-cube-{light,dark}-card.png` · `e/{dev1,dev2,gh1,gh2}-cube-{light,dark}-card{0,1}.png`.

**Residuals.**
- **R-e-1 — `GLASS-SURFACE-PAINT-CONTAIN` (producer, honest-RED; BK relay owed — `INBOX.md` is outside `.e`'s set).** The sweep's 11 remaining rows (×2, both themes, both servers) are capsule buttons INSIDE a card (Pause/Reverse, the spring presets, Play/Re-seat) whose outer halo is cut ~10 px at the card's own edge: glass 7.0.0 `material.css` declares `.glass-wash, .glass-quiet, .glass-resting, .glass-card { contain: paint; }`, which clips descendants' ink overflow at the surface's padding box. Not the OA-34 clip (a card's OWN shadow is ink overflow of the card and is not cut by its own paint containment — measured continuous above); the descendant half is producer paint and is not re-authored here (no consumer `contain` override). Ask for glass BK/BL: surface containment that does not cut a child control's halo (e.g. `contain: layout style` plus an `overflow-clip-margin` covering the control shadow extent, or the halo inside the control's own box).
- **R-e-2 (not a defect)** — the sweep's 4 bottom-only rows are cards whose BOX extends past the scroller's viewport (scroll overflow: cube/amiga/square resting card at y 454, easing card at y 62 h 454); their shadow paints inside `pb-3` when scrolled into view.
- **R-e-3** — probes ran at 1440×900 only (the owner's frames are desktop); the scroller change is viewport-independent (same classes on both mounts).
- **R-t-1 not folded** — `isAnimStarted`'s mounts (`ChannelOptions.vue:586` → now shifted, `EasingScene.vue:114`, `SpringScene.vue:196`) were routed to the orchestrator by `.t`; `.e`'s brief did not assign them, so they are left for the close seat or an explicit grant.

**Self-count.** Commits kf 2 (`cd2cd88f`, `57b4815c`) + this record 1. Files touched in kf: 4 (`ChannelOptions.vue`, `ChannelControls.vue`, `channel-options-render-edge.test.ts`, `playback-ribbon-contract.test.ts`). Evidence files: 3 probes + 30 frames under `evidence/W13U/e/`. Escalations: 0.

### KF.W13U.d

SERVED MODEL: claude-opus-5-5 (effort high). Spec: KF-W13.md ADDENDUM 2026-09-23 `.d` `:327` + third/fourth addenda (`:332` OA-32 · `:334` OA-33, both joined to `.d` by COHESION §0bh/§0bi) · §0bc O-55 · §0bd O-56 · §0be BL ack. Writable per this record's Unit plan row.

**Acts, in order.**
1. **Crash-recovery** — ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (outside `.d`); value.js dirty paths all outside `.d` (sibling tracks + `dev.sh`). **0 inherited paths.** kf HEAD `57b4815c` = origin.
2. **BEFORE, served page** (`http://localhost:5173/`, headed Chromium, `--ignore-gpu-blocklist`, 1440×900, `#/cube`): probe `evidence/W13U/d/probe-d1.mjs` + in-page rAF sampler `d/sampler.js` — one context and one WebM per transition (1 expand on hover · 2 idle collapse · 3 scene switch Cube→Amiga · 4 controls-panel toggle ×2 · 5 @mbabb menu open/Escape · 6 hover-graze of the collapsed pill); per frame: the top dock's rect, `filter`, root `scale`/`transform`, the text's ancestor chain, every running animation on the dock subtree keyed by element+pseudo+property, the implicit owner pair (a CSSTransition on `opacity`/`scale` of a `.dock-layer.is-active > *` child — or `filter`/`scale`/`transform` on the root — while `data-morphing` drives the same property from the spring), layout-shift entries. WebMs `d/webm-before1/{1-expand,2-collapse,3-scene-switch,4-panel-toggle,5-menu,6-hover-collapsed}.webm`; report `d/report-before1.json`; run ×2 (the first with the pseudo-element-blind key, the second as banked — blur/morph/width counts equal across both).
3. **Diagnosis at the bytes** (glass 7.0.0 dist `components/dock/styles/{morph,layers}.css`, `controls/triggers.css`): blur = `.glass-dock[data-morphing] { filter: blur(… 1.25px …) }`; text scale = the stagger's `scale: calc(0.82 + 0.18 * var(--child-reveal))` + root `will-change: transform`/`--dock-size-scale`; the double owner = the producer controls' own `transition: … opacity, scale` chasing the spring. Every morph-frame owner pair sits on a producer control → **producer** (`DOCK-MORPH-ROOT`). Consumer causes found: (a) the trailing app zone duplicating the @mbabb menu (3 extra stagger children, 4 extra owner pairs, +134 px) → OA-33, cured; (b) the scene-switch zone flicker (below) → root outside `.d`'s carve, ESCALATED. `demo/styles/**` carries no dock transition/filter (⟨`grep -n "transition\|will-change\|backdrop-filter" demo/styles/*.css`⟩ → playback-idiom rows only); `demo/app/transition/**` never touches the dock.
4. **OA-33 cure** — kf **`62ecc324`** (`ChromeDock.vue` · `MbabbMenu.vue` · `test/demo/app/chrome-dock-containment.test.ts`): ChromeDock's app zone (DockSeparator + SharePopover + shortcuts DockControl + DarkModeToggle) deleted with its imports; the shortcuts dialog + open state + `?` shortcut moved to MbabbMenu with a new `Keyboard shortcuts` row (glass `DropdownMenuShortcut` prints `?`; `onMenuCloseAutoFocus` declines the focus return under the dialog, the Clear-all idiom). Witness case (3) superseded in place — born RED at the pre-cure bytes (⟨swap HEAD bytes, `vitest run … chrome-dock-containment`⟩ → `expected [ 'Scene', 'Controls tab', …(6) ] to not include 'Share animation'`), GREEN after.
5. **Gates ×2** — ⟨`npx vue-tsc --noEmit -p tsconfig.json \| grep -c "error TS"`⟩ → `0` ×2 · ⟨`-p tsconfig.test.json`⟩ → `0` · ⟨`npm run test:demo`⟩ → `64 passed (64)` · `507 passed (507)` ×2 · ⟨`npx eslint` the 3 touched files⟩ → exit 0. ⟨`git push origin master`⟩ → origin/master **`62ecc324`**.
6. **AFTER** — the same probe on dev ×2 and on gh-pages ×2 (`npm run gh-pages` → `dist/gh-pages/` served statically on `:4187`, rebuilt after the cure); `d/probe-sharp.mjs` (dpr 2: the expanded layer's crop after a real expand morph vs the same crop reached with NO morph — a `reducedMotion: reduce` context seats the endpoint) ×2 each; `d/probe-oa33.mjs` ×2 each; `d/probe-kbd.mjs` once. WebMs `d/webm-after-dev1/*.webm` · `d/webm-after-gh1/*.webm` (the ×2 reports kept, the second runs' WebMs not banked: size).

**Gate readings (BEFORE → AFTER).** Counts read from `d/report-*.json` (⟨`node -e` over each report⟩).

| limb | BEFORE (dev, ×2) | AFTER dev `:5173` ×2 | AFTER gh-pages `:4187` ×2 |
|---|---|---|---|
| WebM per transition (6) | `webm-before1/` 6/6 | `webm-after-dev1/` 6/6 | `webm-after-gh1/` 6/6 |
| blur frames (root `filter` ≠ none) expand · collapse · hover-graze | 31 · 31 · 61–62 (peak `blur(1.25px)`) | 31 · 31 · 62 | 31 · 31 · 62 |
| two owners per property — explicit (same element·pseudo·property, ≥2 running animations) | 0 (after the pseudo-element key) | **0** ×2 | **0** ×2 |
| two owners per property — spring + CSSTransition, max pairs per frame (expand) | **12** | **8** ×2 | **8** ×2 |
| same, frames with any pair (expand · collapse · hover-graze) | 26 · 16 · 41 | 26–27 · 16 · 41 | 26–27 · 16 · 41–42 |
| owners of the remaining pairs | — | `.dock-select-trigger` ×2, `.dock-icon-button`, `.dock-dropdown-trigger` (opacity+scale each) — producer controls, producer transitions | same |
| expanded width / layer children | 536.49 px / 11 (incl. reka's `<span hidden>`) | **402.49 px / 8** | 402.49 / 8 |
| scene-switch dock width min–max (children) | 352.6–544.4 (11→8→11) | 218.6–410.4 (8→5→8) | same — **ESC-d-1** |
| text at rest after a morph vs no-morph crop (dpr 2, 61 280 px) | — (limb introduced by `.d`) | **0 px differ**, max Δ 0, gradient 5.992 = 5.992, ×2 | **0 px**, max Δ 0, 5.986 = 5.986, ×2 |
| OA-33 trailing zone | Share · Keyboard · theme + @mbabb | **@mbabb menu alone**; −134 px; shortcuts dialog 1 (keyboard) · theme flips · Share popover 1 · Escape → focus `@mbabb menu` ×2 | same ×2 |
| pageerrors | 0 | 0 | 0 |

**G-KFW13U-d reading.** WebMs before/after: GREEN. Text pixel-sharp at rest after a morph: GREEN (×4). "0 elements with two animation owners per property": **honest-RED `DOCK-MORPH-ROOT` (O-56)** — explicit 0, spring+transition pairs 12 → 8, every remaining pair a producer control's own transition during the producer's own morph; no consumer override or copy of producer dock CSS (SS-6). Blur in flight: producer (`morph.css` filter) — same id. `DOCK-SCROLL-MORPH` (O-55) unchanged, honest-RED. vue-tsc 0 · test:demo green · kf pushed: GREEN.

**Escalations (returned; nothing written outside `.d`'s set).**
- **ESC-d-1 — the scene-switch dock flicker is rooted outside `.d`'s carve.** Frames `d/before-scene-switch-frames-126-131.png` (25 fps crop of `webm-before1/3-scene-switch.webm`): Controls tab + panel toggle vanish for ~3 frames and the capsule shrinks 544 → 353 px then snaps back (after OA-33: 410 → 219 → 410); the stage cell shifts with it (layout-shift source `div.stage-cell`). Root at `demo/app/App.vue:266-276`: `derivedSurfaces` = `surfacesFor(sceneRef.value?.facility, …)`, and the keyed `<Suspense :key="activeSceneKey">` (`:92`) unmounts the leaving scene before the destination resolves, so `sceneRef` is null mid-swap and `surfacesFor(undefined)` (`demo/state/controlSurfaces.ts:99`) returns `[]` — "pending" read as "no surfaces" — which the machine feeds to BOTH the dock and the controls pane. Proposed cure (needs a grant of those App.vue script lines, not the dock binding): while a non-home scene is pending (`sceneRef` null), do not feed `machine.setActiveSurfaces`, so the dock and pane change once per swap, at resolve. A dock-local hold would mask it and leave the pane flicker.
- **ESC-d-2 — OA-32 (living dock icons) is not installable inside `.d`'s set.** The icon binding is the scene descriptor's `icon` (`demo/app/scene/scenes.ts`), and the motion must derive from each scene's own animation data (`demo/scenes/**`); both are outside `.d`. A dock-local icon registry keyed by scene id would re-open the H.W5 D8 drift (a second binding beside the descriptor, `ChromeDock.vue:77-83`). Needs a grant of `demo/app/scene/scenes.ts` + a per-scene mini-rendition seam in `demo/scenes/*/`.
- **ESC-d-3 — keyboard reach of Share and Dark mode inside the @mbabb menu.** ⟨`probe-kbd.mjs`⟩ → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}`: both rows are layout-only (`@select.prevent`; the commands are nested buttons reka's roving focus never reaches). Pre-existing in MbabbMenu, but OA-33 makes the menu their only home (the `?` shortcut keeps the shortcuts dialog keyboard-reachable). Cures sit outside `.d`: Share needs `SharePopover` (`demo/components/instrument/shell/`) to expose its open model so the row's select opens it; Dark mode needs a menu-item form of glass `DarkModeToggle` (producer, O-56 family) — a row-level `useGlobalDark` toggle would be the second actuation EH-4 ruled out.

**Residuals.** R-d-1: the producer's in-flight blur/scale/double-owner and the content-size snap are banked for BL as an INBOX addendum beside O-56 (appended this seat; new facts, no new letter). R-d-2: probes ran at 1440×900 only (the owner's frames are desktop).

**Self-count.** kf commits 1 (`62ecc324`; 3 files). value.js: this record + `INBOX.md` addendum + `evidence/W13U/d/**` (6 probes + sampler, 5 reports, 5 logs, 3 WebM sets × 6 = 18 WebMs, 23 PNGs) + LEDGER cell, in one pathspec commit. Escalations 3 (ESC-d-1 · ESC-d-2 · ESC-d-3).

*Self-count erratum (same seat, WRITE-THEN-MEASURE on the settled commit `1389e4c4`):* the record commit carries 32 paths — this record, the LEDGER line, 6 probes + sampler, 5 reports, 18 WebMs. The 23 PNGs and 5 run logs stay local under `evidence/W13U/d/` (repo `.gitignore:34` `*.png`, as for `.e`'s frames). The INBOX addendum landed in the orchestrator's concurrent commit `3d004e7c` (the shared index swept the appended line); its text is this seat's, byte-for-byte.

## Close — WAVE CLOSE SEAT (VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · spec KF-W13.md ADDENDUM 2026-09-23 (KF.W13U) + its four follow-on addenda (OA-31 · OA-32 · OA-33 · OA-34) · close clause "`npm run check` exit 0, vitest GREEN, the kf e2e suite GREEN, AND the four served-page gates re-read by the check seat itself". 0 kf / glass / product bytes written.

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (outside every set, untouched). value.js dirty paths are sibling tracks' (`demo/palettes/**`, `e2e/smoke/oracles/**`, `W7-*.md`, `CARRY-LEDGER.md`, `chassis/ui-audit.js`) + `scripts/dev/dev.sh`; none is this record or the LEDGER. **0 inherited paths.** kf HEAD `62ecc324` = origin/master (⟨`git rev-parse --short HEAD origin/master`⟩ → `62ecc324` ×2).

**Instrument.** Every served-page reading below comes from this seat re-running the units' own banked probes (unchanged bytes, from `evidence/W13U/{w,t,e,d}/`), headed Chromium `--ignore-gpu-blocklist`, 1440×900, run twice on the dev page `http://localhost:5173/` and twice on a gh-pages build made at this seat (⟨`npm run gh-pages`⟩ → `✓ built`, EXIT 0, at `62ecc324`; the snapshot served statically on `:4187`, and the server stopped afterwards). Outputs are in the seat's scratch dir. They are not banked, because this seat's evidence is the readings pasted here.

### Commit roster (act 1) — ⟨`git show --stat`⟩ per sha against each unit's writable row

| unit | sha | paths (⟨`git show --stat`⟩) | in set? |
|---|---|---|---|
| `.w` | kf `d78bed01` | `demo/scenes/cube/{CubeScene.vue,CubeTarget.vue,useCubeDemo.ts}` · `test/demo/scenes/cube-channels-compose.test.ts` (4) | YES (`demo/scenes/**` · `test/**`) |
| `.t` | kf `3c8199c5` | `demo/components/playback/PlaybackRibbon.vue` · `test/demo/instrument/playback-ribbon-contract.test.ts` (2) | YES |
| `.e` | kf `cd2cd88f` | `…/channel-controls/ChannelOptions.vue` · `test/demo/instrument/{channel-options-render-edge,playback-ribbon-contract}.test.ts` (3) | YES (`channel-controls/**` · `test/demo/**`) |
| `.e` | kf `57b4815c` | `…/channel-controls/ChannelControls.vue` (1) | YES |
| `.d` | kf `62ecc324` | `demo/app/dock/{ChromeDock.vue,MbabbMenu.vue}` · `test/demo/app/chrome-dock-containment.test.ts` (3) | YES (`demo/app/dock/**` · `test/demo/app/**`) |
| records | value.js `2a987e09` · `5544957c` · `0e5cb3b5` · `7ebc840d` · `b9c5832e` · `5e02e155` · `1389e4c4` · `c25f8968` | this record, the LEDGER, `evidence/W13U/**` | YES |

Every kf sha is on `origin/master` (⟨`git log --oneline origin/master -5`⟩ → `62ecc324 · 57b4815c · cd2cd88f · 3c8199c5 · d78bed01`). **Landed-wrong: 0.** One value.js note, not a bounds breach: `.d`'s INBOX addendum (in `.d`'s set) was swept into the orchestrator's concurrent commit `3d004e7c` by the shared index (`.d`'s own erratum `c25f8968` records it). The text is `.d`'s, byte for byte.

### Gate table (act 2) — BEFORE (SEAT 0 baseline) → AFTER (this seat, dev ×2 · gh-pages ×2)

| gate | BEFORE | AFTER dev `:5173` ×2 | AFTER gh-pages `:4187` ×2 | reading |
|---|---|---|---|---|
| **G-KFW13U-w** (⟨`node w/probe-w1.mjs <base> <tag>`⟩): the `.cube` inline rotate across 1 s at rest | `none` → `none` | `rotateX(308.4deg)…` → `(358.5deg)…` · `(292.6)` → `(355.1)` | `(273.1)` → `(348.5)` · `(276.4)` → `(352.4)` | **GREEN** |
| same: Pause freezes, Play resumes | Play = translateY only | paused `359.626` = `359.626` · `358.264` = `358.264`; Play `359.1 → 345.9 → 317.3` · `359.9 → 351.3 → 327.4`; `.cube-bob` bobs | paused equal ×2; Play `358.0 → 358.7 → 345.1` · `360.0 → 352.4 → 328.6` | **GREEN** |
| same: every scene plays (⟨`node w/probe-writes.mjs`⟩, gh ×1) | not measured | — | cube writes `.cube` + `.cube-bob` 61/s at rest; amiga · square · easing · spring · sequence: frames move after Play | **GREEN** |
| pageerrors (w) | 0 | 0 · 0 (1 `console` 404 resource per dev run, not a pageerror) | 0 · 0 | — |
| **G-KFW13U-t** (⟨`node t/probe-t1.mjs`⟩): rail at boot on cube · square · amiga (data-disabled / thumb / range opacity / dimmed ancestor) | square + amiga `data-disabled` true | `false/false/1/false` on all three ×2 | same ×2 | **GREEN** |
| same: the cube, Paused, dragged 20 % → 50 % → 80 % | not reachable | aria-valuenow `2300 → 3800`, holds `3800` after release; cube `rotateX(155.273deg)` → `(317.237deg)`, held ×2 | same values ×2 | **GREEN** |
| **G-KFW13U-e** (⟨`node e/probe-e1.mjs`⟩): trigger text · trigger SVGs · glyph vs `easing("ease-in-out")` | `ease-in-outslow start & end` · chevron only | `ease-in-out` · `curve-glyph` + chevron · max \|err\| 5e-4 (64 pts) ×2 | same ×2 | **GREEN** |
| same: rows (n / with path / distinct / named true / name-desc separated / accname exact / AX name+desc); pick `ease-out-back` | 29 / 29 / — / — / 0 | 29 / 29 / 29 / 27 of 27 (worst 5e-4) / 29 / 29 / 29; after the pick the trigger reads `ease-out-back`, 5e-4 ×2 | same ×2 | **GREEN** |
| **G-KFW13U-d** text at rest after a morph (⟨`node d/probe-sharp.mjs`⟩, dpr 2, 61 280 px) | limb new at `.d` | 0 px differ, max Δ 0, gradient 5.992 = 5.992 ×2 | 0 px, 5.986 = 5.986 ×2 | **GREEN** |
| same: OA-33 (⟨`node d/probe-oa33.mjs`⟩) | Share · Keyboard · theme + @mbabb, 536.49 px | children `Scene · Controls tab · Controls panel · @mbabb menu`, 402.49 px; shortcuts dialog 1, theme flips, Share popover 1, Escape returns focus to `@mbabb menu` ×2 | same ×2 | **GREEN** |
| same: two owners per property (⟨`node d/probe-d1.mjs`⟩, dev ×2): explicit · spring+transition max per frame (expand) | 0 · 12 | **0 · 8** ×2 (hover-graze 8 · 8; collapse 2 · 2) | `.d`'s ×2 banked (0 · 8) | **honest-RED `DOCK-MORPH-ROOT` (O-56)**: all 8 remaining pairs are producer controls' own transitions |
| same: blur frames in flight (expand · collapse · hover-graze) | 31 · 31 · 61–62 | 15 · 17 · 62 / 21 · 31 · 62 (frame totals vary with load) | `.d`'s banked | **honest-RED `DOCK-MORPH-ROOT`** (producer `morph.css` filter) |
| same: scene-switch dock width | 352.6 – 544.4 (11 → 8 → 11) | run 1 `402.5 – 410.4` (8); run 2 `218.6 – 410.4` (8 → 5 → 8) | — | **ESC-d-1 still reproduces (1 of 2)** |
| **close: `npm run check`** (vue-tsc ×2 configs + `proof:structure`) | banked exit 0 (W13T) | **exit 0** ×2; ⟨`grep -c 'error TS'`⟩ 0 · 0; `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` | — | **GREEN** |
| **close: vitest, demo** (⟨`npm run test:demo`⟩) | 63/63 · 505/505 (W13T) | **64 passed (64) · 507 passed (507)** ×2 | — | **GREEN** |
| **close: vitest, library** (⟨`npm run test:lib`⟩) | — | **113 passed \| 5 skipped (118) · 1259 passed \| 2 expected fail \| 14 skipped (1275)**, exit 0 ×2 | — | **GREEN** |
| close: eslint on the touched trees (⟨`npx eslint demo/app demo/components/instrument/transport demo/components/playback demo/scenes/cube`⟩) | — | exit 0 | — | GREEN |
| **close: kf e2e suite** (⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness`⟩; the retained browser roster over the built dist) | **2/6 at pre-wave `cfecfbce`** (measured at this seat in a throwaway detached worktree, removed after) | — | **2/6** ×2: ✗ usability · subject-animates · live-session · live-session-mobile | **RED** (see below) |

**The e2e RED, attributed limb by limb (baseline `cfecfbce` → HEAD `62ecc324`).** The same four observations fail at both ends. None of them is a new failing observation, but two limbs inside them changed:
1. `usability`: `EditorStartScreen.vue declares no title: default` at both ends. The file is untouched by W13U, so this is **pre-existing** and not the wave's.
2. `subject-animates [real-cube]`: baseline `playhead stayed 1 → 1` (the OA-27 defect `.w` cured). HEAD `175.3 → 183.3` and `31.4 → 108`, with `engineWrote=true`. The engine now writes, but the oracle (`scripts/observe/demo/subject-animates.mjs:310`, `advanced = wrote && sliderAfter > 0 && sliderBefore === 0`) assumes the cube rests at boot. `.w`'s `autoPlays: true` on `#/cube` (R-w-3, the spec's "must animate on load") breaks that assumption. **The limb changed from a product defect to an out-of-date oracle.**
3. `live-session S4`: at baseline it failed only on `ringPainted:false` (`enterToggled:true`, `spaceToggled:true`). At HEAD `enterToggled:false`, `spaceToggled:false`. The oracle (`live-session.mjs:1338-1375`) presses Enter and expects `Pause animation`. The cube is already playing, so Enter pauses it. **This is a new red limb with the same root as (2).** `ringPainted:false` is pre-existing.
4. `live-session S5` (spring INTERACT, `only 1 distinct spring-ball position after the rail scrub`) and `live-session-mobile M1` (sheet touch-scroll moves nothing, 765 px in 704 px) fail the same way at both ends, so they are **pre-existing**.

### E13 (act 4)

Four paths re-swept read-only against the OPEN clock 2026-09-23 06:32:48 (⟨`find … -type f -newermt '2026-09-23 06:32:48'`⟩):
- value.js `V/` + `V/coordination/` → `INBOX.md` only.
- glass: newest tranche `BL` (⟨`ls -t`⟩ → `BL BK BJ`), which has no `coordination/`. BK's new files are five `valuejs-outbound-2026-09-23-*` mirrors of our own letters. BL's `audit/INBOUND.md` is glass banking O-53..O-58 + O-60, already folded as **I-41** in INBOX.
- keyframes `V/coordination/` → none.
- atlas: no `coordination/` directory.

**0 UNREAD in scope.**

### Residuals (owners named)

- **RES-close-1 `KF-E2E-AUTOPLAY-PREMISE`**: two e2e oracles still assume the cube rests at boot, the T.G3 rule that `.w`'s spec-mandated autoplay overturned. They are `subject-animates.mjs:310` (`sliderBefore === 0`) and `live-session.mjs` S4 (Enter/Space expected to *start* playback). The oracles need to be re-seated on the new premise: pause first, or read a toggle rather than a start. `scripts/observe/**` was in no W13U unit's set. **Owner: KF.W13V `.k`**, whose transport matrix is {Play, Pause, Reset, Reverse, scrub} × 6 scenes. Otherwise the next harness seat.
- **RES-close-2**: the pre-existing e2e reds. `usability` (EditorStartScreen `title:` default), S4 `ringPainted:false`, S5 spring INTERACT and mobile M1 sheet touch-scroll, all red at `cfecfbce` before this wave. **Owner: KF.W13V `.k` / `.u`** (animation and UI registers). Until then the kf e2e close clause cannot read GREEN.
- **`DOCK-MORPH-ROOT` (O-56) · `DOCK-SCROLL-MORPH` (O-55)**: the producer halves of G-KFW13U-d (8 spring+transition pairs on producer controls, and the in-flight `blur(1.25px)`). Honest-RED; **owner glass BL**. The facts were appended beside O-56 at `.d`.
- **ESC-d-1** (the scene-switch dock/pane flicker, rooted at `App.vue:266-276` `derivedSurfaces` null mid-swap; reproduced 1 of 2 here) · **ESC-d-2** (**OA-32, the living dock icons, is NOT IMPLEMENTED**; it needs a grant of `demo/app/scene/scenes.ts` + a per-scene mini-rendition seam) · **ESC-d-3** (Share / Dark-mode rows inside the @mbabb menu are keyboard-inert): **owner: the orchestrator / COHESION**, for a grant or a successor unit.
- **R-t-1**: the ribbon's unread `isAnimStarted` prop and its three mounts. Nobody spent this (`.e` declined it; the mounts are outside every W13U set). **Owner: KF.W13V `.s`** (scene idiom; touches EasingScene/SpringScene) or an explicit grant.
- **R-t-2 `KF-TIMELINE-FILL`**: the glass spectrum Slider has no range-fill hook, so enabled and disabled rails look alike apart from the thumb. Honest-RED, **owner glass BK/BL**. The BK relay is still owed; INBOX is outside this VERIFY-ONLY seat's acts, so this seat hands it to the orchestrator's next relay.
- **R-e-1 `GLASS-SURFACE-PAINT-CONTAIN`**: `contain: paint` on glass surfaces cuts child controls' halos. Honest-RED, **owner glass BK/BL**, relay owed as above.
- **R-t-3** (intermittent cube scrub drift 4 of 11 at `.t`): 0 of 4 here (all drags read 2300 → 3800 faithfully). **Owner: KF.W13V `.k`**.
- **R-w-1** (the matrix channel runs identity → identity) · **R-w-2** (CubeScene `isPlaying` never written, so the will-change hint never applies): **owner KF.W13V `.k`**.
- **R-w-3**: the `#/cube` perf-counter idle reading was not re-read at this seat. The autoplay's effect is measured instead as RES-close-1. **Owner KF.W13V `.k`**.

### Escalations

0 new at this seat. `.d`'s ESC-d-1..3 stand as returned.

### Four-verb line

KF.W13U: AUDITED YES · SPECIFIED YES · **IMPLEMENTED PARTIAL**. `.w` · `.t` · `.e` are GREEN on the served page ×4 with check and vitest GREEN. What remains:
- the kf e2e close clause is RED (RES-close-1 is a new oracle-premise limb; RES-close-2 is pre-existing);
- `.d`'s two-owner limb is honest-RED on the producer;
- OA-32 is escalated and not implemented.

VERIFIED: NO. The addendum names no seat of this wave to stamp it.

**Self-count.** kf shas audited 5; value.js record/LEDGER shas audited 8. Gates re-run: 4 served-page gates × 4 readings (2 dev + 2 gh), 1 two-owner probe × 2 dev, check × 2, test:demo × 2, test:lib × 2, eslint × 1, e2e roster × 2 at HEAD + × 1 at baseline. Landed-wrong 0. New escalations 0. Residuals 10 bullets.

## Check 1 — FRESH ADVERSARIAL CHECK (L-20, pass 1)

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · VERIFY-ONLY (0 kf / glass / product bytes). Spec read whole (`KF-W13.md`, incl. the KF.W13U addendum and its four follow-ons OA-31..OA-34); record read header→Unit plan, the `.d` escalation lines, and the Close. Crash-recovery: kf `git status --porcelain` → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}` letters only; value.js dirty paths are sibling tracks' + `scripts/dev/dev.sh` (untouched). **0 inherited paths.** kf HEAD `62ecc324` = the close's HEAD.

**Verdict: NOT-CONFORMANT.** Every GREEN the close claims reproduces; three spec requirements remain RED without relief in the spec's bytes.

### Axis readings

| axis | reading |
|---|---|
| (1) claimed GREENs reproduce | **YES, 9 of 9**: G-KFW13U-w ⟨`node w/probe-w1.mjs :5173`⟩ ×2 → at rest `rotateX(290.9)→(354.3)` · `(299.9)→(350.2)`; `autoPlaying:true`; paused equal ×2; Play advances ×2 · G-KFW13U-t ⟨`node t/probe-t1.mjs`⟩ ×2 → boot `dis:false` on cube · square · amiga, drag `now 2300 → 3800`, cube `rotateX(155.273deg)` ×2 · G-KFW13U-e ⟨`node e/probe-e1.mjs`⟩ ×2 → trigger text `ease-in-out`, `curve-glyph`, err 5e-4; rows 29/29/29, desc-separated 29, after-pick `ease-out-back` · `.d` sharp ⟨`probe-sharp.mjs`⟩ ×2 → `diffPx 0`, 5.992 = 5.992 · `.d` OA-33 ⟨`probe-oa33.mjs`⟩ ×2 → 402.49 px, children `Scene · Controls tab · Controls panel · @mbabb menu`, dialog 1, theme flips, share 1, Escape → `@mbabb menu` · `npm run check` ×2 → EXIT 0, `error TS` 0 · `npm run test:demo` ×2 → 64/64 · 507/507 · eslint (the close's four trees) → EXIT 0. (test:lib not re-run; cited.) |
| (2) bounds | 5 kf shas, ⟨`git show --stat`⟩ each: `d78bed01` cube ×3 + 1 test · `3c8199c5` ribbon + test · `cd2cd88f` ChannelOptions + 2 tests · `57b4815c` ChannelControls · `62ecc324` ChromeDock + MbabbMenu + 1 test — all inside the Unit-plan rows. `scripts/dev/dev.sh` never in a W13U commit. **Clean.** |
| (3) masking | ⟨`git diff cfecfbce..62ecc324 -- demo | grep '^+' | grep -E 'try|catch|\.skip|@ts-|as any|!important|node_modules'`⟩ → 0 hits. The three inverted test assertions (D-6 → OA-29 rail live; R-k-1 → OA-33 trailing zone) track spec mandates; none narrows. **Clean.** |
| (4) families | one sha per meaning; `.e` split OA-28/31 vs OA-34 = two meanings. **Clean.** |
| (5) E-3 | ⟨`git diff --stat 2a987e09~1..HEAD -- docs/tranches/X/keyframes/waves docs/tranches/V/megatranche/registry/adjudicated`⟩ → `KF-W13.md | 25 +` only, 0 removed lines, all by the orchestrator's §0bg..§0bn addenda commits; registry 0. **Held.** |
| (6) mail | the only UNREAD row is I-40 (Track C). **Clean in scope.** |
| (7) four-verb | IMPLEMENTED PARTIAL, VERIFIED NO. **Lawful.** |
| (8) goal at the bytes | OA-27/28/29/31/34 MET on the served page. OA-26 is partly producer-owned (relieved). **OA-32 is absent from the bytes. OA-33's "keyboard reachable" clause fails.** |
| (9) published figures | The e2e figure **"2/6 ×2" does NOT reproduce**. ⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness`⟩ at `62ecc324` → **3/6**: ✗ usability · live-session · live-session-mobile. `subject-animates` PASSED (`[real-cube] playhead advanced 0 → 25`). So RES-close-1's subject-animates limb is timing-dependent, not deterministic. All other figures reproduce. |

### Register (severity · claim · receipt · cure)

1. **HIGH · OA-32 (the living dock icons) is not implemented and has no relief in the spec.** The third addendum joins OA-32 to `.d` and gives it a gate: frame-diff > 0, layer order, bbox ±0.5 px, and PRM frame-diff 0. The spec does not route it to a producer, to a later wave, or to an honest-RED id. ESC-d-2 hands it to the orchestrator. Escalating was lawful, since the cure sits outside `.d`'s set (`demo/app/scene/scenes.ts` + a per-scene seam), but the gate stays RED. Receipt: ⟨`git show --stat 62ecc324`⟩ touches no icon or scene-descriptor byte; the record's "OA-32 NOT IMPLEMENTED". **Cure**: a COHESION grant of `demo/app/scene/scenes.ts` + `demo/scenes/*/` mini-rendition seams to a supplement unit (the §0bk grant idiom), then the OA-32 gate measured headed ×2.
2. **HIGH · The spec's close clause "the kf e2e suite GREEN" is RED, and the spec gives it no relief.** The record routes the reds to KF.W13V `.k`/`.u`. That routing is the record's own voice, not the spec's. KF.W13V opens only after KF.W13U CLOSED, and its own close also demands e2e GREEN, so the routing is circular. One limb is new, caused by this wave's spec-mandated autoplay: `live-session S4` `enterToggled:false, spaceToggled:false` (reproduced at this seat). Receipt: roster → `✗ failed: usability, live-session, live-session-mobile`, EXIT 1. **Cure**: a grant of `scripts/observe/demo/{subject-animates,live-session}.mjs` so the oracles sit on the autoplay premise (pause first, or read a toggle). The four pre-existing reds (usability `title:` · S4 `ringPainted` · S5 spring · M1 touch-scroll) need either cures or an explicit COHESION relief that names them by id.
3. **HIGH · OA-33's "keyboard reachable" clause is RED, and `62ecc324` regressed keyboard access.** The commit removed the dock's keyboard-reachable Share and theme buttons. Their only home is now a menu where both rows are keyboard-inert. Receipt: ⟨`node d/probe-kbd.mjs :5173`⟩ → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}` (ESC-d-3, reproduced). **Cure**: the ESC-d-3 grant. Either `SharePopover` exposes its open model so the row's `@select` opens it, or theme becomes a menu-item form of glass `DarkModeToggle` via the producer (O-56 family), then keyboard-probed ×2. Until then the one-control collapse ships an a11y regression.
4. **MEDIUM · The record's e2e figure does not reproduce (2/6 claimed ×2, 3/6 measured).** Receipt: axis (9). **Cure**: an addendum-beside correcting RES-close-1: the subject-animates limb is flaky (autoplay races the oracle's `sliderBefore === 0` read), so it is not a deterministic RED.
5. **MEDIUM · A new intermittent HARD pageerror on mobile.** It was not reported by the close. HEAD run 1: `[HARD|M4:play-tap] pageerror: Could not resolve "var(--rotationX)" for "transform" to a numeric CSS scalar.` HEAD run 2: budget 0. Baseline `cfecfbce` (fresh gh-pages build, detached worktree, removed after): budget 0. `--rotationX` is declared on `.cube` (`CubeTarget.css:86`) and resolved by `rotationAnim`, which `d78bed01` re-targeted (`useCubeDemo.ts` `setTargets`). **Cure**: owner `.w`'s successor (KF.W13V `.k`, KFA-1/-2 cube writers). Find the resolve-before-target race at the bytes.
6. **MEDIUM · ESC-d-1: the scene-switch dock and pane flicker, part of OA-26's "jittery", is unrelieved.** Its root is at `App.vue:266-276` (`surfacesFor(undefined)` → `[]`), outside `.d`'s carve. **Cure**: a grant of those script lines to a supplement unit.
7. **INFO · `DOCK-MORPH-ROOT` (O-56) / `DOCK-SCROLL-MORPH` (O-55) are honest-RED by the spec's own relief** (the addendum's `.d` bullet names both and the producer owner, glass BL). R-t-2 and R-e-1 are glass-owned residuals and are not W13U gates.

### Honest-RED adjudication (axis 10)

| RED gate | relief in the spec's bytes? | owner named? | reading |
|---|---|---|---|
| `.d` two animation owners per property (8 producer pairs) + blur in flight | **YES**. The addendum's `.d` bullet: "producer causes ride O-55/O-56 … honest-RED id `DOCK-MORPH-ROOT`" | glass BL | **HONEST-RED** |
| OA-32 gate (third addendum) | NO | orchestrator (ESC-d-2) | **unrelieved → HIGH #1** |
| close: kf e2e suite GREEN | NO | the record says KF.W13V `.k`/`.u`, which is circular | **unrelieved → HIGH #2** |
| OA-33 keyboard reachable | NO | orchestrator (ESC-d-3) | **unrelieved → HIGH #3** |

### Successor "Opens after"

**KF.W13V** opens after "KF.W13U CLOSED **and** both registers landed". Its conjuncts:
- KF.W13U CLOSED: **RED** (this check).
- `keyframes/audit/KF-ANIMATION-AUDIT.md`: **GREEN** (present, 222 675 B).
- `docs/tranches/X/audit/UI-AUDIT-keyframes.md`: **RED**. ⟨`ls`⟩ → absent, and `docs/tranches/X/audit/` is untracked.

KF.W13V is **lawfully BLOCKED**.

### Self-count

- kf shas audited: 5. The claimed GREENs re-run: 9. Seven of them were re-run ×2 (4 served-page gates as 5 probe families, plus check and test:demo); eslint ran ×1.
- e2e runs: roster ×1 at HEAD, `live-session-mobile` ×1 more at HEAD, and `live-session-mobile` + `subject-animates` ×1 at baseline.
- Defects: 7 (3 HIGH · 3 MEDIUM · 1 INFO). LEDGER status cell left unchanged (NOT-CONFORMANT); one event line appended.

## Repair 1 — REPAIR SEAT (round 1, against Check 1)

SERVED MODEL: claude-opus-5-5 · 2026-09-23. Spec read whole (`KF-W13.md`, incl. the KF.W13U addendum and OA-31..OA-34 follow-ons); record read header→Unit plan, the `.d` receipt and `## Check 1`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}` letters only (outside every W13U row; untouched); value.js dirty paths `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` — sibling seats', untouched. **0 inherited paths.** kf HEAD at open `62ecc324` = origin.

**Bounds reading.** The addendum declares no §File Bounds; this record's Unit plan is the wave's writable set. A defect is cured here only when its cure lies inside the row of the unit that owns the gate; a cure the Check itself prices as "a COHESION grant" is returned as an escalation (the §0bk grant idiom is the orchestrator's, never a repair seat's). `demo/app/App.vue` sits in `.d`'s row ("dock consumer end"); the ESC-d-1 lines are the feed of the dock's surface set (the machine writer the dock's Controls tab and panel toggle read), so the cure is read as inside `.d`'s row — the `.d` seat's narrower reading is superseded here, with the reason stated.

### Defect → cure → commit → gate re-reading

| # | Check-1 defect | disposition | commit | gate re-reading |
|---|---|---|---|---|
| 6 | MEDIUM · ESC-d-1 scene-switch dock + pane flicker | **CURED** at `App.vue`'s surface feed: `setActiveSurfaces` is fed only once `sceneRef` is bound to THE CURRENT scene (`isHome \|\| sceneRef.superKey === currentSuperKey`, the shell binding's own targets-attached predicate) — pending no longer reads as empty; home still feeds `[]` | kf **`60477b06`** (1 path, pushed) | see table below |
| 4 | MEDIUM · e2e "2/6 ×2" figure does not reproduce | **CURED** by the addendum-beside below (RES-close-1 is not amended, E-3) | this record's commit | measured again at `60477b06` |
| 5 | MEDIUM · intermittent HARD `var(--rotationX)` pageerror (mobile M4) | **NOT REPRODUCED → ESCALATED**: 0 of 9 runs at this seat | — | see below |
| 1 | HIGH · OA-32 living dock icons unimplemented | **ESCALATED** (cure = a COHESION grant, per the Check's own cure) | — | RED, unchanged |
| 2 | HIGH · kf e2e close clause RED | **ESCALATED** (oracle re-seat = `scripts/observe/**`, in no Unit-plan row; four pre-existing reds need cures in rows outside W13U or a named COHESION relief) | — | RED, measured |
| 3 | HIGH · OA-33 keyboard reach regressed | **ESCALATED** (`SharePopover` = `demo/components/instrument/shell/`, in no row; theme = producer `DarkModeToggle` menu-item form, O-56) | — | RED, unchanged |
| 7 | INFO · `DOCK-MORPH-ROOT` / `DOCK-SCROLL-MORPH` honest-RED | no cure owed (producer) | — | unchanged |

### ESC-d-1 — the gate, BEFORE → AFTER (served page, headed, real GPU)

Probe `evidence/W13U/repair1/probe-switch.mjs` (reuses `d/sampler.js`; 1440×900; hover-expand, then the dock Scene select through cube→amiga→square→spring→easing→cube; per frame: `.dock-layer.is-active > *` count, dock width, whether a Controls control is in the dock). BEFORE = HEAD `62ecc324`'s `App.vue` bytes seated on the dev server for the run (⟨`git show HEAD:demo/app/App.vue > demo/app/App.vue`⟩, cured bytes restored after; no other path touched). Reports `repair1/report-switch-{before1,after-dev1,after-dev2,after-gh1,after-gh2}.json`; gh-pages = a fresh `npm run gh-pages` of the cured tree served on `:4188`.

| switch | BEFORE dev (kids · controls-tab · width min–max) | AFTER dev ×2 | AFTER gh-pages ×2 |
|---|---|---|---|
| cube→amiga | `8>5>8` · `1>0>1` · 218.6–410.4 | `8` · `1` · 402.5–410.4 ×2 | `8` · `1` · 402.5–410.4 / 395.7–405.2 |
| amiga→square | `8>5>8` · `1>0>1` · 226.5–418.3 | `8` · `1` · 410.4–418.3 ×2 | `8` · `1` ×2 |
| square→spring | `8>5>8` · `1>0>1` · 220.4–418.3 | `8` · `1` · 401.5–418.3 ×2 | `8` · `1` ×2 |
| spring→easing | `8>5>8` · `1>0>1` · 221.3–401.5 | `8` · `1` · 386.6–413.1 ×2 | `8` · `1` ×2 |
| easing→cube | `8` · `1` · 386.6–402.5 | `8` · `1` ×2 | `8` · `1` ×2 |
| pageerrors | 0 | 0 ×2 | 0 ×2 |

**Reading: GREEN ×4** — the dock and the pane change once per swap, at resolve (the remaining 8–30 px width range is the destination's own label width, a single change). Gates the cure could move, at `60477b06`: ⟨`npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'`⟩ → `0` · ⟨`npx eslint demo/app/App.vue`⟩ → exit 0 · ⟨`npm run check`⟩ → `EXIT 0` ×2 · ⟨`npm run test:demo`⟩ → `64 passed (64)` · `507 passed (507)` ×2.

### Check-1 #4 — ADDENDUM beside RES-close-1 (E-3: the close's bytes stand)

⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness`⟩ at kf `60477b06` (fresh `npm run gh-pages` of that tree) → `passed: 2/6` · `✗ failed: usability, subject-animates, live-session, live-session-mobile` · `EXIT 1`. Check 1 measured `3/6` at `62ecc324` with `subject-animates` PASS (`[real-cube] playhead advanced 0 → 25`); this seat measured it FAIL (`[real-cube] … the playhead stayed 441.1 → 608.3 (advanced=false, engineWrote=true)`). So the roster's published figure is **2/6 or 3/6 depending on one limb**: `subject-animates [real-cube]` races the cube's spec-mandated autoplay (`.w`, `autoPlays: true`) — when the oracle's first read lands after the autoplay has already advanced the clock, its "advanced from 0" premise fails; when it lands first, it passes. **RES-close-1's "2/6 ×2" is therefore corrected to "2/6–3/6; the subject-animates limb is timing-dependent (autoplay vs the oracle's `sliderBefore` read), not a deterministic RED."** The remaining limbs at `60477b06`: `usability` (throws: `EditorStartScreen.vue declares no \`title:\` default`) · `live-session` `FAIL (4)` with `S5` (`spring: INTERACT red — only 1 distinct spring-ball positions after the rail scrub`) and `S4` (`{"focusRing":{"matchesFV":true,"ringPainted":false},"enterToggled":false,"spaceToggled":false}`) · `live-session-mobile` `M1 sheet SCROLL` (`scrollTop=0; 765px content in a 704px body`); live-session ERROR BUDGET = 0.

### Check-1 #5 — the `var(--rotationX)` pageerror: not reproduced (0 of 9)

⟨`node scripts/run-demo-roster.mjs --only=live-session-mobile`⟩ ×3 at `60477b06` (the full roster's leg + two solo runs) → `✓ ERROR BUDGET = 0 across the mobile battery` ×3. ⟨`node evidence/W13U/repair1/probe-rotx.mjs http://localhost:5173/ 6`⟩ (390×844 touch context, `#/cube` load + re-hash + autoplay + a forced transport tap, stacks captured) → `runs with a pageerror: 0 of 6`. Reading at the bytes: the resolver throws only when the target's computed `--rotationX` is empty (`src/animation/resolve/browser.ts:206-211`), i.e. the rotation channel rendered against a `.cube` that is DETACHED (a stale scene instance) — `.cube` declares the variable (`CubeTarget.css:86`) and `useCubeDemo.setTargets` seats `rotationAnim` on it in `onMounted`. Without a reproduction the stale-instance writer cannot be named at the bytes, and any guard in the resolver or the scene would be the masking fallback the law forbids. **ESCALATED**, owner per the Check's own cure: KF.W13V `.k` (KFA-1/-2 cube writers) — carry: an instrumented M4 run that captures the pageerror's stack on a dev build.

### Escalations (returned; nothing written outside the Unit-plan rows)

- **ESC-R1-1 = Check-1 #1 (OA-32, HIGH).** The icon binding is the scene descriptor's `icon` (`demo/app/scene/scenes.ts`) and the motion must derive from each scene's own animation data (`demo/scenes/*/`); OA-32's gate belongs to `.d`, whose row holds neither. A dock-local icon registry would be a second binding beside the descriptor (the H.W5 D8 drift, `ChromeDock.vue:77-83`). The Check prices the cure as a COHESION grant to a supplement unit (the §0bk idiom). RED, unrelieved.
- **ESC-R1-2 = Check-1 #2 (e2e close clause, HIGH).** The autoplay-premise re-seat lives in `scripts/observe/demo/{subject-animates,live-session}.mjs` — in no Unit-plan row. The four pre-existing reds live outside W13U's rows: `usability` (`EditorStartScreen.vue` = `demo/components/instrument/shell/`) · S4 `ringPainted:false` (the focus affordance, G-KFW13-6's subject) · S5 spring INTERACT (`demo/scenes/spring/**` — `.w`'s row, but the limb is a rail-scrub oracle premise not measured on the served page by any W13U unit) · M1 touch scroll (glass Drawer, the Glass-5 overlap family). Needs a grant of the two oracle files plus either cures or a COHESION relief naming usability · S4 · S5 · M1 by id.
- **ESC-R1-3 = Check-1 #3 (OA-33 keyboard reach, HIGH).** Share's open state is local to `SharePopover` (`useShareState()` → `sharePopoverOpen`, `demo/components/instrument/shell/`), so the menu row cannot open it without that file exposing its open model; the theme row needs a menu-item form of glass `DarkModeToggle` (producer, O-56 family). A row-level `useGlobalDark` toggle is the second actuation EH-4 ruled out, and a synthesized `.click()` forward to the nested control would double-fire on pointer activation — both workarounds, not cures. RED, unrelieved.
- **ESC-R1-4 = Check-1 #5 (`var(--rotationX)`, MEDIUM).** Not reproduced in 9 runs (above); owner KF.W13V `.k` per the Check.

### Self-count

kf commits **1** (`60477b06`, 1 path `demo/app/App.vue`, pushed). Defects dispositioned **7**: cured **2** (#6 ESC-d-1 · #4 figure addendum) · escalated **4** (#1 · #2 · #3 · #5) · INFO **1** (#7, no cure owed). value.js: this section + one LEDGER event line + `evidence/W13U/repair1/` (2 probes + 5 reports), in one pathspec commit.

## Check 2 — FRESH ADVERSARIAL CHECK (L-20, pass 2)

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · VERIFY-ONLY (0 kf / glass / product bytes). Spec read: `KF-W13.md` KF.W13U addendum + OA-31..OA-34 follow-ons (`:315-336`) and the KF.W13V "Opens after" (`:340`); record read header→Unit plan, `## Close`, `## Check 1`, `## Repair 1`. Crash-recovery: ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}` letters only; value.js dirty paths are sibling tracks' (`demo/workbenches/extract/**`, `demo/test/extract/`, `CARRY-LEDGER.md`, `docs/tranches/X/audit/`, `chassis/ui-audit.js`) + `scripts/dev/dev.sh` (untouched). **0 inherited paths.** kf HEAD `60477b06` = origin/master (Repair 1's tip). COHESION after Repair 1: ⟨`grep -n '^## §0b[m-z]' COHESION.md`⟩ → last `§0bq` (OA-39 → KF.W13V `.s`); ⟨`grep -n 'ESC-R1-[123]\|OA-32\|KF-E2E-AUTOPLAY\|ESC-d-3'`⟩ → no grant or relief for any W13U escalation. Load note: the host ran at load average 226–540 during this seat (⟨`uptime`⟩), sibling seats live.

**Verdict: NOT-CONFORMANT.** Every GREEN the close and Repair 1 claim reproduces; the three HIGHs of Check 1 stand unchanged: Repair 1 escalated them, and no COHESION grant or relief has landed since.

### Axis readings

| axis | reading |
|---|---|
| (1) claimed GREENs reproduce | **YES, 9 of 9** (served dev `:5173`, headed, banked probes run ×2 from the scratch cwd, the probe outputs this seat wrote into `evidence/W13U/` deleted after): G-KFW13U-w ⟨`probe-w1.mjs`⟩ → rest `rotateX(358.0)`…, Play `360 → 352.9 → 330.6` · run 2 `324.3 → 283.1 → 227.0` · G-KFW13U-t ⟨`probe-t1.mjs`⟩ ×2 → `dis:false`, drag `now 2300 → 3800`, holds `3800`, cube `rotateX(155.273deg) → (317.237deg)` · G-KFW13U-e ⟨`probe-e1.mjs`⟩ ×2 → trigger `ease-in-out` + `curve-glyph`, rows 29/29/29 distinct, named 27/27 (worst 5e-4), desc-separated 29, accname 29, after-pick `ease-out-back` · `.d` sharp ⟨`probe-sharp.mjs`⟩ ×2 → `diffPx 0`, 5.992 = 5.992 · `.d` OA-33 collapse ⟨`probe-oa33.mjs`⟩ ×2 → 402.49 px, `Scene · Controls tab · Controls panel · @mbabb menu`, dialog 1, theme flips, share 1, Escape → `@mbabb menu` · Repair-1 ESC-d-1 ⟨`repair1/probe-switch.mjs`⟩ ×2 → kids `8`, controls-tab `1` on 5/5 switches, pageerrors 0 · ⟨`npm run check`⟩ ×2 → EXIT 0, `error TS` 0 · 0 · ⟨`npm run test:demo`⟩ → **64/64 · 507/507 EXIT 0** on 1 of 4 full runs. The other 3 ran at load 250–540 and failed 1–5 tests: 7 hook timeouts at 10 s + `typing-dots-engine-seam` (2), the only assertion failure. Both recurring files pass isolated 8/8 (⟨`npx vitest run --project demo <the two files>`⟩); neither file nor its subject is touched by any W13U sha → load, not the wave (INFO #6). test:lib and eslint cited, not re-run. |
| (2) bounds | 6 kf shas ⟨`git show --stat`⟩: the five of the close (in their rows, per Check 1) + `60477b06` = `demo/app/App.vue` only (1 file, +19 −1), which is in `.d`'s row (the dock consumer end). The Repair seat stated why it read the surface feed as dock consumer end, and the reading holds. value.js `42a82e3e` = this record + LEDGER + `evidence/W13U/repair1/**` (9 files). `scripts/dev/dev.sh` is in no W13U commit. **Clean.** |
| (3) masking | ⟨`git diff 62ecc324..60477b06 -- demo`⟩: one `computed` predicate gating `setActiveSurfaces`, with no try/catch, skip or allowlist. It gates on the scene binding's own `superKey`, which is a root cause (a pending state was read as empty), not a suppression. Repair 1 declined the `--rotationX` resolver guard as masking, and that was correct. **Clean.** |
| (4) families | one sha per meaning (`60477b06` = ESC-d-1 only). **Clean.** |
| (5) E-3 | ⟨`git diff --stat 2a987e09~1..HEAD -- docs/tranches/X/keyframes/waves docs/tranches/V/megatranche/registry/adjudicated docs/tranches/X/CONFORMANCE-2026-08-03.md`⟩ → `KF-W13.md | 27 +` (insertions only; orchestrator addenda §0bg..§0bq), registry 0. Repair 1's figure correction is an addendum-beside RES-close-1. **Held.** |
| (6) mail | INBOX I-n status cells: I-40 `READ 2026-09-23` (Track C) · I-41 `READ (COHESION §0bo)`. **0 UNREAD in scope.** |
| (7) four-verb | IMPLEMENTED PARTIAL, VERIFIED NO. **Lawful.** |
| (8) goal at the bytes | OA-27/28/29/31/34 MET; ESC-d-1 (part of OA-26's "jittery") now MET. OA-26's in-flight blur and two-owner pairs are relieved as producer-owned. **OA-32 is absent from the bytes** (no icon or scene-descriptor byte changed since `62ecc324`). **OA-33's "keyboard reachable" is still RED**: ⟨`node d/probe-kbd.mjs`⟩ ×2 → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}`. |
| (9) published figures | Every served-page, check and test:demo figure reproduces (above). The e2e roster was **not re-run at this seat**: under a host load of 226–540 it would not discriminate, and Check 1 at `62ecc324` (3/6) and Repair 1 at `60477b06` (2/6) agree that it is RED. The addendum-beside figure "2/6–3/6, subject-animates timing-dependent" stands. |

### Register (severity · claim · receipt · cure)

1. **HIGH · OA-32 (the living dock icons) is not implemented and has no relief in the spec.** This is Check 1 #1, unchanged. Receipt: ⟨`git diff 62ecc324..60477b06 --stat`⟩ → `demo/app/App.vue` only; there is no `demo/app/scene/scenes.ts` or icon byte in any W13U sha. The COHESION tail holds no grant. **Cure**: the orchestrator grants `demo/app/scene/scenes.ts` + the `demo/scenes/*/` mini-rendition seams to a supplement unit (ESC-R1-1), and the OA-32 gate is then measured headed ×2.
2. **HIGH · The close clause "the kf e2e suite GREEN" is RED with no relief in the spec's bytes.** This is Check 1 #2, unchanged. It includes the wave-caused limb S4 `enterToggled:false` (the autoplay premise). Routing it to KF.W13V is still circular, because KF.W13V opens only after KF.W13U CLOSED. **Cure**: grant `scripts/observe/demo/{subject-animates,live-session}.mjs` (ESC-R1-2). Then either cure the pre-existing four (usability `title:` · S4 `ringPainted` · S5 spring · M1 touch-scroll) or have COHESION relieve them by id.
3. **HIGH · OA-33's "keyboard reachable" clause is RED, and it is a regression from `62ecc324`.** This is Check 1 #3, unchanged. Receipt: ⟨`node d/probe-kbd.mjs :5173`⟩ ×2 → Enter on the Dark-mode row does not flip, and Enter on the Share row opens 0. **Cure**: grant ESC-R1-3. `SharePopover` exposes its open model, and the theme row takes glass's menu-item form of `DarkModeToggle`, which rides O-56. Then keyboard-probe ×2.
4. **MEDIUM · the intermittent HARD `var(--rotationX)` pageerror (Check 1 #5) is still unowned at the bytes.** Repair 1 did not reproduce it in 0 of 9 runs and escalated it to KF.W13V `.k`, and this seat did not re-run the mobile battery. It is non-blocking at MEDIUM. **Cure**: an instrumented M4 run on a dev build at the owner seat.
5. **INFO · `DOCK-MORPH-ROOT` (O-56) / `DOCK-SCROLL-MORPH` (O-55)** are honest-RED under the spec's own `.d` relief (owner glass BL).
6. **INFO · test:demo is load-sensitive.** At host load 250–540, 3 of 4 full runs failed: 7 hook timeouts at 10 s, and `typing-dots-engine-seam` (2), which is timing-sensitive under load. Both pass isolated, and the full suite goes green at lower load. No W13U byte is involved. No cure is owed by this wave.

### Honest-RED adjudication (axis 10)

| RED gate | relief in the spec's bytes? | owner named? | reading |
|---|---|---|---|
| `.d` two animation owners per property (8 producer pairs) + in-flight blur | **YES**: the addendum's `.d` bullet names honest-RED `DOCK-MORPH-ROOT` and routes producer causes to O-55/O-56 | glass BL | **HONEST-RED** |
| OA-32 gate (third addendum) | NO | orchestrator (ESC-d-2 / ESC-R1-1) | **unrelieved → HIGH #1** |
| close: kf e2e suite GREEN | NO | the record names KF.W13V `.k`/`.u`, which is circular | **unrelieved → HIGH #2** |
| OA-33 keyboard reachable | NO | orchestrator (ESC-d-3 / ESC-R1-3) | **unrelieved → HIGH #3** |

### Successor "Opens after"

KF.W13V (`:340`) opens after "KF.W13U CLOSED **and** both registers landed".
- KF.W13U CLOSED: **RED** (this check).
- `docs/tranches/X/keyframes/audit/KF-ANIMATION-AUDIT.md`: **GREEN** (present).
- `docs/tranches/X/audit/UI-AUDIT-keyframes.md`: **RED** (⟨`ls docs/tranches/X/audit/`⟩ → `ui-evidence` only; the directory is untracked).

**KF.W13V is lawfully BLOCKED.** The one wave-owned path to CLOSED is the orchestrator's: either the three grants (ESC-R1-1..3) to a supplement unit, or a dated COHESION relief that names OA-32, the e2e clause and OA-33-keyboard by id and gives each an owner.

### Self-count

- kf shas audited: 6 (5 close + `60477b06`).
- value.js shas audited: 1 new (`42a82e3e`).
- Claimed GREENs re-run: 9, and 7 of them ×2 (5 served-page probe families + the ESC-d-1 switch probe + check). test:demo ran 4 full times (1 clean) plus 1 isolated run; eslint and test:lib were cited.
- probe-kbd (the HIGH #3 receipt) ×2.
- Defects: 6 (3 HIGH · 1 MEDIUM · 2 INFO).
- The LEDGER status cell is unchanged (NOT-CONFORMANT), and one event line is appended.

## Repair 2 — REPAIR SEAT (round 2, against Check 2)

SERVED MODEL: claude-opus-5-5 · 2026-09-23. Spec read whole (`KF-W13.md`, the KF.W13U addendum + OA-31..OA-34 and the KF.W13V addenda); record read header→Unit plan, `## Repair 1` and `## Check 2`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}` letters only (outside every W13U row; untouched); value.js dirty paths `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` — sibling seats', untouched. **0 inherited paths.** kf HEAD ⟨`git log -1 --format=%h` / `origin/master`⟩ → `60477b06` / `60477b06` (unchanged since Check 2). Host load ⟨`uptime`⟩ → 575–707.

**Grant check.** ⟨`grep -n '^## §0b[m-z]' COHESION.md | tail`⟩ → last `§0bq` (OA-39 → KF.W13V `.s`), the same tail Check 2 read; ⟨`grep -n 'ESC-R1-[1234]\|OA-32' COHESION.md`⟩ → `:2855` (an X.W5 `.c2` grant, a different wave's ESC-R1 family) and `:3000-3001` (§0bh, OA-32's minting) only. **No grant or relief for any KF.W13U escalation has landed.** The three HIGHs' cures are, by Check 2's own pricing, orchestrator grants; a repair seat does not mint them (Repair 1 bounds reading, unchanged).

### Defect → cure → commit → gate re-reading

| # | Check-2 defect | disposition | commit | gate re-reading |
|---|---|---|---|---|
| 1 | HIGH · OA-32 living dock icons | **ESCALATED (ESC-R2-1 = ESC-R1-1)** — the icon binding (`demo/app/scene/scenes.ts`) and the per-scene rendition seams (`demo/scenes/*/`) sit in no `.d` row; a dock-local icon registry would be a second binding beside the descriptor (H.W5 D8 drift) | — | RED, unchanged (no icon/descriptor byte since `62ecc324`) |
| 2 | HIGH · kf e2e close clause | **ESCALATED (ESC-R2-2 = ESC-R1-2)** — oracle re-seat = `scripts/observe/demo/{subject-animates,live-session}.mjs`, in no row; usability · S4 · S5 · M1 need cures outside W13U's rows or a COHESION relief by id | — | RED; not re-run (load 575–707 does not discriminate; Check 1 3/6, Repair 1 2/6 agree) |
| 3 | HIGH · OA-33 keyboard reach | **ESCALATED (ESC-R2-3 = ESC-R1-3)** — `SharePopover` open model (`demo/components/instrument/shell/`, no row) + glass `DarkModeToggle` menu-item form (producer, O-56); a row-level `useGlobalDark` or a synthesized `.click()` forward are workarounds | — | RED, unchanged (kf bytes unchanged since Check 2's `probe-kbd` ×2) |
| 4 | MEDIUM · `var(--rotationX)` pageerror | **NOT REPRODUCED → ESCALATED (ESC-R2-4)** — ⟨`node repair1/probe-rotx.mjs http://localhost:5173/ 8`⟩ at load 575–707 (the high-load premise the prior 9 runs lacked) → `runs with a pageerror: 0 of 8` (banked `evidence/W13U/repair2/rotx-run.txt`); cumulative 0 of 17. No stack → no writer named at the bytes; a resolver/scene guard is the forbidden masking fallback | — | not reproduced |
| 5 | INFO · `DOCK-MORPH-ROOT` / `DOCK-SCROLL-MORPH` | honest-RED under the spec's `.d` relief; no cure owed | — | unchanged |
| 6 | INFO · test:demo load-sensitivity | no W13U byte; no cure owed | — | not re-run (no kf byte moved) |

No cure landed, so no gate could move: the Check-2 readings (9/9 GREENs; check EXIT 0; test:demo 507/507) stand at `60477b06` unchanged.

### Escalations (returned)

- **ESC-R2-1 (OA-32)** — needs the orchestrator's grant of `demo/app/scene/scenes.ts` + `demo/scenes/*/` rendition seams to a supplement unit; gate then measured headed ×2.
- **ESC-R2-2 (e2e close clause)** — needs the grant of `scripts/observe/demo/{subject-animates,live-session}.mjs` + cures or a COHESION relief naming usability · S4 · S5 · M1 by id.
- **ESC-R2-3 (OA-33 keyboard)** — needs the grant of `demo/components/instrument/shell/SharePopover*` (open model) + glass's `DarkModeToggle` menu-item form (O-56).
- **ESC-R2-4 (`--rotationX`)** — 0 of 17 runs; owner KF.W13V `.k` (instrumented dev-build M4 at the owner seat).

**The wave's one path to CLOSED remains the orchestrator's** (three grants, or a dated COHESION relief naming OA-32, the e2e clause and OA-33-keyboard by id with owners).

### Self-count

kf commits **0**. Defects dispositioned **6**: cured **0** · escalated **4** (#1 · #2 · #3 · #4) · INFO **2** (#5 · #6). value.js: this section + one LEDGER event line + `evidence/W13U/repair2/rotx-run.txt` (1 file), one pathspec commit.

## Check 3 — FRESH ADVERSARIAL CHECK (L-20, pass 3)

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · VERIFY-ONLY (0 kf / glass / product bytes). Spec read whole (`KF-W13.md`, incl. the KF.W13U addendum + OA-31..OA-34 and the KF.W13V addenda); record read header→Unit plan, `## Check 2`, `## Repair 2`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}` letters only; value.js dirty = `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` (sibling seats'; untouched). **0 inherited paths.** kf HEAD ⟨`git log -1` / `rev-parse origin/master`⟩ → `60477b06` / `60477b06`; ⟨`git log --oneline 60477b06..HEAD | wc -l`⟩ → `0`. Host load ⟨`uptime`⟩ → 383–407.

**Grant check.** ⟨`grep -n '^## §0b[m-z]\|^## §0c' COHESION.md | tail`⟩ → last **`§0bq`** (OA-39 → KF.W13V `.s`), the same tail Check 2 and Repair 2 read; ⟨`grep -n 'ESC-R2\|KF.W13U' COHESION.md`⟩ → no ESC-R2 hit; the KF.W13U hits are §0be..§0bj mintings only. **No grant or relief for ESC-R2-1..4 has landed.**

### Axis readings

| axis | reading |
|---|---|
| (1) claimed GREENs reproduce | **YES** (served dev `:5173` HTTP 200, headed; the banked probes run from this seat's scratch cwd — `e1` copied there — so no byte lands in `evidence/`): G-KFW13U-w ⟨`w/probe-w1.mjs`⟩ ×3 → rest `rotateX(298.4deg)` → `(355.8deg)` across 1 s, `autoPlaying:true`, paused frozen `358.887` = `358.887` · G-KFW13U-t ⟨`t/probe-t1.mjs`⟩ ×3 → boot cube/square/amiga `dis:false`, `rootOp 1`, `greyAncestor:false`; drag `now 2300 → 3800`, holds `3800` on release; cube `rotateX(155.273deg) → (317.237deg)` · G-KFW13U-e ⟨`probe-e1.mjs`⟩ ×2 → trigger `ease-in-out` + `curve-glyph` (truth 5e-4), rows 29/29/29 distinct, named 27/27 (worst 5e-4), descSeparated 29, accName 29, after-pick `ease-out-back`, pageerrors 0 · `npm run check` (kf) → `EXIT 0` ×1 (the ×2 of Check 2 at the same bytes stands). `.d` sharp/OA-33 collapse and test:demo 507/507 cited from Check 2 at `60477b06` (0 kf bytes since). |
| (2) bounds | no new kf sha; value.js since Check 2: `6c5f2c42` (Repair 2) = this record + LEDGER + `repair2/rotx-run.txt` (3 files, in bounds). ⟨`git log --format=%h 2a987e09~1..HEAD -- scripts/dev/dev.sh \| wc -l`⟩ → `0`. **Clean.** |
| (3) masking | no product diff since Check 2. **Clean.** |
| (4) families | unchanged (one sha per meaning). **Clean.** |
| (5) E-3 | ⟨`git diff --stat 2a987e09~1..HEAD -- registry/adjudicated CONFORMANCE-2026-08-03.md`⟩ → empty; ⟨`--numstat -- keyframes/waves`⟩ → `27 0 KF-W13.md` (insertions only — orchestrator addenda-beside). **Held.** |
| (6) mail | INBOX I-40 `READ 2026-09-23 (X.F.W13.a)` (Track C) · I-41 `READ (COHESION §0bo)`. **0 UNREAD in scope.** |
| (7) four-verb | IMPLEMENTED PARTIAL, VERIFIED NO. **Lawful.** |
| (8) goal at the bytes | OA-27/28/29/31/34 + ESC-d-1 MET (reproduced above). **OA-32 absent**: ⟨`git diff --stat cfecfbce..HEAD -- demo/app/scene assets/icons`⟩ → empty. **OA-33 keyboard reach RED**: ⟨`node d/probe-kbd.mjs http://localhost:5173/`⟩ ×2 → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}` both runs. |
| (9) published figures | every figure above reproduces; kf e2e roster not re-run (0 kf bytes since Repair 1's 2/6 and Check 1's 3/6; load 383–407 does not discriminate). |

### Register (severity · claim · receipt · cure)

1. **HIGH · OA-32 (living dock icons) unimplemented, no relief in the spec** — Check 2 #1 / ESC-R2-1, unchanged. Receipt: 0 kf commits since `60477b06`; no `demo/app/scene/**` or `assets/icons/**` byte in any W13U sha. **Cure**: orchestrator grant of `demo/app/scene/scenes.ts` + the `demo/scenes/*/` rendition seams to a supplement unit (or a dated COHESION relief naming OA-32 with an owner); then the OA-32 gate headed ×2.
2. **HIGH · close clause "the kf e2e suite GREEN" RED, no relief in the spec's bytes** — Check 2 #2 / ESC-R2-2, unchanged (routing to KF.W13V is circular: W13V opens only after W13U CLOSED). **Cure**: grant `scripts/observe/demo/{subject-animates,live-session}.mjs` + cures, or a COHESION relief naming usability · S4 · S5 · M1 by id.
3. **HIGH · OA-33 "keyboard reachable" RED** — Check 2 #3 / ESC-R2-3; re-probed ×2 at this seat (above). **Cure**: grant `SharePopover` open model (`demo/components/instrument/shell/`) + the glass `DarkModeToggle` menu-item form (O-56); keyboard-probe ×2.
4. **MEDIUM · intermittent `var(--rotationX)` pageerror unowned at the bytes** — 0/17 reproductions (Repair 2); escalated ESC-R2-4 → KF.W13V `.k`. Non-blocking.
5. **INFO · `DOCK-MORPH-ROOT` (O-56) / `DOCK-SCROLL-MORPH` (O-55)** — honest-RED under the addendum's own `.d` relief (owner glass BL).
6. **INFO · test:demo load-sensitivity** — no W13U byte; not re-run.

### Honest-RED adjudication (axis 10)

| RED gate | relief in the spec's bytes? | owner | reading |
|---|---|---|---|
| `.d` two-owner pairs + in-flight blur | YES — `.d` bullet names `DOCK-MORPH-ROOT`, producer halves → O-55/O-56 | glass BL | **HONEST-RED** |
| OA-32 gate | NO | orchestrator (ESC-R2-1) | **unrelieved → HIGH #1** |
| close: kf e2e GREEN | NO | orchestrator (ESC-R2-2) | **unrelieved → HIGH #2** |
| OA-33 keyboard reach | NO | orchestrator (ESC-R2-3) | **unrelieved → HIGH #3** |

### Successor "Opens after"

KF.W13V: "KF.W13U CLOSED **and** both registers landed" — KF.W13U CLOSED **RED** (this check) · `keyframes/audit/KF-ANIMATION-AUDIT.md` **GREEN** (present) · `docs/tranches/X/audit/UI-AUDIT-keyframes.md` **RED** (⟨`ls docs/tranches/X/audit/`⟩ → `ui-evidence` only, untracked). **KF.W13V lawfully BLOCKED.**

**Verdict: NOT-CONFORMANT.** Every claimed GREEN reproduces; the three HIGHs stand because no grant or relief has landed since Check 2 (COHESION tail `§0bq`, kf bytes unchanged at `60477b06`). A third repair round without a grant cannot move them. The wave's one path to CLOSED is still the orchestrator's: grant ESC-R2-1..3, or a dated COHESION relief that names each by id with an owner.

### Self-count

- kf shas new since Check 2: **0**. value.js shas audited: **1** (`6c5f2c42`).
- Claimed GREENs re-run: **4** (w ×3 · t ×3 · e ×2 · check ×1). RED receipts re-run: probe-kbd ×2.
- Defects: **6** (3 HIGH · 1 MEDIUM · 2 INFO).
- LEDGER: status cell unchanged; one event line appended.

## RESUME 2 — SEAT 0 (OPEN, the §0br supplement) — 2026-09-23

SERVED MODEL: claude-opus-5-5 · Track B · RESUME on COHESION §0br + `KF-W13.md` KF.W13U SIXTH addendum (`:357-363`, read with the earlier KF.W13U addenda `:315-336`). E-3: every byte above this heading stands; this section is appended beside it.

### Open

- **LEDGER** `:58` KF.W13U status cell reads **PARTIAL** (Check 3 NOT-CONFORMANT, `:640`); record present → RESUME mode. ⟨`git -C keyframes.js log --oneline -1`⟩ → `60477b06` (= Check 3's reading; 0 kf shas since). **alreadyDone** (commits exist): `KF.W13U.w` `d78bed01` · `.t` `3c8199c5` · `.e` `cd2cd88f` + `57b4815c` · `.d` `62ecc324` (+ Repair 1 `60477b06`). ⟨`git log --oneline | grep -c 'W13U.t2\|W13U.d2\|W13U.d3\|W13U.d4\|W13U.x'`⟩ → `0`: all five §0br units still owed.
- **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` only (in no writable set; untouched). value.js dirty = `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` (sibling seats'; untouched). **0 inherited paths.**
- **Rulings cited (never re-opened)**: §0br (the five grant units `.t2` `.d2` `.d3` `.d4` `.x`; e2e at `--workers=1` with the load average recorded; O-61) · §0bh (OA-32 gate) · §0bi (OA-33) · §0be (served-page instrument rule) · §0bd/§0bc (O-55/O-56 honest-RED). Honest-RED ids carried: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM`.
- **Preconditions**: the sixth addendum opens its units on the §0br ruling itself (no further "Opens after"); predecessor KF.W13T CLOSED (banked at the first Open above). **MET.**
- **E13 Step-0 mail sweep** (four paths, `find -maxdepth 2 -type f -newermt "2026-09-23 12:40:00"`): value.js `V/` + `V/coordination/` → `INBOX.md` only · glass `BK/coordination/` → `valuejs-outbound-2026-09-23-kf-w13u-relay.md` (our own O-61 mirror, rowed) · glass newest tranche dir ⟨`ls -t glass-ui/docs/tranches | head -1`⟩ → `BL`; BL new = `audit/INBOUND.md` + `PROMPT-RECAP-SEED.md` at glass `fe5df357` = I-42 (rowed, READ) · keyframes `V/coordination/` → none · atlas `P/coordination/` → none. **0 unrowed, 0 new UNREAD.** Sweep line appended to `INBOX.md`.

### Baseline (BEFORE — read-only; served dev `http://localhost:5173/` HTTP 200, headed Chromium via value.js Playwright; probes run from this seat's scratch, 0 bytes in `evidence/`)

| gate (unit) | BEFORE ×2 (load avg beside) | reading |
|---|---|---|
| G-t2 (`.t2`) grep | ⟨`grep -rn isAnimStarted demo test \| wc -l`⟩ → **9** (decl `PlaybackRibbon.vue:205` + doc comment `:9`; mounts `ChannelOptions.vue:650` (spec cited `:586` — drifted), `EasingScene.vue:114`, `SpringScene.vue:196`; `ChannelOptions.vue:898` `isStarted: isAnimStarted`; test `playback-ribbon-contract.test.ts:229,418,421`) | **RED** (≠0). vue-tsc banked 0·0 at `60477b06` (Check 3), not re-run. |
| G-d2 OA-32 (`.d2`) | ⟨`node icon.mjs`⟩ (Scene-combobox icon, `#/cube` + `#/amiga`, two screenshots 1 s apart) → `{"cube":{"pngBytesDiffer":0,"box":{…"width":20,"height":20},"anims":0},"amiga":{"pngBytesDiffer":0,…,"anims":0}}` ×2 (load 78 · 72) | **RED** — the chosen icon is static (frame-diff 0, 0 animations); icons are `?component` static SVGs bound at `scenes.ts:15-20,142..`. |
| G-d3 ESC-d-1 (`.d3`) | ⟨`node repair1/probe-switch.mjs http://localhost:5173/ baseN`⟩ (5 switches cube>amiga>square>spring>easing>cube, per-frame) → every switch `kidsSeq "8"`, `controlsTabSeq "1"`, 181–195 frames, wMin 386.55 · wMax 418.26; `pageerrors 0` ×2 (load 104 · 86) | **GREEN-before-cure on the empty-surface limb** (R.2 finding: Repair 1 `60477b06` already cured it at `App.vue`'s feed). Unmeasured: the spec's 10-switch count and "dock width changes ONCE per switch" (the probe records min/max only) — `.d3` owes them. |
| G-d4 OA-33 keyboard (`.d4`) | ⟨`node d/probe-kbd.mjs http://localhost:5173/`⟩ → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}` ×2 (load 124 · 115) | **RED** both limbs (Share row: `.d4` cure; theme row: `DARK-MENU-ITEM` honest-RED unless installed glass has the menu-item form). |
| G-x kf e2e close clause (`.x`) | not re-run (needs a gh-pages build + the roster; > 120 s). Banked at the current bytes: Repair 1 ⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness`⟩ at kf `60477b06` → `passed: 2/6` · ✗ usability · subject-animates · live-session · live-session-mobile (Check 1 at `62ecc324`: 3/6, subject-animates timing-dependent). kf HEAD unchanged since → the banked reading stands. | **RED** (cited). |

Host load ⟨`uptime`⟩ at open: 127.06 / 176.58 / 221.79.

### Unit plan (RESUME 2)

Order (sixth addendum, strictly serial): **[`.t2`] → [`.d2`] → [`.d3`] → [`.d4`] → [`.x`]**, one at a time; Opus 5.5 every seat (§0br); ESCALATED units do not halt the wave. Every unit also writes this record, `docs/tranches/X/keyframes/evidence/W13U/**`, and its LEDGER cells (append-only). glass-ui READ-ONLY. All paths kf unless noted. Every served-page gate: dev `:5173` headed real GPU ×2 + gh-pages ×2 (§0be).

| unit | model | spec | writable | gates | locks / families |
|---|---|---|---|---|---|
| `KF.W13U.t2` | opus | `:358` (R-t-1) | `demo/components/playback/PlaybackRibbon.vue` · `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` · `demo/scenes/easing/EasingScene.vue` · `demo/scenes/spring/SpringScene.vue` · `test/demo/instrument/playback-ribbon-contract.test.ts` | grep `isAnimStarted` demo+test → 0; vue-tsc 0·0; test:demo green | ONE commit (decl + 3 mounts + test) |
| `KF.W13U.d2` | opus (effort high) | `:359` + §0bh `:332` | `demo/app/scene/scenes.ts` · `demo/scenes/*/` (one mini-rendition seam each) · `demo/app/dock/ChromeDock.vue` · `test/demo/**` (witness) | OA-32 headed ×2: chosen icon frame-diff > 0 across 1 s; layers in scene order; bbox ±0.5 px; 0 px outside box; PRM → frame-diff 0; vue-tsc 0·0; test:demo green | descriptor `icon` stays the ONE binding; no dock-local registry |
| `KF.W13U.d3` | opus | `:360` (ESC-d-1) | `demo/app/App.vue` (script `:266-276` region only) · `demo/state/controlSurfaces.ts` · `test/demo/**` | 10 switches sampled per frame: dock width + controls-pane surface set change ONCE per switch, 0 empty-surface frames, headed ×2 (+ gh-pages ×2) | GREEN-before-cure on the 5-switch empty-surface limb (Repair 1) |
| `KF.W13U.d4` | opus | `:361` (ESC-d-3) | `demo/components/instrument/shell/SharePopover.vue` · `demo/app/dock/MbabbMenu.vue` · `test/demo/**` | keyboard probe ×2: Enter on Share row opens Share (Share URL textbox 1), Escape returns focus to `@mbabb menu`; theme row: adopt glass menu-item form if installed, else `DARK-MENU-ITEM` honest-RED | never a second `useGlobalDark` actuation (EH-4) |
| `KF.W13U.x` | opus (effort high) | `:362` (ESC-R2-2) | `scripts/observe/demo/subject-animates.mjs` · `scripts/observe/demo/live-session.mjs` · cause owners: `demo/components/instrument/shell/EditorStartScreen.vue` (usability) + the demo file each of S4 / S5 / M1 traces to (named in the receipt; a cause outside `demo/**` → ESCALATE) · `test/demo/**` | `KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness` 6/6 at `--workers=1` ×2, load avg recorded beside each run (§0br instrument condition); vue-tsc 0·0; test:demo green | oracle properties kept (no weakened assertion) |

Close (after `.x`): `npm run check` exit 0 · vitest GREEN · kf e2e GREEN · the served-page gates of `.w .t .e .d` + the five supplements re-read by the check seat itself.

### Unit receipts (RESUME 2)


#### KF.W13U.t2 — R-t-1: retire the unread `isAnimStarted` prop (SERVED MODEL: claude-opus-5-5)

1. **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*` (outside this unit's set; untouched). No inherited edits in the writable set.
2. **Measured anchors (BEFORE).** ⟨`grep -rn isAnimStarted demo test | wc -l`⟩ → **9**: `PlaybackRibbon.vue:9` (doc comment) · `:205` (declaration) · `ChannelOptions.vue:650` (mount; spec cited `:586` — drifted, intent applied at the true bytes) · `ChannelOptions.vue:898` (`isStarted: isAnimStarted` — its only reader was the `:650` mount) · `EasingScene.vue:114` · `SpringScene.vue:196` · `playback-ribbon-contract.test.ts:229,418,421`. ⟨`grep -rn isStarted demo`⟩: the scenes' own `isStarted` refs (Easing `:50`/expose `:134`, Spring `:117`/expose `:273`) are the scene expose surface (also exposed by Cube/Sequence) — NOT isStarted-for-the-prop plumbing; kept.
3. **Cure (one commit, spec's lock).** Deleted the declaration + its OA-29 retirement docblock; the header comment reworded without the name ("derived from the animation's started flag"); ChannelOptions drops the `:is-anim-started` binding and the `isStarted: isAnimStarted` destructure from `useAnimationSync` (the composable still returns it; its file is outside this set); EasingScene drops `isAnimStarted: true`; SpringScene drops `isAnimStarted: isStarted.value` and its KF-SS-34 comment. Test: `mountRibbon`'s default drops the field; the D-6→OA-29 case keeps every before-start assertion and now pins its precondition on the animation itself — `expect(seat.anim.started).toBe(false)` (the mounted `CSSKeyframesAnimation` is never played) — instead of a flag.
4. **Commit.** kf **`531aa3f1`** (5 paths, +11/−27), pushed `60477b06..531aa3f1 master -> master`.
5. **Gates (AFTER, read on the committed bytes).**
   - ⟨`grep -rn isAnimStarted demo test | wc -l`⟩ ×2 → **0 · 0** (BEFORE 9). GREEN.
   - ⟨`npx vue-tsc --noEmit -p tsconfig.json`; `-p tsconfig.test.json`⟩ → exit **0 · 0** (pre- and post-commit). GREEN.
   - `test:demo`: ⟨`npm run test:demo -- --no-file-parallelism`⟩ → **64/64 files · 507/507 tests**, load avg 131→78. GREEN. Two parallel runs beforehand at load avg 94–148 went RED on TIMEOUTS ONLY, and different files each time (run 1: 9 files — 7 `Hook timed out in 10000ms`, 1 `Test timed out in 5000ms`, 1 typing-dots paint assertion; run 2 `--maxWorkers=4`: 4 files, all timeouts). Every one passed on a serial re-run (10 files 94/94; 4 files 35/35). This is the load family the wave's instrument condition names, not a RED.
6. **Residuals.** None owned. (Noted, not acted on: `useAnimationSync` still returns `isStarted`; ChannelOptions no longer reads it. Whether anything else consumes it belongs to whoever owns `channel-controls/composables/**`.)
7. **Escalations.** None.
8. **Self-count.** Acts 1–8; commits 1 kf (`531aa3f1`) + this record commit; gates 3 of 3 GREEN (+ push).


#### KF.W13U.d2 — OA-32: the living dock icons (SERVED MODEL: claude-opus-5-5)

Spec: `KF-W13.md` sixth addendum `.d2` (`:359`, ESC-d-2) + third addendum OA-32 (`:332`, gate) · COHESION §0bh (OA-32 minted) · §0br (the grant: `scenes.ts` as the ONE binding, one mini-rendition seam per `demo/scenes/*/`, `ChromeDock.vue`; no dock-local registry). COHESION read §0bh → EOF (`:3000-3068`); no later ruling touches `.d2`.

1. **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` (in no writable set; untouched). value.js dirty = `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` (sibling seats'; untouched). **0 inherited paths.** kf HEAD `531aa3f1` (= `.t2`).
2. **Measured BEFORE (served dev `:5173`, headed Chromium, real GPU).** Probe `evidence/W13U/d2/probe-icon.mjs` (first form: the expanded trigger's `.dock-glyph`, two screenshots 1 s apart, pixel diff inside the box and in a 6 px ring outside it). ⟨`node probe-icon.mjs http://localhost:5173/ before-dev{1,2}`⟩ ×2 → all six scenes `{"diffInside":0,"diffOutside":0,"tag":"svg","layers":[],"anims":0}`, bbox 20×20, pageerrors 0 (load 54.6). **RED reproduced** (the icons were the static `@assets/icons/*.svg?component` SFCs bound at `scenes.ts:15-20`).
3. **Anchor finding (recorded, the probe re-seated to it).** The chosen scene's icon renders at TWO sites in `ChromeDock.vue`: the expanded trigger (`:451`) and the collapsed face (`#collapsed` Button, `:611`). At rest the dock is collapsed and the trigger's glyph is `visibility: hidden`, opacity 0 (⟨probe⟩ → `{ vis: 'hidden', op: 0 }`); what the owner sees at rest is the collapsed face. Both sites are the chosen scene, so both render `live`; the probe was widened to read BOTH (`rest` = collapsed face after 3 s away from the dock; `open` = trigger after 2.5 s hovering it), a fresh document per scene (a hash-only navigation carried the previous read's collapse morph into the next — measured as 400/400 in-box + 624 ring pixels on every scene after the first; not a defect of the icons).
4. **Design (the grant, at the bytes).** One seam per scene = `demo/scenes/<s>/<S>Mini.vue` (the rendition) + the scene's own data lifted to a light module read by BOTH the scene composable and the miniature, so the icon moves by the very data the stage plays:
   - **cube** — `cubeMotion.ts` (`CUBE_ANIMATION_NAMES` moved here; `cubeSpinKeyframes()` = the Rotations keyframes lifted verbatim from `useCubeDemo`). `CubeMini` builds the Rotations channel and `presets.hover` from the scene's STORED options for those channels (`getStoredAnimationOptions(name, CUBE_SCENE_ID)`), in an `AnimationGroup` with the scene's declared `singleTarget = false`; layers nest as the stage's (KF.W13U.w): `bob > pose > cube`, six `--face-n` crayon faces. The Matrix channel is the user's scene-local editor state (`useTransformState`), so the pose layer rests at identity (recorded, see residuals).
   - **amiga** — `useAmigaDemo()` itself (a light module: kfEngine + SpringProgress + the keys file) gains an optional `onPose` read at the end of its group transform; `AmigaMini` runs the scene's own group (Spin · Bouncing X · Bouncing Y) and paints the pose into an SVG at 0.9 px per world unit. Paint order: `grid` (`#b9b9c6`, the room grid's colour) < `shadow` (floor ellipse, shrinking with height) < `ball` (white + `--amiga-red` checker at the Boing tilt, shifted by the spin).
   - **square** — `squareMotion.ts` (`TOUR_PALETTE`, `SQUARE_TOUR_OPTIONS`, `squareTourKeyframes()` — fresh objects, because the scene re-seats corners in place on resize, D-8). `SquareMini` plays the tour through a mini paint function; layers `field` (the tour's own route) < `box`.
   - **easing** — `easingMotion.ts` (`EASING_PREVIEW_KEYFRAMES`, `EASING_PREVIEW_OPTIONS`, `EASING_DEFAULT_NAME` "ease", `EASING_DEFAULT_DURATION` 1500); `EasingMini` plays the preview sweep on a carriage whose width is the rail's travel; layers `curve` (`generateCurveSVGPath(namedEasing("ease"))`) < `rail` < `ball`.
   - **spring** — `SPRING_BASE` (+ `SETTLE`) moved into `springPresets.ts` beside `SPRING_PRESETS`; `SpringMini` runs one lane per preset under `springTimingFunction({response, dampingFraction})` over the library's own settle window (`response × 4`), PRM flag from `SPRING_BASE`; layers `lanes` < `balls`.
   - **sequence** — `sequenceMotion.ts` (`ROW_COUNT`, `ROW_DURATION`, `STAGGER_EACH`, `ROW_GLIDE`, `BallVars`, `sequenceRowKeyframes()`); `SequenceMini` builds the library `Sequence` of `ROW_COUNT` row glides at the `stagger` offsets, `repeat(Infinity).yoyo(true)` so the icon keeps telling the storyboard; layers `rails` < `travellers`.
   - **binding** — `scenes.ts` imports the six `*Mini.vue` as `CubeIcon…SequenceIcon` in place of the `?component` SVGs; `icon` stays the descriptor's one field (docblock updated). `ChromeDock` passes `live` at the two chosen sites; the scene-menu rows render the same component at rest. **Choice recorded for others: the chosen scene animates (collapsed face + trigger); every other rendering (the scene menu's rows) rests; no hover animation.**
   - **bounds** — each miniature's root is the 20 px `.dock-glyph` box with `overflow: hidden` + `contain: strict`; motion is authored at scene scale inside a scaled stage (cube ×0.1, square 20/360) or mapped at a stated px/unit, so the amplitude is small and paint cannot leave the box.
   - **PRM** — no demo-side media query: every miniature's engine object carries `respectReducedMotion` (cube: the stored defaults `true`; the groups default `true`; square/easing explicit `true`; spring `SPRING_BASE`; `Sequence` defaults `true`), so the engine's own gate snaps to rest.
   - consumer imports re-pointed with the moves (no re-export shims): `CubeScene.vue` + `test/demo/scenes/cube-scene.test.ts` → `cubeMotion`; `SequenceTarget.vue` + `sequence-scene.test.ts` + `sequence-instrument-truth.test.ts` → `sequenceMotion` (the two tests went RED at `vue-tsc -p tsconfig.test.json` on the first `check` — `TS2459 … declares 'ROW_COUNT' locally, but it is not exported` — and were re-pointed).
5. **Witness.** `test/demo/app/scene-icon-miniatures.test.ts` (8 cases): (1) every routable descriptor's `icon` IS its directory's `*Mini.vue` (identity), home none; (2) a mounted `ChromeDock` hands `live === true` to every rendering of the chosen scene's icon; (3) ×6 — each miniature, mounted `live: false`, calls no engine `play`; mounted `live: true`, calls `play` on exactly its scene's engine object (cube 1 group · amiga 1 group · square 1 keyframes · easing 1 keyframes · spring 4 keyframes · sequence 1 `Sequence`) and `stop` on unmount. ⟨`npx vitest run --project demo test/demo/app/scene-icon-miniatures.test.ts`⟩ → 1 file · 8/8. Born RED by construction at the pre-cure bytes (the `*Mini.vue` modules did not exist and the dock passed no `live`); not executed against them (no stash — the house rule).
6. **Commit.** kf **`6d5b4288`** (25 paths, +1085/−170 — 11 new: six `*Mini.vue`, four `*Motion.ts`, the witness; 14 modified), pushed ⟨`git push origin master`⟩ → `531aa3f1..6d5b4288  master -> master`. One commit (the binding, the seams and the re-pointed importers are one meaning; splitting them leaves a tree that does not typecheck).
7. **Gates (AFTER, on the committed bytes).** Probe `probe-icon.mjs` (two-site form), reports `evidence/W13U/d2/report-after-*.json`; per-report min..max read from the saved bytes with `node -e` over each JSON:

| gate | BEFORE ×2 | AFTER dev `:5173` ×2 | AFTER gh-pages ×2 (`npm run gh-pages` → `dist/gh-pages/`, static `:4187`) |
|---|---|---|---|
| chosen icon frame-diff > 0 across 1 s (6 scenes × {collapsed face, trigger}) | 0 on all six (static `svg`, 0 animations) | in-box changed px **17..257** · **32..252** | **22..246** · **30..271** |
| 0 px outside the icon box (6 px ring; a pixel counts outside only if its whole square misses the box) | 0 | **0 · 0** | **0 · 0** |
| bbox unchanged ±0.5 px across the 1 s | 0 | **0 · 0** (every box 20×20) | **0 · 0** |
| layers in the scene's order (`[data-layer]` paint order) | — (none) | cube `bob,pose,cube` · amiga **`grid,shadow,ball`** · square `field,box` · easing `curve,rail,ball` · spring `lanes,balls` · sequence `rails,travellers` — ×2, both sites | same ×2 |
| PRM context (`reducedMotion: 'reduce'`) → frame-diff 0 | — | **0 · 0** (all 12 reads each run) | **0 · 0** |
| visible at the read (visibility + opacity product) | trigger hidden at rest (step 3) | 12/12 true ×2 | 12/12 true ×2 |
| pageerrors | 0 | 0 · 0 | 0 · 0 |

   `document.getAnimations()` in the glyph stays 0 AFTER as BEFORE — the engine paints inline on its rAF lane, not through WAAPI — so the frame diff is the reading, as the gate words it. Load average beside the runs: 54.6 (before) · 38.9 / 29.0 (dev) · 73.2 (gh-pages). Frames: `icons-light-6x.png`, `icons-dark-6x.png` (the six collapsed-face icons, 6× DPR), `cube-icon-4-frames-6x.png` (the die turning in 3D, 400 ms apart).
   - ⟨`npm run check`⟩ → **exit 0** (vue-tsc `tsconfig.json` 0 · `tsconfig.test.json` 0 · `proof:structure` PASS, 0 violations R1–R6) — after the step-4 test re-point; the first run was exit 2 (the two `TS2459`s).
   - ⟨`npm run test:demo -- --no-file-parallelism`⟩ → **65/65 files · 515/515 tests** (BEFORE 64/64 · 507/507 at `.t2`; +1 file, +8 tests = the witness).
   - ⟨`npx eslint <the 20 touched demo files>`⟩ → no findings. ⟨`npm run gh-pages`⟩ → built, exit 0; its one `INEFFECTIVE_DYNAMIC_IMPORT` names `CubeScene.vue` (statically imported by `App.vue:174`), not a module this unit added.
8. **Residuals.**
   - `R-d2-1` (recorded, not a gate): the cube miniature does not drive the Matrix channel. Its keyframes are the user's editor matrices, built by the scene-local `useTransformState`, so the miniature's `pose` layer rests at identity; bringing them in means lifting that state out of `CubeScene` — outside this seam and outside the owner's ask. Owner: KF.W13V `.k` if the owner wants it.
   - `R-d2-2`: the miniatures are built once per mount, from the scene's data at that moment. A later edit in the controls pane (duration, easing) reaches the icon at the next mount (a scene switch), not live.
   - `R-d2-3`: the old `assets/icons/{cube,amiga,square,easing,spring,sequence}.svg` now have no importer. `assets/**` is outside this unit's set, so they stay; their deletion belongs to whoever owns `assets/`.
9. **Escalations.** None.
10. **Self-count.** Acts 1–10; kf commits 1 (`6d5b4288`, pushed) + this record commit (record + LEDGER line + `evidence/W13U/d2/**`: 1 probe, 10 reports; the 3 PNGs sit on disk beside them, untracked by the repo's `.gitignore:34` `*.png` rule, as every prior unit's frames); gates 5 of 5 GREEN (frame-diff · layer order · bbox/outside · PRM · vue-tsc/test:demo/push).


#### KF.W13U.d3 — ESC-d-1: the scene-switch dock / pane change-once gate (SERVED MODEL: claude-opus-5-5)

Spec: `KF-W13.md` sixth addendum `.d3` (`:360`) · COHESION §0br (the grant: `App.vue` script `:266-276` + `demo/state/controlSurfaces.ts` + `test/demo/**`) · Repair 1 record (`:351-399`). COHESION read §0br → EOF (`:3057-3068`); §0bs (the glass repin) does not touch `.d3`.

1. **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` only (in no writable set; untouched). value.js dirty = `PaletteInspector.vue` · `PaletteSpecimen.vue` · `CARRY-LEDGER.md` · `X-W7.md` · `o10d-display-voice-census.spec.ts` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` (sibling seats'; untouched). **0 inherited paths.** kf HEAD `6d5b4288` (= `.d2`) = origin.
2. **Anchors at the true bytes.** The spec's `App.vue:266-276` was the surface derivation at `62ecc324`; at `6d5b4288` the feed block is `:254-294` (the derivation comment `:254-268`, `derivedSurfaces` `:269-276`, Repair 1's `sceneBoundToCurrent` hold + `watchEffect` feed `:277-294`). INTENT = the machine's surface feed; applied there. `controlSurfaces.ts` `surfacesFor` `:95-120` (pure; `undefined` facility → `[]`), `selectedSurfaceFrom` `:204-213` (pick not a member → the set's first surface).
3. **Probe (the seat-0 brief's extension).** `evidence/W13U/d3/probe-switch10.mjs` (from `repair1/probe-switch.mjs`): 1440×900, headed Chromium (`--ignore-gpu-blocklist`), hover-expand then the dock Scene select through **10 switches** `cube>amiga>square>spring>easing>cube>spring>amiga>easing>square>cube`; a rAF sampler records, EVERY frame from 500 ms before the pick to 2.5 s after: the dock width; the dock's `Controls tab` / `Controls panel` affordances; the Controls-tab trigger label (the selected surface); the Scene trigger label; the VISIBLE controls pane's ACTIVE `[role=tabpanel]` (the hidden per-channel instances and the warm-gated inactive Monaco cache excluded — they are not the surface set). Per switch: **width changes** (the per-frame series collapsed into plateaus of ≥3 frames within 0.5 px; a change = a move between successive distinct plateaus; reversals = sign flips of >1 px steps) · **surface-set changes** (distinct runs of the dock-affordance + selected-label + pane-panel signature, minus 1) · **empty-surface frames** (neither Controls affordance in the dock on a non-home scene). Scene facet panels (Physics, Curve) are slotted scene content, not a `tabpanel`, so the pane column reads empty on spring/easing at rest — a steady state, not a blink.
4. **BEFORE ×2 dev + gh-pages ×2 (read before any edit; the bytes = kf `6d5b4288`).** ⟨`node probe-switch10.mjs http://localhost:5173/ before-dev{1,2}`⟩ (load 33.7 · 78.2) and, on a fresh ⟨`npm run gh-pages`⟩ (exit 0) served static on `:4189`, ⟨`node probe-switch10.mjs http://localhost:4189/ before-gh{1,2}`⟩ (load 100.7 · 55.8). Figures read back from the saved `report-before-*.json` with `node -e` (per switch, in route order):

| limb | dev1 | dev2 | gh1 | gh2 | reading |
|---|---|---|---|---|---|
| frames sampled per switch | 354..375 | 349..374 | 360..375 | 358..376 | — |
| **empty-surface frames** (sum of 10) | **0** | **0** | **0** | **0** | **GREEN** — Repair 1 `60477b06`'s hold stands (R.2 GREEN-before-cure) |
| dock width changes | `1122111111` | `1122111111` | `1112111111` | `1111111111` | **RED** dev ×2 (square>spring, spring>easing = 2) |
| width reversals | `0001000000` | `0001000000` | `0001000000` | `0001000000` | **RED** ×4 (spring>easing: 401.5 → 413.1 → 386.6 px) |
| surface-set changes | `2222111110` | `2222111110` | `2222111110` | `2222111110` | **RED** ×4 on the four first visits |
| Controls-tab label changes | `0012111110` | `0012111110` | `0012111110` | `0012111110` | spring>easing `Physics → Controls → Curve` ×4 |
| pane active-panel blank (frames) | `9,8,0…` | `9,8,0…` | `9,2,0…` | `8,3,0…` | **RED** cube>amiga, amiga>square |
| pageerrors | 0 | 0 | 0 | 0 | — |

   The RED limbs occur only on a scene's FIRST visit (the destination's async chunk: the keyed `<Suspense>` is pending 2–9 frames); every warm revisit changes once, in the pick's own frame (e.g. cube>spring: Scene label, Controls label and pane all at frame 68/70, one width change).
5. **Cause at the bytes (why the limbs are RED although the machine is never fed `[]`).** During the pending window the machine rightly HOLDS the source scene's surface set (Repair 1), but three other reads switch to the destination at the route, before the swap resolves:
   - **(a) the dock's selected surface** — `App.vue:309-315` `dockSelectedControl = machine.selectedControlSurface(storedControls.selectedControl)`, where `storedControls` (`:250`) is keyed by the ROUTE's `currentSuperKey`: the destination's stored pick (`easing`) is projected against the held source set (spring's), is not a member, and `selectedSurfaceFrom` falls back to the set's first surface — the dock shows `Controls` for 2–6 frames (dev 6 · 6, gh-pages 3 · 2), then `Curve` at resolve (the reversal).
   - **(b) the controls pane** — `App.vue:38-41` hands `EditorShell` `:channels="currentChannels"` (`:248`, `sceneRef.facility.channels` → `undefined` while pending) with the route's `:super-key`, and `#tabs-content` (`:63-65`) renders `sceneRef.tabsContent`: the pane's per-channel instances unmount and the active panel is absent for 2–9 frames, then remount.
   - **(c) the Scene trigger label** is route-bound (ChromeDock's scene select), so it changes at the pick while the Controls label changes at resolve: two width steps on square>spring even with (a) cured.
   None of the three lies in `.d3`'s grant: (a) and (b) are `App.vue` script `:248-250` / `:309-315` and template `:38-65` — outside "script `:266-276` region only" (its intent at the true bytes is the feed block `:254-294`, which already holds); (c) is `demo/app/dock/ChromeDock.vue` (`.d2`'s row, closed). `controlSurfaces.ts` is pure (`surfacesFor`, `selectedSurfaceFrom`) and already publishes nothing during pending — nothing in it causes any RED limb; bending `selectedSurfaceFrom`'s documented member-fallback, or re-introducing a static per-scene surface table (the T.B2 inversion killed it) so the destination set is known pre-mount, would be the workaround the law forbids.
6. **Disposition — ESCALATED, 0 product bytes.** The spec's cure ("the scene machine is not fed `surfacesFor(undefined)` while a non-home scene is pending") is ALREADY at the bytes (Repair 1 `60477b06`; 0 empty-surface frames ×4 above) — no `.d3` byte is owed for it, and none was written. The gate's other limbs (width once, surface set once) are RED ×4 at causes outside the grant (step 5); substituting a cure inside the grant would be improvisation (METHOD: "do NOT substitute"). **ESC-d3-1** (to the orchestrator; the §0bk grant idiom): the change-once gate needs a grant covering `App.vue` script `:248-250` + `:309-315` and template `:38-65` so that EVERY scene-derived read the dock and the pane take (selected pick, channels, tabs-content, and the super-key the pane keys on) is held on the scene `sceneRef` is bound to — the same `sceneBoundToCurrent` predicate the feed uses — and flips together at resolve; plus a ruling on the Scene trigger label (`ChromeDock.vue`): either it too flips at resolve (one width step) or the gate is re-worded to "the Controls zone changes once" (the pick's own label change being the owner's act). Alternative root the grant may prefer: warm the destination chunk before the pick (`@warm-scene` → `warmScene` already exists; the probe's 500 ms menu dwell did not suffice), which removes the pending window itself.
7. **Witness.** None landed: the invariant the spec names ("not fed `[]` while pending") is GREEN at the bytes, and a witness for the RED limbs would pin behaviour this seat may not cure. (Repair 1 landed no witness either; recorded for the grant unit.)
8. **Gates.** Served-page gate (10 switches, headed, dev ×2 + gh-pages ×2): **empty-surface frames 0 ×4 GREEN**; **width once RED** (dev ×2, gh1; reversal ×4); **surface set once RED ×4**. vue-tsc / test:demo: no product byte → the banked `.d2` readings at `6d5b4288` stand (⟨`npm run check`⟩ exit 0, vue-tsc 0 · 0; ⟨`npm run test:demo -- --no-file-parallelism`⟩ 65/65 · 515/515); kf HEAD unmoved (⟨`git -C keyframes.js log --oneline -1`⟩ → `6d5b4288`).
9. **Residuals.** `R-d3-1` = ESC-d3-1 (above). The pane-signature blind spot (slotted facet panels are not `tabpanel`s) is a probe limit, stated; the facet panels' own blink on a first visit is part of cause (b).
10. **Self-count.** Acts 1–10; kf commits 0; record commit 1 (this receipt + LEDGER line + `evidence/W13U/d3/`: 1 probe, 4 reports); gates: 1 limb GREEN ×4, 2 limbs RED, vue-tsc/test:demo banked (unmoved bytes).

#### KF.W13U.d4 — ESC-d-3: keyboard reach of the @mbabb menu's Share row (SERVED MODEL: claude-opus-5-5)

Spec: `KF-W13.md` sixth addendum `.d4` (`:361`, ESC-d-3) + fourth addendum OA-33 (`:334`, "keyboard reachable") · COHESION §0br (the grant: `SharePopover.vue` exposes its open model + `MbabbMenu.vue`; the theme row is producer-owned, `DARK-MENU-ITEM`, O-61 R-3) · lock EH-4 (never a second `useGlobalDark` actuation). COHESION read §0br → EOF (`:3057-3068`); §0bs (the glass repin) does not reach this unit's bytes.

1. **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` only (in no writable set; untouched). value.js dirty = `CARRY-LEDGER.md` · `scripts/dev/dev.sh` · `docs/tranches/X/audit/` · `chassis/ui-audit.js` (sibling seats'; untouched). **0 inherited paths.** kf HEAD `6d5b4288` (= `.d2`; `.d3` landed 0 kf bytes).
2. **BEFORE ×2 (served dev `:5173`, headed Chromium, load 64.4).** ⟨`node evidence/W13U/d/probe-kbd.mjs http://localhost:5173/`⟩ ×2 → `{"enterOnDarkRowFlips":false,"afterTab":"Dark modeLight or dark theme","enterOnShareRowOpens":0}` · same. Pointer path measured the same session (scratch probe): press the nested `Share animation` trigger → Share URL field 1, focus on the field, Escape → focus `Share animation`, Escape → `@mbabb menu` (the menu stays open under the popover).
3. **Anchors at the true bytes.** `MbabbMenu.vue:45` Share row `@select.prevent` with no handler; `:46` `<SharePopover>` nested in the glyph column — its trigger is the row's only command and is not a roving-focus stop. `SharePopover.vue` binds `<Popover v-model:open="sharePopoverOpen">` where `sharePopoverOpen` is OWNED by `useShareState.ts:15` (it writes `false` after a copy `:32/:36` and after a successful load `:76`); `useShareState.ts` is outside the grant.
4. **Theme row — the installed-glass check.** ⟨`grep '"version"' node_modules/@mkbabb/glass-ui/package.json`⟩ → `7.0.0`; ⟨`cat dist/components/dark-mode-toggle/index.d.ts`⟩ → exports `DarkModeToggle` + `DarkModeToggleProps`/`DarkModeToggleSize` only; props `size`, `disableTransitions`; no `asChild`, no expose, no item form; ⟨`grep -rhoE '(Dark|Theme)[A-Za-z]*' dist/components/dropdown-menu/*.d.ts dist/dropdown-menu.d.ts dist/index.d.ts`⟩ → none; the package `exports` map carries `./dark-mode-toggle` alone. **No menu-item form is installed → `DARK-MENU-ITEM` honest-RED (O-61 R-3)**; the row stays layout-only (a row-level `useGlobalDark` or a forwarded `.click()` would be the second actuation EH-4 rules out). Its comment now names the id.
5. **The cure (INTENT at the true bytes, recorded).** The seat-0 brief suggested `defineModel("open")`; at the bytes the open state already has an owner (`useShareState`), so a `defineModel` would be a SECOND state kept in step by watchers (a false→false close write is invisible to a watch). The popover's model is therefore **exposed from its owner**: `SharePopover.vue` `defineExpose({ open: sharePopoverOpen })` (the spec's words: "expose its open model"). `MbabbMenu.vue`: `useTemplateRef<InstanceType<typeof SharePopover>>("sharePopover")` + `openShare()` sets `open = true`; the row is `@select.prevent="openShare"` — the menu stays open exactly as under a pointer press, the popover anchors to its trigger in the row and its existing `@open-auto-focus` (SP-20) hands focus to the field.
   - **Measured regression, cured before commit.** The first form let the nested trigger's click bubble into the row's select: a second pointer press toggled the popover closed and the select re-opened it (scratch probe `rePressCloses:false`). Cure at the host: the glyph slot `<span … @click.stop>` keeps the trigger's click with the trigger (it already toggles itself); re-measured `rePressCloses:true`.
6. **Witness.** `test/demo/app/mbabb-menu-share-keyboard.test.ts` (2 cases; real `MbabbMenu` as slot content of a real `GlassDock`, as `mbabb-menu-self-hold.test.ts`): (1) keydown Enter on the focused Share row → the Share URL field renders and takes focus, the menu stays open; (2) pointer parity — the nested trigger opens Share and a second press closes it. **Born RED**: with the two product files swapped back to `HEAD` bytes (from a scratch copy, then restored) ⟨`npx vitest run --project demo test/demo/app/mbabb-menu-share-keyboard.test.ts`⟩ → `1 failed | 1 passed` (case 1 ×); on the cure → `2 passed`.
7. **Commit.** kf **`9aa93cae`** (3 paths, +168/−4: `SharePopover.vue` · `MbabbMenu.vue` · the witness), pathspec commit; ⟨`git push origin master`⟩ → `6d5b4288..9aa93cae  master -> master`. One meaning, one commit (the exposed model, its one consumer, the witness).
8. **Gates (AFTER, on the committed bytes `9aa93cae`).** Served dev `:5173` headed ×2 and gh-pages (⟨`npm run gh-pages`⟩ exit 0 → `dist/gh-pages/`, static `:4191`) ×2. The gate's own probe `d/probe-kbd.mjs` (unchanged, E-3) plus the extension `d4/probe-kbd-esc.mjs` (Enter via ArrowDown-free roving: the row focused on open, Enter; the Escape chain read until `@mbabb menu`; the pointer path's open + re-press), reports `d4/report-{dev1,dev2,gh1,gh2}.json`:

| gate | BEFORE ×2 | AFTER dev ×2 (load 53.7 · 55.8; d4 31.8 · —) | AFTER gh-pages ×2 (load 42.4 · 39.7) |
|---|---|---|---|
| `enterOnShareRowOpens` (`d/probe-kbd.mjs`) | **0 · 0** | **1 · 1** | **1 · 1** |
| focus after Enter (d4) | — | `Share URL or hash to load` ×2 | same ×2 |
| Escape returns focus to `@mbabb menu` (d4 `escapeChain`) | — (never opened) | `["Share animation","@mbabb menu"]` ×2 — popover, then menu (the pointer path's own chain) | same ×2 |
| menus/popovers left open after the chain | — | 0 · 0 | 0 · 0 |
| pointer: trigger opens · re-press closes | opens 1 | 1 · `true` ×2 | 1 · `true` ×2 |
| `enterOnDarkRowFlips` | false · false | **false · false — honest-RED `DARK-MENU-ITEM`** (act 4) | false · false |
| pageerrors | — | 0 · 0 | 0 · 0 |

   - ⟨`npm run check`⟩ → **exit 0** (vue-tsc `tsconfig.json` **0** · `tsconfig.test.json` **0** · `proof:structure` PASS).
   - ⟨`npm run test:demo -- --no-file-parallelism`⟩ → **66/66 files · 517/517 tests** (BEFORE 65/65 · 515/515 at `.d2`; +1 file, +2 tests = the witness).
   - ⟨`npx eslint MbabbMenu.vue SharePopover.vue mbabb-menu-share-keyboard.test.ts`⟩ → exit 0, no findings.
9. **Residuals.** `DARK-MENU-ITEM` (O-61 R-3, producer; the theme row stays keyboard-inert until glass ships a `DarkModeToggle` menu-item form — KF.W13R's 10.0.1 repin re-reads it). `R-d4-1` (recorded, not a gate): after Escape from the popover, focus rests on the nested `Share animation` button inside the row, not on the row itself; one more Escape closes the menu to `@mbabb menu`. That is also the pointer path's chain, so it is kept for parity.
10. **Escalations.** None.
11. **Self-count.** Acts 1–11; kf commits 1 (`9aa93cae`, pushed); record commit 1 (this receipt + LEDGER line + `evidence/W13U/d4/`: 1 probe, 4 reports); gates: Share-row GREEN ×4 reads, Escape→`@mbabb menu` GREEN ×4, theme row honest-RED `DARK-MENU-ITEM`, vue-tsc 0·0, test:demo GREEN.

#### KF.W13U.x — ESC-R2-2: the kf e2e close clause (SERVED MODEL: claude-opus-5-5)

Spec `KF-W13.md` sixth addendum `.x` (`:362`) + the instrument condition; COHESION §0br; record Close `:251-272` (RES-close-1/-2) and Repair 1 Check-1 #4 (`:384-386`). Writable set: `scripts/observe/demo/{subject-animates,live-session}.mjs` · `EditorStartScreen.vue` · the demo cause-owner of S4/S5/M1 · `test/demo/**` · this record · `evidence/W13U/**` · LEDGER (own cells).

1. **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*.md` only. value.js dirty paths are all outside this set (sibling seats' work plus `dev.sh`). **0 inherited paths.**
2. **Baseline (BEFORE).** ⟨`npm run gh-pages`⟩ exit 0 at kf `9aa93cae`. Then ⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness -- --workers=1`⟩ → **passed 3/6** · ✗ usability · live-session (`S5` spring `only 1 distinct spring-ball positions`; `S4` `ringPainted:false, enterToggled:false, spaceToggled:false`) · live-session-mobile (`M1 sheet SCROLL … scrollTop=0; 765px content in a 704px body`). subject-animates PASSED on this read, but its corroborator read `0 distinct transforms` (the race Check-1 #4 named). ⟨`uptime`⟩ load 26.00 at start → 47.09 at end. Banked 2/6 at `60477b06` (Repair 1).
3. **Cause derivation.** Read-only probes, recorded in `evidence/W13U/x/causes.md` with `p-cube.mjs`, `p-ring3.mjs` and `p-m1.mjs`:
   - usability → the demo (`EditorStartScreen.vue`, KF-EST-3's inlined literal).
   - subject-animates + S4 Enter/Space → the oracles' boot-at-rest premise, which `.w`'s autoplay overturned.
   - S5 → the oracle's `style.left` read, stale since T.G4 `562ced31` moved the painter to `transform`.
   - **S4 `ringPainted` → producer.** In glass 7.0.0, `.button[data-emphasis="quiet"]{box-shadow:none}` beats `.focus-ring:focus-visible{box-shadow:var(--focus-ring-shadow)}` at equal specificity. `p-ring3` shows quiet/text → `none`, primary/secondary/tertiary/unset → the ring.
   - **M1 → producer.** glass 7.0.0's snap Drawer is a full-height sheet translated to the detent. At the 0.36 maximum detent, `.controls-pane` spans y 524–1228 on an 844 px viewport. The oracle's swipe at the pane centre (y 876) lands off-screen. At a visible point the pane scrolls its full 61 px (`p-m1`), but about 384 px of it never enter the viewport.
4. **usability cure** — kf **`c1ce06e8`**: the hero title is declared once as `const hero = { title: "Select an animation" }`. The template renders `hero.title`, and (2c)'s declared-title read finds it. No prop is reintroduced, and the rendered bytes are unchanged.
5. **subject-animates re-seat** — kf **`68c80e79`**. The property is kept: from rest, Play advances the playhead and the frame reaches the real subject.
   - Rest is now established: the autoplay is paused, the playhead holds, and every engine-written node holds one transform.
   - The subject is read on `.cube-bob > .cube-pose > .cube`, replacing the `.graph > div` corroborator that read 0.
   - To pass, the playhead must leave rest, move again, and one node must show ≥ 3 distinct transforms.
6. **live-session S4 re-seat** — kf **`d2bc0f76`**. Each Enter must flip the focused face (Play ↔ Pause). Liveness is read on the Enter that lands on playing. The walk parks play OFF before the unchanged global-Space clause. The rest paint accepts either face. The ring clause is untouched.
7. **live-session S5 re-seat** — kf **`3b1dbd8f`**: the churn reads the balls' inline `transform` inside `.spring-rail`. The ≥ 3 threshold and the scrub gesture are unchanged. **No product byte.** kf pushed: ⟨`git push origin master`⟩ → `9aa93cae..3b1dbd8f`.
8. **Gates (AFTER)** — ⟨`npm run gh-pages`⟩ exit 0 at the cured bytes, then the roster at `--workers=1` ×2 with the load beside each run:
   | run | load at start → end (⟨`uptime`⟩ 1-min) | reading |
   |---|---|---|
   | 1 | 72.10 → 24.36 | **passed 4/6** · ✗ live-session (S4 `ringPainted:false` only; `enterToggled:true, enterLive:153, spaceToggled:true`; S5 PASS `sceneFails []`) · ✗ live-session-mobile (M1 SCROLL only) |
   | 2 | 23.13 → 17.64 | **passed 4/6** · the same two limbs (`enterLive:157`) · usability PASS · subject-animates PASS (`rest {1,1,1} → playing {bob 40, pose 1, spin 40}`) |
   Neither remaining red is the load family: both are deterministic assertion reds with no timeout.
   - ⟨`npx vue-tsc --noEmit -p tsconfig.json`⟩ / ⟨`… tsconfig.test.json`⟩ → **0 · 0**, run twice.
   - ⟨`npm run test:demo`⟩ → **66/66 files · 517/517 tests**.
   Gate figure: `demo:correctness` **3/6 (this seat's baseline; banked 2/6) → 4/6 ×2**. **6/6 is NOT reached.**
9. **Escalations (returned; the lock says a cause outside `demo/**` → ESCALATE, and no masking was spent):**
   - **ESC-x-1 `QUIET-FOCUS-RING`** (S4 `ringPainted`) — a producer defect in glass 7.0.0 `components/button`: the quiet/text emphasis subtraction erases the `.focus-ring` box-shadow ring on every quiet Button. It is cured in the producer's own bytes at `v10.0.1:src/styles/utilities/base.css:144`, where the ring is an `outline`. **Owner: KF.W13R `.v`** (re-read after the 10.0.1 repin). Relay to glass is not owed, since the defect is already cured at HEAD.
   - Rejected demo-side alternatives:
     - Re-declaring Play's emphasis to dodge the cascade: this is a copied-producer workaround, and it would bring in primary's capsule material.
     - A local `:focus-visible` rule: this is the `.btn-playback` copy that K-5 deleted.
   - **ESC-x-2 `DRAWER-DETENT-REACH`** (M1) — a producer defect in glass 7.0.0's snap Drawer: it is a full-height sheet translated to the detent, so at the demo's 0.36 maximum detent about 384 px of the body are below the viewport at every scroll position. glass `336dacf9` (W-DIALOG-DETENT, "the detent is a size") is an ancestor of `v10.0.1` and replaces the Drawer with the Sheet. **Owner: KF.W13R `.m`/`.v`** (the migration re-seats the controls sheet and re-reads M1).
   - Also rejected: moving the oracle's touch into the visible band. It would green M1 while the content stays unreachable, and `live-session-mobile.mjs` is outside this unit's set anyway.
10. **Residuals.** `R-x-1` (recorded, not a gate; `p-cube`): after **Reset animation** while paused, the playhead readout stays at its paused value (4841.6) until Play, which then resumes from about 0. Run 1 also read pause-at-4.6 → Play → 0. This is the seek/resume family (KFA-17). **Owner: KF.W13V `.k`.** Honest-RED ids carried unchanged: `DOCK-MORPH-ROOT` · `DOCK-SCROLL-MORPH` · `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM`.
11. **Self-count.** Acts 1–11. kf commits: 4 (`c1ce06e8` · `68c80e79` · `d2bc0f76` · `3b1dbd8f`, pushed). Record commit: 1 (this receipt, the LEDGER line, and `evidence/W13U/x/` with 1 table and 3 probes). Roster reads: 3 (1 baseline + 2 after), plus 4 vue-tsc reads and 1 test:demo read. Escalations: 2. Residuals: 1 new.

## Close 2 — WAVE CLOSE SEAT (RESUME 2, VERIFY-ONLY)

SERVED MODEL: claude-opus-5-5 · 2026-09-23 · Track B · 0 kf / glass / product bytes. The spec was read whole (`KF-W13.md`, including every KF.W13U / W13R / W13V addendum). From the record this seat read the header through `## Unit plan`, `## Check 3`, `## RESUME 2` through its Unit plan, and the `.d3` / `.d4` / `.x` receipts. E-3 applies: every byte above this heading stands, and this section is appended beside it.

- **Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the two untracked `VALUEJS-INBOUND-2026-07-{24,27}-*.md`. The value.js dirty paths (`demo/**` extract/EmptyState/styles, `CARRY-LEDGER.md`, `scripts/dev/dev.sh`, `docs/tranches/X/audit/`, `chassis/ui-audit.js`, `tsconfig.strictprobe.json`) all belong to sibling seats and none is in this seat's set. **0 inherited paths.**
- **Instrument.** Served dev `http://localhost:5173/` (HTTP 200) and a fresh ⟨`npm run gh-pages`⟩ (exit 0) served statically at `http://127.0.0.1:4195/`, both in headed Chromium with `--ignore-gpu-blocklist`. The banked probes were copied to this seat's scratch and run from there, so no byte lands in `evidence/`. ⟨`uptime`⟩ read a 1-min load of 10–35 across the sitting.

### Commit roster (act 1): ⟨`git show --stat`⟩ for each sha, checked against the unit's writable row in the Unit plan (RESUME 2)

kf `60477b06..3b1dbd8f`: 7 shas, ⟨`git rev-parse --short HEAD` / `origin/master`⟩ → `3b1dbd8f` / `3b1dbd8f`, and ⟨`git diff --check <sha>~1 <sha>`⟩ is clean ×7.

| unit | sha | paths (⟨`git show --stat`⟩) | against the row |
|---|---|---|---|
| `.t2` | kf `531aa3f1` | `PlaybackRibbon.vue` · `ChannelOptions.vue` · `EasingScene.vue` · `SpringScene.vue` · `playback-ribbon-contract.test.ts` (5 files, +11/−27) | in bounds; ONE commit (declaration + 3 mounts + test), family unsplit |
| `.d2` | kf `6d5b4288` | `ChromeDock.vue` · `scenes.ts` · 6 × `demo/scenes/<s>/<S>Mini.vue` · 5 motion modules (`cubeMotion.ts`, `squareMotion.ts`, `easingMotion.ts`, `sequenceMotion.ts`, `springPresets.ts`) · 7 scene files re-pointed (`use{Amiga,Cube,Easing,Sequence,Spring,Square}Demo.ts`, `CubeScene.vue`, `SequenceTarget.vue`) · 4 tests (25 files, +1085/−170) | in bounds (every path is under `demo/scenes/*/`, `scenes.ts`, `ChromeDock.vue` or `test/demo/**`). **Scope note:** the grant reads "a mini-rendition seam in each `demo/scenes/*/`". The data extraction into shared motion modules and the re-pointed scene composables go beyond one seam file per scene, but they stay inside the granted directories and the receipt declares them. They are recorded here, not charged as landed-wrong. |
| `.d3` | — (0 kf bytes) | — | ESCALATED (ESC-d3-1) |
| `.d4` | kf `9aa93cae` | `MbabbMenu.vue` · `SharePopover.vue` · `mbabb-menu-share-keyboard.test.ts` (3 files) | in bounds |
| `.x` | kf `c1ce06e8` | `EditorStartScreen.vue` (1 file) | in bounds (the usability cause owner) |
| `.x` | kf `68c80e79` | `scripts/observe/demo/subject-animates.mjs` | in bounds |
| `.x` | kf `d2bc0f76` · `3b1dbd8f` | `scripts/observe/demo/live-session.mjs` | in bounds (S4 and S5 are separate meanings, one sha each) |

value.js receipts: `d5b8ed76` (`.t2`, record only) · `4e6e1942` + `7e12c674` (`.d2`: record, LEDGER line, `evidence/W13U/d2/**`) · `7bc63234` (`.d3`: record, LEDGER line, `evidence/W13U/d3/**`) · `c061b112` (`.d4`: record, LEDGER line, `evidence/W13U/d4/**`) · `24cb8523` (`.x`: record, LEDGER line, `evidence/W13U/x/**`). All are in bounds. ⟨`git log --format=%h d5b8ed76~1..HEAD -- scripts/dev/dev.sh | wc -l`⟩ → `0`. **Landed-wrong: 0.**

### Gate table (act 2): BEFORE (RESUME 2 SEAT 0) → AFTER (this seat, at kf `3b1dbd8f`)

| gate | BEFORE | AFTER, this seat (dev · gh-pages) | reading |
|---|---|---|---|
| `.t2`: ⟨`grep -rn isAnimStarted demo test \| wc -l`⟩ | 9 | **0 · 0** | **GREEN** |
| `npm run check` (vue-tsc `tsconfig.json` · `tsconfig.test.json` · `proof:structure`) | banked exit 0 | **exit 0 ×2** (`error TS` count 0 · 0; `proof:structure` PASS) | **GREEN** |
| vitest: ⟨`npm run test:demo -- --no-file-parallelism`⟩ | 64/64 · 507/507 (`.t2` open) | **66/66 files · 517/517 tests ×2** | **GREEN** |
| vitest: ⟨`npx vitest run`⟩ (all projects) | — | **181 passed + 5 skipped files · 1779 passed + 2 expected-fail + 14 skipped tests ×2** (load 30 · 34) | **GREEN** |
| eslint (⟨`npx eslint demo/app demo/components/instrument/transport demo/components/playback demo/scenes demo/components/instrument/shell` + the two oracles + `test/demo/app`⟩) | — | exit 0 ×2 | **GREEN** |
| kf e2e ⟨`KF_PLAYWRIGHT_DIR=<value.js> npm run demo:correctness -- --workers=1`⟩ on a fresh gh-pages build | 2/6 banked (Repair 1) · 3/6 (`.x` open) | **3/6** (load 34→19; this run was concurrent with this seat's probes) · **4/6** (load 19→10) · **4/6** (load 75→30). Every run fails ✗ live-session (S4 `ringPainted:false` only; `enterToggled:true`, `spaceToggled:true`, S5 PASS) and ✗ live-session-mobile (M1 SCROLL only). Run 1 also failed ✗ subject-animates `[real-cube]`: "playhead 0 → −1275 → −33.3 … nodes while playing {1,1,1}". That is an assertion, not a timeout, so it is not the §0br load family. Runs 2 and 3 read `[real-cube]` PASS. | **RED** (close clause "kf e2e GREEN"). The two standing reds are the escalated producer causes ESC-x-1 `QUIET-FOCUS-RING` and ESC-x-2 `DRAWER-DETENT-REACH` (both glass 7.0.0 → KF.W13R). The intermittent `[real-cube]` is **R-close-2**. |
| G-KFW13U-w (⟨`w/probe-w1.mjs`⟩) | GREEN (Check 3) | dev ×2: rest `rotateX(273.1°) → (347.9°)` across 1 s, `autoPlaying:true`; gh ×2: `(250.0°) → (338.1°)` · `(251.8°) → (338.9°)`, paused frozen `342.206 = 342.206` · `342.972 = 342.972` | **GREEN** |
| G-KFW13U-t boot limb (⟨`t/probe-t1.mjs`⟩) | GREEN | cube / square / amiga `dis:false`, `rootOp 1`, `greyAncestor:false`; dev ×3 · gh ×2 | **GREEN** |
| G-KFW13U-t drag limb (the same unchanged probe) | GREEN at `60477b06` (Check 3: `2300 → 3800`) | **RED on the banked probe**: dev ×3 and gh ×2 read `mid 5000 · late 5000 · afterUp 5000`, cube `rotateX(360deg)` throughout, with the autoplay paused at 4615–4883 ms of 5000. A scratch variant differs by one step, a 150 ms settle between `mouse.down()` and the first move: it reads `down 950 → mid 2300 → late 3800 → up 3800`, cube `26.5° → 155.3° → 317.2°`, dev ×2 and gh ×2. A second variant with no settle read `4866 → 4800` in one run and `→ 950` in the other. | **RED on its own instrument.** A press followed immediately by a drag lands the scrub at the end when the paused playhead sits near its end. It reads GREEN once one settle interval separates press and drag. This is **R-close-1**. The seat bisected no sha. `.t2`'s ribbon diff is declarations and comments only (read). |
| G-KFW13U-e (⟨`e/probe-e1.mjs`⟩) | GREEN | dev ×2 and gh ×2: trigger `ease-in-out` + `curve-glyph` (truth 5e-4); rows 29 / 29 withPath / 29 distinct; named 27/27; descSeparated 29; accName 29; after-pick `ease-out-back`; pageerrors 0 | **GREEN** |
| G-KFW13U-d, text pixel-sharp at rest after a morph (⟨`d/probe-sharp.mjs`⟩, unchanged) | GREEN (0 px, maxΔ 0) | banked probe dev ×4 and gh ×3: **diffPx 304–970, maxΔ 204**. The sharpness gradient after the morph is ≥ the gradient without it on every read (5.972–6.002 vs 5.939–5.952), so the text is not blurred. A scratch variant masks the dock layer's glyph boxes (`svg`, `[data-layer]`; 7 boxes): dev **0 px, maxΔ 0 ×2**. gh read 0 px maxΔ 3 · 12 px · 0 px, plus one `sizeMismatch` (layer 766 vs 752 px wide between contexts). | **GREEN on sharpness. The pixel-exact limb's instrument is confounded by `.d2`**: the living icons animate under `no-preference` and rest under `reduce`, the probe's no-morph reference context. Every differing pixel lies inside the glyph boxes. This is **R-close-3** (re-seat the probe to mask living glyphs). The sporadic 12 px and the 14 px layer-width mismatch are recorded under it. |
| G-KFW13U-d, two animation owners per property | honest-RED `DOCK-MORPH-ROOT` (O-56) | not re-run (0 dock-morph bytes since Check 3; `.d2`'s ChromeDock diff adds only the `live` attribute) | **HONEST-RED** (the spec's own `.d` relief; owner glass BL → KF.W13R `.d`) |
| OA-32 (`.d2`, ⟨`d2/probe-icon.mjs`⟩) | frame-diff 0 (static) | chosen-icon frame-diff in-box, dev ×2: **23–257 px**; gh ×2: **22–227 px**; bboxΔ 0 on every box; 0 px outside the box; layers in stage order (`bob<pose<cube` · `grid<shadow<ball` · `field<box` · `curve<rail<ball` · `lanes<balls` · `rails<travellers`); pageerrors 0. PRM (`reduce`): gh ×2 → **0 on 24/24 reads**; dev: quiet ×2 → 0 on 24/24, while one read taken concurrently with e2e run 1 gave `sequence open` 435 (1 of 48 dev PRM reads) | **GREEN** (the dev PRM outlier did not reproduce in 2 quiet reads; recorded) |
| ESC-d-1 (`.d3`, ⟨`d3/probe-switch10.mjs`⟩, 10 switches, per frame) | empty 0 ×4 · width-once RED · surface-set-once RED | dev ×2 (a third run hit a probe click timeout before any read and was discarded): empty-surface **`0000000000` ×2**; width changes **`1122111111` ×2**; reversals **`0001000000` ×2** (spring>easing); surface-set changes **`2222111110` ×2**; pageerrors 0 | empty-surface **GREEN**; change-once **RED**, **ESCALATED ESC-d3-1** (causes at `App.vue` `:248-250` / `:309-315` / template `:38-65` and the ChromeDock Scene label, all outside `.d3`'s grant); gh not re-run (bytes unchanged since `.d3`'s ×4) |
| OA-33 keyboard (`.d4`, ⟨`d/probe-kbd.mjs`⟩ + ⟨`d4/probe-kbd-esc.mjs`⟩) | `enterOnShareRowOpens 0` | dev ×2 and gh ×2: **`enterOnShareRowOpens 1`**; focus → `Share URL or hash to load`; Escape chain `["Share animation","@mbabb menu"]`; menusAfter 0; pointer re-press closes; pageerrors 0 (one gh run timed out on hover before any read; re-run GREEN) · `enterOnDarkRowFlips false` ×4 | Share row **GREEN**; theme row **HONEST-RED `DARK-MENU-ITEM`** (O-61 R-3; installed glass 7.0.0 has no menu-item form) |

### Verification artefacts (act 3)

The artefacts are the kf commit roster above, with ⟨`git show --stat`⟩ per sha; the gate transcripts in the table above; and eslint and `git diff --check` clean. Per-unit evidence stays where each unit banked it (`evidence/W13U/{d2,d3,d4,x}/**`). This seat banked no new evidence file: its probe runs and the three scratch variants (`probe-t1x`, `probe-t1y`, `probe-sharp-y`) are in its scratch only, and their deltas from the banked probes are stated in the table.

### E13 (act 4)

A read-only sweep of the four paths against 13:00 (⟨`find … -newermt "2026-09-23 13:00:00"`⟩):
- value.js `V/` + `V/coordination/`: `INBOX.md` only.
- glass: the newest dir is `BL`. New there are `FORMATION-PROGRESS.md` (`6433284a`, D1 research, formation-internal), `audit/INBOUND.md` + `PROMPT-RECAP-SEED.md` (`fe5df357` = I-42, rowed), and `BK/coordination/valuejs-outbound-2026-09-23-kf-w13u-relay.md` (our own O-61 mirror). glass HEAD is `6433284a`.
- keyframes `V/coordination/`: none new.
- atlas `docs/tranches/P/coordination/`: the path is absent at this clock, so there are no letters.

**0 unrowed, 0 new UNREAD in scope.** The INBOX's latest sweep lines (13:5x / 14:4x / 15:0x) agree.

### Residuals (owners named)

- **R-close-1 (new, MEDIUM): scrub press-then-drag lands at the end.** The banked `t/probe-t1.mjs` drag limb read GREEN at `60477b06` (Check 3). At `3b1dbd8f` it reads 5000 ×5 when the paused playhead sits at ≥ 4.6 s of 5 s. It reads GREEN once a 150 ms settle separates press and drag. No sha is implicated: `.t2`'s ribbon diff is declaration and comment only, and `.d2`'s cube diff is a data move to `cubeMotion.ts`. The varying condition is where the autoplay was paused. **Owner: the orchestrator's next KF.W13U repair round** (writable: `demo/components/playback/**`), falling back to KF.W13V `.k` (the seek/resume family, KFA-17).
- **R-close-2 (new, MEDIUM): intermittent `subject-animates [real-cube]`.** 1 of 3 roster reads. The playhead ran negative (0 → −1275 → −33.3) after Play from an established rest, and the nodes held at {1,1,1}. It is an assertion, not a timeout. **Owner: KF.W13V `.k`** (KFA-17, beside R-x-1).
- **R-close-3 (new, LOW): `d/probe-sharp.mjs` confounded by OA-32.** The living glyphs differ between the motion and `reduce` contexts. The probe needs its glyph boxes masked, which this seat's scratch variant proves reads 0 px on dev ×2. The gh leg reads 0–12 px and one layer-width mismatch (766 / 752). **Owner: KF.W13R `.v`** (it re-reads the dock gates after the 10.0.1 repin).
- Carried unchanged, with their owners:
  - `R-d2-1` (the cube mini's pose layer rests at identity) → KF.W13V `.k`.
  - `R-d2-2` (the mini is built once per mount) → KF.W13V `.k`.
  - `R-d2-3` (`assets/icons/{cube,amiga,square,easing,spring,sequence}.svg` have no importer; `assets/**` was never granted) → KF.W13V `.u`.
  - `R-d4-1` (focus after Escape rests on the nested Share button, kept for parity with the pointer path) → recorded, no owner needed.
  - `R-x-1` (Reset-while-paused readout) → KF.W13V `.k`.
- Honest-RED ids:
  - `DOCK-MORPH-ROOT` (O-56) · `DOCK-SCROLL-MORPH` (O-55) → glass BL / KF.W13R `.d`.
  - `GLASS-SURFACE-PAINT-CONTAIN` · `KF-TIMELINE-FILL` · `DARK-MENU-ITEM` (O-61) → glass BL / KF.W13R `.v`.

### Escalations (returned to the orchestrator; this seat writes nothing outside its rows)

- **ESC-d3-1** (`.d3`): the gate that the dock width and the surface set each change ONCE per switch is RED on first visits. Its causes are the route-keyed reads at `App.vue` script `:248-250` / `:309-315` and template `:38-65`, plus ChromeDock's route-bound Scene label, and all of them lie outside the grant. It needs a grant covering those regions and a ruling on the Scene label. **Unrelieved.**
- **ESC-x-1 `QUIET-FOCUS-RING`** (S4 `ringPainted`) and **ESC-x-2 `DRAWER-DETENT-REACH`** (M1): both are glass 7.0.0 producer causes that the producer has already cured at v10.0.1, so they go to KF.W13R `.m` / `.v`. The close clause "kf e2e GREEN" cannot turn until the repin. KF.W13R opens only after KF.W13U CLOSED (spec `:367`), so the orchestrator must either relieve the clause by dated ruling, naming S4-ring and M1 with owner KF.W13R, or re-sequence the repin ahead of this wave's close.

### Four-verb line (spec §State: IMPLEMENTED stays NO until the gates green; this seat is not designated to stamp VERIFIED)

| verb | state |
|---|---|
| AUDITED | YES (unchanged) |
| SPECIFIED | YES (the KF.W13U addenda) |
| IMPLEMENTED | **PARTIAL**. `.t2`, `.d2` and `.d4` are GREEN; `.x` is 4/6 with 2 producer escalations; `.d3` is ESCALATED; the new R-close-1 is a RED drag limb on `.t`'s own probe. |
| VERIFIED | NO |

**Verdict: PARTIAL.** What remains is the kf e2e clause (S4 ring and M1, both producer, ESC-x-1/-2), ESC-d3-1's change-once limbs, and R-close-1's drag limb. Every other served-page gate reads GREEN on dev ×2 and gh-pages ×2, and `check`, vitest and eslint read GREEN ×2.

### Self-count

- kf shas audited: **7**. value.js receipt shas audited: **6**. Landed-wrong: **0**.
- Gates re-run: check ×2 · test:demo ×2 · vitest all ×2 · eslint ×2 · e2e ×3 · w ×6 · t ×5 (plus 4 settle-variant and 2 no-settle-variant runs) · e ×6 · sharp ×7 (plus 6 masked-variant runs and 4 variant runs whose mask matched no element) · icon ×4 (plus PRM ×6) · switch10 ×3 (1 discarded) · kbd ×4 (plus esc ×5, 1 discarded).
- New residuals: **3** (R-close-1..3). Escalations carried: **3** (ESC-d3-1 · ESC-x-1 · ESC-x-2).
- LEDGER: the KF.W13U status and commit cells were replaced in place, and one event line was appended.
- **LEDGER commit provenance (recorded, not repaired).** This seat's two LEDGER edits, the KF.W13U status and commit cells and the `CLOSE 2 (RESUME 2)` event line, were written to the shared working file. Before this seat could commit them, Track C's `cce4628c` (`docs(X·exec): F.W14 OPEN`, 15:17:03) committed the whole of `LEDGER.md` and so carried both edits. ⟨`git show HEAD:…/LEDGER.md | grep -c 'X.KF.W13U CLOSE 2 (RESUME 2)'`⟩ → `1`. The bytes are the ones this seat wrote. Nothing is rewritten, and no reset or amend is made to a sibling's sha. This record's commit carries the record alone.
