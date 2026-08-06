claude-opus-5[1m]

# Challenge · LayerConfigPanel · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue` (92 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Contrast ratios computed from token values.
**Corpus folded:** `formation/keyframes/lane-frontend.md` (§3.1 subpath utilisation, §5 shadow census S-1..S-8, §6.3 flat-token hazard, F-1 phantom dep). Extended, not repeated. One explicit contradiction of the target's own prose is filed at D-9.

---

## 0. Verdict

The component is **DEFECTIVE at the root of its own contract.** It was authored 2026-07-12 (`cda6a1a5`) against the *pre-Glass-7* `labeled-field` family. glass-ui 7.0.0 landed 2026-07-16 (`490cc46e` in the producer; installed into `node_modules` `Jul 16 05:17` per lane-frontend F-1) and **renamed or deleted every prop this file passes except `label`, `items`, `model-value`, `min`, `max`, `step`.** Nothing caught it: there is no `vue-tsc` in this repo (D-14), so the SFC template surface is type-opaque.

Net design consequence: **the entire explanatory layer of the layer-config UI renders nothing, and the `enabled` switch is a decorative control locked to OFF.**

| grade | count |
|---|---|
| BLOCKER | 2 |
| MAJOR | 4 |
| MINOR | 6 |
| INFO | 3 |
| **defects** | **15** |
| superlatives | 5 |

### The API delta, in one table

Sourced from producer `9a8761f0:src/components/labeled-field/*.vue` (pre-7) vs installed `node_modules/@mkbabb/glass-ui/dist/labeled-field.js` + `dist/components/labeled-field/types.d.ts` (7.0.0).

| passed by this file | pre-Glass-7 | glass-ui 7.0.0 | status |
|---|---|---|---|
| `tooltip="…"` ×5 | `tooltip: string` (**required**) → rendered an `<IconTooltip>` around the label | **DELETED**; replaced by `description?: string` → visible `<p class="labeled-field-description">` | **DEAD** |
| `:descriptions` | `descriptions?: Record<string,string>` → per-item `#description` slot in `SelectItem` | **DELETED** | **DEAD** |
| `:is-open` | `isOpen: boolean` (**required**) | renamed `open?: boolean` | **DEAD** |
| `:checked` / `@update:checked` | `checked: boolean` / `emit("update:checked")` | `modelValue: boolean` / `emit("update:modelValue")` | **DEAD** |
| `v-slot="{ controlId, errorId }"` | slot bound kebab (`:control-id`, `:error-id`) | slot bound camel (`controlId`, `errorId`, `labelledBy`, `describedBy`, `invalid`, `disabled`, `required`) | **correct in 7** |

Every dead prop falls through Vue's attribute-inheritance path (neither `LabeledSelect`/`LabeledSwitch` nor `LabeledField` sets `inheritAttrs: false` — verified in the compiled bundle) and lands as a junk DOM attribute on `<div class="labeled-field">`.

---

## 1. BLOCKERS

### D-1 · BLOCKER · Every tooltip in the component is dead. The whole explanatory layer renders nothing.

**Provenance:** `LayerConfigPanel.vue:15, 22, 36, 52, 63` (five `tooltip="…"` props) · `node_modules/@mkbabb/glass-ui/dist/labeled-field.js` (LabeledField props = `invalid, disabled, label, description, requirement, layout, errorLive` — no `tooltip`) · `dist/components/labeled-field/types.d.ts:8-14` (`LabeledFieldCommonProps` = `label, description?, requirement?, layout?, errorLive?`) · producer `9a8761f0:src/components/labeled-field/LabeledField.vue` (the deleted `<IconTooltip v-if="tooltip">` arm).

The five strings are the component's *entire* affordance copy:

```
:15  "How this layer blends with others"
:22  "Blend modes apply only when layers share one target"
:36  "Stacking order in animation group"
:52  "Blend weight (0 = none, 1 = full)"
:63  "Enable/disable this layer"
```

None render. `tooltip` is not an HTML global attribute, not a Vue directive, and has no consumer: `grep -rn "\[tooltip\]" demo/ dist/styles/ dist/*.css` → **0 hits**. Each string becomes `tooltip="How this layer blends with others"` sitting inert on a `<div>`.

What ships instead: four labels — `blend`, `z-index`, `weight`, `enabled` — with **zero** explanation. `z-index` and `weight` are the two rows a user cannot infer; `weight` in particular is a conditionally-revealed control (line 49) that appears with no account of why it appeared or what it does. This is the design failure, not a cosmetic one: progressive disclosure without copy is a control that materialises unexplained.

glass 7 ships the replacement channel — `description` renders a real `<p class="labeled-field-description">` at `--type-small` / `--muted-foreground` (`dist/glass-ui.css`, `.labeled-field-description[data-v-4a14621f]`). It is a *visible* description, not a hover tooltip, which is the stronger design (no hover dependency, touch-reachable). It is unused here.

**Falsifier:** produce a `tooltip` prop on `LabeledField`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch` in the installed 7.0.0 bundle, OR any CSS/JS in `demo/` or glass-ui that reads a `tooltip` attribute and renders it. Either kills this claim outright.

---

### D-2 · BLOCKER · The `enabled` switch is permanently OFF and its toggle never reaches the parent.

**Provenance:** `LayerConfigPanel.vue:61-66` (`:checked="layerConfig.enabled"`, `@update:checked="(v) => emit('update', { enabled: v })"`) · compiled `LabeledSwitch` in `dist/labeled-field.js` (props: `defaultValue, disabled, id, value, trueValue, falseValue, asChild, as, name, required, size, invalid, label, description, requirement, layout, errorLive, modelValue: {type: Boolean}`; `emits: ["update:modelValue"]`) · producer `9a8761f0:.../LabeledSwitch.vue` (the old `checked` + `update:checked` pair).

Two independent breaks in one control:

1. **Read direction.** `checked` is not a declared prop → `layerConfig.enabled` never reaches the switch. `modelValue` is declared `{type: Boolean}` with no default; Vue's boolean-prop casting resolves an *absent* Boolean prop to `false`, not `undefined`. The compiled wrapper passes `"model-value": e.modelValue` straight to the inner `Switch`. **The switch renders OFF for every layer, forever**, including the engine default (`src/animation/constants/defaults.ts:91` `defaultLayerConfig`, `enabled: true` per `src/animation/constants/types.ts:255-256` "Layer toggle. Default: true"). The control therefore *lies about state on first paint* — the worst class of UI defect, because the user's model of the system is wrong before they touch anything.
2. **Write direction.** The component emits `update:modelValue`; the listener is `@update:checked`. `onUpdate:checked` falls through onto `<div class="labeled-field">` as a listener for an event no descendant fires. Toggling emits nothing to `ChannelOptions` → `layerConfigUpdate` → the group. The row is inert.

The stray `:checked` additionally renders `checked="true"` on a `<div>` (`checked` is not in Vue's `isSpecialBooleanAttr` set, so it stringifies rather than being removed) — invalid markup, harmless, but a visible tell in DevTools.

**Falsifier:** a `checked` prop or `update:checked` emit in the installed `LabeledSwitch`; or evidence that Vue forwards undeclared props into a child component's own prop resolution (it does not — the compiled wrapper spreads only its own declared rest-props into the inner `Switch`, never `$attrs`).

---

## 2. MAJOR

### D-3 · MAJOR · The per-operator descriptions are imported, passed, and thrown away.

**Provenance:** `LayerConfigPanel.vue:13` (`:descriptions="COMPOSITE_OPERATOR_DESCRIPTIONS"`), `:77` (the import) · `demo/utils/reference-data/animationDescriptions.ts:123-127` · compiled `LabeledSelect` props (no `descriptions`) · producer `9a8761f0:.../LabeledSelect.vue` (the deleted `#description` slot arm).

The three strings — `replace: "overwrites lower layers"`, `add: "accumulates with layers"`, `accumulate: "accumulates across iterations"` — are exactly the copy that makes a three-way composite-operator choice legible. In the old primitive they rendered inside each `SelectItem` as `text-micro text-muted-foreground` right-aligned secondary text. In 7.0.0 they render nowhere; the object stringifies to `descriptions="[object Object]"` on the field's root `<div>`.

The dropdown now offers three bare tokens with no gloss. Combined with D-1 (the row's own tooltip is also dead), **the `blend` row ships with zero explanatory text at any level** — label, field description, and item description all absent.

**Falsifier:** a `descriptions` prop on the installed `LabeledSelect`, or a `SelectItem` `#description` slot consumer anywhere in the 7.0.0 select family.

---

### D-4 · MAJOR · The exclusive-dropdown mutex is half-wired; the design intent is unreachable.

**Provenance:** `LayerConfigPanel.vue:11` (`:is-open="isOpen('blend')"`), `:17` (`@update:open="(v) => setOpen('blend', v)"`) · `ChannelOptions.vue:488-493` (`// Exclusive select mutex: only one dropdown open at a time`; `openSelect` ref, `isOpen`, `setOpen`) · compiled `LabeledSelect` props (`open`, not `isOpen`).

`@update:open` is a real 7.0.0 emit, so the *write* half survives: opening the blend select sets `openSelect.value = 'blend'`. The *read* half is dead: `open` is never bound, so reka's `Select` runs uncontrolled and never closes in response to the registry. The documented affordance — one dropdown at a time — is not delivered. Two selects can sit open simultaneously in a pane that explicitly constrains its height (`ChannelOptions.vue` style block, `.panel-row--detail…{max-height: min(50dvh, 480px)}`), which is precisely the crowding the mutex exists to prevent.

Note this defect is *systemic*: `ChannelOptions.vue:96` and `:120` pass `:is-open` too. LayerConfigPanel is one of three sites; the fix belongs to the family, but the row is broken here.

**Falsifier:** an `isOpen` prop on installed `LabeledSelect`, or reka `Select` auto-dismissing sibling portals (it dismisses on outside-pointerdown, which is *not* the same as the registry contract — an open select whose sibling is opened by keyboard would remain open).

---

### D-5 · MAJOR · The z-index row hand-rolls a number control where glass-ui 7.0.0 ships `/number-field`. New shadow row — propose **S-9**.

**Provenance:** `LayerConfigPanel.vue:34-47` · `dist/components/input/types.d.ts:22` (`type?: "email" | "password" | "search" | "tel" | "text" | "url"` — **`"number"` is not in the union**) · `dist/components/number-field/index.d.ts` (`NumberField`, `NumberFieldInput`, `NumberFieldIncrement`, `NumberFieldDecrement`, `NumberFieldContent`) · `dist/components/number-field/NumberField.vue.d.ts` (`extends NumberFieldRootProps` from reka-ui; `emits: {"update:modelValue": (val: number) => any}`) · package `exports` includes `"./number-field"`.

This extends lane-frontend §5's census with a row it did not reach. lane-frontend §3.1 lists `/number-field` among the **52 unreached subpaths**; this is a concrete consumer that should reach it.

The hand-roll costs, all visible in eleven lines:

- `type="number"` is **outside the primitive's declared union** — glass narrowed `Input` deliberately (`ab261cf7 fix(labeled-field): type the native input contract`, 2026-07-15) because numeric entry is `NumberField`'s job. Uncaught only because of D-14.
- **No spinner affordance.** `NumberFieldIncrement`/`Decrement` exist; the native `type=number` spinners are invisible until hover on most engines and are 12px hit targets — a `--touch-target: 2.75rem` violation on the coarse-pointer breakpoint (`dist/styles/tokens/light-dark.css`, `@media (pointer: coarse)`).
- **No domain.** No `min`/`max`/`step`. z-index is documented "Higher wins. Default: 0" (`src/animation/constants/types.ts:231-232`) — unbounded is arguably correct, but `step` is not, and the field accepts `1e9`.
- **Silent lossy coercion.** `:45` — `parseInt((e.target as HTMLInputElement).value) || 0`. `parseInt("2.7")` → `2` (typing a decimal silently truncates, no feedback). Clearing the field gives `value === ""` → `parseInt("") = NaN` → `|| 0` → `{zIndex: 0}`. And `-0` / any prior-value-equals-0 case means the prop never changes, so glass `Input`'s internal `useVModel(…, {passive: true})` (compiled `Input-DY7soIPd.js`) is never re-synced — **the field can display empty while the model reads 0, with no error surface** (see D-7).
- **`@change`, not `@input`.** Commit is blur/Enter-gated. Every sibling row (select, slider, switch) commits immediately. One row in four has a different commit contract, unannounced.

**Falsifier:** `"number"` present in the installed `InputProps["type"]` union, or `NumberField` absent from the installed package's exports. Either would retire the shadow claim (the coercion and commit-contract sub-claims survive independently).

---

### D-6 · MAJOR · The blend row changes height, alignment, and type scale when it swaps state.

**Provenance:** `LayerConfigPanel.vue:8-27` (the `v-if="blendAvailable"` / `v-else` pair) · glass `SelectTrigger.vue:50-58` (`h-(--control-h-md)`) + `:79` (`flex w-full items-center justify-between … text-dropdown`) · `dist/styles/tokens/sizing.css` (`--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`; `--ui-scale: 1`; `--ui-coarse-scale: 1.5`) · `dist/styles/tokens/light-dark.css` (`@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem) } }`) · `dist/styles/components.css` (`.text-small{font-size:var(--type-small)}`; `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)`) · `--dropdown-text: var(--control-text)`, `--control-text: calc(var(--type-small) * var(--ui-scale))`.

Three simultaneous discontinuities on one row, decided by a boolean that flips with the animation group's target count:

| axis | `blendAvailable` (Select) | `!blendAvailable` (span, `:24-26`) |
|---|---|---|
| block-size | `--control-h-md` = **40px** fine / **60px** coarse | none — a bare line box, ≈23px @1440px |
| inline alignment | `justify-between` + `items-center` → value **left** | `text-right` → value **right** |
| font-size | `text-dropdown` = `--type-small × --ui-scale` | `text-small` = `--type-small`, **unscaled** |

The height delta is the Aristotelian failure: the `blend` row collapses to ~57% of its neighbour's height while `z-index` directly beneath it holds `--control-h-md` (`.field-control[data-kind=input]{block-size:var(--field-control-height)}`, `dist/glass-ui.css`). The panel's vertical rhythm breaks at exactly one row, and which row is not under the designer's control.

The type-scale delta is the sharper one: `.text-small` reads `--type-small` raw while every sibling control reads `--type-small × --ui-scale`. On **any coarse pointer** — the entire touch surface — the fallback prose renders at **1/1.5 = 67%** of the surrounding control text. The one row that is pure reading matter is the smallest text in the panel, on the device where text is hardest to read.

The alignment delta is a third, independent inconsistency: the same cell alternates between left-aligned control text and right-aligned prose.

**Falsifier:** a `min-block-size` on `.labeled-field-control` or `.labeled-field-grid`'s rows (design-idioms.css:255-273 has `align-items:center` and `row-gap` only — no height floor), or a demo rule pinning `--ui-scale: 1` under coarse pointers, or a rule scaling `.text-small`. None found; produce one and the corresponding sub-claim dies.

---

## 3. MINOR

### D-7 · MINOR · There is no error state, by construction — and the a11y wiring for one is permanently inert.

**Provenance:** `LayerConfigPanel.vue:41` (`:aria-errormessage="errorId"`) · compiled `LabeledField`: `l = f(() => n.invalid && r.error ? c : void 0)` — `errorId` is non-`undefined` **only** when `invalid` is true *and* an `#error` slot is supplied. This file binds `invalid` nowhere and supplies `#error` nowhere.

So `errorId` is `undefined` on every render; `:aria-errormessage` never emits an attribute; line 41 is dead markup that reads as diligence. Worse, `aria-errormessage` is inert per ARIA without `aria-invalid="true"`, which is likewise never set — so even if `errorId` resolved, the wiring would be a no-op.

Consequence for state coverage: given D-5's coercion (empty → `0`, `"2.7"` → `2`), the one row that *can* receive invalid input has no channel to say so. glass 7 ships the whole apparatus — `invalid`, `errorLive: "off" | "polite" | "assertive"`, `.labeled-field-error{color: var(--destructive)}`, `aria-live` on the error `<p>` — and none of it is reached.

**Falsifier:** an `invalid` binding or `#error` template anywhere in the file, or a compiled path where `errorId` resolves without `invalid`.

### D-8 · MINOR · `<Separator>` is non-decorative, unnamed, and separates nothing.

**Provenance:** `LayerConfigPanel.vue:68` (`<Separator class="my-1" />`) · producer `src/components/separator/Separator.vue:16-18` (`withDefaults(…, { orientation: "horizontal", decorative: false })`) → the `v-else` branch renders `<RekaSeparator :decorative="false">` → `role="separator"` with no accessible name · `ChannelOptions.vue:359-370` (`<div v-if="layerConfig" class="labeled-field-grid">` is the terminal child of the advanced sub-pane; the template closes immediately after).

Two claims:

- **Semantics.** `decorative` defaults `false`, so this purely-visual rule is exposed to AT as a structural `role="separator"` landmark inside a form-field group. It is decoration; `decorative` should be set. (It *does* correctly span both grid tracks — `design-idioms.css:271-273` `.labeled-field-grid > :not(.labeled-field) { grid-column: 1 / -1 }` — so the plausible "half-width rule" defect does **not** exist. Checked and cleared.)
- **Composition.** It is the last element in the last block of the pane. A separator with content on exactly one side is a rule that separates nothing — it reads as a dropped bottom border, ~4px (`my-1` = `margin-block: var(--spacing)` = 0.25rem) above the pane's 2px inset padding. A child component that terminates itself with a divider is also claiming layout authority it does not own: whether a boundary is wanted depends on what follows, which only the host knows.

**Falsifier:** content rendered after `.labeled-field-grid` inside the same `.panel-content`, or a `decorative` binding on line 68.

### D-9 · MINOR · Two false provenance citations in a 92-line file — and one contradicts the host.

**Provenance:** `LayerConfigPanel.vue:2-6` and `:29-33`.

1. Lines 3-6 state the rows land in *"ChannelOptions's advanced-sub-pane `.panel-content`, where the host's `.panel-content :deep(.labeled-field)` rule gives them the label-LEFT / value-RIGHT intra-row `[auto_1fr]` shape (one DRY source…; this component does NOT re-author it)."* The host's own style block says the opposite: `ChannelOptions.vue` `<style scoped>` — *"H.W11.I1 — the per-row `:deep(.labeled-field){auto 1fr}` rule (W9 F1…) is **GONE — REPLACED** by the `.labeled-field-grid` subgrid idiom (design-idioms.css §LABEL-subgrid)… The `:deep` was needed because the rule reached glass-ui's `.labeled-field` across the shadow boundary; the idiom is GLOBAL…, so it reaches `.labeled-field` directly with no `:deep`."* The cited rule does not exist. The real mechanism is `design-idioms.css:255-273`. The conclusion ("does NOT re-author") is still true; the stated reason is fabricated.
2. Lines 32-33 cite `LabeledField.vue.d.ts:19-26` for the "four wrappers auto-wire these" claim. `wc -l node_modules/@mkbabb/glass-ui/dist/components/labeled-field/LabeledField.vue.d.ts` → **19**. Lines 20-26 do not exist.

In a component whose every prop contract is silently stale (D-1..D-4), header prose that *looks* like verified provenance and is not is an active hazard: it is the artefact a reviewer trusts instead of the tree.

**Falsifier:** find `.panel-content :deep(.labeled-field)` live in any `demo/` stylesheet, or a 26-line `LabeledField.vue.d.ts`.

### D-10 · MINOR · The `v-if` guard and the prop type contradict each other; no empty state exists either way.

**Provenance:** `LayerConfigPanel.vue:7` (`<template v-if="layerConfig">`) · `:82` (`layerConfig: AnimationLayerConfig` — **not** optional) · `ChannelOptions.vue:359` (`<div v-if="layerConfig" class="labeled-field-grid">`) · `ChannelControls.vue:260` (`layerConfig?: AnimationLayerConfig` — optional one level up).

The prop is declared non-nullable, so line 7 is unreachable by type; the host already guards, so it is unreachable by call-site too. Either the type is a lie (the honest declaration is `layerConfig?: AnimationLayerConfig`, matching `ChannelControls.vue:260`) or the guard is dead weight. Design consequence: whichever it is, the *no-layer* case renders **nothing at all** — no empty state, no explanation of why a channel has no layer configuration. Given that `blendAvailable === false` already got a designed inert state (superlative S-B), the omission here is inconsistent with the component's own standard.

**Falsifier:** a call site passing `undefined` with the prop typed as declared (would make the type wrong, not the guard), or a sibling empty-state renderer in `ChannelOptions`.

### D-11 · MINOR (latent) · `text-right` is physical in an otherwise logical layout.

**Provenance:** `LayerConfigPanel.vue:24` · `design-idioms.css:255-273` (`grid-template-columns`, `column-gap`, `row-gap`, `grid-column: 1 / -1`) · `dist/glass-ui.css` (`.labeled-field{min-inline-size:0; inline-size:100%}`).

Everything around it — glass's `inline-size`/`min-inline-size`, the demo's grid tracks — is direction-agnostic. `text-right` (Tailwind → `text-align: right`) is not; `text-end` is the logical sibling. Under `dir="rtl"` the grid would flip label/value while this one string stayed pinned right, landing it *under the label column*.

Graded MINOR-latent, not MAJOR: `grep -rn 'dir="rtl"\|:dir=\|\[dir=' demo/` → **0 hits**. The demo has no RTL wiring today, so this is a correctness debt, not a live break. Filed because the axis asks for RTL coverage and the answer is "none, and one physical utility is already planted".

**Falsifier:** any RTL support in the demo (would raise this to MAJOR), or `text-right` resolving to `text-align: end` in this Tailwind build.

### D-12 · MINOR · The file violates its own repo formatting; one line is unreadable.

**Provenance:** `package.json` `"prettier": { "printWidth": 80, "tabWidth": 4, … }` · 8 lines exceed 80: `2 (87), 4 (84), 5 (84), 32 (82), 45 (119), 57 (82), 74 (107), 77 (94)`.

Line 45 at **119 chars** is the offender that matters — it packs an inline arrow, a DOM cast, a `parseInt`, and a `|| 0` fallback into a single template attribute:

```
@change="(e: Event) => emit('update', { zIndex: parseInt((e.target as HTMLInputElement).value) || 0 })"
```

The coercion defect at D-5 is invisible at that density. Business logic in a template attribute at 119 columns is where silent truncation and NaN-to-zero live.

**Falsifier:** a prettier ignore entry covering this path, or a different effective `printWidth`.

---

## 4. INFO

### D-13 · INFO · One enumeration, three homes, no policing.

`COMPOSITE_OPERATORS = ["replace","add","accumulate"] as const` is declared locally at `LayerConfigPanel.vue:79`; its descriptions live at `demo/utils/reference-data/animationDescriptions.ts:123-127`; the authoritative union is `src/animation/constants/types.ts:129` (`export type CompositeOperator = "replace" | "add" | "accumulate"`). All three agree **today**. Nothing enforces that they continue to: the local array is not typed `readonly CompositeOperator[]`, the descriptions map is `Record<string, string>` (no key constraint), and there is no template typecheck (D-14). The list belongs beside its descriptions, typed against the library union.

**Falsifier:** a test or type constraint tying the three together.

### D-14 · INFO · The enabling condition: this repo has no `vue-tsc`. Every SFC template is type-opaque.

`package.json` → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. Plain `tsc` cannot parse `.vue`; `demo/env.d.ts:3` `declare module "*.vue"` makes every SFC resolve to an untyped module. `vue-tsc` appears in `package-lock.json:3733` only as another package's optional peer, and is absent from `node_modules/.bin`. `tsconfig.json` `include: ["src/", "demo/"]`.

This is not a defect *of* LayerConfigPanel, but it is why D-1 through D-5 exist: five deleted props, one renamed prop, one renamed emit, and a `type="number"` outside its declared union would all be compile errors under `vue-tsc`. Combined with lane-frontend **F-1** (glass-ui undeclared in `package.json` *and* `package-lock.json`, so there is no version floor either), the demo has **neither** a dependency contract **nor** a template typecheck guarding its largest external surface. Filed here as the systemic root; it wants its own remediation row ahead of any component-level fix.

**Falsifier:** a `vue-tsc` invocation in any script, CI workflow, or pre-commit hook.

### D-15 · INFO · `layout="horizontal"` unused; the demo re-derives the row split and wins on import order.

glass 7 ships the split natively: `dist/glass-ui.css` → `.labeled-field[data-layout=horizontal]{gap:calc(var(--spacing)*4); grid-template-columns: minmax(8rem, .382fr) minmax(0,1fr); align-items:start}` — a φ-conjugate proportion (0.382 = 1 − 1/φ), already responsive-collapsed by a narrower media arm. The demo instead re-authors the row shape at `design-idioms.css:255-273`.

The choice is **defensible and I do not call it a defect**: `.labeled-field-grid` gives an `auto` label track sized once from the widest label across rows via `grid-template-columns: subgrid`, which `layout="horizontal"`'s fixed fractional split cannot do. Two notes for the record:

- The override reaches into a vendor primitive's internal layout: `.labeled-field-grid > .labeled-field { display:grid; grid-template-columns: subgrid }` competes with glass's scoped `.labeled-field[data-v-4a14621f]{display:grid}` at **identical specificity (0,2,0)**. It wins solely by cascade order (`styles/style.css:3` imports glass before `:5` imports design-idioms). Any reordering, or glass raising its own specificity by one, silently reverts every panel row to stacked layout.
- `LabeledSlider`'s `marks` and `motion` props (`dist/components/slider/types.d.ts`) are unused. `marks` at `0` / `0.5` / `1` on the weight slider would be free legibility for a normalized-domain control.

**Falsifier:** evidence that `layout="horizontal"` produces a uniform label column across sibling fields (it cannot — each field computes its own `minmax(8rem,.382fr)` against its own inline size), or a specificity/order guard on the demo override.

---

## 5. Superlatives (L-18, running the other way)

### S-A · The `weight` disclosure gate matches the engine's own predicate, exactly.

`LayerConfigPanel.vue:49` — `v-if="blendAvailable && layerConfig.op === 'replace'"`.
`src/animation/group/weight.ts:4-6` — `export const isWeightBlend = (layer) => layer.op === "replace" && (layer.weightSpring !== undefined || layer.weight !== 1)`.
`src/animation/group/compositor.ts:115-116` — `const weightBlend = isWeightBlend(layer); if (op === "replace" && !weightBlend) { … }`.

`weight` is a no-op on `add`/`accumulate` layers; the UI reveals it on exactly the operator where the compositor reads it. This is progressive disclosure driven by the engine's real semantic rather than by a designer's guess, in a repo where the UI and the engine are the same codebase and the temptation to guess is maximal. It also survives the naive reading (`replace` = "ignore the underlying value, so weight is meaningless") that would have produced the inverted gate. **Falsifier:** a compositor path reading `layer.weight` under `add`/`accumulate` — `weight.ts:16-21` and `compositor.ts:262` show `resolveBlendWeight` is called only inside the weight-blend arm.

### S-B · The blend-unavailable branch is a designed inert state, not a disabled control — and the copy is literally true.

`LayerConfigPanel.vue:19-27` replaces the select with a `<LabeledField>` carrying the value text "independent targets", rather than rendering a `disabled` select (the lazy move, which leaves a dead affordance on screen inviting clicks). `blendAvailable` traces cleanly: `AnimationControlsGroup.vue:21` `:blend-available="animationGroup.singleTarget"` → `ControlsPaneWrapper.vue:183` → `ChannelControls.vue:261` → `ChannelOptions.vue:455` → here. The tooltip string — *"Blend modes apply only when layers share one target"* — is an exact restatement of `singleTarget`, not approximate marketing prose. The intent is recorded in the commit that authored it: `cda6a1a5 fix(demo-blend): make multi-target blend controls explicit and inert`. The reasoning is right; only the delivery is broken (D-1 kills the tooltip, D-6 breaks the row geometry).

### S-C · Muted-foreground contrast clears AA in both themes. Computed, not assumed.

Tokens: `--muted-foreground: var(--neutral-5)`; `--neutral-5: light-dark(hsl(30 22% 40%), hsl(34 14% 62%))`; `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` (all `node_modules/@mkbabb/glass-ui/dist/`).

| theme | fg | bg | rel-lum fg | rel-lum bg | ratio |
|---|---|---|---|---|---|
| light | `hsl(30 22% 40%)` → `rgb(.488,.400,.312)` | `hsl(30 85% 96%)` → `rgb(.994,.960,.926)` | 0.1440 | 0.9222 | **5.01 : 1** |
| dark | `hsl(34 14% 62%)` → `rgb(.673,.627,.567)` | `hsl(26 22% 17%)` → `rgb(.207,.165,.133)` | 0.3588 | 0.0253 | **5.43 : 1** |

Both clear WCAG AA for normal text (4.5:1) with margin, at a size that is ≥16.4px at a 1440px viewport (`--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)`) — comfortably in large-text territory too. Neither clears AAA (7:1), which is not claimed anywhere.

**Falsifier / scope:** `--muted-foreground` has four resolutions in the bundle (`var(--neutral-5)`, `var(--on-glass-muted)`, `var(--on-glass-muted-strong)`, `contrast-color(var(--card))`). The panel is a glass surface, so `--on-glass-muted` (`light-dark(hsl(30 26% 35%), hsl(34 16% 72%))`) may win — it is *darker* in light and *lighter* in dark, i.e. strictly higher contrast, so the computed figures are the **floor**. Effective backdrop under `backdrop-filter` is UNPROVEN-NEEDS-LIVE for the SS-13 visual audit; the token-pair math above is exact.

### S-D · The z-index row is the one glass-7-correct construction in the file.

`LayerConfigPanel.vue:34-47` drops to the raw `<LabeledField v-slot="{ controlId, errorId }">` and wires `:id` / `:aria-errormessage` by hand. Glass 7 renders slot props in **camelCase** (`w(n.$slots,"default",{controlId:a, labelledBy:o, describedBy:u.value, errorId:l.value, …})`); the pre-7 primitive bound them **kebab** (`:control-id`, `:error-id`) and Vue does *not* normalise slot-prop keys — so the destructure on line 37 is correct against 7.0.0 and would have been broken against the API the rest of the file targets. It is the only row that survived the upgrade intact, and the comment explaining *why* a raw slot is used ("so blend/z-index/enabled are all one-cell rows — one paradigm, H.W3.S2") is a real design rationale, correctly reasoned.

### S-E · 92 lines, zero style block, zero minted tokens, one row paradigm.

`grep -c "<style"` → **0**. Every row is exactly one `.labeled-field`; no nesting, no bespoke grid, no per-instance overrides, no `!important`. Against lane-frontend §6.3's flat-namespace hazard — 98 unprefixed demo custom properties sharing a global namespace with glass-ui's, `--kf-*` count **0** — this file contributes **zero** new properties and zero collision surface. The only two utility classes it authors (`font-mono` on line 43, the `text-small text-muted-foreground` pair on line 24) are both glass-published tokenised utilities, not raw values. Given lane-frontend §5's finding that the demo's instinct elsewhere is to fork (S-1's 217-line tab strip, S-3's 666-line timeline), this component's restraint is the counterexample. Its failures are all *contract* failures against a moved API — never re-authorship.

---

## 6. Falsifier summary

| id | grade | dies if… |
|---|---|---|
| D-1 | BLOCKER | a `tooltip` prop exists in installed glass 7 `labeled-field`, or any `[tooltip]` renderer exists |
| D-2 | BLOCKER | `checked`/`update:checked` exist on installed `LabeledSwitch` |
| D-3 | MAJOR | `descriptions` exists on installed `LabeledSelect` |
| D-4 | MAJOR | `isOpen` exists on installed `LabeledSelect` |
| D-5 | MAJOR | `"number"` is in installed `InputProps["type"]`, or `/number-field` is not exported |
| D-6 | MAJOR | a height floor exists on `.labeled-field-control`/`.labeled-field-grid`, or the demo pins `--ui-scale: 1` on coarse |
| D-7 | MINOR | `invalid` or `#error` is bound anywhere in the file |
| D-8 | MINOR | content follows `.labeled-field-grid` in the pane, or `decorative` is passed |
| D-9 | MINOR | `.panel-content :deep(.labeled-field)` is live, or `LabeledField.vue.d.ts` has ≥26 lines |
| D-10 | MINOR | a call site passes `undefined` **and** the prop type is optional |
| D-11 | MINOR | the demo gains RTL support (→ MAJOR) or `text-right` compiles to `text-align: end` |
| D-12 | MINOR | a prettier ignore covers this path |
| D-13 | INFO | a type or test binds the three operator homes |
| D-14 | INFO | `vue-tsc` runs in any script/CI/hook |
| D-15 | INFO | `layout="horizontal"` can produce a cross-row uniform label track |
| S-A | superlative | the compositor reads `weight` under `add`/`accumulate` |
| S-B | superlative | `blendAvailable` traces to something other than `singleTarget` |
| S-C | superlative | the effective backdrop is not `--card` (live-only; token floor stands) |
| S-D | superlative | glass 7 binds slot props kebab-case |
| S-E | superlative | a `<style>` block or a minted custom property appears in the file |

---

## 7. Provenance note

Read whole: the target (92 lines) and every import — `@mkbabb/keyframes.js` (`src/animation/constants/types.ts:230-259`, `src/animation/group/weight.ts`, `src/animation/group/compositor.ts`), `@mkbabb/glass-ui/labeled-field` (installed `dist/labeled-field.js` + `dist/components/labeled-field/*.d.ts`), `@mkbabb/glass-ui/forms` (`dist/Input-DY7soIPd.js`, `dist/components/input/types.d.ts`, `dist/field-control-CeLay9Tk.js`), `@mkbabb/glass-ui` root (`Separator`), `@utils/reference-data/animationDescriptions` — plus the host `ChannelOptions.vue`, the two shared stylesheets (`demo/styles/design-idioms.css`, `demo/styles/style.css`), glass-ui's compiled cascade (`dist/glass-ui.css`, `dist/styles/components.css`, `dist/styles/tokens/sizing.css`, `dist/styles/tokens/light-dark.css`), and the producer's pre-7 sources via `git show 9a8761f0:…` for the API-delta table.

Nothing was written, mutated, installed, or executed in `keyframes.js` or `glass-ui`; both were read as evidence. This file is the sole write. No browser tooling was used — the single live-dependent claim (effective glass backdrop under `backdrop-filter`, S-C) is marked **UNPROVEN-NEEDS-LIVE** and does not carry any defect.
