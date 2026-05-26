# H.W3 Lane B — `demo/` god-module audit + remediation

**Wave**: H.W3 (Gap #5 closure — extend G3 ≤ 400 LoC ceiling from `src/` to `demo/`).
**Substrate**: `tranche-h` @ `3b0d933`.
**Scope**: every `demo/` `.vue` / `.ts` file ≥ 400 LoC, excluding shadcn-vue vendored components at `demo/@/components/ui/` (per `VENDOR-POLICY.md`).

## Census — pre-remediation (top 30, excluding `demo/@/components/ui/`)

The orchestrator's pre-identified scope: 2 files ≥ 400 LoC excluding Lane A's `demo/@/lib/palette/api.ts` (484; concurrently decomposed) and Lane C's `demo/@/components/custom/color-picker/index.ts` (376; under threshold, scoped for `colorSpaceInfo` data-lift).

| LoC | File |
|----:|------|
| 484 | `demo/@/lib/palette/api.ts` *(Lane A — out of bounds; decomposed concurrently)* |
| 449 | `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` *(Lane B — see §1)* |
| 435 | `demo/@/components/custom/palette-browser/PaletteCard.vue` *(Lane B — see §2)* |
| 376 | `demo/@/components/custom/color-picker/index.ts` *(Lane C — out of bounds; under threshold)* |
| 375 | `demo/@/components/custom/color-picker/controls/ColorInput.vue` |
| 367 | `demo/@/components/custom/palette-browser/PaletteDialog/PaletteDialog.vue` |
| 343 | `demo/@/components/custom/image-palette-extractor/composables/useInertiaGesture.ts` |
| 343 | `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` |
| 333 | `demo/@/components/custom/color-picker/controls/ComponentSliders.vue` |
| 324 | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` |
| 316 | `demo/@/components/custom/markdown/Markdown.vue` |
| 304 | `demo/@/components/custom/palette-browser/AdminUsersPanel.vue` |
| 299 | `demo/@/components/custom/color-picker/composables/useColorModel.ts` |
| 296 | `demo/@/components/custom/image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` |
| 294 | `demo/@/components/custom/goo-blob/composables/useBlobSatellites.ts` |
| 291 | `demo/@/components/custom/color-picker/ColorPicker.vue` |
| 286 | `demo/@/components/custom/panes/BrowsePane.vue` |
| 282 | `demo/hero-lab/components/WebGLTileHero.vue` |
| 282 | `demo/color-picker/App.vue` |
| 279 | `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue` |
| 274 | `demo/@/components/custom/color-picker/composables/useColorGeneration.ts` |
| 258 | `demo/@/components/custom/palette-browser/PaletteSlugBar.vue` |
| 247 | `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue` |
| 246 | `demo/@/components/custom/gradient/composables/useGradientCSS.ts` |
| 242 | `demo/@/components/custom/mix/composables/useMixingAnimation.ts` |
| 241 | `demo/@/components/custom/palette-browser/SearchFilterBar.vue` |
| 238 | `demo/@/components/custom/gradient/GradientVisualizer.vue` |
| 235 | `demo/@/components/custom/dock/Dock.vue` |
| 229 | `demo/@/composables/usePaneRouter.ts` |

**Lane B scope**: exactly 2 files (the orchestrator's pre-identified set was complete — no additional ≥ 400 LoC outliers surfaced).

## §1 — `PointerDebugOverlay.vue` (449 LoC → **286 LoC**) — DECOMPOSE

### Cohesion analysis

The SFC was a single overlay shell that interleaved four concerns:

1. **Header** (toggle button + frozen/copied indicators) — ~25 LoC template / 35 LoC styles.
2. **Gauges section** (key/value readout of `debug.state.gauges`) — ~20 LoC template / 30 LoC styles.
3. **Event log** (reversed-list timeline of `debug.state.events`, colour-coded by `eventClass()`) — ~29 LoC template / ~71 LoC styles / ~9 LoC script helper.
4. **Action bar** (Reset / Copy JSON / Clear) — ~14 LoC template / 50 LoC styles / 64 LoC script (the `forceReset` DOM walker + `copyJSON` + `buildExportJSON`).

Two of these concerns were structurally separable without prop-drilling noise:

- The **event-log** sub-block (concern 3) is a pure presentational projection of a `readonly PointerDebugEvent[]` array — perfect for a sub-component. Its log-specific styles (`.debug-log*`, `.debug-event*` colour-coded backgrounds) form a self-contained selector cluster.
- The **`forceReset` DOM walker** (concern 4 script body, ~33 LoC) is mis-located on the overlay: it pokes selectors (`.spectrum-picker`, `.slider-track`, `[data-reka-slider-thumb]`) that belong to *other* components, and walks the `debug.state.events` array to gather recent pointer ids. The composable already owns pointer state — the recovery affordance is a debug-side concern, not a UI-shell concern.

### Remediation

- **NEW** `demo/@/components/custom/color-picker/visual/DebugEventLog.vue` (136 LoC) — single prop (`events: readonly PointerDebugEvent[]`), single computed (`reversedEvents`), single helper (`eventClass`), scoped styles for the log cluster.
- **MOVED** `forceReset` DOM walker into `usePointerDebug.ts` as `forceReleaseAllPointers()` (returns the element-checked count). The composable's `forceReleaseAll` primitive is preserved as the lower-level state-reset (no DOM walking) — `forceReleaseAllPointers` composes it.
- **PointerDebugOverlay.vue**: now consumes `<DebugEventLog :events="debug.state.events" />` and binds the Reset button directly to `debug.forceReleaseAllPointers()`. Imports for the lifted code (`useTemplateRef`, `computed`, `PointerDebugEvent` type) and the no-longer-needed `logRef` template ref were dropped.

### Sizes — post-remediation

| File | LoC |
|------|----:|
| `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` | 286 |
| `demo/@/components/custom/color-picker/visual/DebugEventLog.vue` *(NEW)* | 96-section + 40-script = 136 |
| `demo/@/components/custom/color-picker/composables/usePointerDebug.ts` | 281 (was 238; +43 for the lifted DOM walker) |

Net LoC delta for the touched cluster: 449 + 238 = 687 → 286 + 136 + 281 = 703 (+16; the wrapper boilerplate cost is small relative to the cohesion gain).

## §2 — `PaletteCard.vue` (435 LoC → **388 LoC**) — DECOMPOSE

### Cohesion analysis

The SFC's template had two structurally-separable blocks:

1. **Metadata row** (drag handle, name, featured/count/fork/version/tag badges, vote button, menu trigger) — interleaved with card chrome (rounded border, hover-shadow, layout-mode flex). Lives at the card surface.
2. **Expandable swatches detail** (slug bar + swatch hover-popover grid) — wrapped in a `<Transition>` for height animation, only mounted when `expanded === true`. Has its own concern (display swatches; route per-swatch actions back via emits) and consumes the `useHoverPopover` composable's reactive state through narrow props.

Script: 9-emit dispatcher (`handleMenuAction`) — minor but reasonable to keep on the parent since it routes per-action to specific emits and to local `startRenaming()`. The previous `toggleMenu`/`onMenuAction` helpers were dead/unused (the menu's open state is bound via `:open` + `@update-open` directly to `PaletteCardMenu`); folded them.

### Remediation

- **NEW** `demo/@/components/custom/palette-browser/PaletteCardSwatches.vue` (96 LoC) — receives `colors`, `isLocal`, `displaySlug`, `safeFirstColor`, `openPopoverIndex`, `canHover`, `floatingStyle`, `swatchClass` as props; re-emits per-swatch events (`hover`, `leave`, `cancelLeave`, `swatchClick`, `popoverTouch`, `popoverAdd`, `popoverEdit`, `popoverCopy`) back to the parent.
- **PaletteCard.vue**: substitutes the inline 58-line swatch-detail template with `<PaletteCardSwatches v-if="expanded" …>`. The outer `<Transition>` envelope stays on the card (the height-transition handlers animate the wrapper; that wrapper is the card's, not the sub-component's).
- **Folded** `toggleMenu` (unused), inlined `onMenuAction` into `handleMenuAction` (the only call site).
- **Imports**: dropped `Copy`, `Pencil`, `Plus`, `SwatchHoverMenu` (now owned by the sub-component); added `PaletteCardSwatches`.

### Sizes — post-remediation

| File | LoC |
|------|----:|
| `demo/@/components/custom/palette-browser/PaletteCard.vue` | 388 |
| `demo/@/components/custom/palette-browser/PaletteCardSwatches.vue` *(NEW)* | 96 |

Net LoC delta: 435 → 388 + 96 = 484 (+49 wrapper boilerplate; comprehension gain: the card shell template is now under one screen and the swatch surface is its own discoverable file matching the established `PaletteCardMenu.vue` / `PaletteRenameInput.vue` / `PaletteColorStrip.vue` colocation pattern).

## §3 — No "cohesion-tight, leave + document" cases

Both Lane B targets remediated as decompositions. The 449-LoC PointerDebugOverlay had cleanly separable sub-blocks (log + DOM-recovery affordance) and the 435-LoC PaletteCard had a discoverable secondary template surface (swatch detail). Neither presented the "shared reactive state would have to be lifted to a composable that itself approaches the original LoC" anti-pattern that would have justified a cohesion-tight leave.

## Sub-gate evidence

| Gate | Result |
|------|--------|
| `find demo/ -name '*.vue' -o -name '*.ts' \| grep -v '/components/ui/' \| xargs wc -l \| awk '$1 > 400'` | **0 files** (excl. shadcn-vue vendored; Lane A's `palette/api/` decomposition landed concurrently — `api.ts` is gone) |
| `npx vue-tsc --noEmit` | **exit 0** (strict-zero per F.W3 Lane C) |
| `npm run lint` | **exit 0** (`--max-warnings=0`) |
| `npm run gh-pages` | **built in ~3.2s**, all chunks emitted including `PaletteCard-*.js` (23.60 kB / 7.40 kB gz) |

## Post-remediation census — files ≥ 400 LoC (excl. `demo/@/components/ui/`)

**0**. Lane B's H3-invariant extension to `demo/` is achieved.

The next-largest file is now `PaletteCard.vue` at 388 LoC (12 LoC under the ceiling). Files in the 367-388 range are the natural-cohesion plateau of the current `demo/` tree; should H3's ceiling tighten in a successor wave, the candidates in priority order are: `PaletteCard.vue` (388) → `ColorInput.vue` (375) → `PaletteDialog.vue` (367).

## Files touched

- `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` (449 → 286 LoC; rewritten)
- `demo/@/components/custom/color-picker/visual/DebugEventLog.vue` *(NEW, 136 LoC)*
- `demo/@/components/custom/color-picker/composables/usePointerDebug.ts` (238 → 281 LoC; `forceReleaseAllPointers` lifted in)
- `demo/@/components/custom/palette-browser/PaletteCard.vue` (435 → 388 LoC; swatch detail extracted, dead menu helpers folded)
- `demo/@/components/custom/palette-browser/PaletteCardSwatches.vue` *(NEW, 96 LoC)*
- `docs/tranches/H/audit/H.W3-lane-b-demo-godmodule-audit.md` *(NEW — this file)*

## Judgment calls

1. **Kept `forceReleaseAll` (the state-only primitive) alongside `forceReleaseAllPointers`** in `usePointerDebug.ts`. The two have distinct intent: `forceReleaseAll` resets the composable's freeze-detection state without DOM walking; `forceReleaseAllPointers` composes it with the brute-force `releasePointerCapture()` walk. The UI consumes the latter; tests or future consumers may want the cheaper state-only reset.
2. **Did NOT extract a third `DebugGauges.vue` sub-component**. The gauges block is ~20 lines of template against ~30 lines of selector-stable styles that share the `.debug-section*` selectors with the rest of the overlay. Lifting it would have orphaned those selectors and forced a duplicated style block — the cohesion-tight branch for this sub-block.
3. **Kept the `<Transition>` envelope on `PaletteCard.vue` rather than moving it inside `PaletteCardSwatches.vue`**. The height-transition handlers come from `useHeightTransition({ onBeforeCollapse: () => { openPopoverIndex.value = null; } })`, which closes the parent's popover state on collapse. Lifting the Transition into the sub-component would have required either (a) prop-drilling the close callback (lossy) or (b) lifting `openPopoverIndex` into the sub-component (which would force the parent to learn about the swatch-popover lifecycle anyway via emits, gaining nothing). The current shape — Transition wraps the sub-component, sub-component is concerned only with rendering — is the cleanest separation.
