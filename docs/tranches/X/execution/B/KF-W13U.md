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
