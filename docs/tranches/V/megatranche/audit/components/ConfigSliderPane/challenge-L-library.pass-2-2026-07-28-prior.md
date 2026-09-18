# CHALLENGE-L — library structure under `demo/scenes/ConfigSliderPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/scenes/ConfigSliderPane.vue` — 252 lines (script 1–95 · template 97–177 · style
179–252). Consumers: `demo/scenes/atmosphere/AuroraPane.vue` (3 sliders),
`demo/scenes/blob/BlobPane.vue` (31 sliders). **34 rows ride this one component** — the app's
SECOND slider population.

**Verdict: DEFECTIVE.** Two BLOCKERs (both reproduced with pasted output), seven MAJORs, five
MINORs, two INFOs.

The unifying mechanism, stated once: **this is a generic configurator hand-rolled inside a feature
area, on top of a design system that already ships the configurator, inside a library whose package
manifest has been bent to make that possible.** Every seam the pane needed — section group, reset
semantics, row density, row ink, track material, touch rung, type-safe key paths — was re-minted
demo-side. Each re-mint is a second home for a concept that already has one, and the defects are
what leak out of the seams between the two homes.

This report supersedes the r1 report at this path. §"Negative proofs" records **one r1 finding I
refuted by measurement** and the items I checked and found sound.

---

## 1 · The import trace — every edge, and whether it should exist

`ConfigSliderPane.vue:16-23`, all eight edges traced to their home:

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 16 | `../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` | **VIOLATING** — alias shim over the root barrel (L-4) |
| 17 | `../ui/card` | `demo/ui/card/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **VIOLATING** (L-4) |
| 18 | `../ui/slider` | `demo/ui/slider/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **VIOLATING** (L-4) |
| 19 | `@lucide/vue` | devDependency, bare | sound |
| 20 | `@mkbabb/glass-ui/dock` | published subpath | sound |
| 21 | `@mkbabb/glass-ui/configurator` | published subpath | **sound specifier, 1-of-5 consumed** (L-3) |
| 22 | `../shared/ui/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | sound edge, **implicit global-CSS contract** (L-16) |
| 23 | `@mkbabb/glass-ui` (root barrel) | `dist/glass-ui.js` — `./dom` is the door for `writeClipboard` | **INCOHERENT, cost REFUTED** (L-4 / §Negative proofs) |

Three different dialects of the **same package** in one eight-line import block: a demo shim
barrel (16–18), two published subpaths (20–21), and the root barrel (23).

**`@mkbabb/value.js` edges: ZERO.** The component imports nothing from the library whose demo it
is. Repo-wide the demo *does* dogfood — measured:

```
$ grep -rhno 'from "@mkbabb/value\.js/[a-z]*"' demo/ | sed 's/.*value\.js\///;s/"//' | sort | uniq -c | sort -rn
  24 color
  10 css
   6 math
   5 easing
   4 quantize
$ grep -rn 'from "@mkbabb/value.js"' demo/ | wc -l
       0
```

Note the asymmetry that matters for this seat: the FIRST slider population dogfoods the library
(`ComponentSliders.vue:98` — `import { clamp } from "@mkbabb/value.js/math"`); the SECOND (this
one) uses none of it, and hand-rolls its own numeric readout policy at `:84-86`.

---

## 2 · The dependency lattice, as measured

```
demo/color-picker/        ← Vite `root` (vite.config.ts:244,284). THE SHELL / BOOT.
    App.vue · router/ · composables/boot/{useAtmosphere,useAtmosphereBoot,atmosphere-calibration}
demo/shell/               viewSchema · usePaneRouter · useViewManager · PaneSlot · dock/
demo/scenes/
    ConfigSliderPane.vue  ← a SHARED PANE SHELL living loose in an AREA directory
    about/ · atmosphere/{AuroraPane, aurora-atoms, aurora-harmony-stops} · blob/{BlobPane}
demo/workbenches/ · demo/palettes/ · demo/picker/ · demo/color-session/ · demo/platform/
demo/shared/ui/           PaneHeader · EmptyState        ← the OTHER home for shared pane chrome
demo/ui/                  19 dirs, ALL pure re-export shims over @mkbabb/glass-ui
```

Two structural facts fall straight out of that picture.

**(a) `scenes/` is an area namespace and `ConfigSliderPane.vue` is not an area.** Its three siblings
are subject folders (`about/`, `atmosphere/`, `blob/`); it is a generic shell that both
`atmosphere/` and `blob/` reach *up* to (`AuroraPane.vue:33`, `BlobPane.vue:14` — `../ConfigSliderPane.vue`).
The repo already has a home for exactly this — `demo/shared/ui/`, where `PaneHeader.vue` (which
this component imports on the very next line) lives. Two homes for "shared pane chrome", one
concept.

**(b) There is a directory-level cycle between the shell and one scene.** Measured — these are
the *only* two edges between `demo/color-picker/**` and `demo/scenes/**`, and they point in
opposite directions:

```
$ grep -rn "\.\./scenes" demo/color-picker/
demo/color-picker/composables/boot/useAtmosphere.ts:35:import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";
$ grep -rn "color-picker/" demo/scenes/ | grep import
demo/scenes/atmosphere/aurora-harmony-stops.ts:23:import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/color-picker/**` ⇄ `demo/scenes/atmosphere/**`. Detail in L-8.

---

## 3 · Findings

### L-1 · BLOCKER — `Reset` is a shape-blind `Object.assign` and destroys the live picker→blob palette coupling. REPRODUCED.

`ConfigSliderPane.vue:92-94`:

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` replaces each **top-level** key wholesale. For BlobPane that includes the entire
`color` atom — and `color.paletteStops` is not a slider. `BlobPane.vue:8-9` says so in its own
header: *"`color.paletteStops` is omitted: it is the live picker-palette feed (App.vue's
deriveBlobPalette watch), not a slider."* The producer default carries a stock warm-cream ramp:

```
$ node --input-type=module -e "import {BLOB_CONFIG_DEFAULTS} from './node_modules/@mkbabb/glass-ui/dist/blob-config.js'; console.log(BLOB_CONFIG_DEFAULTS.color.paletteStops)"
[ '#b5947f', '#d4b27d', '#dad6b1' ]
```

The writer is a **non-deep, non-immediate-after-boot** watch on the picker colour
(`demo/color-picker/composables/boot/useAtmosphere.ts:389-401`), so nothing repairs the clobber
until the colour *changes*.

**Reproduction** (real producer defaults, real Vue reactivity, the two code paths verbatim):

```
$ node scratch/reset-repro.mjs
1. after boot          paletteStops = ["#derived1","#derived2","#derived3","#derived4"]  derives: 1
2. after Reset click   paletteStops = ["#b5947f","#d4b27d","#dad6b1"]  derives: 1
3. 50ms later          paletteStops = ["#b5947f","#d4b27d","#dad6b1"]  derives: 1
4. after picker moves  paletteStops = ["#derived1","#derived2","#derived3","#derived4"]  derives: 2

Atoms Reset overwrites that no slider exposes:
    quality -> "full"
    morphT -> 1
    satellites.absorbedDuration -> [2000,4000]
    surface.rimColor -> "#8c694e"
```

Script (paste to reproduce):

```js
import { reactive, ref, watch, nextTick } from "./node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { BLOB_CONFIG_DEFAULTS } from "./node_modules/@mkbabb/glass-ui/dist/blob-config.js";
const blobConfig = reactive(structuredClone(BLOB_CONFIG_DEFAULTS));      // useAtmosphere.ts:381
const atmosphereColor = ref("oklch(0.72 0.19 20)");
let derives = 0;
watch(atmosphereColor, () => { derives++;                                 // useAtmosphere.ts:389
  blobConfig.color.paletteStops = ["#derived1","#derived2","#derived3","#derived4"]; },
  { immediate: true });
await nextTick();  console.log(1, blobConfig.color.paletteStops, derives);
Object.assign(blobConfig, structuredClone(BLOB_CONFIG_DEFAULTS));        // ConfigSliderPane.vue:93
await nextTick();  console.log(2, blobConfig.color.paletteStops, derives);
atmosphereColor.value = "oklch(0.5 0.2 140)";
await nextTick();  console.log(4, blobConfig.color.paletteStops, derives);
```

**Mechanism (library-structure, not a bug):** the pane's props are `config: Record<string, unknown>`
and `defaults: Record<string, unknown>` (`:41-52`). Having erased the shape, the only reset it can
express is "overwrite everything". The **reads** are shape-aware (dot-path, `:57-64`); the **write**
is shape-blind. glass-ui ships the correct semantics one import away — the pane already imports
from `@mkbabb/glass-ui/configurator`, which exports `useConfiguratorState<T>` with `resetCurrent()`
against a **preset baseline**, an `isDirty` computed, and an explicit `clone` hook
(`node_modules/@mkbabb/glass-ui/dist/components/configurator/useConfiguratorState.d.ts`). It also
ships per-row reset: `ConfiguratorRow` has `canReset?: boolean` and a `reset` emit.

**Cure (transposition, not patch):** delete `resetDefaults`. Adopt `useConfiguratorState<T>` with
the two preset tables as its `presets`, so reset is *restore-to-baseline* over the keys the studio
declares, and add `can-reset` per `ConfiguratorRow` so the affordance is where the value is. A
reset that can only touch declared slider keys cannot reach `paletteStops`.

---

### L-2 · BLOCKER — `variant="spectrum"` fed a flat colour: 31 of 31 fills paint nothing. MEASURED LIVE.

`ConfigSliderPane.vue:146` sets `variant="spectrum"`; `:202` feeds the variant's track token a
**flat** colour:

```css
.config-console { --slider-track-bg: var(--ink-muted, var(--muted-foreground)); }
```

The producer's spectrum recipe assumes the track carries a **ramp**, and therefore blanks the fill
element entirely:

```
$ python3 -c "…extract rules containing 'spectrum' from node_modules/@mkbabb/glass-ui/dist/glass-ui.css…"
.glass-slider[data-variant=spectrum] .slider-track{height:calc(var(--slider-thumb-size,1rem)*1.5);background:var(--slider-track-bg,var(--secondary))}
.glass-slider[data-variant=spectrum] .slider-range{-webkit-backdrop-filter:none;box-shadow:none;background:0 0}
```

Live WebKit against the running dev server (`http://localhost:9000/#/blob`, 1440×900):

```json
{ "inkMuted": "oklch(44.687157993053% 0.003861589952 34.629978305623deg)",
  "rows": 31, "tracks": 31, "ranges": 31,
  "distinctConfigTrackPaints": 1,
  "configTrackSample": ["none | oklch(0.446872 0.003862 34.629978)", "…", "…"],
  "configRangeSample": ["bg=rgba(0, 0, 0, 0) bgImg=none w=163",
                        "bg=rgba(0, 0, 0, 0) bgImg=none w=324",
                        "bg=rgba(0, 0, 0, 0) bgImg=none w=149"],
  "pickerTrackPaint": "linear-gradient(to right, lab(0 88.800003 20) 0%, lab(10 88.800003 20) 10%, …" }
```

Read it: all 31 tracks paint **one** flat colour with `background-image: none`. All 31 range
elements have a correct value-proportional **width** (163 / 324 / 149 px) and paint **nothing**.
The library's fill affordance is present in the DOM and invisible on every row. The only value cue
left is thumb position. Confirmed visually — `audit/visual/shots/safari-desktop-light/blob.png`
renders 31 uniform dark-grey capsules against the picker's real spectra in the same screenshot.

**This is a library-contract defect, not styling.** The sibling population in the same app uses the
same variant *correctly* — `ComponentSliders.vue:193-200` builds a real
`linear-gradient(to right, …)` from the live colour and feeds it to the same token. One variant,
two feeds, one of them semantically empty. The variant was chosen for its **geometry** (taller
track, capsule thumb) and its **semantics** (the track IS the value ramp) were discarded.

**The gate certifies the wrong half.** `e2e/smoke/oracles/o18-contrast-census.spec.ts:1161` —
*"the ConfigSliderPane spectrum tracks ≥3:1 on the well"* — asserts the TRACK is legible against the
well and never asserts the RANGE is visible at all. The born-RED gate is green over an invisible
control.

**Cure:** drop `variant="spectrum"` from `:146`. The default variant paints
`--slider-range-bg` and restores the fill for free; the `--slider-track-bg` re-ink at `:202` stays
(the default track already reads `var(--slider-track-bg, var(--muted-medium))`). Reserve `spectrum`
for controls whose track genuinely *is* a colour ramp — i.e. `ComponentSliders`.

---

### L-3 · MAJOR — glass-ui `./configurator` ships five primitives built for these two panes by name; the demo consumes one and re-rolls four, and says so in a comment that is factually wrong.

`ConfigSliderPane.vue:6-10`:

> *HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState.
> This component uses ConfiguratorRow for each labeled row … **The section-group wrapper and the
> floating copy/reset dock remain demo-local (they are thin structural shells, not the row
> primitive).***

They are not thin structural shells. They are two more shipped primitives:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/configurator/index.d.ts
export { default as Configurator } from "./Configurator.vue";
export { default as ConfiguratorLayer } from "./ConfiguratorLayer.vue";
export { default as ConfiguratorRow } from "./ConfiguratorRow.vue";
export type { ConfiguratorAsideSide, ConfiguratorGalleryPlacement, ConfiguratorPreset, ConfiguratorScrollMode } from "./Configurator.vue";
export { CONFIGURATOR_SIZE_KEY, provideConfiguratorSize, useOptionalConfiguratorSize, type ConfiguratorSize } from "./size";
export { useConfiguratorState, type ConfiguratorCloneMode, type ConfiguratorState, type ConfiguratorStateOptions } from "./useConfiguratorState";
```

| ConfigSliderPane re-mints… | glass-ui already ships… |
|---|---|
| `<Card tier="resting">` + `.pane-scroll-fade` scroll region + footer (`:99-106`, `:163-174`) | `<Configurator>` — `stage` / `controls` / `footer` slots, `scrollMode: "auto"` (a `FadingScroll` port), `asideWidth`, `asideSide`, `size` cascade, `reset` emit |
| `.config-section-header` / `.config-section-title` (`:128-130`, `:232-243`) | `<ConfiguratorLayer label sub dividers defaultOpen v-model:open>` — labeled collapsible section, header + chevron, CSS-only `0fr↔1fr` reveal |
| `.config-action-bar` + `<GlassDock>` + Copy/Reset (`:163-174`, `:245-251`) | `<Configurator>`'s `footer` slot, which is handed `{ reset }`, plus the `reset` emit |
| `resetDefaults()` (`:92-94` — the L-1 blocker) | `useConfiguratorState<T>` → `resetCurrent()`, `isDirty`, `selectPreset`, `cyclePreset`, `clone`, `equals`, `cloneMode` |
| `class="gap-1.5 py-1"` + `:deep(.configurator-row){min-block-size: clamp(…)}` (`:143`, `:215-217`) | the `size` axis `sm`/`md`/`lg`, resolved local-prop-over-`CONFIGURATOR_SIZE_KEY`-inject |
| `:deep(.configurator-row .font-mono){color:…}` (`:204-206`) | the `name` / `sub` props, whose docblock says they exist so a consumer needs *"no `:deep()` reach"* |
| `SliderDef` / `SliderSection` with `key: string` (`:27-39`) | `ConfiguratorPreset<T>` — generic over the live config shape |

The producer built these **for these two panes, by name**. `ConfiguratorLayer.vue.d.ts`:

> *"Authors stack multiple layers to express the per-axis split (per R2 §C: aurora has Medium /
> Palette / Flow / Texture / Comp / Nuclei; **blob has Mood / Body / Surface / Color / Motion /
> Pointer / Render**)."*

And `ConfiguratorRow.vue.d.ts` names its own API after this repo's request:

> *"# The double-label API (**value.js L14**) … so a consumer expresses a 'double-label' row WITHOUT
> a `:deep()` reach into the slot or a hand-rolled in-slot sans+mono pair."*

BlobPane's seven `SECTIONS` titles (Geometry / Membrane / Color / Lit Glass / Pointer / Satellites /
Tempo, `BlobPane.vue:54-119`) are the producer's own enumeration. The primitive was commissioned,
shipped, and then 4/5 of it was re-rolled locally. **This is the root defect; L-1, L-2, L-10, L-11
are all leaks from these seams.**

The CSS is already paid for — `demo/styles/foundation.css:56-57` imports `@mkbabb/glass-ui/styles`
and `styles.css` wholesale, and `grep -c "configurator-row" node_modules/@mkbabb/glass-ui/dist/glass-ui.css` = 1.
Adopting the remaining four primitives adds **zero** CSS bytes.

---

### L-4 · MAJOR — `demo/ui/` is a 19-directory pure-alias shim over the glass-ui root barrel, codified by a stale DESIGN.md rule.

```
$ for d in demo/ui/*/; do echo "$(basename $d) $(cat $d/* | wc -l) lines"; done
alert 11 · avatar 1 · badge 1 · button 1 · card 1 · checkbox 1 · collapsible 1 · dialog 1
dropdown-menu 1 · input 1 · label 1 · popover 1 · radio-group 1 · select 1 · separator 1
skeleton 1 · slider 1 · switch 1 · tooltip 1
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

19 of 19 are `export … from "@mkbabb/glass-ui"`. glass-ui publishes `./button`, `./card`, `./slider`
as first-class subpaths (74-key exports map), so each shim is a **third** route to a component that
already has two. `ConfigSliderPane.vue:16-23` uses all three routes in one block.

The rule that licenses it is written down and is itself stale — `demo/DESIGN.md:384`:

> *"**No hand-rolled Alert** — consume `Alert` / `AlertTitle` / `AlertDescription` from
> `@components/ui/alert`, which re-exports glass-ui's primitive (B.W2 idiomatic-gestalt finding N1).
> The barrel exists for ergonomics; the implementation is upstream."*

Two defects in one sentence: it blesses the dual path (edicts 2 + 4), and it cites `@components/ui/*` —
a path alias **deleted at W43 / RF-15** (`tsconfig.demo.json:36-38`, `vite.config.ts:68-70`). Same
file, `:375`, cites `panes/PaneHeader.vue`, which is now `demo/shared/ui/PaneHeader.vue`.

**Cure:** delete `demo/ui/` entirely; import `@mkbabb/glass-ui/{button,card,slider,…}`. Retract
DESIGN.md:384 and repoint :375. This is 19 files and ~30 lines deleted, no behaviour change.

**Cost caveat — the bundle claim is REFUTED, see §Negative proofs.** This finding stands on
one-home/dual-path grounds, not on bytes.

---

### L-5 · MAJOR — `tsconfig.demo.json` `paths` ≠ `package.json` `exports`: 3 of 8 entries are dead, 2 published subpaths are absent, and a `paths` hit *shadows* the exports map so the dogfood claim is unenforced for 5 of 7 subpaths.

```
$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize          # 7 keys, NO "." root
$ grep -n "@mkbabb/value.js" tsconfig.demo.json | sed -n '3,10p'
42:  "@mkbabb/value.js":          ["./dist/index.d.ts"]
43:  "@mkbabb/value.js/color":    ["./dist/subpaths/color.d.ts"]
44:  "@mkbabb/value.js/parsing":  ["./dist/subpaths/parsing.d.ts"]
45:  "@mkbabb/value.js/math":     ["./dist/subpaths/math.d.ts"]
46:  "@mkbabb/value.js/easing":   ["./dist/subpaths/easing.d.ts"]
47:  "@mkbabb/value.js/units":    ["./dist/subpaths/units.d.ts"]
48:  "@mkbabb/value.js/transform":["./dist/subpaths/transform.d.ts"]
49:  "@mkbabb/value.js/quantize": ["./dist/subpaths/quantize.d.ts"]
$ ls dist/ dist/subpaths/
dist/:          anchors-*.js  gh-pages  operations-*.js  result-*.js  subpaths
dist/subpaths/: color css easing math quantize transform value        # no parsing, no units, no index
```

Proven dead — probe against the real `tsconfig.demo.json`:

```
$ cat probe2.ts
import * as root    from "@mkbabb/value.js";
import * as parsing from "@mkbabb/value.js/parsing";
import * as units   from "@mkbabb/value.js/units";
import * as val     from "@mkbabb/value.js/value";
$ npx tsc -p tsconfig2.json --noEmit
probe2.ts(1,23): error TS2307: Cannot find module '@mkbabb/value.js' or its corresponding type declarations.
probe2.ts(2,26): error TS2307: Cannot find module '@mkbabb/value.js/parsing' or its corresponding type declarations.
probe2.ts(3,24): error TS2307: Cannot find module '@mkbabb/value.js/units' or its corresponding type declarations.
```

Three dead entries; `./value` (line 4) resolves fine, and it is *not in `paths` at all*. Two
resolution mechanisms are live at once — `--traceResolution` on the same tsconfig:

```
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.       ← paths wins
======== ...resolved to '/Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts' ========

'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.  Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.               ← self-reference
```

**Why this matters for the dogfood claim.** `tsconfig.demo.json:1-10` states the demo *"resolves the
value.js library through its PUBLISHED subpath `exports`"*. It does that for `/css` and `/value`
only. For `/color`, `/math`, `/easing`, `/transform`, `/quantize` a `paths` hit bypasses the exports
map entirely — delete `"./color"` from `package.json#exports` today and the demo still typechecks,
while the Vite alias set (generated *from* the exports map, `vite.config.ts:37-50`) silently loses
its entry. Typecheck surface and runtime surface are decoupled for 5 of 7 subpaths. The same header
comment also claims *"the 8 public keys"* and a bare `@mkbabb/value.js → dist/value.js` alias; there
are 7 keys and no root export, and glass-ui@7 imports value.js by **subpath only**
(`grep -rho '@mkbabb/value\.js[a-z/]*' node_modules/@mkbabb/glass-ui/dist/` → `color` ×7, `css` ×4,
`easing` ×2, bare ×0), so the whole bare-specifier rationale in `tsconfig.demo.json:20-25` and
`vite.config.ts:23-36` describes a glass-ui version that is no longer installed.

**Cure — delete the entire value.js `paths` block. Verified sufficient:**

```
$ cat tsconfig3.json          # extends tsconfig.base.json ONLY; no value.js paths at all
$ npx tsc -p tsconfig3.json --noEmit --traceResolution | grep "successfully resolved to '.../dist"
'@mkbabb/value.js/css'    → /Users/.../dist/subpaths/css.d.ts     Package ID …@4.0.0
'@mkbabb/value.js/color'  → /Users/.../dist/subpaths/color.d.ts   Package ID …@4.0.0
'@mkbabb/value.js/math'   → /Users/.../dist/subpaths/math.d.ts    Package ID …@4.0.0
'@mkbabb/value.js/easing' → /Users/.../dist/subpaths/easing.d.ts  Package ID …@4.0.0
```

Package **self-reference** already resolves every subpath to this checkout's own `dist/`, through
the exports map, with no `paths` at all. Deleting the block removes 3 dead entries, removes the
shadowing, and makes the dogfood claim *structurally* true: an unpublished subpath becomes
un-typecheckable. One mechanism, one door.

---

### L-6 · MAJOR — the published library declares a UI component library as a runtime dependency, and a second dependency with zero importers. Direction of dependency inverted; package graph cyclic.

```
$ sed -n '82,85p' package.json
    "dependencies": {
        "@mkbabb/glass-ui": "^7.0.0",
        "@mkbabb/keyframes.js": "^6.0.0"
    },
$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/ ; echo "(src: none)"
$ grep -rl "@mkbabb/glass-ui\|@mkbabb/keyframes" dist/subpaths dist/*.js ; echo "(published dist: none)"
$ grep -rn "@mkbabb/keyframes" src demo test e2e scripts plugins vite*.ts ; echo "(whole repo: none)"
$ node -e "console.log(Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies).length)"
11
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
$ ls node_modules/@mkbabb/pencil-boil || echo "NOT INSTALLED"
NOT INSTALLED
```

- `@mkbabb/keyframes.js` has **zero importers anywhere in the repository** and is a runtime
  dependency of the published package.
- `@mkbabb/glass-ui` is imported by 82 files in `demo/` and by **zero** files in `src/` or in the
  published `dist/`. `package.json:31-33` declares `"files": ["dist", "!dist/gh-pages"]`, so the
  tarball cannot contain a glass-ui importer.
- glass-ui declares `@mkbabb/value.js` as a **peerDependency** → the package graph is
  `value.js → glass-ui → (peer) value.js`. A cycle.
- glass-ui carries 11 peers (`@lucide/vue`, `@mkbabb/pencil-boil`, `@vueuse/core`, `embla-carousel`,
  `embla-carousel-vue`, `reka-ui`, `tailwindcss`, `tw-animate-css`, `vue`, …). `npm i @mkbabb/value.js`
  therefore drags 5.8 MB and demands eleven peers — for a package described in its own manifest as
  *"Immutable, failure-explicit CSS color, value, easing, transform, math, and quantization
  capabilities."* One of those peers is not even installed **here**.

**ConfigSliderPane is the proximate cause.** Its `Button` / `Card` / `Slider` / `GlassDock` /
`ConfiguratorRow` / `writeClipboard` are demo needs; they are in the *library's* `dependencies`
because the demo lives in the library's repo and nobody split the manifests. That is the
"wrong direction of dependency" this challenge names, at the highest altitude available.

**Cure:** move `@mkbabb/glass-ui` to `devDependencies`; delete `@mkbabb/keyframes.js` outright. If
`npm run build` (library mode) still succeeds — and it must, since `src/` never imports either —
the library's public manifest becomes honest and the cycle dissolves.

---

### L-7 · MAJOR — the contract's key is `string`; one consumer hand-rolled a 12-line mapped type to plug the hole and the other has no guard at all.

`ConfigSliderPane.vue:27-33`:

```ts
export interface SliderDef { key: string; label: string; min: number; max: number; step: number }
```

`key` is a dot-path into `config: Record<string, unknown>` (`:41-47`), and `read()` casts the result
(`:76-78` — `return readPath(config, key) as number`). Both ends of the pipe are erased. The two
consumers respond differently:

- **BlobPane** builds a 12-line recursive mapped type to recover what the contract threw away
  (`BlobPane.vue:36-52`, `NumericAtomPath`), with a 17-line comment explaining the double `-?`
  modifier strip. Its own words: *"A typo or an abrogated key fails typecheck here rather than
  silently no-op'ing a slider."*
- **AuroraPane** has no guard whatsoever — `AuroraPane.vue:97-106` are bare object literals whose
  `key` fields are plain strings.

Same contract, two enforcement regimes, because the guard was built in a **consumer** instead of the
**component that owns the contract**. The tax is measurable:

```
$ grep -rn "as unknown as\|as unknown) as" demo/ | wc -l
      10
$ grep -rn "as unknown as\|as unknown) as" demo/scenes/
demo/scenes/atmosphere/AuroraPane.vue:111:  :config="(atoms as unknown) as Record<string, unknown>"
demo/scenes/atmosphere/AuroraPane.vue:113:  :defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
demo/scenes/blob/BlobPane.vue:124:         :config="(cfg as unknown) as Record<string, unknown>"
demo/scenes/blob/BlobPane.vue:126:         :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
```

**4 of the demo's 10 double-casts (40%) exist solely to feed this one component's erased props.**

Type-level reachability, not yet a live break: `AuroraAtomsBase` makes every member optional
(`node_modules/@mkbabb/glass-ui/dist/components/aurora/composables/atoms.d.ts:141-152` — `zones?`,
`colorEnergy?`, `noise?`). `writePath` (`:66-73`) has **no guard** where `readPath` (`:57-64`)
returns `undefined` safely — so `writePath(config, "zones.count", v)` throws a TypeError if `zones`
is ever absent. Unreachable today because `DEFAULT_AURORA_ATOMS` always sets it. **Labelled a
hypothesis; no reproduction.**

**Cure:** make the contract generic — `SliderDef<T> { key: NumericPath<T>; … }` with `NumericPath<T>`
in **one** home, or adopt `ConfiguratorPreset<T>` which is already generic over the live config
shape. Both consumers become guarded; all four double-casts delete; BlobPane's 29-line type
apparatus deletes.

---

### L-8 · MAJOR — boot ⇄ scene dependency cycle; the shell's injection key is minted in a scene leaf.

```
demo/color-picker/composables/boot/useAtmosphere.ts:35
    import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";
demo/scenes/atmosphere/aurora-harmony-stops.ts:23
    import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/color-picker/` is the Vite `root` (`vite.config.ts:244,284`) — the shell. These two are the
**only** edges between the shell tree and the scenes tree, and they run in opposite directions.

The ownership is inverted at the same spot. `aurora-atoms.ts:1-13`'s own docblock says *"App.vue
owns the reactive object"* — and then the key and the defaults are minted in the scene leaf, so the
owner must import *up from* the thing it owns. Compare the blob: `BLOB_CONFIG_KEY` /
`BLOB_CONFIG_DEFAULTS` come from the producer (`BlobPane.vue:12`, `useAtmosphere.ts:36`) and no
cycle exists. Two config panes, two ownership models, one of them cyclic.

A third feature→boot edge exists outside the atmosphere subtree —
`demo/picker/ColorPicker.vue:129` → `../color-picker/composables/boot/useOverture`.

**Cure:** move `AURORA_ATOMS_KEY` + `DEFAULT_AURORA_ATOMS` to the boot layer (alongside the
`provide` at `useAtmosphere.ts:129`), and move `atmosphere-calibration`'s pure derivation out of
`boot/` into the atmosphere module. Edges then run boot → scene only.

---

### L-9 · MAJOR — `/#/blob` renders 0 of 31 rows below `lg`. The route lands on the wrong pane. MEASURED.

```
$ node mobile-probe.mjs      # WebKit, http://localhost:9000/#/blob
390  (iPhone)          {"configRows":0,  "configConsoles":0, "paneTitles":[]}
1023 (just under lg)   {"configRows":0,  "configConsoles":0, "paneTitles":[]}
1024 (lg)              {"configRows":31, "configConsoles":1, "paneTitles":["Blob"]}
```

Corroborated by the audit matrix — `audit/visual/REPORT.md:127,157`: `safari-desktop-light /#/blob`
text = **713**, tap-targets = **39**; `safari-mobile-light /#/blob` text = **69**, tap-targets = **8**.
`shots/safari-mobile-light/blob.png` shows the **picker** with a `Picker | Blob` segmented control,
`Picker` selected, at URL `#/blob`.

Cause is a three-table structural gap:

```
demo/color-picker/router/index.ts:29   { path: "/blob", name: "blob", component: Stub }
demo/shell/viewSchema.ts:179-187       blob: { left: "color-picker", right: "blob", … }   ← no defaultPaneIndex
demo/shell/useViewManager.ts:65        : (currentConfig.value.defaultPaneIndex ?? 0)
demo/shell/usePaneRouter.ts:180-186    mobile → desktopRight only when mobilePaneIndex === 1
```

The other two content-right views declare it (`palettes` `defaultPaneIndex: 1` at `viewSchema.ts:118`,
`mix` at `:150`); `blob` does not, and `?? 0` silently resolves to the picker. The invariant "a route
named for a pane must default the single-pane layout to that pane" is expressible and unexpressed;
nothing links the route table, the layout table, and the mobile default.

Severity MAJOR not BLOCKER: a tap on the segmented control reaches the content. But every shared
link, bookmark, e2e navigation, and this audit's own matrix sees the wrong pane.

**Cure:** derive the mobile default rather than declaring it — `defaultPaneIndex` becomes
`right === routeName ? 1 : 0`, or the schema gains a required `contentPane: "left" | "right"` and
`left`/`right` become presentation. Optional-with-silent-default is the mechanism; delete the
optionality.

---

### L-10 · MAJOR — "THE ONE RHYTHM SOURCE" is two byte-identical copies in two files.

`ComponentSliders.vue:326-334` (the FIRST slider population):

```css
/* … Offered to the ConfigSliderPane population (M-34) so the whole app has ONE rhythm source. */
.channel-strip { min-block-size: clamp(2rem, 7cqi, 2.625rem); }
```

`ConfigSliderPane.vue:208-217` (the SECOND):

```css
/* T.W8-WR-11 (T-59) — THE ONE RHYTHM SOURCE, offered to the config population (M-34) … */
.config-console :deep(.configurator-row) { min-block-size: clamp(2rem, 7cqi, 2.625rem); }
```

Identical clamp, identical constants, two homes. Same for the touch rung — `ComponentSliders.vue:345-355`
vs `ConfigSliderPane.vue:218-230`, rule bodies byte-identical:

```css
@media (pointer: coarse) {
    <selector> { position: relative; }
    <selector>::before { content: ""; position: absolute; inset-inline: 0; top: 50%;
        translate: 0 -50%; block-size: max(100%, var(--dock-touch-target, 2.75rem)); }
}
```

And a third: both populations re-ink `--slider-track-bg` locally (`ComponentSliders.vue:197`,
`ConfigSliderPane.vue:202`). Three recipes × two homes. The comment in the first file *claims* the
rhythm was "offered" to the second; the code shows it was **copied**. Stated intent contradicted by
implementation is the cleanest available proof of a missing home.

**Cure:** both belong on the producer's `size` axis (`ConfiguratorSize`) — the row density and the
coarse-pointer hit extension are properties of a control row, not of two panes. Relay to glass-ui;
delete both copies. (Consistent with the existing register entry
`excavation/extracts/glass-forward-compliance.md:106` — *"a wanted rung beyond 44px is a relay, never
a `::before`"*.)

---

### L-11 · MINOR — `:deep()` across the package boundary where the producer ships the declarative axis, plus a per-instance Tailwind override.

`ConfigSliderPane.vue:204-206, 215-217, 219-229` reach `:deep()` into `.configurator-row`,
`.configurator-row .font-mono`, `.configurator-row .glass-slider` — three producer-internal class
names, none of them API. The producer's docblock names this exact anti-pattern:

> *`ConfiguratorRow.vue.d.ts`: "All three are declarative props, so a consumer expresses a
> 'double-label' row (primary + secondary) **WITHOUT a `:deep()` reach into the slot** or a
> hand-rolled in-slot sans+mono pair."*

`:143` also carries `class="gap-1.5 py-1"` — a per-instance override of a row recipe the producer
exposes as `size` (`sm`/`md`/`lg`, prop-over-inject). Owner edict 5 (root-level styling, never
per-instance) violated at the exact point where the root-level knob exists.

The component gets half the lesson right — `:132-136` correctly uses `name` for the readout rather
than forking the row — then forks the readout's **ink** four lines later.

---

### L-12 · MINOR — `writeClipboard`'s failure-explicit result is discarded, in a library that advertises failure-explicitness.

`ConfigSliderPane.vue:88-90`:

```ts
async function copyAsJson() { await writeClipboard(JSON.stringify(config, null, 2)); }
```

The producer designed against exactly this:

> *`useClipboard.d.ts:31-37`: "Returns the discriminated result (`{ ok }` / `{ ok, reason }`)
> **rather than a lossy boolean**, for identical call ergonomics: `const { ok } = await writeClipboard(text)`."*
> `export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };`

Nothing on this pane reports failure. A denied clipboard permission is indistinguishable from
success. The demo runs two clipboard-feedback regimes side by side — 3 sites use `useClipboard`
with real `status` (`App.vue:362`, `MixResultDisplay.vue:31`, `GradientEasingEditor.vue:94`) and
~9 call `writeClipboard` bare, 7 of those with `void` or a discarded await. `package.json:4`
describes the library as *"Immutable, **failure-explicit** …"*; its own demo discards the explicit
failure.

**Cure:** one home. Adopt `useClipboard` at the pane and drive the Copy button's confirmed state
from `status`.

---

### L-13 · MINOR — generic object-graph plumbing trapped inside an SFC; contract types exported from a `.vue`.

`ConfigSliderPane.vue:57-73` (`readPath` / `writePath`) is pure, dependency-free, and generic — and
lives inside a Vue SFC, so it cannot be unit-tested without mounting a component, and cannot be
reused without importing a template + 74 lines of scoped CSS. `readPath` guards (`cur == null ||
typeof cur !== "object"` → `undefined`); `writePath` does not — asymmetric totality in a 17-line pair.

Same for `:27-39` — `SliderDef` / `SliderSection` are the contract, and every module that wants the
*type* must import the *component*.

Positive note: `split(".")` dot-path traversal has **exactly one home** in the repo
(`grep -rn 'split(".")' demo/ src/` → this file only). No duplication to report.

**Cure:** the plumbing dissolves entirely under L-3 + L-7 (a generic `ConfiguratorPreset<T>` needs
no untyped path walker). If any path helper survives, it belongs in a plain `.ts` module.

---

### L-14 · MINOR — masking fallback in the pane registry, reachable only because the signature widens away its own union.

`demo/shell/usePaneRouter.ts:81,94`:

```ts
function componentFor(name: string | null): Component | null {
    …
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;                        // ← masking fallback
}
```

Both call sites pass a **typed union** — `:165` `componentFor(left)` where `left: LeftPane`, `:171`
`componentFor(right)` where `right: RightPane` (`viewSchema.ts:52-67`). The parameter widens them to
`string`, which is the only reason the fallback compiles as reachable. An unknown pane name silently
renders the colour picker (owner edict 2 — no masking fallbacks).

**Cure:** `function componentFor(name: LeftPane | RightPane): Component | null` + a `switch` with a
`never` exhaustiveness arm. The fallback becomes a compile error instead of a silent picker.

---

### L-15 · INFO — dead optionality on `description` forces a conditional `v-bind`.

`ConfigSliderPane.vue:51` declares `description?: string`; `:107` then works around
`exactOptionalPropertyTypes` (`tsconfig.base.json:11`):

```html
<PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>
```

Every other `<PaneHeader>` in the demo passes a literal (`GradientPane:21`, `MixPane:75`,
`GeneratePane:32`, `ExtractPane:7`, `AboutPane:15`, `PalettesPane:10`), so this is the only site
where the optional-forwarding problem exists. And **both** consumers always supply one
(`AuroraPane.vue:115`, `BlobPane.vue:128`) — the optionality is dead.

**Cure:** make `description: string` required; `:107` collapses to `:description="description"`.
KISS (edict 3) without inventing anything.

---

### L-16 · INFO — a leaf component emits a global CSS class for its siblings.

`demo/shared/ui/PaneHeader.vue` ships an **unscoped** `<style>` block defining `.pane-scroll-fade`
(`scroll-timeline: --pane-scroll block`), consumed by 9 sibling panes including
`ConfigSliderPane.vue:106`. The file's own comment justifies it — *"the class is applied across
siblings of PaneHeader (not its descendants), so the block must be UNSCOPED"* — which is an accurate
description of an inverted contract, not a resolution of it: the class's **producer** is not its
**host**, and there is no type on the relationship.

`.console-well` is the counter-example done right: two consumers, one home in
`demo/styles/foundation.css:350`, documented at `:336-349`, and compliant with the demo's own rule
at `DESIGN.md:388`. Recorded as INFO because the pattern is already governed; it becomes moot under
the greenfield lattice, where `<Configurator scrollMode="auto">` owns the scroll port.

---

## 4 · Negative proofs — what I checked, and one r1 finding I refuted

**REFUTED — the root-barrel import costs nothing in the production bundle.** The r1 report at this
path asserted `@mkbabb/glass-ui` root-barrel = "25,239 B / 46 chunks where 4,179 B / 6 would do".
That compares *entry-file* sizes, not shipped bytes. glass-ui declares `"sideEffects": ["*.css"]`,
so its JS is tree-shakeable. Measured, two synthetic entries bundled identically:

```
$ npx esbuild barrel.mjs   --bundle --format=esm --minify --external:vue --external:reka-ui …
$ npx esbuild subpaths.mjs --bundle --format=esm --minify --external:vue --external:reka-ui …
82616  barrel.out.js      # import { Button, Card, Slider, writeClipboard } from "@mkbabb/glass-ui"
82620  subpaths.out.js    # …from "@mkbabb/glass-ui/{button,card,slider,dom}"
```

**The subpath version is 4 bytes LARGER.** The barrel finding survives as coherence/one-home only
(L-4); any byte-cost claim must be withdrawn. Static-import-graph size (78 modules / 297,935 B for
the current shape vs 50 / 143,606 B for the subpath shape) is a *dev-server module-graph* figure and
must not be quoted as bundle cost.

Checked and found sound:

- **Dot-path traversal has exactly one home.** No second `split(".")` object walker in `demo/` or `src/`.
- **`DEFAULT_AURORA_ATOMS` correctly omits `seed`** (`aurora-atoms.ts:53-77`), so `Object.assign`
  cannot clobber the picker colour on the aurora side. The L-1 blocker is blob-only. The author
  anticipated the class of defect on one pane and missed it on the other — which is the ownership
  argument, not a second bug.
- **Slider keys are all live.** `noise`, `colorEnergy`, `zones.count` all exist on `AuroraAtomsBase`
  (`atoms.d.ts:141-152`); BlobPane's 31 dot-paths are compiler-guarded by `NumericAtomPath`. No dead
  key today.
- **`verbatimModuleSyntax`** is honoured — the two type-only imports of `SliderSection` are
  `import type` (`AuroraPane.vue:34`, `BlobPane.vue:15`).
- **Vue 3.5 idioms** — reactive props destructure at `:41`; no template refs needed; no
  `defineModel` stale-read hazard (the pane writes through an injected reactive object, not a model).
- **`--slider-track-bg` is a real producer token**, not a private one — two `var(--slider-track-bg, …)`
  sites in `glass-ui.css`. The override is on the container (`.config-console`), not per instance.
- **`.console-well` is legitimately global** — two consumers, one home, documented, compliant with
  `DESIGN.md:388`.
- **Animations** — nothing deleted; the scroll-driven pane-header choreography lives with its
  producer and the coarse-pointer rules are additive.
- **Out of scope, already booked:** `dist/gh-pages/assets/` contains 2 JS files totalling 12,472 B
  with a 698 B entry — the known W44 §F prod-preview empty-mount carry. I therefore could **not**
  measure the real production bundle, and did not pretend to.

---

## 5 · The greenfield lattice

If I were structuring this today with no legacy:

```
demo/
  app/                      ← the shell. OWNS every provide-key and every route table.
    keys.ts                 AURORA_ATOMS_KEY · re-export BLOB_CONFIG_KEY · COLOR_MODEL_KEY …
    views.ts                ONE table:  ViewId → { component, contentPane, label, icon, accentHueShift }
    boot/                   useAtmosphere · useAtmosphereBoot · atmosphere-calibration
    router.ts               generated FROM views.ts — a route cannot exist without a view
  studios/                  ← Configurator consumers. Two files each, no shell.
    atmosphere/  AtmosphereStudio.vue  ·  aurora.presets.ts
    blob/        BlobStudio.vue        ·  blob.presets.ts
  workbenches/ · palettes/ · picker/ · session/            (unchanged areas)
  chrome/                   PaneHeader · EmptyState        (was shared/ui)
  styles/
  ✗ demo/ui/                            DELETED — 19 shim dirs; import glass-ui subpaths
  ✗ demo/scenes/ConfigSliderPane.vue    DELETED — Configurator + Layer + Row + useConfiguratorState
```

Concretely, `BlobStudio.vue` in full — this is the whole component:

```vue
<script setup lang="ts">
import { Configurator, ConfiguratorLayer, ConfiguratorRow,
         useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { Slider } from "@mkbabb/glass-ui/slider";
import type { BlobConfig } from "@mkbabb/glass-ui/blob";
import { BLOB_PRESETS, BLOB_LAYERS } from "./blob.presets";   // typed: SliderDef<BlobConfig>

const { config, isDirty, resetCurrent, activePreset, selectPreset } =
    useConfiguratorState<BlobConfig>({ presets: BLOB_PRESETS });
</script>

<template>
    <Configurator size="sm" scroll-mode="auto" :presets="BLOB_PRESETS"
                  :active-preset="activePreset"
                  @select-preset="selectPreset" @reset="resetCurrent">
        <template #stage><HeroBlob /></template>
        <template #controls>
            <ConfiguratorLayer v-for="l in BLOB_LAYERS" :key="l.id" :id="l.id" :label="l.label">
                <ConfiguratorRow v-for="d in l.defs" :key="d.key"
                                 :label="d.label" :name="d.format(read(d.key))"
                                 can-reset @reset="resetField(d.key)">
                    <Slider :aria-label="d.label" :min="d.min" :max="d.max" :step="d.step"
                            :model-value="[read(d.key)]" @update:model-value="…" />
                </ConfiguratorRow>
            </ConfiguratorLayer>
        </template>
    </Configurator>
</template>
```

No `<style>` block. No `:deep()`. No `Card`, no `GlassDock`, no `PaneHeader`, no `.config-console`,
no `.config-action-bar`, no `--slider-track-bg` re-ink, no `variant="spectrum"`, no `Object.assign`,
no `Record<string, unknown>`, no double-cast.

The type contract moves up one level and becomes generic — one home, both studios guarded:

```ts
// demo/studios/config-path.ts  (or, better, a relay: glass-ui exports it)
export type NumericPath<T> = { … };                       // BlobPane's mapped type, promoted
export interface SliderDef<T> {
    key: NumericPath<T>; label: string; min: number; max: number; step: number;
    format?: (v: number) => string;                       // replaces the hard-coded fmt() at :84-86
}
export interface SliderLayer<T> { id: string; label: string; defs: SliderDef<T>[] }
```

**Ownership after the transposition — exactly one home per concept:**

| concept | home |
|---|---|
| configurator frame · scroll port · footer · reset affordance · row density · touch rung · row ink · slider variant semantics | **glass-ui** |
| the two preset tables · the two `stage` contents · pane copy | **demo/studios** |
| provide keys · route↔view table · mobile content pane | **demo/app** |
| colour maths the studios consume | **@mkbabb/value.js**, through the exports map only |

**Manifest, after:** `@mkbabb/glass-ui` in `devDependencies`, `@mkbabb/keyframes.js` deleted, the
value.js `paths` block deleted from `tsconfig.demo.json`. The library's published dependency graph
becomes empty; the package cycle dissolves; and the demo's dogfood claim is enforced by the exports
map rather than asserted in a comment.

---

## 6 · Relay split

**glass-ui-owned (one letter, five arms — folds into the pending O-16 relay):**

1. `ConfiguratorSize` should carry the **coarse-pointer hit-area extension** (≥`--dock-touch-target`)
   and the **row block-size clamp**, so no consumer re-mints either (L-10).
2. `ConfiguratorRow` should expose the `name` readout's **ink token** (it currently forces a
   `:deep(.font-mono)` reach; the docblock says `:deep()` is the anti-pattern) (L-11).
3. `Configurator`'s `footer` slot receives `{ reset }` but not `{ isDirty }` / a copy affordance —
   the Copy-JSON action has no shipped home, which is why the demo grew `GlassDock` in a footer (L-3).
4. Consider exporting `NumericPath<T>` (or accepting `ConfiguratorPreset<T>` rows keyed by it) so
   consumers stop hand-rolling the mapped type (L-7).
5. Document that `variant="spectrum"` **requires** a gradient `--slider-track-bg` — the current
   recipe silently blanks `.slider-range`, which is a footgun the demo stepped in on 31 rows (L-2).

**value-owned, no producer dependency:** L-1, L-2 (drop the variant), L-4, L-5, L-6, L-8, L-9, L-12,
L-13, L-14, L-15.
