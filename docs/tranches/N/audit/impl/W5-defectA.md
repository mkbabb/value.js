# N.W5 Defect-A — the WebGL2 software-GL pointer-interaction hang

**Lane:** N.W5-remediation / Defect-A (the W2-gate WebGL renderer crash under
headless software rendering).
**Branch:** `tranche-f-handoff` · **Date:** 2026-06-12.
**Substrate:** W2 closed at `cfb206c`; W2-gate (`W2-gate.md §3.2`) dispositioned
two app defects to N.W5. This lane owns **Defect-A**. (Defect-B — the dock
view-select open — is the sibling lane.)
**Authority used:** PAIRED-AUTHORSHIP — one scoped glass-ui source fix, committed
separately in glass-ui as `e59987ae` (precedent `537c7f80`), dist rebuilt.

---

## §0 — Verdict

Defect-A is **FIXED at the true root**. The formerly-crashing interaction
(`reactivity-instant.spec.ts` spectrum-drag) now runs clean headless under the
playwright SwiftShader harness — `smoke-reactivity` is **2/2 GREEN** (spectrum-drag
median **3.20 ms**, the previously-not-run slider-keyboard now runs at 9.50 ms),
my minimal repro **survives 3/3 consecutive runs**, and the atmosphere **still
paints** (composited-pixel + screenshot evidence). Gates: **typecheck 0 · lint 0 ·
boot-smoke PASS.** No workaround, no WebGL-disable mask, no force-click.

---

## §1 — Reproduction (minimal, deterministic)

Served the demo (`npx vite --port 939x`), drove headless Chromium with the EXACT
`playwright.config.ts` launch flags (`channel:"chromium"`,
`--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`), and ran the
crashing interaction from `reactivity-instant.spec.ts` (the spectrum-drag mouse
sequence).

**Signature (corrected from W2-gate's "renderer death" reading):** it is NOT a
silent renderer *crash* — it is a **renderer main-thread HANG**. The first real
`page.mouse.down()`/`move()` over the spectrum **never returns** (the spec's
`mouse.move` 30 s timeout; my wall-raced repro: a 6 s `mouse-hang`). A
`page.evaluate(() => performance.now())` issued during the hang also never returns
— the renderer is not servicing JS/input at all. `--disable-webgl` degrades
gracefully (no hang), confirming the WebGL render path is implicated.

`UNMASKED_RENDERER_WEBGL` reads `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device
(LLVM 10.0.0)), SwiftShader driver)` — i.e. a software rasteriser.

## §2 — Root cause (isolated by controlled live experiments)

Live context inventory: **3 live WebGL2 contexts** — the aurora atmosphere
(`canvas.absolute.inset-0`, full-viewport, 1280×720) + **2** `goo-blob-canvas`
(one visible 179×179, one inside `div.pane-wrapper.hidden` = `display:none` with a
live 200×200 backing store — the responsive dual-pane mobile/desktop duplication
in `App.vue` keeps BOTH picker panes mounted).

Each lever was tested in the live page by `WEBGL_lose_context` / neutering / hiding,
then re-driving the real pointer drag (wall-raced). The decisive results:

| Experiment | Result | Reading |
|---|---|---|
| baseline | **HUNG** | — |
| lose the **aurora** context | **OK** | the aurora full-viewport GL layer IS the lever |
| lose **both blob** contexts | HUNG | the blobs are NOT the lever |
| lose the surplus (display:none) blob | HUNG | the surplus context is real waste but not the lever |
| shrink aurora backing store to 320×180 | HUNG | NOT a raster-resolution problem |
| `display:none` / `visibility:hidden` / CSS-1×1 the aurora canvas (ctx alive) | HUNG | NOT the CSS box / composited-region size |
| neuter only the aurora `gl.clear+drawArrays` (ctx + layer alive) | HUNG | a static-but-live GL layer still hangs |
| `prefers-reduced-motion: reduce` (aurora parks after 1 frame) | HUNG | a parked-but-live GL layer still hangs |
| freeze ALL rAF (no GL command stream) | OK | (consistent — stops touching the live layer) |
| simulate `renderMode:"css"` (no aurora GL context at all) | **OK** | **only NOT creating the surface cures it** |

**Mechanism:** a full-viewport WebGL2 canvas is a compositor layer the rasteriser
must re-raster on every composite. Under a **software** rasteriser that
per-composite cost is so high that a REAL pointer interaction — which forces a
composite — starves the renderer's input ack and the main thread goes
unresponsive. Frame-cadence caps, backing-store shrinks, and reduced-motion parks
all keep the **live GL layer**, so none cure it; ONLY not creating the WebGL
surface does. This is the genuine experience a user on a GPU-blocklisted machine
(forced to SwiftShader) rides — severe interaction jank, not just a CI artifact.

(A first attempt — a software-renderer frame-cadence cap in glass-ui's
`createCanvasLifecycle` — was implemented, unit-tested, and then **reverted**: the
live evidence above proved cadence is not the lever. KISS; no dead mechanism left
behind.)

## §3 — Fix (at the true root, two coherent parts)

### (a) glass-ui — the durable library fix · committed `e59987ae`

`resolveRenderMode("auto")` already downgrades to the static CSS-gradient
placeholder substrate (`"css"`) on low-power signals
(`hardwareConcurrency<=4` / `prefers-reduced-motion` / `saveData`). This lane adds
a **SOFTWARE-WebGL signal**: a one-shot throwaway-context
`WEBGL_debug_renderer_info` probe matching `swiftshader|llvmpipe|software|basic
render|microsoft basic`. On a software renderer `"auto"` now resolves to `"css"`,
so the aurora NEVER arms a full-viewport WebGL2 surface — the placeholder (a
complete render of the same palette) is the atmosphere. Failing the probe keeps
`"webgl"` (no false downgrade). File:
`../glass-ui/src/components/custom/aurora/constants/renderMode.ts`. +7-test suite
`tests/components/custom/aurora/render-mode.test.ts`.
- glass-ui gates: `npm run typecheck` 0; aurora suite **70/70** (incl. new 7);
  `webgl` suite **82/82**; pre-commit `proof:live-verified-ledger` 0 violations.
- Committed SEPARATELY in glass-ui, message attributes the value.js N motivation;
  AZ/BA in-flight docs work untouched (scoped `git add` of the 2 files only); dist
  rebuilt (`npm run build` → aurora.js + flattened d.ts). `dist/` is git-ignored
  (build artifact), so only the 2 source files are committed.

### (b) value.js demo — consume the adaptive substrate

The demo drives `useAurora` directly on a bare root canvas (it does not use the
`<Aurora>` component), and previously hard-forced the WebGL path. `App.vue` now:
1. resolves `const auroraRenderMode = resolveRenderMode("auto")` once at setup,
2. passes `{ renderMode: auroraRenderMode }` as `useAurora`'s adaptive option (so
   on software/low-power GL it never creates the WebGL context), and
3. paints the `paletteToCssGradient(resolveAtoms(auroraAtoms).palette)` on the
   atmosphere canvas via `:style` when the resolved mode is `"css"` (the `<Aurora>`
   placeholder idiom — same derived palette, the live picker seed still flows in).

On a real GPU (`"webgl"`) `auroraCssGradient` is `undefined` and behaviour is
byte-identical to before — zero change for normal users. `App.vue` 369 LoC (≤ 400
god-module cap). The animation precept holds: no custom animation deleted; the
WebGL field is *substituted* by its own palette gradient only on the blocklisted
path.

File: `demo/color-picker/App.vue` (+36 / −4).

## §4 — Proof

- **`smoke-reactivity` 2/2 PASS** (`npx playwright test --project=smoke-reactivity`):
  spectrum-drag median **3.20 ms** (was a 30 s renderer hang); slider-keyboard
  (previously did-not-run) **9.50 ms** PASS.
- **`smoke` atmosphere/page-load/goo-blob 3/3 PASS** — `webgl-atmosphere.spec.ts`
  ("warms up without webglcontextlost") passes on merit: the canvas is attached +
  carries the gradient, and NO WebGL context is created so no `webglcontextlost`.
- **Minimal repro 3/3 consecutive runs** (post-fix): each run reports the aurora
  WebGL2 context ABSENT (`glContexts: ["(none)","goo-blob-canvas","goo-blob-canvas"]`
  — no `inset-0`), `auroraHasGradient: true`
  (`linear-gradient(135deg, rgb(156,128,141) 0%, …)`), `drag: OK`, `crashed: false`.
- **Atmosphere still paints** (composited-pixel + screenshot `/tmp/prove-atmosphere.png`):
  the mauve/rose gradient field + lit-glass picker card + the visible goo-blob (still
  WebGL, not the lever — it survives interaction).
- **Gates:** `npm run typecheck` 0 · `npm run lint` 0 · `npm run boot-smoke` PASS
  (combined working tree, i.e. coexisting with the sibling Defect-B changes).

## §5 — Files touched

- **value.js:** `demo/color-picker/App.vue` — the adaptive-substrate consume + the
  CSS-gradient fallback paint (§3b). NO git commit/push (the lead integrates).
- **glass-ui (committed `e59987ae`):**
  `src/components/custom/aurora/constants/renderMode.ts` (+the software-renderer
  signal) · `tests/components/custom/aurora/render-mode.test.ts` (new, 7 tests).
  Dist rebuilt on disk (git-ignored).
- This report.

## §6 — Standing notes / handoffs

- **Surplus display:none blob context (a real waste, NOT this hang's lever):** the
  responsive `lg:hidden` + `pane-wrapper hidden` dual-pane layout in `App.vue`
  keeps BOTH picker panes mounted, so the off-breakpoint pane holds a live 200×200
  goo-blob WebGL2 context that paints nothing. It does not gate Defect-A (the drag
  survives with both blobs present once aurora is CSS), but it is a context-budget
  waste worth a fix in the dual-pane-layout territory (sibling Defect-B / a W6
  layout pass) — render one pane variant per reactive breakpoint, or gate the
  off-breakpoint blob.
- **W2-gate signature correction:** Defect-A is a renderer main-thread HANG (input
  starvation), not a silent renderer-process crash — both manifest as "every
  downstream locator times out," but the cause is a blocking composite under
  software GL, fixed by not creating the full-viewport GL surface there.
