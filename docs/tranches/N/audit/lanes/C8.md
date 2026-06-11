# LANE V4 — C8 blob redeploy re-verification (fresh, full)

**Date:** 2026-06-11 · **Repo:** value.js @ `tranche-f-handoff` HEAD `0cb5dd2` · **Cross-repos:** glass-ui, keyframes.js (read-only)
**Method:** all claims settled by PRIMARY reads (the two source trees + the registry 3.12.0 tarball + npm view). No lane/doc citation.

## 0. PRECONDITION CORRECTION — the prior C8 findings file does not exist

The brief points at `/tmp/n-audit-C8.md` and the broader `/tmp/n-audit-*.md` set. **None exist on this filesystem** (`find /tmp -name '*C8*'` → empty; `/tmp` holds only VS Code sockets, demo/dev logs, `wz-*` roster files). I therefore could not "re-verify C8's load-bearing claims" against the prior prose — I re-derived the whole C8 surface from primary evidence and present it as the authoritative pass. Every load-bearing claim below is independently grounded.

---

## (a) Demo fork vs glass-ui goo-blob — FEATURE TABLE (primary-grounded)

Demo fork: `demo/@/components/custom/goo-blob/` — 9 files, **1270 LoC**.
glass-ui source: `src/components/custom/goo-blob/` — 20 files, **4046 LoC** (constants.ts + uploadBlobUniforms.ts + buildMetaballProgram.ts + 6 shader partials + README/RESEARCH the demo lacks).

| Feature | Demo fork (value.js) | glass-ui (source + registry 3.12.0) | Evidence |
|---|---|---|---|
| **Shader color space** | **HSV** (`rgb2hsv`/`hsv2rgb`, gamma-space) | **OKLCh** (Ottosson matrices, linear in/out, gamut clamp) | demo `metaball.frag.glsl:93,102,146-157` (hsv); gu `metaball.frag.ts:60-69,278-336` (srgbToOklab→OKLCh→gamutClampOklch→oklabToLinearSrgb→linearToSrgb) |
| **Color resolution** | DOM 2D-canvas `getImageData` hack | DOM-free `/color` leaf (`cssToOklch→oklchToGammaRgb`) + SFC token-resolve seam | demo `useMetaballRenderer.ts:44-58` (`document.createElement("canvas")`); gu `GooBlob.vue:18-23,86-110` |
| **Pointer physics** | exponential smoothing, `SMOOTH_FACTOR=0.12`, **no spring/velocity** | critically-damped `SpringProgress` (keyframes.js), `response:0.18`, exposes **velocity**, trail ring-buffer, click-impulse spring | demo `useBlobPointer.ts:3,52-62` (grep spring/velocity → EMPTY); gu `useBlobPointer.ts:18-66`, `constants.ts:127-138` (PULSE_OMEGA/ZETA/REST_EPS) |
| **Mood model** | hand-tuned `MOOD_TARGETS` record, 5 isolated moods, lerp cross-fade | **{valence,arousal} circumplex** — `MOOD_AVA` points + `paramsFor()` derivation surface + **autonomic `update()` arc** + `manualOverride` latch (`source:"auto"|"manual"`) | demo `useBlobMood.ts:4-70` (literal records); gu `constants.ts:39-122` (MOOD_AVA/paramsFor), `useBlobMood.ts:6-19,49-107` |
| **Satellite FSM** | 4-phase orbiting/merging/absorbed/emerging (parity in shape) | same 4 phases + `ORBIT_BLEND_MS`/`MERGE_STAGGER_MS` blend discipline | demo `types.ts:26` + `useBlobSatellites.ts`; gu `types.ts:39` + `constants.ts:140-149`. **PARITY** on the phase set. |
| **Quiescence parking** | **NO** — continuous RAF (always reschedules); has crude `paused`/`tabHidden`/PRM-static-frame only | **YES** — REST_EPS settle → park, setTimeout phase-wake scheduler, IntersectionObserver `rootMargin:200px`, `content-visibility:auto` CV-park | demo `useMetaballRenderer.ts:97,164,252,281,340` (RAF always re-armed); gu `useMetaballRenderer.ts:115-160`, `GooBlob.vue:251-253` |
| **WCAG-2.2.2 pause seam** | partial: imperative `pause()`/`resume()` exist but **no declarative prop** | **declarative `v-model:paused`** + imperative `pause()`/`resume()` bound to ONE substrate suspend | demo `GooBlob.vue` (no `paused` prop; grep → only a PRM `@media`); gu `GooBlob.vue:46-58,167-215` |
| **paletteStops multi-stop** | **NO** — single `uBaseColor` only | **YES** — `paletteStops: string[]` (max 4), `samplePaletteOklch` OKLab-mix + midpoint chroma-bump | demo grep `paletteStops`/`uStopCount`/`MAX_BLOB_STOPS` → EMPTY; gu `types.ts:118-130`, `constants.ts:19`, `metaball.frag.ts:184-203` |
| **Lit glass / iridescence / SSS / core-glow** | **NO** | **YES** — Blinn-Phong glint + Fresnel rim + warm-pearl iridescence + fake-SSS + Beer-Lambert core glow, mood-scaled via `iridScale` | gu `metaball.frag.ts:293-404`, `types.ts:132-160` |
| **Config shape** | **flat 30-field** `BlobConfig` | **8 cohesive atoms** (geometry/satellites/membrane/color/surface/interaction + quality + tempo) | demo `types.ts:57-133`; gu `types.ts:84-202` |

**Registry-3.12.0 parity check (does the published artefact ship the deep blob?):** YES. `npm pack @mkbabb/glass-ui@3.12.0` (registry `latest`) → `package/dist/components/custom/goo-blob/types.d.ts` carries the full 8-atom `BlobConfig` (geometry/satellites/membrane/color/surface/interaction/quality/tempo, lines 91-156), `paletteStops: string[]`, `iridescence`, `stretch`, `clickImpulse`; `dist/composables/color/index.d.ts:123` ships `deriveBlobPalette(seed, options?): OklchStop[]` with `chromaCeiling`. The git-log "stale-lineage 3.11.x/3.12.0" concern was about the PRUNE work (header-ribbon/glass-panel surfaces), **NOT the blob** — the blob features are LIVE in the published 3.12.0 tarball.

> Note: local glass-ui `package.json` reads `3.10.1`, but its `src/` tree is post-AY/AZ (ahead of that stamp). The published-registry tarball (3.12.0) is the truth for "what value.js would consume," and it ships the deep blob. CONFIRMED both ways.

---

## (b) The close-criterion quote — VERIFIED VERBATIM

`glass-ui/docs/consumer-evidence/goo-blob.md:16-19` records the binding close-criterion:

> *"value.js DELETES its local goo-blob fork and consumes `@mkbabb/glass-ui/goo-blob`, injecting its OWN color through the ColorResolver seam"* (`docs/tranches/AX/research/blob-synthesis.md` item 8).

The doc's verdict is `keep-current` **booked DEMO-ONLY** with a named ≥2-consumer trigger; **external consumers = 0** (it greps value.js/speedtest/slides `src/` and finds none — correctly, since value.js's *`src/`* is a pure lib; the fork lives in *`demo/`*, which the doc's grep did not scan). So the named consumer #2 "never arrived," and the speculative `ColorResolver` DI ceremony was **STRIPPED at W-BLOB3** (`goo-blob.md:11-12,40-64`).

**Load-bearing nuance the criterion's second clause now contradicts:** the criterion says "injecting its OWN color through the **ColorResolver seam**." That seam **no longer exists** — `goo-blob.md:55-57,66-72` records the required `colorResolver` prop, the loud throw, and `UseMetaballRendererOptions.colorResolver` were all DELETED; the renderer now resolves color internally through the `/color` leaf. The doc states the optional `colorResolver?` seam is re-introduced ONLY "when the second consumer arrives, not before" (`goo-blob.md:66-72`). **Therefore a value.js repatriation consumes color via the `:color` prop + `config.color.paletteStops`, NOT via a ColorResolver DI.** The C8 design must drop any "inject through the ColorResolver seam" framing — it is stale.

---

## (c) Live-palette coupling vs the REAL glass-ui GooBlob config API

**Exact `paletteStops` shape/type:** `BlobColor.paletteStops: string[]` (CSS color strings, **max 4** — `MAX_BLOB_STOPS=4` in `constants.ts:19`; `Math.min(stops.length, MAX_BLOB_STOPS)` in `uploadBlobUniforms.ts:101`). Lives at `config.color.paletteStops` (the `color` atom). Default `["#b5947f","#d4b27d","#dad6b1"]` (the warm-cream ramp). Stops arrive AS STRINGS and are token-resolved at the SFC (`GooBlob.vue:100,109`), then resolved per-frame through the memoised `resolveColor` (`uploadBlobUniforms.ts:103-112`).

**`deriveBlobPalette` signature (on the `/color` leaf):**
`src/composables/color/index.ts:273` (published `dist/composables/color/index.d.ts:123`):
```ts
function deriveBlobPalette(seed: string | OklchStop, options?: DeriveBlobPaletteOptions): OklchStop[]
// options: { stopCount?, harmony?, lightnessSpread?, hueSpread?, chromaBump?, chromaCeiling? }
```
Returns `OklchStop[]` — NOT strings. To feed `paletteStops` you map through `oklchStopToHex` (also `/color`; `index.d.ts:65`). The header comment in glass-ui `types.ts:284-289` shows the exact recipe (`deriveBlobPalette({L,C,h},{...}).map(oklchStopToHex)`). Body takes the deepest/most-saturated stop, satellites the lighter in-family stops (a SPATIAL distribution, see next).

**Per-satellite palette identity — NOT feasible as a uniform feed without shader changes. PRIMARY PROOF:**
- Satellites are **geometry-only** uniforms: `uSatPos[MAX_SATS]`, `uSatRadius[MAX_SATS]`, `uSatOpacity[MAX_SATS]` — **there is NO `uSatColor`** in either fork (grep across gu goo-blob → no per-satellite color uniform; `metaball-uniforms.glsl.ts:83-86`).
- Both forks smin-MERGE every satellite into ONE composite SDF field (`metaball.frag.ts:152-157` gu; `metaball.frag.glsl:131-133` demo), then color the WHOLE field ONCE.
- The "distribution across body/satellites" is a **spatial FBM color field**, not a per-satellite index: `main()` calls `samplePaletteOklch(colorNoise)` where `colorNoise = fbm(uv*uColorNoiseFreq + uTime*uColorNoiseSpeed)` (`metaball.frag.ts:278-279`). The palette `t` is a position-driven noise sample — a satellite at a given `uv` happens to read a lighter stop because the FBM there is high, NOT because it carries a palette index.

**Conclusion (c):** giving each satellite a discrete palette identity (e.g. satellite #2 = "var(--accent-2)") requires a `uSatColor[MAX_SATS]` uniform AND threading a color-weight through the smin merge (the merge currently blends DISTANCE only; you'd need to carry a per-source color and blend it by the smin `h` factor). That is a real shader change, NOT a config feed. The C8 "per-satellite palette identity via uniform" idea is **infeasible as scoped** — it must be downgraded to either (i) the EXISTING spatial multi-stop distribution (feed `config.color.paletteStops` from a live picker palette — fully supported, no shader change), or (ii) a flagged future shader extension.

---

## (d) Demo consumer sites to re-point — VERIFIED + corrections

1. **`App.vue:218-219`** — `const blobConfig = reactive({ ...BLOB_CONFIG_DEFAULTS }); provide(BLOB_CONFIG_KEY, blobConfig);`. Import at `App.vue:109` from `@components/custom/goo-blob`. **Migration:** swap import to `@mkbabb/glass-ui/goo-blob`; the FLAT spread `{ ...BLOB_CONFIG_DEFAULTS }` breaks against the nested 8-atom default — must become `reactive(structuredClone(BLOB_CONFIG_DEFAULTS))` (the aurora precedent at `App.vue:212` already does exactly this: `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))`).

2. **`BlobPane.vue`** — tuning UI. **C8's "30-field shape vs 8-atom config" framing is roughly right but the count is wrong:** BlobPane declares **7 sections / 23 flat numeric slider defs** addressing flat keys (`bodyRadius`, `smoothK`, `pointerAttraction`, …). It is built on `ConfigSliderPane` with a `NumericKey` flat-keyof type (`BlobPane.vue:14-16`). **Three of its keys — `orbitSpeedScale`, `wobbleScale`, `mergeRate` (lines 73-75) — were DELETED from the glass-ui config** (they now live only on derived `MoodParams`, gu `types.ts:76-80`). So the re-point is NOT a mechanical path-swap: BlobPane must be re-authored to address the nested atom paths (`geometry.bodyRadius`, `membrane.smoothK`, `interaction.pointerStrength`, …) and DROP the 3 dead keys. The flat `Record<string,unknown>` cast at `BlobPane.vue:85-87` papers over the shape today and would need a nested-path slider model.

3. **`HeroBlob.vue`** — mood timers. Calls `gooBlobRef.value?.setMood("happy"|"sleepy"|"excited"|"idle")`, `.nudge()`, and exposes `nudgeSatellites` (lines 45,52,59-60,78,91). **SURVIVES the migration:** glass-ui `GooBlob.vue:208-215` `defineExpose({ nudge, setMood, pulse, currentMood, pause, resume })` — `setMood(m: BlobMood)` and `nudge()` are public with identical signatures (gu `setMood` internally tags `{source:"manual"}` but the public arity is unchanged). HeroBlob's `:color="cssColorOpaque"` prop also maps 1:1 (gu `color: string`).

4. **`SpectrumCanvas` watercolor usage — C8 PREMISE IS WRONG (not a blob site).** `SpectrumCanvas.vue:37` imports `WatercolorDot` and `:274` applies an SVG `filter: url(#watercolor-filter)`. That is the **SVG/CSS watercolor** (`watercolor-dot/`, an organic-blob *button* consumed by `mix/`), a SEPARATE component with its own `useWatercolorBlob` — **NOT the WebGL goo-blob.** Re-pointing GooBlob does NOT touch SpectrumCanvas or WatercolorDot. The blob-redeploy scope is exactly: App.vue provide + BlobPane + HeroBlob + the `goo-blob/` dir deletion. SpectrumCanvas/watercolor-dot extirpation is a DISTINCT mandate (the CLAUDE.md "BlobDot ship pending" line), out of C8 scope.

**Bonus (d):** the demo ALREADY consumes glass-ui at **63 import sites** incl. `@mkbabb/glass-ui/aurora` (`useAurora`), Tabs/Card/Button/Input/Slider/etc. glass-ui is a `file:../glass-ui` devDep AND keyframes.js is `file:../keyframes.js` (registry keyframes.js = 4.1.0, ships `SpringProgress`). So adding `@mkbabb/glass-ui/goo-blob` is a natural extension of an established pattern, and the SpringProgress transitive dep is satisfied by glass-ui's own tree.

---

## (e) Refined expressivity design (where evidence diverges from a naive C8)

1. **Drop the "ColorResolver seam injection" framing** (b) — the seam was stripped; consume via `:color` + `config.color.paletteStops`.
2. **Live-palette coupling = feed `config.color.paletteStops`, spatially distributed** (c) — wire a watcher: picker palette → `deriveBlobPalette(seed,{...}).map(oklchStopToHex)` → `blobConfig.color.paletteStops`. The glass-ui `GooBlob.vue:158-165` deep-watch already re-resolves a live `paletteStops` mutation into the renderer Ref (the "dead hero color-feed fix"), so the reactive-config wire works WITHOUT a component change. This is the correct, supported expressivity lever.
3. **Per-satellite identity → downgrade to spatial-distribution OR flag as a shader extension** (c) — infeasible as a config/uniform feed.
4. **BlobPane is a re-author, not a re-point** (d2) — nested atom paths + drop 3 dead keys; the flat `NumericKey`/`Record<string,unknown>` model does not carry over.
5. **Scope SpectrumCanvas/watercolor OUT** (d4) — it is the SVG WatercolorDot, a separate extirpation mandate.
6. **Gains the redeploy delivers (the real expressivity win):** OKLCh perceptual color, multi-stop palette, lit-glass/iridescence/SSS, valence/arousal autonomic mood, spring pointer + pseudopod trail + click-impulse, quiescence parking + declarative WCAG `v-model:paused` — all already shipped in registry 3.12.0; the demo fork has none of them. The redeploy is a strict capability upgrade plus a ~1270-LoC fork deletion.

## Verdict
C8's CORE thesis stands: the demo fork is a stale, HSV, DOM-coupled, spring-less subset; glass-ui 3.12.0 ships the OKLCh deep blob; the close-criterion names the fork deletion verbatim. THREE C8 sub-claims need correction: (1) the ColorResolver-seam injection is dead (stripped); (2) per-satellite palette identity is shader-infeasible as a uniform feed; (3) the "SpectrumCanvas watercolor" is the unrelated SVG WatercolorDot, not the blob. BlobPane is a re-author (23 flat defs, 3 keys deleted upstream), not a mechanical re-point.
