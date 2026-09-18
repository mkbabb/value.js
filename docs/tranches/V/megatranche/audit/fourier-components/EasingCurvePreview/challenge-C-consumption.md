served model id: `claude-opus-5[1m]`

# CHALLENGE — `EasingCurvePreview.vue` · axis **C (CONSUMPTION)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingCurvePreview.vue` (41 lines)
**Sole callsite** `web/src/components/visualization/EasingPicker.vue:30-34` (→ `AnimationControls.vue:119`)
**Read whole, read-only**: the leaf + `@/stores/animation` (146) + `@/lib/easings` (127) + `EasingPicker.vue` (98) + the seam files (`lib/types.ts`, `lib/defaults.ts`, `stores/workspace.ts`, `composables/useWorkspaceLoader.ts`, `api/models/shared.py`, `api/models/visualization.py`) + the two in-tree comparanda (`ui/PathPreview.vue`, `morph/MorphPhaseConfig.vue`) + the installed producer typings (`node_modules/@mkbabb/{value.js,keyframes.js,glass-ui}`).
**No browser tooling.** Every geometric/numeric claim below was re-derived by executing the *installed* `@mkbabb/value.js@0.13.0` easing functions through the tree's own `generateCurveSVGPath` sampler and by hand-evaluating the SVG `meet` scale rule. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Counts** — defects **12** (BLOCKER 0 · MAJOR 6 · MINOR 4 · INFO 2) · superlatives **4**.

**Prior corpus folded, not re-invented**: FE §4 already classes this leaf a **HARD SHADOW** (`lane-frontend.md:409-413`) and CENSUS §3a repeats it (`CENSUS-2026-08-03.md:94-95`); F.W2/F.W3 already own the remedies (`CENSUS:186-192`). This challenge does **not** re-litigate those. It (a) **contradicts one corpus premise** — see D-5 — and (b) adds nine consumption findings the census does not carry, all leaf-local.

---

## §0 — The consumption ledger (what this leaf actually consumes)

| Producer | Pinned | Consumed by this leaf | Depth |
|---|---|---|---|
| `@mkbabb/value.js` | `^0.13.0` (installed **0.13.0**) | **transitively only** — `lib/easings.ts:9,16` bare-root `easeInOutSine/Quad/Cubic/Circ/Expo` + `timingFunctions` | 2 hops (leaf → store barrel → lib) |
| `@mkbabb/keyframes.js` | `^4.3.0` (installed **4.3.0**) | **ZERO**, at every hop. Deliberately excised: `stores/animation.ts:47-50` ("Dead substrate excised") | — |
| `@mkbabb/glass-ui` | `^4.0.0` (installed **4.0.0**) | **ZERO** — the leaf emits a raw `<svg>`/`<path>`; no token, no primitive, no subpath | — |
| fourier API (45 ops) | — | **ZERO direct**; reachable at 3 hops via `anim.easing` (see D-4) | 3 hops |

Two of the four consumption surfaces are **empty**, and the one that is non-empty is reached through a Pinia store barrel rather than the library that owns the symbol. That shape is the spine of everything below.

---

## §1 — DEFECTS

### D-1 · MAJOR — the `color` default is a hard-coded literal that duplicates `--easing-accent` and is dead at the only callsite

**Provenance** `EasingCurvePreview.vue:12` (`color: "hsl(248 88% 71%)"`) · `EasingPicker.vue:49` (`--easing-accent: hsl(248 88% 71%);`) · `EasingPicker.vue:33` (`:color="anim.easing === key ? 'var(--easing-accent)' : 'var(--muted-foreground)'"`).

The same magic colour is written twice, ~40 lines apart, in the two files of one component pair. The picker's copy carries a written carry-note (`EasingPicker.vue:44-47`: "Filed upstream as a glass-ui `--viz-easing` token … the carry lives here because EasingPicker is the sole in-tree consumer"). **That note is false as written**: the literal has a second in-tree home, in the leaf's own prop default, and the note does not name it. When `--viz-easing` lands, a maintainer following the carry-note fixes one of the two sites.

Worse for the axis: the default is **theme-invariant**. Every other colour in the pair routes through a CSS custom property that flips with light/dark (`var(--muted-foreground)`, `var(--border)`, `var(--muted)`). The leaf's default alone cannot. The in-tree sibling with the identical job defaults to `strokeColor: "currentColor"` (`ui/PathPreview.vue:16`) — inheriting the cascade, hence themed for free and needing no token at all.

**Falsifier** — the finding dies if (i) any callsite depends on the default, or (ii) the literal is a token reference. Checked: `grep -rn "EasingCurvePreview" src/` → exactly two hits, both `EasingPicker.vue` (`:4` import, `:30` use), and the use passes `:color` unconditionally, so **the default is unreachable in-tree**; and `hsl(248 88% 71%)` is a literal, not `var(…)`. Both legs fail ⇒ finding stands, and is in fact *sharper* than filed: a dead default that is also the duplicated half of a documented carry.

---

### D-2 · MAJOR — `stroke-width` is in user units, so the advertised `size` knob silently changes the stroke weight

**Provenance** `EasingCurvePreview.vue:29` (`stroke-width="0.15"`, a *user-unit* literal) vs `:21-22` (`:width="size" :height="size * 0.7"`).

`size` is declared optional and typed `number` (`:7`) — advertised as free. But the path's stroke is specified in viewBox units, and under `preserveAspectRatio="…meet"` the user→device scale is a linear function of `size`. Measured (uniform scale `s = min(width/1.1, 0.7·size/1.6)`):

| `size` | scale (px/unit) | rendered stroke |
|---|---|---|
| 10 | 4.375 | **0.66 px** (sub-pixel; hairline/aliased) |
| 28 (default) | 12.25 | 1.84 px |
| 100 | 43.75 | **6.56 px** (the glyph becomes a blob at 0.15 of its own height) |

So `size` is not a size knob; it is a size-*and*-weight knob with no way to hold weight constant. The in-tree sibling solves exactly this, one directory over: `ui/PathPreview.vue:56` binds `:stroke-width="strokeWidth / size"` — stroke declared in **pixels**, divided back into user units, giving a constant device weight at every `size`. The leaf did not adopt it.

**Falsifier** — dies if `size` is contractually fixed. It is not: it is an optional prop of open numeric type, i.e. the component's own contract advertises the variability it cannot honour. (That the sole callsite happens to pass the default — D-11 — makes this latent, not absent: the prop is public API of a component the corpus plans to lift into `glass-ui/easing`, where callers *will* vary it.)

---

### D-3 · MAJOR — viewBox/element aspect mismatch throws away 56% of the width and 37.5% of the height; the padding it buys is provably unreachable

**Provenance** `EasingCurvePreview.vue:19` (`viewBox="-0.05 -0.3 1.1 1.6"`), `:20` (`xMidYMid meet`), `:21-22` (`width = size`, `height = 0.7·size`).

The viewBox is **tall** (aspect 1.1/1.6 = 0.6875); the element is **wide** (aspect 1/0.7 = 1.4286). Under `meet`, the uniform scale is the *minimum* of the two fits, so it is height-bound. At the default `size = 28`:

```
scale        = min(28/1.1, 19.6/1.6) = min(25.45, 12.25) = 12.25 px/unit
curve bbox   = 1.0 × 1.0 user units  → 12.25 × 12.25 px
element box  = 28 × 19.6 px
horizontal ink fraction = 12.25/28 = 43.7 %
area fraction           = 150.1/548.8 = 27.3 %
dead margin  = 7.88 px per side (L/R) · 3.67 px (T/B)
```

A prop named `size` set to `28` therefore paints a **12.25 px** glyph and reserves 28 px of inline layout for it. The wasted 3.67 px top and bottom come from the ±0.3 vertical viewBox padding — headroom for an overshooting curve (back/elastic/bounce). **No such curve can reach this component.** I evaluated all six members of the `easing` prop's union through the tree's own sampler:

| easing | v(0) | v(1) | y = 1−v range over 33 samples |
|---|---|---|---|
| linear | 0 | 1 | [0.0000, 1.0000] |
| sine | −0 | 1 | [0.0000, 1.0000] |
| quad | 0 | 1 | [0.0000, 1.0000] |
| cubic | 0 | 1 | [0.0000, 1.0000] |
| circ | −0 | 1 | [0.0000, 1.0000] |
| expo | 0 | 1 | [0.0000, 1.0000] |

All six are monotone in-out families with range exactly `[0,1]` (`lib/easings.ts:78-84`; the catalog is a closed object literal and the prop type `AnimationEasingName` is a closed union, `:71`). The padding is dead by construction, and it is the *cause* of the height-bound scale.

**Falsifier** — dies if any curve reachable through the prop escapes `[0,1]` (padding load-bearing), or if the element/viewBox aspects agreed (no waste). Measured above: neither. Note the contrast that proves this is a choice, not a constraint: `PathPreview.vue:52` uses `viewBox="0 0 1 1"` with `:width="size" :height="size"` — square-in-square, `meet` a no-op, ink fraction 100%.

---

### D-4 · MAJOR — the `EasingName` union is declared *only* at this leaf; the seam it comes from is an unvalidated `str` on both sides, and the leaf's path lookup is the one read in the chain with no guard

**The corridor, end to end, every hop verified in-tree:**

| # | Site | What it does to the value |
|---|---|---|
| 1 | `api/models/shared.py:69` | `easing: str = "sine"` — **no `Literal`, no enum, no validator**. Pydantic accepts any string. |
| 2 | `api/models/visualization.py:129` | persisted on the converged entity (`animation_settings: AnimationSettings = Field(default_factory=…)`); returned by GET and echoed by the fork/PATCH ops (`api/routers/visualizations.py:136, 193-194, 520-521, 572`). |
| 3 | `web/src/lib/types.ts:48` | client mirror: `easing: string`. |
| 4 | `web/src/stores/workspace.ts:217` (and `:167-170` for the localStorage draft) | `animationSettings.value = { ...defaultAnimationSettings(), ...viz.animation_settings }` — spread, unvalidated. |
| 5 | `web/src/composables/useWorkspaceLoader.ts:56` | `if (as?.easing) anim.easing = as.easing as EasingName;` — **the cast is the only "validation" in the chain, and it is a type lie.** |
| 6 | `web/src/stores/animation.ts:24,28` | ref typed `AnimationEasingName`, now holding a value outside it. The clock read **is guarded**: `ANIMATION_EASINGS[easing.value]?.fn ?? ((x) => x)`. |
| 7 | `web/src/lib/easings.ts:105` | `generateCurveSVGPath(ANIMATION_EASINGS[name].fn)` — **no `?.`, no fallback.** `TypeError: Cannot read properties of undefined (reading 'fn')`, thrown inside a render. |
| 8 | `EasingCurvePreview.vue:6, 26` | the prop declares the union `EasingName` and feeds it straight into hop 7 with no narrowing. |

Two consequences the tree does not handle:

1. **Asymmetric guarding.** The *same table* is read twice, three files apart, with opposite defensiveness: `animation.ts:28` degrades to identity, `easings.ts:105` throws. A component-level `errorCaptured` boundary would be the only thing between an arbitrary persisted string and a blank chip grid. There is none (`grep -rn "errorCaptured\|onErrorCaptured" src/` → 0).
2. **Live silent desync even without the throw.** Because `EasingPicker.vue:26-27` renders active-state as `anim.easing === key`, a stored easing outside the six-name catalog renders **no chip active and no chip `aria-checked`** while the clock quietly runs identity. The radio group asserts "nothing selected" in a set that is `role="menuitemradio"` and therefore must have exactly one. That is live today, no cast-crash needed.

**Reachability, stated honestly.** The *throw* is **latent, not live**: the leaf receives `key` from the `v-for` over `EASING_OPTIONS` (`EasingPicker.vue:20, 31`), always a catalog key. The leaf is exactly **one prop binding away** — `:easing="anim.easing"`, the obvious refactor, and the one any lift into `glass-ui/easing` would perform — from a live unhandled render throw driven by server data. The desync (2) is live now.

**Falsifier** — dies if (i) the server constrains `easing`, (ii) the loader validates, or (iii) `defaultAnimationSettings()` can't be overridden by wire data. Checked: (i) `grep -rn "easing" --include=*.py .` → exactly one model line, a bare `str` default; (ii) the cast at `:56` is the whole of it; (iii) the spread at `workspace.ts:217` puts wire data *after* the defaults. All three legs fail.

**Corpus tie** — this is the leaf-scale instance of intake **R6-8**'s contract lesson (`lane-fourier-r3-r6.md:142`): an operation model that carries derived client back-references cannot attribute a defect to one side of the seam. Here the pathology is the dual: **the domain is declared at the wrong end of the chain.** The only place in six files that knows `easing` has six legal values is a 41-line presentational leaf; the operation record, the client type, and the store hydration path are all strictly wider. F.W5's shared-provenance contract should hoist this union to the operation record (`Literal["linear","sine","quad","cubic","circ","expo"]`) rather than let a preview component carry it.

---

### D-5 · MAJOR — zero glass-ui consumption; **and the corpus's "available only at 7.0.0" premise is too weak — `motion-curves` at the PINNED 4.0.0 already ships the exact symbol set**

**Provenance** `node_modules/@mkbabb/glass-ui/package.json` `exports` — `./motion`, `./motion-core`, **`./motion-curves`** all present at **4.0.0** (the installed pin) · `node_modules/@mkbabb/glass-ui/dist/composables/motion/curves.d.ts:46`:

```ts
export { linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic,
         easeInSine, easeOutSine, easeInOutSine, easeInCirc, easeOutCirc, easeInOutCirc,
         easeInExpo, easeOutExpo, easeInOutExpo, easeInBounce, CSSCubicBezier } from "@mkbabb/value.js";
```

That single line re-exports **every symbol** `lib/easings.ts:10-16` imports bare-root from `@mkbabb/value.js` — `easeInOutSine`, `easeInOutQuad`, `easeInOutCubic`, `easeInOutCirc`, `easeInOutExpo` (and `linear`, which the tree instead re-implements inline as `(t) => t`, `easings.ts:78`). The same module ships `MOTION_CURVES`, a CSS-token↔JS-twin table (`curves.d.ts:36-41`) whose stated purpose is to bind `--ease-*` / `--spring-*` tokens to their callable twins, plus `motionCurve(token)`.

**The contradiction I am filing.** `lane-frontend.md:413` and `CENSUS:94-95` both frame the remedy as gated on the 4→7 uplift ("`./easing` is **ABSENT at 4.0.0** … **ADDED at 7.0.0**"), and `CENSUS:188` schedules F.W2 as "5 bare specifiers → `/easing`". That is true **of the `EasingPicker`/`EasingConfigurator` components**, and I do not contest it. It is **not** true of the *easing functions*: the value.js twin re-export the bare specifiers actually need is available **today, at the pinned version, under a different subpath** (`@mkbabb/glass-ui/motion-curves`). F.W2's value.js-consumption half is therefore **not blocked on F.W1** — the specifier migration can land against glass 4.0.0 and be a no-op at 7.0.0. I recommend the census row be amended to name `./motion-curves` as the 4.0.0-available intermediate.

**Falsifier** — dies if the 4.0.0 `motion-curves` re-export were type-only, or a subset of what `easings.ts` imports. Checked: it is a value re-export (`dist/motion-curves.js` exists alongside the `.d.ts`; the `.d.ts` line is a bare `export {…} from`, not `export type`), and it is a **superset** — the only `easings.ts` import it does not cover is `timingFunctions` (used by `EASING_PRESETS`, `easings.ts:58`, not by this leaf's path).

**And the leaf itself consumes nothing at all**: raw `<svg>`, raw `<path>`, one hard-coded colour, one scoped rule. In a tree the census calls "the deepest, cleanest glass consumer in the constellation — 95 named imports / 21 subpaths / 49 symbols" (`CENSUS:85-87`), this component is a 0-of-0.

---

### D-6 · MAJOR — the prop contract is too narrow to be the tree's curve preview, so the tree grew a second one — with the *same CSS class name*

**Provenance** `EasingCurvePreview.vue:6` (`easing: EasingName`, the **6**-name compact union) vs `morph/MorphPhaseConfig.vue:47-54`:

```html
<svg class="easing-preview" viewBox="0 0 40 20">
    <path :d="easingCurvePath(name)" … />
```

`MorphPhaseConfig` needs previews for the **22**-name `EASING_PRESETS` catalog (`lib/easings.ts:29-60`), typed as bare `string` (`MorphPhaseConfig.vue:84`). It cannot pass those names to `EasingCurvePreview`, because the leaf's prop is welded to `AnimationEasingName` — the *other* catalog, in the *same file*. So the morph surface hand-rolls a parallel implementation: a different generator (`easingCurvePath`, `lib/easings.ts:115-127`), different sampling (24 steps vs 32), a different coordinate system (pixel-space `0 0 40 20` vs normalized), **uncached** (contrast S-2), and — the tell — a scoped class literally named `.easing-preview` (`MorphPhaseConfig.vue:198`), byte-identical in name to the leaf's own (`EasingCurvePreview.vue:37`). Two components in one repo claim the same class name for the same concept and share no code.

Both catalogs and both generators live in **one 127-line file** (`lib/easings.ts`), which makes the duplication a deliberate fork rather than a discovery failure. The narrow prop is the proximate cause: had the leaf taken `fn: EasingFn` (or `path: string`), one component would serve both catalogs and the producer's forthcoming `EasingConfigurator` alike.

**Falsifier** — dies if the two previews are visually or semantically distinct enough to justify separate components. They are not: both draw a monotone 0..1 easing curve as a stroked polyline with `fill="none"`, rounded caps/joins, no axes, no labels. The only substantive differences (normalized vs pixel coords; cached vs not) are places where **one is simply better than the other**, which is the definition of an unwanted fork.

**Corpus tie** — intake **R3-12** (`lane-fourier-r3-r6.md:86`) already counts `MorphPhaseConfig` `easingNames` among the seven duplicated open-family records; this is the component-level mechanism behind that row.

---

### D-7 · MINOR — dependency inversion: a presentational leaf imports a pure function from a Pinia store barrel

**Provenance** `EasingCurvePreview.vue:2` — `import { getEasingSVGPath, type EasingName } from "@/stores/animation";` — where the symbol is *defined* in `@/lib/easings` (`:102`) and merely re-exported by the store (`stores/animation.ts:10-11`, whose own comment concedes the barrel: "Re-export for consumers that import from this module").

`components/visualization/` → `stores/` is the wrong direction for a component whose setup block contains no state, no lifecycle and no store access. The concrete cost is that the leaf's module graph now contains `stores/animation.ts`, whose line 19 is a **module-scope `defineStore(…)` call** — a call expression Rollup will not elide without a purity annotation — dragging pinia + the 146-line store closure into the leaf's reachability set for a function that lives in a dependency-free lib module.

**Falsifier** — dies if the symbol has no non-store home (it does: `lib/easings.ts`), or if the bundle cost is measurable and material. On the second leg I am explicitly **conservative**: the sole callsite already instantiates the store (`EasingPicker.vue:6`), and pinia sits in the always-loaded `vendor-vue` chunk (`vite.config.ts:57`), so today's byte delta is plausibly **zero**. **UNPROVEN-NEEDS-LIVE (SS-13)** for any byte figure — I did not build (write-forbidden). The defect I am filing is the **dependency direction**, which is provable statically and which becomes load-bearing the moment this leaf is lifted out of a store-using host (i.e. at F.W3).

---

### D-8 · MINOR — decorative `<svg>` with no `aria-hidden`, inside a `role="menuitemradio"` whose accessible name is computed from its subtree

**Provenance** `EasingCurvePreview.vue:18-24` (no `aria-hidden`, no `role`, no `<title>`, no `aria-label`) rendered inside `EasingPicker.vue:19-36`, a `Button` carrying `role="menuitemradio"` (`:24`) whose visible label is the sibling `<span class="easing-chip-label">` (`:35`).

The glyph is 100% decorative — it encodes nothing the label does not. It is also the *first* child node of the radio, so it participates in the name-from-content walk. `EasingPicker`'s own header comment (`:10-15`) is an unusually careful ARIA rationale ("`aria-pressed` would mislabel a radio as a toggle"), and the repo runs `@axe-core/playwright` (`package.json` devDeps) — this leaf is the un-swept corner of an otherwise fastidious surface.

**Honest scoping**: the tree applies `aria-hidden="true"` to decorative **lucide icon components** at 15+ sites (`GalleryView.vue:323,340,350`; `AdminFlaggedPanel.vue:173,206,216,226,233,257`; `GalleryAdminBanner.vue:30,39`; `AdminUserList.vue:241,319,328,337`) but to **none** of its ~12 hand-written `<svg>` surfaces (`PathPreview.vue:48`, `ContourPreview.vue:36`, `MorphPhaseConfig.vue:47` all likewise omit it). So this is a tree-wide pattern gap that this leaf instantiates — not a unique breach. It is filed here because this is the **only** one of the twelve that lands inside a role whose name is computed from content.

**Falsifier** — dies if the accessible name of the chip is unaffected in real AT. Static reasoning says the name resolves from the label text and the `<svg>` contributes the empty string; some AT (VoiceOver/Safari) expose an untitled `<svg>` as a `graphics-document` node regardless. **UNPROVEN-NEEDS-LIVE (SS-13)** for the accname effect; the omission itself is static fact. One-attribute fix; the component already has a single root, so a caller *could* pass `aria-hidden` through fallthrough attrs — the caller doesn't (`EasingPicker.vue:30-34`).

---

### D-9 · MINOR — 461 bytes of path data per 12.25 px glyph; 0.383 px per segment; `linear` emits 33 collinear points

**Provenance** `lib/easings.ts:89-97` (`generateCurveSVGPath`, `n = 32`, `toFixed(3)`), consumed at `EasingCurvePreview.vue:26`. Measured by executing the real sampler over the real installed easings:

- `d.length` = **461 chars** for every one of the six curves; **2 766 chars** of `d` attribute for the six-chip grid.
- 33 points across a **12.25 px** rendered span (D-3) ⇒ **0.383 px per segment** — ~2.6 segments per device pixel at 1× DPR, ~0.9 at 3×.
- `toFixed(3)` on normalized coordinates ⇒ a quantum of **0.001 user units = 0.0123 px** at the rendered scale — ~80× finer than a 1× device pixel, ~27× finer than a 3× one. Every coordinate carries ~2 digits of pure noise.
- `linear` (`easings.ts:78`, `(t) => t`) produces **33 exactly collinear points** where `M 0,1 L 1,0` (11 chars) is pixel-identical.

None of this is a performance emergency (the cache, S-2, makes it a one-time cost). It is a *fidelity/consumption* point: the tree hand-rolls a polyline sampler when the curve family it is drawing is analytic, and when the pinned producer already ships `CSSCubicBezier` (`glass-ui/motion-curves` → value.js, `curves.d.ts:46`) — i.e. the bezier control points are available, so five of the six curves have exact 1-segment `C` representations.

**Falsifier** — dies if 32 segments are needed for visual fidelity at the rendered size. At 12.25 px, halving to `n = 16` yields 0.77 px segments — still sub-pixel — and the maximum chord error for these C¹ families over a 1/16 span is well under a tenth of a device pixel. The sampler is over-specified by ≥2× on its own terms, and by ~16× against a bezier form.

---

### D-10 · MINOR — prop naming and Vue-idiom drift against the tree's own conventions

**Provenance** three drifts, each with an in-tree comparand:

1. **`color` vs `strokeColor`** — `EasingCurvePreview.vue:8` names the prop `color`; it is bound *only* to `stroke` (`:28`), with `fill="none"` hard-set (`:27`). `PathPreview.vue:10` names the identical prop `strokeColor`. `color` in an SVG context is a live CSS keyword (`currentColor`'s source) and reads as "fill and/or text", not "stroke".
2. **`withDefaults` vs destructured props** — `EasingCurvePreview.vue:4-14` uses `withDefaults(defineProps<…>(), {…})`. Tree census: **9** files use `withDefaults`, **27** use the Vue 3.5 destructure form (`const { … } = defineProps<…>()`). The leaf sits with the minority idiom.
3. **Duplicated scoped rule** — `EasingCurvePreview.vue:37-40` (`.easing-preview { display: block; flex-shrink: 0; }`) is **body-identical** to `PathPreview.vue:65-68` (`.path-preview { display: block; flex-shrink: 0; }`). Two scoped copies of the same two-declaration preview shim.

**Falsifier** — dies if the naming is enforced by a producer contract (it is not; no glass-ui primitive is consumed, D-5) or if `withDefaults` is the house rule (the 9:27 split says otherwise). Each is individually trivial; together they are the signature of a component written *beside* the tree's conventions rather than within them — which is the same signature the census reads as "fourth fork".

---

### D-11 · INFO — both optional props are degenerate at the only callsite: the variability surface is speculative

**Provenance** `EasingPicker.vue:31-33` passes `:easing` (required), `:size="28"` — **restating the default verbatim** (`EasingCurvePreview.vue:11`) — and `:color` unconditionally, so the `color` default never executes (D-1). Of the component's three props, one is load-bearing, one is passed as its own default, and one has a dead default.

Consequence: **every** claim about `size` (D-2, D-3) is untested by any live callsite, and the aspect-ratio and stroke-scaling bugs would only surface the first time someone passes `size = 16` or `size = 48`. The prop surface is advertised generality with zero exercised variance.

**Falsifier** — dies if a second consumer exists. `grep -rn "EasingCurvePreview" src/` → 2 hits, both `EasingPicker.vue`.

---

### D-12 · INFO — the module-global `_svgCache` is keyed by name alone and never invalidated

**Provenance** `lib/easings.ts:99` (`const _svgCache = new Map<AnimationEasingName, string>()`), `:102-109`.

Correct today: the catalog is a frozen object literal, so name ⇒ curve is a total function. It becomes a stale-render bug the instant a curve is user-configurable — which is precisely the direction the producer has taken (`glass-ui/easing` exports `EasingConfigurator` at 7.0.0, per `lane-frontend.md:409`) and the direction `MOTION_CURVES`' token-keyed table implies. Filed as INFO with a forward carry: **any F.W3 lift of this leaf onto a configurable curve source must key or clear this cache**, or previews will freeze at their first-painted shape.

**Falsifier** — dies if the catalog can already vary at runtime. It cannot: `ANIMATION_EASINGS` is a `const` object literal with no mutation site (`grep -rn "ANIMATION_EASINGS\[" src/` → 3 reads, 0 writes).

---

## §2 — SUPERLATIVES (L-18, run the other way)

### S-1 · The glyph and the clock read the *same function object* — the preview provably cannot lie

`stores/animation.ts:28` computes `easedT` from `ANIMATION_EASINGS[easing.value]?.fn`; `lib/easings.ts:105` generates the preview path from `ANIMATION_EASINGS[name].fn`. **One table, one row, one function reference.** There is no preview-only curve model, no duplicated coefficients, no CSS `cubic-bezier()` twin that could drift from the JS driver. Whatever the chip draws is, by construction, the exact function the rAF clock will apply.

This is the single most valuable property a curve preview can have, and most implementations lose it. **Falsifier**: a second catalog or a re-derived curve for display. Absent here — and *present* in the sibling (`MorphPhaseConfig.vue:49` draws through the separate `easingCurvePath`/`EASING_PRESETS` pair, D-6), which is what makes this leaf's fidelity a real distinction rather than an accident.

### S-2 · Memoized paths make a six-chip grid that re-renders on every selection cost six Map hits

`lib/easings.ts:99-109` caches by name. This matters more than it looks: `EasingPicker.vue:33` binds `:color` to a ternary on `anim.easing`, so **selecting any easing invalidates the colour binding of all six chips** and re-runs all six render functions. Without the cache that is 6 × 33 = **198 easing evaluations plus 2 766 chars of string building, per click**. With it: six `Map.get` calls, forever after the first paint.

**Falsifier**: an uncached generator would show the cost. One exists in-tree for contrast — `easingCurvePath` (`easings.ts:115-127`) recomputes 25 points per name per render at `MorphPhaseConfig.vue:49`, over a 22-name catalog.

### S-3 · Genuine presentational purity — 41 lines, output a pure function of props, trivially liftable

No store access, no `use*()` composable, no lifecycle hook, no watcher, no emit, no `ref`, single root element, no fallthrough-attr suppression. The setup block is a `defineProps` and nothing else. Given `(easing, size, color)` the rendered DOM is deterministic and side-effect-free.

That purity is exactly what makes the census's F.W3 remedy cheap: retiring this fork into `glass-ui/easing` is a delete-and-rebind, with no state to untangle. **Falsifier**: any store read or side effect in setup — there is none; the *only* impurity is the import path it reaches through (D-7), not the component body.

### S-4 · Normalized-coordinate, resolution-independent path — the right substrate, badly framed

The path is generated in a normalized `[0,1]²` space (`easings.ts:94`, `t` and `1-v` both normalized) and mapped to the device through `viewBox` + `preserveAspectRatio`, not baked into pixel coordinates. Consequences: one cached path serves every `size`; the glyph is DPR-clean at any scale with no `vector-effect` needed; and re-sizing costs zero recomputation.

The in-tree comparand shows what the alternative looks like: `easingCurvePath` (`easings.ts:115-127`) hard-codes a 40×20 pixel frame with literal `2 + t*36` / `18 - v*16` arithmetic, locking that preview to one size forever.

**Stated precisely against D-3** — these do not conflict. The *coordinate substrate* is right and better than the sibling's; the *viewBox framing wrapped around it* (a tall box in a wide element, padded for curves that cannot occur) is what throws away 56% of the width. Fixing D-3 is a two-attribute edit (`viewBox="-0.05 -0.05 1.1 1.1"` + `:height="size"`) precisely **because** S-4 is true. **Falsifier**: pixel coordinates anywhere in the emitted `d` — measured, all coordinates lie in `[0,1]`.

---

## §3 — Verdict and carries

The component is **DEFECTIVE on the consumption axis, and defective in a specific, diagnosable way**: it consumes *nothing* from three of the four producers it is nominally a client of (glass-ui 0 symbols, keyframes 0 symbols, API 0 direct), reaches its one real producer (value.js 0.13) through a Pinia store barrel two hops away, and carries a props contract (`color`, `size`, `easing: EasingName`) that is simultaneously **too narrow** to serve the tree's second easing catalog (D-6) and **too wide** to be honoured — `size` cannot be varied without breaking stroke weight (D-2), and the geometry throws away most of whatever `size` it is given (D-3). The type-domain question is the serious one: the six-name union exists **only** on this leaf's prop, while the value crosses the API seam as a bare `str` on both sides and is force-cast into the union by `as` (D-4).

Its virtues are real and worth preserving through the F.W3 lift: single-catalog fidelity (S-1), memoized paths (S-2), presentational purity (S-3), normalized coordinates (S-4).

**Carries filed:**

| ID | Carry | Wave |
|---|---|---|
| C-a | **Amend the census**: `@mkbabb/glass-ui/motion-curves` exists at the **pinned 4.0.0** and re-exports all five easing symbols `lib/easings.ts` imports bare-root. F.W2's specifier migration is **not** blocked on the F.W1 4→7 uplift. (D-5) | **F.W2** |
| C-b | Hoist the easing domain to the operation record — `Literal[…]` on `api/models/shared.py:69`, mirrored in `lib/types.ts:48` — and delete the `as EasingName` at `useWorkspaceLoader.ts:56`; guard `easings.ts:105` to match `animation.ts:28`. R6-8's dual. (D-4) | **F.W5** (contract) / **F.W6** (burn-down) |
| C-c | The lift into `glass-ui/easing` must take a curve **function or path**, not a name from one private catalog, or the morph fork (D-6) survives the retirement. (D-6, D-12) | **F.W3** |
| C-d | Geometry + stroke + `currentColor` fixes are a 4-line edit and should land with the lift, not before it (do not harden a component slated for deletion). (D-1, D-2, D-3, D-10) | **F.W3** |
| C-e | `--easing-accent` has **two** in-tree homes, not one; the carry-note at `EasingPicker.vue:44-47` under-reports. Correct it in the glass BH relay. (D-1) | **F.W3** relay |
