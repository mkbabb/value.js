claude-opus-5[1m]

# CHALLENGE — `SvgFilters.vue` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/SvgFilters.vue` (178 lines)
**Axis** C — consumption of value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the fourier API (45-op surface, R6-8 client↔operation coupling); props/emits contract; integration seams.
**Method** static + source-derived only. `fourier-analysis` read as evidence; no writes there. No browser (SS-13 claims marked UNPROVEN-NEEDS-LIVE).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and the falsifiers were run.

---

## §0 — THE HEADLINE

**This component consumes none of the four surfaces the axis names — and that is not the defect. The defect is that it consumes nothing *downstream* either.**

All four SVG filters it defines are **orphaned**. Not one `url(#…)` reference to `#title-boil`, `#wobble-celestial`, `#paper-grain`, or `#canvas-grain` exists anywhere in the served tree. Two of them once had consumers and lost them to ordinary refactors (`65c1565`, `e9c7bc4`); two never had a consumer in the repository's entire history. The component is nonetheless mounted unconditionally at `App.vue:22`, above the router, for every route — where it holds two permanent subscriptions on pencil-boil's singleton `requestAnimationFrame` scheduler and, ~13 times a second, performs two uncached `querySelector` traversals to `setAttribute` a `baseFrequency` that no rasteriser will ever read.

The interesting consumption fact is therefore inverted from the brief's expectation. `SvgFilters` sits **entirely outside** the F.W2 API blast radius (no `@/lib/api`, no store, no operation leaf — the R6-8 coupling is structurally unreachable here) and **entirely inside** the pencil-boil + glass-ui blast radius. And its single glass-ui contact is a *duplication*: `#paper-grain` is a primitive-for-primitive fork of glass-ui's own `--paper-clean-texture` token, whose producer comment names fourier as the source it was restored from — while `App.vue:24` already applies the glass-ui class that the token backs.

**Tally.** 11 booked defects — **1 BLOCKER**, 4 MAJOR, 5 MINOR, 1 INFO-defect (+1 INFO-context, not counted). **3 superlatives** (L-18 runs both ways). Two explicit contradictions of the hitherto corpus.

---

## §1 — BLOCKER

### C-B1 · All four filter definitions are orphaned; the component renders and animates nothing

**BLOCKER.**

**Provenance.**
- Definitions: `SvgFilters.vue:66-176` — `#title-boil` (:69), `#wobble-celestial` (:96), `#paper-grain` (:122), `#canvas-grain` (:150).
- Mount: `web/src/App.vue:7,22` — `<SvgFilters />`, unconditional, outside `<RouterView>`, so every route pays for it.
- The only references to those ids in the entire source tree are **inside the component itself**, at `SvgFilters.vue:26` and `:38`, where the animators `querySelector` their own `<defs>`:

```
$ grep -rn 'title-boil\|wobble-celestial\|paper-grain\|canvas-grain' web/src web/index.html web/e2e
web/src/components/decorative/SvgFilters.vue:26  ·  :38  ·  :69  ·  :96  ·  :122  ·  :150
```

- `grep -rn 'url(#' web/src web/index.html` → **empty**. No CSS `filter: url(...)`, no SVG `filter=` attribute, no Tailwind arbitrary `[filter:url(#…)]` (the same grep covers all three spellings).
- `grep -rn 'filter=' web/src` returns only `:tier-filter` / `:basis-filter` props on `GalleryView.vue:232-237` — unrelated.

**Git provenance — how each id lost (or never had) its consumer.**

| id | consumer ever existed? | receipt |
|---|---|---|
| `#title-boil` | yes, **removed** | `git log -S'url(#title-boil)' --all` → `01eac1e` (added), `65c1565` (removed). `git show 65c1565` diff: the paper `<h1>` lost `style="filter: url(#title-boil)"` when it switched `fraunces`→`cm-serif`. Current `PaperView.vue:353-357` has no `filter`. |
| `#wobble-celestial` | yes, **removed** | `git log -S'url(#wobble-celestial)' --all` → `555cbd3` (added — `DarkModeToggle.vue` bound `:filter="!isDark ? 'url(#wobble-celestial)' : undefined"` on two paths), `e9c7bc4` (removed by the Fourier-morph rewrite). Current `DarkModeToggle.vue` (109 lines) imports `FourierMorphSvg` + `useFourierMorph` and never mentions a filter. |
| `#paper-grain` | **never** | `git log -S'url(#paper-grain)' --all` → **empty** across all history. |
| `#canvas-grain` | **never** | `git log -S'url(#canvas-grain)' --all` → **empty** across all history. |

Two dead by attrition, two **born dead**. The comments at `:67` ("for main heading"), `:93` ("for dark mode toggle (sun/moon)"), `:120` ("static fractal noise overlay") and `:148` ("for canvas/visualization area") are now all counterfactual — the file documents an integration that the tree does not have.

**Cost, not merely waste.** Because `useLineBoil(8, 150)` and `useLineBoil(8, 160)` both receive `frameCount = 8 > 1`, pencil-boil's enrolment `watchEffect` (`node_modules/@mkbabb/pencil-boil/src/vue.ts:141-147`) calls `start()`, which adds both subscribers and calls `ensureScheduler()` (`vue.ts:126-136`). The scheduler's `requestAnimationFrame` loop (`vue.ts:33-58`) then runs for the lifetime of the SPA and can only be disarmed by tab-hide (`vue.ts:73-88`) or unmount — neither of which occurs, because `SvgFilters` is mounted above the router. Every ~150ms and ~160ms respectively, `watch(boilFrame, applyBoilFrame)` / `watch(wobbleFrame, applyWobbleFrame)` (`SvgFilters.vue:47-48`) fire an uncached `svgRef.value.querySelector("#title-boil feTurbulence")` (`:25-27`, `:37-39`) and a `setAttribute` (`:32`, `:44`). Roughly 13.4 descendant-combinator selector matches per second, forever, producing zero pixels.

**Falsifier (run).** *Any* live reference to one of the four ids would demote this to at most MINOR-for-the-remainder. I searched: `web/src/**` (all extensions), `web/index.html`, `web/e2e/**`, and the whole git history for the applied form `url(#<id>)`. All negative. I also confirmed the ids cannot be reached through a computed string, because `url(#` appears **zero** times in `web/src` — there is no concatenation site to hide behind. The one residual escape hatch is an injection from a dependency's runtime CSS; that is falsified separately by C-M2, which shows glass-ui uses its *own* internally-scoped `id='n'` inside a data-URI, never a document-global id.

**Disposition.** F.W2 must decide *delete* vs *re-wire*, and the evidence points at delete for three of the four: `#paper-grain` is superseded by glass-ui (C-M2), `#canvas-grain` was never wired at all, `#title-boil` was deliberately dropped in a typography change. Only `#wobble-celestial` has a plausible re-wire target (`DarkModeToggle`), and that component was rewritten to a Fourier-morph approach that does not want a turbulence displacement.

---

## §2 — MAJOR

### C-M1 · A permanent singleton-rAF subscription bought for zero rendered effect

**MAJOR.**

**Provenance.** `SvgFilters.vue:20-21` (`useLineBoil(boilOffsets.length, 150)`, `useLineBoil(wobbleOffsets.length, 160)`) → `pencil-boil/src/vue.ts:141-147` (enrolment `watchEffect`: `if (sub.getFrameCount() > 1) start()`), `:126-136` (`start()` → `subscribers.add(sub)` → `ensureScheduler()`), `:33-58` (`schedulerTick` re-arms `requestAnimationFrame` unconditionally while `schedulerRunning`).

The gates that *would* have prevented enrolment do not fire: `prefersReducedMotion()` (`vue.ts:127`) is false for the default user, and `getFrameCount() <= 1` (`vue.ts:128`) is false because both offset arrays are length 8 (`SvgFilters.vue:12,16`). So both subscribers enrol at setup and never withdraw — `onUnmounted` (`vue.ts:150-153`) never runs for a component mounted above the router.

This is the *consumption*-axis reading of C-B1: the component's only third-party runtime dependency is used correctly at the API level and is nonetheless a pure cost, because the artefact it drives is disconnected.

**Falsifier (run, and it narrows rather than kills the claim).** The loop *does* pause on tab-hide (`vue.ts:73-88` `visibilitychange` handler cancels the rAF) and *would* never start under `prefers-reduced-motion: reduce`. So the claim is scoped precisely: **visible tab, motion allowed** — the default case. Under that scope the loop is unconditional. What I cannot measure statically is the frame-budget cost of the two `querySelector` calls; that is **UNPROVEN-NEEDS-LIVE (SS-13)**. The *existence* of the loop is proven from source and needs no browser.

---

### C-M2 · `#paper-grain` is a fork of a glass-ui design token the app already consumes

**MAJOR.** Violates the standing glass-ui-first law (`feedback_glass_ui_first_class`: primitives belong in the design system, not re-cut in the consumer).

**Provenance — the two artefacts, side by side.**

`SvgFilters.vue:129-145`:
```
feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"
feColorMatrix type="saturate" values="0"
feBlend in="SourceGraphic" in2="desaturated" mode="multiply"
```

`web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/scale-paper.css:80` — `--paper-clean-texture`, decoded from the data-URI:
```
feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'
feColorMatrix type='saturate' values='0'
<rect width='100%' height='100%' filter='url(#n)' opacity='0.04'/>
```

The turbulence + desaturation chain is **parameter-identical**: same type, same `0.65`, same `numOctaves="4"`, same `stitchTiles="stitch"`, same `saturate 0`. Only the composite differs (local `feBlend multiply` against `SourceGraphic` vs. producer bake-onto-opaque-rect at `opacity='0.04'`).

**And the app already consumes the producer's version.** `App.vue:24` puts `paper-texture` on the root shell div; that class is defined by glass-ui at `dist/styles/cards.css:10-15` (`background-image: var(--paper-clean-texture)`, `background-repeat: repeat`, `background-size: var(--paper-texture-size)`, `background-blend-mode: multiply`), reaching the app through `src/style.css:3` `@import "@mkbabb/glass-ui/styles"`. The dark-mode variant is handled upstream too (`cards.css:17-19`, blend flips to `screen`) — a case the local fork never considered.

The producer's own comment closes the loop on provenance (`scale-paper.css:73-79`):

> *"Canonical subtle paper-texture opacity — restored from fourier-original (`4df1a06:web/src/style.css:53-54`) after A.W3.5.ab confirmed the heretofore `opacity='1'` URI rendered as an overt grain field in every downstream consumer of `.paper-texture`."*

So the primitive was **upstreamed from fourier into glass-ui and hardened there** (the `opacity` calibration, the dark-mode blend flip), and fourier kept the un-hardened local copy. This is the exact failure mode the glass-ui-first law exists to prevent, and it is the component's *only* substantive glass-ui contact.

**Falsifier (run).** Two ways this claim dies: (a) the local filter is parameterised differently and therefore a legitimate variant — falsified, the chain is byte-equivalent modulo quoting; (b) the local filter is actually applied somewhere and glass-ui's is not — falsified in both directions by C-B1 (`url(#paper-grain)` never existed) and by `App.vue:24` (the glass-ui class is live). `#canvas-grain` (`:157-174`) is a second, coarser cut of the same primitive (`0.8` / `numOctaves="3"`) with the same status.

---

### C-M3 · No contract: zero props, zero emits, zero exports — the interface is four unnamespaced global ids consumed by magic string

**MAJOR.**

**Provenance.** `SvgFilters.vue:1-56` defines no `defineProps`, no `defineEmits`, no `defineExpose`, no module-scope export. `ls web/src/components/decorative/` → `FourierMorphSvg.vue`, `SvgFilters.vue` — **no `index.ts`**, so there is not even a barrel to hang a constant on. The component's entire public surface is the four `id` attributes at `:69`, `:96`, `:122`, `:150`, addressed by hand-typed strings at `:26` and `:38` and (formerly) by hand-typed strings in consumers (`git show 65c1565` → `style="filter: url(#title-boil)"`; `git show 555cbd3` → `:filter="!isDark ? 'url(#wobble-celestial)' : undefined"`).

**Why this is a contract defect and not a style preference.** SVG filter-reference resolution fails **silently**: an element referencing a missing filter id renders unfiltered, with no console error and no exception. Combine that with:

- `vue-tsc` cannot see into an attribute string, so a typo or a removal is invisible to the only static gate the frontend has;
- there is **zero test coverage** — `grep -rn 'SvgFilters\|title-boil\|paper-grain\|canvas-grain\|wobble' web/e2e` → **empty**, against a suite the corpus measures at 29 Playwright tests on a single chromium project (lane-frontend.md §0/§9), and with **vitest absent** from the frontend entirely (same source);

…and the result is exactly the observed history: **two consumers were deleted in ordinary refactors (`65c1565`, `e9c7bc4`) and nothing anywhere noticed.** C-B1 is not an accident that happened to this component; it is the predicted output of this contract shape.

The ids are also **document-global and unnamespaced** — `title-boil`, `paper-grain` are generic enough to collide with any other injected `<defs>` — and the component is a **singleton by construction** (a second mount duplicates all four ids, and SVG id resolution takes the first in document order) with nothing enforcing single-mount.

**Falsifier (run).** An exported id constant, a generated union type, a `defineExpose` returning the filter urls, or a test asserting `getComputedStyle(h1).filter !== 'none'` would each defeat this. `grep -rn 'FILTER_IDS\|export const.*boil\|export const.*grain' web/src` → empty; no barrel; no test. The minimal cure — export `const FILTER_IDS = {...} as const` and have consumers import it — would have turned both silent losses into typecheck errors.

---

### C-M4 · pencil-boil migration exposure — with a corpus contradiction and a corpus nuance

**MAJOR (as migration exposure) / the pin is CORRECT at HEAD (see C-S3).**

**Provenance.** `SvgFilters.vue:3` `import { useLineBoil } from "@mkbabb/pencil-boil";` is one of the app's pencil-boil consumption sites. `web/package.json:17` pins `^0.4.1`; installed `0.4.1` (`node_modules/@mkbabb/pencil-boil/package.json`). glass-ui 7.0.0 optional-peers `^0.11.2` (lane-frontend.md:60, :481; CENSUS-2026-08-03.md:105, :185, :220) — **7 minors on a 0.x line, where minor is the breaking increment.**

**CONTRADICTION of the corpus.** `lane-frontend.md:481` books the pencil-boil exposure as *"4 sites (`SvgFilters.vue:3`, `FourierShapeExtractor.vue:144`, `svg-fourier.ts:11`)"* — a count of 4 against a list of 3. The tree has **3**:

```
$ grep -rn '@mkbabb/pencil-boil' web/src
web/src/components/morph/FourierShapeExtractor.vue:144  (generateSunRays, wobbleDiamond, wobbleStarPolygon)
web/src/components/decorative/SvgFilters.vue:3          (useLineBoil)
web/src/lib/svg-fourier.ts:11                           (catmullRomToBezier)
$ … | wc -l
3
```

Three import statements, three files, four imported symbols in the parenthetical sense — the row's own bracket lists three paths, so the "4" is a miscount, not a different denominator. Correct the migration ledger to **3 sites / 5 symbols**.

**NUANCE the corpus does not state.** At HEAD the pin is not drifted at all — it is *exact*. glass-ui **4.0.0** (the installed version) declares `peerDependencies["@mkbabb/pencil-boil"] === "^0.4.1"` (`node_modules/@mkbabb/glass-ui/package.json:820`), which `0.4.1` satisfies precisely. The 7-minor gap is a **forward-only hazard against the glass-ui 7 target**, not a present break. Booking it as present drift would overstate the current tree; booking it as absent would understate F.W2's cost. Both readings matter and the corpus row states only the first.

**Falsifier (partially unmet — declared).** Whether the bump actually breaks `SvgFilters.vue:3` depends on `useLineBoil`'s 0.11.2 signature. pencil-boil 0.11.2 is **not on disk** in any repo I may read, so the *degree* of break is **UNPROVEN**. What is proven: the version gap, its direction, and that `SvgFilters` is one of exactly three sites that must be re-verified when the tri-package atomic transaction (lane-frontend.md:636) lands. Note the 0.4.1 API this file relies on is narrow — `{ currentFrame }` from a `(frameCount, intervalMs)` call — so the exposure is small in surface even if the version distance is large.

---

## §3 — MINOR

### C-m1 · The reduced-motion gate is redundant, non-reactive, and (per the corpus) miscounted as a live gate

**MINOR.** *Refines / partially contradicts `lane-frontend.md:616`.*

**Provenance.** `SvgFilters.vue:7-9` evaluates `window.matchMedia("(prefers-reduced-motion: reduce)").matches` **once, at setup**, into a `const`; `:24` and `:36` early-return on it. But pencil-boil already gates internally: `vue.ts:126-128`, `start()` returns before enrolling if `prefersReducedMotion()`.

The consequence chain: when the preference is ON, `useLineBoil` never enrols → `currentFrame` never changes → the two `watch`ers at `:47-48` never fire → the `reducedMotion` checks at `:24`/`:36` are **unreachable on the watch path**. They guard only the direct `onMounted` calls at `:52-53` — which are themselves a no-op (C-m2). And when the preference is OFF, the local check is dead weight evaluated ~13×/s.

Neither gate is reactive: the local one is a `const` snapshot, and pencil-boil re-reads `prefersReducedMotion()` only inside `start()`, which the enrolment `watchEffect` (`vue.ts:141-147`) will not re-run on a media-query change (it tracks `frameCount`, not `matchMedia`). A user toggling the OS setting mid-session changes nothing in either direction.

**The corpus row.** `lane-frontend.md:616` books `decorative/SvgFilters.vue:7-9,24,36` as a live JS reduced-motion gate, contributing to the lane's "18 reduced-motion references" hygiene credit. It is a real code path, so the row is not false — but the credit is hollow twice over: the gate is **duplicative** of the library's own, and it gates **nothing observable**, because the filters it protects are orphaned (C-B1). When F.W2 re-measures reduced-motion coverage, this reference should not count toward the numerator.

**Falsifier (run).** A `matchMedia(...).addEventListener('change', …)` anywhere in the file, or a live filter consumer, would rescue one half each. Neither exists.

---

### C-m2 · The `onMounted` priming write is a no-op

**MINOR.**

**Provenance.** `SvgFilters.vue:50-55` spends a `requestAnimationFrame` to call `applyBoilFrame(boilFrame.value)` and `applyWobbleFrame(wobbleFrame.value)`. At mount, `currentFrame` is `ref(0)` (`pencil-boil/src/vue.ts:110`). `boilOffsets[0] === 0` (`:12`) ⇒ `freq = Math.round(0.015 * 10000)/10000 = 0.015` — which is **exactly** the attribute already in the markup at `:79`. Identically, `wobbleOffsets[0] === 0` (`:16`) ⇒ `0.02`, already at `:107`.

So the priming block writes the values that are already there, for both filters, on every mount.

**Falsifier (run).** If either offset array began with a non-zero element, or if the markup defaults differed from `baseFreq`/`wobbleBaseFreq`, the priming would be load-bearing. Both arrays start at `0` and both markup defaults equal their constants.

---

### C-m3 · Copy-paste asymmetry between the two grain filters

**MINOR.**

**Provenance.** `#canvas-grain`'s terminal `feBlend` carries `result="grained"` (`SvgFilters.vue:169-174`); `#paper-grain`'s structurally identical terminal `feBlend` does not (`:141-145`). A `result` on the *last* primitive in a filter chain is inert — the last primitive's output is the filter result regardless, and nothing references `grained`.

Low impact on its own; it is booked because it is direct evidence that the second grain filter was cloned from the first rather than authored, which is the same provenance that produced the never-referenced `#canvas-grain` (C-B1).

**Falsifier (run).** `grep -rn 'grained' web/src` → the single definition site only, no consumer.

---

### C-m4 · SSR guard in an SPA with no SSR path

**MINOR.**

**Provenance.** `SvgFilters.vue:8` `typeof window !== "undefined" &&` — but the app has no server-render path: `web/index.html:35-36` is a bare `<div id="app">` + `<script type="module" src="/src/main.ts">`; `web/src/entry-server.ts` does not exist (`ls` → No such file or directory); `web/package.json:8` builds with `vue-tsc -b && vite build` and previews with `vite preview`.

It is also internally inconsistent: the same setup body reaches DOM APIs unguarded downstream, and the dependency it calls installs a `document.addEventListener('visibilitychange', …)` at module scope (`pencil-boil/src/vue.ts:71-89`) behind its own `typeof document` guard — so the guard here protects the *lesser* of the two hazards.

Harmless, but it is a false signal to a future reader that this component was designed for an SSR contract it has never had.

**Falsifier (run).** An `entry-server`, an `@vitejs/plugin-vue` SSR build target, or a `vite-ssg`-style script would legitimise it. None present.

---

### C-m5 · The grain composite would carry alpha noise, unlike the producer's bake — **UNPROVEN-NEEDS-LIVE**

**MINOR · UNPROVEN-NEEDS-LIVE (SS-13).**

**Provenance / reasoning.** `feColorMatrix type="saturate" values="0"` (`SvgFilters.vue:136-140`, `:164-168`) operates on colour channels; `feTurbulence`'s output carries **noise in the alpha channel too**, which `saturate` does not flatten. The subsequent `feBlend in="SourceGraphic" in2="desaturated" mode="multiply"` (`:141-145`, `:169-174`) therefore composites the source against a field that is variably transparent as well as variably grey — a tint plus alpha holes, not the intended flat grain.

glass-ui's token sidesteps exactly this by rendering the filter onto an **opaque `<rect>` at a fixed `opacity='0.04'`** inside the data-URI (`scale-paper.css:80`), so the alpha is authored rather than inherited from turbulence — which is coherent with the producer note at `:73-79` about calibrating that opacity after downstream over-grain reports.

**Falsifier (NOT run — declared).** This requires rasterising both filters against a known source and comparing per-pixel alpha; no browser tooling is permitted on this pass. Recorded as a live-probe item, not as an established defect. If a live probe shows the alpha term negligible at these frequencies, downgrade to INFO. Note the practical stakes are nil today (C-B1), which is why it stays MINOR: it matters only if F.W2 chooses re-wire over delete.

---

## §4 — INFO

### C-i1 · Zero fourier-API contact — correct, and useful to F.W2 sequencing (INFO-context, **not** counted as a defect)

`SvgFilters.vue` imports exactly two modules: `vue` (`:2`) and `@mkbabb/pencil-boil` (`:3`). No `@/lib/api`, no pinia store, no `fetch`. The 45-operation surface is unreachable, and so is the R6-8 coupling — the intake's substantive finding, adjudicated **TRUE** at `lane-fourier-r3-r6.md` R6-8, that `operation:PATCH:/api/visualizations/{slug}` embeds `"clients": ["client:updateVisualization"]` with `clientDisposition: CLIENT_MATCH_SOURCE_DERIVED`, making the client and operation leaves *structurally non-isolable*. A component with no client leaf cannot participate in that ambiguity.

For a decorative `<defs>` host this is the **right** answer, and it bounds the migration usefully: `SvgFilters` carries **no** API risk into F.W5's admission keystone, and **all** of its risk into the pencil-boil/glass-ui transaction. Booked as context, not as a defect.

### C-i2 · The tree is already outside glass-ui 4.0.0's declared value.js peer range at HEAD — a corpus gap

**INFO (defect — repo-level; explicitly NOT attributable to `SvgFilters`, which imports neither package).**

**Provenance.** `node_modules/@mkbabb/glass-ui/package.json:821` declares `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`. `web/package.json:18` pins `"^0.13.0"`, and `0.13.0` is installed. Under npm 0.x semver, `^0.11.0` ⇒ `>=0.11.0 <0.12.0`, so **0.13.0 satisfies neither disjunct** — the tree is out of the installed producer's declared range *today*, before any migration.

Precision matters here: value.js is an **optional** peer (`package.json:846-848` `"@mkbabb/value.js": { "optional": true }`). Optional means *may be omitted*, not *any version accepted* — when present and out of range it is still a declared-range violation, and npm ≥7 reports it as a conflict.

**Why this is a corpus gap.** `lane-frontend.md:59` records the pin/installed/producer-latest row, and `:480` records the *forward* floor (glass-ui 7 peers `value.js ^4.0.0`; installed 0.13.0). Neither records that the tree is **already** non-conforming against glass-ui **4**. That changes the migration framing: the value.js hop is not "0.13 is fine until we bump glass-ui", it is "0.13 was never in range for the glass-ui we ship". Worth a row in the F.W2 ledger.

**Falsifier (run).** If `^0.11.0` admitted 0.13.0 the claim dies; it does not under npm's caret rule for 0.x majors. If value.js were a hard peer the severity would rise; it is optional, which is why this stays INFO.

---

## §5 — SUPERLATIVES (L-18 both ways)

### C-S1 · Correct abstention from keyframes.js — the boil is a step function, not a tween

**Superlative.**

The component animates an 8-position **discrete** cycle at a fixed 150/160ms cadence (`SvgFilters.vue:12,16,20-21`). That is a step sequence, not an interpolation, and reaching for keyframes.js 4.3's `Animation` engine would have been the wrong instrument — as demonstrated by the app's own *correct* use of it for a real tween at `web/src/composables/useFourierMorph.ts:14` (`loadAnimationEngine`, `type Animation`, cited at lane-frontend.md:479).

What it chose instead is strictly better than the obvious alternative: pencil-boil's `useLineBoil` is a **shared singleton rAF scheduler** (`vue.ts:28-58`) — one loop for *all* boil consumers in the app, with tab-visibility pause (`:71-89`) and an internal reduced-motion gate (`:126-128`) — rather than a per-component rAF or timer. And that choice was a deliberate improvement, landed at `555cbd3`: *"Replace manual setInterval boil in SvgFilters with pencil-boil useLineBoil"*, self-documented in the file at `:19`.

**Falsifier (run, and it inverts cleanly).** If the file owned its own `requestAnimationFrame` or a `setInterval`, this would be a defect rather than a superlative — `grep -n 'setInterval\|requestAnimationFrame' SvgFilters.vue` finds exactly one rAF, at `:51`, used once for mount priming and never re-armed. The library owns the loop.

The bitter note: this is a genuinely well-chosen consumption of a well-designed primitive, in service of an artefact nothing renders (C-B1). The craft is real; the wiring is not.

### C-S2 · The float-rounding is load-bearing, not cargo-cult

**Superlative.**

`Math.round((baseFreq + offset) * 10000) / 10000` (`SvgFilters.vue:31`, `:43`) reads at a glance like defensive noise. It is not: in IEEE-754, `0.015 + 0.002 === 0.017000000000000001`, and `String()` of that would write an 18-character `baseFrequency` attribute eight times a second. The round emits `"0.017"`.

**Falsifier (run).** If every `baseFreq + offset` sum were exactly representable the round would be dead code — I checked the eight sums for each filter, and several are not. The guard earns its place.

### C-S3 · The pencil-boil pin is the only one of the four `@mkbabb` deps in peer-compliance at HEAD

**Superlative.**

`web/package.json:17` pins `"@mkbabb/pencil-boil": "^0.4.1"`; installed `0.4.1`; glass-ui 4.0.0 (the installed producer) declares `peerDependencies["@mkbabb/pencil-boil"] === "^0.4.1"` (`node_modules/@mkbabb/glass-ui/package.json:820`) — an exact match. Applying the identical method to value.js returns a **violation** (C-i2). So the dependency `SvgFilters.vue:3` reaches for is, at HEAD, the correctly-pinned one.

**Falsifier (run).** The method is symmetric and was run on both: same producer manifest, same caret rule, opposite results. The 7-minor forward gap against glass-ui 7 (C-M4) does not touch this claim, which is scoped to HEAD.

---

## §6 — WHAT F.W2 SHOULD CARRY

1. **Rule on delete-vs-rewire for the four filters (C-B1).** The evidence favours delete for `#title-boil` (dropped by an intentional typography change at `65c1565`), `#canvas-grain` (never referenced in repository history), and `#paper-grain` (superseded upstream — C-M2). Only `#wobble-celestial` has a candidate host, and that host was rewritten away from turbulence displacement. Deleting all four retires the component, `App.vue:22`, and both rAF subscriptions.
2. **Book the glass-ui-first duplication (C-M2)** and relay it to the glass-ui BH inbox per standing law — the producer already owns the hardened primitive and its comment already names fourier as its origin.
3. **Correct the migration ledger:** pencil-boil is **3 sites**, not 4 (`lane-frontend.md:481`); and the pin is exact at HEAD, drifted only against the glass-ui 7 target (C-M4).
4. **Add the HEAD-state value.js peer violation (C-i2)** as its own ledger row — the tree is out of glass-ui **4**'s declared range today, which is a stronger motivation for the atomic tri-package transaction than "0.13 lags 4.0".
5. **Discount `SvgFilters.vue:7-9,24,36` from the reduced-motion coverage numerator (C-m1)** when that metric is re-measured.
6. **If — and only if — rewire is chosen:** export the ids as a typed constant (C-M3), drop the redundant local reduced-motion gate (C-m1), drop the no-op priming (C-m2), cache the `querySelector` results or bind `baseFrequency` through the template instead of imperative `setAttribute` (C-M1), and run the alpha-composite probe (C-m5).

## §7 — METHOD AND LIMITS

Read whole: the target (178 lines) and its complete import closure — `pencil-boil/src/index.ts`, `pencil-boil/src/vue.ts` (the only member it uses). Read for seam context: `web/src/App.vue`, `web/src/lib/colors.ts`, `web/src/components/layout/DarkModeToggle.vue` (import surface), `web/src/components/paper/PaperView.vue:350-360`, `web/index.html`, `web/package.json`, glass-ui `package.json` peer block + `dist/styles/cards.css` + `dist/styles/tokens/scale-paper.css`. Corpus folded: `formation/fourier/lane-frontend.md` (rows :41, :55-70, :167-179, :369, :432, :475-490, :565, :616, :636), `formation/fourier/CENSUS-2026-08-03.md` (:90-115), `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R6-8, TRUE).

Not done: no browser, so every rendering claim is either source-derived or marked UNPROVEN-NEEDS-LIVE (only C-m5, plus the frame-cost half of C-M1). pencil-boil 0.11.2 is not on disk, so C-M4's break *degree* is declared unproven. No writes outside this file; `fourier-analysis` was touched read-only (`git log`, `git show`, `grep`, `sed -n`).
