claude-opus-5[1m] (served model id)

# CHALLENGE · MorphShapePreview · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphShapePreview.vue`
(175 lines, read whole).
**Import closure read (read-only, all of it):** `decorative/FourierMorphSvg.vue` (41) · the sole
consumer `morph/FourierMorphDemo.vue` (330) · `composables/useFourierMorph.ts` (230) ·
`lib/svg-fourier.ts` (`pointsToSvgPath`) · `src/style.css` (143, the `cartoon-card` shim host) ·
installed `@mkbabb/glass-ui@4.0.0` `dist/styles/{cards,typography/utilities,tokens/*,theme/bridges}.css`
+ `dist/components/custom/metric-badge/MetricBadge.vue.d.ts` · siblings `morph/HarmonicLevelGrid.vue`,
`morph/MorphPhaseConfig.vue` and `layout/DarkModeToggle.vue` (the same-composable precedent) ·
`e2e/*.spec.ts` (gate coverage).
**Method.** Static + source-derived only. No browser. Contrast computed from the installed
glass-ui token values by sRGB compositing + WCAG 2.x relative luminance
(oklch→sRGB, `color-mix(in srgb, X n%, transparent)` = `n·X + (1−n)·backdrop`); the script is
reproducible from the token file:line citations in D-2. Claims that require a live paint are
marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture.** Component assumed DEFECTIVE until the tree proved otherwise. Each claim carries its
own falsifier; six survived as superlatives (L-18 runs both ways). **The decisive lever throughout
is `layout/DarkModeToggle.vue`** — the *other* consumer of `useFourierMorph`, rendering the *same*
sun/moon shapes through the *same* `FourierMorphSvg`, as the *same* shape-toggle `<button>`. It
carries an `aria-label`, a `:focus-visible` ring, and a `prefers-reduced-motion` block.
MorphShapePreview carries none of the three. Every a11y/motion finding below is therefore a
divergence from an **in-tree, same-primitive precedent**, not an outside aesthetic preference.

**Tally: 26 defects (2 BLOCKER · 12 MAJOR · 9 MINOR · 3 INFO) · 6 superlatives.**
(BLOCKER D-1..D-2 · MAJOR D-3..D-14 · MINOR D-15..D-23 · INFO D-24..D-26.)

---

## §0 · Corpus fold (hitherto, not re-invented)

| Corpus row | Bearing here |
|---|---|
| CENSUS §3a / `[FE §5]` break surface — `./metric-badge` REMOVED at 7.0.0 → `./metric` | **D-11.** This file hand-rolls a metric chip and so appears in *neither* the 7-file break list nor the cure. See the sequencing trap in D-11. |
| CENSUS §2 **C-4** — "metric-badge 7 imports / 6 files" is **7 files** | Cited verbatim in D-11; adopting `MetricBadge` here today would make it **8**. |
| `[FE §3]` / `style.css:99-117` — `cartoon-card` is a **local resurrection shim**, 25 sites, an outstanding upstream carry | D-6, D-7, D-13, D-25 all sit on this shim; three of them are shim↔consumer cascade collisions, i.e. carry-relay payload. |
| `[FE §8]` **⚠️ COVERAGE GAP** — "the two ungated animation clocks are `stores/animation.ts` and `ConvergencePlot`'s rAF" | **CONTRADICTED-BY-EXTENSION (D-8).** There is a **third** ungated clock: the `useFourierMorph` keyframes.js engine, driven from this component. The lane enumerated two; the tree has three. |
| `[FE §8]` — `--viz-amber` darkened because glass-ui shipped it at **≈3.54:1** ("fails WCAG AA"), `style.css:119-131` | **D-2's yardstick.** The repo's own D.W4.d standard. Two chips here sit at 3.91:1 and **3.43:1** — one *worse* than the ratio the repo already ruled a failure. |
| `[FE §9]` / CENSUS §5 risk 10 — **vitest ABSENT**; gates are `vue-tsc` + 29 single-chromium Playwright tests | Why D-1, D-10, D-18 are ungateable today: `/morph` has zero axe coverage (proof in D-1). |
| CENSUS §5 risk 1 — the tri-package resolution deadlock (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0, atomic) | Bounds every "fix at F.W1" disposition below. |
| Intake `lane-fourier-r3-r6.md` **R3-12** (TRUE) — 35 open-family records collapse to 28; the duplicate set explicitly names **`MorphPhaseConfig` easingNames** | Adjacent-file corroboration that this folder's template surface is duplication-prone; **D-10** is the same disease one file over, and is *not* in R3-12's duplicate set because Codex keyed on open-families, not on verbatim subtree copies. **New, non-overlapping.** |
| Intake **R3-10** (TRUE, →F.W4) — six live dynamic-`:is` families, `FourierMorphDemo.vue:72` among the four registered | Confirms the parent is already an F.W4 audit subject; this child rides the same wave. |
| Intake **R5-7** (carried, →F.W4) — *native-template-loop blindness*: evidence keyed to component callsites drops native subtrees | **Directly vindicated here.** MorphShapePreview has **zero** `v-for`; its 8 chips are hand-unrolled literals. Any loop/instance census keyed on iteration misses this file's 8 duplicated subjects entirely — the exact blind spot R5-7 predicts. |
| Intake **X-9** (carried, →F.W4) — publish ONE member-scope law before any percentage | Honoured: every count below is stated with its denominator. |

No row of `lane-fourier-r3-r6.md` adjudicates MorphShapePreview directly (grep: the slug does not appear). The findings below are therefore fresh-rooted, with the two corpus contradictions above flagged explicitly.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The primary affordance of the whole `/morph` route has no accessible name

`MorphShapePreview.vue:4-10`. The `<button>` contains exactly one child: `<FourierMorphSvg>`, whose
whole template (`FourierMorphSvg.vue:2-16`) is `<svg>` → `<path>`. There is **no** `aria-label`, no
`aria-labelledby`, no `<title>`, no visually-hidden text, no `role="img"`, and no `aria-hidden` on
the decorative svg. The button's accessible name computes to **the empty string**. A screen reader
announces "button". WCAG 2.2 **4.1.2 Name, Role, Value — Level A**, plus 2.4.4/2.5.3 (the control's
purpose is conveyed *only* by the drawn curve).

The button is not incidental: it is the sole way to trigger the morph, i.e. the entire subject of
the route (`FourierMorphDemo.vue:12-20` mounts this component as the "Preview stage", and the only
other controls are configuration).

**This is the exact case `DarkModeToggle.vue:2-13` gets right** — same `<button>` + `FourierMorphSvg`
shape, with `:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"` at `:5`. The
idiom is in the tree, one directory away, on the same primitive.

**Why no gate catches it.** `button-name` is a core axe rule at **serious** severity, and the repo
does run `@axe-core/playwright`. But `/morph` is **never axe-scanned**: all seven `checkA11y()` call
sites are `visualization-ux.spec.ts:114,146,163,201` and `visualization-crud.spec.ts:529,636,659`,
and every `page.goto` in those two files is `/visualize` or `/v/${slug}`
(`visualization-crud.spec.ts:120,165,525`, `visualization-ux.spec.ts:47`). `/morph` appears in the
e2e suite exactly once — `visual-baseline.spec.ts:35 { slug: "morph", path: "/morph" }` — which is a
**screenshot** baseline and asserts nothing about the a11y tree.

**Falsifier.** Any of: an `aria-label`/`aria-labelledby` on `MorphShapePreview.vue:4`; a `<title>`
child, `aria-label`, or `role="img"`+label inside `FourierMorphSvg.vue:2-16`; text content in the
button; or an axe `checkA11y` run against `/morph`. I read all four files whole and grepped the e2e
suite — **none exists**. Falsified only by a source change.

**Disposition.** F.W1 or earlier — it is a one-attribute fix and does not wait on the tri-package
deadlock. Pair it with adding `/morph` to an axe keystone, or the class recurs.

---

### D-2 · BLOCKER · The two phase-state chips fail WCAG AA in light mode — against the repo's own remediation standard

`MorphShapePreview.vue:165-174`. Computed from the installed glass-ui 4.0.0 tokens, composited over
`--background` (the chips' actual backdrop: `.demo-stage` sits in `.demo-page`, which sets no
background — `FourierMorphDemo.vue:172-181`):

| chip | rule | fg | plate (computed) | **light** | dark |
|---|---|---|---|---|---|
| `.settle-out` / `.settle-in` | `:165-169` | `--accent-red` `#db2424` | `#f8e1df` | **3.91:1 ✗** | 4.94:1 ✓ |
| `.morph` | `:171-174` | `--accent-pink` `#d7428c` | `#f7e4eb` | **3.43:1 ✗** | 5.71:1 ✓ |
| neutral (base) | `:147-156` | `--foreground` | `#f8f6f3` | 16.21:1 ✓ | 14.74:1 ✓ |

Token provenance: `--accent-red` light `oklch(0.574 0.216 27.5)` (`tokens/color-radius.css:258`),
dark `oklch(0.644 0.165 22.9)` (`tokens/dark-arm.css:111`); `--accent-pink` light
`oklch(0.613 0.197 353.8)` (`color-radius.css:256`), dark `oklch(0.683 0.131 354.7)`
(`dark-arm.css:109`); `--background` = `--neutral-0` light `hsl(40 30% 98%)` (`color-radius.css:40,57`),
dark `hsl(24 9% 4%)` (`dark-arm.css:42`).

**The text is normal-sized at every breakpoint, so 4.5:1 is the bar** — `font-weight: 500` (`:150`),
never ≥700, and the largest it ever renders is **18px** (`@apply text-base` at ≥640px × the 1.125rem
root of `style.css:41-43`), under the 24px normal-text threshold. WCAG 1.4.3 Level AA.

**This is condemned by the repo's own precedent, not by my taste.** `style.css:119-131` darkens
`--viz-amber` precisely because glass-ui shipped it at "**≈3.54:1** — fails WCAG AA for normal
text" and re-baselines it to ≈4.6:1. The `.morph` chip at **3.43:1 is worse than the ratio the repo
already ruled a failure and fixed.** And unlike `--viz-amber`, this is not an upstream token bug —
`--accent-red`/`--accent-pink` are fine as *fills*; the defect is *this component's* decision to
use a saturated accent as **body text on a 12%-tint plate of itself**, a pattern that mathematically
cannot clear AA for any accent light enough to tint pleasantly.

**Falsifier.** Any of: (a) the chips render ≥24px or ≥18.66px-bold — refuted, `:150,:160` +
`style.css:41-49`; (b) the backdrop is darker than `--background` — I also computed over `--card`
(`hsl(36 48% 97%)`, `color-radius.css:72`): **3.84:1 / 3.37:1**, *worse*, so the finding is robust
to backdrop choice; (c) light mode is not reachable — refuted, `.dark` is the opt-in class
(`style.css:33`, `dark-arm.css`) and `DarkModeToggle` exists to leave it; (d) the chips are
decorative — refuted, they are the sole textual readout of animation phase.
**Not falsifiable by re-measurement**; only by a source change (darken the fg, or deepen the plate
and keep `--foreground`).

**Disposition.** F.W1. Cheapest conformant cure: keep the tint plate, set
`color: var(--foreground)`, and carry state in the plate only (the neutral chip already proves
16.21:1). The tempting cure — a `--accent-red-strong` light rung — is a glass-ui carry, so relay it
to the glass BH inbox alongside the existing `--viz-amber` and `cartoon-card` asks rather than
minting a fourth local override.

---

## §2 · MAJOR

### D-3 · MAJOR · No `:focus-visible` ring on the one interactive element

`:91-120` declares `:hover`, `:active`, and `:disabled` states and **no focus state**. The repo has
a canonical ring — `outline: 2px solid var(--ring); outline-offset: 2px` — hoisted to the global
layer at `style.css:133-143` *specifically because Vue scoped styles can't be reached from outside*,
and applied there to an explicit allow-list of four classes: `.sidebar-link`, `.floating-toc-item`,
`.callout-btn`, `.gallery-card`. **`.morph-button` is not on that list.** `DarkModeToggle.vue:98-101`
declares its own (`outline: 2px solid var(--color-ring); outline-offset: 2px`). This component
declares neither.

Keyboard users fall back to the UA default ring, drawn tight against a 2px `cartoon-surface` border
(`cards.css:33-34`) on a 120/180px card — inconsistent in weight, offset, and colour with every
other focusable surface in the app. Combined with **D-4** (focus is destroyed on activation) the
keyboard path has no stable focus indication at all.

**Falsifier.** A `:focus-visible` rule in `:64-175`, an entry for `.morph-button` in
`style.css:133-143`, or an `outline` in `@utility cartoon-surface` (`cards.css:33-47`) — I read all
three whole; none. Note this is *not* the stronger claim "focus is invisible": Tailwind v4 preflight
does not null `outline`, so a UA ring should survive — the defect is **non-conformance with the
house ring**, not total absence. Whether the UA ring is legible against the 2px cartoon border is
**UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-4 · MAJOR · `disabled` during the morph destroys keyboard focus, and the guard it duplicates already exists in the parent

`:4` binds `:disabled="disabled"`; the parent passes `isAnimating` (`FourierMorphDemo.vue:19`,
`:107` `phase !== "idle"`). A keyboard user presses <kbd>Space</kbd>/<kbd>Enter</kbd> → the button
becomes `disabled` mid-interaction → it leaves the tab order and **the browser moves focus to
`<body>`**. When the morph ends ~350ms later the button re-enables, but focus is gone; the user must
re-traverse from the top of the document to press it again. WCAG 2.4.3 / 3.2.1 territory, and a
plain usability failure for the route's only primary action.

The decisive point: **the attribute buys nothing.** `handleToggle` already opens with
`if (isAnimating.value) return;` (`FourierMorphDemo.vue:130-131`). Re-entrancy is guarded in JS;
the `disabled` attribute's *only* net effect is the focus loss.

**Falsifier.** A focus-restoration `watch`/`nextTick().focus()` anywhere in either file (grepped —
none); or `aria-disabled` used instead of `disabled` (it is not, `:4`); or the parent lacking the
JS guard (it has it, `:130-131`). **Confirmed.**
**Disposition.** Swap `:disabled` → `:aria-disabled="disabled"` and keep the JS guard; the element
stays focusable, AT announces the busy state, and D-5's invisible-disabled problem is solved in the
same stroke.

### D-5 · MAJOR · The disabled state is invisible — on touch it has no signal whatsoever

`:118-120` is the entire disabled treatment: `cursor: wait`. No opacity change, no desaturation, no
border or shadow change, no busy indicator. For the full 350ms morph (longer if the user raises the
duration sliders — `MorphPhaseConfig.vue:14-18` allows `max="800"` **per phase**, i.e. up to
**2400ms** total) the button looks pixel-identical to its enabled self while silently rejecting
input.

**Cursors do not exist on touch.** On every touch device the disabled state has *zero* affordance:
taps are swallowed with no feedback at all. The component ships a mobile layout as a first-class
concern (`:29-43`, `:124-145`), so touch is not a marginal case here.

**Falsifier.** A disabled visual in `:64-175` (none) or one inherited from the shim — `cartoon-surface`
(`cards.css:33-47`) only `:not(:disabled)`-*guards* its hover; it declares no disabled appearance.
`.cartoon-card` (`style.css:107-111`) adds `border-color`/`background` unconditionally. **Confirmed:
no disabled appearance exists anywhere in the chain.**

### D-6 · MAJOR · The local `transition` shorthand silently deletes the shim's, making the hover-lift instantaneous

`:97` — `transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease` — sits on
the same element as `@utility cartoon-surface`'s
`transition: translate var(--duration-normal) var(--spring-smooth), box-shadow var(--duration-normal) var(--ease-standard)`
(`cards.css:38-41`).

Cascade: Vue scoped styles are injected **unlayered**; Tailwind v4 `@utility` output lands in
`@layer utilities`. Unlayered author declarations outrank *every* layered author declaration
regardless of specificity. So `:97` wins the `transition` property **outright** — it is one
property, not an additive list.

Consequence, precisely: `cartoon-surface`'s hover still applies
`translate: var(--lift-sm) var(--lift-sm)` (`cards.css:43-46`; `--lift-sm: -1px`,
`tokens/offsets-sizing.css:10`) because nothing overrides it — but **`translate` is no longer in any
transition list, so the diagonal lift snaps instantly**, while `:111`'s `transform: scale(1.02)`
eases over 150ms. One hover, two motion vocabularies, two clocks: a 1px hard jump plus a 150ms grow.
The shim's deliberate `--spring-smooth` (`tokens/scheme-motion.css:182`, a 48-stop `linear()` spring)
is discarded, and `box-shadow` is re-timed from `--duration-normal` (0.3s,
`scheme-motion.css:68`) / `--ease-standard` to 0.2s/`ease`.

**Falsifier.** (a) The scoped block is layered — refuted, `<style scoped>` at `:64` emits plain CSS;
(b) `@utility` is unlayered — refuted, Tailwind v4 emits `@layer utilities` and `index.css:95`
documents cards.css as layer member 7; (c) `translate` and `transform` are the same property so the
shim's lift never applies — refuted, they are independent individual-transform properties that
compose. **Confirmed by construction.** The rendered result is **UNPROVEN-NEEDS-LIVE (SS-13)**; the
cascade resolution is not.

### D-7 · MAJOR · Hover *destroys* the cartoon offset-stamp shadow — the card flattens exactly when it should lift

Same cascade as D-6, different property. `cartoon-surface` at rest gives
`box-shadow: var(--shadow-cartoon-md)` — a two-part offset stamp,
`-4px 3px 1px … , …` (`tokens/shadow.css:95-97`) — and on hover promotes it to
`--shadow-cartoon-lg` (`-6px 4px 1px …`, `shadow.css:98`), the Memphis-sticker signature the shim
exists to restore (`style.css:99-106`, "the 2px border + offset-stamp shadow + hover-lift").

`:110` overrides hover with `box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-red) 15%, transparent)`
— a **single** flat ring, no comma-composite. Because `box-shadow` is one property and unlayered
wins, the offset stamp is not merely un-promoted: **it is deleted on hover.** The card reads as
raised at rest and *flat* under the cursor — the inverse of the intended affordance, and a
regression in the very decoration the local shim was authored to bring back. The `--lift-sm`
translate still fires (D-6), so the element also moves 1px while losing its shadow: the depth cue
and the position cue disagree.

**Falsifier.** A comma-composite at `:110` including `var(--shadow-cartoon-lg)` (it is a single
shadow); or `!important` / higher-layer precedence on the shim (neither). **Confirmed by
construction.** One-line cure: `box-shadow: var(--shadow-cartoon-lg), 0 0 0 3px …`.
**Disposition.** This and D-6 are shim↔consumer collisions and belong in the `cartoon-card` carry
packet relayed to the glass BH inbox (`[FE §3]`, standing relay law), not just in the local fix.

### D-8 · MAJOR · Zero `prefers-reduced-motion` coverage — and it is the tree's *third* ungated clock, correcting `[FE §8]`

Nothing in `:64-175` and nothing in `useFourierMorph.ts` (230 lines, grepped) consults
`prefers-reduced-motion`. Unguarded here: the `scale(1.02)`/`scale(0.98)` hover-and-press transforms
(`:111,:115`), the inherited `--lift-sm` translate (D-6), and — because this button is the trigger —
**the full multi-phase shape morph itself**, a keyframes.js engine tween driven at rAF rate through
three phases (`useFourierMorph.ts:150-198`).

Scale-on-interaction is the textbook WCAG **2.3.3 Animation from Interactions** (AAA) trigger, and
the repo has already ruled on exactly this class of finding: `GalleryMarquee.vue:126-128` annotates
its guard *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding."* The house idiom is
18 references across 12 files (`[FE §8]`), in **both** flavours — a CSS `@media reduce` block
(8 sites incl. `style.css:92`) and a JS `matchMedia` gate (`SvgFilters.vue:7-9`,
`router/index.ts:17`, `PaperView.vue:176`).

**And `DarkModeToggle.vue:103-107` — driving this same composable, over these same sun/moon
shapes — carries a `@media (prefers-reduced-motion: reduce)` block.** MorphShapePreview does not.

**Corpus correction (explicit).** `[FE §8]`'s ⚠️ COVERAGE GAP enumerates "the two ungated animation
clocks" as `stores/animation.ts` and `ConvergencePlot`'s rAF. **There are three.** The
`useFourierMorph` keyframes.js engine is a third, ungated, and unlike the epicycle clock it has **no
transport control** — `[FE §8]` argues WCAG 2.2.2 is arguably satisfied for the epicycle by the
visible play/pause in `AnimationControls.vue`; there is no pause affordance for the morph, so that
mitigation does not transfer. Book the third clock.

**Falsifier.** Any reduced-motion consultation in this file, `FourierMorphSvg.vue`,
`useFourierMorph.ts`, or `FourierMorphDemo.vue` — all four read whole, plus a repo-wide grep
(`prefers-reduced-motion|reducedMotion` → 15 hits, none in `components/morph/`). **Confirmed.**

### D-9 · MAJOR · The desktop chip column stretches to its longest member, so the whole column re-flows three times per toggle

`:136-140` — `.desktop-info { display: flex; flex-direction: column; gap: 0.5rem }` — sets no
`align-items`, so the default `stretch` applies: **all four chips take the width of the widest.**
The widest is the phase chip, whose content is the raw `MorphPhase` token, and whose character
count changes at every phase boundary:

| phase | rendered | chars |
|---|---|---|
| `idle` | `idle` | 4 |
| `settle-out` | `settle-out` | **10** |
| `morph` | `morph` | 5 |
| `settle-in` | `settle-in` | 9 |

(`useFourierMorph.ts:31` `MorphPhase`; assignments at `:154, :168, :180, :195`.)

So one toggle drives the column width through 4 → 10 → 5 → 9 → 4 characters — **four re-flows in
350ms**, resizing all four chip plates, including the three whose own content never changed. In
mono (`:148`) the swing is ≈6 characters ≈ 3.6rem. The three static chips (`n=`, shape name, `ms`)
visibly pulse, and because their text is left-aligned in stretched boxes, `Sun` sits in a plate over
three times its ink width with a large dead right margin at the widest phase. Aristotelian
proportion failure: the plate is sized by a neighbour's worst case, not by its own content.

**Falsifier.** `align-items: flex-start` (or `width: fit-content`) on `.desktop-info` — absent,
`:136-140`; or `phase` strings of equal length — refuted by the table; or the parent constraining the
width — `FourierMorphDemo.vue:12-20` passes props only, and `.stage-row` (`:84-89`) shrink-wraps.
**Confirmed.** One-line cure: `align-items: flex-start`.

### D-10 · MAJOR · The four chips are duplicated verbatim in the DOM purely to switch layout

`:13-26` and `:30-43` are the **same 4 chips, character-identical**, differing only by the
`desktop-info`/`mobile-info` wrapper and toggled by `display: none` at a 640px breakpoint
(`:124-145`). Ten elements are mounted where five would do; two independently maintained copies of
one contract.

Cost is not only DRY. Every `phase` and `harmonicLevel` change patches **both** subtrees — the
morph writes `harmonicLevel` on every rAF tick (`useFourierMorph.ts:157, :190`), which the parent
rounds (`FourierMorphDemo.vue:15`), so patches land on integer crossings across a 5↔50 sweep,
doubled. And the divergence risk is entirely ungateable: no vitest (`[FE §9]`), no axe on `/morph`
(D-1), and `visual-baseline.spec.ts:35`'s single screenshot cannot compare the two arms because only
one is ever displayed.

**This is exactly the blind spot intake row R5-7 predicts** (native-template-loop blindness): the
file contains **zero `v-for`**, so the 8 chips are invisible to any loop- or iteration-keyed census.

**Falsifier.** The two blocks differing in content — diffed character-by-character, they do not; or
the layout change being impossible in one DOM — it is not: `.stage-row` need only gain
`flex-wrap: wrap` with the single `.demo-info` at `flex-basis: 100%; flex-direction: row` below
640px and `flex-basis: auto; flex-direction: column` above, which is fewer lines than the current
two-block/three-media-query arrangement. **Confirmed.**
*(Not an a11y double-announcement finding — `display: none` does remove a subtree from the
accessibility tree. Stated so the claim is not over-read.)*

### D-11 · MAJOR · A bespoke chip where glass-ui ships the primitive **under the current pin** — plus an uplift sequencing trap

`:147-174` hand-rolls a metric chip: mono face, weight, padding, radius, tinted plate, accent
colour, `white-space: nowrap`. glass-ui **4.0.0 — the version installed right now** — exports
`./metric-badge`, and `MetricBadge`'s prop surface
(`dist/components/custom/metric-badge/MetricBadge.vue.d.ts:1-38`) maps onto all four chips without
a gap:

| chip | line | `MetricBadge` mapping |
|---|---|---|
| phase | `:14-16` | `value` + `color` |
| `n={{harmonicLevel}}` | `:17-19` | `value` + `label="n"` + `labelPosition="inline"` |
| shape name | `:20-22` | `value` |
| `{{totalMs}}ms` | `:23-25` | `value` + `unit="ms"` |

The component even ships the `sm`/`md`/`lg`/`xl` ladder this file re-derives by hand with two
`@apply` rungs (`:149, :160`), and its `abbreviation`/container-query idiom is precisely the
desktop/mobile problem D-10 solves by DOM duplication. The repo already imports `MetricBadge` at
**7 files** (`[FE §5]`, corrected by CENSUS §2 **C-4**: 7 files, not 6). This file is the outlier.

**The sequencing trap — do NOT naively "fix" this now.** `./metric-badge` is **REMOVED at 7.0.0 →
`./metric` (`Metric`)** (`[FE §5]` break table, `CHANGELOG.md` §7.0.0). Adopting `MetricBadge` here
today converts a 7-file break surface into an **8-file** one and buys a second prop migration (the
3.1→4.0 hop already cost an `amount=` → `value=` pass, 9 lines). Correct order: **leave the bespoke
chip in place through F.W1's atomic tri-package transaction, then adopt `Metric` directly at
F.W1/F.W3** as the 8th site of a migration that is happening anyway. Filed as MAJOR because the
divergence is real and costs real conformance (see D-15, D-20); the *timing* is the finding's
operative half.

**Falsifier.** `MetricBadge` absent from installed 4.0.0 — refuted, `dist/metric-badge.js`,
`dist/metric-badge.d.ts`, `dist/MetricBadge-BpC0R_Ec.js` all present and `package.json` exports
`./metric-badge`; or the chips needing something `MetricBadge` cannot express — the table above maps
all four. **Confirmed.**

### D-12 · MAJOR · Non-monotonic type and spacing ramp: the chips grow, then shrink, as the viewport widens

Two breakpoints disagree. This component switches at **640px** (`:100, :135, :158`); the root
font-size switches at **768px** (`style.css:45-49`, `1.125rem → 1rem`). Because the chip type and
padding are rem-relative and the `sm:` rung fires 128px early, the rendered ladder is:

| viewport | rule | computed |
|---|---|---|
| < 640px | `text-sm` (0.875rem) × 18px root | **15.75px** |
| 640–767px | `text-base` (1rem) × 18px root | **18.00px** |
| ≥ 768px | `text-base` (1rem) × 16px root | **16.00px** |

Type gets **larger** then **smaller** as the viewport grows. Padding rides the same fault:
`0.1875rem/0.5rem` → `0.25rem/0.625rem` gives **3.38/9.00 → 4.50/11.25 → 4.00/10.00 px**. There is a
128px-wide band — small tablets, split-view laptops — where the chips are the largest they will ever
be, at the *narrowest* layout that shows them beside the button.

**Falsifier.** The `@apply` rungs resolving to non-rem values — refuted, Tailwind v4
`--text-sm: 0.875rem` / `--text-base: 1rem`; or the root-size media query not existing — refuted,
`style.css:44-49` (an A.W2.c fold, deliberate); or 640 and 768 coinciding — they do not.
**Confirmed by arithmetic.** Cure: move the component's breakpoint to 768px, or express chip type in
`px`/`em` off a stable parent.

### D-13 · MAJOR · Two control systems in one view: a card recipe wearing a button, beside real glass `Button`s

`:4` styles the route's **primary** affordance as `class="morph-button cartoon-card"` — a
decoration-only **card** utility (`cards.css:20-47`: *"Composes ON TOP of a glass tier — it is NOT
itself a tier"*), further re-declared through a **local shim** the producer deleted at C.W5
(`style.css:99-117`). Meanwhile, in the same view, the **secondary** actions (Export, Reset) are
genuine glass `Button`s (`FourierMorphDemo.vue:70-77, :86`).

So the design language inverts with importance: the least important controls get the design
system; the most important gets a resurrected card class plus 30 lines of bespoke interaction CSS
(`:91-120`) — which is exactly where D-3 (no ring), D-5 (no disabled state), D-6 and D-7 (shim
collisions) all come from. Every one of those four defects is downstream of this single choice.
`HarmonicLevelGrid.vue:2` and `MorphPhaseConfig.vue:2` use `cartoon-card` correctly — on
`<div>` **cards**. This file is the only site in `components/morph/` that puts it on a control.

**Falsifier.** glass `Button` being unable to host a 180px square SVG target — it accepts arbitrary
default-slot content and `class`, and is already imported by the parent at `:86`; or `cartoon-surface`
being control-intended — refuted by its own header comment and by its `:hover:not(:disabled)` being
its *only* interactive concession. **Confirmed.**
**Disposition.** F.W3 (shadow retirement / glass suffusion), not F.W1 — it is a re-basing, not a
break-cure.

### D-14 · MAJOR · No pending state across the async engine boundary: the UI reads "idle", stays enabled, and double-fires

`morphTo` **awaits a dynamic import before it sets any phase**:

```
useFourierMorph.ts:141   async function morphTo(from, to) {
             :142           stopAnim();
             :145           const Animation = await getAnimationCtor();   // ← loadAnimationEngine()
             ...
             :154           phase.value = "settle-out";                  // ← first state change
```

During that await `phase` is still `"idle"`, so `isAnimating` is `false`
(`FourierMorphDemo.vue:107`), so `disabled` is `false` (`:19` → `:4`), so the phase chip renders
**`idle`** (`:14-15`). On a cold first click over a slow link the user presses the route's primary
control and every readout in the component asserts that nothing is happening — because the state
model has no vocabulary between "idle" and "settle-out".

It is not only cosmetic. A second click during the await passes the parent's re-entrancy guard
(`FourierMorphDemo.vue:130-131`, which tests `isAnimating`), flips `isMoon` back
(`:136`), and enters `morphTo` again → `stopAnim()` on `:142` kills the first run's animation while
the first `morphTo` continuation still holds `from`/`to` and its unresolved `play()` promise.
Direction and shape identity can desynchronise.

**Falsifier.** A pending flag anywhere — grepped both files: `phase` is the only state ref the
parent reads, and `isAnimating` is defined solely as `phase !== "idle"`; or the engine resolving
synchronously — refuted, `loadAnimationEngine()` returns a promise (`useFourierMorph.ts:37-44`),
memoised only *after* the first resolve, so the first click always awaits a network/parse.
**Confirmed by reading order.**
*(The engine boundary itself is good design — `useFourierMorph.ts:33-36` documents it as keeping
value.js off the eager bundle. The defect is that the boundary has no UI.)*

---

## §3 · MINOR

### D-15 · MINOR · Raw machine tokens rendered as user-facing prose

`:15, :32` print `phase` verbatim, so the UI shows **`settle-out`**, **`settle-in`**, **`idle`** —
kebab-case internal enum members (`useFourierMorph.ts:31`). Twelve lines up in the same view the
parent labels the *same three phases* in title case: `title="Settle Out"`, `"Morph"`, `"Settle In"`
(`FourierMorphDemo.vue:26, 35, 44`). One screen, two registers for one vocabulary, and the reader
must map `settle-out` ↔ "Settle Out" themselves. **Falsifier.** A formatter/lookup between prop and
template (none, `:14-16`); or the parent using raw tokens too (refuted, `:26,:35,:44`). **Confirmed.**

### D-16 · MINOR · The chips are unlabeled, so the readout is ambiguous and unannounceable

Three of four chips render a bare value: `Moon` (`:21`), `350ms` (`:24`), and only `n=` (`:18`)
carries any key. `350ms` is the *configured total duration*
(`FourierMorphDemo.vue:17` ← `morphConfig.totalMs`), but presented beside a live phase readout it
reads naturally as *elapsed* time. A screen reader (once D-1 lets one in) receives
"settle-out n=5 Moon 350ms" — four unlabeled fragments. `MetricBadge`'s `label` +
`labelPosition="inline"` + `unit` props (D-11) are the exact seat for this and cost no layout.
**Falsifier.** A `title`/`aria-label`/visible label on any of `:20-25` — none. **Confirmed.**

### D-17 · MINOR · Optical stroke weight differs ~54% between mobile and desktop

`:7` passes a fixed `:stroke-width="4.5"` in **viewBox user units** while the rendered scale changes
with the breakpoint. With `box-sizing: border-box` (Tailwind preflight), a 2px `cartoon-surface`
border (`cards.css:34`) and the paddings at `:95, :104`:

| breakpoint | box | padding | content | scale (200u) | **rendered stroke** |
|---|---|---|---|---|---|
| < 640px | 120px | 0.625rem @18px = 11.25 | 93.5px | 0.468 | **2.10px** |
| 640–767 | 180px | 1rem @18px = 18 | 140px | 0.700 | **3.15px** |
| ≥ 768px | 180px | 1rem @16px = 16 | 144px | 0.720 | **3.24px** |

The drawn line is **54% heavier** on desktop than on mobile — the shape's optical weight, its single
most characterful property, is an accident of layout arithmetic rather than a decision. Fix is
one attribute: `vector-effect="non-scaling-stroke"` in `FourierMorphSvg.vue:7-14`, or a
breakpoint-aware `strokeWidth` (the prop already exists, `FourierMorphSvg.vue:25`).
**Falsifier.** The `<svg>` carrying explicit width/height that decouples it — refuted,
`FourierMorphSvg.vue:2-9` sets only `viewBox` + `class`, and `.fourier-morph-svg` (`:36-39`) sets
only `display: block; overflow: visible`, so it resolves to 100%/100% of the content box with
default `preserveAspectRatio` (uniform meet). Exact rendered px are **UNPROVEN-NEEDS-LIVE (SS-13)**;
the ~1.54× *ratio* is scale-invariant and holds regardless.

### D-18 · MINOR · No empty state — first paint renders `<path d="">`

`useFourierMorph.ts:78` initialises `currentPoints` to `[]`; `pointsToSvgPath` returns `""` for
`points.length < 2` (`svg-fourier.ts:51`); the shape is only populated in the parent's `onMounted`
(`FourierMorphDemo.vue:127-129`). So the first render pass paints an **empty card** — full
120/180px chrome, no mark — and the chips read `idle / n=50 / Sun / 350ms`, i.e. they describe a
shape that is not yet drawn. There is also no error state: `prepareFourierShape(sunData as any)`
runs at module scope (`FourierMorphDemo.vue:97-98`) with a suppressed type and no boundary; a
malformed asset yields a permanently blank card with confident metadata beside it.
**Falsifier.** A `v-if`/skeleton/fallback on `:5-9` (none) or synchronous initialisation before
first paint (refuted — `onMounted` runs after the initial render). **Confirmed.**
Severity held at MINOR: the gap is one tick on a warm load. It becomes user-visible only on a slow
first paint — **UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-19 · MINOR · `phase: string` — the design contract that drives class names is untyped

`:52` declares `phase: string` where `MorphPhase = "idle" | "settle-out" | "morph" | "settle-in"`
is exported one import away (`useFourierMorph.ts:31`). That string is then used **as a CSS class**
(`:14, :31`), so the styled state set (`:165-174`, three of four members) is a silent, unenforced
convention. Add a phase upstream and the chip degrades to neutral with no error — and `vue-tsc`,
which `[FE §9]` establishes as one of only two gates, is the one tool that could have held this and
is disarmed by the widened type. **Falsifier.** `MorphPhase` not being exported (it is, `:31`) or
the string not reaching a selector (it does, `:165-174`). **Confirmed.**

### D-20 · MINOR · Hand-rolled mono where the glass typography utility exists and both siblings use it

`:148` sets `font-family: var(--font-mono)`. glass-ui 4.0.0 ships `@utility fira-code`
(`typography/utilities.css:69-72`) = `font-family: var(--font-mono)` **plus
`font-feature-settings: "liga", "calt"`**. Both siblings in this folder use it —
`HarmonicLevelGrid.vue:15, :38`, `MorphPhaseConfig.vue:17, :19`. So the chips get the family but
**not** the ligature/contextual-alternate treatment, and `n=5` / `350ms` render in a measurably
different mono voice from the `ms` unit and numeric inputs directly below them in the same view.
**Falsifier.** `fira-code` absent at 4.0.0 (present) or the siblings not using it (they do).
**Confirmed.**

### D-21 · MINOR · `cursor: wait` overstates the busy scope

`:119`. `wait` means *the whole application is busy*; `progress` means *this operation is running,
the UI remains interactive*. The rest of the page — three `MorphPhaseConfig` cards, the harmonic
grid, Export/Reset — stays fully interactive during a morph (`FourierMorphDemo.vue:22-79`; only
`handlePreviewClick` self-guards, `:143`). `progress` is the correct keyword.
**Falsifier.** The morph blocking the page (it does not; the guards are per-handler). **Confirmed.**

### D-22 · MINOR · The shape never carries the phase colour, though the mechanism is exported and the sibling uses it

The chips speak a state colour language — red for settle, pink for morph (`:165-174`) — while the
**subject** those chips describe stays a constant `--accent-red` throughout (`:5-9` passes no
`strokeColor`, so `FourierMorphSvg.vue:31`'s default applies). The colour is applied to the metadata
and withheld from the object. `useFourierMorph` exports `morphProgress` (`:80, :211`) *for exactly
this*, and `DarkModeToggle.vue:45-56` uses it to lerp the stroke across the morph. The richer
treatment already exists in the tree; this component declines it.
**Falsifier.** `strokeColor` bound at `:5-9` (it is not) or `morphProgress` unexported (it is,
`:211`). **Confirmed.** Filed MINOR as a design-language coherence gap, not a bug.

### D-23 · MINOR · Dead declarations on `.stage-row` at mobile

`:84-89` sets `justify-content: center` and `gap: 2rem`, but below 640px `.desktop-info` is
`display: none` (`:124-126`), leaving `.stage-row` with **one** child — so both declarations are
inert, and the actual mobile centring comes from `.demo-stage { align-items: center }` (`:72`).
Two mechanisms, one of which never fires, for one behaviour. Also `gap: 2rem` is never re-tuned:
the button↔chips separation is 32px at ≥768px but **36px** at 640–767px (rem × 18px root, D-12) —
the widest gap at the narrowest layout that uses it. **Falsifier.** A second `.stage-row` child at
mobile (none — `:3-27` has exactly the button and `.desktop-info`). **Confirmed.**

---

## §4 · INFO

### D-24 · INFO · Redundant `view-box` prop
`:8` passes `view-box="0 0 200 200"`; `FourierMorphSvg.vue:28` already defaults `viewBox` to the
identical string. Harmless, but it is a second declaration site for a value that has an owner — and
it is duplicated a third time at `DarkModeToggle.vue:12`. Cheap tidy at F.W3.

### D-25 · INFO · Resting border falls under WCAG 1.4.11 — **upstream token, not this component**
`--border` = `--neutral-4`: light `hsl(32 26% 70%)` → **1.94:1** vs `--background`; dark
`hsl(30 16% 34%)` → **2.82:1** (`color-radius.css:44,95`; `dark-arm.css:46`). Both under the 3:1
non-text bar for a control boundary. Recorded as INFO and **explicitly not charged to this file**:
the value comes from the `cartoon-card` shim (`style.css:109`) and is shared by all **25**
`cartoon-card` sites (`[FE §3]`). Mitigations exist (the `--card` plate, the offset-stamp shadow, the
120/180px scale), so the 1.4.11 verdict is arguable rather than settled. **Route to the glass BH
inbox with the existing `cartoon-card` + `--viz-amber` carries** (standing relay law) — do not mint
a fourth local override. Whether the boundary is perceivable in practice is
**UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-26 · INFO · Two spellings of the ring token in one repo
`style.css:139` uses `var(--ring)`; `DarkModeToggle.vue:99` uses `var(--color-ring)` (the Tailwind
bridge alias, `theme/bridges.css`). Both resolve, but a component adopting the house ring (D-3) has
two equally-precedented spellings to choose from. Pick one at F.W3 and state it.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

**S-1 · The tap target is exemplary.** 120×120px mobile, 180×180 desktop (`:92-93, :102-103`) —
**7.4×** the WCAG 2.5.8 (AA) 24×24 minimum by area and 2.7× linear on the *smallest* rung, with
`flex-shrink: 0` (`:96`) guaranteeing it. Most of this audit's siblings would be improved by
borrowing it. *Falsifier: an ancestor transform scaling it down — none in `FourierMorphDemo.vue`'s
scoped block.*

**S-2 · Zero hard-coded colour. Every colour is a glass-ui token.** All six colour references
(`:109, :110, :153, :154, :167, :168, :172, :173`) are `var(--accent-red)`, `var(--accent-pink)`,
`var(--muted)`, `var(--foreground)` — no hex, no `rgb()`, no literal in 175 lines. This is
**stricter than its own precedent**: `DarkModeToggle.vue:30-31` hard-codes `#E88845` and `#c084fc`
with a comment conceding the second "matches VIZ_COLORS.legendre" by hand. Theme-switching and any
future token re-baseline reach this file for free. *Falsifier: a literal anywhere in `:64-175` —
grepped, none.*

**S-3 · The SVG stroke clears WCAG 1.4.11 in all four theme×surface combinations.**
`--accent-red` vs backdrop: **4.71:1** light-on-page, **5.52:1** dark-on-page, **4.62:1** light-on-card,
**4.07:1** dark-on-card — every one above the 3:1 non-text bar, with ≥35% headroom. The one piece of
information the component exists to convey is legible in every theme. *Falsifier: the shape being
decorative rather than informational — refuted, it **is** the subject of the route.*

**S-4 · The neutral chip is a contrast exemplar.** `--foreground` on `--muted` @60%: **16.21:1**
light / **14.74:1** dark (`:153-154`) — roughly 3.6× the AA bar. It is the direct proof that D-2's
two accent chips are a *local* choice and not a token limitation: the correct pattern is already
present in the same rule block, eight lines above the failing one.

**S-5 · A genuinely clean presentational component.** Six props in, one event out (`:50-61`); zero
composables, zero store, zero router, zero fetch, zero lifecycle hooks, zero local state. It cannot
desynchronise from its parent because it holds nothing to desynchronise. In a 20.6k-LOC frontend
with `vitest` ABSENT (`[FE §9]`), a component this pure is the cheapest possible thing to test the
day a unit floor lands (F.W4's open decision) — it needs only mount-and-assert. **The container/
presentational split here is correct and should be held up as the pattern**, and it is why every
defect above is a surface defect: the architecture is sound.

**S-6 · The responsive intent is thought-through, even where the execution slips.** The author
identified the real problem (a fixed-size subject plus a metadata column cannot share a row on a
phone), chose the right primitives for it (`flex-shrink: 0` on the subject at `:96`, `flex-wrap` on
the mobile chip run at `:130`), and tuned padding, gap, type and box size independently at the
breakpoint (`:100-106, :158-163`). D-10 and D-12 are failures of *mechanism* (a duplicated subtree;
a breakpoint 128px out of step with the root-size rung), not of attention — three of this audit's
MAJORs dissolve into one-line CSS edits precisely because the structure underneath them is right.

---

## §6 · Disposition summary

| wave | rows |
|---|---|
| **Pre-F.W1 (blocks nothing, fix now)** | **D-1** (aria-label + add `/morph` to an axe keystone), **D-2** (chip fg → `--foreground`) |
| **F.W1** — atomic tri-package uplift | D-4, D-5, D-9, D-12, D-19, D-21, D-23 (all local, none depends on the bump); **D-11 explicitly DEFERRED to F.W1/F.W3 → adopt `Metric`, never `MetricBadge`** |
| **F.W3** — shadow retirement / glass suffusion | D-3, D-13, D-14, D-16, D-17, D-20, D-22, D-24, D-26 |
| **F.W4** — audit saturation | D-10 (with R5-7's native-subtree lesson), **D-8** (the third ungated clock — amends `[FE §8]`) |
| **glass BH inbox relay** (standing law) | **D-6, D-7** (the `cartoon-card` shim↔consumer cascade collisions — the shim deletes the producer's hover shadow and transition), **D-25** (`--border` at 1.94:1 / 2.82:1, 25 sites) |

**Two corpus amendments carried forward:** (1) `[FE §8]`'s "two ungated animation clocks" is
**three** — the `useFourierMorph` engine is ungated *and* has no transport control, so the WCAG 2.2.2
mitigation that covers the epicycle clock does not transfer (D-8). (2) Intake **R5-7**'s
native-template-loop blindness is confirmed in a second, distinct form here: 8 hand-unrolled
duplicate subjects with **zero `v-for`**, invisible to any iteration-keyed census (D-10).

*Read-only audit. `/Users/mkbabb/Programming/fourier-analysis` was not modified. The only write is
this file.*
