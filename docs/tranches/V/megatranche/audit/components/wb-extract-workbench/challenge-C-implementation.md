# CHALLENGE-C — `demo/workbenches/extract/ExtractWorkbench.vue` — implementation (r3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
seat was spawned with an explicit Opus 5 declaration; the declaration is matched, not inherited.

- **Axis:** implementation (premise: the component is improperly implemented)
- **Subject:** `/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ExtractWorkbench.vue` (293 lines)
- **Blast radius read in full this pass:** `composables/useExtractSession.ts`, `composables/useImageQuantize.ts`,
  `quantize-worker.ts`, `ImageDropZone.vue`, `ExtractControls.vue`, `ExtractPane.vue`,
  `ImageEyedropper/ImageEyedropper.vue`, `ImageEyedropper/composables/useImageSampler.ts`,
  `src/quantize.ts`, `demo/shell/PaneSlot.vue`, `demo/shell/usePaneRouter.ts`,
  `demo/palettes/browser/card/PaletteCardSkeleton.vue`, `demo/color-session/picker-color.ts`,
  `demo/color-session/color-model.ts`, `demo/ui/slider/index.ts`, `e2e/smoke/walk.spec.ts`,
  `e2e/smoke/oracles/o9-shadow-palette.spec.ts`, `e2e/smoke/oracles/o18-contrast-census.spec.ts`,
  `docs/.../visual/REPORT.json`, `docs/.../visual/capture.mjs`
- **Repo state:** branch `tranche-u`; brief pinned HEAD `c654824e`. No commit in the interval touches
  `demo/workbenches/extract/**`.
- **Pass:** **r3.** Pass-1 (2026-07-27) and pass-2 (2026-07-28) existed at this path. Both are preserved
  verbatim at `challenge-C-implementation.pass1-2026-07-27.md` and
  `challenge-C-implementation.pass2-2026-07-28.md` and are **superseded, not discarded**.
- **Probe artefacts for this pass:** `probe-r3/` (8 scripts, 6 JSON captures, 5 screenshots), copied
  from the session scratchpad so every number below is re-runnable.

**Verdict: DEFECTIVE.**

r3 is a verification pass, and it lands on a **measured overturn of an r2 negative result** plus one
**re-classification of the r2 headline blocker**. r1 and r2 both diagnosed the camera leak as a
*timing race* — an `await` that resolves after teardown. It is not a race. It is unconditional, it
needs no timing at all, and it takes two other leaks with it that both prior passes recorded as
"Clean".

**Six new findings (C-29…C-34), one correction (CORRECTION-C) that overturns a pass-2 negative and
re-scopes C-2, and one carried finding upgraded MINOR → MAJOR on a new measurement (C-14).**

---

## What r3 did

Every number below is from a probe run this pass against the live dev server at
`http://localhost:9000`, headless Chromium via Playwright, read-only. No source was edited.

| probe | script | establishes |
|---|---|---|
| P1 | `probe-r3/WBX-probe1.mjs` | nameless-button identity (outerHTML) · drop-zone `tabindex` before/after · corrupt-file intake |
| P2 | `probe-r3/WBX-probe2.mjs` | develop-cycle DOM sampling at 150/400/900/2000/4000/7000 ms |
| P3 | `probe-r3/WBX-probe3.mjs` | **camera double-start, both streams' `readyState`** · k-debounce worker traffic · readout precision · live-region census |
| P4 | `probe-r3/WBX-probe4.mjs` | **corrupt-after-success: the stale-specimen proof** · recovery |
| P5 | `probe-r3/WBX-probe5.mjs` | **12 MP image: long tasks + `isProcessing` visibility** |
| P6 | `probe-r3/WBX-probe6.mjs` | camera stream lifetime, mid-flight unmount vs. clean unmount |
| **P7** | `probe-r3/WBX-probe7.mjs` | **CORRECTION-C — camera `readyState` across two route changes, no race** |
| **P8** | `probe-r3/WBX-probe8.mjs` | **CORRECTION-C — `Worker.terminate` count + window `keydown` listener count across route changes** |

---

# CORRECTION-C — the teardown hooks never run. This is not a race; it is a lifecycle-hook mismatch.

**This overturns a pass-2 negative result and re-scopes the pass-1/pass-2 BLOCKER C-2.**

Pass-2's negative-results section states:

> **Worker termination / debounce cleanup / eyedropper listener + sampler dispose** —
> `useImageQuantize.ts:148-151`, `useExtractSession.ts:194-196`, `ImageEyedropper.vue:242-245`. **Clean.**

Those three hooks exist in source. **None of them execute on a view change.**

## The mechanism

`demo/shell/usePaneRouter.ts:85` routes the pane:

```ts
if (name === "extract") return ExtractPane;
```

and `demo/shell/PaneSlot.vue:110-127` renders every pane inside a cache:

```vue
<Transition :name="transitionName" …>
    <KeepAlive :max="max">
        <component :is="liveComponent" :key="liveKey" … v-bind="liveProps" />
    </KeepAlive>
</Transition>
```

Under `<KeepAlive>`, leaving a view **deactivates** the subtree — the DOM is removed from the
document, but the component is *not unmounted*. `onBeforeUnmount` does not fire; `onDeactivated`
does. The extract subtree registers **all three** of its teardowns on `onBeforeUnmount`:

| site | teardown | fires on view change? |
|---|---|---|
| `ExtractWorkbench.vue:281` | `onBeforeUnmount(stopCamera)` | **no** |
| `useImageQuantize.ts:148-151` | `onBeforeUnmount(() => { worker?.terminate(); worker = null; })` | **no** |
| `useExtractSession.ts:194-196` | `onBeforeUnmount(() => clearTimeout(debounceTimer))` | **no** |
| `ImageEyedropper.vue:242-245` | `onBeforeUnmount(remove keydown listener; sampler.dispose())` | **no** (while parked open) |

The repo already knows this. `demo/picker/visual/HeroBlob.vue:232-233`:

> `--- boot-B / §0.3: THE WAKE-GRAY CURE (the KeepAlive re-activation flash) ---`
> `The picker pane is KeepAlive-cached; navigating away parks the blob …`

The blob got the memo. The extract workbench did not.

## The measurement — camera (P7), no race involved

```
before open  : {"hash":"#/extract…","fileInputs":1,"videos":0,"videoHasSrcObject":[],    "streams":0,"states":[]}
after open   : {"hash":"#/extract…","fileInputs":1,"videos":1,"videoHasSrcObject":[true],"streams":1,"states":[["live"]]}
at #/mix     : {"hash":"#/mix",     "fileInputs":0,"videos":0,"videoHasSrcObject":[],    "streams":1,"states":[["live"]]}
at #/gradient: {"hash":"#/gradient","fileInputs":0,"videos":0,"videoHasSrcObject":[],    "streams":1,"states":[["live"]]}
6s later     : {"hash":"#/gradient","fileInputs":0,"videos":0,"videoHasSrcObject":[],    "streams":1,"states":[["live"]]}
```

The stream is allowed to **fully resolve** first (`videoHasSrcObject: true` — the assignment at
`ExtractWorkbench.vue:250` completed, so pass-1/pass-2's post-await-assignment race is *not* in play).
Then a plain view change: `fileInputs` 1→0 and `videos` 1→0 — the subtree left the document — and
`MediaStreamTrack.readyState` is still `"live"` two routes and six seconds later. Only a full page
reload releases the hardware.

**Reproduction, three steps, no timing:** `/#/extract` → click "Open camera" → grant → click any
other view.

## The measurement — worker + listener (P8)

`Worker.prototype.terminate` and `window.add/removeEventListener("keydown")` instrumented at page boot:

```
boot          : {"made":0,"terminated":0,"live":0,"kd":3,"hash":"#/extract…","files":1}
after upload  : {"made":1,"terminated":0,"live":1,"kd":3,"hash":"#/extract…","files":1}
eyedrop open  : {"made":1,"terminated":0,"live":1,"kd":4,"hash":"#/extract…","files":1}   ← +1 listener
at #/mix      : {"made":1,"terminated":0,"live":1,"kd":4,"hash":"#/mix",     "files":0}
at #/gradient : {"made":1,"terminated":0,"live":1,"kd":4,"hash":"#/gradient","files":0}
```

- **`terminated: 0`** with `made: 1` after leaving the route twice → **C-31**, the quantize Worker is
  never terminated.
- **`kd` stays at 4** on two subsequent routes → **C-30**, the eyedropper's `window` keydown handler
  (`ImageEyedropper.vue:226-240`) keeps listening from a parked component. Pressing Escape on the
  Gradient view runs a hidden overlay's close handler.

## What this does to the prior passes' conclusions

1. **C-2 is re-scoped from race to unconditional.** Pass-2's repro left the view "200 ms later
   mid-prompt"; pass-1 stubbed `getUserMedia` for timing control. Both are *real* — pass-2's
   mid-flight variant is confirmed by my P6
   (`midflightAfterUnmount: {"states":[["live"]],"videoEls":0}`, still `live` 6 s later) — but they
   describe a *second* door. The front door needs no race and is trivially hit by any user who opens
   the camera and clicks another view.
2. **Pass-2's proposed gestalt cure does not fix it.** Pass-2 closes with: *"a session-owned monotonic
   request token that every async continuation must still hold, **invalidated by scope disposal** —
   kills C-1, C-2, C-3, C-13."* Under `<KeepAlive>` the scope is **not disposed** on a view change, so
   the token stays valid and the camera stays live. The token is right for C-1/C-3/C-13; it is
   necessary-but-insufficient for C-2, and it is no help at all for C-30/C-31.
3. **The negative result is withdrawn.** "Worker termination / debounce cleanup / eyedropper listener
   … Clean" is false. Source-presence of a teardown hook is not evidence that teardown runs; only the
   host's lifecycle contract is.

## Cure (one transposition, five defects)

The extract subtree must adopt the app's own `<KeepAlive>` contract instead of assuming an unmount it
never gets:

- Hardware and long-lived resources move into composables that dispose on **`onScopeDispose`** (fires
  on genuine unmount) **and** park on **`onDeactivated`** (fires on view change), resuming on
  `onActivated` where resumption is meaningful.
- The camera becomes `useCameraCapture()` owning the stream in a `shallowRef`, with an
  idempotent `start()` (which also kills C-3, the double-open), a `stop()` wired to both hooks, and an
  `active` flag that the button's `disabled` binds to directly — instead of a `disabled` prop the
  child ignores on four of five controls.
- `useImageQuantize` disposes its worker on `onScopeDispose` + `onDeactivated`.
- `ImageEyedropper` stops listening on `window` at all: the Escape handler belongs on the overlay
  element, which cannot leak because it leaves the document with its subtree.

This kills **C-2, C-3, C-30, C-31** and the dead debounce clear, and it is the prerequisite that makes
pass-2's request-token cure actually terminate.

---

# NEW FINDINGS (r3)

## C-29 · BLOCKER · NEW · Teardown registered on the wrong lifecycle hook — the umbrella defect

Stated in full under CORRECTION-C above. Recorded as its own id because it is the *mechanism* three
separate leaks share, and because the cure is architectural rather than three hook edits.

**Evidence:** `demo/shell/PaneSlot.vue:120` · `demo/shell/usePaneRouter.ts:85` ·
`ExtractWorkbench.vue:281` · `useImageQuantize.ts:148-151` · `useExtractSession.ts:194-196` ·
`ImageEyedropper.vue:242-245` · P7 and P8 output pasted above.
**Reproduction:** open the camera on `/#/extract`, switch views; hardware stays live indefinitely.

---

## C-30 · MAJOR · NEW · The eyedropper's `window` keydown listener survives the view switch

`ImageEyedropper.vue:237-245` pairs `onMounted(window.addEventListener("keydown", onKeyDown))` with
`onBeforeUnmount(removeEventListener)`. Parked open by `<KeepAlive>`, the add runs and the remove
never does.

**Measured (P8):** listener count `3 → 4` on open, **`4` at `#/mix`, `4` at `#/gradient`**.

Compounding: the overlay has no modal semantics at all —
`grep -rn 'role="dialog"\|aria-modal\|useFocusTrap' demo/workbenches/extract/` returns nothing.
`ImageEyedropper.vue:8` is a bare `<div class="absolute inset-0 z-popover …">`: no `role="dialog"`,
no `aria-modal`, no focus move on open, no focus trap, no focus restore on close, no `inert` on the
content it covers. So the global Escape handler is not merely leaked — it is the *only* dismissal
mechanism the keyboard has, and it is the one that outlives the view.

**Reproduction:** upload an image → click the preview to open the eyedropper → switch to Gradient →
press Escape. A hidden component's handler runs.
**Cure:** scope the key handler to the overlay element (no `window`, nothing to leak) and give the
overlay real dialog semantics if it is to stay modal-shaped.

---

## C-31 · MAJOR · NEW · The quantize Worker is never terminated

`useImageQuantize.ts:148-151` is the only disposal, and it is `onBeforeUnmount`.

**Measured (P8):** `made: 1, terminated: 0` after leaving `/#/extract` for `/#/mix` and then
`/#/gradient` (`files: 1 → 0` proves the subtree left the document).

A parked worker holding the value.js quantize module is not catastrophic on its own; it matters
because it is the third independent confirmation of C-29, and because pass-2's C-22 cure ("worker
re-creation on a settled failure") assumes a disposal path that does not run.

---

## C-32 · MINOR · NEW · `DisplayColorSpace` is redeclared three times inside this subtree

| site | declaration |
|---|---|
| `demo/color-session/color-model.ts:29` | `export type DisplayColorSpace = PickerSpace \| "hex"` — **the canonical export** |
| `demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:21` | `export type DisplayColorSpace = SpaceId \| "hex"` |
| `demo/workbenches/extract/ExtractWorkbench.vue:202` | `type DisplayColorSpace = SpaceId \| "hex"` (private) |
| `demo/workbenches/extract/ExtractPane.vue:30` | `type DisplayColorSpace = SpaceId \| "hex"` (private) |

`demo/color-session/picker-color.ts:37` defines `export type PickerSpace = SpaceId`, so all four are
structurally identical **by coincidence** — there is no compiler-visible relation between them. The
value is prop-drilled `ExtractPane → ExtractWorkbench → ImageEyedropper` and re-typed at every hop; a
narrowing of `PickerSpace` (the picker's own union — the one that governs what the app can actually
produce) would silently fail to reach any of the three copies. Owner edict 2 (no dual paths) and
edict 3 (no contrivance).

**Cure:** `import type { DisplayColorSpace } from "../../color-session/color-model"`; delete the
three copies, including the re-export in `useImageSampler.ts`.

---

## C-33 · MINOR · NEW · Dead CSS: `.touch-gate-target` is declared in this file and applied nowhere in it

`ExtractControls.vue:139-142`:

```css
/* Touch gate styling for extract sliders */
.touch-gate-target { border-radius: var(--radius-pill); }
```

```
$ grep -rn "touch-gate-target" demo/ | grep -i extract
demo/workbenches/extract/ExtractControls.vue:140:.touch-gate-target {
```

One hit — the rule itself. Neither `Slider` (`:24-34`, `:68-77`) nor any wrapper in the template
carries the class; the real users define their own
(`demo/picker/controls/ComponentSliders/ComponentSliders.vue:58,253-262`,
`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:11`). The comment names a behaviour ("touch
gate … for extract sliders") the file does not implement.

**Scoping note so a future seat does not mis-attribute this:** this is *not* the cause of the
12 px thumbs. The picker's genuinely gated sliders measure the same 12 × 24 in the Safari capture
(`REPORT.json`, `/#/`: `{"w":12,"h":24,"tag":"span","label":"L channel"}`), so the thumb geometry is
a glass-ui `Slider` property and belongs to the producer under edict 4. `demo/ui/slider/index.ts` is
a one-line re-export (`export { Slider } from "@mkbabb/glass-ui";`), so there is no demo-side seam to
fix it at even if one wanted to.

---

## C-34 · MINOR · NEW · `dragleave` on a container with children strobes the drop-highlight

`ImageDropZone.vue:23-24`:

```vue
@dragover.prevent="dragging = true"
@dragleave.prevent="dragging = false"
```

`dragleave` fires on the root whenever the pointer crosses onto a child, and the drop zone always has
children (the `<img>` at `:37-43`, the placeholder block at `:46-51`, the corner tag at `:56-61`), so
the `border-primary bg-primary/10 scale-[1.01]` state (`:12`) flickers throughout a drag. No
`dragenter`/`dragleave` depth counter exists.

**Reproduction: NONE executed — hypothesis** (the mechanism is the standard HTML drag-and-drop
counter problem; I did not synthesise a drag).
**Cure:** a depth counter, or `pointer-events: none` on the zone's children.

---

## C-35 · MINOR · NEW · The dominance readout renders an unbounded-precision color into a `truncate` box

**Measured (P3), live:**

```
READOUT: {"title":  "oklch(54.014641044004% 0.18379799794 142.495345041445deg)",
          "visible":"oklch(54.014641044004% 0.18379799794 142.495345041445deg)",
          "clipped":true, "w":186}
```

54 characters in 186 px, `scrollWidth > clientWidth`. `ExtractWorkbench.vue:134-141` anticipates the
clipping and claims the cure:

> `truncate may trim trailing digits at narrow widths; the full readout rides title + select-all (never a lying readout).`

The title is the *same* 12-decimal string, so the escape hatch hands the user an unusable 54-char
color, and the visible text is a float truncated mid-digit — `oklch(54.33457087…` in
`probe-r3/WBX-scrolled.png`. `useExtractSession.ts:51-64` (`presentedPalette`) is the presentation
boundary and the right seam to round at.

Distinct from pass-2's C-26 (raw *error codes* as user copy); this is the success path.

---

# RE-MEASUREMENTS THAT CHANGE A CARRIED FINDING

## C-14 · **MINOR → MAJOR** · `isProcessing` excludes the only phase that blocks the main thread — now with a number

Pass-1 and pass-2 both establish the shape from source (`useImageQuantize.ts:87` sets the flag *after*
the `await` at `:106`). Neither pass has a main-thread number, and pass-2's C-22 measures the opposite
tail (a stuck skeleton under a contended server). r3 measures the fast-server case at scale.

**Measured (P5), 4000 × 3000 PNG, 6 824 131 bytes:**

```
wall ms (upload -> readout): 1077
longTasks: [517,63]      maxLongTask: 517   totalLongMs: 580
anySkeleton (isProcessing ever rendered): false
samples: [{t:61},{t:121},{t:181},{t:700},{t:721},{t:781},{t:852},{t:901},{t:1052},{t:1081,plate:true}, …]
```

A 60 ms sampling interval **stops firing from t=181 ms to t=700 ms** — a 519 ms hole that *is* the
517 ms long task. Across 18 samples `PaletteCardSkeleton` (`ExtractWorkbench.vue:104`) rendered zero
times; the same holds in P2 (`skeletons: 0` at 150/400/900/2000/4000/7000 ms) and in all four P4
snapshots. So the component's only accessible progress signal — the skeleton's
`role="status"` / `aria-label="Loading palette"`
(`demo/palettes/browser/card/PaletteCardSkeleton.vue:33-36`) — is measurably absent during the half
second the UI is frozen, and present only for the phase that is already fast.

The cause is two main-thread operations sitting outside the flag: `imageFileToPixels`
(`useImageQuantize.ts:18-26`: `createImageBitmap` + `drawImage` + a 48 MB `getImageData`) and the
copy at `:93` (`pixels.buffer.slice(0)`, a second 48 MB allocation) — both *before* the "zero-copy
Transferable" the module docstring at `:1-6` advertises.

**Cure (folds C-5, C-7, C-14, C-25):** `createImageBitmap`, `OffscreenCanvas` and `getImageData` are
all available inside a worker. Post the `File` itself to `quantize-worker.ts` — `File`/`Blob` is
structured-cloneable and cheap — and decode there. Main-thread pixel work drops to zero, the
`slice(0)` copy disappears, decode failures arrive through the typed error channel that already
exists, and `isProcessing` can honestly be set on the first synchronous line.

## C-5 extension · the corrupt-file failure is worse than silence: it is **stale attribution**

Pass-1 and pass-2 both reproduce the corrupt-image path from a *fresh* pane, where the outcome is the
"undeveloped plate" ghost. r3 ran it **after a successful extraction**, which is the realistic
sequence, and the result is a lying instrument rather than a silent one.

**Measured (P4), one session, consecutive states:**

```
after-good    : railBg="linear-gradient(to right, oklch(0.543346 0.174006 29.6967) 0%, oklch(0.575854 0.119012 242.282) 50%, …"
                code="oklch(54.334570875357% 0.17400641367 29.696692379622deg)"  destructiveLines=[]  imgNaturalW=64  unhandled=[]
after-corrupt : railBg="linear-gradient(to right, oklch(0.543346 0.174006 29.6967) 0%, oklch(0.575854 0.119012 242.282) 50%, …"
                code="oklch(54.334570875357% 0.17400641367 29.696692379622deg)"  destructiveLines=[]  imgNaturalW=0
                unhandled=["InvalidStateError: The source image could not be decoded."]
PAGEERRORS: ["InvalidStateError: The source image could not be decoded."]
```

`imgNaturalW: 0` — a **broken `<img alt="Uploaded image">`** — displayed next to a k-rail gradient and
a dominance readout that are **byte-identical to the previous image's**. Not "no result": *the wrong
result, attributed to the image on screen*. See `probe-r3/WBX-corrupt.png`. The next valid upload
recovers cleanly (`after-recover`: new gradient, new readout), so nothing is permanently wedged —
the defect is entirely in what the instrument claims during the failure.

This sharpens the indictment of the two comments the component makes about itself:
`ExtractWorkbench.vue:79` (*"Error (error ≠ empty: an explicit destructive line)"*) and
`ImageDropZone.vue:3` (*"the specimen never lies"*). `destructiveLines: []` in the pasted output.

## C-11 arithmetic · the /#/extract share of the app's whole nameless-button budget

Pass-2's CORRECTION-A is right and I do not reopen it: the three buttons have computed accnames
sourced from `title`, so "weakly named" is the accurate word and the audit probe
(`capture.mjs:102-105`) does not consult `title`. Two additions.

**Identity, live (P1)** — the three flagged buttons are exactly the ExtractControls triad:

```
{"tag":"button","title":"Upload image","rect":{"w":40,"h":40},"html":"<button … class=\"dock-icon-button …\" title=\"Upload image\" …>"}
{"tag":"button","title":"Open camera","rect":{"w":40,"h":40},"html":"<button … title=\"Open camera\" …>"}
{"tag":"button","title":"Reset",      "rect":{"w":40,"h":40},"html":"<button … disabled aria-disabled=\"true\" … title=\"Reset\" …>"}
```

**Share, from `REPORT.md`'s own rows:** summing the four matrices gives 26 flagged instances
app-wide (desktop-light 9, desktop-dark 9, mobile-light 4, mobile-dark 4). `/#/extract` contributes
`3 × 4 = 12` of them — **46%** — and is the only route above 1 in any matrix. One component owns
nearly half the application's entire deficit on this metric, which is what makes C-7's cure worth
routing to glass-ui (`DockControl` defaulting `aria-label` from `title`) rather than patching three
call sites.

## C-8 scoping · the dominance/first-swatch disagreement is tie-only, and I did not observe it live

Pass-2 derived `AGREE? false` from `src/quantize.ts` for a constructed two-pixel input where both
clusters have `population = 1`. r3's live extraction is the non-tie case and the invariant **holds**:

```
after-good: code="oklch(54.334570875357% 0.17400641367 29.696692379622deg)"   (hue 29.7° = the red band)
railBg    = "linear-gradient(to right, oklch(0.543346 0.174006 29.6967) 0%, …"  (first stop = the same red)
```

`38% of the image` on a 64 × 64 image whose bands are 24/24/16 px tall (red = 24/64 = 37.5%). Card's
first swatch and the readout agree.

This does not contradict pass-2 — it scopes it. The extra clause at
`useExtractSession.ts:132-137` only overrides `quantizePixels`' ordering (`src/quantize.ts:128`,
`b.population - a.population`) on an **exact population tie**, which needs equal cluster sizes.
Pass-2's cure (`dominant = presented.value[0] ?? null`) remains correct and is now also cheap to
justify: the 22-line loop's *only* observable effect is to break the library's stated ordering in the
one case where the component's own comment (`ExtractWorkbench.vue:113-117`, *"the card's first swatch
IS the dominant specimen"*) is most visibly falsified.

---

# NEGATIVE RESULTS (r3)

Recorded so no seat re-walks them. Pass-1's and pass-2's negative lists stand **except** the
teardown entry, withdrawn by CORRECTION-C.

- **The k-slider debounce works.** P3: eight `ArrowRight` presses at 35 ms intervals produced
  `postsImmediatelyAfter8Presses: 0` and, after settling, `postsAfterSettle: [13]` — exactly **one**
  worker message, carrying the final `k = 13`. `useExtractSession.ts:159-162` behaves as designed.
  (This does not soften pass-2's C-7: the *settled* step still costs a full re-decode.)
- **The develop cycle is not wedged on the fast path.** P2 sampled the result plate at 150/400/900/
  2000/4000/7000 ms: `shadowPalette 1 → 0` and `dominanceRow false → true` by t=400 ms, stable
  through t=7000 ms. The `<Transition mode="out-in">` at `ExtractWorkbench.vue:102` completes; pass-2's
  C-22 wedge is a slow-worker phenomenon, not a transition-mode bug.
- **The corrupt-file state is recoverable.** P4 `after-recover`: a subsequent valid image produces a
  new gradient and a new readout. Nothing latches.
- **`verbatimModuleSyntax` (edict 8) is clean** — re-confirmed independently this pass across
  `ExtractWorkbench.vue:189`, `useExtractSession.ts:14,18`, `useImageQuantize.ts:9,10`,
  `quantize-worker.ts:7`, `ExtractPane.vue:28`, `ImageEyedropper.vue:99`.
- **Route-level visual health is clean and uninformative.** `REPORT.json` `/#/extract`, all four
  Safari matrices: `overflowX: 0`, `pageErrors: []`, `consoleErrors: []`, `main: 1`, `imgNoAlt: 0`.
  Clean because no capture ever hands the component a file — see the vacuous-gate finding.
- **The three named repo hazards still do not apply.** No `ValueUnit` wrapping, no `defineModel`, no
  oklch→HSV round trip, no ungated rAF loop in this tree. The one rAF
  (`ExtractWorkbench.vue:249`) is a single-shot await, not a loop — its defect is C-18 (wrong
  primitive), not the PRM-RAF epidemic.

---

# TEST TRUTH (r3 confirmation)

Pass-2's C-9 stands, re-confirmed with a sharper grep:

```
$ grep -rn "setInputFiles\|input\[type=.file" e2e/
(no output)
```

**No test in this repository ever uploads an image.** Every gate touching `/#/extract` certifies the
pre-image state:

| gate | asserts |
|---|---|
| `e2e/smoke/walk.spec.ts:74-82` | the "Extract" heading is visible + one button matching `/Upload image/i` is visible |
| `e2e/smoke/oracles/o9-shadow-palette.spec.ts:125-166` | the **empty** state: ghost present, `aria-hidden`, pulses, re-segments under the k slider, PRM-static |
| `e2e/smoke/oracles/o18-contrast-census.spec.ts:1080-1140` | the two slider **tracks** vs their ground ≥ 3:1 |
| `test/image-sampler-v4.test.ts` | `useImageSampler` in isolation (the eyedropper's sampler only) |
| — | `useExtractSession`, `useImageQuantize`: **no test file imports either** |

**Additional vacuous-gate mutations r3 verifies against the specific gates above** (pass-2 names the
`onFile` no-op; these are distinct, and each keeps every gate green):

- **M-r3-a.** Empty the body of `stopCamera` (`ExtractWorkbench.vue:257-263`). C-2/C-3/C-29 become
  unconditional and total. Green — no test opens the camera.
- **M-r3-b.** Delete `onBeforeUnmount(stopCamera)` (`:281`) **and**
  `onBeforeUnmount(worker.terminate)` (`useImageQuantize.ts:148-151`). **Zero behavioural change** —
  by CORRECTION-C they are already dead — and zero test change. A gate suite that cannot distinguish
  "teardown present" from "teardown deleted" is not testing teardown.
- **M-r3-c.** Delete the whole `v-else-if="session.extractedPalette.value"` branch
  (`ExtractWorkbench.vue:108-157`). The workbench can never display a result; `o9` asserts the
  `v-else` shadow branch, which now always wins. Green.

The seam for the cure already ships and still has zero callers: `useImageQuantize.ts:35-41`
(`workerFactory`, documented *"tests + a Safari-worker fallback can swap a fake/pooled factory"*).

---

# DEFECT TABLE — r3 delta

Only rows that are new, re-classified, or corrected this pass. The full 28-row table from r2 remains
authoritative for everything else.

| id | sev | defect | evidence | pass |
|---|---|---|---|---|
| **C-29** | **BLOCKER** | **teardown on `onBeforeUnmount` under `<KeepAlive>` — no teardown ever runs on a view change** | **P7 + P8 pasted; `PaneSlot.vue:120`, `usePaneRouter.ts:85`** | **3** |
| C-2 | BLOCKER | camera stays `live` after leaving the view | **r3 re-scoped: unconditional, no race** (P7) | 1·2·**3** |
| **C-30** | **MAJOR** | **eyedropper `window` keydown listener survives the view switch; overlay has no dialog semantics** | **P8: `kd` 3→4, stays 4 across two routes** | **3** |
| **C-31** | **MAJOR** | **quantize Worker never terminated** | **P8: `made:1, terminated:0`** | **3** |
| C-14 | **MINOR → MAJOR** | `isProcessing` excludes the decode; 517 ms main-thread freeze with no feedback | **P5: `longTasks [517,63]`, `anySkeleton false`, 519 ms sampler hole** | 1·2·**3** |
| C-5 | MAJOR | malformed image ⇒ unhandled rejection **+ stale attribution** | **P4: broken `<img>` beside the previous image's rail + readout, `destructiveLines: []`** | 1·2·**3** |
| C-8 | MAJOR | dominance readout ≠ card's first swatch | **r3 scoping: tie-only; non-tie path verified correct live** | 1·2·**3** |
| C-11 | MAJOR | weakly-named buttons ×3 | **r3: identity by outerHTML; 12 of 26 app-wide instances = 46%** | 1·2·**3** |
| **C-32** | **MINOR** | **`DisplayColorSpace` redeclared ×3 in this subtree over a canonical export** | **4 sites tabled** | **3** |
| **C-33** | **MINOR** | **dead `.touch-gate-target` rule; the comment names a behaviour the file lacks** | **grep, 1 hit = the rule itself** | **3** |
| **C-34** | **MINOR** | **`dragleave` strobes the drop highlight (no depth counter)** | **source (hypothesis — not reproduced)** | **3** |
| **C-35** | **MINOR** | **12-decimal color rendered into a `truncate` box; the `title` "cure" is the same string** | **P3: 54 chars in 186 px, `clipped: true`** | **3** |
| — | — | *withdrawn:* pass-2 negative "Worker termination / debounce cleanup / eyedropper listener … Clean" | **CORRECTION-C** | **3** |

---

# THE GESTALT (r3)

Pass-1 found the first axis: **every blocker is an `await` with no identity attached to it.**
Pass-2 found the second: **the component has no vocabulary for its own outcomes** — processing is a
boolean, empty is indistinguishable from absent, a camera fault is filed as a quantizer fault.

r3 finds the third, and it is underneath both: **the component does not know what host it lives in.**

It registers teardown for an unmount that never comes, because it was written as if it owned its own
lifetime. It reads `isProcessing` as if the expensive work were in the worker, because it was written
as if the worker boundary were where it says it is. It re-declares `DisplayColorSpace` as if no
canonical one existed two directories up. It ships a `.touch-gate-target` rule as if the gate were
its own to define, and a `disabled` prop as if the child honoured it. Each of these is the same error
at a different altitude: **a local assumption where a contract already exists**, unverified because
nothing ever exercises the path that would falsify it.

That is also why the vacuous gate matters more here than the usual. The three leaks in CORRECTION-C
are not subtle — they are visible in one page-load with eight lines of instrumentation — and they
survived two full audit passes *and* the entire e2e suite because no test has ever left the extract
view with the camera on, and no test has ever fed the component a file.

The transposition therefore has two halves, and the order matters:

1. **Adopt the host contract first.** `onDeactivated` + `onScopeDispose` in composables that own
   hardware or workers; the camera hoisted into `useCameraCapture()` with an idempotent start. Without
   this, pass-2's request-token cure cannot terminate, because the scope it keys on is never disposed.
2. **Then the state union.** Pass-2's
   `type ExtractState = { kind:"empty" } | { kind:"decoding", id } | { kind:"quantizing", id, since } | { kind:"developed", palette } | { kind:"barren" } | { kind:"failed", issue }`
   — owned by the session, switched on once in the template — with decode moved into the worker so
   that `decoding` is a state the *worker* reports rather than a window the main thread spends frozen
   and silent.

**Strongest defect: C-29 / C-2.** Open the camera on `/#/extract`, click any other view, and the
capture hardware stays live for the rest of the session with no `<video>`, no indicator, and no
control anywhere in the application that can stop it. Three steps, no timing, measured twice by two
different methods.
