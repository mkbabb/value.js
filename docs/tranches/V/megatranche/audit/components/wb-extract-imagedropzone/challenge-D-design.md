# CHALLENGE-D — `demo/workbenches/extract/ImageDropZone.vue` — the design is defective

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was
spawned with an explicit declaration for. Declared, not inherited.

## Pass note

This is **pass 2**. A pass-1 report by an earlier Opus 5 D-seat existed at this path; it is
preserved verbatim at `challenge-D-design.pass1-2026-07-28-prior.md` and is **not** superseded — it
carries four measurements this pass did not repeat (rendered contrast ratios, type-family/size
rungs, the 200%-zoom `dvh` collapse, and the `.plate-ink` fallback-masking argument). This pass
re-measured the component **independently**, with different specimens and a different harness, in
order to (a) test pass-1's claims adversarially rather than inherit them, and (b) cover the states
pass-1 did not enumerate.

**Result of the reconciliation:** pass-1's headline finding is **confirmed and strengthened**. One
of its sub-claims — the *blank* preview — **did not reproduce** here and is downgraded to
specimen-dependent (§6). Four findings are **new** to this pass (D-9, D-11, D-8, and the
palette-contradiction arm of D-1).

---

## 0. Verdict

**DEFECTIVE.** Two BLOCKERs, nine MAJORs, six MINORs, one labelled hypothesis.

The component's own opening comment is the shortest statement of its failure:

> `ImageDropZone.vue:3` — *"the specimen never lies — no veil over the field."*

The specimen **does** lie, and it lies in the one way that matters most for a color instrument:
**it shows the user colors that are not in the palette, and the palette shows colors that are not on
the screen.** A 300×1400 portrait renders at **458×2137px inside a 462×320px box with
`overflow:hidden`** — 14.8% visible — while the card directly beneath it reports five extracted
swatches, **three of which are nowhere in the visible frame**, over a headline reading *"36% of the
image."*

The generative cause is not one bad utility. It is that **one `<div>` is asked to be four things at
once**: a button, a drop target, a preview stage, and the eyedropper trigger. Every unhandled state
in §8 falls out of that single overload.

---

## 1. Evidence apparatus

All measurements are from the live dev server (`http://localhost:9000`, HTTP 200, HEAD `c654824e`)
driven read-only by the repo's own Playwright. Probes and raw output are committed under
`pass2-probe-D/`:

| file | what it produced |
|---|---|
| `pass2-probe-D/probe.mjs` → `probe.json` | geometry / computed style / RTL / preview fit — WebKit desktop 1440×900 + iPhone 14 Pro |
| `pass2-probe-D/probe2.mjs` → `probe2.json` | drag-state transitions, silent-reject, 40-step Tab walk, forced-colors (Chromium) |
| `pass2-probe-D/probe3.mjs` | forced-colors `scale` vs `border-color` delta |
| `pass2-probe-D/shots/*.png` | rendered frames captured by the probes |

Deliberately **different specimens from pass 1**, so agreement is corroboration rather than echo.
Synthesised in-probe by a dependency-free PNG encoder:

- **TALL** — 300×1400, eight equal horizontal bands (red · orange · yellow · green · blue · indigo ·
  violet · black). Banded so a crop is legible to the eye, not only to the ruler.
- **WIDE** — 1600×200, blue→magenta ramp.
- **SQ** — 600×600.

Pre-existing evidence read: `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` (60 Safari
captures) and `shots/safari-{desktop,mobile}-{light,dark}/extract.png`.

---

## 2. FAM-STAGE — the zone is not a stage, and the specimen lies

### D-1 · BLOCKER · the preview crops instead of containing, and the instrument contradicts itself on screen

`:41` — `class="w-full h-full object-contain rounded-xl"`.

Measured (`pass2-probe-D/probe.json`):

| matrix | natural | rendered `<img>` | zone box | visible |
|---|---|---|---|---|
| WebKit 1440×900 light | 300 × 1400 | **458 × 2137.3** at `y = −708` | 462 × 320, `overflow: hidden` | **14.8 %** |
| iPhone 14 Pro dark | 300 × 1400 | **323 × 1507.3** at `y = −439.7` | 327 × 264, `overflow: hidden` | **17.5 %** |

```json
"img": { "rect": { "x": 226, "y": -708, "w": 458, "h": 2137.3 },
         "natural": { "w": 300, "h": 1400 },
         "cs": { "objectFit": "contain", "height": "2137.328125px" } }
```

**Mechanism** (independently derived; agrees with pass-1 §D-1). The `<img>`'s parent is
`flex flex-col items-center justify-center` (`:8`) with `min-height`/`max-height` but **no definite
height**. `h-full` → `height: 100%` resolves against an indefinite containing block → computes to
`auto`. The img therefore takes `width: 100%` at its intrinsic aspect ratio; its content box already
*equals* the intrinsic ratio, so `object-fit: contain` has nothing left to fit. `overflow: hidden`
clips, and `justify-content: center` centres the excess so the crop eats **both** ends.

**The new arm — the instrument contradicts itself.** This is what a banded specimen shows that a
photograph does not. `pass2-probe-D/shots/desktop-light-tall.png`: the stage displays **green over
blue** — bands 4 and 5 of 8. The palette card 40px beneath it renders **indigo, orange, yellow,
black, green**. *Three of the five extracted swatches are not present anywhere in the visible
frame*, and the dominance readout announces *"36% of the image"* for a color the user cannot see.
The pane's central claim is unfalsifiable from the frame it presents.

This also silently breaks the eyedropper contract: `ExtractWorkbench.vue:173-175` hands
`ImageEyedropper` the **full** `previewDataUrl`, so the sampler operates on an image 85% of which
the stage never displayed. **Shown ≠ sampled ≠ quantised.**

**Canon.** `VISUAL-CONSTITUTION.md §7 Extract` — *"The image is the stage."* `§4.1` — *"a token name
is not evidence."* A stage showing a 15% centre crop is not a stage.

**Cure (transposition, not patch).** The zone is a *stage*, so give the img a definite box to be
contained by rather than asking `object-fit` to fix an intrinsic-ratio element: `grid place-items-center`
on a stage with a declared `aspect-ratio`, img at `max-w-full max-h-full w-auto h-auto`. Then the
geometry is true by construction rather than by a property that cannot fire, and
`max-h-[min(320px,40dvh)]` — the viewport coupling pass-1 §D-16 measured collapsing to 180px at 200%
zoom — dies with it.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/pass2-probe-D/probe.mjs`

### D-2 · MAJOR · the wide specimen is orphaned inside a 180px floor with no boundary

Measured (`probe.json` `C_wide_desktop`): natural 1600×200 → rendered **458 × 57.3** inside a
**462 × 180** zone. **122.7px (68%) of the zone is empty plate.** At rest the border for the
populated state is `border-transparent` (`:14`), so that empty band has *no* boundary at all — an
unexplained void with a floating `SAMPLE` chip in it (`pass2-probe-D/shots/desktop-light-wide.png`).

`PROPORTION-AUDIT.md §5.3`: *"Renderer, icon or touch footprints may reserve collision space only on
the axis where collision exists."* A 180px block-axis floor around a 57px specimen reserves on an
axis with no collision. `§5.8`: *"Real rendered relation wins over token intent."*

Together with D-1 this bounds the component's competence precisely: it is **wrong for tall images
(crop), wrong for wide images (void), and right only for near-square ones.**

### D-3 · MINOR · the sizing contract is split across two files; the component's own floor never fires; one caller branch is dead

`ImageDropZone.vue:9` declares `min-h-[140px]`. `ExtractWorkbench.vue:20` passes
`min-h-[180px] max-h-[min(320px,40dvh)]`. Measured computed `minHeight: "180px"` — the component's
own default **never wins** in the only consumer that exists. Two owners for one geometry; the inner
one inert, and nobody decided that (there is no `cn()`/`twMerge`, so the winner is stylesheet
emission order, not authorship).

`ExtractWorkbench.vue:19`'s `layout === 'split'` arm passes
`flex-1 min-h-0 sm:max-h-[min(400px,50dvh)]` — and **`layout="split"` has no consumer**.
`grep -rn "ExtractWorkbench" demo/` returns exactly one mount (`ExtractPane.vue:11`), passing
`layout="column"`. Dead configuration for a dialog shell that no longer exists. Owner edict 2 (no
dual paths), edict 3 (KISS). *Concurs with pass-1 §D-9.*

### D-4 · MINOR · `rounded-xl` on the img vs `rounded-panel` on the zone

Measured: zone `border-radius: 12px`, `border-width: 2px`, `overflow: hidden`; img
`border-radius: 12px`. The zone's *inner* clip curve is `12 − 2 = 10px`; the img's own curve is
`12px` — a 2px overshoot at each corner that `overflow:hidden` silently eats.

Pass-1 §"Negative results" correctly records that this is **not** a visible rendering defect today
(both tokens compute to 12px, `corner-shape: round`). I concur, and sharpen the design charge: it is
therefore **dead ink** *and* a raw scale rung standing where a semantic role token belongs, which
desyncs the moment `--radius-panel` moves. Owner edict 5. Under D-1's cure the img inherits the
stage's clip and needs no radius at all.

---

## 3. FAM-SEAT — one node, four jobs

This is the gestalt defect. `:6-26` is simultaneously:

1. a **button** (`role="button"`, `tabindex`, `@keydown.enter.space`, `@click → openFilePicker`),
2. a **drop target** (`@dragover`/`@dragleave`/`@drop`),
3. a **preview stage** (the `<img>` and its clip),
4. the **eyedropper trigger** — via a click listener the *parent* attaches
   (`ExtractWorkbench.vue:25`).

Job 4 is invisible from inside this file. Everything below is a consequence of jobs colliding on one
node.

### D-5 · BLOCKER · the sample affordance is keyboard-unreachable, and its label instructs an action AT cannot perform

`:19` — `:tabindex="disableClick ? -1 : 0"`; `ExtractWorkbench.vue:23` sets
`:disable-click="!!session.previewDataUrl.value"`. The instant an image loads the node becomes
`tabindex="-1"` — while `ExtractWorkbench.vue:25` keeps a **pointer** `@click` on it that opens the
eyedropper.

Measured (`probe.json`): `"tabindex": "-1"` in both `B_tall_desktop` and `D_tall_mobile`.

Measured (`probe2.json`, 40 `Tab` presses from `<body>` with a preview loaded):

```json
"tabWalk": { "steps": 40, "reachedZone": false,
             "trail": ["span:Number of colors", "span:Chroma weight", "input:",
                       "body:→ExtractToolsExtractPalettes Login", ... ×10 cycles] }
```

The focus ring cycles the whole page ten times and **never lands on the zone**. *(Independent
confirmation of pass-1's 45-press sweep, different harness, same result.)*

`grep -rn "eyedropperActive" demo/` returns exactly one setter — `ExtractWorkbench.vue:25`. No
keyboard path, no menu item, no toolbar button. **The eyedropper is pointer-only.**

And `:20` labels this unreachable node *"Image preview area, **tap** to sample colors"* — AT
announces an operable control and an instruction its user cannot follow. WCAG 2.1.1.

`VISUAL-CONSTITUTION.md §5` — *"every spatial action has a keyboard/numeric equivalent."*
`§7 Extract` — *"Eyedropper and sampler have keyboard/numeric alternatives."* `PROPORTION-AUDIT.md`
§5.9 — *"A renderer specimen is not an unlabeled button… One action never occupies both the specimen
and the action instrument."*

### D-6 · MAJOR · no designed focus state — the browser's default ring is doing the design system's job

Measured (`probe.json` `A_focused`):

```json
{ "isActive": true, "outline": "3px auto rgb(28, 25, 23)", "outlineStyle": "auto",
  "boxShadow": "none" }
```

`outline-style: auto` is the **WebKit UA ring**; `box-shadow: none` means the demo's one certified
focus recipe is not applied. Pass-1 filed this as INFO on the grounds that the UA ring *is* visible.
**I raise it to MAJOR**, because the design-system evidence makes it an outlier rather than a
delegation:

`demo/styles/focus-ring.css:28-29,34-35` is the demo's single certified focus recipe —

```
 *   box-shadow: 0 0 0 1px var(--focus-ring-inner),
 *               0 0 0 3px var(--focus-ring-outer),
    --focus-ring-inner: rgba(0, 0, 0, 0.85);
    --focus-ring-outer: rgba(255, 255, 255, 0.92);
```

`grep -rn "focus-ring" demo/ | wc -l` → **24**. `grep -rn "focus-visible:ring" demo/ | wc -l` → **31**.
`ImageDropZone.vue` contributes **zero** to both. Two further consequences:

- **It is not `:focus-visible`.** WebKit paints `outline:auto` on plain `:focus` for tabindex hosts,
  so a *mouse click* on the empty zone draws a ring the design never intended — while the component
  itself uses `group-focus-visible:` for its corner tag (`:58`). Two focus models in one 114-line
  file.
- **It is foreign.** `pass2-probe-D/shots/desktop-light-{tall,wide}.png` show a bright blue-white
  system halo around a crimson/blush instrument. `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains
  visibly distinct from selection in both schemes, forced colors and reduced transparency."*
  Distinctness delegated to the UA is not a design.

### D-7 · MAJOR · a rejected drop is completely silent — the error state was never designed

`:94-100` — the `else` branch does not exist. Measured (`probe2.json`), dropping `notes.txt`
(`text/plain`):

```json
"beforeReject": 337,
"afterReject": { "bodyTextLen": 337, "hasPreview": false,
                 "zoneClass": "border-2 border-dashed border-primary/30 bg-primary/5",
                 "anyDestructiveText": [] }
```

Body text unchanged **to the character**. No destructive node. No live-region announcement. The zone
snaps back to rest, pixel-identical to *"you never dropped anything."*

The bitter part: the pane **has** an error register and states this very law —
`ExtractWorkbench.vue:79-85`, *"Error (error ≠ empty: an explicit destructive line)"* — but it is
bound to `session.quantizeError`, and `ImageDropZone` can only `emit("file")`. **The drop zone has
no channel to the error surface 200px below it.** `PROPORTION-AUDIT.md` PR-08 → ADD-AFFORDANCE.
*Concurs with pass-1 §D-5, different file type, same silence.*

### D-8 · MINOR · **[new]** asymmetric validation: two entry paths, two different contracts

`onDrop` (`:97`) validates `file.type.startsWith("image/")`. `onFileSelected` (`:87-92`) validates
**nothing** — `accept="image/*"` (`:30`) is a filter hint, and every OS picker offers "All Files".
The drop path silently rejects a `.txt`; the picker path forwards it to the quantizer. One
component, one job, two contracts — and the *stricter* path is the one that fails silently.

### D-9 · MAJOR · **[new]** no disabled state exists at all

`ExtractControls` is disabled while work is in flight — `ExtractWorkbench.vue:70`,
`:disabled="session.isProcessing.value || cameraActive"`. `ImageDropZone` receives **no** disabled
prop and declares no disabled styling, no `aria-disabled`, no `pointer-events` guard.

Two live consequences:

- While a quantize is in flight, a second drop is accepted immediately; `useExtractSession` debounces
  the *slider*, not the file path.
- While the camera viewfinder is open (`ExtractWorkbench.vue:34-59`, rendered directly **below** the
  drop zone in the same column), the zone above it remains fully clickable and droppable; a drop
  silently `stopCamera()`s the live stream the user was aiming.

A state the design never drew is a design defect, not an implementation gap.

### D-10 · MINOR · designed states that cannot occur

`ExtractWorkbench.vue:22-23` passes `:preview="session.previewDataUrl.value"` and
`:disable-click="!!session.previewDataUrl.value"` — **the same boolean**. There is exactly one
consumer. Therefore `preview && !disableClick` is unreachable, and these ship dead:

- `:20` `'Replace image, click or drop a new image'` — the middle `aria-label` branch;
- `:61` `'replace'` — half the corner tag's vocabulary;
- `:10` `cursor-pointer` in the populated state.

The component ships **three** aria-labels and **two** corner-tag words; one of each is structurally
unrenderable. Owner edicts 2 and 3. *Concurs with pass-1 §D-10.*

### D-11 · MINOR · **[new]** two upload affordances for one action in one pane

`defineExpose({ openFilePicker })` (`:85`) exists so `ExtractControls.vue:41-47`'s
`<DockControl title="Upload image">` can imperatively drive this component's hidden input via
`ExtractWorkbench.vue:230-232`. The pane therefore presents **two** "add an image" controls at once:
the 462×180 dashed zone and a 22px toolbar icon eight pixels below it.

`PROPORTION-AUDIT.md` PR-06 — *"Three adjacent action species or duplicated selected fills"* →
**REMOVE**, *"One action/selection owner."* `OM-15` already marked the adjacent *copy* duplication
(`audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md:100`); this is the same species one rung up —
duplicated **affordance**.

---

## 4. FAM-STATE-INK — states drawn only in color, and only for pointers

### D-12 · MAJOR · the drag-hover state cancels itself the moment the pointer crosses a child

`:23-24` puts `@dragover`/`@dragleave` on the **container**; `dragleave` bubbles from descendants,
and the container always has a descendant under the pointer — the placeholder `<div>` (`:46`) when
empty, the `<img>` (`:37`) when populated.

Measured (`probe2.json`, each step awaited across Vue's update tick):

| step | resolved class |
|---|---|
| rest | `border-2 border-dashed border-primary/30 bg-primary/5` |
| `dragover` on ZONE | `border-2 border-dashed border-primary bg-primary/10 scale-[1.01]` |
| **`dragleave` bubbling from CHILD (pointer still inside)** | **`border-2 border-dashed border-primary/30 bg-primary/5`** |
| `dragover` from CHILD | `border-2 border-dashed border-primary bg-primary/10 scale-[1.01]` |

The drop target drops its own highlight while the file is still over it. With measured
`transition-duration: 0.3s` on `transition-all` and a `scale(1.01)` in the swap, a real drag renders
as a **pulsing, breathing panel** — the one state whose entire job is to say *"release here, now"*
is the least stable thing on screen. *Confirms pass-1 §D-4 with an awaited (not synchronous)
read, closing that probe's timing question.*

### D-13 · MAJOR · in forced-colors the drag state disappears entirely

Measured (`pass2-probe-D/probe3.mjs`, Chromium `forcedColors: "active"`):

```
REST      {"scale":"none","border":"rgb(0, 0, 0)","bg":"rgba(255, 255, 255, 0.05)","rect":"462.00"}
DRAGGING  {"scale":"1.01","border":"rgb(0, 0, 0)","bg":"rgba(255, 255, 255, 0.1)", "rect":"466.62"}
```

`border-color` delta: **zero** — forced-colors collapses `border-primary/30` and `border-primary`
onto the same forced ink. Background delta: 5% → 10% white alpha over a forced Canvas —
perceptually **zero**. The sole surviving signal is `+4.62px` of width (`scale: 1.01` on 462px =
**2.31px per side, 0.5%**), at or below the threshold at which a transient state can be read.

`VISUAL-CONSTITUTION.md §4.1` fails on both clauses (*"never color-only"*; *"distinct … in forced
colors"*). *Independently reproduces pass-1 §D-8 in a separate probe.*

**Coverage gap, restated because it is load-bearing:**
`docs/tranches/V/megatranche/audit/visual/shots/forced-colors-desktop/` holds 5 routes
(`adminusers, blob, browse, gradient, picker`). **`/#/extract` is not among them.** The standing
matrix structurally could not have caught this.

**Cure.** Give `dragging` a non-color register — `border-style: dashed → solid` is free, survives
forced-colors, and reads instantly as *"the outline has closed, let go."*

### D-14 · MAJOR · the corner tag is hover-only, so it never appears on any touch device

`:58` — `opacity-0 … group-hover:opacity-100 group-focus-visible:opacity-100`.

On touch there is no `hover:` (Tailwind v4 gates it behind `@media (hover: hover)`), and once a
preview exists the group is `tabindex="-1"` (D-5) so `:focus-visible` can never fire either.

Measured (`probe.json` `D_tall_mobile`, iPhone 14 Pro, preview loaded):

```json
"cornerTag": { "text": "sample", "cs": { "opacity": "0" } }
```

Both unlock conditions are unreachable on a phone. The chip labelled `sample` — the *only* visible
hint that tapping the image opens the eyedropper — is **permanently invisible on the class of device
the label's own word ("tap", `:20`) is written for**. `PROPORTION-AUDIT.md` PR-07 → REMOVE /
ADD-AFFORDANCE. *Concurs with pass-1 §D-3.*

### D-15 · MAJOR · RTL: the corner tag is pinned to a physical edge — filed one tranche ago, still live

`:58` — `absolute bottom-1.5 right-1.5`. Physical, not logical.

Measured (`probe.json` `F_rtl`, `dir="rtl"` on `<html>`, preview loaded, hovered):

```json
"F_rtl": { "dir": "rtl", "tagText": "sample",
           "distFromZoneLeft": 373.3, "distFromZoneRight": 8 }
```

Under RTL the tag stays 8px from the **physical right** — the inline-**start** — landing at the
beginning of the reading direction, where the eye is not looking for a trailing affordance.
`VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical inline/block direction
follows the document."*

Already filed at `docs/tranches/U/audit/w-a11y/rtl-logical-property-audit.md:57`. It survived a full
relocation from `demo/@/components/custom/image-palette-extractor/` to `demo/workbenches/extract/`
unchanged. A recorded finding that outlives a file move is a design-governance defect on top of the
layout one. `end-1.5` is the whole fix. *Concurs with pass-1 §D-13.*

---

## 5. FAM-TOKEN — per-instance overrides where the root should own it

### D-16 · MINOR · two inline `:style` transition overrides — filed in tranche D, still live

`:17` — `:style="{ transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-standard)' }"`
`:59` — `:style="{ transitionDuration: 'var(--duration-fast)' }"`

Measured computed: `transitionProperty: "all"`, `transitionDuration: "0.3s"`.

Two static per-instance inline style bindings in a 114-line component, both re-declaring timing the
stylesheet already owns — `demo/styles/foundation.css:128-129` sets
`--default-transition-duration: var(--duration-fast)` and
`--default-transition-timing-function: var(--ease-standard)` as the **global** defaults. Owner edict
5. Filed at `docs/tranches/D/research/Df-styling.md:62` (*"Promote to scoped class or … Tailwind
utilities"*); unmoved two tranches on. `transition-all` is the same species one level up — the
*absence* of a decision about which properties carry meaning, on a box whose `max-height` is
`dvh`-coupled (pass-1 §D-11 develops this arm).

*Not a finding:* `prefers-reduced-motion` **is** honoured, by the global guard at
`demo/styles/animations.css:184-193` whose `transition-duration: 0.01ms !important` outranks the
non-important inline style. Correct — but carried by a blanket, not by the component.

### D-17 · MINOR · `.plate-ink` is copy-pasted verbatim into five files

`:103-111`. `grep -rln "\.plate-ink" demo/`:

```
demo/color-picker/ErrorBoundary.vue
demo/shared/ui/EmptyState.vue
demo/workbenches/extract/ExtractControls.vue
demo/workbenches/extract/ExtractWorkbench.vue
demo/workbenches/extract/ImageDropZone.vue
```

Five identical definitions of one certified de-emphasis rung, each with its own copy of the same
justification comment, in a repo that has `demo/styles/utils.css` for exactly this. Owner edict 5,
and edict 1 (a rule duplicated five ways has no owner). Pass-1 §D-14 additionally shows the
declaration is a **masking fallback** (`var(--ink-muted, var(--muted-foreground))`) onto a value the
same comment documents as failing — edict 2. I concur and do not re-derive it.

---

## 6. Reconciliation with pass 1 — one claim not reproduced

Pass-1 §D-1(b) reports that at large overflow ratios the preview paints **nothing** — *"0 / 625
(0.0%)"* image-colored pixels on desktop-light and mobile-dark with a 400×1200 specimen.

**I did not reproduce this.** With a 300×1400 specimen (a *higher* overflow ratio: 6.68× the zone
height vs pass-1's 4.29×), the preview **painted correctly** in both matrices — see
`pass2-probe-D/shots/desktop-light-tall.png` (green and blue bands clearly rendered, WebKit desktop
light) and `shots/mobile-dark-tall.png` (iPhone 14 Pro, dark). My probes ran WebKit for the layout
matrices; pass-1 ran Chromium.

I record this **without refuting pass-1** — a compositor drop-out that is engine- and
ratio-dependent is exactly the kind of defect that appears under one specimen and not another, and
pass-1's pixel counts are pasted probe output, not estimation. The correct disposition is:

> **The blank is real but conditional.** The *crop* (D-1) is unconditional, reproduces in both
> engines and both viewport classes, and is the finding to act on. The blank is a downstream
> symptom of the same indefinite-box mechanism and is discharged by the same cure. It should not be
> quoted as a universal without naming the engine and the ratio.

Two further pass-1 findings I did not re-measure and therefore neither confirm nor contest, but flag
for the parent as still-standing: **§D-6** (rendered contrast: dashed border 1.21:1 light / 1.26:1
dark against a 3:1 floor; prompt ink 4.32:1 / 4.17:1 against 4.5:1) and **§D-7** (help copy set in
Fira Code at 16.4px — the values/code family, one rung *above* the pane's own description). Both are
serious, both are measured, both belong in the parent's register.

---

## 7. Design-system boundary — the summary judgement

The component reaches past glass-ui and past the demo's own certified layer, with the primitive
sitting unused nearby in every case:

| hand-rolled here | what already exists | evidence |
|---|---|---|
| `<div role="button" tabindex @keydown.enter.space>` | native `<button type="button">`, ruled repeatedly | `VISUAL-CONSTITUTION.md §3.1, §5`; `PROPORTION-AUDIT.md §5.9, §5.12` |
| UA `outline: auto` focus | `--focus-ring-inner/-outer` | `demo/styles/focus-ring.css:28-35`; 24 demo consumers |
| inline `:style` transition timing ×2 | `--default-transition-duration/-timing-function` | `demo/styles/foundation.css:128-129` |
| `.plate-ink` scoped rule ×5 | one token in `demo/styles/utils.css` | 5-file grep, §D-17 |
| `rounded-sm bg-background/85 …` corner chip | glass-ui `./chip` / `./badge` exports | pass-1 §D-12 (edict 4) |

The hidden `<input type="file">` at `:27-33` is the last survivor of the S-era hand-rolled-input
census (`docs/tranches/S/audit/lanes/glassui-consume-map.md:208`) — correctly exempted then as
*"hidden `type="file"`, not a text-input site"* (`docs/tranches/S/audit/pi/w5a-after/DELTA.md:50`).
That exemption still holds; noted so the next reader does not re-litigate it.

---

## 8. State-coverage ledger

| state | status | evidence |
|---|---|---|
| empty | handled | `:46-51`; `audit/visual/shots/safari-*/extract.png` |
| populated — near-square | handled | — |
| populated — portrait | **BROKEN** — 14.8% / 17.5% visible | D-1 |
| populated — landscape | **BROKEN** — 68% empty, no boundary | D-2 |
| loading / decoding | **UNHANDLED** — placeholder → img with nothing between | pass-1 §D-5 |
| error (rejected drop) | **UNHANDLED** — silent, no channel to the register | D-7 |
| error (rejected picker file) | **UNHANDLED** — not even validated | D-8 |
| disabled | **DOES NOT EXIST** | D-9 |
| focused | **UA default only** | D-6 |
| hovered | handled — pointer devices only | — |
| active / pressed | **UNHANDLED** — a `role="button"` with no `:active` utility | `:7-16` |
| selected | n/a | — |
| dragging | **BROKEN** — self-cancels; invisible in forced-colors | D-12, D-13 |
| multi-file drop | **UNHANDLED** — silently discards all but `files[0]` | `:96`; pass-1 §D-5 |
| "replace" affordance | **UNREACHABLE BY CONSTRUCTION** | D-10 |
| "sample" affordance | pointer-only; hint invisible on touch | D-5, D-14 |
| truncated / overflowing | n/a — single-line caption, `text-center px-4` | — |
| RTL | **BROKEN** — physical `right-1.5` | D-15 |
| reduced-motion | handled — by the global `!important` guard, not the component | `animations.css:184-193` |
| forced-colors | **BROKEN** for the drag state; route never captured | D-13 |
| zoom 200% | **BROKEN** — `40dvh` collapses `max-h` onto `min-h`; `/#/extract` absent from `shots/zoom-200-desktop/` | pass-1 §D-16 |

**Structural note on why none of this was caught.** All 60 captures in `audit/visual/REPORT.md` show
this component **empty** — `bodyTextLength` is identical (299 desktop / 142 mobile) across all four
`/#/extract` matrices. The component's *primary* state had never been visually audited before
pass 1. And the harness cannot see the control regardless: it is a `div[role="button"]`, so the
`smallTapTargets` probe (which filters `w < 24 || h < 24` over sized elements) and the
`namelessButtons` probe both skip it. The 6 small tap targets and 3 nameless buttons on `/#/extract`
belong to `PaletteSlugBar` (22×22 `Switch to slug` / `Generate new slug` / `Cancel`) and the
`ExtractControls` slider thumbs (12×24 / 12×44) — **not** to this component. Recorded so the parent
does not mis-attribute them.

---

## 9. Hypothesis (labelled — did not reproduce)

### H-1 · INFO · `mode="out-in"` may open a blank frame in the stage

`:36` — `<Transition name="vj-morph" mode="out-in">` with `:key="preview"` (`:38`). `out-in`
guarantees a window in which the outgoing element has left and the incoming has not entered. This is
the species already tracked as **PI-DRIFT-1** in `docs/tranches/T/audit/lanes/t-deferred-census.md:121`,
which lists `ImageDropZone` by name among ten live `out-in` sites and remains open.

**It did not reproduce.** I sampled the zone height every `requestAnimationFrame` for 1400ms across
a TALL→SQ swap (`probe2.json`): `swapMinHeight: 320`, `swapMaxHeight: 320`,
`framesWithNoContent: 0`. Both specimens pin the zone at its 320px ceiling, so the test had no
height headroom to reveal a hole — my sampling was the wrong instrument, not a negative result. A
valid reproduction needs a swap that changes the resolved height (TALL → WIDE, measured
independently at 320px and 180px). **Hypothesis, not a finding.**

---

## 10. Family grouping (for the parent's mechanism register)

| family | findings | one sentence |
|---|---|---|
| **Indefinite-box geometry** | D-1, D-2, D-3, D-4, + pass-1 §D-16 | the stage has no geometry of its own, so the content and the caller fight over it and the clip arbitrates |
| **Specimen impersonating a button** | D-5, D-6, D-9, D-10, D-11, D-14 | activation lives on the specimen instead of a named seat, so states multiply and half are unreachable |
| **Absent state design** | D-7, D-8, D-12, D-13 | drag, rejection and forced-colors were never designed — only the happy path was |
| **Rendered truth vs token name** | pass-1 §D-6, §D-7, §D-14 | ink and type certified by citing token names; measurement disagrees in every case |
| **Uncured carries** | D-15, D-16, D-17, + pass-1 §D-12 | four separate tranches (D, S, T, U) booked these exact lines; none was discharged |

---

## 11. Ranked cure — one transposition, not seventeen patches

Fourteen findings dissolve under a single architectural move, and it is the move the canon has
already ruled for every comparable surface:

> **Split the seat from the stage.**
>
> 1. The stage becomes a non-interactive `<figure>` with a resolved box — `grid place-items-center`,
>    a declared `aspect-ratio`, `<img class="max-w-full max-h-full">`, no `dvh` coupling.
>    Kills **D-1, D-2, D-3, D-4**, and pass-1 **§D-16**; discharges the conditional blank (§6).
> 2. The two actions become two named native `<button type="button">` seats in the control rack that
>    already exists (`ExtractControls.vue` hosts `Upload image` and `Open camera`) — *Replace image*
>    and *Sample colors* — inheriting `focus-ring.css`, native `:disabled`, native activation.
>    Kills **D-5, D-6, D-9, D-10, D-11, D-14**.
> 3. The drop surface keeps the container (dropping needs no focus), with a bubbling-safe
>    enter/leave depth guard and a non-color `dragging` register (`dashed → solid`).
>    Kills **D-12, D-13**.
> 4. `emit("reject", …)` into the destructive line the pane already renders, and route both entry
>    paths through one validator. Kills **D-7, D-8**.
> 5. `.plate-ink` and the two inline transition styles retire into `demo/styles/`; `right-1.5 →
>    end-1.5`. Kills **D-15, D-16, D-17**.

That is the whole component re-derived from the constitution's own sentence — *"The image is the
stage"* — instead of from a `<div>` asked to be four things.

## 12. Strongest defect

**D-1.** The component exists to show the user the image it is about to quantise, and it does not.
A portrait specimen loses 85% of itself; the palette card beneath the stage renders three swatches
that are nowhere in the visible frame; the dominance headline claims *"36% of the image"* for a
color the user cannot see; and the eyedropper samples the full image the stage never showed. One
inert declaration — `h-full` against an indefinite parent, which makes `object-contain` a no-op —
is the entire cause, in a file whose first comment promises *"the specimen never lies."*

---

*No source files were edited by this seat. All writes are confined to
`docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/`.*
