# Lane U-CONTROLS — sliders, pills, skeletons, clipping (U15 · U14 · U20 · U21 · U28 · U29)

**Fleet**: second N-tranche deep-audit (lanes2). **Mode**: tranche development only — nothing implemented.
**Substrate**: branch `tranche-f-handoff`, HEAD `199fd15` + 0.12.0; live app `:9000` (cold cache, shared across lanes).
**Evidence**: live chrome-devtools measurement on this lane's own page + `docs/tranches/N/audit/lanes2/shots/U-CONTROLS-*.png`.

---

## TL;DR — the load-bearing discovery

**The glass-ui `Slider` primitive ALREADY exists, already ships a `spectrum` variant built EXACTLY
for value.js's color-picker reference, and its size axis is STRUCTURALLY DEAD in the demo build.**

1. **U15 is ~80% already satisfied** — `Slider` is a first-class glass-ui primitive
   (`../glass-ui/src/components/ui/slider/Slider.vue`, re-exported at
   `demo/@/components/ui/slider/index.ts:1`). It has two variants (`standard`, `spectrum`) + three
   sizes (`sm`/`md`/`lg`) via `sliderVariants` CVA (`../glass-ui/src/components/ui/slider/index.ts:44`).
   The `spectrum` variant (Slider.vue:315–381) is documented as "the value.js gradient-track color
   slider … the value.js color-picker reference EXACTLY: `w-3` (12px) over an `h-6` (24px) track."
   The ask is therefore **consumption + variant completion**, not a net-new primitive.

2. **U28 root cause (P9-class structural bug, HIGH severity):** the glass-ui slider's `size` axis
   (`md` ⇒ 20px track, `lg` ⇒ 28px) **silently no-ops in the demo**. Every `standard` glass-ui
   slider renders at the **6px fallback** regardless of size. Measured live (below). The
   `[--slider-track-height:1.25rem]` arbitrary-property utility that `sliderVariants` emits is never
   compiled into any CSS the demo loads — a Tailwind-v4 dep-utility-scan gap (the constellation-grand-
   audit's P9 / "rounded-panel utility silently no-ops in consumers"). **This is the actual mechanism
   behind "slider too thin", not a value the demo can just bump.**

3. **U14 quantified:** the channel letters sit **9–12px ABOVE** their slider track centers, drift
   GROWING down the rail. Pure CSS-grid mis-modelling in `ComponentSliders.vue`.

4. **U20 quantified:** the bespoke `PaletteCardSkeleton.vue` paints at `bg-foreground/[0.04]` over a
   `bg-card` (`hsl 24 8% 10%`) → composites to ~`hsl 24 8% 13%`, indistinguishable from the card =
   the "too black" surfaces. It **ignores the glass-ui `Skeleton` primitive** (`bg-muted` +
   pulse/shimmer/breath registers) that `Markdown.vue` already consumes correctly.

5. **U15/U20 second gap:** the demo's sliders are SPLIT across two implementations —
   `ComponentSliders.vue` hand-rolls **raw reka-ui** `SliderRoot/Track/Thumb` (bypassing glass-ui
   entirely), while gradient/config panes consume the glass-ui `Slider`. Neither path uses the
   spectrum variant *correctly* (one has the gradient but raw markup; the other has the variant but
   no gradient).

---

## U15 — Slider first-class in glass-ui (inventory + what the primitive needs)

### Inventory: every slider implementation the demo ships

| Site | File:line | Implementation | Variant/size | Spectrum gradient? |
|---|---|---|---|---|
| LAB/RGB/etc channel sliders | `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:75–106` | **raw reka-ui** `SliderRoot`+`SliderTrack`+`SliderThumb` (import `:121–125`) | n/a — `h-6` (24px) `rounded-full` hand-class, thumb `w-3` | YES — `linear-gradient` from `componentsSlidersStyle` (`:77–81`) |
| Gradient Direction | `demo/@/components/custom/gradient/GradientVisualizer.vue:203` | glass-ui `Slider` (import `:10`) | `standard` / `md` (default) | n/a (standard) |
| Blob/Aurora config sliders | `demo/@/components/custom/panes/ConfigSliderPane.vue:137` | glass-ui `Slider` (import `:18`) | `variant="spectrum"` (`:139`), no size ⇒ `md` | **NO `--slider-track-bg`** ⇒ flat `var(--secondary)` |
| Extract controls sliders | `demo/@/components/custom/image-palette-extractor/ExtractControls.vue:21,50` | glass-ui `Slider` | sets `--slider-track-bg` to `transparent`/`var(--muted)` | partial |
| (glass-ui internal) Labeled slider wrapper | `../glass-ui/src/components/custom/labeled-field/LabeledSlider.vue:10` | glass-ui `Slider` | `standard`/`md` | n/a |

**The split is the disease.** Two slider codebases produce two looks. The `ComponentSliders` raw-reka
path was hand-built (with its OWN touch-gate listener stack `:259–344` that DUPLICATES the glass-ui
`Slider`'s native touch-gate `useTouchGate` + `useDockHold` — `Slider.vue:88–141`). The glass-ui
`Slider` already solves the reka forwardRef pointer-capture leak (Slider.vue:54–86), the touch
scroll-vs-drag arbitration (`:88–141`), and the dock-keep-open hold — all of which `ComponentSliders`
re-implements badly.

### What a glass-ui Slider primitive STILL needs (the net-new for tranche BA)

The primitive is ~80% there. The remaining asks, grounded against the live code:

1. **Make the `spectrum` variant the canonical LAB-channel face (U20 "SPECTRUM glass").** It is
   *built for this* (Slider.vue:315–367 — tall gradient track, transparent range, thin visible
   squircle thumb). `ComponentSliders` must migrate from raw reka onto
   `<Slider variant="spectrum" :style="{ '--slider-track-bg': linear-gradient(...) }">`, deleting its
   189-LoC duplicate touch-gate stack. **Owner: demo migration (consumption); glass-ui only if the
   spectrum face needs a per-channel-gradient convenience prop.**

2. **FIX the size-token no-op (U28, below) so `md`/`lg` actually thicken the track.** Owner: glass-ui
   build OR demo `@source`. This is a HARD blocker for "sliders bigger" (U32) too — you cannot make a
   slider bigger if the size axis is dead.

3. **A glass-specular skeleton register for the spectrum track (U20).** The spectrum slider's loading
   state should be a glassy shimmer of the gradient, not a black bar (see U20).

### Glass-ui spectrum variant — the THIN-thumb hazard (already present, re-verify under fix)

`Slider.vue:333–344` sizes the spectrum thumb at `calc(var(--slider-thumb-size,1rem) * 0.75)` = the
value.js `w-3`/12px reference. **But** `--slider-thumb-size` rides the SAME dead size-utility axis as
the track height (index.ts:60–62), so under the current build the thumb falls to the `1rem` fallback
→ 0.75rem = 12px (coincidentally correct at md). When the size no-op is fixed, re-verify the spectrum
thumb stays the slim `w-3` bar and does not chunk up.

---

## U28 — Slider too thin (ROOT CAUSE: dead size-utility axis — P9-class)

### Live measurement (this lane's page, `1440px` viewport, `#/gradient`)

```
glass-ui Slider, variant=standard, size=md, aria-label="Gradient direction":
  track rendered height = 6px        (getBoundingClientRect)
  track computed height  = "6px"     (getComputedStyle .slider-track)
  --slider-track-height var on root  = ""   ← EMPTY. the size token never landed.
```

`Slider.vue:177` reads `height: var(--slider-track-height, 0.375rem)`. With the var empty, it falls
to **0.375rem = 6px**. The `md` size is supposed to set `[--slider-track-height:1.25rem]` (20px) via
`sliderVariants` (`../glass-ui/src/components/ui/slider/index.ts:61`).

### Why the token is empty — the dep-utility-scan gap

- `sliderVariants` is a **CVA in a `.ts` file** that emits Tailwind ARBITRARY-PROPERTY utility
  classes: `[--slider-track-height:1.25rem]`, `[--slider-thumb-size:1rem]` (index.ts:60–62).
- Those literal class strings ship in the **compiled JS bundle**
  `node_modules/@mkbabb/glass-ui/dist/slider-B-JP2JlI.js` (verified present), which is **not a file
  any `@source` directive scans**.
- The demo's `@source` globs scan ONLY the demo's own tree:
  `demo/@/styles/style.css:60` `@source "../../color-picker/**/*.{vue,ts,html}"` and
  `:61` `@source "../**/*.{vue,ts,html}"`. Neither reaches glass-ui's dist.
- glass-ui's pre-compiled `node_modules/@mkbabb/glass-ui/dist/glass-ui.css` references
  `var(--slider-track-height, .375rem)` but **never emits the `[--slider-track-height:1.25rem]`
  utility rule** (`grep -c` = **0**). So no stylesheet the demo loads defines the `md`/`lg` heights.

Net: **every `standard` glass-ui slider in the demo renders at 6px**, and the `size` prop is inert.
Matches u25 (DIRECTION slider = a ~6–8px hairline) and u24/u16.

### Fix options (for the tranche to choose — all structural, none a demo magic-number)

1. **glass-ui emits the size rules into its precompiled `glass-ui.css`** (a `@layer`/static block, not
   a CVA arbitrary class) — the cleanest; consumers get correct geometry with zero `@source` knowledge.
   *Preferred; owner: glass-ui tranche BA.*
2. **demo adds `@source "../../../node_modules/@mkbabb/glass-ui/dist/**/*.js"`** so Tailwind scans the
   bundle for the arbitrary classes. Fragile (path/lockfile-dependent) and re-pays compile cost.
3. **sliderVariants stops using arbitrary-property utilities for geometry** — bind the size axis via
   `[data-size]` scoped-CSS selectors in `Slider.vue` (the file already keys recipes off
   `[data-variant]`/`[data-size]`, Slider.vue:150–154), so no Tailwind utility generation is needed.
   *Also clean; same SFC already proves the pattern.*

This is a **constellation P9 instance** — the grand-audit named "rounded-panel utility silently no-ops
in consumers — Tailwind-v4 dep-utility-scan gap." The same gap should be SWEPT for every CVA arbitrary
utility glass-ui ships, not just the slider (e.g. any `[--token:value]` in a glass-ui CVA `.ts`).

---

## U14 — channel letters must center EXACTLY with their sliders

### Live measurement (this lane's page, picker view)

```
letter  letterCenterY  trackCenterY  deltaY
  L         617           626          -9
  A         664           674         -10
  B         712           723         -11
  A         760           772         -12
```

Each channel letter sits **9–12px above** its slider's vertical center, and the drift **grows
monotonically** down the rail. Screenshot: `shots/U-CONTROLS-sliders-full.png` (and visible in u10).

### Root cause — `ComponentSliders.vue` grid mis-models the two columns

`ComponentSliders.vue` is a `grid grid-cols-[auto_1fr] … items-center` (`:3–5`):

- **Column 1 (the rail)** spans all rows (`gridRow: 1 / N+1`, `:14`) and distributes letters with
  `justify-around` over the FULL grid height (`:13`). So the letters are spaced evenly against the
  grid box.
- **Column 2 (each slider row)** is `flex flex-col gap-0.5` (`:47`) with a `currentColorRanges`
  CAPTION span ABOVE the slider (`:49–51`) and the slider track below it (`:75`). The caption pushes
  the actual track DOWN inside each row.

So the rail centers each letter on the row's *full* height (caption + slider), while the *track*
center sits below the caption — letters land high. Because the rail's `justify-around` distribution
diverges row-by-row from the actual per-row track positions, the error **accumulates**, producing the
−9 → −12 ramp. (The alpha row being hidden in some spaces — measured 4 letters vs 8 `.slider-track`
nodes, the extra 4 are zero-box — adds to the row-count vs item-count mismatch the rail can't model.)

### Fix direction
Abandon the "one rail column spanning all rows with `justify-around`" model. Either (a) move the
caption OUT of the slider's flex column (e.g. inline range to the right of the track, so the slider is
the row's only vertical content and `items-center` aligns the letter to it), or (b) place each letter
in its OWN grid cell on the slider's row (`gridRow: i+1, gridColumn: 1`) so per-row `items-center`
centers letter↔track directly — no whole-rail distribution. The grid already has the row index `i`
(`:44–46`); reuse it for the rail items too. Owner: demo. Couples to U13 (restore the hairline
ellipse encapsulation around the component section) and U2/U31 (the columnar-number layout).

---

## U20 — skeletons too BLACK; slider should be SPECTRUM glass

### Two distinct defects under U20.

**(a) Skeletons read near-black.** Census of skeleton surfaces:

| Skeleton site | File | Idiom | Surface |
|---|---|---|---|
| glass-ui `Skeleton` (the idiom U20 wants) | re-exported `demo/@/components/ui/skeleton/index.ts:1` → `../glass-ui/src/components/ui/skeleton/Skeleton.vue` | `bg-muted` opaque + `pulse`/`shimmer`/`breath` variants (Skeleton.vue:26–47) | `--muted = hsl(24 6% 11%)` — a legible glassy register |
| **`PaletteCardSkeleton.vue` (the black one)** | `demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue` | **hand-rolled** `animate-pulse` divs, NO glass-ui Skeleton | `bg-foreground/[0.04]` (`:15`), `bg-foreground/[0.06]` (`:14`), `color-mix(... muted-foreground 10% ...)` (`:9`) |
| Correct consumer (proof the idiom exists) | `demo/@/components/custom/markdown/Markdown.vue:3–6,26` | glass-ui `<Skeleton>` | `bg-muted` |

Live dark-mode tokens (measured): `--card = hsl(24 8% 10%)`, `--foreground = hsl(48 10% 90%)`,
`--muted = hsl(24 6% 11%)`. The bespoke skeleton paints `90%`-white at `4–6%` opacity OVER the
`10%`-lightness card → composites to ≈`hsl(24 8% 13%)`, ~3% lighter than the card = the "too black,
can't see the skeleton" surfaces in u16. **Fix: re-author `PaletteCardSkeleton.vue` onto the glass-ui
`<Skeleton>` primitive** (`bg-muted` + a `shimmer`/`breath` register) instead of `bg-foreground/[0.0x]`
divs. Consumers: `MixSourceSelector.vue:9`, `ExtractPane.vue:90`. Owner: demo, leaning on the
existing glass-ui primitive (no net-new glass-ui work for the skeleton surface itself).

**(b) "the slider = a glass slider, but SPECTRUM glass."** The LAB channel sliders should consume the
glass-ui `spectrum` variant (see U15). Currently `ComponentSliders.vue` hand-rolls raw reka with a
gradient track (`:77–81`) — the gradient is right but the chrome is not the glass spectrum face.
And `ConfigSliderPane.vue:139` uses `variant="spectrum"` but supplies **no `--slider-track-bg`**, so
its "spectrum" track is a flat `var(--secondary)` (Slider.vue:323) — a spectrum slider with no
spectrum. Both must converge on the glass-ui spectrum variant fed a real gradient.

---

## U21 — pills not centered

The Extract/Palettes pill toggle (u17) is `PaneSegmentedControl.vue` →
`SegmentedTabs variant="pill"` from `@mkbabb/glass-ui/tabs` (`:6,18`). The container row is
`flex items-center justify-center` (`:4`), so the control is centered in its row; the mis-centering is
**inside** the glass-ui `SegmentedTabs` — the active-pill indicator / label alignment
(`../glass-ui/src/components/custom/tabs/SegmentedTabs.vue` + `TabsIndicator.vue` +
`composables/useTabIndicator.ts`). **Owner: glass-ui (tranche BA).** The demo side is correct; the
fix is the pill-indicator geometry in the glass-ui SegmentedTabs primitive. (The other "pill" in u17 —
the pink camera `DockViewSelect` trigger — is dock chrome, not this control.)

---

## U29 — items that clip need a hover state

### Census — clip sites with NO reveal affordance (no `title`, no tooltip)

`truncate` appears 19× across the custom tree. Pairing each file's `truncate` count with its
`title=`/`Tooltip` count:

| File | truncate | title/tooltip | gap? |
|---|---|---|---|
| `palette-browser/AdminNamesPanel.vue` | 4 | 0 | **YES** |
| `palette-browser/AdminFlaggedPanel.vue` | 3 | 0 | **YES** |
| `palette-browser/AdminColorQueue.vue` | 2 | 0 | **YES** |
| `palette-browser/VersionHistoryDrawer.vue` | 1 | 0 | **YES** |
| `palette-browser/TagEditPopover.vue` | 1 | 0 | **YES** |
| `palette-browser/SearchFilterBar.vue` | 1 | 0 | **YES** |
| `palette-browser/PaletteCardSwatches.vue` | 1 | 0 | **YES** |
| `palette-browser/PaletteCardMenu.vue` | 1 | 0 | **YES** |
| `palette-browser/MiniColorPicker.vue` | 1 | 0 | **YES** |
| `palette-browser/AdminAuditPanel.vue` | 1 | 0 | **YES** |
| `palette-browser/AdminUsersPanel.vue` | 1 | 1 | partial |
| `mix/MixSourceSelector.vue` | 1 | 2 | covered |
| `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` | 1 | 3 | covered |

The most-visible clip — `PaletteCard.vue:34–36` — has a **native `:title="palette.name"`** but NOT a
hover STATE: U29 wants a designed reveal (expand / glass tooltip), not the OS title bubble. So even
the "covered" sites use the native `title` tooltip, which is the wrong idiom per the audit.

### Fix direction
A glass-ui-first "clipped-text reveal" idiom: a `truncate`-wrapper component (or directive) that
detects overflow (`scrollWidth > clientWidth`) and exposes the full text on hover/focus via a glass
`Tooltip` — applied uniformly to the 13 gap sites and retrofitting the native-`title` sites onto the
glass tooltip. Couples to U7/U8 (dropdown item sizing/bounding) since clipped dropdown items are the
densest cluster. Owner: glass-ui (the overflow-tooltip primitive) + demo (apply it).

---

## Ownership rollup for the re-divined waves

| Finding | Primary owner | Severity | Note |
|---|---|---|---|
| U28 size-token no-op | **glass-ui build** (or demo `@source`) | HIGH / P9-class | blocks "sliders bigger" (U32) too; sweep ALL glass-ui CVA arbitrary utilities |
| U15 spectrum consumption | demo migration | MED | primitive exists; delete `ComponentSliders` raw-reka + duplicate touch-gate stack |
| U14 letter↔slider centering | demo (`ComponentSliders.vue`) | MED | grid re-model; couples U13/U2/U31 |
| U20a skeletons black | demo (re-author onto glass-ui `Skeleton`) | MED | primitive exists; `PaletteCardSkeleton.vue` |
| U20b spectrum slider face | demo + glass-ui spectrum variant | MED | feed real `--slider-track-bg` gradient |
| U21 pills not centered | **glass-ui** (`SegmentedTabs`/`TabsIndicator`) | LOW–MED | demo side correct |
| U29 clipped hover | glass-ui (overflow-tooltip idiom) + demo (13 sites) | MED | retire native `title`s |

**Cross-repo asks authored for tranche BA (glass-ui):** (1) make the slider `size` axis ship as real
CSS; (2) center the `SegmentedTabs` pill indicator; (3) an overflow-aware clipped-text reveal idiom.
All three are primitives the demo then merely consumes.

### Evidence files
- `docs/tranches/N/audit/lanes2/shots/U-CONTROLS-sliders-full.png` — ComponentSliders, letters high vs tracks
- `docs/tranches/N/audit/lanes2/shots/U-CONTROLS-gradient-direction-thin.png` — 6px standard slider
- `docs/tranches/N/audit/lanes2/shots/U-CONTROLS-gradient-view.png` — viewport-contention capture
- user shots: u10 (U14/U15/U28), u16 (U20), u17 (U21), u24/u25 (U28/U29)
