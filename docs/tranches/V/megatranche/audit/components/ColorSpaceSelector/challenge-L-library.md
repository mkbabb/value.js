# CHALLENGE-L — library structure under `demo/color-session/ColorSpaceSelector.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, declared explicitly at spawn
by the orchestrating workflow and confirmed in this seat's environment block. The seat is
**declared, not inherited**; no defect on the model-receipt axis.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/color-session/ColorSpaceSelector.vue` (311 lines).
Dev server live at `http://localhost:9000` throughout; all browser probes read-only.

---

## Verdict

**DEFECTIVE.** The premise holds and holds hard. The component is structurally sound as *Vue*; it is
structurally wrong as a *module in a library*. Six independent boundary defects, four of them with
user-visible consequences I reproduced and screenshotted, one of which makes the product state a
false fact about color science on screen.

The single strongest finding is not a style nit: **selecting "Display P3" in this component makes
the About pane render the CIE RGB (1931) card** — wrong definition, wrong white point, wrong
creation year, wrong components — and renders the Detailed Guide section **empty**. The mechanism is
purely a library-structure one: the catalog of "which color spaces exist" has **four** independent
homes with 18 / 13 / 11 / 9 members, this component owns the largest of them, and every downstream
consumer covers its shortfall with a masking fallback or a `v-if`.

---

## 1. Import audit — every edge traced to its home

`ColorSpaceSelector.vue:102–123`:

| # | Line | Specifier | Resolves to | Verdict |
|---|------|-----------|-------------|---------|
| 1 | 102–109 | `"../ui/select"` | `demo/ui/select/index.ts` — **one line**, re-exports 8 names from `@mkbabb/glass-ui` | **VIOLATING EDGE** (§3) |
| 2 | 110 | `"@mkbabb/glass-ui/watercolor-dot"` | glass-ui published subpath | correct — and the proof that edge #1 is gratuitous |
| 3 | 111 | `"vue"` | host vue (deduped, `vite.config.ts` `dedupe`) | fine |
| 4 | 112–116 | `"./picker-color"` | `demo/color-session/picker-color.ts` | in-layer, but the module is mis-cut (§5) |
| 5 | 117–122 | `"./color-model"` | `demo/color-session/color-model.ts` | in-layer, but 3 of its 6 exports are shims (§8) |
| 6 | 123 | `"./keys"` | `demo/color-session/keys.ts` | declaration in-layer; **the provider is not** (§4) |

**`verbatimModuleSyntax` (edict 8): CLEAN.** Line 122 correctly isolates `import type
{ DisplayColorSpace }`. `npx eslint` on the component + both hosts + the barrel exits 0.

**`@mkbabb/value.js` consumption: CLEAN, and vacuously so.** This component imports the library
**not at all**. It reaches `/color` and `/css` transitively through `picker-color.ts:27,34`, which
uses the bare published subpaths (`@mkbabb/value.js/color`, `@mkbabb/value.js/css`) — specifiers a
real consumer could write. I verified the resolution rather than assuming it:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -A3 "value.js/css"
======== Resolving module '@mkbabb/value.js/css' from
         '/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts'. ========
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

Local `dist/`, not the stale transitive copy — worth checking, because `npm ls @mkbabb/value.js`
shows a **second** value.js in `node_modules` pulled in by both siblings, and its `css.d.ts` differs
from the local build (350 lines vs 382). Self-name resolution wins; no drift. **No deep-path
defect.** The dogfood claim in `tsconfig.demo.json`'s header is honest.

---

## 2. `L-1` — the catalog has four homes and no total consumer · **BLOCKER**

### The four enumerations

| Home | Members | Consumers |
|---|---|---|
| `SpaceId` — `@mkbabb/value.js/color` | 17 | the truth |
| `PICKER_SPACE_NAMES` `picker-color.ts:72` → `DISPLAY_COLOR_SPACE_NAMES` `color-model.ts:75` | 17 + `hex` = **18** | **this component** (`:150`), `AboutPane.vue:95` |
| `colorSpaceInfo` `colorSpaceInfo.ts:18` | **13** | `ColorNutritionLabel.vue:184`, `ConsoleRail.vue:99` |
| `MarkdownSpace` `AboutPane.vue:82` | **11** | `AboutPane.vue:96` |
| `INTERPOLATION_SPACES` `color-space-meta.ts:26` | **9** | `MixConfigBar.vue:18`, `GradientVisualizer.vue:19` |

This component is the **one control that drives all four**, and it offers the superset. Seven of its
18 rows have no markdown doc; five have no `colorSpaceInfo` row.

### The masking fallbacks that hide it (edict 2 — "no masking fallbacks")

```ts
// demo/scenes/about/ColorNutritionLabel.vue:212-214
return space in colorSpaceInfo
    ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
    : colorSpaceInfo.rgb;              // ← silently answers a different question
```
```ts
// demo/picker/controls/ComponentSliders/ConsoleRail.vue:174
const info = (colorSpaceInfo as any)[space];   // ← `as any` over the same hole
```
```html
<!-- demo/scenes/about/AboutPane.vue:51 -->
<Markdown v-if="activeMarkdownModule" ... />   <!-- ← renders nothing, not even the
                                                    "Oh snap…" Alert that lives INSIDE Markdown -->
```

### Reproduction (run, output pasted)

`node scratchpad/chL-css-probe.mjs` — 1600×1000, dev server, pick "Display P3" from this component:

```
ABOUT AFTER display-p3 {
 "nutrition": "Definition | A color space based on the additive mixture of red, green, and
               blue light. | Basic Information | Device Dependency: | Device-dependent |
               White Point: | Varies (typically D65) | Gamut: | Limited (device-specific) |
               Created: | 1931 | Components | Red | 0 ",
 "guide": "Detailed Guide",
 "triggers": [ "Display P3", "Display P3" ]
}
```

Screenshot: `probe-display-p3-about.png` (in this directory). Both titles read **Display P3**; the
whole card beneath reads CIE RGB 1931. Display P3 is a 2015 Apple/SMPTE-DCI derivative — the page is
stating a false fact, sourced from a fallback branch, caused by a module-ownership split.
`"guide": "Detailed Guide"` with nothing following is the empty section.

### Mechanism

`PICKER_SPACE_NAMES` — a table of *display labels* — lives at `picker-color.ts:72`, wedged between
`PICKER_CHANNELS` (channel arithmetic metadata) and `buildColor`/`withChannel` (construction math).
A label table in a math module cannot be the thing that per-space *content* is keyed against, so
every content surface grew its own key set. Nothing in the type system relates them: `colorSpaceInfo`
is an object literal, `MarkdownSpace` is a hand-written string union, `INTERPOLATION_SPACES` is an
array. Four sets, zero cross-checks, three fallbacks.

### Cure

One `SpaceCatalog` module in `color-session`, exporting **one** `readonly SpaceEntry[]` where
`SpaceEntry` carries *everything* per space — `id`, `label`, `channels`, `info`, `doc: DocModule`,
`interpolatable: boolean` — typed `satisfies Record<DisplayColorSpace, SpaceEntry>`. Adding a space
to `SpaceId` then fails to compile until its doc and info exist. Every fallback and every `as any`
above deletes. `INTERPOLATION_SPACES` becomes `CATALOG.filter(e => e.interpolatable)`.

---

## 3. `L-2` — display precision has five homes and no owner · **MAJOR**

### Measured

```
$ node scratchpad/chL-css-probe2.mjs
{ "capCount": 18,
  "truncatedCount": 16,
  "sampleCap": { "text": "rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)",
                 "scrollW": 653, "clientW": 234 },
  "distinctDotSignatures": 1 }
```

**16 of 18 specimen lines are clipped**; the sample needs 653 px in a 234 px box — 64 % of the text
is unreadable. `probe-catalog-open.png` shows what the user gets: `hsl(346.045357898758d…`. The
specimen row's stated purpose (`:55–57` "live per-space conversion") is defeated in 89 % of rows.

### The five homes

| Site | Rule | Live? |
|---|---|---|
| `src/css/grammar.ts:285` | `Number(value.toFixed(12)).toString()` | **yes** — this is what ships to screen |
| `color-model.ts:67` `toCSSColorString(color, _digits = 2)` | declared, **ignored** (underscore param); 3 callers, none passes it | dead |
| `useColorPipeline.ts:28` `const DIGITS = 2` + `:331` returned | **zero importers/destructurers repo-wide** | dead |
| `useSliderGradients.ts:14` `const DIGITS = 2` | second copy of the same constant | live, local |
| `ColorSpaceSelector.vue:163` `Number(channel.toFixed(4))` | applies to the **non-CSS** branch only | live |
| `ColorComponentDisplay.vue:109` `fmt.value.toFixed(d)` | third rule, same header row | live |

`specimenFor` (`:154–166`) is therefore a **dual formatter inside one 12-line function**: the
`CSS_PICKER_SPACES` branch returns `serializePickerColor(converted)` at 12 digits; the fall-through
branch rounds to 4. The DOM proves it in adjacent rows:

```
"HSV"  → "hsv · 346.0454 · 0.6279 · 1.511"                       ← 4 digits
"HSL"  → "hsl(346.045357898758deg -1295.152156124318% ... )"     ← 12 digits
```

And the picker header in `probe-display-p3-about.png` reads `1.0, 0.6, 0.8` (1 decimal,
`ColorComponentDisplay`) for the *same color in the same space* whose specimen row reads
`color(display-p3 1.402321458483 0.628430810501 0.790516044279 / 82.7%)`. One color, one screen,
three precisions.

### This is a library-surface defect, quoted from the spec

`docs/tranches/V/ARCHITECTURE.md:245` freezes the public signature:

> `/css` owns `parseCssColor(source: string): ParseResult<CssColor>`,
> `serializeCssColor(color: CssColor): Result<string,ColorIssue>` … **and no library-wide string
> serializer exists.**

and `:217`:

> `/css` never emits the library-only `hsv`, `kelvin`, `ictcp` or `jzazbz` functions … **There is no
> general library-string serializer, implicit output-space choice or browser/WAAPI fallback.**

The library *deliberately* declines to own display serialization. That is a defensible library
decision — but it means **the demo must own it in exactly one place**, and instead the demand
scattered into five, four of which are dead or partial, and the live one is a `<script setup>`
function whose overflow is handled by a Tailwind `truncate` class.

### Cure

`color-session/format.ts` — one module, one function:
`formatColorForDisplay(color: AnyColor, opts: { digits: number }): string`, total over all 17 spaces
+ `hex`, gamut-projected. `specimenFor` becomes a one-line call. `toCSSColorString`,
both `DIGITS` constants, and `ColorComponentDisplay`'s local rule all collapse into it.

---

## 4. `L-3` — out-of-gamut specimen values ship to screen · **MAJOR**

The same probe, verbatim rows (default color is `lab(92% 88.8 20 / 82.7%)`, far outside sRGB):

```
"RGB"          → rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)   R > 255
"HSL"          → hsl(346.045357898758deg -1295.152156124318% 103.662622110611% / 82.7%)  s = −1295 %
"HWB"          → hwb(346.045357898758deg 56.226092874351% -51.09915134687% / 82.7%)      b < 0
"sRGB Linear"  → color(srgb-linear 2.580409706575 0.276260750926 0.575271696508 / 82.7%)
"Display P3"   → color(display-p3 1.402321458483 0.628430810501 0.790516044279 / 82.7%)
```

`rgb(385 …)` and `hsl(… -1295% …)` are not CSS. They would not parse. The component emits them as
its user-facing statement of "your color, in this space".

`picker-color.ts:195` already exports `clampPickerColor`, and `:119` `mapPickerOklabToSrgb` wraps the
library's `mapColorToGamut`. Neither is on this path. `specimenFor` calls `convertPickerColor` →
`serializePickerColor` with no projection step. **The gamut decision has no home either** — it is a
per-callsite choice, and this callsite never made one.

Reproduction: open `http://localhost:9000/#/`, click the color-space title, read any row.

---

## 5. `L-4` — `../ui/select`: the ARCHITECTURE authority names this defect by name · **MAJOR**

`demo/ui/select/index.ts` is **one line**:

```ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
```

19 sibling directories, all the same shape (`avatar`, `badge`, `button`, `card`, `checkbox`,
`collapsible`, `dialog`, `dropdown-menu`, `input`, `label`, `popover`, `radio-group`, `select`,
`separator`, `skeleton`, `slider`, `switch`, `tooltip`; `alert` adds a comment and is still a
re-export). Zero local implementations.

`docs/tranches/V/ARCHITECTURE.md:37` — the tranche-V authority, verbatim:

> Route leaves live with their feature. There is no `panes/` dumping ground, `demo/@`, TS/Vite
> project alias, `@src`, or **one-line glass-ui forwarding directory**.

And the declared lattice, `ARCHITECTURE.md:50–53`:

```
app            → shell / color-session / feature / platform / shared
shell          → color-session / platform / shared
feature        → color-session / own descendants / platform / shared / published packages
color-session  → platform / shared / published packages
```

`color-session → ui` is **not an admitted edge**. `ColorSpaceSelector.vue:109` is the *only*
`color-session` file that draws it:

```
$ grep -rn '"\.\./ui/' demo/color-session/
demo/color-session/ColorSpaceSelector.vue:109:} from "../ui/select";
```

The same file imports the same producer *correctly* eleven lines later
(`@mkbabb/glass-ui/watercolor-dot`, `:110`). **Two idioms for one producer, one line apart** — which
is exactly the dual-path shape edict 2 forbids and is dispositive that the barrel buys nothing.

Secondary: glass-ui ships **67 subpath exports** including `./select` (`dist/select.js`, 260 B); the
barrel forwards through the **root** `@mkbabb/glass-ui` (`dist/glass-ui.js`, 25 239 B). `sideEffects`
is `["*.css"]` so the production build tree-shakes it — I make **no bundle-size claim** — but the
demo declares a dependency on the whole design system to obtain a Select, and dev-graph transform
cost is unmeasured, not zero.

**Cure:** delete `demo/ui/` entirely (19 directories, 19 files); every consumer imports the glass-ui
subpath directly. `shared/ui/` in the target tree is reserved for "only genuinely app-owned controls
with 2+ consumers" (`ARCHITECTURE.md:31`) — forwarding is not that.

---

## 6. `L-5` — inverted edge: `color-session` hard-injects an app-boot provider · **MAJOR**

```ts
// ColorSpaceSelector.vue:134
const safeAccent = inject(SAFE_ACCENT_KEY)!;         // ← no default, non-null asserted
// ColorSpaceSelector.vue:142  (eight lines later)
const colorModel = inject(COLOR_MODEL_KEY, null);    // ← default, null-tolerant, documented
```

`SAFE_ACCENT_KEY` is *declared* in `color-session/keys.ts:9` but **provided in exactly one place**:

```
$ grep -rn "provide(SAFE_ACCENT_KEY" demo/
demo/color-picker/composables/boot/useAtmosphereBoot.ts:91:    provide(SAFE_ACCENT_KEY, safeAccentCss);
```

`demo/color-picker/` is the app composition root (`ARCHITECTURE.md:11` names its successor
`demo/app/`). So the runtime dependency edge is **`color-session → app boot`** — the exact inversion
the lattice forbids, and the exact inversion an eslint rule was written to prevent:

```js
// eslint.config.js:275-286
files: [ "demo/@/composables/**/*.ts", "demo/@/composables/**/*.vue" ],
… group: ["**/color-picker/**"],
  message: "G-DEMO-1: the shared color layer … must never import app-root boot …"
```

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ find demo/@ -type f | wc -l
       0
```

**All three demo boundary rules (G-DEMO-1, G-DEMO-3a, G-DEMO-3b) match zero files.** The W43/RF-15
restructure moved `demo/@/composables` → `demo/color-session` and `demo/@/components` →
`demo/picker`, `demo/shell`, `demo/workbenches`; the eslint globs were never repointed. The demo's
module lattice is enforced by **nothing**. That is why this edge exists and why nothing caught it.

The `!` is also a type-system lie: `inject` with no default returns `T | undefined`. It does not
crash — `:style="{'--space-title-ink': undefined}"` sets no property, `var(--space-title-ink)` with
no fallback makes each declaration invalid at computed-value time, `color` falls back to `inherit`,
and the entire W4-1 affordance grammar (rest ink, hover deepen, underline, open-state hold) silently
disappears. The component's own comment at `:139–141` promises graceful degradation for
`COLOR_MODEL_KEY` and delivers silent-but-styleless for `SAFE_ACCENT_KEY`. Two injection policies in
eight lines.

**Cure:** repoint the three eslint `files` globs at the real tree
(`demo/color-session/**`, `demo/picker/**`, …) and ban `demo/color-picker/**` from `color-session`
— it will fail immediately, which is the point. Then either (a) pass `safeAccent` as the same kind
of prop `cssColor` already is, or (b) provide `SAFE_ACCENT_KEY` from a `color-session`-owned
composable that boot merely seeds. (a) is KISS and needs no new module.

---

## 7. `L-6` — the "switch space" operation has no home · **MAJOR**

The canonical operation exists:

```ts
// demo/color-session/useColorPipeline.ts:170-173
const updateToColorSpace = (to: PickerSpace) => {
    const color = convertPickerColor(model.value.color, to);
    setCurrentColor(color, model.value.selectedColorSpace);
};
```

**This component never calls it.** Its exactly-one caller is a watcher in the picker:

```
$ grep -rn "updateToColorSpace" demo/
demo/color-session/useColorPipeline.ts:170:    const updateToColorSpace = (to: PickerSpace) => {
demo/color-session/useColorPipeline.ts:324:        updateToColorSpace,
demo/picker/ColorPicker.vue:214:    updateToColorSpace,
demo/picker/ColorPicker.vue:352:        updateToColorSpace(resolveColorSpace(newVal));
```

The actual flow is: component `emit("update:modelValue")` → **each host writes state its own way** —
`ColorPicker.vue:43` `updateModel({ selectedColorSpace: colorSpace })`, `AboutPane.vue:24`
`model = { ...model, selectedColorSpace: colorSpace }` — → `ColorPicker.vue:348–354` observes the
state change and *then* performs the conversion.

So the conversion is a **side effect of a watcher owned by one of the two hosts**. `AboutPane` has no
equivalent. Today both panes are mounted against the one App-provided pipeline
(`App.vue:257 provide(COLOR_MODEL_KEY, pipeline)`), and panes are `<KeepAlive>`d
(`demo/shell/PaneSlot.vue:120`) so the picker's watcher survives a mobile pane switch — **the About
selector works only because the Picker is alive.**

`ARCHITECTURE.md:41` states the target explicitly: "About is a quiet trailing destination, **not
Picker's permanent right-hand companion**", with `/about` a first-class route. *(Labelled
**HYPOTHESIS**: I did not stand up a picker-free `/about` route, so the break is predicted from the
call graph, not reproduced. The call-graph facts above are all verified.)*

**Cure:** the component calls the pipeline operation directly — `colorModel.updateToColorSpace(space)`
— and stops emitting a state-write for hosts to reinvent. Both hosts lose their handler; the picker
loses its watcher. One command, one home, zero host-specific write mechanics.

---

## 8. `L-7` — god-surface injection: 1 of 38 · **MAJOR**

`COLOR_MODEL_KEY` is typed `InjectionKey<UseColorPipelineReturn>` (`keys.ts:7`).
`useColorPipeline`'s return object has **38 keys** (`useColorPipeline.ts:265–332`, counted). This
component consumes **one**: `colorModel.model.value.color` (`:156`, `:158`).

Edict 1 is "no god modules — focused modules with real encapsulation". A 38-key composable injected
app-wide as a single symbol is the god module, and every consumer that touches it — this one at 2.6 %
utilisation — is coupled to all 38. `DIGITS` is in that return (`:331`) with zero consumers, which is
what a bag looks like from the inside.

**Cure:** split `COLOR_MODEL_KEY` into role-scoped keys — `CURRENT_COLOR_KEY`
(`ComputedRef<PickerColor>`), `COLOR_COMMANDS_KEY` (the mutation surface), `COLOR_NAMING_KEY`. This
component injects `CURRENT_COLOR_KEY` + `COLOR_COMMANDS_KEY` and nothing else. No new directory, no
wrapper component — three symbols in the file that already holds five.

---

## 9. Minor findings

**`L-8` · `tag="div"` is a dead prop from a retired glass-ui API.** `ColorSpaceSelector.vue:82`
passes `tag="div"` to `WatercolorDot`. glass-ui 7.0.0's prop list is exactly
`{ color, variant, animate, cycleDuration, range, seed }`
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:24–51`) — no
`tag`. Measured in the live DOM: `{"dotTag": "SPAN", "dotHasTagAttr": false}`. It renders a span, the
attribute does not even land. A stale producer-API call that survived the W44 glass-7 adoption —
edict 2, "no legacy code". *Delete the attribute.*

**`L-9` · eighteen identical WatercolorDots.** Every row binds the same `:color="cssColor"`
(`:83`) and passes no `seed`. Measured: `"distinctDotSignatures": 1` — all 18 dots share one
`border-radius` silhouette and one background. The producer's own doc warns against exactly this:
"The filter `seed` is per-instance off `hashString(color + seed)` so each dot's wet edge is uniquely
displaced (**no twelve-clones**)". Visible in `probe-catalog-open.png`. The swatch conveys zero
information — the one case where it *would* differ (out-of-gamut projection per space) is the case
§4 shows is never computed. *Either seed per row and paint the space's own projected color, or drop
the dot.*

**`L-10` · a missing glass-ui variant, implemented in the consumer.** `SelectTriggerProps` is
exactly `{ disabled, class, variant: "default"|"ghost", size: "sm"|"default" }`
(`dist/components/select/SelectTrigger.vue.d.ts:2–9`). The 110-line scoped block (`:169–311`)
overrides the producer's `font-size`, `font-weight`, `gap`, `padding`, `margin`, reaches into
producer internals twice (`.space-trigger :deep(svg)` `:239`, `.space-trigger > :deep(span)` `:249`),
and re-pins `font-weight` against a glass-ui `@utility` hardcode (`:300`). The component's own
comments book **three** producer swaps — "BOOKED SWAP: retires onto the P10 SelectTrigger size
station" (`:199`), "the P10 weight-tokenization booked swap" (`:212`), the em-relative caret
(`:235`). Edict 4/5: this is a `variant="title"` (or a display size rung) that belongs in glass-ui's
`SelectTrigger`, carried in the consumer with three IOUs.

**`L-11` · `color-model.ts` is three-sixths shim.** `colorToHexString` (`:61`) is
`return pickerColorToHex(color)` — a pure rename with 5 callers. `toCSSColorString` (`:67`) is
`return serializePickerColor(color)` with a dead `_digits = 2` (no caller passes it; verified by
grep over all 3 sites). `CSS_NATIVE_SPACES = CSS_PICKER_SPACES` (`:58`) has **zero consumers
repo-wide**. Three aliases; edict 2. This component imports one of them (`:119`) when
`pickerColorToHex` is already in the module it also imports.

**`L-12` · two v-model idioms and three `any` sites.** `modelValue` uses the pre-3.4 prop+`emit`
pair (`:125`, `:146–148`) while `open` uses `defineModel` (`:144`) — two mechanics in one 45-line
script (edict 7). Because the prop is typed `string` rather than `DisplayColorSpace`, every host
writes a cast: `:11` `(colorSpace: any)`, `ColorPicker.vue:43` `(colorSpace: any)`,
`AboutPane.vue:24` `(colorSpace: any)`. A fourth hole at `:91`, `space as DisplayColorSpace`,
because `Object.entries` (`:150`) erases the key type. `defineModel<DisplayColorSpace>()` plus a
typed catalog array (§2) kills all four. `npx eslint` is green on all of them — nothing guards this.

**`L-13` · `cssColor` is a redundant transport.** The prop (`:126`) originates from the same pipeline
the component already injects: `ColorPicker.vue:201` destructures `cssColor` from
`inject(COLOR_MODEL_KEY)`, and About receives it prop-drilled three hops
(`App.vue:340 cssColor: () => cssColor.value` → `usePaneRouter.ts:98,150` → `AboutPane` prop →
child). One datum, two transports into one component, one of which drags a 3-hop drill through the
shell router.

**`L-14` · `tsconfig.demo.json` `paths` has drifted off the exports map.** The map is exactly
`./color ./value ./css ./easing ./math ./transform ./quantize`. `tsconfig.demo.json:41–49` lists
`@mkbabb/value.js` (root), `/parsing` and `/units` — all three targets **missing**
(`dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts`: verified absent) — and
**omits** `/css` and `/value`. Harmless today (self-name resolution covers the gap, §1), but the Vite
side is *generated* from `package.json#exports` (`vite.config.ts:41–52`) while the TS side is
hand-maintained. The asymmetry is the defect. *Generate both, or drop the `paths` block entirely and
let self-name resolution do it.*

**`L-15` · a third and fourth color-space `<Select>`.** `MixConfigBar.vue:99–118` and
`GradientVisualizer.vue:181–194` are near-identical inline implementations of "choose a color space",
reading `INTERPOLATION_SPACES` instead of `DISPLAY_COLOR_SPACE_NAMES`, and narrowing with
`(v: AcceptableValue) => v as PickerSpace` instead of `(colorSpace: any)`. Three implementations, two
data sources, two cast idioms, one concept.

---

## 10. Greenfield module lattice

No legacy, no compatibility. Concretely:

```text
@mkbabb/value.js/{color,css}          ← unchanged, published, correct
        ▲
demo/color-session/
  space-catalog.ts     THE ONE catalog. `readonly SpaceEntry[]`, satisfies
                       Record<DisplayColorSpace, SpaceEntry>. Carries id · label ·
                       channels · info · doc · interpolatable. Absorbs
                       PICKER_SPACE_NAMES, DISPLAY_COLOR_SPACE_NAMES, colorSpaceInfo,
                       MarkdownSpace, INTERPOLATION_SPACES. Adding a SpaceId
                       fails to compile until its content exists.
  color-ops.ts         convert · clamp/gamut-project · construct · channel access.
                       picker-color.ts minus its label table and minus its error class.
  format.ts            formatColorForDisplay(color, {digits}) — total over 18 spaces,
                       gamut-projected. THE ONLY precision authority. Absorbs
                       toCSSColorString, both DIGITS, specimenFor's inline branches,
                       ColorComponentDisplay's local rule.
  session/             the pipeline, SPLIT: state · commands · naming · persistence.
                       Three role-scoped InjectionKeys, never one 38-key symbol.
  ColorSpaceSelector.vue

demo/ui/               ← DELETED. 19 one-line forwarding directories; every consumer
                         imports the glass-ui subpath. ARCHITECTURE.md:37 already
                         rules this.

@mkbabb/glass-ui/select
  SelectTrigger  variant: "default" | "ghost" | "title"   ← the new variant absorbs
                 ColorSpaceSelector's 110-line scoped block and discharges all three
                 BOOKED SWAPs. Consumer keeps only --space-title-ink.
```

`ColorSpaceSelector.vue` after transposition, in full:

```vue
<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue }
    from "@mkbabb/glass-ui/select";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { inject } from "vue";
import { SPACE_CATALOG } from "./space-catalog";
import { formatColorForDisplay } from "./format";
import { CURRENT_COLOR_KEY, COLOR_COMMANDS_KEY, SAFE_ACCENT_KEY } from "./keys";
import type { DisplayColorSpace } from "./space-catalog";

const { inline = false } = defineProps<{ inline?: boolean }>();
const space = defineModel<DisplayColorSpace>({ required: true });
const open  = defineModel<boolean>("open", { required: true });

const color    = inject(CURRENT_COLOR_KEY)!;
const commands = inject(COLOR_COMMANDS_KEY)!;
const accent   = inject(SAFE_ACCENT_KEY)!;
</script>
```

Zero `any`. Zero casts. Zero local formatting. Zero `:deep()`. No `cssColor` prop, no
`update:modelValue` handler in either host, no watcher in `ColorPicker.vue`. Both `emit`s die.
`specimenFor` becomes `formatColorForDisplay(convert(color, entry.id), { digits: 4 })` — one call,
one rule, gamut-projected, and the specimen line becomes readable in all 18 rows.

Nothing above needs a new `shared/` directory or a wrapper component; three of the four new modules
are files that already exist, correctly re-cut.

---

## Evidence index

| Artefact | Location |
|---|---|
| Catalog open, 12-digit truncation, 18 clone dots | `probe-catalog-open.png` (this directory) |
| Display P3 selected — CIE RGB 1931 card, empty guide | `probe-display-p3-about.png` (this directory) |
| Both hosts at rest (mega-tranche capture) | `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png` |
| Probe scripts (read-only, scratchpad) | `chL-css-probe.mjs`, `chL-css-probe2.mjs` |

Note on the mega-tranche visual audit: its 15-route matrix
(`docs/tranches/V/megatranche/audit/visual/REPORT.md`) captures `/#/` — where **both** instances of
this component live — but has **no `/about` row**, and no capture opens a dropdown. Every defect in
§2–§4 is invisible to that harness: 0 pageErrors, 0 consoleErrors, 0 blankOrNearBlank on the route
that renders a false color-science card. That is a coverage note for the harness, not a defect of
this component.

## Compliance with this seat's write law

Wrote only under `docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/` (this file + 2
PNGs). Scratchpad scripts under the session scratchpad. **No source edits.** No `src/`, `demo/`,
`api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/**`, `scripts/dev/dev.sh`, or `INBOX.md` touched.
