# CHALLENGE-C — `demo/scenes/about/ColorNutritionLabel.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. The seat is declared, not inherited.

Substrate: branch `tranche-u`, HEAD `c654824e`, dev server live at `http://localhost:9000`.
Every number below is measured in this session. Probe scripts:
`…/scratchpad/cnl-c2-probe{1..8}.mjs`, `…/scratchpad/graph-edges.mjs`, `…/scratchpad/tsrepro/repro.ts`.

The pass-1 report for this seat is preserved verbatim at `challenge-C-implementation.pass-1.md`.
This pass re-measured every one of its claims independently. **It was wrong about one thing that
matters** — the finding it filed as a negative proof ("the F-3 fill/ink contrast chain HOLDS…
latent, not live; recorded, not counted") is a **live, reproducible WCAG failure**. See C-2, and
§"Correction to pass-1".

---

## Verdict

**DEFECTIVE.**

Strongest defect: **C-2** (new this pass) — the component paints a colored fill under *no* ink at
all for a slider-reachable region of the color solid, measured **3.97 : 1** against the 4.5 floor
the file's own comment promises "a pass by construction". C-1 is equally severe by a different
measure: for **6 of the 18 spaces the app offers**, this label prints facts about a different color
space.

---

## C-1 · BLOCKER — the metadata fallback prints another space's color science under the selected space's title

**Site.** `ColorNutritionLabel.vue:210-215`

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;           // ← the masking fallback
});
```

**Mechanism.** `colorSpaceInfo` (`demo/color-session/colorSpaceInfo.ts`) has **13** keys.
`PICKER_CHANNELS` is `satisfies Record<SpaceId, …>` over **17** ids (`picker-color.ts:52-70`) and
the selector offers all **18** `DISPLAY_COLOR_SPACE_NAMES`. Missing from the table: `srgb-linear`,
`display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`. All five fall to `colorSpaceInfo.rgb`. A sixth,
`hex`, is folded to `rgb` one line earlier (C-6).

**Reproduction — the real user path, not a URL trick.** `node …/scratchpad/cnl-c2-probe5.mjs` opens
the About pane's own space selector and clicks the options. Verbatim output:

```
--- selected: ProPhoto RGB ---
 "title":      "About the color spaces, ProPhoto RGB",
 "definition": "Definition A color space based on the additive mixture of red, green, and blue light.",
 "basic":      "Device Dependency:Device-dependent White Point:Varies (typically D65)
                Gamut:Limited (device-specific) Created:1931",
 "components": "Red 0 to 1 Green 0 to 1 Blue 0 to 1",
 "graph":      "RGB XYZ  RGB Kelvin  RGB HSL  RGB Hex"

--- selected: Display P3 ---   … byte-identical to ProPhoto RGB …
--- selected: Rec. 2020 ---    … byte-identical to ProPhoto RGB …
--- selected: Kelvin ---       (correct: black-body definition, "Temperature (K) 1000K to 40000K")
```

ProPhoto RGB's white point is **D50**, not "typically D65"; its gamut covers ~90% of visible
chromaticities, not "Limited (device-specific)"; it dates to **2000**, not 1931. Rec. 2020 is a 2012
ITU recommendation, not a 1931 CIE space, and does not convert to "Kelvin" through this graph.
`a98-rgb` and `srgb-linear` take the identical branch (same `? :`, same rendered rows); I measured
four of the six by hand, the other two follow from the single line of code.

Note the *hybrid* row this produces: the component NAMES come from `colorSpaceInfo.rgb`
(`["Red","Green","Blue"]`) while the RANGES come from `PICKER_CHANNELS["prophoto-rgb"]` (0–1), so
the Components section reads `Red 0 to 1` — RGB's names married to P3's domain. That row describes
no color space that exists.

**Cure (structural, not a patch).** Type the table:

```ts
export const colorSpaceInfo: Record<DisplayColorSpace, ColorSpaceInfo> = { … }
```

The five holes become compile errors; author the rows; then **delete the ternary** and index
directly. The `space in colorSpaceInfo` guard, the `as keyof typeof` cast and the fallback all
disappear together — one type replaces three runtime hedges. (Owner edict 2: no masking fallbacks.)

---

## C-2 · BLOCKER — the F-3 fill/ink pair splits: a live-colored fill painted under **no ink at all**, measured 3.97 : 1

**Site.** `ColorNutritionLabel.vue:207-208` and the template at `:121-126`

```ts
const nodeFill = cssColorOpaque;
const nodeInk = computed(() => contrastInkFor(nodeFill.value) ?? "");   // ← fail-open
```

```html
<!-- F-3 split: the hovered node commits to the live fill AND the fill-derived
     ink together — never a colored fill under the fixed foreground. -->
:style="… ? { backgroundColor: nodeFill, color: nodeInk } : undefined"
```

**Mechanism.** `contrastInkFor` (`demo/color-session/ink.ts:158-174`) returns `null` when *neither*
neutral endpoint survives `safeAccentColor` unmoved. `?? ""` converts that "I cannot certify an ink"
into an empty `color:` declaration, which Vue **omits from the style attribute entirely** — so the
node keeps the plate's inherited foreground and paints the saturated fill underneath it. That is
precisely the arrangement the comment three lines above swears never happens.

**Is the null region reachable?** Scan of the OKLCh solid through the real module
(`…/scratchpad/cnl-c2-probe6.mjs`, importing `/@fs/…/demo/color-session/ink.ts` from the dev server):

```
{ "scanned": 11128, "nullCount": 53,
  "nullSamples": ["oklch(0.470 0.400 30)","oklch(0.490 0.400 0)","oklch(0.510 0.350 30)",
                 "oklch(0.520 0.350 0)","oklch(0.530 0.400 330)","oklch(0.540 0.400 330)", …] }
```

53 nulls, all at L ≈ 0.47–0.54 with C ≥ 0.35 — **inside** the picker's own OKLCh slider domain
(`PICKER_CHANNELS.oklch` = L 0–1, C 0–0.5, h 0–360, `picker-color.ts:60`).

**Live reproduction.** `node …/scratchpad/cnl-c2-probe7.mjs` — drive the app to that color, hover
the first conversion node, read the painted result and compute the WCAG ratio through a canvas:

```
=== requested oklch(0.53 0.4 330) ===
hash now: #/?space=oklch&color=oklch(53%+0.4+330deg)
{ "inlineStyle":        "background-color: oklch(0.53 0.4 330);",     ← no `color:` at all
  "computedBackground": "oklch(0.53 0.4 330)",
  "computedColor":      "rgb(28, 25, 23)",                            ← the plate's ink, uncertified
  "fillRgb": [213, 0, 211], "inkRgb": [28, 25, 23],
  "wcagInkOnFill":      3.97 }                                        ← floor is 4.5
```

Control, same probe, same hover, a color one step away:

```
=== requested oklch(0.62 0.28 145) ===
{ "inlineStyle": "background-color: oklch(0.62 0.28 145); color: oklch(0 0 0);",
  "wcagInkOnFill": 6.90 }
```

So the pair commits together at 6.90 and splits at 3.97 depending only on where the user parks the
chroma slider. `TEXT_CONTRAST_FLOOR` is 4.5 (`ink.ts:15`); `e2e/smoke/oracles/o18-contrast-census.spec.ts:697-743`
asserts `>= TEXT_FLOOR` for exactly this element — at one color (`bootAtOwnerColor`). See C-12.

**Cure.** The fail-open is the defect; make the pair atomic. One computed that returns *both or
neither*:

```ts
const nodeSkin = computed(() => {
    const ink = contrastInkFor(cssColorOpaque.value);
    return ink ? { backgroundColor: cssColorOpaque.value, color: ink } : undefined;
});
```

`:style="isHovered ? nodeSkin : undefined"` — when the ink cannot be certified the fill is not
painted either, and the node stays on its resting recipe, which the census already certifies. The
deeper cure belongs in `ink.ts`: `contrastInkFor` should not be able to return `null` for an opaque
sRGB-representable fill — walk the neutral axis (it currently tests only the two endpoints, `ink.ts:162-172`)
rather than giving up.

---

## C-3 · MAJOR — the hover highlight lights nodes in rows the pointer never entered

**Site.** `:122-126` — `hoveredPath.length && hoveredPath.includes(space as string)`.

**Mechanism.** `hoveredPath` (`:232`) is one shared ref holding the hovered row's node *names*; the
per-node test asks "is my text in that list", not "am I in that row". Since every path in a space's
conversion graph starts at that space, the source node repeats in every row **by construction** — so
the bleed is guaranteed, not incidental.

**Reproduction.** `node …/scratchpad/cnl-c2-probe3.mjs`, space Lab, pointer on node 0 (row 1):

```
=== A1. hover node 0 (row 1) — lit map ===
[{Lab:true},{XYZ:true},          ← row 1 — the row the pointer is in
 {Lab:true},{LCh:false},         ← row 2 — pointer never entered
 {Lab:true},{XYZ:true},{OKLab:false},   ← row 3 — pointer never entered
 {Lab:true},{LCh:false},{OKLCh:false}]  ← row 4 — pointer never entered
litCount: 6 of 10
```

Six of ten nodes paint the live color; four of the six are in rows the pointer never touched. An
affordance that means "this path" instead reads "every occurrence of these three words".

**Cure.** Identity by row, not by string: `const hoveredRow = ref<number | null>(null)` and
`index === hoveredRow`. Strictly less code, correct by construction, and it retires both
`as any` / `as string` casts (`:111`, `:123`) and the dead `hoveredPath.length` guard.

---

## C-4 · MAJOR — three glass-ui components per row wired to an **empty** tooltip, on a target no keyboard can reach

**Sites.** `:97-142` (the `TooltipProvider`/`Tooltip`/`TooltipTrigger` stack, provider **inside**
the `v-for`), `:109-113` (the trigger `<div>`), `:139-140` (the empty `TooltipContent`).

**Measured** (`…/cnl-c2-probe3.mjs`):

```
=== A2. tooltip DOM while hovering ===
{ "count": 2,
  "samples": [
   { tag: "DIV",  text: "\"\"", html: "<div data-reka-popper-content-wrapper … z-index:120 …>" },
   { tag: "SPAN", text: "\"\"", html: "<span aria-hidden=\"true\" id=\"reka-tooltip-content-v-0-6\"
                                        role=\"tooltip\" style=\"…clip:rect(0,0,0,0)…\"></span>" }]}

=== A3. trigger a11y ===
{ "triggerTag":"DIV", "role":null, "tabindex":null, "cursor":"pointer",
  "ariaDescribedby":"reka-tooltip-content-v-0-6", "describedTargetText":"\"\"",
  "focusablesInSection":0, "nodeBox":[49,37] }

=== C1. 40-stop tab walk ===
… "BUTTON[about]:Select color space","DIV[about]:L∗=116 f(Y/Yn)−16","BODY:→lab(92% 88.8 20 …" …
stops inside the Conversion Graph: 0
```

Four defects in one construction:

1. **The tooltip has no content, in any state.** A popper wrapper and a visually-hidden mirror, both
   `textContent === ""`. Nothing is ever shown to anyone.
2. **`aria-describedby` points at that empty span.** Every row promises a screen reader a description
   and delivers `""`.
3. **No keyboard path.** 40 Tab presses, `focusablesInSection: 0`, zero stops in the section. The
   highlight (such as it is) is mouse-only. WCAG 2.1.1.
4. **`cursor: pointer` on a `<div>` with `role: null`** — an activation promise with nothing behind
   it. WCAG 4.1.2.

The content this was built for is sitting unused: `colorSpaceInfo.notes` — one prose line per space,
13 of them — has **zero consumers**:

```
$ grep -rn "\.notes\b" demo/ --include="*.vue" --include="*.ts"
(no matches)
```

Corroborating shape defects: one `TooltipProvider` **per row** (`:97` is inside the `v-for`) — Lab
renders 4, XYZ renders 8, and the provider is designed to wrap many tooltips once; and
`class="contents w-64 p-2"` on `:139`, where `display: contents` erases the very box `w-64 p-2` sizes.

**Cure — pick an end, do not keep the middle.** Either (a) render `notes` in the tooltip, make the
row a real `<button type="button">`, mirror `@mouseenter/@mouseleave` with `@focus/@blur`, and hoist
ONE `TooltipProvider` above the `v-for`; or (b) delete the entire Tooltip stack, the
`cursor-pointer` and the `aria-describedby` with it, and let the rows be static data. Today's state
pays the full cost of (a) and delivers less than (b).

---

## C-5 · MAJOR — 16 renders of this component per 1 render of the picker's own slider, for 9 distinct pixels of output

**Sites.** `:186` (`defineModel<ColorModel>`), `:200` (`componentInk` off the **uncoalesced**
`cssColorOpaque`), `:217-230` (`formattedRange` rebuilding a fresh object per evaluation).

**Mechanism.** The component reads exactly ONE field of the model — `selectedColorSpace` — but
receives the whole `ColorModel`, and the pipeline replaces that object on **every** colour tick
(`useColorPipeline.ts:70`, `model.value = next`). So `model.value` invalidates per tick →
`currentColorSpaceInfo` and `formattedRange` invalidate → `formattedRange` returns a brand-new
object → the whole 5-section plate re-renders, dragging the reka-ui Tooltip machinery with it.

**Measured** — Vue's own devtools hook, stubbed via `addInitScript` before app init, counting
`component:updated` by instance uid (`…/cnl-c2-probe5.mjs`; 30-step drag of the picker's first
channel slider, nothing hovered):

```
=== A. fresh-page drag: instance census ===
 ColorNutritionLabel: { liveInstancesSeen: 1, perInstanceUpdates: [160] }
 AboutPane:           { liveInstancesSeen: 1, perInstanceUpdates: [50]  }
 ColorPicker:         { liveInstancesSeen: 1, perInstanceUpdates: [10]  }
 ComponentSliders:    { liveInstancesSeen: 1, perInstanceUpdates: [10]  }
```

and, with the CNL subtree isolated by ancestry plus a `MutationObserver` on the only elements whose
output actually depends on the colour (`…/cnl-c2-probe2.mjs`, 40-step drag):

```
{ "cnlSelf": 160, "cnlSubtree": 950, "all": 15010,
  "byName": { ColorNutritionLabel:160, TooltipTrigger:200, TooltipProvider:120,
              Tooltip:80, TooltipRoot:80, PopperAnchor:80, PrimitiveSlot:80,
              Primitive:80, PopperRoot:40, Alert:10, AlertTitle:10, AlertDescription:10 },
  "domStyleWrites": 27, "distinctInkValues": 9 }
```

**160 renders and 950 descendant component updates produced 27 DOM writes carrying 9 distinct
values.** The picker's own `ComponentSliders` — the component being dragged — rendered 10 times.

The cost of each tick's real work is measurable too (same dev server, real module):

```
=== B. split ink microbench (per call) ===
{ "contrastInkFor_us": 72.2, "certifyAccentInk_us": 704.6, "note": "vite dev build, unminified" }
```

`componentInk` (`:200`) calls `certifyAccentInk` once per colour tick — ~0.7 ms per tick in dev —
and it reads `cssColorOpaque`, the **uncoalesced** projection, even though the pipeline already
exposes `cssColorOpaqueFrame` (`useColorPipeline.ts:279`), the rAF-coalesced ref built for exactly
this fan-out and provided app-wide.

**Cure (two moves, both subtractive).**
1. Pass the field, not the model: `defineProps<{ space: DisplayColorSpace }>()` at the child,
   `:space="model.selectedColorSpace"` at `AboutPane.vue:43`. A primitive prop that does not change
   lets Vue skip the child render entirely — the 160 collapse to the number of *space* changes.
2. Certify off the coalesced colour (`cssColorOpaqueFrame`), the same discipline the atmosphere
   fan-out already follows: at most one 0.7 ms certification per frame instead of one per pointer
   event.

---

## C-6 · MAJOR — `colorSpaceInfo.hex` is unreachable, and the About card contradicts itself on Hex

**Site.** `:211` × `demo/color-session/color-model.ts:32-34` — `resolveColorSpace` maps `"hex" → "rgb"`
and can never *return* `"hex"`, so the 21-line `hex` entry (`colorSpaceInfo.ts:313-333`) can never be
selected. The only other consumer resolves the same way (`ConsoleRail.vue:171-176` reads
`currentColorSpace`, which is `resolveColorSpace(...)` — `useColorPipeline.ts:113-115`). Dead across
the app.

**Measured** (`…/cnl-c2-probe5.mjs`, selecting Hex from the About selector; guide length from
`…/cnl-c2-probe4.mjs`):

```
--- selected: Hex ---
 "title":      "About the color spaces, Hex",
 "definition": "A color space based on the additive mixture of red, green, and blue light.",
 "basic":      "Device-dependent | Varies (typically D65) | Limited (device-specific) | 1931",
 "components": "Red 0 to 255 Green 0 to 255 Blue 0 to 255"
 (guideChars: 4244 — hex.md DID render, immediately below)
```

One `<Card>` says two things at once: the label describes CIE RGB (1931) while the Detailed Guide
renders 4,244 characters about hexadecimal notation. The unreachable entry has the right answer in
it — `components: ["Red (00-FF)", …]`, `created: "1996"`, `conversions: [["Hex","RGB"], …]`.

**Cure.** Index the metadata by the **display** space (`model.value.selectedColorSpace`) and keep
`resolveColorSpace` for `PICKER_CHANNELS` only — they answer different questions and should stop
sharing a key. Rider: once `hex` is reachable, its Components ranges must come from the entry
(hex digits), not from `PICKER_CHANNELS.rgb` (0–255).

---

## C-7 · MINOR — on touch, the hover affordance latches: 6 nodes stay painted with no way to dismiss

**Reproduction** (`…/cnl-c2-probe3.mjs`, context with `hasTouch: true`, real `touchscreen.tap`):

```
=== B1. after TAP on node 0 (touch) === litCount: 6
 [{Lab:true},{XYZ:true},{Lab:true},{LCh:false},{Lab:true},{XYZ:true},{OKLab:false},{Lab:true},…]
=== B2. after tapping elsewhere ===    litCount: 0
```

A tap fires the emulated `mouseenter`; no `mouseleave` follows until the user happens to tap
something else. So a touch user taps a row that advertises itself with `cursor: pointer`, gets six
scattered nodes flooded with the live colour across four rows, **no tooltip** (C-4), and no
dismissal affordance. On the mobile matrix this is the *only* way the highlight can ever be seen.

**Cure.** Folded into C-4(b)/C-3: a row that is a real button with `@focus/@blur` + row-scoped
identity behaves correctly on touch, keyboard and mouse without a device sniff.

---

## C-8 · MINOR — the component ranges disintegrate under `dir="rtl"`

**Site.** `:59-63` — three bare inline runs in one bidi paragraph:

```html
<div>{{ range.min }} <span class="italic">to</span> {{ range.max }}</div>
```

The numbers are LTR-strong, `to` is LTR-strong, the leading `-` is bidi-neutral. Under an RTL base
direction the reorder is not cosmetic.

**Evidence — the formation's own captured matrix**, which I read directly:
`docs/tranches/V/megatranche/audit/visual/shots/rtl-desktop/picker.png`. The Components row renders

```
b* (Blue-Yellow)      a* (Green-Red)       L* (Lightness)
   to 125 125-           to 125 125-          to 100% 0%
```

The separator is no longer between its operands and the minus sign has detached onto the *right*
number's tail (`125-`). `rtl-desktop` is an audited capture matrix, so this ships as-audited.

**Cure.** One isolated run: a computed `` `${min} – ${max}` `` inside one element carrying `dir="ltr"`
(or `<bdi>`). One element, one direction, no neutral floating between two numbers.

---

## C-9 · MINOR — `defineModel` for a value the component never writes

**Site.** `:186` — `const model = defineModel<ColorModel>({ required: true })`.

```
$ grep -n "model.value" demo/scenes/about/ColorNutritionLabel.vue
211:    const space = resolveColorSpace(model.value.selectedColorSpace);
219:        PICKER_CHANNELS[resolveColorSpace(model.value.selectedColorSpace)].map(…)
```

Two reads, zero writes. The component publishes an `update:modelValue` contract it never fires and
the host binds it two-way (`AboutPane.vue:43`, `v-model="model"`) as though it could write back.
This is not the repo's known `defineModel` stale-read hazard — that hazard bites *writers* through
the async parent round-trip and there is no writer here — it is a false mutability contract on a
display leaf, and it is the same line that causes C-5. One prop (`space`) fixes both.

---

## C-10 · MINOR — three type escapes; one is provably gratuitous

**Sites.** `:111` `setHoveredPath(path as any)` · `:123` `space as string` · `:160`
`(currentColorSpaceInfo.industries as any).join(", ")` — while `:154` does the identical `.join(", ")`
on `applications` with **no** cast. Adjacent lines disagreeing about the same type is the tell.

**Measured.** `…/scratchpad/tsrepro/repro.ts` reproduces `:210-215`, `:154`, `:160`, `:111` against
the real table, with the `:160` cast removed:

```
$ npx tsc --noEmit --ignoreConfig --strict --target es2022 --lib es2023,dom \
      --moduleResolution bundler --module esnext repro.ts
repro.ts(18,78): error TS2345: Argument of type 'readonly ["RGB","XYZ"] | … | readonly [...]'
  is not assignable to parameter of type 'string[]'.
  The type 'readonly ["RGB","XYZ"]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
```

One diagnostic, and it is **not** on the `industries` line. So `:160`'s `as any` is gratuitous — it
disables checking on a live expression for nothing. `:111`/`:123` are load-bearing only because
`setHoveredPath(path: string[])` (`:234`) demands a **mutable** array; `readonly string[]` retires
both, and C-3's cure deletes the function.

---

## C-11 · MINOR — heading inversion: an `h3` container owning five `h2` children, in a document with no `h1`

**Measured** (`…/cnl-c2-probe8.mjs`):

```
{ "h1": 0,
  "outline": ["H3: About the color spaces, Lab",
              "H2: Basic Information","H2: Components","H2: Key Properties",
              "H2: Conversion Graph","H2: Usage","H2: Detailed Guide", …] }
```

The pane title is `<h3>` (`demo/shared/ui/PaneHeader.vue`); this component's five section headings
are `<h2>` (`:18,43,71,93,149`). Every subsection outranks its own container, and the page has no
`h1` at all — corroborated by the visual REPORT's `h1` column reading `0` on all 60 captures
(`audit/visual/REPORT.md`, per-capture table). WCAG 1.3.1 — heading-navigation reads the sections as
siblings of the pane, not children of it. The ladder needs one pane-level decision; this
component's contribution is the five `h2`.

---

## C-12 · BLOCKER (test truth) — the gate is vacuous, and C-2 is the escape that proves it

**Measured.**

```
$ grep -rn "ColorNutritionLabel" test/ e2e/
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:41:  * ColorNutritionLabel "Definition" alert …   ← a COMMENT explaining an EXCLUSION

$ grep -rn "Conversion Graph|Perceptual Uniformity|Device Dependency|White Point|Key Properties" e2e/ test/
(no matches)
```

No unit test exists. The only executing coverage is
`e2e/smoke/oracles/o18-contrast-census.spec.ts:697-743`, which hovers `[data-o18="graph-node"].first()`
**at one colour** (`bootAtOwnerColor`) and asserts a contrast ratio. It asserts nothing about what
the label *says*.

This is not a hypothetical. **C-2 walked straight through it**: the assertion the oracle makes
(`>= 4.5` on the hovered node) is *false at a reachable colour* and the suite is green, because the
suite never varies the colour.

Mutations that keep the suite green:

| # | Mutation | Consequence | Caught? |
|---|---|---|---|
| 1 | `currentColorSpaceInfo` → `computed(() => colorSpaceInfo.rgb)` | every space prints CIE RGB (C-1 at 100% instead of 33%) | **No** |
| 2 | `:123` condition → `true` | every node permanently painted; the hover affordance gone | **No** (both census rows stay `contrastInkFor`-derived) |
| 3 | delete `:97-142` (the whole Tooltip stack) | the empty tooltip and its `aria-describedby` vanish | **No** |
| 4 | delete `:92-144` (the Conversion Graph section) | the `.first()` locator fails | **Yes** — the one mutation it catches |

**Cure.** Two tests, both table-driven, both cheap:
(a) for **every** key of `DISPLAY_COLOR_SPACE_NAMES`, mount and assert the rendered Definition /
Components / Created equal `colorSpaceInfo[space]`'s — kills C-1, C-6 and mutation 1;
(b) parameterise the o18 graph-node row over a colour set that includes the C-2 null region
(`oklch(0.53 0.4 330)`) — kills C-2 and mutation 2.

---

## C-13 · INFO — construction residue

- **`Object.fromEntries` round-trip** (`:217-230` → `:48`): an ordered readonly array is turned into
  an object and immediately re-flattened with `Object.entries`. It buys nothing, silently drops a
  channel if two ever share a `key` (no current collision — checked all 17 rows of
  `PICKER_CHANNELS`), and makes the names↔ranges pairing ride insertion order that the code never
  states. `PICKER_CHANNELS[space].map(meta => …)` with `:key="meta.key"` retires the round-trip, the
  index `:key` (`:49`) and the `?? rangeKey` fallback (`:57`) at once.
- **Dead guard** (`:123`): `hoveredPath.length && …` — `[].includes(x)` is already `false`.
- **Array-literal class binding** (`:127`): `:class="['px-2 py-1 rounded transition-colors']"` routes
  a wholly static class list through the dynamic patch path on every one of those 160 renders.
- **Per-instance overrides of glass roots** (edict 5): `:8` overrides the glass-ui `Alert`'s margin,
  background, border colour and radius at the call site (the reasoning in the `:5-7` comment is
  right; its conclusion belongs in an `Alert` variant), and `:139` overrides `TooltipContent`'s
  `display` with `contents`.
- **Audit hooks in shipped markup**: `data-o18="component-name"` / `data-o18="graph-node"` (`:55`,
  `:128`) are test selectors in production DOM. Recorded, not counted — the census depends on them.

---

## C-14 · INFO (adjacent, not in this file) — the `space=` deep-link parameter is decorative

Found while driving this component; the defect is in `useColorUrl` / `ColorPicker`, and it decides
what this label shows.

**Measured** (`…/cnl-c2-probe8.mjs`):

```
start:                              #/?space=lab&color=lab(92% 88.8 20 / 82.7%)   title "… Lab"
after space-only change to xyz:     #/?space=xyz&color=lab(92% 88.8 20 / 82.7%)   title "… Lab"   ← ignored
after space+color change to xyz:    #/?space=oklch&color=oklch(55% 0.12 200deg)   title "… OKLCh" ← overridden
```

Two mechanisms: (1) `useColorUrl.ts:73-76` watches **only** `route.query.color`, so a link that
changes only the space is a no-op; (2) `ColorPicker.vue:356-363` watches `model.value.inputColor` and
calls `parseAndSetColor`, which re-derives `selectedColorSpace` from the colour's own **notation**
(`useColorParsing.ts:64-75`), so `?space=xyz&color=oklch(…)` lands on OKLCh and rewrites the URL to
say so. A shared link cannot select a display space that differs from its colour's syntax.

---

## Negative proofs — what I attacked and could not break

Stated as measurements so the DEFECTIVE verdict is not read as a blanket one.

**No crash path into the unguarded lookup.** `:219` indexes `PICKER_CHANNELS[…]` with **no** guard
(unlike `:212`), so a space id outside the table would be `undefined.map` — a render crash. I could
not reach it:

```
$ node -e "convertColor(red, 'bogus'|'srgb'|'HEX'|'')"   → ERR color_invalid_input (all)
$ parseCssColor("color(srgb 1 0 0)")     → space "rgb"
  parseCssColor("color(xyz-d50 1 0 0)")  → space "xyz"        (parser normalizes to SpaceId)
```

Both entry points that could inject a foreign space — `useColorUrl.applyUrlToModel` (`:30-47`) and
`boot/hydrate.modelFrom` (`:80-91`) — run the value through `convertPickerColor` first and fall
through on failure, and the parser only ever emits ids that `PICKER_CHANNELS` covers (it is
`satisfies Record<SpaceId, …>`). The asymmetry is real but currently unreachable; recorded, not
counted.

**Every advertised conversion path is real.** `node …/scratchpad/graph-edges.mjs` walks all **44**
paths in `colorSpaceInfo.conversions` through the actual library, chained node by node:

```
rgb     RGB→XYZ            ok      xyz    XYZ→RGB→Kelvin       ok
rgb     RGB→Kelvin         ok      ictcp  ICtCp→XYZ→OKLab      ok
lab     Lab→LCh→OKLCh      ok      jzazbz Jzazbz→XYZ→RGB       ok
…  44/44 ok, 0 failures
```

**No leaks, no loops, one instance.** The file has no `requestAnimationFrame`, no
`addEventListener`, no observer, no timer, no `onMounted`/`onUnmounted`, no async, no fetch — the
constellation PRM-RAF epidemic does not touch it. No `ValueUnit` construction (no nesting-accumulation
surface). No `parseCssColor` call in the file (parsing happens behind `Result` types in `ink.ts`),
so the live parser crash class has no surface here. No reka-ui slider, so no pointer-capture leak.
Instance census during a drag: `liveInstancesSeen: 1` — no duplicate/leaked instances.

**KeepAlive does pause it.** I expected off-screen work; there is none. After navigating to
`/#/gradient` and dragging 40 steps: `aboutGraphNodesInDom: 0` and **zero** `ColorNutritionLabel`
updates (`…/cnl-c2-probe1.mjs`, section B). Vue 3.5's deactivated-subtree effect pausing holds.

**Tap targets pass.** Measured node box `49 × 37` CSS px at 1600 wide (`…/cnl-c2-probe3.mjs`, A3) —
above the 24 px floor. This component contributes **0** rows to the REPORT's 60 small-tap-targets and
0 to its 18 nameless buttons (it renders no `<button>` at all — which is C-4's problem, not a tap
problem).

**No errors, no overflow.** Zero `pageerror`s across all eight probes; the only console error on
`/#/` is the dev API-misconfiguration warning, which is not this component. The visual REPORT records
`horizontalOverflow: 0` and `pageErrors: 0` for `/#/` in all four Safari matrices.

**Edicts 6 and 8 satisfied.** The only motion is `transition-colors` (tokenized, nothing deleted);
`:182` `import type { ColorModel }` is the file's only type-only import and it is correct.

---

## Correction to pass-1

Pass-1 filed, under *Negative proofs*: *"The F-3 fill/ink contrast chain HOLDS… `contrastInkFor`
returns `null` only on parse failure or `alpha !== 1`… so the branch is **unreachable today**.
Latent, not live; recorded, not counted."*

That is false, and the error is instructive: pass-1 tested `contrastInkFor` at eight hand-picked
colours (domain poles, the L crossover, two out-of-gamut cases) and generalised from eight passes to
"unreachable". A scan of the reachable solid returns **53 nulls in 11,128 samples**, and the live
app at one of them paints **3.97 : 1**. The lesson for the formation: a null-returning guard is
reachable until a *scan* says otherwise; spot checks at the interesting-looking points measure the
prover's imagination, not the domain.

---

## Family grouping

- **Incomplete domain papered over by a fallback** — C-1, C-6 (+ C-13's latent key collision). One
  mechanism: a partial lookup table closed with `? :` instead of with a type.
- **Fail-open guards** — C-2 (`?? ""` on an uncertifiable ink). The same shape as the family above:
  a missing answer rendered as a plausible one instead of as a refusal.
- **Identity by string instead of by position** — C-3, C-7. State keyed on rendered text rather than
  on the structure that produced it.
- **Affordance without semantics** — C-4, C-8, C-11. Interaction and reading order built from raw
  `<div>`s and bare text runs, with role, focus path, heading level and bidi isolation all implicit.
- **Contract too wide for the need** — C-5, C-9, C-10. A whole model where one string was wanted;
  casts where a `readonly` would do.
- **Gate vacuity** — C-12, which is why every family above survived to HEAD.
