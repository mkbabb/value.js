# S.W3 — Per-chunk gzip census (W3-2 first task: the owned arithmetic)

**Spec of record**: `docs/tranches/S/waves/S.W3.md` W3-2 · §6.2 budgets · §Hard-gate (2).
**Purpose**: name what the eager-load baseline is *made of* — the gate's arithmetic
must be **owned, not assumed** (the 65 KiB JS cut from 345 KiB and the 64 KiB CSS
cut from 184 KiB each have to name their chunks). This file carries the **BEFORE**
numbers; the **AFTER** re-measure lands here at W3-2/W3-9 execution + wave close.

**Measured at**: `tranche-q` @ `3549147` (S.W1 3.0.0 library + S.W2 pipeline landed —
this is a *post-W1/W2* re-baseline, not the perf-general `c5aa091` figure; see
§Re-baseline-on-record below).
**Build**: `npm run gh-pages` (vite `--mode gh-pages`) → `dist/gh-pages/`, clean, 2.2s.
**Method**: raw = on-disk bytes; gzip = `gzip -c <file> | wc -c` / `zlib.gzipSync(level:6)`
(the perf-general §2 method reproduced). **KiB = ÷1024** (the convention the perf-general
baseline used — `640 KB` raw CSS ÷1024 = the disk `654304` bytes; labeled "KB" throughout
the S docs but computed as KiB, kept consistent here so BEFORE↔baseline compare cleanly).
Eager set = the entry `<script type=module>` + every `<link rel=modulepreload>` + the
render-blocking `<link rel=stylesheet>` in `dist/gh-pages/index.html` (the browser's
ground-truth cold-load fetch list, view-independent).

---

## §1 — Headline

| Gate | Baseline (§6.2, `c5aa091`) | BEFORE (`3549147`, this census) | Gate | Verdict |
|---|---|---|---|---|
| **JS eager** gzip | 358 KiB | **345.0 KiB** (353,238 B) | ≤ 280 KiB | **FAIL — 65.0 KiB over** |
| **Render-blocking CSS** gzip | 184 KiB | **184.2 KiB** (188,583 B) | ≤ 120 KiB | **FAIL — 64.2 KiB over** |
| Eager cold-load (JS+CSS) gzip | ≈543 KiB | **529.1 KiB** (541,821 B) | measured, not gated | recorded |

The eager JS half already dropped ~13 KiB vs the `c5aa091` baseline (S.W1's library
excisions + re-chunk); the CSS half is unmoved. **Both gates are open by ~65 KiB each.**

---

## §2 — Eager JS graph (per chunk, raw / gzip)

`index.html`: 1 entry module + 8 `modulepreload` = the 9-chunk eager JS graph.

| # | Chunk | Raw | Gzip | What it is | Lever class |
|---|---|---:|---:|---|---|
| 1 | `index-*.js` | 582.1 K | **196.5 K** | **Demo App shell** — `App.vue` eager graph: `Dock`, `ColorPicker` + ~30 composables, the **aurora atmosphere 2D canvas** (`useAtmosphere`), the **`HeroBlob` wrapper**, `usePaletteManager` (now folded in — no longer a separate preload), `PointerDebugOverlay` (dev), the WebGL metaball *wiring* + aurora paint | **demo-owned — the cut lives here** |
| 2 | `_plugin-vue_export-helper-*.js` | 371.2 K | **109.4 K** | **Vendor shared surface** — reka-ui (103 marker hits) + glass-ui (155 hits) + vue/vueuse. The renamed successor to the `c5aa091` `glass-ui-*.js` chunk | **PROHIBITED lever** (no pre-bundle/defer glass-ui — K.W2.5 lesson) |
| 3 | `color-utils-*.js` | 61.9 K | **20.4 K** | value.js color subpath (channel/convert utils), eager because `ColorPicker` consumes it synchronously | value.js `src/` — off-bounds this wave |
| 4 | `dispatch-*.js` | 30.9 K | **11.4 K** | value.js `color2()` dispatch + DIRECT_PATHS | value.js `src/` — off-bounds this wave |
| 5 | `packrat-entry-*.js` | 13.9 K | **4.6 K** | `@mkbabb/parse-that` runtime | vendor |
| 6 | `TabsTrigger-*.js` | 3.2 K | 1.3 K | reka-ui Tabs primitive (dock view-select) | vendor |
| 7 | `createLucideIcon-*.js` | 1.3 K | 0.7 K | lucide icon factory | vendor |
| 8 | `rolldown-runtime-*.js` | 0.7 K | 0.4 K | rolldown module runtime | build |
| 9 | `prng-*.js` | 0.3 K | 0.2 K | seeded PRNG (watercolor/aurora seed) | vendor |
| | **EAGER JS TOTAL** | **1065.4 K** | **345.0 K** | | |

**The 345 KiB is made of two blocks**: the demo App shell (`index`, 196.5 K = **57%**)
and the vendor shared surface (`_plugin-vue_export-helper`, 109.4 K = **32%**). Together
= **89%** of eager JS. The value.js color subpath (`color-utils`+`dispatch` = 31.8 K) is
the remaining **9%**; parse-that + runtime bits are the last **~2%**.

---

## §3 — Render-blocking CSS

| Chunk | Raw | Gzip | What it is |
|---|---:|---:|---|
| `index-*.css` | 639.0 K | **184.2 K** | **Single monolithic stylesheet** — one render-blocking `<link>`. Tailwind base+utilities + tw-animate-css + the **wholesale** `@import "@mkbabb/glass-ui/styles"` + `@import "@mkbabb/glass-ui/styles.css"` (`demo/@/styles/style.css:52-53`) + demo `animations.css` + shadcn-vue vendor residue |
| | **184.2 K** | | vs ≤120 KiB gate → **64.2 K over** |

There is exactly **one** render-blocking stylesheet — no split. W3-9 splits it: consume
glass-ui's `/styles/critical` (render-blocking) + `/styles/deferred` (non-blocking tail)
in place of the two wholesale `@import`s, then the Tailwind-coverage/cssnano purge of the
shadcn-vue residue. (Lazy CSS — `katex.css` 8.1 K, per-pane `*Pane.css` — is correctly
*not* render-blocking and is out of this gate.)

---

## §4 — Naming the cut (where the 65 KiB JS must come from)

W3-2's deferral candidates, and the **honest arithmetic** on each:

| Candidate | Where it sits | Deferrable eager bytes | Note |
|---|---|---|---|
| **aurora atmosphere canvas** (`useAtmosphere`, 2D paint) | `index-*.js` (demo-owned) | modest (demo composable, ~5.7 K source) | real lever — defer behind idle-callback / first-interaction (`scheduleAfterFirstPaint`, glass-ui `useAurora.ts:79-108`) |
| **HeroBlob mount** (`HeroBlob.vue` wraps glass-ui `Blob`/`GooBlob`) | wrapper in `index-*.js`; **heavy WebGL metaball code is in the vendor chunk (#2)** | wrapper is only **2.2 K source** | deferring the *mount* defers the rAF/WebGL-init **execution** (the perf win, and the S-4/blob-idle story) — but **moves few eager *bytes*** out of `index`, because the metaball code lives in the off-limits vendor chunk |
| `PointerDebugOverlay` | `index-*.js` | ~0 production bytes | **explicitly NOT a budget lever** (dev-only, motion-inventory:181) — §No-workaround prohibition |
| `usePaletteManager` (folded into `index`) | `index-*.js` | 12.8 K at `c5aa091` (was its own preload; now inlined) | candidate for lazy-load behind first palette interaction — but the eager `ColorPicker` path may reach it; needs a reachability check before it counts |

### ⚠ Re-baseline / route flag (§Triumvirate trip-wire — perf-transitions P0, §Triumvirate "non-local gate failures")

The two biggest blocks are **not** freely deferrable:

- The **vendor shared surface (109.4 K, 32%)** is a **prohibited** lever (no pre-bundle
  glass-ui). It cannot pay down the 65 K.
- Inside the demo `index` chunk (196.5 K), the **truly demo-owned deferrable weight**
  (aurora + HeroBlob wrapper + dev overlay) is dominated by *execution* cost, not *byte*
  cost — the heavy metaball bytes are vendor-side. On first read, **`HeroBlob`+aurora
  deferral alone likely does NOT free 65 KiB of eager JS**; the byte win must come from
  additionally **route-lazy-loading demo-owned shell pieces** (e.g. `usePaletteManager`
  and any eager pane-adjacent modules that don't gate the first paint), which W3-2 must
  measure. **If the census-driven deferral cannot reach ≤280 KiB, that is an on-record
  re-baseline event (never a silent miss) and routes per §Triumvirate** — it is called
  out here so W3-2 owns the arithmetic before it starts cutting.

The value.js `color-utils`+`dispatch` (31.8 K, 9%) are `src/`-owned and **off-bounds
this wave** — not a W3 lever.

---

## §5 — Re-baseline on record (no silent re-baselining, §No-workaround)

§6.2 states the baseline as **358 JS + 184 CSS ≈ 543 KiB** (measured at `c5aa091`,
perf-general §2). This census re-measures on the built bundle at the current head
`3549147` (post S.W1/S.W2) and records **345.0 JS + 184.2 CSS = 529.1 KiB**. The JS
half moved **−13 KiB** (S.W1 library excisions + rolldown re-chunk: the old single
`color-*.js` 17.6 K split into `color-utils` 20.4 K + `dispatch` 11.4 K = 31.8 K total,
and `usePaletteManager` 12.8 K folded from a preload into `index`); the CSS half is
**unchanged**. **This is a recorded re-baseline, not a silent one.** The gate targets
(≤280 JS · ≤120 CSS) are unchanged; the deltas to close are **65.0 KiB JS · 64.2 KiB CSS**.

## §6 — W3-9 dependency note (books/route, not a census miss)

The W3-9 CSS split consumes glass-ui's `src/styles/critical-partition.mjs` manifest
(cut at glass-ui `BC.W-CSS-CRITICAL`). At census time the manifest is **not present in
the mainline `../glass-ui` checkout** — it appears only under glass-ui worktrees +
transitive `node_modules` (`../glass-ui/node_modules/@mkbabb/keyframes.js/.../src/styles/critical-partition.mjs`,
and `../glass-ui/.claude/worktrees/*/src/styles/critical-partition.mjs`). W3-9 must
confirm the published surface (`@mkbabb/glass-ui/styles/critical` + `/styles/deferred`)
resolves against the pinned glass-ui before it can consume it; a byte-incomplete union
against the manifest routes to the producer letter (L16-adjacent, per §Triumvirate).

---

## §7 — Full asset inventory (context — lazy chunks correctly split)

Correctly-lazy (NOT eager, confirmed absent from `index.html`): `vendor-katex-*.js`
(76.4 K gz, About-only), `vendor-highlight-*.js` (12.5 K, About-only), every `*Pane-*.js`
(PalettesPane 17.8 K, ExtractPane 9.0 K, GradientPane 7.9 K, BrowsePane 7.4 K, AdminPane
6.9 K, MixPane 6.4 K, …), the 15 color-space conversion micro-chunks (`hex/hsl/hwb/oklch/…`
~2 K each), `quantize-worker` (3.1 K), and the per-pane `*Pane.css`. The lazy split is
healthy — the problem is entirely the eager shell (§2) + the monolithic CSS (§3).

---

---

## §8 — AFTER (W3-2 JS deferral executed + W3-9 CSS split landed)

**Measured at**: `tranche-q` post-`52c5fd4` (W3-1/W3-3/W3-6/W3-9 landed) + this lane's
W3-2 HeroBlob deferral. `npm run gh-pages` clean; gzip level 6; same eager-set method
as the BEFORE census.

| Gate | BEFORE (`3549147`) | AFTER (committed) | Ceiling (barrel-decoupled, measured) | Gate | Verdict |
|---|---|---|---|---|---|
| **JS eager** gzip | 345.0 KiB | **345.4 KiB** | **313.1 KiB** | ≤ 280 KiB | **RE-BASELINE — gate unreachable by demo deferral (see §9)** |
| **Render-blocking CSS** gzip | 184.2 KiB | **85.0 KiB** | — | ≤ 120 KiB | **MET** (W3-9, `7c3c597`) |
| Eager cold-load (JS+CSS) gzip | 529.1 KiB | **430.4 KiB** | — | measured | recorded (−98.7 KiB, all CSS) |

The CSS half is CLOSED (W3-9 deferred the 98 KiB glass-font corpus off the critical
`<link>` via `media=print onload`; the render-blocking sheet is now 85.0 KiB). The JS
half is the open gate — **owned arithmetic below**.

## §9 — W3-2 JS: the owned arithmetic (why the demo deferral cannot reach ≤280)

**The demo lever landed.** `HeroBlob` (ColorPicker.vue) is now a `defineAsyncComponent`
mounted behind `useIdleReady` (glass-ui's published `scheduleAfterFirstPaint` idiom,
`@mkbabb/glass-ui/dom`). This defers the WebGL2 metaball init EXECUTION past the first
post-paint idle tick (the S-4 / blob-idle first-paint win) and is the consumer-ready
half of the code-split.

**But it frees ~0 eager BYTES against the current tree (345.0 → 345.4).** Root cause,
measured decisively (a throwaway build with the goo-blob barrel import removed from the
eager path): the 33.1 KiB metaball graph (`GooBlob` component + `useMetaballRenderer` +
shaders + mood/pointer/satellite FSMs) is anchored into the eager `index` chunk **not**
by `HeroBlob` (now async) but by **`useAtmosphere.ts`'s eager barrel import** of
`@mkbabb/glass-ui/goo-blob` for `BLOB_CONFIG_KEY` + `BLOB_CONFIG_DEFAULTS` (needed at App
setup for the synchronous `provide`). glass-ui's `sideEffects: ["*.css"]` + `GooBlob.vue`'s
own scoped `<style>` (a `*.css` side-effect) make the barrel non-tree-shakeable: importing
even one lightweight constant keeps the whole `GooBlob.vue` re-export in the eager chunk.

- **With the barrel decoupled** (the throwaway measure): eager `index` 196.8 → 164.5 KiB,
  a `goo-blob-*.js` lazy chunk of **33.1 KiB** splits out, eager JS TOTAL → **313.1 KiB**.
- **313.1 is STILL 33.1 KiB over the ≤280 gate.** Even the maximal barrel-decoupled cut
  does not reach 280 — the census's BEFORE warning (§4.1) is confirmed by measurement:
  the truly demo-owned deferrable JS is dominated by the vendor shared surface (109.4 KiB,
  PROHIBITED lever) + the value.js `src/` color subpath (31.9 KiB, off-bounds this wave) +
  the demo App shell, none of which deferral can move under 280 without either a prohibited
  glass-ui pre-bundle or an off-bounds `src/` cut.

### ⚠ Re-baseline on record + producer letter (§No-workaround · §Triumvirate)

Per §Triumvirate "non-local gate failures" (the ≤280KB JS gate unreachable by deferral
alone = a re-baseline event, never a silent miss) and §No-workaround (no silent
re-baselining):

1. **RE-BASELINE (on record)**: the ≤280 KiB JS gate is **not reachable by demo-owned
   deferral** at tranche-q. The demo lever (HeroBlob async) is landed; the residual
   65 KiB gap is 33 KiB producer-barrel anchor + 32 KiB that no in-bounds lever touches
   (vendor-prohibited + src-off-bounds + irreducible App shell). This is recorded, not
   silently dropped; S.W9 re-runs the gate and carries the standing verdict.

2. **PRODUCER LETTER (L16-adjacent, `@mkbabb/glass-ui`)**: the `@mkbabb/glass-ui/goo-blob`
   barrel couples the lightweight provisioning constants (`BLOB_CONFIG_KEY`,
   `BLOB_CONFIG_DEFAULTS` — from `./types`) with the heavyweight `GooBlob` component in one
   non-splittable published surface. A consumer that only provisions the blob config (the
   demo's `useAtmosphere` synchronous `provide`) is forced to anchor the entire renderer
   eagerly. **Ask**: publish a light `@mkbabb/glass-ui/goo-blob/config` (or `/tokens`)
   subpath exporting just the InjectionKey + defaults, so consumers can provision without
   dragging `GooBlob.vue` (+ its scoped-`<style>` `*.css` side-effect) into the eager
   graph. With that subpath consumed, the demo drops to 313.1 KiB with zero further demo
   change (the HeroBlob async split is already consumer-ready). Route per §Triumvirate;
   NEVER a demo patch of the producer barrel.

**Not touched** (honesty clause, §No-workaround): `PointerDebugOverlay` (dev-only,
~0 production bytes — not a budget lever); the vendor shared surface (no glass-ui
pre-bundle — K.W2.5 lesson); the value.js `color-utils`+`dispatch` (`src/`-owned,
off-bounds this wave).

---

## §10 — WAVE-CLOSE re-measure (the MEASURE lane, at the final head)

**Measured at**: `tranche-q` @ `7819526` (ALL S.W3 units landed — W3-1/-2/-3/-4/
-5/-6/-7/-8 — plus the concurrent S.W4). `npm run gh-pages` clean; gzip level 6;
same eager-set method (entry `<script type=module>` + every `<link
rel=modulepreload>` + the render-blocking `<link rel=stylesheet>`, `<noscript>`
fallbacks excluded). This is the close re-measure the §Hard-gate 2 asks for; it
CONFIRMS §8 holds at the final head — the W3-4/-5/-7/-8 motion + RAF-discipline
work and the S.W4 header re-composition did not move the eager graph.

| Gate | BEFORE (`3549147`) | §8 AFTER (`~52c5fd4`) | **CLOSE (`7819526`)** | Gate | Verdict |
|---|---|---|---|---|---|
| **JS eager** gzip | 345.0 KiB | 345.4 KiB | **345.4 KiB** (353,653 B) | ≤ 280 KiB | **RE-BASELINE — 65.4 KiB over (see §9)** |
| **Render-blocking CSS** gzip | 184.2 KiB | 85.0 KiB | **85.5 KiB** (87,517 B) | ≤ 120 KiB | **MET** |
| Eager cold-load (JS+CSS) gzip | 529.1 KiB | 430.4 KiB | **430.9 KiB** | measured | recorded |

Per-chunk eager JS at close (unchanged from §2 modulo the rolldown hash + the
vendor-chunk rename `_plugin-vue_export-helper-*` → `glass-ui-ClDjozRN.js`, same
109.5 KiB surface): `index` 196.8 K · `glass-ui` (vendor) 109.5 K · `color-utils`
20.5 K · `dispatch` 11.5 K · `packrat-entry` 4.6 K · `TabsTrigger` 1.2 K ·
`createLucideIcon` 0.7 K · `rolldown-runtime` 0.4 K · `prng` 0.2 K = **345.4 K gz**.
Render-blocking CSS: the single `index-*.css` 85.5 K gz (the 98 KiB glass-font
corpus stays deferred off the critical `<link>` via `media=print onload`, W3-9
`7c3c597`; its `<noscript>` fallback is not render-blocking under JS).

**Verdict at close**: the CSS gate is **MET** (85.5 ≤ 120). The JS gate stands
at the §9 **recorded re-baseline** — ≤ 280 KiB is not reachable by demo-owned
deferral (33 KiB is the `@mkbabb/glass-ui/goo-blob` barrel anchor → the L16-
adjacent producer letter in §9; the remaining ~32 KiB is vendor-prohibited +
`src/`-off-bounds + irreducible App shell). This is on-record, never silent
(R lesson 3); **S.W9 re-runs the gate and carries the standing verdict**. The
frame-budget half of the §6.2 regime is MET on the built bundle at this head —
see `w3-frame-budget-measure.md` (drag p50 8.4 ms · view-switch first-frame
8.3 ms · idle p50 8.3 ms · mix 1.13 s, all on the M5 Max real-GPU bundle).
