# CHALLENGE-C — `EasingSpecimenStrip.vue` · implementation

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Scope + substrate

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216 lines) |
| **Own composables/data** | `easing/easingCatalogue.ts` (231), `easing/useSpecimenRows.ts` (74) |
| **Host** | `GradientVisualizer/GradientEasingEditor.vue:161` (one strip **per interval row**) |
| **Producer edges** | `@mkbabb/glass-ui/fading-scroll` · `@mkbabb/glass-ui/chip` (glass-ui 7.0.0) |
| **Library edges** | `@mkbabb/value.js/easing` (`bezierPresets`, `CubicBezier`, `steppedEase`) |
| **Routes** | `/#/gradient` (Gradient workbench → Easing bench → open interval row) |
| **HEAD at audit** | `5c13465` on `tranche-u` (the brief cited `c654824e`; the branch has moved) |

Everything below is measured against the **live** dev server at `http://localhost:9000`, the
committed Safari capture matrix, or the shipped `node_modules/@mkbabb/glass-ui@7.0.0` tree.

---

## VERDICT — **DEFECTIVE**

Eleven findings. One is a **BLOCKER**: three of the twenty-seven specimen tiles this strip paints,
labels and offers for press **destroy the entire Gradient workbench on a single click**, and the
error boundary that catches it does not release until the pane is remounted.

---

## C-01 · BLOCKER — the whole `back` family bricks the Gradient pane on one press

### Reproduction (live, isolated, three trials)

Fresh `http://localhost:9000/#/gradient`, default two-stop gradient, Easing row 1 open:

```
click [data-specimen="ease-in-out-expo"] → OK   readout "cubic-bezier(1, 0, 0, 1)"
click [data-specimen="ease-out-circ"]    → OK   readout "cubic-bezier(0.075, 0.82, 0.165, 1)"
click [data-specimen="ease-in-back"]     → CRASH
```

The pane body after the third click, verbatim:

```
→
Gradient
Palettes

This panel hit an unexpected error.

Gradient color mix failed: color_progress_out_of_range

Try again
```

`ease-in-out-back` reproduces the same crash independently (measured in an earlier trial).
The whole `Easing` bench, the gradient rail, the CSS output and the stop editor all vanish
with it — the boundary swallows the **entire workbench**, not the strip.

### The measured mechanism

Sampling every shipped tile's easing callable over `t ∈ [0,1]` at 65 points, through the
gradient's own `easingFnOf`:

| tile | `interval.css` | `fn(0.5)` | min over [0,1] | max over [0,1] |
|---|---|---:|---:|---:|
| `ease-in-back` | `cubic-bezier(0.6, -0.28, 0.735, 0.045)` | **−0.0636** | −0.0969 | 1 |
| `ease-out-back` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | **1.0676** | 0 | 1.0868 |
| `ease-in-out-back` | `cubic-bezier(0.68, −0.55, 0.265, 1.55)` | 0.6067 | **−0.0926** | **1.0927** |

No other tile leaves `[0,1]`. Both consuming call sites throw, confirmed by direct invocation
in the live page:

```
interpolateStopColors(c0, c1, fnIB(0.5), 'oklch', 'shorter')
  → "Gradient color mix failed: color_progress_out_of_range"

serializeCoalescedGradient({… intervals:[{css:'cubic-bezier(0.6, -0.28, 0.735, 0.045)'}] …})
  → "Gradient color mix failed: color_progress_out_of_range"
```

The chain, file by file:

- `src/color/operations.ts:65` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });`
  The library is **correct**: it returns a `Result`, it does not throw.
- `demo/workbenches/gradient/composables/useGradientInterpolation.ts:37` —
  `if (!mixed.ok) throw new Error(...)`. The demo boundary converts the `Result` err into an
  **uncaught throw**.
- `demo/workbenches/gradient/composables/useGradientCSS.ts:207` — the same throw, on the
  ramp-sampler path.
- `easing/useSpecimenRows.ts:53-59` — the specimen row's own ink is
  `interpolateStopColors(s0, s1, fn(0.5), …)`. This runs **inside a `computed`**, so the throw
  escapes during render and the boundary eats the pane. `ease-in-back` and `ease-out-back`
  die here (their midpoints are out of range); `ease-in-out-back` dies one step later, in
  `serializeCoalescedGradient`.
- `easingCatalogue.ts:176-190` — `buildFamilies()` mints a tile for **every** key of
  `bezierPresets`, `back` included, with no domain check.

The strip is not an innocent bystander here. Its own stylesheet is written *for* these curves:

```css
/* EasingSpecimenStrip.vue:172-179 */
/* The portrait: unit-box sparkline, faint resting ink; overshoot curves
   (the back family) draw past the box — visible, never clipped … */
.tile-glyph { … overflow: visible; }
```

The component knows the `back` family leaves the unit box, renders headroom so its portrait
reads correctly, and hands the user a control that its own host cannot survive.

### Mechanism (family)

**Domain contract violated across a module boundary, with a `Result`→`throw` demotion at the
seam.** The easing catalogue's codomain is `ℝ`; the gradient sampler's domain is `[0,1]`; nothing
between them enforces or reconciles the two, and the one place that *could* have reported it
politely (the `Result`) is thrown away.

### Proposed cure — architectural, not a patch

The clamp belongs at the **ramp sampler**, not in the catalogue, and it is a *domain law*, not a
masking fallback: a CSS gradient interval physically cannot produce a color outside its two
endpoints, so an overshooting timing function *means* "hold at the endpoint". Make the gradient's
progress type total:

- introduce the `[0,1]` clamp once, at the single point where an eased `t` becomes a mix
  progress (`useGradientCSS.easingFnOf`'s return, or a `rampProgress(fn, t)` helper next to it),
  so `useSpecimenRows`, `serializeIntervalRamp` and `serializeCoalescedGradient` all inherit it;
- then delete both `throw` sites (`useGradientInterpolation.ts:37`, `useGradientCSS.ts:207`) — with
  a total domain they are unreachable, and an unreachable throw in a render path is a liability.

The repo already speaks this idiom (`test/value-domain-clamp.test.ts`). The alternative — deleting
the `back` family from the catalogue — is strictly worse: it removes three curves the producer's
own picker still offers (see **C-02**), and it contradicts the strip's overshoot-headroom design.

---

## C-02 · MAJOR — six of the thirty library presets are silently deleted; authoring one of them names it `custom`

`easingCatalogue.ts:174`:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…);   // :191
```

This is an **allow-list**, not an order. `src/easing.ts:33-64` ships thirty presets including
`ease-{in,out,in-out}-quart` and `ease-{in,out,in-out}-quint` → `familyLabelFor` files them under
`quart`/`quint` → neither name is in `FAMILY_ORDER` → **six tiles are dropped without a trace**.

Measured live (module imported in-page):

```
families: ["css:5","sine:3","quad:3","cubic:4","expo:3","circ:3","back:3","steps:3"]
SPECIMEN_TILES.length: 27       hasQuart: false      hasQuint: false
```

The module's own docblock states the opposite contract (`easingCatalogue.ts:15-17`):
*"the tile catalogue IS value.js `bezierPresets` + the steps family — the SAME catalogue the
glass-ui `<EasingPicker>`'s preset menu speaks (never a second mint)"*. It is a second mint.

And the picker really does speak all thirty — `node_modules/@mkbabb/glass-ui/dist/easing.js:13`
is `H = Object.keys(P)` over the same `bezierPresets`. Measured in the open menu: **30 options**,
`quart`×3 and `quint`×3 present.

### End-to-end user reproduction

`/#/gradient` → Easing row 1 → **Author a custom curve** → *Easing preset* → `ease-in-quart`:

```
readoutLiteral : "cubic-bezier(0.895, 0.03, 0.685, 0.22)"   ← the correct, named preset
headSpans      : ["1 → 2", "", "", "", "custom"]            ← the head calls it CUSTOM
pressedTiles   : []                                          ← the selection surface shows nothing
```

Unit-level confirmation:

```
bezierLiteral([0.895,0.03,0.685,0.22]) → "cubic-bezier(0.895, 0.03, 0.685, 0.22)"
tileIdFor({css: <that>})               → null
specimenNameFor({css: <that>})         → "custom"
tileIdFor({css:"cubic-bezier(0.23, 1, 0.32, 1)"})       → null      (ease-out-quint)
specimenNameFor({css:"cubic-bezier(0.23, 1, 0.32, 1)"}) → "custom"
```

The literal minting is byte-perfect (glass mints with the identical `+n.toFixed(3)` / `", "` law —
`dist/easing.js`, `` `cubic-bezier(${e}, ${t}, ${r}, ${a})` ``). The *identity* is what breaks.
`specimenNameFor`'s doc promises `custom` means "matching no preset"; here it means "matching a
preset the strip forgot".

### Mechanism (family)

**Enumeration expressed as an allow-list rather than a sort key** — a closed set standing in for
an open one. Adding a preset upstream silently shrinks the demo's coverage; nothing fails.

### Proposed cure

`FAMILY_ORDER` becomes a *rank*, never a filter — unknown families sort last and still render:

```ts
const rank = (f: string) => { const i = FAMILY_ORDER.indexOf(f); return i < 0 ? FAMILY_ORDER.length : i; };
return [...byFamily.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
    .map((family) => ({ family, tiles: byFamily.get(family)! }));
```

Then a new upstream preset can never vanish, and `familyLabelFor`'s `/^ease-(in-out|in|out)-(.+)$/`
regex — already general — does the rest with no edit.

---

## C-03 · MAJOR — the glass `Chip` cell recipe and pressed wash never paint · **FOLD-BANKED ON GLASS**

This is the known residual (INBOX **I-9**, **D58**, our mark **M3** — a glass **BJ born-RED** row).
This seat's contribution is the exact proof and the exact consequences, measured.

### The orphan, proven in the package

```
$ grep -rl "glass-chip--cell" node_modules/@mkbabb/glass-ui/
node_modules/@mkbabb/glass-ui/dist/chip-DFZQr6rV.js          ← the class is EMITTED
node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css ← the rules EXIST
node_modules/@mkbabb/glass-ui/dist/components/chip/chipVariants.d.ts

$ grep -rn "glass-chip.css" node_modules/@mkbabb/glass-ui/dist/
(no output)                                                   ← NOTHING IMPORTS IT

$ grep -o "glass-chip[a-z-]*" node_modules/@mkbabb/glass-ui/dist/glass-ui.css | sort -u
(no output)
```

`dist/styles/index.css` (the `@mkbabb/glass-ui/styles` entry the demo imports at
`demo/styles/foundation.css:56-57`) imports `./glass.css`, which imports eighteen `./glass/*.css`
files — `glass-capsule.css` among them, `glass-chip.css` **not**. Confirmed at runtime:

```
glassChipCssPresent (any live stylesheet containing "glass-chip--cell") : false
```

### What that costs *this* component, measured on the live page

| symptom | measured |
|---|---|
| `shape="cell"` radius | `border-radius: 9999px` — the capsule wins; `.glass-chip--cell{border-radius:var(--radius-card)}` never lands |
| tile box | 45.2 × 43.8 px → a **full circle** |
| pressed wash | `data-state="on"` background `oklab(0.925644 0.0094459 0.0291917/0.83872)`, border `rgb(198,180,159)` — **byte-identical to `data-state="off"`**. `.glass-chip[data-mode="selectable"][data-state="on"]{background-color:var(--accent-band);border-color:var(--accent-edge);color:var(--accent-ink)}` never lands, and neither does the `::after` accent flood |
| coarse-pointer touch floor | `min-block-size: auto` — `@media (pointer:coarse){.glass-chip--interactive{min-inline-size:2.75rem;min-block-size:2.75rem}}` never lands |
| labels outside the painted chip | **11 of 27**, label 33.2 px over 26.7 px of painted capsule at the label's baseline = **6.6 px overhang** each (`linear`, `ease-in-out`, `…-sine`, `…-quad`, `smooth-step-3`, `…-cubic`, `…-expo`, `…-circ`, `…-back`, `steps`, `step-start`) |

### What the Safari captures show, exactly

`shots/safari-desktop-{light,dark}/gradient.png` and both mobile matrices, Easing section:

The specimen tiles are **flat beige circles**, not the rounded rectangular cells the code asks for.
Each circle carries a sparkline in its upper half and a mono variant label across its lower third.
Because a circle is far narrower than its bounding box at the label's baseline, the wide labels —
`linear`, `in-out` (×7), `smooth` — **spill out of the painted chip on both sides and float on the
bare pane ground**, reading as loose text between the tiles rather than as tile captions. The
selected tile (`linear` in the capture) has **no pressed fill and no pressed border** — it is
distinguishable from its twenty-six neighbours only by a teal glyph stroke and a bold teal label.
The sparkline is inscribed in a square, so the circle visually crops its corners: `linear`'s
diagonal appears to exit its own chip at the top-right and bottom-left. Both schemes, all four
matrices, identically.

### Disposition — **FOLD-BANK ON GLASS. NO LOCAL PATCH.**

The cure is one line in the producer: add `@import "./glass/glass-chip.css";` to
`dist/styles/glass.css` (or to `styles/index.css`) so the Chip/Badge stylesheet ships. Relay on the
glass **BH** inbox against mark **M3**; carry the row into the mega-tranche fold as glass-owned.

A local `.specimen-tile { border-radius: var(--radius-card) }` here would re-implement producer CSS
in a consumer to hide a producer defect — **precisely the masking fallback MT-F014 and standing
edict 2 forbid**, and it would silently survive the glass fix as dead per-instance override. Do not
write it.

---

## C-04 · MAJOR — the component overrides the producer's cell recipe per-instance (edict 5)

Independent of C-03 and **ours**, not glass's:

```css
/* EasingSpecimenStrip.vue:163-170 */
.specimen-tile {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.125rem;
    padding: 0.3125rem 0.375rem 0.25rem;   /* overrides Chip cell's px-2 py-2.5 */
    min-width: 2.75rem;
}
```

`chip-DFZQr6rV.js` sets `shape="cell"` → `"glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`.
The seat then re-declares `display`, `flex-direction`, `gap` and `padding` **on the producer's root
element**, from the consumer. Standing edict 5 ("style at the glass root component level, never
per-instance overrides") is violated four times in eight lines.

It is also causally load-bearing: the local `padding` + `min-width: 2.75rem` are what make the box
square (45.2 × 43.8 measured), which is what turns the orphaned 9999px radius into a *circle*
rather than a stadium — i.e. this local override materially worsens C-03's visual damage. Note
too that `min-width` is set but `min-height` is not, so nothing local backstops the missing
coarse-pointer floor.

**Cure:** the specimen density is a *Chip size*, not a demo override. Ask glass for a `size="xs"`
rung (or a `--chip-cell-density` token on `shape="cell"`), relay it on the BH inbox alongside the
M3 orphan, and delete all four declarations here. One producer change serves this strip, the
keyframes gallery this was transposed from, and every future micro-cell seat.

---

## C-05 · MAJOR — a 27-way single-select is exposed as 27 independent toggle buttons, behind a nameless tab stop

Measured on the open row:

```
focusables in the open easing row : 30
chip role                         : null
chip aria-pressed                 : "true" / "false"
FadingScroll port                 : tabindex="0"   role=null   aria-label=null
group label                       : "Easing curve specimens"   (on .strip-row — present, good)
```

Two distinct defects:

**(a) Wrong widget semantics.** `mode="selectable"` renders reka-ui `Toggle` → a bare
`<button aria-pressed>`. The component's own contract (`EasingSpecimenStrip.vue:30-32`) is
*"Single-select, owner-controlled … an interval always has a curve"* — that is a **radio group**,
not twenty-seven independent toggles. A screen-reader user hears "linear, toggle button, pressed"
with no indication that the twenty-six siblings are mutually exclusive alternatives. Confirmed in
the Playwright AX dump (`test-results/…-desktop-smoke/error-context.md:59+`): a flat
`group "Easing curve specimens"` containing 27 sibling `button … [pressed]` nodes, no radio
semantics, no per-family grouping — the family eyebrows are `aria-hidden="true"`
(`EasingSpecimenStrip.vue:96`), so the family IA that the docblock calls the strip's information
architecture is **entirely invisible to assistive tech**.

**(b) An unnamed, roleless tab stop.** `FadingScroll` hardcodes `tabindex="0"` on its root and only
emits `role="region"` when given `ariaLabel`/`ariaLabelledby`
(`dist/fading-scroll-DhxXIhm2.js:78-92`). This component passes **neither** — it puts the label on
the inner `div.strip-row` instead. Result: a focusable `<div>` with no role and no name sits in the
tab order ahead of the 27 tiles. The visual REPORT's `namelessButtons` probe filters
`button,[role="button"]` (`capture.mjs:102-105`), so **this focusable is not counted anywhere in
the audit** — it is a finding the matrix structurally cannot see.

Twenty-eight keystrokes to traverse one interval row, with no roving `tabindex` and no arrow-key
navigation.

**Cure:** pass `:aria-label="'Easing curve specimens'"` to `<FadingScroll>` (the producer prop
exists, use it) and move the selection to radio semantics. `mode="selectable"` Chips inside a
reka-ui `RadioGroup` gives roving tabindex, arrow keys, `aria-checked` and the 1-of-N announcement
for free — and if glass has no `Chip` radio rung, that is a glass request, not a demo hand-roll.

---

## C-06 · MINOR — WCAG 2.5.3 Label in Name

Measured across all 27 tiles, one violation:

```
labelInName: [ { acc: "steps", vis: "n = 4" } ]
```

`:aria-label="tile.id"` (`EasingSpecimenStrip.vue:105`) is `"steps"`; the visible label
(`easingCatalogue.ts:187`) is `"n = 4"`. A speech-input user saying "click n equals four" cannot
activate it. Every other tile's id happens to contain its visible label as a substring.

**Cure:** the accessible name should be built from the visible label, not from a parallel string —
e.g. name the tile `` `${fam.family} ${tile.label}` `` (which also repairs the AT-invisible family
grouping from C-05a in the same stroke), or drop `aria-label` entirely and let the visible label
plus a `<span class="sr-only">` family prefix compose the name.

---

## C-07 · MINOR (PLAUSIBLE — mechanism is a hypothesis) — the keep-in-view watch is intermittent on the *selection* arm

The docblock (`EasingSpecimenStrip.vue:37-39`) promises: *"on selection AND on reveal the pressed
tile scrolls to its nearest edge"*.

**Trial A** — fresh load, press `[data-specimen="step-end"]` (the last tile, ~1000 px off-port):

```
initialScrollLeft : 0
after press +1.2s : scrollLeft 0   tile at x 1673.1–1717.1   port 237–673   visible: false   ← FAILED
collapse+reopen   : scrollLeft 1044   tile at x 629.1–673.1   visible: true                ← reveal arm OK
```

**Trial B** — same action, `Element.prototype.scrollBy` instrumented:

```
before : scrollLeft 0, pressed ["linear"]
calls  : [{ fn:"scrollBy", cls:"fading-scroll fading-scrol", args:{left:1044.109375, behavior:"smooth"}, at:2068 }]
trace  : 140ms→60.5  280→645  420→902  560→1000  700→1038  840→1044 … settles 1044
after  : pressed ["step-end"], readout "steps(1, jump-end)"                                 ← SUCCEEDED
```

So the behavior is **flaky**, not dead: the same press either scrolls or does not. Selection did
change in both trials (trial A's later reveal scrolled to `step-end`'s position, proving
`selectedId` had updated). Exactly one `scrollBy` call, on `.fading-scroll`, in the successful
trial — and zero `scrollTo`/`scrollIntoView` anywhere.

I could not pin the failing path; the mechanism below is a **hypothesis**, labelled as such. The
watch is `flush: "pre"` and schedules its measurement with `nextTick` (`:54`); a `pre` watcher fires
*before* the component re-renders, so the `nextTick` promise races the parent's own render/patch
work for that tick. When the parent's patch lands in a later flush than the strip's `nextTick`, the
measurement reads pre-layout geometry and `dx` can compute to `0`, silently skipping the scroll
(`:71` `if (dx !== 0)`).

**Cure:** stop racing the scheduler. `{ flush: "post" }` on the watch makes the callback run
*after* the DOM patch, and the `nextTick` wrapper (with its bare `void`-swallowed promise) can be
deleted outright — the measurement then always reads settled geometry. That is one line removed
and one option added.

---

## C-08 · MINOR — one full 27-Chip strip is mounted per interval, forever

`GradientEasingEditor.vue:161` places `<EasingSpecimenStrip>` inside `v-for="row in specimenRows"`,
and both the containing panel (`:144`) and the accordion are `v-show`, never `v-if`. Measured with
the default two-stop gradient: `stripInstances: 1`, `chipsInDom: 27`. With *S* stops the DOM
therefore carries **(S−1) × 27 Chip components**, of which **(S−2) × 27 are permanently invisible** —
a five-stop gradient mounts 108 Chips and 108 SVG paths to show 27.

Each instance additionally owns: a `useMediaQuery("(prefers-reduced-motion: reduce)")` matchMedia
listener (`:47`), a `FadingScroll` scroll listener + `ResizeObserver` + coalesced rAF
(`dist/fading-scroll-DhxXIhm2.js:34-45`), and a watcher. Nothing about the catalogue varies per
interval — `SPECIMEN_FAMILIES` is a module constant (`easingCatalogue.ts:198`) and the strip's only
props are `selectedId` and `visible`.

The strip's own comment concedes the shape of this: *"sibling rows mount hidden twins of every
data-specimen id"* (`:40`) — the scoping workaround exists **because** of the duplication.

**Cure:** the accordion has exactly one open row at a time (`openInterval: ref<number|null>`). Hoist
**one** strip out of the `v-for`, render it once for the open interval, and the twin problem, the
`rowEl` scoping workaround, the N listeners and the (S−2)×27 dead nodes all disappear together.

---

## C-09 · MINOR — the gates are vacuous, and the one live oracle is RED

**Unit.** The only unit coverage of this component's data is
`test/gradient-v4-consume.test.ts:55-58`:

```ts
it("builds every easing specimen from valid Result values", () => {
    expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
    expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
});
```

Both assertions are green **today**, with six presets silently dropped (C-02) and three tiles that
crash the pane (C-01). Named mutations that keep it green:

1. delete `"circ"` and `"expo"` from `FAMILY_ORDER` — 21 tiles, still `> 20`, no NaN. Six more
   curves vanish from the product; the suite says nothing.
2. change `glyphPath(fn, samples = 48)` to `samples = 1` — every portrait collapses to the straight
   line `"M 0.000 1.000 L 1.000 0.000"`, no `"NaN"`, count unchanged. Every sparkline in the gallery
   becomes identical; the suite says nothing.

There is **no** component test: no mount test, no press test, no assertion that a pressed tile
emits, that `selectedId` maps to `data-state="on"`, or that pressing a tile does not destroy its
host.

**E2E.** `e2e/smoke/oracles/o17-easing-composition.spec.ts` is the only oracle over this bench, and
it *does* press `[data-specimen='ease-out-back']` at `:117` and `:189` — the exact lethal tile. Run
just now:

```
$ VJS_E2E_PORT=8191 VJS_E2E_PERF_PORT=8192 npx playwright test \
    e2e/smoke/oracles/o17-easing-composition.spec.ts --project=smoke --reporter=line
  3 failed
    O-17 zero letterbox across curve regimes — desktop
    O-17 zero letterbox across curve regimes — 390
    O-17 composition: stamps, dot rest, one-literal, mint law
```

Honest attribution: all three die **before** the back-tile press, at
`discloseAuthoring` (`:50-52` — `#easing-authoring-0 svg[role='img']` never appears / the tune-button
click never settles). That is an `EasingAuthoringStage` failure, not the strip's. But the
consequence for *this* component is exactly the finding: **the only gate that would have caught
C-01 is itself red and evidently not enforced**, so nothing in CI stands between this strip and a
pane-destroying click.

**Cure:** repair O-17 first (it is the standing oracle), then add the missing invariant as a unit
test that cannot be satisfied vacuously — *every tile in `SPECIMEN_TILES`, sampled over `[0,1]`,
must round-trip through `serializeIntervalRamp` without throwing*, and *`SPECIMEN_TILES` ids must
equal `Object.keys(bezierPresets)` ∪ the steps ids*. Both assertions fail today; both would have
caught C-01 and C-02 at authoring time.

---

## C-10 · INFO — the exported minters have no arity or domain guard

Measured by direct call in the live page:

```
bezierLiteral([0.1, 0.2])   → "cubic-bezier(0.1, 0.2, undefined, undefined)"
stepsLiteral(-3, "jump-end")→ "steps(-3, jump-end)"
glyphPath(fn, 0)            → "M NaN NaN"
```

None is reachable from the shipped call sites (the catalogue always passes a 4-tuple, `n ∈ {1,4}`,
and the default 48 samples), so this is INFO, not a live defect. But `bezierLiteral`'s signature is
`readonly number[]` (`easingCatalogue.ts:48`), not `readonly [number,number,number,number]` — the
type does not carry the arity the body assumes, and both functions are `export`ed, so the hole is
open to any future caller. `glyphPath`'s `samples` has no positive-integer guard.

**Cure:** type the arity — `bezierLiteral(quad: BezierPoints)` (the glass type is already imported
at `:32`) — and the `undefined` case becomes a compile error rather than a runtime string. Same for
`stepsLiteral`'s count.

---

## C-11 · INFO — the watch source allocates a new array every evaluation

```ts
watch(() => [selectedId, visible] as const, () => { … }, { immediate: true });   // :50-80
```

A getter returning a fresh array literal is never `Object.is`-equal to its predecessor, so Vue's
`hasChanged` gate is always `true` and the callback runs on every re-evaluation regardless of
whether either prop actually moved. Harmless today (the callback is idempotent and guards on
`!visible || selectedId === null`), but it defeats the change-detection the getter is written to
express, and it is the kind of thing that turns into a real over-fire the moment the callback gains
a side effect.

**Cure:** the idiomatic multi-source form — `watch([() => selectedId, () => visible], …)` — which
compares element-wise and costs nothing.

---

## Negative proofs — what this component gets RIGHT

The premise says the implementation is defective. It is. But an honest seat states what it
verified *and cleared*, because these are the hazards the brief told me to hunt:

| checked | result |
|---|---|
| **PRM-RAF epidemic** (~40 constellation sites) | **CLEAN.** No `requestAnimationFrame` anywhere in the component or its catalogue. The one rAF in the tree is `FadingScroll`'s, and it is coalesced (`u \|\|= requestAnimationFrame`) and cancelled in `onBeforeUnmount`. |
| **`prefers-reduced-motion`** | **HONORED.** `:74` — `behavior: prefersReducedMotion.value ? "auto" : "smooth"`. |
| **The O-19 page-yank cure** | **HOLDS, and is real.** The `scrollIntoView` avoidance documented at `:40-46` is correct: I instrumented `scrollBy`, `scrollTo` *and* `scrollIntoView` across a full press cycle and observed **exactly one** call — `scrollBy` on `.fading-scroll`. The `.fading-scroll` root genuinely *is* the scroll port (verified in `dist/fading-scroll-DhxXIhm2.js:34-45`, which attaches the scroll listener and reads `scrollWidth − clientWidth` on that same root; and in the live DOM chain `button.glass-chip → div.family-tiles → div.strip-family → div.strip-row → div.fading-scroll`). `closest(".fading-scroll")` is not a guess against a private class — it is the documented contract, and it resolves. |
| **Tap targets (WCAG 2.5.8)** | **PASSES, with room.** 44.0–45.2 × 43.8 px measured. The strip contributes **zero** rows to the REPORT's 6 `smallTapTargets` on `/#/gradient` — those are the slug `input` (160×23), three 22×22 slug buttons and two 20×20 gradient stops, none in this file. |
| **Accessible names** | **27/27 present** (AX dump). The one nameless focusable is the FadingScroll port (C-05b), a `div`, which the REPORT's button-only probe cannot see. |
| **Page-level horizontal overflow** | **NONE.** `overflowX: 0` on all four `/#/gradient` captures. The 12 `bleeding` rows in `REPORT.json` for this route are *all* this component (`div.strip-row`, `div.strip-family`, `span.family-eyebrow`, `div.family-tiles`, `button.glass-chip…`), but they are content inside its own `overflow-x` port — 70.6 % of the strip is off-port by design (scrollWidth 1482 / clientWidth 436), not bleeding onto the page. Not a defect of this axis. (It *is* a legibility question — the D seat owns it as D-02.) |
| **`verbatimModuleSyntax`** | **CLEAN.** `:11-16` — value imports plain, `import type { SpecimenTile }` correctly type-only. Same throughout `easingCatalogue.ts:27-36`. |
| **Vue 3.5 idiom** | **CLEAN.** `useTemplateRef` (`:48`), reactive props destructure with a default (`:18`). |
| **`defineModel` stale-read hazard** | **N/A** — no `defineModel`; selection is a controlled `:model-value` + `@update:model-value` pair, which is the correct shape here. |
| **`ValueUnit` nesting / oklch→HSV `stableHue` / `parseCssColor` / WebGL** | **N/A** — this component touches none of them. |
| **Console + page errors** | **ZERO** on `/#/gradient` in all four Safari matrices (`REPORT.json`: `consoleErrors: []`, `pageErrors: []`) — because the capture never presses a tile. |
| **God modules / legacy shims / new shared dirs / deleted animations** | **CLEAN.** 216 lines, one responsibility, no aliases, no dual paths, no back-compat, no invented directories, no removed keyframes. |

---

## Findings table

| id | sev | finding | evidence |
|---|---|---|---|
| C-01 | **BLOCKER** | all 3 `back` tiles crash the whole Gradient pane on one click | live repro; `fn` ranges; `useSpecimenRows.ts:53`, `useGradientInterpolation.ts:37`, `useGradientCSS.ts:207`, `src/color/operations.ts:65` |
| C-02 | MAJOR | `FAMILY_ORDER` allow-list silently drops 6 of 30 presets; authoring one names it `custom` | `easingCatalogue.ts:174,191`; live repro (`headSpans[4]="custom"`, `pressedTiles: []`) |
| C-03 | MAJOR | glass `Chip` cell recipe + pressed wash never paint — **FOLD-BANK ON GLASS (M3)** | orphaned `dist/styles/glass/glass-chip.css`; `glassChipCssPresent:false`; on/off bg identical; 11 labels overhang 6.6 px |
| C-04 | MAJOR | per-instance override of the producer's cell recipe (edict 5) | `EasingSpecimenStrip.vue:163-170` vs `chip-DFZQr6rV.js` cell variant |
| C-05 | MAJOR | 27-way single-select as 27 toggle buttons; nameless roleless tab stop on the port | `chipRole:null`, `aria-pressed`; port `tabindex=0 role=null aria-label=null`; 30 focusables; AX dump |
| C-06 | MINOR | WCAG 2.5.3 Label in Name — `steps` / `n = 4` | measured `labelInName` |
| C-07 | MINOR | selection-arm keep-in-view is intermittent (mechanism = hypothesis) | trial A failed / trial B `scrollBy{left:1044.109375}` succeeded |
| C-08 | MINOR | one 27-Chip strip mounted per interval, all but one invisible | `GradientEasingEditor.vue:161`; 27 chips / 1 interval measured |
| C-09 | MINOR | vacuous unit gate; the only e2e oracle is 3/3 RED | `gradient-v4-consume.test.ts:55-58`; named mutations; pasted playwright run |
| C-10 | INFO | no arity/domain guard on exported minters | `bezierLiteral([0.1,0.2])`, `stepsLiteral(-3,…)`, `glyphPath(fn,0)` |
| C-11 | INFO | watch getter allocates a fresh array; change-gate always true | `EasingSpecimenStrip.vue:50-51` |

---

## Unattributed observation (NOT a finding against this component)

Mid-session the Gradient pane began booting into its error boundary with
`Cannot read properties of undefined (reading 'replace')`, alongside a
`dev misconfigured — run \`npm run dev\`` banner in the shell. `grep -rn "\.replace(" demo/workbenches/gradient/`
returns **nothing**, no gradient state exists in `localStorage`, and other audit seats were driving
the same dev server concurrently (`git status` shows ~10 sibling component reports being written).
I judge this an environment fault, not a defect of this component, and record it only so a later
seat that sees it does not chase it here. It is a **hypothesis**, unreproduced in isolation.

---

## Strongest defect

**C-01.** Three of the twenty-seven controls this component paints, labels, and invites a press on
will destroy the entire workbench that hosts it. The library returned a well-formed `Result` saying
"progress out of range"; the demo boundary threw it; the throw sits inside a `computed` in the
render path; the boundary eats the pane. Everything else in this report is a defect of polish,
semantics or coverage. This one is a live, one-click, user-reachable teardown of the product
surface — and the oracle written to guard it is red.
