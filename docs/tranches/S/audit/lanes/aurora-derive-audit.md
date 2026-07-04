# S.audit — AURORA truth (S-18 tech half): does the atmosphere consume the current color?

**Lane:** aurora-derive-audit · **Mode:** AUDIT-ONLY (tranche development) · **Repo:** value.js @ tranche-q (`c5aa091`)
**Siblings (READ-ONLY):** glass-ui @ **4.2.0** (`../glass-ui`), keyframes 5.1.0, parse-that 0.13.0
**Live probes:** dev server `http://localhost:9000` (render mode resolved **`webgl`** on this GPU; app shell in **dark mode**, `<html class="dark">`)

---

## Executive verdict

**S-18's three literal claims are FALSE as stated — and the wiring is fully intact.** Measured live:

| Probe (seed) | Method | Result |
|---|---|---|
| pink `lab(92% 88.8 20)` → blue `oklch(.45 .28 264)` | full reload | background field **pink → deep blue** (`aurora-A`, `aurora-B`) |
| orange `oklch(.7 .2 30)` → green `oklch(.7 .2 150)` | **live `hashchange`, NO reload** | whole viewport **pink-red → vivid green** (`aurora-C`, `aurora-D`) |
| neutral `oklch(.6 .03 30)` | live | muted warm wash — low-chroma, lightness-dominant (`aurora-E`) |

The seed **does** flow to the atmosphere, **live** (no reload needed), and the derived field varies **H, C, and L** — strongly for large jumps. There is **no P0 wiring break**; "does not update at all" is not reproducible.

**But the user's perception is real and reconciles to three genuine defects** (verify + deepen, never dismiss):

1. **Dark-mode luminosity mismatch (P1)** — the app is in dark mode, yet the aurora is *always* derived on the **light** L-band `[0.35, 0.95]`; the purpose-built **dark** band `[0.18, 0.72]` is **unreachable through the atoms door**. A pale-pastel field washes over the dark shell → reads flat/weak.
2. **Lightness-dominant cross-zone variation (P1)** — the derive default is `harmony:"analogous"` at `hueSpread≈28°`, so the 4 field stops span only ±28° of hue while **L spans the full 0.32-unit band**. Across the field's few zones the eye reads a **lightness ramp of ~one hue** — precisely "just lightness, not H and C." The knobs to widen it (`hueSpread`, a chroma-variance control) are **not surfaced on the atoms door**.
3. **Occlusion → "weak" (P2)** — two large glass cards + dock cover ~70% of the viewport; even a strong field reads as a thin colored frame.

---

## The wiring map (seed → atmosphere)

```
picker color model
  └─ App.vue:158-164  watch(safeAccentCss) → documentElement.style["--accent-live"]   ← accent axis (full color)
  └─ cssColorOpaque (CSS_COLOR_KEY)
       └─ useAtmosphere.ts:84-95  watch(cssColorOpaque, immediate)
              try { deriveAurora(css) }  // parse-probe guard
              auroraAtoms.seed = css                                   ← THE seed write
       └─ useAtmosphere.ts:60-65  useAurora(canvas, () => resolveAtoms(auroraAtoms), …, {renderMode})
              (glass-ui) useAurora.ts:228  stopWatch = watch(getCfg, next => inst.update(next), {deep:true})
                    └─ getCfg = () => resolveAtoms(auroraAtoms)         ← deep-watch re-runs on any atom change
                          (glass-ui) atoms.ts:283-295  deriveAurora(seed, {harmony, stopCount:4, temperatureShift})
                                (glass-ui) color.ts:222-302  → 4 OKLCh stops (L-ramp + bell-C + hue walk), gamut-mapped
       └─ useAtmosphere.ts:72-76  auroraCssGradient (only when renderMode==="css") → App.vue:7 canvas backgroundImage
       └─ useAtmosphere.ts:108-122 watch(cssColorOpaque) → blobConfig.color.paletteStops (the hero blob, separate)
```

**Accent axis (parallel, also full-color — NOT lightness-only):**
- `style.css:160` `--accent-live: oklch(0.632 0.214 13.5)` (default, overwritten live by App.vue:161)
- `style.css:175` `--accent-view: oklch(from var(--accent-live) l c calc(h + var(--view-hue-shift)))` — **preserves L & C, shifts H** per view
- `style.css:176` `--primary: var(--accent-view)` · `style.css:178` `--glass-tint-source: var(--accent-live)` (glass frost tint = picked color)

**Conclusion of the trace:** every seam is live and reactive. `resolveAtoms` returns a fresh object each call; Vue's `{deep:true}` watch tracks the reactive `auroraAtoms.*` reads inside the getter, so a seed write re-derives + re-uploads to the runtime. Verified live (probe C→D, no reload).

---

## Findings (ranked, each root-routed)

### P1 — Aurora ignores the app color-scheme; the dark luminosity band is unreachable
**Evidence:** app is `<html class="dark">` (probe E). `useAtmosphere.ts:60-65` calls `resolveAtoms(auroraAtoms)`; `atoms.ts:283-295` calls `deriveAurora(seed, {harmony, stopCount, temperatureShift})` — **no `scheme`, no `lBand`**. `color.ts:245` therefore resolves to `DERIVE_L_BAND = [0.35, 0.95]` (`color.ts:182`, the *light* band) unconditionally. The dark band `DERIVE_L_BAND_DARK = [0.18, 0.72]` (`color.ts:190`) — authored (per its own docstring) for exactly "a rich luminous-dark wash, never a washed-pale composite behind glass in a dark shell" — is dead code from the atoms door: **`AuroraAtoms` has no `scheme` field** (confirmed `dist/…/atoms.d.ts` fields = seed/harmony/colorEnergy/zones/noise/medium/motion/interactivity).
**Failure:** in dark mode the field is a pale pastel wash that fights the dark shell and reads flat ("weak"). `paletteToCssGradient` fallback inherits the same band.
**Root routing:** **glass-ui producer (primary)** — surface `scheme?: "light"|"dark"` (and optionally `lBand`) on `AuroraAtoms`, thread it through `resolveAtoms → deriveAurora` (additive, default-preserving per the existing `WarpMode`-widen precedent). **+ value.js demo (consumer wiring)** — pass the app's dark/light state into the atoms (`useAtmosphere.ts`), so dark mode requests the dark band.

### P1 — Cross-zone variation is lightness-dominant ("vary H and C, not just lightness")
**Evidence:** demo default `DEFAULT_AURORA_ATOMS.harmony = "analogous"` (`keys.ts:22-33`). `resolveAtoms` (`atoms.ts:283-295`) does **not** override `hueSpread`, so `deriveAurora` uses the default `hueSpread=28` (`color.ts:132`). `deriveHue` for `analogous` walks `anchor ± hueSpread` (`glass-ui color.ts index leaf:211-213`) = ~56° total across 4 stops, while `lightnessSpread=0.32` spans the whole band and chroma is a gentle `bell` (`color.ts:276-283`). Net: across the ~5 zones the dominant axis is **L**. Confirmed visually at the neutral seed (`aurora-E`) — a warm lightness ramp of essentially one hue.
**Available-but-unused levers:** the harmony vocabulary (`ColorHarmony`: analogous / complementary / split-complementary / **triad** ±240° / **tetradic** ±270° / monochrome, `glass-ui color.ts index leaf:164-215`) and `DeriveAuroraOptions.hueSpread` / `chromaFalloff` (`color.ts:128-137`) already exist — they are just not surfaced on the atoms door nor chosen by the demo default.
**Root routing:** **value.js demo** — change the derive-shape default (`keys.ts` harmony `analogous` → a wider scheme, e.g. `split-complementary`/`triad`, a DESIGN call for the design lane). **+ glass-ui producer** — expose `hueSpread` and a **chroma-variance** control on `AuroraAtoms` (today `colorEnergy` scales global saturation but there is no *cross-stop* chroma-spread knob), so a consumer can request "vary H **and** C across the zones" without leaving the door.

### P2 — Occlusion makes a strong field read as a thin frame ("the effect is weak")
**Evidence:** `App.vue:2-10` canvas is `absolute inset-0`, full-opacity, un-attenuated; the two panes + dock cover most of it (all screenshots). The field is only visible at the margins/corners.
**Root routing:** **value.js demo (design/layout)** — the design lane decides how much aurora to expose (card translucency, inset margins, or letting the field bleed through glass more). Not a code break.

### P2 — CSS-fallback substrate is static (no motion) on software-raster / blocklisted GPUs
**Evidence:** `useAtmosphere.ts:58` `resolveRenderMode("auto")`; on SwiftShader/llvmpipe/MS-Basic (`renderMode.ts:37-62`) it returns `"css"` → `paletteToCssGradient` (a static 135° linear gradient, `color.ts:86-95`). It still re-derives on color change (the computed at `useAtmosphere.ts:72-76` is reactive) but does **not** animate → reads dead. A user on a blocklisted GPU / some headless contexts would see this. **Safari (S-22):** the WebGL path arms via a rAF/setTimeout fallback (`useAurora.ts:96-108`) — worth a live Safari check in impl (out of this lane's scope; noted for S-22 lane).
**Root routing:** **glass-ui producer** — known/intended tradeoff; a design-lane call whether the CSS fallback should carry a cheap CSS-animated wash. Low priority.

---

## The H/C-varying derivation the design lane should spec (routed at root)

**Goal:** the aurora field's few zones should differ meaningfully in **H and C**, not just L, and honor the dark shell.

**Routed to glass-ui (the derive is the producer's color engine — S-21 "at the root"):**
1. Add `scheme?: "light" | "dark"` (and pass-through `lBand?`) to `AuroraAtoms`; thread `atoms.scheme → deriveAurora({scheme})` in `resolveAtoms` (`atoms.ts:283-295`). Additive, default `light` → byte-identical for existing consumers.
2. Add `hueSpread?` to `AuroraAtoms` (thread to `deriveAurora`), and a **chroma-variance** atom (a cross-stop C spread that widens the `bell` amplitude / floors), so one knob asks for "richer H+C travel across the zones." `colorEnergy` stays the *global* saturation/temperature knob; the new axis is the *spatial* H/C spread.
3. (Optional, design's call) widen the analogous default `hueSpread` (28°) or make the wider harmonies the aurora default shape.

**Routed to value.js demo (consumer wiring + design defaults):**
4. Thread the app dark/light state into `useAtmosphere.ts` → `auroraAtoms.scheme` (so dark mode gets `[0.18,0.72]`).
5. Set `DEFAULT_AURORA_ATOMS` (`keys.ts:22-33`) harmony/hue-spread/chroma-variance to the design-chosen richer shape (e.g. `split-complementary` + a raised hue-spread) so the shipped field varies H+C across zones out of the box.
6. Design-lane call on aurora exposure vs. card occlusion (P2) so the richer field is actually seen.

---

## Candidate wave-items (S)

- **S-AUR-1 (glass-ui):** surface `scheme` (+`lBand`) on `AuroraAtoms`; thread through `resolveAtoms → deriveAurora`. Additive, default-preserving. *(P1, dark-mode washout)*
- **S-AUR-2 (glass-ui):** surface `hueSpread` + a cross-stop **chroma-variance** control on `AuroraAtoms`; thread through the derive. *(P1, lightness-dominant field)*
- **S-AUR-3 (value.js demo):** wire app color-scheme → `auroraAtoms.scheme`; retune `DEFAULT_AURORA_ATOMS` to the design-chosen richer H/C shape (`keys.ts`). *(P1)*
- **S-AUR-4 (value.js demo, design):** aurora exposure vs. card occlusion — how much field to reveal. *(P2)*
- **S-AUR-5 (S-22 lane hand-off):** live-verify the WebGL arm path on Safari; CSS-fallback animation decision. *(P2)*

**Non-findings (explicitly cleared):** the seed IS consumed, live, full H/C/L; the accent axis (`--accent-live`/`--accent-view`/`--glass-tint-source`) IS full-color (not lightness-only); no aurora console errors (the 2 console errors are the palette-API CORS — S-11, unrelated). No product-code was modified; no commits.

## Screenshot evidence (repo root)
`aurora-A-initial.jpeg` (pink) · `aurora-B-blue.jpeg` (blue, reload) · `aurora-C-orange-baseline.jpeg` · `aurora-D-green-live.jpeg` (live hashchange, no reload) · `aurora-E-neutral.jpeg` (low-chroma wash).
