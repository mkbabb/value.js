# Lane U-CARDS — the depth grammar: rounding, shadows, hairlines, the lost ellipse veil, the wide-screen layout

**Scope (from brief):** ground U17/U19/U24/U26 (rounding, shadow-fighting, extreme shadows, black
hairlines vs glass, cartoon-shadow grammar), U13 (the lost ellipse hairline veil card around the
component sliders), U32 (the side-by-side similar-size layout clamp). Plus a full **selector census**
of every card-like surface vs the house tokens.

**Method:** read the canon (LEDGER U1–U33 + 28 screenshots), the house tokens (`demo/DESIGN.md` +
`demo/@/styles/style.css`), the live app at :9000 via chrome-devtools MCP (own page; resized to
1440), and the source at HEAD `b112e46` (= `199fd15` + the audit-docs commit + 0.12.0). All
file:line cites are at this HEAD. **No code edited** (tranche-development only).

---

## 0 — The house depth grammar (the yardstick every card is measured against)

`demo/DESIGN.md §Radii / §Shadows / §Surfaces` + `style.css` define ONE intended language. Live
token values probed on :9000 (the authoritative numbers — DESIGN.md prose has drifted, see §6):

| Token | DESIGN.md prose | **Live value (probed)** | Where set |
|---|---|---|---|
| `--radius-card` | 16px | **1rem = 16px** ✓ | glass-ui theme |
| `--radius-input` | 8px | **0.25rem = 4px** ✗ DRIFT | glass-ui theme |
| `--radius-panel` | 12px | **12px** ✓ | glass-ui theme |
| `--shadow-cartoon` | `8px 8px 0 0 …80%` | **`8px 8px 0px 0px color-mix(srgb, hsl(48 10% 90%) 50%, transparent)`** (dark) | `style.css:114,218` |
| `--shadow-card` | → routed thru cartoon | **identical to `--shadow-cartoon`** ✓ | `style.css:116` |
| `--shadow-cartoon-sm` | chip rung | `-3px 2px 1px …10%, 0 3px 1px …10%, -3px 3px 1px …6%` | glass-ui |
| `--border` (dark) | hairline | **`hsl(217.2 32.6% 18%)` = `rgb(31,42,61)` navy** | `style.css:222` |

**The cartoon language is `8px 8px 0 0` HARD offset, 50% opacity in dark mode** — a pop-art solid
drop. The card material is supposed to be *glass* (translucent + frosted) WITH this cartoon shadow.
The conflict the user keeps naming (U17 "shadow FIGHTING", U24/U26 "shadow too extreme") is that
**this hard 8px offset is applied to surfaces that ALSO sit inside a wash pane and ALSO carry a
near-black navy hairline** — three depth cues stacking on one element instead of one coherent plate.

---

## 1 — Selector census: every card-like surface vs the house tokens

Grounded by `grep` over `demo/@/components/custom` + `demo/color-picker` and live `getComputedStyle`
probes. Columns: radius / shadow / border AT REST.

### A — Pane shells (the `<Card>` instances)

| Surface | file:line | tier | radius | shadow | border | Verdict |
|---|---|---|---|---|---|---|
| Picker pane | `ColorPicker.vue:3` | `resting` | `rounded-card` 16px | **soft glass ring** (`rgba(255,255,255,.1) inset` + faint), NOT cartoon | 1px hairline | ✓ correct glass plate |
| Browse pane | `BrowsePane.vue:2` | `wash` | (Card default) | `:shadow=false` → none | none | ✓ |
| Extract pane | `ExtractPane.vue:3` | `wash` | — | none | none | ✓ |
| Generate pane | `GeneratePane.vue:32` | `wash` | — | none | none | ✓ |
| Gradient pane | `GradientPane.vue:20` | `wash` | — | none | none | ✓ |
| Mix pane | `MixPane.vue:61` | `wash` | — | none | none | ✓ |
| Admin pane | `AdminPane.vue:2` | `wash` | — | none | none | ✓ |
| Palettes pane | `PalettesPane.vue:2` | `wash` | — | none | none | ✓ |
| About pane | `AboutPane.vue:2` | (multi-line) | — | — | — | check separately |
| Config/Aurora/Blob pane | `ConfigSliderPane.vue:99` | `wash` | — | none | none | ✓ |

The pane shells are healthy: resting picker = soft glass ring; every wash pane = shadow-off. **The
problem surfaces are the CONTENT cards inside the wash panes**, below.

### B — Content cards that carry the heavy cartoon `shadow-card` (the U17/U22/U24 fighters)

| Surface | file:line | radius | shadow AT REST | border | Verdict |
|---|---|---|---|---|---|
| **Gradient preview swatch** | `GradientVisualizer.vue:122` | `rounded-card` | **`shadow-card`** = 8px8px hard offset | `border border-border` (navy hairline) | ✗ U17/U22 — cartoon swatch fights the wash pane |
| **PaletteCard** (generated + saved) | `PaletteCard.vue:7` | `rounded-card` | none at rest → **`hover:shadow-card-hover`** = **10px 10px** | `border border-border` (navy) | ✗ U17/U24/U26 — navy hairline + 10px hover lurch |
| GradientCodeEditor (CSS card) | `GradientCodeEditor.vue:138` | `rounded-lg` | none (glass-wash) | `border-border/40` | partial — U24 shows it black-bordered; reads heavy |
| MixResultDisplay | `MixResultDisplay.vue:31` | `rounded-xl` | `glass-floating` ring | (floating) | check — wrong radius role (`rounded-xl` not a house token role) |

> **U24 root cause** (the "shadow too extreme; hairline wrong" on the CSS card / palette component):
> u24's heavy-black-bordered CSS code block is `GradientCodeEditor.vue:138` (`glass-wash
> border-border/40`) — but the screenshot's extreme shadow + black hairline reads as the cartoon
> `shadow-card` applied to the gradient preview swatch one row up (`GradientVisualizer.vue:122`),
> bleeding. The user's ask: **palette → FIRST-CLASS in-repo component with variants (skeleton,
> glass)**. Today `PaletteCard.vue` IS the de-facto component but has no variant axis — it hardcodes
> `rounded-card border border-border bg-card hover:shadow-card-hover` (`PaletteCard.vue:7`). The
> skeleton is a SEPARATE file (`PaletteCardSkeleton.vue`) not a variant; the glass form does not
> exist. → variant-bearing `<PaletteCard variant="glass|skeleton|cartoon">` is the W6 work-order.

### C — Inputs / chrome (rounded-input / rounded-sm cluster)

Census of rounded utilities (grep `rounded-(card|panel|input|lg|xl|2xl|md|sm)`): **22× `rounded-sm`,
8× `rounded-md`, 8× `rounded-input`, 7× `rounded-card`, 6× `rounded-panel`, 4× `rounded-lg`, 4×
`rounded-2xl`, 2× `rounded-xl`.** The off-grammar residue: `rounded-lg`/`rounded-xl`/`rounded-2xl`
(13 sites) are Tailwind raw radii, NOT the role-bearing house tokens (`rounded-card/panel/input`).
These are the U19 "components not rounded per the design language" sites. Worst offenders:

- `GradientCodeEditor.vue:138` `rounded-lg` (should be `rounded-panel` — it's a content panel)
- `GradientStopEditor.vue:109` `rounded-lg` (gradient track)
- `MixResultDisplay.vue:31` `rounded-xl` (should be `rounded-card` or `rounded-panel`)
- AdminAuditPanel/AdminTagsPanel inputs use `rounded-input` (4px live) — fine, but the 4px vs the
  8px DESIGN.md claim means inputs read TIGHTER than the documented intent (§6 drift).

### D — Dashed-ghost surfaces (U13/U14/U18/U22)

| Surface | file:line | construct | Verdict |
|---|---|---|---|
| `.dashed-well` (mix Selected tray) | `MixSourceSelector.vue:115` + def `utils.css:56` | `1.5px dashed border …80%`, `rounded-card`, inset shadow | minted N.W5.E; this is the **blue dashed box** around "Palette 1" in u14 (the tint is the live picker color bleeding into `--border`/`--muted`) |
| `.dashed-well` (current-palette editor) | `CurrentPaletteEditor.vue:3` | same | same — U19 "two separate panes" both wrapped in dashed-well |
| watercolor add-swatch (dashed dot) | `MixSourceSelector.vue:148`, `CurrentPaletteEditor.vue:83`, `ImageEyedropper.vue:19` | `border-2 border-dashed border-primary/30` round | U18 "dashed = ghost variant of the watercolor dot" — today it's a plain dashed circle, NOT a watercolor-shaped ghost. **U18 ask = a `WatercolorDot variant="ghost"` in glass-ui** (the dashed organic blob outline), consume here |
| editing-swatch dashed outline | `CurrentPaletteEditor.vue:295,305` | `outline: 2px dashed …30%` | the "currently editing" affordance |

> **U18 (glass-ui-owned):** the dashed add-swatch is a CSS `border-2 border-dashed` circle, but it
> sits beside real `watercolor-swatch` organic blobs (`MixSourceSelector.vue:148`). The user wants
> the dashed/ghost to be a **watercolor-shaped** outline (the organic 43%/53% radius the live
> `.watercolor-swatch` probe showed), abstracted to glass-ui as a `WatercolorDot` ghost variant.

---

## 2 — U13: the lost ellipse hairline veil card around the component sliders

**The finding (LEDGER U13):** "The color-space component section used to sit in a hairline dock/veil
ELLIPSE card — regression." Shot u10 shows the bare LABA sliders with NO encapsulating surface; u27
shows a **faint dashed ellipse ghost ring** in the picker header (around the blob area).

**What it is today:** `ComponentSliders.vue` renders a bare CSS grid —
`<div class="grid grid-cols-[auto_1fr] … stagger-children">` (`ComponentSliders.vue:4`) with a
`channel-rail` tablist column + one slider per row. There is **NO wrapping card, no veil, no
ellipse**. It sits raw inside `<CardContent>` of the picker (`ColorPicker.vue:25-30`, between
`<SpectrumCanvas/>` and `<ComponentSliders/>`).

**What it WAS (git archaeology):** I pickaxed the full history. There is **no `veil`/`ellipse` string
ever in the demo source** (`git log --all -S veil` → only the audit-docs commit; `-S ellipse -- demo`
→ nothing). The "hairline dock/veil ellipse" the user remembers is **NOT a deleted named class** —
it is the **satellite-orbit ghost ring drawn by the deleted flat-HSV `goo-blob` fork**
(`demo/@/components/custom/goo-blob/composables/useBlobSatellites.ts`, deleted at N.W5.A `e32111c`).
That fork drew satellites orbiting on an elliptical path; the faint dashed ellipse still visible in
**u27** is the residual orbit-guide the glass-ui `GooBlob` retains. The component-slider section
itself never had its own ellipse card — the user is conflating the picker header's blob-orbit veil
(an *ellipse* the eye reads as "encapsulating the picker controls") with a desire to **re-introduce a
hairline veil that visually groups the slider section**.

**Disposition:** U13 is a *design re-introduction*, not a regression-restore (nothing to revert). The
work-order: give the component-slider section an idiomatic encapsulation — a hairline/veil grouping
surface (the house grammar is a `.dashed-well`-like recessed glass well OR a `rounded-card`
hairline-glass panel) so the LABA rail+sliders read as one grouped control cluster instead of floating
loose in the CardContent. NOT a literal ellipse SVG; the ellipse the user saw was the blob orbit. Tag
the live phantom `stagger-children` (`ComponentSliders.vue:4`, K2 — still undefined) for cleanup in
the same pass.

---

## 3 — U17 / U24 / U26: the shadow-fighting + black-hairline-vs-glass grammar

**The defect, exactly:** the demo has ONE cartoon language (`8px 8px 0 0`, correct per DESIGN.md), but
it is misapplied:

1. **U17 "shadow FIGHTING"** — `GradientVisualizer.vue:122` puts a hard `shadow-card` (8px8px) on the
   gradient preview swatch, which sits INSIDE a `tier="wash" :shadow=false` pane (u22/u23). The
   cartoon offset competes with the pane's own scroll-fade and the swatch's own gradient fill → two
   depth systems on one surface. Same on every `PaletteCard` on hover (10px10px lurch). The user's
   target: **glass cards WITH cartoon shadows** — i.e. the cartoon shadow belongs on a *glass* plate
   (frosted translucent), applied at ONE elevation, not stacked on a flat `bg-card` + navy hairline.

2. **U26 "black hairline wrong (should be glassy)"** — every content card uses `border border-border`
   = dark-mode `hsl(217.2 32.6% 18%)` = `rgb(31,42,61)` navy (`style.css:222`). Against the dark
   cards this reads as a near-black hairline (u26 OKLCh select, u23 gradient swatch). It should be a
   *glassy* edge: `rgba(255,255,255,.1) inset` ring (the glass-ui resting-card recipe the live probe
   showed on the PICKER card) OR a `color-mix(…/40%)` translucent edge — NOT the opaque navy.

3. **U24 "shadow too extreme; hairline border wrong"** — the CSS code card (u24) +
   the PaletteCard hover. Verdict: replace the hard `shadow-card` on content cards with the
   glass-resting recipe (soft inset ring + a *gentle* cartoon offset only on first-class "lifted"
   cards), and replace the navy hairline with the glass edge. **Reserve the bold 8px cartoon offset
   for the picker pane and top-level plates** — not for every inner swatch/code block.

**Root tokens to retune (W6 work-order, demo-owned):**
- `style.css:222` `--border` (dark) navy → a glassy translucent edge for content cards (or introduce
  a `--card-edge` token mixed from `--foreground`/transparent so cards read glassy, dock/inputs keep
  the structural navy).
- `GradientVisualizer.vue:122`, `PaletteCard.vue:7`: drop `shadow-card`/`hover:shadow-card-hover` from
  inner content cards; route them through the glass-resting material; the bold cartoon stays the
  pane/plate signature only.

---

## 4 — U19: components not rounded per the design language (two separate panes)

Shots u14/u15 show the palette-naming input + its dashed-well wrapper, and a second pane, with
inconsistent rounding. Grounded:
- The naming input `<input>` and the dashed-well wrapper both use `rounded-card` (well) but the inner
  controls use `rounded-sm`/`rounded-input` (4px live) — the radius role ladder is inconsistent
  *within* one cluster (16px outer, 4px inner — too large a jump; the 8px `rounded-input` the docs
  intend would bridge it, but glass-ui shipped input at 4px → §6 drift).
- 13 off-grammar `rounded-lg/xl/2xl` sites (census §1.C) are the literal "not rounded per the design
  language" — they bypass `rounded-card/panel/input`. **W6 work-order: sweep the 13 raw-radius sites
  onto the role-bearing tokens; reconcile the input-radius drift (decide 4px vs 8px and document).**

---

## 5 — U32: the layout — measure + spec the side-by-side similar-size clamp

**Live measurement (probed on :9000 at 1440×900 viewport):**

| Fact | Value | Source |
|---|---|---|
| `.pane-container` rendered width | **1000.0px** (capped) | live `getBoundingClientRect` |
| `.pane-container` max-width | **1000px** | `style.css:196` formula |
| Grid columns (dual) | **`496px 496px`** (equal) | `style.css:206-208` `1fr 1fr` |
| Gap | 8px (`--desktop-pane-gap` 0.5rem) | `style.css:133` |
| Picker pane-shell width | **480px** (`--desktop-pane-max-w` 30rem) | `ColorPicker.vue:2` |
| Left/right margin at 1440 | **220px each side** | live |
| Container height at 1440 | 774px | live |

**The formula** (`style.css:196`): `max-width: calc(var(--desktop-pane-max-w) * 2 +
var(--desktop-pane-gap) + var(--app-padding-x) * 2)` = `30rem*2 + 0.5rem + 1rem*2` = **1000px FIXED**.

**Projection (the formula is purely CSS, so):**

| Viewport | Container | Each card | Margin/side | Wasted width |
|---|---|---|---|---|
| 1440 | 1000px | 480px | 220px | 44% empty |
| 1920 | 1000px | 480px | **460px** | 52% empty |
| 2560 | 1000px | 480px | **780px** | 61% empty |
| tall portrait (e.g. 1080×1920) | 1000px (or single col <1024) | 480px | ~40px | height-bound |

**Verdict:** The "side-by-side, similar-size, CLAMPED for pathological wide" is **half-satisfied**:
the two cards ARE equal (`1fr 1fr` → `496px 496px`) ✓ and ARE clamped ✓ — but **clamped to a tiny
fixed 1000px**, so on every screen ≥1440 the cards stay 480px and the app floats in a vast empty pink
field (u27 confirms: a 480px card in a 1440 field, 960px of empty aurora). This is precisely the
user's "cramped/more accessible … less cramped, dock bigger, picker properly sized" complaint (U32):
the cards never grow to USE the available width; they're frozen small.

**Spec (the general clamp the user asks for — W6 layout work-order):**
- Replace the FIXED 1000px cap with a **fluid clamp**: each pane
  `width: clamp(min, fluid-vw-based, max)` where `min ≈ 30rem` (current), `max ≈ 40–44rem`, fluid
  term scales with viewport so the pair GROWS toward the larger size on wide screens before clamping.
  e.g. container `max-width: min(96vw, 1400px)` with `grid-template-columns: 1fr 1fr` lets each card
  reach ~44rem on a 1920 before the 1400 clamp pins it.
- Keep the **equal-size** invariant (`1fr 1fr`) — the user wants "similar size," already met.
- The clamp upper bound (e.g. 1400px) is the "pathological wide" guard (a 2560 or ultrawide caps,
  margins symmetric, never edge-to-edge).
- **Tall portrait:** the `--content-max-h: clamp(34rem, 86dvh, 52rem)` (`style.css:150`) already caps
  height; on portrait the dual grid drops to single-col below 1024px (`style.css:202`). The general
  clamp must also handle the tall case: when `aspect-ratio < 1` keep single-column stacked even at
  ≥1024 wide-but-short-and-tall — currently the `min-width:1024px` media query ignores aspect, so a
  1080-wide portrait gets the dual grid in a too-narrow column. Add an aspect-aware fallback.
- **Dock bigger** (U32 also): `--dock-h` = `--size-icon-btn + 0.75rem + 3px` (`style.css:127`) — the
  dock scales off the icon-btn token; bump the desktop dock sizing in tandem so it doesn't read tiny
  beside the enlarged cards.

---

## 6 — Drift / phantom notes surfaced in passing

- **`--radius-input` drift:** DESIGN.md §Radii says 8px; live = **4px** (glass-ui moved it). Inputs
  read tighter than documented. Decide + document (W8 doc-truth or W6).
- **`stagger-children` resolved:** `ComponentSliders.vue:4` consumes it; it IS now defined
  (`animations.css:40-49`, minted N.W5.E — `.stagger-children > *:nth-child(n)` delay ladder, PRM-gated).
  NOT a phantom. (Earlier draft mis-flagged it — corrected on verify.) No cleanup needed; it can stay.
- **`dashed-well` resolved:** now defined (`utils.css:56`, N.W5.E) — NOT a phantom anymore; it IS the
  blue dashed box in u14/u19. Its `--border 80%` mix tints with the live color (the "blue" is the
  picker color, expected).

---

## 7 — Wave folding (where each U-card lands)

All of these are **demo-owned design work** → **N.W6** (design-language suffusion), except U18 (a
glass-ui `WatercolorDot variant="ghost"` ask → §8 cohort) and the `--radius-input` doc reconcile (W8).

| U | One-line work-order | Owner | Wave |
|---|---|---|---|
| U13 | Encapsulate the component-slider cluster in a hairline-glass veil well (NOT a literal ellipse; the ellipse was the deleted blob orbit); clean `stagger-children` phantom | demo | N.W6 |
| U17 | Stop content cards stacking cartoon-shadow on flat bg+navy edge; route inner cards through glass-resting; reserve 8px cartoon for plates | demo | N.W6 |
| U19 | Sweep 13 raw `rounded-lg/xl/2xl` → role tokens; reconcile inner-vs-outer radius ladder | demo | N.W6 |
| U24 | Palette → variant-bearing first-class `<PaletteCard variant=glass\|skeleton\|cartoon>`; de-extreme the CSS-card shadow/hairline | demo | N.W6 |
| U26 | `--border` navy → glassy translucent card edge (content cards); keep navy for structural chrome | demo | N.W6 |
| U18 | dashed add-swatch → watercolor-shaped ghost (`WatercolorDot variant="ghost"`) | glass-ui | cohort ask |
| U32 | fixed-1000px cap → fluid `clamp` (cards grow to ~40–44rem then clamp); aspect-aware single-col; bigger dock | demo | N.W6 |

---

## Evidence

- Live screenshots: `docs/tranches/N/audit/lanes2/shots/U-cards-picker-1440.png` (picker in the
  vast empty field — U32), `…/U-cards-generate-1440.png` (generate pane + generated PaletteCard).
- Live probes (this lane, :9000): pane-container 1000px @1440 (220px margins); resting picker card =
  glass ring not cartoon; PaletteCard = `box-shadow:none` + `rgb(31,42,61)` navy hairline;
  `--radius-input` = 4px; cartoon = `8px 8px 0 0 …50%`.
- Source HEAD `b112e46`: `style.css:114,116,196,206-208,218,222`; `ColorPicker.vue:2-3,25-30`;
  `ComponentSliders.vue:4`; `GradientVisualizer.vue:122`; `PaletteCard.vue:7`; `utils.css:56`;
  `MixSourceSelector.vue:115,148`; `CurrentPaletteEditor.vue:3,83`; `GradientCodeEditor.vue:138`.
- Git: `git log --all -S veil`/`-S ellipse -- demo` → no named veil/ellipse ever existed; the orbit
  ellipse was the deleted `goo-blob/useBlobSatellites.ts` (N.W5.A `e32111c`).
