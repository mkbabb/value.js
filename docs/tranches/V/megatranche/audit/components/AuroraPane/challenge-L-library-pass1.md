# CHALLENGE-L — AuroraPane · library structure

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model declared for this
seat. Declaration matches observation; no inherited/undeclared seat.

**Subject**: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines) + its colocated module family
`aurora-atoms.ts` (71), `aurora-harmony-stops.ts` (40).
**Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
**HEAD observed**: `32b4040e` (the prompt cited `c654824e`; the tree advanced under the formation —
recorded, not a finding).
**Axis**: library structure — module boundaries, ownership, dependency direction, public surface.

**Verdict: DEFECTIVE.** The aurora concept has **no single home**. It is split across
`demo/scenes/atmosphere/` and `demo/color-picker/composables/boot/` with static imports running in
**both directions**, and that one broken boundary is the generative mechanism behind every other
finding below: a duplicated vocabulary that has already silently drifted three members behind
glass-ui 7, an untyped hand-off that forces four `as unknown as` launderings, and a
user-visible label divergence between two panes that render the same word.

---

## Summary table

| id | severity | defect | evidence class |
|---|---|---|---|
| L-1 | MAJOR | `scenes` ↔ `color-picker` bidirectional area dependency; both edges are aurora's | graph script + file:line |
| L-2 | MAJOR | `MEDIA` vocabulary duplicated in the leaf; 3 of glass-ui 7's 10 media unreachable | live DOM + node probe |
| L-3 | MAJOR | Third `harmony` vocabulary + divergent label functions → different strings, same concept, two routes | live DOM, both routes |
| L-4 | MAJOR | `demo/ui/*` — 19 pure re-export alias barrels; three parallel paths to one glass-ui primitive | file dump + counts |
| L-5 | MAJOR | `.aurora-row` forks `ConfiguratorRow`/`LabeledField` the parent module already consumes; 58.7 px ragged control column | WebKit measurement |
| L-6 | MAJOR | `ConfigSliderPane`'s public surface is stringly typed; safety pushed into consumers, one of two has it | file:line + 4 cast sites |
| L-7 | MINOR | Handler typed against **reka-ui**'s `AcceptableValue`, not glass-ui's `SelectionValue` | .d.ts quotes |
| L-8 | MINOR | `class="h-9"` per-instance override reproduces the shipped `size="sm"` token; 12/12 sites ignore the prop | computed-style probe |
| L-9 | MINOR | Dead ternary — both branches identical | `AuroraPane.vue:90` |
| L-10 | MINOR | Enum accessors are plain functions, not `computed`; 4× hand-rolled lens with no home | `AuroraPane.vue:73-94` |
| L-11 | MINOR | Textured-medium `amount` atom is structurally unreachable from the pane | atoms `.d.ts` + `setMedium` |
| L-12 | INFO | 12×24 slider thumbs = 3 of 7 tap-target defects on `/#/atmosphere` (glass-ui-owned) | visual REPORT.json |
| L-13 | INFO | Stale module path in a live test's doc header | `aurora-motion.test.ts:7` |

---

## L-1 · MAJOR — the aurora concept is split across a boundary crossed in both directions

### Evidence

A directory-level import graph over the committed demo tree (excluding `demo/test/`), area = first
path segment under `demo/`:

```
$ node scratchpad/areas.mjs
=== BIDIRECTIONAL AREA PAIRS (cycles) ===
  color-picker <-> picker   (2 / 1)
  color-picker <-> scenes   (1 / 1)
  palettes <-> shell   (1 / 8)
  picker <-> shell   (1 / 1)

=== scenes<->color-picker detail ===
  demo/color-picker/composables/boot/useAtmosphere.ts  ->  ../../../scenes/atmosphere/aurora-atoms
  demo/scenes/atmosphere/aurora-harmony-stops.ts       ->  ../../color-picker/composables/boot/atmosphere-calibration
```

The `color-picker <-> scenes` cycle is **entirely** the aurora module family. Both edges, verbatim:

- `demo/color-picker/composables/boot/useAtmosphere.ts:35`
  `import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";`
- `demo/scenes/atmosphere/aurora-harmony-stops.ts:23`
  `import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";`

### Mechanism

Two halves of one concept were homed on opposite sides of a layer boundary:

- **The atoms** (`AURORA_ATOMS_KEY`, `DEFAULT_AURORA_ATOMS`) live in the **leaf pane's folder** —
  but their only *owner* is the boot composable, which `reactive()`s and `provide()`s them
  (`useAtmosphere.ts:128-129`). The app's boot chain therefore statically depends on a lazily-routed
  scene folder (`usePaneRouter.ts:77` loads `AuroraPane.vue` via `defineAsyncComponent`) for the
  application's own atmosphere default.
- **The calibration** (`resolveCalibratedAtmosphere` — the function that decides what an atom *means*)
  lives in **boot** — so the leaf pane's preview-truth module has to reach up into the boot chain to
  tell the truth about its own control.

`aurora-atoms.ts:48` names the split in its own prose: *"the sibling half of this knob site"*.
The module knows it is half of something.

Neither half is where it belongs, and the `scenes → boot` reach is a component → boot crossing of
exactly the kind this seat exists to find. It is not a file-level `import` cycle (the graph is
acyclic at file granularity — `atmosphere-calibration.ts` imports only glass-ui), so no bundler or
linter reports it; it is a **package-lattice cycle**, invisible to every gate the repo runs.

### Consequence (why this is the root, not a taste complaint)

Because the concept has two homes, no single module can hold the aurora's *invariants*. The
vocabulary (L-2), the label grammar (L-3), the type of an atom write (L-6, L-7) and the reset
contract are each maintained by hand at whichever site happened to need them. L-2 and L-3 are that
absence cashing out.

### Reproduction

`node scratchpad/areas.mjs` (script committed to the session scratchpad; ~40 lines, `git ls-files` +
relative-specifier resolution → area edges). Re-run after any move; the pair must disappear.

### Proposed cure — architectural transposition (one home)

Collapse the two halves into a single feature package that boot *consumes*, one-way:

```
demo/atmosphere/                  ← the ONE home for the aurora concept
  atoms.ts                        AURORA_ATOMS_KEY + DEFAULT_AURORA_ATOMS      (moved from scenes/)
  calibration.ts                  resolveCalibratedAtmosphere + CALIBRATED_*   (moved from boot/)
  harmony-stops.ts                the STRIP truth function — now a SIBLING import
  useAtmosphere.ts                the reactive owner; provides the key         (moved from boot/)
  AuroraPane.vue                  a pure view over the package; zero cross-area imports
```

Then the only edges are `color-picker/boot → atmosphere` (App composes the region) and
`shell → atmosphere` (the router lazy-loads the pane) — both shell → feature, both one-way. The
pane's import list becomes `./atoms`, `./harmony-stops`, `@mkbabb/glass-ui/*`, and the shared chip
module. Nothing else. `atmosphere-calibration`'s own header already claims *"Pure module — no Vue"* —
it has no reason to live under `composables/boot/` at all.

This is a pure move: no behaviour changes, and `demo/test/glass/aurora-bracket.test.ts` (which today
imports from **both** homes, lines 6-7 and 14) collapses to one import root.

---

## L-2 · MAJOR — the medium vocabulary is duplicated in the leaf, and has already drifted

### Evidence

`AuroraPane.vue:54-62` hand-lists the painterly media:

```ts
const MEDIA: AuroraMedium[] = [
    "smooth", "pastel", "watercolor", "oil", "crayon", "vangogh", "oil-pastel",
];
```

glass-ui 7.0.0 declares ten
(`node_modules/@mkbabb/glass-ui/dist/components/aurora/constants/presets.d.ts:52`):

```ts
export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil" | "crayon"
  | "vangogh" | "oil-pastel" | "kuwahara" | "metal" | "metal-gradient";
```

Every one of the three missing media is fully reachable through the shipped door:

```
$ node scratchpad/probe-media.mjs
glass-ui AuroraMedium union size: 10 | AuroraPane MEDIA size: 7
MISSING FROM PANE: kuwahara, metal, metal-gradient
  ...
  kuwahara        -> resolved medium=kuwahara        reachable=YES
  metal           -> resolved medium=metal           reachable=YES
  metal-gradient  -> resolved medium=metal-gradient  reachable=YES
```

And confirmed shipping-blind in the live app (WebKit, `http://localhost:9000/#/atmosphere`, Medium
select opened):

```
MEDIA options in live DOM: ["Smooth","Pastel","Watercolor","Oil","Crayon","Vangogh","Oil Pastel"]
```

### Mechanism

`const MEDIA: AuroraMedium[]` annotates the array **by** the union. A *subset* of a union satisfies
`Union[]`, so omitting a member is invisible to `tsc`. The producer grew three media under the
consumer and no gate could fire.

The demo already knows the correct idiom, one directory over —
`demo/color-session/generate-color.ts:68-76`:

```ts
export const HARMONY_NAMES = [ ... ] as const;
export type HarmonyName = (typeof HARMONY_NAMES)[number];
```

— derive the type **from** the array, not the array from the type. AuroraPane inverts it.

### Reproduction

`node scratchpad/probe-media.mjs`; and open `/#/atmosphere` → Medium → count 7 rows.

### Proposed cure

The vocabulary belongs to whoever owns the union: **glass-ui**. glass-ui is not ours to edit this
formation, so this is a **coordination packet** (see §Packets, P-1): `@mkbabb/glass-ui/aurora` should
export runtime tuples (`AURORA_MEDIA`, `AURORA_HARMONIES`, `AURORA_ARRANGEMENTS`, `AURORA_MOTIONS`)
with the unions *derived from them*, so a producer-side addition is a compile-time event for every
consumer and the pane's four literal arrays are deleted outright.

Until the packet lands, the demo-side stopgap is exhaustiveness-by-construction — a
`Record<AuroraMedium, string>` label map whose keys `tsc` *must* see in full, with the array read
off `Object.keys`. That converts the silent omission into a build failure without inventing a new
home. (Stopgap only; the tuples belong upstream.)

---

## L-3 · MAJOR — three "harmony" vocabularies, two label functions, two spellings on screen

### Evidence — observed live, both routes, one WebKit session

```
/#/atmosphere  aria-label="Palette harmony"
  ["Analogous","Complementary","Split Complementary","Triad","Tetradic","Monochrome"]

/#/generate    aria-label="Color harmony"
  ["Golden…","Analogous…","Complementary…","Triadic…","Split complementary…","Random…"]
```

Three homes for a concept named "harmony":

1. `@mkbabb/glass-ui` — `ColorHarmony` (`dist/composables/color/index.d.ts:81`), aliased to
   `AuroraHarmony` (`components/aurora/composables/color.d.ts:34`). 6 members, `triad`.
2. `demo/scenes/atmosphere/AuroraPane.vue:45-52` — `HARMONIES`, a hand-copy of (1).
3. `demo/color-session/generate-color.ts:68-75` — `HARMONY_NAMES`, 6 members, `triadic`,
   plus `golden`/`random`, minus `tetradic`/`monochrome`.

And two label functions rendering them:

- `AuroraPane.vue:65-70` — per-word title case.
- `demo/workbenches/generate/GenerateControls.vue:82-84` — first-letter only.

```
$ node -e '…'
split-complementary  AuroraPane: "Split Complementary"    GenerateControls: "Split complementary"
oil-pastel           AuroraPane: "Oil Pastel"             GenerateControls: "Oil pastel"
metal-gradient       AuroraPane: "Metal Gradient"          GenerateControls: "Metal gradient"
```

### Mechanism

Neither the vocabulary nor its *presentation* has a home, so both were re-derived at each site. The
divergence reaches the user: the same product spells the same harmony two ways depending on which
pane you are in, and calls its control "Palette harmony" in one place and "Color harmony" in another.

Note the two `HarmonyName` sets are genuinely different *domains* (glass-ui's aurora derive vs the
demo's palette generator) — so this is not a "merge them" finding. It is that (a) the aurora copy at
site 2 is pure duplication with no reason to exist, and (b) the **kebab → display-label** transform
is one concept with two implementations and divergent output.

### Reproduction

`node scratchpad/probe-harmony.mjs` — opens both selects, prints both option lists.

### Proposed cure

- Delete site 2 entirely (subsumed by packet P-1).
- The label transform is one function. It has exactly one honest home in the current lattice:
  `demo/shared/` (which already exists — no new dir, KISS holds). Both call sites import it; the two
  spellings collapse to one by construction. `GenerateControls`' `capitalize` and AuroraPane's
  `label` both die.

---

## L-4 · MAJOR — `demo/ui/*` is a 19-module alias layer over the design system

### Evidence

`AuroraPane.vue:18-24` imports its Select from `"../../ui/select"`. That module is, in full:

```ts
// demo/ui/select/index.ts — the entire file
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
```

Nineteen such barrels exist. All but two (`alert`, which carries a historical note; `input`, which
targets `/forms`) are one-line re-exports of `@mkbabb/glass-ui`. They add no type, no default, no
variant, no wrapper — they rename a package.

Three parallel paths to the same primitives coexist in the demo:

```
$ grep -rl 'from "(\.\./)*ui/' demo --include=*.vue --include=*.ts | wc -l   →  48   files via the barrels
$ grep -r 'from "@mkbabb/glass-ui"'  demo | wc -l                            →  37   root-barrel imports
$ grep -r 'from "@mkbabb/glass-ui/' demo | wc -l                             →  82   subpath imports
```

The dual path is visible **inside one file**: `demo/scenes/ConfigSliderPane.vue` — AuroraPane's own
parent — imports `Button`/`Card`/`Slider` from `../ui/*` (lines 16-18) and `GlassDock`/
`ConfiguratorRow` from `@mkbabb/glass-ui/dock` and `@mkbabb/glass-ui/configurator` (lines 20-21).
Same package, same file, two idioms.

### Mechanism

The barrels are the fossil of the shadcn-vue → glass-ui migration: `demo/ui/alert/index.ts`'s own
header records that it *"previously held a local shadcn-vue re-implementation … B.W2 converted it to
a re-export."* The conversion moved the implementation and kept the address. That is precisely the
shape edict 2 forbids — an alias whose only function is to let old import paths keep working — and
it directly contradicts edict 4's "glass-ui is the design system": the demo's code reads as though
`ui/select` were a demo component.

Secondary cost: the barrels route through the **root** entry (`@mkbabb/glass-ui`, 25 KB of
re-exports) rather than the granular subpath (`@mkbabb/glass-ui/select`, 260 bytes), so every
`demo/ui/*` consumer widens its module graph for no gain. glass-ui declares
`"sideEffects": ["*.css"]`, so a bundler can shake it — but the *source* dependency is real and it
is what a reader and a typechecker see.

### Reproduction

`for f in demo/ui/*/index.ts; do echo "--- $f"; cat "$f"; done` — nineteen one-liners.

### Proposed cure

Delete `demo/ui/` wholesale. Every consumer imports the glass-ui **subpath** directly
(`@mkbabb/glass-ui/select`, `/button`, `/card`, `/slider`). It is a mechanical rewrite across 48
files, it removes 19 modules, and it makes the design-system boundary legible at every call site
instead of laundered behind a demo-looking path. For AuroraPane specifically:

```ts
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mkbabb/glass-ui/select";
```

---

## L-5 · MAJOR — `.aurora-row` forks a row primitive the parent module already consumes

### Evidence

AuroraPane hand-rolls its labelled rows (`AuroraPane.vue:118-120, 184-200`):

```html
<div class="aurora-row">
    <span class="aurora-row-label">Harmony</span>
    <Select …>
```
```css
.aurora-row { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
.aurora-row-label { font-family: var(--font-mono); text-transform: uppercase; … }
```

Its **parent component**, `demo/scenes/ConfigSliderPane.vue:133-136`, uses glass-ui's shipped row and
says so in a comment: *"the glass-ui ConfiguratorRow label API (L14), **no demo fork**. … the prior
in-slot sans+mono label pair (the doubled row) is gone."*

glass-ui's own `ConfiguratorRow` doc (`dist/components/configurator/ConfiguratorRow.vue.d.ts`)
names this exact use, and names the API value.js itself commissioned:

> "Slot consumes the actual control (Slider, **Select**, Switch, NumberField, etc.)"
> "# The double-label API (**value.js L14**) … so a consumer expresses a 'double-label' row … **WITHOUT
> a `:deep()` reach into the slot or a hand-rolled in-slot sans+mono pair**."
> "use **LabeledField** directly for an accessible form control, including inside a Configurator."

`@mkbabb/glass-ui/labeled-field` is on the export map. Neither is used here.

### Measured consequence — the control column is ragged

WebKit 1440×900, `/#/atmosphere`, `.aurora-row` geometry:

| row | label width | trigger left | trigger width |
|---|---:|---:|---:|
| Harmony | 82.1 | **318.1** | 897.9 |
| Arrangement | 129.1 | **365.1** | 850.9 |
| Medium | 70.4 | **306.4** | 909.6 |
| Motion | 70.4 | **306.4** | 909.6 |

**58.7 px of spread** in the control column, because `justify-content: space-between` on four
independent flex rows has no shared track — each control starts wherever its own label ends. The
`ConfiguratorRow` slider rows immediately below, owned by glass-ui, do not have this problem. It is
visible in the committed capture
(`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/atmosphere.png`): the four
select pills have four different left edges while the sliders beneath are flush.

The fork also produces **two label grammars in one pane** — mono/uppercase/tracked for the enum rows,
sans/sentence-case for the slider rows — again visible in the same capture.

And the label is not associated with its control:

```
labelAssociated: false      // no .aurora-row-label carries for= or id=
```

The visible label is an orphan `<span>`; the accessible name is a *separate* string on the trigger
(`aria-label="Palette harmony"` vs visible "HARMONY"). `LabeledField` exists to hold exactly that
association.

### Reproduction

`node scratchpad/probe-align.mjs` (WebKit, prints the table above);
`node scratchpad/probe-tokens.mjs` (prints `labelAssociated`).

### Proposed cure

Delete `.aurora-row`/`.aurora-row-label` and the `<style scoped>` block. Each enum row becomes a
glass-ui `LabeledField` (the a11y association is the point) or, to match the sibling slider rows
exactly, a `ConfiguratorRow :label="…"`. Either choice makes the four rows share one grid track by
construction, kills the second label grammar, and removes the per-instance CSS. Nothing new is
created; both primitives already ship and one is already used ten lines away.

---

## L-6 · MAJOR — `ConfigSliderPane`'s public surface is stringly typed, so safety lives in consumers

### Evidence

`demo/scenes/ConfigSliderPane.vue:27-40`:

```ts
export interface SliderDef { key: string; label: string; min: number; max: number; step: number; }
…
const { config, sections, defaults, … } = defineProps<{
    config: Record<string, unknown>;
    …
    defaults: Record<string, unknown>;
}>();
```

Both consumers must launder their real config through `unknown` — four sites, the complete set in
the demo:

```
demo/scenes/atmosphere/AuroraPane.vue:111  :config="(atoms as unknown) as Record<string, unknown>"
demo/scenes/atmosphere/AuroraPane.vue:113  :defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
demo/scenes/blob/BlobPane.vue:124          :config="(cfg as unknown) as Record<string, unknown>"
demo/scenes/blob/BlobPane.vue:126          :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
```

And because `key: string` admits any string, dot-path validity cannot be checked at the boundary —
so `BlobPane.vue:19-45` re-invents it, per-consumer, in ~30 lines of mapped types with a comment
explaining why (*"A typo or an abrogated key fails typecheck here rather than silently no-op'ing a
slider"*).

**AuroraPane has no such guard.** Its `SECTIONS` (`AuroraPane.vue:97-106`) declares
`"colorEnergy"`, `"noise"`, `"zones.count"` as bare strings against `SliderDef.key: string`. All
three resolve today; nothing in the build would notice if one stopped.

### Mechanism

The shared module's contract is `Record<string, unknown>` + `string`, which is the type-theoretic
equivalent of no contract. Safety therefore cannot be *enforced* at the boundary — it can only be
*re-derived* by each caller, and two callers produced two different answers (one guarded, one not).
This is a shared-module public-surface defect that the consumer inherits.

### Reproduction

`grep -rn "as unknown) as Record<string, unknown>" demo` → exactly the four lines above.
Read `SliderDef.key: string` at `ConfigSliderPane.vue:28` — a `string` admits every string.

### Proposed cure

Make the pane generic over its config, and make `key` a derived path type:

```ts
// ConfigSliderPane.vue
export interface SliderDef<T> { key: NumericPath<T>; label: string; min: number; max: number; step: number }
export interface SliderSection<T> { title: string; defs: SliderDef<T>[] }
const props = defineProps<{ config: T; defaults: T; sections: SliderSection<T>[]; … }>();
```

`NumericPath<T>` — the numeric dot-path type BlobPane already wrote — moves **into** the shared
module, where it is written once and every consumer gets it. All four `as unknown as` casts
disappear, BlobPane's 30-line guard disappears, and AuroraPane gains the guard it never had. Vue
3.5's `defineProps` supports generic SFCs (`<script setup lang="ts" generic="T extends object">`), so
this is expressible today with no contrivance.

---

## L-7 · MINOR — the Select handler is typed against glass-ui's *substrate*, not glass-ui

### Evidence

`AuroraPane.vue:25`:

```ts
import type { AcceptableValue } from "reka-ui";
```

`reka-ui` is not a runtime dependency of this package — `package.json` lists it under
**devDependencies** (`"reka-ui": "^2.9"`); the sole `dependencies` entries are `@mkbabb/glass-ui` and
`@mkbabb/keyframes.js`. glass-ui wraps reka-ui and emits its **own** value type
(`dist/components/select/Select.vue.d.ts`):

```ts
export interface SelectEmits { "update:modelValue": [value: SelectionValue]; … }
// dist/components/_shared/selection.d.ts
export type SelectionValue = string | number;
```

reka-ui's is wider (`dist/index3.d.ts:231`):

```ts
type AcceptableValue = string | number | bigint | Record<string, any> | null;
```

Four demo files do this (`AuroraPane.vue:25`, `GradientVisualizer.vue:28`, `MixConfigBar.vue:15`,
`GenerateControls.vue:33`).

### Mechanism

The handler's declared domain (`bigint | Record | null` included) is strictly wider than what the
emitter can produce, and the gap is bridged by an unconditional coercion +
unchecked assertion (`AuroraPane.vue:79`):

```ts
atoms.harmony = String(v) as AuroraHarmony;
```

`String(null)` → `"null"`; `String({})` → `"[object Object]"`. Neither can occur under glass-ui's real
contract, so the coercion is a **masking fallback against an impossible case** (edict 2) — while the
case that *can* occur (`SelectionValue` includes `number`) is silently accepted: `String(3) as
AuroraHarmony` writes a garbage atom with no guard. Typing against the true `string | number` would
force that branch into the open.

There is a genuine glass-ui-side half: `SelectionValue` is **not reachable** from any public entry —
`dist/components/select/index.d.ts` re-exports `SelectItemProps`/`SelectEmits` but never
`SelectionValue`, and it appears in no top-level `dist/*.d.ts`. The correct type is currently
**unnameable** by a consumer, which is why four files reached past the design system to name it.
That is packet P-2.

### Reproduction

`grep -rn 'from "reka-ui"' demo` → the four files.
`grep -l SelectionValue node_modules/@mkbabb/glass-ui/dist/*.d.ts` → no output.

### Proposed cure

Packet P-2 (glass-ui re-exports `SelectionValue` from `./select`), then all four handlers type
against it and narrow explicitly (`typeof v === "string"`) instead of coercing.

---

## L-8 · MINOR — per-instance `h-9` reproduces the shipped `size` variant, and decouples from the token

### Evidence

`AuroraPane.vue:122, 142, 156, 170` — four identical per-instance overrides:

```html
<SelectTrigger aria-label="…" class="h-9 text-caption min-w-menu">
```

glass-ui's `SelectTrigger` ships the variant (`dist/components/select/SelectTrigger.vue.d.ts`):

```ts
/** Trigger height register. */
size?: "sm" | "default";
```

and resolves it from a design token (`dist/select-BcBAyLXA.js`):

```js
switch (n.size) { case "sm": return "h-(--control-h-sm)"; default: return "h-(--control-h-md)"; }
```

Measured live on `/#/atmosphere`:

```json
{ "--control-h-sm": "max(calc(2.25rem * 1), 0px)",
  "--control-h-md": "max(calc(2.5rem * 1), 0px)",
  "triggerRenderedHeightPx": 36,
  "triggerClassList": "… h-(--control-h-md) … h-9 text-caption min-w-menu" }
```

`h-9` = 2.25rem = 36 px — **byte-identical to what `size="sm"` already yields**, hand-written as a
literal that overrides the token in the class list. Across the demo, 12 of 12 `SelectTrigger`
instances carry a height override (`class="h-9"` ×8, `class="h-9 text-caption min-w-menu"` ×4) and
**zero** use the `size` prop.

### Mechanism / consequence

The four triggers no longer track `--control-h-sm`. A design-system retune of the control-height
scale moves every other control in the app and leaves these four at 36 px. That is edict 5
("style at the glass root component level, never per-instance overrides") with a shipped variant
sitting unused.

### Reproduction

`node scratchpad/probe-tokens.mjs`;
`grep -rhn SelectTrigger demo --include=*.vue | grep -o 'class="[^"]*"' | sort | uniq -c`.

### Proposed cure

`<SelectTrigger size="sm" aria-label="…">`. `min-w-menu` is a demo token utility
(`demo/styles/foundation.css:109`) and is legitimate; `text-caption` should ride the row primitive
(L-5) once the fork is retired, not each trigger.

---

## L-9 · MINOR — dead ternary

`AuroraPane.vue:85-91`:

```ts
function setMedium(v: AcceptableValue) {
    const kind = String(v) as AuroraMedium;
    atoms.medium = kind === "smooth" ? { kind } : { kind };   // ← both branches identical
}
```

Both arms construct the same object. The three-line comment above it explains a distinction the code
does not make. Mechanism: the discriminated-union shape (`{kind:"smooth"} | {kind:Exclude<…>,
amount?}`) was navigated by writing a branch, then the branches converged and the branch was left
standing. Reproduction: read the line. Cure: `atoms.medium = { kind }` — or, better, the branch
becomes real when L-11's `amount` knob lands.

---

## L-10 · MINOR — the atom↔control lens is hand-rolled four times, as functions not `computed`

`AuroraPane.vue:73-94` — four getter/setter pairs, one per enum:

```ts
const harmony = () => atoms.harmony ?? "analogous";
…
function setHarmony(v: AcceptableValue) { atoms.harmony = String(v) as AuroraHarmony; }
```

Two structural notes:

1. These are **plain functions invoked in the template** (`:model-value="harmony()"`,
   `{{ label(harmony()) }}` — called twice per render per row), not `computed`. Edict 7 asks for
   idiomatic Vue 3.5; a derived reactive read is `computed`. The cost is small (8 calls/render) but
   the idiom is the finding.
2. The *shape* — "read an atom with a default, write it back coerced" — is the same four times, and
   with `zones.arrangement` it also has to reconstruct the sibling (`AuroraPane.vue:81-84` re-reads
   `atoms.zones?.count ?? 4` to avoid clobbering it). That reconstruction is a hand-written lens with
   no home; it is exactly the kind of duplication a `useAtomEnum(atoms, "harmony", "analogous")`
   helper — living in the L-1 package next to the atoms it addresses — removes.

Note also that the `?? "analogous"` / `?? "composed"` / `?? "smooth"` / `?? "breathing"` fallbacks
**disagree with the shipped defaults**: `DEFAULT_AURORA_ATOMS.motion` is `"drifting"`
(`aurora-atoms.ts:62`), but the pane's fallback for an absent `motion` is `"breathing"`. A fifth
place the aurora's defaults are written down, and it is already inconsistent with the other four.

Reproduction: read `AuroraPane.vue:76` against `aurora-atoms.ts:62`.

---

## L-11 · MINOR — the textured-medium `amount` atom is structurally unreachable from the pane

glass-ui's medium atom is a discriminated pair
(`dist/components/aurora/composables/atoms.d.ts`):

```ts
export type AuroraMediumAtom = { kind: "smooth" } | { kind: Exclude<AuroraMedium,"smooth">; amount?: number };
```

`setMedium` (`AuroraPane.vue:85-91`) never writes `amount`, and no slider addresses it, so the
door's texture-amount knob has no control anywhere in the app. The pane's header claims to expose
"the ≤7-knob consumer-facing surface"; it exposes six of them. Reproduction: grep `amount` in
`demo/scenes/atmosphere/` → no hits. Cure: a conditional `Texture` slider in `SECTIONS` (revealed
when `medium.kind !== "smooth"`), which also gives L-9's dead ternary a real second branch.

---

## L-12 · INFO — the small tap targets on this route are glass-ui's, not AuroraPane's

`docs/tranches/V/megatranche/audit/visual/REPORT.json`, `safari-desktop-light /#/atmosphere`
(identical in all four matrices):

```json
"smallTapTargets": [
  { "w":160,"h":23,"tag":"input","label":"" },
  { "w":22,"h":22,"tag":"button","label":"Switch to slug" },
  { "w":22,"h":22,"tag":"button","label":"Generate new slug" },
  { "w":22,"h":22,"tag":"button","label":"Cancel" },
  { "w":12,"h":24,"tag":"span","label":"Colour Energy" },
  { "w":12,"h":24,"tag":"span","label":"Noise" },
  { "w":12,"h":24,"tag":"span","label":"Zones" } ]
```

Three of seven are the glass-ui `Slider` thumbs rendered by `ConfigSliderPane` — 12×24, below the
24×24 floor. The attribution is confirmed by `/#/blob`, which renders the same primitive many more
times and reports **39** (REPORT.md). The other four belong to the dock's slug bar, not this pane.
Everything else on the route is clean: `pageErrors 0`, `consoleErrors 0`, `overflowX 0`, `main 1`
across all four matrices. This is a glass-ui root-level fix (edicts 4+5) → packet P-3, **not** an
AuroraPane finding, and not a per-instance patch.

---

## L-13 · INFO — stale module path in a live test's header

`demo/test/glass/aurora-motion.test.ts:7` documents the default's home as
`@composables/color/aurora-atoms.ts`. That path has not existed since W43 retired the demo `@…`
aliases (`vite.config.ts:68-70`); the module is at `demo/scenes/atmosphere/aurora-atoms.ts` (the same
file's own `import` on line 26 uses the correct relative path). Harmless to the runtime, but it is a
doc-level survivor of the move that produced L-1 — the kind of residue that makes the split hard to
see. Cure: fix the comment when the module moves under the L-1 transposition.

---

## Coordination packets (glass-ui is not ours to edit this formation)

Per the standing BH/BI relay edict, three needs are producer-side and must travel as packets, not
waves:

- **P-1 — runtime aurora vocabularies.** Export `AURORA_HARMONIES`, `AURORA_MEDIA`,
  `AURORA_ARRANGEMENTS`, `AURORA_MOTIONS` as `readonly` tuples from `@mkbabb/glass-ui/aurora`, with
  `AuroraMedium` &c. **derived from them** (`(typeof AURORA_MEDIA)[number]`). Kills L-2 and the
  aurora half of L-3 at the root and makes every future producer addition a compile-time event for
  every consumer. Cite the measured drift: 7 of 10 media reachable at glass-ui 7.0.0.
- **P-2 — export `SelectionValue`** from `@mkbabb/glass-ui/select` (it is already the declared type
  of `SelectEmits["update:modelValue"]` but is unnameable by consumers). Kills L-7 and the four
  `reka-ui` reaches.
- **P-3 — Slider thumb hit area** ≥ 24×24 at the glass root (measured 12×24; 3 defects on
  `/#/atmosphere`, 39 on `/#/blob`). Root-level, not per-instance.

Related but **not** raised here: the `deriveAurora` / `deriveAuroraPalette` signature divergence
(C2, "aurora palette-blind static-Sky") is a known chronic on the disease registry and is not
re-litigated by this seat. Reduced motion is likewise not born-RED here — the rAF loop is
glass-ui-owned and verified compliant by the root.

---

## The greenfield lattice, stated concretely

If this were structured today with no legacy:

```
demo/atmosphere/                  ONE package, ONE concept, no cross-area edge
  atoms.ts                        key + defaults                       (from scenes/)
  calibration.ts                  resolveCalibratedAtmosphere          (from color-picker/boot/)
  harmony-stops.ts                the STRIP truth fn — a sibling import
  useAtmosphere.ts                the reactive owner; provides the key (from color-picker/boot/)
  AuroraPane.vue                  a view. imports ./atoms, ./harmony-stops,
                                  @mkbabb/glass-ui/{aurora,select,labeled-field},
                                  ../color-session/color-chips, ../scenes/ConfigSliderPane.vue
demo/shared/label.ts              ONE kebab→display transform (both panes)   [existing dir]
demo/scenes/ConfigSliderPane.vue  generic over T; NumericPath<T> lives here
demo/ui/                          DELETED — 19 alias barrels; consumers use glass-ui subpaths
```

Edges: `color-picker/boot → atmosphere`, `shell → atmosphere`. Both shell → feature. Both one-way.
The `color-picker <-> scenes` pair disappears from the graph script's output — that is the gate.

Net: **−19 modules** (`demo/ui/`), **−1 stylesheet block** and **−2 CSS classes** (`.aurora-row*`),
**−4** `as unknown as` casts, **−1** 30-line mapped-type guard (hoisted, not deleted), **−4** literal
vocabulary arrays (post-P-1), **−2** divergent label functions → 1, **−1** package-lattice cycle.
Nothing new is created except the one `label` module in a directory that already exists — KISS holds.
