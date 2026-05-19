# A.W3 color-picker lane — proof doc

Scope: `demo/@/components/custom/color-picker/` — 12 files.
Findings applied: Ac-1 (φ type scale), Ac-8 (radius aliases), Ac-9 (ColorNutritionLabel hierarchy), Ac-10 (`font-normal` audit), Ac-7 (shadow routing).

---

## ColorPicker.vue

### Ac-8 — radius
| Location | Before | After | Reason |
|---|---|---|---|
| `:3` Card surface | `rounded-2xl` | `rounded-card` | Card surface → `--radius-card` semantic alias |

---

## controls/ComponentSliders.vue

### Ac-1 — type scale
| Location | Before | After | Reason |
|---|---|---|---|
| `:18` GlassCarouselItem label | `text-lg` | `text-subheading` | Component-axis label acts as a heading register |
| `:26` TooltipContent title | `text-sm` | `text-small` | Secondary body heading in tooltip |
| `:27` range string (fira-code) | `text-xs` | `text-mono-caption` | Monospace range value — mono context, use `text-mono-caption` not `text-caption` |
| `:40` range span below slider | `text-xs` | `text-caption` | Small label/caption role |

**No `font-normal` changes**: the `font-normal` at `:40` is on a plain `<span>` (not a heading), so it does not cancel heading weight — no action per Ac-10 rule.

---

## controls/ActionButton.vue

No raw Tailwind text sizes, no raw radii, no shadow literals found. Already uses `text-subheading` and `text-small`. No changes.

---

## controls/SpectrumCanvas.vue

### Ac-7 — shadow
SpectrumCanvas shadow was fixed in W2 (Ab-19). The scoped CSS already uses `color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black)` for the hover cartoon offset, and `var(--shadow-sm)` for the dot. No further action per W3 instructions ("SpectrumCanvas shadow was already fixed in W2 — skip it").

---

## controls/ColorInput.vue

### Ac-1 — type scale
| Location | Before | After | Reason |
|---|---|---|---|
| `:88` HoverCard heading "Enter a color" | `text-lg` | `text-subheading` | Section heading role in hover card |

**Exception — `.error-badge` `@apply text-xs` (`:329`)**: the `.error-badge` rule already sets `font-family: var(--font-sans)` to keep the badge sans-serif. Replacing `text-xs` with `text-caption` (which carries `font-family: var(--font-serif)`) would require a second override and add complexity. Left as `text-xs` with this documented reason: sans-override context, no semantic heading role.

**Input radius**: already `rounded-[var(--radius-input)]` — Ac-8 P1 bug was pre-fixed.

---

## controls/ActionToolbar.vue

No raw Tailwind text sizes, no raw radii, no shadow literals. No changes.

---

## editing/EditDrawer.vue

### Ac-1 — type scale
| Location | Before | After | Reason |
|---|---|---|---|
| `:12` arrow separator `→` | `text-xs` | `text-caption` | Decorative separator/caption role |

### Ac-8 — radius
| Location | Before | After | Reason |
|---|---|---|---|
| `:24` Check icon button | `rounded-sm` | `rounded-button` | Interactive icon button → `--radius-button` |
| `:35` Undo2 icon button | `rounded-sm` | `rounded-button` | Interactive icon button → `--radius-button` |

### Ac-7 — shadow
No `box-shadow` literals found in EditDrawer's scoped CSS. The box-shadow noted in the research doc at line 82 (`4px 0 24px -4px color-mix(...)`) was either removed in W2 or refers to an older revision. Current file has no shadow declarations. No action needed.

---

## visual/HeroBlob.vue

No raw Tailwind text sizes, no raw radii, no shadow literals. `fira-code` on TooltipContent is correct (mono context). No changes.

---

## visual/PointerDebugOverlay.vue

No Tailwind class-based text sizes (all styling is in scoped CSS using raw `font-size: 10px` / `9px` / `14px`). These are dev-only debug panel internals intentionally using absolute pixel sizes for density — legitimate exception (debug overlay, not user-facing UI). No changes.

---

## display/ColorSpaceSelector.vue

### Ac-1 — type scale
| Location | Before | After | Reason |
|---|---|---|---|
| `:17` SelectTrigger (color space name) | `text-3xl sm:text-4xl` | `text-title sm:text-display` | Display-tier poster heading; φ display utilities are thin by design |
| `:24` SelectItem (list items) | `text-lg` | `text-prose` | Body/lead register for list items |

---

## display/ColorComponentDisplay.vue

### Ac-10 — `font-normal` / display tier
| Location | Before | After | Reason |
|---|---|---|---|
| `:3` CardTitle container | `text-4xl … font-normal` | `text-display` (no `font-normal`) | Deliberate thin-large poster numeral → φ `text-display` (weight-300/400 by design) |
| `:15` value `<span>` | `'font-normal focus-visible:outline-none'` | `'focus-visible:outline-none'` | `font-normal` cancelled heading weight needlessly; `text-display` inherited from parent |
| `:27` unit `<span>` | `font-normal italic text-lg` | `italic text-prose` | `font-normal` cancelled weight; `text-lg` → `text-prose` (lead body role) |
| `:29` comma `<span>` | `inline font-normal` | `inline` | `font-normal` noise on inline punctuation |

---

## display/ColorNutritionLabel.vue

### Ac-9 — hierarchy rebuild

All five section headings (`<h2 class="text-2xl … font-normal">`) rebuilt as `text-subheading` (φ rung, weight 600, no `font-normal` override needed). Component-name emphasis (`text-lg font-normal`) → `text-body`. Body grids (`text-sm`) → `text-small`. `font-normal` on body `<div>` children of `font-display` container (10 instances) dropped — `font-display` sets family only, no weight, so `font-normal` was pure noise.

| Location | Before | After |
|---|---|---|
| `:13` "Basic Information" h2 | `text-2xl mb-2 font-normal` | `text-subheading mb-2` |
| `:16` basic-info grid | `text-sm` | `text-small` |
| `:18,20,24,26,28` body divs | `font-normal` (×5) | removed |
| `:35` "Components" h2 | `text-2xl mb-2 font-normal` | `text-subheading mb-2` |
| `:38` components grid | `text-sm` | `text-small` |
| `:46` component-name div | `text-lg font-normal` | `text-body` |
| `:52` "to" span | `font-normal italic` | `italic` |
| `:62` "Key Properties" h2 | `text-2xl mb-2 font-normal` | `text-subheading mb-2` |
| `:65` key-props grid | `text-sm` | `text-small` |
| `:67,71,75` body divs | `font-normal` (×3) | removed |
| `:84` "Conversion Graph" h2 | `text-2xl font-normal` | `text-subheading` |
| `:121` TooltipContent | `text-sm` | `text-small` |
| `:131` "Usage" h2 | `text-2xl mb-2 font-normal` | `text-subheading mb-2` |
| `:132` usage div | `text-sm` | `text-small` |
| `:135,141` body spans | `font-normal` (×2) | removed |

### Ac-8 — radius
| Location | Before | After | Reason |
|---|---|---|---|
| `:3` Alert (definition card) | `rounded-2xl` | `rounded-card` | Card-surface role |
| `:96` conversion graph chips | `rounded-2xl` | `rounded-panel` | Embedded panel/chip surfaces within a section |

---

## Documented exceptions

| File | Location | Raw class kept | Reason |
|---|---|---|---|
| `controls/ColorInput.vue` | `:329` `.error-badge` | `@apply text-xs` | Error badge uses `font-family: var(--font-sans)` override; `text-caption` carries serif by default which would conflict; sans-context badge, no heading role |
| `visual/PointerDebugOverlay.vue` | all CSS | raw `font-size: 10px/9px/14px` | Dev-only debug overlay; absolute pixel density intentional; not user-facing UI |
| `controls/ComponentSliders.vue` | `:40` | `font-normal` retained | On a plain `<span>`, not a heading — does not cancel heading weight per Ac-10 rule |

---

## vue-tsc verification

```
Before: 246 errors
After:  246 errors
Delta:  0 (no regressions)
```

Command: `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'`
