# CHALLENGE-D — `demo/workbenches/extract/ExtractWorkbench.vue` — pass 2

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. That is the tier this seat was explicitly spawned with; the declaration is
present in my seat, not inherited from a parent.

---

## 0. Provenance of this pass

A pass-1 CHALLENGE-D report already existed at this path (`2026-07-27 18:40`, 28
findings). I did **not** clobber it: it is preserved verbatim at
`docs/tranches/V/megatranche/audit/components/wb-extract-workbench/challenge-D-design.pass1-2026-07-27.md`.

This file is pass 2. It does three things:

1. **Independently re-measures** eight pass-1 findings from a cold browser session with
   different tooling (Playwright MCP + PIL pixel sampling of the Safari PNGs, rather than
   pass-1's `probe-D-*.mjs` scripts). Re-measurement is what turns a PLAUSIBLE finding
   into a CONFIRMED one; a second independent instrument is worth more than a second
   reading on the same one. Notably, pass 1's type-collision number (`41.888px = 41.888px`)
   reproduced **exactly** under my instrument.
2. **Adds eleven defects pass 1 did not report** — all in the camera, sampler-entry, and
   failure registers, all provable from source coordinates or a measured number.
3. **Converges on pass 1's gestalt independently.** Pass 1 concluded "this workbench
   renders the absence of its output more emphatically than the output itself"; I arrived
   at the same sentence from the canon side ("absent result collapses context") without
   having read pass 1 first. Two seats, two instruments, one diagnosis — the finding is
   not an artefact of one reading.

Where a defect is pass-1's, I say so and give it pass-1's ID. New defects carry `D2-nn`.

---

## 1. Verdict

**DEFECTIVE.** The premise holds, and it holds at the gestalt level rather than at the
level of individual pixels. The single sentence that condemns this component is the
tranche's own:

> `VISUAL-CONSTITUTION.md:198` — "The image is the stage. The palette develops from it
> into a compact specimen plate; **the undeveloped state remains contextual, not a giant
> shadow placeholder.** Eyedropper and sampler have keyboard/numeric alternatives."

The shipped component fails **both sentences of that paragraph**, measurably, on the
default first frame every visitor sees. It also fails its own binding composition row:

> `OPTICAL-BENCH-COMPOSITIONS.md:42` — "**Extract** | P122 `golden`: source/sampler
> 61.8033989%; result controls 38.1966011%; **absent result collapses context**. | … |
> Landmark-neutral chassis; image well is specimen, not Card."

The component has no chassis, no golden ratio, and its absent result does not collapse
context — it *manufactures* context, 97% the size of the stage, out of nothing.

**Strongest defect: D2-01** — the undeveloped state is exactly the "giant shadow
placeholder" the constitution names and forbids: 177.5 px of pure placeholder against a
182.9 px image stage (**97.0%**), measured live at the reference desktop viewport.

---

## 2. Instruments used

| Instrument | What it decided | Where |
|---|---|---|
| Safari matrix PNGs, 4 matrices | how it actually looks, light+dark, desktop+mobile | `../../visual/shots/safari-*/extract.png` |
| `../../visual/REPORT.json` | tap targets, nameless buttons, overflow, console | quoted below |
| Playwright MCP → live dev server `:9000` | computed type rungs, rects, tab order, developed-state readout | pasted below |
| PIL pixel sampling of the mobile PNGs | ghost-vs-plate luminance in both schemes | pasted below |
| Source read | dead branches, dual camera paths, failure channel | file:line below |

Browser probes were held to seven calls; the shared browser was then taken by a
concurrent session, which is why two numbers below are arithmetic from measured
constituents rather than one direct reading. Each is labelled.

---

## 3. Visual truth

### D2-01 · BLOCKER — the undeveloped plate is the "giant shadow placeholder" the constitution names and forbids

Live, viewport 1440×900, the Extract pane column measures 463 px wide:

```
dropZone (the stage)      : { w: 463.1, h: 182.9 }
ShadowPalette (the ghost) : { w: 462.9, h: 153.0 }
caption "· undeveloped plate — feed it an image ·" : { w: 462.1, h: 24.5 }
```

Placeholder block = 153.0 + 24.5 = **177.5 px** against a **182.9 px** stage → the
representation of *nothing* occupies **97.0%** of the height of the representation of
*the thing itself*, and **82,165 px²** of a pane that has 463 px to work with.

Three independent canon rows break on that one number:

- `VISUAL-CONSTITUTION.md:198` — "the undeveloped state remains contextual, **not a giant
  shadow placeholder**".
- `OPTICAL-BENCH-COMPOSITIONS.md:42` — "**absent result collapses context**".
- `VISUAL-CONSTITUTION.md:34` (proportion law 8) — "One pane may have one full-strength
  visual protagonist. **Supporting fixtures do not compete with it through equal size or
  equal shadow.**" 97% *is* equal size; and the ghost carries `shadow-cartoon-sm`, which
  measures as three stacked casters (D2-02) — equal shadow too.

The mobile frames are worse, because the caption then wraps: in
`safari-mobile-light/extract.png` the ghost plus its two-line caption run y≈1420→1940 of a
1992 px frame — the last quarter of the scroll is an apology for an empty result.

The component's own comment (`ExtractWorkbench.vue:87–101`) defends the ghost because
"`count` rides the k-slider LIVE, so k is legible before any image exists and the ghost
re-segments under the slider". That defence concedes the defect: the job it names is
*"make k legible"*, and k is already legible — it is printed as a live numeral at
`ExtractControls.vue:15`, and the k rail directly above is a full-width bar whose
segmentation carries the same information. An 82,165 px² second instrument exists to
duplicate a 20 px label.

**Reproduction:** `http://localhost:9000/#/extract`, cold load, 1440×900. No interaction
required — this is the default frame. Numbers above are pasted `getBoundingClientRect()`
output.

**Cure (transposition, not patch):** delete `ShadowPalette` from this seat and let the
result region have **zero height until there is a result** — which is precisely what
"absent result collapses context" instructs. The invitation already lives in the stage
("Drop an image or click to browse", `ImageDropZone.vue:48–50`); it does not need a second
voice. Live-k feedback moves onto the k rail, which is already a color-bearing track
(`ExtractControls.vue:19–23`) and is the honest place for it: one instrument, one readout.
`ShadowPalette.vue` then has **no seat at all** and dies with the row — its own header
comment says "ONE seat: … Extract's k-threaded undeveloped plate".

### D2-02 · MINOR — the placeholder wears a boundary and a caster, against the binding boundary inventory

`OPTICAL-BENCH-COMPOSITIONS.md:76` is binding and unambiguous:

| Composition | P122 boundaries | P122 reserve | Retained non-P122 dividing line |
|---|---|---|---|
| Extract | `[]` | `none` | **none** |

Measured on the ghost (live computed style):

```
border-color: oklab(0.216128 0.00350075 0.00518669 / 0.12)
box-shadow  : oklab(...) -2px 2px 0 0, oklab(...) -3px 3px 0 0, oklab(...) -4px 4px 0 0
```

One retained boundary line plus a three-layer cartoon caster, on a surface that contains
no object. `PROPORTION-AUDIT.md:49` PR-05 disposes of exactly this family: "Dividers,
**caster shadows** and corner marks repeat a boundary → REMOVE / KEEP … every other
divider/ornament is zero." Source: `ShadowPalette.vue:47`
(`border border-card-edge … shadow-cartoon-sm`).

**Cure:** subsumed by D2-01 — the surface goes away. If any ghost survives elsewhere, it
takes material and interval only: no edge, no caster.

### D2-03 · MAJOR — the value line uses two off-matrix type rungs, and one collides exactly with the pane identity

`VISUAL-CONSTITUTION.md:68–78` publishes a **closed** seven-role type matrix; §4 states
"This matrix is closed across all eighteen compositions", with P019's Picker pair the sole
exception. Value/code/provenance is `text-mono-small` or `mono-caption`, Fira Code.

`ExtractWorkbench.vue:122–128` renders the dominance statistic as:

```html
<span class="font-display text-display leading-none shrink-0">
  {{ Math.round(session.dominantShare.value * 100) }}<span class="text-body font-normal plate-ink">% of the image</span>
</span>
```

Live computed, developed state:

```
"60% of the image"   → font-size 41.888px, Fraunces, weight 400, font-variant-numeric: normal
pane title "Extract" → font-size 41.888px, Fraunces, weight 400
```

Three defects in one line:

1. **`text-display` on a value.** The matrix assigns `text-display` to "route H1 or major
   argument". A derived percentage renders at **byte-identical** size and family to the
   instrument's own identity — 41.888 px = 41.888 px. Card law 11
   (`PROPORTION-AUDIT.md:76`): "A display-sized readout is not therefore a document
   heading or live status." *(Pass-1 D-7 reached the same three-decimal identity through a
   different probe; independently CONFIRMED here.)*
2. **`text-body` is not in the matrix at all.** It resolves — it is a real glass-ui
   utility (`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`,
   `@utility text-body`) — but it is not one of the seven sanctioned roles, and it appears
   in only three demo files repo-wide (`grep -rln "text-body" demo/` → `demo/DESIGN.md`,
   this file, `demo/scenes/about/ColorNutritionLabel.vue`). An off-matrix rung with two
   consumers is not a system; it is a local invention. **New in pass 2.**
3. **No tabular figures, no reserve.** `VISUAL-CONSTITUTION.md:78` — "**Live numbers use
   tabular figures and reserve their widest legal representation so value changes never
   reflow the settled chassis.**" Measured `font-variant-numeric: normal`; the number is
   1–3 glyphs of proportional Fraunces with no reserved width, and the row's right-hand
   group is pinned with `ml-auto` (`:129`), so every k change that walks the share from
   `9` to `100` reflows the whole label line horizontally. **New in pass 2.**

**Cure:** the line becomes the mandated pair — `text-mono-small` Fira value +
`text-small` label — with `tabular-nums` and a three-glyph reserve. If the product truly
wants a headline statistic here, it must arrive as a ratified paired-clamp exception the
way P019 was ratified for Picker, not by borrowing the H1 rung.

### D2-04 · MAJOR — the specimen readout is an unrounded 56-character float, and it is truncated at the shipped column width

Live, developed state, the `<code>` element's own text:

```
oklch(53.1574088865% 0.129031386517 261.300836681396deg)     ← 56 chars
scrollWidth: 565px @ font-size 16.4px Fira Code
```

Two faults, one nested in the other:

1. **Precision.** Twelve significant figures of chroma is a debug dump, not a specimen. A
   human reads `oklch(53.16% 0.129 261.3)` — 25 characters — and can retype it. The `deg`
   suffix is legal CSS but is not the canonical `oklch()` hue serialization, so the string
   is simultaneously over-precise and non-idiomatic.
2. **Fit.** The shipped desktop column is 463 px (measured). The row is
   `[percentage 172.5px] [gap 8] … ml-auto [ "dominant" ≈72px ] [gap 8] [code]`, leaving
   ≈ **202 px** for a string that needs **565 px** → roughly **36% of the value is
   visible**. *(Arithmetic from two measured constituents: `scrollWidth = 565` measured at
   a 999 px column in the dev workspace; the 463 px column measured on the same page.
   Pass-1 D-8 reports 31% from a direct reading — the two agree within the label-width
   estimate, so this is CONFIRMED.)*

The component knows (`ExtractWorkbench.vue:134–136`): "truncate may trim trailing digits
at narrow widths; the full readout rides title + select-all (never a lying readout)". A
`title` tooltip is unavailable on touch and is not a design answer; a value 2.8× its
container is a formatting decision taken in the wrong place.

**Cure:** round at the presentation boundary — the visible readout takes a fixed,
reserved, widest-legal representation (per `VISUAL-CONSTITUTION.md:78`), and the
full-precision string rides the Copy action. This is a serialization-precision argument,
not a CSS `truncate`.

### D2-05 · INFO — the dark treatment is *not* inverted (a pass-2 negative result)

From the light frames I expected the ghost to vanish in dark. It does not. PIL sampling of
the two mobile PNGs (identical crops, sRGB relative luminance, WCAG ratio):

```
light  ghost strip (199,192,185) vs plate (237,193,200)  → 1.12
light  ghost body  (225,217,209) vs plate                → 1.15
dark   ghost strip ( 88, 78, 71) vs plate (116, 79, 83)  → 1.15
dark   ghost body  ( 71, 61, 53) vs plate                → 1.50
```

The `--skeleton-ink` recipe holds in both schemes and the dark arm is in fact *stronger*.
The E1-R2 remediation recorded at `ShadowPalette.vue:96–104` did what it claims. Recorded
so the mega-tranche does not chase a dark-mode ghost that is not there: the ghost's defect
is **area** (D2-01), not scheme fidelity.

---

## 4. State coverage

Every state this component can occupy, and whether it was designed:

| State | Handled? | Evidence |
|---|---|---|
| empty (no image) | over-handled | D2-01 |
| loading (`isProcessing`) | designed, effectively unreachable | pass-1 D-2; my drop→card path never showed it either |
| populated | yes, with D2-03 / D2-04 defects | live measurement |
| error — quantize | **color-only, unannounced, undismissable** | D2-06 |
| error — camera | **wrong channel, raw exception text** | D2-06 |
| error + stale result together | **never designed** | D2-07 |
| camera active | **no exit** | D2-08 |
| camera active + second press | **stream leak** | D2-09 |
| camera viewfinder vs captured frame | **what you see is not what you get** | D2-23 |
| image loaded → replace by click | **unreachable by construction** | D2-10 |
| image loaded → clear / remove | **does not exist** | pass-1 D-13 (confirmed) |
| sampling (eyedropper) | **pointer-only** | D2-11 (pass-1 D-11, confirmed) |
| eyedropper open → background | **no dialog semantics, no focus trap / restore** | D2-12 |
| disabled (processing / camera) | computed, then dropped by 5 of 6 controls | pass-1 D-12 (confirmed; see D2-08) |
| focused | the drop zone loses focusability the moment it becomes useful | D2-11 |
| hovered | a corner chip that can only ever say one of its two words | D2-10 |
| pressed / active | none authored | — |
| selected | n/a | — |
| dragging (file over zone) | yes — `border-primary bg-primary/10 scale-[1.01]` | `ImageDropZone.vue:11–12` |
| overflowing / truncated | truncates the primary value | D2-04 |
| RTL | pass-1 D-9; **no capture exists** | D2-13 |
| reduced-motion | global guard exists; **no capture exists for this route** | D2-13 |
| forced-colors | pass-1 D-23; **no capture exists** | D2-13 |
| zoom 200% | **no capture exists** | D2-13 |

### D2-06 · MAJOR — the failure register is color-only, unannounced, undismissable, and prints raw exception text

`ExtractWorkbench.vue:79–85`:

```html
<div v-if="session.quantizeError.value" class="text-mono-small text-destructive px-1">
    {{ session.quantizeError.value }}
</div>
```

- **Color-only.** No icon, no "Error" lead, no role. `VISUAL-CONSTITUTION.md:83` —
  "Selected, **failed**, pending, withdrawn and disabled states **are never color-only**.
  Role, accessible name, state/value and associated error/status are explicit." This line
  is a red string and nothing else.
- **Unannounced.** No `role="alert"`, no `aria-live`. A screen-reader user gets silence
  where a sighted user gets red.
- **Undismissable.** Nothing clears it but a subsequent successful quantize
  (`useImageQuantize.ts:86` sets `error.value = null` only inside `runQuantize`). A camera
  denial therefore parks a red line on the plate permanently for a user who never uploads.
- **Raw exception text.** `ExtractWorkbench.vue:252` —
  `session.quantizeError.value = \`Camera access denied: ${err}\`` — interpolating the
  `DOMException` yields e.g. *"Camera access denied: NotAllowedError: Permission denied"*
  in the interface.
- **Wrong channel.** A camera-permission failure is written into `quantizeError` — a
  computed whose getter reads the *worker* error and whose setter writes it
  (`useExtractSession.ts:66–73`) — and is then rendered in the **result** column while the
  failure occurred in the **image** column. Cause and report live in different places.

*(Pass-1 D-26 flags the channel. The color-only, unannounced and undismissable arms are
new in pass 2.)*

**Cure:** one status region per instrument carrying the three registers the canon names —
pending (`role="status"`), failure (`role="alert"` + icon + human copy + a **Retry**
action), idle (absent). Camera failures surface at the camera.

### D2-07 · MAJOR — error and stale result render together, because the result is never invalidated (NEW)

`useImageQuantize.ts:57–66`: on a worker `error` message, `error.value` is set and
`isProcessing` cleared, but `palette.value` is left untouched. `extractedPalette` derives
from `palette` (`useExtractSession.ts:75–99`), so it survives.

Consequence: a k change that fails leaves the **previous** developed card fully rendered,
labelled with the **previous** dominance percentage, under a red error line. The user is
shown a complete, confident, wrong answer plus a complaint. The component insists
"error ≠ empty stands" (`ShadowPalette.vue:44`) — but error-versus-**stale** was never
considered.

**Reproduction:** HYPOTHESIS — requires a worker failure I did not manufacture. The
mechanism is a source read (`useImageQuantize.ts:57–66` against
`useExtractSession.ts:75–99`); the rendering consequence is entailed by
`ExtractWorkbench.vue:80` (`v-if` on error) and `:109` (`v-else-if` on `extractedPalette`)
being **independent** conditions.

**Cure:** result and failure are one union, not two flags — `palette` clears (or is
explicitly marked stale, dimmed and labelled) the moment a run fails.

### D2-08 · MAJOR — the camera is a one-way door: it can be opened but not closed (NEW)

The viewfinder (`ExtractWorkbench.vue:34–59`) contains exactly **one** control: the
Aperture capture chip. No Cancel, no X, no Escape handler.

The exits from `cameraActive === true` are:

- `captureFrame()` → `onFile()` → `stopCamera()` (`:265–279`) — i.e. **take a picture**;
- dropping a file on the zone → `onFile()` → `stopCamera()`;
- unmount (`onBeforeUnmount(stopCamera)`, `:281`) — i.e. **leave the route**.

There is no "I opened this by mistake" path. Reset cannot help: it is
`:disabled="disabled || !hasImage"` (`ExtractControls.vue:84`) and even when enabled it
only restores k and chroma defaults (`useExtractSession.ts:180–184`) — it never touches
the camera or the image. So a user who taps Camera has a live video feed of their room on
screen, recording indicator lit, until they either photograph something or navigate away.

Compounding it: the `disabled` value the workbench computes for exactly this case —
`:disabled="session.isProcessing.value || cameraActive"` (`ExtractWorkbench.vue:70`) — is
consumed by **one** of the six controls in `ExtractControls.vue` (Reset, line 84). Upload,
Camera and both sliders ignore it. *(Pass-1 D-12 found the same drop; pass 2 confirms it
by source read and adds this consequence.)*

**Cure:** the camera becomes a **mode of the stage**, not a floating block: entering it
swaps the stage content and the action region gains the pair the mode requires — `Cancel`
and `Capture`; `Escape` cancels. That is the canon's "select → tune → commit" grammar
(`VISUAL-CONSTITUTION.md:96`) applied to a mode rather than a value.

### D2-09 · MAJOR — pressing Camera twice leaks the first MediaStream (NEW)

`ExtractWorkbench.vue:239–255`:

```ts
async function startCamera() {
    cameraActive.value = true;
    cameraStream = await navigator.mediaDevices.getUserMedia({ … });   // ← overwrites
    …
}
```

`cameraStream` is overwritten without stopping the previous stream's tracks. Because the
Camera button is never disabled while the camera is live (D2-08), a second press is always
one click away. The orphaned stream's tracks are never stopped, so the camera indicator
stays lit after `stopCamera()` runs — `stopCamera` only knows the last assignment
(`:257–263`).

**Reproduction:** HYPOTHESIS — needs a real camera-permission grant, which the headless
probe cannot supply. The mechanism is unambiguous in source: an `await`-assigned mutable
module-scope handle, no re-entry guard, no teardown on re-entry.

**Cure:** falls out of D2-08's mode design — a mode cannot be entered while already
active. Better still, delete the code entirely (D2-16).

### D2-23 · MAJOR — the viewfinder is not the frame you capture (NEW)

`ExtractWorkbench.vue:39–45` renders the live preview as:

```html
<video ref="videoRef" autoplay playsinline muted class="w-full max-h-[200px] object-cover" />
```

`captureFrame()` (`:265–272`) then captures the **entire** video frame:

```ts
canvas.width = video.videoWidth;   // 640 ideal
canvas.height = video.videoHeight; // 480 ideal
canvas.getContext("2d")!.drawImage(video, 0, 0);
```

`object-cover` with `max-h-[200px]` centre-crops the preview; the capture takes the full
uncropped 4:3 frame. At the 463 px column the preview is 463×200 = 2.32 : 1 against a
1.33 : 1 source, so roughly **43% of the captured image is never shown to the user before
they capture it.** For a *color-extraction* instrument this is not cosmetic: the palette is
quantized over pixels the viewfinder concealed, so the returned dominant color can come
from a region the user never saw. Pass-1 D-1 found the same class of defect on the
uploaded-image preview; this is its camera-side twin, and it is unreported.

**Reproduction:** HYPOTHESIS for the rendered arm (no camera in the probe environment).
The geometry is entailed by the two source coordinates above and is deterministic.

**Cure:** `object-contain` on the viewfinder — the frame you see is the frame you get —
or crop the capture to the displayed rect. The two must agree; which one wins is a product
choice, but they cannot disagree.

### D2-10 · MAJOR — the workbench collapses two different predicates into one, making two designed states unreachable (NEW)

`ExtractWorkbench.vue:22–25` binds **both** of `ImageDropZone`'s inputs from one value:

```html
:preview="session.previewDataUrl.value"
:disable-click="!!session.previewDataUrl.value"
```

`ImageDropZone` was written to distinguish them (`ImageDropZone.vue:20, 61`):

```html
:aria-label="preview ? (disableClick ? 'Image preview area, tap to sample colors'
                                      : 'Replace image, click or drop a new image')
                     : 'Upload image, click to browse or drop an image here'"
…
>{{ disableClick ? 'sample' : 'replace' }}</span>     <!-- v-if="preview" -->
```

Because the workbench makes `disableClick ≡ !!preview`, the branch `preview && !disableClick`
is **arithmetically impossible**. Therefore:

- the aria-label *"Replace image, click or drop a new image"* can never be announced;
- the corner chip can never read *"replace"* — it is `v-if="preview"` and always resolves
  to `"sample"`.

Two authored states, dead on arrival. The user-visible consequence is worse than the dead
code: **click-to-replace does not exist**. Once an image is loaded the only replace paths
are drag-and-drop (`@drop` is not gated) or the Upload button — and drag-and-drop does not
exist on touch.

Live confirmation of the collapsed state:

```
dropZone (developed) : tabindex "-1", cursor "crosshair",
                       aria-label "Image preview area, tap to sample colors"
```

**Cure:** two predicates, because there are two facts — `hasImage`, and
`mode: "idle" | "sampling"`. Sampling becomes an explicit named mode (D2-11); with the
mode off, the stage is click-to-replace and says so.

### D2-11 · BLOCKER — the sampler is pointer-only, and the constitution names this exact obligation

`VISUAL-CONSTITUTION.md:198` — "**Eyedropper and sampler have keyboard/numeric
alternatives.**" `VISUAL-CONSTITUTION.md:126` even specifies the keyboard law for this
control ("image sampler coordinates … named x/y controls own Home=min and End=max;
reticle, loupe and numeric value remain one model").

Shipped, the eyedropper's only entry is a native click on the drop-zone root:

```html
<!-- ExtractWorkbench.vue:25 -->
@click="session.previewDataUrl.value && (eyedropperActive = true)"
```

and the moment a preview exists that root leaves the tab order and its keyboard handler is
gated off:

```html
<!-- ImageDropZone.vue:19, 22 -->
:tabindex="disableClick ? -1 : 0"
@keydown.enter.space.prevent="!disableClick && openFilePicker()"
```

Measured live in the developed state: `tabIndex: -1`, `role="button"`,
`aria-label="Image preview area, tap to sample colors"`. The element **announces itself as
an operable button, instructs the user to tap it, and is unreachable and inert from the
keyboard.** `PROPORTION-AUDIT.md:70` (card law 5) and `VISUAL-CONSTITUTION.md:83` both
forbid this shape.

*(Pass-1 D-11. Independently re-measured from a cold session; CONFIRMED.)*

**Cure:** the sampler becomes a named control in the action region — a `DockControl`
toggle "Sample colors" beside Upload/Camera — that switches the stage into sampling mode.
The stage stays tabbable in every mode; the sampler exposes the two named numeric x/y axes
§5.2 already specifies.

### D2-12 · MINOR — the eyedropper overlay behaves as a modal but declares nothing (NEW)

`ExtractWorkbench.vue:173–180` mounts `ImageEyedropper` with `v-if` as a **sibling inside
the workbench root**; the overlay itself is `absolute inset-0 z-popover`
(`ImageEyedropper.vue:8`). It therefore blankets the entire workbench — stage, controls
**and** result plate — while being neither a dialog nor inert-adjacent:

- no `role="dialog"`, no `aria-modal`;
- no focus trap: the k slider, kC slider, Upload, Camera and Reset sit underneath it,
  fully covered and **still in the tab order**;
- no focus restoration on close — `@close="eyedropperActive = false"` and nothing more,
  which is unfixable anyway because the opener has `tabindex="-1"` (D2-11).

`VISUAL-CONSTITUTION.md:115` is explicit: "Dialog/Drawer/Popover open and close | producer
initial-focus rule on open; **exact connected opener on close**, otherwise the nearest
surviving owning action".

**Reproduction:** HYPOTHESIS for the tab-order arm (the browser session was taken by a
concurrent lock before I could Tab through it). The structural facts — `v-if` sibling,
`absolute inset-0`, no `inert`, no `role` — are source-confirmed.

**Cure:** if it is modal, declare modality and trap focus; if it is a mode of the stage —
which it is — it occupies only the stage and leaves the controls live and uncovered.

### D2-13 · INFO — five of this component's states have never been captured, by construction

`../../visual/shots/` contains `forced-colors-desktop`, `reduced-motion-desktop`,
`rtl-desktop`, `rtl-mobile`, `zoom-200-desktop`, `keyboard-focus-desktop` — each holding
exactly five PNGs:

```
adminusers.png  blob.png  browse.png  gradient.png  picker.png
```

`#/extract` is in none of them; the route list in `../../visual/states.mjs` never included
it. The mega-tranche therefore holds **zero** tracked evidence for this component under
forced colors, reduced motion, RTL, 200% zoom or keyboard focus. Pass 1 opened this gap and
filled parts of it with its own probes; it remains a hole in the tracked matrix, and any
"no defect found" claim for those five states is unsupported.

---

## 5. Motion

The three-family register (`demo/styles/animations.css:55–150`) is real, tokenized, and
carries a global `prefers-reduced-motion: reduce` guard at `:184`. This component keys
`vj-enter` (camera viewfinder) and `vj-morph` (result plate) — both legal family names,
no fourth name. Credit where due: **motion is the healthiest register in this component.**
Two defects remain.

### D2-14 · MINOR — the morph has no height geometry, so the one thing it needs to morph, jumps (NEW)

`vj-morph` supports a height morph through `--vj-morph-collapse` / `--vj-morph-expanded`
(`animations.css:70–73, 122–135`). Repo-wide, exactly one site sets them:

```
$ grep -rn "vj-morph-collapse\|vj-morph-expanded" demo/
demo/styles/animations.css:72,122,131,135
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:361,362
$ grep -rn "vj-morph-" demo/workbenches/
(no output)
```

`ExtractWorkbench.vue:102` runs `<Transition name="vj-morph" mode="out-in">` over three
keys of **unequal intrinsic height** — `shadow` (measured 153 px + 24.5 caption),
`imminent` (the same bones, no caption), `extracted` (label row 66.7 px + card 211.1 px,
measured at a 999 px column; taller at the shipped 463 px column). With no
`--vj-morph-collapse/-expanded` set, the `max-height` arm resolves to `none`, so opacity
and transform animate while the height **snaps**; `mode="out-in"` guarantees the snap is a
two-phase collapse-then-grow rather than a crossfade.

`VISUAL-CONSTITUTION.md:141` — "A scene swap preserves the specimen and changes the
surrounding instrument. **No full-slab remount hole**, rAF-delayed blank, or dock
collapse."

Related: pass-1 D-14 flags `max-height` as a layout-forcing property. Both are true and
they point the same way — the height should not be animated here at all, because the swap
should not be a swap.

**Cure:** with D2-01 applied there are only **two** states in this seat (absent → present)
and the absent one has zero height; a single `vj-morph` on the card, with the plate's
height content-driven, removes the hole. A re-quantize of an already-developed plate should
**not** re-enter the loading key — the plate stays and is marked in-flight — which also
removes the 300 ms debounce cycle (`useExtractSession.ts:159–162`) from every k and kC
drag.

### D2-15 · INFO — the ghost's animation budget is spent on nothing

`ShadowPalette.vue:58–79` gives every segment, both meta blocks and every swatch its own
`animate-pulse` with a staggered inline `animation-delay` — at k=5 that is 5 + 2 + 5 =
**12 perpetually animating elements** depicting a palette that does not exist. Measured
live: `.shadow-seg` → `animation-name: pulse`, `animation-duration: 2s`. Pass-1 D-15
counted 34 perpetual animations on the idle empty page. The animation is correctly
tokenized and correctly PRM-guarded; it is simply spent on a surface that should not exist
(D2-01). Recorded so the cure is not mistaken for a motion deletion — owner edict 6
("animations are never deleted, only moved or tokenized") is satisfied by removing the
*host*, not the register.

---

## 6. The design-system boundary

### D2-16 · MAJOR — the camera is implemented twice, and the shipping copy is the hand-rolled one (NEW)

`useImageQuantize.ts` already exports a complete camera capability:

```ts
async function quantizeFromCamera(k, chromaWeight): Promise<{ palette; stop }> {   // :115
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", … } });
    …  // video → canvas → runQuantize → returns a `stop()` that kills the tracks
}
async function quantizeFromCanvas(canvas, k, chromaWeight) { … }                   // :110
```

Neither is used anywhere:

```
$ grep -rn "quantizeFromCamera" --include="*.ts" --include="*.vue" demo/ test/ e2e/
demo/workbenches/extract/composables/useImageQuantize.ts:4      (doc comment)
demo/workbenches/extract/composables/useImageQuantize.ts:115    (definition)
demo/workbenches/extract/composables/useImageQuantize.ts:159    (export)
$ grep -rn "getUserMedia" --include="*.ts" --include="*.vue" demo/
demo/workbenches/extract/ExtractWorkbench.vue:242
demo/workbenches/extract/composables/useImageQuantize.ts:116
```

So the view hand-rolls `getUserMedia`, a `<video>`, a `<canvas>`, a `toBlob`, a `File` and
a stream teardown (`ExtractWorkbench.vue:239–281`) beside a composable that already does
all of it and returns the very `stop()` handle whose absence causes D2-09. Two device
paths, one dead — owner edict 2 (no dual paths) and edict 3 (KISS) — and the imperative
device code sits in the presentational layer, which is exactly why its state machine
(D2-08) was never designed and why its viewfinder disagrees with its capture (D2-23).

The shipping path is also the more expensive one: `captureFrame` encodes the frame to
**PNG** (`canvas.toBlob(…, "image/png")`, `:274–277`), wraps it in a `File`, hands it to
`onFile`, which `FileReader`s it to a **base64 data URL** (`useExtractSession.ts:166`),
which `useImageQuantize` then `createImageBitmap`s back to pixels (`:19–25`). A canvas is
encoded, base64'd and re-decoded to reach a function that accepts a canvas.

**Cure:** delete `startCamera` / `stopCamera` / `captureFrame` from the view; the session
owns a `camera` sub-state built on `quantizeFromCamera`, and `quantizeFromCanvas` takes
the captured frame directly.

### D2-17 · MAJOR — the result plate is an operable ornament, and the workbench feeds it a no-op to make it one

`PaletteCard.vue:19, 22, 26`:

```
'group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer',
role="article"
@click="$emit('click')"
```

`cursor-pointer` is unconditional. `ExtractWorkbench.vue:154` supplies:

```html
@click="() => {}"
```

So the developed result renders with a pointer cursor across its whole surface, announces
`role="article"`, and does **nothing** when clicked. `VISUAL-CONSTITUTION.md:102` names
this exact anti-pattern: "A palette card is a bounded entity article, **not a clickable
`role=article`**…". The same clause continues: "The card body owns **no expand, inline
rename**, action menu, transient result or hover-only swatch-action path" — and
`ExtractWorkbench.vue:151` passes `editable-name`, mounting inline rename in the card body.

*(Pass-1 D-17 reached "operable ornament" independently; pass 2 adds the `() => {}`
coordinate and the `editable-name` clause.)*

**Cure:** the extract result is a **specimen**, not a library entity — it should not be
`PaletteCard` at all. Naming belongs to the Save commit step, where a name has a
consequence; the plate carries swatches, the dominance line and the action set.
Producer-side, `PaletteCard`'s `cursor-pointer` must be conditional on a real click
consumer.

### D2-18 · MINOR — `.plate-ink` is copy-pasted into five scoped style blocks

```
$ grep -rn "plate-ink {" demo/ --include="*.vue"
demo/workbenches/extract/ExtractWorkbench.vue:290
demo/workbenches/extract/ExtractControls.vue:148
demo/workbenches/extract/ImageDropZone.vue:109
demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
```

The same single declaration — `color: var(--ink-muted, var(--muted-foreground))` — five
times, each with its own three-to-six-line justification comment. Owner edict 5 (style at
the root, never per-instance) and edict 3 (KISS) point one way: this is a **token**, and a
token belongs once in `demo/styles/`. Five copies means the next certified-ink change has
five landing sites and four chances to drift. *(Pass-1 D-20; confirmed by independent
grep.)*

### D2-19 · MAJOR — the mandated axis composition is not adopted; the axes have no label and no unit

`VISUAL-CONSTITUTION.md:104` is binding: "The domain-neutral axis composition sits over BI
`Slider`: **label, unit, reserved live value, optional numeric entry**, focus/target
behavior, and a color-bearing or neutral track chosen by semantics. Picker, Generate count,
**Extract**, Gradient, Atmosphere and Blob adopt that one composition; feature waves own
their domain arrangement, **not new slider mechanics**."

Shipped (`ExtractControls.vue:14–35, 65–79`):

- the k axis has **no label and no unit** — the only visible text is the numeral `5`; the
  word "colors" exists solely inside `aria-label="Number of colors"`;
- the kC axis's visible label is the string `kC`, with its meaning in a `title` tooltip;
- new slider mechanics: an absolutely-positioned rail `div` painted behind the producer
  Slider with `--slider-track-bg: transparent` and an inline `boxShadow` ring
  (`:19–23, 32`), plus a second per-instance `--slider-track-bg: trackInk` on the kC
  slider (`:75`) — per-instance overrides of a producer root, against owner edict 5.

Measured thumbs, from `../../visual/REPORT.json` (`/#/extract`, all four matrices) and
re-confirmed live:

```
{ "w": 12, "h": 24, "tag": "span", "label": "Number of colors" }
{ "w": 12, "h": 24, "tag": "span", "label": "Chroma weight" }
live: role="slider" thumbs → 13 × 24
```

Below the 24 px floor on the inline axis in every matrix. *(Pass-1 D-10; confirmed.)*

**Cure:** adopt the one composition — label + unit + reserved tabular value + numeric
entry — and push the color-bearing track into the producer `Slider` as a variant, so no
consumer paints a rail behind a transparent track.

### D2-20 · MAJOR — the three primary actions are named by tooltip only

`../../visual/REPORT.json`, `/#/extract`, all four matrices: `"namelessButtons": 3` — the
highest count of any non-Blob route in the audit (Browse 0, Mix 1, Picker 1). My own
tab-order probe names them:

```
{tag:"button", ti:null, label:"", title:"Upload image"}
{tag:"button", ti:null, label:"", title:"Open camera"}
{tag:"button", ti:null, label:"", title:"Reset"}
```

`title` does supply a last-resort accessible name, so this is not an AT blackout — but it
is invisible to sighted users until hover, unavailable on touch, and it is the *only*
naming for the workbench's three verbs (a fourth appears in the camera state,
`ExtractWorkbench.vue:52`). `PROPORTION-AUDIT.md:51` PR-07: "**Hover-only/unlabeled
controls** and invisible drag state → ADD-AFFORDANCE / REMOVE … every surviving
action/drag seat has a name/state." *(Pass-1 D-28 recorded these as INFO; I rate them
MAJOR because they are 3 of the component's 3 actions, not an incidental control.)*

### D2-21 · MINOR — the `split` layout has no consumer, and its ratio contradicts the binding composition anyway

```
$ grep -rn "ExtractWorkbench" --include="*.vue" --include="*.ts" demo/
demo/workbenches/extract/ExtractPane.vue:11,25           → layout="column"
demo/workbenches/extract/composables/useExtractSession.ts:4,5 (comment)
demo/shell/usePaneRouter.ts:72,85                        → ExtractPane
$ grep -rn 'layout="split"' demo/
(no output)
```

The only consumer passes `layout="column"`. Dead therefore: the grid branch (`:4–9`), the
`sm:min-h-[280px]` arm (`:13`), the split drop-zone sizing (`:18–20`), the
`useBreakpoint("(min-width: 640px)")` subscription and `isWide` (`:226`), and the
`PaletteCard` `aside` layout (`:148`). Owner edict 2 (no dual paths), edict 3 (KISS).

Pass-2 addition: even if it were reachable, `grid gap-4 sm:grid-cols-2` is a **50/50**
split, while the binding composition (`OPTICAL-BENCH-COMPOSITIONS.md:42`) requires
`golden` — source/sampler **61.8033989%**, result controls **38.1966011%**. The dead code
is also wrong code. *(Pass-1 D-19 found the deadness; the ratio contradiction is new.)*

### D2-22 · MINOR — mixed template-ref idiom in adjacent lines

```ts
const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);   // :222
const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");              // :223
```

Owner edict 7 names `useTemplateRef` as the Vue 3.5 idiom. Two consecutive lines, two
idioms. *(Pass-1 D-27; confirmed.)* The file is otherwise clean on edict 8 —
`import type { SpaceId }` at `:189` is correctly type-only, and no other type import
exists.

---

## 7. Proportion and seat law — judgment

| Law | Locus | Verdict |
|---|---|---|
| `OPTICAL-BENCH-COMPOSITIONS.md:42` — golden 61.8/38.2, absent result collapses | composition | **FAIL** — no chassis, no ratio, absent result expands (D2-01, D2-21) |
| `OPTICAL-BENCH-COMPOSITIONS.md:76` — boundaries `[]`, reserve `none` | ghost edge + caster | **FAIL** (D2-02) |
| `VISUAL-CONSTITUTION.md:198` — undeveloped stays contextual | the ghost | **FAIL** (D2-01) |
| `VISUAL-CONSTITUTION.md:198` — sampler has a keyboard alternative | eyedropper | **FAIL** (D2-11) |
| `VISUAL-CONSTITUTION.md:68–78` — closed type matrix | dominance line | **FAIL** twice (D2-03) |
| `VISUAL-CONSTITUTION.md:78` — tabular figures + reserved width | dominance number | **FAIL** (D2-03) |
| `VISUAL-CONSTITUTION.md:83` — failed state never color-only | error line | **FAIL** (D2-06) |
| `VISUAL-CONSTITUTION.md:102` — palette card is not a clickable `role=article` | result plate | **FAIL** (D2-17) |
| `VISUAL-CONSTITUTION.md:104` — one axis composition, no new slider mechanics | k / kC | **FAIL** (D2-19) |
| `VISUAL-CONSTITUTION.md:115` — opener focus restored on overlay close | eyedropper | **FAIL** (D2-12) |
| `VISUAL-CONSTITUTION.md:141` — no full-slab remount hole | result swap | **FAIL** (D2-14) |
| `VISUAL-CONSTITUTION.md:144` — reduced motion resolves to final geometry | global guard | **PASS** (`animations.css:184`) |
| `PROPORTION-AUDIT.md:34` law 8 — one protagonist, no equal-size fixture | ghost vs stage | **FAIL**, 97.0% (D2-01) |
| `PROPORTION-AUDIT.md:70` law 5 — no operable ornament without a name | drop zone, result card | **FAIL** (D2-11, D2-17) |
| `PROPORTION-AUDIT.md:72` law 7 — glyph / target / reservation are separate | slider thumbs 12×24 | **FAIL** (D2-19) |
| `PROPORTION-AUDIT.md:73` law 8 — rendered relation beats token intent | — | applied throughout |
| `PALETTE-CONTRACT.md` | no Extract-specific clause (`grep -i extract` → 0 hits) | n/a |

Owner edicts: **1** (no god modules) — pass; the file is 294 lines with real
decomposition. **2** (no legacy/dual paths) — FAIL (D2-16, D2-21, D2-10). **3** (KISS) —
FAIL (D2-16). **4** (glass-ui is the design system) — FAIL (D2-19 hand-rolled rail; D2-16
device code in the view). **5** (root-level styling) — FAIL (D2-18, D2-19). **6**
(animations never deleted) — pass, and the cure preserves the register (D2-15). **7**
(Vue 3.5 idioms) — FAIL (D2-22). **8** (`verbatimModuleSyntax`) — pass.

---

## 8. What is genuinely sound — the negative proof

Named so this report is not read as undifferentiated condemnation:

- **The three-family motion register is honoured.** Both transitions key legal family
  names (`vj-enter`, `vj-morph`); no fourth name; the global PRM guard at
  `animations.css:184` neutralises all three. Verified by grep, not assumed.
- **The dark treatment is correct.** Measured ghost-vs-plate ratios: light 1.12 / 1.15,
  dark 1.15 / 1.50 — the `--skeleton-ink` recipe is scheme-true in both directions, and
  the dark arm is stronger, not weaker. The E1-R2 remediation did what its comment claims
  (D2-05).
- **No layout is broken in the four Safari matrices.** `REPORT.json` `/#/extract`:
  `overflowX: 0`, `bleeding: []`, `pageErrors: []`, `consoleErrors: []`, `main: 1`,
  `imgNoAlt: 0` — in all four. Nothing here is a rendering failure; everything here is a
  design decision.
- **The session boundary is clean.** `useExtractSession` derives dominance from the
  returned palette rather than re-quantizing (`useExtractSession.ts:114–149`), the worker
  transfers an `ArrayBuffer`, and the debounce is torn down on unmount. The data
  architecture is better than the interface built on top of it.
- **`verbatimModuleSyntax` is honoured**, props use the 3.5 reactive-destructure idiom,
  and every prop/emit carries a doc comment (`:204–216`).

---

## 9. Ranked disposition

| # | ID | Severity | Defect | Cure family |
|---|---|---|---|---|
| 1 | D2-01 | BLOCKER | undeveloped placeholder = 97.0% of the stage; "absent result collapses context" inverted | delete the ghost seat; empty region has zero height |
| 2 | D2-11 | BLOCKER | sampler is pointer-only; `role=button` + `tabindex=-1` + dead keydown | named sampling-mode control + numeric x/y axes |
| 3 | D2-03 | MAJOR | value at the H1 rung (41.888 = 41.888), off-matrix `text-body`, no tabular reserve | mono value + small label, reserved width |
| 4 | D2-04 | MAJOR | 56-char unrounded float specimen, ~36% visible at the shipped column | round at the presentation boundary; full precision on Copy |
| 5 | D2-08 | MAJOR | camera has no cancel; `disabled` reaches 1 of 6 controls | camera as a stage mode with Cancel/Capture + Escape |
| 6 | D2-16 | MAJOR | camera implemented twice; the used copy PNG-round-trips a canvas | consume `quantizeFromCamera` / `quantizeFromCanvas` |
| 7 | D2-23 | MAJOR | viewfinder `object-cover` ≠ full-frame capture (~43% unseen) | one geometry for preview and capture |
| 8 | D2-06 | MAJOR | failure is color-only, unannounced, undismissable, raw exception text | one status region: status / alert+icon+copy+Retry |
| 9 | D2-17 | MAJOR | result plate is an operable ornament fed a `() => {}` | result is a specimen, not a library entity Card |
| 10 | D2-19 | MAJOR | mandated axis composition not adopted; 12×24 thumbs; per-instance track overrides | adopt the one axis composition; producer variant |
| 11 | D2-10 | MAJOR | one predicate drives two facts → 2 authored states unreachable, click-to-replace gone | split `hasImage` from `mode` |
| 12 | D2-20 | MAJOR | 3 of 3 actions named by tooltip only | visible or `aria-label` names |
| 13 | D2-07 | MAJOR | error + stale result render together | result and failure are one union |
| 14 | D2-09 | MAJOR | second Camera press leaks a MediaStream | subsumed by D2-16 |
| 15 | D2-02 | MINOR | placeholder carries a boundary + 3-layer caster against `[]` / `none` | subsumed by D2-01 |
| 16 | D2-14 | MINOR | `vj-morph` over three unequal heights, no height geometry, `out-in` | two states, content-driven height |
| 17 | D2-21 | MINOR | `split` layout dead, and 50/50 where the canon says golden | delete; adopt P122 if the split returns |
| 18 | D2-18 | MINOR | `.plate-ink` declared 5× | one root utility/token |
| 19 | D2-12 | MINOR | overlay is modal in behaviour, undeclared in semantics | declare modality or shrink to the stage |
| 20 | D2-22 | MINOR | mixed `ref` / `useTemplateRef` in adjacent lines | `useTemplateRef` |
| 21 | D2-15 | INFO | 12 perpetual animations depicting nothing | falls out of D2-01 |
| 22 | D2-13 | INFO | 5 state matrices have never captured this route | add `#/extract` to `states.mjs` |
| 23 | D2-05 | INFO | dark treatment is correct (negative result) | — |

Pass-1 rows not re-litigated here and still standing: D-1 (uploaded-image crop), D-2
(loading state unreachable), D-3 (card-lock), D-5 (mobile order), D-9 (RTL), D-16 (three
renderings of one palette), D-18 (two accent families), D-23/24/25.

---

## 10. The gestalt

Every defect above is a symptom of two design premises, and both are wrong.

**Premise 1: the absence of a result is a thing to be depicted.** From it follow the ghost
that rivals the stage (D2-01), the caption that apologises for it (D2-01), the boundary and
caster that frame it (D2-02), the twelve animations that breathe it (D2-15), the three-key
morph that swaps it (D2-14), and the second skeleton species built to hand off to it
(`PaletteCardSkeleton`, whose bones are a near-duplicate of `ShadowPalette`'s). The canon's
instruction — "absent result collapses context" — is not a styling preference; it is the
antidote to exactly this cascade. Pass 1 reached the same conclusion from the empty-content
ceiling; two instruments, one diagnosis.

**Premise 2: the specimen is a button.** The image becomes a `role="button"` with
`tabindex="-1"` (D2-11); the result becomes a `cursor-pointer` `role="article"` wired to a
no-op (D2-17); and the actual verbs — upload, camera, reset, sample — are icon glyphs named
by tooltip (D2-20) or have no control at all (sampling). The canon's rule is the antidote
again (`PROPORTION-AUDIT.md:74`, card law 9): "A renderer specimen is not an unlabeled
button." Extract has two specimens and has made buttons of both.

Cure the two premises and roughly nineteen of the twenty-three rows above close as
consequences rather than as patches.
