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
