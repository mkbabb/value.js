# CHALLENGE-D — `demo/workbenches/extract/ExtractControls.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M-context arm), the tier
this seat was explicitly spawned with. Seat declared, not inherited.

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
```

Matches the glass BJ W4 hold hash byte-for-byte. **No consumer edit lands from this seat.** All
cures below are authored as the two blocked waves in §7.

## Method

- Read the component, its parent (`ExtractWorkbench.vue`), its session (`useExtractSession.ts`),
  its ink contract (`demo/color-session/ink.ts`, `useContrastSafeColor.ts`).
- Read the canon: `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `OPTICAL-BENCH-COMPOSITIONS.md §5`.
- Read the 4-matrix Safari capture rows for `/#/extract` in `audit/visual/REPORT.json` and the
  desktop-light / mobile-dark shots.
- Ran two headless probes against the live dev server (`http://localhost:9000`), scripts and raw
  output archived under `./evidence/`:
  - `D-probe1.mjs` (WebKit) — rects/computed styles at 1440-light, 1440-dark, 390-light, 320-light.
  - `D-probe2.mjs` (Chromium) — `forced-colors: active`, `prefers-reduced-motion: reduce`,
    the **developed** state (real image uploaded), k=16, 320px, and RTL.

The whole 60-capture Safari matrix only ever observed this component's **undeveloped** state.
Probe 2 is the first capture of the developed state that exists in the audit record.

---

## 1. The central defect (one mechanism, four failures)

The T-44a "certified track ink" cure paints **the entire track — range and remainder alike — in one
opaque certified colour**, and neutralises the producer's own track underneath it
(`--slider-track-bg: transparent` for k at `ExtractControls.vue:32`; `--slider-track-bg: trackInk`
for kC at `:75`). Every downstream failure falls out of that one decision:

| consequence | measured |
|---|---|
| no value affordance | `.slider-range` computed `background-color: rgba(0,0,0,0)`, `background-image: none` at every arm; the track is one uniform colour, so both sliders read "100 % full" at every value |
| hierarchy inversion | light track `oklch(0.545141 0.218024 9.834023)` at 100 % α over **15 948 px²**; the declared protagonist (the drop-zone stage) has *no* fill and a `--ink-muted` 2 px dashed stroke at C = `0.003862` — **56× less chroma** |
| dead identity ring | `box-shadow` colour string is **byte-identical** to `background-color` in the undeveloped state |
| nothing left for forced-colors | the only painted track is a consumer `background-color` + `box-shadow`; forced-colors overrides the first and removes the second |

The certifier is a *stroke/text* instrument (`certifyAccentInk`, `ink.ts:129-141`) with a one-sided
floor and no chroma-preservation or luminance ceiling. Used as a **fill**, it maximises rather than
satisfies: light `L=54.5 % C=0.218` → dark `L=95.8 % C=0.021` (ΔL = 41.3 pp, **−90.3 % chroma**).
The dark-mode track is therefore the single most luminous object on the page — brighter than the
route title — which is the exact opposite of what a "restrained neutral pole" (VISUAL-CONSTITUTION
§2) means, and the live pick's identity, which the cure existed to carry, is 90 % gone.

**Gestalt cure (not a patch):** the certified ink is the axis's *boundary*, never its *field*.
Track = neutral well at the producer's own tier; the certified pick inks a 1.5 px outline **plus**
the range indicator only. Value then reads as extent (the universal slider grammar), identity reads
as edge, and forced-colors has a real border to keep. This also deletes the need for the whole
absolutely-positioned rail-under-a-transparent-slider contrivance.

---

## 2. Findings

### D-1 · BLOCKER · both slider tracks disappear entirely under `forced-colors: active`

**Evidence** — `evidence/D-probe2-states.txt`, block `forced-colors-active-1440-light`:

```
rail   bg rgb(255, 255, 255) | box-shadow none | background-image none
kcTrack rect 230.5×24        bg rgb(255, 255, 255) | background-image none
thumbs  12×24, border 2px rgb(0,0,0), background rgba(255,255,255,0)
```

`evidence/D-forced-colors-1440-light.png` shows the rendered result: the k row is the digit `5` and
a lone 12×24 outlined rectangle floating in blank space; the kC row is `kC`, a second floating
rectangle, and `0.5`. **No track, no extent, no min/max, no indication either object is a control.**

**Mechanism** — the consumer removed the producer track (`:32` / `:75`) and re-painted it as an
inline `background-color` (forced to `Canvas`) plus an inline `box-shadow` (removed outright by
`forced-color-adjust: auto`). Nothing forced-colors-durable remains. The canon requires
forced-colors survival for state in three separate places (VISUAL-CONSTITUTION §4.1, §4.2 twice).

**Reproduction** — `node evidence/D-probe2.mjs` (first block), or Chromium with
`--force-prefers-color-scheme`/emulated forced colors on `/#/extract`.

---

### D-2 · BLOCKER · the kC axis collapses to a 22.5 px track at the canon's own 320 px arm

**Evidence** — `evidence/D-probe1-rects.txt` / `D-probe2-states.txt`, and
`evidence/D-narrow-320-light.png`:

| arm | kC `.slider-track` width | thumb | thumb ÷ track | usable travel | px per step (15 steps) |
|---|---:|---:|---:|---:|---:|
| 1440 | 230.5 px | 12 px | 5.2 % | 218.5 px | 14.6 |
| 390 | 92.5 px | 12 px | 13.0 % | 80.5 px | 5.4 |
| **320** | **22.5 px** | 12 px | **53.3 %** | **10.5 px** | **0.70** |

At 320 the thumb is wider than half its own track and one step of chroma weight is **0.7 CSS px**
of pointer travel. The control is not "cramped", it is inoperable. In the same row the k axis is
226 px — **a 10.0× disparity between two axes in one cluster**.

**Mechanism** — `:65` gives the kC group `flex-1 min-w-0` inside a row whose other five children are
fixed (3 × 40 px buttons + 2 separators + a 20 px label + a 20 px readout). There is **no minimum
operable length** on the axis and **no wrap rule**. The k axis was given its own full-width row
(`:14`); the kC axis was not, and no viewport ever grants it one. VISUAL-CONSTITUTION §3.6 requires
mobile to be "one document-scrolling stage→inspector→action sequence"; a 22.5 px axis is neither.

*Hypothesis (not reproduced):* the actual-400 %-in-app-zoom arm the canon names alongside 320
behaves the same or worse. I measured CSS-width 320 only.

---

### D-3 · BLOCKER · neither slider expresses its value; both read "full" at every value

**Evidence** — `evidence/D-probe1-rects.txt`, desktop-light block:

```
.slider-track  x 252   w 434    bg oklch(0.545141 0.218024 9.834023)   (k: painted by the rail div beneath)
.slider-range  x 252   w 115.7  bg rgba(0, 0, 0, 0)   background-image none
.slider-track  x 360.5 w 230.5  bg oklch(0.545141 0.218024 9.834023)   (kC)
.slider-range  x 360.5 w 76.8   bg rgba(0, 0, 0, 0)   background-image none
```

The range element is correctly *sized* (115.7 / 434 = 26.7 % = (5−1)/(16−1) ✓) and paints **nothing**.
The remainder is painted the same colour as the range would be. Confirmed in every capture:
`audit/visual/shots/safari-desktop-light/extract.png` shows k = 5 of 16 as a solid full-width
crimson bar; `safari-mobile-dark/extract.png` shows it as a solid full-width near-white bar.

**Consequence** — the only value cues left are a 12 px thumb and the numeric readout. A user
scanning the pane sees two maxed-out progress bars. This is the primary affordance of the
component's two primary controls, gone, in 100 % of sessions.

---

### D-4 · MAJOR · the k readout is a lying readout — it shows the request, not the result

**Evidence** — `evidence/D-developed-k16-1440-light.png`. In one viewport, ~90 px apart:

- the k label reads **`16`**
- the palette card count badge reads **`10`**, and 10 swatches render

`useExtractSession.ts` `colorCount` is the *requested* k; the quantizer returned 10 clusters for a
6-band source. `ExtractControls.vue:16` renders `{{ k }}` unconditionally. The rail gradient in the
same frame carries 10 stops (`evidence/D-probe2-states.txt` → `k16.bgImg`), so the component's own
graphic already disagrees with its own number.

The codebase states the governing principle itself, three files over, at
`ExtractWorkbench.vue:135-136`: *"the full readout rides title + select-all (never a lying
readout)"*. The k label breaks it.

**Reproduction** — `/#/extract`, upload any image with fewer distinct clusters than k, raise k above
the cluster count. `node evidence/D-probe2.mjs` block `developed-1440-light` does this.

---

### D-5 · MAJOR · certified ink applied as a field inverts the pane's hierarchy

**Evidence** — measured areas at 1440:

| element | rect | fill | chroma |
|---|---|---|---|
| drop-zone stage (declared protagonist, VISUAL-CONSTITUTION §7 *Extract*: "The image is the stage") | 462×180 = 83 160 px² | none; 2 px dashed `--ink-muted` stroke | **0.003862** |
| k rail | 434×24 = 10 416 px² | 100 % α | **0.218024** |
| kC track | 230.5×24 = 5 532 px² | 100 % α | **0.218024** |

Two support controls carry 15 948 px² of opaque near-gamut-edge seed tint; the protagonist carries a
dashed hairline. VISUAL-CONSTITUTION §2 — "Seed tint is forbidden outside the ambient field, active
accent, WatercolorDot/specimen, and pastel `Palettes` lanes"; a slider track is none of those.
§3.8 — "One pane may have one full-strength visual protagonist. Supporting fixtures do not compete
with it." Here the fixture wins outright, in both schemes and both breakpoints
(`shots/safari-desktop-light/extract.png`, `shots/safari-mobile-dark/extract.png`).

Dark is worse, not better: `oklch(0.958322 0.021053 9.834023)`, L = 95.8 %, the highest-luminance
object on the page (`evidence/D-developed-1440-dark.png` — the kC bar out-lumes the `Extract` H1).

---

### D-6 · MAJOR · the k rail renders discrete extracted colours as a continuous blend

**Evidence** — `evidence/D-probe2-states.txt`, `developed-1440-light`:

```
linear-gradient(to right,
  oklch(0.419876 0.112822 291.556) 0%,   oklch(0.888177 0.0805526 92.1838) 25%,
  oklch(0.58703  0.159887 36.6838) 50%,  oklch(0.520653 0.101123 155.227) 75%,
  oklch(0.681056 0.0824094 316.378) 100%)
```

Stops sit at *points*; every pixel between them is an interpolated colour the quantizer never
returned. On a 434 px rail the five real specimens occupy five 1-px columns and **~429 px show
fabricated colour**. Directly below, the palette card renders the same data as five crisp bands
(`evidence/D-developed-k16-1440-light.png`). Two encodings of one dataset, 130 px apart, one of
which is false. `rounded-full` (`:21`, computed radius 12 px) additionally pinches the first and
last stop — the two ends of the data — into semicircles.

**Cure** — hard stops (`c1 0% , c1 20%, c2 20%, c2 40% …`), matching the card strip. Same
`kSliderGradient` producer, different stop grammar.

---

### D-7 · MAJOR · the "certified identity edge" is invisible in the state it was written for

`ExtractControls.vue:6-11` claims the ring gives *"a certified identity edge independent of its
gradient content **in every state**"*. Measured, undeveloped state, all four arms:

```
backgroundColor:  oklch(0.545141 0.218024 9.834023)
boxShadow:        oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset
ringSameAsFill:   True
```

ΔE = 0. The ring is drawn in the same colour as the fill it sits on. It becomes visible only once a
gradient occludes the fill — i.e. it exists in exactly the state the comment says it is redundant
in, and is absent in exactly the state the comment says it rescues. (`evidence/D-probe1-rects.txt`,
`ringSameAsFill: True` in every block, incl. dark.)

---

### D-8 · MAJOR · two `DockSeparator`s: forbidden by the binding inventory, and 0 px tall anyway

`OPTICAL-BENCH-COMPOSITIONS.md §5` is binding and names Extract explicitly:

> | Extract | `[]` | `none` | **none** | image/specimen material and interval separate stage from controls |
> Any additional line, automatic P122 divider, consumer-hidden producer line, terminal row rule,
> caster stroke or corner rule **is a defect**.

`ExtractControls.vue:57` and `:81` render two. PROPORTION-AUDIT PR-05 (`REMOVE`) and §5.4 ("spacing
plus material already expressing the same boundary makes the line duplicative") agree.

They are also broken. Measured `.dock-separator` rects, same page, same probe:

```
in the Dock band:        w 1, h 27.5   (×5)
in ExtractControls:      w 1, h 0      (×2)   — every arm: light, dark, forced-colors, developed, 320
```

The primitive derives its height from the Dock's fixed band; dropped into a `flex items-center`
row with no `align-self: stretch` it collapses. So the component ships **two `role="separator"`
nodes that paint zero pixels** and are announced to AT — and whose markup self-contradicts
(`data-orientation="horizontal"` + `aria-orientation="vertical"`). Pure DOM/AT noise. This is the
"reach past the design system and hand-roll" smell inverted: a Dock-band primitive borrowed into a
resting-plate card where its contract does not hold.

---

### D-9 · MAJOR · all three actions are nameless; their only labels are hover tooltips

`audit/visual/REPORT.json`, `/#/extract`, every one of the four matrices: `"namelessButtons": 3`.
That is the **highest count of any of the 15 routes** (every other route is ≤ 1). Probe confirms
they are exactly this component's three controls:

```
nameless [('Upload image', 40, 40), ('Open camera', 40, 40), ('Reset', 40, 40)]
```

`:41`, `:50`, `:85` pass `title` and no `aria-label`. `title` is an accname *fallback*, and it is
unreachable on touch — where 2 of the 4 audit matrices live. PROPORTION-AUDIT PR-07 (`ADD-AFFORDANCE
/ REMOVE`, "every surviving action/drag seat has a name/state"), PR-16 ("no tooltip proliferation"),
and §5.6 ("do not compensate … with tooltip proliferation") all bite. Three icon-only actions in a
row, no text, no accessible name, no touch-reachable label.

---

### D-10 · MAJOR · `disabled` reaches 1 of 5 interactive controls; there is no pending state at all

The parent passes `disabled = session.isProcessing || cameraActive` (`ExtractWorkbench.vue:70`).
`ExtractControls.vue` applies it at exactly one site — `:84`, the Reset button. The k slider, the kC
slider, Upload and Camera all ignore it. `useExtractSession.onKChange`/`onChromaChange` have no
in-flight guard either, so dragging during a quantize queues another.

Reachable functional consequence: `startCamera()` (`ExtractWorkbench.vue:239-255`) overwrites
`cameraStream` without stopping the previous tracks, and the Camera button is never disabled while
the camera is live — **click Camera twice and the first `MediaStream` leaks** (tracks never stopped,
device indicator stays on). *Reproduction: `/#/extract` → Camera → grant → Camera again.* I did not
execute this (headless has no camera); labelled a **hypothesis** on the leak, **confirmed** on the
missing disable (`:84` is the only `:disabled` in the file).

Design reading: a component that accepts a `disabled` prop and honours it on one fifth of its
surface has not designed the pending state. PROPORTION-AUDIT PR-08 (`ADD-AFFORDANCE`), and
VISUAL-CONSTITUTION §4.1 — "pending … states are never color-only … role, accessible name,
state/value … are explicit."

---

### D-11 · MAJOR · neither axis satisfies the mandated axis composition

VISUAL-CONSTITUTION §5, last paragraph, is binding on this exact component:

> The domain-neutral axis composition sits over BI `Slider`: **label, unit, reserved live value**,
> optional numeric entry, focus/target behaviour, and a color-bearing or neutral track chosen by
> semantics. Picker, Generate count, **Extract**, Gradient, Atmosphere and Blob adopt that one
> composition.

| | label | unit | reserved live value |
|---|---|---|---|
| k axis | **absent** — a bare `5` with no word anywhere (`:15-17`) | absent | present (`w-5`) |
| kC axis | `kC` — jargon, expanded only in a `title` tooltip (`:66`) | absent | present (`w-5`) |

`aria-label` covers AT; the sighted user gets an unexplained number and a two-letter token. §5.2
additionally requires Home/End to "announce label, value, **unit**" — neither slider sets
`aria-valuetext` (measured: `valuetext: null` on both thumbs, all arms), so the unit is nowhere.

---

### D-12 · MINOR · out-of-matrix type role, and the cluster's "one mono voice" is two voices

The type matrix is declared **closed** (VISUAL-CONSTITUTION §4: "This matrix is closed across all
eighteen compositions"; OPTICAL-BENCH §5 *Binding type matrix*). Permitted roles: `text-display`,
`--type-title`, `--type-subheading`, `text-heading`, `text-prose`, `text-small`, `text-mono-small`,
`mono-caption`. **`text-micro` is not in it** — used twice, `:66` and `:78`.

The file's own comment (`:12-13`) claims the k label "speaks its cluster's ONE mono voice (weight
400, matching kC)". Weight matches; size does not, and the mismatch is not even stable:

| arm | k label | kC label / readout | ratio |
|---|---:|---:|---:|
| 1440 | 16.4 px | 11 px | **1.49×** |
| 390 | 14.0 px | 11 px | **1.27×** |

`text-mono-small` is fluid, `text-micro` is fixed, so the two "matching" voices drift apart as the
viewport grows. Two value readouts in one 40 px row at 16.4 px and 11 px is not a rhythm.
Per §4, the kC *label* is a control label → `text-small` / Plus Jakarta Sans; the kC *readout* is a
value → `text-mono-small`.

---

### D-13 · MINOR · `text-right` is physical; the label detaches from its rail in RTL

`:15` — `w-5 text-right`. Measured with `dir="rtl"` (`evidence/D-probe2-states.txt`, `rtl-1440`):

| direction | label box | rail edge nearest the label | digit-to-rail gap |
|---|---|---|---|
| LTR | x 224 w 20 (right edge 244) | rail starts 252 | **8 px** |
| RTL | x 1196 w 20, `text-align: right` | rail ends 1188 | **22 px** |

In RTL the digit is flushed to the far side of its box, away from the axis it labels — the gap
nearly triples. VISUAL-CONSTITUTION §6.1: "chrome, navigation and layout → logical inline/block
direction follows the document." `text-end` is the one-token cure.

---

### D-14 · MINOR · dead scoped rule

`:139-142` declares `.touch-gate-target { border-radius: var(--radius-pill); }` under the comment
"Touch gate styling for extract sliders". The class appears **nowhere in this template**:

```
$ grep -rn "touch-gate-target" demo/ | grep extract
demo/workbenches/extract/ExtractControls.vue:140:.touch-gate-target {
```

The only real users are `demo/picker/controls/ComponentSliders` and `SpectrumCanvas`, which this
component's `scoped` attribute cannot reach. Dead code carried across two commits
(`a61094e3` → `f2c8f565`). Owner edict 2 (no legacy/dead paths).

---

### D-15 · MINOR · `.plate-ink` is copy-pasted into five components

```
$ grep -rln "\.plate-ink" demo/
demo/workbenches/extract/ExtractWorkbench.vue
demo/workbenches/extract/ImageDropZone.vue
demo/workbenches/extract/ExtractControls.vue
demo/shared/ui/EmptyState.vue
demo/color-picker/ErrorBoundary.vue
```

Five scoped copies of one two-line rule, each with its own near-identical four-line comment
(`ExtractControls.vue:144-150` vs `ExtractWorkbench.vue:285-292`). A certified ink rung is a
design-system token, not a per-component private class. It belongs as one utility in
`demo/styles/` — edict 5 (root-level styling), edict 1 (focused modules with real encapsulation).

---

### D-16 · MINOR · per-instance producer-token override, carrying *uncertified* colour

`:42`, `:51`, `:86` each set `:style="{ '--btn-hover-color': cssColor }"` — three per-instance
overrides of a glass-ui token (edict 5). Worse, they hand over the **raw** `cssColor`, while the
sibling tracks four lines away use `trackInk = safeCss(cssColor, 3)`. One file, one input, two
contradictory contracts: the tracks are certified against the resting plate, the hover ink is not.
For any pale live pick the hover state is unreadable on the plate, by construction.

---

### D-17 · MINOR · the empty state is decided by CSS cascade order, not by design

`useExtractSession.kSliderGradient` returns the literal string `"var(--muted)"` when no palette
exists — the *exact* pre-cure value the file's own born-RED record (`:119-122`) measured at
1.88:1 / 1.85:1 and calls "the owner's 'un-readable' sliders, measured". The cure never removed it;
it shadowed it. `:22` writes both the `background` shorthand and the `background-color` longhand on
one element, and only longhand-wins ordering keeps `var(--muted)` off the screen. Vue's serialised
inline style makes the collision explicit:

```
background-image: ; background-position-x: ; … background-color: oklch(…); box-shadow: … inset;
```

Two states are not being *designed*; one declaration is being *overwritten*. Delete the dead
`"var(--muted)"` arm and give the undeveloped rail an explicit, named empty treatment.

---

### D-18 · INFO · `:model-value="[k]"` mints a new array identity on every parent render

`:27` and `:70`. Cheap, but it defeats prop-identity bailouts in the producer for a value that
changes rarely. A `computed` pair costs nothing.

---

## 3. State coverage register

| state | designed? | evidence |
|---|---|---|
| empty / undeveloped | **defective** — solid ink rail, invisible ring, dead `var(--muted)` arm | D-3, D-7, D-17 |
| loading / `isProcessing` | **absent** — no treatment; `disabled` not propagated | D-10 |
| populated / developed | **defective** — lying readout, continuous blend | D-4, D-6 |
| error | **absent from this component** — camera failures are written into `quantizeError` by the parent | `ExtractWorkbench.vue:252` |
| disabled | 1 of 5 controls; forced-colors GrayText delta survives | D-10 |
| hovered | uncertified ink | D-16 |
| pressed / active | producer (`data-press-armed`) — not a consumer defect | — |
| dragging | no authored drag register on either axis | D-3 (nothing changes but the thumb) |
| overflowing / truncated | **defective** — kC axis collapses to 22.5 px | D-2 |
| RTL | **defective** — physical `text-right` | D-13 |
| reduced motion | honoured globally (0.2 s → 0.1 s, measured); component adds nothing of its own | negative |
| forced colors | **defective** — both tracks vanish | D-1 |
| zoom 200 % / 400 % | **not probed** — 320 px is the nearest measured proxy; hypothesis only | D-2 |
| focused | **not probed** by this seat — coverage gap, not a claim | — |

## 4. Motion

Three `transition-colors` on the lucide glyphs (`:45`, `:54`, `:89`). Measured
`transition-duration: 0.2s`, `cubic-bezier(0.4, 0, 0.2, 1)`, resolved through Tailwind's
`--default-transition-duration: var(--duration-fast, 150ms)` — token-backed, not ad hoc. Under
`prefers-reduced-motion: reduce` it drops to `0.1s` via a global rule. No layout-forcing property is
animated (colour only). **No motion finding.** The `--animation-slide-sm/md/lg` tokens are not
relevant here — nothing slides.

## 5. Design-system boundary

- `Slider` is re-exported straight from glass-ui (`demo/ui/slider/index.ts` is one line:
  `export { Slider } from "@mkbabb/glass-ui";`). No hand-rolled clone. **Good.**
- `DockControl` inside a resting Card is sanctioned by VISUAL-CONSTITUTION §7 (*Generate*: "live in
  one Dock control set"). **Not a finding.**
- `DockSeparator` inside a resting Card is **not** sanctioned and does not work — D-8.
- The absolutely-positioned rail div under a deliberately-transparent producer track (`:19-34`) is
  the component reaching past the design system to hand-roll a track glass-ui already owns. The
  right shape is a producer `--slider-track-bg` / `--slider-range-bg` pair — §7 β1.

## 6. Negatives (things I attacked and could not break)

- **Hit region matches paint.** The rail, the `glass-slider` root and `.slider-track` all report the
  identical rect `{x 252, y 494.6, w 434, h 24}`. No phantom 24 px band. 
- **`w-5` reservation holds at the widest legal k.** At k = 16: `scrollW 20 == clientW 20`,
  `overflows: false`, font 16.4 px. VISUAL-CONSTITUTION §4's "reserve their widest legal
  representation" is met (by 0.3 px, but met).
- **No horizontal overflow** at 1440 / 390 / 320 (`scrollWidth == clientWidth` in every block),
  matching `REPORT.md`'s `overflowX: 0`.
- **`verbatimModuleSyntax` clean** — every import in the file is a value import; no type-only import
  is mis-declared.
- **Vue 3.5 idiom clean** — reactive props destructure at `:103-111` is correct; no template refs
  exist, so `useTemplateRef` does not apply; no `defineModel` round-trip, so no `shallowRef` need.
- **Disabled survives forced colors** — Reset's glyph reads GrayText (`rgb(96,0,0)`), distinct from
  the enabled `rgb(0,0,0)`.

## 7. The blocked waves (consumer edits FORBIDDEN until released)

The pin is verified in §0. Two waves, two independent release conditions.

### W·EC-α — consumer-only, needs no producer change

**Exact release condition:** the glass BJ W4 consumer-edit hold on
`demo/workbenches/extract/ExtractControls.vue` @ SHA-256 `71aa0a65…d46c28` is lifted — i.e. the
Glass 8 adoption commit lands on this branch **or** the owner explicitly releases the pin. Nothing
in α depends on a glass-ui API that does not already exist in 7.0.0.

Closes: **D-2, D-4, D-5, D-6, D-7, D-8, D-9, D-11, D-12, D-13, D-14, D-15, D-16, D-17, D-18.**

1. Retire the rail-under-transparent-track contrivance. Certified ink inks the **outline** and the
   **range**; the track field is the producer's neutral well.
2. Give the kC axis its own row (mirroring k) below a named breakpoint, or a hard
   `min-inline-size` floor with the row wrapping. No axis under ~120 px operable track, ever.
3. `{{ k }}` renders the **delivered** cluster count once developed; the requested k stays the
   slider's own value. Or one readout of the form `10 / 16`. Never a bare number that disagrees with
   the card badge in the same frame.
4. Hard-stop the rail gradient so it matches the card's band strip.
5. Delete both `<DockSeparator />` (binding inventory: `none`).
6. Visible text labels for all three actions, or `aria-label` + a non-hover-only affordance; delete
   the three `title`-only names.
7. `aria-valuetext` on both axes carrying name + value + unit; a visible unit word on each axis.
8. `text-micro` → `text-mono-small` / `text-small` per the closed matrix; one size for the two
   labels of one cluster.
9. `text-right` → `text-end`.
10. Delete `.touch-gate-target`; promote `.plate-ink` to one utility in `demo/styles/`.
11. Propagate `disabled` to both sliders, Upload and Camera; add an in-flight guard in
    `useExtractSession`.
12. `--btn-hover-color` takes `trackInk`, not raw `cssColor` — and moves to the root, not three
    inline overrides.
13. Delete the `"var(--muted)"` arm in `kSliderGradient`; write one explicit undeveloped treatment.

### W·EC-β — producer-gated

**Exact release condition:** `@mkbabb/glass-ui@8.0.0` is published **and adopted in this repo** with
all three of these seams present (verified by a consumer probe reproducing D-1/D-3 as GREEN):

- **β1** — `Slider` exposes `--slider-range-bg` **independent of** `--slider-track-bg`, defaulting to
  a non-transparent value. Today `.slider-range` computes `rgba(0,0,0,0)` with
  `background-image: none`, so no consumer can paint a range without painting the whole track.
- **β2** — the `Slider` thumb ships an invisible pointer seat of ≥ 24 × 24 CSS px while the visible
  glyph stays 12 × 24. Today both axes measure exactly `12 × 24` and appear in the audit's
  `smallTapTargets` list as `{"w":12,"h":24,"tag":"span","label":"Number of colors"}` and
  `{…,"label":"Chroma weight"}` in all four matrices. PROPORTION-AUDIT §5.7 / PR-12 is explicit that
  the cure is seat geometry, not a fatter glyph.
- **β3** — `Slider` ships a `@media (forced-colors: active)` track rule (a `CanvasText` border and a
  `Canvas` field) so the axis survives when the consumer's background paint is overridden.

Closes: **D-1, D-3** (β1 + β3 jointly), and the two `smallTapTargets` rows this route contributes
(β2).

**β4 (optional, moot if α.5 lands):** `DockSeparator` either declares an intrinsic block size /
`align-self: stretch`, or its docs state it is Dock-band-only. Measured today: 27.5 px tall inside
the Dock, **0 px** in any other flex row.

## 8. Verdict

**DEFECTIVE.** Eighteen findings, three of them blockers, all reproduced against the live build.
The component is not under-polished; its central design decision — certify the *field* instead of
the *edge* — is inverted, and every one of the three blockers is a direct consequence of it. The
cure is a transposition, not a patch: certified ink becomes the axis boundary and the range, the
producer keeps the track, and the whole absolutely-positioned rail contrivance disappears with it.
