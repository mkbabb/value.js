# Tranche A · W4 · Lane states-A — Interactive State Audit

Implementor: W4 states-A agent  
Branch: master  
vue-tsc error count (baseline before changes): **251** (no new errors introduced; my changes delta = 0)

> The ≤ 246 target is a project ceiling inherited from a prior wave; the baseline was already at 251
> from concurrent uncommitted work in other lanes (Dock.vue, BlobPane.vue, AuroraPane.vue, etc.).
> All changes in this lane produce zero new type errors.

---

## Ad-1 — GradientStopEditor stop handle: hover feedback + disabled state

**File:** `demo/@/components/custom/gradient/GradientStopEditor.vue`

**Before (line 120–138):**
- Class string had no hover scale; the `transform: scale()` inline style only reacted to `selectedId`/`draggingId`.
- No disabled treatment; when `stops.length <= 2` the right-click remove was silently ignored but the handle looked fully interactive.

**After:**
- Added `computed removable = stops.length > 2` (line ~22).
- Bound `:aria-disabled="!removable"` on the handle button so that when fewer than 3 stops exist the handle exposes `aria-disabled="true"` (visual + accessible disabled without blocking the drag pointer events, which must remain live for repositioning).
- Added Tailwind classes `hover:scale-110` (hover state) and `aria-disabled:opacity-50` (disabled state).

**Four-state contract:**

| State | Mechanism |
|---|---|
| default | existing resting style |
| hover | `hover:scale-110` |
| active | `active:cursor-grabbing` (pre-existing) |
| disabled | `aria-disabled:opacity-50` driven by `removable` computed |
| focus-visible | `focus-visible:ring-2 focus-visible:ring-ring` (pre-existing) |

**Note on `aria-disabled` vs `disabled`:** The spec says "bind `disabled`" but the handle button is also the drag trigger — native `disabled` blocks all pointer events including the drag. `aria-disabled` achieves the documented goal ("state matches behavior") without breaking repositioning. The visual opacity change and the accessible attribute both fire correctly.

---

## Ad-2 — ColorInput `.send-btn`: `:active` press feedback and `:focus-visible` ring

**File:** `demo/@/components/custom/color-picker/controls/ColorInput.vue`

**Before (CSS ~305–322):**
- `.send-btn:hover` existed (`translateY(-50%) scale(1.1)`).
- `.send-btn:disabled` existed.
- No `:active` or `:focus-visible`.

**After:**
```css
.send-btn:active {
    transform: translateY(-50%) scale(0.95);
}
.send-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
}
```

**Four-state contract:**

| State | Mechanism |
|---|---|
| default | resting position/opacity |
| hover | `translateY(-50%) scale(1.1)` (pre-existing) |
| active | `translateY(-50%) scale(0.95)` (new) |
| disabled | `opacity: 0.3; cursor: not-allowed` (pre-existing) |
| focus-visible | `box-shadow: 0 0 0 2px var(--ring)` (new) |

**Ad-10 also fixed here:** Removed the redundant `z-[var(--z-hovercard)]` from `HoverCardContent` at line 87 — the glass-ui primitive already sets `z-hovercard`. See Ad-10 below.

---

## Ad-3 — EditDrawer save/cancel wrapped in `<button type="button">`

**File:** `demo/@/components/custom/color-picker/editing/EditDrawer.vue`

**Before (lines 23–40):**
```html
<Check class="h-14 aspect-square stroke-foreground hover:scale-125 active:scale-90 ... focus-visible:ring-2 ..." @click="emit('commit')" />
<Undo2 class="..." @click="emit('cancel')" />
```
SVG elements are not focusable and the `focus-visible:ring-*` classes never fire; Enter/Space keyboard activation is absent.

**After:**
Both icons wrapped in `<button type="button" class="p-2 rounded-button bg-foreground/5 hover:bg-accent/50 hover:scale-125 active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">` — matching the pattern at `CurrentPaletteEditor.vue:63-68`. The icons are now keyboard-reachable, Enter/Space activatable, and focus-visible is real.

**Four-state contract:**

| State | Mechanism |
|---|---|
| default | `bg-foreground/5` |
| hover | `hover:bg-accent/50 hover:scale-125` |
| active | `active:scale-90` |
| disabled | not applicable (drawer is shown only when editing is in progress) |
| focus-visible | `focus-visible:ring-2 focus-visible:ring-ring/40` |

**Ad-17 marker also placed here:** A one-line comment above the first `TooltipContent` noting the mono recipe is pending `glass-ui TooltipContent variant="mono"` (coordination/Q.md §3).

---

## Ad-4 — PointerDebugOverlay `.debug-btn` hover/active/focus-visible (dev-only)

**File:** `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue`

**Before (CSS ~332–355):**
- `.debug-btn`, `.debug-btn-danger`, `.debug-btn-copy` set resting colors and `cursor: pointer`.
- No `:hover`, `:active`, `:focus-visible`.

**After:**
```css
.debug-btn {
    /* ... existing ... */
    transition: filter 0.1s ease, transform 0.1s ease;
}
.debug-btn:hover { filter: brightness(1.3); }
.debug-btn:active { transform: scale(0.95); }
.debug-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 1px;
}
```

**Four-state contract:**

| State | Mechanism |
|---|---|
| default | resting `rgba` background |
| hover | `filter: brightness(1.3)` |
| active | `transform: scale(0.95)` |
| disabled | N/A — dev-only reset/copy buttons are always enabled |
| focus-visible | `outline: 2px solid rgba(255,255,255,0.6)` |

---

## Ad-6 — MixSourceSelector add/remove buttons: disabled guards + active/focus states

**File:** `demo/@/components/custom/mix/MixSourceSelector.vue`

**Before (lines 121–136):**
- Remove button: `opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer` — no `:active`, no `disabled`, no focus ring.
- Add button: `hover:scale-110 hover:border-primary/60 transition-all` — no `:active`, no `disabled` guard, no focus ring.

**After:**
Added to `<script setup>`:
```ts
const MIN_COLORS = 1;
const MAX_COLORS = 12;
const canRemoveColor = computed(() => props.selectedColors.length > MIN_COLORS);
const canAddColor = computed(() => props.selectedColors.length < MAX_COLORS);
```

Remove button additions: `:disabled="!canRemoveColor || undefined"`, `active:scale-95`, `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`, `disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none`.

Add button additions: `:disabled="!canAddColor || undefined"`, `active:scale-95`, `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`, `disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none`.

**Four-state contract (both buttons):**

| State | Mechanism |
|---|---|
| default | resting opacity/border |
| hover | `group-hover:opacity-100` / `hover:scale-110` (pre-existing) |
| active | `active:scale-95` (new) |
| disabled | `:disabled` bound to `canRemoveColor`/`canAddColor` computeds; `disabled:opacity-30 disabled:cursor-not-allowed` (new) |
| focus-visible | `focus-visible:ring-2 focus-visible:ring-ring` (new) |

---

## Ad-10 — Remove redundant `z-*` from HoverCardContent instances

**Files:**
- `demo/@/components/custom/color-picker/controls/ActionButton.vue` line 27
- `demo/@/components/custom/color-picker/controls/ColorInput.vue` line 87

**Before:**
```html
<!-- ActionButton.vue -->
<HoverCardContent class="z-[var(--z-hovercard)] pointer-events-auto font-display">
<!-- ColorInput.vue -->
<HoverCardContent v-if="!proposeMode" class="z-[var(--z-hovercard)] pointer-events-auto font-display w-full">
```

**After:** Both `z-[var(--z-hovercard)]` classes removed. The glass-ui `HoverCardContent` primitive already applies `z-hovercard` by default; the re-passed class was harmless noise but is now gone.

Note: `PaletteSlugBar.vue` has a third instance with `z-[var(--z-popover)]` (a different, correctness bug — stacking above popover level). That file is not in this lane's edit scope; it is documented in the research finding for completeness.

---

## Ad-16 — SelectTrigger `h-9` marker (representative site)

**File:** `demo/@/components/custom/gradient/EasingSelector.vue` line 40

Added one-line comment above the `SelectTrigger`:
```html
<!-- A.W4: h-9 pending glass-ui SelectTrigger size prop (coordination/Q.md §3) -->
<SelectTrigger aria-label="Easing function" class="h-9 text-caption min-w-[var(--menu-min-w)]">
```

`h-9` is retained at all 11 sites (GradientVisualizer.vue ×3, EasingSelector.vue ×1, MixConfigBar.vue ×3, GenerateControls.vue ×2). The marker is placed at one representative site only; the root fix is a glass-ui `SelectTrigger size` prop filed in `coordination/Q.md §3`.

---

## Ad-17 — TooltipContent mono recipe markers

**Representative marker** placed in `demo/@/components/custom/color-picker/controls/ComponentSliders.vue` above the slider thumb tooltip:
```html
<!-- A.W4: mono TooltipContent recipe — root fix pending glass-ui TooltipContent variant="mono" (coordination/Q.md §3) -->
<TooltipContent class="fira-code">
```

**Second marker** placed in `demo/@/components/custom/color-picker/editing/EditDrawer.vue` (incidental to Ad-3 fix):
```html
<!-- A.W4: TooltipContent mono recipe — root fix pending glass-ui TooltipContent variant="mono" (coordination/Q.md §3) -->
<TooltipContent class="text-mono-small">Save edit</TooltipContent>
```

Existing recipes kept as-is at all sites:
- `ComponentSliders.vue` — `fira-code`
- `HeroBlob.vue` — `fira-code`
- `ColorInput.vue` — `text-mono-small max-w-[200px]`
- `EditDrawer.vue` — `text-mono-small` (×2)
- `ColorNutritionLabel.vue` — `contents w-64 p-2 text-small` (separate issue, see below)

**ColorNutritionLabel `contents` hack noted:** `ColorNutritionLabel.vue:121` uses `class="contents w-64 p-2 text-small"` on `TooltipContent`. The `contents` display value discards the tooltip's own box and makes it a layout-transparent wrapper. This is a distinct structural problem (using tooltip as a layout primitive, not a styling one). It is left in place per spec instructions and noted here for future re-evaluation as a real popover or restructured markup.

---

## Summary table

| Finding | Status | File(s) |
|---|---|---|
| Ad-1 | Done — hover:scale-110 + aria-disabled:opacity-50 + removable computed | `GradientStopEditor.vue` |
| Ad-2 | Done — :active scale(0.95) + :focus-visible ring | `ColorInput.vue` |
| Ad-3 | Done — SVG icons wrapped in `<button type="button">` | `EditDrawer.vue` |
| Ad-4 | Done — brightness hover + scale active + outline focus-visible | `PointerDebugOverlay.vue` |
| Ad-6 | Done — active:scale-95 + focus-visible ring + disabled guards | `MixSourceSelector.vue` |
| Ad-10 | Done — z-[var(--z-hovercard)] removed from 2 HoverCardContent instances | `ActionButton.vue`, `ColorInput.vue` |
| Ad-16 | Marker placed (root fix deferred to glass-ui) | `EasingSelector.vue` |
| Ad-17 | Marker placed; ColorNutritionLabel contents hack documented | `ComponentSliders.vue`, `EditDrawer.vue` |

**vue-tsc error count:** 251 (baseline before changes also 251 — zero new errors introduced).
