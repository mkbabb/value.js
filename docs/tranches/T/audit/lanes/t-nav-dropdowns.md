# T fleet · t-nav-dropdowns — the menu voice + the dropdown color previews (T-10 · T-17)

**Lane**: design (Fable) · **Rows**: T-10 (menu voice — ONLY "Palettes" rainbow, the rest
white/black; owner OVERRULE of W7-4's landed color-wheel-legend menu) · T-17 (dropdowns get
color previews, deftly and in proportion; shots t-2007-15 / t-2007-18)
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close)
**Probe rig**: own vite on `:9481` (`VITE_API_URL=http://localhost:59999`), headless
Playwright (repo's own), 1440×900, light + dark contexts. Every color below is a
**computed-style read from the live DOM** (dot `backgroundColor`, icon `color`, label
`color`, popper surface `background/backdrop-filter`), not a token guess. Probe frames
parked at `scratchpad/{nav-menu,gen-preset,gen-harmony,grad-space,grad-hue,mix-space,
picker-catalog}-{light,dark}.png` (session-ephemeral; the numbers are inline here).

---

## §0 Shot ↔ finding re-derivation (read from disk, not the mandate map)

| Shot | What it actually shows | Row it evidences |
|---|---|---|
| `t-2007-15` (578×710) | The **Harmony** dropdown open on the generate view, dark scheme over a red-orange field: Golden / Analogous / Complementary / **Triadic (highlighted ring)** / Split complementary / Random, each a two-line name+description row, **zero color anywhere in the menu**. Option strings match `HARMONY_DEFS` verbatim (`useColorGeneration.ts:70-77`) — this is `GenerateControls.vue:152-169`, NOT AuroraPane's harmony select (whose rows are raw values with no description line, `AuroraPane.vue:120-122`) | **T-17** |
| `t-2007-18` (532×846) | The **Preset** dropdown, same view/scheme: Vibrant (highlighted) / Pastel / Warm / Cool / Earth / Neon / Muted + scroll chevron — strings match `GENERATION_PRESETS` (`useColorGeneration.ts:38-49`); surface = `GenerateControls.vue:130-147`. Rows describe color character **in words only** ("Reds, oranges, golds") while painting none of it | **T-17** |

T-10 carries no shot — it is the owner's verbatim line "Only 'palletes' should be rainbow.
The rest should be white/black," aimed at the dock view-select menu (§1).

---

## §1 T-10 — the menu voice: the landed legend, live-measured

### What W7-4 shipped (the thing being overruled)

`DockViewSelect.vue:41-45` (`entryAccent`) paints **every** menu row's dot + icon in that
row's own gamut-guarded view hue (`--accent-view-<id>`, 9 static tokens written by
`useViewAccents.ts:74-89` through the library pipeline in `@lib/view-accents.ts` —
rotate → C-floor → cusp-map → L re-guard → WCAG ≥3:1). The menu is, by design, "the
navigation's color-wheel legend" (`DockViewSelect.vue:96-102`; `S/FINAL.md` W7-4 row).

**Live reads (my probe, light scheme, default pink pick)** — dot ≡ icon per row, labels ink:

| Row | dot/icon computed | label computed |
|---|---|---|
| Home | `oklch(0.6156 0.2462 9.8)` | `rgb(28,25,23)` |
| Palettes | `oklch(0.6006 0.1592 49.8)` | ″ |
| Browse | `oklch(0.5941 0.1214 89.8)` | ″ |
| Extract | `oklch(0.6010 0.1614 129.8)` | ″ |
| Mix | `oklch(0.5935 0.1177 169.8)` | ″ |
| Generate | `oklch(0.5908 0.1021 209.8)` | ″ |
| Gradient | `oklch(0.6024 0.1698 249.8)` | ″ |

(Dark: same 40°-fan at L≈0.82-0.92, labels `rgb(233,230,226)`. The public menu is 7 rows —
`userViews`, `useDockAdminMode.ts:26`; atmosphere/blob sit admin-side (`:27`) yet still
receive view-hued rows through `entryAccent` when the admin menu renders. The home view's
token id is `picker`, not `home`.)

So the landed menu is **seven simultaneous hues** — a rainbow by construction. The owner's
line is a taste verdict on exactly this: the legend reads as noise, not as an atlas key.
Seven 40°-spaced hues at matched L/C carry near-zero discriminative information (nobody
memorizes "Extract is the green one"); meanwhile the ONE row whose destination actually IS
multicolor data — Palettes — speaks a single arbitrary orange.

### F1 — the overrule, encoded (owner: demo)

- **Evidence**: `DockViewSelect.vue:41-45,103-114`; the live table above; §0 owner verbatim.
- **Root-cause**: W7-4 solved a real defect (the pre-S menu's gray rows + one live dot +
  one fixed-pastel one-off) with a maximal answer — hue on every row. The owner brackets it
  from the other side: chromatic identity in the nav belongs to the DESTINATION of color
  data, not to navigation as such.
- **Cure direction (gestalt)**: the menu goes **ink**. Rows = icon + label, both speaking
  the popover foreground pair (the measured `rgb(28,25,23)` / `rgb(233,230,226)` stone-ink
  — already the label voice; the icons simply join it). Selection stays weight + the
  producer's glass-quiet highlighted row (`menuItemVariants` surface `glass`,
  `_shared/menuItemVariants.ts`) — **no** colored selected-dot (`hide-indicator` stays;
  the producer's `--glass-accent` dot would smuggle color back into a white/black menu).
  This is a PARTIAL reversal: W7-4's library resolver, contrast math, and the current-view
  accent all survive (F4); only the per-row legend paint dies.

### F2 — the dot column dies with the legend (owner: demo)

- **Evidence**: `DockViewSelect.vue:104-107` — an 8px `rounded-full` swatch per row whose
  computed background is always identical to the icon 4px to its right (table above): a
  double-encoding even under W7-4.
- **Root-cause**: the dot was the legend's "swatch"; with hue gone a gray dot is pure noise
  (the S-12 superfluity class).
- **Cure direction**: EXCISE the dot span. Row anatomy: `icon (ink) · label (ink)`. The
  admin-toggle rows (`:125-135`) shed their dots identically.

### F3 — the Palettes rainbow: form for ratification (owner: demo)

The owner wants the rainbow BACK on Palettes — history matters here: pre-S the menu's
Palettes label wore `pastel-rainbow-text` (excised at S.W5-7 per **Q4 RATIFIED EXCISE**,
whose record keeps an `oklch(from var(--accent-live) …)` 3-stop analogous ramp "ON RECORD
as the owner's alternative if the moment must survive — relocated to a color-data surface,
never a title"). The overrule IS that moment surviving. Two forms, both alive to the pick
and contrast-guarded through the existing `view-accents.ts` pipeline (the Q4 lesson: the
dead recipe's fixed pastels measured ≈1.1-1.5:1 in light — never again fixed literals):

1. **PRIMARY (register-honest — the Q4 record's own relocation clause)**: the Palettes row
   carries a **miniature palette strip** — a color-data chip (5 segments, the T-17 strip
   grammar §2.3) in the icon position or beside the label. Stops = the accent-derived
   analogous fan resolved via `resolveViewAccent`-class ops (gamut-mapped, ≥3:1 against
   the menu glass, both schemes) — or, sharper still, the user's CURRENT palette colors
   when one exists (the nav row previews its destination; falls back to the derived fan).
   This unifies T-10 with T-17 under ONE law: **color appears in menus only as color
   data** — and Palettes is the one nav row whose destination is color data.
2. **ALTERNATIVE (owner-verbatim memory)**: the label letterforms wear the guarded ramp
   (`background-clip: text` over the derived 3-stop analogous ramp). This re-opens the S
   register law ("letterforms speak ink" — S.W5-7/Q4) for exactly one nav row; if the
   owner picks it at ratification, encode it as a NAMED sanctioned exception, derived
   live, never pastel literals.

Sanctioned-exception ledger for the white/black law: (1) Palettes' rainbow (this row);
(2) admin **gold** (mode identity, the owner's own long-standing golden-shimmer mandate —
`:126-128` keeps `--color-gold`); everything else ink — including atmosphere/blob rows in
the admin menu (currently view-hued via `entryAccent`). **Scope line for the corpus**:
Tools/Login/dock chrome speak the LIVE accent (W7-4's voice map) and are not menu items —
the lane reads "the rest white/black" as menu-scoped; flag the chrome question explicitly
at ratification rather than silently widening the overrule.

### F4 — the trigger/seal accent survives; the orphaned 9-token machinery must die with the legend (owner: demo)

- **Evidence**: `--accent-view-<id>`'s SOLE consumer is `DockViewSelect.vue:44`
  (repo grep). The CURRENT-view accent has independent consumers that the overrule does
  not touch: `style.css:223-224` (`--primary: var(--accent-view)` — the whole app's
  per-view accent), the trigger icon + `--dock-ring` (`DockViewSelect.vue:67,80`), the
  wax-seal die-rim (`Dock.vue:337` — `color-mix(in oklab, var(--accent-view) 60%, …)`),
  and the scoped view-switch hue sweep (`DockViewSelect.vue:153-155`, the registered
  `@property --accent-view` transition).
- **Root-cause**: W7-1's continuity law (seal rim ≡ trigger ring, ONE custom property) and
  W7-4's per-row legend are separable halves; the owner overrules only the second.
- **Cure direction**: the trigger keeps speaking `--accent-view` (icon + ring), the seal
  rim keeps growing into it across the morph, `--primary` keeps riding it — the navigation
  still names its view in hue at exactly ONE point (the trigger/seal), which is the
  white/black menu's counterweight. Then E-3 demands the dead machinery go: excise
  `resolveViewAccentTokens` + the 9-token write watch (`useViewAccents.ts:74-89`) +
  `PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS` + `entryAccent`; keep `resolveViewAccent`
  (current view) + `resolveSealInk` + the `@property` registration. Real perf dividend on
  the W3-1 drag clock: the per-accent-change resolve drops 10 → 2 library solves (each up
  to a 12-step WCAG walk + gamut maps — `view-accents.ts:156-169`); the 13-test oracle
  (`test/view-accents.test.ts`, `audit/w7-accent-table.md`) slims to the current-accent +
  seal-ink rows instead of orbiting a paint nobody renders.

---

## §2 T-17 — the dropdown color previews: grammar, proportion, restraint

### The measured void

The app's most color-generative page offers its two governing choices in words alone.
Live reads (light; dark equivalent):

- **Preset menu** (`gen-preset-*.png`): 10 rows × 52px, label `rgb(28,25,23)` Plus Jakarta
  16.4px + `text-micro` description, **0 color-bearing elements per row** (probe counted
  inline-bg/gradient descendants). Surface: `oklab(0.9559 0.0096 0.0297 / 0.749)`,
  `blur(13px) saturate(1.6)`, 12px radius, 227px wide. Each row is literally a region of
  OKLCh space (`GENERATION_PRESETS` L/C/H boxes, `useColorGeneration.ts:38-49`) described
  in prose — "Reds, oranges, golds" — with no paint.
- **Harmony menu** (240px): same anatomy; each row is hue geometry (`generateHues`,
  `:85-141`) in prose — "Base + two flanking complements".
- **Gradient**: Type/Space/Hue selects (`GradientVisualizer.vue:178-224`) and **Mix**:
  Space/Hue/Strategy (`MixConfigBar.vue:56-84,92-100`) — all text-only, though the spaces
  differ VISIBLY in what they do to the current ramp (the green→blue pair behind the open
  menu in `grad-space-light.png` detours through gray in RGB, cyan in HSL — exactly the
  difference the menu refuses to show).
- **The one existing preview** — the picker's space catalog (`ColorSpaceSelector.vue:62-77`,
  `picker-catalog-*.png`, 81px rows): WatercolorDot + live per-space conversion string in
  the `#description` row. The grammar T-17 generalizes already exists in the house; its
  dots are honestly identical (one color, 17 notations — the STRING is the specimen there).

### F5 — generate preset + harmony get seed-exact strips (owner: demo)

- **Root-cause**: the generation instrument violates its own precedent — the count slider
  already carries the live generated ramp as its track (`countSliderGradient`,
  `GenerateControls.vue:54-62`, the S.W5-6/F8 "instrument shows its own state" pattern);
  the two menus one row above it are blind.
- **Cure direction — the truth law**: each option row previews
  `generatePalette(count.value, candidate, harmony.value, seed.value)` (preset rows) /
  `generatePalette(count.value, preset.value, candidate, seed.value)` (harmony rows) —
  the function is pure and mulberry32-seeded (`useColorGeneration.ts:218-248`), so the
  strip a row shows is **byte-identical to the palette selecting it yields**. A preview
  that lies (random per open, or a canned swatch) is worse than none. Computed only while
  `SelectContent` renders (it unmounts closed — the ColorSpaceSelector precedent), so zero
  rest cost; 10 rows × 5-12 library generations is sub-millisecond.

### F6 — gradient/mix space + hue-method rows get library-sampled ramps (owner: demo)

- **Cure direction**: each space row renders the CURRENT operands interpolated through the
  candidate space (gradient: the live stop set via `mixColors`,
  `useGradientInterpolation.ts:38`; mix: the operand colors via `mixColorsN`,
  `useMixingState.ts:95`); each hue-method row renders the current space with the
  candidate arc (shorter/longer/increasing/decreasing — the four-arc ramp quartet is the
  canonical CSS-spec illustration, here drawn with the user's own colors). **Sampling law
  (the W7-4 dogfood clause)**: ramps are k-sample (≈16) discrete-stop
  `linear-gradient(to right, …)` strings built from the LIBRARY's interpolation — never
  CSS `in <space>` gradient interpolation, because the preview must show what THE APP
  computes, not what the browser's engine would (and HSV/XYZ/kelvin aren't
  CSS-interpolable anyway — one mechanism for all rows, no engine divergence).

### F7 — the grammar + proportion law (owner: demo; no producer ask)

- **Placement**: the producer `#description` lane — the one row slot reka's `SelectValue`
  does NOT clone into the trigger (the constraint ColorSpaceSelector documents at
  `:54-57`; producer anatomy `glass-ui SelectItem.vue:63-68`). Chip leading, description
  text after, `gap-2`. **No producer ask is required** — the grammar lives entirely in the
  existing description lane; the E-2 packet carries only a CONTRACT note: the BG/BH Select
  revisions must preserve the description slot + its clone-exclusion.
- **Two chip forms, one module**: **STRIP** (discrete — n hard segments, for generate
  preset/harmony + AuroraPane's admin harmony select as a family member) and **RAMP**
  (continuous — for space/hue rows). One colocated demo module (chip pair + a
  library-sampling helper), consumed by generate/gradient/mix — color-domain content is
  the demo's, not glass-ui's (E-1: a focused common module, not a per-pane copy).
- **Proportion**: chip height = the description line's em (it joins the existing text
  line — row rhythm untouched at 52px); width one golden plate (≈φ²:1, ~2.618rem ×
  1em); `radius-sm`; an **inset hairline ring** (`color-mix(in oklab, var(--foreground)
  12%, transparent)`) so light chips survive light glass, dark chips dark glass, and all
  chips out-rank the accidental bleed-through (F8). `aria-hidden` decorative — the a11y
  truth stays label + description (the AN.W4 discipline the producer's own selected-dot
  cites, `SelectItem.vue:45-49`). Static paint — no motion, PRM-neutral. Menu min-widths
  re-verified per host (`min-w-[14rem]` at generate likely → ~16-17rem for chip + the
  longest description, "Base + two flanking complements" — the B.W1 width comments are
  deliberate; keep them honest).
- **Triggers stay text-only**: the live result already shows beside every one of these
  menus (palette plate + count-track at generate; the rail/plate at gradient; the mix
  stage) — a trigger chip would double-speak. Menus preview, triggers name. That is the
  "in proportion" half of the owner's sentence.
- **The restraint table (which dropdowns get NO previews)**: dock view-select (T-10
  governs it — ink + the one Palettes strip); gradient TYPE (geometry, not color);
  mix size-mismatch strategy (count semantics); sort/filter/user-sort menus (metadata);
  easing preset select (curve domain — T-22's lane owns any curve-thumbnail grammar).
  The picker's space catalog keeps its existing dot+specimen form unchanged (same color
  through 17 notations — a ramp would be false there; the conversion string is the
  preview).

### F8 — accidental color in the colorless menus (observation; owner: joint with the card-material lane)

- **Evidence**: `gen-preset-light.png` — the palette plate's green/purple/olive swatches
  smear through the menu glass (`blur(13px)` at 75% opacity) directly behind the Warm/Earth
  rows: the only "color" in today's menus is bleed-through noise, adjacent to rows
  describing colors in prose. The owner's own shots (t-2007-15/18) show the same muddiness
  over the orange field (dark surface `oklab(0.399 0.0137 0.0325 / 0.845)`).
- **Cure direction**: material opacity/blur belongs to the T-3/T-11/T-18 card-material
  lane (cross-ref); THIS lane's dependency is stated in F7 — every chip carries the inset
  hairline so designed color always out-ranks bled color, whatever material the sibling
  lane lands.

---

## §3 Cross-lane seams

- **T-10 ↔ t-card-material (T-18/T-24)**: the ink menu's white/black must key to the same
  neutral ladder that lane consolidates (the measured stone pair is today's de-facto ink).
- **T-17 ↔ t-easing lane (T-22)**: easing preset thumbnails are curve-domain, excluded
  here by the restraint table; if that lane mints a thumbnail grammar it should rhyme with
  the chip proportion spec (em-height, hairline, description-lane).
- **T-10 ↔ E-2 packet**: no Select ask; one contract line (description-lane survival
  through BG/BH). The `--dock-ring` producer consume remains the standing L13/W7-1 ask —
  unchanged by this lane.
- **W8 (glass-ui 5.0.0 adopt)**: both cures are pure demo-side; no new adopt coupling.
