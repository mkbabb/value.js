# S — Lane: Performance & Transitions Audit (owns S-9, feeds S-22/S-23)

**Auditor mode:** AUDIT ONLY. Live probes against the LIVE dev server `http://localhost:9000`, Playwright-driven (its own Chromium; the CDP browser at the chrome-devtools profile was already held by a sibling lane).
**Substrate:** `c5aa091` (tranche-q). GPU: **Apple M5 Max, ANGLE Metal Renderer** (real hardware — the aurora resolved to WebGL mode, `atmosphereBgImage: none`; NO software-raster confound). Playwright forces **dpr=1** — every frame cost below MULTIPLIES on the user's retina (dpr=2 ≈ 4× fragment work).
**Method:** in-page `requestAnimationFrame` frame-delta recorder + `PerformanceObserver('longtask')`, marked windows around each beat. p50/p95/max are per-frame deltas in ms; "jank" = frames > 32ms (a dropped frame at 60Hz).

---

## The measured ledger (every number below is live-captured)

| Beat | p50 frame | p95 | max frame | jank frames | long tasks (ms) | fps (p50) |
|---|---|---|---|---|---|---|
| **Idle — picker** (blob ON, 3 canvases) | **18.6ms** | 22.4 | 32.6 | 5 / 6.8s | — | **~54** |
| **Idle — browse** (blob OFF, 1 canvas) | **11.5ms** | 21.9 | 30.6 | **0 / 6.1s** | — | **~85** |
| picker → gradient (first mount) | 19.1 | 31.8 | **173.9** | 8 | **183** | — |
| gradient → picker (blob re-activate) | 18.8 | 30.8 | 81.9 | 13 | **77 / 51 / 51** | — |
| picker → mix (dual-pane) | 19.5 | 31.4 | 71.9 | 10 | (<50) | — |
| picker → browse | 11.8 | 22.4 | 71.9 | 8 | (<50) | — |
| single color change (no nav) | 18.3 | 30.9 | 60.6 | 8 | (<50) | — |
| **HUE-SLIDER DRAG (30 steps @ 1/frame)** | **49.8ms** | 61.3 | 81.7 | **31 / 44** | 50 / 54 | **~20** |

The two anchor facts: **(a)** the blob-on picker floor is 54fps vs the blob-off browse floor of a clean 85fps/zero-jank — a **~7ms/frame continuous tax from one 155px canvas**; **(b)** a slider drag collapses the app to **~20fps with 70% of frames dropped**. This second number is the lived "slow and janky" (S-9/S-23) — it is not the page transitions, it is *every colour interaction*.

---

## P0 findings

### P0-1 — Every colour change synchronously re-derives BOTH the aurora and the blob palette; a slider drag re-derives them 60×/s. **(root cause of S-9/S-23)**
`demo/@/composables/color/useAtmosphere.ts:84-95` and `:108-122` install two `watch(cssColorOpaque, …)` with **no throttle, no debounce, no rAF coalescing** (confirmed: `grep throttle|debounce|requestAnimationFrame useAtmosphere.ts` → 0 hits). On each fire:
- `deriveAurora(css)` — parses the seed (`cssToOklch`) + builds a 4-stop OKLCh ramp, each stop `gamutMapStop`-ed (`../glass-ui/.../aurora/composables/color.ts:222`);
- `deriveBlobPalette(css,{stopCount:4})` + `.map(oklchStopToHex)` — a second 4-stop harmony ramp, each `gamutMapStop`-ed (`../glass-ui/src/composables/color/index.ts:273`);
- the aurora deep-watch then re-uploads uniforms; the blob deep-watch repaints;
- in parallel `useContrastSafeColor` recomputes `safeAccentColor` (OKLab contrast) → `--accent-live` write (App.vue:158-164).

≈ **16 gamut-map ops + 2 colour parses + a contrast solve, synchronously, per changed colour**. Measured drag cost: **+33ms/frame** (16.7 → 49.8). The two 50/54ms long tasks land inside the drag.
**Measured:** slider-drag p50 **49.8ms / ~20fps**, 31/44 frames janked.
**ROOT ROUTING:** `value.js demo` — coalesce the two atmosphere watches to **at most one derive per animation frame** (a `useRafFn`/`watchThrottled` gate in `useAtmosphere.ts`; the last colour of a frame wins). Aurora + blob need only the *latest* colour, never the intermediate 59. This is the single highest-leverage fix in the tranche. Contrast `--accent-live` (App.vue) belongs in the same coalesced tick.
**Candidate wave-item:** *S.W-PERF/A1 — rAF-coalesce the colour→atmosphere+accent fan-out (one derive/frame).*

### P0-2 — The HeroBlob WebGL RAF costs ~7ms every frame it is mounted, even fully idle.
Direct ablation (natural experiment, no code change): **picker (blob mounted) = p50 18.6ms / 54fps, 5 jank; browse (blob absent) = p50 11.5ms / 85fps, 0 jank**. The delta is one `155×155` canvas — disproportionate to its 24k pixels, so the cost is **per-frame CPU** (mood FSM + satellite state-machine + pointer tracking + uniform recompute in `../glass-ui/.../goo-blob/composables/useMetaballRenderer.ts`), not fragment count. On the user's dpr=2 retina the tax compounds. The picker is the default landing view, so this floor is what "the whole app feels sluggish" refers to.
**ROOT ROUTING:** split — the per-frame CPU cost is `glass-ui producer` (`useMetaballRenderer` — profile & shed per-frame allocation/recompute; hoist static uniforms; the FSM need not tick at 60Hz). The `demo` mitigation is immediate: **idle-gate the blob** (drop to a single repaint when no pointer/colour activity for N ms — the renderer already owns a `paused` flag at `useMetaballRenderer.ts:158/413`; the demo just isn't driving it) and/or lower `config.tempo`/internal resolution via `BLOB_CONFIG` in `useAtmosphere.ts:100`.
**Candidate wave-items:** *S.W-PERF/A2 — idle-gate the hero blob (pause RAF on inactivity; single-frame repaint on colour/pointer wake)*; *S.W-PERF/A3 (glass-ui) — profile useMetaballRenderer per-frame CPU; hoist invariant uniforms, decouple FSM tick from render tick.* Note S-4 (blob "spazzes/too small/clipped") will likely re-author this component anyway — fold the perf gate into that reinvention.

---

## P1 findings

### P1-1 — First-visit pane mounts land a 72–183ms long task *inside* the cross-fade.
picker→gradient = **183ms long task / 174ms dropped frame** (the netting/hatch visualiser mounting synchronously while the outgoing picker still paints — the PaneSlot DEFAULT simultaneous mode co-mounts both, `PaneSlot.vue:47-57`). gradient→picker = 77+51+51ms (blob re-activation + spectrum/gamut canvas repaint). The simultaneous mode is deliberately KEPT (the R.W3 `fceed47` dev-remount cure — do NOT revert to `out-in`), but nothing defers the incoming pane's heavy content past the swap.
**ROOT ROUTING:** `value.js demo`. Keep simultaneous mode. Defer the mount of heavy in-pane surfaces (gradient netting, canvases, palette grids) one frame past `enter` (a `v-if="entered"` flipped in `onAfterEnter`, or `defineAsyncComponent` for the visualiser bodies). Secondary: the left-slot `KeepAlive :max="6"` (App.vue:64) vs ~11 left panes guarantees eviction → the 183ms re-mount recurs; either raise `max` to cover the primary views or accept eviction only for admin panes.
**Candidate wave-item:** *S.W-PERF/B1 — defer heavy in-pane content one frame past the enter transition; right-size KeepAlive max to the non-admin view count.*

### P1-2 — The pane-wrapper transitions LAYOUT properties (height/margin/padding) over 0.45s → reflow every frame.
`demo/color-picker/App.vue:269-273`: `transition: height … , margin … , padding …` at `--duration-slow` (0.45s). All three are layout-triggering; the whole pane subtree reflows each frame of the swap while the co-mounted blob/canvas subtrees are live. This is the layout-thrash half of the P1-1 hitch.
**ROOT ROUTING:** `value.js demo`. Animate `transform`/`opacity` only (compositor-only), or drop the wrapper transition entirely — the `vj-enter` family (transform+opacity) already carries the motion. Never transition `height` on a subtree containing a live WebGL canvas.
**Candidate wave-item:** *S.W-PERF/B2 — excise the layout-property pane-wrapper transition.*

### P1-3 — No `will-change` / `content-visibility` anywhere on the motion surfaces; off-screen KeepAlive panes keep painting.
`grep will-change|content-visibility demo/` → the only hit is `PaneHeader.vue` `contain: layout style paint`. The `vj-enter*-active` classes (`animations.css:83-101`) animate `transform` with no `will-change`, so layers churn (create/destroy) each swap; KeepAlive-cached but off-screen panes are not `content-visibility:auto`, so their subtrees still cost paint/composite.
**ROOT ROUTING:** `value.js demo` (candidate `glass-ui` if the `vj-*` families are promoted to the shared motion layer). Add `will-change:transform` scoped to `*-enter-active/*-leave-active` only (never idle — a permanent `will-change` is its own tax); `content-visibility:auto` + `contain-intrinsic-size` on inactive pane wrappers.
**Candidate wave-item:** *S.W-PERF/B3 — scope will-change to active transitions; content-visibility the parked panes.*

### P1-4 — Transition durations are long: view swaps run 0.45–0.62s springs.
Tokens (glass-ui `styles`): `--duration-slow 0.45s`, `--spring-smooth-duration 0.45s`, `--spring-bouncy-duration 0.62s`. The `vj-enter` enter uses `--spring-smooth-duration` (0.45s) for transform (`animations.css:86`); a full pane swap therefore reads as ~0.45s of travel *on top of* the P1-1 mount stall — the "slow" half of "slow and janky". A 0.45–0.62s view transition is at the sluggish end of the 0.2–0.35s norm.
**ROOT ROUTING:** `value.js demo` motion tokens (or `glass-ui` if the spring tokens are shared-owned — they live in glass-ui `styles`, so a retune there cascades to every consumer; scope the change to the view-swap family in demo `animations.css` if a global retune is too broad). Retune the pane-swap family toward ~0.28–0.34s.
**Candidate wave-item:** *S.W-PERF/B4 — retune the view-swap spring to ~0.3s (verify against S-9 taste bar).*

---

## P2 findings

### P2-1 — Idle picker never reaches a clean 60Hz (p50 18.6, five 32ms hitches / 6.8s).
Even with the P0-1 drag fix, the aurora full-viewport WebGL2 RAF + blob RAF keep the picker floor at ~54fps at dpr=1. Largely folds into P0-2 (blob) + the aurora's own continuous loop. Worth a follow-up: does the aurora need to animate continuously, or can it settle to a static field after the intro (repaint only on seed change)? That would return the picker floor toward browse's 85fps.
**ROOT ROUTING:** `glass-ui producer` (aurora motion-vs-static policy) + `demo` (opt into a settled aurora on the picker). **Candidate:** *S.W-PERF/C1 — evaluate a settle-to-static aurora after intro.*

### P2-2 — value.js `src` colour core is on the hot path but was not the bottleneck (partial S-24).
The per-change cost is dominated by glass-ui `deriveAurora`/`deriveBlobPalette`/`gamutMap`, which call INTO value.js (`cssToOklch`, gamut mapping). The right fix is call-frequency (P0-1 coalescing), not the per-call cost — the library math is not hot enough to matter once it runs ≤1×/frame. No `src/` change indicated for perf. A deeper value.js/parse-that micro-audit (memoisation of `parseCSSColor` on repeated identical seeds) is a low-value follow-up given P0-1 removes the repetition. **ROOT ROUTING:** none / defer.

---

## Cross-lane notes (out of my lane, surfaced by the probes)
- **S-11 confirmed at the network layer:** the dev server calls the PRODUCTION API `https://api.color.babb.dev/colors/approved`; prod CORS `Access-Control-Allow-Origin: https://color.babb.dev` ≠ `localhost:9000` → every palette/colour fetch fails preflight (console errors captured). Root: dev `BASE_URL` points at prod (`demo/@/lib/palette/api/client.ts`) — route to the api/browse lane.
- **S-18 wiring exists, contra the ledger's "does not update at all":** `useAtmosphere.ts:84-95` DOES re-seed the aurora on every colour (varies L, C, and h in `deriveAurora`). The complaint is therefore *visual weakness / param range*, not missing wiring — route to the atmosphere-design lane. (And once P0-1 coalesces the re-derive, the seed still tracks — coalescing does not break S-18.)

---

## Verdict summary (keep / retune / restructure)
- **Colour→atmosphere fan-out:** RESTRUCTURE (P0-1) — rAF-coalesce. The tranche's #1 perf fix.
- **Hero blob RAF:** RESTRUCTURE (P0-2) — idle-gate in demo now; producer per-frame profile (folds into the S-4 reinvention).
- **Pane cross-fade (simultaneous mode):** KEEP the mode (dev-safe), RESTRUCTURE the payload (P1-1 defer heavy content, P1-2 kill layout-prop transition, P1-3 will-change/content-visibility).
- **View-swap timing:** RETUNE (P1-4) toward ~0.3s.
- **dock settle beat (`vj-settle` scale keyframe):** KEEP — a compositor-only scale, no measured cost.
- **value.js src / parse-that core:** KEEP — not the bottleneck; frequency, not per-call cost, is the lever.

All fixes are CSS-only or demo-composable-level except P0-2/P2-1 (glass-ui producer) — none require value.js `src` changes. Precept-clean: coalescing and idle-gating are the *correct* mechanisms (drop redundant work), not workarounds/fallbacks.
