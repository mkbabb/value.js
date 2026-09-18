claude-opus-5[1m]

# CHALLENGE — `BasisSelector.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisSelector.vue` (324 LOC)
**Axis** L — code correctness · leaks/teardown · wrong types · duplication · colocation · module size · composable contracts · error postures · dead code · the viz render path · the R5-7 template-loop invisibility class
**Posture** component assumed DEFECTIVE until the tree proves otherwise; every row carries severity + `file:line` + its own falsifier.
**Method** static + source-derived only. No browser. Three claims were additionally *executed* against fourier's own `node_modules/vue` and its own regex arms (probe transcript in §5); nothing was written into either product repo.
**Verdict** **19 defects — 2 BLOCKER · 7 MAJOR · 8 MINOR · 2 INFO — and 4 superlatives.** The component is competently written at the seam level (clean teardown, emit-boundary clamping, per-instance CSS-var retint, no god-module) and is *wrong at the value level*: its reset writes a default the rest of the stack does not hold, and both of its slider tints resolve to grey `#888888` at runtime.

**Files read whole (read-only):** the target; `lib/basis-display.ts`; `@/lib/colors.ts`; `@/components/ui/tooltip/{index.ts,Tooltip.vue}`; `@/components/ui/SliderControl.vue`; `ContourSettings.vue`; `VisualizationView.vue`; `composables/useWorkspaceLoader.ts`; `BasisCanvas.vue` (render path); `lib/canvas-drawing/labels.ts`; `stores/workspace.ts`; `lib/defaults.ts`; `App.vue`; `e2e/settings-persistence.spec.ts`; glass-ui 4.0.0 `.d.ts` for `Slider` / `Button` / `ConfiguratorRow` / `ConfiguratorLayer` + the `--viz-*` token arms; `api/models/{visualization,computation,shared}.py`.

---

## §1 — Corpus fold (hitherto; not re-invented)

| Prior row | What it already established | How this challenge relates |
|---|---|---|
| `lane-frontend.md:87` | `BasisSelector.vue` = 324 LOC, "Basis toggles + per-basis term sliders" | Inventory only. **This challenge is the first read of its body.** The one-line purpose is also *wrong in fact*: the sliders are not "per-basis" — they are two global contour parameters (`nHarmonics`, `nPoints`) that apply to every basis (BasisSelector.vue:154-206). Minor census correction, filed as **INFO-2**. |
| `lane-frontend.md:181,368,371` | `SliderControl.vue` (150 LOC) is a **thin API-shape adapter** over `glass-ui/Slider`; "the correct posture — keep" | **Adopted, and sharpened:** the ruling makes `SliderControl` the canonical chassis, which makes BasisSelector's twice-inlined re-roll of it (identical CSS, divergent tokens) a duplication defect rather than a taste question → **MAJOR-3**. |
| `lane-frontend.md:382` | `BasisSelector.vue:315` `glass-scrubber` mention is **prose comment only** | Confirmed (line 315-317 is a comment; the live hooks are the four `--slider-scrub-*` custom properties at 318-323). No contradiction. |
| `CENSUS-2026-08-03.md:174` | `web/src/lib/colors.ts` = "117-line hand-rolled regex file, **no `oklch()` arm**" — the W.L5/F.W2 deletion target | **Adopted and escalated.** The census books the *shape* (hand-rolled, to be deleted). It does not book the *live consequence*: because every glass-ui `--viz-fourier/-chebyshev/-legendre` arm ships `oklch()`, the parser returns its `#888888` fallback, so **BasisSelector's two slider tints and the canvas epicycle trail render grey**. That consequence is **BLOCKER-1**. |
| `CENSUS-2026-08-03.md:194` (F.W4) | "per-component D/L/C audit … the `BasisCanvas`↔`FourierField` convergence study" | This file is one such per-component L audit; §4 supplies the render-path rows F.W4 needs. |
| intake `lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT, CARRY→F.W4) | template-loop evidence keyed to *component callsites* is blind to native element loops (`PaperSidebar.vue` `li v-for` ×3 → leaf `[]`) | **Does not bite at BasisSelector's loop** — see **INFO-1** for the falsified form and the *adjacent* form that does bite (native non-loop controls). Contradiction stated explicitly. |
| intake **R6-5** (ADOPT-AS-FACT) | R6 cured R5-7 with a `NATIVE_TEMPLATE_LOOP` family; `nativeTemplateLoops: 16` | The cure is **loop-scoped**. BasisSelector's two primary numeric controls are native `<input>` outside any loop → still invisible. **INFO-1**. |

No row below duplicates a hitherto row; where one overlaps, the hitherto id is cited in the row.

---

## §2 — BLOCKERS

### BLOCKER-1 — both slider tints resolve to `#888888` at runtime; the fourier/chebyshev distinction the component encodes is dead

**Provenance**
- `BasisSelector.vue:176` `:style="{ '--track-color': VIZ_COLORS.fourier }"`
- `BasisSelector.vue:203` `:style="{ '--track-color': VIZ_COLORS.chebyshev }"`
- `BasisSelector.vue:318-323` — `--track-color` is projected onto `--slider-scrub-range-bg` / `-hover` / `--slider-scrub-thumb-bg` / `-hover`
- `web/src/lib/colors.ts:23-58` — `cssVarToHex` arms: `#…` · `hsl(…)` · bare `h s% l%` · `rgb(…)` · else `return "#888888"`
- `web/src/lib/colors.ts:90-96` — `resolveVizColors()` overwrites `VIZ_COLORS.fourier/chebyshev/legendre` from those CSS vars
- `web/src/App.vue:10-17` — called `onMounted` + on every `class` mutation of `<html>`
- glass-ui 4.0.0 ships all three tokens as **oklch in every arm**: `dist/styles/tokens/color-radius.css:263` `--viz-fourier: oklch(0.579 0.201 30.4)` · `dist/styles/tokens/dark-arm.css:113` `oklch(0.693 0.151 28.1)` · `dist/styles/tokens/light-dark.css:145-147` `light-dark(oklch(…), oklch(…))`
- fourier redeclares **only** `--viz-amber` (`web/src/style.css:120,125`, `hsl(35 76% 35%)`) — which *does* parse.

**Mechanism** `getComputedStyle(...).getPropertyValue("--viz-fourier")` on an unregistered custom property returns the computed token stream — `oklch(…)` or `light-dark(oklch(…), oklch(…))`. No arm matches → `#888888`. Executed against the actual regexes (§5 probe B): all three oklch forms → `#888888`; the hsl override → HSL arm. The one token fourier hand-patched for a contrast carry (D.W4.d) is the one token that survives; the three it consumes from the design system do not.

**Consequence at this component** after App mount both `.basis-slider-track` instances tint from `#888888`: `color-mix(in srgb, #888888 30%, transparent)` range + a `#888888` thumb. The Harmonics and Sample-Points sliders become **visually identical greys**, and the code's evident intent (a per-parameter palette entry, comment at 315-317) is silently void.

**Consequence on the viz render path** (census viz rows `lane-frontend.md:83,427,432`): the *same* dead value feeds `BasisCanvas.vue:127` `trailColor = … : VIZ_COLORS.fourier` and `BasisCanvas.vue:326` `epicycleColor = … : VIZ_COLORS.fourier`, and `canvas-drawing/labels.ts:89` `ctx.fillStyle = VIZ_COLORS.fourier`. So the epicycle trail, the epicycle arms and the `N = …` label draw grey — while the multi-basis curves at `BasisCanvas.vue:257` use `cfg.color` from `basisDisplay`, which is a *module-eval snapshot* of the same object taken before `resolveVizColors` ever runs and therefore still holds `#bf4040` (see MAJOR-6). **The renderer is split across two mutually inconsistent reads of one palette, and BasisSelector straddles the split**: its pills use the snapshot (red/blue/purple), its tracks use the resolved value (grey).

**Falsifier** (a) any fourier stylesheet redeclaring `--viz-fourier/-chebyshev/-legendre` in `#`/`hsl()`/`rgb()` form — `grep -rn -- "--viz-fourier" web/src` returns only `lib/colors.ts:91`; the sole redeclaration in `style.css` is `--viz-amber`. (b) a browser returning a *used* `rgb()` value for an unregistered custom property — then the RGB arm fires and the claim dies. **SS-13 live check (one line, UNPROVEN-NEEDS-LIVE):** `getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')` — if it starts with `oklch`/`light-dark`, BLOCKER-1 holds as written.

**Ownership note** the root cause is in `@/lib/colors.ts` (already booked for deletion at F.W2 / census:174). It is filed here because BasisSelector is a *consumer at two sites* and because the census books the shape without the consequence; the repair sequencing belongs to F.W2, the symptom belongs to this component's L ledger.

---

### BLOCKER-2 — "Reset to defaults" writes `n_harmonics = 50`; the app **and** the server hold 200. The affordance is also never dim at the pristine state

**Provenance**
- `BasisSelector.vue:73-77` `const DEFAULTS = { activeBases: ["fourier-epicycles"], nHarmonics: 50, nPoints: 1024 }`
- `BasisSelector.vue:86-91` `resetDefaults()` emits `update:nHarmonics = 50`
- `BasisSelector.vue:79-84` `isDefault` compares `(props.nHarmonics ?? 50) === 50`
- `web/src/lib/defaults.ts:7-8` `CONTOUR_DEFAULTS = { … n_harmonics: 200, n_points: 1024 … }`
- `web/src/stores/workspace.ts:46` `contourSettings = ref(defaultContourSettings())` → **200**
- `web/src/components/visualization/composables/useWorkspaceLoader.ts:18` `nHarmonics = ref(store.contourSettings?.n_harmonics ?? CONTOUR_DEFAULTS.n_harmonics)` → **200**
- server: `api/models/shared.py:12` `n_harmonics: int = 200`; `api/models/computation.py:44` `n_harmonics: int = 200`

**Two distinct failures from one wrong constant**

1. **The dim-state is inverted.** On a pristine workspace `props.nHarmonics === 200`, so `isDefault` is `false`, so `.reset-icon-btn.is-default` (opacity 0.25, `pointer-events:none`, lines 307-310) never applies. The user is told, at first paint and forever, that they have drifted from defaults when they have changed nothing. The button becomes dim **only after** they reset — i.e. only in the one state that is *not* the app default. The signal is exactly backwards.
2. **The action is destructive.** One click drops harmonics 200 → 50 (a 4× fidelity cut), and because `nHarmonics` is in `ContourSettings.vue:141`'s debounced key it arms a full `runCompute()` — `extractContour()` **plus** `computeEpicycles()` **plus** `computeBases()` (`ContourSettings.vue:104-137`) — i.e. a complete re-extraction of the contour, not a cheap re-projection. `nPoints` is correct (1024 both sides); only the harmonics half is wrong, which is what makes it survive review.

**Why the suite cannot catch it** `web/e2e/settings-persistence.spec.ts:73` — *"Change harmonics to a non-default value (default is 50)"* — and `:93` *"(not default 50)"*. The wrong constant has already propagated into the test prose. The test fills `120` and asserts `120`, so it passes under either default and asserts nothing about the pristine value or the reset path. **No test covers `resetDefaults`** (`grep -rn "Reset to defaults" web/e2e` → no hits).

**Falsifier** if `CONTOUR_DEFAULTS.n_harmonics` were 50, or if the store seeded 50, or if some parent overrode the prop to 50 before first paint, the row dies. It is 200 at all four sites listed (client default, store seed, loader seed, two server models), and `VisualizationView.vue:50,265-267` passes the loader's ref straight through with no transform.

---

## §3 — MAJOR

### MAJOR-1 — `selected` aliases the parent's reactive array; the first non-fourier toggle mutates parent state in place, out of band

`BasisSelector.vue:37` `const selected = ref<string[]>(props.activeBases ?? ["fourier-epicycles"]);` — no copy. `VisualizationView.vue:45` holds `ref<string[]>`, whose `.value` is a reactive proxy; `ref(thatProxy)` returns the **same proxy** (`toReactive` is identity on an already-reactive object). Then `BasisSelector.vue:108-113` mutates it: `selected.value.splice(idx,1)` / `selected.value.push(key)`.

**Executed** (§5 probe A, fourier's own `vue`): `selected.value === props.activeBases` → `true`; after the child's `push`, the parent's array reads `["fourier-epicycles","chebyshev"]` **before any emit**.

**Bounded blast radius, stated honestly** the emit at line 115 immediately reassigns a fresh array in the parent, and the watcher at line 39 then rebinds `selected` to a copy — so the aliasing exists only until the first toggle, and `BasisCanvas.vue:402` watches `() => props.activeBases` by identity (not `deep`), so the in-place mutation triggers no stray redraw. **No user-visible symptom is claimed today.** What is claimed: the controlled-component contract is violated (the child writes the parent's state directly, bypassing `@update:active-bases`), which is precisely the seam a future validating/filtering handler in `VisualizationView` would sit on, and `watchDebounced(… { deep: true })` at `VisualizationView.vue:53-65` *is* deep and does observe it.

**Falsifier** if Vue's `ref()` did not preserve reactive-proxy identity, or if `props.activeBases` arrived as a plain array, the alias would not form — probe A refutes both. One-character repair (`[...props.activeBases]`), which is exactly what line 39 already does on every later update — the inconsistency between line 37 and line 39 is itself the tell.

### MAJOR-2 — the two number inputs emit per keystroke and coerce the empty field to the minimum, so the field cannot be cleared and retyped

`BasisSelector.vue:157-166` and `:184-193` — `@input="emit('update:nHarmonics', Math.max(1, Math.min(500, parseInt(($event.target as HTMLInputElement).value) || 1)))"` against a **one-way** `:value="nHarmonics"`.

**Executed** (§5 probe C): `""` → emits `1`; `"abc"` → `1`; `"1e3"` → `1` (parseInt stops at `e`; a user typing scientific notation silently lands on the minimum); `"250"` → `250`. Because the prop then changes to `1`, Vue patches the DOM value back to `"1"` — the field refills under the caret, so "select-all, delete, type 300" produces `1` → `13` → `130` → `1300`→clamped `500`. The Sample-Points input has the identical shape with `|| 128`.

Secondary: `parseInt` without radix (lines 165, 192) — benign in ES2015+ except for `0x` prefixes. Secondary: every keystroke re-arms `ContourSettings.vue:140-149`'s 1 s debounce, so a slow typist can trigger a full `extractContour` + two compute calls per pause.

**Contrast in-tree** `SliderControl.vue:40-49` — the repo's own chassis — uses a `clamp()` with an explicit `Number.isFinite` guard rather than `|| min`. The correct posture exists 150 LOC away and is not used here.

**Falsifier** if the handler were bound on `change`/`blur`, or if the input were `glass-ui`'s `NumberField`, or if the value were two-way, the refill would not occur. All three are absent; the binding is `:value` + `@input`.

### MAJOR-3 — the component re-rolls `SliderControl.vue` twice inline, with drifted tokens

`BasisSelector.vue:154-206` reproduces the canonical labeled-slider chassis (`SliderControl.vue`, ruled "the correct posture — keep" at `lane-frontend.md:371`) instead of consuming it:

| Concern | BasisSelector | SliderControl | Verdict |
|---|---|---|---|
| scalar↔array adapter | `:28-35` | `:51-56` | duplicated (SliderControl's also guards `Number.isFinite`) |
| `.inline-number` CSS | `:212-233` | `:117-138` | **byte-identical** 22-line block |
| retint hook | `:318-323` | `:143-149` | **drifted**: range 30%/45% vs 25%/35%; BasisSelector omits `--slider-scrub-track-height: 16px` |

Consequence: inside one left panel, BasisSelector's two sliders and `ContourSettings`' four `SliderControl` sliders (`ContourSettings.vue:229-304`) have different track heights and different fill opacities for no stated reason. The only thing `SliderControl` lacks is the right-aligned-input layout — a prop, not a fork.

**Falsifier** a capability `SliderControl` cannot express would justify the fork. Compared field by field: `label`, `modelValue`, `min`, `max`, `step`, `color`, `formatValue` cover every use here; the sole delta is the input's placement inside `ConfiguratorRow`'s label slot. Row survives.

### MAJOR-4 — the fourier tri-state's third state ("off") is unrepresentable end-to-end; the in-file comment scopes the risk to the canvas only

`BasisSelector.vue:103-105`: *"Go to 'off' — allow empty selection (canvas handles it gracefully)"*. The canvas does (`BasisCanvas.vue:249` loops zero times). Nothing else does:

- `VisualizationView.vue:53-65` persists `active_bases: []` into `store.animationSettings`;
- `useWorkspaceLoader.ts:53` `if (as?.active_bases?.length)` — an empty array fails the guard, so the persisted "off" is never restored;
- `useWorkspaceLoader.ts:106-114` — on first data arrival, `fourier-epicycles` is **force-prepended**;
- `stores/workspace.ts:351-353` — `active_bases: animationSettings.value.active_bases?.length ? … : ["fourier-epicycles"]` on create;
- `api/models/visualization.py:186` — `active_bases: list[str] = Field(min_length=1, max_length=16)` (a `[]` body would 422; the store's coercion is what prevents it).

So the user's third click is honoured on screen and discarded on reload/save, with no feedback. Either the state is real (then the loader and the store must round-trip it) or it is not (then the cycle should be two-state). Today it is neither.

**Falsifier** a persistence path that round-trips `[]` would kill the row; `grep -rn "active_bases" web/src` returns exactly the five sites above, and two of them coerce.

### MAJOR-5 — the basis-key domain model is duplicated across six files while its 7-LOC owner module sits unused for it

The normalization predicate `key.startsWith("fourier") ? "fourier" : key` appears at: `BasisSelector.vue:98` (as a negated filter), `BasisCanvas.vue:250`, `canvas-drawing/labels.ts:29`, `gallery/GalleryCard.vue:39`, `gallery/GalleryCardModal.vue:44`, `gallery/GalleryDraftsSection.vue:43`. The Epicycles/Series mode-label map is independently re-authored four times: `BasisSelector.vue:47-51`, `labels.ts:32-34`, `GalleryCard.vue:42-47`, `GalleryCardModal.vue:47-52`. A third parallel map (`basisTooltips`, `BasisSelector.vue:63-67`) is keyed by the same domain and lives only here.

`lib/basis-display.ts` (7 LOC, `lane-frontend.md:124`) is the obvious owner and exports only the icon/label/color record. The consequence is not hypothetical: a fourth basis added to `basisDisplay` gets a pill (line 139 iterates the record) with **no tooltip** (line 70 falls back to the raw key), **no toggle semantics beyond generic multi-select** (line 107), and **no mode label** — and the type system cannot see it, because `basisDisplay` is `Record<string, …>` with no key union.

**Falsifier** if the six sites disagreed on purpose (different domains), consolidation would be wrong. They are character-identical in intent and four of them are character-identical in code.

### MAJOR-6 — `basisDisplay` snapshots a `reactive()` object at module-eval, so the pills never track the theme (and today *diverge from* the tracks)

`lib/basis-display.ts:1-7` reads `VIZ_COLORS.fourier/chebyshev/legendre` into a plain object literal at import time. `VIZ_COLORS` is `reactive()` (`colors.ts:77-87`) and is mutated later by `resolveVizColors()` (`colors.ts:90-96`) from `App.vue:10-17`, including on every dark-mode toggle. A literal read copies the string; no dependency is registered.

Consequence at `BasisSelector.vue:145` (`'--pill-color': info.color`): the pill tint is frozen at the hardcoded fallbacks `#bf4040 / #3d72b8 / #9545b8` for the life of the page, in both themes. Composed with BLOCKER-1 this produces the split described there: **pills red/blue/purple, tracks grey, canvas curves red/blue/purple, canvas epicycle trail grey** — the snapshot accidentally *shields* the pills from the parse failure, which is why the defect has survived.

Corroboration in-tree that the timing hazard is known: `equation/composables/useCoeffHover.ts:60-64` comments *"the canonical fallback used when `resolveVizColors` has not yet run (mounted before paint)"* and guards `VIZ_COLORS.amber || VIZ_COLORS.golden` — a guard that is itself useless, since the failure mode is a truthy `"#888888"`, not an empty string.

**Falsifier** if `basis-display.ts` used a getter/computed, or if `resolveVizColors` ran before module eval (impossible — it is an `onMounted` callback), the snapshot would track. Neither holds.

### MAJOR-7 — the reset button *looks* disabled but is keyboard-activatable; `glass-ui/Button` ships the `disabled` prop it does not use

`BasisSelector.vue:126-134` renders `<Button variant="ghost" size="icon" :class="{ 'is-default': isDefault }" aria-label="Reset to defaults" @click.stop="resetDefaults">` with **no `:disabled`**. The "disabled" appearance is CSS only: `:307-310` `.reset-icon-btn.is-default { opacity: 0.25; pointer-events: none; }`.

`pointer-events: none` suppresses mouse/touch and the `Tooltip` trigger, but not focus and not keyboard activation: the element remains in the tab order, is announced as an enabled button, and `Enter`/`Space` fires `resetDefaults`. `node_modules/@mkbabb/glass-ui/dist/components/ui/button/Button.vue.d.ts` declares `disabled?: ButtonHTMLAttributes['disabled']` — the correct mechanism is one attribute away. Composed with BLOCKER-2, the "already at defaults" state is one Tab + one Enter from a 200→50 recompute.

The same 19-line `.reset-icon-btn` block is duplicated verbatim in `ContourSettings.vue:387-405`, so the fix has two homes (see MINOR-5).

**Falsifier** if the Button rendered with `tabindex="-1"` or `aria-disabled`, or if `pointer-events:none` removed focusability (it does not, per CSS UI), the row dies. Neither is present: `grep -n "disabled\|tabindex" BasisSelector.vue` → no hits.

---

## §4 — MINOR / INFO

### MINOR-1 — dead code: `fourierModes`
`BasisSelector.vue:11` `const fourierModes = ["fourier-epicycles", "fourier-series"] as const;` — declared, never referenced. `grep -n "fourierModes" BasisSelector.vue` → **exactly one hit (line 11)**. It is also the union the rest of the file *should* be typed against (lines 42-49, 96-106 re-spell the two literals four more times). `tsconfig.json` sets no `noUnusedLocals` and no eslint config exists in `web/`, so nothing flags it. *Falsifier:* a template reference would show in the grep; none.

### MINOR-2 — a comment that documents a mechanism the file does not contain
`BasisSelector.vue:255-257`: *"The `:where()` selector ensures these override the variant's `h-9 px-3` defaults without raising specificity beyond a single class."* `grep -n ":where(" BasisSelector.vue` → **one hit: line 255, inside the comment itself.** There is no `:where()` selector in the stylesheet. What actually wins is Vue's scoped-style attribute (`.basis-toggle[data-v-…]`, 0-2-0) over the utility class (0-1-0) — i.e. specificity *is* raised, by exactly the mechanism the comment denies. A reader trusting the comment will mis-predict the cascade for `@apply px-2` at line 282. *Falsifier:* if the built CSS emitted `:where(...)`, the comment would be true — Vue's SFC compiler emits `[data-v-hash]`, not `:where()`.

### MINOR-3 — optional props + six unreachable fallback literals, one of which is the wrong constant
`BasisSelector.vue:13-17` declares `nHarmonics?: number` / `nPoints?: number`; the sole consumer always supplies both (`VisualizationView.vue:265-267`). The optionality forces `?? 50` / `?? 1024` at lines 29, 30, 33, 34, 80, 81 — six dead branches that must be kept in sync, and three of them carry the BLOCKER-2 constant. The sibling that models the same data declares it **required** (`ContourSettings.vue:26-29` `nHarmonics: number`). One shape, two contracts. *Falsifier:* a second call site that omits the props — `grep -rn "<BasisSelector" web/src` → one site, both bound.

### MINOR-4 — the Sample-Points input and its slider disagree on the value lattice
`BasisSelector.vue:184-193` clamps to `[128, 4096]` but does not snap to the declared `step="128"`; the slider at `:195-204` has `:step="128"`. Typing `2000` is accepted and stored; the thumb then sits off-lattice and the next drag snaps to a 128-multiple, silently discarding the typed value. (Server-side both are unbounded — `api/models/computation.py:45,50` `n_points: int = 1024` with no `ge`/`le` — so nothing downstream corrects it either.) *Falsifier:* a rounding step in the handler; there is none.

### MINOR-5 — the panel-reset affordance ignores `ConfiguratorRow`'s shipped reset API and duplicates its sibling's CSS byte-for-byte
`ConfiguratorRow.vue.d.ts` documents `canReset?: boolean` + a `reset` emit ("Show the reset affordance (top-right)… emits a `reset` event the consumer wires to its own field-clear path"). BasisSelector uses neither, hand-rolling a layer-level button (`:121-136`) whose stylesheet (`:295-313`) is **identical** to `ContourSettings.vue:387-405`. The in-file justification (*"ConfiguratorLayer has no header-actions slot"*, `:121-122`) is true of the **Layer** and irrelevant to the **Row**, which is where a per-field reset belongs. *Falsifier:* if `canReset` did not exist at glass-ui 4.0.0 — it does, in the installed `.d.ts`.

### MINOR-6 — `arr[0]` on a payload the library types as possibly `undefined`
`BasisSelector.vue:30,34` — `set: (arr) => … arr[0] ?? 50`. `Slider.vue.d.ts` types the emit as `"update:modelValue": (payload: number[] | undefined) => any`. If `undefined` ever arrives, this throws `TypeError: Cannot read properties of undefined` inside a computed setter (the `?? 50` guards a missing *element*, not a missing *array*). The shipped Slider forwards straight to reka's `SliderRoot` via `useForwardPropsEmits` (`dist/slider-DQ95MET2.js`, `emits: ["update:modelValue","valueCommit"]`), which does not emit `undefined` on the drag path — so this is a typed hazard, not a live crash. `SliderControl.vue:55` has the identical hole, so it is a shared idiom, not a local slip. *Falsifier:* a reka path that clears the model to `undefined` (e.g. a future `v-model` reset) would promote this to MAJOR.

### MINOR-7 — five redundant `as string` casts
`BasisSelector.vue:139,144,145,146,149` — `key as string` over a `v-for` on `Record<string, …>`, where the key is already `string`. Assertion noise that would mask a real narrowing if `basisDisplay` were ever given a key union (the fix MAJOR-5 wants). *Falsifier:* if `basisDisplay` were `Record<BasisKey, …>` the casts would be lossy-but-meaningful; it is `Record<string, …>` (`basis-display.ts:3`).

### MINOR-8 — the tooltip map is a third parallel registry with a silent fallback
`BasisSelector.vue:63-71` — `basisTooltips` duplicates `basisDisplay`'s key domain; `getBasisTooltip` returns the **raw key** for anything unmapped, so an unlisted basis ships a tooltip reading `legendre-quadrature`. A missing description should be no tooltip, not a leaked identifier. *Falsifier:* a `?? ""` + `v-if` would be the correct posture; neither is present.

### INFO-1 — R5-7 falsified at the loop, confirmed one level down (carry to F.W4)

**The R5-7 form does not bite here.** BasisSelector has exactly one `v-for` (`grep -n "v-for" BasisSelector.vue` → **line 139 only**), and it sits on `<Tooltip>` — a *registered component callsite*, structurally identical to the leaf that R5-7 found **populated**: `instance.loop.presets` keyed `"callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"` (intake row R5-7). A component-callsite-keyed deriver registers this loop. **Explicit contradiction of any assumption that the class generalizes:** it does not, at this file's loop.

**The adjacent form does bite.** R6's cure (row R6-5) added the family `NATIVE_TEMPLATE_LOOP` (`nativeTemplateLoops: 16`) — **loops only**. BasisSelector's two primary numeric controls are native, non-loop elements: `<input type="number" aria-label="Harmonics">` (`:157-166`) and `<input type="number" aria-label="Sample Points">` (`:184-193`). A callsite-keyed control inventory of this file sees **2 `Slider` + 4 `Button`-ish component callsites and zero of the two inputs** — a 2-of-4 undercount of the panel's editable surface, and the two it misses are precisely the ones MAJOR-2 indicts. Three native `<span class="basis-icon">` (`:148`) inside the registered loop are likewise uncounted. **Carry:** F.W4's per-component census must count native *elements*, not merely native *loops*, or it inherits the same blind spot one level down from where R6 cured it. *Falsifier:* if the R6 family were `NATIVE_TEMPLATE_ELEMENT` rather than `NATIVE_TEMPLATE_LOOP`, the inputs would register — the intake row names the family and its `nativeTemplateLoops` counter explicitly.

### INFO-2 — census line correction
`lane-frontend.md:87` describes BasisSelector as "Basis toggles + **per-basis** term sliders". The two sliders are global contour parameters shared with `ContourSettings` (`VisualizationView.vue:260,266,270` bind the same `nHarmonics`/`nPoints` refs to both), not per-basis. Suggested replacement: *"Basis toggle pills + the global harmonics/sample-points editors (the sole editor of both; the compute trigger lives in `ContourSettings.vue:140-149`)."* *Falsifier:* a per-basis binding anywhere in the file — there is none.

---

## §5 — Executed probe transcript (read-only; fourier's own `vue` + the file's own regexes)

Run from `web/` against `node_modules/vue`; script written to the session scratchpad only, nothing written to either product repo.

```
A) selected.value === props.activeBases : true
   parent array after child push       : ["fourier-epicycles","chebyshev"]     ← MAJOR-1

B) "oklch(0.579 0.201 30.4)"                                    -> #888888     ← BLOCKER-1
   "oklch(0.693 0.151 28.1)"                                    -> #888888
   "light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))" -> #888888
   "hsl(35 76% 35%)"                                            -> HSL-ARM     (the one fourier patched)

C) input ""    -> emit 1      input "abc" -> emit 1                            ← MAJOR-2
   input "1e3" -> emit 1      input "07"  -> emit 7      input "250" -> emit 250
```

Probe A instantiates `ref(parentRef.value)` exactly as line 37 does. Probe B replays `cssVarToHex`'s four arms (`colors.ts:23-58`) verbatim against the four token strings glass-ui/fourier actually ship. Probe C replays the line-165 expression verbatim.

---

## §6 — Superlatives (L-18 both ways; each carries severity, provenance, falsifier)

**SUP-1 — zero teardown surface. Severity: INFO (credit).**
`grep -nE "addEventListener|setInterval|setTimeout|requestAnimationFrame|Observer|onUnmounted|onBeforeUnmount" BasisSelector.vue` → **no hits.** The component's only reactive resource is the single `watch` at line 39, created in setup scope and therefore auto-disposed with the instance. This matters concretely: the component is mounted inside a `<Transition>` behind `v-if="hasData"` (`VisualizationView.vue:264-268`), so it mounts and unmounts repeatedly across recomputes — a component with manual listeners here would leak once per cycle. It does not. *Falsifier:* any imperative resource acquisition — the grep is exhaustive over the file.

**SUP-2 — the clamp lives at the emit boundary in all four editors, and no numeric mirror exists.**
Lines 30, 34, 165, 192 each clamp before emitting; the component keeps **no local copy** of `nHarmonics`/`nPoints` (contrast `selected`, its one mirror and the subject of MAJOR-1). Props are the single source of truth for both numbers, so no divergence between displayed and owned value is possible. This is why MAJOR-2's caret bug is a *coercion* bug and not a *desync* bug. *Falsifier:* a `ref` shadowing either number — none exists (`grep -n "ref(" BasisSelector.vue` → line 37 only).

**SUP-3 — glass-first retint via per-instance custom properties, no variant fork, no `!important`.**
`:145` (`--pill-color`), `:176`/`:203` (`--track-color`), `:318-323` (projection onto the four `--slider-scrub-*` tokens), `:258-277` (`.basis-toggle` adds tint + `min-w` + border weight only, driven off `aria-pressed`). `grep -n "!important" BasisSelector.vue` → **no hits**; no variant class is re-declared. This is exactly the posture the constellation mandates (glass-ui is the design system; retint per instance, do not fork) and it is followed cleanly. The defect above it (BLOCKER-1) is a *value* failure in `colors.ts`, not a mechanism failure here — the projection itself is correct and will simply start working the day the parser does. *Falsifier:* a re-declared `.glass-*` selector or an `!important` — neither present.

**SUP-4 — Goldilocks module size with an honest three-way split.**
324 LOC = 117 script / 90 template / 115 style, no branch deeper than two levels, no function longer than 24 lines (`toggleBasis`, `:93-116`). For comparison in the same directory: `BasisCanvas.vue` 547, `ContourSettings.vue` 470, `VisualizationView.vue` 486 (`lane-frontend.md:79-87`). No god-module pressure, no extraction owed on size grounds — the extraction owed (MAJOR-3, MAJOR-5) is owed on *duplication* grounds, which is a different and cheaper repair. *Falsifier:* a hidden helper module — the file imports 6 symbols and declares 7 locals; `wc -l` = 324.

---

## §7 — Ledger

| # | Sev | Row | Anchor |
|---|---|---|---|
| 1 | **BLOCKER** | `--track-color` → `#888888`; both tracks grey; same dead value greys the canvas epicycle trail | `:176,203,318-323` · `colors.ts:23-58,90-96` · glass-ui `color-radius.css:263` |
| 2 | **BLOCKER** | Reset writes `n_harmonics=50` vs canonical 200; `isDefault` inverted at pristine | `:73-91` · `defaults.ts:7` · `shared.py:12` |
| 3 | MAJOR | `selected` aliases the parent's reactive array; first toggle mutates it in place | `:37,108-113` (probe A) |
| 4 | MAJOR | Per-keystroke emit + empty→min coercion; field cannot be cleared | `:157-166,184-193` (probe C) |
| 5 | MAJOR | `SliderControl` chassis re-rolled twice; identical CSS, drifted retint tokens | `:212-233,318-323` vs `SliderControl.vue:117-138,143-149` |
| 6 | MAJOR | Fourier "off" unrepresentable end-to-end; comment scopes the risk to the canvas only | `:103-105` · `useWorkspaceLoader.ts:53,109-114` · `workspace.ts:351-353` |
| 7 | MAJOR | Basis-key domain duplicated ×6 (+ mode labels ×4); 7-LOC owner unused | `:47-51,98` + 5 files |
| 8 | MAJOR | `basisDisplay` snapshots a `reactive()` at module-eval; pills never track theme | `basis-display.ts:1-7` · `:145` |
| 9 | MAJOR | Reset button keyboard-activatable while styled disabled; `Button` ships `disabled` | `:126-134,307-310` |
| 10 | MINOR | Dead `fourierModes` const | `:11` |
| 11 | MINOR | Comment documents a `:where()` mechanism absent from the file | `:255` |
| 12 | MINOR | Optional props → 6 unreachable fallbacks; sibling declares them required | `:13-17,29-34,80-81` |
| 13 | MINOR | Points input off-lattice vs `step=128` slider | `:184-193,195-204` |
| 14 | MINOR | `ConfiguratorRow.canReset`/`@reset` unused; reset CSS duplicated with sibling | `:121-136,295-313` |
| 15 | MINOR | `arr[0]` on a `number[] \| undefined` payload | `:30,34` |
| 16 | MINOR | Five redundant `as string` casts | `:139-149` |
| 17 | MINOR | Tooltip map leaks raw keys as fallback text | `:63-71` |
| 18 | INFO | R5-7 falsified at the loop; confirmed for native non-loop controls → F.W4 | `:139,148,157,184` |
| 19 | INFO | Census line correction: sliders are global, not per-basis | `lane-frontend.md:87` |
| S1 | credit | Zero teardown surface | grep-exhaustive |
| S2 | credit | Emit-boundary clamping, no numeric mirror | `:30,34,165,192` |
| S3 | credit | Glass-first per-instance retint, no fork, no `!important` | `:145,176,203,318-323` |
| S4 | credit | Goldilocks 324 LOC (117/90/115) | `wc -l` |

**Repair sequencing (for the wave, not authored here):** BLOCKER-2 is a one-constant fix and should not wait (`DEFAULTS.nHarmonics → CONTOUR_DEFAULTS.n_harmonics`, and delete the local `DEFAULTS` in favour of the shared module). BLOCKER-1 is already inside F.W2's scope (`colors.ts` deletion in favour of value.js parsing, census:174) — this file supplies the consequence that justifies its priority, and MAJOR-6 must land with it or the pills will still not move. MAJOR-3/5 are one extraction each and are the cheapest durable wins.
