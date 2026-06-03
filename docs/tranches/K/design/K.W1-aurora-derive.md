# K.W1 — Aurora derived from color (the oldest chronic mandate) + the VAL-1 LUT gate

**Wave**: K.W1 (DEV/design) — a CORE spec. **Owning IMPL wave**: K.W4 (`docs/tranches/K/K.md §3` row K.W4). **Status**: authored 2026-06-02.
**Discharges**: mandate #23 — *aurora derived from a singular color* (A turn-1 m.13 / D-open #6 / VAL-1). The longest chronic deferral: A→J, 7+ tranches (`K.md §7`). Unblocked by paired-authorship — K co-authors the glass-ui derive (the cohort boundary is OPEN, `coordination/glass-ui.md §3`).
**Binds**: inv-K-1 (the derive lives glass-ui-side, consuming the value.js *library*; no `value.js(lib) → glass-ui` edge), inv-K-2 (no new color math — it consumes value.js's canonical OKLab core), inv-K-3 carve-out (aurora *genuinely* needs OKLab and so consumes value.js **by design** — this is the explicit contrast to the blob's color-agnostic seam).

This spec governs four landings, in dependency order:

1. **`deriveAuroraPalette(baseColor, config)`** — authored **in glass-ui** (`aurora/composables/color.ts`) on the value.js OKLCh core.
2. **`AuroraPane.vue`** — rebuilt from the "under rework" stub into a live `SliderSection[]` table over the flat-scalar `AuroraConfig` fields.
3. **`App.vue` wiring** — picker color → `auroraConfig.palette`, replacing the static `structuredClone(DEFAULT_AURORA_CONFIG)`; the runtime-observed re-tint is the close gate.
4. **VAL-1 ship-or-kill** — the OKLab aurora-LUT ships IFF the glass-ui derive + a 2nd consumer are live by K.W4 close; else KILL per the J kill-date.

---

## §1 — Ground truth (verified at K.W1, file:line)

The prior audits found doc-vs-reality drift; every claim below is read from source.

| Claim | Evidence |
|---|---|
| `deriveAuroraPalette` does **not** exist — needs authoring | `grep -rn "deriveAuroraPalette\|deriveAurora" ../glass-ui/src/` → zero hits |
| glass-ui aurora `__tests__/` does **not** exist yet | `ls .../aurora/__tests__/` → absent (the equivalence test K.W2 adds is NEW) |
| value.js is a **devDep** in glass-ui (the phantom dep K.W2 promotes) | `../glass-ui/package.json:553` `"@mkbabb/value.js": "^0.10.0"` under `devDependencies` |
| `AuroraConfig` is the 30-field shape; `palette: OklchStop[]` (2..8), `OklchStop = {L,C,h}` | `../glass-ui/.../aurora/presets.ts:16-20, 68-106` |
| `AuroraPane.vue` is the "under rework" stub — empty sections, informational message | `demo/@/components/custom/panes/AuroraPane.vue:16-33` |
| `App.vue` static-clones the default config (no picker tracking) | `demo/color-picker/App.vue:212` `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` |
| `useAurora` deep-watches the config getter and re-tints on mutation | `../glass-ui/.../aurora/composables/useAurora.ts:201` `watch(getCfg, (next) => inst?.update(next), { deep: true })` |
| `update()` re-bakes the palette into the GPU uniform buffer in place | `../glass-ui/.../aurora/composables/runtime.ts:378-380` `flattenPalette(cfg.palette, MAX_STOPS, ub.palette)` → `uniform3fv(U.uPalette, …)` |
| value.js exports the OKLab core the derive needs | `src/index.ts:148` `oklabToLinearSRGB`, `:154` `srgbToOKLab`, `:120` `color2`, `:140` `colorUnit2`, `:270` `parseCSSColor` |
| glass-ui's `srgbToOKLab`/`oklabToLinearRgb` are byte-for-byte the value.js Ottosson coefficients (the K.W2 deletion target) | `../glass-ui/.../color.ts:20-27` vs `src/units/color/gamut.ts:293-298` (same `0.2104542553 … 0.7936177850 …`) |
| glass-ui's `oklabToOklch`/`oklchToOklab` are pure trig consumer-helpers (KEPT per coordination) | `../glass-ui/.../color.ts:30-39` — not matrix math; `coordination/glass-ui.md:32` keeps them |
| The `SliderSection`/`SliderDef` descriptor + the flat `config[key]=value` update already exist | `demo/@/components/custom/panes/ConfigSliderPane.vue:25-39, 57-59` (the BlobPane model: `BlobPane.vue:23-80`) |

**One contradiction with the K plan — recorded, not silently absorbed:** `K.md §5` (the critical-files table, row "Aurora derive") and `coordination/glass-ui.md:37` both place `deriveAuroraPalette` in **`aurora/composables/color.ts`**. That file is exactly the file K.W2 *guts* (deletes the OKLab/sRGB matrix dup from it). The two operations are compatible — K.W2 removes the duplicated *matrix/transfer* functions and adds the value.js import; K.W4 adds `deriveAuroraPalette` to the now-value.js-backed file — but the spec must **sequence them** (W2-before-W4, already the dependency order) so the derive is authored against the post-dedup module, not the pre-dedup one. No relocation; the file is correct, the *order* is load-bearing. (See §6.)

---

## §2 — `deriveAuroraPalette` — the algorithm (glass-ui-side, value.js core)

### §2.1 — Signature and home

```ts
// ../glass-ui/src/components/custom/aurora/composables/color.ts  (K.W4, post-W2-dedup)
import { srgbToOKLab } from "@mkbabb/value.js";   // peerDep — the canonical Ottosson path
import { oklabToOklch } from "./color";           // KEPT local trig helper (color.ts:30)

export interface DeriveOptions {
    /** Stops to emit. Clamped to [2, MAX_STOPS]. Default 3 (matches DEFAULT_AURORA_CONFIG). */
    stops?: number;
    /** Hue spread in degrees across the analogous fan. Default 40. 0 = monochrome. */
    hueSpread?: number;
    /** Lightness of the lightest stop (0..1). Default 0.95 — the atmospheric "sky" top. */
    lightTop?: number;
    /** Lightness of the darkest/most-saturated stop. Default 0.62. */
    lightBottom?: number;
    /** Chroma scale applied to the base chroma. Default 1.0. */
    chromaScale?: number;
}

/**
 * Derive an atmosphere palette (OklchStop[]) from a single base color.
 * The base color is ANY CSS color string OR an [r,g,b] in [0,1] — ingested
 * through value.js's canonical Ottosson sRGB→OKLab path (inv-K-2). No matrix
 * math is implemented here; this function is pure orchestration over the
 * value.js core + the kept local polar helper.
 */
export function deriveAuroraPalette(
    baseRgb: [number, number, number],   // sRGB in [0,1] — the demo resolves the CSS string first (§4)
    opts: DeriveOptions = {},
): OklchStop[];
```

**Why `[r,g,b]` not a CSS string at the glass-ui boundary.** The blob's color-agnostic seam (inv-K-3, `K.W1-primitive-lift.md`) keeps `parseCSSColor` out of glass-ui *primitives*. The aurora derive is the deliberate inv-K-2 *contrast*: it genuinely needs OKLab, so it consumes value.js's `srgbToOKLab` directly. But CSS *string* parsing (`parseCSSColor`) is a heavier surface than the derive needs — the derive only needs the base in sRGB. So the glass-ui function takes `[r,g,b]` and the **demo** does the CSS→RGB resolution via value.js `parseCSSColor` at the call site (§4). This keeps the glass-ui derive's value.js dependency to the single function it actually requires (`srgbToOKLab`), matching the minimal-coupling discipline of inv-K-3 even though inv-K-2 would permit more.

### §2.2 — The derivation (KISS — analogous fan in OKLCh)

The base color anchors a short **analogous palette** that reads as a single-hued atmosphere (the mandate: *"aurora derived from a singular color"*). The algorithm is deliberately the simplest thing that re-tints visibly and stays in-gamut:

1. **Ingest** — `[L, a, b] = srgbToOKLab(r, g, b)` (value.js, raw OKLab), then `[L0, C0, H0] = oklabToOklch(L, a, b)` (kept local trig). This is the base in OKLCh.
2. **Hue fan** — emit `n = clamp(opts.stops ?? 3, 2, MAX_STOPS)` stops with hue swept across `[H0 − hueSpread/2, H0 + hueSpread/2]` (default ±20°). Analogous, never complementary — keeps the "singular color" read.
3. **Lightness ramp** — interpolate `L` linearly from `lightTop` (lightest stop, the sky) down to `lightBottom` (the saturated base), so the atmosphere has top-light depth regardless of the base's own lightness.
4. **Chroma shaping** — `C = C0 * chromaScale`, attenuated toward the light stop (the top reads desaturated/atmospheric, the bottom carries the base chroma). A near-gray base (`C0 ≈ 0`) yields a near-gray atmosphere — correct, no synthetic chroma injected.
5. **Return** `OklchStop[]` — `{L, C, h}` per stop, ready for `flattenPalette` (which `oklchToLinear`-bakes each stop into the GPU buffer, `runtime.ts:378`).

No gamut clamp is needed at this layer: `flattenPalette`/`oklchToLinear` already `Math.max(0, …)`-clamps the linear-sRGB output (`color.ts:81`), and the shader ACES-tonemaps in linear. If a stricter in-gamut guarantee is wanted, the value.js `gamutMapOKLab` (`src/index.ts:153`) is the available lever — **named, not pre-wired** (KISS: only add it if a runtime out-of-gamut artifact is observed at K.W4).

**Determinism + perf.** Pure function, no allocation beyond the returned array (≤ 8 stops). Called only when the picked color changes (§4 — a `watch`, not per-frame), so it is off the hot path; `flattenPalette` already owns the per-frame in-place bake.

### §2.3 — Export

Add `deriveAuroraPalette` + `type DeriveOptions` to the aurora barrel (`../glass-ui/.../aurora/index.ts:26-33`, the `from "./composables/color"` re-export block — extend the existing list; it already exports `cssToOklch`, `flattenPalette`, `oklchToLinear`).

---

## §3 — `AuroraPane.vue` — rebuild from the stub

The stub (`AuroraPane.vue:16-33`) passes empty sections to `ConfigSliderPane` and renders the "under rework" message. The rebuild populates the live `SliderSection[]` — exactly the `BlobPane.vue:23-80` model.

**Critical type constraint (verified, not assumed).** `ConfigSliderPane`'s `update(key, value)` does a flat `config[key] = value` (`ConfigSliderPane.vue:57-59`). So the slider table may only drive **flat numeric fields** of `AuroraConfig`. Of the 30 fields (`presets.ts:68-106`), the flat-scalar tunables are: `softmaxBeta`, `valueVariance`, `warpAmount`, `warpScale`, `warpDrift`, `strokeAmount`, `strokeScale`, `strokeAnisotropy`, `wetEdge`, `granulation`, `impasto`, `brokenColor`, `canvasGrain`, `nucleiDrift`, `paletteDrift`, `breathDepth`, `breathPeriod`, `saturation`, `paperGrain`, `alpha` (20 scalars). The **nested** fields — `palette: OklchStop[]`, `nuclei: AuroraNucleus[]`, `flow: AuroraFlow`, and the enum/union fields `warpMode`/`medium`/`strokeMode`/`noiseOctaves`/`strokeLayers` — are **NOT** slider-table rows:

- `palette` is driven by the **derive wiring** (§4), not a slider — that is the whole point of the mandate.
- `nuclei`/`flow`/the enums are out of scope for the K.W4 slider table (no flat-key path through `ConfigSliderPane`). They retain their `DEFAULT_AURORA_CONFIG` values. (A future enum-row / nested-editor extension to `ConfigSliderPane` is **named-forward**, not K.W4 work — KISS.)

**The descriptor** (the same `s(key,label,min,max,step)` typed-key helper as `BlobPane.vue:19`, with `NumericKey` narrowing over `AuroraConfig`):

```ts
const SECTIONS: SliderSection[] = [
  { title: "Composition", defs: [ s("softmaxBeta","Blend β",3,10,0.1), s("valueVariance","Value Var",0,0.3,0.005), s("saturation","Saturation",0.6,1.3,0.01) ] },
  { title: "Warp",        defs: [ s("warpAmount","Amount",0,0.6,0.005), s("warpScale","Scale",0.5,3,0.05), s("warpDrift","Drift",0,0.015,0.0005) ] },
  { title: "Stroke",      defs: [ s("strokeAmount","Amount",0,1,0.01), s("strokeScale","Scale",40,320,1), s("strokeAnisotropy","Anisotropy",0,1,0.01),
                                  s("wetEdge","Wet Edge",0,1,0.01), s("granulation","Granulation",0,1,0.01), s("impasto","Impasto",0,1,0.01),
                                  s("brokenColor","Broken",0,1,0.01), s("canvasGrain","Canvas Grain",0,0.1,0.002) ] },
  { title: "Motion",      defs: [ s("nucleiDrift","Nuclei Drift",0,0.05,0.001), s("paletteDrift","Palette Drift",0,0.04,0.001),
                                  s("breathDepth","Breath Depth",0,0.15,0.005), s("breathPeriod","Breath Period",10,90,1) ] },
  { title: "Output",      defs: [ s("paperGrain","Paper Grain",0,0.02,0.0005), s("alpha","Alpha",0,1,0.01) ] },
];
```

(Ranges read directly from the `presets.ts:68-106` inline comments — the source of truth for each field's domain.) `:config` is the shared reactive `auroraConfig` (injected — see §4), `:defaults` is `DEFAULT_AURORA_CONFIG`, `title="Atmosphere"`. The "under rework" `<div>` block and the W0 comment header are deleted (no shim — `feedback_no_backwards_compat.md`).

**Shared-config plumbing.** `AuroraConfig` currently lives only as a local `reactive` in `App.vue:212`. The pane needs the **same** reactive instance (so slider edits and the derive both hit one object the runtime deep-watches). K.W4 provides it via an injection key — `AURORA_CONFIG_KEY` (a new key in the panes' `keys.ts`, mirroring `BLOB_CONFIG_KEY` at `goo-blob`), `provide`d in `App.vue`, `inject`ed in `AuroraPane.vue` (the `BlobPane.vue:12` pattern exactly). This is the minimal seam — no new store, no facade.

---

## §4 — `App.vue` wiring — picker → atmosphere re-tint (the close gate)

The static clone at `App.vue:212` is replaced by a derive-driven reactive whose `palette` tracks the picker color.

**What exists** (`App.vue:84-215`, verified): the picker color is available as `cssColor` (a computed CSS string, `useAppColorModel` → `App.vue:125`) and `cssColorOpaque` (`:137`, the alpha-stripped opaque variant — the correct input for an atmosphere, which has its own `alpha` field). `useAurora(atmosphereCanvas, () => auroraConfig, …)` is already wired at `:213` and deep-watches the getter (`useAurora.ts:201`).

**The wiring** (replaces `:209-215`):

```ts
import { parseCSSColor } from "@src/index";               // value.js — the demo's CSS→color resolution (inv-K-3 boundary)
import { deriveAuroraPalette } from "@mkbabb/glass-ui/aurora";

const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));
provide(AURORA_CONFIG_KEY, auroraConfig);                 // AuroraPane consumes the SAME instance (§3)

// Re-tint: when the picked color changes, re-derive ONLY the palette in place.
// Mutating .palette (not replacing auroraConfig) preserves slider-pane edits to
// the other 20 scalar fields. useAurora's deep watch (useAurora.ts:201) fires →
// runtime.update() re-bakes uPalette (runtime.ts:378) → the atmosphere re-tints.
watch(cssColorOpaque, (css) => {
    const rgb = cssColorToRgb01(css);                     // value.js parseCSSColor → [r,g,b] in [0,1]
    auroraConfig.palette = deriveAuroraPalette(rgb, { stops: 3 });
}, { immediate: true });

useAurora(atmosphereCanvas, () => auroraConfig, {
    onInitError: (err) => console.warn("[aurora] init failed:", err),
});
```

`cssColorToRgb01` is the thin demo-side adapter: `parseCSSColor(css)` → convert to sRGB → return `[r,g,b]` in [0,1]. The demo already routes ≥5 canvas color-resolvers through `parseCSSColor` (the K.W3 `K.W1-primitive-lift.md` D2 work) — this reuses that same demo helper rather than adding a 1×1-canvas (no `cssToRgb` from glass-ui's `color.ts:152`, which K.W2 keeps glass-ui-side only for its own placeholder path). If a single shared `cssColorToRgb01` is not already extracted by K.W3, K.W4 lifts it from the K.W3 resolver work — **not** a new abstraction, a reuse.

**Why `immediate: true`** — the first derive runs at mount so the atmosphere opens tinted to the default color, not the static `DEFAULT_AURORA_CONFIG.palette`. **Why mutate `.palette` not replace `auroraConfig`** — the `AuroraPane` sliders edit the other 20 fields on the same object; replacing the object would clobber them and break the deep-watch identity.

**The close gate (runtime-observed, π-lane binding).** Changing the picked color **visibly re-tints the atmosphere**. The π `picker` capture (`K.W1-visual-evidence-protocol.md §3`) pairs a BEFORE (default tint) with an AFTER (a distinctly-hued picked color, e.g. a deep magenta) and asserts the atmosphere canvas's sampled pixels shifted hue — a `readPixels` non-equality between two picked colors, mirroring the blob present/positioned assertion (`§4` of the protocol). This is the K.W4 `K.md §6` hard gate: *"changing the picked color visibly re-tints the atmosphere (runtime-observed, π-lane frame evidence)."*

---

## §5 — VAL-1 — the OKLab-LUT binary gate (ship-or-kill)

**The booking** (read from `docs/tranches/J/FINAL.md §2`): VAL-1 (OKLab aurora-LUT) is **BOOKED + kill-date**. *Verdict*: "Substrate-without-consumer is binary. Gated on glass-ui `deriveAurora()` adoption + a 2nd consumer. **Trigger**: fires at K.W4 (aurora-derive); if not live by **K.W4 close**, KILL." The conversion math (`src/units/color/conversions/oklab.ts`) already exists — VAL-1 ships **no new library code now**.

**What VAL-1 *is*.** A CPU-baked OKLab→linear-sRGB lookup the aurora shader samples instead of recomputing the OKLab→linear transform per-fragment. The bake is exactly `flattenPalette` (`color.ts:90`) — it already `oklchToLinear`-bakes the OklchStop palette into a `Float32Array` the shader reads as `uPalette` (`runtime.ts:378-379`). **VAL-1 is the assertion that this bake path is the value.js LUT, fed by a value.js-derived palette** — not a new artifact to author.

**The two consumers (the binary gate):**

| # | Consumer | Status under K.W4 | Evidence |
|---|---|---|---|
| 1 | glass-ui aurora `flattenPalette` baking a `deriveAuroraPalette` palette | **LIVE at K.W4** | §2 authors the derive; `flattenPalette` already bakes (`color.ts:90-109`) |
| 2 | the demo `App.vue` picker→`auroraConfig.palette` wiring driving (1) at runtime | **LIVE at K.W4** | §4 wires it; the re-tint is runtime-observed |

Because K **co-authors both halves** (the glass-ui derive AND the demo wiring — the boundary is open, `coordination/glass-ui.md`), the ≥2-consumer gate that blocked VAL-1 for 7 tranches is **no longer external**. Both land in K.W4.

**SHIP-IFF / KILL decision (executed at K.W4 close):**

- **SHIP** — IFF `deriveAuroraPalette` is live in glass-ui AND the demo re-tint is runtime-observed (the §4 close gate green). VAL-1's disposition flips BOOKED → **LANDED**; recorded in `K/FINAL.md` with the two-consumer evidence row. No new `src/` code — VAL-1 was always "the consumer arrives," and the consumer is §2+§4.
- **KILL** — IF either half slips past K.W4 close (the derive is not authored, or the wiring does not re-tint at runtime). Per the J kill-date, VAL-1 is **KILLED** (not re-booked — the J verdict forbids a perpetual punt): recorded BOOKED → **KILLED** in `K/FINAL.md` with the rationale "the 2nd-consumer gate did not fire by the kill-date." The library is unaffected either way (the OKLab conversion math stays — it has other consumers).

This makes VAL-1 a clean binary at one named close, satisfying the J-FINAL §2 "no perpetual punts" demand.

---

## §6 — Work-order (K.W4 — sequenced; the cohort lockstep)

The cohort discipline (`coordination/glass-ui.md §"Lockstep"`): **glass-ui-side commit lands first, then value.js consumes.** Within K.W4:

1. **(glass-ui, prereq)** Confirm K.W2 already landed the `color.ts` dedup (the OKLab/sRGB matrix dup deleted, value.js `srgbToOKLab` imported) AND the peerDep promotion. K.W4 authors `deriveAuroraPalette` **against the post-dedup module** (the §1 sequencing contradiction — W2-before-W4 is the resolution). If K.W2's dedup is not yet merged, K.W4 is blocked on it (it is — W2 precedes W4 in `K.md §3`).
2. **(glass-ui)** Author `deriveAuroraPalette` + `DeriveOptions` in `aurora/composables/color.ts` (§2); export from `aurora/index.ts`. Add a focused unit test (the analogous-fan / lightness-ramp / near-gray-stays-gray cases) — colocated with the K.W2 `__tests__/color-equivalence.test.ts` (NEW dir).
3. **(value.js demo)** Add `AURORA_CONFIG_KEY` to the panes `keys.ts`; `provide` the shared reactive in `App.vue` (§4).
4. **(value.js demo)** Rebuild `AuroraPane.vue` against the §3 `SECTIONS` descriptor (inject the shared config; delete the stub).
5. **(value.js demo)** Replace `App.vue:209-215` with the derive `watch` wiring (§4).
6. **(close)** Run the π `picker` re-tint assertion (§4 close gate). Execute the VAL-1 SHIP-or-KILL verdict (§5); record in `K/FINAL.md`.

**Reversibility (the K.W2–W3 brittleness window, `K.md §8`):** each step is a single paired-commit boundary. The derive is additive (a new exported function — reverting it does not re-red anything); the demo wiring reverts to the static clone by reverting steps 3–5. The equivalence-test canary (K.W2) must stay green at the §6.2 glass-ui commit.

---

## §7 — Out of scope / named-forward (KISS — no invented work)

- **Nuclei / flow / enum editing in `AuroraPane`** — `ConfigSliderPane`'s flat `config[key]=value` cannot drive nested arrays or unions. Named-forward (a `ConfigSliderPane` enum-row/nested extension) only if a consumer demands it; K.W4 ships the 20-scalar table + derive-driven palette.
- **`gamutMapOKLab` pre-wiring in the derive** — the bake already clamps (`color.ts:81`); add the value.js gamut map only if a runtime out-of-gamut artifact is observed at K.W4 (§2.2).
- **A `parseCSSColor` default baked into the glass-ui derive** — forbidden by the minimal-coupling discipline (§2.1): the glass-ui derive takes `[r,g,b]`, the demo resolves the CSS string. (This is the inv-K-3 *spirit* even where inv-K-2 permits the heavier dep.)
- **`cssToRgb` from glass-ui `color.ts:152`** stays glass-ui-internal (its placeholder path); the demo uses value.js `parseCSSColor` (inv-K-2 single core).

---

## §8 — Hard gates (this spec's K.W4 deliverables, per `K.md §6`)

- `AuroraPane.vue` drives the live `AuroraConfig` scalar table (no "under rework" stub) — `git` shows the stub `<div>` deleted, the `SECTIONS` array present.
- `deriveAuroraPalette` exists in glass-ui aurora, consumes the value.js OKLab core (`srgbToOKLab`), implements **no** new OKLab/sRGB matrix math (inv-K-2) — close-time grep confirms the only matrix definitions are in value.js.
- Changing the picked color **visibly re-tints** the atmosphere — runtime-observed, π-lane `picker` `readPixels` hue-shift assertion (§4).
- VAL-1 verdict executed (SHIP→LANDED or KILL) and recorded in `K/FINAL.md` with the two-consumer evidence (§5) — no re-booking.
