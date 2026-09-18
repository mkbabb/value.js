claude-opus-5[1m]

# CHALLENGE C — `ContourSettings.vue` · CONSUMPTION axis

> **Subject** `fourier-analysis/web/src/components/visualization/ContourSettings.vue` (470 lines,
> committed clean at HEAD — **not** among the 24 dirty in-scope paths).
> **Axis** C — how this component consumes value.js `0.13.0` (the F.W2 migration surface: bare
> specifiers, the hand-rolled `colors.ts` arms), keyframes.js `4.3.0`, glass-ui `^4.0.0`, and the
> fourier API's 45-operation surface (operation↔client leaf coupling, R6-8, where reachable);
> props/emits contract quality; integration seams.
> **Substrate** fourier `m/w1-bump-migration @ cd26c6533adc32dfe1453d74117d3cb73b89ea16` (tree
> `9a66411d…`, verified live) · value.js `tranche-u @ c654824e`. Installed: glass-ui 4.0.0 ·
> keyframes.js 4.3.0 · value.js 0.13.0 · reka-ui 2.9.10 · tw-animate-css 1.4.0.
> **Method** static + source-derived only. Every producer claim is verified against the **installed**
> `node_modules` `.d.ts` **and compiled JS**, never against memory or a changelog; every backend
> claim against `api/` + `src/fourier_analysis/` bytes. No browser tooling; livable-only claims are
> marked **UNPROVEN-NEEDS-LIVE** for SS-13.
> **Posture** the component is DEFECTIVE until the tree proves otherwise. Each row carries its own
> falsifier; L-18 runs both ways, so §7 books what survived my attempts to break it.

**Read whole (read-only):** the subject; `stores/workspace.ts` (471); `lib/{types,defaults,colors,api}.ts`;
`components/ui/SliderControl.vue`; `components/ui/tooltip/{Tooltip.vue,index.ts}`;
`visualization/VisualizationView.vue` (mount sites); `visualization/composables/useWorkspaceLoader.ts`;
`visualization/BasisSelector.vue` (contrast); `composables/useToast.ts`; `src/style.css`; `src/main.ts`;
`web/package.json`; `e2e/{contour-extraction,settings-persistence}.spec.ts`;
`api/routers/images.py`, `api/models/{shared,computation,assets}.py`, `api/services/image_storage.py`;
`src/fourier_analysis/contours/{models,extraction,processing,ml,isolation,masks,structure}.py`;
and inside `web/node_modules/`: glass-ui `package.json` (80-key exports map),
`dist/components/custom/configurator/*.d.ts`, `dist/components/ui/{select,collapsible,button}/*.d.ts`,
compiled `dist/SelectScrollDownButton-C1jb3b3K.js`, `dist/CollapsibleContent-C_s6fG7r.js`,
`dist/styles/{index,animations}.css`, `dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`,
`dist/styles/utilities/btn.css`; reka-ui `dist/Select/{SelectRoot,SelectItem}.js`,
`dist/Popper/PopperRoot.js`; tw-animate-css `dist/tw-animate.css`.

---

## §0 — Ledger

| # | Severity | Row |
|---|---|---|
| **C-1** | **BLOCKER** | **The ML Threshold slider is inert.** The server's extraction cache key omits `ml_threshold`/`ml_detail_threshold` — the two fields it is the sole producer of. Every move after the first extraction returns the cached contour. |
| **C-2** | **BLOCKER** | **"Min Area %" is a unit-contract violation.** The field is a *fraction* of image area clamped to `[0,1]`; the slider runs `0…20` at `step 0.5`. The first detent off zero means **50 % of the image**; everything ≥ 1 clamps to 100 % → `422 No contours extracted`. |
| **C-3** | **BLOCKER** | **The retry banner can never render.** A parent pre-watcher (`useWorkspaceLoader.ts:130`) nulls `store.error` in the same flush, before this child re-renders. ~50 lines of template + CSS + a computed are unreachable, and the panel's only recovery affordance with it. |
| **C-4** | **BLOCKER** | `runCompute()` is fire-and-forget over a **rethrowing** store action → an unhandled promise rejection on every extraction failure, including the 422 that C-2 manufactures. |
| **C-5** | **BLOCKER** (FOLD) | The pinned value.js 0.13.0 is **invalid** against glass-ui 4.0.0's declared peer range — `npm ls` exits `ELSPROBLEMS`. Re-measured here; carried from the AnimationControls lane. |
| C-6 | MAJOR | The six local refs latch `store.contourSettings` **at mount and never re-sync**. The store is the declared source of truth; this component only ever writes back. A workspace switch without unmount clobbers the freshly-loaded draft with the previous image's settings. |
| C-7 | MAJOR | `max_contours: null` — the legal "All" value — **cannot survive a remount**: three `??` sites treat the null as absent and snap to 24. |
| C-8 | MAJOR | The 60–90 char strategy description rides **inside** reka's `SelectItemText`, so it becomes the option's accessible name *and* the typeahead corpus. glass-ui 4.0.0 ships a `description` slot that renders outside it. |
| C-9 | MAJOR | Both mount sites bind `v-model:n-harmonics` / `v-model:n-points` over a component with **zero `defineEmits`**. The sibling that shares the same two v-models honours the contract with real emits. |
| C-10 | MAJOR | `smooth_contours: smoothContours.value as any` — the file's only type hole, on the one field the backend clamps, where both sides already declare `number`. |
| C-11 | MAJOR | Zero value.js consumption. The component's **sole** colour input flows through a 117-line hand-rolled regex resolver with no `oklch()` arm, against a glass-ui 4.0.0 token cascade that is oklch-native; four of its five resolved arms return `#888888`. |
| C-12 | MAJOR | The reset affordance is hand-rolled (`isDefault` + `resetDefaults`, 15 lines) where glass-ui 4.0.0 ships `useConfiguratorState<T>` (`isDirty` + `resetCurrent()`) and `ConfiguratorRow`'s `canReset` + `@reset`. |
| C-13 | MAJOR | `lucide-vue-next` is imported at runtime (`:20`) but declared in **`devDependencies`**; so are `reka-ui`, `clsx`, `class-variance-authority`, `tailwind-merge`. |
| C-14 | MINOR | `<Select class="w-full">` is a **dead attribute** — reka's `SelectRoot` renders `PopperRoot` → `renderSlot` only; there is no element for the class to land on. |
| C-15 | MINOR | `.advanced-content`'s scoped `animation:` re-declares a reveal glass-ui's own `CollapsibleContent` already hard-codes; the file's provenance comment names the wrong mechanism. |
| C-16 | MINOR | `.reset-icon-btn` hand-rolls seven declarations that `buttonVariants({ variant:"ghost", size:"icon" })` already ships — on a `<Button>` that is already asking for exactly that pair. |
| C-17 | MINOR | Five of the six Tooltips anchor on a non-focusable `<div>` root → hover/touch only, keyboard-invisible. |
| C-18 | MINOR | `ml_detail_threshold: mlThreshold.value * 0.6` — an invented coupling that makes an independent contract field unsettable and silently overwrites any persisted value. |
| C-19 | MINOR | Two parallel `Record<string,string>` maps over a closed 7-member vocabulary, with no shared type; `adaptive_threshold` — a shipped strategy — is unreachable from the picker. |
| C-20 | MINOR | `CONTOUR_DEFAULTS.max_contours ?? 16` — a dead fallback, triplicated. |
| C-21 | MINOR | The suppress machinery (2 module `let`s + 4 watchers + a `queueMicrotask`) **releases itself one microtask after it arms**, because the release watcher tracks the same deps that set the flag. |
| C-22 | MINOR | Store state is written directly from the component twice (`:108`, `:112`) where every other transport verb on this store is an action. |
| C-23 | INFO | Four of the six controls, the reset, the Advanced reveal and the retry banner have **zero** e2e coverage — which is why C-1/C-2 shipped. |
| C-24 | INFO | Fold + independent re-verification of intake **R3-7a**: exactly 6 `<Tooltip` callsites in this file. |
| C-25 | INFO | Fold of intake **R6-8**: C-1 is a live instance of the operation↔client non-isolation the row abstracts. |

**25 findings · 5 BLOCKER · 8 MAJOR · 9 MINOR · 3 INFO · 6 superlatives (§7).**

---

## §1 — The fourier API seam (45 operations; the two leaves this component owns)

This component is the **sole** client of `POST /api/images/{imageSlug}/extract-contour` in the tree
(`lib/api.ts:300-312`, abort key `"extractContour"`; the only other caller is
`stores/workspace.ts:247`, which this component drives). It is therefore the whole client half of
that operation leaf. It additionally commands `compute/epicycles` and `compute/bases` transitively.

### C-1 · BLOCKER — the ML Threshold slider is inert after the first extraction

`ContourSettings.vue:229-239` renders the ML Threshold slider whenever
`strategy === 'ml' || strategy === 'auto'`. `auto` is the shipped default
(`lib/defaults.ts:4`), so **this control is visible on every fresh workspace**. Moving it changes
`mlThreshold`, which enters the compute key at `:95`, fires the debounced watcher at `:141`, and is
written into the request at `:121-122`:

```ts
121:  ml_threshold: mlThreshold.value,
122:  ml_detail_threshold: mlThreshold.value * 0.6,
```

The request reaches `api/routers/images.py:212-226`, which computes a cache key **before** running
the pipeline:

```py
219:  cache_key = extraction_cache_key(asset.sha256, cs)
220:  existing = await db.contours.find_one({"extraction_cache_key": cache_key})
221:  if existing:
226:      return contour_response(existing)
```

`api/services/image_storage.py:248-266` enumerates the key's payload **exhaustively** — ten fields:

```py
252:  "_v": 3, "image_sha256", "strategy", "resize", "blur_sigma", "n_classes",
258:  "min_contour_length", "min_contour_area", "max_contours", "smooth_contours", "n_points"
```

`ml_threshold` and `ml_detail_threshold` **are not in it**. And they are not inert on the server
side either — they materially drive extraction:

- `api/models/shared.py:58-61` → `MLConfig(threshold=self.ml_threshold, detail_threshold=self.ml_detail_threshold)`
- `src/fourier_analysis/contours/ml.py:130-136,153` — `config.ml.detail_threshold` and
  `config.ml.threshold` select the mask threshold ladder, including a conditional fourth rung at
  `:135` (`if config.ml.threshold < 0.7`).
- `src/fourier_analysis/contours/isolation.py:40` — `subject_mask = saliency >= config.ml.threshold`,
  on the AUTO pipeline (`extraction.py:161-163` routes `AUTO` there).

**Failure scenario (exact).** Upload an image; the default `auto` extraction runs and stores a
contour under key `K = H(sha256, "auto", 1024, 0.5, 3, 40, 0.001, 24, 0.03, 1024)`. Open Contour,
drag ML Threshold `0.50 → 0.85`. The client debounces 1 s, POSTs `contour_settings` with
`ml_threshold: 0.85, ml_detail_threshold: 0.51`. The server recomputes the key over the *same ten
fields* — unchanged — hits the cache at `:221`, logs `extraction cache hit`, and returns **the
0.50-threshold contour**. The canvas redraws identically. The user concludes the ML model is
insensitive; in fact the request never reached `compute_contours`.

**Why this is the C axis and not a backend row.** This is the live instance of intake **R6-8**
("an operation record that embeds derived client back-references cannot attribute a defect to one
side of the seam", `lane-fourier-r3-r6.md:142`). Neither half is wrong alone: the client honestly
sends every field the contract declares; the operation honestly caches on the fields *its* key
enumerates. The defect lives in the join — and it is exactly the class of ambiguity the F.W5
shared-provenance contract must forbid. **Route: F.W5 (contract), F.W4 (cure).**

**Falsifier** — show `ml_threshold` inside `extraction_cache_key`'s payload, or show that
`MLConfig.threshold` does not affect the mask set. Neither holds: the payload is a closed
`json.dumps({...})` literal at `image_storage.py:250-265` with no `**settings` splat, and
`ml.py:131` reads `config.ml.threshold` directly. A weaker escape — "`_v: 3` means the key was
versioned deliberately" — does not save it: bumping `_v` invalidates *all* cache rows, it does not
add the two fields.

**UNPROVEN-NEEDS-LIVE (SS-13):** whether the response is byte-identical on the second call. The
code path proves the cached document is returned; a live probe should assert `contour_hash`
stability across an ML-threshold change.

### C-2 · BLOCKER — "Min Area %" drives a `[0,1]` fraction on a 0–20 axis

`ContourSettings.vue:269-277`:

```html
269:  <SliderControl v-model="minContourArea" label="Min Area %"
272:      :min="0" :max="20" :step="0.5"
276:      :format-value="(v: number) => v.toFixed(1)" />
```

The field it drives is documented, in the library, as a fraction:

```
src/fourier_analysis/contours/models.py:194-195
    min_contour_area: float = 0.001
    """Minimum contour area as a fraction of total image area."""
```

and consumed as one: `processing.py:72` — `area_threshold = config.min_contour_area * image.image_area`;
`structure.py:44` — `min_area = config.min_contour_area * image.image_area`. Both API models clamp
it: `api/models/shared.py:27-30` and `computation.py:25-28` — `max(0.0, min(1.0, float(v)))`; the
library clamps again at `models.py:244`.

So the control's usable range is a lie in three separate ways:

1. **Label.** "Min Area %" over a value that is a *fraction*: the default `0.001` is 0.1 %, and the
   slider renders it as `0.0`.
2. **Step.** `step 0.5` means the first detent above zero is `0.5` — read by the server as
   **50 % of the image area**. On any photograph this survives at most one contour, and typically
   none.
3. **Range.** `max 20` — nineteen of the twenty units are unreachable: every value `> 1` clamps to
   `1.0`, i.e. "keep only contours whose area is ≥ 100 % of the image". That set is empty by
   construction.

**Failure scenario (exact).** Open Contour → Advanced, nudge Min Area % one detent to `0.5`. After
the 1 s debounce the extraction runs with `min_contour_area = 0.5`; `_postprocess_raw_contours`
drops every candidate below half the image area; `contours` is empty; `images.py:244-248` raises
`HTTPException(422, "No contours extracted — try lowering min area or changing strategy")`. The
store's `extractContour` sets `error` and **rethrows** (`workspace.ts:255-257`), which is where C-3
and C-4 take over: the message is toasted and erased, the in-panel banner never paints, and the
rejection is unhandled. The user is one detent from a dead workspace with no in-panel way back
except dragging the slider to exactly 0.

**Falsifier** — show the client dividing by 100 before send, or the server multiplying by 100 on
receive. Neither exists: `:116` writes `min_contour_area: minContourArea.value` verbatim, and
`ExtractContourRequest.contour_settings` (`api/models/assets.py:96-97`) is the raw
`ContourSettings`. A second escape — "the clamp makes it safe" — inverts the argument: the clamp is
what turns 19/20 of the axis into the same catastrophic value.

### C-25 · INFO — fold of R6-8

`lane-fourier-r3-r6.md:142` establishes the model defect abstractly, from C31's `api.ts` mutation
flipping both `client.method.visualization-update` and `operation.method.visualization-update`.
C-1 is the same shape on a different leaf and, unlike C31, it is a **user-visible product defect**
rather than a harness artifact. I cite the row and extend it: the constraint the F.W5 contract owes
is not merely "keep operation identity independent of client identity" but **"the operation's cache
identity must be a superset of the request fields the operation consumes"** — otherwise a
conforming client can be silently ignored.

---

## §2 — value.js consumption (0.13.0 pinned)

### C-5 · BLOCKER (FOLD) — the pin is invalid against its consumer's peer range

Re-measured in `web/`, exit non-zero:

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS
```

Every glass-ui primitive this file mounts — `Button`, `Collapsible*`, `Select*`,
`ConfiguratorLayer`, `ConfiguratorRow`, and (through `SliderControl`) `Slider`, plus `Tooltip*` —
runs against a value.js two minors past anything its producer declares. **Carried, not re-scored**:
this is the AnimationControls lane's C-1 on the same tree. It belongs in this file because a
consumption challenge that omitted the supply-chain gate would be incomplete; the count is folded,
not doubled, in any cross-component roll-up.

**Falsifier** — as the sibling: run `npm ls @mkbabb/value.js`. It exits 1.

### C-11 · MAJOR — the sole colour input is a hand-rolled resolver with no `oklch()` arm

`ContourSettings.vue:5` imports `VIZ_COLORS` and threads `VIZ_COLORS.amber` into all five sliders
(`:236`, `:249`, `:275`, `:288`, `:302`). That is the component's entire colour surface, and its
provider is `lib/colors.ts` — 117 lines of hand-rolled parsing (`cssVarToHex` `:28-59`, `hslToHex`
`:61-74`, `rgbToHex` `:76-81`, `hexToRgba` `:99-105`, `hexToRgb` `:110-118`) with exactly three
recognisers: `hsl(…)`, a bare Tailwind HSL triplet, and `rgb(…)`. There is **no `oklch()` arm, no
`lab()`, no `color()`, no `light-dark()`** — anything else falls to `return "#888888"` (`:32`, `:57`).

Against the installed glass-ui 4.0.0 token cascade, that is not hypothetical:

| token | glass-ui 4.0.0 definition | `cssVarToHex` result |
|---|---|---|
| `--viz-fourier` | `oklch(0.579 0.201 30.4)` (`tokens/color-radius.css:263`); dark `oklch(0.693 0.151 28.1)` (`dark-arm.css:113`); `light-dark(…)` form at `light-dark.css:145` | **`#888888`** |
| `--viz-chebyshev` | `oklch(0.484 0.163 265.5)` (`color-radius.css:264`) | **`#888888`** |
| `--viz-legendre` | `oklch(0.532 0.180 317.5)` (`color-radius.css:265`) | **`#888888`** |
| `--viz-green` | `var(--section-color-4)` → `oklch(0.551 0.088 171.1)` (`color-radius.css:245,267`) | **`#888888`** |
| `--viz-amber` | `var(--section-color-5)` → `oklch(0.623 0.124 69.6)` — **but overridden locally** in `web/src/style.css:120,125` as `hsl(35 76% 35%)` / `hsl(37 73% 67%)` | ✅ correct hex |

So `resolveVizColors()` (`colors.ts:90-96`, called from `App.vue:11` and again from a
`MutationObserver` at `:13`) **overwrites four of its five sensible hard-coded seed values with
grey**, and this component's arm survives only by accident: the WCAG-contrast carry at
`style.css:113-127` happens to re-declare `--viz-amber` in `hsl()`. Remove that carry — the very
thing the glass-BH relay is meant to retire upstream — and every slider track in this file goes grey.

The tree already knows: `composables/useCoeffHover.ts:64` carries the comment *"`resolveVizColors`
has not yet run (mounted before paint)"*. The corpus already knows the shape:
`CENSUS-2026-08-03.md` §3c names `colors.ts` "the exact deletion target of W.L5 item 2 and the I-9
re-trigger sentinel", and §4 F.W2 schedules "delete the `colors.ts` hand-rolled arms". **This lane
adds the measurement**: the arm is not merely redundant against value.js — it is *already wrong for
4 of the 5 tokens it exists to resolve*, and one local CSS carry is all that stands between this
component and grey.

**Falsifier** — show an `oklch` branch in `cssVarToHex`, or show `--viz-amber` resolving to a
non-`hsl` token stream in this app. `grep -n "oklch" web/src/lib/colors.ts` → no hits; the four
regexes at `:36`, `:45`, `:52` are the complete recogniser set. And `style.css:3` `@import
"@mkbabb/glass-ui/styles"` precedes the `:root` override at `:119-121`, so the local `hsl()` wins
at equal specificity.

**UNPROVEN-NEEDS-LIVE (SS-13):** `getComputedStyle().getPropertyValue()` returns the substituted
token stream for unregistered custom properties in Chromium; a live probe should read all five
`--viz-*` and confirm the four `#888888` results.

### CONTRADICTION (explicit) — this component has **no** value.js import, and that is correct

`CENSUS-2026-08-03.md` §1 books "5 import statements / 4 files / 6 symbols, easing-only". Live,
re-derived: `grep -rn "@mkbabb/value" web/src` → `equation/ConvergencePlot.vue:5`,
`equation/composables/useCurveTransition.ts:8`, `equation/lib/harmonics.ts:5`, `lib/easings.ts:9,16`
— **five statements, four files, all easing, none reachable from this component's import graph**
(this file's graph is `stores/workspace` → `lib/{api,types,defaults,draftStorage}`, plus
`lib/colors`, `ui/{tooltip,SliderControl}`; no value.js edge exists). C-11 is therefore *not*
"ContourSettings mis-consumes value.js"; the honest claim is the narrower one above: the
colour-bearing seam consumes none of the colour library the app depends on.

I also **confirm and re-affirm the sibling lane's contradiction of the census's F.W2 framing**:
value.js 0.13.0's `package.json` declares a single `"."` export condition — there is no `./easing`
subpath at the pin, so the five bare specifiers are the *only* legal form today. The migration is a
consequence of F.W1, not a live consumption defect. Nothing in this component is affected either way.

---

## §3 — keyframes.js 4.3.0 consumption

**Zero.** `grep -n "keyframes" ContourSettings.vue` → the only hits are the word "keyframes" inside
the `<style>` provenance comment (`:355-362`). The tree's only live keyframes.js edge is
`composables/useFourierMorph.ts:14` (`loadAnimationEngine`, `type Animation`);
`stores/animation.ts:47` records that the transport's own use was excised.

This is **appropriate here**, not a defect: this component animates one collapsible reveal and one
banner slide, both of which are CSS-declarative. I record it so the axis is covered and so the
component is not later credited or debited for an engine it never touches. See C-15 for what it
*does* do with the animation substrate, and §7-S4 for the part it got right.

---

## §4 — glass-ui `^4.0.0` consumption

Adoption depth is genuinely good (§7-S1): **five subpath imports, zero direct reka-ui, zero shadcn
copies** — `./button` `:7`, `./collapsible` `:8-12`, `./select` `:13-18`, `./configurator` `:19`,
plus `./tooltip` and `./slider` through the two documented local adapters. Every row below is about
*how* those primitives are driven, not whether.

### C-8 · MAJOR — the strategy description is inside `SelectItemText`

`:218-223`:

```html
218:  <SelectItem v-for="(desc, key) in strategyDescriptions" :key="key" :value="key">
219:      <div>
220:          <div class="font-medium">{{ strategyLabels[key] }}</div>
221:          <div class="text-xs text-muted-foreground max-w-[280px]">{{ desc }}</div>
222:      </div>
223:  </SelectItem>
```

glass-ui 4.0.0's `SelectItem` declares **two** slots — `SelectItem.vue.d.ts` `__VLS_Slots`:
`default` and `description` — and the compiled render
(`dist/SelectScrollDownButton-C1jb3b3K.js`, `__name: "SelectItem"`) shows exactly why they are
separate:

```js
z = { class: "flex flex-col gap-0.5 min-w-0" }
… l("div", z, [ u(v(w /* reka SelectItemText */), null, { default: … _(a.$slots, "default") }),
                _(a.$slots, "description") ])
```

The `default` slot goes **inside** `SelectItemText`; the `description` slot goes **beside** it. The
consumer put both texts in `default`, so both land inside `SelectItemText`. reka's `SelectItem`
then does two things with that node:

- `dist/Select/SelectItem.js:100` —
  `textValue.value = ((textValue.value || node?.textContent) ?? "").trim()`. No `textValue` prop is
  passed, so the **typeahead key becomes label + description**. Typing `e` to reach "Edge-aware"
  competes with every description containing a leading `e`; typing `m` for "ML (Neural Net)" or
  "Multi-threshold" now also matches "Multiple thresholds for complex images…".
- `dist/Select/SelectItem.js:107` — `"aria-labelledby": unref(textId)`, where `textId` is the
  `SelectItemText` node. So the option's **accessible name** is the whole ~90-character sentence.
  A screen-reader user arrowing the six options hears
  *"U²-Net saliency model for subject isolation — best when subject blends with background, option
  6 of 6"* instead of *"ML (Neural Net)"*.

The extra bare `<div>` at `:219` is a second, smaller consumption error: glass already supplies the
`flex flex-col gap-0.5 min-w-0` column, and wrapping both children in one plain div collapses the
shipped `gap-0.5` to nothing.

**Failure scenario** — keyboard-only or screen-reader selection of a contour strategy: typeahead is
polluted and every option announces as a paragraph. **Falsifier** — show that glass-ui 4.0.0's
`SelectItem` has no `description` slot, or that reka reads a separate label node. Both are refuted
by the two file:line citations above.

### C-12 · MAJOR — a hand-rolled reset beside two shipped reset affordances

`:61-77` hand-rolls a dirty check and a restore:

```ts
61:  const isDefault = computed(() => strategy.value === CONTOUR_DEFAULTS.strategy && … );
70:  function resetDefaults() { strategy.value = CONTOUR_DEFAULTS.strategy; … }
```

— six `&&`-chained equality terms plus six assignments, and the pair must be kept in sync by hand
forever (adding a seventh control silently makes `isDefault` lie).

glass-ui 4.0.0 ships this exact semantics twice over:

- `configurator/useConfiguratorState.d.ts` — `useConfiguratorState<T extends object>(…)` returning
  `{ config, activePreset, isDirty, selectPreset, resetCurrent, cyclePreset, getPreset }`, with a
  pluggable `equals` (default JSON equality — precisely what these six terms approximate) and a
  `ConfiguratorPreset<T>` table. The six defaults in `CONTOUR_DEFAULTS` are a preset in all but
  name.
- `configurator/ConfiguratorRow.vue.d.ts` — a `canReset?: boolean` prop and a `reset` emit, i.e. a
  per-field reset affordance. The file uses `ConfiguratorRow` exactly once (`:209`) and passes
  neither.

The file's own comment justifies its placement:

```
191:  <!-- Panel-wide reset: ConfiguratorLayer has no header-actions slot, so
192:       the affordance lives at the top of the layer body. -->
```

That premise is **true** — I verified `ConfiguratorLayer.vue.d.ts`'s prop/slot surface:
`{label, sub, id, defaultOpen, dividers, class, bodyClass}` + `open` model + a single `default`
slot; there is no header-actions seam. Credit for a checked claim (§7-S3). But the conclusion
overshoots: the absence of a *layer* header slot is not a reason to hand-roll the *state* machinery
that the same subpath's composable ships, nor to skip the row-level affordance that does exist.

**Failure scenario** — a seventh contour knob is added (the contract has six more unexposed:
`resize`, `n_classes`, `min_contour_length`, and the three canny fields). `resetDefaults()` is
updated, `isDefault` is not; the reset icon now renders at 25 % opacity with `pointer-events: none`
(`:437-440`) while the panel is dirty — the reset becomes unclickable exactly when it is needed.
**Falsifier** — show `useConfiguratorState` absent from `@mkbabb/glass-ui/configurator` at 4.0.0.
It is exported at `configurator/index.d.ts` line 5.

### C-14 · MINOR — `<Select class="w-full">` is a dead attribute

`:210`. glass-ui's `Select` forwards to reka `SelectRoot` with `{"data-slot":"select"}`
(compiled, `__name: "Select"`); reka's `SelectRoot` renders `PopperRoot`
(`dist/Select/SelectRoot.js:146`), and `PopperRoot`'s entire render body is
`return renderSlot(_ctx.$slots, "default")` (`dist/Popper/PopperRoot.js`, tail). **There is no
element.** The fallthrough `class` is dropped, with the Vue dev-mode "Extraneous non-props
attributes … could not be automatically inherited" warning. The width is in fact supplied by
`SelectTrigger class="w-full …"` on the next line, so removing it is a pure deletion.

Note the e2e "no console errors during flow" test (`contour-extraction.spec.ts:139-166`) cannot
catch this: it filters on `msg.type() === "error"` and this is a warning.

**Falsifier** — show `SelectRoot` or `PopperRoot` rendering a host element. Neither does.

### C-15 · MINOR — the reveal animation is declared twice, and the comment names the wrong channel

`:353-364` (comment) + `:365-380` (rules):

```
355:  favour of `CollapsibleContent`'s `data-state` channel driving the
356:  canonical glass-ui `collapsible-open` / `collapsible-close` keyframes
357:  (shipped at `@mkbabb/glass-ui/styles/animations.css`, resolved via global cascade …)
```

```css
368:  .advanced-content { overflow: hidden; }
371:  .advanced-content[data-state="open"]  { animation: collapsible-open 0.2s var(--ease-out); }
374:  .advanced-content[data-state="closed"]{ animation: collapsible-close 0.2s var(--ease-out); }
```

Three corrections, none fatal, all consumption-shaped:

1. glass-ui 4.0.0's `CollapsibleContent` **already animates**. Compiled
   (`dist/CollapsibleContent-C_s6fG7r.js`, `__name: "CollapsibleContent"`) it hard-codes
   `class: "overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up
   data-[state=open]:animate-collapsible-down"` — and those utilities are **live**:
   `tw-animate-css/dist/tw-animate.css` defines `--animate-collapsible-down/-up` plus the
   `collapsible-down/-up` keyframes, and `style.css:2` imports it. So `overflow: hidden` at `:368`
   is a straight duplicate, and the two `animation:` rules are a *second* declaration of the same
   behaviour, differing only by an added opacity fade.
2. The scoped rules win (`.advanced-content[data-state][data-v-…]` = (0,3,0) vs the utility's
   (0,1,0)), so there is no visual break — but the producer's channel is overridden without saying so.
3. `@mkbabb/glass-ui/styles/animations.css` **is not an export**. The 80-key exports map has
   `./styles`, `./styles.css`, `./styles/fonts` and no `./styles/*` wildcard. The keyframes do reach
   the page (`dist/styles/index.css:171` `@import "./animations.css"`, pulled by `style.css:3`) —
   so the *effect* is right and the *citation* is unreachable. A future reader who tries that
   specifier gets `ERR_PACKAGE_PATH_NOT_EXPORTED`.

The reduced-motion cover at `:376-380` is real and correct, and it out-specifies both declarations
(§7-S5).

**Falsifier** — show `CollapsibleContent` accepting a `class` prop it merges (it does not; the class
is a hard-coded literal and `class` is absent from its props), or show `animate-collapsible-down`
undefined (tw-animate-css defines it).

### C-16 · MINOR — `.reset-icon-btn` re-declares the variant it asked for

`:195-204` mounts `<Button variant="ghost" size="icon">` and then `:424-440` hand-writes
`display:inline-flex; align-items:center; justify-content:center; padding:.25rem; border:none;
background:none; border-radius:.25rem` — seven declarations that `buttonVariants({variant:"ghost",
size:"icon"})` (`button/index.d.ts`) already supplies, two of which (`padding`, `border-radius`)
actively fight the `icon` size and the shipped `rounded-control` token. The `.is-default` opacity
gate at `:437-440` is the only genuinely local behaviour.

### C-17 · MINOR — five of six Tooltips are keyboard-invisible

The local `ui/tooltip/Tooltip.vue` wraps `TooltipTrigger as-child` around `<slot />`. Five of this
file's six callsites (`:229`, `:242`, `:268`, `:281`, `:294`) put a `SliderControl` in that slot,
whose root is `<div class="slider-control">` — **not focusable**. reka's trigger binds
`focus`/`blur` alongside the pointer handlers; with no tab stop those never fire, so five of the six
explanatory tooltips ("Saliency cutoff…", "Soften before tracing…", "Ignore tiny contours…",
"How many outlines to keep…", "Iron out jagged edges…") are hover/touch-only. The sixth (`:194`,
around `<Button>`) is fine. Same shape as the AnimationControls lane's C-16, on a larger surface.

---

## §5 — Props/emits contract quality + integration seams

### C-3 · BLOCKER — the retry banner can never render

`:326-337` declares the panel's only in-place recovery affordance:

```html
327:  <Transition name="slide-down">
328:      <div v-if="store.error" class="retry-banner">
329:          <span class="retry-msg fira-code">{{ shortError }}</span>
330:          <Button variant="destructive" size="sm" class="retry-btn" @click="runCompute" …>
```

backed by `shortError` (`:79-84`, with bespoke 503/`fetch` classification) and ~55 lines of CSS
(`:442-489`) plus the `slide-down` transition (`:492-506`).

`store.error` is nulled before this template ever sees a truthy value. `VisualizationView.vue:50`
calls `useWorkspaceLoader(...)`, which registers, in the **parent's** setup:

```ts
useWorkspaceLoader.ts:125-133
    watch(() => store.error, (err) => {
        if (err && store.imageSlug) { toast(err, "error"); store.error = null; }
    });
```

Both the parent watcher and this child's render effect are queued on the same mutation. Vue's
scheduler runs `pre` watcher jobs ahead of render effects, ordered by owner uid — and the parent's
watcher was created in the parent's setup, i.e. strictly before the child instance existed. So the
watcher nulls `error` and the child renders with `store.error === null`, every time.

The guard `store.imageSlug` does not save it: `ContourSettings` is mounted under
`v-if="hasImage"` (`VisualizationView.vue:260,270`), `hasImage = !!store.imageMeta` (`:123`), and
`imageMeta` is only ever set alongside `imageSlug` (`workspace.ts:123-124`, `:148-149`, `:210-211`).
Whenever this component exists, the toast branch is armed.

**Consequence.** `shortError`'s classification is dead code. The `Retry` button — the only call site
of `runCompute` outside the two watchers — is unreachable. After the 422 that C-2 manufactures, the
user's sole recovery is to drag the offending slider back and wait out another 1 s debounce.

**Falsifier** — show the banner surviving one flush. Two escapes were considered and both fail:
(a) *"the toast watcher is registered later"* — it is registered in the parent's setup, before the
child mounts; (b) *"`flush: 'post'`"* — no flush option is passed at `useWorkspaceLoader.ts:125`,
so it is `pre`. A third, weaker escape — *"the error could be set while `imageSlug` is null"* —
requires this component to be unmounted.

**UNPROVEN-NEEDS-LIVE (SS-13):** a single-frame paint of the banner cannot be excluded by static
reading alone with total confidence. A live probe: force a 422 (Min Area % → 0.5, per C-2) and
assert `.retry-banner` never becomes visible.

### C-4 · BLOCKER — unhandled rejection on every extraction failure

`runCompute` (`:104-137`) has `try { … } finally { store.endCompute(); }` — **no `catch`**. Its
first await is `store.extractContour()` (`:126`), which rethrows:

```ts
workspace.ts:254-257
    } catch (e: any) {
        if (!api.isAbortError(e)) error.value = e.message ?? "Contour extraction failed";
        throw e;
    }
```

`runCompute` is invoked fire-and-forget at three sites: `:146` (debounced settings watcher),
`:165` (the `imageMeta` watcher), and `@click="runCompute"` (`:330`). None awaits, none `.catch()`es.
Every 422 / 503 / network failure therefore produces a browser `unhandledrejection`.

Note the asymmetry the author *did* get right two lines later: `:128-131` wraps the two computes in
`Promise.allSettled`, which absorbs their rejections. Only the extract leg is unguarded — and it is
the leg that fails.

The e2e "no console errors" test cannot catch this either: Playwright surfaces unhandled rejections
via `page.on("pageerror")`, and the spec only subscribes to `page.on("console")`
(`contour-extraction.spec.ts:140`).

**Failure scenario** — C-2's 422, or a cold-start 503 from the ML model load: the toast appears,
`store.error` is erased (C-3), the banner never paints, and the console takes an unhandled
`ApiProblem`. **Falsifier** — show a `catch` in `runCompute` or an awaited/`.catch`ed call site.
`grep -n "catch" ContourSettings.vue` → zero hits.

### C-6 · MAJOR — the six local refs latch the store at mount and never re-sync

`:33-39` snapshots the store into six independent refs:

```ts
33:  const strategy       = ref(store.contourSettings?.strategy ?? CONTOUR_DEFAULTS.strategy);
…
39:  const mlThreshold    = ref(store.contourSettings?.ml_threshold ?? CONTOUR_DEFAULTS.ml_threshold);
```

`store.contourSettings` is the *declared* source of truth: it is what `loadWorkspace` restores from
IndexedDB (`workspace.ts:163-166`), what `loadVisualization` restores from the API (`:213-216`),
what `_saveDraftNow` persists (`:98`), and what `saveVisualization` publishes (`:355`). This
component reads it once and thereafter only **writes** it (`:112-123`). There is no `store →
local` watcher anywhere in the file — the four watchers (`:140`, `:152`, `:171`, `:179`) all read
locals or set flags; none assigns to one.

**Failure scenario (exact, no unmount required).** Navigate gallery → workspace A → workspace B
while the left panel stays mounted (`hasImage` never goes false, so the `v-if` at
`VisualizationView.vue:270` never tears down). `useWorkspaceLoader.ts:35-47` calls
`store.loadWorkspace(B)`, which replaces `store.contourSettings` with **B's** persisted draft
(`workspace.ts:163-166`). The six local refs still hold **A's** values. The `imageMeta` watcher
(`:152-169`) then fires; if B's draft carried no cached `epicycleData`/`basesData`, `:164-166` runs
`runCompute()`, which writes A's settings over B's at `:112-123` — and `scheduleDraftSave`
(`workspace.ts:108`) persists the clobbered result back to B's IndexedDB row. **B's saved contour
settings are destroyed by opening B.**

A narrower race exists on first load too: `loadWorkspace` sets `imageMeta` at `:149` but only
assigns `contourSettings` at `:163`, with an `await api.getContour(...)` **between** them
(`:156`) on the `image_bounds`-backfill path. `hasImage` flips true across that await, so the
component can mount — and latch the defaults — before the draft lands.

**Falsifier** — exhibit a store→local sync. `grep -n "\.value =" ContourSettings.vue` → six hits,
all inside `resetDefaults` (`:71-76`). None is store-sourced.

**UNPROVEN-NEEDS-LIVE (SS-13):** whether the panel actually stays mounted across a gallery→gallery
navigation depends on the `Transition mode="out-in"` at `VisualizationView.vue:254`, which only
swaps on `isEditing`. Static reading says it stays mounted; a live probe should confirm.

### C-7 · MAJOR — `max_contours: null` ("All") cannot survive a remount

`ContourSettings["max_contours"]` is `number | null` (`lib/types.ts:38`) and `null` is meaningful —
`api/models/shared.py:37-42` maps `None`/`0` to "unlimited", and this component surfaces it as the
string `"All"` (`:289`). But every read path uses `??`, which treats the legal `null` as absent:

```ts
36:  const maxContours = ref<number>(store.contourSettings?.max_contours ?? CONTOUR_DEFAULTS.max_contours ?? 16);
65:      && maxContours.value === (CONTOUR_DEFAULTS.max_contours ?? 16)
74:      maxContours.value = CONTOUR_DEFAULTS.max_contours ?? 16;
```

**Failure scenario.** Set Max Contours to `0` → the write at `:117` stores `max_contours: null` →
the draft persists `null` → remount (toggle into and out of the contour editor, which swaps the
panel at `VisualizationView.vue:255/262`) → `:36` reads `null`, `??` skips it, the slider shows
**24**, and the next `runCompute` writes 24 back. The user's "All" is silently downgraded, and
because 24 is also the default, `isDefault` now reports the panel clean.

**Falsifier** — show `??` distinguishing `null` from `undefined`. It does not; `?? ` fires on both.
`||` would be no better. The correct read is an explicit `=== undefined` test.

### C-9 · MAJOR — `v-model:` over a component with zero emits

Both mount sites bind two-way models:

```html
VisualizationView.vue:260   <ContourSettings v-if="hasImage" v-model:n-harmonics="nHarmonics" v-model:n-points="nPoints" />
VisualizationView.vue:270   <ContourSettings v-if="hasImage" v-model:n-harmonics="nHarmonics" v-model:n-points="nPoints" />
```

`ContourSettings.vue:26-29` declares `defineProps<{ nHarmonics: number; nPoints: number }>()` and
**no `defineEmits`** (`grep -c defineEmits` → `0`). `v-model:n-harmonics` desugars to
`:n-harmonics` + `@update:n-harmonics`; the listener is registered, falls through as an attr, and is
never invoked. The contract advertises a bidirectional binding that is structurally one-way.

The contrast is in the same view, on the *same two names*: `BasisSelector.vue:19-21` declares
`(e: "update:nHarmonics", v: number): void` and emits it at `:30`, `:89`, `:165`. So this is not a
house idiom — it is a divergence from the sibling that shares the binding, and it means a reader
cannot tell from `VisualizationView`'s template which of the two children owns those values.

**Falsifier** — show an emit. There is none; the props are read-only, at `:96-97` and `:119-120`.

### C-10 · MAJOR — the file's only `any`, on the one clamped field

`:118` — `smooth_contours: smoothContours.value as any`. Both sides already say `number`:
`lib/types.ts:39` (`smooth_contours: number`) and `api/models/shared.py:18` (`float = 0.03`, clamped
to `[0,1]` at `:32-35`). `smoothContours` is `Ref<number>` by inference from `:37`. The cast is
therefore **inert today and load-bearing tomorrow**: it is precisely the assignment that would catch
a future slider emitting a string, or a contract widening `smooth_contours` to
`number | "auto"`. Every neighbouring field in the same object literal (`:114-122`) is uncast.

**Falsifier** — show a type error appearing if the cast is removed. `smoothContours` is a numeric
`ref`; there is none.

### C-18 · MINOR — an invented coupling that makes a contract field unsettable

`:122` — `ml_detail_threshold: mlThreshold.value * 0.6`. The `0.6` reproduces the shipped default
ratio (`0.3 / 0.5`, `lib/defaults.ts:13-14`), so the arithmetic is at least principled. But
`ml_detail_threshold` is an independent field of the contract (`lib/types.ts:41`,
`api/models/shared.py:20`) that materially selects a different mask rung
(`src/fourier_analysis/contours/ml.py:130`), and this line makes it unreachable: it can never be set
independently, and any value restored from a draft or a published visualization
(`workspace.ts:163-166`, `:213-216`) is overwritten on the next compute.

### C-19 · MINOR — two parallel maps over a closed vocabulary, one member short

`:41-48` and `:50-57` are two `Record<string, string>` maps keyed by the same six strings, with no
shared union type. The `v-for` iterates `strategyDescriptions` (`:218`) and indexes
`strategyLabels[key]` (`:220`) — if the maps ever drift, the option renders with an **empty label**
(the `?? strategy.value` fallback exists only on the trigger, `:59`, not on the items).

The library's vocabulary is a 7-member enum (`src/fourier_analysis/contours/models.py:17-26`:
`threshold`, `adaptive_threshold`, `multi_threshold`, `canny`, `edge_aware`, `ml`, `auto`), and
`extraction.py:50-57` implements `ADAPTIVE_THRESHOLD` with a genuine dual-polarity heuristic. The
picker omits it — **one shipped strategy is unreachable from the UI**. `ContourSettings.strategy` is
`string` on both sides (`lib/types.ts:30`, `api/models/shared.py:9`), so nothing structurally
prevents the drift.

### C-20 · MINOR — a dead fallback, triplicated

`CONTOUR_DEFAULTS.max_contours ?? 16` appears at `:36`, `:65`, `:74`. `CONTOUR_DEFAULTS` is a
module-level object literal (`lib/defaults.ts:3-16`) whose `max_contours` is `24` — never null. The
`16` is unreachable, and it disagrees with the `24` beside it, so a reader must check the literal to
learn which number governs.

### C-21 · MINOR — the suppression releases itself one microtask after it arms

`:101` `let suppressSettingsRecompute = true`, set true again at `:156`, `:162`, `:174`, and cleared
at `:179-186`:

```ts
179:  watch(() => [strategy.value, …, props.nPoints, store.imageSlug], () => {
182:      queueMicrotask(() => { suppressSettingsRecompute = false; });
183:  });
```

The release watcher tracks **the same dependency set** as the two watchers that arm the flag, plus
`store.imageSlug`. So on any workspace change: `:174` sets the flag true in the pre-flush queue,
`:182` queues a microtask, and the flag is false again before the 1 s debounce at `:148` could ever
consult it. Whatever the guard was meant to prevent, the mechanism that would prevent it is the
`lastComputedKey` idempotence check at `:145` (which is genuinely good — §7-S2), not this flag.
Two module-level `let`s and four watchers where one key comparison does the work.

**Falsifier** — exhibit a sequence where the flag is still `true` when the debounced callback runs.
The only such window is a settings change within one microtask of an `imageSlug` change, which the
1 s debounce guarantees never coincides.

### C-22 · MINOR — store state written from the template's owner

`:108` `store.error = null` and `:112-123` `store.contourSettings = { … }`. Every other transport
verb on this store is an action (`extractContour`, `computeEpicycles`, `computeBases`,
`saveVisualization`, `setVisibility`, `deleteVisualization`, `reset`, `beginCompute`/`endCompute` —
`workspace.ts:445-469`). Two of the store's fields are mutated from outside it, by the component
that also owns the debounce, so the store's own `watch([contourSettings, animationSettings],
scheduleDraftSave, {deep:true})` (`:108`) fires as a side effect of a component-local write. A
`store.applyContourSettings(patch)` action would put the write, the draft-save and the compute-key
derivation in one place — and would be the natural home for the C-6 sync.

### C-13 · MAJOR — a runtime import declared as a devDependency

`:20` — `import { Wand2, ChevronRight, RotateCcw, RefreshCw } from "lucide-vue-next"`.
`web/package.json:37` lists `lucide-vue-next` under **`devDependencies`**. The same misclassification
covers every other runtime package the component's graph touches: `reka-ui` (`:38`, reached through
every glass-ui primitive), `class-variance-authority` (`:29`), `clsx` (`:30`), `tailwind-merge`
(`:35`). A bundled SPA survives it, but `npm ci --omit=dev` — the idiom a hardened container build
reaches for, and this repo *does* containerize (CENSUS §3a) — produces an unbuildable tree. It also
means the census's uplift budget ("`lucide-vue-next → @lucide/vue` ×35 sites", CENSUS §3a) is a
`dependencies` migration mis-filed as a dev one.

**Falsifier** — show `lucide-vue-next` in `dependencies`. `package.json:13-25` lists nine runtime
deps; it is not among them.

---

## §6 — Gates

### C-23 · INFO — the controls that break have no coverage

`e2e/contour-extraction.spec.ts` is the only spec that drives this component. It exercises exactly
two of six controls:

| control | e2e | note |
|---|---|---|
| Blur Sigma | ✅ `:64-80` | number-input fill + 5 s settle |
| Strategy | ✅ `:109-135` | with a well-earned locator-scoping comment (§7-S6) |
| ML Threshold | ❌ | the C-1 defect |
| Min Area % | ❌ | the C-2 defect |
| Max Contours | ❌ | the C-7 defect |
| Smoothing | ❌ | |
| Reset to defaults | ❌ | the C-12 surface |
| Advanced reveal | ❌ | the C-15 surface |
| Retry banner | ❌ | the C-3 dead surface |

`grep -rn "Min Area\|Max Contours\|Smoothing\|ML Threshold\|Reset to defaults\|Advanced\|retry"
web/e2e/*.ts` → **zero hits**. `settings-persistence.spec.ts` covers only `n_harmonics`, which is
`BasisSelector`'s input — the six contour settings' draft round-trip (the C-6/C-7 surface) is
untested. And the constellation's frontend gate is `vue-tsc` + Playwright only: **vitest is ABSENT**
(CENSUS §3a), and `vue-tsc` sees nothing wrong with any row above except, arguably, C-10 — which is
`as any`-silenced.

The two covered controls are exactly the two whose fields *are* in the extraction cache key. That is
not a coincidence; it is why C-1 and C-2 survived to HEAD.

### C-24 · INFO — fold + re-verification of R3-7a

`lane-fourier-r3-r6.md:79` records "ContourSettings 6" within the 35-callsite / 9-consumer Tooltip
budget carried to **F.W3**. Re-counted live: `:194`, `:229`, `:242`, `:268`, `:281`, `:294` = **6**.
Exact, no drift. The migration target (`ui/tooltip` barrel → `@mkbabb/glass-ui/tooltip`) is
mechanical here — the local shim (`ui/tooltip/Tooltip.vue`) is a faithful 3-primitive wrapper
(§7-S1) — but F.W3 should fold C-17 into the same pass, since the `as-child`-on-a-div problem
migrates unchanged if the callsites are moved verbatim.

---

## §7 — L-18 the other way: what survived

**S-1 · The glass posture at this file is exemplary, and I could not break it.** Five subpath
imports (`./button`, `./collapsible`, `./select`, `./configurator`, plus `./tooltip` + `./slider`
via adapters), **zero** direct `reka-ui` imports, **zero** shadcn copies. Both local `ui/` files are
genuine thin adapters that document *why* they exist and what they replaced
(`Tooltip.vue:2-11`; `SliderControl.vue:2-24`, which records the 221-LOC shadow recipe it retired,
the `variant` prop it deleted with a `git grep` receipt, and the string-key dock injects the typed
`DockContext` made obsolete). The census's "deepest, cleanest consumer in the constellation"
[FE §3] holds at this file, precisely. **Falsifier attempted**: `grep -n "reka-ui" ContourSettings.vue
SliderControl.vue Tooltip.vue` → zero hits.

**S-2 · `currentComputeKey()` is a real idempotence guard, correctly scoped.** `:86-99` serialises
exactly the nine inputs that shape the request — including `store.imageSlug`, which is what makes a
workspace switch invalidate rather than falsely hit — and `:145` short-circuits a recompute whose key
matches the last completed one. It is set only *after* all three round-trips resolve (`:133`), so a
failed compute correctly leaves the key stale and retryable. Most of the tree's debounce sites
compare nothing.

**S-3 · The `ConfiguratorLayer` comment is a checked claim, not a guess.** `:191-192` asserts the
layer has no header-actions slot. I verified it against `ConfiguratorLayer.vue.d.ts`: the slot
surface is a single `default`, and the prop surface is
`{label, sub, id, defaultOpen, dividers, class, bodyClass}` + the `open` model. The premise is
**true**. C-12 challenges the conclusion, not the observation — and an author who checks the
producer's surface before working around it is doing the thing this audit exists to encourage.

**S-4 · The compute sequencing expresses the true dependency graph.** `:126-131` — `await
extractContour()`, *then* `Promise.allSettled([computeEpicycles(), computeBases()])`. The contour
must exist before either compute (both read `contour.value.contour_hash`,
`workspace.ts:292`/`:317`), and the two computes are genuinely independent, hit different endpoints,
and carry different abort keys (`api.ts:336`/`:356`) with independent revision counters
(`workspace.ts:57-58`). Serial-then-parallel is the correct shape, and `allSettled` (not `all`)
correctly lets one basis fail without cancelling the other. The store's comment at `:53-56` records
that the split revision counters exist to break a prior infinite retry loop — this component is the
beneficiary and does not re-break it.

**S-5 · Reduced motion is covered, and at the right specificity.** `:376-380` zeroes both
`.advanced-content` animations under `prefers-reduced-motion: reduce`, out-specifying both the local
rules and glass-ui's shipped `animate-collapsible-*` utilities. Compare the same tree's two rAF
clocks, which the census books as **ungated** [FE §8]. The `slide-down` transition is not covered,
but it is a 4 px translate — below the threshold the WCAG guidance targets.

**S-6 · The 0→null sentinel is handled honestly on both halves.** `:117` translates `0 → null` on
write, `:87` does the same inside the compute key (so `0` and `null` cannot produce two keys for one
request), and `:289` renders `"All"` rather than `0`. The server independently agrees
(`api/models/shared.py:37-42`). Belt-and-braces on a nullable field is the right instinct — which is
what makes C-7 (the *read* half, where `??` swallows the same null) the sharper finding: the author
saw the sentinel and covered one direction of it.

---

## §8 — Routing

| finding | wave | why |
|---|---|---|
| C-1 | **F.W5** contract + **F.W4** cure | the operation's cache identity must cover the fields the operation consumes — a direct constraint on the co-signed contract (extends R6-8) |
| C-2, C-7, C-19 | **F.W4** | client↔contract unit/vocabulary conformance; the six contour fields need one typed, range-checked descriptor table |
| C-3, C-4, C-6, C-22 | **F.W4** | error-channel unification (toast vs banner, pick one) + a `store.applyContourSettings` action that owns sync, write and draft-save |
| C-5 | **F.W1** | the atomic tri-package uplift; nothing else clears it |
| C-8, C-12, C-14, C-15, C-16 | **F.W3** | glass suffusion — reach for `description`, `useConfiguratorState`, `canReset`, and the shipped `CollapsibleContent` reveal; delete the local re-declarations |
| C-11 | **F.W2** | W.L5 item 2 under D-15's grant — and this lane supplies the measured urgency (4 of 5 arms already grey) |
| C-13 | **F.W0** or **F.W1** | dependency reclassification belongs with the re-ground or the uplift |
| C-17, C-24 | **F.W3** | fold into the 35-callsite tooltip migration; do not port `as-child`-on-a-div forward |
| C-9, C-10, C-18, C-20, C-21 | **F.W4** | contract + hygiene in the per-component pass |
| C-23 | **F.W4** | the vitest-floor decision + four missing e2e drives; C-1/C-2 are the regression fixtures |

---

*Read-only throughout. `fourier-analysis` was treated as evidence; no product source in any repo was
modified. The only file written by this lane is this one.*
