# CHALLENGE-C — `demo/workbenches/extract/ExtractControls.vue` — implementation (pass 2)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. The seat is declared, not inherited.

---

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
$ wc -l demo/workbenches/extract/ExtractControls.vue
     151 demo/workbenches/extract/ExtractControls.vue
```

**MATCHES** the glass BJ W4 hold pin. Consumer edits are FORBIDDEN until Glass 8.
**No source edits land from this seat.** The blocked wave is authored in §*Blocked wave*.

## Relationship to pass 1

Pass 1 is preserved verbatim at `challenge-C-implementation.pass-1-2026-07-28-prior.md`. I re-ran
its central claim independently and **it is right but its mechanism is wrong in a way that
understates the severity** (C2-1). I also converted three of its explicitly-labelled hypotheses into
measurements — one is now a hard number (C2-2), one is now a reproduced throw (C2-8), one is
**falsified** (§Negatives, `v[0]!`/float garbage). Everything numbered `C2-*` below is this pass's
own evidence.

## Verdict

**DEFECTIVE.** Thirteen findings, one BLOCKER, seven MAJOR. The component is a 151-line control
strip whose four interactive elements each carry a defect of a different kind: a camera button that
acquires device streams nothing will ever release, two sliders that drive a 24-megabyte worker job
per nudge and can fire it twice for one intent, a track whose value-fill paints nothing, and a
certified-ink computed that costs **1.3 ms per evaluation** on the synchronous colour signal.

---

## C2-1 · BLOCKER — the camera streams are never released: the pane is `KeepAlive`-cached, so `onBeforeUnmount` never fires

**Defect.** ExtractControls' Camera control (`ExtractControls.vue:49-55`) receives the `disabled`
prop and does not bind it. `ExtractWorkbench.vue:70` passes
`:disabled="session.isProcessing.value || cameraActive"` — so the parent's explicit intent is
"once the camera is open, this button is dead." It is not bound, so every click re-enters
`startCamera()` and acquires another `MediaStream` into a single-slot variable
(`ExtractWorkbench.vue:228`).

**Reproduction** — Chromium with `--use-fake-device-for-media-stream`, real `MediaStream`s,
`track.stop` instrumented at acquisition (`evidence/pass-2/xc2-probe6.mjs`):

```
=== CAMERA — three clicks (fake device, real MediaStream) ===
 { "t": "before",        "gum": 0, "stops": 0, "live": [],                       "videos": 0, "camDisabled": [false] }
 { "t": "after-click-1", "gum": 1, "stops": 0, "live": ["live"],                 "videos": 1, "camDisabled": [false] }
 { "t": "after-click-2", "gum": 2, "stops": 0, "live": ["live","live"],          "videos": 1, "camDisabled": [false] }
 { "t": "after-click-3", "gum": 3, "stops": 0, "live": ["live","live","live"],   "videos": 1, "camDisabled": [false] }
```

**The new part — leaving the route does not stop them either:**

```
=== AFTER LEAVING /#/extract (component unmounted) ===
 { "t": "after-unmount", "gum": 3, "stops": 0, "live": ["live","live","live"], "videos": 0 }
```

Zero stops. Not "the last one survives" — **`stopCamera()` never runs at all.**

**Mechanism (this is where pass 1 is wrong).** Pass 1 asserted `onBeforeUnmount(stopCamera)`
(`ExtractWorkbench.vue:281`) "can only ever stop the last one," which presumes it fires. It does
not. Every pane in this app is rendered through `demo/shell/PaneSlot.vue:120`:

```
120:        <KeepAlive :max="max">
121:            <component :is="liveComponent" :key="liveKey" … />
```

`ExtractPane` is a `KeepAlive`-cached async pane (`demo/shell/usePaneRouter.ts:72,85`). Leaving the
route **deactivates** the subtree — the DOM detaches (`videos: 0`) but the component instance and
its closure survive, so Vue calls `onDeactivated`, never `onBeforeUnmount`. `onBeforeUnmount` is
simply the wrong hook for this app's pane shell. Consequence: **N clicks on the Camera control leave
N live camera tracks running for the rest of the session, with the device indicator lit and no UI
anywhere in the app that mentions them.**

The same wrong hook governs the other two teardowns in this tree — `useImageQuantize.ts:148`
(`worker?.terminate()`) and `useExtractSession.ts:194` (`clearTimeout(debounceTimer)`) — so neither
runs on pane exit either.

**Proposed cure (gestalt).** Two moves, neither of them a patch:
1. The camera is a *resource*, not a flag. Own it in an `onScopeDispose`-registered effect scope so
   the release is bound to the composable's lifetime rather than to a hook name, and make
   `startCamera()` idempotent (`stopCamera()` at the head, `stopCamera()` inside its own `catch`)
   so acquisition is a state transition instead of an accumulation.
2. The `disabled` prop is a *contract*. ExtractControls honours it on exactly one of four controls
   (`:84`); bind it once at the row boundary so a control cannot silently opt out.
   Both `Slider` and `DockControl` declare the API and it was not used —
   `node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts:9` → `disabled?: boolean;`.

**Escalation.** This is a privacy defect. It is filed under the blocked wave but flagged for an
out-of-band ruling; see §*Blocked wave*.

---

## C2-2 · MAJOR — `trackInk` costs 1.30 ms per evaluation and rides the *synchronous* colour signal, not the rAF-coalesced one

**Defect.** `ExtractControls.vue:123-125`:

```
123: const trackInk = computed(() =>
124:     cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)",
125: );
```

`safeCss` → `certifyAccentInk` (`ink.ts:130`) → `safeAccentColor` — an OKLab-distance guard plus a
gamut map plus a WCAG floor **walk**. Pass 1 filed the per-frame cost as an explicitly UNMEASURED
hypothesis. Measured, in-page, against the real module (`evidence/pass-2/xc2-probe5.out`):

```
=== certifyAccentInk COST ===
{ "N": 400, "totalMs": 519, "perCallMs": 1.2975, "sixteenPerFrameMs": 20.76 }
```

**1.2975 ms per call** — 7.8 % of a 16.7 ms frame budget for one computed.

**The signal it rides makes that per-frame.** `demo/color-picker/App.vue:271`:

```
271: provide(CSS_COLOR_KEY, cssColorOpaque);
```

That is the **synchronous** derivation (`useColorPipeline.ts:104`), not `cssColorOpaqueFrame`
(`:279`), the rAF-coalesced twin that exists specifically for this problem. The repo states the rate
itself — `demo/color-session/useAtmosphereFrameCoalesce.ts:14-19`:

> "…SYNCHRONOUSLY on EVERY `cssColorOpaque` change, i.e. 60×/s under a slider drag … so each drag
> frame's [work] … the RETURNED signal (never the synchronous `cssColorOpaque`)"

And `useContrastSafeColor.ts:292` documents its own parameter as *"the rAF-coalesced live OPAQUE
colour"* — the doc and the wiring disagree. So while the extract pane is mounted (it is
`KeepAlive`-cached — see C2-1 — so "mounted" outlives "visible"), a picker drag drives ~60 × 1.3 ms
≈ **78 ms of main-thread work per second** from this one computed, feeding five inline-style
bindings (rail `background`/`background-color`/`box-shadow`, three `--btn-hover-color` pins, one
`--slider-track-bg`).

**Proposed cure.** The certification is *scheme- and pick-scoped*, not frame-scoped: the fix is not
to memoize inside the component but to thread the coalesced signal at the provider
(`CSS_COLOR_KEY` → `cssColorOpaqueFrame`) so every tier-seated consumer inherits the correct clock —
the same architectural move `useAtmosphereFrameCoalesce` was written for, applied at the one seam
that skipped it.

---

## C2-3 · MAJOR — one intent, two identical worker jobs: the debounce timer is never cleared by `onFile`/`onReset`

**Defect.** `useExtractSession.ts` owns a single `debounceTimer` (`:49`) armed only by
`debouncedReQuantize` (`:159-162`). `onFile` (`:164-168`) and `onReset` (`:180-184`) call
`runQuantize()` **directly** without clearing it.

**Reproduction A** — nudge k (arms the 300 ms debounce), then click Reset 50 ms later
(`evidence/pass-2/xc2-probe2.out`, `Worker.prototype.postMessage` instrumented):

```
=== RACE — Reset while the k debounce is armed ===
 "posts": [
  { "t": 5795, "opts": { "k": 5, "chromaWeight": 0.5 } },
  { "t": 5991, "opts": { "k": 5, "chromaWeight": 0.5 } }
 ]
```

Two posts, **byte-identical options**, 196 ms apart. Reset's own quantize, then the orphaned timer's.

**Reproduction B** — nudge k, then upload 40 ms later:

```
=== RACE 2 — upload while the k debounce is armed ===
 [ { "t": 6675, "opts": { "k": 6, "chromaWeight": 0.5 } },
   { "t": 6962, "opts": { "k": 6, "chromaWeight": 0.5 } } ]
```

**Negative control** (the debounce itself is fine — 8 rapid ArrowRights coalesce):

```
=== CONTROL — 8 rapid ArrowRight (debounce should coalesce to 1) ===
 [ { "t": 8312, "opts": { "k": 14, "chromaWeight": 0.5 } } ]
```

With a 3000×2000 image each of those duplicated posts carries **24,000,000 bytes** (C2-5).

**Proposed cure.** The debounce is a property of *the request*, not a free-floating timer beside it.
Fold scheduling into one `requestQuantize({ immediate })` entry point that owns the timer, so
"start now" and "start soon" cannot both be armed — instead of three call sites, one of which
happens to remember to clear.

---

## C2-4 · MAJOR — the in-flight promise slot is single-valued; an overlapping quantize orphans the previous promise and clears `isProcessing` early

**Defect.** `useImageQuantize.ts:51-52` holds **one** `pendingResolve` / `pendingReject` pair, and
`runQuantize` (`:89-91`) overwrites them on every call:

```
 51:    let pendingResolve: ((value: readonly QuantizedColor[]) => void) | null = null;
 89:    return new Promise<readonly QuantizedColor[]>((resolve, reject) => {
 90:        pendingResolve = resolve;
```

Overlap is not theoretical — it is reachable directly from ExtractControls, because the k slider is
live during processing (C2-1's unbound `disabled`). Measured (`evidence/pass-2/xc2-probe3.out`):

```
=== k DRIVEN DURING PROCESSING — worker posts ===
 [ { "t": 8115, "opts": { "k": 5, "chromaWeight": 0.5 }, "bytes": 24000000 },
   { "t": 8531, "opts": { "k": 9, "chromaWeight": 0.5 }, "bytes": 24000000 } ]
```

Two 24 MB jobs, 416 ms apart. Consequences, all from the code: the first promise is **never
settled** (its `resolve`/`reject` are unreachable — a permanently pending promise plus its retained
closure); and the worker's `onmessage` (`:65`) sets `isProcessing.value = false` on the **first**
response while the second job is still queued, so the UI drops the KNOWN-IMMINENT skeleton and
presents a result that is about to be silently replaced.

There is a second-order hazard I did **not** reproduce and label a hypothesis: the session discards
the returned promise (`useExtractSession.ts:155`), so a worker `{type:"error"}` response —
`pendingReject(new Error(...))` at `:63` — rejects a floating promise. I could not provoke a worker
error (a 1×1 image with k=5 succeeds; see §Negatives), so the unhandled-rejection leg is unproven.

**Proposed cure.** Give each request an identity (a monotonically increasing token carried in the
request and echoed in the response) and drop stale responses; `isProcessing` becomes
`inFlight > 0`. That is the standard cure for a request/response worker and it deletes the single
slot rather than guarding it.

---

## C2-5 · MAJOR — 24 MB copied and transferred per quantize to feed a 10,000-pixel sampler

**Measured** (`evidence/pass-2/xc2-probe3.out`, a 3000×2000 PNG):

```
=== BIG IMAGE 3000x2000 ===
 "posts": [ { "t": 4527, "opts": { "k": 5, "chromaWeight": 0.5 }, "bytes": 24000000 } ],
 "mainThreadMsFromChangeToWorkerPost": 40
```

The library's own option surface has the guard and the demo never passes it:

```
$ grep -o "targetPixels[^,;)]*" node_modules/@mkbabb/value.js/dist/subpaths/quantize.js
targetPixels ?? 1e4
```

`quantizePixels` subsamples to **10,000 pixels**. The demo hands it 6,000,000 — it uses **0.17 %**
of what was copied. And it is copied twice on the main thread before it leaves: `imageFileToPixels`
(`useImageQuantize.ts:18-26`) does a full-resolution `getImageData`, then `runQuantize` (`:93`) does
`pixels.buffer.slice(0)`. `buildOptions` (`:102-103`) constructs `{ k, chromaWeight }` and nothing
else. In the C2-3 race cases this happens **twice per interaction**: 48 MB allocated and transferred
for 20,000 sampled pixels.

Separately, `previewDataUrl` (`useExtractSession.ts:166`) retains the whole file as a base64 string
(measured `dataUrlChars: 54294` for a 40,704-byte PNG — the expected ~1.33×; a 5 MB phone photo
becomes a ~6.7 MB retained string) and that string is also the `<img src>`.

**Proposed cure.** Downsample at the boundary where the pixels are first produced — draw the bitmap
into an `OffscreenCanvas` sized to `√targetPixels`-derived dimensions instead of `bitmap.width ×
bitmap.height`. One changed line of geometry removes both main-thread copies and the transfer.

---

## C2-6 · MAJOR — `variant="spectrum"` is misused on the kC slider: its value-fill paints nothing

**Defect.** Both sliders declare `variant="spectrum"` (`:26`, `:69`). glass-ui's spectrum variant is
defined by *removing* the fill, because it assumes the track **is** the data
(`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`):

```
.glass-slider[data-variant=spectrum] .slider-range[data-v-4f4cab01] {
    -webkit-backdrop-filter:none; box-shadow:none; background:0 0 }
.glass-slider[data-variant=spectrum] .slider-track[data-v-4f4cab01] {
    height:calc(var(--slider-thumb-size,1rem) * 1.5); background:var(--slider-track-bg,var(--secondary)) }
```

That contract is satisfied by the **k** slider (its rail carries the palette gradient — the gradient
is the data). It is **not** satisfied by **kC**, whose track is a flat certified ink
(`:75` → `--slider-track-bg: trackInk`). Measured live (`evidence/pass-2/xc2-probe1.mjs`):

```
=== SLIDER PAINT (range vs track) ===
 { "name": "Chroma weight", "rootCls": "glass-slider flex-1",
   "rangeBg": "rgba(0, 0, 0, 0)", "rangeImg": "none",
   "trackBg": "oklch(0.545141 0.218024 9.834023)", "trackImg": "none",
   "rangeW": 76.8, "trackW": 230.5 }
```

The fill region exists in layout — 76.8 px of a 230.5 px track — and **paints nothing**, so the
pixels left of the thumb are identical to the pixels right of it: the fill-vs-remainder distinction,
the primary visual encoding of a slider's value, is 1.000:1. The Safari mobile capture shows exactly
that — a uniform crimson bar with a white thumb
(`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/extract.png`). At the same time
the O-18 census samples this very element and passes, because it measures the *track colour*
(`e2e/smoke/oracles/o18-contrast-census.spec.ts:1106,1126`) and nothing measures the *distinction*.

**Proposed cure.** kC has no spectrum; it should use the `standard` variant so `.slider-range` paints
its liquid fill and the value becomes readable without the thumb. This is a one-word change to the
variant, i.e. reusing the design system correctly rather than styling around it.

---

## C2-7 · MAJOR — no `aria-valuetext`: a ratified repo law violated, and the oracle that enforces it never visits this route

**The law** (`e2e/smoke/oracles/o27-focus-affordance.spec.ts:24-29`):

> "BR-4 (U-F27) — **every** channel slider exposes a HUMAN-READABLE, unit-aware `aria-valuetext` —
> NOT a raw ≥10-digit `aria-valuenow`."

**Measured on this component** (`evidence/pass-2/xc2-probe2.out`):

```
=== THUMB A11Y ===
 { "label": "Number of colors", "role": "slider", "valuenow": "5",   "valuetext": null, "min": "1", "max": "16",  "tabindex": "0" }
 { "label": "Chroma weight",    "role": "slider", "valuenow": "0.5", "valuetext": null, "min": "0", "max": "1.5", "tabindex": "0" }
```

**Why the gate is green anyway.** `o27-focus-affordance.spec.ts:140-160` enumerates
`page.getByRole("main", { name: "Color tool panes" }).getByRole("slider")` after
`await page.goto("/")` — with **no `openView`**. It asserts over whichever sliders happen to be
mounted on the default route. The Extract pane is a lazy, `KeepAlive`-cached pane that the default
route never opens, so its two sliders are never enumerated. The law is universal ("every channel
slider"); the gate is route-local. That is a vacuous gate, not a passing component.

**Second-order, measured.** Stepping kC by keyboard gives a clean grid — `"0.6"`, `"0.7"` … `"1.5"`
(so the ≥10-digit float class is genuinely absent here; see §Negatives) — but at 1.0 the thumb
announces `aria-valuenow="1"` while the visible readout reads `"1.0"`. A screen-reader user hears
"Chroma weight 1"; the sighted user beside them sees "kC 1.0". Neither carries a unit.

**Proposed cure.** The demo already owns the formatter and the delivery leg —
`demo/picker/controls/ComponentSliders/composables/sliderAnnouncement.ts` and
`useSliderAnnouncements.ts`. Use them here rather than writing a second announcement idiom, and
widen the o27 BR-4 assertion from "the default route's main" to every route that mounts a slider,
so the law's own words are what the gate tests.

---

## C2-8 · MAJOR — a throwing call inside a render-path computed, guarded only by truthiness (the R1 crash class is one of the throws)

**Defect.** `trackInk` (`:123-125`) guards with `cssColor ?` — a *truthiness* check — and then calls
into a stack that throws. Measured against the real module (`evidence/pass-2/xc2-probe5.out`):

```
=== certifyAccentInk MALFORMED INPUT (parseCssColor crash class) ===
 { "in": "oklch()",               "THREW": "TypeError: undefined is not an object (evaluating 'g[0].replace')" }
 { "in": "oklch(none none none)", "THREW": "Error: Ink certification failed: color_missing_channel" }
 { "in": "transparent",           "THREW": "Error: Ink certification failed: color_invalid_input" }
 { "in": "rgb(0 0 0 / 0)",        "THREW": "Error: Ink certification failed: color_invalid_input" }
```

The first line is the repo's recorded **R1 live `parseCssColor("oklch()")` shipping crash**,
reproduced through this component's own certification path: `parseOklch` (`ink.ts:38-43`) handles
`!parsed.ok` but not a *throw*, so the guard it does have is the wrong one. A throw inside a
`computed` that feeds an inline `:style` is a render error — it takes down the subtree, not the
pixel.

**Reachability, stated honestly.** `cssColor` arrives as `cssColorOpaque ?? ''`
(`ExtractWorkbench.vue:69`), and `cssColorOpaque` is
`serializePickerColor(withAlpha(model.value.color, 1))` (`useColorPipeline.ts:104`) — opaque by
construction, so `transparent`/alpha-0 are not reachable from this prop today. I did **not**
demonstrate a live input that throws. The finding is the *guard shape*, which is measured: four
throwing input classes exist, the component checks only that the string is non-empty, and the same
call is reached from `useSafeAccentFn` by nine other files.

**Also measured — the silent-degradation twin.** For inputs that fail to parse without throwing,
`certifyAccentInk` returns its input unchanged (`ink.ts:135`): `"NaN"` → `"NaN"`, `"#"` → `"#"`,
`"var(--nope)"` → `"var(--nope)"`. Those reach `background-color:` / `box-shadow:` as invalid values
and are dropped by the CSS parser, so the rail loses its certified fill **and** its identity ring
with no error anywhere — a masking fallback in the exact code path whose 13-line comment block is
about certification being guaranteed (edict #2).

**Proposed cure.** `certifyAccentInk` should return the demo's own `Result` shape rather than
throwing-or-echoing; the consumer then has one honest branch and the certified-de-emphasis token
(`var(--ink-muted)`, which `:124` already names) becomes the *typed* degenerate instead of an
accident.

---

## C2-9 · MINOR — the k rail is a hand-rolled reimplementation of `.slider-track`, with a hardcoded height duplicating a token-derived one

`:19-23` paints an `absolute inset-0 … h-6` sibling, and `:32` blanks the real track with
`--slider-track-bg: transparent` so the hand-rolled one shows through. glass-ui already accepts any
background there — **which the kC slider proves 43 lines below** (`:75` passes a colour into the
same custom property). One file, two mechanisms for one job.

The duplication is also numeric: the rail hardcodes `h-6` (24 px) against glass-ui's
`height: calc(var(--slider-thumb-size,1rem) * 1.5)`. They agree today (measured rail box
`{x:173, y:535, w:434, h:24}`) and desynchronize the moment any theme or consumer moves
`--slider-thumb-size`. Edicts #3 (KISS), #4 (glass-ui is the design system), #5 (root-level styling).

**Proposed cure.** Pass the gradient straight into `--slider-track-bg`. That deletes the div, the
`absolute inset-0`, the hardcoded 24 px, the `overflow-hidden`, and the hit-test coincidence that
pass 1 had to measure to prove was safe.

---

## C2-10 · MINOR — ARIA-prohibited attributes on a roleless generic; the accessible name is duplicated on two nodes

**Measured** (`evidence/pass-2/xc2-probe2.out`):

```
=== SLIDER ROOT vs THUMB (aria on roleless generic) ===
 { "tag": "SPAN", "role": null, "ariaLabel": "Number of colors", "ariaDisabled": "false",
   "cls": "glass-slider relative w-full", "thumbLabels": ["Number of colors"] }
 { "tag": "SPAN", "role": null, "ariaLabel": "Chroma weight",    "ariaDisabled": "false",
   "cls": "glass-slider flex-1",         "thumbLabels": ["Chroma weight"] }
```

`aria-label` and `aria-disabled` are **prohibited** on `role="generic"` (ARIA 1.2; axe
`aria-prohibited-attr`), which is the implicit role of a bare `<span>`. The same accessible name
then exists on two elements — which is why a `[aria-label="Chroma weight"]` locator is ambiguous;
my first probe crashed on it, and the error is itself the evidence:

```
locator.focus: Error: strict mode violation: locator('[aria-label="Chroma weight"]') resolved to 2 elements:
    1) <span … data-slot="slider" aria-disabled="false" aria-label="Chroma weight" class="glass-slider flex-1">
    2) <span tabindex="0" role="slider" aria-valuenow="0.5" aria-label="Chroma weight" class="slider-thumb …">
```

**Attribution.** The consumer's only lever is `aria-label` on `<Slider>`; glass-ui forwards it to the
root *and* the thumb. This is a **glass-ui** defect the consumer surfaces — relay item, not a
consumer patch (edict #4). See §*Blocked wave* step XC2-7.

---

## C2-11 · MINOR — inconsistent injection defence: `INK_AMBIENT_KEY` is non-null-asserted with no default while its sibling key is defended

`useSafeAccentFn` — called unconditionally at `:118` — does
`const ambient = inject(INK_AMBIENT_KEY)!;` (`useContrastSafeColor.ts:347`). Outside the boot
provider, `ambient` is `undefined` and `ambient.value` throws inside `safeCss`, i.e. inside a render
computed (same failure shape as C2-8). The component's own parent takes the opposite stance for the
sibling key one line apart: `inject(CSS_COLOR_KEY, undefined)` (`ExtractWorkbench.vue:218`). Two
injection keys, two contradictory contracts, one subtree. `ConsoleRail.vue:128` and
`HeroBlob.vue:95` both use `inject(INK_AMBIENT_KEY, null)` — this composable is the outlier.

---

## C2-12 · MINOR — at the k slider's own declared minimum the rail degenerates to a one-stop gradient

`:28` declares `:min="1"`. At k = 1 the palette has one entry and `kSliderGradient`
(`useExtractSession.ts:104-111`) emits a single stop at 50 %. Measured in WebKit
(`evidence/pass-2/xc2-probe4.mjs`, after ArrowLeft ×4 from k=5 on a four-colour image):

```
=== RAIL @ k=1 (the slider's own declared minimum) ===
 "inlineStyleAttr": "background: linear-gradient(to right, oklch(0.653565 0.039943 87.79792) 50%) oklch(0.545141 0.218024 9.834023); …"
 "computedBgImage": "linear-gradient(to right, oklch(0.653565 0.039943 87.79792) 50%)"
```

Reproduces identically from a **solid-colour image at k=5** (the library's `dedupeThreshold ?? .02`
collapses it to one cluster) — so this is an ordinary-user path, not only a slider extreme.

**Honest negative, so this is not over-filed:** the one-stop gradient is **valid** — CSS Images 4
permits a single stop, and WebKit agrees:

```
=== WEBKIT CSS VALIDITY — one-stop linear-gradient ===
{ "oneStopAccepted": "linear-gradient(to right, red 50%)", "cssSupports": true }
```

The defect is semantic, not syntactic: the rail's header comment (`:6-11`) says the gradient rides
above the fill "as a DATA layer" that "fully occludes" it, and at k=1 that data layer is a flat wash
indistinguishable in kind from the undeveloped state. Pair with C2-6: at k=1 the k slider has no
gradient, no fill, and no ring contrast (`:22` paints ring and fill the same token) — every visual
channel it owns is simultaneously degenerate.

---

## C2-13 · INFO — vacuous-gate proof: the mutations that keep every gate green

No unit test references this component. Three e2e specs touch its rendered tree — `o9` drives the k
slider and counts ghost segments, `o18` samples two colours through the `data-o18` hooks, `o27`
never visits the route (C2-7). Mutations that survive **all** of them:

| # | mutation to `ExtractControls.vue` | why it survives |
|---|---|---|
| a | delete `variant="spectrum"` from the k slider | o18 samples `[data-o18="extract-k-rail"]`, which is the sibling div, not the slider |
| b | swap `:min="1"` → `:min="0"` (k=0 → empty palette) | no gate asserts either bound |
| c | change `chromaWeight.toFixed(1)` → `.toFixed(0)` | nothing reads the readout |
| d | delete `aria-label="Chroma weight"` | only the k slider is located by name (o9) |
| e | delete the `@click="$emit('camera')"` binding | no gate activates the camera |
| f | replace `trackInk` with the literal `"red"` | o18 asserts a contrast **ratio**, and a saturated red clears the 3:1 graphics floor on this plate |

Mutation (f) is the sharp one: the O-18 census is the gate the file's entire comment apparatus cites
as its authority, and it cannot tell certified ink from an arbitrary colour that happens to pass.

**Proposed cure.** One `@vue/test-utils` spec asserting the *contract*: `disabled` reaches all four
controls (C2-1), both sliders expose `aria-valuetext` (C2-7), and one `update:k` emission produces
exactly one quantize request (C2-3/C2-4). `test/` is not under the pin — it can land now.

---

## Local hazards and prior-pass claims — checked, negative

| item | result |
|---|---|
| `v[0]!` / `v &&` masking on an empty array (pass 1 C-11.1) | **not reproducible.** 11 keyboard steps + drags never emitted `[]`; the assertion remains an idiom smell, not a defect. |
| raw ≥10-digit float in `aria-valuenow` (the BR-4 failure mode) | **falsified for this component.** Measured grid: `"0.6","0.7","0.8","0.9","1","1.1","1.2","1.3","1.4","1.5","1.5"` — reka snaps to the step. The C2-7 defect is the *absence* of `aria-valuetext`, not float garbage. |
| kC readout clipping at max | **negative, measured.** `{ "text": "1.5", "clientW": 20, "scrollW": 20, "clipped": false }`. |
| debounce coalescing | **works** — 8 rapid arrows → exactly 1 worker post. |
| worker error on a degenerate image (1×1, k=5) | **no error path taken.** `posts: 1`, `unhandledRejections: []`, `errorLine: []`; the quantizer returns a 1-colour palette. The C2-4 unhandled-rejection leg stays a hypothesis. |
| `defineModel()` stale-read round-trip | **absent.** Explicit `defineProps`/`defineEmits`; the parent writes a plain `ref` synchronously. Correct by construction. |
| oklch→HSV hue drift / `stableHue` | not applicable — no hue round-trip in this tree. |
| `ValueUnit` nesting accumulation | not applicable — no `ValueUnit` construction. |
| reka-ui pointer-capture leak | not applicable — the component adds no pointer handling of its own. |
| ungated `requestAnimationFrame` (PRM-RAF) | **none.** The one `await new Promise(requestAnimationFrame)` (`ExtractWorkbench.vue:249`) is a single-shot await. |
| WebGL context loss / eager boot | not applicable; `REPORT.json` shows `pageErrors: []`, `consoleErrors: []` on `/#/extract` in all four matrices. |
| horizontal overflow | **clean** — `overflowX: 0` in all four matrices. |
| `verbatimModuleSyntax` (edict #8) | **clean.** All six imports (`:96-101`) are value imports. |
| god module (edict #1) | **clean.** 151 lines, one concern. |
| animations (edict #6) | **clean.** None deleted, none defined. |

---

## Edict scorecard

| # | edict | verdict |
|---|---|---|
| 1 | no god modules | PASS |
| 2 | no legacy code | **FAIL** — C2-8 (silent echo-the-input fallback inside the certification path); the dead `.touch-gate-target` rule at `:140-142` (pass 1 C-4, re-confirmed: the class appears on no element in this template and the block is `scoped`) |
| 3 | KISS, no contrivance | **FAIL** — C2-9 (a hand-rolled track beside a design-system track that already does the job, in the same file) |
| 4 | glass-ui is the design system | **FAIL** — C2-6 (a variant used against its documented contract) and C2-9; C2-10 is correctly a glass-ui relay, not a consumer patch |
| 5 | root-level styling | **FAIL** — C2-9 (`h-6` duplicating a token-derived height) and the three per-instance `--btn-hover-color` pins at `:42,51,86` |
| 6 | animations never deleted | PASS |
| 7 | idiomatic Vue 3.5 | **FAIL** — C2-1: `onBeforeUnmount` is the wrong lifecycle for this app's `KeepAlive`-cached panes |
| 8 | `verbatimModuleSyntax` | PASS |

---

## Blocked wave — `W·XC2-EXTRACT-CONTROLS`

The component is PINNED in the glass BJ W4 hold at
`71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` (verified above). Consumer edits
are FORBIDDEN until Glass 8. **This wave is authored, not executed.**

**Release condition (exact) — all three must hold:**

1. `@mkbabb/glass-ui` **8.0.0** is adopted in `package.json` **and** the BJ W4 pin on
   `demo/workbenches/extract/ExtractControls.vue` is released by the glass-ui BJ owner; **and**
2. glass-ui 8 ships (a) an `aria-label` that names **only** the `role="slider"` thumb, leaving no
   `aria-label`/`aria-disabled` on the roleless root (C2-10), and (b) an `aria-valuetext`
   pass-through prop on `<Slider>` so the announcement is a prop, not a post-mount DOM write
   (C2-7 — the `useSliderAnnouncements.ts:6-8` interim is explicitly marked a relay); **and**
3. the C2-6 / C2-10 relay is acknowledged in the glass-ui BJ inbox per the standing BH/BI relay
   edict.

**Wave contents, in landing order** (D-numbers reserved, none applied):

| step | findings | scope | gated on |
|---|---|---|---|
| XC2-0 | C2-13 | contract spec killing mutations (a)–(f) | **none — `test/` is unpinned, lands now** |
| XC2-1 | C2-1 | `onScopeDispose`-owned camera + idempotent `startCamera`; forward `disabled` to all four controls | 1 only (workbench + pinned file) |
| XC2-2 | C2-3, C2-4 | one `requestQuantize({immediate})` scheduler; request tokens; `isProcessing = inFlight > 0` | none — composables are unpinned |
| XC2-3 | C2-5 | downsample in `imageFileToPixels`; set `previewDataUrl` after a successful decode | none — composable |
| XC2-4 | C2-2 | `provide(CSS_COLOR_KEY, cssColorOpaqueFrame)` at `App.vue:271` | none — not the pinned file |
| XC2-5 | C2-6, C2-9 | kC → `standard` variant; delete the rail div, pass the gradient via `--slider-track-bg`; delete the dead `.touch-gate-target` block | 1 only |
| XC2-6 | C2-8, C2-11 | `Result`-typed `certifyAccentInk`; `inject(INK_AMBIENT_KEY, null)` with an explicit degenerate | none — `demo/color-session/` is unpinned |
| XC2-7 | C2-7, C2-10 | consume glass-ui 8's thumb-only naming + `aria-valuetext` prop; widen o27 BR-4 beyond the default route | **1 + 2 + 3** |
| XC2-8 | C2-12 | single-cluster rail state as an explicit branch, not a degenerate gradient | 1 only |

**Out-of-band escalation.** C2-1 is a **privacy** defect and the pin is the only thing holding it:
three clicks leave three device camera tracks live for the rest of the session, and leaving the
route stops **zero** of them because the cleanup hook never fires under `KeepAlive`. Recommend the
owner rule an out-of-band unpin for **XC2-1 alone** — the consumer half is four `:disabled`
forwards; the rest is in `ExtractWorkbench.vue`, which is **not** under the pin and could land today.

---

## Strongest defect

**C2-1.** The Camera control ignores the `disabled` prop it is handed, so streams accumulate — and
the cleanup that was supposed to catch that runs on `onBeforeUnmount`, which **never fires**,
because `demo/shell/PaneSlot.vue:120` renders every pane inside `<KeepAlive>`. Measured end to end:
three clicks → `gum: 3, stops: 0, live: ["live","live","live"]`; navigate away → `videos: 0` and
still `gum: 3, stops: 0, live: ["live","live","live"]`. The device camera keeps capturing, with the
indicator lit, on a route the user has left.
