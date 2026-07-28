# CHALLENGE-D — `demo/scenes/about/ColorNutritionLabel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/scenes/about/ColorNutritionLabel.vue` (242 lines).
- Sole consumer: `demo/scenes/about/AboutPane.vue:43`, mounted via
  `demo/shell/usePaneRouter.ts:89` as the **right pane of the `picker` view**
  (`demo/shell/viewSchema.ts:105–113`, `right: "about"`). Route `/#/`, desktop always;
  mobile only at pane-index 1.
- No source edits were made. All writes are under this directory.

---

## 0. Verdict

**DEFECTIVE.** The premise holds. This is not a component with rough edges — it is a reference
document rendered by a div-soup that (a) silently publishes another color space's encyclopedia for
**6 of the 18 spaces its own selector offers**, (b) breaks four of the five clauses the tranche
canon wrote *about this exact file*, and (c) fails five of the state axes in the standing law
(dark, RTL, reduced-motion, forced-colors, mobile density).

The canon already ruled on it. `PROPORTION-AUDIT.md:58` — row **PR-14** — reads:

> About uses a static definition as an **Alert**, **seven repeated dividers**, cursor/hover/Tooltip
> chrome around **empty conversion-path content**, and **unbounded prose** … Alert 1→0, repeated
> dividers 7→0, empty Tooltip/false trigger/hover state 1→0

Measured at HEAD, live, in WebKit: `Alert = 1`, `[role=separator]` inside `.about-card` **= 7**,
empty `TooltipContent` **= 1** (it mounts a real positioned popper on every hover),
`cursor: pointer` on a `tabIndex:-1` unnamed div **= present**, `max-inline-size` on the prose
**= `none`**. **Zero of the four subtractions have landed.** The formation's own proportion auditor
cited `ColorNutritionLabel.vue:92–141` by name on 2026-07-16 (`apotheosis/pi/formation/…/value-tranche-v-formation.jsonl:870`). Eleven days later nothing moved.

---

## 1. Method / evidence base

| Instrument | What it produced |
|---|---|
| Tracked Safari matrix | `audit/visual/shots/safari-desktop-{light,dark}/picker.png` — the only matrices that contain this component (it is the **right** pane; `safari-mobile-*` capture pane-index 0, so mobile is uncovered by the tracked matrix — see §7). |
| Pixel sampling (PIL + OKLab) | ink/ground contrast + OKLCh chroma of every text role, both schemes. |
| Live WebKit probes | 5 scripted Playwright/WebKit runs against `http://localhost:9000`, viewport 1440×900 @DPR2 unless noted. Scripts: `scratchpad/CNL-D-probe{2,3,4,5}.mjs`. Screenshots `scratchpad/CNL-D3-*.png`, `CNL-D4-hover-rm.png`. |
| Canon | `docs/tranches/V/PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`, `research/proportion-register.md`. |

Everything below is a pasted measurement, a file:line, or a quoted rule. Two items are labelled
**HYPOTHESIS** and carry no reproduction.

---

## 2. Findings

### D-1 · BLOCKER · Six of eighteen selectable spaces publish another space's encyclopedia as fact

`ColorNutritionLabel.vue:210–215`:

```ts
const space = resolveColorSpace(model.value.selectedColorSpace);
return space in colorSpaceInfo
    ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
    : colorSpaceInfo.rgb;          // ← the masking fallback
```

`demo/color-session/ColorSpaceSelector.vue:150` offers `Object.entries(DISPLAY_COLOR_SPACE_NAMES)`
— **all 18** members of `DisplayColorSpace`. `colorSpaceInfo` (`demo/color-session/colorSpaceInfo.ts`)
has **13** keys. Two independent leaks follow:

1. **Five spaces have no entry** — `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`,
   `rec2020` — and fall through to `colorSpaceInfo.rgb`.
2. **`hex` has an entry that can never be reached.** `color-model.ts:32–34` collapses
   `hex → rgb` *before* the lookup, so the shipped `colorSpaceInfo.hex` block
   (`colorSpaceInfo.ts:321–334`: `components: ["Red (00-FF)", …]`, its own definition, its own
   conversion chains) is **dead data**.

**Reproduction** (`scratchpad/CNL-D-probe2.mjs`, live, one click each):

```
===== Display-P3 =====
 "definition": "A color space based on the additive mixture of red, green, and blue light."
 "comp": [ {"text":"Red","range":"0 to 1"}, {"text":"Green",…}, {"text":"Blue",…} ]
 "basicRows": ["Device Dependency:","Device-dependent",
               "White Point:","Varies (typically D65)",
               "Gamut:","Limited (device-specific)",
               "Created:","1931"]
 "graph": ["RGB","XYZ","RGB","Kelvin","RGB","HSL","RGB","Hex"]

===== Hex =====
 "definition": "A color space based on the additive mixture of red, green, and blue light."
 "comp": [ {"text":"Red","range":"0 to 255"}, … ]
 "basicRows": [ …, "Created:","1931" ]
```

Display P3 is D65 **exactly** (not "varies"), is a **specified** gamut (not "device-specific"), and
dates from 2010/2015 (not 1931). The pane states four falsehoods as reference fact, under a heading
that reads "Basic Information", with the trigger visibly saying "Display P3". The channel *names*
come from RGB while the channel *ranges* come from P3 — one row, two provenances.

Root enabler: `colorSpaceInfo.ts:17` is `export const colorSpaceInfo = { … } as const` with **no**
`satisfies Record<DisplayColorSpace, ColorSpaceInfo>`. Its own doc-comment
(`colorSpaceInfo.ts:14–15`) asserts *"Keys cover the `DisplayColorSpace` union"* — provably false,
13 ≠ 18, and nothing type-checks the claim. This is the "no masking fallbacks" edict (owner edict 2)
violated at the exact site where the fallback is most harmful: an encyclopedia.

**Cure (transposition, not patch).** Delete the `? :` entirely. Declare
`interface ColorSpaceInfo` and write
`export const colorSpaceInfo = { … } satisfies Record<DisplayColorSpace, ColorSpaceInfo>`. Totality
becomes a compile error, the five missing entries must be authored, and `hex` stops being shadowed
(`resolveColorSpace` is a *computation* mapping, and must not be reused as a *documentation*
mapping — that conflation is the bug). The three `as any` casts (§D-16) evaporate as a side effect.

---

### D-2 · MAJOR · The hover highlight lights nodes in paths the pointer is not over

`ColorNutritionLabel.vue:122–126`:

```vue
:style="hoveredPath.length && hoveredPath.includes(space as string)
        ? { backgroundColor: nodeFill, color: nodeInk } : undefined"
```

`hoveredPath` is a **flat global array of space names**; the guard is a membership test with no
row identity. Because every conversion path for a space begins with that space, hovering **any**
row paints the leading node of **every** row — plus any interior node whose name collides.

**Reproduction** — pointer parked on row 1 (`Lab → XYZ`), `scratchpad/CNL-D-probe3.mjs`:

```
B/hover  nodes:
 {"t":"Lab","bg":"lab(92 88.800003 20)","color":"oklch(0 0 0)"}   ← row 1, hovered   ✓
 {"t":"XYZ","bg":"lab(92 88.800003 20)","color":"oklch(0 0 0)"}   ← row 1, hovered   ✓
 {"t":"Lab","bg":"lab(92 88.800003 20)","color":"oklch(0 0 0)"}   ← row 2, NOT hovered ✗
 {"t":"LCh","bg":"rgba(0, 0, 0, 0)","color":"rgb(28, 25, 23)"}    ← row 2
```

Visually confirmed in `scratchpad/CNL-D3-hover.png`: with the pointer on row 1, the "Lab" chip is
filled in **all four** rows and "XYZ" is filled in **two**. The affordance claims "this path" and
paints "every occurrence of these names". A user cannot read a path from the highlight — which is
the highlight's only job.

**Cure.** The hovered thing is a *row*, so the state is a row identity, not a name bag:
`hoveredIndex = ref<number|null>(null)`, and the node predicate becomes
`hoveredIndex === index`. Better still, per D-3/D-11 the graph should not depend on hover at all.

---

### D-3 · MAJOR · The one live-color idea in the component is erased in dark mode

`ColorNutritionLabel.vue:199–200` paints the three channel names with the picked color via
`useSafeAccentFn("resting")`. The code comment (lines 190–208) presents this as a certified,
two-role F-3 design. The guard certifies **contrast**. Nobody certified that the result still reads
as *the color*.

Measured from the tracked Safari captures (PIL sample → OKLab):

| role | light `picker.png` | dark `picker.png` |
|---|---|---|
| channel-name ink | `rgb(170,0,67)` → **L .472 C .1887 H 9.8** | `rgb(255,236,238)` → **L .959 C .0208 H 10.2** |
| body ink (same plate) | `rgb(28,25,23)` → L .216 C .0061 | `rgb(233,230,226)` → L .926 C .0063 |

Dark-mode chroma is **11.0 %** of light-mode chroma (0.0208 / 0.1887). Against the *body* ink it
sits beside, the accent's chroma advantage is **ΔC = 0.0145** — below any usable JND for 18.6 px
text. What survives is `ΔL = +0.033`: the names read as "slightly brighter white", i.e. as *emphasis*,
not as *the user's color*. Live probe agrees:
`compColor: oklch(0.958322 0.021053 9.834023)` (`CNL-D3-dark-forced`).

Look at the two captures side by side: in `safari-desktop-light/picker.png` the three names are
unmistakably crimson; in `safari-desktop-dark/picker.png` they are indistinguishable from
"Device-independent" two lines above. The component's single semantic colour gesture is
scheme-conditional and absent in one of two shipped schemes.

Secondary: in dark the names (L .959) are **brighter than the section headings** (`rgb(233,230,226)`,
L .926) — the labels out-shout the headings that govern them. Hierarchy inverted.

**Cure.** Either the live color is data — in which case it must carry a *fill* (a chip, which reads
as color at any lightness) rather than *ink* (which the contrast guard is entitled to bleach) — or
it is decoration, in which case it must go, because the same color on all three names encodes
nothing that distinguishes L\* from a\* from b\*.

---

### D-4 · MAJOR · PR-14 is 0-of-4 discharged at HEAD; this file is where the row came from

`PROPORTION-AUDIT.md:58` and `research/proportion-register.md:48` bind four subtractions. Measured
live (`CNL-D-probe3.mjs` `B/styles`, `CNL-D-probe4.mjs`):

| PR-14 clause | Contract | Measured at `c654824e` |
|---|---|---|
| `Alert 1→0` | 0 | **1** — `ColorNutritionLabel.vue:8`; `role` is `null`, tag `DIV` (so it is not even an alert semantically — it is a `<div>` wearing an Alert's costume) |
| `repeated dividers 7→0` | 0 | **7** — `separators: 7` (5 here at L15/40/68/90/146 + 2 in `AboutPane.vue:29,46`) |
| `empty Tooltip / false trigger / hover state 1→0` | 0 | **1** — `TooltipContent` at L139–140 has **no children**; on hover it mounts `<div data-reka-popper-content-wrapper style="position: fixed; … z-index: 120; --reka-popper-available-width: 1440px; …">` measuring **`{w: 0, h: 0}`** |
| prose `≤66ch` | `max-inline-size: 66ch` | **`maxInline: "none"`** — the cap does not exist; the observed 52.4 ch is an accident of pane width, not a mechanism |

The false trigger is fully instrumented: `cursor: "pointer"`, `tabIndex: -1`, `role: null`,
`aria-describedby: null`, `data-state: "closed" → "delayed-open"`. So it *looks* clickable, is
*unreachable* by keyboard, is *unnamed* to AT, opens a *0×0* popper, and runs Floating-UI
positioning math on every hover to paint nothing.

This violates `PROPORTION-AUDIT.md §5` rule 5 ("A small icon/mark is either data, status, labeled
action, drag affordance, focus/selection register **or removed**. Decorative controls and operable
ornaments without names are forbidden") and rule 6 ("Subtraction precedes explanation").

**Cure.** Delete `TooltipProvider`/`Tooltip`/`TooltipTrigger`/`TooltipContent` and the four import
specifiers; delete `cursor-pointer`, `hover:bg-accent/50`, `setHoveredPath`, `clearHoveredPath`,
`hoveredPath`, `nodeFill`, `nodeInk`. Render the conversion graph as a static `<ol>` — the register
says it plainly: *"ordered conversion data is readable without hover"*
(`research/proportion-register.md:48`). Dividers 7→0; the section rhythm plus `<h2>` already
declares every boundary (`§5` rule 4).

---

### D-5 · MAJOR · Five section headings are set in the display face the constitution forbids for headings

`VISUAL-CONSTITUTION.md:70–78` is a **closed** matrix ("This matrix is closed across all eighteen
compositions"):

| role | token | family |
|---|---|---|
| palette identity | `--type-subheading` | Fraunces |
| **section heading** | **`text-heading`** | **Plus Jakarta Sans** |

`ColorNutritionLabel.vue:18, 43, 71, 93, 149` all read `class="font-display text-subheading"`.
Two violations per heading, five headings. Measured:

```
h2: {"txt":"Basic Information","font":"Fraunces","size":"20.351999px","weight":"600"}
```

The file's own header comment (L2–3) codifies the error — *"only the section headings below are
display rungs"* — asserting exactly the inverse of the constitution. This survived a prior
adjudication: `docs/tranches/N/audit/lanes2/D4.md:239` filed **WO-3** ("strip blanket
`font-display`; Fraunces only at display rungs", marked **P0**) and it was never applied here.

**Cure.** `class="text-heading"`, five sites, and delete the header comment that licenses the
violation.

---

### D-6 · MAJOR · Every value in a "nutrition label" is set in proportional sans, next to a Picker that sets its values in mono

`VISUAL-CONSTITUTION.md:76` — *"value/code/provenance `text-mono-small` or existing `mono-caption`"*
and *"Fira Code owns mono roles"*. Measured:

```
range : {"txt":"0% to 100%","font":"Plus Jakarta Sans","size":"16.4px"}
value : {"txt":"Device-independent","font":"Plus Jakarta Sans","size":"16.4px"}
```

Roughly a dozen value cells — the ranges (×3), `whitePoint`, `gamut`, `created`, and the three
Yes/No properties — are proportional. Meanwhile, **on the same route, 300 px to the left**, the
Picker rail renders `92.0%` / `88.8` / `20.0` in Fira Code (visible in
`safari-desktop-light/picker.png`). The app contradicts itself within one viewport. Numeric ranges
in a proportional face also lose column alignment: `-125 to 125` and `0% to 100%` do not register.

**Cure.** `text-mono-small` on the value/range cells; the labels stay `text-small` PJS per VC:75.

---

### D-7 · MAJOR · The lede is the smallest and faintest text on the plate — hierarchy inverted twice

Full measured type/contrast table (probe 5 + PIL sampling of `safari-desktop-light/picker.png`):

| element | size | contrast vs its ground |
|---|---|---|
| section `<h2>` | 20.35 px | 12.70 : 1 |
| channel name | 18.61 px | 5.50 : 1 |
| conversion node | 18.61 px | — |
| label / value / range | 16.40 px | 13.15 / 13.34 / 12.79 : 1 |
| Alert **title** "Definition" | 16.40 px | 13.52 : 1 |
| **Alert description — the definition itself** | **14.00 px** | **5.08 : 1** |

The single most-load-bearing sentence per space — the thing the whole pane exists to deliver — is
the **smallest** type in the component and the **faintest** ink (`rgb(112,89,66)`, 2.6× less
contrast than the "Yes" it sits above). And it is introduced by a *title* that is 17 % larger and
2.7× higher-contrast than the sentence it labels. Two inversions, one block.

Dark mode reproduces it: description 5.97 : 1 against every sibling at 5.0–5.8 : 1, i.e. the lede
loses its relative advantage in both schemes.

**Cure.** The definition is the article's lead paragraph, not an admonition. Promote it to
`text-prose` at `--foreground`, kill the "Definition" title (the heading tells you nothing the
sentence doesn't), and let §D-4's Alert removal carry it.

---

### D-8 · MAJOR · `bg-well` is an opaque neutral inside a translucent accent-tinted plate — the well is off-hue in both schemes and *raised* in light

Measured computed styles (probe 3, `B/styles`):

```
plate : "oklab(0.928273 0.005506 0.013193 / 0.664)"   ← α = 0.664, the accent atmosphere composites through
alert : "oklab(0.913299 0.005463 0.013024)"           ← α = 1.0, fully opaque
```

`--well-bg` is `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`
(`demo/styles/foundation.css:328`) — derived from the **untinted** `--card`. The plate is not
`--card`; it is `--card` at 66 % over a live accent field. An opaque neutral inside a translucent
tinted surround cannot match, ever. Sampled composited result:

| | plate | well | delta |
|---|---|---|---|
| light | L .899 C .0354 **H 35.3°** | L .914 C .0139 **H 67.7°** | **ΔH 32.4°**, well is **+0.015 L — lighter than its surround** |
| dark | L .474 C .0545 **H 9.5°** | L .346 C .0207 **H 58.0°** | **ΔH 48.5°** |

Two independent design failures:

1. **Off-palette.** The Definition block reads grey-khaki inside a rose plate — visible without
   instruments in `safari-desktop-light/picker.png` and unmistakable at mobile
   (`scratchpad/CNL-D3-mobile390.png`, where the beige box occupies a third of the fold). The same
   token is applied to each conversion-path container (`L110`), so the defect repeats ×4.
2. **The affordance inverts.** A "well" means *recessed*. In light mode it renders **lighter** than
   the plate — a raised tile. The name and the recipe agree; the composite does not. `§5` rule 8 is
   explicit: *"Real rendered relation wins over token intent … token presence alone cannot close a
   row."*

Compounding: the base Alert carries `[backdrop-filter:var(--glass-blur-wash)]`, measured
`backdrop-filter: blur(1px) saturate(1.4)` — behind a **fully opaque** fill. A compositing layer is
allocated and a blur is executed whose result is 100 % occluded.

**Cure.** A well nested in a translucent tinted plate must be *relative to the composite*, not
absolute: a tone-step expressed as an alpha over the plate (`background: color-mix(in oklab,
transparent, var(--foreground) 6%)`), so it inherits the plate's hue by construction and is always
darker. And drop the backdrop-filter wherever the fill is opaque.

---

### D-9 · MAJOR · `grid-cols-3` is hardcoded for a channel count that is 1, 3, or 4

`ColorNutritionLabel.vue:46` — `class="grid grid-cols-3 gap-4 text-small"` — for a list whose length
is `PICKER_CHANNELS[space].length`. `demo/color-session/picker-color.ts:62` gives
`kelvin: [{ key: "kelvin", … }]` — **one** channel.

**Reproduction** (probe 2, Kelvin selected):

```
"comp": [ {"text":"Temperature (K)","range":"1000K to 40000K","x":754,"w":143} ]
"compGridCols": "143.328125px 143.328125px 143.34375px"
"compGridW": 462
```

One cell, three tracks: **318 px (69 %) of the "Components" section is empty**, under a heading that
promises components. A state nobody designed.

**Reproduction at 390 px** (probe 3, `D/mobile390`, screenshot `CNL-D3-mobile390.png`):

```
"cells":[{"t":"L* (Lightness)","w":100,"h":48,"lines":2},
         {"t":"a* (Green-Red)","w":100,"h":48,"lines":2},
         {"t":"b* (Blue-Yellow)","w":100,"h":48,"lines":2}]
```

100 px tracks — ≈ 11 ch at 18.6 px — force every name to two lines, and the break lands **inside the
compound axis name**: the screenshot shows `a* (Green-` / `Red)` and `b* (Blue-` / `Yellow)`. A
reader sees "Green-" and parses a hyphenated word break, not an opponent axis. `L* (Lightness)`
splits its symbol from its gloss. Three ugly breaks, every mobile view, every Lab-family space.

**Cure.** The track count is *data*: `grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr))`.
One channel gets one full-width row; three get three at desktop and one column at 390 px; a
future 4-channel space works without an edit. Add `text-wrap: balance`/`hyphens: manual` so the
compound names do not break at their internal hyphen.

---

### D-10 · MAJOR · The label/value grid is a fixed 50/50 split; short labels hoard the width long values need

`ColorNutritionLabel.vue:26` and `:74` — `grid grid-cols-2 gap-2`. Measured (probe 2, 1440 px):

```
{"t":"Device Dependency:","x":754,"w":227} {"t":"Device-independent","x":989,"w":227}
{"t":"White Point:","x":754,"w":227}       {"t":"Variable (typically D50 or D","x":989,"w":227}
```

`Gamut:` is ~50 px of ink in a 227 px track — **177 px of dead gutter**. In the very same grid,
`Variable (typically D50 or D65)` **wraps to two lines** inside its 227 px track while those 177 px
sit unused one column to the left. The layout starves the column that needs width to feed the column
that does not. Visible as a ragged, gappy two-column block in both tracked desktop captures. At
390 px it repeats at 162/162 px.

This is a `<dl>` — label/definition pairs — expressed as an anonymous div grid, so it also carries
no semantics (§D-19).

**Cure.** `grid-template-columns: max-content 1fr` (or glass-ui `LabeledField`, which exists —
`node_modules/@mkbabb/glass-ui/dist/components/labeled-field/index.d.ts:1`). Labels shrink to their
ink; values take the remainder and stop wrapping.

---

### D-11 · MAJOR · RTL renders the numeric ranges *wrong*, not merely mirrored

`ColorNutritionLabel.vue:59–63` composes a range from three unisolated inline runs:

```vue
{{ range.min }} <span class="italic">to</span> {{ range.max }}
```

There is no `dir`, no `<bdi>`, no `unicode-bidi: isolate`. Under `dir="rtl"` the bidi algorithm
reorders the neutral runs. **Reproduction**: probe 3 `D/rtl`, screenshot `scratchpad/CNL-D3-rtl.png`:

- `0% to 100%` renders as **`to 100% 0%`**
- `-125 to 125` renders as **`to 125 125-`** — the minus sign detaches from its number and lands
  after it. The reader is shown `125-`.
- Labels render as **`:Device Dependency`** — the colon jumps to the left, because the colon is baked
  into the label *content* (`L27`: `<div class="italic">Device Dependency:</div>`) instead of being a
  presentational separator.
- The channel order reverses to `b* | a* | L*`. The components of a color space are an **ordered**
  triple; mirroring them is a factual error, not a layout preference.

The tracked matrix captures `rtl-desktop/picker.png`, so RTL is an audited state of this build; this
component fails it at the data level.

**Cure.** Ranges are LTR technical notation: wrap the range cell in `<bdi dir="ltr">` (or emit one
text node `${min}–${max}` with an en-dash and no interleaved element). Move the colon out of content
into `::after`. Put `dir="ltr"` on the ordered channel grid.

---

### D-12 · MAJOR · The empty tooltip defeats the app's global `prefers-reduced-motion` guard

`demo/styles/animations.css:184–193` zeroes transitions app-wide
(`transition-duration: 0.01ms !important` on `*`). `animations.css:202–212` then carves out overlay
primitives **by attribute**:

```css
@media (prefers-reduced-motion: reduce) {
    [data-state="open"], [data-state="closed"], … {
        transition-duration: 150ms !important;
        transition-property: opacity !important;
    }
}
```

Wrapping the conversion well in `TooltipTrigger as-child` (`L103–113`) makes reka-ui stamp
`data-state="closed"` onto that decorative `<div>`. It therefore matches the overlay carve-out.

**Reproduction** — `scratchpad/CNL-D-probe4.mjs`, context launched with `reducedMotion: "reduce"`:

```
"boxAttrs": ["class=flex flex-wrap items-center p-3 bg-well rounded-panel hover:",
             "data-state=closed", "data-grace-area-trigger="]
"boxDur":  "0.15s"        ← NOT 0.01ms
"boxProp": "opacity"      ← NOT background-color
"matched": true           ← box.matches('[data-state="closed"]')
```

Two consequences: the well still animates for 150 ms for a user who asked for no motion, **and** the
carve-out rewrites `transition-property` to `opacity`, so the hover's actual `background-color`
change becomes an un-eased jump. The reduced-motion register is strictly worse than the normal one.

Separately, the motion is not tokenized. Measured in the normal register:

```
transition: color .2s cubic-bezier(.4,0,.2,1), background-color .2s …, border-color .2s …,
            outline-color .2s …, text-decoration-color .2s …, fill .2s …, stroke .2s …,
            --tw-gradient-from .2s …, --tw-gradient-via .2s …, --tw-gradient-to .2s …
```

Ten animatable properties registered for two that change, at Tailwind's stock `.2s` /
`cubic-bezier(.4,0,.2,1)` — not the project's `--animation-slide-*` / `--duration-*` ladder that
glass-ui and `animations.css` both publish.

**Cure.** D-4 removes the tooltip, which removes `data-state`, which restores the guard. Whatever
color transition survives should name its own two properties and consume the duration/easing tokens.

---

### D-13 · MAJOR · Every italic label is a synthesized oblique — Plus Jakarta Sans ships no italic face

The italic run is this component's principal labelling device: nine source sites
(`L27, 31, 33, 35, 61, 75, 79, 83, 152, 158`), ~12 rendered runs. Measured:

```
label: {"txt":"Device Dependency:","font":"Plus Jakarta Sans","style":"italic","weight":"400"}
```

And the corpus (`node_modules/@mkbabb/glass-ui/dist/styles/fonts.css`, all `@font-face` blocks whose
family contains "Jakarta"):

```
"Plus Jakarta Sans" | style= normal | weight= 200 800
"Plus Jakarta Sans" | style= normal | weight= 200 800
```

**Two faces, both `normal`. There is no italic face.** Every one of those labels is a browser-shear
faux oblique: wrong stroke contrast, wrong terminals, and on a variable font an uneven optical
weight. Compare `Fraunces|italic|100 900`, which *is* loaded — the header's "*Lab*" is a real italic
and the labels are not, in the same card.

Compounding: italic is doing **three different jobs** here — the label column (`L27`), the conjunction
inside a numeric range (`L61`), and run-in lead-ins in Usage (`L152,158`). One faux visual device,
three semantics.

**Cure.** Retire italic as the label device. `VISUAL-CONSTITUTION.md:75` already assigns
control/label to `text-small` PJS **non-bold**; distinguish label from value by *color* (muted) and
*position*, which is what a `<dl>` gives free.

---

### D-14 · MAJOR · The component's live-color surfaces are absent from the forced-colors roster that was written for exactly them

`demo/styles/foundation.css:653–657` states the policy:

> the surfaces whose whole PURPOSE is to show a color — the actual content of a color tool — **must
> survive WHCM's system-color substitution**.

The tier-1 roster at `foundation.css:680–695` enumerates fourteen selectors plus the generic
`[data-color-surface]`. **Neither `[data-o18="graph-node"]` nor the channel-name ink is in it**, and
the component sets no `data-color-surface`. Yet `ColorNutritionLabel.vue:202–204` explicitly declares
the hovered node *"the LIVE COLOR as data (C3: color-data surface)"*. The code claims membership in a
roster it never joined.

Probe (`C/forced`, `forcedColors: active`) shows zero forced-colors adaptation of any kind in this
subtree — `compColor` stays `oklch(0.519 0.208 9.83)`, `alertBg` stays the author well:

```
C/ forced      {"compColor":"oklch(0.519287 0.207684 9.834023)","alertBg":"oklab(0.913299 …)"}
C/ dark-forced {"compColor":"oklch(0.958322 0.021053 9.834023)","alertBg":"oklab(0.345296 …)"}
```

*Caveat, honestly stated:* WebKit's `forcedColors: active` emulation sets the media query but does
not perform the real system-color substitution, so this probe proves **the absence of any authored
forced-colors rule**, not the final WHCM pixels. The roster omission is nonetheless a static,
verifiable fact against a written policy.

**Cure.** Add the color-data node to the roster (or give it `data-color-surface`), and — better —
apply D-3's cure so the color is a *fill*, which is what the roster is designed to protect.

---

### D-15 · MAJOR · Hand-rolled pills where glass-ui `Badge`/`Chip` exist and are already re-exported one directory away

`ColorNutritionLabel.vue:127` — `:class="['px-2 py-1 rounded transition-colors']"` — a bespoke chip.
The design system ships the primitive:

```
node_modules/@mkbabb/glass-ui/dist/components/badge/index.d.ts:2  export { default as Badge } …
node_modules/@mkbabb/glass-ui/dist/components/chip/index.d.ts:1   export { default as Chip } …
demo/ui/badge/index.ts:1  export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
```

`demo/ui/badge` is a **pure re-export** — the component already imports `Alert` from the sibling
`demo/ui/alert` barrel, so the primitive is literally one import specifier away. Owner edict 4
("Glass-ui is the design system … Reuse existing component-type names") is violated with no
mitigating friction. The same applies to the label/value pairs vs `LabeledField`.

The bespoke pill also carries the `:class="[...]"` array-with-one-string idiom — an array binding
where a static `class` attribute would do (`L127`), left over from a conditional that no longer
exists.

**Cure.** `<Badge>` for the graph nodes with a real `variant`/`tone`; if the hovered/live state
survives adjudication it becomes a badge tone, defined **at the root** (edict 5), not an inline
`:style`.

---

### D-16 · MAJOR · The `rounded-card` instance override silently loses the cascade — measured 8 px where 16 px was intended

`ColorNutritionLabel.vue:8` — `<Alert class="m-0 bg-well border-border/30 rounded-card">`.
The base Alert already declares `rounded-lg`; both classes coexist in the live class list:

```
"relative w-full rounded-lg border px-4 py-3 … text-card-foreground m-0 bg-well border-border/30 rounded-card"
```

`demo/DESIGN.md:194` — *"`rounded-card` (= `--radius-card` = **16 px**) — Card surfaces …"*.
Measured: **`borderRadius: "8px"`**. `rounded-lg` won; the override is dead ink, and the Definition
block therefore renders at half the corner radius of every other card surface it sits inside —
visible in both tracked captures as a subtly "tighter" box.

This is the exact hazard `AboutPane.vue:38–40` documents in prose for its own class list:

> glass-ui's slim `cn` does not conflict-resolve, so an axis utility sorts earlier and silently
> **LOSES** the cascade

The sibling file wrote the warning; this file walked into it. Four per-instance overrides
(`m-0`, `bg-well`, `border-border/30`, `rounded-card`) on a design-system root — owner edict 5 —
of which at least one provably does not paint.

**Cure.** D-4 deletes the Alert. If any well survives, it becomes a **variant at the root**, not four
utilities at the call site.

---

### D-17 · MINOR · Same role, two rhythms: "Conversion Graph" is 16 px off its heading, the other four are 8 px

Measured (probe, `sections[].gapToBody`):

```
Basic Information 8   Components 8   Key Properties 8   Conversion Graph 16   Usage 8
```

Cause: `L92` uses `<section class="space-y-4">` with a bare `<h2>`, while `L17/42/70/148` use
`<h2 class="… mb-2">`. Two spacing mechanisms for one role, differing by 2×.

This is not new. `docs/tranches/N/audit/lanes2/U-FIXES.md:147` recorded it verbatim —
*"'Conversion Graph' h2 → body | **16px** (`space-y-4`) | ColorNutritionLabel.vue:83 |
**inconsistent (8 vs 16 for the same role)**"* — and it is still here.

Related: the component's own rhythm (`gap-4`, `mb-2`, `gap-2` — raw Tailwind) is a different system
from the one its host uses on the very next line (`AboutPane.vue:42,48`: `pt-phi-3 pb-phi-3`, the φ
ladder). Parent and child do not share a spacing vocabulary.

---

### D-18 · MINOR · Dead and duplicated classes on the root, three of them injected per-instance by the parent

Measured root class list:

```
"w-full grid grid-cols-1 gap-4 relative w-full p-0 m-0"
rootHasAbsChild: false
```

- `w-full` **twice** (own `L4` + `AboutPane.vue:43`'s `class="w-full p-0 m-0"`).
- `relative` with **no** absolutely-positioned descendant — dead since whatever it once anchored.
- `p-0 m-0` on an element with no padding or margin to cancel — dead.
- `grid grid-cols-1` where a single-column stack is `flex flex-col` / `space-y-*`; the grid buys
  nothing and costs the reader a wrong mental model (see D-9, where a *real* grid needed care).

`AboutPane.vue:43`'s three classes are a per-instance override of a child's own layout — edict 5,
and the child already sets `w-full`.

---

### D-19 · MINOR · No document semantics: five anonymous `<section>`s, five `<h2>`s, zero `<h1>`, and a `<dl>` written as divs

Measured: `h1: 0` document-wide; `h2InCard: 10`; `sectionsWithoutName: 5`.
The tracked audit corroborates document-wide — `audit/visual/REPORT.md:119–178`, the `h1` column is
**0 on all 60 captures**.

`PROPORTION-AUDIT.md §5` rule 11: *"route H1 owns heading hierarchy."* There is no H1 to own it, so
this component's five `<h2>`s float. A `<section>` without an accessible name is not a landmark, so
the five `<section>` elements are semantically inert wrappers. And the label/value pairs — a textbook
description list — are `<div>`/`<div>` (`L26–37`, `L74–87`), so the pairing is conveyed by grid
geometry alone and evaporates in linearized reading order (exactly what §D-11's RTL run exposes).

---

### D-20 · MINOR · Optical imbalance: the connector out-weighs the things it connects

Measured: conversion node text 18.61 px PJS 400 at `rgb(28,25,23)`; `ArrowRight`
(`L132–135`, no size class) renders **24 × 24 px, stroke-width 2 px, color `rgb(28,25,23)`** — the
same full-`--foreground` ink as the labels but ~1.8× their cap height and a heavier stroke than the
type's stem. In `scratchpad/CNL-D3-hover.png` the arrows are the loudest marks in the Conversion
Graph; the eye reads a row of arrows with words between them.

Layout compounds it: `flex flex-wrap gap-4` (`L96`) packs four variable-width wells into a ragged
2 + 1 + 1 arrangement with no alignment between rows. And the source space is repeated as the first
node of **all four** paths ("Lab" ×4) — the root of a rooted graph, restated four times.

**Cure.** Subordinate the connector (muted ink, `size-4`), factor the shared root out of the paths,
and set the paths as an `<ol>` on one column so the branch structure reads.

---

### D-21 · MINOR · `defineModel<ColorModel>` gives a read-only leaf a two-way handle on the session model

`L186` declares `defineModel<ColorModel>({ required: true })`. Grep of every `model` occurrence in
the file: `L182` (type import), `L183`, `L186` (declaration), `L211`, `L219` — **both uses are reads
of `model.value.selectedColorSpace`**. Nothing is ever written.

Yet the two-way plumbing is threaded all the way up: `AboutPane.vue:43` `v-model="model"` →
`AboutPane.vue:72` `defineModel` → `usePaneRouter.ts:146–151` `"onUpdate:modelValue": (v) =>
deps.updateModel(v)`. A presentational label holds a mutable handle on the entire color session in
order to read one string. Owner edict 3 (KISS) and encapsulation.

**Cure.** `const props = defineProps<{ space: DisplayColorSpace }>()`. The component's whole input is
one union member.

---

### D-22 · MINOR · Type escapes and index keys

- `L111` `setHoveredPath(path as any)`, `L123` `space as string`, `L160`
  `(currentColorSpaceInfo.industries as any).join(", ")`. All three are downstream of D-1's untyped
  `as const` table: the union of 13 heterogeneous literal tuples has no callable `.join`.
- `L49` and `L99` both use `:key="index"`. The natural keys exist (`rangeKey`; `path.join(">")`).
  With an index key, switching space patches nodes in place while `:style` bindings re-evaluate —
  a transient wrong-fill frame is possible (**HYPOTHESIS** — not reproduced).
- `L207` `const nodeFill = cssColorOpaque` — a bare alias of the injected ref with no transform.
- `verbatimModuleSyntax` (edict 8) is **satisfied**: `L182` is the only type-only import and it is
  `import type`. No defect.

---

### D-23 · INFO · Copy defects in a table presented as reference

Kelvin's `Created:` cell renders **"Beginning of time"** (probe 2, `basicRows`). Whimsy is fine in
prose; in a four-row fact table beside "1976" and "1931" it reads as a data error. Similarly the
`hex` entry that never renders (D-1) is the only one with correctly-notated components
(`"Red (00-FF)"`), so the reachable path shows Hex channels as `0 to 255`.

---

### D-24 · INFO · 200 % zoom is handled by the shell, not by this component

Probe 3 `D/zoom200` at 720 × 450 (the 1440 × 900 / 200 % equivalent) returns
`{"missing": true}` — `.about-card` is not in the DOM. `scratchpad/CNL-D3-zoom200.png` shows the
shell has correctly collapsed to a single pane with a visible `Picker | About` segmented control, so
the content is reachable in one interaction. **Not a defect of this component.** Its behaviour at that
width is the 356 px case already measured in D-9.

---

## 3. Mechanism families

| Family | Findings | One cure |
|---|---|---|
| **Untyped data table + masking fallback** | D-1, D-22, D-23 | `satisfies Record<DisplayColorSpace, ColorSpaceInfo>`; delete the `? :` |
| **PR-14 subtraction never executed** | D-4, D-2, D-12, D-16, D-17 | Execute PR-14: Alert 1→0, dividers 7→0, Tooltip/false-trigger/hover 1→0, declare the 66 ch cap |
| **Type role matrix ignored** | D-5, D-6, D-7, D-13 | Apply `VISUAL-CONSTITUTION.md:70–78` verbatim: `text-heading`/PJS headings, `text-mono-small` values, retire faux italic, promote the lede |
| **Opaque token inside a translucent tinted plate** | D-8 | Express the well as an alpha step over the plate, not an absolute `--card` derivative |
| **Layout constants where the data supplies the count/width** | D-9, D-10, D-20, D-18 | `auto-fit`/`max-content 1fr`; `<dl>` + `<ol>`; glass-ui `LabeledField`/`Badge` |
| **Live color treated as ink, uncertified for chroma** | D-3, D-14 | Color-as-data is a *fill*, rostered for forced-colors; color-as-ink is decoration and goes |
| **No bidi isolation on LTR technical notation** | D-11, D-19 | `<bdi dir="ltr">` on ranges; `dir="ltr"` on the ordered channel list; colon out of content |
| **Design-system boundary crossed** | D-15, D-16, D-21, D-18 | Consume `Badge`/`LabeledField`; variants at the root; props not `defineModel` |

## 4. The gestalt cure

This file is a **document**, and it is written as a component. Every finding above is a symptom of
that one category error: an article's headings become `<h2 class="font-display">`; its description
list becomes `grid-cols-2`; its lead paragraph becomes an `Alert`; its ordered conversion graph
becomes a hover-only div with an empty tooltip; its channel table becomes `grid-cols-3` regardless of
how many channels exist; its facts become an untyped object literal with a fallback that lies.

The transposition PR-14 already names — *"one bounded structural article; lead paragraph, headings
and interval express hierarchy"* — resolves the majority of these at once:

```
<article style="max-inline-size: 66ch">          ← D-4 prose cap, D-19 semantics
  <p class="text-prose">{{ info.definition }}</p> ← D-4 Alert 1→0, D-7 lede promoted, D-8 well gone
  <h2 class="text-heading">…</h2>                 ← D-5 family+rung
  <dl>…</dl>                                      ← D-10 max-content 1fr, D-13 italic retired, D-19
  <ul style="grid-template-columns: repeat(auto-fit, minmax(9rem,1fr))">
      <li><span class="channel">…</span>
          <bdi dir="ltr" class="text-mono-small">…–…</bdi></li>   ← D-6, D-9, D-11
  </ul>
  <ol dir="ltr">…<Badge/>…</ol>                   ← D-2/D-4/D-12/D-15/D-20 all die together
</article>
```

with no `<Separator>` anywhere (D-4), fed by a `satisfies Record<DisplayColorSpace, ColorSpaceInfo>`
table (D-1) and a single `space` prop (D-21). That is fewer lines than the file has today.

## 5. Artefacts

- Report: `docs/tranches/V/megatranche/audit/components/ColorNutritionLabel/challenge-D-design.md`
- Probe scripts (scratchpad, not tracked):
  `CNL-D-probe2.mjs` (space-by-space content), `CNL-D-probe3.mjs` (styles/hover/RM/forced/mobile/RTL/zoom),
  `CNL-D-probe4.mjs` (reduced-motion carve-out + tooltip DOM), `CNL-D-probe5.mjs` (type roles).
- Probe screenshots (scratchpad): `CNL-D3-hover.png`, `CNL-D3-mobile390.png`, `CNL-D3-rtl.png`,
  `CNL-D3-zoom200.png`, `CNL-D3-forced.png`, `CNL-D4-hover-rm.png`.
- Tracked captures read: `audit/visual/shots/safari-desktop-light/picker.png`,
  `audit/visual/shots/safari-desktop-dark/picker.png`.

**Coverage note for the visual audit:** the tracked Safari matrix contains this component **only** in
`safari-desktop-{light,dark}/picker.png`. `viewSchema.ts:105–113` omits `defaultPaneIndex` for the
`picker` view, so mobile arrives at pane 0 and `safari-mobile-*/picker.png` shows the Picker, not
About. The `rtl-*`, `forced-colors-*`, `reduced-motion-*`, `keyboard-focus-*` and `zoom-200-*`
matrices capture only 5–6 routes and likewise land on the Picker pane. **This component has no
tracked mobile, RTL, forced-colors, reduced-motion or focus capture.** D-9, D-11, D-12 and D-14 were
found only because I drove the pane open by hand. The capture harness should select pane-index 1 for
`/#/` in the mobile and modality matrices.
