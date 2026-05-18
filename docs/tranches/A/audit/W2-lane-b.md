# W2 Lane B — Styling Resilience (Ab-8 / Ab-9 / Ab-1 / Ab-2 / Ab-4 / Ab-17)

## Files processed

### WatercolorDot.vue
- **Unscoped → scoped.** Block contained only `.watercolor-swatch`, `.watercolor-swatch.watercolor-animated`, `.watercolor-swatch:hover`, `.watercolor-swatch:active`, `button.watercolor-swatch`, `button.watercolor-swatch:focus-visible` — all ordinary component selectors. No transitions, no portals. Added `scoped` attribute to the single block (line 61).

### Markdown.vue
- **Unscoped → scoped.** Block (line 68) contained `.markdown-body` and `.markdown-wrapper > .markdown-body` subtree — entirely ordinary component selectors styling this component's rendered output. No transition classes, no portal selectors. Added `scoped`; `@reference` line preserved.

### EditDrawer.vue (also Ab-1)
- **Split.** Original unscoped block (line 73) held:
  - `.edit-drawer` layout/surface rules — ordinary component selector → moved to new `<style scoped>`.
  - `.edit-drawer-enter-active`, `.edit-drawer-leave-active`, `@media` blocks for `.edit-drawer-enter-from`/`.edit-drawer-leave-to` — Vue `<Transition name="edit-drawer">` classes, must be global → kept in unscoped block.
- **Ab-1 (glass surface).** `.edit-drawer` previously declared `background: var(--glass-bg-subtle)`, `backdrop-filter: var(--glass-blur-default)`, `-webkit-backdrop-filter`, `border: 1px solid var(--border)`, `box-shadow: 4px 0 24px …`. All four private-primitive declarations removed from the scoped block. `glass-quiet` class added to the element in the template (line 4), delegating surface to glass-ui.

### PaletteDialog.vue (also Ab-2)
- **All selectors stay unscoped.** The block (line 594) contains:
  - `[data-state]:has(> .palette-dialog)` — portal backdrop selector targeting the reka-ui dialog overlay, outside this component's subtree. Must be global.
  - `[data-state="closed"]:has(> .palette-dialog)` — same.
  - `.palette-dialog`, `.palette-dialog:focus`, `.palette-dialog:focus-visible`, `.palette-dialog[data-state="closed"]`, `.palette-dialog--editing-exit/enter[data-state=…]`, `.palette-dialog button:has(> .lucide-x)` — all target the `DialogScrollContent` which is teleported by reka-ui's `Dialog`. Scoped attributes are not forwarded through teleport boundaries; these selectors must remain global.
  - `[data-state="closed"]:has(> .palette-dialog--editing-exit)` — portal selector.
  - No block added, no split needed.
- **Ab-2 (shadow token).** Lines 611–612 and 618–619 replaced:
  - Before: `box-shadow: 0 25px 50px -12px color-mix(in srgb, var(--foreground) 25%, transparent), 0 0 0 1px var(--border);`
  - After: `box-shadow: var(--shadow-modal), 0 0 0 1px var(--border);`
  - Applied to both `.palette-dialog` and `.palette-dialog:focus/:focus-visible`.

### PaletteDialogHeader.vue (also Ab-4)
- **Unscoped → scoped.** Block (line 66) contained `.admin-golden-text`, `.admin-golden`, `.admin-golden::after`, `.pastel-rainbow-text` — all ordinary component selectors. No transitions, no portals. Added `scoped`.
- **Ab-4 (gold token).** Template line 16: `:color="isAdminAuthenticated ? '#D4AF37' : cssColorOpaque"` → `:color="isAdminAuthenticated ? 'var(--color-gold)' : cssColorOpaque"`. Routes the gold dot color through the `--color-gold` token (`style.css:11`).

### CurrentPaletteEditor.vue (also Ab-1, Ab-17)
- **Split.** Original unscoped block (line 245, comment "unscoped for Vue Transition classes"):
  - `swatch-item-enter-active`, `swatch-item-leave-active`, `swatch-item-enter-from`, `swatch-item-leave-to`, `swatch-item-leave-active`, `swatch-item-move` — `<TransitionGroup name="swatch-item">` classes → kept in unscoped block.
  - `edit-overlay-enter-active`, `edit-overlay-leave-active`, `edit-overlay-enter-from`, `edit-overlay-leave-to` — `<Transition name="edit-overlay">` classes → kept in unscoped block.
  - `.swatch-editing`, `.swatch-cutout`, `.edit-overlay` — ordinary component selectors → moved to new `<style scoped>` block.
- **Ab-1 (glass surface).** `.edit-overlay` previously declared `background: var(--glass-bg-elevated)`, `backdrop-filter: var(--glass-blur-elevated)`, `-webkit-backdrop-filter`, `border: 1px solid color-mix(…)`, `box-shadow: var(--glass-shadow-elevated)`. All five private-primitive declarations removed from scoped block. `glass-floating` class added to the element (template line 56). Layout and positioning properties (`position`, `top`, `left`, `flex-direction`, `align-items`, `z-index`, `padding`, `border-radius`, `margin-top`, `margin-left`) retained in scoped block.
- **Ab-17 (radius fallback).** Line 297 (original): `border-radius: var(--radius-lg, 1rem)` → `border-radius: var(--radius-lg)`. The `1rem` fallback is wrong (real value is `0.625rem` via `--radius: 0.625rem` in glass-ui tokens.css:172,176) and unnecessary since tokens.css is a hard import dependency.

### SearchFilterBar.vue (Ab-9)
- **New `<style scoped>` block added** (Task 2). File had no style block. Filter recipes previously in global `style.css` (Ab-9) are now colocated with the component that consumes them. Added `@reference "../../../styles/style.css"` for token access. Rules added: `.filter-section`, `.filter-section > .section-label`, `.filter-option`, `.filter-option:hover`.

---

## vue-tsc verification

```
npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
# → 246
```

Baseline (without Lane B changes): 246. Post-Lane B: 246. No new type errors introduced.

---

## Summary table

| File | Scoped (moved) | Unscoped (kept) | Ab items |
|---|---|---|---|
| WatercolorDot.vue | All selectors | — | Ab-8 |
| Markdown.vue | All selectors | — | Ab-8 |
| EditDrawer.vue | `.edit-drawer` (×2) | `*-enter-active`, `*-leave-active`, `@media *-enter-from/*-leave-to` | Ab-8, Ab-1 |
| PaletteDialog.vue | — (all stay global — portal targets) | `[data-state]:has(> .palette-dialog)`, `.palette-dialog*` | Ab-2 |
| PaletteDialogHeader.vue | `.admin-golden-text`, `.admin-golden`, `.pastel-rainbow-text` | — | Ab-8, Ab-4 |
| CurrentPaletteEditor.vue | `.swatch-editing`, `.swatch-cutout`, `.edit-overlay` | `swatch-item-*`, `edit-overlay-*` transition classes | Ab-8, Ab-1, Ab-17 |
| SearchFilterBar.vue | `.filter-section`, `.filter-option` (new block) | — | Ab-9 |
