# CHALLENGE-D — `PreviewStrip.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with as an explicit declaration. Not inherited, not a default.

---

## Provenance of this file

A prior CHALLENGE-D seat wrote to this path earlier today (11:46; its probes and frames survive at
`probes-D/` and `frames-D/` and are untouched). This is a **second, independent pass**: I
re-derived the evidence from the live app with my own probes (`probes-D2/`, own captures at
`probes-D2/out/` and `probes-D2/frames/`) before reading anything it concluded, and I report my own
numbers. Where my measurements confirm the earlier seat I say so explicitly — independent
convergence on a different app seed is itself evidence. Where I **correct** it, I say that too:
its headline mechanism for D-1 is wrong in a way that makes the defect *worse*, not better.

Subject: `demo/color-session/color-chips/PreviewStrip.vue` (76 lines).
Hosts, exhaustive (`grep -rn "PreviewStrip" demo/`):
`demo/workbenches/generate/GenerateControls.vue:245,274` (route `/generate`),
`demo/scenes/atmosphere/AuroraPane.vue:132` (route `/atmosphere`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD at capture `f36f780c`
(the brief named `c654824e`; the branch advanced during the session,
`git log --oneline -3 -- demo/color-session/color-chips/PreviewStrip.vue` still ends at
`a61094e3`, a tree move — the component's own bytes are unchanged).

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component's own docblock states its material law: *"`radius-sm`, inset hairline ring"*
(`PreviewStrip.vue:19`), and the sibling that shares its class explains why: *"an inset hairline
ring (`--foreground` 12%) so light chips survive light glass, dark chips dark glass, and designed
color out-ranks accidental bleed-through (F8)"* (`PreviewRamp.vue:11-12`).

**That ring is never painted.** Not faintly — *not at all*. CSS paints an element's inset
box-shadow above its own background but below its in-flow descendants; `PreviewStrip` puts its
entire colour payload into opaque child spans that fill the padding box, so the shadow is occluded
by the component's own content. I proved this with a controlled A/B in the live document, at 4×
device scale, against the identical resolved shadow value: the box whose payload is its own
background shows a clean 4-device-px ring band; the box whose payload is an opaque child shows
**zero** ring pixels. The live component matches the second case in light and in dark, on both
hosts. `PreviewRamp` — same class name, same declaration, same docblock law — *does* get its ring,
because its payload is a background-image on the element itself. Two components claiming one
grammar; one of them has no boundary at all and nobody noticed for a whole tranche.

Everything else follows from a specimen with no boundary and no stage. My own rendered-pixel
census of all 24 visible chips: **22 carry a stop below the 3:1 non-text floor against the row
they sit on; 9 carry a stop below 1.15:1** (a difference of one to three sRGB levels — not
present); **22 carry an adjacent stop pair below 1.5:1**, worst **1.013:1**. On `/atmosphere` light
*all six* harmony chips die at their terminal stop (1.017–1.119:1); in dark the polarity flips and
they die at the *leading* stop instead (1.77–2.80:1 while the tail runs 6.0–8.2:1) — the same paint
read from opposite ends in the two schemes, because there is no scheme-adaptive arm.

And the strip's central truth claim is false. Its docblock promises *"the strip a row shows is what
selecting it yields (seed-exact; O-14's byte-identity law)"* (`:5-7`) and the constitution requires
*"Preset and harmony expose truthful previews"* (`VISUAL-CONSTITUTION.md §7 Generate`). Measured
across the full reachable count domain: **counts 8, 9, 10, 11 and 12 paint a byte-identical
seven-colour set**, and count 7 differs from count 8 only by an alpha mask on a 6.0 px sliver. Six
of twelve reachable states are two pictures.

**Strongest defect: D-1.**

---

## Why the shipped visual audit contains zero evidence of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.md` covers 4 Safari matrices × 15 routes.
`PreviewStrip` renders **only inside an open `SelectContent`**, which reka-ui unmounts when closed
(`MixConfigBar.vue:19-22` states the mechanism outright: *"the chips render only while
SelectContent is mounted (reka unmounts it closed …), so the sampling costs nothing at rest"*). No
capture in that matrix has a menu open. So the component has **no rows** in the shipped evidence
base — including the `forced-colors-desktop`, `rtl-desktop` and `zoom-200-desktop` arms, which are
exactly where it fails. Every frame in this report was captured for this seat
(`probes-D2/menus.mjs`, `probes-D2/forced.mjs`).

This is itself a finding about the audit programme: **any component that lives only in an overlay
is invisible to a route-screenshot matrix**, and this one is not alone (`PaletteCardMenu`,
`MobileMenuDropdown`, `UserSortMenu`, `ColorSpaceSelector` options all share the condition).

---

## The evidence base

Dev server `http://localhost:9000`, Playwright 1.60.0, Chromium. Probes at `probes-D2/`, machine
output at `probes-D2/out/`, frames at `probes-D2/frames/`.

### E-1 · the ring: a controlled A/B in the live document

`probes-D2/ring-occlusion.mjs` injects two boxes into the running `/generate` page so the ring
colour resolves through the same custom properties, with the **identical** declaration
`inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent)`; the only difference is
where the payload lives. `probes-D2/edge-profile.py` prints the pixel column at mid-width,
deviceScaleFactor 4 (1 CSS px = 4 device px):

```
--- C1 CONTROL — payload as background-color ON THE BOX (the PreviewRamp pattern)
    interior             = (210, 121, 47)
    top rows 0..11       = [(187,109,44), (187,109,44), (187,109,44), (187,109,44), (210,121,47), …]
    bottom rows h-1..h-12= [(187,109,44), (187,109,44), (187,109,44), (187,109,44), (210,121,47), …]
    first row equal to interior payload: y=4  (1.00 CSS px from the captured top edge)

--- C2 CONTROL — payload as an opaque CHILD filling the box (the PreviewStrip pattern)
    interior             = (210, 121, 47)
    top rows 0..11       = [(210,121,47) × 12]
    bottom rows h-1..h-12= [(210,121,47) × 12]
    first row equal to interior payload: y=0  (0.00 CSS px from the captured top edge)

--- A LIVE — PreviewStrip, /generate Preset menu, LIGHT
    interior             = (0, 173, 255)
    top rows 0..11       = [(242,228,216), (242,228,216), (0,173,255), (0,173,255), …]   ← 2 rows of
                                                                    page-cream capture bleed, then payload
--- A2 LIVE — PreviewStrip, /generate Preset menu, DARK
    interior             = (99, 101, 232)
    top rows 0..11       = [(84,71,61), (84,71,61), (99,101,232), (99,101,232), …]       ← 2 rows of
                                                                    row-ground bleed, then payload
--- D LIVE — PreviewStrip, /atmosphere Harmony menu, LIGHT
    interior             = (255, 113, 177)
    top rows 0..11       = [(255,113,177) × 12]
```

C1 paints exactly **1.00 CSS px** of ring at every edge. C2 paints **none**. The live component in
both schemes on both hosts matches C2: the payload begins at the border edge, with no intervening
band. Computed style confirms the declaration is live and identical in both cases —
`boxShadow: "oklab(0.216128 0.00350075 0.00518669 / 0.12) 0px 0px 0px 1px inset"` (light),
`"oklab(0.925196 0.00238398 0.00574207 / 0.12) 0px 0px 0px 1px inset"` (dark).

Corroborating picture, at 6× nearest-neighbour magnification (captured by the earlier seat):
`frames-D/D1-atmo-light-monochrome-6x.png` — at 6× a 1 px ring would be a 6 px band; there is no
ring on any edge of that plate. The earlier seat read that frame as *"the ring is too faint"* and
measured the ring's nominal composite at 1.23–1.75:1. That reading is wrong in the component's
favour: **the ring is not faint, it is absent.**

### E-2 · rendered-pixel contrast census, all 24 visible chips

`probes-D2/contrast.mjs` + `probes-D2/contrast.py`. Ground = mean of the 4 CSS px column
immediately right of the plate in the same vertical band; segments sampled at their inner
50% × 40% to avoid the corner radii; rows clipped by the menu's own scroll viewport are excluded
by an explicit intersection test. Full log: `probes-D2/out/contrast.log`.

```
===== gen · light =====
  Vibrant   segVsGround=[2.917, 3.349, 3.732, 1.478, 2.157]  MIN=1.478  MINadj=1.115
  Pastel    segVsGround=[1.328, 1.394, 1.474, 1.013, 1.176]  MIN=1.013  MINadj=1.049
  Warm      segVsGround=[3.146, 3.214, 4.278, 1.132, 1.752]  MIN=1.132  MINadj=1.022
  Cool      segVsGround=[4.171, 4.487, 5.759, 1.522, 2.294]  MIN=1.522  MINadj=1.076
  Earth     segVsGround=[6.472, 6.391, 8.338, 2.457, 3.749]  MIN=2.457  MINadj=1.013
  Neon      segVsGround=[2.114, 2.521, 2.566, 1.290, 1.715]  MIN=1.290  MINadj=1.018

===== atmo · light =====
  Analogous            segVsGround=[3.140, 2.022, 1.328, 1.082]  MIN=1.082  MINadj=1.437
  Complementary        segVsGround=[3.258, 2.064, 1.327, 1.076]  MIN=1.076  MINadj=1.427
  Split Complementary  segVsGround=[2.726, 2.033, 1.411, 1.055]  MIN=1.055  MINadj=1.341
  Triad                segVsGround=[3.345, 1.978, 1.282, 1.021]  MIN=1.021  MINadj=1.309
  Tetradic             segVsGround=[2.638, 1.539, 1.017, 1.286]  MIN=1.017  MINadj=1.308
  Monochrome           segVsGround=[3.018, 1.934, 1.275, 1.119]  MIN=1.119  MINadj=1.427

===== gen · dark =====
  Vibrant MIN=2.264 · Pastel MIN=5.221 · Warm MIN=1.604 · Cool MIN=1.696
  Earth   segVsGround=[1.629, 1.094, 1.381, 2.566, 1.099]  MIN=1.094  · Neon MIN=3.307

===== atmo · dark =====        (the polarity inverts — the tail now carries, the head dies)
  Analogous           segVsGround=[2.247, 3.489, 5.313, 7.636]  MIN=2.247
  Complementary       segVsGround=[2.293, 3.619, 5.630, 8.035]  MIN=2.293
  Split Complementary segVsGround=[2.796, 3.749, 5.400, 8.039]  MIN=2.796
  Triad               segVsGround=[2.397, 4.054, 6.257, 8.188]  MIN=2.397
  Tetradic            segVsGround=[1.768, 3.031, 4.586, 5.999]  MIN=1.768
  Monochrome          segVsGround=[2.091, 3.261, 4.948, 7.060]  MIN=2.091

chips measured                           : 24
chips with a stop < 3.0:1 vs its ground  : 22
chips with a stop < 1.15:1 vs its ground : 9
chips with an adjacent pair < 1.5:1      : 22
```

The earlier seat's independent capture, on a different app seed, reported the same headline —
*"22 of the 24 measured chips carry at least one stop below the 3:1 non-text contrast floor"*
(`challenge-D-design.md` E-2, prior revision, preserved in `probes-D/`). Two independent captures,
two seeds, same result. This is not a seed artefact.

### E-3 · the truth claim across the whole reachable count domain

Count slider domain `:min="1" :max="12"` (`GenerateControls.vue:300-302`); cap
`STRIP_SEGMENT_CAP = 7` (`PreviewStrip.vue:25`). `probes-D2/ring-occlusion.mjs` walks the slider
1→12 and reads both `data-stops` (what the chip *holds*) and every segment's computed
`backgroundColor` (what the chip *paints*). Full data: `probes-D2/out/ring-occlusion.json`.

| count | held | painted | truncated | the painted colours |
|---|---|---|---|---|
| 5 | 5 | 5 | false | `[325.6°, 103.1°, 240.6°, 18.1°, 155.6°]` |
| 6 | 6 | 6 | false | `… + 293.1°` |
| 7 | 7 | 7 | false | `… + 70.6°` |
| 8 | 8 | **7** | true | **identical to count 7** |
| 9 | 9 | **7** | true | **identical to count 7** |
| 10 | 10 | **7** | true | **identical to count 7** |
| 11 | 11 | **7** | true | **identical to count 7** |
| 12 | 12 | **7** | true | **identical to count 7** |

`generatePalette` extends a stable prefix, and `visible` is a **head slice**
(`stops.slice(0, 7)`, `PreviewStrip.vue:33-35`). So counts 8–12 are one picture, and count 7 is
that same picture minus a mask on a 6.0 px sliver. Segment width at the cap: **5.988–6.016 px**.

Pictures: `chip-count5.png`, `chip-count7.png`, `chip-count8.png`, `chip-count12.png` (earlier
seat's crops, re-read by me — 7 and 8 are indistinguishable to the eye).

### E-4 · forced colors, re-measured independently (Chromium, emulation asserted in-page)

`probes-D2/forced.mjs`:

```
{ "emulatedAtLoad": true, "forcedColorsActive": true,
  "reservedRect": { "w": 41.875, "h": 16.391 },
  "boxShadow": "none",
  "forcedColorAdjust": "auto",
  "distinctSegmentColors": [ "rgb(255, 255, 255)" ],
  "segs": [ {"bg":"rgb(255,255,255)","mask":"none","w":8.38} × 5 ],
  "stopsHeld": 5 }
```

Every segment forced to white; the (already-unpainted) ring erased; **the truncation mask erased
too** (`mask: "none"`), so in forced colors a 12-stop palette and a 5-stop palette are the same
blank rectangle; `forced-color-adjust` never declared. The 41.875 × 16.391 reservation survives
intact. Frame: `probes-D2/frames/forced-colors-gen-preset.png` — every description line starts
~50 px inside its own row against nothing.

### E-5 · proportion and the typographic anchor

`probes-D2/lane-type.mjs` (`probes-D2/out/lane-type.json`):

```
/#/generate@1440   chip 41.923 × 16.292  ratio 2.5731   chip font-size 16.4px
                   copy .text-micro 11px Plus Jakarta Sans   chipH/copyFont = 1.481
                   name .font-display  16.4px  Fraunces  weight 400
                   chip's font-size inherited from: "max-h-[inherit] overflow-y-auto px-(--overlay-pad-inline)"
/#/atmosphere@1440 chip 42.117 × 15.890  ratio 2.6505   chip font-size 16.4px
                   copy (no class) 16.4px  chipH/copyFont = 0.969
/#/generate@390    chip 41.923 × 13.916  ratio 3.0126   chip font-size 14px, copy 11px
/#/atmosphere@390  chip 41.932 × 13.900  ratio 3.0166   chip font-size 14px, copy 14px
```

φ² = 2.6180. Measured **2.5731 … 3.0166**, a **17.1%** spread; the `/generate` desktop arm misses
by −1.7%, the mobile arms by +15.1%. The earlier seat's wider sweep (`probes-D/ratio-sweep.log`,
320/390/768/1440/2200 px) found **2.2886 … 2.9911**, a 30.7% spread and zero exact hits — the same
disease measured over a wider domain.

The mechanism: `inline-size: 2.618rem` is **root**-relative, `block-size: 1em` is **locally
inherited** (`PreviewStrip.vue:59-60`). Two axes on two scales cannot hold a constant ratio. And
the `1em` is inherited from the popover's **scroll container**, not from any text role in the
lane — on `/generate` the copy the chip is declared to "join the description line" with is
`text-micro` at **11px**, so the plate stands **1.481×** the font-size of its own line's copy.

### E-6 · `/atmosphere` row rhythm and area share

Two runs of my own (`probes-D2/out/ring-occlusion.json`, `probes-D2/out/lane-type.json`):

```
Harmony rows (chip present)      : h = 50.14 … 51.54   w = 890.45 … 895.01
Arrangement rows (no chip)       : h = 43.33            (same pane, same menu family)
delta                            : +15.7% … +18.9%
chip                             : 41.9 × 16.3   →  chipAreaSharePct = 1.49
accessible name of the first row : "Analogous"   (the chip contributes nothing)
```

### E-7 · the pictures

All at `probes-D2/frames/`, desktop 1440×900 and mobile 390×844, light and dark, both hosts.

- **`gen-preset-desktop-light.png`** — the whole Preset menu. The generated-palette strip, the
  Regenerate button and two watercolor blobs are plainly visible *through* the menu, running
  across the Warm / Cool / Earth rows. Every chip therefore sits on a different, non-uniform,
  moving ground. The Pastel chip's left half dissolves into the cream. The menu also covers the
  very plate it configures, so the "what would selecting yield" comparison the chip exists to
  support cannot be made against the current palette.
- **`atmo-harmony-desktop-light.png`** — an **895 px** row carrying a 42 px chip and a name, with
  the remaining ~95% empty, six times over. All six chips are variants of the same pink/magenta
  family (they derive from the live seed), so *as a discriminator between harmonies — the chip's
  entire job — they are near-identical at this size*. Each one's terminal stop is a near-white
  pink that is gone against the cream (E-2: 1.017–1.119:1).
- **`atmo-harmony-desktop-dark.png`** — the same six chips read from the other end: the pale tail
  now carries and the saturated head recedes. Same paint, inverted reading.
- **`gen-preset-mobile-light.png`** — the best arm. 42 px chip in a 262 px row, aspect 3.01.
  Pastel and Muted still lose their terminal stop into the ground.
- **`forced-colors-gen-preset.png`** — every chip gone, every reservation kept.
- `probes-D2/out/A3-row-light.png`, `A2-row-dark.png` — one row at 3–4× in each scheme. The row
  carries three competing optical weights: a Fraunces display-voice name, a fully saturated
  42 × 16 colour plate, and 11 px muted copy. The plate is the loudest object in a row whose
  protagonist is supposed to be the name. Neither shot shows a hairline at any edge.

---

## State coverage

Every state this component can occupy. A state that was never designed is a design defect.

| State | Reachable | Designed | Verdict |
|---|---|---|---|
| empty (`stops.length === 0`) | **no** — `generatePalette(count ≥ 1, …)` and `resolveCalibratedAtmosphere(…).palette` are never empty | `v-if` collapses the node | **dead arm** (D-12); the module's "honest absence" law is live only for `PreviewRamp` — proven: my `/mix` probe found `.preview-chip` genuinely absent with <2 operands |
| single stop | yes (`:min="1"`) | none — renders one 42 × 16 block in full palette grammar | **MINOR** (D-9) |
| populated 2–7 | yes | yes | the only designed arm |
| populated 8–12 | yes (`:max="12"`) | head-sliced to 7 + tail fade | **BLOCKER** (D-3) |
| loading | n/a, synchronous compute | n/a | SOUND |
| error / unpaintable stop | no producer today | none — an invalid string paints `transparent`, silently punching a hole in the palette | **HYPOTHESIS** |
| disabled | `SelectItem` accepts `disabled`; the glass row applies `data-[disabled]:opacity-disabled` | none | **HYPOTHESIS** (D-14): a colour specimen at reduced alpha reports colours that are not the colours |
| focused | never — `aria-hidden`, non-interactive | correct | SOUND |
| hovered / `data-highlighted` | yes | none — the ground under the highlighted row shifts and the chip does not compensate | folded into D-2 |
| selected (`data-state="checked"`) | yes | none — the chip that *is* the current selection is pixel-identical to the others | **INFO** (D-11) |
| pressed / dragging | n/a | correct | SOUND |
| row overflow / truncation | yes | `flex: none` holds the plate, the description truncates; measured `overflowX = 0` at 320 px (prior seat, `probes-D/rtl-forced-rhythm.mjs`) | SOUND — correct priority |
| RTL | latent (reka's `SelectContent` hard-codes `dir="ltr"`) | direction-blind physical mask | **MAJOR** (D-8) |
| reduced motion | yes | no motion anywhere | SOUND — negative proof below |
| forced colors | yes | **none** | **BLOCKER** (D-4) |
| zoom 200% | yes | none — halving the CSS viewport drops the caption clamp; the plate ratio moves from 2.573 toward 3.01 (E-5) | folded into D-5 |
| dark scheme | yes | ring polarity flips (on a ring that isn't painted) and nothing else | **BLOCKER** — the reading direction inverts (E-2) |

---

## Findings

### D-1 · BLOCKER — the declared boundary does not exist in the pixels

**Mechanism.** CSS paints an element's inset box-shadow above its own background but **below its
in-flow descendants**. `PreviewStrip` declares the ring on the plate (`:63-64`) and then fills the
entire padding box with opaque children (`.preview-strip-segment { flex: 1 1 0; block-size: 100% }`,
`:67-70`), clipped to the same rounded rect by `overflow: hidden`. The ring is therefore occluded
by the component's own payload, everywhere, always. `PreviewRamp` escapes because its payload is
`background-image` on the element itself (`PreviewRamp.vue:35`), so the shadow paints over it.

**Consequence.** The strip has **no boundary of any kind** against the translucent menu row. It is
not that the boundary is weak — there is nothing there. Every failure below that the docblock
claims the ring mitigates is unmitigated.

**Evidence.** E-1: the controlled A/B (C1 = 1.00 CSS px of ring at every edge; C2 = zero) with an
identical resolved shadow value, plus the live component matching C2 in light and dark on both
hosts. `frames-D/D1-atmo-light-monochrome-6x.png` at 6× shows no ring on any edge.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; **a token name is not evidence**."* Here even the token is a
fiction — the declaration exists and paints nothing. `PROPORTION-AUDIT.md §5.8`: *"Real rendered
relation wins over token intent."*

**Reproduction.** `node probes-D2/ring-occlusion.mjs && python3 probes-D2/edge-profile.py
probes-D2/out/C1-bg-on-self.png C1 0.5 probes-D2/out/C2-opaque-child.png C2 0.5`.

**Cure (transposition, not patch).** Do not move the shadow to the children — that mints a second
ring rule and still fails forced colors. Give the specimen the **well** the canon already assigns
it (D-2) and express the boundary as real geometry the payload cannot cover: a 1 px neutral gutter
*between* stops and a 1 px inset frame drawn by the well, so the boundary is a layout fact rather
than a paint order that any future child can eclipse.

---

### D-2 · BLOCKER — a colour specimen with no well, on translucent glass, in one channel

**Mechanism.** `VISUAL-CONSTITUTION.md §2` assigns a **specimen well** — *"image, curve, **palette**
or code artifact | opaque/quiet neutral stage; the specimen supplies color"* — to exactly this
species. `PreviewStrip` has no stage. It paints opaque stops straight onto the **instrument veil**
tier (a translucent menu row over the live ambient field), with the entire semantic payload in one
channel (`background-color`) and — per D-1 — no boundary.

**Evidence.** E-2, all 24 visible chips: **22 with a stop under 3:1; 9 under 1.15:1**; worst stop
1.013:1 (`/generate` light Pastel), worst `/atmosphere` light terminal stop 1.017:1 (Tetradic) with
*all six* rows between 1.017 and 1.119. Worst adjacent pair **1.013:1** (`/generate` light Earth),
with 22 of 24 chips below 1.5:1 on some adjacent pair, so the *number of stops* — the strip's whole
payload — is frequently uncountable. Scheme inversion: `/atmosphere` light dies at the tail
(1.02–1.12), dark dies at the head (1.77–2.80) while the tail rises to 6.0–8.2. Pictures:
`probes-D2/frames/atmo-harmony-desktop-{light,dark}.png`,
`probes-D2/frames/gen-preset-desktop-light.png` (page content visibly bleeding through the menu
behind three rows of chips).

**Canon.** `§2` (specimen well, above); `§4.1` *"Text, focus, boundaries and state meet their
rendered contrast on the actual material tier"* and *"Selected, failed, pending, withdrawn and
disabled states are **never color-only**"* — the stop count is conveyed by colour difference alone
with no structural fallback; `§2` again: *"Glass earns its blur by revealing live content;
otherwise it is a neutral well."* Under this chip the glass reveals a Regenerate button.

**Reproduction.** `node probes-D2/contrast.mjs && python3 probes-D2/contrast.py`.

**Cure.** The plate becomes the canon's opaque quiet stage — the same
`surface="opaque"`, `tier="quiet"` material every palette entity Card already uses
(`VISUAL-CONSTITUTION.md §3.1`) — with the stops inside it and 1 px neutral gutters between them.
One move closes D-1, D-2, D-4's structural arm and D-3's countability arm.

---

### D-3 · BLOCKER — the preview is not truthful: six of twelve reachable counts are two pictures, and the elision is a head slice

**Mechanism.** `visible = stops.slice(0, STRIP_SEGMENT_CAP)` (`:33-35`) takes the **first seven**
stops. `generatePalette` extends a stable prefix, so every count ≥ 7 paints the same seven colours;
the only difference above the cap is a mask on the seventh sliver.

**Evidence.** E-3, measured across the full domain. Counts 8/9/10/11/12: painted colour arrays
**byte-identical**, `truncated: true`, `lastMask` identical. Count 7 vs 8 differ only by that mask
on a 6.0 px segment. `chip-count7.png` and `chip-count8.png` are indistinguishable to the eye.

**Why this is the deepest defect.** The component exists to be *true*. Its own docblock:
*"The stops arrive PRE-COMPUTED from the host's truth function (seed-exact — the strip a row shows
is what selecting it yields; O-14's byte-identity law)"* (`:5-7`). The constitution:
*"Preset and harmony expose truthful previews"* (`§7 Generate`). Both are false above count 7 —
and worse, a head slice is the **least** informative elision available: it discards the palette's
range and keeps its opening, so two palettes that agree on their first seven stops are the same
picture even when their tails differ completely.

**Three laws for one species, inside one product.** The app's own export contract defines the
canonical palette swatch strip: `PALETTE-CONTRACT.md §6` — *"SVG is a font-free swatch strip with
exact logical geometry … `viewBox="0 0 N 1"` … one `<rect width="1">` for every index in ascending
order"* — i.e. **all N stops, equal spans, no elision**, for N up to 50; `§7` says the same for PNG
(`[floor(i·1200/N), floor((i+1)·1200/N))`). The sibling `PaletteColorStrip`, rendered on the *same
`/generate` route*, on the plate directly above these menus (`GenerateControls.vue:16,135`), also
renders all N, with an
explicit **8% legibility floor** for weighted segments (`PaletteColorStrip.vue:47-48,62-64`). Only
`PreviewStrip` invents a cap, and it is the one chip whose stated purpose is byte-identity with
what selection yields.

**Canon.** `VISUAL-CONSTITUTION.md §7 Generate` (truthful previews); `§4.1` (a state conveyed
colour-only); `PALETTE-CONTRACT.md §6/§7` (the swatch-strip law); `PROPORTION-AUDIT.md §5.6`
*"Subtraction precedes explanation."*

The docblock's own defence of the cap — *"The N-4 alternative — the chip stepping up one width
token past count 8 — is not taken here; the cap arm keeps the description-lane rhythm fixed"*
(`:13-16`) — protects a rhythm that is **not held**: `/atmosphere` already breaks the same menu
family's row rhythm by 15.7–18.9% precisely because this chip is present (E-6, D-6).

**Reproduction.** `node probes-D2/ring-occlusion.mjs`, then read the `sweep` array in
`probes-D2/out/ring-occlusion.json`.

**Cure.** Either the plate is allowed to be as long as its data (a strip may be as long as the
palette; the canon's own SVG/PNG strips are), or the elision is **structural and honest**: an
evenly-resampled set that preserves the palette's range plus an explicit `+5` count — never a
head slice with an alpha ramp that mimics a pale stop. If neither is affordable at 42 px, the
correct subtraction is to widen the plate on `/atmosphere` (which has 850 px spare, D-6) and to
report the count numerically on `/generate`.

---

### D-4 · BLOCKER — forced colors erases the specimen and keeps the reservation

**Mechanism.** The entire payload is `background-color` on child spans — a forced property. The
only nominal boundary is a `box-shadow` (already not painted, D-1), which is suppressed. Nothing
is declared: `forced-color-adjust` computes to `auto`.

**Evidence.** E-4, my own Chromium measurement with the emulation asserted in-page: all segments
`rgb(255,255,255)`, `boxShadow: "none"`, **`mask: "none"`** (so the truncation cue dies too), rect
41.875 × 16.391 preserved. Frame: `probes-D2/frames/forced-colors-gen-preset.png` — every visible
row's description line begins ~50 px inside its own row, against nothing. On `/atmosphere` the chip is the row's
*only* content, so in forced colors the six harmony rows become six labels with a blank second
line. (The earlier seat reached the same result independently and additionally established that
the shipped `forced-colors-desktop` matrix arm was captured on **WebKit, which does not honour the
emulation** — that whole arm is inconclusive for every component, not just this one.)

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both
schemes, **forced colors** and reduced transparency"* — forced colors is a first-class arm and this
component has none. `PROPORTION-AUDIT.md §5.7`: *"Visual glyph size, operable target size and
layout reservation are separate quantities"* — here the reservation outlives the glyph, which is
the failure that law exists to name.

**Reproduction.** `node probes-D2/forced.mjs`.

**Cure.** In forced colors a colour specimen cannot show colour; it must show **structure**. The
well (D-2) supplies a `ButtonBorder` frame that survives, and the inter-stop gutters become 1 px
`CanvasText` rules so the strip still reports *how many* stops there are. If the design decides
colour is the whole point, the honest alternative is to **collapse the reservation** under
`forced-colors: active` rather than reserve 42 px for nothing. Either is a decision; `auto` is not.

---

### D-5 · MAJOR — the "golden plate" is not golden, and its `1em` is anchored to a font-size that renders no glyph in its lane

**Mechanism.** `inline-size: 2.618rem` (root-relative) × `block-size: 1em` (locally inherited)
(`:59-60`). Two axes on two scales cannot hold a ratio. Worse, the inherited font-size comes from
the **popover scroll container** (`max-h-[inherit] overflow-y-auto px-(--overlay-pad-inline)`,
E-5), not from any type role in the description lane.

**Evidence.** E-5: 2.5731 (`/generate` 1440), 2.6505 (`/atmosphere` 1440), 3.0126 (`/generate` 390),
3.0166 (`/atmosphere` 390) — **17.1% spread**, never φ² = 2.6180; the earlier seat's five-viewport
sweep found 2.2886…2.9911, **30.7%**. On `/generate` the plate is **1.481×** the font-size of the
`text-micro` (11 px) copy it is declared to *"join the description line"* with, and 16.29 px tall
against that line's 13.67 px line box — so the chip, not the copy, sets the description lane's
height. On `/atmosphere` the same declaration yields 0.969× because that lane has no `text-micro`.
**One declaration, two different optical objects.**

**Secondary, same line.** `2.618rem` is a hardcoded literal in two files (`PreviewStrip.vue:59`,
`PreviewRamp.vue:43`) while `demo/styles/foundation.css:462` already defines
`--phi-4: 2.618rem; /* base × φ² */`. Owner edict 5 (root-level styling, never per-instance)
violated twice with the token sitting unused in the same stylesheet tree
(`grep -rn "2\.618" demo/` → 8 hits, two of them these chips).

**Canon.** `PROPORTION-AUDIT.md §5.8` verbatim: *"Real rendered relation wins over token intent.
Adjacent rungs, measured rects and ink gaps appear in DELTA; token presence alone cannot close a
row."* `§1`: *"Every element earns its scale, interval, boundary and material from its job relative
to the local protagonist."* A plate whose aspect wanders 17–31% and whose height is inherited from
a scroll container has no relation to earn.

**Reproduction.** `node probes-D2/lane-type.mjs`.

**Cure.** One unit system, one token, one anchor:
`block-size: 1lh` (or `1em` of a *declared* lane role) and
`inline-size: calc(var(--phi-2) * 1em)` from the same `em`, hoisted to the shared root of D-7 so
it exists once and φ² is true by construction at every clamp arm and every zoom level.
`--radius-sm` has the same disease in miniature: a fixed **4 px** (measured) radius on a plate
whose height ranges 13.9 → 16.4 px means the corner character shifts from 28.8% to 24.4% of the
height, and at the cap the two end segments lose ≈7% of their painted area to the corner arcs
while interior segments lose none — so the promised "equal hard segments" are optically unequal at
the ends (D-13).

---

### D-6 · MAJOR — `/atmosphere`: a +16–19% row-height tax for a lane that is 1.49% ink, 100% aria-hidden, and cannot do its one job

**Mechanism.** `AuroraPane.vue:129-134` puts the chip **alone** into `SelectItem`'s `#description`
slot. glass-ui renders that slot as a second line, so every Harmony row buys a whole extra line of
rhythm for a 42 px mark that is `aria-hidden="true"` (`:43`).

**Evidence.** E-6: Harmony rows **50.14–51.54 px**, Arrangement and Medium rows **43.33 px** in the
same pane and menu family — **+15.7% to +18.9%**. Chip area share of an **890–895 px** row:
**1.49%**. Accessible name of the first option: exactly `"Analogous"`. Frame:
`probes-D2/frames/atmo-harmony-desktop-light.png` — and the picture makes the deeper point: **all
six harmony chips are variants of the same pink/magenta family** because they derive from the live
seed, so at 42 px the six rows are not distinguishable *as harmonies*. The lane costs 7 px of
vertical rhythm on every row to deliver a discrimination it cannot deliver.

**Canon.** `PROPORTION-AUDIT.md §4 PR-10` names this exact route: *"Atmosphere/Blob form acreage
exceeds preview — **TIGHTEN** — Preview first/larger; compact essentials"*. Adding a second line to
every Harmony row grows the acreage the register orders tightened. `VISUAL-CONSTITUTION.md §3.2`:
*"Empty secondary content occupies at most a narrow invitation tray (≤15% of the stage) or
disappears."* A 890 px row that is ~95% empty is that failure at menu scale.
`PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed."*

**Cure.** On `/atmosphere` the chip is the row's *only* differentiator, so it should be the row's
**protagonist**, not its footnote: put it in the name lane at the name's optical weight, one line,
and let four stops earn width against the 890 px available instead of 42 px. That removes the
second line, restores the 43.33 px rhythm, and makes the six harmonies actually comparable —
one move closing a rhythm defect, an acreage defect and a legibility defect.

---

### D-7 · MAJOR — the design-system boundary: one primitive, three mints, three laws, one ignored token

Four breaches of owner edicts 3, 4 and 5, all one mechanism — **the primitive was never rooted**:

1. **`.preview-chip` is minted twice, in two `scoped` blocks.** `PreviewStrip.vue:56-65` and
   `PreviewRamp.vue:40-49` declare near-identical rules under the same class name. Because both
   are `scoped`, the shared name is a fiction — neither rule reaches the other component — and
   they have already drifted in the way that matters: `inline-block` vs `inline-flex`, which is
   precisely the difference that makes the ring paint in one and not the other (D-1). The index
   file claims the opposite: *"ONE focused common module for the multi-feature chip grammar, never
   a per-pane copy"* (`color-chips/index.ts:2-4`).
2. **A third mint of the same species is imported into the same file.**
   `GenerateControls.vue:16` imports `PaletteColorStrip`, `:20` imports `PreviewStrip`. Both are
   "n colour bands in a clipped box, `aria-hidden`, painted with `background-color`".
   `PaletteColorStrip` carries the mechanism `PreviewStrip` most needs — proportional segments with
   an explicit **8% legibility floor** (`PaletteColorStrip.vue:47-48,62-64`) — while `PreviewStrip`
   lets segments fall to 5.99 px with no floor.
3. **"chip" is already glass-ui's word.** `@mkbabb/glass-ui@7.0.0` exports `./chip`
   (`node -e "…"` → `{"types":"./dist/chip.d.ts","import":"./dist/chip.js"}`; the package ships
   `dist/components/chip/{Chip.vue.d.ts,chipVariants.d.ts,types.d.ts}`). `demo/` mints
   `.preview-chip` with an unrelated meaning inside the same document. Owner edict 4:
   *"Glass-ui is the design system … add variants/primitives there, not in demo/ui/. **Reuse
   existing component-type names.**"*
4. **The width token exists and is ignored twice** — `--phi-4: 2.618rem`
   (`demo/styles/foundation.css:462`) vs the literal in both chips. Owner edict 5.

**Cure.** One primitive, rooted in the design system: a **specimen strip** in glass-ui (a `Chip`
variant or a sibling of it), owning the opaque well, the per-stop gutters, the forced-colors arm,
the logical-direction elision cue and the φ² plate in one unit system. `PreviewStrip`,
`PreviewRamp` and `PaletteColorStrip` become thin domain adapters over it. That one move closes
D-1, D-2, D-4, D-5, D-8 and D-13 simultaneously — which is the tell that it is the right altitude.

---

### D-8 · MAJOR — the elision cue is a 4.5 px alpha ramp, direction-blind, and the first casualty of every fallback

**Mechanism.** Past the cap the strip fades its seventh sliver with a **physical**
`mask-image: linear-gradient(90deg, black 20%, transparent 95%)` (`:73-74`). At the cap each
segment is **5.988–6.016 px** (E-3), so the whole "continues" signal is a ~4.5 px alpha ramp on a
6 px sliver — a faded stop and a genuinely pale stop are the same picture, and on Pastel (every
stop already ≤1.474:1 against the row, E-2) the cue is invisible by construction.

It is also direction-blind: the segments are laid out by a `flex` row, which reverses under
`direction: rtl`; `90deg` does not. The earlier seat reproduced the inversion by honouring
`dir="rtl"` on the popover (`frames-D/D7-rtl-mask-inverted.png`: segments run x 1197 → 1161 while
the mask still fades rightward, i.e. *inward*). Today reka-ui's hard `dir="ltr"` on `SelectContent`
hides it — a producer defect concealing this one, which will surface the moment the obvious RTL fix
lands upstream.

And it is the first thing to die: under forced colors the mask computes to `none` (E-4), so the
one signal distinguishing a 7-stop palette from a 12-stop palette disappears entirely.

**Canon.** `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical inline/block
direction follows the document."* `§4.1`: states are never colour-only.

**Cure.** Delete the mask in favour of D-3's structural cue, which has no direction, no alpha and
survives forced colors.

---

### D-9 · MINOR — a strip of one is a swatch wearing palette clothes

`v-if="stops.length >= 1"` (`:40`) admits `count = 1`, which the slider reaches (`:min="1"`). The
result is a single 42 × 16 block still wearing the palette grammar — plate radius, plate ring, the
φ² proportion that *means* "a sequence". `PreviewRamp` sets its floor at `>= 2` (`PreviewRamp.vue:31`)
precisely because one stop is not a ramp; the strip's floor is one lower than its meaning.
**Reproduction:** `/generate`, drag Color count to 1, open Preset.

### D-10 · MINOR — the lane the chip is proportioned against is itself off the closed type matrix

`VISUAL-CONSTITUTION.md §4` closes the type matrix and maps *"control or label, **including
dropdown options**"* → `text-small`, Plus Jakarta Sans, non-bold, adding *"This matrix is closed
across all eighteen compositions."* Measured (E-5), the `/generate` option name lane is
**Fraunces 16.4 px** (`.font-display`) and the description lane is **`text-micro` 11 px** — neither
role appears in the matrix. `GenerateControls.vue:235-239` states the intent openly (*"the NAME lane
joins the dropdown family's DISPLAY voice"*). The host owns that violation, but it is in scope here
because the chip's entire declared proportion (`1em`, "joins the description line") is measured
against these unratified rungs — and because the resulting row makes a saturated colour plate
compete with a display-voice name (`probes-D2/out/A3-row-light.png`).

### D-11 · INFO — the selected row's chip is identical to the nine unselected ones

The chip carries no selection register; the producer's gutter marker is the only one. That is
defensible under `PROPORTION-AUDIT.md §5.14` (exactly one marker), but worth naming: the specimen
*could* be the register, and a selected specimen that reads as "this is the palette you have" would
let the plate earn a second job it currently declines.

### D-12 · INFO — the honest-absence arm is unreachable on the strip, and proven only on the ramp

`v-if="stops.length >= 1"` never evaluates false in either host. My `/mix` probe caught the
**ramp's** absence arm live (`probes-D2/out/ramp-ab.json`: no `.preview-chip` renders with <2
operands — *"honest absence, never a canned swatch"*, `sample.ts:48-50`). The strip's absence policy
is asserted in prose and never rendered.

### D-13 · INFO — a px radius on an em-scaled plate

`--radius-sm` = **4 px** fixed (measured). Against a 13.9 px plate that is 28.8% of the height,
against 16.4 px 24.4% — the corner character is not scale-invariant, and at the cap the two end
segments lose ≈7% of their painted area to the arcs while interior segments lose none. Derived
arithmetic from E-3/E-5, not a separate measurement.

### D-14 · INFO (HYPOTHESIS) — a disabled row would dim a colour specimen

`SelectItem` accepts `disabled` and the glass row applies `data-[disabled]:opacity-disabled`, which
would composite the specimen's stops toward the row ground. A colour specimen at reduced alpha
reports colours that are not the colours. No host renders a disabled preview row today, so this is
a hypothesis with a named trigger. The cure is the same well plus an explicit opt-out, exactly as
the canon isolates the WatercolorDot face from seat state (`VISUAL-CONSTITUTION.md §4.2`:
*"WatercolorDot face delta is `0`"*).

---

## Motion — negative proof

The component animates nothing, and that is correct.

```
$ grep -nE "transition|animation|@keyframes|will-change|transform" demo/color-session/color-chips/PreviewStrip.vue
(no output)
```

No transition, no keyframes, no `will-change`, no transformed or layout-forcing property. Nothing
animates, so nothing forces layout, and `prefers-reduced-motion` needs no arm — the family
docblock's *"Static paint — no motion, PRM-neutral"* (`PreviewRamp.vue:14`) is the one claim in
this family the render honours. Owner edict 6 (animations are never deleted, only moved or
tokenized) is not engaged: there is no animation to preserve and none was removed —
`git log --oneline -3 -- demo/color-session/color-chips/PreviewStrip.vue` shows a single commit
(`a61094e3`, a tree move).

One motion-adjacent observation, recorded and dismissed: dragging Color count with the Preset menu
open repaints all ten chips and adds/removes DOM nodes as the segment count changes (E-3 drove
exactly this). There is no transition, so the change is instantaneous and honest; a tokenized
cross-fade here would be *worse*, because a half-faded colour specimen is a lying colour specimen.

---

## Negative proofs — what I attacked and found sound

- **Vue 3.5 idiom (edict 7).** `const { stops } = defineProps<…>()` (`:27-30`) is reactive props
  destructure, correct for 3.5. No template ref is needed, so `useTemplateRef` does not apply. No
  `defineModel`, so the `shallowRef` stale-read caveat does not arise.
- **`verbatimModuleSyntax` (edict 8).** Both imports (`:21-22`) are value imports; there is no
  type-only import to mis-declare. Clean. (`sample.ts:27-33` correctly uses `import type` for
  `AnyColor`, `HueInterpolationMethod`, `PickerColorIn`, `PickerSpace`.)
- **God modules (edict 1).** 76 lines, one job, one exported component; `color-chips/index.ts` is a
  four-symbol barrel. Not a god module.
- **Legacy / compat (edict 2).** No aliases, no shims, no dual paths, no masking fallback. The
  `v-if` floor is a policy, not a fallback.
- **Zero colour math in the view.** The chip never computes colour; stops arrive pre-computed from
  the host truth function and are stamped verbatim on `data-stops` (`:44`). That separation is
  right and should survive any cure.
- **`aria-hidden` on the decoration itself** is correct on `/generate`, where the row carries a
  name and a text description. It is the *composition* on `/atmosphere` that is wrong (D-6), not
  the attribute.
- **Overflow priority.** `flex: none` on the plate plus `min-w-0` on the host wrapper truncates the
  description and never the specimen; measured `overflowX = 0` at 320 px. Correct priority.
- **Idle cost.** The menu unmounts when closed, so the chips cost nothing at rest; no page errors
  were raised by any probe on `/generate`.

---

## The gestalt cure

Fourteen findings, two mechanisms.

| Family | Mechanism | Findings |
|---|---|---|
| **F-α · a specimen with no well** | the colour payload is painted straight onto translucent glass in one channel, bounded by a ring that its own children occlude — so it dissolves into light rows, into dark rows (from the other end), into forced colors, into its neighbours, and into its own elision cue | D-1, D-2, D-4, D-8, D-11, D-14 |
| **F-β · the primitive was never rooted** | "n colour bands in a clipped plate" is minted three times in two scoped blocks with hardcoded geometry, two unit systems, an unused token and three different elision laws — so its truth drifts, its proportion is false, and its direction is physical | D-3, D-5, D-6, D-7, D-9, D-10, D-12, D-13 |

**The transposition.** Do not patch the ring, the cap or the mask — the ring cannot be patched
without minting a second rule, the cap cannot be patched without choosing a new lie, and the mask
dies in forced colors regardless. Root the primitive in glass-ui as a **specimen strip**: an opaque
quiet well (the material tier the canon already assigns to palette specimens), per-stop hairline
gutters that survive forced colors and carry the stop count structurally, a plate whose two axes
share one unit and one declared type anchor so φ² is true by construction, elision expressed
logically and numerically rather than as a physical alpha ramp over a head slice, and one exported
width token instead of a literal in two files. Then `PreviewStrip`, `PreviewRamp` and
`PaletteColorStrip` collapse into three domain adapters over one law — which is what
`color-chips/index.ts:2-4` already claims to be and is not.

**Gates a cure must pass.**

1. Every stop of every chip ≥ 3:1 against its rendered ground in **both** schemes, measured from
   pixels, on `/generate` and `/atmosphere` (today: 22 of 24 chips fail).
2. Every adjacent stop pair separated by a **structural** boundary, not a colour difference
   (today: 22 of 24 chips have a pair below 1.5:1, worst 1.013:1).
3. The plate's boundary is visible in the pixels: an edge profile at DSF 4 shows a ≥1 CSS px band
   distinct from the payload on all four edges (today: zero pixels).
4. `matchMedia("(forced-colors: active)")` → the strip still reports its stop count, **or** its
   reservation collapses. `forced-color-adjust` is explicitly declared either way.
5. Distinct counts produce distinct pictures: no two reachable counts in 1…12 paint an identical
   colour set (today: 8, 9, 10, 11, 12 are byte-identical).
6. Rendered `width/height = 2.6180 ± 0.01` at 320, 390, 768, 1440, 2200 px **and** at actual 200%
   browser zoom (today: 2.2886…3.0166).
7. The `/atmosphere` Harmony row height equals its Arrangement/Medium siblings (today +15.7…18.9%),
   and the six harmonies are distinguishable from each other in the rendered frame.
8. `dir="rtl"` honoured on the popover leaves the elision cue at the logical end.
9. `grep -rn "2\.618rem" demo/color-session/color-chips/` returns nothing — the chips consume
   `--phi-4` (or its glass-ui equivalent) instead of the literal.

---

## Reproduction index

All probes assume the dev server on `http://localhost:9000`; run from
`docs/tranches/V/megatranche/audit/components/PreviewStrip/`.

| Evidence | Command | Output |
|---|---|---|
| E-1 ring A/B + count sweep + atmosphere rhythm | `node probes-D2/ring-occlusion.mjs` | `probes-D2/out/ring-occlusion.json`, `out/A-strip.png`, `out/C1-bg-on-self.png`, `out/C2-opaque-child.png`, `out/D-atmo-strip.png` |
| E-1 edge profiles | `python3 probes-D2/edge-profile.py <png> <label> <col-frac> …` | stdout |
| E-2 rendered contrast census | `node probes-D2/contrast.mjs && python3 probes-D2/contrast.py` | `probes-D2/out/contrast.log`, `out/contrast-index.json` |
| E-3 count domain 1…12 | `node probes-D2/ring-occlusion.mjs` → `sweep` | `probes-D2/out/ring-occlusion.json` |
| E-4 forced colors | `node probes-D2/forced.mjs` | stdout, `probes-D2/frames/forced-colors-gen-preset.png` |
| E-5 proportion + type anchor | `node probes-D2/lane-type.mjs` | `probes-D2/out/lane-type.json` |
| E-5b dark strip + row crops | `node probes-D2/ramp-ab.mjs` | `probes-D2/out/ramp-ab.json`, `out/A2-*.png`, `out/A3-*.png` |
| E-7 the open-menu matrix | `node probes-D2/menus.mjs` | `probes-D2/frames/{gen-preset,atmo-harmony}-{desktop,mobile}-{light,dark}.png` |

Earlier seat's artefacts, preserved and cited where used: `probes-D/`, `frames-D/`,
`chip-count{5,7,8,12}.png`, `preset-menu-count12.png`.
