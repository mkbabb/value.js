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
