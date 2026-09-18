# CHALLENGE-L — library structure · `PaletteColorStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier explicitly declared
at spawn. Seat declared, not inherited.

---

## Subject + scope

- Component: `demo/palettes/browser/card/PaletteColorStrip.vue` (72 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.

Findings are labelled by scope: **[C]** = in the component's own file; **[Σ]** = in the
component's dependency/consumer closure; **[A]** = area-level (`demo/palettes`) structure that
directly governs where this component lives. Out-of-closure confirmations are marked **[X]** and
carry no verdict weight for this component.

---

## 1. The complete import trace

`PaletteColorStrip.vue` has exactly **two** imports:

| line | specifier | resolves to | direction | verdict |
|---|---|---|---|---|
| `:28` | `vue` (`computed`) | framework | down | OK |
| `:29` | `import type { PaletteColor } from "../../types"` | `demo/palettes/types.ts:1` | sideways-and-up, area-internal | **defective — see L-6** |

It imports **nothing** from `@mkbabb/value.js`, nothing from `glass-ui`, nothing from `src/`.
So the narrow question "does it reach the published surface correctly?" answers *vacuously* — and
that vacuum is itself the finding (L-6: it takes a *domain* type where it needs a *paint* type).

Its three consumers:

```
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:175   import PaletteColorStrip from "../PaletteColorStrip.vue"   (intra-cluster, raw)
demo/workbenches/generate/GenerateControls.vue:16            import { PaletteColorStrip } from "../../palettes/browser/card"   (cross-area, sub-barrel)
demo/workbenches/mix/MixSourceSelector.vue:8                 import { PaletteCard, PaletteColorStrip } from "../../palettes/browser/card"   (cross-area, sub-barrel)
```

Re-export chain: `card/index.ts:8` → `browser/index.ts:23`.

---

## 2. Findings

### L-1 · BLOCKER · [Σ] The demo module-graph boundary is not enforced. All three G-DEMO rules are dead.

`demo/palettes/browser/index.ts:9–12` asserts, as the seam's contract:

> "External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces it standing."

It does not. Measured:

```
$ npx eslint --print-config demo/workbenches/generate/GenerateControls.vue | ... rules["no-restricted-imports"]
no-restricted-imports: undefined
$ npx eslint --print-config demo/palettes/browser/card/PaletteColorStrip.vue | ... rules["no-restricted-imports"]
no-restricted-imports: undefined
```

Both rule objects in `eslint.config.js` are inert, for two independent reasons:

1. **The file globs match nothing.** `eslint.config.js:232–239` scopes G-DEMO-3b to
   `demo/color-picker/**`, `demo/@/components/**`, `demo/@/lib/**`; `eslint.config.js:274–277`
   scopes G-DEMO-1/3a to `demo/@/composables/**`.
   ```
   $ ls demo/@
   ls: demo/@: No such file or directory
   ```
   The `demo/@/` tree was dissolved; the live tree is
   `demo/{palettes,workbenches,color-session,picker,platform,scenes,shared,shell,styles,ui}`.
2. **The banned specifier patterns cannot match any import.** All three ban groups key on the
   `@components` alias (`@components/custom/palette-browser/**/*.vue`,
   `@components/custom/*/composables/**`). That alias was deleted at W43/RF-15 —
   `tsconfig.demo.json:32–34`: *"the demo `@…` path aliases were killed … No `@styles`/
   `@components`/`@utils`/`@lib`/`@composables`/`@assets` project alias survives."*
   `vite.config.ts:68–74` says the same. Nothing in the tree can emit a specifier that matches.

**Consequence for this component.** The strip's public reach is enforced by nothing but comment
prose. The area is in fact reached by deep raw relative paths from five other areas today
(§L-2 table below). The stated invariant is a **false proof of encapsulation** — the most
expensive kind of structural defect, because subsequent seats read the comment and believe it.

Mechanism: *guard-rail decoupled from the tree it guards.* Reproduction: the two `--print-config`
runs above.

---

### L-2 · BLOCKER · [A] The `palettes` area has no seam. `browser/index.ts` is a sub-tree barrel wearing a top-level barrel's label.

`browser/index.ts:1` calls itself "the mega-feature's TOP-LEVEL SEAM". It is the seam for
`palettes/browser/**` only. There is no `demo/palettes/index.ts`:

```
$ ls demo/palettes/index.ts
ls: demo/palettes/index.ts: No such file or directory
```

Everything above `browser/` — `types.ts`, `usePalettePorts.ts`, `mix.ts`, `export.ts`, `utils.ts`,
`constants.ts` and 14 `use*.ts` composables — is reached raw, cross-area:

```
demo/workbenches/mix/MixPane.vue:10           ../../palettes/usePalettePorts
demo/workbenches/mix/MixPane.vue:13           ../../palettes/types
demo/workbenches/mix/MixSourceSelector.vue:6  ../../palettes/usePalettePorts
demo/workbenches/mix/MixConfigBar.vue:14      ../../palettes/mix
demo/workbenches/generate/GenerateControls.vue:21  ../../palettes/types
demo/workbenches/generate/GeneratePane.vue:6  ../../palettes/usePalettePorts
demo/workbenches/generate/GeneratePane.vue:8  ../../palettes/types
demo/workbenches/extract/ExtractPane.vue:27   ../../palettes/usePalettePorts
demo/shell/dock/Dock.vue:18                   ../../palettes/usePalettePorts
demo/shell/dock/DockViewSelect.vue:8          ../../palettes/usePalettePorts
demo/color-picker/composables/usePaletteWiring.ts:24  ../../palettes/usePalettePorts
```

Five areas (`workbenches/mix`, `workbenches/generate`, `workbenches/extract`, `shell/dock`,
`color-picker`) reach into `palettes/` internals. `shell/dock` is the **shell** reaching into a
**feature** — the wrong direction of dependency; the shell should be the lower layer and receive
ports by injection, not import the feature module that defines them.

This is the direct cause of L-6: `GenerateControls.vue:21` must import `palettes/types` purely to
satisfy the strip's over-specified prop.

Mechanism: *a barrel drawn one level below the boundary it is named for.*
Reproduction: `ls demo/palettes/index.ts` + the grep above.

---

### L-3 · BLOCKER · [Σ] The `@mkbabb/value.js` public surface is declared twice, and the two declarations have measurably drifted. The demo typechecks against a different library than it runs.

Three artefacts each claim to describe the published surface:

| artefact | keys |
|---|---|
| `package.json` `exports` (authority) | `./color ./value ./css ./easing ./math ./transform ./quantize` (7) |
| `vite.config.ts:41–50` (runtime, generated *from* `exports`) | the same 7, each → this checkout's `dist/` |
| `tsconfig.demo.json:42–49` (types, hand-written) | `.` `/color` `/parsing` `/math` `/easing` `/units` `/transform` `/quantize` (8) |

The hand-written one is wrong in four ways:

- `/parsing` and `/units` **do not exist** — not in `exports`, not in `src/subpaths/`
  (`color css easing math quantize transform value`), not in `dist/subpaths/`. Dead legacy paths.
- `.` maps to `./dist/index.d.ts`, which does not exist (`ls: dist/index.d.ts: No such file or
  directory`), and there is no `.` key in `exports` at all.
- `/value` and `/css` **exist in `exports` but have no `paths` entry** — so they fall through to
  node resolution.
- And node resolution finds a *different copy*. `@mkbabb/value.js` is not a declared dependency of
  itself, yet it is installed transitively:
  ```
  $ npm ls @mkbabb/value.js
  @mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
  ├─┬ @mkbabb/glass-ui@7.0.0
  │ └── @mkbabb/value.js@4.0.0
  └─┬ @mkbabb/keyframes.js@6.0.0
    └── @mkbabb/value.js@4.0.0 deduped
  ```

The two copies are **not identical**:

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
3,4d2
< declare type Alpha_2 = number | "none";
...
136c106
<     [S in CssColorSpace]: Color_2<S>;
---
>     [S in CssColorSpace]: Color<S>;
323,324d292
< declare type SpaceId_2 = "rgb" | "hsl" | ... | "jzazbz";
```

`value.d.ts` and `color.d.ts` are byte-identical; **`css.d.ts` is not**. The demo imports
`@mkbabb/value.js/css` in **10** places:

```
$ grep -rhn 'from "@mkbabb/value\.js[^"]*"' demo/ | grep -o '@mkbabb/value\.js[^"]*' | sort | uniq -c | sort -rn
  24 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
```

So for those 10 sites `vue-tsc -p tsconfig.demo.json` reads the **published July-17 snapshot** while
Vite serves the **working tree's build**. `vite.config.ts:28–29` states the design intent —
*"GENERATED (not hand-rolled) so the alias set can never drift from the exports map"* — and it holds
for runtime only; the type half was left hand-rolled and drifted anyway.

This is a false proof of the public API in the exact sense the challenge names: the demo's
green typecheck does not certify the library the demo runs.

Mechanism: *one surface, three hand-maintained declarations, only one of them generated.*
Reproduction: the four commands above, verbatim.

---

### L-4 · MAJOR · [C] The `weights` prop is dead, and it is a second input path for data the component already receives.

`PaletteColorStrip.vue:38–44` documents `weights?: number[]` at length. No call site passes it:

```
$ grep -rn ':weights\|weights=' demo/ --include="*.vue"
(no output)
```

Zero of three consumers. Its own JSDoc concedes the duplication — *"absent → the colors' own
`weight` fields"* — i.e. the component ships **two** channels for one datum and the second one has
never been used. The only weight producer in the tree is
`demo/workbenches/extract/composables/useExtractSession.ts:88`:

```ts
...(total > 0 ? { weight: entry.source.population / total } : {}),
```

which writes onto `PaletteColor.weight`, the *first* channel. `PaletteColor.weight`'s own doc
(`demo/palettes/types.ts:5–11`) declares the same single-channel law.

Edict 2 (no dual paths, no legacy) — direct violation. Kill the prop; there is one channel.

Mechanism: *an escape hatch kept alive past the day the through-line was drawn.*
Reproduction: the grep above.

---

### L-5 · MAJOR · [Σ] The strip's own geometry is copy-pasted into two siblings. Three homes, one number.

```
demo/palettes/browser/card/PaletteColorStrip.vue:10   'flex h-10 w-full'
demo/palettes/browser/card/PaletteCardSkeleton.vue:39 <div class="flex h-10 w-full">        <!-- "Shadow color strip" -->
demo/palettes/browser/card/ShadowPalette.vue:51       <div class="flex h-10 w-full gap-px">
```

`h-10` (2.5rem) is the strip's height. The loading skeleton and the shadow specimen each restate it
as a literal. Change the strip and the two ghosts desynchronise — a layout shift at the
loading→loaded boundary, invisible to every gate in the repo (no test asserts the three agree; no
token exists to bind them). The vertical variant restates the same number as `w-10`
(`PaletteColorStrip.vue:9`), so the geometry actually has **four** literal homes.

Note the asymmetry: the demo tokenizes far softer things (`rounded-card`, `border-card-edge`,
`text-micro`, `--skeleton-shimmer-delay`) while the one dimension three components must agree on is
a raw Tailwind scale step.

Mechanism: *a component that owns a shape but exports no token for it.*
Reproduction: the three greps above; open `/#/browse` mid-load and the ghost and the real strip are
the same height today only by coincidence of maintenance.

---

### L-6 · MAJOR · [C] The prop type is the palette *domain* type, so non-palette consumers must fabricate domain objects.

`PaletteColorStrip.vue:36` — `colors: PaletteColor[]`. `PaletteColor`
(`demo/palettes/types.ts:1–12`) carries `css`, `name?`, `position: number`, `weight?`. The strip
reads exactly two of those: `color.css` (`:19`) and `c.weight` (`:53`).

`position` is *required*, and it is meaningless to a strip. So the generate workbench mints it:

```ts
// demo/workbenches/generate/GenerateControls.vue:55–57
const stripColors = computed<PaletteColor[]>(() =>
    palette.value.map((css, i) => ({ css, position: i })),
);
```

That adapter exists solely to satisfy the type. `position: i` is a fabricated value — a generated
ramp has no persisted positions — and it forces `GenerateControls.vue:21` to import
`palettes/types` across an area boundary for a component that needs only strings.

Contrast the sibling `PreviewStrip.vue:27–30`, which takes `stops: readonly string[]` and needs no
adapter anywhere. The correct paint type for a strip is `readonly {css: string; weight?: number}[]`
at most — and honestly `readonly string[]` plus an optional parallel weights array, or a single
pre-computed gradient.

This is the ownership inversion the challenge asks for: a **presentational** component
imports the **domain** vocabulary, so the domain leaks into every feature that wants a coloured bar.

Mechanism: *prop typed by where the data usually comes from, not by what the component consumes.*
Reproduction: `GenerateControls.vue:55–57` is the reproduction — the adapter is the artefact.

---

### L-7 · MAJOR · [Σ] The corner radius is owned by the caller — three call sites, three different mechanisms, and one of them breaks a rule the card discovered.

The strip declares only `overflow-hidden` (`:7`). It has no `radius`/`shape` concept. Every consumer
supplies the corner itself, differently:

| call site | mechanism |
|---|---|
| `PaletteCard.vue:33–37` | passes `:class="layout === 'aside' ? 'rounded-l-card' : 'rounded-t-card'"` — **strip clips** |
| `GenerateControls.vue:135` | passes `class="rounded-t-card"` — **strip clips** |
| `MixSourceSelector.vue:200` | wraps in `<div class="rounded-card border border-border/30 overflow-hidden">` — **parent clips**, strip gets nothing |

`PaletteCard.vue:16–18` states why the third mechanism is wrong:

> "NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip rasterizes 1-bit at
> compositing-layer bounds; the strip clips its OWN corners below — an interior clip keeps normal AA."

Two defects fall out of that one comment:

1. **The rule is encoded nowhere but in a consumer's comment**, so a sibling consumer
   (`MixSourceSelector.vue:200`) does the banned parent-clip and nothing catches it. A hard-won
   rendering law survives as prose in the wrong file.
2. **The comment is false about this component**: "the strip clips its OWN corners" — it does not.
   It clips (`overflow-hidden`) but the *radius* arrives from outside as a fall-through class. The
   strip owns half a concept.

Edict 5 (root-level styling, never per-instance overrides) — three per-instance overrides of the
same property. Visual confirmation that the pass-through path does render as intended in one case:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/generate.png`, strip top-left
corner at native `(430,630)+520×160` — rounded, correct. The finding is not that it looks wrong
here; it is that correctness is re-established by hand at every call site.

Mechanism: *a component owning the clip but not the shape.*
Reproduction: the three call sites above.

---

### L-8 · MAJOR · [A] `demo/palettes/export.ts` vs `demo/palettes/export/` — a self-documented legacy dual path, and the *contract* half is reachable only from a test.

The named suspect is confirmed alive, and worse than "duplicated". `export/serializers.ts:5–9`
declares the split in its own header:

> "This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`; the byte-exact set is
> addressed by its explicit paths here so the two never collide."

Liveness measured:

```
$ grep -rn 'from "\./export"' demo/
demo/palettes/usePaletteExport.ts:9:} from "./export";          # → the LEGACY 132-line module

$ grep -rn 'palettes/export/serializers' demo/
demo/test/export/byte-exact.test.ts:23                          # → the ONLY consumer
```

and the legacy path is what the application runs, from the strip's own two host panes:

```
demo/palettes/BrowsePane.vue:198   import { usePaletteExport } from "./usePaletteExport";
demo/palettes/PalettesPane.vue:152 import { usePaletteExport } from "./usePaletteExport";
```

`wc -l` on the two homes: legacy `export.ts` = 132 lines; `export/` = 12 modules, 914 lines
(`bytes canonical css digest json png reload rfc8785 serializers svg tailwind types`). So ~900 lines
of the ratified `PALETTE-CONTRACT` byte-exact serializer set is **dead in production**, green in CI,
and the ad-hoc pre-contract exporter is what a user downloads. A test suite proving the wrong
module.

Edict 2 — the clearest violation in the area. Scope note: not in `PaletteColorStrip`'s import
closure, but in its area and reached from both panes that host it.

Mechanism: *a replacement landed beside the incumbent instead of over it; the switchover ("W50")
never fired, and the naming was contorted to let both live.*
Reproduction: the two greps above.

---

### L-9 · MAJOR · [Σ] Four parallel implementations of "render a palette compactly", four truncation policies, two of them imported into the *same file*.

| implementation | segments | truncation policy | geometry | input type |
|---|---|---|---|---|
| `palettes/browser/card/PaletteColorStrip.vue` | n flex children | none; 8% floor, then overflow past n=200 | `h-10`/`w-10` | `PaletteColor[]` |
| `color-session/color-chips/PreviewStrip.vue` | n flex children | **cap 7 + `mask-image` fade** (`:25`, `:73–75`) | `2.618rem × 1em` | `readonly string[]` |
| `color-session/color-chips/PreviewRamp.vue` | **one** element, `linear-gradient` (`:24–26`) | none (continuous) | `2.618rem × 1em` | `readonly string[]` |
| `palettes/browser/admin/AdminFlaggedPanel.vue:53–59` | overlapping dots | `.slice(0, 5)`, silent | `h-5 w-5` | `PaletteColor[]` |
| `palettes/browser/dialog/VersionHistoryDrawer.vue:51–63` | overlapping dots | `.slice(0, 8)` + `+{{ n-8 }}` | `h-5 w-5` | `PaletteColor[]` |

Five, in fact. The dual path is not hypothetical — **`GenerateControls.vue` imports two of them**:

```
demo/workbenches/generate/GenerateControls.vue:16  import { PaletteColorStrip } from "../../palettes/browser/card";
demo/workbenches/generate/GenerateControls.vue:20  import { PreviewStrip } from "../../color-session/color-chips";
...:135  <PaletteColorStrip :colors="stripColors" class="rounded-t-card" />
...:245  <PreviewStrip :stops="presetStops(p)" />
...:274  <PreviewStrip :stops="harmonyStops(h)" />
```

One file, one screen, two components that both paint "a list of CSS colours as contiguous hard
bands", with incompatible input types, incompatible overflow behaviour and incompatible geometry.
`color-chips/index.ts:2–4` even claims its own uniqueness — *"ONE focused common module for the
multi-feature chip grammar, never a per-pane copy"* — while being the second copy.

Additionally the CSS class `.preview-chip` is defined twice, divergently, in the two chip SFCs
(`PreviewStrip.vue:56–65` `display:inline-flex` vs `PreviewRamp.vue:39–45` `display:inline-block`) —
same name, two bodies, kept apart only by `scoped`.

Mechanism: *one concept, five homes, because no home was ever named.*
Reproduction: the import pair at `GenerateControls.vue:16,20`.

---

### L-10 · MINOR · [C] `WEIGHT_FLOOR = 0.08` is documented as an 8% floor and does not deliver 8%.

`PaletteColorStrip.vue:47–48` — *"The 8% legibility floor for weighted segments."* The floor is
applied to the *pre-normalised* share (`:63–65`) and then the whole vector is renormalised
(`:66–67`), which dilutes every floored segment by `1/flooredTotal`. Measured, replaying the exact
expression at the extract workbench's own k-max of 16 (`ExtractControls.vue:29` `:max="16"`) with one
dominant cluster:

```
n=16 weighted -> min segment %: 3.889   (named floor claims 8)
sum: 100.000
```

The delivered floor is `0.08 / flooredTotal`, i.e. it shrinks as n grows — at n=16 it is 3.889%, not
8%. The constant is a named taste knob whose name is not true of its behaviour, which is exactly the
failure mode naming a constant is supposed to prevent.

Ownership note: "floor a normalised distribution, then renormalise" is pure numerics with an
off-by-a-renormalisation bug. It has no business inside an SFC `computed`; `src/quantize.ts` already
owns the population side (`:126` emits `population: number`) and is the natural home for the
share-with-floor transform — one home, testable, shared by every future consumer.

Mechanism: *pure math living in a template, therefore untested.*
Reproduction: `node` replay of lines 50–71 with `weights = [900, 10×15]`, output pasted above.

---

### L-11 · MINOR (hypothesis on reachability) · [C] The unweighted path can sum past 100% and `overflow-hidden` silently eats the tail.

`PaletteColorStrip.vue:70` — `return colors.map(() => Math.max(100 / n, 0.5));` — is the only branch
that is **not** renormalised (the weighted branch at `:66–67` is). Measured:

```
n=50  seg%=2.0000 total=100.00
n=200 seg%=0.5000 total=100.00
n=201 seg%=0.5000 total=100.50
n=256 seg%=0.5000 total=128.00
```

Past n=200 the children (`shrink-0`, `:16`) exceed the track and the root's `overflow-hidden` (`:7`)
clips them. Colours vanish with no signal — the opposite of `PreviewStrip`'s honest fade
(`PreviewStrip.vue:73–75`).

**Labelled a hypothesis for UI reachability**: the API caps a palette at 50 colours
(`api/src/modules/palette/schema.ts:33` — `z.array(colorEntrySchema).min(1).max(50)`) and the
extract k-slider maxes at 16, so I could not reach n>200 through the running UI. Local palettes
(`isLocal`) are not schema-validated, and the component's own prop contract admits any n. This is a
contract defect regardless of today's reachability; it is also the finding already named in
`docs/tranches/V/megatranche/AUDIT-HANDOFF-2026-07-28.md:482,493`.

Mechanism: *a per-segment minimum without a global renormalisation.*

---

### L-12 · MINOR · [C] `weights = undefined` in the props destructure is a no-op.

`PaletteColorStrip.vue:34` — `weights = undefined` as a destructure default does nothing an absent
default would not do, and it makes the prop look defaulted when it is not. Cosmetic, but it is
inside the reactive-props-destructure surface that edict 7 governs, and it dies with L-4 anyway.

---

### L-13 · INFO · [X] Out-of-closure suspects, confirmed alive

Verified for the record; **no weight against this component**:

- `demo/shell/dock/layers/ActionBarLayer.vue:54,63,86` — a locally re-declared `useLayerTransition`
  after Glass 7 removed the standalone export. Confirmed alive.
- `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76` and
  `useMarkdownColors.ts:16` — both self-document "one of three parallel dark stores" / "parallel
  stores raced the initial scheme resolution". Confirmed alive.

---

## 3. What I checked and found sound

Recording the negatives explicitly, since a structural verdict is only as good as its coverage.

- **`verbatimModuleSyntax` (edict 8)** — `PaletteColorStrip.vue:29` is `import type`. Correct. The
  file's only other import is a value import of `computed`. Clean.
- **Vue 3.5 idiom (edict 7)** — `:31–45` uses reactive props destructure with defaults, not
  `withDefaults(defineProps())`. Correct, and *better* than its own parent
  (`PaletteCard.vue:182–196` still uses `withDefaults`).
- **God module (edict 1)** — 72 lines, one computed, one constant, zero side effects. Not a god
  module, and it does not add to one.
- **Deep-path reach into `src/`** — none. The demo tree carries no `@src/*` import outside the
  exempt `assets/docs/*.md` reference pages. The T.W1 dogfood keystone holds at the *specifier*
  level; L-3 is a defect in the *type resolution* of those specifiers, not in the specifiers.
- **glass-ui boundary (edict 4)** — the strip imports nothing from `demo/ui/` and defines no
  design-system primitive locally. Nothing is smuggled into `demo/ui/`. (What it *should* do is
  §4 below, but it commits no violation today.)
- **Animations (edict 6)** — the component has no `<style>` block and no keyframes; nothing was
  deleted. It also has no transition on colour change, which is a design question, not a structural
  one.
- **Barrel hygiene** — `card/index.ts` and `browser/index.ts` are named re-exports only, per the
  PI-6 rule they cite; no star re-export. Correct, and the stated tree-shaking rationale holds.
- **Route health** — `/#/palettes` and `/#/browse` show `pageErr 0`, `consoleErr 0`, `overflowX 0`
  in all four Safari matrices
  (`docs/tranches/V/megatranche/audit/visual/REPORT.md:120–121,135–136,150–151,165–166`). The strip
  renders correctly where it appears (`shots/safari-desktop-light/generate.png`, cropped and
  inspected at 4×). No visual defect attributable to this component was found.

---

## 4. Greenfield: the module lattice I would build

Stated concretely, as asked, with no hedging.

### 4.1 The primitive is one element, not n

`PreviewRamp.vue:24–26` already contains the right idiom, in this repo, today:

```ts
const gradient = computed(() => `linear-gradient(90deg, ${stops.join(", ")})`);
```

A proportional hard-band strip is the *hard-stop* form of exactly that:

```ts
// bands: [{css, share}] with Σshare === 1
let acc = 0;
const stops = bands.flatMap(b => {
    const a = acc, z = (acc += b.share);
    return [`${b.css} ${a * 100}%`, `${b.css} ${z * 100}%`];
});
const paint = `linear-gradient(${angle}, ${stops.join(",")})`;
```

This is not a micro-optimisation, it is a structural cure:

- **n DOM nodes → 1.** A 50-colour card drops 50 elements and 50 style objects per card, ×N cards
  per grid. The strip is currently the highest node-count child of `PaletteCard`.
- **L-11 becomes unrepresentable.** Cumulative stops cannot exceed 100% by construction; there is no
  overflow branch to get wrong, and no `overflow-hidden` needed to hide the mistake.
- **It becomes interpolable.** One `background-image` is a single animatable property — palette
  cross-fades, weight re-balancing, and the missing colour-change transition all become free.
- **`smooth` mode falls out for nothing.** Emit single stops instead of doubled ones and the same
  primitive is `PreviewRamp`. One component replaces two.
- **Truncation becomes a policy argument**, not a fork: `truncate: {at: number, mode: "fade" |
  "count"}` covers `PreviewStrip`'s cap-7-fade and `VersionHistoryDrawer`'s `+N` in one place, with
  the honest-signal behaviour as the default rather than the silent clip.

### 4.2 Where each piece lives

```
@mkbabb/glass-ui  ./color-band                 ← THE primitive (new subpath, glass-ui's job per edict 4)
  <ColorBand
     :bands="readonly {css: string; share?: number}[]"
     mode="hard" | "smooth"
     orientation="inline" | "block"
     :truncate="{at, mode} | undefined"
     size="chip" | "strip"            ← the token binding; kills L-5's four literals
  />
  — decorative by construction (aria-hidden), radius from `--radius-*` on the ROOT (kills L-7),
    zero domain vocabulary (kills L-6).

@mkbabb/value.js  /quantize            ← `weightedShares(populations, {floor})`
  the floor+renormalise transform, pure, unit-tested, correct (kills L-10);
  sits beside `quantizePixels`, which already owns `population`.

demo/palettes/index.ts                 ← THE area seam (does not exist today; kills L-2)
  export type { Palette, PaletteColor, ... }
  export { LIBRARY_PORT_KEY, SESSION_PORT_KEY, COLOR_TARGET_PORT_KEY, ... }
  export { PaletteCard, PaletteCardGrid, ... }
  and NOTHING may reach past it.

demo/palettes/browser/card/PaletteCard.vue
  <ColorBand :bands="palette.colors" :orientation="layout === 'aside' ? 'block' : 'inline'" size="strip" />
  — PaletteColorStrip.vue is DELETED. It has no residue: a 72-line adapter whose
    every line is either the primitive's job or the library's.

demo/palettes/export/                  ← the ONLY export home; export.ts DELETED,
  usePaletteExport routed onto serializers (kills L-8)
```

Direction of dependency, top to bottom, no back-edges:
`glass-ui → value.js` · `demo/shared → glass-ui, value.js` · `demo/<area> → demo/shared` ·
`demo/shell → demo/shared` **only** (`shell/dock` stops importing `palettes/usePalettePorts`;
ports are provided at the app root and *injected* into the dock).

### 4.3 Make the boundary real

L-1's dead rules are re-pointed at the tree that exists — one `no-restricted-imports` object per
area, banning `**/<other-area>/**` except the area's own `index.ts`, plus a ban on any relative
import that climbs more than one `../` out of an area. And the value.js `paths` block in
`tsconfig.demo.json` stops being hand-written: it is generated from `package.json#exports` by the
same code path `vite.config.ts:41–50` already uses, so L-3 cannot recur. One generator, one
surface, one truth.

---

## 5. Verdict

**DEFECTIVE.** Thirteen findings; three blockers.

The component itself is small and mostly idiomatic — its own file contributes L-4, L-6, L-10, L-11,
L-12, none of them fatal. What is structurally broken is everything around it: the boundary that is
supposed to protect its seam is inert (L-1), the seam is drawn one level too low (L-2), the library
surface it sits above is declared twice and has drifted (L-3), and the concept it implements has
five homes (L-9) with its geometry copy-pasted into two more (L-5).

The strongest single defect is **L-3** — the demo typechecks `@mkbabb/value.js/css` against a
transitively-installed published snapshot while Vite serves the working tree, and the two `.d.ts`
files measurably differ. Every green typecheck in this repo's demo program is, for those ten import
sites, a proof about the wrong library.
