# B.W3 Lane C — Custom-Component Typecheck Cluster

Sub-gate C (verbatim): `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS' ≤ 135.`

## Result

| Metric | Count |
|--------|-------|
| Baseline (pre-fix) | 212 |
| Final (post-fix) | **126** |
| Gate threshold | ≤ 135 |
| Status | **PASS** |

- Custom bucket: **86 → 0** (all fixed)
- Generated bucket (`demo/@/components/ui/**`): **126 → 126** (untouched, routed to generator-update effort)

The generated bucket alone (126) is below the 135 floor, so fixing the custom
bucket was sufficient to clear the gate.

## Custom bucket — before/after per file

All errors below were resolved (after = 0).

| File | Before | Error class |
|------|-------:|-------------|
| `custom/image-palette-extractor/composables/useInertiaGesture.ts` | 18 | `noUncheckedIndexedAccess` — pointer-tuple index access |
| `custom/watercolor-dot/composables/useWatercolorBlob.ts` | 16 | index-narrowing on `vertices`/`current`/`initial` arrays |
| `custom/generate/GenerateControls.vue` | 5 | Select `AcceptableValue` callback + slider `number[] \| undefined` + `HARMONY_DEFS` index |
| `custom/gradient/GradientVisualizer.vue` | 4 | Select `AcceptableValue` callbacks + slider `number[] \| undefined` |
| `composables/palette/useBrowsePalettes.ts` | 3 | `exactOptionalPropertyTypes` on `ListPalettesOptions` + `Palette` spread of `T \| undefined` |
| `custom/panes/BrowsePane.vue` | 3 | `Palette` spread of indexed `T \| undefined` |
| `custom/palette-browser/PaletteDialog.vue` | 3 | `sortMode` union widening + `useSlugMigration` deps shape + `PaletteColor` spread |
| `custom/mix/MixConfigBar.vue` | 3 | Select `AcceptableValue` callbacks |
| `custom/image-palette-extractor/ImageEyedropper.vue` | 3 | dead `"hex"` comparison + loose `parseCSSColor` return + `ImageData` index access |
| `custom/color-picker/display/ColorNutritionLabel.vue` | 3 | `DisplayColorSpace` index + `Object.keys()[i]` undefined index |
| `custom/color-picker/controls/ComponentSliders.vue` | 3 | slider `number[] \| undefined` callback + `stops[]` index access |
| `composables/palette/usePaletteManagerWiring.ts` | 2 | `colors[0]` index access + loose `parseCSSColor` return |
| `custom/palette-browser/SearchFilterBar.vue` | 2 | RadioGroup `$event` `AcceptableValue` → emit `string` |
| `custom/palette-browser/PaletteCard.vue` | 2 | `exactOptionalPropertyTypes` props to `PaletteCardMenu` / `SwatchHoverMenu` |
| `custom/image-palette-extractor/ImagePaletteExtractor.vue` | 2 | `exactOptionalPropertyTypes` props to `ExtractControls` / `PaletteCard` |
| `custom/color-picker/ColorPicker.vue` | 2 | `generateRandomColor` return brand + `ref` deep-unwrap mangling `ColorModel` |
| `composables/palette/usePaletteManager.ts` | 1 | `ensureSession` `Promise<string>` vs `Promise<void>` |
| `composables/color/useAppColorModel.ts` | 1 | loose `parseCSSColor` return |
| `composables/auth/useAdminUsers.ts` | 1 | `Palette` spread of indexed `T \| undefined` |
| `custom/panes/ExtractPane.vue` | 1 | `exactOptionalPropertyTypes` prop to `ImageEyedropper` |
| `custom/palette-browser/PaletteCardSkeleton.vue` | 1 | `count` possibly undefined in template |
| `custom/palette-browser/CurrentPaletteEditor.vue` | 1 | `:key` indexed `number \| undefined` + `swatchExtraClass` propagation |
| `custom/palette-browser/AdminUsersPanel.vue` | 1 | `Palette` spread of indexed `T \| undefined` |
| `custom/palette-browser/AdminAuditPanel.vue` | 1 | `exactOptionalPropertyTypes` on `AuditLogOptions` |
| `custom/gradient/EasingSelector.vue` | 1 | Select `AcceptableValue` callback → emit `string` |
| `custom/dock/layers/GenericActionBar.vue` | 1 | `exactOptionalPropertyTypes` props to `ActionButton` |
| `custom/color-picker/visual/HeroBlob.vue` | 1 | `colorChangeTimestamps[0]` index access |
| `custom/color-picker/composables/usePointerDebug.ts` | 1 | `exactOptionalPropertyTypes` on `PointerDebugEvent.extra` |
| **Total** | **86** | |

Files also edited as fix targets (props widened, no own errors):
`custom/color-picker/controls/ActionButton.vue`,
`custom/image-palette-extractor/ExtractControls.vue`,
`custom/palette-browser/PaletteCardMenu.vue`,
`custom/palette-browser/SwatchHoverMenu.vue`,
`custom/palette-browser/PaletteControlsBar.vue`,
`custom/color-picker/composables/useColorParsing.ts`,
`custom/color-picker/composables/useColorGeneration.ts`,
`composables/palette/useSlugMigration.ts`.

## Fix techniques (no `!`, no `as` unless noted)

- **Index narrowing**: destructure-with-guard (`const [p0, p1] = …; if (!p0 || !p1) return;`), `?.[i] + ?? fallback`, or `if (!v) continue` inside fixed loops.
- **Slider callbacks** (`number[] | undefined`): typed param as `number[] | undefined`, guarded `payload?.[0] !== undefined` before use.
- **Select / RadioGroup callbacks**: typed param as reka-ui `AcceptableValue`, converted via `String(v)` or branded cast to the known string-literal union (values are always `SelectItem` strings).
- **`exactOptionalPropertyTypes`**: object literals built conditionally with spread (`...(x ? { x } : {})`); custom-component optional props widened to `?: T | undefined`.
- **`Palette` / `PaletteColor` spreads**: captured the indexed element into a local `const`, guarded truthy before spreading (avoids spreading `T | undefined`).
- **`useColorGeneration`**: reordered `HARMONY_NAMES`/`HarmonyName` before `HARMONY_DEFS`, retyped `HARMONY_DEFS` as `Record<HarmonyName, HarmonyDef>`.
- **`ColorPicker` snapshot**: switched `preEditModel` from `ref` to `shallowRef` so the `ValueUnit` class instance inside `ColorModel.color` is not deep-unwrapped (which mangled the `"color"` brand). Also dropped the `{...model.value}` spread — `updateModel()` replaces `model.value` wholesale, so holding the reference is a valid snapshot.

## Unavoidable casts recorded

`parseCSSColor()` (in `src/parsing/color.ts`) is declared to return a bare
`ValueUnit` (`ValueUnit<any, string | undefined>`); `src/` is out of scope for
this lane. Call sites that feed its result into `normalizeColorUnit` /
`colorUnit2` (which require `ValueUnit<Color<ValueUnit<number>>, "color">`) need
a brand cast. Three such casts were added — each genuinely unavoidable without
editing `src/`:

| Site | Cast | Why |
|------|------|-----|
| `composables/color/useAppColorModel.ts:50` | `as ValueUnit<Color<ValueUnit<number>>, "color">` | `parseCSSColor` return is un-branded |
| `composables/palette/usePaletteManagerWiring.ts:46` | `as ValueUnit<Color<ValueUnit<number>>, "color">` | same |
| `custom/image-palette-extractor/ImageEyedropper.vue:207` | `as ValueUnit<Color<ValueUnit<number>>, "color">` | same |

`ColorNutritionLabel.vue:194` uses `space as keyof typeof colorSpaceInfo`,
guarded by a runtime `space in colorSpaceInfo` check with an `rgb` fallback —
`colorSpaceInfo` only defines 11 of the 15 `ColorSpace` members, so the index is
genuinely partial; the cast is inside the `in`-narrowed branch and is safe.

`generateRandomColor` and the `useColorGeneration`/`MixConfigBar`/`GradientVisualizer`
Select callbacks retain pre-existing `as` casts on the *value* side
(`v as PresetName` etc.) — these were already present before this lane and only
the callback *parameter* type was changed.

## Generated bucket (recorded, untouched, routed)

126 errors in `demo/@/components/ui/**` — vendored/generated shadcn-vue
(reka-ui) components. Not edited. Routed to a future generator-update effort.
Breakdown by component group:

| Group | Errors |
|-------|-------:|
| auto-form | 38 |
| range-calendar | 15 |
| calendar | 15 |
| menubar | 12 |
| pagination | 9 |
| navigation-menu | 8 |
| alert-dialog | 6 |
| pin-input | 4 |
| chart | 4 |
| chart-donut | 3 |
| v-calendar | 2 |
| resizable | 2 |
| carousel | 2 |
| form / chart-line / chart-bar / chart-area / breadcrumb / aspect-ratio | 1 each |
| **Total** | **126** |
