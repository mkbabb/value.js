# A.W3 — palette-controls lane proof doc

Lane: `palette-controls`  
Files: `demo/@/components/custom/palette-browser/` — 11 files  
vue-tsc baseline: 246 errors. Post-edit: 246 errors (no regression).

---

## PaletteSlugBar.vue

**Ag-11** (slug-pill):
- Line 39: `text-mono-small font-bold px-2 py-0.5 rounded-full border cursor-help` → `slug-pill cursor-help`. `:style` color/border-color binding kept.
- Line 55: `text-mono-small font-bold px-2 py-0.5 rounded-full border cursor-default text-muted-foreground border-muted-foreground` → `slug-pill cursor-default text-muted-foreground border-muted-foreground`.

**Ag-1** (type scale):
- Line 47: `text-xs` (HoverCard descriptor) → `text-caption`. Role: small descriptor text in a hover card. φ mapping: `text-xs` → `text-caption`.

**Exception — login button (line 63)**: `text-mono-small font-bold px-3 py-1 rounded-full border` kept as-is. This is an action button (icon + label "Login"), not a slug display chip; its padding differs from `.slug-pill` (`px-3 py-1` vs `px-2 py-0.5`). Adopting `slug-pill` would require overriding padding, making it more verbose. Documented: login button variant, not a pure slug display.

---

## PaletteControlsBar.vue

No raw text sizes, no hand-rolled shadows, no semantic-radius issues.  
Tabs already use filled `TabsList` treatment with `text-subheading` on all `TabsTrigger` items — Ag-12 tab treatment already correct. No changes.

---

## PaletteRenameInput.vue

No raw text sizes (uses `text-mono-small`). Small action icon-buttons use `rounded-sm` — these are inline icon-only buttons, no role alias applies. No changes.

---

## SearchFilterBar.vue

No raw text sizes in template (already uses `text-micro`, `text-caption`, `text-small`). Scoped CSS `.filter-option` and `.filter-section` use CSS custom properties directly (`--type-small`, `--leading-small`, `--radius-md`) — these are already token-based per Ag-8 note ("Leave radii inside scoped CSS that already use `--radius-*` tokens"). No hand-rolled box-shadow literals. No changes.

---

## BulkActionToolbar.vue

**Ag-1** (type scale):
- Line 14: `text-xs` (count badge) → `text-caption`. Role: small count label in a floating toolbar.
- Line 22: `text-xs` (Clear button) → `text-caption`. Role: small action label.

**Ag-8** (semantic radii):
- Line 12: `rounded-xl` on glass-floating toolbar panel → `rounded-panel`. Role: floating panel surface.

---

## CurrentPaletteEditor.vue

**Ag-7** (shadow routing — one-off inset):
- Line 302 (scoped CSS `.swatch-cutout`): `color-mix(in srgb, var(--foreground) 15%, transparent)` → `color-mix(in srgb, var(--shadow-color) 15%, transparent)`. The inset depth shadow has no glass-ui token equivalent; kept as one-off per Ag-7 instruction, now reads `--shadow-color` so it responds to dark mode.

**Ag-1** (type scale):
- Line 59: `text-xs` (edit overlay arrow glyph) → `text-caption`. Role: small punctuation/arrow glyph label.
- Line 125: `text-xs` (Update button) → `text-caption`. Role: small action label on a compact button.
- Line 132: `text-xs` (Cancel button) → `text-caption`. Same role.

**Ag-8** (semantic radii):
- Line 103: `Input` had `rounded-2xl` (= card radius) → `rounded-input`. This is a text input field; the correct alias is `rounded-input` (= `--radius-input` = `--radius` ≈ 0.625rem). This was an Ag-8 partial bug noted in the research doc (`ColorInput.vue:15` same class of error).

---

## MiniColorPicker.vue

No raw text sizes (uses `text-caption`, `text-micro`, `fira-code`). The `shadow-sm` on the hue track thumb (line 33) is a Tailwind soft-shadow on a 3×3px draggable thumb — no glass-ui rung mismatch; leave as-is. No changes.

---

## SortFilterMenu.vue

**Ag-12** (dropdown item normalization):
- Lines 13, 17: `DropdownMenuRadioItem class="text-sm cursor-pointer gap-2"` → `text-small cursor-pointer gap-2`. `gap-2` and `cursor-pointer` already present; only `text-sm` → `text-small` needed.

---

## UserSortMenu.vue

**Ag-12** (dropdown item normalization):
- Lines 14, 18, 22: `DropdownMenuRadioItem class="text-sm cursor-pointer gap-2"` → `text-small cursor-pointer gap-2`.

**Ag-1** / **Ag-12** (descriptor sub-text):
- Line 9: `DropdownMenuLabel class="text-xs"` → `text-micro`. Role: section label/descriptor above the radio group.

---

## TagEditPopover.vue

No raw text sizes (uses `text-caption`, `text-small`, `text-mono-caption`). Tag list items use `text-small cursor-pointer` with `rounded-md` — scoped to a filter list label with no card/dialog/input/button role, no alias required. No changes.

---

## ActionFeedback.vue

**Ag-8** (semantic radii):
- Line 7: `rounded-xl` on feedback toast panel → `rounded-panel`. Role: floating feedback surface.

**Exception — `text-xs` (line 7)**: Kept as documented exception. The feedback toast is explicitly mono (`fira-code`). `text-caption` carries `font-style: italic; font-family: var(--font-serif)` — wrong for a mono toast. `text-mono-caption` is uppercase+tracked — wrong for a sentence message. `text-mono-small` (0.875rem) would be larger than the intended compact `text-xs` (0.75rem). No φ mono utility matches this role at this size. Exception: mono feedback toast, raw `text-xs` retained.

---

## Summary

| Finding | Files touched | Changes |
|---|---|---|
| Ag-1 (type scale) | PaletteSlugBar, BulkActionToolbar, CurrentPaletteEditor | 6 `text-xs` → `text-caption`; 1 `text-xs` → `text-micro` (UserSortMenu label) |
| Ag-7 (shadow routing) | CurrentPaletteEditor | 1 inset shadow: `--foreground` → `--shadow-color` |
| Ag-8 (semantic radii) | BulkActionToolbar, CurrentPaletteEditor, ActionFeedback | `rounded-xl`→`rounded-panel` (×2); `rounded-2xl`→`rounded-input` (×1 Input field) |
| Ag-11 (slug-pill) | PaletteSlugBar | 2 inline utility clusters → `.slug-pill` class |
| Ag-12 (dropdown items) | SortFilterMenu, UserSortMenu | `text-sm`→`text-small` on all `DropdownMenuRadioItem`s |

**Documented exceptions (2):**
1. `PaletteSlugBar` login button: `px-3 py-1` padding differs from slug-pill `px-2 py-0.5`; action button role, not chip display.
2. `ActionFeedback` `text-xs`: mono feedback toast; no φ mono utility at 0.75rem for sentence-cased messages.

**vue-tsc error count: 246** (unchanged from baseline).
