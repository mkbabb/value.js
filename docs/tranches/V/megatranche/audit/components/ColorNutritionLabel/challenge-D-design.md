# CHALLENGE-D — design · `demo/scenes/about/ColorNutritionLabel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and I am running under it; the declaration is not
inherited and not undeclared.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject `demo/scenes/about/ColorNutritionLabel.vue`, 242 lines, area `scenes`.
- **No source edits.** Every write from this seat is under
  `docs/tranches/V/megatranche/audit/components/ColorNutritionLabel/`. A prior pass was preserved
  byte-identically to `challenge-D-design.pass-1.md` (verified with `cmp`) before this file was
  written.

---

## 0. Verdict

**DEFECTIVE — BLOCKER.**

The premise holds and understates the case. This is not a component with rough edges. It is a
**reference document that publishes false facts**, built out of a materials palette in which
**every structural device it uses is one the platform is allowed to delete** — alpha dividers, an
alpha-bordered well, a translucent chip fill, and two inline `style` colors. Turn on forced colors
and the component renders as unstructured text whose hover state has a measured contrast delta of
**1.00:1**. Widen the display past ~2086px and its section headings become *smaller than the data
they head*. Select any of five color spaces the app's own selector offers and the plate confidently
states the wrong century.

The tranche canon already ruled on this exact file — `PROPORTION-AUDIT.md:58`, row **PR-14** — and
names its Alert, its repeated dividers, its empty Tooltip and its unbounded prose. **Zero of the
four ordered subtractions have landed.** Measured at HEAD, live, this session.

The strongest defect is none of those. It is **D-1**: the plate is a lie for 6 of the 18 color
spaces the user can pick.

---

## 1. Method and evidence base

Everything below is a rendered pixel, a computed style read from the live document, a pasted
command output, or a quoted clause of canon. Where a claim is an inference rather than a
measurement it is labelled **HYPOTHESIS**.

| Probe | Path | What it produced |
|---|---|---|
| structure / type / geometry | `scratchpad/D-cnl-probe-v2.mjs` → `D-cnl-probe.json` | WebKit, 7 contexts: desktop light/dark 1440, iPhone 14, 320px, Display-P3 selection, reduced-motion, forced-colors |
| contrast (specified colors) | `scratchpad/D-cnl-contrast.mjs` → `D-cnl-contrast.json` | canvas-resolved `oklab()`/`oklch()`/`lab()` → sRGB, alpha stacks composited |
| **rendered-pixel** contrast | `scratchpad/D-cnl-pixels.mjs` → `D-cnl-pixels.json` | screenshot clips round-tripped back into the page and read with `getImageData` — real painted pixels, not models |
| forced-colors, real engine | `scratchpad/D-cnl-chromium.mjs` → `D-cnl-chromium.json` | **Chromium** — the engine where Windows High Contrast actually ships |
| existing matrix | `docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,rtl-desktop,forced-colors-desktop}/picker.png` | the tracked Safari + state captures, read visually |

Scratchpad root:
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
(frames under `D-shots/`).

**Mount.** The component is *not* on a `/about` route. `demo/shell/viewSchema.ts:105-113` gives the
`picker` view `left: "color-picker"`, `right: "about"`; `demo/shell/usePaneRouter.ts:89` maps
`"about" → AboutPane`; `AboutPane.vue:43` renders it. It therefore lives on **`/#/`**, the index
route — desktop always, mobile behind the `Picker | About` segmented control. That is why the
tracked `visual/REPORT.md` enumerates 15 routes with no `/about` row: this component's pixels are in
the `/#/` rows.

---

## 2. The canon's standing ruling, re-measured at HEAD

`PROPORTION-AUDIT.md:58` (PR-14) and `VISUAL-CONSTITUTION.md:218` are both written *about this
file*. Their four subtractions:

| Canon clause | Ordered | Measured now | Status |
|---|---|---|---|
| "static definition … not an Alert" — `Alert 1→0` | 0 | `[data-slot=alert]` inside `.about-card` = **1** (`:8`) | **RED** |
| "without the current seven repeated dividers" — `dividers 7→0` | 0 | separators in the About body above `Detailed Guide` = **7** (5 from this file at `:15,:40,:68,:90,:146`; 2 from `AboutPane.vue:29,46`) | **RED** |
| "not cursor-bearing Tooltip triggers with empty content or hover-only pseudo-action" — `1→0` | 0 | **1** live empty `TooltipContent`; a real reka popper mounts on hover (`data-state="delayed-open"`, `textContent.length = 0`) | **RED** |
| "prose is `≤66ch`" | ≤66ch | `max-inline-size` on every text node in the component = **`none`** | **RED** |

`docs/tranches/V/archive/ADDENDA.md:21` (V-A139) filed the same rows and marked them *born RED*;
`docs/tranches/V/archive/waves/W18.md:7` restates the obligation; the formation's own proportion
auditor cited `ColorNutritionLabel.vue:92–141` by name on **2026-07-16**
(`apotheosis/pi/formation/…/value-tranche-v-formation.jsonl:870`). Twelve days later those lines are
unchanged.

That is context, not my finding. My findings follow.

---

## 3. Findings

### D-1 · BLOCKER · The plate publishes another color space's encyclopedia, silently, for 6 of 18 selector options

**Defect.** `currentColorSpaceInfo` (`:210-215`) falls back to `colorSpaceInfo.rgb` whenever the
selected space has no entry. The selector offers 18 options. The table covers 12 reachable ones.
The other six render **CIE RGB's 1931 encyclopedia under the correct headline**, with no visual mark
of any kind.

**Evidence — coverage gap, computed from source:**

```
$ node -e "…PICKER_SPACE_NAMES vs colorSpaceInfo…"
PICKER_SPACE_NAMES: 17  rgb,hsl,hsv,hwb,lab,lch,oklab,oklch,xyz,kelvin,
                        srgb-linear,display-p3,a98-rgb,prophoto-rgb,rec2020,ictcp,jzazbz
colorSpaceInfo:     13  rgb,hsl,hsv,hwb,lab,lch,oklab,oklch,xyz,kelvin,ictcp,jzazbz,hex
MISSING (selector offers, info lacks): srgb-linear,display-p3,a98-rgb,prophoto-rgb,rec2020
```

Plus `hex`: `resolveColorSpace` (`demo/color-session/color-model.ts:32-34`) returns `"rgb"` for
`"hex"`, so the authored `colorSpaceInfo.hex` block (`created: "1996"`, *"A compact hexadecimal
notation for sRGB colors…"*) is **structurally unreachable** and Hex also shows CIE RGB. Six of
eighteen — one third of the catalogue.

**Evidence — rendered, live.** Driving the About header selector to **Display P3** (probe
`p3-fallback`, `picked: "option"`; frame `D-shots/p3-fallback.png`), `.about-card` `innerText`:

```
About the color spaces,
Display P3
…
Definition
A color space based on the additive mixture of red, green, and blue light.
Basic Information
Device Dependency:   Device-dependent
White Point:         Varies (typically D65)
Gamut:               Limited (device-specific)
Created:             1931
Components           Red 0 to 1 · Green 0 to 1 · Blue 0 to 1
Conversion Graph     RGB→XYZ · RGB→Kelvin · RGB→HSL · RGB→Hex
Usage                Digital displays, Web design, Computer graphics
```

Display P3 was standardised in **2015** (DCI-P3 primaries, sRGB transfer, fixed D65 white). The
plate says 1931, "varies", "device-specific", and offers a conversion graph in which the string
"P3" does not occur. Every factual row is wrong. The one row that is right — `0 to 1` — comes from a
*different* table (`PICKER_CHANNELS["display-p3"]`), because the Components section joins two
independent sources positionally by array index (`:48,:57`).

**Mechanism.** A masking fallback substituted for a designed state. There is no "not yet
documented" state in this component — not empty, not partial, not disclosed. The design decided that
being wrong is preferable to being blank, which for a reference document is the one trade never
available.

**Reproduction.** `http://localhost:9000/#/` → About header selector → **Display P3** (or sRGB
Linear, A98 RGB, ProPhoto RGB, Rec2020, Hex). Read "Created".

**Cure.** The union is the design. `colorSpaceInfo` and `PICKER_CHANNELS` become one record keyed by
`SpaceId`, so the compiler refuses a selector option without an article. Until an article exists the
section renders its *named absence* — one line, no Alert, no fabrication. Owner edict 2 (no masking
fallbacks) forbids the current ternary.

---

### D-2 · BLOCKER · Every structural device in the component is one forced-colors deletes; the hover state's measured delta is 1.00:1

**Defect.** The component expresses grouping with an alpha divider, boundary with an alpha border
and a translucent fill, and state with two inline `style` colors. Forced colors removes all five.
Nothing else remains.

**Evidence — Chromium, `forcedColors: "active"`, hovering the first conversion path**
(`D-cnl-chromium.json`; frame `D-shots/chromium-forced.png`):

| Element | Author intent | Computed under forced-colors |
|---|---|---|
| `[data-o18=component-name]` ink | `oklch(0.537 0.215 9.83)` — live accent | **`rgb(0, 0, 0)`** |
| hovered `[data-o18=graph-node]` fill | `lab(92 88.8 20)` — live color | **`rgb(255, 255, 255)`** |
| resting `[data-o18=graph-node]` fill | transparent | `rgba(255, 255, 255, 0)` |
| host chip `bg-well` | well tone | `rgba(255, 255, 255, 0.5)` |
| host chip border width | — | **`0px`** |
| Definition Alert fill | well tone | **`rgb(255, 255, 255)`** |
| `Separator` fill | 22%-alpha ink | **`rgba(255, 255, 255, 0.22)`** |

Hovered fill `rgb(255,255,255)` against host `rgba(255,255,255,0.5)` over Canvas white composites to
white on white. **Selected-vs-resting delta = 1.00:1.** The frame confirms it: the four conversion
chips have no panel, no border and no fill, and the six hovered nodes are indistinguishable from the
four resting ones. The five dividers are 22%-alpha white on white — gone. The Definition well is
Canvas — gone.

The component's entire visual grammar under forced colors is *twenty lines of black text with no
structure whatsoever*, plus — see D-4 — a section heading 0.35px larger than its own body copy.

**Canon.** `VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states
are never color-only."* `:90` requires the analogous selector marker to show *"a nonzero
selected-state delta in monochrome and forced colors."* Measured: zero.

**Note on WebKit.** Under WebKit's `forcedColors: "active"` emulation the author colors *survive*
(`D-cnl-probe.json` → `forced-colors.names[].computed = "oklch(0.519287 0.207684 9.834023)"`) — the
opposite failure: arbitrary author color painted over the palette the user explicitly asked to
eliminate. Both engines are wrong; neither outcome is a state the design chose.

**Reproduction.** `node D-cnl-chromium.mjs`; or Chrome DevTools → Rendering → *Emulate CSS
forced-colors: active* → `/#/` → scroll the About pane to Conversion Graph → hover a path.

**Cure.** Grouping must ride something forced colors keeps: real headings and interval (which PR-14
already ordered). If any chip survives, its boundary is `1px solid currentColor` and its state is
not a fill. Live-color surfaces that must remain take `forced-color-adjust: none` *deliberately*,
with a certified ink — not by accident of inline styling.

---

### D-3 · BLOCKER · The hover highlight is a label-membership test, not a path identity: one hover lights six of ten nodes across four rows

**Defect.** `:123` tests `hoveredPath.includes(space)`. `hoveredPath` is an array of *space-name
strings*, and every Lab conversion path begins with `"Lab"`. So hovering one row highlights every
node in the section whose text matches any label in the hovered row — including nodes in other rows.

**Evidence.** `D-cnl-probe.json` → `desktop-light.hover`, after `hover()` on the **first** path only:

```json
{ "totalNodes": 10, "styledCount": 6,
  "styledTexts":  ["Lab","XYZ","Lab","Lab","XYZ","Lab"],
  "restingTexts": ["LCh","OKLab","LCh","OKLCh"] }
```

The four Lab paths are `[Lab,XYZ] [Lab,LCh] [Lab,XYZ,OKLab] [Lab,LCh,OKLCh]`. Hovering row 1
(`Lab→XYZ`) lights row 1's `Lab` and `XYZ`, row 2's `Lab`, row 3's `Lab` and `XYZ`, and row 4's
`Lab`. Frame `D-shots/desktop-light-hover.png` shows the six pink chips scattered across all four
rows while the pointer sits on one. Identical in dark (`desktop-dark.hover.styledCount = 6`) and
under forced colors (`chromium-forced.styledCount = 6`).

**Mechanism.** The interaction models *"which labels appear in the row I am touching"* and paints it
as if it modelled *"which path I am touching"*. The only interactive idea in the component asserts
the wrong proposition, and does so **non-locally** — attention is dragged onto three rows the user is
not pointing at.

**Why CI cannot see it.** `e2e/smoke/oracles/o18-contrast-census.spec.ts:703-742` locates
`'[data-o18="graph-node"]'` **`.first()`**, hovers, and asserts one ratio `>= TEXT_FLOOR`. It never
counts styled nodes. A six-node bleed is structurally invisible to the gate.

**Reproduction.** `/#/` → scroll About to Conversion Graph → hover `Lab → XYZ`. Count pink chips.

**Cure.** Emphasis belongs to the path element, not to node text. If the section becomes readable
ordered data — which `VISUAL-CONSTITUTION.md:218` requires — the hover disappears and the defect with
it.

---

### D-4 · MAJOR · The type scale inverts: past ~2086px the section headings are smaller than the data they head

**Defect.** The section headings use a **fixed** rung; the body and label copy beneath them use
**fluid vw clamps**. The two ladders cross.

**Evidence — tokens read from `:root`, live** (`D-cnl-contrast.json`):

```
--type-subheading : 1.272rem                                     ← FIXED   (used by :18,:43,:71,:93,:149)
--type-body       : clamp( 1rem,     0.92rem + 0.27vw, 1.375rem ) ← FLUID  (used by :54)
--type-small      : clamp( 0.875rem, 0.8rem  + 0.25vw, 1.25rem  ) ← FLUID  (used by :26,:46,:74,:150)
--type-heading    : 1.618rem                                     ← the token the canon mandates
```

**Evidence — rendered sizes at two shipped widths** (`D-cnl-pixels.json`):

| element | class | 1440px | 3440px |
|---|---|---|---|
| `<h2>` section heading | `font-display text-subheading` | 20.352px Fraunces | **20.352px** Fraunces |
| channel name | `text-body` | 18.608px | **22px** |
| italic label / value | `text-small` | 16.4px | **20px** |

At 3440 the **data is 1.65px larger than its own heading**, and the labels are 0.352px smaller — a
hierarchy of 1.7%. The crossover solves at `0.92rem + 0.27vw = 1.272rem` → `vw = 20.86px` →
**viewport ≈ 2086px**. The repo's own real-Safari matrix already includes a 3440 arm
(`visual/safari-real/root-3440.png`), so this is a shipped configuration.

Frame `D-shots/w3440-about.png` shows it plainly: "Components" reads smaller than
"L\* (Lightness)" directly beneath it.

**Two further role violations in the same class pair.** `VISUAL-CONSTITUTION.md:73` and
`PROPORTION-AUDIT.md:78` both close the role matrix: *section heading → `text-heading` → Plus Jakarta
Sans*, and `--type-subheading` is reserved for **palette identity**. This component uses
`font-display text-subheading` — wrong token (20.352 vs 25.888px, −21%) and wrong family (Fraunces
where Jakarta is mandated). Separately, the values (`0% to 100%`, `-125 to 125`, `1976`) render in
Plus Jakarta Sans where the same matrix assigns *value/code/provenance → `text-mono-small` → Fira
Code*.

**Compounding: three H2 treatments in one scroll container.** `desktop-light.h2s` measures
`Basic Information` at 20.352px/600, `Detailed Guide` (`AboutPane.vue:49`) at 32.928px/700, and the
Markdown h2s at 30px/600 in accent — same DOM level, three sizes spanning 1.62×, one scrollable
document. Peer relationships are unrecoverable from the page.

**Reproduction.** `/#/` at 3440×1440; read `getComputedStyle` on `.about-card h2` and
`[data-o18=component-name]`.

**Cure.** One ladder. Section headings take `text-heading` in Plus Jakarta Sans, values take
`text-mono-small`, and if any rung in the block is fluid then all adjacent rungs are fluid on the
same curve. A fixed rung adjacent to a fluid rung is a guaranteed crossover, not a tuning problem.

---

### D-5 · MAJOR · Frozen column counts inside a container that never grows: density collapses at both ends

**Defect.** `grid-cols-2` (`:26,:74`) and `grid-cols-3` (`:46`) are unconditional — no responsive
variant, no `minmax`, no `auto-fit`, no container query. Meanwhile the type is **viewport**-fluid and
the container is **capped**.

**Evidence — measured `gridTemplateColumns` and container width** (`D-cnl-probe.json`,
`D-cnl-pixels.json`):

| viewport | `.about-card` | 2-col template | 3-col template | wrapped label rows |
|---|---|---|---|---|
| 320 | 288px | `127px 127px` | `76.66px 76.67px 76.67px` | **3 of 7** |
| 390 (iPhone 14) | 358px | `162px 162px` | `100px 100px 100px` | 1 of 7 |
| 1440 | **512px** | `227px 227px` | `143.33px × 3` | 1 of 7 |
| 3440 | **512px** | `227px 227px` | `143.33px × 3` | 1 of 7, type **+18%** |

The pane is a hard **512px cap** at every width ≥ ~544px. So at 3440 the type is 18–22% larger inside
a container of *identical* width: the Components row that fits at 1440 wraps at 3440
(`D-shots/w3440-about.png`: "a\* (Green-" / "b\* (Blue-"). **The component becomes less
information-dense as the display gets larger.**

**At 320px the tabular job fails outright.** `D-shots/w320-about.png`: with 76.66px columns
`L* (Lightness)` wraps to 2 lines, `a* (Green-Red)` to 3, `b* (Blue-Yellow)` to 2 — so the three
`min to max` values land at **three different vertical positions**. The single thing a three-column
range table exists to permit — scanning min/max across channels — is destroyed. `Device-independent`
also breaks as `Device-` / `independent`, reading as a hyphenated word.

**The 50/50 split is unearned at every width.** At 1440 the label column reserves 227px for
`"Gamut:"` (~48px of ink) while `"Variable (typically D50 or D65)"` wraps inside its own 227px.
Measured row heights `22.9 / 45.9 / 22.9 / 22.9` — one row is double height, so the block has no
baseline rhythm. `PROPORTION-AUDIT.md:5`: *"Every element earns its scale, interval, boundary and
material from its job relative to the local protagonist."* A 1:1 column ratio is arithmetic, not
relation.

**Enabling condition (host, correctly attributed).** `VISUAL-CONSTITUTION.md:42` binds the Picker
composition's inspector to *"exact golden inspector 38.1966011%"*, and About **is** that inspector
(`viewSchema.ts:105-113`). Measured **512/1440 = 35.56%** (−2.64 points) and **512/3440 = 14.88%**
(−23.3 points). The pane never earns its share, which is why the component has nowhere to put
anything. That row belongs to the chassis owner; the frozen column counts belong here.

**Reproduction.** `/#/` at 320×760 and at 3440×1440 with the About pane visible.

**Cure.** Container-relative, not viewport-relative: the attribute block becomes a `<dl>` whose label
column is capped `max-content`; the channel block becomes `repeat(auto-fit, minmax(<measure>, 1fr))`;
type resolves from container size so the two ladders cannot diverge.
`VISUAL-CONSTITUTION.md:33` already says it: *"Spacing is container-scaled from glass-ui tokens."*

---

### D-6 · MAJOR · The Definition Alert is a hue-only stain in light, a well in dark, and a shadcn import in a glass-ui house

**Defect.** `:8` renders the static definition as
`<Alert class="m-0 bg-well border-border/30 rounded-card">`. PR-14 orders `Alert 1→0`. It is still 1,
and as a *surface* it does not work.

**Evidence — rendered-pixel surface delta** (`D-cnl-pixels.json`, real painted pixels):

| scheme | alert interior | plate beside it | **delta** |
|---|---|---|---|
| light 1440 | `rgb(233,225,217)` | `rgb(240,190,202)` | **1.20:1** |
| light 3440 | `rgb(233,225,217)` | `rgb(240,188,202)` | **1.27:1** |
| dark 1440 | `rgb(66,55,47)` | `rgb(119,78,85)` | **1.75:1** |

In light the well is **not a well**. Its luminance is within 1.2:1 of the plate; the only thing
separating them is that the well is *desaturated* and the plate is *pink*. A neutral rectangle laid
on a chromatic plate does not read as depth — it reads as a stain. That is exactly what the tracked
Safari capture shows (`visual/shots/safari-desktop-light/picker.png`: a khaki smear on a pink plate)
and what `D-shots/p3-fallback.png` shows at full size. In dark the same recipe *does* produce a well
(1.75:1). One recipe, two different jobs, chosen by scheme.

`VISUAL-CONSTITUTION.md:16` defines the well tier as *"image, curve, palette or code artifact … the
specimen supplies color."* This well contains one sentence of prose and no specimen, so it cancels
the plate's color in order to frame nothing.

**Design-system boundary.** `Alert`/`AlertTitle`/`AlertDescription` come from `demo/ui/alert`
(`:181`) — shadcn, not glass-ui — against owner edict 4. It also imports a second type scale:
`alertDesc` computes to **14px** (Tailwind `text-sm`) while every sibling row in the plate is
**16.4px** (`--type-small`). Two "small" scales, 17% apart, three rows from each other.

Contrast *inside* the Alert is fine (`descOnAlert` 5.08:1 light / 5.97:1 dark) — that is not the
defect. The defect is that a container was chosen for a job it does not have.

**Reproduction.** `/#/`; compare the rendered alert interior with the plate beside it, or read
`D-cnl-pixels.json`.

**Cure.** PR-14's answer, unchanged: a lead paragraph. No box, no border, no tone, no `role`. The
plate's first sentence is its lead; interval and measure carry it.

---

### D-7 · MAJOR · Five dividers at 1.5:1 — interruption without boundary

**Defect.** `:15,:40,:68,:90,:146` — five `<Separator />` between six sections, in a component whose
sections are already separated by a heading and a `gap-4`.

**Evidence.** Separator fill measures `color(srgb 0.11 0.098 0.09 / 0.22)`; composited contrast
against the plate **1.53:1** light and **1.81:1** dark; **invisible** under forced colors
(`rgba(255,255,255,0.22)` on Canvas). Seven separators total in the About body above `Detailed
Guide` — measured `sepRects` at y = 240.6, 376, 586.3, 712.6, 868.9, 1160.1, 1341.3, of which the
five at width 462 are this file's and the two at width 510 are `AboutPane.vue`'s. That is precisely
PR-14's "seven".

**Mechanism.** A line at 1.5:1 is too weak to bound and too present to ignore. It costs seven
horizontal interruptions down a single narrow column and returns no grouping the headings do not
already give. `PROPORTION-AUDIT.md:69`: *"A divider is retained only when grouping would be
ambiguous without it. Spacing plus material already expressing the same boundary makes the line
duplicative."* `OPTICAL-BENCH-COMPOSITIONS.md §5`, quoted as binding at `PROPORTION-AUDIT.md:49`,
selects **no** divider for every non-Admin composition.

**Reproduction.** `document.querySelectorAll('.about-card [data-slot=separator]').length` → 7 above
`Detailed Guide`.

**Cure.** Delete all five. Grouping is a heading plus one interval token.

---

### D-8 · MAJOR · Four decoy affordances: pointer cursor, no focus, no name, no role, dead on touch

**Defect.** Each conversion path (`:109-137`) is a `<div>` carrying `cursor-pointer`,
`hover:bg-accent/50`, `transition-colors` and `@mouseenter`/`@mouseleave` — a chip that advertises
itself as operable and is not.

**Evidence** (`D-cnl-probe.json` → `desktop-light.hostInfo`, all four identical):

```json
{ "cursor": "pointer", "tabIndex": -1, "role": null,
  "describedby": null, "dataState": "closed",
  "focusableBySelector": false,
  "rect": { "w": 158.6, "h": 59.9 } }
```

No `role`. No accessible name. `tabIndex: -1` — explicitly removed from the tab order, so the
`keyboard-focus-desktop` matrix can never reach it. `aria-describedby: null`, so not even the tooltip
(D-9) is associated. And the whole mechanism is `mouseenter`/`mouseleave`: **on touch there is no
hover**, so on mobile the Conversion Graph presents four 56px-tall pointer-cursor chips
(`w320.hostInfo` rects `148.7×56`, `146.9×56`, `249×56`, `250×56`) that respond to nothing.

This is the inverse of the tap-target defect the visual `REPORT.md` counts: not targets that are too
small, but **large, styled, cursor-bearing regions that are not targets at all**.

**Canon.** `PROPORTION-AUDIT.md:70`: *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed. Decorative controls and operable ornaments without
names are forbidden."* PR-07 disposition: `ADD-AFFORDANCE / REMOVE`.

**Reproduction.** `/#/` on iPhone 14 → About pane → tap any conversion chip: nothing. Desktop: Tab
through the pane; the chips are never reached.

**Cure.** `REMOVE`. The paths are *data* (`VISUAL-CONSTITUTION.md:218`: *"conversion paths are named
ordered text/graph data"*). Data does not get a cursor.

---

### D-9 · MAJOR · The empty Tooltip is not inert markup — it runs

**Defect.** `:139-140`:

```html
<TooltipContent class="contents w-64 p-2 text-small">
</TooltipContent>
```

Empty element, non-empty class list, wrapped in a live `TooltipProvider`/`Tooltip`/`TooltipTrigger`.

**Evidence.** On hover the reka machinery fully engages (`desktop-light.hover`):

```json
{ "tooltipPresent": true, "tooltipTextLen": 0,
  "tooltipRect": { "w": 0, "h": 0, "x": 833, "y": 450 },
  "hostState": "delayed-open" }
```

The captured outer HTML shows a real portal: `data-reka-popper-content-wrapper` with computed
`--reka-popper-anchor-width: 158.59375px`, `--reka-popper-available-height: 450.4375px`,
`z-index: 120`, wrapping `data-dismissable-layer data-surface="glass" data-material="overlay"
data-reveal="tooltip"`. Every hover mounts a portal, a floating-ui positioner, a dismissable layer
and a glass surface — to display **zero characters**.

The class list is self-cancelling: `display: contents` removes the element's box, so `w-64` and `p-2`
can size nothing. That is simultaneously dead styling and a per-instance override of a glass-ui root,
which owner edict 5 forbids.

**Canon.** PR-14: *"empty Tooltip/false trigger/hover state 1→0"*. Measured 1.

**Reproduction.** `/#/` → hover a conversion chip →
`document.querySelector('[data-reka-popper-content-wrapper]').textContent.length` → `0`.

**Cure.** Delete `TooltipProvider`/`Tooltip`/`TooltipTrigger`/`TooltipContent` from this file, along
with the now-unused imports at `:174-179`.

---

### D-10 · MAJOR · RTL mangles the numeric ranges and reverses the channel order

**Defect.** The channel ranges are scientific domain values rendered as bare text inside a
direction-inheriting container. Under `dir="rtl"` bidi reorders them.

**Evidence — the repo's own tracked capture** `visual/shots/rtl-desktop/picker.png`
(`states.mjs:25`, WebKit, 1440×900, `dir=rtl` applied post-load). Read from the frame:

| authored | rendered under RTL |
|---|---|
| `0% to 100%` | **`to 100% 0%`** |
| `-125 to 125` | **`to 125 125-`** |
| `L* (Lightness)` · `a* (Green-Red)` · `b* (Blue-Yellow)` | **`b* (Blue-Yellow)` · `a* (Green-Red)` · `L* (Lightness)`** |

Three distinct corruptions: min and max **swap places**, the negative sign **detaches** from its
number and renders as a trailing hyphen, and the channel ordinal reverses — so the About plate and
the Picker's own L/a/b rail (vertical, therefore unaffected) disagree in the same viewport.

**Canon.** `VISUAL-CONSTITUTION.md:133` — *"CSS direction keywords, physical axes, code, hex, slug,
ID | preserve the declared physical/domain meaning"*; `:154` — *"CSS strings, hex, slugs, IDs and
provenance | render in LTR-isolated spans inside RTL prose."* A `min…max` pair on a scientific axis
is exactly that class. Neither the values nor the channel sequence may mirror.

**Reproduction.** `/#/` → `document.documentElement.setAttribute('dir','rtl')` → About pane →
Components.

**Cure.** The range is one atomic value in one LTR-isolated element (`dir="ltr"` +
`unicode-bidi: isolate`), produced by one formatter; the channel sequence is an explicit ordinal
list whose order is domain-fixed, not flow-derived. `om-14-formatting/FORMAT-AUDIT.md:378` already
nominates `formatChannelRange` as that chokepoint.

---

### D-11 · MAJOR · The one chromatic idea in the plate dies in dark mode, and in light it clears its own contract by 1.6%

**Defect.** `componentInk` (`:199-200`) is the component's only color-bearing data channel — the live
specimen color applied to the channel names. `useSafeAccentFn("resting")` certifies it against a
*modelled* tier, and model and render disagree in both directions.

**Evidence — the ink itself** (inline `style` attribute, same user color, both schemes):

| scheme | `componentInk` | chroma |
|---|---|---|
| light | `oklch(0.470927 **0.188343** 9.834023)` | 0.188 |
| dark | `oklch(0.958322 **0.021053** 9.834023)` | **0.021** |

**Chroma collapses 8.95×.** At L = 0.958 a chroma of 0.021 is not a color; the neutral heading ink
beside it measures `rgb(233,230,226)`. The tracked dark capture
(`visual/shots/safari-desktop-dark/picker.png`) confirms it: `L* (Lightness)`, `a* (Green-Red)` and
`b* (Blue-Yellow)` render as the same cream as `Basic Information`. **In dark mode the plate has no
color data at all** — the section whose job is to show you the color, doesn't.

`VISUAL-CONSTITUTION.md:145`: *"No path desaturates through gray."* `:17` reserves the
color-bearing species for data. This *is* data, and it is gray.

**Evidence — rendered-pixel contrast in light** (`D-cnl-pixels.json`, real painted plate pixels):

| arm | ink | plate | ratio |
|---|---|---|---|
| light 1440 | `rgb(170,0,67)` | `rgb(240,190,202)` | **4.63:1** |
| light 3440 | `rgb(170,0,67)` | `rgb(240,188,202)` | **4.57:1** |
| dark 1440 | `rgb(255,236,238)` | `rgb(119,78,85)` | 6.15:1 |

The producing module declares its own target at `demo/color-session/ink.ts:15-17`:

```ts
export const TEXT_CONTRAST_FLOOR = 4.5;
export const CERTIFY_HEADROOM = 1.25;
```

→ **5.625:1**. The light arms land at 4.63 and 4.57 — **18–19% below the module's own certification
target**, and 0.07 above bare AA at 3440, a **1.6% margin**. The cause: the guard models the resting
tier as a flat tint (`ink.ts:27-33` `PRODUCER_TINTS.card` at `RUNG_ALPHA.resting`) while the rendered
plate is that tint composited over a *chromatic ambient field*. The model says safe; the pixel says
marginal.

`VISUAL-CONSTITUTION.md:82` is explicit: *"Text, focus, boundaries and state meet their rendered
contrast **on the actual material tier**; a token name is not evidence."* `PROPORTION-AUDIT.md:73`:
*"Real rendered relation wins over token intent."*

**Why CI does not catch it.** `o18-contrast-census.spec.ts:735-742` asserts
`nameRow.ratio >= TEXT_FLOOR` — bare 4.5, not the module's 5.625. The gate is calibrated one notch
below the contract it protects, so a 1.6% margin reads GREEN.

**Reproduction.** `node D-cnl-pixels.mjs`; or read the inline `style` on `[data-o18=component-name]`
in both schemes.

**Cure.** Two separable repairs. (a) Certify against the composited tier, not a synthetic tint — the
same argument the F-3 chain already accepted for the *fill* role at `:207-208`, applied to the *text*
role. (b) A contrast guard must not be permitted to spend chroma: when luminance and chroma conflict,
the plate's tier changes, not the specimen's color. Otherwise the one thing this component depicts is
deleted by the thing protecting it.

---

### D-12 · MAJOR · The route has no H1, and this component's sections outrank their own container

**Defect.** The component hard-codes `<h2>` five times with no awareness of its host's level.

**Evidence** (`D-cnl-probe.json` → `desktop-light`):

```
h1Count: 0
headingOutline: ["H3:92.0%,88.8,20.0", "H3:About the color spaces, Lab",
                 "H2:Basic Information", "H2:Components", "H2:Key Properties",
                 "H2:Conversion Graph", "H2:Usage", "H2:Detailed Guide", …]
```

Route `/#/` has **zero H1** — independently confirmed by the tracked `visual/REPORT.md` per-capture
table, whose `h1` column reads 0 on all 60 captures. The About plate's own identity line is an
**H3**; this component then emits five **H2**s beneath it. The outline is `H3 → H2`: the sections
outrank the pane containing them, and the document opens at H3.

`VISUAL-CONSTITUTION.md:85`: *"Each route has one H1 and exactly one stable main landmark."*
`PROPORTION-AUDIT.md:76`: *"A display-sized readout is not therefore a document heading… route H1
owns heading hierarchy."*

**Reproduction.** `/#/` → `[...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName)`.

**Cure.** The shell owns H1. This component's sections are then H2 or H3 *relative to their mount* —
which means the level is not the component's to hard-code. It takes the level from its host, or the
host renders the headings and the component renders only data.

---

### D-13 · MINOR · The arrows outweigh the labels they separate

**Evidence.** `desktop-light.arrows`: six `lucide-arrow-right-icon` at **24×24**, `aria-hidden:
null`. The node labels they punctuate compute to **16.4px**. The glyph box is 46% taller than the
type it separates, and `mx-1` (4px) against the node's own `px-2` (8px) makes the arrow read as glued
to the following node. Visible in `D-shots/desktop-light-conversion.png`: the `→` is the heaviest
mark in the section. `PROPORTION-AUDIT.md:72`: *"Visual glyph size, operable target size and layout
reservation are separate quantities."*

**Cure.** Once the paths are ordered text data (D-8's cure), the separator is a text glyph on the
type's own ladder, not a 24px icon.

---

### D-14 · MINOR · A nutrition label that renders two of its five sections as run-on prose

**Evidence.** `:153-161` — `applications` and `industries` are **arrays** in `colorSpaceInfo.ts`,
rendered through `.join(", ")` into a `<span>`. Measured DOM inside the component: `listCount = 0`,
`dlCount = 0`, `articleCount = 0`. Usage renders `"Color management, Image processing, Color
difference calculations"` as one comma run.

The conceit is a *nutrition label* — a structured comparison table. Three of its five sections
(Basic Information and Key Properties as `div` pairs; Usage as joined strings) are structurally
prose. Nothing in the component is a `<dl>`, `<ul>` or `<table>`, so nothing about it is comparable,
navigable, or announced as structured data.

**Cure.** Attribute pairs are a `<dl>`; enumerations are `<ul>`. Both are what the content already
is.

---

### D-15 · MINOR · `max-inline-size` is `none` everywhere; the 66ch bound holds only by accident

**Evidence.** `desktop-light.proseCandidates` — every text node in the About body reports
`maxInline: "none"`. The Definition description measures 428px at 14px ≈ **61ch**, so it happens to
sit under the bound — but only because the pane is capped at 512px (D-5), which is itself a violation
of the golden-inspector law. Lift the cap and the constraint the canon actually wrote
(`VISUAL-CONSTITUTION.md:78`, `PROPORTION-AUDIT.md:58`) does not exist.

**Cure.** State the measure: `max-inline-size: 66ch` on the prose, with the named Conversion-path
graph exempt exactly as the canon says.

---

### D-16 · MINOR · A padding group promoted to a card, with a second radius nested inside

**Evidence.** `:110` host is `p-3 bg-well rounded-panel`; `:127` node inside it is `px-2 py-1 rounded`
(4px). Two nested rounded rectangles with different radii and different fills, neither housing a
bounded object. `PROPORTION-AUDIT.md:66`: *"A page region, empty column, inner stage or mere padding
group does not become a Card by default."* `VISUAL-CONSTITUTION.md:19`: *"An inner card is not
automatically another pane of glass."*

---

### D-17 · MINOR · Motion is Tailwind's default, not the producer register; entry equals exit

**Evidence** (`D-cnl-probe.json`):

```
normal : "color, background-color, border-color, outline-color, text-decoration-color,
          fill, stroke, --tw-gradient-* / 0.2s"       ← Tailwind `transition-colors`
reduce : "opacity, color, background-color, border-color, box-shadow 0.1s
          cubic-bezier(0.4, 0, 0.2, 1)"               ← a global override, not this file
```

`VISUAL-CONSTITUTION.md:139-140`: *"Spatial continuity uses one producer-owned glass-ui spring
register. Color/opacity effects use the corresponding short effect curve; **exit is shorter than
entry**."* Measured: one duration, one curve, symmetric. No geometry-forcing property is animated
(colors only), which is correct. The reduced-motion outcome is acceptable — a global rule shortens it
to 0.1s — but it is *inherited*: this file makes no reduced-motion decision at all, and uses no
tokenized `--animation-*` value.

---

### D-18 · MINOR · `colorSpaceInfo.hex` is authored and unreachable

**Evidence.** `color-model.ts:32-34` `resolveColorSpace` returns `"rgb"` for `"hex"`;
`ColorNutritionLabel.vue:211` calls it before indexing. So the authored Hex article — `created:
"1996"`, *"A compact hexadecimal notation for sRGB colors… Each pair of hex digits encodes a red,
green, or blue channel (0-255)"*, `components: ["Red (00-FF)", …]` — can never render. Selecting Hex
shows `Created: 1931` and bare `Red / Green / Blue`. Counted inside D-1's six.

---

### D-19 · INFO · A read-only display that declares a two-way binding

**Evidence.** `:186` `const model = defineModel<ColorModel>({ required: true })`. The component reads
exactly one field — `model.value.selectedColorSpace`, at `:211` and `:219` — and never assigns. It
advertises write capability it does not have and forces every host to own a writable model in order
to render a static article. (The library seat owns the fuller argument; recorded here because an API
surface is a design statement.)

---

### D-20 · INFO · Two observed rendering failures on this route, host-owned but caused by this component's height

Recorded because they are what a person actually sees, and because this component's scroll length is
the trigger.

1. **Header/content collision.** `PaneHeader.vue:11` is `sticky top-0 z-header` with a translucent
   veil, and `.pane-scroll-fade` (`PaneHeader.vue:54-57`) supplies only `contain` +
   `scroll-timeline`. Scrolled to Conversion Graph, `D-shots/desktop-light-conversion.png` shows
   *"About the color / spaces, Lab"* painted **on top of** the "Components" heading and its three
   channel names — two text runs overlapping. Under forced colors
   (`D-shots/chromium-forced.png`) the same band is simply **blank white**: the content is present
   and unreadable.
2. **Hard bottom clip.** `D-shots/p3-fallback.png` shows "Conversion Graph" cut through the
   letterforms at the card's bottom edge — the pane fades at the top and hard-clips at the bottom,
   with no scroll affordance.

**Why this component is implicated.** Measured `cardScroll`: `scrollH 8023 / clientH 772` at 1440
(10.4×) and `7993 / 550` on iPhone 14 (14.5×). The nutrition label alone measures **1047.9px tall in
a 772px client** — *the component does not fit inside its own pane*. `Conversion Graph` (y = 885.9)
and `Usage` (y = 1177.1) are below the fold in every tracked desktop capture; both Safari frames cut
at "Lightness Separation: Yes". Mobile is worse: 1039.8px of component in a 550px client, inside a
nested `overflow-y: auto` well rather than the document scroll `VISUAL-CONSTITUTION.md:32` mandates.

---

## 4. State coverage

Every state this component can be in, enumerated. A state that was never designed is a design defect.

| State | Designed? | Evidence / disposition |
|---|---|---|
| **populated** (12 documented spaces) | yes | the one state that works |
| **populated, undocumented space** (5) | **NO** | **D-1** — renders CIE RGB's article silently |
| **populated, `hex`** | **NO** | **D-18** — authored article structurally unreachable |
| **empty** | **NO** | no path; no absent-field case anywhere |
| **loading** | n/a | data is a static module import; correct that there is none |
| **error** | **NO** | no boundary, no fallback copy; the plate cannot say "unknown" |
| **hovered** (conversion path) | **broken** | **D-3** six of ten nodes; **D-2** delta 1.00:1 in forced colors |
| **focused** | **NO** | **D-8** `tabIndex: -1`, `focusableBySelector: false` — unreachable |
| **active / pressed** | **NO** | nothing is pressable |
| **selected** | **NO** | no selection model |
| **disabled** | n/a | nothing operable |
| **dragging** | n/a | correct |
| **overflowing** | **broken** | **D-20** 136% of its pane at 1440, 189% on mobile; nested scroll; top collides, bottom hard-clips |
| **truncated** | **broken** | **D-5** three of seven label rows wrap at 320; channel values fall out of horizontal alignment |
| **RTL** | **NO** | **D-10** min/max swap, minus sign detaches, channel order reverses |
| **reduced-motion** | inherited | **D-17** a global rule handles it; this file decides nothing |
| **forced-colors** | **NO** | **D-2** every structural device deleted; state delta 1.00:1 |
| **zoom 200%** | not directly measured | tracked `zoom-200-desktop` covers `/#/` but this component is below the fold there — **HYPOTHESIS**: D-5 reproduces, since the matrix models 200% as a 720px half-viewport and the pane is width-capped |
| **light** | marginal | **D-11** 4.63:1 vs the module's own 5.625 target; **D-6** well reads as a stain at 1.20:1 |
| **dark** | **broken** | **D-11** chroma 0.188 → 0.021; the color data is monochrome |
| **wide (≥ ~2086px)** | **NO** | **D-4** headings smaller than their own body copy |

**11 of 21 states are unhandled, unstyled or visually broken.**

---

## 5. Design-system boundary

| Reach | Where | Verdict |
|---|---|---|
| shadcn `Alert` from `demo/ui/alert` used as a prose container | `:8,:181` | **violation** of edict 4 + PR-14; imports a second `small` scale (14px vs 16.4px) into the plate |
| `Separator` ×5 | `:15,:40,:68,:90,:146` | producer component, but `OPTICAL-BENCH-COMPOSITIONS.md §5` selects `[]` boundaries for every non-Admin composition — **D-7** |
| per-instance override of a glass-ui root | `:139` `class="contents w-64 p-2 text-small"` on `TooltipContent` | **violation** of edict 5; and self-cancelling — `display: contents` deletes the box `w-64 p-2` would size |
| hand-rolled attribute table | `:26-37,:74-87` | glass-ui offers no `DescriptionList`; the correct move is `<dl>` + tokens, or a primitive **in glass-ui**, never a `grid-cols-2` in demo |
| hand-rolled graph chips | `:109-137` | a chip/pill species invented locally with its own nested radius pair (**D-16**) |
| inline `style` color on data | `:53,:123-126` | the only live-color mechanism: unstyleable, uncascadeable, deleted by forced colors (**D-2**), and the reason D-11's guard is invisible to CSS |
| `font-display text-subheading` for section headings | `:18,:43,:71,:93,:149` | **violation** of the closed role matrix (`VISUAL-CONSTITUTION.md:73`) — wrong token *and* wrong family (**D-4**) |
| `text-small` for values | `:26,:46,:74,:150` | role matrix assigns value/code/provenance to `text-mono-small` / Fira Code (**D-4**) |

Owner edicts 1 (no god modules), 2 (no legacy/back-compat), 3 (KISS), 6 (animations never deleted),
7 (Vue 3.5 idioms) and 8 (`verbatimModuleSyntax`) show **no** violation from this seat's angle: the
file is small and focused, carries no shim or dual path, introduces no wrapper or shared dir, deletes
no animation, and its one type-only import is correctly `import type` (`:182`). Edict 2 is engaged
only through **D-1**, where the fallback is a *masking* fallback.

---

## 6. Proportion and seat law

| Law | Clause | Judgement |
|---|---|---|
| PR-14 | `PROPORTION-AUDIT.md:58` | **4 of 4 subtractions unlanded** (§2) |
| Card law 1 | `:66` "a page region… does not become a Card" | **fail** — D-16 |
| Card law 4 | `:69` divider only when grouping is ambiguous | **fail** — D-7 |
| Card law 5 | `:70` no operable ornaments without names | **fail** — D-8 |
| Card law 8 | `:73` "real rendered relation wins over token intent" | **fail** — D-11 (model 5.625, render 4.57) |
| Card law 13 | `:78` closed role matrix | **fail** — D-4 |
| Constitution §3.1 | `:42` About inspector = golden 38.1966% | **fail** at 35.56% / 14.88% (host-owned; enables D-5) |
| Constitution §3.7 | `:33` container-scaled spacing | **fail** — viewport-fluid type in a fixed container (D-4, D-5) |
| Constitution §4 | `:78` About prose ≤ 66ch | **fail** — `max-inline-size: none` (D-15) |
| Constitution §4.1 | `:82` rendered contrast on the actual tier | **fail** — D-11 |
| Constitution §4.1 | `:83` states never color-only | **fail** — D-2 |
| Constitution §4.1 | `:85` one H1 per route | **fail** — 0 H1, `H3 → H2` inversion (D-12) |
| Constitution §5.2 | `:133` domain values never mirror | **fail** — D-10 |
| Constitution §6 | `:140` exit shorter than entry | **fail** — D-17 |
| Constitution §6 | `:145` "no path desaturates through gray" | **fail** — D-11 dark |
| Constitution §7 About | `:218` definition is a lead paragraph; no seven dividers; paths are data | **fail** ×3 — D-6, D-7, D-8 |

---

## 7. What is sound — the honest negative

Four things I set out to convict and could not. Recorded so the record is not one-sided:

1. **Alert text contrast passes.** Rendered-pixel: description **5.08:1** light / **5.97:1** dark;
   title 13.52:1 / 9.28:1. An earlier working number of 3.19:1 was an artifact of parsing `oklab()`
   components as sRGB and is **withdrawn**.
2. **The hovered-fill ink is genuinely certified.** `contrastInkFor` yields `oklch(0 0 0)` on
   `lab(92 88.8 20)` → **10.02:1** measured. The F-3 fill/ink split at `:204-208` does exactly what
   its comment claims. The defect is that the fill lands on the wrong six nodes, not that it is
   uncertified.
3. **No arity mismatch and no missing field.** Cross-checking all 13 `colorSpaceInfo` entries against
   `PICKER_CHANNELS` shows every `components` array matches its channel count and every entry has
   `applications` and `industries`. The `as any` at `:160` is gratuitous but hides no crash. I found
   no runtime throw on any reachable path.
4. **`data-o18` is not shipped debug residue.** It is consumed by
   `e2e/smoke/oracles/o18-contrast-census.spec.ts:703,735`. Legitimate.

Also correct by construction: the component animates only color properties (no layout-forcing
transition), emits no nested `<main>`, and produces **zero horizontal overflow** at 320, 390, 1440
and 3440 (`labelOverflowX: 0` in every arm).

---

## 8. The gestalt cure

The patch list above is the symptom list, not the answer. The transposition is one sentence:

> **This is an article, not a widget. Render it as one.**

Concretely, in the order the canon already implies:

1. **One keyed record.** `colorSpaceInfo` and `PICKER_CHANNELS` merge into a single record keyed by
   `SpaceId`, so the type system makes D-1 unrepresentable and the positional index join at
   `:48,:57` disappears. A space without an article cannot reach the selector.
2. **Semantic elements do the work.** `<article>` → headings at the level the host supplies →
   `<dl>` for attribute pairs → `<ul>` for enumerations → an ordered list for conversion paths.
   That one move lands PR-14 whole (Alert 1→0, dividers 7→0, tooltip 1→0) and kills D-6, D-7, D-8,
   D-9, D-13, D-14 and D-16 — and gives forced colors (D-2) a structure it cannot delete.
3. **One ladder, container-relative.** Section headings take `text-heading` / Plus Jakarta Sans per
   the closed matrix; values take `text-mono-small` / Fira Code as the same matrix says; every rung
   in the block resolves from one curve so D-4's crossover is structurally impossible; columns become
   `max-content` + `auto-fit minmax`, dissolving D-5 at 320 and 3440 together.
4. **The specimen color is depicted, not spent.** The live color belongs on a *swatch* — a real
   painted surface with a certified ink — not on letterforms whose legibility guard is permitted to
   consume the chroma that is the entire message (D-11). A swatch also survives forced colors under a
   deliberate `forced-color-adjust`, and reads identically in both schemes.
5. **Numbers are atomic, isolated values.** One formatter, one LTR-isolated element, one ordinal
   sequence — D-10 gone, and `FORMAT-AUDIT.md:378`'s `formatChannelRange` gains its second consumer.

After (2) and (3) the file is roughly half its length, holds no `ref`, no `@mouseenter`, no
`TooltipProvider`, no inline `style` and no `Separator` — and every one of the 21 states in §4 is
either handled or provably absent.

---

## 9. Reproduction appendix

```bash
# dev server must be up on :9000
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:9000/     # → 200

S=/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad
node $S/D-cnl-probe-v2.mjs    # structure/type/geometry, 7 contexts   → D-cnl-probe.json
node $S/D-cnl-contrast.mjs    # specified-colour contrast + tokens    → D-cnl-contrast.json
node $S/D-cnl-pixels.mjs      # RENDERED-PIXEL contrast, 1440 L/D+3440 → D-cnl-pixels.json
node $S/D-cnl-chromium.mjs    # Chromium forced-colors + 3440 frame   → D-cnl-chromium.json
```

Frames written to `$S/D-shots/`: `desktop-light-conversion.png`, `desktop-light-hover.png`,
`desktop-dark-conversion.png`, `desktop-dark-hover.png`, `mobile-light-about.png`, `w320-about.png`,
`w3440-about.png`, `p3-fallback.png`, `chromium-forced.png`, `chromium-normal.png`,
`forced-colors-hover.png`.

Tracked frames read:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png`,
`safari-desktop-dark/picker.png`, `safari-mobile-light/picker.png`, `rtl-desktop/picker.png`,
`forced-colors-desktop/picker.png`.

Canon read in full: `docs/tranches/V/PROPORTION-AUDIT.md`, `docs/tranches/V/VISUAL-CONSTITUTION.md`.

---

## 10. Ranked disposition

| ID | Severity | One line |
|---|---|---|
| D-1 | **BLOCKER** | the plate publishes CIE RGB's 1931 article under 6 of 18 headlines |
| D-2 | **BLOCKER** | forced colors deletes every structural device; hover delta 1.00:1 |
| D-3 | **BLOCKER** | one hover lights 6 of 10 nodes across 4 rows |
| D-4 | MAJOR | headings smaller than their body copy past ~2086px; wrong role token and family |
| D-5 | MAJOR | frozen columns in a capped container — density collapses at 320 **and** 3440 |
| D-11 | MAJOR | dark-mode chroma collapses 8.95×; light lands 18% under the module's own headroom |
| D-10 | MAJOR | RTL swaps min/max, detaches the minus sign, reverses channel order |
| D-8 | MAJOR | four decoy chips: pointer cursor, `tabIndex -1`, no role, dead on touch |
| D-6 | MAJOR | Alert is a 1.20:1 hue-only stain in light and a shadcn import in a glass-ui house |
| D-7 | MAJOR | five 1.5:1 dividers — interruption without boundary |
| D-9 | MAJOR | the empty tooltip mounts a live portal to display zero characters |
| D-12 | MAJOR | route has no H1; the component's H2s outrank their H3 container |
| D-13 | MINOR | 24px arrows punctuating 16.4px type |
| D-14 | MINOR | a nutrition label whose sections are prose |
| D-15 | MINOR | `max-inline-size: none`; the 66ch bound holds only by accident |
| D-16 | MINOR | padding group promoted to a card, second radius nested inside |
| D-17 | MINOR | Tailwind default motion; entry == exit; no producer register |
| D-18 | MINOR | `colorSpaceInfo.hex` authored and structurally unreachable |
| D-19 | INFO | read-only display declares a two-way `defineModel` |
| D-20 | INFO | header/content collision and hard bottom clip, triggered by a component 136% of its pane |
