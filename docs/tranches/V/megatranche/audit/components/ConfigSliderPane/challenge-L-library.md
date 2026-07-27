# CHALLENGE-L — library structure under `demo/scenes/ConfigSliderPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is not inherited and not undeclared.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/scenes/ConfigSliderPane.vue` (252 lines). Consumers:
`demo/scenes/atmosphere/AuroraPane.vue` (3 sliders), `demo/scenes/blob/BlobPane.vue` (31 sliders).
34 slider rows total ride this one component — the app's SECOND slider population.

**Verdict: DEFECTIVE.** One BLOCKER (a user-visible correctness break in the only write action the
pane exposes), one BLOCKER-adjacent design-system misuse proven in the shipped screenshots, and
eleven further structural defects. The unifying mechanism: **this component is a generic
configurator hand-rolled inside a feature area, over a design system that already ships the
configurator** — so every seam it needed (section, reset, clone, row ink, track material) got
re-minted demo-side, and each re-mint is a second home for a concept that already has one.

---

## The import trace — every edge, and whether it should exist

`ConfigSliderPane.vue:16-23`, all eight edges:

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 16 | `../ui/button` | `demo/ui/button/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **VIOLATING** — alias shim (L-2) |
| 17 | `../ui/card` | `demo/ui/card/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **VIOLATING** — alias shim (L-2) |
| 18 | `../ui/slider` | `demo/ui/slider/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **VIOLATING** — alias shim (L-2) |
| 19 | `@lucide/vue` | devDependency, bare | sound |
| 20 | `@mkbabb/glass-ui/dock` | published subpath | sound |
| 21 | `@mkbabb/glass-ui/configurator` | published subpath | sound specifier, **under-consumed** (L-4) |
| 22 | `../shared/ui/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | sound edge, **implicit CSS contract** (L-13) |
| 23 | `@mkbabb/glass-ui` (root barrel) | `dist/glass-ui.js` — 25,239 B, 46 static chunk deps | **VIOLATING** — `./dom` is the door (L-3) |

Verified:

```
$ cd node_modules/@mkbabb/glass-ui && ls -l dist/glass-ui.js dist/dom.js
dist/dom.js                  4179 bytes
dist/glass-ui.js            25239 bytes
$ grep -oE 'from *"[^"]+"' dist/glass-ui.js | sort -u | wc -l
46
$ grep -oE 'from *"[^"]+"' dist/dom.js | sort -u | wc -l
7
$ grep -rn "writeClipboard" dist/composables/dom/useClipboard.d.ts
37:export declare function writeClipboard(text: string): Promise<CopyResult>;
$ node -e "console.log(Object.keys(require('./package.json').exports).length)"
74
```

**`@mkbabb/value.js` edges: ZERO.** ConfigSliderPane imports nothing from the library whose demo it
is. Transitively its subtree does, and that path is broken — see L-5.

**The one cross-boundary runtime edge in the subtree** is not in this file but in its consumer's
sibling: `demo/scenes/atmosphere/aurora-harmony-stops.ts:23` →
`../../color-picker/composables/boot/atmosphere-calibration` (L-9). `demo/color-picker/` is the
Vite `root` (`vite.config.ts`: `root: "./demo/color-picker/"`) — it is the shell. A scene reaching
into the shell's boot chain is the feature→boot edge this challenge names.

---

## Findings

### L-1 · BLOCKER — `Reset` destroys the live picker→blob palette coupling. Shape-aware reads, shape-blind reset.

`ConfigSliderPane.vue:92-94`:

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` is a **top-level** copy. Reads and writes in the same component are **dot-path**
addressed (`readPath`/`writePath`, lines 57-73) — so the component understands nested shape for
one half of its abstraction and not the other.

`BlobPane.vue:8-9` states the invariant this breaks, in its own words:

> `color.paletteStops` is omitted: it is the live picker-palette feed (App.vue's deriveBlobPalette
> watch), not a slider.

But `paletteStops` is nested under the **top-level** key `color`, and `BlobPane.vue:126` passes
`BLOB_CONFIG_DEFAULTS` whole as `:defaults`. Measured content of that key:

```
$ node --input-type=module -e "
  import { BLOB_CONFIG_DEFAULTS } from './node_modules/@mkbabb/glass-ui/dist/blob.js';
  console.log(JSON.stringify(BLOB_CONFIG_DEFAULTS.color))"
{"paletteStops":["#b5947f","#d4b27d","#dad6b1"],"hueRange":5,"satShift":0,
 "brightnessShift":0,"colorNoiseFreq":2,"colorNoiseSpeed":0.05,"lightnessFloor":0.15}
```

So `Object.assign` replaces the whole `color` atom and reverts `paletteStops` from the live
picker-derived ramp to three static tan hexes. The live feed does not restore it, because the
producing watch is change-driven, not derived —
`demo/color-picker/composables/boot/useAtmosphere.ts:389-403`:

```ts
watch(atmosphereColor, (css) => {
    blobConfig.color.paletteStops = deriveBlobPalette(css, { stopCount: 4, ... }).map(oklchStopToHex);
}, { immediate: true });
```

Note also the arity mismatch: `stopCount: 4` live vs 3 in the defaults, so the array **length**
changes too. `useAtmosphere.ts:387` confirms the repaint is automatic: "glass-ui's Blob deep-watches
`config.color.paletteStops`, so a colour change repaints free" — which means the clobber repaints
to tan immediately.

**Reproduction.** Boot the app; pick any colour other than the boot colour (the watch fires,
`paletteStops` becomes 4 live hexes); navigate to `/#/blob` at desktop width; click **Reset**. The
blob repaints to the shipped brown/tan ramp while the picker still displays the user's colour.
Recovery requires changing the picker colour again — no idle path restores it.

**Mechanism.** Reset-to-baseline is a *shape-aware* operation. It has no home in this component,
and the producer's home for it was explicitly declined — see L-4: `useConfiguratorState<T>` owns
baseline, `resetCurrent()`, `isDirty`, and a `clone` hook documented for exactly "shapes that
contain unclonable values" (`dist/components/configurator/useConfiguratorState.d.ts:9-16,29-45`).

**Cure.** Reset is not the pane's concept. Delete `resetDefaults` and the `defaults` prop. Let each
consumer own its baseline through `useConfiguratorState`, whose per-preset baseline + `equals` +
`clone` seams express "everything under `color` except `paletteStops`" without a generic component
guessing the shape. The correct architecture is: **the pane renders; the consumer owns state.**

---

### L-2 · MAJOR — `demo/ui/` is a 19-directory pure-alias shim over glass-ui. Both paths live, in one import block.

Every directory under `demo/ui/` is a single `index.ts` containing only a re-export of
`@mkbabb/glass-ui`:

```
$ cd demo/ui && for d in */; do echo "$d $(ls $d)"; done   # 19 dirs, each exactly `index.ts`
$ cat button/index.ts   → export { Button } from "@mkbabb/glass-ui";
$ cat card/index.ts     → export { Card, CardHeader, ... } from "@mkbabb/glass-ui";
$ cat slider/index.ts   → export { Slider } from "@mkbabb/glass-ui";
$ grep -Ln '@mkbabb/glass-ui' */index.ts   → (empty: all 19 are glass-ui re-exports)
```

Measured split across `demo/`: **92** imports go through the `demo/ui/*` shims, **37** go direct to
`@mkbabb/glass-ui`, **82** to a glass-ui subpath. Two live paths to the same symbol.
`ConfigSliderPane.vue:16-23` uses **both in the same eight-line block** — `Button`/`Card`/`Slider`
via the shim, `GlassDock`/`ConfiguratorRow`/`writeClipboard` direct.

This is a shadcn-era migration residue: `demo/ui/` was the shadcn component home, glass-ui replaced
it, and the barrels were left as compatibility aliases. It violates owner edict 2 (no aliases,
dual paths, back-compat) and edict 4 (glass-ui is the design system, not shadowed in `demo/ui/`).

**Cure.** Delete `demo/ui/` entirely; rewrite 92 import sites to the glass-ui subpath that owns each
symbol (`/button`, `/card`, `/slider`, …). Mechanical, one commit, and it kills the whole
"which path does this file use" question — the source of L-3 as well.

---

### L-3 · MAJOR — root-barrel import for one function: 25,239 B / 46 chunks where 4,179 B / 6 would do.

`ConfigSliderPane.vue:23` — `import { writeClipboard } from "@mkbabb/glass-ui"`.

glass-ui publishes **74** subpath exports including `./dom`, which is `writeClipboard`'s home
(`dist/composables/dom/useClipboard.d.ts:37`). The root barrel `dist/glass-ui.js` statically
imports 46 chunks — `dialog`, `data-table`, `command`, `toast`, `number-field`, `select`,
`dropdown-menu`, `popover`, `progress`, `tooltip`, … — including
`field-control.css_vue_type_style_index_0_src_true_lang-CeLay9Tk.js`. `dist/dom.js` imports 6.

glass-ui declares `sideEffects: ["*.css"]`, so the *JS* is tree-shakeable in a production build —
but the CSS-bearing chunks in that 46 are declared side-effectful **by name** and are therefore
retained. In dev (the live server at `:9000`) the whole graph is served.

17 demo sites do this, all for `writeClipboard`/`useClipboard`/`useTouchGate`:

```
$ grep -rhoE 'import \{[^}]*\} from "@mkbabb/glass-ui"' demo | sort | uniq -c
  ... 13 × writeClipboard, 3 × useClipboard, 2 × useTouchGate ...
```

**Cure.** `import { writeClipboard } from "@mkbabb/glass-ui/dom"`. Then lint the root barrel out:
a flat-config `no-restricted-imports` rule banning bare `@mkbabb/glass-ui` makes the subpath map
load-bearing instead of decorative.

---

### L-4 · MAJOR — the component re-rolls two glass-ui `configurator` primitives it already imports from, and says so in a comment.

`@mkbabb/glass-ui/configurator` exports five things
(`dist/components/configurator/index.d.ts`):

```
Configurator, ConfiguratorLayer, ConfiguratorRow,
CONFIGURATOR_SIZE_KEY / provideConfiguratorSize / useOptionalConfiguratorSize,
useConfiguratorState
```

ConfigSliderPane consumes exactly **one** (`ConfiguratorRow`) and hand-rolls the other two:

| demo re-mint | producer home |
|---|---|
| `ConfigSliderPane.vue:128-130` + `:232-243` — `.config-section-header` / `.config-section-title`, a labeled section head over a `flex-col gap-1.5` body | `ConfiguratorLayer` — "labeled section inside a `<Configurator>`'s controls column… header trigger + chevron affordance + collapsible body", `dividers` prop, CSS-only reveal, documented a11y (`role=button` + `aria-expanded` + `aria-controls`) |
| `ConfigSliderPane.vue:92-94` — `resetDefaults()` | `useConfiguratorState<T>` — `config`, `activePreset`, `isDirty`, `selectPreset`, **`resetCurrent()`**, `cyclePreset`, plus `clone` and `equals` seams |

The header comment at lines 6-10 names the surface and declines it:

> HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState.
> … The section-group wrapper and the floating copy/reset dock remain demo-local (they are thin
> structural shells, not the row primitive).

They are not thin shells. The section-group wrapper is `ConfiguratorLayer` minus its collapsible
body and minus its a11y attributes — the demo's section head is a `<span>` with no
`role`/`aria-expanded`, so 7 blob sections and 1 aurora section are unlabelled non-landmarks. And
`resetDefaults` is where L-1's BLOCKER lives. The comment is an accurate description of a decision
that produced the defect.

**Cure.** Compose the producer whole: `<Configurator>` for the size axis, `ConfiguratorLayer` per
section, `ConfiguratorRow` per row, `useConfiguratorState` in each consumer for baseline/reset.
The demo-local part that genuinely has no producer home is the copy/reset footer — and even that
should be `Configurator`'s `footer` slot, which already yields `{ reset }`
(`dist/components/configurator/Configurator.vue.d.ts`, slots: `footer?: (props: { reset: () => void })`).

---

### L-5 · MAJOR — `tsconfig.demo.json` `paths` ≠ `package.json` `exports`. Three dangling keys, two missing, and one subpath already typechecking against a different surface than it runs against.

`package.json` `exports` — the published surface, 7 keys:
`./color ./value ./css ./easing ./math ./transform ./quantize`. There is **no `"."` root key.**

`tsconfig.demo.json` `paths` — hand-rolled, 8 keys:

| paths key | in exports? | target exists? |
|---|---|---|
| `@mkbabb/value.js` (root) | **NO** | **NO** — `dist/index.d.ts` absent |
| `@mkbabb/value.js/color` | yes | yes |
| `@mkbabb/value.js/parsing` | **NO** | **NO** — `dist/subpaths/parsing.d.ts` absent |
| `@mkbabb/value.js/math` | yes | yes |
| `@mkbabb/value.js/easing` | yes | yes |
| `@mkbabb/value.js/units` | **NO** | **NO** — `dist/subpaths/units.d.ts` absent |
| `@mkbabb/value.js/transform` | yes | yes |
| `@mkbabb/value.js/quantize` | yes | yes |
| *(missing)* `./css` | yes — **10 demo imports** | yes |
| *(missing)* `./value` | yes | yes |

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

The runtime alias set in `vite.config.ts:33-49` is **generated** from `package.json#exports`; the
tsconfig `paths` is hand-maintained. They have drifted. The consequence is measurable **right now**:
`@mkbabb/value.js/css` has no `paths` entry, so vue-tsc falls through to `node_modules/@mkbabb/value.js`
(the installed npm 4.0.0 tarball) while Vite aliases it to this checkout's `dist/`. Those two are
**not the same file**:

```
$ for f in color css value math easing transform quantize; do
    a=$(shasum dist/subpaths/$f.d.ts|cut -c1-8)
    b=$(shasum node_modules/@mkbabb/value.js/dist/subpaths/$f.d.ts|cut -c1-8)
    [ "$a" = "$b" ] && echo "$f SAME" || echo "$f DIFFER"; done
color SAME
css DIFFER          ← 382 lines (repo) vs 350 lines (installed)
value SAME
math SAME
easing SAME
transform SAME
quantize SAME
```

The divergence is semantic, not cosmetic — `CssColorMap` maps to `Color_2<S>` in the repo surface
and `Color<S>` in the installed one. So the demo's 10 `@mkbabb/value.js/css` imports are
**typechecked against one public surface and executed against another**. `tsconfig.demo.json`'s own
header claims "the demo speaks only the 8 public keys" — there are 7 keys, three of the declared
eight are not keys at all, and one real key is unspoken.

This is the "false proof of the public API" this challenge names, in its purest form: the demo is
the dogfood gate, and the gate is aimed at a stale artefact.

**Cure.** Generate `paths` from `exports` the way the Vite alias already is. A `tsconfig.demo.json`
cannot run code, so the honest fix is to delete the hand-rolled `paths` for value.js entirely and
let node-resolution through the self-install do it — or emit the tsconfig from a script and gate
drift in CI. Either way the number of hand-maintained copies of the exports map must go to one.

---

### L-6 · MAJOR — `variant="spectrum"` fed a flat colour: the gradient variant used for non-gradient sliders, killing the fill affordance on all 34 rows.

`ConfigSliderPane.vue:146` requests `variant="spectrum"`. Line 202 then feeds the variant's seam a
**solid** colour:

```css
--slider-track-bg: var(--ink-muted, var(--muted-foreground));
```

The producer recipe (`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`):

```css
.glass-slider[data-variant=spectrum] .slider-track { height:calc(var(--slider-thumb-size,1rem)*1.5);
                                                     background:var(--slider-track-bg,var(--secondary)) }
.glass-slider[data-variant=spectrum] .slider-range { backdrop-filter:none; box-shadow:none; background:0 0 }
/* default variant: */
.slider-track { height:var(--slider-track-height,.375rem); background:var(--slider-track-bg,var(--muted-medium)) }
.slider-range { --liquid-fill-tint:var(--slider-range-bg,var(--glass-capsule-warm)); ... }
```

`spectrum` exists for tracks whose background **is a ramp** — it makes `.slider-range` transparent
precisely because a gradient track carries its own meaning. The sibling population proves the
intended usage; `demo/picker/controls/ComponentSliders/ComponentSliders.vue:193-201` feeds the same
seam a `linear-gradient(...)`:

```ts
"--slider-track-bg": ramp && component === "alpha" ? `${ramp}, var(--alpha-checker)` : ramp,
```

ConfigSliderPane's payload is never a gradient. So it gets a 24px-tall slab with **no
filled/unfilled split** — the component's own comment at lines 196-197 admits the loss ("the
spectrum `.slider-range` is transparent by recipe so no filled/unfilled split reads either") and
then papers over it by re-inking the slab instead of changing variant.

Two further violations ride on the same line:

1. **Token-category inversion.** `--ink-muted` is a **foreground** rung — `useAtmosphereBoot.ts:87-106`
   stamps it from `useContrastSafeColor(...).mutedInkCss`, "the floor-clamped certified plate ink…
   ≥4.5 on the composited resting plate", i.e. certified as *text on* the plate. 13 of the 14 demo
   uses are `color:`. `ConfigSliderPane.vue:202` is the **only** site that feeds it to a
   background. In dark mode that makes the 31 blob tracks the brightest surfaces in the card —
   brighter than the "Blob" title — an inverted visual hierarchy.
2. **Edict 5** (root-level styling, never per-instance overrides): this is a per-instance override
   of a design-system variant, applied via a scoped rule.

**Visual proof** — `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/blob.png`
and `.../safari-desktop-dark/blob.png`: 31 flat charcoal (light) / near-white (dark) slabs, each
with a hairline thumb lozenge and no fill. The picker card in the same frame shows the correct
spectrum ramps for contrast. Every value must be read from the mono readout because the control
itself communicates nothing.

**The gate certifies the wrong cure.** `e2e/smoke/oracles/o18-contrast-census.spec.ts:1144-1215`
was written born-RED against `--secondary` and green against the `--ink-muted` re-ink:

> This leg is the cure's BORN-RED gate: born red against the pre-cure `--secondary` track, green
> against the `--slider-track-bg: var(--ink-muted)` re-ink

It asks "is the track ≥3:1 against the well" and never "does the value position read". So the
oracle is green while the control is unreadable, and the correct cure now breaks a gate.

**Cure.** Drop `variant="spectrum"` and the `--slider-track-bg` override. The default variant
gives a 6px `--muted-medium` track **plus** a live `.slider-range` liquid fill — the correct
affordance for a bounded numeric value, at zero override cost, with the contrast question answered
by the producer's own recipe rather than by a foreground token. Then re-aim the o18 leg at the
range/track pair instead of the track alone.

---

### L-7 · MAJOR — generic object-graph plumbing trapped inside an SFC, untestable, and half-guarded.

`ConfigSliderPane.vue:57-86` holds four pure functions inside `<script setup>`: `readPath`,
`writePath`, `read`, `fmt`. Nothing about them is a component concern; all four are pure
`(data) → data`. Because `<script setup>` bindings are not module exports, **none is reachable from
a unit test**:

```
$ grep -rn "readPath\|writePath" test/ demo/test/ e2e/
(no matches)
```

The two halves are also asymmetric — `readPath` guards every hop, `writePath` guards none:

```ts
function readPath(obj, path) { for (const seg of path.split(".")) {
    if (cur == null || typeof cur !== "object") return undefined;   // guarded
    cur = cur[seg]; } return cur; }

function writePath(obj, path, value) { const segs = path.split(".");
    for (let i = 0; i < segs.length - 1; i++) cur = cur[segs[i]!];  // unguarded
    cur[segs[segs.length-1]!] = value; }
```

`AuroraPane.vue:74` proves the optional-intermediate case is live in the type
(`atoms.zones?.arrangement ?? "composed"`). If any provider ever supplies atoms without `zones`,
`readPath` returns `undefined` (the slider silently shows `NaN`-ish) while `writePath` throws
`TypeError: Cannot set properties of undefined` on first drag. *Hypothesis* — I did not find a
provider that omits `zones` (`aurora-atoms.ts` always sets it), so this is unreached today; the
asymmetry itself is the defect.

**Cure.** `demo/shared/config-path.ts` exporting `readPath`/`writePath` with symmetric guards, a
vitest file beside it, and a `Result`-shaped write for the missing-intermediate case. `fmt` is a
separate concept (numeric presentation) and belongs with the other formatters, not here.

---

### L-8 · MAJOR — the contract types live inside the `.vue`, so every consumer of the contract imports the component.

`ConfigSliderPane.vue:27-39` exports `SliderDef` and `SliderSection` from the SFC.
`AuroraPane.vue:34` and `BlobPane.vue:15` both do
`import type { SliderSection } from "../ConfigSliderPane.vue"`.

The types are the *contract* — a data shape with no rendering in it. Housing them in the component
module means a consumer that only wants to describe sections must name the component that renders
them, and it puts the SFC on the type-resolution path for `vue-tsc`. `SliderDef` is exported and
imported by nobody (grep: 2 hits, both inside `ConfigSliderPane.vue` itself, plus 2 prose mentions
in `BlobPane.vue` comments) — a dead public symbol.

**Cure.** `demo/shared/config-slider-schema.ts` holding `SliderDef` + `SliderSection`. The
component imports the types; the consumers import the types; nobody imports a `.vue` for a shape.

---

### L-9 · MAJOR — feature → shell/boot edge in the consumer subtree.

`demo/scenes/atmosphere/aurora-harmony-stops.ts:23`:

```ts
import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/color-picker/` is the Vite `root` (`vite.config.ts` dev + gh-pages branches) and holds
`App.vue`, `index.html`, `router/`, `ErrorBoundary.vue`, `composables/boot/`. It is the shell. A
scene importing the shell's boot chain inverts the dependency: the shell composes features, features
must not reach back into boot.

Breadth measured — 3 runtime edges cross this boundary in the whole demo:

```
$ grep -rn "color-picker/composables" demo | grep -v "^demo/color-picker/"
demo/scenes/atmosphere/aurora-harmony-stops.ts →  boot/atmosphere-calibration
demo/picker/ColorPicker.vue                    →  boot/useOverture
demo/test/glass/aurora-bracket.test.ts         →  boot/atmosphere-calibration   (test, acceptable)
```

The module's own docstring calls the import "a consume, never a boot-chain write" — true, and
irrelevant to direction. A read across an inverted edge is still an inverted edge; it makes
`scenes/atmosphere` unmovable without the shell.

**Cure.** `resolveCalibratedAtmosphere` is a pure function over atoms — it is *calibration*, not
*boot*. Move it to `demo/scenes/atmosphere/` (its only non-test consumer) or, if the boot chain also
needs it, to a leaf `demo/shared/atmosphere-calibration.ts` that both the shell and the scene
import downward. Either kills the up-edge.

---

### L-10 · MAJOR — pane identity is spread over three string-keyed tables with a masking fallback; `/#/blob` is unreachable by URL on mobile.

The same concept — "what is on screen for this view" — is encoded three times:

1. `demo/color-picker/router/index.ts:19-38` — 14 routes, every one with
   `const Stub = { render: () => null }`. The router carries URLs and nothing else.
2. `demo/shell/viewSchema.ts` — `VIEW_MAP[ViewId] → PaneConfig { left, right, labels, icon,
   defaultPaneIndex? }`, panes named by string.
3. `demo/shell/usePaneRouter.ts:81-95` — `componentFor(name: string)`, an 11-arm if-chain mapping
   those strings to components, ending:

```ts
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;          // ← masking fallback (edict 2)
}
```

An unknown or renamed pane name silently renders the ColorPicker instead of failing. There is no
type linking arm 3's string literals to arm 2's, so a rename in `viewSchema` cannot fail a
typecheck — it degrades to the picker at runtime.

The measured consequence for this component: `viewSchema.ts:179-187` gives blob
`{ left: "color-picker", right: "blob" }` with **no `defaultPaneIndex`**, and
`useViewManager.ts:60-66` resolves `defaultPaneIndex ?? 0` → pane 0 → the **left** pane → the
ColorPicker. So on mobile, `/#/blob` renders the picker and BlobPane never mounts. Its sibling
`atmosphere` (lines 170-177) escapes only by accident of putting its pane on the `left`.
`defaultPaneIndex: 1` exists and is used twice elsewhere (lines 122, 150) — blob just does not set it.

Confirmed in the audit matrix: `safari-mobile-light /#/blob` → `bodyTextLength: 69`,
`allElements: 228`, zero slider rows; vs `safari-desktop-light /#/blob` → `713` / `642` / 31 rows;
vs `safari-mobile-light /#/atmosphere` → `286` and its 3 rows present. The mobile screenshot
`shots/safari-mobile-light/blob.png` shows the dock pill reading **Picker | Blob with Picker
active** while the URL says `/#/blob` — route and rendered pane in open disagreement.

**Cure.** One table. `VIEW_MAP` should hold the component references directly (`left: AuroraPane`),
which deletes `componentFor` and its masking `return ColorPicker` and makes a rename a type error.
The route table then derives from `VIEW_MAP` keys instead of restating them. And blob needs
`defaultPaneIndex: 1` — or, better, `defaultPaneIndex` should be *derived*: the mobile default is
"the pane this view is named for", which is computable, not a hand-set field that one of nine views
forgot.

---

### L-11 · MINOR — `:deep()` reaches across the package boundary into producer internals, against the producer's documented API.

`ConfigSliderPane.vue:204-229` — three `:deep()` rules targeting glass-ui's internal class names:

```css
.config-console :deep(.configurator-row .font-mono) { color: var(--ink-muted, ...) }
.config-console :deep(.configurator-row) { min-block-size: clamp(2rem, 7cqi, 2.625rem) }
.config-console :deep(.configurator-row .glass-slider)::before { ... }   /* inside @media (pointer: coarse) */
```

`.font-mono` is a **Tailwind utility emitted inside the producer's template** — not a published
hook. `ConfiguratorRow`'s own docstring states the API exists to avoid exactly this:

> All three are declarative props, so a consumer expresses a "double-label" row (primary +
> secondary) **WITHOUT** a `:deep()` reach into the slot or a hand-rolled in-slot sans+mono pair.

The component uses `name` correctly (line 141) and then reaches in anyway to re-ink what `name`
rendered. If glass-ui changes that utility class the rule dies silently.

Related measurement, from the audit matrix: the coarse hit-area extension (lines 218-230) extends
the **track**, never the thumb. Thumb geometry measured `12×24` on desktop and `12×44` on mobile —
so the vertical half works and the **12px inline size fails the 24px minimum in every matrix**.
31 of the 39 desktop `/#/blob` tap-target defects are these thumbs
(`REPORT.json`, `safari-desktop-light /#/blob`, entries labelled `Body Radius`, `Satellites`, …).
A track-only extension cannot fix a thumb-sized target; thumb size is `--slider-thumb-size`, a
producer token.

**Cure.** Delete all three `:deep()` rules. The ink question belongs to `ConfiguratorRow`'s
`name` slot styling in glass-ui; the row rhythm belongs to the `size` axis
(`ConfiguratorSize` `sm|md|lg`, prop-over-inject) which this component never sets; the touch target
belongs to `--slider-thumb-size`. All three already have producer homes.

---

### L-12 · MINOR — `writeClipboard`'s failure-explicit result is discarded, here and at all 14 demo call sites.

`ConfigSliderPane.vue:88-90`:

```ts
async function copyAsJson() {
    await writeClipboard(JSON.stringify(config, null, 2));
}
```

`writeClipboard` returns `Promise<CopyResult>` with an `ok` boolean
(`dist/composables/dom/useClipboard.d.ts:35-37`). Across `demo/` there are 14 call sites and
**zero** inspect `ok` (11 use `void`, 3 bare `await`). So "Copy JSON" silently no-ops when the
clipboard is denied — no toast, no state, nothing. glass-ui ships `./toast` (the `toast-*` chunk is
in the root barrel's dep list), so the affordance exists and is unused; project memory records the
prior feedback home (`vue-sonner`) was deleted and never replaced.

**Cure.** One home for copy feedback — a `useCopyFeedback()` in `demo/shared/` wrapping
`writeClipboard` + the glass-ui toast, consumed by all 14 sites. That is a composable that does not
exist yet, so per edict 3 it should land only once (not as a per-pane wrapper), and it replaces 14
discards rather than adding a layer.

---

### L-13 · MINOR — a global CSS class emitted from a leaf component, with an untyped parent contract; and cross-pane classes split across two homes.

`ConfigSliderPane.vue:106` applies `.pane-scroll-fade`. That class is defined in
`demo/shared/ui/PaneHeader.vue:40-58` — inside an **unscoped** `<style>` block in the child
component:

```css
.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

PaneHeader's own scoped animations then consume `--pane-scroll` (lines 177-193). So the contract is:
*"every one of my 9 consumers must put `.pane-scroll-fade` on my scroll ancestor or my scroll-driven
header choreography silently does nothing."* It is a magic string, remembered nine times, with no
prop, no type, and no runtime check. The docstring documents the choice (lines 41-53); documenting
an inverted edge does not straighten it.

Meanwhile the *other* cross-pane class this component uses, `.console-well`, lives in
`demo/styles/foundation.css:350`. Two cross-pane classes, two different homes, one category.

**Cure.** Both belong in `demo/styles/foundation.css` (the declared home for global keyframes and
cross-pane classes per edict 6). Better still: the scroll-region + header pair is one concept —
PaneHeader should own the scroll host, i.e. the pane passes its content as a slot to a
`PaneShell` that renders header + `.pane-scroll-fade` region together, so the contract is a
component boundary instead of a class name.

---

### L-14 · MINOR — `.console-well` duplicates a producer surface tier, six lines from a correct use of that same tier axis.

`ConfigSliderPane.vue:100` — `<Card tier="resting">`, the producer surface-tier axis, used
correctly. `ConfigSliderPane.vue:122` — `class="config-console console-well"`, a hand-rolled
rung-2 surface whose recipe is re-minted in `demo/styles/foundation.css:350-354`
(`background/border/border-radius`). glass-ui's tier ladder
(`dist/components/_shared/axes.d.ts:5`):

```ts
export declare const SURFACE_TIERS: readonly ["wash", "quiet", "resting", "floating", "overlay"];
```

`quiet` is the rung directly below `resting` — exactly the "seated sub-card" the well wants. The
demo's own comment concedes it:

> INTERIM demo class — swaps onto the producer `.glass-well` rung when packet P3 ships (BOOKED)

glass-ui 7.0.0 ships no `.glass-well` (`grep -o "glass-well" dist/**.css` → 0 hits), but it does
ship `./surface` and the `quiet` tier, which is the same rung by another name. The booked swap is
landable now; holding the interim class is holding a dual path (edict 2).

**Cure.** `<Card tier="quiet">` (or `<Surface tier="quiet">`) for the well; delete `.console-well`
from `foundation.css` and its two consumers. One concept, one home, and the tier ladder does the
scheme/level registration for free.

---

### L-15 · INFO — zero value.js dogfood in the app's second-largest control population.

34 numeric controls, 34 numeric readouts, and no `@mkbabb/value.js` import. `fmt` (lines 84-86) is
a fourth hand-rolled numeric formatter in the demo — `aurora-harmony-stops.ts:26-28` has a fifth,
whose comment calls it "the house formatNum shape", which is an admission that a house shape exists
without a house home. The library publishes `./math` (`clamp`) and `./value` (`ValueUnit`), and
`ValueUnit` is the project's own answer to "a number with presentation".

This is not a correctness defect; it is a **proof gap**. The demo is the dogfood gate. The pane that
drives 34 numeric values through a library about numeric values exercises none of it, so nothing
here would catch a regression in the published surface.

*Checked and clean:* every one of BlobPane's 31 declared `[min,max]` brackets contains its
`BLOB_CONFIG_DEFAULTS` value (script run over all 31 dot-paths: `total defs 31 defects 0`), so no
reset writes an out-of-range value. `clamp` is not needed today.

---

### L-16 · hypothesis (NOT reproduced in the audit matrix) — `/#/blob` drifts off-route in Chromium, with a degenerate `oklch(none …)` colour and an unstamped `--ink-muted`.

Three consecutive Chromium probes against the live dev server at `http://localhost:9000/#/blob`
landed elsewhere within a second of navigation:

| probe | navigate reported | URL at evaluate |
|---|---|---|
| 1 | `/#/blob`, title "Blob — Color Picker" | `/#/gradient` |
| 2 | `/#/blob`, title "Blob — Color Picker" | `/#/gradient` |
| 3 | `/#/blob`, title "Blob — Color Picker" | `/#/?space=oklch&color=oklch(none%200.2%2030)` |

At probe 3, `getComputedStyle(document.documentElement).getPropertyValue("--ink-muted")` was the
**empty string** — the boot ink writer (`useAtmosphereBoot.ts:100-106`) never ran — and the app had
185 elements / 95 chars of body text.

Two things make this worth recording rather than discarding. The URL carries
`color=oklch(none 0.2 30)` — a missing-**lightness** `oklch()`, and project memory records
`R1 = live parseCssColor("oklch()") shipping crash` from the parser proof gate. And a
`.setViewportSize()` call alone was enough to move the route once.

I am labelling this a **hypothesis**: the Safari matrix rendered `/#/blob` correctly at desktop, so
it is state-dependent (persisted ground record / last colour), and I could not isolate the cause
before the probe browser died. It is out of this seat's axis. It should be handed to whichever seat
owns boot and the route/pane coupling — L-10 is the structural half of the same area, and a shell
that can silently substitute the ColorPicker for a requested pane is a shell in which this class of
drift is unobservable.

---

## What I checked and found sound

Negative evidence, so the absence of findings here is a result and not an omission.

- **`verbatimModuleSyntax`** — clean. Every type-only import in the component and both consumers is
  `import type` (`ConfigSliderPane.vue` has no type-only imports; `AuroraPane.vue:25,26,34`,
  `BlobPane.vue:13,15` all correct). `export interface` at 27/36 is a type-only export and needs no
  annotation.
- **Vue 3.5 idioms** — clean. Reactive props destructure at line 41 (`const { config, sections, … }
  = defineProps<…>()`), the 3.5 form. No `defineModel` here, so the `shallowRef` caveat does not
  apply. No template refs, so `useTemplateRef` is not owed.
- **`Card tier="resting"`** — valid. `CardProps extends SurfaceProps`
  (`dist/components/card/Card.vue.d.ts:8`) and `resting` is a real `SurfaceTier`.
- **`writeClipboard` sourcing** — the right function from the right package (wrong *subpath*, L-3).
  There is no competing demo `useClipboard` implementation; the concept is singly owned by glass-ui.
- **Animations** — no deletion. The `@keyframes` in this area live in `PaneHeader.vue` (scoped,
  permitted) and nothing in `ConfigSliderPane.vue` removes or inlines a global keyframe. Edict 6
  satisfied.
- **`structuredClone` safety** — `structuredClone(BLOB_CONFIG_DEFAULTS)` does not throw
  (verified in node: 9 top-level keys cloned). L-1's defect is the *shallowness of the assign*, not
  a clone failure.
- **Slider ranges vs defaults** — all 31 blob brackets contain their default (measured, 0 defects).
- **The `NumericAtomPath` mapped type** (`BlobPane.vue:36-52`) — this is *good* structure and worth
  preserving through any refactor: it makes a mistyped dot-path a compile error rather than a silent
  dead slider. Any successor lattice must keep it. It is also the strongest argument for L-8:
  a type that good deserves a module, not an SFC's script block.

---

## The greenfield lattice

Structuring this today with no legacy, the module graph is five files and one deletion, and it is
*smaller* than what exists:

```
demo/shared/config-slider-schema.ts     SliderDef, SliderSection            (types only, no .vue)
demo/shared/config-path.ts              readPath / writePath, symmetric     (+ vitest beside it)
demo/shared/PaneShell.vue               header + .pane-scroll-fade region + footer slot
                                        (absorbs PaneHeader; the magic class becomes a boundary)
demo/scenes/atmosphere/AuroraPane.vue   useConfiguratorState + <Configurator>/<Layer>/<Row>
demo/scenes/blob/BlobPane.vue           useConfiguratorState + <Configurator>/<Layer>/<Row>
```

**`demo/scenes/ConfigSliderPane.vue` does not exist in this lattice.** That is the architectural
transposition, and it is the whole finding: the component is a *layer between two consumers and a
design system that already ships the layer*. glass-ui's `Configurator` + `ConfiguratorLayer` +
`ConfiguratorRow` + `useConfiguratorState` are, together, precisely this component — with a
collapsible body, a size axis, a preset table, `isDirty`, a footer slot yielding `reset`, and a
`clone` seam. Each consumer becomes ~40 lines of `v-for` over its own sections, composing the
producer directly. What dies with it:

- `resetDefaults` and the `defaults` prop → `useConfiguratorState.resetCurrent()` — **L-1's BLOCKER
  cannot be expressed**, because the baseline is per-consumer and shape-aware by construction.
- `.config-section-header` / `.config-section-title` → `ConfiguratorLayer` (with a11y).
- `.console-well` → `tier="quiet"`.
- All three `:deep()` rules → the `size` axis + `--slider-thumb-size` + producer row ink.
- `--slider-track-bg` + `variant="spectrum"` → the default variant's live `.slider-range` fill.
- The `SliderDef`/`SliderSection` export-from-`.vue` → a `.ts` schema both consumers import.

And three repo-level edges that this component sits downstream of, each of which is a one-table
collapse:

1. **Delete `demo/ui/`.** 19 alias barrels, 92 import sites rewritten to glass-ui subpaths. One
   path to every symbol; then a `no-restricted-imports` rule on the bare root barrel makes the
   74-key subpath map load-bearing.
2. **Generate `tsconfig.demo.json`'s value.js `paths` from `package.json#exports`**, exactly as
   `vite.config.ts:33-49` already generates the runtime aliases — or delete them and let node
   resolution answer. The demo must typecheck against the surface it executes.
3. **Collapse the three pane tables into `VIEW_MAP`** holding component references. `componentFor`
   and its `return ColorPicker` masking fallback disappear; a pane rename becomes a type error;
   `defaultPaneIndex` is derived from which slot the view is named for, so no tenth view can forget
   it the way `blob` did.

Ordering, if only some of this lands: **L-1 first** (a correctness break, and the smallest patch —
delete `resetDefaults`, move reset to the consumers). **L-6 second** (34 controls currently
communicate nothing, and the fix is *deleting* two lines). **L-5 third** (the dogfood gate is
currently aimed at a stale artefact, which silently weakens every other proof in the tranche).
