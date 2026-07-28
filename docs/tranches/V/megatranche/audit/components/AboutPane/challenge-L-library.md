# CHALLENGE-L — library structure · `demo/scenes/about/AboutPane.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier my seat was
explicitly spawned with. Declared, not inherited.

---

## Scope, method, and the verdict up front

**Subject**: `demo/scenes/about/AboutPane.vue` (100 lines) and its full first-order dependency
closure. Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

**Method**: every import traced to its physical home; the published surface (`package.json#exports`
+ `src/subpaths/`) compared against what the demo program actually resolves (`tsc
--traceResolution`); the type-laundering cast isolated and re-run under `tsc` standalone; the live
dev server at `http://localhost:9000` driven read-only with isolated Chromium **and** WebKit
(the shared MCP browser was locked by another seat, so I drove `@playwright/test` directly).

**Verdict: DEFECTIVE.** The premise holds. The component's own 100 lines are not the problem —
the problem is that AboutPane sits at the junction of **four** distinct structural faults, and it
is the only component in the repository that touches all four. Two of them are reproduced live
below with screenshots: **7 of the 18 states this pane can be put into are degraded, and 5 of
those render factually false content under a correct heading.**

The strongest single finding is **L-1/L-2 as one mechanism**: the pane renders three
hand-maintained enumerations of the *same* concept — the color-space set — at three different
cardinalities (18 / 13 / 11), side by side on one page, with a cast and a fallback installed to
suppress the compiler errors that would otherwise have caught the divergence at build time. The
repo already owns the correct mechanism (`satisfies Record<SpaceId, …>`), one module away, in the
file AboutPane's own sibling imports.

---

## 1. The import trace

Every import in `AboutPane.vue:62-93`, resolved to its home.

| # | Specifier (AboutPane.vue) | Physical home | Crosses a boundary? |
|---|---|---|---|
| 1 | `vue` (`:66`) | `node_modules/vue` | no |
| 2 | `../../ui/separator` (`:67`) | `demo/ui/separator/index.ts` → **re-export of `@mkbabb/glass-ui`** | **YES — L-4** |
| 3 | `../../ui/card` (`:68`) | `demo/ui/card/index.ts` → **re-export of `@mkbabb/glass-ui`** | **YES — L-4** |
| 4 | `../../shared/ui/PaneHeader.vue` (`:69`) | `demo/shared/ui/PaneHeader.vue` (10 consumers) | no — legitimate shared home |
| 5 | `./ColorNutritionLabel.vue` (`:70`) | sibling, sole consumer | no |
| 6 | `../../color-session/color-model` (`:71,72`) | `demo/color-session/color-model.ts` | no — feature → domain, correct direction |
| 7 | `../../color-session/ColorSpaceSelector.vue` (`:73`) | `demo/color-session/` | no |
| 8 | `./markdown` (`:74,75`) | `demo/scenes/about/markdown/index.ts` | no |
| 9 | `../../../assets/docs/*.md` × 11 (`:82-92`) | **`<repo-root>/assets/docs/` — outside `demo/`** | **YES — L-9** |

Second-order, inside the closure:

| Edge | Home | Boundary |
|---|---|---|
| `Markdown.vue:37-38` → `../../../styles/foundation.css`, `utils.css` | `demo/styles/` (shell-owned globals) | **YES — L-6** |
| `assets/docs/*.md:2` → `../../demo/scenes/about/katex` | back **into** `demo/`, all 11 files | **YES — L-9 (cycle)** |
| `useMarkdownColors.ts:3,4` → `@mkbabb/value.js/color`, `/css` | published subpaths | no — **correct** |
| `picker-color.ts:20-34` → `@mkbabb/value.js/color`, `/css` | published subpaths | no — **correct** |
| `usePaneRouter.ts:146-152` → AboutPane's private prop shape | `demo/shell/` | **YES — L-7 (shell knows a leaf's props)** |

---

## 2. Findings

### L-1 — MAJOR · REPRODUCED · masking fallback renders RGB's facts under five other spaces' names

**Defect.** `ColorNutritionLabel.vue:210-215`:

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;          // ← the masking fallback
});
```

`colorSpaceInfo` (`demo/color-session/colorSpaceInfo.ts`) has **13** keys — `rgb` `:18`, `hsl` `:41`,
`hsv` `:68`, `hwb` `:93`, `lab` `:115`, `lch` `:142`, `oklab` `:162`, `oklch` `:188`, `xyz` `:209`,
`kelvin` `:240`, `ictcp` `:261`, `jzazbz` `:287`, `hex` `:313`. The selector offers **18**
(`ColorSpaceSelector.vue:150`, `Object.entries(DISPLAY_COLOR_SPACE_NAMES)`; `DisplayColorSpace =
PickerSpace | "hex"`, `color-model.ts:29`, over the 17 `SpaceId`s at `picker-color.ts:72-90`).

The five missing keys are `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`. For all
five, the fallback silently substitutes **RGB's row** and the page states RGB's facts under the
other space's title.

**Reproduction** (`scratchpad/probe2.mjs`, Chromium 1600×1100, `http://localhost:9000/`):

```
=== after selecting Display P3 ===
 "selectorLabel": "Display P3",
 "nutritionName": [
  "About the color spaces, ", "Display P3", "",
  "The math, the science, the art, the beauty of color spaces.", "",
  "Definition",
  "A color space based on the additive mixture of red, green, and blue light.",
  "Basic Information",
  "Device Dependency:", "Device-dependent",
  "White Point:",      "Varies (typically D65)",
  "Gamut:",            "Limited (device-specific)"
 ],
```

Every one of those four rows is false for Display P3, which is a **wide-gamut, D65,
device-independent** space (created 2010/2015, not 1931 as the `Created:` row shows). The
Conversion Graph beneath renders `RGB → XYZ`, `RGB → Kelvin`, `RGB → HSL`, `RGB → Hex`.

Screenshots: `scratchpad/about-Display-P3.png`, `scratchpad/about-p3-bottom.png` (viewed; the
"Display P3" title sits directly above RGB's definition, and the RGB conversion chips are visible
under the heading).

**Mechanism.** A partial lookup table with an unconstrained key type, plus a fallback branch that
converts "no data" into "wrong data". Owner edict 2 forbids masking fallbacks; this is the
canonical instance — it does not degrade, it lies.

**Cure.** Delete the fallback and make the table total. `picker-color.ts:70` already shows the
mechanism this repo owns:

```ts
export const PICKER_CHANNELS = Object.freeze({ … } satisfies Record<SpaceId, readonly ChannelMeta[]>);
```

`PICKER_CHANNELS` is complete over all 17 spaces *because the compiler enforces it*.
`colorSpaceInfo` ends `} as const;` (`colorSpaceInfo.ts:334`) with no constraint at all. Changing
`as const` → `satisfies Record<DisplayColorSpace, SpaceFacts>` turns this into a build error and
forces the five missing rows to be written. Then `currentColorSpaceInfo` is a plain total lookup
with no branch.

---

### L-2 — MAJOR · REPRODUCED · a private duplicate union + a cast erase the domain, and 7 of 18 states lose the Detailed Guide

**Defect.** `AboutPane.vue:79-98`:

```ts
type MarkdownSpace = "rgb" | "hex" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "kelvin";   // :79 — 11 members
const markdownModules: Record<MarkdownSpace, DocModule> = { … };                                                     // :81-93
const activeMarkdownModule = computed(() =>
    markdownModules[model.value.selectedColorSpace as MarkdownSpace],                                                 // :97 — the cast
);
```

`MarkdownSpace` is a **second, private, hand-written enumeration** of a concept that already has a
name — `DisplayColorSpace` (`color-model.ts:29`). It is 11 members against that type's 18. The cast
at `:97` is the only thing that lets the two meet.

**The cast is exactly load-bearing.** Standalone `tsc` probe (`scratchpad/tscast/probe.ts`,
`--strict --noUncheckedIndexedAccess --target ES2022 --module ESNext --moduleResolution bundler`),
replicating the shipped shapes:

```
probe.ts(17,28): error TS7053: Element implicitly has an 'any' type because expression of type
  'DisplayColorSpace' can't be used to index type 'Record<MarkdownSpace, DocModule>'.
  Property 'display-p3' does not exist on type 'Record<MarkdownSpace, DocModule>'.
probe.ts(22,3): error TS1360: Type '{ rgb: …; hex: … }' does not satisfy the expected type
  'Record<DisplayColorSpace, DocModule>'.
  … is missing the following properties: "display-p3", rec2020, hsl, hsv, and 12 more.
```

Line 17 is the cast removed; line 22 is the `satisfies` cure. The compiler names the exact missing
member. **`as MarkdownSpace` suppresses TS7053 and nothing else.**

**Runtime consequence.** `markdownModules[…]` returns `undefined` for the 7 unlisted spaces
(`srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `ictcp`, `jzazbz`), and
`AboutPane.vue:51` `v-if="activeMarkdownModule"` deletes the `<Markdown>` element — but the
`<h2>Detailed Guide</h2>` at `:50` is **outside** the `v-if`. The user gets a section heading with
nothing under it.

**Reproduction** (same probe):

```
=== after selecting Display P3 ===   hasDetailedGuide: true, hasMarkdownBody: false, hasOhSnap: false
=== after selecting Jzazbz ===       hasDetailedGuide: true, hasMarkdownBody: false, hasOhSnap: false
```

and, scrolled to the card foot (`scratchpad/probe3.mjs`):

```
h2s: ["Basic Information","Components","Key Properties","Conversion Graph","Usage","Detailed Guide"]
tailText: "… Industries: Digital media, Entertainment, Gaming\nDetailed Guide"
```

The card's text ends on the heading. Screenshot `scratchpad/about-p3-bottom.png` shows ~90px of
dead space beneath "Detailed Guide", terminating the card.

**Compounding: the designed error state is unreachable dead code.** `Markdown.vue:19-30` ships a
purpose-built branch for precisely this case —

```html
<AlertTitle class="font-display text-heading">Oh snap...</AlertTitle>
<AlertDescription>We couldn't find the documentation for the selected color space.</AlertDescription>
```

— and AboutPane is `Markdown`'s **sole consumer** (`grep` for `{ Markdown }` / `markdown/Markdown`
across `demo/` returns only `AboutPane.vue:70,71`). Because the `v-if` gates the component out
before it can mount, `hasOhSnap: false` in both reproductions. A designed, styled, three-voice-law-
compliant error state that can never fire is dead code by construction (edict 2).

**Cure.** Delete `MarkdownSpace` and the cast; declare
`satisfies Record<DisplayColorSpace, DocModule>`; write the 7 missing guides (or, if some spaces
genuinely warrant no long-form guide, make that an explicit `null` in a total
`Record<DisplayColorSpace, DocModule | null>` so the absence is a *decision the compiler saw*, and
let `Markdown`'s own Alert own the empty case by moving the `v-if` off the heading).

---

### L-3 — MAJOR · one concept, three enumerations, two homes, three cardinalities

The color-space set is enumerated independently in three places that AboutPane renders **on one
screen**:

| Table | File:line | Cardinality | Totality mechanism |
|---|---|---|---|
| `PICKER_SPACE_NAMES` → `DISPLAY_COLOR_SPACE_NAMES` | `picker-color.ts:72-90` → `color-model.ts:75-78` | **18** (17 + `hex`) | `Readonly<Record<SpaceId,string>>` — **enforced** |
| `PICKER_CHANNELS` | `picker-color.ts:52-70` | **17** | `satisfies Record<SpaceId, …>` — **enforced** |
| `colorSpaceInfo` | `colorSpaceInfo.ts:18-334` | **13** | `as const` — **none** |
| `markdownModules` | `AboutPane.vue:81-93` | **11** | `Record<MarkdownSpace,…>` over a private union — **none** |

Two of the four are compiler-total; the two AboutPane owns are not. Unique semantic ownership —
exactly one home per concept — is violated twice over: `colorSpaceInfo.ts` (structured facts) and
`assets/docs/*.md` (prose guide) are both "the documentation of a color space", they live in
different trees, neither knows the other exists, and they disagree about which spaces exist.

`colorSpaceInfo.ts`'s own header comment asserts the invariant it breaks: *"Keys cover the
`DisplayColorSpace` union"* (`:14-15`). It covers 13 of 18.

**Ruling on where this belongs** (asked explicitly by the brief): **not** in `src/`. `SpaceId` is a
library type, but 334 lines of English prose plus 11 markdown guides are not the business of a
package described as *"Immutable, failure-explicit CSS color, value, easing, transform, math, and
quantization capabilities"*, and shipping them would tax every consumer. The correct home is the
demo, **keyed by the library's type with a totality constraint** — the demo pays for the prose, the
library supplies the domain, and the compiler joins them.

---

### L-4 — MAJOR · `demo/ui/` is 19 modules of pure aliasing over the design system

`demo/ui/` contains 19 directories. **Every one holds exactly one file, `index.ts`, and every one is
a bare re-export of `@mkbabb/glass-ui`.** Measured:

```
$ for d in demo/ui/*/; do echo "$(basename $d): $(ls $d)"; done
alert: index.ts     avatar: index.ts    badge: index.ts     button: index.ts
card: index.ts      checkbox: index.ts  collapsible: index.ts  dialog: index.ts
dropdown-menu: index.ts  input: index.ts  label: index.ts    popover: index.ts
radio-group: index.ts    select: index.ts  separator: index.ts  skeleton: index.ts
slider: index.ts    switch: index.ts    tooltip: index.ts
```

```ts
// demo/ui/card/index.ts — the entire file
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
// demo/ui/separator/index.ts — the entire file
export { Separator } from "@mkbabb/glass-ui";
```

Zero local components. Zero variants. Zero wrapping. `demo/ui/alert/index.ts`'s own comment records
that its local shadcn re-implementation was already deleted — the *directory* was kept.

AboutPane crosses this layer twice (`:67,68`); its closure crosses it five more times
(`ColorNutritionLabel.vue:173,175-179,181`, `Markdown.vue:35,36`, `ColorSpaceSelector.vue:109`).

**Both edicts 2 and 4 are violated by the same 19 files.** Edict 2 forbids aliases; a one-line
re-export *is* an alias. Edict 4 says glass-ui is the design system — but no component in the demo
imports the design system by name. They import a shadow namespace that shadows it. The indirection
also silently defeats the reason edict 4 exists: a reader of `AboutPane.vue:67` cannot tell that
`Separator` is a glass-ui primitive, so the pressure to add variants *in glass-ui* never lands.

**Cure.** Delete `demo/ui/` in full; rewrite the ~60 import sites to `@mkbabb/glass-ui` (and
`@mkbabb/glass-ui/forms` for `Input`). This is mechanical, removes 19 modules, and makes the design
system visible at every call site. It is out of AboutPane's scope alone — it is a tranche wave —
but AboutPane cannot be called structurally sound while it depends on it.

---

### L-5 — MAJOR · the demo program declares a public API that does not exist, and it is not the one it resolves

`tsconfig.demo.json:31-50` hand-rolls a `paths` map for the value.js published surface. Compared
against the real `package.json#exports`:

| Key | in `package.json#exports` | in `tsconfig.demo.json paths` | file on disk |
|---|---|---|---|
| `.` (bare) | **no** | **yes** `:42` → `./dist/index.d.ts` | **absent** |
| `./color` | yes | yes `:43` | present |
| `./value` | yes | **no** | present |
| `./css` | yes | **no** | present |
| `./parsing` | **no** | **yes** `:44` | **absent** |
| `./units` | **no** | **yes** `:47` | **absent** |
| `./math` `./easing` `./transform` `./quantize` | yes | yes | present |

Verified: `ls dist/index.d.ts` → absent; `ls dist/subpaths/` → `color css easing math quantize
transform value` only (no `parsing.d.ts`, no `units.d.ts`).

The header comment at `tsconfig.demo.json:4-8` states the demo *"speaks only the 8 public keys"* and
names them as `@mkbabb/value.js` + `{color,parsing,math,easing,units,transform,quantize}`. **Three of
those eight are not published and cannot be written by any real consumer.** That is precisely the
"false proof of the public API" this challenge names — the documented surface is fiction, and the
config that documents it is a second, hand-maintained source of truth for a map that
`vite.config.ts:53-60` explicitly generates *because* hand-rolling drifts:

> `// GENERATED (not hand-rolled) so the alias set can never drift from the exports map`

The generated half didn't drift. The hand-rolled half did.

**And the `paths` block is not what actually resolves the demo's imports.** `tsc -p
tsconfig.demo.json --traceResolution` on `@mkbabb/value.js/css` (10 demo imports; two inside
AboutPane's closure — `useMarkdownColors.ts:4`, `picker-color.ts:28-34`):

```
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '…/demo/color-session/package.json' does not exist.
File '…/demo/package.json' does not exist.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
======== … successfully resolved … with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`/css` — which has **no** `paths` entry — resolves correctly by **package self-reference through the
real `exports` map**, i.e. exactly the way an external consumer resolves it. This is the ideal
posture and it already works. It makes the five overlapping `paths` entries redundant and the three
bogus ones the only entries that change behaviour — all three toward files that do not exist.

**Cure (architectural transposition, not a patch).** Delete all eight `@mkbabb/value.js*` entries
from `tsconfig.demo.json`. Package self-reference then resolves the demo's types from the one
`exports` map that `vite.config.ts` already generates its runtime aliases from — **one source of
truth for the published surface, in both programs, dogfooded exactly as a consumer sees it.** Adding
or renaming a subpath then propagates to types and runtime automatically, and an unpublished
specifier fails loudly instead of resolving to a path that isn't there.

*(Related, INFO:* `node_modules/@mkbabb/value.js` is a real installed 4.0.0 tarball — npm auto-installs it because glass-ui@7 declares `"@mkbabb/value.js":"^4.0.0"` as a peer. It is **stale**: `stat` gives `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` inode 211668623 mtime *Jul 17 21:10* vs `dist/subpaths/css.d.ts` inode 229536321 mtime *Jul 27 11:52* — ten days apart, distinct files. The vite self-alias masks it at runtime, and vite.config.ts:50 asserts *"a package does not install itself"*, which is false here. Load-bearing but currently correct; noted because the historical prefix-rewrite bug documented at `vite.config.ts:36-46` is exactly the failure mode where this stale copy would be served silently instead of erroring.)*

---

### L-6 — MINOR · the only component in the demo that runtime-imports the shell's global stylesheets

`Markdown.vue:37-38`:

```ts
import "../../../styles/foundation.css";
import "../../../styles/utils.css";
```

Both files are already imported at the application root — `App.vue:199-200`:

```ts
import "../styles/utils.css";
import "../styles/foundation.css";
```

A repo-wide grep for these two filenames returns **17 other component references, and every single
one is `@reference`** (Tailwind's compile-time directive, which emits nothing) — including
`Markdown.vue:79` itself, which already carries the correct `@reference
"../../../styles/foundation.css"`. Markdown.vue is the sole component performing a *runtime* import,
and it duplicates the App-level import exactly.

**Mechanism.** Leaf → shell boundary crossing. Global style ownership belongs to the app root; a
component three levels inside a lazily-loaded pane must not re-declare it. Because AboutPane is
`defineAsyncComponent`-loaded (`usePaneRouter.ts:69`), these two side-effect imports are pulled into
the About async chunk's dependency graph.

**Cure.** Delete `Markdown.vue:37-38`. The `@reference` at `:79` is what the scoped `@apply` rules
actually need.

---

### L-7 — MINOR · AboutPane is the last prop-drilled pane in a shell that transposed to ambient injection, and the two paths disagree

`usePaneRouter.ts:146-152` hand-builds AboutPane's props inside an untyped `Record<string, unknown>`:

```ts
if (name === "about") {
    return {
        modelValue: model.value,
        "onUpdate:modelValue": (v: ColorModel) => deps.updateModel(v),
        cssColor: deps.cssColor(),
    };
}
```

The picker was deliberately moved off this pattern — `usePaneRouter.ts:135-137`: *"S.W2 · W2-1: the
picker no longer takes the model as a prop — it injects the ONE pipeline (COLOR_MODEL_KEY) App
provides."* AboutPane's own template comment (`:7-19`) confirms its **subtree already reads that
ambient pipeline**: `ColorSpaceSelector.vue:139` injects `COLOR_MODEL_KEY`,
`ColorNutritionLabel.vue:188` injects `CSS_COLOR_KEY`. So the same state arrives by two routes, and
the shell is forced to know a leaf's private prop shape.

**The two routes carry different values.** `App.vue:340` passes `cssColor: () => cssColor.value` —
the **alpha-bearing** color — while `App.vue:271` does `provide(CSS_COLOR_KEY, cssColorOpaque)` — the
**alpha-stripped** one. The default model is `lab(92% 88.8 20 / 82.70%)`
(`color-model.ts:43`), α = 0.827, confirmed live: the visual audit's own probe records the boot URL
as `?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` (`REPORT.json`, `safari-desktop-light` `/#/`). So
on first paint the pane's markdown-ink pipeline and its nutrition-label ink pipeline are reading two
different colors by construction.

*(Honest scoping: `useMarkdownColors.ts:39` destructures only `[L, C, H]` from the OKLCh conversion
and discards alpha, so today this divergence is visually inert in that one consumer. It is a latent
correctness fault, not a rendering defect — labelled as such. `ColorSpaceSelector`'s `cssColor` prop
is live: `ColorSpaceSelector.vue:83` binds it to `<WatercolorDot :color="cssColor">`.)*

**Cure.** Drop `modelValue`/`cssColor` from `rightProps`; let AboutPane inject `COLOR_MODEL_KEY` and
`CSS_COLOR_KEY` the way the picker does. `rightProps` then collapses to the palettes case alone, and
the shell stops knowing any pane's prop shape.

---

### L-8 — MINOR · a dead vite plugin and a dead alias, kept alive by a comment about this component's assets

`vite.config.ts:159-160` registers `sourceExportPlugin()` in `defaultPlugins`, which every one of the
three build modes spreads. `vite.config.ts:74` keeps the `@src` alias, justified at `:70-73`:

> `// killed the demo `@…` path aliases … `@src` SURVIVES for the EXEMPT `assets/docs/*.md`
> reference pages, which embed live source snippets via `@src/…?source` (the `sourceExportPlugin`)`

Measured — `grep -rn "?source" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git .`:
zero hits in `assets/`, zero in `demo/`, zero in `src/`. Only `plugins/vite-source-export.ts` itself,
the `vite.config.ts` comment, and tranche-N/G audit prose. `grep -rn "@src/" demo/`: **zero hits**.

The stated justification is false as of HEAD, and AboutPane is the sole consumer of the asset tree it
names. The plugin runs on every dev serve and every build for no consumer.

**Cure.** Delete `plugins/vite-source-export.ts`, its import at `vite.config.ts:13`, its registration
at `:160`, and the `@src` alias at `:74`. (`vitest.config.ts:11`'s `@src` alias is separate and live —
`test/` uses it in 5 files — and must stay.)

---

### L-9 — MAJOR · this component's content lives outside the application and imports back into it

`AboutPane.vue:82-92` dynamic-imports 11 files from `../../../assets/docs/` — resolving to
`<repo-root>/assets/docs/`, a **sibling of `src/`, outside `demo/` entirely**. AboutPane is the only
consumer in the repository (`grep -rn "assets/docs" demo/ src/ test/ e2e/` returns only
`AboutPane.vue:82-92`).

And the edge is **bidirectional**. `assets/docs/lab.md:1-3`:

```html
<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>
```

All 11 files carry this import (`grep -c "demo/scenes/about/katex" assets/docs/*.md` → `1` for each of
the 11). So the graph is:

```
demo/scenes/about/AboutPane.vue  →  assets/docs/lab.md  →  demo/scenes/about/katex/index.ts
```

A demo scene reaches out of `demo/` to a repo-root directory, which reaches back into a *private
subdirectory of the very component that imported it*.

**Mechanism.** These files are not assets. They have `<script setup>` blocks, they import Vue
components, they are compiled to SFCs by `unplugin-vue-markdown` (`vite.config.ts:161`). They are
**Vue single-file components with a `.md` extension**, housed outside the application they belong to.
The name of the directory is the whole of the misdirection.

**Cure.** Move to `demo/scenes/about/guides/<space>.md`, beside the component that renders them and
beside the `katex/` they import. The `../../demo/...` import becomes `../katex`, the
`../../../assets/docs/...` import becomes `./guides/...`, the cycle across the `demo/` boundary
disappears, and the About scene becomes self-contained: pane + label + markdown renderer + katex +
guides, one tree, one owner.

---

### L-10 — INFO · `any` in a template handler on an already-typed emit

`AboutPane.vue:24`:

```html
@update:model-value="(colorSpace: any) => { model = { ...model, selectedColorSpace: colorSpace }; }"
```

`ColorSpaceSelector.vue:145-147` declares `emit<{ "update:modelValue": [value: string] }>` and the
target field is `DisplayColorSpace` (`color-model.ts:36-41`). The `any` widens a typed emit into an
untyped write on the domain model, and is the second type hole in a 100-line file (with L-2's cast).

**Cure.** Type the selector's emit as `[value: DisplayColorSpace]` — it already builds its options
from `DISPLAY_COLOR_SPACE_NAMES` (`:150`), so the narrow type is free — and drop the annotation
entirely.

---

## 3. Negative proofs — what I checked and found sound

These are stated with evidence because a challenge seat that reports only hits is not measuring.

**N-1 · The three-parallel-`useDark`-stores suspect is CURED.** The brief names
`useMarkdownHighlighting.ts:76` as a live instance. It is not — that line is a *comment recording the
cure*. Measured: `grep -rn "useDark" demo/ --include=*.ts --include=*.vue | grep -v useGlobalDark`
returns exactly one hit, and it is prose inside a comment (`useMarkdownColors.ts:16`). All 8 real
call sites — `useMarkdownColors.ts:18`, `ConsoleRail.vue:127`, `HeroBlob.vue:94`,
`MobileMenuDropdown.vue:34`, `ProfileSection.vue:43`, `useContrastSafeColor.ts:299,346`,
`App.vue:214`, `useViewAccents.ts:43` — use `useGlobalDark` from `@mkbabb/glass-ui/dark`. One store,
in the design system, where it belongs.

**N-2 · The markdown overflow architecture is SOUND, and the visual audit report is wrong about it.**
`REPORT.json` `safari-desktop-light` `/#/` records
`bleeding: ["path","math","semantics","mrow","msup","mi","mo","mo","mn","mrow","mo","mi"]` — 12
elements past the viewport edge, all from About's KaTeX. I chased it and it does not hold:

- The MathML entries are the **a11y mirror, correctly hidden**. Measured in WebKit:
  `.katex-mathml` → `{clip-path: "inset(50%)", position: "absolute", width: 1}`. `capture.mjs:83-86`'s
  `vis()` filter only tests `width>0 && height>0`, which a `clip-path`-hidden box still satisfies.
  **These 12 rows are false positives of the audit instrument, not defects of the component.**
- The **scroll containers work.** `Markdown.vue:301-306`'s `> div.inline-block:has(> .katex-display) {
  display:block; @apply overflow-x-auto; }` is live: measured `overflowX: "auto"`, and for the wide
  L\*a\*b\* formula the wrapper reports a **316px scroll range** (`scrollWidth − clientWidth`, inner
  `.katex-display` 752px in a 436px box). A second block measures 43px. The formula is reachable.
- `.katex-display` `text-align: center` does **not** cause bidirectional overflow here: measured
  `leftOverhang: 0, rightOverhang: 0` on all four display blocks — the content is left-aligned within
  the scroll box, so the LTR scroll range covers it.

I nearly filed this as a defect on the strength of the report row plus a first measurement taken
before `content-visibility: auto` (`Markdown.vue:104-107`) had materialised the off-screen blocks.
It is not one. **Recommendation for the audit program:** `capture.mjs`'s `vis()` should exclude
`clip-path`/`clip`-hidden and `visibility:hidden` subtrees, and `bleeding` should test against the
nearest scroll container rather than the viewport.

**N-3 · No deep-`src/` imports. The demo really does dogfood the published surface.** `grep -rn
'from "@mkbabb/value.js"' demo/` → **0 hits** (the bare-barrel specifier is fully retired; the last
holdout, `debounce`, is documented at `demo/shared/utils.ts:8-20`). `grep -rn "@src/" demo/` → **0
hits**. All 50 value.js imports in `demo/` go through published subpaths: `/color` ×25, `/css` ×10,
`/math` ×6, `/easing` ×5, `/quantize` ×4. Every one is writable by a real consumer. This half of the
T.W1 keystone is genuinely intact — **the defect in L-5 is in the config that describes it, not in the
code.**

**N-4 · No god modules in the closure.** Largest members: `Markdown.vue` 408 lines (of which ~330 are
scoped CSS with rationale), `useContrastSafeColor.ts` 376 lines / **4 exports**, `colorSpaceInfo.ts`
334 lines (pure data), `ColorNutritionLabel.vue` 242, `AboutPane.vue` 100. Nothing here is a bucket.

**N-5 · `verbatimModuleSyntax` compliant.** `AboutPane.vue:72` `import type { ColorModel }`,
`:74` `import type { DocModule }` — both correctly type-only. Closure spot-checks
(`ColorNutritionLabel.vue:182`, `useMarkdownHighlighting.ts:1`, `color-space-meta.ts:11-12`) all
correct.

**N-6 · Out of closure, not assessed.** The brief's other named suspects —
`ActionBarLayer`'s local `useLayerTransition` reimplementation, and `demo/palettes/export.ts` +
`usePaletteExport.ts` vs `export/serializers` — are not reachable from AboutPane. I did not audit
them and make no claim either way; they belong to the ActionBarLayer and palettes seats.

---

## 4. The greenfield lattice

Asked for concretely, stated concretely. If I were structuring the About scene today with no legacy:

```
demo/scenes/about/
├── AboutPane.vue              — layout + composition ONLY. No tables, no unions, no
│                                dynamic-import map. Injects COLOR_MODEL_KEY + CSS_COLOR_KEY;
│                                takes zero props.
├── spaces/
│   ├── index.ts               — export const SPACE_DOCS = { … } satisfies
│   │                            Record<DisplayColorSpace, SpaceDoc>;
│   │                            type SpaceDoc = { facts: SpaceFacts; guide: DocModule };
│   │                            ONE table. ONE key type — the library's, via DisplayColorSpace.
│   │                            Adding a SpaceId to @mkbabb/value.js/color breaks this build
│   │                            until both halves exist. That is the whole point.
│   ├── facts/<space>.ts       — the 18 structured rows (today: colorSpaceInfo.ts, 13 rows,
│   │                            in demo/color-session/, unconstrained)
│   └── guides/<space>.md      — the 18 prose guides (today: <repo-root>/assets/docs/, 11 files,
│                                outside the app, importing back into it)
├── NutritionLabel.vue         — renders SpaceDoc.facts. Total lookup, no fallback branch.
├── Guide.vue                  — renders SpaceDoc.guide. Owns its own empty state
│                                (today's dead "Oh snap" Alert becomes reachable).
└── katex/Katex.vue            — unchanged; guides/ now import `../katex`, one hop, no cycle.
```

with, outside the scene:

- **`demo/ui/` deleted.** Every consumer imports `@mkbabb/glass-ui` directly. The design system is
  visible at the call site, so pressure to add a variant lands in glass-ui, where edict 4 puts it.
- **`tsconfig.demo.json`'s value.js `paths` deleted.** Package self-reference through
  `package.json#exports` is the single source of truth for the published surface, in the type program
  and the runtime alias generator alike — proven working today for `/css` (§L-5 trace).
- **`plugins/vite-source-export.ts` and the `@src` alias deleted** from `vite.config.ts` (kept in
  `vitest.config.ts`, where they are live).
- **`usePaneRouter.rightProps` reduced to the palettes case.** No pane's private prop shape is known
  to the shell.

Four properties fall out, none of which the current structure has:

1. **The color-space set is enumerated once**, in the library, and every demo table is compiler-total
   over it. L-1 and L-2 become impossible to reintroduce, not merely fixed.
2. **The About scene is self-contained** — pane, label, guide renderer, katex, facts and prose in one
   tree with one owner. No edge leaves `demo/`, and nothing outside reaches in.
3. **The published surface is described in exactly one file**, `package.json#exports`, and both
   programs derive from it. A demo import that a real consumer could not write becomes unresolvable
   rather than silently blessed.
4. **State flows one direction** — App provides, panes inject. No pane is prop-drilled, so no two
   routes for one value can disagree about alpha.

---

## 5. Appendix — commands run

```bash
# module homes
for d in demo/ui/*/; do echo "$(basename $d): $(ls $d)"; done          # 19 dirs, index.ts only
grep -rn "assets/docs" demo/ src/ test/ e2e/                            # sole consumer: AboutPane.vue:82-92
grep -c "demo/scenes/about/katex" assets/docs/*.md                      # 1 × 11 → the cycle
grep -rn "{ Markdown }" demo/                                           # sole consumer: AboutPane.vue:71
grep -rn "useDark" demo/ --include=*.ts --include=*.vue | grep -v useGlobalDark   # 1 hit, a comment

# published surface
node -e "console.log(Object.keys(require('./package.json').exports))"   # 7 keys, no "."
ls dist/index.d.ts                                                      # absent
ls dist/subpaths/                                                       # no parsing.d.ts, no units.d.ts
npx tsc -p tsconfig.demo.json --noEmit --traceResolution \
  | grep -B14 "Module name '@mkbabb/value.js/css' was successfully"     # → self-reference via exports
stat -f "%Sm %N" node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts dist/subpaths/css.d.ts

# the cast is load-bearing
npx tsc --noEmit --strict --noUncheckedIndexedAccess --target ES2022 \
  --module ESNext --moduleResolution bundler scratchpad/tscast/probe.ts # TS7053 + TS1360

# live reproduction (isolated @playwright/test — the MCP browser was held by another seat)
node scratchpad/probe2.mjs   # Chromium: select Display P3 / Jzazbz → RGB facts, empty guide
node scratchpad/probe3.mjs   # card foot: text ends on the "Detailed Guide" heading
node scratchpad/probe5.mjs   # WebKit: MathML clip-path:inset(50%) → REPORT bleeding = false positive
node scratchpad/probe7.mjs   # WebKit: katex wrapper scroll range 316px → overflow cure is SOUND
```

Scratchpad (probes, screenshots, tsc fixture):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. This report is the only write, and it is under
`docs/tranches/V/megatranche/audit/components/AboutPane/`.
