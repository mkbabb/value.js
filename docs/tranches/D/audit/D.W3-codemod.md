# D.W3 Lane C — Vue 3.5 codemod + library-perf fold-ins — audit

Lane C of D.W3 lands the Vue 3.5 reactive-props destructure across 32 SFCs, the
`useTemplateRef` migration, the `cssColorToRgb` per-frame memoise, the dead
`provide("auroraConfig")` cleanup, and 5 library-perf fixes (L3/L5/L8/L11/L12).

All work targets `tranche-b` HEAD at D.W3 Lane B close. Validation runs:
`npx vue-tsc --noEmit && npx vitest run && npx playwright test --project=smoke && npm run lint`.

---

## §1 — 32-SFC inventory (codemod targets)

Grep: `grep -rln "const props = defineProps<" demo/@/components/custom demo/color-picker` = **32**.

| # | File | Shape | Hand-conv? |
|---|---|---|---|
| 1 | `color-picker/controls/ActionButton.vue` | inline | no |
| 2 | `color-picker/controls/ColorInput.vue` | inline | no |
| 3 | `dock/Dock.vue` | inline (single-line) | no |
| 4 | `dock/DockViewSelect.vue` | inline | no |
| 5 | `dock/layers/ActionBarLayer.vue` | inline | no |
| 6 | `dock/layers/GenericActionBar.vue` | inline | no |
| 7 | `dock/menus/MobileMenuDropdown.vue` | inline | no |
| 8 | `dock/menus/ProfileSection.vue` | inline | no |
| 9 | `gradient/EasingSelector.vue` | inline | no |
| 10 | `gradient/GradientCodeEditor.vue` | inline | no |
| 11 | `gradient/GradientStopEditor.vue` | inline | no |
| 12 | `image-palette-extractor/ImagePaletteExtractor.vue` | inline | no |
| 13 | `mix/MixAnimationCanvas.vue` | inline | no |
| 14 | `mix/MixConfigBar.vue` | inline | no |
| 15 | `mix/MixResultDisplay.vue` | inline | no |
| 16 | `mix/MixSourceSelector.vue` | inline | no |
| 17 | `palette-browser/AdminUsersPanel.vue` | inline | no |
| 18 | `palette-browser/CurrentPaletteEditor.vue` | inline | **yes — `toRef(props, "X")` x2** |
| 19 | `palette-browser/FlagReportDialog.vue` | inline | no |
| 20 | `palette-browser/MigratePalettesDialog.vue` | inline | no |
| 21 | `palette-browser/MiniColorPicker.vue` | inline | no |
| 22 | `palette-browser/PaletteDialog/PaletteDialog.vue` | inline | no |
| 23 | `palette-browser/PaletteDialog/components/PaletteControlsBar.vue` | inline | no |
| 24 | `palette-browser/PaletteRenameInput.vue` | inline | no |
| 25 | `palette-browser/PaletteSlugBar.vue` | inline | no |
| 26 | `palette-browser/SearchFilterBar.vue` | inline | no |
| 27 | `palette-browser/TagEditPopover.vue` | inline | no |
| 28 | `palette-browser/VersionHistoryDrawer.vue` | inline | no |
| 29 | `panes/AdminPane.vue` | inline | no |
| 30 | `panes/ConfigSliderPane.vue` | inline | no |
| 31 | `panes/PalettesPane.vue` | inline | no |
| 32 | `panes/PaneSegmentedControl.vue` | inline | no |

**Not in the 32, but separately hand-converted**:
- `goo-blob/GooBlob.vue` — uses `withDefaults(defineProps<...>(), { seed: "" })` with
  `toRef(props, "color")`. The grep above already excludes it (uses
  `const props = withDefaults(defineProps<...>(), ...)`, not the
  `const props = defineProps<...>()` form). Tracked separately in §2.
- `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` — `withDefaults`
  form like GooBlob. Excluded by the same grep filter. Tracked separately.

---

## §2 — Hand-conversion sites

### §2.1 — `GooBlob.vue:21-27,39,41,53`

Currently:
```ts
const props = withDefaults(
    defineProps<{ color: string; seed?: string }>(),
    { seed: "" },
);
// ...
const satelliteSystem = useBlobSatellites(cfg, props.color + props.seed);
const colorRef = toRef(props, "color");
// ...
watch(colorRef, (c) => { satelliteSystem.reseed(c + props.seed); });
```

Target (Vue 3.5):
```ts
const { color, seed = "" } = defineProps<{ color: string; seed?: string }>();
// ...
const satelliteSystem = useBlobSatellites(cfg, color + seed);
const colorRef = toRef(() => color);
// ...
watch(colorRef, (c) => { satelliteSystem.reseed(c + seed); });
```

### §2.2 — `CurrentPaletteEditor.vue:170-175,207-208`

Currently:
```ts
const props = defineProps<{
    savedColorStrings: string[];
    cssColorOpaque: string;
    savedPaletteCount: number;
    savedPalettes: Palette[];
}>();
// ...
useSwatchActions({
    savedColorStrings: toRef(props, "savedColorStrings"),
    cssColorOpaque: toRef(props, "cssColorOpaque"),
    emit,
});
```

Target:
```ts
const { savedColorStrings, cssColorOpaque, savedPaletteCount, savedPalettes } =
    defineProps<{ /* ... */ }>();
// ...
useSwatchActions({
    savedColorStrings: toRef(() => savedColorStrings),
    cssColorOpaque: toRef(() => cssColorOpaque),
    emit,
});
```

### §2.3 — `ImageEyedropper.vue:89-94,124,189,235`

Currently:
```ts
const props = withDefaults(defineProps<{
    imageUrl: string;
    colorSpace?: DisplayColorSpace | undefined;
}>(), { colorSpace: "hex" });
// ...
colorSpace: () => props.colorSpace,
// ...
await sampler.loadImage(props.imageUrl);
// ...
watch(() => props.imageUrl, () => { loadAndFit(); });
```

No `toRef(props, ...)` here; codemod-safe via the standard pattern. Hand-conv noted
only because the file uses `withDefaults(defineProps<>())` which the grep filter
in §1 missed. Mechanical destructure works fine.

---

## §3 — `useTemplateRef` migration sites

Grep candidates: `rg "ref<HTML[A-Za-z]+Element" demo/`.

Actual `.vue` files with paired `ref="..."` template binding:

| # | File | Lines (ref decl, template binding) | Target ref name |
|---|---|---|---|
| 1 | `color-picker/visual/PointerDebugOverlay.vue` | :109, :54 | `logRef` |
| 2 | `gradient/GradientCodeEditor.vue` | :27, :135 | `editorRef` |
| 3 | `gradient/GradientStopEditor.vue` | :19, :108 | `barRef` |
| 4 | `palette-browser/MiniColorPicker.vue` | :82+83, :9+25 | `canvasRef`, `hueRef` |
| 5 | `palette-browser/PaletteDialog/components/PaletteControlsBar.vue` | :113, :16 | `tabsScrollRef` |
| 6 | `dock/layers/SlugEditLayer.vue` | :14, :82 | `slugInputRef` |
| 7 | `color-picker/App.vue` | :118, :7 | `atmosphereCanvas` |
| 8 | `hero-lab/*` (4 files) | — | **skipped — hero-lab isn't shipped in the main demo** |

`MiniColorPicker.vue` carries 2 refs, so the "8 sites" count maps to 8 ref
declarations across 7 `.vue` files. Plus `App.vue` = 8 declarations total in
shipped demo SFCs.

Skipped:
- `hero-lab/components/*` (4 files) — experimental lab, not part of the main
  shipped demo; out of D.W3 Lane C scope.
- `chart/ChartLegend.vue` — `ref<HTMLElement>()` without a paired `ref="elRef"`
  template binding (uses `useTemplateRef`-like injection from chartjs); skip.
- `useMarkdownHighlighting.ts` — composable, not template-attached (styleEl is
  imperatively appended to `<head>`).
- `useCardMenu.ts` — composable; ref is `expose`d, not template-bound.

---

## §4 — Library-perf fold-ins (L3 / L5 / L8 / L11 / L12)

### §4.1 — L3 (`parseCSSColor` memo + invalidation)

Site: `src/parsing/color.ts:573`. Sibling memo pattern:
`src/parsing/index.ts:258` wraps `parseCSSValue` with `memoize` from `../utils`.

Plan:
1. Import `memoize` from `../utils` into `color.ts`.
2. Wrap `parseCSSColor` with `memoize`. Add JSDoc warning callers MUST NOT mutate the returned `ValueUnit`.
3. Add an invalidation call inside `registerColorNames` (line 559) and `clearCustomColorNames` (line 565) that clears the memo cache (`parseCSSColor.cache.clear()`).

### §4.2 — L8 (`parseCSSValueUnit` memo parity)

Site: `src/parsing/units.ts:106`. Same pattern as L3 but no invalidation hook (no
custom-name registry hangs off `parseCSSValueUnit`).

### §4.3 — L5 (`lerpColorValue` carries `hueMethod` — 3-file change)

1. **`src/units/index.ts:209`** — extend `InterpolatedVar<T>`:
   ```ts
   import type { HueInterpolationMethod } from "./color/utils";
   import type { ColorSpace } from "./color/constants";

   export type InterpolatedVar<T> = {
       start: ValueUnit<T>;
       stop: ValueUnit<T>;
       value: ValueUnit<T>;
       computed: boolean;
       hueMethod?: HueInterpolationMethod;
       colorSpace?: ColorSpace;
   };
   ```
2. **`src/units/normalize.ts:359-373`** — producer side: after the
   `normalizeColorUnits` call, write `hueMethod` + `colorSpace` into `out`.
3. **`src/units/interpolate.ts:46-65`** — consumer side: in `lerpColorValue`,
   detect cylindrical hue components per `CYLINDRICAL_HUE_COMPONENT` and dispatch
   `interpolateHue` for those; keep `lerp` for the others. Read
   `iv.hueMethod` and `iv.colorSpace` from the `InterpolatedVar`.

Default `hueMethod` is `"shorter"` per CSS Color 4 §12.4.

### §4.4 — L11 (interpolation arg-order canonicalisation)

`lerp(t, a, b)` flips to `lerp(a, b, t)`. `interpolateHue(h1, h2, t, method)`
and `slerp(a, b, t)` are already canonical.

Sites of `lerp(` (excluding `slerp`, `logerp`, `cubicBezier*`, `deCasteljau`,
`interpBezier`):
- `src/math.ts:27` (definition)
- `src/math.ts:47` (deCasteljau internal — pass `lerp(b[j], b[j+1], t)` after flip)
- `src/easing.ts:98`
- `src/units/interpolate.ts:33, 55, 72, 97`
- `src/units/color/utils.ts:1140, 1164`
- `src/transform/decompose.ts:519, 520, 521, 524, 525, 526, 529, 530, 531, 535, 536, 537, 538` (already calls 2-arg `lerp(a, b)` form — these need an explicit `, t` added after flip!) — confirm by reading the file.

Migration:
- Edit `lerp` signature.
- Edit all call sites.
- Export `lerpLegacy` (or named alias) with `@deprecated` JSDoc pointing to the new shape.

### §4.5 — L12 (`_lerp` bolt-on cleanup, P3 optional)

Today `src/units/interpolate.ts:88, 117` uses `(iv as any)._lerp`. Per the wave
spec this is gated on bandwidth. Will attempt; if it grows beyond 10 min, defer.

---

## §5 — `cssColorToRgb` memoise sketch

`demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:53-60`.

```ts
const cssColorCache = new Map<string, [number, number, number]>();
function cssColorToRgb(color: string): [number, number, number] {
    const cached = cssColorCache.get(color);
    if (cached) return cached;
    if (!resolverCtx) return [0.5, 0.5, 0.5];
    resolverCtx.clearRect(0, 0, 1, 1);
    resolverCtx.fillStyle = color;
    resolverCtx.fillRect(0, 0, 1, 1);
    const d = resolverCtx.getImageData(0, 0, 1, 1).data;
    const result: [number, number, number] = [d[0]! / 255, d[1]! / 255, d[2]! / 255];
    if (cssColorCache.size > 256) cssColorCache.clear();
    cssColorCache.set(color, result);
    return result;
}
```

---

## §6 — Dead-provide cleanup site

`demo/color-picker/App.vue:215` — `provide("auroraConfig", auroraConfig);`.

Verified zero consumers via `rg "inject.*['\"]auroraConfig['\"]" demo/` → 0 matches.

`auroraConfig` variable itself stays (used by `useAurora(...)` at line 212).
Only the `provide()` line is removed.

---

## §7 — 32-SFC codemod result

All 32 files codemodded successfully. Per-file disposition:

| # | File | Result |
|---|---|---|
| 1 | `color-picker/controls/ActionButton.vue` | ✓ codemod (hoverKey, activeHover) |
| 2 | `color-picker/controls/ColorInput.vue` | ✓ codemod (proposeMode); watcher rewritten to `watch(() => proposeMode, …)` |
| 3 | `dock/Dock.vue` | ✓ codemod (linkCopied, editTarget, actionBar→actionBarProp alias to avoid name-clash with the local `actionBar = computed(…)`) |
| 4 | `dock/DockViewSelect.vue` | ✓ codemod (template-only consumption) |
| 5 | `dock/layers/ActionBarLayer.vue` | ✓ codemod (actionBar, editTarget) |
| 6 | `dock/layers/GenericActionBar.vue` | ✓ codemod (actions, accentColor) |
| 7 | `dock/menus/MobileMenuDropdown.vue` | ✓ codemod (cssColorOpaque, linkCopied) |
| 8 | `dock/menus/ProfileSection.vue` | ✓ codemod (cssColorOpaque, linkCopied) |
| 9 | `gradient/EasingSelector.vue` | ✓ codemod (modelValue) |
| 10 | `gradient/GradientCodeEditor.vue` | ✓ codemod (modelValue, coalescedCSS) + useTemplateRef (editorRef) |
| 11 | `gradient/GradientStopEditor.vue` | ✓ codemod (stops, coalescedCSS) + useTemplateRef (barRef) |
| 12 | `image-palette-extractor/ImagePaletteExtractor.vue` | ✓ codemod (cssColorOpaque) |
| 13 | `mix/MixAnimationCanvas.vue` | ✓ codemod (phase, selectedColors) |
| 14 | `mix/MixConfigBar.vue` | ✓ codemod (colorSpace, hueMethod, leftoverStrategy, showLeftoverStrategy, canMix) |
| 15 | `mix/MixResultDisplay.vue` | ✓ codemod (result) |
| 16 | `mix/MixSourceSelector.vue` | ✓ codemod (mode, selectedColors, selectedPalettes, cssColorOpaque) |
| 17 | `palette-browser/AdminUsersPanel.vue` | ✓ codemod (users, loading, expandedId, cssColor, totalUsers) |
| 18 | `palette-browser/CurrentPaletteEditor.vue` | ✓ **hand-conv**: `toRef(props, "X")` → `toRef(() => X)` (savedColorStrings + cssColorOpaque) |
| 19 | `palette-browser/FlagReportDialog.vue` | ✓ codemod (open, paletteName, paletteSlug) |
| 20 | `palette-browser/MigratePalettesDialog.vue` | ✓ codemod (count, mode) |
| 21 | `palette-browser/MiniColorPicker.vue` | ✓ codemod (open, hex) + useTemplateRef (canvasRef, hueRef); watcher param renamed `(hex) → (incomingHex)` to disambiguate from the prop name |
| 22 | `palette-browser/PaletteDialog/PaletteDialog.vue` | ✓ codemod (savedColorStrings, cssColor, cssColorOpaque, editingExit, editingEnter) |
| 23 | `palette-browser/PaletteDialog/components/PaletteControlsBar.vue` | ✓ codemod (12 props) + useTemplateRef (tabsScrollRef) |
| 24 | `palette-browser/PaletteRenameInput.vue` | ✓ codemod (name) |
| 25 | `palette-browser/PaletteSlugBar.vue` | ✓ codemod (userSlug, cssColorOpaque, hasSavedPalettes, isAdmin) |
| 26 | `palette-browser/SearchFilterBar.vue` | ✓ codemod (sort, status, selectedTags, availableTags) |
| 27 | `palette-browser/TagEditPopover.vue` | ✓ codemod (open, paletteSlug, currentTags) |
| 28 | `palette-browser/VersionHistoryDrawer.vue` | ✓ codemod (open, paletteSlug, paletteName, currentHash) |
| 29 | `panes/AdminPane.vue` | ✓ codemod (subView) |
| 30 | `panes/ConfigSliderPane.vue` | ✓ codemod (config, sections, defaults, title, description) |
| 31 | `panes/PalettesPane.vue` | ✓ codemod (savedColorStrings) |
| 32 | `panes/PaneSegmentedControl.vue` | ✓ codemod (modelValue, leftLabel, rightLabel) |

Plus 2 `withDefaults` hand-conversion sites covered separately:
- `goo-blob/GooBlob.vue` — `withDefaults(defineProps<>(), { seed: "" })` → `const { color, seed = "" } = defineProps<…>()`. `toRef(props, "color")` → `toRef(() => color)`.
- `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` — `withDefaults` → destructure-with-default `colorSpace = "hex"`; downstream `props.imageUrl` / `props.colorSpace` swapped to bare names.

Verification: `rg -l "const props = defineProps<" demo/@/components/custom demo/color-picker | wc -l` returns **0**.

## §8 — useTemplateRef migration sites (actual)

8 declarations across 7 SFCs:

| File | Line (decl, template binding) | Ref name |
|---|---|---|
| `color-picker/visual/PointerDebugOverlay.vue` | :109, :54 | `logRef` |
| `gradient/GradientCodeEditor.vue` | :27, :135 | `editorRef` |
| `gradient/GradientStopEditor.vue` | :19, :108 | `barRef` |
| `palette-browser/MiniColorPicker.vue` | :82+83, :9+25 | `canvasRef`, `hueRef` |
| `palette-browser/PaletteDialog/components/PaletteControlsBar.vue` | :113, :16 | `tabsScrollRef` |
| `dock/layers/SlugEditLayer.vue` | :14, :82 | `slugInputRef` |
| `color-picker/App.vue` | :118, :7 | `atmosphereCanvas` |

Skipped (out of scope, no template binding, or shadcn-vue):
- `hero-lab/components/*` (4 files) — experimental lab, not in shipped demo.
- `chart/ChartLegend.vue` — shadcn-vue UI component (CLAUDE.md: don't hand-edit).
- `useMarkdownHighlighting.ts` / `useCardMenu.ts` — composables, not template-bound.

## §9 — cssColorToRgb memoise diff

`demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:53`:

```ts
const cssColorCache = new Map<string, [number, number, number]>();

function cssColorToRgb(color: string): [number, number, number] {
    const cached = cssColorCache.get(color);
    if (cached) return cached;
    if (!resolverCtx) return [0.5, 0.5, 0.5];
    resolverCtx.clearRect(0, 0, 1, 1);
    resolverCtx.fillStyle = color;
    resolverCtx.fillRect(0, 0, 1, 1);
    const d = resolverCtx.getImageData(0, 0, 1, 1).data;
    const result: [number, number, number] = [d[0]! / 255, d[1]! / 255, d[2]! / 255];
    if (cssColorCache.size > 256) cssColorCache.clear();
    cssColorCache.set(color, result);
    return result;
}
```

## §10 — Dead-provide removal

`demo/color-picker/App.vue:215`: `provide("auroraConfig", auroraConfig);` removed.

Pre-removal verification: `rg "inject.*['\"]auroraConfig['\"]" demo/` → 0 matches. The
`auroraConfig` variable itself remains — used by `useAurora(...)` at line 212.

## §11 — Library-perf results (L3 / L5 / L8 / L11)

### L3 — `parseCSSColor` memo + invalidation
`src/parsing/color.ts:573` wrapped with `memoize`. JSDoc warns callers MUST NOT
mutate the returned ValueUnit. Cache invalidation hook called from
`registerColorNames` (line 559) and `clearCustomColorNames` (line 565).

### L8 — `parseCSSValueUnit` memo
`src/parsing/units.ts:106` wrapped with `memoize`. Same JSDoc warning.

### L5 — `lerpColorValue` carries `hueMethod`
3-file change:
1. **`src/units/index.ts`** — `InterpolatedVar<T>` extended with `hueMethod?: HueInterpolationMethod` + `colorSpace?: ColorSpace` + `_lerp?: …` (the last from L12).
2. **`src/units/normalize.ts`** — producer: after `normalizeColorUnits` call, write `out.colorSpace = colorSpace; if (hueMethod) out.hueMethod = hueMethod;`.
3. **`src/units/interpolate.ts`** — consumer: `lerpColorValue` reads `iv.colorSpace` and `iv.hueMethod`, identifies the hue channel via `CYLINDRICAL_HUE_COMPONENT[colorSpace]`, and dispatches `interpolateHue(sn/360, en/360, t, hueMethod) * 360` for that channel only (the `/360` and `*360` bridge `interpolateHue`'s normalized [0,1] domain across `normalizeColorUnits`'s inverse=true denormalisation back to degrees).

Vitest assertion added at `test/units-interpolate.test.ts:319` — oklch 350° → 10° at
t=0.5 with `hueMethod: "shorter"` produces a hue near 0° or 360° (short-way), NOT
180° (long-way). 1582 passing (1581 + 1 new).

### L11 — interpolation arg-order canonicalisation
`src/math.ts`: `lerp(t, start, end)` → `lerp(start, end, t)`. Aliased export
`lerpLegacy(t, a, b)` retained with `@deprecated` JSDoc pointing at the new shape.
Re-exported from `src/index.ts`.

Call sites updated (all flipped to `lerp(a, b, t)` form):
- `src/math.ts:47` (deCasteljau internal)
- `src/easing.ts:98`
- `src/units/interpolate.ts:33, 64 (color non-hue path), 72, 97`
- `src/units/color/utils.ts:1140, 1164`
- `test/math.test.ts` (all 21 `lerp(…)` test asserts flipped)

`interpolateHue(h1, h2, t, method)` was already canonical. `slerp(a, b, t)` was
already canonical. `interpolateDecomposed`'s inner local `lerp(v0, v1)` arrow uses a
closure-captured `t`, no change needed.

## §12 — L12 disposition

**Landed.** `_lerp` declared on `InterpolatedVar<T>` (in `src/units/index.ts`) with
an explicit type signature. `prepareInterpVar` now writes the property directly
(`iv._lerp = …`); `lerpValue`'s fast path reads `iv._lerp` without the `as any`
cast. The color-dispatch branch carries an explicit type-widening cast
(`lerpColorValue as (t, iv) => ValueUnit<any>`) because `lerpColorValue`'s
`InterpolatedVar<Color>` is more specific than `InterpolatedVar<any>`; the
narrowing is safe because `prepareInterpVar` only enters that branch when
`iv.start.unit === "color"`.

## §13 — Validation matrix

| Check | Result |
|---|---|
| `npx vue-tsc --noEmit` errors | **126** (unchanged baseline; all in shadcn-vue UI) |
| `npx vitest run` | **1582 passing** (was 1581; +1 for L5 short-way assertion) |
| `npx playwright test --project=smoke` | **3/3 green** |
| `npm run lint` | exit 0 |
| `npm run proof:resolution` | GREEN |
| `cd api && npx tsc --noEmit` | exit 0 (api unaffected) |
| `rg -l 'const props = defineProps<' demo/@/components/custom demo/color-picker \| wc -l` | **0** |

## §14 — Sub-gate C verdict

**PASS.**

- 32 SFCs codemodded; 0 remaining `const props = defineProps<` consumers
  (target was ≤ 2 with rationale; we exceeded the gate by hand-converting both
  hand-conversion sites cleanly).
- 8 `useTemplateRef` migrations landed (7 SFCs + 1 App.vue).
- `cssColorToRgb` memoised (cap at 256 entries; ~10 unique colors in practice).
- `App.vue` no longer carries `provide("auroraConfig", …)`.
- L3 `parseCSSColor` and L8 `parseCSSValueUnit` both memoised with JSDoc
  no-mutate warning; L3 cache invalidates on `registerColorNames` /
  `clearCustomColorNames`.
- L5 `InterpolatedVar` carries `hueMethod` + `colorSpace`; vitest test asserts
  short-way-round for oklch 350°→10°.
- L11 interpolation signatures canonicalised to `(a, b, t, opts?)`;
  `lerpLegacy` aliased export with `@deprecated`.
- L12 landed — `_lerp` is now a first-class field on `InterpolatedVar`.
- vue-tsc 126; vitest 1582 (≥ 1581 + 1); smoke 3/3; lint exit 0;
  proof:resolution GREEN.
