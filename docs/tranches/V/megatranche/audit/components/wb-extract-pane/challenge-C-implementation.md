# CHALLENGE-C · `demo/workbenches/extract/ExtractPane.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was spawned with. The
declaration is explicit, not inherited.

---

## Verdict

**DEFECTIVE.** The premise holds. ExtractPane is 38 lines of pass-through, and every one of its
four responsibilities is discharged wrongly:

| # | it is… | and it… |
|---|---|---|
| 1 | the **routed, KeepAlive-cached unit** | declares no lifecycle at all → the camera keeps recording after you leave the pane (measured) |
| 2 | the **pane-level a11y shell** | ships an unnamed, non-focusable scroll region titled by an `h3` under zero `h1`, with zero live regions over an async surface (measured) |
| 3 | the **prop seam** (`colorSpace`) | re-mints the type locally and receives it through a `Record<string, unknown>` that `vue-tsc` does not check (proven) |
| 4 | the **emit seam** (`pick` / `addColor`) | wires two handlers that **no test in the repo ever fires** (grep) |

Two BLOCKERs, four MAJORs, four MINORs, plus four cross-seat findings recorded with attribution.

Everything below is either a pasted command output, a measured number, a `file:line`, or a
screenshot I looked at. Probe scripts live in this session's scratchpad
(`XPC-probe{1..7}.mjs`, `XPC-mkpng.mjs`, `XPC-tsrepro/`) and are reproducible against the live dev
server at `http://localhost:9000`.

---

## The file, in full (the thing under test)

```
demo/workbenches/extract/ExtractPane.vue           37 lines
 2  <div class="relative w-full mx-auto h-full min-w-0">
 3  <Card tier="resting"
 5     class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
 7    <PaneHeader description="Pull palettes from any image.">Extract</PaneHeader>
11    <ExtractWorkbench class="pb-4 px-4 sm:px-6 pt-2" layout="column"
14        :color-space="colorSpace"
15        @pick="pm.emitSetCurrentColor"
16        @add-color="pm.emitAddColor" />
30  type DisplayColorSpace = SpaceId | "hex";
32  const { colorSpace = "hex" } = defineProps<{ colorSpace?: DisplayColorSpace }>();
36  const pm = inject(COLOR_TARGET_PORT_KEY)!;
```

There are **no lifecycle hooks, no `watch`, no `onDeactivated`, no error boundary, no `ref`** in
this file. That absence is the source of finding C-1.

---

## C-1 · BLOCKER — the pane is the KeepAlive cache unit and defines no deactivation contract; the camera keeps recording, invisibly, after you navigate away

### Mechanism

`ExtractPane` is the *routed* unit:

```
demo/shell/usePaneRouter.ts:72  const ExtractPane = defineAsyncComponent(() => import("../workbenches/extract/ExtractPane.vue"));
demo/shell/usePaneRouter.ts:85  if (name === "extract") return ExtractPane;
demo/shell/PaneSlot.vue:120     <KeepAlive :max="max">
demo/shell/PaneSlot.vue:121-126   <component :is="liveComponent" :key="liveKey" v-bind="liveProps" />
```

So navigating away **deactivates** ExtractPane; it does not unmount it. Every shutdown in the
subtree is written against unmount semantics and therefore never runs:

```
demo/workbenches/extract/ExtractWorkbench.vue:281            onBeforeUnmount(stopCamera);
demo/workbenches/extract/composables/useImageQuantize.ts:148-151  onBeforeUnmount(() => { worker?.terminate(); worker = null; });
demo/workbenches/extract/composables/useExtractSession.ts:194-196 onBeforeUnmount(() => { if (debounceTimer) clearTimeout(debounceTimer); });
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:242-245 (keydown removal + sampler dispose)
```

ExtractPane is the only component in this subtree that knows it is a route. It declares nothing.

### Reproduction (measured, `XPC-probe3.mjs`)

Chromium launched with `--use-fake-device-for-media-stream`; `getUserMedia` wrapped to retain every
`MediaStream`; `window.Worker` wrapped to count construction/termination.

```
$ node XPC-probe3.mjs
STATE boot                  {"headers":["Extract","My Palettes"],"streams":0,"trackStates":[],"workers":{"made":0,"term":0},"videos":0}
STATE after image           {"streams":0,"workers":{"made":1,"term":0},"videos":0}
STATE camera on             {"streams":1,"streamActive":[true],"trackStates":[["live"]],"workers":{"made":1,"term":0},"videos":1}
STATE navigated to #/mix    {"headers":["Mix"],"extractText":"","streams":1,"streamActive":[true],"trackStates":[["live"]],"workers":{"made":1,"term":0},"videos":0}
STATE navigated to #/gradient {"streams":1,"streamActive":[true],"trackStates":[["live"]],"workers":{"made":1,"term":0},"videos":0}
STATE +4s idle elsewhere    {"streams":1,"streamActive":[true],"trackStates":[["live"]],"workers":{"made":1,"term":0},"videos":0}
STATE back on extract       {"extractText":"Extract Pull palettes from any image. SAMPLE 5 kC 0.5 25% of the image DOMINANT oklch(58.391249625054% …","streams":1,"streamActive":[true],"trackStates":[["live"]],"workers":{"made":1,"term":0},"videos":1}
```

Three facts fall out of that transcript:

1. **The camera track is `live` on `#/mix`, on `#/gradient`, and 4 s later** — while `videos: 0`,
   i.e. the `<video>` element is out of the document. The camera is recording with **zero in-app
   indication**. On a phone this is the OS recording indicator staying lit after the user has
   visibly left the feature. This is a privacy defect, not merely a resource leak.
2. **The quantize Worker is `{made: 1, term: 0}` for the whole run** — never terminated.
3. **`back on extract` restores the session text byte-for-byte** without re-uploading — the
   positive proof that the pane was *cached*, not remounted, so `onBeforeUnmount` provably
   never fired.

### Cure (gestalt, not patch)

Two moves, in this order:

1. **Fold `ExtractPane.vue` into `ExtractWorkbench.vue`.** The pane/workbench split exists only to
   serve a second shell that was deleted 18 days ago (`useExtractSession.ts:4-6` still claims "both
   shells now consume this session"; `ImagePaletteExtractor.vue` died in `95993197`). One routed
   component, one injection site, one lifecycle owner.
2. In that one component, **pair every teardown with `onDeactivated`** and treat unmount as the
   degenerate case: `const shutdown = () => { stopCamera(); worker?.terminate(); clearTimeout(…) };
   onDeactivated(shutdown); onBeforeUnmount(shutdown);`. Nothing re-opens on `onActivated` — the
   camera is a user-initiated act, and silently reopening it would be a worse defect.

The repo already documents this exact hazard for a sibling — `demo/picker/visual/HeroBlob.vue:232-233`
("The picker pane is KeepAlive-cached; navigating away parks the blob") — so the pattern is known
and simply was not applied here.

---

## C-2 · BLOCKER — an undecodable image leaves the *previous* image's palette on screen, with a broken preview, no error, and an unhandled rejection

### Mechanism

```
demo/workbenches/extract/composables/useExtractSession.ts:164-168
    async function onFile(file: File) {
        lastFile.value = file;
        previewDataUrl.value = await readAsDataUrl(file);   // ← preview set BEFORE any decode
        runQuantize();                                       // ← not awaited, not caught
    }
demo/workbenches/extract/composables/useExtractSession.ts:153-157
    function runQuantize() {
        if (lastFile.value) quantizeFromFile(lastFile.value, colorCount.value, chromaWeight.value);
    }                                                        // ← returns a Promise into the void
demo/workbenches/extract/composables/useImageQuantize.ts:105-108
    async function quantizeFromFile(file, k, cw) {
        const { pixels, width, height } = await imageFileToPixels(file);   // ← createImageBitmap REJECTS here
        return runQuantize(pixels, width, height, buildOptions(k, cw));    // ← error.value = null; isProcessing = true live INSIDE here
    }
```

`error.value = null; isProcessing.value = true` are set at `useImageQuantize.ts:86-87`, i.e.
**after** the decode. A decode rejection therefore escapes *both* the error channel and the
processing flag: `quantizeError` stays `null`, `isProcessing` stays `false`, and `palette` keeps its
previous value. The template's three-way `Transition` at `ExtractWorkbench.vue:102-168` renders the
`extracted` arm — with stale data.

`accept="image/*"` (`ImageDropZone.vue:30`) and the drop-path MIME filter (`ImageDropZone.vue:97`)
both **pass** a file whose type is `image/png` but whose bytes are corrupt. Truncated downloads,
partial uploads, and formats the engine cannot decode (HEIC in Chrome) all land here.

### Reproduction (measured, `XPC-probe2.mjs` + `XPC-mkpng.mjs`)

`XPC-corrupt.png` = the 8-byte PNG signature followed by ASCII garbage; MIME sniffs as `image/png`.

```
$ node XPC-probe2.mjs
== after normal 64x64 ==
{"paneText":"Extract Pull palettes from any image. SAMPLE 5 kC 0.5 25% of the image DOMINANT oklch(58.39…) Extracted Palette 5", …}
== k=16 ==
{"paneText":"… 16 kC 0.5 14% of the image DOMINANT oklch(71.264967849814% 0.128623877663 46.577542055996deg) Extracted Palette 15", "client":772,"scroll":914, …}
== after CORRUPT png ==
{
 "paneText": "Extract Pull palettes from any image. SAMPLE 16 kC 0.5 14% of the image DOMINANT oklch(71.264967849814% 0.128623877663 46.577542055996deg) Extracted Palette 15",
 "imgs": [{"complete":true,"nw":0,"srcLen":286,"src":"data:image/png;base64,iVBORw0K"}],
 "liveRegions": 0,
 "rejections": ["The source image could not be decoded."]
}
ERRS ["PAGEERROR The source image could not be decoded."]
```

The `paneText` after the corrupt upload is **character-for-character identical** to the previous
image's result. `naturalWidth: 0` — the preview is a broken image. And the failure surfaced only as
an `unhandledrejection` / `pageerror`.

Screenshot: `XPC-shot-corrupt.png` (I looked at it) — the pane shows the broken-image placeholder
reading "Uploaded image", the k-rail painted with the *old* image's gradient, `14% of the image`,
`DOMINANT oklch(71.26496784…`, and a fully populated **"Extracted Palette 15"** card of fifteen
swatches that belong to a different picture. There is no error line anywhere, despite
`ExtractWorkbench.vue:79-85` existing precisely for it ("error ≠ empty: an explicit destructive
line").

A colour tool that shows you a palette which is not from your image, with no error, is lying.

### Adjacent boundary results from the same run (all clean, recorded so no seat re-walks them)

| input | result | assessment |
|---|---|---|
| 1×1 px | `Extracted Palette 1`, `100% of the image` | correct |
| 32×32 flat single colour, k=16 | `Extracted Palette 1`, `100% of the image` | correct (k-means degenerate case handled) |
| 32×32 fully transparent | falls back to `· UNDEVELOPED PLATE — FEED IT AN IMAGE ·` | **honest but mute** — the user fed an image and is told to feed an image; no explanation. MINOR, folded into C-3. |

### Cure

`runQuantize` must own the failure: make `useImageQuantize.quantizeFromFile` set
`error.value = null; isProcessing.value = true` **before** `imageFileToPixels`, wrap the decode in
`try/catch`, and set `error.value` on rejection. `useExtractSession.onFile` must not paint
`previewDataUrl` until the decode has succeeded, and must clear `palette` when a new file arrives —
so the failure states are *empty*, never *stale*.

**Primary owner:** the `wb-extract-workbench` seat (`useExtractSession` / `useImageQuantize`).
Reported here because ExtractPane is the routed surface on which the lie is displayed and no seat
before this one has ever handed the feature a file (see C-9).

---

## C-3 · MAJOR — zero live regions over an async surface; the result is announced to nobody, and the *silent* failure least of all

Measured in every state (`XPC-probe2.mjs`, `liveRegions` = count of `[aria-live], [role=status],
[role=alert]` inside the Extract pane):

```
empty                            liveRegions: 0
after normal 64x64               liveRegions: 0
k=16 (re-quantize, 2.5s)         liveRegions: 0
after CORRUPT png                liveRegions: 0
after 1x1 / transparent / flat   liveRegions: 0
```

The pane performs a multi-second off-main-thread computation and swaps its result in through
`<Transition name="vj-morph" mode="out-in">` (`ExtractWorkbench.vue:102`). A screen-reader user gets
**nothing** — not "extracting", not "5 colours extracted", not the error that C-2 never raises
either.

The absence is *locked in* by the only test that visits this route:

```
e2e/smoke/oracles/o9-shadow-palette.spec.ts:136-138
    await expect(ghost).toHaveAttribute("aria-hidden", "true");
    await expect(ghost).not.toHaveAttribute("role", "status");
```

That assertion is correct in its own terms (the *ghost* must not announce), but nothing anywhere
asserts that the *real* result does. The gate proves the silence and never checks the speech.

**Cure:** one `role="status"` region owned by the pane, carrying the terminal state only —
`"5 colours extracted"` / the error string / `"no colours found"` — never the in-flight skeleton.
This is a pane-level concern (the pane is where an AT user lands), which is why it belongs at this
seat and not in the workbench's result plate.

---

## C-4 · MAJOR — the pane renders an unnamed, non-focusable scroll region whose title is an `h3` under zero `h1`

Measured (`XPC-probe1.mjs`, Chromium 1440×900):

```
HEADINGS [{"tag":"H3","text":"Extract","inMain":true},{"tag":"H3","text":"My Palettes","inMain":true}]
PANES [
 {"head":"Extract","client":576,"scroll":576,"overflowY":"auto","contain":"content",
  "scrollTimeline":"--pane-scroll","tabIndex":-1,"role":null,"ariaLabel":null,"mask":"none"},
 {"head":"My Palettes","client":576,"scroll":576,"overflowY":"auto", … "role":null,"ariaLabel":null}
]
```

Corroborated by the visual REPORT for all four Safari matrices of `/#/extract`
(`audit/visual/REPORT.json`): `"counts": {"main": 1, "h1": 0, …}`.

Three defects in one element:

- **`h1: 0`.** The document's first and only headings are two `h3`s. WCAG 1.3.1 / 2.4.6 heading
  structure: there is no top-level heading and the outline starts at level 3. `ExtractPane.vue:7`
  is the site that emits this route's content heading (through `PaneHeader.vue:21`, which hardcodes
  `<h3>` for all nine panes).
- **Two structurally identical, unnamed scroll regions inside one `<main>`.** `role: null`,
  `ariaLabel: null` on both. An AT user cannot enumerate, name, or jump between "Extract" and
  "My Palettes"; there is no landmark seam between them at all.
- **`overflowY: auto` with `tabIndex: -1`.** The pane *does* overflow once it has content — measured
  `client: 772, scroll: 914` at k=16 (`XPC-probe2.mjs`), i.e. **142 px hidden**. Safari does not
  make scroll containers focusable (Chromium 127+ does), so the region's scrollability depends
  entirely on focusable descendants happening to sit below the fold. WCAG 2.1.1.

**Cure:** the pane root becomes a named region — `<section :aria-labelledby="titleId">` with
`PaneHeader` owning the id and the heading level — and the scroll host gets `tabindex="0"` when it
overflows. Level and id belong in `PaneHeader` (one edit, nine panes inherit, per that file's own
stated design at `PaneHeader.vue:12-20`); the *naming* of this particular region belongs here.

---

## C-5 · MINOR — the `colorSpace` contract is type-unverified in both directions; the type itself is a local re-mint

The prop's only producer:

```
demo/shell/usePaneRouter.ts:139   if (name === "extract") return { colorSpace: model.value.selectedColorSpace };
demo/shell/usePaneRouter.ts:64    props: Record<string, unknown>;
demo/shell/PaneSlot.vue:42        componentProps?: Record<string, unknown>;
demo/shell/PaneSlot.vue:125       v-bind="liveProps"
demo/workbenches/extract/ExtractPane.vue:30-34
        type DisplayColorSpace = SpaceId | "hex";
        const { colorSpace = "hex" } = defineProps<{ colorSpace?: DisplayColorSpace }>();
```

### Proof that `vue-tsc` does not check this seam (`XPC-tsrepro/`)

An isolated two-file reproduction of exactly the shape above, typechecked with **this repo's own
`vue-tsc`**:

```vue
<!-- Parent.vue -->
<Child v-bind="liveProps" />                 <!-- liveProps: Record<string, unknown> = { colourSpace: 12345, colorSpace: "definitely-not-a-space" } -->
<Child :color-space="'not-a-space'" />
<Child :colour-space="'hex'" />
```

```
$ node_modules/.bin/vue-tsc -p XPC-tsrepro/tsconfig.json
XPC-tsrepro/Parent.vue(5,11): error TS2322: Type '"not-a-space"' is not assignable to type '"oklch" | "lab" | "hex" | undefined'.
EXIT=0
```

**One** diagnostic — the *direct* binding. The `v-bind="Record<string, unknown>"` line, carrying a
misspelled prop name **and** an invalid value, produces nothing. Neither does the unknown-prop line
(Vue attribute fallthrough makes that legal by design).

Repo baseline is green, so the "stays green" claim is grounded:

```
$ time ./node_modules/.bin/vue-tsc -p tsconfig.demo.json --noEmit
(no output)   4.89s user 0.32s system 189% cpu 2.749 total
```

### Runtime is currently correct — negative proof recorded

I verified the prop actually works end-to-end before calling it a defect (`XPC-probe5.mjs`: load
`/#/extract?space=…`, upload an image, open the eyedropper, sample a pixel):

```
SPACE=hex   {"readout":"#b04cbd", …}
SPACE=lab   {"readout":"lab(49.405654143097% 53.056211398428 -41.199696486437)", …}
SPACE=oklch {"readout":"oklch(58.941984149591% 0.190105338873 322.925439227661deg)", …}
```

So this is a **gate** defect, not a live break: renaming `colorSpace` to anything, or narrowing its
type, leaves `vue-tsc` green and the pane silently defaulting to `"hex"` forever, and no test would
notice (C-9).

Compounding it: `type DisplayColorSpace = SpaceId | "hex"` at `:30` is the **fourth** copy of a type
whose canonical home is `demo/color-session/color-model.ts:29`
(`export type DisplayColorSpace = PickerSpace | "hex"`, declared at `:1-6` as the type "shared by
the picker, palettes, workbenches, shell and admin"). The other copies are
`ExtractWorkbench.vue:202` and `ImageEyedropper/composables/useImageSampler.ts:21`. The value is
prop-drilled through three hops and re-typed at every one.

**Cure:** delete the local type, import the canonical one; type `PaneSlot`'s `componentProps` as a
discriminated union over the route name instead of `Record<string, unknown>` — then the one seam
that decides this pane's behaviour is checked by the compiler.

---

## C-6 · MINOR (hypothesis — no live path found) — `inject(…)!` dereferenced in the template, with no default and no boundary

```
demo/workbenches/extract/ExtractPane.vue:36   const pm = inject(COLOR_TARGET_PORT_KEY)!;
demo/workbenches/extract/ExtractPane.vue:15-16  @pick="pm.emitSetCurrentColor"  @add-color="pm.emitAddColor"
```

If the port is absent, `pm` is `undefined` and the *render function* throws
`Cannot read properties of undefined`, which Vue swallows into `errorHandler`, leaving a blank pane
rather than a hard failure.

**Reproduction: NONE.** I traced the provider — `usePaletteWiring.ts:60` → `usePalettePorts.ts:246`
`provide(COLOR_TARGET_PORT_KEY, colorTargetPort)`, called in `App.vue` setup, an ancestor of every
`PaneSlot`. There is no reachable path in the shipped app. This is a robustness finding, and it is
sharpened by an **asymmetry inside the same feature**: the child injects defensively —

```
demo/workbenches/extract/ExtractWorkbench.vue:218   const cssColorOpaque = inject(CSS_COLOR_KEY, undefined);
```

— and then masks the absence twice (`cssColorOpaque ?? ''` at `:69` and `:149`), which is edict-2
masking-fallback territory. Two injections, two opposite policies, in a parent and its only child.
One injection site (after the C-1 fold) with one policy — assert, because the app cannot run without
the port — retires both.

---

## C-7 · MINOR — the wrapper `<div>` is a duplicate box carrying two provably dead classes

`ExtractPane.vue:2` — `class="relative w-full mx-auto h-full min-w-0"`, wrapping a `Card` at `:5`
that is itself `w-full … min-w-0 h-full`.

Measured (`XPC-probe6.mjs`):

```
WRAPPER {
 "wrapperClass": "relative w-full mx-auto h-full min-w-0",
 "wrapperMarginLeft": "0px", "wrapperMarginRight": "0px",
 "wrapperWidth": 512, "parentWidth": 512,
 "wrapperPosition": "relative",
 "absDescendantsAnchoredToWrapper": []
}
```

- **`mx-auto` is dead**: `w-full` leaves zero free inline space, so both auto margins compute to
  `0px` and `wrapperWidth === parentWidth`.
- **`relative` is dead**: no absolutely positioned descendant resolves its `offsetParent` to this
  element. The eyedropper overlay (`ImageEyedropper.vue:8`, `absolute inset-0`) anchors to
  `ExtractWorkbench`'s own `relative` root (`ExtractWorkbench.vue:2`) — measured open at
  `{x:200, y:193, w:510, h:684}`, which is the Card's inner box. `position: relative` without
  `z-index` also creates no stacking context.
- The three surviving classes (`w-full h-full min-w-0`) are **duplicated verbatim** on the Card.

So the element is a no-op box. Edict 3 (KISS, no contrivance). It disappears with the C-1 fold.

---

## C-8 · MINOR — `.pane-scroll-fade` produces no fade; the pane's 142 px of hidden content has no affordance

```
demo/shared/ui/PaneHeader.vue:54-57
    .pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

Measured on this pane's live element: `"contain":"content"`, `"scrollTimeline":"--pane-scroll"`,
`"mask":"none"`. The class name promises a scroll fade; its entire body is a containment hint plus a
named timeline consumed by the *header's* animations. At k=16 the pane is `client: 772 / scroll: 914`
— 142 px below the fold with no mask, no shadow, no chevron, nothing.

`ExtractPane.vue:5` is a consumer, not the producer; the cure is `PaneHeader`'s (or glass-ui's
`FadingScroll`, already used at `EasingSpecimenStrip.vue:84`). Recorded here because it is this
pane's measured overflow that goes unindicated. **Owner: `PaneHeader` seat.**

---

## C-9 · MAJOR — vacuous gate: nothing in the repo has ever handed this pane a file

### Census

```
$ grep -rln "ExtractPane|ExtractWorkbench|useExtractSession|ImageDropZone" test/
(no output)

$ grep -rn "extract" e2e/**/*.spec.ts | grep -v "^.*: \*"
e2e/smoke/oracles/o9-shadow-palette.spec.ts:128:    await page.goto("/#/extract");
e2e/smoke/oracles/o9-shadow-palette.spec.ts:129-152  (the only assertions)

$ grep -rn "space=" e2e/ | grep extract
(no output)
```

`o9-shadow-palette.spec.ts:125-165` is the **entire** test surface for this route, and it asserts
exclusively the **empty** state: the ghost exists, is `aria-hidden`, is not `role="status"`, the
undeveloped-plate caption is visible, the pulse is live, the ghost re-segments under the k slider,
PRM makes it static.

`test/image-sampler-v4.test.ts` covers `useImageSampler` (the eyedropper's pixel maths) and nothing
else in this feature.

### Mutations that keep every gate green

| # | mutation to `ExtractPane.vue` | `vue-tsc` | `vitest` | `playwright` |
|---|---|---|---|---|
| 1 | delete `@pick="pm.emitSetCurrentColor"` (`:15`) | green (optional listener) | green (no test) | green — no test ever samples from the extract route |
| 2 | delete `@add-color="pm.emitAddColor"` (`:16`) | green | green | green |
| 3 | rename the prop `colorSpace` → `colourSpace` (`:14`, `:32`) | **green — proven above** | green | green — no e2e sets `space=` on `/#/extract` |
| 4 | replace `inject(COLOR_TARGET_PORT_KEY)!` with `{ emitSetCurrentColor(){}, emitAddColor(){} }` | green | green | green |
| 5 | drop `layout="column"` (`:13`) | green (`layout?` defaults to `"column"`) | green | green |

Mutations 1, 2 and 4 delete **the pane's entire reason to exist** — the emit seam is 2 of its 5
meaningful lines — and every gate in the repo stays green. That is the definition of a vacuous gate.

The C-2 BLOCKER is the direct consequence: the developed path, the error path, and the emit path
have never been executed by any automated check, in any tranche.

**Cure:** one Playwright flow spec that `setInputFiles` a fixture PNG on `/#/extract` and asserts
(a) the palette develops, (b) a corrupt fixture raises a visible error and clears the previous
palette, (c) sampling with `?space=hex` yields a `#rrggbb` readout, (d) navigating away kills the
worker and any camera track. Every one of those four assertions is a line I executed by hand in this
audit; none of them exists in the repo.

---

## Cross-seat findings (attributed, not claimed)

### X-1 · MAJOR — the eyedropper overlay is not modal; Tab walks six controls hidden behind it

Measured (`XPC-probe6.mjs`, eyedropper open over a loaded image):

```
EYEDROPPER_MODALITY {"overlayRole":null,"ariaModal":null,"overlayAriaLabel":null,"anyInert":3}
TAB_SEQUENCE [
 {"name":"Number of colors","insideOverlay":false},
 {"name":"Upload image","insideOverlay":false},
 {"name":"Open camera","insideOverlay":false},
 {"name":"Chroma weight","insideOverlay":false},
 {"name":"Reset","insideOverlay":false},
 {"name":"Palette menu","insideOverlay":false},
 {"name":"Close eyedropper","insideOverlay":true},
 …
]
```

Six focus stops behind an opaque overlay before the first control *in* it. No `role="dialog"`, no
`aria-modal`, no `inert` on the occluded content, no focus trap, no focus restoration on close.
**Owner: `wb-extract-imageeyedropper` seat.** Noted here because ExtractPane's
`overflow-y-auto` + `contain: paint` Card (`:5`) is what forces the overlay to be an in-flow
`absolute inset-0` sibling rather than a real portalled dialog.

### X-2 · MINOR — the pane's contribution to the route's small-tap-target count is the two 12×24 slider thumbs

`REPORT.json` records 6 small tap targets on `/#/extract` in all four Safari matrices. Measured
scoped to the Extract pane only (`XPC-probe6.mjs`):

```
EXTRACT_PANE_TARGETS [
 {"tag":"div","w":462,"h":180,"name":"Upload image, click to browse or d"},
 {"tag":"span","w":12,"h":24,"name":"Number of colors"},
 {"tag":"button","w":40,"h":40,"name":"Upload image"},
 {"tag":"button","w":40,"h":40,"name":"Open camera"},
 {"tag":"span","w":12,"h":24,"name":"Chroma weight"},
 {"tag":"button","w":40,"h":40,"name":"Reset"}
]
```

So: 4 of the route's 6 are shell chrome (the 160×23 slug input and three 22×22 slug buttons); **2 are
this pane's** — the spectrum `Slider` thumbs at **12 px wide** against WCAG 2.5.8's 24 px minimum
(mobile measures 12×44 — still 12 wide). The three `DockControl`s are a healthy 40×40 (44×44 on
mobile). **Owner: `wb-extract-controls` / glass-ui `Slider`.**

The report's `namelessButtons: 3` for this route resolves to those same three `DockControl`s, which
carry `title` but no `aria-label` and no text (`ExtractControls.vue:41, 50, 85`). `title` *is* an
accname fallback, so they are not truly nameless — but the name is invisible to keyboard users and
absent on touch. **Owner: `wb-extract-controls`.**

### X-3 · MAJOR — the pane honours the display space in one readout and ignores it in the other, and prints 12 significant digits

Measured (`XPC-probe4.mjs` / `XPC-probe5.mjs`) at `/#/extract?space=hex`:

- eyedropper readout → `#b04cbd` ✅ (the `colorSpace` prop ExtractPane hops, working)
- dominance readout → `oklch(58.391249625054% 0.169902354278 346.241234139385deg)` ❌

The dominance line (`ExtractWorkbench.vue:137-141`, `session.dominant.value.serialized`) and every
extracted swatch's `css` (`useExtractSession.ts:54, 85-89`) come from `serializeCssColor(source.color)`
— the quantizer's native oklch, with no display-space conversion and no precision limit. So inside
one pane, with the app set to hex, one readout says `#b04cbd` and the other says
`oklch(58.391249625054% …)`; and every palette *saved* from Extract carries 12-significant-digit
oklch strings into the library.

**Owner: `wb-extract-workbench` seat + the `serializeCssColor` precision contract.** It is recorded
here because ExtractPane's *entire prop surface* is `colorSpace`, and it turns out to govern one of
the two colour readouts in the pane it shells.

### X-4 · INFO — the `demo/ui/*` barrel hop and the widened specifier

`ExtractPane.vue:24` imports `Card` from `"../../ui/card"`, a one-line re-export of the glass-ui
**root** barrel, while its own sibling imports narrow subpaths directly
(`ExtractWorkbench.vue:187-188`: `@mkbabb/glass-ui/dock`, `@mkbabb/glass-ui/dom`). glass-ui 7.0.0
publishes `./card` as a narrow key. **Owner: the L (library) seat** — already booked in
`registry/harvest/area-workbenches.json:6840`.

### X-5 · INFO (hypothesis) — `addColor` from Extract has no mobile feedback path

`ExtractPane.vue:16` wires `@add-color="pm.emitAddColor"`. That handler's only feedback mechanism is
a view switch:

```
demo/color-picker/composables/usePaletteWiring.ts:76-78
    const cfg = viewManager.currentConfig.value;
    if (cfg.right !== "palettes") viewManager.switchView("palettes");
```

For the extract view `cfg.right === "palettes"` (`demo/shell/viewSchema.ts:133-142`), so no switch
occurs — correct on desktop, where both panes are visible. On **mobile** only one pane renders
(measured: `headers: ["Extract"]` at 390×844) and `mobilePaneIndex` stays 0, so nothing visible
changes. The sibling handler `emitStartEdit` explicitly sets `viewManager.mobilePaneIndex.value = 0`
(`usePaletteWiring.ts:115-118`); the add path sets nothing, and vue-sonner was removed, so there is
no toast either.

**Reproduction: NONE.** I could not reach the add affordance programmatically — it lives behind a
per-swatch popover (`PaletteCard.vue:321-324 onPopoverAdd`) that my synthetic tap did not open
(`XPC-probe7.mjs`: `POPOVER {"popoverButtons":[],"anyPopper":0}`). Labelled a hypothesis. Whoever
writes the C-9 flow spec should settle it.

---

## Standing-edict compliance for this file

| edict | verdict | evidence |
|---|---|---|
| 1 · no god modules | **PASS** | 37 lines, one responsibility (badly discharged, but singular) |
| 2 · no legacy code | **FAIL (indirect)** | the pane itself *is* the fossil: it exists only for a second shell deleted in `95993197`; `useExtractSession.ts:4-6` still asserts "both shells". The child's `cssColorOpaque ?? ''` masks (`ExtractWorkbench.vue:69, 149`) are masking fallbacks. |
| 3 · KISS, no contrivance | **FAIL** | C-7 — a duplicate wrapper box with two dead classes |
| 4 · glass-ui is the design system | **PASS with note** | uses glass-ui `Card`; the `demo/ui/card` barrel hop is X-4 |
| 5 · root-level styling | **PASS with note** | no per-instance overrides of glass internals; it does set the child's padding from outside via fallthrough `class` (`:12`), so `ExtractWorkbench` has no intrinsic padding contract |
| 6 · animations never deleted | **PASS** | none owned here |
| 7 · idiomatic Vue 3.5 | **PARTIAL** | reactive props destructure with default (`:32`) is correct and current; but the file is missing the one hook its position in the tree demands (`onDeactivated`, C-1). No `defineModel` → the stale-read hazard does not apply. |
| 8 · `verbatimModuleSyntax` | **PASS** | `:28` `import type { SpaceId }`; `:23` `inject` and `:27` `COLOR_TARGET_PORT_KEY` are runtime values, correctly un-typed imports |

---

## Named local hazards — checked, and the negative proof for each

Recorded so no later seat re-walks them:

1. **`defineModel` stale-read** — does not apply. `grep -n "defineModel" ExtractPane.vue
   ExtractWorkbench.vue ExtractControls.vue ImageDropZone.vue` → no hits. The pane is prop-down /
   emit-up throughout.
2. **oklch→HSV hue drift / `stableHue`** — does not apply. No HSV roundtrip in this subtree; the
   `dominant` tiebreak reads `channels[1]` on a `Color<"oklch">`, which *is* chroma, and it handles
   the `"none"` sentinel (`useExtractSession.ts:130-137`).
3. **`ValueUnit` nesting accumulation** — does not apply. `grep -rn "ValueUnit" demo/workbenches/extract`
   → no hits.
4. **reka-ui slider pointer-capture leak** — the two `Slider`s here are glass-ui's, mounted without
   `pointercancel` / `lostpointercapture` handlers. Not exercised in this audit; **owner:
   `wb-extract-controls`**. Not claimed.
5. **Ungated rAF (PRM-RAF epidemic)** — one rAF in the subtree,
   `ExtractWorkbench.vue:249 await new Promise(requestAnimationFrame)` — a single-shot frame wait for
   the `<video>` to mount, not a loop. **Clean.**
6. **WebGL context loss / eager WebGL on the critical path** — the `/#/extract` route's
   `consoleErrors` are `[]` in all four Safari matrices (`REPORT.json`), against the picker route's
   `"WebGL: context lost."`. The one `canvas` on the extract route is the shell's, not the pane's.
   **Clean here.**
7. **`parseCssColor` crash class** — the pane parses nothing. The `@pick` string terminates at
   `useColorPipeline.ts:247-257 applyColorString`, which wraps `parseColor` in `try { … } catch { /* ignore parse errors */ }`.
   Swallowing is its own (booked) smell, but it is not a crash. **Clean here.**
8. **Route visual health** — `overflowX: 0`, `pageErrors: []`, `consoleErrors: []`, `main: 1`,
   `hasDarkClass` correct in all four Safari matrices. That cleanliness is **uninformative**: every
   capture shows the empty state, because no capture has ever uploaded a file (C-9).

---

## Ranked disposition

| id | severity | defect | owner |
|---|---|---|---|
| C-1 | **BLOCKER** | KeepAlive-cached pane with no deactivation contract → camera stays `live` with no UI; worker never terminated | **this seat** (fold + `onDeactivated`) |
| C-2 | **BLOCKER** | undecodable image → previous palette shown as the new result; unhandled rejection; no error UI | `wb-extract-workbench` |
| C-3 | MAJOR | zero live regions over a multi-second async surface | **this seat** |
| C-4 | MAJOR | unnamed, non-focusable scroll region; `h3` title under zero `h1` | **this seat** + `PaneHeader` |
| C-9 | MAJOR | vacuous gate — 5 mutations that delete the pane's purpose keep every gate green | **this seat** |
| X-1 | MAJOR | eyedropper overlay is not modal; 6 focus stops behind it | `wb-extract-imageeyedropper` |
| X-3 | MAJOR | display space honoured in one readout, ignored in the other; 12-digit serialization | `wb-extract-workbench` |
| C-5 | MINOR | `colorSpace` seam unchecked by `vue-tsc`; 4th copy of the canonical type | **this seat** + `shell-paneslot` |
| C-6 | MINOR | `inject(…)!` dereferenced in template; asymmetric with the child's defaulted inject | **this seat** |
| C-7 | MINOR | duplicate wrapper box, `relative` + `mx-auto` measured dead | **this seat** |
| C-8 | MINOR | `.pane-scroll-fade` yields no fade over 142 px of hidden content | `PaneHeader` |
| X-2 | MINOR | 12 px slider thumbs (2 of the route's 6 sub-24 px targets) | `wb-extract-controls` |
| X-4 | INFO | `demo/ui/card` barrel hop widens the glass-ui specifier | L seat |
| X-5 | INFO | add-color has no mobile feedback path (**hypothesis**) | `wb-extract-pane` / `PaletteCard` |

## The single cure that retires the most of it

**Fold `ExtractPane.vue` into `ExtractWorkbench.vue`.** One routed component that owns its chrome,
its injections, and its lifecycle. That single move deletes C-7 outright, collapses C-5's prop hop
and C-6's double-injection policy to one site each, and gives C-1 a natural home — the component
that owns `stopCamera` becomes the component that knows it is a route. C-2, C-3, C-4 and C-9 then
land as four small, checkable edits inside one file instead of four coordinated edits across three.

---

## Artifacts

- probes: `<scratchpad>/XPC-probe{1..7}.mjs`, fixture generator `<scratchpad>/XPC-mkpng.mjs`,
  type-hole repro `<scratchpad>/XPC-tsrepro/`
- fixtures: `XPC-normal.png` (64×64 gradient), `XPC-1px.png`, `XPC-transparent.png`,
  `XPC-flat.png`, `XPC-corrupt.png` (valid signature, garbage body)
- screenshots examined: `XPC-shot-corrupt.png` (the C-2 money shot),
  `XPC-eyedrop-hex.png`, `XPC-mobile-extracted.png`, and
  `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`
