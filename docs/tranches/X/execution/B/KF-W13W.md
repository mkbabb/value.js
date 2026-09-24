SERVED MODEL: claude-opus-5-5

# X.KF.W13W — execution record (the tracking ball rides the curve + OA-57/58/61/64/66/68)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` — `## KF.W13W — the tracking ball rides the curve` (`:445-469`, COHESION §0co) · `## KF.W13W — ADDENDUM 2026-09-24 (COHESION §0cq)` (`:471-499`) · `## ADDENDUM 2026-09-24 — OA-66/OA-67 (COHESION §0cs)` (`:501-502`) · `## ADDENDUM 2026-09-24 — OA-68 (COHESION §0ct)` (`:504-505`). **Authority**: the owner, verbatim (2026-09-24): *"with all the easing curves and simulators, the tracking ball must be on the curve itself--mark and ecoute-moi"*; frame `keyframes/evidence/W13U/owner-2026-09-24-ball-on-curve.png` (and `owner-2026-09-24-easing-picker.png`, `audit/owner-2026-09-24-collapsed-dock.png`). **Rulings cited (never re-opened)**: §0co (OA-56, the wave minted) · §0cq (OA-57/58/61/64 join; OA-63 every glass half relayed — O-65 DOCK-COLLAPSED-FORM) · §0cr (O-65 registered) · §0cs (O-66 GLASS-SELECT-GREY, consumer call sites only) · §0ct (O-67 SIDE-DOCK-EDGE, consumer clip only) · §0cw (Track B order: KF.W13V → KF.W13W → KF.W13X) · §0bt (ADJACENT-LINE RULE) · §0j (begin-word; publish/push authorized). **Model**: Opus 5.5, every seat (spec line `:447`; owner 2026-09-23 Opus-only).

## Open

**Date**: 2026-09-24 (sitting of record 2026-09-17, the owner's begin-word, COHESION §0j). Seat 0, Track B, `claude-opus-5-5`.

**Mode**: FRESH OPEN — ⟨`grep -n "^| KF.W13W" LEDGER.md`⟩ → `QUEUED 2026-09-24 (after KF.W13V)`; ⟨`ls execution/B/ | grep W13W`⟩ → none. No unit commits exist.

**Crash-recovery sweep** — ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked value.js inbound mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-*`, `-2026-07-27-*`; standing, outside every writable set), **0 paths under `demo/**` or `test/demo/**`**. keyframes HEAD = origin/master = `a939e7d6` (KF.W13V `.s2`). value.js: 0 dirty paths under `execution/B/KF-W13W*` or `keyframes/evidence/W13W/**`; `scripts/dev/dev.sh` untouched.

**Preconditions ("Opens after: KF.W13V", `:447`)**:
- ⟨`grep -n "^| KF.W13V" LEDGER.md`⟩ → `:61` **CLOSED 2026-09-17 (honest-RED: TILE-PRIMITIVE · B7 SPECULAR-REST · SHEET-POSITION)** ⟵ RESUME 2 CHECK 1 CONFORMANT-HONEST-RED (event log `:777`). MET.
- The spec's named artefacts: the owner frames ⟨`ls keyframes/evidence/W13U/ | grep 2026-09-24`⟩ → `owner-2026-09-24-ball-on-curve.png` · `owner-2026-09-24-easing-picker.png` (both present). MET.
- Track B order §0cw: KF.W13V (`.s2` kf `a939e7d6` + close) → **KF.W13W** → KF.W13X. MET.

**E13 Step-0 mail sweep** — ⟨`ls -dt ../glass-ui/docs/tranches/*/ | head -2`⟩ → `BL/` newest, then `BK/` (BL has no `coordination/`; BK/coordination remains glass's mail path). ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ · V/coordination · glass BK/coordination · glass BL · keyframes V/coordination · atlas P/coordination → **1 file**: `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md` (glass's internal formation cursor, `2b72324a` "D2-B ADVANCE conditional…"; not a letter, not addressed to value.js). **0 unrowed addressed to value.js · 0 UNREAD in scope.** Sweep line appended to `INBOX.md`.

## Baseline

The spec authors no literal §Gates commands for KF.W13W; its gates are stated as laws (`:449-455`, `:467`, `:486`, `:489`, `:495`, `:497`). The BEFORE baseline banks (a) the repo gates every unit must hold, (b) one served-page reading of the headline site under the `.v` law, and (c) static census proxies for each unit. The full per-site served falsifier is `.c`'s act (it must read RED at these pre-cure bytes on every census site before `.b` lands).

| gate | command (read-only, keyframes `a939e7d6`) | run 1 | run 2 | verdict |
|---|---|---|---|---|
| repo: typecheck + structure | `npm run check` | EXIT 0 (vue-tsc ×2 + proof:structure PASS 0 violations) | EXIT 0 | GREEN (standing) |
| repo: demo unit tests | `npm run test:demo` | 77/77 files · 565/565 · EXIT 0 | run 2: 3 files / 2 tests FAILED + 4 skipped, EXIT 1 (timeouts under 4-track host load: `transport-icon-spin` hook 10 s, `hero-wave-pause` 5 s, `typing-dots-engine-seam` no inline opacity); run 3: 77/77 · 565/565 · EXIT 0 | GREEN (standing; run-2 load flake banked, not a W13W row) |
| G-W13W-v (headline site: easing gallery tiles, 1440, light, headed) | `node evidence/W13W/open/probe-gallery-ball-on-curve.mjs` (ball centre vs nearest point of the tile's `path`, 401-point polyline in screen px, 12 samples × every tile) | 28 tiles · 336 samples · **336 over 1.5 px** · max 17.6 px | — | **RED** (born-RED as the law requires) |
| G-W13W-b proxy (a rail under a ball) | `grep -rnE 'class="[^"]*(progress-rail\|tile-rail\|\brail\b)' demo --include='*.vue'` | 12 rail sites | — | RED (rails remain under balls) |
| G-W13W-e proxy (eye toggles) | `grep -rnE '\bEye(Off)?\b' demo --include='*.vue' --include='*.ts'` | 3 distinct sites (`StartingStyleTarget.vue:67` · `SpringScene.vue:228` · `PlaybackRibbon.vue:127`) | — | RED (more than one component) |

⟨`node probe-gallery-ball-on-curve.mjs before-easing-gallery-1440-light.png`⟩ →
```
{"tiles":28,"samples":336,"over1_5px":336,"maxDistPx":17.6,"firstRow":[14.6,15,16.5,13,16.4,16.5,13.3,16.4,16.3,12.4,16.4,16.4,10.2,16.6,16.3,16.5,4.8,16.6,16.5,2.1,16.5,17.3,6.1,17.6,3.9,8.3,7,16.6]}
```
Frame: `keyframes/evidence/W13W/open/before-easing-gallery-1440-light.png`. The few near-zero distances (2.1, 3.9, 4.8 px) are tiles whose curve happens to cross mid-height at that instant — the rail geometry, not the law.

⟨ball / rail census proxy⟩ → rails: `EasingMini.vue:60` · `EasingTarget.vue:143` · `SequenceMini.vue:72` · `SpringTarget.vue:109,135,196,241` · `SequenceTarget.vue:128` · `SequenceLanes.vue:28,47` · `AnimationVisualizer.vue:31` · `PlaybackRibbon.vue:24`; balls: `EasingMini.vue:62` · `EasingTarget.vue:146` · `SequenceMini.vue:81` · `SequenceTarget.vue:137` · `SpringTarget.vue:161,199,244` · `SpringMini.vue:81` · `SequenceLanes.vue:29`. (Proxy only — `.c` rules which are curve/trace sites under the law and which are time rails that stay subordinate, `:455`.)

⟨picker sites⟩ → `EasingTarget.vue` (gallery `specimen-tile`) · `EasingSidebar.vue` · `TimingFunctionPanel.vue` + `useEasingPickerSeat.ts` (Controls-pane picker, via `ChannelOptions.vue`).

## Unit plan

**Order** (spec `:456` "Units, strictly serial" · `:477` "New units, which run after `.v` and serially"; orchestrator note §0cq): `.c` → `.b` → `.v` → `.p` → `.e` → `.m` → `.d`. Seven groups of one; at most one unit live; no two units ever share a live modify path. ESCALATED units do not halt the wave. Every seat Opus 5.5 (`:447`).

**Writable set, every unit** (spec **Bounds** `:468`): keyframes.js `demo/**` (modify) · `test/demo/**` (additive) · value.js `docs/tranches/X/execution/B/KF-W13W.md` (the unit's receipt, appended under `## Unit receipts`) · value.js `docs/tranches/X/keyframes/evidence/W13W/<unit>/**`. ADJACENT-LINE RULE (§0bt) applies inside keyframes.js only. **Never**: glass-ui (O-65 · O-66 · O-67 relay only; OA-63), package pins, `src/**` of keyframes, `scripts/dev/dev.sh`.

**Locks binding every unit**: one shared curve-to-point primitive (`.b`) — no second geometry, no separate rail, no mid-height track (`:454`); a rail stays only as a subordinate progress cue, never under the ball (`:455`); no copied producer selector, no local copy of a glass surface (§0cq OA-63, §0cr); no test.skip / allowlist / try-catch mask; pathspec commits with the `Claude-Session` trailer; `npm run check` EXIT 0 + `npm run test:demo` GREEN after each unit's last commit; `git diff --check` per commit; kf pushes to origin/master (authorized §0j).

| # | unit | model | spec sections | gates it turns |
|---|---|---|---|---|
| 1 | `KF.W13W.c` census | opus | `:449-462` (the law + `.c`) | G-W13W-c: census table (every curve/trace site with a moving marker, grep + served) · the served falsifier authored and RED ×2 at `a939e7d6` bytes on EVERY site |
| 2 | `KF.W13W.b` the cure at the root | opus | `:449-455`, `:463` | G-W13W-b: every census site on the one primitive; ball from the same function as the stroke; overshoot beyond [0,1] followed; steps jump; PRM = ball on curve at rest; 0 balls on a rail |
| 3 | `KF.W13W.v` served verification | opus | `:464-467` | G-W13W-v: headed, 1440 + 390, light + dark, ≥12 samples/site, every sample ≤1.5 CSS px, ×2; RED-before (from `.c`) + GREEN-after frames |
| 4 | `KF.W13W.p` easing picker hierarchy (OA-58) | opus | `:478-484`; `:501-502` (O-66) | G-W13W-p: one picker component at all three sites · one glass segmented/tabs filter · divider · family headers on "All" · one tile idiom on `--radius-field`, name untruncated · selection by ink + ring · GLASS-SELECT-GREY consumer call sites cured, honest-RED otherwise |
| 5 | `KF.W13W.e` one floating eye toggle (OA-61) | opus | `:485-490` | G-W13W-e: census → one component, every duplicate retired · top-right, absolutely positioned · animated cross-fade+scale on the engine's easing, PRM instant · toggling moves every other box by 0 px, headed, 1440 + 390 |
| 6 | `KF.W13W.m` keyframes mobile (OA-64) | opus | `:491-496` | G-W13W-m: controls + panes at 390 and 430, portrait + landscape, every scene, both themes: inline centre within 1 px of viewport centre · edges on the gutter · 0 horizontal overflow · KF.W13R Sheet/Drawer detents hold |
| 7 | `KF.W13W.d` collapsed dock, consumer half (OA-57) | opus | `:497-499`; `:504-505` (O-67) | G-W13W-d: served collapsed state read, consumer cause cured · honest-RED DOCK-COLLAPSED-FORM (O-65) · side/canvas docks read both themes, consumer clip cured, honest-RED SIDE-DOCK-EDGE (O-67) |

### Briefs (each ≤700 chars)

- **`.c`** — Census every plot with a moving marker: easing gallery tiles + scene plot (`EasingTarget.vue`), picker trigger + dropdown previews (§0bi OA-31; `TimingFunctionPanel.vue`/`useEasingPickerSeat.ts`), Spring trace/`linear()`/sweep (`SpringTarget.vue`, `SpringTrace.vue`, `useSweepScene.ts`), Sequence rails (`SequenceTarget.vue`, `SequenceLanes.vue`), dock minis (`EasingMini`/`SpringMini`/`SequenceMini`), plus grep + served finds. Rule each: curve/trace (law) vs time rail (subordinate). Author ONE served falsifier (ball centre vs rendered path, ≥12 samples/site, 1.5 px) in `evidence/W13W/c/`; run it RED ×2 on EVERY site at `a939e7d6`; frames before. Test-only kf bytes, if any. Receipt.
- **`.b`** — Build ONE shared curve-to-point primitive/composable in `demo/**` (the function that yields the path `d` also yields `(x(p), y(p))` in the plot's own coordinates). Move every `.c` site onto it; delete each mid-height rail under a ball and its CSS (a rail survives only as a subordinate cue, never under the ball). Overshoot (back/elastic/spring) followed outside [0,1] within plot bounds; steps jump; simulators ride the trace at sim time; PRM = ball on curve at rest. Unit tests in `test/demo/` (born-RED then GREEN). One commit per meaning; check + test:demo ×2; push.
- **`.v`** — Re-run `.c`'s falsifier on the served page (dev, headed; gh-pages build if the record requires), 1440 + 390, light + dark, every census site, ≥12 samples/cycle, ×2: every sample ≤1.5 CSS px. Cite `.c`'s RED-before; capture after frames to `evidence/W13W/v/`. A RED site returns to `.b`'s primitive at cause (no per-site offset). Verification seat: kf bytes only if a site fails and the cure is at the primitive. Receipt.
- **`.p`** — Census every easing picker (gallery, dropdown, Controls-pane picker) → ONE component. Hierarchy: family filter as one glass segmented/Tabs control (consume glass's exported seam; no loose stadium pills); divider; per-family sections with type-scale headers when "All"; one tile idiom on `--radius-field` (curve + ball on the curve from `.b`, name beneath, never truncated); selected = ink + ring, not a grey plate. Check Select call sites for a consumer grey class/dead `variant` (§0cs) — cure locally; else honest-RED GLASS-SELECT-GREY. Served frames before/after 1440 + 390; tests; check + test:demo ×2.
- **`.e`** — Census every hide/show preview control (today `StartingStyleTarget.vue:67`, `SpringScene.vue:228`, `PlaybackRibbon.vue:127` + served). Build ONE shared eye/eye-off toggle, mounted in every view's top-right, absolutely positioned (out of flow); show/hide animated by cross-fade + scale on the keyframes engine's own easing; PRM toggles instantly. Retire every duplicate onto it (KISS/DRY). Gate: served, headed, 1440 + 390 — toggling moves every other element's box by 0 px (rect diff over all visible elements), ×2. Tests; frames; check + test:demo ×2.
- **`.m`** — Served census at 390×844, 844×390, 430×932, 932×430, every scene, light + dark: controls and panes' inline centre within 1 px of the viewport centre, edges on the page gutter, `scrollWidth` ≤ `clientWidth`, KF.W13R Sheet/Drawer detents intact. Frames before (RED) → cure at the layout root in `demo/**` (no per-scene offsets, no glass override) → after ×2. Tests where a unit seam exists; check + test:demo ×2.
- **`.d`** — Read the collapsed dock on the served page (1440 + 390, both themes; frame `audit/owner-2026-09-24-collapsed-dock.png`: progress track + count "1" spill, × loose). Cure any consumer cause in keyframes (slot content, sizing, ancestor clip) via glass's exported seams; the plate-wrap is O-65 — record honest-RED DOCK-COLLAPSED-FORM. Read every side/canvas dock both themes (§0ct): cure only a consumer clip/crowding (e.g. a missing gutter); record honest-RED SIDE-DOCK-EDGE (O-67). Never override the dock. Frames; check + test:demo ×2.

## Unit receipts


### KF.W13W.c

**Seat**: `claude-opus-5-5` · 2026-09-24 · spec `KF-W13.md :449-462` (the law + `[KF.W13W.c]`), locks `:454-455`. **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → only the 2 standing inbound mail packets; 0 paths under `demo/**` / `test/demo/**`; value.js 0 dirty under `evidence/W13W/c/**` or this record. No inherited work. kf HEAD = `a939e7d6` (clean) = the pre-cure bytes; dev server `localhost:5173` (cwd keyframes.js, verified by `lsof`).

**kf bytes**: none. No test seam was needed (the falsifier reads the served DOM through existing selectors), so `demo/**` and `test/demo/**` are untouched. **Adjacent edits**: none.

#### Act 1 — census (grep + served), each site ruled

Grep: ⟨`grep -rnE '<path|<polyline|<canvas|:d="' demo --include='*.vue'`⟩ · ⟨`grep -rnE 'progress-ball|class="[^"]*\bball\b|carriage|traveller' demo --include='*.vue'`⟩ · ⟨`grep -nE 'ball|dot|playhead|circle|progress' glass-ui/src/components/easing/{EasingCurve,EasingPicker}.vue`⟩ (read-only). Served: `evidence/W13W/c/served-census.mjs`: 7 routes, Play pressed, every visible round element ≤28 px whose centre moves over 400 ms, with its nearest visible svg path.

**LAW sites** are plots of an easing or a simulation with a moving marker. The falsifier measures them, and each must read RED now:

| # | site | bytes (a939e7d6) | geometry today | falsifier id |
|---|---|---|---|---|
| L1 | easing gallery tiles (28) = the easing scene's plot. The singular hero was promoted into the gallery, so no separate main plot exists: `EasingTarget.vue:1-10` | `EasingTarget.vue:133-148` (`.tile-sparkline path` · `.progress-rail.tile-rail` · `.tile-ball`) | curve in a 0..1 svg; ball `translateX` on a mid-height rail | `easing-gallery-tiles` |
| L2 | dock easing mini (living icon, `.d2`), live on `#/easing` (trigger + collapsed face = 2) | `EasingMini.vue:57-63` (`svg.curve path` · `.rail` · `.carriage > .ball`) | curve in the top 60 %, rail at 82.5 %, ball on the rail | `dock-easing-mini` |
| L3 | Spring timing-function sweep: the sampler tracks the spring's `linear()`, the curve SpringTrace plots | `SpringTarget.vue:232-244` (`.sampler-ball` on `.progress-rail`) · trace `SpringTrace.vue:82-89` (`.plot-trace`) | ball on a 1-D rail ~105 px above the trace; the trace has no ball of its own | `spring-sweep-sampler` |
| L4 | Spring live simulator ball (the physics tracker) | `SpringTarget.vue:107-161` (`.spring-rail` · `.progress-rail` · `.spring-ball`) · trace `SpringTrace.vue:88` | ball on the value rail ~280 px from the trace; the trace carries no marker at sim time (law `:451`) | `spring-live-ball` |

Ruling on L4: the rail is also the spring's target control (tap/drag sets the target, `SpringTarget.vue:218` hint). The law `:451` reads "for a simulator, the ball rides the trace at the current simulation time". So the simulator's tracking ball is a law site, and `.b` puts a ball on the trace at sim time. Whether the target control keeps a subordinate cue under `:455` is `.b`'s design call. It must not keep a ball on a rail.

**Curve drawn but no moving marker.** These have nothing to measure today and sit outside the falsifier. They are carried to the named unit:

| site | bytes | ruling |
|---|---|---|
| Controls-pane easing Select: trigger glyph + dropdown previews (§0bi OA-31) | `ChannelOptions.vue:402-419` (trigger) · `:515-531` (items) (`svg.curve-glyph path`, no ball) | curve only. `.p` gives every picker one tile idiom: "the curve with its ball on the curve (`.b`)" (`:482`) |
| glass `EasingPicker` (sidebar Curve facet + Controls-pane `TimingFunctionPanel`) | `EasingSidebar.vue:34-38` · `TimingFunctionPanel.vue:54`, both `:playback="false"` | the producer's travelling dot is off at both mounts. Its geometry is already `(progress, f(progress))`, on the curve by construction (`glass EasingCurve.vue:176-179`). Producer-owned and read-only; no W13W row |
| SpringTrace plot | `SpringTrace.vue:82-89` | has no marker of its own. It is the curve for L3 and L4 |

**Time rails, stage subjects and parameter markers.** No easing or simulation curve is plotted under these. They are subordinate under `:455` and outside the law:

| site | bytes | served | ruling |
|---|---|---|---|
| Sequence rows (travellers) | `SequenceTarget.vue:127-137` | `div.progress-ball.seq-ball` moves, no path within 80 px | time rail: x = the child's progress, no curve |
| Sequence Timeline pane lanes + master scrub (`.s2`) | `SequenceLanes.vue:28-29,47-60` | `seq-lane-scrub-ball` moves, no path | time rail and scrub thumb |
| dock SequenceMini | `SequenceMini.vue:72-81` | not live on 1440 routes | time rails |
| dock SpringMini (3 preset lanes) | `SpringMini.vue:77-81` | `span.ball@carriage` moves, nearest path 77 px (none of its own) | race lanes: spatial position, no curve |
| Spring derby lanes | `SpringTarget.vue:189-199` | off unless derby is on | race lanes: spatial, no curve |
| PlaybackRibbon → AnimationVisualizer | `PlaybackRibbon.vue:105` · `AnimationVisualizer.vue:31-55` | the scrub visual's balls | time rail (the scrubber's sighted twin) |
| Spring peak-overshoot heatmap marker | `SpringHeatmap.vue:109` | moves only when sliders move | a (response, ζ) parameter point, not a trajectory |
| SquareMini box on its tour | `SquareMini.vue:81-85` | `span.box` dist 0 to its own path | spatial motion path, not an easing plot. Already on its path |
| AmigaMini Boing ball | `AmigaMini.vue:61` (svg) | `circle` near the grid lines (0.7-1 px) | spatial bounce over a grid, not a plot |
| CubeMini die faces (`#/`, `#/cube`) | — | `span.face@layer.die` rotating | 3-D glyph faces, not markers |
| `useSweepScene.ts` | `demo/composables/scene-runtime/useSweepScene.ts` | — | a clock runtime (drives L1/L3 phases), draws nothing |

**Served census readout** (⟨`node served-census.mjs`⟩, 1440, Play pressed; moving round markers → nearest path, min–max px): `#/easing`: `tile-ball` ×25 → `tile-sparkline` 4–22.8 · `ball@carriage` ×2 → `curve` 1.7–4.9. `#/spring`: `sampler-ball` → no path within 80 px · SpringMini `ball@carriage` ×2 → 77. `#/sequence`: `seq-ball` ×2, `seq-lane-scrub-ball` → no path. `#/square`: `box` → 0. `#/amiga`: `circle` → grid 0.7–1. `#/`, `#/cube`: die faces plus a hover capsule (noise). **The served pass found no law site the grep missed.** The spring live ball needs a target change to move, so the falsifier drives it with a rail click.

#### Act 2 — the served falsifier (ONE file), RED ×2 at kf `a939e7d6`

`evidence/W13W/c/falsifier-ball-on-curve.mjs` (seed: `open/probe-gallery-ball-on-curve.mjs`, generalized to a site table):
- It takes 16 samples per pair, 140 ms apart, after the scene's own "Play animation" (L4 after a rail click at 85 %).
- Distance = ball `getBoundingClientRect` centre to the nearest of 601 points on the RENDERED `path` (`getPointAtLength`, mapped to client px by `getScreenCTM`).
- A sample passes at ≤1.5 CSS px. Exit 0 = all GREEN, 1 = a site RED, 2 = a site unmeasurable.
- Flags: `--w --h --theme --frames --tag`, so `.v` re-runs it unchanged at 1440 and 390 in both themes.

| run | cmd | L1 gallery (28 pairs) | L2 dock mini (2) | L3 sweep sampler | L4 live ball | exit |
|---|---|---|---|---|---|---|
| 1 | `node falsifier-ball-on-curve.mjs --frames before --tag run1-1440-light` | 437/448 over · max 22.53 · min 0.23 · 25 moving · **RED** | 31/32 · 12.78 · 1.04 · **RED** | 16/16 · 108.39 · 104.88 · **RED** | 16/16 · 279.81 · **RED** | 1 |
| 2 | `node falsifier-ball-on-curve.mjs --tag run2-1440-light` | 440/448 · 22.62 · 0.03 · 25 moving · **RED** | 30/32 · 12.77 · 1.25 · **RED** | 16/16 · 108.44 · 104.81 · **RED** | 16/16 · 279.81 · **RED** | 1 |
| 3 (coverage) | `… --w 390 --h 844 --theme dark --frames before --tag run3-390-dark` | 441/448 · 17.67 · 0.07 · 10 moving · **RED** | 31/32 · 12.78 · 0.86 · **RED** | 16/16 · 103.34 · 101.57 · **RED** | 16/16 · 285.97 · **RED** | 1 |

Figures are read from the settled `run{1,2,3}-*.json` (⟨`node -e 'for(const x of require("./runN.json").report)console.log(…)'`⟩).
- The few sub-1.5 px samples in L1/L2 are instants when the ball crosses the curve at the rail's height, which is the rail geometry, not conformance. Every site still fails most of its samples.
- At 390, 10 of 28 tiles move, because the rest are scrolled out of view.

Frames before: `evidence/W13W/c/before/run1-1440-light-*.png` and `run3-390-dark-*.png` (4 sites each). Evidence commit: value.js `b58d7438`.

#### Act 3 — repo gates (kf `a939e7d6`, bytes unchanged by this unit)

| gate | run | reading |
|---|---|---|
| `npm run check` | 1 · 2 | EXIT 0 · EXIT 0 (vue-tsc ×2 + `proof:structure — PASS … 0 violations`) |
| `npm run test:demo` | 1 | 8 files / 2 tests FAIL, EXIT 1 (6 × `Hook timed out in 10000ms`, `hero-wave-pause` 5 s, `typing-dots-engine-seam` "no inline opacity"). Host load average 60–87 (⟨`uptime`⟩) |
| | 2 | **77/77 · 565/565 · EXIT 0** |
| | 3 | 2 files / 1 test FAIL, EXIT 1 (`transport-icon-spin` hook 10 s, `typing-dots-engine-seam`). Load 75 |
| | 4 | **77/77 · 565/565 · EXIT 0** |

GREEN ×2 (runs 2 and 4). Runs 1 and 3 fail the same load-timeout set the Open banked at baseline (`transport-icon-spin` · `hero-wave-pause` · `typing-dots-engine-seam`) while four tracks share the host. This unit wrote no kf byte, so it is not a W13W row.

#### Gates

- **G-W13W-c: census table (grep + served): GREEN.** 4 law sites (L1–L4). 3 curve-only sites are carried to `.p` or ruled producer. 11 time-rail, stage or parameter sites are ruled subordinate or out of law. The served pass found no site the grep missed.
- **Served falsifier authored (≥12 samples/site, here 16; 1.5 CSS px) and RED ×2 at `a939e7d6` on EVERY law site: GREEN** (born-RED as the law requires). Runs 1 and 2 at 1440 light, plus run 3 at 390 dark for coverage.
- **`npm run check` EXIT 0 ×2 + `npm run test:demo` GREEN ×2: GREEN.** 2 load-flake runs banked, not a W13W row.

#### Hand-off to `.b`

- Move L1–L4 onto one curve-to-point primitive. The ball comes from the same function as the stroke path.
- L3 and L4 put the ball on `SpringTrace`'s trace at the sampler phase and at sim time.
- L2's rail goes. L1's `.tile-rail` goes, or survives only as a subordinate cue with no ball on it.
- `.v` re-runs `falsifier-ball-on-curve.mjs` unchanged (`--w 390 --h 844`, `--theme dark`). A newly added site, such as `.p`'s picker tiles, is one more row in its `SITES` table. **Residuals**: none. **Escalations**: none.

**Commits**: value.js `b58d7438` (evidence: falsifier + served census + run JSON + 8 before frames) · this record (below). kf: none.
