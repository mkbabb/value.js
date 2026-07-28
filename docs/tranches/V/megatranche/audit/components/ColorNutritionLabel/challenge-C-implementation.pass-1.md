# CHALLENGE-C — `demo/scenes/about/ColorNutritionLabel.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.**

The component is a *nutrition label*: its entire reason to exist is to state facts about the
selected color space. For **6 of the 18 spaces the app lets you select**, it states facts about a
**different color space** — confidently, with no hedge, under a title naming the space it is not
describing. The formation's test suite cannot tell the difference: not one assertion anywhere in
`test/` or `e2e/` reads a single field this component renders.

Strongest defect: **C-1**.

Substrate: branch `tranche-u`, HEAD `c654824e`, dev server live at `http://localhost:9000`.
All browser evidence below is measured, not inferred. Probe scripts:
`…/scratchpad/CNL-probe{,2,3,4,5,6,7,8}.mjs`, `…/scratchpad/CNL-cast-repro2.ts`.

---

## C-1 · BLOCKER — the metadata fallback fabricates false color science for 6 of 18 selectable spaces

**Site.** `demo/scenes/about/ColorNutritionLabel.vue:210-215`

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;          // ← the masking fallback
});
```

**Mechanism.** `demo/color-session/colorSpaceInfo.ts` has **13** keys. `SpaceId` /
`PICKER_CHANNELS` (`demo/color-session/picker-color.ts:52-70`) has **17**, and the About selector
renders **all 18** `DISPLAY_COLOR_SPACE_NAMES` entries
(`demo/color-session/ColorSpaceSelector.vue:150` — `Object.entries(DISPLAY_COLOR_SPACE_NAMES)`).
Absent from the table: `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`. Every one
of those five silently resolves to the **CIE RGB** row. A sixth, `hex`, is folded to `rgb` upstream
(see C-2).

The `? :` is exactly the "masking fallback" the standing edicts forbid. It converts a missing-data
bug into a *wrong-data* bug — and wrong data here is not a rendering artifact, it is a false claim
about colorimetry printed as reference material.

**Reproduction (measured).** `node …/scratchpad/CNL-probe3.mjs` — drive the About space selector:

```
PICK Adobe RGB -> {
 "aboutTrigger": "Adobe RGB",
 "hash": "#/?space=a98-rgb&color=color(a98-rgb+1+0.557139518712+0.770090470472+/+82.7%25)",
 "comps": "Components | Red | 0 to 1 | Green | 0 to 1 | Blue | 0 to 1",
 "def": "Definition | A color space based on the additive mixture of red, green, and blue light."
}
PICK ProPhoto RGB -> { "aboutTrigger": "ProPhoto RGB", … same CIE-RGB definition … }
PICK Rec. 2020    -> { "aboutTrigger": "Rec. 2020",    … same CIE-RGB definition … }
```

and the full section read at Display P3 (`CNL-probe.mjs`):

```
=== AFTER selecting Display P3 ===
"Basic Information": "Device Dependency: | Device-dependent | White Point: | Varies (typically D65)
                      | Gamut: | Limited (device-specific) | Created: | 1931"
"Conversion Graph":  "RGB | XYZ | RGB | Kelvin | RGB | HSL | RGB | Hex"
"Usage":             "Industries: Digital media, Entertainment, Gaming"
"detailedGuideLen":  14        ← the "Detailed Guide" heading with nothing under it
```

So with **ProPhoto RGB** selected the label asserts white point "typically D65" (ProPhoto is
**D50**), gamut "Limited (device-specific)" (ProPhoto's gamut is famously *wider than sRGB*, ~90% of
visible), and "Created: 1931" (ProPhoto: 2000). With **Rec. 2020** selected it asserts the
conversion graph `RGB → Kelvin` and industries "Entertainment, Gaming". Every field is wrong and
every field is stated flatly.

**Proposed cure (gestalt, not patch).** Type the table so the hole cannot exist:

```ts
export const colorSpaceInfo: Record<DisplayColorSpace, ColorSpaceInfo> = { … }
```

The five missing rows then become a **compile error**, not a runtime lie. Author them, and **delete
the fallback branch outright** — `colorSpaceInfo[space]` with no ternary. The `space in
colorSpaceInfo` test exists only to paper over an untyped record; typing the record retires the
test, the fallback, and the `as keyof typeof` cast in one move.

---

## C-2 · MAJOR — `colorSpaceInfo.hex` is unreachable dead data, and the About card contradicts itself on Hex

**Site.** `ColorNutritionLabel.vue:211` (`resolveColorSpace`) ×
`demo/color-session/color-model.ts:32-34`:

```ts
export function resolveColorSpace(space: DisplayColorSpace): PickerSpace {
    return space === "hex" ? "rgb" : space;
}
```

`resolveColorSpace` can never *return* `"hex"`, so line 211 can never select the `hex` key. The
21-line hex entry at `colorSpaceInfo.ts:313-333` — with its own components `["Red (00-FF)", …]`,
its own conversions `[["Hex","RGB"], …]`, its own 1996 date — is **unreachable from this
component**. It is unreachable from the only other consumer too: `ConsoleRail.vue:173` reads
`currentColorSpace`, which is `resolveColorSpace(model.value.selectedColorSpace)`
(`demo/color-session/useColorPipeline.ts:112-114`). Dead across the whole app.

**Reproduction (measured).** `CNL-probe.mjs`, after selecting Hex:

```
=== AFTER selecting Hex ===
"definition":     "A color space based on the additive mixture of red, green, and blue light."
"Basic Information": "… White Point: | Varies (typically D65) | … | Created: | 1931"
"Components":     "Red | 0 to 255 | Green | 0 to 255 | Blue | 0 to 255"
"detailedGuideLen": 1523        ← hex.md DID render
```

The same `<Card>` therefore says two different things at once: the nutrition label describes CIE RGB
(1931), and eighteen pixels below it the Detailed Guide renders 1523 characters of `hex.md` about
hexadecimal notation. The user selected "Hex" and the title says "Hex".

**Cure.** Index the metadata table by the **display** space (`model.value.selectedColorSpace`) and
keep `resolveColorSpace` for `PICKER_CHANNELS` only — the two lookups answer different questions and
should stop sharing a key. Rider: the hex entry's `components` are hex-digit ranges, so once it is
reachable the Components row needs its ranges from the entry rather than from `PICKER_CHANNELS.rgb`
(which would pair "Red (00-FF)" with "0 to 255").

---

## C-3 · MAJOR — the hover highlight bleeds across every conversion row

**Site.** `ColorNutritionLabel.vue:122-126`

```
hoveredPath.length && hoveredPath.includes(space as string)
    ? { backgroundColor: nodeFill, color: nodeInk }
    : undefined
```

**Mechanism.** `hoveredPath` (line 232) is ONE shared ref holding the hovered row's **node names**.
The per-node condition asks "is my *text* in that set?" — not "am I in the hovered row?". Every row
that repeats a name lights up. Since a conversion graph for a space is by definition a set of paths
that all *start at that space*, the source node repeats in every row by construction — the bleed is
guaranteed, not incidental.

**Reproduction (measured).** `node …/scratchpad/CNL-probe8.mjs`, Lab, hovering row 1 (`Lab → XYZ`):

```
A. hovered Lab row1: {"space":"Lab","nodes":[
   "Lab [LIT]","XYZ [LIT]",            ← row 1, the row the pointer is in
   "Lab [LIT]","LCh",                  ← row 2 — pointer never entered
   "Lab [LIT]","XYZ [LIT]","OKLab",    ← row 3 — pointer never entered
   "Lab [LIT]","LCh","OKLCh"]}         ← row 4 — pointer never entered
```

**6 of 10 nodes paint the live color; 4 of them are in rows the pointer never touched.** Same at
OKLCh (`CNL-probe.mjs`): hovering row 1 lit indices 0,1,2,3,5,6 of 9 — every `OKLCh` and every
`OKLab` in all three rows, each carrying the full inline pair
`backgroundColor: oklch(0.805525 0.131623 350.246); color: oklch(0 0 0)`.

The affordance is meant to read "this conversion path". It reads "every occurrence of these names",
which is not a statement about a path at all.

**Cure.** Identity by row, not by string. Replace the three-symbol `hoveredPath` /
`setHoveredPath` / `clearHoveredPath` apparatus with `const hoveredRow = ref<number | null>(null)`
and highlight on `index === hoveredRow`. This is strictly smaller code, is correct by construction,
and takes both `as any` casts (lines 111, 123) with it.

---

## C-4 · MAJOR — hover-only, mouse-only, keyboard-unreachable rows wrapped in an empty tooltip

**Sites.** `ColorNutritionLabel.vue:97-142` (the `TooltipProvider` / `Tooltip` / `TooltipTrigger`
stack), `109-113` (the trigger `<div>`), `139-140` (the empty `TooltipContent`).

**Measured (`CNL-probe.mjs`, `CNL-probe2.mjs`).**

```
=== conversion-node trigger a11y ===
{ "triggerTag": "DIV", "role": null, "tabindex": null, "cursor": "pointer",
  "ariaDescribedby": "reka-tooltip-content-v-0-6", "focusablesInSection": 0 }

=== tab-order walk (first 25 stops) ===
["A:OKLab","BODY:→oklch(…","BUTTON:Select color space","SPAN:l component value", … ]
   ← 25 consecutive Tab stops; not one lands inside the Conversion Graph

=== tooltip DOM after hover ===
{ "contentFound": true,
  "contentText": "\"\"",
  "contentHTML": "<span aria-hidden=\"true\" id=\"reka-tooltip-content-v-0-6\" role=\"tooltip\"
                   style=\"position:absolute; …clip:rect(0px,0px,0px,0px)…\"></span>",
  "totalTooltipContentNodes": 1 }
```

Four distinct defects in one construction:

1. **No keyboard path.** `focusablesInSection: 0`; a 25-stop tab walk never reaches a node. The
   only way to see the highlight is a mouse hover. WCAG 2.1.1.
2. **`cursor: pointer` on a non-interactive `<div>`** with no `role` — the pointer promises an
   activation that does not exist. WCAG 4.1.2.
3. **`aria-describedby` names an empty element.** Every row wires a description to a `<span
   role="tooltip">` whose `textContent` is `""`. Screen-reader users are pointed at nothing.
4. **The whole Tooltip stack renders nothing, ever.** `totalTooltipContentNodes: 1` — only the
   visually-hidden mirror; no visible tooltip is produced in any state. Three glass-ui components
   per row, and one **`TooltipProvider` per row** (line 97 — the provider is *inside* the `v-for`),
   instantiated to render an empty span.

Corroborating: `class="contents w-64 p-2 text-small"` on line 139 is self-contradicting —
`display: contents` erases the box that `w-64 p-2` sizes. And `colorSpaceInfo.notes` (13 entries,
one prose line each — `colorSpaceInfo.ts:38,65,90,112,139,159,185,206,237,258,284,310,332`) is
referenced by **no consumer in `demo/`** (`grep -rn "\bnotes\b" demo/` → only the table itself and
its header comment). That is almost certainly the content this tooltip was built to carry, orphaned.

**Cure — pick one, do not keep the middle.** Either (a) put `notes` in the tooltip, make the row a
real `<button type="button">` and mirror `@mouseenter`/`@mouseleave` with `@focus`/`@blur` so the
highlight has a keyboard path; or (b) delete the Tooltip stack, the `cursor-pointer` and the
`aria-describedby` entirely and let the rows be static data. Either way, one `TooltipProvider`
wraps *many* `Tooltip`s — a provider per row is the contrivance the KISS edict names.

---

## C-5 · MAJOR — the component ranges are unreadable under `dir="rtl"`

**Site.** `ColorNutritionLabel.vue:59-63`

```html
<div>
    {{ range.min }}
    <span class="italic">to</span>
    {{ range.max }}
</div>
```

Three bare inline runs in one bidi paragraph, with no isolation. The numbers are LTR-strong runs,
`to` is an LTR-strong word, and the leading `-` is a bidi-neutral — under an RTL base direction the
reorder is not cosmetic, it destroys the range.

**Reproduction (measured).** `node …/scratchpad/CNL-probe5.mjs`, `dir="rtl"` at 1440 — each range's
runs sorted by measured `getBoundingClientRect().x`:

```
=== RTL component rows (visual glyph order per cell) ===
{ "name": "L* (Lightness)", "source": "0% to 100%",  "visualLeftToRight": "to 100% 0%"  }
{ "name": "a* (Green-Red)", "source": "-125 to 125", "visualLeftToRight": "to 125 -125" }
{ "name": "b* (Blue-Yellow)","source": "-125 to 125","visualLeftToRight": "to 125 -125" }
```

In every case **the separator is no longer between its operands** — the two numbers end up adjacent
and `to` is flung to one end. Independently corroborated by the formation's own captured RTL
matrix, `docs/tranches/V/megatranche/audit/visual/shots/rtl-desktop/picker.png`, where the a\*/b\*
cells render `to 125 125-` — the minus sign visually orphaned onto the wrong number, producing the
glyph sequence `125-`.

This is an audited surface: `rtl-desktop` is one of the formation's capture matrices.

**Cure.** Emit the range as ONE isolated run — a single `computed` string `` `${min} – ${max}` ``
inside one element carrying `dir="ltr"` (or a `<bdi>`). One element, one direction, no neutral
floating between two numbers. It also retires the per-instance `<span class="italic">`.

---

## C-6 · MINOR — heading inversion: an `h3` pane title owns five `h2` children; the document has no `h1`

**Measured (`CNL-probe4.mjs`).**

```
{ "h1CountDoc": 0,
  "outline": ["H3: About the color spaces, Lab",
              "H2: Basic Information","H2: Components","H2: Key Properties",
              "H2: Conversion Graph","H2: Usage","H2: Detailed Guide", …] }
```

The pane title is `<h3>` (`demo/shared/ui/PaneHeader.vue:22`); this component's five section
headings are `<h2>` (lines 18, 43, 71, 93, 149). Every subsection outranks its own container.
`document.querySelectorAll("h1").length === 0`, corroborated by the visual REPORT's `h1` column
reading `0` on all 60 captures (`audit/visual/REPORT.md:119-178`). WCAG 1.3.1 / 2.4.10 — an AT
user navigating by heading level reads the sections as siblings of the pane, not children of it.

**Cure.** The pane ladder needs one decision, not five edits; this component's contribution is the
five `h2` → `h3` (or `h2` under a promoted `h2` title). Rider for the pane-level seat.

---

## C-7 · MINOR — `as any` casts: one provably gratuitous, two masking a wrong signature

**Sites.** lines 111 (`setHoveredPath(path as any)`), 123 (`space as string`), 160
(`(currentColorSpaceInfo.industries as any).join(", ")`).

Line 154 does the identical `.join(", ")` on `applications` with **no** cast. The two adjacent lines
disagree about the same type, which is the tell.

**Measured.** `…/scratchpad/CNL-cast-repro2.ts` reproduces lines 210-215 and 154/160 verbatim
against the real `colorSpaceInfo`, with the line-160 cast **removed**:

```
$ npx tsc --noEmit --strict --target es2022 --lib es2023 --moduleResolution bundler \
      --module esnext CNL-cast-repro2.ts
(no output — zero diagnostics)
```

The line-160 cast is **gratuitous**: it disables type checking on a live expression for nothing.

Lines 111/123 *are* load-bearing, but for the wrong reason: `conversions` is `as const` (readonly
tuples) and `setHoveredPath(path: string[])` (line 234) demands a **mutable** array. Typing the
parameter `readonly string[]` retires both casts. Under C-3's cure the handler disappears entirely.

---

## C-8 · MINOR — `defineModel` for a value the component never writes

**Site.** line 186 — `const model = defineModel<ColorModel>({ required: true })`.

The file contains **no** `model.value =`; `model` is read at 211 and 219 only. The component
publishes an `update:modelValue` contract it never fires, and the host binds it as two-way
(`AboutPane.vue:43` — `<ColorNutritionLabel … v-model="model" />`) as if it could write back. Edict
7 asks for the idiomatic Vue 3.5 shape; the honest one here is `defineProps<{ model: ColorModel }>()`.

Note for the record: this is **not** the repo's known `defineModel` stale-read hazard — that hazard
bites *writers* through the async parent round-trip, and this component never writes. The cost here
is a false mutability contract on a data-display leaf, which is a correctness-of-intent defect, not
a runtime one.

---

## C-9 · MINOR — an object round-trip over an already-ordered array, with a silent-collision failure mode

**Site.** lines 217-230 build `Record<string, {min,max}>` from `PICKER_CHANNELS[space]` — which is
already an **ordered readonly array** — via `Object.fromEntries`; line 48 immediately re-flattens it
with `Object.entries`.

The intermediate object buys nothing and costs two things:

1. **Silent channel loss.** Two channels sharing a `key` collapse to one entry, dropping a component
   from the label with no error. No current space collides (verified across all 17 rows of
   `PICKER_CHANNELS`), so this is a **latent** failure mode, not an observed one.
2. **Accidental positional coupling.** `currentColorSpaceInfo.components[index]` (line 57) is joined
   to `Object.entries` order, i.e. insertion order — which JS guarantees only while no key is
   integer-like. The names/ranges pairing rides an ordering guarantee the code never states.

**Cure.** `computed(() => PICKER_CHANNELS[space].map(meta => ({ name, min, max })))` and iterate the
array with `:key="meta.key"`. This also removes the reason `?? rangeKey` (line 57) exists and
replaces the index `:key` (line 49) with a stable one.

---

## C-10 · INFO — dead guard, array-literal class binding

- Line 123 `hoveredPath.length && …` — `[].includes(x)` is already `false`. The guard can never
  change an outcome.
- Line 127 `:class="['px-2 py-1 rounded transition-colors']"` — a one-element array binding for a
  wholly static class list, routing static classes through the dynamic patch path every render.
  `class="px-2 py-1 rounded transition-colors"` is the same thing without the indirection.

---

## C-11 · INFO — **HYPOTHESIS (no reproduction)** — `hoveredPath` is never invalidated on a space change

`clearHoveredPath` (line 238) fires on `mouseleave` only. The rows are `v-for`-keyed by `index`
(line 99), so a space change **patches the rows in place** — the hovered row is never unmounted, so
no `mouseleave` fires, and if the pointer has not moved no `mouseenter` fires either. A space change
driven from anywhere other than the pointer (keyboard on either space `Select`, a `?space=` deep
link, browser back/forward) would leave `hoveredPath` holding the **previous** space's node names,
lighting whichever new-space nodes happen to share a name.

**I could not reproduce it.** `…/scratchpad/CNL-probe8.mjs` steps B (keyboard-driven `Select`) and
C (`location.hash` write) both failed to change the space at all from the harness — the trigger
still read `Lab` afterward. Labelled a hypothesis, not a finding.

Note that C-3's cure (`hoveredRow` index) does **not** fix this on its own — the stale index would
survive the same way. The complete cure is a `watch` on the resolved space that clears the hover, or
a `:key` on the rows that changes with the space so the subtree remounts.

---

## C-12 · BLOCKER (test truth) — vacuous gate: no assertion reads any field this component renders

**Measured.**

```
$ grep -rn "Conversion Graph\|Perceptual Uniformity\|Device Dependency\|White Point\|\
Key Properties\|Basic Information" e2e/ test/ demo/test/
(no matches)

$ grep -rn "ColorNutritionLabel" test/ e2e/
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:41:  * ColorNutritionLabel "Definition" alert …
   ← a COMMENT, explaining why the Definition alert is EXCLUDED from that census
```

There is no unit test file for the component. The only executing coverage is
`e2e/smoke/oracles/o18-contrast-census.spec.ts:697-743`, which measures the **contrast ratio** of
the first `[data-o18="graph-node"]` (resting + hovered) and the first `[data-o18="component-name"]`.
It asserts ink legibility and nothing else.

**Exact mutations that keep the suite green:**

| # | Mutation | Result | Caught? |
|---|---|---|---|
| 1 | Replace lines 210-215 with `computed(() => colorSpaceInfo.rgb)` | **every** space renders CIE RGB — C-1 at 100% instead of 33% | **No** |
| 2 | Replace line 123's condition with `true` | every node paints the live fill permanently; the hover affordance is gone | **No** — o18 measures `graph-node-resting` and `graph-node-hovered`, both `contrastInkFor`-derived and passing *by construction* |
| 3 | Delete lines 97-142 (the Tooltip stack), keeping the nodes | the `aria-describedby` and the empty tooltip vanish | **No** |
| 4 | Delete lines 92-144 (the whole Conversion Graph section) | o18's `.first()` locator fails | **Yes** — the one mutation the gate catches |

The gate certifies that whatever text appears has ≥4.5:1 contrast. It does not certify that the text
is true, that the highlight follows the pointer, or that the tooltip has content. **The component
could assert that OKLCh was created in 1931 and ship green** — which is precisely C-1, already
shipped, already green.

**Cure.** A component test that is *about the data contract*: for **every** key of
`DISPLAY_COLOR_SPACE_NAMES`, mount the label and assert the rendered `Definition` matches
`colorSpaceInfo[space].definition` and the rendered component names match
`colorSpaceInfo[space].components`. That single table-driven test kills C-1, C-2 and mutation 1 at
once, and it is the test whose absence let C-1 exist.

---

## C-13 · MINOR — per-instance overrides of glass-ui roots

**Sites.** line 8 — `<Alert class="m-0 bg-well border-border/30 rounded-card">`; line 139 —
`<TooltipContent class="contents w-64 p-2 text-small">`.

Edict 5 puts styling at the design-system root, not the call site. Here the call site overrides the
glass-ui `Alert`'s margin, background, border color **and** radius — four axes — and overrides
`TooltipContent`'s `display` with `contents`, which erases the primitive's own box (and with it the
`w-64 p-2` on the same line — see C-4). The in-file comment at lines 5-7 correctly reasons that the
Definition chip belongs on the one rung-2 well tone; the conclusion belongs in a glass-ui `Alert`
variant (`tier="well"`), not in a class list on one instance.

---

## Negative proofs — what I attacked and could not break

These are stated so the DEFECTIVE verdict is not read as a blanket one. Each is a measurement.

**The F-3 fill/ink contrast chain HOLDS.** I attacked `contrastInkFor` (`demo/color-session/ink.ts`)
at both domain poles, at the black/white ink crossover, and at colors whose serialization leaves the
sRGB gamut (`rgb()` emitting >255, `hsl()` emitting negative saturation). Real painted
`backgroundColor`/`color`, resolved through a canvas, WCAG ratio computed
(`…/scratchpad/CNL-probe6.mjs`):

| space | color | painted fill | painted ink | ratio |
|---|---|---|---|---:|
| rgb | `oklch(95.83% 0.2724 9.83deg)` | `rgb(255,143,200)` *(clamped from 385.3)* | `oklch(0 0 0)` | **10.02** |
| hsl | `oklch(95.83% 0.2724 9.83deg)` | `oklch(0.9583 0.2724 9.83)` | `oklch(0 0 0)` | **10.02** |
| oklch | `oklch(0.55 0.2 250)` | `oklch(0.55 0.2 250)` | `oklch(1 0 0)` | **4.74** |
| oklch | `oklch(0.5 0 0)` / `0.501` / `0.499` | mid grey | `oklch(1 0 0)` | **6.01** |
| lab | `lab(0% 0 0)` | `lab(0 0 0)` | `oklch(1 0 0)` | **21.0** |
| lab | `lab(100% 0 0)` | `lab(100 0 0)` | `oklch(0 0 0)` | **21.0** |
| oklch | `oklch(0.62 0.28 145)` | in-gamut green | `oklch(0 0 0)` | **6.90** |
| oklch | `oklch(0.7 0.4 90)` | out-of-gamut yellow | `oklch(0 0 0)` | **7.69** |

Minimum 4.74, floor 4.5. The `resting`-rung component-name ink measured 5.76–16.88 against its true
composited ground across the same set. **No defect.** The one residual is shape, not behavior:
`nodeInk = contrastInkFor(nodeFill.value) ?? ""` (line 208) paints the fill *even when the ink
cannot be certified* (`""` → inherit), which is a fail-open split of the pair the F-3 comment says
must commit together. `contrastInkFor` returns `null` only on parse failure or `alpha !== 1`, and
`cssColorOpaque` is `serializePickerColor(withAlpha(color, 1))`
(`useColorPipeline.ts:104`) — always parseable, always opaque — so the branch is **unreachable
today**. Latent, not live; recorded, not counted.

**Tap targets — this component contributes 0 to the REPORT's 60.** Measured node boxes at 1440:
`80×35.9`, `76.8×35.9`, `54×35.9` CSS px. All above the 24px floor.

**No overflow anywhere.** 390px mobile: `docOverflowX: 0`, component names `100×48` with
`scrollWidth === clientWidth`. 200% zoom: `docOverflowX: 0`, `clipped: false` on all three names.

**Nothing to leak.** The file has **no** `requestAnimationFrame`, no `addEventListener`, no
observer, no timer, no `onMounted`/`onUnmounted`, no async, no fetch. The constellation-wide PRM-RAF
epidemic does not touch it. No `ValueUnit` construction — the nesting-accumulation hazard is absent.
No `parseCssColor` call in this file (parsing happens inside `certifyAccentInk`/`contrastInkFor`
behind `Result` types), so the live `parseCssColor` crash class has no surface here. No reka-ui
slider, so no pointer-capture leak.

**Edict 8 (`verbatimModuleSyntax`) satisfied** — line 182 `import type { ColorModel }` is the only
type-only import and it is correct. **Edict 4 (glass-ui first) satisfied** — `Alert`, `Separator`
and the `Tooltip` family are all re-exports of `@mkbabb/glass-ui`
(`demo/ui/alert/index.ts:9`, `demo/ui/separator/index.ts:1`, `demo/ui/tooltip/index.ts:1`); nothing
is hand-rolled locally. **Edict 6 (animations)** — the only motion is `transition-colors`, tokenized
by Tailwind; nothing deleted.

**Perf: inconclusive, reported as such.** A 60-step programmatic drag of the first channel slider
with the About pane mounted produced **9** style-attribute writes on `[data-o18="component-name"]`,
p95 frame `108.4ms`, max `141.7ms` (`CNL-probe7.mjs`). The frame numbers are whole-app (WebGL blob +
atmosphere + picker) and I could not attribute any share to this component, and 9 patches over 60
moves does not distinguish "computed re-evaluated and produced the same string" from "computed did
not re-evaluate". `componentInk`/`nodeInk` do depend on the **uncoalesced** `cssColorOpaque` rather
than the rAF-coalesced `cssColorOpaqueFrame` (`useColorPipeline.ts:104` vs `:279`, provided at
`App.vue:271`), which is the shape a per-tick-work defect would take — but I have no measurement
that shows it costing anything, so **I am not filing it as a finding.**

---

## Family grouping

- **Incomplete-domain / masking fallback** — C-1, C-2 (and C-9's latent collision). One mechanism:
  a partial lookup table papered over by a `? :` instead of closed by a type.
- **Identity-by-string instead of identity-by-position** — C-3, C-11. One mechanism: state keyed on
  rendered text rather than on the structure that produced it.
- **Affordance without semantics** — C-4, C-6, C-5. One mechanism: visual affordance and reading
  order built out of raw `<div>`s and bare text runs, with the roles, focus path, heading level and
  bidi isolation all left implicit.
- **Type escapes and idiom drift** — C-7, C-8, C-10, C-13.
- **Gate vacuity** — C-12, which is why the other four families survived to HEAD.
