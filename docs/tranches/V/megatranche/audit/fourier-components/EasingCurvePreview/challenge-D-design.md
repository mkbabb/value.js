claude-opus-5[1m]

# CHALLENGE · `EasingCurvePreview.vue` · axis **D (design)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingCurvePreview.vue` (41 lines)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser. Every claim carries severity · `file:line` · falsifier.
**Verdict** **RED.** 14 defects — **2 BLOCKER**, 4 MAJOR, 5 MINOR, 3 INFO — plus **4 superlatives** and **1 blocker-class carry** attributed to the adjacent consumer. The two blockers are coupled and geometric: the component draws its glyph at **43.7 % of its own declared width**, and at that scale **10 of the 15 curve pairs in its catalog are separated by less than one stroke width** — i.e. the control cannot discharge the single function it exists for (tell six easings apart by shape).

---

## §0 · Method, provenance, and what is NOT proven

### 0a · Files read whole (read-only; zero writes outside this file)

| Path | Why |
|---|---|
| `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingCurvePreview.vue` | subject |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/stores/animation.ts` | the only import (`getEasingSVGPath`, `EasingName`) |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/lib/easings.ts` | transitive: catalog + path generator + cache |
| `/Users/mkbabb/Programming/value.js/src/easing.ts` | transitive: the six easing function bodies (range proof) |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingPicker.vue` | sole consumer |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/AnimationControls.vue` | host chrome (uplift break-surface contact) |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue` | the in-tree twin preview |
| `/Users/mkbabb/Programming/fourier-analysis/web/src/style.css` | `--viz-amber` contrast-carry precedent, PRM block |
| `/Users/mkbabb/Programming/fourier-analysis/web/e2e/visualization-ux.spec.ts` | the a11y gates over this surface |
| `…/web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css` (**installed 4.0.0**) | token values under the OLD PIN |
| `/Users/mkbabb/Programming/glass-ui/src/components/easing/{README.md,index.ts,constants.ts,EasingPicker.vue,composables/useEasingPicker.ts}` (**producer 7.0.0**) | the uplift target family |

### 0b · Numeric pipeline, validated before use

All contrast figures come from a WCAG-2.x relative-luminance implementation written for this challenge. **Validation:** it reproduces the producer's own annotated ratios for `--neutral-5` — `color-radius.css:45` declares *"WCAG AA: 5.21:1 vs page / 4.90:1 vs muted"*; the pipeline returns **5.21** and **4.89**. Geometry figures are exact `preserveAspectRatio="…meet"` arithmetic, not estimates.

### 0c · UNPROVEN-NEEDS-LIVE (for SS-13)

- **U-1** AX-tree exposure of an unnamed inline `<svg>` is engine-dependent (D-9 states the markup fact, not the announcement).
- **U-2** the 0.31 px cap clip (D-7) is spec-certain but sub-pixel — visible confirmation wants ≥2× DPR or zoom.
- **U-3** whether the 3-column chip grid overflows the real `DropdownMenuContent` width (D-13 side-note).
- **U-4** the *perceptual* half of D-2. The geometry (0.34 px peak separation on a 1.84 px stroke) is not refutable; "a user cannot tell sine from quad" is an inference from it.
- **U-5** whether axe would raise `color-contrast` on the active chip label if keystone 4 were un-`fixme`'d (the rule's impact is `serious`, which the harness treats as blocking — `visualization-ux.spec.ts:32-34`).
- **U-6** the dark-arm contrast figure (5.49:1) assumes a near-black page; fourier's dark `--background` resolves through `light-dark()`/`contrast-color()` and is not statically decidable from the installed package (`ladder.css:257,266`).

---

## §1 · The component, as the tree actually renders it

`EasingCurvePreview.vue:18-33` declares a `viewBox` of `-0.05 -0.3 1.1 1.6` (**portrait**, aspect 0.6875) inside an element of `size × size*0.7` = 28 × 19.6 px (**landscape**, aspect 1.4286), with `preserveAspectRatio="xMidYMid meet"`. `meet` takes the *binding* axis:

```
scale      = min(28/1.1, 19.6/1.6) = min(25.45, 12.25) = 12.25 px per user-unit
curve ink  = 1.0 × 1.0 user-units  → 12.25 × 12.25 px
gutters    = (28 − 1.1×12.25)/2 = 7.26 px left AND right   (dead)
            (19.6 − 1.0×12.25)/2 = 3.68 px top AND bottom  (dead)
stroke     = 0.15 × 12.25 = 1.84 px  (= 15.0 % of the ink height)
ink / box  = 150.1 / 548.8 = 27.3 % of the reserved area
ink width  = 12.25 / 28    = 43.7 % of the declared `size`
```

Everything in §2 falls out of those five lines.

---

## §2 · Defects

### D-1 · **BLOCKER** · The declared footprint is 2.29× the drawn glyph — a portrait viewBox pillarboxed inside a landscape box, padded for an overshoot that no member of the catalog has

**Provenance** `EasingCurvePreview.vue:19` (viewBox), `:21-22` (`size` / `size*0.7`); catalog `web/src/lib/easings.ts:73-80`; function bodies `/Users/mkbabb/Programming/value.js/src/easing.ts:17-30`.

Two independent decisions fight. (i) The viewBox reserves **0.3 user-units of headroom above and below** a curve whose y-range is exactly `[0,1]` — 4× more than the 0.075 the stroke's half-width needs. (ii) The element is authored landscape (`×0.7`) while that headroom makes the content portrait. `meet` therefore binds on height, and the drawing collapses to **43.7 % of the declared width / 27.3 % of the reserved area**, with 7.26 px of dead gutter on each side of every one of the six chips.

The headroom is not defensive — it is vestigial. All six `ANIMATION_EASINGS` members are monotone in `[0,1]`; sampled at the generator's own `n = 32` (`easings.ts:88-95`) every curve returns min `0.0000`, max `1.0000`. Overshoot exists only in the *other* catalog (`EASING_PRESETS`' back easings, `easings.ts:33-35`), which this component's prop type cannot accept (see D-5). The pad was authored for a curve family that never arrives.

Contrast the in-tree twin: `MorphPhaseConfig.vue:47` draws in `viewBox="0 0 40 20"` with ink at `x∈[2,38], y∈[2,18]` (`easings.ts:118-121`) inside a CSS box of exactly 40 × 20 (`MorphPhaseConfig.vue:198-202`) — viewBox aspect *equals* element aspect, zero letterboxing, **72 % ink area**. The twin is 2.6× denser than the component whose whole job is to be the reusable one. Contrast the producer, which refuses static pad entirely and fits the viewBox to the sampled extrema each frame (`glass-ui/src/components/easing/composables/useEasingPicker.ts:246-255`, `VIEW_PAD = 0.1`, `constants.ts:31-33`).

**Falsifier** — *"the headroom is needed."* Refuted: exhibit one `ANIMATION_EASINGS` member with `v ∉ [0,1]`, or one where the round cap needs more than 0.075 units. Neither exists; the cap in fact needs **more x-pad than it is given** (D-7). *"the 0.7 is a deliberate landscape crop."* Refuted by `meet`: `meet` never crops — it letterboxes. A deliberate crop would be `slice`.

**Repair (non-binding)** a stroke-tight viewBox (`-0.08 -0.08 1.16 1.16`) on a square element raises the ink from 12.25 px to **24.1 px (+97 %)** at the same declared `size`; keeping the 0.7 height and padding in x instead yields 16.9 px (+38 %).

---

### D-2 · **BLOCKER** · At the shipped geometry the six previews are not mutually distinguishable — 10 of 15 curve pairs differ by less than one stroke width

**Provenance** `EasingCurvePreview.vue:29` (`stroke-width="0.15"`), geometry per §1; catalog `easings.ts:73-80`.

Peak vertical separation of every catalog pair, sampled at 401 points, converted at the shipped 12.25 px/unit against the shipped 1.84 px stroke:

| pair | Δ (units) | Δ (px) | vs stroke |
|---|---|---|---|
| sine ↔ quad | 0.0280 | **0.34** | **0.19×** |
| quad ↔ cubic | 0.0741 | 0.91 | 0.49× |
| circ ↔ expo | 0.0813 | 1.00 | 0.54× |
| cubic ↔ circ | 0.0860 | 1.05 | 0.57× |
| sine ↔ cubic | 0.1019 | 1.25 | 0.68× |
| linear ↔ sine | 0.1053 | 1.29 | 0.70× |
| linear ↔ quad | 0.1250 | 1.53 | 0.83× |
| quad ↔ circ | 0.1250 | 1.53 | 0.83× |
| cubic ↔ expo | 0.1321 | 1.62 | 0.88× |
| sine ↔ circ | 0.1470 | 1.80 | 0.98× |
| linear ↔ cubic | 0.1924 | 2.36 | 1.28× |
| quad ↔ expo | 0.1955 | 2.39 | 1.30× |
| linear ↔ circ | 0.2071 | 2.54 | 1.38× |
| sine ↔ expo | 0.2218 | 2.72 | 1.48× |
| linear ↔ expo | 0.2882 | 3.53 | 1.92× |

Ten of fifteen pairs sit **below 1.0×**; the tightest is **one fifth of a stroke width**. The stroke is 15.0 % of the ink height — against the producer's **3.5 %** for the same object (`glass-ui/src/components/easing/EasingPicker.vue:367`) and the in-tree twin's **9.4 %** (1.5 in a 16-unit curve, `MorphPhaseConfig.vue:52`). The component is 4.3× the producer's weight on a glyph 2× too small: inflection — the *only* information a curve thumbnail carries — is swallowed by its own ink. The picker consequently degrades to its 9 px text labels (`EasingPicker.vue:98-102`), which is the state a curve picker exists to avoid.

**Falsifier** — *"peak deviation is the wrong metric; shape reads even under a fat stroke."* Partly fair, and U-4 books it: the perceptual claim needs a render. What survives regardless is the geometric fact (0.34 px on 1.84 px) and the three-way convention divergence (15 % vs 9.4 % vs 3.5 %) — none refutable from source. *"the label disambiguates."* That concedes the defect: the glyph is then decoration, and D-1's 548 px² reservation buys nothing.

**Coupling** D-2 cannot be repaired alone: thinning to 0.035 at today's 12.25 px ink yields a 0.43 px sub-pixel stroke. Fix D-1 first (24.1 px ink), then 0.035 gives a 0.84 px stroke at which **14 of 15 pairs clear 1× stroke** (only sine↔quad remains at 0.80×).

---

### D-3 · **MAJOR** · A hardcoded, theme-blind brand literal in the public prop default — while a conforming light/dark token ships in the **installed** package

**Provenance** `EasingCurvePreview.vue:12` (`color: "hsl(248 88% 71%)"`), duplicated at `EasingPicker.vue:47` (`--easing-accent`); token evidence `…/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:40-85` and `…/dist/styles/glass/ladder.css:257,266`.

`hsl(248 88% 71%)` = `rgb(133 116 246)` = `oklch(0.639 0.187 285.9)`. Measured against the installed light ladder:

| against | ratio |
|---|---|
| `--background` (`--neutral-0` `hsl(40 30% 98%)`) | **3.46 : 1** |
| `--card` (`hsl(36 48% 97%)`) | 3.40 : 1 |
| `--muted` (`--neutral-1` `hsl(38 26% 95%)`, the chip hover bed) | 3.26 : 1 |
| near-black dark page | 5.49 : 1 (U-6) |

Three separate problems, all in that one string:

1. **It cannot theme.** It is a plain literal with no light/dark arm, in a system whose every colour rung is `light-dark()`-resolved by design (`ladder.css:121,126`) and whose token file carries per-rung WCAG annotations (`color-radius.css:45,52-54`). It freezes at the light value in dark mode.
2. **It is chromatically foreign.** The installed ladder is an explicitly *warm* identity — hues 28–40, machine-locked by `proof:no-gray` (`color-radius.css:30-39`). A 88 %-saturation violet at OKLab H 285.9° is not a member of that register, and it was introduced without the token-review the ladder's own prose demands.
3. **The token already exists at the old pin.** `EasingPicker.vue:44-47` states the carry lives locally *"until"* a `--viz-easing` token lands upstream. **That is false against the installed tree**: glass-ui **4.0.0** already ships a light/dark-armed indigo — `--viz-chebyshev` = `light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4))` — measuring **6.40 : 1 light / 7.82 : 1 dark**, i.e. **1.85× this literal's light contrast**, with the dark arm the literal doesn't have. No uplift is required to fix this.

**Falsifier** — *"3.46:1 passes WCAG 1.4.11 for a graphic (3:1)."* Correct, and I do **not** claim a stroke violation: the stroke passes, with a 15 % margin. The defect is tokenisation, theming and chromatic conformance — plus the carry below. *"the default is dead code (the picker always passes `color`)."* True — `EasingPicker.vue:34` is the only callsite and always supplies a value; that is why this is MAJOR and not BLOCKER. It also makes the literal *worse*, not better: an unexercised default that hardcodes brand colour is a trap primed for the second consumer.

> **CARRY (blocker-class, attributed to `EasingPicker.vue:47,103-105`, not counted in this component's blocker total).** The same literal, copied into `--easing-accent`, colours the **active chip label** — `font-size: 0.5625rem` (9 px), `font-weight: 500` — at **3.46 : 1**. WCAG 2.1 **1.4.3 AA requires 4.5:1** for text that size. The tree has already litigated this exact ratio: `style.css:113-121` darkens `--viz-amber` from `hsl(35 70% 42%)` because *"≈ 3.54:1 … fails WCAG AA"*. **3.46 < 3.54.** Fourier remediated a *better* ratio and shipped this one. `EasingCurvePreview.vue:12` is the literal's canonical home, hence the carry files here.

---

### D-4 · **MAJOR** · A `color` prop where `currentColor` belongs — the cascade is converted into a JS prop and then loses state

**Provenance** `EasingCurvePreview.vue:8,12,28`; callsite `EasingPicker.vue:31-35`; the correct in-tree idiom at `MorphPhaseConfig.vue:51` (`stroke="currentColor"`).

The consumer passes `anim.easing === key ? 'var(--easing-accent)' : 'var(--muted-foreground)'` — a **CSS variable smuggled through a JS ternary**. Costs:

- **Redundancy.** `var(--muted-foreground)` is the value the sibling label already receives from CSS (`EasingPicker.vue:100`). The prop re-states, in JavaScript, what the cascade delivers for free.
- **State-blindness.** Because the stroke is bound to a prop rather than inherited, it cannot respond to `:hover`, `:focus-visible`, `:active` or `:disabled` on the chip without a re-render. The chip *does* change ground on hover (`.easing-chip:hover { background: var(--muted) }`, `EasingPicker.vue:76-78`) while the curve stays fixed — the one moment the mark most needs to lift.
- **Lost simplification.** `stroke="currentColor"` in the child plus `.easing-chip.is-active { color: var(--…) }` in the parent yields *both* states, hover included, with **zero props** — precisely the twin's construction.

**Falsifier** — *"a prop is more explicit."* Refuted by the sibling: the label achieves the identical two-state colouring through the cascade in one rule (`EasingPicker.vue:103-105`), and gets hover/focus for free. *"`currentColor` would collide with the Button's own text colour."* That collision *is* the design: the curve should read as one mark with its caption.

---

### D-5 · **MAJOR** · The prop domain is too narrow to serve its own tree — which is why a second, divergent preview exists

**Provenance** `EasingCurvePreview.vue:6` (`easing: EasingName` — the closed 6-member union, `easings.ts:69`); the duplicate `MorphPhaseConfig.vue:47-54`; both generators `easings.ts:88-95` and `:110-124`.

The tree needs a curve thumbnail in two places. This component can only serve one, because its prop is a **catalog key from the 6-member animation union**, while the morph surface picks from the 22-member `EASING_PRESETS` string catalog (`easings.ts:29-52`). So the second site inlines its own SVG — and the divergence is total:

| | `EasingCurvePreview.vue` | `MorphPhaseConfig.vue:47-54` |
|---|---|---|
| class name | `.easing-preview` | `.easing-preview` (**identical, both scoped**) |
| coordinate space | 0..1 normalized | 40×20 absolute |
| pad | 0.3 vertical / 0.05 horizontal | 2 uniform |
| viewBox ↔ element aspect | 0.6875 vs 1.4286 (**mismatch**) | 2.0 vs 2.0 (**match**) |
| ink area | 27.3 % | 72 % |
| stroke, % of curve height | 15.0 % | 9.4 % |
| colour | prop + hardcoded default | `currentColor` |
| sizing | SVG attributes | CSS |
| sample count | 33 | 25 |

Two components, one class name, eight divergences: the app draws the same object two visibly different ways. The generators differ only in coordinate space — the abstraction was available and not taken. A geometry-first prop (`d: string`, or `fn: EasingFn`, both already in hand: `EasingFn` at `easings.ts:19`) would have made one component serve both.

**Folds** intake row **R3-12** (`lane-fourier-r3-r6.md:86`) — `MorphPhaseConfig easingNames` is one of the 7 duplicated open-family records collapsing 35 → 28. That row establishes the morph easing surface as a *duplicate record*; this challenge supplies what it could not see: the two surfaces are also **geometrically incompatible**.

**Falsifier** — *"the catalogs are genuinely different products (playback easing vs morph easing)."* Granted for the *catalogs*; not for the *renderer*. Both render `fn: (t)=>number` over `[0,1]`. If the renderer must know the catalog, name the coupling; it does not.

---

### D-6 · **MAJOR** · Zero prose, four unexplained magic numbers — against both the in-tree and the producer convention

**Provenance** `EasingCurvePreview.vue:11` (`28`), `:19` (`-0.05 -0.3 1.1 1.6`), `:22` (`0.7`), `:29` (`0.15`) — the file contains **no comment of any kind**.

Every neighbour on this path carries wave-tagged rationale: `EasingPicker.vue:8-15` (the ARIA-role argument), `:44-47` (the token carry), `:81` ("A.W3.d — named properties … no `transition: all`"); `stores/animation.ts:13-18, 31-40` (essay-length gating rationale); `easings.ts:1-7` (the two-catalog rule); `style.css:98-121` (the shim and the contrast carry, each with a measurement). The producer goes further and makes exactly these numbers a *named module* — `glass-ui/src/components/easing/constants.ts:1-7`: *"The SVG-geometry + sampling magic-number home … homed here so the composable + SFCs stay magic-number-free."*

So the single most consequential number in the file — the `-0.3` headroom that costs 56 % of the glyph (D-1) — arrives undefended, and no reader can tell whether it is a considered overshoot budget or a copy-paste from the back-easing editor. This is a prose-quality defect with direct causal weight: D-1 and D-2 would have been caught at authoring time by the sentence nobody had to write.

**Falsifier** — *"41 lines need no comments."* Refuted by density, not length: this file is ~10 % magic numbers by token count, in a repo that annotates a 2-line CSS override with a measured contrast ratio and a wave id.

---

### D-7 · **MINOR** · Both endpoint round caps are clipped by the viewport — the horizontal pad is 33 % smaller than the stroke needs, while the vertical pad is 300 % larger

**Provenance** `EasingCurvePreview.vue:19` (`viewBox` x-origin `-0.05`, width `1.1`), `:29-30` (`stroke-width="0.15"`, `stroke-linecap="round"`).

Half-stroke = 0.075. The path starts at x = 0 and ends at x = 1 (`easings.ts:90-93`), so the round caps extend to x = −0.075 and x = 1.075. The viewBox spans x ∈ [−0.05, 1.05]. The outermost `<svg>` clips to its viewport by default, so **0.025 user-units ≈ 0.31 px is shaved off each cap** — the round terminals render as flats. Meanwhile y is padded 0.3 where 0.075 would do. The pad is wrong in both directions at once, and each error worsens D-1: the y-overpad shrinks the glyph, the x-underpad nicks the ends of what is left.

**Falsifier** — *"SVG doesn't clip to the viewBox."* Correct, and irrelevant: it clips to the **viewport**, whose default overflow is hidden on the outermost `<svg>`. Refute by exhibiting an `overflow: visible` rule — the scoped block (`:36-41`) sets only `display` and `flex-shrink`. Visibility at 0.31 px is booked U-2.

---

### D-8 · **MINOR** · Stroke weight scales with `size`; there is no optical floor or ceiling

**Provenance** `EasingCurvePreview.vue:29` — a user-unit stroke with no `vector-effect="non-scaling-stroke"`.

| `size` | ink | stroke |
|---|---|---|
| 14 | 6.1 px | **0.92 px** (sub-pixel; grey-washes on 1× displays) |
| 28 (shipped) | 12.3 px | 1.84 px |
| 40 | 17.5 px | 2.63 px |
| 64 | 28.0 px | **4.20 px** (a 4 px bar on a 28 px glyph) |

The prop is advertised as a size knob but is really a *weight* knob too, and both ends of its plausible range are bad. The producer avoids this by fixing stroke in a viewBox that always fills its canvas.

**Falsifier** — *"proportional stroke is the point of vector art."* True for illustration, false for a UI glyph, where optical weight is a typographic constant. Refute by exhibiting any other icon-scale mark in the tree whose stroke tracks its box — the twin does not (fixed 1.5 in a fixed 40×20, `MorphPhaseConfig.vue:52,198-202`).

---

### D-9 · **MINOR** · The SVG has no accessible-name posture at all — neither `aria-hidden` nor `role="img"` + `<title>` — and no API to choose one

**Provenance** `EasingCurvePreview.vue:18-24` (no `role`, no `aria-*`, no `<title>`); consumer context `EasingPicker.vue:20-36`.

In the shipped composition the SVG is decorative (the chip's name comes from the label span) and should carry `aria-hidden="true"`; six unnamed graphic nodes are instead handed to the AX tree of an open menu (U-1). Standalone — the component is a general-purpose export — it is the *only* content, and there is no prop by which a caller could name it. Both readings need an affordance the component doesn't have; a `decorative`/`label` prop resolves both in one line.

Note the boundary: `lane-frontend.md:629` rightly praises this family's ARIA work (`role="menuitemradio"` + `aria-checked` with written rationale, `EasingPicker.vue:9-15`). That praise is about the **Button**; it does not reach the SVG inside it, and the twin (`MorphPhaseConfig.vue:47`) has the same gap — so there is no in-tree convention to inherit.

**Falsifier** — *"decorative SVGs without `role` are ignored anyway."* Engine-dependent (U-1), which is why this is MINOR. Not refutable: the file offers callers no way to express intent either way.

---

### D-10 · **MINOR** · No fallback state, on a lookup the sibling consumer guards

**Provenance** `easings.ts:100-107` (`ANIMATION_EASINGS[name].fn`, unguarded) vs `stores/animation.ts:28` (`ANIMATION_EASINGS[easing.value]?.fn ?? ((x) => x)`, guarded); callsite cast `EasingPicker.vue:31,33` (`key as EasingName`); no boundary in tree (`grep -rn "onErrorCaptured\|errorHandler" web/src/` → **0 hits**).

The axis asks for empty/error/loading coverage. There is no loading state and none is owed (the path is synchronous and cached). But error coverage is *asymmetrically absent*: the same catalog is indexed defensively one file away and bare here, and the only callsite reaches it through an **assertion** (`as EasingName` over an object key typed `string | number`), not a proof. With no error boundary anywhere in `web/src/`, an unknown name throws during render and unmounts the subtree rather than degrading to a linear ramp.

**Falsifier** — *"the union makes it unreachable."* Nearly: today's single callsite iterates the same catalog, so the crash is not live. That is why this is MINOR and not MAJOR. It is not *unreachable* — it is unreached, guarded by a cast, in a component with a public prop.

---

### D-11 · **MINOR** · The component ships with no observing gate whatsoever

**Provenance** `e2e/visualization-ux.spec.ts:192` (`test.fixme("keystone: AnimationControls dropdown-open is a11y-clean")` — the **only** keystone that scans the surface hosting all six instances, disabled); `:150-164` (the one running keystone opens the menu only in transit to the Export dialog); `:27-34` (full-page axe, `serious`/`critical`); vitest **ABSENT** (`CENSUS-2026-08-03.md:256-258`).

Three layers of blindness stack: no unit test exists anywhere in the repo; the a11y keystone over this surface is `fixme`'d pending the glass-ui bump; and axe has no general graphics-contrast rule, so a curve stroke's contrast is unauditable by that gate **by construction**. Every defect above is invisible to CI. (If keystone 4 were un-`fixme`'d, the 3.46:1 active *label* of the D-3 carry would be `serious` and would fail the gate — U-5.)

**Falsifier** — *"visual-baseline.spec.ts covers appearance."* It would catch *change*, not *wrongness*: a baseline snapshot of a 12.25 px glyph blesses D-1 and D-2 as the reference.

---

### D-12 · **INFO** · Fractional box + redundant callsite arg

`:22` `size * 0.7` → **19.6 px**, a fractional layout box in a grid row (sub-pixel rounding differs per engine and per DPR). `EasingPicker.vue:32` passes `:size="28"`, restating the default (`:11`) — the prop reads as deliberate tuning when it is the fallback.

**Falsifier** — a `size` producing an integer height (e.g. 30 → 21) would show the factor is fine and the callsite is the problem; both are one-line fixes and neither is defended in prose (D-6).

---

### D-13 · **INFO** · Visual hierarchy inverted — the caption outweighs the content

The chip's semantic content is the curve; its caption is 9 px text (`EasingPicker.vue:98-102`). "Exponential" is 11 characters: at *any* plausible advance width (≥0.4 em at 9 px) the label is **≥ 39.6 px**, i.e. **≥ 3.2× the 12.25 px ink width** of the curve it captions, and it — not the SVG — sets the grid column's intrinsic width. The mark that carries the meaning is the smallest thing in the cell. (Whether the 3-column grid then overflows the dropdown is U-3.)

**Falsifier** — the lower bound is font-independent; refuting it requires a font whose average advance at 9 px is under 3.6 px.

---

### D-14 · **INFO** · ~4× oversampled for the size it ships at

33 points (`easings.ts:88`, `n = 32`) across 12.25 px = **0.38 px per segment**. Harmless at runtime (the result is cached — see S-2), but it is corroborating evidence for D-1: the path was authored for a render several times larger than the one the viewBox arithmetic actually produces.

**Falsifier** — if the glyph rendered near 40 px the density would be right; §1 shows it renders at 12.25.

---

## §3 · Superlatives (L-18 runs both ways — each with its own falsifier)

### S-1 · Motion-free by construction — the strongest `prefers-reduced-motion` posture available

The file contains **no** transition, animation, or rAF; the easing is communicated as *static geometry*. The axis asks about PRM gating; here there is nothing to gate, and that is a design achievement rather than an omission — the producer's equivalent must run a one-shot travel clock and therefore pull `useReducedMotion` and a `TRAVEL_DURATION_MS` budget (`glass-ui/.../useEasingPicker.ts:270`, `constants.ts:42-43`). Fourier's preview conveys the same information with zero motion machinery and zero PRM surface. **Falsifier** — exhibit a transition/animation/rAF on this render path: `:36-41` is `display` + `flex-shrink`, and the store's rAF (`animation.ts:52-77`) is not on it.

### S-2 · A correct, minimal memo

`easings.ts:96-107` caches the generated path per name in a module `Map`. Six entries, generated once process-wide; every re-render of every chip is a `Map` hit. The key is the catalog name and the generators are pure functions of it (`easings.ts:88-95`), so staleness is structurally impossible — no invalidation code exists because none is needed. This is the right amount of cleverness. **Falsifier** — a mutable key or an fn closing over reactive state would make it a bug; neither is present.

### S-3 · Resolution independence, and one CSS rule that earns its place

Authoring in normalized 0..1 with `preserveAspectRatio` (`:19-20`) means the mark is correct at any DPR with no raster asset and no `@2x` story. `flex-shrink: 0` (`:39`) is not boilerplate: the SVG *is* a flex item of the chip's column (`EasingPicker.vue:66-70`), and without it the glyph would be the thing that collapses when the 3-column grid tightens. Two declarations, both load-bearing. **Falsifier** — remove `flex-shrink: 0` and the glyph is the first casualty of a narrow dropdown; there is no third declaration to call decorative.

### S-4 · Uplift-inert — alone among its neighbours, this file touches **none** of the census break surface

`grep "@mkbabb/glass-ui" EasingCurvePreview.vue` → **0 hits**; its sole import is `@/stores/animation` (`:2`). It therefore sits on none of the F.W1 break rows — `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` (`CENSUS-2026-08-03.md:102-104`; `lane-frontend.md:472-477, 638-639`) — while its own host, `AnimationControls.vue`, is hit **twice** (`MetricBadge` at `:10`, `DockDropdownTrigger` at `:8`). The atomic tri-package transaction cannot break this file. Every defect above is fixable **today, under the old pin**, with no dependency on the deadlock. **Falsifier** — one glass-ui specifier in the file would sink it; there is none.

---

## §4 · Glass-ui conformance under the OLD PIN (installed `4.0.0`; producer latest `7.0.0`)

| Surface | Under the old pin (4.0.0, installed) | At 7.0.0 | Verdict |
|---|---|---|---|
| `./easing` subpath | **ABSENT** — `lane-frontend.md:413` (`grep -rl "EasingPicker" dist/` → empty). The fork is *load-bearing*; it cannot be retired before F.W1. | ships `EasingPicker`, `EasingConfigurator`, `useEasingPicker` (`glass-ui/src/components/easing/index.ts:1-14`) | **fork is legitimate today**, dispositionable only after F.W1 |
| accent token | `--viz-chebyshev` **already ships** with light/dark arms at **6.40 : 1 / 7.82 : 1** — the hardcoded literal is unnecessary *now* | `--easing-curve-accent` (`glass EasingPicker.vue:367,387,485`) — the `--viz-easing` ask is satisfied under a different name | **IMPROVES; already improvable at the old pin** (D-3) |
| geometry convention | none published at 4.0.0 | `constants.ts` magic-number home + sample-fitted viewBox (`VIEW_PAD 0.1`, `useEasingPicker.ts:246-255`) + 0.035/0.025 strokes | **IMPROVES** (D-1, D-2, D-6 all gain an authority) |
| PRM | n/a (S-1) | producer needs `useReducedMotion` for its travel dot | **fourier is ahead** — do not regress S-1 by adopting a playback dot |
| host chrome | `AnimationControls.vue:8,10` — `DockDropdownTrigger` + `MetricBadge` | both on the removal list | **BREAKS** — the transport hosting all six previews is re-laid-out at F.W1 |

**Sequencing consequence.** Because the host transport is on the break surface, F.W1 will re-lay-out this grid. **D-1/D-2 must be repaired in that same pass or the 43.7 %-ink geometry is re-baked into the new chrome** — and, per S-4, the repair has no dependency on the tri-package transaction, so nothing justifies deferring it.

---

## §5 · Corpus fold — agreements, and two explicit contradictions

**AGREE.** This file is the "fourth fork" the producer README forbids (`lane-frontend.md:409-413`; `CENSUS-2026-08-03.md:94-95`). Under the old pin the fork is *justified* (no `./easing` at 4.0.0), which the census also states; the fork is not itself a defect today.

**AGREE.** `lane-frontend.md:629`'s praise of this family's ARIA rationale is sound and untouched by D-9, which concerns the SVG node the praise does not cover.

**CONTRADICT (the tree disagrees) — the re-home is not mechanical.** `CENSUS-2026-08-03.md:191` and `lane-frontend.md:641` prescribe *"EasingPicker/EasingCurvePreview → `glass-ui/easing` (no fourth fork)"*. Read whole, the producer family is a **curve-authoring editor** — draggable cubic-bezier or a stepped staircase, emitting `{ mode, css, fn, points, steps, term }` (`README.md:1-8`, `useEasingPicker.ts` v-model shape) — and `index.ts:1-14` exports **no catalog-preview thumbnail and no named-preset chip grid**. There is no `EasingCurvePreview` counterpart to re-home onto. Fourier's product is *"pick one of six named playback curves"*; the producer's is *"author an arbitrary curve"*. F.W3's disposition is therefore a **product decision** (change the affordance) or a **producer ask** (publish an `EasingCurveGlyph` primitive), not a de-duplication. The census under-specifies this row; it should be split.

**CONTRADICT (the installed package disagrees) — the token wait is over.** `EasingPicker.vue:44-47` holds the accent locally *"until"* an upstream token lands. `color-radius.css` / the viz family in **installed 4.0.0** already ship a light/dark-armed indigo at 6.40:1 / 7.82:1. The relay to the glass BH inbox should be **re-scoped** from "please add `--viz-easing`" to "confirm `--viz-chebyshev`'s applicability, or name the 7.0.0 `--easing-curve-accent` as the successor" — and the local literal retired now.

**FOLD — R3-12** (`lane-fourier-r3-r6.md:86`, ADOPT-AS-FACT): `MorphPhaseConfig easingNames` is one of the 7 duplicated open-family records (35 → 28). That row proves duplication of the *record*; D-5 supplies the geometric divergence beneath it.

**FOLD — R5-7 / R6-5** (`lane-fourier-r3-r6.md:125,139`): template-loop evidence keyed to **component** callsites is blind to native elements. Generalised to this challenge: the six previews *are* visible to that model (they mount through a `v-for` over a `<Button>` component), but **the `<svg>`/`<path>` inside them register nowhere** — so every defect in §2 is, by construction, outside what the R3–R6 derivation could ever surface. This is direct support for R5-7's carry that F.W4's per-component D/L/C audit must read geometry from source, exactly as done here.

---

## §6 · Repair sketch (non-binding; no source touched by this challenge)

1. **Geometry** — `viewBox="-0.08 -0.08 1.16 1.16"` on a square element; ink 12.25 → **24.1 px** at the same `size`. *(D-1)*
2. **Weight** — `stroke-width` 0.15 → **0.035** (producer convention); at the new scale that is 0.84 px and **14 / 15 pairs clear 1× stroke**. *(D-2)*
3. **Colour** — delete the `color` prop; `stroke="currentColor"`; parent sets `color:` per state. Retire `hsl(248 88% 71%)` in favour of `--viz-chebyshev` **now**, `--easing-curve-accent` after F.W1. Cures the 1.4.3 AA carry at the label in the same edit. *(D-3, D-4)*
4. **Domain** — take `d: string` (or `fn: EasingFn`); collapse `MorphPhaseConfig.vue:47-54` onto it; one `.easing-preview`, one convention. *(D-5)*
5. **A11y** — `aria-hidden="true"` by default, with a `label` prop that swaps to `role="img"` + `<title>`. *(D-9)*
6. **Prose + constants** — a header comment stating the coordinate space, the pad derivation (half-stroke, not overshoot), and the stroke ratio; mirror the producer's `constants.ts` home. *(D-6, D-7, D-8, D-12)*
7. **Gate** — un-`fixme` keystone 4 when F.W1 lands the `inert` fix, and add the first vitest: assert rendered ink ≥ X % of `size` and pairwise separation ≥ 1× stroke. That single test pins D-1 and D-2 permanently. *(D-11)*

**Tally — 14 defects: 2 BLOCKER · 4 MAJOR · 5 MINOR · 3 INFO · 4 superlatives · 1 blocker-class carry (attributed to `EasingPicker.vue`).**
