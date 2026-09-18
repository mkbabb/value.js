claude-opus-5[1m]

# CHALLENGE · `MorphPhaseConfig.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue` (212 lines)
**Pin** `@mkbabb/glass-ui ^4.0.0`, **installed 4.0.0**; producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json:version`)
**Method** static + source-derived only. No browser. Contrast computed from the shipped token literals (script transcribed in §7). Curve geometry computed by evaluating the installed `@mkbabb/value.js@0.13.0` `timingFunctions`. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Prior** assumed DEFECTIVE. 24 defects survive their falsifiers (3 BLOCKER / 8 MAJOR / 10 MINOR / 3 INFO); 5 superlatives survive theirs.

## §0 · Read set (read-only)

| File | Why |
|---|---|
| `web/src/components/morph/MorphPhaseConfig.vue` | target |
| `web/src/composables/useMorphConfig.ts` | re-export barrel for `EASING_PRESETS` / `EASING_PRESET_NAMES` / `easingCurvePath` |
| `web/src/lib/easings.ts` | the real catalog + `easingCurvePath` (L115–127) |
| `web/src/composables/useFourierMorph.ts:59-68` | `DEFAULT_MORPH_CONFIG` |
| `web/src/components/morph/FourierMorphDemo.vue` | the sole consumer (3 instances, L26/36/46) + the grid that sizes it |
| `web/src/style.css` | `@utility cartoon-card` shim (L107–111), root font-size ladder (L40–49) |
| `web/node_modules/@mkbabb/glass-ui/dist/slider-DQ95MET2.js` | pinned Slider render + CVA |
| `…/dist/SelectScrollDownButton-C1jb3b3K.js` | pinned Select/SelectItem/SelectTrigger render |
| `…/dist/glass-ui.css` | compiled slider legs (`.slider-track` / `.slider-range` / `.slider-thumb`) |
| `…/dist/styles/{cards,select}.css`, `…/styles/typography/{scale,utilities}.css`, `…/styles/tokens/{color-radius,dark-arm,offsets-sizing}.css`, `…/styles/utilities/{base,a11y-overrides}.css` | tokens, utilities, the PRM + forced-colors tails |
| `/Users/mkbabb/Programming/glass-ui/src/components/slider/{types.ts,styles.css,Slider.vue,index.ts}` | the 7.0.0 uplift surface |
| corpus: `formation/fourier/{lane-frontend.md,CENSUS-2026-08-03.md}`, `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` | folded, not re-invented (§8) |

---

## §1 · The pin facts this challenge stands on

Four measurements, each independently re-runnable. Everything downstream cites them.

**P-1 · The pinned Slider's variant vocabulary is `standard | spectrum`.**
`slider-DQ95MET2.js` tail: `cva("glass-slider focus-ring relative flex …", { variants: { variant: { standard: "", spectrum: "" }, size: {…} }, defaultVariants: { variant: "standard", size: "md" } })`. Both variant classes are the **empty string** — the variant does nothing but stamp `data-variant`, and every paint hangs off `[data-variant=…]` attribute selectors in `glass-ui.css`.

**P-2 · The 7.0.0 Slider's variant vocabulary is `scrubber | spectrum`. `standard` is gone.**
`glass-ui/src/components/slider/types.ts:10` → `export type SliderVariant = "scrubber" | "spectrum";`; `Slider.vue:26` defaults to `"scrubber"`, `:258` binds `:data-variant="v"` verbatim.

**P-3 · `--slider-scrub-*` is read by NOTHING, at either version.**
`grep -rn "slider-scrub" web/node_modules/@mkbabb/glass-ui/` → **0 hits**. `grep -rn "slider-scrub" glass-ui/src glass-ui/dist` → **0 hits**. The tokens the pinned CSS actually reads are `--slider-track-bg`, `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-{bg,border-color,shadow,size,spring}`, `--slider-track-height` (enumerated by `grep -rhoE '\-\-slider[a-zA-Z0-9-]*' dist/`).

**P-4 · The pinned `standard` thumb paints nothing and has no focus leg.**
`glass-ui.css`: `.slider-thumb[data-v-534634a7]{width:0;height:var(--slider-track-height,.375rem);opacity:0;box-shadow:none;background:0 0;border:none;display:block}`. The only `:focus-visible` rule in the entire slider block is `.glass-slider[data-variant=spectrum] .slider-thumb[data-v-534634a7]:focus-visible{box-shadow:var(--focus-ring-shadow),var(--shadow-sm)}` — **spectrum-gated**.

---

## §2 · BLOCKERS

### D-1 · BLOCKER · Two misaligned breakpoint systems collide; in the 640–767px band the duration slider is squeezed to **zero width** and the 3-up grid over-subscribes its container by ~90px, clipped by `overflow-x: hidden`

`MorphPhaseConfig.vue:114-118` (card padding `1rem 1.25rem` from **640px**) · `FourierMorphDemo.vue:264-269` (grid goes `repeat(3, 1fr)` at **640px**) · `FourierMorphDemo.vue:195-200` (page padding `2rem` at **640px**) · `web/src/style.css:40-49` (`html{font-size:1.125rem}` until **768px**, then `1rem`).

The grid, the card and the page all step at Tailwind's `sm:640`. The **root font size** steps at the app's own `md:768`. Every dimension in this component is authored in `rem`. So there is a 128px-wide band — 640px ≤ vw < 768px — in which the layout switches to its *widest* arrangement (3 columns) while every `rem` is still at its *largest* value (18px, +12.5%). The two systems were never reconciled.

Arithmetic at vw = 640, root = 18px:

```
page content     = 640 − 2×(2rem=36px)              = 568px
column           = (568 − 2×(1rem gap=18px)) / 3    = 177.33px
card content box = 177.33 − 2×(1.25rem=22.5px)      = 132.33px      ← the budget

.duration-row (flex, nowrap, gap .5rem=9px ×2 = 18px):
  .config-label   "Duration", white-space:nowrap (L158), text-base=1rem=18px serif
                  floor estimate @0.42em/char ×8 ≈ 60px   (realistic ≈ 72px)
  .num-input      width: 3.5rem = 63px  (definite width ⇒ cannot shrink below it)
  gap .125rem     = 2.25px
  .input-unit     "ms", text-sm=.875rem=15.75px mono ≈ 19px
  Slider          flex:1 ⇒ flex-basis 0; min-content ≈ 0 (P-4: thumb is width:0)
  ────────────────────────────────────────────────────────────
  row min-content ≥ 60 + 63 + 2.25 + 19 + 18 = 162.25px
```

**162.25 > 132.33.** Two consequences, both forced:

1. **The slider gets 0px.** It is the only flex item that can shrink (its min-content is ~0 precisely because the pinned `standard` thumb is `width: 0`), so it absorbs the entire deficit first and disappears. The primary continuous control of the card is *gone*, not merely small.
2. **The row still overflows the card by ≥ 30px** after the slider hits zero. `.config-card` sets no `overflow` and `cartoon-surface` sets none either (`glass-ui/dist/styles/cards.css:33-48` — border-width, box-shadow, translate, transition, `:hover` only), so the card's **min-content contribution is the full 162.25 + 45 = 207.25px**. `repeat(3, 1fr)` is `repeat(3, minmax(auto, 1fr))`, and an `auto` minimum floors at the item's min-content. The grid therefore demands `3 × 207.25 + 2 × 18 = 657.75px` inside a 568px box — **over-subscribed by 89.75px**. `.demo-page{overflow-x:hidden}` (`FourierMorphDemo.vue:191`) then *clips* that excess rather than scrolling it: the third card's right edge is cut off and unreachable. WCAG 2.2 **1.4.10 Reflow (AA)** — content lost, no two-dimensional scroll offered.

The author demonstrably knew the `min-width:0` idiom — it is applied at `FourierMorphDemo.vue:186`, on `.demo-page`. It is one level too high: the page is not the element whose `auto` minimum is binding; the grid tracks and the flex row are.

At vw = 768 the root drops to 16px and the arithmetic just clears (card budget 184px vs row min 145–155px) — the slider survives with **23px**. It never exceeds **~87px** at any viewport, because `.demo-page` caps at `max-width: 960px` (L184): `(960−64−32)/3 − 40 − 161 = 87`.

*Falsifier.* Any of: (a) `overflow: hidden`/`clip` on `.config-card` or `.config-grid` — neither has it; (b) `min-width: 0` on the grid items or on `.duration-slider-track` — absent (L205-211 sets only `flex: 1` and four dead custom properties); (c) `grid-template-columns` using `minmax(0, 1fr)` — it uses bare `1fr` (`FourierMorphDemo.vue:266`); (d) the label rendering narrower than 60px — that would require < 0.42em/char average in a serif at weight 500, which no serif achieves for `Duration`; even at an absurd 40px the row min-content is 142px, still over the 132px budget. The **direction** is arithmetically forced. `UNPROVEN-NEEDS-LIVE`: the exact left edge of the broken band (I derive 640px; the true value depends on the rendered advance width of "Duration" in Computer Modern Serif) and the exact clipped pixel count.

### D-2 · BLOCKER · The duration number field has **no accessible name**

`MorphPhaseConfig.vue:8` — `<label class="config-label">Duration</label>` — and `:10-18` — `<input type="number" :value="duration" @change=… min max step class="num-input fira-code" />`.

The `<label>` carries no `for`. The input carries no `id`, no `aria-label`, no `aria-labelledby`, no `title`. The input is a **sibling** of the label inside `.duration-row` (L7), not a descendant, so no implicit association forms either. The accessible name computation therefore terminates with an empty string: a screen-reader user tabbing into any of the three cards hears "spin button, 150" with no field name and — because all three cards are structurally identical — no way to tell Settle Out from Morph from Settle In. WCAG 2.2 **4.1.2 Name, Role, Value (A)** and **1.3.1 Info and Relationships (A)**.

The same `<label>` is also invalid per HTML-LS §4.10.4: a `label` element with neither a `for` attribute nor a labelable descendant labels nothing. It is a `<span>` wearing a `<label>`'s name — and, because it labels nothing, clicking "Duration" does not focus the field, so the click-target affordance every user expects from a label is silently absent too.

*Falsifier.* An `id`/`for` pair, an `aria-label`, an `aria-labelledby`, or the input nested inside the label. Lines 8–18 are quoted in full above and contain none. Note this is **not** a copy of the Slider's naming, which is correct — see **S-1**; the two controls in the same row were treated differently.

### D-3 · BLOCKER · The duration Slider has **no visible keyboard focus indicator** under the pin

Keyboard focus on a reka Slider lands on `SliderThumb` (`role="slider"`, `tabindex="0"`) — the element the pinned CSS renders as `width: 0; opacity: 0` (P-4). `opacity: 0` makes the element *and any outline painted on it* fully transparent, so even the UA's default ring is invisible. The pinned stylesheet's only slider focus rule is spectrum-gated (P-4). The CVA base does put `focus-ring` on the root (P-1), but `glass-ui/dist/styles/utilities/base.css:174` defines it as **`.focus-ring:focus-visible`** — a rule that matches only the focused element itself. The root is an ancestor of the focused thumb, never `:focus-visible`, so the class is inert here. There is no `:focus-within` and no `:has()` fallback anywhere in the 4.0.0 slider block.

Net: tab into the duration slider and **nothing changes on screen**, at any of the three cards. WCAG 2.2 **2.4.7 Focus Visible (AA)**, and **2.4.11 Focus Not Obscured / 2.4.13 Focus Appearance** have nothing to evaluate.

Honest mitigation, stated because it bounds the severity rather than dissolving it: the same value is *also* reachable through the number field, which does paint a focus border (4.62:1 — §7). But the slider is independently tabbable, so a focus stop with no indicator exists regardless; 2.4.7 is per-element.

**The uplift CURES this.** `glass-ui/src/components/slider/styles.css:153` ships exactly the missing leg:
```css
.glass-slider:not([data-variant="spectrum"]):has(:focus-visible) .slider-track {
    box-shadow: var(--focus-ring-shadow);
}
```
with the authored rationale at :149-152 ("Keyboard focus rings the TRACK, not the invisible thumb"). Because the selector is `:not([data-variant="spectrum"])` rather than `[data-variant="scrubber"]`, it will fire even while `variant="standard"` is still being passed (D-5) — the cure lands the moment the package moves, before the rename sweep.

*Falsifier.* A `:focus-within`, `:has()`, or non-spectrum `:focus-visible` rule in the pinned slider CSS; or a thumb that is not `opacity: 0`. The full set of pinned `.slider-thumb`/`.glass-slider` rules was extracted from `glass-ui.css` by splitting on `}` and grepping — the complete list appears in P-4 and contains no such rule.

---

## §3 · MAJORS

### D-4 · MAJOR · The per-instance retint is **inert**: `sliderColor` is a prop that changes nothing, and all three cards render the identical `--primary` range

`MorphPhaseConfig.vue:205-211`:
```css
.duration-slider-track {
    flex: 1;
    --slider-scrub-range-bg:       color-mix(in srgb, var(--track-color) 30%, transparent);
    --slider-scrub-range-bg-hover: color-mix(in srgb, var(--track-color) 45%, transparent);
    --slider-scrub-thumb-bg:       var(--track-color);
    --slider-scrub-thumb-bg-hover: var(--track-color);
}
```
fed by `:29` `:style="{ '--track-color': sliderColor ?? 'var(--accent-red)' }"` and by three call-sites passing `var(--accent-red)` / `var(--accent-pink)` / `var(--accent-red)` (`FourierMorphDemo.vue:31,41,51`).

By **P-3** not one of those four custom properties is read by any rule in glass-ui 4.0.0 or 7.0.0. The pinned range reads `--slider-range-bg`:
```css
.slider-range[data-v-534634a7]{background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent); …}
```
so the fallback wins and **every slider in the component paints `--primary`**. `--slider-scrub-thumb-bg*` is doubly dead: even the correctly-named `--slider-thumb-bg` is consumed only under `[data-variant=spectrum]`, and the `standard` thumb is `opacity: 0` (P-4). The `-hover` pair has no analogue at all — the pinned CSS has no `.slider-range` hover leg (only `.glass-slider:active .slider-range{transform:scale(…)}`).

Consequence at the design level, which is what makes this a MAJOR rather than a lint: the component's **entire colour-coding scheme is unpainted**. The three cards are meant to read red / pink / red — phase-typed at a glance, matching `MorphShapePreview` and `HarmonicLevelGrid`. They read as three identical primary-coloured sliders. A prop (`sliderColor?: string`, L85), a style binding (L29), a scoped-CSS block (L205-211) and three call-site arguments exist to produce zero pixels of difference.

**Provenance — this is 3.x→4.0 rename residue, and the corpus half-caught it.** The tokens were real: glass-ui `CHANGELOG.md:1016` (the P.W3 `glass-scrubber` variant) — *"divergence axes route through inline `var(--slider-scrub-*, default)` per the existing slider scoped-CSS pattern"* — and `docs/tranches/P/audit/W3-Lane-A-glass-scrubber-slider-variant.md:21,36` specify `--slider-scrub-track-height` &c. At 4.0.0 the variant collapsed and the token namespace went with it. The fourier migration was, per `lane-frontend.md:499`, a **pure rename sweep**: `9 - variant="glass-scrubber"` → `9 + variant="standard"`. It renamed the variant and left the token namespace behind. `lane-frontend.md:382` inspected these very lines and classified them as *"prose comments only"* — correct about the **comments** at `MorphPhaseConfig.vue:98,204`, but the four **live declarations** at :207-210 are CSS, not prose, and were not assessed. glass-ui's own `docs/tranches/BC/audit/FINDINGS-DIGEST.md:1121` states the fact — *"only dead `--slider-scrub-*` tokens remain"* — without drawing the consumer-side consequence. **The dead-token fact is corpus-known; the consequence (the `sliderColor` prop is a no-op and the phase colour-coding never paints) is not.**

**Live corroboration.** The working tree carries the sweep's own receipt — `git diff -- web/src/components/morph/MorphPhaseConfig.vue` is a **single uncommitted line**:
```diff
-                    variant="glass-scrubber"
+                    variant="standard"
```
That is the whole of the migration as it touched this file: the variant moved, lines 207-210 did not. (This challenge audits the **working-tree** state, not `HEAD` — the WT is what F.W1 will uplift. `HEAD` still says `glass-scrubber`, a variant absent from 4.0.0's CVA entirely, which would make D-4 moot only by making the slider wholly unstyled.)

*Falsifier.* Any rule anywhere in the consumed CSS reading `--slider-scrub-range-bg` or `--slider-scrub-thumb-bg`. `grep -rn "slider-scrub" web/node_modules/@mkbabb/glass-ui/` → 0; `grep -rn "slider-scrub" web/src` → 10 hits, **all authored declarations, zero consumers** (`BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `GlassTimeline.vue:125`, `SliderControl.vue:144`, and this file). No local shim re-binds them. The fix is a one-token rename — `--slider-scrub-range-bg` → `--slider-range-bg` — which is correct on **both** sides of the pin (P-3 shows `--slider-range-bg` present in 4.0.0 and 7.0.0), so it can land before the uplift and survive it.

### D-5 · MAJOR · `variant="standard"` is a hard typecheck break at 7.0.0 — a break surface the **CENSUS omits**

`MorphPhaseConfig.vue:23`. By **P-2**, `SliderVariant` at 7.0.0 is `"scrubber" | "spectrum"`; `"standard"` is not assignable. `vue-tsc` fails.

Runtime is graceful — `Slider.vue:258` binds `:data-variant="v"` verbatim, and every scrubber leg in `styles.css` is authored as `:not([data-variant="spectrum"])` (`:145`, `:153`, and the `.slider-thumb` base at `:123`), so `data-variant="standard"` still picks up the scrubber paint. So the failure mode is precisely **hard typecheck, soft runtime** — the mirror image of the census's `ToastVariant` row, which it calls *"definition-absent → hard typecheck break"*.

`CENSUS-2026-08-03.md:102-104` enumerates the uplift break surface as: *removed subpaths in live use (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), removed dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1), `ToastVariant` definition-absent → hard typecheck break*; :186 and :256-257 repeat that inventory as the uplift's total type-break cost. **`SliderVariant` appears in none of them.** It is not a one-site addendum either: `grep -rn 'variant="standard"' web/src --include="*.vue"` returns **9 sites** — `BasisSelector.vue:170,197`, `EditorControlsDock.vue:117`, `GlassTimeline.vue:67`, `SliderControl.vue:83`, `ConvergenceTimeline.vue:71`, `HarmonicLevelGrid.vue:19,42`, `MorphPhaseConfig.vue:23` — exactly the 9 the 3.1→4.0 sweep created (`lane-frontend.md:499`). The same nine lines must be renamed a second time, `standard` → `scrubber`.

**This challenge contradicts the census by addition, not by correction**: the enumerated rows are all true; the surface is incomplete by one type and nine sites. Note the compounding with `lane-frontend.md`'s own budget warning — it already says the 4→7 hop is *"materially larger"* than the 46-line 3.1→4.0 rename; `SliderVariant` makes it 9 lines larger still, and those 9 lines sit under the tri-package deadlock (`glass-ui 4→7 ∧ keyframes.js 4.3→6 ∧ value.js 0.13→4.0`) recorded at `lane-frontend.md` §5, so they cannot be pre-landed the way the D-4 token rename can.

*Falsifier.* A `"standard"` member surviving in 7.0.0's `SliderVariant`, or a CVA that accepts it. `types.ts:10` is quoted verbatim in P-2; `index.ts` re-exports that exact type; `Slider.vue:26` defaults to `"scrubber"`.

### D-6 · MAJOR · The number field can display a value the model does not hold — and the Export button copies the model

`MorphPhaseConfig.vue:10-18` binds `:value="duration"` **one-way** and commits on `@change`. `:93-96`:
```ts
function emitDuration(raw: string) {
    const v = Math.max(50, Math.min(800, Math.round(Number(raw) || 50)));
    emit("update:duration", v);
}
```
Vue patches a DOM `value` only when the newly rendered vnode's prop differs from the previously rendered one, and no render is scheduled at all unless a reactive dependency changed. When the clamp maps the user's raw text onto the value the model **already holds**, the parent's assignment (`FourierMorphDemo.vue:32`) hits Vue's `Object.is` guard, nothing invalidates, no re-render occurs, and the DOM keeps the user's text.

Three reachable instances:
- `duration === 800` (reachable — it is the slider's `max`, L25). Type `1200`, blur. Clamp → 800 → assignment is a no-op → the field **still reads 1200**.
- `duration === 50` (reachable, and it is the *default* for the Morph card — `useFourierMorph.ts:61` `morphMs: 50`). Type `10` → clamp 50 → field **still reads 10**.
- `duration === 50`, type `abc`. `Number("abc")` is `NaN`, `NaN || 50` is `50` → no-op → the field **still reads `abc`**, indefinitely, through subsequent slider drags of the *other* two cards.

This is not cosmetic here, because the component's whole reason to exist is to author a config you take away: `FourierMorphDemo.vue:71-74` renders an **Export** button over `morphConfig.copyToClipboard()` → `useMorphConfig.ts:69-75` → `JSON.stringify(config)`. The clipboard receives the truth; the screen shows the lie. The user copies `800` while reading `1200`.

*Falsifier.* A `v-model`, an `@input` commit, a `@blur` re-sync, a `:key` forcing re-render, or a watcher writing the DOM. Lines 10–18 are the input's full attribute set and contain only `:value` and `@change`; there is no `useTemplateRef`, no `watch`, and `emit("update:duration", …)` occurs exactly once in the file (L95).

### D-7 · MAJOR · The Easing select announces its **value** but never its **field**

`MorphPhaseConfig.vue:35` `<label class="config-label">Easing</label>` — again no `for` (D-2's defect, second instance) — and `:37` `<SelectTrigger class="w-full">` with no `aria-label` / `aria-labelledby`.

The pinned `SelectTrigger` renders reka's trigger button whose only children are `<SelectValue />` and the chevron icon (verified in the compiled render: `default: y(() => [_(n.$slots,"default"), u(v(x) /* SelectIcon */, …)])`). Its accessible name is therefore computed from contents — i.e. the **currently selected easing label**. A screen-reader user hears "Linear, combo box" and is never told the control is *Easing*. Across three structurally identical cards all defaulting to `linear` (`useFourierMorph.ts:65-67`), the reading is "Linear combo box" three times with nothing distinguishing them and nothing naming what they set. WCAG 2.2 **4.1.2 (A)**.

A second-order effect worth recording: because glass-ui's `SelectItem` wraps its default slot in reka's `SelectItemText` (compiled render: `l("div", z, [u(v(w /* SelectItemText */), null, { default: y(() => [_(a.$slots,"default")]) }), _(a.$slots,"description")])`), the selected item's *entire* content is projected into the trigger — including the `<svg class="easing-preview">` (L47-54). That SVG has no `aria-hidden` (D-14), so it participates in the trigger's name computation as well.

*Falsifier.* `aria-label`/`aria-labelledby` on `<SelectTrigger>`, or a `for`/`id` pair. L35-39 quoted; L37 carries `class="w-full"` and nothing else.

### D-8 · MAJOR · The number field has no perceptible boundary: **1.36:1** border against its own fill, on a fill that is **~1.0:1** against the card

`MorphPhaseConfig.vue:167-180`:
```css
.num-input {
    border: 1.5px solid color-mix(in srgb, var(--foreground) 15%, transparent);
    background: var(--background);
    …
}
```
Token values (light arm): `--foreground: hsl(24 10% 10%)`, `--background: var(--neutral-0) = hsl(40 30% 98%)`, `--card: hsl(36 48% 97%)` (`glass-ui/dist/styles/tokens/color-radius.css:57,58,72,40`). Compositing 15% foreground over the input's own `--background` (§7):

| pair | ratio |
|---|---|
| resting border vs the input's fill | **1.36 : 1** |
| resting border vs the surrounding card | **1.34 : 1** |
| the input's fill vs the card fill | **≈ 1.01 : 1** (`#fbfaf8` vs `#fbf8f4`) |

So the field is a near-invisible plate on a near-identical plate, outlined at 1.36:1. Nothing about it reads as an editable region. WCAG 2.2 **1.4.11 Non-text Contrast (AA)** requires 3:1 for *"visual information required to identify user interface components"*, and here the border is the sole such information — the input carries no fill contrast, no underline, no chevron, no icon.

There is a design irony worth naming: the card it sits on wears a **2px** border (`cartoon-surface`, `cards.css:34`) against `--border` (`--neutral-4`, `hsl(32 26% 70%)`), which is emphatic. The interactive element inside it wears 1.5px at 15% opacity. The decorative container out-shouts the control — the exact inversion of the intended hierarchy.

*Falsifier.* A ≥3:1 boundary, a distinguishing fill, or another identification cue. `-moz-appearance: textfield` (L179) plus both `::-webkit-*-spin-button` suppressions (L182-186) deliberately remove the last remaining native cue, the spinners. Dark-arm re-check is `UNPROVEN-NEEDS-LIVE` for the exact ratio (the dark `--background` resolves through `--neutral-0`'s dark arm, which I did not chase); the light arm above is fully token-decidable.

### D-9 · MAJOR · The type scale is foreign to the design system **and** internally inverted

Authored sizes (`MorphPhaseConfig.vue:120-196`):

| element | size | weight | colour |
|---|---|---|---|
| `.config-card-title` (`h3`, L122) | `text-lg` = **1.125rem** | 400 | `--foreground` |
| `.config-card-desc` (`p`, L129) | `text-sm` = **0.875rem** | 400 | `--muted-foreground` |
| `.config-label` (L150) | `text-base` = **1rem** | **500** | `--muted-foreground` |
| `.num-input` (L174) | `text-base` = **1rem** | **600** | `--foreground` |
| `.input-unit` (L194) | `text-sm` = 0.875rem | 400 | `--muted-foreground` |

(`--text-sm/base/lg` = 0.875/1/1.125rem, `glass-ui/dist/styles/components.css:38,40,42` — the pinned values, not assumed defaults.)

**Inversion.** The label — a tertiary element, twice over: it is muted-coloured *and* it names a field — is set **larger (1rem) and heavier (500)** than the card's own description (0.875rem/400), the secondary element. Reading top-down the card descends 18 → 14 → **16**. Nothing in the visual weight tells you the description outranks the labels; the muted colour is doing the entire job alone.

**Foreignness.** glass-ui ships a **golden-ratio** type ladder — `glass-ui/dist/styles/typography/scale.css:100-122`: `--type-caption` (12px floor), `--type-small` (14, *"the workhorse"*), `--type-body` (16), `--type-prose` (18), then the φ-identity rungs `--type-subheading: 1.272rem /* √φ */`, `--type-heading: 1.618rem /* φ */`, `--type-title: 2.058rem /* φ^(3/2) */`. This card uses none of them; it uses Tailwind's raw steps, whose intervals here are **+14.3%** (14→16) and **+12.5%** (16→18). Against a system whose neighbouring rungs step ~27%, three sizes spanning 12.5% intervals do not read as three registers — they read as one flat block of text at slightly different sizes. The Aristotelian complaint is exact: the proportions are not *wrong in isolation*, they are **incommensurate with the system they sit inside**, and a proportion that cannot be compared cannot be perceived. `h3` at `--type-subheading` (20.4px) over `--type-small` (14px) description over `--type-caption` (12px) label would restore both the ordering and the ratio in three token substitutions.

*Falsifier.* A project `@theme` override of `--text-sm/base/lg` — `grep -n -- "--text-" web/src/style.css` returns nothing (L13-15 override only `--font-sans`); a semantic reason for the label to outrank the description — none is stated and the muted colour argues the opposite.

### D-10 · MAJOR · The slider's domain is 89% dead space, and the Morph card ships **at the floor** — zero-width range plus an invisible thumb

Domain `min=50, max=800, step=10` (L24-26) → 76 stops. Defaults (`useFourierMorph.ts:60-62`): `settleOutMs: 150`, `morphMs: **50**`, `settleInMs: 150`. As fractions of travel: **13.3% / 0.0% / 13.3%**. The entire out-of-the-box configuration lives in the leftmost eighth of the track. 89% of a control that is at most ~87px wide (D-1) — and 0–34px wide across the whole 640–800px range — is reserved for durations (300–2400ms total) that no shape-morph interaction targets.

The Morph card is worse than crowded: its default **is the minimum**. At `value === min` the range element has zero extent, and by **P-4** the `standard` thumb is `width: 0; opacity: 0`. So the Morph card's slider, in its default state, paints **no position indicator of any kind** — an empty grey capsule. Combined with D-3 (no focus ring) and D-4 (no colour retint), the control at rest is visually indistinguishable from a disabled or decorative element. This is the component's **empty state**, it is the state it boots in, and it is uncovered.

*Falsifier.* (a) A non-zero default for `morphMs` — `useFourierMorph.ts:61` reads `morphMs: 50` and `MorphPhaseConfig.vue:24` reads `:min="50"`; (b) a visible thumb — P-4; (c) a design brief calling for 800ms morphs — the parent's own copy calls the phase a *"Cross-fade"* (`FourierMorphDemo.vue:40`), and the only other duration surface, `MorphShapePreview`'s `total-ms` readout, is fed `settleOut + morph + settleIn` = 350ms by default. `UNPROVEN-NEEDS-LIVE`: whether the pinned `.slider-range`'s `box-shadow: var(--glass-material-rim), …` paints a hairline at zero width — if it does, the empty state degrades from "nothing" to "a 1px seam", which does not change the finding's direction.

### D-11 · MAJOR · The number field's focus indicator disappears entirely under `forced-colors: active`

`MorphPhaseConfig.vue:177,188-191`:
```css
.num-input { outline: none; }
.num-input:focus {
    border-color: var(--accent-red);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-red) 12%, transparent);
}
```
Under forced-colors the UA forces `border-color` to the user's palette — so the focused red border and the resting 15%-foreground border resolve to the **same** system colour and become indistinguishable — and `box-shadow` is forced to `none` outright. `outline: none` has already removed the UA ring. Three channels, zero survivors.

glass-ui anticipates exactly this and ships the antidote at `dist/styles/utilities/a11y-overrides.css:78-92`:
```css
@media (forced-colors: active) {
  .focus-ring:focus-visible, .glass-btn:focus-visible, .interactive-item:focus-visible,
  .btn-pill:focus-visible, .dock-icon-button:focus-visible, .dock-tab-button:focus-visible,
  .dock-select-trigger:focus-visible, .dock-dropdown-trigger:focus-visible,
  .input-pill:focus, .input-pill:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
}
```
with the authored rationale at :70-72 — *"all carry a box-shadow focus ring … that vanishes under WHC just like the original five."* The block is a **class allow-list**, and `.num-input` is a bespoke scoped class in a consumer SFC. It is not on the list and cannot be: the shipped rule cannot know it exists. This is the cost of hand-rolling an input instead of consuming `Input`/`.input-pill` — the component opts out of a system safety net that was built for precisely this failure. Note the same reasoning does **not** rescue the Slider: `.focus-ring` *is* on the slider root, but per D-3 it never matches, so the forced-colors arm never fires there either.

*Falsifier.* A selector in `a11y-overrides.css` matching `.num-input` — the block is quoted in full above; or a `@media (forced-colors: active)` block in the component or in `web/src/style.css` — `grep -n "forced-colors" web/src/style.css` returns nothing.

---

## §4 · MINORS

### D-12 · MINOR · 22 options, one flat list, eight families, zero grouping

`MorphPhaseConfig.vue:41-57` renders `v-for="name in easingNames"` over all 22 presets. The taxonomy is **already present in the data order** — `easings.ts:29-52` lists linear, then the three CSS keywords, then back ×3, quad ×3, cubic ×3, sine ×3, expo ×3, circ ×3 — but nothing expresses it visually. The pinned package exports `SelectGroup` **and** `SelectLabel` (`dist/select.js` export list) and the pinned `SelectItem` even renders a **`description` slot** (compiled: `_(a.$slots,"description")` immediately after the `SelectItemText`) — three affordances built for exactly this list, all unused. The user scans 22 near-identical two-word strings ("Ease In Quad", "Ease In Cubic", "Ease In Sine") differentiated by their last token, in a `min(24rem, 60dvh)` scroll box (`dist/styles/select.css:32,37-40`) that shows roughly half of them at a time.

*Falsifier.* `SelectGroup`/`SelectLabel` absent at the pin — both are exported; or a flat list being intentional for < ~10 items — there are 22.

### D-13 · MINOR · Heading level skip: `h1` → `h3`

`MorphPhaseConfig.vue:3` emits `<h3>`. Its only ancestor heading on the route is `FourierMorphDemo.vue:5` `<h1 class="demo-title">`. `grep -n "<h[1-6]" web/src/components/morph/*.vue` finds **no `h2` anywhere** in the morph subtree (only the two `h1`s, this `h3`, `HarmonicLevelGrid.vue:3`'s `h3`, and `FourierShapeExtractor`'s internal-tool headings), and `App.vue` contributes none (`grep -n "<h1\|<h2" App.vue` → nothing; it renders only `<RouterView />` at :27). WCAG 2.2 **1.3.1 (A)**; axe `heading-order`.

*Falsifier.* An `h2` rendered between the `h1` and this `h3` in DOM order — `MorphShapePreview` is the only intervening component (`FourierMorphDemo.vue:12`) and the grep shows it has no heading.

### D-14 · MINOR · The easing preview: no `aria-hidden`, no reference frame, and the three `back` curves are shaved at the viewBox edge

`MorphPhaseConfig.vue:47-54` — `<svg class="easing-preview" viewBox="0 0 40 20">` with a single `stroke-width="1.5"` path, no `<title>`, no `role`, no `aria-hidden`.

**No frame.** `easings.ts:115-127` maps `x = 2 + t·36`, `y = 18 − v·16` — so the 0-line is y=18 and the 1-line is y=2, but neither is drawn. Nothing else is drawn either: no box, no axes, no baseline. The one visual distinction the preview exists to communicate — which curves overshoot their endpoint — has nothing to overshoot *relative to*. A 40×20 stroke floating beside a text label communicates "curvy" and stops.

**Shaved.** Evaluating the installed `value.js@0.13.0` `timingFunctions` over the 25 sample points and applying the same mapping:

| preset | y-range | stroke extent (±0.75) | clipped by the UA's `svg:not(:root){overflow:hidden}` |
|---|---|---|---|
| `ease-out-back` | 0.61 … 18.00 | −0.14 … | 0.14 units off the top |
| `ease-in-out-back` | 0.52 … 19.48 | −0.23 … 20.23 | 0.23 top, 0.23 bottom |
| `ease-in-back` | 2.00 … 19.55 | … 20.30 | 0.30 units off the bottom |

All 19 other presets stay inside. **Honest magnitude:** the shave is 0.14–0.30 SVG units, and at `width: 40px; height: 20px` (L198-202) the viewBox maps 1:1, so 0.14–0.30 **CSS px** of the stroke's outer cap. The overshoot itself is still legible; only the cap is flattened. MINOR, and I record the number rather than the adjective so the claim cannot inflate.

*Falsifier.* `overflow: visible` on `.easing-preview` (L198-202 sets only `width`, `height`, `flex-shrink`) or a viewBox with headroom (it is `0 0 20` in y while the mapping's range for back easings is [0.52, 19.55]); an `aria-hidden` (absent); a drawn baseline (absent). The evaluation is re-runnable against `@mkbabb/value.js@0.13.0`; all 22 keys resolve to real functions (see **S-3**), so no curve is silently linear.

### D-15 · MINOR · Two fields in one card, two different label geometries

The Duration field is a **horizontal** row: `.duration-row` is `display:flex; align-items:center` (L142-146) with the label forced inline (`margin-bottom: 0; white-space: nowrap`, L156-159). The Easing field is **stacked**: the same `.config-label` keeps its `display: block; margin-bottom: 0.375rem` (L148-154). Same card, same class, two rhythms — and the two labels do not share a left-edge relationship with their controls, so the eye gets no repeated hook. The inline arrangement is also what makes D-1 fatal: `white-space: nowrap` on a flex item is what forbids the row from reflowing when the budget runs out.

*Falsifier.* A stated reason for the asymmetry — the file carries no comment on it (the only two comments, L98 and L204, both concern the scrubber adaptation); or the same pattern elsewhere in the repo — `HarmonicLevelGrid.vue`, the sibling card in the same grid, does not use it.

### D-16 · MINOR · Seven bespoke spacing literals, off any grid and off the system's ladder

`0.125rem` (L126, L165, L169), `0.375rem` (L153, L169, L171), `0.5rem` (L145), `0.75rem` (L111, L136), `0.875rem` (L131), `1rem`/`1.25rem` (L116) — at the desktop root that is **2 / 6 / 8 / 12 / 14 / 16 / 20px**, which sits on no 4px or 8px grid, and at the mobile root (18px, `style.css:41`) it becomes 2.25 / 6.75 / 9 / 13.5 / 15.75 / 18 / 22.5px — fractional throughout. glass-ui ships a φ space ladder (`dist/styles/tokens/offsets-sizing.css:235-236`, `--space-phi-5: 2.618rem /* φ² */`, `--space-phi-6: 4.236rem /* φ³ */`) and `--lift-sm` &c.; none is used. `0.875rem` for the description's bottom margin (L131) is the tell — it is not a spacing value at all, it is `--text-sm` being reused as a distance.

*Falsifier.* The literals matching some other repo convention — `HarmonicLevelGrid.vue` and `FourierMorphDemo.vue` use their own, different literals, so there is no shared local scale either.

### D-17 · MINOR · `:focus` rather than `:focus-visible`, tinted off-system

`MorphPhaseConfig.vue:188` uses `:focus`, so the ring paints on **mouse** click, not only on keyboard entry. The repo's own canon is `:focus-visible`: `web/src/style.css:133-137` was authored precisely to install `:focus-visible` rings on four classes, citing `AppHeader.vue:174-177` as *"the only pre-W4 conformant site."* The tint is off-system too — `--accent-red` (a hue token) instead of `--ring` (`hsl(24 10% 10%)`, `color-radius.css:102`) or glass-ui's composite `--focus-ring-shadow`, which is what `.focus-ring` and every glass primitive use (`dist/styles/utilities/base.css:174-178`).

*Falsifier.* A reason to distinguish this field's focus from every other focus in the app — none stated. Contrast is **not** the objection here: `--accent-red` vs the card is 4.62:1 light / 4.07:1 dark (§7), comfortably over the 3:1 bar. The objection is consistency and the pointer-focus false positive.

### D-18 · MINOR · No error state, no invalid state, no placeholder

`min`/`max`/`step` are present on the input (L14-16) but nothing renders an out-of-range condition: no `aria-invalid`, no message region, no `:invalid` styling, no `aria-describedby`. The clamp at L94 is silent — a user who types 1200 sees either a soundless snap to 800 or, at the bounds, nothing at all (D-6). `<SelectValue />` (L38) carries no `placeholder`, so if `easing` is ever `""` or a key outside the catalog — the prop is typed bare `string` (L84), not a union of `EASING_PRESET_NAMES` — the trigger renders **empty** with no fallback copy. Loading/disabled states are likewise absent: the parent gates interaction during animation (`FourierMorphDemo.vue:113,128` `isAnimating`) and passes that state to `MorphShapePreview` as `:disabled` but **never** to the three config cards, which stay fully live mid-morph while `syncWith` (`useMorphConfig.ts:78-84`) pushes each keystroke into the running animation.

*Falsifier.* A validation surface anywhere in L1-62 — the template is 62 lines and contains no conditional branch of any kind; a `placeholder` on `SelectValue` — L38 is `<SelectValue />`; a `:disabled` binding — the props interface (L80-86) has no such member.

### D-19 · MINOR · The three cards' rows do not align across the grid

`.config-card-desc` (L128-132) has no `min-height` and no line clamp; the descriptions are 30 / 27 / 25 characters (`FourierMorphDemo.vue:28,38,48`) and wrap at a card content width that ranges from 132px to 248px (D-1). At widths where one description takes 3 lines and another 2, the Duration rows below them sit at different vertical offsets — three parallel cards whose corresponding controls do not line up. The grid uses `repeat(3, 1fr)` (`FourierMorphDemo.vue:266`) with no `grid-template-rows: subgrid` and the card is not itself a grid, so nothing can align them.

*Falsifier.* Descriptions that always wrap identically — they differ by 5 characters, which at ~20 characters per line at the narrow end is enough to cross a line boundary. `UNPROVEN-NEEDS-LIVE`: the exact widths at which the wrap counts diverge.

### D-20 · MINOR · The three descriptions are grammatically non-parallel

`FourierMorphDemo.vue:28,38,48`: *"Shape degrades to low harmonics"* (subject + verb) · *"Cross-fade at low harmonics"* (bare noun phrase) · *"Resolves to full fidelity"* (verb with an elided subject). Three parallel cards, three different grammatical shapes, read in sequence left-to-right. The titles are parallel ("Settle Out" / "Morph" / "Settle In"); the descriptions break the pattern the titles set. One voice — all three as subject+verb, or all three as noun phrases — would cost nothing.

*Falsifier.* A house voice permitting the mix — the sibling copy in the same view is consistently subject-led (`FourierMorphDemo.vue:7` *"Tune the morph transition between sun and moon shapes."*).

### D-21 · MINOR · A hover-lift affordance on a card that is not interactive

`.config-card` composes `.cartoon-card` (L2) → `web/src/style.css:107-111` → `@apply cartoon-surface` → `glass-ui/dist/styles/cards.css:44-47`:
```css
&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg); }
```
The card lifts and grows its shadow on hover. It is a static container: no click handler, no `role`, no `tabindex`. It signals "press me" and does nothing. Because the card *contains* the slider and the field, the lift also means the pointer's approach displaces its own target.

**Honest magnitude, which is why this is MINOR and not MAJOR:** `--lift-sm: -1px` (`dist/styles/tokens/offsets-sizing.css:10`). The displacement is **1px** diagonally — below any plausible acquisition-disruption threshold. And glass-ui's global PRM block (`dist/styles/utilities/a11y-overrides.css:6-17`) restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow !important`, so the `translate` transition is neutered under reduced-motion — the 1px still applies, as an instant step rather than a slide. The defect is the false affordance, not the motion.

*Falsifier.* An interaction handler on `.config-card` — L2 carries only `class`; a larger `--lift-sm` — it is `-1px`; a PRM guard being needed — the global block above already covers the transition.

---

## §5 · INFO

### D-22 · INFO · `easingCurvePath` is uncached in the `v-for` while its sibling in the same module **is** cached

`MorphPhaseConfig.vue:49` calls `easingCurvePath(name)` inside `v-for` over 22 items; each call runs a 25-point sample loop and builds a string (`easings.ts:115-127`) — **550 easing evaluations plus 550 string concatenations per render** of the open dropdown. The same module memoizes the *other* catalog's paths (`easings.ts:99-109`, `_svgCache`), so the pattern was known and not applied here. Design consequence: the cost lands on dropdown-open, the one moment the user is waiting on the UI. A `computed` map keyed by name, or reusing `_svgCache`'s shape, removes it.

*Falsifier.* Vue memoizing the call — it cannot; it is a plain function call in a render function, re-executed each render.

### D-23 · INFO · `title` and `description` are unbounded strings with no typographic defense

`MorphPhaseConfig.vue:81-82` types both as bare `string`. `.config-card-title` (L120-126) has no `text-wrap: balance`, no truncation, no `hyphens`; `.config-card-desc` (L128-132) has none either. At the card content widths D-1 derives (132–248px), a title longer than the current 5–11 characters wraps to a ragged two lines that the 0.125rem title margin (L125) is far too tight to absorb. The component defends against no input it does not currently receive.

### D-24 · INFO · Two uplift **improvements** available at 7.0.0, beyond the D-3 cure

- **`valueText`** (`glass-ui/src/components/slider/types.ts:33-36`, wired at `Slider.vue:363` `:aria-valuetext="props.valueText?.(value, key) ?? undefined"`, with the authored note at :350 — *"reka mints none"*). Today the thumb announces the bare number: "150". `:value-text="v => `${v} milliseconds`"` makes it humane, and this component is the archetypal case for it since its unit lives in a `<span>` the AT never reaches (L19).
- **`marks`** (`types.ts:28`, *"Decorative checkpoints in the numeric domain; they never snap the value"*, rendered at `Slider.vue:307-315`). Bookending 50/800 — or better, marking the useful 150–300 band — is the direct remedy for D-10's dead domain, and costs one prop.

Both are additive: neither is blocked by the D-5 rename, though both are gated behind the tri-package deadlock (`lane-frontend.md` §5).

---

## §6 · SUPERLATIVES (L-18 runs both ways)

**S-1 · The Slider's `aria-label` is placed with knowledge of where reka puts `role="slider"`.**
`MorphPhaseConfig.vue:27` sets `aria-label="Duration (ms)"` on `<Slider>`. That is correct for a non-obvious reason: the pinned Slider explicitly re-projects it onto **each thumb** — `slider-DQ95MET2.js`, thumb render: `o(h(b /* SliderThumb */), { key: t, "aria-label": n.$attrs["aria-label"] ?? void 0, class: "slider-thumb glass-specular-track touch-hit-area" })`. The thumb is the element carrying `role="slider"`; a label left on the group root would have named a `div`. The author also included the **unit** in the label — "Duration (ms)" — which is the only place the unit reaches assistive tech at all, since the `ms` span (L19) is decorative text in a sibling element. This is the single aria-correct construct in the file, and it is the subtle one.
*Falsifier.* The pinned Slider not forwarding `$attrs["aria-label"]` to the thumb — the render call is quoted verbatim above. (It makes D-2 sharper, not softer: the author demonstrably understood accessible naming, and the number field 10 lines above still has none.)

**S-2 · The component is reduced-motion-safe by construction, not by exemption.**
The scoped block declares exactly one transition — `transition: border-color 0.15s ease` (L178) — and zero `transform`, `translate`, `opacity`, `scale` or `animation`. `border-color` is on the *allow-list* of glass-ui's nuanced PRM block (`a11y-overrides.css:14-16`, which keeps `opacity, color, background-color, border-color, box-shadow` and kills everything else), so the component needs no `@media (prefers-reduced-motion: reduce)` arm and correctly does not ship a vacuous one. Compare `web/src/style.css:92-96`, where the repo *did* need the guard for a `translateX` tab animation. Knowing when the guard is unnecessary is the rarer skill.
*Falsifier.* `grep -E "transform|translate|animation|@keyframes|opacity" MorphPhaseConfig.vue` → the scoped block (L108-212) contains none.

**S-3 · The easing catalog is complete — no preset silently renders a lie.**
`easings.ts:55-60` builds `EASING_PRESETS` by mapping 22 label keys onto `timingFunctions[name]`, with no existence check; and `easingCurvePath` falls through to the identity function on a miss (`:116`). A single missing key would therefore render a **straight line** under a label reading "Back In" — a preview that actively misinforms, with no error anywhere. Evaluating the installed `@mkbabb/value.js@0.13.0`: **22 of 22 keys resolve to real functions; 0 missing.** The contract holds today.
*Falsifier.* Re-run `names.filter(n => typeof timingFunctions[n] !== "function")` against the installed package → `[]`. This is a superlative about the *current* state and it is fragile by construction — the uplift moves value.js `0.13 → 4.0` (`lane-frontend.md` §5), and nothing in this code path would report a key that disappeared. Worth a re-run at F.W1, not a redesign.

**S-4 · The clamp is authored once and both input paths route through it.**
`emitDuration` (L93-96) is the sole emitter of `update:duration` in the file, and `durationModel.set` (L101) delegates to it — `set: (arr) => emitDuration(String(arr[0] ?? 50))` — rather than re-deriving bounds. So the slider and the number field cannot disagree about `[50, 800]`, and a bound change is a one-line edit. The `?? 50` guard on `arr[0]` also handles the empty-array case the `number[]` model makes representable.
*Falsifier.* A second clamp expression or a bare `emit("update:duration", …)` — the string `emit("update:duration"` occurs exactly once (L95), and `Math.max(50, Math.min(800, …))` exactly once (L94).

**S-5 · Spinner suppression is complete across engines.**
`-moz-appearance: textfield` (L179) **and** both `::-webkit-inner-spin-button` / `::-webkit-outer-spin-button` with `-webkit-appearance: none; margin: 0` (L182-186). Most implementations ship the webkit half alone and leave a Firefox spinner that breaks the `text-align: right` alignment (L176). Both arms present, and `margin: 0` on the pseudo-elements — the leg that is usually forgotten and that causes the 2px right-edge gap.
*Falsifier.* A surviving spinner on either engine — both selectors are present with both declarations.

---

## §7 · Contrast — the token-decidable set

Computed from the shipped literals: OKLCH → linear sRGB (Björn Ottosson's matrices), HSL → linear sRGB, WCAG 2.x relative luminance. `color-mix(in srgb, C P%, transparent)` composited over the stated backdrop in gamma space. Script at `/private/tmp/…/scratchpad/contrast.mjs`; every input is quoted with its file:line below the table.

| pair | ratio | bar | verdict |
|---|---|---|---|
| `--accent-red` (L) `#db2424` vs `--card` `#fbf8f4` — focus border, D-17 | **4.62 : 1** | 3:1 (1.4.11) | PASS |
| `--accent-red` (D) `#e05c5c` vs `--card` (D) `#2c2826` | **4.07 : 1** | 3:1 | PASS |
| `--accent-pink` (L) `#d7428c` vs `--card` | **3.93 : 1** | 3:1 | PASS |
| `--muted-foreground` `#7c6650` vs `--card` — label + description text, D-9 | **5.12 : 1** | 4.5:1 (1.4.3) | PASS |
| `--foreground` `#1c1917` vs `--background` `#fbfaf8` — the number itself | **16.82 : 1** | 4.5:1 | PASS |
| `.num-input` resting border `#dad9d7` vs its own fill — **D-8** | **1.36 : 1** | 3:1 (1.4.11) | **FAIL** |
| `.num-input` resting border vs `--card` | **1.34 : 1** | 3:1 | **FAIL** |
| focus `box-shadow` `color-mix(--accent-red 12%)` `#f7dfdb` vs `--card` — D-17 | **1.20 : 1** | — | cosmetic only; the border carries the indicator |

Token sources — `glass-ui/dist/styles/tokens/color-radius.css`: `:40` `--neutral-0: hsl(40 30% 98%)`, `:44` `--neutral-4: hsl(32 26% 70%)`, `:45` `--neutral-5: hsl(30 22% 40%)`, `:57` `--background: var(--neutral-0)`, `:58` `--foreground: hsl(24 10% 10%)`, `:72` `--card: hsl(36 48% 97%)`, `:85` `--muted-foreground: var(--neutral-5)`, `:95` `--border: var(--neutral-4)`, `:102` `--ring: hsl(24 10% 10%)`, `:256` `--accent-pink: oklch(0.613 0.197 353.8)`, `:258` `--accent-red: oklch(0.574 0.216 27.5)`; `dark-arm.css`: `:60` `--foreground: hsl(48 10% 90%)`, `:64` `--card: hsl(24 8% 16%)`, `:109` `--accent-pink: oklch(0.683 0.131 354.7)`, `:111` `--accent-red: oklch(0.644 0.165 22.9)`.

Two contrast claims that were **falsified** and are therefore recorded as non-defects: (a) `--accent-pink` is **not** an undefined token — it is declared at `color-radius.css:256` and bridged at `theme/bridges.css:183`; (b) the focus **border** clears 1.4.11 in both arms — the D-17 objection is consistency and the `:focus`/`:focus-visible` distinction, not contrast.

---

## §8 · Corpus reconciliation

**Folded, not re-derived.**
- `lane-frontend.md:173` — the component's own census row (212 lines, *"Phase/duration Select + Slider"*). Confirmed exactly.
- `lane-frontend.md:280-281` — the two glass-ui subpath imports. Both subpaths **survive** at 7.0.0 (`glass-ui/package.json` exports include `./select` and `./slider`), so this file is clean on the census's *removed-subpath* axis; its uplift exposure is entirely D-5 + D-4.
- `lane-frontend.md:499` — the `9 - variant="glass-scrubber"` → `9 + variant="standard"` sweep. This is the origin of both D-4 (the token namespace left behind) and D-5 (the nine sites that must move again).
- `lane-frontend.md` §5 — the tri-package deadlock. Governs which of my remedies can pre-land: D-4's token rename can (both names exist at both versions); D-5's variant rename cannot.
- `CENSUS-2026-08-03.md:102-104,186,256-257` — the uplift break surface. Every enumerated row stands; see the contradiction below.
- `lane-fourier-r3-r6.md` **R3-12** (TRUE / ADOPT-AS-FACT) names *"`MorphPhaseConfig` easingNames"* among the 7 duplicated open-family records that inflate any instance denominator by 20%. Consistent with D-12 from the opposite direction: the same 22-item list appears at more than one call-site, so grouping it once at the catalog (`easings.ts`) rather than per-consumer would discharge R3-12's duplication **and** D-12's flat list in one edit. I neither re-derive nor contest R3-12.

**Contradicted / extended.**
1. **`lane-frontend.md:382` — partially wrong for this file.** It asserts all `glass-scrubber` / `glass-track` / `glass-fill` / `glass-thumb` occurrences are *"prose comments only (verified site-by-site: … `MorphPhaseConfig.vue:98,204`)"*. True of the two **comments** it cites. But the four lines *immediately following* comment :204 — `MorphPhaseConfig.vue:207-210` — are **live CSS custom-property declarations** in the scrubber's dead token namespace, and the sweep did not assess them. The lane's claim is scoped to the class/variant vocabulary and is correct there; the **token** vocabulary was not swept. Same miss at `BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `GlassTimeline.vue:125`, `SliderControl.vue:144` — 10 dead declarations across 5 files.
2. **`CENSUS-2026-08-03.md:102-104` — incomplete by one type and nine sites.** `SliderVariant` drops `"standard"` at 7.0.0 (`types.ts:10`), a hard typecheck break structurally identical to the `ToastVariant` row the census does record, at 9 live sites. See D-5. The census's enumerated rows are not contested; the surface is larger than stated.
3. **glass-ui `docs/tranches/BC/audit/FINDINGS-DIGEST.md:1121` — confirmed and extended.** Its *"only dead `--slider-scrub-*` tokens remain"* is exactly right at the producer's altitude. What it does not say, and what D-4 supplies, is the consumer-side consequence: a public prop (`sliderColor`), a style binding, and three call-site arguments that produce zero pixels, and a colour-coding scheme that never paints.

---

## §9 · Tally

| severity | ids | n |
|---|---|---|
| BLOCKER | D-1, D-2, D-3 | **3** |
| MAJOR | D-4 … D-11 | **8** |
| MINOR | D-12 … D-21 | **10** |
| INFO | D-22, D-23, D-24 | **3** |
| **defects** | | **24** |
| SUPERLATIVE | S-1 … S-5 | **5** |

**Uplift ledger for this file (F.W1).** *Breaks:* D-5 (`variant="standard"` → `"scrubber"`, 1 site here / 9 repo-wide, hard typecheck). *Stays broken:* D-4 (the `--slider-scrub-*` namespace is dead at 7.0.0 too — fixable **now**, before the uplift, by renaming to `--slider-range-bg`). *Cured by the move:* D-3 (`styles.css:153` rings the track). *Newly available:* D-24 (`valueText` → `aria-valuetext`; `marks`). *Untouched by the move:* D-1, D-2, D-6 … D-23 — the majority. This component's design debt is overwhelmingly **local**, not pinned; the uplift is neither the cause nor the cure.

**Cheapest high-value edits, in order:** `min-width: 0` on the grid tracks + drop `white-space: nowrap`, or move the grid's 3-up breakpoint to 768 to meet the root-font ladder (kills D-1) → `id`/`for` on both labels (kills D-2 and D-7) → rename four custom properties (kills D-4, pre-uplift) → `v-model` on the number field (kills D-6).
