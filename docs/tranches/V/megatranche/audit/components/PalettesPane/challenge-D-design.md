# CHALLENGE-D — `demo/palettes/PalettesPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. This is a declared seat,
not an inherited one.

> **Pass 5.** Supersedes the 2026-07-28 22:09 pass, preserved verbatim at
> `challenge-D-design.pass-4-prior.md` (which carries passes 1–3 through its own chain).
>
> I measured cold. I read the component, `PaletteCard`, `PaletteCardGrid`, `PaletteColorStrip`,
> `CurrentPaletteEditor`, `EmptyState`, `PaneHeader`, the ramp resolver and its writer, and the three
> canon documents; I looked at the four tracked Safari captures; then I drove the live app at `:9000`
> with **six** new Playwright harnesses against a *pathological* seed (the contract's exact extremes:
> a 100-scalar name, a 1-colour palette, a 50-colour palette, a bidi/emoji name) before opening
> pass 4.
>
> Pass 4 and its predecessors are strong. I do not re-argue their thirty-seven findings. This pass:
>
> 1. lands **fourteen findings no prior pass contains**, five of them BLOCKER/MAJOR at the top of the
>    queue;
> 2. **corrects one of pass 4's negative proofs** with a measurement (RTL ordinal mirroring);
> 3. closes the last two state-coverage gaps pass 4 declared open — **keyboard-focus** (a full 34-stop
>    tab walk in a UA whose default tab set includes buttons) and **reduced motion** — and reports one
>    of my own hypotheses **refuted**;
> 4. supplies the first **composited-pixel** measurements of this route: real screen colours sampled
>    out of real screenshots, in both schemes, which is what `PROPORTION-AUDIT.md:73` demands
>    ("Real rendered relation wins over token intent").

Subject: `demo/palettes/PalettesPane.vue`, 212 lines, unchanged at `c654824e`.
Evidence root: `docs/tranches/V/megatranche/audit/components/PalettesPane/probe-p5/`.

---

## 0. Verdict

**DEFECTIVE.**

Pass 4's architectural diagnosis — *a route composed as a `Card`* — stands and I do not disturb it.
But three passes have now audited the ramp, the plate and the strip while treating each one's
**mechanism** as correct and only its tuning as wrong. Measured cold, the mechanisms themselves are
wrong:

> **The pane's one sanctioned identity mark cannot render the artifact the owner ruled.**
> `demo/color-session/palettes-ramp.ts:80` is `export const PALETTES_RAMP_SHIFTS = [-40, 0, 40]` and
> its own comment at `:50` calls it *"a 3-stop **ANALOGOUS** fan of the LIVE accent."* Measured live,
> the mark is an **80.0° arc** — 22.2% of the hue circle, entirely inside magenta→red→ochre, with no
> green, cyan or blue reachable at any seed. `VISUAL-CONSTITUTION.md:23` names the species
> *"pastel-rainbow identity"*; the owner ruling is quoted verbatim inside the component at
> `PalettesPane.vue:3-4` — *"T-43 owner-CONFIRMS: 'Palettes' should be rainbow."* An analogous fan is
> the definitional opposite of a rainbow. Passes 1–4 all measured this fan and all read it as the
> right shape wrongly lit.

And the reason the pane *looks* the way it does is not shadow inventory. It is that its three
constitutionally distinct materials composite to **the same screen pixel**:

> Sampled out of real screenshots (`probe-p5/TELEMETRY-composite.json`): in light, the SearchBar,
> the `Start a new palette` plate and a saved PaletteCard are all **`rgb(233,225,217)`** — byte
> identical. In dark, all three are **`rgb(66,55,47)`**. `VISUAL-CONSTITUTION.md:11-19` assigns them
> different tiers and rules *"One surface has one tier."* Rendered, there is one tier for all three.

---

## 1. New findings

### P5-1 · BLOCKER — the `Palettes` identity is an analogous fan; a rainbow is unreachable by construction

**Source.** `demo/color-session/palettes-ramp.ts`:

```
50  * a 3-stop ANALOGOUS fan of the LIVE accent, derived, alive to the pick
75  * The 3-stop analogous fan (the Q4 record's own form, ruled in at Q5). ±40°
76  * is the house analogous step (the S.W7-4 view fan's own interval) — wide
80  export const PALETTES_RAMP_SHIFTS = [-40, 0, 40] as const;
```

**Measured live** (`probe-p5/TELEMETRY-chromium.json.ramp`, Chromium 1440×900 light, the resolved
`background-image` of `.palettes-ramp-text`):

```
linear-gradient(90deg,
  oklch(0.471189 0.188448 329.834),
  oklch(0.471189 0.188448   9.834),
  oklch(0.471189 0.124865  49.834))
```

| property | measured | law |
|---|---|---|
| hue arc, first→last | **80.0°** = 22.2% of the circle, one warm sector | `VISUAL-CONSTITUTION.md:23` "pastel-**rainbow** identity"; `PalettesPane.vue:3-4` "should be rainbow" |
| lightness | **L 47.1%** on all three stops, at C 0.188 | `VISUAL-CONSTITUTION.md:17` "**pastel** `Palettes` identity" — L 47% at C 0.19 is a saturated mid-tone |
| chroma agreement | stop 2 C **0.124865** vs stops 0/1 C **0.188448** — **−33.7%** | the fan is not iso-chromatic; the word reads bright magenta fading to muddy ochre |

The chroma disagreement is visible without instruments: in
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/palettes.png` and in
`probe-p5/webkit-desktop-light-pathological.png`, the trailing letterforms of *Palettes* go dirty
while the leading ones are vivid.

**Why this outranks D-2.** D-2 (three passes) says the fan is chromatically dead in dark. P5-1 says
that even where it is fully alive it is the wrong species. Curing D-2 yields a *saturated 80°
analogous fan* — still not a rainbow. The mechanism is categorically incapable of the ruled artifact
at any seed, any scheme, any lightness. Pass 1 explicitly assumed otherwise
(`challenge-D-design.pass-1-prior.md:234`: *"the word reads as pastel rainbow, which is the whole
point of the coordinate"*). `grep -ci "PALETTES_RAMP_SHIFTS"` over all four prior passes → `0`.

**Cure.** The identity is a *hue traversal*, not an analogous fan. Replace `[-40, 0, 40]` with an
ordered hue set that actually crosses the circle (or ≥5 stops over ≥180°), add a chroma floor and an
inter-stop iso-chroma constraint, and certify against the **plate** rather than by walking ink
lightness — which is also D-2's cure, and the two must land together or the identity is only
half-repaired. Do not merely widen ±40: a 3-stop `background-clip: text` gradient across a 9-glyph
word cannot carry a spectrum; the mark needs per-stop hue placement.

---

### P5-2 · BLOCKER — three constitutional tiers composite to one rendered material

**Method.** Screenshot the live route, decode the PNG, sample named coordinates, convert to OKLCH.
Harness `probe-p5/harness5.mjs`; data `probe-p5/TELEMETRY-composite.json`; images
`probe-p5/chromium-{light,dark}-composite.png`. This is `PROPORTION-AUDIT.md:73`'s protocol
("Real rendered relation wins over token intent"), applied to this route for the first time.

| sample | light `rgb` | light OKLCH | dark `rgb` | dark OKLCH |
|---|---|---|---|---|
| pane plate (`Card tier="resting"`) | 241,211,201 | L 0.8892 · C **0.0364** · H 39.3 | 120,101,92 | L 0.5224 · C 0.0282 · H 46.8 |
| `.search-seated` SearchBar | **233,225,217** | L 0.9138 · C 0.0139 · H 67.7 | **66,55,47** | L 0.346 · C 0.0207 · H 58 |
| `.dashed-well` (CurrentPaletteEditor) | **233,225,217** | L 0.9138 · C 0.0139 · H 67.7 | **66,55,47** | L 0.346 · C 0.0207 · H 58 |
| `PaletteCard` body | **233,225,217** | L 0.9138 · C 0.0139 · H 67.7 | **66,55,47** | L 0.346 · C 0.0207 · H 58 |
| strip segment 0 (requested `oklch(0.72 0.16 0)`) | 242,117,160 | L 0.7195 · C 0.1591 · H 0.2 | identical | identical |

A filter **control**, an authoring **plate** and a saved **specimen slip** are the same pixel, in both
schemes. `VISUAL-CONSTITUTION.md:11-19` gives them different tiers — *Instrument veil* for controls
genuinely over live colour, *Specimen well* for "image, curve, palette or code artifact" — and rules
verbatim: **"One surface has one tier."**

**Mechanism, in source.** `demo/styles/utils.css:132-137`:

```
.search-seated {
    background: var(--well-bg);
```

The search field is painted with the **specimen-well token**. `PaletteCard.vue:19` carries
`bg-well`. `CurrentPaletteEditor.vue:3` is `.dashed-well`. Everything on this pane is a well.

What is left to tell them apart: border `1px solid` / `1px dashed` / `2px solid`, and cast offset
`-2px 2px` / none / `-3px 3px`. At reading distance that is nothing, which is exactly what the
tracked capture shows — the light desktop pane reads as four stacked beige slabs
(`shots/safari-desktop-light/palettes.png`).

---

### P5-3 · MAJOR — the pane is chromatic and its children are neutral, so each child punches a grey hole through the plate; and the elevation relation sign-flips between schemes

Same samples. The pane plate carries **C 0.0364** at H 39.3; its children carry **C 0.0139** at
H 67.7. The children are **62% less chromatic than their own host**, at **ΔH 28.4°**.

Mechanism (`probe-p5/TELEMETRY-chromium-4.json.normal.pane`): the pane is
`background-color: oklab(0.928268 0.00554796 0.0132111 / 0.664)` with **`backdrop-filter: none`**.
At 66.4% alpha and no blur it *inherits the ambient's chroma unfiltered*; the children are opaque and
do not. Two consequences:

1. **`VISUAL-CONSTITUTION.md:21`** — *"Seed tint is forbidden outside the ambient field, active
   accent, WatercolorDot/specimen, and pastel Palettes lanes."* The structural glass plate is
   measurably carrying C 0.0364 of seed tint at H 39.3. It is none of the four permitted lanes.
2. **Elevation inverts between schemes.** Light: the slip is **+0.0246 L above** its host. Dark: the
   slip is **−0.1764 L below** its host. The same component reads raised in one scheme and recessed
   in the other. `VISUAL-CONSTITUTION.md:21`: *"Dark chrome uses the restrained neutral pole"* — a
   restrained pole is a translation, not a sign flip.

---

### P5-4 · MAJOR — the specimen well does not scale with the specimen: 1 and 50 colours receive identical area, and 50 renders as a continuous rail

`probe-p5/TELEMETRY-chromium.json.strip`, pathological seed, 1440×900:

| palette | colours | card | strip | segment width | **area per colour** |
|---|---|---|---|---|---|
| `One` | 1 | 462 × 100 | 458 × 40 | 458 px | **18,320 px²** |
| `Sunset Ridge 1` | 3 | 462 × 100 | 458 × 40 | 152.66 px | 6,106 px² |
| `Zephyr` | 5 | 462 × 100 | 458 × 40 | 91.59 px | 3,664 px² |
| `Fifty` | **50** | 462 × 100 | 458 × 40 | **9.16 px** | **366 px²** |

`PALETTE-CONTRACT.md:126` fixes the domain: *"A palette's content is exactly **1–50**
`CanonicalNamedColor` atoms."* Both ends of that closed domain are in the table. The allocation never
changes: **card height invariant at 100 px, strip invariant at 458 × 40**, across a **50.05×** collapse
in per-colour area. There is no gutter, no stroke, no wrap, no second row, no count-adaptive height,
no `+N more`. Zoom does not help — at 200% the minimum segment is **9.15625 px**
(`TELEMETRY-chromium.json.zoom200`); mobile is worse at **6.39 px**
(`TELEMETRY-webkit.json.mobileLight`).

**The photographed consequence is worse than illegibility.** In
`probe-p5/webkit-desktop-light-pathological.png` the `Fifty` card renders as a **smooth spectrum
bar** — 50 abutting 9 px slivers with no separator read as one continuous gradient.
`VISUAL-CONSTITUTION.md:7` reserves that exact form: *"the **spectral meniscus**: a continuous
liquid-color rail reserved for genuinely chromatic **continuous** domains—Picker and Gradient."* The
Library entity slip manufactures the product's signature continuous rail out of discrete data,
one route away from the two instruments that own it. (For this seed the adjacent-hue step is 7.2°,
giving ΔE_ok ≈ `2 · 0.16 · sin(3.6°)` = **0.0201** — at the OKLab just-noticeable threshold. The
*geometry* is the finding; this ΔE is that geometry illustrated on my seed.)

**Sub-defect, in source — the component declares a legibility floor and declines to apply it.**
`demo/palettes/browser/card/PaletteColorStrip.vue`:

```
47  /** The 8% legibility floor for weighted segments. */
48  const WEIGHT_FLOOR = 0.08;
…
64      Math.max(Math.max(w, 0) / total, WEIGHT_FLOOR),      ← weighted branch: 8%
…
70      return colors.map(() => Math.max(100 / n, 0.5));     ← ordinary branch: 0.5%
```

Two floors for one visual channel, **16× apart**, in one file. And the `0.5` guard is **unreachable**:
`n ≤ 50` by contract ⟹ `100/n ≥ 2` always. It is a masking fallback for an input the domain forbids —
owner edict 2.

---

### P5-5 · MAJOR — inside the specimen slip, the metadata outweighs the specimen 1.40 : 1

Measured interior (`TELEMETRY-chromium.json.strip` + card rect): card 462 × 100 with a 2 px border ⟹
interior 458 × 96. The strip takes **458 × 40 = 18,320 px²**; the metadata row (grip, name, count
badge, `…` menu) takes **458 × 56 = 25,648 px²**.

**Specimen 41.7% · metadata 58.3% · ratio 1.40 : 1.**

`PROPORTION-AUDIT.md:67` (Card law 5.2): *"A card has one protagonist, one identity line, and at most
one persistent action/status region."* Rendered, the identity line *is* the protagonist.
`VISUAL-CONSTITUTION.md:5`: *"Each screen therefore has one dominant instrument, **one clear
specimen**."* On the route whose entire purpose is saved colour, the colour is the minority of its own
card.

---

### P5-6 · MAJOR — the primary destructive path guarantees focus loss, and the only thing announced afterwards is the wrong sentence

Reproduced end to end (`probe-p5/harness.mjs` → `TELEMETRY-webkit.json.dialog`), 12 palettes:

```
onOpen      → activeName "Cancel"  ·  dialogRole "dialog"  ·  labelledby/describedby present
afterEscape → BUTTON "Delete all saved palettes"          ← correct
afterConfirm→ activeTag "BODY"  ·  isBody true
              openerStillInDom  false
              cardsLeft         0
              liveRegions       ["· empty plate ·No saved palettes yet.Add colors above, then save the set."]
```

Escape is right. **The success path is not.** `PalettesPane.vue:62` wraps the opener in
`v-if="pm.savedPalettes.value.length > 0"`, so confirming the command *deletes the control that
opened the dialog* — focus loss is the **guaranteed** outcome of the primary path, not an edge case.
`VISUAL-CONSTITUTION.md:115`: *"Dialog/Drawer/Popover open and close | producer initial-focus rule on
open; **exact connected opener on close, otherwise the nearest surviving owning action**."* There is
no nearest surviving owning action; there is `document.body`.

Compounding it: the pane's one live region is the permanent `role="status"` empty plate
(`EmptyState.vue:28`, `role="status"` with `aria-live` unset ⟹ implicit polite + atomic). After
destroying twelve palettes, the sentence it announces is **"Add colors above, then save the set."**
`VISUAL-CONSTITUTION.md:114` requires the changed result count/state through the owning status
region. The owning status region congratulates the user on a fresh start.

---

### P5-7 · MAJOR — the focus indicator measures 1.76 : 1 against the plate it is drawn on

Every focusable in the pane computes `outline-style: none` — all fourteen stops in
`TELEMETRY-chromium.json.tabWalkChromium`. The sole focus channel in normal rendering is a
box-shadow (`TELEMETRY-chromium-3.json.focusRingNormal`):

```
color(srgb 0.665504 0.000101413 0.261748 / 0.3) 0px 0px 0px 2px,
color(srgb 0.665504 0.000101413 0.261748 / 0.15) 0px 0px 8px 0px
```

Composited over the plate it is drawn on (`TELEMETRY-chromium-4.json.contrast`, canvas-composited,
WCAG relative-luminance formula):

```
plate rgb(233,225,217)  ·  ring composite rgb(213,157,171)  ·  contrast 1.76 : 1
```

WCAG 2.2 SC 1.4.11 requires **3 : 1** for a focus indicator against adjacent colours. 1.76 fails by
41%. And `VISUAL-CONSTITUTION.md:82` states the obligation in exactly these terms: *"Text, focus,
boundaries and state meet their rendered contrast **on the actual material tier**; a token name is not
evidence."* Measured on the actual material tier: 1.76.

The ring is producer-owned; the *composite* is this pane's, because the plate is this pane's — and
P5-2 shows that plate is the one material the pane uses for everything.

---

### P5-8 · MAJOR — under forced colors, colour survives exactly where it is decoration and dies exactly where it is data

This extends pass 4's N-1 with the counter-evidence that turns it from a bug into a principle.
`forcedColors: "active"`, Chromium 1440×900 (`TELEMETRY-chromium-4.json.forced`,
`chromium-fc-survival.png`, `chromium-fc-focus-menu.png`):

| element | job | forced-colors result |
|---|---|---|
| `.atmosphere-canvas` | decoration | `linear-gradient(135deg, rgb(200,70,215) 0%, rgb(255,113,177) 33%, rgb(255,182,175) 67%, rgb(255,234,220) 100%)` — **full chroma, untouched** |
| `.dashed-well` ghost swatch | decoration | `color(srgb 1.51088 0.562414 0.782924 / 0.12)` — **survives**, visible as a pink dashed square |
| `PaletteColorStrip` segment | **the data** | `rgb(255,255,255)`, `border-width: 0px` |
| `PaletteCard` / pane / trash | chrome | `rgb(255,255,255)` + `1–2px solid rgb(0,0,0)` |

Because the segment's border width is **0**, fifty adjacent white rectangles merge: the **count** is
lost as well as the hue. And the strip is `aria-hidden="true" role="presentation"`
(`PaletteColorStrip.vue:3-4`), so there is no second channel.

`chromium-fc-focus-menu.png` is the picture: a full-saturation brand gradient filling the screen,
one pink authoring swatch, and four palette cards containing nothing but a name and a numeral. The
product's atmosphere is preserved at 100%; the user's palettes are erased.

---

### P5-9 · MINOR — the card has one state out of eight, and the hover choreography its own comment documents does not fire

`TELEMETRY-chromium-3.json`, real mouse move, `(hover: hover)` = true, `(pointer: fine)` = true,
`matchesHover: true`:

| state | transform | box-shadow | border-color | background | scale |
|---|---|---|---|---|---|
| rest | `none` | `-3px 3px 0, -5px 5px 0, -7px 7px 0` | `oklab(0.216… / 0.12)` | `oklab(0.913295…)` | `none` |
| **hover** | `none` | **identical** | **identical** | **identical** | `none` |
| active | `none` | identical | — | — | `1.0094 0.9515` |

Hover changes **nothing**. `PaletteCard.vue:10-18` documents the opposite:

```
// the producer CARTOON REGISTER — the `cartoon-surface` atom owns the
// hover/press choreography (translate/scale on --ease-cartoon-punch @
// --duration-normal, shadow bezier md→lg, :active squash, 2px border)
```

Half of that is measurably absent. On a 462 × 100 target whose *entire body* is the click surface
(D-4), the only hover feedback a pointer user receives is `cursor: pointer`. Enumerated against the
brief's state list, the card handles: hovered ✗ · focused ✗ (no seat, D-4) · selected ✗ (no
`aria-pressed`, D-4) · disabled ✗ · dragging ~ (`opacity-30` only) · loading ✗ (`PaletteCardSkeleton`
exists and is used by `BrowsePane.vue:130`, never here) · error ✗ · **pressed ✓** — one state out of
eight, and it is the one the user least needs.

---

### P5-10 · MINOR — `.pane-scroll-fade` fades nothing; the library is hard-cropped mid-card behind a 2 px scrollbar

`TELEMETRY-chromium-6.json.containment`, 12 palettes at 1440×900:

```
mask: "none"       contain: "content"      overflowY: "auto"
scrollH 1668  ·  clientH 772  ·  hiddenPx 896   (53.7% of the library below the fold)
croppedCard: { index: 4, visiblePx: 5, ofPx: 100 }
scrollbarWidth: 2
```

The recipe (`demo/shared/ui/PaneHeader.vue:54-57`) is:

```css
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

No gradient, no mask, no fade — the class is named for an affordance it does not provide, on **nine
sibling panes** (`PaneHeader.vue:43-47` enumerates them). The rendered result is a **5 px sliver** of
the fifth palette card hard-clipped at the pane's bottom edge, which reads as a rasterization artifact
rather than as "more below", behind a 2 px scrollbar that is not a usable drag target.

---

### P5-11 · MINOR — twelve consecutive tab stops all named `"Palette menu"`

Full 34-stop document tab walk in Chromium (`TELEMETRY-chromium.json.tabWalkChromium` — a UA whose
default tab set includes buttons, which WebKit's does not; that is why pass 2's WebKit walk was
shorter):

```
13 INPUT  "Search your palettes..."   414×25
14 BUTTON "Delete all saved palettes"  28×28      ← first destructive stop
15…26 BUTTON "Palette menu"            36×36  ×12  ← twelve identical names
27 BODY
```

Pass 2 recorded the sequence; the **ambiguity** is the defect. `VISUAL-CONSTITUTION.md:83`: *"Role,
accessible name, state/value and associated error/status are explicit."* A keyboard user at stop 21
cannot know which palette they are about to act on — and `Delete` lives inside that menu
(`TELEMETRY-chromium-6.json.menuPopover.items: ["Publish","Rename","Export","Delete"]`, and per
pass 4's N-3 that Delete is unconfirmed).

---

### P5-12 · MINOR — the consumer restates the recipe's own fallback, and the restated colour is not the colour that ships

`PalettesPane.vue:167-175` aliases the title tokens with literal fallbacks; `demo/styles/utils.css:195-197`
declares the identical literals. The comment claims:

```
169  //  `--palettes-ramp-*` slots. The fallbacks
170  //  mirror utils.css so there is no pre-first-resolve flash
```

They do mirror utils.css. Neither mirrors what the resolver stamps:

| stop | declared fallback | measured live token | Δ |
|---|---|---|---|
| 0 | `oklch(0.632 0.214 333.5)` | `oklch(0.471189 0.188448 329.834)` | ΔL **0.161** · ΔC 0.026 · ΔH 3.7° |
| 1 | `oklch(0.632 0.214 13.5)` | `oklch(0.471189 0.188448 9.834)` | ΔL **0.161** · ΔC 0.026 · ΔH 3.7° |
| 2 | `oklch(0.632 0.214 53.5)` | `oklch(0.471189 0.124865 49.834)` | ΔL **0.161** · ΔC **0.089 (−41.6%)** |

Mirroring the wrong source does not remove a flash — it guarantees that if the flash ever occurs it is
a 16-lightness-point jump, not a no-op. Separately, restating a recipe's root-level default at the
call site is owner edict 5 (root-level styling, never per-instance).
*(Whether the flash is observable is a **hypothesis** — the writer watch is `immediate: true`,
`demo/color-picker/composables/boot/useViewAccents.ts:167`. The colour disagreement is measured, not
hypothesised.)*

---

### P5-13 · MINOR — the header count and the grid's emptiness are bound to two different truths, fifteen lines apart

```
PalettesPane.vue:20  v-if="pm.savedPalettes.value.length > 0"     ← badge
PalettesPane.vue:62  v-if="pm.savedPalettes.value.length > 0"     ← delete-all row
PalettesPane.vue:77  :empty="pm.filteredSaved.value.length === 0" ← grid
```

Measured with 12 stored and query `zzzzzz` (`TELEMETRY-chromium.json.filterZero`):

```
headingText        "My Palettes12 (12 saved)"
cards              0
trashStillOffered  true
liveRegions        [{ role:"status", text:"· empty plate ·No saved palettes yet.Add colors above, then save the set." }]
```

So on a screen that states *"No saved palettes yet."*, the **only** control offered is one that
permanently deletes twelve palettes. D-5 named the copy and D-25 named the invisible scope; the
**two-source binding** is the mechanism, and both sources are in this file.

---

### P5-14 · MAJOR — correction to pass 4: the colour strip **does** mirror under RTL, and the export contract does not

`challenge-D-design.pass-4-prior.md:142` records as negative proof: *"colour strips preserve ordinal
identity per `VISUAL-CONSTITUTION.md:153`."* Measured (`TELEMETRY-chromium.json.rtl`, `dir="rtl"`,
Chromium 1440×900, `chromium-rtl-pathological.png`):

```
stripFlexDir     "row"          ← under dir=rtl, row lays children right-to-left
stripX           226            strip spans 226 → 684 (458 px)
stripFirstSegX   675            ← segment 0 sits at the strip's RIGHT edge
```

In LTR segment 0 is at the left edge. **The palette's ordinal 1 changes sides with document
direction.** Meanwhile the export contract writes ordinals left-to-right unconditionally —
`PALETTE-CONTRACT.md` Appendix W51 §6: `"  <rect x=\"" + dec(i) + "\" …"` for `i = 0..N-1`; §7 PNG:
span `[floor(i·1200/N), floor((i+1)·1200/N))`. So an RTL user's on-screen card and the SVG/PNG they
export from it **disagree about which end is first**, and because the strip is
`aria-hidden="true" role="presentation"` there is no channel that resolves the ambiguity.

The constitution rules the sibling species the other way. `VISUAL-CONSTITUTION.md:127`, Gradient stop
position: *"identical; **explicit gradient coordinates do not mirror with prose**."* An ordered
chromatic sequence is one species; the Library strip and the Gradient rail must not disagree about
whether it mirrors.

---

## 2. Negative proof — what I attacked in this pass and could not break

1. **Forced-colors focus is fine — my own hypothesis refuted.** I predicted that
   `outline-style: none` on every control (P5-7) would leave focus invisible in HCM, where box-shadow
   is not painted. Measured (`TELEMETRY-chromium-3.json.fcFocus`): the UA restores
   `outline: 2px solid rgba(5,0,73,0.8)` at `outline-offset: 2px` on the trash, the menu **and** the
   input. Photographed at `chromium-fc-focus-menu.png`. `VISUAL-CONSTITUTION.md:84` holds. Recorded
   as a refutation, not softened.
2. **The ramp identity survives forced-colors.** `color: rgb(0,0,0)`, `background-image: none`;
   *"My Palettes"* fully legible in `chromium-fc-focus-menu.png` at a different seed and viewport
   from pass 4's capture. Pass 4's negative proof #2 independently replicated.
3. **The card menu popover is not clipped by the pane's containment.** Despite
   `contain: layout style paint` on the pane root, reka-ui portals the menu:
   `insidePane: false`, `portalParent: "BODY.relative"`, `overflowsPaneBottom: -70`,
   `overflowsPaneRight: -39`. Popover overflow is a non-issue on this route.
4. **The strip's colour fidelity is exact.** Requested `oklch(0.72 0.16 0)` renders as
   `rgb(242,117,160)` = OKLCH **L 0.7195 · C 0.1591 · H 0.2** — three decimal places of agreement.
   Whatever else is wrong with the strip, it does not lie about the colour it is given.
5. **200% zoom is clean with the pathological seed.** 720×450 @ 2×: `docOverflow: 0`, pane
   512×338, all 12 cards present, first card 462 px. Pass 4's §2.2 replicated at the contract
   extremes.
6. **Escape restores focus to the exact opener** (`afterEscape: BUTTON "Delete all saved palettes"`).
   P5-6 is specific to the success path.
7. **Reduced motion is honoured** (`TELEMETRY-webkit.json.reducedMotion`): card, `.cartoon-cast` and
   the pane all resolve to `transition: opacity 0.1s, color 0.1s, background-color 0.1s,
   border-color 0.1s, box-shadow 0.1s` and `animation: 0.00001s`. The gap pass 4 left open closes
   green.
8. **Long names truncate without breaking layout, at every viewport.** A 100-scalar name (the
   `PALETTE-CONTRACT.md:139` `displayName` ceiling) clamps to 1 line at 1440 and 2 at 390 with
   `scrollWidth === clientWidth` on every card and no reflow. Replicates passes 2–3.
9. **No overflow, no page errors.** `docOverflow: 0` in every matrix measured — 1440 / 720 / 390,
   light and dark, LTR and RTL, forced-colors, reduced-motion, empty and 12 pathological palettes.
10. **`h1Count: 0` and heading `H3`** replicate D-12 exactly; **`listitemCount: 0` under `role="list"`
    with 12 `role="article"` children** replicates the pass-1/2 semantics finding. Neither is re-argued.

---

## 3. Evidence base

All under `docs/tranches/V/megatranche/audit/components/PalettesPane/probe-p5/`.

| Artifact | Supplies |
|---|---|
| `harness.mjs` → `TELEMETRY-webkit.json` | 8-state WebKit sweep on the pathological seed; the delete-all focus/announcement reproduction; mobile + empty-state typography; reduced motion |
| `harness2.mjs` → `TELEMETRY-chromium.json` | 34-stop tab walk; strip geometry table; the live ramp gradient; light-mode material; hover/active; filter-to-zero; forced-colors; 200% zoom; RTL |
| `harness3.mjs` → `TELEMETRY-chromium-3.json` | forced-colors focus (refutation); hover-capability truth; normal-mode focus-ring spec; drag ghost; scroll-fade mask |
| `harness4.mjs` → `TELEMETRY-chromium-4.json` | forced-colors survival table (data vs decoration); focus-ring composite contrast 1.76 |
| `harness5.mjs` → `TELEMETRY-composite.json` | **composited screen pixels** sampled from real screenshots, light + dark, converted to OKLCH |
| `harness6.mjs` → `TELEMETRY-chromium-6.json` | containment, crop geometry, hidden-px, scrollbar width, portaled popover |
| `webkit-desktop-light-pathological.png` | the 50-colour card rendering as a continuous rail; the 1-colour card at the same size; the orphan trash |
| `chromium-fc-focus-menu.png` · `chromium-fc-survival.png` | P5-8's inversion, photographed; the surviving UA focus outline |
| `chromium-{light,dark}-composite.png` | the sampled frames behind P5-2/P5-3 |
| `chromium-desktop-light-filter-zero.png` · `chromium-card-menu-open.png` · `chromium-pane-scrolled-bottom.png` · `chromium-rtl-pathological.png` · `chromium-zoom200-pathological.png` · `webkit-*-pathological.png` | the remaining state frames |
| `demo/color-session/palettes-ramp.ts:50,75-76,80` | `PALETTES_RAMP_SHIFTS = [-40, 0, 40]`, "3-stop ANALOGOUS fan"; P5-1 |
| `demo/palettes/browser/card/PaletteColorStrip.vue:47-48,64,70` | the two legibility floors; P5-4 |
| `demo/styles/utils.css:132-137,195-197` | `.search-seated { background: var(--well-bg) }`; the duplicated ramp fallbacks; P5-2, P5-12 |
| `demo/shared/ui/PaneHeader.vue:43-57` | the `.pane-scroll-fade` recipe; P5-10 |
| `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md` | binding law, quoted per finding |

**Environment note.** Every run emits the dev `VITE_API_URL` banner. It blocks *server* palette calls
only; every finding above exercises the local `localStorage` path (`usePaletteStore.ts:6`, key
`color-palettes`), which is what `isLocal: true` palettes use.

**Seed note.** My seed is deliberately pathological — the contract's exact extremes (1 colour, 50
colours, a 100-scalar name, a bidi + emoji name) plus eight ordinary palettes. Prior passes used 6,
8, 12 and 40 ordinary palettes. Where numbers agree across seeds (pane 512 px, card 100 px, ramp
tokens, `h1Count: 0`) the replication is noted; where they differ, the difference is the finding.

---

## 4. Carried forward, not re-argued

Read `challenge-D-design.pass-4-prior.md` and its chain for the full argument on each. Ranked as pass 4
left them:

**BLOCKER** — D-1 / D-1b reorder permutes and rewrites hidden palettes · D-2 pastel identity
chromatically dead in dark (**now subordinate to P5-1**: curing D-2 yields a saturated 80° analogous
fan, still not a rainbow) · D-3 exact 50/50, Card-as-page · D-4 pointer-only `role="article"`, zero
focusable seats · D-5 no-results paints the empty-library invitation · D-6 export failure is
`console.warn`-only · D-7 no operation state · D-23 one search model, two scopes · D-24 corrupt
storage rendered as an empty library.

**MAJOR** — N-1 forced-colors specimen loss (**now P5-8, with its counter-evidence**) · N-2
`variant="ghost"` is a dead Glass-5 prop · N-3 single delete unguarded while delete-all is guarded ·
N-4 42% / 60% chrome band · D-8 glass with no blur, five shadow recipes · D-9 unnamed unfocusable
16 px handle · D-10 fixed-height inner scroller (**P5-10 measures its crop**) · D-11 no owner-state
selector · D-12 zero H1 · D-13 search field has no accessible name · D-14 `.search-seated`
per-instance override (**P5-2 measures what it costs**) · D-15 `animation: 150` literal · D-16
delete-all band 94% empty · D-25 destructive scope invisible · D-26 palette entity has no `Card`
shell · D-27 empty Library takes half the stage · D-30 no design at scale (**P5-4 supplies the
number**).

**MINOR** — N-5 mobile FAB-silhouette trash · N-6 badge/title 0.81 on mobile · N-7 RTL badge before
the noun · D-17 three dead imports · D-18 pre-3.5 refs, two `any` · D-19 badge/title optical centres ·
D-20 dashed ghost casting a physical shadow · D-21 two import idioms · D-22 empty-state type hierarchy
inverted (**measured on mobile this pass: the empty-state message and the pane identity are both
Fraunces 25.888 px, and the message is weight 700 against the identity's 400 — the message
outranks the route**) · D-28 physical badge margin · D-29 inert `mx-auto`.

---

## 5. The single gestalt cure

Pass 4's transposition is correct and I adopt it: **the pane is a field wearing the costume of a
card**, and it must become the owner workspace chassis `VISUAL-CONSTITUTION.md:45` already specifies —
field at 64–66.7%, a real selected inspector at 33.3–36%, the `Card` demoted onto the entity slip with
the ruled quiet-opaque-`sm` tuple and one named `<button aria-pressed>` seat.

Pass 5 adds that the transposition is **necessary but not sufficient**, because four of this pass's
findings are not shadows of the Card-as-page error. They are separate mechanisms that would survive
the move intact:

1. **The identity mechanism is the wrong species (P5-1).** An analogous ±40° fan cannot be a rainbow
   in any chassis. Replace the fan with an ordered hue traversal under a chroma floor and an
   iso-chroma constraint, certified against the plate; land it together with D-2's cure or the mark is
   half-repaired.
2. **The material vocabulary has collapsed to one word (P5-2, P5-3).** Before any layout moves,
   `--well-bg` must stop being the answer to three different questions. The control tier needs its own
   fill; the specimen tier needs a stage that is *neutral by construction* rather than neutral by
   accident of opacity; and the pane must decide once whether the workspace is chromatic — if it is,
   its children stop being neutral holes; if it is not, it stops carrying seed tint.
3. **The specimen well needs a representation law across its declared domain (P5-4, P5-5).** 1–50 is
   a contract, not an edge case. The slip's block allocation must respond to `colors.length` — a
   count-adaptive height or a wrapping grid with a real per-segment floor (the file's own 8%, applied
   to both branches, with the unreachable 0.5% guard deleted) — and the specimen must outweigh its own
   metadata, not the reverse.
4. **The destructive flow needs a survivor (P5-6) and the field needs one truth (P5-13).** The
   inspector the transposition introduces is the natural home for both: it is the surviving owning
   action focus returns to, and it is the one place where "how many exist" and "how many match" can be
   stated without two `v-if`s fifteen lines apart contradicting each other. The status region then
   announces the count that changed, not the invitation.

One architectural move, plus four mechanism replacements. Fifty-one findings are their shadow.
