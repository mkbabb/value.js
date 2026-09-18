claude-opus-5[1m] (served model id)

# CHALLENGE · `SliderControl.vue` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/SliderControl.vue` (150 lines, working tree).
**Substrate** fourier HEAD `cd26c653…`, tree `9a66411d…` — unchanged since R3/R4 pinned it (intake **R4-9**, ADOPT-AS-FACT). The file is one of the **24 in-scope dirty paths**: `git diff` against HEAD is a 3-hunk, 6-line variant rename (below). Every claim below is against the **working tree**, which is the tree F.W0 opens on.
**Mode** static + source-derived, read-only. No dev server, no browser tooling, no install. One write: this file.
**Prior** assumed DEFECTIVE. Fifteen defect rows survived their own falsifiers; five superlatives survived theirs (L-18 both ways).

---

## §0 · VERDICT

| | |
|---|---|
| **Defects** | **15** (1 BLOCKER · 4 MAJOR · 6 MINOR · 4 INFO) |
| **Superlatives** | **5** |
| **Headline** | **C-1 — the `color` prop is INERT.** All five custom properties the wrapper projects onto the glass-ui track (`SliderControl.vue:144-148`) were **deleted from glass-ui at v3.2.0** and appear **zero times** in the pinned `@mkbabb/glass-ui@4.0.0`. The required `color: string` prop therefore has no rendered effect at any of the 8 live callsites; every slider paints `--primary`. |
| **Migration bearing** | The uncommitted `m/w1-bump-migration` bump (glass-ui `^3.1.0` → `^4.0.0`) **introduced** this regression and is what makes it live. The 4→7 leg cannot be planned on top of an unlanded 3→4 that silently dropped the design system's per-instance tint contract across **6 files / 22 declarations**. |

**Consumption inventory of this file (the honest denominator).** value.js: **0 imports**. keyframes.js: **0 imports**. fourier API: **0 imports** (reached at 3 hops through `ContourSettings`). glass-ui: **1 import, 1 symbol, 1 subpath** — `import { Slider } from "@mkbabb/glass-ui/slider"` (`:23`). So the axis reduces to: *one producer symbol, one CSS-variable contract, one props/emits contract, and one operation reached transitively.* Three of the four are defective.

---

## §1 · THE CONSUMED SURFACE, MEASURED

| Seam | What the file consumes | Where | State |
|---|---|---|---|
| glass-ui component | `Slider` via bare subpath `@mkbabb/glass-ui/slider` | `:23` | ✅ clean (S-3) |
| glass-ui variant axis | `variant="standard"` | `:83` | ✅ exists at 4.0.0 (`dist/components/ui/slider/index.d.ts` — `"standard" \| "spectrum"`) |
| glass-ui **token** axis | `--slider-scrub-{track-height,range-bg,range-bg-hover,thumb-bg,thumb-bg-hover}` | `:144-148` | 🔴 **DEAD — C-1** |
| glass-ui theme tokens | `--foreground`, `--muted-foreground` | `:108`, `:123`, `:132` | ✅ live (145 / 42 defs in `dist/styles/`) |
| glass-ui dock context | implicit `keepDockOpen` default `true` | `dist/slider-DQ95MET2.js` `useDockHold` | ✅ correct (S-1); not forwardable (C-5) |
| glass-ui commit event | `valueCommit` | — | ⚠️ **swallowed** (C-5) |
| Tailwind v4 | `@reference "tailwindcss"` + `@apply text-sm` | `:95`, `:106` | ✅ house idiom, 35 files (S-5) |
| value.js `^0.13.0` | *nothing* | — | ⚠️ 0% at the one color seam (C-10) |
| keyframes `^4.3.0` | *nothing*; hardcoded `0.15s` | `:128` | ⚠️ C-9 |
| fourier API | transitively `POST /api/images/{imageSlug}/extract-contour` | `images.py:212` | 🔴 domain mismatch (C-3) |

**The one-line provenance for C-1.** glass-ui commit `99a11083` *"feat(tranche-AV): W9 dock-rebuild + W1 aurora-fix + **W11 slider-unification**"* (2026-06-06, `package.json` version **3.2.0**) deleted the `--slider-scrub-*` block from `src/components/ui/slider/Slider.vue` (−211/+? lines in that file; the removed declarations include `--slider-scrub-track-height`, `--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`, `--slider-scrub-thumb-bg-hover` — i.e. **all five this file still writes**) and replaced them with the `--slider-{track,range,thumb}-*` namespace. fourier's HEAD lock was `glass-ui 3.1.0` (`git show HEAD:web/package-lock.json:650-651`), which **predates** the deletion; the working-tree bump to 4.0.0 crossed it.

---

## §2 · DEFECT REGISTER

### C-1 · BLOCKER · the `color` prop is inert; five dead custom properties

**Claim.** `SliderControl.vue:143-149` declares five `--slider-scrub-*` custom properties on `.slider-track-host`. **No stylesheet anywhere in the resolved application reads any of them.** The required prop `color: string` (`:32`), plumbed through `:style="{ '--track-color': color }"` (`:89`) into `color-mix()` at `:145-148`, therefore produces **no rendered difference whatsoever**. Every SliderControl instance paints its range with the glass-ui default `--primary`.

**Provenance.**
- Consumer declarations: `SliderControl.vue:144,145,146,147,148`.
- Producer, installed: `web/node_modules/@mkbabb/glass-ui/package.json` → `"version": "4.0.0"`; `grep -ro "slider-scrub" dist/` → **0 hits**; `grep -rc "slider-scrub" dist/styles/` → **0**.
- What 4.0.0 *does* read (`dist/glass-ui.css`, scope `data-v-534634a7`): `.slider-track{height:var(--slider-track-height,.375rem);background:var(--slider-track-bg,var(--muted-medium))}` · `.slider-range{background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)}` · `.slider-thumb{width:0;…;opacity:0}`. Ten `--slider-*` tokens exist; **none is `scrub`-prefixed**.
- Deletion commit: glass-ui `99a11083` @ v3.2.0 (see §1).
- Blast radius beyond this file (same dead namespace, same cause): `BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `HarmonicLevelGrid.vue:210-213`, `MorphPhaseConfig.vue:207-210`, `GlassTimeline.vue:125`, `ConvergenceTimeline.vue:136` — **22 declarations / 6 files**, all dead.

**Falsifier (survived).** *"Some stylesheet consumes `var(--slider-scrub-…)`."* → `grep -rn "var(--slider-scrub" web/src/ web/node_modules/@mkbabb/` → **empty**. Every one of the 22 occurrences in the tree is a *declaration*; there are **zero** readers. Secondary falsifier: *"the tokens live in the `./styles` entry, not the component chunk."* → `./styles` resolves to `dist/styles/index.css` (`package.json exports`); `grep -rc -- "--slider-scrub" dist/styles/` → **0**, against `--foreground` 145 / `--duration-fast` 92 in the same tree, so the grep is sound.

**Second-order.** Even the naïve cure (rename to `--slider-track-height`) fails for the geometry token — see **C-11**.

**Contradicts the corpus, explicitly.** `formation/fourier/lane-frontend.md §3` ("glass-\* class-surface census") asserts: *"All 11 `glass-scrubber` and all `glass-track`/`glass-fill`/`glass-thumb` occurrences are **prose comments only** … `SliderControl.vue:3,6,140`."* That is **true for class names and false as a safety conclusion** — the census enumerated the `glass-*` *class* surface and never censused the `--slider-scrub-*` *custom-property* surface, which is live CSS at 22 sites. `lane-frontend.md §5` further characterises the 3.1→4.0 hop as *"24 files, 46 insertions, 46 deletions — a pure rename sweep, no logic"*: the sweep was **incomplete**, not clean. It renamed 9 `variant=` literals and left the companion token namespace at pre-3.2.0 names. The true cost of that hop is understated by at least 22 declarations.

---

### C-2 · MAJOR · every non-finite keystroke commits `min` to the model

**Claim.** `clamp()` (`:40-42`) returns `lo` — not the previous value, not a no-op — when the parsed input is non-finite. `onInput` (`:44-49`) runs on **every** `input` event with no commit boundary. Therefore any transient empty or invalid field state **immediately emits `props.min`** and mutates the parent's model.

**Failure scenario (deterministic).** ML Threshold (`ContourSettings.vue:230-240`, `min=0.1 max=0.9 step=0.05`), model `0.5`. User selects-all and presses Delete to retype. `(e.target as HTMLInputElement).value` is `""` → `parseFloat("")` = `NaN` → `Number.isFinite(NaN)` false → `clamp` returns `lo` = **0.1** → `emit("update:modelValue", 0.1)`. `mlThreshold` becomes 0.1; `displayValue` recomputes to `"0.10"` and is written back into the field before the user can type a digit. One second later `watchDebounced` (`ContourSettings.vue:139-149`) fires `runCompute()` → a real `POST /api/images/{imageSlug}/extract-contour`. **The field cannot be cleared, and clearing it costs a network round-trip.**

**Falsifier (survived).** *"A `@change`/`@blur` handler re-syncs, or `clamp` preserves the prior value."* → `grep -n "@blur\|@change\|onChange" SliderControl.vue` → **0 hits**; `:78` binds `@input` only. `clamp`'s fallback branch is literally `: lo` (`:41`).

---

### C-3 · MAJOR · `formatValue` is a one-way transform; no inverse parse, no unit contract — and one live instance is out of the operation's domain

**Claim.** The props contract offers `formatValue?: (v: number) => string` (`:33`) for display but **no `parseValue` inverse**. `onInput` parses the *formatted* string with bare `parseFloat` in **model units** (`:47`). Any display transform that is not identity-in-units is therefore unrepresentable, and `min`/`max`/`step` carry no unit contract relating them to the value's real domain.

**Failure scenario (live, at the API seam).** `ContourSettings.vue:269-278` mounts a SliderControl labelled **"Min Area %"** with `:min="0" :max="20" :step="0.5"`. The value is forwarded verbatim — `ContourSettings.vue:116` `min_contour_area: minContourArea.value` → `api.extractContour` (`lib/api.ts:300-312`) → `POST /api/images/{imageSlug}/extract-contour` (`api/routers/images.py:212-213`) → `ContourSettings._clamp_area` (`api/models/shared.py:27-30`): `return max(0.0, min(1.0, float(v)))`. **The server's domain is a fraction 0..1; the slider's is 0..20 with no ÷100 anywhere in the chain.** Consequences, all verifiable statically:
1. **95 % of the slider's travel is a dead zone.** Every position from 1.0 to 20 produces the identical request `min_contour_area = 1.0` (= discard every contour smaller than the whole image), so the top 38 of the 40 step positions are behaviourally identical.
2. **The default is unrepresentable.** `CONTOUR_DEFAULTS.min_contour_area = 0.001` (`lib/defaults.ts:11`) with `step=0.5`; on first paint the field reads `"0.0"` (`formatValue: v => v.toFixed(1)`) while the model is 0.001 — a display/model divergence at the wrapper's own seam.
3. **The wrapper cannot round-trip its own initial value.** Touching the field once emits `0`, so `isDefault` (`ContourSettings.vue:64`, `minContourArea.value === CONTOUR_DEFAULTS.min_contour_area`) flips false permanently and the panel's "reset" affordance mislights.

**Falsifier (survived).** *"A ÷100 conversion exists somewhere."* → `grep -n "minContourArea\|min_contour_area" web/src/components/visualization/ContourSettings.vue web/src/lib/api.ts web/src/stores/workspace.ts` shows verbatim forwarding at `ContourSettings.vue:92,116`, `lib/api.ts:309` (`body: { contour_settings: { ...settings } }`); no arithmetic. *"Every slider is mismatched, so this is a systemic API story, not a SliderControl one."* → **No**: `blur_sigma` (0..5 vs server `max(0.0,v)`), `smooth_contours` (0..1 vs server `max(0,min(1,v))`), `ml_threshold` (0.1..0.9, no server validator) and `max_contours` (0..50, 0→`None` on both sides) all agree. **`min_contour_area` is the sole mismatch** — which is exactly what a wrapper with a unit contract would have caught, and what a wrapper with `formatValue`-only cannot.

**Folds intake row R6-8** (ADOPT-AS-FACT + CARRY→F.W5): *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam."* C-3 is the same seam viewed from the other side: the **client control's domain is not derivable from the operation record either**, because the only thing crossing the boundary is a bare `float`. The F.W5 shared-provenance contract needs the operation's field domain to be readable by the control, not just the control's value writable to the operation. Also quantifies one row of **R3-7c** (36 client edges / 9 gap operations): this is a *non*-gap edge that is nonetheless semantically broken.

---

### C-4 · MAJOR · clamped-to-identical edits leave the DOM field diverged from the model, permanently

**Claim.** When an edit clamps to the value the model already holds, **no reactive dependency changes**, so no re-render is scheduled, so the `:value="displayValue"` binding (`:74`) is never re-applied and the DOM retains the user's out-of-range text indefinitely.

**Failure scenario.** Blur Sigma (`ContourSettings.vue:243-253`, `min=0 max=5`), model `5`. User appends a digit: field reads `"55"` → `parseFloat("55")` = 55 → `clamp(55,0,5)` = **5** → `emit(5)` → `blurSigma.value = 5`, **unchanged** → Vue schedules nothing → `displayValue` stays `"5.0"` → the input still displays `"55"`. There is no `@blur`/`@change` re-sync (`grep` → 0 hits) and the slider thumb sits at max, so the UI asserts two different values at once until an unrelated re-render happens to occur.

**Falsifier (survived, and it corrected an earlier draft of this row).** *"Vue skips the `value` patch when the vnode prop is unchanged, so the desync is a patch bug."* → **False**, and I withdraw that mechanism: Vue's `patchElement`/`patchProps` special-case `key === 'value'` and re-apply it unconditionally *when a patch runs*. The surviving mechanism is strictly upstream of that — **no patch runs at all**, because the emit produced no state change. The claim stands on the weaker, correct footing.

---

### C-5 · MAJOR · the wrapper narrows the producer's contract: no `disabled`, no `size`, no `keepDockOpen`, no `valueCommit`

**Claim.** `defineProps` (`:25-34`) exposes 8 props and `defineEmits` (`:36-38`) exactly 1. glass-ui's `Slider` accepts `SliderRootProps & { class, variant, size, keepDockOpen }` and emits **two** events (`dist/components/ui/slider/Slider.vue.d.ts`). The wrapper drops, with no escape hatch: **`disabled`**, **`size`**, **`orientation`**, **`keepDockOpen`**, and the **`valueCommit`** emit.

**Failure scenarios.**
- **`disabled`** — `ContourSettings` has an explicit in-flight state (`store.computing`, guarded at `ContourSettings.vue:104-107`) but cannot disable its five sliders or their number inputs during a compute; the producer ships `.glass-slider[data-disabled] .slider-range{opacity:var(--opacity-disabled)}` and reka suppresses pointer/keyboard for it, and none of it is reachable.
- **`size`** — every instance is pinned to `md` (`.glass-slider[data-size=md]{--slider-track-height:1.25rem}`). The file's own intent is a 16 px track (`:144`); the only supported route to a different track height is `size`, which is not forwarded. See C-11.
- **`valueCommit`** — the producer's purpose-built drag-end event is swallowed, so **3 of 3** consumers hand-roll their own debounce with **3 different constants**: `ContourSettings.vue:148` (1000 ms), `EquationPanel.vue:64` (300 ms), `EquationView.vue:180` (200 ms). The correct affordance exists and is unused.

**Falsifier (survived).** *"The dropped props are unused, so the narrowing is deliberate KISS."* → The `disabled` need is demonstrable (`store.computing` exists and is already read for the retry banner), the `size` need is stated **in this file's own CSS** (`:144`), and the `valueCommit` need is proven by three independent re-implementations. A narrowing that forces three consumers to rebuild a producer feature is not KISS.

---

### C-6 · MINOR · `color: string` has two incompatible consumer arms and no documented contract

**Claim.** The same required prop is fed by two semantically different value kinds: a **JS-resolved hex snapshot** — `:color="VIZ_COLORS.amber"` (`ContourSettings.vue:236` and 4 more), where `VIZ_COLORS` is a `reactive()` object populated by `resolveVizColors()` (`lib/colors.ts:90-96`) at boot and on `.dark` mutation (`App.vue:11-17`) — and a **live CSS var reference** — `color="var(--viz-fourier)"` (`EquationPanel.vue:101`, `FunctionInput.vue:185,218`). The prop's type (`string`) and its one-line doc say nothing about which is expected. The two arms have different theme-reactivity: the `var()` arm is cascade-native and always correct; the hex arm is a snapshot that is correct only for as long as the `MutationObserver` fires, and is `#888888` for any token `cssVarToHex` cannot parse (`lib/colors.ts:26,53`).

**Falsifier (survived).** *"Both arms behave identically inside `color-mix()`."* → True *today* only because both are dead (C-1). The moment C-1 is cured they diverge on theme flip, and `cssVarToHex` handles only `#hex`, `hsl(…)`, bare `h s% l%`, and `rgb(…)` (`lib/colors.ts:28-51`) — an `oklch()`/`lab()`/`color()`-authored token silently yields `#888888`.

---

### C-7 · MINOR · the v-model setter assumes a defined array; the producer's emit is typed `number[] | undefined`

**Claim.** `sliderModel.set` (`:55`) reads `arr[0]` directly. glass-ui's declared emit is `"update:modelValue": (payload: number[] | undefined) => any` (`dist/components/ui/slider/Slider.vue.d.ts`). `?? props.min` guards an **empty** array; it does not guard an **absent** one — `undefined[0]` throws `TypeError: Cannot read properties of undefined (reading '0')`.

**Falsifier (partially survived — reported honestly).** *"reka never emits `undefined`, so this is unreachable."* → I could not reach reka's `SliderRoot` emit declaration in the installed tree (`node_modules/reka-ui/dist/Slider/SliderRoot.vue.d.ts` is not laid out per-component; the bundle is `dist/index.js`), so the **runtime** reachability is **UNPROVEN**. What *is* proven statically is the type-level mismatch: a `WritableComputedRef<number[]>` bound by `v-model` to a component whose payload includes `undefined`. Verdict **PLAUSIBLE**, severity held at MINOR for that reason. Cheap cure regardless: `set: (arr) => emit(…, clamp(arr?.[0] ?? props.min, …))`.

---

### C-8 · MINOR · the input's `type` flips reactively between `number` and `text`

**Claim.** `:type="isNumericDisplay ? 'number' : 'text'"` (`:72`) where `isNumericDisplay = !Number.isNaN(Number(displayValue))` (`:61`). Because `displayValue` is value-dependent, the element's `type` — and with it `min`/`max`/`step` (`:75-77`, forced to `undefined` in the text arm) — **changes as the user drags**.

**Failure scenario.** "Max Contours" (`ContourSettings.vue:282-292`) uses `formatValue: v => v === 0 ? 'All' : String(v)`. At `v=0`, `Number("All")` is `NaN` → `type="text"`, no `min`/`max`/`step`. Dragging off 0 flips the live element to `type="number"` and re-applies the three constraint attributes. Vue patches `type` in place on a possibly-focused input; UA behaviour on a mid-edit `type` mutation (value normalisation, selection loss, spin-button appearance) is engine-specific — **UNPROVEN-NEEDS-LIVE for SS-13**. Statically certain: `Number("")` is `0`, not `NaN`, so a `formatValue` returning `""` is silently classified numeric.

**Falsifier (survived).** *"`type` is static per instance."* → It is bound to a `computed` derived from `modelValue` (`:61`, `:72`); the "All" formatter makes the flip reachable from a single step of the slider.

---

### C-9 · MINOR · hardcoded motion constant where the consumed design system ships tokens

**Claim.** `:128` `transition: border-color 0.15s;` — a raw duration with the UA-default `ease` timing. The same producer stylesheet this file already depends on defines `--duration-fast` (**92** occurrences in `dist/styles/`) and `--ease-standard`, and glass-ui's own slider CSS uses exactly `transition: background var(--duration-fast) var(--ease-standard)`. `@mkbabb/keyframes.js@^4.3.0` is a declared dependency (`web/package.json`) with **0 imports** in this file.

**Falsifier (survived).** *"The tokens don't exist at the pin."* → `grep -rc -- "--duration-fast" node_modules/@mkbabb/glass-ui/dist/styles/` → **92**; the file already consumes `--foreground`/`--muted-foreground` from the same entry (`:108,123,132`), so the cascade is demonstrably in scope.

---

### C-10 · MINOR · value.js is pinned and 0 % consumed at the app's only per-instance color seam

**Claim.** `@mkbabb/value.js@^0.13.0` is a declared dependency whose entire consumed surface is **5 import lines across 4 files, all easing** — `ConvergencePlot.vue:5`, `equation/lib/harmonics.ts:5`, `useCurveTransition.ts:8`, `lib/easings.ts:9,16` (`easeInOutSine`, `timingFunctions`). Meanwhile this component's color pipeline is served by `lib/colors.ts` (117 lines): a hand-rolled `cssVarToHex` with three regexes (`lib/colors.ts:32,40,46`), a hand-rolled `hslToHex` (`:56-68`), `rgbToHex` (`:70-74`), `hexToRgba` (`:101-106`) and `hexToRgb` (`:111-117`) — precisely the surface value.js owns.

**Falsifier (survived).** *"`SliderControl` doesn't import `colors.ts`, so this is out of scope."* → It imports nothing, but its required `color` prop is fed by `VIZ_COLORS` at 5 of 8 callsites (`ContourSettings.vue:236,249,275,288,301`), and the hex↔`var()` split of C-6 exists *because* there is no shared color type. The seam is this component's props contract. **AGREES with `lane-frontend.md §9 item 5** ("the value.js consumer surface is tiny — 5 sites, `easeInOutSine` + `timingFunctions` — the cheapest leg of the deadlock"): I reproduce that count exactly, and add that the *cheapness* is the symptom — the color arm that value.js exists to serve was never wired.

---

### C-11 · MINOR · the obvious cure for the geometry token loses on specificity

**Claim.** Renaming `--slider-scrub-track-height: 16px` (`:144`) to `--slider-track-height: 16px` on `.slider-track-host` **still has no effect**. The producer sets the same variable on the *same element* from a higher-specificity selector: `.glass-slider[data-size=md][data-v-534634a7]{--slider-track-height:1.25rem}` (`dist/glass-ui.css`) — one class + two attribute selectors — versus the consumer's scoped `.slider-track-host[data-v-<parent>]` — one class + one attribute. The producer wins; the track stays 20 px.

**Falsifier (survived).** *"Scoped consumer CSS always wins over library CSS."* → Specificity is computed from the selector, not the source; both rules land on the identical element (the Slider root, which receives the parent's scope id as the child component's root). The routes that *do* work are the `size` prop (not forwarded — C-5) or an inline `:style` declaration (specificity `1,0,0`), which is where `--track-color` already lives (`:89`) and is why *that* one variable actually reaches the element.

---

### C-12 · INFO · `aria-label` is applied twice

**Claim.** `:aria-label="label"` (`:87`) is not a declared prop of `Slider`, so it (a) reaches each `SliderThumb` explicitly — `"aria-label": n.$attrs["aria-label"] ?? void 0` in the compiled SFC — **and** (b) falls through to the Slider root, since the component declares no `inheritAttrs: false` and renders a single root. The same string names both the group and the thumb.

**Falsifier (partially survived).** The double *application* is statically certain from the compiled source. Whether a screen reader double-announces is **UNPROVEN-NEEDS-LIVE (SS-13)**. INFO for that reason. Note also that the visible label text is bound to the **number input** (the `<label>` at `:66` wraps the `<input>`, not the Slider), so the slider's only name is this attribute — the pairing is intentional, just doubled.

---

### C-13 · INFO · `min === max` is reachable from a live callsite

**Claim.** `FunctionInput.vue:216-217` mounts SliderControl with `:min="2" :max="Math.max(2, vizHarmonics ?? nHarmonics)"`. When `vizHarmonics` is 2 (or `nHarmonics` is ≤2 with `vizHarmonics` null), **`min === max === 2`**. The wrapper performs no ordering or degeneracy check; `clamp(v,2,2)` is total, but the degenerate range is forwarded verbatim to reka's `SliderRoot` (`:84-86`), whose position math divides by `max - min`.

**Falsifier (partially survived).** The reachability is static and exact (`Math.max(2, …)` cannot exceed 2 when its argument is ≤2). The consequence inside reka (NaN thumb offset vs. graceful degenerate handling) is **UNPROVEN-NEEDS-LIVE**. INFO for that reason. Related: `clamp(v, lo, hi)` = `Math.max(lo, Math.min(hi, v))` returns `lo` for any inverted range, silently.

---

### C-14 · INFO · the only e2e that touches a SliderControl asserts nothing about it, and its fallback branch is dead

**Claim.** `web/e2e/contour-extraction.spec.ts:67-78` is the single automated exercise of this component. It drives the **number-input** arm (`blurInput.fill("3")`, `:72`), then asserts only `await expect(canvas).toBeVisible()` (`:84`) — never the model, never the track, never the color. Its documented fallback, `blurSection.locator('input[type="range"]')` (`:75`), can never match: glass-ui's `Slider` renders reka's `SliderRoot`/`SliderTrack`/`SliderThumb` composition, which emits **no** `input[type=range]`.

**Falsifier (survived).** *"A visual-baseline spec covers the track paint."* → `grep -rn "slider\|Slider" web/e2e/*.spec.ts` returns exactly 4 lines, all in the two cited files, none in `visual-baseline.spec.ts`. **This is the answer to "how did C-1 survive a bump?"** — the only gate on this component is `vue-tsc`, and a dead CSS custom property is invisible to the type system. Corroborates `lane-frontend.md §9 item 11` (no unit-test runner; 8 specs / 29 tests / 1 chromium project).

---

### C-15 · INFO · header documentation drifts from the pin

**Claim.** The file header asserts *"the **v1.8.x** `<Slider>` acquires the typed `DockContext` token internally"* (`:17-19`) and its retint comment still says *"the **glass-scrubber** variant tokens"* (`:140`). The pin is `@mkbabb/glass-ui@^4.0.0` and the variant is `standard` (`:83`, renamed in the same working-tree hunk that left `:140` untouched). The `git diff` for this file is exactly three hunks, all in the doc-comment and the `variant=` literal:

```
- * mapped to `<Slider variant="glass-scrubber">`) and no consumer in the
+ * mapped to `<Slider variant="standard">`) and no consumer in the
-            variant="glass-scrubber"
+            variant="standard"
```

**Falsifier (survived).** *"v1.8.x is a historical provenance note, not a version claim."* → Granted for `:17`; not for `:140`, which describes the *current* token block as belonging to a variant that no longer exists — and it is the comment that would have caught C-1 during the sweep.

---

## §3 · SUPERLATIVES (L-18, both ways)

### S-1 · The dock-token retirement is real, and I verified it in the installed artifact
The header claims (`:15-20`) that the string-key `dockKeepOpen`/`dockRelease` injects were retired because the Slider acquires the typed `DockContext` internally. **Confirmed against the shipped bundle**, not the comment: `dist/slider-DQ95MET2.js` inlines `useDockHold`, which calls `inject(dockContext)` and drives `keepOpen()`/`release()` on `pointerdown`/`pointerup`/`pointercancel`, defaulting `keepDockOpen: true`. `grep -rn "dockKeepOpen\|dockRelease" web/src/` → **0 hits** tree-wide. *Falsifier:* if any string-key inject survived, or if the token were only in `src` and not `dist`, this would fail; neither holds. This is the CR-2 regression class **actually closed**.

### S-2 · The scalar↔array adaptation is the minimal correct shim, documented at the seam
`:51-56` is 6 lines with a 2-line rationale naming the exact upstream constraint (reka's array model) and the exact preserved invariant (scalar `modelValue`). It clamps on write, so a producer-side snap outside `[min,max]` cannot escape into the parent. *Falsifier:* a wrapper that leaked the array upward, or re-implemented reka's stepping, would be worse; this does neither. (The `?? props.min` guard is one character short of complete — C-7 — which is the only blemish on an otherwise exemplary adapter.)

### S-3 · The import is contract-v2 clean
`import { Slider } from "@mkbabb/glass-ui/slider"` (`:23`) — a **bare specifier to a published subpath**, resolved through the producer's own `exports` map (`"./slider": {types:"./dist/slider.d.ts", import:"./dist/slider.js"}`). No `dist/` path, no deep relative import, no `development` condition, and `vite.config.ts:22-25` deliberately carries **no** `@mkbabb/*` resolve alias, citing `docs/precepts/cross-repo-dev-resolution.md §2.2/§2.4`. There are **0 direct `reka-ui` imports** in the whole tree; this wrapper does not reach around its producer. *Falsifier:* `grep -rn 'from "reka-ui"' web/src/` → empty; `grep -n "@mkbabb" web/vite.config.ts` → alias-free. **AGREES with `lane-frontend.md §1/§3`** ("contract-v2-clean … the cleanest glass-ui consumer posture in the constellation") — and that verdict survives my hostile pass on this file.

### S-4 · The A.W3.b prop retirement is a properly evidenced deletion
`:11-20` retires a legacy `variant?: "timeline" | "default"` prop, states the disposition (`(b)` per `audit/W3-adoption-ledger.md`), and **records the verification command in the file**: `git grep '<SliderControl' | xargs grep variant`. I re-ran the equivalent: `grep -rn "SliderControl" web/src/ | grep -v SliderControl.vue` → 3 importers / 8 callsites, **none** passing `variant`. *Falsifier:* a surviving `variant=` at any callsite would refute it; there is none. This is the standard the rest of the migration did not meet (cf. C-1).

### S-5 · Correct, house-consistent Tailwind v4 scoped-`@apply` idiom
`@reference "tailwindcss"` (`:95`) before `@apply text-sm` (`:106`) is the required v4 form for a scoped SFC block, and it is consistent across **35** files in the tree. *Falsifier:* omitting it breaks the build; using v3's implicit resolution would not compile under `@tailwindcss/postcss ^4.3.1`. *Caveat, not a defect here:* referencing bare `"tailwindcss"` rather than the project entry means `style.css`'s `@theme` customisation (`--font-sans: "Computer Modern Serif"`) is invisible to `@apply` in this file; harmless for `text-sm`, a trap for any future `@apply font-sans`.

---

## §4 · CORPUS FOLD

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md §3` — "SliderControl … thin API-shape adapter, **not a shadow** … the correct posture — keep" | **AGREE on posture, CONTRADICT on health.** The adapter shape is right (S-2, S-3); the adapter is nonetheless carrying a dead producer-token contract (C-1) the census did not open. "Keep" ≠ "clean". |
| `lane-frontend.md §3` — "all `glass-scrubber`/`glass-track`/`glass-fill`/`glass-thumb` occurrences are **prose comments only** … `SliderControl.vue:3,6,140`" | **CONTRADICT as a safety conclusion.** True of the `glass-*` **class** surface; the census never enumerated the `--slider-scrub-*` **custom-property** surface, which is 22 live declarations across 6 files and 100 % dead at the pin. |
| `lane-frontend.md §5` — the 3.1→4.0 hop was "24 files, 46 insertions, 46 deletions — a **pure rename sweep, no logic**" | **CONTRADICT.** The sweep renamed 9 `variant=` literals and missed the companion token namespace deleted in the *same* upstream change (glass-ui `99a11083`, v3.2.0). The empirical rate this row establishes for budgeting the 4→7 hop is therefore an **undercount**. |
| `lane-frontend.md §9 item 5` — value.js surface is 5 sites, easing only | **AGREE, reproduced exactly** (`ConvergencePlot.vue:5`, `harmonics.ts:5`, `useCurveTransition.ts:8`, `easings.ts:9,16`). Extended by C-10: the color arm value.js exists to serve was never wired, and this component's props contract is where that shows. |
| `lane-frontend.md §9 item 11` — no unit-test runner; 8 specs / 29 tests / 1 project | **AGREE**, and C-14 supplies the specific consequence: the sole e2e touching this component asserts only canvas visibility and carries a dead `input[type=range]` fallback. |
| intake **R6-8** (ADOPT + CARRY→F.W5) — an operation model embedding client back-references cannot attribute a defect to one side of the seam | **EXTENDED** by C-3: the converse also holds. A client control whose domain cannot be derived from the operation record ships a 95 %-dead input range with no gate anywhere in the chain. F.W5's shared-provenance contract must carry field **domains**, not just field names. |
| intake **R3-7c** (36 client edges / 9 gap operations) | C-3 shows a *populated* edge that is semantically broken; the gap count is a floor on client↔operation defects, not a ceiling. |
| intake **X-3** (45 ops total / 30 public-non-admin / 13 admin) | `POST /api/images/{imageSlug}/extract-contour` (`api/routers/images.py:212`) sits in the 30-op public arm — inside the `0-of-45` OpenAPI-security defect of **R3-7b** as well. |
| intake **R4-9** — the audited scope is byte-identical to the tree F.W0 opens on | **RELIED ON.** I re-confirmed HEAD `cd26c653…` and that `SliderControl.vue` is among the dirty in-scope paths, with a 6-line diff. Nothing here is stale-at-HEAD. |

---

## §5 · METHOD, AND WHAT I DID NOT PROVE

- **Read whole:** `SliderControl.vue`; its one import (`@mkbabb/glass-ui/slider` → `dist/slider.js` → `dist/slider-DQ95MET2.js` + `dist/components/ui/slider/{Slider.vue.d.ts,index.d.ts}` + the slider block of `dist/glass-ui.css`); all 3 importers at all 8 callsites (`ContourSettings.vue`, `EquationPanel.vue`, `FunctionInput.vue`); `lib/colors.ts`, `lib/defaults.ts`; the API leg `lib/api.ts:296-312` → `api/routers/images.py:212-245` → `api/models/{shared,computation}.py`; `e2e/contour-extraction.spec.ts:55-90`.
- **Tools:** `grep` · `find` · `sed` · `wc` · `node -e` over `package.json` exports · `git log`/`git show`/`git diff` (read-only) in `fourier-analysis` and `glass-ui`. **Zero writes** outside this file. **No browser tooling**, no install, no dev server, no typecheck run.
- **UNPROVEN-NEEDS-LIVE (SS-13), carried honestly:** C-7's runtime reachability of an `undefined` emit payload (type-level mismatch proven; reka's emit declaration not reachable in the installed layout); C-8's UA behaviour on a mid-edit `type` mutation; C-12's screen-reader announcement; C-13's reka behaviour at `min === max`. Each is severity-capped accordingly (MINOR/INFO), and none is load-bearing for C-1.
- **One row was killed by its own falsifier and is recorded rather than hidden:** the first draft of C-4 blamed Vue for skipping the `value` patch. Vue special-cases `key === 'value'` and always re-applies it. C-4 survives only on the weaker, correct mechanism (no re-render is scheduled at all). Reported per L-18.
- **Tally:** defects **15** (BLOCKER 1 · MAJOR 4 · MINOR 6 · INFO 4) · superlatives **5**.
