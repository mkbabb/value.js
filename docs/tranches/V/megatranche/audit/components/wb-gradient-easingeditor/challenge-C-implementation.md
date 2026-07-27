# CHALLENGE-C — `GradientEasingEditor.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this
seat was explicitly spawned with. Seat declared, not inherited.

---

## Subject and surface read

| file | lines | read |
|---|---|---|
| `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` | 295 | whole |
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` | 215 | whole |
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` | 116 | whole |
| `demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts` | 230 | whole |
| `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts` | 74 | whole |
| `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` | 279 | whole (parent) |
| `demo/workbenches/gradient/composables/useGradientCSS.ts` | 335 | whole |
| `demo/workbenches/gradient/composables/useGradientModel.ts` | 193 | whole |
| `demo/workbenches/gradient/composables/useGradientInterpolation.ts` | 56 | whole |
| `demo/color-session/useContrastSafeColor.ts` | — | whole |
| `node_modules/@mkbabb/glass-ui@7.0.0/dist/composables/dom/useClipboard.{d.ts,js}` | — | whole |
| `e2e/smoke/oracles/o17-easing-composition.spec.ts` | 212 | whole |
| `e2e/smoke/views/gradient.spec.ts` | 329 | easing clauses |

**Verdict: DEFECTIVE.** Two BLOCKERs. The component ships a first-class affordance that
**destroys the entire Gradient pane on one click**, and its own stated geometric invariant
("zero letterbox", O-17) is **dead code** that has been silently violated since the
glass-ui 7.0.0 adopt. Every e2e test that gates this component is currently RED, and none
of them run in CI.

---

## C-1 — BLOCKER · Pressing any `back`-family specimen tile destroys the Gradient pane

### Reproduction (deterministic, default app state, 2 stops)

```
$ node scratchpad/wbge-probe4.mjs linear ease ease-out-back ease-in-back ease-in-out-back steps step-start step-end ease-in-out-expo
linear               rails=["cubic-bezier(0, 0, 1, 1)"]           CRASH=no
ease                 rails=["cubic-bezier(0.25, 0.1, 0.25, 1)"]   CRASH=no
ease-out-back        rails=[] CRASH=["This panel hit an unexpected error.Gradient color mix failed: color_progress_out_of_range Try again"]
ease-in-back         rails=[] CRASH=["This panel hit an unexpected error.Gradient color mix failed: color_progress_out_of_range Try again"]
ease-in-out-back     rails=[] CRASH=["This panel hit an unexpected error.Gradient color mix failed: color_progress_out_of_range Try again"]
steps                rails=["steps(4, jump-end)"]                 CRASH=no
step-start           rails=["steps(1, jump-start)"]               CRASH=no
step-end             rails=["steps(1, jump-end)"]                 CRASH=no
ease-in-out-expo     rails=["cubic-bezier(1, 0, 0, 1)"]           CRASH=no
```

Manual equivalent: open <http://localhost:9000/#/gradient> → the easing row `1 → 2` is open
on arrival → click the `back` family's `out` tile. The **whole pane** is replaced by
`ErrorBoundary`; the stop rail, interpolation controls, easing bench and CSS editor all
vanish. "Try again" remounts and recovers, but every gradient edit in the pane is lost
(probe 7: `after tile press {"crash":1}` → `after Try again {"crash":0,"heads":1}`).

The crash is **not** limited to the 3 tiles. Dragging the picker's own control point above
`y = 1` reproduces it too (probe 6, drag of `[aria-label='Bezier control point 2']` 90px
upward):

```
AFTER DRAG: {"literal":null,"crash":["This panel hit an unexpected error.Gradient color mix failed: color_progress_out_of_range Try again"]}
```

The producer's own sr-only instructions on that canvas read *"Up and Down change y from
**-0.6 to 1.6**"* (measured DOM, probe 5) — i.e. the authoring surface advertises a y-range
that is **2.2× wider than the range the consumer can survive**.

### Mechanism

Overshoot cubic-béziers are `f(t) ∉ [0,1]` by construction. Measured against the exact
sampling grid the model uses (`vite-node scratchpad/bench.mts`, importing the real
`src/subpaths/easing`):

```
ease-in-back       quad=[0.6,-0.28,0.735,0.045]  min=-0.0969@t0.344 max=1.0000  out-of-[0,1] samples=18/33  fn(0.5)=-0.0636
ease-out-back      quad=[0.175,0.885,0.32,1.275] min= 0.0000        max=1.0868@t0.625 out-of-[0,1] samples=19/33  fn(0.5)= 1.0676
ease-in-out-back   quad=[0.68,-0.55,0.265,1.55]  min=-0.0923@t0.188 max=1.0927@t0.781 out-of-[0,1] samples=21/33  fn(0.5)= 0.6067
ease-in-out-expo   quad=[1,0,0,1]                                                     out-of-[0,1] samples=0/33
```

`mixColors` **rejects** progress outside `[0,1]` — `src/color/operations.ts:88`:

```ts
if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
```

There are **three** unclamped call sites that feed an easing output straight into it, all
reachable from this component:

1. `demo/workbenches/gradient/composables/useGradientCSS.ts:199-208` — `sampleCoalescedStops`
   ```ts
   const easedT = easing(t);
   ...
   const mixed = mixColors(c0, c1, easedT, { space: interpolationSpace, hue: hueMethod });
   if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
   ```
   Reached from `openIntervalRamp` (`GradientEasingEditor.vue:63-67` →
   `serializeIntervalRamp`), from `coalescedCSS`, and from `railRampCSS`.
2. `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts:52-59` — the
   per-row ink derivation calls `interpolateStopColors(..., fn(0.5), ...)`.
   `fn(0.5) = 1.0676` for `ease-out-back` and `-0.0636` for `ease-in-back` (measured above),
   so **this site throws independently** for two of the three tiles.
3. `demo/workbenches/gradient/GradientVisualizer.vue:78-85` — `colorAtPosition`'s `easedT`,
   which feeds the stop rail's add-ghost.

The catalogue offers these curves by **blind enumeration** — `easingCatalogue.ts:178`
`for (const name of Object.keys(bezierPresets))` — with no compatibility filter, and
`GradientEasingEditor.onTileSelect` (`:73-76`) emits the payload with no validation. The
library's `bezierPresets` is a *motion* catalogue; three of its entries are structurally
inadmissible as *color-ramp* progress, and nothing in the chain says so.

### Proposed cure (architectural, not a patch)

Progress into a color mix is a **ratio on `[0,1]`** — that is the domain, and the sampling
law is the one place that owns it. Clamp at the single chokepoint rather than at three call
sites: give `useGradientCSS` a private `rampProgress = (t: number) => Math.min(1, Math.max(0, t))`
and route `sampleCoalescedStops`'s `easedT`, `useSpecimenRows`'s `fn(0.5)`, and
`colorAtPosition`'s `easedT` through it. This is what CSS itself does — an overshoot timing
function on a `<color>` interpolation clamps to the endpoint colour; the overshoot remains
visible in the *glyph* (which samples the raw callable and needs no clamp) and in the
*authoring canvas*, which is exactly the honest split. Do **not** delete the `back` family
from the catalogue: the curves are legitimate and the picker authors them freely; the
defect is the missing domain boundary, not the curves.

---

## C-2 — BLOCKER · The "zero letterbox" law is dead code; the canvas is 59% dead space

`EasingAuthoringStage.vue` declares three seat laws in its header block. Law 3 — the O-17
oracle's whole subject — is **entirely non-functional against glass-ui 7.0.0**.

### The broken coupling

`EasingAuthoringStage.vue:47-53`:

```ts
function syncVbRatio() {
    const vb = rootEl.value?.querySelector<SVGSVGElement>(
        "svg[role='img']",
    )?.viewBox.baseVal;
    if (!vb || vb.width <= 0 || vb.height <= 0) return;
    vbRatio.value = vb.height / vb.width;
}
```

and `:104-115`:

```css
.easing-authoring :deep(svg[role="img"]) {
    inline-size: min(100%, 19rem);
    block-size: auto !important;
    aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
    ...
}
```

**glass-ui 7.0.0's `EasingPicker` renders its canvas as `role="group"`, not `role="img"`.**
Measured live DOM (probe 5, `#easing-authoring-0`):

```json
{"svgCount": 2,
 "svgs": [{"role": "group", "aria": "Easing curve 1 → 2",
           "cls": "block w-full touch-none select-none",
           "viewBox": "0 -0.1 1 1.2000000000000002", "box": {"w": 410, "h": 200}}],
 "stageStyleAttr": "--vb-ratio: 1.2;"}
```

So: the `querySelector` matches nothing → `syncVbRatio()` returns on its first line, every
time → `--vb-ratio` is frozen at the seeded literal `1.2` (`:45`) forever. And the
`:deep(svg[role="img"])` block, `!important` and all, selects **nothing**.

### The measured consequence

Probe 6 reproduces O-17's own `getScreenCTM` measurement on the live canvas:

```json
{"elementBox": {"w": 410, "h": 200},
 "drawnPlot":  {"w": 166.7, "h": 200},
 "letterbox":  {"left": 121.7, "right": 121.7, "top": 0, "bottom": 0},
 "vb": {"x": 0, "y": -0.1, "w": 1, "h": 1.2},
 "vbRatioVar": "1.2",
 "svgComputed": {"aspectRatio": "1 / 1", "blockSize": "200px", "inlineSize": "410px"},
 "gridCols": "436px", "cardShadow": "none", "cardBackdrop": "none"}
```

- computed `aspect-ratio` is `1 / 1` — the **producer's inline value**, not the seat's
  `calc(1 / 1.2)`; computed `block-size` is `200px` — the **producer's clamp**
  (`clamp(200px, 38cqi, 320px)`), not the seat's `auto`.
- **121.7 px of dead space on each side of a 410 px canvas — 59.4 % of the canvas width
  renders nothing.** O-17's clause 1 requires ≤ 1 px on all four edges.

Laws 1 and 2 *do* still hold (`gridCols: "436px"` — single column; `cardShadow: "none"`,
`cardBackdrop: "none"`), because they key on `[data-testid="easing-picker"]` and
`.glass-card`, which survived the adopt. Only the `role`-keyed law broke — and it broke
**silently**: no console error, no failing type, no visible exception. The component's own
comment ("the producer's inline fixed-clamp carries the specificity, so the seat overrides
carry `!important`") documents a fight the seat is no longer even in.

### Proposed cure

The defect is not the selector string; it is that a **consumer is reaching into a
producer's private DOM to correct the producer's geometry**, with a hand-rolled rAF mirror
of an attribute the producer already owns. Two moves, in order of preference:

1. **Retire the seat override entirely** and take the geometry from glass-ui: the picker
   should expose its live viewBox ratio as a CSS custom property on its own root (a
   `--easing-vb-ratio` alongside the `--easing-curve-accent` it already stamps — measured in
   the live DOM), and size its canvas from it. The component header already books this as
   "the overrides retire at the P7 adopt"; the adopt has happened (`@mkbabb/glass-ui@7.0.0`
   installed, W44 closed). This is the glass-ui-first edict: the fix belongs upstream.
2. If the producer packet cannot land now, the *interim* seat must not be able to break in
   silence. Bind to the picker's stable contract (`[data-testid="easing-picker"] svg[viewBox]`)
   **and** make the miss loud — `syncVbRatio` should `console.error` when the query fails
   rather than `return`, so the next producer bump surfaces on the first boot instead of in
   an audit two tranches later.

---

## C-3 — MAJOR · Every gate covering this component is RED, and none of them run in CI

### The gates are red

```
$ npx playwright test e2e/smoke/oracles/o17-easing-composition.spec.ts --project=smoke
  3 failed
    O-17 zero letterbox across curve regimes — desktop
    O-17 zero letterbox across curve regimes — 390
    O-17 composition: stamps, dot rest, one-literal, mint law

  Error: expect(locator).toBeVisible() failed
  Locator: ...locator('#easing-authoring-0 svg[role=\'img\']')
  Error: element(s) not found
    at discloseAuthoring (e2e/smoke/oracles/o17-easing-composition.spec.ts:52:23)
```

```
$ npx playwright test e2e/smoke/views/gradient.spec.ts --project=smoke -g "easing row carries its live ramp"
  1 failed
  Error: expect(locator).toContainText(expected) failed
    Expected substring: "steps(4, end)"
    Received string:    "steps(4, jump-end)"
    at e2e/smoke/views/gradient.spec.ts:292:62
```

4 of 4. The O-17 helper dies on the same dead `svg[role='img']` selector as C-2 — the
oracle and the component share the bug, so the oracle could never have caught it. The
gradient view spec has drifted on the steps literal: `easingCatalogue.ts:187` mints
`stepsTile("steps", "n = 4", 4, "jump-end")` → `steps(4, jump-end)`, while the spec still
asserts the pre-rename `steps(4, end)`.

### The gates are not wired

```
$ ls .github/workflows/
ci.yml  deploy-pages.yml  release.yml
$ grep -rn "e2e\|playwright" .github/workflows/
(no output)
```

`ci.yml`'s producer job is `npm ci` → `npm run lint` → `vue-tsc -p tsconfig.lib.json` →
`vue-tsc -p tsconfig.demo.json` → `npm run build` → `npm test` → pack/verify. `npm test` is
vitest, whose include globs are `test/**/*.ts, demo/test/**/*.ts` (observed in the vitest
run output). **Zero vitest files reference this component**:

```
$ grep -rln "specimen|SpecimenStrip|EasingEditor|easingCatalogue|useSpecimenRows|glyphPath|tileIdFor" test e2e demo
test/picker-blob-config.test.ts        (unrelated — "specimen" in prose)
test/gradient-v4-consume.test.ts       (unrelated — "specimen" in prose)
e2e/smoke/oracles/o17-easing-composition.spec.ts
e2e/smoke/views/gradient.spec.ts
… (the rest are demo/ sources)
```

### The vacuous-gate mutation

Delete the entire `back` family from `FAMILY_ORDER` (`easingCatalogue.ts:174`) — or, in the
other direction, ship C-1's crash — and **every gate in CI stays green**, because CI runs
no browser at all. Sharper still: mutate `glyphPath`'s `const y = 1 - fn(t)` to `const y = fn(t)`
(inverting every portrait in the catalogue and every head glyph) and nothing anywhere —
vitest, tsc, lint, build — changes colour.

### Proposed cure

The e2e suite is not a gate if it is not in the pipeline. Add a `demo / e2e` job to
`ci.yml` running `npx playwright install --with-deps chromium webkit` + `npx playwright test`,
and fix the two stale assertions in the same wave so the job lands green. Until then, the
O-17 oracle document should be read as an *aspiration*, not a certification — three of the
four `GREEN` claims about this component in the record rest on tests that have never run
under CI.

---

## C-4 — MAJOR · Interval identity is positional; a mid-ramp stop insert re-hosts every downstream curve

### Reproduction

```
$ node scratchpad/wbge-probe9.mjs
BEFORE insert: {"heads": ["1 → 2linear", "2 → 3ease-in-out-expo"],
                "stops": ["Gradient stop at 0%", "Gradient stop at 50%", "Gradient stop at 100%"],
                "open": ["easing-interval-1"], "tune": ["false","true"]}
AFTER  insert: {"heads": ["1 → 2linear", "2 → 3ease-in-out-expo", "3 → 4linear"],
                "stops": ["Gradient stop at 0%", "Gradient stop at 24%",
                          "Gradient stop at 50%", "Gradient stop at 100%"],
                "open": ["easing-interval-1"], "tune": ["false","true"]}
```

`ease-in-out-expo` was authored for the interval **50 % → 100 %**. After clicking the stop
bar at 24 %, that curve is still on row `2 → 3` — which now means **24 % → 50 %**. The
interval it was authored for is now row `3 → 4`, silently reset to `linear`. The user's
work moved to a different pair of colours without a word.

The accordion's disclosure state follows the same broken key: `open` stays
`easing-interval-1` and `tune` stays `[false, true, …]`, so the open row and its disclosed
authoring stage are now pointed at an interval the user never opened.

### Mechanism

`useGradientModel.ts:89-100` — the interval sync watch is **append/truncate only**:

```ts
watch(() => stops.value.length, (len) => {
    const needed = Math.max(0, len - 1);
    while (intervals.value.length < needed) intervals.value.push(linearInterval());
    if (intervals.value.length > needed) intervals.value.length = needed;
});
```

while `addStop` (`:116-120`) inserts **positionally sorted** and `removeStop` (`:122-125`)
filters by id. Any edit that is not at the tail shifts the stop↔interval correspondence by
one, and the watch — which only sees `.length` — cannot know where.

`GradientEasingEditor` then keys **all** of its own UI state on the same positional index:
`openInterval` (`:61`), `tuneOpen` (`:84`), `copiedIndex` (`:95`), the DOM ids
`easing-interval-${row.index}` / `easing-authoring-${row.index}` (`:145`, `:205`), and the
`update-interval` emit payload (`:49`).

### Proposed cure

Give the interval a **stable identity derived from the pair it spans**, not from its
ordinal. The stop already carries a `uid()` (`useGradientModel.ts:66-69`); make the interval
key `` `${leftStopId}` `` and hold intervals in a `Map<string, GradientInterval>` keyed on
the left stop's id. Insertion then splits an interval instead of shifting a list: the new
stop's own key gets a fresh `linearInterval()`, every existing key keeps its curve, and
removal drops exactly one entry. `GradientEasingEditor` keys its accordion, disclosure,
`v-for`, DOM ids, and emit on that same id — which is also the correct `:key` for the
`v-for` (it currently uses `row.index`, so Vue reuses row DOM across a shift, which is
precisely why the disclosure state appears to "stick" to the wrong interval).

---

## C-5 — MAJOR · Every accordion row mounts in full, though only one can ever be shown

The row body is `v-show` (`GradientEasingEditor.vue:144`), and the authoring stage's `v-if`
(`:208`) guards only `intervals[row.index]` — always truthy. So an *N*-interval gradient
mounts *N* specimen strips and *N* live `EasingPicker` instances, of which the accordion can
display exactly **one**.

Measured (probe 1 / probe 2, Chromium 1440×900, `/#/gradient`):

| | 2 stops (1 interval) | 5 stops (4 intervals) | Δ |
|---|---|---|---|
| `document.querySelectorAll("*")` | **511** | **1109** | **+598** |
| `<button>` | 53 | 149 | +96 |
| `[data-specimen]` tiles | 27 | 108 | +81 |
| `[data-testid=easing-picker]` | 1 | **4** | +3 |
| rows with `display !== none` | 1 | **1** | 0 |

**~199 elements and 32 buttons per row, 75 % of them permanently invisible** at 4 intervals.
Three fully-wired `EasingPicker` instances — each with drag handlers, its own curve
sampling, and a `useMediaQuery` matchMedia subscription per strip
(`EasingSpecimenStrip.vue:47`) — exist solely to be `display:none`.

The cost is measurable on an unrelated interaction. 120 `ArrowRight` presses on the
**Direction** slider (CDP `Performance.getMetrics` deltas, probe 8):

```
1 interval : {"scriptMs": 13.9, "layoutMs": 20.7, "recalcMs": 191.6}
4 intervals: {"scriptMs": 16.9, "layoutMs": 26.1, "recalcMs": 258.0}
→ script/tick 0.116 ms → 0.141 ms (+22 %) · style recalc +34.7 % · layout +26 %
```

Three hidden accordion rows raise style-recalc cost by **35 %** while the user drags a
control that cannot affect any of them.

The `v-show` choice is *documented* (`:16-18`: "Picker instances stay ALIVE (v-show, never
v-if) … no remount/echo discipline") and the reasoning is sound for the **open** row —
remounting a picker mid-authoring would echo. But it does not justify mounting rows that
have never been opened.

### Proposed cure

Keep the alive-once-opened property without the eager fan-out: mount a row's body on first
disclosure and keep it thereafter. `v-if="everOpened.has(row.id)"` wrapping the existing
`v-show` gives exactly the stated invariant (no remount, no echo) at one-row cost on
arrival. The authoring stage deserves the same treatment keyed on `tuneOpen` — a user who
never presses the sliders icon should never pay for an `EasingPicker`.

---

## C-6 — MINOR · The specimen rows recompute on `type` and `direction`, which cannot affect them

`useSpecimenRows` (`:42-72`) reads `modelState()` wholesale, and `modelState`
(`useGradientModel.ts:102-109`) is a monolithic object recreated whenever **any** of
`type`, `direction`, `stops`, `intervals`, `interpolationSpace`, `hueMethod` changes. A
`SpecimenRow` depends on none of `type`/`direction`. Same for `openIntervalRamp`
(`GradientEasingEditor.vue:63-67`), which re-runs a full `sampleCoalescedStops`
(2 × `parseColorIn` + 33 × `mixColors`) per direction tick.

Per recompute, per row: `glyphPath(fn)` = 49 easing evaluations + 98 `toFixed(3)` +
string build — measured **13.2 µs/call** (`vite-node scratchpad/bench.mts`,
`glyphPath(48) ×20000 = 265.0 ms`); plus `interpolateStopColors` (2 parses + 1 mix);
plus `tileIdFor`'s linear scan over 27 tiles; plus `safeCss` → `certifyAccentInk`'s WCAG
floor walk. The +22 % script/tick scaling with interval count measured in C-5 is this
coupling, observed.

Absolute cost is small (0.14 ms/tick at 4 intervals), so this is MINOR — but it is pure
waste and it is the kind of coupling that stops being cheap the moment interval counts or
per-row work grow.

### Proposed cure

`modelState` is doing double duty as *the serializer's input* and *the reactivity graph*.
Pass the specimen derivation only what it consumes: `useSpecimenRows(() => stops, () => intervals,
() => interpolationSpace, () => hueMethod)`. Then `type`/`direction` cannot reach it, and
the same narrowing applies to `serializeIntervalRamp`, which already builds its own `sub`
model with `type: "linear", direction: 90` hardcoded (`useGradientCSS.ts:243-244`) — it
demonstrably does not want those fields.

---

## C-7 — MINOR · A failed copy is silent, and the successful one is never announced

`GradientEasingEditor.vue:100-103`:

```ts
async function copyLiteral(index: number, css: string) {
    copiedIndex.value = index;
    await copy(css);
}
```

The `CopyResult` is **discarded** and no `onCopyError` is passed, though
`useClipboard`'s typed surface returns `{ ok: false, reason: "clipboard-api" | "no-api" }`
precisely so a caller can react. On failure the button simply keeps showing the `Copy`
glyph; the user gets no signal that the clipboard write was refused (the only trace is a
`console.warn` inside glass-ui).

On success, confirmation is an `aria-label` swap on the button that currently has focus
(`:181` — `copiedRow === row.index ? 'Copied' : \`Copy ${row.css}\``). Renaming a focused
control is not a reliable announcement in any major screen reader. Measured on the live
route (probe 1): **`document.querySelectorAll("[aria-live]").length === 0`** — the gradient
route has no live region at all, while the house idiom exists elsewhere
(`demo/palettes/browser/admin/PaginationBar.vue:17` uses `aria-live="polite" aria-atomic`,
`demo/color-picker/ErrorBoundary.vue:20` uses `role="alert"`).

### Proposed cure

One polite live region per bench, owned by the editor root, fed by the *existing*
`copyStatus` — `success` → "Copied <literal>", `failure` → "Copy failed — clipboard
unavailable". One node, no new component, no new directory, and it covers both the silent
failure and the unannounced success with the same wire.

---

## C-8 — MINOR · The seat styles the producer's private internals; one override is now dead

`EasingAuthoringStage.vue` carries three `:deep()` blocks (`:88`, `:93`, `:104`), two
`!important` declarations, and a hardcoded `.fading-scroll` DOM contract in the sibling
strip (`EasingSpecimenStrip.vue:60`). The header books all three as temporary — *"the
overrides retire at the P7 adopt"*. `@mkbabb/glass-ui@7.0.0` is installed (verified:
`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → `7.0.0`) and
the W44 adopt has closed. They have not retired; one of them (C-2) is now dead code that
silently drops the seat's stated geometric invariant.

This is a straight reading of edicts 2 (no legacy code), 4 (glass-ui is the design system —
variants and primitives belong there) and 5 (style at the root component level, never
per-instance overrides). The consumer is compensating for producer chrome from the outside,
across a version boundary that already moved once underneath it.

`.fading-scroll` *does* still exist in glass-ui 7 (`dist/fading-scroll-DhxXIhm2.js:84`
emits `class: ["fading-scroll", …]`), so the strip's scroll-reveal is intact — but it is the
same category of coupling and the same silent-failure mode.

---

## C-9 — MINOR · `toggleTune` clones the whole record on every press; Vue 3 does not need it

`GradientEasingEditor.vue:84-88`:

```ts
const tuneOpen = ref<Record<number, boolean>>({});
function toggleTune(index: number) {
    tuneOpen.value = { ...tuneOpen.value, [index]: !tuneOpen.value[index] };
}
```

`ref({})` is deep-reactive; adding or flipping a key on the returned proxy triggers the
template dependency Vue registered on the missing-key read. The spread is a Vue-2-era
reflex — a fresh object allocation and full re-render trigger per press for no gain
(edict 3, KISS/no contrivance). `tuneOpen.value[index] = !tuneOpen.value[index]` is exact.

The record is also never pruned when `intervals` shrinks, so stale `true` entries persist
for indices that later denote different intervals — the same positional-identity hazard as
C-4, and it disappears with C-4's cure.

---

## C-10 — MINOR · Two rAFs are scheduled per authoring emission for identical work

`EasingAuthoringStage.vue:57-67`:

```ts
function onAuthored(v: EasingPickerValue | undefined) {
    requestAnimationFrame(syncVbRatio);   // ← 1
    emit("authored", v);
}
onMounted(syncVbRatio);
watch(() => value.css, () => requestAnimationFrame(syncVbRatio), { flush: "post" }); // ← 2
```

Every emission runs `onAuthored` (rAF #1), which emits, which updates the parent's interval,
which changes the `value.css` prop, which fires the watcher (rAF #2). Both callbacks do the
same DOM query and the same write. During a control-point **drag** this is two redundant
rAF-scheduled DOM queries per pointer-move. Neither handle is retained, so neither can be
cancelled on unmount (currently harmless — `syncVbRatio` is null-guarded via `rootEl.value?.`).

This is not a PRM-RAF epidemic site (no loop, no self-rescheduling), and it is currently
masked by C-2 making `syncVbRatio` a no-op — but it will become live work the moment C-2 is
cured. The watcher alone is sufficient: `value.css` changes on every geometry change, which
is exactly the stated trigger set.

---

## C-11 — INFO · The readout-rail buttons sit exactly on the WCAG 2.5.8 floor

Measured (probe 1, 1440×900):

```json
"railBoxes": [{"w": 24, "h": 24, "label": "Copy cubic-bezier(0, 0, 1, 1)"},
              {"w": 24, "h": 24, "label": "Author a custom curve"}]
```

`24.00 × 24.00` CSS px — `.rail-btn { padding: 0.3125rem }` (5px) + a `w-3.5 h-3.5` icon
(14px). WCAG 2.2 SC 2.5.8 (Target Size, Minimum, AA) requires ≥ 24×24; this passes by
**equality, with zero margin**. Any future icon-size or padding token shift breaks it. The
two buttons are 6px apart (`gap-1.5`), so the spacing exception would not rescue them.

For the record: the specimen tiles measure 45.2×43.8 and 44.0×43.8 — comfortably clear.

---

## C-12 — INFO · Unbounded module-level easing cache

`useGradientCSS.ts:69` — `const resolvedEasingCache = new Map<string, EasingFunction>();`
has no eviction and no size cap. It is only reached for literal-only intervals
(`easingFnOf` short-circuits on `interval.fn`, which authored intervals always carry), so
growth is bounded by the number of distinct easing literals ever parsed from pasted CSS —
small in practice, unbounded in principle. Contrast `useContrastSafeColor.ts`'s
`tintLCache`, which does cap itself (`if (tintLCache.size > 512) tintLCache.clear()`).

---

## Negative proofs — hazards checked and found ABSENT

The brief names specific local hazards. Each was checked; these are clean, and I record
them so the next seat does not re-spend the probes.

1. **The copy state machine is SOUND.** The obvious cross-row false-tick — `copiedIndex.value = index`
   executing before `await copy(css)` while a *previous* row's `status` is still `"success"` —
   **cannot occur**. `glass-ui/dist/useClipboard-D36OTaeT.js:41` sets `a.value = "pending"`
   *synchronously* at the top of `copy()`, before its first `await`, so `copyStatus` has
   already left `"success"` inside the same tick in which `copiedIndex` is written. No render
   can observe the intermediate state. `copiedRow` (`:96-98`) is a correct gate.
2. **No `defineModel` in this component.** `openInterval`, `tuneOpen`, `copiedIndex` are
   local `ref`s; the parent binds one-way props + an `update-interval` emit. The
   `WritableComputedRef` stale-read hazard has no purchase here.
3. **No rAF loop.** The only `requestAnimationFrame` calls (`EasingAuthoringStage.vue:58, 65`)
   are one-shots that never reschedule. Not a PRM-RAF epidemic site.
4. **No WebGL, no canvas, nothing on the critical path** — the component is inert until the
   Gradient view is opened.
5. **No `ValueUnit` wrapping** anywhere in the subject or its composables.
6. **No reka-ui slider** in this subtree; the pointer-capture-leak class does not apply.
   (The direction slider lives in the parent `GradientVisualizer`.)
7. **`verbatimModuleSyntax` is clean.** All type-only imports across the four files use
   `import type`: `EasingPickerValue` (`:30`), `SpecimenTile` (`:34`),
   `GradientInterval/GradientModelState/GradientStop` (`:36-40`), `ComputedRef`
   (`useSpecimenRows.ts:12`), `EasingFunction/JumpPosition/BezierPoints/EasingPickerValue/JumpTerm/GradientInterval`
   (`easingCatalogue.ts:27-36`), `SpecimenTile` (`EasingSpecimenStrip.vue:16`),
   `EasingPickerValue` (`EasingAuthoringStage.vue:30`).
8. **Not a god module.** 295 lines with a genuine `easing/` extraction (catalogue,
   derivation composable, two child components). Edict 1 satisfied.
9. **The route's one nameless button is not ours.** The visual REPORT records
   `namelessButtons: 1` on `/#/gradient` in all four matrices. Located (probe 10): it is a
   `.dock-icon-button.dock-icon-button--compact`, `closest("[id^='easing-interval-'], .interval-head")`
   → `false`. This component contributes **zero** nameless buttons.
10. **The route's 6 small tap targets are not ours.** REPORT.json rows for `/#/gradient`:
    a 160×23 unlabelled `input` and three 22×22 dock slug buttons (`Switch to slug`,
    `Generate new slug`, `Cancel`), plus two 20×20 `Gradient stop at 0%/100%` handles from
    `GradientStopEditor`. None from this component (see C-11 for the exact-floor note).
11. **`aria-expanded` / `aria-controls` wiring is correct** on both the row head (`:120-121`)
    and the tune button (`:191-192`), and both point at ids that exist. Measured: closed rows
    are `display: none`, so the ~27-name duplication per additional row is invisible to AT —
    only the open row's names are exposed. Not a finding.
12. **No horizontal overflow, no page errors, no console errors** on `/#/gradient` in any of
    the four Safari matrices (REPORT.json: `overflowX: 0`, `consoleErrors: []` for all four
    rows). The C-1 crash is interaction-gated and the capture harness never presses a tile.

---

## Ranked summary

| id | sev | defect | evidence |
|---|---|---|---|
| C-1 | **BLOCKER** | 3/27 specimen tiles + any overshoot drag destroy the whole Gradient pane (`color_progress_out_of_range`) | probe 4/6/7 output; `src/color/operations.ts:88`; measured out-of-range sample counts |
| C-2 | **BLOCKER** | Zero-letterbox law is dead code vs glass-ui 7 (`svg[role='img']` → `role="group"`); 121.7 px dead space per side | probe 5/6 measured DOM + `getScreenCTM` |
| C-3 | MAJOR | 4/4 e2e gates RED; **no playwright step in CI at all** | playwright runs; `grep -rn "e2e\|playwright" .github/workflows/` → empty |
| C-4 | MAJOR | Positional interval identity — a mid-ramp insert re-hosts every downstream curve and the disclosure state | probe 9 before/after |
| C-5 | MAJOR | Every accordion row mounts in full: 511 → 1109 elements, 1 → 4 `EasingPicker`s, 1 row visible; +35 % style recalc | probe 1/2/8 |
| C-6 | MINOR | Specimen rows + interval ramp recompute on `type`/`direction` | `useGradientModel.ts:102-109`; +22 % script/tick (probe 8); 13.2 µs/glyph |
| C-7 | MINOR | Copy failure silent, success unannounced, zero `aria-live` on route | `:100-103`; probe 1 `liveRegions: 0` |
| C-8 | MINOR | Consumer styles producer internals; one override now dead (edicts 2/4/5) | `EasingAuthoringStage.vue:88,93,104`; glass-ui 7.0.0 |
| C-9 | MINOR | `toggleTune` record-clone contrivance; `tuneOpen` never pruned | `:84-88` |
| C-10 | MINOR | Two rAFs per authoring emission for identical work | `EasingAuthoringStage.vue:57-67` |
| C-11 | INFO | `.rail-btn` exactly 24×24 — WCAG 2.5.8 floor, zero margin | probe 1 |
| C-12 | INFO | Unbounded module-level `resolvedEasingCache` | `useGradientCSS.ts:69` |

**Strongest defect: C-1.** A user opening the Gradient workbench sees the easing row open
by default with a 27-tile catalogue in front of them. Three of those tiles — an eighth of
the gallery, and the three most visually distinctive portraits in it — delete the entire
pane on a single click. Nothing in CI can see it, because CI runs no browser.

### Probe artefacts

All probes are read-only Playwright/vite-node scripts in the session scratchpad
(`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`):
`wbge-probe1.mjs` (baseline DOM census), `wbge-probe2.mjs` (multi-interval census),
`wbge-probe3.mjs` (crash isolation), `wbge-probe4.mjs` (per-tile crash matrix),
`wbge-probe5.mjs` (authoring-stage DOM), `wbge-probe6.mjs` (letterbox geometry + overshoot
drag), `wbge-probe7.mjs` (crash recoverability), `wbge-probe8.mjs` (CDP differential
perf), `wbge-probe9.mjs` (interval-identity repro), `wbge-probe10.mjs` (nameless buttons),
`bench.mts` (easing range + glyph cost). No repository source was modified.
