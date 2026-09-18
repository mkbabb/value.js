# CHALLENGE-C — `demo/workbenches/extract/ExtractControls.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. Seat is declared, not inherited.

---

## Pin verification (component-specific context)

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
```

**MATCHES** the BJ W4 hold pin `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28`.
The file is unmodified since `f2c8f565` (`feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 …`).
Consumer edits are FORBIDDEN until Glass 8. **No source edits land from this seat.** The blocked
wave with its exact release condition is authored in §*Blocked wave* below.

## Verdict

**DEFECTIVE.** Eleven findings, one BLOCKER. The component's central contract — its `disabled`
prop — is honoured on **one of five** interactive controls, and the consequence is a reproducible
**live-MediaStream leak**: three clicks on the Camera control acquire three camera streams and stop
zero of them. Secondary: an undecodable image produces an unhandled rejection + page error with
**no user-facing error at all** and three UI surfaces that contradict each other; the Reset gate is
wrong in both directions; and the file carries a dead `.touch-gate-target` CSS rule that is the
fossil of the mechanism that would have inflated its measured **12.0 CSS px** drag handle.

## What I ran

Four headless-WebKit probes against the live dev server at `http://localhost:9000`
(scripts in the session scratchpad; all output pasted inline below), plus static reads of the
component, `ExtractWorkbench.vue`, `ExtractPane.vue`, `useExtractSession.ts`, `useImageQuantize.ts`,
`useContrastSafeColor.ts`, `ink.ts`, the glass-ui 7.0.0 `DockControl`/`Slider` type surfaces, the
two e2e specs that touch this tree, and the mega-tranche visual `REPORT.json`.

---

## C-1 · BLOCKER — `disabled` is bound to 1 of 5 controls; the camera leaks live MediaStreams

**Defect.** `ExtractControls.vue:84` is the *only* site in the file that reads the `disabled` prop:

```
83:            <DockControl
84:                :disabled="disabled || !hasImage"
```

The Upload control (`:40`), the Camera control (`:49`), the k `Slider` (`:24`) and the kC `Slider`
(`:68`) never receive it. The APIs exist and were not used — glass-ui 7.0.0 declares
`disabled?: boolean` on both:

- `node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts:9` → `disabled?: boolean;`
- `node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts` → `disabled?: boolean`

`ExtractWorkbench.vue:70` passes `:disabled="session.isProcessing.value || cameraActive"` — the
parent's intent is explicit and is silently discarded for four of the five controls.

**Reproduction** (real `MediaStream` via `canvas.captureStream()`, `track.stop` instrumented):

```
=== CAMERA (real MediaStream) ===
[
 { "t": "before",          "camDisabled": false, "gum": 0, "stops": 0, "videos": 0, "live": [] },
 { "t": "after-1st-click", "camDisabled": false, "gum": 1, "stops": 0, "videos": 1, "live": ["live"] },
 { "t": "after-2nd-click", "camDisabled": false, "gum": 2, "stops": 0, "videos": 1, "live": ["live","live"] },
 { "t": "after-3rd-click", "camDisabled": false, "gum": 3, "stops": 0, "videos": 1, "live": ["live","live","live"] }
]
```

`uploadDisabled: false` and both sliders `aria-disabled: null` at every step.

**Mechanism.** `ExtractWorkbench.vue:228` holds `let cameraStream: MediaStream | null` — a *single*
slot. `startCamera()` (`:239-255`) assigns into it unconditionally. Click 2 overwrites the
reference to stream 1; `stopCamera()` (`:257`) and `onBeforeUnmount(stopCamera)` (`:281`) can only
ever stop the last one. Streams 1 and 2 stay `readyState: "live"` with no reference and no UI —
**the device camera indicator stays lit until page unload.** Only one `<video>` exists, so nothing
on screen tells the user two extra captures are running.

There is a second, worse path in the same function. `startCamera` sets `cameraActive.value = true`
*before* awaiting, and its `catch` sets it back to `false` — but never stops an
already-resolved stream. In my first probe run (a non-`MediaStream` fake, so `srcObject = …` threw
after `getUserMedia` resolved) I measured `gum: 1, stops: 0, videos: 0` — **a live camera track
with the viewfinder closed.** Any post-acquisition failure reproduces this on real hardware.

**Proposed cure (gestalt, not patch).** The prop is a *contract*, so bind it once at the boundary
rather than five times at the leaves: give the controls row `<fieldset :disabled="disabled">`
semantics — or, staying in the component vocabulary, forward `:disabled="disabled"` to Upload,
Camera and both `Slider`s (Reset keeps its extra `|| !hasImage`, see C-3). Independently, the
single-slot `cameraStream` in `ExtractWorkbench` should be replaced by an idempotent
`startCamera()` that calls `stopCamera()` first and stops the stream in its own `catch`, so
acquisition is a state transition rather than an accumulation.

**Escalation note.** This is a privacy defect (camera stays live), not an aesthetic one. It is
listed under the blocked wave but flagged for an out-of-band owner ruling — see §*Blocked wave*.

---

## C-2 · MAJOR — an undecodable image throws a page error with ZERO user feedback

**Defect.** The Upload control ExtractControls owns (`:40-46` → `ExtractWorkbench.openFilePicker` →
`ImageDropZone`'s `<input type="file">`) leads to an error path that surfaces nothing.

**Reproduction** — a *truncated but correctly typed* `image/png` (8-byte PNG magic + 40 zero bytes).
This passes `accept="image/*"` (`ImageDropZone.vue:30`) **and** the drop-path guard
`file?.type.startsWith("image/")` (`ImageDropZone.vue:97`), so no filter rejects it:

```
{
 "unhandled": ["Cannot decode the data in the argument to createImageBitmap"],
 "errorLineVisible": false,
 "errorText": null,
 "resetDisabled": false,
 "skeletonEls": ["shadow-palette skeleton-ink-register rounded-card border bor"],
 "ghost": true,
 "caption": 1
}
pageErrors: ["PAGEERR InvalidStateError: Cannot decode the data in the argument to createImageBitmap"]
```

A plain `.txt` reproduces identically, and additionally plants
`<img alt="Uploaded image" src="data:text/plain;base64,dGhpcyB…" naturalWidth=0>` in the drop zone.

**Three surfaces disagree after the failure:** the plate still says
`· undeveloped plate — feed it an image ·`; the drop zone shows a broken preview; and Reset —
gated on `hasImage` — is **enabled**, asserting an image exists.

**Mechanism.** `useExtractSession.ts:167` calls `runQuantize()` fire-and-forget with no `.catch`;
`runQuantize` (`:153-157`) calls `quantizeFromFile(...)` and discards the promise.
`useImageQuantize.ts:106` awaits `imageFileToPixels(file)`, which throws in `createImageBitmap`
**before** `runQuantize` (`:80-99`) ever sets `isProcessing`/`error` — so the session's
`quantizeError` computed (`useExtractSession.ts:66`) stays `null` and the `v-if` destructive line at
`ExtractWorkbench.vue:80-85` never renders. Note the mega-tranche visual audit reports
`pageErrors: 0` for `/#/extract` — it never uploaded a file, so this class is invisible to it.

**Proposed cure.** Make the decode a *typed outcome*, not an exception: have `quantizeFromFile`
return the existing `Result` shape the session already speaks (`presentedPalette` is
`{ok:true}|{ok:false,error}`), so a decode failure lands in `workerError` and the destructive line
renders for free. `previewDataUrl` must be set **after** a successful decode, not before — that
single reordering also fixes the broken `<img>` and the lying `hasImage`.

---

## C-3 · MAJOR — the Reset gate is wrong in both directions

**Defect.** `:disabled="disabled || !hasImage"` (`:84`).

*False-negative.* k and kC are live with **no** image — this is a certified behaviour, not an
accident: `e2e/smoke/oracles/o9-shadow-palette.spec.ts:147-158` drives the k slider with no image
and asserts the ghost re-segments 5→6→5, and `ExtractWorkbench.vue:92-95` documents it (`count`
rides the k-slider LIVE… the ghost re-segments under the slider). Measured:

```
=== KEYBOARD + k=16 LABEL ===
{"focused":true,"before":"5","k":"16","labelText":"16","labelW":20,
 "labelScrollW":20,"clipped":false,"resetDisabled":true}
```

Eleven ArrowRight presses move k from 5 to 16; the ghost re-segments to 16; **the only control that
restores k=5 / kC=0.5 is disabled.** The user cannot undo a live, visible parameter change.

*False-positive.* Per C-2, an undecodable file sets `previewDataUrl` → `hasImage` true →
`resetDisabled: false` with nothing to reset.

**Mechanism.** `hasImage` is the wrong predicate. `onReset` (`useExtractSession.ts:180-184`) resets
**k and kC** and only *conditionally* re-quantizes (`if (lastFile.value)`). The composable already
knows the truth; the gate asks a different question.

**Proposed cure.** Gate on dirtiness of what Reset actually resets:
`:disabled="disabled || (k === 5 && chromaWeight === 0.5)"` — computed in the session as
`canReset`, so the default constants live in one place instead of being duplicated between
`useExtractSession.ts:44,45,181,182` and any consumer. `hasImage` then has no consumer and the prop
is deleted.

---

## C-4 · MAJOR — dead `.touch-gate-target` rule; the 12px drag handle it was meant to inflate

**Defect.** `ExtractControls.vue:139-142`:

```
139:/* Touch gate styling for extract sliders */
140:.touch-gate-target {
141:    border-radius: var(--radius-pill);
142:}
```

The class is applied to **no element in this template**. Grep across the repo — the only occurrence
in this file is the rule itself:

```
$ grep -rn "touch-gate-target" demo/ node_modules/@mkbabb/glass-ui/dist/
demo/workbenches/extract/ExtractControls.vue:140:.touch-gate-target {
demo/picker/composables/usePointerDebug.ts:121:            ".touch-gate-target, .spectrum-picker",
demo/picker/controls/ComponentSliders/ComponentSliders.vue:58:  'touch-gate-target flex-1 min-w-0',
demo/picker/controls/ComponentSliders/ComponentSliders.vue:244:  * touch-gate-target uses) — the block is intentionally UNSCOPED so the
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:11:  '… relative touch-gate-target',
```

The block is `<style scoped>`, so it compiles to `.touch-gate-target[data-v-…]` and can never match
even if some ancestor added the class. It is the fossil of the picker's touch-gate idiom
(`ComponentSliders.vue:253-273` + `composables/useSliderTouchGates.ts`) — and that file's own
comment at `:244` still names *"the ExtractControls … touch-gate-target uses"*, a cross-file claim
that is **false**.

**Measured consequence** (mobile, `pointer: coarse`, `elementFromPoint` sweep from the thumb centre):

```
=== THUMB HIT WIDTH (mobile/coarse) ===
{"boxW":12,"boxH":44,"hitW":12,"neighborAtMinus12":"SPAN.slider-range",
 "neighborAtPlus12":"SPAN.slider-track"}
thumbCS: {"w":"12px","h":"44px","minW":"auto","before":"\"\"","cls":"slider-thumb glass-specular-track"}
```

glass-ui's coarse treatment grows the thumb's **height** to 44px and leaves its **width** at 12px;
the `::before` pseudo does not widen the hit region. At ±12px from centre you land on
`.slider-range`/`.slider-track`, so a mis-grab **jumps the value** rather than starting a drag. The
sibling picker sliders get an explicit 44px coarse hit extension (`ComponentSliders.vue:336+`,
`@media (pointer: coarse) { .channel-slider::before { … } }`); the extract sliders get neither that
nor the dead rule they nominally declare.

The mega-tranche audit counts both thumbs on all four matrices —
`REPORT.json` `/#/extract`: desktop `{"w":12,"h":24,…"Number of colors"}`,
`{"w":12,"h":24,…"Chroma weight"}`; mobile `{"w":12,"h":44,…}` ×2. That is **2 of the 6**
small-tap-targets on every extract capture, i.e. this component's exact contribution to that metric.

**Honest caveat — this is NOT a WCAG 2.5.8 AA failure.** I ran the spacing-exception test
(24 CSS px diameter circle centred on each undersized target vs every other target's bounding box)
on the mobile capture and got **zero intersections** (`"viol": []`; nearest neighbours are the 44×44
DockControls at ≥68px). It is an ergonomics defect and a dead-code defect, not an AA violation, and
must not be filed as one.

**Edicts violated:** #2 (no legacy code — a shim for a mechanism that was never wired here) and
#3 (KISS — a rule that claims a capability the component does not have).

**Proposed cure.** Delete the dead rule and the false claim in `ComponentSliders.vue:244`. The
12px-wide handle is **glass-ui's** `.slider-thumb` geometry, so the real cure is a coarse-pointer
width/hit rung in glass-ui's slider — not a fourth copy of the touch-gate idiom in a consumer
(edict #4). Relay to the glass-ui BJ inbox; see §*Blocked wave*.

---

## C-5 · MAJOR — two orphan `<label>` elements; the visible label is not in the accessible name

**Defect.** `:15` and `:66` are `<label>` elements with no `for` and no wrapped control:

```
15:            <label class="text-mono-small plate-ink … w-5 text-right">{{ k }}</label>
66:            <label class="fira-code text-micro plate-ink …" title="Chroma weight">kC</label>
```

Measured live:

```
"labels": [
 { "text": "5",  "htmlFor": null, "id": "", "title": null },
 { "text": "kC", "htmlFor": null, "id": "", "title": "Chroma weight" }
]
```

Playwright ARIA snapshot of the component — the labels are bare text nodes, associated with nothing:

```
- text: "5"
- slider "Number of colors"
- button "Upload image": - img
- button "Open camera":  - img
- separator
- text: kC
- slider "Chroma weight"
- text: "0.5"
- separator
- button "Reset" [disabled]: - img
```

**Consequences.** (a) The visible label `kC` is absent from the accessible name `Chroma weight` —
**WCAG 2.5.3 Label in Name**: a voice-control user saying "click kC" cannot reach the slider.
(b) On the k row the element marked up as a `<label>` is the live **value**, not a name — a `<label>`
whose text changes on every drag frame. (c) `title="Chroma weight"` on a non-interactive `<label>`
is hover-only and duplicates the slider's own name.

**Proposed cure.** They are not labels — they are a readout and an abbreviation. Make the k readout
`<span aria-hidden="true">` (the slider already announces its value; `aria-valuenow` measured `"5"`)
and fold the abbreviation into the name so the visible text is contained in it:
`aria-label="kC — chroma weight"`. Same for the `0.5` readout at `:78`. No new element, no new
wrapper — one tag change and one string.

---

## C-6 · MINOR — `title` is the sole accessible name on all three buttons

**Measured.** All three `DockControl`s render with `ariaLabel: null`, `text: ""`, `title` only:

```
{"title":"Upload image","ariaLabel":null,"text":"","disabled":false,"w":40,"h":40}
{"title":"Open camera", "ariaLabel":null,"text":"","disabled":false,"w":40,"h":40}
{"title":"Reset",       "ariaLabel":null,"text":"","disabled":true, "w":40,"h":40}
```

`DockControl` does not set `inheritAttrs: false` (verified in `dist/dock.js`; its sibling
`DockTrigger` does), so `title` reaches the native `<button>` and the HTML-AAM last-resort naming
step resolves it — the ARIA snapshot above confirms the names **are** exposed. So the visual
audit's `namelessButtons: 3` is strict-probe accounting
(`capture.mjs:104` accepts only `aria-label || aria-labelledby || textContent`), **not** an AT
blackout. The residual real defect: `title` renders **no tooltip on touch**, so on the two mobile
matrices these are three unlabelled icons to a sighted touch user.

**Scale, measured from `REPORT.md`:** `/#/extract` is the only route with `namelessButtons: 3` in
**all four** matrices, and the only route above 1 on mobile. Summing the census
(desktop-light 9 + desktop-dark 9 + mobile-light 4 + mobile-dark 4 = 26 instances), extract
contributes **12 of 26 = 46%** of the whole application's nameless-button surface, all three from
this file.

**House inconsistency, evidenced.** The shell dock names its controls properly —
`demo/shell/dock/Dock.vue:143,144,154` (`aria-label="Save edit"` / `"Cancel edit"` / `"Back"`),
`demo/shell/dock/layers/SlugEditLayer.vue:94,106,114`. The workbenches use `title`. Two conventions,
one app.

**Also:** the three Lucide `<svg>`s are exposed as `img` nodes inside the buttons (`- img` in the
snapshot above) and carry no name. The sibling `ImageDropZone.vue:60` gets this right with
`aria-hidden="true"`.

**Proposed cure.** `aria-label` + `title` on each control (`title` kept for the desktop tooltip,
`aria-label` as the authoritative name), and `aria-hidden="true"` on the three icons — matching the
shell dock convention rather than inventing a third one.

---

## C-7 · MINOR — the rail's "certified identity edge in every state" is invisible pre-image

**Defect.** Lines 6-11 claim the inset hairline gives *"a certified identity edge independent of its
gradient content **in every state**"*. Line 22 paints the ring in the **same colour as the fill**:

```
22:  :style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

Measured live, undeveloped state:

```
"cs": { "bgImage": "none",
        "bgColor":   "oklch(0.545141 0.218024 9.834023)",
        "boxShadow": "oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset" }
```

Identical colour → 1.0:1 ring-to-fill → zero visible edge. The claim holds only once a gradient
develops. A documented invariant that is false in the component's *default* state is a defect in
the record, not just in the pixels.

**Proposed cure.** Either narrow the comment to the developed state, or make the ring an actual
edge — the ring's job is separation from the *plate*, so it should be the certified ink and the
**fill** should be the de-emphasis rung, not the same token twice.

---

## C-8 · MINOR — the `gradient` prop's empty-state value is a dead binding

`useExtractSession.ts:103` returns the string `"var(--muted)"` — a **colour** — from a computed
named `kSliderGradient`, for a prop declared `gradient: string` (`:107`). Line 22 feeds it to the
`background` shorthand and then overwrites the colour channel with `backgroundColor: trackInk` on
the very next object key. Measured pre-image: `bgImage: "none"`. **The entire empty-state value of
`gradient` is inert** — the producer violates the prop's contract and the consumer silently
discards it, so neither side can ever notice.

**Proposed cure.** Type the contract honestly: `gradient: string | null`, `null` when undeveloped,
and drop the `background` shorthand for the explicit `backgroundImage` — then the two layers stop
fighting over one property and the null case is a real branch instead of a swallowed one.

---

## C-9 · MINOR — three per-instance `--btn-hover-color` pins on siblings (edict #5)

Lines 42, 51 and 86 carry the byte-identical `:style="{ '--btn-hover-color': cssColor }"` on three
siblings inside the one flex row opened at `:39`. `--btn-hover-color` is an inherited custom
property: **one** binding on the row container produces an identical cascade with a third of the
patches. This is the "root-level styling, never per-instance overrides" edict, violated three times
in fifty lines.

Second-order: this pin carries the **raw** `cssColor`, not the certified `trackInk`. Lines 113-125
go to considerable length to establish that the track material must be contract ink certified at
`GRAPHICS_CONTRAST_FLOOR` — and then the hover ink on the three buttons beside it bypasses that
contract entirely.

**Proposed cure.** Hoist the custom property to the row container and certify it:
`:style="{ '--btn-hover-color': trackInk }"` once at `:39`.

---

## C-10 · MINOR (vacuous gate) — zero tests; the mutations that stay green

**No unit test references this component.** `grep -rn "ExtractControls" test/ e2e/` returns only two
prose mentions in unrelated files. Two e2e specs touch the rendered tree:

- `e2e/smoke/oracles/o9-shadow-palette.spec.ts:152-158` — `getByRole("slider", {name:"Number of
  colors"})`, focus, ArrowRight/ArrowLeft, asserts the ghost segment count.
- `e2e/smoke/oracles/o18-contrast-census.spec.ts:1106-1134` — samples the **colour** of
  `[data-o18="extract-kc"] .slider-track` and `[data-o18="extract-k-rail"]`.

**Mutations that keep both specs green** (the vacuous-gate proof):

| # | mutation | why it survives |
|---|---|---|
| a | delete `:disabled` from `:84` entirely | nothing asserts Reset's disabled state — this is C-1's exact defect, already green |
| b | delete `@click="$emit('upload')"` and `@click="$emit('camera')"` | no spec activates either button |
| c | delete the whole `.touch-gate-target` block | already dead (C-4) |
| d | replace the kC `@update:model-value` handler with a no-op | o18 measures the track's *colour*, o9 drives only the k slider |
| e | change `:max="16"` to `:max="99"` | no bound is asserted |
| f | drop `boxShadow` from `:22` | o18 samples `backgroundColor`, not the ring |

Only removing `aria-label="Number of colors"` or renaming either `data-o18` hook breaks anything.

**Proposed cure.** One `@vue/test-utils` spec asserting the *contract*, not the paint: that
`disabled` reaches every control (C-1), that Reset's gate follows dirtiness not `hasImage` (C-3),
and that each button exposes an `aria-label` (C-6). Three assertions kill six of the mutations above.

---

## C-11 · INFO — hypotheses (labelled; NO reproduction)

1. **`v[0]!` masking, `:33` and `:76`.** Both handlers type `v` as `number[] | undefined`, guard with
   truthiness (`v &&` — an empty array is truthy), then non-null-assert `v[0]!`. If reka-ui ever
   emitted `[]`, `$emit('update:k', undefined)` would reach `colorCount.value` and
   `quantizeFromFile(file, undefined, …)`. **I could not produce `[]` from the live slider.**
   HYPOTHESIS. The assertions are still an edict-#2-adjacent masking idiom; `if (v?.length)` costs
   nothing and removes both `!`.
2. **`parseCssColor` crash class.** `trackInk` (`:123`) → `safeCss` → `certifyAccentInk`
   (`ink.ts:130`) → `parseOklch` (`ink.ts:39`) → `parseCssColor`. `parseOklch` handles
   `!parsed.ok` but not a **throw** — and the repo's record carries a live
   `parseCssColor("oklch()")` shipping crash (R1). `cssColor` here is app-serialized, so I could not
   reach it from this component. HYPOTHESIS.
3. **Per-frame recompute.** `cssColor` is the rAF-coalesced live pick, so during a colour drag
   `trackInk` recomputes and five inline-style bindings patch per frame (rail ×3 properties + three
   `--btn-hover-color` pins + one `--slider-track-bg`). `resolveLiveTintCached`
   (`useContrastSafeColor.ts:240`) caches the `getComputedStyle`+canvas probe by
   `(surface, darkClass, epoch)`, so the expensive part is amortised, but `certifyAccentInk`'s
   gamut/floor walk is not. **UNMEASURED.** HYPOTHESIS — C-9's hoist would cut the patch count 3→1
   regardless.

---

## Local hazards — checked, negative

Recording the negatives so the next seat does not re-run them:

| hazard | result |
|---|---|
| `defineModel()` stale-read round-trip | **absent.** The component uses explicit `defineProps`/`defineEmits` with `:model-value="[k]"`; the parent writes a plain `ref` synchronously (`useExtractSession.ts:171`). No async round-trip, no stale read. Correct by construction. |
| oklch→HSV hue drift / `stableHue` | not applicable — no hue round-trip here. |
| `ValueUnit` nesting accumulation | not applicable — no `ValueUnit` construction in this tree. |
| reka-ui pointer-capture leak | not reachable from this file; no `pointercancel`/`lostpointercapture` handlers are needed because the component adds no pointer handling of its own. |
| ungated `requestAnimationFrame` (PRM-RAF) | **none in this component.** One `await new Promise(requestAnimationFrame)` in `ExtractWorkbench.vue:249` — a single-shot await, not a loop. |
| WebGL context loss / eager boot | not applicable — no WebGL in this tree. `REPORT.md` shows the only `WebGL: context lost` on `/#/`, not `/#/extract`. |
| the `absolute inset-0` rail blocking slider hit-testing | **negative, measured.** Rail box `{x:252,y:495,w:434,h:24}` is byte-identical to the `.glass-slider` root box `{x:252,y:495,w:434,h:24}` — the slider covers it exactly, and being later in DOM order with `position: relative` it wins hit-testing. No dead zone. |
| k label clipping at k=16 | **negative, measured.** `labelW: 20, labelScrollW: 20, clipped: false`. |
| keyboard operability | **works.** `focused: true`, ArrowRight ×11 → `aria-valuenow: "16"`; `tabindex="0"` on both thumbs. |
| `verbatimModuleSyntax` (edict #8) | **clean.** All six imports at `:96-101` are value imports; none is type-only. |
| god module (edict #1) | **clean.** 152 lines, one concern. |
| animations deleted (edict #6) | **clean.** No keyframes removed; none defined here. |

---

## Edict scorecard

| # | edict | verdict |
|---|---|---|
| 1 | no god modules | PASS |
| 2 | no legacy code | **FAIL** — C-4 (dead `.touch-gate-target` shim), C-11.1 (`!` masking) |
| 3 | KISS, no contrivance | **FAIL** — C-4 (a rule claiming a capability that isn't wired) |
| 4 | glass-ui is the design system | PASS in the consumer; the 12px coarse thumb width (C-4) is a **glass-ui** gap, correctly *not* patched here |
| 5 | root-level styling | **FAIL** — C-9 (three per-instance `--btn-hover-color` pins) |
| 6 | animations never deleted | PASS |
| 7 | idiomatic Vue 3.5 | PASS — reactive props destructure (`:103`), correct avoidance of `defineModel` |
| 8 | `verbatimModuleSyntax` | PASS |

---

## Blocked wave — `W·XC-EXTRACT-CONTROLS`

The component is PINNED in the glass BJ W4 hold at
`71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` (hash verified above). Consumer
edits are FORBIDDEN until Glass 8. This wave is authored, not executed.

**Release condition (exact).** All three must hold:

1. `@mkbabb/glass-ui` **8.0.0** is adopted in `package.json` and the BJ W4 pin on
   `demo/workbenches/extract/ExtractControls.vue` is released by the glass-ui BJ owner; **and**
2. glass-ui 8 ships a coarse-pointer **width** rung on `.slider-thumb` (currently 12×44 on
   `pointer: coarse`; the sibling `.channel-slider::before` 44px extension is a consumer-side
   workaround this wave must not copy — edicts #3/#4); **and**
3. the C-4 relay is acknowledged in the glass-ui BJ inbox per the standing BH/BI relay edict.

**Wave contents, in landing order** (D-numbers reserved, none applied):

| step | finding | scope | depends on release condition |
|---|---|---|---|
| XC-1 | C-1 | forward `disabled` to Upload/Camera/both Sliders; idempotent `startCamera` in `ExtractWorkbench` | 1 only |
| XC-2 | C-2 | `Result`-typed decode; set `previewDataUrl` after decode | 1 only (composable, not the pinned file) |
| XC-3 | C-3 | `canReset` dirtiness gate in the session; delete `hasImage` | 1 only |
| XC-4 | C-5, C-6 | `aria-label` + `aria-hidden` on icons; readouts become `aria-hidden` spans | 1 only |
| XC-5 | C-9, C-7, C-8 | hoist `--btn-hover-color` to the row + certify; ring/fill separation; `gradient: string \| null` | 1 only |
| XC-6 | C-4 | delete the dead rule + the false claim in `ComponentSliders.vue:244` | 1 only |
| XC-7 | C-4 (geometry) | consume glass-ui 8's coarse thumb width | **1 + 2 + 3** |
| XC-8 | C-10 | contract spec killing mutations (a)–(f) | none — `test/` is not pinned, may land now |

**Out-of-band escalation.** **C-1 is a privacy defect** — the device camera stays live, with the
indicator lit, after the viewfinder closes or after any post-acquisition failure. Recommend the
owner rule an out-of-band consumer unpin for **XC-1 alone** (a ~4-line diff: four `:disabled`
forwards plus a `stopCamera()` at the head of `startCamera`) rather than holding it behind Glass 8.
XC-8 can land immediately and would have caught it.

---

## Strongest defect

**C-1.** The `disabled` prop is bound to one of five controls, and the measured consequence is
three live camera MediaStreams acquired and zero stopped (`gum: 3, stops: 0, live:
["live","live","live"]`) with a single `<video>` on screen — the device camera stays capturing,
unreferenced and unstoppable, until page unload.
