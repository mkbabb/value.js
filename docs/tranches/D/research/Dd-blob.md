# Dd — Blob extirpation + glass-ui blob/aurora augmentation plan

**Scope** (verbatim from Dd directive): "Full validation and extirpation of the
blob facilities — align, update, and augment the glass-ui blob facilities to be
what we require, and then remove the hard-coded bespoke versions herein to
leverage that. Perfect and refine our extant and basal implementations to be
better encapsulated, generalized, beautiful — same for aurora."

**Lane**: Dd — read-only research; no edits outside this file.
**Cross-repo SHAs read** (from B `coordination/Q.md`):
- value.js — branch `w.w2.1-value-js-prebuild` (tip of working tree).
- glass-ui — read at the current checkout under `/Users/mkbabb/Programming/glass-ui` (post-Q close; metaballs surface unchanged from `4b16de7` per `B coord §2a`).

**Inheritance**: this doc supersedes the `Ae-10` / `Ae-11` / `Ae-13` filings in
`tranches/A/research/Ae-structure-blob-aurora.md:310-388` and the matching rows
of `tranches/B/coordination/Q.md §3`. Both were planning artefacts; nothing was
written to glass-ui from the value.js side; the bespoke implementations live on.

---

## §1 — Bespoke `goo-blob/` surface

The `demo/@/components/custom/goo-blob/` subtree is the value.js metaball
renderer used solely by `HeroBlob.vue` (`color-picker/visual/HeroBlob.vue:5`).
Its split into "library-shaped" vs "app-specific" is unusually clean.

### §1.1 — Files and roles

| File | LoC | Role | Deletable post-extirpation? |
|---|---:|---|---|
| `GooBlob.vue` | 124 | Vue shell: canvas + wrapper, injects `BLOB_CONFIG_KEY`, instantiates the 4 composables, drop-shadow CSS via `--blob-color` | **Survives, slimmed.** Drop-shadow CSS stays. The 4-composable wiring collapses to one `useMetaballs(...)` call against glass-ui. |
| `index.ts` | 4 | Re-exports `GooBlob`, `BlobConfig`, `BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS` | Survives (subpath unchanged). |
| `types.ts` | 136 | `BlobMood`, `MoodParams`, `MetaballSource`, `SatellitePhase`, `SatelliteInternal`, `BlobConfig`, `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY` | **Half-deletable.** All shader-mirror fields (`bodyRadius`, `smoothK`, `noiseAmp`, …) move to a glass-ui `MetaballConfig` superset; only the satellite-FSM type stays. Mood types stay. |
| `shaders/metaball.frag.glsl` | 160 | Fragment shader: SDF smin metaballs, FBM displacement, HSV color perturbation, pointer deformation, per-satellite opacity | **DELETE.** Glass-ui owns the shader after augmentation. |
| `shaders/metaball.vert.glsl` | 9 | Trivial fullscreen vert | **DELETE.** Glass-ui already has the equivalent. |
| `composables/useMetaballRenderer.ts` | 333 | WebGL2 lifecycle + uniforms + RAF + resize + context-loss + visibility + RM + cssColorToRgb resolver | **DELETE ~280 lines.** The remaining ~50 lines (the per-frame uniform-pack and the `cssColorToRgb` helper) collapse into the glass-ui hook's `positionSource` / `colorPerturbation` config + a tiny `useColorRgb()` reactive util in the demo. |
| `composables/useBlobMood.ts` | 137 | 5-mood FSM with eased cross-fade between `MoodParams` snapshots | **SURVIVES.** App-specific affect; not library-shaped. |
| `composables/useBlobPointer.ts` | 70 | Smoothed pointer in `[-1, 1]` relative to wrapper | **SURVIVES.** Library could ship a generic `useNormalizedPointer(el)`; pointer-source pluggability via glass-ui is enough — see §4.1. |
| `composables/useBlobSatellites.ts` | 295 | Satellite FSM (orbiting/merging/absorbed/emerging) with per-blob orbit/wobble/perturbation; seeded mulberry32 RNG | **SURVIVES.** This is the canonical "position-source" callback — exactly the hook the library is missing. |

### §1.2 — Library-shaped surfaces (must move to glass-ui)

Annotated by file:line:

1. **WebGL2 lifecycle** — `useMetaballRenderer.ts:78-92, 95-135, 137-150, 246-313`. The block from `initGL()` through `destroy()` is a direct duplicate of glass-ui's `useMetaballs.ts:134-369` lifecycle, with one improvement (WebGL2 + VAO instead of WebGL1) and four extras: context-loss recovery (`useMetaballRenderer.ts:275-292`), tab-visibility pause (`:246-248, :262-263`), CSS-sized canvas tracking via clientWidth (`:140-148`), and dual-init (initial + post-restore).
2. **The shader** — `metaball.frag.glsl:1-160`. SDF circle + `smin`, FBM noise, RGB↔HSV conversions, pointer deformation, satellite loop with per-blob opacity, inner-edge glow. All seven features are absent from `glass-ui/.../shaders.ts:15-63` (which paints a flat per-blob color over a density field).
3. **Per-frame uniform pack** — `useMetaballRenderer.ts:152-244`. Reads from three sources (`config`, `mood.params`, `pointer.pointer`, `satellites.sources`) and writes 20 single-uniform + 12 array uniforms per frame. Two of the three sources (pointer + satellites) are values that the consumer wants to *provide*, not values the library should *generate*.
4. **`cssColorToRgb` resolver** — `useMetaballRenderer.ts:44-60`. A 1×1-canvas-2D-context CSS-color parser. Glass-ui has the same helper (`useMetaballs.ts:22-32`); both should consolidate into a glass-ui-exported `cssColorToRgb()` util (or the demo just calls value.js's own `parseCSSColor` once and feeds `vec3`).

### §1.3 — App-specific surfaces (stay demo-local)

- **Mood FSM** — `useBlobMood.ts:101-136`. Maps 5 named moods → `MoodParams` snapshots → eased cross-fade. The mood *taxonomy* is product-shaped (idle/happy/curious/sleepy/excited). The *mechanism* (named-preset cross-fade) is library-shaped but not on the critical Dd path — see §4.4.
- **Satellite FSM** — `useBlobSatellites.ts:24-294`. orbiting → merging → absorbed → emerging phases; seeded mulberry32 RNG; per-satellite wobble + eccentricity; merge-stagger gating. This *is* the position source. It feeds `MetaballSource[]` (`types.ts:19-24`) which is precisely the shape glass-ui needs for its `positionSource` hook.
- **HeroBlob affect wiring** — `color-picker/visual/HeroBlob.vue:36-94`. Idle-timer→sleepy; click→happy; rapid-color-change→excited (4 in 2s window). Product copy decisions. Stays.

### §1.4 — Quantified delete delta

If glass-ui ships §4's augmentation:
- **Delete**: `shaders/metaball.frag.glsl` (160), `shaders/metaball.vert.glsl` (9), `useMetaballRenderer.ts` ≈ 280 of 333 lines (the GL lifecycle + per-frame pack). **Total ≈ 449 LoC**.
- **Slim**: `useMetaballRenderer.ts` → ≈ 50 lines (a `positionSource` adapter + reactive color → `vec3` mapping); or **fully delete** if `GooBlob.vue` calls glass-ui directly with inline adapters.
- **Survive**: `useBlobMood.ts` (137), `useBlobPointer.ts` (70), `useBlobSatellites.ts` (295) — they become callback bodies feeding glass-ui's hooks.
- **Demo-side net**: ≈ −500 LoC, −2 GLSL files, −1 god composable.

---

## §2 — `watercolor-dot/` surface

A demo-local seeded-PRNG organic blob primitive — not WebGL, but a CSS
`border-radius` morph driven by an SVG `<feDisplacementMap>` filter.

### §2.1 — Files and roles

| File | LoC | Role |
|---|---:|---|
| `WatercolorDot.vue` | 108 | `<button>` or `<div>` with `background-color`, dynamic `border-radius`, `filter: url(#watercolor-filter)`, hover scale, focus-visible ring. Two animation modes: rAF-driven (`animate=true`) and CSS-transition (`animate=false`, hover-only morph). |
| `composables/useWatercolorBlob.ts` | 139 | Mulberry32 PRNG seeded by `color + seed`; 8 independent `VertexState` records, each with own duration + phase; `tick()` re-targets a vertex when its eased phase completes; emits two `border-radius` shorthand strings (`borderRadius` + `hoverBorderRadius`). |
| `index.ts` | 1 | re-export |
| `composables/prng.ts` (shared via `@composables/prng`) | 35 | `mulberry32`, `hashString` (djb2), `randomRadii`, `radiiToCSS` |

Depends externally on `demo/@/components/custom/svg-filters/SvgFilters.vue` (the
`#watercolor-filter` `<feTurbulence>` + `<feDisplacementMap>` defs).

### §2.2 — Consumers

`<WatercolorDot ...>` is used **16 times across 9 files** (the
`B coord §3` row says "11 consumers" — that count is from A's original Ae-13
audit and counted use-sites differently; the source of truth at Dd open is the
grep below):

| File | uses | call shape |
|---|---:|---|
| `demo/@/components/custom/mix/MixResultDisplay.vue:38,58` | 2 | result + reference dot |
| `demo/@/components/custom/mix/MixSourceSelector.vue:121,175` | 2 | source A / source B selectors |
| `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue:13` | 1 | sampled-color indicator |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:21` | 1 | current-color marker |
| `demo/@/components/custom/color-picker/editing/EditDrawer.vue:7,13` | 2 | original / new |
| `demo/@/components/custom/palette-browser/SwatchHoverMenu.vue:14,28` | 2 | hover swatch + edit-target |
| `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:16` | 1 | dialog header |
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:59,61` | 2 | edit-from + edit-to |
| `demo/@/components/custom/dock/Dock.vue:92,94,192` | 3 | edit-original/edit-new in dock + top-dock pill |

Total: **16 instances across 9 files**. (B coord's "11" figure stands as the
filed canonical count; record both.)

### §2.3 — Pipeline characterization

- **Seeded PRNG** — `mulberry32(hashString(color + seed))`. Same color+seed →
  same shape. Color change in non-animated mode triggers a re-seed and a new
  `border-radius` (`useWatercolorBlob.ts:55-63`).
- **8 vertices** — `border-radius: a% b% c% d% / e% f% g% h%` (the 8-value
  form). Each vertex animated independently with its own duration multiplier
  (`0.5..1.8 ×` `cycleDuration`) and phase offset; sinusoidal easing
  (`0.5 - 0.5·cos(πt)`). When a vertex's `t≥1`, its `to` re-randomizes within
  `range=[20,80]%` and a new duration is drawn. (`useWatercolorBlob.ts:71-109`)
- **Nudge** — for animated dots, hover or imperative `nudge()` retargets all 8
  vertices with a fast 25–50% cycle, producing a visible "jiggle". (`:115-126`)
- **Filter** — `filter: url(#watercolor-filter)` applies SVG
  `<feTurbulence baseFrequency=0.04 numOctaves=4>` +
  `<feDisplacementMap scale=1.5>` for the watercolor edge texture
  (`SvgFilters.vue:11-26`). Hover adds `brightness(1.05)`.

The primitive is **library-grade**: zero color-picker-specific logic, no
demo-state coupling, deterministic seeding by string → ideal `BlobDot` shape.

---

## §3 — Glass-ui `useMetaballs` API + ship gap

### §3.1 — Shipped surface (at glass-ui current checkout)

`@mkbabb/glass-ui/metaballs` exports:

| Export | Shape | Source |
|---|---|---|
| `MetaballCanvas` | Vue component — `<canvas v-if="isSupported" class="fixed inset-0 -z-10">` + `<slot name="fallback">`; takes `config?: MetaballConfig`; exposes `isReducedMotion` / `isReducedTransparency` readonly refs | `MetaballCanvas.vue:60-67` |
| `useMetaballs(canvasRef, config?)` | Composable. Returns `{ isSupported, isReducedMotion, isReducedTransparency }`. Mounts/unmounts via Vue lifecycle. | `useMetaballs.ts:122-373` |
| `isWebGLSupported()` | Sync probe — creates a throwaway canvas, attempts `webgl` ctx; returns boolean | `useMetaballs.ts:105-114` |
| `MetaballConfig` | 8 optional fields — `blobCount`, `speed`, `threshold`, `baseRadius`, `orbitAmplitude`, `colors[]`, `bgAlpha`, `edgeSoftness` | `types.ts:1-18` |
| `DEFAULT_METABALL_CONFIG` | Required-typed defaults — 8 blobs, `speed=0.08`, `threshold=1.0`, … | `types.ts:20-29` |

### §3.2 — Internal mechanism

- WebGL1 only (`getContext("webgl")` — `useMetaballs.ts:166`).
- Single fragment shader (`shaders.ts:15-63`): density field = sum of
  `r²/(dist² + ε)`; threshold + `smoothstep` for edge softness.
- Per-frame: irrational-ratio multi-frequency oscillation
  (`PHI`/`SQRT2`/`SQRT3`) → x/y/r per blob (`:281-332`). Positions are
  **library-generated, never consumer-supplied**.
- Zero-allocation per-frame uniform updates via pre-allocated `Float32Array`s
  + `gl.uniform3fv` (`:159-160, 219, 351`). Architecturally sound.
- Reduced-motion + reduced-transparency a11y wiring (`:140-147, 250-259,
  261-268, 305`). Solid.

### §3.3 — The five named gaps (verified vs `B coord §2a`)

These are the surfaces value.js needs that glass-ui does **not** ship. Each is
verified at the current glass-ui checkout (file:line evidence):

| # | Gap | Evidence (glass-ui) | Why value.js needs it |
|---|---|---|---|
| G1 | **`positionSource` hook** — a per-frame callback returning `vec3[]` (or richer per-blob frame). The hook must let the *consumer* drive blob positions/radii each frame, bypassing the built-in orbit. | `useMetaballs.ts:299-332` — positions are computed internally from `blobSeeds[]` and uploaded directly; no consumer hook | `useBlobSatellites.tick()` (`useBlobSatellites.ts:149-279`) is the canonical example: a per-frame FSM producing `MetaballSource[]`. Today the demo bypasses glass-ui entirely because there is no way to feed positions in. |
| G2 | **Pointer input** — a `pointer: Ref<{x,y,active}>` config or `<MetaballCanvas @pointer-active>` event + shader uniforms `uPointer` / `uPointerActive` / `uPointerAttraction` / `uPointerStrength` for SDF deformation. | `shaders.ts:15-63` — no pointer uniforms; `MetaballConfig` (`types.ts:1-18`) — no pointer field | The bespoke shader's pointer deformation (`metaball.frag.glsl:111-117`) is one of GooBlob's signature affordances. Without it, the metaball can't react to cursor proximity. |
| G3 | **Per-blob opacity** — extend `u_positions` from `vec3(x,y,r)` to `vec4(x,y,r,a)`, or add a parallel `u_opacities[]` array. | `useMetaballs.ts:159, 219, 329-331` — `posData = new Float32Array(MAX_BLOBS * 3)` (vec3) — no alpha channel | Satellite emerge/absorb phases (`useBlobSatellites.ts:262-269`) require fade-in/out via `MetaballSource.opacity` (`types.ts:23`). Glass-ui's density-threshold model has no concept of per-blob alpha. |
| G4 | **HSV color perturbation** — `MetaballConfig.colorPerturbation?: { hueRange, satShift, valueShift, noiseFreq, noiseSpeed }` + the matching FBM-driven HSV-shift block in the shader. | `shaders.ts:48-57` — color is `density-weighted blend`, flat per blob. No HSV perturbation, no FBM, no shader-side noise. | `metaball.frag.glsl:145-157` — per-pixel HSV jitter (driven by FBM noise) is the "organic, not plastic" character of GooBlob. Without it, blobs look procedurally clean rather than painted. |
| G5 | **Context-loss recovery** — `webglcontextlost` (preventDefault + cancel RAF) and `webglcontextrestored` (re-`init()`) listeners on the canvas. | `useMetaballs.ts:162-248, 356-366` — no `webglcontextlost`/`restored` handlers anywhere in init/dispose | The bespoke renderer has both (`useMetaballRenderer.ts:260-262, 275-292`). On a stable desktop this rarely fires; on iOS Safari / GPU-process recycle, missing this listener means a blank canvas until remount. |

### §3.4 — Additional gaps surfaced by Dd review (NEW filings)

Two gaps not in A's Ae-10 but worth filing:

| # | Gap | Evidence | Severity |
|---|---|---|---|
| G6 | **CSS-sized canvas (clientWidth tracking)** — the bespoke renderer uses `canvas.clientWidth` × `dpr` (`useMetaballRenderer.ts:139-148`); glass-ui sizes from `getBoundingClientRect()` (`useMetaballs.ts:270-279`). Equivalent for layout-sized canvases, but the glass-ui surface is hard-coded to `fixed inset-0` background mode (`MetaballCanvas.vue:64`). For a layout-mode metaball (the `<HeroBlob>` use case — a `7rem` square inline), glass-ui has no story. | `MetaballCanvas.vue:64` — `class="pointer-events-none fixed inset-0 -z-10 h-full w-full"` is hard-coded. Consumers can't override to inline-block. | Blocking for HeroBlob unless `MetaballCanvas` accepts a `mode?: "background" \| "layout"` prop or omits the `fixed inset-0` class so consumers control. |
| G7 | **Tab-visibility pause** — `document.hidden` should pause the RAF accumulator. | `useMetaballs.ts:299-354` — no `visibilitychange` listener; renders continuously while tab hidden. | Low — battery / power; not a correctness issue. |

The five Q.md §3 named gaps stand and gain two adjacent siblings (G6, G7).

---

## §4 — Glass-ui augmentation plan

The library must ship a superset `useMetaballs` that absorbs every gap from
§3.3+§3.4 while staying backwards-compatible with the current 8-field
`MetaballConfig` so existing consumers (the glass-ui story) keep working.

### §4.1 — Proposed signatures (pseudocode)

```ts
// glass-ui/src/components/custom/metaballs/types.ts — additions

/** Per-frame frame entry — what `positionSource` callbacks return.
 *  Backwards-compatible alias: `vec3` (x,y,r) packs into the first 3 fields
 *  with `opacity` defaulting to 1. */
export interface MetaballFrame {
    x: number;       // [0,1] in viewport-normalized UV (aspect already applied by lib)
    y: number;
    radius: number;  // viewport-fraction
    opacity?: number;  // [0,1], default 1 — G3
    colorIndex?: number; // optional per-frame color override (index into config.colors)
}

export interface MetaballPointerConfig {
    attraction: number;   // -1..1 (negative repels)
    strength: number;     // 0..0.3 (fraction of viewport)
}

export interface MetaballColorPerturbation {
    hueRange: number;       // degrees, 0..60
    satShift: number;       // -0.2..0.2
    valueShift: number;     // -0.15..0.15
    noiseFreq: number;      // 0.5..8
    noiseSpeed: number;     // 0..0.3
}

export interface MetaballConfig {
    // … existing 8 fields, unchanged …

    // G2 — pointer (config-side; consumer wires the ref via the hook options)
    pointer?: MetaballPointerConfig;

    // G4 — HSV perturbation
    colorPerturbation?: MetaballColorPerturbation;

    // G6 — mount mode (default 'background' preserves current behavior)
    mode?: "background" | "layout";
}

// glass-ui/src/components/custom/metaballs/useMetaballs.ts

export interface UseMetaballsOptions {
    /** G1 — per-frame consumer-driven positions. When set, the lib's built-in
     *  irrational-orbit generator is bypassed. The callback returns up to
     *  MAX_BLOBS frames; missing slots fade to opacity 0. */
    positionSource?: (now: number, dt: number) => readonly MetaballFrame[];

    /** G2 — live pointer ref (consumer-owned). null/undefined = inactive.
     *  Coordinates in [-0.5, 0.5] relative to canvas center. */
    pointer?: Ref<{ x: number; y: number; active: boolean } | null>;

    /** G7 — visibility-paused RAF. Default true. */
    pauseOnHidden?: boolean;
}

export function useMetaballs(
    canvasRef: Ref<HTMLCanvasElement | null>,
    config?: MetaballConfig,
    options?: UseMetaballsOptions,
): {
    isSupported: Ref<boolean>;
    isReducedMotion: Ref<boolean>;
    isReducedTransparency: Ref<boolean>;
    pause(): void;        // imperative override
    resume(): void;
};
```

### §4.2 — Shader changes (`glass-ui/.../shaders.ts`)

1. **G3** — change `u_positions` from `vec3[]` to `vec4[]` (x,y,r,a). The
   density contribution gates by `a` (zero-opacity blob contributes zero).
2. **G2** — add `uniform vec2 u_pointer; uniform float u_pointerActive;
   uniform float u_pointerAttraction; uniform float u_pointerStrength;` —
   distort the sample coord by the same `smoothstep(0.4, 0.0, dist) *
   attraction * strength` formula from `metaball.frag.glsl:111-117`.
3. **G4** — when `colorPerturbation` is enabled, after computing the
   density-weighted color, convert RGB→HSV, add `(fbm(uv*noiseFreq +
   t*noiseSpeed) - 0.5) * hueRange/360°` to hue plus the sat/value shifts,
   convert back. Bring `metaball.frag.glsl:46-78` (the FBM block) and
   `:93-106` (the HSV converters) into glass-ui's shader.
4. Replace the existing inverse-square density model with the SDF `smin`
   model from `metaball.frag.glsl:80-89, 119-134` — **opt-in via a new
   `MetaballConfig.densityModel?: "inverse-square" | "sdf-smin"`** so
   existing consumers are not perturbed. SDF gives sharper, more controlled
   blob shapes; inverse-square gives the legacy "atmospheric goo" look.

### §4.3 — Lifecycle changes (`useMetaballs.ts`)

1. **G1** — in `render()`, if `options.positionSource` is provided, call it
   for `frames`, write the up-to-N entries into `posData` (vec4 now), and
   fade out unused slots by setting their opacity to 0. Skip the
   `blobSeeds`-driven orbit code path entirely.
2. **G2** — in `render()`, read `options.pointer?.value` and upload to the
   four new pointer uniforms. If null/inactive, set `u_pointerActive = 0`.
3. **G5** — in `init()`, attach `webglcontextlost` (preventDefault, cancel
   RAF, set internal `lost=true`) and `webglcontextrestored` (call `init()`
   again — but guarded against the existing `<canvas v-if="isSupported">`
   mount/unmount cycle the F-ε-3 comment warns about (`useMetaballs.ts:84-97`).
   Detach in `dispose()`.
4. **G6** — read `cfg.mode`. If `"layout"`, omit the `fixed inset-0 -z-10
   h-full w-full` class from `MetaballCanvas`; instead let the host control
   sizing. Either expose `MetaballCanvas`'s `<canvas>` class as a slot prop
   or split into `<MetaballCanvas mode="background">` (current default) and
   `<MetaballCanvas mode="layout">` (no fixed positioning). Easiest:
   conditional class on `mode`.
5. **G7** — in `init()`, attach `document.addEventListener(
   "visibilitychange", …)` toggling an internal `paused` flag that gates
   the RAF body (continues looping but skips uniform writes). Detach in
   `dispose()`. Honor `options.pauseOnHidden = false` to opt out.

### §4.4 — Optional extras (out of scope for the Dd path; flag for a glass-ui successor)

- **`useConfigTween(target: Reactive<C>, presets: Record<string, C>): { setPreset, params }`** — generic eased-config interpolator. Ships the mechanism behind `useBlobMood` (`useBlobMood.ts:121-128`) for any reactive config object. Not blocking — the demo's `useBlobMood` is fine staying app-local.
- **`useNormalizedPointer(el: Ref<HTMLElement>): { pointer, active, tick }`** — generic version of `useBlobPointer` (`useBlobPointer.ts:1-69`). Marginal; demo can keep `useBlobPointer` local since pointer-input is now a glass-ui input parameter, not a glass-ui composable.

### §4.5 — Aurora alignment (parity with blob)

Tranche A filed two aurora gaps (`Ae-11` / `Ae-12`) and tranche B confirmed
they remain unshipped at Q close (`B coord §2a` row 2). Dd's verdict on
aurora is **out-of-scope for blob extirpation but in-scope for the directive's
"same for aurora" phrasing**. Sketch:

| Gap | Sketch |
|---|---|
| `deriveAuroraPalette(baseColor: string, opts?: { count?, lSpread?, hueSpread? }): OklchStop[]` | Single-color → OKLCH multi-stop helper. Glass-ui already ships `cssToOklch` + `hexToOklchStop` (`aurora/index.ts:24-29`); this packages the demo's intent. |
| `<Aurora :base-color="...">` convenience prop | Sugar: when `config.palette` is omitted but `baseColor` is set, internally `deriveAuroraPalette(baseColor)`. |
| `useAurora` pointer wiring documented | `useCursorInteraction` exists as a separate composable (`aurora/composables/useCursorInteraction.ts`). The demo never wires it (`AuroraPane.vue` has no cursor). Not a blocker; document as a known seam. |

`coordination/Q.md §3` row 2 (Aurora `deriveAuroraPalette`) **stands**; Dd
adds no new aurora gaps.

### §4.6 — `coordination/Q.md §3` update plan

Tranche D's coordination doc (when it opens) carries these rows. The five
existing blob/dot rows in `B coord §3` either ship via §4.1–4.3 (G1–G5) or
gain siblings G6, G7. Proposed §3 deltas at D-open:

| Row in B coord §3 | Action |
|---|---|
| metaballs `positionSource` + pointer + per-blob opacity + perturbation + context-loss | **REPLACED** by a single explicit row citing `MetaballFrame` + `UseMetaballsOptions` (the §4.1 shape). |
| `BlobDot` primitive | **STANDS**, sharpened — sketch in §6.2 below. |
| Aurora `deriveAuroraPalette` | **STANDS**. |
| (NEW) `MetaballCanvas mode="layout"` (G6) | **FILED** at D open. |
| (NEW) `useMetaballs` `pauseOnHidden` (G7) | **FILED** at D open. |

---

## §5 — value.js extirpation plan (file-by-file)

Sequenced for ship safety: each step compiles + visually passes before the
next.

### §5.1 — Step 1 — Land glass-ui's `positionSource` + pointer + opacity (G1+G2+G3+G5)

Outside this repo. Blocks step 2.

### §5.2 — Step 2 — Replace `useMetaballRenderer` in `GooBlob.vue`

In `demo/@/components/custom/goo-blob/GooBlob.vue`, swap the
`useMetaballRenderer(...)` call (`:43-50`) for `useMetaballs(canvasRef, cfg, {
positionSource, pointer, pauseOnHidden: true })`. Inline adapters:

```ts
// positionSource: bridge satellite FSM into glass-ui MetaballFrame[]
const positionSource = (now: number, _dt: number): MetaballFrame[] => {
    satellites.tick(now, mood.params.value);
    const out: MetaballFrame[] = [
        // primary body
        { x: 0.5, y: 0.5, radius: cfg.bodyRadius * (1 + sin(t * pulseFreq) * pulseAmp), opacity: 1 },
    ];
    for (const s of satellites.sources) {
        out.push({ x: 0.5 + s.x, y: 0.5 + s.y, radius: s.radius, opacity: s.opacity });
    }
    return out;
};

// pointer adapter: useBlobPointer → glass-ui shape
const pointer = computed(() => ({
    x: blobPointer.pointer.value.x * 0.5,
    y: blobPointer.pointer.value.y * 0.5,
    active: blobPointer.active.value,
}));
```

After Step 2 builds + screenshots match, **delete**:

- `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` (333 LoC)
- `demo/@/components/custom/goo-blob/shaders/metaball.frag.glsl` (160 LoC)
- `demo/@/components/custom/goo-blob/shaders/metaball.vert.glsl` (9 LoC)
- All `BlobConfig` numeric fields that mirror shader uniforms move into
  glass-ui's `MetaballConfig`; the demo's `BlobConfig` slims to satellite-FSM
  + `pointer` + `colorPerturbation` re-exports. `types.ts` drops ~70 LoC.

### §5.3 — Step 3 — Mood/satellite composables become callback bodies

- `useBlobMood.ts` (137 LoC) — **stays**. Its consumer changes from "feeding
  uniforms via `mood.params.value`" to "feeding the `colorPerturbation` and
  pulseFreq/pulseAmp arguments of the positionSource". No internal change.
- `useBlobSatellites.ts` (295 LoC) — **stays**. Its `sources: MetaballSource[]`
  output is now the body of the `positionSource` callback. Renames internal
  `MetaballSource` → import `MetaballFrame` from glass-ui.
- `useBlobPointer.ts` (70 LoC) — **stays**. Feeds the `options.pointer` ref.

### §5.4 — Step 4 — Slim `BlobPane.vue`

`panes/BlobPane.vue:23-80` defines 7 slider sections targeting `BlobConfig`
fields. The shader-mirror fields (Body, Gooey, Surface Noise, Pulsation,
Color, Pointer = 6 sections) now target glass-ui's `MetaballConfig` superset.
The Orbit section (satellite FSM) keeps targeting the demo's `BlobConfig`.
The pane file barely changes — the inject key splits into
`useInjectedMetaballConfig` + `useInjectedSatelliteConfig`, or keep them
fused as today and let `BlobPane.vue` route fields to whichever object holds
them.

### §5.5 — Step 5 — `BlobDot` ships in glass-ui → migrate 9 files / 16 sites

Per §6.2. Drop `WatercolorDot.vue`, `useWatercolorBlob.ts`,
`watercolor-dot/index.ts`. 9 import sites swap
`import { WatercolorDot } from "@components/custom/watercolor-dot"` for
`import { BlobDot } from "@mkbabb/glass-ui/blob-dot"`. Props are roughly
isomorphic — see §6.2 prop map. `SvgFilters.vue:11-26`'s
`#watercolor-filter` may also move to glass-ui (or stay demo-local if no
other consumer needs it — value.js's only watercolor user is `WatercolorDot`,
plus `SpectrumCanvas.vue:274` which keeps the bare `filter: url(#watercolor-filter)`
on a different surface).

### §5.6 — Quantified post-extirpation delete delta

Across `goo-blob/` and `watercolor-dot/`:

- **Files deleted**: 4 (`metaball.frag.glsl`, `metaball.vert.glsl`,
  `useMetaballRenderer.ts`, `useWatercolorBlob.ts`, `WatercolorDot.vue` —
  optionally `watercolor-dot/index.ts`). Net: 5 source files +
  optional 1 barrel.
- **LoC deleted**: ≈ 333 + 160 + 9 + 139 + 108 + 1 = **750 LoC**.
- **LoC slimmed**: `goo-blob/types.ts` (~136 → ~65), `GooBlob.vue` (~124 → ~80
  after the simpler composable wiring). Net additional **~115 LoC**.
- **Total demo delete delta**: **≈ −865 LoC, −5 src files, −2 GLSL files,
  −1 Vue component (WatercolorDot), −1 subtree** (the
  `watercolor-dot/` directory). Plus the 16 import-site swaps.

---

## §6 — Recommended D-wave shape for blob

### §6.1 — Wave decomposition

| Wave | Lane | Scope | Cross-repo gate |
|---|---|---|---|
| D.W0 | open | Validate Dd; ratify §4 augmentation as the glass-ui ask. | none |
| D.W1 | research / fallback | If glass-ui has not shipped §4 by D.W1, refresh `useMetaballRenderer.ts` instead — small refinements only (extract `cssColorToRgb`, add named-uniform structs). Records a "no-glass-ui" fallback. | gated soft on glass-ui ship; no hard wait |
| D.W2 | extirpation half-A (blob WebGL) | Once §4.1+§4.2+§4.3 ships in glass-ui: Step 2 (swap renderer) + Step 3 (mood/sat composable refactor) + Step 4 (BlobPane slim). Audit: visual diff against pre-extirpation screenshot under 5 mood transitions. | hard wait on G1+G2+G3+G5 |
| D.W3 | extirpation half-B (WatercolorDot) | Once `@mkbabb/glass-ui/blob-dot` ships: Step 5 (16-site migration + 5 file deletes). Audit: visual diff of each consumer surface. | hard wait on §6.2 ship |
| D.W4 | aurora | `deriveAuroraPalette` consumption (§4.5). | hard wait on Aurora ship |
| D.W5 | close | Update `coordination/Q.md §3` to reflect the new ship-state; archive Ae-10 / Ae-11 / Ae-13 filings; record net delete delta. | none |

### §6.2 — `BlobDot` API sketch

The 9 `WatercolorDot` consumers use a near-identical prop set. Proposed
`@mkbabb/glass-ui/blob-dot`:

```ts
export interface BlobDotProps {
    /** CSS color for the dot's `background-color` (any color space) */
    color: string;
    /** Tag — visual button vs semantic div */
    tag?: "div" | "button";
    /** Enable rAF border-radius morph (default false — static seeded shape) */
    animate?: boolean;
    /** Base cycle duration in ms (default 4000) */
    cycleDuration?: number;
    /** Border-radius range as percentages (default [20, 80]) */
    range?: [number, number];
    /** Extra seed string mixed into the deterministic hash */
    seed?: string;
    /** Apply the watercolor SVG filter (default true) */
    watercolor?: boolean;
}

defineExpose<{ nudge(): void }>();
```

Prop map for migration: every existing `<WatercolorDot
:color :tag :animate :seed :cycle-duration :range>` becomes `<BlobDot ...>`
1:1. Default `watercolor=true` preserves the current `url(#watercolor-filter)`
look; setting `watercolor=false` skips the filter (the bare seeded blob).
Glass-ui ships the `<feTurbulence>`/`<feDisplacementMap>` defs as part of
`<BlobDot>`'s `<defs>`-bundling (or via a `<BlobDotProvider>` that mounts the
filter once globally — pick the cheaper pattern).

### §6.3 — Risk and mitigations

| Risk | Mitigation |
|---|---|
| `MetaballFrame.vec4` is a binary-breaking shader change for glass-ui's existing consumers | Ship as a side-by-side `useMetaballsV2` first, or pack the alpha into a sentinel `radius` (e.g. negative-radius = inactive); migrate `useMetaballs` to vec4 in a glass-ui major bump |
| `positionSource` callback signature drift between Dd-research and Q-implementation | Lock the signature in §4.1 as the ratified target; the glass-ui Q tranche can refine but breaking changes route back through `coordination/Q.md` |
| 16-site `WatercolorDot` migration miss | Each consumer has a unique `:seed` string; preserve them 1:1; an e2e visual-diff sweep across the 9 host files catches any regression |
| Aurora and Blob both pull on the same `cssColorToRgb` resolver — duplicate copies in both repos | Once glass-ui owns the metaballs shader resolver, expose `@mkbabb/glass-ui/utils/cssColorToRgb` and use it from `<Aurora>` too |

### §6.4 — Net D-wave delta forecast (numbers)

- **demo/**: ≈ −865 LoC, −5 src files, −1 subtree (`watercolor-dot/`),
  −1 god composable (`useMetaballRenderer`), −2 GLSL files.
- **glass-ui**: + ≈ 400 LoC across `useMetaballs.ts` (G1–G5+G6+G7),
  `shaders.ts` (SDF+pointer+HSV+vec4), `MetaballCanvas.vue` (mode prop),
  `metaballs/types.ts` (new interfaces); + new `blob-dot/` subtree (≈ 150 LoC).
- **Aurora**: + ≈ 60 LoC for `deriveAuroraPalette` helper.
- **value.js coordination**: 3 rows of `coordination/Q.md §3` close
  (metaballs gaps + `BlobDot` + Aurora-derive); 2 new rows file (G6, G7) and
  close in the same D wave once glass-ui ships.
