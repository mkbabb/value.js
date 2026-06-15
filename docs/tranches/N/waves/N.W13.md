# N.W13 — CONTROLS (sliders · dropdowns · rail · pills · clip · a11y) — the picker's control surface made first-class · the raw-reka slider fork deleted onto the glass-ui spectrum primitive · the channel letters centered by construction · the focus ring made to PAINT · the `[data-size]` interim that DIES at the BA cut

**Name**: W13 — CONTROLS (sliders · dropdowns · rail · pills · clip · a11y)
**Opens after**: N.W10 (the gate-opener — the desktop must RENDER before a control-density gate is honest) **and** N.W12.A/B (the font root + the accent axis — the rail letters lift to a display rung that is invisible in Times, and the focus ring is the live accent that is ink until `--primary` is re-pointed). Runs in **Round R3** (`EXECUTION-ORCHESTRATION.md §2`), file-adjacent-but-separable beside W14/W15/W16/W17.
**Agents**: 4 parallel-capable lanes — **A** sliders+rail (`ComponentSliders.vue` + `ConfigSliderPane.vue`) · **B** dropdowns (`ColorSpaceSelector.vue` + `DockViewSelect.vue`) · **C** pills+clip (`PaneSegmentedControl.vue` + the 13 truncate sites) · **D** the a11y cluster (`ActionButton.vue` + `GradientStopEditor.vue` + the app-wide `@layer base` focus rule). A and D both touch the slider thumbs / the rail tap-targets → **A and D sequence** (see §Hand-off Disjointness); B and C are file-disjoint from each other and from A/D.
**Hard gate**: ONE slider codebase (the raw-reka fork deleted); the thumb paints the live color; letter↔track centers within ±1 px; the pill is vertically centered; the focus ring PAINTS (computed `outline-style: solid`, ≥3:1) on every keyboard-reachable control; zero nameless visible buttons; `ComponentSliders.vue` ≤ 400 LoC.
**Status**: RATIFIED (WAVES-2 second block ratified 2026-06-15; this wave dispatches on the run-plan's R3, after R1=W10 and R2=W12.A/B).

---

## §Goal criterion

W13 succeeds when the value.js color picker's **control surface tells the truth on contact and admits every input modality**: a user has ONE slider — the glass-ui `spectrum` primitive carrying a real gradient track, its thumb wearing the live color — not a hand-rolled raw-reka fork that re-implements (badly) the touch-gating the primitive already solves; the channel letters sit *exactly* on the tracks they name (no 9–12 px growing drift); the slider rail reads as one encapsulated instrument (a glass veil capsule), not naked floating buttons; the colour-space dropdown is a teaching surface (a specimen row per space) that bounds itself to the viewport and scrolls within instead of clipping off-screen; the segmented pill is vertically centered; clipped text reveals itself on hover/focus through a designed affordance, not the OS title bubble; and — the WCAG floor — **the focus ring actually paints** on every keyboard-reachable control (it paints on exactly one control in the entire app today), no visible button is nameless, and the gradient-stop handles are operable by keyboard, not pointer-only.

The honest split: the **primitives EXIST** (the glass-ui `Slider` ships a `spectrum` variant "built for the value.js color-picker reference EXACTLY" — U-CONTROLS §TL;DR) — so the demo's job is *consumption + composition*, not a net-new primitive — but two glass-ui **build defects** (the dead size-axis P9 bug; the unbounded `SelectContent`) are FILED producer asks that this wave carries **`[data-*]` interims** for. Those interims **DIE at W18** when the BA cut lands the real producer fix. This wave does the consumer's correct seam NOW; it never vendors or patches glass-ui's dist.

Paired with the §Hard gate below (the completion criterion). A wave whose gates pass but whose goal — "one slider, centered letters, a painting focus ring, every input modality" — is unmet closes `complete_with_misses`, with the named successor being W18 (the producer-fix consume) for the deliberately-deferred axes (the real slider size CSS, the first-class Select bound).

---

## §Provenance (the audit lanes + the file:line roots this wave consumes)

The canon is `audit/user-audit-2026-06-12/LEDGER.md` (U1–U33, OUTRANKS all prior claims) → the lanes2 corpus (`U-CONTROLS` · `D1` · `D7` · `D8` · `U-cards` · `U-DROPDOWN` · `X-GU`) → `WAVES-2.md §N.W13` (lanes A–D) → `N.md`. Every lane below is a row on the WAVES-2 §N.W13 board and appears EXACTLY ONCE in the `WAVES-2.md §5` coverage map under W13.

### Lane A — sliders + rail (the spectrum consume · the live thumb · the veil capsule · centering by construction)

- **U15 — "Sliders must be FIRST CLASS in glass-ui"** (LEDGER §E, `LEDGER.md:48`). **~80 % already satisfied** (`U-CONTROLS §TL;DR.1`): `Slider` is a first-class glass-ui primitive (`../glass-ui/src/components/ui/slider/Slider.vue`, re-exported `demo/@/components/ui/slider/index.ts:1`), with `standard`/`spectrum` variants + `sm`/`md`/`lg` sizes via the `sliderVariants` CVA. The ask is **consumption**, not authorship. **WAVES-2 §N.W13 Lane A.** (`X-GU §U15`: COVERED-already-shipped; the spectrum-behind-glass slot is the LOW-priority `X-GU-E1` consider-ask — value.js composes it demo-side.)
- **U20b — "the slider = a glass slider, but SPECTRUM glass"** (LEDGER §E, `LEDGER.md:50`). The spectrum HALF of U20 (the skeleton half is W14.C). Two sub-defects (`U-CONTROLS §U20.b`): (i) `ComponentSliders.vue:75-106` hand-rolls raw reka with a *correct* gradient but the wrong chrome (not the glass spectrum face); (ii) `ConfigSliderPane.vue:139` sets `variant="spectrum"` but supplies **no `--slider-track-bg`** → a flat `var(--secondary)` track (a spectrum slider with no spectrum). Both converge on the glass-ui spectrum variant fed a real gradient. **WAVES-2 §N.W13 Lane A.**
- **The thumb live-color — `D1 §5` / the W6.C carry** (`K2-D1`, `WAVES-2.md §6`: "thumb live-color (the W6.C carry, D1 §5) → W13.A clause + gate token"). NOT implied by the consume — the primitive's spectrum thumb is a *size* mechanism only (`U-CONTROLS §U28` thin-thumb hazard, `Slider.vue:333-344`). The demo must make the thumb *carry the current colour* as a painted face. **WAVES-2 §N.W13 Lane A.**
- **The 418-LoC decompose — `R4-2`** (`WAVES-2.md §5` R4 row: "R4-2 LoC breach → W13.A"). `ComponentSliders.vue` is **418 LoC today** (count-exact, proven below) — over the 400-LoC ceiling. The decompose is *served by* the spectrum migration: deleting the 189-LoC raw-reka duplicate touch-gate stack (`U-CONTROLS §U15`) lands it under 400 by construction. **WAVES-2 §N.W13 Lane A.**
- **U14 — "The channel letters must center EXACTLY with the sliders they affect"** (LEDGER §E, `LEDGER.md:51`). Quantified by `U-CONTROLS §U14` (letters 9–12 px ABOVE track centers, drift GROWING down the rail) and re-measured by `D8` (`D8.md:222`: centers 616.7/664.4/712.1/759.8 vs thumbs 625.6/674.3/722.9/771.6 = 8.9–11.8 px). Root: the `grid grid-cols-[auto_1fr] … items-center` (`:4`) with a rail column spanning all rows on `justify-around` (`:13-14`) while each slider row carries a caption ABOVE its track (`:49-51`). **WAVES-2 §N.W13 Lane A.**
- **U13 — "The color-space component section used to sit in a hairline dock/veil ELLIPSE card — regression"** (LEDGER §E, `LEDGER.md:52`). Adjudicated by `U-cards §2` + `D1 §5`: it is a **design RE-INTRODUCTION, not a regression-restore** — the remembered "ellipse" was the satellite-orbit ghost ring of the deleted flat-HSV blob fork (`U-cards §2`: "no `veil`/`ellipse` string ever in the demo source"); the pre-N.W1 rail was a vertical expanded `GlassCarousel` whose pill-capsule glass chrome WAS the "hairline veil" (`D1 §5`, `git show 6cfded5`); N.W1.A rightly killed the carousel category-error but threw away the material. Restore the veil WITHOUT resurrecting the carousel. **WAVES-2 §N.W13 Lane A.**
- **U28 interim — "Slider too thin" (the dead size-axis, P9-class)** (LEDGER §E, `LEDGER.md:49`). ROOT CAUSE (`U-CONTROLS §U28`, HIGH severity): the glass-ui slider's `size` axis silently no-ops — every `standard` slider renders at the **6 px (.375rem) fallback** because the `[--slider-track-height:1.25rem]` CVA arbitrary-property utility ships only in the unscanned dist JS bundle, never compiled into any CSS the demo loads (the Tailwind-v4 dep-utility-scan gap = the constellation P9). The producer fix is FILED (`X-GU-E2` track-thickness token; WAVES-2 short label A-3); the W13 **interim** is `[data-size]` scoped CSS — the pattern `Slider.vue:150-154` already proves — landing tracks at 28 px lg. **The interim DIES at W18.** **WAVES-2 §N.W13 Lane A interim; coverage map `:345` "U28 → W13.A interim (real fix → W18.A)".**

### Lane B — dropdowns (the audacious trigger · the specimen-row menu · the bound interim · the jerk re-verify)

- **U7 — "Dropdown items must be the SAME scaled font-size as the select trigger"** (LEDGER §D, `LEDGER.md:39`). Demo half: drop the bespoke `text-title sm:text-display` trigger override (a measured cascade no-op — `D1.md:31`: 32.9 px ≠ 41.9 px expected) → ONE `text-display-2` rung; the family `--dropdown-text` lever (the glass-ui font-rung PROP) is the FILED `WO-3` producer ask. **WAVES-2 §N.W13 Lane B; coverage map `:347` "U7 → W13.B demo half (font-rung prop → W18.A)".**
- **U8 interim — "Dropdowns must BOUND themselves on the page + scroll within — FIRST-CLASS in glass-ui; study the keyframes.js easing-curve picker mechanism"** (LEDGER §D, `LEDGER.md:40`). The glass-ui Select content clips off-viewport (`D1.md:37`, `u-type-02-space-dropdown-open.png`); the producer fix is FILED as `X-GU-D2` (HIGH — a first-class collision-and-scroll contract; the keyframes.js easing-picker `max-h-[var(--easing-dropdown-max-h)]` bounded-scroll is the named reference, `X-GU.md:161`). The W13 **interim** is the kf consumer-cap idiom — a self-scanned `max-h-[min(24rem,60dvh)]` + `overflow-y-auto` on `SelectContent` consumers NOW. **The interim DIES at W18.** **WAVES-2 §N.W13 Lane B interim; coverage map `:348` "U8 → W13.B interim cap (first-class bound → W18.A)".**
- **U23 — "Dropdown open animation jerks"** (LEDGER §D, `LEDGER.md:41`). RE-VERIFY after the bound (the jerk is the zoom over an unbounded 745 px box, downstream of U8). The producer spring-clock refinement rides W18. **WAVES-2 §N.W13 Lane B verify; coverage map `:351` "U23 → W13.B verify (spring-clock → W18.A)".**
- **U30a — "The current color-space dropdown should be more audacious"** (LEDGER §D, `LEDGER.md:42`). The `D1 §3` redesign: trigger → ONE `text-display-2` rung (φ^(5/2), 53.3 px @1440) with an em-scaled chevron (`size-[0.5em]`); the menu → a **specimen row** per space (display-face name NOT mono — kill the group-level `fira-code`; a live per-space conversion line `colorUnit2(color, space).toFormattedString(DIGITS)`; a `WatercolorDot` swatch replacing the 8 px presence dot; glass material at the floating tier). **WAVES-2 §N.W13 Lane B; coverage map `:350` "U30a → W13.B".** (`D1-3`, `D1.md:273`.)

### Lane C — pills + clip

- **U21 — "Pills not centered"** (LEDGER §E, `LEDGER.md:53`). Root caused by `D7-9` (`D7.md:193-199`, live-measured at 390 px): `PaneSegmentedControl.vue:4` ships `pb-2` on the wrapper → the 8 px asymmetric pad shifts the pill 4 px high (SegmentedTabs sits 10.5 px from the dock top, 18.5 px from the bottom; text WITHIN the pill is perfectly centered 3.5/3.5 → **glass-ui is innocent**). **U21 conflict recorded** (`K1-F3`, `WAVES-2.md §6`): `D3 §6`'s font-metrics diagnosis contradicts D7-9's live measurement; **D7's measurement governs** — the X-GU `A-5` ask is demoted to *verify-after-`pb-2`-deletion* (a W-TABS confirm-no-regress acceptance row only; withdraw as a defect claim if the deletion closes U21). **WAVES-2 §N.W13 Lane C; coverage map `:349` "U21 → W13.C".**
- **U29 — "Items that clip need a hover state"** (LEDGER §E, `LEDGER.md:54`). The clipped-text reveal ladder (`U-CONTROLS §U29`: 13 zero-affordance sites with `truncate` and NO `title`/tooltip — censused at `U-CONTROLS.md:236-249`; even the "covered" sites use the wrong OS-title idiom): a `:title` minimum, a glass tooltip at the 13 gap sites, a 2-line budget where the grid affords. The producer overflow-tooltip primitive is the glass-ui ask; W13 applies it. **WAVES-2 §N.W13 Lane C; coverage map `:346` "U29 → W13.C".**

### Lane D — the a11y cluster (D8 — the same files as A/C/D)

- **D8-2 — "Focus indicators never paint — WCAG 2.4.7 fails app-wide" (P0)** (`D8.md:69-102`). Real-Tab traversal found the focus ring paints on **exactly ONE** control in the entire app (`channel-rail-item`, `:80`); every other control computes a transparent ring (the Tailwind `ring-2 ring-ring/40` slot composites to five transparent slots under the glass cascade; `outline-color`/`width` get set without `outline-style` ever flipping to `solid`). Root pattern: `focus-visible:outline-none` suppressors (`ActionButton.vue:14`, confirmed). **WAVES-2 §N.W13 Lane D; coverage map `:382` "D8-2 focus rings P0 → W13.D".**
- **D8-5 — "tap targets (the U32 'less cramped, more accessible' quantified)"** (`D8.md:146-164`). 25 of 26 picker targets sub-48; slider thumbs 12×24 (< 24 width); segmented tabs 22 tall (< 24 height); gradient stops 20×20. The tap-target floor is FUSED into the W12/W13 resizes (the bigger sliders are already user-mandated, U32). **WAVES-2 §N.W13 Lane D (the picker/control slice); the dock half is W17/W12.**
- **D8-4 — "names and labels (WCAG 4.1.2 / 1.3.1 / 3.3.2)"** (`D8.md:132-144`). Nameless icon-only controls (3× compact dock arrows, the `send-btn`, the palettes confirm ✓ and the destructive trash); placeholder-only inputs (slug/token, search); the "My Palettes3" accessible-name concat. The control-surface slice of D8-4 lands here (the picker controls); the browse-pane / heading concat is W16. **WAVES-2 §N.W13 Lane D.**
- **D8-3a — "the gradient-stop keyboard spec"** (`D8.md:107-118`). `GradientStopEditor.vue:107-148` is pointer-only (`@pointerdown/move/up/cancel` + `@dblclick` add + `@contextmenu` remove; the hint line `:147` documents the exclusions); the APG slider pattern (Arrow ±1 %, Shift+Arrow ±10 %, Home/End, Delete, Enter) is **authored ONCE** into the glass-ui slider/easing primitive asks (it must NOT be re-implemented per-consumer). **WAVES-2 §N.W13 Lane D; coverage map `:383` "D8-3a → W13.D".** (D8-3b → W17.E, D8-3c → W12.C — `WAVES-2.md §6 K1-F7`, do not pull them here.)

### The invariant root

- **inv-N-13 (focus-truth, NEW — proposed; see §Design-decisions).** The implied invariant the D8-2 P0 names: *no control may suppress its focus indicator without a painting replacement; a `@layer base :where(:focus-visible)` accent-ring rule is the app-wide floor, and an e2e probe asserts the COMPUTED `outline-style: solid` (≥3:1) on every keyboard-reachable control.* It is the WCAG-2.4.7 sibling of inv-N-11's cascade-truth: a suppressor that greens a contrast lint but computes transparent is the focus-ring equivalent of the unlayered-leak class. (Not in `WAVES-2.md §4`'s enumerated deltas; proposed here and gated by clause (e). The orchestrator ratifies or declines at integration.)

---

## §The state, verified (the absence/defect proven TODAY by command + output — born-RED)

Every claim below was confirmed on `tranche-f-handoff` against the working tree AND, for the substrate P0s, the live built demo (`dist/gh-pages/assets/index-OigTVKLL.css`, 351 661 bytes, built 2026-06-12) on 2026-06-15.

### The slider split + the 418-LoC breach (Lane A) — born-RED on the tree

`ComponentSliders.vue` is **418 LoC** (count-exact — the R4-2 breach):

```
$ wc -l demo/@/components/custom/color-picker/controls/ComponentSliders.vue
     418 demo/@/components/custom/color-picker/controls/ComponentSliders.vue
```

It hand-rolls **raw reka-ui** sliders (NOT the glass-ui primitive):

```
$ grep -nE 'SliderRoot|SliderTrack|SliderThumb|SliderRange' ComponentSliders.vue
59:  <SliderRoot …            91:  <SliderThumb …
75:  <SliderTrack …           106: </SliderRoot>
83:  <SliderRange … />
121: SliderRange, 122: SliderRoot, 123: SliderThumb, 124: SliderTrack,
125: } from "reka-ui";              ← the import is bare reka-ui, bypassing glass-ui entirely
```

and carries its OWN ~189-LoC duplicate touch-gate stack (`:259-344`) that re-implements the glass-ui `Slider`'s native `useTouchGate`/`useDockHold` (`Slider.vue:88-141`):

```
ComponentSliders.vue:259  sliderGates[comp] = useTouchGate();
ComponentSliders.vue:264  // Capture-phase listeners on slider wrappers to intercept reka-ui's pointerdown.
ComponentSliders.vue:266  let listenerCleanups: (() => void)[] = [];   (the hand-built listener stack)
```

Meanwhile the OTHER slider consumers correctly use the glass-ui primitive: `ConfigSliderPane.vue:139` sets `variant="spectrum"`. **The split is the disease** (`U-CONTROLS §U15`): two slider codebases, two looks. Deleting the raw-reka fork + its 189-LoC touch-gate stack lands the file under 400 LoC by construction.

### The spectrum-with-no-spectrum (Lane A) — born-RED on the tree

`ConfigSliderPane.vue:137-141` declares the spectrum variant but never feeds it a track gradient:

```
139:  <Slider
141:    variant="spectrum"          ← spectrum chrome…
       … no :style="{ '--slider-track-bg': … }"  → falls to flat var(--secondary) (Slider.vue:323)
```

A spectrum slider with no spectrum (`U-CONTROLS §U20.b`).

### The U14 centering drift (Lane A) — born-RED on the tree + measured live

The grid mis-models the two columns. The rail (`:11-15`) spans all rows on `justify-around`:

```
ComponentSliders.vue:4   class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center stagger-children"
ComponentSliders.vue:11  class="channel-rail self-stretch flex flex-col items-center justify-around"
ComponentSliders.vue:14  :style="{ gridRow: `1 / ${componentEntries.length + 1}`, gridColumn: '1' }"
```

while each slider ROW carries a caption ABOVE its track, pushing the track below the row's vertical center:

```
ComponentSliders.vue:47  class="min-w-0 flex flex-col gap-0.5"        (the row column)
ComponentSliders.vue:49  <span class="… text-caption italic opacity-50 …">{{ currentColorRanges[component] }}</span>  ← the in-row caption
ComponentSliders.vue:75  <SliderTrack …>                              ← the track, below the caption
```

So the rail centers each letter on the row's FULL height (caption + slider) while the track sits below — letters land high, and because `justify-around` diverges from the per-row track positions, the error ACCUMULATES: the live measurement (`D8.md:222`) is letter centers 616.7/664.4/712.1/759.8 vs thumb centers 625.6/674.3/722.9/771.6 = **−8.9/−9.9/−10.8/−11.8 px**, a monotonic growing drift (`U-CONTROLS §U14`: "−9 → −12 ramp"). The in-row caption duplicates the rail tooltip (`:36` already renders `currentColorRanges[component]`) — it is the only reason row-center ≠ track-center.

### The dead size-axis P9 (Lane A interim) — born-RED on the producer dist

The glass-ui slider primitive ships (`slider-C2iCNOGm.js`), but the `md`/`lg` size utility is **NOT emitted** into any CSS the demo loads:

```
$ grep -c '\[--slider-track-height:1.25rem\]' node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0                                     ← the size token never lands

$ grep -oE 'var\(--slider-track-height[^)]*\)' node_modules/@mkbabb/glass-ui/dist/glass-ui.css | head -1
var(--slider-track-height,.375rem)   ← so every standard slider falls to the 6px (.375rem) floor
```

Every `standard` glass-ui slider renders at **6 px** and the `size` prop is inert (`U-CONTROLS §U28` live measurement: track rendered height = 6 px, `--slider-track-height` var = EMPTY). This is the constellation P9 — "rounded-panel utility silently no-ops in consumers — Tailwind-v4 dep-utility-scan gap." The `[data-size]` scoped-CSS pattern that the W13 interim uses is already proven in the SFC (`Slider.vue:150-154`).

### The non-audacious dropdown (Lane B) — born-RED on the tree

`ColorSpaceSelector.vue:13-37`:

```
17:  class="… text-title sm:text-display tracking-tight … focus:outline-none …"   ← the no-op responsive pair (D1.md:31: 32.9px ≠ 41.9px expected) + a focus suppressor
22:  <SelectGroup class="fira-code">       ← the group-level mono "utility list" feel
30-33: <span class="inline-block w-2 h-2 rounded-full …" :style="{ backgroundColor: … cssColor : 'transparent' }">  ← the 8px presence dot (no WatercolorDot, no per-space conversion line)
```

There is no `--dropdown-text` size-parity lever, no collision-bound, no internal scroll, no per-space specimen conversion — the menu clips off-viewport (`D1.md:37`).

### The pill `pb-2` (Lane C) — born-RED on the tree

`PaneSegmentedControl.vue:4`:

```
4:  class="flex items-center justify-center gap-0 px-4 pb-2"   ← the 8px asymmetric bottom pad
```

D7-9 (`D7.md:193-199`) live-measured the consequence at 390 px: SegmentedTabs sits 10.5 px from the dock top, 18.5 px from the bottom (the pill rides 4 px high); text within the pill is centered 3.5/3.5 (glass-ui innocent).

### The focus ring never paints (Lane D, the P0) — born-RED on the tree

`ActionButton.vue:14` (the canonical suppressor):

```
14:  class="action-button-wrapper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm"
```

`outline-none` suppresses the native ring; the `ring-ring/40` replacement composites to **transparent** under the glass cascade (`D8.md:75`: five fully-transparent box-shadow slots on the Select trigger; `:76` slider thumbs `outline none 1px`; `:77` textboxes `outline none 1px` UA-color). D8's real-Tab traversal found a painting ring on **exactly one** control (`channel-rail-item`, `:80`) — every other keyboard-reachable control is focused-but-ringless. WCAG 2.4.7 fails app-wide.

### The gradient stop is pointer-only + sub-floor (Lane D) — born-RED on the tree

`GradientStopEditor.vue`:

```
107-115:  <div … @pointerdown=… @pointermove=… @pointerup=… @pointercancel=… @dblclick=… >   ← bar add/drag
118-124:  <button … :aria-label="`Gradient stop at ${Math.round(stop.position)}%`"
          class="absolute top-1/2 w-5 h-5 rounded-full … focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring …">   ← w-5 h-5 = 20×20px (< 24 floor); NO @keydown
146-147:  <p class="text-mono-small text-muted-foreground/40"> Double-click to add · Right-click to remove · Drag to reposition </p>  ← the hint line DOCUMENTS the keyboard/touch exclusions
```

A focused stop cannot move (WCAG 2.1.1), reposition is drag-only (WCAG 2.2 §2.5.7, no single-pointer alternative), remove is right-click-only (impossible on keyboard AND touch), handles are 20×20 (< 24, §2.5.8); the stop handle has a `focus-visible:outline-none` suppressor with a transparent `ring-ring` (D8-2 instance) — but is NAMED (good; the `aria-label` is correct).

### The cascade-kill substrate (the W10.D precondition) — born-RED on the LIVE BUILT demo

This wave's gate is honest only because W10.D un-blanks the desktop. Confirmed born-RED on the live built artifact TODAY (the same forensic N.W10.md owns):

```
$ grep -oE '\.hidden\{display:none\}' dist/gh-pages/assets/index-OigTVKLL.css | head -1
.hidden{display:none}                 ← the unlayered rule that defeats the layered lg:flex (char ~288172, 114KB past the last @layer)
$ grep -c 'glass-ui' dist/gh-pages/assets/index-OigTVKLL.css
0                                     ← no glass-ui layer in the built demo
```

W13 does **not** re-fix this — it CONSUMES W10.D's `layer(glass-ui)` import and the COMPUTED `display ≠ none @1440` boot-smoke; this is cited here only to establish the substrate this wave's control-density gate stands on (see §Hand-off).

### A correction recorded: `stagger-children` is NOT a phantom (the WAVES-2 §N.W13.A claim refuted)

The `WAVES-2.md §N.W13.A` text names `stagger-children` (`ComponentSliders.vue:4`) as "the 4th phantom, K2 — defined-or-removed." **This is REFUTED on the tree** (consistent with `K1-F2`'s counter-note, `WAVES-2.md §6 :412`/`:321`):

```
$ grep -rn 'stagger-children' demo/@/styles/
demo/@/styles/animations.css:40:    .stagger-children > * { … }
demo/@/styles/animations.css:43-49:  .stagger-children > *:nth-child(1..n+7) { animation-delay: … }
```

`.stagger-children` IS defined (`animations.css:40-49`; W5.E minted it). So it is **not** an inv-N-7 phantom and is NOT a W13.A item — W13.A keeps the class as-is. The one live phantom (`watercolor-swatch`) is W14.E's, not this wave's. (The WAVES-2 §N.W13.A "defined-or-removed" clause is discharged here as ALREADY-DEFINED, no action.)

---

## §Scope (the four lanes, each at the gestalt seam)

- **A — Sliders + rail (`ComponentSliders.vue:3-15,43-51,75-106,259-344`, `ConfigSliderPane.vue:137-139`).**
  - **The spectrum consume (U15/U20b):** migrate `ComponentSliders` raw-reka → `<Slider variant="spectrum" :style="{ '--slider-track-bg': linear-gradient(…) }">` from the glass-ui primitive, **deleting the 189-LoC duplicate touch-gate stack** (`:259-344`) in favour of the primitive's native `useTouchGate`/`useDockHold`. Feed `ConfigSliderPane.vue:139` the real `--slider-track-bg` gradient so its spectrum variant shows a spectrum.
  - **The thumb live-color (D1 §5 / W6.C carry):** the migrated spectrum thumb CARRIES the current colour as a painted face (NOT implied by the consume — the primitive's thumb is a size mechanism only). A named gate token (clause b) asserts the thumb's computed background tracks the live colour.
  - **The 418→≤400 decompose (R4-2):** the raw-reka + touch-gate deletion lands the file under 400 LoC by construction; if it does not, extract the per-channel row into a child component — do NOT pad-or-stub to hit the number.
  - **U14 centering by construction:** delete the in-row range caption (`:49-51` — it duplicates the rail tooltip at `:36`); make the letters per-row grid items (`grid-row: i+1; grid-column: 1; place-self: center`) instead of a `justify-around` column → centering is exact for 3/4/5 channels at any track height (`D1 §5.U14` / `U-CONTROLS §U14`). Letters lift to `text-heading` (the display rung that needs W12.A's font root).
  - **U13 the veil capsule (re-introduction, NOT restore):** wrap the rail in glass-ui's `veil-surface` / `Card surface="veil"` with `border-radius: var(--radius-pill)` (the hairline glass capsule, spanning `grid-row: 1 / -1` behind the letters) — `--veil-border` a hairline `color-mix(--foreground 12%, transparent)`, never the black line U26 condemns (`U-cards §2` / `D1 §5.U13`). The carousel is NOT resurrected; the tablist semantics carry over untouched.
  - **U28 interim:** `[data-size]` scoped CSS (the `Slider.vue:150-154` pattern) lands tracks at **28 px lg** until the BA producer fix (`X-GU-E2`). **This interim is tagged to die at W18.**
  - **WHY here:** the slider IS the picker's control surface — the split fork, the dead size, the drifting letters, and the naked rail are ONE control-quality cluster; the controls wave owns them as one consume.

- **B — Dropdowns (`ColorSpaceSelector.vue:13-37`, `DockViewSelect.vue:54`).**
  - **U7 demo half:** replace `text-title sm:text-display` (`:17`) with ONE `text-display-2` rung (the responsive pair is a measured cascade no-op); ride the family `--dropdown-text` lever where it exists (the font-rung PROP is the FILED `WO-3` producer ask, consumed at W18).
  - **U8 interim:** a self-scanned `max-h-[min(24rem,60dvh)]` + `overflow-y-auto` on `SelectContent` consumers NOW (the kf easing-picker consumer-cap idiom). **This interim is tagged to die at W18** when `X-GU-D2` (the first-class collision-and-scroll contract) lands.
  - **U30a / D1-3 specimen-row menu:** trigger → `text-display-2` + em-scaled chevron (`size-[0.5em]`); menu → a specimen row per space (display-face name NOT mono — kill the group `fira-code` `:22`; a live `colorUnit2(color, space).toFormattedString(DIGITS)` conversion line; a `WatercolorDot` swatch replacing the 8 px dot `:30-33`; glass floating-tier material). Needs `COLOR_MODEL_KEY` injection for the per-space conversion.
  - **U23 re-verify:** confirm the open-animation jerk is gone after the bound (it was the zoom over the unbounded box); the producer spring-clock refinement rides W18.
  - **WHY here:** the dropdown is the picker's other control — the trigger-vs-item parity (U7), the bound (U8), and the teaching specimen menu (U30a) are one dropdown gestalt.

- **C — Pills + clip (`panes/PaneSegmentedControl.vue:4`, the 13 truncate sites).**
  - **U21:** delete `pb-2` (`:4`) — the asymmetric pad shifts the pill 4 px high (D7-9 measured; glass-ui innocent). The X-GU `A-5` ask is demoted to verify-after-deletion (withdraw the defect claim if the deletion closes U21).
  - **U29:** the clipped-text reveal ladder — a `:title` minimum, a glass tooltip at the 13 zero-affordance sites (`U-CONTROLS §U29` census), a 2-line budget where the grid affords; retrofit the wrong-idiom native-`title` sites onto the glass tooltip.
  - **WHY here:** the segmented pill and the truncation affordances are the picker's discrete-choice + overflow controls — the small-but-visible polish class the user named directly (U21, U29).

- **D — The a11y cluster (`ActionButton.vue:14`, `GradientStopEditor.vue:107-148`, + the app-wide `@layer base` rule).**
  - **D8-2 focus rings (P0):** ONE `@layer base :where(:focus-visible) { outline: 3px solid var(--ring, oklch(.62 .27 9.8)); outline-offset: 2px }` rule (the accent ring IS the house language — a purposeful colourful pop) + a sweep of EVERY `focus-visible:outline-none`/`outline:none` suppressor (`ActionButton.vue:14` et al.): each must consume the glass-ui `--focus-ring-shadow` OR fall through to the base outline; none may suppress with no replacement.
  - **D8-5 tap-target floor (fused into the resizes):** slider rows ≥ 44 px hit (thumb ≥ 24 visual via the U28 28 px-lg track + padding); gradient stops ≥ 24 visual / ≥ 44 hit; segmented tabs ≥ 32 tall — the φ ladder (W12.E) supplies the 8 px+ adjacency.
  - **D8-4 names/labels (control slice):** `aria-label` every nameless icon-only control in the picker control surface (the lucide icon name is the spec).
  - **D8-3a gradient-stop keyboard:** the APG slider pattern (Arrow ±1 %, Shift+Arrow ±10 %, Home/End, Delete, Enter) on `GradientStopEditor.vue` handles, authored ONCE into the glass-ui slider/easing primitive ask (NOT per-consumer); the hint line (`:147`) rewritten to name the keyboard affordances.
  - **WHY here:** the a11y cluster touches the SAME control surfaces as A/C (the slider thumbs, the stop handles, the action buttons) — running it as a separate wave would double-write those files; fusing the focus/tap/name/keyboard fixes into the controls wave is the disjoint-write discipline.

### Triumvirate dispatch

A triumvirate (research + plan augment + redress) is mandatory, not optional, on:
- **File-bound expansion that would invalidate the wave:** if the spectrum consume cannot delete the raw-reka touch-gate stack because the glass-ui primitive's native gate proves insufficient for the picker's dock-keep-open hold (a producer gap U-CONTROLS did not anticipate), the scope expands into a glass-ui producer change — that is a cross-repo expansion and triggers the triumvirate (a new X-GU register, NOT a re-vendored touch-gate in the demo).
- **Hard-gate failures not local-edit-recoverable:** if the focus ring stays computed-transparent after the `@layer base` rule + the suppressor sweep (a third cascade source beats the base outline), halt and triumvirate — do NOT add `!important` to the focus rule (the forbidden workaround); the cure is finding the third suppressor, not out-shouting it.
- **The third iteration of a diagnostic loop:** if the U14 centering oscillates (the per-row grid model still drifts because a third box — e.g. the hidden alpha row's zero-box — perturbs the row count), halt and triumvirate the grid model against the measured 3/4/5-channel row counts rather than nudging margins a fourth time.

---

## §Hard gate (FALSIFIABLE · born-RED on the named defect tree TODAY · P6 posture per clause)

The oracle drives the **real built demo** (`dist/gh-pages/`, on the W10.D-cured substrate) and reads the **computed** truth, never the emitted class. The wave's GREEN depends on the CORRECTNESS clauses (a)–(g); the appearance/taste verdicts (the veil capsule's *beauty*, the specimen menu's *audacity*, the dropdown jerk's *feel*) close on the user's review packet (the TASTE boundary), never on green. **For this consume/repair wave the born-RED is the DEFECT-PRESENT sense** (every clause reds on a live defect in the current tree/built artifact), EXCEPT clauses anchored on the producer asks (U28/U8), whose interims are CAPABILITY-PRESENT-NOW gates whose *retirement* is witnessed at W18.

- **clause (a) — ONE slider codebase (the raw-reka fork DELETED; CORRECTNESS, source-shape + runtime).** After the wave, `grep -nE 'from "reka-ui"' demo/@/components/custom/color-picker/controls/ComponentSliders.vue` returns **0** (the bare `SliderRoot`/`Track`/`Thumb`/`Range` import is gone), the file imports the glass-ui `Slider`, and the duplicate touch-gate stack (`:259-344` `useTouchGate` + the capture-phase listener stack) is absent; `wc -l ComponentSliders.vue` ≤ **400**. **BORN-RED WITNESS:** TODAY `:125 } from "reka-ui";` is present, the `useTouchGate` stack lives at `:259`, and `wc -l` = **418** (proven above). **BITE:** reds on the pre-cure tree (reka import present, 418 LoC); greens on the spectrum consume + decompose. **NO escape:** the LoC assert is paired with the import-grep — a file padded to 400 by deleting comments while keeping the reka fork fails clause (a)'s import half. **P6:** source-shape facts (grep, wc) are device-independent → hard-gates on the runner. *Closes U15 (consume) / U20b / R4-2.*

- **clause (b) — the thumb PAINTS the live color (D1 §5 / the W6.C carry; CORRECTNESS, runtime).** On the built demo, dragging a channel slider and reading `getComputedStyle(thumb).backgroundColor` (or the thumb's painted face) returns a colour that **tracks the current model colour** (changes as the colour changes; equals the resolved `cssColor` within a small ΔE), not a static chrome. **BORN-RED WITNESS:** TODAY the raw-reka thumb (`ComponentSliders.vue:91`) is hand-class chrome (`w-3 rounded-full`) with no live-colour binding, and the glass-ui spectrum thumb is a size mechanism only (`Slider.vue:333-344`) → the thumb does not carry the colour → the clause reds. **BITE:** reds pre-cure (static thumb); greens once the thumb's face is bound to the live colour. **NO escape:** the assert reads the COMPUTED thumb paint under a colour change, not a prop or a class name. **P6:** computed-style under a deterministic colour-set → device-independent.

- **clause (c) — letter↔track centers within ±1 px (U14; CORRECTNESS, computed geometry).** On the built demo at 1440 px, for every channel row, `|letterCenterY − trackCenterY| ≤ 1` px (read from `getBoundingClientRect()` of the rail letter and the slider track). **BORN-RED WITNESS:** TODAY the live measurement (`D8.md:222`) is −8.9/−9.9/−10.8/−11.8 px, a growing drift (the `justify-around` rail over caption-bearing rows) → the clause reds at every row. **BITE:** reds pre-cure (the 9–12 px ramp); greens on the per-row-grid-cell + caption-deletion re-model (centering exact by construction). **NO escape:** the assert reads the COMPUTED rect centers of the real DOM nodes, not a CSS class. **P6:** `getBoundingClientRect` centers at a fixed viewport are device-independent (layout is deterministic) → hard-gates on the runner. *Closes U14.*

- **clause (d) — the pill is vertically centered (U21; CORRECTNESS, computed geometry).** On the built demo, the segmented pill's top and bottom gaps within its wrapper are equal within ±1 px (`|gapTop − gapBottom| ≤ 1`). **BORN-RED WITNESS:** TODAY `PaneSegmentedControl.vue:4` carries `pb-2` → D7-9 measured 10.5 px top / 18.5 px bottom (the pill 4 px high) → the clause reds. **BITE:** reds pre-cure (asymmetric gap); greens on the `pb-2` deletion. **NO escape:** the assert reads the computed top/bottom gaps, not the presence of `items-center`. **P6:** computed geometry → device-independent. *Closes U21; the X-GU A-5 ask is withdrawn-on-green (verify-after-`pb-2`).*

- **clause (e) — the focus ring PAINTS on every keyboard-reachable control (D8-2; CORRECTNESS, the WCAG floor).** A real-Tab e2e traversal of the picker control surface: for every focusable control, on `:focus-visible`, `getComputedStyle(el).outlineStyle === "solid"` (or a non-transparent `box-shadow` ring) with a measured ≥ 3:1 contrast against adjacent pixels; ZERO controls focused-but-ringless. **BORN-RED WITNESS:** TODAY the traversal (`D8.md:74-80`) finds a painting ring on exactly ONE control (`channel-rail-item`) — the Select trigger, the slider thumbs, the textboxes, the action buttons all compute transparent rings (`outline-none` + a `ring-ring/40` that composites to five transparent slots) → the clause reds (N−1 ringless controls). **BITE:** reds pre-cure (one painting ring); greens on the `@layer base :where(:focus-visible)` rule + the suppressor sweep. **NO escape:** the assert reads the COMPUTED `outlineStyle`/`box-shadow` under real focus, NOT the presence of a `focus-visible:ring-*` class (the class is present TODAY and computes transparent — the focus-ring twin of the emission-probe vacuity). **P6:** computed-style under deterministic keyboard focus → device-independent; hard-gates on the runner. *Closes D8-2 / inv-N-13 (proposed).*

- **clause (f) — zero nameless visible buttons (D8-4; CORRECTNESS, a11y-tree).** The unnamed-control e2e: zero `button:visible` in the picker control surface without an accessible name (`aria-label`/text content). **BORN-RED WITNESS:** TODAY the compact dock arrows ×3, `send-btn`, the palettes confirm ✓ + trash are nameless (`D8.md:136`) → the clause reds. **BITE:** reds pre-cure (≥ N nameless buttons); greens once each is `aria-label`led. **NO escape:** the assert reads the accessible name from the a11y tree, not the presence of an icon. **P6:** a11y-tree facts are device-independent. *Closes D8-4 (control slice).*

- **clause (g) — the gradient stop is keyboard-operable + ≥ 24 px (D8-3a/D8-5; CORRECTNESS, runtime + geometry).** On the built demo, a focused gradient-stop handle moves on Arrow (±1 %), jumps on Shift+Arrow (±10 %), goes to 0/100 % on Home/End, and removes on Delete — verified by reading the stop's position after each keypress; the handle's visual box is ≥ 24×24 px. **BORN-RED WITNESS:** TODAY `GradientStopEditor.vue:107-124` is pointer-only (no `@keydown`; the hint line `:147` documents the keyboard/touch exclusions) and the handle is `w-5 h-5` = 20×20 (< 24) → the clause reds (a focused stop cannot move; the handle is sub-floor). **BITE:** reds pre-cure (no keyboard response, 20 px); greens once the APG handlers + the ≥ 24 px sizing land. **NO escape:** the assert reads the stop position after a real keypress, not the presence of a handler binding. **P6:** keyboard-event → position-read is deterministic; geometry is computed → device-independent. *Closes D8-3a (demo half) / D8-5 (stop slice).*

- **The interim-retirement gates (witnessed at W18, NOT at W13 close):**
  - **U28 (the slider size axis):** at W13 the `[data-size]` interim lands a **28 px lg** track (`getComputedStyle(track).height ≈ 28px` at `size="lg"`); the BORN-RED here is CAPABILITY-ABSENT — `grep -c '[--slider-track-height:1.25rem]' glass-ui.css` = **0** TODAY (proven above), so the producer real-CSS fix is absent. The RETIREMENT gate (W18): after the BA cut emits the real size CSS, the `[data-size]` interim block is DELETED from the demo and the track still measures ≥ 28 px lg from the producer's own rule. W13's gate asserts the interim WORKS (28 px lg); W18's gate asserts it can be REMOVED.
  - **U8 (the Select bound):** at W13 the `max-h-[min(24rem,60dvh)]` cap clamps `SelectContent` to the viewport (`getComputedStyle(content).maxHeight` resolves to a bounded value; the content scrolls within); the BORN-RED is CAPABILITY-ABSENT — `X-GU.md:51` "the grep across all 30 BA waves returns ZERO for collision/bound-on-page/scroll-within." The RETIREMENT gate (W18): after `X-GU-D2`'s first-class contract lands, the consumer cap is DELETED and the producer bounds the content.

**The §spine bar — MUST bite.** Clauses (a)–(g) are the control-truth oracle. Restore the reka import → (a) reds (the fork is back, LoC > 400). Unbind the thumb face → (b) reds (static thumb). Restore the `justify-around` rail + the in-row caption → (c) reds (the 9–12 px ramp). Restore `pb-2` → (d) reds (asymmetric pill). Restore the `focus-visible:outline-none` suppressors → (e) reds (ringless). Strip the `aria-label`s → (f) reds (nameless). Strip the APG handlers → (g) reds (pointer-only). The born-RED witnesses are CONCRETE and were captured TODAY (the `reka-ui` import + 418 LoC; the −8.9…−11.8 px drift measurement; the `pb-2`; the `outline-none` suppressor; the nameless-button census; the pointer-only stop). **P6 posture (declared):** ALL of (a)–(g) are device-independent (source-shape grep/wc, computed style/geometry, a11y-tree, deterministic keyboard) and hard-gate on the Linux runner — there is NO renderer-coupling in this wave (it is control geometry + a11y, not GPU motion); the only device-class note is that the built-demo capture must run on the W10.D-cured substrate (else the desktop is blank and the picker controls do not lay out — the precondition, not a P6 exception).

---

## §No-workaround prohibitions (BINDING — the named forbidden shortcuts for THIS wave)

- **NO keeping the raw-reka slider fork "for the touch-gate."** The whole point of the spectrum consume is that the glass-ui `Slider` ALREADY solves the reka forwardRef pointer-capture leak, the touch scroll-vs-drag arbitration, and the dock-keep-open hold (`Slider.vue:54-141`) — `ComponentSliders` re-implements them badly across 189 LoC. The cure is to DELETE the fork and consume the primitive's native gate, not to keep both and "wire them together." (inv-N-4: no bespoke design-system facility in demo/.)
- **NO padding/comment-stripping `ComponentSliders.vue` to hit ≤ 400 LoC.** The LoC ceiling is a SYMPTOM gate — it is satisfied by deleting the raw-reka + touch-gate duplication (the real decompose), not by cosmetic line-golf that keeps the fork. Clause (a) pairs the LoC assert with the reka-import grep precisely to forbid this.
- **NO `!important` / specificity-hack on the focus rule to out-shout a suppressor.** The focus ring paints because the `focus-visible:outline-none` suppressors are SWEPT (each consumes `--focus-ring-shadow` or falls through to the base outline) — not because a higher-specificity rule out-shouts them. A third suppressor that survives the sweep is a triumvirate condition, not a `!important` target. (inv-N-13 proposed: no control suppresses its focus indicator without a painting replacement.)
- **NO native OS `title` as the U29 reveal idiom.** The audit is explicit (`U-CONTROLS §U29`: even the "covered" sites use the wrong native-`title` idiom): the reveal is a DESIGNED glass tooltip / expand, overflow-detected (`scrollWidth > clientWidth`), not the OS bubble. Retrofit the existing native-`title` sites onto the glass affordance; do not add more native `title`s.
- **NO vendoring or `@source`-globbing glass-ui's dist for the size axis.** The U28 interim is `[data-size]` scoped CSS in the DEMO's own composition (the pattern `Slider.vue:150-154` proves) — NOT `@source "../../../node_modules/@mkbabb/glass-ui/dist/**/*.js"` (the fragile path/lockfile-dependent option U-CONTROLS §U28 explicitly ranks below the structural fix). The real fix is the producer's (`X-GU-E2`); the interim never reaches into glass-ui's dist.
- **NO leaving the U28 / U8 interims un-tagged-for-death.** Both interims (`[data-size]` slider sizing; the `max-h` Select cap) carry an explicit DIES-AT-W18 marker in-code and in the abrogation ledger — they are not "good enough, leave them." A green W13 that ships an untagged interim is a `complete_with_misses`, not a `complete` (the named successor is W18). (The no-legacy-beside-its-replacement edict: when the producer fix lands, the interim is DELETED, not left as a redundant second path.)
- **NO re-litigating `stagger-children` as a phantom.** It is DEFINED (`animations.css:40-49`, proven above; `K1-F2` counter-note) — the `WAVES-2.md §N.W13.A` "4th phantom" framing is refuted on the tree. W13.A keeps the class; it does not "mint or remove" it. (Recording the absence-of-defect IS the inv-ε discipline — do not invent work the tree disproves.)
- **NO authoring the gradient-stop keyboard spec per-consumer.** The APG slider pattern (D8-3a) is authored ONCE into the glass-ui slider/easing primitive ask (`X-GU-H1`/the slider keyboard contract) — the demo's `GradientStopEditor` consumes it; it is NOT copy-pasted into every slider-like control. (The cross-repo idiom: the keyboard contract is a producer primitive, the demo a consumer.)

---

## §Folds (the rows this wave discharges — each citing its audit lane + finding-id)

| Row | Finding-id / lane | Disposition in this wave |
|---|---|---|
| **U15** | LEDGER §E `:48`; `U-CONTROLS §U15`; `X-GU §U15` | Lane A — consume the glass-ui `Slider` `spectrum` variant (the primitive EXISTS, ~80 % satisfied); delete the raw-reka fork + the 189-LoC touch-gate stack. `WAVES-2.md §5 :343`: "U15 → W13.A (consumption; primitive exists)". |
| **U20b** | LEDGER §E `:50`; `U-CONTROLS §U20.b` | Lane A — the spectrum HALF of U20 (skeleton half = W14.C); feed `ConfigSliderPane.vue:139` a real `--slider-track-bg`. `WAVES-2.md §5 :348`: "U20 → … spectrum-slider half = W13.A". |
| **Thumb live-color** | `D1 §5`; `K2-D1` (`WAVES-2.md §6`) | Lane A — the spectrum thumb carries the live colour (the W6.C carry; NOT implied by the consume). Clause (b) + a gate token. |
| **R4-2 (418-LoC breach)** | `R4` (`WAVES-2.md §5 :386`) | Lane A — the raw-reka + touch-gate deletion lands ≤ 400 by construction. `WAVES-2.md §5 :386`: "R4-2 LoC breach → W13.A". |
| **U14** | LEDGER §E `:51`; `U-CONTROLS §U14`; `D8.md:222`; `D1 §5.U14` | Lane A — centering by construction (per-row grid cells + caption deletion); the −8.9…−11.8 px drift dies. `WAVES-2.md §5 :341`: "U14 → W13.A". |
| **U13** | LEDGER §E `:52`; `U-cards §2`; `D1 §5.U13` | Lane A — the veil capsule re-INTRODUCED idiomatically (`Card surface="veil"` + `radius-pill`), NOT a regression-restore (the "ellipse" was the deleted blob orbit). `WAVES-2.md §5 :341`: "U13 → W13.A". |
| **U28 (interim)** | LEDGER §E `:49`; `U-CONTROLS §U28`; `X-GU-E2` | Lane A interim — `[data-size]` scoped CSS, 28 px lg; the real producer fix is `X-GU-E2`, consumed at W18 (the interim DIES). `WAVES-2.md §5 :345`: "U28 → W13.A interim (real fix → W18.A)". |
| **U7** | LEDGER §D `:39`; `D1.md:31,272`; `U-DROPDOWN` | Lane B demo half — drop the no-op `sm:text-display` pair → one rung; the `--dropdown-text` font-rung PROP is `WO-3`, consumed at W18. `WAVES-2.md §5 :347`: "U7 → W13.B demo half (font-rung prop → W18.A)". |
| **U8 (interim)** | LEDGER §D `:40`; `X-GU-D2`; `X-GU.md:51,161` | Lane B interim — the kf consumer-cap `max-h-[min(24rem,60dvh)]` + `overflow-y-auto`; the first-class bound is `X-GU-D2`, consumed at W18 (the interim DIES). `WAVES-2.md §5 :348`: "U8 → W13.B interim cap (first-class bound → W18.A)". |
| **U23** | LEDGER §D `:41` | Lane B verify — re-verify the jerk is gone after the bound; spring-clock refine → W18. `WAVES-2.md §5 :351`: "U23 → W13.B verify (spring-clock → W18.A)". |
| **U30a** | LEDGER §D `:42`; `D1 §3`; `D1-3` | Lane B — the audacious `text-display-2` trigger + the specimen-row menu (display names, live conversion, WatercolorDot, glass tier). `WAVES-2.md §5 :347`: "U30a → W13.B". |
| **U21** | LEDGER §E `:53`; `D7-9` (`D7.md:193-199`); `K1-F3` | Lane C — delete `pb-2` (D7-9 governs; glass-ui innocent); X-GU A-5 demoted to verify-after-deletion. `WAVES-2.md §5 :349`: "U21 → W13.C". |
| **U29** | LEDGER §E `:54`; `U-CONTROLS §U29` (the 13-site census) | Lane C — the clipped-text reveal ladder (`:title` floor → glass tooltip → 2-line budget); retire the native `title`s. `WAVES-2.md §5 :346`: "U29 → W13.C". |
| **D8-2 (focus rings P0)** | `D8.md:69-102` | Lane D — the `@layer base :where(:focus-visible)` rule + the suppressor sweep. `WAVES-2.md §5 :382`: "D8-2 focus rings P0 → W13.D". |
| **D8-3a (gradient-stop keyboard)** | `D8.md:107-118` | Lane D — the APG slider pattern authored once into the glass-ui ask; consumed on `GradientStopEditor`. `WAVES-2.md §5 :383`: "D8-3/4/5/6/7 a11y cluster → W13.D / …". |
| **D8-4 (names/labels, control slice)** | `D8.md:132-144` | Lane D — `aria-label` the nameless picker icon-only controls. `WAVES-2.md §5 :383` (a11y cluster → W13.D). |
| **D8-5 (tap-target floor, control slice)** | `D8.md:146-164` | Lane D — fused into the slider/stop/segmented resizes (≥ 24 visual / ≥ 44 hit). `WAVES-2.md §5 :383` (a11y cluster → W13.D). |
| **inv-N-13 (focus-truth, NEW — proposed)** | this spec §Provenance | Codified + gated by clause (e); the orchestrator ratifies-or-declines at integration. |
| **`stagger-children` "phantom"** | `WAVES-2.md §N.W13.A`; `K1-F2` | REFUTED on the tree (`animations.css:40-49` defines it); NO action — recorded as already-defined. |

Every row above appears EXACTLY ONCE in the `WAVES-2.md §5` coverage map under W13 (cross-checked against `WAVES-2.md:341-351,382-386`). Zero drops.

---

## §Hand-off (the BINDING cross-wave + cross-repo boundaries)

### Cross-wave (within N)

- **W13 OPENS-AFTER W10 (the gate-opener) + W12.A/B.** The control-density gate (clauses c/e — `getBoundingClientRect` centers, computed focus rings) is honest ONLY because W10.D un-blanks the desktop (the COMPUTED `display ≠ none @1440` substrate) — until the picker pane RENDERS, the slider rail does not lay out and the clauses cannot measure. And the rail letters lift to a display rung (`text-heading`) that is invisible in Times until **W12.A**'s font root paints a real Fraunces; the focus ring is the live accent (`var(--ring)`/`--primary`) that is INK until **W12.B** re-points `--primary` off `--foreground`. So W13 consumes W12.A/B's tokens — it does NOT mint the font or the accent (those are W12's keystone). The DAG (`WAVES-2.md §2 :276-285`): `W10 → W12 → W13`.
- **W12.E supplies the φ ladder W13.D's tap-target spacing reads.** The 8 px+ adjacency between targets (D8-5) is the `--space-phi--*` ladder minted in W12.E — W13 consumes it, does not mint it.
- **W13.D's tap-target floor is the picker/control slice; the dock half is W17.A and the layout half is W12.C.** Do NOT pull the dock-glyph density (D5-1 → letter A′-6) or the DOM-reorder focus-order (D8-3c → W12.C) into W13 (`WAVES-2.md §6 K1-F7`: 3b → W17.E, 3c → W12.C).
- **W14.C owns the skeleton HALF of U20.** W13.A owns the spectrum-slider half (U20b); the "skeletons too BLACK" half (U20a) is W14.C (`<Skeleton variant="shimmer">`). Do not conflate — they share the U20 ledger row but split by the coverage map's parenthetical.
- **W16.B owns the picker hero / number layout (U2/U31).** W13.A's rail re-model deletes the in-row caption, but the columnar-number layout (U2) and the hero-number promotion (U31) are W16.B's — W13 only removes the caption that breaks U14 centering; it does not author the number hierarchy.

### Cross-repo (the acyclic spine: glass-ui → value.js → keyframes; PUBLISHED-consume, born-RED downstream)

- **The slider size-axis PRODUCER fix is glass-ui's, FILED as `X-GU-E2`** (WAVES-2 short label A-3; a track-thickness token / the size CVA emitted as real CSS), consumed at **W18** against the BA cut. W13.A ships the `[data-size]` scoped-CSS **interim** (28 px lg) NOW — the consumer's correct seam, NOT a vendored copy or an `@source` glob of glass-ui's dist. **BINDING:** W13 NEVER edits `node_modules/@mkbabb/glass-ui` and NEVER vendors its dist (the cross-repo-dev-resolution contract v2: consumers resolve the PUBLISHED `dist/`, one tranche behind). When BA emits the real size CSS, W18 DELETES the interim (no legacy-beside-its-replacement).
- **The first-class dropdown bound is glass-ui's, FILED as `X-GU-D2`** (a collision-and-scroll contract — `avoidCollisions` + `max-height: var(--reka-*-content-available-height)` + internal scroll; the keyframes.js easing-picker `max-h-[var(--easing-dropdown-max-h)]` bounded scroll is the named REFERENCE mechanism, `X-GU.md:161`), consumed at **W18**. W13.B ships the consumer-cap `max-h-[min(24rem,60dvh)]` **interim** NOW. When BA lands the contract, W18 DELETES the cap.
- **The dropdown font-rung PROP is glass-ui's, FILED as `WO-3`** (a `--dropdown-text` family lever for trigger-vs-item parity), consumed at W18. W13.B does the demo half (one `text-display-2` rung); the producer prop is the W18 consume.
- **The pill-indicator geometry: glass-ui is INNOCENT (D7-9 governs).** The X-GU `A-5` ask is DEMOTED to a verify-after-`pb-2`-deletion acceptance row (`K1-F3`) — W13.C deletes the demo's `pb-2` and the pill centers; if it does NOT, A-5 re-promotes to a SegmentedTabs producer defect (a triumvirate condition). No glass-ui write owed by W13 here unless the deletion fails to close U21.
- **The gradient-stop keyboard contract (D8-3a) is authored into the glass-ui slider/easing primitive ask** (the APG pattern is a producer primitive, not a per-consumer copy) — W13.D consumes it on `GradientStopEditor`. This couples to U27's easing-configurator port (`X-GU-H1`), the biggest cross-repo authoring gap (owned by NO sibling wave today, `X-GU.md:86`) — but W13 only consumes the keyboard contract; the configurator port is W16/W18's cross-repo item.
- **Per the cross-repo-dev-resolution contract (v2):** value.js holds `file:../glass-ui` against a clean rebuilt local dist through the design waves; the registry pin migrates to the BA cut at W18.A / W9′ (`inv-N-6` amended 3.13.0 → the BA cut). W13 neither pins nor re-pins — it consumes the current resolved `dist/`.
- **kf-K is downstream of value.js and unaffected by W13** (W13 is demo/control-surface, not library — kf-K consumes value.js 0.12.0 / 0.13.0, not the demo). No kf hand-off owed by this wave. The DIRECTION is reversed for U8: kf's easing-picker is the REFERENCE value.js studies (the named mechanism for `X-GU-D2`), not a consume edge — a documentation reference, not a dependency.

### Disjointness + worktree

Lane A (`ComponentSliders.vue` + `ConfigSliderPane.vue`) and Lane D (the focus rule + the slider thumb tap-targets + `GradientStopEditor.vue`) BOTH touch the slider thumbs (A migrates them onto the spectrum primitive; D extends their hit-target and focus ring) — so **A and D sequence** (A's spectrum migration lands first, then D's focus/tap-target sweep runs over the migrated thumbs; do NOT run A and D in parallel over the slider files). Lane B (`ColorSpaceSelector.vue` + `DockViewSelect.vue`) and Lane C (`PaneSegmentedControl.vue` + the 13 truncate sites) are file-disjoint from each other and from A/D and run in parallel. The app-wide `@layer base` focus rule (Lane D) lands in `demo/@/styles/style.css` (or `utils.css`) — disjoint from A/B/C's component files, but note W12.B also writes `style.css` (the accent axis) → **D's focus rule sequences after W12.B's style.css writes** (W12 is an OPENS-AFTER dependency, so this is already ordered). The orchestrator runs `git worktree add` per parallel unit with a per-agent target dir before dispatch, or commits before parallelizing so all units share a clean main. No two PARALLEL units share a `modify` path; the A/D and D/W12.B overlaps are sequenced by the OPENS-AFTER ordering.

---

## §Format And Lint Cadence

Docs-only at authoring (this spec): the repository's available document checks + `git diff --check` (no trailing whitespace / conflict markers). At IMPLEMENTATION (when W13 dispatches): `npm run check` (tsc --noEmit) after each lane's integration batch and before close; Prettier (4-space, organize-imports) on every touched `.vue`/`.ts`; the boot-smoke + the new control-truth e2e (clauses a–g) at close. The π paired before/after lane (per the standing design-wave facility) captures the slider rail, the dropdown, the pill, and the focus ring before/after for the user's TASTE review. No formatter is skipped.

---

## §Design-decisions (trade-offs RESOLVED)

- **The slider: consume the glass-ui spectrum primitive vs keep the raw-reka fork.** RESOLVED: DELETE the raw-reka fork, consume the primitive. RATIONALE: the split is the disease — two slider codebases produce two looks (`U-CONTROLS §U15`), and the fork re-implements (across 189 LoC) the touch-gating, pointer-capture-leak fix, and dock-hold the primitive already solves correctly (`Slider.vue:54-141`). Keeping the fork "for the gradient" is false economy — the spectrum variant carries the gradient via `--slider-track-bg`. The consume is the KISS, no-bespoke-facility move (inv-N-4).
- **U13 the veil: re-INTRODUCE vs restore-the-deleted.** RESOLVED: re-introduce idiomatically (a `Card surface="veil"` + `radius-pill` capsule), NOT a regression-restore. RATIONALE: the git archaeology (`U-cards §2`, `D1 §5`) proves there is NO deleted `veil`/`ellipse` class to revert — the remembered "ellipse" was the satellite-orbit ghost of the deleted flat-HSV blob fork; the pre-N.W1 rail was a `GlassCarousel` whose chrome WAS the capsule, and N.W1.A rightly killed the carousel category-error but threw away the material. The honest move is to re-introduce the veil material (glass-ui's `veil-surface`) WITHOUT resurrecting the carousel — the tablist semantics (correct) stay.
- **U14 centering: per-row grid cells vs nudge the `justify-around`.** RESOLVED: per-row grid cells (`grid-row: i+1; place-self: center`) + delete the in-row caption. RATIONALE: the `justify-around` rail distributes letters over the COLUMN height while the tracks sit below their row centers (the caption pushes them down) — any margin-nudge is a per-channel-count fragile patch (it breaks at 3 vs 4 vs 5 channels). Per-row grid cells center exact BY CONSTRUCTION at any channel count and any track height; deleting the caption (a duplicate of the rail tooltip) removes the only reason row-center ≠ track-center. Centering by geometry, not by nudging.
- **U28 the slider size: a `[data-size]` interim NOW vs wait for the producer fix.** RESOLVED: the `[data-size]` scoped-CSS interim lands NOW (28 px lg), tagged to DIE at W18. RATIONALE: the size axis is structurally dead in the build (the P9 dep-utility-scan gap) — waiting for BA's `X-GU-E2` leaves "sliders too thin" (the user's literal U28) unaddressed for the whole design body. The `[data-size]` pattern is the SFC's own proven idiom (`Slider.vue:150-154`), not a vendored hack; it is forward-compatible with the producer fix (which DELETES it). The alternative interim (`@source`-globbing glass-ui's dist) is rejected as fragile and lockfile-dependent (`U-CONTROLS §U28` ranks it below the structural fix).
- **U8 the dropdown bound: a consumer-cap interim NOW vs wait for `X-GU-D2`.** RESOLVED: the `max-h-[min(24rem,60dvh)]` consumer cap lands NOW, tagged to DIE at W18. RATIONALE: the menu clips off-viewport TODAY (a functional defect, not a polish item); the first-class collision-and-scroll contract is a producer robustness gap NO BA wave currently addresses (`X-GU.md:51`) — so the interim is necessary to make the dropdown usable now. The kf easing-picker's `max-h` bounded scroll is the named reference idiom (`X-GU.md:161`), so the interim is the same shape the producer fix will land — a clean migration at W18.
- **U21 the pill: delete `pb-2` (demo) vs file a SegmentedTabs producer ask.** RESOLVED: delete `pb-2` (the demo wrapper); demote the producer ask to verify-after-deletion. RATIONALE: D7-9's LIVE measurement (`D7.md:193-199`) governs over D3 §6's font-metrics HYPOTHESIS (`K1-F3`): the pill text is centered 3.5/3.5 WITHIN the pill (glass-ui innocent); the 4 px-high is the demo's asymmetric `pb-2`. Filing a producer ask for a demo defect would be a mis-attribution; the X-GU `A-5` row stands only as a confirm-no-regress acceptance, withdrawn-on-green.
- **D8-2 the focus ring: one `@layer base` accent rule + a suppressor sweep vs per-control rings.** RESOLVED: one base rule + sweep every suppressor. RATIONALE: the defect is app-wide (the ring paints on exactly ONE control) and the root is uniform (`focus-visible:outline-none` + a transparent `ring-ring/40`) — a per-control fix is N edits that re-rot the instant a new control copies the suppressor. One `:where(:focus-visible)` base rule (zero-specificity, so any control can override but none can accidentally suppress) + a sweep that requires every `outline-none` to consume `--focus-ring-shadow` OR fall through is the structural cure. The accent ring IS the house language (a purposeful colourful pop) — the fix doubles as design (`D8.md:98`).
- **inv-N-13 (focus-truth): codify a new invariant vs leave D8-2 as a one-off fix.** RESOLVED: PROPOSE inv-N-13 (the orchestrator ratifies at integration). RATIONALE: the D8-2 P0 is the focus-ring TWIN of inv-N-11's cascade-truth — a suppressor that greens a contrast lint but computes transparent under the glass cascade is exactly the "emission ≠ effect" failure mode, one axis over. Codifying it (no suppressor without a painting replacement; an e2e asserts the COMPUTED `outline-style: solid`) makes the regression structurally un-shippable, matching the N invariant discipline (every recurring anti-pattern ships its gate). It is PROPOSED (not in `WAVES-2.md §4`'s enumerated deltas) so the orchestrator decides whether to add it to the §4 ledger or fold it into inv-N-11.
- **The gradient-stop keyboard: author once into the glass-ui primitive vs implement on `GradientStopEditor`.** RESOLVED: author the APG slider pattern ONCE into the glass-ui slider/easing ask; consume on `GradientStopEditor`. RATIONALE: D8-3a names this explicitly ("author it once, in glass-ui") — the keyboard contract is a producer primitive that every slider-like control consumes; re-implementing it per-consumer is the duplication the spectrum-slider consume is deleting. It couples to U27's easing-configurator port (the biggest cross-repo gap), so authoring it into the producer primitive serves both. W13 consumes; the producer authors.
