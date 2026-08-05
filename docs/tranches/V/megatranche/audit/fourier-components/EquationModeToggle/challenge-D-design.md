claude-opus-5[1m]

# CHALLENGE · `EquationModeToggle.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationModeToggle.vue` (80 lines, whole)
**Sole consumer** `web/src/components/equation/EquationView.vue:16` (import), `:270` (mount)
**Pin** `@mkbabb/glass-ui` declared `^4.0.0` (`web/package.json:14`), resolved **4.0.0** (`web/node_modules/@mkbabb/glass-ui/package.json`). Producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method** static + source-derived only. No browser. Colour arithmetic is machine-computed (sRGB→WCAG-2.x relative luminance) and **model-validated**: my pipeline reproduces glass-ui's own published figure for `--section-color-5` — glass says "5.11:1 vs the warm-cream card" (`glass-ui@7 src/styles/tokens/color-radius.css:309`), my computation returns **5.107**. Every contrast number below therefore carries a calibrated instrument.

**Verdict — the component is DEFECTIVE.** 18 defects, **4 BLOCKER**. It is a hand-rolled segmented control standing beside two design-system primitives that already do the job (`SegmentedTabs`, imported three lines above it in its own parent (`EquationView.vue:13` vs `:16`); `ToggleGroup`, shipping at the producer head), and it defeats — by hardcode — three separate token clamps that glass-ui installs specifically to make controls accessible. It is not, however, careless: four genuine superlatives are recorded at the end, and two of them are craft I would hold up as exemplary (§S).

**Corpus fold.** `formation/fourier/lane-frontend.md:137` inventories this file as "Mode toggle (`Button` group)" — a one-line census row, no design assessment; `:260` records the single glass import. `:602`, `:604`, `:643` establish the two upstream carries (`@utility cartoon-card`, the `--viz-amber` light darken) that this component's active state consumes and — as proved at **D-4** — silently voids. `CENSUS-2026-08-03.md:102-104` fixes the F.W1 uplift break surface (`metric-badge` ×7 files, `hover-card`/`-popover` ×4, dock members ×3, `ToastVariant` definition-absent). **This component touches none of those four break surfaces** — its lone import, `@mkbabb/glass-ui/button`, survives 4→7 (`glass-ui@7` exports `./button`) — so on the census's own break axis it is CLEAN, and every uplift claim I make below is an *improvement* claim, not a break claim. The adjudicated intake lane `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` carries **no design-axis row against this file** (its 52 rows are registry-derivation provenance); the one row that touches this component's surface is **R3-7a** (35 `Tooltip` callsites over nine consumers, `FunctionInput` ×2, carried to F.W3) — cited under **D-8**, where it convicts.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The keyboard focus indicator is 100 % clipped. Both buttons are unfocusable-in-appearance.

`EquationModeToggle.vue:34-40` puts `overflow: hidden` on the flex track:

```css
.eq-toggle { display: flex; border-radius: 9999px; overflow: hidden; … }
```

The children are glass `Button`s whose cva base string carries `focus-ring` (`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js`, base = `"btn-pill tap-squish focus-ring …"`). `focus-ring` is defined **entirely as an outward paint**:

- normal mode — `dist/styles/utilities/base.css:174-178`: `outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow)`, where `--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(…)` and `--focus-ring-width: 2px` (`dist/styles/tokens/scale-paper.css:65-66`) — a **non-inset, zero-offset, 2px-spread** shadow, i.e. a ring lying wholly outside the border box;
- forced-colors — `dist/styles/utilities/a11y-overrides.css:79-91`: `outline: 2px solid Highlight; outline-offset: 2px` — again wholly outside.

`.eq-toggle` declares **no padding and no gap**. The two buttons therefore fill the track's padding box exactly on all four edges (track height is content-derived from the buttons' own `height: 2.25rem`, `:47`). `overflow: hidden` clips descendant painting at the padding box. Both the box-shadow ring and the `outline-offset: 2px` outline lie strictly outside that box on every edge — including the interior seam, where the two buttons abut with zero gap. **Result: in both normal and Windows-High-Contrast mode, tabbing to either button produces no visible indication whatsoever.** WCAG 2.4.7 Focus Visible (A) and 2.4.11 Focus Appearance (AA) both fail.

This is not rescued by fourier's own focus-visible carry: `web/src/style.css:133-143` rescues exactly four classes — `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`. `.eq-toggle-btn` is absent from that set, and even if added, the ring it paints (`outline-offset: 2px`) would be clipped by the same ancestor.

**Falsifier.** Set `.eq-toggle { overflow: visible }` (or give the track `padding: 3px` ≥ the 2px ring + offset) and the ring must reappear on `Tab`. If it does not reappear, or if `--focus-ring-shadow` is discovered to carry an `inset` keyword in some build, D-1 is false. *(Geometry is source-decidable; the exact rendered pixels are UNPROVEN-NEEDS-LIVE for SS-13.)*

**Uplift.** `glass-ui@7 src/styles/utilities/base.css:113-117` ships `focus-ring` byte-identically. F.W1 does **not** cure this — the clip is fourier-side.

---

### D-2 · BLOCKER · No `aria-pressed`, no group role. The selected mode is invisible to assistive tech, and vanishes entirely under forced colours.

`:9-30` renders two bare `<Button>`s inside a bare `<div>`. There is no `role="group"`/`role="radiogroup"`, no `aria-label` on the track, and — the load-bearing omission — **no `aria-pressed`** on either button. Selection is carried *only* by a class:

```
:14  :class="{ 'is-active': model === 'sigma' }"
:63-66  .eq-toggle-btn.is-active { color: var(--viz-amber); background: color-mix(…) }
```

A screen-reader user hears two buttons named "Sigma" and "a plus b" (see D-8 on the names) with **no state on either**, in **no announced grouping**. WCAG 4.1.2 Name/Role/Value fails.

The irony is exact: `variant="ghost"` already ships the selected paint. Same file, `button-BNDWhAZb.js`, ghost variant string:

```
ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground
        active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
```

The DS's answer is `aria-pressed:bg-foreground/10`. The hand-roll wrote `color-mix(in srgb, var(--foreground) 8%, transparent)` — **the same idea, off by 2 percentage points, with the a11y half thrown away.** Adding `:aria-pressed="model === 'sigma'"` would have supplied both the state and the paint, for free, and deleted `.is-active` entirely.

Second consequence, independent and worse: **under `forced-colors: active` the selected state is annihilated.** Author `color` and `background` are overridden by the system palette; the `color-mix()` background is dropped. glass-ui@4's forced-colors block (`a11y-overrides.css:79-118`) rescues *focus rings and structural edges only* — grep for `aria-pressed` across `dist/styles/` returns nothing, and there is no generic selected-state rescue. So in HCM both buttons render identically and the control conveys nothing (WCAG 1.4.1 Use of Colour, compounded). Contrast this with the producer head, which handles it explicitly — `glass-ui@7 src/components/toggle-group/styles.css:112-125`:

```css
@media (forced-colors: active) {
    .toggle-group__item[data-state="on"] {
        border-color: Highlight; background: Highlight; color: HighlightText;
    }
}
```

**Falsifier.** Point an accname/AXTree dump at the mounted control: if the sigma button reports `pressed: true` (or `checked`), or if the container reports a group role, D-2 is false. Nothing in the template can produce either. *(Source-decidable; live AXTree = UNPROVEN-NEEDS-LIVE.)*

**Uplift.** **IMPROVES, decisively.** See D-5.

---

### D-3 · BLOCKER · `height: 2.25rem` is a hardcode of the *unscaled base* of `--control-h-sm`, defeating glass-ui's coarse-pointer touch-target clamp. The control is 40.5 px on phones and 36 px on tablets — both under the 44 px floor glass installs.

`:47` — `height: 2.25rem`. glass-ui@4 defines (`dist/styles/tokens/offsets-sizing.css:150`):

```css
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
```

with, globally (`dist/styles/tokens/light-dark.css:18-22`):

```css
@media (pointer: coarse) { :root {
    --ui-scale: var(--ui-coarse-scale, 1.5);
    --control-floor: var(--touch-target, 2.75rem);
} }
```

whose own comment names the intent: *"The WCAG-2.5.5 44px touch floor is enforced HERE too … so every scaled control-height `max(scaled, floor)` clamps at ≥ 44px regardless of the scalar."* `2.25rem` is precisely the value the token reduces to at `--ui-scale: 1, --control-floor: 0px` — **the desktop identity**. Writing the identity as a literal is exactly how you defeat a clamp: it is invisible in the only environment most people test.

Resolved against fourier's own root sizing (`style.css:38-49`: `html { font-size: 1.125rem }`, stepping to `1rem` at `min-width: 768px`):

| pointer / viewport | root | hardcoded `2.25rem` | `--control-h-sm` would give | WCAG 2.5.5 floor |
|---|---|---|---|---|
| coarse, <768 px (phone) | 18 px | **40.5 px** | `max(60.75, 49.5)` = **60.75 px** | 44 px — **FAIL** |
| coarse, ≥768 px (tablet) | 16 px | **36 px** | `max(54, 44)` = **54 px** | 44 px — **FAIL** |
| fine, ≥768 px (desktop) | 16 px | 36 px | `max(36, 0)` = 36 px | n/a — identical |

Horizontally it is worse: `padding: 0 0.6rem` (`:46`) plus a ~11 px sigma advance gives roughly **33 px wide on a phone**, so neither axis reaches 44. (WCAG 2.5.8 Target Size Minimum, 24×24 AA, *is* met — the failure is the AAA 2.5.5 floor, but glass-ui enforces that floor as library policy, so this is a hard DS-conformance failure independent of which WCAG level you grade against.)

**Falsifier.** Emulate a coarse pointer and measure `getComputedStyle(btn).height`. If it exceeds 44 px, D-3 is false. It cannot: `.eq-toggle-btn[data-v-…]` has specificity (0,2,0) and beats the Tailwind `h-(--control-h-sm)` utility (0,1,0) that `size="sm"` emits, so the token never reaches the box. *(Specificity + token arithmetic are source-decidable; the rendered px is UNPROVEN-NEEDS-LIVE.)*

**Uplift.** `glass-ui@7 src/styles/tokens/sizing.css:65` ships `--control-h-sm` byte-identically. F.W1 does **not** cure this — the hardcode is fourier-side and will keep defeating the clamp after the uplift.

---

### D-4 · BLOCKER · The active state measures **3.94 : 1** in light mode — below AA — and the F.W1 uplift improves it to 4.36 : 1, *still* below AA. It also voids fourier's own D.W4.d contrast carry, which was calibrated against the wrong backdrop.

`:63-66`:

```css
.eq-toggle-btn.is-active {
    color: var(--viz-amber);
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
}
```

Backdrop chain, fully resolved: the toggle sits inside `.eq-card` → `.cartoon-card` (`EquationView.vue:251`), whose shim sets `background: var(--card)` (`style.css:108-112`). Light `--card` = `hsl(36 48% 97%)` (`dist/styles/tokens/color-radius.css:72`); light `--foreground` = `hsl(24 10% 10%)` (`:58`). The `.is-active` wash composites 8 % foreground over that card → **rgb(233, 230, 226)**. Text is `--viz-amber`, which fourier overrides to `hsl(35 76% 35%)` at `style.css:120`.

Computed:

| pair | ratio | AA 4.5:1 |
|---|---|---|
| **active** amber on `card + 8 % fg` (the real backdrop) | **3.942** | **FAIL** |
| active amber on bare `--card` | 4.625 | pass |
| active amber on `--background` *(what D.W4.d measured)* | 4.709 | pass |
| **inactive** `--muted-foreground` on `--card` | **5.116** | pass |
| hover `--foreground` on `--card` | 16.524 | pass |
| dark-mode active amber on `card + 8 % fg` | 6.484 | pass |

Two findings fall out, and the second is the sharper one.

**(a) The carry is voided at this site.** `style.css:113-126` documents D.W4.d: glass ships light `--viz-amber` at 3.54:1 *"against `--background`"*, fourier darkens it to *"≈ 4.6:1 (clears AA)"*. My instrument returns **4.709 against `--background`** — the carry's own number, reproduced. But this component does not paint on `--background`; it paints on `--card` darkened by an 8 % ink wash, and there the same token lands at **3.942**. The remediation that the tranche believed it had shipped does not reach the pixel it is looked at on. The carry is not wrong — it is measured against a surface this component does not use.

**(b) Hierarchy inversion.** The **selected** item (3.94) is *less legible than the unselected* items (5.12). The control's most important state is its weakest read. That is an Aristotelian proportion failure before it is a WCAG one: emphasis is signalled by hue shift alone while luminance contrast *drops*, so the design's own semantics run backwards. It also means D-2's `1.4.1` exposure is not hypothetical — for a low-vision or CVD user the amber shift is the *only* cue and it is a contrast **loss**.

**Uplift — IMPROVES BUT DOES NOT CURE.** `glass-ui@7 src/styles/tokens/color-radius.css:309,329` re-bases `--viz-amber` onto `--section-color-5` = `oklch(0.530 0.124 69.6)` = **rgb(153, 92, 0)**, annotated *"5.11:1 vs the warm-cream card … fourier's `:root` override deletes on adopt."* Recomputed on this component's actual backdrop:

- v7 amber vs bare `--card`: **5.107** (glass's own claim — instrument validated)
- v7 amber vs `card + 8 % fg` (**here**): **4.355** — **still below 4.5**

So F.W1 deletes fourier's `style.css:119-131` override and lifts this surface 3.94 → 4.36, and it *still fails AA* because the 8 % ink wash is the thing eating the margin, not the hue. **The cure is the wash, not the token** — which is exactly what the DS primitive does (`glass-ui@7 toggle-group/styles.css:94-99` paints `background: var(--accent); color: var(--accent-foreground)` — a designed, co-calibrated pair — not an ink film under an unrelated accent).

**Falsifier.** Any of: `--card` is not the composite backdrop (it is — `style.css:111`); `color-mix(… 8%, transparent)` composites differently than modelled (it does not — sRGB alpha-over); or my luminance pipeline is wrong (it is not — it reproduces glass's published 5.11 to three significant figures). Sample the rendered pixel with a contrast picker; if the active label reads ≥ 4.5:1 in light mode, D-4 is false.

---

## §2 · MAJOR

### D-5 · MAJOR · glass-conformance · A hand-rolled segmented control, standing three lines below a DS segmented control imported into its own parent — and a dedicated `ToggleGroup` primitive waiting at the producer head.

`EquationView.vue:13` — the parent of this component — already imports and mounts the canonical primitive:

```ts
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";     // :13
<SegmentedTabs variant="underline" :options="[…]" …/>       // :188-191
```

glass-ui@4 ships a fully specified segmented grammar (`dist/styles/segmented-tabs.css:1-33`): one indicator engine, two materials, orientation-derived, one calibrated clock (`--tab-indicator-duration`), a volume-preserving travel squish, **and a `@media (prefers-reduced-motion: no-preference)` guard on the indicator transition** (`:107-113`). Its header comment even forbids, by name, the paint this component chose: *"a glass tint FORWARD of the track, NEVER a saturated hue, never an opaque `bg-card`"* and *"NOT a `--surface-tint` gray plate (the R10-5 no-gray cut)"* — `color-mix(in srgb, var(--foreground) 8%, transparent)` is precisely a neutral ink plate.

This is the standing house law verbatim (`feedback_glass_ui_first_class.md`: *"Glass-ui is the design system; add variants/primitives there, not in demo/ui/. Reuse existing component-type names"*).

**Uplift — IMPROVES, and this is the single largest win on the file.** `glass-ui@7` exports **`./toggle-group`** (a subpath absent at 4.0.0 — checked: 4.0.0's export map has no `toggle-group` key). `src/components/toggle-group/ToggleGroup.vue:1-55` wraps reka-ui `ToggleGroupRoot` with `type: "single"`, **`rovingFocus: true`** and `loop: true` by default, `orientation`, `disabled`, and a typed `SelectionValue` model; `ToggleGroupItem.vue:32-43` renders `as="button"` carrying `tap-squish focus-ring` and reka's `data-state="on|off"` + `aria-pressed`. Its stylesheet reads the very tokens this file hardcodes — `--control-h-sm` and `--control-text-sm` at `[data-size="sm"]` (`styles.css:72-76`) — and ships the forced-colors rescue (`:112-125`).

Post-F.W1, the whole 80-line file collapses to roughly:

```vue
<ToggleGroup type="single" size="sm" v-model="model" aria-label="Equation notation">
    <ToggleGroupItem value="sigma"    class="cm-serif">Σ</ToggleGroupItem>
    <ToggleGroupItem value="expanded" class="fira-code">a + b</ToggleGroupItem>
</ToggleGroup>
```

which cures **D-1, D-2, D-3, D-6, D-7, D-10, D-11, D-13, D-14** outright and reduces D-4 to a single token question. That is nine defects retired by deletion. **File this as the F.W1 exemplar case.**

**Falsifier.** If `ToggleGroup`'s `type="single"` cannot express a *required* (never-empty) selection, the hand-roll has a reason to exist. Reka's single-mode root permits deselect-to-`undefined`; the migration must pin the model (reject `undefined` in the setter). That is a three-line guard, not a justification for 80 lines. If the guard proves impossible, D-5 downgrades to MINOR.

---

### D-6 · MAJOR · typography · Hardcoded `16px`/`11px` bypass `--control-text`/`--control-text-sm`; the 11 px mono label is **below the design system's own 12 px caption floor** and does not scale on touch.

`:68-79`:

```css
.eq-toggle-icon        { font-size: 16px; … }
.eq-toggle-icon--mono  { font-size: 11px; … }
```

glass-ui@4 (`dist/styles/tokens/offsets-sizing.css`, `dist/styles/typography/scale.css:100-108`):

```css
--control-text-sm: calc(var(--type-caption) * var(--ui-scale));
--type-caption:    clamp(0.75rem, 0.71rem + 0.21vw, 1rem);   /* 12px floor — --control-text-sm source */
--control-text:    calc(var(--type-small) * var(--ui-scale));
--type-small:      clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem); /* 14px floor — the workhorse */
```

Three consequences. **(i)** 11 px is under the DS's documented 12 px caption *floor* — the scale has no rung there; this is the smallest text in the equation view by fiat. **(ii)** `px` is absolute, so both sizes are frozen against fourier's own responsive root step (`style.css:38-49`, 18 px → 16 px at 768 px): every other glyph in the view grows 12.5 % on a phone, these two do not, so the toggle *shrinks relative to its neighbours* exactly where legibility is hardest. **(iii)** Under `pointer: coarse`, `--ui-scale: 1.5` would take the sm control text to ~18 px; the hardcode stays 11 px — a **39 % under-size** against every sibling control.

**Falsifier.** If `--type-caption` resolved below 11 px in any supported viewport, the hardcode would be within scale. Its `clamp()` floor is `0.75rem`, and fourier's root never drops below 16 px, so its minimum is exactly 12 px. Not falsifiable from the tree.

**Uplift.** `glass-ui@7 toggle-group/styles.css:72-76` binds `font-size: var(--control-text-sm)` at `[data-size="sm"]` — adopting the primitive cures this automatically.

---

### D-7 · MAJOR · proportion · Pill-inside-pill: the active plate is a lozenge floating in a track, with untinted crescents at the interior seam. This is not what a segmented control looks like.

`size="sm"` emits `rounded-pill` and the base emits `btn-pill`, so **each button is independently pill-rounded on all four corners** — including its interior edge. The track (`:34-40`) is *also* pill-rounded (`border-radius: 9999px`) and `overflow: hidden`. The scoped block sets no `border-radius`, so nothing overrides the buttons' radius.

Geometry: track height = button height = `2.25rem`, so the effective radius at every corner is `1.125rem` (half-height, the pill limit). The active button's tinted background is therefore a **full pill** whose right edge curves inward with a `1.125rem` radius, abutting the neighbour's identically-curved left edge, with **zero gap**. The two opposed convex arcs leave a **lens-shaped untinted void at the seam**, and — because the button's own pill radius equals the track's — the tint's outer corners nominally coincide with the track's clip, so the entire active fill reads as a detached lozenge rather than as a filled *half* of the track.

A segmented control's active plate is a *segment*: square (or small-radius) on the interior edge, track-radius on the exterior. The DS knows this: `glass-ui@4 dist/styles/segmented-tabs.css:37-42, 82-99` runs a **separate, absolutely-positioned `.segmented-indicator`** with its own `--bouncy-slider-radius: 0.3125rem` inset by `--bouncy-track-trim`, precisely so the plate is a properly inset segment and never a pill-in-pill. `--bouncy-track-trim` is documented as *"the W20 magic-number lock"* — the token that stops exactly this drift.

**Falsifier.** Compute the buttons' rendered `border-radius`. If it is `0` on the interior corners, D-7 is false. It cannot be: no rule in the scoped block or the cva string zeroes an interior corner. *(Rendered arc geometry: UNPROVEN-NEEDS-LIVE for SS-13; the radius values are source-decidable.)*

---

### D-8 · MAJOR · a11y + prose · `title` is the only description, and it is not the accessible name. The visible labels name neither mode. A sibling in the same directory does this correctly.

`:15` `title="Sigma notation (compact)"` · `:25` `title="Expanded terms"`.

**(a) `title` is not the name.** Per accname, a button's *contents* outrank `title`. The accessible names are therefore the glyph `Σ` (`&Sigma;`, U+03A3) and the string `a + b` — announced as roughly "Sigma, button" and "a plus b, button". The two authored descriptions are demoted to an accessible *description* that many screen readers suppress by default. The prose that would actually explain the control never reaches the user who most needs it.

**(b) `title` is unreachable on touch and keyboard.** No hover on a touch device (and D-3 establishes this control is *worse* than DS-sized on touch, compounding); no `title` tooltip on keyboard focus in any engine. So on phone and via keyboard the control offers two unexplained glyphs.

**(c) The house already solved this — in the same directory.** **[intake R3-7a, TRUE, CARRY-TO-WAVE → F.W3]** establishes 35 `Tooltip` callsites across nine consumers, including **`FunctionInput` ×2**. Live: `FunctionInput.vue:9` `import { Tooltip } from "@/components/ui/tooltip"`, used at `:157` (`:text="preset.description"`) and `:188`. `EquationModeToggle.vue` is a sibling of `FunctionInput.vue` under `components/equation/` and reaches for the raw HTML attribute instead. R3-7a's F.W3 migration budget should therefore be **37 / ten consumers**, not 35 / nine — this file is a missed row in that inventory.

**(d) Prose.** "Sigma notation (compact)" and "Expanded terms" are non-parallel — one names a notation with a parenthetical gloss, the other names an object. Parallel forms ("Sigma notation" / "Expanded terms", or "Compact sigma notation" / "Expanded term-by-term") would read as one voice.

**Falsifier.** Any AT that prefers `title` over contents for the accessible name would defeat (a). None does — contents-over-`title` is fixed accname precedence for `button`. (b) and (c) are source-decidable outright.

---

### D-9 · MAJOR · state coverage · The toggle can display `sigma` as selected while rendering `expanded` output. It offers a choice it cannot always honour, and has no unavailable state.

`EquationView.vue:47-49`:

```ts
const activeLatex = computed(() =>
    eqMode.value === "sigma" && displayLatexSigma.value ? displayLatexSigma.value : displayLatex.value,
);
```

When `latex_sigma` is empty — the DTO admits it as a plain `string` (`lib/equation/types.ts`, `ComputeEquationResponse.latex_sigma: string`), and `displayLatexSigma` initialises to `""` from cache (`EquationView.vue:39`) — the `&& displayLatexSigma.value` guard falls through to `displayLatex`. The Σ button nonetheless carries `.is-active` (amber, per `:14`), because `.is-active` is keyed on `model`, not on availability. **The control asserts a state the view is not in.** Silent fallbacks are defensible; silent fallbacks *while the control still claims the unavailable state* are a lie in the UI.

The component exposes no vocabulary to say otherwise: no `disabled` prop, no unavailable/loading affordance. glass `Button` supports `disabled` (`button-BNDWhAZb.js` props: `disabled`, and the base carries `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled`), so the DS-native fix is one bound prop plus one prop on this component — the affordance exists and is unused.

**Falsifier.** If the backend guarantees non-empty `latex_sigma` for every tier, the branch is dead and D-9 downgrades to MINOR (dead-guard hygiene). But then the `&&` guard in `activeLatex` is itself unjustified — the code cannot be *both* right. Whichever way the ruling falls, one of the two sites is wrong.

---

### D-18 · MAJOR · proportion · The two floating controls on the same card edge differ in height by up to 27 px while sharing one baseline.

Both anchors are top-aligned on the same card (`EquationView.vue:426-434`):

```css
.eq-mode-anchor { @apply absolute top-2 left-2;  z-index: var(--z-controls); }
.info-anchor    { @apply absolute top-2; right: 3.25rem; z-index: var(--z-bar); }
```

The info control is a stock glass `Button variant="glass" size="icon"` (`:276`) → `h-(--control-h-md) w-(--control-h-md)`. The mode toggle is the D-3 hardcode. Resolved side by side, sharing a `top: 0.5rem` baseline inside a `10rem` card (`:386-390`):

| context | info button (`--control-h-md`) | mode toggle (hardcoded) | Δ |
|---|---|---|---|
| desktop, fine, root 16 px | 40 px | 36 px | 4 px |
| tablet, coarse, root 16 px | `max(60, 44)` = 60 px | 36 px | **24 px** |
| phone, coarse, root 18 px | `max(67.5, 49.5)` = 67.5 px | 40.5 px | **27 px** |

On touch these are two controls of visibly different weight, top-aligned on a shared edge, occupying 38 % and 22 % of the card's height respectively. The card is only `10rem` tall; a 67.5 px control already consumes over a third of it. The optical mismatch is not a rounding artefact — it is the DS's comfort amplification applying to one sibling and not the other, from the same hardcode as D-3.

**Falsifier.** If `--ui-coarse-scale` is retuned to `1` at the fourier root the mismatch collapses to 4 px. Grep: `--ui-coarse-scale` appears nowhere in `web/src/` — the 1.5 default stands. Measure both boxes under coarse emulation; equal heights falsify. *(UNPROVEN-NEEDS-LIVE for the rendered px; the token arithmetic is decidable.)*

---

## §3 · MINOR

### D-10 · MINOR · motion · A dead transition leg (`:38-39`) on a non-canonical easing, twelve lines above a comment (`:51`) asserting the opposite rule.

`:34-40`:

```css
.eq-toggle {
    …
    transition:
        border-color 0.15s ease;
}
```

`.eq-toggle` never declares `border`, `border-color`, or `border-width`; `glass-wash` contributes its rim through a `::before` pseudo (`dist/styles/glass/material.css:66-82`), not a border on the host. **The leg can never fire.** It also uses the bare CSS keyword `ease` rather than `var(--ease-standard)` — while the sibling rule at `:51-52` carries the wave citation that forbids exactly this:

```css
/* A.W3.d — named properties + canonical token, no `transition: all`. */
transition: color 0.15s var(--ease-standard), background-color 0.15s var(--ease-standard);
```

`--ease-standard` is real and resolvable (`glass-ui@4` → `var(--motion-ease-standard)`), and is used correctly at ten-plus fourier sites (`PaperSidebar.vue:198`, `MobileFloatingToc.vue:246,348,384`, `PaperSearch.vue:228,366,371,376`, `PaperView.vue:673`). The multi-line formatting of a single-leg list is the tell: this is the **residue of an A.W3.d edit that reached one rule in the file and not the other**. Two lines from the same pass, one conformant and self-documenting, one neither.

**Falsifier.** Add a border to `.eq-toggle` and the leg becomes live — but nothing in the file or the cascade does. Grep the file for `border` on `.eq-toggle`: `border-radius: 9999px` (`:36`) and the transition's own `border-color` (`:39`) — no width, style, or colour is ever set. The file's only `border` shorthand is `border: none` on `.eq-toggle-btn` (`:53`), a different element.

---

### D-11 · MINOR · spacing · `0.6rem` is off every grid in play, and the two halves are optically unequal.

`:46` `padding: 0 0.6rem` = 9.6 px desktop / 10.8 px mobile. Tailwind's scale, glass's control paddings (`px-3` = 0.75rem at `size="sm"`; `glass-ui@7 toggle-group/styles.css:74` uses `padding-inline: 0.625rem`) and the 0.25rem rhythm all miss it. It is not a rounding of anything — it is a nudge.

Worse, it is a *symmetric* nudge applied to *asymmetric* content. `Σ` at 16 px italic serif has an advance near 11 px; `a + b` at 11 px mono with `letter-spacing: -0.5px` runs near 30 px. With equal padding the two halves land at roughly **30 px and 49 px** — a 1 : 1.63 split in a control whose two options are semantic peers. A segmented control's halves should be equal (or content-proportional by design, not by accident); the DS does this with `grid-auto-columns: 1fr` (`dist/styles/segmented-tabs.css:44-45`), which makes equality structural. A `min-inline-size` here would have been the KISS fix — `glass-ui@7 toggle-group/styles.css:50` uses exactly that (`min-inline-size: var(--toggle-group-item-size)`).

**Falsifier.** Measure both buttons' `offsetWidth`. Equal widths falsify. Nothing in the cascade equalises them: `.eq-toggle` is `display: flex` with no `flex: 1` on children and no `gap`. *(UNPROVEN-NEEDS-LIVE for exact advances; the absence of any equalising rule is decidable.)*

---

### D-12 · MINOR · typography · Both font stacks are hardcoded, one of them **truncated**, bypassing two DS utilities the parent file already uses.

`:70` `font-family: "Computer Modern Serif", Georgia, serif` · `:75` `font-family: "Fira Code", monospace`.

**(a) The serif stack is a lossy copy.** `style.css:13-15` defines the brand register as

```css
@theme { --font-sans: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif; }
```

The component reproduces the first and last two members and **drops `"Latin Modern Roman"` and `"CMU Serif"`**. On any machine carrying LMR or CMU Serif but not Computer Modern Serif — a normal state for a TeX installation, and this is a Fourier-analysis paper site — the whole app renders Latin Modern while **this Σ alone renders Georgia**. A visible desync, in the one glyph that is supposed to read as mathematics.

**(b) Both utilities already exist and are already used in the parent.** `glass-ui@4 dist/styles/typography/utilities.css:66-72` ships `@utility cm-serif { font-family: var(--font-serif-math, serif) }` and `@utility fira-code { font-family: var(--font-mono); font-feature-settings: "liga", "calt" }`. `EquationView.vue:244,249` uses `class="… fira-code"` — the parent uses the utility; the child hardcodes the stack, and loses the ligature feature settings with it.

**Falsifier, stated honestly.** `--font-serif-math` is **not set anywhere in `web/src/`** (grepped), so `.cm-serif` would today resolve to bare `serif` — *worse* than the hardcode. The remediation is therefore two-part and must not be inverted: **first** wire `--font-serif-math: var(--font-sans)` (or the full CM stack) at the fourier root, **then** adopt `.cm-serif`. Adopting the utility first would regress the glyph. `.fira-code` has no such caveat — `--font-mono` is bound at `glass-ui@4 dist/styles/theme/bridges.css:70`, and four fourier components already read `var(--font-mono)` directly (`FourierMorphDemo.vue:295,319`, `HarmonicLevelGrid.vue:275`, `MorphShapePreview.vue:148`), so that half is a straight swap today.

---

### D-13 · MINOR · typography · `letter-spacing: -0.5px` is absolute where everything around it is relative.

`:78`. At the declared 11 px this is −0.045 em. Because it is `px`, it does not track the `--ui-scale` amplification (D-3/D-6) nor fourier's root step; if the font-size is ever tokenised as D-6 requires, an 18 px coarse rendering keeps a −0.5 px tighten that was tuned for 11 px — i.e. the tracking silently *loosens* by a factor of 1.6 in relative terms. `-0.045em` is the same value today and correct at every size tomorrow. (Note the DS's own micro-tracking convention is em-based: `dist/styles/typography/utilities.css:50-55`, `letter-spacing: 0.025em`.)

**Falsifier.** If the font-size stays hardcoded at 11 px forever, px tracking is harmless. D-6 requires it not to.

---

### D-14 · MINOR · `position: relative` is dead, and the glass wash paints its specular *over* the glyphs.

`:55` `position: relative` on `.eq-toggle-btn`: no absolutely-positioned descendant, no `z-index`, no containing-block consumer anywhere in the file. Dead.

The related live issue: `glass-wash` on the track (`:9`) installs a `::before` at `z-index: 1` with `mix-blend-mode: plus-lighter` (`dist/styles/glass/material.css:66-136`). The two buttons are `position: relative` with `z-index: auto`, so they paint at the z-0 level and **the pseudo composites above them** — the specular gleam lands on the Σ glyph, not behind it. It is `pointer-events: none` so nothing breaks interactively, and `--glass-specular-intensity-rest` defaults to `0` (`:96-99` — *"default 0 so a static, unwired surface is CLEAN"*) so at rest the layer is invisible. But the track is unwired (no `--mouse-x`/`--mouse-y` writer, no `.glass-specular-track`), which makes the `glass-wash` class **purely decorative-inert here** — it buys a `position: relative`, a rim pseudo, and nothing else. Either wire it or drop it; carrying an unwired material class is exactly the "shy" decoration the DS comments warn about.

**Falsifier.** Set `--glass-specular-intensity-rest` above 0 and observe whether the gleam occludes the glyph — if the buttons paint above the pseudo, my stacking read is wrong. Give either button `z-index: 1` and the order flips. *(UNPROVEN-NEEDS-LIVE; the stacking rule is decidable.)*

---

### D-15 · MINOR · The buttons emit no `type`, so they are `type="submit"` by HTML default.

`button-BNDWhAZb.js` forwards `type: u.type` — undefined when unset, so no `type` attribute is emitted and the reka `Primitive` renders a bare `<button>`. Per HTML, a `<button>` with no `type` inside a `<form>` is a submit button. No `<form>` currently exists under `web/src/components/equation/` (grepped: zero `<form` hits), so this is latent, not live — but it makes the component unsafe to relocate, and `type="button"` is one attribute.

**Falsifier.** Live today: none — there is no form ancestor. The claim is scoped to portability, and is stated as such.

---

### D-16 · MINOR · prose · The visible labels name neither mode, and the two hidden descriptions are not parallel.

Covered under D-8(a)/(d); recorded separately because the *visible* copy is its own defect. `Σ` and `a + b` are notations, not names. A user who has not already internalised "sigma vs expanded" gets no purchase from either, and — because `title` never reaches touch or keyboard (D-8b) — there is no second chance. The DS primitive takes text children happily (`ToggleGroupItem` is slot-based, `white-space: nowrap`, `padding-inline` scaled), so `Σ notation` / `a + b terms`, or icon-plus-label, costs nothing structurally.

---

### D-17 · INFO · The `--muted-foreground` override lowers contrast relative to the glass default it replaces.

`:49` sets `color: var(--muted-foreground)` where `variant="ghost"` would supply `text-foreground/70`. Light-mode: `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)` → **5.116 : 1** on `--card`; `--foreground` at 70 % over `--card` composites lighter than `hsl(24 10% 10%)` but still lands well above that. **Both clear AA**, so this is INFO, not a defect of record — but it is a gratuitous override of a variant that was already correct, and it is the reason `variant="ghost"`'s entire colour half is inert on this component (`bg-transparent`, `text-foreground/70`, `hover:bg-foreground/8`, `hover:text-foreground` — all four re-specified in the scoped block at `:42-60`). The component pays for a variant and uses none of it. Worth noting for the D-5 migration: nothing is lost by dropping `variant="ghost"`.

---

## §S · SUPERLATIVES (L-18 runs both ways)

### S-1 · The transition is exemplary, and it says why.

`:51-52`:

```css
/* A.W3.d — named properties + canonical token, no `transition: all`. */
transition: color 0.15s var(--ease-standard), background-color 0.15s var(--ease-standard);
```

Named properties (not `all`), the canonical easing token (not a bare keyword), a duration matching the DS's fast register, and — rarest of all — **an inline citation of the wave that mandated the rule**, so the next reader cannot un-learn it by accident. This is the correct shape of a design-system covenant expressed in a consumer file. I would lift this line verbatim into the F.W1 style guide as the reference example. *(Falsifier: if `--ease-standard` did not resolve the line would be a silent `ease` fallback — it resolves, `glass-ui@4` → `var(--motion-ease-standard)`.)*

### S-2 · Reduced motion is correct — by delegation, which is the right way to be correct.

The component declares **zero transforms and zero animations of its own**; the press-squish rides glass's `.tap-squish`, delivered through the Button cva base. glass retires that transform under PRM in one place, documented (`dist/styles/utilities/base.css:255-257`): *"Under PRM I retire the press transform entirely and lean on the consumer's own hover/active bg-tint cascade to acknowledge the press."* The component's only transitions are `color`/`background-color` — colour cross-fades, not motion, and correctly left unguarded. So this file is PRM-correct **without containing a `prefers-reduced-motion` block**, and that is the superior outcome: it did not re-implement a policy it could inherit. Against `CENSUS §3a`'s standing PRM finding — *"the two rAF clocks themselves are ungated under `prefers-reduced-motion: reduce`"* — this component is on the right side of the ledger.

### S-3 · The empty / error / loading states are properly guarded — my initial hypothesis was FALSIFIED.

I opened expecting the classic defect: a control floating over a null result. It is not there. `EquationView.vue:229` guards the error-without-prior-result branch, `:236` the whole result subtree (`v-else-if="result"`), and `:238`/`:243` the recompute and soft-error banners — the toggle at `:269-271` renders **only inside `v-else-if="result"`**, so it can never paint against a null model. Recorded as a superlative because the guard is at the right altitude (the data owner, not the leaf) and because the discipline of recording a falsified hypothesis is the point of the axis. *(The residual — the toggle staying enabled when `latex_sigma` is empty — is D-9, a different and narrower claim.)*

### S-4 · The model is typed against the shared DTO, so the two writes are compile-checked against the API contract.

`:1-6` (import `:3`, model `:5`):

```ts
import type { EquationDisplayMode } from "@/lib/equation/types";
const model = defineModel<EquationDisplayMode>({ required: true });
```

`EquationDisplayMode = "expanded" | "sigma"` is declared in the same module as `ComputeEquationResponse` (`lib/equation/types.ts`), i.e. the union is the *API's* union, not a local re-declaration. The two `@click="model = '…'"` writes and the two `model === '…'` reads are therefore checked by `vue-tsc` against the contract, and a backend rename breaks the build rather than the UI. Given the census's finding that **vitest is absent** and `vue-tsc` is one of only two frontend gates (`CENSUS §3a [FE §0, §9]`), routing correctness through the surviving gate is not merely tidy — it is the only enforcement available, and this file uses it. `required: true` on the model closes the third state.

---

## §4 · Disposition for F.W1 / F.W4

| id | severity | one-line | cured by F.W1 uplift? |
|---|---|---|---|
| D-1 | BLOCKER | focus ring 100 % clipped by `overflow: hidden` | only via D-5 migration |
| D-2 | BLOCKER | no `aria-pressed`/group role; state dies under forced-colors | **yes**, via `ToggleGroup` |
| D-3 | BLOCKER | `height: 2.25rem` defeats the 44 px coarse floor (40.5 / 36 px) | only via D-5 migration |
| D-4 | BLOCKER | active state 3.94:1 light — fails AA; hierarchy inverted | **improves 3.94 → 4.36, still fails**; cured only by dropping the ink wash |
| D-5 | MAJOR | hand-roll beside `SegmentedTabs` (parent, `:13`) / `ToggleGroup` (v7) | **yes — the exemplar migration; retires 9 defects** |
| D-6 | MAJOR | `16px`/`11px` bypass `--control-text{,-sm}`; 11 px under the 12 px floor | **yes**, via `ToggleGroup` `[data-size="sm"]` |
| D-7 | MAJOR | pill-in-pill; active plate is a lozenge, seam voids | **yes**, via the DS indicator/segment geometry |
| D-8 | MAJOR | `title` ≠ accessible name; unreachable on touch/keyboard | no — **feeds intake R3-7a: budget is 37/ten, not 35/nine** |
| D-9 | MAJOR | Σ reads active while expanded latex renders; no unavailable state | no — parent-side ruling needed |
| D-18 | MAJOR | 27 px height mismatch vs the sibling info button on one baseline | only via D-3/D-5 |
| D-10 | MINOR | dead `border-color` leg on bare `ease`, contradicting its own A.W3.d comment | no |
| D-11 | MINOR | `0.6rem` off-grid; halves optically 1 : 1.63 | **yes**, via `min-inline-size` |
| D-12 | MINOR | truncated serif stack (drops LMR/CMU); bypasses `.cm-serif`/`.fira-code` | partly — **wire `--font-serif-math` FIRST** |
| D-13 | MINOR | `letter-spacing: -0.5px` absolute where all else is relative | no |
| D-14 | MINOR | dead `position: relative`; unwired `glass-wash` composites above glyphs | no |
| D-15 | MINOR | no `type="button"` → submit by default if ever placed in a form | no |
| D-16 | MINOR | visible labels name neither mode; hidden descriptions non-parallel | no |
| D-17 | INFO | `--muted-foreground` override lowers contrast vs the ghost default (both pass AA) | n/a |

**Census break-surface cross-check (`CENSUS-2026-08-03.md:102-104, 185-186`).** This file imports exactly one glass subpath — `./button` — which is present in both 4.0.0 and 7.0.0 export maps. It touches **no** `metric-badge`, **no** `hover-card`/`hover-popover`, **no** dock member, **no** `ToastVariant`, **no** `lucide-vue-next`. It is **not** on the uplift break surface. Its entire relationship to F.W1 is upside: one new subpath (`./toggle-group`, absent at 4.0.0), one token re-base (`--viz-amber` → `--section-color-5`, which deletes fourier's `style.css:119-131` override per the producer's own annotation), and nine defects retired by deletion.

**Single highest-value action.** Migrate to `ToggleGroup` at F.W1 and delete the file's `<style>` block. Then re-measure D-4 against `--accent`/`--accent-foreground` — that is the only claim the migration leaves open.
