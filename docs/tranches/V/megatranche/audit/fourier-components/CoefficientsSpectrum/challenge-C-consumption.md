claude-opus-5[1m]

# CHALLENGE · `CoefficientsSpectrum.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (168 lines).
**Repo state** `fourier-analysis` @ branch `m/w1-bump-migration`, HEAD `cd26c65`, 28 uncommitted paths.
The subject file is **HEAD-clean** (last touched `262c3d0 feat(adopt): I AQ-gated arms + 3.1.0 adoption`); `web/package.json` on disk is the **in-flight bump [WT]** (HEAD still pins glass-ui `^3.1.0` / keyframes `^2.2.0` / value.js `^0.10.0`). Every version claim below is tagged **[WT]** or **[HEAD]** per the census caveat.
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are tagged **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Three candidate defects were **killed by their own falsifier** and are recorded in §5 — L-18 runs both ways.

**Consumption surface, measured.**

| Producer | Direct import in this file | Site |
|---|---|---|
| `@mkbabb/glass-ui` | `Button`, `AnimatedDigit` (+ `Tooltip*` via the local shim) | :18, :19, `ui/tooltip/Tooltip.vue:13-17` |
| `@mkbabb/keyframes.js` | **none direct** — transitive via `AnimatedDigit → useAnimatedNumber → SmoothProgress` | `glass-ui/dist/useAnimatedNumber-C_3wZLx4.js:3` |
| `@mkbabb/value.js` | **ZERO** — no import, no symbol, no type | (see C-2) |
| fourier API (45 ops) | **zero client calls**; coupled only through the `BasisComponent` DTO | :22 → `web/src/lib/types.ts:1-6` |
| `lucide-vue-next` | `ChevronDown`, `ChevronUp` | :20 |

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

`semver.satisfies("0.13.0", "^0.10.0 || ^0.11.0")` → **`false`** (pre-1.0 caret pins the minor). The two ranges are **mutually unsatisfiable with a single copy**: keyframes@4.3.0 *requires* `^0.13.0`, glass-ui@4.0.0 *forbids* it. The installer resolved in keyframes' favour and left glass-ui's peer red.

**Why it lands on THIS component and not merely on the manifest.** This file is a live glass-ui consumer at :18/:19, and `AnimatedDigit` (:99-103) is the one import in the file whose runtime path crosses all three packages in a single call chain:

```
CoefficientsSpectrum.vue:99  <AnimatedDigit>
  → glass-ui/dist/animated-digit.js:3   import { t as n } from "./useAnimatedNumber-C_3wZLx4.js"
  → useAnimatedNumber-C_3wZLx4.js:3     import { SmoothProgress } from "@mkbabb/keyframes.js"
  → keyframes.js/dist/engine-BKm1GcJT.js:4  import { …, lerpValue, timingFunctions, … } from "@mkbabb/value.js"
```

So the numerals in every coefficient row are damped by a keyframes engine built against `value.js@0.13`, hosted by a glass-ui that declares it will not accept `value.js@0.13`. The census records the *bump* as [P0] (`CENSUS-2026-08-03.md:108-109`, `lane-frontend.md:490-492`) but records the pins as "AGREE"; it does **not** record that the current graph is already **invalid** rather than merely stale. That is the new fact.

**Falsifier.** Run `npm ls @mkbabb/value.js` in `fourier-analysis/web`. If it exits 0 with no `invalid:` marker, this claim is dead. It exits 1. Secondary falsifier: if glass-ui@4.0.0's `peerDependenciesMeta["@mkbabb/value.js"].optional === true` made the range unenforced — it *is* marked optional, which is why install did not hard-fail, **but optional governs presence, not range**: npm still reports `invalid` for a present-but-out-of-range optional peer, as the receipt shows.

**Carry.** → **F.W1** (the atomic tri-package uplift) and **F.W2** (value.js consumption to spec). This component's import list is the minimal reproduction: two glass-ui subpaths + one transitive keyframes engine.

---

## §2 · MAJOR

### C-1 · The same coefficient `n` is painted **three different hues** inside one panel — `spectrumColor` is quadruplicated and the four copies disagree

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:47-50` · `components/equation/FrequencyGraph.vue:42-45` · `components/visualization/lib/canvas-drawing/transforms.ts:3-8` · `components/equation/lib/harmonics.ts:80-88` · call sites `CoefficientsSpectrum.vue:94,107` / `FrequencyGraph.vue:84,196` / `canvas-drawing/epicycles.ts:162`.

Four live implementations of one named concept:

| Site | Formula | Exported? |
|---|---|---|
| `CoefficientsSpectrum.vue:47` | `hue = (1 − i/max(total−1,1))·300`, `hsl(h,85%,55%)` | no — file-local |
| `FrequencyGraph.vue:42` | **byte-identical** to the above | no — file-local |
| `canvas-drawing/transforms.ts:3` | `hue = (1 − (i/max(total−1,1))^0.6)·300` — **gamma-curved** | **yes**, re-exported by `canvas-drawing/index.ts:2` |
| `equation/lib/harmonics.ts:81` | linear, `hsla(…, α)` | **yes** |

The component lives in `components/shared/` — the tree's designated shared home — and still inlines a function that two sibling modules already export.

The consequence is not stylistic, it is a **wrong data encoding**. `CoefficientsPanel.vue:15-24` renders `<FrequencyGraph :max-bars="40">` in the `#graph` slot **directly above** this component's list, both fed the identical `store.epicycleData.components` array. The list passes `topComponents.length` as `total` (12 when collapsed); the graph passes `n = min(components.length, 40)`; the epicycle canvas passes `nVis` through the gamma-curved variant. Computed hues for the same array positions:

| `i` | list `total=12` | graph `total=40` | canvas gamma `total=40` |
|---:|---:|---:|---:|
| 1 | 272.7° | 292.3° | 266.7° |
| 3 | 218.2° | 276.9° | 235.6° |
| 5 | 163.6° | 261.5° | 212.5° |
| 8 | 81.8° | 238.5° | 184.0° |
| 11 | **0.0°** (red) | **215.4°** (blue) | 159.6° |

Coefficient #11 is red in the list and blue in the graph **six pixels above it**. Colour is the only channel tying a bar to its harmonic across the three surfaces, and it is inconsistent by construction on two independent axes (differing `total`, differing transfer function). Toggling "Show more" (:130) re-hues every already-rendered row because `total` flips 12→40.

**Falsifier.** If the three surfaces were never co-visible, the divergence would be cosmetic. They are: `CoefficientsPanel.vue:14-25` nests `FrequencyGraph` and `CoefficientsSpectrum` in one `ConfiguratorLayer`, and `epicycles.ts:162` paints the main canvas from the same sorted chain (its own comment at `:164-165` names the sort ("the chain is amplitude-sorted")). Second falsifier: if `total` happened to agree — it cannot; `:max-bars="40"` is hard-coded at `CoefficientsPanel.vue:20` while this component's `total` is `12` until `expanded`.

### C-2 · The densest colour + numeric-formatting surface in the app consumes **zero** value.js, while the repo hand-rolls the arm value.js exists to supply

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue` (no `@mkbabb/value.js` import anywhere in the file) · `web/src/lib/colors.ts:22-54` (`cssVarToHex`), `:56-68` (`hslToHex`), `:70-74` (`rgbToHex`), `:101-107` (`hexToRgba`), `:111-117` (`hexToRgb`) · census `CENSUS-2026-08-03.md:38` ("5 import statements / 4 files / 6 symbols, **easing-only**").

The census's value.js consumption surface is 5 sites, all `easeInOutSine`/`timingFunctions`. **None of them is this file.** The F.W2 "bare-specifier migration surface" for `CoefficientsSpectrum.vue` is therefore **empty** — which will score as "nothing to migrate" and is exactly the wrong reading. The file emits colour on two hot paths (:94 bar fill, :107 tooltip dot) via raw template-string `hsl()` interpolation, and the project's *own* colour module (`lib/colors.ts`) re-implements HSL→hex, RGB→hex, hex→RGBA and a `getComputedStyle` CSS-colour parser by regex — five functions that `@mkbabb/value.js@0.13` already ships (`parseCssColor`, `colorUnit2`, `formatCSS`, `COLOR_SPACE_RANGES`, `sampleColorRamp`; the last is precisely a spectrum ramp, and is already imported by keyframes at `keyframes.js/dist/compile-C0xOTIC4.js:4`).

Two second-order consequences, both provable:

1. **`hsl(h, 85%, 55%)` is theme-blind.** Saturation and lightness are frozen literals. `App.vue:10-18` runs a `MutationObserver` on `documentElement.class` to re-resolve `--viz-*` through `resolveVizColors()` on dark-mode flip; this component subscribes to none of it. `style.css:113-126` documents that the project already had to hand-darken `--viz-amber` from `hsl(35 70% 42%)` (≈3.54:1) to `hsl(35 76% 35%)` (≈4.6:1) to clear WCAG AA — i.e. the repo *knows* fixed-lightness HSL fails contrast — and then the spectrum bars ship a fixed 55% lightness across all 300° of hue anyway. Constant HSL lightness is not constant perceptual lightness (yellow at L=55% vs blue at L=55%), which is the exact problem oklch/`value.js` colour spaces solve.
2. **The value.js peer is paid for and unused here.** `vite.config.ts:44,57` allocates a `vendor-math` manual chunk for value.js + katex; this component drags that chunk in transitively through `AnimatedDigit`→keyframes→value.js (B-1) and takes none of its colour API.

**Falsifier.** If value.js@0.13 shipped no colour surface, "should consume it" would be empty rhetoric. It does: `node -e "console.log(Object.keys(require('@mkbabb/value.js')))"` over `web/node_modules/@mkbabb/value.js` exposes the colour + ramp API that `keyframes.js/dist/compile-C0xOTIC4.js:4` and `engine-BKm1GcJT.js:4` already import by name. Second falsifier: if `lib/colors.ts` were a thin shim over value.js — it is not; `:56-68` is a from-scratch HSL→hex implementation with its own `f(n)` kernel.

### C-3 · `.coeff-list-move` is **dead by construction**: every `TransitionGroup` child is a fragment-root component

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:79-122` (`<TransitionGroup name="coeff-list">` whose only child is `<Tooltip v-for>`), `:161-163` (`.coeff-list-move`) · `web/src/components/ui/tooltip/Tooltip.vue:25-38` · `glass-ui/dist/TooltipProvider-B3MkB_8P.js` (`Tooltip` = reka-ui `TooltipRoot`) · `reka-ui/dist/Tooltip/TooltipRoot.js` (renders `PopperRoot` → `renderSlot`, **no element**) · `@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1454-1462`.

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

The subject's children are `<Tooltip>` → shim → `TooltipRoot` → `PopperRoot` → bare `renderSlot`. The rendered subtree root is a **Fragment** (`[TooltipTrigger, TooltipPortal]`), so `vnode.el` is the fragment's text anchor, **not an `Element`**. Every child fails the `instanceof Element` gate, `prevChildren` stays empty, and `onUpdated` (`:1420-1423`) returns at `if (!prevChildren.length) return`. The `.coeff-list-move` rule at `:161-163` can never be applied.

This is a **regression introduced by the file's own documented migration**: the header comment at `:11-15` records `B.W2.c` lifting "the bespoke `:hover` CSS tooltip … to the glass-ui `Tooltip` primitive", and the `<style>` block at `:146` still carries the earlier `A.W3.d` motion contract. Wrapping each row in the tooltip **root** (rather than putting the tooltip inside the row element) is what turned every TransitionGroup child into a fragment. The minimal cure is a real element between `TransitionGroup` and `Tooltip` — the wrapper the migration deleted.

**Falsifier.** If `TooltipRoot` rendered a host element, `child.el` would be an `Element` and the claim dies. `reka-ui/dist/Tooltip/TooltipRoot.js` (tail) is `createBlock(PopperRoot, null, { default: () => renderSlot(_ctx.$slots,"default",{open}) })` — no `Primitive`, no `as`. Second falsifier: if Vue < 3.5 (no `instanceof Element` gate) — installed `vue@3.5.38` (`node -e "require('vue/package.json').version"`). *Enter/leave class application (`:147-159`) is very likely dead for the same reason but travels a different renderer path (`remove()`'s `STABLE_FRAGMENT` branch); marked **UNPROVEN-NEEDS-LIVE (SS-13)** — probe: toggle "Show more" and watch for `.coeff-list-enter-active` in the element inspector.*

### C-4 · The `:key` composition **defeats the AnimatedDigit damping the file was migrated to gain**

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:82` `:key="`${comp.index}-${i}`"` · `:99-103` · `glass-ui/dist/useAnimatedNumber-C_3wZLx4.js` (`watch(() => toValue(d), e => e != null && setTarget(m(e)))`, `initial: 0`).

The key mixes the **stable identity** (`comp.index` — the harmonic number `n`) with the **positional index** (`i`). Because the payload is amplitude-sorted (§5 K-1), any recompute that changes relative amplitudes changes `i` for a given `n` — so the key changes, Vue tears the row down and mounts a fresh one, and `useAnimatedNumber` restarts from its `initial: 0`. The damped count-up from the *previous* amplitude to the *new* one — the entire value proposition recorded in the header comment at `:11-12` ("damped numerals") — never happens on the one event where it would be legible: a parameter change that recomputes the spectrum.

`comp.index` alone is a valid key: `EpicycleChain.from_signal` (`src/fourier_analysis/epicycles.py:76-92`) emits each frequency exactly once (DC, then ±n), and `FourierTermDTO.n` is likewise unique per term. The `-${i}` suffix buys nothing and costs the primitive's whole purpose.

**Falsifier.** If `comp.index` were non-unique, the suffix would be defensive and correct. It is unique — `epicycles.py:80-91` appends `frequency=0` once and then `+n`/`−n` guarded by `neg_idx != n`; `api/routers/equations.py:145` maps one DTO per term. Second falsifier: if `AnimatedDigit` re-seeded from the previous DOM value on remount — it does not; `useAnimatedNumber` seeds from `options.initial ?? 0`.

### C-5 · The tooltip trigger is a non-focusable `<div>` — the a11y gap the header claims to have discharged is **not** discharged for keyboard

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:13-15` (the claim: "the bespoke `:hover` CSS tooltip lifts to the glass-ui `Tooltip` primitive … **discharging the L5 §5 A8 LOW a11y gap**") · `:85` (the trigger element: `<div class="coeff-row flex …">`) · `ui/tooltip/Tooltip.vue:27-29` (`<TooltipTrigger as-child><slot/></TooltipTrigger>`) · `reka-ui/dist/Primitive/Slot.js:8-24` · `reka-ui/dist/Tooltip/TooltipTrigger.js` (tail).

With `as-child`, reka-ui's `Slot` clones the **first non-comment child** and merges the trigger's attrs onto it (`Slot.js:12-21`). The merged set is `aria-describedby` / `data-state` / `data-grace-area-trigger` + pointer, focus and blur handlers. It contributes **no `tabindex`**, **no `role`**, and the `as: "button"` default is discarded because `asChild` wins. The clone target is a plain `<div>` (`:85`) — not in the tab order. `TooltipTrigger`'s `handleFocus`/`handleBlur` therefore never fire, and the tooltip body (amplitude to 4dp, phase in degrees, relative %, Re/Im — the only place those four values appear) is reachable by pointer only.

The file asserts the opposite in its own header. That contradiction, not the underlying LOW gap, is the defect: the wave is booked closed on evidence the tree refutes.

**Falsifier.** If `Slot` injected a `tabindex`, or if the merged `<div>` were focusable for another reason, the claim dies. `Slot.js` performs `mergeProps(attrs, firstNonCommentChildren.props)` and nothing else — grep it for `tabindex` returns nothing; the child at `:85` carries no `tabindex`, no `role`, no `contenteditable`, is not a form control or `<a href>`. **Cross-check with the corpus:** intake row **R3-7a** (`lane-fourier-r3-r6.md:79`) counts "35 Tooltip callsites over nine consumers", with `CoefficientsSpectrum` contributing **2** — both are the callsites indicted here (`:80` and `:124`). This challenge does not contradict R3-7a; it prices it: the F.W3 migration budget of 35 callsites carries a latent keyboard gap wherever the trigger child is a non-interactive element.

### C-6 · Two icon packages are installed; this file imports the **deprecated** one, and imports it from `devDependencies`

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:20` `import { ChevronDown, ChevronUp } from "lucide-vue-next"` · `web/package.json` [WT] `devDependencies["lucide-vue-next"] = "^1.0.0"` · glass-ui@4.0.0 `peerDependencies["@lucide/vue"] = "^1.16.0"`.

```
$ npm ls @lucide/vue lucide-vue-next
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @lucide/vue@1.20.0
└── lucide-vue-next@1.0.0
```

Both icon libraries are in the graph. glass-ui's own components resolve `@lucide/vue@1.20.0`; the app resolves `lucide-vue-next@1.0.0`. Two icon sets, two tree-shaking roots, in the same `vendor-ui` manual chunk (`vite.config.ts:52-56` lists glass-ui + reka-ui + **`lucide-vue-next` only**). This file is 1 of the **35** sites the census books for the rename (`CENSUS-2026-08-03.md:105`, `lane-frontend.md:636`).

Second, sharper: `lucide-vue-next` is declared in **`devDependencies`**, and `:20` is a *runtime source import*. Vite bundles it so the app works, but the dependency class is wrong — the same is true of `reka-ui`, `class-variance-authority`, `clsx` and `tailwind-merge`, all glass-ui runtime peers filed as dev. Any consumer that resolves this tree with `npm ci --omit=dev` gets an unbuildable graph.

**Falsifier.** If `@lucide/vue` were absent, the "two packages" claim dies — `ls node_modules/@lucide/vue` and the `npm ls` receipt above both show `1.20.0` present. If `lucide-vue-next` were in `dependencies`, the class claim dies — read `web/package.json` `devDependencies`.

### C-7 · The epicycle operation's response is an **untyped `dict`**, and the only typed component model in the API is dead and **disagrees with the wire**

**Severity MAJOR.** **Provenance** `api/routers/contours.py:35` `@router.post("/{contourHash}/compute/epicycles", response_model=ComputeResult)` · `api/models/computation.py:63-65` `class ComputeResult: status: str = "ok"; data: dict` · `api/services/computation.py:110-118` (the actual emission) · `api/models/computation.py:55-60` `class EpicycleComponentDTO` · client mirror `web/src/lib/types.ts:1-6`.

Three mutually inconsistent descriptions of one leaf:

| Where | Shape |
|---|---|
| `api/services/computation.py:111-114` (**the wire**) | `{"index": int, "coefficient": [re, im], "amplitude": float, "phase": float}` |
| `api/models/computation.py:55-60` `EpicycleComponentDTO` | `{frequency, coefficient_re, coefficient_im, amplitude, phase}` |
| `web/src/lib/types.ts:1-6` `BasisComponent` (**what this file consumes at :22**) | `{index, coefficient: [number, number], amplitude, phase}` |

`EpicycleComponentDTO` is **referenced nowhere** — `grep -rn "EpicycleComponentDTO" --include="*.py" .` returns exactly one hit, its own definition. And because the route declares `response_model=ComputeResult` with `data: dict`, the generated OpenAPI schema for this operation says `data: object` with **no properties**. There is consequently **no derivable join** between the operation and the client leaf that renders it: this component's `BasisComponent` contract is hand-maintained against a Python dict literal.

**Corpus relation — explicit contradiction of scope.** Intake row **R6-8** (`lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT, CARRY → F.W5) establishes that *an API-operation model embedding derived client back-references cannot attribute a defect to one side of the seam*, using `operation:PATCH:/api/visualizations/{slug}` whose record carries `"clients": ["client:updateVisualization"]`. The epicycle operation exhibits the **opposite** pathology and R6-8's remedy does not reach it: the operation record embeds **nothing at all**, so no join — ambiguous or otherwise — is derivable. R6-8's prescription ("keep operation identity independent of client identity; put the join in a separate relation") presupposes a typed operation payload to join *on*. `ComputeResult.data: dict` denies that premise. **F.W5's shared-provenance contract must therefore add a second rule: an operation's response model must be structurally typed, or the leaf is unjoinable in principle.** The value.js↔fourier conformance fixtures (census §4 F.W8 / FN-6) cannot be generated for this operation as it stands.

**Falsifier.** If the route declared a typed model, the claim dies — `contours.py:35` declares `ComputeResult`, and `computation.py:63-65` types its `data` as bare `dict`. If `EpicycleComponentDTO` were used anywhere, the "dead + divergent" half dies — the grep is a single self-hit. Contrast the equation route, which does it right (`equations.py:29` `response_model=ComputeEquationResponse`, `models/equations.py:8-13` `FourierTermDTO`) — proving the API knows how; the epicycle path simply does not.

### C-8 · The prop contract silently depends on an **undocumented, unenforced amplitude-descending invariant**

**Severity MAJOR.** **Provenance** `CoefficientsSpectrum.vue:26` (`components: BasisComponent[]`), `:37-39` (`topComponents` = a **positional slice**), `:43-45` (`maxAmplitude` = `topComponents[0].amplitude`) · `web/src/lib/types.ts:1-6` (the type, which says nothing about order).

`maxAmplitude` reads element **0** and treats it as the maximum; `topComponents` is named "top" but computes `slice(0, n)`. Both are correct **only if** the incoming array is sorted by descending amplitude. Nothing in the prop type, the prop name, the JSDoc (`:27-28` documents only `emptyText`), the API response models, or a runtime assertion states that requirement. If any future producer hands this component harmonic-ordered data (`n = −N…N`, the natural DFT order), the bars silently overflow 100%, "Relative" percentages exceed 100%, and "top 12" becomes "the 12 lowest frequencies".

The invariant is real but lives entirely in the producers, three repos deep, and is asserted only in prose:
- `src/fourier_analysis/epicycles.py:54` `self.components = sorted(components, key=lambda c: c.amplitude, reverse=True)`
- `symbolic/integration.py:145`, `symbolic/spline.py:116`, `symbolic/identification.py:125` — `terms.sort(key=lambda t: t.amplitude, reverse=True)`
- and the only place it is *written down* on the client side is a comment in a **different** component: `canvas-drawing/epicycles.ts:163` "the chain is amplitude-sorted".

**Falsifier.** If the ordering were stated in the contract this claim dies. Read `web/src/lib/types.ts:1-12`: `BasisComponent` and `BasisDecomposition` carry no ordering clause; `api/models/computation.py:63-65` and `api/models/equations.py:26+` carry none. If the producers did not sort, this would be a live bug rather than a contract defect — they do sort (four sites above), which is precisely why it is filed MAJOR-contract, not BLOCKER-bug. Cheapest cure: rename the prop `sortedComponents` or derive `maxAmplitude` with `Math.max(...map(a))` — the second is O(n) on ≤401 elements and removes the dependency entirely.

---

## §3 · MINOR

### C-9 · The template uses `transition-all` **eleven lines** after the file forbids it in writing
`:146` `/* A.W3.d — named properties + canonical tokens, no 'transition: all'. */` vs `:91` `class="h-full rounded-full transition-all duration-500 ease-out"`. Compiled against the installed `tailwindcss@4.3.x`, `transition-all` emits exactly what the comment forbids:
```
.transition-all { transition-property: all; transition-timing-function: var(--tw-ease,…); transition-duration: var(--tw-duration,…); }
```
(receipt: `tailwindcss/dist/lib.mjs` `compile('@import "tailwindcss";').build(['transition-all','duration-500','ease-out'])`). The element carries an inline `width`, `backgroundColor` **and** `minWidth` (`:92-96`), all three of which now transition on every `expanded` toggle. **Falsifier** — if Tailwind v4 had redefined `transition-all` to a property list, the claim dies; the compiler receipt above shows `all`.

### C-10 · The same `<style>` block violates its own "canonical tokens" clause twice more
`:162` `.coeff-list-move { transition: transform 0.3s ease; }` — a raw CSS keyword where every sibling rule uses `var(--ease-standard)`; and the four durations at `:148,151,162` are literals (`0.3s`, `0.2s`) where glass-ui ships `--duration-normal: 0.3s` and `--duration-fast: 0.2s` (`glass-ui/dist/styles/tokens/scheme-motion.css:67-68`) — the exact values, already tokenised. **Falsifier** — if glass-ui shipped no duration tokens the claim dies; it ships eight (`:66-74`).

### C-11 · `v-if` sits on the `<Button>` **inside** the `<Tooltip>`, not on the tooltip
`:124-135`. When `totalComponents <= 12` the `Tooltip` still mounts: a `TooltipRoot` + `PopperRoot` + `TooltipTrigger` + `TooltipPortal` whose trigger slot resolves to a Comment. `reka-ui/dist/Primitive/Slot.js:11-13` handles it (`firstNonCommentChildrenIndex === -1` → returns the comment, no throw), so this is dead weight and a `rootContext.onTriggerChange(undefined)`, not a crash. Move the `v-if` to `:124`. **Falsifier** — if `Slot` threw on an empty slot this would be a BLOCKER; it returns `children` unmodified.

### C-12 · `fmtAmplitude` = `toFixed(2)` collapses the spectrum tail to `"0.00"` on the equation route
`:61-63` vs the tooltip's `toFixed(4)` at `:112`. Fourier amplitudes span orders of magnitude: a sawtooth's `|c_n| ≈ 1/(nπ)` reaches `0.0032` by `n=100`, and with `expanded` showing 40 rows the lower rows render `"0.01"`, `"0.00"`, `"0.00"` while their bars still show meaningful relative height and the tooltip shows the real value. Three renderings of one number at three precisions in one row. The epicycle route is unaffected (pixel-scale amplitudes). **Falsifier** — if the equation route's amplitudes were all ≥ 0.005 the claim dies; `api/routers/equations.py:112-116` reconstructs from every term including the tail, and `n_harmonics` accepts up to 200 (`models/equations.py:20`).

### C-13 · Guard asymmetry: `formatPercent` handles a zero maximum, the bar width does not
`:56-58` guards `if (!maxAmplitude.value) return "0%"`. `:93` does not: `width: ${(comp.amplitude / maxAmplitude) * 100}%` → `0/0` → `"NaN%"`, an invalid declaration the browser drops, leaving the bar at `minWidth: 2px` with no error surfaced. `:43-45` guards only emptiness, not zero. The author demonstrably knew about the degenerate case in one of the two places it occurs. **Falsifier** — reachable only if all visible amplitudes are 0; enter `0` as the equation expression (`ComputeEquationRequest.expression`, `models/equations.py:17`). Marked **UNPROVEN-NEEDS-LIVE (SS-13)** for the visual outcome; the arithmetic is static-certain.

### C-14 · `12` and `40` are magic numbers repeated across three layers with no prop
`:38` (the slice), `:126` (`totalComponents > 12`), `:124` (the tooltip copy "top 12" / "top 40"). Three independent restatements of one policy in a component explicitly built for two different routes with different data scales — and neither consumer can override it. Contrast the sibling `FrequencyGraph.vue:8,11` which exposes `maxBars?: number` (defaulted 60, overridden to 40 at `CoefficientsPanel.vue:20`). The shared component is *less* configurable than the one it was extracted alongside.

### C-15 · The index label disagrees with the graph directly above it
`:87` renders `{{ comp.index >= 0 ? "+" : "" }}{{ comp.index }}` → `"+0"`, `"+3"`. `FrequencyGraph.vue:111` renders `String(comp.index)` → `"0"`, `"3"`. Same array, same panel, two labelling conventions; `"+0"` for the DC term is also mathematically odd. The tooltip at `:108` uses a third form (`n = 0`).

### C-16 · No emits: the cross-highlight seam with `FrequencyGraph` is designed and then dropped
`CoefficientsSpectrum.vue` declares **zero** emits. `FrequencyGraph.vue:16-19` declares `toggle-harmonic` and `hover-harmonic`, and accepts `activeIndices?: Set<number>` (`:7`). `CoefficientsPanel.vue:15-24` binds **none** of them and passes no `activeIndices` — so the graph's interaction contract is inert, every bar renders permanently "active" (`FrequencyGraph.vue:77` `const isActive = !props.activeIndices || …` → always true), and hovering a list row cannot highlight its bar (or vice-versa). Two co-visible readouts of one array with a fully-specified coupling API and zero wiring.

### C-17 · 40 is a hard ceiling on a payload of up to ~401 components
`:38`. `compute_epicycles` defaults `n_harmonics=200` (`api/services/computation.py:102`) → DC + ±200 ≈ **401** components. The readout at `:73-75` honestly prints `40 / 401`, but the button copy at `:133` reads "Show more (401 total)", implying otherwise, and there is no third state. ~90% of the returned payload is unreachable in the UI while being fully transferred over the wire.

### C-18 · `w-8` (32px) is too narrow for ±3-digit harmonic indices
`:86`. `"-200"` at `text-xs` Fira Code in a `flex` row with default `flex-shrink` overflows a 2rem box; there is no `overflow-hidden` or `flex-none`, so the text spills toward the bar track. Reachable with the default `n_harmonics=200`. **UNPROVEN-NEEDS-LIVE (SS-13)** — needs a rendered measurement; the arithmetic (4 glyphs × ~0.6em × 13.5px ≈ 32.4px > 32px) is indicative only.

### C-19 · Mount behaviour diverges between the component's two hosts
The visualization host is `ConfiguratorLayer :default-open="false"` (`CoefficientsPanel.vue:14`), which — per glass-ui's own `ConfiguratorLayer.vue.d.ts` header ("recursion-free reveal … `grid-template-rows: 0fr ↔ 1fr` … requires no JS watchers") and the repo's own e2e note (`web/e2e/visualization-ux.spec.ts:119-123`: "glass-ui renders each collapsed layer body with `role="region" aria-hidden="true"` while keeping its focusable trigger inside (it omits `inert`)") — keeps the body **mounted while collapsed**. The equation host is `CollapsibleSection` → reka-ui `CollapsibleContent` (`ui/CollapsibleSection.vue:45-49`), which is `Presence`-gated and **unmounts**. So on the visualization route 12 `TooltipRoot`s, 12 `AnimatedDigit`s (each with a `SmoothProgress`) and a `<canvas>` boot behind a closed panel, and the focusable "Show more" `<Button>` (`:125`) lands inside an `aria-hidden="true"` subtree — this component is one of the sites that materialises the booked `aria-hidden-focus` axe violation the spec file `test.fixme`s. Not a new defect (the e2e file books it as vendored), but the *asymmetry* is: the same child has two different mount lifecycles depending on its host, and nothing in the file records that.

---

## §4 · INFO

- **I-1 · rAF fan-out.** Each `AnimatedDigit` owns a `SmoothProgress` driving its own `RAFPlayback` (`keyframes.js/dist/timeline-BjcmprQ6.js`, `drive` returns `!e.settled`), so loops do stop when settled — but a recompute starts 12–40 independent rAF callbacks in the same frame. Bounded and self-terminating; recorded for the F.W4 budget, not filed as a defect.
- **I-2 · Damped text vs undamped bar.** `:100` feeds the raw `comp.amplitude` to a damping composable while `:93` computes the bar width from the same raw value, and `:112` prints it raw again. During the ~10-frame settle the three disagree. Cosmetic.
- **I-3 · `snapThreshold` is absolute.** `useAnimatedNumber` resolves `snapThreshold = 0.05` in *value* units for `mode:"absolute"` (`glass-ui/dist/constants-BPOqYJAm.js` `{canvas:.002, dom:.05, domProgress:.5}`). The default is DOM-scale (px/%); most equation-route amplitudes are below it and snap on frame 1. The primitive is being used outside its calibrated domain — pass an explicit `damping`/`snapThreshold`, or accept that the damping is decorative here.
- **I-4 · `@reference "tailwindcss"` at `:145` is inert.** The scoped block contains no `@apply` and no theme function; the reference import is pure build cost.
- **I-5 · Corroborates intake R3-10.** `lane-fourier-r3-r6.md:84` names `CoefficientsSpectrum.vue:132` as one of the two dynamic `:is` families silently dropped between two Codex registries built from the same tree. **Live tree agrees exactly**: `:132` is `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. No contradiction; the row is confirmed at its cited line and carries to F.W4's exhaustiveness budget.
- **I-6 · Zero test coverage.** `grep -rn "coeff\|[Ss]pectrum" web/e2e/*.ts` returns two comment-only hits and no assertion. No unit test tree exists under `web/`. Every defect above is unguarded.

---

## §5 · Killed by their own falsifier (L-18, both directions)

- **K-1 · "`maxAmplitude` assumes an unsorted array — bars can exceed 100%."** **KILLED as a live bug.** All four producers sort descending: `epicycles.py:54`, `symbolic/integration.py:145`, `symbolic/spline.py:116`, `symbolic/identification.py:125`. Survives only as the *contract* defect C-8.
- **K-2 · "`--ease-standard` is undefined, so `:148/:151` are invalid declarations."** **KILLED.** Defined at `glass-ui/dist/styles/tokens/scheme-motion.css:216` (`--ease-standard: var(--motion-ease-standard)`) → `:211` (`cubic-bezier(0.4, 0, 0.2, 1)`), reachable via `style.css:3` `@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css`. Same for `text-admin-label` (`typography/semantic.css:213` `@utility`) and `.fira-code` (`typography/utilities.css:5`).
- **K-3 · "`EquationView` posts `BasisComponent[]` to `/api/equations/simplify`, which expects `FourierTermDTO[]`."** **KILLED.** `web/src/lib/equation/api.ts:38-44` re-maps `index→n` and `coefficient[0..1]→coefficient_re/_im` before the POST. The seam is correct.

---

## §6 · Superlatives (L-18)

- **S-1 · `AnimatedDigit` is consumed exactly to its published contract.** `:99-103` passes `value` / `format` / `class` — all three are declared (`glass-ui/dist/components/custom/animated-digit/AnimatedDigit.vue.d.ts:35-49`), the formatter signature `(v:number)=>string` matches, and `class` is a first-class prop merged by `cn()` at the primitive (`animated-digit.js` render). No wrapper, no shim, and the hand-wired `tabular-nums`/`ss01`/`lnum` register the primitive was promoted to absorb is *not* re-declared locally. This is the correct altitude for a glass-ui consumer.
- **S-2 · The `#graph` slot is the right decomposition.** `:68-70` hoists the single structural divergence between the two routes into a named slot, so the shared component carries **zero** route knowledge — no `route`/`variant`/`mode` prop, no `v-if` on a consumer flag. `CoefficientsPanel.vue:16-22` fills it; `EqCoefficientsPanel.vue:14` does not. Textbook.
- **S-3 · The local `ui/tooltip` shim is a thin API adapter, not a shadow.** `ui/tooltip/Tooltip.vue:2-12` documents the adaptation (single-component API + `#content` slot) and its body is 12 lines of pure forwarding onto `@mkbabb/glass-ui/tooltip`. This independently confirms `lane-frontend.md:368-371`'s "keep" verdict against the live tree. Note the shim is *correct*; C-3 and C-5 are caused by how this component uses it, not by the shim.
- **S-4 · CSS-first motion over the available JS engine.** With `keyframes.js` in the graph, the list transitions are still declarative CSS (`:147-163`) rather than a JS timeline. That is the right choice for enter/leave on a 40-row list; C-3 is a wiring defect, not a repudiation of the approach.
- **S-5 · The degenerate-denominator case is handled — once.** `:57` `if (!maxAmplitude.value) return "0%"` is a real guard for a real edge (all-zero spectrum). It is the evidence that makes C-13 an *asymmetry* rather than an oversight.
- **S-6 · Prop hygiene.** `withDefaults(defineProps<…>())` with a documented optional (`:27-28`), zero `any`, zero non-null assertions, both consumers supplying explicit `empty-text` copy rather than relying on the default. `vue-tsc -b` is wired into `build` (`web/package.json` `scripts.build`).

---

## §7 · Tally

| Class | Count | Ids |
|---|---:|---|
| BLOCKER | **1** | B-1 |
| MAJOR | **8** | C-1 … C-8 |
| MINOR | **11** | C-9 … C-19 |
| INFO | 6 | I-1 … I-6 |
| **Defects (BLOCKER+MAJOR+MINOR)** | **20** | |
| Killed by falsifier | 3 | K-1 … K-3 |
| Superlatives | **6** | S-1 … S-6 |

**Carries.** B-1 + C-6 → **F.W1** (atomic tri-package uplift; this file's 3-line import block is the minimal repro). C-1 + C-2 → **F.W2** (value.js consumption to spec — and the finding that F.W2's *empty* migration surface for this file is the wrong reading). C-3 + C-4 + C-5 → **F.W3** (the 35-callsite tooltip disposition, R3-7a). C-7 + C-8 → **F.W5** (the ADMISSION KEYSTONE contract; R6-8's rule needs a companion clause on structurally-typed operation payloads). I-5 → **F.W4** (dynamic `:is` exhaustiveness, R3-10).
