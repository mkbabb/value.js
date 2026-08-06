claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `LayerConfigPanel.vue`

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue` (92 lines)
**Axis** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling integration seams.
**Date** 2026-08-06 · **Method** whole-file read + every import read to source + **live runtime probes** against the installed `@mkbabb/glass-ui@7.0.0` dist (jsdom mount, no browser) + one rolldown tree-shake build. No browser tooling; nothing livable-only is asserted as proven.

**Verdict: 2 BLOCKER · 3 MAJOR · 8 MINOR · 1 INFO · 5 SUPERLATIVE.**
Two of the component's four writable fields — `op` and `enabled` — **cannot be changed by a user at all**, and one of them also **cannot be read**. Both are prop-name mismatches against glass-ui 7.0.0, both runtime-proven, both structurally invisible to every gate this repo runs.

---

## 0 · Evidence base + probe provenance

Every glass-ui claim below is checked **three ways**: the shipped `.d.ts`, the shipped compiled `props:{…}` object (Vue's actual prop-resolution input), and a **live jsdom mount** of the installed dist. The probes live at
`…/scratchpad/lcp-consumption/{p.mjs,q.mjs,tsbuild.mjs}` (scratchpad only — **no product source in any repo was touched**).

Resolution facts that make the probes authoritative for what the demo actually runs:

| fact | provenance |
|---|---|
| glass-ui resolves from `node_modules`, **not** aliased to a source tree | `keyframes.js/vite.config.ts:38-58` — the alias map has `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`. **No `@mkbabb/glass-ui` entry.** |
| the installed glass-ui is **7.0.0** | `node_modules/@mkbabb/glass-ui/package.json:3` |
| `@mkbabb/keyframes.js` self-aliases to **source** | `vite.config.ts:40-43` + `tsconfig.json` `paths["@mkbabb/keyframes.js"] → ./src/animation/index.ts` |

**Corpus fold.** `lane-frontend.md:15,54` **F-1** (glass-ui is a phantom dependency — absent from `package.json` *and* `package-lock.json`, 7.0.0 present in `node_modules`) is the **enabling condition** for this entire challenge, and I confirm it independently: `keyframes.js/package.json` `dependencies` = `{"@mkbabb/value.js":"4.0.0"}` only; glass-ui appears in neither dependency block. F-1 is why nothing in this repo ever emitted an upgrade signal when glass-ui's labeled-field API changed. `lane-frontend.md:612` ("F-1 first — nothing below is reproducible until this lands") is **right and understated**: F-1 is not merely a reproducibility problem, it is the reason two live controls are dead.

**Where I extend the corpus.** The S-1..S-8 shadow census enumerates *components the demo re-implemented instead of consuming*. LayerConfigPanel is the **inverse failure mode and is absent from that census**: it consumes the glass-ui primitives correctly by *identity* (right components, right subpaths, no shadow) and fails at the *interface* — it calls a 7.0.0 component with a 4.x-era prop vocabulary. This is a class S-1..S-8 does not cover. It should be added to the frontend lane as a distinct row (proposed id **S-9 · consumed-but-mis-called**), because its remedy (rename props) is orthogonal to and cheaper than every S-row's remedy (delete a fork).

---

## 1 · BLOCKERS

### C-1 · BLOCKER — the `enabled` switch is dead in **both** directions

`LayerConfigPanel.vue:61-66`

```vue
<LabeledSwitch
    label="enabled"
    :checked="layerConfig.enabled"
    @update:checked="(v: boolean) => emit('update', { enabled: v })"
/>
```

glass-ui 7.0.0's `LabeledSwitch` has **no `checked` prop and no `update:checked` emit**.

* Type surface: `LabeledSwitchProps = Omit<SwitchProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: boolean }` (`dist/components/labeled-field/types.d.ts`), where `SwitchProps = SwitchRootProps & {class?,size?,invalid?}` (`dist/components/switch/Switch.vue.d.ts`) and `SwitchRootProps` (`reka-ui/dist/index4.d.ts:8482-8500`) declares `defaultValue | modelValue | disabled | id | value | trueValue | falseValue` — **`checked` is nowhere in the chain**.
* Runtime surface: the compiled `props` object is `{defaultValue,disabled,id,value,trueValue,falseValue,asChild,as,name,required,size,invalid,label,description,requirement,layout,errorLive,modelValue}` and `emits:["update:modelValue"]` (`dist/labeled-field.js`, `LabeledSwitch` block).

**Runtime probe (`p.mjs`/first probe, mounting the installed dist with exactly these bindings):**

```
rendered: <div class="labeled-field" … tooltip="Enable/disable this layer" checked="true">
          …<button role="switch" aria-checked="false" data-state="unchecked">
onUpdate:checked fired with: null           (after a real click on the switch)
CONTROL (modelValue:true): aria-checked = true | data-state = checked
```

So: `checked="true"` lands as a **raw DOM attribute on the wrapper `<div>`**, the switch renders `aria-checked="false"` for a layer whose `enabled` default is `true` (`src/animation/constants/defaults.ts:91-96`), and the handler never fires. Every layer therefore *displays* as disabled while the engine treats it as enabled, and toggling it emits nothing — the write path terminates in an `addEventListener("update:checked", …)` on a `<div>` that no code ever dispatches.

Downstream, the dead write means `ChannelOptions` → `ChannelControls` → `ControlsPaneWrapper` → `useAnimationGroupActions.ts:42-47` → `group.setLayerConfig(name, {enabled})` is **never reached for `enabled`**, so `compositor.ts:100`, `entries.ts:73`, `soa.ts:70` and `waapi.ts:39` — the four sites that honour `layer.enabled` — can only ever see the default.

**Falsifier.** Show a `checked` prop or an `update:checked` emit on the `LabeledSwitch` that this build actually resolves — i.e. a different installed glass-ui, or a build-time alias redirecting `@mkbabb/glass-ui` to a tree that has them. I checked both: the alias map has no glass-ui entry (`vite.config.ts:38-58`) and the installed dist has neither. A second falsifier: a runtime mount showing `aria-checked="true"` from `:checked="true"` — my probe shows the opposite, and the `modelValue:true` control shows `aria-checked="true"`, isolating the cause to the prop name.

---

### C-2 · BLOCKER — the blend `<LabeledSelect>` **can never open**; `op` is unreachable from the UI

`LayerConfigPanel.vue:8-18` binds `:is-open="isOpen('blend')"`. The 7.0.0 prop is **`open`** (`LabeledSelectProps` in `types.d.ts`; compiled `props:{modelValue,items,open:{type:Boolean},placeholder,invalid,disabled,required,label,description,requirement,layout,errorLive}`).

This is worse than "the binding is ignored". `open` is declared `{type: Boolean}` **with no default**, so Vue's absent-Boolean cast resolves it to `false` — not `undefined`. LabeledSelect forwards that `false` verbatim to reka's `SelectRoot`, which sees a *defined* `open` and therefore runs in **controlled** mode pinned shut. The Vue warn trace from my first probe caught it in the act:

```
at <Select model-value="replace" open=false disabled=false … >
at <LabeledSelect modelValue="replace" isOpen=true items=[…] … >
```

**Runtime probe (`p.mjs`), calling it verbatim as line 8-18 does, then dispatching a real pointerdown+click on the trigger:**

```
[AS-CALLED]      update:open emitted: [true] | aria-expanded: false | listboxes: 0
[CONTROL open:1] aria-expanded: true          | listboxes: 1
```

The `@update:open` handler **does** fire — `setOpen('blend', true)` runs and `openSelect` in `ChannelOptions.vue:487-491` flips to `'blend'` — but the popover never mounts: `aria-expanded="false"`, zero listboxes in the document. The user clicks "blend", nothing appears, and `layerConfig.op` can never be changed from this panel. The exclusive-select mutex is simultaneously inert (nothing reads `openSelect` for this row) and now holds a stale key.

This finding **also lands on `ChannelOptions.vue:96` and `:120`** (direction, fill mode) — same `:is-open` binding, same two dropdowns. I flag it here because it is LayerConfigPanel's own line; the sibling instances belong to that component's C-axis, but the remedy is one rename shared by all three.

**Blast radius.** `op` is the field the entire OD-U14 compositor programme exists to expose (`docs/tranches/U/OWNER-DECISIONS.md:23`, `U.C.md:688`, `G.W17.md:7,18`). The `add`/`accumulate` arms in `compositor.ts:226-253` are reachable in principle and unreachable in practice: today the panel is once again "a UI over a no-op", by a completely different mechanism than the one G.W17 fixed.

**Falsifier.** A runtime mount where `:is-open="true"` yields `aria-expanded="true"` or a `[role=listbox]` in the document. Mine yields neither while `:open="true"` yields both, which isolates the cause to the prop name rather than to jsdom. (Note the probe needed `hasPointerCapture`/`getComputedStyle` polyfills; without them the trigger click throws and the `update:open` read is meaningless — the numbers above are from the polyfilled run, and the `[true]` emission proves the click landed.)

---

## 2 · MAJOR

### C-3 · MAJOR — `:descriptions` is not a 7.0.0 prop; `COMPOSITE_OPERATOR_DESCRIPTIONS` is dead, and leaks `[object Object]` into the DOM

`LayerConfigPanel.vue:13,77`. `LabeledSelectProps` has no `descriptions` member (`types.d.ts`), and the compiled props object confirms it. The object therefore falls through attribute inheritance onto LabeledField's root `<div>` and is stringified by `setAttribute`.

**Probe (`p.mjs`):**

```
[SELECT] root attrs: … isopen="true" descriptions="[object Object]" tooltip="How this layer blends with others"
[SELECT] descriptions text present: false
```

Two consequences. (a) The per-operator teaching — "overwrites lower layers" / "accumulates with layers" / "accumulates across iterations" — **never renders**. (b) `demo/utils/reference-data/animationDescriptions.ts:123-127` `COMPOSITE_OPERATOR_DESCRIPTIONS` has **exactly one consumer in the whole repo** (grep across `--include=*.ts --include=*.vue`, node_modules excluded: only its own definition, `LayerConfigPanel.vue:13` and `:77`), so the constant is entirely dead code. It also emits an invalid HTML attribute on a production page.

**Falsifier.** A `descriptions` entry in the resolved `LabeledSelect` props, or a rendered mount in which any description string appears in `document.body.textContent`. Mine shows `false`.

---

### C-4 · MAJOR — every `tooltip=` on this component is dropped; the multi-target rationale is invisible

Five bindings — `:15`, `:22`, `:36`, `:52`, `:63` — pass `tooltip="…"`. **`LabeledFieldCommonProps` is `{label, description?, requirement?, layout?, errorLive?}`** (`types.d.ts`); the compiled `LabeledField` props are `{invalid,disabled,label,description,requirement,layout,errorLive}`. There is no `tooltip` on `LabeledField`, `LabeledSelect`, `LabeledSlider`, or `LabeledSwitch`. The intended prop is **`description`**, which LabeledField renders as `<p class="labeled-field-description">` wired into `aria-describedby`.

**Probe — every one of the three shapes, plus the control:**

```
[weight]   root attrs: … tooltip="Blend weight (0 = none, 1 = full)"   | description <p>: false
[z-index]  root attrs: … tooltip="Stacking order in animation group"    | description <p>: false
[SELECT]   root attrs: … tooltip="How this layer blends with others"    | description <p>: false
[CONTROL description:"…"]                                               | description <p>: true, text renders
```

The severest instance is **line 22**. On a multi-target group the blend selector is replaced by a static readout whose *entire* explanatory content is `tooltip="Blend modes apply only when layers share one target"`. That string is dropped, so the user sees a row reading `blend | independent targets` with no explanation anywhere. The component's most careful piece of teaching is the one that reaches nobody.

This is a **repo-wide 4.x-era vocabulary** — `EasingSidebar.vue:56-57`, `SpringPhysicsFacet.vue:29-30,40-41`, `ChannelOptions.vue:100-101,124-125` all pass `tooltip=` and `label-class=` (also not a 7.0.0 prop). The demo's own prose pins its glass-ui mental model at **3.4.0 / 4.0.0 / 4.0.1** (`ChannelOptions.vue:142-144` "glass-ui 3.4.0 `<LabeledField>` exposes only default+error slots, VERIFIED LabeledField.vue.d.ts"; `EasingSidebar.vue:18`; `TimingFunctionPanel.vue:26`; ~12 more sites) against an installed **7.0.0** — a three-major-version drift that F-1 guaranteed nobody would notice. LayerConfigPanel is the worst-hit consumer only because two of its mismatches are functional kills rather than cosmetic drops.

**Falsifier.** Any resolved `tooltip` prop, or any rendered tooltip/`aria-describedby` originating from these bindings. Probes show the string parked on a `<div>` attribute and no description element.

---

### C-5 · MAJOR — no gate in this repo can see C-1..C-4; the harness that would catch them already exists

`.vue` templates are **type-checked nowhere**:

* `package.json:"check"` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json` — **bare `tsc`**, which does not parse SFC templates at all.
* CI runs `npm run check:lib` (`.github/workflows/ci.yml:42`) = `tsc --noEmit -p tsconfig.lib.json`, whose `include` is `src/` only — so `demo/` gets **no** type check in CI, not even the bare-`tsc` script half.
* `vue-tsc` appears in the repo **only** as a transitive `package-lock.json` peer entry (`:3733,3736`) and as a historical caveat in `docs/tranches/S/audit/pass1/CRITIQUE.json:95` ("add bare-tsc/no-vue-tsc caveat clause"). It is not installed as a devDependency and no script or workflow invokes it.

And there is **no test of any kind** touching this component: `test/demo/instrument/` holds nine specs (`KfPillTabs`, `ios-text-entry`, `kf-toolbar-keyboard`, `resize-tracks`, `timeline-undo`, `transport-play-actuation`, `useAnimationGroupPlayback`, `useThrottledReadout`, `value4-editor-boundary`) — none mention LayerConfigPanel, layer config, or blend.

The gap is not tooling-shaped. `test/demo/instrument/KfPillTabs.test.ts:1-30` establishes exactly the idiom needed (mount into a real Vue app against `document.body`, dispatch real events, assert live DOM) and its own header records the same lesson: *"KfPillTabs shipped UNTESTED with a roving-tabindex defect… the T8 half a source-shape gate cannot cover: a REAL interaction test."* My two blocker probes are ~15 lines each in that exact style. The infrastructure exists; nobody pointed it at this panel.

**Falsifier.** Produce a gate — script, CI step, or test — that reds on any of C-1..C-4. I grepped `package.json`, `scripts/`, `.github/` and `test/` and found none.

---

## 3 · MINOR

### C-6 · MINOR — `Separator` imported from the root barrel while every sibling import uses a subpath

`:76` `import { Separator } from "@mkbabb/glass-ui";` against `:74` `/labeled-field` and `:75` `/forms`. glass-ui 7.0.0 publishes **73 export entries** including `./separator`. `dist/separator.js` is **77 bytes with one import**; `dist/glass-ui.js` is **23 938 bytes with 41 static sibling-chunk imports**. In Vite dev (unbundled ESM, and glass-ui is *not* in `optimizeDeps.include` — `vite.config.ts:365-372` lists only `vue`, `reka-ui`, `@vueuse/core`, `@lucide/vue`, `vue-sonner`) that is a ~41-module graph for one `<Separator>`. `sideEffects` is `["*.css"]`, so a production build very likely shakes it clean — the cost is dev-loop and consistency, not shipped bytes.
**Falsifier.** A chunk analysis (`KF_ANALYZE=1`, `vite.config.ts:~330`) showing the root-barrel import contributes no extra modules in dev. I did not run the dev server (no browser tooling), so the dev cost is **inferred from the static import count**, not measured — treat the magnitude as UNPROVEN-NEEDS-LIVE; the inconsistency with `:74-75` stands on the file alone.

### C-7 · MINOR — `type="number"` violates `InputProps["type"]`
`:42`. `InputProps["type"]` is `"email"|"password"|"search"|"tel"|"text"|"url"` (`dist/components/input/types.d.ts`) — `"number"` is not a member. At runtime it is fine: the compiled Input declares `type:{default:"text"}` and forwards it, and my probe renders `<input … type="number">` with `value="3"`. So this is a latent type-contract violation that only bites when C-5 is closed, or if glass-ui ever adds a runtime validator.
**Falsifier.** A `"number"` member in the resolved union, or a rendered input without `type="number"`.

### C-8 · MINOR — the `op` write is never narrowed from `string` to `CompositeOperator`
`:16` `@update:model-value="(v) => emit('update', { op: v })"`. LabeledSelect's emit is `(value: string) => any` and its runtime handler is literally `c("update:modelValue", String(e))` (compiled `dist/labeled-field.js`). `AnimationLayerConfig.op` is `CompositeOperator = "replace"|"add"|"accumulate"` (`src/animation/constants/types.ts:129,230-250`). `{op: string}` is not assignable to `Partial<AnimationLayerConfig>`; it survives only because of C-5. Worse than a type nit: an out-of-vocabulary string would be written straight into `entry.layer` by `layer-api.ts:28-36` (`Object.assign`, no validation) and would then fall into `residualBlendArm`'s **`else` weight-blend arm** (`compositor.ts:234,262`) — a silent wrong composite, not a throw, in a codebase whose stated seam is fail-explicit (`ChannelOptions.vue:459-466`).
**Falsifier.** Show a narrowing guard on the path from the select to `setLayerConfig`. `layer-api.ts:28-36` is a bare `Object.assign(entry.layer, config)`.

### C-9 · MINOR — `layerConfig` declared required, then guarded
`:82` declares `layerConfig: AnimationLayerConfig` (non-optional) while `:7` wraps the entire template in `v-if="layerConfig"`. The parent's own prop is optional (`ChannelOptions.vue:455` `layerConfig?: AnimationLayerConfig`) and it already narrows at `:359` (`v-if="layerConfig"` on the `.labeled-field-grid` wrapper). One of the two must go: either the prop becomes `layerConfig?:` (and `:7` is load-bearing) or `:7` is dead. Today the declared contract says the guard is dead while the parent's type says the declaration is a lie.
**Falsifier.** A call site that renders `<LayerConfigPanel>` without `layerConfig`. `ChannelOptions.vue:359-360` is the only mount and it is guarded.

### C-10 · MINOR — callback props (`isOpen`/`setOpen`) where glass-ui already ships `v-model:open`
`:84-85` pass two functions down as props. glass-ui's LabeledSelect exposes both halves of a normal two-way binding (`open` prop + `update:open` emit, both confirmed in the compiled component). The callback pair exists only to serve the exclusive-dropdown mutex in `ChannelOptions.vue:487-491`, and it is precisely the mechanism that made C-2 silent: a function passed *down* as a prop cannot be checked against the child's prop names, whereas `v-model:open` would have been a single binding on a declared prop. `ChromeDock.vue:237-238,287-288` already uses the `:open` + `@update:open` idiom correctly elsewhere in this same demo.
**Falsifier.** Show that `open`/`update:open` cannot express the mutex. It can: hoist `openSelect` and bind `:open="openSelect === 'blend'"`.

### C-11 · MINOR — the header comment cites a CSS rule that has been deleted
`:2-6` says the rows land in ChannelOptions's `.panel-content` "where the host's `.panel-content :deep(.labeled-field)` rule gives them the … `[auto_1fr]` shape (one DRY source … this component does NOT re-author it)". `ChannelOptions.vue:594-603` records the opposite: *"H.W11.I1 — the per-row `:deep(.labeled-field){auto 1fr}` rule (W9 F1 …) is GONE — REPLACED by the `.labeled-field-grid` subgrid"*, and `:355-359` wraps this component in `<div class="labeled-field-grid">`. The DRY claim survives; the cited source is dead, and the comment still enumerates only "blend / z-index / enabled" while the component also renders `weight` (`:50`) — `ChannelOptions.vue:354` gets the enumeration right.
**Falsifier.** Find a live `.panel-content :deep(.labeled-field)` rule. `grep -n labeled-field ChannelOptions.vue` returns only `.labeled-field-grid` uses and the deletion note.

### C-12 · MINOR — `<LabeledField>` used as a static readout leaves a dangling `label[for]`
`:19-27` uses the form-field wrapper for a non-control readout (a `<span>`). LabeledField unconditionally renders `<label for="${id}-control">` (compiled: `a = \`${i}-control\``, bound as `for`), and this branch's slot contains no element carrying that id — so the label points at nothing. Compare `:34-47`, where the slot *does* wire `controlId` and my probe confirms `label[for] === input#id`. A `<p>`/`<span>` row or `LabeledField`'s own `description` would carry the same shape without the dangling reference.
**Falsifier.** Show an element with id `…-control` inside the `v-else` slot, or a glass-ui build where LabeledField omits `for` when the slot has no control. Neither holds.
(Checked and **cleared**, so not filed as a defect: `text-right` on the inline `<span>` at `:24` *does* take effect — `.labeled-field-control` is `display:grid` in `dist/glass-ui.css`, which blockifies the grid item.)

### C-13 · MINOR — mixed commit idiom: z-index commits on native `change`, every sibling row is live
`:45` listens to the native `@change` (fires on blur/Enter) and reads `e.target.value`, bypassing glass-ui's `update:modelValue` that `:57` and `:65` use. It works — Input sets `inheritAttrs:false` and spreads `forwardedAttrs` onto the `<input>`, so the listener binds to the real element (probe: `'-2' => -2`, `'' => 0`). But one row in this panel commits on blur while the rest commit live, and the value round-trip runs through a hand-rolled `parseInt(…) || 0` instead of the component's typed emit.
**Falsifier.** A rationale in-tree for the divergence, or a sibling row using `@change`. `:57` and `:65` both use `@update:model-value`; no comment explains `:45`.

---

## 4 · INFO

### C-14 · INFO — value.js transitive exposure is **dev-only**; R1 is **not** reachable here

For three strings (`COMPOSITE_OPERATOR_DESCRIPTIONS`), `:77` imports `@utils/reference-data/animationDescriptions`, a 129-line module whose bottom two lines are `import { parseTimingFunction, type ParseIssue } from "@mkbabb/value.js/css"` and `import { easing } from "@mkbabb/value.js/easing"` (`:128-129`, used by `timingFunctionKind` at `:76,89`). By ESM semantics the Vite dev server therefore loads both value.js subpaths whenever this panel mounts.

I checked whether that survives to production and **it does not**:

```
rolldown/vite lib build of `import { COMPOSITE_OPERATOR_DESCRIPTIONS } … ; console.log(…)`
  → bytes=318 | mentions parseTimingFunction: false | mentions easing registry: false
```

consistent with `@mkbabb/value.js@4.0.0` declaring `sideEffects: false`. So: a small dev-graph cost, zero shipped cost. Filed INFO, not MINOR — the honest reading is that the module boundary is *coarse* (a reference-data module mixing inert constants with parser-backed helpers), not that this component ships a parser.

**On R1 (`parseCssColor("oklch()")`, the live shipping crash — `lane-library.md` parse seams / apotheosis `parser-proof/GATE-VERDICT.md`): NOT reachable from this component.** LayerConfigPanel touches no colour value on any path; the only value.js surface in its graph is `/css`'s `parseTimingFunction` and `/easing`'s registry, neither of which is a colour entry, and neither is *called* on this component's path (`timingFunctionKind` has no caller here — `ChannelOptions.vue:447` imports it separately). Recorded as an explicit negative so the next lane does not re-open it.
**Falsifier.** A call chain from anything LayerConfigPanel imports into `parseCssColor`. I found none; the 318-byte tree-shake result is corroborating.

---

## 5 · SUPERLATIVES (L-18, both directions)

**S-A · The keyframes.js import is exactly right — the light barrel, type-only, fully erased.**
`:73` `import type { AnimationLayerConfig } from "@mkbabb/keyframes.js"`. `src/animation/index.ts:158-170` exports it inside a pure `export type {…} from "./constants/types"` block, under a comment stating the intent ("`import type` is stripped at build so the static barrel retains only its `/math` runtime edge"). The component takes no `/engine` subpath, no deep path, no runtime symbol — its net runtime edge to keyframes.js is **zero bytes**. Under `verbatimModuleSyntax: true` (`tsconfig.json`) the `import type` is also mandatory, and it is present. This is the correct answer to the library-consumption question and it is not accidental.
**Falsifier (L-18 runs both ways).** Show a runtime import of keyframes.js in this file, or a non-type export of `AnimationLayerConfig`. `:73` is the file's only kf import and `index.ts:158` is a type-only block.

**S-B · The weight gate is semantically exact against the engine's own predicate.**
`:49` gates the weight slider on `blendAvailable && layerConfig.op === 'replace'`. `src/animation/group/weight.ts:4-6`: `isWeightBlend = layer.op === "replace" && (layer.weightSpring !== undefined || layer.weight !== 1)`. Weight is meaningful *only* under `replace` — `compositor.ts:232-252` never reads it in the `add`/`accumulate` arm — and the UI says exactly that, with no drift and no comment claiming more than it does. Most consumers get this wrong in the permissive direction (show the control, let it no-op); this one does not.

**S-C · The `blendAvailable` gate is the OD-U14/U.B3 reconciliation, correctly landed.**
`AnimationControlsGroup.vue:21` binds `:blend-available="animationGroup.singleTarget"`, and `group.ts:225,289` show that a non-`singleTarget` group takes `renderMultiTarget(...)` and never enters `transformFramesGrouped` → the compositor — so `op` *and* `weight` are both genuinely inert there, and hiding both is right. `docs/tranches/U/waves/U.B.md:313-329` charters exactly this ("`LayerConfigPanel.vue:69` blend selector live on `square` (`singleTarget=false`)"); `assay-compositor-behavior.md:192` records the defect. It is fixed, and the `v-else` branch even teaches *why* rather than merely hiding the row. (C-4 is what stops the teaching from arriving — the gate itself is correct.)

**S-D · The hand-wired slot on the z-index row actually works.**
`:29-33` claims the raw `<LabeledField v-slot="{controlId, errorId}">` binds the a11y ids by hand where the four wrapper components auto-wire them, and cites `LabeledField.vue.d.ts:19-26` for the slot contract. Probe: `label for: v-0-control | matches input id: true`. The `:aria-errormessage="errorId"` binding correctly resolves to `undefined` (LabeledField only mints an errorId when `invalid && $slots.error`) and Vue drops the attribute — no empty `aria-errormessage`. A comment that asserts a mechanism *and* is true when probed is rarer than it should be.

**S-E · The composite vocabulary is current — the U.C15 rename fully landed here.**
`:79` `COMPOSITE_OPERATORS = ["replace","add","accumulate"] as const` matches `CompositeOperator` at `src/animation/constants/types.ts:129` exactly, and the readonly tuple satisfies `items: readonly string[]` without a cast. This **contradicts the standing corpus references**: `G.W17.md:18` and `U.C.md:752` both describe this file as carrying a `BLEND_MODES = ["replace","add","weighted"]` array, and `assay-compositor-semantics.md:93` cites `LayerConfigPanel.vue:69` as shipping that live selector. Those citations are **stale against the tree** — the `weighted` → `accumulate` + orthogonal-weight rename (U.C15) is complete in this file. The later lanes should stop citing `BLEND_MODES`.

---

## 6 · What the tree says the fix is

Ordered by what unblocks what, not by effort:

1. **F-1 first** (`lane-frontend.md:612`) — declare `@mkbabb/glass-ui: 7.0.0` in `package.json` and regenerate the lock. Nothing below is reproducible until this lands, and F-1 is the reason C-1..C-4 were invisible for three major versions.
2. **C-1, C-2** — the two renames that restore the panel: `:checked`/`@update:checked` → `:model-value`/`@update:model-value`; `:is-open` → `:open` (here **and** `ChannelOptions.vue:96,120`, which have the identical bug).
3. **C-5** — add `vue-tsc` as a devDependency, put a `check:demo` in CI, and add one `test/demo/instrument/LayerConfigPanel.test.ts` in the `KfPillTabs.test.ts` idiom asserting (a) the switch reflects `enabled` and emits on click, (b) the blend select opens. Both assertions are red today; my probes are the shape.
4. **C-3, C-4** — `:descriptions` and `tooltip=` → whatever 7.0.0 actually offers (`description` carries the copy; per-item descriptions may need a glass-ui HANDOFF, which the standing BH/BI relay edict requires anyway). This is a **demo-wide sweep**, not a LayerConfigPanel edit: `EasingSidebar`, `SpringPhysicsFacet`, `ChannelOptions` all carry it.
5. **C-6..C-13** — hygiene, each independently landable, none blocking.

**Proposed corpus amendment.** Add **S-9 · consumed-but-mis-called** to `lane-frontend.md`'s shadow census: components that consume the right glass-ui primitive at the right subpath but call it with a stale prop vocabulary. LayerConfigPanel is the type specimen (2 functional kills); `ChannelOptions` (2 more `:is-open`), `EasingSidebar` and `SpringPhysicsFacet` (`tooltip`/`label-class` drops) are the rest of the row. Unlike S-1..S-8, the remedy is a rename sweep, not a deletion — and unlike S-1..S-8, two of its instances are **live user-facing breakage**, which makes it the highest-priority row in the census.
