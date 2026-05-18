# W1 · Card wash-pane migration — proof audit

Tranche A · Wave W1 · Lane A1  
Date: 2026-05-18  
Branch: w.w2.1-value-js-prebuild

## Problem

`Card` in `@mkbabb/glass-ui` exposes `tier` / `shadow` / `grain` props; it has **no** `variant` prop.  
The stale `variant="pane"` was silently swallowed into `$attrs`, leaving every scroll-pane host
rendering as `tier="resting"` (dark drop-shadow, noise grain) — wrong for overflow-scrolling containers.

Correct target: `tier="wash" :shadow="false" :grain="false"`.

---

## Per-file changes

### 1. `demo/@/components/custom/panes/GradientPane.vue:20`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 2. `demo/@/components/custom/panes/BrowsePane.vue:2`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 3. `demo/@/components/custom/panes/BlobPane.vue:102`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
```

---

### 4. `demo/@/components/custom/panes/AuroraPane.vue:17`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
```

---

### 5. `demo/@/components/custom/panes/AdminPane.vue:2`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 6. `demo/@/components/custom/panes/MixPane.vue:61`

**Before**
```html
<Card variant="pane" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 7. `demo/@/components/custom/panes/GeneratePane.vue:32`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 8. `demo/@/components/custom/panes/ExtractPane.vue:3`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 9. `demo/@/components/custom/panes/PalettesPane.vue:2`

**Before**
```html
<Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```
**After**
```html
<Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

---

### 10. `demo/@/components/custom/panes/AboutPane.vue:2-5`

Multi-line `<Card>` tag; `variant="pane"` was on its own line (line 3).

**Before**
```html
<Card
    variant="pane"
    class="about-card pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full"
>
```
**After**
```html
<Card
    tier="wash"
    :shadow="false"
    :grain="false"
    class="about-card pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full"
>
```

---

## Verification

### grep — must return zero matches

```
$ grep -rln 'variant="pane"' demo/@/components/custom/panes/
(no output — exit 1, zero matches)
```

### vue-tsc — no new errors in migrated files

```
$ npx vue-tsc --noEmit 2>&1 | grep -E 'panes/(Gradient|Browse|Blob|Aurora|Admin|Mix|Generate|Extract|Palettes|About)Pane'
```

Output contains only pre-existing errors (BlobPane BlobConfig cast, BrowsePane/ExtractPane
exactOptionalPropertyTypes mismatches). Zero errors attributable to the `tier`/`shadow`/`grain`
prop migration.
