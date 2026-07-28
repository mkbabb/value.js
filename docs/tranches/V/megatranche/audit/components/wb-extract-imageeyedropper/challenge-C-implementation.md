# CHALLENGE-C — ImageEyedropper: implementation (r2 — independent replication + delta)

**Subject** `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue` (299 lines)
· `composables/useImageSampler.ts` (139) · `composables/useLoupeCanvas.ts` (75)
· `composables/useInertiaGesture.ts` (379) · `constants.ts` (11)
**Repo** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
**HEAD at this seat's run** `4f78e57b` (the task brief named `c654824e`; `git rev-parse HEAD` →
`4f78e57b823347bc879f36024b1f0f9d59f03eda`. Three docs-only commits have landed since; no file this
report cites was touched.)
**Date** 2026-07-28

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (the 1M-context variant), as
declared at spawn. The seat is declared, not inherited.

## Relationship to r1

A prior CHALLENGE-C seat produced a report at this path on 2026-07-27. It is preserved verbatim at
**`challenge-C-implementation.r1.md`** and nothing in it is retracted. This seat ran **independently
and blind** — the whole probe programme below was designed and executed against a live browser
*before* r1 was opened — and then reconciled.

That makes this document an r2 with three jobs:

1. **Replication.** Five of r1's findings (its D-1, D-2, D-4, D-5, D-6 — including both BLOCKERs)
   are reproduced here with *different fixtures, different probe construction, and a different
   interaction script*. They are no longer single-seat claims.
2. **Delta.** Four defects r1 does not carry (§N-1…N-4) and one refinement of its edict row (§N-5).
3. **Negative proof.** Five plausible hypotheses that this seat tested and **refuted** (§NEG). A
   challenge seat that only accumulates is not auditing; the refutations bound the blast radius.

**Verdict: DEFECTIVE.** Two BLOCKERs, seven MAJORs, seven MINORs, four INFO.

---

## Live-probe methodology (this seat's receipts)

Dev server `http://localhost:9000`, live Chromium via Playwright MCP, `devicePixelRatio: 2`,
viewport gave the eyedropper a 508×626 CSS-px sampling viewport (later 354×602 after a reload).
All probes were `page.evaluate` scripts — **no repo file outside this directory was written**.

Fixtures were synthesised *in-page* (`canvas.toBlob` → `File` → `DataTransfer` → a real `drop`
event on `ImageDropZone`), so no binary fixture entered the tree:

| fixture | content |
|---|---|
| `probe.png` | **16×16**, ground `#808080`, with three single-pixel landmarks: `(0,0)=#ff0000`, `(8,8)=#00ff00`, `(15,15)=#0000ff` |
| `grid.png` | 512×512, 8×8 grid of `hsl()` tiles — used for the zoom/resize probe (fit < 1, so zoom has headroom) |
| `notes.pdf` | 28 bytes of `%PDF-1.4 not an image at all`, MIME `application/pdf`, pushed through the **`<input type=file>`** path |

The 16×16 fixture is the point: at `fit = min(508/16, 626/16, maxZoom 10) = 10`, one image pixel is
a 10×10 CSS-px target, so a synthesised pointer coordinate maps to a *known* image pixel with a
5 px margin. Every colour assertion below is against a landmark, not against a screenshot.

`Element.prototype.setPointerCapture` was stubbed to a no-op for the duration of each probe
(synthesised `PointerEvent`s carry no live pointer, and `useInertiaGesture.ts:173` calls it
unconditionally); it was restored before return.

**Fit math verified first, so the coordinate frame is trustworthy:** measured
`transform: matrix(10, 0, 0, 10, 174, 233.254)` against the arithmetic
`panX = (508 − 16·10)/2 = 174`, `panY = (626.5 − 160)/2 = 233.25`. Exact.

---

# Part I — replicated defects

## C-1 · BLOCKER — the loupe paints NOTHING on first show; on touch it never paints at all

*(replicates r1 D-1, by a different measurement)*

```ts
// useLoupeCanvas.ts:55-60
function showLoupeAt(rx: number, ry: number) {
    loupeVisible.value = true;   // queues the v-if render on the microtask queue
    loupeRelX.value = rx;
    loupeRelY.value = ry;
    drawLoupe(rx, ry);           // runs NOW — the canvas element does not exist yet
}
```

`drawLoupe` early-returns on `if (!loupeCanvas || !offscreenCanvas) return` (`:30`) because the
`<canvas ref="loupeCanvasRef">` lives inside `v-if="loupe.loupeVisible.value"`
(`ImageEyedropper.vue:78-86`). Nothing else in the component calls `drawLoupe` — it is exported and
never consumed by the shell.

**Measurement — hover path (two identical hovers over the same pixel):**

| step | readout | loupe `opaquePx / 12100` | loupe centre RGBA |
|---|---|---|---|
| `hover1` @ image (8,8) | `oklch(86.643961752344% 0.294827224543 142.495345041444deg)` | **0** | `[0,0,0,0]` |
| `hover2` @ image (8,8) — *same coords* | same | **9604** | `[0,255,0,255]` ✅ |

The colour readout is correct on the first hover; the magnifier is empty. It only fills on the
**second** pointer event.

**Measurement — touch path (a single tap, no hover ever):** two separate runs, two fixtures.

```
run A (16×16 probe.png, tap on the green landmark):
  A_firstTapGreen.loupe = { present: true, backing: [110,110], opaquePx: 0, total: 12100,
                            centerRGBA: [0,0,0,0] }
run B (512×512 grid.png, tap at 45%/45%):
  touchTapLoupe = { present: true, opaquePx: 0, total: 12100 }
  readout        = "oklch(80.359228533808% 0.242599271741 145.709407560116deg)"
```

Zero opaque pixels out of 12 100, on both. And it can never recover: `onTap` sets `pinned = true`
(`ImageEyedropper.vue:161`) and `onHover` opens with `if (pinned.value) return`
(`:165`), so no further event will redraw. **On a phone — where the finger occludes the pixel and
the loupe is the only way to see what you are sampling — the magnifier is a permanently empty
circle.**

**Visual evidence — `evidence-touch-tap-blank-loupe.png`** (written beside this file; see N-4 — the
formation gitignores component PNGs, so the *numbers above* are the durable record and the image is
a convenience). The loupe is a transparent hole: the 64-px `hsl` grid tiles read at the *same* scale
inside the circle as outside it. There is no magnification, only a ring.

**Cure (gestalt, not patch).** `showLoupeAt` should not paint; it should record. Make the paint a
function of state, not a side effect of an event: a single
`watchEffect`/`watch([loupeVisible, loupeRelX, loupeRelY], …, { flush: 'post' })` inside
`useLoupeCanvas` draws whenever the position changes *after* the DOM settles. That deletes
`drawLoupe`'s exported-but-unused surface and removes the ordering hazard permanently, instead of
sprinkling `nextTick`.

---

## C-2 · BLOCKER — `justUnpinned` is a one-exit latch; a pan-while-pinned eats the next tap

*(replicates r1 D-2, by a scripted 5-gesture sequence)*

```ts
// ImageEyedropper.vue:176-185 — capture-phase interceptor
el.addEventListener("pointerdown", () => {
    if (pinned.value) { pinned.value = false; loupe.hideLoupe(); justUnpinned = true; }
}, { capture: true });

// ImageEyedropper.vue:151-155 — the ONLY place the flag is cleared
onTap(rx, ry) { if (justUnpinned) { justUnpinned = false; return; } … }
```

`onTap` fires only when `!hasMoved` (`useInertiaGesture.ts:277-281`). So: press while pinned → the
flag is set and `pinned` is already `false`; then *drag* → `onTap` never runs → **the flag survives
with nothing left to justify it**. The next clean tap is consumed clearing it.

**Reproduction (single scripted run, touch pointers, 16×16 fixture):**

| # | gesture | expected | measured readout |
|---|---|---|---|
| A | tap image (8,8) | green | `oklch(86.643…% 0.2948… 142.495…deg)` = `#00ff00` ✅ pins |
| B | press + drag +80 px + release | pan | readout unchanged; `pinned` now false, `justUnpinned` **stuck true** |
| C | clean tap | a new sample | **unchanged — the tap was swallowed** ❌ |
| D | identical tap, same coordinates | a new sample | `oklch(59.987080562215% 0 none)` = `#808080` ✅ |
| E | identical tap, same coordinates | — | unchanged (D pinned; E is the by-design unpin) |

C and D are byte-identical inputs at identical coordinates and produce different outcomes. That is
the latch.

The severity is not cosmetic: pan-then-sample is the *normal* way to use a zoomable eyedropper.
Every first tap after a pan silently does nothing, and the component gives no feedback that it
declined.

**Cure.** The unpin does not need a flag at all — it needs to live in one place. Move the pinned
state into `useInertiaGesture` (which already owns `hasMoved`/`isPanning`) and let it decide, at
`pointerup`, between *unpin*, *sample*, and *pan-end* from the gesture facts it already has. The
capture-phase side-channel and the cross-tick boolean both disappear.

---

## C-3 · MAJOR — a malformed image ⇒ two unhandled rejections + a dead, error-less overlay

*(replicates r1 D-5, through the `<input type=file>` path rather than a drop)*

`ImageDropZone` guards the **drop** path (`ImageDropZone.vue:97` `file?.type.startsWith("image/")`)
but the **file-input** path has no guard at all (`:87-92`) — `accept="image/*"` is a picker filter
the user can defeat with "All Files".

**Reproduction.** Assign a `application/pdf` `File` to the hidden input and dispatch `change`:

```json
"step1": { "previewZoneAppeared": true,
           "previewLabel": "Image preview area, tap to sample colors",
           "overlayOpen": true,
           "canvasBacking": [300, 150],
           "readout": "Tap to sample",
           "errorSurfacedToUser": false },
"rejections": ["The source image could not be decoded.", "error"]
```

Browser console (`.playwright-mcp/console-2026-07-28T13-54-12-549Z.log`):

```
[ 38906ms] The source image could not be decoded.
[ 38971ms] Event
```

Reading it out: the drop zone advertises *"Image preview area, tap to sample colors"* over a file
that is not an image; the eyedropper mounts; `canvasBacking [300,150]` is the browser's **default**
canvas size, proving `loadImage` threw before `useImageSampler.ts:88-89` ever sized it; the readout
says "Tap to sample" forever; `errorSurfacedToUser: false` — no error affordance anywhere in the
overlay. Two promise rejections escape unhandled, one of them the literal `Event` from
`img.onerror = reject` (`useImageSampler.ts:74`), because `loadAndFit()` is a floating promise at
both call sites (`ImageEyedropper.vue:238` and `:247`).

The sibling surface in the same workbench does this correctly —
`ExtractWorkbench.vue:80-85` renders an explicit `text-destructive` line for
`session.quantizeError`.

**Cure.** `loadImage` rejects with a real `Error`; the shell owns an `imageError` ref rendered in
the destructive register the workbench already owns; and `ImageDropZone.onFileSelected` applies the
same MIME guard `onDrop` already applies — one guard, both entrances.

---

## C-4 · MAJOR — zero keyboard operability, no dialog semantics, no focus management

*(replicates r1 D-4)*

Measured on the live open overlay:

| property | measured |
|---|---|
| overlay `role` | `null` |
| `aria-modal` | `null` |
| `[aria-live]` inside overlay | **0** |
| `document.activeElement` on open | **`BODY`** — focus never enters |
| focusables inside overlay (unpinned) | **1** (Close) |
| `canvas.eyedropper-canvas` | `tabIndex: -1`, `aria-hidden="true"` |
| viewport div | `tabIndex: -1`, `role: null` |
| overlay buttons | `[{title:"Close eyedropper", ariaLabel:null, text:""}]`, 40×40 CSS px |

The sampling surface is `aria-hidden` with **no keyboard alternative** — no arrow-key cursor, no
"sample centre". The Add/Apply controls are `v-if="pinned"` and `pinned` is set only from `onTap`,
i.e. only from a pointer — measured: with the overlay pinned the button set becomes
`["Close eyedropper", "Add to palette", "Apply as current color"]`, and a keyboard user can reach
that state through no path at all.

WCAG 2.1.1 Keyboard (A), 4.1.2 Name/Role/Value (A), 2.4.3 Focus Order (A) — fail.
Tap targets are fine (40×40 ≥ 24).

**Cure.** Adopt the glass-ui dialog primitive rather than hand-rolling
`absolute inset-0 z-popover flex flex-col glass-floating` (`ImageEyedropper.vue:8`) — the hand-roll
*is* the cause of the missing role/focus semantics. Bind arrow keys to the same `sampleAt` the
pointer uses, and give the readout `aria-live="polite"`.

---

## C-5 · MAJOR — the ResizeObserver refit destroys the user's zoom and pan

*(replicates r1 D-6, with a resize that leaves component state untouched)*

```ts
// useInertiaGesture.ts:354-360
resizeObserver = new ResizeObserver(() => fitToViewport());
// :164-166 — fitToViewport writes unconditionally
zoom.value = fit;
panX.value = (rect.width - cw * fit) / 2;
panY.value = (rect.height - ch * fit) / 2;
```

**Reproduction** (512×512 fixture, 12 × ctrl-wheel zoom-in, then the overlay host's height changed
by −120 px and restored — the *only* thing touched is a CSS height on a DOM ancestor, no component
API is called):

```json
"beforeZoom":     { "zoom": 0.691406, "vp": [354,602], "backing": [512,512] },
"afterWheelZoom": { "zoom": 1.39125 },
"afterResize":    { "zoom": 0.691406 },
"afterRestore":   { "zoom": 0.691406 }
```

A 2.01× inspection zoom is discarded by a viewport resize and does **not** return when the resize is
undone. On mobile Safari the URL-bar show/hide resizes the layout viewport, so this fires during
ordinary scrolling-adjacent gestures.

**Cure.** Split *fit* (once, on image load — the component already calls it exactly there,
`ImageEyedropper.vue:203, 207`) from *reflow* (preserve the zoom ratio and the image-space centre,
re-clamp the pan). A `ResizeObserver` should never be wired to an initialiser.

---

# Part II — delta (findings r1 does not carry)

## N-1 · MINOR — off-image sampling leaves a **stale readout and a parked loupe**: the instrument lies

`sampleAt` returns `null` outside the image (`useImageSampler.ts:114-115`), and both callers then
do **nothing** (`ImageEyedropper.vue:156-171` — `if (result) {…}` with no `else`). The previous
sample stays on screen as if it were live, and the loupe stays frozen at its last position showing
the *previous* pixel.

**Reproduction** (16×16 fixture, image occupies viewport x ∈ [174, 334]):

```
hover3 @ image (0,0)                   → readout oklch(62.795…% 0.2576… 29.233…deg)   [= #ff0000]
                                         loupe centreRGBA [255,0,0,255], opaquePx 2996
hover4 @ viewport (5,5)  ← OFF-IMAGE   → readout UNCHANGED (still #ff0000)
                                         loupePresent: true, centreRGBA STILL [255,0,0,255]
```

169 CSS px to the left of the image's left edge, the eyedropper still reports red and still shows a
red loupe. There is no "nothing here" state. This is the same class of defect as r1's D-3 (alpha
discarded) reached from the other side: the component has exactly one honest failure path
(`return null`) and both call sites drop it on the floor.

**Cure.** `onHover`/`onTap` must handle the `null`: hide the loupe and clear the readout to its
`'Tap to sample'` register. One `else` branch each — but better, have `sampleAt` return a
discriminated result so the `null` cannot be ignored silently by a third caller later.

---

## N-2 · MINOR — the confirmation pulse cannot re-fire inside its own window

```html
<!-- ImageEyedropper.vue:21-22 -->
:class="['shrink-0 transition-transform', swatchPulse ? 'swatch-pulse' : 'w-7 h-7']"
@animationend="swatchPulse = false"
```
```css
/* :285-289 */
.swatch-pulse { width: 1.75rem; height: 1.75rem; animation: swatch-pop 0.65s var(--ease-spring) forwards; }
```

`onAddToPalette` sets `swatchPulse.value = true` (`:215`). If it is already `true`, the class list
does not change, so **the CSS animation does not restart** — a second "Add to palette" inside the
0.65 s window emits the event but gives the user no confirmation at all. The standard cures (drop
the class + force reflow, or `:key` the node, or `animation: none` toggle) are all absent.

Two smaller truths in the same three lines: `.swatch-pulse` re-declares `1.75rem` — the exact value
`w-7 h-7` already carries in the other branch, so the size has two sources; and the branch swap
exists only because the pulse class also owns the size, which it need not.

**Reproduction.** Pin a sample, then click *Add to palette* twice within 650 ms. The first click
pops; the second is silent. (`addToPalette` still emits both times — the *feedback* is lost, not
the action.)

**Cure.** Keep `w-7 h-7` always; add/remove only `swatch-pulse`; restart with `:key="pulseSeq"` on
the dot, incremented per action. The keyframe itself stays (edict 6).

---

## N-3 · MINOR — `loadImage` resurrects a disposed sampler after unmount

```ts
// ImageEyedropper.vue:242-245
onBeforeUnmount(() => { window.removeEventListener("keydown", onKeyDown); sampler.dispose(); });
```
```ts
// useImageSampler.ts:68-95 — everything after the await runs unconditionally
await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); … });
imgWidth.value = img.naturalWidth; …
offscreenCanvas = document.createElement("canvas");     // ← re-allocated post-dispose
offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })!;
offscreenCtx.drawImage(img, 0, 0);
imageLoaded.value = true;                                // ← flipped true on a torn-down instance
```

`dispose()` (`:97-101`) nulls the handles and sets `imageLoaded = false`, but there is no
generation token and no abort, so an in-flight decode's continuation runs *after* teardown and
undoes all three. For a 12 MP photo that is a full-resolution canvas allocated for a component that
no longer exists.

**Reproduction.** Open the eyedropper on a large image and press `Escape` before the decode
finishes (`onKeyDown` → `emit('close')` → `v-if` unmount, `ImageEyedropper.vue:226-235`,
`ExtractWorkbench.vue:174-177`).

Not a *lasting* leak — the closure is unreachable once the component is gone, so GC reclaims it —
which is why this is MINOR and not MAJOR. It is the same root cause as r1's D-12 (no generation
token), seen from the teardown side rather than the re-entrancy side; one token fixes both.

---

## N-4 · INFO — image evidence in this audit is structurally unreviewable; transcribe or lose it

This finding began as "r1's screenshots live in gitignored `.playwright-mcp/`, mine are committed" —
and **this seat's own check refuted the second half**:

```
$ git check-ignore -v docs/tranches/V/megatranche/audit/components/wb-extract-imageeyedropper/evidence-touch-tap-blank-loupe.png
docs/tranches/V/megatranche/.gitignore:10:audit/components/**/*.png    …/evidence-touch-tap-blank-loupe.png
```

The formation ignores **every** PNG under `audit/components/**` by policy. So no screenshot produced
by any component seat — r1's, mine, or any sibling's — survives into the record. That is a defensible
weight decision, but it has a consequence the seats must honour: **an image is not a receipt here.**

The live risk is concrete. r1's D-7 ("the page behind bleeds through transparent pixels") rests on
*"in the transparent quadrant you can read the k-slider, the reset control, and the `DOMINANT
oklch(45.20…718…)` readout of the panel behind the overlay"* — a claim whose only evidence is
`.playwright-mcp/eyedropper-live.png`, which no reviewer can now open. The finding is almost
certainly true (the canvas is drawn with `drawImage` onto a transparent backing,
`useImageSampler.ts:84, 91`, inside a translucent `glass-floating` overlay — that is code-evident),
but its *stated* proof is unreachable. This seat did not re-derive it and does not carry it.

**Rule for the remaining seats:** every load-bearing observation must appear in the markdown as a
number, a quoted line, or pasted command output. Screenshots may illustrate; they may not testify.

---

## N-5 · INFO — refinement of the edict-4/5 row: `DockControl` exposes no accessible-name prop

r1's D-16 flags the `.eyedropper-action-btn:hover svg` descendant override as a partial edict-5
violation. Confirmed, and there is a second half to it that belongs in the glass-ui relay.

`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts` — the full prop surface is
`shape | compact | active | type | disabled | as | asChild | class`. **There is no `label`,
`ariaLabel`, or `title` prop.** So the eyedropper's three controls (`title="Close eyedropper"`,
`"Add to palette"`, `"Apply as current color"` — measured `ariaLabel: null`, `text: ""`) are named
solely by a fall-through `title` attribute, which is the *last-resort* source in the accessible-name
computation and is invisible to touch users entirely.

The consumer cannot fix this correctly on its own: adding `aria-label` at the call site is a
per-instance patch of exactly the kind edict 5 forbids. **Relay to the glass-ui BH inbox** (standing
relay edict): `DockControl` should take a required-ish `label` and stamp `aria-label`, the way the
sibling dock components in `dock.js` already do (`"aria-label": e.label ?? e.id`), and should own
the hover-tint variant that `ImageEyedropper.vue:279-282` currently reaches in to fake.

---

# Part III — negative proof (hypotheses this seat tested and refuted)

A challenge seat that only accumulates is not auditing. Five plausible defects were probed and
**did not hold**:

### NEG-1 · the loupe's edge mapping is CORRECT — no off-centre magnification at image borders

`drawLoupe` draws source rect `(ix−5, iy−5, 11, 11)` (`useLoupeCanvas.ts:41-51`), which is partly
outside the bitmap whenever the pointer is within 5 px of an edge. The obvious hypothesis — the
loupe centre stops corresponding to the sampled pixel near borders — is **wrong**, because the HTML
Standard's `drawImage` requires that when the source rectangle is not entirely within the source
image, *the source rectangle is clipped to the source image and the destination rectangle is
clipped in the same proportion*. At `ix = 0`: source clips to `(0,0,6,6)`, destination clips to
`(50,50,60,60)`, so 6 source px cover 60 dest px, and the loupe centre (55) still resolves to
source pixel 0.

**Measured, at the exact corner pixel:** `hover3_red00.loupe.centerRGBA = [255,0,0,255]` with
`opaquePx 2996/12100` (the out-of-image ~75 % correctly empty). The mapping is exact. Not a defect.

### NEG-2 · no bubbling-`animationend` hazard from `WatercolorDot`

`@animationend="swatchPulse = false"` (`ImageEyedropper.vue:22`) is a native listener on a child
component's root, so any animation *inside* `WatercolorDot` would bubble up and clear the flag
early, truncating the pop. Checked:
`grep -o "@keyframes [a-zA-Z0-9_-]*" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` → **0
matches**. No internal keyframes exist. Hypothesis refuted.

### NEG-3 · the capture-phase interceptor's ordering is safe even at AT_TARGET

The unpin listener is `{ capture: true }` on the viewport; `useInertiaGesture` binds `pointerdown`
on the *same* element in the bubble phase. Capture-before-bubble holds only when the target is a
descendant (the canvas). When the pointer is over the bare viewport, the element **is** the target,
and DOM dispatch runs both listeners in registration order regardless of the capture flag — so the
gesture handler runs first. Traced through: `onPointerDown` does `stopInertia()` + records
`lastX/lastY/hasMoved`; the interceptor only writes `pinned`/`justUnpinned`. The two do not
interact, so the outcome is order-independent. The comment at `ImageEyedropper.vue:184`
("capture: runs before composable's handler") is imprecise but the code is correct. Not a defect.

### NEG-4 · the un-coalesced hover path is cheap — measured, not a defect on its own

`onHover` runs `getImageData` + `parseCssColor` + `convertPickerColor` + `serializePickerColor` +
a loupe repaint on **every** `pointermove`, with no rAF coalescing. Measured cost:

```json
"perf": { "moves": 200, "totalMs": 4.5, "perMoveMs": 0.022 }
```

200 dispatched moves in 4.5 ms — 22 µs each, dominated by the parse/convert round trip, not by
`getImageData` (which is correctly constructed with `willReadFrequently: true`,
`useImageSampler.ts:83`). At a 120 Hz pointer that is ~0.26 % of a frame budget. Corroborates r1's
performance note: real, worth coalescing on principle, **not a defect**. Reported so the mega-tranche
does not spend a wave on it.

### NEG-5 · the CORS-tainted-canvas hazard is unreachable on the shipped wiring

`getImageData` throws `SecurityError` on a canvas tainted by a cross-origin image. Here `imageUrl`
is always `session.previewDataUrl`, which is a `FileReader.readAsDataURL` result
(`useExtractSession.ts:29-36, 166`) — a same-origin `data:` URL that cannot taint. `crossOrigin =
"anonymous"` is set anyway (`useImageSampler.ts:70`). The prop's *type* is `string`, so a future
caller could pass a remote URL and reach the hazard, but no shipped path does. Not a live defect.

**Also swept and clean:** no `defineModel` (the stale-read hazard is N/A); no `ValueUnit` wrapping
anywhere in the sampler's path; no oklch→HSV roundtrip (`stableHue` N/A); no WebGL; the inertia
coast rides glass-ui `useRAFLoop` with `pauseWhenHidden: true` and an explicit PRM decision in
`startInertia` (`useInertiaGesture.ts:114-142`) — **not** part of the PRM-RAF epidemic, and the one
exemplary part of this component. `verbatimModuleSyntax` is satisfied at every import site
(`ImageEyedropper.vue:99`, `useImageSampler.ts:11-19`, `useInertiaGesture.ts:1`).

---

# Part IV — test truth

*(replicates r1 D-14; re-verified independently at this HEAD)*

```
$ grep -rl "Eyedropper\|useImageSampler\|useInertiaGesture\|useLoupeCanvas" test/ e2e/
test/image-sampler-v4.test.ts
```

One file, 31 lines, three tests, all calling exactly one export — `formatInColorSpace` — on a
sampler built with `canvasRef: ref(null)` and an identity transform
(`test/image-sampler-v4.test.ts:8-14`). `e2e/` has **no** spec that opens the eyedropper: the
overlay requires an image upload followed by a pointer click, and `e2e/smoke/walk.spec.ts:74-76`
only asserts the Extract heading. `grep -rn -i "eyedrop" e2e/` returns one prose comment
(`oracles/o7-card-census.spec.ts:16`).

**Mutations that keep the suite green** — every defect in this report lives in unexecuted code:

| mutation | still green? | which finding it hides |
|---|---|---|
| `viewportToImage` → `{ ix: 0, iy: 0 }` | ✅ never called | all coordinate mapping |
| `sampleAt` → `return null` | ✅ never called | the entire sampling feature |
| delete the bounds check `useImageSampler.ts:114-115` | ✅ never called | N-1, OOB `getImageData` |
| delete `useLoupeCanvas.ts` | ✅ not imported by any test | C-1 |
| delete `useInertiaGesture.ts` | ✅ not imported by any test | C-2, C-5 |
| `loadImage` → `throw` on every input | ✅ never called | C-3 |
| swap `Math.floor` → `Math.round` in `viewportToImage` | ✅ never called | half-pixel sampling error |

3/3 green is a statement about `parseCssColor` + `convertPickerColor`. It says nothing about this
component.

**Also vacuous: the visual gate.** `REPORT.json` `/#/extract`, all four Safari matrices, records
`counts.canvas: 1` — the atmosphere field. The eyedropper's two canvases are absent because the
overlay never mounts without an upload. The 3 `namelessButtons` and 6 `smallTapTargets` on that
route belong to other components (the JSON names them: `input 160×23`, `button 22×22 "Switch to
slug"`, `"Generate new slug"`, `"Cancel"`, two `span 12×24` slider labels). And
`shots/zoom-200-desktop/` holds `adminusers, blob, browse, gradient, picker` — **no `extract`**.
This component contributes zero rows to the visual audit, so its clean record there is empty.

---

# Severity roll-up (r2 consolidated — r1 ids preserved)

| id | r1 id | severity | one line |
|---|---|---|---|
| C-1 | D-1 | **BLOCKER** | loupe blank on every first show; permanently blank on the touch path |
| C-2 | D-2 | **BLOCKER** | `justUnpinned` latch swallows the first tap after any pan-while-pinned |
| — | D-3 | MAJOR | alpha discarded — transparent pixels reported and emitted as opaque black |
| C-4 | D-4 | MAJOR | no role/name/live-region, no focus management, zero keyboard operability |
| C-3 | D-5 | MAJOR | malformed image → 2 unhandled rejections + dead overlay, no error UI |
| C-5 | D-6 | MAJOR | ResizeObserver refit destroys the user's zoom/pan (1.39 → 0.691, measured) |
| — | D-7 | MAJOR | transparent pixels composite the page behind — displayed ≠ sampled |
| — | D-8 | MAJOR | two full-res canvases, 48 MB force-promoted layer (~96 MB @ 12 MP) |
| — | D-9 | MINOR | DPR ignored — 110×110 backing for a 110-CSS-px box at dpr 2 (re-measured ✔) |
| — | D-10 | MINOR | 12-decimal readout, inconsistent with the library path, truncated with no `title` |
| — | D-11 | MINOR | capture-phase `pointerdown` listener never removed |
| — | D-12 | MINOR | `loadImage` re-entrancy race (reasoned) |
| — | D-13 | MINOR | wheel momentum double-counted (hypothesis) |
| **N-1** | *new* | MINOR | off-image hover keeps a stale readout + parked loupe — no "nothing here" state |
| **N-2** | *new* | MINOR | `swatch-pulse` cannot restart inside its 0.65 s window — second Add is silent |
| **N-3** | *new* | MINOR | `loadImage` resurrects a disposed sampler after unmount |
| — | D-14 | MAJOR | test gate vacuous — 7 named mutations keep 3/3 green |
| — | D-15 | INFO | visual audit never renders this component; its clean record is vacuous |
| **N-4** | *new* | INFO | ALL component PNGs are gitignored by formation policy — image evidence cannot testify (r1's D-7 proof is unreachable) |
| **N-5** | *new* | INFO | `DockControl` has no `label`/`ariaLabel` prop → glass-ui BH relay, not a call-site patch |
| — | D-16 | INFO | edict deltas: hand-rolled modal (4), `DockControl` descendant override (5) |

**Strongest defect: C-1 / D-1.** The magnifier is the entire reason this component exists rather
than a click handler on the drop zone, and it paints nothing on the path a phone user takes —
`opaquePx 0 / 12100`, replicated across two fixtures, two interaction paths, and two independent
seats. C-2 is the same class of injury to the other half of the interaction: the tap.

Both BLOCKERs share one mechanism worth naming for the tranche: **event handlers mutating reactive
state and then immediately acting on the DOM or on a hand-rolled cross-tick flag, instead of letting
derived state drive the effect.** C-1 paints before the render; C-2 latches a boolean across two
gestures. The idiomatic cure for both is the same shape — move the decision into the state that
already exists (a post-flush watcher for the loupe; the gesture composable for the tap) rather than
adding a `nextTick` and a flag reset.

---

## Provenance

- Prior seat's report preserved verbatim: `challenge-C-implementation.r1.md` (nothing retracted)
- Visual illustration (gitignored by formation policy — see N-4):
  `evidence-touch-tap-blank-loupe.png`
- Console capture cited: `.playwright-mcp/console-2026-07-28T13-54-12-549Z.log` (ignored dir —
  the two lines are transcribed inline in C-3 so the claim stands without it)
- Every probe was an ephemeral `page.evaluate`; no probe script was persisted, and every number
  either appears inline above or is re-derivable from the fixture recipes in the methodology table.
- Nothing was written outside
  `docs/tranches/V/megatranche/audit/components/wb-extract-imageeyedropper/`. No file under `src/`,
  `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`, or any
  `INBOX.md` was modified.
