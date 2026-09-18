# CHALLENGE-D — `demo/workbenches/extract/ExtractWorkbench.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this
seat was explicitly spawned with. The declaration is present, not inherited.

---

## 0. Verdict

**DEFECTIVE.** The premise holds. This component's design fails in three independent
registers, and each failure is provable from a measurement rather than an opinion:

1. **It lies about the specimen.** The Extract route's declared protagonist — the source
   image — is silently centre-cropped. A 400×1200 portrait renders **23.3 % visible**;
   the palette below it names three colours that appear nowhere in the preview. Same
   frame, reference desktop viewport.
2. **Its central state transition does not exist.** The `isProcessing` skeleton — a
   component built for exactly this seat, carrying `role="status"` / "Loading palette" —
   **never paints**, not even during a 2.9-second CPU-throttled quantize. The user stares
   at a placeholder reading *"feed it an image"* while their image is being processed.
3. **It violates the tranche's own NORMATIVE laws by measured amounts** — the card-lock
   law (twice), the ≤15 % empty-content ceiling (four viewports), the binding Extract
   mobile order, and the type-role matrix (to three decimal places: 41.888 px = 41.888 px).

Nine of the twenty-four findings below carry a pasted measurement or a screenshot.
Three are labelled HYPOTHESIS and carry no reproduction.

### Evidence gap this seat closed first

`docs/tranches/V/megatranche/audit/visual/states.mjs:18` —
`const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"]`. **`#/extract`
is not in it.** No zoom-200, zoom-400, reduced-motion, forced-colors, RTL or
keyboard-focus capture has ever existed for this component. All such rows below are my
own, from `probe-D-geometry.mjs`.

---

## 1. Probes run (all read-only against the live dev server, `http://localhost:9000`)

| Script | What it decides | Output |
|---|---|---|
| `probe-D-geometry.mjs` | 8 matrices × geometry/material/colour/naming | `probe-D-geometry.json`, `frames/` |
| `probe-D-states.mjs` | k-sweep on the empty state; hover/focus registers | `probe-D-states.json`, `frames-states/` |
| `probe-D-focus-transition.mjs` | WebKit **and** Chromium tab order; seat trace | `probe-D-focus-transition.json`, `frames-focus/` |
| `probe-D-populated.mjs` | MutationObserver occupant trace; `disabled` audit | `probe-D-populated.json`, `frames-populated/` |
| `probe-D-final.mjs` | 20× CPU-throttled quantize; crop measurement | `probe-D-final.json`, `frames-final/` |
| `probe-D-type-crop.mjs` | portrait-crop demonstration; type-role sizes | `probe-D-type-crop.json`, `frames-crop/` |
| `probe-D-cardlock.mjs` | DESIGN.md card-lock law, both arms | `probe-D-cardlock.json` |

---

## 2. Visual truth

### D-1 · BLOCKER — `object-contain` is defeated; the source specimen is silently cropped

`ImageDropZone.vue:41` — `<img class="w-full h-full object-contain rounded-xl">` — sits
inside a `flex flex-col items-center justify-center overflow-hidden` root whose height cap
arrives from the parent (`ExtractWorkbench.vue:20`, `max-h-[min(320px,40dvh)]`). The cap
applies to the *container*; `height:100%` against an indefinite containing-block height
resolves to `auto`, so the `<img>` takes its intrinsic aspect at the full 458 px width and
the container clips it. `object-contain` has nothing left to contain.

Measured, 400 × 1200 portrait, 1440 × 900 light (`probe-D-type-crop.json`):

```
 "imgBox":  { "y": -326.3, "h": 1374, "bottom": 1047.7 },
 "zoneBox": { "y":  200.7, "h":  320, "bottom":  520.7 },
 "objectFit": "contain",
 "croppedTopPx": 527, "croppedBottomPx": 527,
 "visibleFractionPct": 23.3
```

527 px removed from the top, 527 px from the bottom, **23.3 % of the image visible**. With
a square 2400 px image (`probe-D-final.json`) the same mechanism gives `img.h = 458` in a
`320 px` box — 30 % cropped, `dropMaxH: "320px"` confirming the cap is live.

The consequence is not cosmetic. `frames-crop/portrait-crop.png` shows the six-band test
image rendering as **yellow + green only**, with the extracted palette directly beneath it
reading **purple, red, green, yellow, orange**. Three of the five swatches name colours the
user cannot see. The quantizer reads the whole file; the preview shows the middle 23 %.

`ImageDropZone.vue:3` states the contract this breaks: *"S.W5-6 · F4: **the specimen never
lies** — no veil over the field."* It does not veil the field. It amputates it.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe-D-type-crop.mjs`
then open `frames-crop/portrait-crop.png`.

**Cure (gestalt, not patch):** the preview is a *stage*, not a flow child. Give the drop
zone a definite block size (`aspect-ratio` or `h-[clamp()]` on the root, not a `max-h` on a
content-sized box) so `object-contain` has a real box to fit into, and let the specimen
letterbox against the well ground. Cropping the protagonist to preserve a layout rhythm is
the wrong trade for a *colour extraction* instrument.

---

### D-2 · BLOCKER — the loading state does not exist; the empty caption speaks during processing

`ExtractWorkbench.vue:102-107` gates `PaletteCardSkeleton` behind
`v-if="session.isProcessing.value"` inside a `<Transition name="vj-morph" mode="out-in">`.
A `MutationObserver` + per-`rAF` occupant sampler run over the real route recorded, with
Chrome CPU throttled 20× and a 2400 × 2400 source (`probe-D-final.json`):

```
OCCUPANT TRACE (CPU 20x throttled, 2400px image): [[0,"ghost"],[2894,"card"]]
```

Two occupants in 2.9 seconds: `ghost`, then `card`. **`SKELETON` never appears.** The
unthrottled Chromium and WebKit runs agree (`probe-D-focus-transition.json`: ghost through
t≈210 ms, then the card).

So for the entire compute window the seat holds the *undeveloped-plate ghost* and the
caption at `ExtractWorkbench.vue:165`:

> `· undeveloped plate — feed it an image ·`

The instrument instructs the user to do the thing they have just done, for as long as the
work takes. The `role="status"` / `aria-label="Loading palette"` announcement that
`PaletteCardSkeleton` exists to make is never made either.

The `mode="out-in"` gate is the mechanism: Vue holds the entering branch until the leaving
branch's transition resolves, and by then `isProcessing` has already flipped back to
`false`, so the branch that wins is the developed card. The design comment at
`ExtractWorkbench.vue:92-99` asserts the opposite of what ships:

> *"`isProcessing` swaps ghost → KNOWN-IMMINENT skeleton **IN PLACE** (same bones — a
> material change, **not a layout jump** …); the developed card … lands in the same seat."*

Three claims, three failures: the swap never happens, the bones are not the same
(`ShadowPalette` strip = `gap-px` + `flex-1`; `PaletteCardSkeleton` strip = no gap +
`width:100/count%` — the two files hand-duplicate a geometry the comment calls identical),
and the seat is not stable (see D-3).

**Cure:** `mode="out-in"` is the wrong family for a state machine whose intermediate state
is short-lived. Either drop `mode` so the skeleton can cross-fade in, or — better —
collapse `ShadowPalette` and `PaletteCardSkeleton` into **one** plate component with a
`state: "empty" | "working" | "developed"` prop. The "same bones" promise then holds
structurally instead of by hand-copy, and the loading register becomes reachable.

---

### D-3 · BLOCKER — the NORMATIVE card-lock law is violated on both arms

`demo/DESIGN.md`, *"### The card-lock law (NORMATIVE — R.W3 Lane A / A6, U31)"*:

> *"a value change may never move the card: dragging any component slider from min to max
> changes NO containing card rect (±0px)"* … *"a Fraunces-set number MUST declare
> `tabular-nums`."*

**Arm 1 — the empty state.** Dragging `k` from 5 to 16 (`probe-D-cardlock.json`):

```
empty-k5   pane {"x":199,"y":200.98,"w":512,"h":578.27}   ghost h=150
empty-k16  pane {"x":199,"y":137.00,"w":512,"h":706.27}   ghost h=278
```

**Δh = +128.00 px, Δy = −63.98 px on the containing Card.** The law says ±0. The ghost's
swatch row wraps at 6-per-row, so `k ≥ 7` adds a 64 px band each time. At `k ≥ 7` the empty
placeholder (214 px) is *taller than the drop zone* (180 px).

**Arm 2 — the populated readout.** `ExtractWorkbench.vue:122` is a Fraunces display-scale
live numeric readout with no tabular figures:

```
img-k1   stat "100%oftheimage"  statRect.w=191.36  rightGroup.x=427.36  code.x=526.88 code.w=155.13
img-k5   stat  "94%oftheimage"  statRect.w=169.48  rightGroup.x=405.48  code.x=505.00 code.w=177.00
         fontFamily "Fraunces"  fontSize "41.888px"
         fontVariantNumeric "normal"   fontFeatureSettings "normal"
```

**Δ = 21.88 px of horizontal jitter** on the eyebrow + colour readout, per value change.
The readout's own width changes by 21.87 px, so the truncation point of the colour string
moves with an unrelated statistic. `ExtractControls.vue:15` and `:78` both declare
`tabular-nums`; the one Fraunces number — the exact case the law names — does not.

**Cure:** `tabular-nums` on the stat (one class), and reserve the ghost's swatch band from
a fixed row count rather than letting `k` reflow it — the instrument's *shape* is the
information, not its row count.

---

### D-4 · MAJOR — empty content is 3–5× over the binding ≤15 % ceiling

`VISUAL-CONSTITUTION.md §3.2`:

> *"Empty secondary content occupies at most a narrow invitation tray (≤15 % of the stage)
> or disappears. It never receives half the viewport."*

Ghost + `gap-2` + caption, as a fraction of the pane Card's block size:

| Arm | ghost h | caption h | share of pane |
|---|---:|---:|---:|
| desktop 1440, k=5 | 150 | 21.58 | 179.58 / 578.27 = **31.1 %** |
| desktop 1440, k=16 | 278 | 21.58 | 307.58 / 706.27 = **43.6 %** |
| mobile 390 | 142 | 36.50 | 186.50 / 552 = **33.8 %** |
| 400 % zoom (360 px) | 198 | 36.30 | 242.30 / 338 = **71.7 %** |

By area at desktop k=5: 462 × 150 = 69 300 px² of a 512 × 578.27 = 296 074 px² pane =
**23.4 %**, i.e. 83 % of the drop zone's own area. Source: `probe-D-geometry.json`,
`probe-D-cardlock.json`.

`PROPORTION-AUDIT.md` PR-04 names this family exactly: *"Empty/equal companion Cards and
nested housing → **REMOVE**. Collapse absent support."*

---

### D-5 · MAJOR — the binding Extract mobile order is inverted

`VISUAL-CONSTITUTION.md §3.1`, Extract row: **"Mobile order | source, sampled result,
controls"**. §3.6 repeats the shape: *"stage→inspector→action sequence."*

Measured at mobile-light 390 (`probe-D-geometry.json`):

```
dropZone y=182  →  kRail y=378 (controls)  →  ghost y=469 (result)
```

Source, **controls**, result. `ExtractWorkbench.vue:64` places `<ExtractControls>` before
the result `<Transition>` at line 102 in the same column, so the order is structural and
identical on desktop. The pane leads with a dial before it has shown anything to dial.

---

### D-6 · MAJOR — material-tier inversion: the empty placeholder is the heaviest object in the pane

Measured computed styles (`probe-D-geometry.json`, desk-light):

| Element | fill | edge | shadow |
|---|---|---|---|
| drop zone (**the input protagonist**) | `oklab(0.4709 −0.081 0.097 / **0.05**)` | 2 px dashed, α 0.3 | *none* |
| ghost (**empty output**) | `oklab(0.9133 0.0055 0.0130)` — **α 1.0** | solid `--card-edge` | **3 stacked cartoon layers** |
| pane Card | α 0.664 | — | 1 |

`VISUAL-CONSTITUTION.md §3.8`: *"One pane may have one full-strength visual protagonist.
Supporting fixtures do not compete with it through equal size or equal shadow."* The
fixture out-shadows the protagonist 3 : 0 and out-opaques it 20 : 1.

This is also the mechanism behind the grey-block reading visible in every capture
(`visual/shots/safari-desktop-light/extract.png`, `…/safari-mobile-light/extract.png`): the
pane is **translucent** (α 0.664) and picks up the live aurora, so it reads warm pink; the
ghost is **opaque** and shows only its own near-neutral token. A dead grey rectangle on a
chromatic plate, in a chromatic-laboratory product.

Compare the same frame's right-hand pane: `My Palettes` renders TRUE EMPTY as a
**dashed, plate-tinted dot trio**. Two empty grammars, side by side, in one screenshot.
`ShadowPalette.vue`'s own header concedes the rule — *"TRUE EMPTY speaks the EmptyState dot
trio — N-3 re-aimed"* — and then Extract opts out.

---

### D-7 · MAJOR — type-role inversion, equal to three decimal places

`PROPORTION-AUDIT.md §5.13`: *"route H1/major argument `text-display`; instrument identity
`--type-title`; … value/code/provenance `text-mono-small`."*

Measured (`probe-D-type-crop.json` + live eval):

```
pane identity  H3 "Extract"           fontSize 41.888px  Fraunces
dominance stat    "33% of the image"  fontSize 41.888px  Fraunces
```

**Identical.** A derived support statistic (`ExtractWorkbench.vue:122`,
`class="font-display text-display"`) is set at exactly the pane identity's rung, in the
same family. §3.8's "do not compete … through equal size" is not approximately breached;
it is breached to the pixel.

`PROPORTION-AUDIT.md §5.11` also applies: *"A display-sized readout is not therefore a
document heading or live status."*

---

### D-8 · MAJOR — the dominant-colour readout shows 31 % of itself at the reference viewport

`probe-D-type-crop.json`:

```
"readoutFull":     "oklch(56.686341050833% 0.147031011912 285.636092993966deg)"
"readoutShownPx":  182      "readoutNeededPx": 585      "readoutTruncated": true
```

182 / 585 = **31.1 %**. What survives is `oklch(56.68634105…` — twelve significant digits
of *lightness* — and what is cut is **chroma and hue**, i.e. the colour's entire identity.
Visible in `frames-crop/portrait-crop.png` and `frames-final/final-populated.png`.

`ExtractWorkbench.vue:134-136` pre-excuses this: *"truncate may trim trailing digits at
narrow widths; the full readout rides title + select-all (never a lying readout)."* 1440 px
is not a narrow width — it is the reference desktop arm — and a readout that hides the hue
of the colour it names is not saved by a `title` attribute (invisible to touch, invisible
to keyboard, invisible in a screenshot).

Two causes compound: the serializer emits 12-digit precision for a *display* string, and
the 41.888 px stat (D-7) eats the line before the readout gets any.

**Cure:** display precision belongs to the display. Round to the house readout precision,
and give the value its own line — it is the answer, not a footnote to a percentage.

---

## 3. State coverage

Enumerating every state this component can occupy, against what is actually handled:

| State | Handled? | Evidence |
|---|---|---|
| empty | yes — but see D-4/D-6 | ghost + caption |
| **loading / processing** | **NO — never renders** | D-2, occupant trace |
| populated | yes | `frames-final/final-populated.png` |
| **error (quantize)** | partial — see D-21 | `ExtractWorkbench.vue:80-85` |
| **error (camera)** | **conflated into the quantize channel** | D-21 |
| **camera awaiting permission** | **NO** — black `bg-stage` box, no state | `ExtractWorkbench.vue:239-241` |
| camera active | yes | `ExtractWorkbench.vue:34-59` |
| **disabled** | **1 of 6 controls** | D-12 |
| focused | yes (Chromium); Safari skips the buttons | D-11 note |
| hovered | yes | `probe-D-states.json` |
| pressed | **on a no-op** | D-17 |
| selected / dragging | n/a | — |
| overflowing / truncated | **broken** | D-1, D-8, D-22 |
| **RTL** | **NO — sliders direction-blind** | D-9 |
| reduced-motion | **yes** — animations 19 → 6 | `probe-D-geometry.json` |
| forced-colors | **untested by construction** | D-23 |
| zoomed 200 % / 400 % | reflows, no overflow; D-4 worsens | `probe-D-geometry.json` |
| **image loaded → cleared** | **UNREACHABLE** | D-13 |

### D-9 · MAJOR — RTL is not honoured by either slider

`probe-D-geometry.json`, `rtl-desk` vs `desk-light`, thumb offset from its track's start
edge:

| Slider | LTR | RTL |
|---|---:|---:|
| Number of colors | 364.5 − 252 = **112.5** | 866.5 − 754 = **112.5** |
| Chroma weight | 433.4 − 360.5 = **72.9** | 921.8 − 849 = **72.9** |

Identical to the tenth of a pixel. The container mirrors (rail inset flips from left to
right, the value label crosses the track) but the **fill and thumb do not**. In
`frames/rtl-desk.png` the "5" readout sits at the far right while the crimson fill grows
from the far left — the value and its own gauge point in opposite directions.

### D-10 · MAJOR — 12 px slider thumbs, below WCAG 2.2 SC 2.5.8 in all four matrices

Already in the audit's own data — `visual/REPORT.json`, every `/#/extract` row:

```
{"w": 12, "h": 24, "tag": "span", "label": "Number of colors"}
{"w": 12, "h": 24, "tag": "span", "label": "Chroma weight"}     (desktop)
{"w": 12, "h": 44, ...}                                          (mobile)
```

24 × 24 CSS px is the SC 2.5.8 minimum; the width is **half** it. Reproduced independently
in `probe-D-geometry.json` at every arm including 200 % and 400 % zoom. Optically the thumb
is a 12 × 24 bar on a 24-tall rail — it fills the groove exactly, so there is no visible
handle affordance at all, only a colour break in the fill.

`PROPORTION-AUDIT.md §5.7`: *"Visual glyph size, operable target size and layout reservation
are separate quantities."* Here all three collapsed into one 12 px bar.

### D-11 · MAJOR — the eyedropper is keyboard-unreachable, and its own label promises otherwise

Once an image loads, `ExtractWorkbench.vue:23` sets `:disable-click="!!previewDataUrl"`,
which `ImageDropZone.vue:19` turns into `:tabindex="-1"`. Measured
(`probe-D-populated.json`):

```
"dropTabindex": { "tabindex": "-1",
                  "label": "Image preview area, tap to sample colors",
                  "cursor": "crosshair" }

TAB ORDER (image loaded, extract pane only):
  span[Number of colors] → button[Upload image] → button[Open camera]
  → span[Chroma weight] → button[Reset] → button[Palette menu]
```

The preview never receives focus. The keyboard activation handler
(`ImageDropZone.vue:22`) is gated on `!disableClick`, so even a forced focus would not
open the sampler. The element announces *"tap to sample colors"* to a screen-reader user
who has no way to do so. `PROPORTION-AUDIT.md` PR-07 is the owning family:
*"Hover-only/unlabeled controls … every surviving action/drag seat has a name/state."*

Note (context, not attributed to this component): WebKit under macOS default settings skips
`<button>` in Tab order entirely — `probe-D-focus-transition.json` shows Safari reaching
only drop zone → k thumb → kC thumb. The design consequence that *is* attributable: **the
camera capability has exactly one door** (an icon-only `<button>`), while upload has two
(button + the focusable drop zone). The unique capability got the fragile entry.

### D-12 · MAJOR — `disabled` is computed, threaded, and then dropped by 5 of 6 controls

`ExtractWorkbench.vue:70` computes `:disabled="session.isProcessing.value || cameraActive"`.
Inside `ExtractControls.vue`, `:disabled` appears **once** — line 84, the Reset button. The
k `Slider` (line 24), the kC `Slider` (line 67), Upload (line 40) and Camera (line 49) never
receive it. Runtime confirmation (`probe-D-populated.json`):

```
DISABLED before: [... Reset: true, everything else: false]
DISABLED after : [... Reset: false, everything else: false]
```

During camera-active the k and kC dials remain live and drive a debounced re-quantize
against a file that may not exist; during processing the user can re-enter the pipeline.
A prop that six controls should honour and one does is worse than no prop — it reads as
handled.

### D-13 · MAJOR — there is no way back to the empty state

`useExtractSession.ts:180-184` — `onReset()` sets `colorCount = 5`, `chromaWeight = 0.5`,
re-runs quantize. It does **not** clear `previewDataUrl` or `lastFile`. Nothing else does
either. Once an image is in, the empty state is unreachable for the session, and the
control labelled **Reset** (`RotateCcw`, `title="Reset"`) restores two dial values. Icon,
name and behaviour disagree. `PROPORTION-AUDIT.md` PR-08 owns this
(*"…recovery truth … ADD-AFFORDANCE"*).

---

## 4. Motion

**This is the component's strongest register — record it as the negative proof.** Motion is
tokenized, not ad hoc: `vj-enter` / `vj-morph` are the house families from
`demo/styles/animations.css:83-139`, driven by `--duration-*` / `--spring-*` /
`--ease-*`; `ImageDropZone.vue:17` uses `var(--duration-normal)` / `var(--ease-standard)`;
the corner tag uses `var(--duration-fast)`. Reduced motion is honoured by the global guard
(`animations.css:184-193`) and measured:

```
desk-light      anims = 19
reduced-motion  anims =  6      (probe-D-geometry.json)
```

Two motion defects survive:

### D-14 · MINOR — `vj-morph` transitions `max-height`, a layout-forcing property

`animations.css:104-117` includes `max-height` in both `-enter-active` and `-leave-active`.
This seat sets neither `--vj-morph-collapse` nor `--vj-morph-expanded`, so it animates
`none → none` — no visible motion, but a layout-property transition declared on the
critical result swap, plus `overflow:hidden` clipping during it. Dead cost on the hot path.

### D-15 · MINOR — 34 perpetual animations on an idle, empty page

`probe-D-states.json`, empty state, k swept:

```
k=1  anims = 13      k=5  anims = 19/21      k=16  anims = 43
```

`ShadowPalette` runs `animate-pulse` on `count` segments + 2 meta blocks + `count`
swatches — at k=16 that is **34 infinite animations** conveying nothing, forever, on a
page where nothing is happening. `opacity` is compositor-cheap, so this is a *semantic*
cost rather than a jank one: a pulsing skeleton is the universal sign for *loading*, and
here it means *empty* — while the identically-boned `PaletteCardSkeleton` uses the same
`--skeleton-ink` recipe in the same seat to mean *loading* (which, per D-2, never shows).
One sign, two meanings, one seat.

---

## 5. The design-system boundary

### D-16 · MAJOR — three simultaneous renderings of the same palette within 320 px

In `frames-final/final-populated.png`, the same five extracted colours appear as:

1. the **k-rail gradient** (`ExtractControls.vue:22`, `background: gradient`) at y ≈ 549
2. the **card colour strip** (`PaletteColorStrip`) at y ≈ 695
3. the **card swatch row** (`PaletteCardSwatches`) at y ≈ 812

Plus a fourth partial: the dominance readout names swatch #1 in text. The workbench's own
comment (`ExtractWorkbench.vue:113-117`) celebrates killing *one* duplicate — *"The
duplicate dominant dot died — the card's first swatch IS the dominant specimen"* — while
three renderings of the whole palette remain. `PROPORTION-AUDIT.md` PR-05's mechanism
(*"repeat a boundary → REMOVE"*) generalises here: repeating the *data* is the same error
one level up.

There is also a literal duplicate token: the k label reads `5` and the card meta reads `5`,
120 px apart, both meaning the palette's cardinality.

### D-17 · MAJOR — the result card is an operable ornament

`ExtractWorkbench.vue:153` passes `@click="() => {}"` to `PaletteCard`. Measured on the
live card (`probe-D-final.json`):

```
"cardRole": "article",  "cardCursor": "pointer"
```

`PaletteCard.vue:20-26` gives its root `cursor-pointer`, `v-bind="press.handlers"` and
`:style="press.pressStyle"` — the full cartoon press choreography — plus `@click`. In this
seat the click does nothing. The card invites activation, animates the squash, and returns
nothing.

`PROPORTION-AUDIT.md §5.5`: *"Decorative controls and operable ornaments without names are
forbidden."* §5.12 / `VISUAL-CONSTITUTION.md §3.1` go further: the palette Card root *"is a
noninteractive container: it owns no activation, focus or selection state."*

The no-op handler is the tell. Passing an empty function to neutralise a component's
built-in behaviour means the reused component is the wrong one for this seat — Extract's
result is a transient specimen, not a browsable library entity.

### D-18 · MAJOR — the pane speaks two accent families at once

Measured, desk-light (`probe-D-geometry.json`):

```
dropBorder  oklab(0.470927 -0.080988 0.097088 / 0.3)   ← negative a: GREEN
kRailBg     oklch(0.545141  0.218024  9.834023)        ← hue 9.8°:  CRIMSON
```

`ImageDropZone.vue:14-15` pins the affordance edge to the static theme `--primary`
(`border-primary/30 bg-primary/5`); its sibling `ExtractControls.vue:118-125` threads the
**live picked colour** through `useSafeAccentFn`. One instrument, one 512 px card, two
independent accent sources, ~140° apart. Visible in every capture as a lime-olive dashed
rectangle above a crimson rail.

### D-19 · MAJOR — dead design: the `split` layout has no consumer

`ExtractWorkbench.vue:204-209` documents `layout?: "column" | "split"` — *"`split` — the
dialog's two columns."* Repo-wide:

```
$ grep -rn "ExtractWorkbench" demo/ e2e/ test/ | grep -v "^demo/workbenches/extract/"
(nothing)
$ grep -rn "ExtractWorkbench" demo/workbenches/extract/
ExtractPane.vue:11:  <ExtractWorkbench  … layout="column"
```

One consumer, one value. The `split` branch occupies four template sites (lines 5-8, 13,
18-21, 148), keeps the `PaletteCard` `aside` variant alive, and sustains a live
`useBreakpoint("(min-width: 640px)")` matchMedia subscription (line 226) whose only reader
is `layout === 'split' && isWide` — unreachable. The dialog it serves does not exist.

Owner edict 2 (*no legacy code — no dual paths*) and edict 3 (*KISS, no contrivance*).

### D-20 · MAJOR — `.plate-ink` is declared five times, against the repo's own cited rule

```
$ grep -rn "^\.plate-ink" --include="*.vue" --include="*.css" demo/
demo/workbenches/extract/ExtractWorkbench.vue:290
demo/workbenches/extract/ImageDropZone.vue:109
demo/workbenches/extract/ExtractControls.vue:148
demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
```

The same one-line rule, `color: var(--ink-muted, var(--muted-foreground))`, five times
across three feature areas — **three of the five inside this one workbench**.
`demo/DESIGN.md:388` sets the boundary (*"No new global utility class for one consumer …
The shared survivors … are true cross-feature recipes"*), and `ShadowPalette.vue`'s own
header cites the rule by name as precedent: *"Lifted here from PaletteCardSkeleton's scoped
block **the day it gained a second consumer** (DESIGN.md's global-utility rule)."* A
five-consumer recipe is a cross-feature recipe. It belongs in `utils.css`.

### D-21 · MINOR — per-instance overrides where inheritance is free

`ExtractControls.vue:42, 51, 86` — `:style="{ '--btn-hover-color': cssColor }"` on three
sibling `<DockControl>`s. Custom properties inherit; one declaration on the row (or the
component root) does the whole job. These are also the **only** three sites in `demo/`:

```
$ grep -rn "btn-hover-color" demo/
(only ExtractControls.vue:42,51,86)
```

so every DockControl in the app tints its glyph to `--foreground` on hover except these
three, which tint to the live pick. Owner edict 5 (*root-level styling, never per-instance
overrides*) — and a divergent interaction language for one instrument.

### D-22 · MINOR — dead scoped rule

`ExtractControls.vue:140-142` declares `.touch-gate-target { border-radius: … }` in a
`<style scoped>` block. The class is never emitted by this component; its real consumers
are `demo/picker/controls/ComponentSliders/ComponentSliders.vue` and
`SpectrumCanvas.vue`, which carry their own (unscoped) definitions. Vue scoping guarantees
this rule can never match anything. It also lacks the `@reference` that its sibling files
omit inconsistently (`ExtractControls.vue:137` has one; `ExtractWorkbench.vue` and
`ImageDropZone.vue` do not).

---

## 6. Remaining findings

### D-23 · MINOR — forced-colors is untested by construction, and the ghost's whole payload is background-only

`probe-D-geometry.json`, `forced-colors` matrix: every measured colour is unchanged from
`desk-light` (`kRailBg` still `oklch(0.594 0.238 9.83)`, `segBg` unchanged). WebKit's
Playwright `forcedColors` emulation does not apply UA overrides, so **that arm proves
nothing** — I am recording it as inconclusive rather than green.

What *is* provable statically: only three files in `demo/` contain a `forced-colors` query
(`GradientStopEditor.vue`, `focus-ring.css`, `foundation.css`); none of this workbench's
five files do. And the ghost's entire information content — `k` segmentation, meta blocks,
swatch count — is carried by `background-color` alone (`ShadowPalette.vue:98-110`, with the
`60 %` / `40 %` / `30 %` ladder expressed as `color-mix(… , transparent)`). Under a real
forced-colors backdrop those collapse to one flat Canvas rectangle. The k-rail gradient has
the same shape.

**Reproduction:** NONE — this is a **HYPOTHESIS** pending a Chromium/Windows forced-colors
run. Flagged so the mega-tranche can gate it rather than assume it.

### D-24 · MINOR — the caption orphans its terminal ornament below 400 px

`probe-D-geometry.json`: `captionLines = 2` at mobile-light (390) and at zoom-400 (360);
`1` at 720 and 1440. Visible in `visual/shots/safari-mobile-light/extract.png`:

```
· UNDEVELOPED PLATE — FEED IT AN
            IMAGE ·
```

A centred, `tracking-[0.18em]`, all-caps line breaking mid-phrase with the closing bullet
stranded beside one word. Two of the four Safari matrices ship this.

### D-25 · MINOR — the two sliders share no alignment and mirror each other's grammar

`probe-D-geometry.json`, desk-light:

| | left edge | right edge | track w |
|---|---:|---:|---:|
| drop zone / ghost / caption | 224 | 686 | 462 |
| k rail | **252** | 686 | **434** |
| kC wrap | **341** | **617** | **230.5** |

Three different left edges in one instrument stack; the two sliders share neither edge. The
value readouts are mirrored — `k`'s value sits **left** of its track
(`ExtractControls.vue:15`), `kC`'s sits **right** (line 78). And the *coarser* control (k:
16 integer steps) gets 434 px = 27 px/step while the *finer* one (kC: 0–1.5 by 0.1) gets
230.5 px = 15 px/step. On mobile the kC track collapses to **80.5 px** — 5.4 px per step.
Precision is allocated inversely to need.

### D-26 · MINOR — camera errors ride the quantize channel, raw

`ExtractWorkbench.vue:252` — `session.quantizeError.value = \`Camera access denied: ${err}\``
interpolates a raw `Error` object into user-facing copy (the user reads
"…: NotAllowedError: The request is not allowed by the user agent…") and routes a *camera*
failure into the *quantizer's* destructive line (line 80-85), which sits above the result
plate. There is no dismiss: `quantizeError` clears only when `runQuantize` next fires
(`useImageQuantize.ts:86`), which requires a file the user does not have.

Also unhandled: `startCamera` sets `cameraActive = true` **before** awaiting
`getUserMedia` (lines 240-247), so an empty `bg-stage` black rectangle renders during the
permission prompt with no label, no spinner and no state.

### D-27 · MINOR — mixed template-ref idiom in adjacent lines

```
ExtractWorkbench.vue:222   const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);
ExtractWorkbench.vue:223   const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");
```

Owner edict 7 names `useTemplateRef` as the Vue 3.5 idiom. Two idioms, one line apart, in
one component. (`verbatimModuleSyntax` — edict 8 — is clean: `import type { SpaceId }` at
line 189 is the only type-only import and is correctly marked.)

### D-28 · INFO — three icon buttons have no accessible name

`visual/REPORT.json`, all four `/#/extract` rows: `"namelessButtons": 3` — the only route in
the census with three. Identified live (`probe-D-geometry.json`, every matrix):

```
"nameless": ["Upload image","Open camera","Reset"]
```

`ExtractControls.vue:41, 50, 84` supply `title=` only. `title` is a last-resort fallback in
accessible-name computation and is not announced by several AT configurations; the census
harness (`capture.mjs:102-105`) counts only `aria-label` / `aria-labelledby` / text. A
fourth appears in the camera state (`ExtractWorkbench.vue:52`, `title="Capture frame"`).
Filed INFO because the fix is mechanical, but it is this route's signature census row.

---

## 7. What is genuinely sound (the negative proof)

So this report is not read as uniform condemnation, the following were tested and hold:

- **Motion is tokenized end to end** and the global `prefers-reduced-motion` guard neutralises
  it — measured 19 → 6 live animations. No component-local duration literals; no keyframes
  deleted, only referenced.
- **No horizontal overflow at any arm** — `overflowX = 0` at 1440, 720 (200 % zoom), 390 and
  360 (400 % zoom), LTR and RTL (`probe-D-geometry.json`, 8/8 matrices).
- **No page errors, no console errors** on `/#/extract` in any of the 4 census matrices
  (`visual/REPORT.md` per-capture table) or in my 8 (the only console line is the
  pre-existing dev `VITE_API_URL` notice, unrelated).
- **The contrast work is real.** `--ink-muted` threads correctly (`oklch(0.4469…)` light /
  `oklch(0.8894…)` dark), and the O-18 track-ink cure did move the sliders off the recorded
  born-RED 1.88 : 1 / 1.85 : 1.
- **`verbatimModuleSyntax` is clean**; props use the 3.5 reactive-destructure idiom;
  emits are typed.

---

## 8. Ranked disposition

| ID | Severity | Family | Terminal verb |
|---|---|---|---|
| D-1 | BLOCKER | specimen fidelity | **REPLACE** — definite-height stage, not a capped flow child |
| D-2 | BLOCKER | state machine | **REPLACE** — one plate component, three states; drop `mode="out-in"` |
| D-3 | BLOCKER | card-lock (NORMATIVE) | **TIGHTEN** — `tabular-nums` + fixed ghost band |
| D-4 | MAJOR | PR-04 empty housing | **REMOVE** — empty result collapses to an invitation line |
| D-5 | MAJOR | binding composition | **TRANSPOSE** — result before controls |
| D-6 | MAJOR | material tier | **TIGHTEN** — the empty plate loses opacity + cartoon shadow |
| D-7 | MAJOR | type-role matrix | **TIGHTEN** — stat one golden rung below identity |
| D-8 | MAJOR | readout truth | **TIGHTEN** — display precision + its own line |
| D-9 | MAJOR | RTL | **ADD-AFFORDANCE** — `dir` through to the Slider primitive |
| D-10 | MAJOR | SC 2.5.8 | **ENLARGE** — 24 px operable width, glyph unchanged (§5.7) |
| D-11 | MAJOR | PR-07 affordance | **ADD-AFFORDANCE** — a named, focusable sampler control |
| D-12 | MAJOR | disabled coverage | **TIGHTEN** — one prop, six consumers |
| D-13 | MAJOR | PR-08 recovery | **ADD-AFFORDANCE** — a real clear/discard |
| D-16 | MAJOR | data duplication | **REMOVE** — one palette rendering, not three |
| D-17 | MAJOR | §5.5 ornament | **REMOVE** — non-interactive result card |
| D-18 | MAJOR | accent coherence | **TIGHTEN** — one accent source per instrument |
| D-19 | MAJOR | dead path (edicts 2/3) | **REMOVE** — `split`, `isWide`, `aside` |
| D-20 | MAJOR | DESIGN.md:388 | **TRANSPOSE** — `.plate-ink` → `utils.css` |
| D-14/15/21/22/24/25/26/27 | MINOR | — | as noted |
| D-23 | MINOR (HYPOTHESIS) | forced-colors | **GATE** — needs a Chromium/WHCM arm |
| D-28 | INFO | naming | **ADD-AFFORDANCE** — `aria-label` on 4 icon buttons |

### The gestalt

The individual repairs above are real, but the shape of the defect is one thing said four
ways: **this workbench renders the absence of its output more emphatically than the output
itself, and more emphatically than its input.** The empty ghost is opaque where the pane is
translucent, shadowed where the drop zone is flat, 23 % of the pane's area where the law
allows 15 %, k-driven where the law says ±0 px, animated 34 ways where nothing is
happening — and the source image it is waiting for gets cropped to 23 % when it finally
arrives, while the loading moment between them was designed, built, and then made
unreachable by the transition mode chosen to protect it.

The transposition is not a sequence of patches. It is a re-seating: **let the specimen be
the protagonist.** Give the image a real stage with a definite box; let the result land in
that stage's inspector; let *absence* be a one-line invitation rather than a full-material
counterfeit of the answer; and collapse ghost/skeleton/card into the single three-state
plate the code comments already believe exists.
