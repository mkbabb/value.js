# S.W3-9 — CSS critical-path diet: census + coverage quantification

**Owner**: S.W3 CSS-diet lane (S-23 CSS half).
**Gate served**: render-blocking CSS **≤ 120 KB gzip** (§6.2; baseline 184 KB / measured 188 KB).
**Result**: render-blocking CSS **188 KB → 86.5 KB gzip** — **GATE MET, 33.5 KB headroom.**
**Spec of record**: `docs/tranches/S/waves/S.W3.md` W3-9 (a)+(b) · SYNTHESIS §3.5 W3-9 · perf-general §5 P2.

All byte figures are `gzip -c <file> | wc -c` on the `npm run gh-pages` built bundle
(the gate is measured on the built bundle, §Hard gate item 2). Numbers captured
2026-07-05 on the wave-head worktree; consumed glass-ui = `file:../glass-ui`
@ `tranche/BG` `d8da6c3a` (v4.2.0).

---

## 1. Headline — the render-blocking overage was 100% the font corpus

The eager, render-blocking stylesheet is the single `<link rel=stylesheet crossorigin>`ed
`assets/index-*.css`. Its composition at baseline:

| Slice | raw | gzip | render-blocking? |
|---|---:|---:|---|
| **index-*.css (baseline, fonts inline)** | 651 883 | **188 168** | YES (the gate subject) |
| — of which: base64 woff2 font corpus (`@import ".../styles/fonts"`) | ~131 612 | **~100–102 KB** | was YES |
| — of which: everything else (glass-ui monolith + SFC + Tailwind + demo) | ~519 000 | **~86 KB** | YES |

woff2 is already Brotli-packed internally, so gzip barely recovers the base64
wrapper: the corpus is a near-incompressible ~100 KB gzip slab. **It — alone — is
the entire overage over the 120 KB gate.** Everything else render-blocking was
already ~86 KB, comfortably under.

### The fix (item a, executed via the producer's designed split)

The producer DELIBERATELY ships the real faces as a SEPARATE `@mkbabb/glass-ui/styles/fonts`
export, and ships metric-compatible `*-Fallback` `@font-face` rules
(`ascent-override`/`size-adjust`) in the CRITICAL `./styles` surface. So the corpus
is deferrable FOUC-safe by construction:

- `style.css` no longer `@import`s the corpus (a `/*__GLASS_FONTS_DEFERRED__*/` marker
  sits where line 58's `@import` was).
- The `deferGlassFonts` vite plugin (`plugins/vite-defer-glass-fonts.ts`):
  - **build**: strips the marker, emits `fonts.css` verbatim (base64 intact) as a
    standalone hashed asset, injects a non-blocking `<link rel=stylesheet media=print
    onload="this.media='all'">` + a `<noscript>` blocking fallback (the same idiom
    `index.html` already uses for Fraunces).
  - **dev**: replaces the marker with the real `@import` — dev is not gate-measured,
    and keeping the corpus render-blocking in dev is the zero-risk faithful path (the
    Playwright smoke suite runs against the dev server).

**Post-defer built bundle:**

| Asset | raw | gzip | render-blocking? |
|---|---:|---:|---|
| `index-*.css` (critical) | 519 153 | **86 452** | YES — **≤ 120 KB ✓** |
| `glass-fonts-*.css` (corpus) | 132 943 | 100 442 | NO (`media=print` swap + noscript) |

Verified on the built bundle (Playwright, static-served): app mounts, 0 page errors,
7 backdrop-filter glass surfaces paint, warm-cream chassis token applied, and BOTH
real faces load & swap in (`document.fonts.check('16px "Plus Jakarta Sans"')` →
`true`, `"Fira Code"` → `true`; the deferred sheet's `media` flips `print`→`all`).
No FOUC, no missing glass, zero layout shift (metric-compat fallback → real swap).

---

## 2. Coverage / attribution quantification (item b) — shadcn vs glass-ui vs demo

Method: additive `@source not "…"` build-diffs (these build cleanly, unlike
import-removal which breaks the build — `.slug-pill @apply text-mono-small` depends
on glass-ui's `@utility` registration) + fixed-asset direct measurement + a Chrome
CSS-coverage run on the default view.

### 2.1 Demo-side is already lean — nothing provably-dead to purge

| Measurement | gzip delta | source |
|---|---:|---|
| Exclude the **entire** shadcn `ui/**` tree from Tailwind scan | **0 bytes** | `@source not` build-diff |
| Exclude the 2 zero-consumer shadcn groups (`label`, `switch`) | **0 bytes** | `@source not` build-diff |
| Exclude **all** demo-authored source (`color-picker/**` + `@/**`) | **1 255 bytes** | `@source not` build-diff |
| Remove the explicit `@source` directives (auto-scan only) | **0 bytes** | build-diff |

Readings:
- **shadcn-vue vendor residue = 0 bytes gzip.** Its utility vocabulary is a strict
  SUBSET of what the live glass-ui/demo components already emit (Tailwind emits each
  utility once). Excluding it — even the whole tree — drops nothing. Of 21 shadcn
  groups, 19 are live-consumed; the only 2 zero-consumer groups (`label`, `switch`)
  purge 0 bytes. **The F.W1-Lane-C sweep (29 subdirs → 22 files) already removed the
  vendor weight; there is no demo-side dead CSS left to purge.** No purge is shipped
  (a `@source not` for a 0-byte "dead" group would be fragile theatre — it silently
  breaks the day the group gains a consumer).
- **Total demo-authored Tailwind-utility footprint = 1.25 KB gzip.** The demo's own
  markup drives ~1.5% of the render-blocking CSS.
- The explicit `@source` directives add 0 emitted bytes over the git-root auto-scan;
  they exist for git-independence robustness (inv-N-7 P9-guard), not for coverage.

### 2.2 The render-blocking ~86 KB is ~95%+ glass-ui, imported wholesale

| Slice | gzip | attribution |
|---|---:|---|
| glass-ui SFC payload (`./styles.css` = `dist/glass-ui.css`, wholesale) | 9 892 | **PRODUCER** |
| glass-ui `./styles` monolith (tokens + glass ladder + typography + theme + all component-recipe partials + `components.css` utility surface + 5 metric-compat fallback faces) | ~74 KB* | **PRODUCER** |
| Tailwind base/preflight + `tw-animate-css` | ~few KB | vendor |
| demo-authored Tailwind utilities | 1 255 | demo (lean) |
| demo `<style scoped>` SFC CSS (~8.6 KB raw of the built `[data-v-*]` rules) | ~2 KB | demo |
| shadcn-vue residue | **0** | demo (none) |

*Remainder after subtracting the measured slices; the monolith source partials sum
to 118 655 raw (excl. `fonts.css`) and the built index carries 422 `[data-v-*]`
scoped rules (60 565 raw, of which the fixed glass-ui SFC file is 51 947 raw). The
import-removal cross-check is unavailable (breaks the build, see method above).

### 2.3 Chrome CSS coverage (default `/` view)

`index-*.css`: **73.6% used** (382 001 / 519 089 raw used-ranges). The 26.4% unused
(~137 KB raw / ~20 KB gzip est.) is glass-ui component-recipe CSS for components that
are below the fold or on other views (drawer, sheet, configurator, instrument-chassis,
segmented-tabs, menu, etc.) — i.e. exactly the DEFERRED bucket of a critical/deferred
split of glass-ui's `./styles` monolith. That split is producer-owned (§3).

---

## 3. Producer-letter record (item a, L16-adjacent) — the `./styles` critical/deferred split

**Item W3-9(a) as written ("consume glass-ui's already-published `/styles/critical` +
`/styles/deferred` split") is NOT executable against the consumed glass-ui, and would
NOT help the gate even if it were. Recorded here in full; NOT silently skipped, NOT
shimmed, NOT worked around by re-splitting the monolith demo-side.**

### 3.1 The split is not published in the consumed version

Consumed glass-ui = `../glass-ui` @ `tranche/BG` `d8da6c3a` (v4.2.0). Its published
`exports` map carries ONLY: `./styles`, `./styles/fonts`, `./styles.css`, `./fonts/*`.
There is **no** `./styles/critical` or `./styles/deferred` export, **no**
`dist/styles/critical.css` / `deferred.css`, and **no** `src/styles/critical-partition.mjs`
on the checkout. The `critical-partition.mjs` manifest exists ONLY in an unmerged
glass-ui worktree (`.claude/worktrees/wf_521a777b-791-7`, a BB/BC/BD-band in-flight
effort). value.js consumes the sibling's checked-out `tranche/BG` HEAD — the split is
simply not there to import.

### 3.2 Even the in-flight split would REGRESS the gate

The in-flight manifest documents its own measured critical subset (fully resolved
consumer draw), re-based across the BB/BC/BD glass bands:

| Band | critical.css gzip | ceiling |
|---|---:|---:|
| HEAD bdbcd479 | 105 460 | 110 000 |
| BB liquid-glass | 131 469 | 137 000 |
| BC settled | 149 748 | 156 000 |
| **BD greenfield (current worktree)** | **174 231** | **182 000** |

The producer's critical partition ALONE is **174 KB gzip** — **54 KB OVER value.js's
≤120 KB gate**, before adding Tailwind base or any demo CSS. Consuming it in place of
the current wholesale monolith would take render-blocking CSS from 86.5 KB → ~180 KB+
gzip — a >90 KB REGRESSION. The manifest's own note anticipates this ("If the
re-measured render-block … is STILL over the mobile-ms floor, the
inline-critical-head-block path routes to the named BB.W-CSS-CRITICAL-INLINE
successor"). The SYNTHESIS's "~46% of the producer monolith" premise held as a RATIO
(47–49%) but the monolith's absolute gzip grew band-over-band, so 46% is now 174 KB.

### 3.3 The letter (producer ask, L16-adjacent — informational, NOT gate-blocking)

value.js does **not** need the split to meet its gate (font-defer already lands it at
86.5 KB). The record for the producer:

1. `tranche/BG` (the version value.js consumes) does not yet publish
   `./styles/critical` + `./styles/deferred`; when the BB/BC/BD-band CSS-critical work
   lands on the consumed branch, its `critical.css` measures **174 KB gzip** — larger
   than value.js's ENTIRE current render-blocking payload. A consumer adopting
   `./styles/critical` as its render-blocking surface would REGRESS, not improve.
2. The value.js-relevant producer lever is a critical partition small enough that
   `critical + Tailwind-base + demo` stays under a consumer's budget, or the
   `BB.W-CSS-CRITICAL-INLINE` head-block successor. Until then, value.js keeps the
   wholesale monolith `@import` (86.5 KB render-blocking, 73.6% used on first view)
   and defers only the corpus.
3. **No `../glass-ui` patch, no demo-side re-split of the monolith** (a hand-cut
   critical hole risks byte-incompleteness + FOUC and duplicates the producer's SOLE
   manifest — the S.W3 §No-workaround prohibition).

---

## 4. Compliance with S.W3 §No-workaround / re-baseline discipline

- **Gate MET on the built bundle at the spec number** (86.5 KB ≤ 120 KB) — no gate
  re-baseline, no silent miss.
- The §6.2 baseline drift (184 KB audit-time → 188 KB measured now) is recorded here,
  not silently absorbed.
- glass-ui is NOT pre-bundled and NOT patched; item (a)'s producer blockage is routed
  to §3, not shimmed.
- PointerDebugOverlay was NOT touched (it is dev-only, not a budget lever).

## 5. Reproduce

```
npm run gh-pages
idx=$(find dist/gh-pages/assets -name 'index-*.css'); gzip -c "$idx" | wc -c   # → 86452
# render-blocking = the single `<link rel=stylesheet crossorigin>` in dist/gh-pages/index.html
# deferred corpus = glass-fonts-*.css, loaded media=print onload swap + <noscript>
```
