claude-opus-5[1m] (served model id)

# CHALLENGE — `FrequencyGraph.vue` · AXIS **D** (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FrequencyGraph.vue` (247 lines)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its own falsifier. Superlatives too (L-18 runs both ways).
**Method** Static + source-derived only. No browser. Contrast figures computed from shipped token literals with the WCAG 2.x relative-luminance formula, compositing canvas `globalAlpha` in sRGB byte space (the canvas source-over default). Livable-only claims marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Read whole (read-only):** the subject; its only import `web/src/lib/types.ts`; its sole consumer `visualization/CoefficientsPanel.vue`; that consumer's host `visualization/VisualizationView.vue` (layout rules `:325-371`); the panel sibling `shared/CoefficientsSpectrum.vue`; `equation/EqCoefficientsPanel.vue`; `web/src/style.css` (whole); `web/index.html`; `web/public/fonts.css`; `web/src/main.ts`; `web/package.json`; `web/tsconfig.json`; `web/e2e/*.spec.ts`; `src/fourier_analysis/epicycles.py`; `web/src/components/ui/tooltip/Tooltip.vue`; `web/src/components/visualization/lib/canvas-drawing/{grid,labels}.ts`; `equation/EquationModeToggle.vue`; **installed** `node_modules/@mkbabb/glass-ui@4.0.0` (`package.json` exports map, `dist/styles/{tokens/{color-radius,dark-arm,shadow,scheme-motion},utilities/base,typography/{semantic,utilities,scale},configurator,fonts}.css`, `dist/FadingScroll-*.js`, `dist/MetricBadge-*.js`, `dist/TooltipProvider-*.js`); **producer** `/Users/mkbabb/Programming/glass-ui` @ **7.0.0** (`package.json` exports, `src/styles/{tokens/{color-radius,dark-arm,shadow,scheme-motion},utilities/{base,components},typography/{utilities,semantic}}.css`, `src/components/` index).

**Tally — 35 defects (3 BLOCKER · 12 MAJOR · 14 MINOR · 6 INFO) · 6 superlatives · 6 falsified candidates.**

> **Fold posture.** No prior D-axis pass exists for this subject. The `CoefficientsSpectrum` D-challenge in this same directory *cites* this file three times (its `B-3`, its `m-11`, its measurement §A); those are folded and **corroborated from this side with independent figures**, not re-derived from its text. One census claim is **contradicted by extension** (§0).

---

## §0 · Corpus fold (hitherto — cited, not re-derived)

| corpus row | status here |
|---|---|
| `formation/fourier/lane-frontend.md:133` — `components/equation/FrequencyGraph.vue` \| **247** \| "Canvas2D spectrum bar graph" | **CONFIRMED** byte-for-byte: 247 lines, `getContext("2d")` at `:63`. Not contested. |
| `formation/fourier/lane-frontend.md:562` — "`FrequencyGraph.vue:63` `getContext('2d')`; single deep watcher `:157` … **No rAF**" | **CONFIRMED at exactly `:63` and `:157`**, verbatim watcher expression. `grep -n requestAnimationFrame` over the subject → **0 hits**. Elevated to **S-4**. |
| `formation/fourier/CENSUS-2026-08-03.md:87` — "…ConvergencePlot with its own ungated rAF; **FrequencyGraph watch-driven**" + 12 SVG surfaces | **CONFIRMED**, and the census's implied acquittal is correct: this file contributes **zero** to the PRM/rAF epidemic. But the acquittal is narrower than it reads — see **m-12**: *no motion at all* is itself a register defect next to the `duration-500` sibling 8 px below it. |
| `CENSUS-2026-08-03.md:102-104` — the uplift break table (`metric-badge` ×7 files · `hover-card` ×2 · `hover-popover` ×2 · `DockIconButton` ×2 · `DockDropdownTrigger` ×1 · `ToastVariant` · lucide · keyframes · value.js) | **CONTRADICTED BY EXTENSION — this file is on the break surface and the table does not list it.** The subject imports **no** glass-ui symbol at all (`:1-3`: `vue` + a local type), so it appears on no import-based census. Its break is a **CSS utility**: `text-admin-label` at `:200`, present at 4.0.0 (`dist/styles/typography/semantic.css:213`) and **absent from 7.0.0's entire `src/styles/` tree** (`grep -rn admin-label` → 0 hits). **M-7.** Independently reached; it is the **second** instance of the same omission the sibling's `M-8` filed. **CENSUS §5 addendum recommended: the break surface has a typography row, and it is invisible to import-graph enumeration.** |
| `CENSUS-2026-08-03.md:107-109` — the tri-package resolution deadlock (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is ONE atomic transaction) | Not contested. Consequence for this file quantified at **M-7** (one break) and **B-2/M-1** (the uplift *worsens* every contrast figure — 7.0.0 re-tints `--card` light to `hsl(30 85% 96%)`, `tokens/color-radius.css:73`). |
| `intakes/lane-fourier-r3-r6.md` — R3-7 (35 `Tooltip` callsites) / R3-10 (six dynamic `:is` families) / R3-* lucide rows | **NO OVERLAP, and that is the finding.** The subject is **absent from every row of the adjudicated intake lane**: it has zero `Tooltip` callsites, zero `<component :is>`, zero `lucide-vue-next` imports. It hand-rolls the tooltip instead (**B-3**). The intake lane's 38/52 TRUE denominator therefore *undercounts* the tooltip problem — R3-7 counted the 35 sites that adopted the primitive; it could not count the one that refused it. |
| `lane-frontend.md` §5 / sibling `challenge-D-design.md` **B-3** — "harmonic #5 is indigo in the graph and cyan in the list", `spectrumColor` verbatim-duplicated into this file | **CONFIRMED FROM THIS SIDE, with the divergence measured across the whole slice** rather than at one row: Δhue reaches **215.4°** at slot 11. **M-11**, table in §B. |
| sibling **m-11** — `spectrumColor` duplicated; `lib/colors.ts` exists and hosts `resolveVizColors` | **CONFIRMED**: `FrequencyGraph.vue:42-45` and `CoefficientsSpectrum.vue:47-50` are byte-identical modulo indentation. **m-13.** |
| sibling **§A / B-2** — bar palette fails 1.4.11; failing band hue ≈ 15°–207° over `--card` | **CONFIRMED AND STRENGTHENED.** The sibling measured its list bars at **full opacity**. This component paints every bar at `globalAlpha = 0.85` at rest (`:86`), which washes *toward* the near-white card and drags even the best bar (hue 300, i=0) to **2.87:1 — below 3:1**. Measurement §A. |

---

## §A · The measurement that grounds B-2 and M-1

Palette (`:42-45`): `hue = (1 − i/max(total−1,1)) · 300`, `hsl(hue, 85%, 55%)` — **identical string in both theme arms**.
Paint (`:86`): `globalAlpha = isActive ? (isHovered ? 1.0 : 0.85) : 0.25`. `isActive` is `!props.activeIndices || …`; the sole consumer passes no `activeIndices` (`CoefficientsPanel.vue:17-22`), so **every bar ships at α = 0.85**, and the `0.25` arm is unreachable (M-6).
Surface: the component mounts inside `ConfiguratorLayer` (`CoefficientsPanel.vue:14`) → `--card`, not `--background`.

Tokens: 4.0.0 `dist/styles/tokens/color-radius.css:40,44,45,72` (`--neutral-0 hsl(40 30% 98%)`, `--neutral-4 hsl(32 26% 70%)`, `--neutral-5 hsl(30 22% 40%)`, `--card hsl(36 48% 97%)`) and `tokens/dark-arm.css:42,46,47,64`. 7.0.0 `tokens/color-radius.css:73` (`--card hsl(30 85% 96%)`), `tokens/dark-arm.css:87` (`--card hsl(26 22% 17%)`).

```
BARS @ α=0.85 over --card                     WCAG 1.4.11 non-text minimum = 3:1
                                   LIGHT                      DARK
glass 4.0.0  n=40 (live consumer)  27/40 below 3:1  w 1.17    11/40 below 3:1  w 1.67
glass 4.0.0  n=60 (prop default)   42/60 below 3:1  w 1.16    17/60 below 3:1  w 1.66
glass 7.0.0  n=40 (post-uplift)    27/40 below 3:1  w 1.14    13/40 below 3:1  w 1.60
glass 7.0.0  n=60 (post-uplift)    42/60 below 3:1  w 1.14    18/60 below 3:1  w 1.59

  LIGHT n=40 passing indices: [1..11, 38, 39]  — i=0 (hue 300, the LARGEST coefficient) = 2.87:1 FAIL
  LIGHT n=40 samples: i0 h300 2.87 | i5 h261 4.71 | i13 h200 2.11 | i20 h146 1.41 | i26 h100 1.38 | i33 h46 1.51 | i39 h0 3.45
  DARK  n=40 samples: i0 h300 3.44 | i5 h261 1.95 | i13 h200 4.55 | i20 h146 7.21 | i26 h100 7.35 | i39 h0 2.83
  inactive arm α=0.25 (dead code, M-6): 40/40 below 3:1 in BOTH arms, worst 1.05:1 light / 1.10:1 dark

INDEX LABELS (:107-111) — 9px, fill = --muted-foreground, alpha applied to TEXT
                       4.0.0            7.0.0        WCAG 1.4.3 AA = 4.5:1 (9px is not "large")
  active   α=0.50   L 2.03 / D 2.51   L 2.01 / D 2.46
  inactive α=0.20   L 1.30 / D 1.43   L 1.29 / D 1.42
  (full opacity would be 5.12 light / 5.68 dark — the token itself is compliant; the alpha destroys it)

AXIS LABEL (:226-227) — 11px italic serif, --muted-foreground at opacity .75
  4.0.0  L 3.12:1 / D 3.86:1      7.0.0  L 3.08:1 / D 3.73:1      (AA needs 4.5:1)
  its <sub> at 0.7em = 7.7px effective (m-7)

SCROLLBAR THUMB (:244) var(--border) vs --card:  L 1.90:1 / D 2.08:1
  canonical --scrollbar-thumb (color-mix mutedFg 25%): L 1.39:1 / D 1.57:1   (both fail; M-3 is about
  divergence and cascade collision, not about the thumb being the more legible of two illegible options)
```

**The uplift does not cure any of it and makes the dark arm worse** (11/40 → 13/40 failing; every worst-case figure drops 0.02–0.07). 7.0.0 re-tints `--card` warmer and *slightly darker* in light, *lighter* in dark — the palette is theme-blind either way.

---

## BLOCKERS

### **B-1 · The `<canvas>` has no accessible name, no role, no fallback content, no focus, and no keyboard path. To assistive technology the entire spectrum is a 691 px void — and it is the only rendering of these 40 coefficients on the visualization route.**

`:177-183`; `:29`, `:75-112`; `CoefficientsPanel.vue:17-22`

```html
<canvas ref="canvasRef" class="block cursor-pointer text-muted-foreground"
        @mousemove @mouseleave @click />        :177-183 — self-closed
```

`grep -n "role=\|aria\|tabindex" FrequencyGraph.vue` → **0 hits.** The element is self-closed, so it has **no fallback children** — the one mechanism the HTML spec gives a canvas for an accessible representation. Consequences, all static:

1. **1.1.1 (A) Non-text Content.** A screen reader announces nothing. Every amplitude, every harmonic index, the whole ranked spectrum: absent.
2. **2.1.1 (A) Keyboard.** `@click` (`:151-155`) emits `toggle-harmonic`. A `<canvas>` with no `tabindex` never receives focus and never receives `keydown`. There is no keyboard route to the click at all.
3. **4.1.2 (A) Name, Role, Value.** `cursor-pointer` (`:179`) advertises an interactive control to sighted mouse users; nothing in the accessibility tree corroborates it.
4. The one piece of prose that *does* explain the surface — the axis annotation (`:168`) — is a sibling `<div>` with a `title`, not `aria-describedby`-linked to the canvas (m-6). Even that is pointer-only.

**Falsifier — *find an accessible surface the analysis missed.*** Closed six ways: (a) no `role`/`aria-*`/`tabindex` in the file; (b) self-closing `<canvas />` means Vue renders zero children, so no fallback; (c) the host adds none — `CoefficientsPanel.vue:17-22` passes `:components`, `:max-bars`, `class="mb-2"` and nothing else, and `class` falls through to `.freq-graph-host` (`:163`), not to the canvas; (d) the wrapping `ConfiguratorLayer` (`CoefficientsPanel.vue:14`) supplies a section *label*, not an image description; (e) **there is no parallel textual rendering on this route** — `CoefficientsSpectrum`'s list is a *different* slice (12 collapsed vs this component's 40, `CoefficientsSpectrum.vue:38`) with a *different* colour mapping (M-11), so it is not an equivalent; (f) `web/style.css` has no global canvas rule.
**Why it survived:** no e2e spec opens this layer — `CoefficientsPanel.vue:14` sets `:default-open="false"` and `grep -rn "Coefficients" e2e/` returns only the sibling's own filename. `@axe-core/playwright` **is** installed and run at keystones (`e2e/visualization-ux.spec.ts:2,26`), but **axe has never seen this DOM** (i-4). That is the *cause*, not a counter-argument.
**Uplift is irrelevant** — no glass-ui symbol is involved. Consumer-side fix.

### **B-2 · The bar palette is the sole graphical encoding and 27 of 40 bars fail WCAG 1.4.11 in light mode — including bar 0, the largest coefficient. There is no baseline, no track, and no gridline to supply a reference frame. A theme-reactive viz palette exists in-repo and is bypassed.**

`:42-45` (palette), `:86` (α 0.85), `:75-104` (paint), `:71-73` (no axis geometry) — measurement §A.

Three independent failures compound:

1. **Palette.** `hsl(hue, 85%, 55%)` emits the same literal in both theme arms. 27/40 light and 11/40 dark below 3:1; worst **1.17:1**.
2. **Rest alpha.** `:86` paints at `0.85`, not `1.0`. This is what drags i=0 (hue 300, the tallest bar) to **2.87:1** — the sibling's list bars, at full opacity, clear it at 3.20:1. The one bar a reader is guaranteed to look at is the one this component makes hardest to see.
3. **No reference frame at all.** `draw()` (`:52-114`) paints bars and index labels and *nothing else*. Unlike the sibling — which at least has a `bg-muted/50` track (`CoefficientsSpectrum.vue:89`) — there is no baseline rule, no tick, no gridline, no track. `pad = { top: 6, bottom: 18 }` (`:71`) reserves a label band but draws no axis in it. A bar's height is therefore readable **only** relative to other bars, and only where those bars are themselves visible.

**Falsifier — four routes, all closed.** (a) *Maybe the surface is darker than `--card`.* No: `ConfiguratorLayer` is the mount (`CoefficientsPanel.vue:14`); computed against `--background` the figures move by <0.06 (sibling §A cross-check, independently reproduced here). (b) *Maybe the app re-tints its surfaces.* `web/src/style.css` overrides exactly `--viz-amber` and `--section-color-5` (`:119-127`) — never `--card`/`--background`/`--muted`. (c) *Maybe the uplift fixes it.* It does not: §A shows 7.0.0 makes the dark arm **worse** (11→13 of 40). (d) *Maybe 1.4.11 does not apply to a decorative chart.* It is not decorative — the bars are the only rendering of the data on this surface, which is precisely 1.4.11's "graphical objects required to understand the content."
**The house already knows this shape.** `style.css:113-127` darkens `--viz-amber` from ≈3.54:1 to ≈4.6:1 as an explicit "axe contrast carry," with a companion glass-ui coordination ask. The precedent, the token vocabulary (`--viz-*`, `--section-color-*`) and the resolver (`lib/colors.ts`) all exist. `hsl(h, 85%, 55%)` bypasses all three.

### **B-3 · The tooltip is a hand-rolled `absolute` div nested inside its own `overflow-x-auto overflow-y-hidden` scroller. It is structurally clipped on every side, it occludes the bars it describes, it has no dismiss path, and it carries the only rendering of amplitude and phase this component has.**

`:172-211` (the scroller + the tooltip), `:236-239` (`.scrollbar-thin { position: relative }`), `:137-138` (positioning), `:191` (clamp)

```html
<div ref="scrollRef" class="overflow-x-auto overflow-y-hidden scrollbar-thin"
     :style="{ height: `${HEIGHT}px` }">        :172-176   HEIGHT = 120  (:27)
    <canvas … />
    <div v-if="hoveredBar !== null" class="absolute z-[var(--z-controls)] … -translate-x-1/2"
         :style="{ left: `${tooltipPos.x}px`, top: `${Math.max(tooltipPos.y - 56, 4)}px` }">
```

`.scrollbar-thin` sets `position: relative` (`:239`), so the scroller *is* the tooltip's containing block. Both overflow axes clip it.

- **Left edge, unrecoverably.** `tooltipPos.x` for bar `i` is ≈ `7 + 17i + 7` (`:123-127`, `:138`); for i=0 that is ≈14 px. With `-translate-x-1/2` and a content width of ~130–150 px (`px-2` + `whitespace-nowrap` + the widest row `Amplitude` / `0.1234`), the left edge lands at ≈ **−60 px**. In LTR, scrollable overflow to the *left* of the origin is clipped and **unreachable by scrolling**. The `Amplitude` / `Phase` label column of the first ~4 bars — the four largest coefficients — is simply cut off, leaving bare numbers.
- **Bottom edge.** Content height is ≈60 px (2 grid rows) / ≈76 px with `logScale` (3 rows, `:203-206`). `top` is `max(y − 56, 4)`; hovering the lower third (`y > 100`, i.e. anywhere over the index-label band) puts the bottom past 120 px and `overflow-y: hidden` cuts it.
- **Top edge / occlusion.** The `max(…, 4)` clamp pins the tooltip 4 px from the top for any `y < 60`, where it **covers the tall bars it is describing** — no side-offset, no arrow, no flip, no collision padding.
- **No dismiss path.** `grep -n "pointer\|touch\|Escape\|keydown"` over the subject → only the string `pointer-events-none` at `:188`. There is no `@pointerleave`, no `Escape` handler, no outside-click. `onMouseLeave` (`:143-149`) is the only teardown and it never fires on a touch device. WCAG **1.4.13 Content on Hover or Focus (AA)** requires *dismissible* — and the same clause's *hoverable* sub-criterion is failed too: `pointer-events-none` (`:188`) means the tooltip cannot be pointed at, which is fine, but nothing else satisfies dismissal.

**Falsifier — three routes, all closed.** (a) *Maybe `+ scrollLeft` at `:138` is a bug and the real position differs.* It is **correct** — an absolutely-positioned descendant of a scroller is laid out against the *unscrolled* padding box and then scrolls with the content, so `scrollLeft` must be added. Rejected as a defect (F-4) and the clipping stands regardless. (b) *Maybe `z-[var(--z-controls)]` lifts it out.* `z-index` never escapes an `overflow` clip; and 20 is the **navigation** band, not the floating band (m-1). (c) *Maybe glass-ui offers nothing better under the old pin.* It does: `@mkbabb/glass-ui@4.0.0` exports `./tooltip` (portalled, collision-aware), and the repo already has the shim — `web/src/components/ui/tooltip/Tooltip.vue:29-31` passes `:side-offset="6" :collision-padding="8"` — used by the sibling **inside the same panel** (`CoefficientsSpectrum.vue:80-84`). The primitive survives at 7.0.0 (`src/components/tooltip/`). This is refusal, not absence.
The exact clipped pixel counts are `UNPROVEN-NEEDS-LIVE (SS-13)`; the containing block, the two clipping axes, and the absent dismiss path are proven from source.

---

## MAJOR

### **M-1 · The index labels are painted at `globalAlpha` 0.5 — 9 px text at 2.03:1, less than half the AA floor. The alpha is applied to *text*, which is what breaks a token that is otherwise compliant.**
`:107-111`. `--muted-foreground` is 5.12:1 (light) / 5.68:1 (dark) against `--card` at full opacity — the token clears AA comfortably. `ctx.globalAlpha = isActive ? 0.5 : 0.2` destroys it: **2.03:1 / 2.51:1** active, **1.30:1 / 1.43:1** inactive (§A). At `9px` (`:109`) nothing qualifies as large text under 1.4.3. These labels carry the harmonic number `n` — without them a bar is an anonymous coloured stick.
**Falsifier** — *maybe the labels are decorative.* They are not: they are the **only** in-graph identification of which harmonic a bar is, and the tooltip that repeats them is itself unreachable by keyboard and touch (B-1, B-3). *Maybe the alpha is undone later.* `:113` resets `globalAlpha = 1` only **after** the loop.

### **M-2 · The whole widget is a fixed-pixel island inside an app whose root font-size is deliberately responsive. Canvas text cannot be resized by any user agency at all.**
`:25-27` (`BAR_W 14`, `BAR_GAP 3`, `HEIGHT 120`), `:109` (`"9px 'Fira Code', monospace"`), `:175` (`:style="{ height: '120px' }"`), `:227` (`font-size: 11px`).
`web/src/style.css:40-49` sets `html { font-size: 1.125rem }` on mobile and `1rem` at ≥768 px — an explicit 12.5 % mobile up-scale that every rem-sized surface in the app honours. This component honours none of it: four literal px sizes, one of them baked into a canvas 2D context where no browser text-zoom, no user stylesheet, and no `rem` cascade can reach it. **WCAG 1.4.4 Resize Text (AA)** — canvas glyphs are raster output, not text.
**Falsifier** — *maybe the DPR scaling covers it.* It does not: `:56-64` scales the *backing store* for device pixels; the glyph is still 9 CSS px. *Maybe px is fine for a chart.* The rest of the repo disagrees within the same feature — `CoefficientsSpectrum.vue:85,86,102` uses `text-xs`, `text-admin-label`, i.e. rem-derived tokens, 8 px away on screen.

### **M-3 · The scoped `<style>` redefines `.scrollbar-thin` — a class glass-ui already ships — with five divergences, unlayered so it wins the cascade. The class means one thing inside this component and another everywhere else in the app.**
`:236-246` vs `@mkbabb/glass-ui@4.0.0 dist/styles/utilities/base.css:149-170` (and **byte-identical** at 7.0.0 `src/styles/utilities/base.css:94-110`).

| | glass-ui `.scrollbar-thin` | subject `:236-246` |
|---|---|---|
| standard path | `scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track)` | **absent** |
| webkit gate | `@supports not (scrollbar-color: auto)` — *"so modern engines never paint it — not a live+dead alias"* (base.css:153-154) | **ungated** |
| track height | `8px` | `4px` |
| thumb colour | `var(--scrollbar-thumb)` (`tokens/color-radius.css:131`, auto-dark via `--muted-foreground`) | `var(--border)` |
| thumb radius | `var(--radius-pill)` | `2px` literal |
| track | `background: var(--scrollbar-track)` | **absent** |

Vue's scoped compilation emits `.scrollbar-thin[data-v-…]` **unlayered**, while the library rules sit in `@layer components` — unlayered always beats layered regardless of specificity, so the subject's declarations win outright. On Chromium the presence of any author `::-webkit-scrollbar` rule switches the element to a custom scrollbar and suppresses the standard properties, so the library's `scrollbar-color` is discarded too.
**The uplift does not cure it** — the library rule is unchanged between 4.0.0 and 7.0.0, so the collision persists verbatim through F.W1.
**Falsifier** — *maybe the library class is not in the bundle.* It is: `web/src/style.css:3` `@import "@mkbabb/glass-ui/styles"`. *Maybe 4 px is a deliberate density choice.* Then it belongs in a token or a `--scrollbar-*` override, not in a name-colliding redefinition; and the 4 px value is what causes M-4.

### **M-4 · The scroller's height is exactly the canvas height, so the horizontal scrollbar gutter eats the index-label band from below.**
`:175` (`height: 120px`) + `:174` (`overflow-x-auto overflow-y-hidden`) + `:61` (`canvas.style.height = "120px"`) + `:111` (label baseline at `HEIGHT − 4 = 116`, 9 px glyphs → cap-top ≈ 109).
A horizontal scrollbar in a non-overlay configuration consumes layout height *from inside* the 120 px box; with `overflow-y: hidden` the canvas bottom is clipped by exactly that amount. On Chromium the subject's own `::-webkit-scrollbar { height: 4px }` (`:240-242`) clips y ∈ [116,120] — digits have no descenders, so it survives. **On Firefox, `scrollbar-width: thin` reserves ≈10–11 px of layout**, clipping y ∈ [109,120] — **the entire digit band**. And the scroller *always* overflows: at `max-bars="40"` the canvas is `17·40 + 11 = 691 px` (`:31-34`) inside a column capped at 400–440 px (`VisualizationView.vue:325-330`) or 480 px below 1024 px (`:355`).
**Falsifier** — *maybe macOS overlay scrollbars save it.* On macOS with overlay scrollbars, yes — which is exactly why this survived review on the author's machine. The Firefox-on-Windows/Linux arm is the majority-platform default and is not saved. Exact gutter width `UNPROVEN-NEEDS-LIVE (SS-13)`; the mechanism (thin scrollbars reserve layout space in Gecko) and the geometry are static.

### **M-5 · A 691 px spectrum is presented in a ≤440 px column through a 4 px scrollbar with zero edge affordance — while `FadingScroll` ships in the installed package.**
`:31-34`, `:172-176`; `CoefficientsPanel.vue:20`; `VisualizationView.vue:325-330,355`.
At `maxBars = 40`, **≥ 36 % of the spectrum is off-screen at the widest desktop track (440 px)** and **≥ 52 % on a 375 px phone**; at the prop default of 60 (`:11`) it is `17·60 + 11 = 1031 px`, ≈ 57 % / 68 % hidden. The only cue that more data exists is a 4 px scrollbar at 1.90:1 (§A) that Firefox may be clipping (M-4). No fade, no gradient mask, no chevron, no "40 of N" readout inside the component.
`@mkbabb/glass-ui@4.0.0` exports **`./fading-scroll`** (`package.json` exports map; `dist/FadingScroll-DwNnvKMs.js`) and `utilities/base.css:2` names *"fading-scroll (scroll-state-driven edge fade)"* among the shipped utilities. 7.0.0 keeps it (`src/components/fading-scroll/`). **The affordance is available under the old pin and unused.**
**Falsifier** — *maybe the sibling supplies the count.* `CoefficientsSpectrum.vue:73-75` renders `topComponents.length / totalComponents` — but that is **12 / N**, describing the *list*, not this graph's 40. It actively misinforms about the graph.

### **M-6 · The entire interaction contract is unconsumed. `cursor-pointer` promises a click that reaches nobody, and the dim-inactive design arm is dead code.**
`:7` (`activeIndices?`), `:15-18` (both emits), `:77` (`isActive`), `:86` (the `0.25` arm), `:88-91` (hover glow), `:151-155` (`onClick`), `:179` (`cursor-pointer`) vs the **sole** consumer `CoefficientsPanel.vue:17-22`, which passes `:components` and `:max-bars` and binds **no listener**.
So: `activeIndices` is always `undefined` → `isActive` is always `true` → the `0.25` arm never paints; `toggle-harmonic` and `hover-harmonic` are emitted into the void; clicking a bar changes nothing anywhere in the app. What remains is a `cursor: pointer` on a surface that does nothing when clicked — a **false affordance**, the one thing a pointer cursor must never be.
**Falsifier** — *maybe a second consumer exists.* `grep -rn "FrequencyGraph" src/ e2e/` returns 4 hits: the import and the tag in `CoefficientsPanel.vue`, and two *comments* in `CoefficientsSpectrum.vue:8,68`. There is exactly one consumer. *Maybe the emits are for a planned host.* Then `cursor-pointer` and the 0.25 arm should not ship until it exists.

### **M-7 · `text-admin-label` (`:200`) is deleted at glass-ui 7.0.0. This file is on the F.W1 break surface and appears on no import-based census, because its break is a CSS utility, not a symbol.**
`:200` `class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-admin-label"`.
Present at 4.0.0: `dist/styles/typography/semantic.css:213` `@utility text-admin-label`, sized by `typography/scale.css:86` `--type-admin-label: 0.625rem`. **Absent at 7.0.0**: `grep -rn "admin-label" /Users/mkbabb/Programming/glass-ui/src/styles/` → **0 hits**. Post-uplift the class is inert; the tooltip's entire quantitative grid silently inherits `text-xs` from `:187` — a **20 % size jump on the numbers**, unflagged by `vue-tsc` (CSS classes are not typechecked) and by any test (i-4).
**Cross-check against the census** (`CENSUS-2026-08-03.md:102-104`): the break table enumerates removed *subpaths*, removed *dock members*, and `ToastVariant`. It has no typography row. This file imports **no glass-ui symbol at all** (`:1-3`), so no import-graph enumeration can see it. **Recommend a CENSUS §5 addendum: "removed typography utilities," and a repo-wide `grep -rn "text-admin-label" web/src/` to size it.** This is the second independent instance (sibling `M-8` is the first).
**Falsifier** — *maybe it moved.* Searched `src/styles/` whole at 7.0.0, plus `typography/{utilities,semantic}.css` by name; `fira-code` (`typography/utilities.css:81`) and `cm-serif` survive at 7.0.0, `admin-label` does not. The deletion is selective, not a path change.

### **M-8 · The rounded-corner path degenerates below `barH = 3 px`: every sub-3.1 % coefficient renders as the same ~3 px lump, straddling the baseline by 2.23 px with a self-intersecting fill. The amplitude encoding stops being monotone.**
`:47-50` (floor `0.008`), `:71-72` (`plotH = 96`), `:94-103` (the path), `:83` (`y = pad.top + plotH − barH`).
`r = min(BAR_W/2, 3) = 3`. Baseline is `pad.top + plotH = 102`, constant. At the floor, `barH = 0.008 · 96 = 0.768 px`, so `y = 101.232` and the path is:
`moveTo(x, 102) → lineTo(x, y+r = 104.232) → quad → (x+3, 101.232) → … → (x+14, 104.232) → lineTo(x+14, 102) → closePath`.
The first segment travels **downward, 2.232 px below the baseline**; the closing edge back along `y = 102` crosses the figure, so the nonzero-winding fill is a bowtie. Net: a shape ~3 px tall centred *on* the baseline rather than sitting on it. Because the same clamp applies for every `barH < 3`, **all amplitudes below 3/96 = 3.125 % of the maximum render identically** — and in a Fourier spectrum sorted by descending amplitude (`epicycles.py:54`) that is typically the long tail, i.e. most of the 40 bars.
**Falsifier** — *maybe the floor prevents it.* The floor is `0.008` (0.77 px), well *below* `r = 3`; it guarantees the degeneracy rather than preventing it. *Maybe the overshoot collides with the labels.* It does not — 104.232 vs a cap-top of ≈109 — so this is a baseline-integrity and encoding-monotonicity defect, not a collision. The visual rendering of the bowtie is `UNPROVEN-NEEDS-LIVE (SS-13)`; the geometry is arithmetic.

### **M-9 · The component names its y-transform and then draws no y-axis. No baseline rule, no tick, no scale, no track.**
`:52-114` (the whole of `draw`), `:71` (`pad.bottom = 18` reserved for labels only), `:168-171` (the annotation).
`draw()` paints exactly two things: bars and index labels. There is no `moveTo`/`lineTo` for an axis, no `strokeStyle`, no gridline, no `0`/`max` tick, no `1.0` reference. So the annotation at `:169-170` — `log₁₀(|cₙ| + 1)` or `|cₙ|` — labels an axis that does not exist. The reader is told *what the transform is* and given *no magnitudes to apply it to*. Exact values live only in the tooltip, which is pointer-only (B-1) and clipped (B-3).
**Falsifier** — *maybe the sibling's list supplies the scale.* It supplies numbers for a **different 12-row slice** (`CoefficientsSpectrum.vue:38`) under a **different hue mapping** (M-11), and it renders *below* the graph in the `#graph` slot ordering (`CoefficientsSpectrum.vue:70`). It is not this graph's axis. *Maybe an unlabelled chart is acceptable at this size.* At 120 px, a single 1 px baseline stroke at `y = 102` would cost nothing and is the minimum a bar chart owes its reader — the component already computes that exact coordinate.

### **M-10 · The axis label's font stack leads with a family that is loaded nowhere in the repository, and its comment asserts a repo-wide usage that does not exist.**
`:220-223`:
```css
/* … the equation surface elsewhere uses EB Garamond as the cross-walk substitute on the web … */
font-family: "EB Garamond", "Computer Modern Serif", serif;
```
`grep -rln "Garamond"` across `web/src/`, `web/public/`, `web/index.html`, and `web/node_modules/@mkbabb/**` returns **exactly one file: this one.** There is no `@font-face`, no `<link>`, no import. The comment's claim — *"elsewhere uses EB Garamond"* — is false: **nowhere else uses it.** The family silently falls through.
Worse, the fallthrough target diverges from every other Computer-Modern site in the repo, all of which spell the chain `"Computer Modern Serif", Georgia, serif`: `canvas-drawing/grid.ts:92`, `canvas-drawing/labels.ts:50,91`, `EquationModeToggle.vue:70`, and the `@theme` token at `style.css:14` (which additionally carries `"Latin Modern Roman", "CMU Serif"`). This file is the **sole** site that adds a phantom head and **drops `Georgia`** — so where the others degrade to a serif with known metrics, this one degrades to the UA default.
**Falsifier** — *maybe glass-ui ships the face.* `grep -rn "Garamond" web/node_modules/@mkbabb/` → 0 hits; `web/public/fonts.css` declares `Computer Modern Serif` (`:15,22,29,36`), `Fraunces`, and `Fira Code` only. *Maybe `.cm-serif` was the right utility and is unavailable.* `.cm-serif` exists at both pins but resolves `var(--font-serif-math, serif)` (4.0.0 `typography/utilities.css:66`) and **the app never defines `--font-serif-math`** — so the canonical utility is currently a no-op. That is a real reason the author hand-rolled; the correct repair is a one-line app-level `--font-serif-math` carry plus adopting `.cm-serif`, not a divergent literal with a dead head.

### **M-11 · Hue encodes rank-within-this-slice, so the same harmonic wears one colour in the graph and a different one in the list 8 px below it. The divergence reaches 215.4°.**
`:42-45` (`spectrumColor(i, total)`, `total` = the **slice** length), `:84`, `:111` (`fillText(String(comp.index), …)`), `:196`; `CoefficientsPanel.vue:20` (`:max-bars="40"`) vs `CoefficientsSpectrum.vue:38` (12 collapsed / 40 expanded), both inside the same `ConfiguratorLayer`.

| slot `i` | FrequencyGraph (total = 40) | CoefficientsSpectrum, collapsed (total = 12) | Δ |
|---|---|---|---|
| 3 | 276.9° violet | 218.2° blue | 58.7° |
| 5 | 261.5° indigo | 163.6° cyan | 97.9° |
| 8 | 238.5° blue | 81.8° yellow-green | 156.6° |
| 11 | 215.4° azure | 0.0° red | 215.4° |

And it changes again when the sibling expands to 40. The single channel that could bind the two views of one dataset is the channel that misleads.
**Falsifier** — *maybe rank-in-view is the intent.* The tree says otherwise, twice on this file's own surface: `:111` writes `String(comp.index)` under each bar, and `:196-198` puts the coloured dot immediately beside `n = {{ …index }}`. Both assert the colour is bound to the harmonic, not to its position in an arbitrary slice. *Maybe the sibling is the offender.* Both are; this is the corroboration from the graph side of the sibling's `B-3`. Fixing it requires one shared, index-keyed mapping — see m-13.

### **M-12 · No touch path exists. `onClick` reads a `hoveredBar` that only `mousemove` ever writes, and `onMouseLeave` never fires on touch, so a tap pins the tooltip open with no way to close it.**
`:132-155`. Handlers: `@mousemove`, `@mouseleave`, `@click` (`:180-182`). There is no `@pointerdown/@pointerup/@pointercancel`, no `@touchstart`, no `@keydown`.
`onClick` (`:151-155`) does **no hit test** — it re-reads `hoveredBar.value`, which is only ever set by `onMouseMove` (`:134`). On a touch device the state depends entirely on whether the browser synthesises a `mousemove` before `click`, and `onMouseLeave` has no touch analogue, so after a tap the tooltip and the hover-glow persist indefinitely. `hoveredBar` can also go stale relative to the pointer after a horizontal scroll, since `hitTest` reads a live `getBoundingClientRect()` (`:121`) but nothing recomputes on `scroll`.
**Falsifier** — *maybe iOS Safari's synthetic `mousemove` makes it work.* It may make the *open* work; it cannot make the *close* work, because no dismiss path exists in the file (B-3). *Maybe the app is desktop-only.* `VisualizationView.vue:333-348` carries an explicit `max-width: 1023px` mobile-flex arm and a `mobileView` tab switch; `style.css:24-26` handles `safe-area-inset-bottom`. The app is explicitly mobile-supported. Live touch behaviour `UNPROVEN-NEEDS-LIVE (SS-13)`; the absence of every touch and dismiss handler is static.

---

## MINOR

**m-1 · Wrong z-band token.** `:187` `z-[var(--z-controls)]` = **20** (`4.0.0 tokens/scheme-motion.css:336`; unchanged at 7.0.0 `:215`) — the *navigation/controls* band, below `--z-dock` 40 and `--z-panel` 45. The floating band is `--z-tooltip` = **120**, and glass-ui ships a first-class `.z-tooltip` utility (`dist/styles/components.css`). *Falsifier:* the tooltip is clipped by `overflow` anyway (B-3), so today the misuse is inert — which is why it is MINOR and not MAJOR; the moment B-3 is fixed by portalling, the wrong band becomes live.

**m-2 · A hand-typed near-miss of an existing shadow token, theme-blind.** `:190` `shadow-[0_4px_12px_rgba(0,0,0,0.12)]`. glass-ui ships `--shadow-soft: 0 4px 12px rgba(0,0,0,0.1)` (4.0.0 `tokens/shadow.css:11`) — the same three lengths with a 2-point alpha drift. The token family is theme-reactive (`--shadow-color: var(--foreground)`, `tokens/color-radius.css:104`) and 7.0.0 adds both a dark-arm override (`tokens/dark-arm.css:217` → `rgba(0,0,0,0.3)`) and a `.shadow-soft` utility (`utilities/components.css:161`). The literal is black at 12 % on a `--card` of `hsl(24 8% 16%)` over a page of `hsl(24 9% 4%)` — **the tooltip has no elevation cue at all in dark mode.**

**m-3 · Arbitrary border width.** `:189` `border-[1.5px]`. glass-ui's own hairline vocabulary (`--border-hairline`, `.hairline-accent`, `utilities/base.css:124`) exists; 1.5 px is a one-off.

**m-4 · The 3 px inter-bar gaps are hover dead-zones — 17.6 % of the strip.** `:125-128` tests `mx ≥ x && mx ≤ x + BAR_W` only, so sweeping horizontally the tooltip vanishes and reappears once per bar (3 px of every 17 px pitch). *Falsifier:* generosity in Y is real and good (S-5); the gap in X is a separate, opposite choice. Extending the test to the full pitch would cost one line.

**m-5 · The annotation is 3 px out of register with the data it annotates.** `:228` `padding: 0 4px 2px` puts the label's left edge at 4 px; `:73` `startX = BAR_GAP + 4` puts the first bar's left edge at 7 px. In a component whose gutters are otherwise exactly symmetric (S-2), the one alignment that carries meaning — axis-label to axis-origin — is off by 3.

**m-6 · The transform explanation is a `title` attribute on a `cursor: help` div, unlinked to the canvas.** `:168`, `:230`. `title` has a ~1 s delay, no touch surface, no keyboard trigger, and is announced inconsistently by screen readers. It is not `aria-describedby`-linked to the `<canvas>` it describes (B-1). `user-select: none` (`:229`) additionally prevents copying the formula — an odd denial on a component whose whole purpose is to communicate one.

**m-7 · A 7.7 px italic serif subscript at 3.12:1.** `:232-235` `sub { font-size: 0.7em }` on an 11 px parent (`:227`) at `opacity: 0.75` (`:226`). The axis label itself is **3.12:1 light / 3.86:1 dark** (§A) — under the 4.5:1 AA floor before the subscript shrinks it further.

**m-8 · Four type sizes in a 120 px box, three of them below the library's micro floor.** 9 px (`:109` canvas), 10 px (`:200` `text-admin-label` = `--type-admin-label: 0.625rem`), 11 px (`:227` axis label), 12 px (`:187` `text-xs`). `typography/scale.css:86` names 10 px the *"fixed sub-control micro"* rung — the floor. Two sizes here sit under it and one sits between rungs.

**m-9 · The same notation encoded two ways, 35 lines apart.** `:169` uses markup — `log<sub>10</sub>(|c<sub>n</sub>| + 1)`; `:204` uses Unicode — `log₁₀(·+1)`. Different glyph metrics, different font resolution, different copy-paste behaviour, one component.

**m-10 · No empty, loading, or error state; an all-zero spectrum renders a silent blank.** `:36-40` returns `1` only when the array is **empty**; when `components[0].amplitude === 0`, `maxAmplitude` is `0`, `barFraction` (`:49`) computes `Math.max(0/0, 0.008)` = `Math.max(NaN, 0.008)` = **`NaN`**, and a canvas path with `NaN` coordinates draws nothing at all — no bars, no message. The `n === 0` guard at `:69` also returns before painting anything. Today the consumer hides all of this behind `v-if="components.length"` (`CoefficientsPanel.vue:18`) and the store's own `store.computing` guard sits one level up (`VisualizationView.vue:273`) — so the component ships with **no state coverage of its own** and no `aria-busy`.

**m-11 · DPR is captured once per draw and never re-read on a resolution change.** `:56` `window.devicePixelRatio` inside `draw()`, which runs only from `onMounted` (`:159`), the data watcher (`:157`), and hover (`:139`). Dragging the window to a different-DPR monitor or changing browser zoom leaves a stale backing store until the next data change — a soft-focus canvas with no repaint trigger. The canonical cure is a `matchMedia("(resolution: …dppx)")` one-shot listener.

**m-12 · Motion register clash: instant here, 500 ms 8 px away.** The subject has **zero** transitions — the hover glow (`:88-91`), the alpha step (`:86`), and the tooltip `v-if` (`:186`) all switch in one frame. Its panel sibling animates the same amplitude data with `transition-all duration-500 ease-out` (`CoefficientsSpectrum.vue:91`) and a five-rule `TransitionGroup` on `--ease-standard` (`:147-163`). Two renderings of one dataset, stacked, with opposite motion contracts. glass-ui ships `dist/styles/transitions.css` and the `--ease-*` family; neither is referenced here. *(PRM itself is vacuously satisfied — S-4.)*

**m-13 · `spectrumColor` is byte-duplicated across the two files while a palette module exists.** `:42-45` ≡ `CoefficientsSpectrum.vue:47-50`. `web/src/lib/colors.ts` exists, already hosts the viz-palette resolver, and is imported at `App.vue`. Corroborates sibling `m-11`. The duplication is also the mechanism of M-11: one shared, **index-keyed** function would fix the cross-surface divergence and the theme-blindness (B-2) in the same edit.

**m-14 · 14 px hit targets.** `:25` `BAR_W = 14` is the click/hover width (`:127`). WCAG **2.5.8 Target Size (Minimum, AA)** asks 24 × 24 CSS px. The 120 px column height (S-5) satisfies one axis; the other is 14 px with 3 px dead gaps (m-4). Currently mitigated only because the click does nothing (M-6).

---

## INFO

**i-1 · Dead import.** `:2` imports `onUnmounted`; it is never called. `web/tsconfig.json` sets `strict: true` but **no `noUnusedLocals`**, so `vue-tsc -b` (`package.json` `build`) is silent and there is no ESLint config in `web/`.

**i-2 · Unreachable fallback.** `:108` `getComputedStyle(canvas).getPropertyValue("color") || "#888"`. `getPropertyValue` on a *computed* style always returns a resolved non-empty string for `color`; the `"#888"` arm cannot execute. Harmless, but it advertises a defensive posture the code does not have.

**i-3 · `getComputedStyle` inside the per-bar loop.** `:108` runs `n` times per `draw()` (40 at the live consumer, 60 at the prop default), and `draw()` runs on **every** hover-change (`:139`). One hoist above the loop removes 39 forced style reads per pointer step. Cross-axis (P/performance); recorded here because it is the only thing in the component that could produce visible hover jank.

**i-4 · Nothing tests this DOM.** `CoefficientsPanel.vue:14` sets `:default-open="false"`; no e2e spec opens the Coefficients layer (`grep -rn "Coefficients" e2e/` → 0 hits). `@axe-core/playwright` is installed and asserts zero serious/critical at keystones (`e2e/visualization-ux.spec.ts:2,26-38`; `visualization-crud.spec.ts:81-95`) — **it has never seen this component.** `web/` has no vitest. The sole gates that touch this file are `vue-tsc` (blind to CSS classes, so blind to M-7) and Playwright (blind to a collapsed layer).

**i-5 · Not on the censused break surface — and that is the point.** No `metric-badge`, `hover-card`, `hover-popover`, `DockIconButton`, `DockDropdownTrigger`, `ToastVariant`, `lucide-vue-next`, `keyframes.js`, or `value.js` reference appears in this file. Its **only** F.W1 break is the CSS utility at M-7, invisible to symbol enumeration. Verified surviving at 7.0.0: `fira-code` (`typography/utilities.css:81`), `--z-controls` (`tokens/scheme-motion.css:215`), `--z-tooltip` (`:222`), `--muted-foreground`/`--border`/`--popover` (`tokens/color-radius.css`), `--shadow-soft` (`tokens/shadow.css:15`). Verified **changed**: `--card` light `hsl(36 48% 97%)` → `hsl(30 85% 96%)`, dark `hsl(24 8% 16%)` → `hsl(26 22% 17%)` — the contrast delta is quantified in §A and is adverse.

**i-6 · The component's height lives in JavaScript.** `:27` `const HEIGHT = 120` is consumed by the template through the script-setup binding (`:175`) and by the canvas (`:59,61,111`). It works, but the box's one layout dimension is therefore unreachable from CSS — no media query, no container query, and no consumer override can change it. Root cause of M-2 and M-4.

---

## SUPERLATIVES (L-18, each with its own falsifier)

**S-1 · The axis annotation is genuinely excellent design work, and rare.** `:164-171` + `:219-235`. The component *names its own y-transform* — `log₁₀(|cₙ| + 1)` or `|cₙ|` — switches the glyph reactively with `logScale`, and states the `+1` rationale in prose that is actually correct: *"The +1 shift admits zero amplitudes"* (`:168`), echoed in the source comment (`:164-167`) with the right justification (*"permits zero amplitudes without diverging"*). Most spectrum widgets ship a silent log toggle and leave the reader to infer the mapping from bar shape. *Falsifier — is it live, or decorative prose?* Live: `v-if="logScale"`/`v-else` at `:169-170` and the `:title` ternary at `:168`; both read the same prop that `barFraction` (`:48`) reads. It survives. **Bounded by** m-6 (not AT-linked) and M-9 (it labels an axis that is never drawn) — but the *instinct*, to make the transform legible rather than implicit, is the right one and should be preserved verbatim through any repair.

**S-2 · The canvas gutters are exactly symmetric, and derived rather than eyeballed.** `:33` `n·(BAR_W + BAR_GAP) + BAR_GAP + 8` = `17n + 11`; `:73` `startX = BAR_GAP + 4 = 7`. Last bar's right edge = `7 + 17(n−1) + 14 = 17n + 4`, so the right gutter is `17n + 11 − (17n + 4)` = **7 px — identical to the left.** The odd-looking `+ BAR_GAP + 8` is precisely the term that makes it so. *Falsifier — coincidence, or intent?* Recomputed independently at n = 1, 12, 40, 60: 7/7 every time. A coincidence would not hold across the parameterisation. It survives.

**S-3 · Textbook DPR handling.** `:56-64`: backing store sized `w·dpr × HEIGHT·dpr`, CSS size pinned separately in px, then `setTransform(dpr, 0, 0, dpr, 0, 0)` so every subsequent coordinate is in CSS px. This is the correct four-step idiom and a great many hand-rolled canvases in the wild get it wrong (they scale the store and then draw in device px, or they omit `style.width` and let the element stretch). *Falsifier — is it complete?* Not quite: it is correct **at draw time only**, with no resolution-change listener (m-11). The superlative is therefore bounded to "correct idiom, incomplete lifecycle" — but the idiom itself survives.

**S-4 · Zero `requestAnimationFrame`, in a repo the census flags for an rAF/PRM epidemic.** `grep -n "requestAnimationFrame"` over the subject → 0. Redraw is driven by one watcher (`:157`) and one mount hook (`:159`). This corroborates `CENSUS-2026-08-03.md:87` and `lane-frontend.md:562` exactly, and it means `prefers-reduced-motion` is **vacuously satisfied** here — no carve is needed because there is no motion to carve. *Falsifier — is there a hidden clock?* No `setInterval`, no `setTimeout`, no `@vueuse` animation composable, no CSS `animation` in the scoped block. It survives. *(The other edge of the same fact is m-12.)*

**S-5 · The hit target is the full column, not the drawn bar.** `hitTest(clientX)` (`:116-130`) takes **only** an x coordinate and ignores y entirely, so hovering anywhere in the 120 px strip above a 2 px bar still selects it. For a bar chart with a long descending tail — which is exactly what a sorted Fourier spectrum is (`epicycles.py:54`) — this is the right call, and the naive "hit the painted rectangle" alternative would make the tail unhoverable. *Falsifier — does it produce false positives?* The canvas is entirely graph; there is no non-plot region in x where a hit would be wrong. It survives. *(Bounded by m-4: generous in y, gappy in x.)*

**S-6 · The floor and the log shift are the right instincts about degenerate data.** `:49` `Math.max(val / maxAmplitude, 0.008)` refuses to let a real coefficient render as literally nothing; `:39`/`:48` `Math.log10(x + 1)` refuses to diverge at zero, and the component *says so* in prose (`:166-167`, `:168`). Two correct decisions about the boundary cases most spectrum widgets ignore. *Falsifier — does the intent survive execution?* Partly: the floor is defeated by the 3 px corner radius (**M-8**) and the log path inherits the `NaN` hole (**m-10**). The reasoning is right; the arithmetic needs `r = Math.min(BAR_W/2, 3, barH)` and a zero-guard on `maxAmplitude`. Credited as intent, with the execution defect filed separately.

---

## §B · Falsified candidates (tested, rejected — recorded so they are not re-raised)

| # | candidate | why it was rejected |
|---|---|---|
| **F-1** | `maxAmplitude` (`:36-40`) assumes `components[0]` is the maximum; unsorted input would overflow the plot. | The producer guarantees it: `src/fourier_analysis/epicycles.py:54` `sorted(components, key=lambda c: c.amplitude, reverse=True)`, and the docstring at `:47` states it as a class invariant. `slice(0, maxBars)` preserves index 0. **Not a defect.** *(The `maxAmplitude === 0` hole is real and separate — m-10.)* |
| **F-2** | The consumer's `class="mb-2"` (`CoefficientsPanel.vue:21`) cannot land on a multi-root component. | The template has a **single** root, `.freq-graph-host` (`:163`); attribute fallthrough applies normally. **Not a defect.** |
| **F-3** | The scoped `<style>` (`:215`) omits `@reference "tailwindcss"`, which the sibling carries (`CoefficientsSpectrum.vue:145`). | The block contains no `@apply` and no Tailwind theme function — the directive is unnecessary. **Not a defect.** |
| **F-4** | Adding `scrollRef.scrollLeft` to the tooltip x (`:138`) double-counts the scroll offset. | Correct as written: an absolutely-positioned descendant of a scroll container is laid out against the **unscrolled** padding box and then translates with the content, so the scroll offset must be added back. **Not a defect.** (B-3's clipping is independent of this.) |
| **F-5** | `fira-code` (`:202,205,208`) and `--z-controls` (`:187`) break at glass-ui 7.0.0, adding to the M-7 break surface. | Both survive: `7.0.0 src/styles/typography/utilities.css:81` (`@utility fira-code`) and `tokens/scheme-motion.css:215` (`--z-controls: 20`). The uplift break here is **`text-admin-label` alone**. **Not a defect.** |
| **F-6** | Missing `prefers-reduced-motion` carve (the repo's only `reduce` block, `style.css:92-96`, is scoped to `[role="tabpanel"]`). | There is no motion in this component to carve — no CSS transition, no animation, no rAF, no timer. PRM is **vacuously satisfied**. Re-filed as the superlative **S-4** and, from the other side, as the register-clash **m-12**. **Not a PRM defect.** |

---

## §C · Repair order (cheapest-first, each independently landable)

1. **One line each, zero risk:** hoist `getComputedStyle` out of the loop (i-3); drop the `onUnmounted` import (i-1); `z-[var(--z-controls)]` → `.z-tooltip` (m-1); `shadow-[…]` → `shadow-soft` (m-2); axis-label `padding-left: 4px` → `7px` (m-5); `r = Math.min(BAR_W/2, 3, barH)` (M-8); guard `maxAmplitude === 0` (m-10); widen `hitTest` to the full 17 px pitch (m-4); delete the phantom `"EB Garamond"` and restore `Georgia` (M-10).
2. **Delete the scoped `.scrollbar-thin` block entirely** (`:236-246`) — the library utility is already imported and is strictly better (M-3), and this also removes the 4 px gutter that participates in M-4.
3. **`text-admin-label` → a surviving rung** before F.W1 lands (M-7), and file the CENSUS §5 typography addendum.
4. **Portal the tooltip** — replace `:184-210` with the existing `ui/tooltip` shim, as the sibling already does 8 px away (B-3, m-1, M-12).
5. **One shared, index-keyed, token-derived `spectrumColor` in `lib/colors.ts`** — closes B-2, M-11 and m-13 in one edit, and lets `resolveVizColors` make it theme-reactive.
6. **Give the canvas a name and a keyboard path** — `role="img"` + `aria-label` at minimum; a focusable, arrow-navigable overlay if M-6's interaction contract is ever wired up (B-1). Either restore that contract with a real consumer or remove `cursor-pointer`, the emits, and the `0.25` arm (M-6).
7. **Draw the axis** the annotation already promises — one 1 px baseline stroke at the `y = 102` the code already computes, plus a max tick (M-9).
8. **Un-freeze the pixels** — `HEIGHT` and the canvas font to rem-derived values; `FadingScroll` at the scroll boundary (M-2, M-4, M-5).
