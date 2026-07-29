# CHALLENGE-D — `demo/workbenches/extract/ImageDropZone.vue` — the design is defective

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was
spawned with an explicit declaration for. Not inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, seven MAJORs, five MINORs, two INFOs.

The premise held. The component is 114 lines that read as carefully designed — three tranches of
comments cite ruling IDs (`S.W5-6 · F4`, `T.W6.5 row 8`, `E1-R1`, `W5-a11y`) — and every one of
those citations is about **ink** and **edges**. Nobody, across A→V, ever measured what the control
does with an actual photograph. The single most consequential fact about this component is that
**the image preview does not contain the image**: a 4:3 photograph is silently center-cropped, a
portrait photograph loses 77% of itself, and at large overflow ratios the preview paints **nothing
at all** — a blank plate where the user's image should be. I reproduced the blank in two of three
capture matrices, at the shipped viewports, with pixel counts.

The second BLOCKER is that the entire sampling interaction — the pane's whole reason to exist once
an image is loaded — is unreachable by keyboard, while `role="button"` keeps advertising it.

A structural note on why this was never caught: **every one of the 60 captures in
`audit/visual/REPORT.md` shows this component EMPTY.** `bodyTextLength` is identical (299 desktop /
142 mobile) across all four `/#/extract` matrices; the shots show the placeholder. The component's
*primary* state has never been visually audited until this seat. And the harness cannot see the
control anyway: it is a `div[role="button"]`, so the `smallTapTargets` and `namelessButtons` probes
— which enumerate `button`/`input`/`span` — structurally skip it. The 6 small tap targets and 3
nameless buttons on `/#/extract` belong to `PaletteSlugBar` and the `ExtractControls` slider rail,
**not** to this component.

---

## Evidence base

All probes are in `evidence/seatD-probe{1..7}.mjs`, runnable against the live dev server
(`http://localhost:9000`, HEAD `c654824e`). Chromium via the repo's own
`node_modules/playwright`. Screenshots in `evidence/`. Every number below is pasted from a probe
run, not estimated from a screenshot.

Baseline computed state, empty, desktop 1440×900 light (`seatD-probe1.mjs`):

```json
"classAttr": "group relative rounded-panel border-2 border-dashed transition-all flex flex-col
              items-center justify-center overflow-hidden min-h-[140px] cursor-pointer
              border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10
              min-h-[180px] max-h-[min(320px,40dvh)]",
"tabIndex": 0, "rect": {"w":462,"h":180}, "minHeight":"180px", "maxHeight":"320px",
"borderColor":"oklab(0.471189 -0.0810328 0.0971413 / 0.3)", "borderStyle":"dashed",
"transitionProperty":"all", "transitionDuration":"0.3s", "radius":"12px", "cornerShape":"round"
"--primary": "oklch(0.471189 0.126502 129.834)"   ← hue 129.8° = the olive-green dashes you see
```

---

## D-1 · BLOCKER — the preview does not contain the image. `object-contain` is inert; photographs are cropped, and at large ratios the preview goes blank.

**Where.** `ImageDropZone.vue:41` `<img class="w-full h-full object-contain rounded-xl">` inside
`:8-9` `flex flex-col items-center justify-center overflow-hidden` + `min-h-[140px]`, with the
caller supplying `min-h-[180px] max-h-[min(320px,40dvh)]` (`ExtractWorkbench.vue:20`).

**Mechanism.** The container's block-size is **indefinite** — `height:auto` with a `max-height`
cap. `h-full` is `height:100%`; against an indefinite parent it resolves to `auto`, so the `<img>`
takes its **intrinsic** height. With both axes intrinsic, the box already matches the image's
aspect ratio and `object-fit:contain` has nothing to fit — it is dead declaration. `max-height`
then clamps the *parent*, `justify-center` centres the oversized child, and `overflow-hidden`
guillotines it top and bottom. Silently.

**Measured** (`seatD-probe4.mjs`, real `setInputFiles` upload of generated test images):

| matrix | image | zone | `<img>` box | visible fraction | image-colour pixels in the rendered zone |
|---|---|---|---|---:|---|
| desktop 1440×900 light | 1200×900 (**4:3**) | 462×320 | 458×**343.5** | **0.932** | 599 / 625 (95.8%) |
| desktop 1440×900 light | 400×1200 (1:3) | 462×320 | 458×**1374** | **0.233** | **0 / 625 (0.0%)** |
| mobile 390×844 dark | 400×1200 (1:3) | 324×320 | 320×**960** | **0.333** | **0 / 600 (0.0%)** |
| mobile 390×844 light | 400×1200 (1:3) | 324×320 | 320×**960** | 0.333 | 149 / 600 (24.8%) |

Two distinct failures fall out of the one mechanism:

**(a) Crop.** The crop threshold is `zoneWidth / maxHeight`. Measured: **1.44** at 1440×900 — so a
**4:3 photograph, the most common image on earth, is clipped by 6.8%**; **1.01** on a 390 phone —
every portrait image crops; **2.57** at 200% browser zoom (`seatD-probe3.mjs` at 720×450:
`maxHeight: "180px"`, `minHeight: "180px"` — `40dvh` collapses `max-h` onto `min-h`, so the well
can never grow and anything less than 2.57:1 landscape is cropped). See
`evidence/D1-crop-desktop-light-4x3.png` — the blue top band and red bottom band of the test image
are gone.

**(b) Blank.** At large overflow ratios the preview paints **nothing**. Sampling the rendered zone
screenshot on a 24×24 grid, **0 of 625** (desktop light) and **0 of 600** (mobile dark) pixels
match any of the six saturated test-image colours (±26/channel), while `elementFromPoint` at the
zone centre returns `IMG.w-full h-full object-contain rounded-xl`, `img.complete === true`,
`naturalWidth 400`, `opacity 1`, `visibility visible`. The element is laid out and hit-testable and
does not paint. Mobile **light** paints (24.8%); mobile **dark** does not — same build, same file,
same viewport. See `evidence/D1-blank-preview-mobile-dark-tall.png` and
`evidence/D1-blank-preview-desktop-light-tall.png`.

That the compositor's exact reason is engine-internal does not soften the finding: **a design that
only paints when the content happens to fit its clip is defective.** The component asks the engine
to lay out a 458×1374 element inside a 320px `overflow:hidden` rounded, `backdrop-filter`-descended
box, and then depends on the clip surviving. It does not always survive.

**What the user sees.** Drop a phone photo on `/extract` at 390px: the invitation vanishes, the
zone goes blank, and the result column still reads *"· undeveloped plate — feed it an image ·"*
(`seatD-probe4` desktop-light-tall: `paletteRendered: false, stillGhostCaption: true`). The app
looks broken.

**Cure (transposition, not patch).** The specimen well declares its own geometry and the image fits
*into* it — the inverse of today's arrangement, where the image dictates and the well truncates.
Give the zone a definite block-size (an `aspect-[3/2]` well, or a fixed `h-` rung on the parent's
axis), make the `<img>` `absolute inset-0 w-full h-full object-contain`, and **delete `h-full`**.
Then `object-contain` finally does the job its name promises, every aspect ratio letterboxes into
the plate, nothing ever overflows the clip, and the blank cannot occur because there is no overflow
to lose. `max-h-[min(320px,40dvh)]` dies with it — the well stops being viewport-coupled.

**Reproduction.** `node evidence/seatD-probe4.mjs` (dev server on :9000).

---

## D-2 · BLOCKER — the populated zone is a `role="button"` no keyboard can reach. The sampling affordance has no keyboard path at all.

**Where.** `:19` `:tabindex="disableClick ? -1 : 0"`; `:21-22` handlers gated on `!disableClick`;
`ExtractWorkbench.vue:23` passes `:disable-click="!!session.previewDataUrl.value"` and `:25`
`@click="session.previewDataUrl.value && (eyedropperActive = true)"`.

So: the instant an image exists, `tabindex` becomes `-1` — and the *only* entry point to
`ImageEyedropper`, the pane's primary interaction once loaded, is a click on that element.

**Measured** (`seatD-probe2.mjs`, after a real upload): `tabIndex: -1`; a 45-press `Tab` sweep
(five complete cycles of the page's 6–9 focusables, sequence recorded in the probe output) never
lands on it — `keyboardReachedZone: false`. `seatD-probe7.mjs` populated:
`fileInputClicksOnEnter: 0`, `cursor: "crosshair"`, `role: "button"`,
`aria-label: "Image preview area, tap to sample colors"`.

A `role="button"` with an accessible name that cannot be tabbed to is worse than an unmarked div:
AT announces an operable control, and Tab users can never operate it. WCAG 2.1.1. It is also the
exact species `PROPORTION-AUDIT.md` §5 rule 9 forbids — *"A renderer specimen is not an unlabeled
button… One action never occupies both the specimen and the action instrument"* — and rule 5,
*"Decorative controls and operable ornaments without names are forbidden."*

**Cure.** The specimen well stops impersonating a button. The image becomes an inert `<img>`; the
sampling action becomes a real named `<button>` in the action region that already exists
(`ExtractControls.vue` — the upload / camera / reset rail), labelled *Sample colors*. One action,
one named seat, keyboard and pointer converge. This also dissolves D-3 and D-10 in the same stroke.

---

## D-3 · MAJOR — hover-only affordance on a touch-first flow, with a focus fallback that is dead CSS. (PR-07 instance.)

**Where.** `:56-61` — the corner tag, `opacity-0 … group-hover:opacity-100
group-focus-visible:opacity-100`, `v-if="preview"`, `aria-hidden="true"`.

**Measured** (`seatD-probe2.mjs`): after `page.hover()` on the zone —
desktop 1440×900 `opacity: "1"`; mobile 390×844 (`isMobile`, `hasTouch`) `opacity: "0"`.
The word that tells a phone user the image is tappable is **invisible on phones**, and the
`aria-label` that would tell AT is masked by `aria-hidden="true"` on the tag itself.

The `group-focus-visible` fallback can never fire. The tag renders only when `preview` (`:57`); in
that same state `tabindex` is `-1` (`:19`). Measured both halves: `seatD-probe7` empty state —
focusable, `cornerTagOpacity: "no-tag"`; `seatD-probe2` populated — tag present, `tabIndex: -1`.
The two conditions are mutually exclusive by construction. Dead CSS shipped as an accessibility
affordance.

`PROPORTION-AUDIT.md` PR-07 — *"Hover-only/unlabeled controls and invisible drag state"* →
**ADD-AFFORDANCE / REMOVE**, *"every surviving action/drag seat has a name/state."* This component
is an unregistered PR-07 instance; per §3 (*"Finding a new instance is not a new wave: it joins its
mechanism family and owning feature wave"*) it joins PR-07 under the Extract wave.

**Cure.** Discharged by D-2's cure — a persistent named button carries the word permanently.

---

## D-4 · MAJOR — the drag-highlight flickers off whenever the pointer crosses a child.

**Where.** `:23-24` `@dragover.prevent="dragging = true"` / `@dragleave.prevent="dragging = false"`
on the container; children at `:37` (`img`), `:46` (placeholder), `:56` (tag) carry no
`pointer-events: none`; there is no `dragenter` handler and no depth counter.

**Mechanism.** Per HTML drag-and-drop, moving the pointer from a parent into a child fires
`dragleave` on the parent (which bubbles) and `dragenter` on the child. The handler cannot tell
"left the zone" from "entered a child of the zone", so the lit state drops on every internal
crossing and is only restored by the next `dragover` tick. Over a populated zone the `<img>` covers
100% of the surface, so dragging a replacement image over an existing preview flickers continuously.

**Measured** (`seatD-probe1.mjs`):

```json
"flicker": [["after dragover on container", "DRAG-LIT"],
            ["after dragleave dispatched on CHILD (bubbles)", "IDLE"]]
```

**Cure.** The idiom: a depth counter incremented on `dragenter` / decremented on `dragleave` with
the lit state driven by `depth > 0`; or a `relatedTarget`/`el.contains()` guard. Either is three
lines and removes the state machine's ambiguity at the source.

---

## D-5 · MAJOR — a rejected drop is silent. There is no error state, and no loading state.

**Where.** `:94-100` — `if (file?.type.startsWith("image/")) emit("file", file)`; the `else` is the
floor. `ExtractWorkbench.vue:80-85` owns the pane's only error line
(`session.quantizeError`), and the drop zone has no channel into it.

**Measured** (`seatD-probe3.mjs`, dropping a real `text/plain` File on the zone):

```json
"badDrop": { "anyDestructiveText": [], "bodyHasError": false, "stillPlaceholder": true,
             "zoneClasses": ["border-2","border-dashed","border-primary/30","bg-primary/5", …] }
```

Drop a PDF, a `.mov`, a folder: nothing happens. No message, no flash, no shake. The zone returns
to idle as if the user had done nothing. A multi-file drop silently discards all but
`files[0]` (`:96`). `dataTransfer.dropEffect` is never set, so the OS cursor gives no
copy-vs-move-vs-forbidden signal either.

`PROPORTION-AUDIT.md` PR-08 — *"Pending/failure/export/recovery truth only transient"* →
**ADD-AFFORDANCE**. Here it is not even transient; it is absent.

There is also **no loading/decoding state**: `:36-52` swaps placeholder → `<img>` the instant
`preview` flips, with nothing in between. Combined with D-1 this produces the observed
"image loaded / zone blank / result column still soliciting an image" screen.

**Cure.** The zone emits a typed rejection (`@reject: [reason]`) that the workbench renders in the
error line it already owns — one channel, error ≠ empty, the register the pane already declares at
`ExtractWorkbench.vue:79`. No new component, no new dir.

---

## D-6 · MAJOR — the control's boundary and its help copy both fail rendered contrast, and the file's own comment cites a token name as the proof they don't.

`VISUAL-CONSTITUTION.md:82` is exact: *"Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; **a token name is not evidence.**"*

**Measured** (`seatD-probe5.mjs` / `seatD-probe6.mjs`, DPR 1, sampled from the rendered page):

| scheme | measurement | value | requirement | |
|---|---|---:|---:|---|
| light | dashed border `rgb(196,171,157)` vs plate `rgb(235,177,206)` | **1.21 : 1** | 3:1 (WCAG 1.4.11) | **FAIL** |
| dark | dashed border `rgb(107,73,85)` vs plate `rgb(127,85,107)` | **1.26 : 1** | 3:1 | **FAIL** |
| light | prompt ink vs local plate, 16.4px | **4.32 : 1** | 4.5:1 (AA) | **FAIL** |
| dark | prompt ink vs local plate, 16.4px | **4.17 : 1** | 4.5:1 | **FAIL** |
| light | `ImagePlus` glyph vs plate | 4.32 : 1 | 3:1 | pass |

The dashed rule is the **only** thing that identifies the drop target — there is no fill change, no
elevation, no label chrome. At 1.21:1 it is legible by *hue* alone (`--primary` is
`oklch(0.471189 0.126502 129.834)`, hue 129.8°, olive-green over a pink plate) and disappears for
anyone with reduced colour discrimination or on a monochrome rendering.

The prompt ink is `--ink-muted` = `oklch(0.447121 0.00386159 34.63)`. The scoped comment at
`:104-111` asserts it is *"the certified de-emphasis rung (`--ink-muted` — boot-stamped,
floor-clamped against the live resting plate; D6) instead of the STATIC `text-muted-foreground`
that failed the text floor over the live-ambient plate in light."* Measured: **it fails the text
floor too, in both schemes.** The E1-R1 remediation swapped one failing ink for another and booked
it as certified.

**Cure.** The certification is the bug, not the token. Either the boot clamp
(`demo/color-picker/composables/boot/useAtmosphereBoot.ts:85-103`) targets a real 4.5:1 floor
against the live plate and is *measured at render*, or the caption stops sitting on the ambient
plate. The dashed edge needs a luminance delta, not a hue delta — the same clamp applied to the
boundary ink.

---

## D-7 · MAJOR — help copy wears the values/code type family, one rung *above* the pane's own description.

`OPTICAL-BENCH-COMPOSITIONS.md` §5, **Binding type matrix**: *"prose/help → `text-prose` + Plus
Jakarta Sans … values/code/provenance → `text-mono-small` or the already-established `mono-caption`
+ Fira Code."*

**Measured** (`seatD-probe3.mjs` / `seatD-probe7.mjs`, same page, same frame):

| element | family | size | ink |
|---|---|---:|---|
| pane title "Extract" | Fraunces | 41.888px | `rgb(28,25,23)` |
| pane description "Pull palettes from any image." | Plus Jakarta Sans | **14.384px** | `oklch(0.447121 0.00386159 34.63)` |
| **drop prompt "Drop an image or click to browse"** | **Fira Code** | **16.4px** | `oklch(0.447121 0.00386159 34.63)` |
| ghost caption "· undeveloped plate …" | Fira Code | 14.384px | `oklch(0.447121 0.00386159 34.63)` |

Available rungs, measured live: `text-prose` 20.672px PJS · `text-small` 16.4px PJS ·
`text-mono-small` 16.4px Fira · `text-mono-caption` 14.384px Fira.

Two defects in one row. **(a)** "Drop an image or click to browse" is an *instruction* — help copy —
set in the family the binding matrix reserves for values/code/provenance. **(b)** It is **14%
larger than the pane's own description** and carries the **identical** de-emphasis ink. Three
consecutive elements in the left column — description, prompt, ghost caption — share one flat ink
at three sizes with no hierarchy; the support copy inside a control outranks the pane's subtitle.
`PROPORTION-AUDIT.md:5`: *"Every element earns its scale… from its job relative to the local
protagonist."* This one did not.

`OM-15` (`audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md:143`) already rules the string itself down to
`Add an image`; that ruling and this one compose — reduce the words *and* move the copy onto its
lawful rung/family.

---

## D-8 · MAJOR — under forced-colors, the drag state is invisible: state conveyed by colour alone.

**Measured** (`seatD-probe4.mjs`, `forcedColors: "active"`):

```json
"idle": { "border": "rgb(0, 0, 0)", "bg": "rgba(255, 255, 255, 0.05)", "scale": "none"  }
"lit":  { "border": "rgb(0, 0, 0)", "bg": "rgba(255, 255, 255, 0.1)",  "scale": "1.01"  }
```

The border — the entire visual identity of the control — is **byte-identical** in both states,
because `border-primary/30` and `border-primary` are both forced to the same system colour. The
background delta is 5% white alpha. The only remaining differentiator is `scale: 1.01`: **4.6 CSS
px on a 462px box**, sub-perceptual. A user in Windows High Contrast dragging a file onto this zone
receives no confirmation that the zone will accept the drop. `evidence/D8-forced-colors-idle.png`.

Note also the coverage gap: `audit/visual/shots/forced-colors-desktop/` covers 5 routes
(`adminusers, blob, browse, gradient, picker`) — **`/extract` is not among them.** This state has
never been captured by the matrix.

**Cure.** Drag state must carry a non-colour channel: `border-style: dashed → solid`, a border-width
step, or a `forced-color-adjust` aware `outline`. PR-07's *"invisible drag state"* verb applies.

---

## D-9 · MAJOR — the component does not own its own geometry; two `min-h` utilities collide unmerged on one element, and one of the caller's two branches is dead.

**Measured** (`seatD-probe1.mjs`): the live `class` attribute carries **both**
`min-h-[140px]` (the component's own, `:9`) and `min-h-[180px] max-h-[min(320px,40dvh)]` (the
caller's, `ExtractWorkbench.vue:20`, arriving by attribute fallthrough). Computed
`min-height: 180px` — the caller wins *today*. There is no `cn()`/`twMerge`; Vue concatenates class
attributes, so which of two equal-specificity declarations wins is **stylesheet emission order**,
not authorship. The component's declared floor is inert and nobody decided that.

Owner edict 5 (*style at the root component level, never per-instance overrides*) is violated in
the literal case it exists to prevent: a caller reaching in to re-set a geometry the component
declares.

Worse, the caller's ternary (`ExtractWorkbench.vue:17-21`) branches on `layout === 'split'` — and
**`layout="split"` has zero call sites**. `grep -rn 'ExtractWorkbench' demo/` returns exactly one
mount, `ExtractPane.vue:11-13`, `layout="column"`. The split arm
(`flex-1 min-h-0 sm:max-h-[min(400px,50dvh)]`) is dead configuration for a dialog shell that no
longer exists.

**Cure.** The well owns its geometry (see D-1's `aspect-` transposition); the caller passes nothing.
The dead `split` arm is deleted, not preserved (edict 2 — no dual paths).

---

## D-10 · MINOR — designed states that cannot occur: `disableClick` restates `!!preview`, so two of three `aria-label` branches and half the corner-tag vocabulary are dead.

`ExtractWorkbench.vue:22-23` passes `:preview="session.previewDataUrl.value"` and
`:disable-click="!!session.previewDataUrl.value"` — the *same value*. Therefore
`preview && !disableClick` is unreachable at the only call site, and the following are dead in
shipped code:

- `:20` `'Replace image, click or drop a new image'` — the middle `aria-label` branch;
- `:61` `'replace'` — half the corner tag's vocabulary;
- `:10` `cursor-pointer` when a preview exists.

A prop whose sole value is a restatement of another prop is not a state, it is a duplicate.
KISS (edict 3). **Cure:** delete `disableClick`; derive from `preview` inside the component — or,
better, let D-2's cure remove the branch entirely by moving the action out of the specimen.

---

## D-11 · MINOR — `transition-all` on a `dvh`-coupled box, driven by an inline style the D tranche already booked for removal seven tranches ago.

`:8` `transition-all` — measured `transition-property: "all"`, `0.3s` — on an element whose
`max-height` is `min(320px, 40dvh)`. `dvh` changes whenever the mobile URL bar collapses; every
such change animates `max-height` for 300ms, and `max-height` is a layout property. Nothing in the
component needs `all`: the properties that change are `border-color`, `background-color` and
`scale`.

`:17` sets duration/timing through an inline `:style` binding. `docs/tranches/D/research/Df-styling.md:62`
booked exactly this line — *"static | Promote to scoped class or (when §1.1 surfaces tokens)
Tailwind utilities"* — and it is still inline at HEAD. `grep -rn "transitionDuration: 'var" demo/`
now returns **2 hits, both in this file** (`:17`, `:59`): the last two inline-style transition sites
in the entire demo.

Reduced motion **is** honoured, and I record that as a clean negative: under
`prefers-reduced-motion: reduce` the computed value is `transition-duration: 0.1s` with
`transition-property: "opacity, color, background-color, border-color, box-shadow"` — `transform`
drops out, so the drag lift snaps (`seatD-probe3.mjs`). That is carried by the global guard at
`demo/styles/animations.css:184-193` (`transition-duration: 0.01ms !important`, which outranks a
non-important inline style), **not** by the component. The component contributes nothing to its own
motion discipline; it is covered by a blanket.

**Cure.** `transition-[border-color,background-color,scale] duration-normal ease-standard` as
utilities; delete both inline `:style` bindings. Animations are moved and tokenized, never deleted
(edict 6).

---

## D-12 · MINOR — the corner tag hand-rolls a chip glass-ui already ships, carrying a post-hoc alpha the T census already booked.

`:58` `rounded-sm bg-background/85 px-1.5 py-0.5 text-mono-caption uppercase tracking-[0.18em]` is a
bespoke badge. `@mkbabb/glass-ui@7.0.0` exports `./chip` and `./badge`
(`node_modules/@mkbabb/glass-ui/package.json` exports map). Edict 4: variants and primitives belong
in glass-ui, reusing existing component-type names.

`bg-background/85` is the exact row already recorded at
`docs/tranches/T/audit/lanes/t-card-color-census.md:91` — *"D2 | `ImageDropZone` format badge |
`ImageDropZone.vue:56` `bg-background/85` | ~0.85α | **2W**"* — and at
`docs/tranches/T/audit/w3-close-artefacts.md:224` as one of the only two surviving `bg-alpha` hits
repo-wide. Booked, dispositioned, never discharged.

---

## D-13 · MINOR — RTL: physical `right-1.5`, already named by the U audit and still unfixed.

`:58` `absolute bottom-1.5 right-1.5`. Measured computed (`seatD-probe2.mjs`):
`right: "6px"`, `left: "243.906px"` — a physical inset, not logical.
`docs/tranches/U/audit/w-a11y/rtl-logical-property-audit.md:57` names this exact site
(*"`image-palette-extractor/ImageDropZone.vue:58 right-1`"*) and dispositions it *"booked to the
component-owning lanes / a future i18n wave."* The owning lane is this component; the line is still
physical at HEAD. `end-1.5` / `bottom-1.5` is the whole fix.

---

## D-14 · MINOR — `.plate-ink` is a copy-pasted utility replicated in five components, absent from `demo/styles/utils.css`, and its fallback masks a known-failing ink.

```
$ grep -rn "^\.plate-ink {" demo/ | wc -l
       5
demo/workbenches/extract/ExtractWorkbench.vue:290
demo/workbenches/extract/ExtractControls.vue:148
demo/workbenches/extract/ImageDropZone.vue:109
demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
$ grep -n "plate-ink" demo/styles/utils.css
(no output)
```

Five byte-identical scoped blocks of a token-consuming utility, in a repo that has
`demo/styles/utils.css` for exactly this purpose. Root-level styling (edict 5).

And the declaration itself is a **masking fallback**:
`color: var(--ink-muted, var(--muted-foreground))`. The same file's comment (`:106-108`) states
that `--muted-foreground` *"failed the text floor over the live-ambient plate in light"* — so the
fallback arm is a **known-bad** value silently used whenever the boot writer
(`useAtmosphereBoot.ts:103`) has not yet stamped `--ink-muted`, i.e. on every first paint. Edict 2
forbids masking fallbacks; this one masks a defect the author documented in the line above it.

---

## D-15 · INFO — no designed focus register; the control wears the browser's ring.

`seatD-probe7.mjs`, empty state, real `Tab` (10th stop): `outline: "auto 3px rgb(28, 25, 23)"`,
`box-shadow: "none"`, `:focus-visible` matches. It *is* visible — I record that as a pass — but it
is the UA default on a control whose every other surface is meticulously tokenised, and the
component declares no `focus-visible:` treatment of its own. The one focus affordance the component
*does* author (`group-focus-visible:opacity-100`, `:58`) is the dead one (D-3).

---

## D-16 · INFO — the empty placeholder takes 40% of a 200%-zoom viewport and can never grow.

`seatD-probe3.mjs` at 720×450 (= 1440×900 at 200% browser zoom): `min-height: "180px"`,
`max-height: "180px"` (because `40dvh` = 180), zone `462×180`, `docOverflowX: 0`. An **empty**
placeholder occupies 180 of 450 available CSS px. Coupling the specimen well to `dvh` means the
preview is smallest exactly when the low-vision user has least room, and there is no path to
enlarge it. D-1's cure (declared aspect, no `dvh`) resolves this too.

---

## Negative results recorded honestly

- **Reduced motion is respected** — by the global guard, not by the component (D-11).
- **The `ImagePlus` glyph passes** non-text contrast: 4.32:1 light / 4.24:1 dark.
- **Keyboard activation works in the EMPTY state**: `Enter` and `Space` both open the file picker
  (`seatD-probe7`: `fileInputClicks: 2`). The failure is confined to the populated state (D-2).
- **No horizontal overflow, no page errors, no console errors** attributable to this component on
  `/#/extract` in any of the four matrices (`REPORT.json`: `overflowX: 0`, `pageErrors: []`,
  `consoleErrors: []`). The single dev console error is the OM-5 `VITE_API_URL` banner.
- **`verbatimModuleSyntax` is satisfied** — both imports (`:66-67`) are value imports; there is no
  type-only import to mark.
- **`useTemplateRef` is used correctly** (`:78`) — idiomatic Vue 3.5 (edict 7).
- **Not a god module** — 114 lines, one job, real encapsulation (edict 1).
- **`rounded-xl` on the `<img>` (`:41`) is not a visible radius mismatch**: `--radius-panel` and
  `--radius-xl` both compute to `12px`, and `corner-shape` computes to `round` on the parent, so no
  superellipse divergence. It is a token-family slip (a scale token where the semantic role token
  belongs), not a rendering defect — and under D-1's cure the `<img>` inherits the well's clip and
  needs no radius at all.
- **The 6 `smallTapTargets` and 3 `namelessButtons` on `/#/extract` are not this component.** They
  are `PaletteSlugBar` (`Switch to slug` / `Generate new slug` / `Cancel`, 22×22) and the
  `ExtractControls` slider thumbs (12×24 / 12×44). This component's target is 462×180. Recorded so
  the parent does not mis-attribute them.

---

## Family grouping (for the parent's mechanism register)

| family | findings | one sentence |
|---|---|---|
| **Indefinite-box geometry** | D-1, D-9, D-16 | the well has no geometry of its own, so the content and the caller fight over it and the clip arbitrates |
| **Specimen-impersonating-a-button** | D-2, D-3, D-10 | activation lives on the specimen instead of a named seat, so states multiply, half of them unreachable |
| **Absent state design** | D-4, D-5, D-8 | drag, rejection and forced-colors states were never designed — only the happy path was |
| **Rendered-contrast vs token-name** | D-6, D-7, D-14 | the ink and type were certified by citing token names; measurement disagrees in every case |
| **Uncured carries** | D-11, D-12, D-13 | three separate tranches (D, T, U) booked three of these lines and none was discharged |

## Strongest defect

**D-1.** The component's entire purpose is to show the user the image it is about to quantise, and
it does not: 4:3 photographs are cropped, portrait photographs lose three quarters of themselves,
and in two of my three measured matrices the preview renders **zero** image pixels — a blank plate
where the photograph should be — while the result column still reads *"undeveloped plate — feed it
an image."* One inert declaration (`h-full` against an indefinite parent, which makes
`object-contain` a no-op) is the whole cause, and every visual audit to date missed it because
every capture of this component in the entire mega-tranche matrix is EMPTY.
