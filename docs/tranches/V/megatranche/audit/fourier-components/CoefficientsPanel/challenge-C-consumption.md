claude-opus-5[1m] (served model id)

# CHALLENGE — `CoefficientsPanel` · axis C (CONSUMPTION)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CoefficientsPanel.vue` (26 lines).

**Method.** Static + source-derived only. Component read whole; every file it imports read whole
(`stores/workspace.ts` compute path, `@mkbabb/glass-ui/configurator` compiled surface + `.d.ts`,
`components/equation/FrequencyGraph.vue`, `components/shared/CoefficientsSpectrum.vue`), plus the
transitive consumption surface those pull (`components/ui/tooltip/Tooltip.vue`,
`@mkbabb/glass-ui/tooltip` → `reka-ui` `TooltipRoot`/`PopperRoot`, `@mkbabb/glass-ui/animated-digit`,
`lib/types.ts`, `lib/colors.ts`, `lib/canvas-drawing/transforms.ts`, `equation/lib/harmonics.ts`,
the installed `@mkbabb/value.js@0.13.0` public `.d.ts`, `web/package.json`, `web/tsconfig.json`,
`web/e2e/visualization-ux.spec.ts`, and the four Python producers of the amplitude ordering).
No browser tooling. Live-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
The fourier tree was **read-only**; the only write is this file.

**Posture.** The component was assumed DEFECTIVE until the tree proved otherwise. On the four things
it does itself — pick a glass-ui chassis, mount it inside that chassis, derive `components`, pass a
slot — it is largely **right**, and §3 says so with receipts. What it consumes underneath it is not.
**17 findings (1 BLOCKER · 7 MAJOR · 5 MINOR · 4 INFO) · 6 superlatives.**

**Hitherto corpus folded** (not re-derived): `formation/fourier/lane-frontend.md`,
`lane-crud.md`, `CENSUS-2026-08-03.md` + addendum, and
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (38/52 TRUE). Row ids cited inline where this
lane's evidence overlaps: **R3-7a** (Tooltip migration budget — this subtree contributes 2 of the 35),
**R3-7b** (OpenAPI security 0/45 — the schema-discipline context for C-17), **R3-10** (dynamic `:is`
families — one of the six is `CoefficientsSpectrum.vue:132`, re-confirmed at that exact line),
**R6-8** (operation↔client leaf coupling — C-17 is a second instance for F.W5), **X-3** (45 total /
30 public-non-admin / 13 admin). No corpus row is contradicted; two are extended.

---

## §0 — the consumption denominator, measured

| package | declared (`web/package.json`) | installed | imports in THIS subtree (3 files) | verdict |
|---|---|---|---|---|
| `@mkbabb/glass-ui` | `^4.0.0` | 4.0.0 | 2 (`/configurator`, `/animated-digit`) + `/tooltip` via the local shim | consumed, mostly to contract |
| `@mkbabb/value.js` | `^0.13.0` | 0.13.0 | **0** | **not consumed — and reinvented (C-2)** |
| `@mkbabb/keyframes.js` | `^4.3.0` | 4.3.0 | **0** | not consumed (C-16) |
| fourier API (45 ops) | — | — | 0 direct; 1 hop via `workspace.ts:299` | clean seam (S-6) — but carries an unexpressed invariant (C-17) |

Receipts: `web/package.json:14` (glass-ui), `:15` (keyframes.js), `:18` (value.js); `web/node_modules/@mkbabb/glass-ui/package.json` `"version": "4.0.0"`;
`web/node_modules/@mkbabb/value.js/package.json` `"version": "0.13.0"`;
`web/node_modules/@mkbabb/keyframes.js/package.json` `"version": "4.3.0"`.
Repo-wide `grep -rn "mkbabb/value" web/src` → exactly 5 hits, all easing
(`ConvergencePlot.vue:5`, `equation/lib/harmonics.ts:5`, `useCurveTransition.ts:8`, `lib/easings.ts:9,16`);
`grep -rn "mkbabb/keyframes" web/src` → 2 hits, one live import (`useFourierMorph.ts:14`) and one
comment (`stores/animation.ts:47`). None in this subtree.

---

## §1 — DEFECTS

### C-1 · **BLOCKER** — the panel is a legend whose colours do not match the picture, or each other

**Claim.** Inside this one panel, the same harmonic *n* is painted two different colours; against the
epicycle canvas the panel annotates, a third.

**Provenance.**
- `CoefficientsPanel.vue:20` pins `:max-bars="40"` on `FrequencyGraph`.
- `CoefficientsSpectrum.vue:37-39` slices `expanded ? 40 : 12` — **collapsed default** (`expanded = ref(false)`, `:35`).
- Both children colour by a **local** `spectrumColor(i, total)` whose hue is a function of `total`:
  - `CoefficientsSpectrum.vue:47-50` — `hue = (1 - i/max(total-1,1)) * 300`, called at `:94` (bar) and `:107` (tooltip dot) with `total = topComponents.length`.
  - `FrequencyGraph.vue:42-45` — byte-identical formula, called at `:84` with `total = n = displayComponents.length` (= `maxBars` = 40).
- The canvas this panel describes uses a **different formula**: `web/src/components/visualization/lib/canvas-drawing/transforms.ts:3-8` applies a gamma, `t = i/max(total-1,1); curved = t**0.6; hue = (1-curved)*300`, consumed at `lib/canvas-drawing/epicycles.ts:162` `const color = colorOverride ?? spectrumColor(i, nVis)` over the same amplitude-sorted array.
- A fourth definition exists at `equation/lib/harmonics.ts:81-88` (`hsla`, alpha param).

**Arithmetic (the falsifiable core).** Harmonic at ordinal `i = 5`, `n ≥ 40`, panel collapsed:

| surface | formula | total | hue |
|---|---|---:|---:|
| spectrum list row + its tooltip dot | linear | 12 | **163.6°** (green) |
| `FrequencyGraph` bar, same panel | linear | 40 | **261.5°** (violet) |
| epicycle canvas circle, same route | `t**0.6` gamma | `nVis` (40) | **212.5°** (blue) |

Three surfaces, one harmonic, ~98° of hue apart. Clicking "Show more" (`CoefficientsSpectrum.vue:130`)
re-hues **every list row** as `total` goes 12 → 40 while the graph above it does not move; the two
agree only in the expanded state and only when `n ≥ 40`.

**Falsifier.** The claim dies if (a) the ramps shared one definition, or (b) the denominators were
shared, or (c) `spectrumColor` were index-keyed rather than ordinal-keyed. All three are refuted at
the lines above: four definitions, two formulas, three denominators, ordinal `i` throughout. The one
way to rescue it — that the graph and list happen to be given the same `total` — is refuted by
`CoefficientsPanel.vue:20` (`40`) against `CoefficientsSpectrum.vue:38` (`12`) in the default state.

**Why BLOCKER, not MAJOR.** This panel's entire reason to exist is to index the canvas. A legend that
disagrees with its drawing is worse than no legend: it actively misinforms, and it does so silently,
with no error, no test, and no type to catch it.

---

### C-2 · **MAJOR** — value.js is consumed for nothing here, while the subtree hand-rolls the exact primitive value.js 0.13 already ships

**Claim.** Four hand-rolled sRGB-HSL ramps exist (C-1) in a repo that has had `sampleColorRamp`
installed the whole time.

**Provenance.** `web/node_modules/@mkbabb/value.js/dist/index.d.ts` (the installed 0.13.0 surface) exports:
`sampleColorRamp`, `mixColorsN`, `mixColors`, `interpolateHue`, `cssColorInterpKeyword`, `gamutMap`,
`HSLColor`/`OKLCHColor`/`LABColor`/…, `parseCSSColor`, `color2`, `computeSafeAccent`, `safeAccentColor`,
`getOklchLightness`, `deltaEOK`, `gamutMapOKLab`. The ramp's own docblock
(`dist/units/color/mix.d.ts`) reads:

> `sampleColorRamp(from, to, n, opts)` — "Sample an N-stop perceptual ramp interpolating `from` → `to`
> in `space`… `hueMethod` cylindrical hue path… when `gamutMap` is true (default), mapped in-sRGB-gamut
> via `gamutMapOKLab`."
> `@example sampleColorRamp(red, blue, 8, { space: "oklch", hueMethod: "longer" })`

That is, verbatim, the N-stop hue-arc the four `spectrumColor` implementations approximate by hand in
raw sRGB.

**Consequence, not merely stylistic.** `hsl(h, 85%, 55%)` at fixed S/L is **not** equal-lightness:
sRGB yellow near 60° reads far lighter than blue near 260° at the same nominal `L`. So the bar colours
encode a spurious brightness gradient over harmonic ordinal, on top of the amplitude the bar length
already encodes — and none of it is gamut-mapped or contrast-checked against the surface
(`safeAccentColor`/`computeSafeAccent`, `dist/units/color/contrast.d.ts`, exist and are unused).

**Falsifier.** Dies if 0.13 lacked the API. It does not — `mix.d.ts` is quoted above and
`index.d.ts` re-exports `{ mixColorsN, sampleColorRamp }` explicitly. Dies also if the subtree used
the project's own theme-reactive `VIZ_COLORS` (`lib/colors.ts:77-96`) instead; it does not (C-11).

**F.W2 note (in scope for this axis).** `@mkbabb/value.js@0.13.0`'s export map is a **single `.` entry**
(`package.json` `exports: { ".": {...} }`) against a 145,809-byte `dist/value.js`, so `import { easeInOutSine }
from "@mkbabb/value.js"` at `ConvergencePlot.vue:5` etc. is a bare whole-library specifier — no subpaths,
unlike glass-ui's ~60. This subtree's migration cost to the current value.js major is therefore
**zero call sites to rewrite and a green field to adopt into** — the cheapest F.W2 landing zone in the
component census.

---

### C-3 · **MAJOR** — `FrequencyGraph`'s contract is ~60 % dead at its only callsite, and one dead member is user-visible as a false affordance

**Claim.** `CoefficientsPanel` is the sole consumer of `FrequencyGraph` repo-wide and binds none of
its optional props and neither of its emits.

**Provenance.** `grep -rn "FrequencyGraph" web/src` → `CoefficientsPanel.vue:5` (import) and `:17`
(the single callsite) — plus one prose mention in `CoefficientsSpectrum.vue:8,68`. Nothing else.
`FrequencyGraph.vue:5-13` declares props `{components, activeIndices?, maxBars?, logScale?}`;
`:15-18` declares emits `{"toggle-harmonic":[number], "hover-harmonic":[number|null]}`.
`CoefficientsPanel.vue:18-21` binds `v-if`, `:components`, `:max-bars`, `class`. **Zero listeners, zero
optional props.**

**Consequences, each source-provable:**

1. **False affordance.** `FrequencyGraph.vue:179` `class="block cursor-pointer …"` on the canvas, with
   `@click="onClick"` at `:182`; `onClick` (`:151-155`) emits `toggle-harmonic` into the void. The
   cursor promises an interaction that has no listener anywhere in the tree.
2. **`activeIndices` dead ⇒ dead branch.** Never passed, so `:77` `isActive = !props.activeIndices || …`
   is unconditionally `true`, making the dim arms at `:86` (`: 0.25`) and `:107` (`: 0.2`) unreachable.
3. **`logScale` dead ⇒ a whole documented feature unreachable.** Never passed (default `false`, `:12`),
   so: `maxAmplitude`'s log arm (`:39`) and `barFraction`'s (`:48`) never run; the W5.d axis annotation
   at `:168-171` renders `|c_n|` permanently and its `:title` help-tooltip is stuck on the else arm; the
   `<template v-if="logScale">` `log₁₀(·+1)` tooltip row (`:203-206`) never renders; and the `.freq-graph-axis-label`
   style block (`:219-234`), including the EB Garamond/Computer Modern cross-walk the comment argues for,
   exists to render one static glyph string.
4. **`hover-harmonic` dead.** `:136`/`:146` emit on every hover transition, unlistened — so the redraw
   at `:139`/`:147` is the only effect, and the cross-highlight the emit exists to drive does not exist.

**Falsifier.** Any other consumer binding these. `grep -rn "toggle-harmonic\|hover-harmonic\|active-indices\|activeIndices\|log-scale\|logScale" web/src`, excluding `FrequencyGraph.vue` itself, returns **only** `CoefficientsPanel.vue:5,17` — i.e. nothing binds them.

---

### C-4 · **MAJOR** — the a11y suppression covering this panel's default state is stale: glass-ui 4.0.0 already ships the cure

**Claim.** Two e2e keystones are `test.fixme`'d against a vendored `ConfiguratorLayer` defect that the
**installed** glass-ui no longer has, and their stated remediation version is two majors behind the pin.

**Provenance.**
- `CoefficientsPanel.vue:14` sets `:default-open="false"`, so this panel is one of the collapsed
  siblings the suppression names.
- `web/e2e/visualization-ux.spec.ts:118-122` — "opening the Contour `ConfiguratorLayer` leaves the
  workspace's SIBLING layers (basis, **coefficients**) collapsed, and glass-ui renders each collapsed
  layer body with `role="region" aria-hidden="true"` while keeping its focusable `btn-pill` trigger
  inside (**it omits `inert`**) — an axe `aria-hidden-focus` **serious** violation that no app-level
  action can avoid".
- `:130-132` — "pending the glass-ui `inert` release + guarded **`^2→^3`** bump."
- Both `test.fixme("keystone: workspace default has no serious/critical a11y violations", …)` (`:110`)
  and `test.fixme("keystone: ContourSettings Configurator-open is a11y-clean", …)` (`:133`) rest on this.
- **The cure is installed.** `web/package.json:14` pins `"@mkbabb/glass-ui": "^4.0.0"`; the installed
  package is 4.0.0; its `ConfiguratorLayer` render function
  (`dist/useConfiguratorState-kiIlun8I.js`, the chunk `dist/configurator.js` re-exports) declares the
  region's dynamic-prop array as `q = ["id", "aria-hidden", "inert", "data-state"]` and renders:

  ```js
  f("div", { id: o.value, role: "region",
             "aria-hidden": !i.value,
             inert: !i.value || void 0,
             "data-state": l.value,
             class: "configurator-layer-region grid motion-reduce:transition-none",
             style: v({ gridTemplateRows: i.value ? "1fr" : "0fr" }) }, …)
  ```

  `inert` is bound to `!open` beside `aria-hidden`, exactly as the ask required.

**Falsifier.** Dies if `inert` were bound to a constant, or if the app pinned `<4`. Refuted: the binding
is `!i.value || void 0` (the correct boolean-attribute idiom) and the pin is `^4.0.0` with 4.0.0 on disk.
It also dies if the trigger `<button>` (`:` the sibling at the same chunk) sat *inside* the region — it
does not; the render places the `button` before the region `div`, so the `aria-hidden-focus` pairing the
comment describes is doubly gone.

**Live half — UNPROVEN-NEEDS-LIVE (SS-13):** whether an axe re-run on the un-fixme'd keystones is now
clean. The source facts (comment, pin, installed render) are proven; only the axe verdict is not.

**Why it lands on this component.** `:default-open="false"` at `CoefficientsPanel.vue:14` is what makes
this panel a permanently-collapsed sibling in the default workspace — i.e. this component is one of the
two named *causes* of the suppressed violation, and is therefore in the blast radius of un-skipping it.

---

### C-5 · **MAJOR** — the `coeff-list` TransitionGroup animates nothing: the glass-ui Tooltip lift put a fragment between it and the rows

**Claim.** `CoefficientsSpectrum`'s enter/leave/move CSS is inert, because every `TransitionGroup` child
is a component whose root subtree is a Fragment.

**Provenance (the render-shape chain, each link read):**
1. `CoefficientsSpectrum.vue:79-122` — `<TransitionGroup name="coeff-list">` whose only child is
   `<Tooltip v-for="(comp,i) in topComponents" :key … side="bottom">` (`:80-83`).
2. `:147-163` — the transition classes `.coeff-list-enter-active/-leave-active/-enter-from/-leave-to/-move`
   (the A.W3.d named-property rules).
3. That `Tooltip` is the local shim `web/src/components/ui/tooltip/index.ts` → `Tooltip.vue`, whose
   template (`:25-38`) is `<GlassTooltip>` containing **two** siblings — `<TooltipTrigger as-child>` and
   `<TooltipContent>`.
4. `GlassTooltip` = `@mkbabb/glass-ui/tooltip`'s `Tooltip`, typed
   `DefineComponent<TooltipRootProps, …>` (`dist/components/ui/tooltip/Tooltip.vue.d.ts:1,6`) — i.e. a
   pass-through of reka-ui's `TooltipRoot`.
5. `reka-ui/src/Tooltip/TooltipRoot.vue:186-189` — `<template><PopperRoot><slot :open="open" /></PopperRoot></template>`.
6. `reka-ui/src/Popper/PopperRoot.vue:34-36` — `<template><slot /></template>`.

Both (5) and (6) are renderless: nothing along the chain collapses the shim's two-child template into a
single element. Vue propagates transition hooks in `renderComponentRoot` only when the component's root
resolves to an element (`isElementRoot`); a Fragment root emits the dev warning *"Component inside
`<Transition>` renders non-element root node that cannot be animated"* and the enter/leave/move classes
never land on a DOM node.

**Aetiology.** `CoefficientsSpectrum.vue:11-16` records the change: "B.W2.c — … the bespoke `:hover` CSS
tooltip lifts to the glass-ui `Tooltip` primitive (the local shim wraps `Tooltip` + `TooltipTrigger` +
`TooltipContent`), discharging the L5 §5 A8 LOW a11y gap." The a11y lift is right; it silently
interposed a fragment inside a pre-existing `TransitionGroup` (`A.W3.d`, `:145`), and no gate caught it.

**Falsifier.** Dies if `TooltipRoot` or `PopperRoot` rendered a wrapper element, or if the shim had one
child. All three refuted at the exact lines above. It would also die if the row `<div>` were the
`TransitionGroup`'s direct child and the Tooltip wrapped *inside* — which is precisely the fix, and
precisely what the tree does not do.

**Live half — UNPROVEN-NEEDS-LIVE (SS-13):** the console warning text and the visual absence of the
40-row stagger. The render-shape chain is proven from source.

**Cross-ref.** These are 2 of the 35 `<Tooltip` callsites over 9 consumers that **R3-7a** books as the
F.W3 `ui/tooltip` migration budget (`grep -c "<Tooltip" CoefficientsSpectrum.vue` → **2**, matching
R3-7a's per-file count exactly). C-5 says the shim is not merely a migration chore — it is currently
breaking a sibling feature, and a naive barrel-swap to `@mkbabb/glass-ui/tooltip` will not fix it.

---

### C-6 · **MAJOR** — the twin panels wrap the same shared child in two different collapsible primitives, and the second is the pattern the first fled

**Claim.** `CoefficientsPanel` and `EqCoefficientsPanel` render the same `CoefficientsSpectrum` through
two unrelated chassis with two prop vocabularies — and the equation arm still composes the primitive
`ConfiguratorLayer`'s own docblock says it abandoned for a reactivity race.

**Provenance.**
- `CoefficientsPanel.vue:4,14` — `ConfiguratorLayer` from `@mkbabb/glass-ui/configurator`; props `label` / `sub` / `default-open`.
- `EqCoefficientsPanel.vue:2,12` — `CollapsibleSection` from `@/components/ui/CollapsibleSection.vue`; props `title` / `subtitle` / `default-open`.
- `CollapsibleSection.vue:2` — `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mkbabb/glass-ui'` (the **root barrel**, not a subpath — the only such import in either panel's chain, defeating the ~60-subpath split the package publishes).
- `ConfiguratorLayer.vue.d.ts` docblock, "M.W2 Lane A (F-ε-3 fix) — recursion-free reveal":
  > "Earlier versions composed `<Collapsible>` + `<CollapsibleContent>` from reka-ui to drive the height
  > transition. Under Lighthouse's strict cold-load discipline … this surfaced a watcher-graph race
  > inside reka-ui's `<Presence>` + `<CollapsibleContent>` height-measurement watchers — `getComputedStyle(node).animationName`
  > + `getBoundingClientRect()` reads inside a `watch(...)` callback created a non-convergent loop that
  > tripped Vue's 100-iteration recursion cap on `<Configurator>`."

  `CollapsibleSection.vue:34,45` composes exactly `<Collapsible>` + `<CollapsibleContent>`, and adds its
  own `watch(open, …)` + `setTimeout(250)` + `getBoundingClientRect()` (`:17-30`) on top.

**Falsifier.** Dies if `CollapsibleSection` offered something `ConfiguratorLayer` cannot. It offers
`#actions` (`:43`) and the 250 ms scroll-into-view (`:17-30`); `ConfiguratorLayer` offers `id`,
`dividers`, `class`, `bodyClass`, and a controlled `v-model:open` it lacks. The overlap is a superset in
the chassis' favour except for `#actions` — and `ContourSettings.vue:191` and `BasisSelector.vue:121`
both record in comments that they already work around exactly that gap ("`ConfiguratorLayer` has no
header-actions slot"), i.e. the gap is known, three-times-hit, and un-booked as a glass-ui ask.

**Live half — UNPROVEN-NEEDS-LIVE (SS-13):** whether F-ε-3 actually reproduces on the equation route.
The composition fact and the docblock are proven.

---

### C-7 · **MAJOR** — zero props, zero emits: the panel reaches into the global store while its twin takes a prop

**Claim.** The component publishes no contract at all and is store-coupled, asymmetrically with the twin
that wraps the same child.

**Provenance.** The whole file (26 lines) declares no `defineProps`, no `defineEmits`, no `defineExpose`,
no `defineOptions`. It calls `useWorkspaceStore()` at `:8` and reads `store.epicycleData?.components ?? []`
at `:10`. Its twin `EqCoefficientsPanel.vue:6-8` declares `defineProps<{ components: BasisComponent[] }>()`
and is pure.

**Consequences.**
- Un-reusable: one store, one route. The second visualization surface (`FullscreenViewer`, `VisualizationView.vue:279`) cannot mount it against a different dataset.
- Un-mountable in isolation for test — which is consistent with the coverage: `grep -rn "oefficient" web/e2e` returns two hits, both incidental (`visualization-ux.spec.ts:120` is the suppression comment of C-4; `paper-performance.spec.ts:304` is a paper-text matcher). **No test exercises this panel.**
- The visibility predicate is stated twice and the two statements disagree — see C-8.
- A one-line fix reaches parity with the twin (`defineProps<{ components: BasisComponent[] }>()`, hoist the store read to `VisualizationView`), at which point the panel becomes a pure function of its input and C-8 dissolves with it.

**Falsifier.** Dies if the store read carried logic a prop could not. It does not: `:10` is a null-coalesced
field read, and the parent at `VisualizationView.vue:273` already reads the same store field to decide whether
to mount it at all.

---

### C-17 · **MAJOR** — the descending-amplitude invariant every number in this panel divides by is a server-side sort with no client-side expression (R6-8, second instance)

**Claim.** All of the panel's normalisation depends on `components[0]` being the maximum-amplitude
component; the TypeScript type does not say so, the OpenAPI schema does not say so, and four independent
Python producers are the only thing making it true.

**Provenance.**
- Consumers of the invariant: `CoefficientsSpectrum.vue:43-45` (`maxAmplitude = topComponents[0].amplitude`),
  `:93` (`width: (comp.amplitude / maxAmplitude) * 100 %`), `:56-59` (`formatPercent`), `:115` (tooltip
  "Relative"); and independently `FrequencyGraph.vue:35-40` (`maxAmplitude = displayComponents[0].amplitude`)
  → `:46-49` `barFraction`.
- The invariant **currently holds**, in four places:
  `src/fourier_analysis/epicycles.py:47,54` — "A chain of epicycle components, ordered by descending
  amplitude" / `sorted(components, key=lambda c: c.amplitude, reverse=True)`;
  `bases_fitting.py:78,160` and `symbolic/spline.py:116` — the same `sort(..., reverse=True)`.
  `epicycles.ts:165-167` even relies on it in prose ("the chain is amplitude-sorted, so the `index === 0`
  … component lands first").
- Nothing on the client expresses it: `web/src/lib/types.ts:1-6` `BasisComponent` and `:22-27`
  `EpicycleData { components: BasisComponent[] }` carry no ordering annotation, no brand, no comment.
  And per **R3-7b** the API's schema discipline is `RED_0_OF_45` on security descriptions — the surface
  that would carry an ordering contract documents nothing of the kind for any of the 45 operations
  (**X-3**: 45 total / 30 public-non-admin / 13 admin).

**Failure mode if it ever breaks.** Any producer emitting index-ordered components (the natural
`n = -N..N` ordering, which is what `BasisComponent.index` implies) makes `maxAmplitude` a non-maximum:
bar widths exceed 100 %, `formatPercent` prints >100 %, `FrequencyGraph.barFraction` mis-normalises every
bar, and `CoefficientsSpectrum` silently mislabels the "Relative" row. **No type error, no runtime error,
no test.** The `minWidth: '2px'` clamp at `:95` and `Math.max(val/max, 0.008)` at `:49` hide the low end;
nothing clamps the high end.

**Why this is R6-8's shape.** R6-8 established that "an API-operation record that embeds derived client
back-references cannot attribute a defect to one side of the seam", and CARRIES to F.W5. C-17 is the dual:
a **client leaf carrying a derived assumption about the operation leaf that the operation record does not
publish**. Same seam, opposite direction, same wave. The F.W5 shared-provenance contract needs ordering to
be a *declared* property of the operation, not folklore in a Python docstring.

**Falsifier.** Dies if the type, the OpenAPI schema, or a runtime guard declared the order. Checked all
three: `types.ts` is bare; `R3-7b`'s 0/45 measurement stands; and `grep`ping the three client files for
`sort` returns nothing.

---

### C-8 · **MINOR** — the empty-state copy lies while a compute is in flight

`VisualizationView.vue:273` mounts the panel on `store.epicycleData || store.computing`.
`CoefficientsPanel.vue:10` then coalesces to `[]`, and `CoefficientsSpectrum.vue:138-140` renders the
panel-supplied `empty-text` — `"Compute epicycles to see coefficients"` (`CoefficientsPanel.vue:15`) —
**during** the compute. The store exposes a real flag the panel never reads (`workspace.ts:50` `const
computing = ref(false)`, `:64,68` the depth-counted set, `:441` exported). There is no loading state
anywhere in the three files. **Falsifier:** dies if `computing` were unavailable or if the parent
unmounted during compute; refuted at `workspace.ts:441` and `VisualizationView.vue:273` respectively
(the `|| store.computing` arm exists specifically to keep it mounted).

### C-9 · **MINOR** — the count readout renders `0 / 0` above the empty text

`CoefficientsSpectrum.vue:70` emits the `#graph` slot, then `:72-75` renders
`{{ topComponents.length }} / {{ totalComponents }}` **unconditionally**, then `:78`/`:138` branches on
emptiness. The empty state is therefore "0 / 0" stacked over "Compute epicycles to see coefficients".
The panel's own `v-if="components.length"` (`CoefficientsPanel.vue:18`) correctly suppresses the graph;
the child's badge has no such guard. **Falsifier:** dies if the badge sat inside the `v-if` block; `:72`
is outside it.

### C-10 · **MINOR** — the collapsed panel pays full canvas + damping cost on every recompute

`ConfiguratorLayer` is a **CSS-only** reveal — its docblock states it retired reka-ui `Presence` for
"`grid-template-rows: 0fr ↔ 1fr`", and the compiled render confirms `style: { gridTemplateRows: i.value ?
"1fr" : "0fr" }` over an always-mounted body. The panel opens **collapsed** (`CoefficientsPanel.vue:14`).
So with the layer never opened: `FrequencyGraph.vue:159` `onMounted(() => draw())` and `:157`
`watch(…, () => draw())` fire on every epicycle result, running a full `canvas.width` reallocation
(`:57-61`) plus up to 40 rounded-rect paths (`:80-101`) and 40 `fillText` calls (`:107-111`) into an
`inert`, zero-height, `overflow: hidden` region; and `CoefficientsSpectrum.vue:99-103` spins up to 40
`AnimatedDigit` damping loops in the same invisible subtree. **Falsifier:** dies if the layer used
`v-if`/`Presence`; the docblock and the compiled `0fr` render refute that directly.

### C-11 · **MINOR** — the canvas never redraws on theme or DPR change, and bypasses the project's own theme-reactive colour surface

`FrequencyGraph.draw()` samples two environment values live and caches them in pixels:
`:56` `const dpr = window.devicePixelRatio || 1` and `:108`
`ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("color") || "#888"`.
Its **only** subscription is `:157`, a watch over props. The app toggles theme by mutating
`documentElement`'s class list — `App.vue:12-17` installs a `MutationObserver` on `attributeFilter:
["class"]` → `resolveVizColors()`. `FrequencyGraph` subscribes to neither the class mutation nor
`VIZ_COLORS`, so after a dark-mode toggle the index labels keep the previous theme's colour until an
unrelated prop change forces a redraw. There is no `ResizeObserver` and no `matchMedia("(resolution: …)")`,
so a window moved to a different-DPR display stays at the stale backing-store scale. Compounding it,
`spectrumColor` (`:42-45`) is theme-blind **by construction** — a hardcoded `hsl(h, 85%, 55%)` that never
consults `lib/colors.ts`'s reactive `VIZ_COLORS` (`:77-96`), the project's own answer to this exact
problem. `onUnmounted` is imported at `:2` and never used — the fossil of a listener teardown that was
removed or never written. **Falsifier:** dies if a theme/resize subscription existed; `grep "onUnmounted\|
ResizeObserver\|matchMedia\|VIZ_COLORS" FrequencyGraph.vue` → only the unused import at `:2`.

### C-12 · **MINOR** — a Tooltip with an empty trigger whenever the expand button is absent

`CoefficientsSpectrum.vue:124` opens `<Tooltip :text="…">` with **no** `v-if`; the guard
`v-if="totalComponents > 12"` sits on the `<Button>` **inside** it (`:125-126`). With ≤ 12 components the
shim still mounts `TooltipRoot` + `PopperRoot` + `<TooltipTrigger as-child>` over an **empty default slot**
(`ui/tooltip/Tooltip.vue:27-29`), and a `TooltipContent` whose text still interpolates a nonsense string
("Show top 40 of 8 coefficients"). `as-child` over an empty slot is outside reka-ui's contract; at minimum
it leaves a live popper context per panel with nothing to anchor. **Falsifier:** dies if the `v-if` were on
the `Tooltip`; `:124` has no directive and `:126` carries it.

### C-13 · **INFO** — `deep: true` is inert against `markRaw`'d data

`workspace.ts:299` writes `epicycleData.value = markRaw(result)`; `FrequencyGraph.vue:157` watches with
`{ deep: true }`. Vue's `traverse` short-circuits on `ReactiveFlags.SKIP`, so the deep flag traverses
nothing; the watcher fires on the getter's fresh-array identity regardless. Harmless today, misleading to
the next reader, and a live trap if `markRaw` is ever dropped (deep traversal of a 40-component ×
`{coefficient:[2]}` payload on every tick).

### C-14 · **INFO** — cross-route module placement

`CoefficientsPanel` lives in `components/visualization/` and imports `FrequencyGraph` from
`components/equation/` (`:5`). Per C-3, `FrequencyGraph` has **no** equation-route consumer — it is a
visualization component sitting in the equation folder, so the feature-folder boundary reports a coupling
that does not exist and hides the one that does.

### C-15 · **INFO** — hand-wired `tabular-nums` on the primitive that exists to eliminate it

`CoefficientsSpectrum.vue:99-103` passes `class="w-16 text-right fira-code text-muted-foreground
tabular-nums"` to `AnimatedDigit`, whose own docblock
(`glass-ui/dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts:3-8`) states it "ships the
tabular-numerals + ss01 + lnum font-feature register **so consumers stop hand-wiring those rules per
site**". The consumer hand-wires one third of that register anyway.

### C-16 · **INFO** — keyframes.js is a declared dependency this subtree does not touch

`@mkbabb/keyframes.js@^4.3.0` is declared (`web/package.json:15`) and installed at 4.3.0; repo-wide it has
**one** live import (`composables/useFourierMorph.ts:14`) and one comment (`stores/animation.ts:47`). All
motion in this subtree is hand-rolled: CSS transitions (`CoefficientsSpectrum.vue:147-163`, currently
inert per C-5), the `duration-500` Tailwind bar transition (`:91`), and an imperative canvas redraw with
no rAF scheduling (`FrequencyGraph.vue:157,159`). Not a defect on its own — recorded as the consumption
denominator: **1 of 4 first-party packages is meaningfully consumed by this subtree.**

---

## §2 — SEVERITY ROLL-UP

| id | severity | one line | anchor |
|---|---|---|---|
| C-1 | **BLOCKER** | same harmonic, three colours (graph vs list vs canvas) | `CoefficientsPanel.vue:20` · `CoefficientsSpectrum.vue:38,47` · `FrequencyGraph.vue:42` · `transforms.ts:3` |
| C-2 | MAJOR | value.js 0.13 `sampleColorRamp` installed, unused, hand-rolled 4× | `value.js/dist/units/color/mix.d.ts` |
| C-3 | MAJOR | 2 emits + 2 optional props dead at the only callsite; `cursor-pointer` is a lie | `FrequencyGraph.vue:15-18,179,182` |
| C-4 | MAJOR | a11y `test.fixme` stale — glass-ui 4.0.0 ships `inert` | `visualization-ux.spec.ts:110,120,130,133` |
| C-5 | MAJOR | `coeff-list` transitions inert: fragment-rooted Tooltip child | `CoefficientsSpectrum.vue:79-122,147-163` |
| C-6 | MAJOR | twin panels use two chassis; the twin's is the fled `Collapsible` | `CoefficientsPanel.vue:14` vs `EqCoefficientsPanel.vue:12` |
| C-7 | MAJOR | zero props/emits, store-coupled, untested, asymmetric with twin | `CoefficientsPanel.vue:8,10` |
| C-17 | MAJOR | descending-amplitude invariant unexpressed client-side (R6-8 dual) | `CoefficientsSpectrum.vue:43` · `types.ts:22-27` · `epicycles.py:54` |
| C-8 | MINOR | empty-state copy shown during compute | `CoefficientsPanel.vue:15` · `workspace.ts:50` |
| C-9 | MINOR | `0 / 0` badge over the empty text | `CoefficientsSpectrum.vue:72-75` |
| C-10 | MINOR | full draw + 40 damping loops while collapsed and `inert` | `CoefficientsPanel.vue:14` · `FrequencyGraph.vue:157,159` |
| C-11 | MINOR | no theme/DPR redraw; bypasses `VIZ_COLORS`; dead `onUnmounted` | `FrequencyGraph.vue:2,56,108,157` |
| C-12 | MINOR | Tooltip with empty `as-child` trigger at ≤12 components | `CoefficientsSpectrum.vue:124-126` |
| C-13 | INFO | `deep: true` inert against `markRaw` | `FrequencyGraph.vue:157` · `workspace.ts:299` |
| C-14 | INFO | visualization component filed under `equation/` | `CoefficientsPanel.vue:5` |
| C-15 | INFO | redundant `tabular-nums` on `AnimatedDigit` | `CoefficientsSpectrum.vue:99-103` |
| C-16 | INFO | keyframes.js declared, untouched here | `web/package.json:15` |

**Blast-radius note.** C-1, C-2 and C-11 are one fix: a single value.js-backed ramp module, keyed by the
harmonic's `index` (not its ordinal) and sampled once against the theme's surface lightness, kills the
three-way divergence, retires four hand-rolls, and makes the spectrum theme-reactive. C-3 and C-14 are one
fix. C-7 and C-8 are one fix.

---

## §3 — SUPERLATIVES (L-18 runs both ways)

### S-1 — the `#graph` slot is the correct factoring, and the docblock earns it

`CoefficientsSpectrum.vue:2-9` states the extraction honestly: two ~95 %-identical consumers (D7 / D11),
"the sole structural divergence — the visualization route's `FrequencyGraph` — is hoisted to the `#graph`
slot; the equation route passes nothing." `CoefficientsPanel.vue:16-23` consumes it exactly that way.
The cheap wrong answer here is a `:show-graph` boolean plus an internal import, which would have coupled
the shared child to a route-specific component forever; the tree took the slot. **Falsifier:** a boolean
flag or a route check inside `CoefficientsSpectrum` — `grep` finds neither; the child imports nothing
route-specific.

### S-2 — the transition CSS consumes a real glass-ui motion token through a four-hop chain that actually resolves

`CoefficientsSpectrum.vue:147-160` uses named properties (`opacity`, `transform` — no `transition: all`)
with `var(--ease-standard)`, and the `A.W3.d` comment at `:146` claims exactly that. The token resolves:
`web/src/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `glass-ui/package.json` `"./styles":
"./dist/styles/index.css"` → `index.css:149` `@import "./tokens.css"` → `dist/styles/tokens/scheme-motion.css:216`
`--ease-standard: var(--motion-ease-standard)` → `:211` `--motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`.
Hand-rolled beziers are the norm in this class of code; this is a correctly-bridged design-system token.
**Falsifier:** an undefined custom property would invalidate the whole shorthand and silently drop the
transitions — I checked for exactly that and it is refuted at the two definition sites.
(The rules are nevertheless inert per C-5 — the *token consumption* is exemplary, its *host* is broken.)

### S-3 — `AnimatedDigit` is consumed to contract, not hand-wired

`CoefficientsSpectrum.vue:99-103` passes `:value="comp.amplitude"` and `:format="fmtAmplitude"` — matching
`AnimatedDigitProps` (`value: number | null | undefined`, `format?: (v: number) => string`) exactly — and
leaves `placeholder` / `digitCount` / `mode` / `damping` to the primitive. The primitive's own docblock
records that it was promoted precisely to retire the `useAnimatedNumber(metric) → <span class="tabular-nums">`
hand-wire; this consumer did not re-create it. **Falsifier:** a local `useAnimatedNumber` or a mistyped
formatter — neither is present. (Docked one notch by C-15.)

### S-4 — `ConfiguratorLayer` is consumed to contract *and* inside its documented chassis

`CoefficientsPanel.vue:14` passes only real props — `label`, `sub`, `default-open` all appear in
`ConfiguratorLayer.vue.d.ts`'s `__VLS_Props` — with no attribute-fallthrough hacks and no style override.
And the panel is mounted **inside a real `<Configurator>`**: `VisualizationView.vue:194`
`<Configurator scroll-mode="auto" class="viz-configurator">` … `:273` `<CoefficientsPanel …/>`, which is
what the primitive's docblock requires ("labeled section inside a `<Configurator>`'s controls column") and
what its density provider (`provideConfiguratorDensity` / `useOptionalConfiguratorDensity`) assumes. A
floating layer outside its provider is the common failure; this is not it. **Falsifier:** the mount site —
checked, it is inside.

### S-5 — the compute seam the panel sits on has real revision + abort discipline

The panel's single data dependency is written under a guard: `workspace.ts:288-303` takes
`const rev = ++epicycleRevision` before the await and re-checks `if (epicycleRevision !== rev) return;`
before `epicycleData.value = markRaw(result)`; `saveContourPoints` (`:269-271`) bumps both revisions and
calls `api.abortInflight(["computeEpicycles", "computeBases"])`. A stale response cannot repaint this
panel. `markRaw` on a 40-component payload with two `{x[],y[]}` traces is also the right call.
**Falsifier:** an unguarded write on this path — there is none.

### S-6 — the panel touches the 45-operation API surface exactly zero times

`CoefficientsPanel` imports no `lib/api.ts` symbol, constructs no URL, and knows no operation name; its
data arrives through one store field written at one site (`workspace.ts:299`, from `api.computeEpicycles`
at `:290`). Against R6-8's finding that fourier's operation and client leaves are structurally
non-isolable, this component is on the right side of the seam — which is also why C-17's risk is
*containable*: one write site to guard, not a fan-out.

---

## §4 — WHAT THE CORPUS ALREADY KNEW, AND WHERE THIS LANE EXTENDS IT

| corpus row | status here |
|---|---|
| **R3-7a** — 35 Tooltip callsites / 9 consumers → F.W3 `ui/tooltip` migration budget | **CONFIRMED**: `grep -c "<Tooltip" CoefficientsSpectrum.vue` → **2**, matching R3-7a's per-file figure exactly. **EXTENDED** by C-5: the shim is not a passive migration chore — it is currently disabling a `TransitionGroup`, and a barrel-swap alone will not cure it. |
| **R3-10** — 6 dynamic `:is` families; two lost between registries, one being `CoefficientsSpectrum.vue:132` | **CONFIRMED at the exact line**: `CoefficientsSpectrum.vue:132` is `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. This subtree owns 1 of the 6 F.W4 budgeted sites. |
| **R3-7b** — OpenAPI security `RED_0_OF_45` → F.W5 | **USED as context** for C-17: the schema surface that would carry an ordering contract documents nothing of the kind. |
| **R6-8** — an operation record embedding derived client back-references cannot attribute a defect to one side → F.W5 | **EXTENDED**: C-17 is the **dual** — a client leaf carrying a derived assumption the operation record does not publish. Same seam, opposite direction, same wave. |
| **X-3** — 45 total / 30 public-non-admin / 13 admin | **USED as the denominator** in §0 and C-17. |
| census §3a "66 SFC / 65 TS" | not re-derived; out of this axis' scope. |

**No corpus row is contradicted by this lane.** Two claims I expected to find and could **not** —
recorded because a challenge that only reports hits is not a challenge:

- **"`--ease-standard` is undefined, so the transitions are dropped."** *Refuted* — it is defined twice in
  glass-ui (`tokens/scheme-motion.css:216`, `theme/bridges.css:325`) and the import chain from
  `web/src/style.css:3` reaches both. Recorded as **S-2**.
- **"`maxAmplitude = components[0].amplitude` is wrong because the API returns index order."** *Refuted at
  the producers* — all four sort descending (`epicycles.py:54`, `bases_fitting.py:78,160`, `spline.py:116`).
  The invariant holds; only its *expression* is missing, which is why C-17 is MAJOR-as-contract rather
  than a live correctness bug.

---

## §5 — METHOD, SCOPE, AND LIMITS

- **Writes:** one — this file. `/Users/mkbabb/Programming/fourier-analysis` was read-only throughout; no
  product source in any repo was modified; `scripts/dev/dev.sh` was not touched.
- **Tools:** `cat` / `sed` / `grep` / `find` / `ls` / `wc` / `node -e` (to read compiled `dist` chunks and
  `package.json` export maps), plus `Read` on the two corpus files. **No browser tooling.**
- **Unresolved-by-construction (SS-13 queue):** C-4's axe verdict after un-`fixme`; C-5's console warning
  and the visually-absent row stagger; C-6's F-ε-3 reproduction on the equation route; C-10's measured
  collapsed-state draw cost. All four have their *source* halves proven above; only the live half is owed.
- **Scope note.** `CoefficientsPanel` is 26 lines and delegates almost everything. Per the brief ("read the
  component whole + every file it imports"), findings in `CoefficientsSpectrum` / `FrequencyGraph` /
  `ui/tooltip` are in scope **as consumed surface** and are anchored to their own files; C-1, C-3, C-4, C-7,
  C-8, C-10 and C-14 are additionally caused or parameterised by `CoefficientsPanel`'s own four bindings
  (`:default-open="false"`, `:max-bars="40"`, `empty-text`, `:components`), which is what makes a 26-line
  component carry a BLOCKER.
