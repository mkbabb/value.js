claude-opus-5[1m] (served model id)

# CHALLENGE — `ExportModal.vue` · axis **D (DESIGN)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ExportModal.vue` (114 lines)
**Axis** spacing/proportion · glass-ui conformance under the OLD PIN (`^4.0.0` installed / producer 7.0.0) · typography · motion + PRM · a11y · prose · state coverage
**Mode** static, read-only. No browser tooling. Every livable-only claim is tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier and dies if the falsifier fires. §6 is the graveyard of the hypotheses that DID die — L-18 runs both ways, and so does the null result.

**Read whole (read-only):** the subject; its 3 glass-ui subpaths at the installed 4.0.0 (`dist/dialog.js` + `DialogContent-DDE6pQBU.js` + `DialogFooter-8eZbdmPc.js`, `Switch-Dr--uLGH.js`, `button-BNDWhAZb.js`, `cn-DJXf4yaB.js`) and their `.d.ts`; `dist/styles/{index,animations}.css`, `styles/typography/{utilities,semantic}.css`, `styles/tokens/{color-radius,offsets-sizing}.css`, `styles/theme/bridges.css`, `styles/utilities/{animate,a11y-overrides}.css`; `lucide-vue-next` `Icon.js`/`defaultAttributes.js`; `reka-ui` `Switch/SwitchRoot.js`; the consumer `VisualizationView.vue` + the sink `BasisCanvas.vue`; `web/src/style.css`; the two e2e keystones; and the producer 7.0.0 `src/components/{button,switch,dialog}/`.

**Counts** — 21 defects · **2 BLOCKER** · 5 MAJOR · 10 MINOR · 4 INFO · **6 SUPERLATIVE**.

---

## §0 · Verdict

ExportModal is a **well-mannered shell wrapped around a lying control surface**.

The shell is genuinely good: 114 lines, zero hand-rolled ARIA, zero direct `reka-ui` import, zero shadow
component, and a six-line comment (`:28-30`) that correctly names which primitive owns focus-trap / Esc /
`aria-modal`. It sits entirely on the **stable** side of the census §5 subpath break surface. Three
superlatives are real and load-bearing.

But **two of its four switches are inert** — `withEpicycles` and `withTrail` are emitted, travel through an
untyped `Record<string, boolean>`, and are then *never read* by the sink. The user turns off "Epicycles",
gets epicycles. That is a design defect before it is a correctness defect: a control that does not control
is a false affordance, and no amount of spacing polish redeems it.

And the census break surface is **incomplete in the direction that matters most for this file**. Census
§5 / lane-frontend §5 enumerate `metric-badge` ×7, `hover-card`/`-popover` ×4, 3 dock members, and
`ToastVariant`. They do **not** enumerate `/button` — whose *entire prop API* is replaced at 7.0.0
(`variant`→`emphasis`+`tone`; `size:"default"` deleted). `/button` is the most-imported glass-ui subpath in
the tree (35 import occurrences, 99 `<Button>` sites). ExportModal carries 4 of those prop breaks in 2 lines.

---

## §1 · BLOCKERS

### D-B1 — Two of the four switches are INERT. The dialog's controls lie. `BLOCKER`

**File:** `ExportModal.vue:36-41` → `VisualizationView.vue:99-101` → `BasisCanvas.vue:462-469`

`doExport()` emits four keys. The sink destructures **two**:

```ts
// BasisCanvas.vue:466-469
const {
    withGrid: showGrid = true,
    withLabels: showLabels = true,
} = options;
```

`withEpicycles` and `withTrail` are never named again in the file. **Both** draw paths ignore them:
`drawEpicycleFrame` (`BasisCanvas.vue:119-200`) draws the trail unconditionally (`:144-145`
`trail.update(...)` / `trail.draw(...)`) and the epicycle circles unconditionally (`:172`
`drawEpicycleCircles(...)`); the multi-basis path `drawMultiBasesFrame` repeats both (`:329-330`, `:356`).
Neither takes an options parameter; neither reads an export flag.

**Failure scenario.** Open a workspace with epicycle data → dock → More options → Export → toggle "Epicycles"
OFF and "Trace path" OFF → Save PNG. The downloaded `fourier-frame-*.png` contains the full epicycle chain
and the full trail. Two of the four promises in the dialog are broken; the other two are honoured. Nothing —
no toast, no disabled state, no note — signals this.

**Root cause (design-level, not a typo).** `ExportModal.vue:19` types the payload as
`Record<string, boolean>` and `BasisCanvas.vue:462` accepts `options: Record<string, boolean> = {}`. There is
no compile-time relation between the keys the dialog *publishes* and the keys the renderer *consumes*, so
`vue-tsc -b` — the tree's only type gate (lane-frontend §1, "vitest is ABSENT") — cannot see the hole.
An `ExportOptions` interface shared by both ends would have made this a build error.

**Falsifier.** Find any read of `options.withEpicycles` / `options.withTrail`, or any conditional on them
anywhere in the export path (`grep -rn "withEpicycles\|withTrail" web/src/` → 6 hits, ALL in
`ExportModal.vue` `:23,24,37,38,57,61`; zero in `BasisCanvas.vue`, zero in `lib/canvas-drawing/`). The
claim dies the moment one such read exists. It does not.

**Cross-axis note.** This is simultaneously a C-axis correctness bug. It is filed here because on the D axis
it is the single most important fact about the component: the primary control surface is 50% decorative.

---

### D-B2 — Both footer `<Button>`s carry two 7.0.0-deleted props each. `/button` is ABSENT from the census break surface. `BLOCKER` (for F.W1)

**File:** `ExportModal.vue:74`, `ExportModal.vue:75`

```html
<Button variant="outline" size="default" @click="emit('close')">Cancel</Button>
<Button variant="default" size="default" @click="doExport">
```

At the **installed 4.0.0** both are legal — `button.d.ts` `ButtonVariants` has `variant: … "outline" | "default" …`
and `size: "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm"`.

At the **producer 7.0.0** neither prop exists:

```ts
// glass-ui/src/components/button/Button.vue:15-30
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // no `variant`
    tone?: Tone;
    size?: ButtonSize;           // no "default"
    iconOnly?: boolean;
    loading?: boolean;
    …
}
```

corroborated by `glass-ui/CHANGELOG.md:71-72` — *"`/button`: `ButtonVariants` → `ButtonProps` / `ButtonEmphasis` / `ButtonSize`"*
in the **member-level removals from surviving keys** block, which the CHANGELOG itself warns
"an `exports` keyset diff alone will not surface" (`CHANGELOG.md:47-49`).

**Failure scenario.** F.W1 lands the tri-package uplift. `vue-tsc -b` (the `web-build` CI job,
lane-frontend §7) reports excess-property errors on `variant` and `size` at `ExportModal.vue:74,75`; if the
props were merely spread rather than typed, the visual outcome is worse — silent fallback to
`emphasis:"secondary"` / `size:"md"` for BOTH buttons, collapsing the Cancel/Save-PNG emphasis hierarchy to
a single register. Neither button would read as primary.

**Why this is a census correction, not just a component finding.**

| probe | value |
|---|---|
| `grep -rn "<Button" web/src \| wc -l` | **99** |
| `grep -rn "<Button" web/src \| grep -c "variant="` | **27** |
| `grep -rn "<Button" web/src \| grep -c "size="` | **20** |
| `size="default"` occurrences tree-wide | **6** |
| `/button` import occurrences (lane-frontend §3 subpath census) | **35** — the largest of any subpath |

lane-frontend §5 ("Rows that hit fourier-analysis TODAY") and CENSUS-2026-08-03 `:102-104` list
`metric-badge`/`hover-card`/`hover-popover`/dock members/`ToastVariant` and **stop**. `/button` survives at
the *key* level, which is exactly the trap `CHANGELOG.md:47-49` documents — so a keyset-diff-driven break
surface misses it. **I contradict the census here explicitly:** the F.W1 break budget must add a
`/button` prop-migration row of ≥27 call sites, an order of magnitude larger than the 11 removed-subpath
sites it currently books as its `[P1]` row (lane-frontend §9 item 4).

**Falsifier.** Show a `variant` prop or a `"default"` size member on producer 7.0.0's `ButtonProps`, or a
back-compat alias. `grep -n "variant" glass-ui/src/components/button/Button.vue` → the string appears
nowhere in the prop interface; `MIGRATION.md`'s only `Button variant` rows are 5.x-era. The house rule is
"clean break, no aliases" (`MIGRATION.md:1348`).

---

## §2 · MAJOR

### D-M1 — The only Dialog in the tree with no `DialogDescription`; no `aria-describedby`, and the output format is never stated in prose. `MAJOR`

**File:** `ExportModal.vue:49-52` (absence)

The tree has **four** `Dialog` mounts. Three declare a description:

| site | `DialogDescription` |
|---|---|
| `GalleryView.vue:415-426` | ✅ |
| `gallery/AdminUserList.vue:476-497` | ✅ |
| `gallery/AdminFlaggedPanel.vue:268-272` | ✅ |
| **`ExportModal.vue`** | ❌ — imports `Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter` (`:5-11`) and nothing else |

glass-ui 4.0.0 exports it (`dist/components/ui/dialog/index.d.ts`) and styles it
(`DialogFooter-8eZbdmPc.js`, `DialogDescription` → `cn("text-sm text-muted-foreground", …)`). It is one import
and one element away.

**Failure scenario (a11y).** A screen-reader user opens the dialog. reka-ui's `DialogContent` announces
`role="dialog"` + the title "Export Frame". `aria-describedby` is unset, so nothing explains *what* frame,
*which* format, or that the four switches govern the output. The user must tab through four switches to a
button labelled "Save PNG" to learn the format.

**Failure scenario (prose).** The title says **Frame**; the primary action says **PNG**; the option list
says **Epicycles / Trace path / Grid lines / Labels**. Three vocabularies, no sentence tying them. A one-line
description — *"Downloads the current animation frame as a PNG at the canvas's device resolution."* — closes
both the a11y gap and the prose gap in the same element.

**Falsifier.** Two ways this dies: (a) reka-ui's `DialogContent` synthesises a description from content — it
does not; it warns in dev when neither `DialogDescription` nor `aria-describedby` is present; (b) an
`aria-describedby` is set somewhere on the subject — `grep -n "aria-" ExportModal.vue` → **zero hits in the
entire file**.

**Why the green e2e keystone does not falsify this.** `e2e/visualization-ux.spec.ts:150-164` and
`visualization-crud.spec.ts:640-659` both run `checkA11y` on the open dialog and pass. axe-core has no rule
requiring a dialog description; a missing `aria-describedby` is not an axe violation. The keystones are
evidence of *no axe violation*, not of *described*.

---

### D-M2 — `.cm-serif` on the title resolves to the browser's generic `serif`. The brand face never lands. `MAJOR`

**File:** `ExportModal.vue:51` — `<DialogTitle class="cm-serif text-lg font-semibold">`

The utility exists at the pinned version and does exactly one thing:

```css
/* glass-ui@4.0.0 dist/styles/typography/utilities.css:65-67 */
@utility cm-serif {
    font-family: var(--font-serif-math, serif);
}
```

**`--font-serif-math` is declared nowhere in the resolvable cascade.** Exhaustive probe:

```
$ grep -rn -- "--font-serif-math" web/src web/public web/index.html \
      web/node_modules/@mkbabb/glass-ui/dist/
node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css:66:    font-family: var(--font-serif-math, serif);
```

**One hit — its own consuming line.** The fallback fires: `font-family: serif`.

fourier's brand fork binds a *different* token:

```css
/* web/src/style.css:13-15 */
@theme {
    --font-sans: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif;
}
```

and glass-ui's own `--font-serif` is an alias for its **sans** text register —
`theme/bridges.css:68` `--font-serif: var(--font-stack-text)`, with
`tokens/scheme-motion.css:43` `--font-stack-text: "Plus Jakarta Sans", …`.

**Failure scenario.** "Export Frame" renders in the platform's default serif (Times New Roman / Liberation
Serif) inside an application whose entire visual identity is Computer Modern — the same dialog whose sibling
surfaces (`PaperView.vue:354`, `PaperSidebar.vue:53`, `GalleryCardModal.vue:126`) carry the same dead class.
The title reads as a foreign face against the KaTeX math it exists to export.

**Provenance — this is a 3.1→4.0 regression, not an original sin.** `A.W2.a` (`e4177e9`) excised fourier's
local `@utility cm-serif` on the recorded ground that *"the canon is the sole source of truth for … the
`@utility text-micro / text-admin-label / cm-serif / fira-code / fourier-f` blocks"*
(quoted in the deleted `fourier-overrides.css`, visible at `git show f934ff2 -- web/src/styles/fourier-overrides.css:70`).
The last built artefact in the tree — `web/dist/assets/index-57FkGzlZ.css`, dated Jun 12, glass-ui 3.x —
carries `.cm-serif{font-family:var(--font-serif)}`. Between 3.x and 4.0 the producer renamed the token it
reads from `--font-serif` to `--font-serif-math`, and nobody re-supplied it. The class survived; the face did not.

**Falsifier.** Declare `--font-serif-math` anywhere reachable, or find one. The single-hit grep above is the
whole cascade — glass-ui's `dist/`, the SFC bundle `glass-ui.css`, `web/src`, `web/public`, `web/index.html`.
If a declaration exists outside those roots, this claim dies.

**Uplift note.** 7.0.0 does **not** fix it — `glass-ui/src/styles/typography/utilities.css:77-79` is
byte-identical, `var(--font-serif-math, serif)`. The cure is consumer-side: one line in `style.css`.
`UNPROVEN-NEEDS-LIVE` for the rendered-glyph confirmation; the token trace itself is proven from source.

---

### D-M3 — The dialog's always-present ✕ is a 16×16 target at `opacity-70`. Fails WCAG 2.5.8. `MAJOR`

**File:** `ExportModal.vue:49` (`<DialogContent>` accepts `showClose` default `true`)

`DialogContent.vue.d.ts` documents `showClose?: boolean` default `true`; the runtime renders

```js
// DialogContent-DDE6pQBU.js — the DialogClose branch
class: "focus-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 …"
//  children: XIcon class="w-4 h-4"  +  <span class="sr-only">Close</span>
```

No padding, no `min-block-size`, no `touch-hit-area`. The button's border box is the 16×16 glyph (the
`sr-only` span is `position:absolute; width:1px; height:1px` per `components.css`, so it adds nothing).

The design system's coarse-pointer floor does **not** reach it:

```css
/* dist/styles/utilities/a11y-overrides.css:115-122 */
@media (pointer: coarse) {
    [data-size="icon"], .expandable-container__trigger, .segmented-tabs__trigger {
        min-block-size: var(--touch-target, 2.75rem);
        min-inline-size: var(--touch-target, 2.75rem);
    }
}
```

`DialogClose` carries none of those three selectors and no `data-size`.

**Failure scenario.** 16×16 < 24×24 → **WCAG 2.5.8 Target Size (Minimum), AA, fails at every pointer type**,
including a mouse. `opacity-70` on `--foreground` further depresses the glyph's contrast against the glass
surface. On a touch device the ✕ is a 16px target at the top-right corner of a modal — the canonical
mis-tap.

**Falsifier.** Show padding, a min-size, or a `touch-hit-area` on 4.0.0's `DialogClose`, or a selector in
`a11y-overrides.css` that reaches it. Neither exists in the shipped bundle.

**The producer confesses and fixes it at 7.0.0** — an F.W1 **improve** row:

```css
/* glass-ui/src/components/dialog/styles.css:96-99 */
/* THE ✕. 44×44 hit box via the button's own padding, glyph 16, capsule on an inset
 * ::before. Rest ink is `--foreground` at ≥3:1 — the shipped `opacity-70` compounded
 * every state into the same wash. */
:where([data-slot="dialog-close"]) { … }
```

Again: axe-core does not implement 2.5.8 target-size by default, so the two green keystones do not falsify this.

---

### D-M4 — The exit choreography is unreachable. The dialog and its full-viewport scrim snap out of existence. `MAJOR`

**Files:** `ExportModal.vue:46` + `VisualizationView.vue:281`

```html
<!-- ExportModal.vue:46 -->
<Dialog :open="true" @update:open="onOpenChange">
<!-- VisualizationView.vue:281 -->
<ExportModal v-if="showExport" … @close="showExport = false" />
```

`open` is a **literal `true`** — it never transitions to `false`. Every dismissal path routes
`@update:open(false)` → `emit("close")` → the parent sets `showExport = false` → **`v-if` destroys the whole
subtree synchronously.** reka-ui's `Presence` plays an exit only while the element remains mounted long
enough to paint `data-state="closed"` and fire `animationend`. It never does.

What is therefore dead:

```css
/* dist/styles/utilities/animate.css:10-15 */
@utility popover-animate {
    @apply data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95;
}
```
— composed onto the content by `DialogContent-DDE6pQBU.js` (`w = "-translate-x-1/2 -translate-y-1/2 duration-normal popover-animate"`) — plus `<ModalOverlay scrim="glass" animate="fade">`'s own exit.

**Failure scenario.** Opening zoom-and-fades in over `duration-normal`. Closing removes a blurred
full-viewport glass scrim and a centred plate in **one frame**, with no transition. The asymmetry is exactly
the perceptual jolt the enter animation exists to avoid, and it is 100% of dismissals — Esc, backdrop, ✕,
and Cancel alike.

**Falsifier.** Either (a) reka-ui's `Presence` survives an ancestor `v-if` teardown (it cannot — teardown is
synchronous unmount, not a state flip), or (b) neither content nor scrim declares a closed-state animation
(both do, cited above). The fix is a two-line pattern the sibling `FullscreenViewer.vue` already uses
(`:visible` prop, no `v-if`): hold a local `open` ref, flip it false, emit `close` on the exit's completion.

`UNPROVEN-NEEDS-LIVE` for the frame-level visual capture; the source chain is proven.

---

### D-M5 — Zero error state, zero confirmation. A silent no-op is indistinguishable from success. `MAJOR`

**Files:** `ExportModal.vue:35-42`, `VisualizationView.vue:99-101`, `BasisCanvas.vue:463`

```ts
// VisualizationView.vue:99-101
function doExport(options: Record<string, boolean>) {
    canvasComponent.value?.exportFrame(options);   // optional-chained; may be undefined
    showExport.value = false;                      // closes unconditionally
}
// BasisCanvas.vue:463
if (!canvasRef.value || !surface.value) return;    // silent early return
```

Three silent-failure paths, none surfaced: the optional chain (`canvasComponent` unresolved), the guard
early-return, and the `if (data || basesData)` branch at `:484` (no data → the offscreen canvas is never
drawn, yet `:506` `offCanvas.toDataURL("image/png")` still fires and a fully transparent PNG downloads).

**Failure scenario.** Any of the three fires. The modal closes with the same animation and the same timing as
a success. There is no toast, no inline error, no retained-dialog error state, and no success confirmation
either — the user's only evidence of *either* outcome is checking their downloads folder.

**Sharpest form:** the tree already ships the affordance and this flow ignores it —
`src/composables/useToast.ts` (38 lines) and `<Toaster/>` mounted in `App.vue:5`. Neither is imported by
`ExportModal.vue` or by `doExport`.

**Falsifier.** Find any error handling, `try`/`catch`, toast, or post-export feedback on the path
`ExportModal.doExport → VisualizationView.doExport → BasisCanvas.exportFrame`.
`grep -n "toast\|catch\|error" web/src/components/visualization/ExportModal.vue` → **zero**;
the same grep over `exportFrame` (`BasisCanvas.vue:462-514`) → **zero**.

---

## §3 · MINOR

### D-m1 — At <640 px the two footer buttons are FLUSH — a real 0.00 gap, primary on top. `MINOR`

**File:** `ExportModal.vue:73-79` (no compensating class on `<DialogFooter>`)

4.0.0's footer recipe (`DialogFooter-8eZbdmPc.js`):

```js
cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2", n.class)
```

Below the `sm` breakpoint the container is `flex-direction: column-reverse` and the **only** gap declared is
`gap-x` — `column-gap`, the *cross*-axis in a column flow, which contributes **nothing** to the space between
stacked items. And it is `sm:`-gated anyway.

**Failure scenario.** On any phone: "Save PNG" and "Cancel" render full-width, stacked, **touching**, with
"Save PNG" on top (`col-reverse`). Two adjacent 100%-wide targets with a 0 px separator — a mis-tap between
"do the thing" and "abandon" with no visual seam.

**Falsifier.** Show a row-gap reaching the footer below 640 px: `grep -o "gap" DialogFooter-8eZbdmPc.js` →
only `sm:gap-x-2`; `ExportModal.vue:73` passes no `class`. Dies if either exists.

**F.W1 improve row — the producer names this defect verbatim:**

```html
<!-- glass-ui/src/components/dialog/DialogFooter.vue:9-12 -->
<!-- Layout is authored in `dialog/styles.css`. The `sm:`-gated row/gap put the
     destructive action topmost, full-width and flush at ≤640px — a real 0.00 gap on
     the most dangerous target in the plate. It is a row at EVERY viewport now. -->
```
```css
/* glass-ui/src/components/dialog/styles.css:89-94 */
:where([data-slot="dialog-footer"]) {
    display: flex; flex-direction: row; justify-content: flex-end; gap: var(--space-body);
}
```
Note `:where()` — zero specificity, so the uplifted footer is trivially overridable. This row **improves**
for free at F.W1 and needs no consumer edit.

---

### D-m2 — Row pitch is 42 px against the design system's own 44 px touch floor. Adjacent hit-halos overlap. `MINOR`

**File:** `ExportModal.vue:93` (`gap: 0.125rem`) + `:100` (`padding: 0.5rem 0.25rem`)

Computed at ≥768 px, where `style.css:45-50` sets `html { font-size: 1rem }`:

| quantity | derivation | px |
|---|---|---:|
| row content height | `max(text-base line-box 1.5rem, Switch `h-6` 1.5rem)` | 24 |
| row border-box | `0.5rem + 24 + 0.5rem` | **40** |
| list gap | `0.125rem` | 2 |
| **row pitch** | 40 + 2 | **42** |
| Switch touch halo | `a11y-overrides.css:151-168` `touch-hit-area` `::before`, `min-width/height: var(--touch-target, 2.75rem)`, centred | **44** |

The halo is centred on a 24 px switch at the row's vertical centre, so it spans `[-2 px, +42 px]` relative
to the row's top edge — **2 px taller than the pitch on each side**. Row *N*'s halo ends at 42; row *N+1*'s
begins at 40. `pointer-events: auto` on both.

**Failure scenario.** `@media (pointer: coarse)` at ≥768 px — a touchscreen laptop, or a tablet in
landscape. A 2 px band between every pair of adjacent option rows is claimed by *both* switches' halos; the
later-painted one wins. Small in magnitude, but the diagnosis is structural: **the list is too tight for its
own primitives**, and the design system's WCAG-2.5.5 machinery cannot be honoured at this pitch. A
`gap: 0.25rem` (pitch 44) or `padding-block: 0.625rem` (row 44) resolves it exactly.

**Falsifier.** Two escapes: (a) at <768 px the root is `1.125rem` (`style.css:40-43`) → row 45 px, gap
2.25 px, pitch 47.25 px > 44 — **no overlap on phones, and I do not claim one**; (b) if `--touch-target`
resolves below 2.75rem the halo shrinks. `grep -rn -- "--touch-target:" dist/styles/` decides it.
`UNPROVEN-NEEDS-LIVE` for the resolved token + composited rect.

---

### D-m3 — A 4 px optical indent that aligns with nothing. `MINOR`

**File:** `ExportModal.vue:100` — `padding: 0.5rem 0.25rem`

`DialogContent`'s base is `p-6` (`DialogContent-DDE6pQBU.js`, `C = "fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 p-6"`) — a 24 px content edge. Inside it:

| element | left offset from the plate edge |
|---|---:|
| `DialogTitle` (via `DialogHeader` = `flex flex-col gap-y-1.5`, **no padding**) | 24 px |
| footer buttons (`DialogFooter` = `flex … sm:justify-end`, **no padding**) | flush to the 24 px box |
| **`.option-label`** (`.option-row` `padding-inline: 0.25rem`) | **28 px** |

**Failure scenario.** The four option labels — the visual centre of gravity of the dialog — sit 4 px right of
the title above them and 4 px inside the button rail below them. Three left edges, two of which agree.
Aristotelian proportion is not "some number"; it is *the same number wherever the same relation holds*. The
4 px is arbitrary: it is not a hover-plate inset (the plate is the row, and it also stops 4 px short of the
content edge rather than bleeding to it or aligning with it), and it derives from no token.

**Falsifier.** Show padding or an inset on `DialogHeader`/`DialogFooter` at 4.0.0 that would make 28 px the
shared edge. `DialogFooter-8eZbdmPc.js` shows both recipes: header `"flex flex-col gap-y-1.5 text-center sm:text-left"`,
footer `"flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2"` — **neither declares padding**.

---

### D-m4 — The icon size is dead: it bypasses the design system's documented `size-*` escape hatch and loses on specificity. `MINOR`

**File:** `ExportModal.vue:76` — `<Download class="h-3.5 w-3.5" />`

glass-ui's Button base string (`button-BNDWhAZb.js`) contains:

```
[&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none
```

The `:not([class*=size-])` guard **is** the documented opt-out: an icon that wants its own size announces it
with a `size-*` class. `h-3.5 w-3.5` contains no `size-`, so the guard does not exclude it and the rule
applies. Specificity: `.<button-utility> svg:not([class*="size-"])` = class(0,1,0) + `:not()` argument
attribute-selector(0,1,0) + type(0,0,1) = **(0,2,1)**, versus `.h-3\.5` / `.w-3\.5` = **(0,1,0)**.
The system's rule wins; the authored 14 px never lands. `--ui-glyph` is
`calc(1rem * var(--ui-scale))` (`tokens/offsets-sizing.css`) — 16 px at ≥768 px, 18 px below.

**Failure scenario.** The author intends a deliberately small 14 px glyph paired with the label. They get
16–18 px, and the two dead declarations remain in the file as a false record of intent. Writing
`size-3.5` instead would both express the intent and satisfy the guard.

**Falsifier — and this one is conditional, so I state the condition.** The rule must actually be emitted into
fourier's CSS. It is reachable: `dist/styles/index.css:222` declares `@source "../*.js"` precisely so a
consumer's Tailwind scans `dist/*.js` (the flat compiled chunks carrying glass-ui's utility strings), and
`web/src/style.css:3` imports that cascade file. But fourier's last built artefact (`dist/assets/index-57FkGzlZ.css`,
Jun 12, glass-ui 3.x) contains **zero** `_svg` occurrences — that `@source` backstop postdates it.
**Falsifier:** build `web/` on the 4.0.0 pin and `grep 'svg:not(\[class\*="size-"\])'` the emitted CSS. If
absent, the rule never lands, `h-3.5 w-3.5` is live, and the *rendering* half of this claim dies — the
*conformance* half (not using the documented `size-*` hatch) survives either way.
`UNPROVEN-NEEDS-LIVE` on the emission.

---

### D-m5 — Pointer users get a full-row highlight; keyboard users get nothing. `MINOR`

**File:** `ExportModal.vue:106-108` (`:hover` only; no `:focus-within`)

```css
.option-row:hover { background: color-mix(in srgb, var(--muted) 50%, transparent); }
```

`.option-row` is the primary target: full-width, `cursor: pointer`, and — as the `<label>` of its Switch —
click-activating across its whole 40 px box.

**Failure scenario.** Tab through the dialog. The Switch itself gets glass-ui's `focus-ring` (its base class
carries it), a 44×24 outline. The row — the thing that is actually the target, the thing that lights up for
every mouse user — does not change at all. The affordance the design teaches by hover is invisible to
keyboard. One rule, `.option-row:focus-within { background: … }`, restores parity.

**Falsifier.** Any `:focus`, `:focus-within`, or `:has(:focus-visible)` rule on `.option-row`.
`grep -n "focus" ExportModal.vue` → **zero hits in the file**.

---

### D-m6 — No explicit accessible name on any Switch; the tree's own idiom is explicit `aria-label`. `MINOR`

**Files:** `ExportModal.vue:55-70`

Each row is `<label class="option-row"><span>…</span><Switch v-model="…"/></label>` — an *implicit*
association. No `id`, no `for`, no `aria-label`, no `aria-labelledby`. `grep -n "aria-" ExportModal.vue` →
zero.

Two independent reasons this is fragile rather than merely terse:

1. **reka-ui's own name derivation requires the explicit form.** `reka-ui/dist/Switch/SwitchRoot.js`:
   ```js
   const ariaLabel = computed(() => props.id && currentElement.value
       ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
   ```
   With no `id`, this is permanently `undefined`. The primitive has a name-supply mechanism and the call
   site declines it.
2. **`role="switch"` is `nameFrom: author`** — subtree contents are prohibited as a name source, so the
   accessible name rests entirely on accname step 2D (host-language `<label>`) applying to a `<button>` whose
   role has been overridden. Browsers generally do this; it is the least-tested corner of the name computation.
3. **Every other form control in this tree names itself explicitly** — `GalleryCard.vue:91`
   `:aria-label="`Select entry ${entry.image_slug}`"`, `AdminUserList.vue:292` `aria-label="Select all users on this page"`,
   `AdminUserList.vue:367`. ExportModal is the sole divergence.

**Failure scenario (worst case).** An AT/engine that does not apply implicit `<label>` to a role-overridden
button announces four controls as "switch, on" with no name. The user cannot tell Grid lines from Labels.

**Falsifier.** Confirm the accname in a live AT tree (`UNPROVEN-NEEDS-LIVE`). If every engine resolves
"Epicycles"/"Trace path"/"Grid lines"/"Labels", this drops to INFO — the intra-tree idiom divergence
(point 3) survives regardless, and that part is proven from source.

Related, and *not* separately charged: the four switches carry no group semantics (no `<fieldset>`/`<legend>`,
no `role="group"` + `aria-label`). Folded here.

---

### D-m7 — `showClose` left at its default while the component composes its own dismiss control. `MINOR`

**File:** `ExportModal.vue:49` + `:74`

The prop's own documentation states the rule:

```ts
/* DialogContent.vue.d.ts */
/**
 * Render the default top-right close (X) button (default `true`).
 * Set `false` when the consumer composes its own header / dismiss control
 * (e.g. a hand-composed access modal) so the built-in X does not double-up.
 */
showClose?: boolean;
```

ExportModal composes a dismiss control — `<Button variant="outline" … @click="emit('close')">Cancel</Button>`
(`:74`) — and leaves `showClose` unset. Four dismissal paths coexist: Esc, backdrop, ✕, Cancel.

**Failure scenario.** Two visible "get me out" affordances of different weight in a 3-element plate, one of
which (D-M3) is a 16 px sub-minimum target. The ✕ adds a competing exit adjacent to a title, and consumes
the plate's top-right optical corner.

**Counter-argument, stated honestly.** The prop text says "*header* / dismiss control", and Cancel is a
*footer* action; a modal with both ✕ and Cancel is a widespread convention. This is why the finding is MINOR
and not MAJOR: it is a defensible reading of an ambiguous doc. What is *not* defensible is leaving the choice
unmade — the prop exists precisely so the decision is explicit at the call site.

**Falsifier.** Show `showClose` bound anywhere on `ExportModal.vue:49`. It is not.

---

### D-m8 — `min-width: 300px` is inert at every viewport ≥300 px and harmful below it. `MINOR`

**File:** `ExportModal.vue:86-88`

```css
.export-dialog { min-width: 300px; }
```

`DialogContent`'s base geometry is `w-full max-w-lg` on a `position: fixed` element
(`DialogContent-DDE6pQBU.js`, `C`), i.e. `width: min(100vw, 32rem)`.

- Viewport ≥ 300 px → computed width already ≥ 300 px → **the declaration does nothing**.
- Viewport < 300 px (Galaxy Fold 280 px, deep zoom) → the plate is forced to 300 px while
  `left: 50% / translate(-50%)` keeps it centred → **it overflows both edges** and the buttons clip.

**Failure scenario.** The only regime where the rule is not dead is the regime where it breaks the layout.
It is a floor for a constraint the design system already imposes from below and never violates.

**Falsifier.** Show a code path where `DialogContent`'s computed width falls under 300 px on a ≥300 px
viewport. `max-w-lg` is a *maximum*; `w-full` is 100 % of the ICB. There is none.

**Second-order, `UNPROVEN-NEEDS-LIVE`:** whether the scoped `data-v-*` attribute even survives
`DialogPortal`'s Teleport is worth confirming — `class="export-dialog"` reaches the DOM node as a declared,
explicitly-forwarded prop, but the scope-id rides attribute fallthrough into a portaled multi-root subtree.
If it does not land, the rule is doubly dead. Either way the correct edit is deletion.

---

### D-m9 — The title's semantic type token is discarded for a raw size utility. `MINOR`

**File:** `ExportModal.vue:51` — `class="cm-serif text-lg font-semibold"`

`DialogTitle` already applies the design system's semantic register
(`DialogFooter-8eZbdmPc.js`): `cn("text-subheading leading-none tracking-tight", n.class)`, where

```css
/* dist/styles/typography/semantic.css:149-155 */
@utility text-subheading {
    font-family: var(--font-text);
    font-size: var(--type-subheading);
    line-height: var(--type-leading-body);
    font-weight: 600;
    text-wrap: balance;      /* AQ.W3 §W3.3 */
}
```

glass-ui's `cn` ships a **custom twMerge class-group table** (`cn-DJXf4yaB.js`) that registers
`text-(…|subheading|…)` as `font-size`. So `text-lg` and `text-subheading` collide in the same group and
the later — `text-lg`, from the call site — **wins deterministically; `text-subheading` is stripped entirely.**

**Failure scenario.** The title silently loses `text-wrap: balance` and `--type-leading-body`, and detaches
from `--type-subheading` — so a future re-scale of the type ramp moves every other subheading in the
constellation and leaves this one behind. `font-semibold` re-states the 600 the token already carried. The
whole class list is a hand re-derivation of a token that was already applied.

**Falsifier.** Show that `text-subheading` and `text-lg` land in different twMerge groups (they do not — the
custom `font-size` group in `cn-DJXf4yaB.js` lists both patterns), or that the size difference is intended
and documented (nothing in the file says so).

**Nota bene, and it cuts the other way:** because that custom group table exists, this is a *clean*
override rather than a source-order cascade race. That is a design-system superlative — see §5 S-5.

---

### D-m10 — Four labels, three grammatical registers; the output format appears only on the button. `MINOR`

**File:** `ExportModal.vue:56, 60, 64, 68` + `:51` + `:77`

| label | register |
|---|---|
| "Epicycles" | bare plural noun |
| "Trace path" | verb + noun (imperative-shaped) |
| "Grid lines" | compound noun |
| "Labels" | bare plural noun |

"Trace path" is the odd one — it reads as a command ("trace the path") in a list of *things to include*,
which is precisely the reading its own switch contradicts. The renderer calls the same thing `trail`
(`BasisCanvas.vue:143-144`, `lib/canvas-drawing/trail.ts`), and the emitted key is `withTrail` (`:38`) —
so the user-facing noun matches neither the code noun nor its siblings' grammar.

Compounding it: the title says **Frame** (`:51`), the action says **PNG** (`:77`). Nothing in the dialog
states that the output is an image, at what resolution, or that it captures the *current* animation instant
rather than the whole animation. On a page whose primary object is a running animation, "Export Frame" is
genuinely ambiguous between "this instant" and "a frame of video".

**Failure scenario.** A user pauses the animation, opens Export, and cannot tell from the dialog whether
they are about to get a still or a sequence.

**Falsifier.** Any explanatory prose in the dialog. There is none — the component's entire user-facing text
is 6 strings: one title, four labels, two button captions.

**Fix locus:** identical to D-M1 — one `<DialogDescription>` discharges both, and "Trail" (or "Path trail")
aligns the register.

---

## §4 · INFO

- **D-i1 · `gap: 0.125rem` (2 px) is a non-value.** `ExportModal.vue:93`. It is neither 0 (a continuous,
  divider-separated list) nor a perceptible interval — at 2 px the hover plates of adjacent rows read as a
  single mis-rendered block rather than as discrete targets. It is also the proximate cause of D-m2's
  42 px pitch. Against `DialogContent`'s own `gap-4` (16 px) between the three plate sections, the ratio is
  8:1 with nothing at the intermediate step.
- **D-i2 · `transition: background 0.15s`** (`:103`) transitions the *shorthand* — `background-image`,
  `background-position`, `background-size` and the rest — where only `background-color` changes
  (`:107`). Harmless today; `background-color` is the honest declaration. (No PRM concern: glass-ui's global
  bracket rewrites `transition-property` to a safe list that includes `background-color` —
  `a11y-overrides.css:12-16`.)
- **D-i3 · Mixed styling idiom in a 30-line block.** `:111` pulls in the whole `@reference "tailwindcss"`
  machinery (`:85`) to `@apply text-base` — one utility — while the very next line writes
  `font-weight: 500` as raw CSS, and `:100`/`:101`/`:107` are raw CSS throughout. Either the block is
  Tailwind or it is CSS; `@reference` for a single `@apply` is the most expensive way to write
  `font-size: 1rem`.
- **D-i4 · The `Record<string, boolean>` contract** (`:19`; mirrored at `BasisCanvas.vue:462`) is the
  mechanism by which D-B1 became invisible. A shared `ExportOptions` interface makes the publish/consume
  relation checkable by the tree's only type gate. Filed INFO here because the *defect* is D-B1; this is its
  structural precondition.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

- **S-1 · The `onOpenChange` comment is real engineering prose, not decoration.** `:28-30`:
  *"The Dialog is rendered open; reka-ui's DialogRoot drives the focus-trap, Esc-to-close, and `aria-modal`.
  `@update:open` fires `false` on Esc / backdrop / close-button — bridge it to the consumer's `close` event."*
  It names the owning primitive, enumerates the three dismissal sources exhaustively and correctly, and
  explains why a 3-line function exists. Paired with `:47-48`, it is *why* this component hand-rolls zero
  ARIA and *why* the two axe keystones (`visualization-ux.spec.ts:150`, `visualization-crud.spec.ts:640`) are
  green. Most of my a11y findings are about what the design system does *around* this component; almost none
  are about ARIA it got wrong, because it wrote none. **Falsifier:** find a hand-rolled `role`, `aria-modal`,
  `tabindex`, or keydown handler in the file — there is not one.

- **S-2 · The emitted payload is re-gated against the prop, not against the hidden control.** `:37`
  `withEpicycles: props.hasEpicycles && withEpicycles.value`. The Epicycles row is `v-if`-hidden when
  `hasEpicycles` is false (`:55`), but the ref stays `true` — hiding a control does not reset its state.
  The author saw that and closed it at the emit boundary. This is exactly the class of bug D-B1 is; the
  author got the *hard* half right and the trivially-checkable half is what broke downstream.
  **Falsifier:** if `hasEpicycles` flipping false also reset the ref, the guard would be redundant. Nothing
  watches it — `grep -n "watch" ExportModal.vue` → zero.

- **S-3 · The component sits entirely on the stable side of the census §5 break surface.** All three of its
  subpaths — `/button`, `/switch`, `/dialog` — survive the 4.0.0 → 7.0.0 export-map cut (verified against
  the 21-key removal list in lane-frontend §5 and `CHANGELOG.md:20-32`). Zero import-level breaks. Its
  entire F.W1 cost is D-B2's four prop tokens on two lines. For a 114-line file consuming three primitives,
  that is the best available outcome. **Falsifier:** any of the three keys appearing in the removal set —
  none does.

- **S-4 · `<Switch v-model>` with no props at all survives the 4→7 rewrite byte-identically.** 7.0.0's
  `SwitchProps` (`glass-ui/src/components/switch/Switch.vue:8-17`) *adds* `size`/`invalid`/`FormFieldProps`
  and re-authors the internals (`switch__track` + `switch__thumb` spans, colocated `styles.css`) while
  keeping `modelValue`. Because the call site binds nothing but the model, it is immune. Minimal binding
  surface = minimal migration surface, demonstrated. **Falsifier:** a `modelValue` rename or a required prop
  at 7.0.0 — neither exists.

- **S-5 · Reduced motion is correct here with zero local code, and the naive audit reading is wrong.**
  lane-frontend §8 censuses 8 local `@media (prefers-reduced-motion: reduce)` blocks across the tree;
  ExportModal has none, which reads as a gap. It is not. glass-ui 4.0.0 ships a **global** bracket:
  ```css
  /* dist/styles/utilities/a11y-overrides.css:6-16 */
  @media (prefers-reduced-motion: reduce) {
      *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
      *:not([data-allow-motion]) { transition-duration: .1s !important;
          transition-property: opacity, color, background-color, border-color, box-shadow !important; }
  }
  ```
  This clamps the dialog's `zoom-in-95`/`fade-in-0` entry and the scrim fade, and rewrites `.option-row`'s
  `transition: background` to the non-spatial safe list. The component is PRM-correct **by construction**.
  I record this as a superlative rather than a silent omission because an auditor grepping for the local
  idiom would file a false positive here. **Falsifier:** an `[data-allow-motion]` attribute anywhere in the
  subject's rendered subtree — none; the subject sets no data attributes at all.

- **S-6 · The design system's custom twMerge group table makes semantic-token overrides deterministic.**
  `cn-DJXf4yaB.js` registers `text-(micro|small|caption|body|prose|admin-label|heading|subheading|title|display|…)`
  as a `font-size` group alongside the stock `text-(xs|sm|base|lg|…)`. Without it, `text-subheading` and
  `text-lg` would both survive the merge and the winner would be decided by *stylesheet source order* — a
  genuine, invisible, build-order-dependent cascade race across every semantic-token override in the
  constellation. The producer anticipated it. (This does not excuse D-m9; it means D-m9 is a clean, legible
  override rather than a lurking nondeterminism.) **Falsifier:** remove `subheading` from that regex and the
  race returns — it is present.

---

## §6 · Hypotheses I raised and KILLED (the null results, recorded)

An audit that only reports what survived is not falsifiable. Seven candidate defects died against the tree:

| # | hypothesis | why it died |
|---|---|---|
| F-1 | `.cm-serif` (`:51`) is an undefined dead class — the A.W2.a excision removed it and glass-ui never re-supplied it | **FALSE.** `@utility cm-serif` ships at 4.0.0, `dist/styles/typography/utilities.css:65-67`. Only its *token* is unsupplied → the finding is D-M2, a materially different and narrower claim. |
| F-2 | `var(--muted)` (`:107`) is undefined → the whole `color-mix()` is invalid → the hover state is dead | **FALSE.** `dist/styles/tokens/color-radius.css:84` `--muted: var(--neutral-1)`. The hover rule is live. |
| F-3 | `<Download>` (`:76`) lacks `aria-hidden` and pollutes the button's accessible name | **FALSE.** `lucide-vue-next/dist/esm/Icon.js` applies `"aria-hidden": "true"` whenever there is no default slot and no a11y prop. Both conditions hold. |
| F-4 | `toDataURL` (`BasisCanvas.vue:506`) can throw `SecurityError` on a canvas tainted by the image overlay, with no error state | **FALSE.** `composables/useImageOverlay.ts:50` sets `img.crossOrigin = "anonymous"` — a non-CORS image fails to *load*, it never taints. (D-M5 survives on the three *other* silent paths.) |
| F-5 | On mobile with `mobileView === "controls"` the canvas panel is `display: none` (`VisualizationView.vue:444-446`), so export yields a 0×0 blank PNG | **FALSE.** The export trigger lives in `AnimationControls` inside `<div v-if="hasData && !isEditing" class="controls-overlay">` (`VisualizationView.vue:235`) — inside the canvas panel. It is unreachable from the controls tab. |
| F-6 | `text-lg` vs `text-subheading` (`:51`) is a source-order cascade race with an indeterminate winner | **FALSE.** glass-ui's `cn` custom group table resolves it deterministically → became superlative S-6 and the *narrower* D-m9. |
| F-7 | The wrapping `<label>` (`:55-70`) double-toggles the Switch when the Switch itself is clicked | **FALSE.** HTML's label activation behavior explicitly does nothing for events targeted at interactive-content descendants. The `<label>` wrap is a legitimate full-row target — which is why D-m5 (no `:focus-within`) matters. |

---

## §7 · F.W1 uplift ledger for this component

Under the OLD PIN, per the axis brief. Census break-surface rows cited where they overlap; **contradictions
marked**.

| # | surface | 4.0.0 (installed) | 7.0.0 (producer) | disposition |
|---|---|---|---|---|
| U-1 | `<Button variant\|size>` `:74,:75` | legal (`button.d.ts` `ButtonVariants`) | **DELETED** — `emphasis`/`tone`/`size:"xs"\|"sm"\|"md"\|"lg"`; `CHANGELOG.md:71` | **BREAKS · D-B2 · NOT IN THE CENSUS BREAK SURFACE** — census §5 / lane-frontend §5 stop at `metric-badge`/`hover-card`/`hover-popover`/dock/`ToastVariant`. Add a `/button` prop row of ≥27 sites. |
| U-2 | `DialogFooter` mobile gap | `flex-col-reverse` + `sm:gap-x-2` → **0 px** at <640 px | `:where([data-slot="dialog-footer"])` row + `gap: var(--space-body)` at every viewport | **IMPROVES free · D-m1.** Producer names the defect verbatim at `DialogFooter.vue:9-12`. |
| U-3 | `DialogClose` ✕ target | 16×16, `opacity-70`, no coarse floor | 44×44 hit box, glyph 16, rest ink ≥3:1 (`dialog/styles.css:96-99`) | **IMPROVES free · D-M3.** |
| U-4 | `@mkbabb/glass-ui/{button,switch,dialog}` keys | present | **all three present** (21-key removal set excludes them) | **STABLE · S-3.** |
| U-5 | `<Switch v-model>` | `SwitchRootProps` + `class` | `SwitchProps` adds `size`/`invalid`, keeps `modelValue` | **STABLE · S-4** — bare `v-model` is immune. |
| U-6 | `.cm-serif` → `--font-serif-math` | undeclared → generic `serif` | **identical** (`typography/utilities.css:77-79`) | **NOT FIXED by the uplift · D-M2.** Consumer-side cure: declare `--font-serif-math` once in `style.css`. |
| U-7 | `DialogContent` `surface`/`showClose`/`spring`/`scrimAnimation` | present, all unused by the subject | present | **STABLE.** D-m7 asks the subject to *start* using `showClose`. |
| U-8 | `popover-animate` exit grammar | `data-[state=closed]:animate-out …` | retained | **UNCHANGED — and D-M4 keeps it unreachable at both versions.** The `v-if` mount pattern, not the version, is the defect. |
| U-9 | `lucide-vue-next` → `@lucide/vue` | `Download` from `lucide-vue-next` (`:12`) | glass-ui 7 peers `@lucide/vue@^1.16.0` | **BREAKS** — 1 of the 35 sites lane-frontend §5 already books. Import-specifier rename only. |

**Net for ExportModal:** 2 uplift breaks (U-1 severe and uncensused, U-9 mechanical), 2 free improvements
(U-2, U-3), 1 not-fixed carry (U-6), 4 stable.

---

## §8 · `UNPROVEN-NEEDS-LIVE` queue for SS-13

| id | claim | probe |
|---|---|---|
| L-1 | D-M2 — the title paints in generic serif, not Computer Modern | computed `font-family` on the `DialogTitle` node; visual diff against `PaperView.vue:354` |
| L-2 | D-M4 — exit snaps; no `data-state="closed"` frame is painted | record dismissal at ≥60 fps via Esc / ✕ / Cancel / backdrop |
| L-3 | D-m2 — the two adjacent `touch-hit-area::before` halos overlap by 2 px at ≥768 px | `@media (pointer: coarse)` emulation + `getBoundingClientRect()` on the `::before` boxes; resolve `--touch-target` |
| L-4 | D-m4 — `svg:not([class*="size-"])` is emitted and out-specifies `h-3.5 w-3.5` | build on the 4.0.0 pin; grep the emitted CSS; read the icon's computed `width` |
| L-5 | D-m6 — the implicit `<label>` yields a non-empty accname for `role="switch"` | AT accessibility tree (VoiceOver/NVDA), all four switches |
| L-6 | D-m8 (second-order) — the scoped `data-v-*` attribute survives `DialogPortal`'s Teleport | inspect the portaled node for the scope attribute; confirm `.export-dialog` matches |
| L-7 | D-M3 / D-m1 — contrast of the `opacity-70` ✕, and of `.option-row:hover` `color-mix(--muted 50%)` text over the glass surface | sampled contrast in both themes; not token-decidable statically because the backdrop is a blurred composite |

---

## §9 · Ranked repair order (one file, ~20 lines of edit for the top six)

1. **D-B1** — read `withEpicycles` / `withTrail` in `BasisCanvas.exportFrame`, and replace the
   `Record<string, boolean>` on both ends with a shared `ExportOptions` interface. *(Also fixes D-i4;
   also retires the `clearRect(0, 0, 200, 100)` magic rectangle at `BasisCanvas.vue:499`, which is the
   entire `withLabels` implementation: a hardcoded 200×100 CSS-px box at the top-left. It **over-clears**
   horizontally — `labels.ts:23,52-56` lay out from `xBase = 16` and the widest legend row measures well
   under 200 px, so the excess erases whatever grid, trail or epicycle art sits in that corner — and it
   **under-clears** vertically: `labels.ts:26,65` advance `yOff` by 26 px per active basis and then draw
   the `N = …` row at `yOff - 4` (`:73`), so with 3 active bases the last row starts at ≈90 px in a 16 px
   font and survives the 100 px cut. "Labels" is therefore the third control whose promise is only
   approximately kept. **Falsifier:** bound the labels to 200×100 in `labels.ts` — nothing does; the box is
   a literal at the call site, not a value derived from the returned `hitRegions`.)*
2. **D-B2** — `variant="outline" size="default"` → `emphasis="secondary"`; `variant="default" size="default"`
   → `emphasis="primary"`. Two lines. Then extend the F.W1 budget by the other ≥25 `<Button>` prop sites.
3. **D-M1 + D-m10** — add one `<DialogDescription>` stating format, scope and resolution; rename
   "Trace path" → "Trail".
4. **D-M5** — surface failure and success through the `useToast` the tree already ships.
5. **D-M4** — hold a local `open` ref; drop the parent's `v-if` for a `:visible` prop, matching the
   sibling `FullscreenViewer.vue`.
6. **D-M2** — one declaration in `web/src/style.css`: `--font-serif-math: "Computer Modern Serif", …`.
   This repairs the *whole tree's* 20+ `.cm-serif` sites, not just this one.
7. **D-M3 / D-m1** — no action; F.W1 cures both. Book them as uplift acceptance criteria.
8. **Style block** — delete `min-width: 300px` (D-m8); `gap: 0.125rem` → `0.25rem` (D-m2, D-i1);
   `padding: 0.5rem 0.25rem` → `0.625rem 0` (D-m2, D-m3); add `:focus-within` (D-m5);
   `h-3.5 w-3.5` → `size-3.5` (D-m4); drop `text-lg font-semibold` from the title (D-m9);
   `transition: background-color` (D-i2).

---

*Written under the megatranche audit law: `/Users/mkbabb/Programming/fourier-analysis` was read-only
throughout; this file is the sole write. No product source was touched in any repo.*
