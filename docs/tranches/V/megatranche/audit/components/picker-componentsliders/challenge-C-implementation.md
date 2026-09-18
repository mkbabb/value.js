# CHALLENGE-C — `ComponentSliders.vue` · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited.

---

## Seat, subject, and boundary

| | |
|---|---|
| Axis | CHALLENGE-C — assume the implementation is defective; find the bug |
| Subject | `demo/picker/controls/ComponentSliders/ComponentSliders.vue` (395 lines) |
| Colocated | `ConsoleRail.vue`, `composables/useSliderTouchGates.ts`, `composables/useSliderAnnouncements.ts`, `composables/sliderAnnouncement.ts` |
| Repo HEAD at audit | `f36f780c5938390b8dc93cd87920418e82cdd81a` (the brief cited `c654824e`; the tree has advanced, the subject file has not) |
| Writes | only under `docs/tranches/V/megatranche/audit/components/picker-componentsliders/`. **No source edit landed.** |

### Pin verification — NO DRIFT

```
$ shasum -a 256 demo/picker/controls/ComponentSliders/ComponentSliders.vue
a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327  …/ComponentSliders.vue
```

Byte-identical to the CARRY-LEDGER §D pin (`docs/tranches/V/reformation/CARRY-LEDGER.md:67`).
The glass BJ W4 / v8 Slider post-cut consumer hold therefore still binds this file exactly.
**Every cure below is authored as BLOCKED-ON-GLASS-V8.** Release condition is quoted verbatim in
§"Wave" at the end.

### Probe ledger (all evidence below is reproducible from these)

| id | script | what it drove |
|---|---|---|
| P1 | `scratchpad/probe.mjs` | lab/hex/rgb/lch snapshots desktop + 390×844 coarse; focus survival; inter-row hit test |
| P2 | `scratchpad/probe2.mjs` | detached-wrapper retention; `none`-channel stack trace |
| P3 | `scratchpad/probe3.mjs` | post-`none` recovery; hex meters |
| P4 | `scratchpad/probe4.mjs` | `.touch-gate-*` cascade presence on a route without this component |
| P5 | `scratchpad/probe5.mjs` | computed ink of the gate-active outline |
| P7 | `scratchpad/probe7.mjs` | cold-load behaviour for three `none` colours |
| P8 | `scratchpad/probe8.mjs` | first-click behaviour, plain vs touch-capable desktop |

Scratchpad root: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`.
Server: the live dev server at `http://localhost:9000`.

---

## VERDICT — **DEFECTIVE**

Fifteen findings. Two BLOCKERs, six MAJORs. The strongest is not a style nit and not a
hypothesis: **on any device where `"ontouchstart" in window` is true — every Windows
touchscreen laptop, every touch Chromebook, every Chrome with touch emulation — the first
*mouse* click on every channel slider is silently swallowed.** Measured, both arms, same page.

---

## D-1 · BLOCKER — the first pointer interaction is eaten on every touch-*capable* device, mouse included

**Mechanism.** `useSliderTouchGates.ts:57-68` installs a capture-phase `pointerdown` handler on
every slider wrapper:

```ts
const onPointerDown = (e: PointerEvent) => {
    debug.logEvent(e, `sl:${component}:down`);
    debug.setGauge(`sl.${component}.gate`, gate.isActive.value);
    if (!gate.isTouchDevice) return;          // ← device CAPABILITY, not event MODALITY
    if (!gate.isActive.value) {
        e.stopPropagation();                   // ← swallows the event for ALL pointer types
        gate.handleTouchStart(el, e.clientY);
        …
```

`e.pointerType` is never read. The only guard is `gate.isTouchDevice`, and glass-ui computes that
once, at composable construction, from a legacy capability sniff
(`node_modules/@mkbabb/glass-ui/dist/useTouchGate-B4mzQcHJ.js:20` — `l = typeof window < "u" &&
"ontouchstart" in window`). A capability is not a modality. On a hybrid device the sniff is `true`
forever, so a *mouse* `pointerdown` takes the touch branch, gets `stopPropagation()`d before it
reaches reka's `SliderRoot`, and the slider does not move.

**Reproduction — P8, two contexts, identical 1440×900 viewport, identical mouse gesture** (click at
15% of the R track on `/#/?space=rgb&color=rgb(200 80 40)`):

```json
"plainDesktop": {
  "env": { "ontouchstart": false, "maxTouchPoints": 0 },
  "before":      ["200","80","40","100%"],
  "afterClick1": ["36","80","40","100%"],     ← first click DRIVES
  "firstClickWorked": true
},
"touchCapableDesktop": {
  "env": { "ontouchstart": true, "maxTouchPoints": 1 },
  "before":      ["200","80","40","100%"],
  "afterClick1": ["200","80","40","100%"],    ← first click EATEN
  "afterClick2": ["36","80","40","100%"],     ← second click works
  "firstClickWorked": false, "secondClickWorked": true
}
```

The only difference between the two runs is `hasTouch`. Nothing about the *gesture* changed.

**Why this is a BLOCKER, not an annoyance.** The picker's primary control is a slider. On the
affected device class every user's first interaction with every one of the four channels does
nothing, with no feedback, and the recovery is "click again" — undiscoverable. The tap-to-activate
gate was designed for a touch drag competing with page scroll; it has no business intercepting a
mouse.

**Cure (gestalt, not patch).** The gate's predicate is per-EVENT, not per-DEVICE. Delete the
`isTouchDevice` construction-time sniff from the consumer entirely and gate on
`e.pointerType === "touch"` inside the handler; `pointerType` is exactly the field the Pointer
Events spec provides for this question. That also deletes the second copy of the sniff in this
component (`ComponentSliders.vue:27-28` in the composable's `isTouchDevice` export, consumed as
`spectrumGateIsTouchDevice` at `ComponentSliders.vue:203`) — one predicate, one place. The real
transposition is upstream: `useTouchGate` should take the *event*, not the device, which makes this
a glass-ui RELAY rather than a demo-side condition.

---

## D-2 · BLOCKER — a `none` component (valid CSS Color 4) freezes the console permanently, or blanks the app

CSS Color 4 makes `none` a legal value for any component; this repo's own parser returns it. The
component and its private derived-state module read channels through `channelNumber()`, which
throws on a non-numeric channel (`picker-color.ts:152-158`). There is no guard anywhere on the path.

**The component's own unguarded readers:**

- `ComponentSliders.vue:131` — `return normalizedChannel(model.value.color, component);`
- `ComponentSliders.vue:180-183` — `channelNumber(HSVCurrentColor.value, "s" | "v")` inside `thumbInk`

**Warm path (in-session), P2 — the console wedges silently and forever:**

```
pageerror: PickerColorError: Missing oklch.h
    at channelNumber (…/demo/color-session/picker-color.ts:198:39)
    at …/demo/color-session/useSliderGradients.ts:46:18
    at Array.map (<anonymous>)
    at ComputedRefImpl.fn (…/demo/color-session/useSliderGradients.ts:45:60)
    at refreshComputed (…/vue.runtime.esm-bundler…:550:26)
    at job (…:1656:38)
    at flushPostFlushCbs (…:2021:25)
```

P3 then shows the console never recovers:

```json
"pre":                { meters: ["60.0%","0.1","30.0deg","100.0%"] },
"duringErrs":         ["Missing oklch.h"],
"during":             ["60.0%","0.1","30.0deg","100.0%"],
"afterErrs":          [],
"afterOrdinaryEdit":  ["60.0%","0.1","30.0deg","100.0%"],   ← oklch(80% 0.2 200) IGNORED
"afterSpaceChangeErrs":[],
"afterSpaceChange":   ["60.0%","0.1","30.0deg","100.0%"]    ← space change to rgb IGNORED
```

One `oklch(50% 0.1 none)` and the ramps, the meters, and the rail are dead for the rest of the
session. No error surface, no toast, no reset — the numbers just stop being true. That is worse
than a crash: the instrument lies.

**Cold path, P7 — the whole panel or the whole app dies:**

| URL colour | outcome | strips | console | spectrum |
|---|---|---:|---:|---:|
| `rgb(255 0 0)` (control) | normal | 4 | 1 | 1 |
| `rgb(255 0 0 / none)` | picker pane replaced by an error boundary: *"This panel hit an unexpected error. color_missing_alpha Try again"* | 0 | 0 | 0 |
| `rgb(none 0 0)` | `[Vue warn]: Unhandled error during execution of setup function at <App>` + `pageerror: color_missing_channel` at `useColorPipeline.ts:57` → `App.vue setup` — **`main` innerText is empty**; the app does not boot | 0 | 0 | 0 |
| `oklch(50% 0.1 none)` | same as above | 0 | 0 | 0 |

The cold-boot throw site is upstream (`useColorPipeline`/`App` setup) and is not this component's
line — I record that honestly. But the *warm* throw site, `useSliderGradients.ts:46`, is this
component's private feed (see D-7: it has exactly one consumer), and the component carries the
identical unguarded read at line 131. This is the seat's contribution to the repo's live
`parseCssColor`-adjacent crash class.

**Cure.** `none` is not an error, it is a value with a defined meaning ("this component is
missing / powerless"). The gestalt cure is a total read: `channelNumber` gets a sibling that
returns `number | "none"`, and every consumer decides its own rendering — the ramp uses the
powerless substitution rule, the meter inks an em-dash, the thumb parks at the space's neutral,
`aria-valuetext` says "Hue none". Not a try/catch, not a `?? 0`: a total function. Today's
throwing accessor stays for the places that genuinely require a number, and the picker's render
path stops calling it.

---

## D-3 · MAJOR — hex mode: **all four meters render blank** and every announcement loses its value

**Reproduction — P3, clean load of `/#/?space=hex&color=%23ff8800`:**

```json
"hexMeters": ["", "", "", ""]
"hexRail":   ["RGBα","RGBα","R","R","G","G","B","B"]
```

P1's per-thumb read on the same page:

| aria-label | aria-valuetext | aria-valuenow | meter |
|---|---|---|---|
| `R channel` | `Red` | `1` | `""` |
| `G channel` | `Green` | `0.5333333333333333` | `""` |
| `B channel` | `Blue` | `0` | `""` |
| `ALPHA channel` | `Alpha` | `1` | `""` |

Screenshot of the console in hex mode: `scratchpad/hex-console.png` — the meter column is empty
on all four rows.

**Mechanism — a duplicated computed, one copy of which has the hex guard and the other does not.**
`ComponentSliders.vue:120-125` re-derives the row list locally:

```ts
const componentEntries = computed(() =>
    [
        ...PICKER_CHANNELS[currentColorSpace.value].map((meta) => [meta.key, meta] as [string, unknown]),
        ["alpha", { key: "alpha", min: 0, max: 1, unit: "%" }] as [string, unknown],
    ],
);
```

`currentColorSpace` is `resolveColorSpace(selectedColorSpace)` (`color-model.ts:32-34`), so hex
resolves to `rgb` and four rows render. But the meter's source,
`currentColorComponentsFormatted`, short-circuits in hex (`useSliderGradients.ts:63-68`) to a
single `{ hex: … }` cell — so `meterText`'s lookup (`ComponentSliders.vue:160`) misses on
`r`/`g`/`b`, and its alpha fallback is *explicitly* switched off for hex
(`ComponentSliders.vue:162` — `model.value.selectedColorSpace !== "hex"`). Every row returns `""`
at line 167.

`useSliderAnnouncements` then feeds that `""` into `sliderValueText`, whose documented degradation
is "name alone" (`sliderAnnouncement.ts:80`). So a screen-reader user in hex mode hears **"Red,
slider"** and the only number available to them is the raw `aria-valuenow` `0.5333333333333333` —
which is precisely the failure U-F27/BR-4 exists to prevent. The gate's own stated purpose is
defeated in one of the eighteen selectable spaces.

**And the duplication is itself an edict-2 violation.** The pipeline already publishes the correct
version of this exact computed, *with* the hex guard, at `useColorPipeline.ts:117-122`
(`colorComponents`). The component injects seven members of the pipeline and re-implements the
eighth wrongly. Two paths to one fact, and the live one is the broken one.

**Cure.** Delete the local `componentEntries` and consume the pipeline's `colorComponents`; then
hex renders no channel rows at all (the honest thing — hex has no channels, it has a string), and
the console shows the single hex cell the pipeline already models. That removes the guard
divergence by removing the second guard, not by adding a third.

---

## D-4 · MAJOR — the wrapper map is never pruned: detached DOM retained, listeners re-attached to dead nodes, ARIA written to dead nodes

**Mechanism.** `ComponentSliders.vue:56`:

```
:ref="(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }"
```

Vue calls a function ref with `null` on unmount. The `if (el)` guard *discards that call*, and no
key is ever deleted. Because a colour space's channel key set is not a superset of its
predecessor's (`oklch` → `l,c,h`; `rgb` → `r,g,b`), every key with no counterpart in the new space
keeps pointing at a detached element, forever. Both consumers then iterate the whole map:
`useSliderTouchGates.ts:53` (`Object.entries(sliderWrapperEls.value)` → five `addEventListener`
calls each) and `useSliderAnnouncements.ts:37` (`querySelector` + `setAttribute`).

**Reproduction — P2.** Hold references to the four lab wrappers, change space to rgb in-session,
then edit the colour:

```json
"A_before": [
  { "label":"L channel",     "valuetext":"Lightness 50.0%", "connected": true  },
  { "label":"A channel",     "valuetext":"a axis 20.0",     "connected": true  },
  { "label":"B channel",     "valuetext":"b axis 10.0",     "connected": true  },
  { "label":"ALPHA channel", "valuetext":"Alpha 100.0%",    "connected": true  }
],
"A_afterSpaceChange": [
  { "label":"L channel",     "valuetext":"Lightness",       "connected": false },  ← REWRITTEN while detached
  { "label":"A channel",     "valuetext":"a axis",          "connected": false },  ← REWRITTEN while detached
  { "label":"B channel",     "valuetext":"b axis 10.0",     "connected": false },
  { "label":"ALPHA channel", "valuetext":"Alpha 100.0%",    "connected": false }
]
```

The `l` and `a` thumbs are `connected: false` — removed from the document — **and their
`aria-valuetext` was still rewritten** from "Lightness 50.0%" to "Lightness". A write to a detached
node is only possible if the map still holds it. That is the retention proof. `b` and `alpha`
were *not* rewritten because rgb re-populates those keys, overwriting the entry — which is exactly
the predicted key-collision behaviour and confirms the mechanism rather than contradicting it.

**Bound and cost.** The union of channel keys across the 17 spaces in `PICKER_CHANNELS`
(`picker-color.ts:52-70`) plus `alpha` is 21: `r,g,b,h,s,l,v,w,c,x,y,z,kelvin,i,ct,cp,jz,az,bz,a,alpha`.
So up to twenty detached reka-Slider subtrees are retained, each with five listener closures
capturing `el`, `gate`, and the whole `debug` object. It is bounded — and it is still dead work
executed on every space change and every colour edit for the life of the tab, plus retained DOM
that a heap profile will show as detached forever.

**Cure.** The map is a cache of something Vue already knows. Stop mirroring the DOM: give the
`v-for` row its own tiny child component that owns its wrapper element and registers/unregisters
its own gate in `onMounted`/`onUnmounted` (Vue's own lifecycle is the pruning mechanism). If the
map must survive, the ref callback's null branch must `delete sliderWrapperEls.value[component]` —
but that is the patch, and the per-row component is the transposition, and it also dissolves D-10
and D-11.

---

## D-5 · MAJOR (a11y) — a colour-space change destroys keyboard focus

**Reproduction — P1.** Focus the first channel thumb, change space in-session, read
`document.activeElement`:

```json
"focusAcrossSpaceChange": { "focusedBefore": "R channel", "focusedAfter": "BODY" }
```

**Mechanism.** `ComponentSliders.vue:47` — `:key="animationKey"` on the `.channel-rows` container,
incremented by the watcher at line 143. The key change unmounts the entire row block and mounts a
fresh one; nothing restores focus, so the browser drops it to `<body>`. A keyboard user who
changes space is teleported to the top of the document and must re-traverse the whole page.

Note the re-key is also *over*-broad: `alpha` exists in every space and its slider is remounted
anyway, purely because the container above it is keyed. The per-row `:key="component"` at line 52
already re-keys the rows that genuinely change.

**Cure.** The chassis-persistence law the file's own comment states (lines 20-24) is right and the
implementation contradicts it: keep the container un-keyed and let the row `v-for` key do the
re-keying (which is what the animation actually needs), then restore focus onto the row at the same
index after the patch. The stagger animation the container key is really buying can be re-fired
with an `animationKey`-driven CSS custom property instead of a remount — animations are moved, never
deleted (edict 6), and this moves it.

---

## D-6 · MAJOR (a11y) — the accessible NAME is the ambiguous raw key, in shouting caps

`ComponentSliders.vue:66` — `:aria-label="`${component.toUpperCase()} channel`"`. Measured names
(P1, and independently in the visual audit's own capture — see D-9):

`"L channel"`, `"A channel"`, `"B channel"`, `"ALPHA channel"`.

The sibling module's docblock (`sliderAnnouncement.ts:11-19`) argues the exact case against this:

> The channel key alone is ambiguous — `b` is Blue in rgb, Blackness in hwb, and the b\* axis in
> lab/oklab; `l` is Lightness in hsl but the L\* axis in lab

…and then supplies `channelLabel(space, component)`, which is used **only** for `aria-valuetext`
and never for the accessible name. So the component knows the right words, has them in hand, and
puts the wrong ones in the field a screen reader announces on focus and on every arrow key. Two
voices for one fact, and the authoritative one is the bad one — a direct contradiction of the
"ONE voice" doctrine this file asserts four times in its own comments.

`toUpperCase()` compounds it: assistive tech commonly spells all-caps tokens letter by letter, so
"ALPHA channel" can be read "A-L-P-H-A". Nothing in the design calls for caps in the a11y name;
the visual glyph rail is a separate, already-correct surface (`ConsoleRail.vue:157-170`).

**Cure.** `:aria-label="channelLabel(currentColorSpace, component)"`. One function, already tested,
already imported into this directory. The `" channel"` suffix is redundant with `role="slider"`.

---

## D-7 · MAJOR — the component's private derived state lives in the shared session pipeline, and its throw takes the app with it

`useSliderGradients.ts` produces three values. Their complete consumer sets, by grep:

```
$ grep -rn "componentsSlidersStyle|currentColorComponentsFormatted|currentColorRanges" demo/ \
    --include='*.vue' --include='*.ts' | grep -v "useSliderGradients.ts|useColorPipeline.ts"
demo/picker/ColorPicker.vue:49                     :formatted="currentColorComponentsFormatted"
demo/picker/ColorPicker.vue:205                    currentColorComponentsFormatted,
demo/picker/controls/ComponentSliders/ConsoleRail.vue:75        currentColorRanges[component]
demo/picker/controls/ComponentSliders/ConsoleRail.vue:114       currentColorRanges
demo/picker/controls/ComponentSliders/ComponentSliders.vue:110  currentColorComponentsFormatted
demo/picker/controls/ComponentSliders/ComponentSliders.vue:111  componentsSlidersStyle
demo/picker/controls/ComponentSliders/ComponentSliders.vue:160  currentColorComponentsFormatted.value[component]
demo/picker/controls/ComponentSliders/ComponentSliders.vue:194  componentsSlidersStyle.value[component]
demo/picker/controls/ComponentSliders/ComponentSliders.vue:234  reactiveKey: currentColorComponentsFormatted
```

`componentsSlidersStyle` — **exactly one consumer**, this component.
`currentColorRanges` — **exactly one consumer**, its colocated rail.
`currentColorComponentsFormatted` — two, and its hex branch exists only to serve a *display*
component (D-3's mechanism).

So the ramp state machine is `ComponentSliders`' own private cache, hoisted into the injected
session god-object. Edict 1 ("never add to a god module; focused modules with real
encapsulation") is violated in the direction that costs the most: because it sits in the
pipeline's reactive graph, its throw is not contained to the console — it is the D-2 warm-path
wedge that kills the whole picker.

**Cure.** Move `computeSliderGradients` + `currentColorRanges` into
`ComponentSliders/composables/useChannelRamps.ts`, deriving from the injected model. The pipeline
keeps `currentColorComponentsFormatted` (two consumers, genuinely shared). The blast radius of a
ramp bug then ends at the console — which is the whole point of encapsulation, and is what would
have turned D-2's warm path from "app-wide freeze" into "one component renders a fallback".

---

## D-8 · MINOR — the touch-target extension is gated on the *primary* pointer, not on *any* pointer

`ComponentSliders.vue:345` — `@media (pointer: coarse)`.

Media Queries Level 4 is explicit: `pointer` reports "the presence and accuracy of a pointing
device such as a mouse **that is the primary input mechanism**", while `any-pointer` reports the
same for "any available input mechanism". The file's own comment (lines 342-344) sells the choice
as a virtue — *"Gated on `pointer: coarse` (the input device), never viewport width"* — but the
device is not what `pointer` reports; the *primary* device is.

Consequence on a hybrid (fine primary + touchscreen): `pointer: coarse` is false so the 44px
extension is absent, while the JS gate (which uses `"ontouchstart" in window`) is armed. The user
gets the tap-to-activate cost of D-1 *and* a 12×24 target. **Labelled HYPOTHESIS for the hybrid
case**: Chromium's touch emulation couples `pointer` and `any-pointer` (P8 measured
`pointerCoarse: true, anyPointerCoarse: true` under `hasTouch`), so I could not isolate the
divergence in this harness. The spec reading itself is not a hypothesis.

**Cure.** `@media (any-pointer: coarse)` — one word, and it makes the CSS gate agree with the JS
gate about which devices are touchable. (Under D-1's cure both become per-event and this collapses
into a non-question.)

---

## D-9 · MINOR — 12 CSS px wide thumbs; this component supplies half of `/#/`'s small-tap-target count

Measured thumb boxes (P1): **12 × 24** at 1440×900, **12 × 44** at 390×844 coarse.

The mega-tranche visual audit found the same thing independently — `audit/visual/REPORT.json`,
route `/#/`, matrix `safari-mobile-light`:

```json
{"w":12,"h":44,"tag":"span","label":"L channel"},
{"w":12,"h":44,"tag":"span","label":"A channel"},
{"w":12,"h":44,"tag":"span","label":"B channel"},
{"w":12,"h":44,"tag":"span","label":"ALPHA channel"}
```

and `safari-desktop-light` reports the same four at **12 × 24**. `REPORT.md` counts 8 small tap
targets on `/#/` in each of the four matrices; **four of the eight are this component's thumbs, in
all four matrices — 16 of the 60-capture tally.**

**Honest scoping.** WCAG 2.5.8 (AA, 24×24) carries a spacing exception, and it is met here: the
row pitch measured 43.5 px (`stripTop` 604.33 → 647.83), well clear of the 24 px undisturbed
circle, and the track itself is click-operable. So this is an *ergonomics* finding, not a certain
SC failure — a 12 px grab handle on the application's primary precision instrument. It is
reported because the audit harness counted it and the count is this component's.

**Cure.** The width is the glass-ui `Slider` primitive's, not the demo's — a producer RELAY, not a
consumer override (edict 5: no per-instance overrides of the design system). Book it into the same
v8 packet as the track-background rename.

---

## D-10 · MINOR — the rail is handed a freshly allocated array on every parent render

`ComponentSliders.vue:34` — `:components="componentEntries.map(([c]) => c)"`. A new array identity
every render pass, so `ConsoleRail` sees a changed prop and patches on every reactive tick of a
drag, though its channel list is constant within a space. `ConsoleRail` is not cheap to patch: it
recomputes `restInk` through a live surface probe (`ConsoleRail.vue:130-140`) and `activeInk`
through `contrastInkFor` (`:147-149`).

Compounding it, the `componentEntries` payload is dead: the tuple's second member is built and
cast to `unknown` (`:122-124`) and the only destructure in the template is `v-for="[component] in
componentEntries"` (`:51`). The `as [string, unknown]` casts erase `ChannelMeta` for a value
nothing reads.

**Cure.** `componentEntries` becomes `computed<string[]>` of keys only (which is what both
consumers want), so the identity is stable across renders and the cast disappears with the dead
payload. Under D-3's cure it becomes the pipeline's `colorComponents` and this dissolves too.

---

## D-11 · MINOR — per-render work that is per-space work

`sliderValue()` (`:127`), `meterText()` (`:158`), and `sliderVars()` (`:193`) are plain functions
invoked from the template, so they re-run on every render pass for every row. `sliderVars` rebuilds
an 11-stop gradient string per channel per pass:

```ts
const stops = componentsSlidersStyle.value[component];
const ramp = stops ? `linear-gradient(to right, ${stops.join(", ")})` : undefined;
```

The stops themselves are already memoised by the watcher at `useSliderGradients.ts:49-61`; only
the `join` is repeated, and only because the joined form was never memoised. Four joins × eleven
stops per drag tick is not a Lighthouse event, but it is work that is a function of the space and
is being recomputed as a function of the frame.

**Cure.** One `computed` map `component → styleObject`, rebuilt when the ramps or the thumb ink
change. Under D-4's per-row-component cure each row owns its own computed and this is free.

---

## D-12 · MINOR — two watchers on one source

`ComponentSliders.vue:138` and `:143` both `watch(currentColorSpace, …)`, one clearing
`activeComponent`, one bumping `animationKey`. Two subscriptions, two scheduler entries, one event.
KISS (edict 3). Collapse to one callback.

---

## D-13 · INFO — `aria-live="off"` is a no-op

`ComponentSliders.vue:84`. `off` is the default computed value for any element that is not inside a
live region; the attribute asserts nothing and removes nothing. It reads as a deliberate
suppression that the platform never needed — dead code in the a11y surface.

---

## D-14 · INFO / HYPOTHESIS — the unscoped `<style>` block is the sole definition site of a class two other components consume

`ComponentSliders.vue:238` opens `<style>` with no `scoped`. The comment (lines 244-252) justifies
this for `.touch-gate-target` / `.touch-gate-active`, which `SpectrumCanvas.vue:11-12` and
`ExtractControls.vue:140` also carry. But `.sliders-console`, `.channel-rows`, `.channel-strip`,
`.channel-meter`, and `.channel-slider` are this component's alone and are exported to the global
cascade with them.

`ExtractControls.vue:135-142` re-declares `.touch-gate-target` **scoped**, with only a
`border-radius` — the activation `outline` rules exist nowhere but here. So `/#/extract`'s touch
gate depends on a stylesheet contributed by a component that route never mounts.

**FALSIFIED as a live defect.** P4 built a synthetic `.touch-gate-target` on `/#/extract` (which
has `liveTargets: 0`) and read it:

```json
"extract": { "liveTargets": 0, "outlineWidth": "3px", "outlineStyle": "solid",
             "transition": "outline-color" }
```

The rules are present — the dev server injects every SFC's styles. It remains a latent coupling
under production route-splitting, which I did not build and therefore do not assert. Recorded as a
HYPOTHESIS with a named test: build `gh-pages` and re-run the same probe against the emitted
chunks.

**Also falsified, and recorded so no later seat re-files it:**

- *Coarse-pointer `::before` overhang.* The 44 px hit pseudo (`:345-357`) does **not** bleed into
  neighbouring rows. P1 hit-tested the midpoint of every inter-row gap at 390×844: `gapPx: 6`,
  strip height `44`, `::before` `blockSize: 44px`, and `elementFromPoint` returned
  `div.channel-rows` — the container — at all three gaps and at 2/6/10 px above row 0. No
  wrong-channel taps. The geometry is sound.
- *Gate-active outline computes transparent.* P5's first read of
  `.touch-gate-target.touch-gate-active` returned `oklab(0 0 0 / 0)`, which looks like an invisible
  indicator. It is a measurement artifact of the `transition: outline-color` on line 256 — the
  synchronous read caught t=0. The same `color-mix(in srgb, var(--foreground) 50%, transparent)`
  applied inline on a child of the same element computed `color(srgb 0.11 0.098 0.09 / 0.5)`, and
  the untransitioned `.touch-gate-active .slider-track` box-shadow read
  `color(srgb 0.11 0.098 0.09 / 0.5) 0px 0px 0px 3px inset`. The indicator works.

---

## D-15 · MAJOR — the gates are vacuous: named mutations that keep them green

Complete test surface for this component (`grep -rln` over `test/` and `e2e/`):

```
test/slider-announcement.test.ts
e2e/smoke/a11y-slider-operation.spec.ts
```

**Nothing mounts `ComponentSliders.vue`. Nothing exercises `useSliderTouchGates.ts` or
`useSliderAnnouncements.ts` at all** — so D-1 and D-4 have zero coverage by construction.

`test/slider-announcement.test.ts` imports only the two pure functions from
`sliderAnnouncement.ts`:

```
$ npx vitest run test/slider-announcement.test.ts
 ✓ test/slider-announcement.test.ts (7 tests) 2ms
 Test Files  1 passed (1)   Tests  7 passed (7)
```

> **Vacuous-gate mutation A.** Delete the entire `useSliderAnnouncements({…})` call at
> `ComponentSliders.vue:230-235`. No thumb ever receives an `aria-valuetext`; the U-F27/BR-4
> announcement contract is completely unimplemented. **All 7 tests still pass** — they never touch
> a DOM node.

`e2e/smoke/a11y-slider-operation.spec.ts` drives Home/End/ArrowLeft and asserts `aria-valuenow`
moves. It never reads `aria-valuetext`, never visits hex, never reads a meter, never changes space.

> **Vacuous-gate mutation B.** Make `meterText()` `return ""` unconditionally
> (`ComponentSliders.vue:158`). Every meter in every space renders blank and every announcement
> degrades to the bare channel name — i.e. D-3 generalised from hex to all eighteen spaces. The
> sliders still move, so **the e2e passes**.

> **Vacuous-gate mutation C.** Delete the `pointercancel` / `lostpointercapture` handlers
> (`useSliderTouchGates.ts:76-86, 91-92`) — the entire iOS Safari pointer-capture leak recovery
> this file exists to carry. **Both suites pass.** The regression they were written for is
> unguarded.

**Cure.** Three born-RED gates, each of which fails today:
1. a component test that mounts the console in `hex` and asserts every row's meter is non-empty
   (fails — D-3);
2. a Playwright case in a `hasTouch: true` desktop context asserting the **first** mouse click
   moves the value (fails — D-1, and P8 is the ready-made harness);
3. a component test that switches space and asserts `Object.keys(sliderWrapperEls.value)` equals
   the new space's channel set (fails — D-4).

---

## Edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **VIOLATED** — D-7. The component's private ramp state lives in the injected session pipeline. The 395-line file is also 5 lines under the stated 400-line cap, held there by a comment-to-code ratio of roughly 2:1 (`useSliderTouchGates.ts:3-4` names the cap explicitly) — cap satisfied by lifting, not by cohesion. |
| 2 | No legacy / dual paths | **VIOLATED** — D-3: `componentEntries` duplicates `useColorPipeline.colorComponents` and loses its hex guard. Also two independent touch detections (`gate.isTouchDevice` and the local `isTouchDevice`) for one question. |
| 3 | KISS, no contrivance | **VIOLATED** — D-12 (two watchers, one source); D-10 (dead `unknown`-cast payload); the 8-line inline arrow handler in the template at `:74-81`. |
| 4 | glass-ui is the design system | **HELD** — the Slider is `../../../ui/slider` re-exporting `@mkbabb/glass-ui`; no demo-local variant. D-9's cure is correctly a producer relay. |
| 5 | Root-level styling | **VIOLATED (soft)** — `:266-274`, `:363-394` reach into reka-emitted `.slider-track`/`.slider-thumb` internals from a consumer SFC. The file argues this is the sanctioned seam; it is still a consumer styling a producer's internals, which is what the v8 hold exists to end. |
| 6 | Animations never deleted | **HELD** — `.stagger-children` and the transitions are intact; D-5's cure explicitly moves the stagger rather than removing it. |
| 7 | Idiomatic Vue 3.5 | **VIOLATED** — the DOM-mirroring function ref (D-4) instead of per-row ownership; three template-invoked functions where computeds belong (D-11); `useTemplateRef` unused. `ConsoleRail.vue:103` does use reactive props destructure correctly. |
| 8 | `verbatimModuleSyntax` | **HELD** — `useSliderTouchGates.ts:13,16` and `useSliderAnnouncements.ts:15-22` all use inline/standalone `import type`. The subject SFC imports no types. |

---

## Wave — `W·CS-1` · **BLOCKED-ON-GLASS-V8**

**Status.** BLOCKED. Not one line of this specification may land while the CARRY-LEDGER §D hold
stands. The subject file is byte-identical to its pin
(`a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327`) and must remain so.

**Exact release condition** (CARRY-LEDGER §D, `docs/tranches/V/reformation/CARRY-LEDGER.md:55-73`,
quoted):

> Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`, hold all consumer edits and
> the `@mkbabb/glass-ui` pin until one unique immutable v8 candidate proves exact
> source→built→packed→installed→served equality, is neither a workspace/source link nor mutable
> v7, and survives two unchanged-byte Sol critics.

When that discharges, the ledger authorises exactly one edit here — migrating the property name to
`--glass-slider-track-background`. **W·CS-1 is therefore sequenced strictly after that migration
lands and re-pins**, and is proposed as a distinct wave against the new hash, not folded into the
rename.

**Wave order (each row independently revertible):**

| # | Row | Fixes | Gate |
|---|---|---|---|
| 1 | `e.pointerType === "touch"` replaces the capability sniff; relay the event-shaped predicate to glass-ui `useTouchGate` | D-1 | born-RED Playwright: `hasTouch:true` desktop, first mouse click moves the value |
| 2 | total `none`-aware channel read; ramp/meter/thumb/announcement each render `none` explicitly | D-2 | born-RED: `oklch(50% 0.1 none)` and `rgb(255 0 0 / none)` cold-load with 4 live rows and 0 page errors |
| 3 | delete local `componentEntries`; consume `useColorPipeline.colorComponents` | D-3, D-10 | born-RED: hex renders the single hex cell; no blank meter in any of the 18 spaces |
| 4 | per-row child component owns its wrapper + gate lifecycle | D-4, D-10, D-11 | born-RED: key set after a space change equals the new space's channels |
| 5 | un-key the container; restore focus by row index; stagger via custom property | D-5 | born-RED: `activeElement` after a space change is still a `[role="slider"]` |
| 6 | `aria-label` ← `channelLabel(space, component)` | D-6 | extend `test/slider-announcement.test.ts` to the name path |
| 7 | lift ramps to `composables/useChannelRamps.ts` | D-7 | consumer-count assertion: `componentsSlidersStyle` unreachable from `color-session/` |
| 8 | `any-pointer: coarse`; single watcher; drop `aria-live="off"` | D-8, D-12, D-13 | review |
| 9 | RELAY to glass-ui BJ: thumb hit-box ≥24 px; `aria-valuetext` prop-through | D-9, and retires the DOM patch in `useSliderAnnouncements` | producer packet |

Row 9 also discharges the standing E-relay edict (every glass-ui-level change relayed to the active
BH inbox at root); this seat did not send it — no writes outside its directory.

---

## Strongest defect

**D-1.** On every touch-capable device, the first mouse click on every channel slider is silently
swallowed by an unconditional capture-phase `e.stopPropagation()` that tests a device capability
(`"ontouchstart" in window`) instead of the event's own `pointerType`. Measured in two contexts
differing only by `hasTouch`: first click drives 200→36 without touch, and 200→200 with it.
