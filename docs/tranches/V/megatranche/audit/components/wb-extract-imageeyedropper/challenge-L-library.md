# CHALLENGE-L — library structure · `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE.** 14 findings, 3 BLOCKER. The premise holds, and the mechanism is sharper than
"wrong imports": **the eyedropper's three composables split ownership of things that cannot be
split** — a canvas element's *existence* vs its *ref*, an image's *decode* vs its *pixels*, a
viewport *transform* vs the *inverse map* that reads it. Every blocker below is a direct
consequence of one of those three splits, and two of them are reproduced live with measured
numbers.

The single most damning structural fact: **the eslint rules that were written to prevent exactly
this class of drift are dead** — they target `demo/@/`, a tree that no longer exists
(finding L-10). The demo module graph has had no guard rail since W43.

---

## Import lattice — traced

```
ImageEyedropper.vue
├─ vue                              ok
├─ @lucide/vue                      ok (devDependency, demo-only)
├─ @mkbabb/glass-ui/dock            ok — published subpath (DockControl, DockSeparator)
├─ @mkbabb/glass-ui/watercolor-dot  ok — published subpath
├─ ./composables/useInertiaGesture
│   ├─ @mkbabb/glass-ui/dom          useBreakpoint
│   └─ @mkbabb/glass-ui/motion-core  useRAFLoop
├─ ./composables/useImageSampler
│   ├─ @mkbabb/value.js/color        type SpaceId          ← published subpath ✓
│   ├─ @mkbabb/value.js/css          parseCssColor         ← published subpath ✓
│   └─ ../../../../color-session/picker-color              ← 4-hop cross-feature raw reach
├─ ./composables/useLoupeCanvas
└─ ./constants
```

**The published-surface question passes.** Every `@mkbabb/value.js` import in this chain goes
through the `package.json#exports` map (`./color`, `./css`) — a real consumer could write these
imports verbatim. `vite.config.ts:29-50` generates the self-alias set *from* the exports map with
anchored regexes, so a deep-path import could not silently work. No `@src/*` reach anywhere in the
tree. Repo-wide the demo uses only the 7 published subpaths:

```
$ grep -rn 'from "@mkbabb/value.js' demo/ | sed 's/.*from //' | sort | uniq -c | sort -rn
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";
```

This is the one axis where the structure is sound. Everything else below is not.

---

## BLOCKERS

### L-1 · BLOCKER — the loupe's first paint always lands on a canvas that does not exist yet; on touch it never paints at all

`useLoupeCanvas` acquires its canvas with `useTemplateRef("loupeCanvasRef")`
(`useLoupeCanvas.ts:21`) — a **string reach into the caller's template**. But the caller controls
that element's *existence* with `v-if`:

```
ImageEyedropper.vue:78    v-if="loupe.loupeVisible.value"
ImageEyedropper.vue:85    <canvas ref="loupeCanvasRef" width="110" height="110" … />
```

and `showLoupeAt` flips the flag and draws **synchronously, in the same tick**:

```
useLoupeCanvas.ts:55-60
function showLoupeAt(rx, ry) {
    loupeVisible.value = true;   // element does not exist yet — Vue has not flushed
    …
    drawLoupe(rx, ry);           // loupeCanvasRef.value === null → early return, silently
}
```

`drawLoupe` bails on `if (!loupeCanvas || !offscreenCanvas) return;` (`useLoupeCanvas.ts:30`).
Nothing ever re-draws. The composable owns the *ref* but the template owns the *element*; the
ordering hazard is the seam between them.

**Reproduced live** (localhost:9000, `#/extract`, synthetic 64×64 gradient uploaded, eyedropper
opened, loupe canvas read back with `getImageData`):

| step | non-transparent px / total |
|---|---|
| first hover (`pointermove` #1) | **0 / 12100** |
| second hover (`pointermove` #2) | 9604 / 12100 |

The first loupe is a completely empty ring. The second paints (9604 ≈ π/4 × 12100, the clipped
circle) — proving the draw itself is correct and only the *timing* is wrong.

**On touch this is permanent, not a flash.** A tap produces `pointerdown → pointerup` with no
intervening hover; `onTap` (`ImageEyedropper.vue:152-164`) calls `showLoupeAt` then sets
`pinned = true`, and `onHover` early-returns forever while pinned
(`ImageEyedropper.vue:166`). Reproduced with a synthetic `pointerType:"touch"` tap:

```
{ loupeElementPresent: true,
  measure: { backingW:110, backingH:110, cssW:106, cssH:106, dpr:1,
             totalPx:12100, nonTransparentPx: 0 },
  readout: ["rgb(124 124 128)"] }
```

The readout samples correctly; the magnifier is a blank circle. **The loupe is non-functional on
every touch device.**

**Cure (architectural, not a patch).** Do not split existence from reference. The loupe canvas
should be permanently mounted and hidden by `opacity`/`visibility` — its existence then belongs to
the same module that holds its ref — or, better, `useLoupeCanvas` should *own* the element it
draws into (created imperatively, appended to a container passed in as a dep) so no template
string, no `v-if`, and no flush ordering exists to get wrong. A `nextTick()` before `drawLoupe` is
the patch; deleting the split is the cure.

---

### L-4 · BLOCKER — an undecodable image produces two unhandled rejections, zero error UI, and an eyedropper over a default 300×150 canvas

Image decode is attempted in **three** independent places, and each drops failure differently:

| site | mechanism | failure handling |
|---|---|---|
| `useImageQuantize.ts:19` | `createImageBitmap(file)` | rejects → `quantizeFromFile` rejects → `runQuantize()` in `useExtractSession.ts:153-157` is fire-and-forget → **escapes** |
| `useExtractSession.ts:29-36` | `FileReader.readAsDataURL` | `reader.onerror = reject`, awaited at `:166` inside a non-`try` async fn → escapes |
| `useImageSampler.ts:68-95` | `new Image()` + `img.onerror = reject` | `loadImage` rejects → `loadAndFit()` (`ImageEyedropper.vue:213-217`) is called bare from `onMounted` (`:238`) → **escapes** |

**Reproduced live** — a 10-byte file named `broken.png` with `type: "image/png"`:

```
{ unhandledRejections: [ "The source image could not be decoded.",   // createImageBitmap
                         "error" ],                                  // img.onerror Event, not an Error
  previewShown: true, previewNaturalWidth: 0,
  destructiveErrorLines: [],                                         // no error UI at all
  eyedropperOpened: true,
  eyedropperCanvas: { w: 300, h: 150 } }                             // never sized — HTML default
```

Note `"error"` — `img.onerror = reject` (`useImageSampler.ts:74`) rejects with a raw `Event`, so
even a caught rejection carries no diagnostic. And note `destructiveErrorLines: []` — the session
*has* an error channel (`quantizeError`, rendered at `ExtractWorkbench.vue:80-85`) but the
rejection escapes upstream of the only code that writes it.

This is a shipping path: `accept="image/*"` (`ImageDropZone.vue:30`) admits HEIC, which Safari
decodes and Chromium does not; a truncated download, an SVG with a foreign reference, and a
renamed file all land here.

**Cure.** One decode, one owner, one failure. `useExtractSession` should own a single
`ImageBitmap` (decoded once from the `File`), hand it to both the quantizer and the sampler, and
expose the decode as a `Result` on the session's *existing* error channel. Three decoders with
three ad-hoc failure conventions is the defect; the unhandled rejections are the symptom.

---

### L-10 · BLOCKER (structural) — every demo import-boundary lint rule is dead; they target a deleted tree

`eslint.config.js` carries three carefully argued `no-restricted-imports` blocks (G-DEMO-1,
G-DEMO-3a, G-DEMO-3b) whose stated purpose is precisely this seat's subject — keeping features
from reaching into each other's internals and keeping the shared layer from reaching up into boot.
Their file globs are:

```
demo/@/components/**   demo/@/lib/**   demo/@/composables/**
```

and their banned patterns are `@components/custom/**` specifiers.

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

W43 (RF-15) deleted the `@…` alias family and moved the tree to
`demo/{color-session,palettes,workbenches,shell,shared,scenes,picker,ui}/`. **The globs now match
zero files and the banned specifiers no longer resolve.** Proof for this seat's own file:

```
$ npx eslint --print-config demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts \
    | jq '.rules["no-restricted-imports"]'
no-restricted-imports = undefined
```

Only `src/**` still has a live restriction (inv-K-1, the glass-ui ban). **The entire demo module
graph is unguarded**, which is exactly why L-6, L-8 and the raw 4-hop reach below could land
unchallenged.

Note also `demo/color-session/` has **no `index.ts`** — there is no barrel to enforce *toward*.
G-DEMO-3b's "reach the feature through its barrel seam" has no seam to name in the new layout.

**Cure.** Re-express the three invariants against the live tree in one object per file region:
`demo/{palettes,workbenches,scenes,picker}/**` may not import `demo/shell/**` or
`demo/color-picker/**`; `demo/color-session/**` may not import any feature tree; every
cross-feature edge goes through a barrel `index.ts` that must first exist. A rule whose glob
matches nothing is worse than no rule — it reads as enforcement in review.

---

## MAJOR

### L-2 · MAJOR — `LOUPE_SIZE` is simultaneously a border-box size and a backing-store size; the nearest-neighbour view is resampled 110 → 106

`constants.ts:8` defines `LOUPE_SIZE = 110`. It is consumed as the **outer box** size:

```
ImageEyedropper.vue:194-195   width: `${LOUPE_SIZE}px`, height: `${LOUPE_SIZE}px`
ImageEyedropper.vue (style)   .loupe { border: 2px solid …; }      // border-box (Tailwind preflight)
```

and, as a **hard-coded literal**, as the canvas backing store:

```
ImageEyedropper.vue:85   <canvas ref="loupeCanvasRef" width="110" height="110" class="w-full h-full …" />
```

Measured live:

```
backing: [110,110]   canvasCss: [106,106]   loupeBoxCss: [110,110]   boxSizing: "border-box"
```

110 backing px are composited into 106 CSS px — a **1.0377× non-integer downscale** applied to a
buffer drawn with `ctx.imageSmoothingEnabled = false` (`useLoupeCanvas.ts:40`). The single line
whose entire purpose is "show me the actual pixels" is undone one step later by the compositor.

Two further consequences of the same conflation: (a) the literal `110` appears in the template
*and* in `constants.ts` — changing `LOUPE_SIZE` moves the ring and leaves the backing store behind;
(b) `LOUPE_PIXELS = 11` over 110 gives an exact 10× magnification only if the backing store is
110 — which the CSS size then breaks.

**Cure.** One constant cannot mean two things. Split into `LOUPE_BOX_PX` (the CSS ring, border
included) and a *derived* backing store `contentPx * dprPolicy()`, bound in the template
(`:width` / `:height`), never a literal.

### L-3 · MAJOR — no devicePixelRatio policy anywhere in the chain, while the design system already owns one

```
$ grep -rn "devicePixelRatio" demo/workbenches/
(no matches)
```

The loupe backing store is a constant. On a 2× display the ring occupies 106 CSS px = 212 device
px and is fed a 110-px buffer — **the magnifier renders at roughly half the display's resolution**,
on the one surface in the app whose job is pixel fidelity. (Measured `dpr: 1` on this machine, so
the blur itself is not measured here; the absence of any DPR term is measured, and the consequence
follows deterministically from the 110-constant + `w-full h-full`.)

glass-ui — the declared design system — already owns this concern:

```
node_modules/@mkbabb/glass-ui/dist/composables/glass/canvas2d/useCanvas2D.d.ts
  dprPolicy?: DprPolicy;
  /** Backing-store DPR policy. Defaults to the existing Canvas2D ceiling:
      `min(devicePixelRatio, 2)`. */
  export declare function useCanvas2D(options: Canvas2DOptions): Canvas2DHandle;
  export declare const useCanvasLifecycle: typeof useCanvas2D;
```

exported at the public subpath `@mkbabb/glass-ui/canvas`. **Owner edict 4 violation**: a
design-system primitive exists, is published, and the demo hand-rolls a worse version of it
(`getContext("2d")!`, no sizing, no DPR, no lifecycle).

### L-5 · MAJOR — one user file is decoded three times and retained in three representations

Trace of a single upload (`ExtractWorkbench.vue:234-237` → `useExtractSession.onFile`):

1. `useImageQuantize.ts:19-25` — `createImageBitmap(file)` → `OffscreenCanvas(W,H)` →
   `getImageData(0,0,W,H)` → a `W*H*4` byte `Uint8ClampedArray`, then `pixels.buffer.slice(0)`
   (`:93`) — a **second** full copy — transferred to the worker.
2. `useExtractSession.ts:29-36,166` — `FileReader.readAsDataURL(file)` → a base64 string
   (**4/3 × file size**) stored in `previewDataUrl`, a `ref` that is **never cleared**: it is
   assigned only at `:166`, and `onReset` (`:180-184`) does not touch it. There is no
   "remove image" affordance in the workbench at all.
3. `useImageSampler.ts:68-92` — `new Image()` with `img.src = <that base64 string>` → a **third**
   decode → **two** `HTMLCanvasElement`s each sized to `img.naturalWidth × naturalHeight`
   (`:80-82` offscreen, `:88-91` visible), i.e. `2 × W*H*4` bytes with **no cap**.

For a 4032×3024 phone photo that is 48.8 MB per canvas → 97.5 MB in the eyedropper alone, plus the
decoded `<img>`, plus the base64 string (≈1.33× the JPEG, held for the session's life). *(Byte
counts derived from `W*H*4` and the base64 ratio, not measured on-device.)*

Nothing needs the visible canvas at native resolution — it is displayed at ≤ viewport × zoom, and
the *sampling* reads only the offscreen copy.

**Cure.** The session owns one decode. `URL.createObjectURL(file)` (revoked on replace/unmount)
replaces the base64 string entirely — the demo already uses `createObjectURL`/`revokeObjectURL`
correctly in `demo/palettes/export.ts:88-131`, so the idiom exists in-repo and this path simply
does not use it. The sampler consumes the session's `ImageBitmap` instead of re-decoding, and the
visible canvas is dropped in favour of an `<img>` under the same transform (the canvas paints
nothing the image element would not).

### L-6 · MAJOR — a fourth private mint of "spell a color for a human", and it drifts from the canonical space names

`useImageSampler.ts:38-44` invents a readout format:

```ts
function formatLibraryColor(color: PickerColor): string {
    const channels = color.channels.map(c => c === "none" ? c : Number(c.toFixed(4)).toString());
    const alpha = color.alpha === 1 ? "" : ` · α ${color.alpha}`;
    return `${color.space.toUpperCase()} ${channels.join(" · ")}${alpha}`;
}
```

Three implementations of the same concept already exist, all in `color-session/`:

| home | shape | precision |
|---|---|---|
| `ColorSpaceSelector.vue:153-165` `specimenFor` | `` `${space} · ${channels}` `` (lowercase id) | `toFixed(4)` |
| `useColorParsing.ts:94-104` `astEcho` | `key value+unit` pairs | `toFixed(3)` |
| **`useImageSampler.ts:38-44`** | `` `${SPACE} ${channels}` `` (**uppercase**) | `toFixed(4)` |

`specimenFor` and `formatInColorSpace` are near line-for-line twins — same
`CSS_PICKER_SPACES.has(...) ? serialize : channel-join` branch, same `toFixed(4)`, different
spelling of the space.

The canonical display-name table is `PICKER_SPACE_NAMES` (`picker-color.ts:72-90`) — re-exported as
`DISPLAY_COLOR_SPACE_NAMES` (`color-model.ts:75-78`) and consumed by `AboutPane.vue:67` and
`ColorSpaceSelector.vue:118`. `useImageSampler` **imports from `picker-color` already**
(`:14-19`) and still re-mints the naming with `.toUpperCase()`. Measured drift on the four
non-CSS spaces — the only ones this function runs for:

| canonical | eyedropper |
|---|---|
| `ICtCp` | `ICTCP` |
| `Jzazbz` | `JZAZBZ` |
| `Kelvin` | `KELVIN` |
| `HSV` | `HSV` (only match) |

These spaces are user-reachable: `ColorSpaceSelector.vue:150` iterates
`Object.entries(DISPLAY_COLOR_SPACE_NAMES)`, and `usePaneRouter.ts:140` feeds
`model.value.selectedColorSpace` straight into the extract pane.

**Owner edict 1 violation** (a second implementation of a concept that already has a home).
**Cure.** One `formatColorForDisplay(color, space)` in `color-session/`, consumed by the selector
specimen, the AST echo, and the eyedropper. `.toUpperCase()` dies.

### L-7 · MAJOR — the readout has no precision policy; measured 14 significant digits

Live capture of the sampled-color readout with `colorSpace = "oklch"`:

```
"oklch(59.987080562215% 0 none)"
```

`formatInColorSpace` (`useImageSampler.ts:55-66`) routes CSS spaces straight to
`serializePickerColor` → the library's `serializeCssColor`, which emits full float precision. The
value renders into a `truncate select-all` span (`ImageEyedropper.vue:47-49`) — so at a narrow
width it is *silently clipped mid-number*.

This contradicts `demo/DESIGN.md § The card-lock law (NORMATIVE)`, which requires every live
numeric readout to carry `tabular-nums` **and** a worst-case `ch` reservation. It also sits beside
a *dead precision knob*: `color-model.ts:67-72`

```ts
export function toCSSColorString(color: PickerColor, _digits: number = 2): string {
    return serializePickerColor(color);          // _digits IGNORED
}
```

— a parameter every one of its 4 call sites passes nothing to, documenting an ownership that was
never implemented. (`toCSSColorString` and `colorToHexString` at `:61-64` are both pure
delegations to `picker-color` — **owner edict 2**, alias shims.)

### L-8 · MAJOR — `DisplayColorSpace` is declared four times and the four are joined only by an untyped props bag

```
$ grep -rn "type DisplayColorSpace =" demo/
demo/color-session/color-model.ts:29                            = PickerSpace | "hex"   ← canonical, 8 consumers
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:21  = SpaceId | "hex"   ← re-mint (exported!)
demo/workbenches/extract/ExtractWorkbench.vue:202               = SpaceId | "hex"       ← re-mint (local)
demo/workbenches/extract/ExtractPane.vue:30                     = SpaceId | "hex"       ← re-mint (local)
```

The subject component imports the *re-mint* (`ImageEyedropper.vue:99`), not the canonical type.
The value originates at `usePaneRouter.ts:140`:

```ts
if (name === "extract") return { colorSpace: model.value.selectedColorSpace };
```

…and passes through `props: Record<string, unknown>` (`usePaneRouter.ts:64`). **Nothing
type-checks that the picker's space union and the eyedropper's space union agree.** Add a member to
`color-session`'s `DisplayColorSpace` (a `"css"` or `"named"` display mode is the obvious future)
and the eyedropper accepts it at the props boundary, then falls through
`CSS_PICKER_SPACES.has(space)` into `convertPickerColor(parsed.value, space)` with an invalid
`SpaceId` — a `PickerColorError` thrown from inside a `pointermove` handler.

**Cure.** Delete all three re-mints; import the type from `color-session/color-model`. Type the
pane props bag (a discriminated `PaneSlot` union, not `Record<string, unknown>`) so the router
cannot lose the type.

### L-9 · MAJOR — the sampler round-trips raw bytes through a string and the CSS parser to get a color the library can construct directly

```ts
useImageSampler.ts:116-118
const data = offscreenCtx.getImageData(ix, iy, 1, 1).data;    // three integers, 0..255
const hex  = formatHex(data[0] ?? 0, data[1] ?? 0, data[2] ?? 0);   // → "#rrggbb"
return { hex, formatted: formatInColorSpace(hex) };

useImageSampler.ts:58-62
const parsed = parseCssColor(hex);                            // string → CSS parser → color
if (!parsed.ok) throw new Error(`[ImageSampler] generated hex failed to parse: …`);
const converted = convertPickerColor(parsed.value, space);
```

`@mkbabb/value.js/color` exports `rgb()` and `src/color/model.ts:109` shows it is the plain
0-255 factory (`toRgba8` at `operations.ts:314-330` clips into the same domain). Measured
equivalence + cost, `node` against the built `dist/`:

```
N=200000
A (hex string + parseCssColor): 447.5 ms  => 2.237 us/sample
B (rgb() direct):               354.6 ms  => 1.773 us/sample
A/B = 1.26x
parse->oklch   {"space":"oklch","channels":[0.5861861753052958,0.1532740763915948,257.2335347026424],"alpha":1}
rgb()->oklch   {"space":"oklch","channels":[0.5861861753052958,0.1532740763915948,257.2335347026424],"alpha":1}
```

**Bit-identical output, 1.26× the cost** — the round trip is pure ceremony, and it runs on **every
`pointermove`** (`onHover` → `sampleAt`, `ImageEyedropper.vue:166-174`). It also manufactures a
failure mode that cannot otherwise exist: the `throw` at `:60` sits inside a pointer handler.

The deeper structural fact: **the published surface is asymmetric.** `toRgba8` projects a color
*to* bytes; there is no inverse.

```
$ grep -rn "toRgba8\|fromRgba8" src/
src/color/index.ts:39:    toRgba8
src/color/operations.ts:314:export function toRgba8(
src/subpaths/color.ts:36:    toRgba8
```

Every canvas consumer in the repo therefore hand-rolls the inverse — `useImageSampler.ts:32-35`
(`formatHex`), `picker-color.ts:213-217` (`pickerColorToHex`), `useContrastSafeColor.ts:106`
(a 1×1 `getImageData` probe). **Cure:** add `fromRgba8(r,g,b,a): Result<Color<"rgb">, ColorIssue>`
to `src/color/operations.ts` and the `./color` subpath — the missing half of an existing pair —
and delete all three hand-rolls. This is the one finding that lands in `src/`, and it is the
correct home: byte↔color is library math, not demo presentation.

### L-11 · MAJOR — the shell reaches around the gesture composable's public API with a raw capture listener, and the comment justifying it is false

```ts
ImageEyedropper.vue:176-186
watch(viewportRef, (el) => {
    if (!el) return;
    el.addEventListener("pointerdown", () => {
        if (pinned.value) { pinned.value = false; loupe.hideLoupe(); justUnpinned = true; }
    }, { capture: true });          // capture: runs before composable's handler
});
```

`useInertiaGesture` already owns this element's pointer lifecycle (`bind()`, lines 327-335) and
already exposes intent callbacks (`onTap`, `onHover`). The unpin gesture is smuggled in behind the
composable's back instead of being a fourth option on it. Three defects in ten lines:

1. **The comment is false in the region that matters.** Capture-phase precedence only holds when
   the event target is a *descendant*. Measured geometry from the live probe: viewport
   `508 × 626.4`, canvas attr `64×64` with `transform: translate(0px, 59.1836px) scale(7.9375)`
   → the canvas covers `508×508`, leaving **~59 px bands top and bottom where the target IS the
   viewport element**. At the target, listeners fire in *registration* order, and the gesture's
   `watch(elementRef, …, {immediate:true})` (created at `ImageEyedropper.vue:147`) registers
   **before** this one (`:176`). In those bands the "capture" listener runs *second*.
2. **The listener is never removed.** The handler is an un-retained arrow; the `watch` has no
   `oldEl` cleanup (contrast `useInertiaGesture.ts:347-350`, which does unbind correctly). A
   viewport-ref identity change double-binds permanently.
3. **`justUnpinned` is a module-scope `let` (`:111`) synchronising two event handlers** — a
   hand-rolled state machine outside both composables.

**Cure.** `onUnpin` / `onPointerDown` as an option on `useInertiaGesture`, beside `onTap` and
`onHover`. The composable owns every listener on the element it bound.

### L-12 · MAJOR — a raw `ResizeObserver` that silently discards the user's zoom/pan, next to two glass-ui primitives with zero demo consumers

```ts
useInertiaGesture.ts:353-360
let resizeObserver: ResizeObserver | null = null;
watch(elementRef, (el, oldEl) => {
    resizeObserver?.disconnect();
    if (el) { resizeObserver = new ResizeObserver(() => fitToViewport()); resizeObserver.observe(el); }
}, { immediate: true });
```

`fitToViewport` (`:152-167`) **resets `zoom`, `panX`, `panY`** to the fit. So *any* resize of the
viewport throws away whatever the user zoomed and panned to — a mobile URL-bar collapse, a
scrollbar appearing, an ancestor layout settle, an orientation change. There is no threshold and
no rAF batch, so a resize drag fires it every step.

glass-ui ships both halves of what this module hand-rolls, and the demo consumes **neither**:

```
$ grep -rn "useResizeObserver" demo/          → (no matches)
$ grep -rn "new ResizeObserver" demo/
demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:357
demo/color-picker/composables/useDevicePixelSnap.ts:74
```

`@mkbabb/glass-ui/dom` exports `useResizeObserver` (rAF-batched, 0.5 px threshold, Vue-scope
auto-disposal — its own doc names "canvas DPR-resync" as the motivating consumer) and
`useDragVelocity` (the `tanh`-saturating velocity bridge, PRM-gated) — the exact concern
`useInertiaGesture.ts:250-256` hand-rolls with a 0.4 EMA. **Owner edict 4.**

**Cure.** Adopt `useResizeObserver`, and make its callback *re-clamp* rather than *re-fit*
(`clampPan()` exists at `:72-90`); fit only on load and on explicit reset. Delegate the velocity
term to `useDragVelocity`.

### L-13 · MAJOR — `useImageQuantize` carries a dead second implementation of the camera path the workbench implements itself

```
$ grep -rn "quantizeFromCanvas\|quantizeFromCamera" demo/ test/ e2e/
demo/workbenches/extract/composables/useImageQuantize.ts:4    (doc comment)
demo/workbenches/extract/composables/useImageQuantize.ts:110  quantizeFromCanvas  — 0 consumers
demo/workbenches/extract/composables/useImageQuantize.ts:115  quantizeFromCamera  — 0 consumers
demo/workbenches/extract/composables/useImageQuantize.ts:158-159 (the exports)
```

`quantizeFromCamera` (`:115-146`) does `getUserMedia` → `<video>` → canvas → `getImageData`.
`ExtractWorkbench.vue:239-279` does `getUserMedia` → `<video>` → canvas → `toBlob` → `File`.
**Two implementations of the camera capability, one dead.** `owner edict 2` (no dual paths) and
the useExtractSession header's own stated purpose ("the former twins duplicated ~90% of this
state") — the twin was killed at the session layer and survived one level down.

---

## MINOR / INFO

### L-14 · MINOR — the viewport transform has no owner; it is smuggled through three getter callbacks

`panX/panY/zoom` live in `useInertiaGesture`. The *inverse map* that consumes them —
`viewportToImage` — lives in `useImageSampler.ts:103-109`, an image module doing transform math.
The shell wires the triangle by hand:

```
ImageEyedropper.vue:124-130   useImageSampler({ getTransform: () => ({ panX, panY, zoom }) })
ImageEyedropper.vue:134-137   useLoupeCanvas({ getOffscreenCanvas: …, viewportToImage: … })
```

Three modules, three callback bridges, and the one piece of shared truth (the affine transform)
is a value nobody owns. This is the root that L-1 and L-2 grow out of.

**Greenfield lattice.** Concretely, with no legacy:

```
demo/workbenches/extract/
├─ useExtractImage.ts        ONE decode. File → { bitmap: ImageBitmap, width, height }
│                            + objectURL lifecycle (create/revoke). Result-typed; the ONLY
│                            place a decode can fail, feeding the session's existing error channel.
│                            Consumed by BOTH the quantizer and the eyedropper.
├─ useViewportTransform.ts   THE owner of { panX, panY, zoom }. fit / clamp / zoomAround /
│                            toContent(rx,ry) / toViewport(ix,iy). Pure; no DOM, no pointers.
│                            `viewportToImage` lives here and nowhere else.
├─ usePanZoomGesture.ts      Pointer/wheel/pinch → intents on useViewportTransform.
│                            Velocity ← glass-ui useDragVelocity. Resize ← glass-ui
│                            useResizeObserver → clamp (never re-fit). Owns EVERY listener
│                            on the element it bound, incl. the unpin intent.
└─ ImageEyedropper/
   ├─ ImageEyedropper.vue    Pure composition + presentation. No addEventListener. No `let` flags.
   └─ useLoupe.ts            Owns its canvas element outright (created imperatively into a
                             container dep — no template string, no v-if). DPR-sized via
                             glass-ui useCanvasLifecycle.

demo/color-session/
├─ index.ts                  the barrel the (revived) boundary lint enforces
├─ picker-color.ts           unchanged
└─ format.ts                 THE one formatColorForDisplay(color, space) — consumed by the
                             selector specimen, the AST echo, and the eyedropper readout.
                             PICKER_SPACE_NAMES is its only naming source. Precision is a
                             parameter that is actually honoured.

src/color/operations.ts
└─ fromRgba8()               the missing inverse of toRgba8; published on ./color.
                             Kills formatHex, pickerColorToHex, and the parseCssColor round trip.
```

Net: 4 composables instead of 3 but **zero** cross-module getter callbacks, one decode instead of
three, one readout format instead of four, and both blockers structurally impossible.

### L-15 · INFO — the visual-audit matrix cannot reach this component at all

All 60 captures of `#/extract` show the empty drop zone (verified by reading
`shots/safari-desktop-light/extract.png`). The eyedropper requires an uploaded image, which the
harness never supplies, so `REPORT.md`'s extract rows (`smallTapTargets: 6`, `namelessButtons: 3`,
`overflowX: 0`) describe `ImageDropZone` + `ExtractControls` and say **nothing** about this
component. `shots/zoom-200-desktop/` has no `extract.png` at all. Any downstream claim of
"visually clean" for this component is unsupported.

**Cure.** The capture harness needs a fixture-image state for `#/extract` (the `states.mjs` seam
already exists) — the eyedropper, the loupe, and the pinned action bar are otherwise
永 unphotographed.

### L-16 · INFO — small conformance notes

- `ImageEyedropper.vue:105` — `colorSpace?: DisplayColorSpace | undefined` : the explicit
  `| undefined` is redundant with `?`.
- `verbatimModuleSyntax` (edict 8): **clean** across the whole chain — `type Ref`, `type SpaceId`,
  `type DisplayColorSpace`, `type PickerColor` are all `import type` / inline-`type`.
- Vue 3.5 idioms (edict 7): `useTemplateRef` + reactive props destructure used correctly in the
  component. `useTemplateRef` *inside a composable* (`useLoupeCanvas.ts:21`) is legal but is the
  string-coupling at the root of L-1.
- Animations (edict 6): `swatch-pop` is a scoped component keyframe — correctly placed per
  `demo/DESIGN.md`; not deleted, not hoisted. **No violation.**
- Materials (edict 5): `glass-floating rounded-panel` matches `DESIGN.md § Surfaces` rung 3 and
  `§ Radii` (`rounded-panel` is named for "the eyedropper overlay"). **No violation.**

---

## Strongest defect

**L-1** — the loupe's first paint always lands on a canvas that does not yet exist, measured at
**0 of 12100 non-transparent pixels on the first hover** and **permanently blank on touch**, because
`useLoupeCanvas` owns the ref by template string while `ImageEyedropper.vue` owns the element's
existence by `v-if`. It is a shipped, user-visible failure of the component's headline feature, and
it is caused by exactly the ownership split this seat was sent to find.

## What is sound

The published-surface discipline. Every `@mkbabb/value.js` import in this chain is a real
`package.json#exports` subpath, generated-aliased in `vite.config.ts:29-50` with anchored regexes
that make a deep-path import impossible to write accidentally. No `@src/*` reach anywhere in
`demo/`. No `src/` → glass-ui edge (inv-K-1 is the one lint rule still alive). glass-ui is consumed
only through its own published subpaths (`/dock`, `/watercolor-dot`, `/dom`, `/motion-core`). The
component is not a god module (299 lines, template-dominant), and `useRAFLoop` adoption at
`useInertiaGesture.ts:114-129` — with `respectReducedMotion: false` and the PRM decision kept local
and documented — is exemplary design-system consumption. The failure is not "the demo cheats on the
library"; it is that the demo's *own* internal boundaries are unowned and unenforced.

---
---

# ADDENDUM — CHALLENGE-L second pass (independent)

## Model receipt (second pass)

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, 1M context, the tier this
seat was explicitly spawned with. Declared, not inherited.

This pass was run **without reading the report above first** — the import trace, the greps and the
measurements below were derived independently and only then reconciled against it. Everything above
is preserved verbatim (addenda-not-patch). This addendum records: (§A) what the second pass
independently **confirms**, with evidence the first pass did not have; (§B) **four findings the
first pass does not contain**; (§C) one **measurement discrepancy** reported honestly rather than
overwritten.

---

## §A — independent confirmations

**A-1 · L-1 is now confirmed a fourth way, and visually.** Beyond the first pass's `getImageData`
counts, two independent proofs:

*(i) A mechanism reproduction* with no browser, using jsdom + the repo's own Vue — this isolates
the `v-if` / synchronous-draw ordering from every other variable:

```
$ node --input-type=module -e '<appendix A2>'
sample #1 (first tap/hover):
  drawLoupe() sees loupeCanvasRef = null  -> EARLY RETURN, no paint
  after nextTick: loupeCanvasRef = <canvas>
sample #2 (subsequent hover):
  drawLoupe() sees loupeCanvasRef = <canvas> -> paints
```

*(ii) The existing probe screenshot proves it to the eye.* Reading
`probe/shot-mobile-dark-tapped.png` (mobile-dark, after a synthetic tap): the loupe ring is
**transparent**. The purple/grey vertical edge of the fixture runs straight through the circle at
**the same position and the same scale** as outside it. A painted loupe at `LOUPE_PIXELS = 11` over
`LOUPE_SIZE = 110` would show a 10× blow-up — one or two enormous blocks, never a 1:1 continuation
of the surrounding image. What the screenshot shows is the viewer looking *through* an unpainted
canvas. The magnifier is not merely blank; it is invisible.

The same screenshot independently confirms first-pass **L-7** (no precision policy): the readout
reads `lab(53.5850…)` — clipped mid-number by the `truncate` span, exactly as predicted.

**A-2 · L-3 / L-7 (DPR + design-system canvas).** Confirmed and extended. glass-ui 7.0.0 publishes
`./canvas` among **74** export keys, and:

```
$ grep -rn "useCanvas2D\|useCanvasLifecycle\|glass-ui/canvas" demo
(no matches)
```

Zero demo consumers. Meanwhile the demo hand-rolls `getContext("2d")` at **11** sites, and exactly
one of them re-derives the design system's documented default by hand:

```
$ grep -rn "devicePixelRatio" demo --include="*.ts" --include="*.vue"
demo/workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts:141:  const dpr = Math.min(window.devicePixelRatio || 1, 2);
demo/color-picker/composables/useDevicePixelSnap.ts:40:                                const dpr = window.devicePixelRatio || 1;
```

`min(devicePixelRatio, 2)` at `useMixingAnimation.ts:141` is character-for-character the policy
`useCanvas2D.d.ts` documents as its own default. The sibling workbench got it right by hand; the
magnifier got it wrong; the design system owns it and neither imports it. That is the shape of a
missing seam, not a missing line.

**A-3 · L-8 (`DisplayColorSpace` × 4).** Confirmed by an independent grep, same four sites. Adding
one consequence the first pass did not draw: because `useImageSampler.ts:21` **exports** its
re-mint, `test/image-sampler-v4.test.ts:5` imports the *duplicate* rather than the canonical type —
the re-mint is now load-bearing in the test suite, so deleting it is a two-file edit, not one.

**A-4 · L-9 (byte→color round trip).** Confirmed, with a correction on cost — see §C.

---

## §B — findings the first pass does not contain

### L-17 · MAJOR — the eyedropper and the picker give **different notations** for the same color in the same selected space

First-pass L-6 found that the eyedropper re-mints a readout format and that its *space names* drift
(`ICTCP` vs `ICtCp`). The deeper fact is that the app already has a canonical answer to the whole
question, and the eyedropper contradicts it — not in casing, in **notation**.

`demo/color-session/useColorPipeline.ts:174-179` is the app's one implementation of "render this
color in the selected `DisplayColorSpace`":

```ts
const formatForSelectedDisplaySpace = (color: PickerColor) => {
    if (model.value.selectedColorSpace === "hex") return colorToHexString(color);
    return serializePickerColor(color);
};
```

`serializePickerColor` (`picker-color.ts:206-211`) **already** answers for library-only spaces — it
converts to `oklch` and serializes. So the branch `useImageSampler.ts:63-65` adds
(`CSS_PICKER_SPACES.has(space) ? serialize : formatLibraryColor`) is not filling a gap; it is
**overriding a decision the domain already made**.

Measured, same input `#ff0000`, against the built `dist/subpaths`:

```
$ node --input-type=module -e '<appendix B2>'
hsv      | eyedropper: HSV 0 · 1 · 1                   | canonical: oklch(62.795536392143% 0.257683303805 29.233880279628deg)
kelvin   | eyedropper: KELVIN 1000                     | canonical: oklch(65.925252512236% 0.230113845068 35.205812402185deg)
ictcp    | eyedropper: ICTCP 0.4279 · -0.1157 · 0.2787 | canonical: oklch(62.795536392143% 0.257683303805 29.233880279629deg)
jzazbz   | eyedropper: JZAZBZ 0.1344 · 0.1179 · 0.1119 | canonical: oklch(62.795536392144% 0.257683303805 29.233880279632deg)
```

**Failure scenario.** Select HSV in the picker; open the eyedropper on `/#/extract`; sample pure
red. The picker's own input field reads `oklch(62.79…% 0.2576… 29.23…deg)`; the eyedropper's readout
one pane away reads `HSV 0 · 1 · 1`. Same color, same selected space, same session — two spellings
that share no token. Reachable because `usePaneRouter.ts:139` forwards
`model.value.selectedColorSpace` live and `color-model.ts:74` declares all 17 spaces + hex
selectable.

This subsumes first-pass L-6 and raises it: the cure is not "one formatter with consistent names",
it is "the domain decides once". `formatForSelectedDisplaySpace` is currently trapped inside
`useColorPipeline` — a 200+-line orchestration composable — which is *why* nobody outside could
reuse it. Lift it to `color-session/color-model.ts` as a pure
`formatForDisplaySpace(color, space)`; delete `formatInColorSpace` and `formatLibraryColor`. If
`HSV 0 · 1 · 1` is the better product answer then it is the canonical one and the picker adopts it —
but the choice is made in one place, by the domain.

---

### L-18 · MAJOR — the alpha channel is read from the canvas and then thrown away

`useImageSampler.ts:116-118`:

```ts
const data = offscreenCtx.getImageData(ix, iy, 1, 1).data;
const hex = formatHex(data[0] ?? 0, data[1] ?? 0, data[2] ?? 0);
```

`data[3]` is never referenced anywhere in the component. The offscreen canvas is created without
`{ alpha: false }` (`:83`), and `ImageDropZone.vue:30` accepts `image/*` — PNG, WebP, AVIF and SVG
all carry alpha.

**Failure scenario.** Drop a logo PNG with a transparent background. Sample the transparent region.
`getImageData` returns `(0, 0, 0, 0)`; the readout claims `#000000`; "Add to palette"
(`ImageEyedropper.vue:212-217`) writes an **opaque black** swatch for a pixel the user sees as the
page behind it. No warning, no cue, and the loupe (once L-1 is fixed) will show the same
nothing-coloured black.

**Mechanism — this is a library-affordance defect, not an oversight.** The library's byte path is
alpha-complete in both directions: `rgb(r, g, b, alpha)` on the `./color` subpath accepts it, and
`toRgba8` round-trips it (`picker-color.ts:214`). The demo loses it because the hand-rolled
`formatHex` (`:32-35`) has no alpha parameter — a 6-digit hex string is a lossy carrier chosen for
no reason. First-pass L-9's cure (`fromRgba8` / direct `rgb()`) fixes this defect too, and
`pickerColorToHex` (`picker-color.ts:213-217`) already emits the 8-digit form when `alpha < 1`, so
the display side is ready and waiting.

---

### L-19 · MAJOR — `justUnpinned` is a one-shot flag with no reset path; a pan-after-pin swallows the next tap

First-pass L-11 correctly names `justUnpinned` a hand-rolled state machine straddling two
composables. It has a concrete failure the first pass did not state.

```
ImageEyedropper.vue:123        let justUnpinned = false;
ImageEyedropper.vue:178-184    pointerdown (capture): if (pinned) { …; justUnpinned = true; }
ImageEyedropper.vue:152-155    onTap: if (justUnpinned) { justUnpinned = false; return; }
useInertiaGesture.ts:277-281   onTap fires ONLY when `!didMove`
```

The flag is set on any pointerdown-while-pinned and cleared **only inside `onTap`**. A gesture that
moves never reaches `onTap`.

**Failure scenario.** (1) Tap to sample — `pinned = true`. (2) Press and **drag** to pan the image,
then release: `hasMoved` is true, `onTap` never runs, `justUnpinned` is left `true`. (3) Tap to
sample a new pixel: swallowed by `:152-155`, nothing happens, no feedback. (4) Tap again: works.
Every pan-after-pin costs the user the next tap, on the interaction that *is* the component.

Confirmed by construction from the four line references above. The cure is first-pass L-11's cure —
the gesture composable owns tap semantics as a first-class option — after which no flag exists to
go stale.

---

### L-20 · MINOR — `formatInColorSpace` is public only because a test calls it, and the test canonizes the divergence

```
$ grep -rn "formatInColorSpace" demo test
useImageSampler.ts:55    function formatInColorSpace(hex: string)          ← definition
useImageSampler.ts:118       return { hex, formatted: formatInColorSpace(hex) };  ← the ONLY caller
useImageSampler.ts:136       formatInColorSpace,                           ← exported anyway
test/image-sampler-v4.test.ts:18,19,20,24,28                               ← the only consumer
```

`ImageEyedropper.vue` never touches it. The composable's return surface was widened purely to make
a private formatter reachable from a test — and the test then pins the L-17 divergence as if it were
the contract:

```
test/image-sampler-v4.test.ts:24
expect(sampler("hsv").formatInColorSpace("#ff0000")).toBe("HSV 0 · 1 · 1");
```

A public surface shaped by a test rather than by a consumer is how a defect acquires tenure. Once
L-17 lands, the formatter lives in `color-session/` and is tested there, against the one
implementation the whole app shares.

---

## §C — measurement discrepancy, reported not resolved

First-pass L-9 measured the hex-string round trip at **1.26×** the direct constructor
(2.237 µs vs 1.773 µs per sample, N=200000). This pass measured **6.5×** (0.55 µs vs 0.08 µs per
sample, N=20000) on the same built `dist/`:

```
$ node --input-type=module -e '<appendix C2>'
parse-roundtrip: 11.0ms / 20000  = 0.55us per sample
rgb() direct   : 1.7ms / 20000  = 0.08us per sample
ratio          : 6.5x
```

Both runs agree on direction and on the finding; they disagree on magnitude by ~4× in ratio and
~4-25× in absolute per-sample cost. The likely cause is JIT state and allocation pressure at
different N (the first pass's absolute numbers are ~4× and ~22× slower for the *same* work, which
points at machine load or a cold/deoptimised run rather than at either script being wrong).
**Neither number should be quoted as the cost of this defect.** The structural claim — that the
pixel path re-enters the library through the CSS *parser* to obtain numbers it already holds, and
loses alpha doing it (L-18) — does not depend on the ratio and stands on either measurement.

---

## §D — second-pass verdict

**DEFECTIVE**, unchanged. The first pass's ranking holds: **L-1** is the strongest defect, and this
pass adds a jsdom mechanism reproduction and a screenshot in which the magnifier is visibly
transparent.

The second pass's own contribution to the *premise* — "the library structure underneath is wrong" —
is L-17 and L-18 taken together: the demo does not merely duplicate library-adjacent logic, it
**re-decides questions the domain has already answered** (`formatForSelectedDisplaySpace`) and
**discards library capability it already has** (alpha through `rgb()`/`toRgba8`). Both flow from the
same root the first pass named — no enforced seam, no barrel, and (first-pass L-10) no live lint
rule to notice.

One thing worth stating for the mega-tranche's disposition: the correct home for the fix is *not
all in the demo*. L-7/A-2 lands in **glass-ui** (`./canvas` needs a paint-on-demand, DPR-policy
sibling to `useCanvas2D`; the loupe and `MixAnimationCanvas` both consume it), and first-pass L-9's
`fromRgba8` lands in **`src/`**. Per the standing BH/BI relay invariant, the glass-ui half must go
to the active glass-ui inbox as a component-level change request, not be re-hand-rolled in `demo/`
a twelfth time.

---

## Appendix — second-pass reproductions

**A2 · the loupe first-draw race, mechanism-isolated** (repo root; jsdom + the repo's Vue):

```bash
node --input-type=module -e '
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><div id=app></div>");
for (const k of ["window","document","SVGElement","Element","Node","HTMLElement","MutationObserver","requestAnimationFrame"]) {
  Object.defineProperty(globalThis, k, { value: k === "window" ? dom.window : dom.window[k], configurable: true, writable: true });
}
const { createApp, ref, h, useTemplateRef, nextTick } = await import("vue");
const log = [];
const App = { setup() {
  const visible = ref(false);
  const canvasRef = useTemplateRef("loupeCanvasRef");
  globalThis.__show = () => { visible.value = true;
    log.push("  drawLoupe() sees loupeCanvasRef = " + (canvasRef.value === null ? "null  -> EARLY RETURN, no paint" : "<canvas> -> paints")); };
  globalThis.__peek = (t) => log.push(t + " loupeCanvasRef = " + (canvasRef.value === null ? "null" : "<canvas>"));
  return () => visible.value ? h("canvas", { ref: "loupeCanvasRef", width: 110, height: 110 }) : null;
} };
createApp(App).mount(document.getElementById("app"));
log.push("sample #1 (first tap/hover):"); globalThis.__show();
await nextTick(); globalThis.__peek("  after nextTick:");
log.push("sample #2 (subsequent hover):"); globalThis.__show();
console.log(log.join("\n"));'
```

**B2 · the readout divergence** (requires a built `dist/`):

```bash
node --input-type=module -e '
const { convertColor } = await import("./dist/subpaths/color.js");
const { parseCssColor, serializeCssColor } = await import("./dist/subpaths/css.js");
const CSS = new Set(["rgb","hsl","hwb","lab","lch","oklab","oklch","xyz","srgb-linear","display-p3","a98-rgb","prophoto-rgb","rec2020"]);
const p = parseCssColor("#ff0000");
for (const space of ["hsv","kelvin","ictcp","jzazbz"]) {
  const c = convertColor(p.value, space).value;
  const ch = c.channels.map(x => x==="none" ? x : Number(x.toFixed(4)).toString());
  const eyedropper = `${c.space.toUpperCase()} ${ch.join(" · ")}` + (c.alpha===1?"":` · α ${c.alpha}`);
  const target = CSS.has(c.space) ? c : convertColor(c, "oklch").value;
  const s = serializeCssColor(target);
  console.log(space.padEnd(8), "| eyedropper:", eyedropper.padEnd(34), "| canonical:", s.ok ? s.value : "ERR");
}'
```

**C2 · the round-trip cost** (see §C — magnitude is measurement-sensitive):

```bash
node --input-type=module -e '
const { rgb } = await import("./dist/subpaths/color.js");
const { parseCssColor } = await import("./dist/subpaths/css.js");
const N = 20000; let acc = 0, t0 = performance.now();
for (let i=0;i<N;i++){ const h=(v)=>v.toString(16).padStart(2,"0");
  acc += parseCssColor(`#${h(i&255)}${h((i*7)&255)}${h((i*13)&255)}`).ok ? 1 : 0; }
const tA = performance.now()-t0; t0 = performance.now();
for (let i=0;i<N;i++){ acc += rgb(i&255,(i*7)&255,(i*13)&255).ok ? 1 : 0; }
const tB = performance.now()-t0;
console.log(`parse-roundtrip: ${tA.toFixed(1)}ms / ${N}  = ${(tA/N*1000).toFixed(2)}us per sample`);
console.log(`rgb() direct   : ${tB.toFixed(1)}ms / ${N}  = ${(tB/N*1000).toFixed(2)}us per sample`);
console.log(`ratio          : ${(tA/tB).toFixed(1)}x`);'
```

**D2 · the greps behind §A** (all run at repo root):

```bash
grep -rn 'SpaceId | "hex"' demo src test e2e          # 3 re-mints (+ color-model.ts:29 canonical)
grep -rn "formatInColorSpace" demo test               # 1 internal caller, 1 export, 5 test asserts
grep -rn "useCanvas2D|useCanvasLifecycle|glass-ui/canvas" demo   # 0 matches
grep -rn "devicePixelRatio" demo --include="*.ts" --include="*.vue"   # 2 matches, neither here
grep -rn 'getContext("2d"' demo --include="*.ts" --include="*.vue"    # 11 hand-rolled sites
node -e 'console.log(Object.keys(require("./node_modules/@mkbabb/glass-ui/package.json").exports).length)'   # 74
```

---
---

# ADDENDUM — CHALLENGE-L third pass (independent)

## Model receipt (third pass)

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

This pass was run without reading passes 1–2 until after the evidence was collected. §A records
where I independently landed on the same ground. **§B is the payload**: seven findings absent from
both prior passes — including one (**L-21**) that *falsifies* the "What is sound" section both
prior passes signed. Verified absent by keyword census over the pre-existing 958 lines:

```
$ for k in tsconfig aria-label vitest.config crossOrigin self-reference traceResolution \
           image-rendering "dist/index.d.ts" toHex ARCHITECTURE; do
    printf "%-20s %s\n" "$k" "$(grep -c -- "$k" challenge-L-library.md)"; done
tsconfig             0
aria-label           0
vitest.config        0
crossOrigin          0
self-reference       0
traceResolution      0
image-rendering      0
dist/index.d.ts      0
toHex                0
ARCHITECTURE         0
```

---

## §A — independently reproduced (no new claim)

Reached before reading passes 1–2, by the same evidence:

- **L-8 / DisplayColorSpace ×4.** `color-model.ts:29` canonical; re-mints at `useImageSampler.ts:21`
  (exported), `ExtractWorkbench.vue:202`, `ExtractPane.vue:30`. Confirmed.
- **L-10 / dead boundary lint.** `eslint.config.js:235-238` + `:275-276` glob `demo/@/**`;
  `ls -d demo/@` → *No such file or directory*; the three globs match 0, 0, 0 files. Confirmed.
- **L-5 / triple decode.** `useImageQuantize.ts:19-26` (`createImageBitmap` + `OffscreenCanvas`)
  vs `useImageSampler.ts:68-95` (`new Image()` + data URL + two `document.createElement("canvas")`),
  over the base64 string minted at `useExtractSession.ts:29-36`. Confirmed.
- **L-12 / raw `ResizeObserver`.** `useInertiaGesture.ts:353-360`, unbatched, calling a
  `fitToViewport` that *assigns* `zoom`/`panX`/`panY` (`:163-166`) — so any resize discards the
  user's zoom. glass-ui ships `useResizeObserver` with `threshold` + `rafBatch` whose docstring names
  this exact case. Confirmed.
- **L-3 / no DPR policy.** Confirmed, with the arithmetic pinned in §B (L-24).
- **L-15 / zero visual coverage.** Confirmed by reading `shots/safari-desktop-light/extract.png`
  (resting drop zone, "UNDEVELOPED PLATE") and `ls shots/zoom-200-desktop/` → `adminusers blob
  browse gradient picker` — no `extract` in the 200 % matrix at all.
- **L-1 / loupe first-paint.** I predicted it statically from the `v-if` ↔ synchronous-`drawLoupe`
  seam; pass 1 measured it (0/12100). I did not re-measure — pass 1's number stands.

---

## §B — findings absent from passes 1 and 2

### L-21 · BLOCKER (structural) — the demo's **type** resolution of the published surface has drifted off `package.json#exports`; three mappings point at files that do not exist and `/css` — used by this component — is not mapped at all

Both prior passes close with *"What is sound: the published-surface discipline."* That verdict is
correct on the **runtime** axis and **false on the type axis**.

`package.json#exports` (`package.json:20-49`) is a closed 7-key set — `./color ./value ./css
./easing ./math ./transform ./quantize`. There is deliberately **no `.` root key**
(`vite.config.ts:203-205`: *"The seven literal package capabilities are the complete library graph;
there is no root or compatibility entry"*).

`tsconfig.demo.json:42-49` declares eight mappings. Measured against the tree:

| tsconfig path (line) | target | target exists? | key in `exports`? |
|---|---|---|---|
| `@mkbabb/value.js` (`:42`) | `dist/index.d.ts` | **MISSING** | **no such key** |
| `@mkbabb/value.js/color` (`:43`) | `dist/subpaths/color.d.ts` | EXISTS | yes |
| `@mkbabb/value.js/parsing` (`:44`) | `dist/subpaths/parsing.d.ts` | **MISSING** | **no such key** |
| `@mkbabb/value.js/math` (`:45`) | `dist/subpaths/math.d.ts` | EXISTS | yes |
| `@mkbabb/value.js/easing` (`:46`) | `dist/subpaths/easing.d.ts` | EXISTS | yes |
| `@mkbabb/value.js/units` (`:47`) | `dist/subpaths/units.d.ts` | **MISSING** | **no such key** |
| `@mkbabb/value.js/transform` (`:48`) | `dist/subpaths/transform.d.ts` | EXISTS | yes |
| `@mkbabb/value.js/quantize` (`:49`) | `dist/subpaths/quantize.d.ts` | EXISTS | yes |
| **`/css` — NOT MAPPED** | — | — | yes — **used at `useImageSampler.ts:13`** |
| **`/value` — NOT MAPPED** | — | — | yes |

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts \
           dist/subpaths/value.d.ts dist/subpaths/css.d.ts; do
    printf "%-34s %s\n" "$f" "$([ -e "$f" ] && echo EXISTS || echo MISSING)"; done
dist/index.d.ts                    MISSING
dist/subpaths/parsing.d.ts         MISSING
dist/subpaths/units.d.ts           MISSING
dist/subpaths/value.d.ts           EXISTS
dist/subpaths/css.d.ts             EXISTS

$ ls dist/subpaths/
color.d.ts  color.js  css.d.ts  css.js  easing.d.ts  easing.js  math.d.ts  math.js
quantize.d.ts  quantize.js  transform.d.ts  transform.js  value.d.ts  value.js
```

`tsconfig.demo.json:4` even carries a stale prose list — `@mkbabb/value.js/{color,parsing,math,
easing,units,transform,quantize}` — naming two subpaths (`parsing`, `units`) that no longer exist and
omitting the two that do (`css`, `value`).

**The asymmetry is the defect.** The Vite alias set is *generated* from `package.json#exports`
(`vite.config.ts:33-49`) and cannot drift — its comment is rightly proud of that. The tsconfig side
was left hand-maintained and drifted anyway. So the two lines of this component's composable resolve
by two different mechanisms:

```
$ npx tsc -p <probe extending tsconfig.demo.json, files:[useImageSampler.ts]> --noEmit --traceResolution
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
======== Module name '@mkbabb/value.js/color' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts'. ========
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`useImageSampler.ts:12` resolves through an explicit `paths` entry; `:13` resolves through Node
**self-reference** (the root `package.json` names the package and carries an `exports` map, so the
package can import itself). Both land correctly *today* — but `/css` correctness is accidental:
nothing in the demo config asserts it, and the config that was supposed to assert it forgot the key.

There is also a hoisted second copy in the graph — `node_modules/@mkbabb/value.js@4.0.0`, pulled in
as glass-ui's peer (`glass-ui/package.json` peerDependencies: `"@mkbabb/value.js": "^4.0.0"`) — whose
`dist/subpaths/css.d.ts` is a **different file** from the repo's:

```
$ md5 -q dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
e0968b8d3b9a5ecabc7c8c1d01de9995
4309648d15b521dc8281eab37ccc32a2
```

Self-reference currently wins over the hoisted copy, so no split-brain manifests. But the demo's
type axis is one `paths` edit or one npm-hoist change away from typechecking against a published
tarball while running the local build — and nothing in the repo would report it.

**Cure (transposition — a deletion).** Delete the entire `@mkbabb/value.js*` `paths` block from
`tsconfig.demo.json:42-49`. The `traceResolution` above is the proof it is unnecessary: an *unmapped*
published subpath resolves exactly right, through `package.json#exports` — the same single source of
truth the Vite alias is generated from. The type axis then becomes drift-proof *by construction*
rather than by vigilance, and `dist/index.d.ts` / `/parsing` / `/units` stop being reachable at all,
which is correct: they are not published.

*Why BLOCKER:* the demo's charter is to dogfood the published surface. A demo whose runtime
resolution is generated and whose type resolution is stale is not proving one surface — it is
proving two things and reporting one number. Both prior passes certified this axis sound.

---

### L-22 · MAJOR — hex serialization has four demo homes because the published surface has none

```
$ grep -rn "export function.*[Hh]ex\|export const.*[Hh]ex" src/
(no output)
```

value.js 4.0.0 **parses** hex — `parseCssColor("#ff0000")` succeeds, proven by
`test/image-sampler-v4.test.ts:19` — but cannot **write** it: the same assertion shows
`serializeCssColor` of that color emits `rgb(255 0 0)`. The surface is asymmetric: hex in, never out.

Four independent mints of the same six characters follow:

```
$ grep -rn "padStart(2" demo src --include="*.ts" --include="*.vue"
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:33
demo/color-session/picker-color.ts:215
demo/palettes/browser/search/MiniColorPicker.vue:103
demo/palettes/export/bytes.ts:31
```

`useImageSampler.ts:32-35` (`formatHex`) exists *only* because `/color` has no `toHex`. This is the
inverse of the usual ownership question: not "is the component doing the library's job", but "the
library declines a job that is unambiguously its own, so four consumers each do it privately".

Note this is upstream of pass 2's **L-9** (the byte→string→parser round-trip). L-9 correctly says the
sampler should not route bytes through the CSS parser to get a color — but the sampler *also* has to
produce a hex string for the UI (`sampledColor` feeds `WatercolorDot :color` at
`ImageEyedropper.vue:20` and the swatch/emit path at `:213`, `:221`). Killing the round-trip does not
kill `formatHex`; only a library `toHex` does.

**Cure.** `/color` exports `toHex(color, { alpha?: boolean }): string` beside the existing `toRgba8`.
All four mints die; `pickerColorToHex` (`picker-color.ts:213-217`) and its pass-through wrapper
`colorToHexString` (`color-model.ts:61-65`) collapse with them.

---

### L-23 · MAJOR — the ARCHITECTURE declares a canonical library-display spelling; **all three** shipped notations disagree with it and with each other

Pass 2's **L-17** established that the eyedropper and the picker spell the same color differently.
Neither pass established the reference. It exists, and it is normative:

`docs/tranches/V/ARCHITECTURE.md` §2, the 4.0 space contract table, `hsv` row:

> no CSS spelling; numeric library display `hsv(hdeg s% v% / α%)` only

and directly beneath the table:

> Only the thirteen CSS-native rows carry a canonical `parseCssColor`→`serializeCssColor` round trip.
> The `hsv`, `kelvin`, `ictcp` and `jzazbz` numeric library displays above are specification notation
> only.

So for `#ff0000` in `hsv` the specified rendering is **`hsv(0deg 100% 100%)`**. Shipped:

| producer | output | matches spec? |
|---|---|---|
| eyedropper — `useImageSampler.ts:43` | `HSV 0 · 1 · 1` | no — no function form, no units, raw 0–1 channels |
| space selector — `ColorSpaceSelector.vue:165` | `hsv · 0 · 1 · 1` | no |
| ARCHITECTURE §2 | `hsv(0deg 100% 100%)` | — |

Both demo notations also drop the `%`/`deg` units the spec requires, and both print channels in
physical 0–1 coordinates where the spec's display form is percentage — so `HSV 0 · 1 · 1` is not
merely differently-formatted, it is **differently-scaled** from the documented notation. And
`test/image-sampler-v4.test.ts:26` freezes the eyedropper's version as the contract:

```
expect(sampler("hsv").formatInColorSpace("#ff0000")).toBe("HSV 0 · 1 · 1");
```

This sharpens pass 2's L-17 from "two demo modules disagree" to "**the specification names one
spelling, nothing implements it, and a test canonizes a third**".

**Cure (transposition).** The notation is defined by the *library's* own spec table, so the library
should emit it: `/css` gains `serializeLibraryColor(color)` beside `serializeCssColor`, covering the
four non-CSS spaces in the documented form. Both demo implementations then reduce to
`CSS_PICKER_SPACES.has(s) ? serializeCssColor : serializeLibraryColor` — and that two-line function
belongs once, in `color-session/`, not twice.

---

### L-24 · MAJOR — the DPR gap is arithmetic, not a policy omission, and the display canvas is *smoothed* while the sample is nearest-neighbour

Pass 1's L-2/L-3 note the 110 → 106 resample and the missing DPR policy. Two additions.

**(a) The loupe's resolution loss is fixed by construction at every DPR.** The backing store is the
literal `110` typed into the template (`ImageEyedropper.vue:85`); the CSS box is
`${LOUPE_SIZE}px` = `110px` (`:194-195`, `constants.ts:8`). backing ÷ CSS-box = 1.0 **regardless of
`devicePixelRatio`**. So the magnifier renders at 1/`dpr` of device resolution: half on any Retina
display, a third on a 3× phone — on the one surface whose entire purpose is per-pixel fidelity, and
which deliberately sets `imageSmoothingEnabled = false` (`useLoupeCanvas.ts:40`) to show hard pixel
edges that the browser then resamples away on presentation. No measurement is needed; two literals
decide it.

**(b) The *display* canvas has the opposite problem.** Measured live (`localhost:9000`, `#/extract`,
64×64 synthetic upload, eyedropper opened):

```
canvasBacking: { w: 64, h: 64 },  transform: "translate(0px, 59.1836px) scale(7.9375)"
```

and:

```
$ grep -rn "image-rendering\|pixelated" demo --include="*.css" --include="*.vue"
(no output)
```

The visible canvas carries the image at native resolution and is CSS-scaled 7.94× with default
(smooth) filtering, while `sampleAt` (`useImageSampler.ts:111-119`) returns the *exact* nearest source
pixel from the offscreen canvas. At any zoom above 1× the color the user sees under the crosshair is
a bilinear blend of neighbours and the value they receive is a hard sample — they disagree at every
edge in the image. One bitmap, two renderings, two filter policies, split across two composables with
no shared filter contract.

**Cure.** Size the loupe backing store `LOUPE_SIZE * dpr` with `ctx.scale(dpr, dpr)` — or mount it
through glass-ui's `useCanvas2D`, whose `dprPolicy` already owns this
(`node_modules/@mkbabb/glass-ui/dist/composables/glass/canvas2d/useCanvas2D.d.ts`). And give the
display surface `image-rendering: pixelated` above 1× zoom so seen == sampled. Under L-5's cure the
display canvas becomes an `<img>` and only the `image-rendering` decision survives.

---

### L-25 · MINOR — the DockControl label idiom forks by directory, and this component is on the wrong side

Two idioms for one design-system component:

```
aria-label:  demo/shell/dock/Dock.vue:143,144,154 · ActionBarToggle.vue:90 · SlugEditLayer.vue:94,106,114
title:       demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:11,46,53
             demo/workbenches/extract/ExtractControls.vue:41,50,85 · ExtractWorkbench.vue:52
             demo/workbenches/mix/MixResultDisplay.vue:123,130,138 · gradient/GradientVisualizer.vue:254
```

`DockControl`'s declared prop surface
(`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`) has **neither** — both
idioms ride `$attrs` fallthrough. I verified live that the attribute lands on the `<button>` element
itself, not a wrapper, so these buttons are **not** truly nameless (`title` is the accname
last-resort fallback). Pass 1's L-15 reads `namelessButtons: 3` as saying "nothing about this
component". It says something: the probe
(`docs/tranches/V/megatranche/audit/visual/capture.mjs:102-105` — `aria-label || aria-labelledby ||
textContent`, `title` not consulted) counts exactly the title-only controls, and driven live those
three are:

```
extractBtns: [ {t:"Upload image", a:null}, {t:"Open camera", a:null}, {t:"Reset", a:null} ]
```

Opening the eyedropper took the count **3 → 4** (adding `title="Close eyedropper"`); pinning renders
`title="Add to palette"` + `title="Apply as current color"` and takes it to 6. The eyedropper is not
outside that signal — it is the same idiom, and it *doubles* the row.

`title` never reaches touch users and never reaches keyboard-only users; glass-ui ships `./tooltip`
for the visible affordance. Edict 4: both the labelling and the tooltip surfaces of the design system
are bypassed for a raw HTML attribute.

**Cure.** One idiom — `aria-label` for the name, glass-ui `Tooltip` for hover text. Structurally, a
required `label` prop on `DockControl` (a glass-ui change, relayed per the standing BH/BI fond) makes
the fork unrepresentable.

---

### L-26 · MINOR — the demo lattice that *should* be enforced is written down; pass 1's L-10 can be cured mechanically from it

Pass 1 correctly reports that every demo boundary rule is dead. The missing half is that the law it
was meant to encode already exists in normative prose —
`docs/tranches/V/ARCHITECTURE.md:56-62`:

```
app           → shell / color-session / feature / platform / shared
shell         → color-session / platform / shared
feature       → color-session / own descendants / platform / shared / published packages
color-session → platform / shared / published packages
platform      → shared / external packages
shared        → external packages
```

> Cross-feature internal imports are forbidden **by construction**. `color-session` is the explicit
> product domain shared by Picker, palettes, workbenches, shell and admin; it is not a generic
> bucket. […] When two live consumers need another semantic object, it is promoted once; superficial
> similarity does not earn a shared home.

Nothing constructs it. Two consequences for this component specifically:

1. Its own edge (`workbenches/extract/… → color-session/picker-color`) is *legal* under the lattice —
   the direction is allowed. I confirm the whole chain is direction-clean (see the pass-1 lattice
   trace; I re-walked every edge and found no feature→shell, feature→boot, or cross-feature reach).
2. The **"promoted once"** clause is exactly the law that `DisplayColorSpace ×4` (L-8) breaks — and
   the *mechanism* is a seam choice: `useImageSampler.ts:14-19` imports from
   `color-session/picker-color` (the substrate) rather than `color-session/color-model` (the face,
   whose header declares itself "the specimen/editing-target surface shared by the picker, palettes,
   workbenches, shell and admin"). `color-model` re-exposes the same concepts under product names —
   `CSS_NATIVE_SPACES` (`:58`), `toCSSColorString` (`:67`), `colorToHexString` (`:61`) — *and* owns
   `DisplayColorSpace`. Reaching past the face put the canonical type out of view; the local mint
   followed. `color-session` has no `index.ts`, so "the face" is a convention nothing can enforce.

**Cure.** Delete the three dead lint objects — they are worse than absent, they read as coverage —
and encode the lattice above as real zones over the physical tree: for each `demo/workbenches/<f>/**`,
ban `demo/workbenches/!(<f>)/**`, `demo/shell/**`, `demo/color-picker/**`, `demo/picker/**`,
`demo/scenes/**`; for `demo/color-session/**`, ban every feature tree. Six `no-restricted-imports`
objects, mechanically derivable from the doc. Optionally add a `color-session/index.ts` face so the
substrate reach is also nameable.

---

### L-27 · MINOR — two residues: a demo test in the library tree, and a guard for an unreachable state

**(a)** `test/image-sampler-v4.test.ts:6` imports
`../demo/workbenches/extract/ImageEyedropper/composables/useImageSampler`. `vitest.config.ts:26-30`
states the convention in its own words — demo suites live under `demo/test/**`, and that glob exists
*because* relocated demo suites were previously dropped silently. Nine other files break it
identically (`gradient-parse`, `gradient-v4-consume`, `ink`, `mix-v4`, `preview-chips`,
`slider-announcement`, `status-lamp`, `value-domain-clamp`, `view-accents`), so the defect is
systemic — but this particular misplaced file is also the one that freezes the non-spec readout of
L-23 as a contract, so it is not a neutral filing error.

**(b)** `useImageSampler.ts:70` sets `img.crossOrigin = "anonymous"`. The prop's only producer is
`session.previewDataUrl` (`ExtractWorkbench.vue:175`), always a `data:` URL from `readAsDataUrl`
(`useExtractSession.ts:29-36, 166`). `crossOrigin` is meaningless on a `data:` URL. It guards a
cross-origin case the contract makes unreachable — legacy defence under edict 2. Either
`imageUrl: string` under-specifies a contract that really does admit remote URLs (in which case
pass 1's L-4 error path becomes load-bearing), or the line dies with L-5's `File`-based rewrite.
Both roads delete it.

---

## §C — third-pass verdict

**DEFECTIVE** — unchanged in kind, sharpened in one place.

Passes 1 and 2 both close with *"the published-surface discipline is what is sound."* On the runtime
axis that holds and I re-verified it: every `@mkbabb/value.js` specifier in this chain is a literal
`package.json#exports` key, aliased from a set *generated* from that map, with no `@src` or `dist/`
reach anywhere. **L-21 withdraws the type half of that certification**: three `tsconfig.demo.json`
mappings point at files that do not exist, two published subpaths have no mapping at all — including
`/css`, which this component's composable imports on line 13 — and the one bare specifier that *is*
mapped is not a published key. The demo is dogfooding two different surfaces and reporting one.

**Strongest defect (third pass): L-21.** It is the only finding that contradicts a conclusion both
prior passes signed, it sits on the repo's central structural claim, and its cure is a deletion whose
sufficiency is already proved by the `traceResolution` output above — an *unmapped* subpath resolving
exactly right through self-reference.

The pass-1 strongest defect (**L-1**, the loupe blank on first paint and permanently blank on touch,
measured 0/12100) remains the strongest *user-visible* defect and is not displaced.

**Cumulative count across three passes: 27 findings** — L-1..L-16 (pass 1), L-17..L-20 (pass 2),
L-21..L-27 (pass 3).

---

## Appendix — third-pass reproductions

```bash
# L-21 · exports vs tsconfig paths
node -e 'console.log(Object.keys(require("./package.json").exports))'
grep -n "@mkbabb/value.js" tsconfig.demo.json
for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts \
         dist/subpaths/value.d.ts dist/subpaths/css.d.ts; do
  printf "%-34s %s\n" "$f" "$([ -e "$f" ] && echo EXISTS || echo MISSING)"; done

# L-21 · resolution trace (probe tsconfig lives outside the repo)
cat > /tmp/tsconfig.probe.json <<'JSON'
{ "extends": "/Users/mkbabb/Programming/value.js/tsconfig.demo.json",
  "include": [],
  "files": ["/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts"] }
JSON
npx tsc -p /tmp/tsconfig.probe.json --noEmit --traceResolution 2>&1 | grep -E "@mkbabb/value.js/(css|color)'"

# L-21 · the hoisted second copy differs from the repo's dist
md5 -q dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
node -e 'console.log(require("./node_modules/@mkbabb/glass-ui/package.json").peerDependencies["@mkbabb/value.js"])'

# L-22 · the library has no hex writer; four demo mints
grep -rn "export function.*[Hh]ex\|export const.*[Hh]ex" src/     # zero hits
grep -rn "padStart(2" demo src --include="*.ts" --include="*.vue"

# L-24 · no image-rendering policy anywhere in the demo
grep -rn "image-rendering\|pixelated" demo --include="*.css" --include="*.vue"

# L-25 · the label fork
grep -rn "<DockControl" demo --include="*.vue" -A4 | grep -E "title=|aria-label="
grep -n "namelessButtons" -A4 docs/tranches/V/megatranche/audit/visual/capture.mjs

# L-25 · live (Playwright, http://localhost:9000/#/extract, in-page File synthesis)
#   at rest              → 3 title-only DockControls, aria-label null on all three
#   eyedropper open      → namelessButtons 3 → 4  ("Close eyedropper")
#   eyedropper canvas    → backing 64×64, transform "translate(0px,59.1836px) scale(7.9375)"

# L-26 · the lattice that is written but unenforced
sed -n '54,64p' docs/tranches/V/ARCHITECTURE.md
ls -d demo/@ ; for g in demo/@/composables demo/@/components demo/@/lib; do
  echo -n "$g: "; find $g -type f 2>/dev/null | wc -l; done

# L-27 · demo suites in the library test tree
grep -rln '"\.\./demo/' test/
sed -n '20,32p' vitest.config.ts
```

---
---

# ADDENDUM — CHALLENGE-L fourth pass (independent)

## Model receipt (fourth pass)

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the model serving it matches; nothing inherited,
nothing defaulted.

This pass was run without reading passes 1–3 first: the component, its three composables, the
`package.json`/`tsconfig`/`vite.config` surface, `ARCHITECTURE.md`, and the visual-audit rows were
read cold and probed live, and the prior report was opened only at write time. Everything in §A
below is therefore an independent arrival at the same place, not a re-reading; everything in §B is
absent from the 27-finding record.

---

## §A — independently reproduced (no new claim)

**L-1 — the blank loupe, now reproduced in real Chromium with a real touchscreen at dpr 2.**
Passes 1 and 2 reproduced this with a *synthetic* `pointerType:"touch"` PointerEvent at `dpr: 1`,
and with a jsdom mechanism isolation. I drove headless Chromium (Playwright 1.60,
`deviceScaleFactor: 2`, `hasTouch: true`) against the live dev server, uploaded a real PNG through
the drop zone's file input, opened the eyedropper, and used **`page.touchscreen.tap()`** — a trusted
event from the browser's own input pipeline, not a `dispatchEvent`. Same harness, second run, with
`hasTouch: false` and `mouse.move` + `mouse.click`:

```
TOUCH-TAP:         {"loupeMounted":true,"loupeBackingStore":"110x110","loupeCssBox":"106x106",
                    "dpr":2,"nonTransparentPixels":0}
MOUSE-HOVER+CLICK: {"loupeMounted":true,"loupeBackingStore":"110x110","loupeCssBox":"106x106",
                    "dpr":2,"nonTransparentPixels":9683}
```

0 of 12 100 on trusted touch; 9 683 on the mouse path that has a hover stream to mask it. The
finding survives the strongest reproduction available short of a device. The cure passes 1 and 2
name (delete the split — permanent mount, visibility by `opacity`; a `nextTick` is the patch) is the
right one and I arrived at it independently.

**L-2 / L-3 / L-24 — the loupe geometry.** Confirmed identically and by measurement:
`loupeBackingStore: "110x110"` vs `loupeCssBox: "106x106"` at `dpr: 2`. The 106 is
`110 − 2×2px` border under Tailwind preflight `box-sizing: border-box`. `useLoupeCanvas.ts:33-51`
constructs an exact integer grid (`LOUPE_PIXELS = 11` source px → 110 backing px = 10 px per source
px, `imageSmoothingEnabled = false` at `:40`) and the last hop — 110 backing → 106 CSS → 212 device
— destroys it. Also confirmed: `LOUPE_SIZE` (`constants.ts:8`) drives the CSS box
(`ImageEyedropper.vue:191-196`) while the backing store is the literal `width="110" height="110"`
(`:85`) — one constant, two truths.

**L-5 — the triple decode. Pass 1's byte counts were explicitly flagged "derived …, not measured
on-device." They are now measured, and one of them changes the cure.** P3: a 3000×2000 PNG
(1 579 354 B on disk) uploaded through the real drop zone, live Chromium, dpr 2:

```
{"dpr":2,
 "canvases":[
   {"cls":"atmosphere-canvas …","backing":"300x150","bytes":180000,"css":"1280x900"},
   {"cls":"origin-top-left will-change-transform ey…","backing":"3000x2000",
    "bytes":24000000,"css":"508x339"}],
 "dataUrlChars":2105830}
```

- `previewDataUrl` = **2 105 830 chars** for a 1 579 354 B file → ratio **1.333**. Pass 1 predicted
  4/3 analytically; confirmed to three digits.
- The **visible** eyedropper canvas = **24 000 000 B of backing store to paint a 508×339 CSS box**.
  At dpr 2 that box is 1 016×678 device px = 2 755 392 B of addressable pixels. That is an
  **8.71× over-allocation against the device pixels it can actually show**, and 17.4× against the
  CSS box — *per canvas*, and there are two at native size (`useImageSampler.ts:80-82` offscreen,
  `:88-91` visible).

This sharpens pass 1's cure rather than replacing it. Pass 1 says "drop the visible canvas in favour
of an `<img>` under the same transform." Correct, and the measurement says why it is not cosmetic:
nothing reads a pixel from the visible canvas — `sampleAt` (`:116`) and `drawLoupe`
(`useLoupeCanvas.ts:41`) both read the *offscreen* twin — so those 24 MB buy exactly nothing that
`<img>` does not give for free with the browser's own tiled decode.

**L-8 (`DisplayColorSpace` ×4), L-9 (byte→string→parser round-trip), L-13 (dead camera arm),
L-11 (the capture-phase reach-around), L-21 (the `tsconfig.demo.json` paths drift), L-20
(`formatInColorSpace` public only for a test)** — all four reproduced independently, same file:line,
same conclusions. Two numeric additions worth banking:

- **L-9, measured.** 200 000 iterations against `dist/subpaths/{css,color}.js`, comparing the
  shipped path (bytes → hex string → `parseCssColor` → `convertColor` → `serializeCssColor`) against
  the direct path (`rgb()` → `convertColor` → `serializeCssColor`):
  `4.442 µs/op` vs `3.734 µs/op` — a **0.708 µs/op, 1.19× parser tax**. Honest scale: on the default
  `colorSpace = "hex"` path the parser is never reached (`useImageSampler.ts:57`), so the runtime
  cost is genuinely minor and the finding stands on the *ownership* argument, not the clock. I record
  the number so no later pass has to guess at it or inflate it.
- **L-21, the drift is already live.** `node_modules/@mkbabb/value.js@4.0.0` is present — hoisted
  from `node_modules/@mkbabb/glass-ui/package.json:543` (`"@mkbabb/value.js": "^4.0.0"`) — and its
  declarations have **already diverged from the working tree**:
  `diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` → **41 diff
  lines** (382 vs 350 lines); `color.d.ts` → identical. So `/color`, which *has* a `paths` entry, is
  pinned to the working tree, while `/css` — this component's import, which has none — resolves
  correctly only because the repo self-matches its own `exports`. The second copy that would win if
  that walk ever lost is measurably not the same file.

---

## §B — findings absent from passes 1–3

### L-28 · MAJOR — `--hover-color` is a per-instance override of `DockControl`'s hover register, and it has **two** live consumers in areas that cannot import each other

This contradicts a clean bill. Pass 1's L-16 certifies *"Materials (edict 5): `glass-floating
rounded-panel` matches DESIGN.md § Surfaces rung 3 … **No violation**."* That is true of the
overlay's *surface*. It is not true of the control chrome sitting on it.

`ImageEyedropper.vue:10` injects a custom property by **inline style on the top bar**:

```html
<div class="flex items-center gap-2 px-3 py-2 shrink-0" :style="{ '--hover-color': sampledColor ?? '' }">
```

and `:279-282` reaches into the producer component's rendered subtree to repaint it:

```css
.eyedropper-action-btn:hover:not(:disabled) svg {
    color: var(--hover-color, var(--foreground));
    transform: scale(1.2);
}
```

`DockControl`'s own published declaration
(`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`, header) states it already
owns *"glass hover, interruptible spring press, pointer-anchored specular gleam"*. The demo rule
fights that register from outside the component, through a descendant selector on a class the
producer does not know about. Edict 5 (style at the glass root, never per-instance) — violated.

It is not a one-off, and that is what makes it structural rather than cosmetic:

```
$ grep -rn -- "--hover-color" demo/
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:10    :style="{ '--hover-color': sampledColor ?? '' }"
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:280   color: var(--hover-color, var(--foreground));
demo/shell/dock/ActionButton.vue:30                                :style="{ …, '--hover-color': cssColorOpaque ?? 'currentColor' }"
demo/shell/dock/ActionButton.vue:119                               stroke: var(--hover-color);
```

**Two live consumers**, and they have already diverged — `stroke` in `shell/`, `color` in
`workbenches/`. They live in two areas that cannot import each other:
`ARCHITECTURE.md:50-56` gives `feature → color-session / own descendants / platform / shared /
published packages` with **no `shell` edge**. So there is no legal demo-side home for the shared
idiom at all; the only legal home is the producer. `ARCHITECTURE.md:58`: *"When two live consumers
need another semantic object, it is promoted once; superficial similarity does not earn a shared
home."* Two consumers exist and the similarity is not superficial — it is the same intent
(tint the dock control's icon with the live specimen color on hover) implemented twice.

**Cure.** glass-ui `DockControl` gains a first-class icon-tint token — `--dock-control-icon-hover`,
or a `tint?: string` prop — resolved inside the same hover register that already owns the gleam and
the press spring, at the producer's root. Both demo `:style` injections and both demo CSS rules
delete. This joins the second pass's §D list of fixes whose correct home is **glass-ui, not demo**,
and per the standing BH/BI relay invariant it goes to the active glass-ui inbox as a component-level
change request — it must not be hand-rolled in `demo/` a third time.

### L-29 · MINOR — a non-modal overlay claims a `window`-level Escape

`ImageEyedropper.vue:237-245` binds on `window`:

```ts
onMounted(() => { loadAndFit(); window.addEventListener("keydown", onKeyDown); });
onBeforeUnmount(() => { window.removeEventListener("keydown", onKeyDown); sampler.dispose(); });
```

and `onKeyDown` (`:226-235`) swallows `Escape`. But the overlay is `absolute inset-0` on the
*workbench root only* (`:8`) — it is not modal. My P3 screenshot shows the dock, the Login control,
and the entire `My Palettes` pane fully visible and interactive beside it; there is no focus trap,
no `inert` on the rest of the page, and no `role="dialog"`. A surface that does not own the page's
modality should not own the page's Escape key: any other Escape-consuming surface open at the same
time reacts simultaneously, and the winner is registration order.

The listener is correctly removed on unmount, so this is not a leak — it is a scope defect.

**Cure.** Either scope the handler to the overlay root (give the `glass-floating` div `tabindex="-1"`,
focus it on mount, bind `keydown` there — the natural home, since that element is the thing Escape
closes), or make the surface genuinely modal via `@mkbabb/glass-ui/dialog`, which is already in the
producer's export map and already owns focus trapping, `inert`, and the Escape contract. The second
is the design-system-correct answer if the eyedropper is meant to be modal; the first is correct if
it is not. What is not defensible is claiming a global key while behaving locally.

### L-30 · MINOR — `clientToViewport` is a third dead export, alongside `drawLoupe` and `loupeCanvasRef`

Passes 1–3 name the dead surface inside `useLoupeCanvas`. One more sits in the gesture composable:

```
$ grep -rn "clientToViewport" demo/ test/ e2e/
demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:377        (the export)
```

Zero consumers — it is returned (`:376-377`, with a doc comment) and never called from outside its
own module. Completing the census for this component's composable layer:

| Export | Site | Consumers outside its own file |
|---|---|---|
| `drawLoupe` | `useLoupeCanvas.ts:71` | 0 |
| `loupeCanvasRef` | `useLoupeCanvas.ts:67` | 0 |
| `clientToViewport` | `useInertiaGesture.ts:377` | 0 |
| `formatInColorSpace` | `useImageSampler.ts:136` | 1 — and it is a test (pass 2's L-20) |

Four public names on three composables, and **not one of them has a production consumer.** Delete
all four (the fourth after pass 2's L-20 cure relocates its test). Public surface that nothing
consumes is not extensibility; it is the seam through which the string-coupling in L-1 hid.

### L-31 · INFO (negative, recorded so a later seat does not get it wrong) — `useInertiaGesture` must **not** be promoted to glass-ui

`useInertiaGesture` is 379 lines of fully generic pan / pinch / wheel / inertia with **zero**
eyedropper coupling, and it already consumes two glass-ui subpaths (`/dom`, `/motion-core`). It
reads exactly like a design-system primitive that leaked into a feature, and pass 1's L-12 correctly
prescribes adopting glass-ui's `useResizeObserver` and `useDragVelocity` *inside* it. The obvious
next step — move the whole engine into glass-ui — is **wrong**, and I want that on the record before
a remediation wave takes it:

```
$ grep -rln "pointers.set\|prevPinchDist\|Math.hypot" demo/
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts    → Math.hypot at :164, a stage normal
demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts
demo/palettes/BrowsePane.vue                                       → Math.hypot at :347, an OKLab distance
```

Neither other hit is a gesture engine. **One live consumer.** `ARCHITECTURE.md:58`: *"superficial
similarity does not earn a shared home."* Its current component-local home is correct; promote it
when and only when a second consumer appears. Likewise, the two `composables/` directories in this
feature (`extract/composables/` feature-scoped, `extract/ImageEyedropper/composables/`
component-scoped) are not a defect — that is exactly the "own descendants" shape `ARCHITECTURE.md:52`
describes.

---

## §C — fourth-pass verdict

**DEFECTIVE**, unchanged in kind, and the ranking of passes 1–3 stands: **L-1** remains the strongest
user-visible defect and **L-21** the strongest structural one. This pass adds nothing that displaces
either.

What it adds is threefold. First, **L-1 is now reproduced through the browser's real input
pipeline** — trusted `touchscreen.tap()`, real Chromium, dpr 2, against the live server — so the
blank loupe can no longer be argued away as a synthetic-event artefact. Second, **pass 1's L-5 byte
counts are now measured rather than derived**, and the measurement adds a ratio the analytic estimate
did not surface: the visible canvas is an 8.71× over-allocation against the device pixels it can
show, and nothing ever reads a pixel from it — which turns "drop it for an `<img>`" from a
tidiness suggestion into the removal of 24 MB that buys nothing. Third, **L-28 withdraws part of a
clean bill**: pass 1's L-16 certified edict 5 with "No violation," and that certification covered the
overlay's surface but not its control chrome, where a per-instance override of `DockControl`'s hover
register is live in **two** demo areas that cannot import each other — the exact
two-consumer condition under which `ARCHITECTURE.md:58` requires a producer-side promotion.

Passes 2 and 3 both closed by noting that the correct home for several fixes is **not the demo**.
L-28 is the clearest instance yet: there is no legal demo-side home for it. It belongs in glass-ui,
and it belongs in the glass-ui inbox.

**Cumulative count across four passes: 31 findings** — L-1..L-16 (pass 1), L-17..L-20 (pass 2),
L-21..L-27 (pass 3), L-28..L-31 (pass 4).

No source edits were made by this pass. It wrote to exactly one path, this file.

---

## Appendix — fourth-pass reproductions

All probes ran against the live dev server at `http://localhost:9000`, repo HEAD `c654824e`.
Scripts are throwaway and live in this session's scratchpad, not in the repo.

```bash
# L-1 / L-2 / L-5 · live Chromium, real touchscreen vs mouse (Playwright 1.60, dpr 2)
#   ctx = browser.newContext({ viewport:{width:1280,height:900}, hasTouch:<t>, deviceScaleFactor:2 })
#   goto /#/extract → input[type=file].setInputFiles(probe.png) → click the data: preview <img>
#   touch run : page.touchscreen.tap(cx, cy)
#   mouse run : page.mouse.move(cx,cy); page.mouse.click(cx,cy)
#   read back : loupeCanvas.getContext("2d").getImageData(...) → count alpha !== 0
#
#   TOUCH-TAP:         nonTransparentPixels 0     backing 110x110  css 106x106  dpr 2
#   MOUSE-HOVER+CLICK: nonTransparentPixels 9683  backing 110x110  css 106x106  dpr 2

# L-5 · measured allocations, 3000x2000 PNG (1 579 354 B on disk)
#   eyedropper visible canvas : backing 3000x2000 = 24 000 000 B, css box 508x339
#   device px it can show     : 1016x678 = 2 755 392 B   → 8.71x over-allocation
#   previewDataUrl            : 2 105 830 chars          → 1.333x the file (4/3 confirmed)

# L-9 · parser tax, 200 000 iterations against the built dist
node --input-type=module -e "
import { parseCssColor, serializeCssColor } from './dist/subpaths/css.js';
import { rgb, convertColor } from './dist/subpaths/color.js';  … "
#   hex-roundtrip path: 4.442 us/op
#   direct rgb() path : 3.734 us/op
#   parser tax        : 0.708 us/op = 1.19x

# L-21 · the hoisted second copy is measurably a different file
diff dist/subpaths/css.d.ts   node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts   # 41 diff lines (382 vs 350)
diff dist/subpaths/color.d.ts node_modules/@mkbabb/value.js/dist/subpaths/color.d.ts # identical
grep -n '"@mkbabb/value.js"' node_modules/@mkbabb/glass-ui/package.json              # :543  "^4.0.0"  (the hoist source)

# L-28 · the two-consumer per-instance override
grep -rn -- "--hover-color" demo/
#   ImageEyedropper.vue:10,280           color:  var(--hover-color, …)
#   demo/shell/dock/ActionButton.vue:30,119   stroke: var(--hover-color)
sed -n '1,12p' node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts   # the owned hover register
sed -n '50,58p' docs/tranches/V/ARCHITECTURE.md                                          # no feature → shell edge; the promotion rule

# L-30 · the dead-export census
for s in drawLoupe loupeCanvasRef clientToViewport formatInColorSpace; do
  echo "== $s"; grep -rn "$s" demo/ test/ e2e/; done

# L-31 · the negative — one live gesture consumer, so no promotion
grep -rln "pointers.set\|prevPinchDist\|Math.hypot" demo/
```
