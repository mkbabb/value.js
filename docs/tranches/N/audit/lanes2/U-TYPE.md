# Lane U-TYPE — typography + atmosphere ground-truth (U1, U2, U31, U30a)

**Fleet**: second N-tranche deep-audit (lanes2). **Mode**: tranche-development only — nothing
implemented. **Live target**: http://localhost:9000 (dev server, page 5, cold cache), HEAD
`199fd15` + 0.12.0; glass-ui sibling local dist at **3.13.0** (the W9 pin target — already on disk).
**Evidence shots**: `docs/tranches/N/audit/lanes2/shots/U-type-01-full.png`,
`…/U-type-02-space-dropdown-open.png`. All `getComputedStyle` / `document.fonts` probes run live
via chrome-devtools `evaluate_script`.

---

## TL;DR — the single root that explains "the fonts are ALL wrong" (U1)

There are **two independent font failures stacked on top of each other**, and a third that the
brief asked about (the `./styles/fonts` corpus):

1. **The `.font-display` `@theme inline` split-brain** — the demo's `--font-display: "Fraunces"`
   override is **dead** for every `.font-display` Tailwind-utility consumer; they all paint
   **Plus Jakarta Sans** instead.
2. **Fraunces is not a usable family** — `document.fonts.check('16px Fraunces') === false`. The
   few sites that DO reach `var(--font-display)` (the color-space trigger) fall back to **serif
   (Times)**.
3. **Neither brand binary is loaded** — the demo never imports `@mkbabb/glass-ui/styles/fonts`, so
   there are **0 real "Plus Jakarta Sans" faces** and **0 real glass-ui "Fira Code" faces**; what
   paints as "Plus Jakarta Sans" is actually a SYSTEM font resolved through glass-ui's `local()`
   metric-override fallback faces.

Net: **nowhere in the app does the intended brand typography (Fraunces display, the glass-ui
Plus-Jakarta body, glass-ui's bundled Fira Code) actually render.** That is U1's "fonts are ALL
wrong," verbatim, with a mechanism.

There are **NO font 404s** (the brief's hypothesis). The live network panel shows 2 Google-Fonts
CSS + 2 gstatic woff2, all `200`. The `@font-face` URLs the styles-consumption changes might have
broken are not the issue — the demo's real fonts come from Google Fonts in `index.html`, NOT from
glass-ui's bundled corpus, so there is no broken `url()`. The breakage is a token/utility cascade
mismatch + an un-imported corpus, not a 404.

---

## U1 — "App overwhelmingly GRAY AND DARK; the fonts are ALL wrong"

### Part A — the fonts (root-caused, file:line)

**Live measurements (page 5):**

| Probe | Result |
|---|---|
| `--font-display` (runtime var at `:root`) | `"Fraunces", serif` |
| `.font-display` **utility** emitted `font-family` (read off the live stylesheet rule) | `var(--font-stack-display)` → **Plus Jakarta Sans** |
| 19 live `.font-display` elements (nav "Home", card headers, hero) computed `fontFamily` | `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif` |
| `document.fonts.check('16px Fraunces')` | **`false`** |
| `document.fonts.check('16px "Plus Jakarta Sans"')` | `true` (BUT see Part C — it's a system fallback) |
| real "Plus Jakarta Sans" faces registered | **0** (only 4 `"Plus Jakarta Sans Fallback"` `local()` faces) |
| glass-ui `fonts.css` corpus sheet present | **`false`** |

**Root cause 1 — the `@theme inline` split-brain (the "ALL wrong" mechanism).**
- glass-ui `dist/styles/theme/bridges.css:67` declares, inside a **`@theme inline`** block
  (`bridges.css:12`): `--font-display: var(--font-stack-display);`. Because it is `@theme inline`,
  Tailwind v4 bakes the **resolved reference** (`var(--font-stack-display)`) directly into the
  generated `.font-display` utility output — NOT `var(--font-display)`. Confirmed live: the
  `.font-display` rule's `font-family` reads literally `var(--font-stack-display)`.
- `--font-stack-display` is `var(--font-stack-text)` =
  `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`
  (glass-ui `dist/styles/tokens/scheme-motion.css:43-44`).
- The demo, at `demo/@/styles/style.css:64`, sets `@theme { --font-display: "Fraunces", serif; }`.
  This changes only the **runtime CSS variable value** — it does NOT change what the already-built
  `.font-display` utility emits (the utility was generated from glass-ui's `@theme inline` and
  references `--font-stack-display`, which the demo never overrides).
- **Result:** every `.font-display` consumer ignores the demo's Fraunces and paints Plus Jakarta.
  The demo authored `--font-display: "Fraunces"` expecting it to flow into `.font-display`; it
  does not. This is the dominant "wrong font" surface (19 elements incl. the whole nav/dock and
  card headers).

**Root cause 2 — Fraunces is unavailable → the var sites fall to serif.**
- The one surface that reaches the font by *raw variable* is the color-space trigger:
  `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:16`
  `:style="{ … fontFamily: 'var(--font-display)' }"`. Live computed: `Fraunces, serif`,
  `fontSize 32.9px`, `fontStyle italic`. But `document.fonts.check('16px Fraunces') === false`,
  so it paints the **serif fallback (Times)** — visible in shot 01/02 as the italic-serif "Lab"
  title, jarringly different from the sans body.
- Fraunces is requested non-blocking (`media="print" onload="this.media='all'"`) at
  `demo/color-picker/index.html:14` and `:17`. Only a single Fraunces woff2 face actually
  downloads (gstatic, `200`); the family is registered but `check()` reports it unavailable for
  the live render at probe time, so the trigger is serif.

**Root cause 3 — the glass-ui brand corpus is never imported (the brief's `./styles/fonts` ask).**
- glass-ui `dist/styles/index.css:7-8` documents the REQUIRED consumer pattern:
  `@import "@mkbabb/glass-ui/styles";` **AND** `@import "@mkbabb/glass-ui/styles/fonts";`. The
  second line carries the real Plus-Jakarta + Fira-Code woff2 payload (base64-inlined,
  `dist/styles/fonts.css`, 6 payload `@font-face` faces; `index.css:21-35` explains the split: the
  payload is DELIBERATELY off the critical `./styles` path and must be imported separately).
- The demo `demo/@/styles/style.css:52-53` imports `@mkbabb/glass-ui/styles` and
  `@mkbabb/glass-ui/styles.css` but **NOT** `@mkbabb/glass-ui/styles/fonts`. The export exists and
  resolves (`glass-ui package.json exports["./styles/fonts"] → ./dist/styles/fonts.css`), so this
  is a one-line omission, not a missing artifact.
- **Consequence (live-verified):** `realJakartaFaces === 0`, `hasGlassFontCorpusSheet === false`.
  The only Plus-Jakarta faces are the 4 `"Plus Jakarta Sans Fallback"` `local()` metric-override
  faces from glass-ui `typography.css:37-62`. So when the `.font-display` utility says "Plus
  Jakarta Sans," the browser cannot find a real Plus-Jakarta binary and resolves the `local()`
  fallback to a **system font (SF Pro / Segoe / Roboto)**. The app's "Plus Jakarta" body text is
  actually the OS UI font — not the brand voice glass-ui intends.

**Ownership / wave routing:**
- The `.font-display` split-brain is a **demo `@theme` authoring** problem (style.css:64-66) AND a
  glass-ui `@theme inline` interaction. The clean fix is demo-side: either (a) point the demo's
  display register at the same token glass-ui's utility reads (override
  `--font-stack-display`/`--font-stack-text`, the source the bridge inlines), or (b) stop relying
  on `--font-display` for "Fraunces" and instead override the glass-ui `--font-stack-*` source so
  the inlined utility resolves correctly. This belongs in **N.W6.B** (the audacious-type ramp /
  font-register work-order) — it is the prerequisite for ANY type work, since the type ramp is
  invisible while the wrong family paints.
- The missing `@mkbabb/glass-ui/styles/fonts` import is **demo-side, one line** at style.css:53
  → **N.W6.B** (decide: import the glass-ui corpus and drop the Google-Fonts `<link>`s for a
  single brand source, OR keep Google Fonts and accept the system-fallback for "Plus Jakarta").
  This is also an **inv-N-10 abrogation-sweep gap**: the styles-consumption surface changed across
  the AM-W1-α font-split without the consumer adopting the second import line.

### Part B — the gray/dark wash (root-caused)

**Live measurements:**

| Token / surface | Value |
|---|---|
| `prefers-color-scheme: dark` | `true` (the test machine prefers dark) |
| `<html>.dark` present | `true` |
| `--background` | `hsl(24 8% 6%)` (≈ 6% L, 8% S — near-black warm-gray) |
| `--muted` | `hsl(24 6% 11%)` |
| `--card` | `hsl(24 8% 10%)` |
| `--foreground` | `hsl(48 10% 90%)` |
| live card surface (painted) | `oklab(0.399 …)` @ `0.776` alpha, `backdrop-filter: blur(12px) saturate(1.05)` |
| `.app-layout` / `.pane-container` / `main` bg | all `rgba(0,0,0,0)` (transparent — the bg shows through) |
| `<body>` bg | the live picker color `lab(92 88.8 20)` (the pink), behind everything |

**Root cause — the wash is the dark-mode token palette, not a regression:**
- The app boots into dark because `useGlobalDark` (`demo/color-picker/App.vue:103,121`) honors the
  saved/system preference and the OS prefers dark. That is intended behavior.
- The dark palette is authored at `demo/@/styles/style.css:215-225` (`.dark { … }`) on top of
  glass-ui's dark arm. Every structural surface lives in a **tiny lightness band (6–11% L) at
  6–8% saturation** — `--background 6%`, `--card 10%`, `--muted 11%`, all hue 24 (warm). With
  almost no chroma and no lightness separation between bg/card/muted, the result is a **flat
  charcoal field** — precisely the "overwhelmingly gray and dark" the user reports.
- There is **no atmosphere painting over it**: `.app-layout` / `.pane-container` / `main` are all
  transparent; the only color is the live `lab(92 88.8 20)` body bg (the pink) bleeding through at
  the edges. The broken background aurora (U33, sibling lane) is what should be supplying chroma +
  motion over this charcoal — with it static/absent, the charcoal token field is all that remains.
- Shot 01 confirms: a single flat gray card on a faint pink field, no depth, no glass-tier
  contrast between the card and its interior surfaces.

**Ownership / wave routing:** the gray wash is the **intersection of (a) the low-chroma dark
token band** (demo `style.css:215-225` + glass-ui dark arm — a **N.W6.B glass-tier/atmosphere
rebalance**) and **(b) the dead aurora (U33 → N.W5.B)**. U-TYPE owns the typographic root; the
chroma/atmosphere half is shared with the aurora lane. The demo's dark surfaces want either more
inter-surface lightness separation or the aurora chroma restored so the field is not a flat
charcoal.

---

## U2 — "color-space numbers should not be strictly columnar"

**The two number surfaces, both grounded:**

1. **The hero component numbers** (the card title "92%, 88.8, 20"):
   `demo/@/components/custom/color-picker/display/ColorComponentDisplay.vue:2-34`. Rendered as a
   `CardTitle` with `class="flex … text-4xl … gap-x-2 flex-wrap font-normal"`. Live: `fontSize
   36px`, `flex-wrap` → the values **wrap onto two lines** ("92%" then "88.8, 20" — shot 01),
   which is the *opposite* of clean columns but reads as cramped/broken. This is the surface U2
   and U31 both point at.
2. **The "Components" reference grid** in the nutrition label:
   `demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue:38` —
   `class="grid grid-cols-3 gap-4 text-small"`. Live computed: `display:grid`,
   `grid-template-columns: 143.3px 143.3px 143.3px` (3 rigid equal columns), `fontSize 18.6px`.
   This is the **literal "strictly columnar"** layout: three fixed equal columns of small text
   (min/max ranges per channel). It is rigid and undersized — exactly "should not be strictly
   columnar."

**Ownership:** demo, **N.W6** (per-pane suffusion / picker hero work-order). The fix space is a
fluid, non-rigid number layout (the user wants flow, not a fixed 3-col grid) for the reference
ranges AND a non-wrapping, stable hero row (see U31).

---

## U31 — "numbers much LARGER, HERO-like, fluid, audacious — but the card must NOT resize as they change"

**Grounded against the live hero element (`ColorComponentDisplay.vue` `CardTitle`):**

| Property (live) | Value | U31 implication |
|---|---|---|
| `fontSize` | `36px` (`text-4xl`) | Already large-ish, but not "hero" — and it's the WRONG family (Plus Jakarta via the U1 split-brain, not the display voice) |
| `fontFamily` | `"Plus Jakarta Sans" …` | Should be the display register; renders the body fallback (U1) |
| `fontWeight` | `400` (`font-normal`, set at `ColorComponentDisplay.vue:3,15`) | Not audacious — display heroes want weight |
| `fontVariantNumeric` | **`normal`** | **THE card-resize bug**: NOT `tabular-nums`. Digit advance widths vary, so the row width changes as values change |
| `letterSpacing` | `-0.9px` (`tracking-tight`) | fine |
| layout | `flex … flex-wrap gap-x-2` | wraps unpredictably as content width changes |
| no `min-width` / `ch`-reservation on the value spans | — | `formatValue` (`ColorComponentDisplay.vue:56-63`) emits variable-width `toFixed(1)` strings with NO width reservation |

**Root cause of the "card resizes" defect (U31's hard constraint):** the contenteditable value
spans (`ColorComponentDisplay.vue:10-24`) have **no `tabular-nums`** and **no `ch`-based min-width
reservation**, and the container `flex-wrap`s. As the user drags a slider, `92.4 → 8.1 → 105.0`
change the rendered glyph advance → the title row reflows → with `flex-wrap` it can jump to a new
line → the card header height changes → **the card resizes**. The live `card-header` ancestor is
`@container/card-header … grid grid-cols-3 grid-rows-[auto_auto]` (measured), so the title sits in
an auto row whose height is content-driven.

**Fix space (design-only note for the wave):** the hero numbers need (1) the **display font
register** actually rendering (depends on the U1 root fix — they cannot be "audacious" while
painting the body fallback), (2) `font-variant-numeric: tabular-nums` (or `font-feature-settings:
"tnum"`), (3) a **`ch`-based min-width reservation** per value slot (e.g. reserve the widest
possible digit count so the row never reflows), and (4) replacing `flex-wrap` with a stable
non-wrapping layout (or a fixed-height row). The card's auto title row should be height-clamped so
value changes never re-flow the header.

**Ownership:** demo, **N.W6.B** (the audacious-type ramp lifts the hero) + a **`ComponentSliders`
/ `ColorComponentDisplay` width-reservation work-order**. Depends on the U1 font root.

---

## U30a — "the current color-space dropdown should be more audacious"

**Grounded against `ColorSpaceSelector.vue` + the live open dropdown (shot 02):**

| Surface | Live measurement | File:line |
|---|---|---|
| Trigger | `fontSize 32.9px`, `fontStyle italic`, `fontFamily Fraunces, serif` (→ paints **serif/Times**, U1 root 2), `text-title sm:text-display tracking-tight italic`, `:style fontFamily: var(--font-display)` | `ColorSpaceSelector.vue:16-17` |
| Dropdown content | plain `SelectContent` (shadcn-vue `@components/ui/select`), `SelectGroup class="fira-code"` | `ColorSpaceSelector.vue:21-22` |
| Items (24) | `fontSize 18.6px`, `fontFamily "Plus Jakarta Sans" …` (NOT the `fira-code` the group requests — that only sets mono via `var(--font-mono)`, which is also a system fallback), `pl-7 pr-3 py-1.5 text-prose` | `ColorSpaceSelector.vue:23-28` |
| Item dot | `inline-block w-2 h-2 rounded-full`, lit with `cssColor` only on the active row | `ColorSpaceSelector.vue:30-33` |

**Why it reads "not audacious" (grounded):**
1. The trigger **intends** the display voice (`var(--font-display)`, `text-display`, italic) but
   paints **serif Times** because Fraunces is unavailable (U1 root 2). An "audacious" trigger that
   renders as a generic italic serif undercuts the intent.
2. There is a **font register cliff**: 32.9px trigger → 18.6px items, AND a family change
   (serif/display intent on the trigger vs Plus-Jakarta-fallback on the items). U7 (sibling) wants
   item font scaled to the trigger; U30a wants the whole select to *feel* bold. Today the dropdown
   is a flat gray shadcn list (shot 02) with no glass tier, no color-coded swatches beyond a tiny
   2px dot on the active row.
3. The content is the bare `@components/ui/select` shadcn primitive — no glass-ui audacity, no
   per-space color identity, no scale/weight hierarchy.

**Ownership:** demo + glass-ui. **N.W6** for the demo consume (make the trigger genuinely
audacious once the U1 font root is fixed; light each space's dot with its representative color; lift
the content to a glass tier; scale item type up toward the trigger per U7). A **glass-ui Select
"audacious"/display variant** is the cohort-side ask if the boldness should be a first-class
primitive rather than a demo override (overlaps the sibling U7/U8/U23 glass-ui Select robustness
lane — coordinate so the audacity and the bounding/scroll/scaled-items work land in ONE
glass-ui Select pass).

---

## Cross-cutting: the prerequisite ordering for the wave

**U1's font root gates U2, U31, and U30a.** Audacious/hero/scaled typography is *invisible* while
(a) `.font-display` paints Plus-Jakarta-as-system-fallback and (b) `var(--font-display)` paints
serif. The font-register fix (the `@theme inline` split-brain + the un-imported corpus + the
Fraunces-availability question) must land FIRST in N.W6.B, before any type-ramp / hero-number /
dropdown-audacity work, or those changes ramp the wrong family.

**Concrete binding sites for the wave (file:line):**
- `demo/@/styles/style.css:64-66` — the demo `@theme --font-display/--font-serif/--font-mono`
  overrides that DON'T reach the `@theme inline` utilities (split-brain).
- `demo/@/styles/style.css:52-53` — the glass-ui imports; **missing** `@import
  "@mkbabb/glass-ui/styles/fonts"` (the brand corpus).
- `demo/color-picker/index.html:11-18` — the Google-Fonts `<link>`s (the actual font source; decide
  Google-Fonts vs glass-ui-corpus as the single source of truth).
- `demo/@/styles/style.css:215-225` — the `.dark` low-chroma token band (the gray wash).
- `ColorComponentDisplay.vue:3` (`text-4xl font-normal flex-wrap`), `:10-24` (value spans, no
  tabular/`ch` reservation), `:56-63` (`formatValue` variable-width) — the hero numbers + the
  card-resize defect (U31).
- `ColorNutritionLabel.vue:38` (`grid grid-cols-3 … text-small`) — the strictly-columnar
  reference grid (U2).
- `ColorSpaceSelector.vue:16-17` (trigger display-font intent), `:21-28` (the flat shadcn content +
  item font cliff) — the un-audacious dropdown (U30a).
- glass-ui (read-only, for grounding): `dist/styles/theme/bridges.css:12,66-70` (`@theme inline`
  font register), `dist/styles/tokens/scheme-motion.css:43-46` (`--font-stack-*` source),
  `dist/styles/index.css:7-8,21-35` (the `./styles/fonts` split + the required two-import pattern),
  `dist/styles/typography.css:37-62` (the `local()` fallback faces).

**No 404s. No broken `@font-face url()`.** The brief's font-404 hypothesis is refuted: all font
requests `200`; the failure is a cascade/utility mismatch + an un-imported brand corpus +
Fraunces-unavailability, not a broken URL.
