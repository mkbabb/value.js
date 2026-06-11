# Lane V5 — Kill-list and No-Op-Class Byte-Verification

Verification date: 2026-06-11  
Branch: tranche-f-handoff (HEAD 0cb5dd2)  
Working tree: /Users/mkbabb/Programming/value.js

---

## (a) Dead Code — Zero-Importer Files

### useCardMenu.ts

File: `demo/@/components/custom/palette-browser/composables/useCardMenu.ts`

Grep for all importers across demo/:
```
grep -r "useCardMenu" demo --include="*.ts" --include="*.vue" -l
```
Result: only the file itself. **CONFIRMED DEAD** — zero consumers. The composable
implements hover-menu positioning logic; `useBreakpoint` from glass-ui/dom and a
local `useLeaveTimer` are both imported inside it, but nothing imports this file.

### useCodeFormatting.ts

File: `demo/@/components/custom/markdown/composables/useCodeFormatting.ts`

```
grep -r "useCodeFormatting" demo --include="*.ts" --include="*.vue" -l
```
Result: only itself. **CONFIRMED DEAD** — zero consumers.  
`useMarkdownHighlighting.ts` handles syntax highlighting and is imported by
`Markdown.vue` (`demo/@/components/custom/markdown/Markdown.vue`).
The audit claim that `useCodeFormatting` is a superseded duplicate is correct.

### usePaletteExport.ts — duplicate pair

Two distinct files exist:
- `demo/@/composables/palette/usePaletteExport.ts` (shared composable)
- `demo/@/components/custom/palette-browser/PaletteDialog/composables/usePaletteExport.ts` (colocated)

Import census:
- `BrowsePane.vue` → imports from `@composables/palette/usePaletteExport` (shared)
- `PalettesPane.vue` → imports from `@composables/palette/usePaletteExport` (shared)
- `PaletteDialog.vue` → imports from `./composables/usePaletteExport` (colocated)

The two files differ only in whitespace (switch-case indentation) and a 7-line JSDoc
comment block at the top of the colocated version. Logic is **byte-identical** for
all five format branches. **CONFIRMED DUPLICATE** — the shared version is consumed by
2 panes; the colocated version by 1 dialog. No consolidation has happened; the pair
is a live duplication hazard.

### katex/Katex.vue + katex/index.ts

`demo/@/components/custom/katex/Katex.vue` is a standalone KaTeX renderer.
`demo/@/components/custom/katex/index.ts` re-exports it.

Grep for imports of the barrel/component across demo/:
```
grep -r "from.*@components/custom/katex\|from.*katex/index" demo --include="*.vue" --include="*.ts" -l
```
Result: **only `useMarkdownHighlighting.ts`** — and that file imports `katex` (the
npm package) directly, not the Vue component:
```ts
import katex from "katex";   // useMarkdownHighlighting.ts:8
```

The 10 color-space reference pages in `assets/docs/*.md` DO import `<Katex>`:
```md
import { Katex } from "@components/custom/katex";  // e.g. assets/docs/hex.md:2
```
These markdown files are loaded via the markdown viewer. So `Katex.vue` and
`katex/index.ts` are **NOT zero-consumer** — they serve the 11 `assets/docs/*.md`
pages. The audit claim that katex is orphaned is **FALSE**.

### ImagePaletteExtractor.vue — orphan vs camera claim

The audit claimed: *ImagePaletteExtractor.vue is orphaned* (routes to ExtractPane).

**REFUTED.** `ImagePaletteExtractor.vue` is imported and rendered by
`PaletteDialog.vue`:
```
demo/@/components/custom/palette-browser/PaletteDialog/PaletteDialog.vue:193
  import { ImagePaletteExtractor } from "@components/custom/image-palette-extractor";
demo/@/components/custom/palette-browser/PaletteDialog/PaletteDialog.vue:80
  <ImagePaletteExtractor …>
```

The camera feature (`startCamera`, `captureFrame`, `videoRef`, `cameraActive`) lives
in `ImagePaletteExtractor.vue` (the PaletteDialog consumer) at lines 117–231.

`ExtractPane.vue` (`demo/@/components/custom/panes/ExtractPane.vue`) is a SEPARATE
full-page pane that independently reimplements the extract flow WITHOUT a camera — it
uses `ImageDropZone`, `ExtractControls`, `ImageEyedropper` (an eyedropper overlay),
and saves via `usePaletteStore`. The camera is NOT in ExtractPane.

Audit's "only the orphan has camera" is incorrect because `ImagePaletteExtractor.vue`
is not an orphan — it is actively consumed via PaletteDialog.

---

## (b) Silent No-Op Classes

### gold-shimmer (without -icon suffix)

Usage sites:
- `ProfileSection.vue:75` — `class="slug-pill cursor-default whitespace-nowrap gold-shimmer"`
- `DockViewSelect.vue:104` — `<span class="gold-shimmer">Admin</span>`

Definition search: **FOUND in glass-ui source**:
```
glass-ui/src/styles/utilities/base.css:335  .gold-shimmer { … }
```
`gold-shimmer` is a shimmer-text gradient animation utility defined in
`glass-ui/src/styles/utilities/base.css` (the gold gradient + background-clip + PRM
animation wrapper). It is published through the glass-ui `@mkbabb/glass-ui/styles`
import chain:
`index.css` → `utilities.css` → `utilities/base.css`.

The demo imports `@mkbabb/glass-ui/styles` at `demo/@/styles/style.css:23`. So
`gold-shimmer` IS defined and available. The audit claim that it is "defined nowhere"
is **FALSE** — it is defined in glass-ui, not locally.

`gold-shimmer-icon` is separately defined as a scoped style in both `Dock.vue:210`
and `DockViewSelect.vue:120–123`.

### pastel-rainbow-text

Usage sites (4):
- `PaletteDialogHeader.vue:37` — definition file (scoped style at :94)
- `PalettesPane.vue:4` — `<span class="capitalize pastel-rainbow-text">My Palettes</span>`
- `DockViewSelect.vue:88` — `:class="entry.id === 'palettes' ? 'pastel-rainbow-text' : ''"`

Definition: **ONLY** in `PaletteDialogHeader.vue` scoped style block (lines 94–107),
a `<style scoped>` section. Scoped styles emit with a `data-v-*` attribute selector,
so the class only matches elements rendered by `PaletteDialogHeader.vue` itself.

`PalettesPane.vue` and `DockViewSelect.vue` are NOT descendants of
`PaletteDialogHeader.vue` at runtime — they are sibling panes. The `pastel-rainbow-text`
class applied in those two files is a **silent no-op**: the CSS rule selector will not
match because the `data-v-*` attribute is absent from the foreign elements.

**CONFIRMED PHANTOM** — 2 external consumer sites (PalettesPane.vue:4,
DockViewSelect.vue:88) apply a scoped class they do not own; the gradient text renders
as plain text.

### glass-elevated in MixResultDisplay.vue:31

```
demo/@/components/custom/mix/MixResultDisplay.vue:31
  <div class="flex flex-col gap-3 p-4 rounded-xl glass-elevated">
```

Glass-ui `.retired-classes.txt` explicitly records:
```
glass-elevated    # retired v0.8.0 ladder rename — replacement: glass-floating
```
(`glass-ui/.retired-classes.txt:28`)

Grep across glass-ui dist confirms no `glass-elevated` rule is present in
`dist/glass-ui.css`. **CONFIRMED PHANTOM** — `glass-elevated` is retired; the
replacement is `glass-floating`. MixResultDisplay.vue:31 applies a dead class.

### dashed-well

Usage sites:
- `MixSourceSelector.vue:111` — `<div class="dashed-well">`
- `CurrentPaletteEditor.vue:3` — `class="dashed-well"`

Definition search across all CSS files and Vue scoped styles in the demo, glass-ui
src/dist, and node_modules/@mkbabb/glass-ui: **zero definitions found**.

No `<style>` block in either consumer file defines `.dashed-well`. Not in
`demo/@/styles/style.css`. Not in glass-ui source or dist. Not in any node_module.

**CONFIRMED UNDEFINED PHANTOM** — both sites apply a class with no CSS rule. The div
renders as an unstyled block.

---

## (c) dock-separator div sites vs glass-ui DockSeparator

Total `<div class="dock-separator">` sites: **13** across 7 files:
- `Dock.vue` — 5 sites (lines 100, 113, 134, 161, 173)
- `ProfileSection.vue` — 2 sites (lines 35, 91)
- `ExtractControls.vue` — 2 sites (lines 37, 56)
- `ActionBarLayer.vue` — 1 site (line 88)
- `SlugEditLayer.vue` — 1 site (line 98)
- `ImageEyedropper.vue` — 1 site (line 10)
- `MixResultDisplay.vue` — 1 site (line 96)

Glass-ui ships `DockSeparator.vue` as a first-class orientation-aware component
(`glass-ui/src/components/custom/dock/DockSeparator.vue`) and exports it publicly
(`glass-ui/src/components/custom/dock/index.ts:16`). The `.dock-separator` CSS class
IS still defined in glass-ui dist (`dist/styles/dock/layer-group.css:35`) and is
consumed by `DockSeparator.vue` internally. The raw `<div class="dock-separator">`
will receive the same CSS as the component, so the visual output is not broken. The
issue is that 13 sites bypass the glass-ui primitive with raw divs, forfeiting the
orientation context the `DockSeparator` component provides (it reads
`DockLayerGroup`/`.glass-dock.vertical` ancestry for axis-awareness).

No DockSeparator imports exist in value.js demo.

---

## (d) text-display usage census

Grep for `text-display` across demo (excluding `font-display`):

- `ColorSpaceSelector.vue:17` — `class="… sm:text-display …"` (the bare `text-display` size token)
- `PaletteDialogHeader.vue:30` — `class="font-display text-title sm:text-display-2 …"` (`text-display-2` variant)

The "audacious-typography" claim of "2 files" is **CORRECT** — exactly 2 files use
the `text-display` family (one `text-display`, one `text-display-2`). Both are
responsive (`sm:` breakpoint prefix), so they only apply at ≥640 px viewport.

---

## (e) useLayerTransition fork vs glass-ui /dock export delta

Value.js local fork: `demo/@/components/custom/dock/composables/useLayerTransition.ts`  
Glass-ui upstream: `glass-ui/src/components/custom/dock/composables/useLayerTransition.ts`

**Return type delta:**

| Property | Local fork | Glass-ui upstream |
|---|---|---|
| `layerProps(id)` | **YES** — returns `{class: string[]; inert: true | undefined}` | **ABSENT** |
| `onTransitionEnd(e)` | YES | YES (kept for call-site parity) |
| `currentLayer` | YES (internal ref) | YES (public Ref) |
| `leavingLayer` | YES (internal ref) | YES (public Ref) |

The local fork's `layerProps()` helper is the critical delta. `ActionBarLayer.vue` at
line 57–58 destructures it:
```ts
const { layerProps: subLayerProps, onTransitionEnd: onSubLayerTransitionEnd } =
    useLayerTransition({ containerEl: subLayerGridEl, activeLayer: activeSubLayer });
```
and uses it in the template at line 68 (`v-bind="subLayerProps('actions')"`).

Glass-ui's upstream `useLayerTransition` does NOT return `layerProps` — it returns
only `{ onTransitionEnd, currentLayer, leavingLayer }`. If value.js were to replace
the local fork with the glass-ui export, `ActionBarLayer.vue` would break (the
destructured `layerProps` would be `undefined`).

**Animation mechanism delta — spring vs CSS transition:**

- Local fork: pure **CSS `transition`** approach — manually sets `el.style.width` px
  values and uses `requestAnimationFrame` + a `setTimeout(400ms)` cleanup. No spring
  library dependency.
- Glass-ui upstream: **SpringProgress analytic spring** from `@mkbabb/keyframes.js` —
  drives `--dock-morph-t` custom property, zero CSS `transition` on the root morph.
  Supports velocity-continuity retarget on interrupt. PRM-aware (snaps scalar 0→1).

The local fork is the original CSS-width mechanism; glass-ui's is the rebuilt AX.W01
single-scalar morph. These are NOT drop-in substitutes. The glass-ui upstream also
exports `useLayerTransition` publicly (confirmed at `glass-ui/src/components/custom/dock/index.ts:40`), but the API is incompatible with the consumer.

**Summary:** The local fork diverges from upstream on (1) the `layerProps` helper
being present only locally, and (2) the animation mechanism (CSS width transition vs
SpringProgress ODE scalar). The fork comment at line 1 correctly documents this delta.

---

## Summary Table

| Claim | Verdict | Evidence |
|---|---|---|
| useCardMenu.ts zero importers | CONFIRMED | grep returns only self |
| useCodeFormatting.ts zero importers | CONFIRMED | grep returns only self |
| usePaletteExport.ts pair is byte-duplicate | CONFIRMED (logic identical, differ only in whitespace + JSDoc) | diff output |
| katex/Katex.vue + index.ts zero consumers | **FALSE** | 11 assets/docs/*.md import `<Katex>` |
| ImagePaletteExtractor.vue orphaned | **FALSE** | PaletteDialog.vue:80+193 imports and renders it |
| Camera feature only in "orphan" | **PARTIALLY FALSE** | Camera is in ImagePaletteExtractor.vue which is NOT orphaned; ExtractPane lacks camera (correct) |
| gold-shimmer defined nowhere | **FALSE** | Defined in glass-ui/src/styles/utilities/base.css:335, published via @mkbabb/glass-ui/styles |
| pastel-rainbow-text defined only in PaletteDialogHeader scoped style | CONFIRMED | PaletteDialogHeader.vue:<style scoped>:94; 2 external consumers (PalettesPane + DockViewSelect) get silent no-op |
| glass-elevated retired in glass-ui | CONFIRMED | .retired-classes.txt:28; absent from dist/glass-ui.css |
| glass-elevated used in MixResultDisplay.vue:31 | CONFIRMED | MixResultDisplay.vue:31 |
| dashed-well undefined anywhere | CONFIRMED | Zero CSS rule definitions found in demo, glass-ui, or node_modules |
| dock-separator: raw divs vs DockSeparator | CONFIRMED — 13 div sites | dock-separator CSS IS in glass-ui dist; DockSeparator.vue is unimported; visual not broken but forfeits orientation context |
| text-display: 2 files | CONFIRMED | ColorSpaceSelector.vue + PaletteDialogHeader.vue (text-display-2) |
| useLayerTransition: layerProps absent upstream | CONFIRMED | glass-ui return type lacks layerProps; local fork adds it for ActionBarLayer |
| useLayerTransition: spring vs CSS-width | CONFIRMED | Local = setTimeout/rAF CSS width; glass-ui = SpringProgress scalar |
