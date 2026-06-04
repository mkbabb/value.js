> **Mode: planning-only. NO code.** Authored 2026-06-04 from the visual-grounded audit (2 serial 6-agent workflows over the 84-capture screenshot session). Visual evidence: `../audit/visual-evidence-2026-06-04/DELTA.md`. Synthesis: `../audit/path-forward-2026-06-03-postW2.md §9`.

# K.W4 — aurora-derive + VAL-1 (re-refined against the shipped glass-ui deriveAurora + the W-A C2 pixel verdict)

# K.W4 — aurora-derive + VAL-1, RE-REFINED against the SHIPPED glass-ui `deriveAurora` + the W-A pixel verdict

> **Mode: TRANCHE DEVELOPMENT (planning only). NO code.** This refines
> `docs/tranches/K/design/K.W4-respec-aurora-derive-VAL1.md` with two facts that
> post-date it: (1) the glass-ui session **already authored and exported**
> `deriveAurora` (NOT `deriveAuroraPalette`) — the spec's named function does not
> exist and its signature is wrong; (2) the W-A 84-capture visual run **confirmed
> C2 in pixels** and surfaced a compounding P0 desktop layout-clip. The algorithm,
> packaging, and π-gate are re-stated against the *actual shipped* surface.
> Foundation: `docs/tranches/K/audit/path-forward-2026-06-03-postW2.md` (mechanism-C
> by deletion; dist-consumption; the serial publish spine).

---

## §0 — What changed since the K.W4-respec was written (the two deltas that force this refinement)

### Δ1 — `deriveAurora` is SHIPPED in glass-ui source, under a DIFFERENT name + signature

The K.W4-respec (§A2.1) specs a function named **`deriveAuroraPalette(baseRgb: [number,number,number], opts?: DeriveOptions)`** taking an `[r,g,b]` triple. **That function does not exist.** The live glass-ui session authored instead (read 2026-06-04 at `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts:182-230`):

```
export function deriveAurora(seed: string | OklchStop, options: DeriveAuroraOptions = {}): OklchStop[]
```

with the supporting public surface (all already exported from the aurora barrel, `index.ts:26-37`):

| Symbol | Location | Shape |
|---|---|---|
| `deriveAurora` | `color.ts:182` | `(seed: string \| OklchStop, options?: DeriveAuroraOptions) => OklchStop[]` |
| `type AuroraHarmony` | `color.ts:140-144` | `"analogous" \| "complementary" \| "triad" \| "monochrome"` |
| `interface DeriveAuroraOptions` | `color.ts:146-157` | `{ stopCount?, harmony?, lightnessSpread?, chromaFalloff?, hueSpread? }` |
| `const DERIVE_L_BAND` | `color.ts:164` (module-private) | `[0.35, 0.95]` painterly L window |
| `deriveHue` / `gamutMapStop` | `color.ts:233 / :280` (module-private helpers) | harmony walk + per-stop gamut clamp |

**The reconciliation (binding):** the value.js K.W4 spec MUST adopt the shipped names/signature. There is **no `deriveAuroraPalette`, no `DeriveOptions`, no `baseRgb` triple parameter.** Every reference in the K.W4-respec edit-ledger and §A2/§A4 that says `deriveAuroraPalette(cssColorToRgb01(css), { stops: 3 })` is **wrong on three counts**: (a) wrong function name; (b) `deriveAurora` takes a **CSS string seed directly** (`seed: string | OklchStop`) — it does its OWN `cssToOklch` internally (`color.ts:186`), so the demo does **NOT** need to pre-resolve to an RGB triple; (c) the option key is `stopCount`, not `stops`.

The corrected demo call is:

```
auroraConfig.palette = deriveAurora(cssColorOpaque.value, { stopCount: 3 })
```

— passing the opaque CSS string straight through. **This deletes the `cssColorToRgb01` adapter entirely from the K.W4 demo path** (it is no longer needed for the derive — the function self-parses). The adapter survives only as the Part-B beneficiary for *other* call sites (§B / Lane-out-of-scope), not for the aurora wiring.

**Why this matters for VAL-1 (the 2nd-consumer gate):** the shipped `deriveAurora` is **the algorithm the spec asked for, already gamut-safe**. `gamutMapStop` (`color.ts:280-292`) routes every derived stop through value.js `rawOklchToOklab → gamutMapOKLab → rawOklabToOklch` + a 6-step bounded inward-chroma nudge keyed on `isInSRGBGamut` — i.e. it **already consumes value.js's Ottosson gamut core** (`gamutMapOKLab`, `isInSRGBGamut` imported `color.ts:17-18`). This is materially **stronger** than the K.W1/K.W4-respec algorithm sketch (which deferred `gamutMapOKLab` to "add only if an out-of-gamut artifact is observed", §D). The shipped function is the better artifact; the spec's §A2.2 "author the derive" work is **DONE** — K.W4's glass-ui-side work collapses to **packaging + the equivalence/derive test + the version bump**, NOT authoring.

### Δ2 — C2 is CONFIRMED IN PIXELS, and the `/atmosphere` footer "live" claim is provably FALSE

The W-A run (`docs/tranches/K/audit/visual-evidence-2026-06-04/`, 84 PNGs) confirms:

- **C2 (palette-blind + theme-blind):** every capture across 14 views × 3 viewports × 2 themes shows the **identical static "Sky" preset** — teal top-left → sand-beige horizon bottom-right + a **fixed pink sun-dot at top-center**. `picker-1280-light ≡ mix-1280-light ≡ gradient-1280-light` backgrounds are pixel-identical. The atmosphere never reflects the `Lab(92, 88.8, 20)` magenta the picker is editing. This is exactly `DEFAULT_AURORA_CONFIG.palette` (`presets.ts:148-153`: `{L:.72,C:.10,h:220} {L:.86,C:.06,h:200} {L:.95,C:.03,h:80}` — blue/teal → cream) rendered through the default nuclei. **Verified the root cause in source:** `App.vue:212` `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` is static-cloned and **never written** from the picker — there is no `watch(cssColorOpaque, …)` anywhere in `App.vue`. The palette is frozen at the default.

- **The `/atmosphere` view footer is a FALSE claim.** `AuroraPane.vue:29-31` renders the literal text *"The background atmosphere itself is live."* This is **false** — the atmosphere is static (palette-blind, per above). The W-A verdict names this directly (D8: the `/atmosphere` view is the "under rework" stub; its footer is FALSE). K.W4 must **delete this claim** as part of the AuroraPane rebuild (§A3), not preserve it.

- **Compounding P0 (Lane-2 D1, ties C2):** every secondary desktop view (browse/extract/generate/gradient/mix/palettes/admin) at 1280 renders its content panel pushed off-screen-left to a ~40px sliver, and at 1440 fully BLANK — **nothing but the static aurora overpainting ~100% of the 1440 viewport.** This is a *layout* defect (not aurora-owned) but it **interacts** with C2: because the aurora overpaints the whole viewport, the layout-clip leaves the user staring at a static, wrong-colored sky with no content. **K.W4 does NOT own the layout-clip fix** (that is K.W3/W5 layout per the path-forward §4) — but K.W4's close MUST note that the C2 re-tint is only *visible* on desktop once the layout-clip is fixed, so the **π re-tint gate (§A4) should run at the mobile-375 viewport** (where the panel + atmosphere both render correctly, per the W-A captures) to avoid being masked by the orthogonal layout bug. This is a refinement to the gate's viewport, below.

---

## §1 — Ground truth re-verified (file:line, 2026-06-04)

| Claim | Evidence | Delta vs K.W4-respec |
|---|---|---|
| `deriveAurora(seed: string\|OklchStop, options?: DeriveAuroraOptions): OklchStop[]` is SHIPPED + exported | `glass-ui .../aurora/composables/color.ts:182-230`; barrel `index.ts:29` exports `deriveAurora`, `:37` exports `type AuroraHarmony, DeriveAuroraOptions` | **REPLACES** the spec's phantom `deriveAuroraPalette`. Authoring is DONE. |
| It takes a CSS **string** seed (or `OklchStop`); self-parses via `cssToOklch` internally | `color.ts:186` `typeof seed === "string" ? cssToOklch(seed) : seed` | **KILLS** the `cssColorToRgb01` adapter from the demo aurora path — the demo passes `cssColorOpaque.value` directly |
| Options: `stopCount` (default 4, clamp [2,MAX_STOPS]), `harmony` (default "analogous"), `lightnessSpread` (.32), `chromaFalloff` (.85), `hueSpread` (28) | `color.ts:146-157, :188-196` | **REPLACES** `{ stops, hueSpread, lightTop, lightBottom, chromaScale }`. The spec's `stops:3` becomes `stopCount:3` |
| Every derived stop is gamut-mapped through value.js `gamutMapOKLab` + `isInSRGBGamut` | `color.ts:227` `gamutMapStop(...)`; `:280-292` consumes `gamutMapOKLab`/`isInSRGBGamut` (imported `:17-18`) | **STRONGER** than spec §D ("add gamutMap only if artifact observed") — it is already in. VAL-1's "value.js core consumed" is satisfied richly. |
| `cssToOklch` STILL carries the `parseCSSColor(css) as Parameters<typeof colorUnit2>[0]` cast + `Number(rgb.r/.g/.b)` unwrap | `color.ts:124-126` | unchanged — the Part-B site-10 fix (§B5 of the respec) is STILL pending; `deriveAurora` inherits this cast transitively via `cssToOklch` |
| `DEFAULT_AURORA_CONFIG.palette` = the blue/teal "Sky" the W-A captures show | `presets.ts:148-153` | the C2 static palette, root-confirmed |
| `App.vue` static-clones the config, NO picker watch | `App.vue:209-215`; grep confirms no `watch(cssColorOpaque` in App.vue | the C2 defect site; `:210-211` comment still cites retired "A.W6 deferred" |
| `useAurora` deep-watches the config (`{ deep: true }`) → `inst.update(next)` | `glass-ui .../aurora/composables/useAurora.ts:201` `watch(getCfg, (next) => inst?.update(next), { deep: true })` | confirms the **mutate-`.palette`-in-place** constraint: a deep watch fires on nested mutation, so `auroraConfig.palette = deriveAurora(...)` re-bakes WITHOUT replacing the reactive object (which would clobber the 20 slider scalars) |
| `cssColorOpaque` is a `ComputedRef<string>` (alpha-stripped) | `App.vue:137` provides it via `CSS_COLOR_KEY`; def `useAppColorModel.ts:22` | correct derive input — atmosphere owns its own `alpha` field, so feed the opaque variant |
| `AuroraPane.vue` is the under-rework stub with the FALSE "live" footer | `AuroraPane.vue:16-33` (`:config="{}" :sections="[]"` + the false footer `:29-31`) | the D8 rebuild target; the footer is a NEW correction (Δ2) |
| The cast epidemic is **11 occurrences / 9 files**, NOT "9 sites / 7 files" | `grep "as ValueUnit<Color<ValueUnit<number>>" demo/` → 11 hits across 9 files | **GROUNDING CORRECTION** to the respec §B1 table — it missed `useAppColorModel.ts:53`, `usePaletteManagerWiring.ts`, `useImageSampler.ts` |
| `MAX_STOPS = 8` | `presets.ts:140` | so `stopCount` clamps to `[2,8]`; the spec's `stopCount:3` is valid |
| No `@property --active-color` exists; only an unrelated `--active-tab-color` | grep `demo/@/styles/` → `style.css:192,197` is `--active-tab-color` (Tabs underline), NOT a background-atmosphere color var | the §A4.1.2 `@property` sharpening is a NO-OP today (KISS — do not invent the binding) |

---

## §2 — `deriveAurora` — reconciliation verdict (does the spec match? is it the ≥2 VAL-1 consumer?)

**(a) Does the spec match the shipped function?** **NO — and the shipped function WINS.** The K.W4-respec's `deriveAuroraPalette(baseRgb, {stops,hueSpread,lightTop,lightBottom,chromaScale})` is superseded entirely by the shipped `deriveAurora(seed, {stopCount,harmony,lightnessSpread,chromaFalloff,hueSpread})`. The shipped function is a strict superset (adds `harmony` schemes; takes a string seed so it subsumes the CSS-resolution the demo would otherwise do; bakes gamut-mapping in via `gamutMapStop`). **The refined K.W4 spec ADOPTS the shipped surface verbatim** — no glass-ui authoring work remains for the algorithm. The only glass-ui-side K.W4 deltas:

1. **A focused derive test** if not already present — assert: analogous-fan spread (hue walks ±`hueSpread` centred on anchor), L-ramp monotonic ascending (`color.ts:217-219` `t: 0→1` deep→pale), `chromaFalloff` shrinks C toward apex (`:223`), `stopCount` clamps `[2,MAX_STOPS]` (`:196`), near-gray seed (low C) stays near-gray, and — critically — **0 over-1 channel escapes across the neon × harmony matrix** (the `gamutMapStop` OVER-1 contract documented `color.ts:264-277`). Verify whether `glass-ui .../aurora/__tests__/` already covers `deriveAurora`; author only the missing assertions (KISS — do not duplicate).
2. **The version bump 3.1.1 → 3.2.0 + publish** (the dist-consumption gate). `deriveAurora` is additive → MINOR bump per semver.
3. **The Part-B site-10 `cssToOklch` cast-delete** (rides the same 3.2.0 — `deriveAurora` calls `cssToOklch` internally `:186`, so cleaning `cssToOklch` cleans the derive's string path too).

**(b) Is `deriveAurora` the ≥2 VAL-1 consumer?** **YES — both halves are co-authored by K, exactly as the respec §A5 framed, now CONCRETE:**

- **Consumer 1 (glass-ui-internal):** `flattenPalette` (`color.ts:45-64`) bakes any `OklchStop[]` into the `Float32Array` LUT the shader reads — and `deriveAurora` *produces* `OklchStop[]`. So `flattenPalette(deriveAurora(seed))` is the value.js-LUT-fed-by-a-value.js-derived-palette path. This is **the VAL-1 assertion** (the bake path *is* the OKLab LUT, `src/units/color/conversions/oklab.ts` math, fed by value.js gamut-mapped stops). LIVE at K.W4.
- **Consumer 2 (demo-runtime):** `App.vue` `watch(cssColorOpaque, css => auroraConfig.palette = deriveAurora(css, {stopCount:3}), {immediate:true})` drives Consumer-1 at runtime from the picker. LIVE at K.W4 via §A4.

The 7-tranche-blocking ≥2-consumer gate is **discharged** — K co-authors both. **SHIP→LANDED** iff both are live + the π re-tint gate is green at K.W4 close. **KILL** (per the J kill-date, no re-book) iff either half slips. The library `src/` is unaffected either way.

**Does K.W4 discharge the 7+-tranche aurora-from-color chronic?** **YES.** The chronic (A-1 m.13, "aurora derived from a singular color", 7+ tranches, path-forward §4) requires: a derive producer (✅ shipped `deriveAurora`) + the AuroraPane rebuild (§A3) + the picker→palette wiring (§A4). All three land at K.W4. **The C2 pixel defect is the chronic's observable shadow** — the §A4 `{immediate:true}` watch is the exact corrective: the derive runs at mount, so the static Sky preset is **never** the displayed palette.

---

## §3 — (b) `AuroraPane.vue` — rebuild from the stub (D8), with the FALSE-footer correction

Unchanged in mechanism from the K.W4-respec §A3; the refinement folds the Δ2 footer correction.

- **DELETE** `AuroraPane.vue:16-33` wholesale — the `:config="{}" :sections="[]" :defaults="{}"` stub, the under-rework `<div>`, **and the FALSE `"The background atmosphere itself is live."` footer (`:29-31`)**. No backwards-compat shim (`feedback_no_backwards_compat.md`) — the W0 comment header (`:2-11`) goes too.
- **REPLACE** with the live `ConfigSliderPane` driven by a `SliderSection[]` table over the **20 flat-scalar** `AuroraConfig` fields (per `BlobPane.vue:23-80`). The 20 scalars (read from `presets.ts:68-106` ranges): `softmaxBeta`(3–10), `valueVariance`(0–.3), `warpAmount`(0–.6), `warpScale`(.5–3), `warpDrift`(0–.015), `strokeAmount`(0–1), `strokeScale`(40–320), `strokeAnisotropy`(0–1), `wetEdge`(0–1), `granulation`(0–1), `impasto`(0–1), `brokenColor`(0–1), `canvasGrain`(0–.1), `nucleiDrift`(0–.05), `paletteDrift`(0–.04), `breathDepth`(0–.15), `breathPeriod`(10–90), `saturation`(.6–1.3), `paperGrain`(0–.02), `alpha`(0–1). `ConfigSliderPane.update(key,value)` does flat `config[key]=value` so ONLY flat numerics are rows.
- **`palette` is NOT a slider** — it is derive-driven (§A4). `nuclei`/`flow` + the enum unions (`warpMode`/`medium`/`strokeMode`/`noiseOctaves`/`strokeLayers`) are **out of K.W4 scope** (named-forward — a `ConfigSliderPane` enum/nested extension only if a consumer demands it).
- **Shared-config plumbing:** NEW injection key `AURORA_CONFIG_KEY` in `demo/@/components/custom/panes/keys.ts` (mirroring `BLOB_CONFIG_KEY`), `provide`d in `App.vue` (§A4), `inject`ed in `AuroraPane.vue`. The pane consumes the **same reactive `auroraConfig` instance** the runtime deep-watches (`useAurora.ts:201`), so slider edits and the derive both hit one object. No new store, no facade.
- **The honest footer (optional):** if a footer line is kept, it must be TRUE — e.g. *"The atmosphere tracks your picked color."* (true after §A4) or simply omit it. Do not re-assert "live" while the field controls are the topic.

---

## §4 — (a)+(c) `App.vue` wiring — picker → atmosphere re-tint (the π close gate), CORRECTED for the shipped signature

Replaces `App.vue:209-215` (the static clone + the retired "A.W6 deferred" comment).

**Imports:** extend the existing `App.vue:107` import — `import { useAurora, DEFAULT_AURORA_CONFIG, deriveAurora, type AuroraConfig } from "@mkbabb/glass-ui/aurora"` (the published **3.2.0 dist**, NOT source — mechanism-C). **No `parseCSSColor` import needed for the aurora path** (the K.W4-respec §A4 said to import it for `cssColorToRgb01`; that adapter is GONE — `deriveAurora` self-parses).

**The wiring (corrected):**
```
const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));  // kept
provide(AURORA_CONFIG_KEY, auroraConfig);                                              // NEW (AuroraPane shares it)
watch(cssColorOpaque, (css) => {
    auroraConfig.palette = deriveAurora(css, { stopCount: 3 });                        // CORRECTED: deriveAurora, string seed, stopCount
}, { immediate: true });
useAurora(atmosphereCanvas, () => auroraConfig, { onInitError: … });                   // kept
```

- **`cssColorOpaque` already exists** (`App.vue:137`, the alpha-stripped variant — correct for an atmosphere that owns its own `alpha` field). It is a `ComputedRef<string>`; passing `.value` (or letting the watch source unwrap it) feeds the string straight to `deriveAurora`.
- **Mutate `.palette`, do NOT replace `auroraConfig`** — replacing clobbers the 20 slider-edited scalars AND breaks the deep-watch identity (`useAurora.ts:201` watches `getCfg` returning the same object ref; a nested `.palette` write fires `{deep:true}`, a whole-object swap would need the getter to return the new ref but would lose slider state). **Verified:** `useAurora` does `watch(getCfg, … {deep:true})`, so in-place `.palette` reassignment re-bakes correctly.
- **`{immediate: true}`** so the atmosphere opens tinted to the **default picked color**, NEVER the static Sky preset. This is the C2 corrective — the static `DEFAULT_AURORA_CONFIG.palette` is overwritten before first paint.
- **`stopCount: 3`** matches the default config's 3-stop palette length, so the 2 default nuclei (`presets.ts:154-157`, `paletteBias: 0.0` and `1.0`) still index valid stops. (Nuclei `paletteBias ∈ [0,1]` maps across the stop count; 3 stops is safe. If a future config has >3 nuclei needing more stops, raise `stopCount` — named-forward.)

### §4.1 — (c) The runtime re-tint π gate (the `readPixels` hue-shift)

The K.W4 hard gate (`K.md §6`): changing the picked color **visibly re-tints the atmosphere canvas**. The π `picker` capture pairs a BEFORE (default tint) with an AFTER (a distinctly-hued picked color) and asserts the atmosphere canvas's sampled pixels **shifted hue** — a `readPixels` non-equality between two picked colors on `[data-testid="atmosphere-canvas"]` (`App.vue:10`).

**Refinement from the W-A pixel evidence (the layout-clip interaction):** run the re-tint assertion at the **mobile-375 viewport**, NOT desktop-1280/1440. Rationale: the W-A captures prove the desktop secondary-view layout-clip (Lane-2 D1, P0, K.W3/W5-owned) pushes content off-screen and overpaints the viewport with aurora — so at desktop the atmosphere canvas IS visible but the *interactive picker that drives it* is clipped off-screen, making the picker→re-tint loop undriveable in a desktop π run until the layout fix lands. At 375 the W-A captures show both the panel AND the atmosphere render correctly (`picker-375-light.png`). So the K.W4 π re-tint gate is **viewport-pinned to 375** to keep it orthogonal to the K.W3/W5 layout-clip. (Once the layout-clip is fixed, a desktop π pass can be added — named-forward to K.W6's binding-π.)

**The assertion shape:** (1) load picker at 375; (2) `readPixels` a fixed atmosphere-canvas region → `before`; (3) drive the picker to a distinctly-hued color (e.g. a hue ~180° from default via the Lab/OKLCH sliders or a `applyColorString`); (4) wait a frame (the `{deep:true}` watch + `inst.update` + the next render tick); (5) `readPixels` the same region → `after`; (6) assert `hue(after) ≠ hue(before)` beyond a threshold. This is the K.W4 close-gate.

### §4.2 — (d) The dynamic-bg contrast-guard (the C2 corollary)

When the atmosphere re-tints to the picked color, foreground UI over it (the picker panel text, the dock) must stay AA-legible. **The defense already exists and is correctly coupled — reuse it, author NO second guard (KISS):**

- `App.vue:139` `const { safeAccentCss } = useContrastSafeColor(model, cssColorOpaque)` → provided via `SAFE_ACCENT_KEY` (`:140`). `useContrastSafeColor` (read `useContrastSafeColor.ts:30-72`) keys off the **same `cssColorOpaque`** the derive consumes, computes an OKLCh-lightness-shifted safe accent against the theme background (`BG_LIGHTNESS_DARK=.15`/`_LIGHT=.97`), and returns the original when contrast is already sufficient. **Because the derive and the contrast-guard share the `cssColorOpaque` input, they track in lockstep** — when the picked color shifts, both the atmosphere tint and the safe-accent shift together.
- **The standing gap the guard does NOT cover:** `safeAccentCss` guards the **accent** color (text/icons/borders that use the picked color), but it does NOT guard the **panel glass surface text against the re-tinted atmosphere behind it**. The W-A "dark-mode chrome parity is faithful / no panel-text contrast collapse" finding was measured against the STATIC Sky preset; once the atmosphere can go arbitrarily dark/light (a near-black or near-white picked color → a near-black/white derived ramp), the glass panel's own text could lose contrast against the bleed-through. **K.W4 corollary verify (at close, in pixels):** drive the picker to (i) a near-white high-L color and (ii) a near-black low-L color, capture the picker panel at 375, and confirm the panel body text (the Fraunces heading + numeric readout + slider labels) stays AA-contrast against the re-tinted bleed-through. **Two mitigations IF it fails** (named-forward, apply only on observed failure — KISS): (1) the glass panel already has a backdrop/blur + surface fill (glass-ui surface tokens) that floors the bleed-through — confirm its opacity is sufficient; (2) if not, the `deriveAurora` `DERIVE_L_BAND=[0.35,0.95]` (`color.ts:164`) already CLAMPS the derived ramp away from pure black/white — so even an extreme picked color yields a mid-ramp atmosphere. **This L-band clamp is the structural contrast-floor** — the atmosphere can never go fully black or fully white, bounding the worst-case panel-text contrast. **Verify the L-band clamp + glass surface opacity together hold AA**; do not add a third guard.
- **`@property --active-color` (the respec §A4.1.2 sharpening):** **NO-OP — do not author.** Grep confirms no background-atmosphere CSS var binding exists (`style.css:192,197` is `--active-tab-color`, an unrelated Tabs underline). The atmosphere is driven by the WebGL config object, not a CSS custom property. Registering `@property --active-color` would be inventing a binding that does not exist — a KISS violation. Skip it. (If a future lane binds the picked color to a CSS var consumed by a CSS-rendered atmosphere region, register it then.)

### §4.3 — (e) PRM-RAF / no new ungated loops

The grand-audit flagged a ~40-loop ungated-RAF epidemic. K.W4 introduces **NO new RAF loop** — the derive is a `watch` (off the hot path), and `flattenPalette`'s per-frame in-place bake is already owned + gated by `useAurora`'s render loop (`useAurora.ts`). Confirm at close: the `watch(cssColorOpaque, …)` is the only new reactive seam, and it is event-driven (fires on color change), not a loop.

---

## §5 — (e) The `/atmosphere` view footer FALSE-claim correction (explicit)

`AuroraPane.vue:29-31` currently renders *"The background atmosphere itself is live."* The W-A pixel run proves this is **FALSE** — the atmosphere is the static palette-blind Sky preset (Δ2). This line is **deleted** as part of the §A3 stub rebuild (it lives in the under-rework `<div>` that §A3 removes wholesale). After K.W4, the atmosphere genuinely tracks the picked color (§A4), so any replacement footer may state that truthfully — but the specific *"itself is live"* string, which was false-while-static, must not survive verbatim into the rebuilt pane. **Close-gate:** the git-diff for `AuroraPane.vue` shows `:29-31` deleted (the false footer gone) AND the `SECTIONS` array present (the stub gone, no shim).

---

## §6 — Part-B reconciliation (the cast epidemic — corrected count)

The K.W4-respec Part-B (`parseCSSColor` typing root-fix, rides **K.W3**) is **unchanged in mechanism** but **its surface count is wrong**. The respec §B1 table lists "9 demo sites / 7 files + 1 glass-ui". The actual demo cast surface (grep 2026-06-04) is **11 occurrences across 9 files**:

```
demo/@/composables/color/useContrastSafeColor.ts        (the :80 `as …|null`)
demo/@/composables/color/useAppColorModel.ts            (:53 — MISSED by the respec table)
demo/@/composables/palette/usePaletteManagerWiring.ts   (MISSED by the respec table)
demo/@/components/custom/markdown/composables/useMarkdownColors.ts
demo/@/components/custom/image-palette-extractor/ImageEyedropper/composables/useImageSampler.ts  (MISSED)
demo/@/components/custom/color-picker/index.ts
demo/@/components/custom/color-picker/composables/useColorParsing.ts   (3 occurrences :31,:34,:88)
demo/@/components/custom/color-picker/composables/useColorUrl.ts
demo/@/components/custom/color-picker/composables/useColorModel.ts
```

**Grounding correction:** the respec's "9 sites / 7 files" undercounts by 2 files (`useAppColorModel.ts`, `usePaletteManagerWiring.ts`, `useImageSampler.ts` — actually 3 net-new files) and the per-file occurrence count differs. The Part-B fix (tighten `parseCSSColor`'s return to `ValueUnit<Color<ValueUnit<number>>, "color">` + add `parseColorUnitToRgb01`) is correct and lands at K.W3, but the **edit ledger must enumerate ALL 9 files / 11 occurrences**, not 7. This is a K.W3-owned correction flagged here because it is the substrate the K.W4 derive consumes (Part-B precedes glass-ui 3.2.0 precedes K.W4). **Note:** the aurora path no longer needs `cssColorToRgb01`/`parseColorUnitToRgb01` (Δ1 — `deriveAurora` self-parses), so the §B3 helper's *aurora-demo* justification weakens — its remaining justification is the glass-ui `cssToOklch` site-10 cleanup (§B5) + the 11 demo casts. The helper still earns its place (it collapses parse+normalize+convert for the non-aurora consumers), but the K.W4-respec's framing of it as "exactly the `cssColorToRgb01` adapter the K.W4 wiring needs" is now **stale** — the K.W4 wiring needs no adapter.

---

## §7 — The dist-model dependency chain (re-stated, corrected names)

1. **value.js Part-B** (tighten `parseCSSColor` + `parseColorUnitToRgb01`) lands at **K.W3** → value.js publishes 0.11.0.
2. **glass-ui 3.2.0** authored — but `deriveAurora` is **ALREADY DONE** (Δ1); the 3.2.0 work collapses to: the derive test (§2.1), the `cssToOklch` site-10 cast-delete (§B5, riding Part-B), the version bump → **published**.
3. **keyframes 3.0.0** lands as the green cohort (aurora/VAL-1 do not depend on keyframes math; the K.W4 close is gated on the cohort being green).
4. **value.js demo** bumps `@mkbabb/glass-ui` to `^3.2.0`, consumes `deriveAurora` from the dist, wires §A3/§A4.
5. **close:** run the π `picker` re-tint assertion **at 375** (§4.1); the contrast-guard L-band verify (§4.2); execute VAL-1 SHIP-or-KILL; correct the false footer (§5); record in `K/FINAL.md`.

**No mid-edit source consumption** at any hop. The glass-ui `deriveAurora` is consumed from the **published 3.2.0 dist**, never from source.

---

## §8 — What discharges, what's named-forward

**Discharges at K.W4:**
- The 7+-tranche **aurora-from-color chronic** (derive producer ✅ shipped + AuroraPane rebuild §A3 + picker wiring §A4).
- **VAL-1** (≥2-consumer gate: `flattenPalette∘deriveAurora` internal + the demo runtime wiring) — SHIP→LANDED or KILL per J kill-date.
- The **C2 pixel defect** (the `{immediate:true}` watch derives at mount → static Sky never displayed).
- The **`/atmosphere` FALSE "live" footer** (deleted in the §A3 rebuild).

**Named-forward (NOT K.W4):**
- The **P0 desktop layout-clip** (Lane-2 D1) → K.W3/W5 layout. K.W4 only pins its π gate to 375 to stay orthogonal.
- The **C3 blob footprint mismatch** + the desktop dock-absence (C1) → K.W3 blob-extirpation / K.W2.5+W-D dock fix.
- Nuclei/flow/enum editing in AuroraPane → named-forward (no flat-key path through `ConfigSliderPane`).
- `@property --active-color` → NO-OP (no binding exists; do not invent).
- A desktop π re-tint pass → K.W6 binding-π (after the layout-clip is fixed).

## LEDGER
- [glass-ui] src/components/custom/aurora/composables/color.ts — deriveAurora ALREADY SHIPPED (:182-230, seed:string|OklchStop + DeriveAuroraOptions{stopCount,harmony,lightnessSpread,chromaFalloff,hueSpread}); NO authoring needed — the spec's phantom deriveAuroraPalette is superseded. Verify gamutMapStop (:280) + the DERIVE_L_BAND clamp (:164) stand.
- [glass-ui] src/components/custom/aurora/__tests__/derive.test.ts — author ONLY the missing assertions (check existing coverage first): analogous-fan spread, L-ramp monotonic ascending, chromaFalloff apex-shrink, stopCount clamp [2,MAX_STOPS], near-gray-seed-stays-near-gray, 0 over-1 channel escapes across neon×harmony (the gamutMapStop OVER-1 contract)
- [glass-ui] src/components/custom/aurora/composables/color.ts — rewrite cssToOklch (:119-129): replace parseCSSColor(css) as Parameters<typeof colorUnit2>[0] + colorUnit2(...).value + Number(rgb.r/.g/.b) (:124-126) with the value.js parseColorUnitToRgb01 helper; deriveAurora's string path (:186) inherits the cleanup; equivalence-test canary stays green; rides 3.2.0
- [glass-ui] package.json — version bump 3.1.1 -> 3.2.0 (MINOR: deriveAurora already exported); publish to registry (the dist-consumption gate)
- [value.js] src/parsing/color.ts — TIGHTEN parseCSSColor return bare ValueUnit -> ValueUnit<Color<ValueUnit<number>>,'color'> (annotate memoize callback :613-631); one documented library-internal trust-boundary narrowing; rides K.W3
- [value.js] src/units/color/normalize.ts — NEW public helper parseColorUnitToRgb01(input:string):[number,number,number] (justified now by glass-ui cssToOklch + the 11 demo casts; NOT by the aurora wiring — deriveAurora self-parses); colocate with colorUnit2
- [value.js] src/index.ts — export parseColorUnitToRgb01 from the public barrel
- [value.js] demo casts — delete the cast at ALL 9 FILES / 11 OCCURRENCES (CORRECTED count, was 'm7 files'): useColorParsing.ts (:31,:34,:88 = 3), useColorModel.ts (:29), useColorUrl.ts (:36), useAppColorModel.ts (:53 — MISSED by respec), usePaletteManagerWiring.ts (MISSED), useImageSampler.ts (MISSED), useContrastSafeColor.ts (:80 + dead |null guard), useMarkdownColors.ts (:24 + dead |null guard), color-picker/index.ts (:41); drop now-unused import type Color/ValueUnit where only used for the cast — rides K.W3
- [value.js] demo/@/components/custom/panes/keys.ts — NEW injection key AURORA_CONFIG_KEY (mirrors BLOB_CONFIG_KEY)
- [value.js] demo/@/components/custom/panes/AuroraPane.vue — rebuild from stub (:16-33): live SliderSection[] over the 20 flat-scalar AuroraConfig fields (BlobPane.vue:23-80 model); inject AURORA_CONFIG_KEY; DELETE the under-rework <div> + the W0 comment header + the FALSE footer 'The background atmosphere itself is live.' (:29-31); no shim
- [value.js] demo/color-picker/App.vue — replace :209-215 static clone + retired 'A.W6 deferred' comment with: extend the :107 @mkbabb/glass-ui/aurora import to add deriveAurora; provide(AURORA_CONFIG_KEY, auroraConfig); watch(cssColorOpaque, css => auroraConfig.palette = deriveAurora(css, {stopCount:3}), {immediate:true}). CORRECTED: deriveAurora (not deriveAuroraPalette), CSS STRING seed (not an rgb triple — NO cssColorToRgb01 adapter), stopCount (not stops). Mutate .palette in place (deep-watch identity, useAurora.ts:201)
- [value.js] demo/color-picker/App.vue — fold the grand-audit/W-A sharpenings: C2 (immediate:true makes the derive replace the static Sky at mount); SKIP @property --active-color (NO-OP — no atmosphere CSS-var binding exists, KISS); reuse the existing safeAccentCss contrast-guard (shares cssColorOpaque input — no second guard); the DERIVE_L_BAND[0.35,0.95] clamp is the structural panel-text contrast-floor; confirm NO new ungated RAF loop
- [value.js] demo/package.json — bump @mkbabb/glass-ui to ^3.2.0 (currently 3.1.1 dist) before the App.vue derive wiring
- [value.js] docs/tranches/K/FINAL.md — record VAL-1 SHIP->LANDED (2-consumer evidence: flattenPalette∘deriveAurora internal + the demo runtime wiring) or KILL per the J kill-date; record the C2 close (static Sky never displayed post-mount) + the false-footer deletion
- [value.js] docs ledger note (K.md §7 / L.md §10) — STRIKE the VAL-9 spring-emitter re-bookings (VAL-9 KILLED at J)

## GATES
- npm run typecheck (vue-tsc, library + demo) — strict-zero, 0 errors: tightened parseCSSColor satisfies all 11 cast-deleted occurrences across 9 files; no unused-import errors; deriveAurora(string, {stopCount}) type-checks against the 3.2.0 dist .d.ts
- npm run lint (eslint flat config) — exit 0: removed casts + cleaned imports, no unused-vars/verbatimModuleSyntax violations
- npm test (vitest) — parser unit suite green; parseCSSColor runtime value unchanged (type-level tighten only)
- glass-ui aurora derive.test.ts green: analogous-fan spread, L-ramp monotonic, chromaFalloff apex-shrink, stopCount clamp [2,MAX_STOPS], near-gray-stays-near-gray, 0 over-1 channel escapes (gamutMapStop OVER-1 contract)
- glass-ui __tests__/color-equivalence.test.ts canary green across the cssToOklch site-10 rewrite (output unchanged — only the cast removed)
- pi-lane picker re-tint close gate AT 375 VIEWPORT (orthogonal to the K.W3/W5 desktop layout-clip): playwright readPixels non-equality between two distinctly-hued picked colors on [data-testid=atmosphere-canvas] — changing the picked color visibly re-tints the atmosphere (K.md §6 hard gate)
- C2 verify (pixels): no code path leaves the static DEFAULT_AURORA_CONFIG Sky preset visible after mount — the {immediate:true} watch derives at mount; capture confirms the atmosphere tracks the picked hue (the W-A static-Sky verdict is reversed)
- contrast-guard corollary verify (pixels, 375): drive the picker to a near-white high-L AND a near-black low-L color; confirm the picker panel text stays AA against the re-tinted bleed-through — the DERIVE_L_BAND[0.35,0.95] clamp + glass surface opacity floor it; no second guard authored
- false-footer verify: AuroraPane.vue git-diff shows :29-31 'The background atmosphere itself is live.' DELETED + the SECTIONS array present (stub gone, no shim)
- No new ungated RAF loop (grand-audit PRM-RAF): the derive is an event-driven watch off the hot path; flattenPalette's per-frame bake is useAurora-owned/gated
- as-budget discipline: src/ net cast count IMPROVES — Part-B adds 1 documented library-internal narrowing at parseCSSColor's return, removes 11 demo occurrences + 1 glass-ui; the internal narrowing is a single-step ValueUnit-supertype assertion, NOT as any / as unknown as
- VAL-1 verdict executed (SHIP->LANDED with the 2-consumer evidence row, or KILL per J kill-date — no re-booking) and recorded in K/FINAL.md
- cd api && npx tsc --noEmit — unaffected (no api changes), confirm green