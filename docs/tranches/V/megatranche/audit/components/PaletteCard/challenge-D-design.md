# CHALLENGE-D — PaletteCard: the design is flawed (pass 3, 2026-07-28)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. The tier
was declared explicitly at spawn; the seat is declared, not inherited. No defect on this axis.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/` — six files, 876 lines
(`PaletteCard.vue` 364 · `PaletteCardMenu.vue` 228 · `PaletteCardSwatches.vue` 96 ·
`PaletteRenameInput.vue` 66 · `PaletteCardMeta.vue` 64 · `ActionFeedback.vue` 58),
plus the three siblings that are inseparable from its design and that no prior pass judged:
`PaletteCardGrid.vue` 53 · `PaletteCardSkeleton.vue` 124 · `ShadowPalette.vue` 115.

---

## Provenance — this is pass 3; passes 1 and 2 are preserved verbatim

| Pass | Seat | Preserved at |
|---|---|---|
| 1 | Opus 5, 2026-07-27 | `challenge-D-design.pass-1-2026-07-27.md` (+ two addenda inside it) |
| 2 | Opus 5, 2026-07-28 10:04 | `challenge-D-design.pass-2-2026-07-28.md` |
| **3** | **this seat** | **`challenge-D-design.md`** |

This pass is an **independent adversarial re-run**. It did not begin from either prior report; the
prior reports were read only after the probes had run, to separate corroboration from suggestion.
It differs from both in method:

- pass 1 judged the consumer against the **canon**;
- pass 2 judged the consumer against the **producer's shipped CSS**;
- **pass 3 judges the component against its own rendered DOM, its own container, and its own
  loading/selection/drag/touch/forced-colors arms** — the states nobody had opened.

That method found **eight mechanisms neither prior pass has**, including the root cause of the
owner's ordered-fix mark, and it **corrects one thing pass 2 got right for the wrong reason**.

Where a finding merely confirms a prior pass, it is filed under **Corroborations** with this seat's
own numbers, not re-litigated as new.

---

## Verdict

**DEFECTIVE.** Twenty-one findings; five BLOCKER.

The premise holds, and pass 3 can state it more sharply than either predecessor:

> **The component renders a palette that a screen reader cannot hear, a keyboard cannot reach,
> a forced-colors user cannot see, and a touch user cannot open — and its container is
> contractually forbidden from painting the one decoration it spends its material budget on.**

The strongest defect is **D3-1**: in forced-colors mode the colour strip's five declared colours all
compute to `rgb(255,255,255)`. A palette card renders **one white rectangle**. Every other finding
is downstream of the same root error — the card was designed as a *picture of a palette* rather than
as a *presentation of palette data*, so every mechanism that mediates presentation (AT, keyboard,
forced-colors, containment, loading, selection, drag) was left undesigned.

---

## Method and probe log

**Static.** Full read of the six SFCs plus `PaletteCardGrid.vue`, `PaletteCardSkeleton.vue`,
`ShadowPalette.vue`, `PaletteColorStrip.vue`, `SwatchHoverMenu.vue`, `usePaletteStore.ts`,
`types.ts`, and all five call sites (`PalettesPane.vue`, `BrowsePane.vue`, `ExtractWorkbench.vue`,
`ExtractPane.vue`, `MixSourceSelector.vue`). Canon: `PROPORTION-AUDIT.md` §3/§5,
`VISUAL-CONSTITUTION.md` §2/§3/§3.1/§5/§5.2/§6/§6.1/§7, `PALETTE-CONTRACT.md`. Producer: the
**compiled** `@mkbabb/glass-ui@7.0.0` under `node_modules/@mkbabb/glass-ui/dist/**`.

**Live.** Five Playwright/Chromium probes against the running dev server `http://localhost:9000`,
all committed to this folder with their JSON results:

| Probe | Decides | Results |
|---|---|---|
| `probe-D5.mjs` | field geometry, hover register, dark arm, 390 arm | `probe-D5-results.json` |
| `probe-D5b.mjs` | containment clip, concentricity, expand cost, forced-colors, PRM, 200 %, RTL | `probe-D5b-results.json` |
| `probe-D5c.mjs` | magnified corner witness, forced-colors specimen, Extract arm, drag styles | `probe-D5c-results.json` |
| `probe-D5d.mjs` / `probe-D5e.mjs` | swatch accessible names, rendered swatch DOM | `probe-D5d-results.json` |
| `probe-D5f.mjs` / `probe-D5g.mjs` | swatch hit-testing, tab order, the touch arm | `probe-D5f/g-results.json` |

Fixture: `localStorage["color-palettes"]` seeded with the real store shape
(`{version:1,palettes:[…]}`) reproducing the owner's OM-11 data — `tags:["warm","test","alpha"]`,
`forkCount:3`, `versionCount:4` — plus an empty palette, a 24-colour palette, and a long-name
palette. Viewports 1440 × 1000, 720 × 500 (= 200 % zoom), 390 × 844, and an iPhone 14 touch context.

**Witnesses written this session** (all in `evidence/`, all `p3-` prefixed):
`p3-field-1440-light.png` · `p3-field-1440-dark.png` · `p3-field-390-light.png` ·
`p3-corner-clip-ON.png` · `p3-corner-clip-OFF.png` · `p3-clip-ON.png` · `p3-clip-OFF.png` ·
`p3-field-1440-contain-none.png` · `p3-forced-colors.png` · `p3-forced-colors-strip.png` ·
`p3-expanded-1440.png` · `p3-expanded-detail.png` · `p3-swatch-hover.png` · `p3-drag-ghost.png` ·
`p3-rtl-1440.png` · `p3-zoom200.png` · `p3-touch-swatch-tap.png` · `p3-extract-ghost.png`.

All numbers below are pasted tool output.

---

# Findings

## D3-1 — BLOCKER — In forced-colors mode the palette renders as **one white rectangle**. The specimen is annihilated.

**Evidence** — `probe-D5c.mjs`, `/#/palettes`, `emulateMedia({forcedColors:"active"})`, the strip's
five segments read straight off the live DOM:

```json
"forcedColorsSpecimen": {
  "segs": [
    { "declared": "background-color: rgb(244, 162, 97); width: 20%;", "computedBg": "rgb(255, 255, 255)" },
    { "declared": "background-color: rgb(231, 111, 81); width: 20%;", "computedBg": "rgb(255, 255, 255)" },
    { "declared": "background-color: rgb(42, 157, 143); width: 20%;", "computedBg": "rgb(255, 255, 255)" },
    { "declared": "background-color: rgb(38, 70, 83);  width: 20%;", "computedBg": "rgb(255, 255, 255)" },
    { "declared": "background-color: rgb(233, 196, 106); width: 20%;", "computedBg": "rgb(255, 255, 255)" }
  ],
  "distinctRenderedColors": [ "rgb(255, 255, 255)" ],
  "declaredDistinct": 5
}
```

Visual witness `evidence/p3-forced-colors-strip.png` — a clip of the strip's exact rect at
device-scale 6: a single blank white band with a black outline. Five colours in, one white
rectangle out. `forcedColorAdjust` on both card and segment computes to `auto`
(`probe-D5b-results.json → forcedColors`), so the UA's forced-colors substitution applies in full.

**Mechanism** — `PaletteColorStrip.vue:18-22` paints the specimen with `style.backgroundColor`.
Under forced-colors the UA replaces every author `background-color` with a system colour unless the
element opts out with `forced-color-adjust: none`. The whole point of that opt-out is content
*whose colour is the information* — colour pickers, swatches, syntax legends — and this is the
canonical case. Nothing in the folder declares it. The same applies to the expanded
`WatercolorDot` faces and to the slug chip's `safeFirstColor` border
(`PaletteCardSwatches.vue:10`).

**Reproduction** — `node docs/tranches/V/megatranche/audit/components/PaletteCard/probe-D5c.mjs`;
or Windows High Contrast / macOS Increase Contrast + `forced-colors: active`, then `/#/palettes`.

**Cure (gestalt)** — the specimen is *data*, not chrome. The strip and the swatch faces take
`forced-color-adjust: none` at the **glass-ui `WatercolorDot` / specimen root**, not per instance —
and the surrounding chrome keeps `auto` so it still adopts system colours. This is a producer-owned
declaration on the one species that depicts colour (constitution §2 "Watercolor/data … the only
ornamental color-bearing species"): a **BJ ask**, not a local override. If a palette cannot render
its colours in a high-contrast scheme, it must render its colours *as text* — which the component
also does not do (D3-2).

---

## D3-2 — BLOCKER — The colours are neither controls nor content. `tag="button"` is silently ignored; the swatch ships `aria-hidden` + `pointer-events:none`; an expanded card has exactly **one** tabbable element.

**Evidence** — `probe-D5e.mjs`, expanded card, the first swatch's live `outerHTML`:

```html
<span data-v-292b9032="" aria-hidden="true"
      class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer watercolor-swatch"
      data-testid="watercolor-swatch" data-variant="solid"
      style="background-color: rgb(244, 162, 97);
             border-radius: 37.6874% 22.5954% 40.0695% 64.961% / …;
             pointer-events: none; --watercolor-color: #f4a261; …">
```

`probe-D5f.mjs`, same state:

```json
"swatchTag": "SPAN",  "swatchAriaHidden": "true",  "swatchPointerEvents": "none",
"tabOrder": [ "BUTTON:Palette menu" ]
```

`probe-D5d.mjs` — every `<button>` inside the expanded card, and every accessible name:

```json
"swatchNames": [ { "ariaLabel": "Palette menu", … } ],
"axButtons":   [ { "i": 0, "name": "Palette menu", "text": "" } ]
```

**Mechanism** — three failures stacked, all of them design-level:

1. `SwatchHoverMenu.vue:29-35` writes `tag="button"` on `WatercolorDot`. The compiled glass-ui 7.0.0
   component renders a `<span>`. The prop the consumer relies on to make the swatch a control **does
   not exist in the producer it is built against** — and nothing failed. Same mechanism class as the
   dead `.cartoon-cast` and the dead `--card-press-t` (pass 2 D-5): a glass-6 API the glass-7
   adoption silently dropped.
2. `WatercolorDot` compiles with `inheritAttrs: !1`
   (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`, offset 2548), so the consumer's
   `:aria-label="\`Color swatch ${color}\`"` lands nowhere, and the producer stamps
   `aria-hidden="true"` on the face.
3. `pointer-events: none` is inline on the face. Hit-testing at the swatch centre returns
   `DIV.relative` — the `SwatchHoverMenu` wrapper (`probe-D5f → hitTest`). Hover therefore still
   opens the Teleported panel (`afterHover.floatingPanels: 1`), but the swatch's own
   `@click.stop="$emit('click')"` never fires: clicking the centre changed nothing
   (`afterClick.floatingPanels: 1`, `textLen` 191 → 191). `onSwatchClick`, and with it the whole
   touch-toggle path, is dead code on this build.

Consequence, stated plainly: **a palette card conveys zero colour information to assistive
technology in any state.** The compact strip is `aria-hidden="true"` by the consumer's own choice
(`PaletteColorStrip.vue:4`), and the expanded swatches are `aria-hidden="true"` by the producer's.
The only accessible content on a five-colour palette is its name, the numeral `5`, and
"Palette menu". The colours themselves — the entire subject of the component — are unreachable by
AT and unreachable by keyboard.

**Reproduction** — `node …/probe-D5f.mjs`; or `/#/palettes`, expand a card, press Tab repeatedly:
focus enters and leaves via the `…` menu only.

**Constitution** — §5 card law 5: "A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or **removed**. Decorative controls and operable ornaments
without names are forbidden." §7 Gradient states the correct shape verbatim: "Each WatercolorDot
stop is a **face inside an enclosing geometric button/seat**; that seat alone carries selection,
focus, drag and accessible state." That is exactly the pattern PaletteCard needs and does not have.

**Cure (gestalt)** — stop asking the producer's *face* to be a *seat*. Under the canon shape the
compact strip is "noninteractive data with zero activation/focus/drag semantics"
(constitution §5) — so it stops being `aria-hidden` and instead carries an accessible textual
description of the palette (`aria-label="5 colours: #f4a261, #e76f51, …"` on the strip, or a
visually-hidden list). Per-swatch add/edit/copy leaves the card entirely and lands in the selected
inspector, where each colour is a real named `<button>` wrapping a WatercolorDot **face**. The
producer's `tag` prop being a no-op is a **BJ ask**: either honour it or remove it from the typed
surface so a consumer cannot silently depend on it.

---

## D3-3 — BLOCKER — MT-F036(a) root mechanism: the hard-edged slab is a **paint-containment clip in `PaletteCardGrid`**, not a shadow token in `PaletteCard`.

This is the owner's ordered-fix mark (`OM-11`, `OM-12`). Neither prior pass located the mechanism;
both attributed the hard edge to the cartoon shadow's zero-blur facets. That is only half of it. The
facets are stepped by design; the **hard vertical termination** the owner circled is a clip.

**Evidence** — `probe-D5b.mjs → clip`:

```json
{ "gridContain": "content",  "gridPaddingLeft": "0px",  "gridPaddingBottom": "0px",
  "gridBox":       { "x": 754, "w": 462, "bottom": 842.1 },
  "firstCardBox":  { "x": 754, "w": 462 },
  "lastCardBottom": 842.1,
  "shadowOffsets": [ {"x":-3,"y":3,"blur":0}, {"x":-5,"y":5,"blur":0}, {"x":-7,"y":7,"blur":0} ],
  "shadowExtendsLeftPx": 7,  "shadowExtendsDownPx": 7,
  "leftOverflowPx": -7,      "bottomOverflowPx": -7 }
```

`PaletteCardGrid.vue:50-52` declares `contain: content`, which per CSS Containment L2 is
`layout paint style`; **paint containment clips descendants to the padding box**. The grid has zero
padding and the card is exactly as wide as the grid (`754 === 754`, `462 === 462`), so the card's
`-7px` left shadow facet begins **7 px outside the clip** — and the last card's `+7px` bottom facet
ends 7 px outside it. Every card in the field loses its left facet; the last card also loses its
bottom facet.

**Visual proof** — the same 34 × 34 CSS-px region at the first card's bottom-left corner,
device-scale 6, captured twice in one session, the only difference being
`.palette-card-grid { contain: none }` injected at runtime:

| `evidence/p3-corner-clip-ON.png` (shipping) | `evidence/p3-corner-clip-OFF.png` (containment removed) |
|---|---|
| three shadow bands terminate in a **razor-straight vertical edge**; the corner reads as a stack of rectangular slabs | three **concentric rounded arcs** that follow the card's radius; no hard edge anywhere |

That is the artefact in `OM-12-palette-card-shadow-artifact-closeup.png`, reproduced and switched
off by a one-property change. Wider witnesses: `p3-clip-ON.png` / `p3-clip-OFF.png` and the
full-page `p3-field-1440-contain-none.png`.

**Reproduction** — `node …/probe-D5b.mjs`, then compare the two corner PNGs.

**Cure (gestalt, and it is the canonical one)** — do **not** fix this by deleting the containment.
`contain: content` is a legitimate performance decision for a virtualised-ish list, and removing it
to make room for a decoration inverts the priority. The correct cure is the one the canon already
ruled: **the entity card carries no shadow at all.** Constitution §3.1 freezes the tuple
`{size:"sm", material:"content", tier:"quiet", surface:"opaque", shadow:false, grain:false,
specular:"off"}` and §7 says in words "Saved palettes are **matte specimen slips** inside a glass
workspace, **not cartoon casters stacked within casters**." `PROPORTION-AUDIT.md` PR-05 already
carries the terminal verb: "Dividers, **caster shadows** and corner marks repeat a boundary →
**REMOVE**." With `shadow:false` the clip has nothing to clip, the owner's artefact is
structurally impossible, and no producer change is needed for this half of the mark.

The finding to carry forward is the *class*: **a component drew a decoration its own container is
contractually forbidden from painting, and no gate noticed.** Any future consumer that adds an
outward shadow inside `.palette-card-grid` reproduces this exactly.

---

## D3-4 — BLOCKER — MT-F036(b): **zero** hover, press or focus rules in the entire document match this element.

**Evidence** — `probe-D5.mjs → hoverRegister`, which walks every `CSSRule` in every reachable
stylesheet, strips the pseudo-class from each selector containing `:hover|:active|:focus`, and tests
`element.matches()` against the card root:

```json
"classList": "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer",
"matchingHoverRules": [],
"cardPressTReaders": [],
"castComputed": { "display": "inline", "position": "static", "boxShadow": "none", "w": 0, "h": 0 }
```

and the empirical confirmation, `probe-D5.mjs → hoverDelta` (computed style before vs. after
`page.hover`):

```json
"identical": true
```

The producer's utility, read out of the shipped CSS
(`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css`):

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

Three declarations. No transition, no `:hover`, no `:active`, no `:focus-visible`. The template's
own comment (`PaletteCard.vue:7-18`) describes a register that does not exist:

> "the `cartoon-surface` atom owns the hover/press choreography (translate/scale on
> `--ease-cartoon-punch` @ `--duration-normal`, shadow bezier md→lg, `:active` squash, 2px border)
> **+ the lagging `.cartoon-cast` child below**."

Of that sentence, only "2px border" is true. `.cartoon-cast` (`:30`) matches no rule and computes to
a 0 × 0 inline box. `useLiquidPress` (`:263-267`) writes `--card-press-t`, which has **zero readers**
in the repo or in glass-ui — the producer's caster reads `--cartoon-press-t`. So the card ships a
dead `<span>` and a dead JS spring on every rendered row, and the owner's second mark — "the
interactive container ships NO hover state" — is exact.

**Reproduction** — `node …/probe-D5.mjs`; or hover any card at `/#/palettes` and diff computed style.

**Cure** — this half of MT-F036 is a **marked BJ ask**, per the owner's instruction that a missing
glass variant is never a local patch. Under the canon shape the hover register belongs on the
**named `<button aria-pressed>` seat** the card is supposed to have (constitution §5), not on the
article root — so the ask is: *glass-ui provides a producer-owned resting → hover → pressed →
focus-visible register for the palette-entity selection seat, in the glass motion vocabulary,
PRM-gated at the producer.* Locally: delete `.cartoon-cast`, delete `useLiquidPress`, delete the
comment that describes a dead machine (edict 2, no legacy code).

---

## D3-5 — BLOCKER — At 390 the palette's name renders at **0 px**, and the card reserves **25 px of height** for it anyway.

**Evidence** — `probe-D5.mjs → field_390`, `/#/palettes` at 390 × 844:

```json
{ "label": "Palette: Sunset Ridge", "card": { "w": 324, "h": 125.1 },
  "title": { "w": 0, "h": 61.1, "scrollW": 65, "text": "Sunset Ridge" },
  "rowChildren": [ svg 16, span(title) 0, badge 28.6, fork 20.8, version 20.8,
                   chip 40.2, chip 30.6, chip 40.3 ] }

{ "label": "Palette: A very long palette name that will not fit",
  "card": { "w": 324, "h": 125.1 },
  "title": { "w": 10.3, "h": 61.1, "scrollW": 66 }, … }

{ "label": "Palette: Deep Ocean", "card": { "w": 324, "h": 100 },
  "title": { "w": 115.4, "h": 30.5 }, "rowChildren": [ svg, span 115.4, badge, chip ] }
```

Pass 2 found the 0 px name. This pass adds the part that makes it a *proportion* defect rather than
only a truncation defect: **the title box is 61.1 px tall while rendering 0 px of text**, because
`line-clamp-2 sm:line-clamp-1` (`PaletteCard.vue:55`) reserves two lines below `sm`. The card grows
from 100 px to 125.1 px — a 25 % height increase — to hold nothing. In a stack of identical rows the
result is arrhythmic: 125.1, 100, 100, 100, 125.1, with the taller rows being precisely the ones
whose identity is missing.

**Mechanism** — the identity row (`:43-79`) is one flex line in which every ornament is `shrink-0`
(`:49`, `:64`, `:72`, and all five chip species in `PaletteCardMeta.vue:9,18,27,39,45`) and the title
alone is flexible with no `min-width`. It absorbs 100 % of the deficit. `line-clamp` limits lines,
not width, so it cannot rescue it — it only reserves the height.

**Cure** — as pass 2: the identity is a **row**, not a flex item. Do not add `shrink-0` (that trades
a vanished name for an overflowing card). Under the canon cure the identity lives inside the pressed
seat at `--type-subheading` on its own measure, and the metadata rail moves to the selected
inspector — which also deletes the height reservation, because there is then one line by
construction, not two-below-`sm`.

---

## D3-6 — MAJOR — The loading ghost is **150 px tall with 56 px swatches**; the card it becomes is **100 px tall with no swatches at all**.

**Evidence** — measured, not computed. `probe-D5.mjs → extract` (the live `ShadowPalette` on
`/#/extract`, which shares its entire geometry with `PaletteCardSkeleton`):

```json
"ghostRect": { "w": 462, "h": 150 },
"ghostSwatchDeclared": [ { "w": 56, "h": 56 }, { "w": 56, "h": 56 } ],
"ghostSegCount": 5
```

`probe-D5.mjs → field_1440` and `probe-D5b.mjs → expanded`, the real card in the same 462 px column:

```json
"cards": [ { "card": { "w": 462, "h": 100 } }, × 5 ]
"collapsedHeights": [ 100, 100 ]
```

`probe-D5b.mjs → skeleton`, the two swatch utility strings measured side by side in one document:

```json
{ "skeletonSwatch":    { "w": 56, "h": 56 },   // w-12 h-12 sm:w-14 sm:h-14
  "cardDefaultSwatch": { "w": 40, "h": 40 } }  // w-9  h-9  sm:w-10 sm:h-10
```

So: the ghost is **50 % taller** than the row it resolves into, and its swatches are **40 % larger**
than the card's. Worse, the ghost draws a swatch row *at all* — and the collapsed card has none, so
the depicted third band corresponds to no state the card occupies at rest.
`BrowsePane.vue` renders `<PaletteCardSkeleton v-for="i in 2" variant="developing">` on the
load-more path: **100 px of layout collapses under the user's scroll position** every time a page
lands.

**Mechanism** — `PaletteCardSkeleton.vue:32-80` and `ShadowPalette.vue:41-81` are two independent
hand-transcriptions of `PaletteCard`'s layout. They reproduce its rows (`flex h-10 w-full`,
`px-3 py-2.5`, `px-3 pb-3 flex flex-wrap gap-2`) as literals, and they were calibrated against a
*different* call site: `w-12 h-12 sm:w-14 sm:h-14` is exactly the string
`ExtractWorkbench.vue:150` passes as `swatch-class`. The ghosts model Extract's expanded card;
they ship in Browse's collapsed field. They also disagree with the card on material: both declare
`overflow-hidden shadow-cartoon-sm`, while the card explicitly refuses `overflow-hidden`
(`PaletteCard.vue:16-18`) and carries `shadow-cartoon-md`. Three artefacts, three geometries, one
supposed object.

**Reproduction** — `node …/probe-D5.mjs` (Extract ghost) + `probe-D5b.mjs` (card heights,
swatch utilities); or `/#/browse`, scroll to load-more, watch the rows shrink on settle.

**Cure** — a skeleton is not a drawing of a component; it is **the component in its pending arm**.
The pending state belongs to `PaletteCard` itself (a `state: "pending"` arm rendering the same
boxes with `--skeleton-ink`), so the silhouette cannot drift because there is only one silhouette.
That deletes `PaletteCardSkeleton.vue` and `ShadowPalette.vue` outright — 239 lines — and is the
single largest subtraction available in this folder. Note the constitution already licenses it:
"Request-bound skeletons exist only while real work is in flight" (§7 Palette library), and Extract's
undeveloped plate is explicitly "contextual, not a giant shadow placeholder" (§7 Extract) — a 150 px
ghost for a 100 px card is precisely the giant placeholder the direction forbids.

---

## D3-7 — MAJOR — On a touch device, tapping a palette card **renames** it.

**Evidence** — `probe-D5g.mjs`, Playwright `devices["iPhone 14"]`, `hasTouch: true`, `/#/palettes`,
`locator('[role="article"]').first().tap()` — a single tap at the card's centre:

```json
{ "expanded": 186, "swatchCount": 0 }
```

and the sub-44 px interactive inventory of the resulting card:

```json
[ { "tag": "DIV",    "cls": "badge-atom …",               "w": 32.9, "h": 31.1 },
  { "tag": "BUTTON", "cls": "p-0.5 rounded-sm hover:bg-accent/50 …", "w": 18, "h": 18 },
  { "tag": "BUTTON", "cls": "p-0.5 rounded-sm hover:bg-accent/50 …", "w": 18, "h": 18 } ]
```

Those two 18 × 18 buttons are `PaletteRenameInput.vue`'s Check and X (`:18-30`). `swatchCount: 0`
proves the card did **not** expand. The tap landed on the title span, whose
`@click.stop="editableName && startRenaming()"` (`PaletteCard.vue:58`) both fired and **stopped
propagation**, so the card's own `@click` → `toggleExpand` never ran.

**Mechanism** — the card's activation region is defined by exclusion: the whole `<div>` is
`cursor-pointer` + `@click`, and children opt out with `@click.stop`. The title is one such child,
and it is the visually dominant element in the row — the single most likely tap target. Its only
affordance is `hover:underline decoration-dashed underline-offset-4` (`:56`), which on a coarse
pointer is **never rendered**. A touch user therefore has a large, invisible, unlabelled control
sitting on top of the card's primary action, and discovers it by accident.

Confirms `PROPORTION-AUDIT.md` PR-07 as a live instance: "Hover-only/unlabeled controls … →
ADD-AFFORDANCE / REMOVE", terminal, primary W23.

**Reproduction** — `node …/probe-D5g.mjs`; or open `/#/palettes` on a phone and tap a palette's name.

**Cure** — rename is a lifecycle action; per constitution §5 it belongs in the selected inspector
("Full detail, rename/lifecycle/export actions and durable operation state live in the selected
inspector"). Delete the title's click handler and `PaletteRenameInput.vue` from this folder. The
card's seat then has exactly one meaning everywhere on its surface.

---

## D3-8 — MAJOR — The `aside` layout arm is **unreachable**. A whole variant, its physical-direction radius, and a producer prop exist for a condition that can never be true.

**Evidence** — the complete consumer chain, three greps:

```
$ grep -rn ':layout=\|layout="aside"' demo --include="*.vue"
demo/workbenches/extract/ExtractWorkbench.vue:148:  :layout="layout === 'split' && isWide ? 'aside' : 'default'"

$ grep -rn "<ExtractWorkbench" -A 6 demo --include="*.vue"
demo/workbenches/extract/ExtractPane.vue:11:  <ExtractWorkbench
demo/workbenches/extract/ExtractPane.vue-13-      layout="column"

$ grep -rn "PaletteColorStrip" demo --include="*.vue" -A 6 | grep orientation
PaletteCard.vue-35-  :orientation="layout === 'aside' ? 'vertical' : 'horizontal'"
```

`ExtractWorkbench` has exactly one instantiation and it hard-codes `layout="column"`
(`ExtractPane.vue:13`); its own prop default is also `"column"` (`ExtractWorkbench.vue:204`).
Therefore `layout === 'split'` is never true, therefore `PaletteCard`'s `layout="aside"` never
renders. Confirmed live — `probe-D5c.mjs → extractLTR` on `/#/extract`:

```json
{ "rootDisplay": "block",
  "stripClass": "overflow-hidden flex h-10 w-full rounded-t-card",
  "stripRadius": [ "16px", "16px", "0px", "0px" ] }
```

`display:block`, not `flex`; `w-full` horizontal strip, not the vertical `w-10 h-full`.

Dead surface, itemised: the `layout` prop and its JSDoc (`PaletteCard.vue:192-193`), the `flex` root
arm (`:20`), the `flex-1 min-w-0` body wrapper (`:40`), the `rounded-l-card` branch (`:36`), the
`vertical` orientation branch, and — because `PaletteCard` is the **only** call site that passes
`orientation` — `PaletteColorStrip`'s entire `orientation` prop and both of its ternaries
(`PaletteColorStrip.vue:8-21`).

**Reproduction** — the greps above; and `node …/probe-D5c.mjs`, which drives `/#/extract` and
measures the rendered strip.

**Owner edicts violated** — 2 (no legacy code: dual paths), 3 (KISS, no contrivance). Also
constitution §6.1: `rounded-l-card` is a *physical* direction on chrome, where "logical inline/block
direction follows the document" — so the arm is not merely dead, it is dead **and wrong** (see
D3-15).

**Cure** — delete the arm and the prop. If Extract later wants a horizontal specimen slip, that is a
new composition in Extract's `InstrumentChassis`, not a second personality inside the entity card.

---

## D3-9 — MAJOR — "Selected" is a state the component does not have, so one consumer forks it — and its fork **falsifies the specimen** by dimming it to 75 %.

**Evidence** — `MixSourceSelector.vue:255-267`, the shipping source:

```vue
<button … :class="[
    'cursor-pointer transition-all rounded-card w-full text-left focus-visible:outline-none focus-visible:ring-2 …',
    isPaletteSelected(palette.slug)
        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
        : 'opacity-75 hover:opacity-100',
]" @click="togglePalette(palette)">
    <PaletteCard :palette="palette" :css-color="''" />
</button>
<!-- W5-7: the "N palettes selected" line died — the ring-lit cards ARE the selection state. -->
```

`PaletteCard`'s prop list (`PaletteCard.vue:182-198`) has no `selected`. Its root never changes with
selection — confirmed live, `probe-D5b.mjs → expanded`, after clicking a card:

```json
"rootClassAfterExpand": "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer",
"rootAriaExpanded": null,
"rootAriaPressed": null
```

Meanwhile the producer **already ships** the register, in the same glass-ui the card imports
(`dist/components/card/styles.css`):

```css
[data-variant="selection"] { --selection-accent-strength: 16%; --selection-accent-strength-selected: 28%;
                             --glass-accent-strength: var(--selection-accent-strength); }
[data-variant="selection"][data-selected="true"] { --glass-accent-strength: var(--selection-accent-strength-selected); }
```

**Why this is worse than an ordinary per-instance override.** The unselected arm is `opacity-75`.
Element opacity composites the *entire card, specimen included*, against the ambient field — which
at `/#/mix` is a live chromatic aurora. A `#03045e` swatch at 75 % over a peach ground is not
`#03045e`; it is a lighter, warmer, lower-chroma colour that the user will read as the palette's
colour. The component whose one job is truthful colour is rendered untruthfully, by design, in its
resting state, at one of its five call sites. Constitution §6: "**No path desaturates through gray.
No consumer counter-filter fights a producer reveal.**" §2 tier table: the specimen well is where
"the specimen supplies color".

**Also** — the wrapper is a `<button>` containing `role="article"` plus the card's own `…` menu
button: interactive content nested inside interactive content, which is invalid and makes the inner
menu unreachable by keyboard inside the outer button's activation. (Pass 1's addendum D-24 found the
nesting; the specimen-falsification mechanism is new here.)

**Reproduction** — `/#/mix`, choose the palette source mode, observe unselected cards. Source line
`MixSourceSelector.vue:261`.

**Cure** — selection is a first-class card state and it is already specified: constitution §3.1/§5 —
"Its one native named `<button type="button" aria-pressed="false|true">` child spans specimen/identity
and alone owns activation, visible selection and focus… **Card/face selected pixels remain
unchanged**." That last clause forbids both the ring *and* the dimming: the selected/unselected
difference lives on the seat, never on the specimen. Land the seat in `PaletteCard`; delete the
wrapper button, the ring, and the opacity at `MixSourceSelector`.

---

## D3-10 — MAJOR — Drag is `opacity-30` declared at the call site, with no keyboard path, no announcement, and an unnamed 16 px handle.

**Evidence** — `PalettesPane.vue:183-197`:

```ts
useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onEnd(evt) { … }
});
```

`probe-D5c.mjs → dragStyles` — the document contains **no** rule for any sortable state class, and
the handle's live attributes:

```json
{ "sortableRules": [],
  "handle": { "tag": "svg", "ariaLabel": null, "role": null, "tabIndex": -1, "rect": { "w": 16, "h": 16 } } }
```

`probe-D5d.mjs → dragGhost`, applying the declared ghost class to a real card:

```json
{ "declaredGhostClass": "opacity-30 (PalettesPane.vue:186)",
  "opacityBefore": "1", "opacityAfter": "0.3", "segDeclaredBg": "rgb(244, 162, 97)" }
```

Witness `evidence/p3-drag-ghost.png`.

Four defects in one mechanism:

1. **The drag state is not the card's.** The card's most kinetic state is designed in a `useSortable`
   options object in a pane, as a Tailwind opacity utility. `PaletteCard` cannot know it is being
   dragged and cannot style it.
2. **It desaturates the specimen through transparency** — the same §6 violation as D3-9, three times
   stronger (0.30 vs 0.75).
3. **`animation: 150`** is SortableJS's own tween, ungated by `prefers-reduced-motion`. The house
   has a global PRM guard (`demo/styles/animations.css:184`) that a library-internal transform
   cannot reach.
4. **No keyboard reorder exists at all.** Constitution §5.2 specifies it precisely for this exact
   mechanism — "vertical list/review reorder: after Space grabs, Down=next ordinal, Up=previous …
   every move announces item and `position of total`; Space drops, Escape cancels." The handle is an
   `<svg>` with `tabIndex: -1` and no accessible name, so the grab command has nowhere to live.
   `PROPORTION-AUDIT.md` PR-07 names "invisible drag state" as a terminal row; this is it, measured.

**Reproduction** — `node …/probe-D5c.mjs` / `probe-D5d.mjs`; source `PalettesPane.vue:183-197`,
`PaletteCard.vue:47-50`.

**Cure** — the reorder handle is "a separate named control" (constitution §3.1) that owns its grab,
its ordinal announcement, and its dragging register — inside the card, where the card can style it.
The ghost state is a card arm, not a class string in a pane's options bag.

---

## D3-11 — MAJOR — The field is **one column at every viewport**, so the specimen is an 11.4 : 1 ribbon.

**Evidence** — `probe-D5.mjs → field_1440` / `field_390`:

```json
1440 × 1000 : { "gridTemplateColumns": "462px", "gridGap": "12px", "gridWidth": 462, "contain": "content" }
 390 ×  844 : { "gridTemplateColumns": "324px" }
```

and per card, at 1440:

```json
{ "card": { "w": 462, "h": 100 },  "aspect": 4.62,
  "strip": { "w": 458, "h": 40 },  "stripAspect": 11.4,
  "inkArea": { "w": 125.4, "h": 30.5 },
  "padInline": "0px", "borderRadius": "16px", "cursor": "pointer", "tabIndex": -1 }
```

`PaletteCardGrid.vue:4` is `grid grid-cols-1 gap-3` and nothing ever adds a column: the single
`gridClass` consumer (`BrowsePane.vue:87-90`) passes only
`'transition-opacity duration-fast ' + (sortLoading ? 'opacity-50' : '')`.

At 720 × 500 (= 200 % zoom) the grid is *still* 462 px (`probe-D5b → zoom200`), i.e. the field does
not respond to the viewport at all in the range that matters.

**Why it is a design defect and not a layout preference.** The card has no intrinsic aspect: it is a
full-bleed row whose only fixed dimension is the strip's `h-10`. Give it 462 px and the specimen
becomes 458 × 40 — an 11.4 : 1 rule of five unlabelled bands. Constitution §3.1 calls the Library
protagonist a "field"; §7 calls its members "matte **specimen slips**". A single column of
letterboxes is a table of rules. And the 40 % of the card's height that the specimen occupies is
spent on the least legible possible presentation of five colours.

The same measurement also shows the field's share is wrong: 462 px of a 1440 px viewport = **32 %**,
where constitution §3.1 binds Library to "field at 64 %…66.6666667 % when selected". That half is a
route-composition finding rather than a card finding, and it belongs to the pane seat — recorded
here because the card's aspect is *caused* by it.

**Reproduction** — `node …/probe-D5.mjs`; witness `evidence/p3-field-1440-light.png`.

**Cure** — give the slip an intrinsic aspect and let the field wrap:
`grid-template-columns: repeat(auto-fill, minmax(<slip-min>, 1fr))`. A slip with a
specimen at a *sane* aspect (≈ 3 : 2 rather than 11 : 1) reads as a swatch card, scans in two
dimensions, and stops depending on the pane's width for its identity. This is the same subtraction
as D3-6: one silhouette, defined by the component, not by whatever container it lands in.

---

## D3-12 — MAJOR — In dark mode the card's entire material identity disappears: the shadow ink and the card ground are the **same lightness**.

**Evidence** — `probe-D5.mjs → dark`, `/#/palettes`, `emulateMedia({colorScheme:"dark"})`:

```json
{ "htmlClass": "dark",
  "cardBg":    "oklab(0.345295 0.0103877 0.0175526)",
  "boxShadow": "oklab(0.34 0.0115033 0.0277069 / 0.46) -3px 3px 0px 0px,
                oklab(0.34 0.0115033 0.0277069 / 0.38) -5px 5px 0px 0px,
                oklab(0.34 0.0115033 0.0277069 / 0.26) -7px 7px 0px 0px" }
```

Card L = **0.3453**, shadow ink L = **0.3400**. ΔL = **0.0053** — half a percent. The shadow is
also *lighter* than the plate it falls on, so it reads as a faint halo, not as depth.

Compare light mode (`field_1440`): card `oklab(0.9133 …)`, shadow ink `oklab(0.28 …)` — ΔL = 0.633.

Visual witness `evidence/p3-field-1440-dark.png` beside `p3-field-1440-light.png`: in light the
cards are unmistakably cartoon casters with a three-step drop; in dark they are flat brown pills
with no visible shadow at all. **The component's material identity exists in exactly one scheme.**

This corroborates pass 1's addendum D-26 with the numbers, and reframes it: the issue is not that
the dark shadow is "lighter than it should be" but that the card *has no dark-mode material design*
— the token was carried over and the register silently evaporated.

**Cure** — subsumed by D3-3: `shadow:false` on the canon tuple makes the scheme asymmetry moot, and
the quiet opaque matte slip is defined identically in both schemes by construction.

---

## D3-13 — MAJOR — Expanding costs **71.9 px** and redraws the strip as dots.

**Evidence** — `probe-D5b.mjs → expanded`, one click on the first card:

```json
{ "expandedHeight": 171.9, "collapsedHeights": [ 100, 100 ], "stripStillPresent": true }
```

`probe-D5c.mjs → expandedSwatches`, the same card, comparing the two presentations:

```json
{ "cardH": 171.9, "stripH": 40, "dotSize": { "w": 40, "h": 40 },
  "stripColors": [ "rgb(244,162,97)", "rgb(231,111,81)", "rgb(42,157,143)",
                   "rgb(38,70,83)",   "rgb(233,196,106)" ] }
```

The strip stays; the expansion adds five 40 px dots showing the same five colours in the same order.
72 px of vertical budget — 72 % of a whole card — buys a second rendering of data already on screen.
Its only *new* content is the hover-only add/edit/copy affordance, which D3-2 shows is unreachable by
keyboard and by AT, and which is `pointer-events:none` on its own face.

Independently reproduces pass 1's addendum D-34 (which measured "72 px"), from a different fixture.

**Cure** — constitution §5 is explicit: "The card body owns no expand, inline rename, action menu,
transient result or hover-only swatch-action path." Delete the disclosure; the per-colour actions
live in the selected inspector, at inspector scale, with real buttons.

---

## D3-14 — MINOR — The colour strip's corner is **2.0 px** larger than concentricity allows.

**Evidence** — `probe-D5b.mjs → concentric`:

```json
{ "cardOuterRadius": "16px", "cardBorderWidth": "2px",
  "cardInnerRadiusForConcentricity": "14.0px",
  "stripRadius": "16px", "deltaPx": "2.0", "stripOverflow": "hidden" }
```

The card's inner (content-box) corner is `16 − 2 = 14 px`. The strip declares `rounded-t-card` =
16 px on a box inset 2 px by the border, so its arc bulges past the card's inner arc by exactly one
border-width. Visible in `OM-11` as the light crescent between the strip's corner and the border,
top-left and top-right of every card. Corroborates pass 2 D-6 with the arithmetic.

**Cure** — the interior clip is a consequence of the card refusing `overflow-hidden`
(`PaletteCard.vue:16-18`). Under the canon tuple the slip is a real `<Card>` whose own radius/clip
relationship is producer-owned, and the consumer stops hand-computing corner radii at all.

---

## D3-15 — MINOR — RTL: the shadow does not mirror, and the `aside` strip rounds the wrong edge.

**Evidence** — `probe-D5b.mjs → rtl`, `document.documentElement.dir = "rtl"` at 1440:

```json
{ "dir": "rtl",
  "boxShadow": "… -3px 3px 0px, … -5px 5px 0px, … -7px 7px 0px",
  "cardX": 224, "menuX": 238 }
```

Identical to LTR. The three facets are physical `px` offsets, so under RTL the light source flips
for the mirrored chrome but not for the card — and the facets now fall *toward* the reading edge,
where D3-3's containment clip also lives, so the artefact lands in the most conspicuous place.

The second half is structural: `PaletteCard.vue:36` selects `rounded-l-card` for the `aside` arm — a
**physical** left. Flex direction follows `direction`, so under RTL the vertical strip moves to the
card's right edge while still rounding its left corners: square corners on the outer edge, a rounded
notch in the interior. Currently unobservable only because that arm is dead (D3-8).

Constitution §6.1: "chrome, navigation and layout — logical inline/block direction follows the
document." Witness `evidence/p3-rtl-1440.png`.

---

## D3-16 — MINOR — The `C` padding ladder is 12 px where the canon binds 16 px, and `--card-pad-inline` does not resolve at this element **because the card is not a Card**.

**Evidence** — `probe-D5.mjs → field_1440` / `hoverRegister`:

```json
"padInline": "0px",                    // the article root has no padding at all
"cardPadInline": "",                   // --card-pad-inline is unresolvable at :root
"spacing": "0.25rem"                   // so --spacing(4) = 16px
```

The producer defines the anchor only inside `.card` (`dist/components/card/styles.css`):

```css
.card { --card-pad-inline: calc(var(--spacing) * 6); … }
.card[data-size="sm"] { --card-pad-inline: calc(var(--spacing) * 4); }
```

`= 16px` at `sm`. The component instead hard-codes `px-3` = **12 px** on all four interior rows
(`PaletteCard.vue:43`, `PaletteCardSwatches.vue:6,22`, `PaletteRenameInput.vue:2`) — 75 % of the
bound value, and the five derived Card relations (`--card-pad-block`, `--card-pad-section-gap`,
`--card-pad-footer`, `--card-pad-title-gap`) do not exist here at all.

Constitution §3.1: "Its root anchor is always `C = --card-pad-inline = --spacing(4)`; the five
Card-padding relations derive from that same `C` at every viewport." Corroborates pass 1 §8; the new
part is *why*: the ladder is unreachable, not merely mis-set, because the root is a `<div>` and not a
`<Card data-size="sm">`.

---

## D3-17 — MINOR — `EMPTY_PALETTE_SWATCH` is dead twice over; the empty palette renders a 40 px void.

**Evidence** — `PaletteCard.vue:220-230`:

```ts
const EMPTY_PALETTE_SWATCH = "#888";
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
const safeFirstColor = computed(() => safeCss(firstColor.value));
```

`safeFirstColor` has exactly one consumer — `PaletteCardSwatches.vue:10`, the slug chip — which
renders only when `displaySlug` is truthy, i.e. only when `showSlug` is passed, i.e. only on
`/#/browse`. On `/#/palettes` the constant can never reach a pixel. And on `/#/browse` a remote
palette always has colours, so the `#888` arm cannot be reached there either.

Meanwhile the state it was written for renders as nothing: `PaletteColorStrip` with `colors: []`
emits a `flex h-10 w-full` box with no children. Live: the "Empty" card measures **100 px**, the same
as a five-colour card (`probe-D5 → field_1440`), of which 40 px is blank card ground. Visible in
`evidence/p3-field-1440-light.png` — the "Empty 0" row is a card with a dead band on top.

The comment calls this "the **designed** empty-state swatch". Nothing was designed: the empty arm has
no mark, no invitation, no copy, and no reduced height. Corroborates pass 1 §7 and pass 2 D-16;
the new part is the double-deadness of the constant and the measured 40 px void.

**Cure** — design the arm. Either the empty palette collapses (no specimen band) or the band carries
the `EmptyPaletteMark` the constitution already names — "one static, aria-hidden `EmptyPaletteMark`:
exactly three WatercolorDots plus the established dashes" (§7). Delete the constant either way.

---

## D3-18 — MINOR — The six-file split is by template region, not by seam. It is one object distributed across six files.

The seat's specific charge. Judged by the interface each file needs in order to exist:

| File | Props in | Emits out | Own state | Verdict |
|---|---:|---:|---|---|
| `PaletteCardSwatches.vue` | **8** | **8** | none | **not a component** — a template `<slot>` with 16 wires |
| `PaletteCardMenu.vue` | 5 | 2 | none | boundary is real (a menu is a menu), but it re-encodes the parent's whole action vocabulary |
| `PaletteCardMeta.vue` | 1 | 1 | none | a fragment of five sibling `<span>`s — a template partial |
| `PaletteRenameInput.vue` | 1 | 2 | `localName` | **a real component** |
| `ActionFeedback.vue` | 4 | 1 | `timer` | **a real component** |
| `PaletteCard.vue` | 10 | **17** | 6 refs + 3 composables | the god module |

`PaletteCardSwatches` is the proof: eight props and eight emits, zero state, and the parent must
still own `openPopoverIndex`, `floatingStyle`, `canHover`, `safeFirstColor`, `swatchClass`, and six
handler functions on its behalf. Moving 96 lines out of `PaletteCard.vue` did not reduce
`PaletteCard.vue`'s responsibilities by one; it added a 16-wire interface to maintain. The comments
say so explicitly — `PaletteCard.vue:76-77` calls `PaletteCardMeta` a "colocated lift (T.W5 PP-8
**cap cure**)", i.e. the split was performed to satisfy a line-count cap.

The root still owns: kind derivation, safe-ink certification, slug display, rename state, feedback
state, hover-popover state, menu-open state, press drive, height transition, a 17-emit action bus,
and a `defineExpose({showFeedback})` back-channel that two panes reach into through
`InstanceType<typeof PaletteCard>` ref maps (`PalettesPane.vue:177`, `BrowsePane.vue:209`).

**Against the owner's edicts** — edict 1 (no god modules: "focused modules with **real
encapsulation**") and edict 3 (KISS, no contrivance: wrapper components that earn nothing).
`PaletteCardSwatches` and `PaletteCardMeta` are exactly the "wrapper components that don't exist
yet" the feedback forbids, created after the fact to satisfy a metric.

**Cure** — the seams are not in the template, they are in the **jobs**. Under the canon shape the
object splits into: the *slip* (Card tuple + specimen + identity seat), the *reorder handle*, and
the *inspector* (detail, rename, actions, export, durable operation state). That is three real
boundaries. It deletes `PaletteCardSwatches`, `PaletteCardMeta`, `PaletteRenameInput` and
`ActionFeedback` from this folder rather than re-cutting them, and it takes the 17-emit bus and the
`defineExpose` back-channel with it.

---

## D3-19 — MINOR — The disclosure has no `aria-expanded`; the card announces none of its states.

**Evidence** — `probe-D5b.mjs → expanded`, after clicking a card that is now 171.9 px tall:

```json
{ "rootAriaExpanded": null, "rootAriaPressed": null, "expandedHeight": 171.9 }
```

A `role="article"` with a click handler toggles a 72 px region and exposes no state to AT — neither
`aria-expanded` (the disclosure it actually is) nor `aria-pressed` (the selection it is supposed to
be, per constitution §5). Combined with D3-2, the AT transcript of the entire component is:
`article "Palette: Sunset Ridge"` → `button "Palette menu"`. Nothing else.

---

## D3-20 — MINOR — Under `prefers-reduced-motion` the card still carries a 0.1 s transition, and the expand transition never joins the PRM-guarded family.

**Evidence** — `probe-D5b.mjs → reducedMotion`, `emulateMedia({reducedMotion:"reduce"})`:

```json
{ "transitionDuration": "0.1s", "animationName": "none" }
```

Constitution §6: "Reduced motion resolves **directly to the final geometry** and stable chromatic
state." 0.1 s is small, but it is not zero, and it is unowned — the card's own `<style scoped>` block
declares no transition, so the value arrives from a utility nobody in this folder chose.

The larger half is structural: the rename (`vj-morph`) and feedback (`vj-celebrate`) transitions are
parameterised by geometry custom properties and inherit the global PRM neutralisation
(`demo/styles/animations.css:184`), which is exactly right — but the **expand** transition is six
imperative JS hooks (`PaletteCard.vue:131-138` → `useHeightTransition`) that never joined that
family and animate `height`, a layout-forcing property, on every frame. Corroborates pass 2 D-7.

---

## D3-21 — INFO — The dark specimen well carries measurable chroma, and it sits under the specimen.

**Evidence** — `probe-D5.mjs → dark` / `field_1440`:

| Scheme | `bg-well` computed | OKLab chroma `√(a²+b²)` |
|---|---|---|
| light | `oklab(0.913295 0.00550478 0.0130424)` | **0.0141** |
| dark | `oklab(0.345295 0.0103877 0.0175526)` | **0.0204** |

Constitution §2 tier table: the specimen well is an "opaque/quiet **neutral** stage; the specimen
supplies color", and "Dark chrome uses the restrained neutral pole." A warm-brown ground is not
neutral, and simultaneous contrast shifts the perceived hue of every swatch resting on it — most
visibly for the low-chroma members of a palette. Filed INFO rather than MINOR because the well token
is house-wide and this component is a consumer, not its owner; the number is recorded so the
palette-specimen case is on the record when the well is next ruled.

---

# Corroborations — prior-pass findings this seat independently reproduced

Listed so the register can distinguish *confirmed* from *asserted*. Each was measured by this seat
from its own fixture, before reading the prior report.

| Prior finding | This seat's measurement |
|---|---|
| pass 2 D-1 / pass 1 §2 — the name renders at 0 px on mobile | `titleW: 0, scrollW: 65` at 390 (D3-5), plus the new 25 px reservation |
| pass 2 D-4 — no hover/press/focus register | `matchingHoverRules: []` over every stylesheet; `hoverDelta.identical: true` (D3-4) |
| pass 2 D-5 — `.cartoon-cast` and `--card-press-t` are dead | `display:inline, 0×0, box-shadow:none`; `cardPressTReaders: []` (D3-4) |
| pass 2 D-6 / pass 1 D-25 — non-concentric strip corner | `deltaPx: 2.0` (D3-14) |
| pass 1 §8 — the `C` ladder is violated by 25 % | `px-3` = 12 px vs `--spacing(4)` = 16 px; `--card-pad-inline` unresolvable (D3-16) |
| pass 1 §3 — no keyboard path to any card affordance but the menu | `tabOrder: ["BUTTON:Palette menu"]` on an expanded card (D3-2) |
| pass 1 §7 / pass 2 D-16 — the empty-state swatch never paints | 40 px void, constant unreachable at both call sites (D3-17) |
| pass 1 D-26 — the dark cel shadow is lighter than the surface | ΔL = 0.0053 between card ground and shadow ink (D3-12) |
| pass 1 D-34 — expanding costs 72 px and reveals nothing new | `100 → 171.9` px, identical `stripColors` (D3-13) |
| pass 1 D-24 — a consumer nests the card inside a `<button>` | `MixSourceSelector.vue:255-267`, plus the new opacity mechanism (D3-9) |
| pass 2 D-15 — dead `group` utility | `group` present in `classList`, `matchingHoverRules: []` ⇒ no `group-hover:` consumer exists |
| pass 2 D-18 — unwitnessed by the visual matrix | `REPORT.md` shows `/#/palettes` with 237 chars desktop / 169 mobile and zero seeded palettes; every capture is the empty state |

---

# Corrections

**Correction 1 — to pass 2's "What is genuinely right", item on accessible names.**

> pass 2: *"Accessible names on the icon-only buttons in `PaletteCardSwatches` are present and
> interpolate the colour value."*

True of the **popover action** buttons (Add / Edit / Copy) — but those live inside a `Teleport to
body` panel (`SwatchHoverMenu.vue:35-49`) that is itself `aria-hidden="true"`, so their names reach
no one either. And it is **false of the swatch seats**, which pass 2 did not separate: they render as
`<span aria-hidden="true" pointer-events:none>` with no name at all (D3-2). The correct statement is:
*there is no accessible name on any colour in this component, in any state.*

**Correction 2 — to pass 2's D-3 attribution of the owner's mark.**

Pass 2 attributes MT-F036(a) entirely to the card's own three-facet shadow. The facets are real and
the canon does forbid them, but the **hard-edged termination** the owner circled is produced by
`PaletteCardGrid.vue:50-52`'s `contain: content`, and is switchable off with one property while the
shadow stays (D3-3, with the A/B corner witness). A cure aimed only at `PaletteCard.vue` would have
left the mechanism live for the next consumer that draws outside its box inside that grid.

---

# The owner marks, dispositioned

**MT-F036 (a) — "the card trails a hard-edged faceted shadow slab … ORDERED FIXED at root."**

Root, in two layers, both consumer-side; **no producer change is required for this half**:

1. The **hard edge** is `contain: content` clipping a `-7px / +7px` shadow at the grid's padding box
   (D3-3, proved by an A/B witness). Do not cure by deleting the containment.
2. The **slab** is the card carrying `cartoon-surface` at all. The canon already ruled it out —
   §3.1 freezes `shadow:false`; §7 says "matte specimen slips … not cartoon casters stacked within
   casters"; `PROPORTION-AUDIT.md` PR-05's terminal verb for caster shadows is **REMOVE**.

Land the frozen Card tuple and both layers die together, permanently, because the card stops
painting outside its own box.

**MT-F036 (b) — "the interactive container ships NO hover state; a missing glass variant becomes a
marked BJ ask, never a local patch."**

Confirmed by exhaustive stylesheet enumeration: **zero** matching rules (D3-4). Glass 7.0.0's
`cartoon-surface` is three declarations; the choreography the consumer's comments describe was
dropped in the glass-6 → glass-7 adoption together with `.cartoon-cast`, `--cartoon-press-t`, and —
as this pass found — `WatercolorDot`'s `tag` prop. Filed as a BJ ask below. Locally: delete the dead
`<span>`, the dead spring, and the comments that describe them.

---

# The BJ asks (glass-ui), stated once

1. **An interactive register for the palette-entity selection seat.** Producer-owned
   resting → hover → pressed → focus-visible on the named `<button aria-pressed>` seat (or on `Card`
   when it hosts one), in the glass motion vocabulary, PRM-gated at the producer. (D3-4, D3-9.)
2. **`forced-color-adjust: none` on the colour-bearing species.** `WatercolorDot` faces and any
   producer specimen surface must survive forced-colors, because their colour *is* the data. Chrome
   keeps `auto`. (D3-1.)
3. **`WatercolorDot`'s `tag` prop is a no-op and `inheritAttrs:false` swallows `aria-label`.**
   Either honour `tag` and forward ARIA to the rendered element, or remove `tag` from the typed
   surface so a consumer cannot silently depend on it. A prop that compiles, type-checks, and does
   nothing is the worst of the three. (D3-2.)
4. **The quiet matte slip.** If `{size:"sm", material:"content", tier:"quiet", surface:"opaque",
   shadow:false, grain:false, specular:"off"}` does not read as a matte specimen slip against the
   glass workspace, that is a producer composition question — not a licence for the consumer to draw
   its own shadow. (D3-3.)

Relay per the standing E13 / BH-BI fond.

---

# What is genuinely right

Stated so the indictment is honest, and narrowed from pass 2's list where this seat found otherwise.

- `PaletteRenameInput.vue` and `ActionFeedback.vue` are real components: one responsibility each,
  correct `useTemplateRef` (`:48`), focus-and-select on mount, timer cleanup on re-entry. They are
  in the wrong *place* (D3-18), not wrongly built.
- `PaletteColorStrip`'s weighted-segment logic (`:50-71`) is genuinely good design: an extracted
  palette's population story rides on the palette itself, with an 8 % legibility floor so small
  clusters survive, and no second twin strip. It is the one part of the folder where the specimen is
  treated as data.
- `PaletteCardMenu`'s K-INV5 pattern — disable the doomed action **and name the degraded state
  in-register** rather than firing a toast — is better than most of the product.
- Retiring the local `golden-text-shimmer` keyframe onto glass-ui's `metal-shimmer-sweep`
  (`PaletteCard.vue:60-63`) is edict 6's "moved, not deleted", done correctly.
- The `vj-morph` / `vj-celebrate` families are the right idea, parameterised by geometry custom
  properties at the consumer (`:358-363`, `ActionFeedback.vue:53-57`) and globally PRM-neutralised.
  D3-20's complaint is precisely that the *height* transition never joined them.
- `index.ts`'s named-only re-exports with the tree-shaking rationale (PI-6) is correct and rare.

None of it changes the verdict. The well-made parts are attached to an object the canon says should
not exist in this shape.

---

# Recommended disposition

One **subtraction** wave. Every item below deletes more than it adds.

1. **Transpose the entity slip onto the canon shape.** `<Card size="sm" material="content"
   tier="quiet" surface="opaque" :shadow="false" :grain="false" specular="off">`, noninteractive
   root, one named `<button type="button" aria-pressed>` seat spanning specimen + identity, one named
   reorder handle. Closes D3-3, D3-4, D3-9, D3-12, D3-14, D3-16, D3-19.
2. **Make the specimen legible to everything.** `forced-color-adjust:none` on the colour-bearing
   species (BJ), a real accessible description of the palette's colours on the strip, and the
   producer's `tag`/ARIA gap closed. Closes D3-1, D3-2.
3. **Move expand / rename / menu / export / operation state to the selected inspector.** Closes
   D3-7, D3-13, and deletes four of the six files rather than re-cutting them (D3-18).
4. **Fold the two ghosts into a pending arm of the card itself.** Deletes
   `PaletteCardSkeleton.vue` + `ShadowPalette.vue` (239 lines) and makes the loading→loaded
   silhouette identical by construction. Closes D3-6.
5. **Give the slip an intrinsic aspect and let the field wrap** (`auto-fill / minmax`). Closes
   D3-11; relays the 32 %-vs-64 % field-share half to the pane seat.
6. **Delete the dead surface**: the `aside` arm and `PaletteColorStrip.orientation` (D3-8),
   `EMPTY_PALETTE_SWATCH` (D3-17), `.cartoon-cast` + `useLiquidPress` (D3-4), `group` (corroborated),
   `swatchClass` (replaced by a closed size token). Design the empty arm that D3-17 exposes.
7. **Give the visual matrix a seeded palette fixture** so this component is observable at all, then
   capture forced-colors / RTL / 200 % / keyboard-focus / reduced-motion / touch for the first time.
   Every capture in `audit/visual/shots/**` for `/#/palettes` and `/#/browse` today shows the empty
   state; the component this report is about has never been in the matrix.

**No source edits land from this formation.** Every disposition above is a wave input, not a patch.

---

## Artifacts written by this seat

All under `docs/tranches/V/megatranche/audit/components/PaletteCard/`:

- `challenge-D-design.md` — this report (pass 3)
- `challenge-D-design.pass-2-2026-07-28.md` — the prior pass, preserved verbatim
- `probe-D5.mjs` + `probe-D5-results.json` — field geometry, hover register, dark, 390
- `probe-D5b.mjs` + `probe-D5b-results.json` — containment clip, concentricity, expand, forced-colors, PRM, 200 %, RTL
- `probe-D5c.mjs` + `probe-D5c-results.json` — magnified corner witness, forced-colors specimen, Extract arm, drag
- `probe-D5d.mjs` / `probe-D5e.mjs` + results — swatch DOM and accessible names
- `probe-D5f.mjs` / `probe-D5g.mjs` + results — hit-testing, tab order, the touch arm
- `evidence/p3-*.png` — eighteen witnesses, listed in the probe log above
