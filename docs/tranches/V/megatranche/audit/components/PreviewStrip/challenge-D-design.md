# CHALLENGE-D — `PreviewStrip.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was spawned with. The
declaration is explicit, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.**

`PreviewStrip` exists for exactly one reason: to show, truthfully, the colours a menu row will
produce. Measured on the live app in real WebKit at 6× magnification and at the pixel level,
**it does not show them.** In `/atmosphere` light mode every one of the six harmony strips
renders its terminal stop at **1.011–1.124 : 1** against the pixels 2px to its right — a
difference of one to three sRGB levels. In `/generate` light mode the entire *Pastel* preview
sits between **1.011 and 1.345 : 1** of its own row. The mitigation the component's own docblock
names for exactly this failure — the F8 inset hairline ring — measures **1.228 : 1** in the
Pastel case and **1.23–1.75 : 1** across the whole light `/atmosphere` menu. The cure is fainter
than the disease.

On top of that: the plate is not the golden plate it declares (measured 2.2886…2.9911 against
φ² = 2.6180, a 31% spread across viewports); it disappears entirely in forced colors, leaving a
50 px phantom indent; its truncation cue is a colour-only alpha ramp on a 5.98 px sliver; and on
`/atmosphere` it buys a **+17.5%** row-height break to occupy **1.49%** of a row it leaves 95%
empty, while contributing nothing at all to the accessibility tree.

Strongest defect: **D-1**.

---

## Why the visual audit never saw this component

`docs/tranches/V/megatranche/audit/visual/REPORT.md` covers 4 matrices × 15 routes = 60
captures. `PreviewStrip` renders **only inside an open `SelectContent`**, which unmounts when
closed (`GenerateControls.vue:88-92` states this explicitly). No route capture in that matrix has
a menu open, so this component has **zero rows** in the shipped visual evidence base — including
the `forced-colors-desktop`, `rtl-desktop` and `zoom-200-desktop` matrices where it fails
hardest. Every frame in this report was captured for this seat.

Second evidence caveat, worth recording for the whole programme: the visual matrix's
`forced-colors-desktop` arm was captured on **WebKit** (`visual/states.mjs:24`,
`{ id: "forced-colors-desktop", ctx: { ..., forcedColors: "active" } }` under
`browserType = webkit`). I re-ran the same emulation on WebKit and the strip's segments still
reported live `oklch(...)` backgrounds and a live `box-shadow` — i.e. **WebKit does not honour the
emulation**, so that whole matrix arm is inconclusive. The forced-colors finding below is
measured on **Chromium**, where `matchMedia("(forced-colors: active)").matches === true` was
verified in-page before measuring.

Subject: `demo/color-session/color-chips/PreviewStrip.vue` (76 lines).
Hosts (exhaustive, `grep -rn "PreviewStrip" demo/`):
`demo/workbenches/generate/GenerateControls.vue:245,274` (route `/generate`) and
`demo/scenes/atmosphere/AuroraPane.vue:132` (route `/atmosphere`).

---

## The evidence base

All probes are preserved at `probes-D/` next to this file; all frames at `frames-D/`.
Dev server `http://localhost:9000`, Playwright 1.60.0, `deviceScaleFactor: 2`.

### E-1 · the golden plate is not golden — rendered ratio sweep

`probes-D/ratio-sweep-forced-rtl.mjs`, WebKit, `/atmosphere` harmony menu and `/generate`
preset menu, measuring `getBoundingClientRect()` on `.preview-strip`:

```
SWEEP atmosphere w=320:  font=14px         h=14.000 w=41.875 ratio=2.9911  (phi^2=2.6180, delta=+14.25%)
SWEEP atmosphere w=390:  font=14px         h=14.000 w=41.875 ratio=2.9911  (delta=+14.25%)
SWEEP atmosphere w=768:  font=14.72px      h=14.719 w=41.875 ratio=2.8450  (delta= +8.67%)
SWEEP atmosphere w=1440: font=16.4px       h=16.391 w=41.875 ratio=2.5548  (delta= -2.41%)
SWEEP atmosphere w=2200: font=18.299999px  h=18.297 w=41.875 ratio=2.2886  (delta=-12.58%)
SWEEP generate   w=320:  font=14px         h=14.000 w=41.875 ratio=2.9911  (delta=+14.25%)
SWEEP generate   w=390:  font=14px         h=14.000 w=41.875 ratio=2.9911  (delta=+14.25%)
SWEEP generate   w=1440: font=16.4px       h=16.391 w=41.875 ratio=2.5548  (delta= -2.41%)
```

Zero of eight measurements equals φ². Total spread **2.2886 … 2.9911 = 30.7%**.

### E-2 · rendered-pixel contrast census — the specimen against its own ground

`probes-D/pixel-capture.mjs` (rects + full-page PNG at DSF 2) → `probes-D/pixel-contrast.py`
(Pillow). Ground = the mean of the **4 px gap immediately to the right of the plate**, same
vertical band. Segments sampled at their inner 50% × 30% to avoid the ring and the corner
radii. Rows scrolled outside the listbox are skipped by an explicit visibility test.

```
===== RENDERED PIXELS · atmo-light =====
  Analogous            ground=[241,226,215] segCR=[3.119, 2.009, 1.319, 1.090] MIN=1.090  ringCR=1.643
  Complementary        ground=[248,224,212] segCR=[3.119, 1.976, 1.270, 1.124] MIN=1.124  ringCR=1.609
  Split Complementary  ground=[247,223,212] segCR=[2.570, 1.916, 1.331, 1.119] MIN=1.119  ringCR=1.652
  Triad                ground=[248,233,216] segCR=[3.322, 1.964, 1.273, 1.028] MIN=1.028  ringCR=1.740
  Tetradic             ground=[212,199,184] segCR=[2.381, 1.389, 1.089, 1.425] MIN=1.089  ringCR=1.231
  Monochrome           ground=[248,234,217] segCR=[3.340, 2.141, 1.412, 1.011] MIN=1.011  ringCR=1.748

===== RENDERED PIXELS · gen-light =====
  Vibrant   segCR=[1.673,1.620,3.196,3.362,1.820] MIN=1.620 MINadj=1.033 ringCR=2.926
  Pastel    segCR=[1.011,1.015,1.317,1.345,1.054] MIN=1.011 MINadj=1.004 ringCR=1.228
  Warm      segCR=[1.344,1.467,3.270,4.058,1.646] MIN=1.344 MINadj=1.092 ringCR=2.769
  Cool      segCR=[1.638,1.859,4.377,4.968,2.105] MIN=1.638 MINadj=1.135 ringCR=3.501
  Earth     segCR=[2.759,2.975,6.211,7.464,3.343] MIN=2.759 MINadj=1.079 ringCR=5.259
  Neon      segCR=[1.355,1.307,2.330,2.287,1.448] MIN=1.307 MINadj=1.019 ringCR=2.276

===== RENDERED PIXELS · gen-dark =====
  Vibrant   MIN=2.153  MINadj=1.121   Pastel MIN=5.128 MINadj=1.038
  Warm      MIN=1.525  MINadj=1.236   Cool   MIN=1.584 MINadj=1.258
  Earth     segCR=[1.577,1.295,1.533,1.259,1.159] MIN=1.159 MINadj=1.184 ringCR=1.183
  Neon      MIN=3.003  MINadj=1.016

===== RENDERED PIXELS · atmo-dark =====
  Analogous MIN=2.280  Complementary MIN=2.358  Split MIN=2.822
  Triad     MIN=2.457  Tetradic      MIN=1.679  Mono  MIN=2.471
```

**22 of the 24 measured chips carry at least one stop below the 3:1 non-text contrast floor.
Seven carry a stop below 1.15:1** — a difference of one to three sRGB levels, i.e. not present.

### E-3 · the F8 ring, measured on its own

`probes-D/ring-contrast.mjs` composites the actual `box-shadow` colour at its own alpha over the
chip's composited ground:

```
=== RING light === ringCss "oklab(0.216129 0.003491 0.005182 / 0.12)" alpha 0.118
                   ground [237,211,217] -> composited [212,189,194]
                   ringVsGroundCR 1.256   ringVsSeg0CR 1.224
=== RING dark  === ringCss "oklab(0.925202 0.002342 0.005724 / 0.12)" alpha 0.122
                   ground [ 81, 67, 58] -> composited [ 99, 87, 78]
                   ringVsGroundCR 1.355   ringVsSeg0CR 1.168
```

Rendered-pixel confirmation (E-2): light `/atmosphere` ring 1.231–1.748; light `/generate`
Pastel ring 1.228; dark `/generate` Earth ring 1.183.

### E-4 · forced colors (Chromium, emulation verified in-page)

`probes-D/ratio-sweep-forced-rtl.mjs`, `forcedColors: "active"`,
`matchMedia("(forced-colors: active)").matches === true`:

```
{"stopCount":5,"rect":{"w":41.875,"h":16.391},"segCount":5,
 "seg0":{"x":259,"w":8.375,"bg":"rgb(255, 255, 255)","mask":"none"},
 "segLast":{"x":292.5,"w":8.375,"bg":"rgb(255, 255, 255)","mask":"none"},
 "boxShadow":"none","forcedAdjust":"auto"}
```

Every segment forced to `rgb(255,255,255)`; the ring erased; `forced-color-adjust` never
declared. Frame: `frames-D/D2-forced-colors-vanished.png`.

### E-5 · truncation geometry at the reachable maximum

Count slider domain is `:min="1" :max="12"` (`GenerateControls.vue:300-302`); cap is
`STRIP_SEGMENT_CAP = 7` (`PreviewStrip.vue:25`). At `count = 12` (`probes-D/states.mjs`):

```
stopCount 12 · segCount 7 · truncated true · segment width 5.984 px each
last segment mask = linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)
all rows: [[12,7,true] × 10]
```

The fade therefore runs from 1.20 px to 5.68 px inside a 5.98 px sliver — a **4.5 px** alpha
ramp. Frame: `frames-D/D5-count12-truncation-light.png`.

### E-6 · `/atmosphere` row rhythm and area share

`probes-D/rtl-forced-rhythm.mjs` (option-row heights in the same pane) and the pixel probe:

```
Palette harmony   (has chip): [51.69, 51.69, 51.69]
Zone arrangement  (no chip):  [44.00, 44.00, 44.00]
Painterly medium  (no chip):  [44.00, 44.00, 44.00]

atmosphere option row: rowW 889.86 · rowH 51.69 · chip 41.875 × 16.39 · chipAreaSharePct 1.49
generate  option row: rowW 262.00 · rowH 55.00 · chip 41.875 × 16.39 · chipAreaSharePct 4.76

first option accessible text: "Analogous "   (the chip contributes nothing)
```

Frame: `frames-D/D6-atmosphere-row-acreage.png`.

### E-7 · RTL

Baseline: reka-ui's `SelectContent` carries a hard `dir="ltr"`, so the popover does not flip
with the document (measured chain, `probes-D/ratio-sweep-forced-rtl.mjs`):

```
htmlDir "rtl" · bodyDir "rtl"
DIV dirAttr="ltr" dirComputed="ltr" class="relative z-popover overflow-hidden rounded-panel ..."
  DIV .interactive-item.glass-menu-row   dirComputed "ltr"
    SPAN.preview-chip.preview-strip      dirComputed "ltr"
```

With that single producer attribute honoured (`probes-D/rtl-forced-rhythm.mjs` sets it to
`rtl`), the strip inverts:

```
dir "rtl" · chip spans x 1161.13 … 1203.00
seg0 x=1197.02  seg1 1191.03  seg2 1185.05 … seg6 x=1161.11
seg6 mask = linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)
```

The flex row reverses (`:last-child` lands at the **left**, x 1161.11 = the strip's outer edge)
while the mask keeps fading **rightward**, i.e. inward. Frame:
`frames-D/D7-rtl-mask-inverted.png`.

### E-8 · the pictures

- `frames-D/D1-atmo-light-monochrome-6x.png` — 6× nearest-neighbour magnification of the
  Monochrome strip. Four stops are painted; three read. The 4th (`oklch(0.95 …)`) survives only
  where a bled-through slider capsule happens to darken the lower third of the plate; over the
  cream half of the same row it is gone. **The inset ring is not visible on any edge.** The
  plate straddles two different backgrounds within its own 16 px height.
- `frames-D/D1-gen-light-pastel-6x.png` — 6× magnification of the Pastel strip. The first
  (peach) stop's left boundary is legible only because of the corner radius; the ring is again
  invisible. Ghost page letterforms run through the row behind and beside the specimen.
- `frames-D/D2-forced-colors-vanished.png` — the whole preset menu in forced colors. Each
  description line begins ~50 px inside its own row with nothing in the reserved space.
- `frames-D/D5-count12-truncation-light.png` — count 12. The faded tail sliver is
  indistinguishable from a genuinely pale terminal stop; on the *Pastel* row it is invisible by
  construction. The page's WatercolorDots, heading and Regenerate button bleed through the menu
  across every row.
- `frames-D/D6-atmosphere-row-acreage.png` — a ~890 px row carrying a 42 px chip and nothing
  else, with three different bled-through backgrounds behind six chips in one menu.

---

## State coverage

Every state this component can occupy, enumerated. A state that was never designed is a design
defect.

| State | Reachable | Handled | Verdict |
|---|---|---|---|
| empty (`stops.length === 0`) | **no** — `generatePalette` returns ≥1 for `count ≥ 1`; `resolveCalibratedAtmosphere(...).palette` is never empty | `v-if` collapses the node | **dead arm** (D-11). The module's "honest absence" law is live for `PreviewRamp` on `/mix` and unreachable here |
| single stop | yes — count slider `min=1` | renders one 42×16 block wearing the palette grammar | **MINOR** (D-9): a strip of one is a swatch |
| populated 2–7 | yes | yes | the only designed arm |
| populated 8–12 | yes (`max=12`) | capped at 7 + tail fade | **BLOCKER-adjacent** (D-5) |
| loading | n/a — synchronous compute | n/a | SOUND |
| error / unpaintable stop | no producer today | none — an invalid string paints `transparent`, silently punching a hole | HYPOTHESIS |
| disabled | `SelectItem` accepts `disabled`; the row applies `data-[disabled]:opacity-disabled` | none | **HYPOTHESIS** (D-10): a colour specimen at reduced alpha misreports its colours |
| focused | never — `aria-hidden`, non-interactive | correct | SOUND |
| hovered / highlighted | yes (`data-highlighted`) | none — measured ground shifts under the highlighted row (`[242,227,216]` vs `[242,221,207]`, E-2) and the chip does not compensate | MINOR, folded into D-1 |
| selected (`data-state="checked"`) | yes | none — the chip that *is* the current selection is pixel-identical to the nine that are not | MINOR (D-12) |
| pressed / dragging | n/a | correct | SOUND |
| row overflow / truncation | yes | `flex: none` holds the plate while the description truncates; measured `overflowX = 0` at 320 px | SOUND |
| RTL | latent (producer forces `dir="ltr"`) | direction-blind physical mask | **MAJOR** (D-7) |
| reduced motion | yes | no motion of any kind | SOUND — negative proof below |
| forced colors | yes | **none** | **BLOCKER** (D-2) |
| zoom 200% | yes | none — halving the CSS viewport drops the caption clamp, moving the plate ratio from 2.555 toward 2.845–2.991 (E-1) | folded into D-3 |
| dark scheme | yes | ring polarity flips; nothing else | **BLOCKER** — dark presets die on the dark ground (Earth min 1.159, E-2) |

---

## Findings

### D-1 · BLOCKER — the specimen is invisible against the surface it is a specimen on; the declared cure is fainter than the disease

**Mechanism.** The chip paints opaque stops directly onto a translucent menu row and relies on a
single **inset** 1 px ring at `--foreground` 12% (`PreviewStrip.vue:63-64`) to separate the whole
plate from that row. Two things follow. First, the ring bounds the *plate*, not the *stops*, so a
stop whose luminance matches the row dissolves into it and the strip silently under-reports its
own length. Second, 12% of the foreground over glass is not a boundary: measured **1.228–1.748 : 1**
in light (E-2, E-3). The docblock's claim — "*an inset hairline ring (`--foreground` 12%) so light
chips survive light glass, dark chips dark glass, and designed color out-ranks accidental
bleed-through (F8)*" (`PreviewRamp.vue:11-12`, the sibling of the same law) — is the exact
proposition the pixels refute.

**Evidence.** E-2, E-3, and `frames-D/D1-atmo-light-monochrome-6x.png`,
`frames-D/D1-gen-light-pastel-6x.png`. Every `/atmosphere` light strip: terminal stop
1.011–1.124 : 1. `/generate` light Pastel: whole chip 1.011–1.345 : 1. `/generate` dark Earth:
whole chip 1.159–1.577 : 1. 22 of 24 chips below 3:1 on at least one stop.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "*Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; a token name is not evidence.*" `§2` material hierarchy
assigns a **specimen well** — "*opaque/quiet neutral stage; the specimen supplies color*" — to
"*image, curve, palette or code artifact*". A palette preview is precisely that species and it has
been placed on the *instrument veil* tier with no well. `PROPORTION-AUDIT.md §5.8`: "*Real
rendered relation wins over token intent.*"

**Reproduction.** `node probes-D/pixel-capture.mjs && python3 probes-D/pixel-contrast.py`.

**Cure (transposition, not patch).** Give the specimen its own well. The plate becomes an
**opaque neutral stage** — the same `surface="opaque"`, `tier="quiet"` material the canon already
mandates for every palette entity Card (`VISUAL-CONSTITUTION.md §3.1`) — with the stops painted
inside it and a **per-stop** hairline (or a 1 px neutral gutter) so adjacent and terminal stops
stay countable regardless of what is behind the menu. That is one shared root, not a ring
constant; see D-8 for where it belongs.

---

### D-2 · BLOCKER — forced colors erases the specimen and leaves a phantom indent

**Mechanism.** The entire payload is `background-color` on child spans. `background-color` is a
forced property in Forced Colors Mode; the plate's only boundary is a `box-shadow`, which is
suppressed. Nothing is declared: `forced-color-adjust` computes to `auto` (E-4).

**Evidence.** E-4 (Chromium, emulation verified): all five segments `rgb(255,255,255)`,
`box-shadow: none`. `frames-D/D2-forced-colors-vanished.png` — the chip is gone and the
description lines begin ~50 px into their rows against nothing. On `/atmosphere` the chip is the
row's **only** content (E-6), so in forced colors the six harmony rows become six identical
labels with a blank second line.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "*Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency*" — the constitution treats forced colors as a
first-class arm, and this component has no arm at all. `PROPORTION-AUDIT.md §5.7`: "*Visual glyph
size, operable target size and layout reservation are separate quantities*" — here the
reservation survives the glyph's death, which is the failure mode that law exists to name.

**Reproduction.** `node probes-D/ratio-sweep-forced-rtl.mjs` (scenario `forced-chromium`).

**Cure.** In forced colors a colour specimen cannot show colour; it must show **structure**. The
well (D-1) supplies a `ButtonBorder`-tier frame that survives, and the stop boundaries become
1 px `CanvasText` rules so the strip still reports *how many* stops there are. If the design
decides colour is the whole point and structure is worthless, then the honest arm is to
**collapse the reservation** (`display: none` under `forced-colors: active`) rather than reserve
50 px for nothing. Either is a decision; `auto` is not.

---

### D-3 · BLOCKER — the golden plate is not golden, at any viewport, and drifts 31%

**Mechanism.** `inline-size: 2.618rem` is **root**-relative; `block-size: 1em` is **locally**
inherited; the local font-size is a `vw`-clamped token (`--type-caption: clamp(0.75rem, 0.71rem +
0.21vw, 1rem)` for `/atmosphere`'s `text-caption` rows). Two axes on two scales cannot hold a
constant ratio. The comment `/* one golden plate — φ² × 1em (F7) */` (`PreviewStrip.vue:59`)
asserts a relation the code cannot express.

**Evidence.** E-1: 2.9911 at 320/390 px (+14.25%), 2.8450 at 768 (+8.67%), 2.5548 at 1440
(−2.41%), 2.2886 at 2200 (−12.58%). Never 2.6180. Browser zoom compounds it: 200% zoom halves the
CSS viewport, so a 1440 px window at 200% renders the ratio the 720 px column does (≈2.85), not
the 2.555 the design was tuned at.

**Canon.** `PROPORTION-AUDIT.md §5.8` verbatim: "*Real rendered relation wins over token intent.
Adjacent rungs, measured rects and ink gaps appear in DELTA; token presence alone cannot close a
row.*" `§1`: "*Every element earns its scale … from its job relative to the local protagonist*" —
a plate whose aspect wanders 31% has no relation to earn.

**Secondary defect in the same line.** `2.618rem` is a hardcoded literal in two files
(`PreviewStrip.vue:59`, `PreviewRamp.vue:43`) while **two** tokens already carry that exact value:
`demo/styles/foundation.css:462` `--phi-4: 2.618rem` and glass-ui's `--space-phi-5: 2.618rem`.
Owner edict 5 (root-level styling) is violated twice over — the value is per-instance, in two
instances, with a design token sitting unused in the same stylesheet tree.

**Reproduction.** `node probes-D/ratio-sweep-forced-rtl.mjs` (the `SWEEP` lines).

**Cure.** One unit system, one token. Express the plate as
`block-size: 1em; inline-size: calc(1em * var(--phi-2))` — then φ² is true by construction at
every clamp arm and every zoom level — and hoist that declaration to the shared root of D-8 so it
exists once. `--radius-sm` has the same disease in miniature: a fixed 4 px radius on a plate whose
height ranges 14 → 18.3 px means the corner character shifts from 28.6% to 21.9% of the height
(D-13).

---

### D-4 · MAJOR — adjacent stops reach 1.002 : 1; the "n hard segments" grammar cannot be counted

**Mechanism.** Segments abut with no separation of any kind (`flex: 1 1 0`, `PreviewStrip.vue:68`).
Two stops that are perceptually close merge into one band, so a 5-colour strip reads as 3.

**Evidence.** E-2 `MINadj`: `/generate` light Pastel **1.004**, Vibrant 1.033, Neon 1.019;
`/generate` dark Neon **1.016**, Pastel 1.038; earlier computed-style census
(`probes-D/model-contrast.log`) recorded Vibrant dark at **1.002**. `/atmosphere` is better
(1.308–1.489) but still far below any counting threshold. `frames-D/D1-gen-light-pastel-6x.png`
shows the effect directly.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "*Selected, failed, pending, withdrawn and disabled
states are never color-only.*" The *number of stops* is the strip's whole semantic payload and it
is conveyed by colour difference alone, with no structural fallback.

**Cure.** Fold into D-1's well: 1 px neutral gutters between stops, which also carries the
forced-colors arm of D-2 for free. One mechanism, three defects closed.

---

### D-5 · MAJOR — the truncation cue is a 4.5 px alpha ramp indistinguishable from data

**Mechanism.** Past the cap the strip fades its 7th sliver
(`mask-image: linear-gradient(90deg, black 20%, transparent 95%)`, `PreviewStrip.vue:73-74`). At
`count = 12` each segment is **5.984 px** wide (E-5), so the whole "continues" signal is a 4.5 px
alpha ramp. A faded stop and a genuinely pale stop are the same picture — and on the *Pastel*
preset, where every stop is already pale and every stop measures ≤1.345 : 1 against the row
(E-2), the cue is invisible by construction.

**Evidence.** E-5 and `frames-D/D5-count12-truncation-light.png`. Counts 8, 9, 10, 11 and 12 —
five of the twelve reachable values — all render byte-identically as *seven* segments with the
same tail fade, so the chip cannot distinguish them.

**Canon.** `VISUAL-CONSTITUTION.md §4.1` again — a *state* (elided) conveyed colour-only.
`PROPORTION-AUDIT.md §5.6`: "*Subtraction precedes explanation.*" The N-4 note in the docblock
(`PreviewStrip.vue:10-16`) rejects the alternative — stepping the plate one width token past
count 8 — to keep "*the description-lane rhythm fixed*". But `/atmosphere` already breaks that
rhythm by +17.5% (D-6), so the rhythm being protected is not actually held.

**Confirmed by a sibling seat.** `challenge-C-implementation.md` §C-1/C-3/C-4 reaches the same
cap through the truth-law route (`data-stops` stamps 12 while the paint carries 7). I record the
design consequence only: **the strip's own stated F5 law — "*the strip a row shows is what
selecting it yields*" (`PreviewStrip.vue:5-7`) — is false for 5 of 12 reachable counts**, and no
visual affordance tells the reader which regime they are in.

**Cure.** Either the plate elongates with the palette (a strip is allowed to be as long as its
data) or the count is reported structurally — a hairline tick per elided stop, or a `+5` numeral —
never an alpha ramp that mimics a colour.

---

### D-6 · MAJOR — `/atmosphere`: a +17.5% row-height tax for a lane that is 100% aria-hidden and 98.5% empty

**Mechanism.** `AuroraPane.vue:130-134` puts the chip alone into `SelectItem`'s `#description`
slot. glass-ui renders that slot as the second child of
`<div class="flex flex-col gap-0.5 min-w-0">` with no wrapper, so a row that uses it gets a whole
extra line of rhythm. The chip is `aria-hidden="true"` (`PreviewStrip.vue:43`), so the lane's
entire content is invisible to assistive technology — measured accessible text of the first
option is exactly `"Analogous "` (E-6).

**Evidence.** E-6: Harmony rows **51.69 px**, Arrangement and Medium rows **44.00 px** in the same
pane, same menu family, +17.5%. Chip area share of the row: **1.49%** on a **889.86 px** row that
carries no other content. Frame `frames-D/D6-atmosphere-row-acreage.png`.

**Canon.** `VISUAL-CONSTITUTION.md §3.2`: "*Empty secondary content occupies at most a narrow
invitation tray (≤15% of the stage) or disappears. It never receives half the viewport.*" A 890 px
row that is 95% empty is the same failure at menu scale. `PROPORTION-AUDIT.md §5.5`: "*A small
icon/mark is either data, status, labeled action, drag affordance, focus/selection register or
removed.*" It is data — but data whose only channel dies in forced colors (D-2) and never reaches
AT, in a lane that costs 7.7 px of vertical rhythm on every row.

**Cure.** On `/atmosphere` the chip is the row's only differentiator, so it should be the row's
**protagonist**, not its footnote: put it in the name lane at the name's optical weight (a
leading plate, `items-center`, one line), and let the harmony's four stops earn their width
against the 890 px available instead of 42 px. That also removes the second line and restores the
44 px rhythm.

---

### D-7 · MAJOR — the truncation mask is direction-blind inside a direction-aware layout

**Mechanism.** The segments are laid out by a `flex` row, which reverses under `direction: rtl`,
so `:last-child` moves to the visual left. The mask is a **physical** `linear-gradient(90deg, …)`,
which does not. The fade therefore points into the strip instead of out of it.

**Evidence.** E-7. Today it is masked by reka-ui's hard `dir="ltr"` on the popover
(measured chain), so the whole menu is LTR inside an RTL document — a producer defect that is
*hiding* this one. With that single attribute honoured, the strip inverts immediately: segments
run x 1197 → 1161, the masked child sits at the strip's outer left edge, and the mask still fades
rightward (`frames-D/D7-rtl-mask-inverted.png`).

**Status.** Reproduced, but **contingent**: it manifests the moment the obvious RTL fix lands on
the producer. Recording it now is the point — a defect that only appears after someone else's cure
is exactly the kind an audit should catch before the cure ships.

**Canon.** `VISUAL-CONSTITUTION.md §6.1`: "*chrome, navigation and layout — logical inline/block
direction follows the document.*" A mask that decorates the layout's logical end must be written
in logical terms.

**Cure.** `mask-image: linear-gradient(to inline-end, …)`, or drop the mask entirely in favour of
D-5's structural cue, which has no direction at all.

---

### D-8 · MAJOR — the design-system boundary: three mints of one primitive, a local "chip" vocabulary, and a token ignored twice

Four distinct breaches of owner edicts 3, 4 and 5, all one mechanism — *the primitive was never
rooted*:

1. **`.preview-chip` is minted twice, in two `scoped` blocks.** `PreviewStrip.vue:56-65` and
   `PreviewRamp.vue:40-49` declare byte-similar rules under the same class name. Because both are
   `scoped`, the shared name is a fiction: neither rule reaches the other component. They have
   already drifted — `PreviewRamp` carries the F7/F8 rationale comment on the ring, `PreviewStrip`
   does not; `PreviewRamp` uses `display: inline-block`, `PreviewStrip` `inline-flex`.
2. **A third mint of the same primitive is imported into the same file.**
   `GenerateControls.vue:16` imports `PaletteColorStrip` and `:20` imports `PreviewStrip`. Both
   are "n colour bands in a clipped box, `aria-hidden`, painted with `background-color`".
   `PaletteColorStrip.vue:44-72` even carries the mechanism `PreviewStrip` most needs — a
   proportional segment sizer with an explicit **8% legibility floor** — while `PreviewStrip`
   lets its segments fall to 5.98 px with no floor at all (E-5).
3. **The name "chip" is already glass-ui's.** glass-ui 7.0.0 exports `./chip` (`Chip`,
   `chipVariants`, `ChipProps` with `mode`/`shape`/`size`/`tone`/`surface`) and owns the
   `.glass-chip` / `.glass-chip--cell` / `.glass-chip--icon` class family. `demo/` mints
   `.preview-chip` with an unrelated meaning. Owner edict 4: "*Glass-ui is the design system … add
   variants/primitives there, not in demo/ui/. Reuse existing component-type names.*" A second
   "chip" vocabulary inside the same document is the collision that edict forbids.
4. **A design token exists for the plate width and is ignored twice.**
   `demo/styles/foundation.css:462` `--phi-4: 2.618rem`; glass-ui `--space-phi-5: 2.618rem`. Both
   chips hardcode `2.618rem`. Owner edict 5: "*style at the … root component level, never
   per-instance overrides.*"

**Evidence.** `grep -rn "2\.618" demo/` (8 hits, two of them these chips);
`node -e "…package.json exports"` shows `./chip`;
`node_modules/@mkbabb/glass-ui/dist/components/chip/{types,chipVariants}.d.ts`.

**Cure.** One primitive, rooted in the design system: a `swatch-strip` (or a `Chip`
`shape="specimen"` variant) in **glass-ui**, owning the well, the per-stop gutters, the
forced-colors arm, the logical-direction elision cue, and the φ² plate expressed in one unit
system. `PreviewStrip`, `PreviewRamp` and `PaletteColorStrip` all become thin domain adapters over
it. That single move closes D-1, D-2, D-3, D-4, D-7 and D-13 at once — which is the tell that it
is the correct altitude.

---

### D-9 · MINOR — a strip of one is a swatch wearing palette clothes

`v-if="stops.length >= 1"` (`PreviewStrip.vue:40`) admits `count = 1`, which the slider reaches
(`:min="1"`). The result is a single 42 × 16 block still wearing the palette grammar — plate
radius, plate ring, the φ² proportion that means "a sequence". `PreviewRamp` sets its floor at
`>= 2` (`PreviewRamp.vue:31`) precisely because one stop is not a ramp; the strip's own floor is
one lower than its meaning. **Reproduction:** `/generate`, drag Color count to 1, open Preset.

### D-10 · MINOR (HYPOTHESIS) — a disabled row would dim a colour specimen

`SelectItem` accepts `disabled` and glass-ui applies `data-[disabled]:opacity-disabled` to the
row, which would composite the specimen's stops toward the row ground. A colour specimen at
reduced alpha reports colours that are not the colours. No host renders a disabled preview row
today, so this is a hypothesis with a named trigger, not a reproduction. The cure is the same
well: `forced-color-adjust`-style isolation — the specimen opts out of row-level opacity, exactly
as the canon isolates the WatercolorDot face from seat state
(`VISUAL-CONSTITUTION.md §4.2`: "*WatercolorDot face delta is `0`*").

### D-11 · INFO — the honest-absence arm is unreachable and therefore unproven

`v-if="stops.length >= 1"` never evaluates false in either host: `generatePalette(count ≥ 1, …)`
always returns ≥1 entry and `resolveCalibratedAtmosphere(…).palette` is never empty. The O-14 e2e
leg's honest-absence test (`e2e/smoke/oracles/o14-preview-truth.spec.ts:334-344`) exercises the
**ramp** on `/mix`, not the strip. The strip's absence policy is therefore asserted in prose and
never rendered.

### D-12 · INFO — the selected row's chip is identical to the nine unselected ones

The chip carries no selection register; the producer's dot in the left gutter is the only marker.
That is defensible (`PROPORTION-AUDIT.md §5.14` wants exactly one marker), but it is worth naming
that the specimen *could* be the register — a selected specimen that reads as "this is the palette
you have" would let the plate earn a second job it currently declines.

### D-13 · INFO — a px radius on an em-scaled plate

`--radius-sm` resolves to a fixed **4 px** (measured). Against a plate height of 14 px it is 28.6%
of the height; against 18.3 px it is 21.9%. The corner character is therefore not scale-invariant,
and at the segment cap the two end segments lose ≈7% of their painted area to the corner arcs
(`(1 − π/4) · 4² · 2 = 6.87 px²` of `5.98 × 16.39 = 98.0 px²`) while interior segments lose none —
so the grammar's promised "equal hard segments" are optically unequal at the ends. Derived
arithmetic, not a separate measurement.

---

## Motion — negative proof

The component animates nothing, and that is correct.

```
$ grep -nE "transition|animation|@keyframes|will-change|transform" demo/color-session/color-chips/PreviewStrip.vue
(no output)
```

No `transition`, no `@keyframes`, no `will-change`, no transformed property. Nothing animates,
so nothing forces layout, and `prefers-reduced-motion` needs no arm — the docblock's "*Static
paint — no motion, PRM-neutral*" (`PreviewRamp.vue:14`) is the one claim in this family that the
render honours. Owner edict 6 (animations are never deleted, only moved or tokenized) is not
engaged: there is no animation to preserve, and none was removed — `git log --oneline -3 --
demo/color-session/color-chips/PreviewStrip.vue` shows one commit (`a61094e3`, a tree move).

The one motion-adjacent observation, recorded and dismissed: the stops recompute reactively while
the menu is open (dragging Color count with the Preset menu open repaints all ten chips), and the
segment **count** changes with it, adding and removing DOM nodes. There is no transition, so the
change is instantaneous and honest; a tokenized cross-fade here would be worse, because a
half-faded colour specimen would be a lying colour specimen.

---

## Negative proofs — what I attacked and found sound

- **Vue 3.5 idiom (edict 7).** `const { stops } = defineProps<…>()` (`:27-30`) is reactive props
  destructure, correct for 3.5. No template ref is needed, so `useTemplateRef` is not applicable.
  No `defineModel`, so the `shallowRef` caveat does not arise.
- **`verbatimModuleSyntax` (edict 8).** Both imports (`:21-22`) are value imports; there is no
  type-only import to mis-declare. Clean.
- **God modules (edict 1).** 76 lines, one job, one exported component. `color-chips/index.ts` is
  a barrel of four symbols. Not a god module.
- **Legacy / compat (edict 2).** No aliases, no shims, no dual paths, no masking fallback. The
  `v-if` floor is a policy, not a fallback.
- **Accessibility of the decoration itself.** `aria-hidden="true"` on a decorative colour plate is
  correct on `/generate`, where the row carries a name and a text description. It is the
  *composition* on `/atmosphere` that is wrong (D-6), not the attribute.
- **Row overflow.** At 320 px the `/generate` preset menu measures `overflowX = 0`
  (`probes-D/rtl-forced-rhythm.mjs`); `flex: none` on the plate plus `min-w-0` on the host wrapper
  truncates the description and never the specimen. Correct priority.
- **Idle cost.** The menu unmounts when closed, so the chips cost nothing at rest; no `pageErrors`
  were raised by any probe on `/generate`. (`/atmosphere` emits `ResizeObserver loop completed
  with undelivered notifications` on open — a pane defect, not this component's.)

---

## The gestalt cure

Everything above is two mechanisms wearing thirteen faces.

| Family | Mechanism | Findings |
|---|---|---|
| **F-α · a specimen with no well** | the colour payload is painted straight onto translucent glass, bounded only by a 12% inset ring, in one channel (`background-color`) with no structural fallback — so it dissolves into light rows, into dark rows, into forced colors, into its own neighbours, and into its own elision cue | D-1, D-2, D-4, D-5, D-10, D-12 |
| **F-β · the primitive was never rooted** | "n colour bands in a clipped plate" is minted three times in two scoped blocks with hardcoded geometry, two unit systems and an unused token — so its law drifts, its proportion is false, and its direction is physical | D-3, D-6, D-7, D-8, D-9, D-11, D-13 |

**The transposition.** Do not patch the ring, the cap or the mask. Root the primitive in glass-ui
as a **specimen strip**: an opaque quiet well (the material tier the canon already assigns to
palette specimens), per-stop hairline gutters that survive forced colors and carry the stop count
structurally, a plate whose two axes share one unit so φ² is true by construction, elision
expressed logically and structurally rather than as a physical alpha ramp, and one exported width
token instead of a literal in two files. Then `PreviewStrip`, `PreviewRamp` and
`PaletteColorStrip` collapse into three domain adapters over one law — which is what
`color-chips/index.ts` already claims to be ("*ONE focused common module for the multi-feature
chip grammar, never a per-pane copy*") and is not.

**Gates a cure must pass.** (1) Every stop of every chip ≥ 3:1 against its rendered ground in both
schemes, measured from pixels, on `/generate` and `/atmosphere`. (2) Every adjacent stop pair
distinguishable by a structural boundary, not by colour difference. (3) `matchMedia("(forced-colors:
active)")` → the strip still reports its stop count, or its reservation collapses. (4) Rendered
`width/height = 2.6180 ± 0.01` at 320, 390, 768, 1440 and 2200 px and at 200% zoom. (5) The
`/atmosphere` harmony row height equals its Arrangement/Medium siblings. (6) `dir="rtl"` honoured
on the popover leaves the elision cue at the logical end. (7) `grep -c "2\.618rem" demo/` returns
0 outside the token definition.

---

## Reproduction index

| Evidence | Command |
|---|---|
| E-1 ratio sweep | `node probes-D/ratio-sweep-forced-rtl.mjs` → the `SWEEP` lines (log: `probes-D/ratio-sweep.log`) |
| E-2 pixel contrast census | `node probes-D/pixel-capture.mjs && python3 probes-D/pixel-contrast.py` |
| E-3 ring contrast | `node probes-D/ring-contrast.mjs` |
| E-4 forced colors | `node probes-D/ratio-sweep-forced-rtl.mjs` (scenario `forced-chromium`) |
| E-5 truncation at count 12 | `node probes-D/states.mjs` (scenario `truncate-12`) |
| E-6 row rhythm / area share | `node probes-D/rtl-forced-rhythm.mjs` (scenario `atmo-rhythm`) |
| E-7 RTL inversion | `node probes-D/rtl-forced-rhythm.mjs` (scenario `rtl-forced`) |
| model-based contrast (superseded by E-2) | `probes-D/model-contrast.log` |

Frames: `frames-D/`. All probes assume the dev server on `http://localhost:9000`.
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `32b4040e`
(the seat brief named `c654824e`; the branch advanced during the session — no source file in
scope changed, `git log -- demo/color-session/color-chips/PreviewStrip.vue` still ends at
`a61094e3`).
