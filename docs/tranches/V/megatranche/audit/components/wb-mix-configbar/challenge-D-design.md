# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

**Round 3** · 2026-07-28 · repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`

Round 1 (2026-07-27) is preserved at `challenge-D-design.2026-07-27-r1-prior.md`.
Round 2 (2026-07-28) is preserved at `challenge-D-design.2026-07-28-r2-prior.md`.

This round does not re-litigate either. It brings one instrument neither prior round used —
**direct pixel decoding of the shipped Safari captures** (a from-scratch PNG inflate/unfilter in
`node:zlib`, so no composite estimate stands between me and what the user saw) — plus a
**coarse-pointer typography probe** that r2's height-only measurement did not reach. Both produce
numbers the prior rounds could not have produced, and one of them **inverts** a conclusion r1
reached by canvas compositing.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the model this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, five MAJORs, three MINORs.

r1 named the mechanism (*"written against a glass-ui that no longer exists"*). r2 named the second
(*"models the dependency that does not matter and hides its information in the slot that
disappears"*). Round 3 names the third, and it is the one that produces every rendered defect in
the four shipped frames:

> **This component overrides the producer's box while leaving the producer's contents, and it
> overrides only the box. Everything inside the bar scales — type, control height register,
> touch floor — and the bar's own geometry is frozen at four hard-coded numbers. The result is a
> control whose padding has been eliminated by arithmetic rather than by decision, inside a rhythm
> that is identical at 320px and 1440px.**

The single number that carries the seat: on a phone, the Select's line box is **31.5px inside an
18px content box**. The producer's 8px vertical padding is not reduced — it is *entirely consumed*,
and the only vertical breathing room left in the shipped mobile frame is the font's own
half-leading.

---

## Evidence base for this round

| Instrument | What it produced |
|---|---|
| **PNG pixel decode** (`node:zlib` inflate + PNG unfilter, written this session) | true rendered RGB at named CSS coordinates in `safari-{desktop,mobile}-{light,dark}/mix.png`; capsule edge positions; peak-ink search inside glyph rects |
| WebKit (Playwright 1.60, the repo's own) vs `http://[::1]:9000/#/mix` | 1440×900, 390×844 `isMobile+hasTouch` (real `pointer: coarse`), 320×700 — computed type, line-height, padding, resolved `--ui-scale`/`--control-floor`, box-shadow/border inventory, rects |
| Source read | `MixConfigBar.vue`, `MixPane.vue`, `useMixingState.ts`, `color-space-meta.ts`, `picker-color.ts`, `color-model.ts`, `ColorSpaceSelector.vue`, `demo/styles/utils.css`, `demo/ui/select/index.ts` |
| glass-ui 7.0.0 dist | `styles/typography/utilities.css` (`.section-label`), `SelectTrigger.vue.d.ts`, rendered class list of the live trigger |
| Canon | `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md` |
| Capture matrix | `visual/REPORT.md`, `visual/shots/**` — including confirming that **no state matrix contains a `/#/mix` row** (`ls` of all six `shots/{forced-colors,keyboard-focus,reduced-motion,rtl-desktop,rtl-mobile,zoom-200}-*` returns only `adminusers, blob, browse, gradient, picker`) |

Probe scripts are in the session scratchpad (`mcb-r3.mjs`, `mcb-r3b.mjs`, `mcb-r3c.mjs`,
`png-scan.mjs`, `png-ink.mjs`, `png-mobile.mjs`). **No file outside
`docs/tranches/V/megatranche/audit/components/wb-mix-configbar/` was written or modified.**

Screenshot coordinate convention: `safari-desktop-*` is 2880×1800 device px for a 1440×900 CSS
viewport (DPR 2); `safari-mobile-*` is 1170×1992 for 390×664 CSS (DPR 3). All CSS coordinates below
are converted at those factors.

---

## Visual truth — read the mobile frames, then read the desktop ones

### The mobile capsules are visibly crushed, and the crush is arithmetic

`safari-mobile-light/mix.png`, vertical luminance scan at device `x=300` (CSS `x=100`, through the
`OKLab` glyph run):

```
device y=1355  rgb(251,230,233)   capsule top specular edge   -> CSS y = 451.7
device y=1358  rgb(246,218,220)   capsule interior
device y=1397  rgb(102,90,89)     value ink begins            -> CSS y = 465.7
device y=1429  rgb(249,219,222)   value ink ends
device y=1454  rgb(233,207,209)   capsule bottom edge begins
device y=1460  rgb(239,185,201)   pane                        -> CSS y = 486.7
```

Capsule height = `(1459 − 1355) / 3` = **34.7 CSS px**, i.e. the `h-9` 36px box less its
antialiased edges. Now the computed truth behind that box, measured under real
`pointer: coarse` (`isMobile: true, hasTouch: true` — WebKit resolves `--ui-scale: 1.5`,
`--control-floor: 2.75rem`):

```json
"trigger": { "h": 36, "height": "36px", "minBlockSize": "auto", "contentBoxH": 34,
             "fontSize": "21px", "lineHeight": "31.5px",
             "padBlock": "8px/8px", "padInline": "12px/12px" }
"button":  { "h": 60, "minBlockSize": "60px", "fontSize": "21px", "iconW": 16 }
```

Border-box arithmetic: `36 − 2(border) − 16(padding) = 18px` content box, holding a **31.5px** line
box. The line box overflows its content box by **13.5px**, so the producer's declared `8px/8px`
vertical padding is not reduced to a smaller number — **it is fully consumed and inert**. The same
arithmetic at desktop: `24.6px` line box in an `18px` content box → **6.6px** overflow, producer
padding effectively `4.7px`.

This is what the mobile capture shows: `OKLab` and `Shorter` sit in capsules with no visible
padding, while the `Mix` button beside them — which honours the same producer register through
`min-block-size: 60px` — is 60px tall with a 16px glyph floating in it. **Two control species in
one 173-line bar, 24px apart in height, on a surface where the producer intended a 6px difference
(54 vs 60).**

### The rhythm is frozen while everything inside it scales

Measured on the component's own nodes at four viewports:

| | 320 | 390 (coarse) | 1440 |
|---|---:|---:|---:|
| `--ui-scale` | 1 | **1.5** | 1 |
| label size (`--type-caption`) | 12.032px | 12.179px | 14.384px |
| trigger value size (`--type-small`) | 16.4px → | **21px** | 16.4px |
| Mix button height | 40px | **60px** | 40px |
| **bar `gap-3`** | **12px** | **12px** | **12px** |
| **grid `gap-2`** | **8px** | **8px** | **8px** |
| **cell `gap-1`** | **4px** | **4px** | **4px** |
| **trigger height (`h-9`)** | **36px** | **36px** | **36px** |

Every quantity the producer owns responds. Every quantity this file hard-codes does not. At 390
coarse the label→control gap is 4px while the control is 36px and its type is 21px; the
control→verb gap is 12px while the verb is 60px.

`VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile."* There is no fork and no breakpoint pile
here — there is no scaling at all.

### Dark is not a treatment; it is the same alpha over a different ground — and it inverts the hierarchy

Pixel truth from the two desktop captures (real Safari RGB; the `Mix` "enabled" row is derived from
the shipped disabled pixels by the exact `opacity: 0.5` algebra `plate_enabled = 2·plate_disabled −
ground`, which reproduces r1's independently-composited `1.20:1` to three digits and so validates
the method):

| boundary contrast vs its own local ground | light | dark |
|---|---:|---:|
| Select capsule (`rgb(246,219,220)` / `rgb(76,52,52)`) | **1.278 : 1** | **1.581 : 1** |
| `Mix` capsule, shipped disabled (`rgb(237,198,205)` / `rgb(108,75,79)`) | 1.095 : 1 | 1.060 : 1 |
| `Mix` capsule, **enabled** (derived) | **1.197 : 1** | **1.123 : 1** |
| **support ÷ protagonist** | **1.07×** | **1.41×** |

r1 measured the light arm and called the verb "the least visually present object on the pane." The
new fact is the **dark column**: the dark scheme *strengthens the dropdown's boundary* (1.278 →
1.581) and *weakens the verb's* (1.197 → 1.123). Whatever dark-mode work exists in the material
stack, it acts on the support and not on the protagonist, and it widens the inversion from 7% to
41%.

### And the label that names each control fails its contrast floor in both schemes — worse in dark

Peak-ink search (the single darkest/lightest pixel inside each glyph rect — the most generous
possible read; mean ink is lower):

| | ink | ground | ratio |
|---|---|---|---:|
| `COLOR SPACE` caption, light | `rgb(101,84,66)` @CSS(757.5,429.5) | `rgb(240,187,202)` | **4.367 : 1** |
| `COLOR SPACE` caption, **dark** | `rgb(195,185,172)` @CSS(758.5,429) | `rgb(119,76,85)` | **3.681 : 1** |
| `OKLab` value, light | `rgb(28,25,23)` | `rgb(249,219,222)` | 13.504 : 1 |
| `OKLab` value, dark | `rgb(233,230,226)` | `rgb(77,53,53)` | 8.998 : 1 |

At 14.384px / weight 400 this is normal text: WCAG 1.4.3 floor is 4.5:1. **Both schemes fail, and
dark fails by 18%.** r1 reported `4.00:1` for the light arm from a canvas composite and did not
measure dark at all; the pixel value is 4.367 (r1's estimate was pessimistic on the ground, right
on the verdict).

The second reading of that table is the hierarchy: within one two-line cell, the **choice** renders
at 13.5:1 and the **word naming the choice** renders at 4.37:1 — a 3.1× separation. r1 observed
(by ink width) that the label dominates the value. Both are true and that is the defect: the label
wins on area, tracking and case; the value wins on contrast by 3×. The two marks are matched by
opposing means, so no hierarchy settles. That is not a tuning problem, it is the absence of a
decision.

---

## Findings

### R3-1 · BLOCKER · NEW MECHANISM — `h-9` does not shrink the control, it deletes the producer's padding

`MixConfigBar.vue:100`, `:123`, `:147` each append `class="h-9"` to a `SelectTrigger`. The rendered
class attribute (live DOM, this session) shows the collision inside a single string:

```
control-surface glass-control-edge … flex w-full items-center justify-between
rounded-pill px-3 py-2 text-dropdown … transition-control … h-9
                    ^^^^                                        ^^^^
                    producer padding                            consumer height
```

`py-2` is the producer's. `h-9` is the consumer's, merged last. They describe the same box and only
one can be true.

| arm | line box | content box (`36 − 2 − 16`) | overflow | producer padding surviving |
|---|---:|---:|---:|---:|
| desktop 1440 | 24.6px | 18px | 6.6px | 4.7px of 8px (59%) |
| **mobile coarse** | **31.5px** | **18px** | **13.5px** | **1.25px of 8px (16%)** |

r2 filed this row as "36px vs a 54px coarse contract" — a token breach. The mechanism is worse than
a token breach: `SelectTrigger` exposes `size?: "sm" | "default"`
(`glass-ui/dist/components/select/SelectTrigger.vue.d.ts`), which selects a **height register that
the padding was designed against**. `h-9` is not a smaller register; it is a height assertion
against a padding the consumer cannot see, and at `--ui-scale: 1.5` the assertion wins by 13.5px.

The measured secondary consequences, all in the shipped mobile frame:

- **34.7 CSS px** measured tap height (PNG edge scan above) against the producer's own
  `--touch-target: 2.75rem` = 44px, which `pointer: coarse` had already installed as
  `--control-floor`. The producer solved the floor; the consumer un-solved it.
- **24px height disparity** between the bar's two control species (36 vs 60) where the producer
  intended 6px.
- The chevron stays `h-4 w-4` = **16px** at both 1440 and 390-coarse while its sibling type goes
  16.4px → 21px: glyph/label ratio **0.98 → 0.76**.

**Reproduction.** `webkit.launch()` → `newContext({viewport:{width:390,height:844}, isMobile:true,
hasTouch:true, deviceScaleFactor:3})` → `/#/mix` → read `getComputedStyle` of
`[data-slot=select-trigger]`: `{height:"36px", lineHeight:"31.5px", paddingBlockStart:"8px",
clientHeight:34}`. Cross-checked against `safari-mobile-light/mix.png` device rows 1355–1459.

**Cure.** Delete `h-9` from all three triggers and `h-10 gap-2` from the Button. If a shorter
register is genuinely wanted, `size="sm"` — which carries its own padding — is the producer's
answer. `PROPORTION-AUDIT.md §5.7` already separates glyph size, target size and reservation; this
file re-fuses them.

---

### R3-2 · BLOCKER · NEW ARM — the dark scheme inverts protagonist and support, and the caption fails contrast in both

The two tables in *Visual truth* are the finding. Stated as claims:

1. `VISUAL-CONSTITUTION.md §3.8` — *"One pane may have one full-strength visual protagonist.
   Supporting fixtures do not compete with it through equal size or equal shadow."* Measured, the
   support does not compete — **it wins**, by 1.07× in light and **1.41× in dark**. The page's one
   verb (`MixConfigBar.vue:158-170`, the file's own comment) is the least-bounded object in its own
   bar in both schemes.
2. `VISUAL-CONSTITUTION.md §4.1` — *"Text, focus, boundaries and state meet their rendered contrast
   on the actual material tier; a token name is not evidence."* The `section-label` caption renders
   **4.367:1 light / 3.681:1 dark** at 14.384px/400 against a 4.5:1 floor, peak-ink.
3. Both capsule boundaries — 1.278/1.581 for the Select, 1.197/1.123 for the verb — are below
   WCAG 1.4.11's 3:1 non-text floor. The Select's edge is a `1px solid …/0.14` hairline plus four
   1px inset bevels (measured `boxShadow`); the button's is a `oklab(… / 0.52)` wash. Neither is a
   designed contrast value: both are alpha over whatever the ambient seed happens to paint behind
   them.

The mechanism behind (3) deserves naming because it is a *design* choice and not a token bug: the
trigger's computed `background-color` is `rgba(0,0,0,0)` and its `backdrop-filter` is `none`. Its
entire visible boundary is a 14%-alpha hairline and a 1px bevel. **The legibility of every control
in this bar is a function of the ambient aurora behind it**, which the user changes by picking a
color. A seed whose wash lands near the hairline's own value erases the control. No frame in the
capture matrix exercises a second seed, so I label the erasure a **hypothesis**; the alpha-only
construction that permits it is measured fact.

**Reproduction (the measured parts).** `node png-scan.mjs` / `node png-ink.mjs` over
`visual/shots/safari-desktop-{light,dark}/mix.png`; outputs pasted verbatim above.

**Cure.** Emphasis must survive as a *material* delta, not an alpha delta: the producer's
`emphasis="primary"` branch (`components/button/styles.css .button[data-emphasis="primary"]`) is
the register that exists for exactly this and is currently unreachable (r1/r2 D-1 — the dead
`variant="primary-audacious"`). The caption failure is not local either: `.section-label` is a
**producer** recipe (`glass-ui/dist/styles/typography/utilities.css` — `@apply text-mono-caption;
color: var(--muted-foreground)`) consumed by 7 demo files; the fix is a producer ask against
`--muted-foreground` on the resting tier in both schemes, not a class in this file (edict 5).

---

### R3-3 · MAJOR · NEW — the route ships two color-space selectors, from three vocabularies, in two orders, under two names

Both are visible in the same frame. Read `safari-desktop-light/mix.png`: the left plate's title
reads **`Lab`**; the right plate's first control reads **`OKLab`**. Two color-space controls, two
different values, on one screen, with nothing stating that they mean different things.

| | left plate | this bar |
|---|---|---|
| component | `ColorSpaceSelector.vue` (311 lines) | hand-rolled `Select`, `MixConfigBar.vue:99-117` |
| vocabulary | `DISPLAY_COLOR_SPACE_NAMES` (`color-model.ts:75` = `PICKER_SPACE_NAMES` + `hex`) — **18 entries** | `INTERPOLATION_SPACES` (`color-space-meta.ts:26`) — **9 entries** |
| order | `rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz, kelvin, …` | `oklch, oklab, lab, lch, hsl, hsv, hwb, rgb, xyz` |
| accessible name | `"Select color space"` | `"Color space"` |
| trigger register | `variant="ghost" size="default"` | `h-9` |
| specimen | `WatercolorDot` + live per-space conversion per row | none at rest; a ramp chip in `#description` that has never rendered (r2 D-5b) |

`VISUAL-CONSTITUTION.md §4.2` registers **one** `ColorSpaceSelector` species and legislates it in
detail (listbox semantics, producer indicator gutter, no local pill/halo, WatercolorDot face delta
`0`). This second selector is not that species, is not in the register, and its nine label strings
are a hand-maintained duplicate of nine strings that already exist in `PICKER_SPACE_NAMES`. They
agree today; nothing holds them.

`PROPORTION-AUDIT.md` PR-06 (*"one action/selection owner across Generate and owner/Admin/Mix
tabs"*) and owner edict 4 (*"Reuse existing component-type names"*) both land here.

**Reproduction.** `safari-desktop-light/mix.png` and `safari-desktop-dark/mix.png` — left plate
`Lab`, right plate `OKLab`, same frame. Source: `ColorSpaceSelector.vue:118-120,148` vs
`MixConfigBar.vue:18,107`.

**Cure.** One selector species. If Mix genuinely restricts the offer to nine interpolable spaces,
that is a *filter on the one vocabulary* (`INTERPOLATION_SPACES` becomes a `SpaceId[]` allow-list
plus the shared `PICKER_SPACE_NAMES` label lookup), not a second table of strings, a second order,
and a second component.

---

### R3-4 · MAJOR · NEW — geometry inverts importance, and explanation density inverts with it

Two independent inversions, same root: the third control was added as a sibling of the grid rather
than a member of it, and with a different data shape.

**Geometry.** `MixConfigBar.vue:94` puts the two always-present primary controls in
`grid grid-cols-2`; `:144` puts the conditional, palettes-only `Size mismatch` control *outside*
that grid, so it inherits the bar's full width. Measured at 1440: grid columns
`227px 227px`, bar width `462px`. The tertiary, mode-conditional control therefore renders at
**2.03×** the width of the controls that decide every mix.

`PROPORTION-AUDIT.md §1`: *"Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist."* This one earns 2× for being an afterthought.

**Explanation.** The two controls whose vocabulary is self-evident to a color audience each carry a
per-row `#description` *and* a preview-ramp apparatus (`:104-114`, `:127-137`). The one control
whose vocabulary is genuinely opaque — `Discard extras` / `Repeat to pad` / `Distribute`, three
strings naming a behaviour that is invisible until after the mix has run and cannot be previewed —
carries **no description, no chip, and no help of any kind** (`:151-153`). The bar spends ~40% of
its source explaining `OKLab` and zero bytes explaining what "Distribute" distributes.

The copy compounds it: two entries are verb+object (`Discard extras`, `Repeat to pad`) and one is a
bare verb (`Distribute`). Three options, two grammars.

**Reproduction.** Structural + measured container: `barRect.width = 462`, `gridTemplateColumns:
"227px 227px"` at 1440×900 (probe output above). The palettes-mode frame itself is **not captured**
— the probe profile has no saved palettes, so the third row does not mount. Labelled: measured for
the container, structural for the row.

**Cure.** The third field joins the grid as a third cell (or the grid becomes an auto-flow field
row), and the strategy vocabulary moves into `color-space-meta.ts`'s shape —
`{value, label, description}` — so all three fields are one species with one explanation lane.

---

### R3-5 · MAJOR · NEW — the props model makes contradictory states representable

```ts
// MixConfigBar.vue:32-45
showLeftoverStrategy: boolean;
operandColors?: string[];
```

```ts
// MixPane.vue:101,103 — both derived from the same fact
:show-leftover-strategy="mode === 'palettes'"
:operand-colors="mode === 'colors' ? selectedColors.map((sc) => sc.css) : []"
```

One domain fact — `mode` — is passed twice, in two lossy encodings, and the component receives no
way to check them against each other. `{showLeftoverStrategy: true, operandColors: ["red","blue"]}`
is type-valid, constructible, and meaningless: it asks the bar to render palette-mismatch strategy
*and* colour-operand preview ramps simultaneously. Nothing in the component or its types forbids it.

The naming makes this worse rather than incidental: `showLeftoverStrategy` is a *presentation
instruction*, not a domain fact. The component is therefore forbidden from owning its own
conditional logic (it cannot ask "am I in palettes mode?"), while simultaneously being handed the
other half of that same fact through a data prop.

Compare `MixConfigBar.vue:36` with the file's own comment at `:41-43` — *"Palettes mode passes []
by the same restraint"* — which documents the coupling in prose precisely because the type system
was not asked to express it.

**Reproduction.** Type-level: `<MixConfigBar :show-leftover-strategy="true"
:operand-colors="['red','blue']" … />` typechecks. Runtime consequence not reachable from the
shipped `MixPane` (one call site, correctly derived) — **labelled a contract defect, not a live
bug.**

**Cure.** One discriminated prop: `mode: "colors" | "palettes"` plus `operandColors: string[]`,
with the leftover row keyed off `mode === "palettes"` inside the component. Illegal states stop
being representable and the presentation instruction disappears from the API.

---

### R3-6 · MAJOR · NEW — three vocabularies in one 173-line file, in two shapes, with one home

| vocabulary | shape | home | description lane |
|---|---|---|---|
| `INTERPOLATION_SPACES` | `{value, label, description}[]` | `color-session/color-space-meta.ts` (shared, 2 consumers) | yes |
| `HUE_INTERPOLATION_METHODS` | `{value, label, description}[]` | same shared module | yes |
| `STRATEGIES` + `strategyLabels` | `LeftoverStrategy[]` **plus** a parallel `Record<LeftoverStrategy,string>` | **inline, `MixConfigBar.vue:83-89`** | no |

The first two were deliberately lifted into a neutral shared home — the file documents the move at
`:16-17` (*"the interpolation vocabulary lives in its neutral @lib/ home … no more cross-feature
reach"*). The third was written the old way, in the same file, below that comment.

The parallel-array form is also the strictly weaker one: `strategyLabels` is a
`Record<LeftoverStrategy, string>` and is exhaustiveness-checked by the compiler; `STRATEGIES` is a
hand-written `LeftoverStrategy[]` and is not. Adding a fourth member to
`LeftoverStrategy` (`demo/palettes/mix.ts:19`) breaks the build at `strategyLabels` and **silently
omits the option** from `STRATEGIES`. One vocabulary, two declarations, only one of them enforced.

**Reproduction.** Add `"interleave"` to `demo/palettes/mix.ts:19`. `tsc` errors on
`strategyLabels` (missing key). `STRATEGIES` compiles unchanged and the option never renders.
(Type-level reasoning from the two declarations; not executed — **labelled a hypothesis with a
mechanical derivation**, since the edit is forbidden to this seat.)

**Cure.** `LEFTOVER_STRATEGIES: {value, label, description}[]` in `palettes/mix.ts` beside the type,
consumed by `v-for` exactly like the other two. One declaration, one shape, one home, and the third
field gains the description lane it is missing (R3-4).

---

### R3-7 · MINOR · NEW — the `colorSpace` contract admits 17 values and the component can render 9

`MixConfigBar.vue:34` types the prop `colorSpace: PickerSpace`. `picker-color.ts:35` defines
`export type PickerSpace = SpaceId`, and `PICKER_CHANNELS` (`:52-69`, `satisfies Record<SpaceId,
…>`) enumerates **17** members: the 9 offered plus `kelvin`, `srgb-linear`, `display-p3`,
`a98-rgb`, `prophoto-rgb`, `rec2020`, `ictcp`, `jzazbz`.

For those 8, no `SelectItem` matches the model value. `<SelectValue />` at `:101` carries no
`placeholder`, so the trigger renders as an empty capsule with a chevron and no text — a state the
component has no design for.

Not reachable in the shipped app: `useMixingState.ts:44` holds `colorSpace` as a private
`ref<PickerSpace>("oklab")` that only this bar writes. So the type is 89% wider than the
vocabulary, and the safety is accidental rather than expressed.

**Reproduction.** `<MixConfigBar :color-space="'display-p3'" … />` typechecks and renders an empty
trigger. **Not reachable through the shipped route** — labelled a contract defect.

**Cure.** `colorSpace: InterpolationSpace` where `InterpolationSpace = (typeof
INTERPOLATION_SPACES)[number]["value"]`. Then the offer set *is* the type, and the empty-trigger
state stops existing rather than being avoided.

---

### R3-8 · MINOR · NEW — the two Selects that share a row do not share a keyboard or announcement identity with their labels, and the third disagrees with itself

r1/r2 established that all three `<label>`s are orphans (`htmlFor: null`, `label.control === null`)
and that row 3's visible text (`Size mismatch`, `:145`) differs from its announced name
(`Size mismatch strategy`, `:147`). Both re-measured this round; both stand.

The addition is what the pixel data says about the *consequence*: because the accessible name comes
from `aria-label` and the visible caption is inert decoration, the caption is under no pressure to
be legible — and it is not (R3-2: 4.367/3.681). The two failures are one failure. A caption wired
as a real `<label>` would be load-bearing for pointer users (click-to-focus) and for AT, and its
contrast would be a correctness property rather than a styling preference.

**Reproduction.** `document.querySelector("label.section-label").control` → `null`, all three, all
four viewports (probe output above). Click on `COLOR SPACE` at CSS (760,430) → no focus change.

**Cure.** The producer already ships the primitive: `glass-ui/dist/components/labeled-field/`. One
composition, one `id`/`for` pair, one string.

---

### R3-9 · MINOR · NEW — the bar's empty state is its populated state

Enumerating the states this component can actually be in, and what distinguishes them:

| state | reachable | visually distinct? |
|---|---|---|
| 0 operands (**shipped default**) | yes | verb at `opacity: 0.5`; both Selects fully live |
| 1 operand | yes | identical to 0 |
| ≥2 operands | yes (palettes mode only — colors mode's add-slot is `aria-hidden`, r1/r2) | verb at `opacity: 1`; Δ = 1.095 → 1.197 boundary contrast |
| in-flight (`animationPhase === "mixing"`) | yes | **nothing** — `animationPhase` is passed to the canvas only (`MixPane.vue:68`); the verb keeps `cursor: pointer`, accepts the click, and `useMixingState.ts:83` silently discards it |
| error | **not representable** | `startMix` cannot fail; `mixPalettes`/`mixColorSequence` throw into no handler |
| leftover row shown | yes (palettes) | +73.6px reflow, no transition (r2 D-10) |

The row that matters for *design* rather than a11y: **in the shipped default state, the two
parameter controls are fully operable while the thing they parameterise does not exist.** The user
can tune the interpolation space and hue arc of a mix with zero operands, and nothing in the bar
says so. `VISUAL-CONSTITUTION.md §5` sets the global grammar as `select → tune → commit`; this bar
offers `tune` unconditionally, before `select` has happened, and the only signal that `select` is
outstanding is a 0.5 opacity on a control that already has 1.1:1 boundary contrast.

That is why the four shipped frames are indistinguishable from a working bar: **there is no empty
state.** The component renders its full furniture and greys one word.

**Reproduction.** `/#/mix`, fresh session, all four capture matrices: both Selects are
`aria-expanded="false"`, not `disabled`, and open on click; `canMix` is false. Measured
`{disabledAttr: true, opacity: "0.5"}` on the verb only.

**Cure.** The precondition belongs *in the bar*, once: either the parameter fields are inert until
there are operands (state follows the domain), or the verb carries a durable named reason wired
through `aria-describedby` (r1's D-3 cure) and the bar's empty state is designed as an empty state
rather than as a full one with one dimmed word. The in-flight row is free once the verb moves to
the chassis action region (r2 D-7): glass-ui's Button already ships `loading`.

---

## What is genuinely sound — the negative proof

r1's and r2's negative-proof lists hold; I re-verified the ones this round's instruments could
reach and add three entries neither prior round proved.

| Claim | Evidence |
|---|---|
| **The "costs nothing at rest" claim in the file's own comment (`:19-23`) is TRUE** | `spaceRamps`/`hueRamps` are `computed` (lazy); their **only** template readers are inside `SelectContent` (`:111`, `:133`), which reka unmounts when closed. No reader → no evaluation. The 13 `sampleInterpolationRamp` calls happen on open, not on mount. Verified by code path, and consistent with r2's measured `chippedOptions: 0`. |
| **No local design-system fork** | `demo/ui/select/index.ts` is one line: a pure re-export of eight names from `@mkbabb/glass-ui`. Edict 4's letter is honoured; only its spirit is broken (R3-3). |
| **The producer's truncation is intact** | the trigger carries `[&>span]:line-clamp-1` from the producer class list; `scrollWidth === clientWidth` for the longest value at 320 / 390 / 1440 (`121/121`, `156/156`, `225/225`). No overflow at any width — r2's result, re-measured in WebKit. |
| **No horizontal overflow, no console/page errors on `/#/mix`** | `REPORT.md` per-capture table: `overflowX = 0`, `pageErr = 0`, `consoleErr = 0`, all four matrices. |
| **The mobile capture's button honours the coarse register** | `min-block-size: 60px` beats `h-10`'s `height: 40px`; measured `h: 60` at 390-coarse. The Button is the one control in the bar the producer still owns — which is exactly why it is the one that scales. |
| **`verbatimModuleSyntax` clean; idiomatic Vue 3.5; no god module; no legacy shim** | `:12-15` all `import type`; reactive props destructure with default at `:25-45`; prop-in/emit-out so no `defineModel` stale-read hazard; 173 lines, one job, no local color math, no aliases or dual paths. |
| **RTL, reduced motion, forced-colors focus** | r2 measured all three PASS; not re-run this round (parsimony) and not disputed. |

---

## Canon conformance

Rows marked **(r2)** or **(r1)** are prior findings I re-verified and do not re-argue.

| Authority | Clause | Status |
|---|---|---|
| `VISUAL-CONSTITUTION.md §3.7` | spacing is container-scaled from glass-ui tokens | **FAIL** — R3-1, and the frozen-rhythm table |
| `VISUAL-CONSTITUTION.md §3.8` | one full-strength protagonist; support does not compete | **FAIL** — R3-2 (support wins by 1.41× in dark) |
| `VISUAL-CONSTITUTION.md §4` | closed type matrix; control/label = `text-small`, Plus Jakarta Sans, non-bold | **FAIL** — caption renders Fira Code `--type-caption` 14.384px (one rung below the matrix floor of 16.4px) (r1); `text-micro` outside the matrix (r2) |
| `VISUAL-CONSTITUTION.md §4.1` | rendered contrast on the actual material tier; a token name is not evidence | **FAIL** — R3-2 |
| `VISUAL-CONSTITUTION.md §4.1` | states never color-only; explicit role/name/state | **FAIL** — R3-8, R3-9 |
| `VISUAL-CONSTITUTION.md §4.2` | one registered `ColorSpaceSelector` species | **FAIL** — R3-3 |
| `VISUAL-CONSTITUTION.md §5` | `select → tune → commit`; one glass-ui action set | **FAIL** — R3-9 (tune precedes select); (r2 D-7) |
| `VISUAL-CONSTITUTION.md §3.1` | Mix mobile order `rack, result, controls` | **FAIL** (r2 D-7) |
| `VISUAL-CONSTITUTION.md §3.2` | empty ≤15% of stage | **FAIL** (r2 D-12, MixPane-owned) |
| `VISUAL-CONSTITUTION.md §6` | scene swap preserves continuity | **FAIL** (r2 D-10) |
| `VISUAL-CONSTITUTION.md §8` | π/DELTA — every visual claim has a tracked frame pair | **FAIL (harness)** — confirmed by `ls`: none of the six state matrices contains a `/#/mix` row |
| `PROPORTION-AUDIT.md §1` | every element earns its scale from its job | **FAIL** — R3-4 (tertiary control at 2.03× the primaries) |
| `PROPORTION-AUDIT.md §5.7` | glyph size ≠ target size ≠ reservation | **FAIL** — R3-1 (re-fused: 34.7px measured target under a 44px producer floor) |
| `PROPORTION-AUDIT.md §5.8` | rendered relation wins over token intent | **FAIL** — R3-1, R3-2 |
| `PROPORTION-AUDIT.md` PR-06 | one action/selection owner incl. Mix | **FAIL** — R3-3 |
| `PROPORTION-AUDIT.md` PR-07 | every seat has a name/state | **FAIL** — R3-8 |
| `PROPORTION-AUDIT.md` PR-08 | pending/failure truth not merely transient | **FAIL** — R3-9 (in-flight row) |
| `PROPORTION-AUDIT.md` PR-12 | touch padding preserves target floor while optics follow the rung | **FAIL** — R3-1 (inverted: optics follow nothing, floor breached) |
| Owner edict 1 (no god modules) | | **PASS** |
| Owner edict 2 (no legacy) | | **PASS** |
| Owner edict 3 (KISS, no contrivance) | | **FAIL** — R3-6 (a third vocabulary shape invented beside two shared ones) |
| Owner edict 4 (glass-ui is the design system; reuse component-type names) | | **FAIL** — R3-3 (a second color-space selector), plus r1/r2 D-1 |
| Owner edict 5 (root-level styling, never per-instance) | | **FAIL** — R3-1 (`h-9` ×3, `h-10 gap-2` ×1 over a producer register that already resolved them) |
| Owner edicts 6, 7, 8 (animations / Vue 3.5 / `import type`) | | **PASS** |

---

## Gestalt — the transposition, after three rounds

r1 asked for a labelled-field composition. r2 asked to split the node by job and move the verb to
the chassis action region. Both are right and I adopt both without restating them.

Round 3 adds the precondition that makes either of them stick:

**Stop asserting geometry.** Every rendered defect this round measured — the crushed mobile
capsule, the 24px height split between the bar's own two controls, the frozen rhythm, the
tertiary control at 2× width, the 16px chevron beside 21px type — is one habit: this file states
box dimensions (`h-9` ×3, `h-10`, `gap-2`, `gap-1`, `gap-3`, `grid-cols-2`, `w-4 h-4`) in a system
whose producer already resolves all of them from `--ui-scale` and a control register. Delete the
assertions and the producer's answers arrive: 54px triggers with their padding intact, a 60px verb
6px taller than its siblings rather than 24px, and a rhythm that responds to the container.

Then the two structural moves have somewhere to land. In order:

1. **Delete every hard-coded dimension** (R3-1). This is the cheapest change in the file and it
   fixes the only defects a user can see on a phone.
2. **One color-space species, one vocabulary, one order** (R3-3) — Mix filters the registered
   selector's offer set; it does not mint a second selector with a second table of strings.
3. **One field shape for all three fields** (R3-4, R3-6), which restores the missing description
   lane on the one control that actually needed it.
4. **`mode`, not `showLeftoverStrategy`** (R3-5) — the presentation instruction leaves the API and
   the contradictory state stops being representable.
5. Then r2's split: the verb moves to the chassis action region, taking emphasis, loading and
   precondition state with it, and the bar becomes what its name claims — a config bar.

The sentence that carries this seat: **the producer had already solved this component's geometry,
and the component spent seven class strings un-solving it — which is why, on a phone, the words
sit against the edge of the box that was supposed to hold them.**
