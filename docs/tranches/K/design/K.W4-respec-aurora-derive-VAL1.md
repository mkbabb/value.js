> **Mode: planning-only. NO code.** Post-K.W2 re-spec (2026-06-03 audit, Wave 2).
> The BINDING cross-lane corrections (Wave 3) live in
> `../audit/path-forward-2026-06-03-postW2.md §2–§3` — notably: the parseCSSColor
> typing root-fix is **value.js-owned, lands at K.W3** (value.js 0.11.0, before
> glass-ui 3.2.0); the demo `Palette` id-honesty **simplifies** to `id?:` + guards;
> all consumption is **from glass-ui 3.2.0 published dist** (mechanism-C). Cohort
> peer specs: `../coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md`.


# K.W4 + K.W3-typing-sublane (on the clean K.W2.5 post-deletion substrate)

# K.W4 (aurora-derive + VAL-1) re-specced for DIST-consumption + the `parseCSSColor` typing-gap ROOT FIX

**Wave**: K.W4 (aurora-derive + VAL-1 ship-or-kill) re-specced onto the **clean K.W2.5 post-deletion substrate**, PLUS a `parseCSSColor` typing micro-lane that rides **K.W3** (it unblocks the glass-ui aurora `cssToOklch` consumption and must land before the derive is authored). **Status**: authored 2026-06-03 on the Wave-1 grand-audit verdict. **Supersedes** the dual-instance assumptions baked into the original `K.W1-aurora-derive.md` (which assumed mid-edit *source* consumption of glass-ui via the `development` export condition — now a precept violation deleted at K.W2.5).

This spec governs two deliverables:

- **(a)** the re-specced **K.W4 aurora-derive + VAL-1** lane, rebuilt for the post-K.W2.5 **published-dist consumption model** (glass-ui-author → glass-ui-publish-3.2.0 → value.js-consume-from-dist; NO mid-edit source consumption — the dual-instance hazard would reappear).
- **(b)** the **`parseCSSColor` typing-gap ROOT FIX** — a value.js-side library change that kills the 9-site cast epidemic in the demo AND the glass-ui aurora `cssToOklch` cast in one root move.

The two are sequenced: **(b) lands at K.W3** (it is a prerequisite for the glass-ui aurora `cssToOklch` to consume value.js cleanly, and glass-ui 3.2.0 must be cut against the tightened return type); **(a) lands at K.W4** gated on glass-ui 3.2.0 + keyframes 3.0.0.

---

## §0 — The substrate this re-spec stands on (Wave-1 verdict, folded)

The Wave-1 audit verdict establishes the foundation. The corrections it mandates that this spec **folds in**:

1. **Consumption model = published dist.** After K.W2.5 (MECHANISM-C by deletion), the demo consumes glass-ui from its **published `dist/`** — a single externalized vue/reka instance, the dual-instance class GONE. The `development` export condition (glass-ui commit `6d3e151`, value.js `c4c5842`) is DELETED both repos; the `@mkbabb/value.js → src` self-alias (`vite.config.ts:37`), the `resolve.dedupe` band-aid (`vite.config.ts:49-56`), `check-types.mjs`, and the `fs.allow` widening are all retired. **Consequence for this spec**: the K.W4 aurora derive MUST be authored glass-ui-side, **published as glass-ui 3.2.0**, and consumed by value.js **from that published dist** — exactly the original `K.W1-aurora-derive.md §6` lockstep ("glass-ui-side commit lands first, then value.js consumes"), now hardened to "glass-ui-side commit lands first, is **published**, then value.js consumes the **dist**."

2. **VAL-9 was already KILLED at J.** The spring emitter exists and glass-ui consumes it. This spec does **not** invent a "VAL-9 spring emitter" for keyframes 3.0.0. (Folded as a strike instruction for `K.md §7` / `L.md §10`, recorded here but not part of the aurora/typing edit ledger.)

3. **The reka-ui issue is a SINGLE STALE install**, not two instances. K.W2.5 refreshes the one stale reka-ui 2.8.2 → `^2.9` + a lockfile guard. (Out of this spec's edit scope — K.W2.5 owns it — but noted because the demo's `package.json:96` currently pins `reka-ui: "^2.0.0"`, which K.W2.5 bumps.)

4. **The `parseCSSColor` return type is too loose** (bare `ValueUnit`) causing the 9-site cast epidemic in the value.js demo + the glass-ui aurora `cssToOklch` cast. **Fix at root in value.js** — this is deliverable (b) of this very spec.

5. **J.W3 `PaletteDiff.vue` is a fired-trigger orphan** to re-home in K.W3. (Noted as a K.W3 sibling concern; not in this aurora/typing spec's ledger, but flagged so the K.W3 wave owner sequences it alongside the typing sub-lane.)

---

# PART A — K.W4 aurora-derive + VAL-1, re-specced for dist-consumption

## §A1 — Ground truth (re-verified at this authoring, file:line)

The original `K.W1-aurora-derive.md §1` ground-truth table is largely intact; the deltas the post-K.W2.5 reality forces are recorded here, read from source.

| Claim | Evidence (read 2026-06-03) | Delta vs `K.W1-aurora-derive.md` |
|---|---|---|
| glass-ui aurora `color.ts` is now **post-dedup** — imports `srgbToOKLab, oklabToLinearSRGB, oklabToRgb255, rawOklabToOklch, rawOklchToOklab, parseCSSColor, colorUnit2` from `@mkbabb/value.js` | `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts:11-19` | The K.W2 dedup **already landed** (the file header documents inv-K-2 deletion). `deriveAuroraPalette` is still ABSENT — confirmed by the barrel having no such export. |
| `deriveAuroraPalette` does NOT exist — needs authoring | aurora barrel `index.ts` re-export block lists `cssToOklch, flattenPalette, hexToOklchStop, oklchStopToHex, oklchToLinear, paletteToCssGradient` — no derive | unchanged from original |
| glass-ui `cssToOklch` carries a **cast** through `parseCSSColor` | `color.ts:122` `parseCSSColor(css) as Parameters<typeof colorUnit2>[0]` + `Number(rgb.r/.g/.b)` unwrap at `:124` | NEW grounding — this is the 10th cast site the Part-B root fix kills |
| `OklchStop = {L,C,h}` (L:0..1, C:0..0.4, h:0..360) | `presets.ts:16-20` | unchanged |
| `AuroraConfig` 30-field shape; `palette: OklchStop[]` (2..MAX_STOPS) | aurora barrel exports `MAX_STOPS, AuroraConfig, OklchStop, DEFAULT_AURORA_CONFIG` | unchanged |
| `AuroraPane.vue` is the "under rework" stub (empty sections, informational message) | `demo/@/components/custom/panes/AuroraPane.vue:16-33` — `:config="{}" :sections="[]" :defaults="{}"` + under-rework `<div>` | unchanged |
| `App.vue` static-clones the default config, NO picker tracking | `demo/color-picker/App.vue:212` `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))`; `:213` `useAurora(atmosphereCanvas, () => auroraConfig, …)` | unchanged — the `:210-211` comment still cites the retired "A.W6 deferred" framing; K.W4 deletes it |
| glass-ui version is **3.1.1** (NOT yet 3.2.0) | `/Users/mkbabb/Programming/glass-ui/package.json` `"version": "3.1.1"` | NEW — the derive ships in 3.2.0; value.js consumes 3.1.1's dist today, must bump to `^3.2.0` |
| value.js `parseCSSColor` returns **bare `ValueUnit`** | `src/parsing/color.ts:613-631` (`memoize((input: string): ValueUnit => …)`) | the Part-B root-fix target |
| every parser-produced color unit is **actually** `ValueUnit<Color<ValueUnit<number>>, "color">` | `src/parsing/color.ts:37-45` `createColorValueUnit` always builds this exact shape; ALL parser branches route through it | the cast epidemic is recovering a type the parser already guarantees but the signature throws away |
| `ch`/`channelOf`/`setChannel`/`ColorChannel` are **internal-only** (NOT in `src/index.ts`) | `grep "ch\|channelOf\|setChannel\|ColorChannel" src/index.ts` → zero hits; defined `src/units/color/index.ts:30,44,68,82` with "Internal-only: NOT re-exported" comment | constrains the Part-B design — a number-channel accessor must be authored as a NEW public export, not by exposing `channelOf` |

**Sequencing contradiction resolved (re-stated for the dist model).** `K.md §5` and `coordination/glass-ui.md:37` place `deriveAuroraPalette` in `aurora/composables/color.ts`. That file is now **post-dedup** (the K.W2 gut already happened). So K.W4 authors the derive into the already-value.js-backed module — no relocation, additive. The new load-bearing constraint the dist model adds: the derive must be **in glass-ui 3.2.0's published dist** before value.js can `import { deriveAuroraPalette } from "@mkbabb/glass-ui/aurora"` against the dist. The original spec's `@src/index` import for `parseCSSColor` in the demo (its `§4` code block) stays correct — that is value.js consuming **its own** source, not glass-ui's.

## §A2 — `deriveAuroraPalette` — the algorithm (glass-ui-side, value.js core, published in 3.2.0)

The algorithm is unchanged from `K.W1-aurora-derive.md §2` — it is sound and stands. This re-spec restates only the **boundary and packaging** deltas the dist model forces. The full algorithm (analogous fan in OKLCh, lightness ramp `lightTop`→`lightBottom`, chroma shaping `C0 * chromaScale`, near-gray-stays-gray) is governed by `K.W1-aurora-derive.md §2.2` and is NOT re-derived here.

### §A2.1 — Signature, home, and the value.js dependency

- **Home**: `glass-ui/src/components/custom/aurora/composables/color.ts` (the post-dedup module, §A1).
- **Signature**: `deriveAuroraPalette(baseRgb: [number, number, number], opts?: DeriveOptions): OklchStop[]` with `DeriveOptions = { stops?, hueSpread?, lightTop?, lightBottom?, chromaScale? }` per `K.W1-aurora-derive.md §2.1`. The function takes `[r,g,b]` in [0,1] at the glass-ui boundary (NOT a CSS string) — the minimal-coupling discipline (inv-K-3 spirit): the glass-ui derive consumes only value.js's `srgbToOKLab` (`color.ts:11` already imports it), and the **demo** does CSS→RGB resolution at the call site.
- **value.js core consumed**: `srgbToOKLab` (already imported at `color.ts:11`), plus the kept local trig helpers `rawOklabToOklch`/`rawOklchToOklab` (re-sourced from value.js at `color.ts:11` post-dedup). NO new OKLab/sRGB matrix math (inv-K-2).
- **CRITICAL dist-model constraint (NEW)**: because the derive consumes `srgbToOKLab` from `@mkbabb/value.js`, and the Part-B root fix (§B) tightens value.js's published types, glass-ui 3.2.0 MUST be built against the **value.js version that carries the Part-B fix**. The Part-B fix is purely additive to `srgbToOKLab` (it does not touch `srgbToOKLab`'s signature — it only tightens `parseCSSColor` and adds a helper), so glass-ui 3.2.0's `srgbToOKLab` consumption is unaffected; but glass-ui's `cssToOklch` (which DOES consume `parseCSSColor`) is the surface the Part-B fix cleans (§B5). So the **ordering is**: Part-B value.js release → glass-ui 3.2.0 (derive + cleaned `cssToOklch`) → value.js demo consumes 3.2.0 dist.

### §A2.2 — Export + packaging into 3.2.0

- Add `deriveAuroraPalette` + `type DeriveOptions` to the aurora barrel re-export block (`glass-ui/src/components/custom/aurora/index.ts`, the `from "./composables/color"` block that currently lists `cssToOklch, flattenPalette, hexToOklchStop, oklchStopToHex, oklchToLinear, paletteToCssGradient`). Extend that list.
- A focused glass-ui unit test (`aurora/__tests__/derive.test.ts` or colocated with the K.W2 `color-equivalence.test.ts`): analogous-fan spread, lightness-ramp monotonicity, near-gray-base-stays-near-gray, `stops` clamp to `[2, MAX_STOPS]`.
- **glass-ui version bump 3.1.1 → 3.2.0** + publish to the registry. The derive is additive (new exported function), so it is a MINOR bump per semver. This is the dist-model gate: value.js cannot consume the derive until 3.2.0 is published.

## §A3 — `AuroraPane.vue` — rebuild from the stub (D8 — the live 30-field SliderSection table)

Unchanged in mechanism from `K.W1-aurora-derive.md §3`; restated with the dist-model and grand-audit deltas.

- **Replace** `AuroraPane.vue:16-33` (the `:config="{}" :sections="[]" :defaults="{}"` + under-rework `<div>`) with the live `SliderSection[]` table over the **20 flat-scalar** `AuroraConfig` fields, per the `BlobPane.vue:23-80` model. The 20 scalars (read from `presets.ts:68-106` ranges): `softmaxBeta, valueVariance, saturation, warpAmount, warpScale, warpDrift, strokeAmount, strokeScale, strokeAnisotropy, wetEdge, granulation, impasto, brokenColor, canvasGrain, nucleiDrift, paletteDrift, breathDepth, breathPeriod, paperGrain, alpha`. The `SECTIONS` descriptor (Composition/Warp/Stroke/Motion/Output groupings) is governed verbatim by `K.W1-aurora-derive.md §3`.
- **Constraint (verified):** `ConfigSliderPane.update(key,value)` does flat `config[key]=value` (`ConfigSliderPane.vue:57-59`) — so ONLY flat numeric fields are slider rows. `palette` is derive-driven (§A4), NOT a slider. `nuclei`/`flow`/the enum unions (`warpMode`/`medium`/`strokeMode`/`noiseOctaves`/`strokeLayers`) are out of K.W4 scope (named-forward — a `ConfigSliderPane` enum/nested extension only if a consumer demands it).
- **Shared-config plumbing**: a NEW injection key `AURORA_CONFIG_KEY` in the panes' `keys.ts` (mirroring `BLOB_CONFIG_KEY`), `provide`d in `App.vue` (§A4), `inject`ed in `AuroraPane.vue` (the `BlobPane.vue:12` pattern). The pane consumes the **same** reactive `auroraConfig` instance the runtime deep-watches, so slider edits and the derive both hit one object. No new store, no facade.
- **No backwards-compat shim** (`feedback_no_backwards_compat.md`): the under-rework `<div>` and the W0 comment header are DELETED, not gated.

## §A4 — `App.vue` wiring — picker → atmosphere re-tint (D9 — the π close gate)

Replaces `App.vue:209-215` (the static clone + the retired "A.W6 deferred" comment).

- **Imports**: `import { parseCSSColor } from "@src/index"` (value.js — the demo's own source; the K.W2.5 self-alias is GONE, but the demo legitimately imports value.js via the `@src/*` path alias, which is value.js consuming its own `src/` — NOT the prohibited `@mkbabb/value.js → src` self-alias the band-aid created). `import { deriveAuroraPalette } from "@mkbabb/glass-ui/aurora"` (the published 3.2.0 dist). NOTE: `App.vue:107` already imports `useAurora, DEFAULT_AURORA_CONFIG, AuroraConfig` from `@mkbabb/glass-ui/aurora` — extend that import with `deriveAuroraPalette`.
- **The wiring** (governed by `K.W1-aurora-derive.md §4`):
  - `const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` (kept).
  - `provide(AURORA_CONFIG_KEY, auroraConfig)` (NEW — AuroraPane consumes the same instance).
  - `watch(cssColorOpaque, (css) => { auroraConfig.palette = deriveAuroraPalette(cssColorToRgb01(css), { stops: 3 }) }, { immediate: true })`. `cssColorOpaque` already exists (`App.vue:137`, the alpha-stripped opaque variant — correct for an atmosphere that owns its own `alpha` field). **Mutate `.palette`, do NOT replace `auroraConfig`** — replacing clobbers the 20 slider-edited scalar fields and breaks the deep-watch identity (`useAurora.ts:201`). `immediate: true` so the atmosphere opens tinted to the default color.
  - `cssColorToRgb01(css)`: the thin demo-side adapter — `parseCSSColor(css)` (now returning the **tightened type** from Part-B, so NO cast) → convert to sRGB [0,1] → `[r,g,b]`. **This adapter is the Part-B beneficiary**: today it would need the 9-site cast idiom; after Part-B it is cast-free. If a shared `cssColorToRgb01` is already extracted by the K.W3 primitive-lift resolver work, K.W4 reuses it; else K.W4 lifts it (a reuse, not a new abstraction). The cleanest form: it IS value.js's new `parseColorUnitToRgb01` helper (§B3) called directly.
- **The close gate (π-lane, runtime-observed)**: changing the picked color **visibly re-tints the atmosphere**. The π `picker` capture pairs a BEFORE (default tint) with an AFTER (a distinctly-hued picked color) and asserts the atmosphere canvas's sampled pixels shifted hue — a `readPixels` non-equality between two picked colors. This is the K.W4 `K.md §6` hard gate.

### §A4.1 — Grand-audit sharpenings (folded into the wiring)

The constellation grand-audit (`MEMORY.md` constellation entry) named several sharpenings the original `K.W1-aurora-derive.md` predates. Fold these into the K.W4 close:

1. **C2 fix = derive REPLACES the static Sky preset.** The audit's C2 finding is that the atmosphere currently shows a static `DEFAULT_AURORA_CONFIG.palette` (the "Sky" preset). The §A4 `watch(..., { immediate: true })` is exactly the C2 corrective: the derive runs at mount, so the static Sky preset is never the displayed palette — the derived palette is. **Verify at close** that no code path leaves the static preset visible after mount.
2. **`@property --active-color` typed custom property.** Where the demo drives a CSS custom property from the picked color for the atmosphere/accent (if such a var exists in the App shell), register it via `@property --active-color { syntax: "<color>"; inherits: true; initial-value: transparent }` so it animates/interpolates correctly rather than as a string swap. This is a grand-audit modern-web sharpening — apply IF the demo binds the picked color to a CSS var consumed by the atmosphere region; if no such binding exists, this is a no-op (do not invent one — KISS).
3. **Dynamic-bg contrast-guard.** When the atmosphere re-tints, foreground UI over it (the picker, dock) must stay legible. The demo already has `useContrastSafeColor` (`App.vue:139`, `safeAccentCss`). **Verify** the re-tint does not push foreground contrast below the guard; if the derived atmosphere can go very light/dark, the `safeAccentCss` path (which keys off `cssColorOpaque`, the same input as the derive) already tracks it — confirm the coupling holds and no new guard is needed (KISS — reuse the existing contrast-safe path, do not author a second).
4. **PRM-RAF / no new ungated loops.** The grand-audit flagged a ~40-loop ungated-RAF epidemic. The derive is a `watch` (off the hot path), and `flattenPalette` owns the per-frame in-place bake (`color.ts:43`, already gated by `useAurora`'s render loop). K.W4 introduces NO new RAF loop — confirm at close.

## §A5 — VAL-1 — the OKLab-LUT binary gate (ship-or-kill at K.W4 close)

Unchanged in substance from `K.W1-aurora-derive.md §5`; restated with the dist-model and the J kill-date.

- **VAL-1 IS** the assertion that the `flattenPalette` bake path (`color.ts:43-62`, which `oklchToLinear`-bakes the `OklchStop` palette into a `Float32Array` the shader reads as `uPalette`) is the value.js LUT, fed by a **value.js-derived** palette. No new `src/` code — the OKLab conversion math (`src/units/color/conversions/oklab.ts`) already exists; VAL-1 was always "the consumer arrives."
- **The two consumers (the binary gate)**: (1) glass-ui aurora `flattenPalette` baking a `deriveAuroraPalette` palette — LIVE at K.W4 via §A2; (2) the demo `App.vue` picker→`auroraConfig.palette` wiring driving (1) at runtime — LIVE at K.W4 via §A4. K co-authors both halves, so the ≥2-consumer gate that blocked VAL-1 for 7 tranches is no longer external.
- **SHIP-IFF / KILL (executed at K.W4 close)**: **SHIP→LANDED** IFF `deriveAuroraPalette` is live in glass-ui 3.2.0 AND the demo re-tint is runtime-observed (the §A4 π gate green). Recorded BOOKED→LANDED in `K/FINAL.md` with the two-consumer evidence row. **KILL** IF either half slips past K.W4 close — recorded BOOKED→KILLED per the J kill-date (no re-booking — the J verdict forbids a perpetual punt). The library is unaffected either way.

## §A6 — K.W4 gating (dist-model dependency chain)

The dist-consumption model makes the K.W4 dependency chain strict and serial:

1. **Part-B (value.js typing fix) lands at K.W3** → value.js publishes (the tightened `parseCSSColor` + the number-channel helper). [The publish ceremony is `docs/RELEASE.md`.]
2. **keyframes 3.0.0** lands (the grand-audit semver-violation→3.0.0 fix; an external gate this spec names but does not own — VAL-1/aurora do not depend on keyframes math, but the K.W4 close is gated on the cohort being green, and keyframes 3.0.0 is in that cohort).
3. **glass-ui 3.2.0** authored (`deriveAuroraPalette` + the cleaned `cssToOklch` riding the Part-B value.js) → **published**.
4. **value.js demo** bumps `@mkbabb/glass-ui` to `^3.2.0`, consumes `deriveAuroraPalette` from the dist, wires §A3/§A4.
5. **close**: run the π `picker` re-tint assertion; execute VAL-1 SHIP-or-KILL; record in `K/FINAL.md`.

**No mid-edit source consumption** at any step — each glass-ui change is published before value.js consumes it. This is the dual-instance-hazard prevention the Wave-1 verdict mandates.

---

# PART B — the `parseCSSColor` typing-gap ROOT FIX (value.js library; rides K.W3)

## §B1 — The defect (root cause, file:line)

`parseCSSColor` is declared to return bare `ValueUnit` (`src/parsing/color.ts:613-631`): `export const parseCSSColor = memoize((input: string): ValueUnit => { … })`.

But **every** parser branch routes its result through `createColorValueUnit` (`src/parsing/color.ts:37-45`), which always constructs exactly `new ValueUnit(value: Color<any>, "color", ["color", value.colorSpace], undefined, "color")` — i.e. a `ValueUnit<Color<ValueUnit<number>>, "color">`. (The named-color fallback `nameParser` routes through `parseCSSValueUnit` of a known color string, which itself resolves to a color unit.) So the **runtime guarantee is the narrow type; the signature throws it away** by widening to bare `ValueUnit`.

**The consequence** is a 10-site cast epidemic — every consumer that needs the channels re-asserts the type the parser already guarantees:

| # | Site | Cast (verbatim) |
|---|---|---|
| 1 | `demo/@/components/custom/color-picker/composables/useColorParsing.ts:31` | `parseCSSColor(value) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 2 | `useColorParsing.ts:34` | `parseCSSColor(DEFAULT_COLOR) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 3 | `useColorParsing.ts:88` | `parseCSSColor(newVal) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 4 | `useColorModel.ts:29` | `parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">` (in `NORMALIZED_COLOR_NAMES`) |
| 5 | `useColorUrl.ts:36` | `parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 6 | `useAppColorModel.ts:53` | `parseCSSColor(css) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 7 | `useContrastSafeColor.ts:80` | `parseCSSColor(css) as ValueUnit<Color<ValueUnit<number>>, "color"> \| null` |
| 8 | `useMarkdownColors.ts:24` | `parseCSSColor(colorStr) as ValueUnit<Color<ValueUnit<number>>, "color"> \| null` |
| 9 | `color-picker/index.ts:41` | `parseCSSColor(DEFAULT_INPUT_COLOR) as ValueUnit<Color<ValueUnit<number>>, "color">` |
| 10 | `glass-ui aurora/composables/color.ts:122` | `parseCSSColor(css) as Parameters<typeof colorUnit2>[0]` (+ `Number(rgb.r/.g/.b)` unwrap at `:124`) |

Sites 7 and 8 additionally append `| null` — but `parseCSSColor` never returns null (it throws on unparseable input via `utils.tryParse(Value, input)` at `color.ts:628`). The `| null` is defensive cruft the consumers added because the bare-`ValueUnit` signature gave them no contract; the root fix lets them drop it (the `try/catch` already at those sites handles the throw).

## §B2 — The root fix (value.js — `src/parsing/color.ts`)

**Tighten the public return type of `parseCSSColor` to the type the parser already guarantees:** `ValueUnit<Color<ValueUnit<number>>, "color">`.

Concretely, the change is to the `memoize` callback's declared return type at `src/parsing/color.ts:613-631`. Two viable shapes, **recommend (i)**:

- **(i) RECOMMENDED — annotate the memoize callback return type directly.** Change `(input: string): ValueUnit => {` to `(input: string): ValueUnit<Color<ValueUnit<number>>, "color"> => {`. The body returns `result.value` / `utils.tryParse(Value, …)`, all of which are typed `ValueUnit` (the `Value` parser is `Parser<ValueUnit>`). Since the runtime guarantee is the narrow type, `parseCSSColor` performs a **single, documented, library-internal** narrowing at its return boundary (one cast inside the library, replacing 10 at consumers). This is the canonical "narrow once at the trust boundary" pattern the codebase already uses (cf. `resolveToPlainColor` at `color.ts:48-64`, which documents exactly this narrowing for `normalizeColorUnit`'s param). Add a doc comment explaining the guarantee (every branch routes through `createColorValueUnit`, §B1) and that the lone internal narrowing is the trust-boundary localization.
- **(ii) Alternative — widen `createColorValueUnit`'s return type + thread it through `Value`.** Type `createColorValueUnit` to return the narrow type and re-type `Value` as `Parser<ValueUnit<Color<ValueUnit<number>>, "color">>`. More invasive (the `Value` parser composes ~14 branch parsers each typed `Parser<ValueUnit>`). **Not recommended** — KISS: (i) localizes to one boundary.

**Import note**: `Color` and `ValueUnit` are already imported in `color.ts` (`:1-21` imports `Color`; `:23` imports `ValueUnit`). No new imports for the signature.

## §B3 — The number-channel accessor (kill the `Number(rgb.r)` unwrap)

The glass-ui `cssToOklch` (site 10) carries a SECOND cast beyond the `parseCSSColor` one: after `colorUnit2(parsed, "rgb").value` it does `srgbToOKLab(Number(rgb.r), Number(rgb.g), Number(rgb.b))` (`color.ts:124`). The `Number(...)` coerces each parse-mode channel (a `ValueUnit<number>`) to its raw number. This is the same unwrap the demo does pervasively as `.value.r.value`.

**Add a typed number-channel accessor to value.js's public surface** so consumers get `[r,g,b]` numbers without the `Number()`/`.value` dance. Two options, **recommend (a)**:

- **(a) RECOMMENDED — a `parseColorUnitToRgb01(input: string): [number, number, number]` helper.** A small public function in value.js that takes a CSS string, runs `parseCSSColor` + `normalizeColorUnit` + `colorUnit2(_, "rgb")`, and returns the three channels as plain numbers in [0,1] via `ValueUnit.unwrapDeep`. This is **exactly** the `cssColorToRgb01` adapter the K.W4 demo wiring needs (§A4) AND exactly what glass-ui `cssToOklch` needs upstream of `srgbToOKLab`. Authoring it in value.js (the canonical core, inv-K-2) lets BOTH the demo `cssColorToRgb01` and glass-ui's `cssToOklch` consume ONE helper instead of hand-rolling the unwrap. Colocate it with `colorUnit2` in `src/units/color/normalize.ts` (it is a normalize+convert helper), then re-export through `src/index.ts`.
- **(b) Alternative — expose a `channelNumber(color, key): number` accessor (a public wrapper over internal `channelOf` + `unwrapDeep`).** Lower-level; does not collapse the parse+normalize+convert pipeline the demo and glass-ui both repeat. **Not recommended as the primary** — (a) does collapse it. Author only if a consumer needs per-channel access.

**Note on `ch`/`channelOf`/`setChannel`**: these are internal-only (`src/units/color/index.ts`, "NOT re-exported" — confirmed `grep src/index.ts` zero hits). Part-B does NOT expose them — it adds the **higher-level** `parseColorUnitToRgb01` helper (a), which uses `ValueUnit.unwrapDeep` (already public via the `ValueUnit` class) internally. This keeps the brand-helper surface internal while giving consumers the [0,1]-triple they actually want.

## §B4 — Delete the casts at all 9 value.js demo sites

With §B2 + §B3 landed, rewrite the 9 demo sites:

- **Sites 1–6, 9** (the bare `as ValueUnit<Color<ValueUnit<number>>, "color">` casts): DELETE the cast — `parseCSSColor` now returns that exact type. e.g. `useColorParsing.ts:31` becomes `color = parseCSSColor(value)` (no cast); same for `:34`, `:88`, `useColorModel.ts:29`, `useColorUrl.ts:36`, `useAppColorModel.ts:53`, `color-picker/index.ts:41`.
- **Sites 7, 8** (the `as … | null` casts): DELETE the cast AND the `| null` defensive branch — `parseCSSColor` throws (never returns null). The existing `try/catch` at `useContrastSafeColor.ts:78-` and `useMarkdownColors.ts:23-` already handles the throw, so the `if (!parsed) return …` guards (`useContrastSafeColor.ts:81`, `useMarkdownColors.ts:25`) become dead and are removed.
- **Import cleanup**: where `Color`/`ValueUnit` were imported **only** to spell the cast (`useColorUrl.ts:8-9`, `useContrastSafeColor.ts:7-8`, `useMarkdownColors.ts:6-7`, `useAppColorModel.ts:13-14`), remove the now-unused `import type` lines (eslint `no-unused-vars` / `verbatimModuleSyntax` will flag them; `npm run typecheck` + `npm run lint` are the gate). Sites that still use `Color`/`ValueUnit` elsewhere (e.g. `useColorParsing.ts` uses them in its function signatures `:23,:28,:39,:143`) keep the imports.
- **Where the [0,1]-triple is what's wanted** (e.g. the K.W4 `cssColorToRgb01` adapter, §A4): consumers switch to the NEW `parseColorUnitToRgb01` helper (§B3) instead of `parseCSSColor` + manual `.value.r.value` unwrap.

## §B5 — Delete the glass-ui aurora `cssToOklch` cast (site 10) — rides glass-ui 3.2.0

In `glass-ui/src/components/custom/aurora/composables/color.ts:117-127`, `cssToOklch`:

- Replace the `parseCSSColor(css) as Parameters<typeof colorUnit2>[0]` + `colorUnit2(parsed, "rgb").value` + `Number(rgb.r/.g/.b)` chain (`:122-124`) with a single call to the NEW value.js `parseColorUnitToRgb01(css)` helper (§B3): `const [r, g, bch] = parseColorUnitToRgb01(css)` then `srgbToOKLab(r, g, bch)`. This deletes BOTH the `as Parameters<…>[0]` cast AND the three `Number(...)` unwraps in one move.
- Update glass-ui's value.js import (`color.ts:11-19`) to add `parseColorUnitToRgb01` and drop `parseCSSColor` (only consumer is `:122`) and `colorUnit2` (verify it is unused elsewhere in this file before dropping).
- **This lands in glass-ui 3.2.0** (the same release as the derive, §A2.2) — it rides the Part-B value.js release. The glass-ui `__tests__/color-equivalence.test.ts` canary must stay green across the rewrite (`cssToOklch`'s OUTPUT is unchanged — same OKLCh stop; only the cast is removed).

## §B6 — Which wave Part-B rides, and why

**Part-B rides K.W3** (the primitive-lift wave), as a value.js **typing sub-lane**, for three load-bearing reasons:

1. **It unblocks the glass-ui aurora consumption.** Site 10 (`cssToOklch`) is cleaned by the §B3 helper, and the glass-ui 3.2.0 that carries the derive (§A2) should also carry the cleaned `cssToOklch` — so the Part-B value.js release must precede glass-ui 3.2.0, which precedes K.W4. K.W3 is the natural home (before K.W4 in `K.md §3`, and already the primitive-lift wave touching the demo's color-resolution path where `cssColorToRgb01` lives).
2. **It is the contract the demo `cssColorToRgb01` adapter (§A4) needs.** Landing Part-B at K.W3 means K.W4's adapter is cast-free from the start (it IS `parseColorUnitToRgb01`).
3. **It is a pure value.js library change + a published release** — it fits the K.W3 dist-model rhythm (value.js publishes, then downstream consumes) rather than being entangled with the K.W4 aurora glass-ui work.

**Sequencing within K.W3**: (1) value.js Part-B fix (§B2 + §B3) → typecheck/lint green → publish; (2) delete the 9 demo casts (§B4) against the same value.js source (the demo consumes value.js via `@src/*`, so it sees the tightened type immediately — no publish needed for the demo to drop its own casts); (3) glass-ui consumes the published value.js + cleans site 10 (§B5) → glass-ui 3.2.0 (this overlaps with the §A2 derive authoring, both in 3.2.0). The J.W3 `PaletteDiff.vue` orphan re-home (Wave-1 correction #5) is a sibling K.W3 concern the wave owner sequences alongside, but is NOT in this spec's ledger.

## §B7 — Gates / invariants Part-B must hold

- `npm run typecheck` (vue-tsc, library + demo) — strict-zero, 0 errors. The deleted casts must not re-introduce errors; the tightened return type must satisfy every consumer.
- `npm run lint` (eslint flat config) — exit 0; the removed-but-still-imported `Color`/`ValueUnit` type imports must be cleaned.
- `npm test` (vitest) — the parser unit tests stay green; the tightened return type is type-level only (no runtime change to `parseCSSColor`'s value).
- **`as`-budget discipline** (CLAUDE.md): `src/` holds 0 `as any` and 2 policy-documented `as unknown as`. Part-B option (i) adds ONE library-internal narrowing cast at `parseCSSColor`'s return — but REMOVES 10 consumer casts (9 demo + 1 glass-ui). Net: the discipline IMPROVES. The single internal cast is documented (the trust-boundary narrowing pattern, §B2), mirroring `resolveToPlainColor` (`color.ts:48`) and `normalize.ts:117`. It must NOT be `as any` or `as unknown as` — it is a `ValueUnit → ValueUnit<Color<ValueUnit<number>>, "color">` narrowing (a single-step assertion the parser guarantees, type-system-legal as a direct `as` since `ValueUnit` is the supertype).
- The glass-ui `__tests__/color-equivalence.test.ts` canary stays green across the site-10 rewrite (§B5).

---

## §C — Cross-cutting: corrections folded (Wave-1 verdict)

- **VAL-9**: do NOT invent a keyframes-3.0.0 spring emitter — VAL-9 was KILLED at J (spring emitter exists, glass-ui consumes it). Strike its re-bookings in `K.md §7` + `L.md §10`. (Edit-ledger note; not aurora/typing code.)
- **J.W3 `PaletteDiff.vue`** is a fired-trigger orphan to re-home in K.W3 (sibling concern; flagged for the K.W3 wave owner).
- **The reka-ui issue is a SINGLE STALE install** (K.W2.5 refresh, not this spec's lane) — noted because the demo's `package.json:96` `reka-ui: "^2.0.0"` is the pin K.W2.5 bumps to `^2.9`.
- **The C2 fix** (derive replaces the static Sky preset) is the §A4 `immediate: true` watch (§A4.1.1).

## §D — Out of scope / named-forward (KISS)

- Nuclei/flow/enum editing in `AuroraPane` (no flat-key path through `ConfigSliderPane`) — named-forward.
- `gamutMapOKLab` pre-wiring in the derive (the bake already clamps, glass-ui `color.ts:34`) — add only if a runtime out-of-gamut artifact is observed at K.W4.
- The `parseColorUnitToRgb01` option (b) per-channel `channelNumber` accessor — author only if a consumer needs per-channel access; (a) covers the demo + glass-ui.
- Exposing `ch`/`channelOf`/`setChannel` publicly — NOT done; they stay internal. Part-B adds only the higher-level helper.
- The K.W2.5 band-aid retirements (self-alias, dedupe, check-types.mjs, fs.allow, reka-ui refresh, dev.sh `SIBLING_WATCH_BUILDS`) — owned by K.W2.5, not this spec.


## EDIT LEDGER

- [glass-ui] src/components/custom/aurora/composables/color.ts — author deriveAuroraPalette(baseRgb:[number,number,number], opts?:DeriveOptions):OklchStop[] + export interface DeriveOptions; analogous-fan-in-OKLCh algorithm per K.W1-aurora-derive.md §2.2; consumes value.js srgbToOKLab (already imported :11) + kept local rawOklab/rawOklch trig; NO new OKLab/sRGB matrix math (inv-K-2)
- [glass-ui] src/components/custom/aurora/index.ts — extend the from './composables/color' re-export block to add deriveAuroraPalette + type DeriveOptions (alongside existing cssToOklch/flattenPalette/oklchToLinear/etc.)
- [glass-ui] src/components/custom/aurora/__tests__/derive.test.ts — NEW focused unit test: analogous-fan spread, lightness-ramp monotonicity, near-gray-base-stays-near-gray, stops clamp [2,MAX_STOPS]
- [glass-ui] package.json — version bump 3.1.1 -> 3.2.0 (MINOR: additive deriveAuroraPalette export); publish to registry (the dist-consumption gate for value.js)
- [value.js] src/parsing/color.ts — TIGHTEN parseCSSColor public return type bare ValueUnit -> ValueUnit<Color<ValueUnit<number>>,'color'> (annotate the memoize callback :613-631); one documented library-internal trust-boundary narrowing at the return points; doc-comment the guarantee (every branch routes through createColorValueUnit :37-45)
- [value.js] src/units/color/normalize.ts — NEW public helper parseColorUnitToRgb01(input:string):[number,number,number] (parseCSSColor + normalizeColorUnit + colorUnit2(_, 'rgb') + ValueUnit.unwrapDeep -> [r,g,b] in [0,1]); colocated with colorUnit2
- [value.js] src/index.ts — export parseColorUnitToRgb01 from the public barrel (the demo cssColorToRgb01 + glass-ui cssToOklch both consume it)
- [value.js] demo/@/components/custom/color-picker/composables/useColorParsing.ts — delete the 3 'as ValueUnit<Color<ValueUnit<number>>,color>' casts at :31, :34, :88 (parseCSSColor now returns the narrow type)
- [value.js] demo/@/components/custom/color-picker/composables/useColorModel.ts — delete the cast at :29 (NORMALIZED_COLOR_NAMES)
- [value.js] demo/@/components/custom/color-picker/composables/useColorUrl.ts — delete the cast at :36; remove now-unused import type Color/ValueUnit if only used for the cast (:8-9)
- [value.js] demo/@/composables/color/useAppColorModel.ts — delete the cast at :53; remove unused import type Color/ValueUnit (:13-14)
- [value.js] demo/@/composables/color/useContrastSafeColor.ts — delete the 'as ...|null' cast at :80, remove the dead 'if(!parsed) return css' guard (:81), drop unused import type Color/ValueUnit (:7-8)
- [value.js] demo/@/components/custom/markdown/composables/useMarkdownColors.ts — delete the 'as ...|null' cast at :24, remove the dead 'if(!parsed) return {}' guard (:25), drop unused import type Color/ValueUnit (:6-7)
- [value.js] demo/@/components/custom/color-picker/index.ts — delete the cast at :41 (createDefaultColorModel)
- [glass-ui] src/components/custom/aurora/composables/color.ts — rewrite cssToOklch (:117-127): replace parseCSSColor(css) as Parameters<typeof colorUnit2>[0] + colorUnit2(...).value + Number(rgb.r/.g/.b) with const [r,g,bch]=parseColorUnitToRgb01(css); drop parseCSSColor (and colorUnit2 if unused elsewhere) from the value.js import :11-19; rides glass-ui 3.2.0; equivalence-test canary stays green
- [value.js] demo/@/components/custom/panes/keys.ts — NEW injection key AURORA_CONFIG_KEY (mirrors BLOB_CONFIG_KEY)
- [value.js] demo/@/components/custom/panes/AuroraPane.vue — rebuild from the under-rework stub (:16-33): live SliderSection[] table over the 20 flat-scalar AuroraConfig fields (BlobPane.vue:23-80 model); inject AURORA_CONFIG_KEY shared reactive; delete the under-rework <div> + W0 comment header (no shim)
- [value.js] demo/color-picker/App.vue — replace :209-215 static clone + retired 'A.W6 deferred' comment with: provide(AURORA_CONFIG_KEY, auroraConfig); watch(cssColorOpaque, css => auroraConfig.palette = deriveAuroraPalette(cssColorToRgb01(css), {stops:3}), {immediate:true}); extend the :107 @mkbabb/glass-ui/aurora import with deriveAuroraPalette; cssColorToRgb01 = value.js parseColorUnitToRgb01 (reuse, not a new abstraction)
- [value.js] demo/color-picker/App.vue — fold grand-audit sharpenings: C2 (immediate:true makes derive replace the static Sky preset), optional @property --active-color registration IF the picked color binds a CSS var consumed by the atmosphere region, verify the existing safeAccentCss contrast-guard tracks the re-tint (reuse, no second guard), confirm NO new ungated RAF loop
- [value.js] demo/package.json — bump @mkbabb/glass-ui to ^3.2.0 (currently consuming 3.1.1 dist) before the App.vue derive wiring
- [value.js] docs/tranches/K/FINAL.md — record VAL-1 SHIP->LANDED (two-consumer evidence row) or KILL per the J kill-date; record the parseCSSColor typing-gap root-fix close (10 casts deleted)
- [value.js] docs ledger note (K.md §7 / L.md §10) — STRIKE the VAL-9 spring-emitter re-bookings (VAL-9 KILLED at J; emitter exists, glass-ui consumes it)


## GATES

- npm run typecheck (vue-tsc, library + demo) — strict-zero, 0 errors: the tightened parseCSSColor return type satisfies all 9 demo sites with casts deleted; no unused-import errors from removed Color/ValueUnit type imports
- npm run lint (eslint flat config) — exit 0: removed casts + cleaned imports produce no unused-vars/verbatimModuleSyntax violations
- npm test (vitest) — parser unit suite green: the tightened return type is type-level only, parseCSSColor runtime value unchanged
- cd api && npx tsc --noEmit — unaffected (no api changes), confirm green
- glass-ui __tests__/color-equivalence.test.ts canary green across the cssToOklch site-10 rewrite (cssToOklch output unchanged — only the cast removed)
- glass-ui aurora derive.test.ts green (analogous-fan, lightness-ramp, near-gray-stays-gray, stops clamp)
- as-budget discipline: src/ net cast count IMPROVES — Part-B adds 1 documented library-internal narrowing at parseCSSColor's return, removes 10 consumer casts (9 demo + 1 glass-ui); the internal cast is a single-step ValueUnit-supertype narrowing, NOT as any / as unknown as
- pi-lane picker re-tint close gate (K.W4): playwright readPixels non-equality between two distinctly-hued picked colors on the atmosphere canvas — changing the picked color visibly re-tints the atmosphere (K.md §6 hard gate)
- C2 verify: no code path leaves the static DEFAULT_AURORA_CONFIG Sky preset visible after mount (the immediate:true watch derives at mount)
- No new ungated RAF loop introduced (grand-audit PRM-RAF discipline): derive is a watch off the hot path; flattenPalette owns the per-frame in-place bake
- AuroraPane.vue git-diff shows the under-rework <div> deleted + the SECTIONS array present (the stub is gone, no shim)
- VAL-1 verdict executed (SHIP->LANDED with two-consumer evidence, or KILL per J kill-date — no re-booking) and recorded in K/FINAL.md


## DEPENDENCIES

- K.W2.5 (MECHANISM-C by deletion) MUST land first: development export condition deleted both repos, glass-ui resolution gate green, demo consumes glass-ui DIST (single externalized vue/reka instance), 4 band-aids retired (self-alias, resolve.dedupe, check-types.mjs, fs.allow), reka-ui 2.8.2->^2.9 refresh + lockfile guard, dev.sh SIBLING_WATCH_BUILDS=(../glass-ui) populated
- K.W2 dedup already landed (glass-ui aurora color.ts is post-dedup, imports value.js srgbToOKLab et al — CONFIRMED at color.ts:11-19) — the derive is authored against the post-dedup module
- Part-B (value.js parseCSSColor typing root fix, §B2+§B3) lands at K.W3 and value.js publishes — precedes glass-ui 3.2.0 and the K.W4 cssColorToRgb01 adapter
- glass-ui 3.2.0 published (deriveAuroraPalette + cleaned cssToOklch riding the Part-B value.js) — the dist-consumption gate; value.js cannot import deriveAuroraPalette until 3.2.0 is on the registry
- value.js demo bumps @mkbabb/glass-ui to ^3.2.0 (currently consuming 3.1.1 dist) before the §A4 wiring
- keyframes 3.0.0 (grand-audit semver-violation->3.0.0) lands as part of the green cohort the K.W4 close is gated on (aurora/VAL-1 do not depend on keyframes math, but the cohort must be green at close)
- K.W3 primitive-lift resolver work — if a shared cssColorToRgb01 is extracted there, K.W4 reuses it; the J.W3 PaletteDiff.vue orphan re-home is a sibling K.W3 concern the wave owner sequences alongside
- docs/RELEASE.md manual tranche-close publish ceremony — governs both the value.js Part-B release and the glass-ui 3.2.0 cut