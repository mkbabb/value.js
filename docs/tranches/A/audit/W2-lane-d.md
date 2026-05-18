# Tranche A — W2 Lane D audit

Findings Ab-3, Ab-4, Ab-5, Ab-6, Ab-7, Ab-18, Ab-19.

---

## Ab-3 — MiniColorPicker.vue: inline-style hex color stops

**File:** `demo/@/components/custom/palette-browser/MiniColorPicker.vue`

**Before (line 11):**
```html
:style="{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))` }"
```

**After (template):**
```html
class="sv-canvas relative w-full h-28 rounded-lg cursor-crosshair overflow-hidden border border-border"
:style="{ '--hue': hue }"
```

**After (new `<style scoped>` block):**
```css
.sv-canvas {
    background:
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(calc(var(--hue) * 1deg), 100%, 50%));
}
```

Static `#000` / `#fff` stops moved to CSS; only the hue value (`--hue`) remains in `:style`. The cascade can now reach the static layer.

---

## Ab-4 — Hardcoded gold accent values

Three files in scope: `ColorInput.vue`, `PaletteCard.vue`, `Dock.vue`.

### ColorInput.vue — `demo/@/components/custom/color-picker/controls/ColorInput.vue`

**Before (lines 363, 365 in `@keyframes crown-appear`):**
```css
filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.7));
filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.4));
```

**After:**
```css
filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-gold) 70%, transparent));
filter: drop-shadow(0 0 3px color-mix(in srgb, var(--color-gold) 40%, transparent));
```

### PaletteCard.vue — `demo/@/components/custom/palette-browser/PaletteCard.vue`

**Before (line 380):**
```css
filter: drop-shadow(0 0 1px rgba(212, 175, 55, 0.4));
```

**After:**
```css
filter: drop-shadow(0 0 1px color-mix(in srgb, var(--color-gold) 40%, transparent));
```

### Dock.vue — `demo/@/components/custom/dock/Dock.vue`

**Before (line 401):**
```css
filter: drop-shadow(0 0 2px rgba(212, 175, 55, 0.3));
```

**After:**
```css
filter: drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent));
```

All three now track `--color-gold: #D4AF37` defined in `demo/@/styles/style.css:11`.

**Verification:** `grep -rn '212.*175.*55\|D4AF37\|255.*215.*0\|FFD700' ColorInput.vue PaletteCard.vue Dock.vue` → no output.

---

## Ab-5 — Utility-soup input surfaces

### PaletteRenameInput.vue — `demo/@/components/custom/palette-browser/PaletteRenameInput.vue`

**Before (line 4):**
```html
class="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border"
```

**After:**
```html
class="input-bar max-w-sm"
```

Glass-ui `.input-bar` supplies `display:flex`, `align-items:center`, `gap:0.5rem`, border, background, blur, padding, height, transition, and focus-within ring in one class. Layout-only overrides (`max-w-sm`) remain on the element.

### BulkActionToolbar.vue — `demo/@/components/custom/palette-browser/BulkActionToolbar.vue`

**Before (line 12):**
```html
class="sticky bottom-2 z-[var(--z-popover)] mx-auto flex w-fit items-center gap-2 rounded-xl border border-border bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm"
```

**After:**
```html
class="glass-floating sticky bottom-2 z-[var(--z-popover)] mx-auto flex w-fit items-center gap-2 rounded-xl px-4 py-2"
```

`border`, `bg-card/95`, `shadow-lg`, `backdrop-blur-sm` removed; `.glass-floating` supplies equivalent surface (background, blur, border, shadow) via the canonical glass ladder.

---

## Ab-6 — `var()`-wrapped arbitrary Tailwind transition in ColorPicker.vue

**File:** `demo/@/components/custom/color-picker/ColorPicker.vue`

**Before (line 2):**
```html
class="... transition-[margin,transform] duration-[var(--duration-normal)] ease-[var(--ease-standard)]"
```

**After (template line 2):**
```html
class="pane-shell flex flex-col relative min-w-0 w-full ..."
```

**Added to `<style scoped>`:**
```css
.pane-shell {
    transition:
        margin var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--ease-standard);
}
```

The three arbitrary utilities (`transition-[...]`, `duration-[var(...)]`, `ease-[var(...)]`) replaced with a single scoped CSS rule.

---

## Ab-7 — Arbitrary rem widths on dropdown/select panels

Token: `--menu-min-w: 11rem` at `demo/@/styles/style.css:61`.

| File | Panel | Before | After | Rationale |
|------|-------|--------|-------|-----------|
| `gradient/EasingSelector.vue:40` | `SelectTrigger` | `min-w-[9rem]` | `min-w-[var(--menu-min-w)]` | 9rem → token |
| `gradient/EasingSelector.vue:43` | `SelectContent` | `min-w-[10rem]` | `min-w-[var(--menu-min-w)]` | 10rem → token |
| `palette-browser/SortFilterMenu.vue:8` | `DropdownMenuContent` | `min-w-[11rem]` | `min-w-[var(--menu-min-w)]` | equals token |
| `dock/menus/ProfileSection.vue:49` | `DropdownMenuContent` | `min-w-[11rem]` | `min-w-[var(--menu-min-w)]` | equals token |
| `dock/menus/ProfileSection.vue:102` | `DropdownMenuContent` | `min-w-[11rem]` | `min-w-[var(--menu-min-w)]` | equals token |
| `dock/menus/MobileMenuDropdown.vue:37` | `DropdownMenuContent` | `min-w-[11rem]` | `min-w-[var(--menu-min-w)]` | equals token |
| **`dock/Dock.vue:251`** | `SelectContent` | `min-w-[12rem]` | **kept at `min-w-[12rem]`** | View entries include "Atmosphere", "Audit Log" with icon + colored dot; 12rem prevents label truncation |
| **`generate/GenerateControls.vue:90,:112`** | `SelectContent` | `min-w-[14rem]` | **kept at `min-w-[14rem]`** | Preset/harmony option labels include "Split Complementary", long description spans; 14rem is content-driven |

6 of 8 sites tokenised. 2 kept wider with content rationale recorded above.

---

## Ab-18 — VersionHistoryDrawer.vue: magic-pixel `max-h`

**File:** `demo/@/components/custom/palette-browser/VersionHistoryDrawer.vue`

**Before (lines 3, 12):**
```html
<SheetContent side="right" class="w-[380px] sm:max-w-[420px]">
    ...
    <div class="mt-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(100dvh-160px)]">
```

**After:**
```html
<SheetContent side="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
    <SheetHeader class="shrink-0">
        ...
    </SheetHeader>
    <div class="mt-4 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto">
```

SheetContent becomes a flex column. `SheetHeader` is `shrink-0`; the scroll body is `flex-1 min-h-0 overflow-y-auto`. No `100dvh` dependency, no 160px magic constant.

---

## Ab-19 — SpectrumCanvas.vue: raw `rgba` box-shadow

**File:** `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue`

**Before (line 260):**
```css
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
```

**After:**
```css
box-shadow: var(--shadow-sm);
```

Routes through `--shadow-sm` token (`tokens.css:336`) which uses `color-mix` and responds to dark mode.

---

## Verification

```
$ cd /Users/mkbabb/Programming/value.js && npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
246
```

Count is 246 — exactly at the ≤ 246 ceiling, no new errors introduced.

```
$ grep -rn '212.*175.*55\|D4AF37\|255.*215.*0\|FFD700' \
    demo/@/components/custom/color-picker/controls/ColorInput.vue \
    demo/@/components/custom/palette-browser/PaletteCard.vue \
    demo/@/components/custom/dock/Dock.vue
(no output)
```
