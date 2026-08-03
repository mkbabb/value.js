# CHALLENGE-D — `demo/workbenches/extract/ExtractPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat was
explicitly spawned with. Declared, not inherited.

- **Seat**: CHALLENGE-D (design), mega-tranche per-component audit.
- **Subject**: `demo/workbenches/extract/ExtractPane.vue` — 37 lines, area `demo/workbenches`.
- **Base**: branch `tranche-u`, HEAD `c654824e`; dev server live at `http://localhost:9000`.
- **Verdict**: **DEFECTIVE**. 3 BLOCKER, 8 MAJOR, 4 MINOR, 2 INFO.
- **Write scope honoured**: only `docs/tranches/V/megatranche/audit/components/wb-extract-pane/**`.
  No source, no `INBOX.md`, no `vnext/**`, no `scripts/dev/dev.sh` touched.

---

## 0. The whole subject, for reference

```vue
<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
            <PaneHeader description="Pull palettes from any image.">Extract</PaneHeader>
            <ExtractWorkbench class="pb-4 px-4 sm:px-6 pt-2" layout="column" :color-space="colorSpace"
                @pick="pm.emitSetCurrentColor" @add-color="pm.emitAddColor" />
        </Card>
    </div>
</template>
```

Thirty-seven lines is not a defence. Every line of this file is a **binding composition decision**
for a member route, and six of the eight non-comment lines make the wrong one.

---

## 1. Evidence apparatus (what I ran)

| # | Probe | Artifact |
|---|---|---|
| E1 | Tracked Safari matrix, 4 arms | `docs/tranches/V/megatranche/audit/visual/REPORT.json` (`/#/extract` rows), `shots/safari-{desktop,mobile}-{light,dark}/extract.png` |
| E2 | WebKit geometry probe, 1440×900 + 390×844 | `evidence/probe-geometry.mjs` (output pasted below) |
| E3 | WebKit state probe: 390×664 (the tracked mobile viewport), k=5 and k=16, PRM, forced-colors | `evidence/probe-states.mjs` |
| E4 | Populated arm — real 5-colour PNG fed through `input[type=file]` | `evidence/D-desktop-1440-populated.png` |
| E5 | RTL arm, `dir="rtl"` at 1440×900 | inline output below |
| E6 | Pixel sampling + sRGB→OKLCh of the tracked dark capture | inline numbers below |

The tracked mobile capture is **1170 × 1992 px @ DPR 3 = 390 × 664 CSS** (`struct.unpack` on the PNG
IHDR), so E3's 390×664 arm reproduces the shipped capture frame exactly rather than substituting one.

---

## 2. Visual truth first

### The desktop scene, empty (`shots/safari-desktop-light/extract.png`, 2880×1800 @ DPR2)

Two cards. Identical width. Identical height. Identical 16px radius. Identical hard-offset caster
shadow. Identical translucent pink material. The left one is the route. The right one says
**"No saved palettes yet."**

The route named Extract gives half of its viewport to a pane that has nothing in it, and gives the
other half to a column so narrow that its own protagonist — the image — has to be smaller than the
emptiness beside it. That is not a layout with a weak hierarchy. It is a layout with **no
protagonist at all**, and it is measurable to two decimal places.

### The desktop scene, populated (`evidence/D-desktop-1440-populated.png`)

Feed it a real image and the inversion becomes literal:

- image stage: **458 × 343.5 px**
- empty "My Palettes" companion: **512 × 578.2 px**

The stage that the canon calls the protagonist (`VISUAL-CONSTITUTION.md:47` — *"Extract | source
image and sampler stage"*) is **10.5% narrower and 40.6% shorter** than the region holding zero
content. The dominance readout truncates to `oklch(54.4836185…` because the column cannot hold it.
The extracted palette card — the payoff of the entire route — sits at the bottom of a hidden inner
scroller.

### Dark (`shots/safari-mobile-dark/extract.png`)

Not dark. Brown. Sampled interior of the plate: `rgb(124, 87, 91)`. Sampled ambient beside it at the
same scanline: `rgb(242, 93, 163)`. In "dark mode" the **brightest region of the page is the
background** (OKLCh L 0.690) and the **content plate is the darkest large surface** (L 0.497). A user
reading text is reading light ink on a mid-brown scrim floating on hot pink. The scheme reads as a
translucency accident, not as a designed dark treatment.

### Mobile, real capture frame (`evidence/D-mobile-390x664-k16-clip.png`)

The pane bottom is a hard clip. Two rows of ghost circles are visible, more are below the fold, the
caption that the source itself designates as the accessible text for the aria-hidden ghost
(`ExtractWorkbench.vue:161-163`) is entirely off-screen, and there is no scrollbar, no fade, no
affordance of any kind saying the pane continues. The caster shadow wraps the clip so the pane looks
**finished** while it is truncated.

---

## 3. Findings

### D-1 · BLOCKER · The housing is the wrong component, and the right one is installed

`VISUAL-CONSTITUTION.md:47` binds Extract's outer housing:

> | Extract | source image and sampler stage | developed specimen/inspector; undeveloped result stays contextual | source, sampled result, controls | **`InstrumentChassis`** |

`ExtractPane.vue:3` ships `<Card tier="resting">` instead. `VISUAL-CONSTITUTION.md:38` forecloses the
substitution in terms: *"`Card` remains semantic housing for a bounded object or specimen and is
**never the default page primitive**."* `PROPORTION-AUDIT.md:66` repeats it: *"A page region, empty
column, inner stage or mere padding group does not become a Card by default."*

This is not aspirational canon awaiting a producer. `InstrumentChassis` **is shipped in the installed
dependency**:

```
$ grep -rl "InstrumentChassis" node_modules/@mkbabb/glass-ui/dist/
node_modules/@mkbabb/glass-ui/dist/instrument-chassis.js
node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/types.d.ts
node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/index.d.ts
node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/InstrumentChassis.vue.d.ts
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"
7.0.0
```

with exactly the props the canon names:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/types.d.ts
export type InstrumentChassisState      = "ready" | "active" | "complete" | "loading";
export type InstrumentChassisProportion = "golden" | "preview-dominant";
export type InstrumentChassisBoundary   = "stage-inspector" | "inspector-action";
export type InstrumentChassisReserve    = "none" | "stage" | "inspector" | "both";
```

```
$ grep -rn "InstrumentChassis\|instrument-chassis" demo/ --include="*.vue" --include="*.ts" --include="*.css"
(no matches)
```

**Zero demo imports.** The design system shipped the exact contract — a proportion enum that would
have made D-2 structurally impossible, a `state` enum that would have made D-6 impossible, a
`boundaries`/`reserve` pair that `OPTICAL-BENCH-COMPOSITIONS.md §5` already ratified as `[]` /
`"none"` — and the pane hand-rolled a `Card` plus a six-token utility string instead. **Owner edict 4
violated** (*glass-ui is the design system; reuse existing component-type names*). Every finding D-2,
D-3, D-6, D-10 and D-11 below is a downstream symptom of this one substitution.

---

### D-2 · BLOCKER · Measured 50.00% / 50.00%, with the empty half winning

`VISUAL-CONSTITUTION.md:27`:

> A two-part desktop scene is **earned**, not default. A P122 instrument chooses exactly `golden`
> (`61.8033989% / 38.1966011%`) or `preview-dominant` (`66.6666667% / 33.3333333%`); the
> display-rounded protagonist law is 61.8–66.7%.

`VISUAL-CONSTITUTION.md:28`:

> Empty secondary content occupies at most a narrow invitation tray (≤15% of the stage) or
> disappears. **It never receives half the viewport.**

Measured, WebKit 1440×900, `/#/extract`, settled 3.5 s (`evidence/probe-geometry.mjs`):

```json
"panes": [
 { "title": "Extract",     "rect": { "x": 199, "y": 201, "w": 512, "h": 578.22 } },
 { "title": "My Palettes", "rect": { "x": 729, "y": 201, "w": 512, "h": 578.22 } }
]
"mainRect": { "x": 16, "y": 88, "w": 1408, "h": 804 }
```

| Quantity | Canon | Measured | Delta |
|---|---|---|---|
| protagonist share of the two-pane stage | 61.8033989% or 66.6666667% | **50.0000%** (512 / 1024) | **−11.80 pp** below the floor |
| empty secondary share | ≤ 15% | **50.0000%** | **3.33×** the ceiling |
| empty secondary, absolute | — | **512 px** | vs. a 458 px protagonist image (E4) |

Both arms of law 1 fail and law 2 fails. `PROPORTION-AUDIT.md:48` already carries this as **PR-04 —
"Empty/equal companion Cards and nested housing → REMOVE"**; the row is open and this pane is a live
site of it. Note also that the whole two-pane block spans only 1042 px (x 199 → 1241) of a 1440 px
viewport inside a 1408 px `<main>`, leaving **199 px of dead gutter on each side — 27.6% of the
viewport is margin**, an unearned reservation stacked on top of an unearned split.

---

### D-3 · BLOCKER · No protagonist: equal size AND equal shadow, verbatim against the law

`VISUAL-CONSTITUTION.md:34`:

> One pane may have one full-strength visual protagonist. **Supporting fixtures do not compete with
> it through equal size or equal shadow.**

Measured, both panes, same probe:

| Property | Extract pane | My Palettes pane |
|---|---|---|
| rect | 512 × 578.22 | 512 × 578.22 |
| `border-radius` | `16px` | `16px` |
| `box-shadow` | `color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px` | `color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px` |
| `background-color` | `oklab(0.928273 0.005506 0.013193 / 0.664)` | `oklab(0.928273 0.005506 0.013193 / 0.664)` |
| `contain` | `content` | `content` |
| `overflow-y` | `auto` | `auto` |

Equal size **and** equal shadow **and** equal material **and** equal radius. Every discriminator the
law names is zero. There is no protagonist on this route; there are two co-equal slabs, one of which
is empty.

Separately, the shadow itself is disposed: `PROPORTION-AUDIT.md:49` **PR-05 — "Dividers, caster
shadows and corner marks repeat a boundary → REMOVE"**, and `VISUAL-CONSTITUTION.md:15` gives the
instrument veil **"no drop shadow"**. Its provenance is a project-wide `:root` override of the
producer token (`demo/styles/foundation.css:365-368`, `--shadow-cartoon: 8px 8px 0px 0px …`), which
`Card` picks up through `--shadow-card`. The pane inherits a REMOVE-disposed species purely by having
chosen `Card`.

---

### D-4 · MAJOR · Inner scroller instead of document scroll; content silently lost on mobile

`ExtractPane.vue:5` — `overflow-y-auto overflow-x-hidden … h-full`. This makes the pane a fixed-height
inner scroll container inside a fixed-height `<main>`.

`VISUAL-CONSTITUTION.md:32`:

> Mobile uses **one document-scrolling** stage→inspector→action sequence beneath the same top dock.

Measured at **390 × 664** — the exact CSS frame of the tracked Safari mobile capture:

| Arm | `docScrollable` | pane `scrollHeight` / `clientHeight` | pane scrollable | ghost caption visible |
|---|---|---|---|---|
| k = 5 (default) | **false** | 563 / 550 | **true** | true (bottom 652.5 of 664 — 11.5 px of slack) |
| k = 16 (max) | **false** | **731 / 550** | **true** | **false — bottom 820.5 > 664** |

At the slider's maximum, **181 px of the pane's content is behind an inner scroller** while the
document itself does not scroll. The hidden content includes the caption
`· undeveloped plate — feed it an image ·`, which `ExtractWorkbench.vue:161-163` explicitly designates
*"the AT text for the aria-hidden ghost above"* — so the empty state's only readable explanation is
the thing that gets clipped. Screenshot: `evidence/D-mobile-390x664-k16-clip.png`.

Even the default k = 5 arm has only 11.5 px of headroom on the shipped capture frame, which is why
`shots/safari-mobile-dark/extract.png` shows the caption wrapped to two lines and pressed against the
pane's bottom radius.

This is not a child-component problem. The three classes that create the trap (`overflow-y-auto`,
`h-full`, and the `contain` that `pane-scroll-fade` brings) are all written on `ExtractPane.vue:5`.

---

### D-5 · MAJOR · `layout="column"` is hardcoded, and it kills the only composition the canon asks for

`ExtractPane.vue:13` passes `layout="column"` as a literal. It is the **sole consumer** of the
component:

```
$ grep -rn "ExtractWorkbench" demo/ --include="*.vue" --include="*.ts" | grep -v "ExtractWorkbench.vue:"
demo/workbenches/extract/ExtractPane.vue:11:            <ExtractWorkbench
demo/workbenches/extract/ExtractPane.vue:25:import ExtractWorkbench from "./ExtractWorkbench.vue";
```

Therefore `layout === 'split'` is **unreachable at every one of its five template sites**
(`ExtractWorkbench.vue:5, 13, 18, 148`) plus the prop union at `:206`. Its own docstring names a
consumer that no longer exists:

```ts
// ExtractWorkbench.vue:205-206
/** `column` — the pane's single flow; `split` — the dialog's two columns. */
layout?: "column" | "split";
```

and `composables/useExtractSession.ts:5` still asserts *"both shells now consume this session through
ExtractWorkbench"* — there is one shell. **Owner edict 2 violated** (no legacy code, no dual paths).

The design cost is worse than the dead code. `split` is precisely the stage-beside-inspector
arrangement that `VISUAL-CONSTITUTION.md:47` demands of Extract (*"source image and sampler stage"* +
*"developed specimen/inspector"*). The pane owns a working two-region composition and hardcodes it
off, then compensates for the resulting narrow column by… taking half a viewport it cannot use. D-2
and D-5 are the same mistake seen from two ends.

---

### D-6 · MAJOR · The pane has no state vocabulary; its geometry is a function of a slider

The pane renders one unconditional tree. It declares no `state`, no `aria-busy`, no reserve, and
surfaces no loading, error, or complete arm — all of that resolves invisibly inside the child, so the
pane's own box is free to resize under it. Measured pane height across states at 1440×900:

| State | pane height | Δ from empty |
|---|---|---|
| empty, k = 5 | **578.2** | — |
| empty, k = 16 (nothing loaded — only the slider moved) | **706.2** | **+128 px (+22.1%)** |
| populated (5-colour PNG) | **774.0** | **+195.8 px (+33.9%)** |

`PROPORTION-AUDIT.md:19`: *"The locked chassis does not grow for paint or values."* Here the chassis
grows **22%** for a value that produced no content whatsoever — the empty-state ghost re-segments
under the k slider (`ExtractWorkbench.vue:159`, `ShadowPalette :count`), and the housing follows it.

At k = 16 the empty placeholder measures **278 px tall inside a 706 px pane = 39.4% of the entire
route pane**, against the real affordance (the dashed drop zone) at **180 px = 25.5%**. The
placeholder is **1.54× the working control**. `VISUAL-CONSTITUTION.md:198`: *"the undeveloped state
remains contextual, **not a giant shadow placeholder**."*

`InstrumentChassisReserve` and `InstrumentChassisState` exist in the installed producer (D-1) to hold
exactly this geometry stable. Neither is used. Cross-ref: the ghost itself is owner-marked OM-15 and
already dissected in `audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md:266-269`; **this finding is the
housing half** — the pane lets the ghost dictate the chassis.

---

### D-7 · MAJOR · Per-instance override reaching into a child component's root element

`ExtractPane.vue:12` — `<ExtractWorkbench class="pb-4 px-4 sm:px-6 pt-2" …>`. Measured landing:

```json
"wbCls": "relative flex flex-col pb-4 px-4 sm:px-6 pt-2",
"wbPad": "8px 24px 16px 24px"     // desktop
"wbPad": "8px 16px 16px 16px"     // mobile
```

The pane's padding fuses onto the workbench's own root class list through attribute fallthrough. The
consumer is styling a producer's root from outside — **owner edict 5 violated** (*style at the
component root level, never per-instance overrides*).

The two sibling panes do it the other way and get a different result:

```vue
<!-- GradientPane.vue:23, GeneratePane.vue:34 -->
<div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2"> … </div>
```

Extract is the only one of the three that (a) reaches into the child and (b) consequently **loses the
`gap-4`** its siblings have. The rhythm between the pane header and the workbench body is therefore
different on Extract than on Gradient and Generate, with no design reason — measured header→body gap
comes out of the workbench's own `pt-2` (8px) alone.

---

### D-8 · MAJOR · The structural plate carries seed tint; the "dark" plate is a brown scrim

`VISUAL-CONSTITUTION.md:14` — structural glass (*"dock, header, primary plate"*) is
**"neutral Clear-Ice/Smoke family"**. `:21` — **"Seed tint is forbidden outside the ambient field,
active accent, WatercolorDot/specimen, and pastel Palettes lanes."**

The pane's own fill, computed:

```
background-color: oklab(0.928273 0.005506 0.013193 / 0.664)
```

`C = hypot(0.005506, 0.013193) = 0.01430` at hue 67.4° — the fill is **not neutral before compositing**,
and `α = 0.664` then admits **33.6% of the chromatic ambient** through it.

Composited result, sampled from the tracked capture `shots/safari-mobile-dark/extract.png`
(sRGB→OKLCh, D65):

| Sample | rgb | OKLCh |
|---|---|---|
| plate interior | `(124, 87, 91)` | L 0.4974 · **C 0.0494** · H 11.8° |
| header band | `(94, 72, 64)` | L 0.4226 · **C 0.0330** · H 40.9° |
| ambient beside the plate, same scanline | `(242, 93, 163)` | L 0.6901 · C 0.1946 · H 354.3° |

The primary plate of a member route measures **C 0.0494** in dark. It is not in the neutral pole; it
is 25% of the ambient's own chroma, on the ambient's own hue arc. And the luminance ordering inverts
the scheme: the plate (L 0.497) is **darker than the page ground** (L 0.690), so on the dark arm the
brightest large surface is the background and the content is a brown scrim.

The pane chose this by writing `tier="resting"` on a `Card` and using it as a page region.
`VISUAL-CONSTITUTION.md:19`: *"Glass earns its blur by revealing live content; otherwise it is a
neutral well."* This plate reveals the ambient gradient, which is not content.

---

### D-9 · MAJOR · The route's identity is an `<h3>` and the route has no `<h1>`

Measured heading inventory, `/#/extract`, WebKit 1440×900:

```json
"headings": ["H3:Extract", "H3:My Palettes"]
```

and from the tracked matrix, all four arms:

```json
"counts": { "main": 1, "h1": 0, … }   // REPORT.json, safari-{desktop,mobile}-{light,dark} /#/extract
```

`ExtractPane.vue:7` declares the route identity through `<PaneHeader>Extract</PaneHeader>`;
`PaneHeader.vue:21` emits `<h3 class="pane-header-title font-display">` and `:106-112` sizes it at
`--type-display-1`.

- `VISUAL-CONSTITUTION.md:85`: *"Each route has **one H1** and exactly one stable main landmark."* —
  measured 0.
- `VISUAL-CONSTITUTION.md:69`: route H1 → `text-display`, Fraunces. The pane instead ships **display
  type at h3 level** — the document outline skips h1 and h2 entirely.
- `PROPORTION-AUDIT.md:76`: *"A display-sized readout is not therefore a document heading."* The
  converse failure is here: a document heading is display-sized while carrying no heading rank.
- Two co-equal H3s at identical display size (`Extract`, `My Palettes`) means the route **asserts two
  identities**, which is the semantic restatement of D-3.

`main: 1` is correct, so the landmark half is sound; the heading half is not.

---

### D-10 · MAJOR · `contain: paint` makes the pane an inescapable clip box for its own overlays

Measured on the pane root: `"contain": "content"` (the computed serialisation of `contain: layout
style paint`), sourced from the class the pane opts into:

```css
/* PaneHeader.vue:54-57 */
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

`contain: paint` clips **all** descendants to the padding box and makes the element a containing
block for `position: fixed` descendants. Combined with the pane's own `overflow-x: hidden` /
`overflow-y: auto`, nothing rendered inside the pane can ever leave a 512 × 578 box on desktop or a
358 × 550 box on mobile — **regardless of z-index**.

The pane's own feature set depends on escaping it. `ImageEyedropper.vue:8` is
`class="absolute inset-0 z-popover …"` and its magnifier at `:79-85` is positioned in pane-relative
pixels (`left: loupeRelX - LOUPE_SIZE/2`). A `z-popover` layer inside a paint-contained box is a
`z-popover` layer that cannot rise above the pane edge; the loupe near the stage boundary is clipped
by the pane, not merely by the image. The camera viewfinder (`ExtractWorkbench.vue:35-60`) is in the
same box.

The containment is not wrong in itself — it scopes the named scroll-timeline. It is wrong that a
**page-region housing** and an **overlay-hosting instrument** were fused into one element by a single
class string, so the two requirements now contradict each other with no seam to separate them.
`InstrumentChassis` exists precisely to give stage / inspector / action their own boxes (D-1).

---

### D-11 · MAJOR · Encapsulation inversion — the pane hand-writes a contract a *sibling* owns

To be a pane at all, `ExtractPane.vue:5` must literally type six utility tokens plus one magic class
whose behaviour is defined in an **unscoped `<style>` block inside a different component**:

```
/* PaneHeader.vue:43-48 */
 * The `.pane-scroll-fade` host class lives on the ROOT element of each pane
 * Card (9 sibling panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/
 * Generate/ConfigSlider). Because the class is applied across siblings of
 * PaneHeader (not its descendants), the block must be UNSCOPED to reach
 * those consumers.
```

The identical string is copy-pasted across the fleet:

```
$ grep -rn "pane-scroll-fade" demo/ --include="*.vue"
demo/workbenches/gradient/GradientPane.vue:20
demo/workbenches/mix/MixPane.vue:62
demo/workbenches/generate/GeneratePane.vue:31
demo/workbenches/extract/ExtractPane.vue:5
demo/scenes/ConfigSliderPane.vue:106
demo/scenes/about/AboutPane.vue:4
demo/palettes/BrowsePane.vue:2
demo/palettes/PalettesPane.vue:2
demo/palettes/admin/AdminPane.vue:2
```

Nine sites, one implicit contract, **no owning module**. A header component reaches upward through
the cascade to configure its own hosts, and every host must remember to opt in by string. The
variants have already drifted — `Browse/Palettes/Admin/About` carry `mx-auto` on the `Card`,
`Extract/Gradient/Generate` do not; `Mix` puts `relative` on the `Card` while `Extract/Gradient/
Generate` put it on a wrapper `div`. That drift is the signature of a pattern with no owner.

This is the **god-module failure expressed as a string instead of a file** — edicts 1 and 3. The
idiomatic cure is not a new `PaneShell` wrapper (edict 3 forbids inventing one); it is the component
the design system **already ships and nobody imports** (D-1), whose `boundaries` / `reserve` /
`proportion` / `state` props are the same contract, owned, typed, and producer-side.

---

### D-12 · MINOR · RTL: the pane mirrors, its shadow does not

Measured with `document.documentElement.dir = "rtl"` at 1440×900:

```json
{ "dir": "rtl",
  "paneOrder": [ { "t": "Extract", "x": 729 }, { "t": "My Palettes", "x": 199 } ],
  "headerPadLR": "24px/24px", "wbPadLR": "24px/24px",
  "shadow": "color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px",
  "overflowX": 0 }
```

Order mirrors correctly (Extract 199 → 729) and padding is symmetric, so the Tailwind logical
properties behave. But the caster shadow is **byte-identical in both directions** — `8px 8px` is a
physical offset. In LTR the caster falls away from the reading origin; in RTL it falls *toward* it,
into the gutter between the panes. `VISUAL-CONSTITUTION.md:150`: *"chrome, navigation and layout —
logical inline/block direction follows the document."* A direction-blind caster is a direction-blind
layout material. (Moot if D-3's REMOVE disposition is executed.)

---

### D-13 · MINOR · The root wrapper element measures zero and does nothing

`ExtractPane.vue:2` — `<div class="relative w-full mx-auto h-full min-w-0">`. Measured at both
viewports, the wrapper's rect is **identical to both its parent's and its child's**:

```json
"grandRect":   { "x": 199, "y": 201, "w": 512, "h": 578.22 },   // .pane-wrapper (shell-owned)
"parentRect":  { "x": 199, "y": 201, "w": 512, "h": 578.22 },   // this <div>
"extractRect": { "x": 199, "y": 201, "w": 512, "h": 578.22 }    // the Card
```

Term by term:

- `mx-auto` — a no-op. `margin-inline: auto` cannot centre a `w-full` box with no `max-width`.
- `w-full` and `min-w-0` — declared here **and again** on the `Card` at `:5`.
- `h-full` — same, duplicated on the `Card`.
- `relative` — redundant: `ExtractWorkbench.vue:2` is itself `class="relative flex flex-col"` and is
  the actual containing block for `ImageEyedropper.vue:8`'s `absolute inset-0`.

Four classes, zero effect, one extra DOM node in every pane swap and `KeepAlive` retention. It exists
because `GradientPane.vue:19` and `GeneratePane.vue:30` have the same dead wrapper and it was copied.

---

### D-14 · MINOR · A domain type re-declared for the fourth time

```
$ grep -rn 'type DisplayColorSpace' demo/
demo/workbenches/extract/ExtractWorkbench.vue:202:type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ExtractPane.vue:30:type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:21:export type DisplayColorSpace = SpaceId | "hex";
demo/color-session/color-model.ts:29:export type DisplayColorSpace = PickerSpace | "hex";
```

`useImageSampler.ts:21` **exports** the identical alias, from inside this same feature folder.
`ExtractPane.vue:30` re-declares it locally anyway, as does the workbench. The pane also re-defaults
`colorSpace = "hex"` (`:32`) when `ExtractWorkbench.vue:20` already defaults it — two defaults for one
value, so a future change to either drifts silently. Edict 3 (KISS, no contrivance): a private copy
of a public type is a contrivance.

---

### D-15 · MINOR · **HYPOTHESIS** · Asymmetric injection discipline; deferred failure

`ExtractPane.vue:36` — `const pm = inject(COLOR_TARGET_PORT_KEY)!;` — non-null assertion, no default,
no guard. Its own child does the safe thing four lines into its own script:
`ExtractWorkbench.vue:36` — `inject(CSS_COLOR_KEY, undefined)`.

`emitSetCurrentColor` and `emitAddColor` are plain closures on the port object
(`usePalettePorts.ts:234-240`), so unbound method references in the template are safe. The failure
mode is a **deferred** one: without the provider the pane mounts clean and then throws on the first
pick or add. **Reproduction: NONE** — `providePalettePorts` runs at the composition root on every
in-app path, so I could not exhibit it. Labelled a hypothesis. Recorded because it makes the pane
untestable and unmountable in isolation, which is a design-boundary cost, not only a robustness one.

---

### D-16 · INFO · Extract has never been captured in any designed non-default state

```
$ for d in forced-colors-desktop keyboard-focus-desktop reduced-motion-desktop rtl-desktop rtl-mobile zoom-200-desktop; do ls .../shots/$d/; done
adminusers.png  blob.png  browse.png  gradient.png  picker.png     # × 6 directories
```

`/extract` appears in **none** of them. Forced-colors, keyboard focus, reduced motion, RTL and
200% zoom have never been observed for this pane in the tracked matrix; I supplied E3/E5 to close
part of the gap, and my WebKit `forcedColors: "active"` arm rendered indistinguishably from light
(the emulation appears inert in this engine) so **forced colors remains genuinely unobserved**. The
200% arm is likewise unobserved — `VISUAL-CONSTITUTION.md:62` requires *"actual in-app Browser
zoom, not a substituted CSS-width or responsive-emulation frame"*, which Playwright/WebKit cannot
produce, so I did not manufacture a false arm. A state that has never been captured has never been
designed.

---

### D-17 · INFO · **PLAUSIBLE** · Ghost caption ink below 4.5:1 on the dark arm

Sampled from `shots/safari-mobile-dark/extract.png`: lightest text pixel of
`· UNDEVELOPED PLATE — FEED IT AN IMAGE ·` = `rgb(221, 218, 216)` over local ground
`rgb(120, 96, 80)` → **4.21:1**, against 4.5:1 for this size. Peak antialiased ink may undershoot the
declared colour, so this is PLAUSIBLE rather than CONFIRMED, and the ink belongs to
`ExtractWorkbench.vue:164-166`, not to the pane. Recorded here because the pane is the composition
owner and because `PaneHeader.vue:118-124` asserts the `plate-ink` rung is *"≥4.5 on the composited
resting plate"* — the assertion does not survive the ghost's own `bg-well` ground.

---

## 4. Negative proof — what I tried to break and could not

The premise handed to this seat is that the design is wrong. It is, in eleven ways above. These are
the places I attacked and found sound, stated with the evidence that proves the negative:

1. **Reduced motion is correctly honoured.** Measured under `reducedMotion: "reduce"`, the pane's
   only live animation collapses:
   `{"name":"pulse","dur":"0.00001s","iter":"1"}` versus `{"name":"pulse","dur":"2s","iter":"infinite"}`
   at default. Source: the global guard at `demo/styles/animations.css:184-192`. Geometry is
   identical between the PRM and default arms (`578.2` both), i.e. reduced motion resolves *directly
   to the final geometry* as `VISUAL-CONSTITUTION.md:144` requires — it does not produce a different
   layout.
2. **No motion animates a layout property.** The pane declares no keyframes of its own and adds none.
   The header choreography it hosts animates `transform` and `opacity` only
   (`PaneHeader.vue:183-193`, `:205-222`); the source records that the *"F3 layout-animating fork"*
   (padding / font-size / grid-template-rows) was already retired. The scroll-driven arm is
   position-mapped and gated behind `@supports (animation-timeline: scroll())` with the rest state
   equal to the base state, so non-supporting engines and the PRM path paint the same designed rest.
   **Owner edict 6 satisfied** — nothing deleted, the keyframes live in `demo/styles/animations.css`.
3. **Vue 3.5 idiom is correct.** `const { colorSpace = "hex" } = defineProps<{…}>()` (`:32-34`) is the
   reactive-props-destructure form with a default, not `withDefaults`. No `defineModel` round-trip
   exists here, so no `shallowRef` cache is owed. **Edict 7 satisfied.**
4. **`verbatimModuleSyntax` is correct.** `import type { SpaceId } from "@mkbabb/value.js/color"`
   (`:28`) is the only type-only import and it is marked. **Edict 8 satisfied.**
5. **No horizontal overflow, anywhere.** `overflowX: 0` in all four tracked Safari matrices
   (`REPORT.json`) and `scrollWidth − innerWidth = 0` under `dir="rtl"` at 1440 (E5).
6. **The route is error-clean.** `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` for
   `/#/extract` in all four matrices; `blankOrNearBlank` and `darkClassMissing` are 0 fleet-wide.
7. **Exactly one main landmark.** `counts.main = 1` in all four matrices, and the pane emits none of
   its own — the shell owns it, per `VISUAL-CONSTITUTION.md:38`. Only the H1 half fails (D-9).
8. **RTL order and padding mirror correctly** (E5) — only the physical shadow does not (D-12).

---

## 5. Proposed cure — one transposition, not eleven patches

Eleven of the seventeen findings share a single mechanism: **a page region was housed in a specimen
`Card` plus a hand-copied utility string, when the design system already ships the housing.** They
should not be patched individually. The idiomatic cure is architectural and it is already paid for:

> **Adopt `@mkbabb/glass-ui@7.0.0`'s `InstrumentChassis` as Extract's outer housing**, with
> `proportion="preview-dominant"` (`VISUAL-CONSTITUTION.md:47` — the image is the stage),
> `boundaries={[]}` and `reserve="none"` (`OPTICAL-BENCH-COMPOSITIONS.md §5`, already ratified),
> and `state` driven from the session's real arm; then pass the workbench its `split` layout so the
> stage and the developed specimen occupy the chassis' two regions.

That one move discharges D-1 (right component), D-2 (proportion becomes a producer-enforced enum, not
a 50/50 accident), D-3 (the chassis, not a duplicate Card, becomes the protagonist and the empty
Palettes companion loses its claim to half the viewport), D-5 (the dead `split` path becomes the live
one and its dual-path debt retires), D-6 (`state` + `reserve` stop the chassis growing 22% for a
slider), D-7 (region slots replace reaching into the child's root), D-10 (stage / inspector / action
get their own boxes, so the overlay contract stops fighting the containment contract) and D-11 (the
nine-site magic string retires into a producer-owned component — **without** inventing the local
wrapper edict 3 forbids).

What remains after the transposition is small and local, and should be executed with it:

- **D-4** — the chassis must scroll the document on the narrow arm, not host an inner scroller.
- **D-8** — the chassis' material role must resolve to the neutral pole in dark, not a
  0.664-alpha tinted plate over the ambient (measure to C ≈ 0, not to a token name —
  `PROPORTION-AUDIT.md:73`).
- **D-9** — the route's identity must be the shell's single `<h1>`; `PaneHeader`'s `<h3>` is the
  wrong rank for the display voice at the site that owns the route name. Producer-adjacent; relay to
  glass-ui BH per the standing fond.
- **D-12** — the caster shadow is PR-05 **REMOVE**; deleting it also deletes the RTL defect.
- **D-13 / D-14** — delete the no-op wrapper `div` and the duplicated type/default in the same cut.
- **D-15** — bring the pane's `inject` to the same discipline as its child's.
- **D-16** — capture `/extract` into the five missing state matrices before the wave closes; the
  200% arm must be actual in-app zoom.

**Owner edicts breached by this component: 1 (god-pattern by string), 2 (dead `split` dual path),
3 (private copy of an exported type), 4 (glass-ui component bypassed while installed), 5 (per-instance
override onto a child root). Edicts 6, 7, 8 are satisfied.**

---

## 6. Evidence index

| Path | What it is |
|---|---|
| `evidence/D-desktop-1440-populated.png` | 1440×900 @DPR2, real 5-colour PNG loaded — the 458 px stage beside the 512 px void |
| `evidence/D-mobile-390x664-k16-clip.png` | 390×664 (the shipped capture frame) at k=16 — 181 px of pane behind an inner scroller, AT caption off-screen |
| `evidence/probe-geometry.mjs` | WebKit geometry probe (pane rects, computed `contain`/`overflow`/`shadow`/`bg`, heading inventory) |
| `evidence/probe-states.mjs` | WebKit state probe (390×664 k=5/k=16, 1440 k=16, PRM, forced-colors) |
| `../../visual/REPORT.json` | tracked Safari matrix, `/#/extract` × 4 arms |
| `../../visual/shots/safari-*/extract.png` | the four tracked captures sampled in D-8 and §2 |
| `../../om-15-text/TEXT-CONTRIVANCE-AUDIT.md:230-270` | the ghost-placeholder half of D-6, already adjudicated |
