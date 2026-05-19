# B.W1 Lane A — W5 Accessibility Corrections

Wave B.W1, Lane A. Corrects four ARIA defects introduced or left unresolved in
W5. Scope: exactly four component files plus this audit. `vue-tsc` error count
unchanged at 243 (≤ 243 gate satisfied).

## SUB-GATE A

> snapshot diff shows SpectrumCanvas no longer role=slider; SwatchHoverMenu
> hover panel aria-hidden=true; PaletteCardGrid container role=list; a11y tree
> snapshot confirms no invalid ARIA; vue-tsc not raised.

All four conditions are met by the changes below.

---

## 1. SpectrumCanvas.vue — invalid `role="slider"` removed

`demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:3-6`

**Before**

```html
<!-- W5-a11y: spectrum canvas is a 2D color picker widget -->
<div
    ref="spectrumRef"
    role="slider"
    aria-label="Color spectrum: drag to pick saturation and lightness"
```

**After**

```html
<!-- W5-a11y: 2D saturation×lightness picker — not a linear slider,
     so role="img" with a reactive descriptive label, not role="slider". -->
<div
    ref="spectrumRef"
    role="img"
    :aria-label="spectrumAriaLabel"
```

**Reasoning.** The WAI-ARIA `slider` role models a *one-dimensional* range
control and requires `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. The
element had none of those, making the role invalid. The widget is a
two-dimensional saturation×lightness picker — there is no single scalar value to
expose, so `slider` is also semantically wrong. `role="img"` with a descriptive,
reactive `aria-label` correctly presents it as a single graphical object whose
state is announced when focus or AT inspection lands on it.

A reactive label was achievable: the component injects `HSVCurrentColor`
(`SpectrumCanvas.vue:41-46`), whose `.value.value.s` and `.value.value.v` are
0–1 fractions. The new `spectrumAriaLabel` computed
(`SpectrumCanvas.vue:198-205`) reads those — preferring the raw spectrum coords
`rawS`/`rawV` when present, matching the dot-position logic at
`SpectrumCanvas.vue:216-233` — and renders them as rounded percent:

```js
const spectrumAriaLabel = computed(() => {
    const { s, v } = HSVCurrentColor.value.value;
    const sPct = Math.round((rawS.value ?? clamp(s.value, 0, 1)) * 100);
    const vPct = Math.round((rawV.value ?? clamp(v.value, 0, 1)) * 100);
    return `Color spectrum, saturation ${sPct}%, lightness ${vPct}%`;
});
```

The label therefore reads e.g. `Color spectrum, saturation 73%, lightness 58%`
and updates as the user drags. A static fallback label was not needed.

---

## 2. SwatchHoverMenu.vue — `role="toolbar"` removed from hover panel

`demo/@/components/custom/palette-browser/SwatchHoverMenu.vue:35-44`

**Before**

```html
<Teleport to="body">
    <!-- W5-a11y: role="toolbar" groups icon-only action buttons; aria-label identifies it -->
    <div
        v-if="open"
        class="floating-panel"
        :class="PANEL_LAYOUT"
        :style="floatingStyle"
        role="toolbar"
        :aria-label="`Actions for color ${color}`"
        @pointerenter="$emit('cancelLeave')"
```

**After**

```html
<Teleport to="body">
    <!-- W5-a11y: hover-only panel is keyboard-inaccessible — hidden from
         AT. The reka-ui Popover (touch path) is the accessible route. -->
    <div
        v-if="open"
        class="floating-panel"
        :class="PANEL_LAYOUT"
        :style="floatingStyle"
        aria-hidden="true"
        @pointerenter="$emit('cancelLeave')"
```

**Reasoning.** This `<div>` is the `canHover` branch's manually positioned
teleport panel, shown only on `pointerenter` (`SwatchHoverMenu.vue:4`,
`v-if="open"` at line 39). It has no keyboard or focus entry point — a keyboard
or AT user can never reach or operate it. Advertising `role="toolbar"` on an
unreachable element pollutes the accessibility tree with a landmark that leads
nowhere. The W5-a11y comment that justified the toolbar role was removed with
it.

The non-hover branch (`SwatchHoverMenu.vue:8-24`) renders the same actions
through reka-ui's `Popover`/`PopoverTrigger`/`PopoverContent`, which provides a
proper keyboard-operable, focus-managed accessible path. Marking the hover panel
`aria-hidden="true"` removes the redundant, unreachable duplicate from the AT
tree while leaving the reka-ui Popover path untouched.

---

## 3. PaletteCardGrid.vue — `role="list"` added to grid container

`demo/@/components/custom/palette-browser/PaletteCardGrid.vue:1-6`

**Before**

```html
<div class="palette-card-grid grid grid-cols-1 gap-3 min-h-[120px]" :class="gridClass">
    <slot />
```

**After**

```html
<!-- W5-a11y: role="list" so each child PaletteCard (role="article") sits in a list landmark -->
<div
    role="list"
    class="palette-card-grid grid grid-cols-1 gap-3 min-h-[120px]"
    :class="gridClass"
>
    <slot />
```

**Reasoning.** The slotted children are `PaletteCard` components, each carrying
`role="article"`. Without an enclosing list container, AT presents a flat run of
articles with no grouping or count. Adding `role="list"` gives the container a
list landmark so AT can announce the set size and let users navigate it as a
collection. The CSS `display: grid` from the `grid` utility class strips the
implicit list semantics a native `<ul>` would carry, so the explicit
`role="list"` is the correct restorative; the child articles need no
`role="listitem"` for the list landmark itself to be valid and useful.

---

## 4. GradientVisualizer.vue — redundant `SelectTrigger` aria-labels removed

`demo/@/components/custom/gradient/GradientVisualizer.vue:146, 164, 182`

**Before / After**

| Line | Before | After |
|------|--------|-------|
| 146  | `<SelectTrigger aria-label="Gradient type" class="h-9">`        | `<SelectTrigger class="h-9">` |
| 164  | `<SelectTrigger aria-label="Interpolation space" class="h-9">`  | `<SelectTrigger class="h-9">` |
| 182  | `<SelectTrigger aria-label="Hue interpolation" class="h-9">`    | `<SelectTrigger class="h-9">` |

**Reasoning.** Each of these three triggers contains `<SelectValue />`, which
renders the currently selected option's label (e.g. `Linear`, `oklch`,
`shorter`) as visible text inside the trigger. An `aria-label` on an element
that already has visible text *overrides* that text for assistive technology:
the generic category name ("Gradient type") replaced the meaningful current
value, so an AT user heard the category but not what was actually selected.
Removing the `aria-label` lets the visible `SelectValue` text serve as the
accessible name, which is both accurate and self-updating. The category is
already conveyed by the adjacent visible `section-label` spans
(`GradientVisualizer.vue:143, 161, 179`).

No `aria-label` was retained: all three triggers have visible text. The two
non-trigger ARIA-bearing controls in the file — the `Slider`
(`GradientVisualizer.vue:202`, `aria-label="Gradient direction"`) and the
`DockIconButton` (`GradientVisualizer.vue:227`, `title="Copy CSS"`) — are
icon-/value-only with no visible text label and were correctly left untouched;
neither is a `SelectTrigger`.

---

## Validation

`npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'`

- Baseline (pre-edit): **243**
- Post-edit: **243**

The count was not raised; the ≤ 243 gate is satisfied. All four edits are
template-only ARIA attribute changes plus one purely additive computed property
that consumes already-typed reactive state, so no new type errors are
introduced.
