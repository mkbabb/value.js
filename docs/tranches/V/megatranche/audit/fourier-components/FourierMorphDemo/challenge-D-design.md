claude-opus-5[1m]

# Challenge · `FourierMorphDemo` · axis D (DESIGN) — **pass 2, superseding**

**Target** `fourier-analysis/web/src/components/morph/FourierMorphDemo.vue` (330 lines)

**Read whole, read-only:** the target + `MorphShapePreview.vue` (175) · `MorphPhaseConfig.vue` (212) ·
`HarmonicLevelGrid.vue` (286) · `decorative/FourierMorphSvg.vue` (41) · `composables/useFourierMorph.ts` (230) ·
`composables/useMorphConfig.ts` (97) · `lib/easings.ts` (127) · `lib/colors.ts` (117) · `lib/svg-fourier.ts` ·
`assets/fourier-paths/{sun,moon}.json` · `src/style.css` (143) · `src/App.vue` · `src/router/index.ts` ·
`web/package.json` · `e2e/{visual-baseline,visualization-ux}.spec.ts` · the **installed**
`@mkbabb/glass-ui@4.0.0` dist (`button-BNDWhAZb.js`, `slider-DQ95MET2.js`, `SelectScrollDownButton-*.js`,
`glass-ui.css`, `styles/tokens/*`, `styles/cards.css`, `styles/utilities/a11y-overrides.css`,
`components/custom/{labeled-field,number-field,fading-scroll,metric-badge}/*.d.ts`) · the **producer HEAD**
`glass-ui@7.0.0` source (`src/components/{button,slider,select,labeled-field,metric,chip,easing}/`,
`CHANGELOG.md`, `MIGRATION.md`) · `web/node_modules/reka-ui/dist/Select/{SelectValue,SelectItemText,SelectContent}.js`.

**No browser tooling.** Every claim is static or source-derived. Live-only claims are marked
**UNPROVEN-NEEDS-LIVE (SS-13)** and name their exact probe.

---

## §00 · Status of this file — pass 2 supersedes pass 1

A pass-1 D-axis challenge existed at this path (33 defects / 3 BLOCKER / 7 superlatives, same served model).
It was read **whole** before this write. **Nothing true in it was dropped.** This pass:

- **CARRIES** every pass-1 row that survived re-verification, under its original id, so pass-1 cross-references
  still resolve. Rows marked `[P1]`.
- **ADDS** 13 rows pass 1 did not carry, marked `[P2-NEW]` — chiefly D-4 (the starved slider), D-18 (four glass
  seats available *at the pin*), D-19, D-20, D-21 and six MINORs.
- **PROMOTES** one row: pass-1 D-15 (identical tiles / dead High range) MAJOR → **BLOCKER**, with the
  disagreement argued in the row itself.
- **CORRECTS two pass-1 errors**, both in the consumer's favour to state plainly:
  1. Pass-1 D-10 says the `LabeledField` cure "arrives" at 7.0.0. **False** — `./labeled-field` is in
     `@mkbabb/glass-ui@4.0.0`'s export map *today*, with `LabeledSlider.vue.d.ts` taking a **scalar**
     `modelValue: number`. The seat is available at the pin; this raises the row's weight (see D-18).
  2. Pass-1 S-3 claims glass's `SelectItem`→`SelectItemText` path means "the selected curve is echoed into the
     trigger". **REFUTED** — reka's `SelectValue` computes `selectedLabel` from `option.textContent` and renders
     `toDisplayString(slotText)`, i.e. a **string** (`reka-ui/dist/Select/SelectValue.js`, `selectedLabel` +
     `slotText`; `SelectItemText.js`, `textContent: itemTextElement.value?.textContent`). An `<svg>` contributes
     no `textContent`. The trigger shows the *label only*. S-3 survives, narrowed, for the dropdown list.
- **KILLS one pass-1 superlative**: S-4 ("an honest horizontal scroller") — the strip has a bottom gutter and
  **no top gutter**, so it clips the active ring, the hover lift and the focus ring (D-20).

**Counting convention.** `defects` = every finding at every severity (**46**). `blockers` = the BLOCKER subset
(**5**). `superlatives` = **9** (7 carried − 1 killed + 3 new). L-18 runs both ways: every superlative carries a
falsifier, and the three killed candidates are recorded in §5 so nobody re-mints them.

**Verdict.** The page is *legible* — one breakpoint applied whole, one clamp funnel, deliberate two-voice
typography, and one genuinely thoughtful algorithm (S-5). It sits on five structural failures: **the primary
action has no accessible name**; **the entire per-slider colour system is dead CSS against both the pinned and
the target glass version**; **the glass `Button` prop axis it uses does not exist at 7.0.0 and the producer's own
migration doc has no row for it**; **the duration slider is squeezed to ≈0 px at the very breakpoint that creates
its layout**; and **the harmonic strip renders three pixel-identical tiles labelled `n=50/75/100`, i.e. it lies
about Fourier convergence on a Fourier-analysis product.**

---

## §0 · Corpus fold — what I inherit, extend, and contradict

| Corpus row | Held | Use here |
|---|---|---|
| `CENSUS-2026-08-03.md:102-104` / `[FE §5]` — break surface = `metric-badge ×7`, `hover-card/-popover ×4`, dock members ×3, `ToastVariant` | ADOPTED | **EXTENDED twice.** (a) The list is *subpath*- and *type*-shaped; it misses a **prop-axis** break firing 3× here (D-3). (b) It misses the inverse case: this component does not *import* `metric-badge` — it **re-implements** it eight times, so the F.W1 sweep will not find those chips (D-18). |
| `CENSUS-2026-08-03.md:184-186` — F.W1 is the atomic glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 | ADOPTED | Every "breaks/improves" call in §6 is scoped to that one transaction. |
| `lane-frontend.md:171-175` — the morph-family LOC table; `:276-281` the glass import inventory | ADOPTED verbatim | Re-verified against the tree: 330 / 212 / 286 / 175 / 41 — all match. |
| `[FE §8]` — 18 reduced-motion references, "the two rAF clocks themselves are ungated" | ADOPTED | **EXTENDED to a third clock**: `morphTo` is a rAF chain (`keyframes.js`, `useWAAPI:false`), also ungated, and it is this route's entire purpose (D-8). The morph subtree is **not** among the 12 files the lane enumerated. |
| `lane-frontend.md:382` — every `glass-scrubber`/`glass-track` occurrence in the tree is **prose comment only** | ADOPTED — the strongest corroborating row available | The lane proved the *class names* are prose. This pass proves the neighbouring **custom properties** (`--slider-scrub-*`) are prose too — dead at 4.0.0 **and** 7.0.0 (D-2). The lane stopped one token short. |
| `lane-docs.md:398-403` — `cssVarToHex` has four regex arms, no `oklch()` arm, `#888888` fallthrough; W.L5 deletion target | ADOPTED | **EXTENDED from a deletion target to a live visual defect at a named call site** (D-14). |
| `[FE §3]` — fourier is "the deepest, cleanest glass consumer in the constellation" | ADOPTED as an aggregate | **CONTRADICTED locally**: this route hand-rolls four surfaces whose seats ship at the current pin and imports `Button` only to repaint it (D-18, D-11). An aggregate judgement can be true while this route is the exception; none of these four appear in the lane's shadow ledger `[FE §4]`. |
| `CENSUS §5 risk 10` / `[FE §0, §9]` — the uplift lands with no unit-test net | ADOPTED | **SHARPENED**: `/morph` is covered by exactly one spec — `e2e/visual-baseline.spec.ts:35` (`{ slug: "morph", path: "/morph" }`, a screenshot that asserts nothing). The axe keystone spec navigates only `/visualize` (`e2e/visualization-ux.spec.ts:47`). **No a11y gate has ever run against this page**; D-1, D-10, D-19 and m-1 are live in production, not latent. |
| intake `lane-fourier-r3-r6.md` **R3-10** (TRUE, CARRY→F.W4) — six dynamic-`:is` families, registry carried four, incl. **`FourierMorphDemo:72`** | ADOPTED | `:72` is `<component :is="copied ? Check : ClipboardCopy">`. Confirmed live at that exact line. D-9 is the *state* behind that `:is`: the icon family the registry tracks has no failure arm to reach. |
| intake **R3-12** (TRUE) — 35 open-family records collapse to 28; duplicates include **`MorphPhaseConfig` easingNames** | ADOPTED, not re-derived | Confirmed live: `easingNames` is a module-level `Object.keys(EASING_PRESETS)` (`lib/easings.ts:62` → `useMorphConfig.ts:20`) rendered by three mounted instances (`FourierMorphDemo.vue:26,36,46`) — one family, three callsites. Related to m-3, a *second* physical duplication in the same subtree. |
| intake **X-2** — 9 route records, not 8 | ADOPTED | Used only to confirm `/morph` is one of the 7 lazy component routes with `meta.title`/`meta.description` (`router/index.ts:101-110`). |
| intake **X-9** (CARRY→F.W4) — publish one member-scope law before any percentage | RESPECTED | This challenge states no percentages; only absolute counts with file:line. |

**No corpus claim about this component is contradicted by the tree.** The two near-contradictions (the break-surface
enumeration, the "cleanest consumer" aggregate) are extended rather than overturned, and both are argued in place.
Per the ADDENDUM 2026-08-03 §6.7 correction, nothing here rests on Codex *authority* — every figure is re-derived
from the live tree and the two pinned producer trees.

---

## §1 · BLOCKERS (5)

### D-1 · BLOCKER · The page's primary action has no accessible name `[P1]`
`MorphShapePreview.vue:4-10` · `FourierMorphSvg.vue:2-16`

```
<button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
    <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
</button>
```

The button's only child is `FourierMorphSvg`, whose root `<svg>` (`FourierMorphSvg.vue:2-7`) carries no `<title>`,
no `role`, no `aria-label`, no `aria-labelledby`, and is not `aria-hidden`. No text node, no `sr-only` span, no
`title` attribute anywhere in the subtree. The accessible name of the sole shape-toggle on `/morph` computes to
the empty string (axe `button-name`, WCAG 4.1.2).

**Severity rationale.** Not an a11y nit: this is the single action the route exists to expose. The adjacent chips
(`MorphShapePreview.vue:31-42`) *name the current shape* — the information exists in the DOM two elements away
and is never wired to the control.

**Falsifier.** Any `aria-label`/`aria-labelledby`/`title` on the `<button>` or `<svg>`; a visually-hidden text
node; a `<title>` element in the SVG. Probe: `grep -n "aria-label\|aria-labelledby\|<title\|sr-only\|role="
MorphShapePreview.vue FourierMorphSvg.vue` → **0 hits, both files, whole file.** Verified.

**F.W1.** Neither breaks nor improves — glass 7.0.0 cannot name a raw `<button>` the consumer owns. But note the
shape: 7.0.0's `Button` documents `iconOnly` as *"Square geometry for an accessibly named icon command"*
(`glass-ui/src/components/button/Button.vue:24-25`) — the producer has the seat and this control declines it by
not being a `Button` at all (D-11).

---

### D-2 · BLOCKER · The whole per-slider colour system is dead CSS — at 4.0.0 **and** at 7.0.0 `[P1]`
`FourierMorphDemo.vue:31,41,51` → `MorphPhaseConfig.vue:29,205-211` · `HarmonicLevelGrid.vue:25,48,207-214`

The parent threads a colour per phase — `slider-color="var(--accent-red)"` (Settle Out, `:31`),
`"var(--accent-pink)"` (Morph, `:41`), `"var(--accent-red)"` (Settle In, `:51`) — landing as
`:style="{ '--track-color': sliderColor ?? 'var(--accent-red)' }"` (`MorphPhaseConfig.vue:29`) and consumed by a
five-line hook duplicated byte-for-byte in two files:

```
--slider-scrub-range-bg:       color-mix(in srgb, var(--track-color) 30%, transparent);
--slider-scrub-range-bg-hover: color-mix(in srgb, var(--track-color) 45%, transparent);
--slider-scrub-thumb-bg:       var(--track-color);
--slider-scrub-thumb-bg-hover: var(--track-color);
```

**No such custom properties exist.** The installed 4.0.0 dist defines and reads exactly ten slider knobs —
`--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`,
`--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`, `--slider-thumb-spring`,
`--slider-track-bg`, `--slider-track-height` — none with a `scrub` infix, none with a `-hover` arm. The live rule
is `.slider-range{background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)}`
(`dist/glass-ui.css`). So **all five sliders on `/morph` paint `var(--primary)`**: the red/pink/red phase coding —
the *only* thing tying the three config cards to the red/pink info-chips at `MorphShapePreview.vue:165-174` —
never renders. `sliderColor` (`MorphPhaseConfig.vue:85`) is dead API; three parent template lines are inert.

Two further arms: `--slider-scrub-thumb-bg` is **doubly** dead, because the `standard` variant's thumb paints
`width:0; opacity:0` by design (the "continuous glass cylinder, no visible thumb — you pull the TRACK" idiom,
`dist/components/ui/slider/index.d.ts` variant docs); and the `*-bg-hover` pair was never a token shape glass-ui
published in any version.

**F.W1 does NOT cure this.** 7.0.0 still reads `--slider-range-bg`/`--slider-thumb-bg`;
`grep -rho -- "--slider-[a-z0-9-]*" glass-ui/src/components/slider/` yields `range-bg range-blur range-origin
range-shadow target-floor thumb-bg thumb-border-color thumb-border-w thumb-hover-ring-color thumb-hover-ring-w
thumb-shadow thumb-size thumb-spring touch-target track-bg track-height vertical-size` — **no `scrub` member.**
The uplift *does* add the hover seat the dead pair was reaching for (`--slider-thumb-hover-ring-color`), so F.W1
improves the destination — but the rename is a fourier-side edit F.W1 must carry explicitly or the colour system
stays dead through the uplift.

**Falsifier.** Any `--slider-scrub-` occurrence in a stylesheet the app loads. Probes:
`grep -rn "slider-scrub" node_modules/@mkbabb/glass-ui/dist/` → **0**;
`grep -rn -- "--slider-scrub" ~/Programming/glass-ui/src/` → **0**. Verified both ends. (The sites' own comment —
*"A.W2.c — glass-scrubber per-instance retint hook"* — is the tell; `lane-frontend.md:382` already proved every
`glass-scrubber` **class** here is prose. The **properties** are prose too.)

**Ironic corollary, stated for the cure's sake.** Because the retint is dead the sliders paint `--primary`, which
measures **15.81:1 (light) / 6.93:1 (dark)** against the `--muted` track — *better* than the intended tints
(`--accent-red` 4.43:1 / 4.74:1; `--viz-chebyshev` 6.01:1 / 6.71:1). Curing D-2 as written **lowers** slider
contrast in light mode. The cure must pick a tint that clears WCAG 1.4.11's 3:1; all three intended colours do,
but the red only by 1.4×.

---

### D-3 · BLOCKER · `Button variant=… size="default"` breaks at 7.0.0 — 3 sites here, absent from the census **and from the producer's own migration doc** `[P1 + P2-NEW arm]`
`FourierMorphDemo.vue:71,75` · `HarmonicLevelGrid.vue:56-58`

Under the pin, `Button` is a CVA recipe with
`variant: default|solid|primary-audacious|gold-audacious|destructive|outline|secondary|accent|ghost|glass|glass-wash|ai|link`
and `size: default|xs|sm|lg|icon|icon-sm` (`dist/components/ui/button/index.d.ts`, `dist/button-BNDWhAZb.js`).
At producer HEAD the recipe is gone and the axis is renamed:

```
glass-ui/src/components/button/Button.vue:15-31
    export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
    export type ButtonSize     = Extract<Size, "xs" | "sm" | "md" | "lg">;
    export interface ButtonProps extends PrimitiveProps {
        emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
        iconOnly?: boolean;  loading?: boolean;  type?; disabled?; class?;   // NO `variant`
    }
```

`grep -rn "variant" glass-ui/src/components/button/` → **0**; `buttonVariants` is not exported anywhere in 7.0.0
src. So `variant="default"`/`"outline"` cease to be props and `size="default"` leaves `ButtonSize`; every one of
these buttons silently re-tiers to `emphasis:"secondary" tone:"neutral" size:"md"`.

**`[P2-NEW]` The producer's migration surface does not carry the rename.** `MIGRATION.md` mentions `emphasis` at
exactly two lines — `:167` and `:445` — both **type-level** rows (`ButtonVariants` → `ButtonProps` /
`ButtonEmphasis` / `ButtonSize`). `CHANGELOG.md` mentions it once (`:64`), the same row. There is **no per-prop
row** mapping `variant="default"` → `emphasis=…` or `size="default"` → `size="md"` — unlike the dock family,
which gets an explicit per-member table (`MIGRATION.md:931-946`). The census's break table `[FE §5]` inherits
that gap. This is the worst shape for a mechanical uplift: the *import* line passes (`./button ./slider ./select`
all survive at 7.0.0 — exports map checked), nothing greps as a removed subpath, and the producer doc that would
have caught it is silent.

`lane-frontend.md:213` counts **35 `@mkbabb/glass-ui/button` imports** repo-wide; if the `size="default"` idiom is
as uniform elsewhere as it is here, this is a repo-scale row, not a component row. Probe for F.W1's budget:
`grep -rn "<Button" web/src | grep -c 'variant=\|size="default"'`.

**F.W1 also IMPROVES here:** 7.0.0's `loading` (`Button.vue:26-27`, *"Marks an in-flight command and suppresses
activation until it settles"*) is the exact missing affordance for D-7 and D-9.

**Falsifier.** A `variant` prop, a `"default"` member of `ButtonSize`, or a compat shim at 7.0.0. All three
checked against `Button.vue`, `index.ts`, `styles.css` — none. Verified.
**UNPROVEN-NEEDS-LIVE (SS-13)** for *which* failure mode results — a hard `vue-tsc` error on excess props, or a
silent DOM fallthrough attribute. Probe: run `vue-tsc -b` against a 7.0.0 install. The re-tiering happens either way.

---

### D-4 · BLOCKER · The duration slider is starved to ≈0 px by its own row furniture, at exactly the breakpoint that creates its layout `[P2-NEW]`
`MorphPhaseConfig.vue:7-31, 142-146, 156-159, 167-168, 205-206` · `FourierMorphDemo.vue:258-269` · `style.css:40-50`

`.duration-row` puts `<label>Duration</label>` + `[number input + "ms" unit]` + `<Slider>` on **one flex line**
(`gap: 0.5rem`). The slider is the only elastic member (`.duration-slider-track { flex: 1 }` = `1 1 0%`); the
label is `white-space: nowrap` (so its automatic minimum size is the full string) and `.num-input` is a fixed
`width: 3.5rem`. That row lives inside a **3-column** grid (`FourierMorphDemo.vue:264-269`) in a `max-width: 960px`
page. Every term below is a literal in the tree; `rem` = the `html` font-size from `style.css:40-50` — **18 px
below 768 px, 16 px at/above** (this is the D-m7 seam doing real damage).

| viewport | page content box | column | card content (`.config-card` pad `1rem 1.25rem`) | fixed furniture | **slider** |
|---|---|---|---|---|---|
| 640 px | 640 − 2·36 = 568 | (568 − 2·18)/3 = 177 | **132** | ≈172 | **0 — the row overflows the card** |
| 700 px | 628 | 197 | **152** | ≈172 | **0 — overflows** |
| 768 px (root → 16) | 704 | 224 | **184** | ≈153 | ≈31 px |
| ≥960 px (capped) | 896 | 288 | **248** | ≈153 | ≈95 px |

The only estimated term is the rendered width of the literal string `Duration` in `var(--font-serif)` (Computer
Modern Serif) — 62-72 px. **The conclusion is robust to ±20 px on it**: the input group alone (`3.5rem` input +
`0.125rem` gap + `ms` at `text-sm` + two `0.5rem` row gaps ≈ 90 px) already leaves < 120 px at every viewport and
< 45 px below 768 px. And glass-ui 4's `standard` slider is precisely the **no-visible-thumb, pull-the-track**
idiom — so a ~30 px track carrying `min=50 max=800 step=10` (76 stops) is not a degraded control, it is **no
control**: ≈0.4 px per step on the idiom whose entire affordance *is* the track's width.

The diagnosis is specific, not a blanket layout complaint: `HarmonicLevelGrid`'s structurally identical
`.level-row` (`:6-27`, `:166-178`) sits in a **full-width** card and yields ≈450 px of slider at 640 px. The
defect is the decision to put a slider inside a one-third column beside a nowrap label and a fixed-width input —
i.e. it is a *proportion* judgement, which is this axis.

**Falsifier.** Measure `getComputedStyle($0).width` on `.duration-slider-track` at 640 / 700 / 768 / 960 px. If it
exceeds ~120 px at any of them the arithmetic is wrong and the row dies.
**UNPROVEN-NEEDS-LIVE (SS-13)** for the exact pixels and for whether ≤768 px renders as overflow or label clipping.
**The structural claim — slider = card content − ~150-172 px of incompressible furniture — is static-provable and
needs no probe.**

---

### D-5 · BLOCKER · Three tiles are identical by construction and the High control's top half is dead — the strip lies about Fourier convergence `[P1 · PROMOTED MAJOR→BLOCKER by this pass]`
`HarmonicLevelGrid.vue:40-49, 53-83` · `useMorphConfig.ts:27-39` · `lib/svg-fourier.ts:125-131` · `useFourierMorph.ts:59-68, 92-93, 173-175`
*(pass-1 id: D-15)*

`computePreviewLevels` seeds a hard-coded candidate list — `[1,2,3,5,8,12,18,25,35,50,75,100]`
(`useMorphConfig.ts:30`) — and takes **no shape argument** (signature `(lowLevel, highLevel)`). Both shipped
shapes stop at 50: `sun.json`/`moon.json` carry `levels = [1,2,3,5,8,12,18,25,35,50]` with `partial_sums` keyed
`"1".."50"` (read from the JSON). And `interpolateAtHarmonicLevel` clamps unconditionally:

```
svg-fourier.ts:130-131   const maxLevel = levels[levels.length - 1];              // 50
                         const clamped  = Math.max(levels[0], Math.min(maxLevel, harmonicLevel));
```

So `getPath(50) === getPath(75) === getPath(100)` and the strip ends in **three pixel-identical tiles labelled
`n=50`, `n=75`, `n=100`** — on first paint, with no interaction required. Three consequences from one clamp:

1. **The High slider's declared range is half inert.** `:max="100"` (`:44`); dragging 51→100 changes the label and
   nothing else.
2. **Two tiles are structurally un-highlightable.** `activeLevel` comes from
   `nearestLevel(currentShape.value.data.levels, …)` (`FourierMorphDemo.vue:115-120`), whose domain is the
   **shape** ladder `[1…50]`, while the grid iterates `previewLevels` (`:60`). The two domains are already crossed
   at the prop boundary (`:60,61`).
3. **Dead time at the head of every morph** when `highLevel > 50`: the settle-out ramp
   (`useFourierMorph.ts:173-175`) spends its first `(highLevel−50)/(highLevel−lowLevel)` re-rendering the same
   clamped path.

**Why this pass promotes it to BLOCKER.** Pass 1 rated it MAJOR, reasoning as a control defect. Read as a
*design* artefact it is a **truth defect on the product's own thesis**: a Fourier-analysis site whose teaching
surface renders "more harmonics ⇒ more fidelity" and then presents three identical glyphs as three further steps.
It is visible on first paint, needs no interaction, and misinforms in the product's own idiom. On this axis that
outranks a control-range bug. *Mitigation on record:* `DEFAULT_MORPH_CONFIG.highLevel = 50` (`useFourierMorph.ts:64`)
exactly equals the ceiling, so the **animation** is honest out of the box — the **grid** is not.

**Falsifier.** A shape asset with levels above 50, or a preview list derived from `shape.data.levels`. Neither:
both JSONs verified; `computePreviewLevels` takes no shape. Verified.

---

## §2 · MAJOR (16)

### D-6 · MAJOR · `.is-bound` overpaints `.active` — in the default state the active ring is invisible `[P1, id D-5]`
`HarmonicLevelGrid.vue:251-259` · defaults `useFourierMorph.ts:59-68` · `useMorphConfig.ts:27-39`

```
251  .grid-cell.active   { border-color: var(--accent-red); box-shadow: 0 0 0 2px  …accent-red…; }
256  .grid-cell.is-bound { border-color: #60a5fa;           box-shadow: 0 0 0 1.5px …blue…; }
```

Equal specificity (`0,2,0` + the same scope attribute); `.is-bound` is declared **later**, so it wins whenever a
tile is both. That is the boot state, deterministically: `DEFAULT_MORPH_CONFIG.highLevel = 50`;
`onMounted → setShape(sunShape)` sets `harmonicLevel = 50` (`useFourierMorph.ts:92`); `nearestActiveLevel =
nearestLevel(sun.levels, 50) = 50`; `previewLevels` contains 50. On first paint the active tile *is* a bound tile
and its red ring is overpainted blue.

**Falsifier — and it partially bites, which is why this is MAJOR not BLOCKER.** `<span class="grid-label">` takes
`grid-label-active` independently (`:76-81, 281-284`) giving `color: var(--accent-red); font-weight: 600` — a real
fallback, and the weight change is a non-colour channel, so WCAG 1.4.1 is satisfied. What collapses is the 2 px
ring that reads at grid scale; the surviving label is 14-15.75 px mono at the foot of a 48-64 px tile — and in
dark mode that label itself fails AA (D-21).

### D-7 · MAJOR · Phase chips fail WCAG AA for normal text (3.91:1 and 3.43:1 vs 4.5:1) `[P1, id D-6]`
`MorphShapePreview.vue:147-174`

Light arm, `--accent-red = oklch(0.574 0.216 27.5)`, `--accent-pink = oklch(0.613 0.197 353.8)`
(`tokens/light-dark.css:140-142`), chip background = the 12 % mix composited over `--background`:

| chip | light | dark | required |
|---|---|---|---|
| `.info-chip.morph` (pink on pink-12 %) | **3.43:1 ✗** | 5.71:1 ✓ | 4.5:1 |
| `.info-chip.settle-out` / `.settle-in` (red on red-12 %) | **3.91:1 ✗** | 4.94:1 ✓ | 4.5:1 |
| `.info-chip` neutral (`--foreground` on muted-60 %) | 16.21:1 ✓ | 14.74:1 ✓ | — |

The two failing chips are exactly the ones carrying live state: **contrast falls as the information becomes more
important.**

**Falsifier — checked, does not save it.** The "large text" exemption needs ≥18.66 px **bold** or ≥24 px; these are
`text-sm` (0.875 rem) below 640 px / `text-base` at ≥640, weight **500** — 15.75 / 18 / 16 px across the three type
tiers, normal text on all of them. The 12 % wash raises the backdrop luminance, so the tint makes it worse, not
better. No `--accent-*` override exists in fourier's cascade (`grep -rn -- "--accent-red\s*:" web/src/` → 0; the
only token overrides at `style.css:119-127` are `--viz-amber`/`--section-color-5`). Verified by computation.

### D-8 · MAJOR · The engine-load gap: `disabled` lies, a second click double-fires, no loading state `[P1, id D-7]`
`FourierMorphDemo.vue:127-135` · `useFourierMorph.ts:145-169`

```
FourierMorphDemo.vue:128   if (isAnimating.value) return;      // isAnimating = phase !== "idle"  (:113)
FourierMorphDemo.vue:132   isMoon.value = !isMoon.value;       // flips BEFORE any await
FourierMorphDemo.vue:134   await morph.morphTo(from, to);
useFourierMorph.ts:149         const Animation = await getAnimationCtor();   // dynamic import()
useFourierMorph.ts:169         phase.value = "settle-out";                   // ONLY here does isAnimating go true
```

Between the click and the resolution of `loadAnimationEngine()` (a real network chunk on first use —
`useFourierMorph.ts:33-44` documents the deliberate lazy boundary), `phase` is still `"idle"`, `isAnimating` is
`false`, and `:disabled="isAnimating"` (`FourierMorphDemo.vue:18`) leaves the button live. A second click passes
the guard, **flips `isMoon` back**, and starts a second concurrent `morphTo` — two chains writing
`currentPoints`/`phase`, with `stopAnim()` racing them (and unable to help: `currentAnim` is still `null`).
Meanwhile `isMoon` flipped at `:132` makes `currentShapeName` (`:103`) render **"Moon" while the SVG still draws
the Sun** — the page's only textual statement about what it shows is wrong for the whole fetch window. There is
no spinner, no skeleton, no `aria-busy`, no dimming: the loading state of the page's only action is *visually
indistinguishable from idle*.

**Falsifier.** A guard firing before the await (a `pending` ref, an early `phase` write, a `disabled` bound to
something other than `phase`). `isAnimating` derives solely from `phase` (`:113`); `phase` is first written at
`useFourierMorph.ts:169`, strictly after the await at `:149`. Verified.
**UNPROVEN-NEEDS-LIVE (SS-13)** for whether the second click lands in practice: throttle to Slow-3G, click twice
inside the chunk fetch, assert `isMoon` and the drawn path disagree. The structural defect (no loading state at
all, plus the optimistic-label lie) is proven statically.
**F.W1 improves:** 7.0.0 `Button.loading` is the exact seat.

### D-9 · MAJOR · No reduced-motion gate on the morph itself; glass-ui's blanket covers only CSS `[P1, id D-8]`
`useFourierMorph.ts:145-213` · counter-evidence `router/index.ts:15-17`

```
grep -rn "prefers-reduced-motion\|reducedMotion" src/components/morph/ \
  src/composables/useFourierMorph.ts src/composables/useMorphConfig.ts \
  src/components/decorative/FourierMorphSvg.vue   →   0 hits
```

The morph is a rAF chain (`keyframes.js`, `useWAAPI:false`, `useFourierMorph.ts:127-133`) mutating
`currentPoints` every frame for `settleOutMs + morphMs + settleInMs` — 350 ms default, **up to 2 400 ms** at the
slider ceiling (3 × 800 ms, `MorphPhaseConfig.vue:24-25`), and reachable with `ease-in-out-back` overshoot
(`lib/easings.ts:34-36`). It is spatial, continuous, and it is the route's whole point (WCAG 2.3.3).

**Falsifier — this one materially narrowed the claim, and the narrowing is carried forward.** glass-ui ships a
global PRM blanket (`dist/styles/utilities/a11y-overrides.css:6-31`, re-verified this pass):
`*:not([data-allow-motion]){ animation-duration:.01ms!important; transition-duration:.1s!important;
transition-property: opacity,color,background-color,border-color,box-shadow !important }` plus a
`[data-allow-motion]` arm that snaps those too. Because `transform`/`translate` are **absent from that
transition-property list**, every CSS transition in these files is neutralised — the hover scales snap, which is
correct. **So the naive "everything here is ungated" claim is FALSE and is not made.** What the blanket cannot
reach is JS writing geometry directly: `morphTo` runs identically under `prefers-reduced-motion: reduce`. The
correct behaviour — jump to `setShape(to)` — is one branch, and **the idiom already exists in this tree**:
`router/index.ts:15-17` `const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches`.
It is declined at the one component that most needs it. Extends `[FE §8]` from two rAF clocks to a third.

### D-10 · MAJOR · No error state anywhere, and the producer's error channel is explicitly declined `[P1, id D-9]`
`useMorphConfig.ts:55-58, 69-75` · `FourierMorphDemo.vue:71-74` · `useFourierMorph.ts:38-44, 149`

1. **Clipboard.** `useClipboard({ resetMs: 2000 })` is constructed without `onCopyError`, and `copyToClipboard()`
   calls `copy(toJSON())` discarding the returned `Promise<CopyResult>`. The producer's own contract
   (`dist/composables/dom/useClipboard.d.ts`) says `{ ok: false, reason }` names the failed channel —
   `clipboard-api` / `exec-command` / `no-api` (e.g. a non-secure-context deploy) — *"the failure is REPORTED,
   never silently swallowed"*. On failure `copied` stays `false`, the label stays **"Export"**, and the only
   signal is the absence of a change the user may not be watching for. `<Toaster/>` is mounted (`App.vue:29`) and
   `composables/useToast.ts` exists — the channel is there and unused.
2. **Engine chunk.** If `loadAnimationEngine()` rejects (stale-hash 404 after a redeploy — the canonical failure
   for a lazily-imported chunk), `morphTo` rejects, `handleToggle` is `async` with no `try`/`catch` and no caller
   awaiting → unhandled rejection. `isMoon` has *already* flipped, so the chip reads "Moon" while the SVG draws
   Sun; `phase` stays `"idle"` forever; the button stays enabled and permanently inert. And
   `useFourierMorph.ts:38-44` assigns `enginePromise` **before** the promise settles and never clears it on
   rejection — the rejected promise is **memoised**, so every subsequent click re-rejects. No retry, no message,
   no degraded path.

**Falsifier.** A `try`/`catch`, an `onCopyError`, an error ref, a `v-if="error"` branch, or a `.catch()` on either
site. `grep -n "catch\|onErrorCaptured\|error" FourierMorphDemo.vue useMorphConfig.ts useFourierMorph.ts` → **0**.
Verified.

### D-11 · MAJOR · Eight unlabeled controls: `<label>` with no `for`, not wrapping `[P1, id D-10 — with a correction]`
`MorphPhaseConfig.vue:9-19, 35-39` · `HarmonicLevelGrid.vue:7-16, 30-39`

| label | file:line | control it visually names |
|---|---|---|
| `Duration` ×3 | `MorphPhaseConfig.vue:9` | `<input type="number">` `:10-18` |
| `Easing` ×3 | `MorphPhaseConfig.vue:35` | `<SelectTrigger>` `:37-39` |
| `Low` | `HarmonicLevelGrid.vue:7` | `<input type="number">` `:8-16` |
| `High` | `HarmonicLevelGrid.vue:30` | `<input type="number">` `:31-39` |

No `for`, no `id`, no wrapping — inert `<label>` elements, decorative text. `MorphPhaseConfig` is instantiated 3×
(`FourierMorphDemo.vue:26,36,46`) → 6 nameless controls, plus Low and High = **8** (axe `label` / `select-name`,
WCAG 1.3.1 + 4.1.2). A screen reader hears "spin button, 150" three times with nothing distinguishing Settle Out
from Morph from Settle In.

**Falsifier — checked, and it saves only the sliders.** The five `Slider`s *do* carry `aria-label` and glass-ui
4.0.0 forwards `$attrs["aria-label"]` onto the `role="slider"` thumb (`dist/slider-DQ95MET2.js`, the `SliderThumb`
render) — genuinely named (S-2). The number fields and the `Select`s are not, and no `aria-labelledby` points at
the `<label>`s.

**`[P2-NEW]` CORRECTION to pass 1.** Pass 1 said the `LabeledField` cure *arrives* at 7.0.0. It is available
**at the pin**: `node_modules/@mkbabb/glass-ui/dist/components/custom/labeled-field/index.d.ts` exports
`LabeledField`/`LabeledInput`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch` today, and `LabeledSlider.vue.d.ts`
takes `{ modelValue: number; label: string; tooltip; min; max; step; required?; hideLabel? }` — a **scalar**,
which also retires all three array adapters (m-17). At 7.0.0 the family is an explicit **"Survivor — do not
migrate"** (`CHANGELOG.md:42-44`) and gains full `controlId`/`labelledBy`/`describedBy`/`errorId` wiring
(`glass-ui/src/components/labeled-field/LabeledSlider.vue:26-48`). This is not deferred work; it is available now.
See D-18.

### D-12 · MAJOR · Three sliders share one identical accessible name; the card heading is not associated `[P2-NEW]`
`MorphPhaseConfig.vue:2-3, 27` · `FourierMorphDemo.vue:26-54`

`MorphPhaseConfig.vue:27` hard-codes `aria-label="Duration (ms)"`, and the parent mounts three instances
(`Settle Out` / `Morph` / `Settle In`). A screen-reader user therefore meets **three sliders whose names are
byte-identical**, with nothing to disambiguate them: the `<h3>` at `:3` is referenced by no `aria-labelledby`, and
`.config-card` is a bare `<div>` (`:2`) — no `role="group"`, no `<fieldset>/<legend>`. **The visual grouping that
makes the page legible to sighted users has no programmatic counterpart.**

This **narrows pass-1 superlative S-2**, which certified the slider naming without checking uniqueness. The labels
reach the right element (S-2 stands on that point) but they do not *identify* the control. Fix is one
interpolation (`:aria-label="\`${title} duration (ms)\`"`) plus a group role.

**Falsifier.** A `title` interpolation in the `aria-label`, or a group role on the card, or a heading association.
None present in `MorphPhaseConfig.vue`. Verified.

### D-13 · MAJOR · Four glass surfaces hand-rolled whose seats ship **at the current pin** `[P2-NEW]`
*(this is the row the census's break table cannot see)*

| hand-rolled | file:line | seat in the **installed 4.0.0** | seat at 7.0.0 |
|---|---|---|---|
| `.info-chip` ×8 (phase / `n=` / shape / `ms`) | `MorphShapePreview.vue:13-43, 147-174` | `./badge`, `./metric-badge`, `./metric-cell`, `./metric-stack` | `./metric` (`Metric`/`MetricCell`), `./chip` |
| label + control rows ×5 | `MorphPhaseConfig.vue:7-31, 34-60`; `HarmonicLevelGrid.vue:6-50` | **`./labeled-field`** (`LabeledSlider` takes a scalar) | same — `CHANGELOG.md:42-44` "Survivor" |
| `<input type="number">` ×5 + 20 lines of spin-button CSS, duplicated across two files | `MorphPhaseConfig.vue:10-18, 167-186`; `HarmonicLevelGrid.vue:8-16, 31-39, 180-200` | `./number-field` (`NumberField` + `Content`/`Input`/`Increment`/`Decrement`) | `./number-field` |
| horizontally-scrolling 12-tile strip with no scroll affordance | `HarmonicLevelGrid.vue:53-83, 218-226` | `./fading-scroll` (`FadingScroll`, `useFadingScroll`) | `./fading-scroll` |

All four keys verified present in the installed package's own export map
(`node -e "console.log(Object.keys(require('./package.json').exports))"` → `… ./metric-badge ./metric-cell
./metric-stack ./badge ./labeled-field ./number-field ./fading-scroll …`). **These are conformance defects
today, not uplift work.**

**Why this deserves its own row rather than folding into D-14.** The census books `metric-badge → ./metric` as a
7-file break `[FE §5]`, addendum C-4. **This component is the inverse case**: it does not import `metric-badge`,
it re-implements it eight times. The F.W1 sweep greps for the import and will not find these chips, so they
survive the uplift as a permanent local fork unless F.W3 books them explicitly. Same shape for the other three
rows. This directly contradicts `[FE §3]`'s "deepest, cleanest consumer" *for this route* — and the lane's shadow
ledger `[FE §4]` lists none of the four.

### D-14 · MAJOR · Three glass `Button`s re-skinned to the metal; the emitted `data-variant`/`data-size` then lie `[P1, id D-11]`
`FourierMorphDemo.vue:286-329` · `HarmonicLevelGrid.vue:228-259`

Vue SFC `<style scoped>` is **unlayered**; Tailwind v4 utilities live in `@layer utilities`, and glass-ui's
component-utility rules ship unlayered at `0,1,0` (`dist/styles/components.css`, `grep -c "@layer"` → 0). A scoped
`.btn-export[data-v-…]` is `0,2,0` **and** unlayered, so it beats everything the recipe contributes:

| recipe contribution (4.0.0) | overridden by | outcome |
|---|---|---|
| `btn-pill` → `border-radius: var(--radius-pill)` | `border-radius:.5rem` (`:290`, `:314`, `HLG:233`) | pill geometry gone |
| `variant:"default"` → `glass-wash btn-glass` | `background: var(--foreground)` (`:293`) | glass tier gone; flat solid |
| `text-[length:var(--control-text)]` | `@apply text-base` (`:296`, `:321`) | control type scale gone |
| `font-medium` | `font-weight:600` / `500` (`:297`, `:322`) | weight axis gone |
| `active:scale-(--scale-press-btn)` | `.btn-export:active{transform:scale(.97)}` (`:306-308`) | the token hardcoded to `.97` |
| `px-4 py-2 has-[>svg]:px-3` | `padding:.5rem 1rem` (`:289`, `:313`, `HLG:232`) | responsive padding gone |

The component still emits `data-variant="default"` / `data-size="default"` (the 4.0.0 `Button` forwards both onto
the host), so **the DOM advertises a design-system tier it does not render** — hostile to any future
visual-regression or token audit keyed on those attributes. This is the `feedback_glass_ui_first_class` inversion:
the variant is used as a *hook to override*, not as a choice. It is also why D-3 is nearly invisible — the paint
is local, so the 7.0.0 re-tier produces no obvious visual signal.

**Falsifier.** If scoped CSS lost to the utilities the overrides would be no-ops and the buttons would render
glass. It does not: unlayered always beats layered regardless of specificity, and `components.css` carries no
`@layer`. Verified. **Survivor:** `focus-ring` is untouched by any scoped rule (no `outline`/`box-shadow` on
`.btn-export`/`.btn-reset`), so keyboard focus still renders — the one recipe contribution that survives.

### D-15 · MAJOR · `.grid-cell` keeps the recipe's fixed control height while stacking ~2× that in content `[P1, id D-12]`
`HarmonicLevelGrid.vue:54-58, 228-240, 261-272`

`<Button … size="default">` contributes `h-(--control-h-md)` and `.grid-cell` never declares `height`, so the
fixed height survives while the scoped rule turns the button into a centred column of `svg (48 px / 64 px ≥640) +
gap .125rem + label (text-sm) + padding .375rem×2 + border 1.5px×2`.
`--control-h-md = max(2.5rem × var(--ui-scale), var(--control-floor))` (`tokens/offsets-sizing.css:151`);
`--ui-scale: 1` fine-pointer, **1.5** on `(pointer: coarse)` with `--control-floor: 2.75rem`
(`tokens/light-dark.css:19-20`). Root font is `1.125rem` below 768 px.

| context | `--control-h-md` | content height | overflow |
|---|---|---|---|
| phone, coarse (<640) | 3.75rem ≈ **67.5 px** | ≈ **89 px** | ≈22 px, split top+bottom |
| laptop, fine (≥640, <768) | 2.5rem ≈ **45 px** | ≈ **101 px** | ≈56 px |

`btn-pill` supplies `justify-content:center`; `.grid-cell` supplies `flex-direction:column;align-items:center` and
no `justify-content`, so the stack centres and spills **both** edges. `size="default"` is the wrong axis for a
tile — a tile is not a control-height command. (The top spill compounds D-20's clip.)

**Falsifier, and it is the honest one.** This needs the JIT arbitrary utility `h-(--control-h-md)` emitted in the
consumer's build. glass-ui backstops that with `@source "../*.js"` (`dist/styles/index.css:222`) over the compiled
chunks that carry the recipe strings, and `button-BNDWhAZb.js` does contain the literal. Emission could **not** be
confirmed from the checked-in build: `web/dist/` is gitignored and stale (Jun 12), predates the glass-ui 4.0.0
install, and contains 0 occurrences of `control-h-md`/`--ui-scale`/`--control-floor`/`--ui-glyph` — it proves
nothing either way. No rebuild was performed (the law permits one write).
→ **UNPROVEN-NEEDS-LIVE (SS-13):** load `/morph`, read `getComputedStyle($0).height` on a `.grid-cell`; if it
equals `--control-h-md` the overflow is live. **The conformance half needs no probe** — `size="default"` on a
48-64 px column tile is wrong regardless, and F.W1 (which makes `size` default to `"md"`, D-3) re-rolls the dice.

### D-16 · MAJOR · `.btn-icon` pins the lucide glyphs off-token at 15 px `[P1, id D-13]`
`FourierMorphDemo.vue:72, 76, 280-284`

`.btn-icon { width:15px; height:15px; flex-shrink:0 }`. The recipe sizes button glyphs
`[&_svg:not([class*=size-])]:size-(--ui-glyph)` with `--ui-glyph = calc(1rem * var(--ui-scale))`
(`tokens/offsets-sizing.css:177`) → 18 px fine-pointer at the mobile root, **27 px** coarse. `.btn-icon` contains
no `size-` substring, so the arbitrary variant targets it — and the scoped unlayered rule pins it to 15 px, which
is off every scale in the system (not a rem multiple, not 4-aligned, not a token). On a phone the button height
obeys the 44 px touch floor while its icon stays 15 px — an optical mismatch that *grows* with `--ui-scale`,
precisely the axis `--ui-glyph` exists to keep in lockstep. Same emission caveat as D-15 for the utility; the
**off-token pin is unconditional** and is the finding.

### D-17 · MAJOR · The level sliders are tinted `#888888` — `cssVarToHex` has no `oklch()` arm `[P1, id D-14]`
`HarmonicLevelGrid.vue:25, 48` · `lib/colors.ts:22-53, 90-96` · `App.vue:10-18`

`:style="{ '--track-color': VIZ_COLORS.chebyshev }"`. `resolveVizColors()` (called at `App.vue:11` and on every
theme flip via the `MutationObserver`) sets `VIZ_COLORS.chebyshev = cssVarToHex("--viz-chebyshev")`. That function
has exactly four arms — hex `:29`, `hsl()` `:31-36`, bare-HSL triplet `:39-42`, `rgb()` `:45-50` — and a
`return "#888888"` fallthrough at `:52`. glass-ui 4.0.0 ships
`--viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4))`
(`tokens/light-dark.css:146`, after `tokens/color-radius.css:264`), and the property is **not**
`@property`-registered (`tokens/property-regs.css` registers only progress/phase/specular/glass-level/ui-scale),
so `getComputedStyle().getPropertyValue()` returns the unparsed token text. → **`#888888`, both themes, no theme
adaptation.**

The internal proof is in fourier's own file: `style.css:119-127` re-declares `--viz-amber` as `hsl(35 76% 35%)`,
which **does** parse — so `VIZ_COLORS.amber` works while `fourier`, `chebyshev` and `legendre` silently resolve
grey. Folds `lane-docs.md:398-403` and extends it from a W.L5 *deletion target* to a live rendering consequence at
a named call site. **Moot in practice only because D-2 makes the value unread — the two defects mask each other,
and curing D-2 alone ships grey sliders.**

### D-18 · MAJOR · The strip's top edge clips the active ring, the hover lift and the focus ring `[P2-NEW — kills pass-1 S-4]`
`HarmonicLevelGrid.vue:218-226, 242-259` · recipe `focus-ring` via `dist/button-BNDWhAZb.js`

```
.grid { display:flex; gap:.5rem; overflow-x:auto; overflow-y:hidden; padding-bottom:.375rem; … }
```

**Zero top padding.** Per CSS Overflow, `overflow-x: auto` with `overflow-y: hidden` makes both axes non-visible,
so the clip is at the padding box. The tiles' outward decorations all exceed 0: `.grid-cell.active
{ box-shadow: 0 0 0 2px }` (`:251-254`), `.grid-cell.is-bound { box-shadow: 0 0 0 1.5px }` (`:256-259`),
`.grid-cell:hover { transform: scale(1.04) }` ≈ +1.0-1.3 px on a 48/64 px tile (`:242-245`), and the `focus-ring`
the Button recipe contributes (the one recipe survivor per D-14). **The top 2-3 px of every one of them is cut** —
including the ring that is the sole signal of which tile is live, the same affordance D-5 already renders
unreachable for two of the twelve tiles and D-6 already overpaints in the default state.

**This kills pass-1 superlative S-4** ("an honest horizontal scroller"), which credited the `padding-bottom`
gutter for keeping the scrollbar off the tiles. The gutter is real and one-sided; the decorations are two-sided.
S-4 is withdrawn in §5; what survives of it (real `<Button>`s ⇒ keyboard reachability + auto-scroll-into-view) is
re-minted as S-4′.

**Falsifier.** `padding-top ≥ 3px` on `.grid`, `overflow-y: visible` (impossible alongside `overflow-x: auto`), or
inward rings (`box-shadow: inset`). None. Verified.
**UNPROVEN-NEEDS-LIVE (SS-13)** for the exact clipped pixel count.

### D-19 · MAJOR · `#60a5fa` fails WCAG 1.4.11, and the same widget focuses in two different colours `[P1, id D-4 + P2-NEW arm]`
`HarmonicLevelGrid.vue:202-205, 256-259` · `MorphPhaseConfig.vue:188-191`

```
.level-input:focus  { border-color:#60a5fa; box-shadow:0 0 0 2px rgba(96,165,250,.15); }
.grid-cell.is-bound { border-color:#60a5fa; box-shadow:0 0 0 1.5px rgba(96,165,250,.2); }
.num-input:focus    { border-color: var(--accent-red); box-shadow:0 0 0 2px …accent-red 12%…; }
```

Computed against the light-arm tokens `--background = hsl(40 30% 98%)` and `--card = hsl(36 48% 97%)`:

| pair | ratio | required | verdict |
|---|---|---|---|
| `#60a5fa` vs `--background` | **2.45:1** | 3:1 (1.4.11 / 2.4.11) | **FAIL** |
| `#60a5fa` vs `--card` | **2.40:1** | 3:1 | **FAIL** |
| `--accent-red` vs `--card` | 4.62:1 | 3:1 | pass |

Three arms. (1) **Colour-only state**: `is-bound` is the sole indication of which two tiles are the low/high
bounds — `:60-63` sets only classes; no `aria-pressed`, `aria-current`, glyph, shape, weight or label change
(WCAG 1.4.1). (2) **Contrast**: both `#60a5fa` uses fail the non-text floor in light mode. (3) **`[P2-NEW]`
Register divergence**: `.num-input` and `.level-input` are the *same widget rendered from copy-pasted CSS*
(m-17) yet focus in different colours, one conformant and one not — and neither uses the published focus register
(`focus-ring` / `--focus-ring-shadow`, which the shipped `.glass-slider:focus-within .slider-track` rule does use).
`#60a5fa` is also the only raw hex in files otherwise running on tokens, so it neither adapts to dark mode nor
answers any theme override — and it is **not** the blue the component's own sliders reach for
(`--viz-chebyshev` ≈ `#3156b9` light / `#88a1e7` dark; see D-17 for why even that resolves grey).

**Falsifier.** A different resolved `--background`/`--card`, or a second non-colour channel on `is-bound`, or a
shared focus rule elsewhere. Checked: the light arm is `tokens/color-radius.css:40,72`, overridden by nothing in
fourier's `style.css` (which re-tints only `--viz-amber`/`--section-color-5`); `style.css:136-143`'s global
`:focus-visible` ring is scoped to four named paper/gallery classes, none of which applies here. Verified.

### D-20 · MAJOR · Dark-mode active grid label fails AA `[P2-NEW]`
`HarmonicLevelGrid.vue:274-284`

`.grid-label-active { color: var(--accent-red); font-weight: 600 }` on `.grid-cell`'s `background: var(--card)`
(`:236`) measures **4.07:1 in dark** (light passes at 4.62:1). `.grid-label` is `text-sm` = 15.75 / 14 px at
weight 600 — below the 18.66 px-bold large-text threshold, so 4.5:1 applies.

This matters more than a lone chip: per D-6, the label is the **fallback** channel that keeps the active state
legible when `.is-bound` overpaints the ring. In dark mode the fallback itself is sub-AA. (The same token pairing
at `.grid-svg`'s `stroke="var(--accent-red)"` (`:70`) is non-text, needs 3:1, and passes.)

**Falsifier.** A larger computed size, a bolder weight crossing 18.66 px, or a different backdrop. `.grid-cell`
fixes `background: var(--card)`; the size is `text-sm` at both roots. Verified.

### D-21 · MAJOR · The hero card's cartoon lift snaps while its shadow eases — a `transition` shorthand drops `translate` `[P1, id D-16]`
`MorphShapePreview.vue:91-98` · `dist/styles/cards.css` `@utility cartoon-surface`

`cartoon-surface` (the recipe behind fourier's `.cartoon-card` shim, `style.css:107-111`) animates the lift on the
**`translate` longhand**, deliberately (re-verified this pass):

```
@utility cartoon-surface {
    border-width: 2px;  box-shadow: var(--shadow-cartoon-md);
    translate: 0;
    transition: translate var(--duration-normal) var(--spring-smooth),
                box-shadow var(--duration-normal) var(--ease-standard);
    &:hover:not(:disabled){ translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg); }
}
```

`.morph-button` then replaces that whole list with a shorthand that omits `translate`:
`transition: border-color .2s ease, box-shadow .2s ease, transform .15s ease` (`MorphShapePreview.vue:97`).
Scoped, unlayered, `0,2,0` → wins. The hover still *applies* `translate: var(--lift-sm)` (that comes from the
utility's `:hover` block, untouched) but with no transition entry it **jumps instantly**, while `box-shadow` eases
over 0.2 s. The signature cartoon lift de-syncs — card teleports, shadow follows — on the largest element on the page.

**Falsifier — and the file contains its own control.** If the mechanism were wrong, `.config-card` and
`.levels-card` (also `.cartoon-card` hosts) would break identically. They do **not**, because neither declares
`transition` at all (`MorphPhaseConfig.vue:110-118`, `HarmonicLevelGrid.vue:137-147`), so they inherit the
utility's list intact and lift correctly. One site breaks, two prove the mechanism. Verified. The obvious *wrong*
version of this claim — that `transform: scale(1.02)` (`:111`) clobbers the lift — is **FALSE** and is not made:
`cartoon-surface` uses the `translate` longhand precisely so the two compose.

### D-22 · MAJOR · Motion-token bypass: 7 `transition` declarations, 0 tokens `[P1, id D-17]`
`FourierMorphDemo.vue:299, 323` · `MorphShapePreview.vue:97` · `MorphPhaseConfig.vue:178` · `HarmonicLevelGrid.vue:192, 239, 278`

Every duration and easing in this subtree is a literal: `.15s` / `.2s` / `.1s`, `ease` / bare. The cascade already
carries `--duration-fast`, `--duration-normal`, `--ease-standard`, `--spring-smooth` (observably live — they
appear in the compiled `.btn-pill` and `.slider-*` rules). Consequences in severity order: (a) it is the direct
mechanism of D-21 — hand-writing the shorthand is what dropped `translate`; (b) three different hover durations
across four hover states of one page (`.2s` hero, `.15s` buttons/inputs, `.1s` tile press) with no rationale, so
the interaction rhythm has no hierarchy; (c) a producer-side motion retune moves the whole app and leaves `/morph`
behind. Verified by reading all seven declarations.

---

## §3 · MINOR (19)

**m-1 · Heading level skip.** `[P1]` `<h1>` (`FourierMorphDemo.vue:5`) → `<h3>` (`MorphPhaseConfig.vue:3`,
`HarmonicLevelGrid.vue:3`). No `<h2>` anywhere on `/morph`; the route renders `FourierMorphDemo` alone inside
`App.vue`'s `<main>` (`:26`) and `AppHeader` contributes no heading (`grep -n "<h1\|<h2" App.vue AppHeader.vue`
→ 0). axe `heading-order`, WCAG 1.3.1. Falsifier: an `h2` in the shell. None.

**m-2 · Machine identifiers as UI copy.** `[P1]` The status chip prints `phase` raw
(`MorphShapePreview.vue:14-16, 31-33`): the user reads `settle-out`, `settle-in`, `idle` — kebab-case enum members
from `useFourierMorph.ts:31`. The chips are also the only status surface and carry no `aria-live`, so state
changes are invisible to a screen reader even once named (D-1). Falsifier: a label map. None — contrast
`EASING_LABELS` (`lib/easings.ts:29-52`), which does exactly this correctly for the sibling concept.

**m-3 · Chip markup authored twice.** `[P1]` `MorphShapePreview.vue:13-26` (`desktop-info`) and `:30-43`
(`mobile-info`) are the same four chips duplicated verbatim, toggled by `display:none` at 640 px (`:124-145`) —
a `flex-direction` switch paid for in DOM. Four bindings kept in sync by hand, both trees mounted and patched on
every reactive tick. (`display:none` does remove the hidden copy from the a11y tree, so this is maintenance debt,
not a double-announcement bug — falsifier applied.)

**m-4 · "Export" does not export.** `[P1]` `FourierMorphDemo.vue:71-74` copies `JSON.stringify(config)` to the
clipboard. The word promises a file; the icon (`ClipboardCopy`) tells the truth; the label overrides the icon; the
success state says a third thing ("Copied"). Confirmation is visual-only and unannounced. (This is the `:is`
family intake **R3-10** tracks at `FourierMorphDemo:72`.)

**m-5 · The easing preview clips exactly where it matters.** `[P1]` `easingCurvePath` (`lib/easings.ts:115-127`)
maps `y = 18 − v·16` into a `0 0 40 20` box. The "Back" presets overshoot (`v ≈ 1.1` / `−0.1`) → `y ≈ 0.4` /
`19.6`; with `stroke-width="1.5"` (`MorphPhaseConfig.vue:52`) the stroke edge lands at `−0.35` and `20.35`.
`.easing-preview` sets no `overflow: visible` (`:198-202`) — unlike its sibling `FourierMorphSvg.vue:37-40`, which
does. So the overshoot lobes, the entire semantic difference between "Back Out" and "Ease Out", are the part that
clips. Falsifier: `overflow:visible` on `.easing-preview`, or an easing set without overshoot. Neither.

**m-6 · The action row breaks the page axis.** `[P1]` `.export-row { justify-content: center }`
(`FourierMorphDemo.vue:273-278`) under a left-aligned column whose header is left, whose stage is
`align-items: flex-start` at ≥640 (`MorphShapePreview.vue:77-82`), and whose cards are full-bleed. Two centred
buttons at the foot read as a modal footer on a document page.

**m-7 · Two breakpoint systems, 128 px apart.** `[P1]` All 14 media queries in the three files use
`min-width: 640px`; the app steps the **root font size** at 768 px (`style.css:40-50`, `1.125rem → 1rem`). Between
640 and 767 the layout is desktop and the type root is mobile. It also inverts the title: `.demo-title` goes
`@apply text-2xl` → `font-size: 2rem` at ≥640 (`:222-227`) = **36 px** at the 18 px root, then **32 px** once the
root drops at 768 — **the title shrinks as the viewport grows.** This is also the amplifier in D-4's worst band.
(Falsifier applied, and it killed a companion claim: Tailwind v4 line-heights are unitless ratios —
`--text-2xl--line-height: calc(2 / 1.5)`, `tailwindcss/theme.css:358` — so the hard `font-size` override does
**not** cramp the leading. Not claimed.)

**m-8 · Spinner-stripped number fields fall short of the AAA target size.** `[P1]` `.num-input`/`.level-input`
strip both webkit spin buttons and `-moz-appearance` (`MorphPhaseConfig.vue:179-186`, `HarmonicLevelGrid.vue:193-200`),
leaving a `3.5rem × ≈34.5px` field. That clears **WCAG 2.5.8 AA (24×24)** and fails **2.5.5 AAA (44×44)**;
glass-ui's coarse-pointer floor does not reach it — it targets `[data-size="icon"]`,
`.expandable-container__trigger`, `.segmented-tabs__trigger` only (`utilities/a11y-overrides.css:115-122`). MINOR
because the paired `Slider` is a fully-labelled `touch-hit-area`-equipped alternate path to the same value —
except in the three phase cards, where that alternate path is ≈0 px wide (D-4).

**m-9 · Control boundaries at ~1.3:1.** `[P1]` `.num-input`/`.level-input` border = `color-mix(--foreground 15%)`
on `--background` = **1.36:1** (dark 1.53:1); `.grid-cell` border = `color-mix(--foreground 12%)` on `--card` =
**1.28:1** (dark 1.40:1); `.btn-reset` border = `color-mix(--foreground 15%)` on `--background` = **1.36:1**, hover
30 % ≈ 1.8:1 — all far under 1.4.11's 3:1. Aggravated by the fills: the inputs set `background: var(--background)`
inside a `--card` host (≈1.01:1 apart), `.grid-cell` sets `background: var(--card)` inside a `--card` host
(identical), and `.btn-reset` sets `background: none`. In each case the sub-3:1 hairline is the **only** thing
marking the control. Context that keeps this MINOR: `--border` itself is only ~1.9:1 against the page, so the
system is already low — but these sites deliberately go **lower** than the token they could have used.

**m-10 · The busy state is a cursor.** `[P1]` `:disabled="isAnimating"` (`FourierMorphDemo.vue:18`) renders as
`.morph-button:disabled{cursor:wait}` and nothing else (`MorphShapePreview.vue:118-120`) — no opacity, no
`aria-busy`, no label change. Meanwhile the grid tiles and both level sliders stay fully live-looking (hover lift,
pointer cursor) while `handlePreviewClick` silently `return`s for the whole animation (`FourierMorphDemo.vue:138`).
Dead clicks with a hover response.

**m-11 · Empty first frame, and no empty state at all.** `[P1]` `currentPoints` initialises `[]`
(`useFourierMorph.ts:80`) and `pointsToSvgPath` returns `""` for `points.length < 2` (`svg-fourier.ts:51`), so the
hero card paints empty until `onMounted → setShape` (`FourierMorphDemo.vue:123-125`). One frame in practice, but it
exposes the larger gap: **no designed empty, loading, or error state exists anywhere in the three files** — the
component assumes its two bundled JSON assets and a resolving dynamic import, always.
→ **UNPROVEN-NEEDS-LIVE (SS-13)** for whether the empty frame is perceptible (paint-order dependent); the absence
of state design is proven statically.

**m-12 · Overflow suppressed rather than resolved.** `[P1]` `.demo-page { overflow-x: hidden; min-width: 0 }`
(`FourierMorphDemo.vue:186,191`). The one element that genuinely overflows already owns its scroller
(`HarmonicLevelGrid.vue:218-226`), so this is a page-level clamp that can only ever hide a *future* overflow
silently — and D-4 is exactly that future. It also mints a scroll container on the route root: per CSS Overflow one
non-`visible` axis forces the other to `auto`, nesting a scroller inside `<main class="… overflow-y-auto">`
(`App.vue:26`).

**m-13 · Two breaks in the spacing rhythm.** `[P2-NEW]` (a) `.config-grid { gap: 0.625rem }`
(`FourierMorphDemo.vue:261`) is the only step outside the page's `{0.5, 0.75, 1, 2}` rem ladder. (b)
`.levels-card { margin-bottom: 1rem }` at ≥640 (`HarmonicLevelGrid.vue:145`) double-counts against the parent's
`.controls-section { gap: 1rem }` (`FourierMorphDemo.vue:252`) and the child's `.export-row { padding-top: 0.5rem }`
(`:277`): the levels→export seam is **2.5 rem** where every other section seam is **1 rem**. A leftover from a
pre-flex-gap layout — the mobile arm even zeroes it (`:140`), which is the tell.

**m-14 · The desktop chip column breathes on every phase change.** `[P2-NEW]` `.desktop-info` is
`flex-direction: column` with default `align-items: stretch` (`MorphShapePreview.vue:135-145`), so the column width
equals the widest chip's max-content, and `.info-chip { white-space: nowrap }` (`:155`). Across one morph the phase
text runs `idle → settle-out → morph → settle-in → idle` (4→11→5→10→4 chars) and `n=` runs 4→3→4, so **all four
chips resize together, four times, directly beside the animating hero.** (Digit width is not the cause — the chips
are `var(--font-mono)`; character *count* is.) Fix: `min-width: 11ch` or `align-items: flex-start`.

**m-15 · The clamp funnel silently rewrites an emptied field.** `[P2-NEW — narrows pass-1 S-1]`
`HarmonicLevelGrid.vue:109-117` uses `Number(raw) || 1`: clearing `High` yields `Number("") = 0 → 1 →
max(lowLevel+1, 1)` = **6**, collapsing the range from `[5,50]` to `[5,6]` with no message; `Low` collapses to 1.
Both handlers are `@change` (`:11,34`; `MorphPhaseConfig.vue:13`), not `@input`, so nothing commits until blur, and
out-of-range entries are clamped invisibly. S-1 (a single validator on both input paths) is a real virtue and is
kept — but the validator's *behaviour* on the empty string is a silent destructive rewrite, and no validation
surface exists (glass-ui 4's `LabeledField` ships `invalid` + an error slot).

**m-16 · Two label placements inside one card.** `[P2-NEW]` `Duration` is inline-left of its control
(`MorphPhaseConfig.vue:7-9, 156-159`); `Easing`, eight lines later, is stacked above its control (`:34-36, 148-154`).
Same card, same visual weight, two grammars — and the inline one is the arrangement that produces D-4.

**m-17 · Duplicated CSS and adapters across the two sibling files.** `[P2-NEW]` The five-line `--slider-scrub-*`
block (`MorphPhaseConfig.vue:204-211` ≡ `HarmonicLevelGrid.vue:207-214`, both dead per D-2); the ~20-line
number-input recipe (`MorphPhaseConfig.vue:167-186` ≈ `HarmonicLevelGrid.vue:180-200`, and the source of D-19's
register divergence); and three byte-similar array adapters (`durationModel` `:98-102`; `lowModel`/`highModel`
`:119-127`) whose own comments call them *"adapt the scalar … to glass-scrubber's array model"* — a model
`LabeledSlider` already adapts, **at the pin** (D-13).

**m-18 · A dead declaration.** `[P2-NEW]` `.stage-row { justify-content: center }` (`MorphShapePreview.vue:87`)
never applies: the row is shrink-to-fit in both tiers (parent is a flex column, `align-items: center` at mobile /
`flex-start` at ≥640), so there is no free main-axis space to distribute.

**m-19 · Focus is dropped to `<body>` when the hero button disables itself mid-press.** `[P2-NEW]` `:disabled` is
bound to `isAnimating` (`MorphShapePreview.vue:4`, `FourierMorphDemo.vue:18`); a keyboard user pressing Enter holds
focus on an element that becomes `disabled` during the morph, and user agents blur a focused element on disable.
No focus restoration on completion. **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact UA behaviour; the
disable-while-focused is static-provable.

---

## §4 · INFO (6)

**i-1 · `class="grid"` collides with a Tailwind utility name.** `[P1]` `HarmonicLevelGrid.vue:53` names a flex row
`grid`; Tailwind's `.grid{display:grid}` is generated in `@layer utilities` and the scoped
`.grid[data-v-…]{display:flex}` (`:218`) wins **only** because scoped SFC CSS is unlayered. Correct today, one
refactor (a layer directive, a `:deep`, a move to a global sheet) from silently flipping the strip to a grid.
Rename to `.level-strip`.

**i-2 · `as any` at the data boundary.** `[P1]` `prepareFourierShape(sunData as any)` / `(moonData as any)`
(`FourierMorphDemo.vue:99-100`) — the two casts that would have caught D-5's level ceiling at the type level.

**i-3 · Per-frame path recomputation in the strip.** `[P1]` `getPath(level)` is a plain template call
(`HarmonicLevelGrid.vue:66, 129-132`), so every change to `activeLevel` re-runs `interpolateAtHarmonicLevel` +
`pointsToSvgPath` for all 12 tiles — a lerp over the full point array plus a Catmull-Rom→Bézier serialisation,
×12, several times during a 350 ms morph (as `nearestActiveLevel` steps `[50,35,25,18,12,8,5]`). Belongs to the
perf axis; listed here because the symptom, if any, is *motion quality* on the animation this page sells.
→ **UNPROVEN-NEEDS-LIVE (SS-13):** performance trace across one toggle; look for long tasks in the morph window.

**i-4 · No-op and redundant declarations.** `[P1 + P2-NEW]` `.demo-subtitle` sets `margin-bottom: 0` at ≥640
(`FourierMorphDemo.vue:238`) with no base margin-bottom, and Tailwind preflight zeroes `<p>` margins — dead line.
`[P2-NEW]` `.demo-title` (`:215`) restates `font-family: var(--font-serif)` already set on `.demo-page` (`:190`),
which itself restates `@layer base html, body { @apply … font-serif }` (`style.css:20`).

**i-5 · A third fork of the easing-preview idiom, not in the census's shadow ledger.** `[P2-NEW]`
`MorphPhaseConfig.vue:47-54` draws its own inline 40×20 easing curve from `easingCurvePath` (`lib/easings.ts:115-127`).
`[FE §4]` books the producer README's "forbidden fourth fork" as **two** files — `EasingPicker.vue` (98) +
`EasingCurvePreview.vue` (41) — plus `lib/easings.ts`, with `./easing` shipping at 7.0.0
(`glass-ui/src/components/easing/{EasingPicker,EasingConfigurator}.vue`). **This is a third application site of
the same idiom, sharing the same catalog module.** F.W3's `glass-ui/easing` budget should read three sites.

**i-6 · Template-side computation.** `[P2-NEW]` `:harmonic-level="Math.round(morph.harmonicLevel.value)"`
(`FourierMorphDemo.vue:15`) re-evaluates on every render during the morph, while `nearestActiveLevel` (`:115-120`)
already performs the same rounding inside a `computed`.

---

## §5 · SUPERLATIVES (9) — L-18 both ways

**S-1 · One clamp, two input paths.** `[P1, narrowed by m-15]` Both ways to set a value funnel through a single
validator: `emitDuration` (`MorphPhaseConfig.vue:93-96`), `emitLow`/`emitHigh` (`HarmonicLevelGrid.vue:109-117`).
The slider reaches it via a getter/setter computed that adapts glass's array model to a scalar and routes the
setter **back through the same clamp** — `set: (arr) => emitDuration(String(arr[0] ?? 50))`
(`MorphPhaseConfig.vue:99-102`; `HarmonicLevelGrid.vue:120-127`). Falsifier: a slider path writing
`emit("update:duration", arr[0])` directly and bypassing the bounds. It does not — verified at all three adapters.
The *shape* is correct and rarer than it should be; **m-15 narrows it**: the validator's behaviour on the empty
string is a silent destructive rewrite.

**S-2 · Every slider is accessibly named, and the naming survives F.W1.** `[P1, narrowed by D-12]`
`aria-label="Duration (ms)"` (`MorphPhaseConfig.vue:27`), `"Low harmonic level"` / `"High harmonic level"`
(`HarmonicLevelGrid.vue:23,46`). This is only a superlative if the label reaches the element carrying
`role="slider"` — falsifier applied: glass-ui 4.0.0 forwards `$attrs["aria-label"]` onto `SliderThumb`
**explicitly**, not merely onto the wrapper (`dist/slider-DQ95MET2.js`:
`o(h(b), { key: t, "aria-label": n.$attrs["aria-label"] ?? void 0, class: "slider-thumb …" })`, `b` = reka's
`SliderThumb`). And 7.0.0 hardens it — forwards `aria-label`, `aria-labelledby`, `aria-describedby`,
`aria-errormessage` (`Slider.vue:379-386`) and **warns in DEV** when a single-thumb slider is nameless
(`:277-295`). The sliders are the only correctly-named controls on the page (cf. D-11). **D-12 narrows it**: the
three duration sliders share one identical name, so they are *named* but not *identified*.

**S-3 · The easing picker shows the curve, not the name.** `[P1, MECHANISM CORRECTED by this pass]`
`MorphPhaseConfig.vue:41-57` renders an inline SVG of the actual sampled function as each option's content — the
affordance *is* the semantics, in a dropdown that would otherwise be 22 near-synonymous strings.
**Correction:** pass 1 claimed the selected curve is "echoed into the trigger" via `SelectItemText`. **REFUTED.**
glass-ui's `SelectItem` does wrap its default slot in reka's `SelectItemText`
(`dist/SelectScrollDownButton-C1jb3b3K.js`), but reka's `SelectValue` computes `selectedLabel` from
`option.textContent` and renders `toDisplayString(slotText)` — a **string** (`reka-ui/dist/Select/SelectValue.js`;
`SelectItemText.js` registers `textContent: itemTextElement.value?.textContent`). An `<svg>` contributes no
`textContent`, so **the trigger shows the label alone.** The superlative survives for the list (which is where the
choice is made); the trigger claim is withdrawn. Its one flaw remains m-5, the clipped overshoot — a bug in the
frame, not the idea.

**S-4′ · The strip's tiles are real `Button`s, so the scroller is keyboard-reachable for free.** `[P1 S-4,
DEMOTED and re-minted]` `HarmonicLevelGrid.vue:54-65` uses real `<Button>` elements rather than `<div @click>`, so
Tab moves through all twelve and the browser auto-scrolls the focused tile into view — an overflow region that is
keyboard-operable without a single line of custom code. **What pass 1 credited beyond this is withdrawn**: the
"honest scroller" claim rested on the `padding-bottom` gutter, and D-18 shows the gutter is one-sided — the top
edge clips the active ring, the hover lift and the very focus ring this superlative depends on being visible.
Falsifier for what remains: `<div>` tiles, or `tabindex="-1"`. Neither.

**S-5 · Frame-adjacency snapping, not numeric distance.** `[P1]` `handlePreviewClick`
(`FourierMorphDemo.vue:148-169`) decides which bound a mid-range click should move by **index distance in the
preview array**, with a numeric fallback when a level is off-grid (`:161-169`), and the comment states the reason
(`:148`). This is the correct perceptual model: the tick scale is non-uniform (`1,2,3,5,8,12,18,25,35,50` — gaps
from 1 to 15), so numeric distance would bias almost every mid-grid click toward `low`. Falsifier: on a uniform
scale the two rules agree and the extra code would be contrivance — the scale is not uniform, verified from the
JSON. Someone thought about this.

**S-6 · One breakpoint, applied whole.** `[P1]` All 14 media queries across the three files are
`min-width: 640px`, and each steps padding *and* gap *and* type *and* SVG size together
(`FourierMorphDemo.vue:195,208,222,235,250,264`; `MorphShapePreview.vue:77,100,135,158`; `MorphPhaseConfig.vue:114`;
`HarmonicLevelGrid.vue:142,267`) at a coherent ≈2× ratio. Falsifier: a stray second breakpoint in the component
tree — there is none; the only other one is the app-global 768 px root-font step, which is exactly the seam booked
as m-7. The proportional *system* is sound; m-7 faults the **choice** of breakpoint and m-13 two strays from the
ladder — not the ratio.

**S-7 · `useClipboard` adopted with provenance.** `[P1]` `useMorphConfig.ts:55-58` replaces a hand-rolled `ref` +
2 s timeout + `onUnmounted` cleanup with the producer composable, with a comment naming the wave and the reason.
Falsifier: the error arm is declined (D-10), so this is a *partial* adoption — but the timer-lifetime correctness
it buys is real, it is the right direction, and `useClipboard` survives on the 7.0.0 root barrel
(`glass-ui/src/index.ts:428`), so the adoption does not become uplift debt.

**S-8 · Text-colour token discipline is near-total.** `[P2-NEW]` Every text colour on the page resolves to
`--foreground`, `--muted-foreground` or `--accent-*` — no hard-coded text hex anywhere. `--muted-foreground`
measures **5.12-7.70:1** across both modes on both surfaces (`.config-card-desc`, `.grid-label`, `.level-label`,
`.btn-reset`, `.input-unit`), clearing AA with margin. The two `#60a5fa` literals (D-19) are **border** colours;
the text layer is clean. Falsifier: a hard-coded text colour. `grep -n "color: #" ` across the four templates → **0**.

**S-9 · The contrast failures are one-armed, which makes them cheap.** `[P2-NEW]` Every failure measured here —
D-7 (chips 3.43 / 3.91:1), D-19 (`#60a5fa` 2.40 / 2.45:1), m-9 (borders 1.28-1.36:1) — is **light-mode**; the dark
arm clears its floors (chips 4.94 / 5.71:1, `#60a5fa` 5.73:1). The colour system is sound and the light arm is
under-tested — a well-scoped repair, and one the tree has already performed once: `style.css:113-127`'s
`--viz-amber` light-mode darken (`hsl(35 70% 42%)` ≈ 3.54:1 → `hsl(35 76% 35%)` ≈ 4.6:1) is the *same* one-armed
failure, already found, already carried upstream as a glass-BH ask. Falsifier: a dark-arm failure. Exactly one
exists — D-20, `.grid-label-active` at 4.07:1 — and it is named rather than hidden by this superlative.

**S-10 · A genuine two-voice typographic system.** `[P2-NEW]` Serif (`--font-serif`, the CM Serif brand fork) for
prose and headings; mono (`--font-mono` / the `.fira-code` glass utility, `dist/styles/typography/utilities.css:69`)
for **every data surface without exception** — chips (`MorphShapePreview.vue:148`), number inputs and their units
(`MorphPhaseConfig.vue:17,19`; `HarmonicLevelGrid.vue:15,38`), grid labels (`HarmonicLevelGrid.vue:275`). Numerals
are therefore fixed-width everywhere they animate. That is a rule, consistently applied, not decoration.
Falsifier: a data surface in serif. Checked all seven — none. The one breach runs the other way (action labels in
mono, `FourierMorphDemo.vue:295,319`), which is a smaller sin than the reverse.

### Candidate superlatives KILLED by their own falsifiers — recorded so nobody re-mints them

1. *"The hero button composes `transform: scale` with the cartoon `translate` lift."* `[P1]` True, but it is the
   producer's design (`cartoon-surface` uses the longhand deliberately), not the consumer's achievement — and the
   consumer in fact broke the timing (D-21).
2. *"CSS motion here is reduced-motion-safe."* `[P1]` True, but glass-ui's global blanket
   (`utilities/a11y-overrides.css:6-31`) does the work; this component contributes zero PRM handling and the part
   the blanket cannot reach is ungated (D-9).
3. *"An honest horizontal scroller."* `[P2-NEW kill of pass-1 S-4]` The `padding-bottom` gutter is real but
   one-sided; `padding-top: 0` with `overflow-y: hidden` clips the active ring, the hover lift and the focus ring
   (D-18). Re-minted, narrowed, as S-4′.

---

## §6 · The F.W1 ledger for this component

| surface | under the pin (glass 4.0.0) | after the tri-package uplift | net |
|---|---|---|---|
| `./button` (`FourierMorphDemo.vue:86`, `HarmonicLevelGrid.vue:89`) | live | **survives** (`exports["./button"]` present at 7.0.0) | — |
| `./slider`, `./select` (`MorphPhaseConfig.vue:72-73`, `HarmonicLevelGrid.vue:90`) | live | **survives**; `Select*` member set unchanged; `SliderVariant = "standard"\|"spectrum"` unchanged | — |
| root `useClipboard` (`useMorphConfig.ts:9`) | live | **survives** (`glass-ui/src/index.ts:428`) | — |
| `Button variant=… size="default"` ×3 | works | **BREAKS** — `variant` gone; `"default"` ∉ `ButtonSize`; silent re-tier to `emphasis:"secondary" size:"md"` | **D-3 — absent from the census AND from `MIGRATION.md`** |
| `--slider-scrub-*` retint ×2 files | already dead | **still dead** (7.0.0 keeps `--slider-range-bg`/`--slider-thumb-bg`) | **D-2 — F.W1 must carry the rename by hand** |
| slider hover tint | no seat exists | **IMPROVES** — 7.0.0 adds `--slider-thumb-hover-ring-color`, `--slider-thumb-border-w`, `--slider-touch-target`, `--slider-target-floor` | the dead `-hover` pair finally has a real target |
| harmonic-ladder ticks | none | **IMPROVES** — 7.0.0 `Slider.marks` (*"decorative checkpoints … they never snap the value"*) is the seat for the 12 preview stops and the two bounds | cures the colour-only half of D-19 |
| loading affordance | absent (D-8, D-10) | **IMPROVES** — 7.0.0 `Button.loading` | one-prop cure |
| control labelling (D-11) | 8 nameless controls — **but `./labeled-field` already ships at 4.0.0** | **IMPROVES further** — full `controlId`/`labelledBy`/`describedBy`/`errorId` + a DEV warning naming it | seat available **now**; uplift deepens it |
| chip surfaces (D-13) | 8 hand-rolled; `./badge`/`./metric-badge` available | `./metric` + `./chip` | the F.W1 `metric-badge` sweep will **not** find these — book explicitly in F.W3 |
| number fields (D-13) | 5 hand-rolled; `./number-field` available | `./number-field` | seat available now |
| overflow strip (D-13, D-18) | hand-rolled; `./fading-scroll` available | `./fading-scroll` | seat available now |
| slider aria forwarding (S-2) | forwarded to thumb | **IMPROVES** — `+aria-labelledby`, `+aria-describedby`, `+aria-errormessage`, + DEV warning | — |
| easing preview (i-5) | third local fork | `./easing` (`EasingPicker`, `EasingConfigurator`) | extend F.W3's budget from 2 sites to 3 |
| `lucide-vue-next` → `@lucide/vue` | `ClipboardCopy`, `Check`, `RotateCcw` (`FourierMorphDemo.vue:87`) | **BREAKS** — 1 of the census's 35 rename sites | census `:104`, already booked |
| `value.js` bare-root specifiers | `lib/easings.ts:9,16` (`timingFunctions`, 5× `easeInOut*`) — **this page's whole easing catalog** | **BREAKS** → `/easing` under W.L5 / D-15's grant | census's "cheapest leg" `[FE §9] carry 5` is this page's hard dependency |
| `keyframes.js` engine boundary | `loadAnimationEngine()` @ 4.3.0 (`useFourierMorph.ts:14,149`) | 4.3→6 inside the atomic transaction; `createTweenAnimation` (`:122-143`) reaches into `a.options.duration` and the `addFrame(vars, time)` tick signature — both must be re-verified at 6.0.0 | census `:186`; `lane-frontend.md:479` |
| glyph sizing (D-16), tile height (D-15) | pinned off-token | uplift re-rolls both (`size` default becomes `"md"`) | fix **before**, not after |
| `metric-badge` / `hover-card` / `hover-popover` / dock members / `ToastVariant` | — | **not imported by this component** (verified: zero imports across all five read files) | census rows land elsewhere — see D-13 for the inverse case |

**Ordering ask for F.W1.** Cure **D-2** (property rename) and **D-3** (prop axis) **in the same transaction**,
because the uplift changes the `Button` defaults that D-14 / D-15 / D-16's scoped overrides are silently
compensating for. Landing the version bump without them converts three MAJORs into a visual regression with no
failing test to catch it: `[FE §0, §9]` records **vitest ABSENT**, `/morph`'s only coverage is
`e2e/visual-baseline.spec.ts:35` (screenshots, no assertions), and the axe keystone spec runs `/visualize` only
(`e2e/visualization-ux.spec.ts:47`).

---

## §7 · Roll-up

| severity | n | ids |
|---|---|---|
| **BLOCKER** | **5** | D-1 nameless primary action `[P1]` · D-2 dead slider colour system, 4.0 **and** 7.0 `[P1]` · D-3 Button prop-axis break + undocumented `[P1+new]` · **D-4 duration slider starved to ≈0 px `[P2-NEW]`** · D-5 identical tiles / dead High range `[P1, promoted]` |
| MAJOR | 16 | D-6 … D-22 (D-13, D-12, D-18, D-20 are `[P2-NEW]`; D-11 and D-19 carry new arms) |
| MINOR | 19 | m-1 … m-19 (m-13 … m-19 are `[P2-NEW]`) |
| INFO | 6 | i-1 … i-6 (i-5, i-6 and half of i-4 are `[P2-NEW]`) |
| **defects** | **46** | |
| superlatives | 9 | S-1, S-2, S-3 (mechanism corrected), S-4′ (demoted+re-minted), S-5, S-6, S-7, **S-8, S-9, S-10** `[P2-NEW]` — plus 3 candidates killed by falsifier, §5 |
| UNPROVEN-NEEDS-LIVE (SS-13) | 6 | D-3 (which failure mode) · D-4 (exact slider px) · D-8 (double-click race timing) · D-15 (tile-height emission) · D-18 (clipped px count) · i-3 (morph-window long tasks); m-11 and m-19 partially |

---

*Read-only challenge, pass 2. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`
were read as evidence and not mutated; the only write from this seat is this file, which supersedes its pass-1
contents in place. Contrast figures were computed from the pinned glass-ui 4.0.0 token literals via oklch→sRGB
conversion and sRGB alpha compositing of `color-mix(in srgb, C p%, transparent)` over the stated backdrop, using
the WCAG 2.x relative-luminance formula; every input token is cited at its `file:line` in the row that uses it.*
