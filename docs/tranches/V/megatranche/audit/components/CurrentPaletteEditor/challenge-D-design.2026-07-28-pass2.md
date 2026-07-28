# CHALLENGE-D · `CurrentPaletteEditor.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and is running as declared, not inherited.

---

## Seat, subject, substrate

| | |
|---|---|
| Axis | CHALLENGE-D — design: visual truth, state coverage, motion, design-system boundary, proportion/seat law |
| Subject | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines), area `palettes` |
| Route | `/#/palettes` only — sole consumer `demo/palettes/PalettesPane.vue:41-54` |
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u` |
| HEAD **as observed** | `5c13465d` (the brief named `c654824e`; the tree is 4 commits ahead). Subject file clean at HEAD. |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json:3`) |
| Run | **2026-07-27, pass 2.** Pass 1 is preserved beside this file as `challenge-D-design.2026-07-27-pass1.md`. Every number below was re-derived by this seat's own probes. |
| Probes | `probe-D4.mjs`→`.json` (12 scenarios) · `probe-D5.mjs` (CSSOM/hover/touch/RTL/reduced-motion) · `probe-D6.mjs` (exact rendered contrast) · `probe-D7.mjs` (ambient/DPR/zoom) · `probe-D8.mjs` (the save transition) · `probe-D9.mjs` (self-collision, target inventory) · frames in `frames-D4/` |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` |

**Verdict: DEFECTIVE.** 3 BLOCKER · 17 MAJOR · 6 MINOR · 1 INFO · **1 correction to a banked
pass-1 finding.**

---

## 0 · An honest correction before anything else

Pass 1 filed **D-8 — "the light scheme fails contrast on both header lines" (3.19 : 1)**. That number
is wrong, and so is its dark twin (10.85 : 1). Both were produced by parsing the *components* of
`oklab(0.913299 0.005463 0.013024)` as if they were sRGB bytes. WebKit serialises the well's
`background-color` in oklab, so a naive `match(/[\d.]+/g)` yields `[0.913, 0.005, 0.013]` and the
ratio is meaningless.

`probe-D6.mjs` resolves every colour through a canvas 2-D context first, so oklab/oklch/`color()`
become real bytes before any ratio is computed:

```
light  well fill rgb(233,225,217)   header ink rgb(112,89,66)    →  5.08 : 1   PASS
dark   well fill rgb(66,55,47)      header ink rgb(195,185,172)  →  5.97 : 1   PASS
```

**Pass-1 D-8 is NOT CONFIRMED.** The header type meets 4.5 : 1 in both schemes. What that probe *did*
find, once the arithmetic was fixed, is worse and elsewhere — see D2-03 and D2-04. I am recording the
retraction first because a banked wrong number is more expensive than a missed finding.

---

## The one-paragraph gestalt

This component is a **specimen case that has been asked to be an instrument**, and the constitution
already ruled that it may not be. `VISUAL-CONSTITUTION.md:91` abrogates the interactive host on
`WatercolorDot`; glass-ui 7 executed that ruling and now renders one hard
`<span aria-hidden="true" style="pointer-events:none">` with `inheritAttrs:false` and no slot. This
file never executed its half, so *every* verb it owns — add, edit, copy, remove, select — is written
onto a decoration. I verified live that all of them are dead: on desktop the action panel lays out
off-screen at `y = 900`; on touch a real `touchscreen.tap` produces **zero** popper wrappers and zero
`Edit color`/`Remove color` nodes anywhere in the document. **A user cannot remove a colour from their
own draft by any means.** The only reachable mutation is the commit button — which is nameless, and
which erases the whole draft while five swatches implode into a single point against the wrong
containing block. Underneath that sit the two findings that decide whether the surface can be *seen*
at all: the well's three declared boundary devices measure 1.13, 1.27 and a caster — all below the 3 : 1
non-text floor — and the primary affordance is stroked in the **user's live colour**, so choosing a
warm pale hue drives it to a measured **1.00 : 1** and the entire specimen row vanishes. A colour tool
that cannot show you a cream.

---

## §0 · Visual truth — what the frames actually show

**Read:** `audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,safari-mobile-dark}/palettes.png`
plus 23 frames I captured at `frames-D4/`.

`audit/visual/REPORT.md:120,135,150,165` gives `/#/palettes` `text` 237/237/169/169, `overflowX 0`,
`main 1`, `pageErr 0`, `consoleErr 0`, `smallTapTargets 8|8|4|4`, `namelessButtons 1`. **All four rows
are the empty draft** — 237 characters is the whole right pane with nothing saved. And `/#/palettes`
appears in **none** of the five special matrices:

```
$ ls audit/visual/shots/forced-colors-desktop audit/visual/shots/zoom-200-desktop \
     audit/visual/shots/rtl-desktop audit/visual/shots/reduced-motion-desktop \
     audit/visual/shots/keyboard-focus-desktop
adminusers.png  blob.png  browse.png  gradient.png  picker.png     (× 5 matrices)
```

So the largest interactive fixture on the Library route has **never been photographed doing its job,
in any matrix, in this tranche**. That is why this seat seeds `localStorage["color-picker"]` directly
(D2-27).

### Desktop light, 1440, empty (`shots/safari-desktop-light/palettes.png`)

A **462 × 115.11 px** dashed slab containing exactly one 48 px dashed blob and a 19-character label.
No plus sign, no verb, no button. Two hundred pixels below it, in the same frame, the ratified
`EmptyPaletteMark` renders **three of the same dashed blobs** to mean *nothing here* — and the
library's empty copy, `"Add colors above, then save the set."`, has to explain what the well is for,
because the well does not explain itself. Four lines of empty copy stack in one column: *Start a new
palette* / *· EMPTY PLATE ·* / *No saved palettes yet.* / *Add colors above…*

The well casts a hard three-layer caster **down-left**; the Card it is nested inside casts a hard
caster **down-right**.

### Desktop light, populated (`frames-D4/a-orange-1440-dpr1.png`)

Five saturated faces, a sixth near-white dashed face that *is* the primary CTA, and a red
`role="alert"` chip reading **"DEV MISCONFIGURED — RUN \`NPM RUN DEV\`"** sitting *inside the
product's save surface* — with the identical alert repeated in the top-right of the viewport.

### The same surface with the picker on `rgb(233 225 217)` (`frames-D4/b-beige-1440-dpr1.png`)

**The palette disappears.** The count reads `1 color`; the row appears empty. The saved specimen and
the add-slot ghost are both invisible against the well's own warm tone. Measured ghost-stroke contrast
vs the well fill: **1.00 : 1**. This is not a contrived colour — `--well-bg` *is* a warm off-white, so
the component annihilates the entire pale-warm quadrant of the space it exists to display.

### Mobile 390, populated (`frames-D4/s5-five-mobile-390.png`)

Five faces fill row one exactly; **the CTA wraps alone onto row two beside ~250 px of nothing**, where
it reads as a sixth swatch that failed to load. Same failure at the constitution's 400 %-zoom arm.

---

# The findings

Severity, then mechanism. `↺` marks a pass-1 row this pass re-derived and carries; `⇈` marks one it
escalates; `✎` marks a correction.

---

## D2-01 · BLOCKER ⇈ — every verb on a specimen is dead in every modality; a draft colour cannot be removed at all

`CurrentPaletteEditor.vue:29-85` writes five interactive intents onto `WatercolorDot` (via
`SwatchHoverMenu.vue:13-21,27-35`) and a sixth at `:95-105`. glass-ui 7 honours none of them.
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` compiles to:

```js
inheritAttrs: !1,                                   // fallthrough attrs dropped…
setup(e){ let n = h(), c = i(() => n.class), f = i(() => n.style),   // …except class/style
…
return (t,n) => (d(), o("span", { "aria-hidden":"true", …,
    style: u([f.value, { …, pointerEvents:"none", … }]) }, [ /* filter svg, ghost stroke */ ], 14, C));
```

No `tag` prop, no `<slot/>`, `aria-hidden` hard-coded, `pointer-events:none` inline. The declared prop
surface (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) is exactly
`{ color, variant, animate, cycleDuration, range, seed }`.

**Measured on the live route** (`probe-D4.json` → `s2-five-desktop-light.dots`, all six identical):

```
tag "SPAN"  ariaHidden "true"  pointerEvents "none"  hasSvgNonFilter false
```

`hasSvgNonFilter: false` is the `<Plus>` glyph at `:104` — it does not exist in the DOM. `probe-D4.json`
→ `s8-addslot`:

```json
{ "tag":"SPAN", "ariaHidden":"true", "ariaLabel":null, "role":null, "tabIndex":-1,
  "pointerEvents":"none" }         // el.click() → dots 6 → 6 (no change)
```

Pass 1 asserted the reka-ui `Popover` was "the accessible route" for touch. **It is not.** `probe-D5.mjs`
`P3` performs a real `page.touchscreen.tap` on the first swatch at 390 × 844 with `hasTouch: true`:

```json
{ "canHover": false, "anyEditNode": 0, "anyRemoveNode": 0,
  "popperWrappers": 0, "openDialogs": 0 }
```

`canHover:false` proves the Popover branch (`SwatchHoverMenu.vue:8-25`) is the one rendering; the tap
produces nothing, because `PopoverTrigger as-child` merges its handlers and state into a component
whose `inheritAttrs:false` discards them.

On desktop the hover branch does fire, and lands here (`probe-D5.json` → `p2-hover.during`):

```json
{ "panelRect": {"x":0,"y":900,"w":1440,"h":40}, "panelPosition":"static",
  "panelInline":"top: 335.59375px; left: 791px;", "panelBg":"rgba(0, 0, 0, 0)",
  "panelShadow":"none", "panelBackdrop":"none", "panelZ":"auto",
  "panelInViewport": false, "floatingPanelRuleExists": false }
```

`position: static` ⇒ the correctly-computed `top/left` are inert ⇒ the panel lays out in normal flow at
the end of `<body>`: **x 0, y 900 — one viewport height down — 1440 px wide, transparent, unshadowed,
`aria-hidden="true"`.** It also grows the document: `scrollH 900 → 940`, `bodyChildren 6 → 7`. Hovering
a swatch changes the page's scroll height.

**In design terms.** Edit, Copy, Remove and select are unreachable by pointer, touch, keyboard and AT.
The `tabbables` inside the well are exactly `["INPUT", "BUTTON"]` (`probe-D4.json` → `s8.tabNames`).
There is **no path in the product that removes a colour from the current palette.** The draft is
append-only until the user commits it, and committing erases all of it.

The repo's own e2e still addresses the CTA as a control that does not exist —
`e2e/smoke/flows/palette-save.spec.ts:35-38` calls
`getByRole("button", { name: /Add current color .* to palette/ })` against an element my probes measure
as `SPAN`, `aria-hidden="true"`, `tabIndex -1`. (I did not run the suite; I record the query, not a
verdict on the run.)

`VISUAL-CONSTITUTION.md:91` — *"Selection, activation, drag and keyboard focus belong to a named
enclosing geometric button/seat… data-bearing static faces remain present as noninteractive named
list/text content."* `PROPORTION-AUDIT.md:51` (PR-07) — *"Hover-only/unlabeled controls… palette hover
paths retire into selected inspector; every surviving action/drag seat has a name/state."*

**Cure (transposition).** The face is a face. Wrap it in the named `<button type="button">` the seat law
already mandates for palette cards and gradient stops, delete `SwatchHoverMenu`'s hover fork entirely,
and let the producer `Popover` — already imported at `SwatchHoverMenu.vue:61` — serve every pointer
type. That one move closes D2-01, D2-09's action leg, D2-15's `.floating-panel` leg and D2-26.

---

## D2-02 · BLOCKER — the collision state is not bound to the field it describes, and commits a destructive overwrite onto a palette the user is no longer naming

`duplicateTarget` is set at `:257`, and cleared only at `:263`, `:164` (Cancel) and `:274`. **Nothing
watches `currentPaletteName`.** So the error outlives the input that caused it, while its `Update`
button stays bound to the original target.

Reproduced end-to-end (`probe-D4.mjs` → `s9-dup-stale`), store seeded with `Palette 1` and `Palette 2`
(1 colour each), draft = 5 colours:

```json
"collided":    { "text": "… \"Palette 2\" already exists. Update Cancel", "h": 242.70 },
"afterRetype": { "inputValue": "Zebra Sunset",
                 "stillShowsCollision": true,
                 "collisionText": "\"Palette 2\" already exists. Update Cancel" },
"overwrote":   [ { "name": "Palette 1", "n": 1 },
                 { "name": "Palette 2", "n": 5 } ]     ← was n:1
```

The field reads **"Zebra Sunset"**. The row still names **"Palette 2"**. Pressing `Update` — the only
enabled-looking commit on screen — **destroys Palette 2's contents.** No confirmation, no undo, no
announcement.

`VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* The
associated error is not associated with anything.

**Cure.** The collision is field-level validation. glass-ui 7 ships the primitive:
`dist/components/labeled-field/LabeledField.vue.d.ts` declares `invalid`, `errorLive`,
`controlLabelable` and an `error` slot. Bind it to the name field and the state dies with the keystroke
that resolves it. The overwrite confirmation reuses the `Dialog` the sibling delete-all flow already
uses at `PalettesPane.vue:102-122`.

---

## D2-03 · BLOCKER — the primary affordance is stroked in user-controlled ink with no contrast floor; at a pale warm colour it measures 1.00 : 1 and the whole specimen row disappears

`:95-99` seeds the add-slot ghost with `:color="cssColorOpaque"` — the live picker colour. The ghost
variant traces a 2 px dashed border in that colour. The well fill is a **fixed** warm off-white.

`probe-D7.mjs`, identical viewport, only the picker colour changed:

| picker colour | ghost stroke | well fill | ratio |
|---|---|---|---|
| `rgb(226 87 31)` (orange) | `rgb(226,87,31)` 2 px | `rgb(233,225,217)` | **2.89 : 1** |
| `rgb(233 225 217)` (warm pale) | `rgb(233,225,217)` 2 px | `rgb(233,225,217)` | **1.00 : 1** |

`frames-D4/b-beige-1440-dpr1.png` is the frame: the well reads `Current Palette · 1 color` over an
apparently empty row. **Both** the saved specimen and the CTA are gone. Even the *reference* case,
2.89 : 1, is below the WCAG 1.4.11 non-text floor of 3 : 1 — the CTA never passes.

`VISUAL-CONSTITUTION.md:16` fixes the well's job: *"Specimen well … opaque/quiet neutral stage; **the
specimen supplies color**."* A stage that shares a tone with the specimens it stages is not a stage.
`:82` — *"Text, focus, boundaries and state meet their rendered contrast on the actual material tier; a
token name is not evidence."*

**Cure.** The add action stops being a swatch (D2-01) and becomes a named geometric button whose ink
comes from the *system*, not from user data. Any face that must render user colour on the well needs a
producer-owned contrast-guarded edge — the same guard the `palettes-ramp` resolver already applies for
the title (`utils.css:186-200`, *"gamut-guarded, WCAG ≥ 4.5 : 1 text-floor"*). The mechanism exists in
this repo; the well does not use it.

---

## D2-04 · MAJOR ↺⇈ — every declared boundary device on the well is sub-threshold; the two schemes were calibrated to different standards; the hairline is device-dependent

`utils.css:90-107` states three devices for one boundary and declares which one carries the meaning:
*"The dashed edge **ALONE** carries the in-progress semantics"* (`:103`). Measured
(`probe-D6.json`, `probe-D7.json`):

| device | light | dark |
|---|---|---|
| dashed edge composited on the well fill | **1.27 : 1** | **1.38 : 1** |
| well tone-step vs its host plate | **1.13 : 1** (rgb distance **24**) | 2.45 : 1 (rgb distance **102**) |
| `--shadow-cartoon-sm` caster | visible | invisible (dark on dark) |
| used `border-width` @ DPR 1 / DPR 2 | **1 px** / 1.5 px | same |

Three consequences.

1. **The semantic carrier measures 1.27 : 1.** WCAG 1.4.11 asks 3 : 1 of a boundary that identifies a
   component. `VISUAL-CONSTITUTION.md:82` names *boundaries* explicitly.
2. **The two schemes are not the same design.** The dark tone-step is a 102-unit rgb step; the light one
   is 24 — a **4.25×** difference from one token. In light, none of the three devices reaches
   threshold; what actually separates the well in the frame is *hue* — a neutral beige against a
   chromatic aurora-tinted plate — and that hue delta is undeclared, unowned, and controlled by the
   user's live colour (which is exactly how D2-03 kills it).
3. **The hairline is a device-pixel accident.** `1.5px` authored renders `1px` at DPR 1 and `1.5px` at
   DPR 2 — the boundary is 33 % lighter on every non-Retina display, and the tranche's own captures
   (2880 × 1800 for a 1440 × 900 stage) only ever saw the DPR-2 arm.

Add the direction contradiction (`probe-D5`/`probe-D4` computed styles):

```
well  box-shadow  … -2px 2px 0 0, … -3px 3px 0 0, … -4px 4px 0 0   ← down-LEFT
Card  box-shadow  color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0 0     ← down-RIGHT
```

`VISUAL-CONSTITUTION.md:186` — *"matte specimen slips inside a glass workspace, **not cartoon casters
stacked within casters**."* `PROPORTION-AUDIT.md:49` (PR-05), `:69` — *"Spacing plus material already
expressing the same boundary makes the line duplicative."*

**Cure.** One device, resolved per scheme against the plate it actually sits on, at ≥ 3 : 1, defined
where `--well-bg` is defined so fixture and edge move together. Delete the caster; delete the dashed
edge (which also frees the dashed language, D2-09).

---

## D2-05 · MAJOR — the one reachable mutation is silent, and its exit implodes five swatches into a point against the wrong containing block

The commit at `:134-142` fires `saved` then `clearCurrent` (`:261-264`), and `PalettesPane.vue:59`
maps `clearCurrent` to `emitApply([])`. This is the **only** list mutation a user can reach. Sampled
per animation frame (`probe-D8.mjs`, `tightSamples`):

```
t 3121  n 5  position absolute  offsetParent "glass-resting card rounded-card …"
        x = [767, 813, 858, 904, 950]
t 3231  x = [767, 786, 804, 823, 842]
t 3320  x = [770, 787, 801, 814, 828]
t 3501  x = [787, 790, 792, 794, 797]        ← all five on top of each other
```

`utils.css:177-179` sets `.swatch-row > .vj-enter-leave-active { position: absolute }`, but `.swatch-row`
computes `position: static`, so each leaving box's `offsetParent` is **the whole `PalettesPane` Card**.
With `auto` insets they resolve to the same static origin as the row empties, and the exit reads as five
specimens being sucked into one spot rather than five specimens fading where they stood. *Pass 1 filed
this as an untestable hypothesis (D-18) because removal is unreachable; the save path makes it
reachable, and it is CONFIRMED.*

Meanwhile the container disagrees with the motion (`probe-D8.json` → `frames`):

```
t0 before save   wellH 196.70   dots 6   leaving 0
t2+40ms          wellH 114.11   dots 6   leaving 5      ← 82.59 px collapsed in one frame
t2+700ms         wellH 114.11   dots 1   leaving 0
```

The well collapses **82.59 px instantly** while its contents are still animating out over the space
that no longer exists.

And the success itself is silent. Live regions before → after:

```
["alert: dev misconfigured…", "alert: dev misconfigured…", "status: · empty plate ·No saved palettes yet…"]
["alert: dev misconfigured…"]
```

No status changed to say *saved*. `animations.css:75-77` documents a family that exists for exactly this
beat — *"`vj-celebrate` — a ONE-SHOT feedback beat (**saved!**, error pop)"* — and this component, which
owns the app's only `saved!` and its only `error pop`, uses neither. `VISUAL-CONSTITUTION.md:101` —
*"A transient flourish may celebrate success but never carries the only truth."* Here there is neither
flourish nor truth.

**Cure.** The exit belongs to the row (give `.swatch-row` `position: relative` or drop the absolute
rule); the well's height change belongs to the same spring as its contents; the commit result belongs
in a durable status the entity owns, with the `vj-celebrate` beat as the optional flourish.

---

## D2-06 · MAJOR — three un-transitioned `v-if` seams; the decorative swatches get the only motion in the file

`:18` (count), `:116` (status chip), `:117` (action row) and `:144` (collision row) are bare `v-if`
boundaries with no `<Transition>` and no reserve. Computed `transition` on `.dashed-well` and on all
four zones is `"all"` — i.e. duration `0s` (`probe-D5.json` → `p1-light.zoneTransitions`). Measured
step sizes:

| event | well height | Δ |
|---|---|---|
| first colour added (0 → 1) | 114.11 → 196.70 | **+82.59 px** |
| name collision | 196.70 → 242.70 | **+46.00 px** |
| commit | 196.70 → 114.11 | **−82.59 px** |

Every one of those displaces the entire palette library below it, instantly. The component's motion
budget is spent in exactly the wrong place: a `TransitionGroup` on the *decorative* faces, nothing on
the *structural* zones or the two semantic events.

`PROPORTION-AUDIT.md:68` — *"Renderer, icon or touch footprints may reserve collision space only on the
axis where collision exists."* No reserve exists on the axis where collision demonstrably exists.

---

## D2-07 · MAJOR ↺ — the failure state is unannounced, unassociated, and speaks a second confirmation grammar

Measured at the moment of collision (`probe-D9.json` → `selfCollide.after`):

```json
{ "role": null, "ariaLive": null,
  "msgType": { "family": "\"Fira Code\"", "size": "16.4px", "style": "italic" },
  "buttons": [ {"text":"Update","rect":{"w":61.8,"h":36}}, {"text":"Cancel","rect":{"w":59.2,"h":36}} ],
  "inputAria": { "invalid": null, "describedby": null, "labelledby": null, "id": "" },
  "hasLabelEl": false }
```

Five defects in one state:

1. **Silent.** No `role`, no `aria-live`. A screen-reader user presses the (nameless, D2-14) commit
   button, nothing saves, and nothing is said.
2. **Unassociated and unlabelled.** The `Input` at `:125-133` has no `id`, no `<label>`, no
   `aria-labelledby`, no `aria-invalid`, no `aria-describedby`. Its only accessible name is a
   *placeholder that is simultaneously the default value* — one string doing two incompatible jobs.
3. **Two live commits.** `✓` and `Update` are on screen together, disambiguated only by copy.
   `PROPORTION-AUDIT.md:50` (PR-06) — *"One action/selection owner."*
4. **Two confirmation grammars in one pane.** `Update` irreversibly overwrites a saved palette from a
   36 px inline button; the sibling delete-all flow in the same pane gets a real `Dialog` with
   `tone="destructive"` (`PalettesPane.vue:102-122`). `VISUAL-CONSTITUTION.md:100` — *"Commit uses one
   glass-ui action set."*
5. **The producer already ships the answer and it is not used.** `LabeledField` (`invalid`, `errorLive`,
   `error` slot) and `Alert` (`announce: "off"|"polite"|"assertive"`) are both in glass-ui 7.

---

## D2-08 · MAJOR — the default name the interface proposes deterministically collides with an existing palette

`:130` proposes `'Palette ' + (savedPaletteCount + 1)`; `:249-259` rejects any name that already
exists, case-insensitively. The proposal counts, the rule names. Delete one palette and they disagree.

Reproduced (`probe-D9.json` → `selfCollide`), store = `["Palette 2", "Palette 3"]` (the user deleted
"Palette 1"):

```json
{ "proposed": "Palette 3", "existing": ["Palette 2","Palette 3"],
  "after": { "collisionShown": true, "text": "\"Palette 3\" already exists. Update Cancel" } }
```

Accepting the interface's own suggestion lands the user in the interface's own error state — the state
that (D2-02) can then destroy a palette. `PROPORTION-AUDIT.md:71` — *"Subtraction precedes
explanation."* A default that cannot be accepted is not a default.

---

## D2-09 · MAJOR ↺ — the dashed silhouette is spent on an action, colliding with the mark the constitution reserved for absence

`VISUAL-CONSTITUTION.md:186` ratifies exactly one meaning for this shape: *"A true empty invitation
content-hugs its text/action and may carry one static, aria-hidden `EmptyPaletteMark`: **exactly three
WatercolorDots plus the established dashes**."* The dashed ghost is the **absence** mark. This file
spends it on three other things:

| site | intended meaning |
|---|---|
| `:95` add-slot | **action** — "add the current colour" |
| `:37` `:ghost="isSwatchEditing(i)"` | **transient state** — "this swatch is being edited" |
| `:62` edit-overlay FROM slot | **provenance** — "the colour you started from" |
| `EmptyPaletteMark`, ~200 px below in the same frame | **absence** (the ratified one) |

`shots/safari-desktop-light/palettes.png` shows sites 1 and 4 simultaneously, 230 px apart,
pixel-identical in language. During an edit, sites 1 and 2 sit adjacent in the same row.

And the dashes themselves do not agree with each other. Three dashed strokes in one 462 px column:

```
well edge          1 px, oklab(0.216 …/0.12)  → 1.27 : 1 vs the well
add-slot ghost     2 px, the live picker colour → 1.00–2.89 : 1
EmptyPaletteMark   crimson, heavier
```

`PROPORTION-AUDIT.md:70` — *"Decorative controls and operable ornaments without names are forbidden."*

**Cure.** Reserve the dashed ghost for absence. The action becomes a named geometric button (D2-01);
the being-edited swatch expresses itself through the *selection register on its seat*, not by
mutating into the symbol for "empty".

---

## D2-10 · MAJOR ↺ — three type roles collapse onto one size; identity is in the wrong family and weight; the error outranks its own remedy

Computed values, 1440 light (`probe-D6.json`, `probe-D9.json`):

| element | source | rendered |
|---|---|---|
| `Current Palette` / `Start a new palette` | `:9` `text-small font-display font-semibold` | **Fraunces 600 @ 16.4 px** |
| `5 colors` | `:20` `text-mono-small` | **Fira Code 400 @ 16.4 px** |
| `"Palette 3" already exists.` | `:148` `text-mono-small … italic` | **Fira Code *italic* @ 16.4 px** |
| `Update` / `Cancel` | `:154,:162` `text-caption` | **14.38 px** |

`VISUAL-CONSTITUTION.md:75` — control or label = `text-small`, **Plus Jakarta Sans, non-bold**; `:76`
value/code/provenance = `text-mono-small`; `:74` prose = `text-prose`; `:78` — *"This matrix is closed
across all eighteen compositions"* with exactly one named exception (P019, Picker). This surface is not
that exception.

So: the identity line takes the display family *and* semibold, both off-matrix; identity, value and a
prose failure sentence all render at the same 16.4 px, so no hierarchy exists to read; and **the error
message is typographically louder (16.4 px) than the two controls that resolve it (14.38 px)** — the
problem outranks its remedy. A failure sentence set in monospaced italic is a CSS literal costume worn
by an English sentence.

---

## D2-11 · MAJOR — the mobile name field renders at 12.18 px, below the iOS Safari focus-zoom threshold; four rendered sizes serve two roles

Measured (`probe-D4.json`):

| | desktop 1440 | mobile 390 |
|---|---|---|
| label / count | 16.4 px | **14 px** |
| name `Input` | 14.38 px | **12.179 px** |

iOS Safari zooms the viewport when a focused text control's font-size is under 16 px. The palette-name
field is 12.18 px on the phone: focusing it zooms the page, and the well the user was working in
leaves the viewport. `VISUAL-CONSTITUTION.md:33` — *"Spacing is container-scaled from glass-ui tokens.
No desktop-tight/mobile-airy fork and no breakpoint pile"* — yet the file carries four
`w-11 h-11 sm:w-12 sm:h-12` breakpoint forks (`:36,:62,:64,:100`) and no container query, and the type
scales on a fifth, independent axis.

---

## D2-12 · MAJOR ↺ — no reflow law: the primary action's position is a function of `length mod width`

Measured (`probe-D4.json` → `s5-five-mobile-390`; `probe-D7.json` → `f-zoom400-360-dpr4`):

```
390 px, 5 colours   row 298 × 110.34, wrap, gap 10, dots 44
                    add-slot at x 46.0, y 395.72        ← row two, alone
400 % zoom (360 CSS) rowChildY [281,281,281,281,281, 341.2]   ← same orphan
```

`5 × 44 + 5 × 10 + 44 = 314 px` into a 298 px band. The row is a bare `flex-wrap` with no column count,
no minimum and no `justify` rule, so **the position of the primary action is a function of
`palette.length mod container width`** — and five is the count the app's own fixtures use.

**Cure.** The add action is an action, not a swatch. Move it to the well's action region beside the
commit control, where its position is invariant under length, viewport and zoom.

---

## D2-13 · MAJOR ↺ — 7.17 px of line-box slack under every face; `items-center` is a no-op; the authored gap is not the rendered gap

Measured on all six children of `.swatch-row`, 1440 light (`probe-D4.json`):

```
child  display "block"  line-height 27.912px  height 55.17
face   display "inline-block"  height 48  top y 377.59 (all six identical)
slack  7.17 px per child   →  row 55.17 for 48 px of ink   (+14.9 %)
gap above the row 10.00 px · gap below the ink 17.17 px
mobile 390: line-height 24px, child 50.17 for a 44 px face → 6.17 px, row 110.34 for 98 px of ink
```

Every wrapper is a block box hosting an inline-block face, so each inherits a line box and hangs
descender slack under the face. Because all six children are equal height, `items-center` at `:27` is a
**no-op**, and the band's ink centre sits 3.58 px above its geometric centre — the frame reads as a row
that is centred and is not. The wrapper `<div key="__add__">` at `:87`, added "for TransitionGroup
compatibility", reproduces the same slack.

`PROPORTION-AUDIT.md:73` — *"Real rendered relation wins over token intent… token presence alone cannot
close a row."* The authored `gap-2.5` is 10 px; the rendered gap below the specimen band is 17.17 px.

---

## D2-14 · MAJOR ↺ — the commit control is nameless, and it is the only reachable control in the component

`:134-142` renders `Button variant="outline" icon-only` whose only child is `<Check>`, with no
`aria-label`. Measured (`probe-D9.json` → `targets`, and every populated scenario in `probe-D4.json`):

```
{ "name": "<nameless>", "w": 32, "h": 40 }
tabbables inside the well: [ INPUT (no name), BUTTON (no name) ]
```

`audit/visual/REPORT.md:97` counts `namelessButtons: 1` on `/#/palettes` in the *empty* state, before
this button even mounts. The repo already knows: `e2e/smoke/flows/palette-save.spec.ts:40-41` documents
*"the icon-only Save button next to the Input lacks an aria-label"* and routes around it. A test that
codifies a defect is not coverage.

Combined with D2-01, the entire component contributes to the accessibility tree: one unnamed text field
and one unnamed button.

---

## D2-15 · MAJOR ↺ — two phantom class atoms, proven absent from the live CSSOM; an animation was deleted rather than moved

`:68-74` states the intent verbatim — *"the per-site spatial strays (`transition-all` +
`hover:scale-110`/`active:scale-95` …) retire onto the producer's `btn-interactive` atom: the scale leg
rides `--transition-liquid-spatial` @ `--spring-smooth-duration` … press/hover magnitudes + the house
focus register come with it."* The class does not exist. Neither does `.floating-panel`
(`SwatchHoverMenu.vue:42`). Measured **in the running document**, not by grep
(`probe-D5.json` → `p2-hover.during`):

```json
{ "floatingPanelRuleExists": false, "btnInteractiveRuleExists": false }
```

```
$ grep -rl "btn-interactive" node_modules/@mkbabb/    →  (empty)
$ grep -rn "btn-interactive" --exclude-dir=node_modules --exclude-dir=.git .
demo/DESIGN.md:237,247                                   (prose, marked "landed")
demo/shell/dock/ColorInput.vue:62,69,78,330              (consumer)
demo/palettes/browser/card/CurrentPaletteEditor.vue:71,75,78,100   (consumer)
docs/precepts/instructions/LESSONS-LEARNED.md:603        (the deletion record)
```

`LESSONS-LEARNED.md:603` records the cause: glass-ui `b0debec` retired `.btn-interactive` *"under a
false zero-site verdict."* Rendered consequence: the edit-overlay Save/Cancel buttons (`:75`, `:78`) and
the add slot (`:100`) have **no hover scale, no press magnitude and no focus register** — and unlike
their siblings at `:46,:49,:52` they carry no `focus-visible` rule at all. **Owner edict 6 —
animations are never deleted, only moved or tokenized — is violated, with the comment as the
confession:** the animation was deleted and a name was written where it used to be.

---

## D2-16 · MAJOR — the row's `TransitionGroup` keys embed the index, so the family `move` class it advertises can never fire for a survivor

`useSwatchActions.ts:45-53` keys each swatch on `` `${color}::${i}` ``. `utils.css:167-172` states the
intent: *"dots pop in/out on the enter/exit family with scale-only geometry, **neighbours reflow on the
family move class**."* The key defeats it. Replaying the code exactly:

```
$ node keyproof.mjs
initial       red,green,blue,gold → keys [ 0, 1, 2, 3 ]
remove idx1   red,blue,gold       → keys [ 0, 4, 5 ]   (survivors red/blue/gold)
reorder/dup   red,blue,gold,red   → keys [ 0, 4, 5, 6 ]
```

Removing one item re-keys **every survivor after it**. Vue therefore sees `green`, `blue`(2) and
`gold`(3) all *leave* and two brand-new nodes *enter*; `.vj-enter-move` (`animations.css:99`) never
applies to anything. Combined with D2-05's containing-block bug, a mid-list removal plays three
absolutely-positioned leaves converging on the pane origin plus two scale-from-zero entries — for an
operation the user thinks is "delete one swatch".

*Reproduction status: the deterministic key proof above is exact; the in-browser arm is blocked by
D2-01 (no removal path exists), except through the whole-list clear, which is D2-05 and is confirmed.*

---

## D2-17 · MAJOR — the "Add" verb silently reorders the palette, or silently does nothing; neither state is designed

`useSwatchActions.ts:62-73`:

```ts
function addCurrentColor() {
    const existingIdx = savedColorStrings.value.indexOf(cssColorOpaque.value);
    if (existingIdx !== -1 && savedColorStrings.value.length > 1) {
        const reordered = savedColorStrings.value.filter((_, i) => i !== existingIdx);
        reordered.push(cssColorOpaque.value);
        emit("apply", reordered);          // ← silently MOVES an existing swatch to the end
        return;
    }
    if (existingIdx !== -1) return;        // ← silently does NOTHING
    emit("addColor", cssColorOpaque.value);
}
```

Three outcomes behind one control, two of them invisible. Pressing "Add current colour" either appends,
or **destroys the user's ordering** by teleporting an existing swatch to the end, or does nothing at
all. There is no disabled state, no "already in this palette" affordance, no announcement, and — because
the control renders as a dashed blob with no glyph (D2-01) — no way to even tell which case you are in.

`VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states are never
color-only."* Here they are not any colour; they are nothing. `PROPORTION-AUDIT.md:70` — a mark is
*"data, status, labeled action, drag affordance, focus/selection register or removed."*

It is also the component's **only** reordering, and it is accidental: the component offers no reorder
affordance, while glass-ui 7 ships `sortable-list` and `VISUAL-CONSTITUTION.md:131` specifies the
keyboard grammar for *"horizontal explicit reorder: palette colors, operands, stops"* down to the
`position of total` announcement. A ratified interaction is absent; an unratified one fires by
side-effect.

*Reproduction status: code-derived. The in-browser arm is blocked by D2-01 — the control that would
trigger it is inert.*

---

## D2-18 · MAJOR ↺ — the edit state is a desktop-only fork that duplicates an always-mounted Dock action

`:58` — `class="edit-overlay glass-floating hidden lg:flex"`. Below 1024 px the overlay never renders:
no from→to specimen, no Save, no Cancel. The **same two verbs** are simultaneously mounted in the Dock
(`demo/shell/dock/Dock.vue:143-144`, `aria-label="Save edit"` / `"Cancel edit"`), which is *not*
breakpoint-gated. On desktop the identical commit is offered twice, in two registers, ~400 px apart;
below `lg` one set silently disappears and the interaction model changes.

`VISUAL-CONSTITUTION.md:32` — *"Mobile uses one document-scrolling stage → inspector → action sequence
beneath the same top dock."* `:33` — *"No desktop-tight/mobile-airy fork and no breakpoint pile."*
`PROPORTION-AUDIT.md:57` (PR-13) is the identical mechanism on another route — *"Picker specimen and
action region both host Copy → **REMOVE** … total 2 → 1."*

The overlay is also unreachable in practice: its only entry point is the Edit button inside the dead
panel (D2-01).

---

## D2-19 · MAJOR ↺ — a five-zone omnibus with no seat in the ratified Library composition, growing to 63 % of the pane with no cap

Measured zones, top to bottom (`probe-D4.json`, populated 1440):

| zone | job | rect |
|---|---|---|
| `flex items-center justify-between` | identity + count | 436 × 22.94 |
| `.swatch-row` | specimen | 436 × 55.17 → **250.69 at 24 colours** |
| `.api-offline-chip` | status (`role="alert"`) | 255.19 × 22.59 |
| `flex items-center gap-2` | action (name + commit) | 436 × 40 |
| *(on collision)* duplicate row | **second** action set | 436 × 36 |

`PROPORTION-AUDIT.md:67` — *"A card has one protagonist, one identity line, and at most **one**
persistent action/status region. Additional equal-weight zones require a different `InstrumentChassis`
composition."* This is one identity + one specimen + one status + **two** action regions.

And the component has **no seat in the ratified route composition at all.**
`VISUAL-CONSTITUTION.md:45` fixes Library as *"owner-state selector, library, selected inspector"* over
*"owned Device Draft, Workspace, Published and Trash"*; `:186` fixes those four as *"explicit,
non-interchangeable owner states."* A permanently-mounted draft well stapled above the field is a fifth
region `OPTICAL-BENCH-COMPOSITIONS.md`'s member table never ratified. At 24 colours the well measures
**392.22 px** — and there is no maximum, no scroll, no "show more".

**Cure.** The current palette *is* the Device Draft owner state. It belongs behind the owner-state
selector or in the selected inspector, not as an unregistered permanent band that outgrows the library
that owns the route.

---

## D2-20 · MAJOR ↺ — backend status is gated on an unrelated count, doubled on screen, below the text-contrast floor in both schemes, and addressed to maintainers

`:116` — `<ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />`. Persistent
infrastructural truth is conditioned on the length of an unrelated buffer: with the backend down and an
empty draft the surface says nothing; add one colour and a `role="alert"` appears; **commit the palette
and the alert silently disappears** (`probe-D8.json` — live regions go from two `alert` rows to one at
the exact moment of save).

Measured (`probe-D6.json`):

```
light  ink rgb(219,36,36) on chip bg rgb(231,202,195)  @ 11 px  →  3.18 : 1   FAIL (4.5 floor)
dark   ink rgb(235,71,71) on chip bg rgb(86,57,50)     @ 11 px  →  2.73 : 1   FAIL
globalAlertRoles: ["dev misconfigured — run `npm run dev`", "dev misconfigured — run `npm run dev`"]
```

Two identical `role="alert"` nodes render simultaneously — this chip and the always-mounted
`DockStatusLamp`. AT announces the same alert twice. The copy is a **developer instruction — "run
\`npm run dev\`" — rendered inside the product's primary save surface**, in the loudest chroma on the
pane, at the smallest size in the component, below the contrast floor in both schemes.

`PROPORTION-AUDIT.md:52` (PR-08) — *"Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE** … Persistent entity status/recovery."*

---

## D2-21 · MINOR ↺ — per-instance overrides on producer roots: two half-apply, one does literally nothing

Measured (`probe-D7.json` → `saveBtn`; `probe-D9.json` → `selfCollide.after.buttons`):

| site | authored | rendered |
|---|---|---|
| `:137` `h-8 w-8 rounded-full` | 32 × 32 circle | **32 × 40** — `w-8` won, `h-8` lost to the producer's `min-height: 40px`; `rounded-full` resolves on a vertical stadium |
| `:137` `border-border/50` | a hairline | `borderWidth: "0px"` — **the class sets a colour on a border that has no width; it renders nothing** |
| `:154,:162` `h-6 px-2` | 24 px | **36 px** |

The 32 × 40 commit control is also 4 px taller than the 36 px field it commits (`input y 477.36 h 36`
vs `btn y 475.36 h 40`), so the two boxes in a two-element action row mis-register by 2 px top and
bottom.

Owner edict 5 — *style at the shadcn/glass root component level, never per-instance overrides.* The
producer's real ring is `boxShadow: … color(srgb 0.11 0.098 0.09 / 0.05) 0 0 0 0.5px …`; the consumer
class list is arguing with a recipe it cannot see.

---

## D2-22 · MINOR ↺ — the empty invitation reserves a slab instead of hugging

```
1440 light empty:  well 462 × 115.11   one 48 × 48 mark + a 19-character label
                   .swatch-row 436 wide, ink 2 304 px² of 53 178 px² = 4.3 %
390  light empty:  well 324 wide, the mark alone at the far left, ~250 px of void beside it
```

`VISUAL-CONSTITUTION.md:186` — *"A true empty invitation **content-hugs** its text/action."* `:29` —
*"Empty secondary content occupies at most a narrow invitation tray (≤ 15 % of the stage) or
disappears."* `PROPORTION-AUDIT.md:48` (PR-04) — *"Empty/equal companion Cards and nested housing →
**REMOVE**."*

Note also the label swap: the same slot carries a noun identity (`Current Palette`) and an imperative
instruction (`Start a new palette`) in the same type, so the header line changes speech act without
changing register — and it is not a control, so the instruction cannot be obeyed by clicking it.

---

## D2-23 · MINOR — CSS literals and user-supplied names enter RTL prose with no isolation

`VISUAL-CONSTITUTION.md:154` — *"CSS strings, hex, slugs, IDs and provenance | render in **LTR-isolated
spans** inside RTL prose."* Three sites do not:

- `:107-109` `TooltipContent` — `Add current color ({{ cssColorOpaque }})`
- `:46,:49,:52,:101` aria-labels — `Edit color rgb(226 87 31)`, `Add current color rgb(226 87 31) to palette`
- `:148-150` — `"{{ duplicateTarget.name }}" already exists.` — a **user-supplied** string inside quotes
  inside a sentence

`probe-D5.json` → `p4-rtl` confirms the container mirrors correctly (row children descend
625 → 335; commit button moves to x 237), so the layout is fine and only the bidi isolation is missing.
In RTL the parenthesised `rgb(…)` and a quoted RTL/LTR-mixed palette name will reorder.

---

## D2-24 · MINOR — the palette name is unbounded at its point of origin

`probe-D4.json` → `s11-long-name`: `maxLength: -1`, 160 characters accepted,
`scrollWidth 1645` in a `clientWidth 394` field. The name is written straight into the store and then
rendered as the identity line of every `PaletteCard`. There is no cap, no counter and no truncation
contract at the source. A 160-character name is a downstream layout problem authored here.

---

## D2-25 · MINOR ↺ — one fact, two props

`:196-202` declares both `savedPaletteCount: number` and `savedPalettes: Palette[]`;
`PalettesPane.vue:44-45` passes `pm.savedPalettes.value.length` and `pm.savedPalettes.value` — the same
array. `savedPaletteCount` is `savedPalettes.length` by construction and is read at exactly two sites
(`:130`, `:250`) that could read the array. Two props for one fact are two things that can disagree —
and D2-08 is what happens when the fact they encode is the wrong one.

---

## D2-26 · MINOR — four operable targets below the 44 px floor, three of them off-screen

`probe-D9.json` → `targets`:

```
<nameless> (commit)               32 × 40   under44 true   inViewport true
Edit color rgb(226 87 31)         28 × 28   under44 true   inViewport false
Copy color rgb(226 87 31)         28 × 28   under44 true   inViewport false
Remove color … from palette       28 × 28   under44 true   inViewport false
```

`PROPORTION-AUDIT.md:72` — *"Visual glyph size, operable target size and layout reservation are separate
quantities."* Here the visual glyph decided all three.

---

## D2-27 · INFO — the tranche's own visual evidence has never seen this component work

All 60 Safari captures of `/#/palettes` are the empty draft (`REPORT.md:120,135,150,165` — `text`
237/237/169/169), and `/#/palettes` is absent from every one of the five special matrices
(forced-colors, reduced-motion, RTL desktop, RTL mobile, zoom-200). The populated, collided, editing and
24-colour states have no tracked frame in this tranche. `VISUAL-CONSTITUTION.md:228` — *"A visual claim
without a tracked frame pair and a named geometry/color/timing/interaction delta is incomplete."*
`frames-D4/` closes the gap for this seat; the matrix should close it for the tranche.

---

# What is genuinely right — the negative evidence

A CHALLENGE seat that finds only faults has not looked. These I attacked and could not break.

1. **Motion is fully tokenized and reduced motion is honoured.** The `TransitionGroup` uses the house
   `vj-enter` family (`animations.css:83-100`), whose legs are `--duration-normal`/`--ease-decelerate`
   and `--spring-smooth-duration`/`--spring-smooth` — no ad-hoc timings anywhere in the file. The global
   guard at `animations.css:184` neutralises all three families. `probe-D5.json` → `p5-reduced` measures
   `animatedDots: 0` and the well's geometry identical to the normal run — reduced motion resolves
   directly to final geometry, per `VISUAL-CONSTITUTION.md:144`. Nothing here animates a layout-forcing
   property: the transitions are `opacity` and `transform` only.
2. **The header type passes contrast in both schemes** — 5.08 : 1 light, 5.97 : 1 dark, measured through
   a canvas resolver. This retracts pass-1 D-8 (see §0).
3. **No horizontal overflow, no clipping, one `<main>`, no page errors, in twelve scenarios** including
   24 colours at 390 px and 400 % zoom: `overflowsParent: false` everywhere (`probe-D7.json`), and
   `REPORT.md` records `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0` for `/#/palettes` in all four
   Safari matrices.
4. **RTL mirrors correctly.** `probe-D5.json` → `p4-rtl`: `direction: rtl`, row children at
   `[625, 567, 509, 451, 393, 335]`, the commit button moves to the inline start (x 237), the status
   chip's `self-start` follows. Only the bidi isolation of literals is missing (D2-23).
5. **`demo/ui/*` is a clean re-export boundary, not a fork.** `demo/ui/{button,input,tooltip,popover}/index.ts`
   each re-export straight from `@mkbabb/glass-ui`. Owner edict 4's "no local `demo/ui/` variants" is
   satisfied; the boundary damage is elsewhere (D2-15, D2-07).
6. **`verbatimModuleSyntax` is clean.** `:190` `import type { Palette, PaletteColor }` is the only
   type-only import and it is correctly marked.
7. **The Vue 3.5 idioms are correct.** Reactive props destructure at `:196`, `toRef(() => …)` at
   `:234-235` to keep those props reactive across the composable boundary, no stale `defineModel`
   round-trip. The `S.W5-7` singular guard at `:17-21` renders `1 color` correctly (verified,
   `probe-D4.json` → `s4`), and the `S.W5-3` note at `:121-124` records a *previous* per-instance
   override list being correctly deleted from the `Input`. This file has done the right thing before.
8. **No god module.** 312 lines with real extraction — `useSwatchActions`, `useHoverPopover`,
   `useLeaveTimer` — and no shims, aliases or dual paths anywhere in it.

---

# Family roll-up — 27 findings, 11 mechanisms

| mechanism | findings | one-line cure |
|---|---|---|
| **M1** specimen asked to be an instrument | D2-01, D2-09, D2-14, D2-17, D2-26 | a named geometric seat contains the face — `VISUAL-CONSTITUTION.md:91` already ruled it |
| **M2** state bound to nothing | D2-02, D2-07, D2-08, D2-25 | glass-ui `LabeledField` (`invalid` + `errorLive` + `error` slot) owns the name field |
| **M3** rendered contrast never measured on the real tier | D2-03, D2-04, D2-20 | one ink + one edge per scheme, resolved against `--well-bg`, at ≥ 3 : 1 / 4.5 : 1 |
| **M4** motion budget inverted | D2-05, D2-06, D2-16 | the structural seams and the two semantic events get the motion; the decoration gets less |
| **M5** type-matrix drift | D2-10, D2-11 | three roles, three rungs, the matrix families; ≥ 16 px on touch controls |
| **M6** no reflow law for the specimen row | D2-12, D2-13 | the action leaves the row; the wrappers become flex |
| **M7** phantom class atoms | D2-15 | mint the atom where it lives or delete the claim; a class name is not a strategy |
| **M8** unregistered composition, zone inflation | D2-19, D2-22 | the draft is the Device Draft owner state, not a permanent fifth band |
| **M9** breakpoint fork duplicating a verb | D2-18 | delete the overlay; the Dock owns the edit action region |
| **M10** per-instance override of a producer root | D2-21 | no local sizing on producer Buttons; file the rung to glass-ui |
| **M11** unbounded / unisolated strings | D2-23, D2-24 | cap the name at source; `<bdi>` every literal |

---

# Owner-edict scorecard

| edict | verdict | evidence |
|---|---|---|
| 1 · no god modules | **PASS** | 312 lines, three real composables extracted |
| 2 · no legacy code | **PASS** | no shims, aliases or dual paths in this file |
| 3 · KISS, no contrivance | **FAIL** | D2-19 (five stacked zones) · D2-07 (a second confirmation grammar where field validation belongs) · D2-01 (a hand-rolled floating panel beside the producer `Popover` that is imported on the same line) |
| 4 · glass-ui is the design system | **FAIL** | D2-01 (four dead contracts against a deleted API) · D2-07 (`LabeledField`/`Alert` ship and are unused) · D2-15 (two phantom atoms) · D2-17 (`sortable-list` ships; reorder happens by accident instead) |
| 5 · root-level styling | **FAIL** | D2-21 — six per-instance overrides on producer roots; two half-apply, one renders nothing |
| 6 · animations never deleted | **FAIL** | D2-15 — `btn-interactive` deleted upstream; the scale/press/focus legs are simply gone, and the comment describing them survives |
| 7 · idiomatic Vue 3.5 | **PASS** | reactive destructure + `toRef(() => …)`; no stale-read pattern |
| 8 · `verbatimModuleSyntax` | **PASS** | `:190` is the only type-only import and it is `import type` |

---

# The gestalt cure

Do not patch twenty-seven rows. Four moves close twenty-one of them, and none of them is a new
component, a new directory or a wrapper.

1. **Give the component real seats.** Every interactive intent moves off `WatercolorDot` onto a named
   `<button type="button">` that *contains* the face — the exact law `VISUAL-CONSTITUTION.md:91` already
   ruled and the producer already shipped its half of. The swatch row becomes a named list whose text is
   the CSS string. *Closes D2-01, D2-09, D2-14, D2-17, D2-26; gives D2-15's missing focus/press register
   somewhere real to live.*
2. **Delete the two forks.** `SwatchHoverMenu`'s `canHover` branch and the `hidden lg:flex` edit overlay
   both disappear; the producer `Popover` serves all pointer types and the Dock keeps the edit action
   region it already owns. *Closes D2-18 and removes `.floating-panel` entirely.*
3. **Hand the name field to `LabeledField`.** Label, `invalid`, `errorLive` and the `error` slot come
   from the producer; the collision dies with the keystroke that resolves it; the overwrite reuses the
   `Dialog` the same pane already ships; the default name is derived from the *names*, not the count.
   *Closes D2-02, D2-07, D2-08, D2-25, and D2-24 with one `maxlength`.*
4. **Re-seat the draft as the Device Draft owner state**, with one boundary device measured at ≥ 3 : 1
   against the plate it actually sits on, one status seat, one commit grammar, the matrix type rungs,
   and a contrast-guarded specimen edge so a cream is still a colour. *Closes D2-03, D2-04, D2-10,
   D2-19, D2-20, D2-22.*

What remains after that — D2-05/D2-06/D2-16 (one `position: relative`, one key function, one spring on
three seams), D2-11 (a type rung), D2-12/D2-13 (a flex wrapper and an action that leaves the specimen
row), D2-21 (delete six classes), D2-23 (`<bdi>`) — is an afternoon.

Which is the point. This file does not need more design. It needs the design the constitution already
wrote, and a single measurement of what it actually renders.

---

## Artefacts

| path | what |
|---|---|
| `probe-D4.mjs` / `probe-D4.json` | 12 scenarios × geometry, zones, type, a11y, tab order, dup-stale reproduction, add-slot inertness, long name, 24 colours |
| `probe-D5.mjs` / `probe-D5.json` | live CSSOM phantom-class proof, hover document-height mutation, touch-path reachability, RTL, reduced motion |
| `probe-D6.mjs` / `probe-D6.json` | exact rendered contrast through a canvas resolver (the §0 correction) |
| `probe-D7.mjs` / `probe-D7.json` | ambient dependence of the CTA (1.00 : 1), DPR hairline, 200 %/400 % zoom arms |
| `probe-D8.mjs` / `probe-D8.json` | the save/clear transition sampled per animation frame; leaving-box containing block |
| `probe-D9.mjs` / `probe-D9.json` | self-colliding default name, collision-row anatomy, operable-target inventory |
| `keyproof-D2-16.mjs` | the deterministic replay of `useSwatchActions.ts:45-53` used in D2-16 |
| `frames-D4/*.png` | 23 frames: empty / 1 / 5 / 24 colours × light / dark × 1440 / 390 / DPR 2 / 200 % / 400 % / RTL / hover / touch / pale-ambient / post-save |
| `challenge-D-design.2026-07-27-pass1.md` | the preserved pass-1 report (its D-8 is retracted in §0; its D-18 is confirmed as D2-05) |
