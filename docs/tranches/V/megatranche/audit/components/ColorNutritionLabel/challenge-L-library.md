# CHALLENGE-L — library structure · `demo/scenes/about/ColorNutritionLabel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]` — the tier
declared at spawn. The seat is declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/scenes/about/ColorNutritionLabel.vue`, 242 lines, area `scenes`, sole consumer
`demo/scenes/about/AboutPane.vue:43`, sole route `/#/about`.

Live probes ran against the dev server at `http://localhost:9000` as standalone Chromium scripts
(`node_modules/playwright-core@1.60.0`) — the Playwright MCP browser profile was held by another
seat (`Error: Browser is already in use for .../mcp-chrome-83447af`), so I drove a private
instance. Every probe is read-only navigation.

**Verdict: DEFECTIVE.** The premise holds and is worse than "wrong boundaries". The fact this
component exists to publish — *what a color space is and what its channels range over* — is
declared in **five** places across two packages, none of which owns it; two of those declarations
**contradict each other on the same rendered page**; a third prints 1931 CIE RGB science under the
heading "Display P3"; and the demo-side adapter that exists only because the library publishes no
consumer surface for that fact **blanks the entire application** on three separate color values
the library is contractually required to accept and, in one case, to *emit*.

> Note on provenance: a `challenge-L-library.md` written earlier today (11:41) already occupied
> this path. I did not read it until after my own trace and probes were complete. Its findings
> L-1/L-2/L-3/L-4/L-5/L-6/L-8 converge independently with mine and I have re-verified each from
> source before restating it here; this document supersedes it as a superset — the whole-app blank
> (§L-2), the cross-package on-screen contradiction (§L-3.4), the missing contrast predicate
> (§L-11) and the `/about` evidence hole (§L-14) are new.

---

## 0. The import graph, edge by edge

`ColorNutritionLabel.vue:167-184`:

| Specifier | Resolves to | Edge on the ratified lattice (`docs/tranches/V/ARCHITECTURE.md:47-56`) | Legal? |
|---|---|---|---|
| `vue` | external | — | yes |
| `../../color-session/keys` | `demo/color-session/keys.ts` | feature → color-session | yes |
| `../../color-session/useContrastSafeColor` | `demo/color-session/useContrastSafeColor.ts` | feature → color-session | yes (but §L-11) |
| `../../color-session/ink` | `demo/color-session/ink.ts` | feature → color-session | yes (but §L-11) |
| `../../color-session/picker-color` | `demo/color-session/picker-color.ts` | feature → color-session | yes (but §L-3) |
| `../../color-session/color-model` | `demo/color-session/color-model.ts` | feature → color-session | yes |
| `../../color-session/colorSpaceInfo` | `demo/color-session/colorSpaceInfo.ts` | **wrong home** — §L-3 | no |
| `../../ui/separator`, `../../ui/tooltip`, `../../ui/alert` | `demo/ui/*/index.ts` | **not a node on the lattice** — §L-4 | no |
| `@lucide/vue` | external devDependency | published package | yes |

### Negative proof — the published `@mkbabb/value.js` surface is consumed correctly

This is the one structural thing that is right, and it is right *by construction*:

```
$ grep -rhn "@mkbabb/value.js" demo --include="*.ts" --include="*.vue" | sed 's/.*from //' | sort | uniq -c
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";

$ grep -rn "@src\|value\.js/src\|\.\./\.\./\.\./src/" demo --include="*.ts" --include="*.vue"
(no output)
```

All five specifiers are keys of `package.json#exports` (`package.json:20-47`). Zero deep paths
into `src/`. The subject component reaches the library only transitively, through
`color-session`. There is no demo import a real consumer could not write. **This must survive
every transposition below unchanged.**

The defect is not that the demo reaches *past* the public surface. It is that the public surface
**withholds the one thing this component is built to display**, so the demo re-declares it — five
times, inconsistently.

---

## 1. Findings

### L-2 · BLOCKER — three legal CSS colors blank the entire application

The demo's library-boundary adapter converts the library's failure-explicit `Result` protocol into
uncaught exceptions at the top of the render tree. `demo/color-session/picker-color.ts:104-107`:

```ts
function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw new PickerColorError(result.error.code);
}
```

and `picker-color.ts:152-158`:

```ts
export function channelNumber(color: AnyColor, key: string): number {
    const index = PICKER_CHANNELS[color.space].findIndex((meta) => meta.key === key);
    if (index < 0) throw new PickerColorError(`Unknown ${color.space} channel: ${key}`);
    const value = color.channels[index];
    if (typeof value !== "number") throw new PickerColorError(`Missing ${color.space}.${key}`);
    return value;
}
```

`ARCHITECTURE.md:84` fixes `Channel = number | "none"` as part of the **final object model** —
`"none"` is "the sole missing-component sentinel … cross-realm-stable". `ARCHITECTURE.md:217`
requires the library to *emit* hue `"none"` whenever chroma is powerless (`OKLCH c<=0.000004`).
The demo aliases `export type PickerColor = AnyColor` (`picker-color.ts:36`) — asserting the demo
handles the whole library type — and then supplies functions that are **partial over it and throw**.

Reproduction (probe `probe-cnl4.mjs`, four navigations, pasted verbatim):

```
### E · PICKER route, L=none
   url=http://localhost:9000/#/?space=oklch&color=oklch(none%200.1%20200)
   {"bodyLen":0,"first80":"","rootChildren":0}
   errors=["pageerror: color_missing_channel"]
### F · ABOUT route, hue=none (powerless, legal)
   url=http://localhost:9000/#/about?space=oklch&color=oklch(0.6%200%20none)
   {"bodyLen":0,"first80":"","rootChildren":0}
   errors=["pageerror: Missing oklch.h"]
### G · ABOUT route, chroma=none
   url=http://localhost:9000/#/about?space=oklch&color=oklch(0.6%20none%20200)
   {"bodyLen":0,"first80":"","rootChildren":0}
   errors=["pageerror: color_missing_channel"]
### H · ABOUT route, control (valid)
   url=http://localhost:9000/#/about?space=oklch&color=oklch(0.6%200.1%20200)
   {"bodyLen":1905,"first80":"→ Home Tools Login @mbabb dev misconfigured — run `npm run dev` OKLCh 60.0 % , 0","rootChildren":6}
   errors=[]
```

`rootChildren: 0` — `#app` is **empty**. Not a broken pane: the whole SPA fails to mount. Case F
is the sharpest: `oklch(0.6 0 none)` is a value the library's own contract says it will hand back
to a caller who converts an achromatic color to OKLCH. The demo cannot render its own library's
output.

The subject component sits directly on this surface: `ColorNutritionLabel.vue:219` indexes
`PICKER_CHANNELS[...]`, and `ink.ts:45-49` (reached from `ColorNutritionLabel.vue:208`) has the
identical partiality — `if (L === "none") throw new Error("Ink color is missing lightness")`.

**Attribution.** The crash is in `color-session`, not in the `.vue` file, and fires on `/#/` too
(case E). It belongs to this seat because it is *caused by the boundary*: the throwing adapter
exists only to bridge a `Result`-shaped library to a component tree, and it does so by discarding
the exact property the library was designed around.

**Cure (transposition, not patch).** Delete `valueOrThrow`. The demo resolves `"none"` **once**, at
the parse/restore boundary, into a `ResolvedColor` type whose channels are `number` — a real,
narrower type, not an alias claiming to be `AnyColor`. Everything downstream (`channelNumber`,
`withChannel`, `ink.ts`) then becomes total by construction and needs no throw. If the library
wants to help, `/color` should publish `resolvePowerless(color): Result<Color<S>, ColorIssue>`
rather than leaving every consumer to invent the same lowering.

---

### L-3 · BLOCKER — "the channels of a color space" has five declarations and no owner

The single fact `ColorNutritionLabel`'s **Components** section renders — channel name, minimum,
maximum, unit — is declared independently in five places:

| # | Site | Form | Owns |
|---|---|---|---|
| 1 | `src/color/model.ts:56-74` `SPACE_SCHEMA` | `{channels: string[], hueIndex?, css}` | channel **keys** only |
| 2 | `src/css/grammar.ts:184-220` | inline literals `255`, `360`, `125`, `150`, `0.4`, `1` | percentage references |
| 3 | `demo/color-session/picker-color.ts:52-70` `PICKER_CHANNELS` | `{key,min,max,unit,hue?}` ×17 | physical ranges + units |
| 4 | `demo/color-session/colorSpaceInfo.ts` `.components` | prose arrays ×13 | display names |
| 5 | `assets/docs/*.md` `### Attributes` | markdown bullets ×11 | prose ranges |

`ARCHITECTURE.md:153` assigns the whole job to exactly one of them:

> `SPACE_SCHEMA satisfies Record<SpaceId, SpaceSchema>` is the one authority for **tuple keys,
> physical ranges, normalization, accepted/canonical units**, factory identity, syntax family and
> anchor pair.

The shipped `SPACE_SCHEMA` (`src/color/model.ts:50-74`) carries `{channels, hueIndex?, css}` and
**nothing else** — no range, no unit, no normalization. The ranges the architecture assigns to it
live instead as bare numeric literals inside the CSS parser, which the same document forbids by
name (`ARCHITECTURE.md:110`: *"`SPACE_SCHEMA` freezes unit normalization as conversion math, **not
parser folklore**"*):

```
$ grep -n "125\|360\|255\|0\.4\b\|150" src/css/grammar.ts | sed -n '1,8p'
148:            case "turn": return value * 360;
184:        const values = components.map((part) => channelToken(part, 255));
190:        const values = [channelToken(components[0]!, 360, true), channelToken(components[1]!, 1), channelToken(components[2]!, 1)];
202:        const values = [channelToken(components[0]!, 100), channelToken(components[1]!, 125), channelToken(components[2]!, 125)];
208:        const values = [channelToken(components[0]!, 100), channelToken(components[1]!, 150), channelToken(components[2]!, 360, true)];
214:        const values = [channelToken(components[0]!, 1), channelToken(components[1]!, 0.4), channelToken(components[2]!, 0.4)];
```

`src/subpaths/color.ts` exports **neither** `SPACE_SCHEMA` nor `SPACE_IDS`. A consumer who wants
the channel table has no way to get it — so the demo wrote its own (#3), and the About page
publishes *the demo's copy* as if it were the library's contract.

#### L-3.4 — the copies disagree, one scroll apart, on the same route

`/#/about` renders the nutrition label (source #3) directly above the "Detailed Guide" markdown
(source #5). They contradict:

| Space | Nutrition label (`PICKER_CHANNELS`) — **measured live** | Detailed Guide (`assets/docs/*.md`) | Library contract (`ARCHITECTURE.md:88-106`) |
|---|---|---|---|
| `rgb` | `Red 0 to 255` | `` `R`: Red component (0 to 1) `` | `[r,g,b]`, each **0–255** → markdown is **wrong** |
| `hsv` | `h 0deg to 360deg` | `` `H`: Hue (0 to 1) `` | h **0–360** → markdown is **wrong** |
| `oklch` | `C (Chroma) 0 to 0.5` | `` `C`: Chroma (0 to ~0.4) `` | raw **0–0.5**, `%` reference **0.4** — both half-right |
| `lch` | `C (Chroma) 0 to 150` | `` `C`: Chroma (0 upward) `` | **0–150** |
| `lab` | `L* (Lightness) 0% to 100%` | `` `L*`: Lightness (0 to 100) `` | 0–100 |

Measured (probe `probe-cnl3.mjs`, case B, `?space=rgb&color=rgb(128 80 176)`):

```
 "rows": ["Red0 to 255", "Green0 to 255", "Blue0 to 255"]
```

against `assets/docs/rgb.md`:

```
-   `R`: Red component (0 to 1)
```

Two answers to one question, 400px apart, in a component whose entire purpose is to be
authoritative about color science. The `oklch` row is the most instructive: neither copy models
the distinction the library actually makes (physical range vs. percentage reference), so both are
incomplete and the disagreement is *unresolvable at the demo layer* — proof that the fact does not
belong there.

**Cure.** Widen `SPACE_SCHEMA` to what `ARCHITECTURE.md:153` already promises —
`{channels: readonly ChannelSchema[], hueIndex?, css}` with
`ChannelSchema = {key, min, max, unit, percentReference?}` — export it and `SPACE_IDS` from
`/color`, and make `src/css/grammar.ts` **read** it instead of restating it. `PICKER_CHANNELS`,
`CSS_PICKER_SPACES` and the five scale-rule copies (§L-5) then delete outright, and the
`### Attributes` blocks in `assets/docs/*.md` delete because the label above already renders the
same facts from the one source. One fact, one home, one render.

---

### L-1 · MAJOR — the masking fallback prints 1931 CIE RGB science under the heading "Display P3"

`ColorNutritionLabel.vue:210-215`:

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;          // ← masking fallback
});
```

`colorSpaceInfo` (`demo/color-session/colorSpaceInfo.ts:17-334`) is declared `as const` with **no
`satisfies`**, so nothing checks it for totality. It has 13 keys. `DisplayColorSpace` has 18
(`SpaceId` ×17 + `"hex"`). The five missing keys — `srgb-linear`, `display-p3`, `a98-rgb`,
`prophoto-rgb`, `rec2020` — are all selectable: `ColorSpaceSelector.vue:150` builds its item list
from `Object.entries(DISPLAY_COLOR_SPACE_NAMES)`, which is `{...PICKER_SPACE_NAMES, hex}` =
all 18 (`color-model.ts:75-78`).

Compare with the sibling table `PICKER_CHANNELS`, which **is** guarded —
`picker-color.ts:70`: `} satisfies Record<SpaceId, readonly ChannelMeta[]>` — and is therefore
complete. The two tables describing the same 17 spaces have different totality regimes, ten
lines apart in the same directory.

Measured (probe `probe-cnl3.mjs`, case A):

```
### A · display-p3
 "title": "Display P3",
 "definition": "DefinitionA color space based on the additive mixture of red, green, and blue light.",
 "device": "Device-dependent",
 "white": "Varies (typically D65)",
 "gamut": "Limited (device-specific)",
 "created": "1931",
 "rows": ["Red0 to 1", "Green0 to 1", "Blue0 to 1"]
```

Screenshot: `about-display-p3.png` (regenerable — see §4). The plate title reads *Display P3*;
under it, **Gamut: Limited (device-specific)**, **Created: 1931**, and a Conversion Graph of
`RGB→XYZ`, `RGB→Kelvin`, `RGB→HSL`, `RGB→Hex`. Every stated fact is false for the named space:
ProPhoto RGB is D50 (`ARCHITECTURE.md:103`), Rec.2020 is a wide gamut, sRGB-linear is not
"device-specific limited". Identical output for `rec2020`, `prophoto-rgb`, `a98-rgb`,
`srgb-linear` (probe `probe-cnl2.mjs`, all five cases).

Note the hybrid: the **Components** rows are *correct* (`0 to 1`, from the guarded
`PICKER_CHANNELS`) while everything around them is *wrong* (from the unguarded `colorSpaceInfo`).
The card is half-true, which is worse than uniformly broken — nothing on screen signals which half.

This is edict 2 (no masking fallbacks) in its most literal form: `: colorSpaceInfo.rgb` converts a
compile-time gap into a plausible-looking lie.

**Cure.** Declare the record's type and let the compiler close it:
`export const COLOR_SPACE_DOCS = {...} satisfies Record<DisplayColorSpace, ColorSpaceDoc>`. The
five gaps become build errors; the `? :` fallback deletes.

---

### L-4 · MAJOR — `demo/ui/**` is nineteen one-line glass-ui forwarding directories, forbidden by name

`ARCHITECTURE.md:39`, verbatim:

> There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, **or one-line
> glass-ui forwarding directory**.

```
$ for d in demo/ui/*/; do echo "$(basename $d) | $(ls $d | tr '\n' ' ')| $(wc -l < $d/index.ts) lines"; done
alert | index.ts | 11 lines
avatar | index.ts | 1 lines
badge | index.ts | 1 lines
button | index.ts | 1 lines
card | index.ts | 1 lines
checkbox | index.ts | 1 lines
collapsible | index.ts | 1 lines
dialog | index.ts | 1 lines
dropdown-menu | index.ts | 1 lines
input | index.ts | 1 lines
label | index.ts | 1 lines
popover | index.ts | 1 lines
radio-group | index.ts | 1 lines
select | index.ts | 1 lines
separator | index.ts | 1 lines
skeleton | index.ts | 1 lines
slider | index.ts | 1 lines
switch | index.ts | 1 lines
tooltip | index.ts | 1 lines

$ cat demo/ui/separator/index.ts
export { Separator } from "@mkbabb/glass-ui";
```

Nineteen directories, nineteen files, zero implementation. `demo/ui/alert/index.ts` is 11 lines
only because 9 of them are a comment explaining that the directory used to contain something.

The lattice (`ARCHITECTURE.md:31-33`) has exactly one app-owned UI node, `shared/ui/`, defined as
*"only genuinely app-owned controls with 2+ consumers"* — and it is correctly populated
(`demo/shared/ui/` = `EmptyState.vue`, `PaneHeader.vue`). `demo/ui/` is not on the lattice at all.

It is also a **dual path** (edict 2): the demo already imports glass-ui directly 119 times, and
through the shim 48 times.

```
$ grep -rn "from \"@mkbabb/glass-ui" demo --include="*.vue" --include="*.ts" | wc -l
     119
$ grep -rl "from \"\(\.\./\)\+ui/" demo --include="*.vue" --include="*.ts" | wc -l
      48
```

`ConsoleRail.vue:90-92` does **both in adjacent lines** — `} from "../../../ui/tooltip";` then
`import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";`.

The subject component takes three of its imports through the shim
(`ColorNutritionLabel.vue:173,174-179,181`).

**Cure.** `rm -r demo/ui` and rewrite 48 files' specifiers to `@mkbabb/glass-ui`. Nineteen
directories and one whole tree level vanish; no behavior changes; the ratified sentence becomes
true.

---

### L-5 · MAJOR — the channel display-scale rule is copy-pasted five times

```
$ grep -rn "meta.unit === \"%\" && meta.max <= 1" demo src --include="*.ts" --include="*.vue"
demo/scenes/about/ColorNutritionLabel.vue:220:            const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
demo/picker/display/ColorComponentDisplay/readoutReservation.ts:98:                    const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
demo/color-session/useColorParsing.ts:98:            const display = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
demo/color-session/useSliderGradients.ts:73:                const displayed = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
demo/color-session/useSliderGradients.ts:84:            const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
```

Five copies of one predicate, in three different trees, two of them in the same file. It is a
*schema* rule ("this channel's canonical unit is a percentage of a 0–1 physical range") wearing a
`?:` disguise, and it exists only because `ChannelMeta` (`picker-color.ts:40-46`) records the
physical range but not the canonical unit the library already defines
(`ARCHITECTURE.md:88-106`, "accepted units → canonical units").

Worse, two of the five are the **same function**:

`demo/color-session/useSliderGradients.ts:82-88`
```ts
const currentColorRanges = computed(() => {
    return PICKER_CHANNELS[currentColorSpace.value].reduce((acc: Record<string, string>, meta) => {
        const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
        acc[meta.key] = `(${meta.min * scale}${meta.unit} - ${meta.max * scale}${meta.unit})`;
        return acc;
    }, {});
});
```

`demo/scenes/about/ColorNutritionLabel.vue:217-230`
```ts
const formattedRange = computed<Record<string, { min: string; max: string }>>(() =>
    Object.fromEntries(
        PICKER_CHANNELS[resolveColorSpace(model.value.selectedColorSpace)].map((meta) => {
            const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
            return [meta.key, { min: `${meta.min * scale}${meta.unit}`, max: `${meta.max * scale}${meta.unit}` }];
        }),
    ),
);
```

Same input, same reduction, same heuristic, different string punctuation. And `currentColorRanges`
is **already ambient in this component's host** — `AboutPane.vue:6-14` documents that About reads
the one App-provided pipeline via `COLOR_MODEL_KEY`, and `useColorPipeline.ts:322` returns
`currentColorRanges`. `ConsoleRail.vue:114` consumes it that way. `ColorNutritionLabel` re-derives
it from scratch instead.

**Cure.** The library's schema carries `unit`/`percentReference` (§L-3); formatting becomes one
exported `formatChannelRange(schema): {min,max}` in `color-session`, consumed by both the rail and
the label. Five copies → one.

---

### L-7 · MAJOR — a two-way whole-model binding for one enum the component never writes

`ColorNutritionLabel.vue:186`:

```ts
const model = defineModel<ColorModel>({ required: true });
```

```
$ grep -n "model\.value\s*=\|^\s*model = " demo/scenes/about/ColorNutritionLabel.vue
(no output — only the declaration on line 186)
```

The component reads exactly one field, `model.value.selectedColorSpace`, at lines 211 and 219. It
never writes. `ColorModel` (`color-model.ts:36-41`) additionally carries `color`, `inputColor` and
`savedColors[]` — three fields this component has no business holding a write channel to. The
binding is drilled `App → AboutPane (defineModel) → ColorNutritionLabel (defineModel)`.

Meanwhile the *same component* takes its other dependency by injection —
`ColorNutritionLabel.vue:188`: `const cssColorOpaque = inject(CSS_COLOR_KEY)!`. Two mechanisms for
two pieces of the same session state, in one 242-line file, and the drilled one is the
higher-privilege of the two.

**Cure.** The component's honest interface is one required prop:

```ts
const { space } = defineProps<{ space: DisplayColorSpace }>();
```

`AboutPane` passes `:space="model.selectedColorSpace"`. The component becomes pure and
independently mountable; a snapshot test over all 18 spaces becomes a five-line loop instead of a
model fixture. (The alternative — `inject(COLOR_MODEL_KEY)` like `ConsoleRail` — also works and
additionally kills §L-5, but couples a presentational card to the pipeline. Prefer the prop for
the card and let `AboutPane` own the injection.)

---

### L-8 · MAJOR — the hover highlight is a value-membership test and leaks across every row

`ColorNutritionLabel.vue:121-129`:

```vue
<div :style="hoveredPath.length && hoveredPath.includes(space as string)
        ? { backgroundColor: nodeFill, color: nodeInk } : undefined"
```

`hoveredPath` is one component-level `ref<string[]>` (line 232) shared by every
`TooltipProvider` row (lines 97-142). The predicate asks *"is this node's label a member of the
hovered path?"* — not *"is this node in the hovered row?"*. There is no row identity anywhere in
the template.

Consequence, by construction from `colorSpaceInfo.xyz.conversions` (lines 227-236): hovering
`["XYZ","RGB"]` sets `hoveredPath = ["XYZ","RGB"]`, and every one of the other seven rows
containing an `XYZ` or `RGB` node lights up simultaneously — 15 of the 20 nodes on the XYZ card.

*Labelled: CONFIRMED by construction from source; I did not drive a hover probe, because the
absence of any row key in the template is dispositive without one.*

**Cure.** Key the hover by row index, not by value: `hoveredRow = ref<number | null>(null)`, and
the node condition becomes `hoveredRow === index`. Two lines, and it is also *faster* — an integer
compare per node instead of an `Array.prototype.includes` scan.

---

### L-9 · MAJOR — the Conversion Graph is hand-authored prose over a topology the library owns

`colorSpaceInfo.ts` hand-writes 13 arrays of conversion chains (e.g. lines 227-236 for XYZ).
`ARCHITECTURE.md:153` states the library holds the real thing:

> `CONVERSION_ANCHORS satisfies Record<SpaceId,{toXYZ,fromXYZ}>` is statically assembled and total
> … **All 17×17 ordered conversions are therefore defined** without a late registry.

The authored table is a lossy, stale transcription of it. Two demonstrations from the rendered
page: the `display-p3` card shows `RGB→Kelvin` and `RGB→Hex` as if they were P3's conversions
(§L-1), and no card anywhere mentions `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb` or
`rec2020` as a *destination*, though the library defines every one of those 17×17 pairs.
`ARCHITECTURE.md:99-106` even names each space's anchor pair in a column — the exact data this
section wants.

**Cure.** Publish the anchor pair (or a `conversionPath(from, to): readonly SpaceId[]`) from
`/color` and derive the graph. 13 authored arrays delete; the section becomes true for all 17
spaces automatically, including future ones.

---

### L-11 · MAJOR — the ink layer reconstructs a contrast *predicate* out of a contrast *solver*

`ColorNutritionLabel.vue:208` calls `contrastInkFor`. `demo/color-session/ink.ts:157-174`:

```ts
export function contrastInkFor(fillCss: string): string | null {
    const fill = parseOklch(fillCss);
    if (!fill || fill.alpha !== 1) return null;
    const L = lightness(fill);
    const endpoints = L >= 0.5 ? [0, 1] as const : [1, 0] as const;
    for (const endpoint of endpoints) {
        const ink = surfaceColor(endpoint);
        const result = safeAccentColor(ink, fill, { minimumRatio: TEXT_CONTRAST_FLOOR, gamut: "srgb" });
        if (result.ok && Math.abs(lightness(result.value) - endpoint) < 1e-9) {
            return endpoint === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
        }
    }
    return null;
}
```

This asks a yes/no question — *"does pure black clear 4.5:1 against this fill?"* — by invoking a
**search** (`safeAccentColor` walks OKLCH lightness intervals, `ARCHITECTURE.md:191`) and then
testing whether the search's answer came back **unchanged**, via floating-point equality at `1e-9`.
It is an oracle probe standing in for a predicate.

The reason is structural: `/color` publishes `safeAccentColor` and nothing else in this family
(`ARCHITECTURE.md:396-400`; `src/subpaths/color.ts` confirms — no contrast function is exported).
A consumer that wants a WCAG ratio has no way to compute one, so it runs the solver and inspects
the residue. That is an **inverted dependency**: the low-level primitive (`contrastRatio`) is
private, and only the high-level policy built on top of it is public.

CSS Color 5 names this exact operation `contrast-color()`. The demo has re-derived it by
inference.

**Cure.** `/color` exports the primitive it already computes internally:
`contrastRatio(a: AnyColor, b: AnyColor): Result<number, ColorIssue>`. `contrastInkFor` becomes
three lines and one comparison, with no `1e-9` and no solver call. `safeAccentColor` stays exactly
as it is — it is the *policy*, and policy on top of a published primitive is the right shape.

---

### L-6 · MINOR — `colorSpaceInfo.hex` is 21 lines of unreachable dead data

`colorSpaceInfo.ts:313-333` authors a full `hex` record — `"Hex (Hexadecimal RGB)"`, `created:
"1996"`, `components: ["Red (00-FF)","Green (00-FF)","Blue (00-FF)"]`, `conversions: [["Hex",
"RGB"], …]`.

It can never be read. Both consumers call `resolveColorSpace` **before** the lookup, and
`color-model.ts:32-34` maps `"hex" → "rgb"`:

- `ColorNutritionLabel.vue:211`: `const space = resolveColorSpace(model.value.selectedColorSpace);`
- `ConsoleRail.vue:172-174`: `const space = currentColorSpace.value as DisplayColorSpace;` — and
  `currentColorSpace` is itself `resolveColorSpace(...)` (`useColorPipeline.ts:113-115`).

Measured (probe `probe-cnl2.mjs`, `?space=hex&color=%238050b0`): the trigger reads **Hex**, and
the card below reads `created: 1931` (not 1996) with `component rows: ["Red0 to 255","Green0 to
255","Blue0 to 255"]` (not `00-FF`) and a `["RGB","XYZ"],["RGB","Kelvin"],["RGB","HSL"],
["RGB","Hex"]` graph. The rgb record, verbatim.

Also note the type escape it forces on the other consumer: `ConsoleRail.vue:174`
`const info = (colorSpaceInfo as any)[space];` — the `as any` exists precisely because `space` is a
`DisplayColorSpace` and the table is not keyed by one.

**Cure.** Either `hex` is a display space with its own record (then don't resolve it away before
the lookup — the docs table should be keyed by `DisplayColorSpace`, the *math* table by `SpaceId`),
or it isn't (then delete the record). Currently it is both and neither.

---

### L-10 · MINOR — three to eight fully-mounted, entirely empty tooltips per card

`ColorNutritionLabel.vue:97-142`: every conversion row mounts `TooltipProvider` →
`Tooltip` → `TooltipTrigger` → `TooltipContent`, and the content is empty:

```vue
<TooltipContent class="contents w-64 p-2 text-small">
</TooltipContent>
```

Per-space row counts come straight from `colorSpaceInfo`: `xyz` has 8 conversions (lines 227-236),
`rgb`/`hsl`/`lab` have 4, `oklch`/`hwb` have 3. So the XYZ card mounts 8 provider/root/trigger/
content trees, 8 floating-UI contexts, and 8 `:delay-duration="100"` timers, to render nothing.

It is also a design-system misuse: one `TooltipProvider` is meant to wrap a *region*, not each
tooltip (glass-ui/reka semantics). The `class="contents"` on `TooltipContent` reinforces that the
element was never meant to paint.

**Cure.** Delete the tooltip scaffolding, or give it the content it was scaffolded for (the
per-hop conversion description is exactly what `colorSpaceInfo.notes` holds). Do not ship the
scaffold empty.

---

### L-12 · MINOR — `?? ""` at line 208 is a provably dead masking fallback

```ts
const nodeFill = cssColorOpaque;                                    // :207
const nodeInk = computed(() => contrastInkFor(nodeFill.value) ?? ""); // :208
```

`contrastInkFor` returns `null` on exactly two arms: parse failure, and `fill.alpha !== 1`
(`ink.ts:160`). But `cssColorOpaque` is
`serializePickerColor(withAlpha(model.value.color, 1))` (`useColorPipeline.ts:104`), and
`ARCHITECTURE.md:86` fixes that alpha is *"omitted only when exactly numeric 1"* — so the
round-trip always yields `alpha === 1`. The alpha arm is unreachable.

The comment above it (lines 205-206) claims the fallback is a designed behavior — *"On parse
failure the caller keeps the resting ink (empty string → inherit)"* — but `color: ""` does not
"keep the resting ink", it removes the declaration and inherits `--foreground`, which is precisely
the *"colored fill under the fixed foreground"* the D6 comment three lines above says was killed.
A dead branch documented as a live safety net is worse than either.

(The genuinely reachable failure arm is not `null` at all — it is the **throw** at `ink.ts:47`.
See §L-2.)

---

### L-13 · MINOR — three type escapes, all symptoms of untyped content

`ColorNutritionLabel.vue:111` `setHoveredPath(path as any)` ·
`:123` `hoveredPath.includes(space as string)` ·
`:160` `(currentColorSpaceInfo.industries as any).join(", ")`.

All three trace to one cause: `colorSpaceInfo` is `as const` with no declared interface
(`colorSpaceInfo.ts:334`), so `currentColorSpaceInfo` is a **union of 13 structurally distinct
frozen literal types**. `.industries` is a union of readonly tuples of differing lengths, whose
`join` signatures do not unify — hence `as any`. `.conversions` is a union of readonly tuple
arrays, so `path` is not `string[]` — hence the other two.

Declaring `interface ColorSpaceDoc { …; industries: readonly string[]; conversions: readonly
(readonly SpaceId[])[] }` and using `satisfies` (§L-1's cure) removes all three escapes as a side
effect, and makes the conversion arrays type-check against real `SpaceId`s — which would have
caught `"Hex"` and `"Kelvin"` appearing as graph nodes under `display-p3`.

---

### L-14 · MINOR — `/about` and `/easing` are absent from the visual-audit matrix

The live evidence bundle covers 15 routes:

```
$ python3 -c "import json;d=json.load(open('docs/tranches/V/megatranche/audit/visual/REPORT.json'));
print(sorted({r['route'] for r in d['results']}))"
['/#/', '/#/admin/audit', '/#/admin/flagged', '/#/admin/names', '/#/admin/tags', '/#/admin/users',
 '/#/atmosphere', '/#/blob', '/#/browse', '/#/does-not-exist', '/#/extract', '/#/generate',
 '/#/gradient', '/#/mix', '/#/palettes']
```

`ARCHITECTURE.md:43` fixes eleven first-class product destinations including `/about` and
`/easing`. Nine of the eleven were captured. **The subject component's only route has zero rows in
`REPORT.md`/`REPORT.json` and no screenshot under `shots/`** — which is why §L-1's five wrong
cards, visible in light and dark at every viewport, were never seen. `REPORT.json.summary`
nonetheless reports `"routeCount": 15` and empty `blankOrNearBlank`/`pageErrors` arrays; the §L-2
blank would also have been invisible to it, since the matrix drives no `?color=` query.

**Cure.** Add `/about` and `/easing` to the matrix route list, and add one parameterised
`?space=…&color=…` sweep so the URL-restore surface is covered at all.

---

## 2. Checked and clean — the negative proofs

Findings I went looking for on this axis and could **not** substantiate:

1. **No deep-import of the library.** Zero `@src`, zero `../../../src/`, zero
   `@mkbabb/value.js/dist/*` in `demo/` (grep in §0). Every specifier is a `package.json#exports`
   key. `vite.config.ts` generates the demo's self-alias set from the export map, so a specifier a
   real consumer could not write cannot resolve — right by construction, not by discipline.
2. **`verbatimModuleSyntax` is satisfied.** The one type-only import in the component is
   `import type { ColorModel }` (line 182), correctly split from the value import of
   `resolveColorSpace` on line 183.
3. **No cross-feature internal import.** The component imports from `color-session` (legal:
   `feature → color-session`) and `ui` (illegal for a different reason, §L-4). It reaches into no
   sibling feature's descendants — no `picker/`, no `palettes/`, no `workbenches/`.
4. **`ink.ts` composes the library rather than re-implementing it.** `ink.ts:1-11` imports
   `convertColor`, `mixColors`, `oklch`, `safeAccentColor`, `parseCssColor`, `serializeCssColor`
   from the published subpaths and builds only *policy* on top. There is no second OKLCH
   implementation, no hand-rolled WCAG luminance, no matrix copy in `demo/`. The defect there is
   the library's missing primitive (§L-11), not a demo duplicate.
5. **No `useLayerTransition`-style local reimplementation here.** The named historical suspects
   (`ActionBarLayer`, `demo/palettes/export.ts`, the three `useDark` stores) have no edge to this
   component; it imports no dark-mode store at all and inherits scheme through CSS.
6. **No animation was deleted.** The component's only motion is `transition-colors` utilities
   (lines 110, 127); no keyframes are defined or removed here.
7. **`colorSpaceInfo` is genuinely pure data** with no runtime dependency, as its header claims —
   so the transposition in §3 is a move, not a rewrite.

---

## 3. The greenfield lattice

If I were structuring this today with no legacy, this is the module lattice. It is a
transposition, not a patch list: **three modules move across a package boundary and eleven
declarations collapse into three.**

### M-1 — the library owns the space contract, as data

`src/color/model.ts` widens `SPACE_SCHEMA` to the shape `ARCHITECTURE.md:153` already assigns it,
and `/color` exports it:

```ts
export type ChannelSchema = Readonly<{
    key: string;
    min: number;
    max: number;
    unit: "" | "%" | "deg" | "K";
    percentReference?: number;   // oklch chroma: 0.4 while raw max is 0.5
    hue?: true;
}>;
export type SpaceSchema = Readonly<{
    channels: readonly ChannelSchema[];
    hueIndex?: number;
    css: boolean;
    anchor: readonly SpaceId[];   // the real conversion chain to XYZ D65
}>;
export const SPACE_SCHEMA: Readonly<Record<SpaceId, SpaceSchema>>;
export const SPACE_IDS: readonly SpaceId[];
export const CSS_COLOR_SPACES: ReadonlySet<CssColorSpace>;
export function contrastRatio(a: AnyColor, b: AnyColor): Result<number, ColorIssue>;
```

`src/css/grammar.ts:184-220` **reads** `percentReference`/`max` instead of restating `255`, `360`,
`125`, `150`, `0.4` — closing `ARCHITECTURE.md:110`'s "not parser folklore" clause, which is
currently false in the shipped tree.

Deletes: `PICKER_CHANNELS` (56 lines), `CSS_PICKER_SPACES`, `PICKER_SPACE_NAMES`'s range twin, the
five scale-rule copies, `ink.ts`'s solver-probe loop.

### M-2 — the demo owns *pedagogy*, in the home the architecture already named

`demo/shared/content/color-spaces.ts` — `ARCHITECTURE.md:31-33` reserves `shared/content/` for
*"deliberately authored typed pedagogical snippets"* and the directory **does not yet exist**
(`demo/shared/` currently holds only `ui/` and `utils.ts`). This is its first inhabitant:

```ts
export interface ColorSpaceDoc {
    name: string;
    definition: string;
    created: string;
    deviceDependency: string;
    whitePoint: string;
    gamut: string;
    perceptualUniformity: string;
    hueLinearity: string;
    lightnessSeparation: string;
    applications: readonly string[];
    industries: readonly string[];
    notes: string;
    /** keyed by ChannelSchema.key — never positional */
    channelNames: Readonly<Record<string, string>>;
}
export const COLOR_SPACE_DOCS = { … } satisfies Record<DisplayColorSpace, ColorSpaceDoc>;
```

Two structural changes carry all the weight: `satisfies` closes the five gaps (§L-1) at build time,
and `channelNames` keyed by channel key kills the positional index-join at
`ColorNutritionLabel.vue:57` (`components[index] ?? rangeKey`) — a join across two independently
authored tables with no shared key, currently aligned only by luck.

`conversions` is **absent** from the interface: it is derived (M-3).

### M-3 — `assets/docs/*.md` keeps prose and loses facts

The eleven `### Attributes` blocks delete. They are the fifth declaration of §L-3's fact and two of
them are outright wrong (`rgb` 0–1, `hsv` hue 0–1). The label directly above already renders the
same rows from `SPACE_SCHEMA`; the guide keeps history, characteristics, advantages, math — the
things only prose can carry. Nothing authored is lost; one duplicated table is.

### M-4 — the Conversion Graph is derived

`SPACE_SCHEMA[space].anchor` gives the real chain. The section renders
`SPACE_IDS.map(target => conversionPath(space, target))` or the anchor pair itself. Thirteen
hand-authored arrays delete, the graph becomes true for all 17 spaces, and it can never again
claim `display-p3 → Kelvin`.

### M-5 — `demo/ui/**` dies

Nineteen directories deleted; 48 files' specifiers rewritten to `@mkbabb/glass-ui`, joining the 119
that already do. `ARCHITECTURE.md:39` becomes true.

### M-6 — the component becomes pure

```vue
<script setup lang="ts">
import { computed } from "vue";
import type { DisplayColorSpace } from "../../color-session/color-model";
import { COLOR_SPACE_DOCS } from "../../shared/content/color-spaces";
import { SPACE_SCHEMA } from "@mkbabb/value.js/color";
const { space } = defineProps<{ space: DisplayColorSpace }>();
const doc = computed(() => COLOR_SPACE_DOCS[space]);          // total; no fallback
const schema = computed(() => SPACE_SCHEMA[resolveColorSpace(space)]);
</script>
```

One required prop, no `defineModel`, no `inject` for state it does not own, no local range
derivation, no `as any`, no `? :` fallback, no `?? ""`. The ink pair
(`componentInk`/`nodeInk`) stays — it is genuinely this component's presentation concern — and
`nodeInk` loses its `?? ""` once `contrastRatio` exists (M-1).

### M-7 — the `"none"` boundary is resolved once

`valueOrThrow` deletes. `color-session` lowers `AnyColor` → `ResolvedColor` (channels
`number`) exactly once, at parse/URL-restore, and returns a `Result` on failure that the boot path
renders as the existing configuration-error surface. Every downstream function becomes total.
`#app` stops emptying itself (§L-2).

### Net

| | before | after |
|---|---|---|
| declarations of "channel ranges" | 5 (2 packages) | 1 (`SPACE_SCHEMA`) |
| declarations of "space pedagogy" | 3 (`colorSpaceInfo`, `assets/docs`, prose in-component) | 1 (`shared/content`) |
| copies of the display-scale rule | 5 | 0 (schema-carried) |
| `demo/ui/` forwarding dirs | 19 | 0 |
| spaces documented correctly | 12 / 18 | 18 / 18 (compiler-enforced) |
| `as any` / `as string` in subject | 3 | 0 |
| masking fallbacks in subject | 3 (`: rgb`, `?? rangeKey`, `?? ""`) | 0 |
| colors that blank the app | ≥3 | 0 |

---

## 4. Reproduction assets

All probes are read-only navigations against the running dev server; none writes to the repo.

- `probe-cnl2.mjs` — eight `?space=…&color=…` navigations to `/#/about`; prints trigger title,
  Definition, Basic-Information rows, Components rows, graph nodes. Produces §L-1 and §L-6.
- `probe-cnl3.mjs` — four cases with screenshots; produces §L-1's `about-display-p3.png`, §L-3.4's
  `rgb 0 to 255` row, and case D (`oklch(none 0.1 200)` → `pageerror: color_missing_channel`,
  `bodyLen: 0`).
- `probe-cnl4.mjs` — the §L-2 attribution matrix: picker route, powerless hue, missing chroma,
  valid control.

Scripts live in this session's scratchpad
(`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`)
and are regenerable from the URLs quoted inline — every one of them is a plain address bar entry:

```
http://localhost:9000/#/about?space=display-p3&color=color(display-p3 0.5 0.3 0.7)   → 1931 CIE RGB card
http://localhost:9000/#/about?space=rgb&color=rgb(128 80 176)                        → "Red 0 to 255" over "R: 0 to 1"
http://localhost:9000/#/about?space=oklch&color=oklch(0.6 0 none)                    → blank app
http://localhost:9000/#/about?space=oklch&color=oklch(none 0.1 200)                  → blank app
http://localhost:9000/#/?space=oklch&color=oklch(0.6 none 200)                       → blank app
```

No source file was modified by this seat. Writes are confined to
`docs/tranches/V/megatranche/audit/components/ColorNutritionLabel/`.
