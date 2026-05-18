# W1 — Card migration: ColorPicker protagonist plate

**File**: `demo/@/components/custom/color-picker/ColorPicker.vue` line 3  
**Wave**: A/W1, Lane A2  
**Audit ref**: HARDEN-3 (design waves — resting plate vs wash pane)

---

## Before

```html
<Card variant="pane" class="flex flex-col rounded-2xl min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
```

## After

```html
<Card tier="resting" class="flex flex-col rounded-2xl min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
```

---

## Design rationale

`ColorPicker.vue` is the protagonist plate — the primary interactive surface the user focuses on. It must read as elevated above the surrounding layout shell. The `resting` tier provides the correct surface lift and default shadow (`shadow` prop defaults to `true`), preventing it from flattening into the background.

The 10 scroll-pane wash panes handled by the sibling lane (A1) correctly use `tier="wash"` because they are subordinate containers. Batching `ColorPicker.vue` as `wash` would violate visual hierarchy by collapsing the protagonist surface to background level.

`grain` and `shadow` are left at their defaults (both `true`) — no explicit props added.

`rounded-2xl` in the `class` attribute is preserved verbatim; radius consolidation is deferred to a later wave.

---

## Grep proof

```
$ grep -n 'variant="pane"' demo/@/components/custom/color-picker/ColorPicker.vue
(no output — exit 1)
```

```
$ grep -n 'tier="resting"' demo/@/components/custom/color-picker/ColorPicker.vue
3:        <Card tier="resting" class="flex flex-col rounded-2xl min-w-0 flex-none lg:flex-1 min-h-0 max-h-full overflow-x-hidden overflow-y-auto lg:overflow-visible">
```

---

## vue-tsc result

`npx vue-tsc --noEmit 2>&1 | grep 'ColorPicker.vue'` returns two pre-existing errors on lines 208 and 227 (ColorModel / ValueUnit generic mismatch — unrelated to the Card prop). No new errors introduced by this change. The `variant` prop removal produces no type error because the Card component never had a `variant` prop declared; the stale prop was silently ignored at runtime and is now absent.
