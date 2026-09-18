# CHALLENGE-D (round 2) — `GradientEasingEditor.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the tier this seat
was explicitly spawned with. Declared, not inherited.

---

## 0. Why this file is `-r2`

`challenge-D-design.md` (round 1, 2026-07-27 18:13, 608 lines, 16 findings) already exists in this
directory, and the sibling seats have used `-r2`/`-r3` for later rounds. Overwriting round 1 would
destroy evidence, so this is a second round filed alongside it. IDs are namespaced `D2-nn` so the
two registers can be merged without collision. §7 states exactly what is new, what confirms round 1
with harder numbers, and what I did not re-litigate.

Round 1's headline was a focus-ring defect. **Round 2's headline is that three of the twenty-seven
specimens this component renders destroy the entire `/gradient` route when pressed, silently** —
a defect round 1 did not reach.

---

## 1. Subject, method, scope

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (296 lines) |
| Audited with it | `easing/EasingSpecimenStrip.vue`, `easing/EasingAuthoringStage.vue`, `easing/easingCatalogue.ts`, `easing/useSpecimenRows.ts` — the component has no meaning without them |
| Route | `/#/gradient` only (`demo/color-picker/router/index.ts:28`). **There is no `/easing` route.** |
| Screenshots read | `visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-dark,rtl-desktop,forced-colors-desktop}/gradient.png` |
| Live probes | WebKit (real Safari engine) against `http://localhost:9000`, read-only; 8 probe runs, desktop 1440 light + dark, iPhone 14, RTL |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `OPTICAL-BENCH-COMPOSITIONS.md`, `research/proportion-register.md` |
| Files written | this file only |

Every number below is a measured rendered value or a quoted line. Where I could not measure, I say
so and label the claim a hypothesis.

---

## 2. Verdict

**DEFECTIVE.** 15 findings: 2 BLOCKER, 9 MAJOR, 4 MINOR.

The component's header comment (lines 3–25) is a 23-line defence of a set of named laws. Three of
those laws are **not in force in the shipped page**: one is dead CSS matching a selector the producer
no longer emits (D2-03), one is contradicted by a second selection control the seat forgot to
suppress (D2-04), and one publishes as first-class specimens three curves whose selection destroys
the route (D2-01). A design whose docstring is longer than its argument, and wrong about the render,
has stopped checking itself against the render.

The deepest defect is that **this component should not exist in this shape**: the tranche's own
binding topology already ruled that Easing owns a separate route and chassis with a 19–22 rem centred
protagonist, and the register already carries the row — `PR-09`, verb **ENLARGE**, wording *"Gradient
preview and embedded Easing selector are presently subordinate/tiny."* The shipped component is still
the pre-ruling shape, and most of §3 is that compression paying out.

---

## 3. What the screenshots actually show

**Desktop light (1440 × 900).** The Easing section is one card, 462 × 196 px, between Interpolation
and CSS. Inside it: a 460 × 39 head (`1 → 2` · two dots · a 16 px tick · `linear` · chevron); a
436 × 20 chromatic ramp; a row of eight round beige coins with 9 px labels crammed against their
rims; a `cubic-bezier(0, 0, 1, 1)` rail. Nothing in that composition reads as an *instrument*; it
reads as a settings row that grew a picture.

**Dark.** The plate, the readout well and the authoring well collapse into one muddy brown. Measured
(D2-12): the readout well and authoring well are the **identical computed colour** in both schemes,
and in light the plate→well step is ΔL = 0.015 oklab. Two rounded boundaries are drawn where the
material states nothing.

**Mobile (iPhone 14).** The strip is cut mid-tile at the right edge with a half-visible `sine` family
hanging off the fade. Measured: **79.9 % of the catalogue is off-screen**.

**RTL.** Two visible breaks: the interval identity renders **`2 → 1`** when the model says `1 → 2`,
and the family hairlines have moved one position — no rule at `css | sine`, a stray rule floating at
the outer left of the strip.

**Forced colours.** Renders identical to light. WebKit does not honour Playwright's
`forcedColors: "active"`, so that matrix is **not evidence**; I treat the forced-colours consequence
of D2-07 as a hypothesis.

---

## 4. Findings

### D2-01 · BLOCKER · Three of the twenty-seven specimens destroy the route; so does ordinary authoring

The strip publishes the whole `bezierPresets` table as pressable tiles by mechanical enumeration
(`easingCatalogue.ts:178` — `for (const name of Object.keys(bezierPresets))`). Three of them are the
`back` family, whose range leaves `[0, 1]`. The gradient's colour mixer rejects progress outside
`[0, 1]` and the caller **throws**.

Chain, all four links quoted:

- `src/color/operations.ts:90` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });`
- `demo/workbenches/gradient/composables/useGradientInterpolation.ts:37` — `if (!mixed.ok) throw new Error(...)`
- `demo/workbenches/gradient/composables/useGradientCSS.ts:199–207` — `const easedT = easing(t); … mixColors(c0, c1, easedT, …); if (!mixed.ok) throw`
- `easing/useSpecimenRows.ts:53–59` — `interpolateStopColors(s0.cssColor, s1.cssColor, fn(0.5), …)` **inside a `computed`**

Measured midpoints (independent cubic-bezier solve, plain node — not read from the library):

```
ease-in-back      fn(0.5) = -0.063622   in [0,1]? false
ease-out-back     fn(0.5) =  1.067553   in [0,1]? false
ease-in-out-back  fn(0.5) =  0.606680   in [0,1]? true
```

`ease-in-out-back` still dies, because `serializeIntervalRamp` → `sampleCoalescedStops` evaluates the
same callable at 32 points and the back curve leaves `[0, 1]` between them.

**Reproduction — pointer, keyboard and drag, all three fatal:**

```
open http://localhost:9000/#/gradient      (the first Easing row is open by default)
scroll the specimen strip to the "back" family
press  ease-in-back | ease-out-back | ease-in-out-back    — by click, or by Tab + Enter
```

Full 27-tile walk, one page, tiles pressed in catalogue order:

```
ease-in-out-circ | rows= 1 | on= 1 | pageErrors= 0 | consoleErrors= 0
ease-in-back     | rows= 0 | on= 0 | pageErrors= 0 | consoleErrors= 0
ease-out-back    | TILE GONE
ease-in-out-back | TILE GONE
steps            | TILE GONE
step-start       | TILE GONE
step-end         | TILE GONE
```

Independent fresh-page trials, `before.rows: 1` in every case:

| trial | after.rows | "Try again" boundary | pageErrors | consoleErrors |
|---|---|---|---|---|
| `ease-out-back` / pointer | 0 | **true** | 0 | 0 |
| `ease-in-back` / **keyboard** (focus + Enter) | 0 | **true** | 0 | 0 |
| `ease-in-out-back` / pointer | 0 | **true** | 0 | 0 |
| `steps` / pointer (control) | 1 | false | 0 | 0 |

The captured screenshot shows the result: the **entire `/gradient` route** — the Gradient plate *and*
the My Palettes plate — replaced by an empty atmosphere and a bare `Try again` pill. No message, no
page error, no console error. Silent whole-route destruction, and every specimen after the first
`back` tile becomes unreachable.

The **authoring** path is fatal on the same mechanism. The disclosed producer picker advertises its
own domain in its screen-reader instructions, read off the live DOM:

> "Left and Right change x from 0 to 1. **Up and Down change y from -0.6 to 1.6.** Hold Shift for
> larger steps."

Dragging the second control handle 30 px above the plot box →
`{"rows": 0, "tryAgain": true, "literal": null}`, `pageErrors: []`.

**This is a design defect, not merely a bug.** The seat chose to (a) enumerate the whole preset table
with no domain filter, (b) derive a decorative row ink from an *unbounded* curve evaluation at
`t = 0.5`, and (c) mount an authoring instrument whose declared range (`y ∈ [-0.6, 1.6]`) is **2.2×
the consumer's admissible domain**. The strip even styles the overshoot deliberately —
`EasingSpecimenStrip.vue:174–179`: *"overshoot curves (the back family) draw past the box — visible,
never clipped."* The design advertises the overshoot, invites the press, and dies on it.

**Cure (architectural, not a patch).** The gradient interval's progress is a bounded domain; say so
once. `sampleCoalescedStops` is already declared *"the ONE sampling law"* (`useGradientCSS.ts:3`) —
that is the single seam where curve *range* must be mapped into colour-progress *domain*. One law
there (clamp, or an explicit overshoot-to-endpoint reflection, decided once and named), and the ink
derivation in `useSpecimenRows` consumes the same mapped value instead of raw `fn(0.5)`. Do **not**
add try/catch at the seat, and do not quietly drop the `back` family from the catalogue — the domain
decision belongs in the sampler, stated.

---

### D2-02 · BLOCKER · This component is the missing `/easing` route, mis-seated as an accordion

The binding topology decision is unambiguous. `OPTICAL-BENCH-COMPOSITIONS.md:31`:

> "The route inventory is exactly `/` Picker, … `/gradient` Gradient, **`/easing` Easing**, …
> **Easing sits adjacent to Gradient in navigation but owns a separate route/chassis**"

`OPTICAL-BENCH-COMPOSITIONS.md:45`, the Easing row:

> "P122 `golden`: **centered 19–22rem curve/time stage** 61.8033989%; catalogue/code inspector
> 38.1966011% … Landmark-neutral chassis; **no tiny nested Card** … Close clamp, neutral time, axes
> and **no local picker**."

`OPTICAL-BENCH-COMPOSITIONS.md:79`: Easing boundaries `[]`, reserve `none`, dividers `none`.

`VISUAL-CONSTITUTION.md §3.1`: *"**Gradient cannot stand in for Easing**"*, and *"Easing is a peer
route adjacent to Gradient rather than a nested P122 instrument."*

`research/proportion-register.md:32` already carries the row:

> **PR-09** | "Gradient preview and **embedded Easing selector** are presently subordinate/tiny" |
> "`/gradient` and `/easing` are distinct P122 golden instruments; Easing curve is centered and
> container-clamped to **19–22rem**" | **ENLARGE** | W27

Measured against that, the shipped component violates five clauses simultaneously:

| clause | canon | shipped (measured) |
|---|---|---|
| separate route/chassis | `/easing` is a first-class destination | `router/index.ts` has no `/easing`; the instrument is a `v-for` of accordion rows inside Gradient's inspector column |
| protagonist 19–22 rem, centred | 304–352 px | curve **drawn at 166.7 px = 10.4 rem** — **45 % below the floor** — and only after **two** disclosures (open the row, then press the sliders glyph) |
| no tiny nested Card | — | each interval is `rounded-card border border-card-edge`; computed `border-radius: 16px` = `--radius-card`; two further wells nested inside |
| boundaries `[]`, dividers `none` | zero | 1 row-card border + 1 ramp border + **7** family hairlines + 1 rail well + 1 authoring well + 1 producer `.glass-card` |
| **no local picker** | — | `EasingAuthoringStage` mounts a **local `<EasingPicker>` per interval** |

`PROPORTION-AUDIT §5.2` applies directly: *"A card has one protagonist, one identity line, and at
most one persistent action/status region. Additional equal-weight zones require a different
`InstrumentChassis` composition."* The open row carries a ramp, a 27-tile gallery, a literal rail
with two actions, and a full bezier editor — four zones in one card.

**Reproduction:** `http://localhost:9000/#/easing` falls through `router/index.ts:37`
(`{ path: "/:pathMatch(.*)*", redirect: "/" }`) to Picker; the easing instrument is reachable only by
navigating to `/#/gradient` and scrolling to the Easing section.

**Cure.** Execute PR-09 as written: lift the instrument to its own `/easing` route and
`InstrumentChassis`, curve/time stage as the 19–22 rem centred protagonist, catalogue as the 38.2 %
inspector. What stays in `/gradient` is one *identity + selection* line per interval — name,
portrait, literal — linking to the Easing instrument for that interval. The accordion, the nested
wells, the local picker and six of the eight boundaries then die by subtraction rather than restyle.
D2-03, D2-09, D2-12 and D2-14 are all downstream of this row.

---

### D2-03 · MAJOR · "Law 3 — zero letterbox" is dead CSS; the canvas ships a 2.05 : 1 letterbox

`EasingAuthoringStage.vue:19–24` declares:

> "**Zero letterbox (O-17)** — the canvas sizes by ONE law: inline-size driven, aspect ≡ the LIVE
> viewBox ratio (`--vb-ratio`, synced from the DOM attribute …), no fixed block-size. The drawn plot
> IS the element box."

The mechanism targets `svg[role='img']` in three places: `EasingAuthoringStage.vue:48–50`
(`querySelector("svg[role='img']")`) and the `:deep(svg[role="img"])` block at lines 104–115.

**glass-ui 7.0.0 renders the plot as `role="group"`, not `role="img"`.** Measured live DOM of the
disclosed stage:

```
hasRoleImgSvg: false
svgs[0] = { role: "group", cls: "block w-full touch-none select-none",
            vb: "0 -0.1 1 1.2000000000000002",
            w: 410, h: 200,
            aspect: "1 / 1", blockSize: "200px", inlineSize: "410px",
            transition: "all" }
```

Had the seat's rules applied, `aspect-ratio` would compute to `calc(1/1.2) ≈ 0.833`, `block-size`
would be `auto`, `inline-size` would be `min(100%, 19rem) = 304px`, and `transition` would name
`aspect-ratio`. None of that is true. **All three `:deep(svg[role="img"])` declarations, the
`onMounted(syncVbRatio)` call, the `watch(() => value.css, …)` and the `requestAnimationFrame`
scheduled on every authoring emission are inert.** `vbRatio` is frozen at its `ref(1.2)` seed
forever.

The consequence is the exact defect the law was written to kill. viewBox is `1 × 1.2`; the element is
410 × 200; `preserveAspectRatio` default *meet* fits to height, so the drawn plot is `200 / 1.2`:

```
svg box 410 × 200 · drawn 166.7 × 200 · letterbox = 243.3 px = 59.3 % of the canvas width
```

Visible in both row captures: a 1:1 grid marooned in a wide beige well with ~120 px of nothing each
side. The bug is *masked* today only because the seed `1.2` happens to equal `linear`'s live viewBox
ratio; it becomes wrong in value as well as geometry the moment the curve changes regime.

**Cure.** Delete the `--vb-ratio` apparatus entirely. A consumer must not re-derive a producer's
intrinsic ratio from a DOM attribute through a rAF — that is the contrivance that rotted. The plot's
aspect is the producer's fact and belongs on the `EasingPicker` root (a producer-owned custom
property, or an intrinsic `aspect-ratio` on the svg); the P7 packet already exists for this. Until
then the seat should size by `inline-size` alone and let the svg's own ratio govern — not by a
selector guess.

---

### D2-04 · MAJOR · Two selection surfaces for one catalogue, showing contradictory state

The component's thesis (lines 8–12, and `easingCatalogue.ts:9–11`) is the "kf BG-8 division":
*"the strip selects, the picker authors."* The seat enforces one half (`:readout="false"`,
`:playback="false"`) and forgets the other.

Measured inside the disclosed authoring stage:

```
presetControl: { label: "Easing preset", text: "Pick a curve", w: 436, h: 40 }
```

A second, full-width, 40 px **selection** control over the *same* `bezierPresets` catalogue, 30 px
below the strip that already selects from it. `OPTICAL-BENCH-COMPOSITIONS.md:45` names this exactly:
Easing must close with **"no local picker."** `PROPORTION-AUDIT` PR-06 — *"Three adjacent action
species or duplicated selected fills → **REMOVE** … One action/selection owner"* — is the register
row.

Worse, the two surfaces disagree. Measured simultaneously, light and dark, without interaction:

```
selectedTile:       "linear"                      (strip: pressed, aria-pressed="true")
headName:           "linear"                      (row identity)
literal:            "cubic-bezier(0, 0, 1, 1)"
presetControl.text: "Pick a curve"                ← an UNSET placeholder
```

The interval *is* a named preset; the second selector says nothing is picked. Reading top to bottom
you are told the curve is `linear`, then told to pick a curve.

**Cure.** Suppress the producer's preset rail the way `readout` and `playback` are already
suppressed — i.e. request `:presets="false"` on the P7 packet rather than CSS-hiding it
(`VISUAL-CONSTITUTION §4.2`: *"Consumer CSS may not hide a producer divider"*, and the same principle
governs a producer control). One selection owner: the specimen strip.

---

### D2-05 · MAJOR · The tiles ask for `shape="cell"` and render as circles whose labels overflow them

`EasingSpecimenStrip.vue:98–104` consumes `<Chip mode="selectable" shape="cell">` and comments that
this is *"the producer Chip cell recipe … the seat sizes it to specimen scale."*

glass-ui 7.0.0's `chipVariants` (`dist/chip-DFZQr6rV.js`) puts the pill radius in the **base**:

```js
g = "glass-chip glass-capsule accent-tone inline-flex items-center justify-center …"
y = { pill: "", cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro", icon: "…" }
```

`glass-capsule` (radius) applies for **every** shape and `cell` does not override it. Measured live:

```
border-radius: 9999px   ·   45.23 × 43.80 px   →  a circle
```

A two-line column tile — portrait over label — inside a circle. Measured label overhang for every
tile whose label exceeds four characters (`linear`, `in-out`, `smooth`):

```
tile 45.23 × 43.80 · label width 33.23 px
label band at |dy| = 17.90 from centre  →  capsule silhouette there = 26.67 px
OVERHANG = 6.56 px   (3.28 px past the rim on each side)
```

Visible in every capture: the words `linear`, `in-out`, `smooth` sit *on* the rim, breaking the disc.

Compounding it, the seat per-instance-overrides every geometric property of the recipe it just asked
for — a direct violation of the root-level-styling edict and of `PROPORTION-AUDIT §5.8` (*"Real
rendered relation wins over token intent"*):

| property | producer `cell` recipe | seat `.specimen-tile` | computed |
|---|---|---|---|
| display | `inline-flex` (base) | `flex` | `flex` — seat wins |
| flex-direction | `flex-col` | `column` | duplicate |
| gap | `gap-1.5` = 6 px | `0.125rem` | **2 px** |
| padding | `px-2 py-2.5` = 8/10 px | `0.3125rem 0.375rem 0.25rem` | **5 / 6 / 4 px** |
| label size | `text-micro` = 11 px | `.tile-label { 0.5625rem }` | **9 px** |

**Cure.** The cell radius is a glass-ui defect and belongs there: `glass-chip--cell` must own its own
corner rather than inheriting `glass-capsule`. Relay it on the standing BH/BI inbox. At this seat,
delete the `.specimen-tile` geometry block entirely and consume the producer's cell rhythm — if
11 / 8 / 10 px is the wrong scale for a specimen, that is a producer `size` rung request, not nine
local declarations.

---

### D2-06 · MAJOR · Off-ladder type, and three different jobs rendered identically

Two hardcoded sizes, neither on any rung:

```
.family-eyebrow  font-size: 9px  (0.5625rem)  opacity 0.75
.tile-label      font-size: 9px  (0.5625rem)
--text-micro     0.6875rem = 11px    ← the smallest named rung that resolves on this element
```

`VISUAL-CONSTITUTION §4` declares the type matrix **"closed across all eighteen compositions"** with
exactly one named exception (P019's Picker pair). `PROPORTION-AUDIT §5.13` repeats it. A 9 px literal
is off the ladder in both.

At the other end the row has **no hierarchy at all**. Measured on one row, simultaneously:

| element | job | size | family | colour | weight |
|---|---|---|---|---|---|
| `1 → 2` | interval identity | 16.4 px | Fira Code | `rgb(112, 89, 66)` | 400 |
| `linear` | specimen name | 16.4 px | Fira Code | `rgb(112, 89, 66)` | 400 |
| `cubic-bezier(0, 0, 1, 1)` | exported value | 16.4 px | Fira Code | `rgb(112, 89, 66)` | 400 |

Three semantic roles — identity, specimen name, exported value — rendered byte-identically 40 px
apart. `§4`'s matrix assigns `text-mono-small` to *"value, code, or provenance"*; the specimen name is
an identity, not a value. And the source admits the size was chosen for a side effect rather than a
role (`GradientEasingEditor.vue:134–135`):

> "text-mono-SMALL: curve identifiers are case-sensitive; text-mono-caption would uppercase them
> (P1-7)."

A type decision taken to dodge a `text-transform` is exactly the token abuse `§5.8` forbids.

**Cure.** The specimen name takes the identity role from the matrix, not the value role; if
`mono-caption` uppercases, the fix is a producer `text-transform: none` variant on the caption rung,
not a size substitution. The 9 px eyebrow and label move to `--text-micro`; if 11 px will not fit,
that is evidence for D2-02, not licence for a new size.

---

### D2-07 · MAJOR · Selection is effectively colour-only

`VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled states are **never
color-only**."* `§4.2` sets the precedent quantitatively: the selected seat and marker must show
*"independent nonzero monochrome/forced-colors deltas."*

Measured, pressed tile vs unpressed tile, same page, light scheme:

```
identicalBg:     true    (both  oklab(0.925647 0.009411 0.029177 / 0.83872))
identicalShadow: true    (byte-identical 7-layer box-shadow strings)
border: 0px both   ·   outline: none both   ·   opacity: 1 both   ·   filter: none both
```

Confirmed identical in dark too (`oklab(0.467325 0.012705 0.030851 / 0.911296)` for both states). The
producer's `data-state="on"` wash contributes **zero** background or shadow delta at this seat.

Every surviving delta is chromatic or sub-pixel:

```
glyph stroke  oklab(… / 0.65) →  oklch(0.438102 0.074812 205)     (colour)
glyph width   1.25px          →  1.75px                           (0.50 px on a 22 px glyph)
label colour  rgb(91,70,51)   →  oklch(0.438102 0.074812 205)     (colour)
label weight  400             →  600                              (on 9 px text)
```

`aria-pressed` is correct (`"true"` / `"false"`), so assistive tech is fine — this is a **visual**
legibility defect. Strip the colour and the pressed specimen is announced by half a pixel of stroke
and a weight step at 9 px.

*Hypothesis, not measured:* in true forced colours this leaves no visible selection. The captured
`forced-colors-desktop` matrix is not evidence — WebKit ignores Playwright's `forcedColors: "active"`
and the shot renders as ordinary light.

**Cure.** The pressed specimen needs a geometric register the producer already owns: `selectable`
Chip should carry a shape/inset delta (ring, fill or notch) rather than delegating selection entirely
to the consumer's ink. Relay to glass-ui; at the seat, stop treating `--motion-accent` as the
selection signal.

---

### D2-08 · MAJOR · RTL: the interval identity inverts, and every family rule sits on the wrong edge

**(a) The identity inverts.** `useSpecimenRows.ts:63` builds the label as a bare string:

```ts
label: `${i + 1} → ${i + 2}`,
```

Under `dir="rtl"` the bidi algorithm reorders the numerals around the neutral arrow. Measured:
logical `headLabelText: "1 → 2"`; rendered **`2 → 1`** (RTL clip and `rtl-desktop/gradient.png`). The
gradient still runs stop 1 → stop 2. `VISUAL-CONSTITUTION §5.2` covers exactly this class: *"CSS
direction keywords, physical axes, code, hex, slug, ID | **preserve the declared physical/domain
meaning** … inside an LTR-isolated value."* A stop-ordinal pair is a domain coordinate, not prose,
and must not mirror. *(Round 1 D-03 reached the same conclusion; this is the confirming measurement.)*

**(b) Every family rule moves one position — new in this round.**
`EasingSpecimenStrip.vue:143–146` uses physical properties:

```css
.strip-family + .strip-family { border-left: 1px solid var(--card-edge); padding-left: 0.875rem; }
```

Measured in RTL, families in DOM order with their rendered rects:

```
css   [ 962.5 → 1201.0]   border-left 0px    padding-left 0px
sine  [ 792.3 →  948.5]   border-left 1px    padding-left 14px
quad  [ 622.1 →  778.3]   border-left 1px    padding-left 14px
…
steps [-277.1 → -122.1]   border-left 1px    padding-left 14px      ← leftmost; nothing beyond it
```

`css` renders to the **right** of `sine`, so `sine`'s left border no longer separates it from its
predecessor — it separates it from `quad`. Net: **no rule at the `css | sine` boundary**, and a stray
rule on the outer left edge of `steps` with nothing beyond it. Both visible in the clip.

**Cure.** `border-inline-start` / `padding-inline-start`; and the interval label needs the LTR
isolation the constitution already prescribes for code/hex/slug values — or, better, stop rendering
an ordinal pair as a bidi-sensitive string at all.

---

### D2-09 · MAJOR · 27 tab stops for one single-select gallery, 70–80 % off-screen, navigation deleted

Measured:

| | desktop 1440 | mobile (iPhone 14) |
|---|---|---|
| scroll-port client width | 436 px | 298 px |
| strip content width | 1482 px | 1482 px |
| **hidden** | **70.6 %** | **79.9 %** |
| tiles total / roughly visible | 27 / ~8 | 27 / ~6 |
| tab stops on the whole route | **52** | — |

The strip's 27 tiles plus its focusable port are **28 of the route's 52 tab stops** — a single
accordion row owns more than half the page's keyboard order, and 21 of those stops are off-screen
when you land on them. `VISUAL-CONSTITUTION §5.2` names the pattern this should use: *"horizontal
Dock/rail **roving focus** … Home = first semantic item, End = last; activation is separate from
movement."* A single-select rail is one tab stop with arrow movement, not 27.

The one affordance that made 27 items navigable was deliberately removed
(`EasingSpecimenStrip.vue:136–137`):

> "the kf family filter's information architecture folded INTO the strip (compactness: no second
> control row)"

What replaced it is decoration: `<span class="family-eyebrow" aria-hidden="true">` — not a control,
not focusable, not announced. `PROPORTION-AUDIT §5.6` permits subtraction (*"Subtraction precedes
explanation"*) but its second clause requires *"Add affordance when the surviving action/state is
otherwise undiscoverable."* With eight families and 79.9 % of them off-screen on mobile, `back` and
`steps` are undiscoverable except by blind horizontal scrubbing.

**Cure.** Roving tabindex over the tiles (one stop; arrows move; Home/End jump), and make the family
eyebrows the navigation they already look like — real jump controls, or a two-row grid showing all
eight families at once. In the `/easing` chassis of D2-02, at 61.8 % of 1440 px, the whole catalogue
fits with no scroller at all.

---

### D2-10 · MAJOR · Two focus registers inside one component, and an unnamed focusable region

The component's own comment (lines 220–221) claims *"the house focus register (the accent-aware ring
the keystone mints — **never a bespoke outline**)."* Measured, focusing each element in turn:

```
.interval-head   outline: none 3px   box-shadow: color(srgb 0.665 0 0.2615 / 0.3) 0 0 0 2px, …
.specimen-tile   outline: none 3px   box-shadow: color(srgb 0.665 0 0.2615 / 0.3) 0 0 0 2px, …
.rail-btn        outline: none 3px   box-shadow: color(srgb 0.665 0 0.2615 / 0.3) 0 0 0 2px, …
.fading-scroll   outline: auto 3px   box-shadow: none          ← the UA default ring
```

The `FadingScroll` port is `tabIndex: 0`, `role: null`, `aria-label: null`, `overflow-x: auto`. The
tab run through this component is therefore: house crimson ring → **system ring on a nameless box** →
house crimson ring × 27. `VISUAL-CONSTITUTION §4.1` requires one distinct focus register in both
schemes; there are two. The `role="group" aria-label="Easing curve specimens"` sits on the *inner*
`.strip-row`, not on the focusable port, so the stop that actually receives focus has no name.

**Cure.** The scrollable region is a producer surface: `FadingScroll` should accept and apply
`role="region"` + a required label and the house focus ring, or expose an opt-out when the consumer
supplies its own roving-focus rail — which D2-09's cure does, at which point the port stops being a
tab stop at all.

---

### D2-11 · MAJOR · A boolean UI state painted in a data-derived colour

`useSpecimenRows.ts:53–70` derives `ink` — *"the certified eased ramp midpoint"* — and the template
publishes it as `--motion-accent` on the row (`GradientEasingEditor.vue:115`). Inking the specimen
*portrait* with it is defensible: that is data depicting itself. But the same token also paints two
**control** states (lines 289–294):

```css
.rail-btn--on { color: var(--motion-accent, var(--foreground)); }   /* the tune toggle, ON */
.rail-tick    { color: var(--motion-accent, var(--foreground)); }   /* the copy-success tick */
```

Measured with hover cleared:

```
.rail-btn--on  color = oklch(0.438102 0.074812 205)      ← the interval's own derived ink
```

And that value is a function of the *selected curve*. Sampled across the strip walk, the same token
takes at least 21 distinct values within a single row, e.g.:

```
linear          oklch(0.438102 0.074812 205)
ease-out-expo   oklch(0.455510 0.179335 262.338959)
ease-in-expo    oklch(0.433560 0.120955 149.463577)
ease-out-cubic  oklch(0.446749 0.126493 250.011307)
step-start      oklch(0.456744 0.180000 265)
```

So "this toggle is on" and "the copy succeeded" have **twenty-seven different colours**, none of them
the system's active/success register, and two adjacent interval rows will show the same boolean in
two different hues. `VISUAL-CONSTITUTION §2`: *"Seed tint is forbidden outside the ambient field,
active accent, WatercolorDot/specimen, and pastel Palettes lanes."* A confirmation tick is status,
not specimen. `PROPORTION-AUDIT §5.5` draws the same line: a mark is *"data, status, labeled action,
drag affordance, focus/selection register — or removed"*, and status has a system colour.

**Cure.** `--motion-accent` inks the specimen glyph and the tile portrait only. The tune toggle's
active state and the copy tick take the house active/success register — one colour, page-wide, so the
state is learnable.

---

### D2-12 · MINOR · Two identical wells stacked 10 px apart; a boundary where the material says nothing

`OPTICAL-BENCH-COMPOSITIONS.md:79` gives Easing boundaries `[]` and dividers `none`.
`PROPORTION-AUDIT §5.4`: *"Spacing plus material already expressing the same boundary makes the line
duplicative."*

Measured backgrounds, disclosed row, both schemes:

| surface | light | dark |
|---|---|---|
| plate | `oklab(0.928273 0.005506 0.013193 / 0.664)` | `oklab(0.395241 0.00968 0.016528 / 0.7536)` |
| readout-rail well | `oklab(0.913299 0.005463 0.013024)` | `oklab(0.345296 0.010372 0.017546)` |
| authoring well | **`oklab(0.913299 0.005463 0.013024)`** | **`oklab(0.345296 0.010372 0.017546)`** |

The two wells are the **same colour**, each with its own rounded boundary, 10 px of gap between them
— one surface drawn twice. And in light the plate → well step is `ΔL = 0.015` oklab: a boundary whose
material delta is at the threshold of perception, which is why both light captures read as one flat
beige column and the dark ones as one flat brown one.

**Cure.** One well. The literal rail and the authoring canvas are one editing surface at one tier;
merge them and delete a boundary rather than tuning the tone.

---

### D2-13 · MINOR · The "one literal" is the one form a CSS author would not write

`easingCatalogue.ts:106–128` mints every tile's literal through `bezierLiteral()`, including the five
CSS **keyword** easings. Measured live, head name vs rail literal:

```
head "linear"       →  cubic-bezier(0, 0, 1, 1)
head "ease"         →  cubic-bezier(0.25, 0.1, 0.25, 1)
head "ease-in"      →  cubic-bezier(0.42, 0, 1, 1)
head "ease-out"     →  cubic-bezier(0, 0, 0.58, 1)
head "ease-in-out"  →  cubic-bezier(0.42, 0, 0.58, 1)
```

The row *names* the keyword 40 px above a rail that refuses to write it, and the only copyable
artefact for `linear` is 24 characters of redundant bezier. `VISUAL-CONSTITUTION §1` states the
product job: a person *"leaves with an understood, edited, **code-ready** color artifact."*

`easingCatalogue.ts:38–45` explains why — byte-identity with the picker's mint — but that is an
*internal* identity concern paid for in the *exported* literal.

**Cure.** Mint two fields: an identity key (normalised bezier, unchanged) and a display/export
literal that prefers the CSS keyword when one exists. The head then names `linear` and the rail
copies `linear`.

---

### D2-14 · MINOR · The disclosure teleports, and pays its full mount cost anyway

Both disclosures are `v-show` with **no transition**: the accordion body (line 144) and the authoring
stage (line 204). Meanwhile the chevron animates (`transition-transform`, line 138) — the affordance
promises motion and the content pops. `VISUAL-CONSTITUTION §6`: *"Spatial continuity uses one
producer-owned glass-ui spring register."* There is no register here; there is nothing.

And the disclosure buys nothing in cost either. Measured before any interaction, on first paint:

```
authoringStage (mounted): 1     authoringVisible: 0
```

Every interval mounts a complete `<EasingPicker>` — a live bezier editor with drag handles, grid,
labels and a preset select — before the user has pressed anything, and it stays mounted when the row
collapses (`collapsed: { openRows: 0, mountedPickers: 1, visibleStages: 0 }`). The header comment
defends this (lines 16–18, *"Picker instances stay ALIVE (v-show, never v-if)"*) on state-continuity
grounds, but `EasingAuthoringStage` is fully controlled — it takes `:value` and emits, holding no
state worth preserving.

**Cure.** Either the disclosure is real — `v-if` plus one named motion family from
`demo/styles/animations.css` — or it is not a disclosure and the editor is always visible (which is
what D2-02's `/easing` chassis wants). The current shape is the worst of both.

---

### D2-15 · MINOR · "One ink per specimen" is false by construction

`useSpecimenRows.ts:1–9` claims *"one ink per specimen"*, derived from `fn(0.5)`. One sample of a
curve is not an identity. Measured:

- **Every symmetric curve collapses to the same ink.** `linear`, `ease-in-out`, `ease-in-out-expo`,
  `smooth-step-3` and `steps(4, jump-end)` all yield `oklch(0.438102 0.074812 205)` — five of the 24
  reachable specimens share one "own" ink.
- **The single-step curves ink to their own endpoint dot.** `step-start` → `oklch(0.456744 0.18 265)`
  (hue 265 = stop 2, whose dot is `oklch(0.65 0.18 265)`); `step-end` → `oklch(0.432757 0.136109 145)`
  (hue 145 = stop 1, `oklch(0.75 0.15 145)`). The row's "identity ink" is a darkened copy of a colour
  already printed 30 px to its left.

**Cure.** If the row needs an ink, derive it from something that actually distinguishes curves — the
signed area between the curve and the diagonal, say — or drop the per-row ink and let the shared
accent carry it. Either way it must not be an unbounded evaluation (D2-01).

---

## 5. What is sound — the negative proof

I attacked these and found no defect:

- **Motion is tokenised, not ad hoc.** `--duration-fast: 0.2s`, `--duration-normal: 0.3s`,
  `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` all resolve on the component's own subtree; no
  literal durations or curves in the SFC. (`--animation-slide-sm/md/lg` resolve to the empty string
  app-wide and are used nowhere here — a canon-drift note for the register, not a defect of this
  component.)
- **Reduced motion is honoured.** `demo/styles/animations.css:184` applies
  `*, *::before, *::after { transition-duration: 0.01ms !important }`, and the strip branches its own
  smooth-scroll explicitly (`EasingSpecimenStrip.vue:74`,
  `behavior: prefersReducedMotion.value ? "auto" : "smooth"`). Measured `rafPer1500ms: 0` for
  `#/gradient` in the `reduced-motion-desktop` matrix (`STATES.json`).
- **No layout-forcing animation survives.** The only such property (`transition: aspect-ratio`) is
  inert — which is D2-03, not a motion defect.
- **No god module.** 296 lines with three focused children, one composable and one catalogue, each
  with a single job.
- **No legacy shims, aliases, dual paths or masking fallbacks** in any of the five files.
- **`verbatimModuleSyntax` is clean.** Every type-only import in all five files is `import type`
  (`GradientEasingEditor.vue:30,34,36`; `EasingSpecimenStrip.vue:16`; `EasingAuthoringStage.vue:30`;
  `easingCatalogue.ts:27,31,36`; `useSpecimenRows.ts:12,17`).
- **Idiomatic Vue 3.5.** Reactive props destructure (`const { stops, intervals, modelState } =
  defineProps<…>()`), `useTemplateRef` in both children. No `defineModel` stale-read hazard — the
  component emits upward and never round-trips.
- **Accessible names are complete for this component.** The route's single nameless button is
  `button.dock-icon-button` (measured DOM path
  `div.relative > div.glass-resting > div.flex > div.flex > div.flex > button.dock-icon-button`) — not
  in this subtree. Both rail buttons carry `aria-label`; both disclosures carry `aria-expanded` +
  `aria-controls`; the ramp is `role="img"` with a label; decorative dots and glyphs are
  `aria-hidden`; the tiles carry correct `aria-pressed`.
- **Tap targets meet WCAG 2.5.8.** Rail buttons measure exactly 24 × 24; tiles 44–45 × 44; the head
  460 × 39. The audit's six small-target rows on `/#/gradient` belong to the slug input, the dock and
  the gradient stop handles — none of them this component.
- **No document-level horizontal overflow** on any of the four Safari matrices
  (`REPORT.json` `overflowX: 0`) despite the 1482 px strip — `FadingScroll` contains it correctly.
- **The empty state is unreachable by construction**, so its absence is not a defect:
  `useGradientModel.ts:123` — `if (stops.value.length <= 2) return; // Minimum 2 stops` — guarantees
  at least one interval, hence at least one row.
- **Contrast: NOT MEASURED.** My compositing walk could not resolve the translucent
  `oklab()` / `color(srgb …)` glass stack, so I have no defensible ratio for the 9 px eyebrow, the
  tile label or the rail literal. I decline to publish the numbers I computed. This is the one axis of
  the seat brief I did not close; it should be re-run with pixel sampling.

---

## 6. Defect families

| family | rows | one sentence |
|---|---|---|
| **Domain/range mismatch at a composition seam** | D2-01 | An unbounded curve range is fed to a `[0,1]`-bounded colour domain at two call sites, and the seat publishes the out-of-domain curves as first-class specimens. |
| **Instrument compressed into the wrong housing** | D2-02, D2-03, D2-09, D2-12, D2-14 | A 19–22 rem centred instrument was folded into a 462 px accordion; every scroller, well, letterbox and teleporting disclosure is that compression paying out. |
| **Producer boundary crossed at the seat** | D2-04, D2-05, D2-07, D2-10 | The seat overrides, hides or works around glass-ui geometry (`shape="cell"` radius, preset rail, pressed wash, scroll-port focus) instead of asking the producer for the variant. |
| **Token / role discipline** | D2-06, D2-11, D2-13 | Sizes off the ladder, three roles rendered identically, a datum colouring a boolean state, an export literal chosen for internal identity. |
| **Physical-property / bidi assumptions** | D2-08 | `border-left` / `padding-left` and a bidi-sensitive ordinal string encode LTR into a canon with an explicit RTL column. |
| **Derivation that does not derive** | D2-15 | `fn(0.5)` cannot be an identity: symmetric curves collide and step curves return an endpoint. |

---

## 7. Relation to round 1 (`challenge-D-design.md`)

**New in round 2 — not present in round 1 in any form:**

| id | why it matters |
|---|---|
| D2-01 | BLOCKER. Route destruction from three shipped specimens and from ordinary handle-dragging, silent. Round 1's BLOCKER was a focus-ring gap. |
| D2-02 | The `/easing` route/chassis ruling (`OPTICAL-BENCH §31/45/79`, `PR-09`) and the 166.7 px vs 19–22 rem measurement. |
| D2-03 | `svg[role="img"]` never matches in glass-ui 7 → the whole zero-letterbox law is dead CSS; 59.3 % letterbox measured. |
| D2-04 | A second selection control (`PRESET / "Pick a curve"`) contradicting the pressed tile. |
| D2-05 | `border-radius: 9999px` on a "cell" chip; 6.56 px measured label overhang; the producer recipe overridden property-by-property. |
| D2-07 | Pressed vs unpressed tiles are byte-identical in background and box-shadow. |
| D2-08(b) | The family divider lands on the wrong edge in RTL, with rendered rects. |
| D2-10 | Two focus registers; the tabbable `FadingScroll` port has no role and no name. |
| D2-11 | `--motion-accent` paints the copy tick and the tune-on state — 21 measured values for one boolean. |
| D2-15 | `fn(0.5)` collides across five specimens and returns an endpoint colour for the step curves. |

**Confirmed from round 1 with harder measurement:** the RTL label inversion (r1 D-03 → D2-08a); the
70.6 % / 79.9 % hidden catalogue (r1 D-02 → D2-09, plus the 28-of-52 tab-stop count); the
three-roles-one-treatment finding (r1 D-08 → D2-06, plus the off-ladder 9 px); the boundary stack
(r1 D-07 → D2-02/D2-12, plus the identical-well colours); the chevron-animates/panel-does-not finding
(r1 D-12 → D2-14, plus the always-mounted picker); the two-disclosure burial (r1 D-15 → D2-02).

**Not re-litigated here** (round 1 owns them and I did not re-measure): r1 D-01 collapsed-row focus
paint, D-04 literal truncation at 1512 px, D-05 hand-rolled Collapsible vs the glass-ui primitive,
D-09 array-position identity, D-10 silent copy failure, D-13 dot-pair physical margin, D-14 rail seat
== visible chrome, D-16 the adjacent section heading. None of my probes contradicted any of them.

---

## 8. Strongest defect

**D2-01.** Pressing any of three tiles the component itself renders, or dragging the control point the
component itself discloses, silently destroys the whole `/gradient` route — no page error, no console
error, no message, just an empty atmosphere and a `Try again` pill. Three of twenty-seven specimens
(11 % of the catalogue) and an unbounded share of the authoring space are landmines, and the strip's
CSS goes out of its way to *show* the overshoot that kills it. Everything else in this report is about
how the surface looks; D2-01 is about the surface ceasing to exist.

**D2-02** is the deeper cause and the one the tranche must actually schedule: register row `PR-09`
(**ENLARGE**, owner W27) is still open, and until Easing takes its own route and chassis, D2-03,
D2-09, D2-12 and D2-14 have nowhere to go.
