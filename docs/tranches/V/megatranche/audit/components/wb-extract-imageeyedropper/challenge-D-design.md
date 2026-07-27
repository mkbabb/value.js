# CHALLENGE-D — `ImageEyedropper.vue` — the design is flawed

Seat: CHALLENGE-D (design). Subject: `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue`
(299 lines) + `composables/useImageSampler.ts`, `composables/useLoupeCanvas.ts`,
`composables/useInertiaGesture.ts`, `constants.ts`.
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

## Verdict

**DEFECTIVE.** Twenty-two defects, five of them BLOCKER. The component fails at the one thing it
exists to do: **the color it reports is not the color on the screen under the cursor** — measured
composited specimen pixel `rgb(127,0,128)` against a reported `lab(29.568301979097% 68.287364602547
-112.029709525105)` (= `#0000FF`). On touch — the platform the affordance literally names ("*tap*
to sample") — the magnifier never draws a single pixel (measured `0 / 12100` painted), every second
tap is a no-op that leaves the *previous* color on screen as if it were current, and the answer
itself is truncated mid-number with no way to recover it. In RTL the specimen is rendered 692 px
outside its own clipping stage and disappears entirely while the sampler keeps returning values for
an image nobody can see.

None of this is visible in the mega-tranche visual audit, because that matrix never opens the
component: `/#/extract` is captured with no image loaded, and `zoom-200-desktop`,
`forced-colors-desktop`, `rtl-desktop` and `reduced-motion-desktop` do not include `/#/extract` at
all (`docs/tranches/V/megatranche/audit/visual/shots/zoom-200-desktop/` = `adminusers, blob, browse,
gradient, picker`; `STATES.json` has no `#/extract` row). Every measurement below is my own.

## How the evidence was taken

Read-only drive of the live dev server at `http://localhost:9000`, WebKit (Safari engine, matching
the audit matrix) plus one Chromium context for `forcedColors` emulation, which WebKit cannot
emulate. Scripts and captures are in `./probe/`:

| file | what it proves |
|---|---|
| `probe/probe.mjs` | geometry, focus containment, mobile touch loupe, WYSIWYG divergence |
| `probe/probe2.mjs` | readout truncation, the alternating dead tap, AT tree, keyboard sampling, focus restoration |
| `probe/probe3.mjs` | dark-specimen contrast, RTL bar order, 200% zoom, forced-colors state collapse |
| `probe/probe4.mjs` | RTL stage/canvas displacement |
| `probe/probe5.mjs`, `probe/probe6.mjs` | swatch-pulse lifetime, live-region count, resize-destroys-zoom |
| `probe/pixels.mjs` | PNG decode + WCAG relative-luminance contrast, used on the captures below |
| `probe/shot-*.png` | desktop light (open / pinned / dark specimen), mobile dark tapped, RTL, 200% zoom, forced colors |
| `probe/probe-1200.png`, `probe-32.png`, `probe-dark.png` | synthetic specimens with exactly known pixels |

`probe-1200.png` is 1200×800: the left half is a 1-px red/blue checker (`#ff0000`/`#0000ff`), the
right half solid `#808080`. A checker is the honest test for a pixel sampler: any correct instrument
must agree with itself about what is under the cursor.

---

## 1. Visual truth

### 1.1 Desktop, light — `probe/shot-desktop-light-open.png`, `shot-desktop-light-pinned.png`

The overlay does not read as an instrument. It reads as a **leak**.

- The chrome bar is a translucent band through which the `ImageDropZone` preview behind it is
  clearly legible as two pale rectangles (lavender/grey), so **the same photograph is on screen
  twice at two different scales and positions** — a ghost above and the real specimen below. The
  measured overlay background is `oklab(0.936408 0.005529 0.013284 / 0.808)` with
  `backdrop-filter: blur(11px) saturate(1.6)`.
- Below the specimen, the *result* card behind the overlay — the words "Extracted Palette 3" and
  three swatches — reads through the same glass. The user is sampling a picture that is sitting on
  top of a legible copy of the answer.
- The specimen bleeds edge to edge: measured specimen `x = 201, w = 508`; stage `x = 201, w = 508`.
  Zero inset. The chrome bar directly above it has `px-3` = 12 px. Two adjacent regions of one
  surface, one at 0 and one at 12 — the panel has no rhythm.
- **45.1 % of the sampling stage is empty**: stage `508 × 616.8`, specimen `508 × 338.7`, specimen
  area = **54.9 %** of the stage. Above and below the picture there is nothing but the page showing
  through.
- The pinned loupe is a hollow ring in a color that belongs to no part of this scene: measured
  `--primary = oklch(0.470927 0.126432 129.83403)` — hue 129.8°, an olive **green** ring, on a
  rose-identity product, over a grey specimen. Measured ring-to-interior contrast **1.65 : 1**
  (non-text minimum is 3 : 1).
- The readout is `lab(29.568301979097% 68.287364602547 -112.029709525105)` — **55 characters, 12
  decimal places, for an 8-bit sample**. It is clipped: `clientWidth 275` vs `scrollWidth 555`.
  **49.5 % of the answer is on screen.**

### 1.2 Mobile, dark — `probe/shot-mobile-dark-tapped.png`

This is the frame that condemns the design.

- **The loupe is empty.** The purple/grey seam of the image runs straight through the circle,
  unmagnified and uninterrupted. Measured: `paintedPx: 0` of `12100`. The user tapped to sample and
  received a large green ring containing nothing.
- The readout is `lab(53.5850…` — **truncated mid-number, with no `title` attribute** (measured
  `title: null`). On a touch device there is no hover, so the value is not merely hard to read; it is
  **unrecoverable**. The product's entire purpose is to hand you a color string.
- The loupe is centred exactly on the touch point, so the finger covers the whole instrument even
  when it does draw.
- The ghost of the drop-zone preview and the ghost of the result card both read through the overlay
  in dark mode as well. The overlay occupies `356 × 581`; the specimen occupies roughly a third of it.

### 1.3 Forced colors — `probe/shot-forced-colors.png`

Here, by accident, the component tells the truth about itself: **the loupe interior shows a crisp
red/blue checkerboard while the specimen around it shows flat purple.** One instrument, two
irreconcilable accounts of the same pixels, in a single frame. Also visible: the empty 45 % of the
stage is now naked white, and the three controls have lost every trace of a seat.

### 1.4 200 % zoom — `probe/shot-zoom200.png`

At `720 × 450 @2×` (the audit's own 200 % simulation, `visual/states.mjs:21-22`) the readout box is
**117 px** — about seven Fira Code characters. A hex value just fits; `lab(…)` shows `lab(54.29…`.
Compare this capture with `shot-desktop-light-pinned.png`: the identical image region renders as flat
purple at DPR 1 and as a resolved red/blue moiré at DPR 2. **The color the user sees is a function of
their display density; the color the sampler reports is not.**

---

## 2. State coverage

Every state the component can occupy, and its treatment. A state that was never designed is a design
defect; six of these were never designed at all.

| State | Designed? | Evidence |
|---|---|---|
| loading (image decoding) | **no** | `onMounted → loadAndFit()` (`:237`) is fire-and-forget; the overlay animates in and shows empty glass until decode lands. No skeleton, no spinner, no text. |
| empty (no sample yet) | partial | ghost `WatercolorDot` + "Tap to sample" (`:26-37`). Visually identical to the empty-palette placeholder marks on the same screen — see `shot-desktop-light-open.png`. |
| populated | **broken** | readout truncated to 49.5 % with no recovery (D-4). |
| error (decode failure) | **no** | `loadImage` rejects (`useImageSampler.ts:72-75`); nothing catches. Result: permanently empty overlay + unhandled rejection. |
| error (CORS / tainted canvas) | **no** | `img.crossOrigin = "anonymous"` (`:70`) turns every non-CORS cross-origin URL into the silent-reject arm; `getImageData` (`:116`) would throw `SecurityError` inside a `pointermove` handler. |
| out of bounds (tap outside the image) | **no** | `sampleAt` returns `null` (`:114-115`); the component does nothing at all and leaves the previous color displayed as if current. |
| disabled | n/a | no disabled path exists, yet `.eyedropper-action-btn:hover:not(:disabled)` (`:279`) is written as if one did — dead defensive CSS. |
| focused | **no** | measured: on open `overlayContainsActive: false`; `tabbableOutsideOverlay: 7`. Focus never enters. |
| hovered | yes (mouse only) | and hover is the *only* path that makes the loupe work — D-3. |
| pressed / active | **no** | no press state on the three controls beyond the producer default. |
| selected (pinned) | **broken** | color-only, `1.65:1` contrast, and **identical to unpinned in forced colors** (measured `identical: true`). Never announced: `aria-pressed` absent, `liveRegions: 0`. |
| dragging (pan) | yes | `gestureActive` suspends the canvas transition (`:72`). Correct. |
| overflowing / truncated | **broken** | D-4. |
| RTL | **broken** | specimen displaced 692 px out of its clipping stage — D-5. |
| reduced motion | partial | the global guard (`demo/styles/animations.css:184-192`) zeroes all durations; the inertia coast is properly gated (`useInertiaGesture.ts:131-142`). But the guard also erases the *only* success feedback the component has (D-11). |
| forced colors | **broken** | pinned/unpinned collapse to one appearance — D-10. |
| zoom 200 % | degraded | readout box 117 px ≈ 7 characters. |
| second commit (Add twice) | **broken** | no feedback at all after the first — D-11. |
| after a container resize | **broken** | zoom and pan discarded — D-12. |
| keyboard | **absent** | no way in, nothing operable inside, focus not restored on close — D-6. |

---

## 3. Motion

The motion is, on its own terms, mostly right — and that is what makes the failures around it stand
out.

- `.eyedropper-canvas` uses `transform var(--duration-fast) var(--ease-decelerate)` (`:254-256`) and
  suspends during gestures — this is canon and explicitly ratified as **KEEP** in
  `demo/DESIGN.md:255` ("tracked = bezier … a spring here would fight the hand"). Correct; it
  animates `transform`, which does not force layout.
- `.loupe` transitions `opacity` (`:270`) — correct channel, correct token.
- `swatch-pop 0.65s` (`:288`) is a bespoke literal, but it is registered and ratified as KEEP in
  `demo/DESIGN.md:265`. **Not a finding.**
- `prefers-reduced-motion` is handled by the blunt global guard, and the rAF coast is gated in the
  composable. **Not a finding.**

The motion defect is not the curve. It is that the one animation carrying product meaning
(`swatch-pop` = "your color was added") **never resets**, so it plays exactly once per session and
is silent forever after (D-11), and it is the only record of the event that exists.

---

## 4. The design-system boundary

- `.eyedropper-action-btn:hover:not(:disabled) svg { color: …; transform: scale(1.2) }` (`:279-282`)
  is a **per-instance descendant override of a glass-ui `DockControl`**. It reaches past the
  producer's root into its `svg` child and invents a hover register. Owner edict 5 (root-level
  styling) and `VISUAL-CONSTITUTION.md §4.2` ("W17 deletes descendant corrections"). It also injects
  an arbitrary user color as icon ink — see D-13 for the measured contrast collapse.
- The overlay hand-rolls a modal: `absolute inset-0 z-popover glass-floating` (`:8`) with no role,
  no name, no focus policy. glass-ui already ships dialog housing; §5.1 already specifies overlay
  focus/announcement behavior. This is a third overlay species minted locally.
- `glass-floating` is the **structural glass** tier (`§2`: "dock, header, primary plate"). The source
  comment at `:4-7` records the choice deliberately, replacing a hand-minted `bg-card/75`. Both are
  wrong for this job: a sampler stage is a **specimen well** — "opaque/quiet neutral stage" — and the
  chrome over it is the **instrument veil** — "denser neutral veil". Picking a producer rung is not
  the same as picking the *right* rung, and the measured `0.808` alpha is what produces the
  double-image in §1.1.
- `<DockSeparator />` (`:15`) puts a divider inside Extract, whose binding inventory in
  `OPTICAL-BENCH-COMPOSITIONS.md §5` reads `Extract | [] | none | none` and closes with "Any
  additional line … is a defect." Confirmed present in the AT tree as `- separator`.

---

## 5. Proportion and seat law

- **`§3` law 2** — "Empty secondary content occupies at most a narrow invitation tray (≤15% of the
  stage)". Measured empty share of the sampling stage: **45.1 %**.
- **`§3` law 8** — "One pane may have one full-strength visual protagonist." The protagonist here
  competes with a ghost of itself and with a legible ghost of the result card.
- **`§4`** — "Live numbers use tabular figures and reserve their widest legal representation so value
  changes never reflow the settled chassis." Measured: the readout reserves 275 px for a 555 px
  value, and the chrome bar gains/loses two 40 px buttons on every pin toggle (`pinnedButtons`
  measured `3 → 1 → 3 → 1`), so the bar reflows on every state change.
- **`§4.1`** — "Text, focus, boundaries and state meet their rendered contrast on the actual material
  tier; a token name is not evidence." Measured readout contrast **4.52 : 1** over a bright specimen,
  **3.57 : 1** over a dark one (AA floor 4.5 for 16.4 px text). The number is a function of the
  user's photograph.
- **`§4.1`** — "Focus remains visibly distinct from selection in both schemes, forced colors and
  reduced transparency." Measured: in forced colors the two states are byte-identical.
- **`§5.2`, image-sampler row** — "named x/y controls own Home=min and End=max; reticle, loupe and
  numeric value remain one model." There are no x/y controls, no Home/End, and no reticle.
- **`§6.1`** — "CSS strings, hex, slugs, IDs and provenance render in LTR-isolated spans inside RTL
  prose." Measured `readoutDir: "rtl"`, `unicodeBidi: "normal"` — no isolation on a string full of
  parentheses and minus signs.
- **`§7` Extract** — "Eyedropper and sampler have keyboard/numeric alternatives." Zero.
- **`PROPORTION-AUDIT.md` PR-07** (`ADD-AFFORDANCE`, "every surviving action/drag seat has a
  name/state") and **PR-12** (touch-target floor): the three controls are `title`-only and measured
  **40 × 40** against a 44 px floor.
- **`OPTICAL-BENCH-COMPOSITIONS.md §3.1/§5`**: eighteen compositions are enumerated and ratified.
  A full-bleed sampler overlay with its own chrome bar, protagonist, mobile behavior and boundary
  set is not one of them, and §5 forbids arriving at one ad hoc.

---

## 6. Defect register

Severity: BLOCKER = the component fails its purpose or a state is unusable. MAJOR = a binding law is
violated or a designed state is wrong. MINOR/INFO = local.

### D-1 · BLOCKER · The instrument disagrees with itself about what is on the screen

**Evidence.** Measured composited specimen pixels from `probe/shot-desktop-light-pinned.png`:
`(300,560) = [127,0,128]`, `(350,500) = [159,0,96]`, `(301,561) = [183,0,72]`. Readout at that
location: `lab(29.568301979097% 68.287364602547 -112.029709525105)` = `#0000FF`. Measured stage zoom
`0.4233`. `probe/shot-forced-colors.png` shows the contradiction inside one frame: the loupe renders
crisp red/blue texels while the surrounding stage renders flat purple.

**Mechanism.** `sampleAt` (`useImageSampler.ts:111-119`) takes exactly one nearest source texel via
`Math.floor((rx - panX) / zoom)`. The visible canvas has no `image-rendering` declaration (computed
`auto`), so the compositor resamples with smoothing; the loupe explicitly sets
`imageSmoothingEnabled = false` (`useLoupeCanvas.ts:40`). Three surfaces — stage, loupe, sampler —
use three different resampling rules over the same bitmap. It is additionally DPR-dependent: the same
region reads flat purple at DPR 1 and resolved checker at DPR 2 (`shot-desktop-light-pinned.png` vs
`shot-zoom200.png`).

**Reproduction.** `node probe/probe.mjs` → `displayedVsSampled.zoom 0.4233`,
`displayedCentrePixel [95,0,160]`; then `node probe/probe2.mjs` → `hoverReadout` = the pure-blue
`lab(...)`. Or by eye: `probe/shot-forced-colors.png`.

**Cure (transposition, not patch).** One resampling law for the whole instrument, owned in one place.
When `zoom ≥ 1` the stage paints nearest-neighbour (`image-rendering: pixelated`) so a texel is a
visible square and the loupe becomes a magnification of the same law. When `zoom < 1` the sample is
the area-average over the `1/zoom × 1/zoom` source box that the pointer's display pixel actually
covers — i.e. sample what the pixel *shows*, which is what the user is pointing at. The loupe then
renders that same footprint with the sampled texel marked, and stage/loupe/readout become one model
rather than three.

### D-2 · BLOCKER · Every second tap is a dead tap that displays the previous color as if current

**Evidence.** `node probe/probe2.mjs`, `tapCycle`:

| tap | target | readout after | buttons |
|---|---|---|---|
| 1 | purple region | `lab(29.568301979097% …)` (purple/blue) | 3 (pinned) |
| 2 | grey region | `lab(29.568301979097% …)` — **unchanged** | 1 (unpinned) |
| 3 | grey region | `lab(53.585013452169% 0 0)` (grey) | 3 (pinned) |
| 4 | purple region | `lab(53.585013452169% 0 0)` — **unchanged** | 1 (unpinned) |

**Mechanism.** `ImageEyedropper.vue:176-185` attaches a capture-phase `pointerdown` listener that
unpins and raises `justUnpinned`; `onTap` (`:151-155`) consumes the flag with an early return. Touch
has no hover, so on a phone this *is* the sampling interaction: half of all taps do nothing except
discard the pin, while the readout continues to display a color from a different part of the image.

**Reproduction.** `node probe/probe2.mjs`.

**Cure.** Delete `justUnpinned` and the capture listener — two event-binding mechanisms on one
element (the composable's `bind()` plus this ad-hoc `watch`) is the shape of the bug. A tap always
samples and always pins; sampling the same texel twice is idempotent. Unpinning belongs to Escape and
to close, which already own it (`:226-235`).

### D-3 · BLOCKER · The magnifier never draws on touch

**Evidence.** `node probe/probe.mjs`, mobile WebKit `390×844 @3× hasTouch`, after
`page.touchscreen.tap()`: `loupe.paintedPx: 0` of `totalPx: 12100`. Visible in
`probe/shot-mobile-dark-tapped.png` as a green ring with the image running straight through it. On
desktop after hover the same measurement is `paintedPx: 9684` — the disc is painted.

**Mechanism.** `showLoupeAt` (`useLoupeCanvas.ts:55-60`) sets `loupeVisible.value = true` and calls
`drawLoupe` in the same tick. The canvas is behind `v-if="loupe.loupeVisible.value"`
(`ImageEyedropper.vue:78-86`), so `loupeCanvasRef.value` is still `null` and `drawLoupe` returns at
line 30. Desktop is masked only because `pointermove` fires repeatedly and the second call finds the
canvas. Every subsequent touch repeats the failure, because the capture handler calls `hideLoupe()`
on `pointerdown`, unmounting the canvas again.

**Reproduction.** `node probe/probe.mjs` → `mobile.loupe.paintedPx: 0`.

**Cure.** The loupe canvas is a fixed 110 px node; keep it mounted and drive visibility with opacity —
which is what the CSS already animates (`:270`). The `v-if` buys nothing and costs the first frame,
which on touch is the only frame.

### D-4 · BLOCKER · The answer is truncated and unrecoverable

**Evidence.** `node probe/probe2.mjs`, `readout`: `chars: 55`, `clientW: 275`, `scrollW: 555`,
`truncated: true`, `title: null`, `font: "Fira Code" 16.4px`. Mobile capture shows `lab(53.5850…`.
At 200 % zoom, `readoutClientW: 117` ≈ 7 characters.

**Mechanism.** A 12-decimal float serialization of an 8-bit sample fed into a `truncate` span with no
title and no expansion. The sibling file in the same feature already solved this and documents why:
`ExtractWorkbench.vue:134-141` — *"truncate may trim trailing digits at narrow widths; the full
readout rides title + select-all (never a lying readout)"* — and adds `:title`. The eyedropper does
not. `formatLibraryColor` (`useImageSampler.ts:39-41`) rounds to 4 dp, but only on the *non*-CSS path;
the CSS path (`serializePickerColor`, `:63-64`) has no equivalent.

**Reproduction.** `node probe/probe2.mjs`.

**Cure.** Quantize at the source: an 8-bit sample carries no information past ~3 decimals in Lab, so
`formatInColorSpace` should round for every space, not only the library ones. Then reserve the widest
legal representation of the selected space per `§4`, and give the readout its own line when the space
is verbose rather than competing with two action buttons for one 275 px row.

### D-5 · BLOCKER · In RTL the specimen is rendered outside its own stage and vanishes

**Evidence.** `node probe/probe4.mjs`:

| | canvas x | canvas w | stage x | stage w | transform |
|---|---|---|---|---|---|
| LTR | 201 | 508 | 201 | 508 | `matrix(0.423333,0,0,0.423333,0,139.04)` |
| RTL | **39** | 508 | **731** | 508 | identical |

Zero overlap; the stage is `overflow-hidden`, so the specimen is clipped away entirely. The readout
still returns `lab(29.568301979097% …)` — the sampler continues to answer for an image that is not
on screen.

**Mechanism.** The canvas is an inline-level element positioned by *static flow*. Its layout box is
the full attribute width (1200 px), so in an RTL block it is right-aligned from the stage's right
edge: `1239 − 1200 = 39`. The `translate()` is applied on top of that accidental origin. In LTR
`canvasX == stageX` by coincidence, and `viewportToImage` (`useImageSampler.ts:103-109`) silently
depends on that coincidence.

**Reproduction.** `node probe/probe4.mjs`.

**Cure.** The specimen's origin must be *stated*, not inherited from flow: absolutely position the
canvas at the stage's physical top-left, which is exactly the frame `viewportToImage` already assumes.
Per `§6.1`, scientific/pixel coordinate axes keep their physical meaning; only the chrome mirrors.
Then add `dir="ltr"` / `unicode-bidi: isolate` to the readout, which currently inherits
`direction: rtl` (measured) for a string of parentheses and minus signs.

### D-6 · MAJOR · No keyboard path in, nothing operable inside, no focus returned

**Evidence.**
(a) Entry — measured on the live route: the drop zone is `tabindex="-1"` when a preview exists, and
`@keydown.enter.space.prevent="!disableClick && openFilePicker()"` (`ImageDropZone.vue:19,21-22`) is
gated off in exactly that state. There is no other opener. The eyedropper is pointer-only.
(b) Inside — `node probe/probe2.mjs`, `keyboardSampling`: after `ArrowRight ×2, ArrowDown, Home,
End`, `before === after`.
(c) Focus — on open `overlayContainsActive: false` with `activeElementOnOpen` = the drop-zone div;
after `Escape`, `afterClose.active: "BODY "`.

**Law.** `§7` Extract: "Eyedropper and sampler have keyboard/numeric alternatives." `§5.2` image-sampler
row. `§5.1`: overlays return focus to "exact connected opener on close". `§5`: "every spatial action
has a keyboard/numeric equivalent."

**Reproduction.** `node probe/probe2.mjs`.

**Cure.** The sampler coordinate is already a model (`viewportToImage`); expose it as the two named
numeric axes `§5.2` specifies, with Home/End, and let the reticle, loupe and readout all read that one
model. The opener becomes a named control rather than a `tabindex="-1"` region, and close restores it.

### D-7 · MAJOR · A modal in geometry, nothing in semantics

**Evidence.** `node probe/probe.mjs`: `overlayRole: null`, `overlayAriaModal: null`,
`overlayAriaLabel: null`, `overlayTabindex: null`; `tabbableInsideOverlay: 1`,
`tabbableOutsideOverlay: 7`. `node probe/probe5.mjs`: `liveRegions: 0` across the entire document.
AT tree of the overlay: `button "Close eyedropper" / separator / text: lab(29.568…) / button "Add to
palette" / button "Apply as current color"` — the sampled value is bare text with no role, no name and
no announcement; the pinned state is announced nowhere.

**Law.** `§4.1`, `§5.1` (Dialog/Drawer/Popover open and close row).

**Cure.** Use the producer's dialog housing rather than a locally minted `z-popover` sheet: initial
focus, containment, an accessible name, and one `role="status"` that carries the sampled value and
the pinned state. Do not add a fourth overlay species to the demo.

### D-8 · MAJOR · The specimen well is translucent, so the page shows through the instrument

**Evidence.** Measured `overlayBg: oklab(0.936408 0.005529 0.013284 / 0.808)`,
`overlayBackdrop: blur(11px) saturate(1.6)`. In `shot-desktop-light-open.png`,
`shot-mobile-dark-tapped.png` and `shot-zoom200.png` the drop-zone preview and the result card are
both legible through the overlay.

**Law.** `§2`: specimen well = "opaque/quiet neutral stage"; instrument veil = "denser neutral veil
with named alpha/clarity levers". `glass-floating` is the *structural* tier ("dock, header, primary
plate"). The source comment at `:4-7` records the substitution as a fix; it moved the defect rather
than closing it.

**Cure.** Two tiers, not one: an opaque specimen well for the stage, an instrument veil for the chrome
bar that genuinely floats over live color. The double image disappears as a consequence, not as a
separate patch.

### D-9 · MAJOR · Nearly half the sampling stage is empty

**Evidence.** Measured stage `508 × 616.8`, specimen `508 × 338.7`, `specimenAreaPctOfStage: 54.9`.
Starkly visible in `shot-forced-colors.png`, where the empty band is naked white.

**Mechanism.** `absolute inset-0` (`:8`) makes the overlay inherit the *workbench's* rectangle, whose
aspect has nothing to do with the specimen; `fitToViewport` (`useInertiaGesture.ts:152-167`) then
contains inside it. The comment at `:158-161` records the previous fix in this area (small images no
longer float small) — the reciprocal case, a stage whose aspect does not match the specimen, was never
addressed.

**Law.** `§3` laws 2 and 8.

**Cure.** The sampler is its own composition and must be ratified as one (`§3.1`, `§5`): a stage sized
to the specimen's aspect with the chrome bar docked to it, not a workbench-shaped hole with a picture
floating in the middle.

### D-10 · MAJOR · The pinned state is color-only, low-contrast, and invisible in forced colors

**Evidence.** `node probe/probe3.mjs`, Chromium `forcedColors: "active"`:

| | class | border-color | box-shadow |
|---|---|---|---|
| unpinned | `loupe` | `rgb(0,0,0)` | `none` |
| pinned | `loupe loupe-pinned` | `rgb(0,0,0)` | `none` |

`identical: true`. In light mode, measured ring-vs-interior contrast **1.65 : 1** (`probe/pixels.mjs`
over `shot-desktop-light-pinned.png`), and `--primary` is hue 129.8° green — it approaches 1 : 1 over
green imagery by construction.

**Mechanism.** Both carriers of the distinction — `border-color: var(--primary)` and `box-shadow`
(`:273-276`) — are exactly the two properties forced-colors neutralizes.

**Law.** `§4.1`: "Focus remains visibly distinct from selection in both schemes, forced colors and
reduced transparency."

**Cure.** State over arbitrary imagery cannot ride a single color. A dual-tone ring (light core + dark
casing, the standard optical-loupe treatment) survives any backdrop and any forced palette, and a
geometry delta (ring weight, or the reticle appearing) carries the state without color at all.

### D-11 · MAJOR · The success flourish fires once per session, then is silent forever

**Evidence.** `node probe/probe6.mjs` after clicking "Add to palette": at t+60 ms the element carries
`animationName: swatch-pop-5659b98f`, `animationDuration: 0.65s`, `playState: running`. At t+2000 ms,
`stillPulsingAfter2s: true` — the `.swatch-pulse` class is still applied. `@animationend` never reset
the flag. `liveRegions: 0`.

**Mechanism.** `@animationend="swatchPulse = false"` (`:22`) is bound on the `<WatercolorDot>`
*component*, not an element; the reset never runs. `swatchPulse` therefore stays `true`, so a second
Add produces no class change, no re-animation, and no feedback of any kind. `onAddToPalette` and
`onApplyColor` (`:212-224`) are otherwise identical — two different verbs, one indistinguishable
flourish, no durable record.

**Law.** `§5`: "A transient flourish may celebrate success but never carries the only truth."
Under `prefers-reduced-motion` the global guard (`animations.css:184-192`) zeroes the animation, so
the truth is carried by nothing at all.

**Cure.** The durable truth is that the palette gained a swatch — say so once in the status region the
overlay is missing (D-7), and distinguish "added" from "applied". If the flourish is kept, key it
(`:key`) so it restarts on repeat, instead of depending on a DOM event bubbling out of a producer
component.

### D-12 · MAJOR · A container resize discards the user's zoom and pan

**Evidence.** `node probe/probe6.mjs`: after ctrl-wheel zoom, `{zoom: 2.4314, panX: -721, panY:
-664.1}`; after `setViewportSize(1100×760)`, `{zoom: 0.4233, panX: 0, panY: 133.8}`.

**Mechanism.** `useInertiaGesture.ts:354-360` observes the stage and calls `fitToViewport()`, which
unconditionally overwrites `zoom`, `panX`, `panY` (`:162-166`). On a phone this fires on every URL-bar
collapse and every rotation: you zoom to a detail, scroll a pixel, and lose it.

**Reproduction.** `node probe/probe6.mjs`.

**Cure.** Refit is a *content* event, not a *geometry* event. On resize, preserve the image coordinate
at the stage centre and the zoom, then re-clamp; refit only when the image changes.

### D-13 · MAJOR · Hover paints the action icons with an arbitrary user color

**Evidence.** `:279-282` sets `svg { color: var(--hover-color) }` where `--hover-color` is the sampled
color (`:10`). Measured bar backdrop `rgb(220,213,206)` (bright specimen) and `rgb(197,190,183)` (dark
specimen). Contrast of a sampled white icon: **1.45 : 1** and **1.84 : 1**. Sampled mid-grey:
**2.72 : 1**. Non-text minimum is 3 : 1.

**Mechanism.** Per-instance descendant override of a glass-ui `DockControl` root, plus
`transform: scale(1.2)` inventing a local hover register.

**Law.** Owner edict 5; `§4.2` ("W17 deletes descendant corrections"); `§4.1` rendered-contrast rule.

**Cure.** Delete it. Hover belongs to the producer. The sampled color already has a dedicated
carrier — the `WatercolorDot` two elements away.

### D-14 · MAJOR · The readout's legibility depends on the user's photograph

**Evidence.** Ink `rgb(112,89,66)` (measured computed `color`). Composited bar backdrop over a bright
specimen: `rgb(220,213,206)` → **4.52 : 1**. Over `probe-dark.png` (`rgb(8,8,10)` specimen):
`rgb(197,190,183)` → **3.57 : 1**, below the 4.5 : 1 AA floor for 16.4 px text. Measured across the
whole readout band in `shot-desktop-light-darkspecimen.png`: best 3.57.

**Mechanism.** A static `text-muted-foreground` token over a 0.808-alpha backdrop-blurred surface
whose backdrop is arbitrary user imagery. The sibling file already diagnosed and fixed exactly this
class of failure — `ExtractWorkbench.vue:285-292`, `--ink-muted`, "boot-stamped, floor-clamped against
the live resting plate … never the STATIC `text-muted-foreground` that failed the text floor over the
live-ambient plate in light." The eyedropper uses the static token the comment names as the defect.

**Cure.** Opaque chrome (which D-8 requires anyway) or the certified floor-clamped `--ink-muted` rung.

### D-15 · MINOR · A divider in a composition whose binding inventory says `none`

**Evidence.** `<DockSeparator />` at `:15`; present in the measured AT tree as `- separator`.
`OPTICAL-BENCH-COMPOSITIONS.md §5`: `Extract | [] | none | none`, and "Any additional line, automatic
P122 divider, consumer-hidden producer line, terminal row rule, caster stroke or corner rule is a
defect."

**Cure.** Remove it; interval and material already separate the close control from the specimen
readout, which is the stated grouping job for Extract.

### D-16 · MINOR · An unratified composition

**Evidence.** `§3.1` and `§5` enumerate exactly eighteen compositions with named frames, protagonists,
region ratios, collapse behavior, mobile sequence, Card decisions and boundary sets. A full-bleed
sampler overlay is not among them. `§5`: "changing topology requires an explicit revision to this
artifact and the affected pair, never an ad hoc local Card, divider, reserve or breakpoint."

**Cure.** Ratify the sampler as a named composition (it is the second protagonist of Extract), which
is also where D-9's stage aspect and D-8's material tier get decided once instead of per-element.

### D-17 · MINOR · Sub-minimum tap targets

**Evidence.** All three controls measured `40 × 40` (`probe/probe2.mjs`, `aria[]`), against the 44 px
floor. `PROPORTION-AUDIT.md` PR-12. Context: `/#/extract` already reports 6 small tap targets in all
four Safari matrices (`visual/REPORT.json`) *before* the eyedropper is opened.

### D-18 · MINOR · The loupe is optically wrong: occluded, non-DPR-aware, off-magnification, no reticle

**Evidence.** Measured mobile: backing `110 × 110`, CSS box `106 × 106`, `dpr: 3` → 318 device px
painted from a 110 px bitmap, a 2.89× upscale *of a deliberately nearest-neighbour image*. The
110→106 mismatch comes from `LOUPE_SIZE` being used as the border-box width (`:194-195`) while a 2 px
border is declared (`:265`), so the intended `110/11 = 10` px per texel is actually `9.64`, and the
crisp blocks are resampled by 0.964 — uneven block widths across the disc. The loupe centre is the
touch point, so a finger covers it. No reticle marks which of the 121 displayed texels is the sample:
in `shot-forced-colors.png` the loupe shows a red/blue checker and the readout says blue — unverifiable
by eye. `§5.2`: "reticle, loupe and numeric value remain one model."

**Cure.** Size the backing store to `LOUPE_SIZE × devicePixelRatio`, make `LOUPE_SIZE` the content box,
offset the loupe from the touch point on coarse pointers, and draw the reticle — one square on the
sampled texel, which is the same model D-1 and D-6 need.

### D-19 · MINOR · Empty, loading, error and out-of-bounds states do not exist

**Evidence.** `sampleAt` returns `null` out of bounds (`useImageSampler.ts:114-115`) and the caller
(`:156-162`) does nothing — no message, no cursor change, and the previous color stays displayed as
current. `loadImage` rejects on `img.onerror` (`:72-75`) and `onMounted(() => { loadAndFit(); … })`
(`:237-240`) never catches. `img.crossOrigin = "anonymous"` (`:70`) routes every non-CORS cross-origin
URL into that same silent arm; a tainted-canvas `getImageData` (`:116`) would throw inside a
`pointermove` handler. There is no loading affordance between mount and decode.

**Reproduction.** Out-of-bounds is directly reproducible (tap the empty 45 % of the stage — D-9 —
and observe the stale readout). The decode-failure arms are certain from the code but not reachable
through the current parent, which only supplies same-origin data URLs: **the missing `catch` is
confirmed; its live reachability is a hypothesis** pending a producer that can pass a remote URL.

### D-20 · MINOR · Two full-resolution copies of the bitmap

**Evidence.** `useImageSampler.ts:80-92` draws the same decoded image into an offscreen canvas *and*
the visible canvas. Measured for `probe-1200.png`: `visibleCanvasBytes: 3,840,000` — and the offscreen
canvas is the same size again. For a 4032 × 3024 phone photo that is 48.8 MB × 2, alongside the live
`<img>` and the base64 `previewDataUrl` the parent retains. `dispose()` (`:97-101`) drops the offscreen
reference but never shrinks the visible canvas, so its bitmap survives until GC.

**Cure.** One bitmap. The offscreen canvas is the sampling authority; the visible layer needs only
what it paints.

### D-21 · INFO · A composable that reaches into another file's template

`useLoupeCanvas` calls `useTemplateRef("loupeCanvasRef")` (`useLoupeCanvas.ts:21`), resolving a ref
*name* declared in `ImageEyedropper.vue:85`, and returns a handle the caller never binds. Rename the
template ref and the loupe silently stops drawing, with no type error. The encapsulation is nominal.

### D-22 · INFO · The pulse class re-declares a utility's size

`swatchPulse ? 'swatch-pulse' : 'w-7 h-7'` (`:21`) with `.swatch-pulse { width: 1.75rem; height:
1.75rem }` (`:285-289`) duplicates `w-7` in hand-written CSS. Change the utility and the pulsed state
diverges silently.

---

## 7. The gestalt cure

These twenty-two are not twenty-two problems. They are four:

1. **There is no single sampling model.** Stage, loupe, readout and commit each hold their own idea of
   "the pixel under the cursor" — three resampling rules (D-1), a coordinate frame that only works in
   LTR by coincidence (D-5), a magnifier that is not the stage's magnification (D-18), and no keyboard
   expression of the coordinate at all (D-6). One `SamplerModel` — image coordinate, footprint, and the
   quantized color — owned in one place and *read* by stage, loupe, reticle, readout and commit, closes
   D-1, D-4, D-5, D-6, D-18 and the out-of-bounds arm of D-19 together.

2. **The overlay is an unratified species.** It is geometrically a dialog, materially structural glass,
   semantically nothing, and compositionally a workbench-shaped hole (D-7, D-8, D-9, D-15, D-16).
   Ratify it as a named composition with the correct two material tiers and the producer's dialog
   housing, and D-7, D-8, D-9, D-13, D-14, D-15, D-16 close as consequences.

3. **State is expressed only in color, and only in transit.** Pinned rides one hue (D-10); success rides
   one animation that fires once (D-11); nothing is ever announced or recorded (D-7). State needs a
   non-color carrier and a durable seat.

4. **Interaction state is kept in ad-hoc flags outside the model.** `justUnpinned` plus a second,
   never-removed event-binding mechanism produce the alternating dead tap (D-2); an unconditional
   `fitToViewport` on resize throws away navigation (D-12); `swatchPulse` latches true forever (D-11).
   Fold pin, pulse and view into the model above and the flags have nowhere to hide.

The component's bones are good — the gesture composable is careful, PRM-gated, and correctly split;
the tracked-canvas motion is canon. The design around those bones was never finished for touch, for
keyboard, for RTL, for forced colors, or for the case where the answer is longer than the box.
