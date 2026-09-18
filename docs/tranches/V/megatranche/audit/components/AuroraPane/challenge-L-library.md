# CHALLENGE-L — AuroraPane · library structure — **PASS 2**

> **Provenance.** A prior CHALLENGE-L seat wrote this path at 11:40 (13 findings, 34 KB, HEAD
> `32b4040e`). That report is preserved **verbatim** alongside this one at
> `docs/tranches/V/megatranche/audit/components/AuroraPane/challenge-L-library-pass1.md` — nothing
> from it is lost or superseded on the merits. This pass-2 file is the seat of record. It carries
> **five findings pass 1 did not reach** (verified by keyword census against the pass-1 text:
> `useConfiguratorState` 0, `ConfiguratorLayer` 0, `<Configurator>` 0, `spectrum` 0, `ink-muted` 0,
> `slider-track-bg` 0, `tsconfig.demo` 0, `package.json#exports` 0, `stampStops` 0,
> `text-admin-label` 0), **one correction to pass 1**, and a cross-reference table that folds
> pass 1's 13 findings in so the two read as one seat.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
explicitly declared at spawn. Declared, not inherited. No DEFECT on this axis.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
- HEAD at pass-2 open: **`f36f780c`** (`docs(V·mega): STATE — three OM censuses complete, findings
  at MT-F043`). The prompt cited `c654824e`; the tree has advanced twice under the formation
  (pass 1 saw `32b4040e`). Recorded, not a finding.
- Subject: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines) + `aurora-atoms.ts` (71),
  `aurora-harmony-stops.ts` (40)
- Axis: library structure — module boundaries, ownership, dependency direction, public surface
- **Verdict: DEFECTIVE**

**The pass-2 thesis, in one sentence.** Pass 1 correctly found that the *aurora concept* has no
single home; pass 2 finds that the *pane chassis under it* has no single home either — glass-ui
7.0.0 ships a complete, generic `<Configurator>` lattice whose own type declarations **name aurora
as the intended consumer**, and the demo forked it, and that fork is the direct cause of the
stringly-typed hand-off pass 1 booked as L-6.

---

## Pass-2 summary table

| id | severity | defect | evidence |
|---|---|---|---|
| **P2-1** | **MAJOR** | `ConfigSliderPane` is a demo fork of glass-ui's shipped `<Configurator>` + `<ConfiguratorLayer>` + `useConfiguratorState<T>`; the producer `.d.ts` names aurora as the intended consumer | glass-ui `.d.ts` quotes + fork table |
| **P2-2** | **MAJOR** | `variant="spectrum"` is the wrong variant for a scalar knob, and `--slider-track-bg` is fed a boot-stamped **foreground ink**; the control ends with **no value indication** | glass-ui CSS + both screenshots read |
| **P2-3** | MINOR | `stampStops` (a `join("|")`) is homed in the ramp sampler, so the strip chip drags `mixColors` + the whole CSS-colour parser through a barrel | 16-module closure + `sample.ts:88-91` |
| **P2-4** | MINOR | The caps-eyebrow recipe is hand-rolled twice, 5/5 declaration-identical, while glass-ui ships `@utility text-admin-label` | two file:line blocks + glass-ui CSS |
| **P2-5** | INFO | `tsconfig.demo.json`'s value.js path map is wrong on **5 of 8 rows** vs `package.json#exports` | census, pasted |
| **P2-C** | — | **Correction to pass-1 L-12**: the 12 px thumb width is *not* glass-ui-owned; it follows from the demo's own `spectrum` choice | glass-ui CSS + demo's own coarse rule |

Pass 1's L-1 … L-13 are **carried forward unchanged** — see §Cross-reference.

---

## 0. The measured graph (pass-2 recomputation)

Transitive local closure of `AuroraPane.vue`, resolving every relative specifier
(`/private/tmp/claude-504/…/scratchpad/graph.mjs`):

```
=== TRANSITIVE LOCAL MODULES (16) ===
  demo/color-picker/composables/boot/atmosphere-calibration.ts
  demo/color-session/color-chips/PreviewRamp.vue
  demo/color-session/color-chips/PreviewStrip.vue
  demo/color-session/color-chips/index.ts
  demo/color-session/color-chips/sample.ts
  demo/color-session/color-utils.ts
  demo/color-session/picker-color.ts
  demo/scenes/ConfigSliderPane.vue
  demo/scenes/atmosphere/AuroraPane.vue
  demo/scenes/atmosphere/aurora-atoms.ts
  demo/scenes/atmosphere/aurora-harmony-stops.ts
  demo/shared/ui/PaneHeader.vue
  demo/ui/button/index.ts
  demo/ui/card/index.ts
  demo/ui/select/index.ts
  demo/ui/slider/index.ts
=== EXTERNAL SPECIFIERS (10) ===
  @lucide/vue   @mkbabb/glass-ui   @mkbabb/glass-ui/aurora   @mkbabb/glass-ui/color
  @mkbabb/glass-ui/configurator   @mkbabb/glass-ui/dock
  @mkbabb/value.js/color   @mkbabb/value.js/css   reka-ui   vue
=== CROSS-AREA EDGES ===
  AuroraPane.vue          --../../ui/select-->                       demo/ui/select/index.ts
  ConfigSliderPane.vue    --../ui/{button,card,slider}-->            demo/ui/*/index.ts
  ConfigSliderPane.vue    --../shared/ui/PaneHeader.vue-->           demo/shared/ui/PaneHeader.vue
  AuroraPane.vue          --../../color-session/color-chips-->       demo/color-session/color-chips/index.ts
  aurora-harmony-stops.ts --../../color-picker/composables/boot/…--> demo/color-picker/composables/boot/atmosphere-calibration.ts
```

This independently confirms pass-1 L-1: the last edge, taken together with
`demo/color-picker/composables/boot/useAtmosphere.ts:35` →
`../../../scenes/atmosphere/aurora-atoms`, is a **bidirectional** area dependency.

One load-class detail pass 1 did not state: `AuroraPane` is lazy
(`demo/shell/usePaneRouter.ts:77` — `defineAsyncComponent(() => import("../scenes/atmosphere/AuroraPane.vue"))`),
yet `App.vue:193 → useAtmosphereBoot → useAtmosphere:35` **statically** imports
`scenes/atmosphere/aurora-atoms.ts`. That module therefore sits in the **eager boot chunk** while
living inside the lazy pane's directory. The directory name lies about the module's load class —
an independent reason the home is wrong, on top of the cycle.

---

## P2-1 · MAJOR — `ConfigSliderPane` is a demo fork of glass-ui's shipped `<Configurator>` chassis

**Pass 1 did not reach this** (`useConfiguratorState` / `ConfiguratorLayer` / `<Configurator>`:
0 occurrences in the pass-1 text). It is the root beneath pass-1 L-6.

glass-ui 7.0.0 ships a complete configurator lattice
(`node_modules/@mkbabb/glass-ui/dist/components/configurator/index.d.ts`):

```ts
export { default as Configurator }      from "./Configurator.vue";
export { default as ConfiguratorLayer } from "./ConfiguratorLayer.vue";
export { default as ConfiguratorRow }   from "./ConfiguratorRow.vue";
export { CONFIGURATOR_SIZE_KEY, provideConfiguratorSize, useOptionalConfiguratorSize,
         type ConfiguratorSize } from "./size";
export { useConfiguratorState, type ConfiguratorCloneMode, type ConfiguratorState,
         type ConfiguratorStateOptions } from "./useConfiguratorState";
```

`Configurator.vue.d.ts` is **generic over the live config shape** — `<T>`, with
`presets?: readonly ConfiguratorPreset<T>[]`, `layers`, `activeLayer`,
`scrollMode: "auto" | "always" | "never"`, `size`, `asideSide`, `galleryPlacement`, `asideWidth`,
a `stage` slot, a `controls` slot, and a **`footer` slot whose slot-props are `{ reset: () => void }`**.
The `scrollMode` doc is explicit:

> *"`auto` — the controls column renders a `<FadingScroll axis="y">` scroll-port (sharp at rest,
> feathered while overflowing); controls scroll when their intrinsic height exceeds the host.
> Default."*

`useConfiguratorState.d.ts` ships the state machine:

```ts
export interface ConfiguratorState<T> {
    readonly config: T;
    readonly activePreset: ComputedRef<string | undefined>;
    readonly isDirty: ComputedRef<boolean>;
    selectPreset(key: string): void;
    resetCurrent(): void;
    cyclePreset(direction?: 1 | -1): void;
    getPreset(key: string): ConfiguratorPreset<T> | undefined;
}
export declare function useConfiguratorState<T extends object>(options: ConfiguratorStateOptions<T>): ConfiguratorState<T>;
```

with `clone` (defaulting to `structuredClone`) and `equals` hooks, and a `cloneMode` axis whose
`"per-preset"` rung the producer literally labels **"(aurora shape: per-preset clone map; edits
persist per slot across switches)"**.

`ConfiguratorLayer.vue.d.ts` names this component as its intended consumer:

> *"Authors stack multiple layers to express the per-axis split (per R2 §C: **aurora has Medium /
> Palette / Flow / Texture / Comp / Nuclei**; blob has Mood / Body / Surface / Color / Motion /
> Pointer / Render)."*

### The fork, line by line

| shipped glass-ui surface | demo re-roll |
|---|---|
| `Configurator<T>` generic config prop | `config: Record<string, unknown>` — `ConfigSliderPane.vue:41-52` |
| `useConfiguratorState.resetCurrent()` + `isDirty` | `resetDefaults()` = `Object.assign(config, structuredClone(defaults))` — `:92-94`; no dirty state |
| `scrollMode="auto"` `<FadingScroll>` port | hand-rolled `.pane-scroll-fade scrollbar-thin … overflow-y-auto` — `:106` |
| `<Configurator>` `footer` slot exposing `reset` | hand-rolled `.config-action-bar` + `<GlassDock>` — `:163-174`, `:245-251` |
| `<ConfiguratorLayer label sub dividers>` | hand-rolled `.config-section-header` / `.config-section-title` — `:128-130`, `:232-243` |
| `ConfiguratorSize` / `provideConfiguratorSize` | (unused; see pass-1 L-8's `h-9` per-instance override) |

The component's header **admits knowing about the module and then declines it**
(`ConfigSliderPane.vue:6-10`):

> *"HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow +
> useConfiguratorState. This component uses ConfiguratorRow for each labeled row so the demo
> composes the existing glass-ui surface rather than rebuilding the row primitive. **The
> section-group wrapper and the floating copy/reset dock remain demo-local (they are thin
> structural shells, not the row primitive).**"*

`useConfiguratorState` is named in that comment and **never imported**:

```
$ grep -n "useConfiguratorState\|ConfiguratorLayer\|<Configurator" demo/scenes/ConfigSliderPane.vue
(no output)
```

The "thin structural shells" claim is false on its face: `Configurator`, `ConfiguratorLayer` and
`useConfiguratorState` **are** those shells, and they ship in the version the repo depends on
(`package.json` → `"@mkbabb/glass-ui": "^7.0.0"`; installed `7.0.0`).

**Edicts violated:** 1 (a 253-line pane god-shell that owns scrolling + reset + dot-path
reflection + clipboard + section layout), 3 (a wrapper component that duplicates one that already
exists), 4 (primitives belong in glass-ui; and *reuse existing component-type names* — the name
`Configurator` exists and was passed over for `ConfigSliderPane`).

**Why it is the root of pass-1 L-6.** Pass 1 booked the stringly-typed
`config: Record<string, unknown>` surface and the four `as unknown as` launderings
(`AuroraPane.vue:111`, `:113`; `BlobPane.vue:124`, `:126`) as its own defect and proposed making
`ConfigSliderPane` generic over `T`. That is the right shape — and glass-ui **already shipped it**.
`Configurator<T>` + `useConfiguratorState<T>` are the generic seam. Adopting them deletes the
casts, deletes `BlobPane`'s 30-line `NumericAtomPath` guard (`BlobPane.vue:33-52`) as a *consumer*
concern, and closes the asymmetry pass 1 measured (one of two consumers guarded).

**Cure — architectural transposition.** Retire `demo/scenes/ConfigSliderPane.vue`. `AuroraPane`
composes `<Configurator>` + one `<ConfiguratorLayer label="Field">` + the already-consumed
`<ConfiguratorRow>`, with `useConfiguratorState<AuroraAtoms>`. Copy-JSON is the only genuinely
demo-local affordance and is four lines inside the `footer` slot.

---

## P2-2 · MAJOR — the sliders take the wrong glass-ui variant and are then repainted per-instance with a **foreground ink**; the control ends with no value indication

**Pass 1 did not reach this** (`spectrum` / `ink-muted` / `slider-track-bg`: 0 occurrences).

`ConfigSliderPane.vue:146` selects `variant="spectrum"`. The producer recipe
(`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, extracted verbatim):

```css
.glass-slider[data-variant=spectrum] .slider-track {
    height: calc(var(--slider-thumb-size,1rem) * 1.5);
    background: var(--slider-track-bg, var(--secondary)) }
.glass-slider[data-variant=spectrum] .slider-range {
    -webkit-backdrop-filter: none; box-shadow: none; background: 0 0 }   /* ← TRANSPARENT */
.glass-slider[data-variant=spectrum] .slider-thumb {
    width: calc(var(--slider-thumb-size,1rem) * .75);
    background: var(--slider-thumb-bg, transparent);
    border: var(--slider-thumb-border-w,2px) solid var(--slider-thumb-border-color,var(--background)) }
```

Compare the **default** track:

```css
.slider-track { height: var(--slider-track-height,.375rem); background: var(--slider-track-bg,var(--muted-medium)) }
.slider-range { --liquid-fill-tint: var(--slider-range-bg,var(--glass-capsule-warm)); … }  /* a real fill */
```

`spectrum` exists for the picker's **channel** sliders, which feed a live gradient into
`--slider-track-bg` — `demo/picker/controls/ComponentSliders/ComponentSliders.vue:67`. It kills the
filled range *on purpose*, because there the track itself is the information.

`ConfigSliderPane` takes that variant and feeds it a **flat foreground ink**
(`ConfigSliderPane.vue:202`):

```css
--slider-track-bg: var(--ink-muted, var(--muted-foreground));
```

`--ink-muted` is a boot-stamped **text** token, written on the root element at
`demo/color-picker/composables/boot/useAtmosphereBoot.ts:103`:

```js
document.documentElement.style.setProperty("--ink-muted", css);
```

A foreground ink used as a background fill. Net effect: transparent range + flat ink track +
hollow 0.75×-width thumb = **a control with no value readout at all except thumb position**.

### Visual confirmation — I read both captures

- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/atmosphere.png` — three
  full-width **solid dark-gray slabs** with hollow white ring thumbs; filled and unfilled portions
  are indistinguishable.
- `…/shots/safari-desktop-dark/atmosphere.png` — the same three slabs **inverted to near-white**.
  The light/dark inversion is itself the tell that this is an *ink* token driving a *surface*.

The `Zones` thumb (value 6 = `max`) sits flush against the track's rounded terminal in both.

**Edicts violated:** 4 (wrong member of the design system's own variant vocabulary; a
producer-side contrast concern patched demo-side), 5 (per-instance override rather than
root-level). Plus the `:deep()` reach that `ConfiguratorRow.vue.d.ts` explicitly documents its API
to make unnecessary — *"so a consumer expresses a 'double-label' row … **WITHOUT a `:deep()` reach
into the slot** or a hand-rolled in-slot sans+mono pair"* — four such rules at
`ConfigSliderPane.vue:204`, `:215`, `:219`, `:222`.

**Cure.** Drop `variant="spectrum"` for scalar configurator knobs; the default variant is the
correct member of the existing vocabulary and restores the `.slider-range` liquid fill. Delete the
`--slider-track-bg` ink override and the four `:deep()` rules. If the default track genuinely
fails 3:1 on the well, that is a **glass-ui contrast defect** → coordination packet, never a
demo-side ink swap.

---

## P2-C · CORRECTION to pass-1 L-12 — the 12 px thumb width is *not* glass-ui-owned

Pass-1 L-12 records the three 12×24 slider thumbs on `/#/atmosphere` and dispositions them as
*"glass-ui's, not AuroraPane's"*. The measurement is right; the attribution is wrong.

From `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `/#/atmosphere`, all four matrices:

```
safari-desktop-light/dark : {"w":12,"h":24,"tag":"span","label":"Colour Energy" | "Noise" | "Zones"}
safari-mobile-light/dark  : {"w":12,"h":44,"tag":"span", …}
```

The **12 px inline extent is a consequence of the demo's own variant choice**:
`width: calc(var(--slider-thumb-size,1rem) * .75)` is a *spectrum-only* rule (P2-2). The default
variant does not narrow the thumb. And the **block** axis is already the demo's own doing in the
other direction — `ConfigSliderPane.vue:218-230` extends the coarse-pointer hit area:

```css
@media (pointer: coarse) {
  .config-console :deep(.configurator-row .glass-slider)::before {
      content: ""; position: absolute; inset-inline: 0; top: 50%; translate: 0 -50%;
      block-size: max(100%, var(--dock-touch-target, 2.75rem)); }
}
```

which is exactly why mobile reads `h: 44` and desktop reads `h: 24`. The rule extends
`block-size` only; `inset-inline: 0` pins the inline extent to the thumb's own 12 px.

So: 3 of the route's 7 tap-target defects are **this component's**, curable demo-side by P2-2's
variant fix plus an `inline-size` term in the same `::before`. The other 4 (`input` 160×23, three
22×22 dock buttons) are shell chrome, correctly excluded by pass 1.

---

## P2-3 · MINOR — `stampStops` is homed in the ramp sampler, so the strip chip drags the CSS-colour parser through a barrel

**Pass 1 did not reach this** (`stampStops`: 0 occurrences).

`AuroraPane.vue:39` imports through the **barrel**:

```ts
import { PreviewStrip } from "../../color-session/color-chips";
```

`color-chips/index.ts:26-32` also exports `PreviewRamp`, `sampleInterpolationRamp`,
`serializeStop`, `RAMP_SAMPLE_COUNT`. And `PreviewStrip.vue:29` pulls `stampStops` from
`./sample` — which is, in full (`sample.ts:88-91`):

```ts
/** The `data-stops` stamp — ONE serialization, shared by chip + oracle. */
export function stampStops(stops: readonly string[]): string { return stops.join("|"); }
```

One line, zero dependencies. It is co-housed with the heavy half of the module
(`sample.ts:27-33`):

```ts
import { mixColors, type AnyColor, type HueInterpolationMethod } from "@mkbabb/value.js/color";
import { colorToCss, parseColorIn } from "../color-utils";
import type { PickerColorIn, PickerSpace } from "../picker-color";
```

→ `color-utils.ts` → `picker-color.ts` (217 lines; **26** symbols from `@mkbabb/value.js/color`
plus `parseCssColor` / `serializeCssColor` from `@mkbabb/value.js/css`).

Four modules AuroraPane's rendered output never touches therefore sit in its 16-module closure:
`PreviewRamp.vue`, `sample.ts`, `color-utils.ts`, `picker-color.ts`. `sampleInterpolationRamp` has
exactly one consumer and it is not this pane:

```
$ grep -rn "sampleInterpolationRamp" demo/ --include='*.vue' --include='*.ts' | grep -v color-chips/
demo/workbenches/mix/MixConfigBar.vue:23,62,71
```

Rollup will hoist most of it into the shared chunk (the picker uses `picker-color` regardless), so
I label the **bundle** cost a *hypothesis*. The **ownership** cost is measured and real: the
discrete-strip *stamp* and the continuous-ramp *sampler* are two concepts in one module, and the
strip consumer pays the sampler's dependency graph.

**Cure.** Split `stampStops` into `color-chips/stamp.ts`; leave `sample.ts` as the mix/gradient
sampler. Import `PreviewStrip` by file path, not barrel. The strip chip then carries **zero**
library dependency.

---

## P2-4 · MINOR — the caps-eyebrow recipe is hand-rolled twice, and glass-ui ships it as a utility

**Pass 1 did not reach this** (`text-admin-label` / `tracking-caps`: 0 occurrences). It is
adjacent to but distinct from pass-1 L-5 (which is about `.aurora-row`'s *layout* forking
`ConfiguratorRow`); this is about the *type recipe*.

`AuroraPane.vue:194-200` and `ConfigSliderPane.vue:237-243` are **5/5 declaration-identical**:

```css
/* .aurora-row-label  AND  .config-section-title — same five declarations */
font-family: var(--font-mono); font-size: var(--type-small); text-transform: uppercase;
letter-spacing: var(--tracking-caps); color: var(--muted-foreground);
```

```
$ grep -rn "tracking-caps" demo/ --include='*.vue' --include='*.css'
demo/scenes/atmosphere/AuroraPane.vue:198
demo/scenes/ConfigSliderPane.vue:241
```

Exactly two sites — and they are the two files of this component. glass-ui ships the recipe
(`dist/styles/typography/semantic.css`):

```css
@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label);
  line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps);
  font-weight: 500 }
```

*(Checked and cleared: `--tracking-caps` is glass-ui's own `@theme inline` bridge to
`--type-tracking-caps` — `dist/styles/theme/bridges.css` — so the token reference is **valid**. The
duplication is the defect, not the token. I raised and then killed the "undefined custom property"
hypothesis.)*

**Cure.** `class="text-admin-label text-muted-foreground"` on both; delete both style blocks. Two
homes → zero. Edicts 4 and 5.

---

## P2-5 · INFO — `tsconfig.demo.json`'s value.js path map is wrong on 5 of 8 rows

**Pass 1 did not reach this** (`tsconfig.demo` / `package.json#exports`: 0 occurrences). This is
the literal *"does it import from `@mkbabb/value.js` correctly — through the published subpath
export map?"* question the seat brief poses.

```
$ node -e "…"
package.json#exports (7):   ./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
                            — NO "." root key; no ./parsing; no ./units
tsconfig.demo.json paths(8): @mkbabb/value.js   /color  /parsing  /math  /easing  /units
                             /transform  /quantize
demo census of ACTUAL usage:
   25 @mkbabb/value.js/color     10 @mkbabb/value.js/css      6 …/math
    5 …/easing                    4 …/quantize
    0 bare @mkbabb/value.js       0 …/parsing   0 …/units   0 …/value   0 …/transform
```

- The tsconfig declares three specifiers that **do not exist** in the exports map:
  `@mkbabb/value.js` (bare `.`), `/parsing`, `/units`.
- It **omits** two that do exist — `/value` and `/css` — and `/css` is used **10 times** in the
  demo, *including inside AuroraPane's own closure* (`picker-color.ts:28-33`). Its types resolve
  only by node's own exports-map walk, never by the declared path map.
- The tsconfig's own comment — *"the bare `.` root + the 7 subpath barrels … there is no `.../*`
  wildcard because the `exports` map is a CLOSED 8-key set"* — is factually wrong on 5 of 8 rows.
- `vite.config.ts`'s `valueJsSelfAlias` is *generated* from `package.json#exports`, so it is
  correct by construction and likewise has no bare-root entry. Nothing imports the bare specifier
  (`grep -rn 'from "@mkbabb/value.js"' demo/ | wc -l` → `0`), which is why this is **latent**, not
  live — hence INFO. But it is a false map of the public surface sitting in the one file whose
  entire job is to describe the public surface.

---

## Cross-reference — pass-1 findings, carried forward

All thirteen stand. Full evidence in `challenge-L-library-pass1.md`. Pass-2 notes appended.

| pass-1 | severity | pass-2 disposition |
|---|---|---|
| L-1 `scenes` ↔ `color-picker` bidirectional area dependency | MAJOR | **Independently confirmed** by the pass-2 graph (§0). Pass 2 adds the *load-class* half: `aurora-atoms.ts` is statically pulled into the **eager boot chunk** (`App.vue:193 → useAtmosphereBoot → useAtmosphere:35`) while living inside a `defineAsyncComponent` pane's folder (`usePaneRouter.ts:77`). |
| L-2 `MEDIA` duplicated in the leaf; 3 of 10 media unreachable | MAJOR | **Independently reproduced.** `presets.d.ts:52` → 10 members; `AuroraPane.vue:54-62` → 7; unreachable = `kuwahara, metal, metal-gradient`. TypeScript cannot catch it (`AuroraMedium[]` accepts any subset). Pass-2 cure that needs **no glass-ui change**: a `Record<AuroraMedium, string>` label map with the array derived from `Object.keys` — a missing member is then a hard typecheck error, and it also retires the `label()` string-surgery title-caser (`:65-70`). |
| L-3 three harmony vocabularies, two label fns, two on-screen spellings | MAJOR | Carried. Pass 2 did not re-probe live (browser session held by a peer seat); pass-1 evidence is live-DOM and stands. |
| L-4 `demo/ui/*` = 19 pure re-export alias barrels | MAJOR | **Independently reproduced**: 19 dirs, each exactly one `index.ts`, each a single `export {…} from "@mkbabb/glass-ui"` (alert = 2 statements). Pass 2 adds the *idiom-sprawl* count — **four** import idioms for one design system inside two files: alias barrel (`AuroraPane.vue:18-24`; `ConfigSliderPane.vue:16-18`), granular subpath (`:20`, `:21`), root barrel (`:23`). glass-ui ships 66 granular subpaths incl. `./select ./button ./card ./slider`. |
| L-5 `.aurora-row` forks a row primitive; 58.7 px ragged column | MAJOR | Carried. P2-4 is the *type-recipe* half of the same fork. |
| L-6 `ConfigSliderPane` stringly typed; safety in consumers | MAJOR | **P2-1 is its root.** Pass 2 adds two runnable proofs: `npx tsc --noEmit --strict` exits **0** on `{key:"zone.count"}` and `{key:"totally.made.up"}` against the exported `SliderDef`; and the verbatim `writePath` (`ConfigSliderPane.vue:66-73`) throws `TypeError: Cannot set properties of undefined (setting 'count')` on that path. Also: `AuroraAtoms.zones` is **optional** in the producer, so `"zones.count"` is a typed-optional path the pane assumes present — kept alive only by `setArrangement` (`:81-84`) always rewriting the whole object. |
| L-7 handler typed against reka-ui `AcceptableValue`, not glass-ui `SelectionValue` | MINOR | **Confirmed and strengthened.** `dist/components/_shared/selection.d.ts` → `export type SelectionValue = string \| number`; `dist/components/select/Select.vue.d.ts:14` → `"update:modelValue": [value: SelectionValue]`. `grep -rl AcceptableValue node_modules/@mkbabb/glass-ui/dist/` → **no match**. Pass-2 mechanism note: this leak *manufactures* the defensive `String(v)` coercion at `AuroraPane.vue:79/83/89/93` — glass-ui's value can only ever be `string \| number`, while reka-ui's `AcceptableValue` admits objects and `null`. **Demo-side fix, not a coordination packet** (my own draft had mis-dispositioned this; pass 1 is correct). |
| L-8 per-instance `h-9` reproduces the shipped `size` variant | MINOR | Carried. Same family as P2-2 (per-instance override of a design-system primitive) and P2-1 (`ConfiguratorSize` / `provideConfiguratorSize` ship and are unused). |
| L-9 dead ternary | MINOR | **Independently reproduced.** `AuroraPane.vue:90` — `atoms.medium = kind === "smooth" ? { kind } : { kind };`, branches byte-identical. Intent is real (`AuroraMediumAtom` at `atoms.d.ts:49-54` structurally forbids `amount` on `smooth`) but the branch was never differentiated. Edict 2. Cure: `atoms.medium = { kind };`, comment kept. |
| L-10 enum accessors are plain fns, not `computed` | MINOR | Carried (edict 7 axis). |
| L-11 textured-medium `amount` structurally unreachable | MINOR | Carried; corroborated by `atoms.d.ts:49-54` read in pass 2. |
| L-12 12×24 thumbs are glass-ui-owned | INFO | **CORRECTED — see P2-C.** Measurement right, attribution wrong: the 12 px inline extent is the *spectrum* variant's own `width: calc(--slider-thumb-size * .75)` rule, chosen by the demo, and the block axis is already the demo's coarse-pointer `::before`. 3 of 7 are this component's and are demo-side curable. |
| L-13 stale module path in a live test header | INFO | **Independently reproduced.** `demo/test/glass/aurora-motion.test.ts:7` cites `@composables/color/aurora-atoms.ts` (an alias RF-15 killed at W43) while `:26` imports `../../scenes/atmosphere/aurora-atoms`. Pass-2 reading: this is *evidence for* L-1 — the module has changed homes at least twice and has never had a right one. |

---

## The greenfield lattice (pass-2 refinement of pass-1's)

Pass 1's lattice is right and I adopt it. Pass 2 changes **one** thing: `ConfigSliderPane` is not
made generic — it is **deleted**, because glass-ui already ships the generic chassis (P2-1).

```
demo/atmosphere/                  ← ONE package, ONE concept, no cross-area edge
    atoms.ts            AURORA_ATOMS_KEY · DEFAULT_AURORA_ATOMS      (from scenes/)
    calibration.ts      resolveCalibratedAtmosphere — pure, no Vue    (from color-picker/boot/)
    harmony-stops.ts    auroraHarmonyStops — a sibling import
    useAtmosphere.ts    the reactive owner; provides the key          (from color-picker/boot/)
    media.ts            Record<AuroraMedium|ColorHarmony|…, string> label maps — exhaustive BY TYPE
    AuroraPane.vue      a view (~90 lines). Composes:
                          <Configurator> <ConfiguratorLayer> <ConfiguratorRow>
                                                    @mkbabb/glass-ui/configurator
                          <Select…>                 @mkbabb/glass-ui/select   (SelectionValue)
                          <Slider>                  @mkbabb/glass-ui/slider   (DEFAULT variant)
                        state via useConfiguratorState<AuroraAtoms>

demo/shared/label.ts              ONE kebab→display transform (pass-1 L-3)   [existing dir]
demo/color-session/color-chips/
    stamp.ts            stampStops                                    ← split out (P2-3)
    sample.ts           sampleInterpolationRamp — mix/gradient only

DELETED
    demo/scenes/ConfigSliderPane.vue   → glass-ui <Configurator> owns the chassis   (P2-1)
    demo/ui/**  (19 alias barrels)     → import @mkbabb/glass-ui/<subpath> directly (pass-1 L-4)
    demo/color-picker/composables/boot/atmosphere-calibration.ts → demo/atmosphere/
```

**Direction after:** `shell → atmosphere/ → glass-ui`. One-way, acyclic. The
`color-picker ↔ scenes` pair disappears from the graph script's output — that is the gate, and it
is mechanically checkable by re-running `graph.mjs`.

**Net:** −19 modules (`demo/ui/`), −253 lines (`ConfigSliderPane`), −4 `as unknown as` casts,
−1 30-line mapped-type guard, −4 literal vocabulary arrays, −2 divergent label fns → 1, −2 caps
style blocks → 0, −4 `:deep()` reaches, −1 package-lattice cycle, +3 aurora media returned to the
user. Nothing new is created except modules in directories that already exist — KISS holds.

---

## Negative proofs (what pass 2 checked and found SOUND)

1. **No deep `src/` import anywhere in the closure.** All 16 transitive local modules resolve
   inside `demo/`; the only value.js specifiers reached are `@mkbabb/value.js/color` and
   `@mkbabb/value.js/css`, both published `exports` keys. The T.W1 demo-dogfood keystone **holds** —
   every value.js import in this graph is one a real consumer could write. (P2-5 is about the
   *declared map*, not about any illegal import.)
2. **No phantom dependency.** `reka-ui` is a declared devDependency (`package.json:106`,
   `"reka-ui": "^2.9"`), so pass-1 L-7 is a boundary leak, not a resolution bug.
3. **`verbatimModuleSyntax` compliant.** `AuroraPane.vue` 4/4 type-only imports use `import type`
   (`:25`, `:26-31`, `:34`); `aurora-atoms.ts` 2/2 (`:1`, `:2`); `aurora-harmony-stops.ts` 2/2
   (`:20`, `:21`). No mixed import.
4. **`fmt()` at `aurora-harmony-stops.ts:26-28` is correct.** I traced `/\.?0+$/` against
   `"240.0000"`, `"100.5000"`, `"0.0000"`: `0+` cannot span the decimal point, so the match always
   anchors at or after the dot. `240 → "240"`, `100.5 → "100.5"`, `0 → "0"`. Raised as a suspect,
   killed as a finding.
5. **`--tracking-caps` is a real token**, bridged by glass-ui's `@theme inline`
   (`dist/styles/theme/bridges.css`). The "undefined custom property → invalid-at-computed-value"
   hypothesis was raised and **disproved**.
6. **The atmosphere suite is green.**
   `npx vitest run demo/test/glass/aurora-bracket.test.ts demo/test/glass/aurora-motion.test.ts`
   → `Test Files 2 passed (2) · Tests 8 passed (8)` in 1.35 s.
7. **Zero page errors, zero console errors, zero horizontal overflow, `main` count 1, no
   dark-class miss** on `/#/atmosphere` across all four Safari matrices (`REPORT.json`).
8. **Reduced motion not raised** — verified by the root (`raf/1.5s = 0` under
   `reducedMotion: reduce`), rAF loop glass-ui-owned. Not born-RED here.
9. **C2 (aurora palette-blind static-Sky) not re-litigated** — a chronic with a glass-ui-side root
   (`deriveAurora` vs `deriveAuroraPalette` signature divergence). Context only.

---

## Disposition summary (pass 2 + pass 1, merged)

| id | severity | edicts | disposition |
|---|---|---|---|
| P2-1 | MAJOR | 1, 3, 4 | wave — adopt `<Configurator>`/`<ConfiguratorLayer>`/`useConfiguratorState`; delete `ConfigSliderPane` |
| P2-2 | MAJOR | 4, 5 | wave — drop `variant="spectrum"`, drop the `--ink-muted` track override, drop 4 `:deep()` rules **+** coordination packet only if the default track measures <3:1 |
| pass-1 L-1 | MAJOR | 1, 3 | wave — mint `demo/atmosphere/`, break the cycle |
| pass-1 L-2 | MAJOR | 2 | wave — exhaustive `Record` label maps **+** coordination packet (`AURORA_MEDIA` runtime const) |
| pass-1 L-3 | MAJOR | — | wave — one `label` module in `demo/shared/` |
| pass-1 L-4 | MAJOR | 2, 3, 4 | wave — delete `demo/ui/**` |
| pass-1 L-5 | MAJOR | 4, 5 | wave — folds into P2-1 |
| pass-1 L-6 | MAJOR | — | falls out of P2-1 (generic `T` seam already ships) |
| P2-3 | MINOR | 1 | wave — split `color-chips/stamp.ts` |
| P2-4 | MINOR | 4, 5 | wave — `text-admin-label` |
| pass-1 L-7 | MINOR | 4 | wave — retype handlers to glass-ui `SelectionValue`; drop the `String(v)` coercions |
| pass-1 L-8 | MINOR | 5 | wave — use the shipped `size` axis |
| pass-1 L-9 | MINOR | 2 | wave — one line |
| pass-1 L-10 | MINOR | 7 | wave — `computed` lens |
| pass-1 L-11 | MINOR | — | book — `amount` atom reachability |
| P2-C | INFO | — | **corrects pass-1 L-12**: 3 tap-target defects are demo-side curable, not glass-ui's |
| P2-5 | INFO | — | book — `tsconfig.demo.json` path map vs `package.json#exports` |
| pass-1 L-13 | INFO | — | book — stale doc path in `aurora-motion.test.ts:7` |

No source edits land from this formation. This report plus the preserved pass-1 file are the whole
deliverable.
