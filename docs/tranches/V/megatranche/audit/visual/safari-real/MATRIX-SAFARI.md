# MATRIX-SAFARI — the safari-app evidence cell

**Cell:** `safari-app` (real Safari, driven by `safaridriver` / WebDriver classic)
**Browser:** Safari 26.4, stock Cryptex build, `AppleWebKit/605.1.15` — macOS 26.4.1 (25E253)
**Driver:** `safaridriver` @ `http://localhost:4599`, one session at a time, deleted on every path including failures
**Origin:** `http://localhost:9000` — dev server UP, **API-LESS** (no mongo)
**Display:** screen 2048×1152, avail 2048×1122, `devicePixelRatio` 2
**Captured:** 2026-07-27 12:26–13:14 −0400 (routes seat 12:26–12:39, states seat 12:44–13:14)
**Synthesised:** 2026-07-27 by the Phase D synthesis seat (Opus mechanical)

**Machine-readable sidecars (both verified present):**

- `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real/ROUTE-MATRIX.json` — 21 route cells, every measurement + per-shot sha256
- `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real/STATE-MATRIX.json` — 15 state cells, raw rows, both morph-arm run objects

---

## 0. CELL SEPARATION — read this before reading any verdict below

**These verdicts TWIN the webkit-engine cells. They never replace them.**

`webkit-engine` (Playwright's bundled WebKit, `625.1.21+`, captured by
`docs/tranches/V/megatranche/audit/visual/capture.mjs` + `states.mjs`) and `safari-app`
(this cell, stock Safari 26.4 via `safaridriver`) are **two separate evidence cells over two
separate binaries**. Invariant **I-20** governs both, and it has already fired twice in this
formation — inverted verdicts, both directions:

1. **No webkit verdict has been copied into a safari verdict.** Every `SAFARI` column below was
   measured in real Safari. Where a webkit row exists it appears in its own column, verbatim,
   labelled as the twin — never merged.
2. **A safari cell that was not run is `UNMEASURED`, `UNREACHABLE-IN-CELL`, or
   `UNVERIFIABLE-HERE`. It is never green.** Five webkit `reduced-motion` rows and five webkit
   `forced-colors` rows have **no safari twin at all** and must not be read as corroborated.
3. **A webkit cell that was not run is likewise not green.** The `dark-desktop` cell below is
   NEW — `states.mjs` never ran a dark arm — so it is `UNMEASURED` on the webkit side.
4. **Agreement is evidence. Disagreement is a finding about the harnesses first, the product
   second.** Every disagreement below is run to ground before it is booked, or is explicitly
   declined as a category error.

Consequence for the reader: a defect is only bookable against the product when **both cells
agree**, or when **one cell measures it and the other is declared unreachable for a stated
mechanical reason**. Neither cell is the arbiter of the other.

---

## 1. INVERSION LEDGER — the payload

**Three inversions booked.** All three are in the state matrix; the route matrix produced none.

> ### ⚠ INVERSION 1 — `keyboard-focus-desktop · #/gradient` — **THE ONE THAT MATTERS**
>
> | | |
> |---|---|
> | **webkit-engine** | after 12 `Tab` presses focus **NEVER LEAVES `body`**; `focusRingVisible` `null`. MT-F022 #3 attributed this to macOS Full Keyboard Access being off under Playwright WebKit. |
> | **safari-app** | after 12 `Tab` presses focus is on `main>…>div:nth-child(10)>div:nth-child(1)`; **`focusRingVisible` TRUE**. |
> | **Inverted** | **YES** |
>
> **Ruling: MT-F022 #3 is RESOLVED FROM THE OTHER SIDE.** MT-F022's rule — *a WebKit-only
> keyboard gap is presumed to be Full-Keyboard-Access until Chromium agrees* — is **confirmed
> by the real browser**. Real Safari reaches a ring-bearing stop where Playwright WebKit sat on
> `body`. **NO KEYBOARD DEFECT MAY BE BOOKED FROM THE WEBKIT ROWS OF THIS MATRIX.** Any prior
> reading of those rows as a product a11y failure is retracted by this cell.

> ### ⚠ INVERSION 2 — `keyboard-focus-desktop · #/` — inverted ring, **NOT like-for-like**
>
> | | |
> |---|---|
> | **webkit-engine** | 12th stop = `span[L component value]`; `focusRingVisible` **TRUE**. |
> | **safari-app** | 12th stop = `…>h3>span>span` (a pane-header title span); `focusRingVisible` **FALSE**. |
> | **Inverted** | **YES — and it must NOT be booked as "the ring was lost".** |
>
> **Ruling: the engines walk different tab orders, so "the 12th stop" is a different element in
> each cell.** What is established: real Safari's 12th stop is a **non-interactive header span
> carrying no ring** — which is correct behaviour for a non-interactive element, not a defect.
> A genuine ring claim needs a **per-stop, DOM-path-keyed walk** — the shape the states seat
> nicknamed `kbd-reach.mjs`, *a harness that does not yet exist and is not cited as an artifact* —
> run in the safari-app cell. **That walk was not run. The ring question on `#/` is OPEN, not
> green, in either cell.**

> ### ⚠ INVERSION 3 — `rtl-desktop · #/` — **PARTIAL**, and it is the katex half
>
> | | |
> |---|---|
> | **webkit-engine** | clipped list **capped at 8** by `states.mjs` `.slice(0,8)`: `spectrum-dot`, one SVG `path`, and **six katex MathML nodes** (`math`/`semantics`/`mrow`/`msup`/`mi`/`mo`). |
> | **safari-app** | exactly **TWO** elements sit outside the viewport in the entire document: `span.spectrum-dot.absolute` and one SVG `path`. **No MathML node is outside.** |
> | **Inverted** | **YES (partial)** |
>
> **Ruling: neither side is a product defect.** Safari lays the visually-hidden `.katex-mathml`
> copy out **inside** its `overflow:hidden` parent; Playwright WebKit reports it as bleeding.
> The two cells **AGREE on everything load-bearing** — `dir` flips post-load, `overflowX` 0.
> **MT-F022 consequence 4 is re-derived in the safari-app cell: RTL is an UNCLAIMED capability,
> not a broken one.**

### Divergences examined and DECLINED as inversions

| # | Divergence | Why it is not an inversion |
|---|---|---|
| D-1 | `#/blob` canvas count: safari **1**, webkit REPORT.md **2** (desktop) | **Not cross-engine truth — the webkit cell disagrees with ITSELF.** Verified directly in `REPORT.json`: `/#/` reads canvas **1** in `safari-desktop-light` and **2** in `safari-desktop-dark`, same route, same engine, same width. Canvas counts are a settle/mount timing artifact in both harnesses. Recorded as an observation; **no verdict scored either way** (I-20). |
| D-2 | clipped-element counts: safari totals (77, 152, 694) vs webkit "8" | **Category error, not a delta.** `states.mjs` truncates with `.slice(0,8)` and never states a total. Only **first-8 identities** are comparable — and on `#/gradient` those identities MATCH exactly (`strip-row`, `strip-family`, `family-eyebrow`, `family-tiles`, `glass-chip`, `svg`, `path`). |
| D-3 | `#/generate` @1440: safari `PARTIAL` (textLen 84) vs webkit textLen **310** | **Settle-bound, and the curve is monotone.** Safari @2.3 s → 84; safari @4 s → **227**; webkit @3.55 s settle → 310. Both cells agree the panel mounts. Booked `PARTIAL`-with-caveat, **not** a blank defect. |
| D-4 | `rtl-mobile`: webkit reports `canvas.goo-blob-canvas` overhanging, safari does not | Sub-pixel canvas sizing difference. No product consequence in either cell. |

---

## 2. ROUTE MATRIX — 21 cells, 7 routes × 3 widths

Routes taken **verbatim** from `ROUTES[]` in
`docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs`. None invented.

**Viewport clamp record: the OS did NOT clamp.** Safari accepted all three window rects verbatim
and `innerWidth` matched the request **exactly** at every tier. `innerHeight` is 52 px short at
every tier — that is browser chrome, not a clamp. The real constraint is the **display**: at the
widest tier ~**1392 CSS px of window width sits off-screen** (window 3440 vs logical screen 2048).
3440 is wider than the display can present, not wider than Safari will accept.

All shot paths below are relative to
`/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real/`.
**Every file listed was verified present with `ls` and its sha256 recomputed at synthesis time.**

### 2.1 Mobile — requested 390×844 → actual **390×792**

| Route | Verdict | textLen | nodes | visBoxes | btn | canvas | scrollW | Shot | sha256 (first 16) |
|---|---|---|---|---|---|---|---|---|---|
| `#/` | RENDERS | 69 | 228 | 104 | 17 | 1 | 390 | `root-390.png` | `ae4c0b91f242d872` |
| `#/gradient` | RENDERS | 502 | 518 | 334 | 58 | 1 | 390 | `gradient-390.png` | `38973a2b17287ba4` |
| `#/browse` | **UNVERIFIABLE-HERE** | 175 | 266 | 124 | 19 | 1 | 390 | `browse-390.png` | `d7f5cfffa07a729d` |
| `#/blob` | **PARTIAL** | 68 | 228 | 104 | 17 | 1 | 390 | `blob-390.png` | `3a81656f5e69dd99` |
| `#/generate` | RENDERS | 199 | 352 | 176 | 26 | 1 | 390 | `generate-390.png` | `80662df6ea63bf23` |
| `#/mix` | RENDERS | 171 | 309 | 155 | 26 | 2 | 390 | `mix-390.png` | `798cc7ff168d15be` |
| `#/extract` | RENDERS | 194 | 312 | 163 | 20 | 1 | 390 | `extract-390.png` | `558ee219ab83ce4b` |

`<main>` box 358×680 on every mobile cell.

- **`#/` note** — title `lab(92% 88.8 20 / 82.7%) — Color Picker`; the app rewrites the hash to
  `#/?space=lab&color=…` on boot. Mobile collapses to dock + picker card only; the same route at
  desktop expands to `h2`=10 / 855 chars.
- **`#/blob` = the mobile finding.** Title reads `Blob — Color Picker`, but the DOM is the
  **shape of `#/`** at this width: 228 nodes / 104 visible boxes / 17 buttons / 68 chars (vs 69
  on `#/`). The blob right-pane does not mount at 390. **The asymmetry is the finding:**
  `#/mix` is *also* a right-pane view and it **DOES** mount at 390 (309 nodes, 171 chars,
  `Mix Mix colors and palettes together`). *Cross-cell remark, not a copied verdict:* the
  webkit-engine mobile rows in `REPORT.json` independently record `/#/blob` at 228 elements /
  17 buttons / textLen 69 against `/#/` at 228 / 17 / 70 — the two cells **corroborate**.
- **`#/browse`** — shell paints (`main`=1, 266 nodes, 19 buttons) but the text reads
  `Browse Discover palettes from the community. The commons is unreachable. Failed to load`.
  **API-less environment fact. NO defect booked.**

### 2.2 Desktop — requested 1440×900 → actual **1440×848**

| Route | Verdict | textLen | nodes | visBoxes | btn | canvas | scrollW | Shot | sha256 (first 16) |
|---|---|---|---|---|---|---|---|---|---|
| `#/` | RENDERS | 855 | 1741 | 991 | 26 | 1 | 1440 | `root-1440.png` | `3926873800882069` |
| `#/gradient` | RENDERS | 659 | 586 | 367 | 58 | 1 | 1440 | `gradient-1440.png` | `b739b43f4af8afeb` |
| `#/browse` | **UNVERIFIABLE-HERE** | 326 | 326 | 157 | 19 | 1 | 1440 | `browse-1440.png` | `3971d725b3fda9a0` |
| `#/blob` | RENDERS | 710 | 642 | 477 | 27 | 1 | 1440 | `blob-1440.png` | `ef40b8f265c7deb9` |
| `#/generate` | **PARTIAL** | 84 | 258 | 123 | 21 | 1 | 1440 | `generate-1440.png` | `160f3ca704775161` |
| `#/mix` | RENDERS | 183 | 342 | 166 | 30 | 2 | 1440 | `mix-1440.png` | `720428debd71741f` |
| `#/extract` | RENDERS | 345 | 372 | 196 | 20 | 1 | 1440 | `extract-1440.png` | `a438c751d07d3494` |

`<main>` box 1408×752 on every desktop cell.

- **`#/` is the heaviest cell in the matrix** — `h2`=10, the About-the-color-spaces pane fully
  populated, 1741 nodes / 991 visible boxes.
- **`#/blob` — visually verified**: picker card + Blob control panel (sliders, Copy JSON/Reset)
  paint. **No metaball is visible in the frame** and canvas count reads 1. See D-1: this is
  recorded as an observation, not scored.
- **`#/generate` = `PARTIAL`, screenshot-verified**: only the dock (label reads `Generate`) and
  the Lab picker card paint; the Generate panel and the palettes pane are absent. See D-3 — a
  repeat at 1440 with a **4 s** settle measured 227 chars, so this reads as a **slow pane mount**
  at the ~2.3 s settle rather than a hard blank. Booked `PARTIAL` with that caveat.

### 2.3 Widest — requested 3440×1440 → actual **3440×1388** (no clamp; ~1392 px off-screen)

| Route | Verdict | textLen | nodes | visBoxes | btn | canvas | scrollW | Shot | Kind | sha256 (first 16) |
|---|---|---|---|---|---|---|---|---|---|---|
| `#/` | RENDERS | 855 | 1741 | 991 | 26 | 1 | 3440 | `root-3440.png` | window | `072148d528289841` |
| `#/gradient` | RENDERS | 659 | 586 | 367 | 58 | 1 | 3440 | `gradient-3440.png` | window | `6eefe56a7633c408` |
| `#/browse` | **UNVERIFIABLE-HERE** | 223 | 326 | 157 | 19 | 1 | 3440 | `browse-3440.png` | window | `5264cc977f65ffd6` |
| `#/blob` | RENDERS | 710 | 642 | 477 | 27 | 1 | 3440 | `blob-3440.png` | window | `81da78af175f611b` |
| `#/generate` | RENDERS | 356 | 412 | 209 | 26 | 1 | 3440 | `generate-3440.png` | **element** | `de0f8b96ee1c049e` |
| `#/mix` | RENDERS | 183 | 342 | 166 | 30 | 2 | 3440 | `mix-3440.png` | **element** | `81c9825c1598512e` |
| `#/extract` | RENDERS | 345 | 372 | 196 | 20 | 1 | 3440 | `extract-3440.png` | **element** | `2bcc232c1c814245` |

`<main>` box 3408×1288 on every widest cell.

- **`#/generate` at 3440 flips to RENDERS** — DOM healthy (356 chars, 412 nodes) and **visually
  verified** via an element snapshot of `<main>`: Generate panel, picker card and My Palettes
  pane all painted. Corroborates D-3 (settle, not blank).
- **`#/browse` at 3440** shows the empty-state text `My Palettes Save, organize, and share your
  colors. Start a new palette · EMPTY PLATE` — the API-less environment again. No defect.
- **Layout observation (all widest cells):** `<main>` is 3408 wide but painted content occupies
  a **narrow centre band with very large empty gutters** on both sides. Visible in
  `root-3440.png` and `generate-3440.png`. Handed to the layout seat as an observation.

**Preserved failure frames** (the evidence for §5.2 — all three byte-identical,
sha256 `914cfe439270b331…`):

| File | Bytes | sha256 |
|---|---|---|
| `generate-3440-windowsnap-black.png` | 343 548 | `914cfe439270b33121b2f3373bab10b9b9f25c3edfc52d0c547cf45d9863f6b4` |
| `mix-3440-windowsnap-black.png` | 343 548 | `914cfe439270b33121b2f3373bab10b9b9f25c3edfc52d0c547cf45d9863f6b4` |
| `extract-3440-windowsnap-black.png` | 343 548 | `914cfe439270b33121b2f3373bab10b9b9f25c3edfc52d0c547cf45d9863f6b4` |

### 2.4 Route-matrix cross-cell observations (measured in THIS cell)

1. **`h1` count is 0 on all 21 cells.** The app ships **no `<h1>`** on any of the 7 routes at any
   of the 3 widths. *(The webkit cell independently records `h1: 0` too — corroboration, not a
   copied verdict.)*
2. **`documentElement.scrollWidth` equals `innerWidth` on all 21 cells** (390/1440/3440) —
   **no horizontal overflow measured in real Safari at any width.**
3. **`<main>` count is exactly 1 on all 21 cells.**
4. Every one of the 21 deliverable PNGs has a **distinct sha256**; the 3 preserved black frames
   share one sha, which is itself the evidence.

---

## 3. STATE MATRIX — 15 cells

Webkit source: `docs/tranches/V/megatranche/audit/visual/STATES.json` (harness `states.mjs`).
All safari rows measured at 1440×848 unless noted.

| # | Cell | WEBKIT-ENGINE verdict (twin, verbatim) | SAFARI-APP verdict (measured here) | INVERTED? |
|---|---|---|---|---|
| 1 | `rtl-desktop · #/` | `dir=rtl` post-load; `overflowX` 0; clipped list **CAPPED at 8** — `spectrum-dot`, an SVG `path`, six katex MathML nodes | **MEASURED** — `dir=rtl` takes post-load in real Safari too; `overflowX` 0 / `overflowY` 0; **exactly TWO** elements outside the viewport document-wide: `span.spectrum-dot.absolute` + one SVG `path`. textLen 874, 19 animations | **⚠ YES (partial)** — *see Inversion 3* |
| 2 | `rtl-desktop · #/gradient` | 8 clipped (**CAPPED**) — `strip-row`, `strip-family`, `family-eyebrow`, `family-tiles`, `glass-chip`, `svg`, `path` | **MEASURED** — 77 outside the viewport; the **first 8 are the SAME set** plus `spectrum-dot`. textLen 710, `overflowX` 0, 29 animations | no — *see D-2* |
| 3 | `rtl-desktop · #/browse` | 0 clipped, `overflowX` 0 | **MEASURED** — 1 clipped (`span.spectrum-dot.absolute`), `overflowX` 0, textLen 337, 23 animations | no |
| 4 | `rtl-desktop · #/blob` | 1 clipped (`spectrum-dot`) | **MEASURED** — 1 clipped (`spectrum-dot`), `overflowX` 0, textLen 726, 21 animations | no — **exact agreement, including offender identity** |
| 5 | `rtl-desktop · #/admin/users` | 0 clipped, textLen 273 | **UNVERIFIABLE-HERE** for the data surface (API-less). **Shell measured clean**: `dir=rtl`, `overflowX` 0, 1 clipped (`spectrum-dot`), textLen 328 | no |
| 6 | `keyboard-focus-desktop · #/gradient` | after 12 Tabs focus **NEVER LEAVES `body`**; `focusRingVisible` `null` (MT-F022 #3 → Full Keyboard Access off) | **MEASURED** — focus on `main>…>div:nth-child(10)>div:nth-child(1)`; **`focusRingVisible` TRUE**; textLen 763, 129 clipped, 31 animations | **⚠⚠ YES — THE INVERSION** — *see Inversion 1* |
| 7 | `keyboard-focus-desktop · #/` | focus reached `span[L component value]`, ring **TRUE** | **MEASURED** — focus reached `…>h3>span>span` (pane-header title span), ring **FALSE**; textLen 927, 694 clipped, 21 animations | **⚠ YES — not like-for-like** — *see Inversion 2* |
| 8 | `keyboard-focus-desktop · #/blob` | focus reached `span[Sat Radius]`, ring **TRUE** | **MEASURED** — focus reached a deep slider span, ring **TRUE**; textLen 779, 63 clipped, 23 animations | no — agreement on the verdict that matters, on different elements |
| 9 | `zoom-200-desktop · #/` | textLen 859 → 70, clipped `[]`, `overflowX` 0 — **MT-F022 #4 ruled this CORRECT BEHAVIOUR** (the 720 px breakpoint, same path as mobile) | **MEASURED** at a real 720-CSS-px window (inner 720×398): textLen 78, clipped 0, `overflowX` 0, 20 animations | no — **MT-F022 #4 RE-DERIVED IN REAL SAFARI** |
| 10 | `zoom-200-desktop · #/gradient` | 8 clipped (**CAPPED**), `overflowX` 0 | **MEASURED** — 152 outside the viewport, `overflowX` 0, textLen 553, 26 animations | no — *see D-2* |
| 11 | `rtl-mobile · #/` | 2 clipped (`spectrum-dot`, `canvas.goo-blob-canvas`), textLen 70 | **MEASURED** — 1 clipped (`spectrum-dot`), textLen 78, `overflowX` 0, inner 390×792, 20 animations | no — *see D-4* |
| 12 | `rtl-mobile · #/blob` | 2 clipped (`spectrum-dot`, `canvas.goo-blob-canvas`) | **MEASURED** — 1 clipped (`spectrum-dot`), textLen 77, `overflowX` 0, 21 animations | no — *see D-4* |
| 13 | `dark-desktop · #/` **(NEW cell)** | **UNMEASURED — `states.mjs` never ran a dark arm. MUST NOT be read as green on the webkit side.** | **MEASURED** via the app's OWN toggle: `localStorage['vueuse-color-scheme']` drives `demo/color-picker/index.html:169-172`, which stamps `class="dark"` on `<html>`. `dark` → `htmlClass 'dark'`, body `rgb(38,0,27)`; forced `light` → `htmlClass ''`, body `rgb(179,114,144)`. Both directions confirmed on `#/` and `#/gradient`, same textLen + same clipped set each way | n/a — no twin exists |
| 14 | `light-control-desktop · #/` | *(control row, no webkit twin)* | **MEASURED** — `htmlClass ''`, textLen 874, 694 clipped, `overflowX` 0, 24 animations. Confirms scheme does not move any compared quantity | n/a |
| 15 | `LTR baseline · #/` — the "694 clipped" signal | **NOT COMPARABLE** — the webkit harness caps at 8 and states no total | **MEASURED and RUN TO GROUND rather than booked** — see below | no |

### 3.1 Cell 15 — an MT-F022-class false signal caught in this seat's own hands

694 of 1560 visible elements report `right > clientWidth` on `#/` at 1440 — but **only 9 are
ROOTS**, and one root carries **1454 descendants**.

- **The one real root:** `div.glass-resting.card` inside `div.pane-wrapper--right`, at
  `left=1280 right=1817` — **377 CSS px past a 1440 viewport**, parent `overflow: visible`,
  document `overflowX` 0 so it **cannot be scrolled to**.
- The other 8 roots are katex-mathml nodes and one SVG `path` **inside `overflow:hidden`
  parents** — i.e. probe false positives.
- Under `dir=rtl` the same page reports **2**, because the pane flips.

**The honest statement is ONE overhanging right-pane card, not 694 clipped elements.**
Whether that overhang is a defect belongs to the layout seat; this cell records the measurement
and its mechanism.

### 3.2 Scheme confound — declared for the whole state matrix

This machine **prefers dark**, so the **default boot is dark**. Rows 1–8 and 13–15
(`rtl-desktop`, `keyboard-focus-desktop`, `dark-desktop`) were measured in **DARK** while the
webkit rows beside them ran in Playwright's default **LIGHT**. Rows 9–12 (`zoom-200-desktop`,
`rtl-mobile`) were measured in **LIGHT** and are scheme-matched.

**None of the compared quantities is scheme-dependent** — `dir`, `overflowX`, `textLen`, focus
path, ring visibility, clipped identity. Declared so no reader has to rediscover it.

---

## 4. MORPH ARM — `NOT-DRIVEN`

**Verdict: `NOT-DRIVEN`. Reporting SURVIVED would have been a false green.**

### 4.1 What drives expansion — read from source, not guessed

`demo/shell/dock/Dock.vue:133` renders
`<GlassDock :collapse-delay="5000" :start-collapsed="false" :fit-content="true" :always-expanded="!isDesktop">`.
Posture is glass-ui `useDockState`'s three-state FSM (`collapsed | hover | pinned`) driven by
`mouseenter` / `mouseleave`+timer / click-on-collapsed, plus the consumer's ref-counted
`keepOpen()`/`release()` hold (`Dock.vue:86-88`) and `expand()` on edit (`Dock.vue:90`).
The morph is `useDockMorphOrchestrator` projecting the face onto the shared `--dock-morph-t`
spring; `morph.css` then sets `--dock-expand-t := --dock-morph-t` under `[data-morphing]` and
feeds it to the **nested `color-mix`** on `.dock-plate` background.

### 4.2 How it was driven

Real DOM events dispatched via `execute/sync` — `pointerover/enter/move` + `mouseover/enter/move`,
the `leave/out` pair, and a full `pointerdown/up` + `click` on the collapsed dock: **exactly what
`useDockState` listens to**. WebDriver pointer actions were tried first and **hung the driver**
(see §5.5), so they were abandoned.

### 4.3 What happened

The **FSM ran**: the dock left `.expanded` (`--dock-expand-t` 1, width 464–469) and entered
`.collapsed[data-morphing]` (`--dock-expand-t` `calc(1 - 0)`, width 56 observed once), then
returned. **But `--dock-morph-t` stayed EXACTLY 0 in every sample** across 4+3 reversal-storm
passes, the width never took an intermediate value, and the sampler captured 6–7 frames in ~60 s.

The spring is rAF-driven and **rAF is throttled to ~1 Hz in the hidden automation window**, so
`--dock-expand-t` never traversed `(0,1)`. **ZERO frames of genuine morph were driven.**

**Safari did not crash.** Sessions stayed alive and were deleted cleanly on every run; no Safari
`.ips` was written at any point during this arm.

### 4.4 Supplementary — LABELLED SYNTHETIC, this is NOT the morph

With `data-morphing` forced on, `--dock-expand-t` was written across **246 fractional values**
(6 passes × 41 steps, both directions) while reading `.dock-plate`'s resolved
`backgroundColor`/`borderColor` at each step. **All resolved cleanly, no throw, no crash:**

| t | resolved `.dock-plate` background |
|---|---|
| 0 | `color(srgb 0.384505 0.327291 0.27789 / 0.4544)` |
| 0.25 | `color(srgb 0.386216 0.329318 0.281549 / 0.4852)` |
| 0.5 | `color(srgb 0.387722 0.331104 0.284771 / 0.516)` |
| 0.75 | `color(srgb 0.389059 0.332688 0.28763 / 0.5468)` |
| 1 | `color(srgb 0.390253 0.334104 0.290184 / 0.5776)` |

This exercises the **style-resolution** path of the nested `color-mix`. **It cannot exercise
paint.**

### 4.5 Crash reports OBSERVED but NOT ATTRIBUTABLE TO THIS ARM (stated so no one mis-attributes)

**Two** reports carrying the **exact glass-S0 signature** exist on this machine today. **Both
are `webkit-engine`, not `safari-app`** — verified present at synthesis time:

| File | Size | Written |
|---|---|---|
| `~/Library/Logs/DiagnosticReports/com.apple.WebKit.WebContent.Development-2026-07-27-111524.ips` | 39 095 B | 11:15 |
| `~/Library/Logs/DiagnosticReports/com.apple.WebKit.WebContent.Development-2026-07-27-131147.ips` | 41 194 B | 13:11 |

`procPath` = `/Users/USER/Library/Caches/*/com.apple.WebKit.WebContent.**Development**` (the
Playwright-bundled build, `625.1.21+`), `coalitionName` `com.microsoft.VSCode`, `parentProc`
`launchd`, both `SIGABRT` (Abort trap: 6) ~1.2–1.7 s after process launch. The 11:15 report
**predates the routes seat by ~70 minutes**. **Neither is attributable to the safari-app cell.**
No stock-`Safari*.ips` exists.

**Key frames (identical in both):**

```
std::terminate()
  ← WebCore::Style::Color::resolvedColor() const
  ← WebCore::Style::toStyleColor(WebCore::CSS::ColorMix const&, ColorResolutionState)
  ← WebCore::Style::toStyleColor(WebCore::CSS::Color const&, WTF::Ref<Document const>)
  ← WebCore::Style::CSSValueConversion<Style::Color>::operator()(BuilderState)
  ← WebCore::Style::BuilderFunctions::applyValueBackgroundColor(BuilderState&)
  ← Style::Builder::applyProperty(CSSPropertyID, CSSValue&)
  ← applyNonHighPriorityProperties()
  ← Style::Resolver::applyMatchedProperties()
  ← TreeResolver::resolveElement / resolveComposedTree / resolve()
  ← WebCore::Document::resolveStyle()
```

**What that establishes:** the crash class aborts inside `toStyleColor(CSS::ColorMix)` while the
style builder applies **`background-color`** during `Document::resolveStyle` — at **STYLE
RESOLUTION, not paint**, and on **precisely the property `morph.css` nests `color-mix` into**
(`.dock-plate` background). That is the strongest available corroboration of the mechanism, and it
means **the arm does not in principle require a visible window**.

**What the safari-app non-repro therefore says — and only this:** real Safari 26.4 (605.1.15)
resolved 246 fractional nested-`color-mix` backgrounds **without aborting**, while the Playwright
WebKit build carries a signature that aborts on exactly that path. **It does NOT clear the
product**, and it does NOT close glass-S0.

### 4.6 To finish the arm

**One safari-app run in a VISIBLE, FOCUSED window** (`visibilityState 'visible'`, rAF ≥ 20 Hz) so
the spring traverses `(0,1)` and the page paints. Everything else is wired and reproducible from
`morph-arm3.mjs`. Full record: `STATE-MATRIX.json` → `morphArm` + both raw run objects.

---

## 5. DECLARED LIMITATIONS AND BLIND SPOTS OF THIS CELL

Everything here is declared rather than papered over. **A blind spot is not a green.**

### 5.1 Early-boot / console errors — DECLARED BLIND SPOT

WebDriver classic **cannot inject before load**. `window.onerror` + `unhandledrejection` hooks
were installed **AFTER** load (and, in the states seat, after a forced reload). Post-install error
arrays were **empty on all 21 route cells and all 15 state cells**.

> **That is NOT a claim of zero boot errors.** Early-boot errors are outside this cell's reach
> entirely. *(For contrast, the webkit cell — which CAN inject pre-load — recorded one console
> error: `safari-desktop-light /#/: WebGL: context lost.` That row is the webkit cell's, not
> this one's.)*

### 5.2 Window screenshots broken — reproduces at BOTH widest AND desktop

- **Widest (3440×1440):** `GET /session/<id>/screenshot` returns a **pixel-identical all-black
  6880×2776 PNG**. Four valid frames were captured first (`root`/`gradient`/`browse`/`blob`),
  then it degraded **permanently**: 9 further attempts across **3 FRESH sessions** — including as
  the very first capture of a session, and for the previously-good `#/` control — all returned
  the identical black frame. A repaint nudge did not revive it.
- **Desktop (1440×900):** the states seat reproduced it at desktop size — a pure-black 2880×1696
  PNG, **byte-identical across two routes and two colour schemes**
  (sha256 `592299a3b4b3cf2e55eb855f4ad350c8427c3e1367f7dd3a019c170203f658c8`), **widening the
  routes seat's 3440-only finding**.

**Proven a DRIVER failure, not an app blank:** the frame is pure black while the page's own body
background computes to `rgb(38,0,27)`, and an **element** snapshot of `<main>` taken at the same
instant returns 11.3–11.6 MB of real painted content. Mechanism is the hidden window (§5.3).

**Element snapshots are unaffected and paint real content.**

### 5.3 Hidden window — rAF throttle, and it invalidates every motion number

The `safaridriver` automation window reports `document.visibilityState` `'hidden'` and
`document.hasFocus()` `false` **even after an AppleScript raise** (`set index of window to 1` +
`activate`). Consequences:

- rAF is throttled to **~1 Hz** — this seat's own rAF chain ticked **ONCE in 1500 ms**; a 16 ms
  `setInterval` sampler yielded 6–7 samples across ~60 s.
- **Every `rafPer1500ms` in every row reads 0 and MEANS NOTHING ABOUT THE APP.** It is not a
  motion finding.
- The window never paints → this bounds the morph arm (§4) and the whole pixel path (§5.2).
- **What IS measurable and IS reported:** `document.getAnimations()` returns **19–31 running CSS
  animations per route**.

### 5.4 Emulation-locked states — UNREACHABLE-IN-CELL

| State | Webkit rows | Why unreachable here |
|---|---|---|
| `prefers-reduced-motion` | 5 | macOS System Settings switch; WebDriver classic has no media emulation and `safaridriver` exposes no override. **MT-F022 #2's rAF finding CANNOT be re-derived in this cell at all** — and §5.3 would defeat it even if the media query could be set. |
| `forced-colors` / Increase Contrast | 5 | System setting, no WebDriver hook. *(`states.mjs:8` already records that WebKit ignores Playwright's `forcedColors`, so those 5 webkit rows assert nothing either — **neither cell has evidence here**.)* |
| `pointer: coarse` | — | Not reached at all. |
| `prefers-color-scheme` **as media state** | — | Unreachable. Dark was reached through the **app's own persisted toggle** instead (cell 13) — a different mechanism, honestly labelled. |

### 5.5 Driver defect — WebDriver pointer actions HANG `safaridriver`

`POST /session/<id>/actions` with a `pointerMove` **hung `safaridriver` indefinitely** (no
response in ~25 min). The session's **entire command queue blocked, `DELETE` included**, so both
drivers on `:4599` and `:4622` returned `already paired`.

**Recovery was minimal and non-destructive:** the automation window alone was closed by URL match
(`osascript`, every document whose URL starts with `http://localhost:9000`), leaving the user's
two Safari windows and every process untouched. The driver freed immediately.

**KEY actions (`Tab`) work normally** and carried the 12-Tab walks.

> **STANDING INSTRUCTION FOR LATER SEATS: drive pointers by dispatched DOM events, never by the
> `/actions` endpoint.**

### 5.6 Display / clamp

**No OS clamp.** Safari accepted all three window rects verbatim (390×844, 1440×900, 3440×1440)
and `innerWidth` matched the request exactly at every tier; `innerHeight` is 52 px short at every
tier (browser chrome). The real constraint is the **display**: screen 2048×1152, avail 2048×1122,
dpr 2 — so at the widest tier roughly **1392 CSS px of window width sits off-screen**. 3440 is
wider than the display can present, not wider than Safari will accept.

### 5.7 API-less environment — `UNVERIFIABLE-HERE`

The dev server is up but has **no mongo**. Consequences, all environment facts and **none booked
as defects**:

- `#/browse` is the one data-backed primary surface among the 7 routes → **`UNVERIFIABLE-HERE`
  at all three widths**.
- The right-hand *palettes* pane on `browse` / `extract` / `generate` / `gradient` is empty for
  the same reason and **was not counted against those routes**.
- `#/admin/users` — every authenticated/roster state is **`UNVERIFIABLE-HERE`**; only the layout
  shell was measurable (and it is clean). **Owed to the first API-backed capture cell.**

### 5.8 Settle

~1.5 s base + 0.8 s post-hook (~**2.3 s**), with +2.5 s extra on the first route of each viewport.
`#/generate` at 1440 is **settle-sensitive** (84 chars @2.3 s vs 227 @4 s), which is why it is
`PARTIAL`-with-caveat rather than a booked blank. *(The webkit harness used ~3.55 s on that route
and read 310 — see D-3.)*

### 5.9 Scope

**Route matrix:** light appearance only (no dark twin), **first paint only** — no interaction, no
scroll state, no tap-target or contrast measurement. **State matrix:** dark/light both reached via
the app's own toggle; no pixel path (§5.2/§5.3).

### 5.10 Comparability

`states.mjs` truncates its clipped list with `.slice(0,8)` and **states no total**, so **no webkit
row states a total**. Only **first-8 identities** are comparable to this cell's `clippedTotal`.
Comparing the numbers is a category error (D-2).

### 5.11 Session hygiene and write discipline

- **Every session created was deleted**, including on the discriminator paths and on the hang
  recovery path. `safaridriver /status` reads `{ready:true}` with no session outstanding.
- **WRITES: only under `docs/tranches/V/megatranche/audit/visual/safari-real/` and the
  scratchpad.** `src/` `demo/` `api/` `test/` `e2e/` **untouched** — read-only throughout.

---

## 6. ARTIFACT INDEX — every file verified present with `ls` at synthesis time

Base: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real/`

**Deliverable route PNGs — 21, all distinct shas** (§2.1–2.3 tables carry the per-file sha256):
`root-390.png` · `gradient-390.png` · `browse-390.png` · `blob-390.png` · `generate-390.png` ·
`mix-390.png` · `extract-390.png` · `root-1440.png` · `gradient-1440.png` · `browse-1440.png` ·
`blob-1440.png` · `generate-1440.png` · `mix-1440.png` · `extract-1440.png` · `root-3440.png` ·
`gradient-3440.png` · `browse-3440.png` · `blob-3440.png` · `generate-3440.png` · `mix-3440.png` ·
`extract-3440.png`

**Preserved failure frames — 5:**

| File | sha256 | What it proves |
|---|---|---|
| `generate-3440-windowsnap-black.png` | `914cfe439270b331…` | widest window-snapshot failure |
| `mix-3440-windowsnap-black.png` | `914cfe439270b331…` | byte-identical — same failure |
| `extract-3440-windowsnap-black.png` | `914cfe439270b331…` | byte-identical — same failure |
| `rtl-desktop-picker-1440-windowsnap-black.png` | `592299a3b4b3cf2e…` | failure reproduces at **desktop** size |
| `dark-desktop-picker-1440-windowsnap-black.png` | `592299a3b4b3cf2e…` | byte-identical across route **and** scheme |

**Working pixel path — 1:**
`dock-morph-safari26.4-element.png` (139 976 B, sha256 `fde4e0234aaea0c2…`) — 928×122, the dock
rendered correctly by an **element** snapshot. The only pixel path that works in this cell.

**Sidecars — 2:** `ROUTE-MATRIX.json` (13 907 B) · `STATE-MATRIX.json` (48 808 B)

**Present but NOT produced by these two seats:** `picker-safari26.4-light.png`
(sha256 `1704d0ce896eb05e…`, written 10:26, ~2 h before the routes seat) — from an earlier safari
probe. Listed for completeness; **no verdict in this document rests on it.**

**Harness scripts** (scratchpad
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`,
all verified present):
`safari-route-matrix.mjs` · `safari-recheck.mjs` · `safari-discriminate.mjs` ·
`safari-widest-retry.mjs` · `safari-widest-element.mjs` · `states-safari.mjs` · `verify-safari.mjs` ·
`morph-arm.mjs` · `morph-arm2.mjs` · `morph-arm3.mjs` · `wd.mjs`

**Twinned webkit-engine cell (for reference — NOT merged into anything above):**
`docs/tranches/V/megatranche/audit/visual/REPORT.md` · `REPORT.json` (60 captures) ·
`STATES.json` · `capture.mjs` · `states.mjs`

---

## 7. WHAT THIS CELL DOES AND DOES NOT SETTLE

**Settles (measured in real Safari):**

- No horizontal overflow at 390 / 1440 / 3440 on any of the 7 routes. `<main>` count is 1
  everywhere. `h1` count is 0 everywhere.
- **MT-F022 #3 is resolved: no keyboard defect is bookable from the webkit rows.** Real Safari
  reaches a ring-bearing stop within 12 Tabs on `#/gradient` and `#/blob`.
- **MT-F022 #4 is re-derived in real Safari**: 1440-desktop 874 → 720-window 78 → 390-mobile 78,
  the same three-way identity. Reflow at the 720 px breakpoint is correct and content stays
  reachable through the pane router. *(Caveat: a 720 px WINDOW, not a 200 % zoom — `safaridriver`
  cannot set `deviceScaleFactor`, and MT-F022 #4 is itself the authority for treating the two as
  one code path.)*
- **RTL is an UNCLAIMED capability, not a broken one** — `dir` flips post-load, `overflowX` 0 on
  all five RTL routes; the sole recurring offender is `span.spectrum-dot.absolute`.
- The `#/blob` right-pane **does not mount at 390** while `#/mix` — also a right-pane view — does.
- The `694 clipped` signal is **ONE overhanging right-pane card**
  (`div.glass-resting.card` in `div.pane-wrapper--right`, 377 px past a 1440 viewport,
  unscrollable), **not 694 elements**.
- Real Safari 26.4 resolved **246** fractional nested-`color-mix` backgrounds without aborting.

**Does NOT settle — open, and explicitly NOT green:**

- **Early-boot errors** (§5.1) — outside this cell's reach.
- **`reduced-motion` and `forced-colors`** (§5.4) — no evidence in *either* cell.
- **Motion / rAF behaviour** (§5.3) — every number is an artifact of the hidden window.
- **The morph arm** (§4) — `NOT-DRIVEN`; **glass-S0 is NOT closed** by the non-repro.
- **The `#/` ring question** (Inversion 2) — needs a per-stop DOM-path-keyed walk.
- **Every API-backed surface** (§5.7) — `#/browse` at all widths, `#/admin/users` roster/auth.
- **Any pixel-level judgement** at 1440 and 3440 via window snapshot (§5.2) — element snapshots
  only.
