claude-opus-5[1m]

# CHALLENGE · `SliderControl` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/SliderControl.vue` (150 LOC)
**Posture** component assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier.
**Method** static + source-derived only. No browser. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Pin under audit** `@mkbabb/glass-ui@4.0.0` installed (`web/node_modules/@mkbabb/glass-ui/package.json:3`) vs producer `7.0.0` (`/Users/mkbabb/Programming/glass-ui/package.json:3`).

**Tally** — 19 defects (2 BLOCKER · 6 MAJOR · 8 MINOR · 3 INFO) + 4 superlatives.

---

## §0 · The headline

**The component's single differentiating feature does not exist.**

`SliderControl` takes a **required** `color: string` prop (`:32`). Its whole rendered effect is the five declarations at `:143-149`, which set `--slider-scrub-track-height`, `--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`, `--slider-scrub-thumb-bg-hover`.

**No glass-ui version has ever shipped a `--slider-scrub-*` token.** The installed 4.0.0 slider reads exactly nine variables — `--slider-track-height`, `--slider-track-bg`, `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-size`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-spring` (`web/node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, the 19 `data-v-534634a7` rules). Producer 7.0.0 reads the same family (`/Users/mkbabb/Programming/glass-ui/src/components/slider/styles.css:49-58,104,116,126`).

The provenance is exact and damning. `glass-ui/CHANGELOG.md:1016` (§1.8.0, `2026-05-16`) says of the then-new `glass-scrubber` variant:

> "**No new tokens shipped**—divergence axes route through inline `var(--slider-scrub-*, default)` per the existing slider scoped-CSS pattern."

`git blame` puts `SliderControl.vue:143-149` at `4df1a06a`, **2026-05-16 16:23** — the same day. The consumer implemented the CHANGELOG's *prose promise* verbatim. The producer never kept it: `grep -rn "slider-scrub" /Users/mkbabb/Programming/glass-ui/src/ /Users/mkbabb/Programming/glass-ui/dist/` → **empty**, and the string does not occur in the installed 4.0.0 CSS either.

Every one of the eight `<SliderControl>` instances in the tree has therefore painted the *identical* default surface — `--primary` fill on `--muted-medium`, 20px track — for ~3 months, regardless of the amber / fourier-red / basis colour its author passed.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The retint block is dead; `color` is a required prop with zero effect

**Where** `SliderControl.vue:143-149` (declarations), `:32` (the prop), `:89` (the `--track-color` hook that feeds them).
**Claim** All five custom properties name variables no `Slider` implementation reads. The `color-mix()` results at `:145-146` and the raw `var(--track-color)` at `:147-148` are computed by the engine, stored on the root, and never consumed. The intended `16px` track at `:144` is likewise inert — the rendered track is `1.25rem` (20px) from `.glass-slider[data-size=md]`.
**Consequence (design)** Eight sliders across three panels — `ContourSettings.vue:230,243,269,282,295` (amber), `EquationPanel.vue:97` and `FunctionInput.vue:179,213` (`var(--viz-fourier)`) — are visually indistinguishable from every *other* glass Slider in the app (`BasisSelector.vue:170,197`, `GlassTimeline.vue:67`, `MorphPhaseConfig.vue:23`, `HarmonicLevelGrid.vue:19,42`, `ConvergenceTimeline.vue:71`, `EditorControlsDock.vue:117`). The whole colour-coding system that `lib/colors.ts:77-87` exists to serve is absent from the control surface. Aristotelian reading: the wrapper's *ergon* — to be the colour-bearing labelled slider — is unperformed; what remains is a label chassis.
**Falsifier** Name any glass-ui release whose slider CSS reads `--slider-scrub-*`. Grep the producer tree and the installed dist: zero hits, and `CHANGELOG.md:1016` states outright that no such tokens were shipped. If a hit exists, D-1 collapses.
**Repair (and why a rename alone is not enough)** The correct names are `--slider-range-bg` and `--slider-track-height` (`--slider-thumb-bg` is moot: the `standard` recipe paints the thumb `width:0; opacity:0` — `glass-ui.css` `.slider-thumb[data-v-534634a7]`; there is no `-hover` token in either version, hover is a `box-shadow` change only). But a rename **must not** go into the scoped `.slider-track-host` block: `.slider-track-host[data-v-PARENT]` is `(0,2,0)`, exactly tied with glass-ui's own `.glass-slider[data-size=md][data-v-534634a7]`, so which wins is decided by bundler emission order — the precise failure producer 7.0.0 documents at `slider/Slider.vue:215-221` ("a scoped attribute selector ties on specificity with any single-class descendant rule a host writes over its own children, and source order then decides the raise away silently"). Move them into the existing `:style` binding at `:89` alongside `--track-color`; inline has no tie to lose.

### D-2 · BLOCKER (uplift) · `variant="standard"` is definition-absent at 7.0.0 — and the census break-surface table omits it

**Where** `SliderControl.vue:83`; 14 occurrences across 8 files tree-wide (`grep -rn 'variant="standard"' web/src | wc -l` → 14; live attribute sites: `SliderControl.vue:83`, `BasisSelector.vue:170,197`, `EditorControlsDock.vue:117`, `GlassTimeline.vue:67`, `MorphPhaseConfig.vue:23`, `ConvergenceTimeline.vue:71`, `HarmonicLevelGrid.vue:19,42` — the remainder are prose).
**Claim** Producer 7.0.0 declares `export type SliderVariant = "scrubber" | "spectrum";` (`glass-ui/src/components/slider/types.ts:10`) and defaults to `"scrubber"` (`Slider.vue:26`). `"standard"` is gone. The installed 4.0.0 CVA still lists it (`dist/components/ui/slider/index.d.ts`). Under `vue-tsc -b` — which `lane-frontend.md §0/§9` establishes is one of only two frontend gates, vitest being absent — this is a **hard typecheck break at 9 live attribute sites**.
**Consequence, stated precisely** The *runtime* damage is small and I will not overstate it: 7.0.0's scrubber rules are written negatively (`.glass-slider:not([data-variant="spectrum"])`, `styles.css:145,153`) with no positive `[data-variant="scrubber"]` gate anywhere (`grep -rn 'data-variant="scrubber"' src/` → empty), and `graspable` is `v !== "spectrum"` (`Slider.vue:100`), so `"standard"` still paints and still grasps. The break is the **build**, plus a source string that becomes a lie about which recipe is in force.
**Corpus contradiction (explicit)** `formation/fourier/lane-frontend.md §5` — "Rows that hit fourier-analysis TODAY" — enumerates `metric-badge ×7`, `hover-card ×2`, `hover-popover ×2`, `DockIconButton ×2`, `DockDropdownTrigger ×1`, `ToastVariant`, `lucide-vue-next ×35`, and the three peer floors. **The Slider variant rename is not in that table.** It should be, at ×9 live sites — nine more than `DockDropdownTrigger`, which is listed. Note also that the *subpath* is stable (`"./slider"` present in both export maps: installed `package.json:487`, producer `package.json:409`), so this row is invisible to a pure export-map diff — which is precisely how §5 built its table. `lane-frontend.md:382`'s companion finding ("all 11 `glass-scrubber` occurrences are prose comments only") is **TRUE and I confirm it** — but it audited the *retired* string, not the *current* one, and not the `--slider-scrub-*` declarations at `:144-148`, which are live CSS, not prose. Both are census extensions, not refutations.
**Falsifier** Show `"standard"` in `SliderVariant`, or a 7.0.0 back-compat alias. `types.ts:10` is a two-member union; `grep -rn "standard" src/components/slider/` yields only prose.

---

## §2 · MAJORS

### D-3 · MAJOR · The numeric field cannot accept a fractional value typed from scratch

**Where** `SliderControl.vue:44-49` (`onInput`) + `:58-60` (`displayValue`) + `:74` (`:value="displayValue"`).
**Claim** `onInput` fires per keystroke, `parseFloat`s the partial string, clamps, and emits. `displayValue` is `formatValue(modelValue)`, and Vue's DOM-prop patch writes it back into the field whenever it differs from `el.value`. Trace `ContourSettings.vue:230` (`min 0.1`, `max 0.9`, `formatValue = v.toFixed(2)`), starting at `0.50`: select-all → type `0` → `parseFloat("0")=0` → `clamp(0, 0.1, 0.9) = 0.1` → `displayValue = "0.10"` → the field is rewritten to `0.10` mid-keystroke. The user's next character appends to `0.10`, not to `0`. **`0.15` is unreachable by typing.**
**Blast radius** 6 of the 8 call sites pass a fractional `formatValue`: `ContourSettings.vue:230,243,269,282,295` and — by fractional domain — none in `EquationPanel`/`FunctionInput` (those are integer, and integer entry survives because `String(n)` round-trips). So the defect is confined to, and total within, ContourSettings.
**Falsifier** Make `formatValue` identity-on-round-trip and the rewrite stops. Or: if Vue did not patch `value` when the bound string changes, the caret would survive — it does patch (`el.value !== newValue` guard only).
**`UNPROVEN-NEEDS-LIVE`** the exact caret/selection behaviour after the rewrite (engine-dependent). The *value* rewrite itself is fully source-derivable and is the defect.

### D-4 · MAJOR · `.slider-subtitle` fails WCAG 1.4.3 AA in **both** colour arms — token-decidable

**Where** `SliderControl.vue:111-115` (`font-size: 0.75em; opacity: 0.7`) inheriting `color: var(--muted-foreground)` from `:108`.
**Computation** `--muted-foreground` → `--neutral-5` (`glass-ui/dist/styles/tokens/color-radius.css:85`). Light `hsl(30 22% 40%)` (`light-dark.css:88`), dark `hsl(34 14% 62%)`. Page is `--background` → `--neutral-0`: light `hsl(40 30% 98%)`, dark `hsl(24 9% 4%)`. The producer's own comments certify the *un-faded* ratios — 5.21:1 light, 7.64:1 dark — and my independent sRGB-luminance computation reproduces them (0.9601 / 0.003094 page luminance; 7.65:1 dark). Compositing the element at `opacity: 0.7` over the page:

| arm | composited sRGB | contrast vs page | AA 4.5:1 |
|---|---|---|---|
| light | `rgb(162.5, 146.5, 130.2)` | **2.88 : 1** | ✗ (fails even 3:1) |
| dark | `rgb(123.5, 114.9, 103.9)` | **4.24 : 1** | ✗ |

Size: `@apply text-sm` = `--text-sm: 0.875rem` (`dist/styles/tokens/…/scale.css:42`), × `0.75em` = `0.65625rem` → **10.5px** desktop, **11.8px** on mobile (`web/src/style.css:41` sets `html{font-size:1.125rem}`). Weight 400. Unambiguously "normal text"; the 3:1 large-text exemption is nowhere near.
**Consequence** The subtitle carries real semantic payload — `FunctionInput.vue:182` "terms in the Fourier sum", `:216` "shown in expanded (a+b) view" — the only text distinguishing two sliders whose labels ("Harmonics" / "Display terms") are otherwise near-synonymous.
**Why nothing caught it** The axe gate exists (`web/e2e/visualization-ux.spec.ts:26-44`, tags `wcag2a/2aa/21a/21aa`, serious+critical) but its four keystones (`:114,146,163,201`) are all inside the `/visualize` workspace. `subtitle` is passed at exactly two sites, both in `FunctionInput.vue`, mounted from `EquationView.vue:198` — **not axe-covered**. Note the tree elsewhere takes this seriously: `style.css:113-127` is a bespoke `--viz-amber` darken booked as an "axe contrast carry". The same rigour was not applied here.
**Falsifier** Delete `opacity: 0.7` and the subtitle sits at the certified 5.21 / 7.64. Or show that the composite is not `0.7·fg + 0.3·bg` in the device space — it is; `opacity` composites the rendered element, and no intervening backdrop-filter sits between this span and the page in either consuming panel.
**Repair** Drop `opacity` and express the de-emphasis with weight (`400`, already there) and a dedicated token, e.g. `color: var(--muted-foreground)` at full alpha with `font-size: 0.8125em`.

### D-5 · MAJOR · Five of the eight sliders have mouse-only explanatory prose

**Where** `ContourSettings.vue:229,242,268,281,294` — each `<SliderControl>` is the sole child of `<Tooltip text="…">` → `web/src/components/ui/tooltip/Tooltip.vue:27` `<TooltipTrigger as-child>`.
**Claim** With `as-child`, reka's `TooltipTrigger` merges its props onto the slot child's root — here `SliderControl`'s root `<div class="slider-control">` (`:65`), a non-focusable element with no `role` and no `tabindex`. reka binds `focus`/`blur` (`reka-ui/dist/Tooltip/TooltipTrigger.js` — `tooltipListeners` = `{click, focus, pointermove, pointerleave, pointerdown, blur}`) and emits `aria-describedby` onto that element only when open (`TooltipTrigger.js:88`). **`focus` does not bubble**, so tab-focusing the `role="slider"` thumb *inside* the div never fires the trigger's handler; the tooltip never opens on keyboard; and the description is bound to an element assistive tech will never visit.
**Consequence** The entire authored copy — "Soften before tracing — crank it up for furry subjects or noisy backgrounds" (`:241`), "Ignore tiny contours — raise to drop grass, fences, and stray edges" (`:267`), "How many outlines to keep — 1 for a clean silhouette, more for interior detail" (`:280`) — is unreachable without a pointer. This is prose quality wasted by plumbing: the writing is the best in the file and it does not ship to half the audience.
**Falsifier** If reka bound `focusin` rather than `focus`, keyboard entry would work. It binds `focus`. If `SliderControl`'s root were focusable, the div would receive focus — it has no `tabindex`.
**Repair** Under the old pin: hoist the description into the component (`aria-describedby` on the Slider pointing at a visually-hidden `<span>`). Under 7.0.0: `LabeledField` mints `describedBy` and threads it to the control (`labeled-field/types.ts:29-37`); see D-6.

### D-6 · MAJOR · `formatValue` never reaches assistive tech — and cannot, under the old pin

**Where** `SliderControl.vue:33,58-60` (`formatValue` → `displayValue` → visual only) vs `:87` (`:aria-label` is the *name*, not the *value*).
**Claim** The slider's announced value is reka's raw `aria-valuenow`. A sighted user of `ContourSettings.vue:288` reads **"All"** at value 0; a screen-reader user hears **"0"**. At `:230` the visual is `0.35`, the announced value `0.35000000000000003`-class raw floats. Installed 4.0.0 exposes no hook: `dist/components/ui/slider/Slider.vue.d.ts` has no `valueText`, and the compiled thumb render forwards only `aria-label`.
**Uplift IMPROVES** 7.0.0 adds `valueText?: (value: number, index: number) => string` (`slider/types.ts:35`) authored per thumb onto `aria-valuetext` (`Slider.vue:363`), with the intent documented at `:350-353`: "the ONE humane readout — reka mints none, so a screen reader otherwise hears the raw number for a slider whose scale is a curve, a colour, or a duration." `formatValue` maps onto it 1:1. **Book this as an F.W1 gain, not merely a break to absorb.**
**Falsifier** Point at any 4.0.0 path that sets `aria-valuetext`. There is none in `dist/slider-DQ95MET2.js`.

### D-7 · MAJOR · No state surface at all — no disabled, invalid, loading, or empty

**Where** the whole prop block, `SliderControl.vue:25-34`.
**Claim** The axis requires empty/error/loading coverage. This component offers none. `disabled` exists on the underlying `Slider` (`Slider.vue.d.ts` `SliderRootProps`) and is unreachable through the wrapper. Both consuming panels *have* the states: `ContourSettings.vue` renders a retry banner for transient errors (`:310`); `EquationPanel.vue:106-110` branches `loading` / `error` / rendered. During a compute round-trip the sliders stay fully live and fully unmarked — the user can scrub a parameter the in-flight request will ignore, with no affordance saying so. `FunctionInput.vue:191` disables the *neighbouring* `<Button>` on `!effectiveN` while the slider beside it stays enabled: an inconsistency visible in a single flex row.
**Uplift IMPROVES** 7.0.0's `SliderProps` adds `invalid` (`slider/types.ts:32`) with `data-invalid` on the root, `aria-invalid`/`aria-errormessage` on the thumb (`Slider.vue:260,361-362`), and `LabeledField` adds `disabled`, `errorLive: "off"|"polite"|"assertive"`, and an `#error` slot (`labeled-field/types.ts:14,19-20`, `LabeledSlider.vue:47`).
**Falsifier** Name a prop, slot, or class on `SliderControl` that expresses any non-default state. There is none.

### D-8 · MAJOR · Motion is ungated for `prefers-reduced-motion` on both sides of the seam

**Where** `SliderControl.vue:128` (`transition: border-color 0.15s`, no `@media` guard anywhere in the SFC) and the 4.0.0 substrate beneath it.
**Claim** The installed 4.0.0 slider CSS contains **zero** `@media (prefers-reduced-motion: reduce)` rules — of the 19 `data-v-534634a7` rules, the only at-rule is one `@supports (corner-shape:…)`. Yet it animates: `.glass-slider:active .slider-range` runs `transform: scale(var(--scale-press-btn,.97))` on the spring `var(--slider-thumb-spring, var(--spring-smooth))`, and both `.slider-track` and `.slider-range` transition `background`/`box-shadow`. So every drag carries an unsuppressible press-squish.
**Corpus** `lane-frontend.md:612-624` inventories 18 `prefers-reduced-motion` references across 12 files and flags two ungated rAF clocks. **`SliderControl.vue` is on neither list** — it is a third, smaller gap, and the substrate half of it is invisible to a `src/`-only grep. Sibling components in the same panels *do* gate (`ContourSettings.vue:370-375`, `CollapsibleSection.vue:66`), so this is a local lapse, not a house posture.
**Uplift IMPROVES** 7.0.0's slider ships three `@media (prefers-reduced-motion: reduce)` blocks (`slider/styles.css:192,307,452`), a `@media (forced-colors: active)` block (`:317`), and a `@media (pointer: coarse)` 44px hit-target floor (`:85-92`) — none of which exist at 4.0.0 (its only coarse-pointer artefact is the inert `.slider-thumb.touch-hit-area:before{pointer-events:none}`).
**Falsifier** Produce a `prefers-reduced-motion` rule scoped to `data-v-534634a7` in `dist/glass-ui.css`. There is none.

---

## §3 · MINORS

### D-9 · MINOR · The input's *type* mutates with its value, silently removing affordances

**Where** `:72` `:type="isNumericDisplay ? 'number' : 'text'"` + `:75-77` (`min`/`max`/`step` conditioned on the same flag) + `:61`.
**Claim** `ContourSettings.vue:288` formats `0` as `"All"`. `Number("All")` is `NaN` → `isNumericDisplay` false → the element flips to `type="text"` **and drops `min`, `max`, `step`**. At exactly one point in a 0–50 domain the spin buttons vanish, arrow-key stepping stops, and native range validation is off. Everywhere else in the same slider it is a `number` input. One control, two behaviours, switched by data.
**Falsifier** Set `maxContours` to 1: the type reverts. If `formatValue` never produced a non-numeric string the branch would be dead — `ContourSettings.vue:288` produces one.

### D-10 · MINOR · The field cannot be cleared

**Where** `:40-42` + `:44-49`.
**Claim** `parseFloat("")` is `NaN`; `clamp` returns `lo` (the `Number.isFinite` guard, `:41`); the emit re-renders `displayValue` and the field refills with `min`. Backspacing to empty snaps the value to `min` and repaints it. There is no transient-empty state.
**Falsifier** Any code path that lets `modelValue` or the DOM value be empty. There is none — `displayValue` is total on `number`.
*(Note the tension with superlative S-3: the same guard that makes this annoying is what keeps `NaN` out of the model. The right fix is a local editing buffer, not removing the guard.)*

### D-11 · MINOR · The label row has no shrink discipline; the 2-up grid has no responsive collapse

**Where** `SliderControl.vue:102-109` (`display:flex; justify-content:space-between`) with the text `<span>` at `:67` carrying no `min-width: 0` / `overflow` / `text-overflow`, against the fixed `width: 2.75rem` input at `:118`; consumed inside `ContourSettings.vue:377-382` `.advanced-grid { grid-template-columns: 1fr 1fr; gap: .625rem .75rem }` — a **hard 2-column grid with no `@media` breakpoint** (the file's only `@media` is the reduced-motion block at `:370`).
**Claim** A flex item's default `min-width: auto` floors the text span at its min-content width, so a long label ("Max Contours", "ML Threshold") in a half-width cell of a narrow settings panel pushes the fixed-width input past the container edge rather than truncating. Aristotelian: proportion is asserted (`space-between`) without the means to keep it (`min-width: 0`).
**Falsifier** Add `min-width: 0; overflow: hidden; text-overflow: ellipsis` to `:67`'s span; the overflow becomes truncation.
**`UNPROVEN-NEEDS-LIVE`** the exact viewport width at which it clips.

### D-12 · MINOR · `16px` is off the producer's size ladder, and `size` is not exposed

**Where** `:144` (`--slider-scrub-track-height: 16px`) vs the ladder `sm 0.75rem / md 1.25rem / lg 1.75rem` (`glass-ui/src/components/slider/styles.css:47-59`; identical at 4.0.0).
**Claim** 16px is not a rung. The wrapper does not forward `size`, so the *supported* way to be smaller is unreachable while the *unsupported* way is what was written. The Aristotelian charge is against the system, not the pixel: fourteen Slider sites share one geometric ladder; this one site alone tried to sit between rungs.
**Irony worth recording** because D-1 killed the declaration, the tree today is *uniformly* 20px. The bug has been enforcing the house rhythm. Repairing D-1 by literal rename would **introduce** the inconsistency. Correct repair: expose `size` and pass `sm`, or accept `md`.
**Falsifier** Find a `--slider-track-height` rung at 16px in either version. There is none.

### D-13 · MINOR · Two incompatible `color` provenance idioms across the call sites

**Where** `ContourSettings.vue:234,247,273,286,299` pass `VIZ_COLORS.amber` (a hex string, imperatively resolved from `--viz-amber` at mount by `lib/colors.ts:90-96`); `EquationPanel.vue:100` and `FunctionInput.vue:184,218` pass the literal string `"var(--viz-fourier)"` (live CSS, re-resolved by the engine on every theme change).
**Claim** One prop, two contracts. After D-1 is repaired the difference becomes visible: the `var()` arm re-tints instantly on a dark-mode toggle; the hex arm holds the previous theme's colour until `resolveVizColors()` is re-invoked. Since `--viz-amber` is one of the two tokens fourier *overrides per arm* (`style.css:119-127`), the amber sliders are precisely the ones exposed.
**Falsifier** Show `resolveVizColors()` wired to the theme toggle such that the hex arm updates within the same frame. `lib/colors.ts:89` documents the requirement ("Call on mount + theme toggle") — a convention, not a mechanism.

### D-14 · MINOR · `--track-color` has no `var()` fallback

**Where** `:145-148`.
**Claim** `color-mix(in srgb, var(--track-color) 25%, transparent)` with `--track-color` unset or empty is an invalid `color-mix()`; the whole declaration is dropped at parse. `color` is required by the type, but `:color="''"` and `:color="undefined"` both typecheck loosely enough in a template. Every use should read `var(--track-color, var(--primary))`.
**Falsifier** Pass `color=""`; the mix is invalid. (Currently unobservable — see D-1.)

### D-15 · MINOR · `.fira-code` resolves to a fallback face and carries no tabular figures

**Where** `:73` `class="inline-number fira-code"`.
**Claim (a)** `.fira-code` is `font-family: var(--font-mono)` (`glass-ui/dist/styles/typography/utilities.css:81`), and `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace` (`tokens.css:46`). The payload-bearing `@font-face` for "Fira Code" lives in `styles/fonts.css`, reachable only via the `@mkbabb/glass-ui/styles/fonts` subpath — which **fourier never imports**: `web/src/style.css:1-3` imports `tailwindcss`, `tw-animate-css`, `@mkbabb/glass-ui/styles`, and `main.ts:5-6` adds only `katex` + `style.css`. So the readout paints the metric-calibrated `"Fira Code Fallback"` (`typography/scale.css:64-71`) — a `local()`-only face over SF Mono / Menlo / Consolas / Courier New. Geometrically transparent by design (`size-adjust: 99.98%`), so this is a fidelity note, not a layout bug — but the branded mono the class names is not what renders.
**Claim (b)** `.fira-code` sets `font-feature-settings: "liga","calt"` and **not** tabular figures. The house idiom for a changing numeric readout is `.animated-digit`: `font-feature-settings:"ss01","tnum","lnum"; font-variant-numeric: tabular-nums lining-nums`. The fallback chain is monospace so advances happen to match — the mismatch is with the design system's stated numeric register, and it becomes real the moment `--font-mono` is overridden with a proportional stack.
**Falsifier** (a) find a `@font-face { font-family: "Fira Code" }` on fourier's critical path — `index.css`'s own header states the split is by subpath and fonts are "NOT imported here". (b) grep `.fira-code` for `tnum` — absent.

### D-16 · MINOR · The accessible name drops the subtitle, and one value wears two same-named controls

**Where** `:87` (`:aria-label="label"`) vs `:66-70` (the visible name is `label` **+** subtitle).
**Claim** Sighted: "Harmonics — terms in the Fourier sum". Announced: "Harmonics". The disambiguating half is dropped. Worse, the `<label>` at `:66` implicitly names the `<input>` with the *full* string including the subtitle, so the number field and the slider — two controls for one value — are announced with **different** names, and nothing relates them programmatically. In `FunctionInput.vue` the two sliders' `label`s ("Harmonics" / "Display terms") are close enough that the dropped subtitle is exactly the discriminator.
**Falsifier** Read `:87`: the binding is `label`, not a computed including `subtitle`.
**Uplift IMPROVES** `LabeledField` mints one `labelledBy` covering label + `description` and threads it to the control via `aria-labelledby` with `controlLabelable: false` for reka's non-labelable span root (`labeled-field/types.ts:20-27`, `LabeledSlider.vue:34,41`).

---

## §4 · INFO

### D-17 · INFO · `aria-label` lands on the role-less root as well as the thumb
`:87` is a fallthrough attr. 4.0.0's compiled Slider reads it into the thumb (`n.$attrs["aria-label"]`) *and* Vue's default `inheritAttrs` also applies it to `SliderRoot`'s `<span>`. A role-less span with `aria-label` is ignored by AT, so no user-visible harm — but it is a redundant attribute the uplift will keep emitting, and it makes `aria-label` look like it names the group when it names the thumb. **Falsifier** disable `inheritAttrs` and the duplicate disappears; there is no `inheritAttrs: false` in `dist/slider-DQ95MET2.js`.

### D-18 · INFO · Vendor-only `appearance` reset
`:127` `-moz-appearance: textfield` without the standard `appearance: textfield`. Functional in current Firefox; non-conformant CSS and lint-fragile. **Falsifier** the standard longhand is absent from the block at `:117-129`.

### D-19 · INFO · `label` and the default slot can disagree
`:68` `<slot>{{ label }}</slot>` makes `label` a *fallback* for the visible text, while `:87` makes it the unconditional accessible name. A consumer filling the slot gets a visible name and an accessible name that need not match — a WCAG 2.5.3 (Label in Name) hazard by construction. No consumer currently uses the slot (all eight sites are self-closing), so this is latent. **Falsifier** pass slot content ≠ `label`; the two names diverge with no warning.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### S-1 · The scalar↔array adapter is the right shape, minimally expressed
`:53-56`. A writable `computed` with a clamping setter — not a `watch`-mirrored `ref`. It has no lag frame, no echo loop, and it clamps on the *inbound* path so an out-of-range array from reka cannot escape into the model. The comment at `:51-52` names why it exists in one sentence.
**Falsifier** Replace it with the common `ref` + two `watch`ers and you acquire both a stale frame and a write-back cycle. That this file has neither is a deliberate, correct choice, and it is the pattern `LabeledSlider.vue:41-44` independently arrives at at 7.0.0.

### S-2 · The retirement record at `:10-16` is the best provenance comment in the component tree
It names the retired prop, the disposition letter, the ledger (`audit/W3-adoption-ledger.md`), the *exact verification command* (`git grep '<SliderControl' | xargs grep variant`), and the hardening flag it discharges. **Falsifier** find another consumer wrapper in `web/src/components/ui/` that records a prop retirement with its verification command — `CollapsibleSection.vue` and `tooltip/Tooltip.vue` do not. `CENSUS-2026-08-03` / `lane-frontend.md:371` calls these three wrappers "the correct posture — keep"; on documentation quality this one earns it outright.

### S-3 · `clamp()` is finite-guarded before it is bounded
`:40-42`. `Number.isFinite(v) ? … : lo` fires *before* `Math.max/Math.min`, so `parseFloat("")`, `parseFloat("All")` and `Infinity` all resolve to `lo` instead of propagating. Without it, `Math.max(lo, Math.min(hi, NaN))` returns `NaN`, which would reach the canvas/WebGL consumers downstream of these values. **Falsifier** drop the guard and any non-numeric keystroke poisons `modelValue`. (D-10 is the cost of this correctness, not a reason to remove it.)

### S-4 · The dock-token migration note at `:18-20` is load-bearing and correct
It records that the v1.8.x `Slider` acquires `DockContext` internally, so the legacy string-key `dockKeepOpen`/`dockRelease` injects were retired — naming the silent regression (CR-2 at v1.7.0) and the wave that fixed it. I verified the mechanism survives at 4.0.0 (`useDockHold` inside `dist/slider-DQ95MET2.js`, attaching native `pointerdown`/`touchstart` on the resolved root) and at 7.0.0 (`Slider.vue:20,76`, with `:59-64` documenting *why* it must be native rather than a Vue binding). The comment describes the substrate accurately three minor versions later — rare.

---

## §6 · What F.W1 should carry (consolidated)

1. **Repair D-1 before or during the uplift**, via the `:style` binding at `:89`, not the scoped block — else the token collision at `.slider-track-host` (0,2,0) vs `.glass-slider[data-size=md]` (0,2,0) decides by emission order.
2. **Add the Slider variant row to the census §5 break table**: `variant="standard"` → `"scrubber"`, ×9 live attribute sites / 8 files, typecheck-breaking, invisible to an export-map diff.
3. **Evaluate deleting `SliderControl` outright.** 7.0.0 ships `LabeledSlider` (`glass-ui/src/components/labeled-field/index.ts:4`) whose contract is `Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: number }` (`types.ts:52-53`) — i.e. **scalar `modelValue` + `label` + `description`**, exactly this wrapper's public API, plus correct `aria-labelledby`/`describedBy`/`invalid`/`disabled`/`errorLive`. That single adoption discharges D-4 (no opacity idiom), D-5 (real `describedBy`), D-6 (`valueText`), D-7 (state surface), D-8 (gated motion), and D-16 (whole-name labelling). What would remain local is the inline numeric field (D-3/D-9/D-10 to be rewritten with an editing buffer) and the per-instance colour hook.
4. **Extend the axe keystone set to `EquationView`** — the only route where `subtitle` renders, and therefore the only route where D-4 is observable.

## §7 · Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `lane-frontend.md:371` — the 3 `ui/` wrappers are "thin API-shape adapters, not shadows … keep" | **AGREE on posture, QUALIFY on condition.** The adapter shape is right (S-1) and the documentation exemplary (S-2), but the instance is materially broken: its only non-chassis feature is dead (D-1). "Keep" must read "keep and repair", and §6.3 argues 7.0.0 may retire it entirely. |
| `lane-frontend.md:382` — all `glass-scrubber` / `glass-track` / `glass-fill` / `glass-thumb` hits are prose comments only | **AGREE, and EXTEND.** Verified true. But the census audited the retired *class* strings; it did not test whether the live `--slider-scrub-*` **declarations** at `:144-148` resolve. They do not (D-1). |
| `lane-frontend.md §5` break table | **EXTEND** with the Slider variant row (D-2). |
| `lane-frontend.md:612-624` — 18 reduced-motion refs / 12 files; two ungated rAF clocks flagged | **EXTEND.** `SliderControl.vue` is a third gap, and its substrate half (4.0.0's ungated press-spring) is invisible to a `src/`-only grep (D-8). |
| `CENSUS-2026-08-03.md:102-104` — uplift break surface | **EXTEND** (same as D-2). |
| `intakes/lane-fourier-r3-r6.md` (38/52 TRUE) | **NO OVERLAP.** All 52 rows concern Codex packet provenance — byte counts, SHA-256 pins, registry joins. No row touches `SliderControl`, the Slider, or any design-axis surface. Nearest neighbour is `R3-10` (six live dynamic-`:is` families as a per-component-audit exhaustiveness gap, routed to F.W4); it is adjacent in spirit, not in subject. **I contradict nothing in that lane.** |

## §8 · Method and limits

Read whole: the subject (150 LOC); its one component import `@mkbabb/glass-ui/slider` at both the installed 4.0.0 (`dist/slider.js`, `dist/slider-DQ95MET2.js`, `dist/components/ui/slider/{index,Slider.vue}.d.ts`, the 19 slider rules in `dist/glass-ui.css`) and the producer 7.0.0 (`src/components/slider/{Slider.vue,types.ts,index.ts,styles.css}`); the token chain (`dist/styles/tokens/{color-radius,light-dark,dark-arm}.css`, `dist/styles/typography/{scale,utilities}.css`, `dist/styles/theme/bridges.css`, `dist/styles/index.css`); `web/src/style.css`, `web/src/main.ts`, `web/src/lib/colors.ts`, `web/src/components/ui/tooltip/Tooltip.vue`, `reka-ui/dist/Tooltip/TooltipTrigger.js`; all eight call sites in `ContourSettings.vue`, `EquationPanel.vue`, `FunctionInput.vue`; the axe harness `web/e2e/visualization-ux.spec.ts`; `glass-ui/CHANGELOG.md` §1.8.0; `glass-ui/src/components/labeled-field/{index.ts,types.ts,LabeledSlider.vue}`.

Not done: no browser, no build, no `vue-tsc` run, no visual capture. Contrast figures are computed from token literals in sRGB with the standard WCAG relative-luminance formula and cross-checked against the producer's own annotations for the un-faded case (5.21 / 7.64 reproduced to 0.01). Two claims are marked `UNPROVEN-NEEDS-LIVE` and are flagged inline (D-3 caret behaviour, D-11 clip width). Nothing outside this file was written; both product trees were read-only throughout.
