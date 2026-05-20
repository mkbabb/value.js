# A.W7 — Performance Audit

Close-ceremony performance artefact for tranche A (run by tranche B.W0 Lane C).
Read-only audit: no build was run, no git state was mutated.

## 1. Bundle

`npm run build` was not run for this audit (a sibling process owns the tree).
`dist/` exists and is current relative to source: no file under `src/*.ts` is
newer than `dist/value.js` (mtime 2026-05-18 23:04). The directory is a *mixed*
output — it holds the library build alongside leftover `gh-pages` demo chunks.

### Library bundle — measured

| Artefact            | Size      | Notes                                          |
|---------------------|-----------|------------------------------------------------|
| `dist/value.js`     | 139,306 B | ESM, minified, `console`/`debugger` dropped    |
| `dist/value.js`     | 39,435 B  | gzipped (estimate, `gzip -c`)                  |
| `dist/value.cjs`    | absent    | not a build target — see below                 |
| `dist/value.d.ts`   | absent    | declarations are split per-module — see below  |
| `.d.ts` (all, total)| 104,324 B | 30 files across `parsing/ units/ quantize/ transform/` |

### Why `value.cjs` and `value.d.ts` are absent — by design, not stale

- `vite.config.ts:65-70` — the library `lib` block declares `formats: ["es"]`.
  Only an ESM `value.js` is emitted; there is no CJS target. The W7 brief's
  expectation of a `value.cjs` does not match the build config. This is not a
  regression; it is the configured surface.
- `vite.config.ts:78` — `dts({ include: ["src/"] })` emits one `.d.ts` per
  source module (`dist/index.d.ts`, `dist/parsing/*.d.ts`, `dist/units/**.d.ts`,
  …), mirroring the `src/` tree. There is no rolled-up single `value.d.ts`.
  `dist/index.d.ts` (5,779 B) is the type entry point that re-exports the rest.

### Demo chunks present in `dist/` (not library)

`dist/postcss-BrHISTov.js` (202,445 B) and `dist/standalone-JqHlnZSs.js`
(112,157 B) are `gh-pages` demo-build vendor chunks (PostCSS, highlight.js
`standalone`). They are not part of the library surface and are excluded from
the library-size figures above. Their presence confirms `dist/` was last
populated by a `gh-pages` build that did not `emptyOutDir` the prior library
output — cosmetic, not a correctness issue, but worth a clean rebuild before
publish so `dist/` contains only library artefacts.

### Source-size proxy (cross-check)

`src/` totals 307,401 B across 31 `.ts` files (excluding `.d.ts`). The
139 KB minified / 39 KB gzipped library is the expected compression of that
surface with `vue` and `@mkbabb/parse-that` held external
(`vite.config.ts:71-73`). Runtime dependency footprint is one package
(`@mkbabb/parse-that`); `vue` is a peer/external and not bundled.

### Bundle verdict

Library bundle is healthy: **139 KB raw / ~39 KB gzipped ESM**, tree-shakeable
(named exports only), externals correctly excluded. Two non-findings worth
recording so tranche B does not re-chase them: (a) no `value.cjs` is a config
choice, not a missing artefact; (b) declarations are split per-module by `dts`,
not a single `value.d.ts`. One housekeeping item: rebuild with a clean `dist/`
before publish to drop the stale `gh-pages` demo chunks.

## 2. Frame budget — goo-blob renderer

File audited: `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts`.
HARDEN-5 raised dual-WebGL GPU contention (goo-blob + glass-ui aurora running
concurrently). The frame-budget question is whether goo-blob's RAF loop is
disciplined: vsync-paced, reduced-motion-aware, and idle when the tab is hidden.
All three landed in A.W5; the code confirms them.

### RAF pacing — one frame per vsync, not a busy loop

The loop is a classic single-rescheduled `requestAnimationFrame` chain. `render`
is entered once per vsync; it does its work and reschedules exactly once at the
tail (`useMetaballRenderer.ts:242`, `rafId = requestAnimationFrame(render)`).
There is no `setTimeout`, no `while` pump, no double-schedule. `start()` seeds a
single `requestAnimationFrame(render)` (`:271`). Each early-return path that
keeps the loop alive reschedules exactly once and only once — the paused/hidden
branch (`:155`) and the not-yet-initialised branch (`:169`). One frame in
flight at all times: correct vsync pacing.

`startTime`/`lastFrameTime` give a real per-frame `dt` (`:160-162`) passed to
`mood.tick(dt)`, so animation is time-based, not frame-count-based — behaviour
stays correct if the GPU drops the blob below 60 fps under aurora contention.

### `prefers-reduced-motion` — single static frame, loop never armed

`prefersReducedMotion` is read once at composable setup (`:74-76`). When set:

- `start()` renders exactly one frame via `requestAnimationFrame((now) =>
  render(now))` (`:269`) and never assigns `rafId` — the continuous loop is
  never armed.
- `render()` skips its tail reschedule: the final `requestAnimationFrame` is
  guarded by `if (!prefersReducedMotion)` (`:241-243`). After the single frame
  the loop terminates.
- Colour changes still repaint: a dedicated `watch(color, …)` (`:319-324`)
  fires one `requestAnimationFrame(render)` per change so the static frame
  tracks the model. This is a one-shot repaint, not a resumed loop.

Reduced-motion is honoured correctly: zero ongoing GPU work, one frame on mount,
one frame per colour edit.

### Tab-hidden — idle

`onVisibilityChange` (`:246-248`) tracks `document.hidden` into `tabHidden`;
the listener is registered in `start()` (`:262`) and `tabHidden` is also seeded
immediately (`:263`). In `render()`, `if (paused || tabHidden)` (`:154-157`)
short-circuits before any GL work: no uniform uploads, no `drawArrays`, no
`cssColorToRgb`. The loop keeps a heartbeat `requestAnimationFrame` alive while
hidden (`:155`) — note browsers throttle RAF in background tabs to ~1 Hz or
pause it, so this heartbeat is near-zero cost and resumes promptly on
re-show. No GPU frames are produced while hidden. Correct idle behaviour.

A `pause()`/`resume()` pair (`:330-331`) gives callers a manual idle gate using
the same `paused` short-circuit — useful when the aurora surface needs the GPU
exclusively.

### Teardown — no leaked frames or contexts

`destroy()` (`:294-313`) sets `destroyed`, cancels the pending `rafId`,
disconnects the `ResizeObserver`, removes listeners, and deletes the GL buffer /
VAO / program. `render()` also re-checks `destroyed` at entry (`:153`) and
`canvasRef.value` mid-frame (`:183-184`) and returns *without* rescheduling if
the component tore down inside an already-dequeued frame. Context-loss is
handled: `webglcontextlost` cancels the loop, `webglcontextrestored` re-inits
and restarts (`:275-292`). No leaked RAF chain, no orphaned GL context — this
directly de-risks the HARDEN-5 dual-WebGL contention concern.

### Frame-budget verdict

PASS. The goo-blob RAF loop is correctly vsync-paced (single rescheduled frame,
time-based `dt`), honours `prefers-reduced-motion` (one static frame, loop never
armed, repaint-on-colour-change), idles on tab-hidden (GL work short-circuited
before any draw), and tears down cleanly with no leaked frames or GL contexts.
All three A.W5 disciplines are present and verified in code.

## 3. Per-frame allocation hot-spots

Minor. The `render()` body is largely allocation-free — uniform uploads are
scalar `gl.uniformNf` calls and the satellite loop indexes pre-resolved
location arrays. Two allocations per frame:

- **`useMetaballRenderer.ts:174` — `cssColorToRgb(color.value)` returns a fresh
  3-element array literal every frame** (`return [r, g, b]` at `:59`). One small
  `Array(3)` per frame. The function also touches the 2D canvas — `clearRect`,
  `fillRect`, `getImageData` (`:55-58`) — and `getImageData` allocates an
  `ImageData` + backing `Uint8ClampedArray` internally each call. This is the
  single real hot-spot: a full CSS-colour resolve runs every frame even when
  `color.value` is unchanged.
  - *Suggested follow-up (tranche B, not in scope here):* memoise on
    `color.value` — cache the last input string and its resolved RGB, skip the
    canvas round-trip when unchanged. The shader uniform `uBaseColor` only needs
    re-upload when the colour actually changes.
- The satellite loop reads `sats[i]` (`:224`) and the `?? null` fallbacks
  (`:221-223`) — no allocation, indexes only.

No object literals, no closures, and no array spreads are created inside the
hot path beyond the `cssColorToRgb` return. Allocation pressure is low; the
canvas-resolve-per-frame is the one item worth addressing, and it is a
correctness-neutral optimisation, not a frame-budget failure.

## Summary

- Library bundle: `dist/value.js` 139,306 B raw / ~39,435 B gzipped (ESM).
- `value.cjs` and a single `value.d.ts` are absent *by design* — ESM-only build,
  per-module `dts` output (30 `.d.ts`, 104,324 B total). Not regressions.
- `dist/` carries stale `gh-pages` demo chunks — rebuild clean before publish.
- Frame budget: PASS — RAF vsync-paced, `prefers-reduced-motion` honoured
  (static frame), tab-hidden idle, clean teardown. A.W5 disciplines verified.
- Hot-spot: `cssColorToRgb(color.value)` runs a full 2D-canvas colour resolve
  plus a 3-element array allocation every frame regardless of whether the colour
  changed (`useMetaballRenderer.ts:174`, `:53-60`). Memoise on input — tranche B.
