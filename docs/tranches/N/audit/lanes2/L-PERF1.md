# Lane L-PERF1 — boot + memory profile

**Fleet:** second N-tranche deep-audit (lanes2). **Mandate:** boot perf ledger — cold-reload
trace (LCP / long tasks / script-eval weight), live WebGL-context count (verify the Defect-A
hidden-pane note), heap snapshot, dep-optimizer bundle weights. **Tranche-dev only — implements
nothing.**

**Harness.** Own chrome-devtools page (#14) against the live dev server `http://localhost:9000`,
viewport 1440×900, `html.dark`, route `#/?space=lab&color=lab(92%...)`. Hardware: 18 logical
cores, 32 GB device-memory, JS-heap limit 4192 MB — a **fast** machine (the costs below are
*floor* numbers; a real blocklisted/mobile device pays multiples).

**CRITICAL CAVEAT — this is a Vite DEV-SERVER profile, not the production bundle.** Cold reload
fired **247 module requests** (16 dep-optimizer pre-bundles · 82 glass-ui `dist/*.js` HMR chunks ·
25 `value.js/src` modules · 114 demo modules · 10 other). Production (`npm run gh-pages`,
rolldown + manualChunks `vendor-katex`/`vendor-highlight`, tree-shaken named imports) collapses
this to a handful of chunks. **Where a finding is dev-server-only it is flagged [DEV-ONLY]; the
real boot defects (live-context leak, eager-lucide-at-boot, heap/native weight) survive the
production build.** No second device tier was traced (no throttling applied) — booked.

Evidence: `shots/L-PERF1-boot-desktop-1440.png`, `shots/L-PERF1-heap.heapsnapshot` (61 MB).

---

## Cold-reload trace headline (NAVIGATION_0)

| Metric | Value | Read |
|---|---|---|
| **LCP** | **5012 ms** | element = a **text DIV** (nodeId 169), not a network resource |
| LCP TTFB | 6 ms (0.1%) | server is instant; the document is not the problem |
| **LCP render delay** | **5006 ms (99.9%)** | the **entire** LCP is JS module-load + evaluate + first-mount delay |
| CLS | **0.00** | no layout shift — clean |
| Console at load | **clean** (0 error/0 warn) | inv-K-5 page-load-console-clean holds |
| Forced reflow (total) | 50 ms | top frames: `aurora.js:510` (19ms), `goo-blob.js:660` (15ms), `dock.js:471/315` (15ms) |

The 5006 ms render delay is **dev-server module-graph cost** (247 serial-ish HMR fetches + per-
module transform + evaluate). It is NOT the production LCP. But it tells us the boot is **100%
script-bound, 0% resource-bound** — so the levers are *script weight* and *script that runs at
boot*, which is what the rest of this ledger isolates.

---

## Defect-A — VERIFIED, and worse than the note states: 3 live WebGL2 contexts, 1 fully hidden

Live `evaluate_script` census of `<canvas>` re-probing each with `getContext('webgl2')` (returns
the *existing* context if one is live — a non-destructive liveness probe):

| # | canvas | CSS box | backing store | live? | owner (DOM ancestry) |
|---|---|---|---|---|---|
| 1 | `atmosphere-canvas` (aurora) | 1440×900 | **2880×1800** | webgl2, not lost | `App.vue` root |
| 2 | `goo-blob-canvas` | 179×179 | 358×358 | webgl2, not lost | **`div.lg:hidden` (mobile pane slot)** → ColorPicker → HeroBlob → GooBlob |
| 3 | `goo-blob-canvas` | **0×0** | **400×400** | **webgl2, not lost** | **`div.pane-wrapper.hidden.lg:flex` (desktop-left pane slot)** → ColorPicker → HeroBlob → GooBlob |

**Root cause (file:line).** `demo/color-picker/App.vue` renders the mobile pane slot
(`<div class="lg:hidden …">`, App.vue:34) **and** the desktop pane slots
(`<div class="pane-wrapper hidden lg:flex …">` App.vue:45, `hidden lg:block` App.vue:57)
**simultaneously, both always in the DOM** — the breakpoint only toggles CSS `display`, it never
unmounts the off-breakpoint slot. Each slot's `PaneSlot` (KeepAlive-wrapped,
`demo/@/components/custom/panes/PaneSlot.vue`) mounts a full `ColorPicker.vue`, which mounts
`HeroBlob.vue` (`ColorPicker.vue:22`), which mounts glass-ui's `<GooBlob>`
(`HeroBlob.vue:5`/`:28`) — and `GooBlob` creates a WebGL2 context the moment its canvas mounts
(glass-ui `useMetaballRenderer.ts`, `getContext("webgl2")` single-bootstrap; disposal only on
`onUnmounted`, `useMetaballRenderer.ts:371-373`). Because the off-breakpoint slot is **never
unmounted** (only `display:none`'d), its GooBlob's `onUnmounted` never fires → its WebGL2 context
**stays live, allocated, and on the renderer's per-page context budget** while painting to a 0×0
box that no user can ever see. (Context #3 here is the desktop-left slot whose blob is
zero-sized; on a phone the mobile slot is visible and the *desktop* slots are the hidden leak —
same defect, mirror image. Either way you always pay for **2 blob contexts + 1 aurora = 3 live
GL contexts when at most 1 blob is visible**.)

**Cost.** Browsers cap WebGL contexts per page (Chrome ~16, then it force-loses the oldest);
each context carries GPU-side backing-store + program/VAO/FBO state. A 400×400 RGBA backing store
+ the metaball program is the wasted half; on a context-constrained engine (the iOS Safari path
the MEMORY.md ValueUnit-nesting note already singled out) the *extra* context is exactly what
pushes you toward the force-lose ceiling and the context-loss probe that smoke-safari guards.

**Where it would be fixed (next tranche, demo lane):** gate the off-breakpoint pane slot so its
heavy GL children genuinely unmount — i.e. `App.vue` should render **only** the active-breakpoint
slot (a `useBreakpoint`-driven `v-if`, not `lg:hidden`/`hidden lg:flex` CSS toggling), OR lift the
single hero blob out of the per-pane `ColorPicker` so exactly one `GooBlob` exists app-wide
regardless of how many ColorPicker instances the pane router keeps alive. The KeepAlive on
`PaneSlot` is the second multiplier: any pane the user *visits* keeps its ColorPicker (and its
blob context) cached too — a `<GooBlob>` that pauses-and-releases its context on
`IntersectionObserver`/visibility (glass-ui already has the IO-fallback machinery referenced at
`useMetaballRenderer.ts:144`) would cap the live count to 1. **Ownership: demo (App.vue breakpoint
gate + single-blob lift) primary; glass-ui (GooBlob release-context-when-hidden) secondary.**

> Aurora render-mode note for U33's lane: the `atmosphere-canvas` here holds a **live webgl2**
> context (not lost) — so `resolveRenderMode("auto")` resolved to **`"webgl"`** on this real GPU,
> NOT the static-CSS fallback. So U33 ("aurora doesn't move, no shade variation") is **not** a
> render-mode-misfire on capable hardware. A `readPixels` animation probe returned all-zeros
> (compositor drawing-buffer is cleared post-composite without `preserveDrawingBuffer`), so I
> could not *prove* motion either way from pixels — I leave U33's motion verdict to the design
> lane and only certify the GL substrate is the animated one here, not the fallback.

---

## Heap / memory ledger

`shots/L-PERF1-heap.heapsnapshot` (600,299 nodes, 46.8 MB total self-size). Live `performance.memory`
at steady state: **37 MB used / 39.1 MB total** JS heap (limit 4192 MB).

| Bucket | Self-size | Note |
|---|---|---|
| **native** | **21.8 MB** | dominant — the 3 WebGL2 backing stores + canvas/GPU-bound native objects. The 2880×1800 aurora backing alone is ~20 MB GPU-side RGBA; the 2 blob backings add ~0.5 MB each. The hidden-context #3 is pure waste in this bucket. |
| code | 8.1 MB | the dev-unbundled module graph (247 modules) — [DEV-ONLY] inflation; production collapses it |
| string | 6.2 MB | |
| object | 4.4 MB | |
| array | 3.2 MB | |
| closure | 2.0 MB | |

No leak *growth* test was run (single snapshot). The standing leak is **structural, not
temporal**: the hidden blob context is allocated once and held, not a growing-over-time leak —
killing it (Defect-A fix) reclaims the wasted native bucket immediately.

---

## Dep-optimizer / script-weight ledger (decoded sizes)

Totals this load: **10.3 MB decoded** across all scripts — **dep-optimizer 3.94 MB**, **glass-ui
dist 2.91 MB**, the rest demo+src+value.js source. The eager dep-optimizer pre-bundles
(`node_modules/.vite/deps/`) by decoded size:

| Bundle | Decoded | What it is | Boot-critical? |
|---|---|---|---|
| `dist-vzlhttbQ.js` | **1345 KB** | dep-optimizer **shared common chunk** (imports Vue; referenced by lucide/reka/vueuse). The "d3" token hits are minified-identifier false positives — **no `d3` in package.json, zero importers** (verified). The real weight is the shared transitive surface. | partial |
| `@lucide_vue.js` | **1081 KB** | the **entire Lucide icon barrel**, pre-bundled [DEV-ONLY scale — production tree-shakes named imports]. **BUT** the import is *eager at boot*: `@composables/usePaneRouter.ts:32` and `@composables/viewSchema.ts:32` both `import … from "@lucide/vue"`, and both load at App.vue boot → lucide is on the **critical boot path**, not a lazy pane. 55 import sites total. | **yes (boot path)** |
| `katex.js` | 485 KB | KaTeX — markdown/docs math. Imported only in `markdown/composables/useCodeFormatting.ts` (docs pane). Production isolates it as `vendor-katex` chunk (`vite.config.ts:246`). | no (docs pane) |
| `vue.runtime…` | 322 KB | Vue runtime | yes (irreducible) |
| `@vueuse_core.js` | 318 KB | @vueuse/core barrel | yes |
| `reka-ui.js` | 122 KB | reka-ui | yes |
| `vue-router.js` | 103 KB | router (5) | yes |
| `@mkbabb_parse-that.js` | 67 KB | the parser | yes (color parsing) |

glass-ui dist top chunks (dev decoded): `aurora.js` **643 KB**, `goo-blob.js` **333 KB**,
`dock.js` **232 KB**, `glass-ui.js` 214 KB, `DataTable` 113 KB. These are the atmosphere/blob/dock
WebGL+spring machinery — all three on the boot path (aurora + blob mount at App boot; dock is the
nav). `prettier` is library-externalized (N.W7.B, `vite.config.ts:144`) but the **demo** still
pulls it via `useCodeFormatting.ts` (docs-pane-only, not boot).

---

## THE TOP 5 BOOT COSTS — with evidence + fix locus

1. **Hidden-pane live WebGL2 context leak (Defect-A) — 3 live contexts, 1 painting to a 0×0 box.**
   Evidence: live census above (canvas #3 = `goo-blob-canvas`, 0×0 CSS, 400×400 backing, webgl2
   not-lost, owner `div.pane-wrapper.hidden.lg:flex`). Root cause: `App.vue:34/45/57` render both
   breakpoint slots simultaneously (CSS `display` toggle, never unmount) + `PaneSlot` KeepAlive,
   so the off-breakpoint `ColorPicker → HeroBlob → GooBlob`'s `onUnmounted`
   (glass-ui `useMetaballRenderer.ts:371`) never fires. **Fix:** `App.vue` breakpoint `v-if`
   gate (render only the active slot) OR single-blob lift out of per-pane ColorPicker; secondary
   glass-ui GooBlob release-context-when-hidden via the existing IO machinery. **Highest-leverage
   perf fix; survives production; directly relieves the iOS-Safari context ceiling.**
   **Owner: demo (primary) + glass-ui (secondary).**

2. **`@lucide/vue` eager on the boot path (1081 KB dev pre-bundle).** Evidence: dep-optimizer
   1081 KB; eager imports at `usePaneRouter.ts:32` + `viewSchema.ts:32` (both App-boot modules).
   In dev the whole barrel pre-bundles; in production named imports tree-shake, but the *eager
   chain* still drags the icon module into the first-paint graph. **Fix:** keep lucide named
   imports out of the two boot-critical pane-config modules where possible (icon refs in
   `viewSchema`/`usePaneRouter` can be lazy/string-keyed, resolved at pane mount), and confirm the
   production build tree-shakes (no barrel re-export). **Owner: demo.** [partly DEV-amplified]

3. **Aurora boot cost: a 2880×1800 (≈20 MB GPU) WebGL2 surface + 643 KB `aurora.js`, mounted
   eagerly at App boot.** Evidence: `atmosphere-canvas` backing 2880×1800 (devicePixelRatio×2
   full-viewport), native heap bucket 21.8 MB, `aurora.js` 643 KB largest glass-ui chunk,
   ForcedReflow top frame `aurora.js:510` (19 ms). The atmosphere is *always* armed at full
   viewport DPR. **Fix:** cap the aurora backing-store DPR (a 1× or 1.5× backing is visually
   indistinguishable for a blurred wash and quarters the GPU memory + per-composite raster); arm
   it after first paint (it is decorative, `aria-hidden`, App.vue:8) rather than synchronously in
   the boot mount. **Owner: glass-ui (DPR cap in useAurora) + demo (defer-arm).**

4. **The dev-server 247-request unbundled module waterfall = the 5006 ms LCP render delay.**
   Evidence: LCPBreakdown 99.9% render-delay, network census 247 script requests, totalDecoded
   10.3 MB. **This is [DEV-ONLY]** — production rolldown collapses it. **Fix:** none for prod;
   for the *dev loop* the lever is fewer eager modules (items 1-3 cut the boot graph). Flagged so
   the next tranche does NOT chase a 5 s "LCP regression" that is a dev-server artifact — the
   production LCP must be measured against `npm run gh-pages` output (NOT done this lane; booked).
   **Owner: n/a (artifact) — but a production-build Lighthouse trace is the missing gate.**

5. **Two redundant `goo-blob.js` (333 KB) + dock spring machinery on the boot path, with
   measurable forced reflow.** Evidence: 2× GooBlob mounted (item 1), `goo-blob.js` 333 KB,
   ForcedReflow `goo-blob.js:660` (15 ms) + `dock.js:471/315` (15 ms) + `dist-vzlhttbQ:3605`
   (50 ms). The blob/dock read geometry after style invalidation during their boot spring-settle
   (ties to Defect-B's spring-settle work). **Fix:** the single-blob lift (item 1) halves the
   blob cost; the dock/blob forced reflows want a read-then-write batch in glass-ui's
   `useMetaballRenderer`/dock morph. **Owner: glass-ui (reflow batching) + demo (single blob).**

---

## What this lane did NOT establish (honest gaps, booked for the wave)

- **No production-build trace.** All numbers are dev-server; the real LCP/INP/CLS must come from
  a Lighthouse run against `npm run gh-pages` output. The biggest single risk is mistaking the
  5 s dev LCP for a prod regression. **A production Lighthouse gate is the missing artifact.**
- **No throttled / low-tier trace.** 18-core/32 GB machine, 1× CPU, no network throttle. The
  blocklisted-GPU path (the very reason Defect-A's aurora CSS-fallback exists) was not exercised
  here. The context-leak cost is *worst* on exactly that tier.
- **No leak-over-time test.** Single heap snapshot; the context leak is structural (allocated
  once, held), confirmed by ancestry, not by growth. A pane-cycle memlab pass would quantify the
  KeepAlive accumulation across visited panes.
- **U33 aurora-motion** left to the design lane: I certify only that the GL (not CSS-fallback)
  substrate is active here; `readPixels` could not prove/disprove animation post-composite.
