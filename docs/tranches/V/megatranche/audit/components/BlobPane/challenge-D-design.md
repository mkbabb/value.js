# CHALLENGE-D — `demo/scenes/blob/BlobPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat, declared explicitly at spawn. Seat is declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. Task named HEAD `c654824e`;
`git rev-parse --short HEAD` at audit time returned **`f36f780c`** (the working tree moved under
the formation between spawn and execution — recorded, not corrected; no source was edited by this
seat).

---

## Verdict

**DEFECTIVE.**

BlobPane is not a workbench. It is a **form with no instrument**. It renders 31 sliders whose
subject is not present on the page, whose values are contradicted by the only thing that renders,
and which — measured at rest — change nothing at all. The single strongest defect (D-3) is a
measurement: **five of six max-range slider sweeps changed 0 of 129,600 canvas pixels**, while the
picker's colour channel — a control on a *different pane* — changed 21.68% of them.

Nine defects rise to BLOCKER/MAJOR. The component also fails the tranche canon by direct quotation
in four separate places (`VISUAL-CONSTITUTION.md` §3.3, §3.1 Blob row, §4, §7 "Atmosphere and
Blob"; `PROPORTION-AUDIT.md` PR-05/PR-10; `demo/DESIGN.md` card-lock law).

---

## Evidence base

| Kind | Source |
|---|---|
| Real-Safari matrix | `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` (4 matrices × 15 routes) |
| Screenshots read (vision) | `shots/safari-desktop-light/blob.png`, `safari-desktop-dark/blob.png`, `safari-mobile-light/blob.png`, `zoom-200-desktop/blob.png`, `rtl-desktop/blob.png`, `keyboard-focus-desktop/blob.png`, `forced-colors-desktop/blob.png` |
| Live probes (Chromium, headless, `localhost:9000`) | 6 scripted runs — geometry census, computed-style dump, forced-colors arm, idle-park arm, live-window sweep arm |
| Static | `demo/scenes/blob/BlobPane.vue`, `demo/scenes/ConfigSliderPane.vue`, `demo/picker/visual/HeroBlob.vue`, `demo/shell/{viewSchema.ts,usePaneRouter.ts}`, `demo/styles/foundation.css`, `demo/DESIGN.md` |
| Producer | `@mkbabb/glass-ui@7.0.0` — `dist/components/{blob/types.d.ts,configurator/*.d.ts}` |
| Canon | `docs/tranches/V/{VISUAL-CONSTITUTION,PROPORTION-AUDIT,PALETTE-CONTRACT}.md` |

Probe scripts retained at
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/blobprobe{,2,3,4,5,6,7,8}.mjs`.

**Note on one piece of supplied evidence.** `shots/forced-colors-desktop/blob.png` is **not a
forced-colors capture** — it renders the full chromatic palette (pink ambient field, crimson
`Login`, spectral Lab ramps), which WHCM substitution would have flattened. I re-ran the arm live
with Playwright `forcedColors: "active"` (probe 8) rather than cite that frame. The stored frame
should be re-captured or struck.

---

# Findings

## Family F1 — "form without instrument"

### D-1 · BLOCKER · `/#/blob` renders **zero** Blob controls below the `lg` rung and at 200% zoom

At 390×844 the route named "Blob" mounts **no part of BlobPane**. Not hidden — not mounted.

```
probe 1, viewport 390×844, http://localhost:9000/#/blob, settle 3.5s
  rowCount: 0        sliderCount: 0        wellRect: null
  canvases: [atmosphere-canvas 390×844, goo-blob-canvas 179.2×179.2]
```

Independently in WebKit — `REPORT.json` `safari-mobile-light /#/blob`:
`"bodyTextLength": 69`, `"allElements": 228`, and the `smallTapTargets` list contains only the
picker's four channel handles. Desktop, same route: `"bodyTextLength": 713`,
`"allElements": 642`, 35 slider entries. **Two engines agree.**

At 200% browser zoom on a 1440-wide desktop (CSS viewport 720×450) the same collapse occurs:

```
probe 2, viewport 720×450:  {"rows":0,"sliders":0,"bodyText":68}
```

corroborated by `shots/zoom-200-desktop/blob.png`, which shows the Picker with the segmented
control reading `Picker | Blob` and **Picker** selected — on the `/#/blob` URL.

**Mechanism.** `viewSchema.ts:179-187` declares `blob: { left: "color-picker", right: "blob" }`.
`usePaneRouter.ts:177-184` resolves the mobile slot as `desktopRight` **only when
`mobilePaneIndex === 1`**; the default index is 0, so the narrow branch serves `desktopLeft` — the
Picker. The route's own pane is behind a pane selector that the route does not preselect.

Compare the sibling composition: `viewSchema.ts:170-178` gives `atmosphere: { left: "atmosphere",
right: null }` — a full-width protagonist. `VISUAL-CONSTITUTION.md §3.1` lists Blob and Atmosphere
as **peer members** with the same "Mobile order: preview, essentials, advanced", and §3 law 6
forbids exactly the mechanism in play: *"no global pane selector, left/right split state, or
simultaneous two-stage miniature survives."*

**Reproduction.**
`node blobprobe.mjs` (both viewports) — or open `http://localhost:9000/#/blob` at 390px width and
observe the Blob pane is absent until you tap `Blob` in the dock's segmented control.

---

### D-2 · BLOCKER · There is no preview. The form outweighs its subject **35 : 1**

Measured live at 1440×900, `/#/blob`:

| Element | Rect | Area |
|---|---|---:|
| `canvas.goo-blob-canvas` (the only blob) | x 564.6 · y 113.7 · 180.2 × 180.2 | **32,468 px²** |
| `.config-console` (the slider well) | x 754 · y 219.4 · 462 × 2471.3 | **1,141,739 px²** |
| `.pane-scroll-fade` (the *visible* port alone) | 510 × 695 | 354,450 px² |

Form : preview = **35.2 : 1**. Even counting only the pixels of the form that are on screen at
once, it is **10.9 : 1**.

Worse: the blob at x 564.6–744.8 is **inside the Picker card**, in the *left* pane; BlobPane's
scroll port begins at x = 730. The Blob workbench's "preview" is a component of a different
instrument.

`VISUAL-CONSTITUTION.md §3` law 3 is unambiguous:

> Configuration panes show preview first, controls second. **Atmosphere/Blob preview area is
> larger than the form at every desktop size.**

§7 "Atmosphere and Blob" is more specific still:

> The dedicated Blob workbench owns a persistent container-scaled material preview filling P122's
> exact `preview-dominant` 66.6666667% stage … **it does not reuse the Picker inline-seat
> diameter.**

It reuses precisely that seat. `HeroBlob.vue` template line 10 marks the element
`class="pointer-events-none" aria-hidden="true"` — so the Blob workbench's specimen is an
**aria-hidden decorative ornament belonging to another pane**. `PROPORTION-AUDIT.md` PR-10 already
booked this family ("Atmosphere/Blob form acreage exceeds preview → TIGHTEN → Primary W28");
BlobPane is the unremediated site, and PR-15 explicitly rejects the substitute:
*"raw-buffer Blob geometry can pass while the composed Blob is absent or occluded."*

**Reproduction.** `node blobprobe.mjs`; or read `shots/safari-desktop-light/blob.png` — the pearl
top-right of the *left* card is the entire preview.

---

### D-3 · BLOCKER · **STRONGEST** — the console has no causal link to the preview

Two independent mechanisms, one gestalt: turning a knob does not move the thing.

**(a) Four sliders are permanently overridden.** `HeroBlob.vue:152-178` builds the config it hands
the renderer:

```js
const heroConfig = computed<BlobConfig>(() => ({
    ...appBlobConfig,
    geometry: {
        ...appBlobConfig.geometry,
        bodyRadius: 0.325,      // ← BlobPane's "Body Radius"    (live readout: 0.220)
        orbitRadius: 0.4,       // ← BlobPane's "Orbit Radius"   (live readout: 0.170)
        satelliteRadius: 0.09,  // ← BlobPane's "Sat Radius"     (live readout: 0.082)
        eccentricity: 0.03,     // ← BlobPane's "Eccentricity"   (live readout: 0.050)
    },
    …
}));
```

passed at `HeroBlob.vue:16` as `:config="heroConfig"`, and the producer seam is
`config ?? injectedConfig` (documented in the same file, lines 63-65) — **the prop wins.**
`appBlobConfig` is the very object `BlobPane.vue:17` injects and mutates. Therefore **four of the
five sliders in "Geometry" — the first section, above the fold — cannot affect the only blob on
the route**, and their readouts state values the render is not using. The pane displays `0.220`
while the renderer draws `0.325`.

**(b) At rest the renderer is parked, and the console does not wake it.** `HeroBlob.vue:180-190`
parks the WebGL loop after an idle threshold with no *"colour or save activity"*. Config mutation
is not in the wake set. Measured (probe 6, canvas clip 360×360 device px = 129,600 samples):

```
== phase 1: wait for the idle-park (no input at all) ==
  t+7.5s  idle diff {"changedPx":0,"pct":0,"mad":0}   --> PARKED (byte-identical frames)

== phase 2: max-range slider changes while parked ==
  Body Radius    0.22  -> 0.45   canvas Δ {"changedPx":0,     "pct":0,    "mad":0}
  Core Glow      0.06  -> 1      canvas Δ {"changedPx":6367,  "pct":4.91, "mad":1.449}
  Iridescence    0.09  -> 1      canvas Δ {"changedPx":0,     "pct":0,    "mad":0}
  Specular       0.16  -> 2      canvas Δ {"changedPx":0,     "pct":0,    "mad":0}
  Hue Range      5     -> 60     canvas Δ {"changedPx":0,     "pct":0,    "mad":0}
  Warp           0.35  -> 1      canvas Δ {"changedPx":0,     "pct":0,    "mad":0}

== phase 3: control — the declared wake source ==
  picker L channel -12 steps     canvas Δ {"changedPx":28098, "pct":21.68,"mad":8.873}
```

**Five of six full-range sweeps produced a byte-identical frame.** The renderer is demonstrably
alive and responsive (21.68% on the picker arm). It simply does not listen to its own console.

Corroboration in the live window (probe 7 — wake first, then sweep, normalised against the blob's
own frame-to-frame churn):

```
Body Radius   0.22 ->0.45   liveJitter 2.01%  sweepΔ 1.83%  ratio 0.91x   ← below noise
Eccentricity  0.05 ->0.5    liveJitter 3.23%  sweepΔ 2.22%  ratio 0.69x   ← below noise
Noise Amp     0.038->0.1    liveJitter 2.26%  sweepΔ 5.28%  ratio 2.34x   ← real (pass-through)
Iridescence   0.09 ->1      liveJitter 3.62%  sweepΔ 6.86%  ratio 1.90x   ← real (pass-through)
```

A 105% increase in body radius and a 10× increase in eccentricity register **below the blob's own
idle wobble**; the two atoms `heroConfig` does *not* override register above it. The pixel arm is
corroborative (soft-SDF noise floor ≈ 2%); the source override in (a) is decisive.

`VISUAL-CONSTITUTION.md §7` states the law for the sibling and it plainly binds here:
*"every select/axis has an observable effect on its live preview."*

**Reproduction.** `node blobprobe6.mjs` then `node blobprobe7.mjs`. Manually: load `/#/blob`, wait
~8 s without touching anything, then drag `Warp` from 0.35 to 1.0 and watch nothing happen.

---

### D-4 · MAJOR · 31 controls, 7 flat sections, 3.76 screens, no disclosure, no presets, no compare

```
probe 1:  rowCount 31 · sliderCount 31
          scroll { clientH 695, scrollH 2611, screens 3.76 }
          sectionHeaders ["Geometry","Membrane","Color","Lit Glass","Pointer","Satellites","Tempo"]
```

Every section is open, equal-weight, non-collapsible, and non-sticky. There is no essentials tier,
no advanced tier, no preset row, no compare/dirty state, no section navigation, and the section
header scrolls out of view above its own rows.

`VISUAL-CONSTITUTION.md §3.1`, Blob row, column "Support / collapse":
**"compact morphology essentials plus scroll-confined advanced disclosure"**. §7: *"compact
essential morphology controls, advanced grouped disclosure, **reset/compare** and a scroll-confined
inspector"*. None of the four exist.

**This is self-inflicted.** glass-ui 7.0.0 ships every one of them
(`dist/components/configurator/`):

| Producer surface | What it gives | BlobPane uses |
|---|---|---|
| `<Configurator>` | `stage` slot + controls aside (`asideSide`, `asideWidth`), `scrollMode: auto/always/never` (the *scroll-confined inspector*), `footer` slot with `reset` | ✗ |
| `<ConfiguratorLayer>` | collapsible labeled section, chevron, `defaultOpen`, `role=button`+`aria-expanded`+`aria-controls`, CSS-only `0fr↔1fr` reveal | ✗ |
| `ConfiguratorPreset<T>` + `useConfiguratorState` | presets, `activePreset`, **`isDirty`**, `resetCurrent()`, `cyclePreset()` — i.e. *reset/compare* | ✗ |
| `<ConfiguratorRow>` | the leaf row (`label` / `sub` / `name` / `canReset`) | ✓ (leaf only) |

`ConfiguratorLayer.vue.d.ts` even names the intended split verbatim:
*"blob has Mood / Body / Surface / Color / Motion / Pointer / Render"*.

`ConfigSliderPane.vue:6-10` acknowledges the package and then declines its frame:
*"glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState. This
component uses ConfiguratorRow for each labeled row … The section-group wrapper and the floating
copy/reset dock **remain demo-local**."* It names `useConfiguratorState` and never calls it. The
demo hand-rolls the section group (`.config-section-header`, a bare `<div>` + hairline, no
collapse, no `aria-expanded`), the scroll port (`.pane-scroll-fade` vs the producer's
`FadingScroll`), and the footer (`.config-action-bar` + `GlassDock` vs the `footer` slot).

**Owner edict 4 violation** ("Glass-ui is the design system … Reuse existing component-type
names"): three producer primitives re-implemented locally at lower fidelity.

**Reproduction.** `node blobprobe.mjs` (scroll metrics); `cat
node_modules/@mkbabb/glass-ui/dist/components/configurator/index.d.ts`.

---

## Family F2 — the fallback used as material

### D-5 · MAJOR · The tracks are the app's *no-signal grey*, permanently, and carry no value

`ConfigSliderPane.vue:202`:

```css
.config-console { --slider-track-bg: var(--ink-muted, var(--muted-foreground)); }
```

Measured live: the painted track resolves to `oklch(0.447121 0.00386159 34.63)` — **chroma
0.0039**, achromatic — on a well of `oklab(0.913295 0.0055 0.0130)`. The only painted element in
the whole slider subtree is `.slider-track`; the fill is not painted at all:

```
probe 2, paint census across .glass-slider subtree:
  [ { cls: "slider-track", bg: "oklch(0.447121 0.00386159 34.63)", rect: 432×24 } ]
  — .slider-range ("slider-range glass-liquid-fill") is absent: background transparent, no image.
```

Three compounding design errors:

1. **A text token used as a fill.** `--ink-muted` is the *certified de-emphasis ink*. Every other
   consumer in the tree uses it as `color:` — `ExtractWorkbench.vue:291`, `ImageDropZone.vue:110`,
   `ExtractControls.vue:149`. ConfigSliderPane is the **only** site that paints it as a
   background. The result, visible in `shots/safari-desktop-light/blob.png`, is seven near-black
   slabs; in `safari-desktop-dark/blob.png` the same rule inverts to seven near-white slabs that
   are **the brightest ink on the page**, out-massing the `Blob` title by orders of magnitude. A
   de-emphasis rung is producing the pane's dominant optical mass — an inverted hierarchy in both
   schemes.
2. **The fallback taken as the default.** `ExtractControls.vue:124` shows the correct idiom:
   `cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)"` — chromatic when a
   live pick threads, grey only when nothing does. The config console pins the *else* branch
   forever. In the same 1440px frame the Picker's four Lab channels are full spectral ramps while
   the Blob pane's `Color → Hue Range / Saturation / Brightness` rows are grey. The chromatic
   semantics are inverted relative to `VISUAL-CONSTITUTION.md §5`: *"a **color-bearing or neutral
   track chosen by semantics**"*.
3. **The declared variant is defeated.** `ConfigSliderPane.vue:146` passes `variant="spectrum"`
   (confirmed live: `sliderVariant: "spectrum"`), then overrides the track and leaves the range
   transparent. The control therefore announces the spectrum recipe and paints none of it, and —
   because the range is the piece that would show *where the value sits* — **31 tracks carry zero
   value information**. The only value signal is a 12 px-wide hollow thumb and an 11 px number.

**Owner edict 5 violation** (root-level styling, never per-instance override): a per-instance
custom-property override that defeats the variant the same line requests.

**Reproduction.** `node blobprobe2.mjs`; read the light and dark shots side by side.

---

### D-6 · MAJOR · Under forced colors the track becomes **invisible**, and the range opts out of substitution while painting nothing

Live, Chromium, `forcedColors: "active"`, light system theme (probe 8):

```
### forcedColors=active ###
 well:    { bg: "rgb(255, 255, 255)", fca: "auto" }
 track:   { bg: "rgb(255, 255, 255)", fca: "auto" }     ← identical to the well
 range:   { bg: "rgba(0, 0, 0, 0)",   fca: "none" }     ← opted OUT, paints nothing
 thumb:   { bg: "rgba(255, 255, 255, 0)", bs: "none" }  ← transparent, shadow stripped
```

WHCM strips `--ink-muted` and substitutes `Canvas`; the well is also `Canvas`. Track and well are
now the **same colour**, and the thumb is transparent with its glass specular box-shadow removed.
The entire 31-control surface loses its control extent.

The cause is the costume from D-5. `demo/styles/foundation.css:693` enrols
`.glass-slider[data-variant="spectrum"] .slider-range` in the tier-1 "colour-DISPLAY surface"
roster — `forced-color-adjust: none`, i.e. *keep your real colours*. The config console wears
`data-variant="spectrum"` so it inherits that protection **for an element that has no colour**,
while the one element that *is* painted (the track) is not in the roster and gets substituted
away. The WHCM policy was written for a real spectrum rail; BlobPane wears the attribute without
the content and is protected in exactly the wrong place.

`VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier"*, *"Focus remains visibly distinct from selection in both schemes,
**forced colors** and reduced transparency."*

**Reproduction.** `node blobprobe8.mjs`.

*(Scope note: I did not measure the focus indicator under WHCM — a scripted `.focus()` does not
reliably arm `:focus-visible`, and the seat's standing note forbids manufacturing a11y findings
without a two-engine reproduction. The track/range/thumb result above is `:focus`-independent and
stands.)*

---

## Family F3 — the datum is the smallest, faintest, least stable thing in the pane

### D-7 · MAJOR · The live readout violates the NORMATIVE card-lock law on both required mechanisms

`demo/DESIGN.md:60-79` — **NORMATIVE**, R.W3 Lane A / A6, U31:

> Hero/readout numbers may be as audacious as the display ramp allows, but **a value change may
> never move the card** … Two mechanisms, **both required** wherever live numeric values render:
> 1. **Tabular figures** — `font-variant-numeric: tabular-nums` … on every live numeric readout
> 2. **`ch` worst-case reservation** — the readout's container reserves the widest legal rendering
>    of its format up front … so sign flips, added decimals, and unit swaps re-ink the SAME box
>    instead of re-flowing the row.

Measured across all 31 readouts:

```
probe 1:  readoutFVN  ["normal"]        ← mechanism 1 absent, on every row
          readoutMinW [null / "auto"]   ← mechanism 2 absent, on every row
          rendered widths: "3" → 6.8px   "0.220" → 33.9px     (a 27.1px swing in one column)
```

Every other live-number surface in the app declares it — `ComponentSliders.vue:311`,
`ColorComponentDisplay.vue:147`, `ExtractControls.vue:15,78`, `GenerateControls.vue:212,288`,
`AdminAuditPanel.vue:70`, `PaginationBar.vue:17`. The Blob console is the exception.

The formatter makes it worse. `ConfigSliderPane.vue:84-86`:

```js
function fmt(v: number): string { return Number.isInteger(v) ? String(v) : v.toFixed(3); }
```

Swept over BlobPane's declared `[min,max,step]` triples:

```
tempo               char-widths seen: 1/5   … "1.900" -> "1.950" -> "2"     -> "2.050"
membrane.noiseFreq  char-widths seen: 1/2/5 … "4.800" -> "4.900" -> "5"     -> "5.100"
interaction.pointerAttraction  char-widths seen: 1/2/5/6  ("-1" … "-0.950" … "0" … "1")
surface.specStrength / rimPower / stretch / pulseFreq / colorNoiseFreq: 1/5
```

Dragging `Tempo` one step, the readout collapses **five characters to one and back**. This is not
a rounding nicety — mid-drag the number changes *kind*, reading as an integer count where its
neighbours read as a 3-decimal quantity. `VISUAL-CONSTITUTION.md §4` restates the same duty:
*"Live numbers use tabular figures and reserve their widest legal representation so value changes
never reflow the settled chassis."*

**Reproduction.** The sweep above is `node -e` over the `fmt` body and the SECTIONS triples
(reproduced in full in the probe transcript); the computed-style census is `node blobprobe.mjs`.

---

### D-8 · MAJOR · Inverted type hierarchy, and two type-jurisdiction violations in one row

Measured computed styles, one `.configurator-row` (probe 2):

| Element | Family | Size | Role it plays |
|---|---|---:|---|
| `.config-section-title` ("GEOMETRY") | **Fira Code**, uppercase, tracked | **16.4 px** | section heading |
| `label.glass-label text-small` ("Body Radius") | Plus Jakarta Sans, 500 | **16.4 px** | control label |
| `span.text-micro font-mono` ("0.220") | Fira Code, `--ink-muted` | **11 px** | **the value** |

Two failures, one optical:

1. **The section heading is the same size as the rows it groups** (16.4 px = 16.4 px) and is set
   in the *mono* family. `VISUAL-CONSTITUTION.md §4` assigns *section heading → `text-heading` →
   Plus Jakarta Sans*, and reserves Fira Code for *"value, code, or provenance"*. The matrix is
   declared **"closed across all eighteen compositions"** with exactly one named exception
   (P019's Picker pair). This is a second, undeclared exception. With no size rung between
   grouping furniture and content, the seven headers do no hierarchical work — they are
   distinguished only by case and colour.
2. **The value is the smallest and faintest type in the pane.** `text-micro` = 11 px, at the
   `--ink-muted` de-emphasis rung, 33% smaller than its own label and 33% smaller than the
   section header above it. §4 assigns *value → `text-mono-small`*, not `text-micro`. In a
   console whose entire purpose is reading and setting numbers, the number is de-emphasised below
   the furniture — and, per D-5, it is also the *only* place the value appears, because the track
   carries no fill.

Both label and value additionally carry `truncate` with `min-width: auto` inside a `min-w-0` flex
row, so the value is one container-narrowing away from rendering `0.2…`.

**Reproduction.** `node blobprobe2.mjs`.

---

### D-9 · MINOR · Two pairs of controls share an accessible name

Live, and independently in the WebKit report:

```
probe 1:  duplicateLabels [ ["Noise Freq", 2], ["Noise Speed", 2] ]
REPORT.json safari-desktop-{light,dark} /#/blob smallTapTargets:
          "Noise Freq" ×2, "Noise Speed" ×2
```

`BlobPane.vue:71-72` labels `membrane.noiseFreq` / `membrane.noiseSpeed` "Noise Freq" / "Noise
Speed"; lines 83-84 give `color.colorNoiseFreq` / `color.colorNoiseSpeed` the **same two strings**
with different domains and different ranges (0.5–10.0 vs 0.5–8.0; 0.0–0.5 vs 0.0–0.3).
Disambiguation rests entirely on visual proximity to a section header that is neither sticky nor
programmatically associated — and that scrolls away after two rows.

`ConfiguratorRow` ships a `sub` prop precisely for this (*"the double-label API … Use `sub` for a
descriptive secondary label"*, `ConfiguratorRow.vue.d.ts`). It is unused.

---

### D-10 · MINOR · Bipolar axes are drawn identically to unipolar ones

Three of the 31 are signed with a meaningful zero — `color.satShift` (−0.2…0.2),
`color.brightnessShift` (−0.15…0.15), `interaction.pointerAttraction` (−1.0…1.0). They render with
the same uniform track, no origin mark, no centre detent, and (per D-5) no fill at all, so
"Saturation −0.005" and "Saturation +0.195" are visually identical apart from a 12 px thumb
position. `Attraction` is additionally the one row whose readout can reach 6 characters (`-0.950`)
against a `min-width: auto` box (D-7).

---

### D-11 · MINOR · A unit is smuggled into a label

`BlobPane.vue:111-112` — `s("satellites.mergeDuration", "Merge (ms)", …)`,
`s("satellites.emergeDuration", "Emerge (ms)", …)`. `VISUAL-CONSTITUTION.md §5` specifies the axis
composition as *"label, unit, reserved live value, optional numeric entry"* — four distinct slots.
Two of the four are absent from the whole pane (unit, numeric entry); here the unit is
concatenated into the label string. Millisecond durations then render as bare `500`…`5000` beside
normalised 0–1 quantities rendered as `0.220`, with nothing distinguishing the domains.

---

## Family F4 — a generic pane erased the domain

### D-12 · MAJOR · 17 of the config's 48 axes are unreachable — including the master switch and the flat↔dressed axis

Census against `@mkbabb/glass-ui@7.0.0`'s live `BLOB_CONFIG_DEFAULTS`:

```
total leaves in the emitted config: 48      numeric leaves: 39      pane sliders: 31

NUMERIC ATOMS WITH NO SLIDER (8):
  geometry.canvasSize · color.lightnessFloor · surface.shadowSoftness · surface.iridHue
  surface.iridSpeed · surface.sssPower · surface.fissionAmp · morphT

NON-NUMERIC AXES WITH NO CONTROL (9):
  satellites.absorbedDuration · satellites.orbitDuration · membrane.merge · color.paletteStops
  surface.lit · surface.shadow · surface.rimColor · surface.lightDir · quality

morphT default = 1   surface.lit = true   quality = "full"
```

The omissions are not peripheral:

- **`morphT`** — the producer calls it *"The sole flat↔dressed surface axis … `0` is the flat warm-
  cream blob, `1` is the fully dressed lit meatball."* The single most consequential control on
  the object has no UI. At `morphT = 0` every one of the seven "Lit Glass" sliders becomes a
  no-op, and the pane offers no way to see or set it.
- **`surface.lit`** — a boolean. The section is *titled* "Lit Glass" and omits the switch that
  turns lighting on.
- **`surface.rimColor`** (a CSS colour string) and **`surface.lightDir`** (`[x,y,z]`) — in a
  colour tool, the rim's *colour* and the light's *direction* are unreachable while their
  *magnitudes* (`rimStrength`, `rimPower`, `specStrength`, `specShininess`) are exposed. Every
  atom in "Lit Glass" is a magnitude whose direction or hue is missing: `iridescence` without
  `iridHue`/`iridSpeed`, `sssScale` without `sssPower`, specular without `lightDir`. It is a
  half-instrument.
- **`surface.fissionAmp`** — the producer's headline "MERCURY-COLONY split register"; `HeroBlob`
  sets it to `0.6` behind the pane's back.
- **`membrane.merge`** (`quadratic | circular`) and **`quality`** (`full | half`) — enums.

The enum gap is self-imposed: `ConfigSliderPane.vue:12-14` documents that *"AuroraPane … drives the
default slot with its enum-atom Select rows (harmony / arrangement / medium / motion) above the
sliders."* The mechanism exists in the same file. BlobPane passes no slot content
(`BlobPane.vue:122-130`).

**Mechanism.** The `NumericAtomPath` guard at `BlobPane.vue:36-48` is an *exhaustiveness guard
pointed the wrong way*. It proves every key it is given exists; it cannot prove every key that
exists is given. And the narrowing is discarded at the boundary anyway: `s()` returns
`{ key: NumericAtomPath, … }`, which is assigned into `SliderSection[]` whose
`SliderDef.key: string` (`ConfigSliderPane.vue:28`) — the branded union widens to `string` on
assignment, so no exhaustiveness check is even expressible. 26 of the file's 130 lines (20%) are a
variance essay defending a guard that does not guard the thing that actually broke.

**Reproduction.** `node --input-type=module -e "import { BLOB_CONFIG_DEFAULTS } from
'@mkbabb/glass-ui/blob'; …"` (full script in the transcript).

---

### D-13 · MINOR · "Copy JSON" is a one-way dump of a superset with no counterpart and no result

`ConfigSliderPane.vue:88-90`:

```js
async function copyAsJson() { await writeClipboard(JSON.stringify(config, null, 2)); }
```

It serialises the **whole injected `BlobConfig` — 48 leaves** — of which the pane can set 31
(65%). The dump therefore contains `color.paletteStops` (the live picker-derived ramp that
`useAtmosphere.ts:387-399` rewrites on every colour change, and which `BlobPane.vue:8-9`
deliberately excludes from the sliders), plus `surface.lightDir`, `rimColor`, `quality`,
`morphT`, and both duration tuples. There is no import path anywhere in the app, so the artefact
cannot be round-tripped. There is also no success/failure surface: the promise is awaited and
discarded, so a rejected clipboard write is an unhandled rejection with no user-visible result.
`VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace. A
transient flourish may celebrate success but never carries the only truth."* Here nothing carries
it.

---

### D-14 · MINOR · "Reset" is destructive, unconfirmed, un-undoable, and visually identical to "Copy"

`ConfigSliderPane.vue:92-94` — `Object.assign(config, structuredClone(defaults))` discards all 31
tuned values with no confirmation and no undo. Both buttons are `variant="ghost" size="sm"` inside
the same `GlassDock` (lines 164-173), so the destructive verb and the benign one are rendered at
identical weight, adjacent, with no separation. `useConfiguratorState`'s `isDirty` + `resetCurrent`
(the producer's own answer, shipped in glass-ui 7.0.0) is not used, so the pane cannot even tell
the user there is anything to lose.

---

### D-15 · MINOR · The pane description restates the section headers

`BlobPane.vue:128` — *"Tune metaball geometry, membrane, lit-glass surface, and satellite
behavior."* Four of the seven section titles rendered immediately below it are `Geometry`,
`Membrane`, `Lit Glass`, `Satellites`. In `shots/safari-desktop-light/blob.png` the sentence wraps
to two lines directly above the words it repeats. `PROPORTION-AUDIT.md §5` law 6: *"Subtraction
precedes explanation."*

---

## Family F5 — boundary inflation

### D-16 · MINOR · Nine boundary lines in one pane, against a binding inventory of zero

Counted in the rendered pane: **7** `.config-section-header` bottom hairlines
(`ConfigSliderPane.vue:232-235`, one per section) + **1** `.console-well` border
(`foundation.css:350-354`, widened to 2px under `prefers-contrast`, line 743) + **1**
`.config-action-bar` top border (`ConfigSliderPane.vue:250`) = **9**.

`PROPORTION-AUDIT.md` PR-05 is binding and quantified: *"`OPTICAL-BENCH-COMPOSITIONS.md §5` is
binding: every P122 workbench uses boundaries `[]`/reserve `none`; only the five Admin fields
retain one adjacent-row separator and no terminal rule; **every other divider/ornament is zero**."*
§5 law 4: *"A divider is retained only when grouping would be ambiguous without it. Spacing plus
material already expressing the same boundary makes the line duplicative."*

The well's own border is the clearest case: it bounds a **462 × 2471 px** box inside a **695 px**
port. Its top and bottom edges are 3.76 screens apart and are never visible together — a boundary
that, for the entire middle of the scroll, communicates nothing at all.

---

## State coverage matrix

Every state the component can be in, and its disposition.

| State | Handled? | Evidence |
|---|---|---|
| populated (desktop, light) | partial — see D-5/D-7/D-8 | `shots/safari-desktop-light/blob.png` |
| populated (desktop, dark) | **defective** — tracks invert to the brightest ink on the page (D-5) | `shots/safari-desktop-dark/blob.png` |
| **mobile (≤ lg)** | **NOT RENDERED** (D-1) | probe 1: `rowCount 0`; `REPORT.json` bodyText 69 |
| **zoom 200%** | **NOT RENDERED** (D-1) | probe 2: `{"rows":0,"sliders":0}`; `shots/zoom-200-desktop/blob.png` |
| **empty** | unreachable-but-coded | `ConfigSliderPane.vue:44` documents `sections: []` → empty state; the whole slider block and the action bar `v-if` away, leaving a header alone in a full-height Card. BlobPane never passes it. Dead branch — **owner edict 2** (no dual paths). |
| loading | **absent** | `usePaneRouter.ts:78` `defineAsyncComponent` with no `loadingComponent`/`errorComponent`; the pane pops in |
| error | **absent** | no boundary; a thrown `inject(BLOB_CONFIG_KEY)!` (non-null asserted, `BlobPane.vue:17`) would blank the pane |
| disabled | **not designed** | no disabled path anywhere in the 31 rows |
| hovered | producer default only | no row-level hover affordance; no `canReset` per row |
| focused | weak | `outline: none`; focus is a 2 px box-shadow at **30% alpha** (`color(srgb 0.6655 0.0001 0.2617 / 0.3)`) over a near-black track — see `shots/keyboard-focus-desktop/blob.png`, where the ring on "Sat Radius" is barely separable from the thumb outline |
| active / pressed | producer default only | — |
| selected | n/a | — |
| dragging | **no feedback beyond the thumb** | no fill (D-5), no numeric entry, readout jitters (D-7) |
| **overflowing** | **unhandled** | 3.76 screens, no sticky section headers, no nav, no collapse (D-4) |
| truncated | latent | `truncate` + `min-width:auto` on both label and value (D-8) |
| **RTL** | **defective (inherited)** | `shots/rtl-desktop/blob.png` — "Body Radius 0.220" (min .08 max .45) puts the thumb at 38% **from the left** under `dir=rtl`; the picker's channels do the same, so the un-mirrored geometry is the shared `Slider` primitive, not BlobPane. Also a bidi artifact in the description: *"…and satellite\n.behavior"* |
| **reduced motion** | correct-by-absence | probe 2 under `reducedMotion: reduce`: 31 rows render; residual transitions are `opacity, color, background-color, border-color, box-shadow` at **0.1 s** — colour, not motion. **Not a defect.** |
| **forced colors** | **defective** (D-6) | probe 8 |
| reduced transparency | inherited | `foundation.css:757+` handles it globally; nothing pane-local |
| print | inherited | `foundation.css:812+` |

---

## Motion

**There is none.** BlobPane animates nothing; ConfigSliderPane animates nothing. No
`--animation-slide-sm/md/lg`, no scoped keyframes, no ad-hoc transitions of its own. Nothing has
been deleted (owner edict 6 clean).

That is not a virtue here — it is the shadow of D-4. The disclosure that *should* animate does not
exist. glass-ui's `ConfiguratorLayer` ships the reveal already built and deliberately
recursion-free (CSS-only `grid-template-rows: 0fr ↔ 1fr`, chosen over a reka `Collapsible` because
the JS height-measurement watcher *"forms a non-convergent loop that trips Vue's 100-iteration
recursion cap on `<Configurator>`"*). Adopting the producer layer brings the correct motion for
free; hand-rolling one would re-open the trap the producer already documented.

Residual under `prefers-reduced-motion: reduce`: 0.1 s colour/opacity transitions on every row
element. Colour transitions are not vestibular motion and
`VISUAL-CONSTITUTION.md §6` asks only that reduced motion *"resolves directly to the final
geometry and stable chromatic state"*. **Recorded, not charged.** (The seat's standing note on
PRM/a11y is respected: `useMetaballRenderer`'s single-frame reduced-motion path is separately
verified correct, and I make no claim against it.)

---

## Design-system boundary

| Reach | Producer surface that already exists | Verdict |
|---|---|---|
| hand-rolled section group + hairline (`ConfigSliderPane.vue:128-130, 232-243`) | `<ConfiguratorLayer>` — label, `sub`, chevron, `defaultOpen`, `aria-expanded`, `aria-controls`, CSS reveal, opt-in `dividers` | **violation** (edict 4) |
| hand-rolled scroll port (`.pane-scroll-fade scrollbar-thin overflow-y-auto`) | `<Configurator scrollMode="auto\|always\|never">` → `FadingScroll` scroll-port | **violation** |
| hand-rolled footer (`.config-action-bar` + `GlassDock`, lines 163-174) | `<Configurator>`'s `footer` slot, which supplies `reset` | **violation** |
| no preset/compare/dirty surface | `ConfiguratorPreset<T>` + `useConfiguratorState<T>` (`isDirty`, `resetCurrent`, `cyclePreset`) — **named in ConfigSliderPane's own header comment and never called** | **violation** |
| no stage | `<Configurator>`'s `stage` slot, the inspector idiom (stage left / controls right) | **violation** |
| `--slider-track-bg` per-instance override that defeats `variant="spectrum"` | the variant itself | **violation** (edict 5) |
| `:deep(.configurator-row .font-mono) { color: … }` (line 204) | `ConfiguratorRow`'s own ink | per-instance override of a producer leaf |
| `ConfiguratorRow` for the leaf row | — | ✅ correct |
| `GlassDock`, `Button`, `Card`, `Slider`, `writeClipboard` | — | ✅ correct |

Other edicts: **1 (no god modules)** — clean; BlobPane is a 130-line declaration.
**3 (KISS)** — no new shared dirs or wrappers minted. **7 (Vue 3.5)** — clean; reactive props
destructure at `ConfigSliderPane.vue:41`, no stale-`defineModel` risk. **8
(`verbatimModuleSyntax`)** — clean; `BlobPane.vue:13,15` both `import type`.
**2 (no legacy)** — one hit: the `sections.length > 0` empty branch is a second path with no
caller (see the state matrix).

---

## Proportion and seat law — judgment against the canon

| Canon | Requirement | BlobPane | Finding |
|---|---|---|---|
| `VISUAL-CONSTITUTION.md` §3 law 3 | "Atmosphere/Blob **preview area is larger than the form** at every desktop size" | form : preview = **35.2 : 1** | D-2 |
| §3 law 6 | mobile = "one document-scrolling stage→inspector→action sequence"; "**no global pane selector** … survives" | mobile shows the pane selector and the *other* pane | D-1 |
| §3 law 8 | "One pane may have one full-strength visual protagonist" | the protagonist is 31 grey slabs; the specimen is in another pane | D-2, D-5 |
| §3.1, Blob row | "persistent material hero preview" / "compact morphology essentials plus scroll-confined advanced disclosure" / "Mobile order: preview, essentials, advanced" / "**its own** producer-compatible `InstrumentChassis` composition" | none / none / not rendered / a `Card` inside the Picker's right slot | D-1, D-2, D-4 |
| §4 type matrix ("closed across all eighteen compositions") | section heading → `text-heading`, Plus Jakarta Sans; value → `text-mono-small` | section heading = Fira Code @ `text-small`; value = `text-micro` 11 px | D-8 |
| §4 | "Live numbers … reserve their widest legal representation so value changes never reflow" | `fvn: normal`, `min-width: auto`, `fmt` swings 1↔5 chars | D-7 |
| §5 axis composition | "label, unit, reserved live value, optional numeric entry … color-bearing **or neutral track chosen by semantics**" | no unit slot, no numeric entry, unreserved value, neutral track on chromatic axes | D-5, D-7, D-11 |
| §7 "Atmosphere and Blob" | "two compositions, **not one settings page**"; "reset/compare"; "**does not reuse the Picker inline-seat diameter**" | literally one component (`ConfigSliderPane`) with two arrays; no compare; reuses exactly that seat | D-2, D-4, D-14 |
| `PROPORTION-AUDIT.md` PR-05 | "every P122 workbench uses boundaries `[]` … every other divider/ornament is zero" | 9 boundary lines | D-16 |
| PR-10 | "Preview first/larger; compact essentials; confined disclosure" | none of the three | D-2, D-4 |
| PR-15 | "Buffer-only alpha, empty canvas, card reserve … do not satisfy it" | the composed preview is absent from the route | D-2 |
| `demo/DESIGN.md` card-lock (NORMATIVE) | tabular figures **and** `ch` reservation, both required | neither | D-7 |
| `PALETTE-CONTRACT.md` | (read; §1–§4 are api/route surface + export bytes — **no BlobPane obligation**) | — | no finding |

---

## Negative results — what I checked and did **not** charge

- **Reduced motion.** 31 rows render under `reducedMotion: reduce`; residual transitions are
  colour/opacity at 0.1 s. Not motion. Not charged.
- **Keyboard reachability / tap targets.** The 39 desktop `smallTapTargets` on `/#/blob` are
  12 × 24 slider thumbs; the mobile matrix shows the coarse-pointer hit-area extension working
  (`12 × 44`, `ConfigSliderPane.vue:218-230`). MT-F022 governs the WebKit keyboard delta. Not
  charged.
- **Console/page errors.** `REPORT.json` `/#/blob`: `pageErrors 0`, `consoleErrors 0`, `overflowX
  0`, `main 1`, all four matrices. Clean.
- **`h1: 0`.** True on every one of the 15 routes; shell-owned (`PaneHeader.vue` emits `<h3>`),
  not BlobPane's seat.
- **RTL slider mirroring.** Real, but the Picker's channels fail identically — the shared `Slider`
  primitive, not this component. Recorded as inherited.
- **Owner edicts 1, 3, 7, 8.** Verified clean, individually, above.
- **Stale type comment.** `BlobPane.vue:28-29` justifies the OUTER `-?` on the grounds that
  *"`BlobConfig.morphT?` is a top-level optional number."* In the installed
  `@mkbabb/glass-ui@7.0.0`, `types.d.ts` declares `morphT: number` — **required**; no top-level
  member of `BlobConfig` is optional, so the outer `-?` is a no-op defended by a stated cause that
  no longer exists. (The INNER `-?` is still load-bearing: `color.lightnessFloor?`,
  `color.satelliteColors?`.) INFO only.

---

## Proposed cure — one architectural transposition, not sixteen patches

Fifteen of the sixteen findings are downstream of a single decision: **BlobPane was written as a
payload for a generic slider form instead of as a workbench.** Patch them individually and you get
a better-formatted form. The transposition:

1. **Give Blob a route, not a sidecar.** `viewSchema.ts` `blob: { left: "blob", right: null }` —
   the exact shape `atmosphere` already has one entry above it. Kills D-1 outright (no pane
   selector to be on the wrong side of) and is the precondition for everything below.

2. **Adopt `<Configurator>` whole** (glass-ui 7.0.0, already installed, already imported by the
   same file for `ConfiguratorRow`):
   - `stage` slot ⇒ a real `<Blob>` bound **directly to the injected `BLOB_CONFIG_KEY` object**,
     with **no prop override** — this is what kills D-3(a); the four geometry sliders become live
     because nothing overwrites them. `HeroBlob`'s hero register stays where it belongs, on the
     Picker.
   - `scrollMode="auto"` ⇒ the scroll-confined inspector §7 asks for; deletes `.pane-scroll-fade`
     from this surface (D-4).
   - `footer` slot ⇒ deletes `.config-action-bar` and its border (D-16).
   - `asideSide`/`asideWidth` ⇒ the `preview-dominant` split §3.1 requires (D-2).

3. **One `<ConfiguratorLayer>` per section**, essentials `defaultOpen`, advanced closed — the
   producer's docblock already names the intended split (*Mood / Body / Surface / Color / Motion /
   Pointer / Render*). Deletes `.config-section-header`/`.config-section-title` and their seven
   hairlines, restores a real heading rung, brings `aria-expanded`, and brings the CSS-only reveal.
   Kills D-4, D-8(1), D-16.

4. **`useConfiguratorState<BlobConfig>`** with a preset table (the producer exports `BLOB_HERO`
   from `blob/presets`) ⇒ presets + `isDirty` + `resetCurrent` = the "reset/compare" of §7, and a
   Reset that can tell you it has something to discard. Kills D-14, most of D-13.

5. **Wake the renderer on config mutation.** Extend the `HeroBlob` idle-gate's wake set — or, once
   the stage is the workbench's own `<Blob>`, give that instance no idle park at all (it is the
   protagonist, not an ornament). Kills D-3(b).

6. **Complete the axis set inside the new layers.** The 17 unreachable axes now have somewhere to
   live: `morphT` as the headline essential; `surface.lit`/`surface.shadow`/`quality` as switches;
   `membrane.merge` as a Select (the mechanism AuroraPane already uses through the same slot);
   `surface.rimColor` as a colour control — in a colour tool; `surface.lightDir` as the producer's
   `axes` surface. Kills D-12.

7. **Fix the row contract once, in `ConfigSliderPane`'s successor:** carry `unit` and `precision`
   on `SliderDef` (replacing `fmt`'s `Number.isInteger` branch and the `"(ms)"` label hack),
   declare `tabular-nums`, reserve `max legal ch` per definition, promote the value to
   `text-mono-small`, pass the section name through `ConfiguratorRow`'s `sub` to disambiguate the
   two "Noise Freq"s, and render bipolar axes from their zero. Kills D-7, D-8(2), D-9, D-10, D-11.

8. **Retire the track override.** Delete `--slider-track-bg: var(--ink-muted…)` and let the
   `spectrum` variant paint what it declares — a real `.slider-range` restores the value signal,
   restores the chromatic semantics on the `Color` section, and makes the WHCM roster entry at
   `foundation.css:693` protect something that exists. Kills D-5, D-6. (If the track's rest
   contrast was the original motive, the cure belongs in the producer's spectrum recipe — a root
   fix, per edict 5 — not in a consumer's custom property.)

What survives as separate work: the shared `Slider` RTL mirroring (not this component's), and the
async-pane loading/error states (`usePaneRouter`'s).

---

*End of CHALLENGE-D. No source was modified. Writes confined to
`docs/tranches/V/megatranche/audit/components/BlobPane/`.*
