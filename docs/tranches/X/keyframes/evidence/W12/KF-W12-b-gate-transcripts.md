SERVED MODEL: claude-fable-5-1

# KF.W12.b — close-of-unit gate transcripts · 2026-09-19 · keyframes.js `2cd314af`

All readings at the unit's close sha, each command run twice where a count is published (WRITE-THEN-MEASURE); both runs agreed.

## The unit's commits (kf), in landing order

```
⟨cmd⟩ git log --oneline bf4a9a9c..HEAD | grep 'X.KF.W12.b'
2cd314af test(kf/options · X.KF.W12.b · G-KFW12-2): …
cbd87a85 fix(kf/options · X.KF.W12.b · D-B1 inset via :style): …
7ff3acfa feat(kf/options · X.KF.W12.b · useEasingPickerSeat under the split-seam cure-lock — KF-TFP-1 ≡ KF-ES-12, one composable, two seats): …
b67dae6f chore(kf/options · X.KF.W12.b · STEP 5 hygiene + LP-20): …
0e31d417 fix(kf/options · X.KF.W12.b · STEP 4 a11y inert + focus): …
fcafcff8 fix(kf/options · X.KF.W12.b · STEP 3 steps cluster): …
ebbc8259 fix(kf/options · X.KF.W12.b · STEP 2 persist/representation/authority): …
98675047 fix(kf/options · X.KF.W12.b · STEP 1 — KF-CO-1 ×4 + KF-CO-8 + LP-1, capability restorations ON the render edge): …
```

```
⟨cmd⟩ for s in 98675047 ebbc8259 fcafcff8 0e31d417 b67dae6f 7ff3acfa cbd87a85 2cd314af; do git show --stat --format='%h' $s; done   (files only)
98675047  ChannelOptions.vue | LayerConfigPanel.vue | ControlsPaneWrapper.vue
ebbc8259  ChannelOptions.vue | TimingFunctionPanel.vue | composables/useTimingFunctionEditor.ts
fcafcff8  ChannelOptions.vue | TimingFunctionPanel.vue | composables/useTimingFunctionEditor.ts
0e31d417  ChannelControls.vue | ChannelOptions.vue | TimingFunctionPanel.vue
b67dae6f  ChannelOptions.vue | LayerConfigPanel.vue | composables/useTimingFunctionEditor.ts
7ff3acfa  TimingFunctionPanel.vue | composables/useEasingPickerSeat.ts (new) | demo/scenes/easing/EasingSidebar.vue
cbd87a85  ControlsPaneWrapper.css | ControlsPaneWrapper.vue
2cd314af  test/demo/instrument/channel-options-render-edge.test.ts (new)
```

Every path above is inside the unit's writable set; no other path was staged (pathspec on `add` AND on `commit`).

## G-KFW12-2 — byte clauses

```
⟨cmd⟩ grep -rc ':is-open' demo/components/instrument/transport/channel-controls/ demo/scenes/easing/EasingSidebar.vue demo/components/instrument/transport/controls-pane/ | grep -v ':0$'
(no output)                                   ← 4 → 0
⟨cmd⟩ grep -rc '@update:checked' demo/components/instrument/transport/channel-controls/ | grep -v ':0$'
(no output)                                   ← 1 → 0
⟨cmd⟩ grep -c 'tooltip=\|label-class=\|:descriptions=' demo/components/instrument/transport/channel-controls/ChannelOptions.vue demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue
ChannelOptions.vue:0
LayerConfigPanel.vue:0                        ← 18 attributes → 0 (KF-CO-2 / LP-4 / KF-CO-47)
⟨cmd⟩ grep -rn 'container-name' demo | cut -c1-100
demo/components/instrument/transport/AnimationControlsGroup.css:26:    container-name: controls-layout;
demo/components/instrument/transport/channel-controls/composables/useEasingPickerSeat.ts:100:     * (a comment)
                                              ← the two `easing-editor` declarations → 0 (KF-ES-18)
```

## G-KFW12-2 — runtime clause

```
⟨cmd⟩ npx vitest run --project demo test/demo/instrument/channel-options-render-edge.test.ts   (×2)
 Test Files  1 passed (1)
      Tests  5 passed (5)
```

## §0u ratchet — vue-tsc

```
⟨cmd⟩ npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | grep -c .   (×2)
16
⟨cmd⟩ npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS' | sed 's/: error.*//' | sort
demo/app/dock/MbabbMenu.vue(208,12)
demo/app/dock/MbabbMenu.vue(208,36)
demo/components/instrument/keyframes/KeyframesEditor.vue(445,39)
demo/components/instrument/keyframes/KeyframesEditor.vue(446,37)
demo/components/instrument/keyframes/KeyframesStringControls.vue(54,9)
demo/components/instrument/keyframes/KeyframesStringControls.vue(75,5)
demo/components/instrument/keyframes/composables/useKeyframeOps.ts(80,13)
demo/components/instrument/shell/EditorShell.vue(175,10)
demo/components/instrument/transport/TransportDock.vue(276,7)
demo/components/instrument/transport/TransportDock.vue(366,9)
demo/components/instrument/transport/TransportDock.vue(95,34)
demo/scenes/easing/useEasingDemo.ts(294,13)
demo/scenes/easing/useEasingDemo.ts(310,43)
src/animation/group/composite/compositor.ts(79,11)
src/animation/group/waapi.ts(9,1)
src/animation/physics/smooth.ts(194,13)
```

Baseline 24 → 16. ZERO diagnostics remain in any file of this unit's writable set (`channel-controls/**`, `controls-pane/**`, `EasingSidebar.vue`); the 8 that were there (`useTimingFunctionEditor.ts` ×3 · `ChannelOptions.vue` ×1 · `LayerConfigPanel.vue` ×1 · `TimingFunctionPanel.vue` ×1 · `ChannelControls.vue` ×1 · `EasingSidebar.vue` ×1) fell with the cures that own them — no `as`, no `@ts-expect-error`, no `// eslint-disable` written anywhere in this unit. The 16 that remain are `.a`/`.c`/`.e`'s rows and the out-of-wave rows, byte-identical to the baseline listing minus this unit's 8 (the two `KeyframesEditor.vue` diagnostics the `.a` seat closed during this sitting are not counted as this unit's).

## Whole demo project

```
⟨cmd⟩ npm run test:demo   (×2, identical)
 FAIL  |demo| test/demo/scenes/spring-trace-truth.test.ts > SpringTrace — the ceiling's coupling to the ζ floor (L-14, documented AND enforced) > (4b) the floor the heatmap declares is not below the one the plot pins
 Test Files  1 failed | 49 passed (50)
      Tests  1 failed | 428 passed (429)
```

The sole failure is KF.W11's inherited honest-RED (KF11-E(j1); `SpringHeatmap.vue no longer declares DAMPING_MIN` — the sibling `.f`/W11 row), unchanged from the record's baseline. Baseline was 48 files / 415 tests; the two new files are this unit's gate (5 tests) and the `.a` seat's `keyframe-card-offset-loop.test.ts` (which went GREEN during this sitting).

## Hygiene

```
⟨cmd⟩ git diff --check → clean (at every commit)
⟨cmd⟩ npx eslint <the unit's six demo files + the test> → 0 errors on ChannelOptions.vue · ChannelControls.vue · LayerConfigPanel.vue · useTimingFunctionEditor.ts · useEasingPickerSeat.ts · EasingSidebar.vue · the test
   TimingFunctionPanel.vue: 3 × vue/no-mutating-props (the store-leaf prop mutation — baseline had 4 at this file; STEP 3 removed the `animation` prop mutation; the remaining 3 are KF-CO-45's carried getter-threading question, not introduced here)
   ControlsPaneWrapper.vue: 3 × vue/no-mutating-props — all pre-existing at bf4a9a9c (⟨cmd⟩ `git show bf4a9a9c:<path> | npx eslint --stdin --stdin-filename <path>` → the same 3), none on this unit's lines
⟨cmd⟩ npx prettier --check LayerConfigPanel.vue useEasingPickerSeat.ts channel-options-render-edge.test.ts → "All matched files use Prettier code style!"
```
