# CHALLENGE-C — `demo/scenes/ConfigSliderPane.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared, not inherited.

---

## Subject, substrate, instruments

| | |
|---|---|
| Component | `demo/scenes/ConfigSliderPane.vue` — 252 lines (95 script / 82 template / 74 style) |
| Consumers | `demo/scenes/atmosphere/AuroraPane.vue` (1 section, 3 sliders) · `demo/scenes/blob/BlobPane.vue` (7 sections, 31 sliders) |
| Routes | `/#/atmosphere` (left pane) · `/#/blob` (right pane) |
| Repo / HEAD | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e` |
| Live probes | isolated Chromium via `playwright@` in-repo, against `http://localhost:9000` (the owner's dev server, read-only) |
| Probe scripts | `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/csp/p1.mjs` … `p4.mjs` |
| Committed evidence read | `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `…/shots/safari-{desktop,mobile}-{light,dark}/{atmosphere,blob}.png`, `…/shots/forced-colors-desktop/blob.png` |

Note on instrument hygiene: the shared Chrome-DevTools/Playwright **MCP** browser was being driven
concurrently by other seats in this formation (my `#/blob` navigation was stolen mid-probe and landed
on `#/gradient` with two foreign tabs open). Every measurement below therefore comes from a
**private** `chromium.launch()` context, one browser per probe, so no number in this report is
contaminated by another seat.

**Verdict: DEFECTIVE.** Six MAJOR defects, five MINOR, two INFO. The component's three most
heavily-commented cures are provably inert; its 31-control surface has no fill affordance and no
screen-reader value; one click on `Reset` silently destroys live app state; and no test in the
repository exercises a single behaviour of the file.

---

## D-1 · MAJOR · `resetDefaults` clobbers nested live state — the shallow merge is a depth-1 contract

`ConfigSliderPane.vue:92-94`

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` replaces **top-level keys wholesale**. Any runtime-written state living at depth ≥ 2
inside a key that also exists on `defaults` is destroyed. Any runtime state at depth 1 that is absent
from `defaults` survives. The pane's two consumers sit on opposite sides of that accident:

- **AuroraPane survives by luck.** `aurora-atoms.ts:17-20` declares the intent explicitly — *"Carries
  NO `seed`: the seed is the live picker colour (App.vue's watch), so Reset restores the shape …
  without disturbing the colour."* `seed` is a **top-level** key absent from `DEFAULT_AURORA_ATOMS`,
  so `Object.assign` skips it. Measured: `seedPresentOnConfig: true, seedPresentOnDefaults: false,
  configSeed: "lab(92% 88.8 20)"`.
- **BlobPane is destroyed.** `BlobPane.vue:8-9` declares the same intent — *"`color.paletteStops` is
  omitted: it is the live picker-palette feed (App.vue's `deriveBlobPalette` watch), not a slider."*
  But `paletteStops` lives at **depth 2**, inside `color`, and `color` *is* on
  `BLOB_CONFIG_DEFAULTS`. So the whole `color` atom is swapped for the producer's canned baseline.

**Reproduction** (`csp/p2.mjs`, `/#/blob`, 1440×900 — reached the reactive config through
`document.querySelector('.config-console').__vueParentComponent`, walked 3 parents to `props.config`,
then clicked the real `Reset` button):

```json
"reset": {
 "beforePaletteStops": ["#ffbde0", "#ffdde5", "#fff6f6", "#fff6f4"],
 "afterPaletteStops":  ["#b5947f", "#d4b27d", "#dad6b1"],
 "beforeBodyRadius": 0.425,
 "afterBodyRadius":  0.22
}
```

The 4-stop live ramp derived from the picked colour is replaced by the producer's 3-stop tan default.
The writer is `useAtmosphere.ts:389-403`, `watch(atmosphereColor, …)` — **keyed on the colour
string**, so it will not re-fire until the user picks a *different* colour. The link is severed until
then, silently, with no undo and no visible symptom.

Second-order consequence (labelled **hypothesis** — mechanism read, not driven end-to-end):
`HeroBlob.vue:79` seeds its own ramp *once at mount* from `[...appBlobConfig.color.paletteStops]`,
and `HeroBlob.vue:171` overrides `paletteStops` thereafter — so the hero is insulated *while
mounted*. On a fresh mount after a Reset it would seed from the wiped tan triad. `onActivated`
(`:246`) re-seeds only on **KeepAlive re-activation**, not first mount — which is exactly the
"wake-gray" family `boot-B §0.3` already spent a cure on.

**Cure (gestalt, not patch):** stop hand-rolling reset. glass-ui ships
`useConfiguratorState<T extends object>` (`dist/components/configurator/useConfiguratorState.d.ts`)
with a typed `config`, `resetCurrent()`, `isDirty`, and a `clone` hook for exactly the unclonable /
partially-live shapes this is. That adoption is the still-open **C10 A4 [P1]** book
(`docs/tranches/N/audit/lanes/C10.md:92-105`, `:265` — *"ADOPT · `ConfigSliderPane` → full
`Configurator` + `useConfiguratorState` (copy/reset/sections)"*). Failing that, the reset must be a
**declared key domain** (reset exactly the `SliderDef.key` paths the pane owns) rather than a
whole-object merge — which is also the only form that cannot lie.

---

## D-2 · MAJOR · 31 sliders announce a raw float — the repo's own `aria-valuetext` cure was never consumed

`ConfigSliderPane.vue:137-152` renders the formatted readout **only to the eye** (`:name="fmt(read(def.key))"`)
and passes no value text to assistive tech.

**Measured** (`csp/p3.mjs`, CDP `Accessibility.getFullAXTree`, `/#/blob`) — the two slider
populations on the same page:

| population | AX name | AX value | `valuetext` |
|---|---|---|---|
| picker channels (`ComponentSliders`) | `L channel` | `0.9200000166893005` | **`Lightness 92.0%`** |
| picker channels | `A channel` | `0.8551999926567078` | **`a axis 88.8`** |
| **ConfigSliderPane** | `Body Radius` | `0.2199999988079071` | **`` (empty)** |
| **ConfigSliderPane** | `Satellites` | `3` | **`` (empty)** |

A screen-reader user tuning Body Radius hears the 17-digit float. The sighted user sees `0.220`
(measured `nameSpan.text: "0.220"`). Two voices, one control.

This is not a missing platform capability. The demo **already owns the cure**, in this repository,
with a wave id: `demo/picker/controls/ComponentSliders/composables/useSliderAnnouncements.ts` — its
header states the exact constraint and the exact remedy:

> *"The channel sliders are the glass-ui `Slider` … which forwards only `aria-label` to its reka
> thumb — it exposes no `aria-valuetext` prop … The mount-safe interim: set `aria-valuetext`
> directly on each rendered `[role="slider"]` thumb, reactively, keyed to the same formatted cell
> the console meter reads (ONE voice)."*  (`:2-13`)

The producer's forwarding list is verifiable — `glass-ui/dist/slider-DzqeQmMu.js:134-137` forwards
`aria-label`/`aria-labelledby`/`aria-describedby`/`aria-errormessage` and nothing else. So the
constraint is real and the interim is the sanctioned answer. The tranche record calls
ConfigSliderPane *"the app's SECOND slider population"* in at least six places
(`o18-contrast-census.spec.ts:33,873,924`; `ComponentSliders.vue:12,279,326`) — and the second
population never consumed the first population's a11y cure.

**Cure:** consume `useSliderAnnouncements` (or the `sliderAnnouncement` formatter beneath it) from
ConfigSliderPane, feeding it the same `fmt()` cell the row already renders — ONE voice, no second
formatter. `ComponentSliders.vue:326` already records the offer: *"Offered to the ConfigSliderPane
population."*

---

## D-3 · MAJOR · `variant="spectrum"` is a dead prop — 31 controls with zero fill affordance

`ConfigSliderPane.vue:145` declares `variant="spectrum"`. `:202` then overrides the variant's own
material with a flat single colour:

```css
--slider-track-bg: var(--ink-muted, var(--muted-foreground));
```

**Measured** (`csp/p3.mjs`, `/#/blob`, both slider populations on one page):

| | `data-variant` | `--slider-track-bg` | track `background-image` | range (`.slider-range`) |
|---|---|---|---|---|
| picker channels | `spectrum` | `linear-gradient(to right, lab(0% 88.8 20) 0%, lab(10% 88.8 20) 10%, …)` | the gradient | filled |
| **ConfigSliderPane** | `spectrum` | `oklch(0.447121 0.00386159 34.63)` | **`none`** | **`rgba(0, 0, 0, 0)`, image `none`** |

Both the track *and* the range are flat/transparent, so **the control carries no filled/unfilled
split, no gradient, no value cue of any kind except a 12 px thumb**. The pane's own comment concedes
half of this and does not fix it (`:196-198`: *"the spectrum `.slider-range` is transparent by recipe
so no filled/unfilled split reads either"*) — it then cures only the track's *contrast ratio* and
leaves the affordance dead.

The visual proof is `docs/tranches/V/megatranche/audit/visual/shots/forced-colors-desktop/blob.png`,
which happens to frame both populations side by side: **left** — four spectrum channel sliders with
real gradients and legible fills; **right** — 31 identical near-black slabs. The dark slab also reads
*inverted*: the eye takes the solid bar for the filled portion, so every slider looks 100 % full with
a notch cut in it. My own capture of the pane
(`scratchpad/csp/csp-blob-pane.png`) shows the same thing at row scale.

This is the survival of the exact disease `N.W13` claimed to close. That wave's mandate is explicit
(`docs/tranches/N/waves/N.W13.md:96`, `:215`, `:295`):

> *"`ConfigSliderPane.vue:137-141` declares the spectrum variant but never feeds it a track
> gradient… **Feed** `ConfigSliderPane.vue:139` **the real `--slider-track-bg` gradient so its
> spectrum variant shows a spectrum.**"*

It was discharged by substituting a flat contrast ink. `U20b` reads GREEN; the spectrum is still
absent. **Vacuous cure.**

**Cure:** either feed the variant a real gradient (the value's own domain ramp — the honest reading
of the mandate, and what makes a 31-row console scannable), or stop declaring `spectrum` and consume
the variant whose contract the pane actually wants. Declaring a variant and overriding its entire
visual contract away is both an edict-2 masking path and an edict-5 per-instance override.

---

## D-4 · MAJOR · `copyAsJson` discards a Result — silent no-op on both documented failure modes

`ConfigSliderPane.vue:88-90`

```ts
async function copyAsJson() {
    await writeClipboard(JSON.stringify(config, null, 2));
}
```

`writeClipboard` **never throws**. It returns a Result
(`glass-ui/dist/useClipboard-D36OTaeT.js`):

```js
async function r(e) {
    if (typeof navigator > "u" || !navigator.clipboard?.writeText)
        return { ok: !1, reason: "no-api" };
    try { return await navigator.clipboard.writeText(e), { ok: !0 }; }
    catch (e) { return console.warn("[useClipboard] clipboard writeText rejected:", e),
                       { ok: !1, reason: "clipboard-api" }; }
}
```

The pane awaits it and drops the value. **Measured** (`csp/p3.mjs`, both failure modes forced on the
real button):

```json
"clipboard": {
 "noApi":    { "bodyTextChanged": false, "anyAriaLiveInPane": 0,
               "buttonAriaDisabled": null, "warns": [] },
 "rejected": { "bodyTextChanged": false,
               "warns": ["[useClipboard] clipboard writeText rejected: NotAllowedError: Denied"] }
}
```

Both failures are **completely silent to the user**: no text change, no `aria-live` region anywhere
in the pane (`ariaLiveRegions: 0` on `/#/atmosphere`; the 4 found on `/#/blob` all belong to other
components), no disabled state, no toast. The success path is equally silent — measured
`visibleFeedbackTextAfter: false`.

`no-api` is not hypothetical for this repo. `navigator.clipboard` is secure-context-gated, and
`vite.config.ts` sets `server.host: true` *specifically* so the demo can be driven from a phone over
`http://<LAN-ip>:9000` (recorded in project memory under *iOS Safari Debugging Infrastructure*). On
that origin `Copy JSON` is a dead button on the one surface the LAN host exists to serve.

**Cure:** consume the producer's `useClipboard()` — it already ships `status: 'idle'|'pending'|'success'|'failure'`
and an `onCopyError(reason)` hook (`useClipboard-D36OTaeT.js`, exported from `@mkbabb/glass-ui`), and
glass-ui also ships `toast`/`Toaster`. Bind the status to the button (a success tick, a failure
state) inside an `aria-live="polite"` region. Zero new components; edict 4 satisfied by consumption
rather than reinvention.

---

## D-5 · MAJOR · unguarded dot-path read takes the whole pane down, and reports nothing

`ConfigSliderPane.vue:57-86`

```ts
function readPath(obj, path) { … if (cur == null || typeof cur !== "object") return undefined; … }
function read(key: string): number { return readPath(config, key) as number; }   // the lie
function fmt(v: number): string { return Number.isInteger(v) ? String(v) : v.toFixed(3); }
```

`readPath` correctly returns `undefined` for a missing intermediate segment; `read` then **casts that
`undefined` to `number`**; `fmt` calls `.toFixed` on it during render.

Boundary table (`node`, exact `fmt` body):

| input | output |
|---|---|
| `0`, `-0` | `"0"` |
| `0.5` | `"0.500"` |
| `NaN` | `"NaN"` |
| `Infinity` | `"Infinity"` |
| `1e21` | `"1e+21"` |
| **`undefined`** | **throws `Cannot read properties of undefined (reading 'toFixed')`** |
| **`null`** | **throws** |

**Reproduction — INJECTED** (`csp/p4.mjs`, `/#/atmosphere`; I set the type-legal state
`config.zones = undefined` on the live reactive object rather than reaching it through the UI):

```json
"injectedMissingBranch": {
 "before": "…Atmosphere\n\nThe background aurora derives its palette from the picked colour…",
 "after":  "…\nThis panel hit an unexpected error.\n\nCannot read properties of undefined (reading 'toFixed')\n\nTry again",
 "configConsoleStillMounted": false,
 "rowsAfter": 0
},
"pageErrors": [],
"consoleNoise": []
```

Three things this proves:

1. One absent optional branch **unmounts the entire pane** through the error boundary — not one bad
   row, all 3 (or all 31).
2. `pageErrors: []` and `consoleNoise: []` — **the boundary swallows the failure completely**. This
   is why `REPORT.json` shows `consoleErrors: 0, pageErrors: 0` on both routes in all four Safari
   matrices: the visual harness watches `pageerror` and `console`, and this failure class is
   invisible to it by construction.
3. The state is **type-permitted**: `AuroraAtoms.zones` is optional, and the slider def is
   `{ key: "zones.count" }` (`AuroraPane.vue:103`).

The internal inconsistency is the tell: **AuroraPane guards the same key three lines away** and the
sliders do not —

```ts
const arrangement = () => atoms.zones?.arrangement ?? "composed";   // AuroraPane.vue:74
const count = atoms.zones?.count ?? 4;                              // AuroraPane.vue:82
```

The Select rows treat `zones` as absent-able; the slider rows treat it as guaranteed. One of the two
readings is wrong and nothing in the code says which.

`writePath` (`:66-73`) has the mirror hole and one more: it walks with three unchecked casts
(`cur = cur[segs[i]!] as Record<string, unknown>`) and assigns into whatever it lands on —
`TypeError: Cannot set properties of undefined` for the same input.

**Cure:** delete the stringly-typed reflection layer. Both consumers already double-cast their typed
config to nothing (`:config="(cfg as unknown) as Record<string, unknown>"` — `BlobPane.vue:124`,
`AuroraPane.vue:111`), so BlobPane's elaborate 13-line `NumericAtomPath` mapped type guards only the
*key literals* while the object it indexes is fully untyped. A `SliderDef` that carries its own
`get: () => number` / `set: (n: number) => void` (or a typed lens) makes the whole class
unrepresentable, deletes `readPath`/`writePath`/the `as number` lie/the two `as unknown as` casts,
and is strictly less code.

---

## D-6 · MAJOR · 31 orphan `<label>` elements; 7 visual sections, 0 programmatic groups

**Measured** (`csp/p1.mjs` + `csp/p3.mjs`, `/#/blob`, and identically on `/#/atmosphere`):

```json
"labelCensus": { "labelCount": 31, "sliderCount": 31,
                 "labelsWithFor": 0, "labelsWrappingControl": 0,
                 "firstLabelHtml": "<label data-slot=\"label\" class=\"glass-label truncate text-small font-medium text-foreground\">Body Radius<!----></label>" }
"groupOrHeading": 0
"axStructural": [ { "role": "heading", "name": "92.0 % 88.8 20.0" },
                  { "role": "heading", "name": "Blob" } ]
"sectionHeaders": [ {"text":"Geometry","tag":"span","role":null}, …7 spans, all role:null ]
```

Two distinct defects:

**(a) 31 `<label>` elements that label nothing.** `ConfiguratorRow` renders `:label` into glass-ui's
`Label`, which emits a real `<label>` (`configurator-M5OaIlJd.js` — `f(w(r), { class: "truncate
text-small font-medium text-foreground" })` where `r` is `Label`). It has no `for`, no `id`, and does
not wrap a control. The pane compensated by *duplicating* the name onto the slider
(`:aria-label="def.label"`, `:146`) instead of wiring the one that exists. Clicking a row's label
does not focus or activate its slider; the dangling `<label>` is a real HTML-contract violation, 31×
per route.

Note the `for` route is not available — a `span[role="slider"]` is not a labelable element — so the
correct wiring is `aria-labelledby` against the label's `id`, which the producer's Slider **does**
forward (`slider-DzqeQmMu.js:135`). ConfiguratorRow does not currently expose that id → **glass-ui
BH relay item** (standing edict), with the demo-side `aria-label` as the honest interim, *documented
as such* rather than left silent.

**(b) 7 sections, zero programmatic grouping.** `:128-130` renders each section title as a bare
`<span class="config-section-title">` under a `<div class="config-section-header">` with a
`border-bottom`. Visually a grouped console; to assistive tech, **31 sliders in one undifferentiated
run**. No `role="group"`, no `fieldset`, no heading, no `aria-labelledby` — measured
`groupOrHeading: 0`, and the AX tree contains exactly two headings, both outside the console.
WCAG 1.3.1: the grouping is presented visually and is not programmatically determinable.

**Cure:** the section wrapper (`:123-127`) becomes `role="group" :aria-labelledby="sectionId"` with
the title span carrying that id — two attributes, no new markup, no new component. Structure the
pane already draws; it simply is not announced.

---

## D-7 · MINOR · the two most-argued CSS blocks in the file are provably inert

The `<style scoped>` block carries ~45 lines of justification for three cures. **Two of the three do
nothing.**

**(a) `min-block-size: clamp(2rem, 7cqi, 2.625rem)`** (`:215-217`) — "THE ONE RHYTHM SOURCE … The row
block-size rides a clamp() of the pane container". Measured (`csp/p2.mjs`):

| route | container ancestor | computed `min-block-size` | **actual row height** |
|---|---|---|---|
| `/#/blob` | `.pane-wrapper--right` (`container-type: inline-size`) | **35.84 px** | **61 px** |
| `/#/atmosphere` | `.pane-wrapper--left` (`container-type: inline-size`) | **42 px** (clamp ceiling) | **61 px** |

The container query resolves correctly — and the clamp ceiling (2.625 rem = 42 px) sits **19 px below
the row's natural content height on both routes**, so the declaration never binds. The rhythm the
comment claims to source is set entirely by `ConfiguratorRow`'s own `py-2` plus the label line.

**(b) the `@media (pointer: coarse)` hit-area extension** (`:218-230`) — "a coarse-pointer HIT-AREA
EXTENSION on the row's slider (the tap zone reaches 44px without inflating the visual row)".
Measured (`csp/p1.mjs mobile-atmos`, 390×844, `hasTouch`, DPR 3, `coarse: true`):

```json
"before":      { "content": "\"\"", "position": "absolute", "blockSize": "44px", "pointerEvents": "auto" },
"row0slider":  { "h": 44 }
```

`block-size: max(100%, var(--dock-touch-target, 2.75rem))` = `max(44px, 44px)` = **44 px**. The
producer's own slider root is *already* 44 px tall under a coarse pointer, so `100%` always wins and
the pseudo-element adds **exactly zero**. Cross-check from the committed capture: `REPORT.json`
mobile matrices report the atmosphere thumbs at `12×44` and the desktop ones at `12×24` — the height
step is the producer's, present with or without this block.

Also measured: no adjacent-row hit-stealing (`zoneOverlapPx: -39.6` between every mobile pair, and
`-23` on desktop), so the block is inert rather than harmful. Both blocks are dead weight carrying
live claims — edict 3 (no contrivance) and a doc-truth hazard: the next reader will trust the comment.

---

## D-8 · MINOR · 12 px-wide thumbs on every matrix, under a comment claiming ≥ 44 px

The style block asserts *"the `<lg` touch rung (≥44px slider rows — the producer's own
`--dock-touch-target`)"* (`:186-187`). Measured thumb boxes:

| matrix | source | thumb |
|---|---|---|
| safari-desktop-light `/#/blob` | `REPORT.json` | **12 × 24**, ×35 |
| safari-desktop-dark `/#/blob` | `REPORT.json` | **12 × 24**, ×35 |
| safari-desktop-{light,dark} `/#/atmosphere` | `REPORT.json` | **12 × 24**, ×3 |
| safari-mobile-{light,dark} `/#/atmosphere` | `REPORT.json` | **12 × 44**, ×3 |
| chromium-desktop `/#/blob` | `csp/p1.mjs` | **12 × 24**, ×31 (all 31 enumerated) |
| chromium-mobile `/#/atmosphere` | `csp/p1.mjs` | **12 × 44**, ×3 |

**The width is 12 px in every matrix** — half of WCAG 2.5.8's 24 × 24 minimum. This component
contributes **35 of the 39** small-tap-target rows the visual REPORT flags on `/#/blob` and **3 of 7**
on `/#/atmosphere`; the remaining rows on both routes belong to the dock and the slug editor. (The
2.5.8 *spacing* exception plausibly rescues the vertical axis — measured 43 px between slider
centres on desktop, 39.6 px on mobile — but not the 12 px width, and the exception is an argument the
component does not record.)

Attribution: the thumb geometry is the producer's (`slider-thumb glass-specular-track`), so the fix
is a **glass-ui relay**, not a demo override (edict 5). The defect *here* is the comment asserting a
rung the file does not deliver and no gate measures.

---

## D-9 · MINOR · hand-rolled copy/reset/clone where the producer's typed state machine is one import away

The file's own header states the composition principle (`:6-10`): *"glass-ui already ships
`./configurator` with ConfiguratorRow + **useConfiguratorState** … so the demo composes the existing
glass-ui surface rather than rebuilding the row primitive."* It composes the **row** and rebuilds the
**state**.

What the producer offers (`dist/components/configurator/useConfiguratorState.d.ts`):
`useConfiguratorState<T extends object>` → typed `config`, `resetCurrent()`, `isDirty`,
`selectPreset`/`cyclePreset`, plus an explicit `clone?` hook whose doc says *"Pass a custom cloner for
shapes that contain unclonable values"* and an `equals?` hook. Its `structuredClone` call is
try/caught with a diagnostic.

What the pane hand-rolled instead: `Record<string, unknown>` + `readPath`/`writePath` + a bare
`Object.assign(config, structuredClone(defaults))` with **no try/catch**, **no `isDirty`**, and no
per-row reset (`ConfiguratorRow` ships `canReset` + a `reset` emit + an auto-generated
`aria-label="Reset {label}"` — measured in the producer render fn; the pane passes neither, so the
only reset is nuclear and all-or-nothing).

The unguarded clone is not theoretical:

```
$ node --input-type=module -e "import {reactive} from 'vue'; try{structuredClone(reactive({a:1,n:{b:2}}))}catch(e){console.log(e.name,e.message)}"
DataCloneError #<Object> could not be cloned.
```

Today both consumers pass plain module constants, so it holds. The moment a consumer passes a
reactive `defaults` — the obvious thing to do — the click handler rejects with an unhandled
`DataCloneError`. The producer guards exactly this call; the demo copy does not.

This is `C10 A4 [P1]` still open (`docs/tranches/N/audit/lanes/C10.md:92-105`, `:265`) and edict 4
(glass-ui is the design system) unmet on the state axis while met on the row axis.

---

## D-10 · MINOR · VACUOUS GATE — no test in the repository exercises any behaviour of this file

Full coverage census:

```
$ grep -rln "ConfigSliderPane|config-console|copyAsJson|resetDefaults|readPath|writePath" test/ demo/test/ e2e/
e2e/smoke/oracles/o7-card-census.spec.ts
e2e/smoke/oracles/o18-contrast-census.spec.ts
```

Two files. Neither tests behaviour:

- **`o7-card-census.spec.ts:38-42` explicitly EXCLUDES it**: *"AdminPane and ConfigSliderPane
  (Atmosphere/Blob, admin-mode views) are session-gated and carry the byte-identical one-attribute
  `<Card tier="resting">` stamp (… grep-verified at the wave gate)."* A grep stands in for the
  runtime walk.
- **`o18-contrast-census.spec.ts:924-966`** asserts only **computed colours**: the contrast ratio of
  `.config-console .configurator-row label`, of `.config-console .configurator-row .font-mono`, and
  (`:1161-1210`) of `.slider-track`. It reads `row.ratio`; it never reads text, never moves a
  slider, never clicks a button.
- `demo/test/glass/aurora-{bracket,motion}.test.ts` assert `DEFAULT_AURORA_ATOMS` constants and
  `resolveAtoms` — the data, not the pane.
- 19 vitest files in `test/`: zero mention.

**Mutations that keep every gate green** (the vacuity proof):

| # | mutation | why every gate still passes |
|---|---|---|
| M1 | `function update(_k: string, _v: number) {}` | **all 34 sliders become read-only.** o18 measures label/value/track *colours* — unchanged. o7 excluded. No vitest. **GREEN.** |
| M2 | `function resetDefaults() {}` | Reset is a no-op. Nothing asserts it. **GREEN.** |
| M3 | `async function copyAsJson() {}` | Copy JSON is a no-op. Nothing asserts it. **GREEN.** |
| M4 | `function fmt(v: number) { return String(v); }` | the readout becomes `0.21999999999999997`; o18 reads `.font-mono`'s **colour**, and the producer's `truncate` class clips the overflow so even a pixel diff may miss it. **GREEN.** |

M1 is the damning one: the entire purpose of the component can be deleted and the suite reads green.
The one born-RED gate the file's comments cite (`o18-contrast-census`'s "new config GRAPHICS leg",
`:198-201`) measures the very override that killed the spectrum affordance — it certifies D-3 as the
cure.

**Cure:** one vitest mount per behaviour — dot-path read/write round-trip (flat *and* nested),
`resetDefaults` preserving a declared live key at depth 2 (D-1's exact assertion), `fmt` at
`{0, -0, NaN, Infinity, undefined}`, and the clipboard Result on both `reason` values. Four small
tests kill M1–M4 and D-1/D-4/D-5.

---

## D-11 · MINOR · dead branches, a JSDoc that promises a state that does not exist, prop mutation

**(a) A documented empty state that was never built.** `:44` — *"Slider sections to render. **Pass
empty array to show empty state.**"* There is no empty state. `:119` and `:163` both gate on
`v-if="sections.length > 0"`; with `sections: []` the pane renders `PaneHeader` + the slot and
nothing else — no empty message, no placeholder. And no consumer ever passes empty: AuroraPane 1
section, BlobPane 7 (measured `sectionsLen: 7`). Both guards are **permanently true dead branches**
protecting a nonexistent state, and the JSDoc is false. Edicts 2 and 3.

**(b) The child mutates its parent's prop object.** `:80-82` — `update()` calls
`writePath(config, …)`, writing into the object handed down as a prop. Vue's one-way flow makes this
legal-but-discouraged; here it is the whole design. Both consumers `inject()` the reactive config and
then re-`prop` it down purely so the child can mutate it — while `aurora-atoms.ts:11` names the
house idiom as *"the demo's standing injection-key-over-prop-drill idiom"*. The idiomatic form is for
ConfigSliderPane to take a `configKey: InjectionKey<T>` (or a typed lens per D-5) and own its own
`inject`, which also deletes both `(x as unknown) as Record<string, unknown>` double-casts at the
call sites.

**(c) `read()` declares `: number` and returns whatever the path yields** (`:76-78`) — the cast that
manufactures D-5. `as number` over a `unknown` that is provably sometimes `undefined` is the defect,
not a style point.

**Negative finding (edicts satisfied):** `verbatimModuleSyntax` — all nine imports at `:16-23` are
value imports; no type-only import is mis-declared. `export interface SliderDef`/`SliderSection` are
type-only exports, legal in `<script setup>` and consumed correctly as `import type` by both panes
(`AuroraPane.vue:34`, `BlobPane.vue:15`). Vue 3.5 reactive props destructure is used correctly at
`:41`. No `defineModel` and no keyframes in the file, so the `shallowRef` and animation edicts do not
bind. Focus is operable and visible: measured `focusedIsThumb: true`, `tabindex: "0"`, a two-layer
`box-shadow` ring.

---

## D-12 · INFO · one keystroke re-renders all 31 rows — real, and smaller than it looks

`read()`, `fmt()` and the array literal `[read(def.key)]` (`:141`, `:147`) are all evaluated **in the
render function**, so the render effect tracks every config key the pane displays and one value
change re-creates 31 `Slider` vnodes plus 31 fresh single-element arrays.

I measured it rather than asserting it (`csp/p2.mjs` — 40 `ArrowRight` dispatches on the first thumb,
each timed from dispatch to the first `MutationObserver` callback on `.config-console`):

| route | rows | mean | median | p95 | max |
|---|---|---|---|---|---|
| `/#/blob` | **31** | **6.675 ms** | 6.6 | 8.4 | 8.6 |
| `/#/atmosphere` | **3** | **5.463 ms** | 5.4 | 6.7 | 6.8 |

**+1.21 ms mean (+22 %) for 10× the rows** — the fan-out is real but the marginal cost is ~43 µs/row,
and the ~5.4 ms floor is the rest of the app. `mutationFanout` confirms Vue's patch is correct: one
keystroke mutates exactly **one** row's DOM (`mutatedRows: [0]` of 31). This is an INFO, not a perf
defect; the honest cost of the current shape is ~40 % of a 60 fps frame per keystroke on fast desktop
Chromium, dominated by work outside this file. Reported so no later seat can claim it as a blocker
without a number.

Incidental confirmations from the same run: the write path works and clamps (41 presses drove
`geometry.bodyRadius` 0.22 → 0.425 at step 0.005, and `colorEnergy` saturated at max 1.0 — 16 of 40
atmosphere samples were no-ops at the ceiling, which is why `n: 24`).

---

## D-13 · INFO · the pane does not mount at all on `/#/blob` at 390×844

Measured (`csp/p1.mjs mobile-blob`, 390×844, `hasTouch`): `rowCount: 0`, `actionBar: null`, body text
shows a "Blob" dock entry and the picker only. Cross-checked against `REPORT.json`: safari-mobile
`/#/blob` reports 8 small tap targets vs 39 on desktop, and the four `12×44` spans there are the
picker's `L/A/B/ALPHA` channels — no `Body Radius` row appears in any mobile row.

Mechanism is the shell's, not this file's: `viewSchema.ts:179-181` maps `blob` to `right: "blob"`,
and the mobile layout does not mount the right pane. Recorded because it means the `@media (pointer:
coarse)` block of D-7 is unreachable on the route that carries 31 of the 34 sliders — the touch cure
can only ever apply to AuroraPane's 3.

---

## What I checked and found sound (the negative proofs)

Stated so this seat's silence cannot be read as an unexamined gap.

| hazard checked | result | evidence |
|---|---|---|
| `defineModel()` stale-read round-trip | **not applicable** — the file has no `defineModel`; the reactive-props destructure at `:41` is read-only for `sections`/`title`/`defaults` | source read |
| oklch→HSV hue drift / `stableHue` | **not applicable** — the pane performs no colour maths; it writes raw numbers | source read |
| `ValueUnit` nesting accumulation | **absent** — no `ValueUnit` construction; `writePath` writes primitives | source read |
| reka-ui pointer-capture leak (`pointercancel`/`lostpointercapture`) | **producer-handled** — the glass-ui Slider installs and tears down its own `touchstart`/`touchmove`/`touchend` pair (`slider-DzqeQmMu.js:102-108`, `onMounted`/`onUnmounted`); the pane adds no pointer handlers of its own | dist read |
| ungated `requestAnimationFrame` (PRM-RAF) | **none in this file** — zero `rAF`, zero `setInterval`, zero `setTimeout`, zero listeners, zero observers, zero `onScopeDispose`. Nothing to leak | source read |
| WebGL context loss / eager boot | **not this file** — the pane mounts no canvas; the blob canvas is `HeroBlob`'s and is lazily parked | source read |
| `parseCssColor` crash class | **not reachable** — the pane parses no colour strings | source read |
| horizontal overflow | **clean** — `overflowX: 0` and `bleeding: []` on both routes in all four Safari matrices | `REPORT.json` |
| nameless buttons contributed | **zero** — the one nameless button on `/#/blob` desktop is `button.send-btn.btn-interactive`, `inConfigPane: false`; the pane's own two are `Copy JSON` (134.9×36) and `Reset` (89×36) | `csp/p1.mjs` |
| console / page errors contributed | **zero on both routes, all four matrices** — but see D-5: the boundary makes this an unreliable green | `REPORT.json`, `csp/p1.mjs` |
| aurora `Reset` disturbing the picked colour | **sound** — `seed` survives, exactly as `aurora-atoms.ts:17-20` intends | `csp/p2.mjs` |
| keyboard operability & focus visibility | **sound** — thumb focusable (`tabindex="0"`), arrows move the value, ring rendered | `csp/p2.mjs` |
| clamping at the domain boundary | **sound** — values stop at `min`/`max`; step honoured | `csp/p2.mjs` |
| `verbatimModuleSyntax` (edict 8) | **satisfied** — no mis-declared type import | source read |
| animations deleted (edict 6) | **satisfied** — no keyframes in or removed from the file | source read |
| god module (edict 1) | **satisfied** — 252 lines, well under the PP-8 400-line cap | `wc -l` |

---

## Defect family map

Eleven of the thirteen findings reduce to **three mechanisms**:

1. **The stringly-typed reflection layer** (`Record<string, unknown>` + dot-path strings + `as number`
   + two `as unknown as` call-site casts) → D-1, D-5, D-11b, D-11c. Cured by a typed lens on
   `SliderDef` or by adopting `useConfiguratorState<T>`; both delete the layer rather than guard it.
2. **Results and producer affordances thrown away** (the clipboard Result; `useConfiguratorState`;
   `ConfiguratorRow.canReset`; `useSliderAnnouncements`; the spectrum variant's material) → D-2, D-3,
   D-4, D-6a, D-9. Cured by consumption, not by new code — every piece already exists, four of the
   five inside this repository.
3. **Comments asserting cures the measurements refute** (the ≥44 px touch rung; the "ONE RHYTHM
   SOURCE" clamp; the coarse-pointer hit extension; the "empty state"; `U20b`'s spectrum discharge) →
   D-3, D-7, D-8, D-11a — all of it standing on D-10's vacuous gate, which is what let the divergence
   accumulate. **Fix D-10 first**: four small behavioural tests both kill M1–M4 and make the next
   inert cure impossible to land.

---

*Seat: CHALLENGE-C (implementation). Wrote only under
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/`. No source edited. Probe scripts and
captures left in the session scratchpad under `csp/`.*
