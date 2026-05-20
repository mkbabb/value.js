# A.W3 — dock-panes lane proof

Files in scope (19): Dock.vue, ActionBarLayer.vue, SlugEditLayer.vue, GenericActionBar.vue, ProfileSection.vue, MobileMenuDropdown.vue, AuroraPane.vue, BrowsePane.vue, PaneSearchBar.vue, GradientPane.vue, ExtractPane.vue, AdminPane.vue, BlobPane.vue, PaneHeader.vue, PaneSegmentedControl.vue, MixPane.vue, GeneratePane.vue, AboutPane.vue, PalettesPane.vue.

vue-tsc error count: **246** (baseline 246 — no regressions).

---

## Ac-1 — φ type-scale mapping

### Changes applied

| File | Line | Before | After | Role |
|---|---|---|---|---|
| `Dock.vue` | 185 | `text-xs` | `text-caption` | separator arrow glyph, caption register |
| `AuroraPane.vue` | 23 | `text-sm` | `text-small` | body status message |
| `AuroraPane.vue` | 27 | `text-xs` | `text-caption` | sub-caption descriptor |
| `AboutPane.vue` | 27 | `text-4xl` | `text-title` | "Detailed Guide" section heading |
| `ProfileSection.vue` | 98 | `text-xs font-mono` | `text-mono-caption` | @mbabb trigger button, mono label |
| `ProfileSection.vue` | 108 | `font-mono text-sm` | `text-mono-small` | @mbabb link, mono register |
| `MobileMenuDropdown.vue` | 78 | `font-mono text-sm` | `text-mono-small` | @mbabb link, mono register |

### Documented exceptions

- **`Dock.vue:385` — `text-base font-display`** (collapsed dock label). `text-body` carries `font-family: var(--font-serif)` which would conflict with the explicit `font-display` family on this label. Raw `text-base` retained; no φ body utility applies to a display-font label. Exception: sans/display font context, not serif-body context.

### Files with no raw Tailwind sizes

ActionBarLayer.vue, SlugEditLayer.vue, GenericActionBar.vue, BrowsePane.vue, PaneSearchBar.vue, GradientPane.vue, ExtractPane.vue, BlobPane.vue, PaneHeader.vue, PaneSegmentedControl.vue, MixPane.vue, GeneratePane.vue, PalettesPane.vue — zero `text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl` occurrences.

---

## Ac-8 — Border-radius semantic aliases

No raw role-bearing radii (`rounded-2xl`, `rounded-xl`, `rounded-md`, `rounded-lg`, `rounded-sm`) appear in any of the 19 files in scope. All pill elements already use `rounded-full`; the scoped CSS in BlobPane.vue uses no radius utilities. No changes required.

---

## Ac-11 — `.slug-pill` adoption

`style.css:221–222` defines `.slug-pill` (`@apply text-mono-small font-bold px-2 py-0.5 rounded-full border`).

### MobileMenuDropdown.vue

| Line (before) | Instance | Treatment |
|---|---|---|
| 42 | user slug label | `class="slug-pill whitespace-nowrap"` + `:style` color/borderColor kept |
| 61 | admin badge | `class="slug-pill cursor-default text-muted-foreground whitespace-nowrap"` + `style` muted-foreground color/border |

Both instances previously read `text-mono-small font-bold px-2 py-0.5 rounded-full border whitespace-nowrap` inline. Now use `.slug-pill`, per-instance `:style` color/border-color retained as specified.

### ProfileSection.vue

| Line (before) | Instance | Treatment |
|---|---|---|
| 52 | user slug label inside menu | `class="slug-pill whitespace-nowrap"` + `:style` kept |
| 75 | admin gold pill | `class="slug-pill cursor-default whitespace-nowrap gold-shimmer"` + `style` gold color/border |

Note: the Profile trigger button (`class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-0.5 rounded-full border ..."`) is a `<button>` with `px-3` (wider horizontal padding) and icon+text layout — this is a distinct trigger variant, not the data-display pill. Left as-is rather than forcing `.slug-pill` (which uses `px-2`). The two label/badge instances above are the copy-pasted slug-pill clusters.

---

## Ac-12 — DropdownMenuItem consistency + count indicators

### DropdownMenuItem normalization

All `DropdownMenuItem` elements in both files normalized to `text-small gap-2 cursor-pointer` (replacing `text-sm`):

**MobileMenuDropdown.vue** — 7 items updated (lines 46, 49, 52, 55, 65, 82, 86, 92).
**ProfileSection.vue** — 6 items updated (lines 56, 59, 62, 66, 113, 117, 123).

The `text-muted-foreground` modifier on the "Regenerate slug" item is preserved in both files.

### Count indicator → Badge

| File | Before | After |
|---|---|---|
| `AdminPane.vue:5` | `<span class="text-mono-small font-normal text-muted-foreground ml-2">{{ adminCount }}</span>` | `<Badge variant="secondary" class="text-mono-small ml-2">{{ adminCount }}</Badge>` |
| `PalettesPane.vue:5` | `<span class="text-mono-small font-normal text-muted-foreground ml-2">{{ pm.savedPalettes.value.length }}</span>` | `<Badge variant="secondary" class="text-mono-small ml-2">{{ pm.savedPalettes.value.length }}</Badge>` |

`Badge` imported from `@components/ui/badge` (which re-exports from `@mkbabb/glass-ui`) in both files.

The `<span class="text-mono-small text-muted-foreground">N palette(s)</span>` at `PalettesPane.vue:32` is a standalone toolbar label (not a heading count indicator) — retained as-is.

---

## Files with no changes

- ActionBarLayer.vue — no raw sizes, no slug-pills, no dropdown items in scope
- SlugEditLayer.vue — no raw sizes, no slug-pills
- GenericActionBar.vue — no raw sizes
- BrowsePane.vue — no raw sizes (uses `text-mono-small` throughout)
- PaneSearchBar.vue — trivial wrapper, no text classes
- GradientPane.vue — no raw sizes
- ExtractPane.vue — no raw sizes
- BlobPane.vue — no raw sizes (uses scoped CSS with `var(--type-small)` directly)
- PaneHeader.vue — already uses `text-heading` and `text-caption text-muted-foreground` (correct)
- PaneSegmentedControl.vue — no text classes (defers to BouncyTabs)
- MixPane.vue — no raw sizes (uses `text-mono-small`)
- GeneratePane.vue — no raw sizes
