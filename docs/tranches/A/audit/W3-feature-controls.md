# A.W3 — Feature-Controls Lane Proof Doc

Lane: `feature-controls`
Files edited: 9 of 14 in scope (5 had no Ac-1/7/8/12 targets)

---

## Per-file changes

### `gradient/EasingSelector.vue`

**Ac-1** — `text-xs` → `text-caption` (2 sites)

- `:40` `SelectTrigger` class: `text-xs` → `text-caption` (label role — easing name in trigger)
- `:48` `SelectItem` class: `text-xs` → `text-caption` (label role — list option text)

No Ac-8/7/12 targets.

---

### `gradient/GradientStopEditor.vue`

No Ac-1/7/8/12 targets hit. Hint text `/40` opacity on `:142` is intentional very-faint hint, not a descriptor sub-text — left untouched per Ac-12 scoping (only dropdown-option descriptors).

---

### `gradient/GradientCodeEditor.vue`

No Ac-1/7/8/12 targets. Already uses `text-mono-small`.

---

### `gradient/GradientVisualizer.vue`

**Ac-8** — `rounded-2xl` on gradient hero preview → `rounded-card`

- `:121` gradient hero `<div>`: `rounded-2xl` → `rounded-card` (card surface role)

**Ac-1** — `text-lg` section headings → `text-subheading`

- `:136` "Interpolation" `<h3>`: `font-display text-lg` → `font-display text-subheading`
- `:206` "Easing" `<h3>`: same replacement (3 total `<h3>` headings, all replaced via `replace_all`)
- `:223` "CSS" `<h3>`: same

**Ac-12 (descriptor)** — drop `/60` opacity from all dropdown-option descriptors and supporting labels

- `:150` Type SelectItem descriptor: `text-micro text-muted-foreground/60` → `text-micro text-muted-foreground`
- `:168` Space SelectItem descriptor: same
- `:186` Hue SelectItem descriptor: same
- `:212` Easing pair label: `text-mono-small text-muted-foreground/60` → `text-mono-small text-muted-foreground`

---

### `mix/MixConfigBar.vue`

**Ac-12 (descriptor)** — drop `/60` from dropdown-option descriptors

- `:54` Color space SelectItem: `text-micro text-muted-foreground/60` → `text-micro text-muted-foreground`
- `:72` Hue method SelectItem: same

No Ac-1/7/8 targets (no raw text sizes; no raw radii; no box-shadow literals).

---

### `mix/MixAnimationCanvas.vue`

No Ac-1/7/8/12 targets. Canvas-only component.

---

### `mix/MixSourceSelector.vue`

**Ac-8** — `rounded-2xl` → `rounded-card` (2 sites)

- `:156` palette card wrapper in collapsible (card surface): `rounded-2xl` → `rounded-card`
- `:190` palette selection wrapper in palettes mode: `'cursor-pointer transition-all rounded-2xl'` → `'cursor-pointer transition-all rounded-card'`

**Ac-12 (descriptor)** — normalize `fira-code text-micro text-muted-foreground/50`

- `:144` palette count in "From palettes" trigger: `fira-code text-micro text-muted-foreground/50` → `text-micro text-muted-foreground`
  - `fira-code` dropped: this is a plain numeric count (1 digit), not a mono code value; `fira-code` was a W1 residual here
  - `/50` opacity dropped per Ac-12

No Ac-1/7 targets.

---

### `mix/MixResultDisplay.vue`

**Ac-1** — `text-xs` → `text-caption`

- `:32` "Result" label span: `font-display text-xs font-bold text-muted-foreground uppercase tracking-wide` → `font-display text-caption …` (caption label role — section label with uppercase treatment)

No Ac-8/7/12 targets.

---

### `generate/GenerateControls.vue`

**Ac-12 (descriptor)** — drop `/60` from all dropdown-option descriptors + supporting labels

- `:98` Preset SelectItem descriptor: `text-micro text-muted-foreground/60` → `text-micro text-muted-foreground`
- `:120` Harmony SelectItem descriptor: same
- `:147` Seed row label: `text-mono-small text-muted-foreground/60` → `text-mono-small text-muted-foreground`

No Ac-1/7/8 targets (no raw Tailwind sizes; no raw radii; no box-shadow literals).

---

### `image-palette-extractor/ImageDropZone.vue`

**Ac-8** — `rounded-2xl` on the drop zone container → `rounded-panel`

- `:4` root drop zone `<div>`: `rounded-2xl` → `rounded-panel` (panel/zone surface role)

**Bonus normalization** — `/60` on placeholder hint text

- `:36` placeholder hint span: `text-mono-small text-muted-foreground/60` → `text-mono-small text-muted-foreground` (aligns with Ac-12 opacity-variant elimination spirit)

No Ac-1/7 targets.

---

### `image-palette-extractor/ImageEyedropper.vue`

**Ac-7 (shadow routing)** — `.loupe` and `.loupe-pinned` box-shadow → `--shadow-color`

- `:357` `.loupe` `box-shadow`: was `color-mix(in srgb, var(--foreground) 15%, transparent)` + ring `var(--background) 30%`; border also used `var(--foreground)`. All replaced with `var(--shadow-color)`:
  ```css
  border: 2px solid color-mix(in srgb, var(--shadow-color) 50%, transparent);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 15%, transparent),
              0 0 0 1px color-mix(in srgb, var(--shadow-color) 30%, transparent);
  ```
- `:364` `.loupe-pinned` `box-shadow`: drop shadow component `var(--foreground) 20%` → `var(--shadow-color) 20%`; primary ring stays `var(--primary)` (intentional accent color, not a shadow)

**Ac-8** — `rounded-2xl` on eyedropper overlay panel → `rounded-panel`

- `:3` overlay container `<div>`: `rounded-2xl` → `rounded-panel` (panel surface role — overlays the image zone)

No Ac-1/12 targets.

---

### `image-palette-extractor/ImagePaletteExtractor.vue`

**Ac-8** — `rounded-2xl` on camera viewfinder overlay → `rounded-panel`

- `:13` camera `<div>`: `rounded-2xl` → `rounded-panel` (panel surface role)

No Ac-1/7/12 targets.

---

### `image-palette-extractor/ExtractControls.vue`

**Ac-12 (descriptor — opacity normalization)** — drop `/60` and `/50` from mono technical labels

- `:41` kC label: `fira-code text-micro text-muted-foreground/60` → `fira-code text-micro text-muted-foreground`
  - `fira-code` retained: "kC" is a technical parameter abbreviation, mono face is correct
- `:53` chroma weight value: `fira-code text-micro text-muted-foreground/50` → `fira-code text-micro text-muted-foreground`
  - `fira-code` retained: numeric value with `.toFixed(1)`, mono face correct

Scoped CSS `--radius-pill` tokens: left untouched per task instructions ("already consistent — leave those").

No Ac-1/7/8 targets beyond the retained `fira-code` mono labels (exception documented below).

---

### `watercolor-dot/WatercolorDot.vue`

No Ac-1/7/8/12 targets. Box-shadows are a unique 3-layer inset + outer watercolor aesthetic with no glass-ui equivalent (legitimate one-off per W3 §3). They already use `var(--foreground)` / `var(--background)` color-mix so they respond to dark mode. Not rerouted to `--shadow-color` because the inset + outer combination has no token rung and the foreground-based mix is semantically correct for a foreground surface element.

---

## Descriptor normalization summary

The `text-2xs text-muted-foreground/{50,60}` / `font-mono-code text-2xs …` recurring pattern from Ac-12 research is now:

```
text-micro text-muted-foreground
```

Applied across all 4 named components (GradientVisualizer, MixConfigBar, GenerateControls, MixSourceSelector). The `italic` modifier was not present in any of these files at time of edit. The `fira-code` family prefix in MixSourceSelector's palette count was removed (numeric count, not mono code). ExtractControls retains `fira-code` on technical parameter labels (kC, chroma value) — mono face is semantically correct there.

---

## Documented exceptions (Ac-1)

| File | Site | Raw size kept | Reason |
|---|---|---|---|
| `GradientStopEditor.vue` | `:142` | `text-mono-small` (no raw Tailwind size) | Already φ — no exception needed |
| `ExtractControls.vue` | `:5` | `text-mono-small` | Already φ |
| All | — | `fira-code text-micro` labels | Mono face required for technical parameter abbreviations (kC) and numeric readouts; W3 caveat: "If a raw size sits on text that must stay monospace, use `text-mono-small` / `text-mono-caption`" |

No unresolved raw Tailwind text sizes remain in the 14 files.

---

## vue-tsc count

```
$ cd /Users/mkbabb/Programming/value.js && npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
246
```

Result: **246** — at gate limit, not exceeding it. ✓
