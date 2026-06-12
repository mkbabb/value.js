# Lane L-PERF3 — the perf-wave design substrate

**Mode**: static analysis + live instrumentation (read-only; nothing implemented).
**Live app**: `http://localhost:9000` (cold-cache dev server, my own page #15).
**Branch**: `tranche-f-handoff`, HEAD `199fd15` + 0.12.0. PROGRESS.md marks W5/W7
landed; this lane is the **N.W6 perf face** (per-pane perf work-orders) + the carry of
**N.W7.B perf-truth** items that touch the *demo* path (W7.B optimized the library; the
demo's hot leaves were never measured live until now).

**Method**: I instrumented RAF/draw-call census, took a `performance_start_trace` over a
40-step color-change burst, and read the binding sites at `file:line`. Every number below is
a measured value or a grounded `file:line`, not an estimate.

---

## 0 — The headline measurements (live, idle + interaction)

| Probe | Value | What it means |
|---|---|---|
| **Live `<canvas>` count** | **3** | atmosphere (2880×1800 backing!) + **TWO** goo-blob canvases |
| **Live WebGL2 contexts** | **2** (both `isContextLost()===false`) | one of them is **offscreen** in a `display:none` subtree |
| **Idle RAF callbacks/sec** | **60** | continuous render with no user interaction |
| **Idle WebGL draw-calls/sec** | **32** | the blob(s) repaint perpetually at rest |
| **Trace CLS** | **1.03** (Good ≤ 0.1) | catastrophic; worst cluster score 1.0274 over a 4.2 s window |
| **Trace ForcedReflow** | **103 ms** | `vue-router popStateHandler → computeScrollPosition` on hash-driven color change |
| **CLS root cause** | **374 non-composited-animation flags**, 504 radius mentions | scroll-driven card-shrink keyframes (padding/font-size/grid-rows) + border-radius can't GPU-composite |

These corroborate user findings **U11/Defect-A** (dual-pane dual-mount), **U6/U16** (dock
laggy/jittery), **U31** ("card must NOT resize" — the CLS), **U33** (aurora static — it
resolved to the `css` fallback on this machine, see §3).

---

## 1 — RANK-1 — The dual-mount: TWO ColorPicker subtrees + TWO live WebGL2 blob contexts (U11 / Defect-A perf face)

**The defect, structurally.** `demo/color-picker/App.vue` renders BOTH the mobile single-slot
**and** the two desktop slots in the same template (lines 34–69), toggled only by Tailwind
`lg:hidden` / `hidden lg:flex` classes. `display:none` does **not unmount** — so at desktop
width (`lg` matched, verified `matchMedia('(min-width:1024px)').matches === true`) the
ColorPicker view is mounted **twice simultaneously**:

- Mobile slot (`App.vue:34`, `lg:hidden`) → `picker-shell` → HeroBlob → GooBlob #1 (358×358, onscreen here because the desktop panes are themselves `display:none` — see §2)
- Desktop-left slot (`App.vue:45`, `hidden lg:flex`) → `picker-shell` → HeroBlob → GooBlob #2 (400×400, **offscreen, in a `display:none` subtree, context NOT lost**)

DOM-ancestry proof (live):
```
blob#1 358×358 onscreen:  …picker-shell ▸ pane-container--dual ▸ main
blob#2 400×400 offscreen: …picker-shell ▸ pane-wrapper ▸ pane-container--dual ▸ main
```
`HeroBlob` is inside `ColorPicker.vue:22`; `<GooBlob>` is inside `HeroBlob.vue:5`. Two
ColorPicker mounts ⇒ two HeroBlobs ⇒ two GooBlobs ⇒ two WebGL2 contexts.

**Why it costs.** glass-ui's `goo-blob.js` render loop has **no IntersectionObserver, no
`document.hidden` gate, no PRM gate** (grepped the dist: zero `IntersectionObserver`,
`isIntersecting`, `visibilityState`, `prefers-reduced-motion`). So the offscreen blob keeps a
live GPU context and (its RAF unthrottled while the tab is foregrounded) burns shader work on a
canvas the user can never see. Browsers cap WebGL contexts at ~16 per page; spending 2 of them
on one logical blob is wasteful and risks context-eviction on context-heavy pages.

**Work-order (W6, demo-owned + one glass-ui ask):**
- **W6-PERF-1a (demo, rank-1):** collapse the mobile/desktop slot duplication so the ColorPicker
  mounts **once**. Two viable idioms: (i) a single responsive slot that re-parents via CSS
  grid/order rather than two `display:none`-gated DOM subtrees; or (ii) `v-if`-gate the inactive
  breakpoint's slots behind `useBreakpoint` (`@mkbabb/glass-ui/dom`, already consumed) so only
  the live slot is mounted. Idiom (ii) is the KISS fix and kills the dual context outright.
  Binding site: `App.vue:34–69`. **Expected win: −1 WebGL2 context, ~−16 draw-calls/s idle, half
  the ColorPicker reactive-subtree (the cached pane's watchers stop firing).**
- **W6-PERF-1b (glass-ui ask, paired):** `GooBlob` should gate its render loop on visibility —
  pause RAF + optionally release the GL context when the canvas is `display:none` / out of
  viewport (IntersectionObserver) and on `document.hidden`, and honor `prefers-reduced-motion`
  (inv-N-9: the blob loop is currently the one *foreground* un-PRM-gated continuous loop in the
  consumed design system). Goes in glass-ui tranche BA as a goo-blob expressivity/perf ask
  alongside the existing `uSatColor[]` ask (§8 of N.md).

---

## 2 — RANK-2 — Desktop panes don't render at all (the N.W2.B `@source` P0, with a perf tax)

Both desktop `pane-wrapper`s report `display:none` at 1440px even though `lg` is matched
(`childCount` 63 and 806, `display:"none"`, `visibility:"visible"`). This is the chartered
**desktop-P0** (`@source` directive comment-only → the `lg:flex`/`lg:block` utilities are tree-
shaken out of the build; N.W2.B, charter §5). It is primarily a *correctness* defect (U32
"desktop = two cards side-by-side"), but it has a **perf consequence that interacts with §1**:
the 806-element offscreen desktop-right subtree (the cached PalettesPane/Mix pane content) is
**fully mounted in the DOM** and its watchers are live, contributing reactive overhead while
invisible. Once W2.B lands and the desktop panes render, the dual-mount of §1 becomes *visibly*
doubled (mobile + desktop both painting blobs) unless W6-PERF-1a lands **first**. **DAG note for
the perf wave: W6-PERF-1a must precede the W2.B desktop-render fix becoming user-visible**, or
the dual-blob cost doubles on screen.

---

## 3 — RANK-3 — CLS 1.03: scroll-driven layout-animations can't composite (U31 "card must NOT resize")

The trace's worst CLS cluster (score **1.0274**, 11.7 s→15.9 s) is dominated by **374
"non-composited animation" flags** — DevTools names `border-bottom-left-radius`,
`border-top-right-radius`, etc., with failure reasons `UNSUPPORTED_CSS_PROPERTY` +
`TARGET_HAS_INVALID_COMPOSITING_STATE`. The animation source is glass-ui's scroll-timeline card
header shrink (`glass-ui.css`: `@keyframes card-header-shrink` animates `padding-top/bottom`;
`card-title-shrink` animates `font-size`; `card-desc-shrink` animates `grid-template-rows`), all
driven by `animation-timeline: --card-scroll`. **Animating padding/font-size/grid-rows/radius is
a layout-and-paint animation** — it cannot run on the compositor, so every frame of the scroll
forces main-thread layout, and the resulting reflow is scored as layout shift.

This is the *measured* face of **U31** ("the card must NOT resize as the numbers change") and
**U17/U24** (shadow/radius fighting). It is partly glass-ui-owned (the keyframes live in
glass-ui's card) and partly demo-owned (the card-shrink is opted-in by a class the demo applies).

**Work-order:**
- **W6-PERF-3a (glass-ui ask):** re-author `card-header-shrink`/`card-title-shrink`/
  `card-desc-shrink` to animate **compositor-safe** properties (`transform: scale`/`translateY`
  + `opacity`) instead of `padding`/`font-size`/`grid-template-rows`, or wrap the shrinking
  region in `contain: layout paint` so its reflow can't escape into document-level CLS. Pair in
  glass-ui BA.
- **W6-PERF-3b (demo):** for the picker card specifically (U31), reserve the numeric column
  width with `tabular-nums` + `ch`-based min-width (the audit's own prescription) so the
  HERO-sized color-space numbers can't reflow the card as they change — kills the demo's
  contribution to this CLS cluster. Binding site: `ComponentSliders.vue` value layout +
  `useSliderGradients.ts:60` `currentColorComponentsFormatted`.
- **W6-PERF-3c (demo):** `App.vue:315` `.pane-wrapper { transition: height, margin, padding … }`
  animates three **non-compositable layout properties** on every pane swap — replace with a
  `transform`-based or `grid-template`-`clip`-based transition. This is the pane-transition jank
  the user flagged in **U12** ("pane transitions not smooth").

---

## 4 — RANK-4 — Hash-as-color-state churns vue-router → 103 ms forced reflow (U12 + N.W6.D router-5)

The `ForcedReflow` insight attributes **103 ms** to `vue-router`'s `popStateHandler →
computeScrollPosition` (`computeScrollPosition` 113 ms total in the call tree). Root cause: the
demo encodes the live color in the **URL hash** (`useColorUrl`, App.vue:213) and the picker
writes the hash on *every* color change; each hash write triggers a router `popstate` whose
scroll-restoration synchronously reads geometry (`offsetWidth`/scroll) after the DOM was
invalidated → layout thrash. During a slider drag this fires at up to rAF cadence.

**Work-order:**
- **W6-PERF-4 (demo, dovetails N.W6.D router 4→5):** debounce/replace the hash write for the
  *interactive* color stream (write the canonical hash on drag-**end** / input-commit, not on
  every tick; keep the live model in memory). When the router migrates to 5 (N.W6.D), set
  `scrollBehavior` to a no-op for the picker route so `computeScrollPosition` is never invoked on
  a same-page hash change. Binding: `useColorUrl.ts`, `usePaneRouter.ts`/`viewSchema.ts`,
  `vue-router` config. **Expected win: eliminate the 103 ms reflow class entirely.**

---

## 5 — RANK-5 — The reactivity fan-out on every color change (the hot leaves)

Each color change flows: `model.value` (a `shallowRef<ColorModel>`, App.vue:128 — correctly
shallow) → `cssColor`/`cssColorOpaque` computeds (`useAppColorModel.ts:18,20`) → and from there
fans out to **four** heavy reactive consumers, all firing per tick:

1. **App.vue:269 `watch(cssColorOpaque)` → `deriveAurora(css)` + writes `auroraAtoms.seed`.**
   `auroraAtoms` is `reactive()` (App.vue:229); glass-ui's `useAurora` **deep-watches** the
   config getter (`aurora.js:617`: `…{ deep: !0 }`), so each seed write re-runs `resolveAtoms`
   (which calls `deriveAurora` again — palette re-derivation) + re-uploads uniforms. The
   `deriveAurora` probe at App.vue:273 runs the derivation **twice** per change (once as the
   throw-probe, once inside `resolveAtoms`).
2. **App.vue:292 `watch(cssColorOpaque)` → `deriveBlobPalette(css, {stopCount:4,…})` →
   `config.color.paletteStops`.** GooBlob deep-watches `paletteStops`; fires per tick. With §1's
   dual-mount, this repaints **two** blobs.
3. **`useSliderGradients.ts:26 computeSliderGradients`** — the heaviest leaf: on every change it
   does `channels × 11 steps` of `sourceColor.clone()` + `toCSSColorString()` (a full color-space
   conversion per stop). For a 3-channel space that's **33 deep-clones + 33 conversions per
   change**. The watch *key* itself (`:45`) builds a string via `.entries().map(toFixed).join()`
   on every reactive read to detect change. It is `shallowRef`-backed (good), but the recompute
   is not memoized across identical neighboring colors and not coalesced with #1/#2.
4. `useAppColorModel.ts:68,71,77` three more watchers (storage sync, name resolution, saved
   colors).

**Work-order:**
- **W6-PERF-5a (demo):** coalesce the aurora-seed + blob-palette + slider-gradient recomputes.
  All three derive from the same `cssColorOpaque`; drive them from **one** rAF-batched effect
  (the SpectrumCanvas already rAF-throttles its *source*, but the three *sinks* each run
  synchronously per model write). Eliminate the double `deriveAurora` (App.vue:273 probe vs the
  `resolveAtoms` internal) by deriving once and reusing.
- **W6-PERF-5b (demo):** memoize `computeSliderGradients` on `(space, quantized-color)` and skip
  recompute when the off-axis channels are unchanged (only the dragged channel's gradient needs
  re-striping; the others are stable per space). **Expected win: ~⅔ of the 33 conversions
  elided on a single-channel drag.**
- These are the demo-side analogue of N.W7.B's library perf-truth (which routed the *library*
  interpolation onto the frozen-plan path); the demo's per-tick color fan-out was never measured
  there.

---

## 6 — RANK-6 — shallowRef opportunities on the large API arrays

Census: the demo has only **6** `shallowRef` sites but **~10 deeply-reactive `ref<T[]>([])`**
arrays holding wholesale-replaced API responses:

| Site | Array |
|---|---|
| `useBrowsePalettes.ts:20` | `remotePalettes = ref<Palette[]>([])` |
| `useAdminUsers.ts:22` | `adminUsers = ref<User[]>([])` |
| `useAdminFlagged.ts:46` | `items = ref<FlaggedPalette[]>([])` |
| `useColorNameQueue.ts:18,20` | `adminColorQueue`, `approvedColors` |
| `useAdminTags.ts:30` / `useTagEdit.ts:26` | `tags`, `allTags` |
| `useAdminAudit.ts:33` | `entries` |
| `useVersionHistory.ts:46` | `versions` |

These are **replaced wholesale** from API fetches (never mutated field-by-field), so deep
reactivity proxies every object and field for zero benefit — each fetch deep-walks N rows. The
palette/audit/version lists can be large.

**Work-order — W6-PERF-6 (demo):** convert wholesale-replaced API arrays to `shallowRef<T[]>`
(or `triggerRef` on replace). Pair with **W6-PERF-7** below. Low-risk, mechanical, KISS.

---

## 7 — RANK-7 — Zero `v-memo`; palette card grids re-render on any array touch

`grep v-memo demo/@ → ZERO`. The palette card grids (`PaletteCardGrid.vue` v-for over the
remote/saved palette arrays; `PaletteCard.vue:80` inner tag v-for) re-render every card subtree
whenever the backing array reactivity fires (vote, rename, sort, filter all touch it). With the
deep arrays of §6 this is amplified.

**Work-order — W6-PERF-7 (demo):** add `v-memo="[palette.id, palette.updatedAt, palette.voteCount, isSelected]"` to the card v-for so a single-card mutation
(a vote, a rename) re-renders one card, not the grid. Dovetails the **U24 PaletteCard
componentization** (the audit already wants PaletteCard promoted to a first-class in-repo
component with skeleton/glass variants — give it a memoized list contract at the same time).
**Expected win: O(1) re-render on single-card edits instead of O(grid).**

---

## 8 — Bundle composition (dist/gh-pages, fresh build Jun 12 04:28)

| Chunk | raw | gzip | Disposition |
|---|---|---|---|
| `index-*.js` (app shell) | 456 KB | **155 KB** | Vue runtime + reka-ui glue + eager components; biggest |
| `glass-ui-*.js` | 400 KB | **113 KB** | reka-ui (125 refs) + floating-ui (51) + dock — single eager vendor chunk |
| `vendor-katex-*.js` | 256 KB | 74 KB | **already code-split** ✓ |
| `vendor-highlight-*.js` | 36 KB | 12 KB | **already code-split** ✓ |
| `color-*.js` | 32 KB | 10 KB | value.js color core |
| `PalettesPane-*.js` | 52 KB | 16 KB | route-split ✓ |
| per-space chunks (oklch/lab/hsv/…) | 8 KB ea | — | **already finely split** ✓ |

**Findings:**
- **Prettier is NOT in the demo bundle** (grepped every `.js` chunk → 0 hits). N.W7.B's library
  prettier eviction held; the demo never bundled the code-formatter. **No action.**
- KaTeX + highlight.js are **already lazy vendor chunks** (the only two the charter named) — good.
- **W6-PERF-8a (code-split candidate):** the **`glass-ui` 400 KB / 113 KB-gz eager chunk** is the
  biggest unsplit cost. `aurora.js` (115 KB) and `goo-blob.js` (57 KB) are separate subpath
  modules in glass-ui's dist and are only needed for the atmosphere/blob — they can be
  `import()`-deferred (the blob is below-the-fold decoration; the aurora can paint its CSS
  fallback first and arm WebGL on idle). The `dock`/`carousel`/`tabs` parts are first-paint and
  must stay eager.
- **W6-PERF-8b:** the `index` shell (155 KB gz) likely eagerly pulls panes that are route-lazy
  elsewhere — audit which custom components are in the entry vs route chunks once W2.B makes the
  desktop panes real (the offscreen-but-mounted desktop subtree may be forcing eager inclusion).

---

## 9 — Standing perf invariants for the wave (proposed; the proof-idiom stays retired)

- **inv-PERF-1 — single-mount per logical pane.** No logical pane/component is mounted in two
  DOM subtrees at once across breakpoints (the §1 dual-mount class). Enforced by the boot-smoke
  asserting `document.querySelectorAll('canvas[data-testid=goo-blob-canvas]').length === 1` at
  any single viewport.
- **inv-PERF-2 — no offscreen live WebGL context.** A `goo-blob`/aurora canvas that is
  `display:none` or out-of-viewport holds no un-paused render loop (glass-ui visibility-gate ask
  W6-PERF-1b).
- **inv-PERF-3 — composited motion only.** No continuously-running animation/transition animates
  a layout/paint property (`width/height/padding/margin/border-radius/font-size/
  grid-template-rows`); the CLS budget on the trace is ≤ 0.1.
- **inv-PERF-4 — no per-tick router churn.** The interactive color stream does not trigger
  `vue-router` scroll restoration (the §4 forced reflow).

---

## 10 — Prioritized perf work-order list (for the N.W6 perf sub-wave) — expected wins

| # | Item | Owner | Severity | Expected win |
|---|---|---|---|---|
| **1a** | Collapse mobile/desktop slot duplication → mount ColorPicker **once** (`v-if` on breakpoint) | demo | **P0** | −1 WebGL2 ctx, ~−16 draw/s idle, half the picker reactive subtree (U11/Defect-A) |
| **1b** | GooBlob: IntersectionObserver/`document.hidden`/PRM-gate the render loop | glass-ui (BA) | **P0** | offscreen + hidden-tab + PRM blobs stop burning GPU (inv-N-9) |
| **3a** | Re-author `card-*-shrink` keyframes to transform/opacity (or `contain`) | glass-ui (BA) | **P0** | CLS 1.03 → ≤0.1 (U31/U17/U24) |
| **3b** | Reserve picker numeric column width (tabular-nums + ch) | demo | P1 | card stops reflowing on number change (U31) |
| **3c** | `.pane-wrapper` transition: layout props → transform | demo | P1 | smooth pane swaps (U12) |
| **4** | Debounce hash-color writes + no-op `scrollBehavior` (router-5) | demo | P1 | −103 ms forced-reflow class (U12, N.W6.D) |
| **5a** | Coalesce aurora-seed + blob-palette + slider-gradient into one rAF-batched effect; kill double `deriveAurora` | demo | P1 | one derivation pass per drag tick instead of 3–4 |
| **5b** | Memoize `computeSliderGradients`; re-stripe only the dragged channel | demo | P2 | ~⅔ of 33 conversions elided per single-channel drag |
| **6** | `shallowRef` the ~10 wholesale-replaced API arrays | demo | P2 | no deep-proxy walk on fetch (large lists) |
| **7** | `v-memo` palette card grids (+ U24 PaletteCard component) | demo | P2 | O(1) re-render on single-card edits |
| **8a** | Lazy-`import()` the glass-ui `aurora`/`goo-blob` subpath chunks | demo | P2 | defer ~170 KB raw off the first-paint critical path |
| **8b** | Audit entry-chunk eager pane inclusion post-W2.B | demo | P3 | trim the 155 KB-gz shell |

**DAG within the perf sub-wave:** 1a **before** the W2.B desktop-render becomes visible (else the
dual-blob doubles on screen). 1b + 3a are glass-ui BA asks (paired-authored). 4 dovetails the
N.W6.D router-5 migration. 5a/5b/6/7 are independent demo lanes. 8a/8b after W2.B.

**Cohort asks to author in glass-ui tranche BA (§8 of N.md):** W6-PERF-1b (GooBlob
visibility/PRM gate) and W6-PERF-3a (card-shrink composited keyframes) — both ride alongside the
existing `uSatColor[]` satellite-color shader ask.

---

## Evidence index
- Live RAF/draw census, canvas census, dual-context proof, DOM-ancestry of both blobs: my page
  #15 `evaluate_script` runs (this lane).
- Perf trace: 40-step color-change burst; CLS 1.03 / ForcedReflow 103 ms insight sets.
- `App.vue:34–69` (dual slot), `:128` (shallowRef model — correct), `:229` (reactive auroraAtoms),
  `:269/:292` (the two cssColorOpaque watchers), `:315` (pane-wrapper layout transition).
- `ColorPicker.vue:22` + `HeroBlob.vue:5,28` (the doubled HeroBlob→GooBlob).
- `useSliderGradients.ts:26,45` (the 33-conversion hot leaf).
- `aurora.js:617` (glass-ui deep-watch); `goo-blob.js` (no visibility/PRM gate).
- `useBrowsePalettes.ts:20` et al. (deep API arrays); `grep v-memo → 0`.
- `dist/gh-pages/assets/*` sizes (raw + gzip).
