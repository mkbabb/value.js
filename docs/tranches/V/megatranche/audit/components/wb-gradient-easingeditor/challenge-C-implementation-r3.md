# CHALLENGE-C (round 3) — `GradientEasingEditor.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat, as explicitly declared at spawn. Declared, not inherited.

> **Filename note.** `challenge-C-implementation.md` (r1, 2026-07-27) and
> `challenge-C-implementation-r2.md` (2026-07-28) already exist here. This round is written as
> `-r3`, following the convention this directory already carries (`challenge-D-design-r3.md`,
> `challenge-L-library-r4.md`) rather than overwriting prior evidence. My brief named the base
> path; I read r1 and r2 only **after** completing my own independent investigation, so
> everything below marked CONFIRMS was reached without reference to them.

> **Substrate note.** The brief cites HEAD `c654824e`. Actual HEAD at execution is **`fe8785e5`**
> on branch `tranche-u`. All findings are against `fe8785e5`.

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, both independently reproduced this round; four new findings r1 and
r2 did not report. The two blockers are the same failure twice: **a seam crossed without a
contract.**

### Delta ledger against r1 / r2

| id | status | finding |
|---|---|---|
| R3-1 | **CONFIRMS** r1 C-1 / r2 C2-1, three fresh live runs | 3 of 30 catalogue tiles destroy the whole app, silently |
| R3-2 | **CONFIRMS + extends** r1 C-2 | the zero-letterbox law is inert; **r3 adds the producer-side cause** (`preserveAspectRatio: "xMidYMid meet"`) turning r1's snapshot into a predictive formula |
| R3-3 | **CONFIRMS** r1 §gates | `o17` 3/3 RED, all three at line 52 — and therefore **vacuous for every clause after it** |
| R3-4 | **NEW** | multi-interval scale: 6 stops ⇒ **135 chips + 5 live `EasingPicker` instances**, 4 rows `display:none` and fully mounted; plus a tautological `v-if` masking guard |
| R3-5 | **NEW** | **WCAG 2.5.3 Label in Name (Level A)** failure on the `steps` tile |
| R3-6 | **NEW** | 27-option single-select exposed as 27 independent `aria-pressed` toggle buttons |
| R3-7 | **NEW** | `useClipboard.invalidate()` — the producer's designated cure for a stale confirmation — is never called |
| R3-8 | CONFIRMS r2's profile, independent instrument | `certifyAccentInk` **unmemoized at ~17 ms/call**, N× per `modelState` tick, provably invariant to the field that triggered it |

Probe sources and pasted outputs: `probes/p1…p9b` in this directory.

---

## R3-1 · BLOCKER — three of the component's own specimen tiles destroy the whole application, silently

### The seam

The easing subpath's codomain is ℝ. The colour subpath's progress domain is `[0, 1]`. Three
call sites cross that seam with no adapter.

```
src/color/operations.ts:90
    if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });

demo/workbenches/gradient/composables/useGradientInterpolation.ts:36-37
    const mixed = mixColors(c0, c1, t, { space, hue: hueMethod });
    if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
```

Throwing consumers, both on the render path:

- `easing/useSpecimenRows.ts:52-59` — inside a `computed`, one sample at `fn(0.5)`.
- `useGradientCSS.ts:199-208` (`sampleCoalescedStops`) — 33 samples per interval; reached from
  `GradientEasingEditor.vue:63-67` (`openIntervalRamp`) **and** from the parent's `coalescedCSS`
  / `railRampCSS`. That second path is why the blast radius is the whole application rather
  than this row.

### Live reproduction, three separate runs

`node probes/p2-live-back-crash.mjs` — `ease-out-back`:

```
easing heads found: 1
row visible: true
literal before: cubic-bezier(0, 0, 1, 1)
DOM: {"rows":1,"tiles":27,"paths":27,"pickers":1,"totalNodes":511}

--- clicking ease-out-back tile in row 0 ---
row0 still visible: false
bench heads after: 0
render tile present: 0
pageerrors since click: []
ALL console errors: [ …only the unrelated dev VITE_API_URL warning… ]
```

`node probes/p4-authoring-stage.mjs` — `ease-in-back`:

```
--- press ease-in-back (overshoot below 0) ---
bench alive after: 0
try-again visible: 1
pageerrors: []
console errors: []
```

`node probes/p7-final.mjs` — `ease-in-out-back`, whose `fn(0.5)` **is** in range, so it can only
die through the 33-sample ramp path:

```
--- press ease-in-out-back (fn(0.5) IS in range; the RAMP samples are not) ---
bench alive after: 0
render tile after: 0
try-again visible: 1
pageerrors: []
console errors: []
```

`probes/after-back.png` is the resulting screen: the whole application replaced by the
atmosphere and a single "Try again" pill. `ErrorBoundary.vue:59-67` catches and returns `false`,
halting propagation — which is exactly why `pageerrors: []` and `console errors: []`. **The
crash is invisible to every automated gate that watches the console**, including this
formation's own visual capture (`capture.mjs` records `pageErrors` / `consoleErrors` only).

### Full surface, enumerated

`npx vite-node probes/p5-crash-surface.ts` — all 30 bezier presets × the head-ink path × the
33-sample ramp path:

```
  ease-in-back         head:CRASH  ramp:CRASH  eased∈[-0.0969, 1.0000]
  ease-out-back        head:CRASH  ramp:CRASH  eased∈[0.0000, 1.0868]
  ease-in-out-back     head:ok     ramp:CRASH  eased∈[-0.0923, 1.0927]

bezier tiles: 30  head-ink crashes: 2  interval-ramp crashes: 3

== the producer's own declared authoring domain ==
glass-ui 7 EasingPicker sr-only help: "Up and Down change y from -0.6 to 1.6"
  cubic-bezier(0.5, -0.6, 0.5, -0.6) eased∈[-0.3692, 1.0000]  -> mixColors domain [0,1] violated: true
  cubic-bezier(0.5,  1.6, 0.5,  1.6) eased∈[0.0000, 1.3692]  -> mixColors domain [0,1] violated: true
```

**The drag surface is wider than the tile surface.** The sr-only help string quoted above was
read out of the *mounted* glass-ui 7 DOM this round (`probes/p4` dump, `<span id="v-1-3"
class="sr-only">…Up and Down change y from -0.6 to 1.6…</span>`). The producer's *declared*
authoring range is `y ∈ [-0.6, 1.6]`; every drag past `y = 1` or below `y = 0` is a crash. So
the defect is not "three bad tiles" — it is that the seat consumes a producer whose contract
guarantees out-of-domain output and hands it unmapped to a mixer that rejects it.

The `steps` family is safe (`fn ∈ {0, .25, .5, .75, 1}`). `linear()` literals are not:
`linear(0, -0.5 50%, 1)` throws identically (`probes/p1` output).

### Cure — one adapter at the one sampling law

`useGradientCSS.ts` already declares itself "the ONE sampling law". Give it the seam and route
both consumers through it:

```ts
/** The easing→mix adapter. CSS gradients do not extrapolate colour past their
 *  endpoints — an overshooting curve parks on the endpoint it overshoots. */
const sampleEased = (fn: EasingFunction, t: number) => Math.min(1, Math.max(0, fn(t)));
```

This matches real CSS semantics (browsers clamp gradient colour interpolation at the stops;
they do not extrapolate), it is one function, and it closes all three tile paths **and** the
whole drag surface at once. Three guards at three call sites would be the patch; this is the
transposition.

If overshoot colour *extrapolation* is genuinely wanted, that is a library decision —
`mixColors` growing an explicit extrapolation option — not a demo-side guard. Either way: **a
catalogue must not offer a tile that cannot be rendered.**

---

## R3-2 · BLOCKER — the zero-letterbox law has been inert since the glass-ui 7 adopt; 57% of the authoring canvas renders nothing

`EasingAuthoringStage.vue` exists to impose three laws on the consumed `<EasingPicker>`. Law 3
— the O-17 oracle's entire subject — binds to a DOM string:

```
EasingAuthoringStage.vue:48-49
    rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal

EasingAuthoringStage.vue:104-115
    .easing-authoring :deep(svg[role="img"]) {
        inline-size: min(100%, 19rem);
        block-size: auto !important;
        aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
        margin-inline: 0 !important;
        transition: aspect-ratio var(--duration-normal) var(--ease-standard);
    }
```

**glass-ui 7.0.0 renders no `role="img"` anywhere.**

```
$ node -e "console.log(require('.../@mkbabb/glass-ui/package.json').version)"
7.0.0
$ grep -rlo 'role:"img"' node_modules/@mkbabb/glass-ui/dist/*.js
(no output)
```

Measured live with the authoring stage disclosed (`probes/p4-authoring-stage.mjs`):

```json
{ "matchesLaw1": 1,               // [data-testid="easing-picker"]  — law 1 still binds
  "matchesLaw2_glassCard": 1,     // .glass-card                    — law 2 still binds
  "matchesLaw3_roleImgSvg": 0,    // svg[role="img"]                — LAW 3 BINDS TO NOTHING
  "vbRatioVar": "1.2",            // the line-45 seed, never synced, for the component's whole life
  "svgs": [{ "role": "group", "aria": "Easing curve 1 → 2",
             "vb": "0 -0.1 1 1.2000000000000002",
             "w": 416.7, "h": 214.2,
             "blockSizeCss": "200px", "aspect": "1 / 1" }] }
```

Three independent proofs the rule is dead, from that one measurement:

| seat rule | asserts | measured |
|---|---|---|
| `block-size: auto !important` | content-derived | `200px` — the producer's clamp, precisely what the header comment claims to override |
| `aspect-ratio: calc(1 / var(--vb-ratio))` | `1 / 1.2` = 0.833 | `1 / 1` |
| `inline-size: min(100%, 19rem)` | ≤ 304 px | **416.7 px** |

`syncVbRatio()` returns at its first `if` on every invocation — mount, every `authored`
emission, every external `value.css` change.

### NEW this round — the producer-side cause, so the letterbox is a formula not a snapshot

r1 measured the dead space at one viewport. The *mechanism* is in the producer bundle:

```
$ grep -o "preserveAspectRatio[^,}]*" node_modules/@mkbabb/glass-ui/dist/easing.js
preserveAspectRatio: "xMidYMid meet"
```

With `meet`, the letterbox is fully determined by the element box and the viewBox:

```
element 416.7 × 214.2 ; viewBox 1 × 1.2
meet scale         = min(416.7 / 1, 214.2 / 1.2) = 178.5
drawn plot width   = 178.5 px
letterbox per side = (416.7 − 178.5) / 2        = 119.1 px
dead canvas        = 238.2 / 416.7              = 57.2 %
```

This predicts r1's 59.4 % at its narrower 410 px box, and it predicts the failure at every
viewport — the ratio is `1 − (h/w)·(vbW/vbH)`, which is `< 1` only when the seat's aspect rule
applies. It never applies. O-17 clause 1 requires ≤ 1 px on all four edges.

The `transition: aspect-ratio` liquid morph (T-48) is lost with the rule — an animation gone
not by deletion but by a selector that quietly stopped matching (owner edict 6, in effect).

### Standing-edict violations, named

The file's own header says the overrides "retire at the adopt". **glass-ui 7 IS the adopt**
(V′.W44, "Glass 7.0.0 ADOPTED WHOLE"). They were not retired; they were left to no-op.

- **Edict 4 (glass-ui is the design system)** — three `:deep()` reaches into producer internals
  instead of the variant living in glass-ui.
- **Edict 5 (root-level styling)** — two `!important` per-instance overrides of a consumed
  component are exactly the shape the edict forbids.

### Cure

A `querySelector` string against a producer's private DOM cannot be a law: it fails **open** and
**silent**. The seat needs a contract.

1. glass-ui writes the live viewBox ratio itself — a model field or a `--easing-vb-ratio`
   custom property. That is the real content of the pending P7 `EasingPicker-v2` packet, and it
   deletes `syncVbRatio`, both rAFs, and the whole `!important` block in one move.
2. Until then: bind to the producer's *stable* contract (`[data-testid="easing-picker"] svg`)
   **and make the binding loud** — `syncVbRatio` silently `return`ing when the canvas is absent
   is what let this survive the W44 adopt undetected. A dev-mode warn here converts a silent
   three-tranche regression into a one-session fix.

---

## R3-3 · BLOCKER — the only gate covering this component is 3/3 RED, and vacuous for every clause past line 52

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=list

  3 failed
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — desktop
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — 390
    [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law

  Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
  Expected: visible
  Error: element(s) not found
      at discloseAuthoring (o17-easing-composition.spec.ts:52:23)
```

All three die at the same line — `discloseAuthoring`, line 52 — on R3-2's dead selector. The
consequence is sharper than "red":

**Every clause after line 52 is unreachable.** That includes the
`[data-specimen='ease-out-back']` clicks at lines 111 and 194 — the oracle *contains* R3-1's
reproduction and can never execute it. The oracle and the component share one bug, so the
oracle could not have caught either.

The spec is in the `smoke` project and in no `testIgnore` list (`playwright.config.ts:147-153`):
this is a live red gate, not a parked one.

### The vacuous unit gate

Total vitest coverage of the whole tree is `test/gradient-v4-consume.test.ts:57-60`:

```ts
it("builds every easing specimen from valid Result values", () => {
    expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
    expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
});
```

Mutations that keep it green while destroying the component:

1. Make every tile's `payload()` return `linearInterval()` — the strip becomes 27 no-op buttons.
   Green: `payload` is never invoked by any test.
2. Make `tileIdFor()` return `null` unconditionally — nothing ever reads pressed, every head
   reads `custom`. Green: `tileIdFor` is never called by any test.
3. Delete `useSpecimenRows.ts` and render an empty accordion. Green: nothing imports it.
4. Change `bezierLiteral`'s `", "` join to `","` — the byte-identity mint law breaks and no
   picker-authored curve ever matches a tile. Green: `tile.css` is never compared to anything.

The two live assertions establish that a module-level array is longer than 20 and contains no
literal `"NaN"` substring.

---

## R3-4 · MAJOR (NEW) — every specimen row mounts the whole 27-tile catalogue **and a live `EasingPicker`**, open or not

Not measured in r1 or r2. `probes/p8-scale.mjs`, applying a 6-stop gradient through the code
editor:

```
DOM @2 stops: {"heads":1,"tiles":27,"pickers":1,"glyphNodes":27,…}
DOM @6 stops: {"heads":5,"tiles":135,"pickers":5,"glyphNodes":135,"all":1282}
pickers while all tune-stages CLOSED: 5
hidden rows' strips mounted: [
  { id: 'easing-interval-0', display: 'flex', tiles: 27 },
  { id: 'easing-interval-1', display: 'none', tiles: 27 },
  { id: 'easing-interval-2', display: 'none', tiles: 27 },
  { id: 'easing-interval-3', display: 'none', tiles: 27 },
  { id: 'easing-interval-4', display: 'none', tiles: 27 }
]
```

Four `display: none` rows each carry a full catalogue and a **live glass-ui `EasingPicker`**,
none of which the user has disclosed. The stated justification
(`GradientEasingEditor.vue:16-18`: "Picker instances stay ALIVE (v-show, never v-if) … no
remount/echo discipline") requires only the **open** row's picker to survive; it does not
require four hidden ones. At 685 chars per glyph `d` string (`probes/p9b`), 135 chips is ~92 KB
of path data in the DOM. It also multiplies R3-8: five rows means five contrast certifications
per tick.

**Plus a masking guard** (owner edict 2) at `GradientEasingEditor.vue:207-212`:

```vue
<EasingAuthoringStage v-if="intervals[row.index]" :value="intervals[row.index]!" … />
```

`useSpecimenRows.ts:51` only pushes a row when its `interval` is truthy, so this `v-if` can
never be false — a tautological guard immediately followed by a `!` non-null assertion.

**Cure** — move the liveness boundary from "every row forever" to "the open row":

```vue
<div v-show="openInterval === row.index" :id="…">
  <template v-if="openInterval === row.index">        <!-- body mounts on open -->
    …strip…
    <div v-show="tuneOpen[row.index]">                <!-- stage stays alive once disclosed -->
      <EasingAuthoringStage :value="intervals[row.index]!" … />
```

One catalogue, one picker, and the no-remount-while-authoring property survives exactly where
it was claimed.

---

## R3-5 · MINOR (NEW) — WCAG 2.5.3 "Label in Name" (Level A) failure on the `steps` tile

`easingCatalogue.ts:186` mints `stepsTile("steps", "n = 4", 4, "jump-end")` — id `steps`,
visible label `n = 4`. `EasingSpecimenStrip.vue:105` binds `:aria-label="tile.id"`; `:116`
renders `{{ tile.label }}`.

- accessible name: `steps`
- visible label: `n = 4`

The visible label is **not contained in** the accessible name, so a speech-input user saying
"click n equals 4" cannot activate the control. Every other tile passes (checked against
`familyLabelFor`): `smooth` ⊂ `smooth-step-3`, `start` ⊂ `step-start`, `end` ⊂ `step-end`,
`out` ⊂ `ease-out-back`, `in-out` ⊂ `ease-in-out-quad`, `linear` ≡ `linear`, `ease` ≡ `ease`.

One tile, one string: either caption it `steps` and move `n = 4` to the eyebrow, or set the
accessible name to `steps n = 4`.

---

## R3-6 · MINOR (NEW) — a 27-option single-select exposed as 27 independent toggle buttons

Measured (`probes/p7-final.mjs`):

```
tile role/selected semantics: {"tag":"BUTTON","role":null,"ariaPressed":"false",
                               "ariaSelected":null,"dataState":"off","label":"ease"}
OPEN-ROW CONTROLS: [ {name:"linear",role:"button",state:"on"},
                     {name:"ease",role:"button",state:"off"}, … ]
```

The strip is single-select **by construction** — `EasingSpecimenStrip.vue:30-35`: "pressing the
pressed tile again is a no-op … an interval always has a curve" — yet it is exposed as 27
independent `aria-pressed` toggle buttons inside a plain `role="group"`. A screen reader
announces "toggle button, not pressed" twenty-six times, with no set size, no position, and no
mutual-exclusion semantics. The ARIA pattern for exactly-one-of-N is `radiogroup`/`radio` (or a
listbox).

Under edict 4 the fix belongs in glass-ui — a `Chip` `mode="radio"` variant alongside the
existing `mode="selectable"` — not in a demo-side `role` override.

---

## R3-7 · MINOR (NEW) — the stale copy confirmation is never invalidated, though the producer ships the cure

```
$ grep -n "invalidate" demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue
NO invalidate() call in GradientEasingEditor.vue
```

glass-ui's `useClipboard` returns `invalidate()`, documented in
`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts` as *"Invalidate pending
or settled feedback because its payload is no longer current."* The component holds the
confirmation for `resetMs: 1400` (`GradientEasingEditor.vue:94`) keyed on a positional
`copiedIndex` (`:95`), and never invalidates. Copy a literal, then press a different specimen
tile within the window: an affirmative green tick sits beside a literal that is **not** on the
clipboard.

The same positional keying afflicts `openInterval` (`:61`) and `tuneOpen` (`:84`) — see r1 C-4 /
r2 C2-5, which I confirm by code read. `useGradientModel.ts:122-125` removes stops by `id`, so
indices shift under all three.

*(Reproduction: code-derived. The missing `invalidate()` and the positional keys are facts at
the cited lines; the resulting user-visible sequence is not driven this round.)*

**Cure**: intervals should carry identity (or be keyed `${stops[i].id}→${stops[i+1].id}`), and
`onTileSelect` / `onPickerAuthored` should call `invalidate()`.

---

## R3-8 · MAJOR — ~17 ms of unmemoized contrast certification per interval per tick, provably invariant to what triggered it

Independent instrument, confirming r2's profile.

```
$ npx vite-node probes/p9b-ink-cost.ts
certifyAccentInk × 200 (distinct inputs): total 3402.2 ms  → 17.011 ms/call
certifyAccentInk × 200 (SAME input):      total 3195.5 ms  → 15.978 ms/call  (memoized? false)
60 ticks × 5 rows: 6653.1 ms total → 110.88 ms per tick
```

`certifyAccentInk` (`demo/color-session/ink.ts:130`) is **not memoized** — the identical input
costs the same on call 200 as on call 1.

The subscription is too wide. `useSpecimenRows(() => stops, () => intervals, () => modelState)`
(`GradientEasingEditor.vue:54-58`) reads the *whole* `modelState`, so `type` and `direction`
invalidate it — but the derivation reads only `interpolationSpace` and `hueMethod`:

```
$ npx vite-node ../wb-gradient-visualizer/probes/cost-probe.ts
== is any of that work invariant to the field that triggered it? ==
specimenRows same at 90deg and 271deg? true
```

Live, on the direction slider (`probes/p7-output.log`, whole page, swiftshader):

```
20 direction ticks (whole page): {"totalMs":7343.2,"perTickMs":367.2,"longTasks":0,…}
```

*Attribution honesty*: the 367 ms/tick is the whole page including the WebGL atmosphere, and
`longTasks: 0` says the cost is spread across many sub-50 ms tasks — so I do not attribute it
wholesale. The attributable claim is the node measurement (~17 ms × N intervals per tick) plus
the proof that the output is byte-identical across the field that triggered it.

**Cure**, both narrowing rather than caching-over:

1. `useSpecimenRows` takes `() => modelState.interpolationSpace` and `() => modelState.hueMethod`
   — it stops being a `direction`/`type` subscriber. Pure subscription hygiene.
2. Memoize `certifyAccentInk` on `(css, surfaceL, floor)` **inside `useContrastSafeColor`** —
   one cache at the instrument, serving all six consumers, not a per-consumer wrapper.

---

## R3-9 · INFO (NEW) — why the landmine has stayed unstepped-on

```
PORT: {"overflowX":"auto","clientW":436,"scrollW":1482,"tiles":27}
```

(`probes/p4`.) A 1482 px strip inside a 436 px port: **8 of 27 specimens are visible at rest** —
confirmed against the Safari capture `audit/visual/shots/safari-desktop-light/gradient.png`,
which shows the `css` family (×5) and `sine` (×3) and nothing further. The `back` family sits
roughly 1000 px to the right. R3-1's three app-killing buttons are off-screen at rest, and the
one automated agent that would press them (o17:111, o17:194) dies at line 52 first.

This is also the entirety of the visual REPORT's `bleeding` list for `/#/gradient` — 12 of 12
entries are this component's own DOM (`div.strip-row`, `div.strip-family`, `span.family-eyebrow`,
`div.family-tiles`, `button.glass-chip.glass-capsule`, `svg`, `path`, `span.tile-label`). Benign
as horizontal-scroller geometry, but this component is the sole contributor to that row.

---

## Negative results — measured, so the absence is proof and not silence

| claim | result | evidence |
|---|---|---|
| Sub-24 px tap targets from this component | **none** at 1440 px | `probes/p4`: `BENCH SMALL TAPS: []`. `.rail-btn` computes to exactly 24×24 (14 px icon + 2×0.3125 rem). The route's 6 small targets in `REPORT.json` are the slug bar (3 × 22×22), the CSS input (160×23) and the two stop handles (20×20) |
| Nameless buttons from this component | **none** | live Chromium sweep, 0 hits inside `[id^='easing-interval-']` / `.specimen-strip`; the route's 1 nameless button is elsewhere |
| Focus restoration after collapse | **correct** | `probes/p3`: `activeAfter: "BUTTON.interval-head …"` |
| Byte-identity mint law under glass-ui 7 | **holds** | `grep` of `dist/easing.js`: `cubic-bezier(${e}, ${t}, ${r}, ${a})`, `steps(${s.value}, ${c.value})`, `toFixed(3)` — unchanged from the law `easingCatalogue.ts:48-56` mirrors |
| `verbatimModuleSyntax` | **PASS** | all type-only imports across the four files are `import type` |
| `defineModel` async stale-read hazard | **absent** | no `defineModel` in the tree; the component is fully controlled through `emit("update-interval")` |
| oklch→HSV hue drift / `stableHue` | **absent** | no HSV roundtrip; `interpolationSpace` goes straight to `mixColors` |
| `ValueUnit` nesting accumulation | **absent** | no `ValueUnit` construction anywhere in the tree |
| reka-ui pointer-capture leak | **N/A** | no reka-ui slider in this component |
| PRM-RAF ungated loop | **no loop** | `EasingAuthoringStage.vue:58,65` are single-shot rAFs. Uncancelled on unmount, but `syncVbRatio` is null-guarded so they cannot throw — and they are no-ops anyway while R3-2 stands |
| WebGL context loss / eager boot | **absent** | no WebGL surface here |
| `parseCssColor` crash class | **a sibling is present** | R3-1 is the same mechanism (library `Result` unwrapped by `throw` inside a render-path computed) on `mixColors` rather than `parseCssColor` |

## Standing-edict ledger

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **PASS** — genuinely decomposed: catalogue / rows / strip / stage / host |
| 2 | No legacy code, no masking fallbacks | **FAIL** — tautological `v-if` + `!` (R3-4); `syncVbRatio`'s silent `return` masks a dead binding (R3-2) |
| 3 | KISS, no contrivance | **PASS** |
| 4 | glass-ui is the design system | **FAIL** — three `:deep()` overrides of producer internals, unretired at the adopt (R3-2); single-select semantics belong in a glass-ui `Chip` variant (R3-6) |
| 5 | Root-level styling | **FAIL** — two `!important` per-instance overrides of a consumed component (R3-2) |
| 6 | Animations never deleted | **FAIL in effect** — the `transition: aspect-ratio` liquid morph is unreachable because its selector no longer matches (R3-2) |
| 7 | Idiomatic Vue 3.5 | **PASS** — `useTemplateRef`, reactive props destructure, correct getter-based `watch` |
| 8 | `verbatimModuleSyntax` | **PASS** |

---

## Strongest defect

**R3-1.** Three of the twenty-seven buttons this component renders destroy the entire
application on a single click — silently, with no console error and no page error, which is
why three rounds of automated gating never saw it. The oracle written to catch it holds the
exact reproduction and cannot reach it, because R3-2 kills the oracle eight lines earlier.

Both blockers are one failure written twice: **a seam crossed without a contract** — once
between the easing codomain and the mixer's `[0,1]` domain, once between the seat's CSS and the
producer's private DOM. Both fail open, both fail silent, and both were introduced by a
producer version bump that nothing in the tree could observe.
