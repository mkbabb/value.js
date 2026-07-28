# CHALLENGE-L — library structure under `demo/scenes/ConfigSliderPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

## Provenance

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD drift, recorded:** the brief names `c654824e`; the working tree is at
  `80fc5c4054d5bd790b1b2b73280a2e0ced4535de` (`docs(V·mega): shell band COMPLETE-TRUE 12/12`).
  Nothing under `demo/` or `src/` moved between them; every line reference below was read at
  `80fc5c40`.
- This is **r3**. The r2 report that occupied this path is preserved verbatim at
  `challenge-L-library.pass-2-2026-07-28-prior.md`. §4 records the r2 claims I **refute by
  measurement**, and one hypothesis of my own that I refuted before publishing it.
- Subject: `demo/scenes/ConfigSliderPane.vue`, 252 lines (script 1–95 · template 97–177 · style
  179–252). Two consumers: `demo/scenes/atmosphere/AuroraPane.vue` (3 sliders) and
  `demo/scenes/blob/BlobPane.vue` (31 sliders). **34 rows ride this one component.**

**Verdict: DEFECTIVE.** Two BLOCKERs, eight MAJORs, four MINORs, two INFOs. Every finding below
carries a file:line, a pasted command, or a measured number; the two hypotheses are labelled.

**The mechanism, stated once.** glass-ui@7.0.0 ships a *configurator*: a frame, a scroll port, a
section layer, a labelled row, a density axis, a reset composable, a dock control, a touch-hit
utility, and a well surface. `ConfigSliderPane` adopts exactly one of those nine (`ConfiguratorRow`)
and hand-rolls the other eight inside a feature area, reaching across the package boundary with
`:deep()` to correct the mismatches. Every re-mint is a second home for a concept that already has
one, and every defect below leaks out of a seam between the two homes.

---

## 1 · The import trace — every edge, and whether it should exist

`ConfigSliderPane.vue:16-23`, all eight edges traced to their resolved home:

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 16 | `../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` | **VIOLATING** — alias shim (L-5) |
| 17 | `../ui/card` | `demo/ui/card/index.ts` → one-line re-export of `@mkbabb/glass-ui` | **VIOLATING** (L-5) |
| 18 | `../ui/slider` | `demo/ui/slider/index.ts` → one-line re-export of `@mkbabb/glass-ui` | **VIOLATING** (L-5) |
| 19 | `@lucide/vue` | devDependency, bare specifier | sound |
| 20 | `@mkbabb/glass-ui/dock` | published subpath; imports `GlassDock` but **not** `DockControl` | sound specifier, **wrong member** (L-8) |
| 21 | `@mkbabb/glass-ui/configurator` | published subpath; **1 of 5 exported primitives consumed** | sound specifier, **under-consumed** (L-3) |
| 22 | `../shared/ui/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | sound edge, **implicit global-CSS contract, violated** (L-9) |
| 23 | `@mkbabb/glass-ui` (root barrel) | `dist/glass-ui.js`; `writeClipboard`'s own door is `./dom` | **INCOHERENT** (L-5), byte cost REFUTED (§4) |

Three dialects of the **same package** inside one eight-line block: a demo shim barrel (16–18), two
published subpaths (20–21), and the root barrel (23).

**`@mkbabb/value.js` edges: ZERO**, direct and transitive. The full transitive closure of this
component — `PaneHeader.vue`, `aurora-atoms.ts`, `aurora-harmony-stops.ts`,
`color-session/color-chips/PreviewStrip.vue` — imports the library this repository publishes
**not once**. Repo-wide the demo does dogfood, and correctly:

```
$ grep -rho 'from "@mkbabb/value\.js[^"]*"' demo/ | sort | uniq -c | sort -rn
  24 from "@mkbabb/value.js/color"
  10 from "@mkbabb/value.js/css"
   6 from "@mkbabb/value.js/math"
   5 from "@mkbabb/value.js/easing"
   4 from "@mkbabb/value.js/quantize"
$ grep -rn 'from "@mkbabb/value.js"' demo/ | wc -l
       0
```

Every demo edge is a **published subpath** an outside consumer could write; there is no `@src/*`
deep path and no bare-root import (`package.json#exports` has no `"."` key). **The dogfood surface
is clean, and it is verified sound in §4** — including a hypothesis of mine that it was not.

---

## 2 · The dependency lattice, as measured

```
$ npm ls @mkbabb/value.js
@mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
├─┬ @mkbabb/glass-ui@7.0.0
│ └── @mkbabb/value.js@4.0.0
└─┬ @mkbabb/keyframes.js@6.0.0
  └── @mkbabb/value.js@4.0.0 deduped
```

The published library depends on two packages; both depend back on it; one of them is never
imported anywhere in the repository:

```
$ grep -rl "@mkbabb/glass-ui" src/ | wc -l         →  0
$ grep -rl "@mkbabb/keyframes" src/ | wc -l        →  0
$ grep -rl "@mkbabb/glass-ui" demo/ | wc -l        → 82
$ grep -rl "@mkbabb/keyframes" demo/ | wc -l       →  0
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js node_modules/@mkbabb/value.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
168K    node_modules/@mkbabb/value.js      ← a frozen tarball of this package, inside itself
```

Detail in L-4. Note the shape: `demo/` is where all 82 glass-ui edges live, and `src/` — the thing
`package.json#files` actually publishes — has zero.

---

## 3 · Findings

### L-1 · BLOCKER — `Reset` silently destroys the live picker→blob palette coupling. REPRODUCED.

`ConfigSliderPane.vue:92-94`:

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` is a **shallow, whole-subtree** overwrite. `BLOB_CONFIG_DEFAULTS.color` is a
top-level key, so pressing *Reset* on `/#/blob` replaces `config.color` **entire** — including
`color.paletteStops`, which is not a slider at all but the live picker-derived ramp written by
`demo/color-picker/composables/boot/useAtmosphere.ts:393`. `BlobPane.vue:8-9` states the invariant
in prose and the pane then breaks it:

> `color.paletteStops` is omitted: it is the live picker-palette feed (App.vue's `deriveBlobPalette`
> watch), not a slider.

Reproduction, against the installed glass-ui@7.0.0:

```
$ node --input-type=module -e "
import { BLOB_CONFIG_DEFAULTS } from '@mkbabb/glass-ui/blob-config';
const live = structuredClone(BLOB_CONFIG_DEFAULTS);
live.color.paletteStops = ['#112233','#445566','#778899','#aabbcc'];   // the picker-derived 4-stop ramp
Object.assign(live, structuredClone(BLOB_CONFIG_DEFAULTS));            // ConfigSliderPane.vue:93
console.log('after resetDefaults(), paletteStops =', JSON.stringify(live.color.paletteStops));
"
top-level keys: geometry, satellites, membrane, color, surface, interaction, morphT, quality, tempo
after resetDefaults(), paletteStops = ["#b5947f","#d4b27d","#dad6b1"]
```

The user's colour is replaced by glass-ui's canned tan ramp, and the stop **count** drops 4→3. The
recovery watch (`useAtmosphere.ts:386-392`) is keyed on `atmosphereColor`, so the blob stays wrong
until the picker colour next changes — potentially forever.

**Mechanism.** The pane re-minted reset semantics, and its re-mint is *shape-blind*: it cannot
express "restore the knobs, preserve the derived state" because the only description of what is a
knob — the `sections` table — is never consulted by `resetDefaults`. glass-ui owns this concept
(`useConfiguratorState.resetCurrent()` restores a *preset baseline*, with an injectable `clone` hook
for exactly the unclonable/derived case, `useConfiguratorState.d.ts:9-14,42`). The demo took the
name and none of the semantics.

**Cure (gestalt, not patch).** Delete `resetDefaults`. Drive reset from
`useConfiguratorState<BlobConfig>({ presets })`, whose baseline is a declared preset rather than a
raw defaults object; the derived `paletteStops` then lives outside the preset table by construction.
The patch-shaped alternative — iterating `sections` and writing only slider paths — is strictly
worse: it keeps a second home for reset alive.

---

### L-2 · BLOCKER — `variant="spectrum"` is the wrong design-system variant, and one prop produces three measured defects across 31 rows.

`ConfigSliderPane.vue:146` passes `variant="spectrum"` to every slider. That variant is not a style;
it is a **contract**. From `dist/glass-ui.css`:

```
.glass-slider[data-variant=spectrum] .slider-track { height: calc(var(--slider-thumb-size,1rem)*1.5);
                                                     background: var(--slider-track-bg, var(--secondary)) }
.glass-slider[data-variant=spectrum] .slider-range { backdrop-filter:none; box-shadow:none; background:0 0 }
.glass-slider[data-variant=spectrum] .slider-thumb { width: calc(var(--slider-thumb-size,1rem)*.75); ... }
```

The contract reads: *the consumer paints a gradient onto the track; there is no filled/unfilled
split; the thumb is a narrow position marker.* That is exactly right for the picker's L/a/b/α ramps
and exactly wrong for 31 abstract numeric knobs. Measured live (WebKit 1440×900, `/#/blob`):

```json
{ "rowCount": 31, "sliderCount": 31,
  "trackBackground": "oklch(0.446872 0.003862 34.629978)",   // --ink-muted, a FLAT solid
  "trackBackgroundImage": "none",                            // no spectrum exists
  "rangeBackground": "rgba(0, 0, 0, 0)",                     // the value fill paints nothing
  "rangeWidth": "163.46875px",                               // …but is laid out and sized, 31×
  "sliderTrackBgVar": "oklch(44.687157993053% 0.003861589952 34.629978305623deg)" }
```

Three consequences, each independently measured:

1. **No value affordance.** `.slider-range` is transparent by recipe, so the only cue for "where is
   this value in its range" is a 12px thumb. The layout engine computes a 163px range box on every
   one of 31 rows and paints none of it.
2. **A token-role violation to make the track visible at all.** `:202` feeds
   `--slider-track-bg: var(--ink-muted, …)` — `--ink-muted` is the boot-stamped **text** ink
   (`PaneHeader.vue:118-121` uses it as caption colour) — into a **control surface**. The comment at
   `:190-201` documents the whole detour: the author found the default `--secondary` track invisible
   (~1.09:1), and re-inked it rather than reading the invisibility as evidence of the wrong variant.
   `standard` paints `.slider-range` with the glass material and needs no override at all.
3. **31 of the app's 39 worst-route tap-target failures.** `capture.mjs:98` thresholds at WCAG 2.2
   SC 2.5.8 (`m.w < 24 || m.h < 24`). `/#/blob` is the single worst route in the entire 60-capture
   matrix — **39 defects, against a next-worst of 8** (`REPORT.md:41`) — and `REPORT.json` names
   them: 31 entries of `{"w":12,"h":24,"tag":"span","label":"Body Radius" | "Satellites" | …}`. The
   width 12 is `calc(var(--slider-thumb-size) * .75)`, the spectrum marker geometry. It does not
   improve on touch: measured at 390 coarse the thumb is **12×44** — still RED on the width.

**The visual proof.** `shots/safari-desktop-light/blob.png` shows both populations side by side: the
picker console at left carries four real spectra; ConfigSliderPane at right carries 31 identical
charcoal slabs with hollow markers. One component, one prop, two semantics.

**Cure.** `variant="standard"`, and delete `--slider-track-bg` (`:202`) and the `:deep(.font-mono)`
re-ink (`:204-206`) with it. The three defects have one root.

---

### L-3 · MAJOR — glass-ui `./configurator` ships five primitives built for these two panes by name; the demo consumes one and re-rolls four. A sixth primitive, `InstrumentChassis`, has zero demo consumers.

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/configurator/index.d.ts
export { default as Configurator } from "./Configurator.vue";
export { default as ConfiguratorLayer } from "./ConfiguratorLayer.vue";
export { default as ConfiguratorRow } from "./ConfiguratorRow.vue";
export { CONFIGURATOR_SIZE_KEY, provideConfiguratorSize, useOptionalConfiguratorSize, type ConfiguratorSize }
export { useConfiguratorState, type ConfiguratorCloneMode, type ConfiguratorState, type ConfiguratorStateOptions }
```

The producer wrote these **for this consumer, naming it**:

- `ConfiguratorLayer.vue.d.ts:5-7` — *"Authors stack multiple layers to express the per-axis split…
  aurora has Medium / Palette / Flow / Texture / Comp / Nuclei; **blob has Mood / Body / Surface /
  Color / Motion / Pointer / Render**."* That is BlobPane's `SECTIONS` array, listed by the
  producer. The demo instead hand-rolls `.config-section-header` / `.config-section-title`
  (`:232-243`).
- `ConfiguratorRow.vue.d.ts:19` — the double-label API is annotated *"(value.js L14)"*: this repo
  asked for it and got it. It is the **one** thing the pane adopted.
- `Configurator.vue.d.ts:1-18` — `scrollMode: "auto"` renders a `<FadingScroll axis="y">` scroll
  port; the demo hand-rolls `.pane-scroll-fade scrollbar-thin overflow-y-auto` (L-9).
- `Configurator` `footer` slot receives `{ reset }`; the demo hand-rolls `.config-action-bar`
  (`:245-251`) with a border-top hairline.
- `size` cascades to descendant rows via `provide`/`inject`; the demo hand-rolls a `:deep()`
  `min-block-size` clamp (L-6) and a per-instance `class="gap-1.5 py-1"` (L-12).
- `useConfiguratorState` owns reset + `isDirty` + a `clone` hook; the demo hand-rolls L-1.

The component's own header comment (`:6-10`) is **factually wrong** about what it did:

> HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState.
> This component uses ConfiguratorRow … The section-group wrapper and the floating copy/reset dock
> remain demo-local (**they are thin structural shells, not the row primitive**).

They are not thin structural shells. `ConfiguratorLayer` is the section group and it ships; the
footer is a declared `Configurator` slot and it ships. The comment names two of the four re-mints
and misdescribes both.

**And there is a sixth.** `@mkbabb/glass-ui/instrument-chassis` ships slots
`stage` / `inspector` / `action` with `boundaries: "stage-inspector" | "inspector-action"` — the
exact shape of `Card > scroll region + bordered action footer` that `ConfigSliderPane.vue:99-175`
builds by hand:

```
$ grep -rn "InstrumentChassis" demo/ | wc -l
0
```

**Cure.** `Configurator` + `ConfiguratorLayer` + `ConfiguratorRow` + `useConfiguratorState`. The
component's `<style>` block goes to zero (see §5).

---

### L-4 · MAJOR — the published library declares a 5.2 MB Vue design system and an unimported package as **runtime dependencies**; the direction of dependency is inverted and the graph is cyclic.

`package.json:99-102`:

```json
"dependencies": { "@mkbabb/glass-ui": "^7.0.0", "@mkbabb/keyframes.js": "^6.0.0" }
```

Measured against the tree that is actually published (`"files": ["dist", "!dist/gh-pages/**"]`,
built from `src/` only):

| package | installed size | importers in `src/` | importers in `demo/` |
|---|---:|---:|---:|
| `@mkbabb/glass-ui` | 5.2 MB | **0** | 82 |
| `@mkbabb/keyframes.js` | 608 KB | **0** | **0** |

`grep -rl "@mkbabb/glass-ui" src/` returns nothing; `tsconfig.demo.json:26-27` states the invariant
outright — *"the library program (`tsconfig.lib.json`) never [sees glass-ui] (inv-K-1 —
structurally glass-ui-free)"*. The manifest contradicts the invariant it documents.

Consequence for a real consumer: `npm i @mkbabb/value.js` — advertised as *"Immutable,
failure-explicit CSS color, value, easing, transform, math, and quantization capabilities"* — drags
in 5.8 MB, a Vue 3 + reka-ui + Tailwind v4 peer graph, and a cycle back onto itself.

**The cycle is not abstract.** `@mkbabb/keyframes.js@6.0.0` declares `"@mkbabb/value.js": "4.0.0"` —
an **exact pin** — so npm materialises a frozen 4.0.0 tarball of this package *inside its own*
`node_modules` (168 KB). glass-ui is blameless here: it declares value.js as an **optional
peerDependency**, the correct shape. The self-copy exists solely because `keyframes.js` is in
`dependencies` with zero importers.

The self-copy is currently **shadowed** by TypeScript's package self-reference and by the Vite
self-alias, so it does not bite today — proven in §4, where I refute my own hypothesis that it did.
It is a latent hazard: it already diverges from the local build (34 diverging lines in
`css.d.ts`, §4), and any resolution change that stops preferring self-reference makes the demo
typecheck a frozen copy while Vite bundles the live one.

**Cure.** Both entries move out of `dependencies`: `@mkbabb/glass-ui` → `devDependencies` (it is the
demo's, and 82 demo files agree); `@mkbabb/keyframes.js` → **deleted** (zero importers). The
published dependency graph becomes empty, the cycle dissolves, and the self-copy stops existing.

---

### L-5 · MAJOR — `demo/ui/` is a 19-directory pure-alias shim over the glass-ui root barrel, load-bearing for 50 files, codified by a DESIGN.md rule that cites two dead paths.

```
$ find demo/ui -type f | wc -l          → 19        # every one an index.ts
$ find demo/ui -name "*.vue" | wc -l    →  0        # zero implementations
$ cat demo/ui/card/index.ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
$ cat demo/ui/slider/index.ts
export { Slider } from "@mkbabb/glass-ui";
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

All 19 are one-line re-exports. Scale:

```
$ grep -rl 'ui/button\|ui/card\|ui/slider\|ui/select\|…' demo/ | wc -l   → 50 files
$ grep -rho 'from "[^"]*ui/[a-z-]*"' demo/ | grep -v glass-ui | wc -l    → 90 import statements
```

glass-ui ships `./button`, `./card`, `./slider`, `./select` as first-class subpaths
(`package.json#exports`, 70 keys). The shim adds a name, a file, and a second door, and buys
nothing — the owner edict is explicit: *no aliases, no dual paths, no back-compat shims.*

**The rule that keeps it alive is doubly stale.** `demo/DESIGN.md:384`:

> **No hand-rolled Alert** — consume `Alert` / `AlertTitle` / `AlertDescription` from
> `@components/ui/alert`, which re-exports glass-ui's primitive… **The barrel exists for ergonomics**.

`@components` was killed at W43/RF-15 (`tsconfig.demo.json:32-35`: *"the demo `@…` path aliases were
killed — every demo import is relative to its physical home"*). The specifier in the governing rule
does not resolve. And `DESIGN.md:304` describes `demo/@/components/ui/` as holding *"shadcn-vue
generated"* components — a directory with **zero** `.vue` files at HEAD.

**Cure.** Delete `demo/ui/`; rewrite 90 imports to `@mkbabb/glass-ui/<subpath>`; delete DESIGN.md
:384 and correct :304. One door per primitive. For this component specifically that also collapses
the three-dialect import block of §1 to one dialect, and moves `writeClipboard` onto its own door
(`@mkbabb/glass-ui/dom`) instead of the root barrel.

---

### L-6 · MAJOR — "THE ONE RHYTHM SOURCE" exists twice, and the two copies produce two different rhythms. MEASURED.

```
$ grep -rn "clamp(2rem, 7cqi, 2.625rem)" demo/
demo/scenes/ConfigSliderPane.vue:216:    min-block-size: clamp(2rem, 7cqi, 2.625rem);
demo/picker/controls/ComponentSliders/ComponentSliders.vue:332:    min-block-size: clamp(2rem, 7cqi, 2.625rem);
```

Both sites carry the same prose. `ComponentSliders.vue:325-326`: *"Offered to the ConfigSliderPane
population (M-34) so the whole app has ONE rhythm source."* `ConfigSliderPane.vue:208-210`: *"THE ONE
RHYTHM SOURCE, offered to the config population (M-34): the same container-scaled law the picker
console carries, so the app has ONE rhythm regime, never a per-population hand-tune."* A law named
"one source" that is stored in two files is already refuted by its own name.

It is worse than duplication — **the copies do not agree.** Measured, same page, WebKit 1440:

```json
{ "channelStripHeight": 36,      "channelStripMinBlock": "35.84px",   // picker  — clamp BINDS
  "configuratorRowHeight": 61,   "configuratorRowMinBlock": "35.84px" // config  — clamp INERT
}
```

The picker row lands on the clamp (36 ≈ 35.84px). The config row's intrinsic content — label line +
24px spectrum track + gap — is **61px**, so `min-block-size: 35.84px` never binds and the rule is
dead CSS. The two "one rhythm" populations differ by **1.69×**, which is the same order as the
1.83× discontinuity `ComponentSliders.vue:319-322` says the law was written to retire.

(Container check: `.config-console` has `container-type: normal`; the nearest size container is
`.pane-wrapper` at 512px — `demo/styles/shell.css:82-84` — so `7cqi` = 35.84px. The unit is
well-formed; the rule is simply inert on this population.)

**Cure.** Delete both copies. `ConfiguratorSize` (`size.d.ts:1-20`) is the producer's density axis
and it cascades by `provide`/`inject`; the row rung belongs there, set once on `<Configurator>`.
If the picker's exact clamp is wanted, it is a glass-ui relay (§6), not a demo class.

---

### L-7 · MAJOR — the coarse-pointer hit-area extension re-mints a utility glass-ui already ships, cures the axis that was already passing, and is a measured no-op.

`ConfigSliderPane.vue:218-230`:

```css
@media (pointer: coarse) {
    .config-console :deep(.configurator-row .glass-slider) { position: relative; }
    .config-console :deep(.configurator-row .glass-slider)::before {
        content: ""; position: absolute; inset-inline: 0; top: 50%; translate: 0 -50%;
        block-size: max(100%, var(--dock-touch-target, 2.75rem));
    }
}
```

glass-ui ships this recipe, by that name, for exactly this purpose —
`dist/styles/utilities/a11y-overrides.css`:

```css
@utility touch-hit-area { position: relative;
  @media (pointer: coarse) { &::before { content:""; position:absolute; top:50%; left:50%;
      translate:-50% -50%; min-width: var(--touch-target, 2.75rem);
      min-height: var(--touch-target, 2.75rem); pointer-events:none; } } }
```

…and a second mechanism in `dist/styles/utilities/responsive.css`:

```css
@media (pointer: coarse) { [data-control-target] { min-block-size: var(--touch-target, 2.75rem);
                                                  min-inline-size: var(--touch-target, 2.75rem); } }
```

Both producer forms cure **both axes**. The demo's re-mint sets `block-size` only. Measured at 390
coarse, after the pane is reached:

```json
{ "coarse": true, "rowCount": 31, "sliderH": 44, "pseudo": "44px",
  "thumb": { "w": 12, "h": 44 } }
```

and at 1024 coarse:

```json
{ "pointerCoarse": true, "sliderHostHeight": 44, "pseudoBlockSize": "44px",
  "dockTouchTarget": "2.75rem" }
```

Two facts fall out. First, `.glass-slider` is **already 44px on coarse** by glass-ui's own density
clamp (`dist/styles/tokens/light-dark.css`: `@media (pointer: coarse) { :root { --ui-scale: …;
--control-floor: var(--touch-target, 2.75rem) } }`) — it measures 24px on fine, 44px on coarse
without the demo's help. So `max(100%, 2.75rem)` = `max(44px, 44px)`: **the block is a no-op on its
own axis.** Second, the axis that is actually RED is the **width** — the `role="slider"` thumb is
12px wide at every viewport (L-2), and a pseudo on the *parent* cannot change the focusable
element's own box. The cure is on the wrong axis, of a problem that has a producer solution, in a
place the producer already handles.

It also borrows the wrong token: `--dock-touch-target` is the **dock's** density knob
(`dist/styles/tokens/sizing.css`); `--touch-target` is the general hit-target token. Both are
`2.75rem` today, so this is scope-borrow rather than breakage.

**Cure.** Delete `:218-230`. Fix the width at its root by dropping `variant="spectrum"` (L-2); if a
hit extension is still wanted, apply the producer's `touch-hit-area` utility or `[data-control-target]`.

---

### L-8 · MAJOR — a raw `<Button>` inside `<GlassDock>` where the design system ships `DockControl`, and the demo already uses `DockControl` for the identical action.

`ConfigSliderPane.vue:164-173` puts two `<Button variant="ghost" size="sm">` directly inside
`<GlassDock>`. glass-ui's dock-child primitive is `DockControl`, and its docblock states the
guarantee the raw Button does not carry (`DockControl.vue.d.ts:12-16`):

> ONE FACE, the folded safe-inset… the **HIT CELL stays the full `--dock-control-size`
> (≥44px on coarse via the density clamp)** — hit box ≠ paint box.

The demo's own idiom is `DockControl`, in four files:

```
$ grep -rn "DockControl" demo/ | grep import
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:13
demo/workbenches/mix/MixResultDisplay.vue:3
demo/workbenches/extract/ExtractWorkbench.vue:187
demo/workbenches/extract/ExtractControls.vue:98
```

and `GradientVisualizer.vue:254` implements the **same semantic action** — copy-to-clipboard from a
dock — as `<DockControl compact title="Copy CSS" @click="copyCSS">`. ConfigSliderPane is the sole
consumer that spells it differently. Measured consequence, WebKit 1440:

```json
"actionBarButtons": [ { "label": "Copy JSON", "w": 135, "h": 36 },
                      { "label": "Reset",     "w":  89, "h": 36 } ]
```

36px controls with no coarse hit cell, because the primitive that guarantees one was bypassed.

**Cure.** `<DockControl>`; or, better, delete the bespoke dock entirely and use `Configurator`'s
`footer` slot, which receives `{ reset }` (L-3).

---

### L-9 · MAJOR — `.pane-scroll-fade` fades nothing, is applied against its own documented contract, and duplicates a glass-ui primitive the demo has already adopted elsewhere.

Measured, WebKit 1440, `/#/blob`:

```json
{ "scrollFadeClassPresentOn": "pane-scroll-fade scrollbar-thin flex-1 min-w-0 overflow-y-auto overflow-x-hidden",
  "scrollFadeMask": "none",
  "scrollFadeContain": "content",
  "scrollFadeScrollTimeline": "--pane-scroll",
  "scrollHeights": { "client": 695, "scroll": 2605 } }
```

Three defects in one class:

1. **The name is a lie.** The sole definition (`PaneHeader.vue:54-57`) sets `contain` and
   `scroll-timeline` and nothing else; computed `maskImage` is `none`. There is no fade, in nine
   consumers. A name that promises a removed behaviour is legacy residue.
2. **This consumer violates the class's own documented contract.** `PaneHeader.vue:43-46`:
   *"The `.pane-scroll-fade` host class lives on the **ROOT element** of each pane Card (9 sibling
   panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/Generate/**ConfigSlider**)."* At
   `ConfigSliderPane.vue:106` it is on an **inner div** inside the Card. Eight consumers put it on
   the Card root (`GradientPane.vue:20`, `MixPane.vue:62`, `ExtractPane.vue:5`, `GeneratePane.vue:31`,
   `AboutPane.vue:4`, `BrowsePane.vue:2`, `AdminPane.vue:2`, `PalettesPane.vue:2`); this one does not.
3. **The concept has a producer home the demo already uses.** glass-ui ships `FadingScroll`
   (`@mkbabb/glass-ui/fading-scroll`, `axis: "x" | "y"`, `fadeStart`, `fadeEnd`, `ariaLabel`) and
   `Configurator`'s `scrollMode` renders one automatically. The demo has adopted it — once —
   at `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:84`
   (`<FadingScroll axis="x">`). So the primitive is known, installed, and proven in-repo, and the
   vertical case is still hand-rolled nine times.

The cost is real: **2605px of content inside a 695px port (3.7×)** on desktop and **3071/636
(4.8×)** at 390, with no fade, no gradient, and a hairline scrollbar as the only cue.

**Cure.** `Configurator scrollMode="auto"` (or `<FadingScroll axis="y">` directly); delete
`.pane-scroll-fade` from this component. Repo-wide the class should be renamed to what it does
(`.pane-scroll-host`) or replaced by `FadingScroll` at all nine sites — that is a separate wave.

---

### L-10 · MAJOR — `/#/blob` does not render the blob pane below `lg`: 0 of 31 rows. The route is the defect, not the layout. MEASURED.

```json
// webkit 390×844, isMobile, goto http://localhost:9000/#/blob
{ "hash": "#/blob?space=lab&color=lab(92%25+88.8+20+/+82.7%25)",
  "configConsolePresent": false, "rowCount": 0, "actionBarPresent": false,
  "paneHeaderTitles": [], "bodyTextLen": 69 }
```

Corroborated by the audit matrix: `REPORT.md:157` records `/#/blob` at 69 characters of text on
mobile against 713 on desktop — the largest desktop/mobile text delta of any route.
`shots/safari-mobile-light/blob.png` shows why: the segmented control reads **Picker | Blob** with
**Picker** selected, while the URL says `blob`. The route resolves the pane
(`usePaneRouter.ts:78,92`) but the mobile single-pane segment does not follow it.

**It is purely the route→segment default.** Clicking the "Blob" segment renders everything:

```json
// same context, after clicking the "Blob" button
{ "configConsolePresent": true, "rowCount": 31, "sliderH": 44, "coarse": true,
  "thumb": { "w": 12, "h": 44 }, "scroll": { "client": 636, "scroll": 3071 } }
```

So no layout gate hides the pane; the mobile segment simply ignores the route. A shared link to
`/#/blob` opened on a phone shows the colour picker.

**Ownership.** The defect belongs to the shell (`demo/shell/usePaneRouter.ts` + the mobile pane
segment), not to ConfigSliderPane — but it is the reason this component's entire 31-row surface is
unreachable by URL on half the matrix, and it must be carried with the component. From the
library-structure seat the finding is: **a scene has no say in its own addressability**; the route
table and the mobile content-pane default are two tables that can disagree, and they do.

---

### L-11 · MINOR — `.console-well` is an interim duplicate whose own declared retirement precondition is already satisfied at the installed glass-ui.

`demo/styles/foundation.css:339-354` defines `.console-well` and states its own sunset:

> INTERIM demo class — swaps onto the producer `.glass-well` rung when packet P3 ships
> (BOOKED, T.W3 §BOOKS).

The producer rung exists at the installed version:

```
$ grep -o "\.glass-well[^{]*{[^}]*}" node_modules/@mkbabb/glass-ui/dist/styles/glass/surface-axis.css
.glass-well { --glass-well-tone: 8%;
  background: color-mix(in oklab, var(--card), var(--foreground) var(--glass-well-tone));
  box-shadow: inset 0 1px 2px color-mix(in srgb, var(--foreground) 8%, transparent);
  border-radius: var(--radius-md); }
```

glass-ui also ships a `Surface` component with a `tier`/`material`/`deep` axis
(`@mkbabb/glass-ui/surface`). The booked swap is executable today; until it runs, the demo carries a
second home for the well recipe. (Measured: `.config-console` and `.console-well` are the **same
element** — `ConfigSliderPane.vue:122` — so one box is styled from two files, a global utility and a
scoped block.)

This refutes the r2 report's classification of `.console-well` as "checked and found sound"; see §4.

---

### L-12 · MINOR — two `:deep()` reaches across the package boundary, plus a per-instance override where the producer ships the declarative axis.

`ConfigSliderPane.vue:204-206`, `:215-217`, `:219-229` all target glass-ui-internal class names
(`.configurator-row`, `.font-mono`, `.glass-slider`) from the demo's scoped stylesheet. Producer
class names are not a public API; a rename in glass-ui silently breaks these rules with no
typecheck, no lint, and no test.

`ConfiguratorRow`'s docblock names this exact anti-pattern as the reason its API exists
(`ConfiguratorRow.vue.d.ts:22-28`):

> All three are declarative props, so a consumer expresses a "double-label" row **WITHOUT a
> `:deep()` reach into the slot or a hand-rolled in-slot sans+mono pair**.

The pane took the `name` prop and then reached in anyway to re-ink it. Separately, `:143` passes
`class="gap-1.5 py-1"` per instance — the producer ships `size?: ConfiguratorSize` with a documented
resolution order (local prop → `Configurator` inject → baked recipe), and the owner edict is
root-level styling, never per-instance overrides.

**Cure.** `size="sm"` on the row (or once on `<Configurator>`); the ink question becomes a relay
(§6) rather than a `:deep()`.

---

### L-13 · MINOR — `writeClipboard`'s failure-explicit result is discarded, in a repo whose own package description advertises failure-explicitness, and whose own demo has the correct idiom in two files.

`ConfigSliderPane.vue:88-90`:

```ts
async function copyAsJson() {
    await writeClipboard(JSON.stringify(config, null, 2));
}
```

The producer returns a discriminated result and says so
(`dist/composables/dom/useClipboard.d.ts:31-37`):

> Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy boolean, for
> identical call ergonomics: `const { ok } = await writeClipboard(text)`.

`CopyFailureReason` is `"clipboard-api" | "no-api"`. The pane checks neither, and renders no
confirmation on success either. The demo already ships the right idiom **twice** —
`MixResultDisplay.vue:31` and `GradientEasingEditor.vue:94` both use
`useClipboard({ resetMs })` and bind `status`. So "copy with feedback" has two homes in the repo and
this pane chose a third: none.

`package.json:4` — *"Immutable, **failure-explicit** CSS color, value, easing…"*. The flagship
consumer of a failure-explicit house style discards a failure-explicit result.

---

### L-14 · MINOR — the contract types live inside a `.vue`, the object-graph plumbing is trapped in an SFC, and the config prop is typed `Record<string, unknown>` — forcing a double cast at both call sites.

`ConfigSliderPane.vue:27-39` exports `SliderDef` and `SliderSection` **from a Vue single-file
component**, and both consumers import them back out of it:

```
demo/scenes/atmosphere/AuroraPane.vue:34:import type { SliderSection } from "../ConfigSliderPane.vue";
demo/scenes/blob/BlobPane.vue:15:import type { SliderSection } from "../ConfigSliderPane.vue";
```

The schema of the pane protocol is data, not view; its home is a `.ts` module. Likewise `readPath` /
`writePath` (`:57-73`) are a general dot-path object walker with no Vue in them, unreachable and
untestable because they live in `<script setup>`.

The consequence is at the boundary. `config: Record<string, unknown>` and
`defaults: Record<string, unknown>` (`:41-52`) erase every type both consumers have, so both must
double-cast:

```
BlobPane.vue:124    :config="(cfg as unknown) as Record<string, unknown>"
BlobPane.vue:126    :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
AuroraPane.vue:111  :config="(atoms as unknown) as Record<string, unknown>"
AuroraPane.vue:113  :defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
```

Four `as unknown as` at two call sites, and `SliderDef.key: string` accepts any string. BlobPane
then pays for the hole with a **12-line homomorphic mapped type** (`BlobPane.vue:36-48`,
`NumericAtomPath`) whose comment explains two levels of `-?` stripping — real engineering, in the
wrong file, solving a problem the contract created. AuroraPane has no equivalent guard at all: its
three keys are unchecked strings.

**Cure.** Make the component generic over the config: `SliderDef<T>` with `key: NumericPath<T>`, in
a `.ts` module, with `NumericPath<T>` promoted from BlobPane (and ideally relayed to glass-ui, §6).
The double casts and the per-consumer guard both disappear.

---

### L-15 · INFO — `exactOptionalPropertyTypes` forwarding contrivance.

`ConfigSliderPane.vue:107`:

```vue
<PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>
```

An object-spread ternary to forward one optional string, because `exactOptionalPropertyTypes: true`
(`tsconfig.base.json:12`) forbids passing `description: undefined` to `description?: string`. The
gestalt fix is at the contract, not the call: `PaneHeader` should accept
`description?: string | undefined`, or the pane should default it. Both consumers always pass a
description (`AuroraPane.vue:115`, `BlobPane.vue:128`), so the optionality is dead weight today.

---

### L-16 · INFO — two homes for shared demo UI, and `scenes/` is a bucket rather than a concept.

`demo/shared/ui/` holds the cross-area shared components (`PaneHeader.vue`, `EmptyState.vue`).
`ConfigSliderPane.vue` is equally cross-area — consumed from `scenes/atmosphere/` and `scenes/blob/`
via a parent reach `../ConfigSliderPane.vue` — but sits as a **bare file at an area root**. That is
a third placement idiom for the same kind of thing.

And `demo/scenes/` groups `about/` (a markdown + KaTeX documentation reader) with `atmosphere/` and
`blob/` (two configurator studios over glass-ui generators). The latter two are a real family; the
former shares nothing with them. `scenes` names a directory, not a concept.

---

## 4 · Negative proofs — what I verified sound, including one hypothesis of mine and three r2 claims

### 4.1 · REFUTED (mine, before publication) — the demo does **not** typecheck against a stale copy of value.js.

I hypothesised that `tsconfig.demo.json`'s `paths` table (which covers `color`, `math`, `easing`,
`transform`, `quantize` but **not** `css` or `value`) let the two uncovered subpaths resolve through
`node_modules/@mkbabb/value.js` — the frozen self-copy of L-4 — while Vite bundles the local
`dist/`. The two copies do differ:

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts | grep -c '^[<>]'
34
```

An out-of-package probe appeared to confirm it. **That was an artifact of probe placement.** Rerun
with the probe file *inside* the package — which every real `demo/` file is — TypeScript's package
self-reference takes the specifier before the `node_modules` walk:

```
$ npx tsc -p <in-package probe, extends tsconfig.demo.json> --noEmit --traceResolution | grep resolved
'@mkbabb/value.js/css'   → /Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts       ← LOCAL
'@mkbabb/value.js/color' → /Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts     ← LOCAL
```

**Type resolution and runtime resolution agree**, for both the `paths`-covered and the
`paths`-uncovered subpaths. The claim is withdrawn in full. (Two lessons worth recording: a
`Package ID` stamp in `--traceResolution` is *not* evidence of a `node_modules` read — self-reference
stamps it too; and a resolution probe placed outside the package under test measures a different
program.)

The same in-package run also confirms the r2 report's proposed cure — deleting the value.js `paths`
block — is **safe**: with `tsconfig.base.json` alone, both subpaths still resolve to the local
`dist/` by self-reference. So the `paths` block is dead weight (3 of its 8 entries point at files
that do not exist: `dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts`), but
it is not *harmful*. Severity of that item: **INFO**, not MAJOR — and I record it here rather than
inflating it into a finding.

### 4.2 · REFUTED (r2) — `.console-well` is **not** sound.

The r2 report listed `.console-well` under "checked and found sound — two consumers, one home,
documented." It is documented as an **interim** whose retirement precondition is the producer's
`.glass-well` rung, and that rung ships at the installed glass-ui@7.0.0 (L-11). A duplicate that has
declared its own sunset and whose sunset condition is met is legacy, not a compliant global.

### 4.3 · REFUTED (r2) — glass-ui does **not** need to be asked for a coarse hit-area extension.

The r2 relay asked glass-ui to add "the coarse-pointer hit-area extension (≥`--dock-touch-target`)"
to `ConfiguratorSize`. glass-ui **already ships it**, twice — `@utility touch-hit-area`
(`dist/styles/utilities/a11y-overrides.css`) and `[data-control-target]`
(`dist/styles/utilities/responsive.css`) — and both cure *both* axes where the demo's re-mint cures
one (L-7). The relay arm should be withdrawn; the demo-side deletion stands on its own.

### 4.4 · REFUTED (r2) — the Copy-JSON action **does** have a shipped home.

The r2 report wrote that "`Configurator`'s footer slot … [has] no copy affordance — the Copy-JSON
action has no shipped home, which is why the demo grew `GlassDock` in a footer." `DockControl` is
the shipped home for a dock child, and `GradientVisualizer.vue:254` already implements the identical
copy action with it (L-8). The finding is a demo dual path, not a producer gap.

### 4.5 · Checked and found sound

- **Dot-path traversal has exactly one home.** `grep -rn "readPath\|writePath\|getPath\|setPath\|
  deepGet\|deepSet" src demo test` returns only `ConfigSliderPane.vue:57,66,77,81`. No second object
  walker. (Its *placement* is L-14; its *uniqueness* is sound.)
- **The aurora Reset is safe.** `DEFAULT_AURORA_ATOMS` (`aurora-atoms.ts:53-77`) deliberately omits
  `seed`, and `Object.assign` copies only the source's own keys — so the picker colour survives.
  L-1 is blob-only. The author anticipated the defect class on one pane and missed it on the other,
  which is the ownership argument rather than a second bug.
- **Every slider key is live.** BlobPane's 31 dot-paths are compiler-guarded by `NumericAtomPath`;
  AuroraPane's `colorEnergy` / `noise` / `zones.count` all exist on the installed `AuroraAtoms`.
  No dead key today.
- **`verbatimModuleSyntax` is honoured.** Both type-only imports of `SliderSection` are
  `import type` (`AuroraPane.vue:34`, `BlobPane.vue:15`); the component's own eight imports are all
  value imports of values.
- **Vue 3.5 idioms are correct.** Reactive props destructure at `:41`; no `useTemplateRef` is needed
  (no template refs); no `defineModel` stale-read hazard — the pane writes through an injected
  reactive object, never a model round-trip.
- **`--slider-track-bg` is a public producer token**, not a private one: two
  `var(--slider-track-bg, …)` sites in `dist/glass-ui.css`. The override sits on the container
  (`.config-console`), not per instance. The defect in L-2 is the *token role* (text ink into a
  control surface) and the variant choice, not the seam.
- **`--dock-touch-target` resolves.** Measured `2.75rem`, defined in
  `dist/styles/tokens/sizing.css`. The L-7 point is scope-borrow, not a broken var.
- **Animations: nothing deleted.** The scroll-driven pane-header choreography lives with its
  producer (`PaneHeader.vue`, unscoped + scoped blocks, all three `@keyframes` present); the
  coarse-pointer rules here are additive.
- **Root-barrel byte cost: no cost.** I did not re-measure; the r2 report's esbuild comparison
  (82,616 B barrel vs 82,620 B subpaths, glass-ui `sideEffects: ["*.css"]`) is sound and I adopt it.
  The L-5 barrel finding is coherence/one-home only; no byte claim is made.
- **The coarse hit-area *is* reached on tablets.** I hypothesised it was unreachable dead code
  (mobile never renders the pane, L-10). Measured false: at 1024 with `hasTouch`, `pointer: coarse`
  matches and all 31 rows render. The block is live — and redundant (L-7), which is the honest
  finding.

---

## 5 · The greenfield lattice

With no legacy, the module lattice is this. The transposition is not cosmetic — it deletes a
component, a directory of 19 shims, a 74-line stylesheet, and both BLOCKERs.

```
demo/
  app/                    ← the shell. OWNS every injection key and the ONE view table.
    keys.ts               AURORA_ATOMS_KEY · re-export BLOB_CONFIG_KEY · EDIT_TARGET_KEY …
    views.ts              ViewId → { component, mobileSegment, label, icon }   ← ONE table
    router.ts             GENERATED from views.ts; a route cannot exist without a segment (kills L-10)
    boot/                 useAtmosphere · atmosphere-calibration
  studios/                ← Configurator consumers. Two files each. No shell, no chrome.
    atmosphere/  AtmosphereStudio.vue  ·  aurora.presets.ts
    blob/        BlobStudio.vue        ·  blob.presets.ts
    config-path.ts        SliderDef<T> · SliderLayer<T> · NumericPath<T>      ← the contract, in .ts
  picker/ · workbenches/ · palettes/ · color-session/                        (unchanged)
  chrome/                 PaneHeader · EmptyState                            (was shared/ui)
  styles/
  ✗ demo/ui/                          DELETED — 19 alias shims, 90 imports rewritten to subpaths
  ✗ demo/scenes/ConfigSliderPane.vue  DELETED — Configurator + Layer + Row + useConfiguratorState
  ✗ demo/scenes/                      DISSOLVED — about/ is a reader, not a scene; it moves to docs/
```

`BlobStudio.vue`, entire:

```vue
<script setup lang="ts">
import { Configurator, ConfiguratorLayer, ConfiguratorRow,
         useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { Slider } from "@mkbabb/glass-ui/slider";
import type { BlobConfig } from "@mkbabb/glass-ui/blob";
import { BLOB_PRESETS, BLOB_LAYERS } from "./blob.presets";
import { read, write } from "../config-path";

const { config, activePreset, selectPreset, resetCurrent } =
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
                                 :label="d.label" :name="d.format(read(config, d.key))">
                    <Slider :aria-label="d.label" :min="d.min" :max="d.max" :step="d.step"
                            :model-value="[read(config, d.key)]"
                            @update:model-value="v => v && write(config, d.key, v[0]!)" />
                </ConfiguratorRow>
            </ConfiguratorLayer>
        </template>
    </Configurator>
</template>
```

No `<style>` block. No `Card`, `GlassDock`, `PaneHeader`, `.config-console`, `.config-action-bar`,
`.pane-scroll-fade`, `--slider-track-bg`, `variant="spectrum"`, `:deep()`, `Object.assign`,
`Record<string, unknown>`, or double cast. The type contract moves up one level and becomes generic:

```ts
// demo/studios/config-path.ts   — or better, relayed to glass-ui (§6.4)
export type NumericPath<T> = /* BlobPane's mapped type, promoted, both -? strips kept */;
export interface SliderDef<T> {
    key: NumericPath<T>; label: string; min: number; max: number; step: number;
    format?: (v: number) => string;              // replaces the hard-coded fmt() at :84-86
}
export interface SliderLayer<T> { id: string; label: string; defs: readonly SliderDef<T>[] }
export function read<T>(o: T, k: NumericPath<T>): number;
export function write<T>(o: T, k: NumericPath<T>, v: number): void;
```

**Ownership after the transposition — exactly one home per concept:**

| concept | home |
|---|---|
| frame · scroll port · footer · reset · row density · touch rung · row ink · well surface · dock control · slider variant semantics | **glass-ui** |
| the two preset tables · the two `stage` contents · pane copy | **demo/studios** |
| injection keys · route ⇄ view ⇄ mobile-segment table | **demo/app** |
| dot-path typing over a config graph | **demo/studios/config-path.ts**, or relayed to glass-ui |
| colour maths | **@mkbabb/value.js**, through the exports map only |

**Manifest, after.** `@mkbabb/glass-ui` → `devDependencies`; `@mkbabb/keyframes.js` → deleted;
the value.js `paths` block deleted from `tsconfig.demo.json` (verified safe, §4.1). The published
dependency graph becomes **empty**, the `npm ls` cycle dissolves, the self-copy in `node_modules`
stops existing, and the dogfood claim is enforced by the exports map rather than asserted in a
comment.

---

## 6 · Relay split

**Demo-owned — no producer dependency:** L-1, L-3, L-4, L-5, L-6, L-7, L-8, L-9, L-11, L-12, L-13,
L-14, L-15, L-16. L-2 and L-10 are demo-owned with one producer documentation ask each (below).

**glass-ui-owned — three arms, folds into the pending O-16 relay:**

1. **`variant="spectrum"` is a footgun without a doc contract.** The recipe blanks `.slider-range`
   and narrows the thumb to `0.75 × --slider-thumb-size` (12px). Neither is stated on
   `SliderVariant` (`components/slider/types.d.ts:4`). Document that `spectrum` **requires** a
   gradient `--slider-track-bg` and is not a general numeric-slider variant; consider a dev-mode
   warning when a `spectrum` slider's resolved track has no `background-image`. This repo stepped in
   it on 31 rows (L-2).
2. **`ConfiguratorRow`'s `name` readout has no ink token.** The producer's post-hoc `/70` alpha over
   a live tint forced the demo into a `:deep(.configurator-row .font-mono)` reach — the exact
   anti-pattern the row's own docblock names. Expose the readout ink as a token
   (`--configurator-row-name-ink`) so the seam is declarative (L-12).
3. **`ConfiguratorSize` should carry the row block-size rung.** The demo re-minted a clamp because
   the `sm`/`md`/`lg` rungs are gap-only. If the rung owned block-size, neither the picker copy nor
   the config copy would exist (L-6).

**Withdrawn from the r2 relay** (see §4.3, §4.4): "glass-ui should add a coarse hit-area extension"
— it ships two; and "the Copy-JSON action has no shipped home" — `DockControl` is it.

**Optional fourth arm.** `NumericPath<T>` is generally useful to any `Configurator` consumer keying
rows by dot-path. If glass-ui exported it (or accepted `ConfiguratorPreset<T>` rows keyed by it),
BlobPane's 12-line mapped type and AuroraPane's absent guard both become producer-owned (L-14).

---

## Appendix · Reproduction commands

```
# L-1  reset wipes the live palette
node --input-type=module -e "import { BLOB_CONFIG_DEFAULTS } from '@mkbabb/glass-ui/blob-config';
  const l = structuredClone(BLOB_CONFIG_DEFAULTS); l.color.paletteStops = ['#112233','#445566','#778899','#aabbcc'];
  Object.assign(l, structuredClone(BLOB_CONFIG_DEFAULTS)); console.log(l.color.paletteStops)"

# L-2/L-6/L-7/L-9/L-10  live measurement (WebKit; dev server on :9000)
#   scratchpad/probe-L.mjs   — 1440 + 390 : row counts, track/range paint, scroll geometry
#   scratchpad/probe-L2.mjs  — 1440 + 1024-touch + 390-touch : action bar, rhythm twin, hit area

# L-4  the cycle and the weight
npm ls @mkbabb/value.js
grep -rl "@mkbabb/glass-ui" src/ | wc -l ; grep -rl "@mkbabb/keyframes" src/ demo/ | wc -l
du -sh node_modules/@mkbabb/{glass-ui,keyframes.js,value.js}

# L-5  the shim surface
find demo/ui -type f | wc -l ; find demo/ui -name "*.vue" | wc -l
grep -rho 'from "[^"]*ui/[a-z-]*"' demo/ | grep -v glass-ui | wc -l

# §4.1  resolution, from a probe file INSIDE the package
npx tsc -p <tsconfig extending tsconfig.demo.json, including an in-package probe.ts> \
  --noEmit --traceResolution | grep "was successfully resolved"
```

All temporary probe files were written to the session scratchpad and removed; no file outside
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/` was created, edited, or left behind.
