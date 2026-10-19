SERVED MODEL: claude-fable-5-1

# KF.W12.b — the installed producer, quoted (glass-ui 7.0.0, `node_modules/@mkbabb/glass-ui`, READ-ONLY) · 2026-09-19

## labeled-field — the LOCK's names

```
⟨cmd⟩ sed -n 1,60p dist/components/labeled-field/types.d.ts   (the declared props, abridged to the lines that decide)
export interface LabeledFieldCommonProps { label: string; description?: string; requirement?: …; layout?: …; errorLive?: … }
export type LabeledSelectProps = { modelValue: string; items: …; open?: boolean; placeholder?: string; invalid?: boolean; disabled?: boolean; required?: boolean } & LabeledFieldCommonProps
   emits: "update:modelValue": (value: string) => any; "update:open": (value: boolean) => any
export type LabeledSliderProps = Omit<SliderProps, "class" | "modelValue"> & LabeledFieldCommonProps & { modelValue: number }
export type LabeledSwitchProps = Omit<SwitchProps, "class" | "modelValue"> & LabeledFieldCommonProps & { modelValue: boolean }
   emits: "update:modelValue": (value: boolean) => any
⟨cmd⟩ grep -c 'tooltip\|labelClass\|descriptions\|isOpen\|checked' dist/labeled-field.js → 0 (none declared)
⟨cmd⟩ grep -c inheritAttrs dist/labeled-field.js → 0
```

Compiled `dist/labeled-field.js`: `LabeledSelect` declares `open: { type: Boolean }` (no default) and forwards `open: e.open` into reka's `SelectRoot` unconditionally — an ABSENT `open` casts to `false`, so the frontier's `:is-open` (declared by nothing) left the select controlled-shut (KF-CO-1). `LabeledSwitch` declares `modelValue: { type: Boolean }` — absent → `false` → permanently OFF while the engine default is `enabled: true` (KF-CO-8 ≡ LP-3).

Runtime quotation (the gate's clause (0), `channel-options-render-edge.test.ts`): `Object.keys(LabeledSelect.props)` contains `open`, not `isOpen`/`tooltip`/`descriptions`; `LabeledSelect.emits` contains `update:open`; `Object.keys(LabeledSwitch.props)` contains `modelValue`, not `checked`; `LabeledSwitch.emits` contains `update:modelValue`, not `update:checked`.

## easing — the seat's seam

```
⟨cmd⟩ sed -n 1,24p dist/components/easing/EasingPicker.vue.d.ts
props: mode?: EasingPickerMode; preset?: string; steps?: number; term?: JumpTerm; readout?: boolean; playback?: boolean; label?: string
model: modelValue?: EasingPickerValue
emit: "update:modelValue": (value: EasingPickerValue | undefined) => any
⟨cmd⟩ sed -n 1,30p dist/components/easing/composables/useEasingPicker.d.ts
export type EasingFn = (t: number) => number;
export type BezierPoints = [number, number, number, number];
export type JumpTerm = (typeof jumpTerms)[number];          ← value.js's four terms, byte-identical to the demo store's union
export interface EasingPickerValue { readonly mode; readonly css: string; readonly fn: EasingFn; readonly points: BezierPoints; readonly steps: number; readonly term: JumpTerm }   ← NO preset field
⟨cmd⟩ grep -n 'STEP_COUNT_MIN\|STEP_COUNT_MAX\|DEFAULT_BEZIER_PRESET' dist/components/easing/constants.d.ts
4:export declare const DEFAULT_BEZIER_PRESET: "ease-out-back";
9:export declare const STEP_COUNT_MIN = 1;
10:export declare const STEP_COUNT_MAX = 12;
⟨cmd⟩ grep -o 'export {[^}]*}' dist/easing.js
export { K as EasingConfigurator, G as EasingPicker, W as useEasingPicker }     ← the constants are NOT exported from the `./easing` subpath
⟨cmd⟩ sed -n 196,211p dist/easing.js   (the modelValue write-through, my print)
function Ue(e) {
    if (!e) return;
    if (Y(X, e)) { X = void 0; return; }                                  ← the vendor's own echo suppressor (X = last emitted)
    y.value = e.mode === "steps" ? "steps" : "bezier",
    Array.isArray(e.points) && … && e.points.some((e, t) => e !== S.value[t]) && (P(0, …), P(1, …)),   ← setHandle only if a coordinate differs (stamps "custom")
    Number.isFinite(e.steps) && (F.value = Math.max(1, Math.min(12, Math.round(e.steps)))),           ← the 1–12 projection
    L.includes(e.term) && (I.value = e.term);
    let t = V.value;
    Y(e, t) || He(t);                                                      ← emits the projection when it differs from the write
}
A(u, Ue, { deep: !0, immediate: !0 }), A(V, He, { immediate: !0 });
⟨cmd⟩ grep -n '"custom", le = "ease-out-back"' dist/easing.js → 12   (the vendor's default preset)
```

## drawer — the D-B1 lever

```
⟨cmd⟩ grep -o ':root { --drawer-inset-block-end: 0px;[^}]*}' dist/components/drawer/styles.css | cut -c1-60
:root { --drawer-inset-block-end: 0px; --drawer-handle-w: …
⟨cmd⟩ grep -o '\.glass-drawer\[data-glass-drawer-snap-points="true"\]\[data-glass-drawer-direction="bottom"\] {[^}]*}' dist/components/drawer/styles.css
.glass-drawer[data-glass-drawer-snap-points="true"][data-glass-drawer-direction="bottom"] { bottom: var(--drawer-inset-block-end); height: calc(100% - var(--drawer-inset-block-end)); max-height: calc(100% - var(--drawer-inset-block-end)); }
⟨cmd⟩ grep -n 'snapPoints?' dist/components/drawer/Drawer.vue.d.ts → 42:    snapPoints?: (number | string)[];
```

## The vitest wall — which producer entries can load under the demo project

```
⟨cmd⟩ (node, over dist/*.js `from "./…"` imports; "bad" = a chunk whose text contains @mkbabb/keyframes.js)
labeled-field.js clean
number-field.js REACHES useSpring-9u2_shxV.js        ← via button-*.js → useLiquidPress
tooltip.js clean
select.js clean
separator.js clean
easing.js REACHES useSpring-9u2_shxV.js
motion-core.js clean
glass-ui.js REACHES useSpring-9u2_shxV.js            ← the ROOT barrel
drawer.js REACHES drawer.js
dock.js REACHES dock.js,useDragMorph-BogSV_nv.js,useSpring-9u2_shxV.js
button.js REACHES useSpring-9u2_shxV.js
card.js clean
```

This corrects the wave record's inherited belief that `number-field` and the root barrel are "clean subpaths": the root barrel, `button`, `number-field`, `easing`, `drawer` and `dock` all reach a `@mkbabb/keyframes.js` import and die under vitest's externalized resolution (`Cannot find package '@mkbabb/keyframes.js' imported from …/useSpring-9u2_shxV.js`). The gate test stubs exactly those and keeps `labeled-field` (the gate's subject) and `tooltip` real.

## Button / SelectItem (the KF-CO-27/42 and KF-CO-6 cures)

```
⟨cmd⟩ grep -n 'emphasis\|iconOnly' dist/components/button/Button.vue.d.ts → emphasis?: ButtonEmphasis; iconOnly?: boolean
⟨cmd⟩ grep -n 'textValue' dist/components/select/SelectItem.vue.d.ts → 6:    textValue?: string;
⟨cmd⟩ grep -n 'shape\|compact' dist/components/dock/DockControl.vue.d.ts → shape?: "icon" | "tab"; compact?: boolean   (no `title`)
```
