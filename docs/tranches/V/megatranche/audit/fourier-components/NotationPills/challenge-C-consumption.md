claude-opus-5[1m]

# CHALLENGE · `NotationPills.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/NotationPills.vue` (47 lines).
**Axis** how this component consumes value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the 45-operation fourier API; props/emits contract quality; integration seams.
**Mode** static, read-only. No dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` (matches intake R4-9 exactly). `git status --porcelain` on `web/src/components/equation/NotationPills.vue` and `web/src/lib/equation/notation.ts` → **empty**; both files are CLEAN while 5 siblings in `components/equation/` are dirty. Last touch `262c3d0 2026-06-02 feat(adopt): I AQ-gated arms + 3.1.0 adoption` — i.e. the file was authored against glass-ui **3.1.0** and has not been revised since the working-tree bump to `^4.0.0`.

**Read whole (read-only):** the SFC; `lib/equation/notation.ts`; `lib/equation/types.ts`; `lib/equation/api.ts`; `lib/equation/index.ts`; both hosts (`visualization/EquationPanel.vue`, `equation/FunctionInput.vue`) and their hosts (`VisualizationView.vue`, `EquationView.vue`); `composables/useEquationCache.ts`; `lib/colors.ts`; `src/style.css`; `vite.config.ts`; `web/package.json`; `web/tsconfig.json`; the in-tree references `visualization/BasisSelector.vue` + `visualization/EasingPicker.vue`; installed `@mkbabb/glass-ui@4.0.0` dist (`button.js`, `button-BNDWhAZb.js`, `cn-DJXf4yaB.js`, `styles/index.css`, `styles/glass/surfaces.css`, `styles/theme/radius.css`, `components/ui/button/index.d.ts`, `components/custom/tabs/SegmentedTabs.vue.d.ts`, `components/custom/toggle-chip/ToggleChip.vue.d.ts`, `components/ui/toggle-group/index.d.ts`); installed `@mkbabb/value.js@0.13.0` dist; producer `glass-ui@7.0.0` (`src/components/button/{Button.vue,index.ts}`, `src/components/chip/*`, `src/components/tabs/SegmentedTabs.vue`, `src/components/_shared/axes.ts`, `CHANGELOG.md`, `MIGRATION.md`); the API leaf `api/models/equations.py`, `api/routers/equations.py`, `src/fourier_analysis/symbolic/{simplification,latex_rendering}.py`; the last built artifacts under `web/dist/assets/`.

---

## §0 · Verdict

**13 defects (2 BLOCKER · 4 MAJOR · 6 MINOR · 1 INFO) · 4 superlatives.**

The component is a **correct consumer of glass-ui 4.0.0 and a silently-broken consumer of glass-ui 7.0.0**, a **zero consumer of value.js and keyframes.js by construction**, and an **exact but unfixtured consumer of the API's `notation` leaf**. Its central consumption defect is not a wrong import — it is a *bypass*: the component hand-rolls, in 10 lines of scoped CSS over 3 frozen `hsl()` literals, a selection affordance that (a) the pinned producer already ships as a first-class primitive, (b) the app's own colour arm (`lib/colors.ts` + `--viz-*`) already makes theme-reactive, and (c) value.js exists to compute. The bypass is what produces the measured contrast failures and the missing ARIA state.

| # | severity | one line |
|---|---|---|
| D-1 | **BLOCKER** | `variant="outline"` is an *undocumented, typecheck-silent* removal at glass-ui 7.0.0 (`variant` → `emphasis`+`tone`) |
| D-2 | **BLOCKER** | selected state has **no** programmatic exposure — no `aria-pressed`/`aria-checked`/`role`, contradicting the component's own source-of-record docblock |
| D-3 | MAJOR | active-pill text/border contrast measured **2.78–3.85 : 1** (dark) and **3.84 : 1** (light, Trig); border indicator **1.38–1.89 : 1** |
| D-4 | MAJOR | the 3 pill colours are frozen module literals — outside `--viz-*`, outside `resolveVizColors()`, outside value.js. The F.W2 value.js surface here is **empty, and that is the defect** |
| D-5 | MAJOR | `color-mix()` with no fallback; the built artifact shows `.notation-active` emitted **without** the `@supports` guard its sibling got — the entire selected state evaporates on pre-`color-mix` engines |
| D-6 | MAJOR | hand-rolled shadow of `SegmentedTabs`, which is available **at the pinned 4.0.0**, structurally matches `NOTATION_OPTIONS`, and is already imported 1 line from a host |
| D-7 | MINOR | `border-radius: 9999px` is a **triple**-redundant no-op |
| D-8 | MINOR | legacy manual v-model idiom (8 lines) where the sibling host already uses `defineModel`; forces double evaluation of the active predicate |
| D-9 | MINOR | no tooltip/description on cryptic glyphs; `SegmentedTabOption.tooltip?` exists at 4.0.0 and every sibling pill family uses `<Tooltip>` |
| D-10 | MINOR | `--pill-color` is an unnamespaced, `@property`-unregistered global shared with a second component, read with no `var()` fallback |
| D-11 | MINOR | the 12%/40% tint recipe is copy-pasted in **three** components with drifted geometry |
| D-12 | MINOR | `clsx` + `class-variance-authority` are **live runtime externals** of the exact chunk this file imports, mis-classified as devDeps — the hitherto corpus calls them dead |
| D-13 | INFO | the `notation` enum is independently re-enumerated in **4** places with a silent Python fallback and **zero** conformance test (R6-8 instance) |

| # | superlative |
|---|---|
| S-1 | deep-path import discipline that provably keeps `lib/api.ts` (672 LOC) out of the pill's chunk |
| S-2 | the client↔operation `notation` leaf is **exact and end-to-end live** across 4 independent enumerations |
| S-3 | the 4.0.0 Button consumption idiom is **correct in every particular**, byte-shape-identical to the in-tree production reference |
| S-4 | the import closure carries **zero** keyframes.js and **zero** value.js — the component sits entirely *outside* the tri-package RESOLUTION DEADLOCK |

---

## §1 · The component, whole

```
 1  <script setup lang="ts">
 2  import { Button } from "@mkbabb/glass-ui/button";
 3  import { NOTATION_OPTIONS } from "@/lib/equation/notation";
 4  import type { NotationMode } from "@/lib/equation/types";
 6  defineProps<{ modelValue: NotationMode; }>();
10  const emit = defineEmits<{ "update:modelValue": [value: NotationMode]; }>();
16  <div class="flex flex-wrap justify-center gap-1.5">
17    <Button v-for="opt in NOTATION_OPTIONS" :key="opt.value"
20      variant="outline" size="sm" class="notation-pill"
23      :class="{ 'notation-active': modelValue === opt.value }"
24      :style="modelValue === opt.value ? { '--pill-color': opt.color } : {}"
25      @click="emit('update:modelValue', opt.value)">
27      <span class="cm-serif …">{{ opt.icon }}</span> {{ opt.label }}
37  .notation-pill  { border-radius: 9999px; min-width: 4.5rem; justify-content: center; }
42  .notation-active{ background: color-mix(…12%…); border-color: color-mix(…40%…); color: var(--pill-color); }
```

**The complete consumption surface** (its whole import closure, verified):

| dependency | consumed | via |
|---|---|---|
| `@mkbabb/glass-ui` ^4.0.0 | `Button` only, subpath `/button` | `NotationPills.vue:2` |
| `@mkbabb/value.js` 0.13.0 | **NOTHING** | — |
| `@mkbabb/keyframes.js` 4.3.0 | **NOTHING** | — |
| fourier API (45 ops) | `notation` field of 2 of the 45 operations, *indirectly* | via host refs → `lib/equation/api.ts:24,50` |
| app-local | `NOTATION_OPTIONS`, `type NotationMode` | `:3`, `:4` |

Consumers: exactly **two**, on **mutually exclusive routes** — `EquationPanel.vue:96` (hosted by `VisualizationView.vue:26`, routes `/v/:slug` + `/w/:slug?`) and `FunctionInput.vue:223` (hosted by `EquationView.vue:14`, route `/equation`).

---

## §2 · BLOCKERS

### D-1 · BLOCKER — `variant="outline"` is a typecheck-silent removal at glass-ui 7.0.0, and the producer's own migration docs never mention it

`NotationPills.vue:20` binds `variant="outline"`.

**At the pinned 4.0.0 this is correct** (see S-3). **At 7.0.0 the `variant` prop does not exist.**

- Producer `glass-ui/src/components/button/Button.vue:15-32` declares the entire prop surface: `emphasis?: ButtonEmphasis` (`"primary"|"secondary"|"quiet"|"text"`), `tone?: Tone`, `size?: ButtonSize`, `iconOnly`, `loading`, `type`, `disabled`, `class`. `grep -n "variant" src/components/button/Button.vue` → **0 hits**.
- `glass-ui/src/components/button/index.ts:1-6` exports `Button`, `ButtonProps`, `ButtonEmphasis`, `ButtonSize`. There is **no `buttonVariants` export at 7.0.0** — `grep -rn "buttonVariants" src/` → **0 hits** (it exists at 4.0.0: `dist/components/ui/button/index.d.ts`).
- `glass-ui/CHANGELOG.md:63-64` records only the *type* rename: "``/button``: `ButtonVariants` → `ButtonProps` / `ButtonEmphasis` / `ButtonSize`". `MIGRATION.md:167` and `:445` say the same. **`grep -c "emphasis" MIGRATION.md` → 0. `grep -c "emphasis" CHANGELOG.md` → 0.** The producer documents the removal of a *type* and never documents the removal of the *prop* or its successor axis.
- The only `variant`-shaped Button rows in `MIGRATION.md` are from an earlier hop and *presuppose* `variant` still exists: `:1198` "`<Button variant="destructive">` → `<Button tone="destructive">` … a destructive `outline`/`ghost` is now expressible: `<Button variant="outline" tone="destructive">`". A consumer following `MIGRATION.md` linearly lands on 7.0.0 still writing `variant="outline"`.

**Why it is silent.** `variant` is not a declared prop at 7.0.0, so Vue routes it to `$attrs`; `Button.vue:83-102` renders a single `<Primitive>` root with `inheritAttrs` at its default, so `variant="outline"` lands as a **literal DOM attribute** on the `<button>`. `vue-tsc` does not error on excess attributes passed to a component. The `build` gate is `vue-tsc -b && vite build` (`web/package.json` scripts) — **it will stay green.** The pill silently falls back to `emphasis: "secondary"` (`Button.vue:36-42` `withDefaults`), losing `border border-input bg-background` and every `aria-pressed:` arm.

**Blast radius beyond this file** (measured across `web/src/**/*.vue`): `variant="ghost"` ×49, **`variant="outline"` ×29**, `variant="glass"` ×12, `destructive` ×4, `default` ×4, `secondary` ×1, `link` ×1. `@mkbabb/glass-ui/button` is the single most-imported subpath in the tree (35 occurrences per lane-frontend §3).

**Contradicts the corpus.** `lane-frontend.md §5` "Rows that hit fourier-analysis TODAY" enumerates 3 removed subpaths, 3 removed dock members, 1 removed type, and 4 peer floors. **It does not list the Button `variant` prop removal** — the largest single break surface in the uplift, on the most-imported subpath. §5's closing budget ("Budget an order of magnitude above 46 lines") is therefore derived from an incomplete break table.

**Falsifier.** Show a `variant` prop, a `variant` fallthrough shim, or a `buttonVariants` export anywhere in glass-ui 7.0.0's `src/components/button/` or its published `exports` — or show that `vue-tsc` errors on an undeclared attribute passed to a Vue component. Any of the three kills this row. (Secondary falsifier: if the tranche pins glass-ui at ≤4.x forever, the row degrades to INFO.)

---

### D-2 · BLOCKER — the selected state has no programmatic exposure, contradicting the component's own source-of-record docblock

`NotationPills.vue:16-32` renders three sibling `<Button>`s in a bare `<div>`. There is **no `role` on the group, no `aria-label`, no `aria-pressed`, no `aria-checked`, no `name`, no `id`.** Selection is expressed *solely* by a CSS class (`:23`) and an inline custom property (`:24`).

**The file's own source-of-record says otherwise.** `lib/equation/notation.ts:3-7` — the docblock directly above `NOTATION_OPTIONS`, the array this component iterates — reads:

> "Notation pill definitions with LaTeX-style icons and colors, **matching the `.basis-toggle` pattern from BasisSelector** (glass-ui `<Button variant="outline" size="sm">` **with `aria-pressed` driving an instance-scoped tint**)."

The referenced pattern is real and in-tree: `BasisSelector.vue:141-146` is the *identical* Button call — `variant="outline"`, `size="sm"`, `class="basis-toggle"`, `:style="… { '--pill-color': info.color } : {}"` — **plus `:aria-pressed="isBasisActive(key)"` at `:144`**, and its tint is keyed off it: `BasisSelector.vue:269` `.basis-toggle[aria-pressed="true"] { … }`. NotationPills copied the geometry and the `--pill-color` mechanism and **dropped the attribute the mechanism is documented to hang on**, substituting a class.

**The tree also contains the written a11y doctrine for exactly this widget.** `EasingPicker.vue:9-15`:

> `role="group"` makes this an allowed child of the parent `role="menu"`; each easing chip is a mutually-exclusive option, so it carries `role="menuitemradio"` + `aria-checked` … (`aria-pressed` would mislabel a radio as a toggle).

`lane-frontend.md §8` explicitly banks this as hygiene already achieved. NotationPills is the same shape — a mutually-exclusive option set — and carries **neither** `aria-pressed` nor `aria-checked` nor `role`.

**It also forfeits the producer's own selected-state arm.** The installed 4.0.0 `outline` variant string (`dist/button-BNDWhAZb.js`) is:

```
outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground
          active:bg-accent/80 aria-pressed:bg-accent aria-pressed:text-accent-foreground"
```

Every variant in the CVA ships an `aria-pressed:` arm. The component pays for a Tailwind-generated selected-state ruleset it can never trigger, then re-implements it worse (D-3, D-5).

**Consequences, each independently a WCAG failure.**
1. **4.1.2 Name, Role, Value** — no assistive technology can report which of the three notations is active. The accessible tree sees three identical unpressed buttons.
2. **1.4.1 Use of Color** — selection is conveyed by colour alone; there is no shape, glyph, checkmark, or state change (see D-3 for the measurement that the colour also fails).
3. **2.1.1 / 2.4.3 keyboard** — three separate tabstops with no roving `tabindex` and no arrow-key traversal, where the correct radio-group idiom is one tabstop.

**Falsifier.** Show `aria-pressed`, `aria-checked`, `aria-selected`, `role`, or any `data-state`-bearing wrapper in `NotationPills.vue` — the file is 47 lines and reproduced whole in §1. Or demonstrate that glass-ui `Button` synthesises pressed state from a class name (`dist/button-BNDWhAZb.js` binds only `data-slot`, `data-variant`, `data-size`, `type`, `disabled`; it does not). **UNPROVEN-NEEDS-LIVE (SS-13)** for the AT-observed behaviour; the DOM-shape claim is fully source-proven.

---

## §3 · MAJOR

### D-3 · MAJOR — measured contrast failure in both themes; the selection indicator fails non-text contrast everywhere

`NotationPills.vue:42-46` paints the active pill as `color: var(--pill-color)` over `background: color-mix(in srgb, var(--pill-color) 12%, transparent)` with `border-color: color-mix(… 40% …)`. `--pill-color` is one of three frozen literals (`notation.ts:15-17`):

```
Trig   hsl(6, 72%, 49%)      Exp  hsl(224, 58%, 46%)      Polar  hsl(286, 46%, 47%)
```

Page surfaces resolve from the glass-ui token cascade the app imports at `style.css:3`:
`--background: var(--neutral-0)` (`dist/styles/tokens/color-radius.css:57`), with `--neutral-0: hsl(40 30% 98%)` light (`tokens/color-radius.css:40`) and `hsl(24 9% 4%)` dark (`tokens/dark-arm.css:42`).

Computed WCAG 2.1 contrast (sRGB relative luminance; the 12%/40% tints composited over the opaque page surface, which is what `color-mix(… , transparent)` produces):

| pill | label on 12% tint — **light** | label on 12% tint — **dark** | 40% border vs page — light | dark |
|---|---|---|---|---|
| Trig `hsl(6,72%,49%)` | **3.84** ✗ | **3.85** ✗ | 1.84 ✗ | 1.53 ✗ |
| Exp `hsl(224,58%,46%)` | 5.37 ✓ | **2.78** ✗✗ | 1.89 ✗ | 1.38 ✗ |
| Polar `hsl(286,46%,47%)` | 4.67 ✓ | **3.19** ✗ | 1.84 ✗ | 1.45 ✗ |

The label is normal-size text (`.btn-pill` sets `font-size: var(--control-text)`, `dist/styles/glass/surfaces.css`), so the threshold is **4.5 : 1** (WCAG 1.4.3 AA). **Four of six text cells fail**; Exp in dark mode (2.78) fails even the 3:1 large-text floor. The border — the sole non-colour-redundant indicator of selection — measures **1.38–1.89 : 1** against the page in every cell, against the **3 : 1** floor of WCAG 1.4.11 non-text contrast.

**The repo already remediates precisely this class of defect, and this component is outside the remediation.** `src/style.css:119-131` carries a light-mode WCAG darken of `--viz-amber` from `hsl(35 70% 42%)` to `hsl(35 76% 35%)` (≈4.6:1), annotated as a held glass-ui carry (`lane-frontend §8` records it). That machinery keys off `--viz-*` custom properties. `NOTATION_OPTIONS`' colours are not `--viz-*` — they are TypeScript string literals — so no token-level darken can ever reach them.

**Falsifier.** (a) Recompute: the numbers are pure functions of the five hex/hsl values cited, all with file:line provenance; a different luminance formula or a different `--neutral-0` kills the row. (b) Show that the painted backdrop is not the page surface — this is the honest limit and is real: `EquationPanel.vue:70` hosts the pills inside `.eq-panel glass-wash`, a translucent surface over a canvas, so the *effective* backdrop varies. **UNPROVEN-NEEDS-LIVE (SS-13)** for the composited on-canvas figure. The `FunctionInput` host (`:221-224`, inside a `CollapsibleSection` on the opaque `/equation` route) has no such caveat, and the light-mode Trig failure (3.84) stands there unconditionally.

---

### D-4 · MAJOR — the value.js consumption surface is empty, and that is the defect

The mandate names value.js 0.13's F.W2 migration surface. For this component that surface is **∅**: `NotationPills.vue` imports no value.js, `lib/equation/notation.ts` imports no value.js, and neither appears among the 5 value.js sites `lane-frontend §5` enumerates (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — all `easeInOutSine`/`timingFunctions`). **Nothing to migrate.** That is not neutrality — it is a three-way bypass:

1. **Bypasses the app's own colour arm.** `lib/colors.ts` (117 LOC) exists to resolve `--viz-*` CSS custom properties into a `reactive()` palette (`colors.ts:79-89`) and re-resolve it on theme flip; `App.vue:11-17` wires a `MutationObserver` on `documentElement.class` to `resolveVizColors()` for exactly that purpose. `NOTATION_OPTIONS` is a module-level `const` array of string literals (`notation.ts:14-18`) — evaluated once at module load, never reactive, never re-resolved. **Flipping dark mode re-tints every `--viz-*`-driven surface in the app and leaves the notation pills frozen.** That is the mechanical cause of D-3's dark-mode column.
2. **Bypasses value.js.** Installed `@mkbabb/value.js@0.13.0` exports, at the bare specifier `@mkbabb/value.js` (its `exports` map has exactly one key, `"."`), a full colour surface — `Color`, `ColorSpace`, `ColorSpaceMap`, `ColorSpaceRange`, `COLOR_SPACE_RANGES`, `COLOR_SPACE_NAMES`, `ColorUnit`, `colorUnit2`, `color2`, `ColorRamp`, `ColorInterpKeyword`, `COLOR_NAMES` (verified in `dist/index.d.ts`). The tri-package deadlock (`lane-frontend §5`) exists to get this repo onto value.js 4.0; the pill palette is a textbook consumer of it and consumes none of it.
3. **Duplicates value.js by hand.** `lib/colors.ts:19-73` is 55 lines of regex-driven `hsl()`/`rgb()`/bare-triplet parsing plus hand-written `hslToHex`/`rgbToHex` — a re-implementation of exactly what value.js's colour arm does, with a `return "#888888"` silent-failure path at `:23` and `:56`. The census names "the hand-rolled colors.ts arms" as F.W2 scope; NotationPills is the component that would most benefit and touches neither the hand-roll nor the real thing.

**Falsifier.** Show any `@mkbabb/value.js` import reachable from `NotationPills.vue` (the closure is `glass-ui/button` → `cn-*.js`, `vue`, `reka-ui`, `class-variance-authority`; plus two app-local modules — verified by reading `dist/button.js` and `dist/button-BNDWhAZb.js` import headers). Or show that `NOTATION_OPTIONS`' colours re-resolve on theme flip — they are `const` string literals with no getter, no `computed`, no `reactive`.

---

### D-5 · MAJOR — `color-mix()` with no fallback; the built artifact proves the selected state has no degradation path

`NotationPills.vue:43-44` declares `background` and `border-color` **solely** as `color-mix()`. There is no preceding static declaration.

The evidence is in the repo's own build output. `web/dist/assets/NotationPills-CjQ8uEBB.css` (2 991 B, built 2026-06-12) emits:

```css
.notation-active[data-v-fe3be5c9]{background:color-mix(in srgb,var(--pill-color) 12%,transparent);
  border-color:color-mix(in srgb,var(--pill-color) 40%,transparent);color:var(--pill-color)}
```

— **bare, with no `@supports` guard.** Immediately above it in the *same chunk*, `SliderControl`'s rules were emitted as:

```css
.inline-number[data-v-0294398e]{…border-bottom:1px solid #0000;…}
@supports (color:color-mix(in lab,red,red)){.inline-number[data-v-0294398e]:hover{border-bottom-color:color-mix(in srgb,var(--foreground) 30%,transparent)}}
```

Lightning CSS produced the guarded, fallback-bearing form for `SliderControl` **because that rule declares a static colour first**, and produced the unguarded form for `.notation-active` because there is nothing to fall back to. On an engine without `color-mix` (Safari < 16.2, Chrome < 111, Firefox < 113), both declarations are invalid-at-computed-value: the active pill keeps the plain `outline` background and border, i.e. **it is visually indistinguishable from the two inactive pills.** Compounded with D-2 (no `aria-pressed`), the selected state is then undetectable by *any* means — visual or programmatic.

**Falsifier.** (a) Show a static fallback declaration in `NotationPills.vue:42-46` — the block is 5 lines and reproduced in §1. (b) Show a `browserslist`/`build.target` in `web/package.json` or `vite.config.ts` that excludes pre-`color-mix` engines — neither file declares one; `vite.config.ts` sets no `build.target`, so Vite's default (`baseline-widely-available`) applies and Lightning CSS's decision above is the artifact of record. (c) The 2026-06-12 artifact predates the `^4.0.0` install and is stale for *glass-ui* rules — but `.notation-active` is the component's own scoped CSS, unchanged since `262c3d0`, so the emission shape is current. **UNPROVEN-NEEDS-LIVE (SS-13)** for the rendered appearance on an old engine.

---

### D-6 · MAJOR — a hand-rolled shadow of `SegmentedTabs`, which is available **at the pinned 4.0.0** and already imported one line from a host

The installed `@mkbabb/glass-ui@4.0.0` ships `dist/components/custom/tabs/SegmentedTabs.vue.d.ts`, exported at `./tabs`. Its option type:

```ts
export interface SegmentedTabOption { label: string; value: string; icon?: string; disabled?: boolean; tooltip?: string; }
```

`NOTATION_OPTIONS`' element type (`notation.ts:9-13`) is `{ label: string; value: NotationMode; icon: string; color: string }` — **three of four fields are an exact structural match**, and `NotationMode` is a subtype of `string`. Its model contract is `modelValue: string` with `"update:modelValue": (value: string) => any` — the same v-model shape `NotationPills` re-declares by hand at `:6-12`. It additionally ships an `#option` slot exposing `{ option: SegmentedTabOption, active: boolean }` (the seat for the CM-serif glyph *and* the per-notation tint), `responsive` collapse to a `<Select>` below a breakpoint, and reka-ui-backed roving focus and ARIA — the entire D-2 defect, solved upstream.

**And the primitive is already in the same chunk.** `EquationView.vue:13` imports `SegmentedTabs` from `@mkbabb/glass-ui/tabs`; `EquationView.vue:14` imports `FunctionInput`, which imports `NotationPills` at `:10`. There are 3 `SegmentedTabs` sites in the tree (`EquationView.vue:13`, `GalleryView.vue:13`, `VisualizationView.vue:27`) — one in **each** of NotationPills' two host routes. Migration cost is zero new dependencies, zero new bytes, and no uplift.

**This sharpens and partly contradicts `lane-frontend §4`'s 🟡 row.** That row reads: `equation/NotationPills.vue | 47 | ./toggle-chip (4.0.0) → ./chip (5.0.0+) | currently 6× Button`. Three corrections:

1. **"6× Button" is wrong. It renders exactly 3.** `NotationPills.vue:18` iterates `NOTATION_OPTIONS`, which has exactly 3 entries (`notation.ts:14-18`). The 6 is 2 consumers × 3 — but the two consumers are on **mutually exclusive routes** (`EquationPanel` ← `VisualizationView` ← `/v/:slug`+`/w/:slug?`; `FunctionInput` ← `EquationView` ← `/equation`; `router/index.ts`), so 6 pills never co-exist in one DOM. The per-instance figure is 3, and the whole-tree figure is 6 *callsite-instances across 2 never-simultaneous routes*.
2. **`./toggle-chip` is the wrong seat even at 4.0.0.** Its own docblock (`dist/components/custom/toggle-chip/ToggleChip.vue.d.ts:1-18`) states it is "deliberately unopinionated about selection mode" and its model is `boolean`, not the mode string — adopting it would require three booleans and hand-written mutual exclusion, i.e. the same defect in a new wrapper.
3. **The producer's guidance *inverts* across the hop, and the corpus row does not carry the inversion.** At 4.0.0, `ToggleChip`'s docblock says: "*When multiple chips share an exclusive selection, wire them up this way rather than reaching for ToggleGroup.*" At 7.0.0, `glass-ui/src/components/chip/README.md:24-26` says the opposite: "*Use **ToggleGroup or SegmentedTabs** when the owner requires exclusive selection or roving focus rather than coordinating independent chips by hand.*" `lane-frontend`'s `toggle-chip → chip` arrow therefore routes the migration toward the seat the 7.0.0 producer explicitly steers *away* from. **`SegmentedTabs` (available at both 4.0.0 and 7.0.0) is the seat that survives the hop.**

Also unimported and available at 4.0.0: `./toggle-group` (`dist/components/ui/toggle-group/index.d.ts` exports `ToggleGroup` + `ToggleGroupItem`; the `ToggleGroupItem-Dzk9hWsF.js` chunk ships). `grep 'glass-ui/tabs\|toggle-group\|toggle-chip' web/src/components/equation/` → the equation tree imports `/tabs` once, and `toggle-group`/`toggle-chip` zero times.

**Falsifier.** Show that `SegmentedTabs` cannot express a per-option accent (the `#option` slot's `{option, active}` payload is the counter-evidence), or that `SegmentedTabOption` lacks `label`/`value`/`icon` at 4.0.0 (the `.d.ts` is quoted verbatim). Honest limit: `SegmentedTabOption` has **no `color` field**, so `opt.color` must ride the slot or a wrapper class — the migration is not a pure prop swap. At 7.0.0 the successor `Chip` *does* take `tone?: string` free-form (`glass-ui/src/components/chip/types.ts:12`), whereas `Button.tone` is constrained to the 5-member semantic `TONES` union (`_shared/axes.ts:52-53` — `neutral|success|warning|info|destructive`), which cannot carry a per-notation hue.

---

## §4 · MINOR

### D-7 · MINOR — `border-radius: 9999px` is a triple-redundant no-op

`NotationPills.vue:38`. Three independent sources already supply it:
1. `.btn-pill` — on the CVA base string (`dist/button-BNDWhAZb.js`, first token) — sets `border-radius: var(--radius-pill)` (`dist/styles/glass/surfaces.css`, the `.btn-pill` rule).
2. `--radius-pill: 9999px` (`dist/styles/theme/radius.css:25`).
3. `size="sm"` adds the `rounded-pill` utility (`dist/button-BNDWhAZb.js` → `sm: "h-(--control-h-sm) rounded-pill px-3"`).

Corroborated in the built artifact: `web/dist/assets/index-57FkGzlZ.css` emits `.btn-pill{…border-radius:var(--radius-pill);…}`.

`justify-content: center` (`:40`) is **not** in this category — keep it. The 4.0.0 source `.btn-pill` rule does `@apply inline-flex items-center justify-center …`, but the *stale 2026-06-12 built artifact* (glass-ui 3.1.0 era) shows `.btn-pill` emitting only `cursor:pointer; --tw-border-style:none; font-weight; border-radius; transition` — with **no `display` and no `justify-content`**. Under 3.1.0 the local declaration was load-bearing; under 4.0.0's source it is not. **UNPROVEN-NEEDS-BUILD**: a fresh `vite build` on the `^4.0.0` install settles it. `min-width: 4.5rem` is genuinely additive.

**Falsifier.** Show `--radius-pill ≠ 9999px` at the installed version (`theme/radius.css:25` is quoted), or show `.btn-pill`/`rounded-pill` absent from the consumer's generated CSS — `dist/styles/index.css:222` `@source "../*.js"` (with its 20-line rationale at `:203-221`) resolves to `dist/*.js`, where `button-BNDWhAZb.js` lives, and `.btn-pill` itself is a plain rule in the `@import`-ed `glass/surfaces.css`, so neither depends on a content scan.

### D-8 · MINOR — legacy manual v-model idiom, and it costs a double evaluation

`:6-12` spends 8 lines on `defineProps` + `defineEmits` + a named `emit` binding to express one two-way binding. The *host that imports it* already uses the modern idiom: `FunctionInput.vue:26-30` declares six `defineModel<T>()` bindings including `const notation = defineModel<NotationMode>("notation", { default: "trig" })`. Vue is pinned `^3.5.38`. `defineModel<NotationMode>()` is one line and removes `:25`'s manual emit.

The manual form also forces the active predicate `modelValue === opt.value` to be written and evaluated **twice per pill per render** — `:23` (class) and `:24` (style) — where a single `const isActive = …` in the loop, or the primitive's own `active` slot prop (D-6), evaluates once.

`modelValue` is declared **required with no default**; both hosts pass a ref, so this is currently safe, but see D-13/B for what a required-but-unvalidated prop admits.

**Falsifier.** Show `defineModel` unavailable at the pinned Vue (`^3.5.38`; `defineModel` is stable since 3.4) or already used in this file (it is not).

### D-9 · MINOR — cryptic glyphs with no accessible description, in a tree where every sibling pill family has one

`:27-31` renders `opt.icon` — the literal strings `"sin"`, `"eⁱ"`, `"Ae"` (`notation.ts:15-17`) — as visible, non-`aria-hidden` text, then the label. The accessible name of each button is therefore `"sin Trig"`, `"eⁱ Exp"`, `"Ae Polar"`. There is no title, no tooltip, no `aria-describedby` explaining that "Exp" means the complex-exponential form Σcₙe^{int}.

Every comparable in-tree pill family has one: `BasisSelector.vue:139` wraps each pill in `<Tooltip :text="getBasisTooltip(key)">`; `FunctionInput.vue:198-211` gives the "Auto" toggle a three-paragraph Parseval explanation. And the 4.0.0 primitive named in D-6 carries `tooltip?: string` on `SegmentedTabOption` — the field is there and unused.

Ties to intake **R3-7a** (TRUE; CARRY → F.W3): "35 Tooltip callsites over nine consumers", with `FunctionInput` contributing 2. NotationPills, hosted *inside* `FunctionInput`, is a tenth consumer-shaped site with **zero**. The F.W3 tooltip-migration budget of 35/9 should be read as 35/10 if the seat is added here.

**Falsifier.** Show a tooltip, `title`, or `aria-describedby` in the 47 lines (there is none), or argue the glyphs are self-evident — note `"Ae"` is a truncation of `Aₙe^{i(nt+φₙ)}` (`latex_rendering.py:257`) and is not self-evident.

### D-10 · MINOR — `--pill-color`: unnamespaced, unregistered, un-defaulted, and shared

`grep -rn "pill-color" web/src/` returns exactly two producer sites — `BasisSelector.vue:145` and `NotationPills.vue:24` — and six consumer sites across the two files' scoped blocks. One custom-property name, two unrelated components, **no `@property` registration anywhere in the tree** (`grep -rn "@property" web/src/` → none), and every read is bare `var(--pill-color)` with **no fallback**. Consequences: the property is not animatable/transitionable (unregistered custom properties have no type and cannot interpolate — so the `.btn-pill` `transition: background-color …, border-color …` at `glass/surfaces.css` animates the *resolved* colour only by accident of `color-mix` re-evaluation); and any future layout nesting a `BasisSelector` subtree inside a `NotationPills` subtree (or the reverse — both are Configurator-panel residents) inherits the wrong hue into whichever descendant applies its active class. Present risk is low because the two live on different routes (§1); the naming is the defect, not today's rendering.

**Falsifier.** Show an `@property --pill-color` declaration, or a third owner (there are exactly two), or a `var(--pill-color, …)` fallback (there are none).

### D-11 · MINOR — the tint recipe is copy-pasted three times with drifted geometry

The literal `12% / 40%` `color-mix` recipe exists in three components:

| site | tint source | border width | min width |
|---|---|---|---|
| `NotationPills.vue:42-46` | frozen `hsl()` literal | *(variant default 1px)* | `4.5rem` |
| `BasisSelector.vue:269-277` | `info.color` + a `:hover` arm at 16% | **`2px`** (`:261`) | **`5.5rem`** (`:259`) |
| `FunctionInput.vue:247-252` (`.preset-pill.is-active`) | **`var(--viz-fourier)`** — theme-reactive | variant default | — |

`FunctionInput.vue` is the file that *hosts* `NotationPills` (`:10`, `:223`): **two pill families with the same visual recipe sit inside one component, one theme-reactive and one frozen.** `BasisSelector.vue:249-257` carries a 9-line comment justifying its 2px/5.5rem choices as deliberate; `NotationPills` carries none for its 1px/4.5rem, so the drift reads as accident. NotationPills is also the only one of the three with **no** `:hover` arm on the active state — hovering the selected pill hands control back to the variant's `hover:bg-accent`, momentarily replacing the pill colour with the neutral accent.

**Falsifier.** Show the three recipes are intentionally distinct (BasisSelector's comment argues for *its* divergence and, by naming `.basis-toggle` as the pattern in `notation.ts:3-7`, argues NotationPills should match), or show a `.notation-active:hover` rule (there is none).

### D-12 · MINOR — `clsx` and `class-variance-authority` are LIVE runtime externals of this component's exact chunk; the corpus books them as dead

`web/package.json` lists `class-variance-authority`, `clsx`, `tailwind-merge`, and `reka-ui` under **`devDependencies`**. `lane-frontend.md §1` reports: *"Dead devDeps (measured, not estimated): `class-variance-authority`, `clsx`, `tailwind-merge` all have 0 import sites in `src/` … `DESIGN.md:32` already books 'Remove unused CVA dependency'."* — and `§9` carries it as `[P3] Dead deps`.

**That row is 1-of-3 correct.** The chunk `NotationPills.vue:2` imports resolves to `dist/button.js` → `dist/button-BNDWhAZb.js`, whose first four lines are:

```js
import { t as e } from "./cn-DJXf4yaB.js";
import { computed as t, … } from "vue";
import { Primitive as l } from "reka-ui";
import { cva as u } from "class-variance-authority";
```

and `dist/cn-DJXf4yaB.js:1` is `import { clsx as e } from "clsx";`. Both are **externals, not bundled**, and glass-ui 4.0.0 declares them **non-optional peerDependencies** (`class-variance-authority: ^0.7`, `clsx: ^2.0`, `reka-ui: ^2.0`; `peerDependenciesMeta` marks 7 peers optional and marks none of these three).

**`tailwind-merge` *is* genuinely dead** — and for a reason worth recording: glass-ui 4.0.0 does **not** use it. `cn-DJXf4yaB.js` implements a bespoke 66-rule conflict resolver (an array of `[property, regex]` pairs covering font/spacing/sizing/colour/layout groups) and exports `cn = (…t) => resolve(clsx(t))`. No `twMerge` import anywhere in the chunk.

So: "0 import sites" is true only for **direct** imports; three of the four packages are live transitive runtime externals of the most-imported subpath in the tree. Acting on `DESIGN.md:32` is safe **only** because npm auto-installs required peers of production dependencies — it is not safe under pnpm's strict resolver, under `auto-install-peers=false`, or under `--legacy-peer-deps`. No `.npmrc` exists at either the repo root or `web/`, so the behaviour is installer-default and undeclared.

**Falsifier.** Show `cva`/`clsx` bundled rather than imported in `dist/button-BNDWhAZb.js` / `dist/cn-DJXf4yaB.js` (the import headers are quoted verbatim), or show them in glass-ui's `peerDependenciesMeta` optional set (they are not), or show a `twMerge` import in the `cn` chunk (there is none — the file was read whole).

---

## §5 · INFO

### D-13 · INFO — the `notation` enum is re-enumerated four times, with a silent server fallback and no conformance fixture (an R6-8 instance)

The value NotationPills emits at `:25` crosses the client↔operation seam. That seam's enumeration exists, independently, in **four** places:

| # | site | form |
|---|---|---|
| 1 | `web/src/lib/equation/types.ts:1` | `type NotationMode = "trig" \| "exponential" \| "polar"` |
| 2 | `web/src/lib/equation/notation.ts:15-17` | the three `value:` fields of `NOTATION_OPTIONS` |
| 3 | `api/models/equations.py:22` **and** `:41` | `Field(default="trig", pattern=r"^(trig\|exponential\|polar)$")` — twice |
| 4 | `src/fourier_analysis/symbolic/latex_rendering.py:267-268` | `_EXPANDED` / `_SIGMA` dict keys |

There is **no shared fixture, no generated client, and no conformance test**. `api/tests/conformance/` holds 19 specs (`test_admin`, `test_etag`, `test_idempotency`, `test_identity`, `test_janitor`, `test_ownership`, `test_pagination`, `test_problem`, `test_publish`, `test_rate_limit`, `test_remix`, `test_sessions`, `test_slug_format`, `test_soft_delete`, `test_url_shape`, `test_visibility`, `test_diff_shape`, …) — **none for equations**. `grep -rn "notation" web/e2e/` → **empty**; `lane-frontend §1` records vitest ABSENT. Divergence at layer 4 is masked: `latex_rendering.py:280` `renderer = _EXPANDED.get(notation, render_trig)` and `:291` `_SIGMA.get(notation, render_trig_sigma)` — an unrecognised mode **silently renders trigonometric form** rather than erroring, so a client/server drift presents as "the Exp pill does nothing" with a 200 response.

This is the concrete, product-level instance of intake **R6-8** (TRUE; CARRY → F.W5): *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam."* Here the coupling is by duplicated string literal rather than by an embedded back-reference, but the failure mode R6-8 predicts is the same — a defect that cannot be localised to one side. It is also a named row inside R3-7c's "36 client edges, nine gaps" over 45 operations, and inside R3-7b's `RED_0_OF_45` OpenAPI-security gate: the two `/api/equations/*` operations this leaf reaches are 2 of the 45 that document no security.

**Falsifier.** Show a generated client, a shared schema artifact, or an equations conformance/e2e spec (`ls api/tests/conformance/` and `grep -rn notation web/e2e/` are quoted). Or show the Python `.get()` fallbacks raise (they take a default positional and do not).

**Sub-finding — the unvalidated rehydration path (MAJOR-adjacent, filed here for seam locality).**
`useEquationCache.ts:24-29` does `JSON.parse(sessionStorage.getItem("eq-tab-state-v2"))` inside a bare `try/catch` and returns it **typed as `CachedInputState` with no runtime validation**. `EquationView.vue:30` consumes it directly: `const notation = ref<NotationMode>(cached?.notation ?? "trig")`. The `?? "trig"` guards `null`/`undefined` only — **any** string in that slot passes through. It then reaches `NotationPills.vue:23-24`, where `modelValue === opt.value` is false for all three options: **the widget renders with no pill active at all**, an unrepresentable state the component has no `v-else`, fallback, or narrowing for — and with no `aria-pressed` (D-2), the state is invisible to AT as well. The same value is POSTed at `EquationView.vue:109`, where pydantic's `pattern` (`api/models/equations.py:22`) rejects it → **422 on every compute** until the user happens to click a pill.

Reachability is not hypothetical: the key is versioned `-v2`, so any future rename of a `NotationMode` member (or a v3 shape change shipped without a key bump) strands every live session in exactly this state. The component's `modelValue: NotationMode` prop is required-but-unvalidated; a control whose sole job is to show which of N modes is active should narrow at its own boundary or render a defined fallback.

**Falsifier.** Show a validator between `sessionStorage` and the ref (`useEquationCache.ts` is 47 lines and has none — no zod, no type guard, no allow-list), or show `NotationPills` handles an out-of-union `modelValue` (it does not; `:23-24` compare only).

---

## §6 · SUPERLATIVES (L-18 both ways — each carries its own falsifier)

### S-1 · Deep-path import discipline that provably keeps a 672-LOC module out of the chunk

`NotationPills.vue:3` imports `@/lib/equation/notation` — the deep path — **not** the barrel `@/lib/equation`. That barrel (`lib/equation/index.ts:1-4`) does `export * from "./types" / "./api" / "./notation" / "./presets"`, and `./api` imports `apiFetch` from `../api` (`lib/equation/api.ts:22`) — `lib/api.ts`, **672 LOC**, which itself pulls `api-problem.ts` (61). Importing the barrel for a 3-element const array would drag the entire fetch core, its inflight registry, and the ApiProblem machinery into the pill's module graph.

The discipline is **tree-wide, not accidental**: `grep -rn 'from "@/lib/equation"' web/src` → **0 hits**; `grep -rn 'from "@/lib/equation/' web/src | wc -l` → **17**. Every one of the 17 equation-lib imports in the repo is a deep path. The barrel is dead by unanimous consent.

**Falsifier.** Show a barrel import anywhere in `web/src` (there are none), or show `lib/equation/index.ts` lacks the `./api` arm (`:2` is `export * from "./api";`), or show Rollup would tree-shake it regardless — which is true for the *const* re-exports but not a reason to author the risk, and which the tree's own unanimous deep-path convention already declines to rely on.

### S-2 · The client↔operation `notation` leaf is exact and end-to-end live

Rare, in a 45-operation surface the intake measures at "36 client edges, nine gap operations" (R3-7c) and "2 clients without an operation" (R4-8): this leaf has **no gap, no dead mode, and no unreachable mode.**

- Client union `"trig"|"exponential"|"polar"` (`types.ts:1`) ≡ the three `NOTATION_OPTIONS.value` fields (`notation.ts:15-17`) ≡ pydantic `^(trig|exponential|polar)$` (`api/models/equations.py:22` for compute, `:41` for simplify) ≡ `_EXPANDED`/`_SIGMA` keys (`latex_rendering.py:267-268`).
- It is **used**, not decorative: `equations.py:91` `simplify_series(terms, req.budget, req.notation)` → `simplification.py:64` `render_latex(kept, notation, budget)` → `latex_rendering.py:280` dispatch; and `equations.py:96` `render_latex_sigma(terms, req.notation)` → `:291`. Each of the three modes maps to a **distinct renderer pair** (`render_trig`/`render_trig_sigma`, `render_exponential`/`…_sigma`, `render_polar`/`…_sigma`).
- Both client call sites are typed and reach real operations: `lib/equation/api.ts:24` `POST /api/equations/compute` and `:50` `POST /api/equations/simplify` — 2 of the 45 (`equations.py` contributes exactly 2, matching the intake's per-file breakdown).

**Falsifier.** A fourth key in `_EXPANDED`/`_SIGMA`, a missing key, a regex/union mismatch, or a mode the renderer ignores. All four enumerations were read whole; they agree exactly. (This coexists with D-13 — the leaf is *correct today* and *unfixtured against tomorrow*.)

### S-3 · The 4.0.0 Button consumption idiom is correct in every particular

Every mechanism the component leans on is verified against the installed dist, and each is right:

- **`variant="outline"` and `size="sm"` both exist.** `dist/components/ui/button/index.d.ts` types `variant` over 13 members including `"outline"`, and `size` over `default|xs|sm|lg|icon|icon-sm`.
- **`class="notation-pill"` + `:class="{…}"` merge cleanly.** Vue's compiler folds the static and dynamic class into one `class` value; `class` is a *declared prop* on Button (`dist/button-BNDWhAZb.js` props block), and the component funnels it through `cn(buttonVariants({variant,size}), props.class)`. `notation-pill` is not a Tailwind utility, so `cn`'s 66-rule conflict resolver leaves it untouched.
- **`:style` reaches the element.** `style` is *not* a declared prop, so it rides `$attrs`; Button's root is a single `<Primitive as="button">` with default `inheritAttrs`, so `--pill-color` lands on the `<button>`. Single-root is required for this and holds at **both** 4.0.0 and 7.0.0 (`glass-ui/src/components/button/Button.vue:83`).
- **Scoped CSS reaches the child root.** `.notation-pill` compiles to `.notation-pill[data-v-fe3be5c9]`; Vue stamps the parent's scope id on a single-root child component. Confirmed in the built artifact (`NotationPills-CjQ8uEBB.css`) and in production practice.
- **It is byte-shape-identical to the in-tree reference.** `BasisSelector.vue:141-146` is the same 5 bindings in the same order over the same primitive — a shipping, comment-documented (`:249-257`) production instance of the identical idiom.

**Falsifier.** Show `outline` absent from the 4.0.0 variant union, or Button multi-root (it renders one `Primitive`), or the scope id not inherited — the emitted `.notation-active[data-v-fe3be5c9]` selector in `web/dist/assets/NotationPills-CjQ8uEBB.css` is the artifact-level counter-proof to the last.

### S-4 · Zero keyframes.js, zero value.js — the component sits entirely outside the tri-package RESOLUTION DEADLOCK

`lane-frontend §5` names the deadlock the "single most consequential finding in the lane": `glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0` are one atomic transaction, because `keyframes.js@4.3.0` optional-depends `glass-ui ~4.0.0` while `glass-ui@7` peers `keyframes ^6` + `value.js ^4`.

NotationPills' **entire** transitive runtime closure is: `vue`, `reka-ui`, `class-variance-authority`, `clsx` (via `dist/cn-DJXf4yaB.js`), plus two app-local modules — verified by reading the import headers of `dist/button.js`, `dist/button-BNDWhAZb.js`, and `dist/cn-DJXf4yaB.js` whole. **No keyframes.js. No value.js. No `@lucide/vue`.** It is also outside the `lucide-vue-next → @lucide/vue` rename (35 sites) — it renders no icon component, only text glyphs.

Its motion, correspondingly, is producer-owned and free: `.btn-pill` (`dist/styles/glass/surfaces.css`) ships the coherent surface transition — `background-color`, `border-color`, `box-shadow`, `color`, `opacity` on `--duration-fast var(--ease-standard)` — with a 12-line comment recording the cascade bug that transition set exists to prevent. The active-pill cross-fade is animated with **zero** local animation code and zero keyframes.js.

**The whole uplift exposure of this component is two string literals on one element** (D-1's `variant="outline"`, and `size="sm"` which survives — `ButtonSize = Extract<Size, "xs"|"sm"|"md"|"lg">`, `glass-ui/src/components/button/Button.vue:16`).

**Falsifier.** Show any keyframes.js or value.js import reachable from this file (the three dist chunks' import headers are the receipts), or show `size="sm"` removed at 7.0.0 (it is not).

---

## §7 · Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `lane-frontend §4` 🟡 — "`NotationPills.vue` \| 47 \| `./toggle-chip` (4.0.0) → `./chip` (5.0.0+) \| currently 6× `Button`" | **SHARPENED + CONTRADICTED (D-6).** Renders **3**, not 6 (2 never-simultaneous route-disjoint callsites × 3). `toggle-chip` is the wrong seat (boolean model, "unopinionated about selection mode"). The producer's guidance **inverts** across the hop — 7.0.0's `chip/README.md:24-26` routes exclusive selection to **ToggleGroup/SegmentedTabs**, away from chip. Correct seat, available **today at 4.0.0**: `SegmentedTabs`. |
| `lane-frontend §5` break table ("Rows that hit fourier-analysis TODAY") | **CONTRADICTED (D-1).** Omits the Button `variant` prop removal at 7.0.0 — the largest break, on the most-imported subpath (35 occurrences), hitting `NotationPills.vue:20` and 100 sibling `variant=` sites. It is typecheck-silent, so CI stays green. §5's "order of magnitude above 46 lines" budget derives from an incomplete table. |
| `lane-frontend §1` — "Dead devDeps (measured, not estimated): `class-variance-authority`, `clsx`, `tailwind-merge` … 0 import sites"; `§9` `[P3]`; `DESIGN.md:32` | **1-of-3 CONFIRMED, 2-of-3 CONTRADICTED (D-12).** `tailwind-merge` is genuinely dead (glass-ui 4.0.0 ships its own 66-rule resolver, no `twMerge`). `clsx` + `cva` are **live runtime externals** of `dist/button-BNDWhAZb.js` / `dist/cn-DJXf4yaB.js` and non-optional glass-ui peers. "0 import sites" holds for *direct* imports only. |
| `lane-frontend §5` — the tri-package RESOLUTION DEADLOCK | **CONFIRMED and BOUNDED (S-4).** True for the tree; this component's closure contains neither keyframes.js nor value.js, so its uplift cost is 2 string literals. |
| `lane-frontend §5` — "value.js 0.13→4.0 consumer surface is tiny (5 sites)" | **CONFIRMED and REFRAMED (D-4).** All 5 are easing sites; the pill palette is a *sixth* site that should exist and does not. The migration surface here is empty, and the emptiness is the defect. |
| `lane-frontend §8` — a11y hygiene banked, citing `EasingPicker.vue:9-15`'s written radio rationale | **CONFIRMED as the doctrine, VIOLATED here (D-2).** The tree contains the correct ARIA posture for exactly this widget; NotationPills carries neither `aria-pressed` nor `aria-checked` nor `role`, and its own source-of-record docblock (`notation.ts:3-7`) *claims* the `aria-pressed` pattern it does not implement. |
| `lane-frontend §8` — `style.css:119-131` `--viz-amber` WCAG darken, a held glass-ui carry | **CONFIRMED as the practice, BYPASSED here (D-3/D-4).** The remediation is token-level and can only reach `--viz-*`; the pill colours are TS literals and are structurally unreachable by it. |
| intake **R3-7a** (TRUE; F.W3) — 35 Tooltip callsites / 9 consumers, `FunctionInput` = 2 | **EXTENDED (D-9).** NotationPills, hosted *inside* `FunctionInput`, is a tenth consumer-shaped site with zero tooltips; `SegmentedTabOption.tooltip?` is the unused 4.0.0 seat. Read the F.W3 budget as 35/10. |
| intake **R6-8** (TRUE; F.W5) — an operation model embedding client back-references cannot attribute a defect to one side | **INSTANTIATED (D-13).** The `notation` leaf is enumerated 4× with no shared fixture, no conformance spec, and a **silent** server-side `.get(…, render_trig)` fallback — the same non-localisable failure R6-8 predicts, reached by literal duplication rather than back-reference. |
| intake **R3-7b** (TRUE; F.W5) — OpenAPI security `0 of 45` | **CONFIRMED, scoped.** The 2 `/api/equations/*` operations this leaf reaches are inside the RED denominator. |
| intake **R4-9** (TRUE, the load-bearing row) — audited scope byte-identical to what F.W0 opens on | **CONFIRMED at file granularity.** HEAD `cd26c653` re-verified; `git status --porcelain` on `NotationPills.vue` + `notation.ts` is **empty** while 5 siblings in `components/equation/` are dirty. This file is audited exactly as F.W0 will find it. |

---

## §8 · Method and limits

- **Read-only throughout.** `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` were treated as evidence; no product source in any repo was written. The single write of this lane is this file.
- **Probes:** `cat`/`sed`/`grep`/`find`/`ls`/`wc`/`git status`/`git rev-parse`/`git log`, plus `node -e` for JSON/`.d.ts`/minified-chunk extraction and for the WCAG contrast arithmetic (sRGB relative luminance, `(L₁+0.05)/(L₂+0.05)`, tints composited as `α·fg + (1−α)·bg` — the semantics of `color-mix(…, transparent)` over an opaque backdrop).
- **No browser tooling.** Three claims depend on live rendering and are marked **UNPROVEN-NEEDS-LIVE (SS-13)**: D-2's AT-observed behaviour, D-3's composited figure *under the translucent `.eq-panel glass-wash` host only* (the `FunctionInput` host is opaque and needs no live check), and D-5's rendered appearance on a pre-`color-mix` engine.
- **One claim needs a build, not a browser** and is marked **UNPROVEN-NEEDS-BUILD**: D-7's `justify-content` leg. `web/dist/assets/*` is dated 2026-06-12 and was produced against the **3.1.0** pin, so it is authoritative for the component's *own* scoped CSS (unchanged since `262c3d0`) and only corroborating for glass-ui-owned rules. Every glass-ui claim in this file is sourced from the **installed 4.0.0 dist** or the **producer 7.0.0 source**, never from the stale artifact alone.
- **Version discipline.** Claims are tagged to the pin they hold at: 4.0.0 = `web/node_modules/@mkbabb/glass-ui` (the working-tree `^4.0.0` bump, installed); 7.0.0 = `/Users/mkbabb/Programming/glass-ui` (`package.json.version` → `7.0.0`). `web/package.json` on disk is the in-flight bump; HEAD still pins `^3.1.0` (lane-frontend's `[WT]`/`[HEAD]` caveat), which is also why the component's last commit message reads "3.1.0 adoption".
