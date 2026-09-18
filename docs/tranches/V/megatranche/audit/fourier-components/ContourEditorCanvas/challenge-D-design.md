claude-opus-5[1m]

# CHALLENGE · `ContourEditorCanvas.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourEditorCanvas.vue` (340 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier, stated so a reader can kill it without asking me. *This file supersedes an earlier draft at the same path; §8 lists the five claims that draft got wrong and that the tree refuted on re-derivation. L-18 runs against my own prior text too.*

**Files read whole (read-only):** the subject · `web/src/lib/contourEditing.ts` · `…/composables/useContourHistory.ts` · `…/composables/usePointDrag.ts` · both consumers `VisualizationView.vue` + `FullscreenViewer.vue` · the paired toolbar `EditorControlsDock.vue` · the crossfade sibling `BasisCanvas.vue` (root element) · the geometry sibling `ContourPreview.vue` · `web/src/stores/workspace.ts` (`saveContourPoints`, draft autosave) · `web/src/lib/api.ts` (`overlayUrl`) · `web/src/lib/defaults.ts` · `web/src/lib/draftStorage.ts` · `web/src/style.css` · glass-ui **4.0.0** *installed* token files (`dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`) · `api/dependencies.py` (`image_bounds` coordinate space) · `web/package.json` · `web/e2e/`.

**Hitherto corpus folded, not re-invented:** `formation/fourier/lane-frontend.md` §1 (pin table), §2 (roster), §3 (glass census), §5 (the 4.0.0→7.0.0 break surface + the tri-package deadlock), §8 (reduced-motion table + the `--viz-amber` carry), §9 (carries 6/9/11); `formation/fourier/CENSUS-2026-08-03.md` §1–§3a; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R3-7a, R3-10, R3-11, R4-9, R5-7). Overlaps, extensions and one census correction are cited inline (§6).

**Tally — 31 defects (6 BLOCKER · 10 MAJOR · 12 MINOR · 3 INFO) · 5 superlatives.**

---

## §0 · The one-paragraph verdict

`ContourEditorCanvas` is the product's **only direct-manipulation surface** — every other interactive
component in `components/visualization/` is a dock, a panel, or a read-only canvas. It is one of five
files in that directory with **zero glass-ui imports** (§8 C-1 corrects the earlier draft's
"only"), and that isolation is simultaneously its cheapest property under the F.W1 tri-package
uplift (S-1: zero break sites) and the root cause of most of what follows: with no chassis to
conform to, every surface decision here was re-derived by hand, and each re-derivation diverges from
a law the repo had already written down elsewhere. It hard-codes an amber the repo darkened for
WCAG **six lines away** in its own `style.css`; it runs an ungated `infinite` filter animation in a
tree that carries eight `prefers-reduced-motion` blocks and a wave-tagged precedent for exactly this
fix; it omits the empty-points guard its 62-line sibling has; and it frames itself with a bare
hairline while the component it crossfades with in the *identical* `inset: 0` box wears
`cartoon-card`. Three of the six blockers are structural rather than cosmetic: a pointer-only editing
grammar, a `window`-scoped `preventDefault` keymap that fires route-wide, and — the one the earlier
draft missed — **a drag path that never emits `stateChange`, which leaves the Undo control disabled
after the primary operation and leaves a "saved" checkmark showing over unsaved geometry.**

---

## §1 · BLOCKERS

### B-1 · Light-mode non-text contrast is 1.43 : 1 — and the repo already shipped the fix, in the same cascade

**Severity BLOCKER · WCAG 2.2 SC 1.4.11 Non-text Contrast (AA)**

**Provenance.** Eight occurrences of one raw literal, zero uses of a token —
`ContourEditorCanvas.vue:261` (`stroke="hsl(40 90% 55% / 0.85)"`), `:307` (`fill: …/0.6`), `:308`
(`stroke:` opaque), `:315` (hover `…/0.5`), `:319`, `:328`, `:329` (drop-shadows), `:333` (selected
fill). Verified: `grep -o "hsl(40 90% 55%" … | wc -l` → **8**. The surface behind them is
`:292-296` `background: …, var(--card)`. Installed glass-ui 4.0.0 light `--card` = `hsl(36 48% 97%)`
(`dist/styles/tokens/color-radius.css:72`).

**Measurement** (sRGB relative luminance, WCAG 2.x, alpha composited over the actual surface):

| mark | line | contrast vs light `--card` | required |
|---|---|---:|---:|
| spline stroke `…/0.85` | `:261` | **1.66 : 1** | 3 : 1 |
| control-point fill `…/0.6` | `:307` | **1.43 : 1** | 3 : 1 |
| control-point fill on hover `…/0.5` | `:315` | **1.35 : 1** | 3 : 1 |
| control-point stroke, opaque | `:308`, `:333` | **1.81 : 1** | 3 : 1 |

**Method calibration, stated so the numbers can be checked.** I re-derived the repo's *own*
published figures with the same routine before trusting mine. `style.css:113-118` asserts glass-ui's
light amber "≈ 3.54 : 1 against `--background`". At the pin that token is
`--viz-amber: var(--section-color-5)` (`color-radius.css:266`) `= oklch(0.623 0.124 69.6)`
(`:246`) — which converts to sRGB `[182, 120, 32]`, **bit-identical** to the comment's
`hsl(35 70% 42%)`. My routine returns **3.552 : 1** against light `--background` (repo: ≈3.54, 0.3 %
agreement). The comment's darkened override `hsl(35 76% 35%)` returns **4.709 : 1** against
`--background` and **4.625 : 1** against `--card` (repo: ≈4.6). The table above is produced by that
same routine.

**Why BLOCKER, not MINOR: the remediation is already in the tree and this file routes around it.**
`style.css:113-127` is a wave-tagged fix — *"D.W4.d — light-mode `--viz-amber` darken (axe contrast
carry)"* — that overrides `--viz-amber` **and** `--section-color-5` to `hsl(35 76% 35%)` precisely
because the glass-ui light value failed AA. `ContourEditorCanvas` bypasses it eight times with a
literal (and `ContourPreview.vue:45` a ninth time). The control points and spline are not
decoration: they are *the* UI of an editor and the only indication of what is selected, what is
draggable, and where the curve runs.

**Falsifier.** (a) Show light `--card` ≠ `hsl(36 48% 97%)` at the pin — `color-radius.css:72` and
`light-dark.css` say it is. (b) Claim the 1.4.11 "pure decoration" exception — it cannot apply,
because `:332-334` uses **colour alone** to encode *selection state*. (c) Show the app never renders
light — `index.html:22-32` is a pre-paint bootstrap defaulting to light absent a stored preference
(lane-frontend §1) and `DarkModeToggle.vue` exists to switch it.

**Dark mode PASSES and I say so.** Opaque amber vs dark `--card` `hsl(24 8% 16%)`
(`dark-arm.css:64`) = **7.61 : 1**; the `…/0.85` spline = **5.92 : 1**. The failure is light-only,
which is exactly why `var(--viz-amber)` (light `hsl(35 76% 35%)` / dark `hsl(37 73% 67%)`,
`style.css:119-127`) is the correct one-token fix and a flat darkening is not.

---

### B-2 · The editing grammar is 100 % pointer-only — no keyboard path exists to select, insert, or move a point

**Severity BLOCKER · WCAG 2.2 SC 2.1.1 Keyboard (A)**

**Provenance.** Control points are `<circle>` elements (`:266-278`) with exactly one interactive
binding: `@pointerdown="onPointPointerDown(i, $event)"` (`:277`). No `tabindex`, no `role`, no
`aria-label`, no `keydown`. Measured: `grep -c "aria-\|role=" ContourEditorCanvas.vue` → **0**.
Insertion is `@dblclick` on the SVG (`:237` → `onDblClick`, `:145-152`). Movement is
`usePointDrag.ts:15-23`, `pointerdown` + `setPointerCapture` only.

| primitive operation | pointer path | keyboard path |
|---|---|---|
| select a point | `pointerdown` on `<circle>` (`:277`) | **NONE** |
| move a point | drag (`usePointDrag.ts:25-52`) | **NONE** |
| insert a point | `dblclick` (`:237`) | **NONE** |
| delete a point | `Delete`/`Backspace` (`:165`) or dock button | requires prior selection ⇒ **NONE** |

The `EditorControlsDock` does not rescue it. Its delete button is `:disabled="!canDelete"`
(`EditorControlsDock.vue:97`), and `canDelete` is `selectedIdx.value !== null`
(`ContourEditorCanvas.vue:127`) — which only a pointer can set. Smooth / simplify / reset / undo /
redo / save are reachable, so a keyboard user can *transform the entire contour* but can never touch
a point. That is a bulk-operations panel bolted to an inoperable editor.

**Falsifier.** Produce any keyboard-reachable path that sets `selectedIdx` or mutates one point.
`grep -n "keydown\|keyup\|keypress\|tabindex\|role=" ContourEditorCanvas.vue` yields only `:210`
(the `window` listener, which *reads* `selectedIdx` and never writes it) and `:231` (`tabindex="0"`
on the shell — bound to nothing, per M-1). A second falsifier would be a documented "essential"
exemption; none exists in `web/DESIGN.md` or the wave docs.

---

### B-3 · A `window`-scoped keymap calls `preventDefault()` with no target, focus, or mode guard — it swallows `Backspace` inside a live `<input type="number">` and destroys a contour point instead

**Severity BLOCKER · destructive + SC 2.1.4-adjacent (shortcut capture)**

**Provenance.** `:209-211` registers `onKeyDown` on **`window`**; `:213-215` removes it on unmount.
`onKeyDown` (`:164-177`) calls `e.preventDefault()` on three branches (`:166`, `:170`, `:174`) and
inspects **neither `e.target`, nor `document.activeElement`, nor whether the editor is the active
mode**. The component has no `isEditing` prop (`:18-22` declares exactly three: `contour`,
`imageSlug`, `showImageOverlay`), so it *cannot* self-gate.

**The listener's lifetime is longer than the mode.** `VisualizationView.vue:203` mounts the editor
under `v-if="store.contour"` and hides it with a **class**: `:class="{ 'is-hidden': !isEditing }"`.
`VisualizationView.vue:404-409` defines `is-hidden` as `opacity: 0; z-index: 0; pointer-events:
none` — **not `display: none`**. The component therefore stays mounted, and its `window` listener
stays live, for the entire lifetime of a loaded contour, in *every* mode.

**The concrete failure.**

1. Enter edit mode, click a control point → `selectedIdx = 3` (`usePointDrag.ts:18`).
2. Leave edit mode (`CanvasControlsDock` `@toggle-edit`, `VisualizationView.vue:220`). **`deselect()`
   is never called on mode exit** — its five call sites are `initFromContour` (`:57`), `doUndo`
   (`:113`), `doRedo` (`:119`), `onBgClick` (`:160`), `deleteSelected` (`:182`). `selectedIdx`
   survives at `3`.
3. The `!isEditing` panel renders `BasisSelector`, which carries `<input type="number"
   aria-label="Harmonics">` (`BasisSelector.vue:157-168`) and `<input type="number"
   aria-label="Sample Points">` (`:184-195`).
4. The user types `200` into Harmonics, then presses **Backspace** to fix a digit.
5. `onKeyDown` fires on `window`; `selectedIdx !== null` is true; `e.preventDefault()` runs — the
   digit is **not** deleted — and `deleteSelected()` (`:179-185`) **splices a point out of the
   contour**, pushes history, and emits `stateChange`.

The user sees a text field that refuses Backspace and does not see the geometry mutate, because the
editor sits at `opacity: 0`.

**The undo branch is worse: it has no guard at all.** `:169` and `:173` are gated on nothing but the
keystroke. `Cmd/Ctrl+Z`, `Cmd/Ctrl+Shift+Z` and `Cmd/Ctrl+Y` are `preventDefault`-ed **anywhere on
the `/w` and `/v` routes whenever a contour is loaded** — including inside both number inputs, and
inside `UserSlugBar.vue:129` and `GallerySearchBar.vue:48`. Native text-undo is dead route-wide, and
each press instead rewinds the invisible contour-history stack.

**Falsifier.** Show a guard I missed — the whole handler is `:164-177`: no `if (!isEditing)` (there
is no such prop), no `e.target instanceof HTMLInputElement`, no
`el.contains(document.activeElement)`, and the target is literally `window` (`:210`). Or show
`is-hidden` unmounts the component — `VisualizationView.vue:404-409` says it does not. Or show mode
exit deselects — five `deselect` call sites, none on a mode/prop watcher.

**Fix shape (for the wave):** bind the listener to the shell element, which *already* has
`tabindex="0"` (`:231`), and gate on an `isEditing` prop. That single move also repairs M-1's dead
tab stop by giving the tabindex a purpose.

---

### B-4 · Control-point hit targets are ≤ 9 CSS px and overlap each other several-fold at the shipped defaults — 24 px is unreachable at any viewport, by arithmetic

**Severity BLOCKER · WCAG 2.2 SC 2.5.8 Target Size (Minimum) (AA)**

**Provenance.** `:273` `:r="3.5"` — a radius in **user (data) units**. `:274`
`vector-effect="non-scaling-stroke"` normalises the **stroke only**; SVG 2 defines `vector-effect`
over stroke geometry, so `r` still scales with the viewBox. `:309` `stroke-width: 2.5` therefore
renders at a fixed **2.5 CSS px** while the disc shrinks with the data extent. The viewBox is
`1.3 ×` the bbox on each axis (`:77-83`, `MARGIN = 0.15` at `:29`).

**The data space is pixels, not normalised units.** `api/dependencies.py:150-161` computes
`image_bounds` as `{minX: -rw/2, maxX: rw/2, minY: -rh/2, maxY: rh/2}` with `resize = 1024`
(`:151`), and `lib/defaults.ts:5` ships `resize: 1024` client-side. The overlay `<image>` is placed
at those same coordinates in the same SVG space as the points (`:245-255`), so the points are in
that pixel space too. Contour extents are **hundreds of units wide**, not ~1.

**Arithmetic.** Let `w` = contour bbox width in units, `W` = stage width in CSS px. Under
`preserveAspectRatio="xMidYMid meet"` (`:235`) the scale is `s = min(W/(1.3w), H/(1.3h))`, so
**`s ≤ W/(1.3w)` always** — every figure below is therefore an *upper bound* on the target and the
failure is conservative.

- rendered disc radius `= 3.5 s`
- the 2.5 px stroke straddles the edge, covering `r ∈ [3.5s − 1.25, 3.5s + 1.25]`
- outer target diameter `= 2(3.5 s + 1.25)`

| condition | closed form | required stage `W` at `w = 1024` | at `w = 600` |
|---|---|---|---|
| outer target ≥ 24 px (SC 2.5.8) | `s ≥ 3.071` | **≥ 4089 px** | **≥ 2396 px** |
| fill ≥ half the mark's area | `s ≥ 2.08` | ≥ 2771 px | ≥ 1623 px |
| stroke swallows the fill entirely | `s ≤ 0.357` | ≤ 475 px (every phone) | ≤ 279 px |

At a realistic desktop stage (`W ≈ 700`): `w = 1024 → s ≤ 0.526`, disc radius ≤ **1.84 px**, outer
target ≤ **6.2 px**; `w = 600 → s ≤ 0.897`, outer target ≤ **8.8 px**. On the mobile "Canvas" tab
(`VisualizationView.vue:181-186`, `W ≈ 390`) the fill is entirely occluded by its own stroke.

**The SC 2.5.8 spacing exception does not rescue it.** `lib/defaults.ts:8` ships `n_points: 1024`. A
contour of bbox width 1024 has perimeter on the order of 2500–3200 units, so adjacent points sit
≈ 2.5 units ≈ **1.3 CSS px** apart at `s = 0.526` — against a 6.2 px mark. Points overlap roughly
fourfold; the 24 px undisturbed-circle test fails by more than an order of magnitude, and in
practice a click near the curve cannot address a *specific* point at all.

**Falsifier.** (a) Show `vector-effect="non-scaling-stroke"` normalises `r` — it does not, per SVG 2;
and if it did, `:311`'s `transition: … r 0.15s` would be animating a screen-space value the author
never changes. (b) Show contour coordinates are normalised to ~1 — `api/dependencies.py:156-160` and
`lib/defaults.ts:5` say pixels; and were they normalised, the same arithmetic makes `r = 3.5`
**larger than the whole viewBox**, i.e. broken in the other direction. (c) Produce a live
measurement contradicting the closed form — the exact px figure is
**UNPROVEN-NEEDS-LIVE (SS-13)**, but the inequalities are scale-free and hold for all `w, W > 0`.

**Compounding.** B-4 is the mechanism that makes M-3 and M-4(b) no-ops: the hover rule (`:314-316`)
and the selected rule (`:332-334`) both act on the **fill**, which B-4 proves is the occluded
minority of the mark at every realistic viewport.

---

### B-5 · Fullscreen edit mode is a silent dead-end: a second instance, a second `window` listener, no toolbar, and edits that can never be saved

**Severity BLOCKER · state coverage + destructive data loss**

1. **Two live instances.** `VisualizationView.vue:203-207` keeps the inline editor mounted whenever
   `store.contour` exists (B-3). `FullscreenViewer.vue:115-120` mounts a **second**
   `ContourEditorCanvas` under `v-if="isEditing && contour"`. `FullscreenViewer` is always in the
   tree (`VisualizationView.vue:282`, no `v-if`); its inner `v-if="show"`
   (`FullscreenViewer.vue:107`) flips with `visible`.
2. **Two `window` keydown listeners.** Each instance runs `:209-211`. With both mounted, one `Cmd+Z`
   invokes `doUndo()` **twice** — once per instance, over two independent history stacks
   (`useContourHistory.ts:5-6` creates fresh `history`/`historyIndex` refs per invocation). One
   keystroke, two divergent rewinds, one of them invisible.
3. **No toolbar in fullscreen.** `FullscreenViewer.vue:130` gates the control rail on
   `v-if="!isEditing"`. In fullscreen *edit* mode there is therefore **no** undo, redo, smooth,
   simplify, delete, magnet, reset or save — the entire `EditorControlsDock` is absent — and by B-2
   there is no keyboard substitute.
4. **Edits are unreachable and discarded.** `VisualizationView.vue:92-96` saves via
   `editorRef.value.getPoints()`, and `editorRef` is bound at `:204` to the **inline** instance only.
   The fullscreen instance has no `ref`, no `@state-change` binding, and no path to
   `store.saveContourPoints`. Every point dragged in fullscreen is destroyed on close — no warning,
   no dirty indicator, no confirm.

**Falsifier.** Show the fullscreen instance is `ref`-ed or emits upward —
`FullscreenViewer.vue:115-120` passes exactly three props and binds no `ref`, no listener. Show the
toolbar renders — line `130` is `v-if="!isEditing"`. Show one listener attaches — `onMounted` is
per-instance (`:209`). Show the histories are shared — `useContourHistory` is invoked at `:41`
inside `<script setup>`, i.e. once per instance.

**Relation to the hitherto corpus, stated explicitly.** `lane-fourier-r3-r6.md` **R3-11** adopts as
fact that the tree has exactly two `<Teleport>` sites, one of them `FullscreenViewer.vue:105`
(live-confirmed). That row treats the Teleport as a structural fact. It is also the boundary across
which *this component's state is silently forked* — a consequence a callsite registry cannot see,
because it censuses callsites, not instance identity. **I am not contradicting R3-11**; I am
recording that its fact has a design consequence in the same blind-spot family that R5-7 books
("the deriver is blind to native template loops").

---

### B-6 · The drag path never emits `stateChange` — so Undo is disabled after the primary operation, and the "saved" checkmark persists over unsaved geometry

**Severity BLOCKER · false persistence indicator → silent data loss + state coverage**
*(missed by the earlier draft; see §8 C-5)*

**Provenance — one missing call.** Every mutation in this component re-emits toolbar state except
the most common one:

| mutation | emits `stateChange`? | line |
|---|---|---|
| insert (dblclick) | ✔ `emitState()` | `:151` |
| select (pointerdown) | ✔ wrapped `onPointPointerDown` | `:154-157` |
| delete | ✔ | `:184` |
| smooth / simplify | ✔ | `:191`, `:198` |
| undo / redo | ✔ | `:114`, `:120` |
| background click | ✔ | `:161` |
| **drag a point (`pointerup`)** | **✘ — none** | `:239-240` |

`:42-47` destructures `onPointerUp` from `usePointDrag` **unwrapped** — note the contrast with
`rawPointPointerDown` on the same line, which *is* wrapped precisely to add `emitState()`. The
template binds the raw function (`:239` `@pointerup="onPointerUp"`, `:240` `@pointercancel`), and
`usePointDrag.ts:54-60` calls only `onDragEnd` (`:56`) — which is `pushHistory`, bound as the fourth
argument at `ContourEditorCanvas.vue:46`. History advances; the parent is never told.

**Consequence (a) — the Undo control lies.** After the first drag, `useContourHistory`'s
`historyIndex` is `1`, so `canUndo()` is `true` — but `editorState.canUndo` in the parent
(`VisualizationView.vue:79, 87-90`) is still `false`, so `EditorControlsDock.vue:74`
(`:disabled="!canUndo"`) renders Undo **disabled**. The only way to undo the editor's primary
operation is `Cmd+Z` — which per B-2 is unavailable to keyboard-only users for *selecting* anything
and per B-3 is the route-wide `preventDefault` hazard. The bug self-heals on the next click (which
emits), which is why it survives casual use: it is broken exactly on the *drag-then-undo* path.

**Consequence (b) — the "saved" state is falsely sticky.** `VisualizationView.vue:87-90`
(`onEditorStateChange`) is the *only* writer that clears `editorSaved`, and `:92-96` sets it true
after a successful save. So: Save → ✔ shown (`EditorControlsDock.vue:63,166` swap `Save` for `Check`;
`:210-212` tints it `var(--success)`) → **drag any point** → no emit → **the ✔ remains**. The dock
now asserts "saved" over geometry that exists only in component-local state.

**And nothing else catches the loss.** The workspace store's draft autosave watches
`[contourSettings, animationSettings]` only (`stores/workspace.ts:108`) — the editor's `points` live
in component state and are observed by nobody except the left-panel preview
(`VisualizationView.vue:257` `:points="editorRef?.points"`, which *does* update live, proving
reactivity reaches the parent and that only the state-emit channel is broken). There is **no**
`beforeunload` prompt and **no** route-leave guard: `grep -rn "beforeunload\|onBeforeRouteLeave"
src/` returns exactly one hit, `lib/draftStorage.ts:108`, which merely closes an IndexedDB handle.
Toggle out of edit mode, navigate, or reload, and the edits are gone silently — while the last thing
the user saw was a green ✔.

**Falsifier.** Show `onPointerUp` is wrapped — `:42-47` destructures it directly and `:239-240` bind
it directly; compare `rawPointPointerDown` on `:42`, which *is* aliased and wrapped at `:154-157`.
Show something else clears `editorSaved` — `grep -n "editorSaved" VisualizationView.vue` → three
sites: declaration `:81`, cleared only in `onEditorStateChange` `:89`, set in `onEditorSave` `:95`.
Show the points are autosaved — `_saveDraftNow` (`stores/workspace.ts:93-106`) serialises
`contour.value`, i.e. the *store's* contour, never the editor's working `points`.

---

## §2 · MAJOR

### M-1 · An invisible, unlabelled, permanently-focusable tab stop that does nothing

**Severity MAJOR · SC 2.4.7 Focus Visible (AA) + SC 2.4.3 Focus Order (A)**

`:231` `<div class="editor-shell" tabindex="0">` — focusable. `:291` `outline: none` — with **no**
`:focus-visible` replacement anywhere in the file (`grep -n "focus" ContourEditorCanvas.vue` → 0).
`style.css:136-143` supplies global focus rings for exactly four classes (`.sidebar-link`,
`.floating-toc-item`, `.callout-btn`, `.gallery-card`); `.editor-shell` is not among them, and the
block's own comment (`:129-135`) enumerates the four scoped-styled components it covers.

Worse, per B-3 the shell persists at `opacity: 0` when `!isEditing`
(`VisualizationView.vue:404-409`). `opacity: 0` does **not** remove an element from the tab order —
only `display: none`, `visibility: hidden` or `inert` do. Keyboard users therefore hit a dead stop on
a fully transparent region in *non-edit* mode; the same rule's `pointer-events: none` blocks the
mouse but not Tab. And the tabindex buys nothing, because the keymap is bound to `window` (`:210`),
not to this element. It is a pure tax.

**Falsifier.** Show a focus style reaching `.editor-shell`; show `opacity: 0` removes tab stops (it
does not); show the shell is `inert`/`aria-hidden` when hidden — neither attribute appears at
`VisualizationView.vue:203` or `ContourEditorCanvas.vue:231`.

*(L-18 both ways: `--ring` exists at the pin — light `hsl(24 10% 10%)` `color-radius.css:102`, dark
`hsl(48 10% 70%)` `dark-arm.css:90` — and the repo has a canonical ring recipe. The fix is three
lines and needs no uplift.)*

---

### M-2 · An ungated `infinite` animation on the work surface, in a tree with eight `prefers-reduced-motion` blocks and a wave-tagged precedent

**Severity MAJOR · SC 2.3.3 Animation from Interactions (AAA) + violation of the repo's own D.W4.c law**

`:323-330`:
```css
.editor-svg:hover .spline-path { animation: golden-shimmer 1.2s ease-in-out infinite; }
@keyframes golden-shimmer { 0%,100% { filter: drop-shadow(0 0 2px …) } 50% { filter: drop-shadow(0 0 5px …) } }
```

**Measured absence.** `grep -c "prefers-reduced-motion\|reducedMotion" ContourEditorCanvas.vue` → **0**.

**Measured precedent.** `grep -n "infinite" components/visualization/*.vue` returns exactly three:
`AnimationControls.vue:176` — **guarded** (`@media (prefers-reduced-motion: reduce)` at `:178`);
`ImageUpload.vue:159` — unguarded (a second instance of the same gap, out of scope here);
`ContourEditorCanvas.vue:324` — **unguarded**. lane-frontend §8 enumerates eight `reduce` blocks and
names the governing wave: `GalleryMarquee.vue:126-128` cites *"D.W4.c — prefers-reduced-motion guard.
WCAG 2.3.3 / A3 #9 finding."* This file is a post-hoc violation of a law the repo wrote for itself.

**Design aggravation independent of a11y.** The trigger is `.editor-svg:hover`, and the SVG is
`width: 100%; height: 100%` (`:299-301`), filling the shell — so the pulse fires on *any* pointer
presence anywhere over the editor and never stops while the cursor is inside. During precision
point-dragging the entire path breathes continuously in peripheral vision. Motion this persistent
belongs on an idle/hero surface, not a work surface.

**Structural aggravation.** `:319` sets `transition: filter 0.2s ease` on the same element the
keyframes drive; both target `filter`, so the animation governs while running and the transition
governs the snap-back — hover-in and hover-out are asymmetric. The animated property is
`drop-shadow`, forcing repaint of a path whose `d` carries one cubic segment per point
(`closedSplinePath`, `contourEditing.ts:26-42`) — 1024 at the shipped `n_points`. Cost is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the structure is statically certain.

**Falsifier.** Show a `reduce` block I missed (count is 0), or show `golden-shimmer` is guarded
upstream — it is defined locally at `:327-330`. (`lib/golden-shimmer.ts` is an unrelated *canvas
alpha* helper consumed by `BasisCanvas.vue:168`; the name collision is m-4's cousin.)

---

### M-3 · The hover affordance is inverted — hovering makes a control point *less* visible

**Severity MAJOR · affordance / Aristotelian proportion**

`:307` resting `fill: hsl(40 90% 55% / 0.6)` → `:315` hover `fill: hsl(40 90% 55% / 0.5)`. Alpha
**decreases**. Against light `--card` that drops the fill from **1.43 : 1 to 1.35 : 1** — hover
pushes an already-failing mark further toward invisibility. Nothing else changes: `:311` transitions
only `fill` and `r`; `r` never changes (m-1); the stroke is untouched; there is no scale, no halo,
and no cursor change beyond the shell-wide `cursor: crosshair` (`:303`) plus `cursor: grab` on the
point (`:310`).

And by B-4 the changed property is the *occluded* one: at any realistic stage the 2.5 px non-scaling
stroke covers `r ∈ [3.5s − 1.25, 3.5s + 1.25]`, leaving a sub-pixel fill core. **The component's only
per-point hover feedback is a change to the part of the mark the user cannot see.**

**Falsifier.** Show another hover cue — `grep -n ":hover" ContourEditorCanvas.vue` returns exactly
two rules, `:314` (this) and `:323` (the shimmer, which fires on the SVG, not the point, and so
cannot distinguish *which* point is hovered). Show `0.5 > 0.6`. Show the stroke does not occlude the
fill — B-4's `s ≥ 2.08` requires a 2771 px stage at `w = 1024`.

---

### M-4 · Selection is anti-legible: the wrong surface token, and a ring wider than the disc it rings

**Severity MAJOR · state legibility + token conformance**

`:332-334` — `.control-point.selected { fill: hsl(40 90% 55%); stroke: var(--background); }`

*(a) Wrong token.* The shell's surface is `var(--card)` (`:295`), not `var(--background)`. The
"cut-out ring" idiom only reads if the ring matches the surface behind it. At the pin they differ:

| arm | `--background` (`= --neutral-0`) | `--card` | contrast between them |
|---|---|---|---|
| light | `hsl(40 30% 98%)` (`color-radius.css:40,57`) | `hsl(36 48% 97%)` (`:72`) | **1.02 : 1** — imperceptible |
| dark | `hsl(24 9% 4%)` (`dark-arm.css:42`) | `hsl(24 8% 16%)` (`:64`) | **1.36 : 1** |

In dark mode the selected point is ringed in a near-black band that reads as a drop shadow, not a
cut-out — the opposite of the intent. The correct token is `var(--card)`, one word away.

*(b) The ring dominates the mark.* By B-4's geometry the 2.5 px stroke covers
`r ∈ [3.5s − 1.25, 3.5s + 1.25]` while the fill occupies `r ≤ 3.5s − 1.25`. At `s = 0.526` the ring
is ≈ **85 % of the mark's area** and the amber core is sub-pixel. So "selected" is communicated
almost entirely by the ring colour — which per (a) is the wrong colour and, in light mode, is within
1.02 : 1 of the surface. **The single most important state in a point editor is encoded in the least
legible channel of the smallest mark on the canvas.**

**Falsifier.** Show `--background === --card` at the pin — four token lines say otherwise in both
arms. Show `.selected` changes anything besides `fill` and `stroke` — `:332-334` is three lines.
Show the fill dominates — B-4.

---

### M-5 · Chassis divergence from the component it crossfades with, in the identical box

**Severity MAJOR · glass-ui / design-system conformance under the old pin**

`VisualizationView.vue:392-403` places `.canvas-container` and `.editor-shell` at
`position: absolute; inset: 0` in the same stage slot and crossfades them at
`opacity var(--duration-mid, .24s)`. They are, by construction, the same rectangle.

- `BasisCanvas.vue:521` — `class="canvas-container cartoon-card"`
- `ContourEditorCanvas.vue:288-296` — bespoke: `border-radius: var(--radius)`, `border: 1px solid
  var(--border)`, plus a hand-rolled two-gradient dot lattice

`style.css:107-111` defines `cartoon-card` as `@apply cartoon-surface` + `--border` + `--card` —
a **2 px** border with an offset stamp shadow and a hover-lift (the shim re-binds the recipe glass-ui
removed at C.W5; its comment at `:98-106` counts 14 application sites across 13 files). Toggling edit
mode therefore crossfades a 2 px stamped frame into a 1 px hairline with no shadow: the frame
**weight changes** during a transition the source itself annotates as *"a pure opacity crossfade with
no layout shift"* (`VisualizationView.vue:390-391`). This editor is the only stage surface in the
product that opts out of the product's own card idiom.

**Falsifier.** Show the wrapper supplies `cartoon-card` — `VisualizationView.vue:203` is
`class="editor-shell"` with no card class, and `:392-403` sets only layout/opacity. Show the
fullscreen path equalises them — `FullscreenViewer.vue:163-170` strips border, radius and shadow from
**both** via `:deep()`, which proves the author knew the two chassis differ and normalised them in
*one* of the two mounts only.

**Uplift note (F.W1).** glass-ui 7.0.0 **adds** `./surface` (lane-frontend §5, ADDED list). The
bespoke shell is the natural re-home — one of the few places in this tree where the uplift is an
*improvement opportunity* rather than a break. Cite alongside lane-frontend carry #6.

---

### M-6 · `stableBounds` never grows: a dragged point can leave the canvas permanently, with no zoom, pan, scroll, or indication

**Severity MAJOR · state coverage / recoverability**

`:49-50` and `:59-67` compute the bbox **once** from the initial contour; `:74-75` fixes
`bounds = stableBounds` with the comment *"live bounds for nothing."* `viewBox` (`:77-82`) adds a flat
`MARGIN = 0.15` (`:29`) per axis. `.editor-shell` is `overflow: hidden` (`:290`). There is no zoom
and no pan: `grep -n "zoom\|pan\|scale(" ContourEditorCanvas.vue` returns only the fixed
`scale(1,-1)` flip at `:243` and the image counter-flip at `:252`.

Drag any point more than 15 % of the bbox extent beyond the original box and it is clipped away.
Pointer capture (`usePointDrag.ts:22`) means the drag *continues* off-canvas, so a point can be
released arbitrarily far outside the visible frame; the magnet (default **3**, `:38`) drags six
neighbours with it. There is no scrollbar, no "fit" control (`EditorControlsDock` has none), and no
indication that geometry exists outside the frame. The only recovery is `Cmd+Z` — which per B-6 is
the *only* undo path after a drag, per B-3 is route-wide, and per B-5 doubles in fullscreen.

**Falsifier.** Show a re-fit path — `initFromContour` is the sole writer of `stableBounds` (`:67`)
and runs only on the `props.contour` watcher (`:72`) or `resetToExtraction` (`:201-203`), never on
drag. Show a zoom/pan affordance — none exists here or in `EditorControlsDock.vue`.

**I am not calling the stable-bounds decision wrong** — see S-2; it is the right call. The defect is
that it shipped without its necessary companion (headroom, a fit control, or clamping).

---

### M-7 · No empty, loading, or error state — and the 62-line sibling proves the author knew the guard was required

**Severity MAJOR · state coverage**

**Empty.** `initFromContour` (`:53-70`) seeds `minX = Infinity, maxX = -Infinity, …`. With
`contour.points.x = []` the loop never runs, so `width = (-Infinity) - (Infinity) || 1` →
**`-Infinity`** — truthy, so the `|| 1` fallback does **not** fire. `viewBox` (`:77-82`) then
evaluates to **`"Infinity Infinity -Infinity -Infinity"`** (term-by-term:
`minX − padX = Infinity − (−Infinity) = Infinity`; `−(maxY + padY) = −(−Infinity) = Infinity`;
`width + 2padX = −Infinity`; `height + 2padY = −Infinity`) — a malformed value the UA discards,
collapsing the projection. No message, no placeholder, no fallback. *(§8 C-2 corrects the earlier
draft's second term.)*

**The sibling has the guard.** `ContourPreview.vue:12` returns `""` for `pts.length < 3`, and `:18`
returns the sentinel viewBox `"0 0 1 1"` for `pts.length < 2`. Both files were written against the
same `closedSplinePath`. **The read-only preview is defended; the editor is not.**

**Loading / error.** `:245-255` renders `<image :href="overlayHref" …>` with no `@error`, no
placeholder, no `alt`/`aria-hidden`, and no decoding hint. `overlayUrl` (`api.ts:296-298`) is a plain
network URL; a 404 or slow fetch produces a silently blank underlay while `showImageOverlay` still
reads "on" in the dock (`EditorControlsDock.vue:147-151`). The user is told the overlay is enabled
and shown nothing. `:253` also pins `opacity: 0.28` with no user control, on a layer whose entire
purpose is registration against the source image.

**Falsifier.** Show a parent guard — `VisualizationView.vue:203` guards `store.contour` for
null/undefined only, not for empty `points.x`; `FullscreenViewer.vue:116` guards truthiness only.
Show `-Infinity || 1` yields `1` — it does not. Show the `<image>` has error handling — `:245-255` is
nine attributes, none of them an error path.

*(Reachability of a zero-point contour is **UNPROVEN-NEEDS-LIVE (SS-13)**; the arithmetic and the
sibling-guard contradiction are static and hold regardless.)*

---

### M-8 · Double-clicking an existing control point silently inserts a coincident duplicate

**Severity MAJOR · direct-manipulation grammar / silent geometry corruption**
*(missed by the earlier draft)*

`@dblclick="onDblClick"` is bound on the **`<svg>`** (`:237`), and control points are `<circle>`
children of a `<g>` inside it (`:266-278`). `usePointDrag.ts:17` calls `stopPropagation()` on
**`pointerdown` only** — `dblclick` is a separate event that bubbles from the circle to the SVG
unimpeded. So the single most natural gesture on a manipulable node — double-click it — runs
`onDblClick` (`:145-152`), which computes the click position, finds the nearest segment, and
**splices a new point in at essentially the same coordinates**.

Consequences: a duplicate point at zero distance; a zero-length segment fed to `closedSplinePath`
(`contourEditing.ts:26-42` emits a degenerate `C` command for it); `pointCount` silently increments;
and any subsequent `nearestSegmentIndex` call hits the `lenSq === 0` branch
(`contourEditing.ts:66`), which is defended arithmetically but confirms the degenerate case is
reachable by design. Nothing tells the user; the only recovery is undo, which per B-6 is disabled in
the dock after a drag.

**Falsifier.** Show the circle stops `dblclick` — `:277` binds only `@pointerdown`, and
`usePointDrag.ts:15-23` stops only that event. Show `onDblClick` rejects clicks near an existing
point — `:145-152` has no proximity test; it always splices. Show the browser suppresses `dblclick`
after `setPointerCapture` — capture is set on the circle (`usePointDrag.ts:22`) and released
implicitly at `pointerup`, which does not cancel the click sequence.

---

### M-9 · Magnet mode is ON by default, moves six points per drag, and has zero canvas-side indication

**Severity MAJOR · visibility of system status / hidden mode**
*(missed by the earlier draft)*

`:37-38` — `const magnetRadius = ref(3); // 0 = off, 1-10 … ; default on`. In `usePointDrag.ts:35-49`
a radius of 3 moves the **three preceding and three following** points with a linear falloff
(`1 - offset/(radius+1)` → 0.75 / 0.5 / 0.25). So the default behaviour of the editor's primary
gesture is that **seven points move when the user grabs one** — and the canvas renders no indication
whatsoever: no radius halo, no affected-point highlight, no falloff preview. `:276` styles exactly
one point differently (`selected`), and the magnet neighbours are not it.

The mode's *only* indicator is in a different component and is usually not on screen:
`EditorControlsDock.vue:106` tints the magnet glyph `text-viz-fourier` when `magnetRadius > 0`, but
that glyph lives in the **expanded** dock, and the dock is configured `:start-collapsed="true"` with
`:collapse-delay="2000"` (`EditorControlsDock.vue:56`) — whose collapsed template (`:58-69`) shows
only a wand glyph, a point count, and Save. A user who never expands the dock has no way to learn
that a hidden 6-neighbour falloff is deforming their curve. *(Exact collapse timing is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the prop values and the collapsed template are static.)*

**Falsifier.** Show a canvas-side magnet affordance — `grep -n "magnet" ContourEditorCanvas.vue`
returns `:37`, `:38`, `:44`, `:226`, none of which render anything. Show the default is off — `:38`
is `ref(3)` and the comment says "default on". Show fewer than six neighbours move —
`usePointDrag.ts:36-48` loops `offset = 1..radius` and writes **both** `before` and `after` each
iteration.

---

### M-10 · Saving resets the editor: undo history cleared, selection dropped, viewBox re-derived — and the saved indicator races it

**Severity MAJOR · state coverage / recoverability**
*(missed by the earlier draft)*

`stores/workspace.ts:263-283`: `saveContourPoints` awaits `api.saveContour(...)` then assigns
**`contour.value = markRaw(result)`** (`:272`) — a *new object identity*. That fires this component's
`watch(() => props.contour, initFromContour, { immediate: true })` (`:72`), which:

- replaces `points` from the server's response (`:54-55`) — if the backend resamples or reorders, the
  user's exact geometry is silently substituted;
- calls `initHistory(pts)` (`:56`), which **resets `history` to a single entry and `historyIndex` to
  0** (`useContourHistory.ts:27-30`) — every undo step before the save is destroyed, with no notice;
- calls `deselect()` (`:57`) — the working selection is dropped mid-task;
- recomputes `stableBounds` (`:59-67`) — the viewBox can jump if the returned extent differs.

**And the saved indicator races this.** `initFromContour` ends with `emitState()` (`:69`), which
routes to `onEditorStateChange` and sets **`editorSaved.value = false`**
(`VisualizationView.vue:87-90`), while `onEditorSave` sets it **true** immediately after the await
resolves (`:95`). Which lands last depends on Vue's pre-flush watcher scheduling relative to the
awaited promise — so the success checkmark may flicker off the instant it appears. The *ordering* is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the *reset* (history/selection/bounds) is static and certain, and
the two writers of one flag racing across a component boundary is a design defect either way.

**Falsifier.** Show `saveContourPoints` mutates in place — `:272` assigns a new `markRaw(result)`.
Show the watcher is identity-insensitive — `watch(() => props.contour, …)` (`:72`) has no `deep`
and compares by reference, so a new object always fires. Show `initHistory` preserves history —
`useContourHistory.ts:27-30` overwrites the array.

---

## §3 · MINOR

**m-1 · Dead transition property + off-law easing.** `:311` `transition: fill 0.15s, r 0.15s`. `r` is
bound to the literal `3.5` (`:273`) and no rule changes it, so half the declaration is dead.
Separately, the durations carry no easing token although the repo has an explicit law —
`FullscreenViewer.vue:190-195` is annotated *"A.W3.d — named properties + canonical token, no
`transition: all`"* and uses `var(--ease-standard)`; `:311` and `:319` use bare defaults / `ease`.
*Falsifier:* find a rule that sets `r` — grep returns one binding, `:273`.

**m-2 · `dragging` destructured and never used.** `:42` pulls `dragging` out of `usePointDrag`; it
appears nowhere else. There is therefore no `is-dragging` class and no during-drag affordance; drag
feedback rests entirely on `:active` (`:337-339`), which is unreliable under `setPointerCapture`
(`usePointDrag.ts:22`) once the pointer leaves the element's box. *Falsifier:* `grep -n "dragging"
ContourEditorCanvas.vue` → one hit, line 42.

**m-3 · Dead public emit.** `:26` declares `save: [points: …]`; `grep -n 'emit("save"' ` → **0**. The
real save path is `defineExpose({ getPoints })` (`:224`) read by `VisualizationView.vue:92-96`. A
declared-but-never-emitted event is a false affordance in the component's public contract —
`FullscreenViewer` could plausibly have bound it, and per B-5 should have. *Falsifier:* find an
`emit("save")`.

**m-4 · `editor-shell` names two different elements in two different scopes.** The class is on both
the `VisualizationView.vue:203` wrapper and this component's root (`:231`).
`VisualizationView.vue:392,404` reach the wrapper via `>`-anchored selectors; `FullscreenViewer.vue:164`
reaches the root via `:deep(.editor-shell)`. Vue applies a parent's scope id to a child's root
element, so the two are one selector-edit apart from silent double application. *Falsifier:* both
selector sets are child-anchored or `:deep`, so today it is latent, not live — which is why this is
MINOR. *(Cousin collision: the CSS keyframe `golden-shimmer` at `:327` vs the unrelated module
`lib/golden-shimmer.ts`.)*

**m-5 · The background grid signifies measurement, measures nothing, and is invisible anyway.**
`:292-296` paints a 28 px **screen-space** lattice under a **data-space** projection whose scale
`s ≤ W/(1.3w)` varies per contour and per viewport — two contours side by side get identical grids
representing different distances. Graph paper is a strong signifier of scale; here it carries none.
It is also below the threshold of perception: the lines are
`color-mix(in srgb, var(--foreground) 5%, transparent)`, measuring **1.10 : 1** against light `--card`
and **1.14 : 1** against dark `--card`. *Falsifier:* show a scale readout, ruler or unit label — the
component renders zero text.

**m-6 · `MARGIN = 0.15` is an undocumented magic number that spends ~30 % of the drawing area.**
`:29`, applied at `:78-79`. In an editor whose targets are already sub-24 px (B-4), surrendering 30 %
of linear extent — ~41 % of fitted area on the binding axis — inverts the priority between breathing
room and precision. It is simultaneously the *sole* source of the drag headroom M-6 depends on, so
the two constraints are in direct tension with no comment acknowledging it. *Falsifier:* find a
rationale in the file, `DESIGN.md`, or the wave docs — `:29` is a bare `const`.

**m-7 · Zero automated coverage of any kind.** `grep -rn
"contour-editor\|editor-shell\|control-point\|dblclick" e2e/` → **0 hits** across all 8 specs
(including `contour-extraction.spec.ts`, which covers extraction but never the editor). vitest is
ABSENT tree-wide (lane-frontend §1 + carry #11). The product's only direct-manipulation surface has
no test at any level — which is why B-6, M-8 and M-10 could ship. *Falsifier:* name a spec that
drives the editor.

**m-8 · Overlay `<image>` lacks error, alt and decode affordances.** `:245-255`. Recorded separately
from M-7 because it is a distinct one-attribute repair (`@error` + `aria-hidden="true"` +
`decoding="async"`).

**m-9 · The interaction grammar is undiscoverable — the component renders no text at all.**
Double-click-to-insert, click-to-select, Delete-to-remove and Cmd+Z are surfaced nowhere.
`grep -rni "double-click\|double click\|dbl-click\|dblclick" web/src/` returns **only this file's own
handler and binding** (`:145`, `:237`) — no tooltip, no hint, no empty-state legend, no help text
anywhere in the tree teaches the grammar. `EditorControlsDock` tooltips cover only its own buttons.
*Falsifier:* find user-facing prose describing point insertion.

**m-10 · `cursor: crosshair` over-promises.** `:303` puts a precision-placement cursor over the whole
SVG, but a single click on the background does not place anything — `@click.self="onBgClick"`
(`:241`) merely deselects (`:159-162`); placement requires a *double* click. The strongest
cursor-level affordance in the component is bound to the one gesture that has no effect on geometry.
*Falsifier:* show single-click insertion — `onBgClick` (`:159-162`) calls `deselect()` and
`emitState()` only.

**m-11 · The graphic has no accessible name and no status announcement.** The `<svg>` (`:232-242`)
carries no `role`, no `aria-label`, no `<title>`, no `<desc>` (`grep -c "aria-\|role=" ` → 0), so a
screen reader encounters an unnamed graphic. And although `pointCount` is emitted upward (`:128`)
and rendered as text in the dock (`EditorControlsDock.vue:61,163`), it sits in no live region, so
insertions and deletions are never announced (SC 4.1.3 Status Messages; SC 1.1.1 for the name).
*Falsifier:* find an `aria-live` region carrying editor state, or an accessible name on the SVG.

**m-12 · No `forced-colors` / `prefers-contrast` handling, tree-wide.** `grep -rn
"forced-colors\|prefers-contrast" src/` → **0**. Author-specified SVG `fill`/`stroke` are not
force-adjusted by UA high-contrast modes, and the shell's background is a gradient stack (`:292-296`)
which is likewise not adjusted — so this surface has no defined appearance under HCM, and unlike a
`<button>` it has no UA fallback to inherit. *Falsifier, honestly:* the precise UA behaviour is
**UNPROVEN-NEEDS-LIVE (SS-13)** and varies by engine; the *absence* of any handling is measured.

---

## §4 · INFO

**i-1 · Zero glass-ui surface = zero F.W1 break sites, and zero chassis.** `grep -c "glass-ui"` → 0.
This file appears in **none** of the ten rows of lane-frontend §5 "Rows that hit fourier-analysis
TODAY" (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2,
`DockDropdownTrigger` ×1, `ToastVariant`, the lucide rename, the three peer floors). Under the
tri-package atomic transaction (glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0, lane-frontend §5
"THE RESOLUTION DEADLOCK") this component **cannot break**: it consumes only theme custom properties
(`--radius`, `--border`, `--card`, `--foreground`, `--background`), none of which is a subpath in the
export-map diff. Recorded as INFO rather than a superlative because the same fact causes B-1, M-4 and
M-5: no chassis means no discipline. See S-1 for the superlative half — and §8 C-1 for the
exclusivity claim the tree refuted.

**i-2 · Two non-null assertions on the hot path.** `:134` `svgRef.value!` and `:138`
`getScreenCTM()!.inverse()`. `getScreenCTM()` returns `null` for an unrendered SVG, and per B-3 this
component is reachable from the `window` keymap while hidden. Primarily an L-axis item; recorded here
because its *design* consequence is an unhandled crash on a surface with no error state (M-7).

**i-3 · The typography axis is vacuous here — by omission, not by design.** The component renders
zero text nodes: no axis labels, no coordinate readout, no point index, no empty-state copy, no
units. Every string the user sees about this editor lives in `EditorControlsDock` ("N pts") or in
tooltips on *its* buttons. That is a defensible minimalism for a canvas, but it is the same
condition that makes m-5 (a grid that measures nothing), m-9 (an undiscoverable grammar) and m-11 (no
accessible name) simultaneously true — three separate defects with one origin.

---

## §5 · Superlatives (L-18 runs both ways)

### S-1 · Zero cost in the tri-package transaction — the migration budget for this file is nil

`grep -c "glass-ui" ContourEditorCanvas.vue` → **0**; `grep -c "lucide"` → **0**; the only external
symbols are Vue, three local modules and the workspace store. Under lane-frontend §5's deadlock —
`keyframes@4.3.0` optional-depending `glass-ui ~4.0.0` while `glass-ui@7` peers `keyframes ^6` +
`value.js ^4`, forcing one atomic transaction whose budget is "an order of magnitude above 46 lines"
— this component has zero import sites, zero removed-subpath exposure, zero removed dock members,
zero `ToastVariant` dependency and zero exposure to the 35-site `@lucide/vue` rename. **It costs
nothing to migrate, and every repair listed above can land before, during or after F.W1 without
re-sequencing it.**
*Falsifier:* find any `@mkbabb/*` specifier in the file — there is none.
*Honest scope limit (§8 C-1):* this property is **not unique**. Five of the twenty `.vue` files in
`components/visualization/` have zero glass-ui imports — `BasisCanvas.vue`, `ContourPreview.vue`,
`EasingCurvePreview.vue`, `ImageUpload.vue` and this one. The superlative is the zero cost, not
exclusivity.
*Counter-weight:* i-1 — the same isolation is what let B-1, M-4 and M-5 drift.

### S-2 · `stableBounds` — a documented refusal to re-fit the viewBox during a drag

`:49-50`, `:59-67`, `:74-75`. The naive implementation recomputes bounds from live points, which
rescales the entire canvas under the cursor on every `pointermove` — a well-known, nauseating editor
defect that also makes precise placement impossible, because the target moves as you approach it.
This author saw it, wrote the guard, and then wrote it down twice: *"Stable bounds — computed from
initial contour, not live points"* (`:49`) and *"use stable bounds for viewBox and image overlay, live
bounds for nothing"* (`:74`). The second comment is doing real work — it forecloses a future
"optimisation" that would reintroduce the bug. Deliberate design judgment, legible to the next
reader.
*Falsifier:* show the bounds update on drag — `initFromContour` (`:67`) is the sole writer, called
only from the `props.contour` watcher (`:72`) and `resetToExtraction` (`:201-203`).
*Counter-weight:* M-6 — it shipped without its companion headroom/fit affordance.

### S-3 · Aspect-preserving viewBox padding — correct here, and wrong in the sibling

`:78-79` pads each axis by its **own** extent (`padX = width*MARGIN`, `padY = height*MARGIN`), so both
axes scale by the identical factor 1.3 and the data aspect ratio is preserved exactly. The sibling
`ContourPreview.vue:26` derives a single `pad = (maxX - minX) * 0.1` from the **x**-extent and applies
it to **both** axes, distorting the preview for any non-square contour (a 2 : 1-wide contour is padded
20 % horizontally and 40 % vertically relative to its own height). The editor is the geometrically
correct member of the pair — and it is the one where correctness matters most, since it is the surface
the user drags against.
*Falsifier:* for a square contour the two agree; the divergence is conditional on `w ≠ h`, the common
case. Substitute `w = 2h` into both expressions.

### S-4 · The image counter-flip is exactly right, and non-obviously so

`:252` `:transform="`translate(0, ${y*2 + h}) scale(1, -1)`"`, applied to an `<image>` inside the
global `scale(1,-1)` flip (`:243`). Substituting the composite: a point at `Y` maps to
`−Y + 2y + h`, which sends `Y = y ↦ y + h` and `Y = y + h ↦ y` — the rectangle maps onto **itself**
with its content un-mirrored, for *any* `y` and `h`, not merely the symmetric `y = −h/2` case the
current backend happens to produce (`api/dependencies.py:156-161`). The overlay's `resize` is likewise
derived from the authoritative `image_bounds` rather than guessed (`:89-96`, with the comment *"Derive
resize from image_bounds so the overlay always matches the extraction dimensions"*), with the client
default as fallback only. This is registration done properly: the one place in the component where a
sign error would be invisible-until-wrong is the place that is provably general.
*Falsifier:* substitute an asymmetric `y` (say `y = 0, h = 100`) and check the mapping — it still
sends `[0,100] ↦ [100,0]`, i.e. correct.

### S-5 · `pointercancel` is bound — the constellation's hardest-won pointer lesson, applied unasked

`:240` `@pointercancel="onPointerUp"` alongside `:239` `@pointerup`. Losing a pointer stream to a
browser-initiated cancel (iOS Safari scroll takeover, OS gesture, capture revocation) without
resetting drag state leaves an editor permanently "dragging" — every subsequent `pointermove` mutates
geometry with no button held. The constellation paid for this lesson in value.js
(`ComponentSliders.vue`'s `pointercancel`/`lostpointercapture` handlers, added to recover from
reka-ui slider pointer-capture leaks); it is applied here without being asked.
*Falsifier, and the honest limit:* the hygiene is **2/3 complete** — `lostpointercapture` is **not**
bound (`grep -n "lostpointercapture" ContourEditorCanvas.vue composables/usePointDrag.ts` → 0) and
`onPointerUp` (`usePointDrag.ts:54-60`) never calls `releasePointerCapture`. Implicit release at
`pointerup` covers the common path; an explicit capture revocation does not reach `onPointerUp` at
all. Recorded as a superlative with a named gap rather than a defect, because the hard part —
recognising that `pointerup` alone is insufficient — was done.

---

## §6 · Provenance against the hitherto corpus

| corpus row | this challenge |
|---|---|
| lane-frontend §2 roster ("SVG contour point editor (drag/insert/delete)", 340 LOC) | **CONCUR** — line count and role confirmed; the roster's parenthetical names precisely the three operations B-2 shows are keyboard-inoperable. |
| lane-frontend §5, the ten-row break table | **CONCUR + extend** — this file is on none of them; i-1/S-1 quantify the exemption. |
| lane-frontend §5, `./surface` ADDED at 7.0.0 | **NEW USE** — M-5 names the bespoke shell as the natural `./surface` re-home; a rare uplift *opportunity* rather than a break. |
| lane-frontend §8, "8 `@media (prefers-reduced-motion: reduce)` blocks" + the `GalleryMarquee.vue:126-128` D.W4.c citation | **EXTEND** — M-2 finds a ninth site that needed one and lacks it (plus a tenth, `ImageUpload.vue:159`, out of scope). §8's ⚠ COVERAGE GAP names two rAF clocks; **this CSS keyframe is a third, un-booked gap.** |
| lane-frontend §8, the `--viz-amber` light-darken carry (`style.css:113-127`) | **SHARPEN** — B-1 shows the carry is routed around by 8 literals here and 1 in `ContourPreview.vue:45`, so landing the *upstream* token fix alone will **not** repair this surface. |
| lane-frontend §9 carry #9 (reduced-motion gap, P3) | **RE-GRADE ARGUED** — carry #9 covers the two rAF clocks. M-2 adds a CSS-keyframe instance on the editing surface; combined with B-1..B-6 this component's a11y posture is not P3. |
| lane-frontend §9 carry #11 (no unit-test runner) | **CONCUR + localise** — m-7 measures 0 e2e selectors touching this component, which is why B-6 / M-8 / M-10 could ship unnoticed. |
| CENSUS-2026-08-03 §1 (glass-ui pin `^4.0.0`, installed 4.0.0) | **CONCUR** — every token value in B-1 and M-4 is read from the *installed* 4.0.0 tree, never the 7.0.0 producer. |
| `lane-fourier-r3-r6.md` R4-9 (audited scope byte-identical to the F.W0 tree) | **RELIED ON** — I audited the live tree; R4-9 is why that is the same object. |
| `lane-fourier-r3-r6.md` R3-11 (two Teleports, one at `FullscreenViewer.vue:105`) | **EXTEND, not contradict** — B-5 shows that Teleport boundary forks this component's state; a callsite registry cannot see instance identity. |
| `lane-fourier-r3-r6.md` R5-7 (component-callsite evidence is blind to native loops) | **SAME FAMILY** — B-5's fork and M-8's native-element `dblclick` bubbling are both defects invisible to a component-callsite model; F.W4's per-component audit should count native element bindings, not only component callsites. |
| `lane-fourier-r3-r6.md` R3-10 (six dynamic `:is` families → F.W4) | **NO OVERLAP** — this file has none (`grep ":is=" ` → 0). |
| `lane-fourier-r3-r6.md` R3-7a (35 Tooltip callsites / 9 consumers → F.W3) | **NO OVERLAP, worth noting** — this component contributes **0** Tooltip callsites, which is m-9 restated: it has no tooltips at all, so the F.W3 tooltip migration will not touch it and will not fix its discoverability. |
| lane-frontend §2 roster count for `components/visualization/` | **CORRECTION** — the roster's 26 SFCs includes the `gallery/` subdirectory; the directory itself holds **20** `.vue` files (`ls *.vue \| wc -l` → 20). Load-bearing only for §8 C-1's denominator. |

---

## §7 · Repair ordering for the wave (an ordering argument, not a prescription)

The six blockers are not six independent repairs.

- **B-6 is one line and outranks everything by cost/benefit** — wrap `onPointerUp` the way
  `onPointPointerDown` is already wrapped at `:154-157`. That single change re-enables Undo after a
  drag *and* kills the false "saved" checkmark. Nothing else in the file changes.
- **B-3 and M-1 share a fix** — move the listener from `window` to the already-focusable shell and
  gate on a new `isEditing` prop. The tabindex acquires a purpose and the route-wide `preventDefault`
  disappears.
- **B-1 and M-4(a) share a fix** — `hsl(40 90% 55%)` → `var(--viz-amber)` (8 sites),
  `var(--background)` → `var(--card)` (1 site). Nine literal substitutions, no uplift, and it lands
  the `style.css:113-127` carry on this surface for free. `ContourPreview.vue:45` is the tenth.
- **B-4, M-3 and M-4(b) share a fix** — the geometry: `r` must be screen-space, not data-space (bind
  it to `1/s`, or render points in a non-scaling overlay layer). After that the hover and selected
  fills become visible and the target-size arithmetic becomes tractable.
- **M-8 and M-9 share a surface** — the direct-manipulation grammar: a proximity test in
  `onDblClick`, and a canvas-side magnet affordance (halo or neighbour tint) so the default mode is
  visible.
- That leaves **B-2** (a roving-tabindex point selector with arrow-key nudge), **B-5** (bind the
  fullscreen instance to the same state, or forbid fullscreen while editing) and **M-10** (preserve
  history across save, or announce the reset) as the only three requiring genuinely new surface.

**None of the six depends on the F.W1 tri-package uplift** — per S-1 this component imports nothing
that moves — so the whole repair can land before, during, or after the transaction.

---

## §8 · Corrections to the earlier draft at this path (L-18 turned inward)

The prior `challenge-D-design.md` was re-derived claim-by-claim against the tree. Its five blockers,
seven majors and nine minors survived except as noted; five statements did not.

| id | the earlier draft said | the tree says | consequence |
|---|---|---|---|
| **C-1** | "the **only** component in `components/visualization/` with zero glass-ui imports", against "26 SFCs in the directory" | **FALSE.** Per-file `grep -c "@mkbabb/glass-ui"` over the 20 non-recursive `.vue` files returns zero for **five**: `BasisCanvas.vue`, `ContourEditorCanvas.vue`, `ContourPreview.vue`, `EasingCurvePreview.vue`, `ImageUpload.vue`. The "26" was lane-frontend's roster count, which includes `gallery/`. | S-1 and §0 re-scoped: the superlative is the **zero migration cost**, not exclusivity. |
| **C-2** | the degenerate viewBox string is `"Infinity -Infinity -Infinity -Infinity"` | The second term is `−(maxY + padY) = −(−Infinity + −Infinity) = **+Infinity**`. Correct string: **`"Infinity Infinity -Infinity -Infinity"`**. | M-7's mechanism is unchanged (still a malformed viewBox); the quoted value is fixed. |
| **C-3** | B-1 calibration "agreement to 0.5 % on two independent points" | Point 1 holds (3.552 computed vs ≈3.54 published, 0.3 %). Point 2 was compared against the wrong surface: the published ≈4.6 is vs `--background`, where my routine returns **4.709** (2.4 %); vs `--card` it returns 4.625. | §B-1 now states both surfaces explicitly. The measured table itself is unaffected — it composites over `--card`, the actual surface. |
| **C-4** | citations: `EditorControlsDock.vue:99` (delete), `ContourPreview.vue:41` (amber literal), `style.css:99-117` / `:119-131` / `:133-143`, `VisualizationView.vue:393-403` / `:404-408`, `FullscreenViewer.vue:164-170` | Actual: `EditorControlsDock.vue:97`; `ContourPreview.vue:45`; `style.css:107-111` (shim) / `:119-127` (viz-amber) / `:136-143` (focus rings); `VisualizationView.vue:392-403` / `:404-409`; `FullscreenViewer.vue:163-170`. | Line drift only; every underlying fact re-confirmed at the corrected coordinates. |
| **C-5** | *(absent)* | Five defects were missed entirely: **B-6** (drag never emits `stateChange` → disabled Undo + falsely sticky "saved" + no navigation guard), **M-8** (dblclick on a point inserts a coincident duplicate), **M-9** (magnet on by default with no canvas indication), **M-10** (save resets history/selection/bounds and races the saved flag), plus **m-10/m-11/m-12** (crosshair over-promise, no accessible name or status region, no forced-colors handling). | Tally moves from 23 defects / 5 blockers / 4 superlatives to **31 / 6 / 5**. |

Everything else in the earlier draft reproduced: the eight amber literals (counted, 8), the contrast
table (1.66 / 1.43 / 1.81 / 7.61), the pixel data space (`api/dependencies.py:150-161`), the three
`infinite` animations in the directory (1 guarded, 2 not), `BasisCanvas.vue:521`'s `cartoon-card`,
the zero e2e selectors, the zero `aria-`/`role=` occurrences, and the zero `emit("save")` sites.
