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
