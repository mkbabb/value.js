claude-opus-5[1m] (served model id)

# CHALLENGE · `CoefficientsSpectrum.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (168 lines).
**Repo state** `fourier-analysis` @ branch `m/w1-bump-migration`, HEAD `cd26c65`, 28 uncommitted paths.
The subject file is **HEAD-clean**; `web/package.json` on disk is the **in-flight bump [WT]** (HEAD pins glass-ui `^3.1.0` / keyframes `^2.2.0` / value.js `^0.10.0`). Every version claim is tagged **[WT]** or **[HEAD]**. Of every other file cited below, `git status --porcelain` over the set returns exactly one line — `M web/package.json` — so all other line cites are `[HEAD ≡ WT]`.
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are tagged **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Four candidate defects were **killed by their own falsifier** and are recorded in §5 — L-18 runs both ways.

> **§0.1 · Revision note (this pass).** This document is the **second** C-axis pass on the subject. It folds the first pass whole — its ids (`B-1`, `C-1…C-19`, `I-1…I-6`, `K-1…K-3`, `S-1…S-6`) are preserved verbatim so the F.W1–F.W5 carries stay traceable — and then adds what the first pass missed and corrects what it got wrong. **New in this pass:** `B-2`, `C-20…C-27` (8 rows), `I-7`, `K-4`, `S-7…S-9` — taking the tally from 20 defects / 1 blocker / 6 superlatives to **29 / 2 / 9**. **Corrected in this pass:** `B-1`'s per-component chain (refuted at its last hop — see `K-4`), `C-2`'s symbol list (one of five names is not in 0.13.0's export map), `S-1` (half of it is refuted by `:102` — the refuted half becomes `C-20`), `S-3` (glass-ui already ships the monolith the shim re-implements — see `C-25`). Corrections are marked **[CORRECTION]** inline.

**Consumption surface, measured.**

| Producer | Direct import in this file | Site |
|---|---|---|
| `@mkbabb/glass-ui` | `Button`, `AnimatedDigit` (+ `Tooltip*` via the local shim) | `:18`, `:19`, `ui/tooltip/Tooltip.vue:13-17` |
| `@mkbabb/keyframes.js` | **none direct** — transitive via `AnimatedDigit → useAnimatedNumber → SmoothProgress` | `glass-ui/dist/useAnimatedNumber-C_3wZLx4.js:3` |
| `@mkbabb/value.js` | **ZERO — and zero transitively too** (K-4) | (see C-2) |
| fourier API (45 ops) | **zero client calls**; coupled only through the `BasisComponent` DTO | `:22` → `web/src/lib/types.ts:1-6` |
| `lucide-vue-next` | `ChevronDown`, `ChevronUp` | `:20` |

---

## §1 · BLOCKER

### B-1 · The installed `value.js@0.13.0` **violates** `glass-ui@4.0.0`'s declared peer range; `npm ls` exits 1 [WT]

**Severity BLOCKER.** **Provenance** `web/package.json:14,15,18` [WT] · `node_modules/@mkbabb/glass-ui/package.json` `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"` · `node_modules/@mkbabb/keyframes.js/package.json` `dependencies["@mkbabb/value.js"] = "^0.13.0"`.

Machine receipt, run in `web/`:

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS          # exit status 1
```

`semver.satisfies("0.13.0", "^0.10.0 || ^0.11.0")` → **`false`** (pre-1.0 caret pins the minor). Independently re-verified this pass: keyframes 4.3.0's `dependencies` is exactly `{"@mkbabb/parse-that":"^0.9.0","@mkbabb/value.js":"^0.13.0"}` — a **hard** dependency, not a peer — and glass-ui 4.0.0's peer range forbids it. **The two are mutually unsatisfiable with a single copy.** The installer resolved in keyframes' favour and left glass-ui's peer red. (Also re-verified: keyframes 4.3.0 carries `optionalDependencies: {"@mkbabb/glass-ui": "~4.0.0"}` — the tilde pin that corpus `lane-frontend.md:490` calls the hard lock on the 4.0.x line.)

The census records the *bump* as [P0] (`CENSUS-2026-08-03.md:108-109`, `lane-frontend.md:490-492`) but records the pins as "AGREE"; it does **not** record that the current graph is already **invalid** rather than merely stale. That is the finding.

**[CORRECTION] The first pass justified this as a per-component blocker via a runtime chain that does not exist.** It asserted `useAnimatedNumber → keyframes → engine-BKm1GcJT.js → value.js`, concluding "the numerals in every coefficient row are damped by a keyframes engine built against value.js@0.13". **The last hop is refuted** — see **K-4**. `SmoothProgress` is exported from the package entry `keyframes.js`, whose *static* import graph is exactly five chunks (`binarySearch-DOP8erk-`, `decay-BvNmFk51`, `sequence-COn8zk5o`, `springTimingFunction-CcJEvGwN`, `timeline-BjcmprQ6`), **none of which contains the string `@mkbabb/value.js`** (`grep -c` → `0` on all five, and `0` on the entry itself). `engine-BKm1GcJT.js` is reached only through `import("./engine-BKm1GcJT.js")` — one of eight **dynamic** imports in the entry — which in fourier is triggered solely by `loadAnimationEngine` (`web/src/composables/useFourierMorph.ts:14`), a call this component never makes.

B-1 therefore stands as a **workspace/manifest** blocker and **not** as a per-component one. This component is *not* the minimal repro. That correction cuts against the first pass and **for** C-2: the subject consumes zero value.js **statically and transitively**.

**Falsifier.** Run `npm ls @mkbabb/value.js` in `fourier-analysis/web`. Exit 0 with no `invalid:` marker kills it; it exits 1. Secondary: glass-ui marks this peer `optional` in `peerDependenciesMeta`, which is why install did not hard-fail — but **optional governs presence, not range**, and npm still reports `invalid` for a present-but-out-of-range optional peer, as the receipt shows.

**Carry.** → **F.W1** (the atomic tri-package uplift) and **F.W2** (value.js consumption to spec).

---

### B-2 · **[NEW]** The **DC term** is consumed as the normalization basis. The sibling consumer of the *same array* documents this exact hazard, cures it, and the shared component does not.

**Severity BLOCKER.** **Provenance** `CoefficientsSpectrum.vue:43-45`, `:93`, `:95`, `:56-59` · `src/fourier_analysis/epicycles.py:34-43,54` · `api/services/computation.py:109-118` · `web/src/components/visualization/lib/canvas-drawing/epicycles.ts:163-172` · `web/src/components/equation/FrequencyGraph.vue:36-40` · `api/responses.py:8-10,20-21`.

**Claim.** `:43-45` takes element 0 of the amplitude-sorted array as the divisor for every bar width (`:93`) and every "Relative" figure (`:56-59`). On the visualization route element 0 is the **DC term** — a constant offset, not a frequency — and the repo's own canvas code states in writing that its magnitude is on the order of the whole figure. Every real harmonic is therefore normalized against a quantity that is not a harmonic.

The producer sorts descending **including DC**: `epicycles.py:54` `self.components = sorted(components, key=lambda c: c.amplitude, reverse=True)`; the DC member is `frequency 0` (`epicycles.py:34-43`), serialized unfiltered at `computation.py:109-118`.

**The repo's own testimony**, `canvas-drawing/epicycles.ts:163-172`:

> `// DC-term suppression (W2.8): the chain is amplitude-sorted, so the`
> `// `index === 0` (frequency 0) component lands first and would render as`
> `// a stationary disc of radius |c_0| — potentially the size of the whole`
> `// figure, visually dominating the animation.`

That consumer of the identical array acts on it (`if (components[i].index === 0)` → a centre-marker instead of the circle). The subject does not — and **no cure exists anywhere between the producer and the bar**: `grep -rn "index === 0"` over `web/src/components/shared/`, `CoefficientsPanel.vue` and `FrequencyGraph.vue` returns **zero hits**, and `CoefficientsPanel.vue:10` forwards `store.epicycleData?.components ?? []` raw. The `#graph` payload inherits the defect independently at `FrequencyGraph.vue:36-40`.

Magnitude argument: the contour path is stored and returned in **image-pixel space** — `api/responses.py:8-10` returns `points.x` / `points.y` unmodified and the asset carries `bbox` / `image_bounds` (`:20-21`), so it is not origin-centred; `c_0` is the path centroid. `computation.py:106-108` builds the signal straight from those coordinates (`build_contour_tour` → `resample_arc_length`) with **no centring step**.

**Failure scenario.** Compute epicycles on any uploaded image contour, open the Coefficients panel. Row 0 reads `n = 0`, a full-width bar, `Relative 100.0%`. Every remaining row is clamped to the `minWidth: '2px'` floor (`:95`) and reads `Relative 0.x%`. That `2px` floor is the tell: it is the workaround keeping the panel from rendering as eleven invisible rows, and it is doing all the work.

**Falsifier.** Either (a) prove `|c_0| ≤ max_{n≠0} |c_n|` for reachable inputs — refuted for the visualization route by `epicycles.ts:163-172`, which asserts the opposite in the repo's own words, and by the absence of any centring between `api/responses.py:8` and `computation.py:108`; or (b) exhibit a DC filter anywhere in the chain — the grep is empty. The rendered outcome is **UNPROVEN-NEEDS-LIVE (SS-13)**; the structure — DC sorted first, forwarded unfiltered, used as the divisor — is proved statically at four line cites.

**Relation to C-13.** Orthogonal. C-13 is the degenerate all-zero case (`0/0 → NaN%`). B-2 is the **non-degenerate** case: `amplitude[0]` is not zero, it is the wrong quantity.

**Scope note (honest).** On the **equation** route `c_0` is the mean of `f` over the domain and is not systematically large; all three tiers still sort DC into position 0 (`symbolic/spline.py:116`, `symbolic/integration.py:145`, `symbolic/identification.py:125`), so the *structure* is identical on both routes but the *magnitude* pathology is a visualization-route claim.

---

## §2 · MAJOR

### C-1 · The same coefficient `n` is painted **three different hues** inside one panel — `spectrumColor` is quadruplicated and the four copies disagree

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:47-50` · `components/equation/FrequencyGraph.vue:42-45` · `components/visualization/lib/canvas-drawing/transforms.ts:3-8` · `components/equation/lib/harmonics.ts:80-92` · call sites `CoefficientsSpectrum.vue:94,107` / `FrequencyGraph.vue:84,196` / `canvas-drawing/epicycles.ts:162`.

Four live implementations of one named concept:

| Site | Formula | Exported? |
|---|---|---|
| `CoefficientsSpectrum.vue:47` | `hue = (1 − i/max(total−1,1))·300`, `hsl(h,85%,55%)` | no — file-local |
| `FrequencyGraph.vue:42` | **byte-identical** to the above | no — file-local |
| `canvas-drawing/transforms.ts:3` | `hue = (1 − (i/max(total−1,1))^0.6)·300` — **gamma-curved** | **yes**, re-exported by `canvas-drawing/index.ts:2` |
| `equation/lib/harmonics.ts:81` | linear, `hsla(…, α)`, `alpha = 1` default | **yes**, consumed by `ConvergencePlot.vue:10,207` and `convergence/ConvergenceLegend.vue:3,36` |

The component lives in `components/shared/` — the tree's designated shared home — and still inlines a function that two sibling modules already export. At `alpha = 1`, `harmonics.ts:81` is CSS-equivalent to `:47-49`; the private copy buys nothing. Cross-directory import is already idiomatic here (`ConvergenceLegend.vue:3` does it).

The consequence is not stylistic, it is a **wrong data encoding**. `CoefficientsPanel.vue:15-24` renders `<FrequencyGraph :max-bars="40">` in the `#graph` slot **directly above** this component's list, both fed the identical `store.epicycleData.components` array. The list passes `topComponents.length` (12 collapsed); the graph passes `min(components.length, 40)`; the epicycle canvas passes `nVis` through the gamma-curved variant:

| `i` | list `total=12` | graph `total=40` | canvas gamma `total=40` |
|---:|---:|---:|---:|
| 1 | 272.7° | 292.3° | 266.7° |
| 3 | 218.2° | 276.9° | 235.6° |
| 5 | 163.6° | 261.5° | 212.5° |
| 8 | 81.8° | 238.5° | 184.0° |
| 11 | **0.0°** (red) | **215.4°** (blue) | 159.6° |

Coefficient #11 is red in the list and blue in the graph **six pixels above it**. Colour is the only channel tying a bar to its harmonic across the three surfaces, and it is inconsistent by construction on **two** independent axes (differing `total`, differing transfer function). Toggling "Show more" (`:130`) re-hues every already-rendered row because `total` flips 12→40.

**Root cause at the seam:** `:70` is a bare `<slot name="graph" />` with **no slot props**. `topComponents`, `maxAmplitude` and `expanded` are private, so the payload cannot align; and the subject exposes no `maxBars`/`count` prop it could be told (C-14).

**Falsifier.** If the three surfaces were never co-visible the divergence would be cosmetic. They are: `CoefficientsPanel.vue:14-25` nests both in one `ConfiguratorLayer`, and `VisualizationView.vue:273` renders that panel in the same view the epicycle canvas paints. Second falsifier: if `total` happened to agree — it cannot; `:max-bars="40"` is hard-coded at `CoefficientsPanel.vue:20` while the subject's `total` is `12` until `expanded`.

### C-2 · The densest colour + numeric-formatting surface in the app consumes **zero** value.js, while the repo hand-rolls the arm value.js exists to supply

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue` (no `@mkbabb/value.js` import anywhere) · `web/src/lib/colors.ts:22-54` (`cssVarToHex`), `:56-68` (`hslToHex`), `:70-74` (`rgbToHex`), `:101-107` (`hexToRgba`), `:111-117` (`hexToRgb`) · census `CENSUS-2026-08-03.md:38` ("5 import statements / 4 files / 6 symbols, **easing-only**") · `lane-frontend.md:480`.

The value.js consumption surface is 5 sites, all `easeInOutSine`/`timingFunctions` — re-verified live this pass: `grep -rn "@mkbabb/value.js" web/src` → `lib/easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`. **None is this file.** The F.W2 "bare-specifier migration surface" for `CoefficientsSpectrum.vue` is therefore **empty** — which will score as "nothing to migrate" and is exactly the wrong reading. The file emits colour on two hot paths (`:94` bar fill, `:107` tooltip dot) via raw template-string `hsl()`, and the project's own colour module re-implements HSL→hex, RGB→hex, hex→RGBA and a `getComputedStyle` CSS-colour parser by regex.

**[CORRECTION] Symbol list.** The first pass named five value.js symbols; **one does not exist in 0.13.0**. Verified against `node_modules/@mkbabb/value.js/dist/value.js`'s export map:

| symbol | present in 0.13.0? |
|---|---|
| `formatCSS` | **yes** |
| `sampleColorRamp` | **yes** — and it is precisely a spectrum ramp |
| `colorUnit2` | **yes** |
| `COLOR_SPACE_RANGES` | **yes** |
| `parseCssColor` | **NO** — not in the export map |

The parse entry points at 0.13.0 are `color2` / `colorUnit2` / `CSSColor`, not `parseCssColor`. Also available and directly relevant: `getOklchLightness`, `interpolateHue`, `lerpColorValue`, `cssColorInterpKeyword`, `dominantColor`, plus the per-space classes (`HSLColor`, `OKLCHColor`, `LABColor`, `LCHColor`, `OKLABColor`, …).

Two second-order consequences, both provable:

1. **`hsl(h, 85%, 55%)` is theme-blind.** Saturation and lightness are frozen literals. `App.vue:8,11,13` runs a `MutationObserver` on the root class to re-resolve `--viz-*` through `resolveVizColors()` (`lib/colors.ts:89-96`) on dark-mode flip; this component subscribes to none of it, holds no `--viz-*` read, no `VIZ_COLORS` import, and no dark-arm branch (`grep -nE "viz|dark|color-mix|prefers-color"` → nothing). `style.css:113-126` documents that the project already had to hand-darken `--viz-amber` from `hsl(35 70% 42%)` (≈3.54:1) to `hsl(35 76% 35%)` (≈4.6:1) to clear WCAG AA — i.e. the repo *knows* fixed-lightness HSL fails contrast — and the spectrum bars ship a fixed 55% lightness across all 300° of hue anyway. Constant HSL lightness is not constant perceptual lightness, which is the exact problem `getOklchLightness` and the oklch classes solve. (The sibling axis-D challenge measures the outcome: 7/12 collapsed and 24/40 expanded bars below 3:1 on the light arm, worst 1.27:1. **Cited, not re-derived.**)
2. **The bundler already documents the intent the tree contradicts.** `vite.config.ts:47` reads `//   - vendor-math:   value.js + katex (the colour-math + LaTeX cluster).` and `:52` allocates `"vendor-math": ["@mkbabb/value.js", "katex"]`. The chunk is named and commented for a role no module assigns it, and **[CORRECTION]** — per K-4 the subject does **not** even drag it in transitively, as the first pass claimed. The tree's most colour-mathematical leaf loads none of the colour-math chunk.

**Falsifier.** If value.js@0.13 shipped no colour surface, "should consume it" would be empty rhetoric — the export-map table above refutes that. Second falsifier: if `lib/colors.ts` were a thin shim over value.js — it is not; `:56-68` is a from-scratch HSL→hex kernel terminating in a `"#888888"` fallback (`:26,53`).

### C-3 · `.coeff-list-move` is **dead by construction**: every `TransitionGroup` child is a fragment-root component

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:79-122`, `:161-163` · `web/src/components/ui/tooltip/Tooltip.vue:25-38` · `glass-ui/dist/TooltipProvider-B3MkB_8P.js` (`Tooltip` = reka-ui `TooltipRoot`) · `reka-ui/dist/Tooltip/TooltipRoot.js` · `@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1454-1462`.

Vue 3.5.38's `TransitionGroup` gates its FLIP bookkeeping:

```js
// runtime-dom.esm-bundler.js:1454-1462
for (let i = 0; i < children.length; i++) {
  const child = children[i];
  if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
    prevChildren.push(child);
    …
    positionMap.set(child, getPosition(child.el));
  }
}
```

The subject's children are `<Tooltip>` → shim → `TooltipRoot` → `PopperRoot` → bare `renderSlot`. The rendered subtree root is a **Fragment** (`[TooltipTrigger, TooltipPortal]`), so `vnode.el` is the fragment's text anchor, **not an `Element`**. Every child fails the `instanceof Element` gate, `prevChildren` stays empty, `onUpdated` (`:1420-1423`) returns at `if (!prevChildren.length) return`, and `.coeff-list-move` can never apply.

This is a **regression introduced by the file's own documented migration**: `:11-15` records `B.W2.c` lifting "the bespoke `:hover` CSS tooltip … to the glass-ui `Tooltip` primitive", while `:146` still carries the earlier `A.W3.d` motion contract. Wrapping each row in the tooltip **root** — rather than putting the tooltip inside the row element — is what turned every child into a fragment. Minimal cure: a real element between `TransitionGroup` and `Tooltip`.

**Axis-C attribution (this pass).** The Fragment is a **consumption decision**, not an upstream defect: glass-ui ships the tooltip *decomposed* (`Tooltip` + `TooltipTrigger` + `TooltipContent`), and fourier re-monolithized it locally (`ui/tooltip/Tooltip.vue:26-37` places two children under `GlassTooltip`). See **C-25** for the upstream monolith that already exists.

**Falsifier.** If `TooltipRoot` rendered a host element, `child.el` would be an `Element` and the claim dies. `reka-ui/dist/Tooltip/TooltipRoot.js` (tail) is `createBlock(PopperRoot, null, { default: () => renderSlot(_ctx.$slots,"default",{open}) })` — no `Primitive`, no `as`. Second falsifier: Vue < 3.5 (no `instanceof Element` gate) — installed `vue@3.5.38`. *Enter/leave class application (`:147-159`) is very likely dead for the same reason but travels a different renderer path (`remove()`'s `STABLE_FRAGMENT` branch); marked **UNPROVEN-NEEDS-LIVE (SS-13)**.*

### C-4 · The `:key` composition **defeats the AnimatedDigit damping the file was migrated to gain**

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:82` · `:99-103` · `glass-ui/dist/useAnimatedNumber-C_3wZLx4.js`.

The key mixes the **stable identity** (`comp.index`, the harmonic number) with the **positional index** (`i`). Because the payload is amplitude-sorted (K-1), any recompute that changes relative amplitudes changes `i` for a given `n` — the key changes, Vue tears the row down, and `useAnimatedNumber` restarts from `initial: 0`. The damped count-up from the *previous* amplitude to the *new* one — the entire value proposition recorded at `:11-12` — never happens on the one event where it would be legible.

Re-verified this pass at the chunk: `useAnimatedNumber-C_3wZLx4.js` constructs `new SmoothProgress({ …, initial: m(options.initial ?? 0), … })` and calls `.play(…)` **unconditionally at setup**, so a remount both restarts from zero and starts a fresh rAF loop. `comp.index` alone is a valid key: `epicycles.py:80-91` emits each frequency exactly once (DC, then ±n, guarded by `neg_idx != k`); `FourierTermDTO.n` is likewise unique per term.

**Falsifier.** If `comp.index` were non-unique the suffix would be defensive and correct — it is unique (cites above). Second falsifier: if `AnimatedDigit` re-seeded from the previous DOM value on remount — it does not, and **it cannot be made to** (C-24).

### C-5 · The tooltip trigger is a non-focusable `<div>` — the a11y gap the header claims to have discharged is **not** discharged for keyboard

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:13-15` (the claim) · `:85` (the trigger element) · `ui/tooltip/Tooltip.vue:27-29` · `reka-ui/dist/Primitive/Slot.js:8-24` · `reka-ui/dist/Tooltip/TooltipTrigger.js`.

With `as-child`, reka-ui's `Slot` clones the **first non-comment child** and merges the trigger's attrs onto it (`Slot.js:12-21`): `aria-describedby` / `data-state` / `data-grace-area-trigger` + pointer, focus and blur handlers. It contributes **no `tabindex`**, **no `role`**, and the `as: "button"` default is discarded because `asChild` wins. The clone target is a plain `<div>` (`:85`) — not in the tab order. `handleFocus`/`handleBlur` never fire, and the tooltip body (amplitude to 4dp, phase in degrees, relative %, Re/Im — the only place those four values appear) is pointer-only.

The file asserts the opposite in its own header. That contradiction, not the underlying LOW gap, is the defect: the wave is booked closed on evidence the tree refutes.

**Falsifier.** `Slot.js` performs `mergeProps(attrs, firstNonCommentChildren.props)` and nothing else — grep for `tabindex` returns nothing; the child at `:85` carries no `tabindex`, no `role`, is not a form control or `<a href>`. **Corpus cross-check:** intake **R3-7a** (`lane-fourier-r3-r6.md:79`) counts 35 Tooltip callsites over nine consumers with `CoefficientsSpectrum` contributing **2** — both are indicted here (`:80`, `:124`). This does not contradict R3-7a; it prices it.

### C-6 · Two icon packages are installed; this file imports the **deprecated** one, and imports it from `devDependencies`

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:20` · `web/package.json:35` [WT] `devDependencies["lucide-vue-next"] = "^1.0.0"` · glass-ui@4.0.0 `peerDependencies["@lucide/vue"] = "^1.16.0"`.

```
$ npm ls @lucide/vue lucide-vue-next
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @lucide/vue@1.20.0
└── lucide-vue-next@1.0.0
```

This file is 1 of the **35** sites the census books for the rename (`CENSUS-2026-08-03.md:105`, `lane-frontend.md:636`) — count re-verified live: `grep -rl 'lucide-vue-next' web/src | wc -l` → **35**.

**Sharpened this pass, three ways.**
1. glass-ui 4.0.0 declares `@lucide/vue` as a **non-optional** peer (present in `peerDependencies`, absent from `peerDependenciesMeta`), yet **nothing imports it**: `grep -rn '@lucide/vue' web/src` → zero, and `grep -rl '"@lucide/vue"' node_modules/@mkbabb/glass-ui/dist/*.js` → **empty**. glass-ui vendors its own factory (`dist/createLucideIcon-DydS2qgk.js`, whose only import line is `from "vue"`). So the tree carries a **phantom satisfied-but-unused peer** of the successor while importing the legacy package 35 times.
2. `lucide-vue-next` is in **`devDependencies`** and `:20` is a runtime source import, bound at `:132` via `<component :is>`. Vite bundles it so the app works, but the class is wrong — as it is for `reka-ui`, `class-variance-authority`, `clsx` and `tailwind-merge`, all glass-ui runtime peers filed as dev. `npm ci --omit=dev` yields an unbuildable graph.
3. **The in-flight bump had its hands on this exact line and did not fix it.** The `web/package.json` diff (the sole dirty file) rewrote all 11 `dependencies` lines and all 15 `devDependencies` lines — including `"lucide-vue-next": "latest"` → `"^1.0.0"` — and left it in the dev block, unmigrated.

**Falsifier.** `ls node_modules/@lucide/vue` shows `1.20.0` present (kills the "two packages" denial); `web/package.json` `devDependencies` kills the class denial.

### C-7 · The epicycle operation's response is an **untyped `dict`**, and the only typed component model in the API is dead and **disagrees with the wire**

**Severity MAJOR.** **Provenance** `api/routers/contours.py:35` · `api/models/computation.py:55-60`, `:63-65` · `api/services/computation.py:110-118` · `web/src/lib/types.ts:1-6`.

Three mutually inconsistent descriptions of one leaf — all three re-verified verbatim this pass:

| Where | Shape |
|---|---|
| `api/services/computation.py:111-114` (**the wire**) | `{"index": int, "coefficient": [re, im], "amplitude": float, "phase": float}` |
| `api/models/computation.py:55-60` `EpicycleComponentDTO` | `{frequency, coefficient_re, coefficient_im, amplitude, phase}` |
| `web/src/lib/types.ts:1-6` `BasisComponent` (**consumed at `:22`**) | `{index, coefficient: [number, number], amplitude, phase}` |

`EpicycleComponentDTO` is **referenced nowhere** — `grep -rn "EpicycleComponentDTO" --include="*.py" .` returns exactly one hit, its own definition at `computation.py:55`. And because the route declares `response_model=ComputeResult` with `data: dict` (`computation.py:63-65`), the generated OpenAPI schema for this operation says `data: object` with **no properties**. There is consequently **no derivable join** between the operation and the client leaf that renders it: `BasisComponent` is hand-maintained against a Python dict literal.

**Corpus relation — explicit contradiction of scope.** Intake row **R6-8** (`lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT, CARRY → F.W5) establishes that an operation model embedding derived client back-references cannot attribute a defect to one side of the seam, using `operation:PATCH:/api/visualizations/{slug}` carrying `"clients": ["client:updateVisualization"]`. The epicycle operation exhibits the **opposite** pathology and R6-8's remedy does not reach it: the operation record embeds **nothing at all**, so no join — ambiguous or otherwise — is derivable. R6-8's prescription ("keep operation identity independent of client identity; put the join in a separate relation") presupposes a typed operation payload to join *on*; `ComputeResult.data: dict` denies that premise. **F.W5's shared-provenance contract needs a second rule: an operation's response model must be structurally typed, or the leaf is unjoinable in principle.** The value.js↔fourier conformance fixtures (census §4 F.W8 / FN-6) cannot be generated for this operation as it stands.

**Falsifier.** `contours.py:35` declares `ComputeResult`; `computation.py:63-65` types its `data` as bare `dict`. The grep for `EpicycleComponentDTO` is a single self-hit. Contrast the equation route, which does it right (`equations.py:29` `response_model=ComputeEquationResponse`; `models/equations.py:8-13` `FourierTermDTO`) — the API knows how; the epicycle path simply does not.

### C-8 · The prop contract silently depends on an **undocumented, unenforced amplitude-descending invariant**

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:26`, `:37-39`, `:43-45` · `web/src/lib/types.ts:1-6`.

`maxAmplitude` reads element **0** and treats it as the maximum; `topComponents` is named "top" but computes `slice(0, n)`. Both are correct **only if** the array is sorted by descending amplitude. Nothing in the prop type, the prop name, the JSDoc (`:27-28` documents only `emptyText`), the API response models, or a runtime assertion states that requirement. Hand a future producer's harmonic-ordered data (`n = −N…N`, the natural DFT order) and the bars silently exceed 100% (`:93` has no clamp), "Relative" exceeds 100% (`:56-59` guards zero but not the upper bound), and "top 12" becomes "the 12 lowest frequencies".

The invariant is real but lives entirely in the producers and is asserted only in prose — **five** sites, re-verified: `epicycles.py:54`; `bases_fitting.py:78,160`; `symbolic/integration.py:145`; `symbolic/spline.py:116`; `symbolic/identification.py:125`. The only place it is written down client-side is a comment in a **different** component (`canvas-drawing/epicycles.ts:163`).

**Added this pass — the replay path.** One consumer feeds the prop from a **persisted** document: `stores/workspace.ts:171` `epicycleData.value = draft.epicycleData ? markRaw(draft.epicycleData) : null`, written at `:100`. A draft saved before any producer sort change replays unvalidated. That makes the contract defect *reachable* without a code change, which is why it survives K-1's kill as a contract finding.

**Falsifier.** `web/src/lib/types.ts:1-12` carries no ordering clause; `api/models/computation.py:63-65` and `api/models/equations.py:26+` carry none. If the producers did not sort this would be a live bug — they do (five sites), which is why it is filed MAJOR-contract, not BLOCKER-bug. Cheapest cure: `Math.max(...components.map(c => c.amplitude))`, O(n) on ≤401 elements.

### C-21 · **[NEW]** The props contract cannot express failure or in-flight state, though the store feeding it owns both

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:24-33`, `:78`, `:138-140` · `stores/workspace.ts:50-51`, `:273`, `:303` · `CoefficientsPanel.vue:8-10`.

Two props (`components`, `emptyText?`) and one state predicate (`v-if="topComponents.length"`). A failed compute, an aborted compute, an in-flight compute and a never-started compute are one indistinguishable string. `workspace.ts:50-51` owns `computing` and `error`; `:303` sets `error.value = e.message ?? "Epicycle computation failed"` and `:273` nulls `epicycleData`. `CoefficientsPanel.vue:8-10` holds the store and forwards exactly one derived value — so after a rejection the panel renders `"Compute epicycles to see coefficients"`, identical to never-computed.

**Axis-C framing.** The corpus adjudicates this as a *panel* defect (`CoefficientsPanel/challenge-L-library.md` D-3: "read `computing` and `error` and give `CoefficientsSpectrum` a three-state empty surface"). It is **also a contract defect**: neither consumer can repair it without editing the subject, because the subject exposes no prop, no slot and no emit for either state. Two consumers, one shared component, zero repair surface.

**Falsifier.** A `loading`/`error`/`state` prop, a second empty branch, or an `#empty` slot. None exists (`:24-33`, `:138-140`).

### C-22 · **[NEW]** The subject accepts a basis-agnostic type and renders a Fourier-only readout — the named blocker for the `lane-frontend §4` SHADOW convergence

**Severity MAJOR (latent).** **Provenance** `web/src/lib/types.ts:1-12` · `CoefficientsSpectrum.vue:108`, `:113-114`, `:117-118` · `src/fourier_analysis/bases_fitting.py:49-55,78,160` · `bases_evaluation.py:89-103` · `stores/workspace.ts:171`.

`BasisComponent` is the member type of `BasisDecomposition { basis: "fourier" | "chebyshev" | "legendre" | string; … }`. The subject renders `n = {{ comp.index }}` (`:108`), `Phase` (`:113-114`) and `Re / Im` (`:117-118`) unconditionally. `bases_fitting.py:49-55`'s `_make_component` is the **single** constructor for all bases (`amplitude=abs(coeff)`, `phase=float(np.angle(coeff))`), so for a real Chebyshev/Legendre coefficient `phase ∈ {0, π}` and `Im = 0.000` exactly — three of four tooltip rows become noise, and `index` is a polynomial *degree*, not a frequency. The subject has no `basis` prop and no basis conditional (`grep -n "basis"` → zero).

**Status.** Both live call sites are Fourier (`CoefficientsPanel.vue:10`; `EquationView.vue:59-67`), so there is no live break today. Graded MAJOR because `lane-frontend.md:428` rows this file for convergence with the other `BasisComponent` leaves ("same family (spectrum/`BasisComponent`)"), and this is the defect that convergence activates: a shared spectrum component whose type says "any basis" and whose markup says "Fourier". `store.basesData` (`workspace.ts:171`) already holds non-Fourier decompositions.

**Falsifier.** A `basis` prop, a basis conditional, or a narrower prop type. None. Alternatively show `_make_component` is not used for non-Fourier bases — refuted at `bases_fitting.py:78,160`.

### C-26 · **[NEW]** The `Button` consumption breaks outright at the far side of the bump this component is being bumped for

**Severity MAJOR (migration-blocking).** **Provenance** `CoefficientsSpectrum.vue:127-128` · `node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js` [WT 4.0.0] · `/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:23,37` [producer 7.0.0].

`:127` passes `variant="ghost"`, `:128` `size="sm"`. Against **4.0.0** this is correct — the cva map in `button-BNDWhAZb.js` carries `ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 … aria-pressed:bg-foreground/10 …"` among ten variants. Against producer **7.0.0** the `Button` props are `{ …, size?: ButtonSize }` with `size: "md"` defaulted and **no `variant` prop at all** (`Button.vue:23,37`; the render binds `:data-size="size"`).

So B-1's forced uplift silently deletes this component's only Button styling knob. Corpus `lane-frontend.md` §5's break table enumerates nine break rows (metric-badge · hover-card · hover-popover · DockIconButton · DockDropdownTrigger · ToastVariant · lucide · keyframes · value.js) and has **no `Button` row** — so this break is unbudgeted. The subject is one of its instances.

**Falsifier.** A `variant` prop on glass-ui 7.0.0's `Button` — `grep -n "variant" src/components/button/Button.vue` returns nothing in the props block. Or a compat shim in 7.0.0 — none in the file.

---

## §3 · MINOR

### C-9 · The template uses `transition-all` **eleven lines** after the file forbids it in writing
`:146` `/* A.W3.d — named properties + canonical tokens, no 'transition: all'. */` vs `:91` `class="h-full rounded-full transition-all duration-500 ease-out"`. Compiled against `tailwindcss@4.3.x`, `transition-all` emits exactly what the comment forbids:
```
.transition-all { transition-property: all; transition-timing-function: var(--tw-ease,…); transition-duration: var(--tw-duration,…); }
```
(receipt: `tailwindcss/dist/lib.mjs` `compile('@import "tailwindcss";').build(['transition-all','duration-500','ease-out'])`). The element carries inline `width`, `backgroundColor` **and** `minWidth` (`:92-96`), all three now transitioning on every `expanded` toggle. **Falsifier** — if Tailwind v4 redefined `transition-all` to a property list the claim dies; the compiler receipt shows `all`.

### C-10 · The same `<style>` block violates its own "canonical tokens" clause twice more
`:162` `.coeff-list-move { transition: transform 0.3s ease; }` — a raw CSS keyword where every sibling rule uses `var(--ease-standard)`; and the durations at `:148,151,162` are literals (`0.3s`, `0.2s`) where glass-ui ships `--duration-normal: 0.3s` / `--duration-fast: 0.2s` (`glass-ui/dist/styles/tokens/scheme-motion.css:67-68`) — the exact values, already tokenised. **Falsifier** — if glass-ui shipped no duration tokens the claim dies; it ships eight (`:66-74`).

### C-11 · `v-if` sits on the `<Button>` **inside** the `<Tooltip>`, not on the tooltip
`:124-135`. When `totalComponents <= 12` the `Tooltip` still mounts: `TooltipRoot` + `PopperRoot` + `TooltipTrigger` + `TooltipPortal` whose trigger slot resolves to a Comment. `reka-ui/dist/Primitive/Slot.js:11-13` handles it (`firstNonCommentChildrenIndex === -1` → returns the comment, no throw), so this is dead weight and a `rootContext.onTriggerChange(undefined)`, not a crash. Move the `v-if` to `:124`. **Falsifier** — if `Slot` threw on an empty slot this would be a BLOCKER; it returns `children` unmodified.

### C-12 · `fmtAmplitude` = `toFixed(2)` collapses the spectrum tail to `"0.00"` on the equation route
`:61-63` vs the tooltip's `toFixed(4)` at `:112`. A sawtooth's `|c_n| ≈ 1/(nπ)` reaches `0.0032` by `n=100`; with `expanded` showing 40 rows the lower rows render `"0.01"`, `"0.00"`, `"0.00"` while their bars still show meaningful relative height and the tooltip shows the real value. Three renderings of one number at three precisions in one row. The epicycle route is unaffected (pixel-scale amplitudes). **Falsifier** — if the equation route's amplitudes were all ≥ 0.005 the claim dies; `api/routers/equations.py:112-116` reconstructs from every term including the tail, and `n_harmonics` accepts up to 200 (`models/equations.py:20`).

### C-13 · Guard asymmetry: `formatPercent` handles a zero maximum, the bar width does not
`:56-58` guards `if (!maxAmplitude.value) return "0%"`. `:93` does not: `0/0` → `"NaN%"`, an invalid declaration the browser drops, leaving the bar at `minWidth: 2px` with no error surfaced. `:43-45` guards only emptiness, not zero. The author demonstrably knew about the degenerate case in one of the two places it occurs. **Falsifier** — reachable only if all visible amplitudes are 0; enter `0` as the equation expression. Marked **UNPROVEN-NEEDS-LIVE (SS-13)** for the visual outcome; the arithmetic is static-certain. *(Distinct from B-2, which is the non-degenerate case.)*

### C-14 · `12` and `40` are magic numbers repeated across three layers with no prop
`:38` (the slice), `:126` (`totalComponents > 12`), `:124` (the tooltip copy "top 12" / "top 40"). Three independent restatements of one policy in a component explicitly built for two routes with different data scales — and neither consumer can override it. Contrast the sibling `FrequencyGraph.vue:8,11`, which exposes `maxBars?: number` (defaulted 60, overridden to 40 at `CoefficientsPanel.vue:20`). **The shared component is *less* configurable than the one it was extracted alongside.**

**[EXTENSION] The corpus undercounts.** `CoefficientsPanel/challenge-L-library.md` records the `40` as "authored **twice**, across a component boundary" (`:38` and `CoefficientsPanel.vue:20`). It is authored **three** times — `:38`, `:124`, `CoefficientsPanel.vue:20` — and the third lives inside a template literal, where neither the typechecker nor a rename can reach it. See C-23 for the wrong string that produces.

### C-15 · The index label disagrees with the graph directly above it
`:87` renders `{{ comp.index >= 0 ? "+" : "" }}{{ comp.index }}` → `"+0"`, `"+3"`. `FrequencyGraph.vue:111` renders `String(comp.index)` → `"0"`, `"3"`. Same array, same panel, two conventions; `"+0"` for the DC term is also mathematically odd. The tooltip at `:108` uses a third form (`n = 0`).

### C-16 · No emits: the cross-highlight seam with `FrequencyGraph` is designed and then dropped
`CoefficientsSpectrum.vue` declares **zero** emits (`grep -n "defineEmits"` → nothing). `FrequencyGraph.vue:15-18` declares `toggle-harmonic` and `hover-harmonic` and accepts `activeIndices?: Set<number>` (`:7`) and `logScale?` (`:9`). `CoefficientsPanel.vue:17-22` binds **none** of them — so the graph's interaction contract is inert, every bar renders permanently "active" (`FrequencyGraph.vue:77`), and hovering a list row cannot highlight its bar or vice-versa.

**Sharpened this pass — the denominator.** `grep -rn "FrequencyGraph" web/src` → `CoefficientsPanel.vue:5,17` plus two *comment* mentions inside the subject (`:8`, `:68`). **One consumer, total**, binding 2 of 4 props and 0 of 2 emits — so `activeIndices` and `logScale` are dead tree-wide. The subject is the reason: `:70` is a bare slot with no slot props and no emits, so neither direction has a landing point. The absence is not a project habit — the equation route builds a full coefficient-hover channel (`equation/composables/useCoeffHover.ts`, wired at `EquationView.vue:76`, coloured from `VIZ_COLORS`), and the subject, which that route also renders, joins that one either.

### C-17 · 40 is a hard ceiling on a payload of up to ~401 components
`:38`. `compute_epicycles` defaults `n_harmonics=200` (`api/services/computation.py:102`) → DC + ±200 ≈ **401**. The readout at `:73-75` honestly prints `40 / 401`, the button copy at `:133` reads "Show more (401 total)" implying otherwise, and there is no third state. ~90% of the returned payload is unreachable in the UI while being fully transferred over the wire.

### C-18 · `w-8` (32px) is too narrow for ±3-digit harmonic indices
`:86`. `"-200"` at `text-xs` Fira Code in a `flex` row with default `flex-shrink` overflows a 2rem box; no `overflow-hidden`, no `flex-none`, so the text spills toward the bar track. Reachable with the default `n_harmonics=200`. **UNPROVEN-NEEDS-LIVE (SS-13)** — the arithmetic (4 glyphs × ~0.6em × 13.5px ≈ 32.4px > 32px) is indicative only.

### C-19 · Mount behaviour diverges between the component's two hosts
The visualization host is `ConfiguratorLayer :default-open="false"` (`CoefficientsPanel.vue:14`), which — per glass-ui's own `ConfiguratorLayer.vue.d.ts` header ("recursion-free reveal … `grid-template-rows: 0fr ↔ 1fr` … requires no JS watchers") and the repo's e2e note (`web/e2e/visualization-ux.spec.ts:119-123`) — keeps the body **mounted while collapsed**. The equation host is `CollapsibleSection` → reka-ui `CollapsibleContent` (`ui/CollapsibleSection.vue:45-49`), `Presence`-gated, which **unmounts**. So on the visualization route 12 `TooltipRoot`s, 12 `AnimatedDigit`s (each with a `SmoothProgress`) and a `<canvas>` boot behind a closed panel, and the focusable "Show more" `<Button>` (`:125`) lands inside an `aria-hidden="true"` subtree. Not a new defect (the e2e file books the axe violation as vendored), but the *asymmetry* is: the same child has two mount lifecycles depending on host, and nothing in the file records it. *(Complements `CollapsibleSection/challenge-L-library.md` L-3, which covers the equation-side state loss.)*

### C-20 · **[NEW — from the demotion of the first pass's S-1]** `tabular-nums` is hand-wired onto the one primitive that exists to stop that
`:102` `class="w-16 text-right fira-code text-muted-foreground tabular-nums"`. **[CORRECTION]** The first pass's S-1 asserted "the hand-wired `tabular-nums`/`ss01`/`lnum` register the primitive was promoted to absorb is *not* re-declared locally." It is: `tabular-nums` is the last token of `:102`. And the primitive already applies it — `dist/animated-digit.js` renders `class: cn("animated-digit tabular-nums", $props.class)` — with a docblock whose stated purpose is that consumers "**stop hand-wiring those rules per site**" (`dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts:2-6`). **Falsifier** — absence of `tabular-nums` from the primitive's `cn()` call, or from `:102`. Both are present.

### C-23 · **[NEW]** The primitive publishes `--digit-count` for exactly this consumer's problem; the consumer hardcodes `w-16`
`AnimatedDigit` derives a digit count from the formatted string and publishes it as a host custom property (`dist/animated-digit.js` → `style: { "--digit-count": String(…) }`), documented at `AnimatedDigit.vue.d.ts:22-27`: *"A consumer's width-clamp can read this so the value cell shrinks proportionally as the rendered digits widen."* `:102` pins `w-16` (4rem), and `fmtAmplitude` (`:61-63`) is `toFixed(2)` with no bound — on the visualization route the DC amplitude is a pixel-scale magnitude (B-2), so 6–8 characters is the normal case, and the span carries no `truncate`/`overflow-hidden`. **Falsifier** — any `--digit-count`-derived clamp in the file (none), or proof that `toFixed(2)` output never exceeds 4rem at `text-xs` in the resolved `--font-mono`. Rendered width **UNPROVEN-NEEDS-LIVE (SS-13)**; the ignored knob is proved.

### C-24 · **[NEW]** No consumer can seed the damper — the "ramp from zero" is not fixable at this altitude
`useAnimatedNumber` takes `initial: options.initial ?? 0` (`useAnimatedNumber-C_3wZLx4.js`), and `AnimatedDigit` forwards only `{ mode, damping }`. **No `initial` prop exists in glass-ui 4.0.0** (`AnimatedDigit.vue.d.ts:41-49`) **or in producer 7.0.0** (`/Users/mkbabb/Programming/glass-ui/src/components/animated-digit/AnimatedDigit.vue:46` — `digitCount`, `damping`, no `initial`). So C-4's key defect can be cured (drop `-${i}`), but the *mount* case cannot: the first render of any row always counts up from `0.00`. **Producer carry → glass-ui: `AnimatedDigit` should forward `initial`.** **Falsifier** — an `initial` prop in either version's props block. Neither has one.

### C-25 · **[NEW]** The `Tooltip` shim re-monolithizes a decomposed upstream API — and glass-ui already ships the monolith
`ui/tooltip/Tooltip.vue:13-17` imports `Tooltip` + `TooltipTrigger` + `TooltipContent` from `@mkbabb/glass-ui/tooltip` and re-wraps them behind a single-component `text` / `#content` API. glass-ui 4.0.0 **already exports that shape**: `./icon-tooltip` → `IconTooltip`, props `{ text: string }` + default slot (`dist/components/custom/icon-tooltip/IconTooltip.vue.d.ts:1-8`). The cost of the local re-wrap is C-3: `Tooltip.vue:26-37` places **two** children under `GlassTooltip`, so `<Tooltip>` resolves to a multi-root Fragment.

**[CORRECTION to S-3, and the honest half.** `IconTooltip` takes only `text`, so it genuinely cannot serve the rich `#content` body at `:105-120` — the shim is not simply redundant, which is why this is MINOR and why S-3 survives in narrowed form. **Producer carry → glass-ui: ship the rich-body single-root tooltip monolith**, which retires the shim and cures the Fragment at both of this file's tooltip callsites.] **Falsifier** — an `#content`/slot-bearing monolith already in glass-ui 4.0.0's exports (there is none; `IconTooltip`'s only prop is `text`).

### C-27 · **[NEW]** The show-more tooltip promises 40 unconditionally
`:124` `` `Show top 40 of ${totalComponents} coefficients` ``. The button renders whenever `totalComponents > 12` (`:126`), so for `13 ≤ N ≤ 39` the tooltip reads e.g. *"Show top 40 of 20 coefficients"* while `:38` yields 20 rows and the button's own label (`:133`) reads *"Show more (20 total)"*. Three strings, two wrong, one control. This is the reachable consequence of C-14's third, string-embedded authorship. **Falsifier** — a `Math.min(40, totalComponents)` at `:124`, or a shared constant. Neither.

---

## §4 · INFO

- **I-1 · rAF fan-out.** Each `AnimatedDigit` owns a `SmoothProgress` driving its own `RAFPlayback` (`keyframes.js/dist/timeline-BjcmprQ6.js`, `drive` returns `!e.settled`), so loops do stop when settled — but `useAnimatedNumber` calls `.play(…)` unconditionally at setup, so a recompute starts 12–40 independent rAF callbacks in the same frame. Bounded and self-terminating; recorded for the F.W4 budget.
- **I-2 · Damped text vs undamped bar.** `:100` feeds the raw `comp.amplitude` to a damping composable while `:93` computes the bar width from the same raw value and `:112` prints it raw again. During the settle the three disagree — a settled full-width bar and a settled 4dp tooltip beside a numeral counting up from `0.00` (C-24). Cosmetic.
- **I-3 · `snapThreshold` is absolute.** `useAnimatedNumber` resolves `snapThreshold = 0.05` in *value* units for `mode:"absolute"` (`glass-ui/dist/constants-BPOqYJAm.js` `{canvas:.002, dom:.05, domProgress:.5}`). The default is DOM-scale (px/%); most equation-route amplitudes are below it and snap on frame 1. The primitive is used outside its calibrated domain — pass an explicit `damping`/`snapThreshold`, or accept that the damping is decorative here.
- **I-4 · `@reference "tailwindcss"` at `:145` is inert.** The scoped block contains no `@apply` and no theme function; pure build cost.
- **I-5 · Corroborates intake R3-10.** `lane-fourier-r3-r6.md:84` names `CoefficientsSpectrum.vue:132` as one of six dynamic `:is` families dropped between two Codex registries built from the same tree. **Live tree agrees exactly**: `:132` is `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. Confirmed at its cited line; carries to F.W4.
- **I-6 · Zero test coverage.** `grep -rn "coeff\|[Ss]pectrum" web/e2e/*.ts` returns two comment-only hits and no assertion. No unit test tree exists under `web/`. Every defect above is unguarded.
- **I-7 · **[NEW]** The API seam, enumerated.** The subject imports no API client and reads no store, so it is structurally outside R6-8's operation↔client join — the correct posture for a presentational leaf. Its `components` prop nevertheless originates at **three** producers, against the X-3 denominator (45 total / 30 public-non-admin / 13 admin):

  | producer | file:line | path to the prop |
  |---|---|---|
  | `POST /api/contours/{contourHash}/compute/epicycles` | `api/routers/contours.py:35` | `lib/api.ts:330-336` → `workspace.ts:291,299` → `CoefficientsPanel.vue:10` |
  | `POST /api/equations/compute` | `api/routers/equations.py:29` | `lib/equation/api.ts` → `EquationView.vue:59-67` → `EqCoefficientsPanel.vue:14` |
  | persisted workspace draft (no operation) | `workspace.ts:100` write / `:171` read | replays a stored `epicycleData` — see C-8 |

  Recorded so F.W5's repair preserves the shape: presentational leaves stay outside the join, **and** must be able to state their own preconditions (C-8) and failure states (C-21) without acquiring a store handle.

---

## §5 · Killed by their own falsifier (L-18, both directions)

- **K-1 · "`maxAmplitude` assumes an unsorted array — bars can exceed 100%."** **KILLED as a live bug.** All producers sort descending: `epicycles.py:54`, `bases_fitting.py:78,160`, `symbolic/integration.py:145`, `symbolic/spline.py:116`, `symbolic/identification.py:125`. Survives only as the *contract* defect C-8. *(Note: it does **not** kill B-2 — the array is correctly sorted; the defect is that its first element is the DC term.)*
- **K-2 · "`--ease-standard` is undefined, so `:148/:151` are invalid declarations."** **KILLED.** Defined at `glass-ui/dist/styles/tokens/scheme-motion.css:216` → `:211` (`cubic-bezier(0.4, 0, 0.2, 1)`), reachable via `style.css:3` `@import "@mkbabb/glass-ui/styles"`. Same for `text-admin-label` (`typography/semantic.css:213`) and `.fira-code` (`typography/utilities.css:69`).
- **K-3 · "`EquationView` posts `BasisComponent[]` to `/api/equations/simplify`, which expects `FourierTermDTO[]`."** **KILLED.** `web/src/lib/equation/api.ts:38-44` re-maps `index→n` and `coefficient[0..1]→coefficient_re/_im` before the POST. The seam is correct.
- **K-4 · **[NEW]** "`AnimatedDigit`'s runtime chain crosses glass-ui → keyframes → value.js, so B-1's peer breach lands on this component."** **KILLED — this is the first pass's own claim, refuted.** `SmoothProgress` is exported from the keyframes entry `keyframes.js`, whose static import graph is exactly `binarySearch-DOP8erk-`, `decay-BvNmFk51`, `sequence-COn8zk5o`, `springTimingFunction-CcJEvGwN`, `timeline-BjcmprQ6`. Receipt: `grep -c '@mkbabb/value.js'` over all five **and** the entry → **0, 0, 0, 0, 0, 0**. The five chunks that *do* import value.js (`animations-`, `compile-`, `engine-`, `scroll-scene-`, `waapi-`) are reached only through the entry's eight **dynamic** `import("./…")` calls, which in fourier are triggered by `loadAnimationEngine` alone (`composables/useFourierMorph.ts:14`) — a call this component never makes. **Consequence:** B-1 is a workspace/manifest blocker, not a per-component one; and C-2 is *stronger* than stated — the subject consumes zero value.js statically **and** transitively.

---

## §6 · Superlatives (L-18)

- **S-1 · `AnimatedDigit`'s prop consumption is exactly to contract** *(narrowed — see C-20)*. `:99-103` passes `value` / `format` / `class`; all three are declared (`AnimatedDigit.vue.d.ts:41-49`), the formatter signature `(v:number)=>string` matches, and `class` is a first-class prop merged by `cn()` at the primitive rather than a fallthrough attr — the shadcn-vue idiom, correctly consumed. No wrapper, no shim. **[CORRECTION]** The first pass also claimed the font-feature register is "not re-declared locally"; `:102` re-declares `tabular-nums`, so that half is refuted and files as **C-20**. The prop half stands. *Falsifier:* an undeclared prop or a signature mismatch — none.
- **S-2 · The `#graph` slot is the right decomposition.** `:68-70` hoists the single structural divergence between the two routes into a named slot, so the shared component carries **zero** route knowledge — no `route`/`variant`/`mode` prop, no `v-if` on a consumer flag. `CoefficientsPanel.vue:16-22` fills it; `EqCoefficientsPanel.vue:14` does not. C-1 and C-16 are arguments for slot **props**, not against the slot: the extraction chose the right *seam* and under-specified its *payload*. *Falsifier:* any `route`/`props.variant`/`isViz` branch in the subject — `grep -nE "route|variant|isViz"` returns one hit, `:127` `variant="ghost"`, a glass-ui Button prop and not a consumer discriminant.
- **S-3 · The local `ui/tooltip` shim is a thin API adapter, not a shadow** *(narrowed — see C-25)*. `ui/tooltip/Tooltip.vue:2-12` documents the adaptation and its body is 12 lines of pure forwarding onto `@mkbabb/glass-ui/tooltip`, independently confirming `lane-frontend.md:368-371`'s "keep" verdict against the live tree. **[CORRECTION]** glass-ui 4.0.0 already exports a `text`-only monolith (`./icon-tooltip`), so half the shim duplicates upstream; the rich `#content` half does not, and is the half that justifies the keep. C-3 and C-5 are caused by how this component *uses* the shim, not by the shim.
- **S-4 · CSS-first motion over the available JS engine.** With `keyframes.js` in the graph, the list transitions are declarative CSS (`:147-163`) rather than a JS timeline. Right choice for enter/leave on a 40-row list; C-3 is a wiring defect, not a repudiation.
- **S-5 · The degenerate-denominator case is handled — once.** `:57` `if (!maxAmplitude.value) return "0%"` is a real guard for a real edge. It is the evidence that makes C-13 an *asymmetry* rather than an oversight.
- **S-6 · Prop hygiene.** `withDefaults(defineProps<…>())` with a documented optional (`:27-28`), zero `any`, zero non-null assertions, both consumers supplying explicit `empty-text` copy rather than relying on the default. `vue-tsc -b` is wired into `build` (`web/package.json` `scripts.build`).
- **S-7 · **[NEW]** Prefers-reduced-motion is inherited correctly, and for free, at the only seam that runs JS motion.** `useAnimatedNumber-C_3wZLx4.js` constructs `new SmoothProgress({ …, respectReducedMotion: options.respectReducedMotion !== false })`, and `AnimatedDigit` forwards only `{ mode, damping }` — so the flag evaluates `undefined !== false` → **true**. The consumer does nothing and gets PRM gating. This matters against the corpus PRM census (`lane-frontend.md:612-624` — 18 refs / 12 files, two named gaps: `stores/animation.ts` and the `ConvergencePlot` rAF): the subject is correctly **absent** from that list, by construction rather than luck — `grep -n "requestAnimationFrame\|setInterval\|setTimeout\|new Animation" CoefficientsSpectrum.vue` → **zero**. *Falsifier:* `respectReducedMotion: false` anywhere in the chain, or a manual rAF in the file. Neither. Rendered honouring **UNPROVEN-NEEDS-LIVE (SS-13)**; the flag's value is proved statically from the shipped chunk.
- **S-8 · **[NEW]** Typography consumption is upstream-canonical on both utilities it uses — in a tree where twelve sites hard-code the same font by hand.** `fira-code` (`:73, :86, :102, :112, :114, :116, :118`) resolves to glass-ui's `@utility fira-code` (`dist/styles/typography/utilities.css:69` — `font-family: var(--font-mono); font-feature-settings: "liga","calt"`), reachable via `style.css:3`. `text-admin-label` (`:110`) resolves to `@utility text-admin-label` (`typography/semantic.css:213`) backed by `--type-admin-label: 0.625rem`, annotated *"fixed sub-control micro (NOT fluid)"* (`typography/scale.css:86`) — the right register for a tooltip metric grid. Contrast the surrounding tree: **twelve** sites hard-code `font-family: "Fira Code", monospace` instead — `SpeedSelect.vue:53,65`, `canvas-drawing/labels.ts:55,71,94,100`, `canvas-drawing/placeholder.ts:56`, `ConvergencePlot.vue:390`, `EquationModeToggle.vue:75`, `FrequencyGraph.vue:109`, `ConvergenceTimeline.vue:97`, `ConvergenceLegend.vue:88` — **including the subject's own `#graph` slot payload**. On the axis where this file consumes the design system, it is on the right side of that split and its sibling is not. *Falsifier:* either utility undefined in the resolved CSS (both are defined upstream, import chain `style.css:3`), or a local `font-family` in `:144-167` (there is none).
- **S-9 · **[NEW]** Bare-specifier discipline is exact — five imports, zero deep paths, zero dev-condition aliasing.** `:17-22` — `vue`, `@mkbabb/glass-ui/button`, `@mkbabb/glass-ui/animated-digit`, `lucide-vue-next`, `@/components/ui/tooltip`, `@/lib/types`. Both glass-ui subpaths are **declared `exports` entries** in 4.0.0 (`./button`, `./animated-digit`; the shim uses a third, `./tooltip`) — no fabricated subpath, no `@mkbabb/*/dist/*` anywhere. `vite.config.ts:22-25` deliberately carries **no** `@mkbabb/*` aliases, citing `docs/precepts/cross-repo-dev-resolution.md §2.2/§2.4` (corpus `lane-frontend.md:45`): the `development` condition is struck and siblings resolve through their own exports maps. This is the contract-v2 posture value.js itself holds, and this file is a clean instance. *Falsifier:* any deep `dist/` import, any `development`-condition reliance, or any subpath absent from glass-ui's exports map. None.

---

## §7 · Tally

| Class | Count | Ids |
|---|---:|---|
| BLOCKER | **2** | B-1, **B-2** |
| MAJOR | **11** | C-1 … C-8, **C-21**, **C-22**, **C-26** |
| MINOR | **16** | C-9 … C-19 (11), **C-20**, **C-23**, **C-24**, **C-25**, **C-27** (5) |
| INFO | 7 | I-1 … I-6, **I-7** |
| **Defects (BLOCKER + MAJOR + MINOR)** | **29** | 2 + 11 + 16 |
| Killed by falsifier | 4 | K-1 … K-3, **K-4** |
| Superlatives | **9** | S-1 … S-6 (S-1, S-3 narrowed), **S-7 … S-9** |

*(The `C-` id block runs C-1…C-27 with no gaps; C-21, C-22 and C-26 sit in MAJOR rather than MINOR, which is why the MINOR ids are non-contiguous. 11 MAJOR + 16 MINOR + 2 BLOCKER = 29 defects; the 7 INFO rows are excluded from the defect count by the same convention the first pass used.)*

**Corpus disposition.** Confirmations **11** — `lane-frontend.md:45,180,291-292,428,480,490,492`; `CENSUS-2026-08-03.md:38,105`; `intakes:79,84,142`. Extensions **3** — `CanvasOverlayButton` C-axis S-3's "four bodies" → one already exported + one divergent in law (C-1); `CoefficientsPanel` challenge-L "authored twice" → **three** times, third inside a template literal (C-14, C-27); R6-8's contract rule needs a companion clause on structurally-typed payloads (C-7). Contradictions **2** — `lane-frontend.md:46` (the `vendor-math` "colour-math cluster" comment is contradicted by the tree, and by K-4 even transitively); `lane-frontend.md` §5's break table has **no `Button` row** though 7.0.0 deletes `variant` (C-26).

**Self-corrections this pass (L-18 inward).** Four: B-1's per-component chain (→ K-4), C-2's symbol list (`parseCssColor` is not in 0.13.0's export map), S-1 (half refuted → C-20), S-3 (half duplicates upstream → C-25).

**Carries.**
- **F.W1** — B-1 + C-6 + **C-26** (the atomic tri-package uplift; C-26 adds an unbudgeted `Button.variant` break, and per K-4 the minimal repro is the *manifest*, not this file).
- **F.W2** — C-1 + C-2 (value.js consumption to spec; the finding that F.W2's *empty* migration surface for this file is the wrong reading, and that a single unified `spectrumColor` on value.js is the cheapest way to make the bump pay for itself).
- **F.W3** — C-3 + C-5 + **C-25** (the 35-callsite tooltip disposition, R3-7a; plus the producer request for a rich-body single-root monolith).
- **F.W4** — I-5 (dynamic `:is` exhaustiveness, R3-10) + I-1 (rAF budget).
- **F.W5** — C-7 + C-8 + **C-21** + **I-7** (the ADMISSION KEYSTONE contract).
- **Producer → glass-ui** — **C-24** (`AnimatedDigit` must forward `initial`) and **C-25** (ship the rich-body tooltip monolith). Both are BH/BI relay items under the standing formation invariant.
- **Repair order, if only three things are fixed** — **B-2** first (the primary readout is numerically wrong, not merely inconsistent), then **C-1** (one edit: delete `:47-49`, import `harmonics.ts:81`, reconcile `transforms.ts`'s `**0.6`, and give `<slot name="graph">` the denominator and max as slot props), then **C-21 + C-16** (widen the contract: an `#empty`/`error` surface and a `hover-harmonic` emit).
