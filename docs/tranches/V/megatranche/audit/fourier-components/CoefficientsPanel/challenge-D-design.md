claude-opus-5[1m] (served model id)

# CHALLENGE · CoefficientsPanel · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CoefficientsPanel.vue` (26 lines).
**Pin.** `@mkbabb/glass-ui ^4.0.0` installed (`web/package.json:14`, `node_modules/@mkbabb/glass-ui/package.json` `"version": "4.0.0"`); producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method.** Static + source-derived only, read-only across three repos. No browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**. Every claim carries severity + `file:line` + its falsifier; where the falsifier *killed* my hypothesis I say so and drop or downgrade the row (§5).

**Read whole.** `CoefficientsPanel.vue` · `components/shared/CoefficientsSpectrum.vue` (168) · `components/equation/FrequencyGraph.vue` (247) · `components/ui/tooltip/Tooltip.vue` (38) · `stores/workspace.ts` · `lib/types.ts` · plus, for the render truth of the imported primitive, glass-ui 4.0.0's compiled `ConfiguratorLayer` (`dist/useConfiguratorState-kiIlun8I.js`), its scoped CSS (`dist/glass-ui.css`, `data-v-e887a77f`), `dist/styles/configurator.css`, `dist/styles/tokens/*`, `dist/styles/typography/*`, `dist/useAnimatedNumber-C_3wZLx4.js`, `dist/TooltipProvider-B3MkB_8P.js`, `reka-ui/dist/{Tooltip,Popper}/*`, and the producer 7.0.0 originals (`src/components/configurator/{ConfiguratorLayer.vue,Configurator.vue,styles.css}`, `CHANGELOG.md`, `package.json` exports). Host + siblings: `VisualizationView.vue`, `BasisSelector.vue`, `ContourSettings.vue`, `ImageUpload.vue`, `EqCoefficientsPanel.vue`.

**Verdict.** The 26-line host is *well-factored and badly configured*. Its composition (a shared spectrum + a hoisted `#graph` slot) is genuinely good design (§4 S-1). Its **configuration** is where it fails: it wires a configurable spectrum instrument into its least useful arm, it lets the colour channel mean two different things eight pixels apart, it puts a 691 px canvas in a 320 px column, and it consumes a store that exposes `computing` and `error` while modelling neither. **2 BLOCKER · 13 MAJOR · 15 MINOR · 1 INFO · 7 superlatives.**

> **Provenance of this file.** §§1–7 are the first D-axis pass. **§9 (ADDENDA)** is a second, independent D-axis pass folded in whole — 10 new rows (D-22…D-31), 2 new superlatives (S-6, S-7), and 5 amendments (A-1…A-5) that sharpen or **reverse** earlier rows. Where the two passes disagree, §9 says so explicitly and the reconciliation is recorded in §10. Nothing from either pass was dropped.

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

At the collapsed boundary (i = 11, the last visible row) the divergence is maximal: list = **0.0° red**, graph = **215.4° blue** — the same datum, red in one pane and blue in the pane directly above it.

The tooltip swatch inherits the list ramp (`CoefficientsSpectrum.vue:107`), so hovering row 5 shows a green dot for the bar the graph directly above renders violet. A reader who uses colour to track a harmonic between the two views is *systematically* misled — and colour is the only channel that could carry that correspondence, because neither pane labels rank.

Third arm: expanding re-slices to 40, so the list's denominator flips 12→40 and **every list row's colour changes**. Colour is not a property of the datum; it is a property of how many rows happen to be on screen.

**Severity rationale.** This is the panel's whole job (make a 401-term spectrum legible) failing at the panel's own composition seam — `:max-bars="40"` is set here, in the 26 lines under review, against a default the shared child owns.

**Falsifier.** If `expanded === true` **and** `totalComponents ≤ 40`, both denominators equal `totalComponents` and the ramps agree. Also agrees when `totalComponents ≤ 12` (both denominators = total). Neither holds by default: `lib/defaults.ts:7` `n_harmonics: 200` → `min(200, n_points/2)` positive + negative + DC = **401 components** (`api/services/computation.py:109-119`, `src/fourier_analysis/series.py:45-47`). The disagreement is the shipped default, not an edge case.

### D-2 · BLOCKER — state coverage: the panel models neither `computing` nor `error`, and its empty copy fires **only** while computing

`CoefficientsPanel.vue:8-10` takes the whole store and reads exactly one field: `store.epicycleData?.components ?? []`. The store exposes `computing` (`stores/workspace.ts:50`, depth-counted at `:62-69`, exported `:441`) and `error` (`:51`, set on every failure path — `:303` `"Epicycle computation failed"`, exported `:442`). Neither is read.

Four concrete consequences:

1. **The empty state is unreachable except during compute, where its copy is wrong.** The parent mounts the panel with `v-if="store.epicycleData || store.computing"` (`VisualizationView.vue:273`). `components` is therefore `[]` only when `store.computing && !epicycleData` — i.e. while the epicycle job is in flight. In exactly that state the panel renders `CoefficientsSpectrum.vue:138-140` → **"Compute epicycles to see coefficients"** (`CoefficientsPanel.vue:15`). The one reachable rendering of the empty branch is an instruction to perform the action already in flight. There is no spinner, skeleton, or progress affordance anywhere in the subtree.
2. **The first-compute error state is "the panel disappears."** On a compute rejection with no prior data, `epicycleData` stays `null` and `computing` returns to `false`, so the parent's `v-if` goes false and the panel unmounts mid-`Transition name="slide-down"`. The panel silently vanishes; the only error surface in the view is `VisualizationView.vue:162` `v-else-if="store.error && !store.imageSlug"`, which is gated on there being *no* image — precisely not this case.
3. **[A-1, second pass] The RE-compute error state is worse: stale data is presented as current.** `workspace.ts:285-308` (`runComputeEpicycles`) sets `error.value` in its `catch` (`:301-305`) and **does not null `epicycleData`**. So when a user raises `n_harmonics` and the recompute fails, the panel keeps rendering the *previous* run's 401 coefficients, under a slider that now reads a different value, with no error indication anywhere in the subtree. The panel does not merely omit an error state — it actively asserts a false one. *Falsifier:* if the `catch` cleared `epicycleData`, this collapses into (2). It does not (`workspace.ts:301-305`, verified read).
4. **`n_components` is discarded.** `EpicycleData.n_components` exists (`lib/types.ts:24`) and is never read; the panel recomputes `.length` in two places instead.

**Falsifier.** If a toast/global error surface caught compute failures, (2) and (3) would be cosmetic. Searched: `VisualizationView.vue` has one error branch (`:162`), gated on `!store.imageSlug`; no toast call on the epicycle path. If `epicycleData` could ever be non-null with `components: []`, (1) would have a second reachable path — it would still render the same wrong copy.

---

## §2 — MAJOR

### D-3 · MAJOR — the per-coefficient detail is pointer-only; the docblock's a11y-discharge claim is false

`CoefficientsSpectrum.vue:1-16` states the tooltip lift "discharg[es] the L5 §5 A8 LOW a11y gap." It does not.

The trigger chain: local shim `ui/tooltip/Tooltip.vue:27` `<TooltipTrigger as-child>` → glass `TooltipTrigger.vue:28-33` (producer; installed 4.0.0 is the same shape) `as="button" :as-child="asChild"` → reka `Primitive` → `Slot.ts` `cloneVNode(child, mergedProps)`. reka's `TooltipTrigger.vue:35-47` merges `focus`/`blur`/`pointermove`/`pointerleave` listeners and `aria-describedby`, but **injects no `tabindex`**. The child here is a plain `<div class="coeff-row">` (`CoefficientsSpectrum.vue:85`), and `.coeff-row { cursor: default }` (`:165-167`) confirms the authorial intent that it not read as interactive.

A `<div>` with no `tabindex` is not focusable ⇒ `handleFocus` never fires ⇒ the tooltip cannot be opened by keyboard. The tooltip body is the **sole** route to phase (`:114`), relative % (`:116`), Re/Im (`:118`) and 4-dp amplitude (`:112`) — the visible row exposes only index and a 2-dp amplitude. Keyboard and screen-reader users lose four of six data columns. WCAG 2.1.1 (Keyboard); the 1.4.13 "hoverable/dismissible/persistent" contract is also unmet on the focus arm.

Corollary on the graph half: `FrequencyGraph.vue:177-183` is a bare `<canvas>` with `@mousemove`/`@mouseleave`/`@click` and **no** `role`, no `aria-label`, no `tabindex`, no fallback content. There is no keyboard path to any of the 40 bars, and no accessible name for the graph itself.

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
- **`activeIndices` is never passed** ⇒ `isActive` is always true (`:87`) ⇒ the dimming register (alpha 0.25 / 0.2 at `:94`, `:107`) is dead code at this site.
- **`toggle-harmonic` / `hover-harmonic` are never listened to** — yet the canvas paints `cursor-pointer` (`:179`) and implements hover glow + hit-testing (`:99-102`, `:113-127`). A pointer cursor and a hover-highlight on a surface where clicking does nothing is a **false affordance**; the user is invited to select harmonics that cannot be selected. Note the inverse error 100 lines away: `.coeff-row { cursor: default }` (`CoefficientsSpectrum.vue:165-167`) *suppresses* the pointer cue on the one element that does carry hidden content. The panel points "clickable" at the inert surface and "nothing here" at the interactive one.
- **No axis toggle is offered.** The panel could expose the log/linear switch the child was built around; it exposes nothing.

**Falsifier.** If the decay were flat (white-ish spectrum) the linear arm would read fine — but the source sorts by descending amplitude (`src/fourier_analysis/epicycles.py:54`) and the leader is by construction the maximum, so the first bar is always full-height and everything after is a fraction of it; the 0.008 floor guarantees a visible-but-meaningless sliver band. If any other consumer wired the emits, "unwired contract" would be a per-callsite nit rather than a dead API — the grep says there is no other consumer.

### D-6 · MAJOR — 90 % of the spectrum is unreachable, and the affordance that hides it advertises the number it withholds

`CoefficientsSpectrum.vue:37-39` caps at 40 even when expanded; `:133` labels the control **`Show more (${totalComponents} total)`**. With the shipped default (`lib/defaults.ts:7` `n_harmonics: 200` → 401 components) the button reads *"Show more (401 total)"*, delivers 40, and then the readout reads `40 / 401` (`:74`) with no further affordance. 361 coefficients — 90 % — are unreachable through this panel, with no disclosure that a ceiling exists. The tooltip on the same control is honest (`:124` "Show top 40 of 401 coefficients") but is itself pointer-only (D-3), so the honest string is exactly the one a keyboard user cannot get.

**Falsifier.** If `n_harmonics` defaulted below 40 the ceiling would never bind. It defaults to 200, and `ContourSettings` lets the user raise it (ceiling 500, `BasisSelector.vue:30,165`). If the graph exposed the remainder — it is capped at the same 40 (`CoefficientsPanel.vue:20`).

### D-7 · MAJOR — the graph tooltip is clipped by its own scroll container for the leading (largest) coefficients

`FrequencyGraph.vue:185-191`: the tooltip is `position: absolute`, `-translate-x-1/2`, `left: ${tooltipPos.x}px`, and it lives **inside** `div.overflow-x-auto.overflow-y-hidden` (`:172-176`) whose `.scrollbar-thin{position:relative}` (`:230-232`) is the containing block. Bar 0's centre is `startX + BAR_W/2 = (BAR_GAP + 4) + 7 = 14 px` (`:26-28`, `:82`, `:92`). The tooltip content is `whitespace-nowrap` with a two-column grid of "Amplitude / 123.4567", "Phase / −179.9°" — comfortably ≥ 100 px wide — so its left edge lands at ≈ 14 − 50 = **−36 px**. Content overflowing the *start* edge of an `overflow-x: auto` box cannot be scrolled to (there is no negative scroll position), so the left half of the tooltip for the largest one or two harmonics is unreachable. `z-[var(--z-controls)]` (`:187`) cannot help — z-index does not escape an overflow clip. The mirror problem exists at the trailing edge: a nowrap tooltip near bar 39 *extends* the container's scrollable width, so the scrollbar's extent jitters on hover.

**Severity rationale.** The clipped rows are the *most important* ones (sorted descending by amplitude, `epicycles.py:54`).

**Falsifier.** If the scroller had left padding ≥ half the tooltip width, or if the tooltip were portaled, this dies. It has neither: the canvas is `display:block` flush at x=0 and the tooltip is an in-flow sibling (`grep -rn "TooltipPortal\|Teleport" FrequencyGraph.vue` → empty). Exact clipped width is content-dependent → the *existence* of the clip is static-derivable; the exact pixel count is **UNPROVEN-NEEDS-LIVE (SS-13)**. (`--z-controls` itself is defined — `glass-ui/dist/styles/tokens/scheme-motion.css:336` `--z-controls: 20` — so the token is not the fault.)

### D-8 · MAJOR — the spectrum ramp bypasses the repo's own theme-aware viz palette; light-mode non-text contrast fails in the yellow band

fourier maintains a token-backed, theme-reactive visualization palette: `lib/colors.ts:89-95` `resolveVizColors()` reading `--viz-fourier/-chebyshev/-legendre/-amber/-green`, re-run on dark-mode flip by a `MutationObserver` in `App.vue:11-17`, with a hand-authored light-mode WCAG darken for `--viz-amber` (`style.css:113-120`, `hsl(35 70% 42%)` → `hsl(35 76% 35%)`). The spectrum ramp uses **none** of it: `hsl(${hue}, 85%, 55%)` hard-coded in two places (`CoefficientsSpectrum.vue:47-50`, `FrequencyGraph.vue:40-43`), theme-invariant, token-free.

Computed consequence in light mode. Page surface `--background = --neutral-0 = hsl(40 30% 98%)` (`glass-ui/dist/styles/tokens/light-dark.css:83`), relative luminance ≈ **0.960**. The bar track is `bg-muted/50` over it (`CoefficientsSpectrum.vue:89`), so the effective backdrop is ≈ 0.93–0.96. Ramp entries in the 55°–110° band — with 12 rows that is i = 8 (hue 81.8°) and i = 9 (hue 54.5°) — sit at L ≈ 0.79 (worked for `hsl(60 85% 55%)` → sRGB (0.933, 0.933, 0.168) → L = 0.793). Contrast ≈ (0.96+0.05)/(0.793+0.05) ≈ **1.20 : 1**, against the 3 : 1 floor of WCAG 1.4.11 for graphical objects. In dark mode (`--neutral-0 = hsl(24 9% 4%)`, `tokens/dark-arm.css:42`) the same swatches pass comfortably — this is a **light-mode-only** failure, exactly the class of defect the `--viz-amber` carry was authored to fix, on a surface the carry does not reach.

Two further properties of the ramp, both design-decidable: (a) at constant `L = 55%` the sweep's *luminance* is non-monotonic across hue, so an **ordered** quantity is encoded on a channel that is not ordered; (b) hue-only encoding with no redundant channel is not CVD-safe — under deuteranopia the 300°→0° sweep collapses toward a blue↔yellow axis and adjacent rank bands become mutually indistinguishable.

This also breaches fourier's own `inv-33` ("all runtime colour derives from value.js" — CENSUS §3c), which the megatranche already names as the W.L5 design-surface hook.

**Falsifier (stated honestly).** WCAG 1.4.11 exempts graphics whose information is available in text; the amplitude *is* also rendered numerically in the same row (`:99-103`). An auditor could therefore rule the bar decorative and exempt. Two rebuttals: (a) the bar is the only *comparative* encoding — the numeral gives magnitude, not proportion; (b) the identical swatch is reused as the tooltip's identity dot (`:107`, `FrequencyGraph.vue:194-197`), where it is the sole channel and has no textual twin. The effective backdrop behind a translucent Configurator plate is **UNPROVEN-NEEDS-LIVE (SS-13)** — but glass plates in this system are lighter than `--background`, which moves the ratio the wrong way.

### D-9 · MAJOR — motion is unguarded for `prefers-reduced-motion`, and the file violates its own stated precept in the same breath

`CoefficientsSpectrum.vue:146` declares the rule: *"named properties + canonical tokens, no `transition: all`."* Eleven lines earlier, the amplitude bar carries **`transition-all duration-500 ease-out`** (`:91`) — `transition: all`, an untokenised 500 ms clock (glass ships `--duration-*`), and Tailwind's `ease-out` bezier rather than the `--ease-standard`/`--spring-*` register the same file uses at `:148/:151`. `.coeff-list-move` (`:161-163`) likewise uses a raw `0.3s ease`. Because `backgroundColor` is written inline on the same element (`:94`), `transition-all` also animates a 500 ms colour crossfade of the D-1 hue on every re-slice, across 12–40 elements at once.

No `@media (prefers-reduced-motion: reduce)` block exists anywhere in `CoefficientsSpectrum.vue` or `CoefficientsPanel.vue`. Under reduce, expanding 12 → 40 rows still runs a 28-element `TransitionGroup` of opacity + `translateX(±8px)` (`:147-160`) plus 40 concurrent 500 ms width transitions.

The sharp form of the finding: **within a single row, the numeral respects PRM and the bar does not** — because the numeral was routed through the design system (`AnimatedDigit` → `useAnimatedNumber`, `respectReducedMotion` defaulting true, `glass-ui/src/composables/motion/number/useAnimatedNumber.ts:36-37,120`) and the bar was hand-rolled. That is the strongest available argument for the glass-first posture, stated by the file's own inconsistency.

**Falsifier.** If a global PRM rule zeroed transitions app-wide, the local omission would be moot. `grep -rn "prefers-reduced-motion" web/src/style.css` → the entry sheet has no blanket kill; glass's PRM handling is per-component-scoped (`.configurator-layer-region`, `.aurora-canvas`, …) and cannot reach app-scoped classes like `.coeff-list-*`. Census FE §8 counts 18 reduced-motion references repo-wide — none in this subtree.

### D-10 · MAJOR — the a11y gates covering this panel's default state are disabled on a premise the tree falsifies

Three axe keystones are `test.fixme` in `e2e/visualization-ux.spec.ts` (`:110`, `:133`, `:192`). Two of them explicitly name this panel's default state as the blocker: *"opening the Contour `ConfiguratorLayer` leaves the workspace's SIBLING layers (basis, **coefficients**) collapsed, and glass-ui renders each collapsed layer body with `role="region" aria-hidden="true"` while keeping its focusable trigger inside (**it omits `inert`**)"* (`:118-124`), attributed to *"the PUBLISHED `@mkbabb/glass-ui@^2.0.0`"* (`:103-104`).

Both halves of that premise are false against the installed tree:
- the pin is `^4.0.0` (`package.json:14`), installed 4.0.0;
- 4.0.0's `ConfiguratorLayer` **does** emit `inert`: `inert: !i.value || void 0` in the collapsed-region vnode (`node_modules/@mkbabb/glass-ui/dist/useConfiguratorState-kiIlun8I.js`, region props array `["id","aria-hidden","inert","data-state"]`), and the producer 7.0.0 source annotates it as the deliberate cure (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:154` *"inert pulls the collapsed subtree from tab order + a11y tree—the aria-hidden-focus closure"*). Corroborated by the corpus: `formation/fourier/lane-docs.md:433` books it **SATISFIED-UPSTREAM / ADOPT-NOW (3.1.1)**.

So the accessibility of this panel's **shipped default rendering** (collapsed) has been unaudited since the 3.1→4.0 hop, on a rationale the dependency already cured. The only frontend gates are `vue-tsc` + 29 single-chromium Playwright tests (CENSUS §3a); vitest is absent.

**Falsifier.** Un-`fixme`-ing might still fail on a *different* violation — D-14 below is a live candidate. That would change the remedy, not the finding: the recorded reason is provably obsolete and must be re-grounded before F.W1 can claim an a11y baseline.

---

## §3 — MINOR

| id | severity | finding | provenance | falsifier |
|---|---|---|---|---|
| **D-11** | MINOR | **Nested scroll.** The list opens its own `max-h-[300px] overflow-y-auto` region *inside* the Configurator's own scroller (`Configurator scroll-mode="auto"` → `class="configurator-controls flex-1 min-h-0 scrollbar-thin"`, glass 4.0.0 compiled render). Wheel input over the coefficient list is trapped by the inner box until it bottoms out; the aside is already the scrolling surface. Expanded to 40 rows the inner box holds ~360 px of content in a 300 px window — permanently scrollable, permanently trapping. | `CoefficientsSpectrum.vue:78`; `VisualizationView.vue:194`; glass 4.0.0 `dist/useConfiguratorState-kiIlun8I.js` | If `scroll-mode="auto"` resolved to no scroller at this viewport there'd be one scroller, not two — but the compiled component branches to a `FadingScroll` whenever the mode is active, and the aside is `flex-1 min-h-0`. Exact wheel behaviour is **UNPROVEN-NEEDS-LIVE (SS-13)**. |
| **D-12** | MINOR | **Register misuse on `sub`.** `sub="Fourier spectrum"` is English prose, but the slot is documented *"Optional sub-label / **token reference** (small, monospaced)"* and renders `text-micro font-mono text-muted-foreground/70` — 11 px Fira Code at 70 % opacity. Prose set in a mono token slot. **See A-3 / D-25: the same markup also fails AA contrast.** | `CoefficientsPanel.vue:14`; glass 4.0.0 `dist/components/custom/configurator/ConfiguratorLayer.vue.d.ts` (`sub` docblock) + compiled class `"truncate text-micro font-mono text-muted-foreground/70"`; unchanged at 7.0.0 (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:126-131`) | Repo-wide pattern, not this file's invention — `BasisSelector.vue:120` `sub="basis & resolution"`, `ContourSettings.vue:190` `sub="edge extraction settings"`. So it is a convention to *re-ground* (3/3 layers), not a one-off. Not fixed by the uplift. |
| **D-13** | MINOR | **The count readout is unlabelled and sits outside the guard.** `12 / 401` right-aligned at 12 px muted with no word attached reads as pagination. Its wrapper is *outside* the `v-if` (`:72-76` vs `:78`), so the empty state renders **`0 / 0`** immediately above "Compute epicycles to see coefficients" — a right-aligned meaningless ratio stacked on a centred sentence, two alignments in a two-line state. No `aria-label` in any state. | `CoefficientsSpectrum.vue:72-76`, `:78`, `:138-140` | If the count row were inside the guard, the empty state would be clean. It is not; the sibling ordering is textual and unambiguous. |
| **D-14** | MINOR | **Unnamed `role="region"` + no heading wrapper** (upstream, both pins). The collapsible body is `role="region"` with `id` + `aria-hidden` but **no** `aria-labelledby` pointing at the trigger, so per ARIA it is not exposed as a landmark — the intent is unmet. The trigger is a bare `<button>`, not wrapped in a heading; WAI-ARIA APG's accordion pattern puts the trigger inside an `hN`. Consequence here: the controls aside offers **zero** heading structure across four stacked panels. | glass 4.0.0 compiled region props `["id","aria-hidden","inert","data-state"]` (no `aria-labelledby`); identical at 7.0.0 (`ConfiguratorLayer.vue:155-166`) | Not the consumer's defect and **not fixed by the uplift** ⇒ this is a **glass-BH inbox relay** row under the standing per-component relay law, and a live candidate for what D-10's keystones would hit if un-`fixme`-d. |
| **D-15** | MINOR | **Target size (WCAG 2.2 SC 2.5.8).** The tooltip triggers are the coefficient rows: `text-xs` line box (16 px) with a 12 px bar, pitch 16 + `space-y-1` (4 px) = **20 px**. Below the 24 × 24 minimum, and the spacing exception also fails (24 px circles at 20 px pitch intersect). | `CoefficientsSpectrum.vue:78` (`space-y-1`), `:85` (`text-xs`), `:89` (`h-3`) | Contestable: 2.5.8 governs "targets for pointer input", and one may argue a hover-only tooltip trigger is not a target. If the rows were made keyboard-operable (D-3's cure) the argument disappears and the SC binds squarely — the two findings tighten each other. |
| **D-16** | MINOR | **Spacing is additive and unmotivated (Aristotelian).** The layer body already supplies `px-3 py-2 space-y-2`; the child adds a bare `pt-1` (`:67`) whose `space-y-2` never applies (single child), then `mb-2` on the graph (`CoefficientsPanel.vue:21`) and `mb-2` on the count row (`:72`). Vertical rhythm above the list reads 8 + 4 → 8 → 8 px — a 4 px orphan on an otherwise 8 px grid, and a double top pad against the layer's own `py-2` (12 px above vs 8 px below, asymmetric inside a symmetric section grammar). | glass 4.0.0 compiled body class `"configurator-layer-body px-3 py-2 space-y-2"`; `CoefficientsSpectrum.vue:67,72`; `CoefficientsPanel.vue:21` | If `pt-1` were compensating for a negative margin upstream it would be motivated. It is not — the body's `py-2` is unconditional. **F.W1 note:** 7.0.0 drops the literal `px-3` for the single `--configurator-pad-inline` anchor (`glass-ui/src/components/configurator/ConfiguratorLayer.vue:167-175`), so the inline gutter re-resolves at uplift; re-tune `pt-1`/`mb-2` then rather than now. |
| **D-17** | MINOR | **Off-token easing.** `.coeff-list-move { transition: transform 0.3s ease }` uses the CSS keyword while its three siblings use `var(--ease-standard)`. | `CoefficientsSpectrum.vue:161-163` vs `:147-152` | None — the file's own comment at `:146` names the rule it breaks. (`--ease-standard` *is* defined: `glass-ui/dist/styles/tokens/scheme-motion.css:216` → `var(--motion-ease-standard)`; so the sibling rules are sound and only this one is off-register.) |
| **D-18** | MINOR | **Primary numerics set in the admin-chrome register.** The tooltip data grid is `text-admin-label` = `--type-admin-label` = **10 px** (`glass-ui/dist/styles/typography/semantic.css:213-215`, `typography/scale.css:86`), and the token is explicitly the *sub-control admin* rung. Amplitude to 4 dp, phase, and Re/Im — the panel's most precise data — are rendered smaller than every other string on screen, and smaller than the *less* precise numerals in the visible row (`text-xs`, 12 px, `:85`). Precision and size are inverted. | `CoefficientsSpectrum.vue:110`; `FrequencyGraph.vue:200` | Tooltips legitimately run tighter than body copy; the objection is register (an *admin-chrome* token carrying *primary scientific* data), not raw size. `--type-micro` (11 px) or `--type-caption` (12 px floor) is the honest rung. |
| **D-19** | MINOR | **A trigger-less tooltip root mounts whenever `totalComponents ≤ 12`.** The `v-if` sits on the `<Button>` *inside* the `<Tooltip>`, not on the `<Tooltip>`. | `CoefficientsSpectrum.vue:124-135` | I hypothesised a crash and **disproved it**: reka's `Slot.ts` handles the all-comment case (`firstNonCommentChildrenIndex === -1` → returns children unchanged), so no warning and no throw. What survives is only waste — a `Tooltip` root + `PopperAnchor` with `onTriggerChange(undefined)`. Downgraded from my initial BLOCKER hypothesis to MINOR. |
| **D-20** | MINOR | **Phantom first font family, and a comment asserting a family that does not exist in the tree.** `font-family: "EB Garamond", "Computer Modern Serif", serif` with a comment claiming *"the equation surface elsewhere uses EB Garamond as the cross-walk substitute on the web."* `grep -rn "Garamond" web/` → this file only; `web/public/fonts.css` declares **7** `@font-face` rules across Computer Modern Serif / Fraunces / Fira Code and **zero** Garamond; `index.html:12-14` preloads only CM Serif faces. | `FrequencyGraph.vue:220-223`; `web/public/fonts.css`; `web/index.html:12-14` | The *fallback* works (CM Serif is loaded, italic face `cmunti.woff` preloaded), so the rendering is correct by accident. The defect is a dead first entry plus a false factual comment — prose quality, not paint. |
| **D-21** | MINOR | **Magic geometry.** `max-h-[300px]` (`:78`), `w-16` amplitude cell (`:102`), `w-8` index cell (`:86`), `HEIGHT = 120` / `BAR_W = 14` / `BAR_GAP = 3` (`FrequencyGraph.vue:26-28`) are all untokenised literals in a system whose sizing lives in `--configurator-*` / `offsets-sizing.css`. Amplitudes are raw contour-coordinate magnitudes (no normalisation anywhere in `api/services/computation.py:105-129`) formatted `toFixed(2)` (`:61-63`). **[A-2] Threshold computed:** Fira Code advance = 0.6 em; at `text-xs` (12 px) that is 7.2 px/char, so `w-16` (64 px) holds **8.8 chars** ⇒ `"12345.67"` (8 ch, 57.6 px) fits and overflow begins only at \|amplitude\| ≥ 10⁵ (`"123456.78"`, 9 ch, 64.8 px). | as cited | Overflow is content-dependent ⇒ **UNPROVEN-NEEDS-LIVE (SS-13)**, now bounded to the ≥10⁵ regime. The durable half is the format: a fixed 2-dp format over an unbounded, unit-free quantity gives ~2 significant figures at the head and `0.00` across the tail; a significant-figure or exponent formatter is the right register. Note also that no unit or quantity label appears anywhere in the panel. **The companion `w-8` hypothesis was killed — see §5 item 7.** |

---

## §4 — SUPERLATIVES (L-18 runs both ways)

**S-1 · The extraction is textbook, and the slot is placed at exactly the right joint.** `CoefficientsSpectrum.vue:1-10` records that the visualization and equation panels were ~95 % identical and that the *sole* structural divergence — `FrequencyGraph` — was hoisted to a `#graph` slot rather than duplicated or prop-flagged. The result is a 26-line host that reads top to bottom with no ceremony. *Falsifier applied:* I checked for the usual smell — a `showGraph` boolean or a `variant` prop leaking route knowledge into the shared child. There is none (`grep -n "FrequencyGraph\|canvas" CoefficientsSpectrum.vue` → empty); the child names the divergence in prose (`:68-69`) and passes it through. `EqCoefficientsPanel.vue:14` passes nothing, confirming the seam holds — and the equation route therefore never carries the 247-line canvas on its module graph.

**S-2 · The one motion surface routed through the design system is the one that is PRM-correct.** `AnimatedDigit` (`CoefficientsSpectrum.vue:99-103`) inherits `respectReducedMotion` defaulting true through `useAnimatedNumber` (`glass-ui/src/composables/motion/number/useAnimatedNumber.ts:36-37,120`; compiled: `dist/useAnimatedNumber-C_3wZLx4.js` constructs `SmoothProgress` with `respectReducedMotion: f.respectReducedMotion !== !1`), plus the tabular/`ss01`/`lnum` feature register, for free. Two lines replace a hand-wired composable + a `tabular-nums` span. *Falsifier applied:* I looked for the primitive to be a thin re-skin that drops the contract — it does not; the composable's reduced-motion arm is unconditional unless explicitly disabled, and `AnimatedDigitProps` does not even expose the flag, so this callsite **cannot** break it. This is the finding that makes D-9 an argument rather than a complaint.

**S-3 · Progressive disclosure is correctly proportioned to the data.** `:default-open="false"` (`CoefficientsPanel.vue:14`) against a 401-term spectrum in a 320–440 px aside, plus a parent mount guard (`:273`), plus a 12-row initial slice — the panel does not shout, and the aside stays legible. Many spectrum widgets default open and eat the column. *Falsifier applied:* the alternative reading is "hidden by default = undiscoverable," but the layer header carries both a semantic label and a chevron, and the panel only appears once there is something to show. *(Tightened by D-26: the disclosure is right; the mute header is not.)*

**S-4 · The transform annotation on the axis is scholarly and rare.** `FrequencyGraph.vue:164-171` names the height mapping in the UI itself (`|c_n|` vs `log₁₀(|c_n| + 1)`), with a `title` explaining why the `+1` shift exists. Most spectrum plots leave the axis mapping implicit and let the reader guess. The register choice (serif italic at 11 px, `cursor: help`) is correct for an annotation. *Falsifier applied:* it would be hollow if the annotation lied — it does not; with `logScale` false it correctly reports the linear arm. (That the linear arm is the wrong arm is D-5, a *configuration* fault, not an annotation fault; that the delivery mechanism is a native `title` on a non-focusable div is D-29.)

**S-5 · The glass posture in this subtree is the constellation's cleanest, and it survives the uplift intact.** Four glass subpaths are consumed here — `./configurator`, `./button`, `./animated-digit`, `./tooltip` — with **zero** direct reka-ui and zero shadcn copies; the one local file is a documented API-shape adapter (`ui/tooltip/Tooltip.vue:1-13`), which lane-frontend §3 independently rules *keep*. I verified all four against producer 7.0.0's export map (73 keys): **all four survive**. *Falsifier applied:* I specifically hunted for a hidden break — `AnimatedDigit` drops `mode` and `damping` from its props at 7.0.0 (present at 4.0.0 `dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts`, absent in `glass-ui/src/components/animated-digit/AnimatedDigit.vue:38-49`); this callsite passes neither, so the removal is silent here. No member-level removal from `CHANGELOG.md §7.0.0` touches it either (`ButtonVariants` goes, but this file imports the component, not the CVA).

**S-6 · [second pass] `:default-open="false"` costs *zero* phantom tab stops — the collapsed subtree is genuinely `inert`, not merely clipped.** The 4.0.0 region carries `role="region"` + `:aria-hidden="!open"` + `:inert="!open || undefined"` (compiled region prop array `["id","aria-hidden","inert","data-state"]`), so the 40 rows, the expand button and the canvas leave both tab order and the a11y tree while collapsed. Given D-3 (a hover-only detail layer on 40 rows), this is the difference between "hard to reach" and "a 40-item keyboard trap in a collapsed panel." *Falsifier applied:* the standard failure mode here is `aria-hidden` **without** `inert` (the aria-hidden-focus violation) or a `0fr` grid that only clips visually. Both were checked against the shipped artifact; `inert` is present in the installed 4.0.0 bundle, not merely in the 7.0.0 source. Independently corroborated by `lane-docs.md:433`. *(This is also precisely the fact that falsifies the e2e premise in D-10 — the same evidence charges a defect and earns a superlative.)*

**S-7 · [second pass] The numeric columns are tabular + monospaced, so 40 concurrent damped numerals do not shimmer.** `CoefficientsSpectrum.vue:86` (index) and `:102` (amplitude) both carry `fira-code tabular-nums`, and `AnimatedDigit` adds `tabular-nums` of its own (compiled root class `"animated-digit tabular-nums"`). Because S-2's damping walks each value through many intermediate strings, proportional figures would make the right-aligned column jitter horizontally every frame, on 40 rows at once. *Falsifier applied:* the obvious counter-hypothesis is that the fixed cell widths are *too tight* and trade jitter for clipping. I computed both (A-2, §5 item 7): the index cell is safe at the app's harmonic ceiling and the amplitude cell is safe below \|amplitude\| = 10⁵. The pairing of fixed widths with tabular figures is deliberate and correct, not lucky.

---

## §5 — Hypotheses my own falsifiers killed (recorded, not charged)

Challenge discipline: these were live suspicions that the tree disproved. None is charged as a defect.

1. **"The DC term dominates the normalisation and flattens the whole chart."** `maxAmplitude` is `topComponents[0].amplitude` (`:43-45`) and the source sorts descending (`epicycles.py:54`), so if `c₀` (the contour centroid) were large in image-pixel units, every other bar would collapse. **Killed:** `api/services/computation.py:83-89` publishes `image_bounds` centred on the origin (`-rw/2 … rw/2`), i.e. contour coordinates are already image-centred, so `c₀` is a small residual offset, not a page-scale magnitude. Downgraded to a note: `n = 0` is a translation, not a harmonic, and the panel offers no legend distinguishing it — folded into D-21's "no unit or quantity label."
2. **"`text-muted-foreground` on the primary datum fails contrast."** Computed: light `--muted-foreground = --neutral-5 = hsl(30 22% 40%)` (`tokens/light-dark.css:88`) → L ≈ 0.144 against `--background` L ≈ 0.960 ⇒ **5.21 : 1**, comfortably AA. **Killed as a contrast claim for the full-alpha uses** (`:73, :86, :102, :129, :138`). What remains is only hierarchical — index, amplitude, count, empty copy and button label are *all* muted, so the data reads at chrome weight — and I decline to charge that as its own row because the muted-uniform choice is defensible for a dense readout. **⚠ PARTIALLY REVERSED by A-3 / D-25:** the conclusion holds at α = 1 and **fails** at the `/70` alpha the `sub` slot uses. Effective contrast over a translucent glass plate remains **UNPROVEN-NEEDS-LIVE (SS-13)**.
3. **"`<Tooltip>` around a `v-if`'d `<Button>` throws or warns."** **Killed** by reading `reka-ui/src/Primitive/Slot.ts` — the all-comment case returns cleanly. Survives only as D-19 (MINOR, waste).
4. **"`z-[var(--z-controls)]` references an undefined token."** **Killed:** `glass-ui/dist/styles/tokens/scheme-motion.css:336` `--z-controls: 20`. The tooltip problem is the overflow clip (D-7), not the token. (Same check on `--ease-standard`: defined at `scheme-motion.css:216`. Killed as a "phantom token" hypothesis; see D-17 for what actually survives.)
5. **"`last:border-b-0` orphans a hairline over the 12 px stack gap for this panel."** **Killed for this component:** `CoefficientsPanel` is the last child of `.viz-panel-left` (`VisualizationView.vue:264-274`; the `<Transition>` wrappers render no element), so it correctly takes `border-b-0`. It bites its *siblings*, not the subject. **⚠ EXTENDED by A-4 / D-28:** the reciprocal — that *this panel's conditional mount* is what makes a sibling's hairline appear and disappear — is charged.
6. **"`.configurator-section-label` is undefined because the consumer never imports the partial."** **Killed:** `web/src/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css:173` `@import "./configurator.css"`, and both tokens exist (`tokens/offsets-sizing.css:499-500`). The label does resolve at `--type-subheading` (20.4 px) / 600. *Residual observation, uncharged:* it resolves `font-family: var(--font-text)` = Plus Jakarta Sans (`tokens/scheme-motion.css:43`, `theme/bridges.css:66`), which fourier never re-points, so the panel heading is a sans in a Computer-Modern-Serif treatise. That is an app-wide token-override decision, not this component's defect — but it is the single highest-leverage one-line fix available to F.W1 and belongs in the wave spec.
7. **[second pass] "The `w-8` index cell clips at high harmonic counts."** The index column is 32 px (`CoefficientsSpectrum.vue:86`) and renders `+`/`−` plus the harmonic index (`:87`). **Killed:** the app's harmonic ceiling is **500** (`BasisSelector.vue:30` `Math.min(500, …)`, mirrored at `:165`), so the widest string is 4 chars (`"+500"`, `"−250"`) = 28.8 px at Fira Code 12 px — inside 32 px with 3.2 px of slack. No overflow is reachable through the UI. Recorded because the *neighbouring* cell (`w-16`) is not similarly safe (D-21 / A-2).

---

## §6 — F.W1 (4.0.0 → 7.0.0) ledger for this subtree

Measured against the CENSUS break surface (metric-badge ×7 files · hover-card ×2 · hover-popover ×2 · dock members ×3 · `ToastVariant`). **None of those rows touch this subtree.** What does:

| row | effect | citation |
|---|---|---|
| `lucide-vue-next` → `@lucide/vue` | **BREAKS** — 1 of the 35 rename sites lives here (`ChevronDown`, `ChevronUp`), on the same line R3-10 books as a dynamic-`:is` family | `CoefficientsSpectrum.vue:20`, `:132`; glass 7.0.0 `peerDependencies["@lucide/vue"]: "^1.16.0"`; lane-frontend §5; intake `R3-10` |
| `./configurator`, `./button`, `./animated-digit`, `./tooltip` | **SURVIVE** — all four present in 7.0.0's export map (73 keys) | producer `package.json` exports (verified) |
| `ConfiguratorLayer` chevron | **IMPROVES** — D-4's snap is cured by `transition-disclosure` on the `rotate` longhand, with a PRM-safe ease alias | `glass-ui/src/styles/utilities/btn.css:55-70`; `ConfiguratorLayer.vue:139` |
| `.configurator-layer` geometry | ~~**IMPROVES**~~ → **[A-5] CONDITIONAL — BREAKS AS-IS.** The card grammar *is* the right primitive for a gapped column, but 7.0.0 ships an adjacent-sibling **fusing** pair that assumes the layers touch. In `.viz-panel-left` they are DOM-adjacent yet 12 px apart, so the uplift produces flat-ended rectangles floating in air. **See D-23.** The improvement is real but is *conditional on removing `gap: .75rem` in the same wave.* | glass 4.0.0 compiled class vs `ConfiguratorLayer.vue:100-104` + `configurator/styles.css:126-135`; `VisualizationView.vue:363-366` |
| body inline padding | **RE-RESOLVES, and narrows** — 7.0.0 drops literal `px-3` (12 px) for `--configurator-pad-inline` = **1.25rem / 20 px**, declared on `:root` (so it resolves here; no missing-relay break). Content width 320 → 304 px, which *worsens* D-24. Re-tune D-16's spacing after the bump, not before | `ConfiguratorLayer.vue:167-175`; `configurator/styles.css:24,141-145` |
| `AnimatedDigit` props | **NO-OP** — `mode`/`damping` removed at 7.0.0; this callsite passes neither | 4.0.0 `.d.ts` vs `glass-ui/src/components/animated-digit/AnimatedDigit.vue:38-49` |
| `role="region"` naming + heading wrapper | **UNFIXED at 7.0.0** ⇒ D-14 is a glass-BH relay, not an uplift row | `ConfiguratorLayer.vue:155-166` |
| `sub` mono register + `/70` alpha | **UNCHANGED at 7.0.0** ⇒ D-12 is a fourier convention to re-ground and D-25's contrast failure survives the uplift | `ConfiguratorLayer.vue:126-131` |
| header-actions slot | **ABSENT at both pins** — `__VLS_Slots` declares `default` only. The consumer annotates the gap twice in its own siblings (`BasisSelector.vue:3-4`, `ContourSettings.vue:3-4`). ⇒ D-26's cure is a **glass-BH relay** row | `ConfiguratorLayer.vue.d.ts` `__VLS_Slots` |

---

## §7 — Corpus reconciliation

**Cited where I overlap.**
- **R3-10** (intake lane, `lane-fourier-r3-r6.md:84`, TRUE, CARRY→F.W4): two dynamic-`:is` families were dropped between registries, one of them `CoefficientsSpectrum.vue:132`. **Confirmed live** at exactly that line: `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. It is inside my D-19's `<Tooltip>`/`<Button>` block; F.W4's exhaustiveness budget and this challenge point at the same six lines.
- **R3-7a** (`:79`, CARRY→F.W3): the `ui/tooltip` migration budget of 35 callsites / 9 consumers counts **CoefficientsSpectrum 2**. Confirmed — `:80` and `:124`. Both are implicated here: `:80` is D-3's keyboard-unreachable trigger and `:124` is D-19's trigger-less root. **The F.W3 migration must not be a mechanical barrel swap** — swapping `@/components/ui/tooltip` for `@mkbabb/glass-ui/tooltip` preserves both defects verbatim, because both live in how the trigger is *composed*, not in which module it comes from.
- **CENSUS §3a / lane-frontend §5** — the tri-package deadlock and the break surface: confirmed, and narrowed for this subtree in §6 (lucide only, plus two *behavioural* rows no keyset diff can surface — D-23, D-24).
- **CENSUS §3c `inv-33`** ("all runtime colour derives from value.js"): D-8 is a concrete, measurable instance — a hand-rolled `hsl()` ramp duplicated across two files, bypassing the repo's own `--viz-*` resolver.
- **lane-docs.md:433** (`inert` on collapsed `ConfiguratorLayer`, SATISFIED-UPSTREAM/ADOPT-NOW): confirmed **against the installed artifact**, not merely the changelog. Promoted to superlative S-6 and used as D-10's falsifier.
- **lane-frontend.md:562** ("No rAF" in FrequencyGraph): confirmed — `grep -n "requestAnimationFrame" FrequencyGraph.vue` → empty; one deep watcher at `:157`. Recorded because D-31 sits adjacent to it.

**Where I contradict the corpus.**
- **lane-frontend §4, candidate-shadow table** lists `visualization/CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` against `./metric-stack` (4.0.0) → `./metric` (7.0.0). **I contradict this on the tree.** Neither panel imports `./metric-stack`, `./metric-cell` or `./metric-badge` (`grep -rn "metric" …CoefficientsPanel.vue …EqCoefficientsPanel.vue …CoefficientsSpectrum.vue` → empty), and the surface is not a metric stack: it is a 401-row ranked bar spectrum with a canvas graph, per-row tooltips and an expand control. `Metric` is a labelled value display. The correct producer comparison for this subtree is `./fourier-field` + `./fourier-math` — the SOFT-SHADOW row lane-frontend itself raises for `CoefficientsSpectrum` ("same family (spectrum/`BasisComponent`)", §4), and whose prop table takes `spectrum: readonly BasisComponent[]`, the very type this panel passes. **Recommend F.W3/F.W4 strike the `metric-stack` row for these two panels and fold them into the `FourierField` convergence study.** *Partial concession (D-26):* a `Metric`-family primitive **is** wanted here — but in the layer **header** as a collapsed-state count/status badge, not as the body. That is a different row than the one lane-frontend wrote, and it is blocked on a producer gap (no header-actions slot, §6 last row).
- **lane-frontend §5 uplift table** carries no `./configurator` row. **Correct on the keyset** (the key survives) and **incomplete on behaviour**: D-23 and D-19-of-§6 are silent visual breaks at this exact site that no keyset diff can surface. The lane's own recurrence rule ("the keyset is load-bearing and wins") is right about *imports* and blind to *rendered grammar*. F.W1 needs a visual gate, not only `vue-tsc` — and CENSUS §3a already records that vitest is ABSENT and the only gates are `vue-tsc` + 29 single-chromium Playwright tests.
- **`e2e/visualization-ux.spec.ts:103-104`** asserts *"the app consumes the PUBLISHED `@mkbabb/glass-ui@^2.0.0`"* and that the layer *"omits `inert`"*. Both are false against the installed tree (D-10). This is a contradiction with a *product artefact*, not with the corpus, and it is the reason the panel's default state carries no a11y evidence.

---

## §8 — Tally

| severity | count | ids |
|---|---:|---|
| BLOCKER | **2** | D-1, D-2 |
| MAJOR | **13** | D-3 … D-10, D-22 … D-26 |
| MINOR | **15** | D-11 … D-21, D-27 … D-30 |
| INFO | **1** | D-31 |
| **defects total** | **31** | |
| superlatives | **7** | S-1 … S-7 |
| killed by own falsifier (uncharged) | 7 | §5 |

**Livable-only residue for SS-13:** D-7 exact clip width · D-8 effective backdrop behind the glass plate · D-11 wheel-trap behaviour · D-21 `w-16` overflow above \|amplitude\| = 10⁵ · D-22 rendered half (structural half is source-confirmed) · §5 item 2 muted-on-glass contrast.

---

## §9 — ADDENDA (second independent D-axis pass, folded whole)

### The geometry the addenda rest on

Resolved statically, desktop (`lg`) arm:

```
<Configurator scroll-mode="auto">                        VisualizationView.vue:194
  aside column = lg:grid-cols-[…_minmax(280px,360px)]     glass 4.0.0 Configurator render
                 NO --configurator-aside-{min,max} override exists
                 (grep -n "configurator-aside" VisualizationView.vue → empty)      → 360 px
  └ FadingScroll axis="y" .configurator-controls                                   ← Y-SCROLLER #1
    └ .viz-panel-left-wrap  max-width:480px  (never binds at lg)   :351-359
      └ .viz-panel-left     padding:.5rem; gap:.75rem              :363-371         → 344 px
        ├ ImageUpload   .cartoon-card                    (NOT a ConfiguratorLayer)
        ├ BasisSelector    .configurator-layer  border-b
        ├ ContourSettings  .configurator-layer  border-b
        └ CoefficientsPanel .configurator-layer border-b last:border-b-0
          └ .configurator-layer-body  px-3 py-2                                     → 320 px
            └ CoefficientsSpectrum .pt-1
               ├ #graph → FrequencyGraph   canvas 691 px wide     (D-24)
               ├ count row "n / N"                                 (D-13)
               ├ list .max-h-[300px].overflow-y-auto               (D-11)  ← Y-SCROLLER #2
               └ expand Button                                     (D-19)
```

Two numbers do the work below: **320 px** of content width and **691 px** of canvas.

### D-22 · MAJOR — the list-entry motion the file documents cannot apply

`CoefficientsSpectrum.vue:79-122` wraps the rows in `<TransitionGroup name="coeff-list">` and `:144-163` defines five `.coeff-list-*` rules. But the direct children of the `TransitionGroup` are no longer elements — they are `<Tooltip>` **components** (`:80`), and that component's root resolves to a **Fragment**:

```
ui/tooltip/Tooltip.vue:26            <GlassTooltip>   → component root
glass-ui TooltipProvider-B3MkB_8P.js → reka TooltipRoot → component root
reka-ui/dist/Tooltip/TooltipRoot.js  → PopperRoot      → component root
reka-ui/dist/Popper/PopperRoot.js:16 → renderSlot(_ctx.$slots, "default")
```

…and that slot holds **two** children — `TooltipTrigger` plus a *portalled* `TooltipContent` (glass's `TooltipContent` wraps `TooltipPortal`; compiled setup returns `n(u(p), …)` where `p = TooltipPortal`, `dist/TooltipProvider-B3MkB_8P.js`). A two-child `renderSlot` root is a Fragment. Vue's `renderComponentRoot` propagates `vnode.transition` only onto element/component roots (`isElementRoot`); a Fragment root emits the dev warning *"Component inside `<Transition>` renders non-element root node that cannot be animated"* and applies no transition classes.

This is a regression introduced by the refactor the docblock celebrates: `:12-17` records that B.W2.c lifted the bespoke `:hover` tooltip to the glass primitive — which is exactly the change that interposed a Fragment-rooted component between `TransitionGroup` and the row element. `.coeff-list-move` is doubly dead: Vue 3's `TransitionGroup.onBeforeUpdate` filters `prevChildren` on `child.el instanceof Element`, and a Fragment-rooted component vnode's `el` is the fragment's anchor text node.

**Interaction with D-9.** If D-22 holds, the enter/leave half of D-9's PRM exposure is moot (dead CSS cannot violate PRM) while the `transition-all` half at `:91` — on a real element — stands unchanged. D-9's *precept-violation* claim is unaffected either way.

**Falsifier.** The transitions would apply if the `v-for` sat on the `.coeff-row` `div` with the `<Tooltip>` inside it, or if reka's `TooltipContent` rendered inline (single-child slot ⇒ element root). Neither holds. The **structural** claim is source-confirmed; the **rendered** claim (no fade/slide observed, warning printed) is **UNPROVEN-NEEDS-LIVE (SS-13)** — one page load settles it. *Note the falsifier that ran and saved a wrong claim:* I first suspected a `getBoundingClientRect` TypeError on reorder; the `instanceof Element` guard makes that unreachable, so no crash is charged.

### D-23 · MAJOR — 7.0.0's adjacent-sibling card **fusing** breaks in this gapped column *(contradicts §6's original "IMPROVES")*

7.0.0 rewrites the layer from a flush hairline block to a concentric **card**: `'configurator-layer border'` (all-side) plus radius/tint/clip from `configurator/styles.css`, plus a fusing pair (`styles.css:126-135`):

```css
.configurator-layer:has(+ .configurator-layer) { border-end-*-radius: 0; border-bottom-width: 0; }
.configurator-layer + .configurator-layer      { margin-block-start: 0; border-start-*-radius: 0; }
```

Those rules assume the layers are DOM-adjacent **and visually touching**. In `.viz-panel-left` they are DOM-adjacent — Vue's `<Transition>` adds no wrapper, and a false-`v-if` comment placeholder does not break the `+` combinator — but they are **12 px apart** (`gap: .75rem`, `VisualizationView.vue:366`). After uplift: `BasisSelector` and `ContourSettings` render with squared bottom corners and **no bottom border**; `ContourSettings` and `CoefficientsPanel` with squared top corners; `margin-block-start: 0` fights a `gap` it cannot see. Three flat-ended rectangles floating in air — a worse reading than the 4.0.0 hairline it replaces.

And the `:has(+ …)` match is itself conditional on **this panel's mount** (`VisualizationView.vue:273`), so a sibling's corner radius becomes a function of whether a computation has been run — the 7.0.0 form of D-28.

**This is not in the corpus**, and it is silent: no typecheck, no unit test (vitest ABSENT), and 29 single-chromium Playwright specs of which the three a11y keystones are `test.fixme` (D-10).

**Falsifier.** Dropping `gap: .75rem` and letting the layers stack flush makes the 7.0.0 rules correct — and simultaneously cures D-28 today. If the layers were *not* DOM-adjacent, `+` would not match and the uplift would be clean; they are (`VisualizationView.vue:264-274`, three `<Transition>`-wrapped layers in sequence, wrappers rendering no element). **Amendment A-5 rewrites the §6 row accordingly: the geometry change is an improvement *conditional on the host removing the gap in the same wave*, not an unconditional one.**

### D-24 · MAJOR — `:max-bars="40"` puts a 691 px canvas in a 320 px column; 22 of 40 bars are off-screen behind a 4 px scrollbar

`CoefficientsPanel.vue:20` overrides the primitive's default (`FrequencyGraph.vue:11`, `maxBars: 60`) with 40. Width is computed at `:33-36`:

```
canvasWidth = max(n·(BAR_W + BAR_GAP) + BAR_GAP + 8, 100)
            = 40·(14 + 3) + 3 + 8 = 691 px          (BAR_W = 14, BAR_GAP = 3 at :25-26)
```

Available content width (geometry block above) = 360 − 16 (`.viz-panel-left` padding) − 24 (`px-3`) = **320 px** ⇒ ⌊(320 − 11)/17⌋ = **18 of 40 bars visible; 22 hidden.** The only affordance for the hidden 55 % is a 4 px scrollbar (`:240-242` `::-webkit-scrollbar { height: 4px }`, `scrollbar-width: thin`) — no edge fade, no mask, no count. The app *has* the primitive: glass `./fading-scroll`, present at 4.0.0 and 7.0.0, and used by the enclosing `Configurator` on its own y-axis; `FrequencyGraph` does not use it.

Second order: `.viz-panel-left-wrap { max-width: 480px; margin: 0 auto }` (`:351-359`) declares a design band the chassis can never grant at `lg` — the aside caps at 360 px and no `asideWidth` prop is passed. The graph's 40-bar geometry appears proportioned for a column that does not exist; even at 480 px it would overflow (480 − 16 − 24 = 440 px < 691 px).

**Post-uplift:** `--configurator-pad-inline` (20 px) replaces `px-3` (12 px) ⇒ 320 → **304 px** ⇒ 17 bars. A measurable regression on an already-broken proportion (§6, amended).

**Falsifier.** No overflow requires `BAR_W + BAR_GAP ≤ (320 − 11)/40 = 7.7 px` (it is 17 px) or `maxBars ≤ 18` (it is 40). The `minmax(280px, 360px)` band is the compiled 4.0.0 default and is *not* overridden — grep is empty. Only the exact rendered bar count at non-`lg` breakpoints is **UNPROVEN-NEEDS-LIVE (SS-13)**; at `lg` the arithmetic is closed.

### D-25 · MAJOR — the `sub` slot fails WCAG AA in **both** colour arms *(reverses §5 item 2 for the α<1 case)*

`CoefficientsPanel.vue:14` passes `sub`, which the primitive renders as `text-micro font-mono text-muted-foreground/70`. `--type-micro = 0.6875rem` = **11 px** (`typography/scale.css:87`) — not large text. Compositing `--muted-foreground` at α = 0.70 over the plate:

| arm | fg token | plate | composited sRGB | contrast |
|---|---|---|---|---:|
| light | `hsl(30 22% 40%)` (`color-radius.css:45`) | `--card: hsl(36 48% 97%)` (`:72`) | `rgb(162, 146, 129)` | **≈ 2.85 : 1** |
| dark | `hsl(34 14% 62%)` (`dark-arm.css:47`) | `--card: hsl(24 8% 16%)` (`:64`) | `rgb(133, 124, 113)` | **≈ 3.46 : 1** |

Both below the 4.5 : 1 AA floor for normal text. The token's own comments advertise 5.21 : 1 / 7.64 : 1 — those are the **unblended** figures, and they are exactly what §5 item 2 computed and correctly cleared. The `/70` in the primitive's markup is what breaks it, and §5 item 2 did not test that arm. Charged here; §5 item 2 amended (A-3) rather than deleted, because its conclusion remains correct for the five full-alpha uses it examined.

**Falsifier.** The ratio passes if the alpha is dropped (light ≈ 5.2 : 1) or the size exceeds the large-text threshold (24 px, or 18.66 px bold). Neither is available to the consumer — the only lever it holds is *not passing `sub`*, which is precisely the recommendation given that the string is informationally empty (D-29). Unchanged at 7.0.0 (`ConfiguratorLayer.vue:126-131`), so the uplift does not cure it.

### D-26 · MAJOR — the collapsed header carries no state, and this is the one panel in the column that is an *output*

`:default-open="false"` means the shipped default rendering is: `Coefficients` · `Fourier spectrum` · chevron. No count, no "computing", no error mark, no leading amplitude. A user who has just dispatched a 500-harmonic decomposition cannot tell from the panel whether it succeeded, failed, is running, or returned three components — they must open it, and then D-2 lies to them.

The sibling asymmetry is the argument: `BasisSelector.vue:2` is `:default-open="true"`; `ContourSettings.vue:2` and this panel are `false`. The two `false` layers are *inputs* (settings a user seeks out). This one is the column's only **output** — the sole surface reporting what the computation produced — and it is the one hidden behind a closed disclosure with a mute header. S-3 remains correct that *collapsing* is right for 401 rows; what is wrong is collapsing to a header that reports nothing.

**Falsifier.** The header would be self-sufficient if `ConfiguratorLayer` exposed a header-actions slot. It does not — `__VLS_Slots` declares `default` only, and the consumer's own siblings say so out loud (`BasisSelector.vue:3-4`, `ContourSettings.vue:3-4`: *"ConfiguratorLayer has no header-actions slot, so the affordance lives at the top of the layer body"*). ⇒ the cure is a **glass-BH relay row**, and it is the honest form of the `metric-stack` row §7 otherwise contradicts: a `Metric` badge in the header, not a metric stack in the body. The `sub` slot *is* available today and is currently spent on a synonym (D-29), so a zero-producer-change partial cure exists.

### D-27 · MINOR — identical content, two disclosure chassis, one per route

| route | wrapper | chrome |
|---|---|---|
| visualization | `CoefficientsPanel.vue:14` | glass `ConfiguratorLayer` — `.configurator-section-label` (20.4 px / 600 / `--font-text`), `px-3 py-2`, `border-b` hairline, no container |
| equation | `EqCoefficientsPanel.vue:12-14` | local `ui/CollapsibleSection.vue` inside `.cartoon-card px-3 py-2` |

The *body* was correctly extracted to `CoefficientsSpectrum` (docblock `:2-10`); the *chrome* was then allowed to diverge, so the same rows carry two header type registers, two plate materials and two collapse mechanics depending on route. `lane-frontend.md:140,180` records both hosts and the shared body; nothing in the corpus records the chrome split. **Falsifier:** if `CollapsibleSection` re-exported `ConfiguratorLayer` this would be cosmetic — it is a separate local SFC and `EqCoefficientsPanel.vue:2` imports it, not the primitive.

### D-28 · MINOR — this panel's conditional mount makes a *sibling's* hairline appear and disappear *(the reciprocal §5 item 5 left uncharged)*

`last:border-b-0` is `:last-child`, and comment placeholders from a false `v-if` do not count for it. So: panel mounted ⇒ `CoefficientsPanel` is last ⇒ **`ContourSettings` gains a bottom hairline**; panel unmounted ⇒ `ContourSettings` is last ⇒ **its hairline vanishes.** An unrelated component's border geometry is a function of whether a computation has been run — and the trigger is this panel's own mount guard (`VisualizationView.vue:273`). §5 item 5 correctly killed the claim that *this panel* suffers an orphan hairline; it did not test the direction in which this panel is the *cause*. Compounding: with `gap: .75rem`, every layer's `border-b` terminates in 12 px of air, so the flush-stack grammar the class encodes is violated for all three layers regardless (see D-23 for the 7.0.0 form). **Falsifier:** removing the gap, or moving the conditional to a wrapper that always renders, kills it. Neither holds.

### D-29 · MINOR — label and sub are a tautology, spending the only free header slot on a synonym

`label="Coefficients"` + `sub="Fourier spectrum"` — the sub restates the label. The siblings use the slot to name the layer's *contents*: `sub="basis & resolution"` (`BasisSelector.vue:2`), `sub="edge extraction settings"` (`ContourSettings.vue:2`). Given D-26 (no state on the collapsed header) and D-25 (the slot is also a contrast failure), the string is paying two costs to carry zero information. A sub that reported state — `"401 harmonics · top 40"` — would discharge part of D-26 with no producer change. **Falsifier:** if `sub` were the documented "token reference" register carrying a genuine token name, the tautology reading would be wrong; it carries prose (D-12), and the prose is a synonym of the label.

### D-30 · MINOR — the empty copy is an imperative with no local affordance, in vocabulary the panel does not otherwise use, and diverges from its own twin

`empty-text="Compute epicycles to see coefficients"` (`CoefficientsPanel.vue:15`). Three problems: the compute trigger lives elsewhere (`ImageUpload` / `ContourSettings`), so the imperative names an action the panel cannot offer; "epicycles" appears nowhere else in this panel's vocabulary (which says Coefficients / Fourier spectrum / Amplitude / Phase / Re / Im); and the equation route passes `"Compute to see coefficients"` (`EqCoefficientsPanel.vue:14`) — the shared component's own default (`CoefficientsSpectrum.vue:28-31`) — for the identical state. Either the divergence is meaningful (then the default is wrong) or it is not (then the override is noise). Reading with D-2: the one state in which this string is reachable is mid-compute, where every word of it is wrong.

### D-31 · INFO — canvas lifecycle and draw-loop hygiene (adjacent to the design surface, charged at INFO)

`FrequencyGraph.vue:2` imports `onUnmounted` and never calls it. There is no `devicePixelRatio` or resize listener: `draw()` runs at mount (`:159`) and on prop change (`:157`) only, so moving the window to a different-DPR display or resizing the aside leaves a stale raster at the old scale — on a canvas already 2.2× wider than its viewport (D-24). Separately, `getComputedStyle(canvas).getPropertyValue("color") || "#888"` is read **per bar inside the draw loop** (`:108`) — 40 forced style reads per draw. The colour source is correct and token-driven (`text-muted-foreground` on the canvas, `:179`); only its placement is not. Charged INFO because the axis is design and the visible symptom (stale raster) requires a device change to observe — **UNPROVEN-NEEDS-LIVE (SS-13)**.

---

## §10 — Amendments to §§1–7 from the second pass

| id | target | change |
|---|---|---|
| **A-1** | **D-2** (BLOCKER) | Adds consequence **(3)**: the *re-compute* failure path leaves `epicycleData` populated (`workspace.ts:301-305` never nulls it), so a failed recompute silently presents the previous run as current. The first pass covered only the first-compute path, where the panel unmounts. The BLOCKER severity is unchanged; its blast radius is larger. |
| **A-2** | **D-21** (MINOR) | Bounds the `w-16` overflow hypothesis: Fira Code 0.6 em ⇒ 8.8 chars at 64 px, so clipping begins only at \|amplitude\| ≥ 10⁵. Still SS-13 for whether that regime is reachable with real contour coordinates; no longer an open-ended claim. |
| **A-3** | **§5 item 2** (killed) | **Partially reversed.** The full-alpha computation (5.21 : 1) stands and the row stays killed for the five sites it examined. The `text-muted-foreground/70` arm in the `ConfiguratorLayer` `sub` markup was not tested and **fails** (≈2.85 : 1 light / ≈3.46 : 1 dark) ⇒ charged as **D-25**. |
| **A-4** | **§5 item 5** (killed) | **Extended, not reversed.** Correctly killed for the subject (this panel *is* `:last-child` and takes `border-b-0`). The reciprocal — this panel's conditional mount toggling a *sibling's* hairline — is charged as **D-28**. |
| **A-5** | **§6, `.configurator-layer` geometry row** | **Reversed from "IMPROVES" to "CONDITIONAL — BREAKS AS-IS."** 7.0.0's `:has(+ .configurator-layer)` / `+` fusing pair assumes touching siblings; `.viz-panel-left` gaps them by 12 px ⇒ flat-ended cards floating in air. The card grammar is still the right primitive; the improvement is contingent on removing `gap: .75rem` in the same wave. See **D-23**. |

**Net effect of the second pass:** +10 defects (D-22…D-31: 5 MAJOR, 4 MINOR, 1 INFO), +2 superlatives (S-6, S-7), +1 killed hypothesis (§5 item 7), 1 corpus contradiction sharpened (lane-frontend §5 is silent on `./configurator` *behaviour*), and 1 self-reversal (§6 geometry). **21 → 31 defects; 5 → 7 superlatives; BLOCKER count unchanged at 2.**

---

*Read-only audit. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` untouched; this file is the only write.*
