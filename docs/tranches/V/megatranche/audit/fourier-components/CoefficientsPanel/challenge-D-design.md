claude-opus-5[1m] (served model id)

# CHALLENGE · CoefficientsPanel · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CoefficientsPanel.vue` (26 lines).
**Pin.** `@mkbabb/glass-ui ^4.0.0` installed (`web/package.json:14`, `node_modules/@mkbabb/glass-ui/package.json` `"version": "4.0.0"`); producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method.** Static + source-derived only, read-only across three repos. No browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**. Every claim carries severity + `file:line` + its falsifier; where the falsifier *killed* my hypothesis I say so and drop or downgrade the row (§5).

**Read whole.** `CoefficientsPanel.vue` · `components/shared/CoefficientsSpectrum.vue` (168) · `components/equation/FrequencyGraph.vue` (247) · `components/ui/tooltip/Tooltip.vue` (38) · `stores/workspace.ts` · `lib/types.ts` · plus, for the render truth of the imported primitive, glass-ui 4.0.0's compiled `ConfiguratorLayer` (`dist/useConfiguratorState-kiIlun8I.js`), its scoped CSS (`dist/glass-ui.css`, `data-v-e887a77f`), `dist/styles/configurator.css`, `dist/styles/tokens/*`, and the producer 7.0.0 originals.

**Verdict.** The 26-line host is *well-factored and badly configured*. Its composition (a shared spectrum + a hoisted `#graph` slot) is genuinely good design (§4 S-1). Its **configuration** is where it fails: it wires a configurable spectrum instrument into its least useful arm, it lets the colour channel mean two different things eight pixels apart, and it consumes a store that exposes `computing` and `error` while modelling neither. **2 BLOCKER · 8 MAJOR · 11 MINOR · 5 superlatives.**

---

## §1 — BLOCKERS

### D-1 · BLOCKER — the colour ramp encodes a *different* variable in the graph than in the list, in the default state

`spectrumColor` is rank-keyed, and the rank denominator differs between the two panes this panel stacks:

- graph: `FrequencyGraph.vue:96` `const color = spectrumColor(i, n)` where `n = displayComponents.length = min(components, maxBars)` and `CoefficientsPanel.vue:20` passes **`:max-bars="40"`**;
- list: `CoefficientsSpectrum.vue:94` `spectrumColor(i, topComponents.length)` where `topComponents` is `slice(0, expanded ? 40 : 12)` (`:37-39`) and `expanded` initialises **`false`** (`:35`).

Both functions are byte-identical (`CoefficientsSpectrum.vue:47-50` ≡ `FrequencyGraph.vue:40-43`): `hue = (1 - i / max(total-1, 1)) * 300`.

So in the **default** (collapsed) state the *same* coefficient is painted twice, differently. Worked example, i = 5:
- graph hue = (1 − 5/39)·300 = **261.5°** — violet;
- list hue = (1 − 5/11)·300 = **163.6°** — green-cyan.

The tooltip swatch inherits the list ramp (`CoefficientsSpectrum.vue:107`), so hovering row 5 shows a green dot for the bar the graph directly above renders violet. A reader who uses colour to track a harmonic between the two views is *systematically* misled — and colour is the only channel that could carry that correspondence, because neither pane labels rank.

**Severity rationale.** This is the panel's whole job (make a 401-term spectrum legible) failing at the panel's own composition seam — `:max-bars="40"` is set here, in the 26 lines under review, against a default the shared child owns.

**Falsifier.** If `expanded === true` **and** `totalComponents ≤ 40`, both denominators equal `totalComponents` and the ramps agree. Also agrees when `totalComponents ≤ 12` (both denominators = total). Neither holds by default: `lib/defaults.ts:7` `n_harmonics: 200` → `min(200, n_points/2)` positive + negative + DC = **401 components** (`api/services/computation.py:109-119`, `src/fourier_analysis/series.py:45-47`). The disagreement is the shipped default, not an edge case.

### D-2 · BLOCKER — state coverage: the panel models neither `computing` nor `error`, and its empty copy fires **only** while computing

`CoefficientsPanel.vue:8-10` takes the whole store and reads exactly one field: `store.epicycleData?.components ?? []`. The store exposes `computing` (`stores/workspace.ts:50`, depth-counted at `:62-69`, exported `:441`) and `error` (`:51`, set on every failure path — `:303` `"Epicycle computation failed"`, exported `:442`). Neither is read.

Three concrete consequences:

1. **The empty state is unreachable except during compute, where its copy is wrong.** The parent mounts the panel with `v-if="store.epicycleData || store.computing"` (`VisualizationView.vue:273`). `components` is therefore `[]` only when `store.computing && !epicycleData` — i.e. while the epicycle job is in flight. In exactly that state the panel renders `CoefficientsSpectrum.vue:138-140` → **"Compute epicycles to see coefficients"** (`CoefficientsPanel.vue:15`). The one reachable rendering of the empty branch is an instruction to perform the action already in flight. There is no spinner, skeleton, or progress affordance anywhere in the subtree.
2. **The error state is "the panel disappears."** On a compute rejection `epicycleData` stays `null` and `computing` returns to `false`, so the parent's `v-if` goes false and the panel unmounts mid-`Transition name="slide-down"`. The panel silently vanishes; the only error surface in the view is `VisualizationView.vue:162` `v-else-if="store.error && !store.imageSlug"`, which is gated on there being *no* image — precisely not this case.
3. **`n_components` is discarded.** `EpicycleData.n_components` exists (`lib/types.ts:24`) and is never read; the panel recomputes `.length` in two places instead.

**Falsifier.** If a toast/global error surface caught compute failures, (2) would be cosmetic. Searched: `VisualizationView.vue` has one error branch (`:162`), gated on `!store.imageSlug`; no toast call on the epicycle path. If `epicycleData` could ever be non-null with `components: []`, (1) would have a second reachable path — it would still render the same wrong copy.

---

## §2 — MAJOR

### D-3 · MAJOR — the per-coefficient detail is pointer-only; the docblock's a11y-discharge claim is false

`CoefficientsSpectrum.vue:1-16` states the tooltip lift "discharg[es] the L5 §5 A8 LOW a11y gap." It does not.

The trigger chain: local shim `ui/tooltip/Tooltip.vue:27` `<TooltipTrigger as-child>` → glass `TooltipTrigger.vue:28-33` (producer; installed 4.0.0 is the same shape) `as="button" :as-child="asChild"` → reka `Primitive` → `Slot.ts` `cloneVNode(child, mergedProps)`. reka's `TooltipTrigger.vue:35-47` merges `focus`/`blur`/`pointermove`/`pointerleave` listeners and `aria-describedby`, but **injects no `tabindex`**. The child here is a plain `<div class="coeff-row">` (`CoefficientsSpectrum.vue:85`), and `.coeff-row { cursor: default }` (`:165-167`) confirms the authorial intent that it not read as interactive.

A `<div>` with no `tabindex` is not focusable ⇒ `handleFocus` never fires ⇒ the tooltip cannot be opened by keyboard. The tooltip body is the **sole** route to phase (`:114`), relative % (`:116`), Re/Im (`:118`) and 4-dp amplitude (`:112`) — the visible row exposes only index and a 2-dp amplitude. Keyboard and screen-reader users lose four of six data columns. WCAG 2.1.1 (Keyboard); the 1.4.13 "hoverable/dismissible/persistent" contract is also unmet on the focus arm.

**Falsifier.** If glass's `TooltipTrigger` set `tabindex="0"` under `asChild`, or if the row were a `<button>`, the claim dies. Read both: the trigger forwards `{...forwarded}` minus `as`/`reference` and adds `type: "button"` **only when `asChild` is false** (`TooltipTrigger.vue:21-25`) — under `as-child` no focusability is contributed. Secondary falsifier: if the same data appeared elsewhere in the DOM. It does not — the equation route's `EqCoefficientsPanel.vue` renders the same child with no graph, and `FrequencyGraph`'s own tooltip is likewise hover-only (`FrequencyGraph.vue:180-182`, `@mousemove`/`@mouseleave`).

### D-4 · MAJOR — under the ^4.0.0 pin the disclosure chevron **snaps**; the panel's sole state signal has dead motion

The panel is `:default-open="false"` (`CoefficientsPanel.vue:14`), so the chevron rotation is the primary open/closed signal. Under glass 4.0.0 that rotation is not animated.

- glass 4.0.0 compiled trigger: chevron carries `group-data-[state=open]:rotate-180` (`dist/useConfiguratorState-kiIlun8I.js`, ConfiguratorLayer render fn).
- glass 4.0.0 scoped CSS: `.configurator-layer-chevron[data-v-e887a77f]{transition:transform var(--duration-fast) var(--spring-snappy)}` (`dist/glass-ui.css`).
- Tailwind v4 emits `rotate-*` on the **`rotate`** property, not `transform` — verified in the installed compiler: `node_modules/tailwindcss/dist/lib.js` offset ≈58 401, `i.functional("rotate", m(...))` returning `l("rotate", …)`, and the property-order table at ≈207 102 listing `"rotate"` as a first-class property alongside `translate`/`scale`. fourier pins `tailwindcss ^4.3.1` (`web/package.json:38`).

`transition: transform` therefore covers nothing the utility writes ⇒ instant snap, while the body reveal *does* animate (`.configurator-layer-region` transitions `grid-template-rows`, same stylesheet). Result: an asymmetric disclosure — body eases open over `--duration-fast`, caret teleports.

**Provenance is the producer's own.** `glass-ui/src/styles/utilities/btn.css:55-70`: *"Configurator a scoped `transition: transform` on the WRONG property (a `transition: transform` never covers the `rotate` Tailwind v4's `rotate-*` writes, so its chevron **SNAPPED**)"*, cured at 7.0.0 by `@utility transition-disclosure { transition: rotate var(--spring-snappy-duration) var(--ease-cartoon-punch) }` and applied at `glass-ui/src/components/configurator/ConfiguratorLayer.vue:139`.

**F.W1 disposition: IMPROVES.** The uplift fixes this with zero consumer change. PRM is also handled upstream (`--ease-cartoon-punch` self-re-aliases to `--ease-standard` under reduce, per the same comment).

**Falsifier.** If Tailwind v4 emitted `transform: rotate(180deg)`, the 4.0.0 rule would work. Compiler read above says otherwise. If some app CSS re-declared the transition on `rotate` — `grep -rn "configurator-layer-chevron" web/src/` → none.

### D-5 · MAJOR — the panel instantiates a configurable instrument in its degenerate arm and leaves its interaction contract unwired

`CoefficientsPanel.vue:17-22` passes `:components` and `:max-bars="40"` and nothing else. `FrequencyGraph` declares four props and two emits (`FrequencyGraph.vue:5-18`); this is its **only** consumer in the tree (`grep -rn "FrequencyGraph" web/src --include=*.vue` → `CoefficientsPanel.vue:5,17` plus two comments). Therefore:

- **`logScale` is never `true`.** Bar heights are raw `|c_n|` (`:48`). Fourier coefficients of a resampled closed contour decay at least as O(1/n); at 40 bars the tail is ≤ a few percent of the leader, and `barFraction` floors at `Math.max(val/max, 0.008)` (`:57`) — 0.8 % of a 96 px plot ≈ **0.8 px**. The floor constant is itself the admission that the linear arm makes the tail invisible. The cure ships in the component (`logScale`) and even has an authored axis annotation for it (`:164-171`), unreached.
- **`activeIndices` is never passed** ⇒ `isActive` is always true (`:87`) ⇒ the dimming register is dead.
- **`toggle-harmonic` / `hover-harmonic` are never listened to** — yet the canvas paints `cursor-pointer` (`:179`) and implements hover glow + hit-testing (`:99-102`, `:113-127`). A pointer cursor and a hover-highlight on a surface where clicking does nothing is a **false affordance**; the user is invited to select harmonics that cannot be selected.
- **No axis toggle is offered.** The panel could expose the log/linear switch the child was built around; it exposes nothing.

**Falsifier.** If the decay were flat (white-ish spectrum) the linear arm would read fine — but the source sorts by descending amplitude (`src/fourier_analysis/epicycles.py:54`) and the leader is by construction the maximum, so the first bar is always full-height and everything after is a fraction of it; the 0.008 floor guarantees a visible-but-meaningless sliver band. If any other consumer wired the emits, "unwired contract" would be a per-callsite nit rather than a dead API — the grep says there is no other consumer.

### D-6 · MAJOR — 90 % of the spectrum is unreachable, and the affordance that hides it advertises the number it withholds

`CoefficientsSpectrum.vue:37-39` caps at 40 even when expanded; `:133` labels the control **`Show more (${totalComponents} total)`**. With the shipped default (`lib/defaults.ts:7` `n_harmonics: 200` → 401 components) the button reads *"Show more (401 total)"*, delivers 40, and then the readout reads `40 / 401` (`:74`) with no further affordance. 361 coefficients — 90 % — are unreachable through this panel, with no disclosure that a ceiling exists. The tooltip on the same control is honest (`:124` "Show top 40 of 401 coefficients") but is itself pointer-only (D-3), so the honest string is exactly the one a keyboard user cannot get.

**Falsifier.** If `n_harmonics` defaulted below 40 the ceiling would never bind. It defaults to 200, and `ContourSettings` lets the user raise it. If the graph exposed the remainder — it is capped at the same 40 (`CoefficientsPanel.vue:20`).

### D-7 · MAJOR — the graph tooltip is clipped by its own scroll container for the leading (largest) coefficients

`FrequencyGraph.vue:185-191`: the tooltip is `position: absolute`, `-translate-x-1/2`, `left: ${tooltipPos.x}px`, and it lives **inside** `div.overflow-x-auto.overflow-y-hidden` (`:172-176`) whose `.scrollbar-thin{position:relative}` (`:230-232`) is the containing block. Bar 0's centre is `startX + BAR_W/2 = (BAR_GAP + 4) + 7 = 14 px` (`:26-28`, `:82`, `:92`). The tooltip content is `whitespace-nowrap` with a two-column grid of "Amplitude / 123.4567", "Phase / −179.9°" — comfortably ≥ 100 px wide — so its left edge lands at ≈ 14 − 50 = **−36 px**. Content overflowing the *start* edge of an `overflow-x: auto` box cannot be scrolled to (there is no negative scroll position), so the left half of the tooltip for the largest one or two harmonics is unreachable. `z-[var(--z-controls)]` (`:187`) cannot help — z-index does not escape an overflow clip.

**Severity rationale.** The clipped rows are the *most important* ones (sorted descending by amplitude, `epicycles.py:54`).

**Falsifier.** If the scroller had left padding ≥ half the tooltip width, or if the tooltip were portaled, this dies. It has neither: the canvas is `display:block` flush at x=0 and the tooltip is an in-flow sibling. Exact clipped width is content-dependent → the *existence* of the clip is static-derivable; the exact pixel count is **UNPROVEN-NEEDS-LIVE (SS-13)**. (`--z-controls` itself is defined — `glass-ui/dist/styles/tokens/scheme-motion.css:336` `--z-controls: 20` — so the token is not the fault.)

### D-8 · MAJOR — the spectrum ramp bypasses the repo's own theme-aware viz palette; light-mode non-text contrast fails in the yellow band

fourier maintains a token-backed, theme-reactive visualization palette: `lib/colors.ts:89-95` `resolveVizColors()` reading `--viz-fourier/-chebyshev/-legendre/-amber/-green`, re-run on dark-mode flip by a `MutationObserver` in `App.vue:11-17`, with a hand-authored light-mode WCAG darken for `--viz-amber` (`style.css:113-120`, `hsl(35 70% 42%)` → `hsl(35 76% 35%)`). The spectrum ramp uses **none** of it: `hsl(${hue}, 85%, 55%)` hard-coded in two places (`CoefficientsSpectrum.vue:47-50`, `FrequencyGraph.vue:40-43`), theme-invariant, token-free.

Computed consequence in light mode. Page surface `--background = --neutral-0 = hsl(40 30% 98%)` (`glass-ui/dist/styles/tokens/light-dark.css:83`), relative luminance ≈ **0.960**. The bar track is `bg-muted/50` over it (`CoefficientsSpectrum.vue:89`), so the effective backdrop is ≈ 0.93–0.96. Ramp entries in the 55°–110° band — with 12 rows that is i = 8 (hue 81.8°) and i = 9 (hue 54.5°) — sit at L ≈ 0.79 (worked for `hsl(60 85% 55%)` → sRGB (0.933, 0.933, 0.168) → L = 0.793). Contrast ≈ (0.96+0.05)/(0.793+0.05) ≈ **1.20 : 1**, against the 3 : 1 floor of WCAG 1.4.11 for graphical objects. In dark mode (`--neutral-0 = hsl(24 9% 4%)`, `tokens/dark-arm.css:42`) the same swatches pass comfortably — this is a **light-mode-only** failure, exactly the class of defect the `--viz-amber` carry was authored to fix, on a surface the carry does not reach.

This also breaches fourier's own `inv-33` ("all runtime colour derives from value.js" — CENSUS §3c), which the megatranche already names as the W.L5 design-surface hook.

**Falsifier (stated honestly).** WCAG 1.4.11 exempts graphics whose information is available in text; the amplitude *is* also rendered numerically in the same row (`:99-103`). An auditor could therefore rule the bar decorative and exempt. Two rebuttals: (a) the bar is the only *comparative* encoding — the numeral gives magnitude, not proportion; (b) the identical swatch is reused as the tooltip's identity dot (`:107`, `FrequencyGraph.vue:194-197`), where it is the sole channel and has no textual twin. The effective backdrop behind a translucent Configurator plate is **UNPROVEN-NEEDS-LIVE (SS-13)** — but glass plates in this system are lighter than `--background`, which moves the ratio the wrong way.

### D-9 · MAJOR — motion is unguarded for `prefers-reduced-motion`, and the file violates its own stated precept in the same breath

`CoefficientsSpectrum.vue:146` declares the rule: *"named properties + canonical tokens, no `transition: all`."* Eleven lines earlier, the amplitude bar carries **`transition-all duration-500 ease-out`** (`:91`) — `transition: all`, an untokenised 500 ms clock (glass ships `--duration-*`), and Tailwind's `ease-out` bezier rather than the `--ease-standard`/`--spring-*` register the same file uses at `:148/:151`. `.coeff-list-move` (`:161-163`) likewise uses a raw `0.3s ease`.

No `@media (prefers-reduced-motion: reduce)` block exists anywhere in `CoefficientsSpectrum.vue` or `CoefficientsPanel.vue`. Under reduce, expanding 12 → 40 rows still runs a 28-element `TransitionGroup` of opacity + `translateX(±8px)` (`:147-160`) plus 40 concurrent 500 ms width transitions.

The sharp form of the finding: **within a single row, the numeral respects PRM and the bar does not** — because the numeral was routed through the design system (`AnimatedDigit` → `useAnimatedNumber`, `respectReducedMotion` defaulting true, `glass-ui/src/composables/motion/number/useAnimatedNumber.ts:36-37,120`) and the bar was hand-rolled. That is the strongest available argument for the glass-first posture, stated by the file's own inconsistency.

**Falsifier.** If a global PRM rule zeroed transitions app-wide, the local omission would be moot. `grep -rn "prefers-reduced-motion" web/src/style.css` → the entry sheet has no blanket kill; glass's PRM handling is per-component-scoped (`.configurator-layer-region`, `.aurora-canvas`, …) and cannot reach app-scoped classes like `.coeff-list-*`. Census FE §8 counts 18 reduced-motion references repo-wide — none in this subtree.

### D-10 · MAJOR — the a11y gates covering this panel's default state are disabled on a premise the tree falsifies

Three axe keystones are `test.fixme` in `e2e/visualization-ux.spec.ts` (`:110`, `:133`, `:192`). Two of them explicitly name this panel's default state as the blocker: *"opening the Contour `ConfiguratorLayer` leaves the workspace's SIBLING layers (basis, **coefficients**) collapsed, and glass-ui renders each collapsed layer body with `role="region" aria-hidden="true"` while keeping its focusable trigger inside (**it omits `inert`**)"* (`:118-124`), attributed to *"the PUBLISHED `@mkbabb/glass-ui@^2.0.0`"* (`:103-104`).

Both halves of that premise are false against the installed tree:
- the pin is `^4.0.0` (`package.json:14`), installed 4.0.0;
- 4.0.0's `ConfiguratorLayer` **does** emit `inert`: `inert: !i.value || void 0` in the collapsed-region vnode (`node_modules/@mkbabb/glass-ui/dist/useConfiguratorState-kiIlun8I.js`, region props array `["id","aria-hidden","inert","data-state"]`), and the producer 7.0.0 source annotates it as the deliberate cure (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:154` *"inert pulls the collapsed subtree from tab order + a11y tree—the aria-hidden-focus closure"*).

So the accessibility of this panel's **shipped default rendering** (collapsed) has been unaudited since the 3.1→4.0 hop, on a rationale the dependency already cured. The only frontend gates are `vue-tsc` + 29 single-chromium Playwright tests (CENSUS §3a); vitest is absent.

**Falsifier.** Un-`fixme`-ing might still fail on a *different* violation — D-14 below is a live candidate. That would change the remedy, not the finding: the recorded reason is provably obsolete and must be re-grounded before F.W1 can claim an a11y baseline.

---

## §3 — MINOR

| id | severity | finding | provenance | falsifier |
|---|---|---|---|---|
| **D-11** | MINOR | **Nested scroll.** The list opens its own `max-h-[300px] overflow-y-auto` region *inside* the Configurator's own scroller (`Configurator scroll-mode="auto"` → `class="configurator-controls flex-1 min-h-0 scrollbar-thin"`, glass 4.0.0 compiled render). Wheel input over the coefficient list is trapped by the inner box until it bottoms out; the aside is already the scrolling surface. | `CoefficientsSpectrum.vue:78`; `VisualizationView.vue:194`; glass 4.0.0 `dist/useConfiguratorState-kiIlun8I.js` | If `scroll-mode="auto"` resolved to no scroller at this viewport there'd be one scroller, not two — but the compiled component branches to a `ScrollArea` whenever the mode is active, and the aside is `flex-1 min-h-0`. Exact wheel behaviour is **UNPROVEN-NEEDS-LIVE (SS-13)**. |
| **D-12** | MINOR | **Register misuse on `sub`.** `sub="Fourier spectrum"` is English prose, but the slot is documented *"Optional sub-label / **token reference** (small, monospaced)"* and renders `text-micro font-mono text-muted-foreground/70` — 11 px Fira Code at 70 % opacity. Prose set in a mono token slot. | `CoefficientsPanel.vue:14`; glass 4.0.0 `dist/components/custom/configurator/ConfiguratorLayer.vue.d.ts` (`sub` docblock) + compiled class `"truncate text-micro font-mono text-muted-foreground/70"`; unchanged at 7.0.0 (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:126-131`) | Repo-wide pattern, not this file's invention — `BasisSelector.vue:120` `sub="basis & resolution"`, `ContourSettings.vue:190` `sub="edge extraction settings"`. So it is a convention to *re-ground* (3/3 layers), not a one-off. Not fixed by the uplift. |
| **D-13** | MINOR | **The count readout is unlabelled and sits outside the guard.** `12 / 401` right-aligned at 12 px muted with no word attached reads as pagination. Its wrapper is *outside* the `v-if` (`:72-76` vs `:78`), so the empty state renders **`0 / 0`** immediately above "Compute epicycles to see coefficients". No `aria-label`. | `CoefficientsSpectrum.vue:72-76`, `:78`, `:138-140` | If the count row were inside the guard, the empty state would be clean. It is not; the sibling ordering is textual and unambiguous. |
| **D-14** | MINOR | **Unnamed `role="region"` + no heading wrapper** (upstream, both pins). The collapsible body is `role="region"` with `id` + `aria-hidden` but **no** `aria-labelledby` pointing at the trigger, so per ARIA it is not exposed as a landmark — the intent is unmet. The trigger is a bare `<button>`, not wrapped in a heading; WAI-ARIA APG's accordion pattern puts the trigger inside an `hN`. Consequence here: the controls aside offers **zero** heading structure across four stacked panels. | glass 4.0.0 compiled region props `["id","aria-hidden","inert","data-state"]` (no `aria-labelledby`); identical at 7.0.0 (`ConfiguratorLayer.vue:155-166`) | Not the consumer's defect and **not fixed by the uplift** ⇒ this is a **glass-BH inbox relay** row under the standing per-component relay law, and a live candidate for what D-10's keystones would hit if un-`fixme`-d. |
| **D-15** | MINOR | **Target size (WCAG 2.2 SC 2.5.8).** The tooltip triggers are the coefficient rows: `text-xs` line box (16 px) with a 12 px bar, pitch 16 + `space-y-1` (4 px) = **20 px**. Below the 24 × 24 minimum, and the spacing exception also fails (24 px circles at 20 px pitch intersect). | `CoefficientsSpectrum.vue:78` (`space-y-1`), `:85` (`text-xs`), `:89` (`h-3`) | Contestable: 2.5.8 governs "targets for pointer input", and one may argue a hover-only tooltip trigger is not a target. If the rows were made keyboard-operable (D-3's cure) the argument disappears and the SC binds squarely — the two findings tighten each other. |
| **D-16** | MINOR | **Spacing is additive and unmotivated (Aristotelian).** The layer body already supplies `px-3 py-2 space-y-2`; the child adds a bare `pt-1` (`:67`) whose `space-y-2` never applies (single child), then `mb-2` on the graph (`CoefficientsPanel.vue:21`) and `mb-2` on the count row (`:72`). Vertical rhythm above the list reads 8 + 4 → 8 → 8 px — a 4 px orphan on an otherwise 8 px grid, and a double top pad against the layer's own `py-2`. | glass 4.0.0 compiled body class `"configurator-layer-body px-3 py-2 space-y-2"`; `CoefficientsSpectrum.vue:67,72`; `CoefficientsPanel.vue:21` | If `pt-1` were compensating for a negative margin upstream it would be motivated. It is not — the body's `py-2` is unconditional. **F.W1 note:** 7.0.0 drops the literal `px-3` for the single `--configurator-pad-inline` anchor (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:167-175`), so the inline gutter re-resolves at uplift; re-tune `pt-1`/`mb-2` then rather than now. |
| **D-17** | MINOR | **Off-token easing.** `.coeff-list-move { transition: transform 0.3s ease }` uses the CSS keyword while its three siblings use `var(--ease-standard)`. | `CoefficientsSpectrum.vue:161-163` vs `:147-152` | None — the file's own comment at `:146` names the rule it breaks. |
| **D-18** | MINOR | **Primary numerics set in the admin-chrome register.** The tooltip data grid is `text-admin-label` = `--type-admin-label` = **10 px** (`glass-ui/dist/styles/typography/semantic.css:213-215`, `typography/scale.css:86`), and the token is explicitly the *sub-control admin* rung. Amplitude to 4 dp, phase, and Re/Im — the panel's most precise data — are rendered smaller than every other string on screen. | `CoefficientsSpectrum.vue:110`; `FrequencyGraph.vue:200` | Tooltips legitimately run tighter than body copy; the objection is register (an *admin-chrome* token carrying *primary scientific* data), not raw size. `--type-micro` (11 px) or `--type-caption` (12 px floor) is the honest rung. |
| **D-19** | MINOR | **A trigger-less tooltip root mounts whenever `totalComponents ≤ 12`.** The `v-if` sits on the `<Button>` *inside* the `<Tooltip>`, not on the `<Tooltip>`. | `CoefficientsSpectrum.vue:124-135` | I hypothesised a crash and **disproved it**: reka's `Slot.ts` handles the all-comment case (`firstNonCommentChildrenIndex === -1` → returns children unchanged), so no warning and no throw. What survives is only waste — a `Tooltip` root + `PopperAnchor` with `onTriggerChange(undefined)`. Downgraded from my initial BLOCKER hypothesis to MINOR. |
| **D-20** | MINOR | **Phantom first font family, and a comment asserting a family that does not exist in the tree.** `font-family: "EB Garamond", "Computer Modern Serif", serif` with a comment claiming *"the equation surface elsewhere uses EB Garamond as the cross-walk substitute on the web."* `grep -rn "Garamond" web/` → this file only; `web/public/fonts.css` declares **7** `@font-face` rules across Computer Modern Serif / Fraunces / Fira Code and **zero** Garamond; `index.html:12-14` preloads only CM Serif faces. | `FrequencyGraph.vue:220-223`; `web/public/fonts.css`; `web/index.html:12-14` | The *fallback* works (CM Serif is loaded, italic face `cmunti.woff` preloaded), so the rendering is correct by accident. The defect is a dead first entry plus a false factual comment — prose quality, not paint. |
| **D-21** | MINOR | **Magic geometry.** `max-h-[300px]` (`:78`), `w-16` amplitude cell (`:102`), `w-8` index cell (`:86`), `HEIGHT = 120` / `BAR_W = 14` / `BAR_GAP = 3` (`FrequencyGraph.vue:26-28`) are all untokenised literals in a system whose sizing lives in `--configurator-*` / `offsets-sizing.css`. `w-16` at 12 px Fira Code holds ≈ 8 glyphs; amplitudes are raw contour-coordinate magnitudes (no normalisation anywhere in `api/services/computation.py:105-129`) formatted `toFixed(2)` (`:61-63`), so a 5-digit magnitude ("12345.67") is at the cell's edge. | as cited | Overflow is content-dependent ⇒ **UNPROVEN-NEEDS-LIVE (SS-13)**. The absolute-precision choice is the durable half: a fixed 2-dp format over an unbounded, unit-free quantity gives ~2 significant figures at the head and `0.00` across the tail; a significant-figure or exponent formatter is the right register. Note also that no unit or quantity label appears anywhere in the panel. |

---

## §4 — SUPERLATIVES (L-18 runs both ways)

**S-1 · The extraction is textbook, and the slot is placed at exactly the right joint.** `CoefficientsSpectrum.vue:1-10` records that the visualization and equation panels were ~95 % identical and that the *sole* structural divergence — `FrequencyGraph` — was hoisted to a `#graph` slot rather than duplicated or prop-flagged. The result is a 26-line host that reads top to bottom with no ceremony. *Falsifier applied:* I checked for the usual smell — a `showGraph` boolean or a `variant` prop leaking route knowledge into the shared child. There is none; the child names the divergence in prose (`:68-69`) and passes it through. `EqCoefficientsPanel.vue:14` passes nothing, confirming the seam holds.

**S-2 · The one motion surface routed through the design system is the one that is PRM-correct.** `AnimatedDigit` (`CoefficientsSpectrum.vue:99-103`) inherits `respectReducedMotion` defaulting true through `useAnimatedNumber` (`glass-ui/src/composables/motion/number/useAnimatedNumber.ts:36-37,120`), plus the tabular/`ss01`/`lnum` feature register, for free. Two lines replace a hand-wired composable + a `tabular-nums` span. *Falsifier applied:* I looked for the primitive to be a thin re-skin that drops the contract — it does not; the composable's reduced-motion arm is unconditional unless explicitly disabled, and this callsite does not disable it. This is the finding that makes D-9 an argument rather than a complaint.

**S-3 · Progressive disclosure is correctly proportioned to the data.** `:default-open="false"` (`CoefficientsPanel.vue:14`) against a 401-term spectrum in a 320–440 px aside (`VisualizationView.vue:322,326,329`), plus a parent mount guard (`:273`), plus a 12-row initial slice — the panel does not shout, and the aside stays legible. Many spectrum widgets default open and eat the column. *Falsifier applied:* the alternative reading is "hidden by default = undiscoverable," but the layer header carries both a semantic label and a chevron, and the panel only appears once there is something to show.

**S-4 · The transform annotation on the axis is scholarly and rare.** `FrequencyGraph.vue:164-171` names the height mapping in the UI itself (`|c_n|` vs `log₁₀(|c_n| + 1)`), with a `title` explaining why the `+1` shift exists. Most spectrum plots leave the axis mapping implicit and let the reader guess. The register choice (serif italic at 11 px, `cursor: help`) is correct for an annotation. *Falsifier applied:* it would be hollow if the annotation lied — it does not; with `logScale` false it correctly reports the linear arm. (That the linear arm is the wrong arm is D-5, a *configuration* fault, not an annotation fault.)

**S-5 · The glass posture in this subtree is the constellation's cleanest, and it survives the uplift intact.** Four glass subpaths are consumed here — `./configurator`, `./button`, `./animated-digit`, `./tooltip` — with **zero** direct reka-ui and zero shadcn copies; the one local file is a documented API-shape adapter (`ui/tooltip/Tooltip.vue:1-13`), which lane-frontend §3 independently rules *keep*. I verified all four against producer 7.0.0's export map: **all four survive** (`./metric-stack` does not, but this subtree never imported it). *Falsifier applied:* I specifically hunted for a hidden break — `AnimatedDigit` drops `mode` and `damping` from its props at 7.0.0 (present at 4.0.0 `dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts`, absent in `glass-ui/src/components/animated-digit/AnimatedDigit.vue:38-49`); this callsite passes neither, so the removal is silent here.

---

## §5 — Hypotheses my own falsifiers killed (recorded, not charged)

Challenge discipline: these were live suspicions that the tree disproved. None is charged as a defect.

1. **"The DC term dominates the normalisation and flattens the whole chart."** `maxAmplitude` is `topComponents[0].amplitude` (`:43-45`) and the source sorts descending (`epicycles.py:54`), so if `c₀` (the contour centroid) were large in image-pixel units, every other bar would collapse. **Killed:** `api/services/computation.py:83-89` publishes `image_bounds` centred on the origin (`-rw/2 … rw/2`), i.e. contour coordinates are already image-centred, so `c₀` is a small residual offset, not a page-scale magnitude. Downgraded to a note: `n = 0` is a translation, not a harmonic, and the panel offers no legend distinguishing it — folded into D-21's "no unit or quantity label."
2. **"`text-muted-foreground` on the primary datum fails contrast."** Computed: light `--muted-foreground = --neutral-5 = hsl(30 22% 40%)` (`tokens/light-dark.css:88`) → L ≈ 0.144 against `--background` L ≈ 0.960 ⇒ **5.21 : 1**, comfortably AA. **Killed as a contrast claim.** What remains is only hierarchical — index, amplitude, count, empty copy and button label are *all* muted (`:73, :86, :102, :129, :138`), so the data reads at chrome weight — and I decline to charge that as its own row because the muted-uniform choice is defensible for a dense readout. Effective contrast over a translucent glass plate is **UNPROVEN-NEEDS-LIVE (SS-13)**.
3. **"`<Tooltip>` around a `v-if`'d `<Button>` throws or warns."** **Killed** by reading `reka-ui/src/Primitive/Slot.ts` — the all-comment case returns cleanly. Survives only as D-19 (MINOR, waste).
4. **"`z-[var(--z-controls)]` references an undefined token."** **Killed:** `glass-ui/dist/styles/tokens/scheme-motion.css:336` `--z-controls: 20`. The tooltip problem is the overflow clip (D-7), not the token.
5. **"`last:border-b-0` orphans a hairline over the 12 px stack gap for this panel."** **Killed for this component:** `CoefficientsPanel` is the last child of `.viz-panel-left` (`VisualizationView.vue:264-274`; the `<Transition>` wrappers render no element), so it correctly takes `border-b-0`. It bites its *siblings*, not the subject — out of scope, noted for F.W4.
6. **"`.configurator-section-label` is undefined because the consumer never imports the partial."** **Killed:** `web/src/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css:173` `@import "./configurator.css"`, and both tokens exist (`tokens/offsets-sizing.css:499-500`). The label does resolve at `--type-subheading` (20.4 px) / 600. *Residual observation, uncharged:* it resolves `font-family: var(--font-text)` = Plus Jakarta Sans (`tokens/scheme-motion.css:43`, `theme/bridges.css:66`), which fourier never re-points, so the panel heading is a sans in a Computer-Modern-Serif treatise. That is an app-wide token-override decision, not this component's defect — but it is the single highest-leverage one-line fix available to F.W1 and belongs in the wave spec.

---

## §6 — F.W1 (4.0.0 → 7.0.0) ledger for this subtree

Measured against the CENSUS break surface (metric-badge ×7 files · hover-card ×2 · hover-popover ×2 · dock members ×3 · `ToastVariant`). **None of those rows touch this subtree.** What does:

| row | effect | citation |
|---|---|---|
| `lucide-vue-next` → `@lucide/vue` | **BREAKS** — 1 of the 35 rename sites lives here (`ChevronDown`, `ChevronUp`) | `CoefficientsSpectrum.vue:20`; glass 7.0.0 `peerDependencies["@lucide/vue"]: "^1.16.0"`; lane-frontend §5 |
| `./configurator`, `./button`, `./animated-digit`, `./tooltip` | **SURVIVE** — all four present in 7.0.0's export map | producer `package.json` exports (verified) |
| `ConfiguratorLayer` chevron | **IMPROVES** — D-4's snap is cured by `transition-disclosure` on the `rotate` longhand, with a PRM-safe ease alias | `glass-ui/src/styles/utilities/btn.css:55-70`; `ConfiguratorLayer.vue:139` |
| `.configurator-layer` geometry | **IMPROVES** — `border-b last:border-b-0` (flush hairline block) → `border` + concentric radius + `overflow:hidden` (a card). The stack it lives in is gap-separated (`.viz-panel-left { gap: .75rem }`), which a card reads correctly and a lone bottom hairline does not. It also closes the cross-route inconsistency where the equation twin wraps in `cartoon-card px-3 py-2` and this one has no container at all. | glass 4.0.0 compiled class vs `glass-ui/src/components/configurator/ConfiguratorLayer.vue:100-104`; `VisualizationView.vue:363-366`; `EqCoefficientsPanel.vue:12` |
| body inline padding | **RE-RESOLVES** — 7.0.0 drops literal `px-3` for the single `--configurator-pad-inline` anchor; re-tune D-16's spacing after the bump, not before | `ConfiguratorLayer.vue:167-175` |
| `AnimatedDigit` props | **NO-OP** — `mode`/`damping` removed at 7.0.0; this callsite passes neither | 4.0.0 `.d.ts` vs `glass-ui/src/components/animated-digit/AnimatedDigit.vue:38-49` |
| `role="region"` naming + heading wrapper | **UNFIXED at 7.0.0** ⇒ D-14 is a glass-BH relay, not an uplift row | `ConfiguratorLayer.vue:155-166` |
| `sub` mono register | **UNCHANGED at 7.0.0** ⇒ D-12 is a fourier convention to re-ground | `ConfiguratorLayer.vue:126-131` |

---

## §7 — Corpus reconciliation

**Cited where I overlap.**
- **R3-10** (intake lane, `lane-fourier-r3-r6.md:84`, TRUE, CARRY→F.W4): two dynamic-`:is` families were dropped between registries, one of them `CoefficientsSpectrum.vue:132`. **Confirmed live** at exactly that line: `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. It is inside my D-19's `<Tooltip>`/`<Button>` block; F.W4's exhaustiveness budget and this challenge point at the same six lines.
- **R3-7a** (`:79`, CARRY→F.W3): the `ui/tooltip` migration budget of 35 callsites / 9 consumers counts **CoefficientsSpectrum 2**. Confirmed — `:80` and `:124`. Both are implicated here: `:80` is D-3's keyboard-unreachable trigger and `:124` is D-19's trigger-less root. **The F.W3 migration must not be a mechanical barrel swap** — swapping `@/components/ui/tooltip` for `@mkbabb/glass-ui/tooltip` preserves both defects verbatim, because both live in how the trigger is *composed*, not in which module it comes from.
- **CENSUS §3a / lane-frontend §5** — the tri-package deadlock and the break surface: confirmed, and narrowed for this subtree in §6 (lucide only).
- **CENSUS §3c `inv-33`** ("all runtime colour derives from value.js"): D-8 is a concrete, measurable instance — a hand-rolled `hsl()` ramp duplicated across two files, bypassing the repo's own `--viz-*` resolver.

**Where I contradict the corpus.**
- **lane-frontend §4, candidate-shadow table** lists `visualization/CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` against `./metric-stack` (4.0.0) → `./metric` (7.0.0). **I contradict this on the tree.** Neither panel imports `./metric-stack`, `./metric-cell` or `./metric-badge` (`grep -rn "metric" web/src/components/visualization/CoefficientsPanel.vue web/src/components/equation/EqCoefficientsPanel.vue web/src/components/shared/CoefficientsSpectrum.vue` → empty), and the surface is not a metric stack: it is a 401-row ranked bar spectrum with a canvas graph, per-row tooltips and an expand control. `Metric` is a labelled value display. The correct producer comparison for this subtree is `./fourier-field` + `./fourier-math` — the SOFT-SHADOW row lane-frontend itself raises for `CoefficientsSpectrum` ("same family (spectrum/`BasisComponent`)", §4), and whose prop table takes `spectrum: readonly BasisComponent[]`, the very type this panel passes. **Recommend F.W3/F.W4 strike the `metric-stack` row for these two panels and fold them into the `FourierField` convergence study.**
- **`e2e/visualization-ux.spec.ts:103-104`** asserts *"the app consumes the PUBLISHED `@mkbabb/glass-ui@^2.0.0`"* and that the layer *"omits `inert`"*. Both are false against the installed tree (D-10). This is a contradiction with a *product artefact*, not with the corpus, and it is the reason the panel's default state carries no a11y evidence.

---

## §8 — Tally

| severity | count | ids |
|---|---|---|
| BLOCKER | **2** | D-1, D-2 |
| MAJOR | **8** | D-3 … D-10 |
| MINOR | **11** | D-11 … D-21 |
| **defects total** | **21** | |
| superlatives | **5** | S-1 … S-5 |
| killed by own falsifier (uncharged) | 6 | §5 |

**Livable-only residue for SS-13:** D-7 exact clip width · D-8 effective backdrop behind the glass plate · D-11 wheel-trap behaviour · D-21 `w-16` overflow · §5 item 2 muted-on-glass contrast.

*Read-only audit. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` untouched; this file is the only write.*
