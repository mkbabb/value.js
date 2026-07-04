# S design-assay lane — the PICKER page (localhost:9000/#/picker)

**Mode**: AUDIT ONLY (tranche-S development). No product-code edits, no commits.
**Repo**: value.js @ `c5aa091` (branch `tranche-q`). Live dev server localhost:9000.
**Method**: headless Chromium probe (own instance — the shared MCP browser was being driven by a sibling lane), light + dark, 1440×900 + 390×844, computed-style extraction + element screenshots. Raw metrics: `assets/design-picker/probe-report.json`.

**Evidence** (`docs/tranches/S/audit/lanes/assets/design-picker/`):

| shot | what |
|---|---|
| `picker-light-1440.png` / `picker-dark-1440.png` | full viewport, both schemes |
| `picker-card-light.png` / `picker-card-dark.png` | the picker card, both schemes |
| `capsule-picker-light.png` / `capsule-about-light.png` | the two dropdowns side-by-side (S-1 faces) |
| `slider-rest-light.png` / `slider-hover-light.png` | channel slider at rest vs hover (S-2/S-16) |
| `picker-light-390.png` | mobile layout |
| `gradient-light-1440.png` | gradient page (hover-grammar comparison) |

Register assayed against: the editorial instrument — Fraunces display voice, Fira readout,
cartoon-offset shadow, ink+grain, perceptually-true fields. Anything that reads as generic
glass furniture, inverts hierarchy, or adds superfluous chrome is a taste deficit (P1 here).

---

## P1-1 · S-19 — The typographic hero wraps beside a dead field (hierarchy inversion at every viewport)

The readout is declared the picker's TYPOGRAPHIC hero (`ColorComponentDisplay.vue:2-8`), yet
for Lab at 1440×900 it renders `92.0%, 88.8,` on line 1 and `20.0` alone on line 2 — with a
**measured 141px of dead field** right of line 1 *inside* the readout box, plus a further
**144px `pr-36` reservation** to the card edge. Mobile (390px) wraps identically. The hero
measurement is broken-lined at every viewport probed.

Measured mechanics (light, 1440):
- readout font `53.28px` (`--type-display-2`), container **525px** wide;
- Lab worst-case `ch` reservations (`readoutReservation.ts:26-41`): cell widths 169 + 203 + 203px
  (`88.8,` renders ~130px of glyphs inside a 6ch = 203px box reserved for `-125.0`) + 2×12px gap
  ≈ **599px needed > 525px available** → structural wrap for Lab at this rung, independent of value;
- the deficit is manufactured by `ColorPicker.vue:29`: `CardHeader … pr-24 lg:pr-36` reserves the
  blob footprint across the **entire header column**, but the blob (`ColorPicker.vue:18-22`,
  `lg:-top-14 lg:-right-12`, canvas y ≈ −56…120) never overlaps the readout row (y = 242…361).
  The readout pays 144px for a neighbor that isn't there;
- `.readout` locks `min-height: calc(2 * 1.12em)` = 119px (`ColorComponentDisplay.vue:97`) — so even
  spaces that fit one line (hex) carry a permanent blank second line under the title.

**The re-composition** (keeps the ratified card-lock law — reservation stays, width is freed):
1. Scope the blob reservation to the FIRST header row only (the capsule/title row); the readout
   row spans the full header width (`w-full`, standard `clamp` padding). 525 + 144 = 669px ≥ 599px —
   Lab inks one line at 1440.
2. With P1-2's pill excision the title row shrinks vertically (~104px → ~48px), pulling the
   readout up into the freed field — header becomes title-line + hero-line, the atlas-plate stack.
3. Optional third lever if 4-component spaces still wrap at mid widths: ride the display rung on
   the pane container (`cqi` clamp) instead of a fixed `--type-display-2` — the readout is already
   inside a container-query context (`ColorPicker.vue:29` uses `cqi` for padding).
4. Re-derive the 2-line lock: `min-height` should be the *per-space* line count from the same
   static reservation table (1 line for spaces that fit, 2 for those that can't), not a blanket 2.

**Root-routing**: value.js demo (`ColorPicker.vue`, `ColorComponentDisplay.vue`,
`readoutReservation.ts` — table gains a "lines for width" derivation).

## P1-2 · S-1 — Dropdown-as-title: the space selector is a furniture pill, and the two instances disagree on the face

Both `ColorSpaceSelector` instances paint a **veil pill**: measured `oklab(0.8617 … / 0.54)` bg +
`blur(8px) saturate(1.4)` backdrop + 1px border + `radius: 9999px` + `8px 20px` padding — a
181×104px cream capsule squatting on the pink field (`capsule-picker-light.png`). In dark it's a
muddy brown plate (`oklab(0.377 … / 0.61)`, `picker-card-dark.png`). The space name is the plate
TITLE — a component of the typography — not a control that needs a housing. This is the page's
loudest piece of generic furniture.

**The face inconsistency is confirmed and measured**: picker trigger `font-family: Fraunces, serif`;
About trigger `"Plus Jakarta Sans", … system-ui` (`capsule-about-light.png` — sans "Lab"). Root
cause is a context dependency the component itself documents: `ColorSpaceSelector.vue:22-27`
retired the trigger-level `fontFamily` and lets "the display face ride the CardHeader's
`font-display` surface" — so any host without that ancestor surface (AboutPane's `PaneHeader`,
`AboutPane.vue:8-16`) drops the trigger to the body sans. A component whose face depends on its
host's cascade is not a component.

**The exact restyle** (ONE component, both hosts, zero per-instance overrides — S-21):
- `ColorSpaceSelector.vue:5` — delete the `veil-surface` capsule wrapper and its scoped block
  (`:151-158`): no background, no backdrop-filter, no border, no pill, no padding rhythm. The
  selector renders as bare `SelectTrigger variant="ghost"` — the space name in **Fraunces italic**
  at the host's title rung + the caret, full stop.
- The trigger **owns** `font-display italic` in its own class list (`:33`) — self-reliant face,
  host-independent; size keeps riding the producer `size="audacious"` rung.
- Keep: `safeAccent` ink (`:32`), the C5 focus register (`:169-174`), the specimen dropdown rows
  (the SelectContent catalog is good instrument work — WatercolorDot + live conversion stay).
- The caret is the only rest-state affordance; hover may underline/ink-shift (the editorial
  link grammar), never re-grow a surface.

**Veil capsule state** (assayed as instructed): `veil-surface` itself is a sound glass-ui tier
(`glass-ui src/styles/cards.css:430-453`, ladder-routed, three overridable deltas). The defect is
this *consumption*, not the tier. `ColorSpaceSelector.vue` is the demo's **only** `veil-surface`
consumer — the S-1 restyle leaves the demo with zero veil usage. No glass-ui change needed.

**Root-routing**: value.js demo (`ColorSpaceSelector.vue`). No producer work.

## P1-3 · S-14 — The catalog counter is superfluous chrome: kill it

`ColorSpaceSelector.vue:9-11` — the eyebrow `color space — 06 / 16` (Fira small-caps) renders in
BOTH dropdowns (measured text identical). The user has ruled it superfluity; it also leaks
implementation inventory ("16") into the title block, and it is the tallest line of the pill.
Delete the eyebrow span + its scoped CSS (`:160-166`). Same sweep: the per-row index
`pad(i + 1)` in the dropdown description rows (`:72`) is the same catalog-numbering conceit —
excise with it (the WatercolorDot + live conversion already carry the row).

**Root-routing**: value.js demo (`ColorSpaceSelector.vue`).

## P1-4 · S-2 — Channel-slider thumbs: black 2px outline in BOTH schemes; the ink regime is scheme- and slider-blind

Measured (Lab 92%/88.8/20, light): all four thumbs 12×24px, `border: 2px solid rgba(0,0,0,0.8)`,
fill = live color. Measured **dark**: `borderColor` still `rgba(0,0,0,0.8)` — the black outline
survives the scheme flip. The heaviest stroke on the entire card is the thumb border (2px @ 80%
black vs the card's 1px @ 12% edge) — that is why the thumbs read "black" (`picker-card-light.png`,
`slider-rest-light.png`).

Mechanics:
- Demo feed: `ComponentSliders.vue:188-193` — `thumbInk` reads `spectrumFieldIsLight(s, v)` of the
  ONE live color and feeds all four sliders the same ink, independent of scheme. (Per-slider ink
  would be degenerate anyway — each ramp's stop at the current value IS the live color — so ink from
  the live color's own luma is *correct*; only its weight/alpha is wrong.)
- Producer geometry: glass-ui `Slider.vue:441` — `border: 2px solid var(--slider-thumb-border-color,
  var(--background))`. The 2px is hardcoded; there is no width token on the thumb axis.

**Fix (at the root, split by ownership)**:
- glass-ui producer: introduce `--slider-thumb-border-w` (default `1.5px`) on the spectrum recipe —
  the one documented knob; consumers never restyle the thumb per-instance.
- value.js demo: soften the ink alphas (`rgba(0,0,0,0.8)` → ~`0.55`; white leg `0.9` → ~`0.8`) so the
  needle reads as an instrument hairline, not a cartoon outline. The `::after` needle notch
  (`ComponentSliders.vue:355-365`) already shares the feed and follows for free.

**Root-routing**: glass-ui producer (border-width token) + value.js demo (ink alphas).

## P1-5 · S-16 — The thumb hover is imperceptible; the app has two hover grammars and one of them is dead code

Measured hover delta on a channel thumb: `0 0 0 4px color(srgb 0.11 0.098 0.09 / 0.08)` — a 4px
halo at **8% alpha** (`--surface-tint-8`, glass-ui `Slider.vue:462-466`). Invisible over the
spectrum ramps (`slider-hover-light.png` — rest and hover are indistinguishable). No scale, no
cursor change, no border-weight response.

The gradient picker's hover the user likes is a **grow** grammar: `GradientStopEditor.vue:124` —
`w-5 h-5 rounded-full border-2 … hover:scale-110`, selected/dragging `scale(1.25)`. But measured
hover transform on a live stop handle: `matrix(1, 0, 0, 1, -10, -10)` — **`hover:scale-110` is dead
CSS**: the inline `:style` transform (`:134`, `translate(-50%,-50%) scale(selected ? 1.25 : 1)`)
overrides the class utility. The liked feel comes from the selected-state 1.25 grow; the hover leg
never fires.

**Fix (one hover grammar, producer-owned)**:
- glass-ui `Slider.vue` spectrum hover: `transform: scale(1.06)` on the thumb (transform channel,
  compositor-only — S-23) + halo promoted to `--surface-tint-15` (the rung the held state already
  uses at `:402-406`) + `cursor: grab`. Hover then rhymes with held (6px/15%) as a graded scale.
- value.js demo `GradientStopEditor.vue:134`: fold hover into the inline scale computation
  (`hovered ? 1.1 : …`) or drop the dead utility — either way, no class-vs-inline shadowing.

**Root-routing**: glass-ui producer (spectrum hover recipe) + value.js demo (gradient dead-hover bug).

## P1-6 · S-3 — The channel-letter rail: structurally monochrome, ambiguous, and not a component

Current state (`ComponentSliders.vue:9-40, 310-344`): a 26px-wide column of bare Fraunces letters
at 0.6 opacity. Three defects, one structural:

1. **The per-channel color is degenerate by construction.** `labelColor()`
   (`ComponentSliders.vue:171-182`) samples each channel's ramp *at the current value* — but the
   ramp for channel X holds all other channels at their current values, so the stop at X's current
   value is the live color itself, for every channel. Measured: L = `oklch(0.62 0.2725 9.8)`,
   a = `oklch(0.62 0.3074 8.6)`, b = `oklch(0.62 0.2731 12.3)`, alpha = `oklch(0.62 0.2725 9.8)` —
   four "channel-identifying" inks that are one pink. The concept cancels itself.
2. **`L / A / B / A`** — a* and alpha both render "A" (`componentLabel`, `:152-154`). An index whose
   entries collide is not an index.
3. **No surface** — the letters float unanchored in the grid gutter; against the atlas-plate register
   they read as stray marginalia, not the "primary navigational affordance" the comment claims (`:7`).

**The concrete concept — a vertical mini-dock rail, produced in glass-ui**:
- **Primitive**: a `variant="rail"` on glass-ui **Tabs** (`ui/tabs` — the markup is already a
  `role="tablist"` with roving tabindex, `:224-261`; per the reuse-existing-component-names
  discipline this is a Tabs variant, NOT a new Carousel/Rail component — the N.W1.A "GlassCarousel"
  category error stays dead). Vertical orientation; the track is the dock's capsule grammar
  (`glass-capsule-track` — the same register `GlassDock` and the gradient rail already paint), a
  slim inscribed glass column ≈ 2.25rem wide: "almost a mini glass-ui dock".
- **Items**: the channel letters keep the Fraunces-italic display voice (`font-display` opt-in stays
  a consumer class); alpha renders `α` (or small-caps `a`) to break the A/A collision.
- **Active indicator**: a **WatercolorDot ring** behind/around the active letter — glass-ui
  `watercolor-dot` already ships the ring form; ink it in the *modified* current color
  (`color-mix(in oklch, var(--accent-live) 65%, var(--foreground) 35%)` — i.e. the existing
  safeAccent register, not a new recipe). Inactive letters: `--muted-foreground` at 0.6 — the
  channel-color conceit is retired (it was never real, see 1).
- **A11y**: the tablist/roving-tabindex logic moves INTO the producer variant (Tabs already owns
  it); the demo's 40 lines of hand-rolled keyboard nav (`:219-261`) die on consume.

**Root-routing**: glass-ui producer (Tabs `rail` variant + capsule track) → value.js demo consumes
(`ComponentSliders.vue` rail block deleted onto it).

## P2-1 · Overlay/detent polish state (assayed): sound instrument work; two nits

The gamut-truth overlay + detent stack is in-register and well-factored: engine geometry in
`src/units/color/boundary`, paint in `gamutOverlayPaint.ts` (shared `spectrumLuma` ink regime,
token-probed `--gamut-*` inks, DPR cap 2), scheduling in `useGamutOverlay`, drag physics in
`useGamutDetent.ts` (~6px absorbed travel, `:23` — real resistance, model-coupled). The hatch
netting the user likes (S-6) is this system's margin paint. The plate caption pair
(`SpectrumPlateCaption.vue` — `gamut lens — display-p3 / srgb` / `cusp l 0.629 c 0.256`) is
load-bearing instrument annotation, NOT superfluity — keep it (the superfluous line on this card
is the S-14 counter). Nits:
- `SpectrumDetentLabel.vue:12` — the `⊣` tack glyph is cryptic; the chip already carries the lens
  name, the glyph adds noise. Either drop it or use the em-dash detent tick the atlas grammar
  already uses.
- The detent chip is a bespoke paper-chip recipe (`:44-49`); when glass-ui grows a `mono`
  Tooltip/chip variant (already booked at `ComponentSliders.vue:87`, coordination/Q.md §3) this
  should consume it — same root discipline, later wave.

**Root-routing**: value.js demo (glyph); glass-ui (mono chip variant, already-booked coordination item).

## P2-2 · Corroborations from this lane's probes (other lanes own these)

- **S-11**: console shows CORS-blocked `https://api.color.babb.dev/colors/approved` from
  `localhost:9000` — the local dev demo points at the PROD API origin. (Route: demo API base-URL
  env wiring / api CORS allowlist.)
- **S-4**: the hero blob renders as a small clipped disc at the card corner at 1440 and as a flat
  dark circle at 390 (`picker-light-390.png`) — visible in every shot this lane took.
- **S-8**: collapsed dock paints clipped text over the dot at 1440 (`picker-light-1440.png`, "Ho").
- Mobile: the About pill (P1-2) pushes the readout down a full row at 390px — the S-1/S-19 fixes
  compound on mobile.

---

## Candidate wave-items (concrete, root-routed)

| # | item | root | files |
|---|---|---|---|
| W-A | **Title-as-component**: kill the veil pill + eyebrow counter + row index; trigger owns `font-display italic`; caret-only affordance; identical in both hosts | value.js demo | `ColorSpaceSelector.vue` (template `:5,9-11,72`, scoped `:151-166`) |
| W-B | **Header re-composition**: blob reservation scoped to title row; readout spans full header; per-space line-count lock (+ optional `cqi` display rung) | value.js demo | `ColorPicker.vue:29`, `ColorComponentDisplay.vue:93-99`, `readoutReservation.ts` |
| W-C | **Spectrum-thumb ink + hover**: `--slider-thumb-border-w` token (1.5px default) + hover `scale(1.06)` + `--surface-tint-15` halo + `cursor: grab` in the producer; ink alphas softened in the demo | glass-ui producer + value.js demo | glass-ui `slider/Slider.vue:441,462-466`; `ComponentSliders.vue:188-193` |
| W-D | **Channel rail → Tabs `rail` variant**: vertical capsule mini-dock track, WatercolorDot active ring in safeAccent-modified current color, `α` for alpha; demo's hand-rolled tablist deleted onto it | glass-ui producer → value.js demo | glass-ui `ui/tabs`; `ComponentSliders.vue:9-40,219-261,310-344` |
| W-E | **Gradient dead-hover fix**: fold hover scale into the inline transform (class utility is shadowed) | value.js demo | `GradientStopEditor.vue:124,134` |
| W-F | **Detent chip glyph** drop + booked glass-ui mono-chip consume | value.js demo (+ booked glass-ui) | `SpectrumDetentLabel.vue:12` |

Precept check: every item is an excision or a producer-token/variant move — no wrappers, no
fallbacks, no per-instance overrides; W-A/W-D *delete* demo code onto producer primitives.
