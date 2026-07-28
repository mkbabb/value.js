# CHALLENGE-C — `demo/workbenches/extract/ExtractWorkbench.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat was
explicitly spawned with. Declared, not inherited.

- **Axis:** implementation (premise: the component is improperly implemented)
- **Subject:** `/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ExtractWorkbench.vue` (293 lines)
- **Blast radius read:** `composables/useExtractSession.ts` (223), `composables/useImageQuantize.ts` (161),
  `ImageDropZone.vue` (113), `ExtractControls.vue` (151), `ExtractPane.vue` (37), `quantize-worker.ts` (44),
  `ImageEyedropper/ImageEyedropper.vue` + `composables/useImageSampler.ts`, `src/quantize.ts` (139)
- **Repo state:** branch `tranche-u`, HEAD `7cae8bd0` (the prompt cited `c654824e`; the tree has
  advanced 5 commits — none touch `demo/workbenches/extract/**`, verified below)
- **Probes:** live dev server `http://localhost:9000` (Playwright, read-only), the mega-tranche visual
  audit `REPORT.json`, `npx tsx` against `src/quantize.ts`

**Verdict: DEFECTIVE.** 21 findings, 2 BLOCKER, 8 MAJOR. The two blockers are both *proven live*, not
inferred: the instrument renders one image while reporting the palette of a different one, and the
camera hardware stays powered after the component unmounts.

---

## Provenance of the HEAD discrepancy

```
$ git rev-parse HEAD
7cae8bd0ba3daa96650e37a9b7efbb4bed89b1fb
$ git log --oneline -5
7cae8bd0 docs(V·megatranche): bank the wall-interrupted challenge harvest ...
041ca263 docs(V·megatranche): fold Phase D ...
6085965e docs(V·megatranche): fold adjudication r2 ...
9bcd5d91 docs(V·mail): row O-11..O-15 + O-10a ...
c0078d96 docs(V·megatranche): durability checkpoint ...
```
All five are `docs(...)`. No source drift under `demo/workbenches/extract/`; the findings below hold
at `c654824e` as well.

---

## C-1 · BLOCKER · The instrument lies: preview and palette can describe different images

**Mechanism.** `useExtractSession.onFile` (`composables/useExtractSession.ts:164-168`) runs two
independent async paths with no request token and no sequencing:

```ts
async function onFile(file: File) {
    lastFile.value = file;                          // synchronous
    previewDataUrl.value = await readAsDataUrl(file); // resolves in FILE-SIZE order
    runQuantize();                                   // re-reads lastFile.value AFTER the await
}
```

`lastFile` is written synchronously in call order; `previewDataUrl` is written in *FileReader
completion* order, which is size-ordered, not call-ordered. Nothing reconciles the two. A second file
dropped before the first `readAsDataUrl` settles causes the later-resolving (larger, *earlier*) read
to overwrite the preview with the stale image, while `runQuantize()` — reading `lastFile.value` at
await-resume time — quantizes the newer one, twice.

**Reproduction (run, output pasted).** Two `drop` events in one tick on `/#/extract`: A = 2400×1800
all-red noise PNG (11,537,022 B), B = 8×8 solid `#0000ff` PNG (107 B).

```json
{
  "fileSizes": { "A": 11537022, "B": 107 },
  "previewIsA_bigRed": true,
  "previewDataUrlLength": 15382718,
  "dominantReadout": ["oklch(45.201371817442% 0.313214388634 264.05202261637deg)"],
  "verdict": "DESYNC: preview=A(red), palette=B(blue)"
}
```

Hue `264.05°` is image **B** (blue). The rendered `<img alt="Uploaded image">` carries a 15,382,718-char
data URL — image **A** (red). The component displays a red photograph and states, in its own words,
that *"% of the image"* is blue.

This is the worst possible failure for a colour instrument: it is not an error, it is a *confident
wrong answer*. `ExtractWorkbench.vue:22` binds the preview and `ExtractWorkbench.vue:118-143` binds the
readout; both trust that the session is internally coherent. It is not.

**Cure (transposition, not patch).** The session needs a monotonic request token. `onFile` becomes a
single ordered pipeline: increment `requestId`, capture it, and gate *both* the preview write and the
quantize dispatch on `requestId === myId`. Better still — and this kills C-7 with it — stop routing
the preview through a `FileReader` data URL at all: `URL.createObjectURL(file)` is synchronous, so the
preview write happens in the same tick as `lastFile` and the desync window closes by construction
(revoke in `onBeforeUnmount` / on replacement).

---

## C-2 · BLOCKER · Camera hardware stays live after the component unmounts

**Mechanism.** `ExtractWorkbench.vue:239-263`:

```ts
async function startCamera() {
    cameraActive.value = true;
    cameraStream = await navigator.mediaDevices.getUserMedia({...});  // ← assignment AFTER the await
    ...
}
function stopCamera() {
    if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
    cameraActive.value = false;
}
onBeforeUnmount(stopCamera);
```

`onBeforeUnmount(stopCamera)` can only stop a stream that has already been assigned. If the component
unmounts while the permission prompt is open, `cameraStream` is still `null` at teardown; the
`getUserMedia` promise then resolves into a **dead component's closure** and the tracks are never
stopped. There is no `AbortController`, no unmounted flag, no post-await guard.

**Reproduction (run, output pasted).** `getUserMedia` stubbed to return a stream whose track records
`stop()` — the stub controls *only the timing*, the component code path is untouched. Click
"Open camera" on `/#/extract`, route away (`location.hash = '#/picker'`), *then* resolve the permission:

```json
{
  "workbenchUnmounted": true,
  "tracks": [ { "id": "S1", "stopped": false } ],
  "verdict": "LEAKED — camera track never stopped"
}
```

In a real browser this is the camera indicator staying lit on a page the user has navigated away from,
with no UI anywhere to turn it off. It survives every in-app navigation; only closing the tab clears it.

**Cure.** The camera is a *resource with a lifetime*, not a pair of functions. Extract a
`useCameraStream()` composable that owns an `AbortController` + a `disposed` flag, guards the
post-await assignment (`if (disposed) { stream.getTracks().forEach(t => t.stop()); return; }`), and
registers its own `onScopeDispose`. Two consumers already want it — this workbench and the dead
`quantizeFromCamera` in `useImageQuantize.ts:115-146`, which is a *third* uncalled implementation of
the same thing (see C-12b).

---

## C-3 · MAJOR · A second camera open orphans the first stream

`ExtractControls.vue:49-55` never disables the camera control. `ExtractWorkbench.vue:70` computes
`:disabled="session.isProcessing.value || cameraActive"` — but `ExtractControls` forwards `disabled`
**only** to the Reset button (`ExtractControls.vue:84`). Upload and Camera stay live. A second click
re-enters `startCamera` and overwrites `cameraStream`, orphaning the first stream's tracks forever.

**Reproduction (run, output pasted).** Click "Open camera" twice, 300 ms apart:

```json
{
  "cameraButtonStateAfterOpen": [ { "disabled": false, "ariaDisabled": null } ],
  "tracks": [ { "id": "S1", "stopped": false }, { "id": "S2", "stopped": false } ],
  "videoCount": 1
}
```

Two live streams, one `<video>`, zero stops. **Cure:** the same `useCameraStream()` — a resource
composable is idempotent on `start()` by construction.

---

## C-4 · MAJOR · The viewfinder cannot be closed

`ExtractWorkbench.vue:34-59`: the camera block's only control is `DockControl title="Capture frame"`.
There is no cancel, no X, no Escape handler, no backdrop dismiss.

**Reproduction (run, output pasted)** — enumerating every button inside the `<video>` container:

```json
{ "viewfinderControls": [ [ "Capture frame" ] ], "videoCount": 1 }
```

A user who opens the camera by accident has exactly two escapes: take a photo they do not want, or
leave the route — and leaving the route mid-permission is C-2. Compounding it, the drop zone stays
click-live behind the viewfinder, so a click there opens the *eyedropper* over the camera rather than
dismissing it. **Cure:** a `title="Close camera"` `DockControl` beside the shutter, `@click="stopCamera"`,
plus a `keydown.escape` — the exact affordance `ImageEyedropper.vue:227-235` already ships for its own
overlay. The pattern exists in the sibling; the camera simply did not get it.

---

## C-5 · MAJOR · Malformed image ⇒ unhandled rejection, no error shown, workbench wedged

**Mechanism.** `useExtractSession.runQuantize` (`composables/useExtractSession.ts:153-157`) calls
`quantizeFromFile(...)` and discards the returned promise — no `await`, no `.catch()`. `quantizeFromFile`
(`composables/useImageQuantize.ts:105-108`) `await`s `imageFileToPixels`, whose `createImageBitmap`
rejects on any undecodable byte stream. The rejection escapes to the window. Worse, the throw happens
*before* `runQuantize()` sets `isProcessing = true` and `error.value = null` (`useImageQuantize.ts:86-87`),
so no state changes at all: no spinner, no error line, no signal.

**Reproduction (run, output pasted).** Drop a `.png` whose bytes are `[1..8]` (a real class: a truncated
download, a renamed file, an HEIC Safari refuses):

```json
{
  "unhandledRejections": ["The source image could not be decoded."],
  "hasPreviewImg": true,
  "imgNaturalW": 0,
  "imgComplete": true,
  "imgSrcPrefix": "data:image/png;base64,AQIDBAUGBwg=",
  "errorLineText": [],
  "mainText": "Extract Pull palettes from any image. SAMPLE 5 kC 0.5 · UNDEVELOPED PLATE — FEED IT AN IMAGE · ..."
}
```

Browser console (`browser_console_messages level=error`):
```
[ERROR] The source image could not be decoded.
```

Three defects in one: (a) a page-level console error the visual audit's clean `consoleErrors: []` for
`/#/extract` never caught, because no capture ever fed the component a file; (b) `errorLineText: []` —
the `v-if="session.quantizeError.value"` line at `ExtractWorkbench.vue:80-85` stays empty, so the user
gets *silence*; (c) the workbench is now **wedged**: `previewDataUrl` is set to the undecodable data
URL, so `:disable-click="!!session.previewDataUrl.value"` (`ExtractWorkbench.vue:23`) flips the drop zone
into sample mode. Clicking it mounts `ImageEyedropper` over a zero-dimension image, where
`onMounted(() => { loadAndFit(); ... })` (`ImageEyedropper.vue:237-240`) also discards its promise and
`sampler.loadImage`'s `img.onerror = reject` (`useImageSampler.ts:74`) fires a **second** unhandled
rejection — behind a blank overlay with no error, exitable only by Escape. There is no path back to the
file picker except the Upload button, and no way to clear the broken image at all (C-20).

**Cure.** `quantizeFromFile` should return a `Result`, not throw — the codebase already runs on
`Result<T, Issue>` (`src/quantize.ts:22`, `serializeCssColor` at `useExtractSession.ts:55`). Make decode
failure a first-class `QuantizeIssue` variant (`quantize_image_undecodable`) that flows into the
existing `quantizeError` channel, and gate the preview write on a successful decode so the zone never
enters sample mode over a corpse.

---

## C-6 · MAJOR · The eyedropper is unreachable by keyboard (WCAG 2.1.1 · 2.4.3)

**Mechanism.** `ExtractWorkbench.vue:23-25` is the whole trigger:

```html
:disable-click="!!session.previewDataUrl.value"
@click="session.previewDataUrl.value && (eyedropperActive = true)"
```

`disableClick` drives `ImageDropZone.vue:19` `:tabindex="disableClick ? -1 : 0"` and gates
`ImageDropZone.vue:22` `@keydown.enter.space.prevent="!disableClick && openFilePicker()"`. So the moment
an image loads, the zone leaves the tab order *and* its keydown handler no-ops — while keeping
`role="button"` and the label *"Image preview area, tap to sample colors"*. The workbench's only
activation binding is a `click` listener. A keyboard user is told there is a button, and it does nothing.

**Reproduction (run, output pasted).** Load a valid 2×1 PNG, then Enter + Space, then a mouse click:

```json
{
  "zoneTabindex": "-1",
  "zoneRole": "button",
  "zoneLabel": "Image preview area, tap to sample colors",
  "overlayBefore": "closed",
  "afterKeyboardEnterSpace": "closed",
  "afterMouseClick": "OPEN",
  "focusWhenOverlayOpen": "DIV|Image preview area, tap to sample colors"
}
```

`focusWhenOverlayOpen` is the fourth defect in the row: when the overlay *does* open, focus stays on
the `tabindex="-1"` div behind it. No focus move, no trap, no `role="dialog"`/`aria-modal`, and on
`@close` (`ExtractWorkbench.vue:177`) no restoration. Colour sampling — the workbench's headline
capability per the T20 comment — is pointer-only.

**Cure.** Stop overloading one element with two mutually-exclusive roles. The zone is a *drop target*;
sampling is an *action*. Give the preview state its own real `DockControl` ("Sample colours from image"),
keep the zone at `tabindex="0"` for replace-by-keyboard, and let `ImageEyedropper` own focus on mount +
restore on close (it already owns Escape at `ImageEyedropper.vue:227`).

---

## C-7 · MAJOR · 45.8 MB allocated and 22.9 MB transferred to read 10,500 of 6,000,000 pixels

**Mechanism.** `useImageQuantize.ts:18-26` decodes at native resolution, rasterises to a full-size
`OffscreenCanvas`, and reads it all back **on the main thread**; `useImageQuantize.ts:93` then copies the
entire buffer *again* before transferring it. Meanwhile `src/quantize.ts:41,52` sub-samples with
`targetPixels = 10_000` — everything else is decoded, copied, copied again, posted, reconstructed, and
skipped.

**Measured (run, output pasted)** — the exact `imageFileToPixels` body replayed on a 3000×2000 JPEG:

```json
{
  "decode_createImageBitmap_ms": 8.6,
  "fullSizeCanvas_drawImage_ms": 0.1,
  "getImageData_mainthread_ms": 13.8,
  "bufferSlice_copy_ms": 1.8,
  "total_mainthread_ms": 24.3,
  "bytesAllocated_MB": 45.8,
  "bytesTransferredToWorker_MB": 22.9,
  "pixelsInImage": 6000000,
  "pixelsQuantizerActuallyReads": 10500,
  "wastedFraction": 0.99825
}
```

**99.825 % of the bytes are never read.** Scale to a 12 MP phone photo (4032×3024, the actual input for
a camera-capable tool): 48.7 MB `ImageData` + 48.7 MB `slice(0)` = **97 MB transient**, on the platform
the repo's own memory record (`MEMORY.md`: iOS Safari stack limits, WebGL context loss) says is the
fragile one. Add C-1's measurement: `previewDataUrlLength: 15382718` — the base64 data URL is
**15.4 MB of retained string** for an 11.5 MB file (4/3 inflation), held for the session and re-decoded
a second time by the eyedropper.

`createImageBitmap` takes `resizeWidth`/`resizeHeight` and does the downscale in the decoder, off-thread.
The whole main-thread readback is avoidable.

**Cure.**
```ts
const bitmap = await createImageBitmap(file, { resizeWidth: 200, resizeHeight: 150, resizeQuality: "low" });
```
sized to `sqrt(targetPixels)` — then the canvas is 200×150, `getImageData` is 120 KB, and the `slice(0)`
disappears entirely (transfer `imageData.data.buffer` directly; the `ImageData` is discarded on the very
next line, so detaching it costs nothing). Same for the preview: `URL.createObjectURL` is O(1) and drops
15.4 MB.

---

## C-8 · MAJOR · The dominance readout can name a colour that is not the card's first swatch

`ExtractWorkbench.vue:113-117` states the invariant in its own comment:

> *"The duplicate dominant dot died — the card's first swatch IS the dominant specimen."*

It is false. `src/quantize.ts:128` orders the palette by `output.sort((a, b) => b.population - a.population)`
— a stable sort, so ties keep *insertion* order. `useExtractSession.ts:121-142` orders by a *different*
rule: strict `>` on population **plus a chroma tiebreak**. The two disagree on every population tie.

**Proof — library derivation (`npx tsx`, output pasted):**
```
$ npx tsx scratchpad/tie.ts   # quantizePixels([#ff0000, #0000ff], 2, 1, { k: 5, chromaWeight: 0.5 })
returned order (index -> chroma, hue, population):
0 [0.6279553639214313,0.2576833038053608,29.233880279627897] pop= 1   ← colors[0] = RED  (C 0.258)
1 [0.4520137181744238,0.3132143886344849,264.05202261636987] pop= 1   ← RED is first swatch
```

**Proof — live readout for that same image (run, output pasted):**
```json
{ "dominant": ["oklch(45.201371817442% 0.313214388634 264.05202261637deg)"], "pctLine": "50% of the image" }
```

`colors[0]` is the red cluster (hue 29.2°); the readout names the blue one (hue 264.05°, the
higher-chroma tiebreak winner). The card's first swatch is red, the line above it reads blue, and
nothing links the readout to any swatch. **Cure:** delete the 22-line `dominant` loop. `quantizePixels`
already guarantees max-population-first, so `dominant = presented.value[0] ?? null` is the whole
function, is *by construction* the first swatch, and restores the stated invariant. (If a chroma
tiebreak is genuinely wanted, it belongs in `src/quantize.ts`'s sort where the card's ordering also
sees it — one ordering, one truth.)

---

## C-9 · MAJOR · Vacuous gate: no test in the repo ever feeds this component an image

```
$ grep -rn "setInputFiles\|DataTransfer\|input\[type=.file" e2e/ test/
(no output)
```

Nothing — unit or e2e — ever supplies a file. The extract-adjacent coverage that exists:

| gate | what it asserts | reaches the developed path? |
|---|---|---|
| `test/image-sampler-v4.test.ts` (3 its) | `useImageSampler.formatInColorSpace` string projection | no — different file, no image |
| `e2e/.../o9-shadow-palette.spec.ts:125` | the **empty** plate: ghost aria-hidden, caption text, k-slider re-segments | no — never loads an image |
| `e2e/.../o18-contrast-census.spec.ts:1080` | slider **track contrast** ≥3:1 | no |
| `e2e/.../o7-card-census`, `o10d`, `o11` | heading/card census strings | no |
| `e2e/smoke/walk.spec.ts:74` | the "Extract" heading is visible | no |

There is **no** test of `ExtractWorkbench.vue`, `useExtractSession.ts`, or `useImageQuantize.ts`.

**The mutation that keeps every gate green:** replace the body of `useExtractSession.onFile` with
`{ lastFile.value = file; }` — delete the preview read and the quantize dispatch entirely. Also delete
`startCamera`/`stopCamera`/`captureFrame` and the entire `ImageEyedropper` mount
(`ExtractWorkbench.vue:172-180`). Every existing test still passes: the O-9 oracle only visits the
never-fed empty state, and the census oracles only count headings and cards. **The component's whole
reason to exist is untested**, which is precisely why C-1, C-5, and C-8 shipped.

**Cure.** One component test that drives a synthetic `File` through `useExtractSession` with an injected
`workerFactory` — the seam is already built and documented at `useImageQuantize.ts:35-41` ("*tests + a
Safari-worker fallback can swap a fake/pooled factory*") and has **zero** callers. The affordance was
designed and then never used.

---

## C-10 · MAJOR · Async results are announced to nobody

**Measured on `/#/extract` (run, output pasted):**
```json
{ "live": [] }   // [aria-live], [role="status"], [role="alert"] inside <main> — none
```

- The error line (`ExtractWorkbench.vue:80-85`) has no `role="alert"`, no `aria-live`. Errors are silent.
- The result branch (`ExtractWorkbench.vue:108-157`) has no live region. An extraction completing —
  the entire point — is silent.
- The **one** announcing element, `PaletteCardSkeleton` (`role="status" aria-label="Loading palette"`),
  is unreachable in practice. Measured end-to-end on a 6 MP drop:

```json
{ "skeletonAppearedAtMs": "NEVER", "cardAppearedAtMs": 250 }
```

`Transition mode="out-in"` (`ExtractWorkbench.vue:102`) requires the shadow plate's leave transition to
finish before the skeleton may enter; the worker returns first, so the branch is superseded before it
ever mounts. The elaborate 15-line comment at `ExtractWorkbench.vue:87-101` describes a state that does
not render. A screen-reader user drops an image and receives **no feedback of any kind**.

**Cure.** A single polite live region on the result column that speaks the outcome
(`"5 colours extracted, dominant oklch(...) at 50%"`), and `role="alert"` on the error line. The
skeleton's `role="status"` is the wrong carrier — it announces the *wait*, not the *answer*, and it is
racing a transition it cannot win.

---

## C-11 · MAJOR · This component contributes the entire nameless-button count of its route, in all four Safari matrices

`docs/tranches/V/megatranche/audit/visual/REPORT.md:98,105,110,112` — `/#/extract: 3`, in every matrix.
`/#/extract` is the highest-scoring route in the repo; every other route scores 0 or 1.

**Attributed live (run, output pasted):**
```json
{ "namelessCount": 3, "nameless": [
  { "title": "Upload image", "cls": "dock-icon-button ...", "rect": { "w": 40, "h": 40 } },
  { "title": "Open camera",  "cls": "dock-icon-button ...", "rect": { "w": 40, "h": 40 } },
  { "title": "Reset",        "cls": "dock-icon-button ...", "rect": { "w": 40, "h": 40 } } ] }
```

All three are `ExtractControls.vue:40,49,83`. `DockControl` (glass-ui `dist/dock.js:1121`) exposes no
label prop and forwards no `aria-label`; the only name source is `title`, which is the *last-resort*
accname fallback, is not surfaced on touch at all, and is inconsistently exposed by VoiceOver.

**Tap targets, same route, same report** (`REPORT.json`, `smallTapTargets`), two of six are this
component's, confirmed live:
```json
{ "thumbs": [
  { "label": "Number of colors", "tag": "span", "w": 12, "h": 24, "now": "5" },
  { "label": "Chroma weight",    "tag": "span", "w": 12, "h": 24, "now": "0.5" } ] }
```
**12 px wide** against WCAG 2.5.8's 24×24 minimum — a hard AA failure on the two primary controls, on a
route whose visual capture (`shots/safari-mobile-light/extract.png`, read) shows them as the dominant
mobile interaction surface.

**Cure.** Per owner edict 4 the fix is *in glass-ui*, not here: `DockControl` should take a `label` prop
and emit `aria-label` (keeping `title` for the mouse tooltip) — one change fixes 18 nameless buttons
across 7 routes. The slider thumb width belongs to the demo `Slider` root
(`demo/ui/slider`, edict 5: root-level, never per-instance).

---

## C-12 · MAJOR · Dead dual paths (owner edict 2: no legacy code, no dual paths)

**(a) `layout: "split"` is unreachable.** Enumerated:
```
$ grep -rn "ExtractWorkbench" demo/ | grep -v ExtractWorkbench.vue:
demo/workbenches/extract/ExtractPane.vue:11:            <ExtractWorkbench
demo/workbenches/extract/ExtractPane.vue:25:import ExtractWorkbench from "./ExtractWorkbench.vue";
```
Exactly one call site, and it passes `layout="column"` (`ExtractPane.vue:13`). The `"split"` branch is
dead in **four** template expressions (`ExtractWorkbench.vue:4-8, 13, 17-21, 148`), and it is the sole
consumer of `useBreakpoint("(min-width: 640px)")` (`ExtractWorkbench.vue:226`) — a live `matchMedia`
listener registered on every mount to feed a condition that can never be true. The composable's own
docblock (`useExtractSession.ts:5`) still claims *"both shells now consume this session"*; the second
shell no longer exists.

**(b) `quantizeFromCanvas` and `quantizeFromCamera` have zero callers.** `useImageQuantize.ts:110-146`
— 37 lines including a *third*, independent `getUserMedia` implementation with its own video element,
its own dimension-wait, and its own `stop()`. `grep` finds no consumer. It is the camera lifecycle
C-2/C-3 needed, written and then abandoned in a module the workbench imports.

**(c) `kSliderGradient`'s `"var(--muted)"` fallback never renders** (`useExtractSession.ts:103`).
`ExtractControls.vue:22` applies `{ background: gradient, backgroundColor: trackInk, ... }` — the later
`backgroundColor` always overrides the colour the shorthand set, so pre-image the fallback string is
inert. A masking fallback that masks nothing.

**Cure.** Delete `"split"`, `isWide`, the `useBreakpoint` call, `quantizeFromCanvas`,
`quantizeFromCamera`, and the `"var(--muted)"` string. Correct the stale docblock. ~60 lines of a
294-line component serve paths that cannot execute.

---

## C-13 · MINOR · In-flight quantizes are neither cancelled nor tokenised

`useImageQuantize.ts:89-98` stores a single `pendingResolve`/`pendingReject` pair. A second
`runQuantize` before the first reply overwrites both: the earlier promise **never settles**, and the
first worker reply then resolves the *second* caller with the *first* palette and sets
`isProcessing = false` (`useImageQuantize.ts:65`) while run #2 is still in the worker — the skeleton
drops early and a stale palette renders until #2 lands. The worker is also never re-created after
`onerror` (`useImageQuantize.ts:69-75` sets `error` but leaves the dead worker installed), so a single
worker crash bricks every subsequent extraction for the session.

*Reproduction: NONE — hypothesis by code path. Overlap needs a quantize exceeding the 300 ms debounce
(`useExtractSession.ts:159-162`); on the desktop probe the full cycle measured 250 ms, so I could not
force it. The dropped-promise and dead-worker mechanisms are unconditional and visible in the source.*

**Cure.** A per-request id on the postMessage payload, echoed by the worker
(`quantize-worker.ts:20`), with replies whose id ≠ current discarded — the same token that cures C-1,
applied one layer down.

---

## C-14 · MINOR · `isProcessing` is false during the decode window

`quantizeFromFile` (`useImageQuantize.ts:105-108`) `await`s `imageFileToPixels` **before**
`runQuantize` sets `isProcessing = true` (`useImageQuantize.ts:87`). Measured cost of that blind window
on a 6 MP file: **24.3 ms** main-thread on this machine (C-7 table), multiples of that on mobile Safari
for a 12 MP capture. Nothing renders during it, and if the decode throws, nothing ever renders (C-5).
**Cure:** set `isProcessing` at the top of `quantizeFromFile`, in a `try/finally`.

---

## C-15 · MINOR · Camera failures are written into the quantize error channel

`ExtractWorkbench.vue:252`:
```ts
session.quantizeError.value = `Camera access denied: ${err}`;
```
Three problems. (i) `quantizeError` is a *writable computed* whose setter writes `workerError`
(`useExtractSession.ts:66-73`) — a camera fault is filed as a quantizer fault, and the next successful
quantize silently erases it (`useImageQuantize.ts:86`). (ii) The component reaches through the session
object to mutate composable-owned state instead of calling an action — the encapsulation the session
exists to provide, bypassed at the one place it matters. (iii) A raw `DOMException` is
template-interpolated, so the user reads *"Camera access denied: NotAllowedError: Permission denied"*.
There is also no dismiss: a denial with no subsequent upload leaves the line up forever.
**Cure:** a separate `cameraError` ref with its own line, and a `session.setCameraError()` action;
map the three real `getUserMedia` rejection names to human sentences.

---

## C-16 · MINOR · `@click="() => {}"` — a lying affordance

`ExtractWorkbench.vue:152` binds an explicit no-op to `PaletteCard`'s `click` emit. The card's root
(`PaletteCard/PaletteCard.vue:19`) unconditionally carries `cursor-pointer` and the `cartoon-surface`
press choreography, so the result card advertises hover, press-squash and a pointer cursor while doing
nothing. **Cure:** `PaletteCard` should derive `cursor-pointer` from whether a `click` listener is
attached, or take an `interactive` prop — a root-level fix (edict 5), not a per-instance override here.

---

## C-17 · MINOR · Vue 3.5 idiom violated inside a single file (owner edict 7)

```ts
const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);   // :222
const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");              // :223
```
Two adjacent template refs, two different idioms. `useTemplateRef` is the 3.5 form and is used
correctly one line below, and correctly in `ImageDropZone.vue:78`. **Cure:**
`useTemplateRef<InstanceType<typeof ImageDropZone>>("dropZoneRef")`.

*(`verbatimModuleSyntax`, edict 8: **PASS** — `SpaceId` at `:189` and `QuantizedColor`/`QuantizeOptions`
in both composables are all `import type`. No violation found.)*

---

## C-18 · MINOR · `await new Promise(requestAnimationFrame)` as a DOM-settle wait

`ExtractWorkbench.vue:249`. Three faults: it is a raw ungated rAF in a repo carrying a documented
PRM-RAF epidemic; it is never cancelled, so on unmount it resolves into a dead closure (compounding
C-2); and rAF is **suspended in background tabs** — backgrounding the tab during the permission prompt
means `videoRef.value.srcObject = cameraStream` (`:250`) never runs, leaving the camera live behind a
permanently black viewfinder that C-4 gives no way to close. **Cure:** `await nextTick()` — the
guaranteed, cancel-safe DOM-flush primitive, which is what the line actually wants.

---

## C-19 · MINOR · `captureFrame` trusts three things that can be null

`ExtractWorkbench.vue:265-279`: `canvas.getContext("2d")!` (non-null assertion — returns `null` under
memory pressure or a context-limit, exactly the mobile-Safari condition C-7 manufactures), and
`canvas.toBlob((b) => resolve(b!))` — a `null` blob makes `new File([null], ...)` stringify to the
4 bytes `"null"`, which then takes the C-5 path: unhandled rejection, no error, wedged workbench. There
is also no re-entrancy guard on the shutter. *Reproduction: NONE — hypothesis.* **Cure:** narrow both,
and route a null result to the same `Result` error channel C-5 proposes.

---

## C-20 · MINOR · Reset does not reset; a loaded image can never be removed

`useExtractSession.onReset` (`:180-184`) restores `colorCount = 5` and `chromaWeight = 0.5` and
re-quantizes — it never clears `previewDataUrl`, `lastFile`, or the palette. The control is a
`RotateCcw` icon named "Reset" (`ExtractControls.vue:83-90`), which reads as "clear". Combined with
`:disable-click` (C-6), there is **no path anywhere in the workbench that returns it to the empty
state** — the ShadowPalette / "undeveloped plate" surface is reachable exactly once per mount, on first
paint. **Cure:** `onReset` clears the session (image, palette, k, kC) and the control is renamed
"Clear image"; if a params-only reset is also wanted it is a second, separately-named control.

---

## C-21 · INFO · `extractedPalette` mints timestamps inside a computed

`useExtractSession.ts:95-96` calls `new Date().toISOString()` for `createdAt` **and** `updatedAt` inside
the computed body, with `paletteName.value` as a dependency (`:92`). Renaming the palette therefore
re-mints its creation date, and every recompute hands `PaletteCard` a fresh object identity.
**Cure:** stamp `createdAt` once when the palette is produced, not on every read.

---

## Negative results (checked, clean — recorded so the next seat need not re-walk them)

- **`verbatimModuleSyntax`** — every type-only import in all six files is `import type`. Clean.
- **`ValueUnit` nesting accumulation** — no `new ValueUnit(...)` anywhere in the extract tree; the
  palette rides `Color<"oklch">` + `serializeCssColor`. Not applicable.
- **`defineModel` stale-read hazard** — no `defineModel` in the tree; sliders are
  `:model-value` + `@update:model-value` (`ExtractControls.vue:29-33, 70-76`), the correct one-way form.
- **oklch→HSV hue drift / `stableHue`** — the extract path never round-trips through HSV; hue comes
  straight from `convertColor(oklab → oklch)` (`src/quantize.ts:111`). Not applicable.
- **reka-ui pointer-capture leak** — no `pointercancel`/`lostpointercapture` handling is needed here;
  the sliders are the shared `demo/ui/slider` root, whose recovery is that component's concern.
- **`useBreakpoint` listener cleanup** — glass-ui `dist/dom.js:46-49` removes its `matchMedia` listener
  on scope dispose. Clean (the *call* is dead — C-12a — but it does not leak).
- **Worker termination** — `useImageQuantize.ts:148-151` terminates on unmount. Clean.
- **Debounce timer cleanup** — `useExtractSession.ts:194-196` clears on unmount. Clean.
- **`chromaWeight = 0` boundary** — `buildOptions` (`useImageQuantize.ts:102-103`) distinguishes `0`
  from `undefined` correctly, and `v && $emit(...)` (`ExtractControls.vue:76`) tests the *array*, not
  the value, so `[0]` passes. Clean — this is the exact spot a falsy-check bug usually lives.
- **`k` domain** — slider `min=1 max=16 step=1` (`ExtractControls.vue:26-28`) sits inside
  `src/quantize.ts:44`'s `k ∈ [1, 64]` integer guard. Clean.
- **Empty palette / zero-alpha image** — `src/quantize.ts:65` returns `{ ok: true, value: [] }`;
  `extractedPalette` (`useExtractSession.ts:77`) maps empty → `null` → the shadow branch. Correct.
- **`position` divide-by-zero at length 1** — `i / Math.max(1, len - 1)` (`useExtractSession.ts:87`).
  Guarded.
- **`parseCssColor` crash class** — the workbench itself never parses; the one live `parseCssColor` in
  the blast radius (`useImageSampler.ts:58`) is fed a self-generated `#rrggbb` and is covered by
  `test/image-sampler-v4.test.ts`. Not this component's exposure.
- **Horizontal overflow / dark-class / main-count** — `REPORT.json` `/#/extract`: `overflowX: 0`,
  `hasDarkClass` correct per matrix, `main: 1`, `pageErrors: []`, in all four Safari matrices. Clean.

---

## Defect table

| id | severity | defect | evidence |
|---|---|---|---|
| C-1 | BLOCKER | preview ≠ palette: the readout describes a different image | live repro, JSON pasted |
| C-2 | BLOCKER | camera stream leaks when unmount races the permission prompt | live repro, `stopped: false` |
| C-3 | MAJOR | second camera open orphans the first stream | live repro, 2 tracks unstopped |
| C-4 | MAJOR | viewfinder has no close affordance | live enumeration |
| C-5 | MAJOR | malformed image ⇒ unhandled rejection, no error, wedged | live repro + console error |
| C-6 | MAJOR | eyedropper keyboard-unreachable; focus never enters overlay | live repro |
| C-7 | MAJOR | 45.8 MB / 22.9 MB moved to read 0.175 % of it | measured |
| C-8 | MAJOR | dominance readout contradicts the card's first swatch | tsx derivation + live readout |
| C-9 | MAJOR | vacuous gate — no test ever feeds an image | `grep` (empty) |
| C-10 | MAJOR | no live region; the only announcer never renders | measured `live: []`, `NEVER` |
| C-11 | MAJOR | 3 title-only button names + 2× 12 px slider thumbs | REPORT.json + live |
| C-12 | MAJOR | dead `"split"` layout, dead camera/canvas APIs, dead fallback | `grep` enumeration |
| C-13 | MINOR | no request token; dropped promise; dead worker never replaced | code path (hypothesis) |
| C-14 | MINOR | `isProcessing` false during the 24.3 ms decode window | measured |
| C-15 | MINOR | camera errors filed as quantize errors; raw DOMException in UI | `:252` |
| C-16 | MINOR | `@click="() => {}"` under `cursor-pointer` + press choreography | `:152` |
| C-17 | MINOR | `ref` vs `useTemplateRef` on adjacent lines | `:222` / `:223` |
| C-18 | MINOR | raw rAF as a DOM wait; suspended in background tabs | `:249` |
| C-19 | MINOR | `getContext("2d")!` and `resolve(b!)` in `captureFrame` | `:272,275` (hypothesis) |
| C-20 | MINOR | Reset does not clear; the empty state is unreachable after load | `:180-184` |
| C-21 | INFO | timestamps minted inside a computed | `:95-96` |

## The gestalt

Every blocker here has one shape: **an `await` with no identity attached to it.** `onFile` awaits a
FileReader and then acts on state that may have moved (C-1). `startCamera` awaits a permission and then
assigns into a component that may be gone (C-2, C-3). `runQuantize` awaits a decode and then resolves a
promise that may belong to someone else (C-13). `quantizeFromFile` awaits a decode that may throw into
nobody's hands (C-5). The component reaches for async four times and never once asks *"is this still
the request I started?"*

The idiomatic cure is not four guards. It is one: **the session owns a monotonically increasing request
token, and every async continuation — preview write, quantize dispatch, worker reply, camera assignment
— is gated on still holding it, with the scope's disposal invalidating all of them.** That single
transposition kills C-1, C-2, C-3, C-13, and half of C-5, and it turns the camera into a resource with
a lifetime rather than two functions that hope. Everything else on this list is downstream of a
component that was written as if `await` were free.
