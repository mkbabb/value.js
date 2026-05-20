# Dc — Aurora deep dive + derive-from-color spec

**Tranche**: value.js D (planning).
**Lane**: Dc.
**Mode**: research, read-only — no source edits, no commits.
**Scope**: extant glass-ui aurora API, older aurora implementation, derive-from-color
algorithm sketch, augmentation plan, recommended D-wave shape.
**Inputs**:
- glass-ui `src/components/custom/aurora/**` HEAD (the live 30-field `AuroraConfig`).
- glass-ui git history for the pre-v4.1 single-color "derived" path that the W0
  migration retired.
- value.js demo W0 commit `c20f609` (the aurora-migration boot fix).
- A.W6-deferred audit (`docs/tranches/A/audit/W6-deferred.md`) +
  `coordination/Q.md §3` (the central `deriveAuroraPalette` gap).
- value.js library OKLab/OKLCh toolkit and existing harmony composable.

---

## §1 — glass-ui aurora API surface (HEAD, v4.1)

### 1.1 Package barrel — what the consumer can import

`@mkbabb/glass-ui/aurora` (`glass-ui/src/components/custom/aurora/index.ts:1-30`):

| Symbol | Kind | Source |
|---|---|---|
| `Aurora` (Vue) | component — canvas + `useAurora` wired | `Aurora.vue:1-128` |
| `useAurora(canvasRef, configSource, runtimeOptions?)` | composable | `composables/useAurora.ts:109-261` |
| `UseAuroraReturn` | type | `composables/useAurora.ts:27-42` |
| `useCursorInteraction(stageRef, configSource, options)` | composable | `composables/useCursorInteraction.ts:26-220` |
| `createAurora(canvas, initial, options?)` | imperative runtime | `composables/runtime.ts:144-498` |
| `AuroraRuntimeMode`, `AuroraRuntimeOptions` | types | `composables/runtime.ts:41-84` |
| `DEFAULT_AURORA_CONFIG` | const | `presets.ts:148-184` |
| `MAX_NUCLEI = 6`, `MAX_STOPS = 8` | consts | `presets.ts:139-140` |
| `AuroraConfig`, `AuroraCursorApi`, `AuroraFlow`, `AuroraInstance`, `AuroraMedium`, `AuroraNucleus`, `FlowPattern`, `OklchStop`, `StrokeMode`, `WarpMode` | types | `presets.ts:16-135` |
| `cssToOklch(css)` → `OklchStop` | helper | `composables/color.ts:166-170` |
| `flattenPalette(stops, maxStops?, out?)` → `Float32Array` | helper (LUT bake) | `composables/color.ts:90-109` |
| `hexToOklchStop(hex)` → `OklchStop` | helper | `composables/color.ts:142-149` |
| `oklchStopToHex(s)` → `string` | helper | `composables/color.ts:136-140` |
| `oklchToLinear(stop)` → `[r,g,b]` linear sRGB | helper | `composables/color.ts:78-82` |
| `paletteToCssGradient(stops)` → CSS gradient | helper (placeholder) | `composables/color.ts:125-134` |

**Missing per `coordination/Q.md §3` row 2**: `deriveAuroraPalette(baseColor, opts)`
— the central gap this lane closes.

### 1.2 `AuroraConfig` shape — the 30 fields

`presets.ts:68-106`. Five axis groups:

**Composition (4)**
- `palette: OklchStop[]` (2..8) — `{L: 0..1, C: 0..0.4, h: 0..360}` triples.
- `nuclei: AuroraNucleus[]` (1..6) — `{x, y, radius, paletteBias, valueBias, driftRadius, driftPhase, elongation?, angle?}`.
- `softmaxBeta` (3..10) — sharpness of attractor zone falloff.
- `valueVariance` (0..0.3) — within-zone L/C mottling magnitude.

**Warp / boundaries (5)**
- `warpAmount` (0..0.6), `warpScale` (0.5..3), `warpDrift` (0..0.015).
- `warpMode: "fbm" | "cellular" | "hybrid"`, `noiseOctaves: 3|4|5`.

**Medium (12)**
- `medium: "smooth" | "pastel" | "watercolor" | "oil"`.
- `flow: { pattern, focalX, focalY, angle, curl }` — `pattern: "none"|"radial"|"swirl"|"diagonal"|"multi"`.
- `strokeAmount` (0..1), `strokeScale` (40..320), `strokeAnisotropy` (0..1),
  `strokeLayers: 1|2`, `strokeMode: "oil"|"knife"|"crayon"|"chunky"`.
- `wetEdge`, `granulation`, `impasto`, `brokenColor`, `canvasGrain`.

**Motion (4)**
- `nucleiDrift` (0..0.05), `paletteDrift` (0..0.04).
- `breathDepth` (0..0.15), `breathPeriod` (10..90 s).

**Output (3)**
- `saturation` (0.6..1.3), `paperGrain` (0..0.02), `alpha` (0..1).

### 1.3 Rendering pipeline

The shader is one fragment program (`shaders/aurora.frag.ts`, 799 lines) running on
a full-screen triangle. The runtime (`composables/runtime.ts`) owns:

- **Context creation** — `gl = canvas.getContext("webgl2", {antialias:false, alpha:true,
  premultipliedAlpha:true, preserveDrawingBuffer})` (`runtime.ts:217-224`).
- **Compile-link** — `compile`/`link` (`runtime.ts:101-124`); failures throw with
  WebGL log per O invariant 24.
- **Uniform cache** — 43 named uniforms (`runtime.ts:126-140`), resolved once at arm.
- **Pre-allocated upload buffers** — 9 `Float32Array`s for palette + nuclei
  per-attribute uploads (`runtime.ts:274-284`); a slider drag mutates these in place,
  zero per-frame allocations.
- **Resize** — `ResizeObserver` on the canvas + DPR cap at 2 (`runtime.ts:250-268`).
- **RAF loop** — `tick` (`runtime.ts:410-419`): cursor easing + `drawFrame(t)`.
- **Cursor easing** — JS-side because the shader alone gives framerate-dependent
  decay. Constants `CURSOR_POS_LERP=0.22`, `CURSOR_STRENGTH_LERP=0.18`,
  `CURSOR_DECAY_PER_FRAME=0.992` (`runtime.ts:37-39`).
- **Y-flip at the uniform boundary** — config authors top-origin, shader expects
  bottom-origin (`runtime.ts:300-354`, `AUTHOR_Y_ORIGIN_IS_TOP` marks).

### 1.4 Lazy-arm + post-paint scheduling (HA4 §1.3)

`useAurora` (`composables/useAurora.ts:109-261`) defaults to
`initStrategy: "deferred"`:

1. `onMounted` calls `createAurora(canvas, initial, {initStrategy:"deferred"})` —
   cheap, un-armed (no GL context yet).
2. Composes `useIntersectionPause` for viewport-gated pause/resume.
3. On first intersection, calls `scheduleAfterFirstPaint` (`useAurora.ts:55-88`) —
   `requestIdleCallback({timeout:2000})` on Chromium/Firefox, double-`rAF` +
   `setTimeout(0)` on Safari.
4. The idle callback re-checks visibility, then invokes `inst.arm()` —
   compile + link + upload + RAF arm.
5. `isArmed` (`Ref<boolean>`) flips `true`; `Aurora.vue` cross-fades the canvas in
   over the static placeholder.

The placeholder (`Aurora.vue:84-88`, `paletteToCssGradient` —
`color.ts:125-134`) renders a `linear-gradient(135deg, ...palette stops as hex)` as
the zero-JS / zero-GPU first paint. Stays mounted under the canvas as the
WebGL2-unavailable fallback (HA4 §1.5).

`onInitError` (`useAurora.ts:148-156`): per O invariant 24, a WebGL2 / shader
compile-link failure surfaces — synchronously on the eager path, on the microtask
queue (`Promise.reject`) on the deferred path. Consumers pass `onInitError` to
opt into silent placeholder-only fallback.

### 1.5 The `useAurora` return shape

`UseAuroraReturn` (`useAurora.ts:27-42`):
- `setCursor(x, y, strength?)`, `clearCursor()`, `setCursorRadius(r)`.
- `renderAt(t)` — deterministic single-frame draw for thumbnail bakes.
- `pause()`, `resume()`.
- `isArmed: Readonly<Ref<boolean>>` — true once the runtime is live.

No `config` field, no `palette` field — the consumer owns the config object and
mutates it; the deep `watch` on `getCfg` (`useAurora.ts:177`) uploads new uniforms
on every change.

---

## §2 — Older aurora implementation + what W0 retired

### 2.1 Pre-v4.1 schema (the demo's broken state on tranche-A entry)

The demo's pre-W0 `auroraConfig` literal (`docs/tranches/A/research/Ae-structure-blob-aurora.md:222-256`,
captured from value.js commit `c20f609^:demo/color-picker/App.vue:319-332`) was
authored against an earlier glass-ui aurora that lived in glass-ui's history at
least up to commit `637955b` (Apr 3 2026, "fix derived aurora mode"). Old fields,
all retired by v4.1:

| Old field | Role | v4.1 disposition |
|---|---|---|
| `colorMode: "explicit"|"derived"` | switch between palette list and base-color derivation | deleted — no first-class "one color → palette" entry |
| `colors: string[]` | CSS palette | replaced by `palette: OklchStop[]` |
| `surfaceMode: "none"|"theme"|"color"`, `surfaceAlpha` | underpaint behind blobs | deleted |
| `blur: number` (px) | global Gaussian blur | deleted (shader-internal `warpScale` is the new knob) |
| `speed: number` | global motion multiplier | deleted (motion now `breathPeriod` / `nucleiDrift` / `paletteDrift`) |
| `blobCount`, `baseRadius`, `radiusVariance` | per-blob CRUD | replaced by per-nucleus fields on `AuroraNucleus[]` |
| `viewportAnchorRatio` | viewport-vs-page anchoring | deleted (Aurora is canvas-local now) |
| `alphaLight`, `alphaDark` | per-mode alpha | collapsed to single `alpha` |
| `lShiftLarge/Small`, `hueShiftLarge/Small` | OKLCh L/h shifts off the base color | deleted (the lever of the old `deriveColors`) |
| `orbitAmplitude` | per-blob drift | per-nucleus `driftRadius` |
| `blendMode: GlobalCompositeOperation` | Canvas2D blend | gone — shader output is direct |
| `gradStop2/3/4` | per-blob 4-stop radial gradient | deleted (gradient is shader-internal) |

### 2.2 The old `deriveColors` algorithm — load-bearing precedent

From `glass-ui 637955b:src/components/custom/aurora/composables/useAurora.ts:159-176`
(historical commit). The single base-color → `count`-blob palette function the
W0 migration retired:

```ts
function deriveColors(count: number): Array<[number, number, number]> {
    const cssColor = toValue(baseColor) ?? "#c084fc";
    const [r, g, b] = cssToRgb(cssColor);
    const [L, C, H] = rgbToOklch(r, g, b);

    const colors: Array<[number, number, number]> = [];
    for (let i = 0; i < count; i++) {
        const isSmall = i >= Math.ceil(count / 2);
        const lShift = isSmall ? cfg.lShiftSmall : cfg.lShiftLarge;
        const hShift = isSmall ? cfg.hueShiftSmall : cfg.hueShiftLarge;
        const sign   = i % 2 === 0 ? 1 : -1;
        const lAmount = lShift * (0.5 + (i / count) * 0.5) * sign;
        const hAmount = hShift * ((i + 1) / count) * (i % 3 === 0 ? -1 : 1);
        colors.push(oklchToRgb(
            clamp(L + lAmount, 0, 1), C, (H + hAmount + 360) % 360,
        ));
    }
    return colors;
}
```

Properties to preserve in the v4.1-shaped reincarnation:
- **OKLCh as the working space** — perceptual L/h shifts read uniformly.
- **Two-cohort partition** (large vs small blobs) — `Math.ceil(count/2)` split with
  separate L/h-shift gains. The atmosphere preset used larger L-shift on the first
  half (the dominant zones) and larger hue spread on the second half (accents).
- **Sign-alternating L** (`i % 2 === 0 ? 1 : -1`) — every other blob darker/lighter
  than the base, giving the "depth" of an atmospheric field.
- **Hue triangulation** (`i % 3 === 0 ? -1 : 1`) — produces analogous-with-accent
  distribution rather than monochromatic.
- **Chroma held fixed** at the base color's `C` — saturation discipline is the
  shader's `saturation` uniform, not the palette's job.

### 2.3 What was lost in the W0 migration (the inheritance gap)

- The whole single-color path. The demo's W0 fix retained the canvas + runtime
  but switched to a static `structuredClone(DEFAULT_AURORA_CONFIG)` because no
  `deriveAuroraPalette` existed in v4.1.
- The atmosphere preset (`ATMOSPHERE_PRESET` const in old `useAurora.ts:79-99`) —
  a complete derived-mode setting (10 small blobs, `baseRadius: 0.10`, `blur: 8`,
  `surfaceMode: "theme"`) tuned for "background atmosphere behind UI." v4.1
  ships only `DEFAULT_AURORA_CONFIG` (2 nuclei, neutral blue, generic) plus
  themed authored presets in the consumer (Sky, Dawn, Meadow, etc., per
  `glass-ui/demo/stories/aurora/presets.ts` and DESIGN.md §5 "Presets in
  consumers").
- The "atmosphere mode" feel — large numbers of small blobs anchored to the
  viewport, sparse motion, theme-aware underpaint. v4.1's vocabulary (nuclei +
  attractors) is more compositional; the bouncy "soap film of dots" vibe is gone.
- The pane sliders. `AuroraPane.vue` (W0 state) renders "under rework" because
  the old 5-section slider table (Blobs / Motion / Color Shifts / Surface /
  Gradient) maps onto deleted fields. The v4.1 slider table is a different shape
  (Composition / Warp / Medium / Motion / Output).

### 2.4 No other older-aurora drafts exist

`grep -rn 'aurora' assets/ demo/ --include='*.md' --include='*.ts' --include='*.vue'`
in value.js surfaces only the W0 / A.W6 references; no historical draft files
remain in value.js. The glass-ui history shows two waves: the early v3-style
"derived" aurora (`d74b1d0` Mar-Apr 2026, `637955b` Apr 2026, etc.) and the v4.1
nuclei + medium pipeline that landed via `70dcfa5` (Apr 28 2026, C.W3.D) and was
hardened through `b523b20` (F.W5), `827b6ae` (O.W1 fail-explicit), `b892eab`
(O.W3 god-module split), `ecd0679` (O.W4 lazy-arm), and `e2e5303` (Safari fix).
The boundary between the two is `70dcfa5 → d74b1d0` — i.e., the old
`useAuroraBlobs`/`AuroraBlobsConfig` schema disappeared with `70dcfa5`'s
refactor.

---

## §3 — derive-from-color algorithm sketch

### 3.1 Surface — proposed glass-ui export

```ts
// New, in @mkbabb/glass-ui/aurora
export interface DerivePaletteOptions {
    /** Number of stops to generate. Default 4. Capped at MAX_STOPS = 8. */
    count?: number;
    /** Hue distribution strategy. */
    harmony?: "analogous" | "complementary" | "triadic" | "split-complementary" | "monochromatic";
    /** Spread of L variation around the base color's L. Default 0.18. */
    lSpread?: number;
    /** Spread of hue variation in degrees. Default depends on harmony. */
    hueSpread?: number;
    /** Optional chroma scale (multiplies base C across stops). Default 0.9. */
    chromaScale?: number;
}

export function deriveAuroraPalette(
    baseColor: string,             // any CSS color the canvas-2D parser accepts
    opts?: DerivePaletteOptions,
): OklchStop[];

/**
 * Full atmosphere config from one color — the "give me a background" entry.
 * Builds `palette` via deriveAuroraPalette + a coherent `nuclei[]` + sensible
 * motion/medium defaults tuned for "ambient atmosphere behind UI."
 */
export function deriveAuroraConfig(
    baseColor: string,
    opts?: DerivePaletteOptions & {
        nucleiCount?: number;       // default 3
        breathPeriod?: number;      // default 50 (slow)
        saturation?: number;        // default 0.95 (slightly desaturated, behind UI)
    },
): AuroraConfig;
```

### 3.2 Algorithm — deriveAuroraPalette

Pseudocode (the math, not the implementation):

```
deriveAuroraPalette(baseColor, opts):
    # 1. Parse & lift into OKLCh
    base = cssToOklch(baseColor)          # glass-ui already exports this
    L0, C0, H0 = base.L, base.C, base.h

    n         = clamp(opts.count ?? 4, 2, MAX_STOPS)        # 8
    lSpread   = opts.lSpread ?? 0.18
    chromaK   = opts.chromaScale ?? 0.90
    harmony   = opts.harmony ?? "analogous"
    hueSpread = opts.hueSpread ?? harmonyDefaults[harmony]  # see 3.3

    # 1a. Grayscale carve-out (D-HARDEN-5 §6 — added at hardening).
    #     When C0 == 0 (or below a small epsilon, e.g. 1e-4), the hue is
    #     undefined; harmony generation would emit nonsense angles applied to
    #     a zero-chroma color, drifting the palette into accidental hues at
    #     gamut-mapping time. Short-circuit: produce an L-only ramp at C=0;
    #     no hue generation, no chroma envelope.
    if C0 < 1e-4:
        return [
            { L: clamp01(L0 + lSpread * ((i / (n-1)) - 0.5) * 2), C: 0, h: 0 }
            for i in 0..n-1
        ]

    # 2. Generate hues per harmony
    hues = generateHarmonyHues(n, harmony, H0, hueSpread)

    # 3. For each stop, vary L around L0 along a hand-tuned envelope.
    #    The envelope mirrors the old `deriveColors` two-cohort partition:
    #    first half stays near L0 (dominant zones), second half spreads further
    #    (accent zones). Sign-alternates around L0 so half are lighter, half
    #    darker — the depth cue.
    stops = []
    for i in 0..n-1:
        # Cohort & sign — preserves the old algorithm's two-cohort partition.
        isAccent = i >= ceil(n / 2)
        sign     = (i % 2 == 0) ? +1 : -1
        # Envelope: ramp 0.5..1.0 along the cohort. Old algorithm's
        # `(0.5 + (i / count) * 0.5)` term. Smooth, reads as breath.
        envelope = 0.5 + (i / n) * 0.5
        # L shift: accents get larger swing.
        lGain = isAccent ? lSpread * 1.4 : lSpread
        L_i   = clamp01(L0 + sign * lGain * envelope)

        # Chroma: hold near base, gently desaturate at the extremes so the
        # palette doesn't ring "neon" when L diverges far from L0.
        C_i = max(0, C0 * chromaK * (1 - 0.4 * abs(L_i - L0) / lSpread))

        stops.push({ L: L_i, C: C_i, h: hues[i] })

    return stops
```

### 3.3 Harmony defaults (mirror `useColorGeneration.ts`)

The demo already ships harmony math at
`demo/@/components/custom/color-picker/composables/useColorGeneration.ts:78-140`.
glass-ui should mirror the same generators (no novel math, just relocation +
generalisation):

| Harmony | Default `hueSpread` (deg) | Generator |
|---|---|---|
| analogous | 30 | `H0 + spread * (i / (n-1) - 0.5) * 2` — tight cluster |
| complementary | 0 (uses ±180 alternation) | `i % 2 == 0 ? H0 : H0 + 180`, plus ±5° jitter |
| triadic | 0 (uses 120° spacing) | `H0 + (i % 3) * 120` |
| split-complementary | 0 | `H0`, `H0+150`, `H0+210` rotation |
| monochromatic | 8 | tiny wobble around `H0` — pure L/C variation |

### 3.4 deriveAuroraConfig — the full atmosphere

```
deriveAuroraConfig(baseColor, opts):
    palette = deriveAuroraPalette(baseColor, opts)
    n       = opts.nucleiCount ?? 3

    # Nuclei placement: golden-angle distribution on a centered ellipse so the
    # field reads as an atmospheric spread, not a grid. Seeded by `baseColor`
    # hue so the same color always renders the same composition.
    seed = (H0 * 1000) | 0
    rng  = mulberry32(seed)
    nuclei = []
    for i in 0..n-1:
        angle = i * GOLDEN_ANGLE_RAD
        nuclei.push({
            x: 0.5 + 0.35 * cos(angle) * (0.8 + rng() * 0.4),
            y: 0.5 + 0.30 * sin(angle) * (0.8 + rng() * 0.4),
            radius:        0.45 + rng() * 0.2,
            paletteBias:   i / max(n - 1, 1),       # spread across stops
            valueBias:     (rng() - 0.5) * 0.1,
            driftRadius:   0.012 + rng() * 0.01,
            driftPhase:    rng() * 2π,
        })

    return {
        ...DEFAULT_AURORA_CONFIG,
        palette, nuclei,
        # Atmosphere-tuned overrides (mirror old ATMOSPHERE_PRESET):
        breathPeriod:  opts.breathPeriod ?? 50,
        breathDepth:   0.04,
        nucleiDrift:   0.012,
        paletteDrift:  0.008,
        warpAmount:    0.55,
        warpScale:     1.6,
        saturation:    opts.saturation ?? 0.95,
        medium:        "smooth",
    }
```

### 3.5 value.js library dependencies (the implementation alternative)

If glass-ui declines to ship this, value.js the library can host the math
(glass-ui only needs to consume `OklchStop[]`, which it already accepts). value.js
exports cover the whole surface (`src/index.ts:69-213`):

- Parse: `parseCSSColor` (`src/index.ts:322`).
- Convert: `rgb2oklch`/`xyz2oklch`/`oklch2xyz`/`xyz2rgb` (`src/index.ts:135-155`).
- Mix: `mixColors`, `mixColorsN` (`src/index.ts:177, 187`) — useful for the
  perceptual mid-stops if we want bezier-OKLab interpolation instead of envelope.
- Gamut: `gamutMapOKLab`, `gamutMapSRGB`, `oklabToRgb255` (`src/index.ts:200-213`).
- Color classes: `OKLCHColor`, `OKLABColor` (`src/index.ts:68-69`).

Pseudocode line count: ~55 (deriveAuroraPalette ~25, harmony generators ~15,
deriveAuroraConfig ~15). The implementation is a single 100-line module.

### 3.6 Determinism guarantee

`baseColor` is the entire derivation seed; same input → same output. The PRNG
inside `deriveAuroraConfig` is seeded from `H0`, so changing only `L0` produces
the same nuclei layout with shifted palette — useful for the picker "lightness
slider doesn't reshuffle the atmosphere" property.

### 3.7 Bezier-OKLab variant (optional refinement)

For visually-smoother palettes, replace the per-stop hand envelope (§3.2 step 3)
with a 2-control-point bezier through OKLab space:

```
P0 = oklch2oklab(L0 - lSpread, C0 * 0.6, H0 - hueSpread)  # cool dark anchor
P1 = oklch2oklab(L0, C0, H0)                              # base
P2 = oklch2oklab(L0 + lSpread, C0 * 0.6, H0 + hueSpread)  # warm light anchor
stops = sampleBezierOKLab(P0, P1, P2, n)
```

Uses value.js's `interpBezier` (`src/index.ts:223`) +
`oklab2oklch` (`src/index.ts:142`). Smoother but loses the two-cohort character
the old algorithm produced. Authoring choice; default the envelope path.

---

## §4 — Augmentation plan

### 4.1 glass-ui-side ship (the library owes the demo)

| Item | Where | Cost |
|---|---|---|
| `deriveAuroraPalette(baseColor, opts)` per §3.2 | new fn in `composables/color.ts` (alongside `cssToOklch`); re-export from `index.ts` | ~30 lines + tests |
| Harmony hue generator | new helper next to the above (`generateHarmonyHues` lifted from `demo useColorGeneration.ts:84-140`) | ~25 lines |
| `deriveAuroraConfig(baseColor, opts)` per §3.4 | new fn in `presets.ts` (it composes `deriveAuroraPalette` with a v4.1-shaped nuclei layout) | ~25 lines |
| `<Aurora :base-color="...">` prop | optional ergonomic — if both `palette` and `baseColor` are present, `palette` wins; if `palette` is omitted, derive from `baseColor` | ~10 lines on `Aurora.vue` |
| Atmosphere preset re-instated | `presets.ts` gains `ATMOSPHERE_DEFAULTS: Partial<AuroraConfig>` (the motion/medium half of the old `ATMOSPHERE_PRESET`), so the demo can shallow-merge over a derived config without re-stating the tuning | ~10 lines |
| Tests: derivation is deterministic, harmony spread bounds, gamut-safety of generated stops | `glass-ui/test/aurora/derive.test.ts` (new) | ~60 lines |

Strictly additive — no breaking changes to v4.1 `AuroraConfig`. Maps onto
`coordination/Q.md §3` row 2 (Aurora `deriveAuroraPalette`) — the same surface the
A.W6 deferral named.

### 4.2 value.js demo-side consume (the picker drives the atmosphere)

In `demo/color-picker/App.vue`, replace the W0 static config:

```ts
// W0 (current — static):
const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));
useAurora(atmosphereCanvas, () => auroraConfig, { onInitError: ... });
```

with a picker-tracking derived config (sketch):

```ts
import { deriveAuroraConfig } from "@mkbabb/glass-ui/aurora";

// Recompute on cssColorOpaque change; structuredClone keeps the reactive
// object stable for AuroraPane's sliders to mutate locally before the next
// picker update overwrites them.
const auroraConfig = reactive<AuroraConfig>(deriveAuroraConfig(cssColorOpaque.value));

watch(cssColorOpaque, (next) => {
    Object.assign(auroraConfig, deriveAuroraConfig(next));
});

useAurora(atmosphereCanvas, () => auroraConfig, {
    onInitError: (err) => console.warn("[aurora] init failed:", err),
});
provide("auroraConfig", auroraConfig);
```

The deep-watch inside `useAurora` (`useAurora.ts:177`) catches both the picker
drive and any pane-slider mutations on the same reactive object.

### 4.3 `AuroraPane.vue` — slider table against the live v4.1 fields

The W0 "under rework" placeholder retires. The new slider table maps onto v4.1
`AuroraConfig` (`presets.ts:68-106`):

| Section | Sliders (key, label, min, max, step) |
|---|---|
| Composition | `softmaxBeta` 3..10 step 0.1; `valueVariance` 0..0.3 step 0.005 |
| Warp | `warpAmount` 0..0.6 step 0.01; `warpScale` 0.5..3 step 0.05; `warpDrift` 0..0.015 step 0.0005 |
| Motion | `nucleiDrift` 0..0.05 step 0.001; `paletteDrift` 0..0.04 step 0.001; `breathDepth` 0..0.15 step 0.005; `breathPeriod` 10..90 step 1 |
| Output | `saturation` 0.6..1.3 step 0.01; `paperGrain` 0..0.02 step 0.0005; `alpha` 0..1 step 0.01 |
| Selects | `warpMode` ∈ {fbm, cellular, hybrid}; `noiseOctaves` ∈ {3, 4, 5}; `medium` ∈ {smooth, pastel, watercolor, oil}; `flow.pattern`; `strokeMode` (gated on `medium === "oil"`) |

Nuclei + palette CRUD is out of scope for the pane (glass-ui ships
`useCursorInteraction` for in-canvas CRUD; the pane is a tuning panel, not an
editor). Adopts `ConfigSliderPane` exactly as `BlobPane` already does.

### 4.4 Demo-side "atmosphere wiring" composable (optional)

Extract the App.vue derive-and-watch wiring into
`demo/@/composables/atmosphere/useAtmosphere.ts` (or under the dock domain) —
following the W4 decomposition pattern already in place (`usePaneRouter`,
`usePaletteManagerWiring`). Keeps `App.vue` declarative.

```ts
// Sketch:
export function useAtmosphere(
    canvasRef: Ref<HTMLCanvasElement | null>,
    color: Ref<string>,
    derive: (c: string) => AuroraConfig = deriveAuroraConfig,
) {
    const config = reactive<AuroraConfig>(derive(color.value));
    watch(color, (c) => Object.assign(config, derive(c)));
    const api = useAurora(canvasRef, () => config, {
        onInitError: (err) => console.warn("[aurora] init failed:", err),
    });
    return { config, ...api };
}
```

### 4.5 Sequencing (the wire-before-retire shape)

Per precept §10. The fix has a strict order:

1. glass-ui ships `deriveAuroraPalette` + `deriveAuroraConfig` + atmosphere preset
   merge (§4.1). Cuts a glass-ui minor (v1.10.x).
2. value.js bumps the glass-ui peer dep.
3. value.js wires the derive-and-watch in `App.vue` (§4.2) AND ships the new
   `AuroraPane.vue` slider table (§4.3) in the same wave — both depend on the
   same v4.1 schema, no half-state.
4. The W0 "under rework" placeholder retires only after the slider table is wired.

---

## §5 — Recommended D-wave shape

Aurora is a single coherent piece of work — the derive-from-color gap was the
exact thing W0 deferred. The wave touches both repos (glass-ui ships, value.js
consumes) so it's best run as a coordinated pair, mirroring the A.W6 / Q
boundary.

### 5.1 Two waves, sequenced

**D.W?-a — glass-ui aurora derivation (glass-ui-side)**
- Ship `deriveAuroraPalette` + harmony generator (§3.2, §3.3).
- Ship `deriveAuroraConfig` + re-instate atmosphere defaults (§3.4, §4.1).
- Optional: `<Aurora :base-color>` ergonomic prop (§4.1).
- Tests: determinism, harmony bounds, gamut safety.
- Closes `coordination/Q.md §3` row 2. Closes A.W6 inheritance row 2.
- Gate: glass-ui release tag + value.js peer-dep bump.

**D.W?-b — value.js demo aurora consumption (value.js-side, depends on -a)**
- Replace `App.vue:211-215` with derive-and-watch (§4.2).
- Optional: extract `useAtmosphere` composable (§4.4).
- Rebuild `AuroraPane.vue` slider table against live v4.1 fields (§4.3).
- Delete the W0 "under rework" placeholder.
- E2E: picker color change → atmosphere palette shifts (Playwright visual
  diff at three viewports).
- Closes A.W6 inheritance row 3 (atmosphere tracks picker).

### 5.2 What does NOT belong in this wave

- Cursor wiring on the atmosphere canvas. The demo's atmosphere is decorative
  (`aria-hidden="true"`); pointer events fall through. `useCursorInteraction`
  ships and works, but the demo has no pointer use-case for the atmosphere
  itself — flag as a future-feature, not a D-wave item.
- The metaballs `positionSource` hook + BlobDot primitive (`coordination/Q.md §3`
  rows 1, 3). Those are blob-domain; this lane is aurora-only.
- The full glass-ui aurora-shader refinement. The v4.1 shader and `AuroraConfig`
  shape are the contract; we adopt them, we don't rewrite them.

### 5.3 Encapsulation / generalization payoff

Post-D the layering reads cleanly:

- **value.js library** — color math, parsing, OKLab toolkit. No aurora knowledge.
- **glass-ui aurora** — owns shader + runtime + `AuroraConfig` + derivation
  (`deriveAuroraPalette` is the missing link). Single coherent surface.
- **value.js demo** — declarative: one ref `cssColorOpaque` drives the atmosphere
  via `useAtmosphere(canvas, color)`. `AuroraPane` is a thin slider table.

The "perfect and refine our extant and basal implementations" half of the user's
directive lands: value.js becomes a one-line consumer; glass-ui gains the only
public-API piece it was missing; the demo gets its atmosphere back wired to the
color it's already displaying.

---

## Citations summary

- glass-ui aurora HEAD: `glass-ui/src/components/custom/aurora/{Aurora.vue,
  presets.ts, index.ts, DESIGN.md, composables/{useAurora,runtime,color,
  useCursorInteraction,configSource}.ts, shaders/aurora.{vert,frag}.ts}`.
- value.js demo W0 state: `demo/color-picker/App.vue:106-215`,
  `demo/@/components/custom/panes/AuroraPane.vue`.
- A.W6 deferral + glass-ui gap routing: `docs/tranches/A/audit/W6-deferred.md`,
  `docs/tranches/A/coordination/Q.md §3` row 2,
  `docs/tranches/A/research/Ae-structure-blob-aurora.md §B, §C (Ae-7..Ae-11)`.
- W0 migration commit: value.js `c20f609` (`fix(tranche-a/w0)`).
- Older aurora schema: glass-ui `637955b:src/components/custom/aurora/composables/
  useAurora.ts:14-100` (the pre-v4.1 `AuroraConfig` + `deriveColors`
  + `ATMOSPHERE_PRESET`).
- value.js library color exports: `src/index.ts:60-213, 322`.
- Demo harmony precedent: `demo/@/components/custom/color-picker/composables/
  useColorGeneration.ts:53-140`.
