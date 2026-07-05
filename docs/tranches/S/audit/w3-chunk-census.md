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

*AFTER numbers (post W3-2 JS deferral + W3-9 CSS split) append below at execution/close.*
