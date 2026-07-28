# CHALLENGE-C — `demo/scenes/ConfigSliderPane.vue` — implementation audit · **PASS 3**

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this seat
was declared with. Declared, not inherited.

---

## Pass-3 preamble

Two prior CHALLENGE-C reports exist at this path and are preserved verbatim:

- `challenge-C-implementation.pass-1-2026-07-24-prior.md`
- `challenge-C-implementation.pass-2-2026-07-28-prior.md`

I read the component, both consumers, the state owner, the producer typings and the e2e oracles, and
ran my own instrumentation **before** reading pass 2. Everything in §2–§4 below is independent
derivation; §1 is the reconciliation.

**What pass 3 adds that neither prior pass carried:**

| | |
|---|---|
| **N-1 · prototype pollution in `writePath`** | proven by *executing the shipped source text*: `writePath({}, "__proto__.polluted", 1)` sets `Object.prototype.polluted` |
| **N-2 · two pairs of duplicate accessible names** | measured: 31 sliders, **29 distinct** names — `"Noise Freq"` ×2, `"Noise Speed"` ×2 — while the section that disambiguates them is provably non-programmatic |
| **N-3 · the pointer-capture-cancel hazard** | the repo's *named local hazard*. Measured: the app's only recovery net is an **unrelated component's** document listener. Pass 2 §7.6 declared this hazard absent; it is not |
| **N-4 · `.pane-scroll-fade` is on the wrong element and there is no fade mask** | measured `maskImage: "none"`; 6/6 sibling panes put the class on the `<Card>` root, this one does not |
| **N-5 · the readout is orphaned twice over** | full DOM of a row captured: label without `for`/`id`, readout without `id`/`aria-live`/`aria-describedby`, `aria-valuetext` 0/31 |
| **NEG-1** | **the D-1 pixel path is DISPROVED.** Pass 1's mount-order hypothesis, which pass 2 left open, is dead — `HeroBlob.vue:246` re-derives from the live colour, never from the config |
| **NEG-2** | WCAG 2.2 SC 2.4.11 focus-not-obscured: **0 of 31**, by a real 34-press Tab walk |
| **NEG-3** | `--ink-muted` **does** resolve live (`oklch(44.71% 0.0039 34.63deg)`); the T.W8 boot-A track cure is real, not a phantom token |
| D-1 / D-14 | independently re-derived a **third** time, UI-only, with a real keyboard edit interleaved; byte-identical arrays |

Verdict unchanged and reinforced: **DEFECTIVE** — 8 MAJOR, 9 MINOR, 3 INFO.

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/scenes/ConfigSliderPane.vue` — 252 lines (95 script / 82 template / 74 style) |
| Last touched | `f2c8f565` *feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface* |
| Consumers (exhaustive) | `demo/scenes/atmosphere/AuroraPane.vue` (1 section, 3 sliders) · `demo/scenes/blob/BlobPane.vue` (7 sections, 31 sliders) |
| Routes | `/#/atmosphere` · `/#/blob` |
| State owner | `demo/color-picker/composables/boot/useAtmosphere.ts:128` (aurora) · `:381` (blob) |
| Producer | `@mkbabb/glass-ui@7.0.0` (verified from `node_modules/@mkbabb/glass-ui/package.json`) |
| Pass-3 probes | private `chromium.launch()`; CDP `DOMDebugger.getEventListeners` + `Runtime.callFunctionOn`; a node harness that executes the component's own function text |
| Probe scripts | scratchpad `csp3-probe.mjs`, `csp3-listeners.mjs`, `csp3-p3.mjs`, `csp3-p4.mjs`, `csp3-live.mjs` |

---

## 1 · Prior roster — reconciled

| ID | Claim | Pass-3 status | Pass-3 evidence |
|---|---|---|---|
| D-1 | `resetDefaults` clobbers nested live state | **CONFIRMED (3rd derivation) — blast radius NARROWED** | §2; NEG-1 |
| D-14 | Copy and Reset model different objects | **CONFIRMED** | §2 — both payloads dumped |
| D-2 | sliders announce a raw float | **CONFIRMED and SHARPENED** | §4.1 — `aria-valuetext` 0/31 measured; the demo's own cure named |
| D-3 | `variant="spectrum"` is a dead prop | **CONFIRMED, one sub-claim corrected** | §4.4 + NEG-3 |
| D-4 | clipboard `Result` discarded | **CONFIRMED** | `:88-90` vs `writeClipboard(): Promise<CopyResult>` (`useClipboard.d.ts`) |
| D-5 | unguarded dot-path read → render `TypeError` | **CONFIRMED + write-side twin found** | §3 — executed |
| D-6a | orphan `<label>`s | **CONFIRMED** | §4.1 — `labelsWithFor: 0`, full row DOM |
| D-6b | 7 visual sections, 0 programmatic groups | **CONFIRMED — now MEASURED, not code-read** | §4.3 |
| D-7a | the `clamp()` rhythm never binds | **CONFIRMED on a 3rd matrix** | §4.6 |
| D-7b | the coarse `::before` adds zero | not re-run; pass-2 ablation + CDP attribution stand | — |
| D-8 | 12 px thumbs everywhere | **CONFIRMED** | §4.4 |
| D-9 | hand-rolled copy/reset | **CONFIRMED** | `useConfiguratorState` present in `configurator-M5OaIlJd.js` / `configurator.js`; unimported |
| D-10 | vacuous gate | **CONFIRMED + extended** | §5 |
| D-11a | documented "empty state" does not exist | **CONFIRMED + sharpened** | `:44` promises it, `:119`/`:163` render nothing — and `demo/shared/ui/EmptyState.vue` exists, unimported |
| D-11b/c | prop mutation; `read(): number` is a lie | **CONFIRMED** | `:80-82`, `:76-78`; §3 proves the lie is load-bearing |
| D-12 | keystroke fan-out | INFO, not a defect | not re-chased (pass 2 settled it at 1.02×) |
| D-13 | pane absent on `/#/blob` at mobile | **CONFIRMED** | `REPORT.md:157/172` — `/#/blob` mobile text 69 vs 713 desktop |
| D-15 | `fmt()` ignores `def.step` | **CONFIRMED — executed** | §3 table + §4.6 |

---

## 2 · D-1 + D-14 · MAJOR — third independent derivation, UI-only, with a real edit

`ConfigSliderPane.vue:88-94`

```ts
async function copyAsJson() {
    await writeClipboard(JSON.stringify(config, null, 2));
}

function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` replaces top-level keys **wholesale**. `BlobConfig.color.paletteStops` is written by
an external watch (`useAtmosphere.ts:388-403`) keyed on the picker colour, so it does not re-fire
until the user picks a *different* colour.

**Pass-3 reproduction** (`csp3-live.mjs`): `navigator.clipboard` replaced in an init script; then
only real user actions — `Copy JSON` → focus first slider → `ArrowRight` ×5 → `Reset` → `Copy JSON`.

```
### live /#/blob
clips captured: 2 bytes: [ 1412, 1395 ]
copy#1 top-level keys : geometry,satellites,membrane,color,surface,interaction,morphT,quality,tempo
copy#1 color.paletteStops: ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]
copy#1 morphT/quality    : 1 "full"
copy#2 color.paletteStops: ["#b5947f","#d4b27d","#dad6b1"]
first readout before/afterEdit/afterReset: Body Radius=0.220 | Body Radius=0.245 | Body Radius=0.220
readouts identical before vs afterReset: true
pageErrors: []
```

Byte-identical to passes 1 and 2, obtained a third way. Four picker-derived stops become the three
tan stops of `presets-5myqNv59.js`.

**The new number is the last line.** `readouts identical before vs afterReset: true` — all 31 visible
readouts return to exactly their pre-edit strings. The pane's own surface is byte-identical across an
operation that silently destroyed a member the pane does not own. There is no signal of any kind: no
diff, no toast, no `aria-live` (measured: `anyAriaLiveInPane: 0`).

**The aurora arm**, same instrument, same session:

```
### live /#/atmosphere
copy#1: { "harmony": "analogous", "colorEnergy": 0.76, "zones": {...}, "noise": 0.5,
          "medium": {"kind":"smooth"}, "motion": "drifting", "interactivity": {"swirl":true},
          "seed": "lab(92% 88.8 20)" }
copy#2: (identical)
```

`seed` survives Reset because `DEFAULT_AURORA_ATOMS` omits it — a *consumer-side convention*
documented at `aurora-atoms.ts:17-20`. And `seed` is **exported by Copy anyway**. The two buttons in
the same `GlassDock` disagree about what "the config" is, in opposite directions:

| member | owner | Reset | Copy |
|---|---|---|---|
| `AuroraAtoms.seed` | the picker (`useAtmosphere.ts:378-380`) | excluded ✓ | **included ✗** |
| `BlobConfig.color.paletteStops` | the picker (`useAtmosphere.ts:388-403`) | **clobbered ✗** | **included ✗** |
| `BlobConfig.morphT` = `1`, `.quality` = `"full"` | not pane knobs | rewritten | included |

`sections` is the pane's own declaration of what it owns. Neither button reads it.

**Blast radius, stated exactly (see NEG-1):** the destroyed stops reach the user through the
clipboard, and they corrupt shared injected state — but they reach **no pixel**. That is a narrowing
of pass 1/2, not a dismissal: the component destroys state it does not own and hands the wreckage to
the user as an export.

**Cure.** One projection over `sections[].defs[].key`, consumed by *both* buttons: Copy emits exactly
the declared surface, Reset writes exactly the declared surface. The disagreement becomes
unrepresentable and D-1 dies with it. Alternatively adopt `useConfiguratorState<T>` — present in the
consumed dist (`configurator.js`, `configurator-M5OaIlJd.js`), never imported.

---

## 3 · N-1 + D-5 + D-15 · the reflection layer, executed

`csp3-p4.mjs` lifts `readPath`, `writePath` and `fmt` **out of the `.vue` file by brace-matching the
shipped text**, strips only the type annotations, and runs them. The extracted source is echoed by
the probe so the reproduction is provably of the shipped code:

```
function readPath(obj, path) { let cur = obj; for (const seg of path.split(".")) {
    if (cur == null || typeof cur !== "object") return undefined; cur = (cur)[seg]; } return cur; }
function writePath(obj, path, value) { const segs = path.split("."); let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) { cur = cur[segs[i]]; }
    cur[segs[segs.length - 1]] = value; }
function fmt(v) { return Number.isInteger(v) ? String(v) : v.toFixed(3); }
```

```
ok    | fmt(0)                                         -> "0"
ok    | fmt(-0)                                        -> "0"
ok    | fmt(NaN)                                       -> "NaN"
ok    | fmt(Infinity)                                  -> "Infinity"
ok    | fmt(1e21)                                      -> "1e+21"
THROW | fmt(undefined)  <- read() of a missing path    -> TypeError: Cannot read properties of undefined (reading 'toFixed')
THROW | fmt(null)                                      -> TypeError: Cannot read properties of null (reading 'toFixed')
ok    | fmt(0.005) step-0.005 knob                     -> "0.005"
ok    | fmt(2500) step-100 knob                        -> "2500"
ok    | readPath({}, 'zones.count')                    -> undefined
ok    | readPath({zones:null}, 'zones.count')          -> undefined
THROW | writePath({}, 'zones.count', 3)                -> TypeError: Cannot set properties of undefined (setting 'count')
THROW | writePath({zones:undefined}, 'zones.count', 3) -> TypeError: Cannot set properties of undefined (setting 'count')
THROW | writePath(o,'a.b.c',1) 3-deep missing          -> TypeError: Cannot set properties of undefined (setting 'c')
ok    | writePath({}, '__proto__.polluted', 1)         -> {"own":[],"proto":1}
ok    | writePath({}, 'constructor.prototype.x', 1)    -> {"x":1}
```

### N-1 · MINOR (latent) · `writePath` is an unguarded dot-path writer — prototype pollution

`writePath({}, "__proto__.polluted", 1)` returns `{"own": [], "proto": 1}`: the target object gains
**no** own property and `Object.prototype.polluted` becomes `1`, globally, for the page. The
`constructor.prototype` route works identically. `writePath` (`:66-73`) walks arbitrary caller strings
with no `__proto__` / `constructor` / `prototype` guard and no `Object.hasOwn` check.

**Reachability today: none.** Every `def.key` is a literal authored in `BlobPane.vue:58-117` and
`AuroraPane.vue:101-103`, and `BlobPane`'s `NumericAtomPath` mapped type (`:36-48`) proves them
against `BlobConfig`. So this is graded **MINOR / latent**, not a live vulnerability — but `sections`
is a **prop**, i.e. caller-supplied data on a component that advertises itself as "generic … 
parameterised by { config, sections, … }" (`:2-3`). The type system that currently saves it lives in
one consumer, not in the component.

### D-5 · MAJOR · the read side crashes the render, the write side crashes the handler

`read()` (`:76-78`) casts the walk's result `as number`. When the path does not resolve, `read`
returns `undefined` typed as `number`, and `fmt(undefined)` at `:141` throws **inside the render
function** — the whole pane unmounts to the error boundary. Pass 1 demonstrated the unmount by
injection; pass 3 proves the throw mechanically (line 6 of the table).

The **write** side is the twin neither prior pass carried: `writePath` (`:66-73`) walks intermediates
with no null check, so a `def.key` whose parent segment is absent throws
`TypeError: Cannot set properties of undefined` **inside the `@update:model-value` handler**
(`:151`) — i.e. mid-drag, not at render, so the error boundary does not even get a mounted-tree
signal. Three variants reproduce.

Latency to reachability is one optional producer member: `AuroraAtoms.zones` is declared optional
and the pane addresses `zones.count` (`AuroraPane.vue:103`). Today `DEFAULT_AURORA_ATOMS:56` always
supplies it and `setArrangement` (`AuroraPane.vue:81-84`) always rewrites it whole, so the branch is
unreached. **Labelled hypothesis for live reachability; the throw itself is reproduced.**

### D-15 · MINOR · `fmt()` formats by value shape, never by the declared `step`

`SliderDef.step` (`:31`) is the declared precision of every control; `fmt` (`:84-86`) never consults
it. Measured live readouts on `/#/blob`, first six rows:

```
Body Radius=0.220  Satellites=3  Sat Radius=0.082  Orbit Radius=0.170
Eccentricity=0.050  Smooth K=0.050
```

`"3"` sits in a column of three-decimal strings. Any knob whose domain contains 0 changes glyph width
as it crosses it (`-0.005` → `0` → `0.005` is 6 → 1 → 5 glyphs) inside a `truncate` inline row —
`color.satShift`, `color.brightnessShift`, `membrane.warpAmp`, `membrane.noiseAmp`,
`membrane.pulseAmp`, `interaction.pointerAttraction` all qualify. `fmt(-0)` returns `"0"`, so a
negative-zero write is indistinguishable from positive zero.

**Cure:** `v.toFixed(Math.max(0, -Math.floor(Math.log10(def.step))))`. One line; deletes the heuristic
rather than tuning it.

---

## 4 · New measured findings

### 4.1 · N-5 + D-2 + D-6a · MAJOR · the readout is orphaned twice over

Full captured DOM of the first row (`csp3-probe.mjs` §C):

```html
<div data-slot="configurator-row" class="configurator-row flex flex-col gap-1.5 py-1">
  <div class="flex items-baseline justify-between gap-3">
    <div class="flex min-w-0 items-baseline gap-2">
      <label data-slot="label" class="glass-label truncate text-small font-medium text-foreground">Body Radius</label>
      <span class="truncate text-micro font-mono text-muted-foreground/70">0.220</span>
    </div>
  </div>
  <div class="flex w-full min-w-0 items-center …">
    <span data-slider-impl="" data-slot="slider" class="glass-slider" data-control-target=""
          data-variant="spectrum" data-size="md" aria-label="Body Radi…
```

Measured across the whole pane:

```
rows 31 · sliderRoots 31 · rootsWithAriaLabel 31 · thumbsWithAriaLabel 31
thumbsWithValueText 0 · labelsWithFor 0 · anyAriaLiveInPane 0
readoutInsideLabel false · readoutAriaLive null
thumb sample: aria-valuenow "0.22" / valuemin "0.08" / valuemax "0.45"
              aria-labelledby null / aria-describedby null / aria-valuetext null
```

Three separate breaks, all in one row:

1. **The `<label>` is inert.** No `for`, no `id`, wraps no control. The producer says so in as many
   words — `ConfiguratorRow.vue.d.ts`: *"**ConfiguratorRow** … No a11y for/id wiring. … use
   **LabeledField** directly for an accessible form control, including inside a Configurator."*
   The pane reached for the wrong primitive; `labeled-field` ships in the same dist
   (`dist/components/labeled-field/`).
2. **The readout is invisible to AT.** No `id`, no `aria-describedby` from the thumb, not inside the
   label, no `aria-live`. A screen-reader user gets `aria-valuenow="0.22"`; the sighted user gets
   `"0.220"`. Two different value channels, neither aware of the other.
3. **`aria-valuetext` is 0/31** — and the cure is demo-owned and one import away:
   `demo/picker/controls/ComponentSliders/composables/useSliderAnnouncements.ts:41-42` sets
   `aria-valuetext` on each thumb for the app's **first** slider population. The second population
   never consumes it. Same file's header even records why the direct-prop path is unavailable
   (`:6-8`, "the producer ships no `aria-valuetext` prop … the mount-safe interim").

Sub-finding, INFO: `aria-label` lands on **both** the role-less root `<span class="glass-slider">`
and the `role="slider"` thumb (31/31 each). `aria-label` on a generic, role-less element is ignored
by the accessibility tree — harmless, but it is a duplicated name whose outer copy does nothing.

### 4.2 · N-2 · MAJOR · two pairs of sliders share one accessible name

```
B_dupNames: { total: 31, distinct: 29,
              duplicates: [ ["Noise Freq", 2], ["Noise Speed", 2] ] }
```

Source: `BlobPane.vue:71-72` (`membrane.noiseFreq` → `"Noise Freq"`, `membrane.noiseSpeed` →
`"Noise Speed"`) and `BlobPane.vue:83-84` (`color.colorNoiseFreq` → `"Noise Freq"`,
`color.colorNoiseSpeed` → `"Noise Speed"`). `def.label` is the slider's **only** accessible name
(`:145`), so the accessibility tree contains two sliders called "Noise Freq" and two called "Noise
Speed", with different ranges (`0.5–10.0 / 0.5–8.0` and `0–0.5 / 0–0.3`).

What disambiguates them visually is the section header — and the section grouping is provably not
programmatic (§4.3 below). So in a screen reader's controls list the four rows are two
indistinguishable pairs, and no `aria-labelledby`, `role="group"` or heading recovers the context.

This is a *compositional* defect: neither D-6b alone nor the consumer's labels alone would be a
finding. Together they are one. The cure is either arm — real `role="group"` +
`aria-labelledby` on the section wrapper (`:124-127`), or the component composing
`` `${section.title} ${def.label}` `` into the slider's name. The first is better: it fixes D-6b too.

### 4.3 · D-6b · MAJOR · 7 visual sections, 0 programmatic groups — measured

```
G_groups: { visualSections: 7, groupRoles: 0, headingsInPane: 0,
            rolesOnSectionWrappers: [ {hdrRole:null,parentRole:null,parentLabelledBy:null,id:null} ×7 ] }
```

`:128-130` renders a bare `<span class="config-section-title">`: no `role`, no `id`, no heading
element, and the wrapper `:124-127` carries no `role="group"` / `aria-labelledby`. Seven headings
that exist only as pixels.

### 4.4 · D-3 / D-8 · MAJOR / MINOR · the spectrum variant is declared and then overridden away

```
F_geometry (31 sliders, /#/blob, 1440×900):
  thumbW [12]   thumbH [24]   smallTapTargets 31
  trackBg   ["oklch(0.447121 0.00386159 34.63)"]
  trackImg  ["none"]
  rangeBg   ["rgba(0, 0, 0, 0)"]
```

`:146` asks for `variant="spectrum"`. The producer recipe zeroes the range fill for that variant
(`.glass-slider[data-variant=spectrum] .slider-range{background:0 0}`) and the demo overrides the
track to a flat `--ink-muted` at `:202`. Net: **no gradient, no filled/unfilled split, one flat
slab** — the entire value affordance is a 12 px thumb.

`shots/safari-desktop-light/blob.png` shows this against the control: in one frame, four true
spectrum sliders (the picker's L/a/b/α, left) beside 31 identical charcoal slabs (right).

The 31 sub-24 px thumbs are the pane's contribution to the visual REPORT's tap-target counts, and the
arithmetic closes against the REPORT's own control: `REPORT.md:41` `safari-desktop-light /#/blob: 39`
minus `REPORT.md:71` `safari-mobile-light /#/blob: 8` — the **same route with the pane not mounted**
(D-13, `bodyTextLength 69`) — = **31**, exactly this component's slider count on that route. The
`/#/atmosphere` arm gives `7 − 4 = 3`, likewise exact. `/#/blob` is the worst tap-target row in the
entire matrix; the next worst non-blob row is 8.

The 12 px width is the spectrum recipe's own
(`.glass-slider[data-variant=spectrum] .slider-thumb{width:calc(var(--slider-thumb-size,1rem)*.75)}`),
so the demo half of D-8 is D-3: stop asking for the variant whose thumb recipe is the 12 px one.

### 4.5 · N-4 · MINOR · `.pane-scroll-fade` is on the wrong element, and there is no fade mask

`ConfigSliderPane.vue:104-106`:

```
<!-- The scroll region owns the fade mask + overflow; … -->
<div class="pane-scroll-fade scrollbar-thin flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
```

Measured on the live element:

```
E_focus: scrollerClass "pane-scroll-fade scrollbar-thin flex-1 min-w-0 overflow-y-auto overflow-x-hidden"
         containOnScroller "content"   maskOnScroller "none"
```

Two false assertions and one structural deviation:

1. **There is no fade mask.** The class body is the whole of it —
   `PaneHeader.vue` unscoped block: `.pane-scroll-fade { contain: layout style paint; scroll-timeline:
   --pane-scroll block; }`. `grep -rn "pane-scroll-fade" node_modules/@mkbabb/glass-ui/dist` → nothing.
   Computed `mask-image: none`. The comment names a cure that is not present.
2. **The one-home contract says the class goes on the Card root.** `PaneHeader.vue`'s own doc:
   *"The `.pane-scroll-fade` host class lives on the ROOT element of each pane Card (9 sibling panes:
   Browse/Admin/About/Palettes/Mix/Gradient/Extract/Generate/**ConfigSlider**)"*. Measured across the
   siblings — `GradientPane.vue:20`, `MixPane.vue:62`, `ExtractPane.vue:5`, `AboutPane.vue:4`,
   `BrowsePane.vue:2`, `GeneratePane.vue:31` — **6/6 put it on `<Card>`**. ConfigSliderPane puts it on
   an inner `<div>` and gives the Card `overflow-hidden` instead (`:101`).
3. Consequence today is benign — the named scroll timeline still resolves because `.pane-header` is a
   descendant of the declaring element — so this is graded MINOR. It is a **contract divergence**,
   not a broken animation, and the doc that asserts otherwise is the defect surface.

### 4.6 · D-7a · MINOR · the "ONE RHYTHM SOURCE" clamp is inert on a third matrix

`:215-217` sets `min-block-size: clamp(2rem, 7cqi, 2.625rem)` (32–42 px) on `.configurator-row`.
Pass 1 measured 61 px actual at 1440; pass 2 measured 77.6 px at 430 coarse. Pass 3, `/#/atmosphere`
at **320×700**:

```
H_atmosphere320: rowH [58, 58, 58]   rowMinBlock "32px"
```

The declared minimum resolves to its floor and the natural height is 58 px. Inert on all three
matrices ever measured. The rule spends a `:deep()` reach into a design-system primitive
(edict 5) to constrain nothing.

### 4.7 · N-6 · INFO · the header comment names a prop that does not exist

`:3` — *"parameterised by `{ config, sections, defaults, title, description, extraControls? }`"*. The
props declaration `:41-52` has five members; there is no `extraControls`. The "extra controls" case is
served by the anonymous default slot (`:110`), which AuroraPane drives. Same family as D-11a's
non-existent empty state and §4.5's non-existent fade mask.

---

## 5 · N-3 · MINOR (absence measured; consequence a hypothesis) — the pointer-capture-cancel hazard

This is one of the repo's **named local hazards** — *"reka-ui slider pointer-capture leaks needing
`pointercancel`/`lostpointercapture` recovery"*. Pass 2 §7.6 declared the named hazards all absent
from this file. That conclusion is wrong: the hazard is not about code the file *has*, it is about
recovery the file *lacks*.

**Fact 1 — reka never handles a cancelled drag.** `node_modules/reka-ui/dist/Slider/SliderImpl.js`,
complete pointer surface:

```js
onPointerdown: (event) => { target.setPointerCapture(event.pointerId); … }
onPointermove:  (event) => { if (target.hasPointerCapture(event.pointerId)) emits("slideMove", event); }
onPointerup:    (event) => { if (target.hasPointerCapture(event.pointerId)) {
                                target.releasePointerCapture(event.pointerId); emits("slideEnd", event); } }
```

No `pointercancel` handler. On cancel, `slideEnd` — which `SliderRoot.js` binds to `handleSlideEnd()`
— is never emitted.

**Fact 2 — glass-ui adds none.** The slider chunk's only `pointercancel` strings belong to a
co-bundled `useDockHold`. The per-`Slider` window listener registered at setup was captured by a
monkeypatched `window.addEventListener` (`csp3-p3.mjs`) with its stack and source:

```
pointercancel :: at a (useClipboard-…:47:78) | at setup (slider-DzqeQmMu-…:835:3)   ×4
sampleSrc: "function I() {\n\tm.value &&= !1;\n}"
```

The handler clears a boolean press flag. It does not release capture and does not end the slide.

**Fact 3 — the app's only real recovery is owned by a different component.** CDP
`DOMDebugger.getEventListeners` on `document`, live on `/#/blob`, with the handler script resolved
through `Debugger.scriptParsed`:

```json
"document_pointercancel": [
  { "type": "pointercancel", "count": 1,
    "url": ".../demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts" } ]
```

Exactly one document-level `pointercancel` listener on the whole page, and it belongs to
`useSliderTouchGates` — the composable whose own header calls itself *"the iOS Safari pointer-capture
leak recovery (`pointercancel`/`lostpointercapture`)"* (`:8-9`) — mounted by **ComponentSliders**, the
picker's channel sliders, not by this pane. Its `onUnmounted` (`:126-130`) tears it down.

**Fact 4 — the config sliders carry nothing of their own.** Same CDP census, listener types on the
first config slider root:

```json
"firstConfigSliderRoot": { "keydown":1, "pointerdown":3, "pointermove":1, "pointerup":1,
                           "touchstart":2, "touchmove":1, "touchend":1 }
```

No `pointercancel`, no `lostpointercapture`. `useSliderTouchGates` attaches those **per wrapper
element** (`:91-92`) and this pane has no wrappers registered — only the picker's four do.

**So:** 31 of the app's 35 sliders (measured: `allGlassSliders: 35`, `configSliders: 31`, the other
four being `L/A/B/ALPHA channel`) are covered against the documented WebKit capture leak only by the
accident that the picker is co-mounted on the same route. Unmount the picker — a layout change, a
full-width pane mode, a route that does not render it — and 31 sliders lose a recovery nobody
recorded them as depending on.

**Grading.** The absence is measured fact. The leak itself is a WebKit-specific bug I cannot
reproduce in Chromium, so its consequence is a **labelled hypothesis** and the row is **MINOR**. The
architectural point is not a hypothesis: a component depends for its correctness on a sibling
component's lifecycle, with no declaration anywhere that it does.

**Cure:** lift `useSliderTouchGates`' document-level force-release out of ComponentSliders into a
boot-scope install (it is already a standalone composable and already keyed on `document`), so both
slider populations inherit it by construction instead of by adjacency.

---

## 6 · D-10 · MINOR · vacuous gate — the census, extended

```
$ ls -R demo/test
export/byte-exact.test.ts
glass/aurora-bracket.test.ts     # asserts DEFAULT_AURORA_ATOMS constants + resolveAtoms; never imports the pane
glass/aurora-motion.test.ts      # same
palettes/api/                    # empty
```

`grep -rn "ConfigSliderPane\|BlobPane\|AuroraPane\|config-console" test e2e demo/test` returns exactly
two automated consumers, both colour-contrast oracles:
`o18-contrast-census.spec.ts:924` (`.config-console .configurator-row label` and `… .font-mono`,
≥4.5:1) and `:1161` (`… .slider-track`, ≥3:1). `o7-card-census.spec.ts:38-42` explicitly *excludes*
the pane. Neither oracle moves a slider, presses a button, or reads a value.

| # | Mutation | Effect | Gates |
|---|---|---|---|
| M1 | `function update(_k, _v) {}` | all 34 sliders become read-only | **GREEN** |
| M2 | `function resetDefaults() {}` | Reset does nothing | **GREEN** |
| M3 | `async function copyAsJson() {}` | Copy JSON does nothing | **GREEN** |
| M4 | `function fmt(v) { return "0" }` | every readout lies, always | **GREEN** |
| M5 | delete `:aria-label="def.label"` (`:145`) | 31 sliders lose their only accessible name | **GREEN** |
| **M6 (new)** | `function writePath(o,p,v){ o[p]=v }` — drop the dot-path walk | every nested slider writes a literal `"geometry.bodyRadius"` key and drives nothing | **GREEN** |

**M6 is the sharpest.** It deletes the component's entire reason for existing — dot-path addressing
into nested atoms, the thing `BlobPane.vue:19-48` builds a mapped type to guarantee — and the mapped
type still typechecks (it constrains `def.key`, not `writePath`), the o18 oracles still measure the
same two colours on `/#/atmosphere`, and every gate stays green.

**Extension to D-10:** the o18 config leg visits **only `/#/atmosphere`** (`:928`,
`await page.goto("/#/atmosphere")`) and settles on `.first()` of each selector — one row of one
route. The 31-row `/#/blob` population — the worst tap-target route in the entire visual matrix
(§4.4) — is never entered by any automated gate at all.

**Cure:** one vitest mount per behaviour — dot-path round-trip flat *and* nested (kills M1, M6);
`resetDefaults` preserving a declared live key at depth 2 (D-1); the copy payload equalling the
declared projection (D-14); `fmt` at `{0, -0, NaN, Infinity, undefined}` and at each declared `step`
(D-15, D-5); `writePath` refusing `__proto__` (N-1); one distinct accessible name per row (N-2).
Seven small tests kill M1–M6 and gate every MAJOR in this report.

---

## 7 · Negative proof — hypotheses tested in pass 3 and DISPROVED

Recorded so no seat re-chases them.

### NEG-1 · The D-1 pixel path is DEAD (settles a hypothesis both prior passes left open)

Pass 1 hypothesised that a KeepAlive wake would repaint the hero blob from the clobbered stops; pass 2
carried it as "an open second-order path". It is closed.

`grep -rn "paletteStops" demo` returns **one** reader of the shared config:
`HeroBlob.vue:79` — `shallowRef<string[]>([...appBlobConfig.color.paletteStops])`, which runs once at
first mount, before any Reset can occur. `HeroBlob.vue:171` then *overrides* the member on the way to
the renderer: `color: { ...appBlobConfig.color, paletteStops: heroStops.value }`. And the wake path
does **not** read the config at all:

```ts
onActivated(() => {              // HeroBlob.vue:246
    reseedHeroStops(cssColorOpaqueFrame.value);   // re-derives from the LIVE COLOUR
    …
});
```

`BLOB_CONFIG_KEY` has exactly two demo consumers (`BlobPane.vue:17`, `HeroBlob.vue:67`) and
`<Blob>` has exactly one mount. So D-1 destroys shared state that currently reaches no pixel. It
remains MAJOR on the Copy payload (D-14) and on the destruction of unowned state; it is **not** a
rendering defect, and no seat should grade it as one.

### NEG-2 · WCAG 2.2 SC 2.4.11 (Focus Not Obscured, Minimum) — 0 of 31

Hypothesis: the `sticky top-0` PaneHeader (`PaneHeader.vue:11`) inside the scroll region, with no
`scroll-margin-top` anywhere in `demo/` (`grep -rn "scroll-margin" demo` → no hits), would obscure
keyboard focus. Tested with a real 34-press `Tab` walk from the pane title:

```
E_obscuredCount 0   E_sliderStops 31
headerRect { top 104, bottom 211.4, h 107.4 }   scrollerRect { top 104, bottom 799 }
scrollHeight 2611 / clientHeight 695   computedScrollMarginFirstRow "0px"
focused-row tops across the walk: 307 374 441 508 575 697 764 439 506 573 640 707 440 507 574
                                  641 708 439 506 573 640 707 774 439 562 629 696 763 544 611 734
```

Every focused slider landed between 307 and 774, never under the 211 px header underside.
**DISPROVED.** Tab order is also sound: 31 slider stops in visual order, then `Copy JSON`, then
`Reset`, then out.

### NEG-3 · `--ink-muted` resolves live; the T.W8 boot-A track cure is real

Hypothesis: `--ink-muted` (`:202`, `:205`) is a phantom token and the fallback
`var(--muted-foreground)` is what actually paints, making the 14-line comment at `:190-201` a fiction.
`grep` finds no `--ink-muted:` declaration in `demo/styles` or in glass-ui's CSS — it is written at
runtime by `useAtmosphereBoot.ts:103`
(`document.documentElement.style.setProperty("--ink-muted", css)`). Measured live:

```
inkMutedResolved   "oklch(44.712054906087% 0.003861589952 34.629978305623deg)"
sliderTrackBgVar   "oklch(44.712054906087% 0.003861589952 34.629978305623deg)"
computed track bg  "oklch(0.447121 0.00386159 34.63)"
```

Byte-identical through all three hops. **DISPROVED** — and it corrects one sub-claim in pass 2's D-3:
the track is not invisible, it is a solidly-inked slab. D-3's defect is the *absent range fill and
absent gradient*, not track contrast.

### NEG-4 · No horizontal overflow, no truncation at 320 px

`/#/atmosphere` at 320×700: `docScrollW 320 == docClientW 320`; three labels measured
`{w 94, sw 94, cw 94, trunc false}`, `{38,38,38,false}`, `{41,41,41,false}`; action-bar buttons
`Copy JSON 122×36`, `Reset 82×36`; zero page errors. **DISPROVED** as a defect.

### NEG-5 · Nameless-button contribution = 0

`REPORT.md:101/108` records `/#/blob: 1` nameless button but `/#/atmosphere: 0` across all four Safari
matrices, while both routes render the identical ConfigSliderPane chrome. The pane's own two buttons
carry visible text and measure ≥36 px tall. The `/#/blob` nameless button is not this component's.

### NEG-6 · Zero page errors on every probe

`/#/blob` desktop, `/#/blob` after Copy→edit→Reset→Copy, `/#/atmosphere` desktop, `/#/atmosphere` at
320 px: `pageErrors: []` in all four. No live crash class here today; D-5 stays a mechanism finding.

### NEG-7 · Remaining named local hazards genuinely absent

No `defineModel` (so the async round-trip stale-read edict does not bind), no oklch→HSV roundtrip or
`stableHue`, no `ValueUnit` construction, no `parseCssColor`, no canvas/WebGL, no
`requestAnimationFrame` / `setInterval` / observers, no `addEventListener` — verified by reading all
95 script lines. Nothing to leak, nothing for the PRM-RAF epidemic to touch. The *reka pointer-capture*
hazard is the one exception and is §5.

### NEG-8 · `v-bind="description !== undefined ? { description } : {}"` (`:107`) is NOT contrivance

It looks like a KISS violation. It is not: `tsconfig.base.json:11` sets
`"exactOptionalPropertyTypes": true`, under which passing an explicit `undefined` to
`PaneHeader`'s `description?: string` (`PaneHeader.vue`, `defineProps<{ description?: string }>()`) is
a type error. The conditional spread is the idiomatic escape. **Not a finding.**

### NEG-9 · No aliasing between the reactive config and the defaults singleton

`useAtmosphere.ts:128` `reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS))` and `:381`
`reactive(structuredClone(BLOB_CONFIG_DEFAULTS))` both clone at boot, and `resetDefaults` clones
again. `Object.assign` therefore cannot write through to the module singletons and the defaults
cannot drift. **DISPROVED.** Both `defaults` are plain module constants, so `structuredClone` cannot
`DataCloneError` at any live call site — pass 1's demonstration remains a correct statement about a
*reactive* defaults object that no consumer passes.

---

## 8 · Standing-edict ledger

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · No god modules | **PASS** | 252 lines / 95 script; one responsibility |
| 2 · No legacy code | **PASS** | no shims, aliases, dual paths. The dot-path walk is the generic, not back-compat — it is N-1/D-5's defect on other grounds |
| 3 · KISS, no contrivance | **FAIL** | D-7a (inert clamp), D-7b (13 dead lines re-doing a producer utility), D-11a + §4.7 + §4.5 (three cures named in comments that do not exist: empty state, fade mask, `extraControls`) |
| 4 · Glass-ui is the design system | **FAIL** | `ConfiguratorRow` used where its own typing says `LabeledField` (§4.1); `useConfiguratorState` present in the dist, unimported (D-9); `ConfiguratorRow.canReset` unused; `writeClipboard`'s `CopyResult` discarded (D-4); `variant="spectrum"` declared then overridden away (D-3). Also two **demo-owned** cures unconsumed: `useSliderAnnouncements.ts` (§4.1) and `useSliderTouchGates.ts` (§5), plus `demo/shared/ui/EmptyState.vue` (D-11a) |
| 5 · Root-level styling | **FAIL** | three `:deep()` per-instance overrides of design-system roots — `:204` (couples to the Tailwind utility class `font-mono` *inside* a third-party scoped component), `:215` (D-7a), `:219-229` (D-7b). `:202`'s `--slider-track-bg` is **not** a violation: it is a producer-supported token fed through a demo-owned class |
| 6 · Animations never deleted | **PASS** | none removed; no keyframes here |
| 7 · Idiomatic Vue 3.5 | **PASS** | reactive props destructure `:41`; no `defineModel`, so the stale-read edict does not bind; no template ref needed |
| 8 · `verbatimModuleSyntax` | **PASS** | `:16-23` imports only values; both consumers use `import type` for the type-only imports (`AuroraPane.vue:25-34`, `BlobPane.vue:13,15`) |

---

## 9 · Defect family map

Twenty findings, **three mechanisms**.

**1 · The stringly-typed reflection layer** — `Record<string, unknown>` + dot-path strings + `as
number` + two `as unknown as` call-site casts (`BlobPane.vue:124,126`; `AuroraPane.vue:111,113`) →
**D-1, D-5, D-11b, D-11c, D-14, N-1**.

The layer has no notion of *which keys the pane owns*, so every operation that needs that notion
guesses. Reset guesses "all top-level keys of `defaults`" → D-1. Copy guesses "the whole object" →
D-14. `read` guesses "it will resolve" → D-5 read-side. `writePath` guesses "the intermediates exist
and the key is safe" → D-5 write-side and N-1. **One cure kills all six:** make `sections` the single
declared key domain and derive read, write, reset and copy from it — or adopt
`useConfiguratorState<T>` and let the producer's typed state machine hold the domain.

**2 · Producer and demo affordances thrown away** — the clipboard `CopyResult`;
`useConfiguratorState`; `ConfiguratorRow.canReset`; `LabeledField`; the spectrum variant's material;
the `[data-control-target]` coarse utility; **`useSliderAnnouncements.ts`**; **`useSliderTouchGates.ts`**;
`EmptyState.vue` → **D-2, D-3, D-4, D-6a, D-7b, D-9, D-11a, N-3**.

Cured by *consumption*, not new code. Every piece already exists. Six live in the consumed producer
dist; **three are demo-owned** — `useSliderAnnouncements.ts`, `useSliderTouchGates.ts`,
`EmptyState.vue` — written by earlier waves of this same app to fix these exact problems for the
*other* slider population, and never wired to this one.

**3 · Comments asserting cures the measurements refute** — the ≥44 px touch rung; the "ONE RHYTHM
SOURCE" clamp; the coarse hit extension; the "empty state"; the "fade mask"; `extraControls`;
U20b's spectrum discharge; the `name`-slot "pairing"; `fmt`'s implied precision → **D-3, D-7, D-8,
D-11a, D-15, N-4, N-6**.

All of family 3 — and the two-wave drift that let families 1 and 2 accumulate — stands on **D-10**,
the vacuous gate. **Fix D-10 first.**

---

## 10 · Ranked disposition

| ID | Severity | Defect | Reproduced? |
|---|---|---|---|
| D-1 | MAJOR | Reset clobbers externally-owned `color.paletteStops`; the pane's own surface is byte-identical across the loss | **YES — 3rd independent derivation, UI-only** |
| D-14 | MAJOR | Copy and Reset model different objects; Copy exports `seed` / `paletteStops` / `morphT` / `quality` | **YES — both payloads dumped** |
| D-5 | MAJOR | unguarded dot-path **read** → render `TypeError` unmounts the pane; unguarded **write** → handler `TypeError` mid-drag | **YES — shipped source executed** |
| N-2 | MAJOR | two pairs of sliders share one accessible name; the disambiguating section is not programmatic | **YES — 31 rows / 29 names** |
| N-5/D-2 | MAJOR | the readout is orphaned twice over: inert `<label>`, no `id`/`aria-live`/`describedby`, `aria-valuetext` 0/31 | **YES — full row DOM + census** |
| D-6b | MAJOR | 7 visual sections, 0 `role=group`, 0 headings, 0 `aria-labelledby` | **YES — measured** |
| D-3 | MAJOR | `variant="spectrum"` declared then overridden away; 31 controls whose only value affordance is a 12 px thumb | **YES — computed styles + shot** |
| D-4 | MAJOR | clipboard `CopyResult` discarded; silent on success and both failure modes | **YES — contract + call site** |
| D-8 | MINOR | 12×24 px thumbs, every matrix; 31 of the 39 tap-target defects on the worst route in the whole matrix | **YES — REPORT arithmetic closes (39 − 8)** |
| N-3 | MINOR | the second slider population's pointer-capture-cancel recovery is an unrelated component's document listener | **absence YES; leak = labelled hypothesis** |
| N-1 | MINOR | `writePath` pollutes `Object.prototype` via `__proto__` / `constructor.prototype` | **YES — executed. Latent: no live reachability** |
| D-7 | MINOR | two of the three most-argued CSS cures are provably inert (3rd matrix added) | **YES** |
| D-9 | MINOR | hand-rolled reset/clone where the producer's typed state machine is one import away | **YES** |
| D-10 | MINOR | vacuous gate — six mutations that delete the component's purpose and stay green; `/#/blob` never entered by any gate | **YES** |
| D-15 | MINOR | `fmt()` ignores `def.step`; `"3"` beside `"0.220"`; width jitter across 0 | **YES — executed** |
| N-4 | MINOR | `.pane-scroll-fade` on the wrong element; the "fade mask" does not exist | **YES — 6/6 siblings + computed mask** |
| D-11 | MINOR | dead branches, false JSDoc, prop mutation, the `as number` lie | **YES** |
| N-6 | INFO | `extraControls?` named in the header comment, absent from the props | **YES** |
| D-12 | INFO | keystroke fan-out — real, measured, **not** a defect (1.02× across 10× rows) | **YES (disproved, pass 2)** |
| D-13 | INFO | the pane does not mount on `/#/blob` at mobile widths (shell defect, cross-ref) | **YES — REPORT.md:157/172** |

### Consumer cross-references (not this component's, filed for the consumers' seats)

- `AuroraPane.vue:90` — `atoms.medium = kind === "smooth" ? { kind } : { kind };` — **both ternary
  branches are identical**. Dead code with a four-line comment explaining a distinction the code does
  not make.
- `BlobPane.vue:71-72` vs `:83-84` — the duplicate `"Noise Freq"` / `"Noise Speed"` labels that make
  N-2 concrete.

---

## 11 · Strongest defect

**D-1, taken with its twin D-14.**

It is the only finding that silently destroys state the user cannot recover, it has now reproduced
byte-identically across **three** independent passes with three different instruments, and pass 3's
run adds the sentence that makes it a design failure rather than a bug: `readouts identical before vs
afterReset: true`. Every one of the 31 visible readouts returns to exactly its pre-edit string. The
pane presents a perfect, unchanged face across an operation that destroyed a member it does not own
and then hands that wreckage to the user's clipboard.

Both fall out of the same root: a component that manipulates "the config" as an opaque object while
its `sections` prop sits right there, already declaring exactly which keys it owns. Reset guesses one
domain, Copy guesses a wider one, `read` and `writePath` guess a third. **The cure is to stop
guessing** — derive read, write, reset and copy from the one declaration the component already has.
That single transposition retires D-1, D-14, D-5, D-11b, D-11c and N-1 together, which is why they
should land as one hunk and not six.

And it must land **behind D-10**: seven small vitest mounts kill every mutation M1–M6 and make the
next inert cure impossible to ship.

---

*Seat: CHALLENGE-C (implementation), pass 3. Wrote only under
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/`. No source edited, no `INBOX.md`
touched, no `vnext/` read-write. Passes 1 and 2 preserved at
`challenge-C-implementation.pass-1-2026-07-24-prior.md` and
`challenge-C-implementation.pass-2-2026-07-28-prior.md`. Probe scripts left in the session scratchpad
(`csp3-probe.mjs`, `csp3-listeners.mjs`, `csp3-p3.mjs`, `csp3-p4.mjs`, `csp3-live.mjs`).*
