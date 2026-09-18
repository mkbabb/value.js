claude-opus-5[1m] (served model id)

# CHALLENGE — `MorphPhaseConfig.vue` · axis C (CONSUMPTION)

**Target.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue` (212 lines, working tree).
**Axis.** How this leaf consumes value.js `^0.13.0`, keyframes.js `^4.3.0`, glass-ui `^4.0.0`, the fourier API; props/emits contract quality; integration seams.
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every claim carries severity + `file:line` + its falsifier. Superlatives run the same gauntlet (L-18 both ways).
**Method.** Static + source-derived only. No browser. Three measurement harnesses were run, all read-only, all outside the fourier repo (`git status --porcelain web/src/components/morph/` unchanged; `web/tsconfig.tsbuildinfo` md5 `201bf3e0…` identical before and after):
1. `vue-tsc 3.3.5` driven from a scratchpad `tsconfig.json` with absolute `paths` (sanity-probed: an injected `:easing="2"` correctly raised `TS2322`).
2. `node` evaluation of the **installed** `@mkbabb/value.js@0.13.0` dist vs the **producer** `@mkbabb/value.js@4.0.0` dist in `/Users/mkbabb/Programming/value.js`.
3. Token grep of `@mkbabb/glass-ui@4.0.0` `dist/glass-ui.css` (and of the producer's 7.0.0).

**Working-tree caveat (load-bearing).** The file is **uncommitted-modified**. `git diff` is a single line: `variant="glass-scrubber"` → `variant="standard"` (`:23`). Everything below audits the **working tree**; where HEAD differs it is called out.

**Ledger.** 20 defects · **2 BLOCKER** · 7 superlatives.

---

## §0 — Import surface, whole

Direct (`:64-78`):

| Specifier | Symbols | Producer |
|---|---|---|
| `vue` | `computed` | — |
| `@mkbabb/glass-ui/select` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` | glass-ui 4.0.0 |
| `@mkbabb/glass-ui/slider` | `Slider` | glass-ui 4.0.0 |
| `@/composables/useMorphConfig` | `EASING_PRESETS`, `EASING_PRESET_NAMES`, `easingCurvePath` | local |

Transitive, in full (read whole):
`useMorphConfig.ts:9` → `@mkbabb/glass-ui` (root barrel) · `:10-13` → `useFourierMorph.ts` → `@mkbabb/keyframes.js@4.3.0` + `@/lib/svg-fourier` · `:14-18` → `@/lib/easings.ts:9,10-16` → `@mkbabb/value.js@0.13.0`.

**Zero fourier-API reach.** `grep` over the closure finds no `@/lib/api`, no `fetch`, no store. The 45-operation surface and the R6 operation↔client-leaf coupling are **not** touched by this component or by anything it imports. Nothing to break at the API seam (see S-6).

---

## §1 — BLOCKERS

### C-1 · BLOCKER · The `sliderColor` prop is completely inert: four dead glass-ui custom properties
`MorphPhaseConfig.vue:207-210` (declarations) · `:29` (the `--track-color` feed) · `:85` (the prop)

The scoped retint block writes:

```css
--slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
--slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
--slider-scrub-thumb-bg:        var(--track-color);
--slider-scrub-thumb-bg-hover:  var(--track-color);
```

**glass-ui 4.0.0 reads none of these names.** Measured:

```
$ grep -rl "slider-scrub" node_modules/@mkbabb/glass-ui/dist/    → (empty)
$ grep -o -- "--slider-[a-z0-9-]*" dist/glass-ui.css | sort -u
--slider-range-bg  --slider-range-blur  --slider-range-shadow
--slider-thumb-bg  --slider-thumb-border-color  --slider-thumb-shadow
--slider-thumb-size  --slider-thumb-spring  --slider-track-bg  --slider-track-height
```

The live rule is `.slider-range[data-v-534634a7] { background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent) }`. So all three cards paint `var(--primary)`, and the parent's deliberate `slider-color="var(--accent-red)"` / `"var(--accent-pink)"` / `"var(--accent-red)"` (`FourierMorphDemo.vue:31,41,51`) produce **three identical sliders**.

Two of the four are dead **twice over**: `--slider-thumb-bg` is read only under `[data-variant=spectrum]`, and the `standard` recipe paints the thumb `width:0; opacity:0; background:0 0`. And glass-ui 4.0.0 ships **no `*-hover` slider token at all** — the hover state is a `box-shadow` swap, not a background swap — so `-range-bg-hover`/`-thumb-bg-hover` have no correct spelling to migrate to.

**Provenance.** `git show ae84509` ("refactor(A.W2.c): migrate styled-slider to GlassScrubber") introduced these names against a `<Slider variant="glass-scrubber">` API that glass-ui has since collapsed to `standard | spectrum`. The in-flight working-tree edit renames the **variant** and leaves the **tokens**. Confirmed dead in the producer too: `grep -rl "slider-scrub"` over glass-ui **7.0.0** in `/Users/mkbabb/Programming/value.js/node_modules` → empty; 7.0.0's surface is `--slider-range-bg … --slider-vertical-size`, still no `scrub`.

**Blast radius (this leaf owns 4 of 23).** `grep -rn -- "--slider-scrub" web/src/` → **23 declarations across 6 files**: `MorphPhaseConfig.vue:207-210`, `HarmonicLevelGrid.vue:210-213`, `BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`, `SliderControl.vue:144-148`, `GlassTimeline.vue:125`, `ConvergenceTimeline.vue:136`. `grep -rn -- "--slider-range-bg\|--slider-track-bg\|--slider-thumb-bg" web/src/` → **0**. Not one live slider token is used anywhere in the fourier web tree.

**Repair.** `--slider-scrub-range-bg` → `--slider-range-bg`; delete the other three (no hover token exists; the thumb is invisible in `standard`).

**Falsifier.** *"The names resolve through some alias layer."* Refuted: CSS custom properties have no aliasing; the only resolution is textual, and `grep` over the entire shipped `dist/` (JS + all 20 CSS files) finds zero occurrences of the substring `slider-scrub` in 4.0.0 **and** 7.0.0. Secondary falsifier — *"scoped CSS never reaches the child anyway, so the whole block is moot"*: refuted the other way; `class="duration-slider-track"` (`:28`) lands on the child's root, which inherits the parent's `data-v` scope id, and custom properties inherit down to `.slider-range`. The **mechanism is sound; only the names are wrong** — which is precisely why it fails silently.

**Contradicts the corpus, explicitly.** `formation/fourier/lane-frontend.md` §"the live tier classes" verified all 11 `glass-scrubber` occurrences site-by-site and ruled them "**prose comments only**", naming `MorphPhaseConfig.vue:98,204`. That sweep is correct **for `glass-*` class tokens** and its two cited lines are indeed comments — but it did not test the adjacent `--slider-scrub-*` **custom-property namespace** at `:207-210`, which are live declarations, not comments. The census's "no live scrubber residue" conclusion does not survive at this leaf.

---

### C-2 · BLOCKER · The easing catalog cannot resolve at the F.W2 value.js bump: no root export, and `timingFunctions` is gone from the public surface
`lib/easings.ts:9`, `:10-16` · `:55-60` · `MorphPhaseConfig.vue:78, 104-105`

The component's three imported symbols are all manufactured from two bare-root specifiers:

```ts
// web/src/lib/easings.ts
9:  import { timingFunctions } from "@mkbabb/value.js";
10: import { easeInOutSine, easeInOutCubic, easeInOutQuad,
16:          easeInOutExpo, easeInOutCirc } from "@mkbabb/value.js";
```

Measured against the producer at `/Users/mkbabb/Programming/value.js` (**value.js 4.0.0**):

1. **There is no `"."` export.** `package.json.exports` has exactly 7 keys — `./color ./value ./css ./easing ./math ./transform ./quantize`. A bare `@mkbabb/value.js` specifier is an **unresolvable module** under `moduleResolution: "bundler"`. Both lines hard-fail at build.
2. **`timingFunctions` is not exported by `./easing` either.** `src/subpaths/easing.ts` re-exports exactly: `CubicBezier, bezierPresets, easeInBounce, easeInOutCirc, easeInOutCubic, easeInOutExpo, easeInOutQuad, easeInOutSine, easeOutCubic, easeOutExpo, easing, jumpTerms, linear, linearEasing, smoothStep3, steppedEase`. `timingFunctions` survives only as a module-private `DIRECT_EASINGS` record (`src/easing.ts:94-114`). Measured: `('timingFunctions' in await import('./dist/subpaths/easing.js'))` → **`false`**.

So the whole 22-preset catalog (`EASING_PRESETS`, `easings.ts:55-60`) — the sole data source for `easingNames` (`:105`), `presets[name].label` (`:55`) and `easingCurvePath` (`:49`) — has **no drop-in replacement**. The 5 `easeInOut*` symbols do survive (`subpaths/easing.ts:12-16`) and need only the specifier rewrite; `timingFunctions` needs a rewrite of the record's *construction*, because its successor `easing(name)` returns a `Result<EasingFunction, EasingIssue>` (`src/easing.ts:166`), not a bare function — which also invalidates the `as EasingFn` cast at `easings.ts:58`.

**Repair (measured to work).** `EASING_PRESETS[name].fn = easing(name).value` against `@mkbabb/value.js/easing` — verified below to resolve **22/22**.

**Falsifier.** *"`^0.13.0` pins the minor, so 4.0.0 is never installed and this is hypothetical."* Half-correct and the reason this is scoped, not live: `^0.13.0` on a 0.x means `>=0.13.0 <0.14.0`, so today's build is safe. But the commission names the F.W2 migration surface as this axis's subject, and on that surface this is a **hard module-resolution failure, not a soft deprecation** — the strongest possible form of the defect. Second falsifier — *"the census already booked this"*: `CENSUS-2026-08-03.md §1` states "5 import statements / 4 files / 6 symbols, easing-only … all bare-root specifiers that 4.0.0 no longer exports — latent, not live". **Confirmed and extended**: the census recorded the specifier problem; it did not record that `timingFunctions` itself is *absent from every published entry point*, which is the part with no mechanical repair.

---

## §2 — MAJOR

### C-3 · MAJOR · 8 of the 22 easing presets silently change curve shape at the bump — up to 0.192
`lib/easings.ts:55-60` · `MorphPhaseConfig.vue:49` (preview) · `useFourierMorph.ts:162-164` (motion)

Once C-2 is repaired the *names* all survive, but the *curves* do not. Sampling both implementations at 1001 points on `[0,1]`, max |Δ| between `timingFunctions[name]` (0.13.0) and `easing(name).value` (4.0.0):

| preset | max abs Δ | class |
|---|---|---|
| `ease-out-circ` | **1.923e-1** | MATERIAL |
| `ease-in-expo` | **6.930e-2** | MATERIAL |
| `ease-in-circ` | **4.489e-2** | MATERIAL |
| `ease-in-quad` | **4.157e-2** | MATERIAL |
| `ease-in-cubic` | **3.162e-2** | MATERIAL |
| `ease-out-sine` | **3.082e-2** | MATERIAL |
| `ease-in-sine` | **3.038e-2** | MATERIAL |
| `ease-out-quad` | **2.520e-2** | MATERIAL |
| `ease-in`, `ease-out`, `ease-in-out`, `ease-{in,out,in-out}-back` | 1.4e-6 … 4.6e-6 | bezier-solver noise |
| `linear`, `ease-out-cubic`, `ease-out-expo`, all 5 `ease-in-out-*` | ≤ 4.4e-16 | exact |

Cause: 0.13.0's `timingFunctions` mapped kebab names onto the **analytic closed forms** (`easeOutCirc`, `easeInExpo`, …); 4.0.0's `easing()` falls through `DIRECT_EASINGS` — which retains only `linear`, `easeOutCubic`, `easeOutExpo`, `smoothStep3`, `easeInBounce` and the five `easeInOut*` — into **cubic-bézier approximations** from `PRESETS` (`src/easing.ts:34-65`). Every name whose analytic form was dropped silently degrades to its bézier stand-in. `ease-out-circ` moves by 19% of the normalized range.

Both consumers are affected identically: the SVG preview (`:49` → `easingCurvePath`) and the actual morph (`useFourierMorph.ts:162-164` → `getEasingFn`). Nothing errors, nothing types differently, no test covers it.

**Falsifier.** *"0.19 on a normalized easing is imperceptible."* Refuted for the preview: `easingCurvePath` maps `v` to `y = 18 − 16v` in a 20-unit viewBox rendered at `height:20px` (`:200`), so Δv = 0.192 is **3.1 px of vertical travel in a 20 px glyph** — a visibly different curve. For motion it is 19% of the harmonic-level sweep at the worst t. Second falsifier — *"the bump will change the names too, so the drift is moot"*: refuted; 22/22 names resolve unchanged (S-1), so the rename is a no-op and the drift is the *only* delta — i.e. maximally silent.

---

### C-4 · MAJOR · Controlled-number-input desync whenever the clamp is a no-op
`MorphPhaseConfig.vue:10-18` (`:12` `:value`, `:13` `@change`) · `:93-96`

```ts
93: function emitDuration(raw: string) {
94:     const v = Math.max(50, Math.min(800, Math.round(Number(raw) || 50)));
95:     emit("update:duration", v);
96: }
```

`:value` is a one-way binding; Vue only re-patches the DOM `value` when the bound prop **changes**. Reachable sequence, entirely through the shipped parent:

1. duration is 800 (user has already dragged the slider to max, or typed 900 once).
2. User types `9999`, blurs. `@change` → clamp → **800** → `emit("update:duration", 800)`.
3. `FourierMorphDemo.vue:32` assigns `morphConfig.config.settleOutMs = 800` — **same value**. No prop change, no re-render, no DOM patch.
4. The input keeps displaying **`9999`** while the model holds 800. The slider (`:21`) sits at max. Model and control disagree until an unrelated re-render.

Same shape for garbage: `Number("abc") || 50` → 50; with duration already at 50 (which is `morphMs`'s **default**, `useFourierMorph.ts:62`) the field displays `abc` indefinitely.

**Falsifier.** *"Vue always syncs `:value` on the next tick."* Refuted by Vue's patch semantics — `patchProp` for `value` is guarded on `prev !== next` in the vnode diff, and no diff runs at all here because no reactive dependency changed. Second falsifier — *"the slider re-render fixes it"*: refuted; `durationModel.get` (`:100`) also reads `props.duration`, which is unchanged, so nothing in the subtree invalidates.

**Repair.** Bind `@input` with a normalizing write-back, or force a resync (`$forceUpdate` is wrong; the idiomatic fix is a local `shallowRef` mirror — the same idiom MEMORY records for `useColorModel`'s `defineModel` round-trip).

---

### C-5 · MAJOR · The committed state does not typecheck; the migration is half-applied
`MorphPhaseConfig.vue:23` (worktree) vs `HEAD:web/.../MorphPhaseConfig.vue:23`

`git show HEAD` still carries `variant="glass-scrubber"`. Typechecked in isolation (harness §Method-1):

```
HeadVersion.vue(23,21): error TS2322:
  Type '"glass-scrubber"' is not assignable to type 'SliderVariant | undefined'.
```

glass-ui 4.0.0 declares `variant?: "standard" | "spectrum" | null | undefined` (`dist/components/ui/slider/index.d.ts:42-45`). So `npm run build` (`vue-tsc -b && vite build`, `web/package.json`) **fails at HEAD**. The uncommitted one-line edit is the repair — but it is the *cosmetic half* of the A.W2.c→4.0.0 migration: the variant name moved, the four custom properties (C-1) did not. A reviewer seeing "typecheck green" after this commit lands will reasonably conclude the migration is done.

**Falsifier.** *"HEAD is stale/irrelevant; audit the tree."* Accepted for every other finding here — and the tree is what §1–§3 audit. This finding is specifically about the **commit boundary**: the repo's last committed state is unbuildable, and the fix in flight is incomplete in exactly the way that hides C-1. Corroborated by `CENSUS-2026-08-03.md §1`, which records the branch as mid-bump with **28 uncommitted paths** and the WT diff as "a pure rename sweep".

---

### C-6 · MAJOR · `String($event)` launders reka's `AcceptableValue` into `string`, and `SelectValue` has no placeholder — an out-of-catalog easing renders a blank trigger while motion silently runs linear
`MorphPhaseConfig.vue:36` · `:38` · `:90` · `lib/easings.ts:65-67`

```html
36: <Select :model-value="easing" @update:model-value="$emit('update:easing', String($event))">
38:     <SelectValue />
```

Three facts, measured:
- glass-ui's `Select` forwards reka's emit verbatim: `"update:modelValue": (value: AcceptableValue) => any` (`dist/components/ui/select/Select.vue.d.ts:8`), and `AcceptableValue = string | number | bigint | Record<string, any> | null` (`reka-ui/dist/index3.d.ts:231`). `String(null)` → `"null"`; `String({})` → `"[object Object]"`. The component's own emit is declared `[value: string]` (`:90`) and the parent writes it straight into `MorphConfig.settleOutEasing: string` (`useFourierMorph.ts:53-55`) with no validation anywhere in the chain.
- reka's `SelectValue` displays `getOption(modelValue)?.textContent ?? ""`, and `placeholder` defaults to `""` (`reka-ui/dist/Select/SelectValue.js`). **No match ⇒ empty trigger**, no fallback text, no `data-placeholder` styling in glass-ui 4.0.0 (`grep -c data-placeholder dist/glass-ui.css` → 0).
- Meanwhile `getEasingFn` (`easings.ts:65-67`) resolves the same unknown name to **`linear`**, silently.

Result: a value the type system cheerfully accepts produces a **blank control that animates as linear** — the two halves of the seam disagree and neither complains.

**Falsifier — and it partially lands.** *"Unreachable: the only writer is this `Select`, whose items are all catalog strings; `DEFAULT_MORPH_CONFIG` seeds `"linear"` (`useFourierMorph.ts:66-68`); `FourierMorphDemo.vue:107` calls `useMorphConfig()` with no argument; there is no URL/store/import hydration."* Verified — I could find **no in-app path** to an out-of-catalog easing. This is therefore a **contract defect, not a live regression**, and it is graded MAJOR on that basis: `useMorphConfig(initialConfig?: Partial<MorphConfig>)` (`useMorphConfig.ts:41`) is a public seam that accepts any string, and `copyToClipboard` (`:73`) exports the config as JSON explicitly for round-tripping. One `placeholder` attribute and one `keyof typeof EASING_PRESETS` union close it.

---

### C-7 · MAJOR · The "Morph" instance ships a 22-item easing catalog for a phase whose default *and minimum* duration is ~3 frames
`MorphPhaseConfig.vue:24-26` (`min=50`) · `:94` (clamp floor 50) · `useFourierMorph.ts:62` (`morphMs: 50`) · `:122-141`

`DEFAULT_MORPH_CONFIG.morphMs = 50`, and the component's floor is also **50** — so the Morph card is *pinned at its minimum by default*. `createTweenAnimation` drives a rAF tick (`useWAAPI: false`, `:132`), so 50 ms ≈ **3 samples at 60 Hz** (6 at 120 Hz). Three samples cannot distinguish 22 easing curves; the entire `Easing` field on that instance (`:34-60`) — 22 items, 22 rendered SVG previews — is decorative at the shipped configuration. The other two cards (`settleOutMs`/`settleInMs` = 150 ⇒ ~9 frames) are marginal.

**Falsifier.** *"The user can raise the duration."* True — 800 ms gives ~48 frames and the control becomes meaningful. The defect is the **default contract**, not the range: the component presents an equally-weighted 22-choice control on all three instances (`FourierMorphDemo.vue:26,36,46`) with no signal that on one of them the choice is inert at rest. Second falsifier — *"3 frames is an assumption about refresh rate"*: the frame count is source-derived from `useWAAPI:false` + `duration:50`; the **visual** claim (that the curves are indistinguishable) is **UNPROVEN-NEEDS-LIVE** and flagged for SS-13.

---

## §3 — MINOR

### C-8 · MINOR · The leaf imports three pure constants through a composable barrel, dragging glass-ui's root barrel and keyframes.js into its own module graph
`MorphPhaseConfig.vue:74-78` · `useMorphConfig.ts:9, 10-13, 14-18, 20`

`useMorphConfig.ts:20` is a **pure re-export** — `export { EASING_PRESETS, EASING_PRESET_NAMES, DEFAULT_MORPH_CONFIG, easingCurvePath }` — whose true home is `@/lib/easings`. Importing through it (`:78`) makes the component's static graph include `@mkbabb/glass-ui` root barrel (`useMorphConfig.ts:9`, `dist/glass-ui.js`, 36 KB of re-export glue over 60 import statements) and `@mkbabb/keyframes.js` + `@/lib/svg-fourier` (via `:10-13`). Importing from `@/lib/easings` directly reduces the leaf's producer coupling to **value.js alone**.

**Falsifier — mostly lands.** glass-ui declares `sideEffects: ["*.css"]`, so the JS barrel is tree-shakable, and `MorphPhaseConfig` has exactly **one** consumer (`FourierMorphDemo.vue:89`) which imports `useMorphConfig` anyway — so the `/morph` route chunk is unchanged either way. Net bundle impact ≈ 0. The residual defect is **module hygiene**: a presentational leaf cannot be lifted into another view without dragging the morph engine, and `vite.config.ts:56-64`'s `manualChunks` reasoning ("vendor-math: value.js + katex", "vendor-keyframes: animation runtime") is undermined by a leaf that couples all three. MINOR, correctly.

### C-9 · MINOR · `easingCurvePath` re-samples 550 easing evaluations per dropdown open; the sibling catalog in the same file is memoized
`MorphPhaseConfig.vue:49` · `lib/easings.ts:99-109` vs `:115-127`

`easings.ts` already ships the cache idiom — `_svgCache: Map` + `getEasingSVGPath` (`:99-109`) — for `ANIMATION_EASINGS`. The morph catalog's `easingCurvePath` (`:115-127`) has none, and is called from a template `v-for` over 22 items (`:42-49`), each sampling 25 points and concatenating a path string: **550 easing evaluations + 550 `toFixed`-free string appends** per render of the content. `EASING_PRESETS` is frozen at module scope, so every one of them is recomputing a constant.

**Falsifier — lands partially.** glass-ui's `SelectContent` renders through reka's `SelectPortal` with presence gating (no `forceMount`), so the `v-for` mounts only while the dropdown is **open**, not on every parent render. Cost is per-open, not per-frame — hence MINOR, not MAJOR. It remains a pure-waste recompute of a module constant, with the fix already written 15 lines above it in the same file.

### C-10 · MINOR · The `[50, 800, 10]` domain is triplicated and unparameterized; the component cannot express a per-phase range
`MorphPhaseConfig.vue:14-16` (input `min`/`max`/`step`) · `:24-26` (Slider) · `:94` (JS clamp)

Three independent spellings of the same domain, none derived from `MorphConfig`. A future divergence (e.g. Morph legitimately wanting 10–200 ms — see C-7) silently desyncs the input from the slider from the clamp. The props contract (`:80-86`) exposes `title`, `description`, `duration`, `easing`, `sliderColor` — and no `min`/`max`/`step`, despite the component being instantiated three times with semantically different phases.

**Falsifier.** *"All three phases share the range, so duplication is harmless."* True today (`FourierMorphDemo.vue:26-54` passes no range). It is a contract-surface gap, not a live bug — MINOR.

### C-11 · MINOR · `easing` is typed `string` on both the prop and the emit, where a free union exists
`MorphPhaseConfig.vue:84`, `:90` · `lib/easings.ts:62`

`EASING_PRESET_NAMES = Object.keys(EASING_PRESETS)` yields `string[]`; `keyof typeof EASING_PRESETS` is available at zero cost and would make C-6 a compile error at every writer. `MorphConfig`'s three easing fields (`useFourierMorph.ts:53-55`) are `string` for the same reason. **Falsifier**: *"the catalog is keyed by `Record<string, EasingPreset>` so the union degenerates to `string`."* Correct as written — which is itself the defect: `EASING_LABELS` (`easings.ts:29-52`) is a `Record<string, string>` annotation over an object literal whose keys are statically known; dropping the annotation (or `as const satisfies`) recovers the 22-member union throughout.

### C-12 · MINOR · `arr[0]` on a payload the producer types `number[] | undefined`; vue-tsc measured *not* to flag it
`MorphPhaseConfig.vue:99-102` · glass-ui `dist/components/ui/slider/Slider.vue.d.ts:19`

`"update:modelValue": (payload: number[] | undefined) => any`. The setter is `set: (arr) => emitDuration(String(arr[0] ?? 50))` — `arr[0]` on `undefined` throws `TypeError`. The `?? 50` guards an *empty array*, not an absent one. Measured: `vue-tsc 3.3.5` reports **no error** for this `v-model` (harness §Method-1, with the sanity probe proving the harness does catch prop-type violations) — so there is no compile-time guard.

**Falsifier — largely lands.** The component always supplies `[props.duration]` via the getter (`:100`), and glass-ui forwards reka's `SliderRoot` emit, which in practice always carries a concrete array. The `| undefined` is reka's uncontrolled-mode artifact. Latent type-contract hazard, not a reachable crash — MINOR.

### C-13 · MINOR · keyframes.js 4.3.0 hard-depends on `@mkbabb/value.js: ^0.13.0` — the F.W2 bump duplicates value.js
`web/node_modules/@mkbabb/keyframes.js/package.json` (`dependencies`) · `dist/keyframes.d.ts:13`

`{"@mkbabb/parse-that":"^0.9.0","@mkbabb/value.js":"^0.13.0"}` — a hard dependency, no peer range. And `keyframes.d.ts:13` is literally `import { timingFunctions } from '@mkbabb/value.js'`, with `TimingFunctionNames = keyof typeof timingFunctions` (`:3712`) — keyframes 4.3 consumes **the exact root-barrel symbol C-2 shows value.js 4.0.0 deleted**. Bumping fourier's value.js to 4.x without bumping keyframes installs **both** 0.13.0 (nested) and 4.x (hoisted), and keyframes' own type surface breaks. The census records the producers at keyframes 6.0.0 — the bump must be lockstep, and this component's easing seam sits on the fault line.

**Falsifier.** *"Not this component's problem."* Fair for ownership; in scope for this axis, which is the migration surface. MINOR **for the leaf**, and it is the reason C-2's repair cannot be a one-file specifier rewrite.

### C-14 · MINOR (seam: MAJOR) · The emitted `duration`+`easing` never reach keyframes.js — the engine is used as a bare rAF ticker
`useFourierMorph.ts:122-141`, `:162-164`

Both of this component's emits terminate here, and the terminus discards the library:

```ts
130:     timingFunction: "linear",       // ← the easing slot, hardcoded
132:     useWAAPI: false,
135:     a.addFrame("0%", { v: "0px" }, (_vars, time) => { onTick(min(time / duration, 1)) });
139:     a.addFrame("100%", { v: "1px" });   // ← interpolated value never read
```

The `{v: "0px"} → {v: "1px"}` frame pair exists only to make keyframes tick; its interpolated output is thrown away, and the easing is applied by hand via value.js (`:162-164`). keyframes 4.3 accepts easing **names** natively — `timingFunction: TimingFunction | Easing | TimingFunctionNames | string` (`keyframes.d.ts:1983`) — so `new Animation({ duration: settleOutMs, timingFunction: settleOutEasing })` is the direct expression of exactly what `MorphPhaseConfig` emits.

**Falsifier.** *"Manual easing is needed because the tween drives a non-CSS quantity (harmonic level)."* Partly true — but `addFrame`'s own `transform` callback receives the eased time, and `timingFunction` is a per-frame parameter (`:273`), so the library supports this shape directly. MINOR against the leaf (it emits correctly); the defect is the seam.

---

## §4 — INFO

- **C-15** · `MorphPhaseConfig.vue:8` and `:35` — neither `<label>` has `for`, and neither wraps its control, so the `type="number"` input has **no accessible name** (the Slider does, via `aria-label`, `:27`). glass-ui 4.0.0 exports a `./labeled-field` subpath, unconsumed here. *Falsifier: partly another lane's axis (a11y); reported here only as an unconsumed-glass-ui-surface fact.*
- **C-16** · `:94` — `Number(raw) || 50` maps both `"0"` and `""` to 50 via falsiness rather than by clamping. Harmless (the floor is 50) but the idiom hides the real intent and would misbehave the moment `min` drops below 1.
- **C-17** · `:13` — `@change` (commit on blur/Enter) not `@input`, so the slider and the number field are on different commit cadences within one control group. Deliberate-looking; interacts with C-4.
- **C-18** · `:49`/`:200-202` — measured back-easing extrema `v ∈ [−0.0966, 1.0926]` map to `y ∈ [0.519, 19.546]` in the 20-unit viewBox, but `stroke-width="1.5"` (`:52`) centers ±0.75, so ~0.3 px of the stroke edge clips at 1:1 rendering. Sub-pixel; noted for completeness.
- **C-19** · No fourier-API coupling anywhere in the closure — see S-6.
- **C-20** · `useMorphConfig.ts:9` imports `useClipboard` from the **root barrel**, which reads like a subpath-discipline lapse. It is not: glass-ui 4.0.0's export map has **80 subpaths and none of them exports `useClipboard`** (`grep` over `package.json.exports` for `clip|util|composab|hook` → empty). The consumer is doing the only thing available; the gap is **upstream** (glass-ui needs a `./clipboard` or `./composables` subpath). Booked as a producer finding, not a consumer defect — and it is the sole reason C-8's graph inflation exists.

---

## §5 — SUPERLATIVES (L-18, same evidentiary bar)

- **S-1 · The 22-name catalog is *exactly* value.js's kebab surface — 22/22, zero dead names, across both majors.** Measured against 0.13.0's `timingFunctions`: every one of `linear, ease-{in,out,in-out}, ease-{in,out,in-out}-{back,quad,cubic,sine,expo,circ}` is present, so `EASING_PRESETS[name].fn` is never `undefined` and the `as EasingFn` cast at `easings.ts:58` — which *looks* like the classic silent-degradation hole — is in fact sound. Re-measured against the producer's 4.0.0 `easing()`: **22/22 still resolve**. *Falsifier applied: I specifically hunted for a name in `EASING_LABELS` absent from `timingFunctions`, which would have made `easingCurvePath` render a flat identity line with no error. There is none.*
- **S-2 · The `v-for` source is derived, not hand-listed.** `EASING_PRESET_NAMES = Object.keys(EASING_PRESETS)` (`easings.ts:62`), so the unguarded `presets[name].label` at `:55` **cannot** miss — the iteration set and the lookup set are the same object by construction. *Falsifier: a hand-maintained name array beside a record is the usual shape of this bug; it is not what the tree does.*
- **S-3 · The scalar↔array impedance is handled at the boundary, documented, and independently blessed.** `durationModel` (`:98-102`) with the `A.W2.c` provenance comment is the correct adapter posture; `lane-frontend.md §4` reached the same verdict for the sibling wrappers ("thin API-shape adapters, not shadows … the correct posture — keep"). *Falsifier: the adapter could have leaked the array upward into the emit contract; it does not — `update:duration` stays scalar (`:89`).*
- **S-4 · The preview viewBox was sized for the overshoot.** `viewBox="0 0 40 20"` with `y = 18 − 16v` and `x = 2 + 36t` (`easings.ts:120-124`) — measured back-easing range `v ∈ [−0.0966, 1.0926]` lands at `y ∈ [0.519, 19.546]`, inside the box with margin. Someone did this arithmetic. *Falsifier: I computed the extrema expecting a clip; the geometry survives (modulo the 0.3 px stroke edge, C-18).*
- **S-5 · Subpath-clean glass-ui consumption at the leaf.** `@mkbabb/glass-ui/select` and `/slider` (`:66-73`), never the root barrel; **zero** direct `reka-ui` imports; **zero** local shadcn copies. The census's headline — "the cleanest glass-ui consumer posture in the constellation" — holds under inspection at this file. *Falsifier: the root barrel does enter via `useMorphConfig.ts:9` (C-8), but that is forced by glass-ui's own export map (C-20), not by this file.*
- **S-6 · A genuinely presentational leaf: zero API coupling.** No `@/lib/api`, no `fetch`, no Pinia store anywhere in the closure; shape data arrives as static JSON through the parent (`FourierMorphDemo.vue:95-96`). Nothing in the 45-operation surface, and none of the R6 operation↔client-leaf couplings, can reach it. *Falsifier: I traced all four direct imports and all six transitive modules to termination; the deepest producer edge is value.js's easing record.*
- **S-7 · The working tree typechecks clean.** `vue-tsc 3.3.5` over `MorphPhaseConfig.vue` + `FourierMorphDemo.vue` + `env.d.ts`: **no diagnostics** (harness sanity-proved). *Falsifier — and this is the sting: it is exactly this green that lets C-1 ship. CSS custom-property names have no type surface, so 4 dead tokens, 23 repo-wide, are invisible to every gate the project runs.*

---

## §6 — Corpus reconciliation

| Corpus row | Disposition here |
|---|---|
| `lane-frontend.md` — "All 11 `glass-scrubber` … prose comments only … `MorphPhaseConfig.vue:98,204`" | **CONTRADICTED IN PART.** The two cited lines *are* comments; the sweep tested `glass-*` **class** tokens and missed the adjacent `--slider-scrub-*` **custom-property** namespace at `:207-210`, which are live and dead. See C-1. |
| `lane-frontend.md` — `MorphPhaseConfig.vue` 212 lines, "Phase/duration `Select` + `Slider`" | **CONFIRMED**, exact. |
| `lane-frontend.md §4` — bespoke wrappers are "thin API-shape adapters … the correct posture — keep" | **EXTENDED** to this file's `durationModel`. See S-3. |
| `lane-frontend.md` — 7 root-barrel `@mkbabb/glass-ui` occurrences | **CONFIRMED + RE-ATTRIBUTED**: for `useClipboard` there is no subpath to use. Upstream gap. See C-20. |
| `CENSUS-2026-08-03.md §1` — value.js surface "5 statements / 4 files / 6 symbols, easing-only … bare-root specifiers that 4.0.0 no longer exports — latent, not live" | **CONFIRMED + EXTENDED**: also `timingFunctions` is absent from `./easing`, i.e. from *every* published entry point — the half with no mechanical repair. See C-2. |
| `CENSUS-2026-08-03.md §1` — pins `value.js ^0.13.0`/0.13.0 · `glass-ui ^4.0.0`/4.0.0 · `keyframes ^4.3.0`/4.3.0; producers 4.0.0 / 7.0.0 / 6.0.0 | **CONFIRMED** against installed `package.json`s. |
| `CENSUS-2026-08-03.md §1` — branch mid-bump, 28 uncommitted paths, WT diff "a pure rename sweep" | **CONFIRMED and sharpened**: the rename sweep is *incomplete* — it renamed the Slider variant and left the four tokens. See C-5, C-1. |
| `intakes/lane-fourier-r3-r6.md` **R3-12** (TRUE) — 35→28 open-family records, 7 duplicates, incl. "`MorphPhaseConfig` easingNames" | **CONFIRMED and explained**: `easingNames` (`:105`) is one `v-for` source rendered by **three** instances (`FourierMorphDemo.vue:26,36,46`), which is precisely why it duplicates in a per-callsite registry. Any denominator built on those rows over-counts this leaf. |
| `intakes/lane-fourier-r3-r6.md` **R3-10** (TRUE) — six live dynamic-`:is` families incl. `FourierMorphDemo:72` | **CONFIRMED** at `FourierMorphDemo.vue:72` (`:is="copied ? Check : ClipboardCopy"`). Not in this component; noted because it is the parent that owns this leaf. |
| `intakes/lane-fourier-r3-r6.md` **X-2** — 9 route records, `/morph` among them | **CONFIRMED**; `/morph` is the lazy route this leaf lives under, which is what bounds C-8's bundle impact. |

---

## §7 — Verdict

The component's **authored surface is good** — derived iteration set, boundary-local array adapter, subpath imports, no API reach, a viewBox sized to real measured extrema, clean typecheck. Seven superlatives survived their falsifiers.

It is nonetheless **DEFECTIVE on the consumption axis**, and both blockers are silent by construction:

- **C-1** — the one thing `sliderColor` exists to do, it does not do. Four custom properties glass-ui has never read in 4.0.0 or 7.0.0; three cards that are supposed to be red/pink/red all render `--primary`. Repairable in one word. Twenty-three instances repo-wide, zero correct ones.
- **C-2/C-3** — the easing catalog rests on a bare-root specifier value.js 4.0.0 no longer offers, on a symbol it no longer exports at all; and once repaired, 8 of 22 curves change shape by up to 0.192 with nothing to announce it.

The through-line is that **every gate this project runs is blind to both**: CSS custom-property names have no type surface, and the value.js drift is name-preserving. C-5 shows the migration already half-applied in the working tree — landing that one-line commit will turn the build green and make C-1 harder to find, not easier.

**Recommended wave order:** C-1 (one-word rename ×4 sites in this file, 6 files repo-wide) → C-5 (land the variant fix *with* C-1, not before) → C-13 + C-2 as one lockstep producer bump → C-3 (pin the 8 drifted presets, or accept with a recorded decision) → C-4 → C-6/C-7 → the MINORs.

**Unproven, needs live (SS-13):** the *visual* indistinguishability claim in C-7; the rendered appearance of the `--primary`-tinted sliders in C-1 (the token deadness itself is proven statically, the resulting paint is not).
