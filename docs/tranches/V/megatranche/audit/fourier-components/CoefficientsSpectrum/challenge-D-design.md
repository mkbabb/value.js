claude-opus-5[1m] (served model id)

# CHALLENGE — `CoefficientsSpectrum.vue` · AXIS **D** (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (168 lines)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its own falsifier.
**Method** Static + source-derived only. No browser. Contrast figures are computed from the shipped
token literals with the WCAG 2.x relative-luminance formula (script transcribed in §A). Livable-only
claims are marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Read whole (read-only):** the subject; `web/src/components/ui/tooltip/Tooltip.vue` + `index.ts`;
`web/src/lib/types.ts`; `web/src/style.css`; both consumers (`visualization/CoefficientsPanel.vue`,
`equation/EqCoefficientsPanel.vue`); `equation/FrequencyGraph.vue` (the `#graph` slot payload);
`equation/EquationView.vue`; `web/src/lib/colors.ts`; `web/src/App.vue`;
`node_modules/@mkbabb/glass-ui@4.0.0` (`dist/TooltipProvider-*.js`, `dist/button-*.js`,
`dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts`, `src/styles/**`);
`/Users/mkbabb/Programming/glass-ui` @ 7.0.0 (`src/components/tooltip/*`,
`src/components/button/Button.vue` + `styles.css`, `src/components/animated-digit/AnimatedDigit.vue`,
`src/components/_shared/floating.ts`, `src/styles/**`, `CHANGELOG.md`);
`node_modules/reka-ui@2.9.10` (`src/Tooltip/*`, `src/Popper/PopperRoot.vue`, `src/Primitive/*`);
`node_modules/@vue/runtime-{core,dom}@3.5.38`; `api/routers/equations.py`, `api/services/computation.py`,
`src/fourier_analysis/{epicycles,symbolic/spline,symbolic/integration,symbolic/identification}.py`.

**Tally** — **26 defects** (3 BLOCKER · 7 MAJOR · 12 MINOR · 4 INFO) · **5 superlatives**.

---

## §0 · Corpus fold (hitherto — cited, not re-derived)

| corpus row | status here |
|---|---|
| `intakes/lane-fourier-r3-r6.md:79` — **R3-7a** TRUE / CARRY→F.W3: "CoefficientsSpectrum 2" of the 35 Tooltip callsites | **CONFIRMED, both located**: `:80` (per-row) and `:124` (show-more). This challenge supplies the *design* disposition for both — see BLOCKER-1, m-1, m-2, m-3. |
| `intakes/lane-fourier-r3-r6.md:84` — **R3-10** TRUE / CARRY→F.W4: `CoefficientsSpectrum.vue:132` is one of six dynamic `:is` families, dropped between two registries | **CONFIRMED at exactly `:132`** — `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. Design note folded at m-11. |
| `formation/fourier/lane-frontend.md:180` — subject rowed at 168 LOC, "**SHADOW candidate, §4**" | Not contested. §4's `fourier-field` convergence is a P2 architecture call, out of axis D. |
| `formation/fourier/lane-frontend.md:443` — `CoefficientsPanel`/`EqCoefficientsPanel` → `./metric-stack` (4.0.0) → `./metric` (7.0.0) | Not contested; the hosts, not the subject. |
| `formation/fourier/lane-frontend.md` §5 "Rows that hit fourier-analysis TODAY" — `lucide-vue-next` → `@lucide/vue`, 35 sites | **CONFIRMED**: `:20` is one of the 35. |
| `formation/fourier/lane-frontend.md:612-624` — PRM census: 18 refs / 12 files, **2 named gaps** (`stores/animation.ts`, `ConvergencePlot` rAF) | **CONTRADICTED BY EXTENSION** — there is a **third** gap the census does not name. See MAJOR-2. |
| `formation/fourier/lane-frontend.md` §5 break table (metric-badge · hover-card · hover-popover · DockIconButton · DockDropdownTrigger · ToastVariant · lucide · keyframes · value.js) | **CONTRADICTED BY OMISSION** — the table has **no `Button` row**, yet 7.0.0 deletes `variant` outright. See MAJOR-4. |
| `CENSUS-2026-08-03.md:113` — PRM/`DockBackgroundToggle` as canonical seat | consistent; MAJOR-2 is a *different*, CSS-side gap. |

---

## §A · The measurement that grounds BLOCKER-2

Bar fill = `hsl(hue, 85%, 55%)`, `hue = (1 − i/max(total−1,1)) · 300` (`:46-49`).
Surfaces (glass-ui 4.0.0 `src/styles/tokens/color-radius.css:40-41,57,72`; `tokens/dark-arm.css:42-43`):
`--background = --neutral-0 = hsl(40 30% 98%)` (light) / `hsl(24 9% 4%)` (dark);
track `bg-muted/50` = `--muted = --neutral-1 = hsl(38 26% 95%)` at 50% over the page.

WCAG relative luminance, contrast `(L₁+0.05)/(L₂+0.05)`:

```
LIGHT   page L=0.9602   track L=0.9294   →  track : page = 1.031 : 1
  N=12  i= 0 h=300 3.26   i= 2 h=245 7.30   i= 5 h=164 1.44   i= 8 h= 82 1.36   i=11 h=  0 4.04
  N=40  i= 0 h=300 3.26   i=12 h=208 3.08   i=18 h=162 1.45   i=30 h= 69 1.27   i=36 h= 23 2.79
  →  7 / 12 collapsed bars  and  24 / 40 expanded bars  fall below 3:1.   worst 1.27 : 1
DARK    page L=0.0031   track L=0.0067   →  track : page = 1.067 : 1
  →  1 / 12  and  3 / 40  below 3:1.   worst 2.59 : 1
```

Two facts fall straight out. (i) The ramp is **non-monotonic in luminance** — contrast climbs 3.26 →
7.30 then collapses to 1.27 then recovers to 4.04, so the *most* salient bar is #3, not #1: the
rainbow pathology, textbook. (ii) The fixed `55%` lightness is tuned for a **dark** surface and is
shipped on a warm-cream page — the light arm is where it fails, 6× more often than the dark arm.

---

## BLOCKERS

### **BLOCKER-1 · The tooltip trigger is a non-focusable `<div>`. Phase, Re/Im and Relative are unreachable by keyboard and by touch — and the file's own docblock claims the opposite.**

`:80-85` wraps each row's `<div class="coeff-row">` in `<Tooltip side="bottom">`. That shim
(`ui/tooltip/Tooltip.vue:27`) renders `<TooltipTrigger as-child>`. reka-ui's
`TooltipTrigger` (`reka-ui/src/Tooltip/TooltipTrigger.vue:23`) declares `as: 'button'` — **but
`asChild` discards `as` entirely**: `Primitive.ts:56-63` swaps `asTag` for `'template'` and delegates
to `Slot.ts`, which `cloneVNode`s the consumer's child with merged attrs and **adds no `tabindex`**.
The child is a `<div>`. A `<div>` without `tabindex` never receives focus, so `handleFocus`
(`TooltipTrigger.vue:83`) is unreachable; and `handlePointerMove` early-returns on
`event.pointerType === 'touch'` (`:68-69`), so a tap never opens it either.

Result: **amplitude to 4 decimals, phase, relative %, and the real/imaginary parts (`:110-119`) —
the only quantities this component exists to disclose beyond a 2-decimal magnitude — are
mouse-hover-exclusive.** WCAG 2.1.1 (Keyboard, level A) and 1.4.13 (Content on Hover or Focus) both
fail on the "focus" arm.

The file *asserts the gap is closed*: `:15-19` — *"the bespoke `:hover` CSS tooltip lifts to the
glass-ui `Tooltip` primitive … discharging the L5 §5 A8 LOW a11y gap."* It is not discharged; the
primitive was adopted and the focusability that would have made the adoption meaningful was not.
`.coeff-row { cursor: default; }` (`:165-167`) even *declares* the row non-interactive, so the
component tells the pointer user nothing is there to click and tells the keyboard user nothing at all.

**Falsifier** — any of these three would kill the claim, and none is present: (a) `tabindex="0"` on
`.coeff-row`; (b) dropping `as-child` so reka renders its default `<button>`; (c) a duplicate,
statically-rendered disclosure of phase/Re-Im somewhere in the row. Contrast `:124-135`, where the
same shim wraps a glass `<Button>` — a real `<button>` — and *is* keyboard-reachable. The
component therefore proves it knows how; it just did not do it where the data lives.

### **BLOCKER-2 · 7 of 12 (58%) collapsed bars and 24 of 40 (60%) expanded bars fail WCAG 1.4.11's 3:1 non-text minimum in light mode; the track is 1.03:1 and supplies no reference frame. A theme-reactive viz palette exists in-repo and is bypassed.**

Figures and derivation in §A. Provenance: `:46-49` (`spectrumColor`), `:94` (applied as
`backgroundColor`), `:89` (`bg-muted/50` track). The bar *is* the primary encoding — the numeric
column beside it is `toFixed(2)` (MAJOR-5), so for most rows the bar is the only legible magnitude.

Three compounding aggravations:
1. **The failure is worst where the bar is shortest.** Hue falls monotonically with rank, so the
   1.27–1.45:1 bars are the low-amplitude rows — a 2-to-20-pixel sliver (`minWidth: '2px'`, `:95`) at
   near-page luminance. Small *and* invisible.
2. **The track is invisible in both themes** (1.031:1 light, 1.067:1 dark). A proportion bar whose
   100% reference cannot be seen is not a proportion bar; it is a floating stripe of unknown scale.
3. **The correct mechanism is already built and wired.** `src/lib/colors.ts:1-6` — *"Primary viz
   colors are derived from CSS custom properties (`--viz-*`) so they automatically adapt to
   light/dark mode"* — exports a reactive `VIZ_COLORS` (`:74-84`) refreshed by `resolveVizColors()`
   (`:90-95`), which `App.vue:11-17` re-runs on every theme flip via a `MutationObserver`.
   `CoefficientsSpectrum` imports none of it and hardcodes an HSL literal instead. glass-ui itself
   ships a contrast-vetted viz ramp (`tokens/color-radius.css:263-267`,
   `tokens/light-dark.css:145-147` — `light-dark()` pairs, i.e. the producer already solved exactly
   this two-arm problem). The repo has even done this remediation once by hand:
   `style.css:119-131` darkens light `--viz-amber` from 3.54:1 to 4.6:1 with the axe carry cited.

**Falsifier** — the claim dies if the panel's actual backdrop is materially darker than
`--background`. It is not: the visualization host is `ConfiguratorLayer` over the page, the equation
host is `.cartoon-card` whose `background: var(--card)` = `hsl(36 48% 97%)` (`style.css:126-129`,
`tokens/color-radius.css:72`) → L = 0.9421, which *lowers* every ratio further. It also dies if the
bars are decorative rather than informative; `:93` makes width the amplitude encoding and `:107`
re-uses the same hue as the tooltip's identity dot, so they are informative by construction.

### **BLOCKER-3 · Hue encodes rank-in-the-current-view, not the datum — so one coefficient wears three different colors, and two of them are stacked 8 px apart in the same panel.**

`spectrumColor(i, topComponents.length)` (`:94`, `:107`) takes the **length of the currently visible
slice** as its denominator. `topComponents` is `slice(0, expanded ? 40 : 12)` (`:36-38`).

- Collapse→expand (`:130`, the component's one gesture) changes the denominator 12→40, so **every
  bar recolors**: row 3 moves hue 245.5° → 284.6°, row 8 moves 81.8° → 246.2°. The user presses
  "Show more" and the chart they were reading is repainted.
- Worse, the `#graph` slot. `CoefficientsPanel.vue:17-23` renders `<FrequencyGraph :max-bars="40">`
  **immediately above** the list (`:70`, then `mb-2` at `:72`). `FrequencyGraph.vue:41-44` contains a
  **byte-identical copy** of `spectrumColor` — same `300`, same `85%`, same `55%` — and calls it with
  `n = 40` (`:84`) while the collapsed list calls it with `n = 12`. Therefore, in the default
  collapsed state, **canvas bar #3 and list row #3 are the same coefficient rendered in two
  different hues, ~8 px apart, in one panel.** The tooltip's identity dot (`:107`) inherits the
  list's hue, so hovering to identify a bar hands back the *wrong* color key for the graph above it.

Color here carries no stable referent — not the harmonic index `n`, not the amplitude, not the
basis. It carries "your position in whatever subset happens to be on screen." That is an encoding
that actively misinforms rather than one that merely under-informs.

**Falsifier** — the claim dies if the denominator were `totalComponents` (stable across expand) or if
hue were derived from `comp.index` or `comp.amplitude / maxAmplitude` (stable across views). It is
none of these: `:94` and `:107` both pass `topComponents.length`, and `FrequencyGraph.vue:84` passes
its own independent `n`. It would also die if the two surfaces were never co-visible; `CoefficientsPanel.vue:16-23` renders them in one flow, with only the graph's `v-if="components.length"` gating it.

---

## MAJOR

### **MAJOR-1 · The entire motion contract is dead code. `<TransitionGroup>` cannot animate a multi-root child; all five scoped rules at `:147-163` never execute, and Vue warns once per row per render.**

`:79` puts `<Tooltip>` — a component — under `<TransitionGroup name="coeff-list">`. Resolve its root
chain: `ui/tooltip/Tooltip.vue:26-37` renders `<GlassTooltip>` → glass-ui 4's `Tooltip` is reka's
`TooltipRoot` → `TooltipRoot.vue` renders `<PopperRoot><slot/></PopperRoot>` → `PopperRoot.vue`
renders bare `<slot/>`. The slot holds **two** nodes (`TooltipTrigger`, `TooltipContent`), so the
shim's render root is a **Fragment**.

Two independent Vue mechanisms then fail, both verified in the installed 3.5.38 dist:

1. `renderComponentRoot` (`@vue/runtime-core/dist/runtime-core.esm-bundler.js:4672-4677`) guards
   `isElementRoot(root)` — defined at `:4750-4752` as `shapeFlag & (6|1) || type === Comment`. A
   Fragment satisfies neither, so it emits
   **`Component inside <Transition> renders non-element root node that cannot be animated.`** —
   once per `<Tooltip>` per render, i.e. **12–40 warnings per paint** in dev.
   `UNPROVEN-NEEDS-LIVE (SS-13)` for the exact console count; the code path is determinate.
2. `TransitionGroupImpl` (`@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1457-1462`) admits a
   child to `prevChildren` only when `child.el instanceof Element`. For a Fragment-rooted component
   `vnode.el` is the fragment's anchor **Text** node, so *no* child is ever admitted; `prevChildren`
   stays empty; `onUpdated` early-returns at `:1419-1421`; `.coeff-list-move` is never applied.

So `.coeff-list-enter-active` / `-leave-active` / `-enter-from` / `-leave-to` / `-move` (`:147-163`)
— and the `A.W3.d` provenance comment at `:146` that documents them — are **inert**. The one moment
this component most needs motion is the 12→40 expansion, where 28 rows appear at once with a full
list reflow; that is precisely the moment nothing happens.

**Falsifier** — hoisting the `v-for` to the inner `<div class="coeff-row">` and nesting `<Tooltip>`
inside would give the TransitionGroup a single-element child and everything would run; the tree does
the opposite (`:80-84`). The claim also dies if `PopperRoot` had an element root — it does not
(`reka-ui/src/Popper/PopperRoot.vue`, `<template><slot /></template>`). Note Vue 3.5's `instanceof
Element` guard is what turns this into silence rather than a `getBoundingClientRect` TypeError; on
an older Vue this would have been a crash.

### **MAJOR-2 · Zero `prefers-reduced-motion` coverage — and the motion that *does* run is 500 ms of simultaneous width+color on 12–40 elements.**

The component ships no `@media (prefers-reduced-motion: reduce)` block. Nothing upstream covers it:

- `style.css:92-96` is the app's **only** reduce block and its selector is
  `[data-state="active"][role="tabpanel"]` — tab panels, nothing else.
- glass-ui 4.0.0's reduce carves are all class- or attribute-scoped to glass surfaces
  (`animations.css:239,279,369`; `transitions.css:212-221` lists `.fade-*`, `.tab-fade-*`,
  `.pane-swap-*`, `.metric-swap-*`; `drawer.css:184`; `paper.css:62`; `glass-specular-track.css:34`;
  `icon-chip.css:142`; `instrument-chassis.css:231`). None matches `.coeff-list-*` or a Tailwind
  `transition-*` utility. There is no global neutralizer.

The dead rules (MAJOR-1) are therefore moot, but **`:91` `transition-all duration-500 ease-out` is
live** — it is an inline utility on a plain `<div>`, not a Vue transition. On expand, 12→40 fills
animate `width` **and** `background-color` (BLOCKER-3) for half a second, concurrently, unguarded.

This is a **third** PRM gap the corpus does not name. `lane-frontend.md:612-624` counts 18 references
across 12 files and flags exactly two gaps — `stores/animation.ts` and `ConvergencePlot`'s rAF, both
JS clocks. This one is CSS-side and in a *shared* component consumed by two routes.

**Falsifier** — the claim dies if any ancestor ships `* { transition: none }` under reduce.
`grep -rn "prefers-reduced-motion" web/src/style.css` → one hit (`:92`), tab-panels only;
`grep -rn "prefers-reduced-motion" node_modules/@mkbabb/glass-ui/src/styles/` → 20 hits, every one
selector-scoped. It also dies if `transition-all` were somehow inert; it is a shipped Tailwind
utility on a live element.

### **MAJOR-3 · The file contradicts its own stated motion invariant on the very next screen.**

`:146` — *"A.W3.d — named properties + canonical tokens, no `transition: all`."*
`:91` — `class="h-full rounded-full transition-all duration-500 ease-out"`.

`transition-all`, 22 lines earlier, on the busiest element in the component. Two further drifts from
the same sentence: `.coeff-list-move` (`:161-163`) uses bare `ease` where all four sibling rules use
`var(--ease-standard)`; and `duration-500` at `:91` is a Tailwind literal where the scoped block
spells its durations out. Three durations govern one gesture — 500 ms (bar), 300 ms (enter/move),
200 ms (leave) — with no shared token.

**Falsifier** — dies if `transition-all` were unavoidable here. It is not: the element animates
exactly `width` and `background-color`, both nameable; `transition-[width,background-color]` is the
same character count. The invariant was authored, then violated in the same file.

### **MAJOR-4 · `variant="ghost"` does not exist on glass-ui 7's `Button`. The uplift silently downgrades this control to a filled glass pill — and the census break table has no `Button` row at all.**

`:127` passes `variant="ghost"`. glass-ui 4.0.0 supports it
(`dist/button-BNDWhAZb.js:10,50-60` — a `variant` prop whose `ghost` arm is
`bg-transparent text-foreground/70 hover:bg-foreground/8 …`). glass-ui **7.0.0 deletes the axis**:
`src/components/button/Button.vue:15-31` declares
`ButtonEmphasis = "primary" | "secondary" | "quiet" | "text"` plus `tone` and `size` —
**no `variant`**. `CHANGELOG.md:63-64` records the removal: *"`/button`: `ButtonVariants` →
`ButtonProps` / `ButtonEmphasis` / `ButtonSize`."*

The failure mode is **silent**, not loud. `Button.vue` does not set `inheritAttrs: false`, its single
root is `<Primitive>` (`:83-88`), and `Primitive.ts:57-63` spreads `attrs` onto the rendered tag — so
`variant="ghost"` lands as a meaningless literal DOM attribute while the button falls back to
`emphasis: "secondary"` (`:33-39`), which `hostClass` (`:66-73`) decorates with
`glass-wash glass-capsule` (`:69`) and `styles.css:50-54` fills with `--glass-plate-quiet` +
`backdrop-filter`. A transparent text button becomes a blurred glass capsule spanning `w-full`
(`:129`) at the foot of a dense list. Nothing typechecks red on the class attribute path.
`UNPROVEN-NEEDS-LIVE (SS-13)` whether `vue-tsc` flags the unknown prop; the render outcome is
determinate either way.

**Scope, measured repo-wide:** `grep -rn '<Button' -A3 web/src | grep 'variant="'` →
**98 literal sites** — 49 `ghost`, 26 `outline`, 12 `glass`, 4 `default`, 4 `destructive`, 1 `link`,
1 `secondary` — plus 2 dynamic bindings (`GalleryView.vue:431`, `AdminUserList.vue:502`). `ghost`
and `glass` have no 1:1 image in the four-value emphasis axis, so this is a **re-mapping, not a
rename** — a design decision per site, not a codemod.

**Corpus contradiction (by omission).** `lane-frontend.md` §5 "Rows that hit fourier-analysis TODAY"
budgets `metric-badge`, `hover-card`, `hover-popover`, `DockIconButton`, `DockDropdownTrigger`,
`ToastVariant`, `lucide-vue-next`, and the `keyframes.js`/`value.js` peer floors. It has **no
`Button` row**, yet at 98 sites this is larger than every row in the table except lucide. The break
table is incomplete; F.W1 must add it.

**Falsifier** — dies if 7.0.0 kept a `variant` alias. `grep -n "variant" glass-ui/src/components/button/Button.vue` → the string does not occur; `ls glass-ui/src/components/button/` → `Button.vue index.ts styles.css` (no `buttonVariants.ts`, which 4.0.0 had).

### **MAJOR-5 · The visible amplitude column is `toFixed(2)` while the tooltip is `toFixed(4)` — so the readout degenerates to repeated "0.00"/"0.01" exactly in the expanded view, and the significant digits live only behind the unreachable tooltip.**

`:61-63` `fmtAmplitude = v => v.toFixed(2)`, fed to `AnimatedDigit` at `:99-103`. `:112` renders
`comp.amplitude.toFixed(4)`.

Spectra decay. Square wave, |c_n| = 2/(nπ): row 12 ≈ 0.0578 → `"0.06"`; row 21 ≈ 0.0303 → `"0.03"`;
row 39 ≈ 0.0163 → `"0.02"`. For any smooth `f` the symbolic tier decays geometrically and rows past
~8 collapse to a column of identical `"0.00"`. The expanded 40-row state — the state the "Show more"
affordance exists to produce — is where the numeric column carries the *least* information, and it is
also where the color encoding is most broken (BLOCKER-3) and the bars least visible (BLOCKER-2).

This compounds BLOCKER-1 into a closed loop: 2 significant figures visible, 4 behind a
hover-only tooltip, nothing for keyboard or touch. The irony is that `AnimatedDigit` faithfully damps
a column of zeros toward zero.

**Falsifier** — dies if amplitudes were normalized to O(1). They are not: `computation.py:115` passes
raw `c.amplitude` (pixel-scale epicycle radii) and `equations.py:24` passes raw `term.amplitude`
(Fourier coefficients of arbitrary magnitude). It also dies if the format adapted to the data — e.g.
`toPrecision(3)` or a scale derived from `maxAmplitude` (already computed at `:39-41`, already used
by `formatPercent` at `:56-59`). It does not; the formatter is a constant.

### **MAJOR-6 · No loading state and no error state. The parent computes both and plumbs neither, so a recompute and a failed compute both render stale coefficients as if current.**

The props are `components` + `emptyText`, nothing else (`:24-33`). The template has exactly two
branches: populated (`:78`) and empty (`:138-140`). Three distinct realities collapse onto that one
empty line — never computed, computing, and failed.

The signals exist upstream and are dropped:
- `EquationView.vue:57` — `const loading = computed(() => computing.value || simplifying.value)`.
- `EquationView.vue:91-121` — `doCompute` sets `computing = true` and `error = null` but **does not
  clear `result.value`** before the `await`, and the `catch` does not clear it either. So while a new
  computation is in flight, and after one throws, `components` (`:59-67`) still yields the previous
  run's coefficients and `EqCoefficientsPanel` (`:213`, gated `v-if="components.length"`) keeps
  rendering them. Nothing in the spectrum says they are stale.

The visualization route is the same shape: `CoefficientsPanel.vue:10` reads
`store.epicycleData?.components ?? []` with no in-flight signal.

Layered on BLOCKER-3, this is worse than blank: after a failed recompute the user sees a fully
plausible, freshly-animated, wrong-colored spectrum for the *previous* function.

**Falsifier** — dies if a host chrome carried the state. `ConfiguratorLayer` (`CoefficientsPanel.vue:14`)
takes `label`/`sub`/`default-open` only; `CollapsibleSection` (`EqCoefficientsPanel.vue:11`) takes
`title`/`subtitle`/`default-open`. Neither receives a loading or error prop. It also dies if a
`loading`/`error` prop or slot existed on the subject; `:24-33` is the whole surface.

### **MAJOR-7 · The 300 px scroll region is keyboard-unreachable, unnamed, and has no scroll affordance — while the producer ships one, unimported, at both pins.**

`:78` — `<div v-if="topComponents.length" class="space-y-1 max-h-[300px] overflow-y-auto">`. No
`tabindex="0"`, no `role`, no `aria-label`. Chrome and Safari do not focus scrollable containers
without an explicit tabindex, so a keyboard-only user cannot scroll rows 13–40 at all — they can
press "Show more", then reach nothing it revealed. WCAG 2.1.1 again, and the same user already lost
the tooltips (BLOCKER-1).

Nor is there any signal that content continues: the list clips mid-row at exactly 300 px with a hard
edge. glass-ui ships the primitive for this at **both** pins — 4.0.0 `dist/FadingScroll-DwNnvKMs.js`,
7.0.0 export `./fading-scroll` — and it is imported zero times in `web/src`.

`max-h-[300px]` is also a magic pixel in a codebase whose root font-size is `1.125rem` below 768 px
and `1rem` at/above (`style.css:41-51`). The rows scale with the type; the window that shows them
does not, so the mobile viewport shows ~11% fewer rows than the desktop one at identical settings.

**Falsifier** — dies if the container were natively focusable (it is a bare `div`) or if the app set
a global `[tabindex]` policy on overflow regions (`grep -rn "tabindex" web/src/style.css` → none).
Firefox's opt-in focusable-scroller behavior does not rescue Chrome/Safari and is not a design answer.

---

## MINOR

**m-1 · The `v-if` is on the wrong element — a full tooltip primitive instantiates around a comment node for every series with ≤ 12 coefficients.** `:124` `<Tooltip :text="…">` is unconditional; the guard sits on the inner `<Button v-if="totalComponents > 12">` at `:126`. Below 13 coefficients a `TooltipRoot` + `PopperRoot` + portal mount with an empty trigger. reka survives it — `Slot.ts` returns the comment children when `firstNonCommentChildrenIndex === -1`, so no throw and no dev warn — but `onTriggerChange(undefined)` fires (`TooltipTrigger.vue:49-51`) and a live tooltip context is registered against nothing. *Falsifier:* moving `v-if` up one element removes it entirely; the tree keeps it down one.

**m-2 · The show-more tooltip copy is factually wrong for every series between 13 and 40 coefficients.** `:124` — `` `Show top 40 of ${totalComponents} coefficients` ``. At `totalComponents = 25` it reads **"Show top 40 of 25 coefficients"**, while the button beneath it reads "Show more (25 total)" (`:133`) and the list expands to 25 (`:37`). Three statements, one truth. *Falsifier:* `Math.min(40, totalComponents)` — the value is already in scope at `:40`.

**m-3 · `side="bottom"` makes each row tooltip occlude the ~4 rows directly beneath it — the rows a reader is comparing against.** `:83`. Rows are `text-xs` on `space-y-1` (≈16 px pitch); the tooltip body is a 4-row grid plus header, ≈60 px tall, portaled at `z-tooltip`. Reading row *k* hides rows *k+1…k+4*. In a ranked list the adjacent rows are the entire comparative context. *Falsifier:* `side="right"`/`"left"` places the panel outside the column and occludes nothing; `avoidCollisions` is on in both pins, so edge cases are already handled.

**m-4 · The same coefficient is notated two ways, 25 lines apart.** `:87` renders `+0` for the DC term (`comp.index >= 0 ? "+" : ""`, and `frequency = 0` is always present — `src/fourier_analysis/epicycles.py:82`); `:108` renders `n = 0`. `+0` is not a signed zero anyone writes. *Falsifier:* `comp.index > 0` would fix the sign and match the tooltip; the tree uses `>=`.

**m-5 · `text-admin-label` is a *label* register applied to a *data* grid, and it uppercases the authored prose.** `:110` puts `text-admin-label` on the whole tooltip grid. The utility (glass-ui 4 `src/styles/typography/semantic.css:213-220`, byte-identical at 7.0.0 `:238`) is `font-family: var(--font-mono); font-size: var(--type-admin-label); line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500` — and `scale.css:86` fixes the size at **10 px**, commented *"fixed sub-control micro"*. So (a) the sentence-case labels the author wrote — "Amplitude", "Phase", "Relative", "Re / Im" — render as AMPLITUDE / PHASE / RELATIVE / RE / IM, prose the source never states; (b) the *values* inherit caps-tracking; (c) with `line-height: 1` and `gap-y-0.5` the four data rows sit on a **12 px pitch**, the densest text in the application, in a transient overlay. A micro-label register is the wrong instrument for the payload of the component's only disclosure. *Falsifier:* `text-micro` (11 px, `line-height: 1.25`, no transform, `semantic.css:208-211`) is the neighbouring utility and carries none of the three consequences.

**m-6 · The component silently depends on the caller sorting by descending amplitude and asserts nothing.** `:39-41` takes `topComponents[0].amplitude` as the denominator for every bar width (`:93`) and for `formatPercent` (`:56-59`). Today all producers comply — `epicycles.py:54`, `spline.py:116`, `integration.py:145`, `identification.py:125` all `sort(key=amplitude, reverse=True)` — so **this is not a live defect**. It is an undocumented coupling: an index-ordered caller (the natural shape for a `−N…+N` spectrum) yields widths above 100%, silently clipped by `overflow-hidden` at `:89` so several rows read as identical full bars, plus "Relative" values above 100%. *Falsifier:* `Math.max(...map(amplitude))` costs one line and removes the coupling; the tree hardcodes index 0 with no comment.

**m-7 · The empty state is three stacked blocks for one sentence, one of which counts nothing.** `:70` (graph slot), `:72-76` (the counter row), `:138-140` (the message). The counter is **outside** the `v-if`/`v-else` pair, so the empty state always leads with an unlabeled **`0 / 0`** above "Compute to see coefficients". *Falsifier:* moving `:72-76` inside the `v-if` at `:78` costs nothing and no consumer reads the count in the empty case.

**m-8 · The count readout is an unlabeled ratio with no accessible name.** `:73-75` — `{{ topComponents.length }} / {{ totalComponents }}`. A screen reader announces "12 / 40"; a sighted reader must infer "shown of total". It also sits alone in `flex items-center justify-end` (`:72`), a full flex row plus `mb-2` — ≈24 px of vertical budget, 8% of the 300 px list — spent on five unexplained glyphs. *Falsifier:* an `aria-label` or a two-word prefix; neither is present.

**m-9 · Uplift · the tooltip's padding proportion inverts.** glass-ui 4 pads `px-3 py-1.5` — 12 px / 6 px, ratio **2.0** (`dist/TooltipProvider-B3MkB_8P.js`, the `TooltipContent` class string). glass-ui 7 pads `px-(--overlay-pad-inline)` where `--overlay-pad-inline: --spacing(2)` = 8 px, and `--overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272)` ≈ 10.2 px — ratio **0.79** (`glass-ui/src/components/tooltip/TooltipContent.vue:49`). For the 4-row grid at `:110` this is an *improvement* (block breathing where the 12 px pitch of m-5 needs it). For the single-line tooltip at `:124` it is a regression: a tall pill with pinched side padding around one short sentence. Budget both callsites separately. *Falsifier:* the two class strings, quoted above, are the whole argument.

**m-10 · Uplift · the shim's `collision-padding` is on 7.0.0's retired list and will be stripped without a signal.** `ui/tooltip/Tooltip.vue:33` passes `:collision-padding="8"`. glass-ui 7's `TooltipContent` declares only `FloatingPlacementProps` (`_shared/floating.ts:10-15`: `side`/`sideOffset`/`align`/`alignOffset`) and routes `$attrs` through `floatingContentAttrs`, whose `RETIRED_FLOATING_ATTRS` set explicitly contains both `collision-padding` and `collisionPadding` (`floating.ts:28,30`). Nuance that keeps this MINOR: `avoidCollisions` is hard-`true` at `TooltipContent.vue:43`, so collisions are still avoided — only the 8 px viewport inset is lost, and only for tooltips opening near an edge. Also note `sideOffset` 4→6 is a deliberate shim override in both pins (`Tooltip.vue:32`), not a break.

**m-11 · Uplift · this file carries two rows already adjudicated in the corpus.** `:20` `import { ChevronDown, ChevronUp } from "lucide-vue-next"` is one of the 35 sites the census routes to `@lucide/vue@^1.16.0` (`lane-frontend.md` §5). `:132` `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />` is one of the six dynamic `:is` families adjudicated TRUE as **R3-10** and carried to F.W4 (`intakes/lane-fourier-r3-r6.md:84`) — **confirmed at exactly `:132` in the live tree**, byte-for-byte as quoted. Design note: the swapped icon carries the *only* state signal for a control whose label already says "Show less" / "Show more", i.e. it is redundant reinforcement — correct, and worth preserving through the codemod rather than flattening to a single icon.

**m-12 · `spectrumColor` is duplicated verbatim across two files with no shared home.** `:46-49` and `FrequencyGraph.vue:41-44` are the same four lines with the same three magic numbers. `src/lib/colors.ts` is the established palette module (`VIZ_COLORS`, `resolveVizColors`, `hexToRgba`, `hexToRgb`) and is the obvious owner. The duplication is what allows the two callsites to drift apart on the denominator (BLOCKER-3) without anything noticing. *Falsifier:* one shared export used by both; the tree has two private copies.

---

## INFO

**i-1 · Uplift · the tooltip base font moves from fixed to fluid.** 4.0.0 sets `text-sm` (14 px). 7.0.0 sets `text-(length:--tooltip-text)`, and `glass-ui/src/styles/tokens/offsets.css:82` binds `--tooltip-text: var(--type-caption)` — a viewport `clamp()`. Only the `font-semibold` "n = N" header at `:108` is affected; the grid at `:110` sets its own size via `text-admin-label`. Net: the header/body size ratio becomes viewport-dependent. Worth a look, not a defect.

**i-2 · Uplift IMPROVEMENT · the tooltip gains a reduced-motion arm.** 4.0.0's entry is `popover-animate slide-in-from-side` with no PRM carve in the tooltip path. 7.0.0's is `glass-reveal` + `data-reveal="tooltip"` (`TooltipContent.vue:47,49,62`), and `glass-reveal` ships a PRM variant — `@keyframes glass-reveal-out-reduced` (`glass-ui/src/styles/animations.css:177`). The uplift narrows MAJOR-2 for the tooltip surface only; the row transitions and the 500 ms bar remain uncovered.

**i-3 · Uplift · everything else this file touches survives 7.0.0 unchanged.** `--ease-standard` (`glass-ui/src/styles/theme/bridges.css:356`), `fira-code` (`typography/utilities.css:81`), `text-admin-label` (`typography/semantic.css:238`, size still 10 px at `scale.css:86`), `tabular-nums`, and the `Button` `size="sm"` value (`ButtonSize = "xs"|"sm"|"md"|"lg"`). `AnimatedDigit` drops `mode` and `damping` at 7.0.0 — both declared at 4.0.0 (`dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts`, `AnimatedDigitMode` + `damping`) and absent from `glass-ui/src/components/animated-digit/AnimatedDigit.vue:37-49` — but this file passes neither. **`variant` (MAJOR-4) is the only prop-level break in the subject.**

**i-4 · The layout is a hand-built 3-column grid expressed as flex.** `:85-103` — `w-8` index / `flex-1` bar / `w-16` value, per row, with `gap-2`. Columns therefore align only because every row repeats the same literals; a `grid-cols-[2rem_1fr_4rem]` on the container states the intent once and makes the alignment structural rather than incidental. Not wrong today — noted because the tooltip grid two lines below (`:110`) already uses `grid-cols-[auto_1fr]`, so the file is of two minds about the same problem.

---

## SUPERLATIVES (L-18 runs both ways)

**S-1 · The divergence between the two routes is a SLOT, not a boolean.** `:70` `<slot name="graph" />`, with `CoefficientsPanel.vue:17-23` passing `<FrequencyGraph :max-bars="40">` and `EqCoefficientsPanel.vue:12` passing nothing. A `:show-graph` prop would have forced a static `import FrequencyGraph` into the shared component and dragged 247 lines of Canvas2D into the equation route's graph. *Falsifier applied:* `grep -n FrequencyGraph web/src/components/shared/CoefficientsSpectrum.vue` → zero hits. The equation route never learns the component exists. This is the textbook shape for extracting two ~95%-identical panels, and the docblock at `:1-12` states the reasoning rather than leaving it to be re-derived.

**S-2 · Copy is a prop with a route-appropriate default; the component owns the shape, the routes own the words.** `:28-33` declares `emptyText` with `withDefaults`, and both consumers override it correctly and differently — "Compute epicycles to see coefficients" (`CoefficientsPanel.vue:16`) vs "Compute to see coefficients" (`EqCoefficientsPanel.vue:12`). The extraction did not flatten two voices into one generic string, which is the usual casualty of de-duplication.

**S-3 · Every semantic color is a token, and the tokens are contrast-vetted upstream.** `text-muted-foreground` (`:73`, `:86`, `:102`, `:111,113,115,117`, `:129`, `:138`) and `bg-muted/50` (`:89`). `--muted-foreground` resolves to `--neutral-5 = hsl(30 22% 40%)`, whose own definition carries the receipt — `/* L 40 — muted text (warm, C≈0.043; WCAG AA: 5.21:1 vs page / 4.90:1 vs muted) */` (`glass-ui/src/styles/tokens/color-radius.css:45`). Zero hardcoded text colors in 168 lines. The discipline is real and near-total — which is exactly why BLOCKER-2 stings: the single hardcoded color in the file is the one that carries the data, and it is the one that fails. The component demonstrates the standard it then exempts its own encoding from.

**S-4 · The `AnimatedDigit` adoption is the primitive's own documented promotion path, and it is uplift-clean.** `:19`, `:99-103`. glass-ui 4's docblock describes precisely this replacement — *"promoted from speedtest's hand-wired `useAnimatedNumber(metric) → result.formatted` + `<span class="tabular-nums">…` pattern. Two-line replacement."* (`dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts`). Beyond correctness at the current pin, it is **forward-clean**: the file passes only `value`, `format` and `class`, the three props that survive 7.0.0's removal of `mode` and `damping` (i-3). Hand-wiring the composable here would have created a second uplift row and re-hosted the `tabular-nums`/`ss01`/`lnum` register locally; the shipped choice creates zero.

**S-5 · The scoped style names its properties, tokenizes its easing, and gets the enter/leave asymmetry right.** `:147-152` transitions `opacity` and `transform` individually on `var(--ease-standard)` rather than `all`, and enters in 0.3 s while leaving in 0.2 s — exit faster than entry, which is the correct direction for a list that churns. The intent recorded at `:146` is the right intent, stated in the right place, with provenance (`A.W3.d`). That the template contradicts it (MAJOR-3) and that the rules never execute (MAJOR-1) does not retract the credit for the authoring; it relocates the defect to the two places that broke it.

---

## §Z · Disposition for F.W1 / F.W4

Ordered by what a fix unblocks, not by severity alone:

1. **BLOCKER-3 + m-12 + BLOCKER-2 are one fix.** Move the ramp to `src/lib/colors.ts`, key it on the datum (`comp.index` or `amplitude/maxAmplitude`) not on `i/length`, and source it from `--viz-*` through the existing `resolveVizColors` path so it adapts per theme and clears 3:1 in both arms. One module retires three findings across two files and makes the graph and the list agree.
2. **BLOCKER-1 + MAJOR-7** are the a11y pair; `tabindex="0"` on `.coeff-row` (and dropping the `cursor: default` that denies it) plus a named, focusable scroll region. Both are prerequisites for the F.W3 `ui/tooltip` migration (R3-7a) landing as an *improvement* rather than a re-pour.
3. **MAJOR-1 + MAJOR-2 + MAJOR-3** are the motion triple; hoisting the `v-for` off `<Tooltip>` revives the transitions, at which point a PRM block becomes load-bearing rather than decorative.
4. **MAJOR-4 must enter `lane-frontend.md` §5's break table** before F.W1 sizes the uplift. 98 `variant=` sites, no 1:1 mapping for `ghost`/`glass`, and a failure mode that renders wrong rather than failing loud.
5. **MAJOR-6** wants a `state?: "idle" | "loading" | "error"` prop or a `#empty` slot — the parent already computes the signal (`EquationView.vue:57`) and already fails to clear stale data (`:91-121`).
