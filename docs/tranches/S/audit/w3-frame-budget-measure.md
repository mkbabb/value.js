# S.W3 — Frame-budget measurement (the §6.2 gates on the BUILT bundle)

**Spec of record**: `docs/tranches/S/waves/S.W3.md` §Hard-gate 1 + 4 + 5 ·
SYNTHESIS §6.2 budgets · §6.1 P1 oracle rows.
**Purpose**: the authoritative wave-close measurement of the three transition-
family frame budgets + the mix wall-clock, taken on the **built `gh-pages`
bundle** (the §6.2 gates are built-bundle numbers), on the **Apple M5 Max** host
the SYNTHESIS §6.2 baselines were captured on. This file is the "measured on
real hardware" record the renderer-aware e2e specs (`e2e/smoke/perf/`) cite when
they take the software-GL branch.

**Measured at**: `tranche-q` @ `7819526` (S.W3-1/-2/-3/-4/-5/-6/-7/-8 + S.W4
landed). `npm run gh-pages` clean → `dist/gh-pages/` served static on a free
port; driven with Playwright/Chromium.
**Renderer** (WebGL2 `UNMASKED_RENDERER`):
- REAL GPU: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`
- SOFTWARE: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0)), SwiftShader driver)`
**Method**: an in-page rAF inter-frame-delta collector + a `longtask`
PerformanceObserver, armed before navigation; the same interaction idioms the
e2e specs drive (L-channel scrub; dock view-select → Gradient; one-interaction-
then-idle picker; mix seed→run). Nearest-rank percentiles. dpr=1, dark scheme,
1280×800.

---

## §1 — Headline: the §6.2 gates on the built bundle (REAL GPU, M5 Max)

| Transition family | Metric | Baseline (§6.2) | Gate | **Measured** | Verdict |
|---|---|---|---|---|---|
| **slider-drag** | frame p50 | 49.8 ms (~20 fps) | **≤ 20 ms** | **8.4 ms** | **MET** |
| **slider-drag** | long tasks > 50 ms in-drag | 31/44 janked | **0** | **0** | **MET** |
| **view-switch** | first post-click frame | 254.7 ms | **≤ 100 ms** | **8.3 ms** | **MET** |
| **view-switch** | long task | 183 ms | **≤ 50 ms** | **0 ms** | **MET** |
| **idle picker** (blob mounted) | frame p50 | 18.6 ms (54 fps) | **≤ 13 ms** | **8.3 ms** | **MET** |
| **mix** | reveal wall-clock | 2.9 s (jump-cut) | **≤ 1.2 s, one clock** | **1.13 s** | **MET** |
| **mix** | destination announced | — | at the result plate | **6 ms** | **MET** |
| **mix** | spinner grammar | present | retired | **0** | **MET** |

All eight rows MET on the built bundle. The idle p50 8.3 ms is the display's
120 Hz vsync floor — with the blob parked (W3-3) an idle frame costs ~0 above
vsync (the baseline's 18.6 ms was the un-gated ~7 ms/frame blob tax). The
view-switch first frame is the frame-1 container slide only; W3-4 defers the
pane mount to frame 2 (which on real GPU is also < 1 ms — maxTask 0). The
drag p50 is vsync-locked (W3-1's rAF-coalesced fan-out — one derive/frame,
zero jank).

### Mix — one clock, ≤ 1.2 s, reveal at the plate (gate row 4)

The convergence is ONE rAF clock (`useMixingAnimation`, glass-ui `useRAFLoop`);
the phase machine (`useMixingState`) owns no timers and advances only on the
loop's `onSettled` edge (`MIX_CONVERGE_MS = 900 ms`); the epilogue dissolve runs
to `MIX_CONVERGE_MS + MIX_EPILOGUE_MS = 1200 ms`. Measured: the announced ghost
well (`[data-mix-target]`) mounts at **t = 6 ms** (the destination is announced
at the click), the oklab result plate inks in at **t = 1.13 s** (≤ 1.2 s), and
there are **0** `.animate-spin` spinner rows. Safari-true by construction (pure
radial-gradient discs + source-over, no `ctx.filter`) — verified on WebKit by
`e2e/smoke/safari/mix-flow.spec.ts` (passes, zero console errors).

---

## §2 — The same bundle under SOFTWARE GL (SwiftShader) — the recorded caveat

The standing e2e projects force ANGLE-SwiftShader (the headless-stability
requirement, `playwright.config.ts`). Software raster + a ~40 fps compositor
floor CANNOT reproduce the M5 Max numbers by construction — the per-frame WebGL
cost (aurora + spectrum) and the pane mount inflate into hundreds-of-ms tasks
that Metal renders in < 1 ms. Measured on the built bundle, SwiftShader,
across several runs:

| Family | Metric | Software-GL (SwiftShader) | vs §6.2 gate |
|---|---|---|---|
| slider-drag | frame p50 | 58 – 100 ms | (gate 20 ms — hardware) |
| slider-drag | in-drag tasks > 50 ms | 2 – 64 (software raster) | (gate 0 — hardware) |
| slider-drag | longest in-drag task | 299 – 519 ms | freeze-guard ≤ 3000 ms |
| view-switch | first post-click frame | 58 – 216 ms | (gate 100 ms — hardware) |
| view-switch | longest task (pane mount) | 67 – 234 ms | (gate 50 ms — hardware) |
| idle picker | frame p50 | 25 – 100 ms (aurora-bound) | (gate 13 ms — hardware) |

These are software-raster artefacts, **recorded, never a silent re-baseline**
(R lesson 3; S.W3.md §No-workaround). The e2e specs are RENDERER-AWARE
(`e2e/smoke/perf/frame-budget.ts`): they assert the exact §6.2 numbers on the
real-GPU branch and generous freeze/liveness guards on the software branch, and
every run LOGS the measured p50/p95/first-frame against the §6.2 gate — so the
number is always on the record. The idle blob-park itself is proven engine-
independently by the draw-plateau oracle (`webgl-goo-blob-idle.spec.ts`); the
idle-cadence frame p50 gate is the hardware half.

---

## §3 — How the e2e specs run against the built bundle

The `smoke-perf` Playwright project (workers:1, the smoke-reactivity isolation
precedent) targets a static server of `dist/gh-pages` on :8091
(`e2e/smoke/perf/serve-built.mjs`, zero-dep, builds gh-pages if absent) — NOT
the dev server. This is load-bearing: Vite's on-demand module transform charges
a one-time ~1064 ms long task on the first `picker → Gradient` switch under the
dev server that the pre-built lazy chunks do not (built-bundle maxTask 0 ms on
hardware). A dev-server view-switch measurement would be a corrupting
substitution, not just a caveat — hence the perf project drives the real
`gh-pages` output. The real-GPU §6.2 assertions in this file were reproduced by
running the committed specs headed on Metal against :8091 (all 3 green).

---

## §4 — Reproduce

```
npm run gh-pages
# software-GL (the standing harness):
npx playwright test --project=smoke-perf
# real-GPU §6.2 branch (headed, on an M-series / GPU host):
#   a throwaway headed config over the same :8091 built-bundle server —
#   drag p50 8.4 ms · view first-frame 8.3 ms · idle p50 8.3 ms · 0 long tasks.
```
