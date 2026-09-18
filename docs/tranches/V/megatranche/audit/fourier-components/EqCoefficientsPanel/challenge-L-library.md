claude-opus-5[1m]

# CHALLENGE — `EqCoefficientsPanel` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EqCoefficientsPanel.vue` (17 lines, read whole)
**Axis** L — code correctness, leaks/teardown, wrong types, duplication, colocation, module size (Goldilocks), composable contracts, error postures, dead code; the viz render path where this component touches it; the R5-7 template-loop invisibility class.
**Posture** target assumed DEFECTIVE until the tree proved otherwise. Eight hypotheses were raised and killed by their own falsifiers (§6) — they are recorded, not buried.
**Method** static + source-derived only. No browser tooling. Read-only across three repos: `fourier-analysis` (product), `glass-ui` (producer, HEAD), `fourier-analysis/web/node_modules/{@mkbabb/glass-ui@4.0.0, reka-ui@2.9.10, @mkbabb/keyframes.js, tw-animate-css}` (the *installed* substrate — the authority for what actually runs). Livable-only claims are marked UNPROVEN-NEEDS-LIVE and queued for SS-13 (§8).
**Write scope** this file only. No product source touched in any repo.

## §0 — Verdict and counts

| | |
|---|---|
| defects | **19** (0 BLOCKER · 4 MAJOR · 10 MINOR · 5 INFO) |
| blockers | **0** — declared, not defaulted; justification below |
| superlatives | **5** |
| hypotheses falsified | 8 (§6) |
| corpus rows corroborated | 7 · contradicted **2** (§7) |

**Why zero BLOCKERs.** The two candidates were tested and both failed the ship-stopping bar. (i) `EQC-L-01` truncates the spectrum below the route's own default cardinality — but the `40 / 41` readout is numerically honest, so the surface misleads by omission, not by lying. (ii) `EQC-L-07` makes 12–41 tooltips keyboard-unreachable — a real WCAG 2.1.1 failure, but the tooltip content is supplementary (every field it shows except phase is also on the row), and primary a11y adjudication belongs to the A axis. Manufacturing a BLOCKER here would fail L-18 in the other direction.

**One-line verdict.** The 17 lines are individually clean — correct types, `import type` honored, minimal prop surface, lazy by construction — and the component is nonetheless *wrong at both of its seams*: upward it hosts a shared child whose display ceiling (40) is smaller than the route's default output (41), downward it adopts the exact collapsible primitive the producer's own docblock says it built `ConfiguratorLayer` to avoid, diverging from its sibling host for no recorded reason. It is a good component in a bad position.

---

## §1 — Defects owned by `EqCoefficientsPanel.vue` (its 17 lines and its wiring)

### EQC-L-01 · MAJOR · the panel structurally cannot show the spectrum it is titled after

The panel forwards `components` whole (`EqCoefficientsPanel.vue:14`) into a child whose display ceiling is a hard-coded literal:

```
CoefficientsSpectrum.vue:37-39
    props.components.slice(0, expanded.value ? 40 : 12)
```

The equation route's default harmonic count is 20 (`EquationView.vue:28`), and the backend emits `n=0` plus `±k` for `k = 1..N` (`src/fourier_analysis/symbolic/integration.py:126-127`) — that is **2N+1 = 41** components. `41 > 40`. At the app's own out-of-the-box setting, exactly one coefficient is permanently unreachable: the readout renders `40 / 41` (`CoefficientsSpectrum.vue:73-75`), the button reads "Show less", and there is no further affordance. At the API ceiling (`n_harmonics ≤ 200`, `api/models/equations.py:20`) the array is 401 and **90 % is unreachable**.

`EqCoefficientsPanel` is the only place the equation route can intervene, and it passes no cap — because the child exposes none. Contrast the sibling, which *does* reach into the render path to set a cap (`visualization/CoefficientsPanel.vue:20`, `:max-bars="40"` — for a different component, `FrequencyGraph`).

**Falsifier** — (a) a route that pre-truncates before the prop: `EquationView.vue:59-67` maps the full `result.coefficients`, no slice; (b) a `maxRows`/`expandTo` prop on the child: `grep -n 'slice(0,' CoefficientsSpectrum.vue` returns exactly `:38`, and its prop block (`:24-33`) declares only `components` and `emptyText`; (c) a backend that truncates `coefficients`: `api/routers/equations.py:124` serializes `result["terms"]` whole — budget truncation touches only the LaTeX (`simplification.py:15-31`). All three fail. Claim stands.

### EQC-L-02 · MAJOR · adopts the collapsible primitive the producer documented as the one to avoid, and diverges from its own sibling host

Two hosts wrap the same shared child in two different collapsible systems with two different prop vocabularies:

| route | host | chrome | vocabulary |
|---|---|---|---|
| visualization | `visualization/CoefficientsPanel.vue:14` | glass-ui `ConfiguratorLayer` | `label` / `sub` / `:default-open` |
| equation | `EqCoefficientsPanel.vue:13` | local `ui/CollapsibleSection.vue` → glass-ui `Collapsible` → reka-ui `CollapsibleRoot`+`CollapsibleContent` | `title` / `subtitle` / `:default-open` |

Both pass the identical label pair ("Coefficients" / "Fourier spectrum") and the identical `:default-open="false"`. The divergence is pure accident of authorship — and it runs *against a written producer warning*. `glass-ui/src/components/configurator/ConfiguratorLayer.vue:18-33`:

> "Recursion-free reveal … A JS-watcher collapsible (a reka-ui `<Collapsible>` + `<CollapsibleContent>` height transition) is **deliberately NOT used**: under Lighthouse's strict cold-load discipline … reka-ui's `<Presence>` + `<CollapsibleContent>` height-measurement watchers — `getComputedStyle(node).animationName` + `getBoundingClientRect()` reads inside a `watch([isOpen, presentRef.value?.present])` callback — form a non-convergent loop that trips Vue's 100-iteration recursion cap on `<Configurator>`."

`EqCoefficientsPanel` sits on exactly that mechanism, and `CollapsibleSection.vue:60-65` supplies precisely the `animation-name` those watchers read.

**Falsifier** — the producer scopes the hazard to `<Configurator>` (many stacked layers under CPU+network throttling). A single collapsible in a side panel may never approach the 100-iteration cap, so the *recursion consequence* is **UNPROVEN-NEEDS-LIVE** (§8 U-1). What survives statically and unconditionally is the divergence itself: two systems, two vocabularies, one shared child, zero recorded rationale — proven by the two files above.

**Disposition note (this changed during the audit).** Converging the equation route onto `ConfiguratorLayer` used to import a booked serious a11y violation — `web/e2e/visualization-ux.spec.ts:117-133` books collapsed `ConfiguratorLayer` bodies as `role="region" aria-hidden="true"` with a focusable trigger inside, "it omits `inert`", two keystones `test.fixme`'d pending "the glass-ui `inert` release". **That comment is stale against the installed dist.** `node_modules/@mkbabb/glass-ui/dist/useConfiguratorState-kiIlun8I.js` renders the body as `role: "region", "aria-hidden": !open, inert: !open || void 0` — `inert` is live at 4.0.0. The convergence is therefore unblocked *today*, and two disabled a11y keystones are probably re-enablable (§7 X-2).

### EQC-L-03 · MINOR · the `empty-text` prop is dead, and its value duplicates the child's own default

`empty-text="Compute to see coefficients"` (`EqCoefficientsPanel.vue:14`) is byte-identical to the child's `withDefaults` default (`CoefficientsSpectrum.vue:31`) — so it communicates nothing even if reached. It is not reached: the sole consumer gates the panel on non-emptiness (`EquationView.vue:213`, `v-if="components.length"`), and `slice(0, 12)` of a non-empty array is non-empty, so `topComponents.length` is always truthy and the child's `v-else` empty state (`:138-140`) is unreachable through this host. Dead prop, dead branch, redundant literal.

**Falsifier** — a second consumer of `EqCoefficientsPanel` that does not gate: `grep -rn 'EqCoefficientsPanel' web/src` returns exactly two hits, the import and the one gated callsite. Claim stands.

### EQC-L-04 · MINOR · the same shared child has different state semantics depending on which host mounts it — and this host is the one that loses state

`:default-open="false"` (`EqCoefficientsPanel.vue:13`) plus reka-ui's unmount-on-hide default means the whole `CoefficientsSpectrum` subtree is destroyed on collapse, discarding `expanded` (`CoefficientsSpectrum.vue:35`). A user who clicks "Show more (41 total)", collapses the section, and reopens it silently gets 12 rows back. The sibling host does **not** behave this way: `ConfiguratorLayer` keeps its body mounted-and-inert, so on the visualization route the identical child *retains* `expanded`.

Full chain, all source-derived:
1. `CollapsibleSection.vue:34` renders glass-ui `Collapsible` without passing `unmountOnHide`.
2. glass-ui's wrapper declares `unmountOnHide: { type: Boolean }` with no `default` (`dist/CollapsibleContent-C_s6fG7r.js:12`) — Vue Boolean-coerces the absent prop to `false`.
3. That `false` is **not** forwarded: reka-ui's `useForwardProps` builds its output only from keys present in `vm.vnode.props` (`node_modules/reka-ui/src/shared/useForwardProps.ts:43,49`), and the consumer never assigned `unmountOnHide`.
4. reka-ui's own `withDefaults(..., { unmountOnHide: true })` therefore applies (`src/Collapsible/CollapsibleRoot.vue:42`) — the content unmounts.

**Falsifier** — if `useForwardProps` forwarded declared-but-unassigned props, glass-ui's coerced `false` would win, the content would persist, and this defect would invert into an eager-mount cost (and would kill superlative S-1). I read the implementation; it filters. Claim stands as written.

### EQC-L-05 · INFO · the adapter declines the adaptation — but the obvious cure is falsified

Seventeen lines, one consumer, zero logic: it re-declares the child's prop verbatim and adds two nodes. The impedance mismatch it appears to exist for — `FourierTermDTO` → `BasisComponent`, two names (`n` vs `index`) and two shapes (`coefficient_re/_im` vs `coefficient: [re, im]`) for one datum — is left in the 469-line `EquationView.vue:59-67`.

**Falsifier that reduced this from MAJOR to INFO** — moving the map into the panel would not remove it from the view: `EquationView.vue:137` also feeds `components` to `simplifyCoefficients`, whose `BasisComponent[]` signature (`lib/equation/api.ts:33-44`) is fixed by a *second* caller on the other route (`visualization/EquationPanel.vue:45`). The mapping is cross-route substrate, not panel-private. What remains is only an aesthetic observation, filed at INFO.

### EQC-L-06 · INFO · this panel's closure carries a measurable slice of the booked uplift budget

`cartoon-card` (`EqCoefficientsPanel.vue:12`) is 1 of the 25 sites of the locally-held `@utility` resurrection carry (census §3a). `lucide-vue-next` appears at `CollapsibleSection.vue:4` and `CoefficientsSpectrum.vue:20` — 2 of the 35 sites booked for the `@lucide/vue` rename. The `ui/tooltip` shim is used twice inside the subtree (`CoefficientsSpectrum.vue:80,124`), which **corroborates R3-7a's per-file count for this file exactly** (§7).

---

## §2 — Defects inherited through the import closure (attributed)

Every file `EqCoefficientsPanel` imports was read whole: `ui/CollapsibleSection.vue` (72), `shared/CoefficientsSpectrum.vue` (168), `lib/types.ts` (`BasisComponent`, `:1-6`), and transitively `ui/tooltip/{index.ts,Tooltip.vue}` plus the installed glass-ui/reka-ui implementations. Rows below are defects of the closure that this panel mounts; the owning file is named so the fix lands once, not per host.

### EQC-L-07 · MAJOR · the in-tree a11y-discharge claim is refuted by the tree — every coefficient tooltip is pointer-only

`CoefficientsSpectrum.vue:12-15` asserts that lifting to the glass-ui `Tooltip` primitive discharged "the L5 §5 A8 LOW a11y gap". It did not. The local shim always sets `as-child` (`ui/tooltip/Tooltip.vue:27`), and the trigger child is a plain `<div class="coeff-row">` (`CoefficientsSpectrum.vue:85`). reka-ui's `TooltipTrigger` renders its `as: 'button'` default **only when not `asChild`** (`node_modules/reka-ui/src/Tooltip/TooltipTrigger.vue:22-24`, `:104-115`); under `asChild` the child receives `aria-describedby`, `data-state`, `data-grace-area-trigger` and the listener set — no `tabindex`, no `role`. `handleFocus` (`:82`) can therefore never fire. All 12–41 tooltips are hover-only, and the row's scoped rule sets `cursor: default` (`:165-167`), removing even the affordance cue.

**Falsifier** — (a) a `tabindex` on `.coeff-row`: absent at `:85` and in the scoped block `:165-167`; (b) glass-ui re-adding focusability in its own trigger: it re-exports reka-ui's directly (`dist/tooltip.js:2`); (c) a missing `TooltipProvider` making this moot: `App.vue:4,23` mounts one globally, so the tooltips do open on hover. Claim stands. Cross-axis: filed here as composable-contract misuse plus a refuted in-tree claim; the a11y grading belongs to the A axis.

### EQC-L-08 · MINOR · positional key defeats `TransitionGroup` moves, making `.coeff-list-move` dead CSS

`:key="`${comp.index}-${i}`"` (`CoefficientsSpectrum.vue:82`) mixes identity with position. `comp.index` is already unique per harmonic, so the `-${i}` suffix adds nothing except positional coupling: any reorder changes every key, and `TransitionGroup` unmounts+remounts instead of moving. `.coeff-list-move` (`:161-163`) can therefore never fire — dead by construction, not by configuration.

**Falsifier** — a duplicate `comp.index` in one array would justify the composite key. The equation route emits each `n` once (`integration.py:126-127`); the epicycle path likewise (`src/fourier_analysis/epicycles.py:54` sorts, does not duplicate). For non-Fourier bases (`bases_fitting.py`) uniqueness is **unverified** — noted, not asserted.

### EQC-L-09 · MINOR · unguarded division in the bar-width binding on an all-zero spectrum

`maxAmplitude` returns `topComponents[0].amplitude` (`CoefficientsSpectrum.vue:43-45`), which is `0` when every coefficient is zero (the array is amplitude-sorted descending, so the max is first). The width binding then evaluates `${(0/0)*100}%` → `NaN%` (`:93`), an invalid declaration silently dropped by CSSOM; every bar collapses to the 2 px `minWidth` (`:95`). `formatPercent` guards this case (`:56-59`); the width binding does not — the guard was written once and not applied at the second division site.

**Falsifier** — reachability: `doCompute` guards only on an empty expression string (`EquationView.vue:91`), so `f(x) = 0` computes and renders 41 zero-amplitude rows. Claim stands. Severity MINOR: cosmetic degradation, no throw, no wrong number.

### EQC-L-10 · MINOR · uncancelled deferred layout read; no teardown

`CollapsibleSection.vue:17-30` schedules a 250 ms `setTimeout` on every open with no `clearTimeout` on unmount and no cancellation on re-toggle. Rapid toggling queues N timers, each performing two forced layout reads (`getBoundingClientRect` at `:23` and `:25`). The host is itself inside a `v-if` + `Transition` (`EquationView.vue:212-214`), so unmount-with-pending-timer is a normal path.

**Falsifier** — could it throw or retain? No: Vue nulls template refs on unmount, so `rootEl.value?.$el ?? rootEl.value` is `null` and the body returns at `:22`. The leak is bounded at 250 ms and cannot fault. That is why this is MINOR and not MAJOR — but an unowned timer in a repeatedly-mounted component is still a teardown defect.

### EQC-L-11 · MINOR · dead fallback branch that the type system is structurally unable to catch

`const el = rootEl.value?.$el ?? rootEl.value` (`CollapsibleSection.vue:21`). The fallback yields a *component instance*, on which `getBoundingClientRect` (`:23`), `closest` (`:24`) and `scrollIntoView` (`:26`) do not exist. It type-checks only because `$el` is `any` on `ComponentPublicInstance`, which also erases the declared `InstanceType<typeof Collapsible> | null` at `:15`. The branch is unreachable today (glass-ui's `Collapsible` renders a single-element root via reka-ui `Primitive`, non-`asChild`), but the code asserts a fallback it cannot honor.

### EQC-L-12 · MINOR · verbatim duplication inside the spectrum family

`spectrumColor` is byte-identical in `CoefficientsSpectrum.vue:47-50` and `FrequencyGraph.vue:42-45`. Phase-to-degrees formatting is duplicated as a named function at `CoefficientsSpectrum.vue:52-54` and inline at `FrequencyGraph.vue:208`. Both files are in this panel's family — the shared child and the slot component its sibling host passes. The D7/D11 extraction hoisted the markup and left the math.

**Falsifier** — none available; the two bodies are identical text.

### EQC-L-13 · MINOR · `transition-all` contradicts the same file's own precept note, 55 lines above it

`CoefficientsSpectrum.vue:146` states the A.W3.d precept: "named properties + canonical tokens, no `transition: all`." `:91` applies Tailwind's `transition-all` to the amplitude bar — an element whose `width`, `backgroundColor` and `minWidth` are all bound (`:92-96`), so the utility tweens the colour swap too. The receipt for the violation is in the file that declares the rule.

**Falsifier** — if `transition-all` compiled to a named-property list. It does not; it emits `transition-property: all`.

### EQC-L-14 · MINOR · reduced-motion coverage is partial across the mounted subtree

The collapsible reveal is guarded (`CollapsibleSection.vue:66-71` — one of the 8 `prefers-reduced-motion` blocks the corpus counts at lane-frontend.md:619). Inside it, nothing is: the `coeff-list-*` enter/leave/move transitions (`CoefficientsSpectrum.vue:147-163`) and the 500 ms bar tween (`:91`) have no `reduce` block. The digits are covered by a different mechanism (`respectReducedMotion` in `useAnimatedNumber`), which is exactly why the CSS gap is easy to miss: one of three motion sources honours the query.

### EQC-L-15 · INFO · two colour provenances on one screen

`hsl(${hue}, 85%, 55%)` is hard-coded (`CoefficientsSpectrum.vue:49`) while the same route's coefficient popover reads the resolved `--viz-amber` through `VIZ_COLORS` (`composables/useCoeffHover.ts:63-66`, pattern documented at `lib/colors.ts:11`). The spectrum bars are outside the token system that the adjacent surface is inside.

### EQC-L-16 · INFO / PIN · the producer's reveal animation is inert in this consumer; the local CSS is load-bearing, not redundant

glass-ui's `CollapsibleContent` hard-codes `data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down` (`dist/CollapsibleContent-C_s6fG7r.js:56`). `web/src/style.css:1-3` declares **no `@source`** for `node_modules`, and Tailwind v4's automatic detection excludes it, so those utilities are never generated — `grep -o 'animate-collapsible[a-z-]*'` across the whole installed glass-ui CSS tree returns exactly one hit, and it is prose inside a comment (`dist/styles/utilities/btn.css:65`). The only rules that actually animate this collapsible are the local scoped ones (`CollapsibleSection.vue:60-65`).

**Pin.** A future "glass-ui already animates this, delete the local CSS" cleanup is a regression. The keyframes the local rules name *do* exist and *are* imported (`dist/styles/animations.css:18,29`; `dist/styles/index.css:162`; consumed via `style.css:3`) — the file's comment at `:57-59` is accurate. It is the producer's *utility classes*, not its keyframes, that never materialise.

---

## §3 — The viz render path where this component touches it

The census fixes the architecture this component sits in: "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; **FrequencyGraph watch-driven**) + 12 SVG surfaces" (CENSUS-2026-08-03.md:85-87, folding lane-frontend §6). `EqCoefficientsPanel` touches that path at exactly one point: the `#graph` slot it declines to fill.

### EQC-L-17 · MAJOR · colocation inversion at the canvas seam

`FrequencyGraph.vue` — the third of the census's three canvases — lives at `components/equation/FrequencyGraph.vue` and has **exactly one consumer**: `components/visualization/CoefficientsPanel.vue:5,17-22`. The equation route's own coefficients host passes nothing into the child's named slot (`EqCoefficientsPanel.vue:14` versus the slot declaration and its comment at `CoefficientsSpectrum.vue:68-70`). The file is namespaced to a route that never renders it and rendered by a route that never names it.

Consequences that are this panel's to own:
- the equation route has **zero canvas touch**; this panel is the only place it could acquire one, and it declines;
- a **third** cardinality cap now floats in one family with no single owner: 12 / 40 (`CoefficientsSpectrum.vue:38`), 60 (`FrequencyGraph.vue:11` default), 40 (`CoefficientsPanel.vue:20` override to re-align with the spectrum). The equation route participates in none of that reconciliation.

**Falsifier** — another consumer or a lazy/router-level import of `FrequencyGraph`: `grep -rn 'FrequencyGraph' web/src` returns 4 hits — one import, one usage, two prose mentions in the shared child. Claim stands.

### EQC-L-18 · INFO · the cost of curing EQC-L-17, booked now so the cure is not a surprise

If the equation route ever fills `#graph`, it imports: a `watch(..., { deep: true })` over `props.components` (`FrequencyGraph.vue:157`) — a deep traversal of up to 401 objects on every recompute; an unused `onUnmounted` import (`:2`) that advertises a teardown the component does not have; and a canvas with DPR handling on every `draw()` (`:56-61`) but no `ResizeObserver` and no re-draw on DPR change. Booked as the price of the fix, not as a live defect of this panel.

### EQC-L-19 · MINOR · the panel's body is provably outside all test coverage

`web/` has **no unit-test runner at all** — `package.json:10,28` declare only `test:e2e` / `@playwright/test`; `find web -name '*.test.ts' -o -name '*.spec.ts'` returns the 8 Playwright specs and nothing else. The only spec that visits `/equation` is `e2e/visual-baseline.spec.ts:34` (screenshot at 3 viewports). With `:default-open="false"` and the unmount-on-hide chain proven in EQC-L-04, the spectrum body **cannot be in the DOM** for any baseline; `grep -rn 'Coefficient\|coeff' web/e2e` finds no spec that opens the section. The 168-line child plus this 17-line host are asserted on by nothing.

**Falsifier** — a spec clicking the "Coefficients" trigger, or a component-test harness. Neither exists. Whether the panel's *header* even appears in the baseline (it requires a successful backend compute) is UNPROVEN-NEEDS-LIVE (§8 U-5); the body's absence is proven statically.

---

## §4 — R5-7 adjudication (template-loop invisibility)

R5-7 (intake `lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT, carried to F.W4): *template-loop evidence keyed to component callsites is blind to native HTML element loops.* Applied here:

1. **The target is R5-7-clean at its own level.** `EqCoefficientsPanel.vue` contains zero `v-for` — native or component — across all 17 lines, read whole. It contributes no loop leaf to hide.
2. **Its subtree is visible, not invisible.** The spectrum loop is over a **component** (`v-for` on `Tooltip`, `CoefficientsSpectrum.vue:81`) — precisely the shape the intake shows the deriver *does* register, keyed as `callsite:...:Tooltip:...` (the populated `instance.loop.presets` leaf it contrasts against the empty `instance.loop.paper-sidebar`). The R5-7 blind spot does not bite this panel.
3. **The dual blind spot does bite, and F.W4's instruction must be read to cover it.** One registered component callsite expands to up to 41 tooltip trees, each carrying ~5 native nodes in the row (`:85-104`) and ~10 in the `#content` block (`:105-120`) — order 600 native nodes attributed to a single callsite, all inside a subtree that is absent from the DOM until the user opens the section. The F.W4 constraint as written ("count native element loops or inherit the blind spot", CENSUS-2026-08-03.md:362) covers native `v-for`; it does **not** cover *native subtrees multiplied by a component loop*, which is the same denominator error with the operands swapped. Recommend F.W4 widen the rule to "native nodes under any loop, component-keyed or not".
4. **R3-10 corroborated, with an extension the intake did not state.** The second of the two silently-dropped dynamic-`:is` families — `CoefficientsSpectrum.vue:132`, `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />` — is live at that exact line and sits **inside this panel's subtree**. The intake confirms it exists; the tree adds that it is *reachable from the equation route at defaults*, because the button is gated `v-if="totalComponents > 12"` (`:126`) and the route's default is 41 (EQC-L-01). It renders every time.

---

## §5 — Superlatives (L-18 runs both ways; each with its falsifier)

**S-1 · Lazy by construction, and better than its sibling at it.** `:default-open="false"` plus reka-ui's `unmountOnHide` default means 41 rows, 41 `AnimatedDigit` animators and 41 tooltip trees cost exactly nothing until the section is opened. The visualization route's `ConfiguratorLayer` keeps its body mounted-and-inert, so the *identical* child is eagerly mounted there. On mount cost, this host is the better of the two. *Falsifier:* if `unmountOnHide: false` were forwarded (the EQC-L-04 chain) the subtree would mount on every compute; it is not forwarded. Note this superlative and EQC-L-04 are the same mechanism seen from opposite ends — an honest trade, not an oversight, but an *unrecorded* one.

**S-2 · The D7/D11 extraction is real and its prose matches the tree exactly.** `CoefficientsSpectrum.vue:2-16` names both consumers, the ~95 % overlap, and the sole structural divergence — and the tree confirms every clause: viz passes `#graph` (`CoefficientsPanel.vue:17-22`), equation passes nothing (`EqCoefficientsPanel.vue:14`). Hoisting the one divergence to a **named slot** rather than a `showGraph` boolean is the correct seam. *Falsifier:* any prose/tree mismatch in that docblock — none found (the one false clause in the file is the a11y sentence at `:12-15`, EQC-L-07, which belongs to a different edit).

**S-3 · Animation teardown in the mounted subtree is clean, and the digits share a clock.** `useAnimatedNumber` disposes through `onScopeDispose` (`dist/useAnimatedNumber-C_3wZLx4.js:26`, `n() && r(T)`), stopping both the watcher and the `SmoothProgress` instance. And 41 digits do not mean 41 rAF loops: the entire `@mkbabb/keyframes.js` dist contains **2** `requestAnimationFrame` occurrences, both in one ticker module (`dist/timeline-BjcmprQ6.js`) — measured with `grep -o | wc -l`, not `grep -c`, because the dist is minified to single lines. *Falsifier:* a per-instance loop would require a rAF callsite reachable from `SmoothProgress` construction outside the ticker; there is none.

**S-4 · The 17 lines are type-correct in the way this constellation historically breaks.** `import type { BasisComponent }` (`:4`) — a value-import of a type is the exact `verbatimModuleSyntax` failure mode that broke the Vite runtime in the value.js migration; this file honours it. The prop surface is minimal and required, with no `withDefaults` theatre for a prop that has no sensible default. *Falsifier:* `grep -n 'import ' EqCoefficientsPanel.vue` — three imports, two components and one `import type`. Clean.

**S-5 · `CollapsibleSection` is a genuine thin adapter, corroborating the census verdict — with one qualification.** lane-frontend.md:368-372 counts 3 bespoke `components/ui/` wrappers and rules them "thin API-shape adapters, not shadows — the correct posture, keep". The tree agrees for this one: 72 lines, no state beyond `open`, no re-implemented primitive. *Qualification:* the census rated the wrapper on its *shape*; it did not check what the producer says about the primitive being wrapped (EQC-L-02). The verdict "keep" survives; the reason needs the extra sentence.

---

## §6 — Falsified hypotheses (claims that died, recorded per L-18)

| # | hypothesis (raised, then killed) | the evidence that killed it |
|---|---|---|
| F-1 | Components arrive unsorted, so `maxAmplitude = topComponents[0].amplitude` is wrong and bars exceed 100 % | All three backend tiers sort descending before serializing: `integration.py:145`, `identification.py:125`, `spline.py:116`; the epicycle path sorts in `epicycles.py:54`. The undocumented precondition is *met* — though it is enforced at 4 backend sites with no client guard (noted, not filed) |
| F-2 | glass-ui's Boolean `unmountOnHide` with no default forwards `false`, force-mounting collapsed content | `reka-ui/src/shared/useForwardProps.ts:43,49` forwards only keys present in `vm.vnode.props`; `unmountOnHide` is never assigned, so reka-ui's `true` default holds (`CollapsibleRoot.vue:42`) |
| F-3 | `collapsible-open`/`collapsible-close` do not exist, so reka-ui's `Presence` waits for an `animationend` that never fires and the content never unmounts | Both keyframes ship at `dist/styles/animations.css:18,29`, imported by `dist/styles/index.css:162`, consumed via `style.css:3`. The comment at `CollapsibleSection.vue:57-59` is accurate |
| F-4 | `simplifyCoefficients(components.value, …)` posts `BasisComponent` to a `FourierTermDTO` endpoint → 422 | `lib/equation/api.ts:38-44` maps inside the helper |
| F-5 | The `DTO → BasisComponent → DTO` round-trip exists solely to feed this panel | `visualization/EquationPanel.vue:45` is a second caller of the `BasisComponent[]`-signature helper; the shape is cross-route substrate (this reduced EQC-L-05 from MAJOR to INFO) |
| F-6 | 12–41 `AnimatedDigit`s spawn 12–41 rAF loops when the panel opens | 2 rAF occurrences in the whole keyframes.js dist, both in one ticker module (S-3) |
| F-7 | The 12–41 tooltips throw on a missing `TooltipProvider` injection | `App.vue:4,23` mounts one globally with `:delay-duration="400"` |
| F-8 | The local scoped animation overrides and breaks glass-ui's canonical reveal | Inverted: the producer's utilities are never generated in this consumer (no `@source`), so the local rules are the only working ones — became the EQC-L-16 pin |

---

## §7 — Corpus crosswalk

**Corroborated (7).** `lane-frontend.md:140` "EqCoefficientsPanel.vue | 17 | Thin spectrum host" — `wc -l` = 17, exact. `:100` viz `CoefficientsPanel` = 26 — exact. `:180` `CoefficientsSpectrum` = 168 — exact. `:182` `CollapsibleSection` = 72 — exact. `:619` counts `CollapsibleSection.vue:66` among the 8 `prefers-reduced-motion` blocks — live, and EQC-L-14 shows what the count does *not* cover. **R3-7a** (`lane-fourier-r3-r6.md:79`) assigns `CoefficientsSpectrum` 2 of its 35 tooltip callsites — live at `:80` and `:124`, exactly 2. **R3-10 / R3-HA-003** (`:84`) names `CoefficientsSpectrum.vue:132` as one of the two dropped dynamic-`:is` families — live at that line, and §4 adds its route-reachability.

**Contradicted (2).**

**X-1 · `lane-frontend.md:443` mis-homes this component's producer analogue.** The candidate-shadow table pairs `visualization/CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` (26 / 17) with `./metric-stack` (4.0.0) → `./metric` (7.0.0). The tree disagrees. glass-ui's `MetricStack.vue` is a 13-line slot container — `<div :class="cn('metric-stack', …)" :data-density>` (`glass-ui/src/components/metric/MetricStack.vue:1-13`) — with no header, no label/sub, no collapsible, no disclosure state. Neither panel renders metrics; both render *a collapsible section wrapped around a spectrum*. The correct producer analogue is already proven **by the sibling itself**: `./configurator`'s `ConfiguratorLayer` (`label` / `sub` / `defaultOpen`, `glass-ui/src/components/configurator/ConfiguratorLayer.vue:34-60`). Recommend the census row be re-homed to `ConfiguratorLayer` and re-framed as a *convergence-of-two-hosts* row (EQC-L-02), not a metric shadow. As written it would send a wave to replace a disclosure widget with a density container.

**X-2 · `lane-docs.md:433`'s `inert` row is upstream-true but is being read as pending in the product tree.** The row books "`inert` on collapsed `ConfiguratorLayer` — SATISFIED-UPSTREAM / ADOPT-NOW (3.1.1)". The installed 4.0.0 dist confirms it is live: `dist/useConfiguratorState-kiIlun8I.js` emits `role: "region", "aria-hidden": !open, inert: !open || void 0`. But `web/e2e/visualization-ux.spec.ts:117-133` still states glass-ui "omits `inert`" and holds two a11y keystones at `test.fixme` "pending the glass-ui `inert` release". The comment is stale against the substrate that is installed *now*. Two consequences: the keystones are candidates for re-enabling, and EQC-L-02's convergence direction is unblocked today. (Filed here because it changes this component's disposition; the e2e file itself belongs to another lane.)

**Not contradicted, sharpened.** The census's canvas architecture row (CENSUS-2026-08-03.md:85-87) is exact — and §3 names the one seam where the equation route fails to reach it.

---

## §8 — UNPROVEN-NEEDS-LIVE (queued for SS-13)

| # | claim needing a live run | how to settle it |
|---|---|---|
| U-1 | Whether reka-ui `Presence`'s height-measurement watchers actually approach Vue's 100-iteration cap for this single collapsible under cold-load throttling (EQC-L-02's consequence, as opposed to its divergence) | Open `/equation`, compute, expand "Coefficients" under CPU+network throttle; watch for the Vue recursive-update warning |
| U-2 | Whether the 250 ms `scrollIntoView` (`CollapsibleSection.vue:17-30`) produces a visible jump in the equation left panel, and whether `closest('.overflow-y-auto, .overflow-auto')` finds any ancestor there at all | Expand the section with the panel scrolled; record whether the branch at `:25` is taken |
| U-3 | Whether `transition-all` (EQC-L-13) yields a visible colour tween when a recompute reorders rows | Recompute with a different N and observe the bars |
| U-4 | Keyboard walk confirming the tooltips are unreachable (EQC-L-07) — the static proof is strong, the walk is the receipt | Tab through the expanded spectrum; confirm no row takes focus and no tooltip opens |
| U-5 | Whether `/equation` visual baselines contain the panel *header* at all (they provably cannot contain the body) | Inspect the committed baselines from `e2e/visual-baseline.spec.ts:34`; requires a live backend for the compute the panel is gated on |

---

## §9 — Recommended disposition (for the wave that consumes this challenge)

1. **One decision, not two fixes.** EQC-L-02 and EQC-L-01 are both symptoms of the same absence: nobody owns "how a coefficients panel is chromed and capped" across the two routes. Settle the host (X-2 shows `ConfiguratorLayer` is now unblocked; S-1 shows the unmounting collapsible is better on mount cost — pick deliberately and *write down why*), then give the shared child a cap prop so 41 > 40 stops being unrepresentable.
2. **Fix once in the child, not per host:** EQC-L-07 (make the trigger focusable or stop claiming the discharge), EQC-L-08, EQC-L-09, EQC-L-13.
3. **Pin before cleanup:** EQC-L-16 — do not delete `CollapsibleSection.vue:60-65` without adding an `@source` for glass-ui first.
4. **Cheap and unambiguous:** EQC-L-03 (delete the dead prop), EQC-L-10 (`clearTimeout`), EQC-L-11 (drop the fallback, type `$el` as `HTMLElement`), EQC-L-12 (one `spectrumColor`).
5. **Colocation:** EQC-L-17 — either move `FrequencyGraph.vue` to `components/shared/` alongside the child it slots into, or fill the equation route's `#graph`. Not both, and not neither.
