# CHALLENGE-D — `PaletteColorStrip.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was
explicitly spawned with. Declared, not inherited.

---

## 0. Subject, surfaces, and what I actually did

| | |
|---|---|
| Subject | `demo/palettes/browser/card/PaletteColorStrip.vue` (72 lines) |
| Consumers (exhaustive, 3) | `PaletteCard.vue:33-37` · `GenerateControls.vue:135` · `MixSourceSelector.vue:203` |
| Routes it appears on | `/#/browse`, `/#/palettes`, `/#/generate`, `/#/mix`, `/#/extract` (aside layout via `ExtractWorkbench.vue:148`) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |

Probes run (all read-only against the live dev server at `http://localhost:9000`, one Playwright
session, torn down):

- geometry + computed-style measurement of the live strip on `/#/generate` and on a real
  `PaletteCard` on `/#/browse`;
- pixel sampling of the card's top-left corner from a device-scale capture;
- a 4-state render probe (empty / near-identical neighbours / k=16 weighted / k=16 equal) built
  from the component's **own** `segmentPcts` formula quoted verbatim from `:50-71`;
- RTL flip measurement;
- press-frame transform capture;
- the component's floor arithmetic re-run in `node`.

Artifacts written beside this report:
`probe-states-4up.png` · `probe-card-full.png` · `probe-corner-tl-x12.png` · `probe-corner-tr-x12.png`

Screenshots read from the tracked matrix:
`visual/shots/safari-desktop-light/{generate,browse}.png`, `safari-desktop-dark/palettes.png`.
Note for the record: **`/#/browse` and `/#/palettes` were captured in their error/empty states**
(`REPORT.md` shows the commons unreachable and "No saved palettes yet"), so the tracked matrix
contains **zero** captures of this component on its two primary routes. The only tracked frame that
renders it at all is `safari-desktop-light/generate.png`. That is itself a coverage hole in the
visual audit for this component; my live probes are the substitute.

---

## 1. Verdict

**DEFECTIVE.** Not by accumulation of nits — by a single load-bearing failure repeated in four
registers: **the strip asserts things about a palette that are not true, and it has no design for
the states in which it says nothing at all.**

It is the sole visual identity of a palette entity on Browse and Library. It is `aria-hidden`. It
therefore has exactly one job — *be a truthful picture of the palette* — and it fails that job:

- it is **erased entirely** under forced colors, while its own sibling specimen survives (§2.1);
- it draws a **41 %-dominant color at 25.5 %** and can never draw dominance above 45.5 % at
  Extract's own maximum k (§2.2);
- it draws **six colors as four visible bands** with no boundary, next to a badge that says 6 (§2.4);
- it draws a **40 px void** for the zero-color palette its own host declares "a real, reachable
  state" (§2.3).

Everything else below is downstream of the same root cause: **there is no design here, only a
`<div>` per color.** The component has no material law, no boundary law, no proportion law, no
motion law, no state law, and no radius law — the radius law is delegated to three consumers who
each solve it differently.

The strongest single defect is **D2 (dominance collapse)** because it is the one where the product
renders a confident, precise, *wrong* number-shaped picture; but **D1 (forced-colors erasure)** is
graded BLOCKER because it is total information loss for a whole user population on the product's
primary entity.

---

## 2. Defects

### D1 — BLOCKER — the strip is missing from the demo's own forced-colors color-display roster; under WHCM a collapsed palette card shows no color at all

`demo/styles/foundation.css:636-700` establishes an explicit, named, two-tier policy and states its
own intent:

> *"the surfaces whose whole PURPOSE is to show a color — the actual content of a color tool — must
> survive WHCM's system-color substitution."* — `foundation.css:655-657`

The roster at `foundation.css:679-696` is:

```
canvas, .spectrum-picker, .gamut-overlay, .atmosphere-canvas, [data-glass-field-canvas],
.gradient-rail, .rail-handle, .readout-rail, .swatch-row > *, .generate-swatch,
.shadow-swatch, .goo-blob-canvas, .watercolor-swatch,
.glass-slider[data-variant="spectrum"] .slider-range, [data-color-surface]
{ forced-color-adjust: none; }
```

`PaletteColorStrip` emits bare `<div>`s carrying only `shrink-0` + `h-full`/`w-full`
(`PaletteColorStrip.vue:13-23`). It matches nothing in the roster and sets no
`data-color-surface` hook. Measured against the live roster selector:

```
stripMatchesForcedColorsRoster: false
segMatchesForcedColorsRoster:   false
stripHasDataColorSurface:       false
strip forcedColorAdjust:        "auto"     ← WHCM will substitute
sibling WatercolorDot (.generate-swatch .watercolor-swatch)
        forcedColorAdjust:      "auto" → but MATCHES the roster ⇒ becomes "none"
```

So on the very same Generate plate, the same five colors **survive as dots and are erased as the
strip**. That is not a policy gap; it is a policy that was written and then not applied to the
largest color surface in the product.

The harm compounds with `aria-hidden="true"` (`:4`). On a **collapsed** palette card the strip is
the *only* color surface — `PaletteCardSwatches` is `v-if="expanded"` (`PaletteCard.vue:139-140`).
So in Windows High Contrast a collapsed Browse/Library card renders: a name, a count badge, a menu
button, and a flat 40 px band of `Canvas`. The palette's content is simultaneously invisible (color
stripped) and unreachable (aria-hidden). `VISUAL-CONSTITUTION.md §4.1` — *"Text, focus, boundaries
and state meet their rendered contrast on the actual material tier; a token name is not evidence"* —
and §4.2's requirement of nonzero deltas in forced colors are both unmet.

**Reproduction.** `/#/browse` with any palette · match the strip root against the
`foundation.css:679-696` selector list → `false`. The tracked matrix cannot show this: the
`forced-colors-desktop` folder contains only `{adminusers, blob, browse, gradient, picker}.png` and
`browse.png` was captured in the commons-unreachable state, i.e. with no cards. **The forced-colors
arm of this component has never been captured.**

**Cure (gestalt, not patch).** The strip is a *color-display surface* by definition; it must declare
itself as one. Stamp `data-color-surface` on the strip root — the roster already has that hook and
it is the one the roster's author designed for exactly this case. That is a one-attribute
transposition that makes the component a member of the register rather than an exception to it. The
patch alternative (adding `.palette-color-strip` to the selector list) grows the roster per
component and is the wrong shape.

---

### D2 — MAJOR — the 8 % legibility floor has no `n` guard; it destroys the dominance story it exists to tell, and the weighted render is visually indistinguishable from the unweighted one

`:47-68` is the whole mechanism:

```ts
const WEIGHT_FLOOR = 0.08;
...
const floored = effective.map((w) => Math.max(Math.max(w, 0) / total, WEIGHT_FLOOR));
const flooredTotal = floored.reduce((sum, x) => sum + x, 0);
return floored.map((x) => (x / flooredTotal) * 100);
```

A per-segment floor of `F` costs at most `F·(n−1)` of budget, but the budget is 1. Once
`F·(n−1) ≳ 1` the floor eats the whole strip and every share renormalizes toward equal. There is no
guard on `n`, no `F = min(0.08, α/n)` adaptation, no truncation, no overflow arm.

Re-running the component's exact formula in `node`:

```
$ node -e '<the formula from PaletteColorStrip.vue:61-67>'

floor binds for uniform palettes at n = 13   (1/n = 0.0769 < 0.08)

n=16, dominant 41% of image, 15 others share 59%
  drawn dominant %: 25.47

hard ceiling — a single color that is 100% of the image:
  n=5   max representable dominance = 75.76%   (truth 100%)
  n=8   max representable dominance = 64.10%
  n=12  max representable dominance = 53.19%
  n=13  max representable dominance = 51.02%
  n=16  max representable dominance = 45.45%   ← Extract's own max k
  n=20  max representable dominance = 39.68%
  n=50  max representable dominance = 20.33%   ← PALETTE-CONTRACT §3 max
```

`ExtractControls.vue:29` sets `:max="16"`. `PALETTE-CONTRACT.md §3` allows **1–50** colors and
`PaletteCard` renders any of them. So:

- at Extract's own maximum k, **a color that is 100 % of the image can never be drawn wider than
  45.45 % of the strip**;
- the "**41 %** of the image" audacious stat that `N.W16.md:384` D3-5 specified to sit beside this
  bar draws as **25.5 %** — the bar and the number on the same card disagree by 15.5 points;
- at n=50 the bar is 20.3 % maximum — effectively flat.

The render probe (`probe-states-4up.png`, rows 3 and 4) is the visual proof: **row 3 (k=16, true
dominance 41 %) and row 4 (k=16, no weights at all) are indistinguishable to the eye.** The entire
weighting apparatus produces a picture identical to the fallback it was built to replace.

`PROPORTION-AUDIT.md §5.8` is binding here: *"Real rendered relation wins over token intent.
Adjacent rungs, measured rects and ink gaps appear in DELTA; token presence alone cannot close a
row."* The `weight` field exists, the arithmetic runs, the rendered relation is false.

**And the mechanism has one dead arm.** The `weights` prop (`:38-44`, six lines of doc comment) has
**zero consumers**:

```
$ grep -rn "PaletteColorStrip" demo/ | grep -v index.ts | grep -v import
demo/workbenches/mix/MixSourceSelector.vue:203:   <PaletteColorStrip :colors="palette.colors" />
demo/workbenches/generate/GenerateControls.vue:135: <PaletteColorStrip :colors="stripColors" class="rounded-t-card" />
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:33: <PaletteColorStrip
$ grep -rn ":weights\|weights=" demo/ | grep -v mix.ts     # (no output)
```

The only `weight` producer is `useExtractSession.ts:88`
(`weight: entry.source.population / total`) writing onto `PaletteColor.weight`, which the `own`
arm reads. The `weights && weights.length === n ? weights : own` ternary at `:54-59` is therefore a
**dual path with a permanently dead arm** — owner edict 2 (no dual paths) and edict 3 (KISS, no
contrivance).

**Reproduction.** Extract with k=16 on an image with one dominant region → the strip's dominant
segment measures 25.5 % of the strip width while the pane's dominance stat reads 41 %. Formula
verification above is deterministic and does not need the image.

**Cure.** Two moves, both subtractive.
1. **Delete the `weights` prop and its ternary.** The population story travels *on the palette*
   (`types.ts:3-10` says so); a second channel with no caller is contrivance.
2. **Replace the constant floor with a budgeted one.** The honest law is: reserve a fixed
   *minimum-ink* fraction of the strip for legibility and distribute the rest proportionally —
   `F = min(0.08, β/n)` with `β` named, or better, split the strip into a *proportional* region and
   a fixed-width *tail rail* for sub-threshold colors. If that cannot be made honest at n=50, the
   correct design answer is the one `PreviewStrip` already reached: **cap and truncate honestly**
   (`PreviewStrip.vue:15-22`, `STRIP_SEGMENT_CAP = 7` + a mask-faded tail that reads as
   "continues"). A silently-flattened bar is worse than an admittedly-truncated one.

---

### D3 — MAJOR — the zero-color palette renders a 40 px void; the state is declared reachable by the host and was never designed

`:50-51`: `const n = colors.length; if (n === 0) return [];` — and `v-for` over an empty array emits
no children. The root `<div>` keeps `flex h-10 w-full overflow-hidden` regardless.

Measured, from the render probe on the live page:

```
row 1 (colors: [])  →  { h: 40, w: 460, children: 0 }
```

`probe-states-4up.png` row 1 is the frame: **40 px of nothing**, indistinguishable from a rendering
failure or from the card simply having a bit of extra padding.

This is not a theoretical state. `PaletteCard.vue:220-223` declares it explicitly and even mints a
named constant for it:

```ts
// S.W2 W2-9: a palette with zero colors is a real, reachable state (a
// freshly-created palette before any swatch). This neutral mid-gray is the
// designed empty-state swatch, named rather than an inline magic literal.
const EMPTY_PALETTE_SWATCH = "#888";
```

— but `EMPTY_PALETTE_SWATCH` feeds only `firstColor` (`:226`), which feeds `safeFirstColor` for ink
contrast. **The strip never sees it.** The card designed an empty-state swatch and then routed it
away from the one surface that shows swatches.

`VISUAL-CONSTITUTION.md §7` (Palette library and Browse) specifies what an empty invitation looks
like — *"one static, aria-hidden `EmptyPaletteMark`: exactly three WatercolorDots plus the
established dashes"* — and the app renders exactly that for the empty *library*
(`safari-desktop-light/palettes.png`, the "EMPTY PLATE" mark). The empty **palette** got nothing.

**Reproduction.** Create a palette and remove all colors (or any code path yielding `colors: []`) →
the card's top band is an empty 40 px rectangle. Directly measured above via the component's own
template semantics rendered live.

**Cure.** The empty arm is a *design*, not a fallback: the strip should render the established
dashed empty register at strip scale — the same dashed-outline vocabulary the "Start a new palette"
row and `EmptyPaletteMark` already use (visible in `safari-desktop-light/palettes.png`) — so an
empty palette reads as *an invitation*, not as a rendering bug. Zero new primitives: reuse the
existing dashed mark species.

---

### D4 — MAJOR — no segment boundary: n colors render as fewer than n bands, contradicting the count badge; the sibling `PreviewStrip` already has the hairline this one lacks

The segments are adjacent `background-color` fills with nothing between them (`:13-23`). Measured on
the live strip: `boxShadow: "none"`, no border, no gap, no outline, no divider.

`probe-states-4up.png` row 2 is the demonstration: **5 colors → 2 visible bands.**
`#3b6ea5 / #3d70a7 / #3f72a9` merge into one blue; `#c94f3d / #cb5140` merge into one red. The card
next to it renders `<Badge>{{ palette.colors.length }}</Badge>` (`PaletteCard.vue:72-74`) reading
**5**. This is precisely the class of palette Extract produces: k-means clusters of a photograph are
routinely within a few ΔE of each other.

The register the tranche already settled makes this a clear miss. The sibling `PreviewStrip` — a
2.618 rem chip, an order of magnitude smaller and less important — carries:

```css
.preview-chip {
    border-radius: var(--radius-sm);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
}
```
(`demo/color-session/color-chips/PreviewStrip.vue`, `.preview-chip`)

The big strip carries none of it. And this exact defect was already filed and never cured:

> *"`D.W6/browse.png` shows four of five cards whose entire `PaletteColorStrip` … With no
> min-contrast floor, a dark palette's …"* — `docs/tranches/N/audit/lanes/C5.md:125-129`
> *"**[P1/F-4]** Add a swatch-boundary hairline to `PaletteColorStrip` so dark …"* — `C5.md:246`

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only."* The strip's whole content is color-only, including its *cardinality*.

**Reproduction.** Row 2 of the probe, rendered live at the strip's real 458 px width with the
component's real class string.

**Cure.** Not a per-segment border (that would eat 1 px × n of the proportional budget and
re-introduce the D2 arithmetic problem). The correct move is the one `PreviewStrip` made: **one
producer-owned inset hairline ring on the container** plus a **hairline seam between segments drawn
as an inset shadow on the segment, not a border** — so segment geometry stays exactly proportional
while the seam is optical. Better still, lift `PreviewStrip`'s `.preview-chip` material into a
shared glass-ui strip primitive and make both strips instances of it (edict 4 — variants belong in
glass-ui; edict 3 — reuse an existing component-type name, `Strip`, do not mint a new one).

---

### D5 — MAJOR — the corner/radius law lives in three different consumers, and one of them re-introduces the exact ancestor-clip artifact `PaletteCard` was rewritten to cure

The component's root emits no radius (`:6-11`). Each consumer solves the corner differently:

| Consumer | strip class (measured live) | who clips |
|---|---|---|
| `PaletteCard.vue:36` | `overflow-hidden flex h-10 w-full rounded-t-card` (or `rounded-l-card` for aside) | the strip itself; card is `overflow: visible` (measured) |
| `GenerateControls.vue:135` | `overflow-hidden flex h-10 w-full rounded-t-card` | the strip itself; plate is `overflow: visible` (measured) |
| `MixSourceSelector.vue:199-203` | `overflow-hidden flex h-10 w-full` — **no radius** | an **ancestor**: `class="rounded-card border border-border/30 overflow-hidden"` |

`PaletteCard.vue:16-18` states the law in a comment on the *consumer*:

> *"NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip rasterizes 1-bit at
> compositing-layer bounds; the strip clips its OWN corners below — an interior clip keeps normal
> AA."*

`MixSourceSelector.vue:199` does the forbidden thing: an ancestor `rounded-card overflow-hidden`
wrapping the strip. The cure that `S.W5-10` landed protects one consumer and not the other, because
**the law was written as a comment on a caller instead of as a property of the component.** That is
owner edict 5 verbatim: *style at the root component level, never per-instance overrides.*

Note also `rounded-l-card` (`PaletteCard.vue:36`) is a **physical**-left radius in Tailwind v4
(`rounded-s-*` is the logical form). In RTL the aside strip flips to the visual right of the card
(measured — see D9) while its radius keeps rounding the left edge, i.e. the *interior* seam. That
arm is not merely unstyled; it is inverted.

**Reproduction.** Live class strings measured above on `/#/generate` and `/#/browse`; the Mix arm is
`MixSourceSelector.vue:199-203` read directly.

**Cure.** Give the component a **`radius` contract of its own** — a prop or, better, a corner
posture derived from `orientation` (`horizontal` ⇒ top corners, `vertical` ⇒ inline-start corners,
using **logical** `border-start-start-radius`/`border-end-start-radius`) resolved from one
`--strip-radius` that defaults to the card radius token. Then delete all three per-instance classes
and the Mix wrapper's `overflow-hidden rounded-card`. One law, one owner, three call sites that stop
knowing about corners.

---

### D6 — MAJOR — the 40 px is a raw literal, isotropic, and non-relational; the strip's share of its host swings 21 %→33 % with no design intent

`:9-10`:

```
orientation === 'vertical' ? 'flex flex-col w-10 h-full' : 'flex h-10 w-full'
```

`h-10`/`w-10` = **40 px**, fixed, at every viewport, in both axes, on every host. Measured live:

| host | card/plate rect | strip rect | strip share of host height |
|---|---|---|---|
| `/#/browse` PaletteCard (collapsed) | 462 × 120 | 458 × 40 | **33.3 %** |
| `/#/extract` PaletteCard | 462.4 × 187.7 | 458.4 × 40.0 | **21.3 %** |
| `/#/generate` specimen plate | 462 × ~300 | 460 × 40 | ~13 % |

Same component, same viewport, three different proportional readings — none of them chosen.
`PROPORTION-AUDIT.md §1` is the standard: *"Every element earns its scale, interval, boundary and
material from its job relative to the local protagonist. The glass-ui golden ladders supply adjacent
rungs; they do not excuse a mechanically large gap, an undersized specimen, or decoration without
information."* 40 px is a Tailwind spacing step, not a rung and not a relation.

It is also not anchored to the card's own module. `VISUAL-CONSTITUTION.md §3.1` fixes the palette
Card's anchor: *"Its root anchor is always `C = --card-pad-inline = --spacing(4)`; the five
Card-padding relations derive from that same `C` at every viewport."* `C = 16 px`; the strip is
`2.5 C`. Not a φ rung (`φ·C = 25.9`, `φ²·C = 41.9`), not a documented ratio, not container-scaled.
`§3.7`: *"Spacing is container-scaled from glass-ui tokens."*

The isotropy is the tell: the same `40` serves as a *height* in the horizontal posture and a *width*
in the vertical one. A band's thickness and a rail's width are different jobs relative to different
protagonists; using one number for both is the absence of a proportion decision.

Contrast, again, with the small sibling that *did* get a law: `PreviewStrip` is
`inline-size: 2.618rem /* one golden plate — φ² × 1em (F7) */; block-size: 1em`.

**Reproduction.** The three live measurements above.

**Cure.** Derive the strip's cross-axis measure from the card anchor: `--strip-thickness:
calc(var(--card-pad-inline) * var(--ratio-phi))` (≈ 25.9 px) or the next glass-ui golden rung, and
let it be **one token expressed once**, with the vertical posture taking its own named rung rather
than reusing the horizontal one. `PROPORTION-AUDIT.md §5.7` is explicit that visual size, target
size and layout reservation are three separate quantities; the strip is non-interactive, so it owes
nothing to the tap-target floor and is free to take its honest optical size.

---

### D7 — MINOR — the strip's corner radius equals the card's *outer* radius instead of the inner one; every palette card shows a ~0.8–1.5 px light crescent at each top corner

Measured live on `/#/browse`:

```
card:  borderRadius 16px, borderTopWidth 2px, overflow visible
strip: borderRadius "16px 16px 0px 0px", inset from card {left: 2, top: 2}
```

An inner element inset by a 2 px border must use `16 − 2 = 14 px` to stay concentric. It uses 16.
Predicted radial excess at the 45° point: strip arc centre `(18,18) r=16` vs border-inner arc
`(16,16) r=14` ⇒ `√2 × (18−16/√2 − (16−14/√2)) ≈ 0.83 px`.

Pixel confirmation from the device-scale capture (card outer corner at `(835, 632.7)`; card-edge
colour is `(208,201,194)`, strip colour is `(224,92,120)`):

```
straight left edge, y=655:   834 bg | 835 edge | 836 edge | 837 COLOR      → 2px of edge
45° diagonal from corner:    k0-3 bg | k4 blend | k5 edge | k6 blend | k7 COLOR
                             → colour begins ≈3.1–3.5px radially in, vs 2px on the straight edge
```

`probe-corner-tl-x12.png` (12× nearest-neighbour) shows it plainly: the light card-edge line reads
as a **wedge** — visibly thicker through the arc than at the straight runs — with a dark speck at
the extreme corner. This is on every palette card in Browse and Library, both schemes.

**Reproduction.** Above; crop artifacts included.

**Cure.** The strip should not hard-code a radius at all (see D5). Once the radius is a component
contract it resolves as `calc(var(--card-radius) - var(--card-border-width))` in one place, and the
concentricity is structural rather than coincidental.

---

### D8 — MINOR — zero motion: the strip hard-cuts on every content change while its own sibling specimen animates

Measured live on both the Generate strip and its segments:

```
transitionDuration: "0s"   (transitionProperty "all" is the CSS initial value, not an author rule)
animationName:      "none"
```

The sibling WatercolorDot on the same plate: `class="... active:scale-95 transition-transform ..."`
(`GenerateControls.vue`, measured class string).

So pressing **Regenerate** on `/#/generate` replaces all five segment colours in one frame — a hard
cut — while the five dots directly beneath it are part of the motion register.
`VISUAL-CONSTITUTION.md §6`: *"Color/opacity effects use the corresponding short effect curve; exit
is shorter than entry"* and *"A scene swap preserves the specimen and changes the surrounding
instrument."* The strip **is** the specimen and it does not preserve anything across the swap.

This is not an edict-6 violation (no animation was deleted — there never was one); it is the absence
of a motion decision on the one surface where the product's core verb ("regenerate", "extract",
"mix") is expressed.

Related, and cheap to fix at the same time: `:key="i"` (`:15`) is an index key. With no transition
it is harmless today; the moment a colour transition or a reorder animation lands
(`VISUAL-CONSTITUTION.md §5.2` makes palette-colour reorder a first-class mechanism) an index key
will animate the *wrong* segment. It should key on the colour's stable identity.

**Reproduction.** Click Regenerate on `/#/generate`; the strip changes with zero interpolation.
Computed styles above.

**Cure.** One tokenised colour transition on the segment (`--animation-slide-sm`-family effect
curve), PRM-collapsed to `0s` by the existing `animations.css:32` register — and key on colour
identity so the transition attaches to the right element. Nothing new is invented; the register
already exists and every neighbour is already in it.

---

### D9 — MINOR — RTL silently reverses the palette's ordinal order; the on-screen strip and the exported SVG then disagree

Measured live (`/#/browse`, real 6-colour card):

```
LTR:  colour #1 at x = 837.0   (leftmost)   … last at x = 1218.6
RTL:  colour #1 at x = 686.7   (rightmost)  … last at x = 305.0
reversed: true            strip has dir attribute: false
```

The strip is a plain `flex` row with no `dir` isolation, so `direction: rtl` reverses it.

`VISUAL-CONSTITUTION.md §6.1` rules: *"palette/release order | preserve explicit ordinal identity; UI
movement announces the resulting ordinal"* and *"CSS strings, hex, slugs, IDs and provenance | render
in LTR-isolated spans inside RTL prose."* Meanwhile the export contract is unconditionally LTR:
`PALETTE-CONTRACT.md` Appendix W51 §6 emits `rect x="0..N-1"` in ascending index. So under RTL the
strip on screen and the SVG the user downloads are mirror images of each other, with no announcement
and no visible cue.

The `rounded-l-card` aside arm compounds it (see D5): the strip flips sides, the radius does not.

**Reproduction.** Set `document.documentElement.dir = "rtl"` on `/#/browse` and read the segments'
`getBoundingClientRect().x` — first colour moves from leftmost to rightmost.

**Cure.** The strip is *scientific/ordinal data*, not chrome. It should carry `dir="ltr"` on its root
so ordinal identity is preserved exactly as the export emits it — the same isolation the constitution
already mandates for hex, slugs and provenance. The *card layout* around it still follows the
document direction; only the ordinal rail is isolated.

---

### D10 — MINOR — the strip is rendered inside the Generate composition, which the constitution does not include it in, duplicating the WatercolorDot specimen

`VISUAL-CONSTITUTION.md §7` (Generate) enumerates the specimen exhaustively:

> *"Preset and harmony expose truthful previews; **WatercolorDots, name, seed provenance and count
> form the specimen**; Regenerate, Save/Publish and Copy live in one Dock control set. … The
> generated palette is a draft specimen, **not a flat strip plus unrelated buttons**."*

`GenerateControls.vue:135` renders `<PaletteColorStrip>` as the plate's face, and
`safari-desktop-light/generate.png` shows the result: **the same five colours appear twice** — as a
40 px flat strip at the top of the plate and as five WatercolorDots 190 px below it. The named
specimen is the dots; the strip is the "flat strip" the composition explicitly rules out.

`MixSourceSelector.vue:203` repeats the pattern: strip, then a `WatercolorDot` row of the same
colours 15 lines later (`:210-220`).

`PROPORTION-AUDIT.md §5.2`: *"A card has one protagonist… Additional equal-weight zones require a
different `InstrumentChassis` composition."* §4 PR-04 disposition for equal companions is **REMOVE**.

For the record and in fairness: the strip **is** constitutionally authorised on Browse/Library cards
— `VISUAL-CONSTITUTION.md §5` says *"the card's compact swatch strip remains noninteractive data with
zero activation/focus/drag semantics."* This finding is scoped to the two workbench consumers.

**Reproduction.** `safari-desktop-light/generate.png` (tracked) — strip at the plate head, dot row
below it, identical colours; `GenerateControls.vue:135` vs `:196-200`.

**Cure.** Remove the strip from the Generate plate and from the Mix source rows; the WatercolorDot
row is the ruled specimen species in both. If a compact single-line preview is genuinely wanted in
the Mix collapsible, `PreviewStrip` is the component that already exists for that job (and
`GenerateControls.vue:20` already imports it) — which is the deeper point: **two strip species are
imported into one file** (`:16` and `:20`) with no rule distinguishing them.

---

### D11 — INFO — three small contrivances

1. **`role="presentation"` is redundant** (`:5`). `aria-hidden="true"` (`:4`) already removes the
   subtree from the accessibility tree; a role on a hidden node has no effect. One of the two is
   noise; `aria-hidden` is the one that does the work.
2. **`Math.max(100 / n, 0.5)` (`:70`) is a dead guard.** `PALETTE-CONTRACT.md §3` caps a palette at
   50 colours, so `100/n ≥ 2` always; the `0.5` arm is unreachable for every valid palette. Edict 3.
3. **The `weights` doc comment (`:38-43`) documents a facility with no caller** — six lines
   describing "T19", "S.W5-6 · F7" and "the pre-T19 behavior". Once D2's cure deletes the prop, the
   comment goes with it. Historical provenance belongs in the tranche ledger, not in a prop doc.

---

## 3. What the component gets right (stated so the negative claims are load-bearing)

- **Vue 3.5 idiom is clean.** Reactive props destructure with defaults (`:31-45`), `computed` for
  derived geometry, no `defineModel`/`shallowRef` hazard because there is no two-way state.
  Edict 7: **pass**.
- **`verbatimModuleSyntax`**: `import type { PaletteColor }` (`:29`). Edict 8: **pass**.
- **No god module** — 72 lines, one job, no side effects, no store reach. Edict 1: **pass**.
- **No legacy shim** in the sense of back-compat aliases. (The dead `weights` arm is contrivance,
  D2, not back-compat.)
- **`aria-hidden` on a decorative rail is correct** *given* that the card's name and count carry the
  entity identity — the fault in D1 is that the colour is then not preserved for the sighted
  high-contrast user either, so both channels fail together.
- **Percentage widths sum cleanly**: measured 6 × 76.33 = 457.98 against a 458 px strip — a 0.02 px
  shortfall, i.e. no visible tail gap. The naive worry here is not a real defect.

---

## 4. Mechanism families (for the arbiter)

| Family | Members | One-sentence root cause |
|---|---|---|
| **Truth** | D2, D4 | the strip renders a confident picture that is arithmetically or optically false |
| **Unowned states** | D1, D3, D9 | empty, forced-colors and RTL were never designed, so each falls through to a raw-`div` default |
| **No component law** | D5, D6, D7 | radius, proportion and corner concentricity are delegated to callers or to Tailwind literals instead of being properties of the component |
| **Register non-membership** | D8, D10, D11 | the strip never joined the motion register, the WatercolorDot specimen register, or the `PreviewStrip` material register that its neighbours all belong to |

---

## 5. The gestalt cure

The four families are one problem: **`PaletteColorStrip` is not a designed species, it is a loop.**
The tranche already contains its correct sibling — `PreviewStrip` — which has a material (inset
hairline ring), a proportion (φ² × 1em), a truncation law, a radius token, and an explicit taste
knob with a name. The strip is bigger, more prominent, and has none of those.

The transposition, in order:

1. **Promote the strip to a real species with a contract**: `thickness` (a golden rung derived from
   the card anchor `C`), `radius` (logical, concentric), `boundary` (inset hairline), `emptyMark`
   (the dashed register), `dir="ltr"` ordinal isolation, `data-color-surface` membership.
2. **Delete the `weights` prop** and replace the constant floor with a budgeted floor or an honest
   cap-and-truncate — whichever the owner rules; both are truthful, the current one is not.
3. **Delete the three per-instance corner classes** and the Mix ancestor clip; the component owns
   its corners.
4. **Remove the strip from Generate and Mix**, where the WatercolorDot row is the ruled specimen and
   `PreviewStrip` is the ruled compact preview.
5. **If steps 1–4 land, the natural terminus is that `PaletteColorStrip` and `PreviewStrip` become
   two postures of one glass-ui `Strip` primitive** — edict 4 (variants belong in glass-ui, reuse
   existing component-type names). That is a producer relay (BH/BI law), not a demo change.

Net effect: the component loses a prop, three consumer classes, one dead branch and one dead guard;
it gains a boundary, an empty arm, a forced-colors arm, an RTL arm, a motion arm and a proportion.
It gets **smaller and more honest** — which is the shape the owner's edicts have been pointing at
this file since `N/audit/lanes/C5.md:246` filed the hairline in the N tranche and nobody closed it.

---

## 6. Evidence index

| Ref | Kind | Location |
|---|---|---|
| E1 | live computed styles + rects, `/#/generate` | §D6, §D8 tables (pasted) |
| E2 | live computed styles + rects, `/#/browse` PaletteCard | §D5, §D6, §D7 |
| E3 | forced-colors roster selector match = `false` | §D1 |
| E4 | `node` re-run of `segmentPcts` (`:61-67`) | §D2 |
| E5 | 4-state render probe | `probe-states-4up.png` |
| E6 | real card, no segment boundaries | `probe-card-full.png` |
| E7 | corner pixel scan + 12× crops | `probe-corner-tl-x12.png`, `probe-corner-tr-x12.png`, §D7 |
| E8 | RTL x-coordinate flip | §D9 |
| E9 | press-frame `scale: 1.0051 0.9743` inline write | §D8 context |
| E10 | tracked Safari matrix | `visual/shots/safari-desktop-light/generate.png`; coverage hole noted in §0 |
