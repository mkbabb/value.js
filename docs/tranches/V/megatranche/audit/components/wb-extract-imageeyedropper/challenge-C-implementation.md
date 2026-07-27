# CHALLENGE-C — ImageEyedropper: implementation

**Subject** `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue` (299 lines)
+ `composables/useImageSampler.ts` (139) + `composables/useLoupeCanvas.ts` (75)
+ `composables/useInertiaGesture.ts` (379) + `constants.ts` (11)
**Repo** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e` (worktree at `7cae8bd0`)
**Date** 2026-07-27

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), as declared at spawn.
The seat is declared, not inherited.

## Verdict

**DEFECTIVE.** Two BLOCKERs, six MAJORs, five MINORs. The headline feature of this component —
the magnifier loupe — **renders completely blank on the touch path and on every first show**,
measured three independent ways. The tap state machine has a latch that silently eats one tap in
one out of two ordinary interaction sequences. The component is 100% inoperable by keyboard and
invisible to assistive technology. A malformed image produces two unhandled promise rejections and
a dead, error-less overlay. And the sole test file exercises exactly one pure formatting function
and would stay green if the sampler, the coordinate mapping, and the entire loupe composable were
deleted.

---

## Live-probe methodology (receipts)

Dev server at `http://localhost:9000`, real Chromium via Playwright, `devicePixelRatio: 2`.
Probe scripts: `.playwright-mcp/probe-eyedropper.js`, `probe2.js`, `probe3.js`, `probe4.js`
(gitignored — `git check-ignore -v .playwright-mcp/probe.png` → `.gitignore:31:.playwright-mcp/`).

Fixtures generated for the probes:

| fixture | content |
|---|---|
| `probe.png` | 200×200, four quadrants: red `#ff0000`, green `#008000`, blue `#0000ff`, **fully transparent** `rgba(0,0,0,0)` |
| `big.png` | 4000×3000 flat `#c8783c`, 52 427 bytes on disk |
| `bad.png` | 38 bytes of ASCII text named `.png` (undecodable) |

Instrumentation: `CanvasRenderingContext2D.prototype.drawImage` and `.getImageData` were wrapped to
count calls per canvas backing width, so a "loupe repaint" is countable as `drawImage` on a
110-wide canvas (`di110`).

---

## D-1 · BLOCKER — the loupe renders BLANK on every first show; permanently blank on touch

**Mechanism.** `useLoupeCanvas.showLoupeAt` flips visibility and paints in the *same synchronous
tick*:

```ts
// useLoupeCanvas.ts:55-60
function showLoupeAt(rx: number, ry: number) {
    loupeVisible.value = true;
    loupeRelX.value = rx;
    loupeRelY.value = ry;
    drawLoupe(rx, ry);          // <- same tick
}
```

but the canvas it paints into is behind a `v-if` on that very flag:

```html
<!-- ImageEyedropper.vue:78-86 -->
<div v-if="loupe.loupeVisible.value" class="loupe" ...>
    <canvas ref="loupeCanvasRef" width="110" height="110" ... />
</div>
```

Vue flushes DOM on the next microtask, so at `drawLoupe` time `loupeCanvasRef.value` is still
`null` and the guard at `useLoupeCanvas.ts:30` (`if (!loupeCanvas || !offscreenCanvas) return;`)
silently returns. The loupe becomes **visible and empty**.

**Reproduction / measurement (three independent confirmations).**

1. *Touch-equivalent tap* (probe2 §A — pin, `Escape` to hide, then a tap with **no** preceding
   `pointermove`, which is exactly what a finger produces):

   | step | `loupeVisible` | `loupeNonZeroPx` | `di110` |
   |---|---|---|---|
   | `A_pinned` (after a hover then a tap) | true | **9604** | 2 |
   | `A_afterEscape` | false | — | 2 |
   | `A_tapNoHover` | **true** | **0** | **2** (no repaint) |
   | `A_afterOneMove` | true | **0** | 2 |

   `loupeNonZeroPx` counts pixels with alpha ≠ 0 in the loupe backing store. Zero = nothing was
   ever drawn. The last row is the kill shot: because `pinned` is now `true`, `onHover` returns
   early (`ImageEyedropper.vue:165`), so **nothing will ever repaint it** — on a touch device the
   magnifier stays blank for the entire pinned session.

2. *Hover sweep* (probe4): 40 `pointermove` events produced **39** loupe draws
   (`{"pointermoves":40,"getImageDataCalls":40,"loupeDraws":39}`). The missing one is the first —
   the same race, off-by-one.

3. *Screenshot* `.playwright-mcp/eyedropper-live.png`: the pinned loupe (bottom-right of the
   Extract panel) is an empty green-ringed circle showing the page behind it.

**Aggravating detail.** `.loupe { transition: opacity var(--duration-fast) ... }`
(`ImageEyedropper.vue:270`) is dead CSS — a `v-if`-created element has no start state to transition
from and there is no `<Transition>` wrapper. The stylesheet already *wants* the element to persist.

**Cure (gestalt, not patch).** Keep the loupe canvas permanently mounted and gate it on opacity /
`visibility`, not `v-if`. That kills the mount race by construction, makes the declared opacity
transition actually run, and removes a per-show DOM create/destroy from the hover path. If `v-if`
is kept for some reason, `showLoupeAt` must `await nextTick()` before `drawLoupe` — but that is the
patch, not the cure.

---

## D-2 · BLOCKER — `justUnpinned` is a latch with only one exit; a drag swallows the next tap

**Mechanism.** The unpin interception sets a module-scope flag:

```ts
// ImageEyedropper.vue:123, 176-185
let justUnpinned = false;
watch(viewportRef, (el) => {
    if (!el) return;
    el.addEventListener("pointerdown", () => {
        if (pinned.value) { pinned.value = false; loupe.hideLoupe(); justUnpinned = true; }
    }, { capture: true });
});
```

and the **only** place it is cleared is inside `onTap`:

```ts
// ImageEyedropper.vue:151-155
onTap(rx, ry) {
    if (justUnpinned) { justUnpinned = false; return; }
    ...
}
```

`onTap` fires only when `hasMoved === false` (`useInertiaGesture.ts:277-281`). So the sequence
*pin → press-and-drag (unpins, pans) → release* leaves `justUnpinned === true` forever, and the
**next legitimate tap is consumed** by the guard.

**Reproduction (probe-eyedropper.js).** tap red (pin) → press-drag 8 steps → release → tap
transparent quadrant → tap again:

| step | overlay `button` count | interpretation |
|---|---|---|
| `tapRed` | **3** | pinned (Add + Apply revealed) |
| `afterDrag` | 1 | unpinned by the drag |
| `tapTransparent_1st` | **1** | **tap swallowed — not pinned** |
| `tapTransparent_2nd` | **3** | pinned only on the second tap |

Cross-check confirming the mechanism: unpinning via `Escape` (`ImageEyedropper.vue:226-235`) does
*not* set the flag, and probe2 §A shows the very next tap pinning correctly (`A_afterEscape`
buttons 1 → `A_tapNoHover` buttons 3). Two unpin paths, two different state effects.

**Cure.** The flag is a symptom of two competing handlers on one gesture. Fold unpin into the
gesture composable's own state machine — the composable already knows `hasMoved`/`isPanning`, so
"pointerdown while pinned suppresses the *pointerup that ends this same gesture*" is expressible as
gesture-local state with a definite lifetime, instead of a component-scope latch with one exit.

---

## D-3 · MAJOR — alpha is discarded: a fully transparent pixel is reported as opaque black

```ts
// useImageSampler.ts:32-35, 116-118
function formatHex(r: number, g: number, b: number): string { ... }
const data = offscreenCtx.getImageData(ix, iy, 1, 1).data;
const hex = formatHex(data[0] ?? 0, data[1] ?? 0, data[2] ?? 0);   // data[3] never read
```

**Reproduction.** Sample the transparent quadrant of `probe.png`
(`getImageData` → `[0,0,0,0]`): readout becomes **`oklch(0% 0 none)`**, the `WatercolorDot` swatch
paints solid black (see `.playwright-mcp/eyedropper-live.png`, top bar), and `sampledColor` —
the value `pick` / `addToPalette` emit to the palette (`ImageEyedropper.vue:212-224`) — is
`#000000`. A user pulling a palette from a logo PNG gets black entries for the background.

Note the readout also spells the achromatic hue as `none`, which is valid CSS but reads as a
missing value rather than "this pixel is not there".

**Cure.** Read `data[3]`. Either refuse the sample (return `null`, leave the readout unchanged) or
carry the alpha into the emitted color; the component already has a "no sample here" path for
out-of-bounds coordinates (`useImageSampler.ts:114-115`) and should reuse it.

---

## D-4 · MAJOR — inoperable by keyboard, invisible to AT, no focus management

Measured on the live overlay (probe-eyedropper.js `geo`, probe2 §B):

| property | measured |
|---|---|
| overlay `role` | `null` |
| `aria-modal` | `null` |
| `aria-label` | `null` |
| `document.querySelectorAll('[role=dialog]').length` | **0** |
| `document.querySelectorAll('[aria-live]').length` | **0** |
| focusables inside the overlay (unpinned) | **1** (the close button) |
| `document.activeElement` on open | **`BODY`** (focus never moves in) |
| first `Tab` → | `INPUT`, `insideOverlay: false` |
| second `Tab` → | `INPUT`, `insideOverlay: false` |

The overlay is a bare `div` (`ImageEyedropper.vue:8`) that covers the workbench, does not announce
itself, does not receive focus, does not trap it, and does not restore it on close. Tab order walks
straight into the controls it is visually covering.

The sampling surface itself is `aria-hidden="true"` (`ImageEyedropper.vue:74`) with **no keyboard
alternative** — there is no arrow-key cursor, no "sample center", nothing. The readout `<span>`
(`ImageEyedropper.vue:35-37`) mutates on every hover with no `aria-live`, so even a sighted
screen-reader user gets silence. And the Add/Apply controls are `v-if="pinned"`
(`ImageEyedropper.vue:43-58`) — `pinned` is only ever set from `onTap`, i.e. **from a pointer** —
so keyboard users can never reach them at all.

The entry point is gated too: `ImageDropZone` sets `:tabindex="disableClick ? -1 : 0"`
(`ImageDropZone.vue:21`) and `disableClick` is true exactly when a preview exists, so once an image
is loaded the drop zone is removed from the tab order and the only way to *open* the eyedropper is
a mouse click on it (`ExtractWorkbench.vue:25`).

**WCAG:** 2.1.1 Keyboard (A) — fail. 4.1.2 Name/Role/Value (A) — fail. 2.4.3 Focus Order (A) — fail.
(Tap targets are fine: the overlay's `DockControl`s measure 40×40 CSS px, ≥ 24.)

**Cure.** Mount it as a real dialog — glass-ui already owns the modal primitive; the overlay should
adopt it rather than hand-rolling `absolute inset-0 z-popover` (edict 4). Add an `aria-live="polite"`
readout, an arrow-key sample cursor bound to the same `sampleAt` the pointer uses, and let the
dialog primitive supply the focus trap + restoration.

---

## D-5 · MAJOR — a malformed image yields two unhandled rejections and a dead, error-less overlay

```ts
// useImageSampler.ts:72-75
await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;            // rejects with an Event, not an Error
});
```
```ts
// ImageEyedropper.vue:200-204, 237-240, 247
async function loadAndFit() { await sampler.loadImage(imageUrl); ... }
onMounted(() => { loadAndFit(); ... });        // floating promise, no catch
watch(() => imageUrl, () => { loadAndFit(); }); // floating promise, no catch
```

**Reproduction (probe3.js).** Upload `bad.png` (text bytes, `.png` name — `accept="image/*"` is a
filename filter, and the drop path bypasses it entirely). `FileReader` succeeds, so
`previewDataUrl` is set and the eyedropper mounts:

```json
"pageErrors": ["InvalidStateError: The source image could not be decoded.", "Event"],
"eyedropper": { "mounted": true, "cvBacking": [300,150],
                "transform": "transform: translate(0px, 0px) scale(1);",
                "readout": "Tap to sample", "errorUI": 0,
                "unhandled": ["The source image could not be decoded.", "error"] }
```

`cvBacking [300,150]` is the browser's *default* canvas size — `loadImage` never reached line 88,
so the visible canvas was never sized. The overlay sits there forever saying "Tap to sample";
`errorUI: 0` — there is no error affordance anywhere inside it. `"Event"` in `pageErrors` is the
literal rejection value from `img.onerror = reject`.

The sibling surface gets this right — `ExtractWorkbench.vue:80-85` renders an explicit
`text-destructive` line for `session.quantizeError`. The eyedropper has no equivalent.

**Cure.** `loadImage` should reject with a real `Error`, and the shell should own an
`imageError` ref rendered in the same destructive register the workbench already uses, with the
close button as the escape.

---

## D-6 · MAJOR — the ResizeObserver refit throws away the user's zoom and pan

```ts
// useInertiaGesture.ts:353-360
watch(elementRef, (el, oldEl) => {
    resizeObserver?.disconnect();
    if (el) { resizeObserver = new ResizeObserver(() => fitToViewport()); resizeObserver.observe(el); }
}, { immediate: true });
```

`fitToViewport` (`:152-167`) unconditionally assigns `zoom.value = fit` and recentres the pan. Any
size change of the viewport element — window resize, panel reflow, and on mobile Safari the URL-bar
show/hide that resizes the layout viewport — discards the inspection state.

**Reproduction (probe2 §C).** Ctrl-wheel zoom in, then change the overlay's height:

```json
"C_resize": { "beforeZoom": 2.6924, "afterZoom": 1.61 }
```

A 2.69× inspection zoom is silently reset to the fit zoom.

**Cure.** Split "fit" (a one-time initialisation) from "reflow" (preserve the zoom ratio and the
image-space centre point, re-clamp the pan). `fitToViewport` should be called from
`loadAndFit`/`onTransitionEnd` only, which is where the component already calls it
(`ImageEyedropper.vue:203, 207`).

---

## D-7 · MAJOR — the "specimen" is see-through: the page behind bleeds through transparent pixels

The visible canvas is drawn with `ctx.drawImage(img, 0, 0)` onto a transparent canvas
(`useImageSampler.ts:84, 91`) sitting inside a translucent `glass-floating` overlay. Wherever the
image has alpha < 1, the workbench underneath composites through.

**Evidence.** `.playwright-mcp/eyedropper-live.png` — in the transparent (bottom-right) quadrant of
the probe image you can read the k-slider, the reset control, and the *`DOMINANT oklch(45.20…718…)`*
readout of the panel behind the overlay, straight through the "image".

This is a lying instrument: the pixel the user *sees* at that coordinate is a composite of
(page ⊕ glass tint ⊕ image), while `sampleAt` returns the raw image pixel. For any PNG/WebP with
alpha the displayed color and the sampled color are different colors. It also compounds D-3 — the
place where the tool shows you the page behind is exactly the place where it tells you "black".

**Cure.** Paint an opaque backing (the conventional alpha checkerboard, or the stage token the
workbench already owns — `bg-stage`, `ExtractWorkbench.vue:37`) under the image inside the viewport,
so the specimen is composited against a known ground.

---

## D-8 · MAJOR — two full-resolution canvases, one of them force-promoted to a compositor layer

`loadImage` sizes both the offscreen sampling canvas and the visible canvas to the image's
*natural* dimensions (`useImageSampler.ts:80-92`), and the visible one carries
`will-change-transform` (`ImageEyedropper.vue:71`), which pins it as its own composited layer for
the life of the overlay.

**Measurement (probe2 §D, 4000×3000 fixture — smaller than a modern phone photo):**

```json
"D_big": { "cvBacking": [4000,3000], "bytesVisibleCanvas": 48000000,
           "totalCanvasBytesMin": 96000000, "willChange": "transform",
           "dataUrlChars": 69926, "mem": { "usedMB": 95 } }
```

≥ 96 MB of canvas backing store, 48 MB of it in a permanently promoted GPU layer, on top of the
decoded `HTMLImageElement` and the base64 data URL held by `useExtractSession.previewDataUrl`
(`useExtractSession.ts:166`). `dataUrlChars` is only 69 926 here because the fixture is flat color;
a real 12 MP JPEG's data URL is 5–10 MB of string. This is the iOS-Safari tab-kill shape.

`dispose()` (`useImageSampler.ts:97-101`) drops the references but never zeroes `canvas.width`,
so the backing store is held until GC rather than released eagerly.

**Cure.** The visible canvas exists only to be transformed under the loupe — it does not need
native resolution. Cap the visible canvas to the viewport's device-pixel budget (draw the image
scaled) and keep native resolution only in the offscreen sampling canvas, which is never composited.
Drop `will-change` in favour of promoting only during an active gesture (`gestureActive` is already
tracked and already drives a class — `ImageEyedropper.vue:72`).

---

## D-9 · MINOR — devicePixelRatio is ignored; the loupe is a blur, and `LOUPE_SIZE` has two truths

```html
<!-- ImageEyedropper.vue:85 -->
<canvas ref="loupeCanvasRef" width="110" height="110" class="w-full h-full rounded-full" ... />
```

`grep -n "devicePixelRatio\|dpr" demo/workbenches/extract/ImageEyedropper/**` → no matches. The
backing store is a hardcoded 110×110 regardless of DPR.

**Measurement.** At `devicePixelRatio: 2` the probe reports the loupe canvas as
`{"backing":[110,110],"cssW":106}` — 106 CSS px (110 minus the 2 px `border` under
`box-sizing: border-box`) → **212 device pixels rendered from a 110-pixel backing store**, a 1.93×
compositor upsample. `drawLoupe` sets `ctx.imageSmoothingEnabled = false`
(`useLoupeCanvas.ts:40`) precisely to get a crisp pixel grid, and the browser then bilinearly
smears it away. The one thing a loupe exists to do is defeated on every retina display.

Second defect in the same line: `LOUPE_SIZE = 110` (`constants.ts:8`) is imported and used for the
CSS box (`ImageEyedropper.vue:191-196`) and for the draw math (`useLoupeCanvas.ts:35-51`), but the
canvas attributes are literals. Change the constant and the drawing silently desyncs from the
backing store.

**Cure.** `:width="LOUPE_SIZE * dpr"` / `:height="LOUPE_SIZE * dpr"` with a `ctx.scale(dpr, dpr)`,
and no literals.

---

## D-10 · MINOR — unbounded readout precision, inconsistent between the two format paths, truncated with no `title`

Measured readout for pure red: **`oklch(62.795536392143% 0.257683303805 29.233880279628deg)`**
(55 characters, 12 decimal places, raw `deg` unit).

The two branches of `formatInColorSpace` disagree about precision:

```ts
// useImageSampler.ts:38-44 — library-only spaces DO round
const channels = color.channels.map(c => c === "none" ? c : Number(c.toFixed(4)).toString());
// useImageSampler.ts:63-65 — CSS spaces do NOT
return CSS_PICKER_SPACES.has(space) ? serializePickerColor(converted) : formatLibraryColor(converted);
```

`hsv` → `HSV 0 · 1 · 1`; `oklch` → 12 decimals. Same readout slot, same user, two policies.

And the slot clips it: `<span class="text-mono-small text-muted-foreground truncate select-all">`
(`ImageEyedropper.vue:35-37`) — `truncate` with **no `title`**. The sibling component in the same
workbench states the rule and follows it — *"truncate may trim trailing digits at narrow widths;
the full readout rides title + select-all (never a lying readout)"*
(`ExtractWorkbench.vue:134-141`). The eyedropper violates its own neighbour's documented invariant.

---

## D-11 · MINOR — the capture-phase `pointerdown` listener is registered in a watcher and never removed

`ImageEyedropper.vue:176-185` adds a `{ capture: true }` listener inside `watch(viewportRef, …)`
with no `onWatcherCleanup`, no `unbind`, and no `onBeforeUnmount` counterpart — compare
`useInertiaGesture.ts:337-344, 362-368`, which unbinds every listener it adds. The
`onBeforeUnmount` block at `ImageEyedropper.vue:242-245` removes the `keydown` listener and calls
`sampler.dispose()` but knows nothing about this one. Bounded in practice by the element being
collectable, but it is an asymmetric registration in a file whose own composable models the
symmetric pattern, and it will double-register if `viewportRef` ever re-resolves.

---

## D-12 · MINOR — `loadImage` has no re-entrancy guard or abort; overlapping loads race

`onMounted` and `watch(() => imageUrl, …)` both fire `loadAndFit()` as a floating promise
(`ImageEyedropper.vue:237-247`). `loadImage` (`useImageSampler.ts:68-95`) has no generation token
and no abort: two overlapping loads both write `imgWidth`/`imgHeight`/`offscreenCanvas`, and the
*last to decode* wins, not the last requested. Change the image twice quickly (upload → camera
capture) and the eyedropper can show, and sample, the wrong image. **Labelled a reasoned defect —
I did not construct the timing race in the browser.**

---

## D-13 · MINOR — wheel pan double-counts momentum (hypothesis)

```ts
// useInertiaGesture.ts:310-320
panX.value -= e.deltaX;  panY.value -= e.deltaY;  clampPan();
velocityX = -e.deltaX * 0.3;  velocityY = -e.deltaY * 0.3;
startInertia();
```

Each wheel event applies the delta directly *and* seeds a coast, and macOS trackpad inertia keeps
delivering wheel events for ~1 s after the fingers lift. The coast is `stop()`/`start()`-cycled on
every one of those events (`startInertia` line 132). Net pan should exceed the physical scroll
distance by roughly the coast integral. **Hypothesis — reasoned from the code, not measured.**

---

## D-14 · MAJOR — test truth: the gate is vacuous

`test/image-sampler-v4.test.ts` is 31 lines and is the *only* test that names anything in this
directory (`grep -rln "ImageEyedropper\|useImageSampler\|useLoupeCanvas\|useInertiaGesture"` over
`test/` → one file; over `e2e/` → only a prose comment in
`e2e/smoke/oracles/o7-card-census.spec.ts:16`).

```
$ npx vitest run test/image-sampler-v4.test.ts --reporter=basic
 ✓ test/image-sampler-v4.test.ts (3 tests) 2ms
 Test Files  1 passed (1)      Tests  3 passed (3)
```

All three tests call exactly one export — `formatInColorSpace` — on a sampler constructed with
`canvasRef: ref(null)` and a fixed identity transform.

**Named mutations that keep all three green:**

| mutation | still green? |
|---|---|
| `viewportToImage` → `return { ix: 0, iy: 0 }` | ✅ never called |
| `sampleAt` → `return null` | ✅ never called |
| `formatHex` → `` `#000000` `` (D-3 made total) | ✅ never called |
| delete the bounds check at `useImageSampler.ts:114-115` | ✅ never called |
| delete `useLoupeCanvas.ts` entirely | ✅ not imported by any test |
| delete `useInertiaGesture.ts` entirely | ✅ not imported by any test |
| `loadImage` → `throw` on every input | ✅ never called |

Every defect in this report — including both BLOCKERs — lives in code that no test executes.
The 3/3 green is a statement about `parseCssColor` + `convertPickerColor`, not about this component.

**Cure.** The two composables that carry the state machines are already pure-ish and injectable
(`useImageSampler` takes a `canvasRef`, `useLoupeCanvas` takes `getOffscreenCanvas` +
`viewportToImage`). A jsdom/`happy-dom` test that feeds a real 2×2 `ImageData` and asserts
`sampleAt` at the four corners + one out-of-bounds + one alpha-0 pixel would have caught D-3 and
would fail on every mutation above. The tap/unpin latch (D-2) is a pure state machine and is
unit-testable the moment it lives inside the gesture composable.

---

## D-15 · INFO — the visual audit never captures this component; its clean record is vacuous

`docs/tranches/V/megatranche/audit/visual/REPORT.json`, `/#/extract`, all four Safari matrices:
`counts.canvas: 1` (the atmosphere field) — the eyedropper's two canvases are absent, because the
overlay only mounts after `eyedropperActive` is set by a pointer click that follows an upload
(`ExtractWorkbench.vue:25, 173-180`). `shots/zoom-200-desktop/` contains
`adminusers, blob, browse, gradient, picker` — **no `extract`**, so the 200 %-zoom matrix does not
cover it either.

The 3 `namelessButtons` and 6 `smallTapTargets` recorded on `/#/extract` belong to other
components: the JSON lists them as `input 160×23`, `button 22×22 "Switch to slug"`,
`"Generate new slug"`, `"Cancel"`, and two `span 12×24` slider labels. **This component contributes
zero rows to the visual audit — because it was never rendered.** Its accessibility defects (D-4)
are correspondingly invisible to that gate.

---

## D-16 · INFO — owner-edict deltas

| edict | status |
|---|---|
| 1 · no god modules | **PASS** — 299-line shell over three focused composables. |
| 2 · no legacy code | **PASS** — no shims, aliases, or dual paths found. |
| 3 · KISS | **PASS** — no invented shared dirs or wrappers. |
| 4 · glass-ui is the design system | **PARTIAL** — the modal overlay is hand-rolled (`absolute inset-0 z-popover flex flex-col glass-floating`, `ImageEyedropper.vue:8`) instead of adopting a glass-ui dialog primitive; that hand-roll is the direct cause of D-4's missing role/focus semantics. |
| 5 · root-level styling | **PARTIAL** — `.eyedropper-action-btn:hover:not(:disabled) svg { color: var(--hover-color); transform: scale(1.2) }` (`ImageEyedropper.vue:279-282`) plus an inline `--hover-color` per-instance var (`:10`) reach into a `DockControl`'s slot content from the consumer. "Icon tints to the active color on hover" is a `DockControl` variant/token, not a demo-side descendant selector. |
| 6 · animations never deleted | **PASS** — `swatch-pop` is a legitimately scoped component keyframe. But `.loupe`'s declared `transition: opacity` is dead (see D-1). |
| 7 · idiomatic Vue 3.5 | **PASS** on form — `useTemplateRef` throughout, reactive props destructure with the `colorSpace: () => colorSpace` accessor. No `defineModel` here, so the stale-read hazard does not apply. |
| 8 · `verbatimModuleSyntax` | **PASS** — every type-only import is `import type` / inline `type` (`ImageEyedropper.vue:99`, `useImageSampler.ts:11-19`, `useInertiaGesture.ts:1`). |

---

## Known-hazard sweep (this repo's record)

| hazard | present? |
|---|---|
| `defineModel` stale read | **N/A** — no `defineModel` in this component. |
| oklch→HSV hue drift / `stableHue` | **N/A** — sampling is one-way RGB→space; the `none` hue in `oklch(0% 0 none)` is a *correct* achromatic spelling, not drift. It becomes a defect only via D-3 (the pixel should not have been sampled at all). |
| `ValueUnit` nesting accumulation | **not found** — the sampler goes through `parseCssColor` → `convertPickerColor` → `serializePickerColor`, never re-wrapping. |
| reka-ui pointer-capture leak | **partially applicable** — `useInertiaGesture` binds `pointercancel` (`:332`) but **not** `lostpointercapture`. The capture is taken on `e.target` (`:173`), which is the canvas, not the bound element; an implicit capture release would strand the `pointers` map entry and leave `gestureActive` true. Not reproduced. |
| ungated rAF (PRM-RAF epidemic) | **CLEAN** — the coast uses glass-ui `useRAFLoop` with `pauseWhenHidden: true` and an explicit PRM decision in `startInertia` (`useInertiaGesture.ts:114-142`). This is the one part of the component that is exemplary. |
| WebGL context loss / eager boot | **N/A** — 2D canvas only. |
| live `parseCssColor` crash class | **latent** — `formatInColorSpace` *throws* on a parse failure (`useImageSampler.ts:59-61`) from inside `sampleAt`, which runs inside a raw pointer-event handler; nothing catches it. Input is always a self-generated `#rrggbb`, so I could not fire it (probe4: 40 samples, 0 page errors), and its guard also indexes `parsed.diagnostics[0]` unchecked. Reachable only if `convertPickerColor`/`serializePickerColor` throw for some `SpaceId`. **Hypothesis.** |

---

## Performance note (measured, not a defect on its own)

probe4, 40 `pointermove` events over the 4000×3000 image:
`{"pointermoves":40,"getImageDataCalls":40,"getImageDataTotalMs":0.8,"loupeDraws":39}`.

`getImageData` is cheap (`willReadFrequently: true` is correctly set, `useImageSampler.ts:83`) —
0.02 ms/call. But each of those 40 events also ran a full `parseCssColor` → `convertPickerColor` →
`serializePickerColor` round trip plus a loupe repaint, with **no rAF coalescing**: on a 120 Hz
trackpad this is 120 parse+convert+serialize cycles per second to update a text label that changes
at most once per frame. Coalescing `onHover` into a rAF (or `getCoalescedEvents`) would make the
work per *frame* instead of per *event*.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| D-1 | **BLOCKER** | loupe renders blank on every first show; permanently blank on touch |
| D-2 | **BLOCKER** | `justUnpinned` latch swallows the tap after any unpin-by-drag |
| D-3 | MAJOR | alpha discarded — transparent pixels reported and emitted as opaque black |
| D-4 | MAJOR | no role/name/live-region, no focus management, zero keyboard operability |
| D-5 | MAJOR | malformed image → 2 unhandled rejections + dead overlay, no error UI |
| D-6 | MAJOR | ResizeObserver refit destroys the user's zoom/pan |
| D-7 | MAJOR | transparent pixels composite the page behind — displayed ≠ sampled |
| D-8 | MAJOR | 2× full-res canvases, 48 MB force-promoted layer (96 MB @ 12 MP) |
| D-9 | MINOR | DPR ignored — the crisp-pixel loupe is upsampled to blur; `LOUPE_SIZE` duplicated |
| D-10 | MINOR | 12-decimal readout, inconsistent with the library path, truncated with no `title` |
| D-11 | MINOR | capture-phase `pointerdown` listener never removed |
| D-12 | MINOR | `loadImage` re-entrancy race (reasoned) |
| D-13 | MINOR | wheel momentum double-counted (hypothesis) |
| D-14 | MAJOR | test gate is vacuous — 7 named mutations keep 3/3 green |
| D-15 | INFO | visual audit never renders this component; clean record is vacuous |
| D-16 | INFO | edict deltas: hand-rolled modal (4), DockControl descendant override (5) |

**Strongest defect: D-1** — the magnifier, which is the entire reason this component exists rather
than a click-to-sample handler on the drop zone, paints nothing on the path a phone user takes, and
the state machine then guarantees it will never repaint. Measured three ways and visible in the
screenshot.

## Artifacts

- `.playwright-mcp/eyedropper-live.png` — pinned state on the transparent quadrant: blank loupe,
  black swatch, `oklch(0% 0 none)` readout, page bleeding through the image
- `.playwright-mcp/eyedropper-big.png` — 4000×3000 fixture loaded
- `.playwright-mcp/eyedropper-bad.png` — the dead overlay after an undecodable file
- `.playwright-mcp/probe-eyedropper.js`, `probe2.js`, `probe3.js`, `probe4.js` — probe sources
  (`.playwright-mcp/` is gitignored; nothing was written to `src/`, `demo/`, `api/`, `test/`, `e2e/`)
