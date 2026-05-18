# W2 Lane C+A — Deprecated CSS Retire + Z-Index Token Adoption

**Branch:** master  
**Date:** 2026-05-18  
**Files edited:** 6 (only the 6 authorised targets)  
**vue-tsc error count before / after:** 246 / 246 (no regression)

---

## Lane C — Deprecated CSS Retire

### Ab-12a — `-webkit-overflow-scrolling: touch` deleted
**File:** `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:318` (pre-edit)

Dead declaration — no-op since iOS 13. Removed the single line from `.debug-scroll`.

```css
/* BEFORE */
.debug-scroll {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;   /* ← deleted */
    pointer-events: none;
}

/* AFTER */
.debug-scroll {
    overflow-y: auto;
    pointer-events: none;
}
```

---

### Ab-12b — `::-webkit-scrollbar { display: none }` replaced by `.scrollbar-hidden`
**File:** `demo/@/components/custom/palette-browser/PaletteControlsBar.vue:161` (pre-edit)

Verified glass-ui ships `.scrollbar-hidden` at `node_modules/@mkbabb/glass-ui/src/styles/utilities.css:68-73` (sets `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).

Changes:
1. Added `scrollbar-hidden` to the static class list on the scroll container (template line 17).
2. Removed the scoped `&::-webkit-scrollbar { display: none; }` rule from `.tabs-scroll-mask` (the `scrollbar-width: none` companion was already present and is kept as belt-and-suspenders for the mask-only branch).

```html
<!-- BEFORE -->
:class="['overflow-x-auto mx-0', tabsOverflowing && 'tabs-scroll-mask']"

<!-- AFTER -->
:class="['overflow-x-auto mx-0 scrollbar-hidden', tabsOverflowing && 'tabs-scroll-mask']"
```

```css
/* BEFORE */
.tabs-scroll-mask {
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }   /* ← deleted */
}

/* AFTER */
.tabs-scroll-mask {
    scrollbar-width: none;
}
```

---

### Ab-13 — `ExtractControls` native `<input type="range">` → reka-ui `Slider`
**File:** `demo/@/components/custom/image-palette-extractor/ExtractControls.vue:152-225` (pre-edit)

Two native range inputs with 8 vendor-pseudo rules (`::webkit-slider-runnable-track`, `::-webkit-slider-thumb`, `::-moz-range-track`, `::-moz-range-thumb` × 2 sliders plus hover variants) were replaced with the `Slider` component from `@components/ui/slider` (re-exports `@mkbabb/glass-ui` `Slider`).

**Before (representative):**
```html
<input
    :value="k"
    type="range"
    min="1"
    max="16"
    aria-label="Number of colors"
    class="extract-slider extract-slider--k relative w-full h-6 ..."
    @input="$emit('update:k', Number(($event.target as HTMLInputElement).value))"
    @pointerdown="onKPointerDown"
    @touchmove.passive="kGate.handleScrollCheck($event)"
    @touchend.passive="kGate.handleTouchEnd()"
/>
```
Plus ~74 lines of vendor-pseudo CSS for both sliders.

**After:**
```html
<Slider
    aria-label="Number of colors"
    variant="spectrum"
    :model-value="[k]"
    :min="1"
    :max="16"
    :step="1"
    class="relative w-full"
    :style="{ '--slider-track-bg': 'transparent' }"
    @update:model-value="(v: number[] | undefined) => v && $emit('update:k', v[0]!)"
/>
```

The `spectrum` variant gives a tall pill track (transparent range, bar thumb) that matches the original geometry. The k slider's gradient background div is preserved as an absolutely-positioned underlay — `--slider-track-bg: transparent` makes the Slider track see-through so the gradient shows through. The kC slider uses `--slider-track-bg: var(--muted)` to match the original `--track-bg` binding.

Touch-gate logic (`useTouchGate`, `onKPointerDown`, `onKcPointerDown`, `kSliderWrapperRef`, `kcSliderWrapperRef`, `isTouchDevice`) was removed — the glass-ui `Slider` component handles touch gating internally via its own `useTouchGate` integration (per `Slider.vue:95-135`).

All 8 vendor-pseudo CSS rules deleted. Imports of `ref`, `useTemplateRef`, `useTouchGate` removed from `<script setup>` as they were only used by the touch-gate / native input wiring.

**Type fix:** `@update:model-value` on the glass-ui `Slider` has signature `(payload: number[] | undefined) => any`; updated both handlers to guard on undefined.

---

## Lane A — Z-Index Tier Adoption

### Ab-15a — PaneHeader sticky bar
**File:** `demo/@/components/custom/panes/PaneHeader.vue:2`

```html
<!-- BEFORE -->
class="pane-header px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-[1] backdrop-blur-md bg-card/60"

<!-- AFTER -->
class="pane-header px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-[var(--z-header)] backdrop-blur-md bg-card/60"
```

`z-[1]` → `z-[var(--z-header)]` (`--z-header: 35` per `tokens.css:154`). The sticky header is a header surface; this rung seats it above bar content (`--z-bar: 30`) and below dock (`--z-dock: 40`).

---

### Ab-15b — GooBlob wrapper
**File:** `demo/@/components/custom/goo-blob/GooBlob.vue:72`

```css
/* BEFORE */
.goo-blob-wrapper {
    z-index: 10;
}

/* AFTER */
.goo-blob-wrapper {
    z-index: var(--z-content);
}
```

`z-index: 10` → `var(--z-content)` (`--z-content: 10`). Numeric value is preserved; the token makes the intent explicit and tracks any future tier re-numbering.

---

### Ab-15c — BlobPane config-dock-anchor
**File:** `demo/@/components/custom/panes/BlobPane.vue:179`

```css
/* BEFORE */
.config-dock-anchor {
    z-index: 2;
}

/* AFTER */
.config-dock-anchor {
    z-index: var(--z-content);
}
```

`z-index: 2` → `var(--z-content)` (`--z-content: 10`). The config dock anchor floats above pane content; `--z-content` is the correct rung for in-pane elevated content.

---

## Ab-16 — PointerDebugOverlay hardcoded colors (recorded-deferred)

**File:** `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:212-339`

Per invariant A5: this overlay is dev-only tooling, never shipped to users. Hardcoded colors (`rgba(0,0,0,0.92)`, `#e0e0e0`, `#ff4444`, `#4caf50`, `#888`) are an acceptable trade-off for isolated debug infrastructure. Fixing the colors (→ `--destructive`, a success token, `--glass-bg-elevated`) is deferred at P2. No change made to the file beyond the `-webkit-overflow-scrolling` removal above.

---

## Verification

```
grep -rn '\-webkit-overflow-scrolling\|::-webkit-scrollbar\|::-webkit-slider' \
  demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue \
  demo/@/components/custom/palette-browser/PaletteControlsBar.vue \
  demo/@/components/custom/image-palette-extractor/ExtractControls.vue
# → (no output)

npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
# → 246
```
