# CHALLENGE-C — `EasingSpecimenStrip.vue` · implementation · **pass 2 (r2)**

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context tier this seat
was explicitly spawned with. Declared, not inherited.

---

## Scope, substrate, and what is new in this pass

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216 lines) |
| **Own data/composables** | `easing/easingCatalogue.ts` (231) · `easing/useSpecimenRows.ts` (74) |
| **Corpus (the easing configurator)** | `GradientVisualizer/GradientEasingEditor.vue` (295) · `easing/EasingAuthoringStage.vue` (117) |
| **Host route** | `/#/gradient` → *Easing* bench → open interval row |
| **Producer edges** | `@mkbabb/glass-ui@7.0.0` — `fading-scroll`, `chip`, `easing` (`EasingPicker`) |
| **Library edges** | `@mkbabb/value.js/easing` — `bezierPresets`, `CubicBezier`, `steppedEase` |
| **HEAD at this pass** | `80fc5c40` on `tranche-u` (brief cited `c654824e`; branch has moved 4 commits — **no easing-corpus file changed**: `git log --oneline -5 -- .../easing/` → `f2c8f565` (glass 7 adopt), `a61094e3`) |
| **Prior pass** | preserved verbatim at `challenge-C-implementation.pass-1-2026-07-27.md` |

**Pass-2 mandate.** Two things were added to the brief after pass 1: the new owner mark **MT-F030**
(`audit/visual/owner-marked/OM-4-easing-radius-incoherence.png` — *"too rounded in some areas, not
rounded enough in others"*, explicitly **ours**, distinct from the glass Chip residual), and the
instruction to **find every radius declaration in the easing corpus and judge the register**. This
pass does that, re-verifies every pass-1 finding against the moved HEAD, and adds four defects
pass 1 did not have — including a second live oracle failure with a *measured DOM-contract break*
under the glass 7 adopt.

Everything below is measured against the live dev server `http://localhost:9000`, the committed
Safari capture matrix, the shipped `node_modules/@mkbabb/glass-ui@7.0.0` tree, or a pasted command
run. Probes are committed beside this report:
`probe-C2-radius-census.mjs`, `probe-C2-catalogue-domain.mjs`, `probe-C2-steps-inert.mjs`,
`probe-C2-authoring-svg-contract.mjs`; the 3× device-scale capture is `easing-card-3x-r2.png`.

---

## VERDICT — **DEFECTIVE**

Sixteen findings. One **BLOCKER** survives from pass 1 and **still reproduces at `80fc5c40`**: three
of the twenty-seven tiles this strip paints and invites a press on destroy the entire Gradient
workbench on a single click. Six MAJORs, four of them new to this pass.

| id | sev | finding | new? |
|---|---|---|---|
| C-01 | **BLOCKER** | all 3 `back` tiles tear down the Gradient pane on one click | re-verified |
| C-02 | MAJOR | **MT-F030** — five radius registers in one card; the house radius scale is clobbered by a producer layer collision | **NEW** |
| C-03 | MAJOR | glass `Chip` cell recipe + pressed wash never paint — **FOLD-BANK ON GLASS (M3)** | re-verified + new measurements |
| C-04 | MAJOR | the in-plate tile carries the **floating** glass elevation (0 8px 24px) | **NEW** |
| C-05 | MAJOR | the corpus's zero-letterbox law is **dead code** — `svg[role='img']` matches nothing under glass 7; O-17 3/3 RED | **NEW** |
| C-06 | MAJOR | `FAMILY_ORDER` allow-list silently drops 6 of 30 library presets | re-verified |
| C-07 | MAJOR | the lit `steps` tile **misreports identity and is inert** — no way back to the default staircase | **NEW** |
| C-08 | MAJOR | 27-way single-select shipped as 27 toggles, behind a nameless roleless tab stop | re-verified |
| C-09 | MINOR | WCAG 2.5.3 Label in Name (`steps` / `n = 4`) | re-verified |
| C-10 | MINOR | per-instance override of the producer cell recipe (edict 5) | re-verified |
| C-11 | MINOR | one 27-Chip strip mounted per interval, forever | re-verified |
| C-12 | MINOR | vacuous unit gate; both live oracles RED | re-verified, run pasted |
| C-13 | INFO | `.specimen-strip` is a dead class hook — zero rules in the repo | **NEW** |
| C-14 | INFO | exported minters have no arity/domain guard | re-verified |
| C-15 | INFO | watch getter allocates a fresh tuple each evaluation | re-verified |
| C-16 | INFO | keep-in-view selection arm — pass-1's flake **did not reproduce** (3/3 green); mechanism remains a hypothesis | **corrected** |

---

## C-01 · BLOCKER — the whole `back` family bricks the Gradient pane on one press

### Re-verified live at `80fc5c40` (`probe-C2-radius-census.mjs`, section E)

```
=== E. BACK-FAMILY CRASH ===
[ { "id": "ease-out-circ",     "stripAlive": true,  "boundary": null },
  { "id": "ease-in-back",      "stripAlive": false,
    "boundary": "This panel hit an unexpected error. Gradient color mix failed: color_progress_out_of_range Try again" },
  { "id": "ease-out-back",     "stripAlive": false, "boundary": "…color_progress_out_of_range…" },
  { "id": "ease-in-out-back",  "stripAlive": false, "boundary": "…color_progress_out_of_range…" } ]
```

One click on any of the three `back` tiles replaces the whole workbench — gradient rail, stop
editor, easing bench, CSS output — with the error boundary. `ease-out-circ` immediately before it is
clean, so the tile press path itself is fine; the curve is the poison.

### The domain, measured through each tile's own shipped payload

`probe-C2-catalogue-domain.mjs` samples `tile.payload().fn` at 65 points over `[0,1]`, in-page,
through the module the component actually imports:

```
"outOfRange": [
 { "id": "ease-in-back",     "lo": -0.0969, "hi": 1      },
 { "id": "ease-out-back",    "lo": 0,       "hi": 1.0868 },
 { "id": "ease-in-out-back", "lo": -0.0926, "hi": 1.0927 } ]
```

Exactly three of twenty-seven leave `[0,1]`. The chain, unchanged from pass 1 and re-read at this
HEAD:

- `src/color/operations.ts:65` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" })`. **The library is correct**: it returns a `Result`; it does not throw.
- `demo/workbenches/gradient/composables/useGradientInterpolation.ts:37` — `if (!mixed.ok) throw new Error(...)`. The demo seam demotes a `Result` into an uncaught throw.
- `demo/workbenches/gradient/composables/useGradientCSS.ts:207` — the same throw on the ramp-sampler path.
- `easing/useSpecimenRows.ts:53-59` — the row's own ink is `interpolateStopColors(s0, s1, fn(0.5), …)` **inside a `computed`**, so the throw escapes during render and the boundary eats the pane.
- `easingCatalogue.ts:176-190` — `buildFamilies()` mints a tile for every `bezierPresets` key, `back` included, with no domain check.

The strip is not a bystander. Its stylesheet is written *for* these curves:

```css
/* EasingSpecimenStrip.vue:172-179 */
/* … overshoot curves (the back family) draw past the box — visible, never clipped … */
.tile-glyph { … overflow: visible; }
```

It knows the family overshoots, renders headroom so the portrait reads, and offers a control its own
host cannot survive.

**Mechanism (family).** *Domain contract violated across a module boundary, with a `Result`→`throw`
demotion at the seam.* The catalogue's codomain is ℝ; the gradient sampler's domain is `[0,1]`;
nothing reconciles them, and the one component that reported it politely is discarded.

**Cure — architectural.** A CSS gradient interval physically cannot produce a color outside its two
endpoints, so an overshooting timing function *means* "hold at the endpoint". Make the progress type
total: introduce the `[0,1]` clamp **once**, where an eased `t` becomes a mix progress
(`useGradientCSS.easingFnOf`'s return, or a `rampProgress(fn, t)` beside it), so `useSpecimenRows`,
`serializeIntervalRamp` and `serializeCoalescedGradient` all inherit it; then delete both `throw`
sites — with a total domain they are unreachable, and an unreachable throw in a render path is a
liability. Deleting the `back` family instead is strictly worse: the producer's own picker still
offers those curves (C-06), and it contradicts the strip's overshoot-headroom design.

---

## C-02 · MAJOR — **MT-F030**: five radius registers in one card, and the house radius scale is silently clobbered

The owner's mark: *"the easing configurator mixes four unrelated corner radii … too rounded in some
areas, not rounded enough in others."* Here is the complete corpus census, by declaration and by
measurement.

### (a) Every radius declaration in the easing corpus

```
$ grep -rn "border-radius|rounded-|radius" demo/workbenches/gradient/GradientVisualizer/
GradientEasingEditor.vue:114   class="rounded-card border border-card-edge overflow-hidden"   ← the interval card
GradientEasingEditor.vue:153   class="h-5 rounded-md border border-card-edge"                 ← the live ramp strip
GradientEasingEditor.vue:176   class="readout-rail … rounded-md bg-well px-2 py-1"            ← the literal/code row
GradientEasingEditor.vue:242       border-radius: 9999px;                                     ← .specimen-dot
GradientEasingEditor.vue:274       border-radius: var(--radius-input);                        ← .rail-btn (copy / tune)
EasingSpecimenStrip.vue        (none — the tile inherits the producer Chip's)
EasingAuthoringStage.vue       (none — :deep(.glass-card) keeps the producer's rounded-card)
```

### (b) What those declarations actually paint — measured (`probe-C2-radius-census.mjs`, section A)

| element | declaration | **computed** | box |
|---|---|---|---|
| interval card | `rounded-card` → `--radius-card` | **16px** | 462 × 197 |
| live ramp strip | `rounded-md` | **6px** | 436 × 20 |
| readout rail (code row) | `rounded-md` | **6px** | 436 × 32 |
| rail buttons (copy / tune) | `var(--radius-input)` | **4px** | 24 × 24 |
| endpoint dots | `9999px` | **9999px** | 10 × 10 |
| **specimen tile** | producer `shape="cell"` | **9999px** (→ ellipse 45.2 × 43.8) | see C-03 |
| authoring `.glass-card` (disclosed) | producer `rounded-card` | **16px** | 436 |
| picker control surfaces (disclosed) | producer `glass-capsule` | **9999px** | — |

**Five distinct registers — 4 / 6 / 16 / 9999 px — inside one 197 px-tall card**, and the extremes
sit adjacent: a 24 px near-**square** ghost button four pixels from a 436 px 6 px-radius rail, three
pixels below a row of 44 px **full circles**. That is precisely the owner's sentence, in numbers.

### (c) The mechanism nobody had found: a producer **cascade-layer token collision**

`--radius-input` is *supposed* to be 10px. It renders 4px. Measured `:root` values on the live page:

```
"--radius": "0.25rem",   ← glass theme/radius.css declares 0.625rem
"--radius-lg": "0.5rem", ← glass theme/radius.css declares var(--radius)
"--radius-sm": "0.25rem",
"--radius-md": "6px", "--radius-xl": "12px", "--radius-2xl": "1rem",
"--radius-card": "1rem", "--radius-input": "0.25rem", "--radius-strip": "0.75rem",
"--radius-pill": "9999px", "--radius-control": "9999px"
```

Source of truth vs. what wins:

```
$ head -c 300 node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css
@theme { --radius: 0.625rem; --radius-xs: 4px; --radius-sm: 4px; --radius-md: 6px; --radius-xl: 12px;
         --radius-2xl: 1rem; … --radius-lg: var(--radius); --radius-card: var(--radius-2xl); … }

$ grep -o -- "--radius: *[^;]*" node_modules/@mkbabb/glass-ui/dist/styles/components.css
--radius: 0.25rem      (inside a bare `:root { … --radius: 0.25rem; --radius-lg: 0.5rem; --radius-sm: 0.25rem; … }`)

$ head -c 60 node_modules/@mkbabb/glass-ui/dist/styles/index.css
@layer theme, base, components, utilities;
$ tail of the same file
@import "./components.css" layer(components);
```

`theme/radius.css`'s `@theme` block compiles into the **`theme`** layer; `components.css` — the
compiled Tailwind bundle — re-emits **Tailwind's stock defaults** at `:root` inside the
**`components`** layer. `components` outranks `theme`, so glass 7.0.0's own semantic radius ladder is
overwritten by the generic scale it was built to replace. Every consumer rung that resolves through
`var(--radius)` silently downshifts:

| token | glass intends | actually resolves | affected here |
|---|---|---|---|
| `--radius` | 0.625rem (10px) | **0.25rem (4px)** | `.rail-btn` |
| `--radius-input` = `var(--radius)` | 10px | **4px** | `.rail-btn` |
| `--radius-lg` = `var(--radius)` | 10px | **0.5rem (8px)** | `GradientCodeEditor.vue:93` (`rounded-lg`) |
| `--radius-button`, `--radius-tooltip` | 10px | **4px / 8px** | app-wide |

This is a **producer** defect and a large blast radius (every `rounded-input`/`rounded`/`rounded-lg`
in the demo). It is *also* the literal mechanism behind half of the owner's mark: the copy and tune
buttons are near-square because a token two packages away got clobbered.

### (d) What is ours, even after glass is fixed

1. **Register inversion.** `.rail-btn` (`GradientEasingEditor.vue:274`) selects `--radius-input` — the
   **field** rung — for a 24 × 24 **ghost icon button**. Glass's own idiom for an icon-shaped control
   is the pill rung: `.glass-chip--icon, .glass-chip--icon.glass-capsule { border-radius: var(--radius-pill) }`
   (`dist/styles/glass/glass-chip.css`), and `--radius-control: 9999px`. Measured comparison of the
   three small icon buttons live on `/#/gradient`:

   ```
   dock-icon-button …            r=9999px  40×40   "Save edit"
   action-button-wrapper …       r=4px     32×32   "Reset"
   rail-btn shrink-0             r=4px     24×24   "Copy cubic-bezier(0, 0, 1, 1)"
   ```

   The dock — the house's own control surface — is pill. The easing rail is square. Same page.

2. **No declared ladder.** The corpus picks `rounded-card`, `rounded-md`, `rounded-md`,
   `var(--radius-input)`, `9999px` at five call sites with no stated rule relating them. Glass ships
   the rungs a strip like this wants and the corpus uses **none** of them: `--radius-strip: 0.75rem`
   (12px), `--radius-field`, `--radius-control`. The `9999px` literal at `GradientEasingEditor.vue:242`
   is a magic number where `var(--radius-pill)` exists (compare `GradientStopEditor.vue:318`, which
   *does* write `var(--radius-pill, 9999px)` — the corpus contradicts itself two files apart).

3. **The tile radius is not merely "glass's fault".** When glass lands the orphaned sheet (C-03), the
   tile becomes `--radius-card` = **16px on a 44px box** — 36 % of the box, the same rung as the 462px
   card that contains it. A radius ladder in which a 44px cell and a 462px card share a rung is not a
   ladder. Judged against the concentric law (inner ≈ outer − padding: 16 − 12 = 4px at this nesting),
   the correct rung for the in-card children is the 4–6px band the ramp and rail already occupy, and
   the tile should join it — not the card rung, and certainly not the pill.

### Reproduction

`node probe-C2-radius-census.mjs` (section A + the icon-button block in `probe-c2-c`), against
`http://localhost:9000/#/gradient` with easing row 1 open. Visual witness: `easing-card-3x-r2.png`
(this pass, 3× device scale) and the owner's `OM-4-easing-radius-incoherence.png`.

### Disposition

- **(c) the layer collision → FOLD-BANK ON GLASS.** New mark, relayed on the glass **BH** inbox
  alongside M3. The cure is in the producer's build: emit the Tailwind theme defaults *into the
  `theme` layer*, or drop the stock `--radius*` keys from `components.css`. **Do not** re-declare
  `--radius: 0.625rem` in `demo/styles/` — that is a consumer patching a producer's cascade, i.e. the
  masking fallback MT-F014 and standing edict 2 forbid.
- **(d) ours → one declared ladder for the corpus**, authored as tokens, not per-call-site literals:
  card rung `--radius-card` for the interval card; **one** in-card rung (`--radius-md`) for ramp,
  rail, **and tile**; `--radius-pill` for round things that are genuinely round (the 10px endpoint
  dots) and for the ghost icon controls, matching the dock. Five registers → three, each named.

---

## C-03 · MAJOR — the glass `Chip` cell recipe and pressed wash never paint · **FOLD-BANK ON GLASS**

The known residual (INBOX **I-9**, **D58**, our mark **M3** — a glass **BJ born-RED** row). Re-proven
at this HEAD, with the visual reading the brief asked for.

### The orphan, in the shipped package

```
$ grep -c "glass-chip" node_modules/@mkbabb/glass-ui/dist/styles/glass.css
0
$ grep -rn "glass-chip.css" node_modules/@mkbabb/glass-ui/dist/
(no output — NOTHING imports it)
```

`dist/styles/glass/glass-chip.css` exists and contains the whole recipe — `.glass-chip--cell{border-radius:var(--radius-card)}`,
`.glass-chip[data-mode="selectable"][data-state="on"]{background-color:var(--accent-band);border-color:var(--accent-edge);color:var(--accent-ink)}`,
the `::after` accent flood, and `@media (pointer:coarse){.glass-chip--interactive{min-inline-size:var(--touch-target);min-block-size:var(--touch-target)}}`
— and **no entry point imports it**. Confirmed at runtime: `chipCssPresent: false` (no live
stylesheet contains `glass-chip--cell`).

### What that costs this component, measured

| symptom | measured |
|---|---|
| the class **is** emitted | tile class list contains `glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro` |
| cell radius | `9999px` — `glass-capsule` wins; the cell rule never lands |
| box | 45.2 × 43.8 → an **ellipse** |
| pressed wash | `data-state="on"` bg `oklab(0.925644 0.0094459 0.0291917/0.83872)`, border `rgb(198,180,159)` — **byte-identical** to `data-state="off"` |
| coarse-pointer floor | never lands (`min-block-size` unset) |
| label outside the painted chip | **11 of 27**; e.g. `linear` label 33.2 px against a **26.1 px** chord at the label's bottom edge = **7.2 px** of glyph outside the paint (9 tiles at 7.2, 2 at 2.4) |

### What the Safari captures show, exactly

`shots/safari-desktop-light/gradient.png` and `…-dark/gradient.png`, *Easing* section (I read both):

The eight visible specimen tiles are **cream coins** — flat circles, not the rounded rectangular
cells the code asks for. Each carries its sparkline in the upper half and a mono variant label
across the lower third; because a circle narrows fast below its equator, the wide labels (`linear`,
`in-out` ×2 visible, and 8 more off-port) **break the painted edge and float on the bare card
ground**, reading as loose captions dropped between coins rather than as tile text. The selected
tile (`linear`) has **no pressed fill and no pressed border** — against twenty-six identical
neighbours it is distinguished *only* by a teal glyph stroke and a bold teal label; at the capture's
scale the selection is legible only if you already know what to look for. The sparkline is inscribed
in a square, so the circle crops its corners: `linear`'s diagonal appears to exit its own chip at
top-right and bottom-left. **Both schemes, both viewports, identically** — the dark capture shows the
same coins in dark brown with the same absent pressed state. The right-most tile is additionally cut
by the FadingScroll mask (`linear-gradient(to right, transparent 0, black 0, black calc(100% - 16px), transparent 100%)`),
so the row ends in a half-coin with no affordance that 70 % of the catalogue lies beyond it.

### Disposition — **FOLD-BANK ON GLASS. NO LOCAL PATCH.**

One line in the producer: `@import "./glass/glass-chip.css";` in `dist/styles/glass.css`. Relay on
the glass **BH** inbox against mark **M3**. A local `.specimen-tile { border-radius: … }` would
re-implement producer CSS in a consumer to hide a producer defect — **precisely the masking fallback
MT-F014 and edict 2 forbid** — and would survive the glass fix as a dead per-instance override.

---

## C-04 · MAJOR (NEW) — the in-plate tile carries the **floating** glass elevation

The host declares its own depth register in prose, at `GradientEasingEditor.vue:108-110`:

> *"Z2 in-plate specimen rows: **flat on the plate**, `--card-edge` hairline, **no shadow** (DESIGN.md § Depth)"*

Measured on the live tile (`probe-C2-catalogue-domain.mjs`, section 1):

```
tileBoxShadow : rgba(255,255,255,0.3) 0 1px 0 inset, rgba(255,255,255,0.18) -1px 0 0 inset,
                color(srgb 0.11 0.098 0.09/0.06) 0 -1px 0 inset, color(srgb 0.11 0.098 0.09/0.04) 1px 0 0 inset,
                color(srgb 0.11 0.098 0.09/0.14) 0px 8px 24px 0px,        ← a FLOATING drop shadow
                color(srgb 0.11 0.098 0.09/0.05) 0 0 0 0.5px, rgba(255,255,255,0.25) 0 0.5px 0 inset
cardBoxShadow : none          ← the containing card obeys the flat rule
railBtnShadow : none
rampShadow    : none
```

Every sibling in the card is flat; the twenty-seven tiles are not. The source is
`glass-capsule` — `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating)`
(`dist/styles/glass/glass-capsule.css`) — which `Chip` composes unconditionally, including under
`shape="cell"` (glass's own cell rules override only the *radius*: `.glass-chip--cell.glass-capsule{border-radius:var(--radius-card)}`).

**Visible consequence.** Twenty-seven adjacent floating coins, 4px apart within a family, merge their
rims and 24px shadows into a continuous soft band that breaks at the family dividers — clearly
present in `easing-card-3x-r2.png` behind the `css` group and again behind `sine`. What reads as
"the strip has a background well" is not a well at all: a DOM walk of every element under
`.specimen-strip` finds **no** element with a background other than the chips themselves
(`bg: rgba(0,0,0,0)` on `.fading-scroll`, `.strip-row`, `.strip-family`, `.family-tiles`; hit test
between two chips returns `DIV.family-tiles → DIV.strip-family → DIV.strip-row → DIV.fading-scroll`,
all transparent). The band is an artifact of stacked elevation.

**Mechanism (family).** *Elevation register imported with the component.* The seat chose a
**floating** producer primitive for an **in-plate** fixture; the producer offers no flat rung, so the
depth law the host states in its own docblock is contradicted by its children. Same family as owner
marks **OM-1** (dock item shadows) and **OM-7** (capsule button shadows).

**Disposition — glass request, not a local override.** Ask for an elevation rung on `Chip`
(`elevation="flat"` / an in-plate variant that drops `glass-shadow-floating`), relayed on the BH
inbox with M3. A local `.specimen-tile { box-shadow: none }` is an edict-5 per-instance override of
producer chrome and must not be written.

---

## C-05 · MAJOR (NEW) — the corpus's zero-letterbox law is **dead code**: `svg[role='img']` matches nothing under glass 7

`EasingAuthoringStage.vue` — the strip's sibling inside the same open row — is built on one DOM
contract, stated three times in its docblock and enforced in two places:

```ts
// EasingAuthoringStage.vue:48-50
const vb = rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal;
```
```css
/* EasingAuthoringStage.vue:104-115 — "Law 3 — zero letterbox" */
.easing-authoring :deep(svg[role="img"]) {
    inline-size: min(100%, 19rem);
    block-size: auto !important;
    aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
    transition: aspect-ratio var(--duration-normal) var(--ease-standard);
}
```

Measured with the stage disclosed (`probe-C2-authoring-svg-contract.mjs`):

```
{ "svgs": [ { "role": "group",           ← the picker canvas, NOT role="img"
              "cls": "block w-full touch-none select-none",
              "viewBox": "0 -0.1 1 1.2000000000000002",
              "aria": "Easing curve 1 → 2",
              "w": 410, "h": 200,
              "blockSize": "200px", "inlineSize": "410px", "aspect": "1 / 1" },
            { "role": null, "cls": "lucide lucide-chevron-down-icon", … } ],
  "matchRoleImg": 0,          ← the selector the whole law rests on matches ZERO elements
  "vbRatioVar": "1.2",        ← frozen at its initial default, forever
  "picker": true, "pickerGridCols": "436px", "glassCards": 1 }
```

Three consequences, all live:

1. `syncVbRatio()` can never assign — `onMounted(syncVbRatio)`, the `watch(() => value.css)` and the
   `requestAnimationFrame(syncVbRatio)` in `onAuthored` are **dead code** that runs on every
   authoring emission and does nothing.
2. The scoped Law-3 block matches nothing, so the producer's own sizing survives: the canvas is
   **410 × 200** for a viewBox of ratio 1.2 → the drawn plot is letterboxed inside its box. **O-17
   "zero letterbox" is violated in the product**, not merely untested.
3. The declared "liquid morph" `transition: aspect-ratio` never applies.

Note Law 1 *does* still apply (`pickerGridCols: "436px"` = the one-column override landing) and
Law 2 does (`glassCards: 1`, restyled) — so this is a **selective** contract break: the glass 7.0.0
adopt (`f2c8f565`) changed the picker canvas's role from `img` to `group` and exactly the
role-keyed law died, silently, with the other two still green.

And the oracle that exists to catch it is red **for the same reason** — its own locator is keyed to
the same dead selector (`e2e/…/o17-easing-composition.spec.ts:51`). Full run at this HEAD in C-12.

**Mechanism (family).** *A cross-package DOM contract keyed to an ARIA role, with no test that
asserts the selector resolves.* When the producer's semantics improved (an interactive canvas is
correctly `role="group"`, not `role="img"`), the consumer's law evaporated and every gate that
could have said so was keyed to the same string.

**Cure.** Stop keying layout law to an ARIA role. The producer exposes a stable hook —
`[data-testid="easing-picker"]` is already used by Law 1 in the same file — so scope Law 3 to
`:deep([data-testid="easing-picker"] svg)` (or ask glass for a `data-part="canvas"`), and add the
one assertion that would have caught it: the sync must fail loudly when the selector resolves to
nothing, rather than silently keeping `1.2`.

---

## C-06 · MAJOR — six of the thirty library presets are silently deleted; authoring one names it `custom`

`easingCatalogue.ts:174,191`:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…);
```

That is an **allow-list**, not an order. Measured in-page against the live module:

```
count: 27      hasQuart: false      hasQuint: false
families: ["css:5","sine:3","quad:3","cubic:4","expo:3","circ:3","back:3","steps:3"]

bezierLiteral([0.895,0.03,0.685,0.22]) → "cubic-bezier(0.895, 0.03, 0.685, 0.22)"   (byte-correct)
tileIdFor      ({css: <that>})          → null
specimenNameFor({css: <that>})          → "custom"
```

`src/easing.ts` ships thirty presets including `ease-{in,out,in-out}-{quart,quint}`;
`familyLabelFor` files them under `quart`/`quint`; neither name is in `FAMILY_ORDER`; six tiles
vanish with no error. The module docblock asserts the opposite contract (`easingCatalogue.ts:15-17`:
*"the tile catalogue IS value.js `bezierPresets` + the steps family — the SAME catalogue the glass-ui
`<EasingPicker>`'s preset menu speaks (never a second mint)"*). It is a second mint — and the picker
really does speak all thirty, so a user who authors `ease-in-quart` from the picker's preset menu
gets a byte-correct literal that the head then labels **`custom`** and the strip shows unpressed.

**Mechanism (family).** *Enumeration expressed as an allow-list rather than a sort key* — a closed set
standing in for an open one; upstream growth silently shrinks the product.

**Cure.** `FAMILY_ORDER` becomes a rank, never a filter:

```ts
const rank = (f: string) => { const i = FAMILY_ORDER.indexOf(f); return i < 0 ? FAMILY_ORDER.length : i; };
return [...byFamily.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
    .map((family) => ({ family, tiles: byFamily.get(family)! }));
```

`familyLabelFor`'s `/^ease-(in-out|in|out)-(.+)$/` is already general and needs no edit.

---

## C-07 · MAJOR (NEW) — the lit `steps` tile misreports its identity and is **inert**

`tileIdFor` (`easingCatalogue.ts:219-223`) falls back to the generic `steps` tile for *any* steps
interval:

```ts
const exact = SPECIMEN_TILES.find((t) => t.css === interval.css);
if (exact) return exact.id;
return isStepsInterval(interval) ? "steps" : null;
```

But that tile's own literal is fixed: `stepsTile("steps", "n = 4", 4, "jump-end")` → `steps(4, jump-end)`.
Meanwhile the strip's press handler is a one-way gate (`EasingSpecimenStrip.vue:33-35`):

```ts
function onTileToggle(tile: SpecimenTile, on: boolean) { if (on) emit("select", tile); }
```

and the Chip is a reka `Toggle`, so pressing an already-pressed tile emits `on = false` → **no
emission at all**.

### Live reproduction (`probe-C2-steps-inert.mjs`, pasted verbatim)

```
after steps tile: steps(4, jump-end) [ 'steps' ]
=== AUTHORING CONTROLS ===
 [ { tag:"span",   role:"slider",   label:"Step count", value:"4" },
   { tag:"button", role:"combobox", label:"Jump term" } ]
=== BUMP === { ok:true, tag:"SPAN", role:"slider", now:"7" }        ← 3× ArrowRight on Step count
after bump — readout: steps(7, jump-end)  pressed: [ 'steps' ]      ← the tile still reads PRESSED
after pressing the lit `steps` tile — readout: steps(7, jump-end)  pressed: [ 'steps' ]   ← NOTHING HAPPENS
```

Module-level confirmation from the same page:

```
departedSteps: "steps"   departedStepsName: "steps"   stepsTileCss: "steps(4, jump-end)"
    for interval { mode:"steps", css:"steps(7, jump-both)" }
```

Two defects in one control:

1. **The pressed state lies.** A tile whose literal is `steps(4, jump-end)` renders pressed while the
   row's own readout — three pixels below it — says `steps(7, jump-end)`. The strip's stated law is
   *"pressed tile IS the interval's curve"* (`EasingSpecimenStrip.vue:7-8`); here it is not.
2. **The control is dead.** Because the tile is already `on`, the user has **no path back** to the
   default staircase through the selection surface: the one control that names `steps(4, jump-end)`
   refuses to emit it. Every *other* tile is reachable; this one is reachable only by leaving steps
   mode and returning.

(The docblock at `:30-32` anticipates the no-op — *"pressing the pressed tile again is a no-op … an
interval always has a curve"* — but that reasoning holds only when *pressed ⇒ identical*. The
`steps` fallback breaks that premise and the no-op becomes a trap.)

**Mechanism (family).** *A many-to-one identity function feeding a one-way toggle.* `tileIdFor` is
surjective onto tile ids (many steps intervals → one tile), while the press handler assumes it is
injective.

**Cure.** Make the selection idempotent instead of one-way: emit on press regardless of `on`
(`function onTileToggle(tile) { emit("select", tile) }` with the Chip's model-value still controlled),
so pressing a lit tile re-asserts its literal — the natural radio semantics this control already
wants (C-08). That single change makes the family tile a *reset to the family default*, which is the
kf law's actual intent, and costs one boolean.

---

## C-08 · MAJOR — a 27-way single-select shipped as 27 toggles, behind a nameless roleless tab stop

Measured on the open row:

```
portTabindex: "0"   portRole: null   portLabel: null
focusableCount (inside the strip): 27
chip role: null     chip aria-pressed: "true"/"false"
group label: "Easing curve specimens"   (on .strip-row — present, correct)
scrollWidth 1482 / clientWidth 436      → 70.6 % of the catalogue is off-port
```

**(a) Wrong widget semantics.** `mode="selectable"` renders a reka `Toggle` → a bare
`<button aria-pressed>`. The component's own contract (`:30-32`) is *single-select, owner-controlled,
an interval always has a curve* — that is a **radio group**. A screen-reader user hears "linear,
toggle button, pressed" with nothing indicating the twenty-six siblings are mutually exclusive, and
the family eyebrows that the docblock calls the strip's information architecture are
`aria-hidden="true"` (`:96`) — the IA is entirely invisible to assistive tech.

**(b) An unnamed, roleless tab stop.** `FadingScroll` hardcodes `tabindex="0"` on its root and emits
`role="region"` **only** when given a name. The producer prop exists and is documented:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/fading-scroll/FadingScroll.vue.d.ts
/** Name the scroll port and expose it as a region. */
ariaLabel?: string;
```

The component passes neither `ariaLabel` nor `ariaLabelledby` (`:84`), putting the label on the inner
`div.strip-row` instead. A focusable `<div>` with no role and no name therefore sits in the tab order
ahead of 27 tiles. The visual REPORT's `namelessButtons` probe filters `button,[role="button"]`, so
**this focusable is invisible to the audit matrix by construction**.

Twenty-eight keystrokes to traverse one interval row; no roving tabindex, no arrow keys.

**Cure.** Pass `:aria-label="'Easing curve specimens'"` to `<FadingScroll>` — the producer prop
exists, use it — and move selection to radio semantics (reka `RadioGroup` gives roving tabindex,
arrow keys, `aria-checked` and the 1-of-N announcement). If glass has no Chip radio rung, that is a
glass request, not a demo hand-roll.

---

## C-09 · MINOR — WCAG 2.5.3 Label in Name

One violation across 27 tiles: `:aria-label="tile.id"` (`:105`) is `"steps"` while the visible label
(`easingCatalogue.ts:187`) is `"n = 4"`. A speech-input user saying "click n equals four" cannot
activate it. Every other tile's id happens to contain its visible label as a substring.

**Cure.** Build the accessible name from the visible label rather than a parallel string — e.g.
`` `${fam.family} ${tile.label}` `` — which also repairs the AT-invisible family grouping (C-08a) in
the same stroke.

---

## C-10 · MINOR — the component overrides the producer's cell recipe per-instance (edict 5)

```css
/* EasingSpecimenStrip.vue:163-170 */
.specimen-tile {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.125rem;
    padding: 0.3125rem 0.375rem 0.25rem;   /* overrides the Chip cell's px-2 py-2.5 */
    min-width: 2.75rem;
}
```

The producer's `shape="cell"` already emits `flex-col gap-1.5 px-2 py-2.5 text-micro` (verified in the
live class list, C-03). The seat re-declares `display`, `flex-direction`, `gap` and `padding` on the
**producer's root element**, from the consumer — edict 5 violated four times in eight lines.

It is causally load-bearing: the local padding + `min-width: 2.75rem` are what square the box
(45.2 × 43.8 measured), which is what turns the orphaned 9999px into a **circle** rather than a
stadium — so this override materially worsens C-03's damage. `min-width` is set but `min-height` is
not, so nothing local backstops the missing coarse-pointer floor either.

**Cure.** Specimen density is a *Chip size*, not a demo override: ask glass for a `size="xs"` rung
(or a `--chip-cell-density` token on `shape="cell"`), relay it on the BH inbox alongside M3, and
delete all four declarations. One producer change serves this strip, the keyframes gallery it was
transposed from, and every future micro-cell seat.

---

## C-11 · MINOR — one full 27-Chip strip is mounted per interval, forever

`GradientEasingEditor.vue:161` places `<EasingSpecimenStrip>` inside `v-for="row in specimenRows"`,
and both the panel (`:144`) and the accordion are `v-show`, never `v-if`. With the default two-stop
gradient: **1 strip, 27 chips**. With *S* stops the DOM carries **(S−1) × 27** Chip components, of
which **(S−2) × 27 are permanently invisible** — a five-stop gradient mounts 108 Chips and 108 SVG
paths to show 27. Each instance additionally owns a `useMediaQuery` matchMedia listener (`:47`), a
`FadingScroll` scroll listener + `ResizeObserver` + coalesced rAF, and a watcher. Nothing varies per
interval: `SPECIMEN_FAMILIES` is a module constant and the strip's only props are `selectedId` and
`visible`.

The component's own comment concedes the shape of it — *"sibling rows mount hidden twins of every
data-specimen id"* (`:40`): the querySelector scoping workaround exists **because** of the duplication.

**Cure.** The accordion has exactly one open row (`openInterval: ref<number|null>`). Hoist **one**
strip out of the `v-for`, render it for the open interval, and the twins, the `rowEl` scoping
workaround, the N listeners and the (S−2)×27 dead nodes disappear together.

---

## C-12 · MINOR — the unit gate is vacuous and **both** live oracles are RED

### Unit — run at this HEAD

```
$ npx vitest run test/gradient-v4-consume.test.ts --reporter=dot
 Test Files  1 passed (1)      Tests  3 passed (3)      Duration 1.11s
```

The entirety of this component's data coverage (`test/gradient-v4-consume.test.ts:55-58`):

```ts
it("builds every easing specimen from valid Result values", () => {
    expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
    expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
});
```

Green **today**, with six presets silently dropped (C-06) and three tiles that destroy the pane
(C-01). Named mutations that keep it green:

1. delete `"circ"` and `"expo"` from `FAMILY_ORDER` → 21 tiles, still `> 20`, no NaN. Six more curves
   vanish from the product; the suite says nothing.
2. change `glyphPath(fn, samples = 48)` to `samples = 1` → every portrait collapses to
   `"M 0.000 1.000 L 1.000 0.000"`; no `"NaN"`, count unchanged. Every sparkline in the gallery
   becomes the same straight line; the suite says nothing.
3. replace every `payload()` with the `linear` payload → ids, count and glyphs untouched; every tile
   selects `linear`. The suite says nothing.

There is **no** component test at all: no mount, no press, no assertion that `selectedId` maps to
`data-state="on"`, that a press emits, or that pressing a tile does not destroy its host.

### E2E — run at this HEAD, pasted

```
$ VJS_E2E_PORT=8191 VJS_E2E_PERF_PORT=8192 npx playwright test \
    e2e/smoke/oracles/o17-easing-composition.spec.ts --project=smoke --reporter=line
  3 failed
    [smoke] › …o17-easing-composition.spec.ts:102 › O-17 zero letterbox across curve regimes — desktop
    [smoke] › …o17-easing-composition.spec.ts:102 › O-17 zero letterbox across curve regimes — 390
    [smoke] › …o17-easing-composition.spec.ts:128 › O-17 composition: stamps, dot rest, one-literal, mint law

  Error: expect(locator).toBeVisible() failed
  Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
  Expected: visible      Timeout: 8000ms      Error: element(s) not found
      at discloseAuthoring (…/o17-easing-composition.spec.ts:52:23)
```

Pass 1 recorded the same 3/3 and attributed the failure to `discloseAuthoring`. **This pass explains
it**: the selector is dead (C-05), not the disclosure — my own probe disclosed the stage successfully
and found the canvas present with `role="group"`. So the oracle is not merely red; it is red on a
premise that no longer exists, and the two clauses it was written to guard (zero letterbox, and the
mint law that presses `[data-specimen='ease-out-back']` at `:117` and `:189` — the exact
pane-destroying tile of C-01) **never execute**.

**Cure.** Re-key O-17's locator off the dead role (C-05), then add the two invariants that cannot be
satisfied vacuously: *every tile in `SPECIMEN_TILES`, sampled over `[0,1]`, must round-trip through
`serializeIntervalRamp` without throwing*, and *`SPECIMEN_TILES` ids must equal
`Object.keys(bezierPresets)` ∪ the steps ids*. Both fail today; both would have caught C-01 and C-06
at authoring time.

---

## C-13 · INFO (NEW) — `.specimen-strip` is a dead class hook

```
$ grep -rn "specimen-strip" --include="*.vue" --include="*.css" --include="*.ts" demo/
demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:84:    <FadingScroll axis="x" class="specimen-strip">
```

One occurrence in the entire demo: the application. **No rule anywhere styles it** — the scoped block
(`:124-215`) never mentions it, and it appears in no global sheet. Confirmed at runtime: the
`.fading-scroll` root's computed `border-radius: 0px`, `background: rgba(0,0,0,0)`, `padding: 0px` —
every visual property is the producer's default.

Harmless as CSS, but it is a naming hook that reads as if the seat styles the port and does not; the
audit probes (including pass 1's) select on it, so it has acquired de-facto test-hook status without
a declared contract. Either give the port its actual seat law (it currently has none — see C-02's
"no declared ladder") or drop the class.

---

## C-14 · INFO — the exported minters carry no arity or domain guard

Measured by direct call against the live module (`probe-C2-catalogue-domain.mjs`):

```
bezierLiteral([0.1, 0.2])    → "cubic-bezier(0.1, 0.2, undefined, undefined)"
stepsLiteral(-3, "jump-end") → "steps(-3, jump-end)"
glyphPath(fn, 0)             → "M NaN NaN"
```

None is reachable from the shipped call sites (the catalogue always passes a 4-tuple, `n ∈ {1,4}` and
the default 48 samples), so this is INFO. But `bezierLiteral`'s signature is `readonly number[]`
(`easingCatalogue.ts:48`) rather than the 4-tuple its body assumes, and both functions are exported.

**Cure.** Type the arity — `bezierLiteral(quad: BezierPoints)`; the glass type is already imported at
`:32` — so the `undefined` case becomes a compile error rather than a runtime string.

---

## C-15 · INFO — the watch source allocates a fresh tuple every evaluation

```ts
watch(() => [selectedId, visible] as const, () => { … }, { immediate: true });   // :50-80
```

A getter returning a fresh array is never `Object.is`-equal to its predecessor, so Vue's `hasChanged`
gate is always `true`. Harmless today (the callback is idempotent and guards on
`!visible || selectedId === null`), but it defeats the change detection the getter is written to
express. **Cure:** the idiomatic multi-source form `watch([() => selectedId, () => visible], …)`,
which compares element-wise and costs nothing.

---

## C-16 · INFO — pass-1's keep-in-view flake **did not reproduce**; the race remains a hypothesis

Pass 1 filed C-07 (MINOR) on an intermittent selection-arm scroll. Three fresh-reload trials this
pass, pressing the last tile (`step-end`, ~1044 px off-port), `probe-C2-catalogue-domain.mjs` §3:

```
[ { before: 0, after: 1044, visible: true, readout: "steps(1, jump-end)" },
  { before: 0, after: 1044, visible: true, readout: "steps(1, jump-end)" },
  { before: 0, after: 1044, visible: true, readout: "steps(1, jump-end)" } ]
=== REVEAL ARM === { "scrollLeft": 1044, "visible": true }
```

**3/3 green on the selection arm, green on the reveal arm.** I could not reproduce the failure, and I
record the correction rather than inheriting it. The code-level hazard pass 1 identified is still
real as a *reading*: the watch is `flush: "pre"` and schedules its measurement with `nextTick`
(`:54`), so the measurement races the parent's patch for that tick, and a pre-layout read computes
`dx = 0` and silently skips (`:71`). That is a **hypothesis**, unreproduced. The cheap hardening is
still correct on its own terms: `{ flush: "post" }` on the watch and delete the `nextTick` wrapper —
one option added, one line removed, and the measurement always reads settled geometry.

---

## Negative proofs — what this component gets right

The premise says the implementation is defective. It is. An honest seat states what it verified and
**cleared**, because these are the hazards the brief named:

| checked | result |
|---|---|
| **PRM-RAF epidemic** (~40 constellation sites) | **CLEAN.** No `requestAnimationFrame` in the strip or its catalogue. The one rAF in the subtree is `FadingScroll`'s, coalesced (`u ||= requestAnimationFrame`) and cancelled on unmount. (The corpus's one rAF — `EasingAuthoringStage.vue:58,65` — is single-shot, not a loop; it is dead for a different reason, C-05.) |
| **`prefers-reduced-motion`** | **HONORED.** `:74` — `behavior: prefersReducedMotion.value ? "auto" : "smooth"`. |
| **The O-19 page-yank cure** | **HOLDS.** The `scrollIntoView` avoidance documented at `:40-46` is real and correct: `closest(".fading-scroll")` resolves against the producer's documented port (live chain `button.glass-chip → div.family-tiles → div.strip-family → div.strip-row → div.fading-scroll`), and the only scroll observed across a full press cycle is one `scrollBy` on that port. |
| **Tap targets (WCAG 2.5.8)** | **PASSES.** 44.0–45.2 × 43.8 px measured. The strip contributes **zero** rows to the REPORT's 6 `smallTapTargets` on `/#/gradient` — those are the slug `input` (160×23), three 22×22 slug buttons and two 20×20 gradient stops, none in this file. Identical on mobile (23×23 / 20×20 rows, none ours). |
| **Accessible names** | **27/27 present.** The REPORT's `namelessButtons: 1` on this route is not a tile; the one truly nameless focusable here is the FadingScroll `div` (C-08b), which the button-only probe cannot see. |
| **Page-level horizontal overflow** | **NONE.** `overflowX: 0` in all four Safari matrices. The 12 `bleeding` rows on `/#/gradient` are *all* this component (`div.strip-row`, `div.strip-family`, `span.family-eyebrow`, `div.family-tiles`, `button.glass-chip…`, `svg`, `path`, `span.tile-label`) — content inside its own `overflow-x` port (scrollWidth 1482 / clientWidth 436), not bleeding onto the page. Not a defect of this axis (it is a legibility question the D seat owns). |
| **Console + page errors** | **ZERO** on `/#/gradient` in all four Safari matrices (`consoleErrors: 0`, `pageErrors: 0`) — because the capture never presses a tile. The only console error on my live runs is the unrelated `dev is MISCONFIGURED … no VITE_API_URL` banner (owner mark OM-5, not ours). |
| **`verbatimModuleSyntax`** | **CLEAN.** `:11-16` — value imports plain, `import type { SpecimenTile }` correctly type-only; same throughout `easingCatalogue.ts:22-36` and `useSpecimenRows.ts:16-21`. |
| **Vue 3.5 idiom** | **CLEAN.** `useTemplateRef` (`:48`), reactive props destructure with a default (`:18`). |
| **`defineModel` stale-read hazard** | **N/A** — no `defineModel`; selection is a controlled `:model-value` + `@update:model-value` pair, the correct shape. Verified no desync: re-pressing a lit tile leaves `data-state="on"`, `aria-pressed="true"` and the readout unchanged (the Chip respects the controlled value; the defect is the missing emission, C-07 — not a state split). |
| **`ValueUnit` nesting / oklch→HSV `stableHue` / `parseCssColor` / WebGL** | **N/A** — this component touches none of them. |
| **God modules / legacy shims / new shared dirs / deleted animations** | **CLEAN.** 216 lines, one responsibility, no aliases, no dual paths, no back-compat, no invented directories, no removed keyframes. |

---

## Mechanism families (for the fold)

| family | findings |
|---|---|
| **Domain contract violated across a module boundary; `Result` demoted to `throw`** | C-01 |
| **Design-system register imported wholesale — radius (C-02), elevation (C-04) — with no consumer-side ladder, plus a producer cascade-layer token collision** | C-02, C-04, (C-03 glass-owned) |
| **Cross-package contract keyed to a volatile string (an ARIA role), unasserted** | C-05, C-12 |
| **Enumeration as an allow-list; identity as a many-to-one fallback feeding a one-way toggle** | C-06, C-07 |
| **Widget semantics approximated by the nearest available primitive** | C-08, C-09, C-10 |
| **Instance-per-row where the data is a module constant** | C-11 |
| **Gates that assert shape, never behavior** | C-12, C-13, C-14, C-15 |

---

## Dispositions

| finding | owner | disposition |
|---|---|---|
| C-01 | **ours** | total the ramp-progress domain once at `easingFnOf`; delete both demo `throw` seams |
| C-02 (c) token collision | **glass** | **FOLD-BANK.** New BH mark beside M3: `components.css` must not re-emit `--radius*` into the `components` layer. **No demo-side re-declaration.** |
| C-02 (d) ladder | **ours** | declare three named rungs for the corpus (card / in-card / pill) and retire the five ad-hoc call sites, incl. the `9999px` literal at `GradientEasingEditor.vue:242` |
| C-03 | **glass (M3)** | **FOLD-BANK.** `@import "./glass/glass-chip.css"` in the producer. **No local radius/wash patch — that is MT-F014.** |
| C-04 | **glass** | request a flat/in-plate elevation rung on `Chip`; **no local `box-shadow: none`** |
| C-05 | **ours** | re-key Law 3 + O-17 off `svg[role='img']` onto `[data-testid="easing-picker"] svg`; make a non-resolving sync loud |
| C-06 | **ours** | `FAMILY_ORDER` becomes a rank, never a filter |
| C-07 | **ours** | emit on every press (idempotent selection), which is also C-08's radio semantics |
| C-08 | **ours + glass** | pass `ariaLabel` to `FadingScroll` (producer prop exists); radio semantics for the 27-way select |
| C-09..C-11, C-13..C-16 | **ours** | as stated per finding |

---

## Strongest defect

**C-01.** Three of the twenty-seven controls this component paints, labels and invites a press on
destroy the entire workbench that hosts them, at this HEAD, on one click, in three of three trials.
The library returned a well-formed `Result` saying *progress out of range*; the demo seam threw it;
the throw sits inside a `computed` on the render path; the boundary eats the pane. Everything else
here is polish, semantics, or coverage. This one is a live, user-reachable teardown of the product
surface — and the oracle written to guard it (`o17-easing-composition.spec.ts:117,189` presses
`ease-out-back` by name) is red on a dead selector and therefore never reaches the press.
