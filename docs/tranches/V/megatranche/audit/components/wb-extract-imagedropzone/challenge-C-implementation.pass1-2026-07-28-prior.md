# CHALLENGE-C — `demo/workbenches/extract/ImageDropZone.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was spawned with. The
declaration is explicit, not inherited.

---

## Verdict: **DEFECTIVE**

The component's primary named affordance — *"Drop an image or click to browse"* — **does not work**.
Drag-and-drop upload fails, silently and reproducibly, in exactly the state where dropping is the
only thing the zone offers. One line of missing spec conformance (`dragenter` is never cancelled)
kills the drop, and the same omission makes the drop highlight strobe. A second structural defect —
the hidden `<input type="file">` living *inside* the element that handles click — makes the "Upload
image" button open the eyedropper overlay instead. Neither is covered by any test; the one test that
names this component does not assert on it.

**Subject:** `demo/workbenches/extract/ImageDropZone.vue` (113 lines) · branch `tranche-u` · HEAD `c654824e`
**Read in full:** the SFC, `ExtractWorkbench.vue` (consumer), `ExtractControls.vue`,
`composables/useExtractSession.ts`, `composables/useImageQuantize.ts`, `e2e/smoke/walk.spec.ts`,
`docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}`.

**Probe ledger** — all against the live dev server at `http://localhost:9000/#/extract`, headless
Chromium (Playwright 1.x, viewport 1440×900). Scripts in `evidence/`; re-run with `node <script>`
from that directory.

| # | script | what it decides |
|---|---|---|
| P1 | `evidence/idz-probe1.mjs` | click re-entrancy through the root; the "Upload image" → eyedropper path |
| P2 | `evidence/idz-probe2.mjs` | silent non-image drop; the unvalidated picker path |
| P6 | `evidence/idz-probe6.mjs` | **the drop failure**: shipped vs. cured, 4 gestures, real CDP drag events |
| P7 | `evidence/idz-probe7.mjs` | the drop-highlight state through a travelling drag |
| P8 | `evidence/idz-probe8.mjs` | a11y of both states; which element the e2e locator resolves to |
| P12 | `evidence/idz-probe12.mjs` | negative control (`scale-[1.01]` renders) |

P6/P7 drive **real, browser-generated drag events** via CDP `Input.setInterceptDrags` +
`Input.dispatchDragEvent` — not synthesised `DragEvent` objects. The events the page receives are
the ones Chromium's own drag controller produces.

---

## C1 · BLOCKER · NEW · Drop-to-upload does not work: `dragenter` is never cancelled

**Defect.** The root binds `@dragover.prevent` and `@drop.prevent` but has **no `dragenter`
handler**. The HTML drag-and-drop model requires a drop target to cancel *both* `dragenter` and
`dragover`; cancelling only `dragover` leaves the document not-handling-the-drag on every update
that changes the drag target element, and a release on such an update is never delivered as `drop`.
In the empty state the zone's interior is a stack of small children — the placeholder `div` (`:46`),
the `svg` icon (`:47`), the prompt `span` (`:48`) — so ordinary pointer travel across the zone
changes the drag target constantly. The gesture *"drag a file in, move across the zone, release"*
fails 100% of the time.

**Mechanism.** Chromium fires `dragover` only when the drag target element is **unchanged** from the
previous drag update; when it changes it fires `dragenter`(new) + `dragleave`(old) and takes the
update's accepted-state from `dragenter`. `ImageDropZone` cancels `dragover` only, so target-change
updates are never accepted, and the subsequent `drop` is not dispatched to the page at all.

**Evidence** — P6, four gestures. `dropEventsDelivered` counts real `drop` events reaching the page.

```
G1_shipped_travelThenRelease   dropEventsDelivered: 0   previewNaturalW: null   errorLine: null
  dragEnter@P1 -> dragenter@ROOT
  dragOver@P1  -> dragover@ROOT
  dragOver@P2  -> dragenter@span.prompt      dragleave@ROOT
  dragOver@P3  -> dragenter@svg.icon         dragleave@span.prompt
  drop@P2      -> dragenter@span.prompt      dragleave@svg.icon        <-- NO drop event

G2_cured_travelThenRelease     dropEventsDelivered: 1   previewNaturalW: 64
  ...identical trace, plus:
  drop@P2      -> drop@span.prompt                                     <-- drop delivered

G3_shipped_stillPointer        dropEventsDelivered: 1   previewNaturalW: 64
G4_shipped_replaceOverPreview  dropEventsDelivered: 1   previewNaturalW: 64
```

G2 differs from G1 by **one runtime line**, injected from the probe without touching source:

```js
zone.addEventListener("dragenter", (e) => e.preventDefault());
```

G3 (pointer never moves) and G4 (an image is already loaded, so the single `<img>` covers the zone
and consecutive updates share a target) both work — which is why the defect has survived: it is
invisible in the state where dropping is *redundant* and total in the state where dropping is the
*only* offered affordance.

`errorLine: null` and `statusText` carrying no extract-related message: the failure is **silent**.
The user drags a file onto a zone that says "Drop an image", releases, and nothing happens.

Canon: MDN *HTML Drag and Drop API → Define a drop zone* — "call `event.preventDefault()` in the
`dragenter` and `dragover` event handlers".

**Reproduction.** `node evidence/idz-probe6.mjs` → compare `G1_shipped_travelThenRelease.dropEventsDelivered`
(0, no preview) with `G2_cured_travelThenRelease` (1, `naturalWidth` 64). By hand: open
`http://localhost:9000/#/extract` with no image loaded, drag a PNG from Finder onto the zone, move
the pointer across the icon/caption, release. No image loads.

**Not measured (hypothesis, labelled as such):** with CDP interception disabled, an uncancelled drop
falls through to the browser default action, which for a file is to navigate the tab to it. I did
not measure this — CDP interception suppresses the default action — so I assert only the measured
part: no `drop` event, no image, no feedback.

**Proposed cure — transposition, not patch.** The zone is trying to be a drop target *and* a
container of independently hit-testable children. Make it one thing: `pointer-events: none` on every
child of the drop surface, so the root is the only drag target and no crossing ever occurs — which
cures C1 and C2 with a single declaration and needs no new event handler. Add `@dragenter.prevent`
regardless, because the spec requires it and because it is what makes the target valid on first
entry. Both belong on the existing root; neither adds a module, a wrapper, or a shared dir.

---

## C2 · MAJOR · CONFIRMS a prior hypothesis · The drop highlight strobes through a travelling drag

**Defect.** `@dragleave.prevent="dragging = false"` (`:24`) fires whenever the drag crosses onto a
child, so the `border-primary bg-primary/10 scale-[1.01]` drag state (`:12`) turns **off** mid-drag
and only returns when two consecutive drag updates happen to share a target. Same root cause as C1.

This was filed as a hypothesis by the workbench seat —
`audit/components/wb-extract-workbench/challenge-C-implementation.md` C-34, *"Reproduction: NONE
executed — hypothesis"*. **It is now measured.**

**Evidence** — P7, real CDP drag, 450 ms settle after each update (> `--duration-normal` = 0.3 s):

```
step             draggingClass   borderTopColor
idle             false           oklab(0.471189 -0.0810328 0.0971413 / 0.3)
dragEnter@P1     false           oklab(... / 0.3)
dragOver@P1      TRUE            oklch(0.471189 0.126502 129.834)      <- on
dragOver@P2      false           oklab(... / 0.3)                      <- off (crossed to span)
dragOver@P3      false           oklab(... / 0.3)                      <- off (crossed to svg)
dragOver@P2      false           oklab(... / 0.3)                      <- off (crossed back)
dragOver@P2      TRUE            oklch(0.471189 0.126502 129.834)      <- on (target unchanged)
```

On in 2 of 6 drag updates. `background-color` flips `…/0.1` ↔ `…/0.05` and `scale` flips 1.01 ↔ 1
alongside, each animating over 0.3 s of `transition-all` (`:8`, `:17`) — so the zone visibly pulses
while the user is holding a file over it.

**Reproduction.** `node evidence/idz-probe7.mjs`.

**Proposed cure.** The same `pointer-events: none` on the children removes the crossings entirely. A
dragenter/dragleave depth counter would also work but adds state to express something the layout
already implies; prefer the declaration.

---

## C3 · MAJOR · NEW · `openFilePicker()` re-enters through its own root — "Upload image" opens the eyedropper

**Defect.** The hidden `<input type="file">` (`:27-33`) is a **descendant of the element that handles
click** (`:21`). `fileInputRef.value?.click()` (`:82`) dispatches a bubbling click that travels back
up through the drop-zone root. The consumer binds a fallthrough `@click` on the component
(`ExtractWorkbench.vue:25`):

```vue
@click="session.previewDataUrl.value && (eyedropperActive = true)"
```

so **pressing the "Upload image" control opens the OS file dialog *and* the eyedropper overlay.**
Chain: `ExtractControls.vue:40-46` (`$emit('upload')`) → `ExtractWorkbench.vue:230-232`
(`dropZoneRef.value?.openFilePicker()`) → `ImageDropZone.vue:81-83` (`fileInputRef.click()`) → the
synthetic click bubbles to the root → the consumer's fallthrough handler fires.

**Evidence** — P1, with an image already loaded:

```
afterUploadButton: {
  "eyedropperOpen": true,
  "log": [ {"on":"input","trusted":false}, {"on":"zone","target":"INPUT","trusted":false} ]
}
fileChooserCount: 1
```

`trusted:false` with `target:"INPUT"` reaching the zone root is the synthetic click, arriving from
inside. Screenshot: `evidence/idz-upload-click.png` — the eyedropper chrome bar ("× Tap to sample")
has taken over the Extract pane, and `ExtractControls` is gone. The user asked to replace the image;
they got the sampler, with the file dialog behind it.

The same re-entrancy fires on every ordinary click of the empty zone — two click events pass through
the root per user click:

```
emptyZoneClick.log: [ {"target":"INPUT","trusted":false}, {"target":"DIV","trusted":true} ]
emptyZoneClick.fileChoosers: 1
```

Only the DOM `click()` in-progress flag stops this from recursing; the component contains no guard
of its own. `fileChoosers: 1` confirms the recursion is bounded — the *duplicate event* is not.

**Reproduction.** `node evidence/idz-probe1.mjs` → read `afterUploadButton.eyedropperOpen` (true) and
`afterUploadButton.log`. By hand: `/#/extract`, load any image, click the Upload icon in the controls
row. The eyedropper opens.

**Proposed cure.** One element is carrying three unrelated activations (browse, sample, drop) and a
file input inside its own click surface. The architectural fix is the one already ruled for D2-11:
promote sampling to a **named `DockControl` beside Upload/Camera**, leaving the zone with one
meaning. Then move the `<input>` out of the interactive surface. Do not paper over it with
`@click.stop` on the input — that hides the coupling instead of removing it, and leaves the zone
still overloaded.

---

## C4 · MAJOR · NEW · The two intake paths disagree about validation; the picker path accepts anything

**Defect.** `onDrop` (`:94-100`) guards `file?.type.startsWith("image/")`. `onFileSelected`
(`:87-92`) has **no guard at all**. The type check lives in one branch instead of at the intake
boundary, so the component's contract depends on which door the file came through. `accept="image/*"`
(`:30`) is a picker *filter hint*, not a guarantee — it is bypassed by dragging a file into the
input, by "All files" in platform dialogs, and by any programmatic set.

**Evidence** — P2, a `text/plain` file through the picker path:

```
afterTxtViaPicker: {
  "imgRendered": true,
  "srcPrefix": "data:text/plain;base64,dGhpcyBpcyBub3QgY",
  "naturalWidth": 0,
  "errorLine": null,
  "zoneLabel": "Image preview area, tap to sample colors",
  "zoneTabIndex": -1
}
newPageErrors: [ "InvalidStateError: The source image could not be decoded." ]
```

The zone commits to its **developed** state around a zero-pixel image: `tabindex` drops to `-1`, the
label starts advertising colour sampling, `cursor: crosshair`, and the only remaining affordance is
an eyedropper over nothing. The failure surfaces as an unhandled page error, never as UI.

The drop path's rejection is equally mute — P2, dropping an `application/pdf`:

```
afterBadDrop: { "errorLine": null, "hasPreview": false, "ariaLive": [] }
```

Nothing happens. No message, no live region, no state change. The user cannot distinguish "rejected"
from "not registered".

**Reproduction.** `node evidence/idz-probe2.mjs` → `afterTxtViaPicker` and `afterBadDrop`. By hand:
`/#/extract`, drag a PDF onto the zone — silence.

**Proposed cure.** One intake function at the boundary that both `@change` and `@drop` call —
validate the type once, and report rejection through the session's **existing** error channel
(`session.quantizeError`, already rendered at `ExtractWorkbench.vue:80-85` as the destructive line).
No new component, no new store, no new directory: the error surface the workbench needs already
exists and is currently unreachable from this component.

---

## C5 · MINOR · NEW · No live region: the zone's async result is announced to nobody

**Defect.** The zone has zero `aria-live` regions in either state (P8: `emptyState.liveRegions: 0`,
`developedState.liveRegions: 0`), and the whole intake is asynchronous (FileReader → worker →
palette). An assistive-technology user activates "Upload image", and nothing announces that an image
arrived, that quantisation is running, or — per C4 — that a file was rejected. The `aria-label`
silently rewrites itself from *"Upload image, click to browse…"* to *"Image preview area, tap to
sample colors"* (P8), which no AT will read unless the user happens to be on the element.

**Reproduction.** `node evidence/idz-probe8.mjs` → `emptyState` / `developedState`.

**Proposed cure.** A polite live region owned by the workbench (not this component — it is the
workbench that knows about processing and errors), announcing the three transitions the session
already models: image accepted, extracting, N colours extracted / rejected.

---

## C6 · MAJOR · DUPLICATE of ledger `D2-11` — new evidence only, do not double-count

`role="button"` with `tabindex="-1"` in the developed state. Already ruled at
`registry/DEFECT-LEDGER.md` (CHALLENGE-D · D2-11). My independent measurement (P8):

```
developedState: { role: "button", tabIndex: -1, ariaLabel: "Image preview area, tap to sample colors", cursor: "crosshair" }
keyboard:       { pickerOpenedByKeyboard: false, tabIndex: -1 }
```

Enter and Space dispatched at the element do nothing, because `@keydown.enter.space.prevent` (`:22`)
is gated on `!disableClick`. Added conformance point not in the existing entry: WAI-ARIA requires an
element with `role="button"` to be focusable — `role="button"` + `tabindex="-1"` is an authoring
error independent of the keyboard-reachability failure.

---

## C7 · INFO · Props are not reactive-destructured, against the file's own siblings

`defineProps<{ preview: string | null; disableClick?: boolean }>()` (`:69-72`) is used undestructured
while the sibling `ExtractControls.vue:103-111` and the parent `ExtractWorkbench.vue:204-209` both
use Vue 3.5 reactive props destructure (edict 7). A local inconsistency, not a fault. No
reproduction; not a defect claim.

---

## Test truth — the one test that names this component does not test it

`e2e/smoke/walk.spec.ts:74-82` is the **only** test in the repo that mentions `ImageDropZone`
(`grep -rl ImageDropZone test/` → 0 files; the sole hit is this e2e spec):

```ts
Extract: async () => {
    await expect(main.getByRole("heading", { name: "Extract" }).last()).toBeVisible();
    // ImageDropZone — role="button" with the W5 a11y upload label.
    await expect(
        main.getByRole("button", { name: /Upload image/i }).last(),
    ).toBeVisible();
},
```

The comment is wrong. That locator matches **two** elements, and `.last()` resolves to the *other*
one (P8):

```
e2eLocator.count: 2
  [0] DIV    "Upload image, click to browse or drop an image here"   isDropZone: true
  [1] BUTTON "Upload image"                                          isDropZone: false
e2eLastIsDropZone: false
```

`[1]` is the `DockControl` in `ExtractControls.vue:40-46`. DOM order puts the drop zone first
(`ExtractWorkbench.vue:15`), the controls second (`:64`), so `.last()` is always the controls button.

**Vacuous gate. The exact mutation that keeps every test green:** delete the entire
`<ImageDropZone … />` element from `ExtractWorkbench.vue:15-26`. The `<button title="Upload image">`
still matches, `.last()` still resolves, the assertion still passes. Weaker mutations that also stay
green: remove `role="button"`, remove the `aria-label`, remove `@drop`, remove `onDrop`'s type
guard, delete the `<input type="file">`, or make `openFilePicker()` a no-op.

Nothing in the suite exercises a drop, a file selection, the drag highlight, or `disableClick` —
which is why C1 (the component's headline feature being broken) shipped.

---

## Negative results — the positive evidence that proves these negatives

Reported so the next seat does not re-litigate them.

1. **No leak surface.** The SFC registers no listener outside the template, creates no observer, no
   timer, no `requestAnimationFrame`, no WebGL context, and holds no growing collection. Its entire
   reactive state is one `ref<boolean>`. The KeepAlive/`onBeforeUnmount` hazard ledgered at
   `DEFECT-LEDGER.md:8195` for the extract subtree does **not** reach this file — it owns nothing to
   tear down. `grep -n "addEventListener\|requestAnimationFrame\|setInterval\|setTimeout\|new .*Observer" ImageDropZone.vue`
   → no matches.
2. **`scale-[1.01]` does render — I nearly filed this as a defect and it is false.** Reading
   `getComputedStyle(el).transform` returns `"none"` because Tailwind v4 emits the `scale` property,
   not a transform, and reading `scale` immediately after the class lands returns `"1"` because
   `transition-all` is mid-flight. Settled read (P12, +600 ms): `{ scale: "1.01", transform: "none",
   transitionProperty: "all", transitionDuration: "0.3s" }`. The CSSOM rule exists:
   `.scale-\[1\.01\] { scale: 1.01; }`.
3. **Zero contribution to the measured a11y counts on `/#/extract`.** `REPORT.json` records
   `namelessButtons: 3` and six `smallTapTargets` for `safari-desktop-light /#/extract`; all six are
   `{160×23 input ""}`, three 22×22 slug-bar buttons (`Switch to slug`, `Generate new slug`,
   `Cancel`), and the two 12×24 slider thumbs (`Number of colors`, `Chroma weight`) — none belong to
   this component. The zone measures 462×180 empty / 462×320 developed (P8) and always carries an
   `aria-label`, so it is neither a small target nor a nameless button.
4. **`verbatimModuleSyntax` clean.** `import { ref, useTemplateRef } from "vue"` and
   `import { ImagePlus } from "@lucide/vue"` are both value imports; the file has no type-only
   import to mark.
5. **Re-selecting the same file works.** `input.value = ""` (`:91`) runs after the synchronous
   `emit`, so the `File` reference is already handed off. Not a stale-read defect.
6. **No `defineModel` / `ValueUnit` / oklch-hue / reka-slider hazard here.** The component holds no
   model, wraps no value, parses no colour, and mounts no slider. Those known local hazards do not
   apply — checked, not assumed.

---

## Family grouping

C1 and C2 are **one mechanism** (`dragenter` never cancelled + children that are independently
hit-testable) with two consequences, one fatal and one cosmetic. C3 and C6 are **one mechanism**
(a single element overloaded with browse + sample + drop, with the file input nested inside its own
click surface). C4 and C5 are **one mechanism** (no intake boundary, therefore no place for
validation or for announcing a result). Three cures, six findings.

The single strongest statement this audit can make: **a component whose entire purpose is "drop an
image here" cannot receive a dropped image**, and no test in the repository would have noticed.
