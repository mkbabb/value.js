served model id: `claude-opus-5[1m]`

# CHALLENGE — `FrequencyGraph.vue` · axis **C · CONSUMPTION**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FrequencyGraph.vue` (247 lines)
**Axis** how this component consumes value.js `0.13` · keyframes.js `4.3` · glass-ui `^4.0.0` · the fourier API's 45-operation surface; props/emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Every claim carries `file:line` provenance and its own falsifier. Claims that a falsifier killed are recorded as killed (§5) — they are not laundered into findings.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. It proved otherwise on five counts (§4) and failed on seventeen (§2, §3).

**Tally** — defects **17** (of which blockers **2**) · superlatives **5** · killed-by-falsifier **2**.
*Counting convention: `defects` is the total defect roster C-1…C-17 and INCLUDES the two blockers; `blockers` is reported separately.*

---

## §0 — The read (what this component actually is, on the consumption axis)

`FrequencyGraph` is a **pure presentational leaf**. Its entire import surface is:

```
FrequencyGraph.vue:2   import { ref, computed, watch, onMounted, onUnmounted } from "vue";
FrequencyGraph.vue:3   import type { BasisComponent } from "@/lib/types";
```

That is the whole of it. **Zero** `@mkbabb/value.js`. **Zero** `@mkbabb/keyframes.js`. **Zero** `@mkbabb/glass-ui`. **Zero** `@/lib/api`. It is, on paper, the cleanest consumer in the equation cluster — and that is exactly the problem: it consumes nothing because it **re-implements** what all three libraries already export, at a fidelity below what they ship.

The single call site is:

```
web/src/components/visualization/CoefficientsPanel.vue:17-22
    <FrequencyGraph
        v-if="components.length"
        :components="components"
        :max-bars="40"
        class="mb-2"
    />
```

Four of the component's six contract members (`activeIndices`, `logScale`, `@toggle-harmonic`, `@hover-harmonic`) are **never bound anywhere in the tree** (§2 C-3, grep receipt inline).

Data provenance, traced end-to-end:

```
api/routers/contours.py:35        @router.post("/{contourHash}/compute/epicycles")
api/services/computation.py:111-119   components = [{ "index": c.frequency, "coefficient": …, "amplitude": …, "phase": … } for c in chain.components]
src/fourier_analysis/epicycles.py:54  self.components = sorted(components, key=lambda c: c.amplitude, reverse=True)
web/src/lib/api.ts:330-343        export async function computeEpicycles(…)   ← the client leaf
web/src/stores/workspace.ts:299   epicycleData.value = markRaw(result)
web/src/components/visualization/CoefficientsPanel.vue:10   store.epicycleData?.components ?? []
      → FrequencyGraph props.components
```

---

## §1 — Corpus fold (hitherto; cited, not re-derived)

| Corpus row | What it establishes | How this challenge uses it |
|---|---|---|
| `formation/fourier/lane-frontend.md:59` · `:480` · `:492` · `:640`; `CENSUS-2026-08-03.md:37,38,109` | value.js pinned `^0.13.0` / installed `0.13.0` / producer at **4.0.0**; live value.js import surface = **5 statements / 4 files / 6 symbols, easing-only, all bare-root specifiers**; the `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` uplift is **one atomic transaction**. | **Verified independently** (`node -p require(…/package.json).version` → value.js `0.13.0`, glass-ui `4.0.0`, keyframes `4.3.0`). `FrequencyGraph` is **not** one of the 5 sites → superlative S-2, and simultaneously the root of defects C-6/C-7. |
| `lane-frontend.md:133` | `components/equation/FrequencyGraph.vue` — **247** lines, "Canvas2D spectrum bar graph". | Confirmed exactly (247 lines). Adopted as fact; not re-counted downstream. |
| `lane-frontend.md:562` | "`FrequencyGraph.vue:63` `getContext("2d")`; single deep watcher `:157` …; **No rAF**." | Adopted. C-1 and C-16 extend it: the census recorded the *absence of rAF*; this challenge establishes the *cost* (per-hover bitmap reallocation) and the *available cure already installed in `node_modules`*. |
| `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R6-8** (line 142, TRUE / ADOPT-AS-FACT + CARRY→F.W5) | An API-operation record that embeds derived **client back-references** cannot attribute a defect to one side of the seam; verified live at `web/src/lib/api.ts:420` ↔ `api/routers/visualizations.py:350`. | **Reachability adjudicated here: NOT reachable into `FrequencyGraph`.** The component imports no client leaf; its data arrives as props across a store boundary (`workspace.ts:299`). It therefore sits *behind* the non-isolable seam → superlative **S-1**. The corollary defect is C-8: the prop type is the seam, and it is underspecified. |
| **R5-7** (line 125) / **R6-5** (line 139) | The derivation model keyed template-loop evidence to *component callsites* and was blind to native `<li v-for>`; R6 cured it with a `NATIVE_TEMPLATE_LOOP` family (`PaperSidebar.vue:65,87,105`, live-corroborated). | **This challenge names a third blind class the R6 cure still misses** (C-17, INFO): `FrequencyGraph` renders its 40–60 repeated marks in an **imperative canvas loop** (`:75-112`) with **zero `v-for` of any kind**. Neither the component-callsite model (R5) nor the native-element cure (R6) can see it. F.W4's per-component D/L/C audit will score this component's repetition at 0. |
| fourier `docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:24` (**A8-09**) | `spectrumColor` exists in **4 divergent bodies**, `FrequencyGraph.vue:42-44` being copy (3). | Adopted as prior art. C-6 does **not** re-report the duplication; it reports the *consumption* fact the prior row stops short of: the canonical replacement is already an installed dependency's export. |
| fourier `2026-06-16-M-deep-audit/raw-findings.json:2664-2666` | glass-ui 4.0.0 ships `useCanvas2D` (park/suspend/PRM/dpr-ResizeObserver); "ConvergencePlot and FrequencyGraph are completely unmanaged". | Adopted, and **independently re-verified in the installed package** (`node_modules/@mkbabb/glass-ui/package.json` exports `"./canvas"`; `dist/composables/glass/canvas2d/useCanvas2D.d.ts` present with the full `Canvas2DHandle`). C-1 escalates it to BLOCKER on new evidence (per-hover bitmap realloc, §2 C-1). |
| fourier `2026-06-17-M-critique-audit` **E1-H4** | Spectral build-up named in the motion spec §4.1 gesture 2; no consumer wiring in `FrequencyGraph`/`CoefficientsSpectrum`. | Adopted verbatim as C-15 (MINOR). **Not re-derived** — cited. |
| fourier `2026-05-18-tranche-harden/h3-A-W4-W5-W6.md:85` | "`FrequencyGraph.vue` log-scale `log10(amplitude+1)` un-annotated, axis unlabeled — **CONFIRMED**." | **Now DISCHARGED** by W5.d at `:164-171` + `:219-235` → superlative **S-3**. But the discharge is only half-live (C-3): the `logScale` branch it repairs is unreachable in production. |

---

## §2 — BLOCKERS (2)

### C-1 · BLOCKER · Hand-rolled canvas lifecycle: the backing store is fully reallocated on every pointer sample, and never on resize or DPR change

**Provenance** `FrequencyGraph.vue:56-65` (inside `draw()`), invoked from `:139` (`onMouseMove`), `:147` (`onMouseLeave`), `:157` (watcher), `:159` (`onMounted`).

```
56    const dpr = window.devicePixelRatio || 1;
57    const w = canvasWidth.value;
58    canvas.width  = Math.round(w * dpr);
59    canvas.height = Math.round(HEIGHT * dpr);
60    canvas.style.width  = `${w}px`;
61    canvas.style.height = `${HEIGHT}px`;
63    const ctx = canvas.getContext("2d")!;
64    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
65    ctx.clearRect(0, 0, w, HEIGHT);
```

Two independent failures on one seam:

**(a) Reallocation on every hover transition.** Per HTML §4.12.5, assigning the `width`/`height` IDL attribute *sets bitmap dimensions*, which clears the bitmap and resets **all** context state — unconditionally, including when the assigned value is unchanged (`canvas.width = canvas.width` is the canonical clear idiom precisely because of this). `draw()` re-runs this on every `onMouseMove` that changes the hovered bar (`:134-140`). Sweeping a pointer across the 40 bars mounted by `CoefficientsPanel.vue:20` performs **40 full backing-store reallocations** of a `w×120×dpr²` buffer plus 40 full state resets — and the `clearRect` at `:65` is dead work in every one of them, since the width assignment already cleared. Nothing memoises the size; `canvasWidth` (`:31-34`) is a pure function of `displayComponents.length` and is constant across an entire hover sweep.

**(b) No resize/DPR seam at all.** `dpr` is sampled *inside* `draw()` and `draw()` is called only on mount, on prop change, and on hover-index change. There is **no** `ResizeObserver`, **no** `window.resize` listener, **no** `matchMedia("(resolution: …)")` listener anywhere in the file. Dragging the window from a 2× to a 1× display (or a browser zoom change, which mutates `devicePixelRatio`) leaves the canvas at the stale ratio until the user happens to hover a *different* bar.

**The consumption fact:** `@mkbabb/glass-ui@4.0.0` — already installed, already imported 100+ times across this repo — exports `"./canvas"` → `useCanvas2D` (`node_modules/@mkbabb/glass-ui/dist/composables/glass/canvas2d/useCanvas2D.d.ts`), whose documented contract is *"`ctx` is pre-transformed for CSS px (the dpr scale is applied by the substrate's resize)"*, with `arm/suspend/resume/wake/dispose`, a `tab-hidden | off-screen | manual` suspend set, `respectReducedMotion` live-monitored via `matchMedia` `change`, and an IntersectionObserver offscreen seam. Every one of (a) and (b) is inside that substrate's stated scope. The component is not blocked on a library gap; it is blocked on an import.

**Falsifier** — *this finding dies if* any of: (i) a `ResizeObserver`/`resize`/`matchMedia` registration exists in the file (grep for `ResizeObserver|addEventListener|matchMedia` over `FrequencyGraph.vue` → **0 hits**); (ii) `draw()` guards the width assignment (`if (canvas.width !== …)` — absent at `:58`); (iii) `useCanvas2D` is absent from the installed glass-ui (it is present: `exports["./canvas"]`, and `dist/useCanvas2D-ClrQuZtp.js` is a real chunk); (iv) the HTML spec exempts same-value width assignment from bitmap reset (it does not — "set bitmap dimensions" is unconditional on the setter path).

**Why BLOCKER** user-visible (stale-DPR blur is a rendering defect, not a nicety), on the interaction hot path, and it is the precise adoption the atomic tri-package uplift (`lane-frontend.md:492`, `:636`) exists to unlock. Migrating this file forward without wiring `useCanvas2D` carries the defect into `glass-ui@7`.

---

### C-2 · BLOCKER · The hand-rolled tooltip is an absolutely-positioned child of an `overflow-x:auto; overflow-y:hidden` box — it is clipped on both axes, and the project's own glass-ui `Tooltip` shim (used by the sibling rendered directly beneath it) is not adopted

**Provenance**
- Clipping ancestor: `FrequencyGraph.vue:172-176` — `<div ref="scrollRef" class="overflow-x-auto overflow-y-hidden scrollbar-thin" :style="{ height: '120px' }">`
- Clipped child: `FrequencyGraph.vue:185-191` — `class="absolute z-[var(--z-controls)] … -translate-x-1/2"`, `:style="{ left: `${tooltipPos.x}px`, top: `${Math.max(tooltipPos.y - 56, 4)}px` }"`
- Positioning containing block: `FrequencyGraph.vue:236-239` — `.scrollbar-thin { position: relative; }`
- The unadopted alternative: `web/src/components/ui/tooltip/Tooltip.vue` — wraps `Tooltip`/`TooltipTrigger`/`TooltipContent` from `@mkbabb/glass-ui/tooltip` with `:side-offset="6"` and **`:collision-padding="8"`**.
- The sibling that *does* adopt it: `web/src/components/shared/CoefficientsSpectrum.vue:21` (`import { Tooltip } from "@/components/ui/tooltip"`), used at `:80-121` for the identical payload (n / Amplitude / Phase).

**Horizontal clip — arithmetic, deterministic.** The first bar sits at `x = BAR_GAP + 4 = 7` (`:73`), centre `7 + 14/2 = 14`. `tooltipPos.x` is measured from the scroll container's left edge (`:137-138`), so for the first bar it is ≈ 11–21 px. `-translate-x-1/2` then places the tooltip's left edge at `x − width/2`. The tooltip's widest row is `Amplitude` + a 6-significant-figure `toFixed(4)` numeral in a `grid-cols-[auto_1fr] gap-x-2` at `text-xs` (`:200-202`) — a floor of ~110 px content + `px-2` ×2 + `border-[1.5px]` ×2 ⇒ **≥ 130 px**, half ⇒ **≥ 65 px**. Left edge ⇒ **≈ −44 px**. Negative-offset content in an `overflow-x: auto` box is unreachable (scrollLeft is clamped at 0) — it is simply **cut off**. This reproduces for at least the first four bars (`x = 14, 31, 48, 65`).

**Vertical clip — mechanism CONFIRMED, exact threshold UNPROVEN-NEEDS-LIVE (SS-13).** The container is exactly `120px` (`:175`) with `overflow-y: hidden`. Tooltip `top = max(y − 56, 4)`, `y = e.clientY − rect.top ∈ [0, 120]`. The tooltip body is a header row plus 2 grid rows (3 rows when `logScale`, `:203-206`) at `text-xs`/`py-1.5`, i.e. ~58 px minimum. For `y ≳ 62` the tooltip's bottom exceeds 120 and is clipped by the `overflow-y: hidden` ancestor. The *mechanism* (an `overflow-y:hidden` ancestor clipping an `absolute` descendant — the ancestor is the containing block, so no escape) is CONFIRMED from source; the exact `y` threshold depends on rendered line-box metrics and is marked UNPROVEN-NEEDS-LIVE.

**The consumption fact:** the hand-rolled placement is `Math.max(tooltipPos.y - 56, 4)` — a single hardcoded 56 px offset and a 4 px floor. That is a one-axis, one-boundary clamp. `@mkbabb/glass-ui/tooltip` via the project's own shim supplies floating-ui-backed side/align resolution with `collision-padding`, i.e. exactly the boundary logic being hand-approximated. The adoption cost is negative (the hand-rolled `<div>` at `:185-210`, the `tooltipPos` ref at `:23`, and the position arithmetic at `:137-138` all delete). The sibling component rendered *directly below this one inside the same `ConfiguratorLayer`* already does it.

**Falsifier** — *this finding dies if* (i) the tooltip is portalled or `position: fixed` (it is neither — `class="absolute"` at `:187`, and `.scrollbar-thin{position:relative}` at `:238` makes the scroll box its containing block); (ii) the container does not clip (`overflow-x-auto overflow-y-hidden` at `:174` — both axes clip); (iii) `@mkbabb/glass-ui/tooltip` is unavailable (it is an export key in the installed 4.0.0 package and is imported at 2 sites); (iv) the tooltip is narrower than 2×`tooltipPos.x` at the first bar — falsifiable live by measuring the rendered width; the source floor of ~130 px makes this implausible but I mark the width estimate as source-derived, not measured.

**Why BLOCKER** it is a user-visible rendering failure on the component's *only* interactive affordance, at the *first* bars — i.e. the highest-amplitude, most-consulted harmonics, because the array is amplitude-descending (C-9). And it is 100% a non-adoption cost with an already-installed cure.

---

## §3 — Defects (15)

### C-3 · MAJOR · The interactive contract is dead: 2 emits + 2 props, zero bindings tree-wide, zero tests

`FrequencyGraph.vue:5-18` declares `activeIndices?: Set<number>`, `logScale?: boolean`, `"toggle-harmonic": [index: number]`, `"hover-harmonic": [index: number | null]`.

**Grep receipt** (`web/src/`, all extensions):

```
grep -rn "toggle-harmonic|hover-harmonic|toggleHarmonic|hoverHarmonic|active-indices|activeIndices|log-scale|logScale" src/
  → 14 hits, ALL 14 inside FrequencyGraph.vue itself (lines 7,9,12,16,17,39,48,77,136,146,153,157,168,169,203)
```

Zero external bindings. The sole call site (`CoefficientsPanel.vue:17-22`) passes `components`, `max-bars`, `class` and nothing else. Consequences, each independently checkable:

- `props.activeIndices` is permanently `undefined` ⇒ `:77` `isActive` is permanently `true` ⇒ the dim-inactive rendering path (`ctx.globalAlpha = … : 0.25` at `:86`, `: 0.2` at `:107`) is **unreachable code in production**.
- `props.logScale` is permanently `false` ⇒ the log branches at `:39`, `:48`, `:169`, `:203-206` are **unreachable**, including the W5.d axis annotation's log form — the very repair that discharged `h3-A-W4-W5-W6.md:85` (see S-3: the fix is real, but half of it can never render).
- Both emits fire into a void (`:136`, `:146`, `:153`). `onClick` (`:151-155`) is a pure no-op: it computes `displayComponents.value[hoveredBar.value].index` and emits it to nobody, while `class="cursor-pointer"` (`:179`) advertises an affordance that does nothing.

**Test coverage: zero.** `web/e2e/` contains 8 specs; `grep -rn "Coefficients|freq-graph|spectrum" e2e/*.spec.ts` → **0 hits**. The four `canvas`-touching specs all use `page.locator("canvas").first()`, which resolves to `BasisCanvas`, not this one. And the sole call site is inside `<ConfiguratorLayer … :default-open="false">` (`CoefficientsPanel.vue:14`), i.e. behind a collapsed accordion — so no incidental coverage either.

**Falsifier** — dies if any `.vue`/`.ts` file outside `FrequencyGraph.vue` binds any of the four members (grep above: none), or if any e2e spec asserts on the coefficients layer (none). Both are single-command falsifiable.

---

### C-4 · MAJOR · `cursor-pointer` on a canvas with no `tabindex`, no `role`, no `aria-*`, and no key handler: the `toggle-harmonic` contract has no non-pointer input path

`FrequencyGraph.vue:177-183`:

```
<canvas ref="canvasRef" class="block cursor-pointer text-muted-foreground"
        @mousemove="onMouseMove" @mouseleave="onMouseLeave" @click="onClick" />
```

No `tabindex`, no `role`, no `aria-label`, no fallback content between the canvas tags, no `@keydown`, no `@focus`. `onClick` (`:151`) is guarded on `hoveredBar.value !== null`, and `hoveredBar` is set **only** by `onMouseMove` (`:135`) — so even a synthesised click that arrives without a preceding `mousemove` emits nothing. The 40 bars are invisible to assistive technology: a canvas with no fallback content and no ARIA exposes no accessible name, role, or value for any of them.

Contrast the sibling handling the identical data one level down: `CoefficientsSpectrum.vue:80-121` routes every row through the glass-ui `Tooltip` (focusable trigger semantics) and `:124-135` through the glass-ui `Button` — a keyboard- and SR-reachable surface built from the same installed package.

**Falsifier** — dies if `tabindex|role=|aria-|keydown|keyup` appears anywhere in the file (grep → 0 hits), or if `<canvas>` carries fallback children (`:177-183` is self-closing).

---

### C-5 · MAJOR · `getComputedStyle()` is called inside the per-bar loop — one forced style recalculation per bar, per draw, per pointer sample

`FrequencyGraph.vue:108`, inside the `for (let i = 0; i < n; i++)` at `:75`:

```
108   ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("color") || "#888";
109   ctx.font = "9px 'Fira Code', monospace";
```

Both are **loop-invariant** — `canvas` does not change within the loop and the font string is a literal. `getComputedStyle().getPropertyValue()` flushes pending style on the element. With `max-bars="40"` (`CoefficientsPanel.vue:20`), a single `draw()` performs 40 style resolutions; chained to C-1(a), a pointer sweep across the graph performs **40 draws × 40 resolutions = 1 600** style resolutions plus 40 bitmap reallocations. Hoisting both above `:75` is a two-line change with identical output.

**Falsifier** — dies if `canvas`'s computed `color` can change *within* one loop iteration (it cannot; nothing in the loop body mutates the element or the document), or if the loop bound is 1 (it is `displayComponents.length`, 40 at the call site).

---

### C-6 · MAJOR · `spectrumColor` is a fourth private copy of a primitive that value.js `0.13` — an already-installed direct dependency, already imported by two sibling files in this very directory — exports outright

`FrequencyGraph.vue:42-45`:

```
42   function spectrumColor(i: number, total: number): string {
43       const hue = (1 - i / Math.max(total - 1, 1)) * 300;
44       return `hsl(${hue}, 85%, 55%)`;
45   }
```

A8-09 (`2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:24`) already established the four-body duplication and I do not re-derive it. The **consumption** fact it stops short of:

`node_modules/@mkbabb/value.js/dist/index.d.ts` (installed 0.13.0) exports, at the bare root the repo already uses:
- `sampleColorRamp`, `mixColorsN` (`./units/color/mix`) — the n-stop ramp sampler;
- `color2`, `mixColors`, `interpolateHue`, `gamutMap` (`./units/color/dispatch`);
- `Color`, `OKLCHColor`, `OKLABColor` and 13 further space classes (`./units/color`);
- `computeSafeAccent`, `getOklchLightness`, `needsContrastAdjustment` (`./units/color/contrast`);
- `deltaEOK` (`./units/color/gamut`).

And in the same directory, two siblings already import from that specifier: `ConvergencePlot.vue:5` (`import { easeInOutSine } from "@mkbabb/value.js"`) and `lib/harmonics.ts:5` (same). So the module graph, the pin, and the idiom are all in place; only the import is missing. A sRGB-HSL linear hue ramp is also non-perceptual — equal hue steps ≠ equal perceived distance — which is the substantive reason the M-critique proposed `sampleColorRamp` over the OKLCH ramp (`2026-06-17-M-critique-audit/raw-findings.json:3093`).

**Falsifier** — dies if `sampleColorRamp`/`mixColorsN` are absent from installed 0.13.0 (they are exported at `index.d.ts`, line `export { mixColorsN, sampleColorRamp } from './units/color/mix';`), or if `@mkbabb/value.js` is not a direct dependency (`web/package.json` → `"@mkbabb/value.js": "^0.13.0"`).

---

### C-7 · MAJOR · `barFraction` re-implements `scale` + `clamp` from value.js's math surface, and re-implements only *half* of `clamp`

`FrequencyGraph.vue:47-50`:

```
47   function barFraction(amplitude: number): number {
48       const val = props.logScale ? Math.log10(amplitude + 1) : amplitude;
49       return Math.max(val / maxAmplitude.value, 0.008);
50   }
```

This is a normalise-then-floor. value.js 0.13 exports `clamp`, `scale`, `lerp`, `logerp` from `./math` at the bare root (`index.d.ts`: `export { clamp, scale, lerp, lerpArray, logerp, … } from './math';`). The re-implementation is not merely redundant — it is **lossy**: `Math.max(x, 0.008)` clamps the lower bound only. There is no upper bound. A `frac > 1` produces `barH > plotH` and a bar drawn above `pad.top`, outside the plot area (`:82-83`). `clamp(val / max, 0.008, 1)` is the one-call correct form. The missing upper bound is live-reachable via C-9.

**Falsifier** — dies if `clamp`/`scale` are absent from installed 0.13.0 (both are exported), or if an upper bound exists elsewhere on the path (`:81-83` and `:47-50` are the whole of it — no `Math.min`, no clamp, anywhere in the file).

---

### C-8 · MAJOR · The prop type `BasisComponent[]` is the integration seam and it declares none of the three wire invariants the component silently depends on

`web/src/lib/types.ts:1-6`:

```
1  export interface BasisComponent {
2      index: number;
3      coefficient: [number, number]; // [re, im]
4      amplitude: number;
5      phase: number;
6  }
```

`FrequencyGraph` depends on three properties of this array that the type does not express and no runtime check enforces:

1. **`components[0].amplitude` is the maximum** — `:38`. Supplied by `src/fourier_analysis/epicycles.py:54` (`sorted(…, key=lambda c: c.amplitude, reverse=True)`), preserved by `api/services/computation.py:118`. Undeclared.
2. **`index` is the harmonic *frequency* n, not an array ordinal, and may be negative** — `api/services/computation.py:112` `"index": c.frequency`. The field name `index` actively invites the opposite reading; the component's own local `i` (`:75`) is the array ordinal, and the two live one line apart at `:77` (`props.activeIndices.has(comp.index)`) and `:78` (`hoveredBar.value === i`). Undeclared.
3. **`amplitude ≥ 0`** — required for `Math.log10(amplitude + 1)` at `:48` to be real. Supplied by `abs(coeff)` upstream (`bases_fitting.py:53`, `integration.py:121`). Undeclared.

This is the shape of the R6-8 lesson applied one layer out: R6-8 (intake line 142) established that *operation identity must stay independent of client identity*. Here the failure is dual — the client-side **type** carries none of the operation's guarantees, so the invariant lives only in Python and in this file's arithmetic, with no artefact joining them. The census's own F.W8/FN-6 conformance-fixture ask is exactly the missing artefact.

**Falsifier** — dies if `types.ts:1-6` documents ordering/sign/domain (it carries one comment, `// [re, im]`), or if a runtime guard exists (none: `:36-40` guards only `length`).

---

### C-9 · MAJOR · The invariant of C-8 is already contradicted inside this codebase — `truncate_by_budget` re-sorts by index "for display"

`src/fourier_analysis/symbolic/simplification.py:15-32`:

```
15  def truncate_by_budget(terms, budget):
        …
25      non_dc.sort(key=lambda t: t.amplitude, reverse=True)
28      kept = dc + non_dc[:remaining]
29      # Re-sort by index for display
30      kept.sort(key=lambda t: (abs(t.n), -t.n))
31      return kept
```

So the same repository holds two mutually exclusive conventions for "the order a coefficient list is displayed in": amplitude-descending (the epicycle path, which feeds this component) and index-ordered (the symbolic display path). Today the equation route's `coefficients` DTO escapes this — `integration.py:145`, `identification.py:125`, `spline.py:116` all sort amplitude-descending and `truncate_by_budget` feeds only LaTeX rendering — so `EquationView.vue:59-67`'s mapping is currently safe. **But `CoefficientsSpectrum.vue:8-9` explicitly reserves the `#graph` slot for exactly this component on exactly that route** ("the visualization route passes `<FrequencyGraph>`; the equation route passes nothing"). Wiring the reserved seam to a budget-truncated set silently breaks `maxAmplitude` (`:38`) — and because `barFraction` has no upper clamp (C-7), the failure mode is bars drawn *outside* the plot rather than an exception.

**Falsifier** — dies if `truncate_by_budget`'s output can never reach a `BasisComponent[]` (it cannot *today* — verified: `equations.py:19-26` `_term_to_dto` is fed the pre-truncation term list; this is a latent-seam finding, and I mark the "today it is safe" half explicitly rather than overstating it), or if `simplification.py:30` does not re-sort (it does, with the comment naming display intent).

---

### C-10 · MAJOR · The x-axis is amplitude **rank**; the tick labels are harmonic **index**; the component is named `FrequencyGraph` and its axis label reads `|c_n|`

Four source facts, jointly:

- `api/services/computation.py:118` — components emitted in `chain.components` order;
- `src/fourier_analysis/epicycles.py:54` — that order is **amplitude-descending**;
- `FrequencyGraph.vue:80` — `const x = startX + i * (BAR_W + BAR_GAP);` — bar position is driven by the **array ordinal `i`**;
- `FrequencyGraph.vue:111` — `ctx.fillText(String(comp.index), …)` — the tick under that bar is the **harmonic n**.

The rendered x-sequence of tick labels is therefore neither monotonic nor contiguous — for a typical contour it reads `0, 1, −1, 2, −2, 3, …` interleaved by whatever the amplitude ranking happens to be, with arbitrary gaps once truncated (C-11). The W5.d axis annotation at `:168-171` names the *y* transform precisely and correctly, and says nothing about x; the label `|c_n|` implies an n-indexed domain that the plot does not have. What is drawn is a **Pareto chart of coefficient magnitude with n as an annotation** — which is a defensible and arguably more useful instrument, but it is not what the name, the axis label, or the tick labels claim.

**Falsifier** — dies if the backend emits index-ordered components (`epicycles.py:54` sorts by amplitude, reverse) or if `x` is derived from `comp.index` (`:80` uses `i`). Both single-line checks. Note this is *not* an argument that the sort is wrong — top-40-by-amplitude is the right truncation (C-11); the defect is the unlabelled mismatch between the ordering and the annotation.

---

### C-11 · MINOR · Silent top-N truncation, and the counter rendered beneath it reports a different denominator

`FrequencyGraph.vue:29` — `props.components.slice(0, props.maxBars)`, `maxBars = 40` at the call site. `api/services/computation.py` defaults `n_harmonics: int = 200` ⇒ a full epicycle set is commonly ~200–401 components. The graph therefore shows ~10–20% of the spectrum with **no indication of its own** — no "40 / 401", no ellipsis, no fade.

Worse at the seam: the sibling *directly beneath it in the same `ConfiguratorLayer`* renders `{{ topComponents.length }} / {{ totalComponents }}` (`CoefficientsSpectrum.vue:74`) — a counter over **its own** 12-or-40 slice. Inside one panel the user sees 40 bars above a caption reading `12 / 401`. Three different denominators, one panel, no reconciliation.

**Falsifier** — dies if `FrequencyGraph` renders any count (grep the template `:162-213` — it renders the axis label, the canvas, and the tooltip; no count), or if `maxBars ≥ typical component count` (`maxBars=40` vs `n_harmonics` default 200).

---

### C-12 · MINOR · `maxAmplitude === 0` yields `NaN` bar heights and a silently blank chart

`:36-40` guards only `length`, not magnitude. If every amplitude is 0, `maxAmplitude` is 0 (both branches: `log10(0+1) = 0`). Then `:49` evaluates `Math.max(0 / 0, 0.008)` = `Math.max(NaN, 0.008)` = **`NaN`** (`Math.max` propagates NaN). `barH` and `y` become NaN (`:82-83`); canvas path commands with non-finite arguments are silently ignored per spec, so **no bars paint** — while the index labels at `:111` still paint (they use finite coordinates). Result: a row of tick labels over empty space, no error, no empty state. The call-site guard `v-if="components.length"` (`CoefficientsPanel.vue:18`) does not cover this.

**Reachability, stated honestly:** requires an all-zero coefficient set — a degenerate contour (single point / zero-length path after `resample_arc_length`). Low probability, not zero, and it is a one-line guard (`if (!max) return 1`).

**Falsifier** — dies if `Math.max(NaN, x)` returned `x` (ECMA-262 §21.3.2.24: if any operand is NaN, return NaN), or if a magnitude guard exists (`:36-40` guards `.length` only).

---

### C-13 · MINOR · 9px labels rendered into 14px bars: negative and 3-digit harmonic indices overflow and collide

`:25-26` `BAR_W = 14`, `BAR_GAP = 3` ⇒ pitch **17 px**. `:109` `ctx.font = "9px 'Fira Code', monospace"` ⇒ advance ≈ 0.6 em ≈ **5.4 px/char**. `:111` prints `String(comp.index)`, and `index` is the signed frequency n (`computation.py:112`), so labels like `-127` are 4 chars ≈ **21.6 px** — 27% wider than the pitch, centred, therefore overlapping both neighbours. `100`-style 3-char labels are ≈16.2 px, at the pitch limit with zero gutter. With `n_harmonics` defaulting to 200, |n| ≥ 100 labels are routine.

Contrast the sibling's handling of the same field: `CoefficientsSpectrum.vue:86-88` allocates `w-8` (32 px) and renders an explicit sign (`{{ comp.index >= 0 ? "+" : "" }}{{ comp.index }}`) — 32 px for a value this component gives 14.

**Falsifier** — dies if `index` is always small and non-negative (`computation.py:112` `"index": c.frequency`, and `epicycles.py` builds ± harmonics), or if the labels are rotated/thinned (`:110` sets `textAlign = "center"` only; there is no rotation, no skip-nth, no measureText).

---

### C-14 · MINOR · `hitTest` ignores the y-coordinate entirely: hovering empty space above a 1-pixel bar reports a hit

`:116-130` tests only `mx >= x && mx <= x + BAR_W`. The container is 120 px tall (`:175`); a low-amplitude bar may occupy 1 px of it (the `0.008` floor at `:49` × `plotH` 96 ≈ **0.77 px**). Hovering anywhere in the remaining ~119 px of that column selects that bar, glows it (`:88-91`), emits `hover-harmonic`, and pops the tooltip. The hover target is a 14×120 column, not a bar.

**Falsifier** — dies if any `clientY`/`rect.top` comparison exists in `hitTest` (it takes only `clientX`, `:116`), or if bar heights always fill the plot (the floor at `:49` exists precisely because they do not).

---

### C-15 · MINOR · Zero keyframes.js adoption — bars paint at full height instantly

`@mkbabb/keyframes.js@4.3.0` is a direct dependency (`package.json`), with an established lazy-boundary idiom already in the repo (`composables/useFourierMorph.ts:14` `import { loadAnimationEngine, type Animation } from "@mkbabb/keyframes.js"`). `FrequencyGraph` imports none of it; `draw()` (`:75-112`) paints every bar at final `barH` in one pass, every pass.

**This is a cited prior finding, not a new one** — `2026-06-17-M-critique-audit` **E1-H4** and `raw-findings.json:3803-3809` specify the amplitude-rank build-up (≤40 ms/bar, ≤600 ms total, PRM-collapsing) and name `FrequencyGraph.vue:75-114` as the missing consumer. I record it here only to close the consumption ledger on the third package.

**Falsifier** — dies if any keyframes/animation import or rAF loop exists in the file (grep `keyframes|requestAnimationFrame|Animation` → 0 hits; corroborated by `lane-frontend.md:562` "No rAF").

---

### C-16 · MINOR · The `{deep:true}` watcher traverses the *whole* component array, not the 40 it draws — and `draw()` is invoked directly from event handlers, unbatched

`:157`:

```
watch(() => [props.components, props.logScale, props.maxBars, props.activeIndices], () => draw(), { deep: true });
```

Two costs. (a) `deep: true` makes Vue's `traverse` walk every element of `props.components` and all four fields of each — the **full** ~200–401-element array, not `displayComponents`'s 40 — on every invalidation, purely to establish dependencies on plain objects that are `markRaw`-sourced (`workspace.ts:299`) and reactive on none of it. The dependency that actually matters is the identity of `props.components`, which a shallow watch already captures. (b) `draw()` is additionally called synchronously from `onMouseMove` (`:139`) and `onMouseLeave` (`:147`), so a fast pointer sweep can drive multiple full redraws inside a single frame with no rAF coalescing.

**Falsifier** — dies if `deep: true` is required for correctness here — it is not: `props.components` is replaced wholesale (`workspace.ts:299` assigns a new `markRaw(result)`), never mutated in place, so identity comparison suffices. It *would* be required for in-place mutation of `activeIndices` (a `Set`) — but `activeIndices` is never bound (C-3), so that justification is currently vacuous.

---

### C-17 · INFO · Vestigial lifecycle: `onUnmounted` is imported and never used; `getContext("2d")!` asserts away a nullable; the canvas repetition is invisible to the R5-7/R6-5 derivation model

Three small consumption facts, grouped:

- `:2` imports `onUnmounted`; the file's only lifecycle hook is `onMounted` at `:159`. `tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`, so `vue-tsc -b` does not catch it. Vite tree-shakes it, so the cost is signal, not bytes: the import records an intended teardown that was never wired — precisely the teardown `useCanvas2D`'s `dispose()` would own (C-1).
- `:63` `canvas.getContext("2d")!` — a non-null assertion on a genuinely nullable return, re-acquired on **every** draw rather than once at setup. Under `strict: true` the `!` is the only thing suppressing the check; a null return throws a `TypeError` on `:64` with no diagnostic.
- **Derivation-model blind spot (the R5-7/R6-5 extension).** `grep "v-for" FrequencyGraph.vue` → **0 hits**. Its 40 repeated marks are produced by the imperative `for` at `:75`. R5's model keyed loop evidence to component callsites and was blind to native `<li v-for>`; R6-5 cured that with a `NATIVE_TEMPLATE_LOOP` family. **Neither model can see a canvas loop.** `lane-frontend.md:28` counts 3 `<canvas>` elements repo-wide; each is a repetition surface with zero template evidence. F.W4's per-component D/L/C audit will score this component's repetition at zero unless a canvas-loop family is added — the same class of defect R5-7 was, one substrate over.

**Falsifier** — dies if `onUnmounted` is referenced anywhere in the file (it is not), if `getContext` is non-nullable (its TS signature returns `RenderingContext | null`), or if the file contains any `v-for` (it does not).

---

## §4 — Superlatives (5) — L-18 runs both ways

### S-1 · The component is structurally immune to the R6-8 seam pathology

R6-8 (intake line 142, TRUE/ADOPT-AS-FACT) established that an operation record embedding derived client back-references (`operation:PATCH:/api/visualizations/{slug}` carrying `"clients": ["client:updateVisualization"]`) makes the two leaves non-isolable — a client-side byte edit mutates both, and defect attribution across the seam becomes impossible.

`FrequencyGraph` **cannot** participate. Its import surface is `vue` + a type-only `@/lib/types` (`:2-3`); it holds no client leaf, no fetch, no store handle. Its data crosses two decoupling boundaries before it arrives — the client leaf (`api.ts:330`), then the Pinia store (`workspace.ts:299`), then a computed in the parent (`CoefficientsPanel.vue:10`). Whatever the megatranche does about the operation↔client join, this component's provenance is a single typed prop.

**Falsifier** — dies the instant any `@/lib/api`, `@/stores/*`, `fetch`, or `axios` import appears in the file. Grep: **0 hits**. This is a real architectural property, not an accident of size — the parent deliberately holds the store handle (`CoefficientsPanel.vue:8-10`) and passes plain data down.

### S-2 · Zero cost on the F.W2 bare-specifier migration surface

`CENSUS-2026-08-03.md:38` records the value.js live import surface as *"5 import statements / 4 files / 6 symbols, easing-only … all bare-root specifiers that 4.0.0 no longer exports — latent, not live"*. The four files are `lib/easings.ts` (×2), `ConvergencePlot.vue:5`, `composables/useCurveTransition.ts:8`, `equation/lib/harmonics.ts:5`. `FrequencyGraph.vue` is **not among them** and contributes **zero** rewrite work to the `value 0.13 → 4.0` leg of the atomic tri-package uplift (`lane-frontend.md:492`).

**Falsifier** — dies if the file imports `@mkbabb/value.js` (grep: 0 hits) or appears in the census's 5-site enumeration (it does not). *Honest tempering:* this superlative and defects C-6/C-7 are the same fact seen from two sides — it is free to migrate **because** it adopted nothing. The correct reading is that the file is a cheap *target* for the uplift, not a clean *consumer*.

### S-3 · The W5.d axis annotation is genuinely well-made consumption craft, and it discharges a named prior finding at its cited lines

`h3-A-W4-W5-W6.md:85` confirmed: *"`FrequencyGraph.vue` log-scale `log10(amplitude+1)` un-annotated, axis unlabeled … The only occurrence of the word 'Amplitude' in the file is inside the tooltip popover."* That finding is **discharged** at `:164-171` and `:219-235`:

- the transform is named in the DOM, mode-switched (`|c_n|` vs `log₁₀(|c_n| + 1)`), with real `<sub>` markup (`:169-170`, styled at `:232-235`);
- the `title` (`:168`) explains *why* the `+1` shift exists ("admits zero amplitudes") rather than merely asserting it — the honest form;
- the register is deliberate and documented in the CSS comment (`:220-222`): EB Garamond / Computer Modern Serif italic to match the paper, `user-select: none`, `cursor: help`, `opacity: 0.75`.

This is the standard the rest of the canvas surface does not meet (cf. `raw-findings.json:2452` on hardcoded `ctx.font` strings) and it is the best-argued twelve lines in the file.

**Falsifier** — dies if the annotation is absent or mode-blind (`:168-171` is mode-switched on `logScale`). *Tempered by C-3:* the `logScale` branch is unreachable in production, so exactly half of this good work can never render.

### S-4 · Design-token consumption is correct — a hypothesis I raised against it was killed by its own falsifier

I opened a claim that `color: var(--muted-foreground)` (`:226`) and `background: var(--border)` (`:244`) would be invalid declarations, on the theory that `colors.ts:39-40` documents a *bare HSL triplet* convention ("`6 72% 49%` (Tailwind v4 convention)"). **The falsifier killed it.** Resolved in the installed glass-ui 4.0.0:

- `dist/styles/tokens/color-radius.css:95` — `--border: var(--neutral-4);` (a color value, not a triplet);
- `dist/styles/glass/ladder.css:150,203` — `--muted-foreground` is assigned color values;
- `dist/styles/tokens/scheme-motion.css:336` — `--z-controls: 20;` ⇒ `z-[var(--z-controls)]` (`:187`) resolves;
- `dist/styles/typography/semantic.css:213` — `@utility text-admin-label` exists ⇒ `:200` resolves;
- `dist/styles/typography/utilities.css:69` — `@utility fira-code` exists ⇒ `:202,205,208` resolve.

Every token this component reaches for is real and glass-ui-owned. Better: the canvas label colour is **read from the token-driven computed style** (`:108` reading the `text-muted-foreground` class applied at `:179`) rather than hardcoded — the one place in fourier's canvas-drawing surface that is token-linked, against `raw-findings.json:2452`'s catalogue of hardcoded `ctx` strings. (The *mechanism* of that read is still C-5; the *intent* is right.)

**Falsifier** — dies if any of the five tokens is undefined in installed glass-ui 4.0.0; all five were located by grep at the lines cited.

### S-5 · The call-site seam is well-formed, and the `#graph` slot is an honest divergence seam

`CoefficientsPanel.vue:18` gates the mount on `v-if="components.length"`, so `onMounted(draw)` (`:159`) can never run against an empty set — the `:36-40` length guard is belt-and-braces, not the load-bearing check. And the hosting pattern is the *right* refactor: `CoefficientsSpectrum.vue:2-16` documents that D7/D11 were ~95% duplicates and that the sole structural divergence — this component — was hoisted to a named `#graph` slot rather than duplicated or `v-if`-branched. The seam names its own asymmetry in prose at `:68-69`. That is how a divergence should be carried.

**Falsifier** — dies if the mount is ungated (`CoefficientsPanel.vue:18` gates it) or if `EqCoefficientsPanel` duplicates the graph rather than omitting it (`EqCoefficientsPanel.vue:14` passes no `#graph` slot).

---

## §5 — Claims raised and KILLED by their own falsifier (recorded, not counted)

| # | Claim raised | Falsifier that killed it |
|---|---|---|
| K-1 | `color: var(--muted-foreground)` / `background: var(--border)` are invalid because the repo's own `colors.ts:39-40` documents a bare-HSL-triplet token convention. | Installed glass-ui 4.0.0 defines both as color values (`tokens/color-radius.css:95`, `glass/ladder.css:150,203`). The bare-triplet parser in `colors.ts` is defensive breadth, not the live convention. **Killed → became S-4.** |
| K-2 | Tapping a bar on a touch device emits nothing, because `onClick` requires a prior `mousemove` to set `hoveredBar`. | Mobile browsers synthesise `mousemove` before `click` on tap for clickable targets, so the guard may well be satisfied. Not statically decidable. **Withdrawn as a touch claim; the provable residue — no keyboard/AT path at all — is C-4.** Any live-device claim here would be UNPROVEN-NEEDS-LIVE (SS-13). |

---

## §6 — Verdict

The component was assumed defective; it is. But not in the way its size suggests. `FrequencyGraph` is a **247-line re-implementation of primitives that are already installed in `node_modules`**: the canvas lifecycle (`@mkbabb/glass-ui/canvas` → `useCanvas2D`), the tooltip (`@mkbabb/glass-ui/tooltip`, via the repo's *own* shim, used by the sibling rendered one element below), the colour ramp (`sampleColorRamp` / `mixColorsN`, `@mkbabb/value.js`), and the normalise-and-clamp (`scale` / `clamp`, same package). Every one of those re-implementations is measurably worse than the export it replaces, and two of them (C-1, C-2) produce user-visible rendering defects.

Meanwhile **40% of the file — the dim-inactive path, the whole log-scale mode including the W5.d repair's log branch, and both emits — is unreachable code** (C-3), unbound at the sole call site, uncovered by any of the 8 e2e specs, and sitting behind a `:default-open="false"` accordion.

The three-package consumption ledger closes at: **value.js 0** imports (4 exports duplicated in-file), **keyframes.js 0** imports (the build-up gesture named in the motion spec, unbuilt), **glass-ui 0** imports (3 primitives duplicated in-file, 5 tokens consumed correctly). The single genuinely clean seam is the API one — and that is clean because the parent, not this component, owns it.

**Recommended disposition for the megatranche board:** this file is a *net-deletion* target on the F.W1/F.W2 uplift. Wiring `useCanvas2D` + the glass-ui `Tooltip` shim + `sampleColorRamp`/`clamp` deletes C-1, C-2, C-5, C-6, C-7, C-15 and shrinks the file materially. C-3 forces a prior decision the board must make explicitly: **either** bind `activeIndices`/`logScale`/the two emits at `CoefficientsPanel` and give the harmonic-toggle a keyboard path (C-4), **or** delete the four dead members and let the component be the read-only Pareto chart it currently is — in which case C-10 requires it be renamed and its axis relabelled to say so.
