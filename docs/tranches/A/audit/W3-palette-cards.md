# W3 — Palette-Cards Lane Proof

Lane: `palette-browser/` (14 files)
Findings applied: Ac-1, Ac-7, Ac-8, Ac-12
vue-tsc error count: **246** (at or within limit; baseline was 246)

---

## Per-file changes

### PaletteCard.vue

**Ac-8** — card surface radius  
- line 4: `rounded-[var(--radius-card)]` → `rounded-card`

**No changes for Ac-1, Ac-7, Ac-12**:
- Ac-1: `text-subheading`, `text-micro`, `text-mono-small`, `fira-code` already in use — no raw Tailwind text sizes present.
- Ac-7: no hand-rolled `box-shadow` literals in this file.
- Ac-12: `Badge variant="secondary" class="text-mono-small"` at line 36 (color count) already correct — kept.

---

### PaletteCardGrid.vue

**Ac-1** — empty-state text  
- line 6: `text-base` → `text-mono-small`  
  Reason: text is already in `fira-code` family (mono face); `text-body` / `text-small` would impose the serif body cascade. `text-mono-small` preserves mono family and maps the body-size role to the φ mono rung.

---

### PaletteCardMenu.vue

**Ac-1** — container classes  
- line 2 (`DropdownMenuContent`): `text-sm` → `text-small`
- line 77 (`DropdownMenuSubContent`): `text-xs` → `text-caption`

**Ac-12** — dropdown-item normalization  
All `DropdownMenuItem` and `DropdownMenuSubTrigger` elements normalized to `gap-2 cursor-pointer`.  
Icon `mr-2` margin removed (superseded by `gap-2` on the item).  
Items with existing classes (destructive, muted) had `gap-2 cursor-pointer` merged in.

**Exception — version count inline span (line 66)**  
`<span class="ml-auto text-caption text-muted-foreground">{{ palette.versionCount }}</span>`  
This count sits in a `DropdownMenuItem` sidebar slot, not beside a heading. Ac-12 binding ("count beside a label/heading") does not apply to sidebar counts inside menu items. Kept as `text-caption` span; documented.

---

### PaletteCardSkeleton.vue

**Ac-8** — radii  
- line 2: `rounded-[var(--radius-card)]` → `rounded-card` (card surface)
- line 22: `rounded-xl` → `rounded-badge` (skeleton swatch chips — pill/badge role)

---

### PaletteColorStrip.vue

No raw Tailwind text sizes, no hand-rolled shadows, no raw radii on role-bearing surfaces. No changes.

---

### PaletteDialog.vue

**Ac-8** — dialog surface radius  
- line 5 (`DialogScrollContent`): `rounded-[var(--radius-dialog)]` → `rounded-dialog`

**Ac-7 skip**: `box-shadow: var(--shadow-modal), 0 0 0 1px var(--border)` in scoped CSS (lines 611, 617) already routes through `--shadow-modal`. This fix landed in W2 (Ab-2). Not re-touched.

---

### PaletteDialogHeader.vue

**Ac-1** — dialog title at display register  
- line 28: `text-3xl sm:text-5xl` → `text-title sm:text-display-2`  
  `text-3xl` maps to `text-title`; `text-5xl` maps to `text-display-2` per W3-conventions table.  
  `font-black tracking-tight` retained — these are intentional weight/tracking overrides on a display heading.

---

### PaletteSavedTab.vue

**Ac-12** — count indicator  
- lines 22–24: bare `<span class="text-mono-small text-muted-foreground">{{ savedPalettes.length }} palette…</span>` → `<Badge variant="secondary" class="text-mono-small">{{ savedPalettes.length }} palette…</Badge>`  
  Added `Badge` import from `@components/ui/badge`.

---

### PaletteBrowseTab.vue

**Ac-1** — loading indicator text  
- line 56: `text-xs` → `text-caption` (small caption role on "Loading more…" label)

---

### MigratePalettesDialog.vue

**Ac-8** — dialog surface radius  
- line 3 (`DialogContent`): `rounded-[var(--radius-dialog)]` → `rounded-dialog`

---

### FlagReportDialog.vue

**Ac-8**: `DialogContent` has no explicit `rounded-*` (inherits from shadcn component default). No role-bearing raw radius in template. No change.  
`rounded-[var(--radius-input)]` on the `<textarea>` at line 28 already uses the semantic input token. No change.

---

### EmptyState.vue

No raw Tailwind text sizes (`text-mono-small` used), no shadows, no radii. No changes.

---

### SwatchHoverMenu.vue

No raw Tailwind text sizes, no shadows, no radii on role-bearing surfaces. No changes.

---

### PaginationBar.vue

**Ac-1** — page indicator text  
- line 15: `text-xs` → `text-caption` (small pagination label — caption role)

---

## Ac-7 audit

Scoped `<style>` blocks across all 14 files searched for hand-rolled `box-shadow` literals:
- `PaletteDialog.vue` — `box-shadow: var(--shadow-modal)…` — already token-routed (W2 Ab-2). Skipped.
- All other files: no `box-shadow` literals in scoped CSS.

No new shadow routing required.

---

## Documented exceptions

| File | Element | Reason |
|---|---|---|
| PaletteCardMenu.vue:66 | `<span>` version count in dropdown item | Count in a menu sidebar slot, not beside a heading; Ac-12 Badge rule applies to heading-level counts only |
| PaletteDialogHeader.vue:28 | `font-black tracking-tight` retained on φ heading | Intentional display typography identity; φ utility sets size+leading, weight/tracking stay explicit |

---

## vue-tsc verification

```
$ npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
246
```

Within the ≤ 246 limit.
