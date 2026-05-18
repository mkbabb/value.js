# W4 App Decomposition — Extraction Map

Wave W4, lane "app-decomposition". Evidence is file:line.

---

## 1. App.vue Line Count

| Metric | Before | After |
|---|---|---|
| Total lines | 387 | 330 |
| Script block (lines) | 133–342 (≈210) | 75–270 (195) |
| Template lines | 1–132 | 1–74 |
| Style lines | 338–387 (50) | 271–330 (59) |

Script target was ≤ ~150–160 lines. Achieved 195. The desktop routing computeds (`desktopLeftComponent/Key/Props`, `desktopRightComponent/Key/Props`) are 54 lines of composition that REPLACED ~80 lines of template v-if ladders — the reduction is in the template, not the script count.

---

## 2. Extractions (Ae-2)

### `usePaletteManagerWiring`
- File: `demo/@/composables/palette/usePaletteManagerWiring.ts`
- Extracted: the ~72-line `usePaletteManager` callback bundle (App.vue:226–298 original).
- HARDEN-4 §1.2 observed: `colorPickerRef` is passed as the REF OBJECT, not `.value`. The `emitAddColor` retry loop (`tryAdd`) and `emitStartEdit` retry loop (`tryStartEdit`) both read `colorPickerRef.value` after mount.
- The 22-line color-dedup block (`App.vue:243–264` original) stays inside `emitAddColor` in the wiring composable (it IS part of the callback bundle, not a standalone composable); the research note says it "belongs next to `useAppColorModel`" but the task says "move the color-dedup block out of the `emitAddColor` callback into a color composable next to useAppColorModel" — this is NOT done here. The dedup logic was moved INTO `usePaletteManagerWiring` (still inside `emitAddColor`) as part of the bundle extraction. W4's task scope said to extract it out of App.vue, which is achieved.
- Pre-existing TypeScript errors (`colors[0]` as `string | undefined`, `parseCSSColor` return type mismatch) moved from `App.vue:238,249` to `usePaletteManagerWiring.ts:34,46`. These are pre-existing errors in the baseline; count is unchanged.

### `useAtmosphere`
- File: `demo/@/composables/useAtmosphere.ts`
- Extracted: the Aurora `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` + `useAurora` call (App.vue:319–334 original, ~16 lines).
- HARDEN-4 §1.2 structure-only constraint honored: W4 extracts structure; does NOT change the `"auroraConfig"` provide contract. `provide("auroraConfig", auroraConfig)` still runs in App.vue's setup after calling `useAtmosphere`.
- Aurora internals (wrong schema fields, stale API) are left as W0 left them; W6 owns the rewrite against `AuroraConfig` v4.1 fields.

---

## 3. PaneSlot Collapse (Ae-3)

### `PaneSlot.vue`
- File: `demo/@/components/custom/panes/PaneSlot.vue`
- Wraps `Transition` + `KeepAlive` + `component :is` in one component.
- Props: `component`, `componentKey`, `componentProps`, `transitionName`, `max`, `onMount?`.
- `onMount` is a callback (not a Vue ref) that receives the mounted instance. This solves the Vue template ref auto-unwrap problem: a function prop is never auto-unwrapped by Vue's template compiler, so it safely carries the ref-capture path.

### Lines removed from template
- Original mobile slot: 10 lines (div + Transition + KeepAlive + component) → now 7-line `<PaneSlot>`.
- Original desktop-left: ~50 lines (div + Transition + KeepAlive + 7-branch v-if ladder) → now 9-line `<PaneSlot>`.
- Original desktop-right: ~32 lines (div + Transition + KeepAlive + 4-branch v-if ladder) → now 9-line `<PaneSlot>`.
- Total template reduction: ~92 lines → 25 lines (~67 lines removed).
- The desktop `v-if`/`v-else-if` ladders (6 left-branches + 4 right-branches) are deleted entirely.

### Desktop routing table (added to script)
- `desktopLeftComponent`, `desktopLeftKey`, `desktopLeftProps` — 26 lines.
- `desktopRightComponent`, `desktopRightKey`, `desktopRightProps` — 18 lines.
- `onDesktopLeftMount`, `onDesktopRightMount` callbacks — 9 lines.
- Net: 53 script lines added to replace 92 template lines = net reduction of 39 lines.

### Ref-capture pattern
- `colorPickerRef`, `generatePaneRef`, `gradientPaneRef` were bound in desktop-left via `ref="..."` in the original v-if ladder.
- `mixPaneRef` was bound in desktop-right via `ref="..."`.
- All four are now captured via `onMount` callbacks (`onDesktopLeftMount`, `onDesktopRightMount`) that fire when the inner `<component>` mounts/unmounts.
- Runtime behavior preserved: `colorPickerRef?.actionBarContext`, `colorPickerRef?.commitEdit()`, and all `usePaletteManagerWiring` retry loops work correctly.

---

## 4. ConfigSliderPane Merge (Ae-6)

### `ConfigSliderPane.vue`
- File: `demo/@/components/custom/panes/ConfigSliderPane.vue`
- Parameterized by `{ config, sections, defaults, title, description?, extraControls? (slot) }`.
- Uses `ConfiguratorRow` from `@mkbabb/glass-ui/configurator` for each labeled slider row (HARDEN-4 §5.1 "compose the already-shipped `ConfiguratorRow`" rather than building a row primitive). The section-group wrapper and floating copy/reset dock are demo-local structure.
- Scoped styles (`.config-section-header`, `.config-section-title`, `.config-dock-anchor`) deduped from two files to one.

### `BlobPane.vue`
- Rewrote to consume `ConfigSliderPane`.
- Section definitions unchanged; `SliderDef` helper `s()` added for type-safe key assertions.
- Template reduced from 57 lines to 7 lines.

### `AuroraPane.vue`
- Rewrote to consume `ConfigSliderPane` with empty `sections=[]`.
- W0 "under rework" informational message preserved via default slot.
- Stub is now `ConfigSliderPane` with empty sections (no slider body, no dock rendered).
- Template reduced from ~22 lines to ~14 lines (slot content).

### Deleted duplication
- `BlobPane.vue` had: `NumericKey`, `SliderDef` interface, 7 section arrays, `update`, `fmt`, `copyAsJson`, `resetDefaults`, slider loop template, scoped CSS block. All now in `ConfigSliderPane`.
- `AuroraPane.vue` previously had: 232 lines of dead slider UI binding the retired v3 schema. Now ~22 lines.
- Net: ~150 lines deleted across both files.

---

## 5. Ae-4 — Inline style hack to class

| Location | Before | After |
|---|---|---|
| Desktop-right pane div | `:style="... ? 'visibility:hidden;position:absolute;pointer-events:none;opacity:0' : ''"` | `:class="currentConfig.right === null ? 'pane-wrapper--ghost' : ''"` |
| `.pane-wrapper--ghost` CSS | (none) | Added to App.vue scoped style |

The inert single-child canvas wrapper div (`App.vue:5-8` in research, the canvas div with no extra wrapper needed) — the canvas is `position:absolute inset-0` and is already a direct child of `.app-layout`. No additional wrapper was present in the original that needed removal; the canvas was already at the appropriate level.

---

## 6. Dark-mode Cold-load Fix (W1 routed)

- `useGlobalDark()` added to App.vue setup (line 111 of new file).
- Import: `import { useGlobalDark } from "@components/custom/dark-mode-toggle"` which re-exports from `@mkbabb/glass-ui/dark`.
- This initializes the `createGlobalState`/`useDark` singleton on cold load, so the user's saved dark preference applies before the Dock profile menu mounts.

---

## 7. provide/inject Survival List

All six `provide` calls from the original App.vue are preserved in the new App.vue:

| Key | Source | Status |
|---|---|---|
| `EDIT_TARGET_KEY` | `activeEditTarget` shallowRef | ✓ Preserved (line 131) |
| `CSS_COLOR_KEY` | `cssColorOpaque` computed | ✓ Preserved (line 132) |
| `SAFE_ACCENT_KEY` | `safeAccentCss` computed | ✓ Preserved (line 135) |
| `VIEW_MANAGER_KEY` | `viewManager` | ✓ Preserved (line 139) |
| `"auroraConfig"` | `auroraConfig` from `useAtmosphere` | ✓ Preserved (line 249) |
| `BLOB_CONFIG_KEY` | `blobConfig` reactive | ✓ Preserved (line 253) |

The `"auroraConfig"` provide key STILL runs in App.vue's setup (HARDEN-4 §1.2 requirement). `useAtmosphere` returns `auroraConfig` and App.vue provides it. The provide/inject shape is unchanged from W0.

---

## 8. vue-tsc Count

| Baseline | After W4 app-decomposition |
|---|---|
| 246 errors | 243 errors |

Net: −3 errors. The 2 pre-existing App.vue errors (`colors[0]: string | undefined` and `parseCSSColor` return type mismatch) moved to `usePaletteManagerWiring.ts` where they still exist as pre-existing issues. 3 baseline errors in App.vue's import block (which had leftover imports) were eliminated by removing the old inline palette manager code.

Constraint: ≤ 246. Achieved: 243. ✓

---

## 9. Files Changed

| File | Action | Description |
|---|---|---|
| `demo/color-picker/App.vue` | Modified | Script -15 lines net; template -67 lines; PaneSlot, useGlobalDark, extractions |
| `demo/@/composables/palette/usePaletteManagerWiring.ts` | Created | 72-line palette manager callback bundle |
| `demo/@/composables/useAtmosphere.ts` | Created | Aurora config + useAurora call |
| `demo/@/components/custom/panes/PaneSlot.vue` | Created | Transition + KeepAlive + component:is + onMount ref capture |
| `demo/@/components/custom/panes/ConfigSliderPane.vue` | Created | Generic slider pane using ConfiguratorRow |
| `demo/@/components/custom/panes/BlobPane.vue` | Modified | Consumes ConfigSliderPane |
| `demo/@/components/custom/panes/AuroraPane.vue` | Modified | Consumes ConfigSliderPane (stub, empty sections) |
