# CHALLENGE-L — library structure · `demo/scenes/about/ColorNutritionLabel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]` — the tier
declared at spawn. Seat declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/scenes/about/ColorNutritionLabel.vue`, 242 lines, area `scenes`.
Dev server probed live at `http://localhost:9000` (Chromium via `playwright-core`; the MCP
browser was held by another seat, so probes ran as standalone scripts).

**Verdict: DEFECTIVE.** The premise holds. Two spaces of measured, wrong-on-screen colour
science; four parallel declarations of the same domain concept in three layers, none of them the
owner; a forwarding directory the ratified architecture names by name as forbidden; and a
component interface that drills a two-way whole-model binding through three files to read one
enum it could inject.

---

## 0. What the component imports, and where each import comes home

`ColorNutritionLabel.vue:167-184`

| Import | Home | Layer per `docs/tranches/V/ARCHITECTURE.md §1` | Legal? |
|---|---|---|---|
| `vue` | external | — | yes |
| `../../color-session/keys` (`CSS_COLOR_KEY`) | `color-session` | feature → color-session | yes |
| `../../color-session/useContrastSafeColor` (`useSafeAccentFn`) | `color-session` | feature → color-session | yes |
| `../../color-session/ink` (`contrastInkFor`) | `color-session` | feature → color-session | yes, but see **L-11** |
| `../../color-session/picker-color` (`PICKER_CHANNELS`) | `color-session` | feature → color-session | yes, but see **L-3** |
| `../../ui/separator`, `../../ui/tooltip`, `../../ui/alert` | `demo/ui/**` | **not on the lattice at all** | **no — L-4** |
| `@lucide/vue` (`ArrowRight`) | external | published package | yes |
| `../../color-session/color-model` (type + `resolveColorSpace`) | `color-session` | feature → color-session | yes, see **L-12** |
| `../../color-session/colorSpaceInfo` | `color-session` | should be `shared/content` — **L-12** | wrong home |

**Negative proof — the value.js public surface is used correctly.** The component reaches
`@mkbabb/value.js` only transitively, and the whole demo does so only through the published
subpath export map:

```
$ grep -rn "@mkbabb/value.js" demo/ --include="*.ts" --include="*.vue" | sed 's/.*from //' | sort | uniq -c | sort -rn
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";

$ grep -rn "@src\|\.\./\.\./\.\./src/\|value.js/src" demo/ --include="*.ts" --include="*.vue"
(no output)
```

All five specifiers are keys of `package.json#exports`. Zero deep paths into `src/`, zero `@src`
in demo code. `vite.config.ts:23-47` generates the self-alias set *from* `package.json#exports`
so the demo can never resolve a specifier a real consumer could not write. This is the one part
of the structure that is right, and it is right by construction rather than by discipline. It
should be preserved verbatim through any transposition below.

---

## 1. Findings

### L-1 · BLOCKER — the masking fallback prints factually wrong colour science for 5 of the 17 selectable spaces

`ColorNutritionLabel.vue:210-215`

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;          // ← the mask
});
```

The selector offers every key of `DISPLAY_COLOR_SPACE_NAMES` (`ColorSpaceSelector.vue:150`,
`= {...PICKER_SPACE_NAMES, hex}` — 18 entries). `colorSpaceInfo` has 13. Enumerated:

```
$ node -e "…compare colorSpaceInfo keys vs PICKER_CHANNELS keys…"
colorSpaceInfo keys (13): rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz, kelvin, ictcp, jzazbz, hex
PICKER_CHANNELS keys (17): rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz, kelvin, srgb-linear,
                           display-p3, a98-rgb, prophoto-rgb, rec2020, ictcp, jzazbz
IN SELECTOR BUT NO INFO ENTRY: srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020
```

**Reproduction** (dev server live, Chromium 1600×1000):

```
$ node scratchpad/probe.mjs
# http://localhost:9000/#/?space=display-p3&color=color(display-p3 0.5 0.2 0.7)
=== space = display-p3 ===
 "trigger": "Display P3",
 "definition": ["A color space based on the additive mixture of red, green, and blue light."],
 "grid": ["Device Dependency:","Device-dependent","White Point:","Varies (typically D65)",
          "Gamut:","Limited (device-specific)","Created:","1931", …],
 "graph": ["RGB","XYZ","RGB","Kelvin","RGB","HSL","RGB","Hex"],
 "names": ["Red","Green","Blue"]
```

The plate title reads **Display P3** while every fact below it is CIE RGB's: created **1931**
(Display P3 is 2015, SMPTE ST 431/Apple), gamut **"Limited (device-specific)"** (P3 is the wide
gamut — the whole point of the space), white point "Varies (typically D65)" (P3 is fixed D65),
and a conversion graph rooted at RGB. `rec2020` reproduces identically. `srgb-linear`,
`a98-rgb`, `prophoto-rgb` follow by the same enumeration.

This is an **owner-edict-2 masking fallback** ("no masking fallbacks") in its purest form: the
absence of data is converted into confident wrong data on a page whose entire purpose is teaching
colour science. A `Card` titled "About the color spaces" is the single worst place in the product
to lie.

Note the render is a **chimera**: the Components section takes its *names* from the fallback
(`Red/Green/Blue`) and its *ranges* from the correct space (`0 to 1`, i.e.
`PICKER_CHANNELS["display-p3"]`), because the two are index-joined at line 57 from two different
tables. See **L-3**.

### L-2 · MAJOR — the `hex` entry is unreachable dead data

`colorSpaceInfo.ts:313-332` authors a full 20-line `hex` record (own definition, `created: 1996`,
`components: ["Red (00-FF)", "Green (00-FF)", "Blue (00-FF)"]`). `ColorNutritionLabel.vue:211`
applies `resolveColorSpace()` *before* the lookup, and `color-model.ts:32-34` maps
`"hex" → "rgb"`. The key can never be hit from this component.

**Reproduction**: `http://localhost:9000/#/?space=hex&color=%238a2be2`

```
=== space = hex ===
 "trigger": "Hex",
 "definition": ["A color space based on the additive mixture of red, green, and blue light."],
 "grid": [… "Created:","1931", "Red0 to 255","Green0 to 255","Blue0 to 255" …]
```

Title "Hex", body CIE RGB 1931, components `Red 0 to 255` — the authored `Red (00-FF)` never
renders. The only other consumer, `ConsoleRail.vue:173-174`, reaches it through
`(colorSpaceInfo as any)[space]` where `currentColorSpace` is likewise the *resolved* space
(`useColorPipeline.ts:113-115`). The entry is dead in both consumers: 20 lines of maintained
prose that no code path can display.

### L-3 · BLOCKER — "the channels of a colour space" has four homes and no owner

One concept — the identity, count, order, range, unit and human name of a space's channels — is
declared four independent times across three layers:

| # | Declaration | Location | Carries |
|---|---|---|---|
| 1 | `SPACE_SCHEMA` | `src/color/model.ts:56-74` (library) | keys, order, `hueIndex`, `css` flag |
| 2 | `PICKER_CHANNELS` | `demo/color-session/picker-color.ts:52-70` | keys, order, min, max, unit |
| 3 | `colorSpaceInfo[space].components` | `demo/color-session/colorSpaceInfo.ts` | prose names, order |
| 4 | `SPACE_GLYPHS` | `demo/picker/controls/ComponentSliders/ConsoleRail.vue:156-164` | display glyphs |

`ColorNutritionLabel.vue:48,57` joins **#2 and #3 positionally by array index**:

```vue
v-for="([rangeKey, range], index) in Object.entries(formattedRange)"
…
{{ currentColorSpaceInfo.components[index] ?? rangeKey }}
```

Nothing type-checks that #2 and #3 agree in arity or order. They currently do where both exist
(measured: all 12 overlapping keys match arity), and they catastrophically do not where #3 is
absent — which is exactly the chimera in **L-1**.

The root cause is a **library public-surface gap**. `SPACE_SCHEMA` is `export`ed from
`src/color/model.ts:56` but is re-exported by neither `src/color/index.ts` nor
`src/subpaths/color.ts`:

```
$ grep -rn "SPACE_SCHEMA\|SpaceSchema" src/subpaths/ src/color/index.ts
(no output)
```

And even if it were exported it carries no ranges or units. The normative ranges exist only as
prose in `docs/tranches/V/ARCHITECTURE.md §2` (the 17-row space contract table: `rgb` 0–255,
`lab` a/b −125–125, `lch` c 0–150, `oklch` c raw 0–0.5 / `%` reference 0.4, `jzazbz` jz
0–0.222 …) and as **inline magic numbers at each parse site**:

```
$ grep -rn "255\|0\.4\b\|150\b" src/css/grammar.ts
src/css/grammar.ts:184: const values = components.map((part) => channelToken(part, 255));
src/css/grammar.ts:208: … channelToken(components[0]!, 100), channelToken(components[1]!, 150), channelToken(components[2]!, 360, true)
src/css/grammar.ts:214: … channelToken(components[0]!, 1), channelToken(components[1]!, 0.4), channelToken(components[2]!, 0.4)
src/css/grammar.ts:220: … channelToken(components[0]!, 1), channelToken(components[1]!, 0.4), channelToken(components[2]!, 360, true)
```

So the library **knows** every number `PICKER_CHANNELS` re-declares, and hides all of it. The
demo is forced to maintain a 17-row shadow of the library's own space contract, and that shadow
is the sole executable copy of the ARCHITECTURE §2 table in the repository. `ColorNutritionLabel`
is the component where the gap becomes visible as wrong text.

### L-4 · MAJOR — `demo/ui/**` is nineteen one-line glass-ui forwarding directories, named as forbidden by the ratified architecture

`docs/tranches/V/ARCHITECTURE.md:37` (normative, §1 Physical demo tree):

> "There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, **or one-line
> glass-ui forwarding directory**."

Measured:

```
$ wc -l demo/ui/*/index.ts | tail -1
      29 total                     # 19 directories, 29 lines
$ find demo/ui -name "*.vue" | wc -l
       0
$ grep -hv "^//" demo/ui/*/index.ts | grep -v "^$" | grep -vc "@mkbabb/glass-ui"
       0                           # zero lines that are not a glass-ui re-export
```

`demo/ui/separator/index.ts` in full: `export { Separator } from "@mkbabb/glass-ui";`.
The subject imports through three of them (`:173`, `:174-179`, `:181`).

The layer is not only redundant, it is **lossy**. glass-ui 7.0.0 publishes 70 export keys
including first-class `./separator`, `./tooltip`, `./card`, `./select`, `./dialog`, `./popover`,
`./label`, `./slider`, `./switch`, `./badge`, `./button`, `./collapsible` — but the forwarding
barrels all pull from the **root** barrel, whose `dist/index.d.ts` is `export *` over 27
component modules plus the whole motion/pointer-field surface. Every consumer of
`demo/ui/separator` therefore eagerly names the accordion, data-table, command-palette,
tags-input, toast and configurator graph to obtain one `<hr>`.

There is also a live **dual path**: 14 `.vue` files and ~28 `.ts` files already import
`@mkbabb/glass-ui` / `@mkbabb/glass-ui/<subpath>` directly (`demo/shell/dock/index.ts:2`,
`ColorSpaceSelector.vue:110` `@mkbabb/glass-ui/watercolor-dot`, `useContrastSafeColor.ts:9`
`@mkbabb/glass-ui/dark`, …). So the same design system is reached two ways in the same feature —
`ColorSpaceSelector.vue` imports `../ui/select` *and* `@mkbabb/glass-ui/watercolor-dot` in the
same script block. Owner edict 2 (no dual paths) and edict 3 (KISS, no contrivance) both bite;
edict 4 is satisfied in spirit (nothing is re-implemented) but the indirection buys nothing.

One directory *does* carry information — `demo/ui/alert/index.ts`'s comment records that a local
shadcn re-implementation was deleted at B.W2. That history belongs in the tranche record, not in
a shipped module.

### L-5 · MAJOR — the channel display-scale rule is copy-pasted five times

```
$ grep -rn "max <= 1" demo/ --include="*.ts" --include="*.vue"
demo/scenes/about/ColorNutritionLabel.vue:220:   const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
demo/picker/display/ColorComponentDisplay/readoutReservation.ts:98: const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
demo/color-session/useColorParsing.ts:98:        const display = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
demo/color-session/useSliderGradients.ts:73:     const displayed = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
demo/color-session/useSliderGradients.ts:84:     const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
```

Two of the five are the *same function*, character for character in behaviour:

```ts
// ColorNutritionLabel.vue:222-227
min: `${meta.min * scale}${meta.unit}`,
max: `${meta.max * scale}${meta.unit}`,
// useSliderGradients.ts:85
acc[meta.key] = `(${meta.min * scale}${meta.unit} - ${meta.max * scale}${meta.unit})`;
```

"How a `ChannelMeta` renders to a human" is a property of `ChannelMeta`, declared in
`picker-color.ts:40-46`, and belongs beside it (or, per **L-3**, in the library beside the range
itself). Five homes means five places to change when the `%` reference for `oklch` chroma is
respected (today the label prints `0 to 0.5` for OKLCh C, which is the raw physical max; the CSS
percentage reference is 0.4 per ARCHITECTURE §2 — the label does not say which it means).

### L-6 · MAJOR — the public interface is a two-way whole-model binding the component never writes, for one enum that is already ambient

`ColorNutritionLabel.vue:186` — `const model = defineModel<ColorModel>({ required: true });`

`model.value` is read at `:211` and `:219`. It is **never assigned**. Yet the two-way declaration
forces a three-file wiring chain for a single enum:

- `demo/shell/usePaneRouter.ts:146-152` — the shell router special-cases `about` to build
  `{ modelValue: model.value, "onUpdate:modelValue": …, cssColor: … }`
- `demo/scenes/about/AboutPane.vue:72` — re-declares `defineModel<ColorModel>({required:true})`
- `demo/scenes/about/ColorNutritionLabel.vue:186` — re-declares it again, to read one field

Meanwhile the app already provides the whole pipeline at `demo/color-picker/App.vue:257`
(`provide(COLOR_MODEL_KEY, pipeline)`), and that pipeline **already exposes the exact derived
value this component computes**:

```ts
// demo/color-session/useColorPipeline.ts:113-115, returned at :295
const currentColorSpace = computed(() => resolveColorSpace(model.value.selectedColorSpace));
```

`ConsoleRail.vue:114` injects it (`inject(COLOR_MODEL_KEY)!`). `ColorSpaceSelector.vue:142` —
the sibling *inside AboutPane's own header* — injects it. `AboutPane.vue:6-14` even documents
the law it is breaking:

> "Its specimen rows read the ONE App-provided pipeline (COLOR_MODEL_KEY, App.vue …) — ambient
> since S.W2's transposition"

So within one 100-line pane, the selected colour space is reached **two ways**: ambiently by the
selector, prop-drilled by the label. The component also mixes channels for the *same* domain —
`selectedColorSpace` by prop, `cssColorOpaque` by `inject(CSS_COLOR_KEY)` at `:188`. One domain,
two transports, in one 242-line file.

Secondary consequence: `usePaneRouter.ts:168-175` reads `model.value` inside the `desktopRight`
computed, so every colour tick replaces the props object identity and re-renders the About
subtree. (Cost is small — the subtree legitimately re-inks per frame for `componentInk` — so I
label the *performance* claim a HYPOTHESIS. The *interface* defect stands on the code alone.)

`formattedRange` (`:217-230`) additionally re-derives `PICKER_CHANNELS[resolveColorSpace(...)]`,
which `useColorPipeline.ts:117-123` already computes and caches as `colorComponents`.

### L-7 · MAJOR — the conversion-graph hover highlight is a value-membership test; it leaks across rows

`:232-240` stores `hoveredPath: string[]` — the hovered row's *contents*. `:123` tests
`hoveredPath.includes(space)` for **every node in every row**. Row identity is right there in the
`v-for` (`index`, `:99`) and is unused.

**Reproduction** — hover row 0 (`OKLCh → OKLab`) at `?space=oklch`:

```
$ node scratchpad/probe3.mjs
GRAPH_ROWS [["OKLCh","OKLab"],["OKLCh","OKLab","XYZ"],["OKLCh","OKLab","XYZ","Lab"]]
AFTER_HOVER_ROW0
 row0: OKLCh filled=true  OKLab filled=true
 row1: OKLCh filled=true  OKLab filled=true  XYZ filled=false
 row2: OKLCh filled=true  OKLab filled=true  XYZ filled=false  Lab filled=false
```

**6 nodes light across 3 rows; 2 are in the hovered row.** Rows 1 and 2 render as ragged
partial fills — a coloured prefix and an uncoloured tail — which reads as neither "this path" nor
"everywhere this space appears". Either intent would need a different predicate; the current one
implements neither.

(The F-3 ink chain itself is correct — measured
`background-color: oklch(0.6 0.2 300); color: oklch(0 0 0);`, i.e. `contrastInkFor` returning the
WCAG-maximal endpoint as designed. The defect is state ownership, not contrast.)

### L-8 · MAJOR — the Conversion Graph is hand-authored prose where the library owns the real topology

`colorSpaceInfo[space].conversions` is a hand-maintained array of display-string chains
(`[["OKLCh","OKLab"], ["OKLCh","OKLab","XYZ"], …]`, `colorSpaceInfo.ts:305-309` etc.). The
library owns the *actual* conversion graph — `convertColor` in `@mkbabb/value.js/color`, with the
"Total conversion anchor" column of ARCHITECTURE §2 specifying every space's real route
(`prophoto-rgb`: "encoded ProPhoto RGB ↔ XYZ D50 ↔ frozen D50/D65 Bradford pair ↔ XYZ D65").

A section named **Conversion Graph** that renders a prose table instead of the shipped graph is a
second source of truth for the library's central invariant, unverifiable by any test, and
already 5 spaces short (**L-1**). It is also the reason the graph shows RGB→Kelvin→HSL→Hex for
Display P3.

### L-9 · MINOR — three fully-mounted, entirely empty tooltips per space

`:139-140`

```vue
<TooltipContent class="contents w-64 p-2 text-small">
</TooltipContent>
```

**Reproduction** — hover a conversion row:

```
$ node scratchpad/probe2.mjs
TOOLTIP_AFTER_HOVER
 [data-reka-popper-content-wrapper]  text="" rect 0×0 at (943,902)
 [data-state="delayed-open"][data-surface="glass"][data-material="overlay"]
     class="… glass-reveal glass-floating …"  text=""  display: contents
 [role="tooltip"]                     text=""
```

Each hover mounts a portal, a floating-ui popper, a dismissable layer, glass-ui's full
`glass-floating` overlay recipe and an ARIA `role="tooltip"` — carrying **zero content**. A
screen reader following `aria-describedby` lands on an empty node.

`class="contents"` sets `display: contents` on the glass surface (measured above), which deletes
the box the shipped glass recipe paints into — border, radius, blur, `--overlay-pad-inline` all
inert. This is a per-instance override fighting a root-level design-system recipe (edict 5) and
losing to physics.

`TooltipProvider` is also instantiated **inside** the `v-for` (`:97-101`), one provider per
conversion path, where the primitive's contract is one provider as a common ancestor supplying
`delayDuration` to a subtree. Measured 3 providers on the `oklch` plate.

Either the tooltip carries `notes` (`colorSpaceInfo[space].notes` exists and is rendered
*nowhere*) or the whole `Tooltip*` import comes out.

### L-10 · MINOR — two type escapes, one proven unnecessary

`:160` `(currentColorSpaceInfo.industries as any).join(", ")` — while `:154`
`currentColorSpaceInfo.applications.join(", ")` is uncast. Proven identical in type:

```
$ tsc --noEmit --ignoreConfig --strict --target ES2022 --module esnext --moduleResolution bundler probe.ts
probe.ts(13,14): error TS2322: Type 'readonly ["RGB","XYZ"] | …' is not assignable to type 'string[]'.
```

Only line 13 (`conversions`) errors. `industries.join(", ")` and `applications.join(", ")` both
type-check clean. The `as any` at `:160` is pure cruft.

`:111` `setHoveredPath(path as any)` — real, but the cure is the signature, not the cast:
`setHoveredPath(path: readonly string[])` and `hoveredPath = shallowRef<readonly string[]>([])`.
`as const` on the table produces `readonly` tuples; the handler demands mutable `string[]`.
Same for `space as string` at `:123`.

### L-11 · MINOR — `ink.ts` is three concepts in one module, one of which is a hand-copy of glass-ui's theme

`demo/color-session/ink.ts` (174 lines), which the subject imports at `:171`, holds:

1. **universal colour science** — `contrastInkFor` (`:158-173`): parse → OKLCh → WCAG endpoint
   walk. Zero Vue, zero DOM, built on the library's own `safeAccentColor`. This is library work
   living in a demo module.
2. **glass-ui's theme values, hand-copied** — `PRODUCER_TINTS` (`:25-28`)
   `card: {light: "hsl(30 85% 96%)", dark: "hsl(26 22% 17%)"}`, `RUNG_ALPHA`, `FLOATING_TINT_L`,
   `WELL_FOREGROUND_FRACTION`.
3. **the demo's surface model** — `InkSurface`, `resolveSurfaceLightness`.

(2) is a second path for values the app already reads live. Measured — the shipped token and the
hardcoded literal are the same string today:

```
$ node scratchpad/probe2.mjs
--card:       light-dark(hsl(30 85% 96%), hsl(26 22% 17%))
--foreground: light-dark(hsl(24 10% 10%), hsl(30 14% 90%))
ink.ts PRODUCER_TINTS.card.light   = hsl(30 85% 96%)     ← identical
ink.ts PRODUCER_TINTS.foreground.light = hsl(24 10% 10%) ← identical
```

So: **in sync today, therefore not a live defect** — but a duplicate of a producer's private
theme numbers, maintained by hand, in a consumer, with no test binding them. `useContrastSafeColor.ts:225-232`
records that this exact duplication has already shipped a contrast failure once ("the light-scheme
profile trigger certified against the model's 0.90 while the REAL band composited 0.75 — 3.59:1
measured"). The live probe path works in a real browser — verified:

```
--glass-bg-resting → color(srgb 0.994 0.96 0.926 / 0.65)
--well-bg          → oklab(0.913295 0.00550478 0.0130424)
[data-ink-probe] element present in the live DOM: true
```

so the static model is reachable only under jsdom. A second implementation kept alive for the
test environment is the canonical shape of a dual path.

### L-12 · INFO — two home/idiom nits in the import block

- `colorSpaceInfo.ts` (334 lines of authored pedagogical prose, `notes`, `applications`,
  `industries`) is homed in `color-session/`, whose charter is "active color/specimen, editing
  target, accent/ink and action context" (ARCHITECTURE §1). The lattice has an exact home for it:
  `shared/content/  # deliberately authored typed pedagogical snippets`.
- `:182-183` splits one module across two import statements (`import type { ColorModel }` then
  `import { resolveColorSpace }` from `../../color-session/color-model`). `verbatimModuleSyntax`
  is satisfied either way, but the repo idiom (`picker-color.ts:22-26`,
  `ColorSpaceSelector.vue:117-122`) is one statement with inline `type`.
- `:188` `inject(CSS_COLOR_KEY)!` vs `ColorSpaceSelector.vue:142` `inject(COLOR_MODEL_KEY, null)`
  with an explicit "a future host outside any provider renders … rather than crashing" rationale.
  Two opposite provider-tolerance conventions in one feature. This matters concretely because
  ARCHITECTURE §1 requires About to become the standalone `/about` route (below).

### L-13 · INFO — stale published-surface prose in the shared tail

`demo/shared/utils.ts:11-16` justifies a local `debounce` copy by "the library's **root-barrel**
export stands for external consumers". There is no root barrel:

```
$ node -e "const p=require('./package.json'); console.log('main',p.main,'rootExport',JSON.stringify(p.exports['.']))"
main undefined rootExport undefined
$ grep -rn "export function debounce\|export const debounce" src/
(no output)
```

`@mkbabb/value.js` 4.0.0 is subpath-only (7 keys, no `.`), and ships no `debounce` at all. The
comment documents a surface that does not exist. Adjacent to the subject (`AboutPane`'s sibling
`useColorUrl.ts:8` consumes it), not on its import path.

---

## 2. Checked and clean — the negative proofs

These were the named historical suspects and the standing edicts. Each was checked and each is
sound; recording them so the next seat does not re-litigate.

| Claim tested | Result | Evidence |
|---|---|---|
| Deep imports into `src/` bypassing the export map | **none** | grep above; 5 subpaths only, all in `package.json#exports` |
| `@src` / project alias in demo | **none in demo** | grep above (`vite.config.ts:74` keeps `@src` for the vitest suite only) |
| Three parallel `useDark` stores | **cured** | `useMarkdownHighlighting.ts:68-80` documents the kill; census shows one authority, glass-ui `useGlobalDark`, 8 call sites |
| `useContrastSafeColor.ts:242` `classList.contains("dark")` = a fourth scheme store | **no** — it is a cache-validity stamp (`TintCacheEntry.darkClass`, `:234-247`), documented, correct |
| The canvas ink probe cannot resolve `light-dark()` | **no** — the probe assigns `var(--token)` to a real element and reads `getComputedStyle().backgroundColor`, which the CSSOM has already resolved (`useContrastSafeColor.ts:205-210`); measured `color(srgb 0.994 …)` |
| Local reimplementation of a removed composable (the `ActionBarLayer`/`useLayerTransition` pattern) | **none in this component** |
| God module | **no** — 242 lines, one concern, no local state machine, no `<style>` block |
| `verbatimModuleSyntax` compliance | **clean** — the one type-only import is `import type` (`:182`) |
| Animations deleted | **none** — the component owns no keyframes; transitions are glass-ui `transition-colors` utilities |
| Page/console errors, horizontal overflow on `/#/` | **none for this component** — `audit/visual/REPORT.md` records 0 pageErrors, 0 horizontalOverflow, 0 blankOrNearBlank across all 4 Safari matrices; the single consoleError is `WebGL: context lost` (the blob, not About) |
| Visual render of a *covered* space | **correct** — `shots/safari-desktop-light/picker.png` shows Lab rendering its true record (device-independent, D50/D65, unlimited gamut, 1976, `L* (Lightness) / a* (Green-Red) / b* (Blue-Yellow)`) |

The visual matrix cannot see **L-1/L-2** because it captures 15 routes and About is not one of
them — it is the right-hand pane of `/#/` at the default space (`oklch`, a covered key). The
wrong-data render is only reachable by selecting one of the 5 uncovered spaces. That is itself an
argument for **M-1** below.

---

## 3. The greenfield lattice

Stated concretely, no hedging. Four moves; the first is the one that matters.

### M-1 — the library owns the space contract; the demo owns nothing about colour spaces

Promote the ARCHITECTURE §2 table into executable, exported library data. Extend
`SPACE_SCHEMA` (`src/color/model.ts:56`) from names-only to the full contract and export it
through `src/color/index.ts` → `src/subpaths/color.ts`:

```ts
// src/color/model.ts
export type ChannelSpec = Readonly<{
    key: string;            // "l" | "c" | "h" | …
    min: number; max: number;
    unit: "" | "%" | "deg" | "K";
    pctReference?: number;  // oklch c: 0.4 while max stays 0.5   ← kills L-5's ambiguity
    hue?: true;
}>;
export const SPACE_SCHEMA = { … } as const satisfies Record<SpaceId, {
    channels: readonly ChannelSpec[]; css: boolean;
}>;
export function formatChannelBound(spec: ChannelSpec, which: "min" | "max"): string;
```

`src/css/grammar.ts:184-220` then reads `pctReference` instead of inlining `255 / 100 / 150 / 0.4 / 360`
at each call site — the library stops having two copies of its own contract.

Consequences: `PICKER_CHANNELS` (**#2**) is **deleted**, all 19 lines of it. The five copies of
the display-scale rule (**L-5**) collapse into `formatChannelBound`. `readoutReservation.ts`,
`useColorParsing.ts`, `useSliderGradients.ts` and `ColorNutritionLabel` all consume one exported
function. The demo carries no colour-space math, no ranges, no units — which is the
already-declared law (`useContrastSafeColor.ts:35`: "sourced ENTIRELY from the library … the demo
carries NO norm/denorm color math"), applied to the one place it was never applied.

### M-2 — one typed content record per space, keyed exhaustively, joined by key not by index

Move the prose to its charter home and make the gap in **L-1** a compile error:

```ts
// demo/shared/content/color-space-notes.ts
import type { SpaceId } from "@mkbabb/value.js/color";

export type SpaceNote = Readonly<{
    displayName: string;
    definition: string;
    deviceDependency: string; whitePoint: string; gamut: string; created: string;
    perceptualUniformity: string; hueLinearity: string; lightnessSeparation: string;
    applications: readonly string[]; industries: readonly string[];
    notes: string;
    channelNames: Readonly<Record<string, string>>;   // keyed by ChannelSpec.key — NOT positional
}>;

export const SPACE_NOTES: Readonly<Record<SpaceId | "hex", SpaceNote>> = { … };
```

`Record<SpaceId | "hex", SpaceNote>` is exhaustive: the 5 missing spaces become a `tsc` failure,
not a silent `?? colorSpaceInfo.rgb`. The fallback at `:214` is **deleted outright** — there is
nothing left to mask. `channelNames` keyed by `ChannelSpec.key` kills the positional join at
`:57` and the arity hazard with it. `SPACE_GLYPHS` (**#4**, `ConsoleRail.vue:156-164`) folds in as
a `glyph` field; the four homes become one.

`hex` (**L-2**) becomes reachable by looking up `selectedColorSpace` (the *display* space) for
content while `resolveColorSpace` continues to govern *computation* — the two questions separate,
which is what `DisplayColorSpace` was introduced to express.

### M-3 — the Conversion Graph is derived, not authored

Delete `SpaceNote.conversions`. Render the route the library actually takes, from the exported
schema — either a small exported `conversionRoute(from, to): readonly SpaceId[]` beside
`convertColor`, or the anchor chains of ARCHITECTURE §2 promoted to data. A graph that cannot
disagree with the converter is the only graph worth drawing on this page, and it makes the section
correct for all 17 spaces for free.

Then split the leaf out — it is the only stateful part of the component:

```
demo/scenes/about/
  AboutArticle.vue          # the /about route leaf (ARCHITECTURE §1, W18)
  NutritionLabel.vue        # pure presentational; props: { space: SpaceId | "hex" }
  ConversionGraph.vue       # owns hoveredRow: shallowRef<number | null>   ← kills L-7 by construction
  markdown/ katex/
```

`hoveredRow` is an index; `:class` keys off `rowIndex === hoveredRow`. The value-membership leak
cannot be written.

### M-4 — kill `demo/ui/**`; About becomes the route the architecture already ratified

Delete all 19 forwarding directories (29 lines) and rewrite every consumer to the glass-ui
**subpath** that actually owns the primitive — `@mkbabb/glass-ui/separator`,
`/tooltip`, `/card`, `/select`, `/dialog`, … — reserving the root barrel for the handful of
symbols that have no subpath (`Alert`, `cn`). One path to the design system, and the root barrel
stops being pulled in to fetch an `<hr>`. This is ARCHITECTURE §1 line 37 executed literally.

Simultaneously: About stops being Picker's right-hand pane. `viewSchema.ts:107` (`right: "about"`)
and the `about` special case in `usePaneRouter.ts:146-152` both go; `/about` becomes a member
route as §1 requires ("About is a quiet trailing destination, not Picker's permanent right-hand
companion"). At that point:

- `defineModel<ColorModel>` (**L-6**) has no parent to bind to and is **replaced by
  `inject(COLOR_MODEL_KEY)`** — the transport the sibling `ColorSpaceSelector` has used since
  S.W2. Three files stop carrying a whole-model round trip for one enum.
- `inject(CSS_COLOR_KEY)!` (**L-12**) must be audited for the standalone mount, since the picker
  is no longer guaranteed to be an ancestor. `App.vue:271` provides it at app root, so it holds —
  but it must be *asserted*, not assumed, once the route stands alone.
- **L-1/L-2 become visible to the visual audit**: `/about` enters the 15-route matrix and any
  future content gap is caught by a screenshot rather than by a seat selecting Display P3 by hand.

### M-5 — the tooltip decides what it is

Either `<TooltipContent>{{ note.notes }}</TooltipContent>` (the `notes` field is authored for all
13 covered spaces and rendered nowhere today), with the `class="contents"` removed so glass-ui's
overlay recipe can paint, and **one** `TooltipProvider` hoisted above the `v-for`; or the four
`Tooltip*` imports and the wrapper come out entirely. Shipping a mounted, portalled,
ARIA-announced empty popper is the worst of the three options.

### Net

| Deleted | Promoted |
|---|---|
| `PICKER_CHANNELS` (19 lines) | `SPACE_SCHEMA` with ranges/units/pct-reference, exported via `/color` |
| 5 × display-scale rule | one exported `formatChannelBound` |
| `colorSpaceInfo.conversions` (13 hand-authored graphs) | derived from `convertColor`'s real topology |
| `?? colorSpaceInfo.rgb` fallback | exhaustive `Record<SpaceId \| "hex", SpaceNote>` |
| positional `components[index]` join | key-addressed `channelNames[spec.key]` |
| `SPACE_GLYPHS` | `ChannelSpec`-adjacent `glyph` |
| `demo/ui/**` — 19 dirs, 29 lines | direct glass-ui subpath imports |
| `defineModel<ColorModel>` × 2 + the router's `about` case | `inject(COLOR_MODEL_KEY)` |
| `hoveredPath: string[]` | `hoveredRow: shallowRef<number \| null>` |
| 3 × `as any` / `as string` | `readonly string[]` in the signature |

The through-line is one sentence: **the library knows every fact this component displays and
exports none of them, so the demo re-declares the space contract four times and gets it wrong in
five places.** Close the library's public surface and the component becomes ~120 lines of pure
presentation with no colour knowledge of its own.

---

## 4. Reproduction assets

Probe scripts (scratchpad, not committed):

- `scratchpad/probe.mjs` — drives `?space=…&color=…` for `display-p3 / rec2020 / hex / oklch`
  and dumps the rendered Definition, Basic Information grid, Components names and Conversion
  Graph. Produces the **L-1** and **L-2** transcripts verbatim.
- `scratchpad/probe2.mjs` — reads `--card` / `--foreground` / `--well-bg` / `--glass-bg-resting`
  from the live cascade (**L-11**) and hovers a conversion row to dump the tooltip subtree
  (**L-9**).
- `scratchpad/probe3.mjs` — resolves the tier tokens through a real probe element (**L-11**
  negative proof) and captures the per-row highlight state after hovering row 0 (**L-7**).
- `scratchpad/tsprobe/probe.ts` — the standalone `tsc --ignoreConfig --strict` run proving the
  `industries as any` cast is unnecessary and the `conversions` cast is a `readonly` mismatch
  (**L-10**).

No source file was modified. No file was written outside
`docs/tranches/V/megatranche/audit/components/ColorNutritionLabel/`.
