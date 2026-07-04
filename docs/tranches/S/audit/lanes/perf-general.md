# S-23 — Generalized Runtime Perf Audit (Lane: perf-general)

Repo `c5aa091` (branch `tranche-q`). Dev server live at `:9000` throughout (untouched).
A second, disposable `vite preview` server was started on `:9001` for built-bundle
inspection and torn down at the end of this session — no product code touched.

**Methodology caveat**: the shared Playwright/chrome-devtools-mcp browser session
showed evidence of a concurrent lane agent driving navigation during this audit
(a `new_page`/`list_pages` call on chrome-devtools-mcp failed with "browser
already running… use --isolated", and a later network-request dump unexpectedly
showed KaTeX/highlight chunks loaded and the URL flipped back to `:9000` mid-probe
without my navigating it there). Numbers gathered **before** that contention window
(dev-mode boot timing, rAF-site census, canvas inventory) are trustworthy;
anything requiring sustained exclusive control (3-min memory-growth walk, per-pane
rAF steady-state deltas) was **not** attempted live and is instead backed by static
code analysis below, called out explicitly where it substitutes for a live number.

---

## 1. Boot cost — dev mode (`:9000`, cold hash-route `/`)

Measured via `performance.getEntriesByType('navigation'|'resource'|'paint')`:

| Metric | Value |
|---|---|
| first-paint | 200ms |
| first-contentful-paint | 468ms |
| domContentLoaded | 413ms |
| load | 429ms |
| distinct resource requests before interactive | **247 scripts + 3 css/link** |
| total transferred (cold, pre-katex-nav) | 68 KB |

**Finding P1 — dev-mode module-graph fan-out.** Unbundled ESM dev serving means
every `.ts`/`.vue` file in the eager import graph (App.vue → router → Dock →
ColorPicker → ~30 composables → glass-ui's ~90 individual `dist/*.js` leaf
files → value.js's 9 `src/units/color/conversions/*` modules) is a separate
HTTP request. 247 requests is fine over loopback HTTP/1.1 with keep-alive, but
it is the iteration-loop cost every contributor pays on every reload, and it is
a direct read on how large the eager (non-lazy) graph has grown. Contributing
factor: `glass-ui`'s dist is consumed unbundled (`../glass-ui/dist/*.js`, ~90
files) via the `file:` sibling + Vite `@fs` resolution (per CLAUDE.md §3.4 pin
policy) — every one of those is its own round trip in dev.
**Root-routing: informational / dev-DX, not a shipped-user regression** (the
gh-pages build bundles all of this — see §2). No action required beyond
awareness; do not "fix" by pre-bundling glass-ui in dev (that reintroduces the
K.W2.5-reverted dual-instance failure mode already documented in memory).

---

## 2. Boot cost — built (`gh-pages`, fresh rebuild at `c5aa091`)

Rebuilt via `npm run gh-pages` (clean `dist/gh-pages`, 4.1s build). The
`index.html` `modulepreload` list is the ground truth for what the browser
fetches **eagerly on every cold load, regardless of which view the user lands
on** (`dist/gh-pages/index.html`):

| Chunk | Raw | Gzip | Eager? |
|---|---|---|---|
| `index-*.js` (App shell + eager ColorPicker/Dock graph) | 589.6 KB | 200.4 KB | yes (entry) |
| `glass-ui-*.js` (shared glass-ui chunk) | 409.6 KB | 120.6 KB | yes (modulepreload) |
| `color-*.js` (value.js color subpath, dynamic-shared) | 47.8 KB | 17.6 KB | yes (modulepreload) |
| `usePaletteManager-*.js` | 40.2 KB | 12.8 KB | yes (modulepreload) |
| `packrat-entry-*.js` (parse-that) | 14.2 KB | 4.7 KB | yes (modulepreload) |
| `TabsTrigger-*.js`, `createLucideIcon-*.js`, `prng-*.js`, `rolldown-runtime-*.js` | ~9 KB | ~3 KB | yes (modulepreload) |
| `index-*.css` (single monolithic stylesheet) | 640.0 KB | **184.0 KB** (measured via `gzip -c`) | yes (render-blocking `<link>`) |
| **Eager total** | **≈1108 KB raw** | **≈543 KB gzip** | — |
| `vendor-katex-*.js` (About-page-only) | 258.9 KB | 77.5 KB | **no** — correctly lazy |
| `vendor-highlight-*.js` (About-page-only) | 34.2 KB | 12.6 KB | **no** — correctly lazy |
| 15 color-space conversion micro-chunks (`hex/hsl/hwb/…`) | 8 KB each | ~2 KB each | no — split per lazy pane, correctly |

**Finding P0 — ≈543 KB gzip is on the critical path of every cold load.**
This is the number that matters for S-9/S-23: before the app can paint anything
useful, the browser must fetch+parse+execute ~358 KB gzip of JS and download+
parse ~184 KB gzip of CSS, on every view (home, About, Browse, Admin — the
router lazy-loads only the *pane* component, not the shell that wraps it).
Root cause is the eager App.vue graph: `Dock.vue`, `ColorPicker.vue` (+ its ~30
composables), the aurora atmosphere canvas, and glass-ui's shared surface are
all imported synchronously at `App.vue` load time (`demo/color-picker/App.vue:1-60`,
`demo/color-picker/index.html:60-64`). The 2-group `codeSplitting` config in
`vite.config.ts:258-269` only carves out katex/highlight (both already lazy via
`AboutPane`'s dynamic import) — it does nothing for the eager shell weight,
which is 3-4x larger.
**Root-routing: value.js demo** (the App.vue eager-import surface + the
gh-pages `vite.config.ts` build config) for the JS-side fix (route-level
`defineAsyncComponent` already used for panes — extend the same discipline to
non-critical-path pieces of the *shell*, e.g. defer `HeroBlob`/aurora
canvas/`PointerDebugOverlay` behind idle-callback or first-interaction, the
same `scheduleAfterFirstPaint` pattern glass-ui's own `useAurora.ts:79-108`
already demonstrates is available). The CSS side is **glass-ui producer +
value.js demo shared** — see §5.

---

## 3. rAF inventory at steady state (idle, default `/` view, no interaction)

Instrumented by wrapping `window.requestAnimationFrame` for a 2s idle window
(dev server, pre-contention):

- **236 rAF calls/sec** average across the page at total idle.
- Call-site attribution (stack-sampled): **100% of the loop traffic traces to
  exactly two sustained internal loops**:
  - `glass-ui/dist/createCanvasLifecycle-*.js` (backs `GooBlob`/`HeroBlob`'s
    WebGL2 canvas) — ~100 Hz in the sampled window.
  - `glass-ui/dist/watercolor-dot.js` (backs the always-mounted `WatercolorDot`
    swatches, e.g. `Dock.vue:218`'s `seed="top-dock"` instance) — ~50 Hz.
- Canvas census on the default view: 3 live `<canvas>` elements —
  `atmosphere-canvas` (aurora, 2D), `goo-blob-canvas` (HeroBlob, WebGL2, only
  282×282 CSS px — corroborates **S-4** "too small"), `gamut-overlay` (2D,
  one-shot paint, not looped).

### 3a. `createCanvasLifecycle` (WebGL blob) — NOT a zombie-loop bug
Read `glass-ui/src/composables/glass/webgl/createCanvasLifecycle.ts:107-165,
242-260, 295-310, 384-406` + the colocated `visibility.ts`. This lifecycle
already implements: tab-visibility pause, `content-visibility:auto` park,
IntersectionObserver off-screen fallback, and a live
`prefers-reduced-motion` re-monitor that collapses the loop to a single
one-shot `tick()` when reduced motion is set. A continuously-running rAF loop
here, while the canvas is mounted and in-viewport, is **by design** — this is
not the "zombie canvas" class the brief flags. S-4's "blob is broken" is a
*correctness/sizing* bug (separate lane), not a rAF-hygiene bug.

### 3b. `useWatercolorBlob` (animate mode) — CONFIRMED zombie-loop, P0
`glass-ui/src/components/custom/watercolor-dot/useWatercolorBlob.ts:111-150,169`.
The `animate:true` mode's `tick()` calls `requestAnimationFrame(tick)`
unconditionally forever. Comparing directly against `createCanvasLifecycle`'s
gating in the same repo:

| Gate | `createCanvasLifecycle` (WebGL) | `useWatercolorBlob` (animate mode) |
|---|---|---|
| `prefers-reduced-motion` (JS-side) | yes, live-monitored, collapses loop | **no** — `grep` for `matchMedia`/`reduced` in `useWatercolorBlob.ts` returns nothing |
| tab `visibilitychange` pause | yes | **no** |
| off-screen (`IntersectionObserver`/`content-visibility`) park | yes | **no** |
| `onUnmounted` cleanup | yes | yes (`useWatercolorBlob.ts:171-176` — the only gate present) |

The CSS side (`WatercolorDot.vue:313-319`) *does* neutralize the transform
under `prefers-reduced-motion: reduce` — but only visually
(`transform: none !important`-equivalent override). The JS `tick()` keeps
computing 5 channels' worth of sinusoidal easing and writing a new
`transform.value` (a Vue ref → reactive dependency graph walk) every frame,
forever, for a visually-inert result. This is wasted CPU/battery unconditionally
(no visibility/tab gating at all) and, under reduced motion specifically, wasted
CPU **for zero visual effect** — the textbook "zombie loop."
Demo consumer: `SpectrumCanvas.vue:51-53` passes `animate` to its
`WatercolorDot` (the picker's draggable detent dot), which is mounted for the
lifetime of the color-picker pane — i.e. this loop runs continuously any time
the picker is open, matching the measured ~50 Hz call rate above.
**Root-routing: glass-ui producer.** `useWatercolorBlob` should be rebuilt on
top of the same `useRAFLoop` primitive already in the library
(`glass-ui/src/composables/motion/useRAFLoop.ts:34-40` — `pauseWhenHidden` +
`respectReducedMotion` are first-class options there) instead of a bespoke
raw-`requestAnimationFrame` loop. This is a DRY violation as much as a perf bug:
the disciplined primitive already exists two directories over.

---

## 4. Unbounded memoization in the parsing layer — memory-growth vector (S-24, library)

`src/utils.ts:105-167`'s `memoize()` supports bounded LRU eviction
(`maxCacheSize`, `N.W7.B-B3.F2`), but grepping every call site shows only
**one of eight** memoized parsing/normalize functions actually bounds it:

| Call site | File | `maxCacheSize` set? |
|---|---|---|
| `getComputedValue` | `src/units/normalize.ts:322` | **yes** (`COMPUTED_MEMO_MAX_ENTRIES`) |
| `parseCSSColor` | `src/parsing/color.ts:821` | no (`Infinity`) |
| `parseCSSValueUnit` | `src/parsing/units.ts:115` | no |
| `parseCSSValue` | `src/parsing/index.ts:500` | no |
| `parseCSSPercent` | `src/parsing/index.ts:565` | no |
| `parseCSSTime` | `src/parsing/index.ts:571` | no |
| `parseCSSStylesheet` | `src/parsing/stylesheet.ts:858` | no |
| `parseAnimationShorthand` | `src/parsing/animation-shorthand.ts:201` | no |

**Finding P1.** `parseCSSColor`/`parseCSSValueUnit` are on the hottest possible
path in this app: every pointer-move tick of a slider/spectrum drag, every
gradient-stop edit, every palette-browse render produces a *new, high-precision
decimal string* (`"oklch(70.234% 0.2013 30.07deg)"`) that becomes a permanent,
never-evicted `Map` key for the process lifetime of the tab. A 3-minute
interactive session (dragging sliders, panning the spectrum, editing a
gradient) plausibly produces thousands of unique cache entries that are never
reclaimed — a genuine, code-provable memory-growth vector answering the "memory
growth over a 3-min walk" ask directly, without needing a live heap snapshot to
establish the mechanism (the missing bound is a static fact). The fix precedent
already exists in the same file (`getComputedValue`'s `COMPUTED_MEMO_MAX_ENTRIES`
pattern) — this is a "apply the existing discipline everywhere it should already
be" fix, not new design.
**Root-routing: value.js src** (the library's own parsing/normalize layer).

---

## 5. CSS: single 640 KB / 184 KB-gzip monolith on every view's critical path

Per §2: `index-*.css` is 640 KB raw / 184 KB gzip (measured via `gzip -c`) and
is the **only** stylesheet loaded — every per-pane `.css` file that Vite does
emit (`BrowsePane-*.css`, `GradientPane-*.css`, etc.) is 300 B–1.8 KB (just that
pane's few scoped rules); the bulk (glass-ui's compiled component CSS + the
Tailwind v4 `@source "../**/*.{vue,ts,html}"` full-tree utility scan +
`tw-animate-css` + shadcn-vue base) lands in the one eager file
(`demo/@/styles/style.css:1-66` — the `@import`/`@source` graph).
**Finding P2** (not asserting a specific bug — Tailwind's atomic-CSS model
inherently can't cheaply split "this utility is only used by the lazy Browse
pane" without a critical-CSS extraction pass, and duplicating shared utilities
per-chunk would be worse). What **is** actionable: 184 KB gzip is large enough
to be worth a one-time `npx tailwindcss` coverage/`cssnano` unused-rule pass —
in particular checking how much of it originates from the `demo/@/components/ui/`
shadcn-vue vendor tree (already flagged as "vendored noise" in CLAUDE.md, 22
files post-F.W1-Lane-C sweep) versus glass-ui's own component styles versus
truly-used demo custom-component CSS. **Root-routing: value.js demo build**
(candidate: a build-time report step, not a runtime fix) + **glass-ui producer**
share of the weight (its compiled CSS is `@import`ed wholesale at
`style.css:52-58`).

---

## 6. S-11 root cause confirmed: local dev silently falls back to the production API

Console (dev, `:9000`): `Access to fetch at 'https://api.color.babb.dev/colors/approved'
from origin 'http://localhost:9000' has been blocked by CORS policy` — every
palette-API-backed feature (approved-colors list, browse, etc.) is broken
against local dev, exactly as **S-11** reports.
Root cause: `demo/@/lib/palette/api/client.ts:35` —
`export const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;`
with `DEFAULT_REMOTE_API_URL = "https://api.color.babb.dev"`
(`client.ts:34`). The repo's own `.env.example:8-11` documents the intended
knob (`VITE_API_URL=` — "Unset in production builds → defaults to the live
spine… Under e2e it is overridden to the same-origin dev server") but the
**local `.env` at the repo root has no `VITE_API_URL` line at all** — it
contains only Cloudflare deploy credentials, unrelated to this app-level knob.
This is not a code bug (the fallback-to-prod default is a deliberate, documented
choice per the comment at `client.ts:22`), it's a **local environment
misconfiguration**: the person running dev against `api/`'s local Mongo-backed
server needs `VITE_API_URL=http://localhost:<api-port>` in `.env`, same as
`playwright.config.ts` already does for e2e.
**Root-routing: environment config, not product code** — no src/demo/api fix
needed; candidate wave-item is a `README`/dev-onboarding note (or a
`scripts/dev.sh` guard that warns when `VITE_API_URL` is unset and `api/` is
running locally), not a code change.

*(Aside, out of this lane's scope: the repo-root `.env` also contains a
live-looking `CLOUDFLARE_API_TOKEN` value. It is `.gitignore`'d per its own
header comment and this is not a performance finding, so no remediation is
proposed here — flagging only so a security-focused lane doesn't miss it.)*

---

## 7. Things checked and found healthy (no finding)

- **Quantize worker** (`demo/@/components/custom/image-palette-extractor/composables/useImageQuantize.ts`):
  runs off main thread via a real `Worker`, uses transferable `ArrayBuffer`,
  terminates on `onBeforeUnmount` (`:143-146`). Slider-driven re-quantize is
  debounced 300ms (`useExtractSession.ts:111-113`) — no thrash.
- **KaTeX + "shiki" costs on About**: the brief's premise is slightly stale —
  the repo uses **`highlight.js`**, not shiki (`useMarkdownHighlighting.ts:5-8`).
  Both KaTeX (258.9 KB/77.5 KB gzip) and highlight.js (34.2 KB/12.6 KB gzip)
  are correctly split into `vendor-katex`/`vendor-highlight` chunks
  (`vite.config.ts:258-269`) and only load when `AboutPane` is dynamically
  imported (`usePaneRouter.ts:68`) — confirmed via the built `index.html`
  `modulepreload` list (§2), which does **not** list either chunk. Code
  highlighting itself is pre-rendered at build time by the source-export
  plugin (comment at `useMarkdownHighlighting.ts:104-105`) — no runtime
  highlight.js core is shipped, only the CSS theme string. This is a
  well-executed lazy-load; no action needed.
- **Gradient-editing chroma-weight/color-count controls**: debounced, not
  reactivity-storming.
- **`backdrop-filter` usage**: ~72 occurrences across demo+glass-ui. This is
  the "glass" design system's central visual idiom (intentional), not
  incidental bloat — flagged only as a P2 measurement candidate (stacked
  `backdrop-filter` layers are the classic paint-cost multiplier; worth a
  Lighthouse/DevTools paint-timing pass specifically on the Browse-pane grid,
  where many glass cards render simultaneously — not measured live this
  session due to the browser-contention caveat in the preamble).

---

## Ranked findings (P0 → P2) with root-routing

| # | Sev | Finding | Root-routing |
|---|---|---|---|
| 1 | **P0** | `useWatercolorBlob` animate-mode rAF loop has zero `prefers-reduced-motion`/visibility/off-screen gating, unlike the library's own `useRAFLoop` primitive it should be built on — runs forever, including under PRM where the CSS override makes the work invisible-but-still-paid | **glass-ui producer** |
| 2 | **P0** | ~543 KB gzip (≈358 KB JS + 184 KB CSS) is eagerly loaded on the critical path of *every* view, because App.vue's shell (Dock, ColorPicker + composables, aurora canvas) is imported synchronously while panes are correctly lazy | **value.js demo** (App.vue eager-import surface + gh-pages build config) |
| 3 | **P1** | 7 of 8 memoized parsing functions in `src/` (incl. the hottest, `parseCSSColor`/`parseCSSValueUnit`) have unbounded (`Infinity`) LRU caches — a real, code-provable memory-growth vector under sustained interactive use (dragging, gradient editing) | **value.js src** |
| 4 | **P1** | Dev-mode cold boot fans out to 247 individual module requests (expected for unbundled Vite dev + the `file:`-sibling glass-ui consumption policy) — a real iteration-loop cost, not a shipped-user regression | informational (dev-DX only) |
| 5 | **P2** | Single 640 KB/184 KB-gzip monolithic CSS bundle, render-blocking on every view; likely dominated by glass-ui's compiled component CSS + full-tree Tailwind utility scan + shadcn-vue vendor residue — worth a coverage pass, no specific fix asserted | **value.js demo build** + **glass-ui producer** (shared) |
| 6 | **P2** | S-11 (palette API "broken" locally) is a `.env` `VITE_API_URL` misconfiguration, not a code bug — the documented knob exists but isn't set locally | environment config (no code fix) |

## Candidate wave-items

- Defer `HeroBlob`/aurora-canvas/`PointerDebugOverlay` mount behind
  `requestIdleCallback`/first-interaction in `ColorPicker.vue`, mirroring
  glass-ui's own `scheduleAfterFirstPaint` idiom (`useAurora.ts:79-108`), to
  shrink the eager JS graph.
- Rebuild `useWatercolorBlob`'s animate-mode `tick()` on `useRAFLoop`
  (`pauseWhenHidden` + `respectReducedMotion` already built) — glass-ui-side.
- Apply `maxCacheSize`/LRU bounds to `parseCSSColor`, `parseCSSValueUnit`,
  `parseCSSValue`, `parseCSSPercent`, `parseCSSTime`, `parseCSSStylesheet`,
  `parseAnimationShorthand` (mirror `getComputedValue`'s existing
  `COMPUTED_MEMO_MAX_ENTRIES` pattern) — value.js src-side, single-file-scoped,
  low risk.
- Add a `VITE_API_URL` dev-onboarding note (or a `scripts/dev.sh` startup
  warning when unset + `api/` detected running locally) so local palette-API
  testing doesn't silently CORS-fail against production.
- One-time Tailwind/cssnano coverage report on `index-*.css` to quantify how
  much of the 184 KB gzip is shadcn-vue vendor residue vs. glass-ui vs.
  genuinely-used demo utility classes, before deciding whether a critical-CSS
  split is worth its complexity.
- Follow-up (not this lane): re-run the rAF/canvas/memory probes with an
  **isolated** browser profile (`--isolated` chrome-devtools-mcp context) to
  get a clean 3-minute walk + per-pane steady-state rAF deltas without
  cross-lane contention.
