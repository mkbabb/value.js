# CHALLENGE-C — `demo/workbenches/extract/ExtractWorkbench.vue` — implementation (r2)

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the tier this seat
was spawned with an explicit declaration for. Declared, matched, not inherited.

- **Axis:** implementation (premise: the component is improperly implemented)
- **Subject:** `/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ExtractWorkbench.vue` (293 lines)
- **Blast radius read in full:** `composables/useExtractSession.ts` (223), `composables/useImageQuantize.ts` (161),
  `quantize-worker.ts` (44), `ImageDropZone.vue` (113), `ExtractControls.vue` (151), `ExtractPane.vue` (37),
  `ImageEyedropper/ImageEyedropper.vue` (298), `src/quantize.ts`, `demo/palettes/usePaletteStore.ts`,
  `e2e/smoke/walk.spec.ts`, `e2e/smoke/oracles/o9-shadow-palette.spec.ts`, `e2e/smoke/fixtures/env-noise.ts`,
  `test/v4-quantize.test.ts`, `docs/.../visual/capture.mjs`
- **Repo state:** branch `tranche-u`, HEAD `7775473b` at execution (the brief pinned `c654824e`; the tree
  has advanced — all intervening commits are `docs(...)`, none touch `demo/workbenches/extract/**`)
- **Pass:** r2. A pass-1 report (2026-07-27, HEAD `7cae8bd0`) existed at this path; it is preserved
  verbatim at `challenge-C-implementation.pass1-2026-07-27.md` and is **superseded, not discarded** —
  its 21 findings are carried below with their original ids and an explicit verification status.

**Verdict: DEFECTIVE.** 28 findings, 2 BLOCKER, 11 MAJOR. This pass adds **7 new findings** and issues
**2 corrections** against pass-1 (one of which overturns a pass-1 *negative* result — a class of image
this component reports as "no image was ever fed").

---

## What r2 did

Not a re-read. Every claim below is either (a) independently re-measured against the live dev server
or the library, or (b) explicitly marked as carried from pass-1 with the basis stated.

Probes run this pass (headless Chromium, Playwright, read-only against the repo; scripts in the
session scratchpad):

| probe | establishes |
|---|---|
| `probe-extract.mjs` | CDP `Accessibility.getFullAXTree` accnames · live-region census · **C-5 re-repro** |
| `probe-extract-2.mjs` | decode/`getImageData` instrumentation · focusability · **C-2 re-repro** · per-k-step cost |
| `probe-extract-3.mjs` | worker traffic, happy path (small image) |
| `probe-extract-4.mjs` | worker timeline, 3000×2000 (happy path, 502 ms end-to-end) |
| `probe-extract-5.mjs` | **C-22 repro** — result column wedged on the skeleton, DOM outline |
| `probe-slider.mjs` | computed styles of the k rail / kC track / range (**C-23**) |
| `tie.ts` (`npx tsx`) | **C-8 re-derivation** against `src/quantize.ts` directly |

```
$ git log --oneline -1
7775473b docs(V·megatranche): STATE — excavation folded COMPLETE (15/15 on disk), r3 delta row added
```

### Verification ledger against pass-1

| pass-1 id | r2 status |
|---|---|
| C-1 preview≠palette desync | **CARRIED — re-verification ATTEMPTED, BLOCKED.** Two probe runs failed at `waitForSelector("main input[type=file]")` after 60 s; the dev server was under concurrent load from sibling seats (a `networkidle` goto also timed out at 30 s in the same window). Pass-1's pasted JSON stands unchallenged; the mechanism (`useExtractSession.ts:164-168`, an `await` between the `lastFile` write and the `runQuantize` read) is plain in source. |
| C-2 camera leak | **RE-REPRODUCED INDEPENDENTLY** (different method: real `getUserMedia` behind a latency wrapper, not a stubbed stream). Output pasted below. |
| C-5 malformed image | **RE-REPRODUCED**, and extended — see C-25 (a *second*, unguarded intake path). |
| C-6 keyboard-unreachable eyedropper | **RE-MEASURED** (focusable-set enumeration). Extended (dead label branch) + **CORRECTION-B** on the stated mechanism. |
| C-7 memory/bandwidth | **RE-MEASURED** at a different granularity: cost *per k-slider step*, not just per load. |
| C-8 dominance ≠ first swatch | **RE-DERIVED** from `src/quantize.ts` directly via `npx tsx`. Output pasted. |
| C-9 vacuous gate | **RE-CONFIRMED** by grep; sharpened (the e2e fixture already listens on `pageerror`). |
| C-10 no live region | **RE-MEASURED** (`aria-live` 0, `aria-busy` 0). **CORRECTED in part** — see C-22. |
| C-11 names/tap targets | **RE-MEASURED**; **CORRECTION-A** on "nameless". |
| C-12b/c dead paths | **RE-CONFIRMED** by grep; C-12c extended into C-23 with computed styles. |
| C-13, C-14, C-15, C-17, C-18, C-19, C-20, C-21 | **CARRIED — confirmed by source inspection** this pass; C-13 and C-20 extended. |
| C-3, C-4, C-12a, C-16 | **CARRIED** on pass-1's evidence; not re-run (camera double-open, viewfinder close, dead `split` layout, no-op click). Each is a direct source read I re-walked and agree with. |

---

# NEW FINDINGS (r2)

## C-22 · MAJOR · NEW · `isProcessing` is a latch — no timeout, no cancellation, no way out (and it *corrects* C-10)

`isProcessing` is set `true` at `useImageQuantize.ts:87` and cleared **only** by a worker reply
(`:65`) or `onerror` (`:71`). There is no timeout, no abort, no request identity. If a reply is slow
or never comes, the result plate sits on `PaletteCardSkeleton` indefinitely — and every other control
that could rescue the user is unaffected, because the `disabled` prop reaches only Reset (C-13ext).

**Reproduced (probe 5).** 4 s after a *successful* decode of a 3000×2000 PNG — one decode, zero
unhandled rejections, zero page errors — the result column is:

```
=== decodes (should be exactly 1 for the load) === [ { "ms": 23.2, "w": 3000, "h": 2000 } ]
=== unhandled === []          === errors === []
=== result column DOM ===
"colText": "5 kC 0.5"
div.skeleton-ink-register.rounded-card.border.border-card-edge
  div.flex.h-10.w-full
    div.skeleton.h-full.rounded-none  ×5
  div.px-3.pb-3.flex.flex-wrap
    div.skeleton.w-12.h-12.sm:w-14    ×5
```

**Correction to pass-1 C-10.** C-10 asserts `"skeletonAppearedAtMs": "NEVER"` and concludes the
`Transition mode="out-in"` branch "does not render". That is true only on the *fast* path. It renders
whenever the worker loses the race — and then nothing takes it away. The accurate statement is:
**the skeleton's visibility is a race with no resolution in either direction** — invisible when the
worker is fast (C-10's measurement), permanent when it is slow (this measurement). Both halves are
the same missing mechanism: no state machine, only two booleans and a transition.

Honesty about the trigger: the dev server was contended during this run, so the worker's *module
fetch* was slow (the identical load completes in **502 ms** warm — probe 4 timeline: `post` at
t=437 ms carrying 24,000,000 bytes, `worker-message result n=5` at t=502 ms). The environment caused
the delay; the **defect** is that a delay of any origin has no recovery path — no timeout, no retry
affordance, no error, no cancel.

**Cure.** An in-flight record `{id, startedAt}` with `isProcessing = computed(() => inflight !== null)`,
a timeout settling the request as a typed failure (`quantize_worker_timeout`), and worker re-creation
on a settled failure — which also fixes pass-1 C-13's dead-worker-never-replaced half.

---

## C-23 · MAJOR · NEW · Both sliders paint their range in the same ink as their track: the instrument cannot show its value

Pass-1's C-12c found that `kSliderGradient`'s `"var(--muted)"` fallback never renders. That is the
smaller half. The measured cause and its consequence:

`ExtractControls.vue:22` sets a shorthand and one of its own longhands in a single style object:

```
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

Computed result on the live page (probe 6, `[data-o18="extract-k-rail"]`, at rest):

```
"kRailStyleAttr": "background-image: ; background-position-x: ; background-size: ; … background-color: oklch(0.545406 0.21813 9.83402); box-shadow: … inset;"
"kRail":          { "bg": "oklch(0.545406 0.21813 9.83402)", "bgImg": "none", "w": 434, "h": 24 }
```

The shorthand expanded to **empty** longhands; the longhand won. So the 434 px rail is one solid slab
of the certified accent at every value of k, with no fill/empty distinction at all. The kC slider has
the mirror defect — a transparent range over a track painted the same ink:

```
"kcTrack": { "cls": "slider-track",                   "bg": "oklch(0.545406 0.21813 9.83402)", "w": 230 }
"kcRange": { "cls": "slider-range glass-liquid-fill", "bg": "rgba(0, 0, 0, 0)",                "w":  77 }
```

Confirmed visually in the two Safari captures I read —
`shots/safari-desktop-light/extract.png` and `shots/safari-mobile-dark/extract.png`: both sliders
render as a full-width solid bar with a hairline thumb, so **k=5 of 16 looks like maximum**. On the
route whose only two primary controls these are, and whose thumbs are 12 px wide (C-11), the value is
communicated by a 12 px marker and nothing else.

The O-18 graphics leg (`e2e/smoke/oracles/o18-contrast-census.spec.ts:1080-1134`) certifies
*track vs ground*. Nothing certifies *range vs track*. That is why a slider with an invisible fill
passes its own contrast gate.

**Cure.** One longhand pair (`backgroundImage: gradient` + `backgroundColor: trackInk`), and a range
material that is a certified step off the track — resolved at the glass-ui `Slider` root, not with a
per-instance `--slider-track-bg` pin (edict 5).

---

## C-24 · MAJOR · NEW · A *successful* extraction can render as "no image was ever fed" — and this overturns a pass-1 negative

`src/quantize.ts:57` skips every pixel with `alpha < 10`; when none survive, `quantizePixels` returns
`{ ok: true, value: [] }` — intended, and asserted as such in `test/v4-quantize.test.ts:53-59`.
`useExtractSession.ts:75-77` then maps `length === 0 → null`, which drops the plate into the `v-else`
ghost branch (`ExtractWorkbench.vue:158-167`).

**Measured (probe 2)** with a fully transparent 64×64 PNG:

```
=== fully transparent PNG (quantizer returns ok:[] ) ===
{ "bodyText": "Extract Pull palettes from any image. SAMPLE 6 kC 0.5 My Palettes …", "unhandled": [] }
```

No error, no card, and the pane reverts to its pre-image copy — *"· undeveloped plate — feed it an
image ·"* — while the drop zone (note the `SAMPLE` corner tag in the same text) is displaying the
image the user just supplied. The user fed the instrument something real and the instrument replies
that it received nothing.

**This is a correction.** Pass-1's negative-results section records: *"Empty palette / zero-alpha
image — `src/quantize.ts:65` returns `{ ok: true, value: [] }`; `extractedPalette` maps empty → `null`
→ the shadow branch. **Correct.**"* The data flow is correct; the *presentation* is not. `null`
(nothing supplied) and `[]` (supplied, yielded nothing) are different facts and the plate has only one
state for both. Real inputs land here: a transparent PNG, an all-alpha-0 sprite sheet, a screenshot
region exported with transparency.

**Cure.** Carry the distinction to the plate: `extractedPalette` keeps `[]` as `[]`, and the result
branch gains a third register ("no opaque pixels in this image") — the plate's own species grammar
already separates *error* from *empty*; this is the missing third case.

---

## C-25 · MINOR · NEW · The drop zone's two intake paths disagree, so a text file can be installed as the specimen

`ImageDropZone.vue` validates on one path and not the other:

- `:94-100` `onDrop` — `if (file?.type.startsWith("image/")) emit("file", file)`
- `:87-92` `onFileSelected` — emits **whatever the picker returns**, unconditionally. `accept="image/*"`
  (`:30`) is a filter hint the user can defeat in every OS file dialog.

Measured (probe 1), a `text/plain` file through the picker path:

```
{ "unhandled": [ "The source image could not be decoded." ],
  "bodyText": "… SAMPLE 5 kC 0.5 · UNDEVELOPED PLATE — FEED IT AN IMAGE · …",
  "imgSrcPrefix": "data:text/plain;base64,dGhpcyBpcyBub3QgY" }
```

`<img alt="Uploaded image" src="data:text/plain;base64,…">` — a text file installed as the photographic
specimen, because `previewDataUrl` is written before anything validates
(`useExtractSession.ts:164-168`). This is pass-1's C-5 with a second door into it: C-5's repro used a
correctly-typed corrupt `.png` (I re-reproduced that too — same `InvalidStateError`, second entry in
the same run), so **both** intake paths reach the crash, and the unguarded one also poisons the preview
with a non-image MIME type.

**Cure.** One `acceptFile(file): Result<File, IntakeIssue>` used by both handlers; the preview write
moves onto the ok branch of the decode, not ahead of it.

---

## C-26 · MINOR · NEW · Raw error codes are the user-facing copy

`quantize-worker.ts:27-31` posts `result.error.code` verbatim; `ExtractWorkbench.vue:84` renders
`{{ session.quantizeError.value }}` verbatim. The destructive line therefore reads
`quantize_invalid_dimensions`, `quantize_pixel_length_mismatch`, or `quantize_invalid_option`.
Same shape at `useExtractSession.ts:58`: `Palette color serialization failed: ${serialized.error.code}`.
The typed-issue union is the right boundary; what is missing is the message map at the presentation
edge, which is the *only* place a `code` should become prose.

---

## C-27 · MINOR · NEW · `.plate-ink` is copy-pasted five times, three of them in this family (edict 5)

```
$ grep -rln "^\.plate-ink" demo
demo/workbenches/extract/ExtractWorkbench.vue      (:290)
demo/workbenches/extract/ImageDropZone.vue         (:109)
demo/workbenches/extract/ExtractControls.vue       (:148)
demo/shared/ui/EmptyState.vue
demo/color-picker/ErrorBoundary.vue
```

Five identical `color: var(--ink-muted, var(--muted-foreground))` scoped rules — each carrying its own
copy of the same nine-line E1-R1 justification comment — and no shared definition anywhere in
`demo/styles/`. Owner edict 5 puts styling at the root, not per instance; a token this well-reasoned
(it is floor-clamped against the live resting plate) is exactly the kind that must exist once.

---

## C-28 · MINOR · NEW · Reset is disabled at rest, so a k moved before any image can never be restored

`ExtractControls.vue:84` — `:disabled="disabled || !hasImage"`. Measured at rest:

```
=== Reset control at rest (no image) ===  { "found": true, "disabled": true, "ariaDisabled": "true" }
```

But k **is** live before any image exists — a certified behaviour, asserted by
`o9-shadow-palette.spec.ts:148-159` (the ghost re-segments under the k slider) and stated in the
component's own comment (`ExtractWorkbench.vue:91-93`, *"k is legible before any image exists"*).
So: drag k to 16 on a fresh pane, and the only control named for restoring it is disabled. The gate
is on `hasImage`; the state it would reset is not.

This is the other half of pass-1's C-20 (which covers "Reset does not clear the image"). Together:
the control refuses to touch what its name implies and is refused permission to touch what it does.

---

# CORRECTIONS to pass-1

## CORRECTION-A — to C-11: the three buttons are *weakly* named, not nameless

Pass-1 states `DockControl` "forwards no `aria-label`" and reports 3 nameless buttons. The count is
real (`REPORT.md:98,105,110,112` — `/#/extract: 3` in all four matrices, the highest of any route),
but "nameless" is the audit probe's rule, not the platform's. `capture.mjs:102-105` counts a button as
nameless when it lacks `aria-label` / `aria-labelledby` / text content — it does not consult `title`.

Measured against the real accessibility tree (CDP `Accessibility.getFullAXTree`, probe 1):

```
{ "role": "button", "name": "Upload image", "src": [ "attribute=Upload image" ] }
{ "role": "button", "name": "Open camera",  "src": [ "attribute=Open camera"  ] }
{ "role": "button", "name": "Reset",        "src": [ "attribute=Reset"        ] }
```

They **have** computed names, sourced from `title` — the last-resort accname source. So the accurate
finding is sharper than pass-1's and more useful for the cure: *the four DockControls this component
owns (Upload `ExtractControls.vue:41`, Camera `:50`, Reset `:86`, Capture `ExtractWorkbench.vue:52`)
name themselves through the weakest available mechanism — invisible to touch, unreliable in VoiceOver
— and the repo's two gates disagree about it*: `walk.spec.ts:79-82`
(`getByRole("button", { name: /Upload image/i })`) passes because Playwright resolves `title`, while
the visual audit flags the same buttons. A defect that one gate certifies and another condemns will
not be fixed by either.

The tap-target half of C-11 re-measures exactly as pass-1 reported — independently confirmed live:

```
"thumbs": [ { "label": "Number of colors", "w": 12, "h": 24, "value": "5" },
            { "label": "Chroma weight",    "w": 12, "h": 24, "value": "0.5" } ]
```

12 px against WCAG 2.5.8's 24 × 24 minimum, on both primary controls, in Chromium and in all four
Safari matrices (`REPORT.json`, `/#/extract`, `a11y.smallTapTargets`).

## CORRECTION-B — to C-6: the `@keydown.enter.space` chain is **correct**; do not "fix" it

Pass-1 says the zone's keydown handler "no-ops". It does — but because of `!disableClick &&`
(`ImageDropZone.vue:22`), *not* because of the modifier chain. The chain is a known Vue-2 trap and it
does not apply here. Compiled and runtime-checked this pass:

```
$ node -e "…@vue/compiler-dom.compile('<div @keydown.enter.space.prevent=\"go()\">')"
onKeydown: _withKeys(_withModifiers($event => (go()), ["prevent"]), ["enter","space"])

node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js:1811
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) { return fn(event); }
```

`.some` is an OR, and `keyNames.space === " "`, so Enter **and** Space both activate. Recorded so a
future seat does not spend the fix budget here.

---

# CARRIED FINDINGS — re-verified this pass

## C-2 (BLOCKER) · Camera hardware stays live after unmount — **re-reproduced by a different method**

Pass-1 stubbed `getUserMedia` to control timing. I used the **real** `getUserMedia` (Chromium fake
device) behind a 1.5 s latency wrapper — a permission prompt a human actually reads — clicked
**Open camera**, and left the view 200 ms later:

```
=== camera race — stream state after leaving the view mid-prompt ===
{ "streams": [ [ { "kind": "video", "readyState": "live", "enabled": true } ] ], "route": "#/palettes" }
```

`readyState: "live"` on a route that no longer renders a viewfinder. Mechanism unchanged from pass-1
(`ExtractWorkbench.vue:239-255` assigns `cameraStream` *after* the await; `:257-263` can only stop what
was assigned; `:281` is the only teardown). Note the second door into the same leak, which pass-1 did
not name: `onFile` calls `stopCamera()` at `:235` — if a file is dropped while the prompt is open,
`cameraStream` is still `null`, the stop is a no-op, and the arriving stream is orphaned with
`cameraActive` already `false`, so the `if (videoRef.value)` guard at `:250` silently discards it.

## C-5 (MAJOR) · Malformed image ⇒ unhandled rejection, silence — **re-reproduced, both intake paths**

```
=== page errors ===
[ "InvalidStateError: The source image could not be decoded.",
  "InvalidStateError: The source image could not be decoded." ]
```

One from the picker path (a `text/plain` file, C-25), one from the *type-guarded* drop path (a file
correctly typed `image/png` with corrupt bytes). In both, `session.quantizeError` stays `null`,
`isProcessing` stays `false`, and the plate reads *"· UNDEVELOPED PLATE — FEED IT AN IMAGE ·"*. The
chain is unchanged: `ExtractWorkbench.vue:234-237` (an `async` handler whose rejection is nobody's) →
`useExtractSession.ts:153-157` (promise discarded, no `.catch`) → `useImageQuantize.ts:105-108 → :18-26`
(`createImageBitmap` unguarded).

Rider (hypothesis, not measured): iPhone photos are HEIC and Chromium/Firefox do not decode HEIC, so
the component's headline promise — *"Pull palettes from any image"* — takes this exact silent path
for the most common image a user owns, in every non-Safari browser.

## C-6 (MAJOR) · The sampler is keyboard-unreachable — **re-measured**, plus a dead label branch

```
=== drop zone with preview loaded ===
{ "ariaLabel": "Image preview area, tap to sample colors",
  "tabindex": "-1",
  "focusableInMain": [ "Number of colors", "Upload image", "Open camera", "Chroma weight", "Reset", "input" ] }
```

The zone is absent from the focusable set and no other control opens the eyedropper, while it still
announces as a **button** named *"Image preview area, tap to sample colors"* — a named, roled control
that cannot be reached or operated.

**Extension.** `ExtractWorkbench.vue:22-23` binds `:preview` and `:disable-click` to the *same*
expression, so `preview && !disableClick` is identically false at the only call site (grep:
`ImageDropZone` is imported by `ExtractWorkbench.vue` alone). That makes the
`'Replace image, click or drop a new image'` aria-label branch (`ImageDropZone.vue:20`) and the
`'replace'` corner tag (`:61`) unreachable copy — dead code in the accessibility layer, which is the
worst place to keep it: it describes a capability the component does not have.

## C-7 (MAJOR) · Decode cost — **re-measured per k-step, which is the worse number**

Pass-1 measured the per-load cost (45.8 MB allocated, 22.9 MB transferred, 99.825 % unread). The
sharper measurement is that **the whole cost repeats on every parameter change**, because nothing
caches pixels: `useExtractSession.ts:153-157` always calls `quantizeFromFile`, which always calls
`imageFileToPixels`. One ArrowRight on the k slider, 3000×2000 image already loaded:

```
=== ONE k-slider step (5 -> 6): work re-run ===
{ "decodes":      [ { "ms": 11.9, "w": 3000, "h": 2000 } ],
  "getImageData": [ { "ms": 13.4, "bytes": 24000000 } ] }
```

A full re-decode plus a 24 MB main-thread readback plus a second 24 MB copy (`useImageQuantize.ts:93`)
— for a parameter that changes nothing about the pixels, at 300 ms debounce granularity
(`useExtractSession.ts:159-162`). The worker sub-samples to ~10 000 points regardless
(`src/quantize.ts:51`; stride 24 for this image).

## C-8 (MAJOR) · The dominance readout contradicts the card's first swatch — **re-derived from the library**

`ExtractWorkbench.vue:113-117` asserts the invariant in its own comment: *"the card's first swatch IS
the dominant specimen."* `src/quantize.ts:128` orders by `b.population - a.population` (stable → ties
keep insertion order); `useExtractSession.ts:121-142` orders by strict `>` **plus a chroma tiebreak**.
Two orderings, one claim of identity. Derived directly against the library this pass:

```
$ npx tsx scratchpad/tie.ts     # quantizePixels([#ff0000, #0000ff], 2, 1, { k: 5, chromaWeight: 0.5 })
quantizePixels order (what PaletteCard renders, index 0 = first swatch):
 [0] pop=1 L=0.6280 C=0.2577 H=29.23
 [1] pop=1 L=0.4520 C=0.3132 H=264.05

useExtractSession `dominant` picks: C=0.3132 H=264.05
card's first swatch is:             C=0.2577 H=29.23
AGREE? false
```

The line above the card names blue; the first swatch of the card is red. **Cure (unchanged from
pass-1, and it is the right one):** delete the 22-line loop —
`dominant = presented.value[0] ?? null` — because `quantizePixels` already guarantees
max-population-first, which restores the stated invariant by construction.

## C-9 (MAJOR) · Vacuous gate — **re-confirmed and sharpened**

```
$ grep -rln "ExtractWorkbench\|useExtractSession\|ImageDropZone\|useImageQuantize\|quantize-worker" demo test e2e
demo/workbenches/extract/{ExtractWorkbench,ExtractPane}.vue
demo/workbenches/extract/composables/{useExtractSession,useImageQuantize}.ts
demo/palettes/usePaletteStore.ts
e2e/smoke/walk.spec.ts
```

No test file — `test/`, `demo/test/`, `e2e/` — mounts or imports any of them. All existing coverage is
rest-state: `walk.spec.ts:74-83` (heading + a button named `/Upload image/i`),
`o9-shadow-palette.spec.ts:125-165` (ghost, pulse, PRM-static, k-driven segment count), and the
`o7`/`o10d`/`o11`/`o18` census oracles.

**The mutation that keeps every gate green:** replace the body of `useExtractSession.onFile` with
`async () => {}`. No image loads, no preview, no quantize, no palette, no dominance readout; the camera
and the eyedropper both become unreachable (both are gated on `previewDataUrl`) — and every gate above
still passes, because every one of them asserts the *pre-image* state.

**Sharpening.** `setupEnvNoise` (`e2e/smoke/fixtures/env-noise.ts`) installs its filter on `console`
**and** `pageerror`, and `walk.spec.ts` asserts `expect(consoleErrors).toEqual([])`. So the walk gate
*would* have caught C-5's `InvalidStateError`. The machinery is built; nothing ever walks the path
that fires it. That is the precise definition of a vacuous gate — not missing assertions, missing
traversal.

**Cure.** `useImageQuantize.ts:35-41` already ships the seam — an injectable `workerFactory`,
documented *"tests + a Safari-worker fallback can swap a fake/pooled factory"* — with **zero** callers.
A `demo/test/extract/` vitest suite driving synthetic `File`s through `useExtractSession` (malformed,
transparent, overlapping k changes, unmount-during-quantize) needs no new infrastructure, plus one e2e
that `setInputFiles` a fixture PNG and asserts the developed card.

## C-10 (MAJOR) · No live region — **re-measured**, and see C-22 for the correction

```
=== live regions in the extract pane ===
{ "ariaLive": [], "roleStatus": [ "· empty plate ·No saved palettes yet.Add" ], "ariaBusy": 0 }
```

Zero `aria-live`, zero `aria-busy` in `<main>`; the one `role="status"` belongs to My Palettes, a
different component. The error line (`ExtractWorkbench.vue:80-85`) — which the component's own comment
calls "an explicit destructive line… its own explicit register (error ≠ empty)" (`:79`, `:100-101`) —
appears and disappears in silence.

Scoping so this does not collide with a standing ruling: `o9-shadow-palette.spec.ts:133-142` RULES
that the rest-state ghost must be `aria-hidden` and must **not** be `role="status"` ("R7 … the caption
carries the text for AT"). That ruling governs the *ghost*. It says nothing about the error line or
about `aria-busy` during processing, which are different registers by the component's own design
language.

## C-13 (MINOR) · No request token — **carried**, and the *generator* named

Unchanged mechanism (`useImageQuantize.ts:51-52, 89-98`: one `pendingResolve`/`pendingReject` pair,
overwritten per call, cleared on the first reply; `:69-75` leaves a dead worker installed after
`onerror`). Reproduction: **NONE** — hypothesis for the visible symptom; the orphaned promise and the
dead worker are unconditional in source.

**Extension pass-1 missed.** Pass-1's C-3 notes that Upload and Camera ignore `disabled`. The list is
longer, and it matters here: `ExtractWorkbench.vue:70` passes
`:disabled="session.isProcessing.value || cameraActive"`, and `ExtractControls.vue` consumes it at
**exactly one** site — `:84`, Reset. The k slider (`:24-34`), the kC slider (`:68-77`), Upload
(`:40-44`) and Camera (`:49-55`) all ignore it. The two *sliders* being live during processing is
precisely what lets a user queue the overlapping requests that C-13 mishandles: a prop named
`disabled`, bound at the call site as if it gated the control surface, gating one of five controls.

## C-14 / C-15 / C-17 / C-18 / C-19 / C-20 / C-21 · carried, confirmed by source inspection

- **C-14** `isProcessing` is set *after* the decode (`useImageQuantize.ts:87` vs `:106`) — the skeleton
  is absent during the one phase that blocks the main thread, and present only for the fast worker
  phase. The 15-line comment at `ExtractWorkbench.vue:87-101` describes the wrong interval.
- **C-15** `ExtractWorkbench.vue:252` files a camera fault into the quantizer's error ref via the
  writable computed at `useExtractSession.ts:66-73`. Deterministic consequence pass-1 did not state:
  `startCamera` never clears it, so denying the camera once and then granting it leaves the stale
  *"Camera access denied: …"* line standing **under a live viewfinder** until an unrelated extraction
  clears it (`useImageQuantize.ts:86`). Every failure mode is also labelled "denied" (`NotFoundError`,
  `NotReadableError`, insecure-context `TypeError`), and `${err}` on a non-`Error` throw renders
  `[object Object]`.
- **C-17** `ref<InstanceType<typeof ImageDropZone>>` (`:222`) beside `useTemplateRef` (`:223`) — two
  idioms, adjacent lines (edict 7).
- **C-18** `await new Promise(requestAnimationFrame)` (`:249`) — rAF as a DOM-flush primitive; it does
  not fire in a hidden or occluded tab, so backgrounding during the permission prompt strands a live
  stream with no viewfinder (compounding C-2). `await nextTick()` is the primitive this wants.
- **C-19** `canvas.getContext("2d")!` and `resolve(b!)` in `captureFrame` (`:272`, `:275`); a `null`
  blob makes `new File([null], …)` the 4 bytes `"null"`, which lands on the C-5 path. Hypothesis.
- **C-20** `onReset` (`useExtractSession.ts:180-184`) restores k and kC and nothing else — image,
  palette and a user-renamed `paletteName` all survive it. See C-28 for the other half.
- **C-21** `new Date().toISOString()` inside a computed (`useExtractSession.ts:95-96`): every recompute
  re-mints "creation" time and hands `PaletteCard` a fresh identity. (`usePaletteStore.createPalette`
  mints its own at `:83`, so these are written and immediately discarded.)

## C-1 / C-3 / C-4 / C-12 / C-16 · carried on pass-1's evidence

Re-walked in source and agreed with; not re-run this pass. C-1's re-verification was attempted and
blocked (see the ledger). C-12b re-confirmed by grep — `quantizeFromCanvas`, `quantizeFromCamera` and
`canvasToPixels` have **zero** callers, and `quantizeFromCamera` (`useImageQuantize.ts:115-146`) is a
second, divergent camera implementation living in the very module the workbench imports.

---

## Defect table (r2)

| id | sev | defect | evidence | pass |
|---|---|---|---|---|
| C-1 | BLOCKER | preview ≠ palette: the readout describes a different image | pass-1 live repro (re-verify blocked) | 1 |
| C-2 | BLOCKER | camera stays `live` after unmount | **r2 re-repro**, real `getUserMedia` | 1·2 |
| C-3 | MAJOR | second camera open orphans the first stream | pass-1 repro | 1 |
| C-4 | MAJOR | viewfinder has no close affordance | pass-1 enumeration | 1 |
| C-5 | MAJOR | malformed image ⇒ unhandled rejection, silence | **r2 re-repro** ×2 paths | 1·2 |
| C-6 | MAJOR | sampler keyboard-unreachable; dead label branch | **r2 re-measure** | 1·2 |
| C-7 | MAJOR | full re-decode + 24 MB readback **per k step** | **r2 measure** | 1·2 |
| C-8 | MAJOR | dominance readout ≠ card's first swatch | **r2 `tsx` derivation** | 1·2 |
| C-9 | MAJOR | vacuous gate — no test ever feeds an image | grep + fixture read | 1·2 |
| C-10 | MAJOR | no live region for errors or results | **r2 measure** | 1·2 |
| C-11 | MAJOR | weakest-source names ×4; 12 px thumbs ×2 | **r2 CDP accname** (CORRECTION-A) | 1·2 |
| C-12 | MAJOR | dead `split` layout, dead camera/canvas APIs, dead fallback | grep | 1 |
| **C-22** | **MAJOR** | **`isProcessing` latch: no timeout/cancel/recovery** | **r2 repro, DOM pasted** | **2** |
| **C-23** | **MAJOR** | **range == track ink: the slider cannot show its value** | **r2 computed styles + 2 shots** | **2** |
| **C-24** | **MAJOR** | **transparent image = success rendered as "no image"** | **r2 measure (overturns a pass-1 negative)** | **2** |
| C-13 | MINOR | no request token; orphaned promise; dead worker kept | source (hypothesis) | 1·2 |
| C-14 | MINOR | `isProcessing` false during the decode window | source + r2 timing | 1 |
| C-15 | MINOR | camera faults filed as quantize faults; never cleared | source | 1·2 |
| C-16 | MINOR | `@click="() => {}"` under `cursor-pointer` | `:152` | 1 |
| C-17 | MINOR | `ref` vs `useTemplateRef` on adjacent lines | `:222`/`:223` | 1 |
| C-18 | MINOR | raw rAF as a DOM wait | `:249` | 1 |
| C-19 | MINOR | `getContext("2d")!` / `resolve(b!)` | `:272`,`:275` (hypothesis) | 1 |
| C-20 | MINOR | Reset does not clear; empty state unreachable after load | `:180-184` | 1 |
| C-21 | INFO | timestamps minted inside a computed | `:95-96` | 1 |
| **C-25** | **MINOR** | **picker intake path has no type guard; text file as specimen** | **r2 repro** | **2** |
| **C-26** | **MINOR** | **raw error codes are the user-facing copy** | **source** | **2** |
| **C-27** | **MINOR** | **`.plate-ink` copy-pasted ×5 (×3 here)** | **grep** | **2** |
| **C-28** | **MINOR** | **Reset disabled at rest → k unresettable pre-image** | **r2 measure** | **2** |

---

## Negative results (r2 additions — recorded so no seat re-walks them)

Pass-1's negative list stands, **except** the zero-alpha entry, which C-24 overturns. New this pass:

- **`@keydown.enter.space` modifier chain** — correct in Vue 3 (compiler + `withKeys` source pasted at
  CORRECTION-B). This is a Vue-2 trap; it does not apply.
- **`useBreakpoint` cleanup** — `node_modules/@mkbabb/glass-ui/dist/dom.js:38-53` removes its
  `matchMedia` listener on scope dispose. No leak (the *call* is dead — C-12a — but it does not leak).
- **`verbatimModuleSyntax` (edict 8)** — every type-only import in the six files is `import type`:
  `ExtractWorkbench.vue:189`, `useExtractSession.ts:14,18`, `useImageQuantize.ts:9,10`,
  `quantize-worker.ts:7`, `ExtractPane.vue:28`. Clean.
- **Worker termination / debounce cleanup / eyedropper listener + sampler dispose** —
  `useImageQuantize.ts:148-151`, `useExtractSession.ts:194-196`, `ImageEyedropper.vue:242-245`. Clean.
- **The three named repo hazards do not apply here** — no `ValueUnit` wrapping, no `defineModel`, no
  oklch→HSV round trip in this tree. `dominant`'s chroma read (`useExtractSession.ts:130-136`) takes
  `channels[1]` of a `Color<"oklch">` (`src/quantize.ts:11-13`), which is genuinely chroma, and it
  handles `"none"`. (The *ordering* is still wrong — C-8 — but not for a channel-indexing reason.)
- **Route-level visual health** — `REPORT.json` `/#/extract`, all four Safari matrices:
  `overflowX: 0`, `pageErrors: []`, `consoleErrors: []`, `main: 1`. Clean — and note *why* the
  `pageErrors: []` is uninformative: no capture ever hands the component a file (C-9).

## Not a finding — routed to Challenge-B

Probe 3: `k = 5` requested returned **4** swatches (the quantizer's `dedupeThreshold` merges near
neighbours), while the k label kept reading 5 and the skeleton had already drawn 5 bones. The
instrument promises k and delivers ≤ k with no notation. That is a specification question, not an
implementation bug.

---

## The gestalt (r2)

Pass-1's reading is right and I would not improve on it: **every blocker is an `await` with no
identity attached to it.** `onFile` awaits a FileReader and acts on state that may have moved (C-1);
`startCamera` awaits a permission and assigns into a component that may be gone (C-2, C-3);
`runQuantize` awaits a decode and resolves a promise that may belong to someone else (C-13);
`quantizeFromFile` awaits a decode that may throw into nobody's hands (C-5). One cure — a session-owned
monotonic request token that every async continuation must still hold, invalidated by scope disposal —
kills C-1, C-2, C-3, C-13 and half of C-5.

What r2 adds is the **second** axis, which is not about `await` at all: **the component has no vocabulary
for its own outcomes.** Processing is a boolean with no timeout (C-22), so a slow reply is
indistinguishable from a hung one and neither has an exit. An empty result is indistinguishable from no
input (C-24). A camera fault is indistinguishable from a quantizer fault (C-15). A raw error code is
indistinguishable from a message (C-26). And the two controls that carry the whole parameter space paint
their value in the same ink as their ground (C-23), so even the *inputs* have no readable state.

Both axes are the same absence at different altitudes: the instrument keeps its state in loose booleans
and refs and hopes they stay coherent. The transposition is one type —
`type ExtractState = { kind: "empty" } | { kind: "decoding", id } | { kind: "quantizing", id, since } |
{ kind: "developed", palette } | { kind: "barren" } | { kind: "failed", issue }` — owned by the session,
switched on once in the template. Every finding in the MAJOR band above is a state this union has a name
for and the current code does not.
