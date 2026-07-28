# CHALLENGE-L — BlobPane: the library structure underneath is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was
explicitly spawned with. Declared tier and observed tier agree; no inherited or
undeclared seat.

- Subject: `demo/scenes/blob/BlobPane.vue` (130 lines, area `scenes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: library structure — module boundaries, ownership, dependency direction,
  public surface.
- Verdict: **DEFECTIVE**. One BLOCKER, three MAJOR, four MINOR, four INFO.

---

## 0. The measured import closure

BlobPane is 130 lines of which ~50 are commentary. Its entire declared surface:

```
demo/scenes/blob/BlobPane.vue
├─ vue                              → inject                          (value)
├─ @mkbabb/glass-ui/blob            → BLOB_CONFIG_KEY,
│                                     BLOB_CONFIG_DEFAULTS,
│                                     type BlobConfig                 ← L-5
└─ ../ConfigSliderPane.vue          → default, type SliderSection     ← L-9
   ├─ ../ui/button                  → shim → @mkbabb/glass-ui (root)  ← L-7
   ├─ ../ui/card                    → shim → @mkbabb/glass-ui (root)  ← L-7
   ├─ ../ui/slider                  → shim → @mkbabb/glass-ui (root)  ← L-7
   ├─ @lucide/vue                   → Copy, RotateCcw
   ├─ @mkbabb/glass-ui/dock         → GlassDock
   ├─ @mkbabb/glass-ui/configurator → ConfiguratorRow  (only 1 of 7 exports) ← L-2
   ├─ @mkbabb/glass-ui              → writeClipboard   (root barrel)  ← L-7
   ├─ ../shared/ui/PaneHeader.vue   → PaneHeader (+ its GLOBAL css)   ← L-12
   └─ ../styles/foundation.css      (@reference)
```

Plus one **undeclared runtime edge**: `inject(BLOB_CONFIG_KEY)!` (`BlobPane.vue:17`)
is satisfied only by `provide(BLOB_CONFIG_KEY, blobConfig)` at
`demo/color-picker/composables/boot/useAtmosphere.ts:382` — a *boot* composable
three areas away. Nothing in BlobPane's type or import surface says so.

**Zero `@mkbabb/value.js` edges.** The densest control surface in the value.js
demo (55 operable controls, 35 sliders) touches the value.js public API not once.
Its only contact is transitive, four hops away, inside glass-ui's colour
composable — see §Negative proofs.

---

## L-1 · BLOCKER — the pane's readout is a lie: 4 of 5 Geometry sliders are inert

`BlobPane.vue:19-21` states the pane's own invariant:

> *"Compile-time guard: every dot-path below addresses a real numeric atom on the
> nested BlobConfig. A typo or an abrogated key fails typecheck here rather than
> silently no-op'ing a slider (the abrogation-silencer the ledger §4 forbids)."*

The guard proves the key exists **on the type**. It cannot see that the value
never reaches **the renderer**. `HeroBlob.vue:152-178` — the only `<Blob>` in the
whole demo (`grep -rn "<Blob\b" demo` → one hit, `HeroBlob.vue:13`) — hard-writes
literals *after* spreading the injected config:

```js
const heroConfig = computed<BlobConfig>(() => ({
    ...appBlobConfig,
    geometry: {
        ...appBlobConfig.geometry,
        bodyRadius: 0.325,      // ← BlobPane "Body Radius"   discarded
        orbitRadius: 0.4,       // ← BlobPane "Orbit Radius"  discarded
        satelliteRadius: 0.09,  // ← BlobPane "Sat Radius"    discarded
        eccentricity: 0.03,     // ← BlobPane "Eccentricity"  discarded
    },
    surface: { ...appBlobConfig.surface, fissionAmp: HERO_FISSION_AMP },
    color:   { ...appBlobConfig.color, paletteStops: heroStops.value },
    quality: isLgViewport.value ? appBlobConfig.quality : "half",
}));
```

and `HeroBlob.vue:63-66` documents that passing the `config` **prop** takes the
producer's `config ?? injectedConfig` seam — so the prop wins outright and the
injected config (the one BlobPane edits) is dead for every key listed above.

### Reproduction (measured, live dev server at :9000)

Script: `scratchpad/probe/props.mjs` — walks `__vueParentComponent` from
`.goo-blob-canvas` to the `<Blob>` instance and prints `props.config` alongside
the pane's own rendered readouts. Every pane slider driven to its maximum:

| BlobPane row | pane readout | delivered to `<Blob>` | verdict |
|---|---|---|---|
| Body Radius | `0.450` | **`0.325`** | INERT |
| Orbit Radius | `0.480` | **`0.4`** | INERT |
| Sat Radius | `0.200` | **`0.09`** | INERT |
| Eccentricity | `0.500` | **`0.03`** | INERT |
| Satellites | `4` | `4` | passes ✔ |
| Warp | `1` | `1` | passes ✔ |

`satelliteCount` and `membrane.warpAmp` prove the dot-path write mechanism itself
works, isolating the defect precisely to HeroBlob's inline register. Raw output:

```
== AFTER all sliders driven to MAX ==
pane rows: Body Radius0.450 | Orbit Radius0.480 | Sat Radius0.200 | Eccentricity0.500 | Satellites4 | Warp1
delivered to <Blob>: { "geometry": { "canvasSize":200, "bodyRadius":0.325,
  "satelliteCount":4, "satelliteRadius":0.09, "orbitRadius":0.4,
  "eccentricity":0.03 }, "surfaceFission":0.6, "membraneWarp":1 }
```

Corroborated by the mega-tranche capture
`audit/visual/shots/safari-desktop-light/blob.png`: the pane prints
`Body Radius 0.220` while the bead beside it renders at `0.325`.

### Second reproduction — the park makes *every* slider inert

`scratchpad/probe/inert2.mjs`: load `/#/blob`, wait for the idle park
(`BLOB_IDLE_MS 2000` + `SLEEPY_POSE_MS 3300` = 5.3 s, `HeroBlob.vue:211-225`),
then drive Body Radius → max, Satellites → max, then press Reset, screenshotting
`.goo-blob-wrapper` after each:

```
1b24742e25fb3f534b028a983b241e18259d60c3939443421ee753667e0cc89e  hero-A-default.png
1b24742e25fb3f534b028a983b241e18259d60c3939443421ee753667e0cc89e  hero-B-bodyradius-max.png
1b24742e25fb3f534b028a983b241e18259d60c3939443421ee753667e0cc89e  hero-C-satcount-max.png
1b24742e25fb3f534b028a983b241e18259d60c3939443421ee753667e0cc89e  hero-D-after-reset.png
```

Four byte-identical PNGs. `noteBlobActivity()` (`HeroBlob.vue:216`) is wired only
to `cssColorOpaque` and `savedColorStrings.length` — it has no idea a tuning pane
exists. Once parked, the blob-tuning route's entire 35-slider surface produces
zero pixels of feedback until the user goes and changes a *colour*.

### Mechanism

The "hero register" is a **preset**, authored as literals inside a leaf view
component. Presets are a first-class published concept in the design system:
`ConfiguratorPreset<T>` (`glass-ui/dist/components/configurator/Configurator.vue.d.ts`)
and a shipped blob preset `BLOB_HERO` (`glass-ui/dist/presets-5myqNv59.js`, exported
from `@mkbabb/glass-ui/blob-config`). `grep -rn "BLOB_HERO" demo src test e2e`
returns **nothing** — the producer's hero preset is unused and the demo maintains a
*different, divergent* one inline (producer: `orbitRadius 0.3 / satelliteRadius 0.1 /
eccentricity 0.04 / satelliteCount 4 / smoothK 0.06`; demo: `bodyRadius 0.325 /
orbitRadius 0.4 / satelliteRadius 0.09 / eccentricity 0.03`). Two hero registers
alive: a textbook dual-path.

### Cure (architectural transposition)

The tuning pane must own its own stage and its own preset table. glass-ui already
ships the whole thing:

```vue
<!-- demo/scenes/blob/BlobPane.vue -->
<Configurator :presets="BLOB_PRESETS" :active-preset="state.activePreset.value"
              :layers="LAYERS" scroll-mode="auto" size="sm"
              @select-preset="state.selectPreset" @reset="state.resetCurrent">
  <template #stage><Blob :config="state.config" :color="css" /></template>
  <template #controls>…ConfiguratorLayer + ConfiguratorRow…</template>
</Configurator>
```

with `BLOB_PRESETS = [{ key:"default", label:"Default", config: BLOB_CONFIG_DEFAULTS },
{ key:"hero", label:"Hero", config: BLOB_HERO }]`. The hero register stops being
a literal in a leaf and becomes a row in the preset table both consumers read.
HeroBlob then selects the `hero` preset instead of hand-patching four keys, and
the pane's readout becomes true by construction because the pane renders the blob
it is tuning.

---

## L-2 · MAJOR — the design system's `Configurator` was rebuilt in `demo/`

`ConfigSliderPane.vue:6-10` says the demo "composes the existing glass-ui surface
rather than rebuilding the row primitive," and then rebuilds everything *except*
the row primitive. What glass-ui 7.0.0 publishes at `./configurator`:

```
export { default as Configurator }      from "./Configurator.vue";
export { default as ConfiguratorLayer } from "./ConfiguratorLayer.vue";
export { default as ConfiguratorRow }   from "./ConfiguratorRow.vue";
export { CONFIGURATOR_SIZE_KEY, provideConfiguratorSize, useOptionalConfiguratorSize, type ConfiguratorSize } from "./size";
export { useConfiguratorState, type ConfiguratorCloneMode, type ConfiguratorState, type ConfiguratorStateOptions } from "./useConfiguratorState";
export type { ConfiguratorAsideSide, ConfiguratorGalleryPlacement, ConfiguratorPreset, ConfiguratorScrollMode } from "./Configurator.vue";
```

`grep -rn "useConfiguratorState|ConfiguratorLayer|<Configurator" demo` → **zero
hits**. One of seven exports is consumed.

| concept | glass-ui ships | ConfigSliderPane hand-rolls |
|---|---|---|
| section / layer grouping | `ConfiguratorLayer`, `layers` prop, `select-layer` | `.config-section-header` + `.config-section-title` (`:128-131`, `:232-243`) |
| scroll port with fade | `scrollMode="auto"` → `FadingScroll` | `.pane-scroll-fade scrollbar-thin` (`:106`) |
| footer + reset | `#footer` slot exposing `reset`, `@reset` emit | `.config-action-bar` + `GlassDock` (`:163-174`, `:245-251`) |
| row density | `size: "sm"|"md"|"lg"` cascading via `CONFIGURATOR_SIZE_KEY` | `:deep(.configurator-row){min-block-size:clamp(…)}` (`:215-217`) |
| reset semantics, dirty state, presets | `useConfiguratorState<T>` → `resetCurrent()`, `isDirty`, `selectPreset`, `clone` hook | `Object.assign(config, structuredClone(defaults))` (`:92-94`) |
| aside width band | `asideWidth` prop | n/a (no stage exists at all) |

This violates owner edict 4 (glass-ui is the design system; variants and
primitives belong there) and manufactures the L-3 bug. Note that `ConfiguratorRow`'s
own doc block credits *"the double-label API (value.js L14)"* — the coordination
channel that put that API in the producer is live and was used once, then abandoned.

**Cure:** delete `ConfigSliderPane.vue` and its 253 lines. Its two consumers move
to `<Configurator>` + `<ConfiguratorLayer>` + `useConfiguratorState`. Everything in
the right-hand column above disappears.

---

## L-3 · MAJOR — `Reset` shallow-clobbers a live atom owned by another module

`ConfigSliderPane.vue:92-94`:

```js
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` is a **shallow** merge. `BlobConfig` is an 8-atom *nested* shape
(the pane's own header, `BlobPane.vue:3-5`, insists on this). So `config.color` is
replaced **wholesale** — including `color.paletteStops`, which BlobPane
deliberately does not expose (`BlobPane.vue:8-9`: *"the live picker-palette feed
… not a slider"*) and which `useAtmosphere.ts:390-403` owns and writes.

### Reproduction (`scratchpad/probe/injected.mjs`, live :9000)

```
INJECTED blobConfig (useAtmosphere's) BEFORE reset:
  {"sym":"Symbol(blobConfig)","paletteStops":["#ffbde0","#ffdde5","#fff6f6","#fff6f4"],"bodyRadius":0.22}
INJECTED blobConfig AFTER Reset:
  {"sym":"Symbol(blobConfig)","paletteStops":["#b5947f","#d4b27d","#dad6b1"],"bodyRadius":0.22}
```

A live 4-stop pink ramp becomes the canned 3-stop brown/tan literal baked into
`BLOB_CONFIG_DEFAULTS.color.paletteStops` (`glass-ui/dist/presets-5myqNv59.js`),
and stays there until the user next changes the picker colour, because the writer
is a `watch(atmosphereColor, …)` and Reset does not change the colour.

It is invisible today **only because L-1 masks it** — the sole `<Blob>` overrides
`paletteStops` with its own derivation. Two defects cancelling is not a working
system; fix either one alone and the brown ramp ships.

**Cure:** the producer's `useConfiguratorState` has a `clone` hook and
`resetCurrent()` written against the preset baseline for exactly this. If reset
must stay demo-local, it must be a deep per-atom merge that never touches atoms
the pane does not own — which is the same statement as "the pane must own its
config outright," i.e. L-6.

---

## L-4 · MAJOR — two implementations of "derive the blob palette from the live colour"; one is dead

The same concept has two homes:

| | `useAtmosphere.ts:384-403` (boot) | `HeroBlob.vue:117-132` (scene) |
|---|---|---|
| trigger | `watch(atmosphereColor)`, rAF-coalesced | `watch(cssColorOpaqueFrame)`, same signal |
| call | `deriveBlobPalette(css,{stopCount:4,harmony:"analogous",chromaCeiling:0.16})` | same, `chromaCeiling: Math.max(0.16, seed.C)` |
| post-process | none | `floorStops()` — the ΔL ink floor |
| sink | `blobConfig.color.paletteStops` | `heroStops` → the `<Blob>` prop |
| **rendered?** | **never** | yes |

Measured from the same probe as L-3:

```
INJECTED blobConfig (useAtmosphere's): ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]
DELIVERED to <Blob>:                   ["#c384a6","#c3a4ab","#c4bbbb","#c4bbb9"]
```

Different values; the boot-derived one is never rendered. Its only reader is
`HeroBlob.vue:79` (`shallowRef([...appBlobConfig.color.paletteStops])`), which the
`{immediate:true}` watch on line 132 supersedes in the same setup tick — so it
survives only as a fallback for an unparseable colour string.

Cost of the dead derive, measured (`scratchpad/probe/bench-derive.mjs`, Node 24,
20 000 iterations):

```
deriveBlobPalette+hex per call: 50.98 us   total 1019.6 ms for 20000
```

~51 µs of pure waste per animation frame during a colour drag — and
`useAtmosphereFrameCoalesce.ts:10-14` names "the blob-palette derive (both in
useAtmosphere)" as one of the three heavy derives it exists to coalesce. The
coalescer is protecting a computation nobody consumes.

**Cure:** unique semantic ownership. One `deriveBlobPalette` call site, in the
module that owns the blob config (L-6), with the ink floor applied there once.
Delete `useAtmosphere.ts:384-403` — with it, `useAtmosphere`'s dependency on
`@mkbabb/glass-ui/blob` and `@mkbabb/glass-ui/color` also disappears, shrinking
the boot module's surface by two edges.

---

## L-5 · MINOR — wrong published subpath: a slider pane depends on a WebGL renderer

`BlobPane.vue:12-13` and `useAtmosphere.ts:36` reach the config constants through
`@mkbabb/glass-ui/blob` — the component barrel. glass-ui publishes a subpath that
exists for precisely this consumer:

```
$ cat node_modules/@mkbabb/glass-ui/dist/blob-config.js
import { a as e, i as t, n, o as r, r as i, t as a } from "./presets-5myqNv59.js";
export { e as BLOB_CONFIG_DEFAULTS, r as BLOB_CONFIG_KEY, a as BLOB_HERO,
         n as LIGHTNESS_FLOOR_BRACKET, i as LIGHTNESS_FLOOR_DEFAULT,
         t as clampLightnessFloor };

$ ls -la node_modules/@mkbabb/glass-ui/dist/blob{,-config}.js
-rw-r--r--  103031 blob.js          ← WebGL renderer, shaders, SpringProgress, prng, pointer field
-rw-r--r--     245 blob-config.js   ← BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS, BlobConfig, BLOB_HERO
```

`blob-config.d.ts` re-exports the `BlobConfig` type too, so all three of BlobPane's
imports are available from the 245-byte module. `grep -rn "glass-ui/blob-config"
demo src test e2e` → **zero hits** across the repo.

### Negative proof on the bundle cost — recorded honestly

Two identical entry modules, one per subpath, built through the *real* toolchain
(Vite 8 / Rollup, `sideEffects: ["*.css"]`):

```
vout/a.js  (via @mkbabb/glass-ui/blob)         0.08 kB │ gzip: 0.10 kB
vout/b.js  (via @mkbabb/glass-ui/blob-config)  0.08 kB │ gzip: 0.10 kB
vout/presets-5myqNv59-BkPTJXjv.js              1.59 kB │ gzip: 0.69 kB
```

**Byte-identical.** Rollup tree-shakes the renderer barrel away completely. The
production bundle pays nothing; the claim is a boundary claim, not a size claim.
(esbuild — Vite's *dev* pre-bundler — does not: the same two entries minify to
75 892 B vs 1 076 B, a 70× dev-graph delta. Dev-only.)

The defect is that a tuning pane and a boot composable both *declare* a dependency
on a WebGL2 renderer to obtain two constants and a type, when the producer went to
the trouble of factoring a config-only entry point.

---

## L-6 · MAJOR — three owners for one concept; the pane has no stage

`BlobConfig`'s lifecycle today:

- **created** by `useAtmosphere.ts:381` (`reactive(structuredClone(BLOB_CONFIG_DEFAULTS))`) — an *app boot* composable
- **provided** by `useAtmosphere.ts:382` under a glass-ui symbol
- **written (palette)** by `useAtmosphere.ts:393` — dead (L-4)
- **written (sliders)** by `ConfigSliderPane.writePath` on behalf of `BlobPane`
- **reset** by `ConfigSliderPane.resetDefaults` — clobbers (L-3)
- **overridden then rendered** by `HeroBlob.vue:152` in the *picker* scene (L-1)

Six operations, four modules, three areas (`color-picker/composables/boot`,
`scenes/blob`, `picker/visual`), and no module named for the concept. That is why
`BlobPane.vue:17` must write `inject(BLOB_CONFIG_KEY)!` — a non-null assertion
standing in for a structural guarantee the module graph does not make (L-13).

The consequence is sharpest on mobile. `viewSchema.ts:179-187` defines the `blob`
view as `{ left: "color-picker", right: "blob" }`, and `usePaneRouter.ts:178-185`
resolves the mobile slot to `desktopLeft` at pane-index 0. So `/#/blob` on a phone
opens on the **Picker** segment — confirmed in
`audit/visual/shots/safari-mobile-light/blob.png`, where the segmented control
reads `[Picker] Blob` with Picker active and no config sliders on screen at all
(the visual report's tap-target row corroborates: desktop `/#/blob` = 39 small
targets, mobile `/#/blob` = 8, i.e. the 35 sliders are not rendered). On mobile,
**tuning the blob and seeing the blob are mutually exclusive**.

### Greenfield lattice

```
demo/scenes/blob/
  useBlobConfig.ts      ── module-scoped `reactive(structuredClone(BLOB_CONFIG_DEFAULTS))`
                           + the ONE deriveBlobPalette + ink-floor owner (kills L-4)
                           + BLOB_PRESETS: ConfiguratorPreset<BlobConfig>[]  (kills L-1)
                           imports @mkbabb/glass-ui/blob-config only          (kills L-5)
  BlobStudio.vue        ── <Configurator> + #stage <Blob> + ConfiguratorLayer rows
                           via useConfiguratorState                          (kills L-2, L-3)
demo/picker/visual/HeroBlob.vue
                        ── imports useBlobConfig, selects the "hero" preset;
                           no inline literals, no second derive
```

`provide`/`inject` and the boot coupling both vanish: a module singleton is the
idiomatic Vue 3.5 shape for app-wide state with exactly two known consumers, and
it removes the `!`, the boot edge, and the "which module owns this?" ambiguity in
one move. `useAtmosphere` loses two imports and one watch and goes back to owning
only the aurora.

---

## L-7 · MINOR — `demo/ui/*`: 19 alias barrels, three parallel idioms for one design system

```
$ for f in demo/ui/*/index.ts; do …; done
demo/ui/button/index.ts      export { Button } from "@mkbabb/glass-ui";
demo/ui/card/index.ts        export { Card, CardHeader, … } from "@mkbabb/glass-ui";
demo/ui/slider/index.ts      export { Slider } from "@mkbabb/glass-ui";
…19 directories, every one a pure re-export…
```

18 of 19 route through the glass-ui **root** barrel; only `demo/ui/input` uses a
subpath. glass-ui publishes **74** subpaths including `./button`, `./card`,
`./slider`, `./dock`, `./configurator`. Repo-wide counts:

```
root-barrel imports  (from "@mkbabb/glass-ui")   37
subpath imports      (from "@mkbabb/glass-ui/…") 82
shim-barrel imports  (from "…/ui/…")             87
```

Three live idioms for reaching one dependency — a migration shim from the
shadcn-vue era that outlived the migration. Owner edict 2 forbids aliases and
dual paths; edict 4 says reach for glass-ui directly. `ConfigSliderPane.vue:16-23`
uses **four** of them in eight consecutive lines (`../ui/*` shim, `/dock` subpath,
`/configurator` subpath, root barrel for `writeClipboard`).

### Negative proof on cost

```
vout2/root.js  (root barrel for Button/Card/Slider/writeClipboard)  0.15 kB │ gzip 0.14 kB
vout2/sub.js   (per-component subpaths, same symbols)               0.15 kB │ gzip 0.14 kB
```

Identical. Rollup shakes the root barrel perfectly. **No perf defect** — this is
purely a legacy-structure defect, and it should be reported as such, not dressed
up as bloat.

**Cure:** delete `demo/ui/` (19 dirs, 19 files); rewrite the 87 import sites to
the glass-ui subpath that already exists for each symbol. Mechanical, one commit.

---

## L-8 · MINOR — `:deep()` reach into design-system internals

`ConfigSliderPane.vue:204-230` styles the producer's component from outside:

```css
.config-console :deep(.configurator-row .font-mono) { color: var(--ink-muted, …); }
.config-console :deep(.configurator-row)            { min-block-size: clamp(2rem, 7cqi, 2.625rem); }
@media (pointer: coarse) {
  .config-console :deep(.configurator-row .glass-slider)::before { … block-size: max(100%, var(--dock-touch-target, 2.75rem)); }
}
```

These bind to `ConfiguratorRow`'s **internal class names** (`.font-mono`,
`.glass-slider`) — any producer refactor silently breaks them, with no typecheck
and no test to catch it. Owner edict 5 (style at the design-system root, never
per-instance overrides) is violated three times.

`ConfiguratorRow` ships a `size: "sm"|"md"|"lg"` rung and `CONFIGURATOR_SIZE_KEY`
provide/inject "so consumers can compose configurators without re-rolling the row
layout" (its own doc block) — the density override has an intended door and does
not use it. The `--slider-track-bg` feed on line 202 is *correct* by contrast: a
custom-property handoff, not a selector reach. That is the pattern the other three
should follow, or they belong in glass-ui.

---

## L-9 · MINOR — the shared contract types live inside an SFC

`ConfigSliderPane.vue:27-39` declares `export interface SliderDef` and
`export interface SliderSection` inside `<script setup lang="ts">`, and both
consumers import them from the component file
(`BlobPane.vue:15`, `AuroraPane.vue:34`: `import type { SliderSection } from "…ConfigSliderPane.vue"`).

Type-only export from `<script setup>` is a Vue-compiler affordance, not a module
boundary. The contract of the pane (what a section and a slider *are*) is a
data shape with two independent consumers; it wants a `.ts` file. The current
shape means a consumer that only needs the *types* takes a dependency on the
*component*.

---

## L-10 · MINOR — the type guard is per-consumer, not per-contract, and is discarded at the prop boundary

`BlobPane.vue:36-52` carries 33 lines (13 of type, 20 of commentary) of
`NumericAtomPath` mapped-type machinery to prove its dot-paths address real atoms.
`AuroraPane.vue:101-103` — the *other* consumer of the same component — has none:

```ts
{ key: "colorEnergy", label: "Colour Energy", min: 0, max: 1, step: 0.01 },
{ key: "zones.count", label: "Zones",        min: 1, max: 6, step: 1 },
```

Raw strings. Two consumers of one component with asymmetric safety, and the
machinery duplicated-or-absent rather than owned once.

Worse, both consumers throw the safety away at the prop boundary:

```vue
:config="(cfg as unknown) as Record<string, unknown>"            <!-- BlobPane.vue:124 -->
:defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"  <!-- :126 -->
```

A double cast through `unknown` is the strongest "the type system is wrong here"
signal TypeScript has, and it appears twice in a 130-line file. The pane proves
its keys are valid against `BlobConfig` and then hands the component an object
whose type says nothing.

**Cure:** Vue 3.5 generic components. `<script setup lang="ts" generic="T extends object">`
on the configurator, `key: NumericPath<T>` on `SliderDef<T>`, `config: T`,
`defaults: T`. The mapped type moves from BlobPane into the shared module, once;
both consumers get identical safety; both double casts disappear; and
`readPath`/`writePath` become the only untyped surface, contained to ~15 lines.

---

## L-11 · INFO (hypothesis, no reproduction) — `writePath` cannot create missing intermediates

`ConfigSliderPane.vue:66-73` walks to the parent segment and assigns:

```js
for (let i = 0; i < segs.length - 1; i++) cur = cur[segs[i]!] as Record<string, unknown>;
cur[segs[segs.length - 1]!] = value;
```

If any intermediate is absent, `cur` becomes `undefined` and the final assignment
throws `TypeError: Cannot set properties of undefined`. `readPath` (`:57-64`)
guards this case and returns `undefined`; `writePath` does not — an asymmetry in
one file. BlobPane is protected by `NumericAtomPath` (L-10) but the sibling
consumer is not: `AuroraPane.vue:74` reads `atoms.zones?.count ?? 4` as *optional*
while `AuroraPane.vue:103` writes the path `zones.count` unconditionally.
**Reproduction: NONE** — `DEFAULT_AURORA_ATOMS` currently defines `zones`. This is
a latent hazard, labelled a hypothesis.

---

## L-12 · INFO — a global stylesheet owned by a leaf component

`ConfigSliderPane.vue:106` applies `.pane-scroll-fade`, a class defined in an
**unscoped** `<style>` block inside `demo/shared/ui/PaneHeader.vue` (`:44-59`).
Its own comment concedes the consumers "are siblings of PaneHeader (not its
descendants)" and lists nine of them. Global CSS whose consumers are not in its
subtree belongs in `demo/styles/`, per the standing rule that global keyframes and
global classes live there. `Configurator scrollMode="auto"` (a `FadingScroll`
scroll-port, per the producer's own type doc) removes the need for the class
entirely.

---

## L-13 · INFO — `inject(…)!` is a non-null assertion standing in for a module guarantee

`BlobPane.vue:17`: `const cfg = inject(BLOB_CONFIG_KEY)!;`. If the pane is ever
mounted outside App's atmosphere-boot scope — a unit test, a route-level split, a
standalone studio — `cfg` is `undefined`, `readPath` returns `undefined` for all
35 rows, and every `Slider` receives `[undefined]`. No throw, no visible error,
35 silently wrong controls. The L-6 module singleton removes both the assertion
and the failure mode.

---

## Negative proofs — what this component's structure gets RIGHT

These were tested and found sound. Each is a claim I could have made and did not,
because the measurement refuted it.

1. **The published-surface discipline is intact.** The brief's central suspicion —
   a demo import a real consumer could not write — does not occur anywhere in
   this component's subtree, or in the demo at all:
   ```
   $ grep -rn "@src/" demo --include='*.vue' --include='*.ts' | grep -v "assets/docs"
   (no output)
   $ grep -rn 'from "[./]*\.\./src/' demo --include='*.vue' --include='*.ts'
   (no output)
   ```
   Every value.js import in the demo is a bare published subpath
   (`@mkbabb/value.js/{color,css,math}`), resolved by `vite.config.ts:41-49`'s
   alias set which is **generated from `package.json#exports`** so it cannot drift
   from the published map. The `@src` alias survives only for the exempt
   `assets/docs/*.md` source-embed pages. There is no false proof of the public API.

2. **There is no duplicate OKLCh stack.** I expected to find glass-ui shipping a
   rival colour implementation competing with `@mkbabb/value.js/color`. It does not
   — `node_modules/@mkbabb/glass-ui/dist/color.js` line 3:
   ```js
   import { convertColor, interpolateHue, mapColorToGamut, toRgba8 } from "@mkbabb/value.js/color";
   ```
   and glass-ui declares `"@mkbabb/value.js": "^4.0.0"` as a peer dependency.
   `deriveBlobPalette`, `cssToOklch`, `oklchStopToHex` and `gamutMapStop` are all
   thin compositions over value.js primitives. value.js **is** dogfooded on this
   route — transitively, through the design system. The direction of dependency
   (value.js demo → glass-ui → value.js) is a cycle at the *repo* level but not at
   the *module* level, and it is the intended constellation shape.

3. **Rollup tree-shaking is not the problem.** Both bundle probes came back
   byte-identical (§L-5, §L-7). Neither the renderer-barrel import nor the
   root-barrel shims cost a single production byte. Reporting them as bloat would
   have been false.

4. **`verbatimModuleSyntax` is clean.** `BlobPane.vue:13` and `:15` are both
   `import type`; `:11` (`inject`) and `:12` (the two constants) are genuine value
   imports. No mixed import in the file.

5. **The named historical suspects are dead or out of scope.** The three parallel
   `useDark` stores are gone — every dark consumer in `demo/` now calls glass-ui
   `useGlobalDark` (18 hits, zero vueuse `useDark`), and
   `useMarkdownHighlighting.ts:76-79` records the cure. `ActionBarLayer`,
   `demo/palettes/export.ts` and `usePaletteExport.ts` are not in this component's
   import closure (§0) and are correctly another seat's subject.

6. **The `cqi` claim in ConfigSliderPane's styles is honest.**
   `demo/styles/shell.css:83` sets `container-type: inline-size` on
   `.pane-wrapper`, so the `clamp(2rem, 7cqi, 2.625rem)` row rhythm really is
   pane-container-scaled, not viewport-scaled as the syntax alone would allow.

7. **No a11y or PRM finding is manufactured here.** The visual report's 39
   small-tap-targets on desktop `/#/blob` (vs 8 elsewhere) is the *density* of 35
   sliders on a fine-pointer matrix, and the coarse-pointer hit-area extension
   (`ConfigSliderPane.vue:218-230`) is correctly media-gated. Per the standing
   caution, no two-engine reproduction was obtained and no finding is claimed.

---

## Summary table

| id | severity | defect | mechanism family |
|---|---|---|---|
| L-1 | BLOCKER | 4 of 5 Geometry sliders + fissionAmp inert; pane readout ≠ rendered blob | preset authored as literals in a leaf consumer |
| L-2 | MAJOR | glass-ui `Configurator`/`ConfiguratorLayer`/`useConfiguratorState` rebuilt in demo | design-system component duplicated in consumer |
| L-3 | MAJOR | `Reset` shallow-clobbers `color.paletteStops`, an externally-owned atom | hand-rolled reset over a nested config |
| L-4 | MAJOR | two `deriveBlobPalette` owners; the boot one is dead (51 µs/frame wasted) | duplicated semantic ownership |
| L-6 | MAJOR | config created in boot, edited in `scenes`, rendered in `picker`; no stage | no module named for the concept |
| L-5 | MINOR | config constants imported from the 103 KB renderer barrel, not `./blob-config` | wrong published subpath edge |
| L-7 | MINOR | 19 `demo/ui/*` alias barrels; 3 parallel idioms (37/82/87 sites) | legacy migration shim / dual path |
| L-8 | MINOR | 3 `:deep()` reaches into `ConfiguratorRow` internals | per-instance override of a design-system root |
| L-10 | MINOR | `NumericAtomPath` per-consumer, absent in AuroraPane, discarded by `as unknown as` | contract enforced at the caller, not the contract |
| L-9 | MINOR | `SliderDef`/`SliderSection` exported from an SFC | contract types without a module |
| L-11 | INFO | `writePath` cannot create missing intermediates (hypothesis) | read/write asymmetry |
| L-12 | INFO | `.pane-scroll-fade` global CSS owned by `PaneHeader.vue` | global style in a leaf |
| L-13 | INFO | `inject(BLOB_CONFIG_KEY)!` assertion in place of a structural guarantee | provide/inject where a module singleton belongs |

## The one-line gestalt

BlobPane is a 130-line file that is *almost entirely correct* — its type guard is
thoughtful, its imports are type-clean, and it consumes only published surfaces.
It is defective because the three things it depends on are each in the wrong
place: the **config** lives in boot, the **renderer** lives in another scene and
silently overrides it, and the **configurator** lives in the design system unused
while a demo copy stands in its way. Collapse all three into
`demo/scenes/blob/{useBlobConfig.ts, BlobStudio.vue}` over glass-ui's
`<Configurator>` and every finding above except L-7 and L-12 disappears at once.

## Probe artifacts

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/probe/`
(scratch, not repo state): `props.mjs` (delivered-config read), `injected.mjs`
(paletteStops before/after Reset), `inert2.mjs` + `hero-{A,B,C,D}*.png` (the
byte-identical parked frames), `bench-derive.mjs` (51 µs), `vite.probe.ts` /
`vite.probe2.ts` (the two tree-shaking negative proofs).
