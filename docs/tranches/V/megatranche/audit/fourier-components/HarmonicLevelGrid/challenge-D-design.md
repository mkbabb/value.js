claude-opus-5[1m] (served model id)

# CHALLENGE — `HarmonicLevelGrid.vue` · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/HarmonicLevelGrid.vue`
(286 lines) at fourier HEAD `cd26c653` + the 28-path frozen working tree (census §1, X-4 —
re-verified: `git status --porcelain web/src/components/morph/` → this file is `M`).

**Method.** Read whole, plus every import: `@mkbabb/glass-ui/button` and `/slider` (installed
**4.0.0**, `web/node_modules/@mkbabb/glass-ui/`), `@/lib/colors` (`VIZ_COLORS`), `@/lib/svg-fourier`
(`FourierShape`, `interpolateAtHarmonicLevel`, `pointsToSvgPath`); plus the sole mount site
`FourierMorphDemo.vue`, the sibling `MorphPhaseConfig.vue`, `useMorphConfig.ts`,
`useFourierMorph.ts`, `web/src/style.css`, glass-ui 4.0.0's shipped token/utility CSS, and the
glass-ui **7.0.0 producer tree** at `/Users/mkbabb/Programming/glass-ui` (read-only) for the F.W1
break/improve surface. No browser tooling. Two checked-in PNG baselines were read as **static
artifacts** (`docs/tranches/J/audit/screenshots/before/morph-1440x900.png`, commit `57624fa`
2026-06-04) — files on disk, not a live session.

**Posture.** Assumed defective until the tree proved otherwise. Two candidate findings were killed by
their own falsifiers and are recorded as such (§4): a `--muted-foreground` contrast claim (it
PASSES, 5.12:1) and a "getPath recomputes every frame" claim (FALSE — `nearestLevel` quantizes).

**Tally. 22 defects · 2 BLOCKER · 5 superlatives.**

---

## §0 — The one-paragraph verdict

This component is **visibly broken in production today and has been since 2026-05-26**, and there is
a checked-in screenshot in fourier's own tranche-J baseline that proves it: the twelve preview cells
are height-pinned to 40px by the glass-ui `<Button size="default">` recipe, their 86–98px of content
centre-overflows the box, and `.grid { overflow-y: hidden }` shears it — **every `n=` label is
clipped away and the curves bleed through the cell borders**. The clipping is invisible to the only
gate that touches this route, because that gate asserts *horizontal* overflow and `.grid` is
`overflow-x: auto`. Underneath that, a second stratum: the four `--slider-scrub-*` custom properties
that carry the entire per-instance colour identity of both harmonic sliders have **zero readers** in
glass-ui 4.0.0 (the uncommitted rename sweep moved the `variant` prop and left the CSS hook on the
3.1.0 names), and even if they were renamed, `--track-color` resolves to `#888888` because
`colors.ts` has no `oklch()` arm — the exact hole census [DOCS §7] names. The design underneath all
this is *good*: the `--track-color` indirection, the tokenized SVG stroke, the four-way-agreeing
bound invariant, and the measured label column are real craft. What failed is the migration, twice,
in the same file, in the same month.

---

## §1 — BLOCKERS

### D-1 · [BLOCKER] The preview cells render CLIPPED — every `n=` label is invisible, and the curves bleed through the borders

`HarmonicLevelGrid.vue:54-58` passes `size="default"` to glass-ui's `<Button>`. The 4.0.0 CVA
(`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js`, the `f = u(…)` factory) emits for that size:

```
default: "h-(--control-h-md) px-4 py-2 has-[>svg]:px-3"
```

That utility is not JIT-dependent — it is **pre-compiled and shipped**:
`dist/styles/components.css` contains literally `.h-\(--control-h-md\){height:var(--control-h-md)}`,
and fourier reaches it at `web/src/style.css:3` (`@import "@mkbabb/glass-ui/styles"`) →
`dist/styles/index.css:201` (`@import "./components.css"`). The token resolves at
`src/styles/tokens/offsets-sizing.css:151`:

```
--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor));
```

= **40px** on a fine pointer at the desktop identity (`--ui-scale: 1`, `--control-floor: 0px`,
`offsets-sizing.css:136,148`); **3.75rem** under `@media (pointer: coarse)`
(`tokens/light-dark.css:19-20`).

The scoped block at `:228-240` declares **no `height` and no `min-height`** — nothing opposes it. And
`.grid-cell` sets `display:flex; flex-direction:column; align-items:center` but **not**
`justify-content`, so `.btn-pill`'s `justify-content:center` (`glass/surfaces.css:119-120`,
`@apply inline-flex items-center justify-center`) survives. Column direction + centred justification
+ a content box smaller than its content ⇒ the overflow is **symmetric, above and below**. Nothing
can compress it: `.btn-pill > * { @apply flex-shrink-0 }` (`surfaces.css:158-160`) and the CVA base's
`[&_svg]:shrink-0` both forbid it.

Arithmetic (≥640px, fine pointer, `box-sizing: border-box` from preflight): content box =
40 − 12 (padding `:233`) − 3 (border `:234`) = **25px**; content = 64px svg (`:268-271`) + 2px gap
(`:232`) + ~20px label line-box = **~86px**. Overflow ≈ 30px each side. `.grid`'s
`overflow-y: hidden` (`:222`) then clips at ~46px.

**RECEIPT (static artifact).** `docs/tranches/J/audit/screenshots/before/morph-1440x900.png`
(commit `57624fa`, 2026-06-04 — nine days *after* the `<Button>` migration `6b7a12c`, 2026-05-26):
ten ~40px cells; red curves visibly crossing **above and below** each cell's border; **not one `n=`
label rendered anywhere in the strip**. The 4th and 10th cells carry the `#60a5fa` `is-bound` ring
(= lowLevel 5, highLevel 50 — `useFourierMorph.ts:63-64`), which independently confirms the capture
is of this component in its default state.

**Falsifier.** Any of these kills it: a `height`/`min-height` in the scoped block (grep `:228-240` →
none); omitting `size` (the CVA default is *also* `default` — `defaultVariants`, same file); the
utility not existing (it is pre-shipped, quoted above); the label being present in the baseline (it
is not). Live confirmation for SS-13 (**UNPROVEN-NEEDS-LIVE**, everything above is source/artifact
derived): `getComputedStyle(cell).height === "40px"` while `cell.scrollHeight ≈ 98`.

**Uplift.** glass-ui **7.0.0 CURES this by construction** — `src/components/button/styles.css:7`
replaces the fixed height with `min-block-size: var(--button-size)`. Do not hand-fix and then
re-break: the F.W1 cure is `min-height`, or dropping the height pin entirely.

---

### D-2 · [BLOCKER] Three dead props at glass 7.0.0 — a break-surface class the census does not carry

The census enumerates the uplift break surface as `metric-badge` ×7 files, `hover-card`/`-popover`
×4, dock members ×3, `ToastVariant`, `lucide-vue-next → @lucide/vue` ×35, pencil-boil
(CENSUS §3a "[FE §5]", §5 risk 10). **None of those touch this file.** But three *other* props do:

| site | prop | 4.0.0 | 7.0.0 producer | evidence |
|---|---|---|---|---|
| `:57` (×12 via `v-for`) | `variant="outline"` | valid (`buttonVariants`) | **`variant` prop does not exist** — replaced by `emphasis` + `tone` | `glass-ui/src/components/button/Button.vue:15,18-31` |
| `:58` (×12) | `size="default"` | valid | **gone** — `ButtonSize = Extract<Size,"xs"\|"sm"\|"md"\|"lg">`, default `"md"` | `Button.vue:16,37` |
| `:19`, `:42` | `variant="standard"` | valid | **gone** — `SliderVariant = "scrubber" \| "spectrum"` | `glass-ui/src/components/slider/types.ts:10` |

`variant` is not in 7.0.0's `ButtonProps`, so it would fall through to the DOM as a bogus
`variant="outline"` attribute on `<button>` — a silent runtime artefact on top of the hard `vue-tsc`
error. Census §5 risk 1 makes F.W1 the gate on *everything* in the commission's frontend goal, and
census §5 risk 10 notes there is no vitest net — so a break class the census does not enumerate is
a break class nobody budgets.

**The prop has now been renamed three times in three versions**, and this file is mid-ratchet:
`glass-scrubber` (3.1.0, committed `ae84509` 2026-05-26) → `standard` (4.0.0, **uncommitted**, the
working-tree diff at `:19,:42`) → `scrubber` (7.0.0). The census calls the WT bump "a **pure rename
sweep**, 24 src files / 46±46 lines" [FE §5 prior-art] — for this file that framing is too
optimistic in two ways: the rename was *incomplete* (D-3) and it was not *semantically* pure (the
3.1.0 recipe had a visible thumb; 4.0.0's `standard` explicitly has **"NO VISIBLE THUMB AT ALL"** —
`dist/components/ui/slider/index.d.ts`, the `sliderVariants` doc block. The J baseline's mobile
capture shows a solid pink Duration thumb; the 1440 capture of the post-rename register shows none).

**Falsifier.** A `variant` prop or a `"standard"` slider variant surviving at 7.0.0 would kill this.
Read of both producer files shows neither.

---

## §2 — MAJOR

### D-3 · [MAJOR] The four `--slider-scrub-*` retint tokens have ZERO readers — both harmonic sliders paint `--primary`

`:207-214` (comment: *"A.W2.c — glass-scrubber per-instance retint hook"*) sets
`--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`,
`--slider-scrub-thumb-bg-hover`. Exhaustive extraction of every `--slider-*` name glass-ui 4.0.0
consumes (`grep -rho -- "--slider-[a-z-]*" dist/`) returns exactly ten, and **none contains
`scrub`**: `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`,
`--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`,
`--slider-thumb-spring`, `--slider-track-bg`, `--slider-track-height`. `grep -rn "slider-scrub"
dist/` → **0 hits**. The declared design identity of the harmonic bounds does not render; the fill
falls back to `color-mix(… var(--slider-range-bg, var(--primary)) 88% …)` (extracted from
`dist/glass-ui.css`).

Compounding: on the `standard` recipe the thumb "paints INVISIBLE: width 0, opacity 0, transparent"
(`index.d.ts` doc), so two of the four declarations would be inert even under correct names.

**Scope.** `MorphPhaseConfig.vue:204-211` carries the byte-identical dead block ⇒ **8 dead
declarations across 2 files** — a repo row for F.W1, not a one-file fix.

**Post-uplift it stays dead.** 7.0.0's slider tokens are `--slider-range-bg`, `--slider-range-origin`,
`--slider-track-height`, `--slider-thumb-size`, `--slider-touch-target`, `--slider-target-floor`
(`grep -rho -- "--slider-[a-z-]*" glass-ui/src/`) — still no `scrub` family, and `--slider-thumb-bg`
is gone too. F.W1 must rewrite the hook to `--slider-range-bg`, not merely re-prefix it.

**RECEIPT that it used to work.** The J baseline shows the Low/High fills in **periwinkle** and the
three Duration fills in **pink** — precisely `color-mix(in srgb, var(--track-color) 30%, transparent)`
of a blue and of `--accent-red`. The hook was live at 3.1.0; the 4.0.0 sweep killed it.

**Falsifier.** One `grep -r "slider-scrub" node_modules/@mkbabb/glass-ui/dist` hit ends this finding.
Zero.

---

### D-4 · [MAJOR] Even with the names fixed, `--track-color` resolves to `#888888` — `colors.ts` has no `oklch()` arm

`:25` and `:48` bind `--track-color` to `VIZ_COLORS.chebyshev`. `App.vue:11,13` calls
`resolveVizColors()` on mount and on a theme `MutationObserver`, which runs
`cssVarToHex("--viz-chebyshev")` (`colors.ts:92`). The installed token is
**`oklch(0.484 0.163 265.5)`** (`glass-ui/src/styles/tokens/color-radius.css:264`; the light-dark arm
at `tokens/light-dark.css:146` is `light-dark(oklch(…), oklch(…))`). `cssVarToHex` (`colors.ts:22-53`)
matches only `#…`, `hsl(…)`, a bare `H S% L%` triplet, and `rgb(…)` — no `oklch` arm, no
`light-dark` arm — and falls through to `return "#888888"` at `:53`. Mid-grey.

This is the census's own hole with a named live consumer: [DOCS §7] / §3c reads *"fourier's parsing
today is a 117-line hand-rolled regex file (`web/src/lib/colors.ts`, **no `oklch()` arm**) — the exact
deletion target of W.L5 item 2 and the I-9 re-trigger sentinel."* This component is the surface where
that hole becomes a visible design regression, and it stacks *behind* D-3 — two independent failures
on the same four lines.

The tell: the **only** `--viz-*` colour that still resolves is `--viz-amber`, because fourier locally
re-authored it in `hsl()` for the WCAG darken (`style.css:118`). `--viz-fourier`, `--viz-chebyshev`,
`--viz-legendre` are all `oklch(…)` at 4.0.0 (`color-radius.css:263-265`, `dark-arm.css:113-115`) ⇒
all three degrade to `#888888`. The accidental contrast fix is the only survivor.

**Falsifier.** An `oklch` arm in `colors.ts`, or a non-oklch `--viz-chebyshev` in the installed pin.
Neither. Verified there is no `@property --viz-*` registration that could canonicalize the computed
value into a matched form (grep → 0).

---

### D-5 · [MAJOR] The hover/press scale defeats glass-ui's reduced-motion cure and double-stacks the press register

`:239` `transition: … transform 0.1s ease`; `:242-245` `:hover { transform: scale(1.04) }`;
`:247-249` `:active { transform: scale(0.96) }`. `grep -c "prefers-reduced-motion"` on this file →
**0**.

Every `<Button>` composes `.tap-squish` (CVA base string). `.tap-squish` animates the **`scale`
longhand** and neutralises it under PRM — `utilities/base.css:258-277`:

```
.tap-squish:active { scale: var(--scale-press); }
@media (prefers-reduced-motion: reduce) { .tap-squish:active { scale: 1; } }
```

`transform` and `scale` are **independent CSS properties that compose** (individual transform
properties apply before `transform`). Two consequences:

1. **Double squish.** The CVA base also carries `active:scale-(--scale-press-btn)`
   (`--scale-press-btn` → `--scale-press-sm` = **0.97**, `tokens/scale-paper.css:40-41`), shipped as
   `.active\:scale-\(--scale-press-btn\):active{scale:var(--scale-press-btn)}` in
   `dist/styles/components.css`. Net press ≈ `0.97 × 0.96 = 0.931` — noticeably deeper than the
   library's canonical press.
2. **PRM defeated.** Whatever glass does to its own `scale` leg, the local `transform` leg is
   ungated and survives.

The producer writes the doctrine down explicitly (`utilities/base.css:236-240`): *"the ONE
button/interactive scale register the §6 easing doctrine records and **the gate asserts** across
`.btn-pill`/`.tap-squish`/`.glass-btn`/`btn-interactive`."* This file adds a second register.

**Glass-side half (BH-inbox relay, per the standing relay law).** `dist/styles/components.css` is
**unlayered** (no `@layer` declaration anywhere in it — verified) while `.tap-squish`'s PRM guard
lives in `@layer components`. Unlayered beats layered ⇒ on 4.0.0 the *library's own* button press
scale is not PRM-guarded either. That is an upstream defect surfaced here, not fourier's fault —
route it to the glass BH inbox. **Falsifier:** wrap `components.css` in `@layer utilities`, or
un-layer the PRM guard, and this flips.

**Uplift.** 7.0.0 replaces the static press with `useLiquidPress` driving a `--glass-btn-press-t`
custom property (`Button.vue:64-67`). The local `transform` will then collide with a spring-driven
press. Fix at F.W1, not after.

---

### D-6 · [MAJOR] The scoped `transition` shorthand clobbers the producer's coherent button transition — the exact cascade bug glass-ui documents

`:239` `transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease` is
**unlayered**, so it *replaces* — does not merge with — both six-leg lists the Button composes:

- `.btn-pill` (`glass/surfaces.css:148-155`): `background-color`, `border-color`, `box-shadow`,
  `color`, `opacity` on `--ease-standard`, plus `scale` on `--spring-smooth`.
- `.tap-squish` (`utilities/base.css:259-267`): the identical set.

Surviving here: `border-color`, `box-shadow`, `transform`. **Lost:** `background-color`, `color`,
`opacity`, and the `scale` spring. So the `outline` variant's `hover:bg-accent
hover:text-accent-foreground` (still live, unopposed — see D-18) now **snaps** instead of
cross-fading, and the `scale` press snaps while the local `transform` eases at 0.1s: two scale legs,
two timing functions, one of them instant.

The producer names this exact failure class, verbatim, at `surfaces.css:143-149`: *"neither class's
`transition` shorthand can clobber the other down to a scale-only animation — **the cascade bug that
left every button transitioning ONLY `scale` (the live-readback RED, RED witness 5)**."* The
component reintroduces it from the outside.

**Token bypass, same line.** Five hardcoded motion values where the library ships tokens:
`0.15s`/`0.1s` (`:239`), `0.15s` (`:278`), `0.15s` (`:192`), and `ease` ×3 — against
`--duration-fast`, `--ease-standard`, `--spring-smooth`.

**Falsifier.** If the scoped rule listed the surface legs, or lived inside `@layer`, no clobber.
Neither holds.

---

### D-7 · [MAJOR] Both number inputs are nameless to assistive tech

`:7` `<label class="level-label">Low</label>` and `:30` `<label class="level-label">High</label>`
carry **no `for`**, and the inputs at `:8-16` / `:31-39` carry **no `id`, no `aria-label`, no
`aria-labelledby`**, and are not wrapped by the label. WCAG 4.1.2 / 3.3.2.

The contrast is inside the same `.level-row`: the *sliders* are named — `:23`
`aria-label="Low harmonic level"`, `:46` `aria-label="High harmonic level"`. So a screen-reader user
meets a correctly-named slider and an **anonymous spinbutton controlling the same value**, twice.
The bare `<label>` is also non-functional as a click target — pressing "Low" moves focus nowhere.

**Scope.** Duplicated at `MorphPhaseConfig.vue:8` (Duration) and `:35` (Easing) — a repo row.

**Falsifier.** Any `for`/`id`/`aria-*` on either input. Grep → none. (Some AT will guess from
proximity, which is why the *spec* violation, not the *outcome*, is the claim.)

---

### D-8 · [MAJOR] Selected/bound state is invisible to AT, and `is-bound` is colour-only at 2.41:1

`:60-63` toggles `active` and `is-bound` classes. There is **no `aria-pressed`, no `aria-current`,
no `role="radiogroup"`/`radio`, no `aria-label` on `.grid`** (`:53`). glass-ui's own Button CVA
styles `aria-pressed:` on *every* variant (`dist/button-BNDWhAZb.js`) — the producer expects the
attribute; the consumer never sets it. WCAG 4.1.2.

**WCAG 1.4.1 (colour alone).** `.active` at least adds `font-weight: 600` on the label (`:283`) — but
the label is clipped away by D-1, so in the shipped render even that cue is gone. `.is-bound`
(`:256-259`) is border-colour + box-shadow, nothing else, ever.

**WCAG 1.4.11 (3:1 non-text)** — computed from the shipped light tokens against `--card` =
`hsl(36 48% 97%)` (L = 0.9422, `tokens/color-radius.css:72`):

| surface | value | ratio vs `--card` | verdict |
|---|---|---:|---|
| `.grid-cell.is-bound` border `:257` | `#60a5fa` | **2.41:1** | **FAIL** (3:1) |
| `.grid-cell` resting border `:234` | `color-mix(… --foreground 12% …)` | **1.28:1** | informational — the SVG carries identification |
| `.grid-cell.active` border `:252` | `--accent-red` `oklch(0.574 0.216 27.5)` | **4.63:1** | PASS (also passes AA as text) |

So the *primary* state passes and the *secondary* state fails — the two bound cells are exactly the
ones a user needs to locate to understand the low/high band.

**Falsifier.** Recompute from the cited token lines; all four values are pinned in the installed
tree. Dark mode is not the cure — `#60a5fa` is a fixed literal (D-9) and cannot be correct on both
arms by construction.

---

### D-9 · [MAJOR] Four raw literals bypass the token system and the repo's own canonical focus pattern; the focus indicator fails 1.4.11

`:203-204` — `.level-input:focus { border-color: #60a5fa; box-shadow: 0 0 0 2px rgba(96,165,250,.15) }`
`:257-258` — `.grid-cell.is-bound { border-color: #60a5fa; box-shadow: 0 0 0 1.5px rgba(96,165,250,.2) }`

The sibling proves this is divergence, not choice. `MorphPhaseConfig.vue:167-186` and
`HarmonicLevelGrid.vue:180-200` are **character-identical for twenty lines** (same width, padding,
1.5px border, `color-mix(… --foreground 15% …)`, radius, background, weight, `outline:none`,
transition, `-moz-appearance`, spin-button reset) and differ in exactly two places: `text-align`
(`center` vs `right`) and the focus colour — where the sibling is **tokenized**
(`MorphPhaseConfig.vue:188-191`: `var(--accent-red)` + `color-mix(… --accent-red 12% …)`) and this
file is not.

The repo publishes a canonical focus recipe it does not use here — `style.css:130-137`:
`outline: 2px solid var(--ring); outline-offset: 2px`, annotated *"Mirrors the canonical pattern at
AppHeader.vue:174-177 (the only pre-W4 conformant site)."* This file instead does `outline: none`
(`:190`) plus a bespoke 15%-alpha ring, and binds it to `:focus` rather than `:focus-visible`, so it
also fires on pointer click — contrary to the same `style.css` block.

**Computed (light):** the ring composited over `--background` is **1.13:1** against the adjacent
background; the 1.5px `#60a5fa` border is **2.45:1**. Both under the 3:1 SC 1.4.11 floor. The
component's *only* focus signal for its two text inputs is therefore sub-threshold.

**Falsifier.** Recompute; or find any `--ring`/`--focus-ring-shadow`/`--viz-chebyshev` reference in
this file (grep → 0). Cure is available on the OLD pin — `--ring` ships at
`tokens/color-radius.css:102` and `--focus-ring-shadow` at `tokens/scale-paper.css:66`; this is not
gated on F.W1.

---

### D-10 · [MAJOR] Keyboard focus is invisible on exactly the three cells that matter most

The Button base composes `focus-ring`, whose *entire* paint is a box-shadow
(`utilities/base.css:174-178`):

```
.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }
```

— inside `@layer components` (`base.css:43`). But `.grid-cell.active` (`:251-254`) and
`.grid-cell.is-bound` (`:256-259`) each declare `box-shadow` from the SFC's **unlayered** scoped
block. Unlayered declarations beat any layered rule regardless of specificity ⇒ the state shadow
**replaces** the focus shadow, and `outline: none` has already removed the fallback. Tabbing to the
active cell or to either bookend produces **no visible focus indicator**. WCAG 2.4.7.

This is the cruel version of the bug: focus is visible on the nine cells a keyboard user does not
care about and invisible on the three they do.

**Falsifier.** Wrap the SFC style in `@layer`, or express the state rings as `outline` instead of
`box-shadow`, and focus survives. Neither holds. Live check for SS-13
(**UNPROVEN-NEEDS-LIVE**): Tab to the active cell, read computed `box-shadow` — it equals the
`--accent-red` state ring, not `--focus-ring-shadow`.

---

### D-11 · [MAJOR] The grid silently swallows clicks during a morph while its sibling handles the same state

`FourierMorphDemo.vue:137-138`:

```js
function handlePreviewClick(level: number) {
    if (isAnimating.value) return;
```

The click is discarded. `HarmonicLevelGrid.vue:54-65` binds **no `:disabled`** — the cells keep
`cursor: pointer` (`:237`), the 1.04 hover lift, the focus ring, and the `outline` variant's hover
background. Nothing tells the user why nothing happened.

The page handles this state correctly **one component over**: `MorphShapePreview` receives
`:disabled="isAnimating"` (`FourierMorphDemo.vue:18`). So the inconsistency is internal to a single
14-line template block.

Worse in the other direction: the Low/High controls are guarded **not at all** —
`FourierMorphDemo.vue:64-65` writes straight into `morphConfig.config` and `useMorphConfig.syncWith`
(`:78-84`) pushes it into the running morph via a deep watcher. Two adjacent controls, one silently
inert and one unsafely live, with identical affordances.

The primitive is available on both pins: 4.0.0's Button takes `disabled` and paints
`disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none` (CVA base);
7.0.0 adds a first-class `loading` prop (`Button.vue:27`).

**Falsifier.** Any `:disabled`/`aria-disabled` in the template. None.

---

### D-12 · [MAJOR] The scrolling strip has no scroll affordance, no accessible group, and off-screen members at the widest captured viewport

`:53` `<div class="grid">` + `:218-226`: `overflow-x: auto; overflow-y: hidden; scrollbar-width: thin`.
No edge fade, no gradient mask, no arrows, no shadow, no `role="group"`, no `aria-label`.

With the shipped default (`useFourierMorph.ts:63-64` lowLevel 5 / highLevel 50 →
`computePreviewLevels` (`useMorphConfig.ts:27-39`) returns **12** members:
`1,2,3,5,8,12,18,25,35,50,75,100`), the **1440px baseline — the widest viewport the harness
captures — already shows only 10**, ending flush against the card padding with nothing to indicate
`n=75` and `n=100` exist. On a 375px port roughly four of twelve are reachable without discovering a
scroll gesture that the design never signals.

**glass-ui 4.0.0 ships the exact remedy on the OLD pin** — the `./fading-scroll` export plus the
`.fading-scroll` recipe (`utilities/base.css:355`), which the same file marks as *superseding* the
static `.scroll-fade-*` masks (`:326-353`). Zero uses here. This is a today-fix, not an F.W1 fix.

**Falsifier.** Count cells in `morph-1440x900.png` (10) against `computePreviewLevels(5,50).length`
(12). If the strip fitted, the affordance would be merely nice-to-have.

---

## §3 — MINOR / INFO

### D-13 · [MINOR] Desktop margin double-counts the parent's flex gap — 2.5rem below the card, 1rem above it

`:139` sets `margin-bottom: 0` (mobile — deliberate), then `:145` sets `margin-bottom: 1rem` at
≥640px. The parent is a flex column: `FourierMorphDemo.vue:244-254` `.controls-section { display:flex;
flex-direction:column; gap: 0.75rem }` → `gap: 1rem` at ≥640. **Flex `gap` and item `margin` add.**
Add `.export-row { padding-top: 0.5rem }` (`FourierMorphDemo.vue:277`) and the rhythm reads:

- above the card: **1rem**
- below the card: 1rem gap + 1rem margin + 0.5rem padding = **2.5rem**

The three sibling `.config-card`s carry no such margin (`MorphPhaseConfig.vue:110-118`), so this card
is the sole break in an otherwise uniform stack. **Falsifier:** delete `:145`; the mobile arm already
encodes the author's own answer (`0`).

### D-14 · [MINOR] Card anatomy diverges from its three siblings, and the prose gap is real

`:3` is a bare `<h3>Harmonic Levels</h3>` with `margin-bottom: 0.75rem` (`:154`). Every sibling in the
same visual row is title **+ description**: `MorphPhaseConfig.vue:3-4`, with title margin `0.125rem`
(`:125`) and description margin `0.875rem` (`:131`) — a **6×** difference in the title's own spacing,
and a different header grammar in the same card recipe. Prose: "Settle Out — *Shape degrades to low
harmonics*", "Morph — *Cross-fade at low harmonics*", "Settle In — *Resolves to full fidelity*",
"Harmonic Levels — *(nothing)*". "Low" and "High" are never glossed as the bookends of the degrade/
restore band, which is the one thing a reader needs to interpret the grid.
**Falsifier:** read the four card headers side by side.

### D-15 · [MINOR] Heading level skips `<h2>`

`FourierMorphDemo.vue:5` `<h1 class="demo-title">Fourier Morph</h1>`; this file `:3` `<h3>`;
`MorphPhaseConfig.vue:3` `<h3>`. `grep -rn "<h1\|<h2\|<h3" web/src/components/morph/` shows **no
`<h2>` on the `/morph` route at all** — the only `<h2>`s in the subtree are
`FourierShapeExtractor.vue:8,71`, which pair correctly under their own `<h1>`, proving the repo knows
the pattern. WCAG 1.3.1 / heading-order. The level was chosen for its `text-lg`/400 appearance
(`:150-152`), which is precisely the failure mode. **Falsifier:** any `<h2>` on the route.

### D-16 · [MINOR] The controlled inputs desync from the model whenever the clamp is a no-op

`:11` `@change="emitLow(…)"` → `:109-112` clamps and emits. `:value` re-renders only when the **prop**
changes. At `lowLevel === 1`, typing `0` → `Number("0") || 1` → `1` → clamp `1` → emit `1` → prop
unchanged → **no patch** → the DOM input keeps displaying `0` while the model reads 1. Identically at
`highLevel === 100` typing `200` (`:114-117`), and at every boundary. Using `@change` rather than
`@input` also means the number and its slider disagree for the entire typing session.
**Falsifier:** set lowLevel = 1, type `0`, blur → input shows `0`, `props.lowLevel` is 1. Reproduces
verbatim at `MorphPhaseConfig.vue:13`.

### D-17 · [MINOR] Two numeric registers, two mechanisms, neither tabular

`.level-input` (`:180-194`) sets **no** `font-family`; it depends entirely on the `fira-code` class in
the template (`:15`, `:38`), which is a Tailwind v4 `@utility` in glass-ui's **source**
(`src/styles/typography/utilities.css:69`) — `dist/glass-ui.css` contains **zero** occurrences of
`fira-code`. So the input's mono identity is build-path-dependent. `.grid-label` (`:274-279`) uses
`var(--font-mono)` instead. Neither sets `font-variant-numeric: tabular-nums`, though the house idiom
is exactly that — `dist/glass-ui.css` ships `.animated-digit{font-feature-settings:"ss01","tnum",
"lnum";font-variant-numeric:tabular-nums lining-nums}`. These values change on every slider tick;
proportional digits will jitter the input's width and shift the slider start.
**Falsifier:** `grep tabular` on this file → 0.

### D-18 · [MINOR] The `outline` variant's hover paint survives and fights the local hover design

`:242-245` sets border-colour and scale on hover but **no background**, so the CVA's
`hover:bg-accent hover:text-accent-foreground active:bg-accent/80` fires unopposed: the cell
background jumps from `var(--card)` (`:236`) to `var(--accent)`. Two design systems' hover reads
stack — one authored (red border + lift), one inherited. The text does *not* follow, because
`.grid-label` pins `--muted-foreground` unlayered (`:277`), so the hover foreground/background pairing
is owned by neither author. **Falsifier:** the scoped hover block declares no `background` — read
`:242-245`.

### D-19 · [MINOR] Responsive proportion is inverted — type grows and padding shrinks on the narrowest viewport

Root font-size is `1.125rem` below 768px and `1rem` at/above (`style.css:38-48`). So `@apply text-lg`
on `.card-title` (`:151`) computes to **~20.25px on mobile vs 18px on desktop**, while padding moves
the other way: `0.75rem` → `1rem 1.25rem` at ≥640 (`:138`, `:144`). Density is worst exactly where
space is scarcest. The single element that moves in the right direction is the cell SVG, 64→48px
(`:262-272`). **Falsifier:** multiply out the two arms — the inversion is arithmetic, not judgement.

### D-20 · [INFO] No empty / loading / error state, and the prop contract admits the first

`:55` `v-for="level in levels"` with no `v-if`; `levels: number[]` (`:97`). `computePreviewLevels`
always returns ≥12 (`useMorphConfig.ts:30`), so the current mount cannot reach it — but the component
is authored as a reusable grid over an arbitrary level array and would render a 6px-tall empty strip
with no message. Loading/error are inapplicable by construction (the shapes are synchronously
prepared static JSON, `FourierMorphDemo.vue:95-100`). Recorded as a contract gap, **not** a live bug —
the honest severity.

### D-21 · [INFO] `getPath()` is an unmemoized template call; all 12 paths recompute together

`:67` `:d="getPath(level)"` → `:129-132` → `interpolateAtHarmonicLevel` + `pointsToSvgPath`
(`svg-fourier.ts:47-73`, an O(n) Catmull-Rom string build **per cell**). The bound is *not* per-frame:
`activeLevel` is `nearestLevel(levels, Math.round(harmonicLevel))` (`FourierMorphDemo.vue:115-120`,
`svg-fourier.ts:112-119`), which quantizes to the 12 candidates ⇒ ~2× per morph, not 60×/s. But each
of those re-renders rebuilds **all twelve** strings even though only `activeLevel` changed. A
`computed` map keyed on `shape` is a one-line cure. Primary owner is the L axis; recorded here
because the symptom is perceived motion quality.

### D-22 · [INFO] The only gate touching this component is structurally blind to its defect

`web/e2e/visual-baseline.spec.ts:35` captures `/morph` × 3 viewports and asserts exactly one thing
(`:64-71`): `document.scrollWidth − clientWidth <= 2`. `.grid`'s `overflow-x: auto` absorbs the
strip's width, so the gate is **GREEN while D-1 clips the cells and D-12 hides two of twelve**. The
captures are requested `fullPage: true` yet come out exactly 1440×900 / 375×667 — the app scrolls in
an inner port, so "full-page" is viewport-only for this route and the grid is below the fold on
mobile entirely. Census [FE §0, §9]: **vitest ABSENT**; 29 Playwright tests, single chromium.

---

## §4 — Findings that DIED to their own falsifier (recorded per L-18)

1. **"`.grid-label` fails AA contrast."** FALSE. `--muted-foreground` = `--neutral-5` =
   `hsl(30 22% 40%)` (`tokens/color-radius.css:45,85`) on `--card` `hsl(36 48% 97%)` computes to
   **5.12:1** — passes AA for normal text. glass-ui's own token comment claims "5.21:1 vs page";
   against `--card` specifically it is 5.12:1. Both pass. Claim withdrawn.
2. **"`getPath` recomputes every animation frame."** FALSE — killed by `nearestLevel`
   (`svg-fourier.ts:112-119`), which quantizes `activeLevel` to the 12 candidates. The weaker true
   claim is recorded as D-21.
3. **"`VIZ_COLORS.chebyshev` is a JS-frozen hex that never re-tints on theme change."** FALSE —
   `App.vue:13` installs a `MutationObserver` that re-runs `resolveVizColors()`. The real defect is
   D-4 (it re-resolves correctly *to `#888888`*).
4. **"The `.cartoon-card` chrome does not paint."** Suspected from
   `docs/tranches/A/audit/W3-screenshots/morph-post-W3.png`; **refuted** by the later J baseline,
   which shows the border + offset-stamp shadow rendering correctly. The A-era capture is a
   different substrate state. Claim withdrawn.

---

## §5 — Superlatives (L-18 runs both ways)

### S-1 · The `--track-color` indirection is the right shape, and both of its legs being broken does not change that

`:25`/`:48` set **one** custom property on the component root; the stylesheet derives four values
from it by `color-mix` (`:210-213`) with a considered 30% resting / 45% hover ramp authored in CSS,
not in JS. `MorphPhaseConfig.vue:29` reuses the identical contract with a
`sliderColor ?? 'var(--accent-red)'` default. A retheme is a one-token edit; the ramp never leaves
the stylesheet. Fix the token *names* (D-3) and the `oklch` arm (D-4) and this design needs no other
change — it is the only part of the file the migration should preserve verbatim.
**Falsifier:** if the tint were four inline styles, or if the two files disagreed on the variable
name, this would be accident rather than design. They agree exactly, character for character.

### S-2 · The path stroke is a live CSS variable, not a JS colour — and it is 20 lines from the code that gets it wrong

`:70` `stroke="var(--accent-red)"`. All twelve previews re-tint on the theme toggle with zero JS,
zero watchers, and no first-paint flash — while the slider tint two dozen lines away routes through
`getComputedStyle` + a hand-rolled regex + a `MutationObserver` and lands on `#888888` (D-4). The
correct idiom is **already in this file**; the cure for the repo's largest colour defect is to copy
line 70. `--accent-red` ships on both arms (`color-radius.css:258`, `dark-arm.css:111`), so the
strokes are correct in dark mode for free — something no `#60a5fa` in this file manages.
**Falsifier:** if `--accent-red` were unset the strokes would render black. It is set on both arms.

### S-3 · The label column is measured, not defaulted

`.level-label { min-width: 2.5rem; white-space: nowrap }` (`:172-178`) forces "Low" and "High" into
one optical column so both number inputs and both slider tracks align to a single left edge —
visible in the J baseline as a clean two-row control block. This is a proportion decision the sibling
never had to make (it has one row); this file had to author it and did. Aristotelian in the honest
sense: the mean between "let the labels ragged-edge" and "hard-code a grid".
**Falsifier:** drop `min-width` and the two rows stagger by the width delta between "Low" and "High"
in Computer Modern Serif — which, at the mobile 18px root, is ~7px of visible misalignment.

### S-4 · The `low < high` invariant is stated four times, in agreement, and cannot be violated from any entry point

`emitLow` (`:109-112`) clamps against `props.highLevel - 1`; `emitHigh` (`:114-117`) clamps against
`props.lowLevel + 1` — each bound reads the *other* as its own limit. The same constraint is mirrored
onto the native `min`/`max` (`:12-13`, `:35-36`) and the slider `:min`/`:max` (`:20-21`, `:43-44`),
and the third entry point respects it too (`FourierMorphDemo.vue:143-170`). Four independent
statements, zero disagreement, and no reachable path that inverts the band. In a component whose
whole job is "two bookends", this is the load-bearing correctness property and it is airtight.
**Falsifier:** find a path — text input, slider drag, or grid click — that produces `low >= high`.
None exists.

### S-5 · The array adapter is the minimal correct bridge, with exactly one writer per bound

`:119-127` bridges reka's `number[]` slider model to a scalar prop via a `computed` with a setter
that funnels through **the same** `emitLow`/`emitHigh` the text input uses — including an `?? 1`
guard for the `number[] | undefined` payload the 4.0.0 signature actually admits
(`dist/components/ui/slider/Slider.vue.d.ts`). No duplicated validation, no `watch`, no local mirror
ref, no round-trip staleness. The comment even names the wave that authored it. This is the pattern
the rest of the file should have been held to.
**Falsifier:** if `set` bypassed the clamp, dragging could violate S-4. It does not.

---

## §6 — Routing (what this challenge hands to which wave)

| finding | wave | note |
|---|---|---|
| D-1 | **F.W0 or F.W1** | Live visual break *today*. Cured for free by 7.0.0's `min-block-size`, so folding it into F.W1 is defensible — but it has shipped broken since 2026-05-26 and the baseline receipt exists; consider a same-day patch. |
| D-2 | **F.W1** | **Extends the census break surface with a third class** (component prop-axis rewrites), unrepresented in [FE §5]. Budget: 3 prop breaks here + `MorphPhaseConfig.vue` ×1 slider + `FourierMorphDemo.vue` ×2 buttons. A repo-wide `variant=`/`size="default"` sweep is owed. |
| D-3, D-4 | **F.W1 + F.W2** | D-3 is a rename-sweep completion (8 declarations / 2 files). D-4 is W.L5 item 2 — the `colors.ts` `oklch` hole, census [DOCS §7]; this is a named live consumer for that ledger row. |
| D-5, D-6 | **F.W1** | Must land with the uplift: 7.0.0's `useLiquidPress` changes the press mechanism. **Glass-side half of D-5 → glass BH inbox** per the standing relay law. |
| D-7 … D-12 | **F.W4** | The per-component D/L/C audit. D-9 and D-12 are curable on the OLD pin and need not wait. |
| D-13 … D-19 | **F.W4** | Design/typography/proportion polish; D-14/D-15 also touch the docs surface. |
| D-22 | **F.W4** | Feeds the "unit-test floor (vitest) decision" — and argues the visual harness needs a *vertical* clip assertion, not only the horizontal occlusion gate. |

**Census corroborations.** [DOCS §7] `colors.ts` has no `oklch()` arm → D-4 names its live consumer.
[FE §5] "pure rename sweep" → D-2/D-3 show it was neither pure nor complete in this file.
[FE §0, §9] vitest absent / single-chromium Playwright → D-22 shows the concrete miss.
**Intake overlap.** No row of `lane-fourier-r3-r6.md` (38/52 TRUE) addresses this component: the R3–R6
corpus is structural-census and harness-mechanics work (R4-8's counts, R5-7's native-loop blindness,
R6-8's client↔operation seam) and enumerates no per-component design finding. Nothing here overlaps,
and nothing here contradicts it. The nearest touch is **R5-7 → F.W4**: this file has a `v-for` over a
**component** callsite (`<Button v-for>`, `:55`), so it is *inside* the deriver's visible set — it
would not have been dropped the way `PaperSidebar`'s native `<li v-for>` rows were. Recorded so F.W4
does not re-litigate it. **X-9's open member-scope law** is not engaged by this challenge: every
figure here is an absolute count with a file:line, never a percentage.
