# Tranche A — Ae: Component Structure + Blob/Aurora Subsystem Audit

Scope: `demo/color-picker/`, `demo/@/`, and the demo's consumption of `@mkbabb/glass-ui`
metaballs + aurora subpaths. glass-ui is symlinked at `node_modules/@mkbabb/glass-ui`
→ `/Users/mkbabb/Programming/glass-ui`.

Evidence is cited `file:line`. Findings carry IDs `Ae-1`…`Ae-N`. Demo-side and
glass-ui-side action lists close the document.

---

## PART 1 — Component structure

### Ae-1 — `Dock.vue` is a god-component (426 lines)

`demo/@/components/custom/dock/Dock.vue` is 426 lines: a ~169-line `<script setup>`
plus a ~222-line template. It orchestrates five concerns that have no shared state
beyond the dock shell.

Concrete load:
- Five `DockLayer`s inside one `DockLayerGroup` — `mobile-edit`, `slug-edit`,
  `action-bar`, `main`, plus the `#collapsed` slot (`Dock.vue:177-389`).
- Eight `watch` calls (`Dock.vue:71`, `78`, `100`, `106`, `145`, `151`, `156`, `163`)
  spanning admin-mode sync, logout teardown, action-bar visibility, dock keep-open,
  slug-edit reset, edit keep-open, popup mutex, and layer dispatch.
- Four `usePopupMutex` models (`Dock.vue:132-136`): `view-select`, `mobile-menu`,
  `profile-menu`, `mbabb-menu`.
- A nested reka-ui `<Select>` with two inline-authored admin-toggle `SelectItem`
  branches (`Dock.vue:232-301`), each duplicating the dot+icon+label markup that
  the `v-for` over `viewEntries` already produces (`Dock.vue:253-271`).
- Admin-mode state machine: `isAdminMode` ref, `userViews`/`adminViews` arrays,
  `toggleAdminMode`, `onViewChange` with a `"__admin_toggle__"` magic string
  (`Dock.vue:49-90`).

Split proposal:
- `useDockLayers()` composable — owns `activeLayer` plus the `mobileEditActive` /
  `slugEditMode` / `actionBarLayerActive` triple and the dispatch `watch`
  (`Dock.vue:162-168`). Removes one watcher and three refs from the SFC.
- `useDockAdminMode()` composable — `isAdminMode`, `userViews`/`adminViews`,
  `viewEntries`, `toggleAdminMode`, the two admin-sync watchers (`Dock.vue:71-80`).
- `DockViewSelect.vue` — the entire `<Select>` block (`Dock.vue:232-301`). The
  admin-toggle item becomes one row in a derived `viewEntries` list (a flag on the
  entry), deleting the two duplicated `SelectItem` branches.
- `DockMainLayer.vue` — wraps the `main` `DockLayer` body so `Dock.vue` is reduced
  to a layer-group shell. Target: `Dock.vue` ≤ ~120 lines.

### Ae-2 — `App.vue` carries a 274-line script of unrelated wiring (393 lines)

`demo/color-picker/App.vue` is 393 lines. The `<script setup>` (`App.vue:133-342`)
mixes seven independent subsystems: color model, edit target, view manager, generic
action bar, mobile pane routing, palette manager, share link, URL sync, the Aurora
atmosphere, and the blob config. The `usePaletteManager` call alone spans
`App.vue:226-298` — 72 lines of inline `emitAddColor`/`emitStartEdit` callbacks,
including a 25-line color-dedup block (`App.vue:243-264`) that belongs in a
composable.

Split proposal:
- `usePaletteManagerWiring(...)` — moves the `App.vue:226-298` callback bundle out.
  The `emitAddColor` dedup logic (`App.vue:243-264`) is color-model work, not
  app-shell work; it should live next to `useAppColorModel`.
- `useAtmosphere(atmosphereCanvas, cssColorOpaque)` — owns the Aurora config +
  `useAurora` call (`App.vue:319-334`). See Ae-7/Ae-8: this block is currently
  broken and must be rewritten regardless.
- After extraction `App.vue` script drops to ~150 lines of pure composition.

### Ae-3 — Triple-nested transition/keep-alive/dynamic-component dispatch in `App.vue`

The pane region repeats the same three-deep wrapper pattern three times — mobile
slot, desktop-left, desktop-right (`App.vue:27-120`):

```
<div class="lg:hidden ...">
  <Transition :name="...">
    <KeepAlive :max="5">
      <component :is="mobileComponent" :key="mobileKey" v-bind="mobileProps" />
```

Desktop-left (`App.vue:40-87`) and desktop-right (`App.vue:90-120`) instead inline a
long `v-if`/`v-else-if` chain inside the `KeepAlive` — six branches left, four right
— while the mobile slot already resolves the same routing through
`useMobilePaneRouter`. Two routing mechanisms exist for one routing problem: a
`component :is` table for mobile and a hand-written `v-if` ladder for desktop.

Proposal: a `<PaneSlot :side="...">` component wrapping `Transition` + `KeepAlive` +
`component :is`, fed by one shared route table that `useMobilePaneRouter` already
half-implements. Collapses ~95 lines of template to ~3 elements and deletes the
desktop `v-if` ladder.

### Ae-4 — Inert single-child wrapper divs

- `App.vue:5-8` — the atmosphere `<canvas>` is the sole child of `.app-layout` and
  is `position:absolute inset-0`; the surrounding pane structure already establishes
  the stacking context. The canvas needs no wrapper but the layout div nests it
  three levels under `.app-layout` → `.pane-container` siblings.
- `App.vue:90-93` — the desktop-right `pane-wrapper` div carries an inline
  `:style` that toggles `visibility/position/pointer-events/opacity` as a string.
  This is a five-property style hack better expressed as a class.
- `PaneSegmentedControl.vue` (whole file, 34 lines) is a single `<div>` wrapping one
  `<BouncyTabs variant="pill">`. See Ae-5.

### Ae-5 — Duplicated mobile-pane-toggle: `PaneSegmentedControl.vue` vs `Dock.vue`

`demo/@/components/custom/panes/PaneSegmentedControl.vue` and the inline block at
`Dock.vue:335-344` are the same control. Both render:

```
<BouncyTabs variant="pill" class="font-display"
  :options="[{label: leftLabel, value:'0'}, {label: rightLabel, value:'1'}]"
  :model-value="String(...)" @update:model-value="... Number(v) as 0|1" />
```

`PaneSegmentedControl.vue` derives `tabOptions` from `leftLabel`/`rightLabel` props;
`Dock.vue:338-341` builds the identical array inline from
`viewManager.currentConfig.value.leftLabel/rightLabel`. One component should own this
— `PaneSegmentedControl.vue` consumed in both places, or both deleted in favour of a
glass-ui primitive (see Ae-14).

### Ae-6 — `AuroraPane.vue` and `BlobPane.vue` are the same slider-pane component

`demo/@/components/custom/panes/AuroraPane.vue` (232 lines) and `BlobPane.vue`
(186 lines) are near-identical. Both:
- inject a reactive config (`AuroraPane.vue:13`, `BlobPane.vue:13`),
- declare a `NumericKey` mapped type, a `SliderDef` interface, and section arrays
  (`AuroraPane.vue:38-86`, `BlobPane.vue:15-77`),
- render `SECTIONS → section → SliderDef` with the exact same template
  (`AuroraPane.vue:154-185`, `BlobPane.vue:108-138`),
- carry identical `update`, `fmt`, `copyAsJson`, `resetDefaults` functions
  (`AuroraPane.vue:88-106`, `BlobPane.vue:79-97`),
- carry byte-identical `<style scoped>` blocks (`config-section-header`,
  `config-section-title`, `config-dock-anchor`).

The only real difference is the two `<Select>` rows in `AuroraPane.vue:118-151`.
This is one `ConfigSliderPane` component parameterized by `{ config, sections,
defaults, extraControls? }`. It deletes ~150 duplicated lines and — given Ae-14 —
the duplicated style block belongs in glass-ui as a config-pane primitive.

---

## PART 2 — Blob + Aurora subsystem

### A. The GooBlob bespoke system

Inventory — `demo/@/components/custom/goo-blob/` (1248 lines total):

| File | Lines | Role |
|---|---|---|
| `GooBlob.vue` | 123 | SFC: canvas + wrapper, wires the four composables, exposes `nudge`/`setMood` |
| `types.ts` | 135 | `BlobMood`, `MoodParams`, `MetaballSource`, `SatelliteInternal`, `BlobConfig`, `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY` |
| `index.ts` | 3 | barrel |
| `composables/useMetaballRenderer.ts` | 319 | WebGL2 lifecycle, uniform upload, CSS-color→RGB resolver, reduced-motion, context-loss recovery |
| `composables/useBlobMood.ts` | 136 | 5-mood FSM with eased per-param interpolation |
| `composables/useBlobSatellites.ts` | 294 | seeded orbit/merge/absorb/emerge satellite state machine |
| `composables/useBlobPointer.ts` | 69 | normalized pointer tracking with exponential smoothing |
| `shaders/metaball.frag.glsl` | 160 | SDF smooth-union metaballs, FBM surface noise, HSV color perturbation |
| `shaders/metaball.vert.glsl` | 9 | fullscreen-quad passthrough |

What it does that glass-ui's blob system does NOT:

1. **Affective mood FSM** (`useBlobMood.ts`). Five moods — `idle`, `happy`,
   `curious`, `sleepy`, `excited` — each a full `MoodParams` target
   (`useBlobMood.ts:4-70`). `setMood` cross-fades 11 parameters with `easeInOut`
   over per-mood `TRANSITION_MS` durations (`useBlobMood.ts:72-78`, `111-128`).
   glass-ui `useMetaballs` has no mood concept.

2. **Satellite orbit state machine** (`useBlobSatellites.ts`). Per-satellite phase
   cycle `orbiting → merging → absorbed → emerging` with seeded randomization,
   merge-stagger gating, eased phase blends, and a 2-second orbit-blend window to
   kill the snap on re-entry (`useBlobSatellites.ts:166-278`, constant
   `ORBIT_BLEND_MS` at line 107). glass-ui blobs are independent — they orbit on
   fixed irrational-ratio paths (`useMetaballs.ts:309-332`) and never merge,
   absorb, or re-emerge.

3. **Pointer-driven affect** (`useBlobPointer.ts` + frag uniforms). Pointer is
   normalized to element-local `[-1,1]`, exponentially smoothed, decays to centre
   on leave (`useBlobPointer.ts:52-62`), and feeds `uPointer` / `uPointerActive` /
   `uPointerAttraction` / `uPointerStrength` (`useMetaballRenderer.ts:184-188`). The
   shader bends the body toward (or away from) the pointer. glass-ui `useMetaballs`
   takes no pointer input at all.

4. **Per-pixel HSV color perturbation** — the frag shader perturbs hue/sat/value via
   noise (`uHueRange`, `uSatShift`, `uBrightnessShift`, `uColorNoiseFreq/Speed`,
   `metaball.frag.glsl:30-39`). glass-ui's shader assigns one flat `u_colors[i]` per
   blob with no per-pixel perturbation (`shaders.ts` `FRAGMENT_SHADER`).

5. **Single-blob-with-satellites topology**. GooBlob renders one `uBodyRadius` body
   plus up to `MAX_SATS = 4` satellites (`useMetaballRenderer.ts:10`) at a 1.6×
   overflow canvas with `POS_SCALE = 1/1.6` (`useMetaballRenderer.ts:19`). glass-ui
   is a flat field of up to `MAX_BLOBS = 16` peer blobs (`useMetaballs.ts:72`) — no
   primary/satellite hierarchy.

6. **Arbitrary CSS-color input**. GooBlob resolves any CSS color (`lab`, `oklch`,
   `hsl`, hex…) through a 1×1 canvas-2D context (`useMetaballRenderer.ts:44-60`).
   glass-ui has a `cssColorToRgb` too (`useMetaballs.ts:22-32`) so this is **not**
   unique — see pure duplication below.

7. **Reduced-motion single-frame render** plus **WebGL context-loss recovery**
   (`useMetaballRenderer.ts:255-279`). glass-ui handles reduced-motion by freezing
   the time cursor (`useMetaballs.ts:305`) but has no `webglcontextlost`/`restored`
   listener.

Pure duplication (GooBlob reimplements what glass-ui already ships):

- **WebGL boilerplate.** `compileShader`, `linkProgram`, quad VAO setup, uniform
  resolution — GooBlob routes through `@lib/animation/webgl-utils`
  (`useMetaballRenderer.ts:2`); glass-ui has its own `compileShader`/`linkProgram`
  (`useMetaballs.ts:34-70`). Same code, two homes.
- **`cssColorToRgb` via 1×1 canvas.** `useMetaballRenderer.ts:44-60` ≈
  `useMetaballs.ts:22-32`.
- **`ResizeObserver` + DPR-capped resize.** `useMetaballRenderer.ts:136-149` ≈
  `useMetaballs.ts:270-279` (GooBlob caps DPR at 2, glass-ui at 1.5).
- **`prefers-reduced-motion` handling.** Both implement it independently.
- **The SDF metaball fragment shader core** (density field, smooth-union,
  threshold→alpha). The math differs in detail — GooBlob uses `smin`, glass-ui uses
  inverse-square summation — but both solve the identical metaball-rendering
  problem.

Net: of ~1248 GooBlob lines, the WebGL lifecycle (~250 lines of
`useMetaballRenderer.ts`) and the color resolver are duplication. The mood FSM
(136), satellite FSM (294), pointer affect (69), and the perturbation shader are
genuinely unique behavior with no glass-ui equivalent.

### B. The demo's Aurora usage is built against a deleted schema

The demo imports `AuroraConfig` from `@mkbabb/glass-ui/aurora` (`App.vue:161`,
`AuroraPane.vue:10`) and constructs it with fields that **no longer exist**.

Real current `AuroraConfig` (glass-ui `aurora/presets.ts:68-106`) — Aurora v4.1:
`palette: OklchStop[]`, `nuclei: AuroraNucleus[]`, `softmaxBeta`, `valueVariance`,
`warpAmount`, `warpScale`, `warpDrift`, `warpMode`, `noiseOctaves`, `medium`,
`flow: AuroraFlow`, `strokeAmount`, `strokeScale`, `strokeAnisotropy`,
`strokeLayers`, `strokeMode`, `wetEdge`, `granulation`, `impasto`, `brokenColor`,
`canvasGrain`, `nucleiDrift`, `paletteDrift`, `breathDepth`, `breathPeriod`,
`saturation`, `paperGrain`, `alpha`.

Stale fields the demo writes (`App.vue:321-332`) — every one is gone:

| Demo field | Status |
|---|---|
| `colorMode: "derived"` | deleted (old `useAuroraBlobs` API) |
| `colors: []` | deleted — replaced by `palette: OklchStop[]` |
| `surfaceMode`, `surfaceAlpha` | deleted |
| `blur` | deleted |
| `speed` | deleted (motion is now `breathPeriod`/`nucleiDrift`/`paletteDrift`) |
| `blobCount` | deleted — Aurora has `nuclei`, not blobs |
| `baseRadius`, `radiusVariance` | deleted — `AuroraNucleus.radius` is per-nucleus |
| `viewportAnchorRatio` | deleted |
| `alphaLight`, `alphaDark` | deleted — single `alpha` now |
| `lShiftLarge/Small`, `hueShiftLarge/Small` | deleted |
| `orbitAmplitude` | deleted — drift is `driftRadius`/`nucleiDrift` |
| `blendMode` | deleted |
| `gradStop2/3/4` | deleted |

This `reactive<AuroraConfig>({...})` literal at `App.vue:321-332` would not
type-check against the real interface — `AuroraConfig` requires `palette`, `nuclei`,
`softmaxBeta`, `warpAmount`, `medium`, `flow`, etc., none of which are supplied.

### Ae-7 — `useAurora` is called with the wrong signature

`App.vue:333`:

```js
const { config: auroraConfigResult } = useAurora(atmosphereCanvas, auroraConfig, cssColorOpaque);
```

The real signature (`glass-ui aurora/composables/useAurora.ts:38-42`):

```ts
useAurora(canvasRef, configSource, runtimeOptions: AuroraRuntimeOptions = {}): UseAuroraReturn
```

Two faults:
1. Third argument. The demo passes `cssColorOpaque` (a color string ref) where
   `AuroraRuntimeOptions` is expected — an object of `{ mode?, preserveDrawingBuffer?,
   onInitError? }` (`runtime.ts:43-58`). The composable will treat the color ref as
   an options object; `runtimeOptions.onInitError` reads `undefined`, so this
   silently does the wrong thing rather than crashing.
2. Return destructure. `useAurora` returns `UseAuroraReturn` —
   `{ setCursor, clearCursor, setCursorRadius, renderAt, pause, resume }`
   (`useAurora.ts:19-26`). There is **no `config` field**. `auroraConfigResult` is
   `undefined`, and `App.vue:334` provides `undefined` under the `"auroraConfig"`
   injection key.

### Ae-8 — `AuroraPane.vue` injects and mutates a phantom config

`AuroraPane.vue:13` does `inject<AuroraConfig>("auroraConfig")!` — the non-null
assertion masks that App provides `undefined` (Ae-7). Every slider in
`AuroraPane.vue` (`BLOBS`, `MOTION`, `COLOR_SHIFTS`, `SURFACE`, `GRADIENT`,
`AuroraPane.vue:48-78`) targets a deleted field. `VALUE_JS_DEFAULTS`
(`AuroraPane.vue:15-36`) restates the same stale schema. `update()`
(`AuroraPane.vue:88-90`) writes to keys that the runtime never reads. The two
`<Select>` rows bind `cfg.colorMode` / `cfg.surfaceMode` (`AuroraPane.vue:123`,
`139`) — both deleted. The entire pane is dead UI: it mutates an object the Aurora
runtime ignores, and at runtime `cfg` is `undefined` so the first `cfg.colorMode`
read throws.

### Ae-9 — The atmosphere canvas is never colored by the picker

`App.vue:5-8` mounts `<canvas ref="atmosphereCanvas">`. Aurora derives color from
`AuroraConfig.palette` (`OklchStop[]`). The demo wants the atmosphere to track the
picker color (`cssColorOpaque`), but with the v4.1 API there is no `colorMode:
"derived"` and no color input to `useAurora` — color must be written into
`config.palette`. The demo passes `cssColorOpaque` as a stray third arg (Ae-7) that
does nothing. The atmosphere is effectively a static unconfigured canvas.

### C. Abstraction gaps — what glass-ui's blob/aurora APIs lack

To delete GooBlob and consume `@mkbabb/glass-ui/metaballs`, glass-ui's
`MetaballCanvas` / `useMetaballs` would need:

### Ae-10 — glass-ui metaballs lacks affect/mood, satellites, and pointer input

`MetaballConfig` (`glass-ui metaballs/types.ts:1-18`) is 8 flat fields:
`blobCount`, `speed`, `threshold`, `baseRadius`, `orbitAmplitude`, `colors`,
`bgAlpha`, `edgeSoftness`. To host GooBlob's behavior the library needs:

- **A primary-blob + satellites topology.** Add `MetaballConfig.satellites?:
  { count, radius, orbitRadius, eccentricity }` plus a primary `bodyRadius`, or a
  second component `<MetaballBlob>` that composes one body + N satellites. Today
  every blob is a peer.
- **A pluggable per-frame position provider.** GooBlob's satellite FSM
  (`useBlobSatellites.ts`) computes positions externally. Expose
  `useMetaballs(canvasRef, config, { positionSource?: (now) => BlobFrame[] })`
  so a consumer can drive blob positions/radii/opacity each frame instead of the
  built-in irrational-ratio orbit. This single hook lets the demo keep its FSM and
  drop `useMetaballRenderer`.
- **Pointer input.** Add `MetaballConfig.pointer?: { attraction, strength }` and a
  `<MetaballCanvas @pointer-active>` / `setPointer(x,y)` imperative method, or
  accept a `pointer: Ref<{x,y,active}>`. The shader needs `uPointer*` uniforms.
- **A mood/preset cross-fade layer.** Add `useMetaballMood(targets:
  Record<string, Partial<MetaballConfig>>)` returning `{ setMood, params }` that
  eased-interpolates config fields — the generic form of `useBlobMood`. Or expose
  `MetaballCanvas`'s config as deeply reactive (it already is via `isReactive`
  passthrough, `useMetaballs.ts:127-129`) and ship the cross-fade as a separate
  `useConfigTween` util.
- **Per-pixel HSV perturbation.** Add `MetaballConfig.colorPerturbation?:
  { hueRange, satShift, valueShift, noiseFreq, noiseSpeed }`. The current shader
  paints flat per-blob color.
- **WebGL context-loss recovery.** `useMetaballs` has none; GooBlob does
  (`useMetaballRenderer.ts:262-279`). Add `webglcontextlost`/`restored` handling
  inside `useMetaballs` so consumers don't need to.
- **Per-instance opacity.** Satellites fade in/out (`MetaballSource.opacity`).
  glass-ui's `u_positions` is `vec3` (x,y,r) with no alpha. Add a per-blob opacity
  channel.

Given Ae-10's size, the realistic path is: glass-ui adds the `positionSource` hook +
pointer input + perturbation config, and the demo keeps `useBlobMood` /
`useBlobSatellites` (genuinely app-specific affect) as thin composables feeding that
hook. That deletes `useMetaballRenderer.ts` (~319 lines, the pure-duplication core)
and the demo's shader, while the mood/satellite FSMs survive as the library's
`positionSource` callback.

### Ae-11 — glass-ui Aurora lacks a single-color "derive palette from one color" path

The demo's atmosphere use case is: one picker color drives the whole background.
Aurora v4.1 only accepts a full `OklchStop[]` palette plus `AuroraNucleus[]`
(`presets.ts:68-106`). glass-ui exports `cssToOklch` and `hexToOklchStop`
(`aurora/index.ts:23-29`) so a consumer *can* build a palette, but there is no
first-class "one color → atmosphere" entry. Proposed additions:

- A helper `deriveAuroraPalette(baseColor: string, opts?: { count?, lSpread?,
  hueSpread? }): OklchStop[]` in `@mkbabb/glass-ui/aurora` — the library already has
  the OKLCH machinery; this packages the demo's intent (one accent → a coherent
  multi-stop palette).
- Optionally a `<Aurora :base-color="...">` convenience prop that internally calls
  `deriveAuroraPalette` when `config.palette` is omitted.

### Ae-12 — Aurora cursor interaction is wired separately from the canvas

`useAurora` deliberately does not wire pointer events (`Aurora.vue` doc comment,
lines 10-13); `useCursorInteraction` is a separate composable
(`aurora/composables/useCursorInteraction.ts`). For the demo's atmosphere there is
no cursor need, so this is acceptable — but if the demo ever wants the atmosphere to
react to pointer, it must wire `useCursorInteraction` against the stage element
itself. Worth noting as a known seam, not a blocker.

### D. glass-ui cohesion gaps — primitives the demo reimplements locally

### Ae-13 — `WatercolorDot` is a demo-local organic-blob primitive

`demo/@/components/custom/watercolor-dot/` (`WatercolorDot.vue` +
`composables/useWatercolorBlob.ts`) is a seeded-PRNG animated blob button used by 11
demo files (Dock, EditDrawer, SpectrumCanvas, MixResultDisplay, MixSourceSelector,
ImageEyedropper, CurrentPaletteEditor, PaletteDialogHeader, SwatchHoverMenu, and the
component itself). It is a generic "organic color swatch" primitive with no
color-picker-specific logic. glass-ui ships metaballs and aurora WebGL blobs but no
lightweight CSS/SVG organic-dot primitive. Proposed: `@mkbabb/glass-ui/blob-dot`
exporting `BlobDot` (the seeded Mulberry32 + sinusoidal blob is library-grade).

### Ae-14 — The config-slider pane is a demo-local pattern that belongs in glass-ui

`AuroraPane.vue` and `BlobPane.vue` (Ae-6) both hand-build a "section → labelled
slider" tuning panel with a copy-JSON / reset floating dock. This is exactly the
shape of glass-ui's own `Configurator` story surface (referenced in
`useMetaballs.ts:32` comments). glass-ui has no exported `ConfiguratorPane` /
`ConfigSliderGroup` primitive, so the demo reimplements it twice. Proposed glass-ui
primitive: `ConfigSliderPane` taking `{ config, sections: SliderSection[],
defaults, onCopyJson?, onReset? }`. This also removes the duplicated
`config-section-header` / `config-dock-anchor` CSS.

### Ae-15 — The demo uses reka-ui `Select` directly instead of a glass-ui Select

`Dock.vue:14-15` imports `Select`/`SelectContent`/`SelectItem`/… from
`@components/ui/select` (raw shadcn-vue), while elsewhere the demo consumes glass-ui
primitives (`DockSelectTrigger`, `BouncyTabs`, `GlassDock`). The dock's view
selector (`Dock.vue:232-301`) is a glass-styled select but built from raw reka-ui +
a glass trigger. Per the project's `feedback_glass_ui_first_class` memory rule,
glass-ui should expose a complete `Select` (content + items), not just
`DockSelectTrigger`, so the demo isn't half-on-the-library. This is a cohesion gap:
glass-ui ships the trigger but not the menu.

### Ae-16 — `PaneSegmentedControl` duplicates a glass-ui `BouncyTabs` usage

Covered in Ae-5. The demo wraps `BouncyTabs variant="pill"` in two places. Either
glass-ui's `BouncyTabs` is already the primitive (then delete
`PaneSegmentedControl.vue` and inline `BouncyTabs`), or the "0/1 mobile pane toggle"
is common enough to warrant a `BouncyTabs` preset. Low-cost; flag for glass-ui as a
question, fix demo-side regardless.

---

## (a) Prioritized demo-side action list

1. **Ae-7 / Ae-8 / Ae-9 — Fix the broken Aurora integration (highest, currently
   runtime-broken).** Rewrite `App.vue:319-334` against the real `AuroraConfig`
   v4.1: build `palette`/`nuclei` (deriving palette from `cssColorOpaque`),
   call `useAurora(canvas, () => config, {})` with a getter, drop the `{ config }`
   destructure. Rewrite `AuroraPane.vue` sliders to target real fields
   (`warpAmount`, `softmaxBeta`, `nucleiDrift`, `breathDepth`, `saturation`, …) or
   delete the pane until reworked. The non-null `inject(...)!` currently hides a
   crash.
2. **Ae-2 — Extract `App.vue` wiring** into `useAtmosphere` + `usePaletteManagerWiring`;
   move the color-dedup block to a color composable.
3. **Ae-1 — Decompose `Dock.vue`** into `useDockLayers` + `useDockAdminMode` +
   `DockViewSelect.vue` + `DockMainLayer.vue`.
4. **Ae-6 — Merge `AuroraPane.vue` + `BlobPane.vue`** into one `ConfigSliderPane`.
5. **Ae-3 — Introduce `<PaneSlot>`**; collapse the triple transition/keep-alive
   nesting and delete the desktop `v-if` ladder.
6. **Ae-5 / Ae-16 — Delete `PaneSegmentedControl.vue`** or consume it from `Dock.vue`;
   stop duplicating the `BouncyTabs` mobile toggle.
7. **Ae-4 — Remove inert wrapper divs**; convert `App.vue:90-93`'s inline 5-property
   style hack to a class.
8. **Ae-10 (demo half) — After glass-ui adds the `positionSource` hook**, delete
   `useMetaballRenderer.ts` + the demo shader; keep `useBlobMood` /
   `useBlobSatellites` as the library's position/perturbation source.

## (b) glass-ui-side gap list — hand to glass-ui's Q tranche

1. **Ae-10 — `@mkbabb/glass-ui/metaballs` extensions.** Add to `MetaballConfig`:
   `satellites?: { count, radius, orbitRadius, eccentricity }`, `bodyRadius`,
   `pointer?: { attraction, strength }`, `colorPerturbation?: { hueRange, satShift,
   valueShift, noiseFreq, noiseSpeed }`, and a per-blob `opacity` channel. Add
   `useMetaballs(canvasRef, config, { positionSource?: (now) => BlobFrame[] })` so
   consumers can drive blob frames. Add `webglcontextlost`/`restored` recovery
   inside `useMetaballs`. Ship `useMetaballMood`/`useConfigTween` as a generic
   eased-config-interpolation util. This lets the demo delete ~319 lines of
   `useMetaballRenderer.ts` plus its shader.
2. **Ae-11 — Aurora single-color path.** Export `deriveAuroraPalette(baseColor,
   opts?): OklchStop[]` from `@mkbabb/glass-ui/aurora`, and optionally an
   `<Aurora :base-color="...">` prop that derives `palette` when omitted. The
   demo's whole atmosphere use case is "one accent color → background."
3. **Ae-7 — Document/guard the `useAurora` signature change.** The deleted-schema
   breakage suggests the v4.1 `AuroraConfig` migration shipped without a consumer
   migration note. glass-ui should treat `AuroraConfig` field removals as breaking
   and surface a migration table; the demo here is silently building the v3 shape.
4. **Ae-13 — Ship an organic-dot primitive.** `@mkbabb/glass-ui/blob-dot` exporting
   `BlobDot` (seeded-PRNG + sinusoidal CSS/SVG blob). Eleven demo files reimplement
   `WatercolorDot` against this missing primitive.
5. **Ae-14 — Ship a `ConfigSliderPane` primitive.** A `{ config, sections,
   defaults, onCopyJson?, onReset? }` tuning panel. The demo builds it twice
   (`AuroraPane`, `BlobPane`) and glass-ui builds the same shape internally for
   `Configurator`.
6. **Ae-15 — Complete the glass Select.** glass-ui exports `DockSelectTrigger` but
   not the matching styled `Select`/`SelectContent`/`SelectItem`. The demo falls
   back to raw reka-ui, violating the glass-ui-first-class rule. Expose a full
   glass `Select` surface.
7. **Ae-16 — Consider a `BouncyTabs` two-pane-toggle preset** (open question, low
   priority).
