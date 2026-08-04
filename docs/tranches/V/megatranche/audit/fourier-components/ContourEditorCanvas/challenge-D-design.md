claude-opus-5[1m]

# CHALLENGE · `ContourEditorCanvas.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourEditorCanvas.vue` (340 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and the falsifier is stated so a reader can kill the claim without asking me.

**Files read whole (read-only):** the subject · `web/src/lib/contourEditing.ts` · `web/src/components/visualization/composables/useContourHistory.ts` · `…/composables/usePointDrag.ts` · `web/src/lib/types.ts` (`ContourAsset`) · `web/src/lib/api.ts` (`overlayUrl`) · `web/src/stores/workspace.ts` (`contourSettings`) · `web/src/lib/defaults.ts` · both consumers `VisualizationView.vue` + `FullscreenViewer.vue` · the paired toolbar `EditorControlsDock.vue` · the crossfade sibling `BasisCanvas.vue` (root class only) · the geometry sibling `ContourPreview.vue` · `web/src/style.css` · glass-ui **4.0.0** installed token files (`dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`, `theme/radius.css`, `components.css`) · `api/dependencies.py` (`image_bounds` coordinate space).

**Hitherto corpus folded, not re-invented:** `formation/fourier/lane-frontend.md` §1 (pin table), §3 (glass census), §5 (the 4.0.0→7.0.0 break surface + the tri-package deadlock), §8 (reduced-motion table + the `--viz-amber` carry), §9 (carries 1/4/9/11); `formation/fourier/CENSUS-2026-08-03.md` §1–§2 + the 2026-08-03 addendum; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R3-7a, R3-10, R4-8, R4-9). Overlaps and one contradiction are cited inline.

**Tally** — 23 defects (5 BLOCKER · 7 MAJOR · 9 MINOR · 2 INFO) · 4 superlatives.

---

## §0 · The one-paragraph verdict

`ContourEditorCanvas` is the product's **only direct-manipulation surface** — every other interactive
component in `components/visualization/` is a dock, a panel, or a read-only canvas. It is also the
**only component in that directory with zero glass-ui imports** (`grep -c "glass-ui"` → `0`), and
that fact is simultaneously its best property (§6 S-1: zero F.W1 break sites) and the root cause of
six of its seven MAJORs: with no chassis to conform to, every surface decision here was re-derived
by hand, and each re-derivation diverges from a law the repo had already written down elsewhere.
The component hard-codes an amber the repo darkened for WCAG **twelve lines away** in its own
`style.css`; it runs the only ungated `infinite` animation in its directory in a tree that carries
eight `prefers-reduced-motion` blocks; it omits the empty-points guard that its 62-line sibling
`ContourPreview.vue` has; and it frames itself with a bare hairline while the component it
crossfades with in the *identical* `inset: 0` box wears `cartoon-card`. The two structural
blockers — a pointer-only editing grammar and a `window`-scoped `preventDefault` keymap — are not
polish items; they make the editor unusable by keyboard and destructive to keyboard users
elsewhere on the route.

---

## §1 · BLOCKERS

### B-1 · Light-mode non-text contrast is 1.43:1 — and the repo already shipped the fix, in the same cascade

**Severity BLOCKER · WCAG 2.2 SC 1.4.11 Non-text Contrast (AA)**

**Provenance.** `ContourEditorCanvas.vue:261` (`stroke="hsl(40 90% 55% / 0.85)"`), `:307`
(`fill: hsl(40 90% 55% / 0.6)`), `:308` (`stroke: hsl(40 90% 55%)`), `:315`, `:333` — eight
occurrences of the same raw literal, zero uses of a token. Surface: `:292-296`
`background: …, var(--card)`. `--card` light = `hsl(36 48% 97%)`
(`glass-ui/dist/styles/tokens/color-radius.css:72`, installed 4.0.0).

**Measurement** (sRGB relative luminance, WCAG 2.x formula):

| mark | composited colour over light `--card` | contrast | required |
|---|---|---:|---:|
| spline stroke `…/0.85` (`:261`) | — | **1.66 : 1** | 3 : 1 |
| control-point fill `…/0.6` (`:307`) | — | **1.43 : 1** | 3 : 1 |
| control-point stroke, opaque (`:308`, `:333`) | — | **1.81 : 1** | 3 : 1 |

**Method calibration** — I re-derived the repo's *own* published figure with the same code path
before trusting mine. `style.css:120-122` asserts glass-ui light `--viz-amber` `hsl(35 70% 42%)`
"≈ 3.54:1 against `--background`"; my computation returns **3.556:1**. It asserts the darkened
override `hsl(35 76% 35%)` "≈ 4.6:1"; mine returns **4.626:1**. Agreement to 0.5 % on two
independent points. The numbers above are produced by the identical routine.

**Why this is a BLOCKER and not a MINOR.** The remediation is *already in the tree*.
`style.css:119-131` is a wave-tagged fix — "D.W4.d — light-mode `--viz-amber` darken (axe contrast
carry)" — that overrides `--viz-amber` to `hsl(35 76% 35%)` (4.63:1) precisely because the glass-ui
light value failed AA. `ContourEditorCanvas` routes around that fix eight times with a literal.
The control points and the spline are not decoration: they are *the* user-interface components of
an editor, and they are the only indication of what is selected, what is draggable, and where the
curve is. This is the exact class of defect lane-frontend §8 books as a live glass-ui carry — and
this file is the surface that makes the carry moot by never consuming the token.

**Falsifier (how to kill this claim).** Show that (a) `--card` in light mode is not
`hsl(36 48% 97%)` at the pin — it is, `tokens/color-radius.css:72`, and `tokens/light-dark.css:98`
carries the same value in `light-dark()` form; or (b) the marks qualify for the 1.4.11 "pure
decoration / conveys no information" exception — they cannot, since `:332-334` uses colour alone
to encode *selection state*; or (c) the app never renders light. It does: `index.html:22-32`
carries a pre-paint dark-mode bootstrap that defaults to light absent a stored preference
(lane-frontend §1), and `DarkModeToggle.vue` exists to switch it.

**Dark mode PASSES** and I say so: amber vs `--card` dark `hsl(24 8% 16%)`
(`tokens/dark-arm.css:64`) = **7.61 : 1**. The failure is light-mode-only. Any repair must not
regress the dark arm — which is exactly why `var(--viz-amber)` (light `hsl(35 76% 35%)` / dark
`hsl(37 73% 67%)`, `style.css:125-129`) is the correct one-line fix and a flat darkening is not.

---

### B-2 · The editing grammar is 100 % pointer-only — no keyboard path exists to select, insert, or move a point

**Severity BLOCKER · WCAG 2.2 SC 2.1.1 Keyboard (A)**

**Provenance.** Control points are `<circle>` elements (`:266-278`) with exactly one interactive
binding: `@pointerdown="onPointPointerDown(i, $event)"` (`:277`). No `tabindex`, no `role`, no
`aria-label`, no `keydown`. `grep -c "aria-\|role=" ContourEditorCanvas.vue` → **0**. Insertion is
`@dblclick` on the SVG (`:237` → `onDblClick`, `:145-152`). Movement is `usePointDrag.ts:16-25`,
`pointerdown` + `setPointerCapture` only.

**The four primitive operations and their keyboard availability:**

| operation | pointer path | keyboard path |
|---|---|---|
| select a point | `pointerdown` on `<circle>` (`:277`) | **NONE** |
| move a point | drag (`usePointDrag.ts:27-56`) | **NONE** |
| insert a point | `dblclick` (`:237`) | **NONE** |
| delete a point | `Delete`/`Backspace` (`:165`) **or** dock button | requires a prior selection ⇒ **NONE** |

The `EditorControlsDock` does not rescue this. Its `delete` button is `:disabled="!canDelete"`
(`EditorControlsDock.vue:99`), and `canDelete` is `selectedIdx.value !== null`
(`ContourEditorCanvas.vue:127`) — which only a pointer can set. Smooth / simplify / reset / undo /
redo / save are reachable, so a keyboard user can *transform the whole contour* but can never
touch a point. That is a bulk-operations panel bolted to an inoperable editor.

**Falsifier.** Produce any keyboard-reachable path that sets `selectedIdx` or mutates a single
point. I searched: `grep -n "keydown\|keyup\|keypress\|tabindex\|role=" ContourEditorCanvas.vue`
yields only `:210` (the window listener, which reads `selectedIdx` and never writes it) and `:231`
(`tabindex="0"` on the shell — which, per M-1, is bound to nothing). A second falsifier would be a
documented "essential" exemption; none exists in `web/DESIGN.md` or the wave docs.

---

### B-3 · A `window`-scoped keymap calls `preventDefault()` with no target, focus, or mode guard — it swallows `Backspace` inside a live `<input type="number">` and destroys a contour point instead

**Severity BLOCKER · destructive + WCAG 2.2 SC 2.1.4-adjacent (single-character/shortcut capture)**

**Provenance.** `:209-211` registers `onKeyDown` on **`window`**, not on the shell, and `:214-216`
removes it on unmount. `onKeyDown` (`:164-177`) calls `e.preventDefault()` on three branches
(`:166`, `:170`, `:174`) and inspects **neither `e.target`, nor `document.activeElement`, nor
whether the editor is the active mode**.

**The lifetime is longer than the mode.** `VisualizationView.vue:203` mounts the editor under
`v-if="store.contour"` and hides it with a *class*, not `v-if`:
`:class="{ 'is-hidden': !isEditing }"`. `VisualizationView.vue:404-408` defines `is-hidden` as
`opacity: 0; z-index: 0; pointer-events: none` — **not `display: none`**. The component therefore
stays mounted, and its `window` listener stays live, for the entire lifetime of a loaded contour,
in *every* mode.

**The concrete failure.**

1. Enter edit mode, click a control point → `selectedIdx = 3` (`usePointDrag.ts:19`).
2. Leave edit mode (`CanvasControlsDock` `@toggle-edit`, `VisualizationView.vue:220`). `deselect()`
   is **not** called on mode exit — `deselect` runs only in `initFromContour` (`:57`), `doUndo`
   (`:106`), `doRedo` (`:111`), `onBgClick` (`:161`) and after a delete (`:182`). `selectedIdx`
   survives at `3`.
3. The `!isEditing` panel now renders `BasisSelector`, which carries
   `<input type="number" aria-label="Harmonics">` at `BasisSelector.vue:157-165` and
   `<input type="number" aria-label="Sample Points">` at `:184-192`.
4. The user types `200` into Harmonics, then presses **Backspace** to correct a digit.
5. `onKeyDown` fires on `window`, `selectedIdx !== null` is true, `e.preventDefault()` runs — the
   digit is **not** deleted — and `deleteSelected()` (`:179-186`) **splices a point out of the
   contour**, pushes it to history, and emits `stateChange`.

The user sees a text field that refuses to accept Backspace, and does not see the geometry mutate,
because the editor is at `opacity: 0`.

**The undo branch is worse: it has no guard at all.** `:169` and `:173` are gated on nothing but the
keystroke. `Cmd/Ctrl+Z`, `Cmd/Ctrl+Shift+Z` and `Cmd/Ctrl+Y` are `preventDefault`-ed **anywhere on
the `/w` and `/v` routes whenever a contour is loaded**, including inside both number inputs and
inside `UserSlugBar.vue:129` and `GallerySearchBar.vue:48`. Native text-undo is dead route-wide, and
each press instead rewinds the invisible contour-history stack.

**Falsifier.** Show a guard I missed. The whole handler is `:164-177`; there is no
`if (!props.isEditing)`, no `e.target instanceof HTMLInputElement` test, no
`el.contains(document.activeElement)` test, and the listener target is literally `window` (`:210`).
Alternatively, show that `is-hidden` unmounts the component — `VisualizationView.vue:404-408` says
it does not. Alternatively, show that mode exit deselects — grep for `deselect` in the file returns
five call sites, none on a mode/prop watcher.

**Fix shape (one line, for the wave):** bind the listener to the shell element (which already has
`tabindex="0"`, `:231`) rather than `window`, and gate on `isEditing`. This also repairs M-1's dead
tab stop by giving the tabindex a purpose.

---

### B-4 · Control-point hit targets are ~6–9 CSS px and, at the shipped defaults, overlap each other ~4× — 24 px is unreachable at any viewport by arithmetic

**Severity BLOCKER · WCAG 2.2 SC 2.5.8 Target Size (Minimum) (AA)**

**Provenance.** `:273` `:r="3.5"` — a radius in **user (data) units**. `:274`
`vector-effect="non-scaling-stroke"` — this normalises the **stroke only**; SVG 2 defines
`vector-effect` over stroke geometry, so `r` still scales with the viewBox. `:309`
`stroke-width: 2.5` therefore renders at a fixed **2.5 CSS px** while the disc shrinks with the
data extent. `viewBox` is `bounds.width * 1.3` wide (`:77-83`, `MARGIN = 0.15` at `:29`).

**The data space is pixels, not normalised units.** `api/dependencies.py:150-161` computes
`image_bounds` as `{minX: -rw/2, maxX: rw/2, …}` with `resize = 1024`, and `lib/defaults.ts:6`
ships `resize: 1024` as the client default. Contour extents are therefore **hundreds of units
wide**, not ~1.

**Arithmetic.** Let `w` = contour bbox width in units, `W` = stage width in CSS px,
`s = W / (1.3 w)` px·unit⁻¹ (the `xMidYMid meet` scale when the stage is the binding axis).

- rendered disc radius `= 3.5 s`
- the 2.5 px stroke straddles the edge: it covers `r ∈ [3.5s − 1.25, 3.5s + 1.25]`
- outer target diameter `= 2(3.5 s + 1.25)`

| condition | closed form | at `w = 1024` |
|---|---|---|
| outer target ≥ 24 px (SC 2.5.8) | `s ≥ 3.07` | stage must be **≥ 4088 CSS px** |
| fill is ≥ half the mark's area | `s ≥ 2.08` | stage must be **≥ 2771 CSS px** |
| stroke swallows the fill entirely | `s ≤ 0.357` | stage **≤ 475 CSS px** (every phone) |

At a realistic desktop stage (`W ≈ 700`, `w ≈ 1024`): `s = 0.526`, disc radius **1.84 px**, visible
fill confined to `r ≤ 0.59 px`, outer target **6.2 px**. On the mobile "Canvas" tab
(`VisualizationView.vue:181-186`, `W ≈ 390`): the fill is *entirely* occluded.

**The spacing exception does not apply.** `lib/defaults.ts:7` ships `n_points: 1024`. A contour of
bbox width 1024 has perimeter on the order of 2500–3200 units, so adjacent points sit ≈ 2.5 units
≈ **1.3 CSS px** apart at `s = 0.526` — against a 6.2 px mark. Points overlap roughly **fourfold**;
the 24 px "undisturbed circle" test of SC 2.5.8 fails by more than an order of magnitude. In
practice a click near the curve cannot address a specific point at all.

**Falsifier.** Three ways to kill this: (a) show `vector-effect="non-scaling-stroke"` normalises
`r` — it does not, per SVG 2 §rendering, and if it did, the `:311` `transition: … r 0.15s` would be
animating a screen-space value the author never changes; (b) show contour coordinates are
normalised to ~1 — `api/dependencies.py:156-160` and `lib/defaults.ts:6` say pixels, and if they
*were* normalised the same arithmetic makes `r = 3.5` **larger than the entire viewBox**, i.e. the
component is broken in the other direction; (c) show a live measurement contradicting the closed
form — that is **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact px figure, but the *inequalities* are
scale-free and hold for any `w > 0`, `W > 0`.

**Note the compounding.** B-4 is the mechanism that makes M-3 and M-4 no-ops: the hover rule
(`:314-316`) and the selected rule (`:332-334`) both act on the **fill**, which B-4 proves is the
occluded minority of the mark at every realistic viewport.

---

### B-5 · Fullscreen edit mode is a silent dead-end: a second instance, a second `window` listener, no toolbar, and edits that can never be saved

**Severity BLOCKER · state coverage + destructive data loss**

**Provenance and the four-part failure.**

1. **Two live instances.** `VisualizationView.vue:203-207` keeps the inline editor mounted whenever
   `store.contour` exists (B-3). `FullscreenViewer.vue:115-120` mounts a **second**
   `ContourEditorCanvas` under `v-if="isEditing && contour"`. `FullscreenViewer` itself is always
   in the tree (`VisualizationView.vue:282`, no `v-if`), and its inner `v-if="show"`
   (`FullscreenViewer.vue:106`) flips with `visible`.
2. **Two `window` keydown listeners.** Each instance runs `:209-211`. With both mounted, one
   `Cmd+Z` invokes `doUndo()` **twice** — once per instance, on two independent history stacks
   (`useContourHistory.ts:5-6` creates fresh `history`/`historyIndex` refs per call). One keystroke,
   two divergent rewinds, one of them invisible.
3. **No toolbar in fullscreen.** `FullscreenViewer.vue:130` gates the control rail on
   `v-if="!isEditing"`. In fullscreen *edit* mode there is therefore **no** undo, redo, smooth,
   simplify, delete, magnet, reset or save — the entire `EditorControlsDock` is absent, and by B-2
   there is no keyboard substitute.
4. **Edits are unreachable and discarded.** `VisualizationView.vue:92-95` saves via
   `editorRef.value.getPoints()`, and `editorRef` is bound at `:204` to the **inline** instance
   only. The fullscreen instance has no `ref`, no `@state-change` binding, and no path to
   `store.saveContourPoints`. Every point dragged in fullscreen is destroyed on close, with no
   warning, no dirty indicator, and no confirm.

**Falsifier.** Show the fullscreen instance is `ref`-ed or emits upward —
`FullscreenViewer.vue:115-120` passes exactly three props (`contour`, `image-slug`,
`show-image-overlay`) and binds no `ref` and no listener. Show the toolbar renders — line `130` is
`v-if="!isEditing"`. Show only one listener attaches — `onMounted` is per-instance (`:209`). Show
the histories are shared — `useContourHistory` is invoked at `:41` inside `<script setup>`, i.e.
once per instance.

**Contradiction with the hitherto corpus, stated explicitly.** `lane-fourier-r3-r6.md` R3-11
adopts as fact that the live tree has exactly two `<Teleport>` sites, one of them
`FullscreenViewer.vue:105`. That row treats the Teleport as a structural fact only. It is also the
boundary across which this component's state is silently forked — a consequence R3–R6's registries
could not see, because they census callsites, not instance identity. I am not contradicting R3-11;
I am recording that its "two Teleports" fact has a design consequence the registry model is blind
to, which is the same blindness `lane-fourier-r3-r6.md` R5-7 books ("the deriver is blind to native
template loops").

---

## §2 · MAJOR

### M-1 · An invisible, unlabelled, permanently-focusable tab stop that does nothing

**Severity MAJOR · WCAG 2.2 SC 2.4.7 Focus Visible (AA) + SC 2.4.3 Focus Order (A)**

`:231` `<div class="editor-shell" tabindex="0">` — focusable. `:291` `outline: none` — with **no**
`:focus-visible` replacement anywhere in the file. `style.css:133-143` supplies global focus rings
for exactly four classes (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`);
`.editor-shell` is **not** among them, and the block's own comment enumerates the four
scoped-styled components it covers. So the element takes focus and shows nothing.

Worse, per B-3 the shell persists at `opacity: 0` when `!isEditing`
(`VisualizationView.vue:404-408`). `opacity: 0` does **not** remove an element from the tab order —
only `display: none`, `visibility: hidden` or `inert` do. Keyboard users therefore hit a dead stop
on a fully transparent region in *non-edit* mode. `pointer-events: none` on the same rule blocks
the mouse but not the Tab key.

And the tabindex buys nothing, because the keymap is bound to `window` (`:210`), not to this
element. It is a pure tax.

**Falsifier.** Show a focus style reaching `.editor-shell` — `grep -n "focus" ContourEditorCanvas.vue`
returns nothing; `style.css:139-143` lists four other selectors. Show `opacity: 0` removes tab
stops — it does not. Show the shell is `inert`/`aria-hidden` when hidden — neither attribute appears
at `VisualizationView.vue:203` or `ContourEditorCanvas.vue:231`.

**Superlative-adjacent note (L-18 both ways):** `--ring: hsl(24 10% 10%)`
(`tokens/color-radius.css:102`) is available at the pin and the repo has a canonical ring recipe at
`style.css:139-143`. The fix is three lines and needs no uplift.

---

### M-2 · The only ungated `infinite` animation in `components/visualization/`, in a tree that carries eight `prefers-reduced-motion` blocks

**Severity MAJOR · WCAG 2.2 SC 2.3.3 Animation from Interactions (AAA) + violation of the repo's own D.W4.c precedent**

`:323-330`:
```css
.editor-svg:hover .spline-path { animation: golden-shimmer 1.2s ease-in-out infinite; }
@keyframes golden-shimmer { 0%,100% { filter: drop-shadow(0 0 2px …) } 50% { filter: drop-shadow(0 0 5px …) } }
```

**Measured absence.** `grep -c "prefers-reduced-motion\|reducedMotion" ContourEditorCanvas.vue` → **0**.

**Measured precedent.** `grep -rn "infinite" components/visualization/*.vue` returns exactly three:
- `AnimationControls.vue:176` — guarded, `@media (prefers-reduced-motion: reduce)` at `:178`
- `ImageUpload.vue:159` — **unguarded** (a second instance of the same gap, out of scope here)
- `ContourEditorCanvas.vue:324` — **unguarded**

lane-frontend §8 enumerates eight `reduce` blocks across the tree and names the governing wave:
`GalleryMarquee.vue:126-128` cites *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9
finding."* This file is a post-hoc violation of a law the repo wrote for itself.

**Design aggravation independent of a11y.** The trigger is `.editor-svg:hover` — the SVG is
`width: 100%; height: 100%` (`:299-301`) and fills the entire shell, so the pulse fires on *any*
pointer presence anywhere over the editor and never stops while the cursor is inside. During
precision point-dragging, the whole 1024-segment path breathes continuously in the operator's
peripheral vision. Motion this persistent belongs on an idle/hero surface, not on a work surface.

**A second, structural aggravation.** `:319` sets `transition: filter 0.2s ease` on the same
element the keyframes drive. Both target `filter`; the animation wins while running and the
transition governs the snap-back, so entering and leaving hover are asymmetric — and the animated
property is `drop-shadow`, which forces a full repaint of a path whose `d` string carries ~1024
cubic segments (`closedSplinePath`, `contourEditing.ts:20-43`, one `C` command per point). Cost is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the structure — an infinite filter animation over a
thousand-segment path — is statically certain.

**Falsifier.** Show a `reduce` block I missed (grep count is 0), or show `golden-shimmer` is
defined with a guard upstream — it is defined locally at `:327-330`; `lib/golden-shimmer.ts` (68
lines) is a *canvas alpha* helper used by `BasisCanvas.vue:168` and is unrelated to this CSS
keyframe of the same name (itself a naming collision worth noting, m-4's cousin).

---

### M-3 · The hover affordance is inverted — hovering makes a control point *less* visible

**Severity MAJOR · affordance / Aristotelian proportion**

`:307` resting `fill: hsl(40 90% 55% / 0.6)` → `:315` hover `fill: hsl(40 90% 55% / 0.5)`.
Alpha **decreases**. Hovering a draggable target reduces its salience by ~17 % of its opacity and
changes nothing else: `:311` transitions only `fill` and `r`, `r` never changes (m-1), the stroke is
untouched, and there is no scale, no halo, no cursor change beyond the shell-wide
`cursor: crosshair` (`:302`) plus `cursor: grab` on the point (`:310`).

Against the light `--card` this drops the fill's contrast from **1.43:1 to 1.36:1** — i.e. hover
pushes an already-failing mark further into invisibility.

And by B-4 the changed property is the occluded one: at any realistic stage width the 2.5 px
non-scaling stroke covers `r ∈ [3.5s − 1.25, 3.5s + 1.25]`, leaving a sub-pixel fill core. **The
component's only hover feedback is a change to the part of the mark the user cannot see.**

**Falsifier.** Show another hover cue — `grep -n ":hover" ContourEditorCanvas.vue` returns exactly
two rules, `:314` (this one) and `:323` (the shimmer, which fires on the SVG, not the point, and
therefore does not distinguish *which* point is hovered). Show `0.5 > 0.6` — it is not. Show the
stroke does not occlude the fill — B-4's inequality `s ≥ 2.08` requires a 2771 px stage at
`w = 1024`.

---

### M-4 · Selection is anti-legible: the wrong surface token, and a ring that is wider than the disc it rings

**Severity MAJOR · state legibility + token conformance**

`:332-334`:
```css
.control-point.selected { fill: hsl(40 90% 55%); stroke: var(--background); }
```

**Two independent defects.**

*(a) Wrong token.* The shell's surface is `var(--card)` (`:295`), not `var(--background)`. The
"cut-out ring" idiom only reads if the ring matches the surface behind it. At the pin these tokens
differ:

| arm | `--background` (= `--neutral-0`) | `--card` | ΔL |
|---|---|---|---|
| light | `hsl(40 30% 98%)` (`tokens/color-radius.css:40,57`) | `hsl(36 48% 97%)` (`:72`) | 1 pt — imperceptible |
| dark | `hsl(24 9% 4%)` (`tokens/dark-arm.css:42`) | `hsl(24 8% 16%)` (`:64`) | **12 pts** |

In dark mode the selected point is therefore ringed in a near-black band (contrast **1.36:1**
against the card) that reads as a drop shadow, not a cut-out — the opposite of the intent. The
correct token is `var(--card)`, one word away.

*(b) The ring dominates the mark.* By B-4's geometry the 2.5 px stroke covers
`r ∈ [3.5s − 1.25, 3.5s + 1.25]` while the fill occupies `r ≤ 3.5s − 1.25`. At `s = 0.526` the ring
is ~**85 % of the mark's area** and the amber core is ~0.6 px. So "selected" is communicated almost
entirely by the ring colour — which per (a) is the wrong colour and, in light mode, nearly identical
to the surface. **The single most important state in a point editor is encoded in the least legible
channel of the smallest mark on the canvas.**

**Falsifier.** Show `--background === --card` at the pin — the four token lines above say
otherwise in both arms. Show `.selected` changes anything besides `fill` and `stroke` — `:332-334`
is three lines. Show the fill dominates — B-4.

---

### M-5 · Chassis divergence from the component it crossfades with, in the identical box

**Severity MAJOR · glass-ui / design-system conformance under the old pin**

`VisualizationView.vue:393-403` places `.canvas-container` and `.editor-shell` at
`position: absolute; inset: 0` in the same stage slot and crossfades them at
`opacity var(--duration-mid, .24s)`. They are, by construction, the same rectangle.

- `BasisCanvas.vue:521` — `class="canvas-container cartoon-card"`
- `ContourEditorCanvas.vue:288-296` — bespoke: `border-radius: var(--radius)`,
  `border: 1px solid var(--border)`, plus a hand-rolled two-gradient dot lattice

`style.css:99-117` defines `cartoon-card` as `@apply cartoon-surface` + `--border` + `--card` —
i.e. a **2 px** border with an offset stamp shadow and a hover-lift (the shim re-binds the recipe
glass-ui removed at C.W5; the comment counts 14 application sites / 13 files). Toggling edit mode
therefore crossfades a 2 px stamped frame into a 1 px hairline with no shadow. The frame *weight
changes* during a transition designed to be "a pure opacity crossfade with no layout shift"
(`VisualizationView.vue:390-391`). The editor is the only stage surface in the product that opts
out of the product's own card idiom.

**Falsifier.** Show the wrapper supplies `cartoon-card` — `VisualizationView.vue:203` is
`class="editor-shell"` with no card class, and `:393-403` sets only layout/opacity properties.
Show the fullscreen path equalises them — `FullscreenViewer.vue:164-170` strips border, radius and
shadow from **both** via `:deep()`, which proves the author knew the two surfaces carry different
chassis and normalised them in *one* of the two mounts only.

**Uplift note (F.W1).** glass-ui 7.0.0 **adds** `./surface` (lane-frontend §5 export diff, ADDED
list). The bespoke shell is the natural re-home; this is one of the few places in the tree where the
uplift is an *improvement opportunity* rather than a break. Cite alongside lane-frontend carry #6.

---

### M-6 · `stableBounds` never grows: a dragged point can leave the canvas permanently, with no zoom, pan, scroll, or indication

**Severity MAJOR · state coverage / recoverability**

`:47-49` and `:60-68` compute the bbox **once** from the initial contour; `:73` fixes
`bounds = stableBounds` with the comment *"live bounds for nothing."* `viewBox` (`:77-83`) adds a
flat `MARGIN = 0.15` (`:29`) of headroom on each axis. `.editor-shell` is `overflow: hidden`
(`:290`). There is no zoom and no pan: `grep -n "zoom\|pan\|scale(" ContourEditorCanvas.vue` returns
only the fixed `scale(1,-1)` flip at `:246` and the image's counter-flip at `:252`.

Consequence: drag any point more than 15 % of the bbox extent beyond the original bounding box and
it is clipped away. Pointer capture (`usePointDrag.ts:22`) means the drag *continues* off-canvas,
so the user can release a point at an arbitrary distance outside the visible frame. The magnet
(`magnetRadius` default **3**, `:38`) drags six neighbours with it. There is no scrollbar, no
"fit" control (`EditorControlsDock` has none), and no indication that geometry exists outside the
frame — the only recovery is `Cmd+Z`, which per B-3 is itself unreliable and per B-5 doubles in
fullscreen.

**Falsifier.** Show a re-fit path — `initFromContour` is the sole writer of `stableBounds` (`:67`)
and runs only on the `props.contour` watcher (`:70`) or `resetToExtraction` (`:198`), never on drag.
Show a zoom/pan affordance — none exists in this file or in `EditorControlsDock.vue`.

**I am not calling the stable-bounds decision wrong** — see S-4; it is the right call. The defect is
that the decision shipped without its necessary companion (headroom, a fit control, or clamping).

---

### M-7 · No empty, loading, or error state — and the 62-line sibling proves the author knew the guard was required

**Severity MAJOR · state coverage**

**Empty.** `initFromContour` (`:53-69`) seeds `minX = Infinity, maxX = -Infinity, …`. With
`contour.points.x = []` the loop never runs, so `width = (-Infinity) - (Infinity) || 1` →
`-Infinity` (truthy, so the `|| 1` fallback does **not** fire), and `viewBox` (`:77-83`) evaluates
to `"Infinity -Infinity -Infinity -Infinity"` — a malformed value the UA discards, collapsing the
projection. No message, no placeholder, no fallback.

**The sibling has the guard.** `ContourPreview.vue:11-14` returns `""` for `pts.length < 3`, and
`:18-19` returns the sentinel `"0 0 1 1"` viewBox for `pts.length < 2`. Both files were written
against the same `closedSplinePath`. **The read-only preview is defended; the editor is not.**

**Loading / error.** `:249-257` renders `<image :href="overlayHref" …>` with no `onerror`, no
placeholder, no alt/`aria-hidden`, and no decoding hint. `overlayUrl` (`api.ts:296-298`) is a plain
network URL; a 404 or a slow fetch produces a silently blank underlay while
`showImageOverlay` still reads "on" in the dock (`EditorControlsDock.vue:143-147`). The user is told
the overlay is enabled and shown nothing. Likewise `:253` pins `opacity: 0.28` with no user control
on a layer whose entire purpose is registration against the source image.

**Falsifier.** Show a parent guard — `VisualizationView.vue:203` guards `store.contour` for
null/undefined only, not for empty `points.x`; `FullscreenViewer.vue:115` guards `contour`
truthiness only. Show `-Infinity || 1` yields `1` — it does not; `-Infinity` is truthy. Show the
`<image>` has error handling — `:249-257` is nine attributes, none of them an error path.

*(Reachability of a zero-point contour is **UNPROVEN-NEEDS-LIVE (SS-13)**; the arithmetic and the
sibling-guard contradiction are static and hold regardless.)*

---

## §3 · MINOR

**m-1 · Dead transition property + off-law easing.** `:311` `transition: fill 0.15s, r 0.15s`. `r`
is bound to the literal `3.5` (`:273`) and no rule changes it, so half the declaration is dead.
Separately, the duration carries no easing token while the repo has an explicit law —
`FullscreenViewer.vue:189-194` is annotated *"A.W3.d — named properties + canonical token, no
`transition: all`"* and uses `var(--ease-standard)`; `:311` and `:319` use bare defaults / `ease`.
*Falsifier:* find a rule that sets `r` — grep returns one binding, `:273`.

**m-2 · `dragging` destructured and never used.** `:42` pulls `dragging` out of `usePointDrag`; it
appears nowhere else in the file. There is consequently no `is-dragging` class and no
during-drag affordance; drag state rests entirely on `:active` (`:336-338`), which is unreliable
under `setPointerCapture` (`usePointDrag.ts:22`) once the pointer leaves the element's box.
*Falsifier:* `grep -n "dragging" ContourEditorCanvas.vue` → one hit, line 42.

**m-3 · Dead public emit.** `:26` declares `save: [points: …]`; `grep -n 'emit("save"' ` → 0. The
real save path is `defineExpose({ getPoints })` (`:224`) read by `VisualizationView.vue:92-95`. A
declared-but-unemitted event is a false affordance in the component's contract; `FullscreenViewer`
could plausibly have bound it (and per B-5, should have). *Falsifier:* find an `emit("save")`.

**m-4 · `editor-shell` is two different elements in two different scopes.** The class names both the
`VisualizationView.vue:203` wrapper and this component's root (`:231`).
`VisualizationView.vue:393,404` reach the wrapper via a `>`-anchored selector;
`FullscreenViewer.vue:164` reaches the root via `:deep(.editor-shell)`. Vue applies the parent's
scope id to a child's root element, so the two are one selector-edit apart from silent double
application. *Falsifier:* both selectors are child-anchored or `:deep`, so today it is latent, not
live — which is why this is MINOR and not MAJOR. (Cousin collision: the CSS keyframe
`golden-shimmer` at `:327` vs the unrelated module `lib/golden-shimmer.ts`.)

**m-5 · The background grid signifies measurement and measures nothing.** `:292-296` paints a
28 px **screen-space** lattice under a **data-space** projection whose scale
`s = W/(1.3w)` varies per contour and per viewport. Two contours side by side get identical grids
representing different distances. Graph paper is a strong signifier of scale; here it carries none.
*Falsifier:* show a scale readout, ruler, or unit label — the component renders zero text.

**m-6 · `MARGIN = 0.15` is an undocumented magic number that spends ~30 % of the drawing area.**
`:29`, applied at `:79-80`. In an editor whose targets are already sub-24 px (B-4), surrendering
30 % of linear extent — and thus ~41 % of the fitted area on the binding axis — inverts the
priority between breathing room and precision. It is also the sole source of the drag headroom
M-6 depends on, so the two constraints are in direct tension with no comment acknowledging it.
*Falsifier:* find a rationale in the file, `DESIGN.md`, or the wave docs — `:29` is a bare `const`.

**m-7 · Zero automated coverage of any kind.**
`grep -rn "contour-editor\|editor-shell\|control-point\|dblclick" e2e/*.spec.ts` → **0 hits** across
all 8 specs (including `contour-extraction.spec.ts`, which covers extraction but never the editor).
vitest is ABSENT tree-wide (lane-frontend §1 and carry #11). The product's only direct-manipulation
surface has no test at any level. *Falsifier:* name a spec that drives the editor.

**m-8 · Overlay `<image>` lacks error, alt and decode affordances.** `:249-257`. See M-7 for the
state consequence; recorded separately because it is a distinct one-attribute repair
(`@error` + `aria-hidden="true"` + `decoding="async"`).

**m-9 · The interaction grammar is undiscoverable — the component renders no text at all.**
Double-click-to-insert, click-to-select, Delete-to-remove and Cmd+Z are nowhere surfaced.
`grep -rni "double-click\|double click\|dbl-click\|dblclick" web/src/` returns **only this file's own
handler and binding** (`:145`, `:237`) — there is no tooltip, no hint, no empty-state legend, and no
help text anywhere in the tree teaching the grammar. `EditorControlsDock` tooltips cover only its own
buttons. *Falsifier:* find user-facing prose describing point insertion.

---

## §4 · INFO

**i-1 · Zero glass-ui surface = zero F.W1 break sites, and zero chassis.** `grep -c "glass-ui"` → 0.
This file appears in **none** of the ten rows of lane-frontend §5 "Rows that hit fourier-analysis
TODAY" (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2,
`DockDropdownTrigger` ×1, `ToastVariant`, lucide rename, and the three peer floors). Under the
tri-package atomic transaction (glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0, lane-frontend
§5 "THE RESOLUTION DEADLOCK") this component **cannot break**. It consumes only theme custom
properties (`--radius`, `--border`, `--card`, `--foreground`, `--background`) — all of which survive
the export-map diff, since none is a subpath. Recorded as INFO rather than a superlative because the
same fact is the cause of B-1, M-4 and M-5: no chassis means no discipline. See S-1 for the
superlative half.

**i-2 · Two non-null assertions on the hot path.** `:134` `svgRef.value!` and `:138`
`getScreenCTM()!.inverse()`. `getScreenCTM()` returns `null` for an unrendered SVG — and per B-3 this
component is mounted at `opacity: 0` in non-edit mode, where it is rendered (opacity 0 still has a
CTM) but the pathway is reachable from the `window` keymap. Primarily a correctness-axis item;
recorded here only because its design consequence is an unhandled crash in a surface with no error
state (M-7).

---

## §5 · Provenance against the hitherto corpus

| corpus row | this challenge |
|---|---|
| lane-frontend §5, break table (10 rows) | **CONCUR + extend** — this file is on none of them; i-1 quantifies the exemption. |
| lane-frontend §5, ADDED-at-7.0.0 list incl. `./surface` | **NEW USE** — M-5 names the bespoke shell as the `./surface` re-home candidate. |
| lane-frontend §8, "8 `@media (prefers-reduced-motion: reduce)` blocks" + the `GalleryMarquee.vue:126-128` D.W4.c citation | **EXTEND** — M-2 finds a ninth site that needed one and lacks it, plus a tenth (`ImageUpload.vue:159`) out of scope. lane-frontend §8's ⚠ COVERAGE GAP names two rAF clocks; **this CSS keyframe is a third, un-booked, gap.** |
| lane-frontend §8, the `--viz-amber` light-darken carry (`style.css:119-131`) | **SHARPEN** — B-1 shows the carry is routed around by 8 literals in this file (and 1 in `ContourPreview.vue:41`), so landing the upstream token fix alone will **not** repair this surface. |
| lane-frontend §9 carry #9 (reduced-motion gap, P3) | **RE-GRADE ARGUED** — carry #9 covers the two rAF clocks. M-2 adds a CSS-keyframe instance on the editing surface; combined with B-1..B-5 the editor's a11y posture is not P3. |
| lane-frontend §9 carry #11 (no unit-test runner) | **CONCUR + localise** — m-7 measures 0 e2e selectors touching this component. |
| lane-frontend §2 roster ("SVG contour point editor (drag/insert/delete)", 340 LOC) | **CONCUR** — line count and role confirmed; the roster's parenthetical is precisely the surface B-2 shows is keyboard-inoperable. |
| CENSUS-2026-08-03 §1 (pins: glass-ui `^4.0.0` / installed 4.0.0) | **CONCUR** — every token value in B-1/M-4 is read from the *installed* 4.0.0 tree, not the producer. |
| `lane-fourier-r3-r6.md` R4-9 (audited scope byte-identical to the F.W0 tree) | **RELIED ON** — I audited the live tree; R4-9 is why that is the same object. |
| `lane-fourier-r3-r6.md` R3-11 (two Teleports, `FullscreenViewer.vue:105`) | **EXTEND, not contradict** — B-5 shows the Teleport boundary forks this component's state; a callsite registry cannot see instance identity. |
| `lane-fourier-r3-r6.md` R3-10 (six dynamic `:is` families) | **NO OVERLAP** — this file has none (`grep ":is=" ` → 0). |
| `lane-fourier-r3-r6.md` R3-7a (35 Tooltip callsites / 9 consumers → F.W3) | **NO OVERLAP, worth noting** — this component contributes **0** Tooltip callsites, which is m-9's problem restated: it has no tooltips at all. |

---

## §6 · Superlatives (L-18 runs both ways)

### S-1 · The only component in `components/visualization/` that the tri-package uplift cannot break

`grep -c "glass-ui" ContourEditorCanvas.vue` → **0**, against 26 SFCs in the directory of which
lane-frontend §3 shows the great majority import at least `Button`. Under lane-frontend §5's
deadlock — where `keyframes@4.3.0` optional-depends `glass-ui ~4.0.0` and `glass-ui@7` peers
`keyframes ^6` + `value.js ^4`, forcing one atomic transaction — this file has **zero** import
sites, zero removed-subpath exposure, zero removed dock members, and zero `ToastVariant`
dependency. It also has zero `lucide-vue-next` imports, so it escapes the 35-site
`@lucide/vue` rename. In a migration whose budget is "an order of magnitude above 46 lines"
(lane-frontend §5), this component costs **zero**.
*Falsifier:* find any `@mkbabb/*` specifier in the file — there is none; the only external symbols
are Vue, three local modules, and the workspace store. *Counter-weight, stated honestly:* i-1 —
this same isolation is what let B-1, M-4 and M-5 drift.

### S-2 · `stableBounds` — a documented refusal to re-fit the viewBox during a drag

`:47-49`, `:60-68`, `:73`. The naive implementation recomputes bounds from live points, which makes
the entire canvas rescale under the cursor on every `pointermove` — a well-known and nauseating
editor defect that also makes precise placement impossible because the target moves as you approach
it. This author saw it and wrote the guard, and then wrote it down twice: *"Stable bounds — computed
from initial contour, not live points"* (`:47`) and *"use stable bounds for viewBox and image
overlay, live bounds for nothing"* (`:73`). That second comment is doing real work: it forecloses a
future "optimisation" that would reintroduce the bug. This is genuine, deliberate design judgment.
*Falsifier:* show the bounds do update on drag — `initFromContour` (`:67`) is the sole writer and is
called only from the `props.contour` watcher (`:70`) and `resetToExtraction` (`:198`).
*Counter-weight:* M-6 — the decision shipped without its companion headroom/fit affordance.

### S-3 · Aspect-preserving viewBox padding — correct here, and wrong in the sibling

`:79-80` pads each axis by its **own** extent (`padX = width*MARGIN`, `padY = height*MARGIN`), so
both axes scale by the identical factor 1.3 and the data aspect ratio is preserved exactly. The
sibling `ContourPreview.vue:26` derives a single `pad = (maxX - minX) * 0.1` from the **x**-extent
and applies it to **both** axes, which distorts the preview's aspect for any non-square contour
(a 2:1-wide contour is padded 20 % horizontally and 40 % vertically relative to its own height).
The editor is the geometrically correct member of the pair, and it is the one where correctness
matters most, since it is the surface the user drags against.
*Falsifier:* for a square contour the two agree — the divergence is conditional on `w ≠ h`, which is
the common case. Verify by substituting `w = 2h` into both expressions.

### S-4 · `pointercancel` is bound — the constellation's hardest-won pointer lesson, applied

`:240` `@pointercancel="onPointerUp"` alongside `:239` `@pointerup`. Losing a pointer stream to a
browser-initiated cancel (iOS Safari scroll takeover, OS gesture, capture revocation) without
resetting drag state leaves the editor permanently "dragging" — every subsequent `pointermove`
mutates geometry with no button held. The constellation paid for this lesson in value.js
(`ComponentSliders.vue`'s `pointercancel`/`lostpointercapture` handlers, added to recover from
reka-ui slider pointer-capture leaks); it is applied here without being asked.
*Falsifier, and the honest limit:* the hygiene is **2/3 complete** — `lostpointercapture` is **not**
bound (`grep -n "lostpointercapture" ContourEditorCanvas.vue composables/usePointDrag.ts` → 0), and
`onPointerUp` (`usePointDrag.ts:47-53`) never calls `releasePointerCapture`. Implicit release on
`pointerup` covers the common path; an explicit capture revocation does not reach `onPointerUp` at
all. I record this as a superlative with a named gap rather than a defect, because the hard part —
recognising that `pointerup` alone is insufficient — was done.

---

## §7 · Repair ordering for the wave (not a prescription; an ordering argument)

The five blockers are not five independent repairs. **B-3 and M-1 share a fix** (move the listener
from `window` to the already-focusable shell and gate on `isEditing`; the tabindex acquires a purpose
and the route-wide `preventDefault` disappears). **B-1 and M-4 share a fix**
(`hsl(40 90% 55%)` → `var(--viz-amber)`, `var(--background)` → `var(--card)`; five literal
substitutions, no uplift required, and it lands the `style.css:119-131` carry on this surface for
free). **B-4, M-3 and M-4(b) share a fix** — the geometry: `r` must be screen-space, not data-space
(bind it to `1 / scale` or render points in a non-scaling overlay layer), after which the hover and
selected fills become visible and the target-size arithmetic becomes tractable. That leaves **B-2**
(a roving-tabindex point selector with arrow-key nudge) and **B-5** (either bind the fullscreen
instance to the same state or forbid fullscreen while editing) as the only two requiring genuinely
new surface. **None of the five depends on the F.W1 tri-package uplift** — per S-1 this component
imports nothing that moves — so the entire repair can land before, during, or after the transaction
without re-sequencing it.
