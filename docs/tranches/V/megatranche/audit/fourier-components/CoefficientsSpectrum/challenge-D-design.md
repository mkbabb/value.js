claude-opus-5[1m] (served model id)

# CHALLENGE — `CoefficientsSpectrum.vue` · AXIS **D** (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (168 lines)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its own falsifier. Superlatives too (L-18 runs both ways).
**Method** Static + source-derived only. No browser. Contrast figures computed from shipped token literals with the WCAG 2.x relative-luminance formula. Livable-only claims marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Read whole (read-only):** the subject; `web/src/components/ui/tooltip/Tooltip.vue` + `index.ts`; `web/src/lib/types.ts`; `web/src/style.css`; `web/src/App.vue`; `web/src/lib/colors.ts`; both consumers (`visualization/CoefficientsPanel.vue`, `equation/EqCoefficientsPanel.vue`); `equation/FrequencyGraph.vue` (the `#graph` payload); `equation/EquationView.vue`; `ui/CollapsibleSection.vue`; `visualization/BasisSelector.vue`; `stores/workspace.ts`; `e2e/visualization-ux.spec.ts`; `node_modules/@mkbabb/glass-ui@4.0.0` (`dist/TooltipProvider-*.js`, `dist/animated-digit.js`, `dist/glass-ui.css`, `dist/components/ui/button/*.d.ts`, `dist/styles/**`); `/Users/mkbabb/Programming/glass-ui` @ **7.0.0** (`src/components/{tooltip,button,animated-digit,fading-scroll,metric}/**`, `src/components/_shared/{floating,class-names}.ts`, `src/styles/**`, `MIGRATION.md`, `CHANGELOG.md`, `package.json`); `node_modules/reka-ui@2.9.10` (`dist/Tooltip/*`, `dist/Popper/PopperRoot.js`, `dist/Primitive/{Primitive,Slot}.js`); `node_modules/@vue/runtime-{core,dom}@3.5.38`; `src/fourier_analysis/{epicycles,bases_fitting,symbolic/spline}.py`, `tests/test_epicycles.py`; `api/services/computation.py`, `api/routers/equations.py`.

**Tally — 38 defects (3 BLOCKER · 12 MAJOR · 16 MINOR · 7 INFO) · 6 superlatives · 5 falsified candidates.**

> **Fold note.** A prior D-axis pass on this subject stands folded into this document — its findings are carried, not re-derived, and its distinctive ones (M-5, M-7, m-2, m-3, m-4, m-8, m-9, i-1, i-2, i-4, and S-1..S-5) are preserved verbatim in substance. **One of its claims is contradicted on direct evidence** — its `i-3`/`m-5` assertion that `text-admin-label` "survives 7.0.0 unchanged (`typography/semantic.css:238`)". It does not; the cited line does not exist. See **M-8**, which is a new uncensused uplift break the fold surfaces.

---

## §0 · Corpus fold (hitherto — cited, not re-derived)

| corpus row | status here |
|---|---|
| `intakes/lane-fourier-r3-r6.md:79` — **R3-7a** TRUE / CARRY→F.W3: "CoefficientsSpectrum 2" of the 35 Tooltip callsites | **CONFIRMED, both located**: `:80` (per-row) and `:124` (show-more). **Plus a contribution to R3-7's OPEN denominator** (`exactMountedInstanceDenominator: null`): this component's *mounted-instance* count is **1 static + N dynamic, N ∈ [0, 40]**, because `:80` sits inside `v-for="(comp, i) in topComponents"` whose length is 12 collapsed / 40 expanded (`:37-39`). Two physical callsites; up to **41 live roots**. |
| `intakes/lane-fourier-r3-r6.md:84` — **R3-10** TRUE / CARRY→F.W4: `CoefficientsSpectrum.vue:132` one of six dynamic `:is` families, dropped between two registries | **CONFIRMED at exactly `:132`**, byte-for-byte — `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. Design note at m-10. |
| `formation/fourier/lane-frontend.md:180` — subject rowed at 168 LOC, "**SHADOW candidate, §4**" | **CONFIRMED** live (168 lines; `AnimatedDigit` at `:19`/`:99`). Not contested. |
| `formation/fourier/lane-frontend.md:428` — SOFT SHADOW, "same family (spectrum/`BasisComponent`)" as `BasisCanvas` vs glass-ui `FourierField` | **CONFIRMED + NARROWED.** The *math* substrate is `BasisCanvas`'s; this file holds none. Its shadow is a **palette** — `spectrumColor` verbatim-duplicated into `FrequencyGraph.vue:41-44` (m-11). The `fourier-field` convergence is a P2 architecture call, out of axis D. |
| `lane-frontend.md:437` — `CoefficientsPanel`/`EqCoefficientsPanel` → `./metric-stack` (4.0.0) → `./metric` (7.0.0) | Not contested (the hosts, not the subject) — but see **M-6**: 7.0.0 `Metric` ships the exact `loading`/`aria-busy` contract the subject lacks. |
| `lane-frontend.md` §5 / `CENSUS-2026-08-03.md:105` — `lucide-vue-next` → `@lucide/vue`, ×35 sites | **CONFIRMED**: `:20` is one of the 35 (2 symbols). m-10. |
| `lane-frontend.md` §5 + `CENSUS-2026-08-03.md:102-104` break table (metric-badge ×7 · hover-card ×2 · hover-popover ×2 · DockIconButton ×2 · DockDropdownTrigger ×1 · ToastVariant · lucide · keyframes · value.js) | **CONTRADICTED BY OMISSION, twice.** The table has **no `Button` row** though 7.0.0 deletes `variant` outright (**M-4**), and **no typography row** though 7.0.0 deletes `text-admin-label` outright (**M-8**). Both hit this file. **Recommend a CENSUS §5 addendum.** |
| `lane-frontend.md:612-624` — PRM census: 18 refs / 12 files, 2 named gaps (`stores/animation.ts`, `ConvergencePlot` rAF); `CENSUS-2026-08-03.md:110-113` — "the two rAF clocks themselves are **ungated**" | **CONTRADICTED BY EXTENSION** — a **third**, CSS-side gap the census does not name, in this file. **M-2**. |

---

## §A · The measurement that grounds B-2

Bar fill `hsl(hue, 85%, 55%)`, `hue = (1 − i/max(total−1,1)) · 300` (`:47-49`). Surfaces (glass-ui 4.0.0 `dist/styles/tokens/color-radius.css:45,57,72,84-85`; `tokens/dark-arm.css:47`): `--background = --neutral-0 = hsl(40 30% 98%)` light; `--card = hsl(36 48% 97%)`; track `bg-muted/50` = `--muted = --neutral-1` at 50 % over the page.

WCAG relative luminance, contrast `(L₁+0.05)/(L₂+0.05)`:

```
LIGHT   page  L=0.9602    card L=0.9421    track L=0.9294   →  track : page = 1.031 : 1
  N=12  i= 0 h=300 3.26 | i= 2 h=245 7.30 | i= 5 h=164 1.44 | i= 8 h= 82 1.36 | i=11 h=  0 4.04
  N=40  i= 0 h=300 3.26 | i=12 h=208 3.08 | i=18 h=162 1.45 | i=30 h= 69 1.27 | i=36 h= 23 2.79
  →  7 of 12 collapsed bars and 24 of 40 expanded bars fall below 3:1.   worst 1.27 : 1
DARK    page  L=0.0031    track L=0.0067   →  track : page = 1.067 : 1
  →  1 of 12 and 3 of 40 below 3:1.   worst 2.59 : 1
```

**Independent cross-check against `--card`** (the surface the panel actually paints on inside `ConfiguratorLayer` / `.cartoon-card`), computed separately: `#EEEE2B` (h=60) L=0.7933 → **1.18:1**; `#EE2BEE` (h=300) L=0.2601 → **3.20:1**; `#2BEEEE` (h=180) → 1.37:1; `#2BEE2B` (h=120) → 1.49:1; `#EE2B2B` (h=0) → 3.97:1. Solving for the 3:1 threshold puts the failing band at **hue ≈ 15°–207°**. Both derivations agree to within 0.06 and on the same verdict; the choice of light surface does not move the finding.

---

## BLOCKERS

### **B-1 · The tooltip trigger is a non-focusable `<div>`. Amplitude-to-4dp, Phase, Relative and Re/Im are unreachable by keyboard and by touch — and the docblock claims the opposite.**

`:80-85`, `:165-167`; `ui/tooltip/Tooltip.vue:27-31`

The four quantitative fields at `:110-119` exist **nowhere else in the DOM**. Their only surface is `<template #content>` on a `Tooltip` whose trigger is:

```
<div class="coeff-row flex items-center gap-2 text-xs">      :85
.coeff-row { cursor: default; }                               :165-167
```

The shim passes `as-child` (`ui/tooltip/Tooltip.vue:28`). reka's `TooltipTrigger` defaults `as: "button"` **only when `asChild` is false** (`reka-ui/dist/Tooltip/TooltipTrigger.js`, props block); with `asChild` true, `Primitive` renders `Slot` (`Primitive/Primitive.js`), which merges attrs onto the child and adds **no `tabindex`** (`Primitive/Slot.js`). The trigger's `handleFocus` is wired but a bare `<div>` never receives focus, so it can never fire. `cursor: default` removes even the hint that a payload exists.

The docblock asserts the reverse: *"the bespoke `:hover` CSS tooltip lifts to the glass-ui `Tooltip` primitive … **discharging the L5 §5 A8 LOW a11y gap**"* (`:13-15`). The lift changed the mechanism and left the gap intact — the pre-lift `:hover` CSS was equally unreachable.

The producer agrees. glass-ui 7.0.0 `MIGRATION.md:792-802` gives the canonical composition and closes it: *"The trigger remains **a named native control**; Tooltip content is a terse, noninteractive description."*

**Falsifier** — *find focusability the analysis missed.* Closed six ways: (a) no `tabindex` at `:85`; (b) `Slot.js` adds none; (c) no `role`; (d) `grep -rn "coeff-row" web/src/` → only `:85`, `:165`, so no global rule supplies one; (e) the 4.0.0 `TooltipTrigger` wrapper is a pure forward (`dist/TooltipProvider-B3MkB_8P.js`, component `b`); (f) a `TooltipProvider` **is** mounted (`App.vue:23`), so the tooltip genuinely works — on hover, for pointer users, only. Touch is excluded independently: `TooltipTrigger.js` `handlePointerMove` returns early on `event.pointerType === "touch"`.

**Uplift does not cure it** — 7.0.0 `src/components/tooltip/TooltipTrigger.vue:20-25` still forwards raw attrs under `asChild` and forces `type: "button"` only in the **non**-`asChild` branch. Consumer-side fix.

WCAG 2.1.1 (A), 1.3.1 (A).

### **B-2 · 7 of 12 collapsed bars and 24 of 40 expanded bars fail WCAG 1.4.11's 3:1 non-text minimum in light mode; the track is 1.03:1 and supplies no reference frame. A theme-reactive viz palette exists in-repo and is bypassed.**

`:47-50`, `:89-97`, `:107` — measurement at §A.

The bar is the **sole graphical encoding** of amplitude; 1.4.11 (AA) governs "graphical objects required to understand the content." `spectrumColor` is theme-blind — the identical string is emitted in both arms, and the failure merely migrates (the yellow band in light, the magenta end in dark). The same hue paints the 8×8 px legend dot inside the tooltip (`:107`) over `glass-floating`, lighter still. The track itself (`bg-muted/50`, `:89`) sits at **1.03:1** against the page, so an empty bar is invisible and there is no frame against which a short bar reads as short.

**Falsifier** — four ways it could be wrong, all closed: (a) *a darker track might rescue it* — the track is a 50 %-alpha neutral **over** the page; it raises backdrop luminance, never lowers it; (b) *the app might re-map its surfaces* — `web/src/style.css` overrides only `--viz-amber` and `--section-color-5` (`:118-131`), never `--background`/`--card`/`--muted`; (c) *the choice of light surface might matter* — two independent derivations (`--background` and `--card`) agree to 0.06, §A; (d) *axe might already cover it* — `@axe-core/playwright` **is** installed and `e2e/visualization-ux.spec.ts` runs keystones, but `:120` records that the coefficients layer is **collapsed** throughout, and both hosts pass `:default-open="false"` (`CoefficientsPanel.vue:13`, `EqCoefficientsPanel.vue:13`). **axe has never seen this DOM.** That is *why* the defect survived, not evidence against it.

**The house already knows this shape.** `style.css:118-131` darkens `--viz-amber` from ≈3.54:1 to ≈4.60:1 as an explicit "axe contrast carry." The precedent, the token vocabulary (`--viz-*`, `--section-color-*`), the resolver (`lib/colors.ts` `resolveVizColors`, re-run on theme change at `App.vue:11-18`) and the tooling all exist. `hsl(h, 85%, 55%)` bypasses all four.

### **B-3 · Hue encodes rank-in-the-current-view, not the datum — so one coefficient wears three different colors, and two of them are stacked 8 px apart in the same panel.**

`:94`, `:107` — `spectrumColor(i, topComponents.length)`. `total` is the **slice** length, not the spectrum length.

- row `i = 5`, collapsed (`total = 12`): hue = (1 − 5/11)·300 = **163.6°** (cyan)
- row `i = 5`, expanded (`total = 40`): hue = (1 − 5/39)·300 = **261.5°** (indigo)

And `CoefficientsPanel.vue:16-22` renders `FrequencyGraph` with `:max-bars="40"` **into the `#graph` slot directly above the list**, while `FrequencyGraph.vue:41-44` holds a byte-identical copy of `spectrumColor`. So at rest, in one panel, harmonic #5 is indigo in the graph and cyan in the list. The one channel that could bind the two views actively misleads. Because `:91` declares `transition-all duration-500`, the expand toggle **cross-fades all twelve hues** while the widths animate (M-2).

**Falsifier** — *maybe rank-in-view is the intent.* Rejected on the tree's own evidence: the legend dot (`:107`) sits immediately beside `n = {{ comp.index }}` (`:108`), asserting the dot **is** that harmonic's mark; `FrequencyGraph.vue:110` labels each bar `String(comp.index)`. Both surfaces present colour as bound to `n`. *Maybe the duplication is deliberate sharing* — then it would live in `lib/colors.ts`, which exists and is already imported by `App.vue:8`. It does not (m-11).

---

## MAJOR

### **M-1 · The entire motion contract is dead code. `<TransitionGroup>` cannot animate a multi-root child; all five scoped rules at `:147-163` never execute, and Vue warns once per row per render.**

`:79-122` vs `:147-163`. Resolve the child's root: `ui/tooltip/Tooltip.vue` → `GlassTooltip` (`dist/TooltipProvider-B3MkB_8P.js`, component `v`) → reka `TooltipRoot` → `PopperRoot`, whose entire render is `renderSlot(_ctx.$slots, "default")` (`reka-ui/dist/Popper/PopperRoot.js`). **The root vnode is a Fragment** with two children (trigger + portal), so `vnode.el` is the fragment's start **Text** anchor.

Two consequences, both verified in the **installed** `vue@3.5.38`:

1. `runtime-dom.cjs.js:1399` — `if (child.el && child.el instanceof Element && !child.el[vShowHidden])`. A Text anchor is not an `Element`; the child is **skipped**: no `prevChildren.push`, no `setTransitionHooks`, no `positionMap.set` (`:1401-1411`). `.coeff-list-move` (`:161-163`) can never run.
2. `runtime-core.cjs.js:4650-4656` — `if (vnode.transition) { if (!isElementRoot(root)) warn("Component inside <Transition> renders non-element root node that cannot be animated."); setTransitionHooks(root, vnode.transition) }`, with `isElementRoot = vnode.shapeFlag & (6|1) || vnode.type === Comment` (`:4728-4730`). A Fragment matches none. Hooks are pinned to a Fragment the renderer never consults, and **dev emits one warning per rendered row** — up to 40.

So `:147-163` (17 lines, ~29 % of the `<style>` block) is unreachable. Rows appear and vanish instantly.

**This is a regression introduced by the B.W2.c lift itself.** Before it, the `TransitionGroup` child was the plain `<div class="coeff-row">` — a single element, transitions live. Wrapping each row in a multi-root primitive silently killed the animation the same commit's comment (`:146`) took care to keep on-token.

**Falsifier** — (a) *maybe reka's `Slot` collapses to one element* — it does, but only **inside** `TooltipTrigger`; the Fragment above it is `PopperRoot`'s and is untouched. (b) *maybe Vue unwraps a single-child fragment* — `filterSingleRoot` requires exactly one non-comment child; this has two. (c) *maybe `TooltipContent` renders nothing when closed* — it renders a `Presence`/portal **component vnode**, a real child regardless of state. Survives. The exact console text/count is `UNPROVEN-NEEDS-LIVE (SS-13)`; the static consequence is proven from installed source.

### **M-2 · Zero `prefers-reduced-motion` coverage — and the motion that *does* run is 500 ms of simultaneous width + colour on 12–40 elements.**

`:91`, `:147-163`. Nothing upstream supplies a carve:

- `web/src/style.css:92-96` — the only app-level `reduce` block, scoped to `[data-state="active"][role="tabpanel"]`.
- glass-ui 4.0.0's carves are all class-scoped, never universal: `dist/styles/animations.css:239` (`@keyframes scrim-breath`), `:279` (`[data-scrim-animation]`), `:369` (`.glass-top-layer[popover]`, `dialog.glass-top-layer`), `dist/styles/transitions.css:212-218` (named `.fade-*`/`.tab-fade-*`/`.pane-swap-*`). No `*` reset exists.

Meanwhile **eight** siblings ship the guard — including this component's own direct parent on the equation route: `CollapsibleSection.vue:66-71`, `ContourSettings.vue:370`, `AnimationControls.vue:178`, `GalleryMarquee.vue:129`, `GalleryCard.vue:304`, `ConvergencePlot.vue:405`, `DarkModeToggle.vue:104`, `VisualizationView.vue:310`. This file is the outlier.

**Falsifier** — *M-1 says the transitions are dead, so is this moot?* No, and the distinction is load-bearing: M-1 kills only the `TransitionGroup`-driven `.coeff-list-*` classes. `:91` is a plain CSS transition on a plain `<div>` inside the row — untouched by M-1 and **fully live**, and it covers `background-color` too because `:style` rewrites it on the same tick (B-3). `.coeff-list-*` is dead-and-ungated; `:91` is live-and-ungated.

### **M-3 · The file contradicts its own stated motion invariant on the very next screen — and half-breaks it inside its own block.**

`:146` — `/* A.W3.d — named properties + canonical tokens, no `transition: all`. */`

- `:91` — `class="… transition-all duration-500 ease-out"`. Tailwind v4 `transition-all` compiles to `transition-property: all`. The covenant's exact prohibition, in the same file, in the template.
- `:162` — `.coeff-list-move { transition: transform 0.3s ease; }`. Bare CSS `ease`, not `var(--ease-standard)` like its four siblings (`:148`, `:151`).
- `:148/:151/:162` — literal `0.3s`/`0.2s` where glass-ui ships those exact values as `--duration-normal: 0.3s` / `--duration-fast: 0.2s` (`dist/styles/tokens/scheme-motion.css:67-68`). "Canonical tokens" honoured for easing, abandoned for duration.

A covenant comment the file violates is worse than none: it certifies a property a reviewer will not re-check. **Falsifier** — *maybe `all` is needed for a dynamic property set.* Exactly `width` and `background-color` change (`:92-96`); the named form is a drop-in.

### **M-4 · `variant="ghost"` does not exist on glass-ui 7's `Button`. The uplift silently downgrades this control to a filled pill — and the census break table has no `Button` row at all.**

`:125-129`.

- **4.0.0** — `dist/components/ui/button/Button.vue.d.ts`: `interface Props { variant?: ButtonVariants['variant']; size?: …}`; `dist/components/ui/button/index.d.ts:4` enumerates `"link" | "default" | "solid" | … | "ghost" | "glass" | …`. Valid today.
- **7.0.0** — `glass-ui/src/components/button/Button.vue:15-31`: `ButtonEmphasis = "primary"|"secondary"|"quiet"|"text"`, `ButtonSize = Extract<Size,"xs"|"sm"|"md"|"lg">`, `ButtonProps { emphasis?; tone?; size?; iconOnly?; loading?; … }` with `withDefaults(… { emphasis: "secondary", tone: "neutral", size: "md" })` (`:33-40`). **No `variant`.** `size="sm"` survives.

Post-uplift the prop falls through as a literal `variant="ghost"` HTML attribute and the button renders at the default `emphasis: "secondary"` — a full-width **solid secondary** control at the foot of a readout panel, the loudest element on the surface. Nearest equivalent: `emphasis="quiet"`.

**Falsifier** — *maybe `variant` is a retained alias*: `grep -n "variant" glass-ui/src/components/button/Button.vue` → the string does not appear; `MIGRATION.md` documents the orthogonal `tone` axis (`:1183-1204`) and the `solid` retirement (`:1348-1352`), never a `variant` survival. *Maybe vue-tsc catches it* — Vue permits arbitrary fallthrough attributes on a component with an element root, so a hard typecheck failure is **`UNPROVEN-NEEDS-LIVE (SS-13)`**; the visual regression is confirmed from the props table. Fleet scale: `grep -rl 'variant="ghost"' web/src/` → **22 files** (an upper bound on the Button-only denominator — Badge/Toggle also take `variant` at 4.0.0 — which F.W1 must compute). The file-local claim at `:127` is exact.

### **M-5 · The visible amplitude column is `toFixed(2)` while the tooltip is `toFixed(4)` — so the readout degenerates to repeated "0.00"/"0.01" exactly in the expanded view, and the significant digits live only behind the unreachable tooltip.**

`:61-63` `fmtAmplitude = v => v.toFixed(2)`, fed to `AnimatedDigit` at `:99-103`; `:112` renders `comp.amplitude.toFixed(4)`.

Spectra decay. Square wave, |c_n| = 2/(nπ): row 12 ≈ 0.0578 → `"0.06"`; row 21 ≈ 0.0303 → `"0.03"`; row 39 ≈ 0.0163 → `"0.02"`. For any smooth `f` the symbolic tier decays geometrically and rows past ~8 collapse to a column of identical `"0.00"`. **The expanded 40-row state — the state "Show more" exists to produce — is where the numeric column carries the least information**, and it is simultaneously where the colour encoding is most broken (B-3) and the bars least visible (B-2). Compounded with B-1 this closes a loop: 2 significant figures visible, 4 behind a hover-only tooltip, nothing for keyboard or touch. `AnimatedDigit` faithfully damps a column of zeros toward zero.

**Falsifier** — dies if amplitudes were normalised to O(1). They are not: `api/services/computation.py:115` passes raw `c.amplitude` (pixel-scale epicycle radii), `api/routers/equations.py:24` passes raw `term.amplitude`. It also dies if the format adapted to the data — `toPrecision(3)`, or a scale derived from `maxAmplitude`, which is already computed at `:43-45` and already used by `formatPercent` at `:56-59`. The formatter is a constant.

### **M-6 · No loading state and no error state. Both routes compute them and neither plumbs them, so a recompute and a failed compute both render stale coefficients as if current.**

The props are `components` + `emptyText`, nothing else (`:24-33`). The template has two branches: populated (`:78`) and empty (`:138-140`). **Four** distinct realities collapse onto them — never computed, computing, failed, and stale-after-failure.

Both routes drop the signal, differently:

- **Equation route.** `EquationView.vue:57` `const loading = computed(() => computing.value || simplifying.value)`. `:91-121` `doCompute` sets `computing = true` and `error = null` but **does not clear `result.value`** before the `await`, and the `catch` does not clear it either. So during a new computation, and after one throws, `components` still yields the previous run's coefficients and `EqCoefficientsPanel` (`:213`, gated `v-if="components.length"`) keeps rendering them. Nothing says they are stale.
- **Visualization route.** `stores/workspace.ts` declares `const loading = ref(false)` (`:49`) and `const error = ref<string|null>(null)` (`:51`), sets `error.value = e.message ?? "Epicycle computation failed"` (`:303`), and exports both (`:440`, `:442`). `CoefficientsPanel.vue:10` reads `store.epicycleData?.components ?? []` and **neither**. A failed first compute therefore renders *"Compute epicycles to see coefficients"* — instructing the user to perform the action that just failed, and suppressing the real error.

Layered on B-3, the stale case is worse than blank: after a failed recompute the user sees a plausible, freshly-animated, **wrong-coloured** spectrum for the previous function.

**Falsifier** — dies if a host chrome carried the state. `ConfiguratorLayer` (`CoefficientsPanel.vue:13`) takes `label`/`sub`/`default-open`; `CollapsibleSection` (`EqCoefficientsPanel.vue:13`) takes `title`/`subtitle`/`default-open`. Neither receives a loading or error prop. It also dies if a `loading`/`error` prop or `#empty` slot existed on the subject; `:24-33` is the whole surface. **Producer note**: 7.0.0's `Metric` family ships this exact contract — *"`loading` takes precedence, masks the value with a stable ellipsis, and marks the owning readout `aria-busy`"* (`glass-ui/src/components/metric/README.md`) — so F.W1 + the `lane-frontend.md:437` host re-home can discharge M-6 in one motion.

### **M-7 · The 300 px scroll region is keyboard-unreachable, unnamed, and has no scroll affordance — while the producer ships one, unimported, at both pins.**

`:78` — `<div v-if="topComponents.length" class="space-y-1 max-h-[300px] overflow-y-auto">`. No `tabindex="0"`, no `role`, no `aria-label`. Chrome and Safari do not focus scrollable containers without an explicit tabindex, so a keyboard-only user cannot scroll rows 13–40 at all — they can press "Show more" and then reach nothing it revealed. WCAG 2.1.1 again, and that same user has already lost the tooltips (B-1).

Nor is there any signal that content continues: the list clips mid-row at exactly 300 px with a hard edge. glass-ui ships the primitive at **both** pins — 4.0.0 `dist/FadingScroll-DwNnvKMs.js`, 7.0.0 export `./fading-scroll` — with **zero imports in `web/src`**. Its README is a direct match: *"`<FadingScroll axis="y" class="flex-1 min-h-0 scrollbar-thin">` … the root IS the scroll port … Unnamed ports remain ordinary focusable scroll containers"* (`glass-ui/src/components/fading-scroll/README.md`).

`max-h-[300px]` is also a magic pixel in a codebase whose root font-size is `1.125rem` below 768 px and `1rem` at/above (`style.css:39-49`). Rows scale with the type; the window that shows them does not, so mobile shows ~11 % fewer rows at identical settings. There is no `overscroll-behavior` either, and the port nests inside `<main class="… overflow-y-auto">` (`App.vue:26`), so momentum chains to the page (`UNPROVEN-NEEDS-LIVE (SS-13)`).

**Falsifier** — dies if the container were natively focusable (bare `div`) or if a global policy existed (`grep -rn "tabindex" web/src/style.css` → none). Firefox's opt-in focusable-scroller behaviour does not rescue Chrome/Safari and is not a design answer.

### **M-8 · `text-admin-label` is DELETED at glass-ui 7.0.0. The tooltip's entire data grid loses its type register silently — a second uncensused uplift break. (This CORRECTS the prior pass's `i-3`/`m-5`.)**

`:110` — `<div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-admin-label">`

- **4.0.0 — present.** `dist/styles/typography/semantic.css:213-220`: `@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label); line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500 }`, with `--type-admin-label: 0.625rem` at `dist/styles/typography/scale.css:86`.
- **7.0.0 — absent.** `glass-ui/src/styles/typography/semantic.css` is **236 lines long** (the prior pass cites `:238`, which does not exist). The `MICRO / ADMIN LABEL — Fira Code` section header survives at `:230-232`, but beneath it stands **only** `@utility text-micro` (`:233-236`) — the `text-admin-label` block is gone. `scale.css` retains `--type-micro: 0.6875rem` and has **no** `--type-admin-label`. An exhaustive `grep -rn "admin-label" glass-ui/src/ glass-ui/dist/` returns exactly **two** hits, both the same stale member of a class-*conflict* regex (`src/components/_shared/class-names.ts:84`, `dist/class-names-Cpy5eaBk.js:15`) — a resolver list that emits no CSS. `MIGRATION.md` does not mention it.

Under Tailwind v4 an undefined `@utility` emits **nothing**. Post-uplift the grid inherits `TooltipContent`'s own base size instead — 4.0.0's content class string is `"z-tooltip overflow-hidden rounded-tooltip border glass-floating px-3 py-1.5 **text-sm** text-popover-foreground popover-animate slide-in-from-side"` (`dist/TooltipProvider-B3MkB_8P.js`, component `y`), and 7.0.0 replaces it with the fluid `--tooltip-text` (i-1). Net: **10 px → ~14 px (+40 %), mono → the ambient face, uppercase → sentence case**, and the tooltip re-flows. Silent — no typecheck, no lint, no runtime warning.

Fourier-wide the class appears at **7 sites / 4 files**: `AdminFlaggedPanel.vue:176,180,189` · `AdminUserList.vue:376,379` · `FrequencyGraph.vue:200` · `CoefficientsSpectrum.vue:110`.

**Falsifier** — *maybe it moved.* Closed by the exhaustive grep above over **both** `src/` and the built `dist/`. *Maybe the token survives so a hand-rolled rule would still work* — `grep -rn -- "--type-admin-label" glass-ui/src/styles/` → empty; the token is gone too. *Maybe I mis-read a partial file* — `wc -l` on the 7.0.0 file is 236, and the ladder reads `text-body:207 · text-small:215 · text-caption:222 · text-micro:233`, contiguous. **Successor**: `text-mono-micro` (`glass-ui/src/styles/typography/utilities.css:62-67` — mono + `--type-micro` 11 px + 1.25 leading, **no uppercase**), which simultaneously discharges m-5.

**Not in the census break surface** (`CENSUS-2026-08-03.md:102-104`). **Recommend a §5 addendum alongside M-4.**

### **M-9 · The expand control is buried inside the scroll port it fills — a one-way door.**

`:78` encloses `:124-135`. Collapsed, 12 rows ≈ 240 px and "Show more" is visible at the foot of a 300 px port. Expanded, 40 rows ≈ 800 px push "Show less" **~500 px below the fold of its own container**. The control that produced the state is unreachable without scrolling past everything it produced. There is no second exit: no header toggle, no keyboard escape (M-7 removes even scrolling for keyboard users), no sticky footer.

**Falsifier** — *maybe the container grows instead of scrolling.* `max-h-[300px]` is a hard cap on the same element as `overflow-y-auto`; row height is fixed by `h-3` + `text-xs` + `space-y-1`. Even at the most generous row estimate the 40-row body exceeds 300 px by ~2.5×. **Fix**: hoist the toggle to a sibling of `:78`, or `position: sticky; bottom: 0` it inside.

### **M-10 · The visible button label promises the whole spectrum and delivers 40; the only honest sentence is hidden behind a 400 ms hover.**

`:133` — `` {{ expanded ? "Show less" : `Show more (${totalComponents} total)` }} ``
`:124` — `` :text="… : `Show top 40 of ${totalComponents} coefficients`" ``

At N = 500 the visible label reads **"Show more (501 total)"** and yields 40 rows. The tooltip carries the truthful sentence — but that sentence is gated behind `delayDuration: 400` (`App.vue:23`) and, per B-1's mechanism, is unavailable to keyboard and touch entirely. The design put the accurate copy in the least reachable place on the control. (See also m-2: for 13 ≤ N ≤ 40 the tooltip is itself false, so **all three** statements about this control can be wrong at once.)

**Falsifier** — *maybe `(N total)` reads as context, not a promise.* Against: the collapsed readout already supplies that context two lines up (`:74`, `12 / 501`), so the parenthetical is redundant *unless* read as the yield; and the paired "Show **less**" frames "Show more" as "show the rest." **Fix**: `Show 40 of 501` / `Show top 12`, at which point the `:124` tooltip becomes redundant and can go.

### **M-11 · A 40-row ceiling against a product maximum of 501 components — no filter, no virtualisation, no third step.**

`:37-39` caps at 40; `:126` gates the control at >12. The product reaches **N = 500** — `BasisSelector.vue:172` `:max="500"`, clamped at `:30` and `:165` with `Math.min(500, …)` — so `props.components.length` reaches 501. Expanded, the readout shows **8 %** of the spectrum; 461 coefficients have no surface at all. `FrequencyGraph` does not compensate: `CoefficientsPanel.vue:19` pins it to `:max-bars="40"`, below even its own default of 60 (`FrequencyGraph.vue:11`). The binary 12↔40 is sized for the *default* N = 50 (`BasisSelector.vue:29,75`), where 40 covers 80 % and the design reads well; it was never re-proportioned for the range the product exposes.

**Falsifier** — *maybe the tail is uninteresting because components are amplitude-sorted.* Partly true (m-6) and it justifies *a* cap — but not one that makes the tail unreachable while the button advertises "(501 total)" (M-10), not one where the visible column has already degenerated to `"0.00"` (M-5), and not one with no escape hatch.

### **M-12 · A three-column data table rendered as unlabelled `div`s — no table, list, meter, or live semantics anywhere.**

`:72-76`, `:78-98`, `:138-140`.

- **No table or list semantics.** `TransitionGroup` renders a Fragment (no `tag`, `:79`); rows are `div`s (`:85`). No `role="list"`/`listitem`, no `<table>`, no column headers.
- **No accessible name on the readout.** `:73-75` emits bare `{{ topComponents.length }} / {{ totalComponents }}` → announced as *"12 / 501"* with no referent. No `aria-label`, no visible label. It also occupies a full flex row plus `mb-2` (`:72`) — ≈24 px, 8 % of the 300 px list — for five unexplained glyphs.
- **No value semantics on the bar.** `:90-97` is a `div` whose inline `width` **is** the datum. No `role="meter"`, no `aria-valuenow`/`-valuemin`/`-valuemax`/`-valuetext`.
- **No live region.** `:138` is a plain `<p>`; when a compute lands, nothing is announced.

Linearised screen-reader output for the default view is `"12 / 501  +0 1.00  +1 0.53  -1 0.53 …"` — a digit stream with no column meaning. Combined with B-1 (4 dp, phase and Re/Im hover-only) and M-5 (the visible column degenerates to `"0.00"`), a non-sighted user's ceiling on this instrument is a **2-significant-figure unlabelled sequence**.

**Falsifier** — *maybe glass-ui supplies semantics through `AnimatedDigit`.* It does not: `dist/animated-digit.js` renders one `<span class="animated-digit tabular-nums …" style="--digit-count:…" data-is-animating="…">`, no ARIA. *Maybe `ConfiguratorLayer` labels it* — it names the **section** ("Coefficients", `CoefficientsPanel.vue:13`), not the columns. WCAG 1.3.1 (A).

---

## MINOR

**m-1 · The `v-if` is on the wrong element — a full tooltip primitive instantiates around a comment node for every series with ≤ 12 coefficients.** `:124` `<Tooltip :text="…">` is unconditional; the guard sits on the inner `<Button v-if="totalComponents > 12">` at `:126`. Below 13 coefficients a `TooltipRoot` + `PopperRoot` + portal mount with an empty trigger. reka survives it — `Primitive/Slot.js` returns the comment children when `firstNonCommentChildrenIndex === -1`, so no throw and no dev warn — but `onTriggerChange(undefined)` fires (`TooltipTrigger.js`, `onMounted`) and a live tooltip context registers against nothing. *Falsifier:* moving `v-if` up one element removes it entirely; the tree keeps it down one.

**m-2 · The show-more tooltip copy is factually wrong for every series between 13 and 40 coefficients.** `:124` — `` `Show top 40 of ${totalComponents} coefficients` ``. At `totalComponents = 25` it reads **"Show top 40 of 25 coefficients"**, while the button beneath reads "Show more (25 total)" (`:133`) and the list expands to 25 (`:37`). Three statements, one truth. *Falsifier:* `Math.min(40, totalComponents)` — already in scope at `:41`.

**m-3 · `side="bottom"` makes each row tooltip occlude the ~4 rows directly beneath it — the rows a reader is comparing against.** `:83`. Rows are `text-xs` on `space-y-1` (≈16 px pitch); the tooltip body is a 4-row grid plus header, ≈60 px tall, portaled at `z-tooltip`. Reading row *k* hides rows *k+1…k+4*. In a ranked list the adjacent rows are the entire comparative context. *Falsifier:* `side="right"`/`"left"` places the panel outside the column and occludes nothing; `avoidCollisions` is on at both pins, so edge cases are already handled.

**m-4 · The same coefficient is notated two ways, 21 lines apart.** `:87` renders `+0` for the DC term (`comp.index >= 0 ? "+" : ""`, and index 0 is always present — `src/fourier_analysis/epicycles.py:82`); `:108` renders `n = 0`. `+0` is not a signed zero anyone writes. *Falsifier:* `comp.index > 0` fixes the sign and matches the tooltip; the tree uses `>=`.

**m-5 · `text-admin-label` is a *label* register applied to a *data* grid, and it uppercases the authored prose.** `:110`. The 4.0.0 utility is `font-family: var(--font-mono); font-size: var(--type-admin-label); line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500` (`dist/styles/typography/semantic.css:213-220`), with the size fixed at **10 px** and commented *"fixed sub-control micro (NOT fluid)"* (`scale.css:86`). So (a) the sentence-case labels the author wrote — "Amplitude", "Phase", "Relative", "Re / Im" — render as AMPLITUDE / PHASE / RELATIVE / RE / IM, prose the source never states; (b) `text-transform` inherits, so the **values** take caps-tracking too; (c) with `line-height: 1` and `gap-y-0.5` the four data rows sit on a **12 px pitch**, the densest text in the application, in a transient overlay — 2 px below the `font-semibold` header at the ambient `text-sm` (`:108`), a 14→10 px cliff inside one 8-line surface. A micro-label register is the wrong instrument for the payload of the component's only disclosure. *Falsifier:* `text-mono-micro` (11 px, `line-height: 1.25`, no transform, `utilities.css:50-55` at 4.0.0 / `:62-67` at 7.0.0) is the neighbouring utility and carries none of the three consequences — **and survives the uplift, which `text-admin-label` does not (M-8).**

**m-6 · The component silently depends on the caller sorting by descending amplitude and asserts nothing.** `:43-45` takes `topComponents[0].amplitude` as the denominator for every bar width (`:93`) and for `formatPercent` (`:56-59`). Today all producers comply — `epicycles.py:54`, `bases_fitting.py:78,160`, `symbolic/spline.py:116` all `sort(key=amplitude, reverse=True)`, and it is guarded upstream by `tests/test_epicycles.py:46-50` (`assert amplitudes == sorted(amplitudes, reverse=True)`) — so **this is not a live defect**. It is an undocumented coupling: an index-ordered caller (the natural shape for a −N…+N spectrum, and trivially constructible on the equation route where `EqCoefficientsPanel.vue:6-8` accepts a bare `BasisComponent[]`) yields widths above 100 %, silently clipped by `overflow-hidden` at `:89` so several rows read as identical full bars, plus "Relative" values above 100 %. *Falsifier:* `Math.max(...map(amplitude))` costs one line; the tree hardcodes index 0 with no comment.

**m-7 · The empty state leads with an unlabelled `0 / 0`.** `:72-76` sits **outside** the `v-if`/`v-else` pair at `:78`/`:138`, so the empty branch always reads `0 / 0` above "Compute to see coefficients". A zero-over-zero fraction next to an instruction reads as a failed result. *Falsifier:* moving `:72-76` inside `:78` costs nothing; no consumer reads the count in the empty case.

**m-8 · Uplift · the tooltip's padding proportion inverts.** glass-ui 4 pads `px-3 py-1.5` — 12 px / 6 px, ratio **2.0** (`dist/TooltipProvider-B3MkB_8P.js`, the `TooltipContent` class string). glass-ui 7 pads `px-(--overlay-pad-inline)` where `--overlay-pad-inline: --spacing(2)` = 8 px and `--overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272)` ≈ 10.2 px — ratio **0.79** (`glass-ui/src/components/tooltip/TooltipContent.vue:49`). For the 4-row grid at `:110` this is an **improvement** (block breathing where m-5's 12 px pitch needs it). For the single-line tooltip at `:124` it is a regression: a tall pill with pinched side padding around one short sentence. Budget both callsites separately.

**m-9 · Uplift · the shim's `collision-padding` is on 7.0.0's retired list and will be stripped without a signal.** `ui/tooltip/Tooltip.vue:33` passes `:collision-padding="8"`. glass-ui 7's `TooltipContent` declares only `FloatingPlacementProps` (`_shared/floating.ts:10-15`: `side`/`sideOffset`/`align`/`alignOffset`) and routes `$attrs` through `floatingContentAttrs`, whose `RETIRED_FLOATING_ATTRS` set explicitly contains both `collision-padding` and `collisionPadding` (`floating.ts:28,30`). Kept MINOR because `avoidCollisions` is hard-`true` at `TooltipContent.vue:43` — collisions are still avoided; only the 8 px viewport inset is lost, and only near an edge. (`sideOffset` 4→6 is a deliberate shim override at both pins, `Tooltip.vue:32` — not a break.)

**m-10 · Uplift · two rows already adjudicated in the corpus land in this file.** `:20` `import { ChevronDown, ChevronUp } from "lucide-vue-next"` is one of the 35 sites the census routes to `@lucide/vue@^1.16.0` (`glass-ui/package.json` peerDependencies; `lane-frontend.md` §5). `:132` `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />` is one of the six dynamic `:is` families adjudicated TRUE as **R3-10** and carried to F.W4 (`intakes/lane-fourier-r3-r6.md:84`) — **confirmed at exactly `:132`, byte-for-byte**. Design note: the swapped icon carries the only *state* signal for a control whose label already says "Show less"/"Show more" — redundant reinforcement, which is correct, and worth preserving through the codemod rather than flattening to one icon.

**m-11 · `spectrumColor` is duplicated verbatim across two files with no shared home.** `:47-50` and `FrequencyGraph.vue:41-44` are the same four lines with the same three magic numbers. `src/lib/colors.ts` is the established palette module (`VIZ_COLORS`, `resolveVizColors`, `hexToRgba`, `hexToRgb`) and the obvious owner. The duplication is what allows the two callsites to drift apart on the denominator (B-3) without anything noticing. *Falsifier:* one shared export used by both; the tree has two private copies.

**m-12 · The row key couples identity to array position.** `:82` — `` :key="`${comp.index}-${i}`" ``. `comp.index` is already unique per decomposition (`lib/types.ts:1-6`; a collision would already corrupt `n = ` at `:108`), so appending `i` binds identity to slot. Any reorder — a re-fit, a basis switch via `BasisSelector` — re-keys every row, forcing teardown/mount instead of a move, and guarantees `.coeff-list-move` (`:161`) could never fire even if M-1 were fixed. *Falsifier:* drop `-${i}`.

**m-13 · `minWidth: '2px'` flattens the entire tail into one indistinguishable sliver.** `:95` — an inline magic number on an `h-3 rounded-full` bar, so the pill's border-radius exceeds its width and it renders as a dot, not a bar. Every coefficient below ~0.7 % of max collapses to the identical mark — precisely the tail the 40-row expansion exists to show (M-11) and where the numeric column has already degenerated (M-5). `FrequencyGraph.vue:47-49` solves the same problem more honestly with a fractional floor (`Math.max(val / max, 0.008)`) plus an optional `logScale`; this component has neither. *Falsifier:* a fractional floor, or log scaling, both already precedented one file away.

**m-14 · Spacing has no rhythm: six unrelated magnitudes, two arbitrary-value escapes.** `pt-1` (`:67`) · `mb-2` (`:72`) · `space-y-1` + `max-h-[300px]` (`:78`) · `gap-2` (`:85`) · `mt-2` (`:129`) · `py-3` (`:138`) · `mb-1`/`gap-x-2 gap-y-0.5` (`:106`,`:110`) · `minWidth:'2px'` (`:95`). The container opens with a 4 px top pad and no bottom counterpart; the empty branch pads 12 px vertically where the populated branch pads 4. No ratio binds row rhythm (`space-y-1`) to section rhythm (`mb-2`/`mt-2`) to port height (`max-h-[300px]`) — proportion is asserted nowhere. *Falsifier:* *maybe glass-ui defines a scale these sit on* — they are stock Tailwind steps, and the two arbitrary values are by construction off any scale.

**m-15 · Three type systems inside one 168-line component.** Stock Tailwind `text-xs` ×4 (`:73`, `:85`, `:129`, `:138`) · glass semantic `text-admin-label` ×1 (`:110`) · hand-composed `fira-code` ×7 (`:73`, `:86`, `:102`, `:112`, `:114`, `:116`, `:118`). glass-ui ships the intended vocabulary at both pins — `text-mono-caption`/`-small`/`-prose`/`-micro` (4.0.0 `dist/styles/typography/utilities.css:29-55`; 7.0.0 `src/styles/typography/utilities.css:42-67`) — each bundling family + size + tracking + leading. The file hand-assembles `fira-code text-xs` instead, so the mono voice and its size drift independently. Compounded by the root-size fork (`style.css:39-49`, `html { font-size: 1.125rem }` under 768 px), `text-xs` is 13.5 px mobile / 12 px desktop while `text-admin-label` is a fixed 10 px in both — the two micro scales cross.

**m-16 · A complex coefficient rendered as a bare slash pair.** `:117-118` — label `Re / Im`, value `{{ …[0].toFixed(3) }} / {{ …[1].toFixed(3) }}`. A negative imaginary part reads `0.123 / -0.456`, and the value's separator is the same glyph as the label's. This is an instrument that renders `n = {{ comp.index }}` (`:108`) and appends `°` to phase (`:53`) — it knows notation; `0.123 − 0.456i` costs one expression. *Falsifier:* *maybe `a / b` is a house convention* — `FrequencyGraph.vue:200` uses the same block, which makes it a shared defect (both descend from the same D7/D11 ancestor per the docblock), not a convention.

---

## INFO

**i-1 · Uplift · the tooltip base font moves from fixed to fluid.** 4.0.0 sets `text-sm` (14 px). 7.0.0 sets `text-(length:--tooltip-text)` and `glass-ui/src/styles/tokens/offsets.css:82` binds `--tooltip-text: var(--type-caption)` — a viewport `clamp()`. Post-M-8 this governs the **whole** tooltip, header and grid alike (pre-M-8 the grid set its own size).

**i-2 · Uplift IMPROVEMENT · the tooltip gains a reduced-motion arm.** 4.0.0's entry is `popover-animate slide-in-from-side` with no PRM carve in the tooltip path. 7.0.0's is `glass-reveal` + `data-reveal="tooltip"` (`TooltipContent.vue:47,49,62`), and `glass-reveal` ships a PRM variant — `@keyframes glass-reveal-out-reduced` (`glass-ui/src/styles/animations.css:177`). The uplift narrows M-2 for the tooltip surface only; the row transitions and the 500 ms bar remain uncovered.

**i-3 · Uplift · what this file touches that *does* survive 7.0.0 unchanged — corrected list.** `--ease-standard` (`glass-ui/src/styles/theme/bridges.css:356`), `fira-code` (`typography/utilities.css:81`), `tabular-nums`, and the `Button` `size="sm"` value (`ButtonSize = "xs"|"sm"|"md"|"lg"`). `AnimatedDigit` drops `mode` and `damping` at 7.0.0 — both declared at 4.0.0 (`dist/animated-digit.d.ts`, `AnimatedDigitMode` + `damping`) and absent from `glass-ui/src/components/animated-digit/AnimatedDigit.vue:37-48` — but this file passes neither, so it is unaffected. **`text-admin-label` is struck from this list** (it does **not** survive — M-8), leaving **two** prop/utility-level breaks in the subject, `variant` (M-4) and `text-admin-label` (M-8), plus the package rename (m-10).

**i-4 · The layout is a hand-built 3-column grid expressed as flex.** `:85-103` — `w-8` index / `flex-1` bar / `w-16` value, per row, with `gap-2`. Columns align only because every row repeats the same literals; `grid-cols-[2rem_1fr_4rem]` on the container states the intent once and makes alignment structural rather than incidental. Not wrong today — noted because the tooltip grid two lines below (`:110`) already uses `grid-cols-[auto_1fr]`, so the file is of two minds about the same problem.

**i-5 · `tabular-nums` at `:102` is dead — the primitive already ships it.** `dist/glass-ui.css:1` — `.animated-digit[data-v-a6ca1136]{font-feature-settings:"ss01","tnum","lnum";font-variant-numeric:tabular-nums lining-nums}`, and `AnimatedDigit`'s own render adds the `tabular-nums` class (`dist/animated-digit.js`). The primitive's docblock states it, and this file's docblock repeats it (`:12`), then hand-wires it anyway.

**i-6 · `.fira-code`'s font-feature declaration is silently defeated on the `AnimatedDigit` host.** `:102` — `.fira-code` sets `font-feature-settings: "liga","calt"` (`dist/styles/typography/utilities.css:69-72`, specificity 0-1-0); `.animated-digit[data-v-a6ca1136]` (0-2-0) sets `"ss01","tnum","lnum"` and wins wholesale, since `font-feature-settings` does not merge. Net effect on a formatted number is **nil** (`liga`/`calt` govern `->`, `!=`; digits are unaffected). Recorded because the class reads as doing more than it does, and because `.fira-code`'s `font-family` **does** apply — the two halves of one utility land differently on the same element.

**i-7 · A flex wrapper that exists to right-align one span.** `:72-76` — `<div class="flex items-center justify-end mb-2">` around a single `<span>`; `class="block text-right mb-2"` on the span is equivalent. (Fixing m-7 by moving this block inside `:78` is the better single edit.)

---

## SUPERLATIVES (L-18 runs both ways)

**S-1 · The divergence between the two routes is a SLOT, not a boolean.** `:68-70` `<slot name="graph" />`, with `CoefficientsPanel.vue:16-22` passing `<FrequencyGraph :max-bars="40">` and `EqCoefficientsPanel.vue:14` passing nothing. A `:show-graph` prop would have forced a static `import FrequencyGraph` into the shared component and dragged 247 lines of Canvas2D into the equation route's graph. *Falsifier applied:* `grep -n FrequencyGraph web/src/components/shared/CoefficientsSpectrum.vue` → **zero hits**; the equation route never learns the component exists. The props surface is `components` + `emptyText` only (`:24-33`) — no route flag, no host-identity `v-if`, no injected context. This is the textbook shape for extracting two ~95 %-identical panels, and the docblock at `:1-9` states the reasoning rather than leaving it to be re-derived.

**S-2 · Copy is a prop with a route-appropriate default; the component owns the shape, the routes own the words.** `:27-32` declares `emptyText` via `withDefaults`, and both consumers override it correctly and differently — "Compute epicycles to see coefficients" (`CoefficientsPanel.vue:15`) vs "Compute to see coefficients" (`EqCoefficientsPanel.vue:14`). The extraction did not flatten two voices into one generic string, the usual casualty of de-duplication. *Falsifier:* a second copy prop, or a host overriding by CSS — neither exists.

**S-3 · Every semantic colour is a token, and the tokens are contrast-vetted upstream.** `text-muted-foreground` (`:73`, `:86`, `:102`, `:111`, `:113`, `:115`, `:117`, `:129`, `:138`) and `bg-muted/50` (`:89`). `--muted-foreground` resolves to `--neutral-5 = hsl(30 22% 40%)`, whose definition carries its own receipt — `/* L 40 — muted text (warm, C≈0.043; WCAG AA: 5.21:1 vs page / 4.90:1 vs muted) */` (`dist/styles/tokens/color-radius.css:45`). **Zero hardcoded text colours in 168 lines.** The discipline is real and near-total — which is exactly why B-2 stings: the single hardcoded colour in the file is the one that carries the data, and it is the one that fails. The component demonstrates the standard it then exempts its own encoding from.

**S-4 · The `AnimatedDigit` adoption is the primitive's own documented promotion path, and it is uplift-clean.** `:19`, `:99-103`. glass-ui 4's docblock describes precisely this replacement — *"promoted from speedtest's hand-wired `useAnimatedNumber(metric) → result.formatted` + `<span class="tabular-nums">…` pattern. Two-line replacement."* (`dist/animated-digit.d.ts`). Beyond correctness at the current pin it is **forward-clean**: the file passes only `value`, `format` and `class`, the three props present verbatim in the 7.0.0 interface (`glass-ui/src/components/animated-digit/AnimatedDigit.vue:37-48`), avoiding 7.0.0's removal of `mode` and `damping` (i-3). Hand-wiring the composable would have created a second uplift row and re-hosted the `tabular-nums`/`ss01`/`lnum` register locally; the shipped choice creates zero. All three producer subpaths it imports — `./button`, `./animated-digit`, `./tooltip` — are **PRESENT at 7.0.0** (`glass-ui/package.json` exports), none in the removed set (`metric-badge`, `metric-stack`, `hover-card`, `hover-popover`, `icon-tooltip`, `toggle-chip`, `scrolling-text`). No import path moves.

**S-5 · The scoped style names its properties, tokenises its easing, and gets the enter/leave asymmetry right.** `:147-152` transitions `opacity` and `transform` individually on `var(--ease-standard)` rather than `all`, and enters in 0.3 s while leaving in 0.2 s — exit faster than entry, the correct direction for a list that churns. The intent recorded at `:146` is the right intent, stated in the right place, with provenance (`A.W3.d`). That the template contradicts it (M-3) and that the rules never execute (M-1) does not retract credit for the authoring; it relocates the defect to the two places that broke it.

**S-6 · The one motion surface the file DELEGATES is reduced-motion-correct.** `AnimatedDigit` (`:99-103`) damps through `useAnimatedNumber`, which constructs `SmoothProgress` with `respectReducedMotion: f.respectReducedMotion !== false` (4.0.0 `dist/useAnimatedNumber-C_3wZLx4.js`) — default **on**, and the consumer does not override it; 7.0.0 keeps the bare call (`glass-ui/src/components/animated-digit/AnimatedDigit.vue:54`). This is a superlative that **sharpens M-2 rather than softening it**: the file's delegated motion honours the preference and its two hand-rolled motions do not. The remedy is the file's own precedent.

---

## §Y · Candidates that died to their own falsifier (recorded, not counted)

| # | Candidate | Falsifier that killed it |
|---|---|---|
| F-1 | *No `TooltipProvider` ancestor* — reka's `TooltipTrigger` calls `injectTooltipProviderContext()` (`TooltipTrigger.js`), which throws without one; the local shim wraps only `Tooltip`+`Trigger`+`Content`. | **`App.vue:23`** mounts `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` around the entire `RouterView`. Provider present. |
| F-2 | *`w-8` (2 rem) clips the index column at N = 500* — `+500` / `-500`. | 4 glyphs of Fira Code at `text-xs` ≈ 0.6 em advance = 28.8 px < 32 px desktop; 32.4 px < 36 px mobile (`w-8` is root-relative and the root is 1.125 rem under 768 px, `style.css:39-49`). Max \|index\| is 500 → never 5 glyphs. Fits. |
| F-3 | *`maxAmplitude` is taken over the slice, not the array — bars normalise to the wrong maximum when collapsed.* | The array is sorted descending, so `slice[0] === array[0]` for every slice starting at 0. Mathematically identical. (The undeclared coupling is booked separately as m-6.) |
| F-4 | *`.fira-code` at `:102` kills `AnimatedDigit`'s `tnum`/`ss01`/`lnum`.* | Specificity runs the other way — the scoped `.animated-digit[data-v-a6ca1136]` (0-2-0) beats `.fira-code` (0-1-0), so the numeric features win. Only `liga`/`calt` is lost, null for digits. Downgraded to INFO (i-6). |
| F-5 | *reka's `Slot` throws when the `v-if`'d `Button` leaves the `as-child` slot empty (`:124-135`).* | `Primitive/Slot.js`: `findIndex(child => child.type !== Comment)` returning `-1` short-circuits to `return children`. No throw. Downgraded to MINOR (m-1). |

---

## §Z · Disposition for F.W1 / F.W4

Ordered by what a fix unblocks, not by severity alone:

1. **B-3 + m-11 + B-2 are one fix.** Move the ramp to `src/lib/colors.ts`, key it on the datum (`comp.index`, or `i` over `props.components.length`) not on `i/slice.length`, and source it from `--viz-*` through the existing `resolveVizColors` path so it adapts per theme and clears 3:1 in both arms. One module retires three findings across two files and makes the graph and the list agree.
2. **B-1 + M-7 + M-12** are the a11y cluster — a focusable, *named* trigger on `.coeff-row` (and dropping the `cursor: default` that denies it), a named focusable scroll region, and real table/meter/live semantics. Prerequisites for the F.W3 `ui/tooltip` migration (R3-7a) landing as an *improvement* rather than a re-pour, and for axe to see this DOM at all (B-2's falsifier (d)).
3. **M-1 + M-2 + M-3** are the motion triple — hoisting the `v-for` off `<Tooltip>` revives the transitions, at which point a PRM block becomes load-bearing rather than decorative, and `transition-all` → named properties + `--duration-*` closes the covenant.
4. **M-4 and M-8 must both enter `lane-frontend.md` §5 / `CENSUS-2026-08-03.md`'s break table** before F.W1 sizes the uplift. `variant`: ≤22 files, no 1:1 mapping for `ghost`/`glass`, fails by rendering wrong rather than loud. `text-admin-label`: 7 sites / 4 files, fails by emitting **nothing**. Neither is typecheck-visible. **This is the single highest-value output of this challenge** — the prior D-pass explicitly cleared `text-admin-label` as surviving, and the census never named either.
5. **M-6** wants a `state?: "idle" | "loading" | "error"` prop or an `#empty` slot — both routes already compute the signal (`EquationView.vue:57`; `stores/workspace.ts:49,51,303`) and the equation route already fails to clear stale data (`:91-121`). 7.0.0's `Metric` `loading`/`aria-busy` contract is the producer-side seat; pair with the `./metric-stack` → `./metric` host re-home (`lane-frontend.md:437`).
6. **M-5 + M-9 + M-10 + M-11 + m-13** are the expanded-view cluster — the state "Show more" produces is where the numbers degenerate, the bars vanish, the colours break, the control is buried, and the label was never true. Fix the label first (cheapest, `Show 40 of 501`), then the format (`toPrecision(3)` or a `maxAmplitude`-derived scale), then the ceiling.
7. Remainder as cleanup. **m-10**'s two rows ride the F.W1 codemod; **m-8**/**m-9** are uplift observations to budget, not to pre-fix.

**Open for SS-13 (live).** Vue dev-warning text and count under M-1 · scroll chaining under M-7 · post-uplift `vue-tsc` behaviour on the fallthrough `variant` under M-4 · perceived compute latency under M-6 · the tooltip re-flow magnitude under M-8.
