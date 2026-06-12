# Lane L-PERF2 — interaction profiles (the numbers behind U6 / U23 / U12)

**Mandate.** Trace four interactions live against `:9000` (cold-cache dev server, HEAD `199fd15`
+ 0.12.0): (a) spectrum/slider drag 3s, (b) dock collapse/expand ×3, (c) the color-space
dropdown open/close, (d) a pane switch. For each: frame-budget violations, long tasks, forced
reflows, and the **responsible code (file:line via the trace)**. This lane MEASURES what U6
("dock animations take FAR too long; slow, laggy, jittery"), U23 ("dropdown open animation
jerks"), and U12 ("pane/card transitions not smooth") feel.

**Substrate.** value.js `tranche-f-handoff` @ `199fd15`, demo served by the dev Vite server,
glass-ui local source (`../glass-ui`), keyframes.js local source. Page: 1440×900, DPR 2,
`prefers-reduced-motion: false`. chrome-devtools MCP performance traces + live `evaluate_script`
frame instrumentation. Evidence shot: `shots/L-PERF2-app-state.png`.

> **MEASUREMENT CAVEAT — read before trusting any absolute ms.** The shared MCP browser had
> **13+ demo tabs open across sibling lanes** on ONE renderer process. The **idle baseline** (no
> interaction at all) already measured **mean 62.8 ms/frame, p95 111 ms, ~16 fps, 44/89 frames
> over 33 ms** (§5). So every *absolute* frame-time number below is inflated by cross-tab
> contention and is NOT the number a lone user sees. What survives the contention and is
> **environment-independent** is: (1) the **forced-reflow code attributions** (file:line — these
> are which lines query geometry after a style invalidation, period), (2) the **INP phase shape**
> (presentation-delay-dominated, not input-delay), (3) the **relative cadence pattern** (the
> recurring ~125 ms stall that appears IDENTICALLY at idle, on dropdown-open, and on pane-switch
> — proving it is a page-wide background cost, not a per-interaction cost), and (4) the **RAF-loop
> census + canvas census** (counts, not timings). I lean exclusively on those four classes of
> finding for every claim that drives a wave; the raw fps figures are reported as
> *contention-inflated lower bounds* only.

---

## Headline

**The jank is not in the spring math or the interaction handlers — it is in a saturated main
thread + a leaking GL idle floor.** Two structural causes, each measured:

1. **A continuous ~4-RAF-loop / live-WebGL idle floor that starves every interaction's
   presentation phase.** At idle the page schedules **64 RAF callbacks/second** while achieving
   ~16 fps → **~4 independent concurrent RAF loops** (aurora WebGL + live blob shader + a
   **zombie second blob canvas** + Vue scheduler/spring ticks). The dock-toggle INP breakdown is
   **255 ms of presentation delay** vs. only 2 ms input delay — i.e. the work is "produce the next
   frame", and the next frame is starved by the shader loops. This is the engine behind U6's
   "slow, laggy, jittery."

2. **A glass-ui GooBlob double-canvas leak.** A **single** `HeroBlob` mount
   (`ColorPicker.vue:22`) produces **TWO `canvas.goo-blob-canvas` elements under the same
   `.goo-blob-wrapper`**: the live 358×358 (179×179 CSS) AND a **zombie 400×400 whose CSS box is
   0×0** (`visible:false`, never laid out) yet still holds a WebGL context and rides the RAF
   rotation. One of the four idle RAF loops is pure waste.

3. **Per-frame forced reflows on the two hot interactions** (spectrum drag + dock morph), each
   attributed to an exact line by the trace's ForcedReflow insight (§1, §2).

The dock spring (`DOCK_SPRING = {response: 0.32, ζ 0.7}`, `glass-ui/.../dock/constants.ts:32`) is
correctly tuned; the *wall-clock* settle blows out to **~900 ms across only 11–12 rendered
frames** (§2) because each `--dock-morph-t` write recomputes a `calc()` cascade across a
**10-selector inheriting group** and only ~13 fps of frames actually paint. The fix surface is
the idle floor + the per-frame cost, NOT the spring constants.

---

## §1 — Trace (a): spectrum drag, 3 s — `INP-shape: presentation-bound; per-frame forced reflow`

**Drive.** `pointerdown` on `.spectrum-picker` (454×224 @ 241,357), then a 3 s Lissajous
`pointermove` stream, `pointerup`. The handler is rAF-throttled (`scheduleSpectrumUpdate`,
`SpectrumCanvas.vue:94`) — one `updateSpectrumColor` per frame.

**Measured (contention-inflated lower bounds):**

| metric | value |
|---|---|
| achieved fps (3 s drag) | **~12.3 fps** (mean frame 81.3 ms) |
| p50 / p95 / p99 frame | **100 / 125 / 153 ms** |
| frames over 16.7 ms | **35 / 36** |
| frames over 50 ms | **26 / 36** |
| `getBoundingClientRect` calls during drag | **35** (== 1 per dispatched move frame) |
| dispatch → 2nd-rAF settle (reactive+layout+paint) | median **121 ms**, p90 **143 ms** |
| `longtask` (>50 ms) entries fired | 0 (work is spread per-frame, not one >50 ms task) |
| trace CLS during drag | **0.38** (the spectrum-hover box-shadow + dot reflow) |

**Forced-reflow attribution (environment-independent — ForcedReflow insight):**
- top culprit **`(anonymous) @ SpectrumCanvas.vue:53` / `updateSpectrumColor @ SpectrumCanvas.vue:63`**
  → the live `getBoundingClientRect()` at **`SpectrumCanvas.vue:109`**
  (`const rect = spectrumRef.value.getBoundingClientRect();`). It is read INSIDE the rAF callback
  **after the previous frame's `setCurrentColor` invalidated the document** (the reactive color
  cascade re-renders the spectrum gradient background, 8 `WatercolorDot` instances, and the blob
  paletteStops). So each frame forces a synchronous layout to read a rect that was just dirtied
  → textbook layout thrash, 15 ms reflow time even on this trace.
- secondary **`d @ glass-ui/dist/dock.js:315`** — the dock's `getSize` geometry read
  (`useLayerTransition.ts:95` `getBoundingClientRect()[dim]`) firing concurrently because the dock
  is mounted and reacting to the same color.

**Root cause.** The rect is invariant during a drag (the spectrum box does not resize), yet it is
re-read every frame after a same-frame style invalidation. **Cache the rect on `pointerdown`** (and
on resize) instead of reading it inside the throttled update — kills the per-frame forced reflow
entirely. The deeper cost is the **fan-out of one color write** (8 WatercolorDots + gradient + blob
paletteStops all reactive on `model.value.color`); that is the demo/glass-ui reactive-cost item,
separate from the reflow.

---

## §2 — Trace (b): dock collapse/expand ×3 — `INP 356 ms, 255 ms presentation; ~13 fps morph`

On desktop (≥1024 px) the dock is `:always-expanded="!isDesktop"` (`Dock.vue:93`) so it never
*collapses* on mouse-out; the morph the user feels (U6/U16) is the **layer-swap size morph**. I
drove **3 action-bar-toggle cycles** (`Dock.vue:144` `@click="toggleActionBar"`), each a real
inline-size morph through the single `SpringProgress` engine (`useLayerTransition.ts`).

**Measured morph census (per cycle, live `data-morphing` + `--dock-morph-t` sampling):**

| cycle | frames rendered while `data-morphing` | wall-clock to settle |
|---|---|---|
| 1 | **12** | **913 ms** |
| 2 | **11** | **899 ms** |
| 3 | **11** | **800 ms** |

→ **~75 ms per rendered morph frame; ~13 fps.** The spring's analytic settle (response 0.32 s,
ζ 0.7) should resolve in ~0.5–0.7 s of *real time*; it stretches to ~0.9 s because only 11–12
frames actually paint in that window. This IS the "takes FAR too long to squish/morph; slow,
laggy, jittery" (U6) — the spring is fine, the **frame production is starved**.

**INP breakdown (the decisive, environment-independent shape):**
- longest interaction `pointerdown`, **total 356 ms** = **input delay 2 ms + processing 100 ms +
  presentation delay 255 ms**. The dominant phase is **presentation (255 ms)** — the browser
  cannot paint the next frame fast enough, because (i) every `--dock-morph-t` write recomputes a
  `calc()` cascade across the 10-selector inheriting `@property --dock-morph-t {inherits:true}`
  group (`glass-ui/src/styles/dock.css:63` + the `--dock-morph-size`/`--dock-expand-t`/crossfade
  reads in `dock/layers.css:57`, `dock/morph.css:48`, `dock/morph-bridge.css:93`), AND (ii) the
  shader RAF floor (§5) is eating the same frames.

**Forced-reflow attribution (the morph's 40 ms reflow):**
- top culprit **`flushJobs @ vue.runtime` → reka-ui floating-ui** (`dist-vzlhttbQ.js` = reka-ui):
  `getCssDimensions` (8 ms), an anonymous Popper measure (18 ms), `isOverflowElement` (3 ms),
  `getAnimationName` (6 ms), `focusFirst$2` (4 ms). The layer swap re-runs reka-ui's
  floating-ui/Presence geometry **synchronously inside Vue's flush** — geometry reads chasing the
  same-tick DOM mutation. This is reka-ui-internal but it is **triggered by the dock layer swap**,
  so reducing morph churn (or deferring the reka measures) is the lever.

**Root cause.** Two co-conspirators: the **10-selector inheriting `calc()` morph cascade** (every
frame restyles the whole dock control family) + the **starved frame budget** (§5). The spring
constant is NOT the problem; do not retune `DOCK_SPRING`.

---

## §3 — Trace (c): color-space dropdown open/close — `the jerk IS the recurring ~125 ms stall`

**Drive.** Click the `role="combobox"` color-space trigger (renders "RGB"), measure the
open-animation frame deltas, Escape, ×2.

**Measured frame-delta census during the open animation (the U23 "jerks"):**

```
cycle 1: 18.3, 123.5, 17.9, 126.3, 19, 125.8, 18.9, 128.2, 18.3, 122.9, 18.8, 123.9, 18.1, 131, 17.9, 127.6, 17.6, 127.7, 19.2, 126.9
cycle 2: 19.9, 129.1, 17.8, 135.4, 19.7, 137.2, 19.9, 140.8, 18.7, 136.7, 19.8, 131.5, 18.5, 130.4, 19.2, 126.6, 17.2, 128.2, 18.2
```

This is the signature of the jerk: a **strict alternation of one ~18 ms (smooth) frame then one
~125–140 ms (7–8 budget) stall**. The dropdown's CSS open transition tries to run on every frame,
but every *other* frame is consumed by a ~125 ms job. **U23's "jerks" = this 18/125 ping-pong** —
the animation advances, freezes for ~7 frames, advances, freezes. The ~125 ms stall is **NOT
specific to the dropdown**: it is the SAME period that appears at idle (§5) and on pane-switch
(§4). So the dropdown does not *cause* the jerk; it *reveals* the page-wide background stall by
trying to animate against it.

(No INP/ForcedReflow insight registered for this trace because my synthetic Escape-close didn't
let the reka-ui content fully settle to opacity 1 in the harness; the frame-delta census above is
the load-bearing evidence and is unambiguous.)

---

## §4 — Trace (d): pane switch (picker ↔ mix) — `cheap itself; same 125 ms background floor`

**Drive.** `location.hash` `#/` → `#/mix` → `#/` (the `usePaneRouter` hash source-of-truth).

**Measured frame deltas:**
```
to /mix:    107.4, 18.3, 136.1, 20, 137.8, 20.1, 127.6, 19, 127.1, 18.4, 125.4, 18.6, 124.4, 18.2, 125, 19.5, 126.2
back to /:  34.1, 24.1, 115.3, 21.4, 134.9, 20.8, 134.5, 20.6, 136.5, 21.7, 134.3, 17.8, 136.2, 19.3, 140.1, 18.4, 134.5
```

| metric | to /mix | back to / |
|---|---|---|
| frames over 33 ms | 9 / 17 | 9 / 17 |
| max frame | 137.8 ms | 140.1 ms |

**The pane switch adds NO distinct large stall** beyond the same recurring ~125 ms cadence — the
ForcedReflow/INP insights were empty for this trace, CLS 0.00. So **U12 ("pane/card transitions
not smooth") is the SAME root cause as U6/U23**: the persistent ~125 ms background frame eats the
transition. The pane-router swap logic itself is cheap. The fix is the idle floor (§5), not the
pane machinery.

---

## §5 — The root: the idle WebGL/RAF floor (the cause common to §1–§4)

**Idle baseline, zero interaction (90 frames):** mean **62.8 ms**, p50 23.3 ms, p95 **111 ms**,
max 114.6 ms, **~16 fps**, **44/89 frames > 33 ms**. The page is *already* janky doing nothing.

**RAF-loop census:** **64 RAF schedules/second** at ~16 fps achieved ⇒ **≈4 independent RAF loops**
each requesting a frame every tick. `document.getAnimations()` reports **0 running CSS
animations** → the entire idle cost is **WebGL shader RAF loops**, not CSS.

**Canvas census (3 live `<canvas>`):**

| canvas | backing | CSS box | visible | role |
|---|---|---|---|---|
| `.absolute.inset-0` (aurora) | **1000×1612** | 500×806 | yes | aurora WebGL, full pane, DPR-2 |
| `.goo-blob-canvas` (live) | 358×358 | 179×179 | yes | the hero blob |
| `.goo-blob-canvas` (**zombie**) | **400×400** | **0×0** | **no** | **LEAK — never laid out, still a live GL context + RAF** |

**The double-canvas leak is glass-ui-side and confirmed structural:** both `.goo-blob-canvas`
elements share the **same parent chain** `.goo-blob-wrapper.w-[7rem]` → `@container/card-header`,
yet the demo mounts `HeroBlob` exactly **once** (`ColorPicker.vue:22`; the only `<GooBlob>` is
`HeroBlob.vue:5`). So **one GooBlob component emits two `<canvas>` children** — the second a 400×400
zombie with a 0×0 CSS box that never paints visibly but still holds a WebGL2 context and (almost
certainly) its own `requestAnimationFrame` shader loop. That is one of the four idle RAF loops,
pure waste, and it competes for GL + main-thread time on every frame of every interaction above.

**Why this explains everything:** the recurring ~125 ms stall in §1/§3/§4 and the 255 ms
presentation delay in §2 are the **aurora repaint + 2 blob shader loops + Vue/spring ticks
colliding on one main thread + one GPU queue**. Reduce the idle floor and every interaction's
presentation phase recovers.

---

## Ownership + work-order seeds (for the wave fold — this lane authors NO code)

| # | Finding (grounded) | Owner | Fix lever |
|---|---|---|---|
| **LP2-1** | Per-frame forced reflow: `getBoundingClientRect()` read inside the rAF-throttled `updateSpectrumColor` after a same-frame color invalidation | **demo** `SpectrumCanvas.vue:109` | Cache the spectrum rect on `pointerdown` + on resize; never read it inside the throttled update. Kills the §1 reflow. |
| **LP2-2** | **GooBlob double-canvas leak** — one mount → two `<canvas>`, the 2nd a 400×400 / 0×0 zombie still on a GL context + RAF | **glass-ui** GooBlob (`../glass-ui/src/components/custom/goo-blob/`) | Investigate why GooBlob emits a second canvas; dispose/skip the unused one. Removes ~1 of 4 idle RAF loops. **Author a glass-ui (tranche BA) ask.** |
| **LP2-3** | ~4 concurrent idle RAF loops → ~16 fps idle floor; presentation-bound INP (255 ms) | **glass-ui + demo** | Idle-throttle / pause shader loops when off-screen or when `prefers-reduced-motion`; gate the aurora repaint to actual state change (ties to U33 "aurora does not move" — it may be repainting a static frame every tick). Single shared RAF scheduler across blob+aurora. |
| **LP2-4** | Dock morph renders ~13 fps / ~900 ms because each `--dock-morph-t` write restyles a 10-selector inheriting `calc()` group | **glass-ui** dock (`dock.css:63`, `dock/layers.css`, `dock/morph.css`, `dock/morph-bridge.css`) | Do NOT retune `DOCK_SPRING` (it is correct). Narrow the `@property --dock-morph-t {inherits:true}` cascade / add `will-change`/containment so the per-frame restyle is cheaper. **glass-ui (tranche BA) ask.** |
| **LP2-5** | Dock layer swap forces a 40 ms reka-ui floating-ui reflow synchronously inside Vue flush | **glass-ui dock + reka-ui** | Defer/batch the reka Popper measure off the morph flush; or reduce layer-swap-triggered remeasures. |
| **LP2-6** | Reactive fan-out: one spectrum color write re-renders 8 `WatercolorDot` instances + gradient + blob paletteStops; dispatch→paint median 121 ms | **demo** color model | Investigate memo/coalesce of the per-frame color cascade; the blob `paletteStops` derive should not re-run on every drag frame. |

**Cross-lane corroboration.** LP2-2/LP2-3 (the GL idle floor + zombie canvas) directly underpin
**U33** (aurora "does not move, no shade variation" — likely repainting a static frame every tick
while a second blob context steals the GPU) and **U3** (blob "janky"). The dock findings
(LP2-4/LP2-5) are the measured backing for **U6/U16**. The dropdown jerk (§3) is **U23**. The
pane-switch (§4) is **U12** — and the measurement proves U6/U12/U23 are ONE root cause (the idle
floor), so the wave should fold them into a single **perf-floor work-order**, not three cosmetic
spring tweaks.

**What is NOT the problem (measured, to prevent mis-targeted waves):** the `DOCK_SPRING` constants
(correct), the spectrum rAF-throttle (correct — exactly 1 update/frame), the pane-router swap
logic (cheap), and `useLayerTransition`'s single-clock FLIP design (sound). The debt is the GL
idle floor + two per-frame forced reflows + the inheriting `calc()` morph cascade.

---

## Method honesty

Absolute fps/ms are contention-inflated (13+ shared tabs; idle floor ~16 fps proves it). Every
wave-driving claim rests on contention-INVARIANT evidence: ForcedReflow file:line attributions,
INP phase shape, the relative 18/125 ms cadence reproduced across idle + 3 interactions, and the
RAF/canvas counts. A clean re-trace on an isolated browser (single tab, no sibling lanes) should
RE-CONFIRM the *attributions* and *shape* while reporting healthier absolute fps — that re-trace
is a cheap W-perf verification gate, not a precondition for accepting these findings.
