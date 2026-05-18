# A.W3 — Admin lane proof document

Lane: admin. Files owned: `demo/@/components/custom/palette-browser/` —
`AdminListItem.vue`, `AdminUsersPanel.vue`, `AdminNamesPanel.vue`,
`AdminFlaggedPanel.vue`, `AdminAuditPanel.vue`, `AdminTagsPanel.vue`,
`AdminColorQueue.vue`, `AdminPaletteOps.vue`, `AdminAuthGate.vue`,
`AdminPanel.vue`, `VersionHistoryDrawer.vue`.

---

## Ag-13 — AdminListItem restructure (headline)

**Before.** `AdminListItem.vue` was a flat `flex items-center gap-3 px-3 py-2`
row. The `#content` slot had no structural opinion — panels stuffed two equal-size
`text-mono-small` lines into it with no vertical hierarchy. Swatch was unsized in
the primitive (w-6 h-6 set per-caller, no container).

**After.** `AdminListItem.vue` (`palette-browser/AdminListItem.vue`):

```html
<div class="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] border border-border">
    <div class="shrink-0 w-8 h-8 flex items-center justify-center">
        <slot name="swatch" />
    </div>
    <div class="flex-1 min-w-0 overflow-hidden flex flex-col gap-0.5">
        <slot name="content" />
    </div>
    <div class="flex items-center gap-1.5 shrink-0">
        <slot name="actions" />
    </div>
</div>
```

- Swatch slot wrapped in a fixed `w-8 h-8` container — callers size their
  swatch circle to `w-8 h-8` (up from `w-6 h-6`) to fill the anchor.
- Content slot wrapped in `flex flex-col gap-0.5` — enforces vertical stacking.
- Padding tightened to `py-2.5` (from `py-2`) for breathing room matching
  `AdminFlaggedPanel`'s header rows.
- All actions/expand/collapse behavior intact — primitive owns no behavior.

**Panels migrated** (content slot callers updated to primary/secondary
`text-small` / `text-caption text-muted-foreground`):

| Panel | File | Change |
|---|---|---|
| AdminNamesPanel | `AdminNamesPanel.vue:27-28,52-53` | `text-mono-small` × 2 → `text-small` (name, primary) + `text-caption text-muted-foreground` (css, secondary); swatch `w-6 h-6` → `w-8 h-8` |
| AdminColorQueue | `AdminColorQueue.vue:13-15` | same primary/secondary split; swatch `w-6 h-6` → `w-8 h-8`, added `border border-border` |
| AdminAuditPanel | `AdminAuditPanel.vue:43,47` | does not use `AdminListItem` (no swatch); action/timestamp row is primary; `text-mono-small text-muted-foreground` target → `text-caption text-muted-foreground` secondary |

**Panels already hierarchical (no `AdminListItem` slot change needed):**

- `AdminFlaggedPanel.vue` — already uses `text-subheading` (name, primary) /
  `text-mono-caption text-muted-foreground` (slug, secondary) per palette header.
  Flag details use `text-mono-small` / `text-mono-caption` — acceptable; already
  differentiated.
- `AdminTagsPanel.vue` — tag chips are uniform `text-mono-small` within a chip;
  category headers use `section-label text-muted-foreground`. No flat pair to
  split.
- `VersionHistoryDrawer.vue` — already uses `text-micro` throughout for the
  compact timeline entries; primary (v#) / secondary (name) are both `text-micro`
  but the badge and "(current)" annotation provide hierarchy. The Ag-1 `text-xs`
  instances (Revert button, Load more button) were resolved; see Ag-1 below.
- `AdminUsersPanel.vue` — user rows are a disclosure pattern (slug pill + count
  badge + action buttons), not a name/value pair. No `AdminListItem` usage here.
  Ag-11 slug-pill fix applied; see below.

---

## Ag-1 — φ type-scale mapping

Raw Tailwind sizes found and resolved in admin files:

| File | Location | Was | Now | Role |
|---|---|---|---|---|
| `AdminUsersPanel.vue` | toolbar buttons | `text-xs` | `text-caption` | caption (button label) |
| `AdminUsersPanel.vue` | action buttons | `text-xs` | `text-caption` | caption (button label) |
| `AdminFlaggedPanel.vue:59` | Dismiss button | `text-xs` | `text-caption` | caption (button label) |
| `VersionHistoryDrawer.vue:75` | Revert button | `text-xs` | `text-caption` | caption (button label) |
| `VersionHistoryDrawer.vue:88` | Load more button | `text-xs` | `text-caption` | caption (button label) |
| `AdminPaletteOps.vue:8` | slug Input | `text-base` | `text-mono-small` | mono input — exception: must stay monospace; `fira-code` family set; `text-body` carries serif, so `text-mono-small` used instead |
| `AdminAuthGate.vue:11` | password Input | `text-base` | `text-mono-small` | same as above |

`AdminTagsPanel.vue`, `AdminAuditPanel.vue`, `AdminPanel.vue` — no raw Tailwind
text sizes found; already on φ utilities.

---

## Ag-10 — `font-normal` on headings

No `font-normal` found in any of the 11 admin files. The finding in the research
doc is concentrated in `ColorNutritionLabel.vue` and `ColorComponentDisplay.vue`
(both outside this lane). Admin lane: no action needed.

---

## Ag-11 — `.slug-pill` class adoption

`style.css:221` defines `.slug-pill` (`@apply text-mono-small font-bold px-2
py-0.5 rounded-full border`). `AdminUsersPanel.vue` had two copy-pasted clusters:

- `AdminUsersPanel.vue:59` (user header row slug) — `text-mono-small font-bold
  px-2 py-0.5 rounded-full border truncate` → `slug-pill truncate` (`:style`
  `color`/`borderColor` preserved).
- `AdminUsersPanel.vue:123` (confirm dialog slug) — `text-mono-small font-bold
  px-2 py-0.5 rounded-full border inline-block align-middle mx-0.5` →
  `slug-pill inline-block align-middle mx-0.5` (`:style` preserved).

---

## Ag-12 — `underline-tabs` normalization in AdminNamesPanel

**Change.** `AdminNamesPanel.vue:2` — removed `underline-tabs` class and the
`:style="{ '--active-tab-color': cssColorOpaque }"` binding from the `Tabs` root.
The `TabsList` filled-pill treatment (glass-ui default) is now the sole tab style
in AdminNamesPanel. Count indicators converted from bare `<span class="text-mono-small font-normal">` to `<Badge variant="secondary" class="text-mono-small">`.

**Residual consumer check — `grep 'underline-tabs' demo/`:**

```
demo/@/styles/style.css:164        → definition (stays)
demo/@/components/custom/palette-browser/PaletteDialog.vue:27  → non-admin consumer
```

`PaletteDialog.vue:27` is the top-level palette browser's `Tabs` root — it uses
`underline-tabs` for the primary Saved / Browse / Admin tab strip, with
`:style="{ '--active-tab-color': safeAccent }"`. This consumer is outside the
admin lane (not in the 11 files) and is the correct domain for the underline
treatment (the whole-dialog navigation). The `.underline-tabs` class in
`style.css` is retained — one non-admin consumer remains.

---

## vue-tsc verification

Baseline (before any edits): **246 `error TS`** lines.
After all changes: **246 `error TS`** lines — no regression.

Command: `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'`
