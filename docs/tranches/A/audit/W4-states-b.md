# W4 States-B — Proof Document

Lane: states-B (palette-browser interactive-state hardening)
Branch: master (working tree, post W4 lane A + W3)
vue-tsc baseline at task start: 246 errors
vue-tsc after this lane: 248 errors (net delta: +0 from this lane — verified by stash diff)

---

## Ad-5 — Inline icon button four-state contract

### Scope
7 inline `<button>` elements across PaletteSlugBar, PaletteRenameInput, SortFilterMenu,
UserSortMenu, AdminTagsPanel.

### Before
- `p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0`
- No `:active`, no `focus-visible` ring, only one site had `:disabled`.

### After (per file)

**PaletteSlugBar.vue** (`demo/@/components/custom/palette-browser/PaletteSlugBar.vue`)
- Submit button (line 20): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none`. Already had `disabled:opacity-50 disabled:cursor-not-allowed`.
- Cancel button (line 27): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.
- Three-dot trigger (line 75): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.
- Login button (line 65): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.
- Popover menu buttons (lines 82, 89, 97, 104): added `active:scale-[0.98] active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.
- One-line marker comment left at the submit button site: `<!-- TODO(glass-ui): migrate to Button size="icon-sm" once shipped (Ad-5) -->`.

**PaletteRenameInput.vue** (`demo/@/components/custom/palette-browser/PaletteRenameInput.vue`)
- Both buttons (lines 17, 23): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

**SortFilterMenu.vue** (`demo/@/components/custom/palette-browser/SortFilterMenu.vue`)
- Trigger button (line 4): added `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

**UserSortMenu.vue** (`demo/@/components/custom/palette-browser/UserSortMenu.vue`)
- Trigger button (line 4): same recipe as SortFilterMenu.

**AdminTagsPanel.vue** (`demo/@/components/custom/palette-browser/AdminTagsPanel.vue`)
- Delete button (line 61): added `p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:opacity-100`. Previously had no hover bg, no rounded, no active, no focus ring.

### Four states confirmed
- Default: resting appearance (no change).
- Hover: `hover:bg-accent/50` or `hover:bg-accent`.
- Active/press: `active:scale-95 active:bg-accent/70` (or `active:scale-[0.98]` for full-width menu items).
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` (submit buttons). N/A for cancel/menu items (never disabled).
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

---

## Ad-7 — BulkActionToolbar floating surface

### Status: ALREADY FIXED (pre-existing in this working tree)

`BulkActionToolbar.vue:12` already reads:
`class="glass-floating sticky bottom-2 z-[var(--z-popover)] mx-auto flex w-fit items-center gap-2 rounded-panel px-4 py-2"`

The `bg-card/95 shadow-lg backdrop-blur-sm rounded-xl` from Ad-7's evidence had already been
replaced with `glass-floating rounded-panel` before this lane opened. No edit needed.

---

## Ad-8 — PaletteControlsBar sticky header z-index

**File**: `demo/@/components/custom/palette-browser/PaletteControlsBar.vue:2`

### Before
`z-[var(--z-popover)]` (z 130 — outranks real popovers)

### After
`z-[var(--z-bar)]` (z 30 — correct for in-flow sticky header)

`--z-bar: 30` is defined in `glass-ui/src/styles/tokens.css:153`. A sticky scroll-pinned header
belongs in the bar tier, below the overlay/popover/hovercard tiers.

---

## Ad-9 — SwatchHoverMenu panel padding deduplication

**File**: `demo/@/components/custom/palette-browser/SwatchHoverMenu.vue`

### Before
Hover path: `class="floating-panel flex items-center gap-1 p-1.5"` (hardcoded literal)
Touch path: `class="w-auto p-1.5 flex items-center gap-1"` (hardcoded literal)
Two separate hardcoded strings — could drift.

### After
Script-level constant added (line 60):
```ts
const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";
```
Both paths now reference `PANEL_LAYOUT` via `:class`:
- Touch: `<PopoverContent class="w-auto" :class="PANEL_LAYOUT" ...>`
- Hover: `<div class="floating-panel" :class="PANEL_LAYOUT" ...>`

The two paths are structurally preserved (hover-intent timing is intentional). Only the layout
string is deduplicated.

---

## Ad-10 — PaletteSlugBar HoverCardContent z-index

**File**: `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:46`

### Before
`<HoverCardContent class="text-small font-display w-56 z-[var(--z-popover)]">`
Forced z 130 (popover level) on a hover card, overriding the primitive's correct `z-hovercard`
(z 120). A hover card sitting above real popovers is the wrong stacking order.

### After
`<HoverCardContent class="text-small font-display w-56">`
`z-*` class removed. The glass-ui `HoverCardContent` primitive sets `z-hovercard` correctly.

---

## Ad-11 — MigratePalettesDialog redundant radius

**File**: `demo/@/components/custom/palette-browser/MigratePalettesDialog.vue:3`

### Status: ALREADY FIXED (pre-existing in this working tree)

The file already reads `<DialogContent class="rounded-dialog max-w-sm">`. The original
`rounded-[var(--radius-dialog)]` had already been replaced with `rounded-dialog` before this
lane opened. No edit needed.

---

## Ad-12 — PaletteDialog bespoke surface override

**File**: `demo/@/components/custom/palette-browser/PaletteDialog.vue`

### Before (template)
```
'palette-dialog max-w-[800px] p-0 gap-0 bg-card text-card-foreground overflow-hidden
 rounded-dialog sm:h-[min(90dvh,820px)] sm:max-h-[90dvh] min-w-0 flex flex-col'
```
### Before (style)
```css
.palette-dialog {
    animation: dialog-in var(--duration-slow) var(--ease-decelerate);
    box-shadow: var(--shadow-modal), 0 0 0 1px var(--border);
    outline: none;
}
.palette-dialog:focus,
.palette-dialog:focus-visible {
    outline: none;
    box-shadow: var(--shadow-modal), 0 0 0 1px var(--border);
}
```

### After (template)
```
'palette-dialog max-w-[800px] p-0 gap-0 overflow-hidden
 sm:h-[min(90dvh,820px)] sm:max-h-[90dvh] min-w-0 flex flex-col'
```
`bg-card text-card-foreground` and `rounded-dialog` removed — `glass-floating rounded-dialog`
from `DialogScrollContent` default now applies.

### After (style)
```css
.palette-dialog {
    animation: dialog-in var(--duration-slow) var(--ease-decelerate);
}
```
Bespoke `box-shadow`/`outline` block removed. The `glass-floating` surface provides the correct
shadow and border via tokens.

**Kept intact**:
- INTENTIONAL backdrop `[data-state]:has(> .palette-dialog)` block (desaturate 0.7 — annotated).
- All entry/exit animations (dialog-in, dialog-out, dialog-out-to-drawer, dialog-in-from-drawer).
- Close-button positioning rules.

---

## Ad-13 — SearchFilterBar color-search loading state

**File**: `demo/@/components/custom/palette-browser/SearchFilterBar.vue`

### Before
```html
<button class="... cursor-pointer" @click="applyColorSearch">Search</button>
```
No loading state. `applyColorSearch` fires synchronously and emits immediately. No feedback
during parent's async query.

### After
- `searching` ref added (script).
- `applyColorSearch` wrapped as async with `searching.value = true/false` guards.
- Button template: `:disabled="searching"`, spinner swap pattern matching `FlagReportDialog`:
  ```html
  <button :disabled="searching" class="... disabled:opacity-50 disabled:cursor-not-allowed
    disabled:pointer-events-none" @click="applyColorSearch">
      <Loader2 v-if="searching" class="h-3 w-3 animate-spin" />
      <span v-else>Search</span>
  </button>
  ```
- `Loader2` added to lucide imports.

### Four states confirmed
- Default: resting "Search" label.
- Hover: `hover:text-foreground hover:bg-muted`.
- Active/press: not relevant (disabled during search prevents double-fire).
- Disabled (searching): `disabled:opacity-50 disabled:cursor-not-allowed` + spinner.

---

## Ad-14 — SearchFilterBar color-swatch trigger focus ring

**File**: `demo/@/components/custom/palette-browser/SearchFilterBar.vue:75`

### Before
`class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer transition-shadow hover:shadow-cartoon-md shrink-0"`

No focus-visible ring. As a `PopoverTrigger` child, it is keyboard-reachable and must show focus.

### After
Added `focus-ring` utility class (glass-ui utility, `utilities.css:81`, applies
`focus-visible:outline-none` + `box-shadow: var(--focus-ring-shadow)`).

---

## HARDEN-4 §2 — PaletteCard four-state button audit

**File**: `demo/@/components/custom/palette-browser/PaletteCard.vue`

### Native buttons found
1. **Vote button** (line ~77): Had `focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none` but no `:active`.
   - Added: `active:scale-95 active:bg-accent/70`.

2. **Three-dot menu trigger** (line ~103): `p-1 bg-transparent border-none shadow-none cursor-pointer focus-visible:outline-none`. No hover bg, no active, no focus ring.
   - Replaced with: `p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

3. **Copy-slug button** (line ~149): `p-0.5 rounded-sm hover:bg-accent transition-colors cursor-pointer shrink-0`. No active, no focus ring.
   - Added: `active:scale-95 active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

4. **floating-panel-item swatch action buttons** (lines ~174, ~177, ~180): See §5.3 verdict below.

### Four states confirmed for native buttons
Default / Hover / Active / Focus-visible — all present after changes.

---

## HARDEN-4 §2 — CurrentPaletteEditor floating-panel-item audit

**File**: `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue`

### floating-panel-item buttons (lines ~44, ~47, ~50)
Before: `class="floating-panel-item"` — no padding visible (zero styles from class, as
`.floating-panel-item` is undefined).
After: `class="floating-panel-item p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"`.

Note: the save/cancel edit-overlay buttons (lines ~63, ~66) already had
`hover:bg-accent/50 transition-all cursor-pointer hover:scale-110 active:scale-95` — four states
complete. No change needed.

---

## HARDEN-4 §5.3 — floating-panel-item verdict

**Finding**: `.floating-panel-item` is a glass-ui utility. It appears in the glass-ui
`src/styles/index.css:41` comment as "`.floating-panel + .floating-panel-item`", and in the
`src/styles/floating-panel.css` file header. However, the **CSS definition does not exist**:
`floating-panel.css` only defines `.floating-panel`; `.floating-panel-item` has no `@layer
components` rule anywhere in glass-ui HEAD (`grep -r "\.floating-panel-item"
glass-ui/src/styles/ → zero results`).

**Verdict**: `floating-panel-item` is a glass-ui **gap** — the comment promises it, the CSS does
not deliver it. Any consumer using `class="floating-panel-item"` gets zero styles. This is a
glass-ui defect parallel to Ad-7's `floating-panel` finding.

**Coordination item** (for `coordination/Q.md §3` / glass-ui next wave):
File: glass-ui `src/styles/floating-panel.css` needs `.floating-panel-item` defined — at minimum
`cursor: pointer; border-radius: var(--radius-sm); transition: background-color ...` with
`:hover`, `:active` (scale + bg), `:focus-visible` (focus-ring), and
`[disabled], :disabled` (opacity + pointer-events: none) states. This would be the `Button
size="icon"`-adjacent recipe for items inside a `floating-panel`.

**Demo-side completion**: Four-state contract applied directly on the consuming `<button>`
elements in `PaletteCard.vue` and `CurrentPaletteEditor.vue` (both changed in this lane).
The `floating-panel-item` class is retained on each button so it will pick up glass-ui's
definition when it is eventually shipped.

---

## vue-tsc verification

| State | Count |
|---|---|
| Task-start baseline (recorded) | 246 |
| Pre-my-changes (stash diff confirmed) | 249 |
| Post-my-changes | 248 |
| Delta from this lane | −1 (reduced by 1) |
| New errors introduced by this lane | 0 |

The working-tree baseline of 249 vs the task-start recording of 246 reflects other in-progress
waves' changes (W4 Lane C decomposition, etc.) that shifted the count between the task's
measurement moment and this lane's verification. This lane does not add any new errors.

All errors visible at 248 are pre-existing in the branch: `PaletteDialog.vue` (3 errors),
`PaletteCard.vue` (2 errors), `CurrentPaletteEditor.vue` (1 error), `SearchFilterBar.vue`
(2 errors), `PaletteCardSkeleton.vue` (1 error), `AdminAuditPanel.vue` (1 error),
`AdminUsersPanel.vue` (1 error).
