# W1 CSS Class Resolution Audit

Wave W1, Lane B — fixes for three undefined CSS utility classes and one wrong radius token.

---

## 1. `font-mono-code` → `fira-code`

| | |
|---|---|
| **Before** | `font-mono-code` (undefined — resolves to body font) |
| **After** | `fira-code` (defined in `demo/@/styles/utils.css:9` as `.fira-code { font-family: var(--font-mono); }`) |
| **Occurrences** | 14 files (see table below) |
| **Verification** | `grep -rln font-mono-code demo/` → no output |

Files edited (all via global `s/font-mono-code/fira-code/g`):

| File | Matching lines (before) |
|------|------------------------|
| `demo/@/components/custom/mix/MixSourceSelector.vue` | 144, 162 |
| `demo/@/components/custom/image-palette-extractor/ExtractControls.vue` | 49, 75 |
| `demo/@/components/custom/color-picker/controls/ComponentSliders.vue` | 27, 85 |
| `demo/@/components/custom/color-picker/controls/ColorInput.vue` | 15 |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue` | 12, 16, 22 |
| `demo/@/components/custom/color-picker/display/ColorComponentDisplay.vue` | 8, 11 |
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue` | 6 |
| `demo/@/components/custom/palette-browser/AdminPaletteOps.vue` | 8 |
| `demo/@/components/custom/palette-browser/AdminAuthGate.vue` | 11 |
| `demo/@/components/custom/palette-browser/PaletteCardGrid.vue` | 6 |
| `demo/@/components/custom/palette-browser/ActionFeedback.vue` | 6 |
| `demo/@/components/custom/palette-browser/SearchFilterBar.vue` | 86 |
| `demo/@/components/custom/palette-browser/MiniColorPicker.vue` | 44 |
| `demo/@/components/custom/palette-browser/PaletteCard.vue` | 56, 66 |

---

## 2. `text-2xs` → `text-micro`

| | |
|---|---|
| **Before** | `text-2xs` (undefined — resolves to nothing) |
| **After** | `text-micro` (defined in `node_modules/@mkbabb/glass-ui/src/styles/typography.css:456` via `@utility text-micro`; themed via `--text-micro: var(--type-micro)` at `theme.css:14`) |
| **Path taken** | glass-ui defines `text-micro` — used directly |
| **Occurrences** | 7 files (see table below) |
| **Verification** | `grep -rln text-2xs demo/` → no output |

Files edited (all via global `s/text-2xs/text-micro/g`):

| File | Matching lines (before) |
|------|------------------------|
| `demo/@/components/custom/gradient/GradientVisualizer.vue` | 150, 168, 186 |
| `demo/@/components/custom/mix/MixSourceSelector.vue` | 144, 162 |
| `demo/@/components/custom/mix/MixConfigBar.vue` | 54, 72 |
| `demo/@/components/custom/image-palette-extractor/ExtractControls.vue` | 49, 75 |
| `demo/@/components/custom/generate/GenerateControls.vue` | 98, 120 |
| `demo/@/components/custom/dock/menus/ProfileSection.vue` | 109 |
| `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue` | 79 |

---

## 3. `text-pane-description` → `text-caption text-muted-foreground`

| | |
|---|---|
| **Before** | `text-pane-description` (undefined — resolves to nothing) |
| **After** | `text-caption text-muted-foreground` |
| **Rationale** | `text-caption` confirmed in `node_modules/@mkbabb/glass-ui/src/styles/typography.css:445` (`@utility text-caption`) and themed via `--text-caption: var(--type-caption)` at `theme.css:15`. `text-muted-foreground` provides the intended low-contrast description style. |
| **File** | `demo/@/components/custom/panes/PaneHeader.vue:5` |
| **Propagation** | PaneHeader is a shared component — fix applies to all pane consumers |
| **Verification** | `grep -rln text-pane-description demo/` → no output |

---

## 4. ColorInput.vue — input radius fix

| | |
|---|---|
| **Before** | `rounded-2xl` (card-level radius, ~1rem) on contenteditable input at `ColorInput.vue:15` |
| **After** | `rounded-[var(--radius-input)]` (input-specific token from `node_modules/@mkbabb/glass-ui/src/styles/tokens.css:184`) |
| **File** | `demo/@/components/custom/color-picker/controls/ColorInput.vue:15` |
| **Scope** | Only the `<span contenteditable ...>` element; no other `rounded-*` classes in the file were touched |

---

## vue-tsc verification

```
npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
246
```

Pre-existing baseline: 246. Post-fix: 246. No regression.

---

## Glass-ui gaps recorded

None. Both `text-micro` and `text-caption` exist in glass-ui. The `--radius-input` token exists at `tokens.css:184`. No fallback to Tailwind was needed.
