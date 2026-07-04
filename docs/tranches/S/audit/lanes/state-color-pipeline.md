# Lane: State + Color Pipeline (the app's spine)

**Scope:** the end-to-end color-state derivation graph —
`useAppColorModel → useColorModel → CSS_COLOR_KEY/EDIT_TARGET_KEY → safeAccent →
--accent-live → --accent-view → atmosphere/aurora → blob → slider gradients →
overlay lens → readout`. Audit-only. Repo @ `c5aa091` (branch `tranche-q`),
live probes against `http://localhost:9000`.

**Verdict headline:** the pipeline WORKS mechanically (with localStorage clear,
a color change flows cleanly to accent + aurora + blob + sliders — see
`assets/state-color-pipeline/aurora-blue2.jpeg`), but it is realised as **~11
scattered `watch()` side-effects across 6 composables writing to 3 sinks
(`document.documentElement.style`, `localStorage`, provided refs) with a
DOUBLE source-of-truth model and no defined precedence between its two
persistence channels (URL hash vs localStorage).** This is precisely the case
for collapsing to ONE explicit derivation graph. Details + ranked findings
below.

---

## 1. The derivation graph as-built (every edge)

Two `ColorModel` instances exist, not one:

- **App model** — `App.vue:131` `model = shallowRef<ColorModel>(defaultColorModel)`.
  Fed to `useAppColorModel(model)` (App-level derivations) + `useContrastSafeColor`
  + `useAtmosphere` + `usePaneRouter` + `usePaletteManagerWiring` + `useColorUrl`.
- **Picker model** — `useColorModel.ts:39` `model = shallowRef({ ...externalModel.value })`,
  a SECOND reactive copy inside `ColorPicker`, two-way-synced to the App model via
  a `lastWrittenModel` identity-guard watch (`useColorModel.ts:42-65`). Reason of
  record (MEMORY): `defineModel()`'s async round-trip returns stale reads, so the
  inner `shallowRef` is a synchronous cache.

Edges (● = `watch` side-effect, ○ = `computed`, ▸ = provide/inject):

```
App.model.color
 ├─○ useAppColorModel.cssColor            (App.vue:135)  → usePaneRouter cssColor
 ├─○ useAppColorModel.cssColorOpaque      ─▸ CSS_COLOR_KEY (App.vue:147)
 │     ├─● useAtmosphere aurora seed      (useAtmosphere.ts:84)  → deriveAurora → AuroraAtoms.seed → resolveAtoms → useAurora(webgl/css)
 │     ├─● useAtmosphere blob paletteStops(useAtmosphere.ts:108) → deriveBlobPalette → BLOB_CONFIG_KEY
 │     ├─● localStorage "color-picker-bg" (useAppColorModel.ts:83)
 │     └─▸ injected by 8 panes + Dock      (grep CSS_COLOR_KEY)
 ├─○ useContrastSafeColor.safeAccentCss   ─▸ SAFE_ACCENT_KEY (App.vue:150)
 │     └─● --accent-live root token       (App.vue:158)  → CSS: --accent-view = oklch(from --accent-live … + --view-hue-shift)
 │                                                        → --primary, --glass-tint-source, --focus-ring-color
 ├─● syncColorToStorage (debounce 200ms)  (useAppColorModel.ts:74,80) → localStorage "color-picker"
 └─● useColorUrl model↔hash sync           → URL

App.model.savedColors
 └─● localStorage + ○ savedColorStrings   (useAppColorModel.ts:33,89)

viewManager.currentConfig.accentHueShift
 └─● --view-hue-shift root token          (App.vue:177)  → CSS animates --accent-view hue

Picker.model.color (the SECOND copy)
 ├─○ denormalizedCurrentColor → cssColor/cssColorOpaque/currentColorOpaque  (useColorModel.ts:69-108)
 ├─ref stableHue (HSV hue drift guard)    (useColorModel.ts:95)
 ├─○ HSVCurrentColor → SpectrumCanvas
 ├─useSliderGradients ● (11-step re-derive per component)  (useSliderGradients.ts:45)
 └─○ savedColorStrings (DIFFERENT impl than App's — see F3)
```

CSS chain confirmed live (`assets/…/aurora-blue2.jpeg`, and the sample):
`--accent-live: oklch(55% 0.22 265deg/100%)` → `--accent-view:
oklch(from … l c calc(h + 0))` → `--primary` = view accent, `--glass-tint-source`
= live accent. The whole CSS relative-color derivation is JS-free and correct.

---

## 2. Findings (ranked, root-routed)

### P0-1 — Persistence precedence: localStorage CLOBBERS the URL color (shareable links are non-authoritative)
**Root:** value.js demo (`useColorUrl` ↔ `useStorage("color-picker")` ordering).
**Evidence (live):** `page.goto('…#/?space=oklch&color=oklch(0.55 0.22 265)')` with a
populated `localStorage["color-picker"]` → after settle the model REVERTED to the
stored `lab(92% 88.8 20)` and `useColorUrl` **rewrote the hash** to
`#/mix?space=lab&color=lab(92%…)` (clobbering the requested blue). Screenshot
`assets/state-color-pipeline/aurora-blue.jpeg` shows the pink default despite the
blue URL. Clearing localStorage then reloading the SAME blue URL applied it fully
(`aurora-blue2.jpeg`). So a shared color link does NOT win against a returning
visitor's stored color — the two persistence channels have no defined precedence
and localStorage wins the race. This ALSO masks S-18: a color arriving by URL
silently disappears, reading as "the aurora/accent never changed."
**Failure scenario:** user shares `color.babb.dev/#/?color=…`; recipient who has
ever used the app sees THEIR old color, not the shared one. Deterministic.
**Wave-item:** define ONE precedence (URL hash SHOULD win on load; localStorage is
the fallback only when the hash carries no color) inside the single pipeline
orchestrator (see §3). This is the U9-family (persistence-ordering) defect class.

### P0-2 — Local dev API is CORS-dead (S-11 confirmed at pipeline edge)
**Root:** value.js demo `@/lib/palette/api/client.ts:34-35` — `BASE_URL` defaults
to `https://api.color.babb.dev` with no `VITE_API_URL`, so `localhost:9000`
preflight is rejected: *"'Access-Control-Allow-Origin' has value
'https://color.babb.dev' that is not equal to the supplied origin."* (2 console
errors on every load). Palette browse/save/name-propose are all dead locally.
**Routing note:** S-11's deep root belongs to the sibling `api-broken-rootcause.md`
lane; recorded here because it is a live pipeline-edge break (the saved-colors →
palette branch of the graph cannot round-trip in dev).

### P1-1 — Double source-of-truth model (the two `shallowRef<ColorModel>` + two-way sync)
**Root:** value.js demo (`useColorModel.ts:39-65` + `useAppColorModel`).
The App model and the Picker model are separate reactive copies kept in sync by a
`lastWrittenModel` identity guard. Every derivation that both layers need
(`cssColor`, `cssColorOpaque`, `savedColorStrings`) is computed TWICE, once per
model, and the atmosphere/accent read App's copy while the picker card reads its
own. The guard pattern is fragile (a spread `{ ...ext }` breaks referential
identity intentionally, so the guard depends on write-ordering). This is the
structural seam behind the "which cssColorOpaque?" ambiguity (10 sites,
`grep cssColorOpaque` — 2 `computed`, 8 `inject`).
**Wave-item:** hoist ONE model + ONE set of derivations into a provided pipeline
composable; the picker consumes the injected derivations instead of recomputing.

### P1-2 — Duplicated derivation: `cssColorOpaque` computed twice, byte-identical logic (DRY)
**Root:** value.js demo. `useAppColorModel.ts:20-31` and `useColorModel.ts:80-90`
are the SAME algorithm (native-space → denorm+alpha=100+`toFormattedString(2)`;
else clone+alpha=1+`toCSSColorString`). Same for `cssColor`
(`useAppColorModel.ts:18` vs `useColorModel.ts:73`). Two maintenance points for
one contract.
**Wave-item:** single `deriveCssColor(model)` helper; both (or the one surviving)
model consume it.

### P1-3 — Duplicated derivation that DIVERGES: `savedColorStrings` (DRY + correctness)
**Root:** value.js demo. `useAppColorModel.ts:33-37` maps each saved color via
`normalizeColorUnit(c, true, false).toString()` (no native/oklch branch,
`.toString()` on the unit). `useColorModel.ts:154-163` branches
native→`normalizeColorUnit` else `colorUnit2(c,"oklch",…)` then
`.value.toFormattedString(2)`. These emit DIFFERENT strings for the same saved
color, so the picker's saved swatches and the pane-router/palette-manager's saved
list can render the same color as different text.
**Failure scenario:** save an OKLCH color; the swatch label in the picker card and
the value passed to `usePaletteManagerWiring` disagree. Confirmed by inspection.
**Wave-item:** one `serializeSavedColor` helper; delete the second.

### P1-4 — Manual OKLCH denorm hardcoded in the demo (E4 raw-vs-display class — MORE of them exist)
**Root:** value.js demo `useContrastSafeColor.ts:55-59` AND `:91-93`. Both
hand-denormalize the safe accent: `C * 0.5`, `H * 360`, and format an `oklch()`
string BY HAND, duplicating (and hardcoding the ranges of) what
`normalizeColorUnit`/the library's own denorm path already do. This is the exact
E4 raw-vs-display bug substrate: the [0,1]-normalized→physical mapping is encoded
as a magic literal in the consumer, not carried by the type. `src` already ships
`safeAccentColor(color, bgL): OKLCHColor` (`contrast.ts:185`) which the demo does
NOT use — it re-implements `computeSafeAccent` + a bespoke stringifier instead,
twice, with subtly different normalize flags (`colorUnit2(…, true, …)` at line 39
vs `colorUnit2(…, false, …)` at line 82).
**Broader E4 census:** the norm/denorm state is tracked by POSITIONAL BOOLEANS
across the whole pipeline — 24 `normalizeColorUnit(color, inverse, inplace)` +
30 `colorUnit2(color, to, normalized, inverse, inplace)` callsites in `demo/@`
(`grep`). `normalize.ts:57,73` — nothing in the type distinguishes a normalized
`ValueUnit<Color>` from a denormalized one, so every callsite must remember the
right boolean triplet by convention. This is the systemic E4 root: the raw-vs-
display distinction is a naming discipline, not a type. Candidate: a branded
`Normalized<Color>` / `Display<Color>` phantom (mirrors the existing
`ColorChannel` brand) so the compiler enforces which domain a value is in.
**Wave-item (demo):** replace both hand-denorm blocks with a `src` helper that
returns an accent CSS string (add `safeAccentCssString` to `contrast.ts`, or use
`safeAccentColor(...).toString()`). **Wave-item (src, S-24):** evaluate a
normalized/display brand to retire the positional-boolean E4 class.

### P1-5 — S-18 substantiated: aurora IS coupled, but the effect is weak/near-monochrome; and the update is masked by P0-1
**Root:** SHARED — value.js demo (`DEFAULT_AURORA_ATOMS`, `panes/keys.ts:22`) +
glass-ui producer (`aurora/composables/color.ts deriveAurora` defaults).
**Evidence:** the seed IS wired — `useAtmosphere.ts:84` writes `auroraAtoms.seed =
cssColorOpaque`; `resolveAtoms` (`atoms.ts:283`) re-derives the palette via
`deriveAurora(seed)` which varies L (band ramp), C (bell curve, `color.ts:274-283`)
AND hue (`deriveHue` analogous walk). Live proof: the blue URL (localStorage clear)
produces a fully blue aurora + blue blob (`aurora-blue2.jpeg`). So "does not update
at all" is FALSE at the mechanism level — it is masked by P0-1 (URL color reverts)
AND perceptually weak because the demo's default atoms yield a near-monochrome pale
wash: `harmony:"analogous"` + glass-ui default `hueSpread:28°` + `colorEnergy:0.7`,
and the L band is anchored to the seed's lightness (so a light pick → an all-pale
ramp). The user's ask ("vary H and C across a few elements, not just lightness") is
a tuning ask: widen `hueSpread`/pick a richer `harmony` (triadic/split) and lift
`colorEnergy`.
**Routing note:** the derive-math tuning depth belongs to the sibling
`aurora-derive-audit.md`; recorded here as the pipeline-edge truth (seed is live;
weakness is atom-default + P0-1, NOT a broken edge).

### P2-1 — Accent contrast guard appears NOT to fire in light mode for near-white picks (verify)
**Root:** value.js demo `useContrastSafeColor.ts:34-49` (candidate).
**Evidence:** live, `--accent-live` sampled as the RAW `lab(92% 88.80 20 / 100%)`
(OKLCH L≈0.95) against the light-scheme bg L≈0.97 — deltaL≈0.02 ≪ the 0.35
`DEFAULT_MIN_CONTRAST` (`contrast.ts:106`), so `computeSafeAccent` SHOULD have
shifted L to ≈0.62 and the composable SHOULD have returned an adjusted `oklch(…)`.
It returned the unguarded raw string. Possible causes to verify: (a) the read
caught a pre-dark-resolution transient (`useDark` timing), (b) the model's OKLCH L
differs from expectation, (c) the `safe.L === L && safe.C === C && safe.H === H`
equality (line 47) is defeated by float identity. Whatever the cause, the live
accent on the default color is a near-white L=92% text/border color on an
L=97% surface — low contrast. **Verdict: verify, then fix at the composable.**

### P2-2 — Scattered watchers writing to `documentElement.style` from JS (orchestration smell)
**Root:** value.js demo. `--accent-live` (App.vue:158) and `--view-hue-shift`
(App.vue:177) are pushed onto the root element by two separate imperative
`watch → setProperty` effects; the aurora seed + blob palette are two more
`watch(cssColorOpaque)` effects in `useAtmosphere`. Four imperative DOM-writing
effects keyed off the same upstream, none of which declares its dependency on the
others. Combined with the two `localStorage`-writing watches (200 ms debounce +
the bg mirror) and the URL sync, the pipeline's "graph" is implicit in watch
registration order. See §3.

---

## 3. Pipeline-orchestration verdict: YES — collapse to ONE explicit derivation graph

The spine is currently ~11 `watch`/`computed` side-effects spread across
`useAppColorModel`, `useColorModel`, `useContrastSafeColor`, `useAtmosphere`,
`useSliderGradients`, `useColorUrl`, plus 2 inline `App.vue` watchers — writing to
`documentElement.style` (×4 tokens), `localStorage` (×3 keys), the URL, and 4
provided refs. Two model copies. Two persistence channels with no precedence
(P0-1). Three duplicated derivations, one of which diverges (P1-2/3). The
raw-vs-display domain tracked by positional booleans (P1-4).

Recommend a single `useColorPipeline(model)` composable that:
1. owns the ONE model (retire the inner `useColorModel` copy or make it a pure
   injected consumer — resolve the `defineModel` staleness at the source, per
   `feedback_no_backwards_compat`);
2. exposes ONE set of derivations (`cssColor`, `cssColorOpaque`,
   `savedColorStrings`, `safeAccentCss`) — deleting the duplicates;
3. declares persistence precedence explicitly (URL-hash-wins-on-load), fixing
   P0-1;
4. writes the CSS tokens through one `applyTokens(el, {accent, hueShift})`
   sink instead of scattered `setProperty` watchers;
5. consumes `src`-side accent stringification (P1-4) so no denorm math lives in
   the demo.

This is the architectural transposition the tranche seeds: the graph becomes
data (an explicit dependency list) instead of registration-order-dependent
watchers.

---

## 4. Candidate wave-items (concrete)

| # | Item | Root | Precept |
|---|------|------|---------|
| W-SCP-1 | Define URL-hash-wins persistence precedence; stop localStorage clobbering shared color links (P0-1) | demo | no-silent-handling |
| W-SCP-2 | Collapse the double `ColorModel` to one model + injected derivations (P1-1) | demo | DRY/KISS |
| W-SCP-3 | Single `deriveCssColor`/`cssColorOpaque` + `serializeSavedColor` helpers; delete the duplicates (P1-2, P1-3) | demo | DRY |
| W-SCP-4 | Replace hand-denorm accent strings with a `src` `safeAccentCssString` helper (P1-4) | demo + src | DRY, E4 |
| W-SCP-5 | Evaluate a `Normalized`/`Display` phantom brand on `Color` to retire the positional-boolean norm/denorm class (P1-4, S-24) | src | type-over-convention |
| W-SCP-6 | One `useColorPipeline` orchestrator; route the 4 CSS-token writes through one sink (P2-2, §3) | demo | no god module (keep ≤400) |
| W-SCP-7 | Verify + fix the light-mode accent contrast guard on near-white picks (P2-1) | demo | correctness |
| W-SCP-8 | (cross-lane) point local dev at a local API / relax CORS for localhost (P0-2 / S-11) | api + demo env | — |
| W-SCP-9 | (cross-lane) tune `DEFAULT_AURORA_ATOMS` harmony/hueSpread/energy for richer H·C variation (P1-5 / S-18) | demo + glass-ui | — |

**Cross-lane handoffs:** S-18 derive-math depth → `aurora-derive-audit.md`;
S-11 API root → `api-broken-rootcause.md`; the norm/denorm brand (S-24) →
`lib-color-audit.md`. This lane owns the pipeline SHAPE and its two persistence
channels.

**Evidence assets:** `assets/state-color-pipeline/aurora-blue.jpeg` (blue URL,
populated localStorage → reverts to pink = P0-1),
`aurora-blue2.jpeg` (blue URL, localStorage cleared → full blue aurora+blob = the
edge works).
