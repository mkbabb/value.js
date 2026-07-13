# U.W-LIB — THE CONSUMER-TRUTH PROBE (the four convention-sensitive surfaces)

**Role**: the consumer-truth prober for U.W-LIB §Hard-gate consumer list (registry §22/§25/§28).
Read-only probe of the sibling trees at their CURRENT HEADs; static analysis only (probe-parsimony).
This is the ground truth the U-F29/U-F30 design loop and LIB-G6 gate against — NOT committed here
(the orchestrator commits).

## HEADs of record (2026-07-13)

| Repo | HEAD | Note |
|---|---|---|
| glass-ui | `da051943` | BI cursor mid-flight (B7-MOTION); the surfaces below are untouched by BI |
| keyframes.js | `f794def9` | U.Z2 CLAUDE-absence witness; the parse+color surfaces below are untouched |
| value.js (self) | `tranche-u` @ 3.1.0 | the shipped library the four surfaces consume |

The value.js loci the fix would touch: `mixColors`/`sampleColorRamp` (`src/units/color/mix.ts`),
`colorUnit2`/`normalizeColorUnit` (`src/units/color/normalize.ts`), `createColorValueUnit` (the
SHARED wrapper, `src/parsing/color/color-unit.ts:32`), `parseCSSValue` (`src/parsing/index.ts:494`),
`parseCSSSubValue` (`src/parsing/index.ts:502+`).

---

## THE LOAD-BEARING DISTINCTION (governs surfaces 2 + 4)

`mixColors` (`mix.ts:108-180`) and `sampleColorRamp` (`mix.ts:403-437`) are **convention-AGNOSTIC
pure lerps**: `color2(col1, space)` short-circuits when the input is already in `space` (dispatch
same-space), then the function lerps each channel VERBATIM. The ONE convention it imposes is that the
**hue channel is treated as `[0,1]` turns** (`interpolateHue`, `mix.ts:65` — "Hues are in [0,1]
(normalized)"). It does NOT normalize or denormalize L/C/a/b — it returns whatever channel magnitudes
it was fed. The registry's "`mixColors` returns a normalized `Color<number>`" is true only because the
color-mix() **parser** feeds it normalized endpoints; the FUNCTION itself is magnitude-transparent.

Therefore the U-F30 fix has THREE physically-distinct candidate loci, and which one the design loop
picks decides whether the two DIRECT surfaces (spectrum-walk, backward-color) survive:

- **Locus P (the parse-path wrapping)** — denorm the mix/relative result in the color-mix() parser
  handler (`color.ts`) + `resolveRelativeColor`'s wrapping (`relative-color.ts:163`,
  `createColorValueUnit(result)`), scoped to those two parse paths only. The direct consumers call
  `mixColors`/`sampleColorRamp`/`color2` DIRECTLY and NEVER enter the parser's ValueUnit-wrapping →
  **PRESERVED**. This is the registry's intended R-2 locus ("the mix/relative OUTPUT locus, NOT the
  shared `createColorValueUnit` wrapper").
- **Locus F (inside the shared functions)** — denorm inside `mixColors`/`sampleColorRamp`/`color2`
  themselves. The direct consumers read exactly those return values raw → **BREAKS BOTH** (double-
  transform on channels they already supply/expect physical-or-normalized-per-their-own-convention).
- **Locus W (the shared `createColorValueUnit` wrapper)** — the R-2 double-denorm trap; also
  double-transforms the working direct-parse path (LIB-G4 guard reddens). REJECTED by the registry.

The **normalization-state brand** cure is Locus-P-equivalent for the direct surfaces: channels are
UNCHANGED, only `toString` (+ a brand-aware `normalizeColorUnit`) disambiguates → **PRESERVED**
regardless. This is §28.1's "touches NO direct-channel reader."

**Every "does not break" verdict below for surfaces 2 + 4 is conditional on Locus P (or the brand).
Locus F breaks both — and backward-color's break is SILENT (see §Surface 4 green-over-broken).**
LIB-G6 is the standing gate that forbids a silent Locus-F ship.

---

## Surface 1 — glass-ui `parseCSSColor` auto-adopt path (`parseCSSColor → colorUnit2`)

- **File**: `../glass-ui/src/composables/color/index.ts`, fn `cssToOklch` (`:118-124`).
- **The pipeline** (this is LIB-G5's exact pipeline):
  ```
  const parsed = parseCSSColor(css)                     // :119  ValueUnit<Color<ValueUnit<number>>>
  const rgb    = colorUnit2(parsed, "rgb").value        // :120  → normalized [0,1] rgb channels
  const [L,a,b] = srgbToOKLab(Number(rgb.r), …g, …b)    // :121  consumes rgb.r/g/b as [0,1]
  ```
- **Convention assumed**: `colorUnit2(_, "rgb")` on its FORWARD path (`inverse=false`,
  `normalize.ts:100-109`) runs `normalizeColorUnit` then `color2` and returns **NORMALIZED `[0,1]`**
  channels (it does NOT denorm to `[0,255]`). `cssToOklch` feeds those straight into `srgbToOKLab`
  as `[0,1]`. The assumption: **the parsed ValueUnit carries PHYSICAL channels** so
  `normalizeColorUnit` has physical magnitudes to normalize.
- **Reachability of the U-F30 defect**: for the common inputs (hex / `oklch()` / named / `rgb()` /
  var-resolved concretes) the input is a DIRECT-parse color → physical stored → `colorUnit2`
  normalizes correctly → this surface works TODAY and is untouched by every cure. The defect is
  reachable ONLY if a consumer feeds `cssToOklch` a `color-mix()` or `rgb(from …)` STRING: today
  `parseCSSColor` stores normalized `[0,1]` for those, `colorUnit2` normalizes AGAIN → the LIB-G5
  double-normalize (`0.3 → 0.00118`, near-black). No live glass-ui call site was found feeding a
  mix/relative string here (inputs are concrete anchors), so the defect is LATENT on this surface.
- **Break table**:
  - **denorm-on-output (Locus P)**: NO break — improves it. Mix/relative strings now store PHYSICAL
    → `colorUnit2` normalizes correctly. Direct-parse inputs unchanged (LIB-G4).
  - **normalize-on-construct**: NO break — same fix, same improvement.
  - **normalization-state brand**: NO break for the common direct-parse inputs (channel convention
    unchanged). The latent mix-string double-normalize is cured ONLY if the brand also teaches
    `normalizeColorUnit`/`colorUnit2` to skip re-normalizing a brand-normalized color — which LIB-G5
    REQUIRES the brand cure to do. Either way, no NEW break is introduced.
- **Verdict**: the auto-adopt BENEFICIARY. All three cures preserve or improve it. No co-migration.

---

## Surface 2 — glass-ui DIRECT `mixColors`/`sampleColorRamp` (spectrum-walk, raw OKLCH)

- **File**: `../glass-ui/src/components/custom/border-progress/composables/spectrum-walk.ts`
  (import `:22`; the path the registry §25 cited — confirmed current).
- **Raw-channel reads/writes** (bypasses `parseCSSColor`/`toString`/serialize entirely):
  ```
  stopToColor(s) = new OKLCHColor(s.L, s.C, s.h / 360)   // :32-33  L∈[0,1], C∈PHYSICAL(~0..0.4), h∈TURNS[0,1]
  mixColors(a, b, 1-f, f, "oklch", "shorter")            // :58-65
  sampleColorRamp(a, b, segCount, {space:"oklch", hueMethod:"shorter"})  // :90-93
  oklchToStop(c) = { L:Number(c.l), C:Number(c.c),       // :36-40  reads l as [0,1], c as PHYSICAL,
                     h:(Number(c.h)*360 %360 +360)%360 } //         h as TURNS (×360 → deg)
  ```
- **Convention assumed**: the raw OKLCH channel convention **`L∈[0,1]`, `C∈physical (~0..0.4, NOT
  [0,1]-normalized)`, `h∈turns [0,1]`**. It constructs `OKLCHColor` with these raw magnitudes and
  reads them back identically — i.e. it depends on `mixColors`/`sampleColorRamp` being an
  IDENTITY on the channel magnitudes (Locus-P behavior), the hue interpolated in turns. `sampleColorRamp`
  runs with the default `gamutMap:true`; today's ship is byte-faithful, so the current identity
  round-trips through the gamut egress.
- **Break table**:
  - **denorm-on-output (Locus P)**: NO break — spectrum-walk calls `mixColors`/`sampleColorRamp`
    DIRECTLY, never the color-mix() parser wrapping the fix touches.
  - **normalize-on-construct**: NO break — a parse-path change; spectrum-walk builds its `OKLCHColor`
    itself and never routes through the parser.
  - **normalization-state brand**: NO break — channels are the invariant; the brand only affects
    `toString`, which spectrum-walk does not call.
  - **denorm-on-output MIS-SCOPED to Locus F**: **BREAKS** — spectrum-walk's chroma is ALREADY
    physical (`~0.1`); a denorm inside `mixColors`/`sampleColorRamp` would (double-)transform it →
    shifted border-progress spectrum, no born-RED on this surface (boot-smoke catches export drift,
    not convention shift). This is the co-migration vector.
- **Verdict**: PRESERVED under the sanctioned cures (Locus P / brand). Co-migration required ONLY if
  the loop lands the denorm inside the shared functions. LIB-G6 must grep this file at cut time.

---

## Surface 3 — keyframes `parseCSSValue ×3` + `parseCSSSubValue`/`parseCSSValueUnit`

The U-F29-sensitive sites are EXACTLY the three `parseCSSValue` calls — **all three are
try/catch-guarded**. The other two parse entrypoints keyframes uses are U-F29-IMMUNE (different
function / single-token-gated).

| Site | Line (verified) | Guarded? | Expected shape | U-F29 exposure |
|---|---|---|---|---|
| `resolve/resolve-function.ts` `coerceArg` | **:61** `return parseCSSValue(param.default)` | YES — try/catch `:60-72` → diagnostic + `DROP` | single `ValueUnit\|FunctionValue` (a coerced arg) | EXPOSED |
| `resolve/resolve-function.ts` bind-missing | **:159** `bound = parseCSSValue(param.default)` | YES — try/catch `:158-171` → diagnostic + `DROP` | single node (`binding.set(name, bound)`) | EXPOSED |
| `resolve/resolve-if.ts` `reparseLeaf` | **:131** `return parseCSSValue(String(node.value))` | YES — try/catch `:130-134` → `return node` | single node, ideally a `unit:"color"` leaf | EXPOSED |
| `compile/parse-flatten.ts` `tryParseLeaves` | :119 `parseCSSSubValue(strValue, …)` | n/a (full-value parser) | `ValueArray` → `flattenToValueUnits` normalizes | **IMMUNE** — uses `parseCSSSubValue`, already the full-list parser |
| `compile/selector.ts` `parseKeyframeSelector` | :170 `parseCSSValueUnit(selector)` | pre-guarded by conforming grammar `:156-165` | single `ValueUnit` (`"0%"`/`"from"`/`"to"`) | **IMMUNE** — single-token-gated; not `parseCSSValue` |

`param.default` and `if()` consequents are OVERWHELMINGLY single-token (`"0px"`, `"red"`, `"10deg"`)
→ parse identically under either cure. The reshape bites only multi-token inputs and (under
full-value) the return SHAPE of every input.

### U-F29 at each call-site (the schema's f29Impact)

- **LOUD-FAIL (throw on unconsumed trailing tokens)** — SAFE for keyframes, essentially free:
  - `:61` — a multi-token default that today truncates to its first token now THROWS → the catch
    fires → `CUSTOM_FN_ARG_DROP` diagnostic + `DROP` (the arg drops). No crash.
  - `:159` — same: the missing-positional default throws → diagnostic + `DROP` (the call drops). No crash.
  - `:131` — throws → `catch { return node }` returns the ORIGINAL opaque `unit:"string"` leaf intact
    (better than today's silently-truncated node). No crash.
  - Single-token defaults/consequents are unchanged. Net: loud-fail CURES the silent truncation and
    keyframes degrades gracefully at all three guarded sites. Co-migration ≈ FREE (the pin-widen at
    the cut is the only real action; §22).
- **FULL-VALUE-DEFAULT (primary export returns the full `ValueArray`)** — BREAKING for keyframes:
  - The `parseCSSSubValue` shape contract wraps EVEN a bare scalar in a **one-element `ValueArray`**
    (`index.ts` doc: `"10px"` → 1-element ValueArray). So `parseCSSValue` would return a `ValueArray`
    for ALL inputs, single-token included — the return SHAPE changes at all three sites, and the
    try/catch does NOT fire (no throw).
  - `:61`/`:159` — `bound` becomes a `ValueArray`; `substituteParams` (`resolve-function.ts:101`)
    does `return value.clone()`, splicing a `ValueArray` where a `ValueUnit\|FunctionValue` is
    expected → a malformed result tree (`new FunctionValue(name, [ValueArray, …])`). Silent shape
    corruption in the unguarded downstream.
  - `:131` — `reparseLeaf` returns a `ValueArray` instead of the intended `unit:"color"` leaf.
    Downstream `isColorUnit` (backward-color.ts:45) checks `v.unit === "color"` — a `ValueArray` has
    no such `.unit` → the reparsed `if()` color is no longer recognized → color densify silently
    drops it.
  - Net: full-value-default forces REAL keyframes source changes (unwrap/collapse the 1-element
    ValueArray at each site) — a genuine co-migration that rides U-F77, NOT free.
- **Recommendation surfaced by the probe**: loud-fail preserves keyframes' resolved SHAPE (single
  node) and only changes multi-token VALUES (an improvement), degrading through guards already in
  place. Full-value-default changes the SHAPE at every site and breaks three unguarded downstreams.
  Loud-fail is the keyframes-cheaper U-F29 shape.

---

## Surface 4 — keyframes DIRECT `sampleColorRamp`/`color2` (backward-color, raw oklab)

- **File**: `../keyframes.js/src/animation/compile/emit/backward-color.ts` (import `:25`).
- **Raw-channel reads/writes**:
  ```
  toColor(vu)   = normalizeColorUnit(vu).value as Color         // :51-55  NORMALIZED [0,1] color feeds the ramp
  rawOklab(c):  const ok = color2(c, "oklab")                   // :59
                return [ ok.l,                                  // :64  L read as-is ([0,1])
                         scale(ok.a, 0,1, OKLAB_A_MIN,MAX),     // :66  a manually denormed from [0,1]
                         scale(ok.b, 0,1, OKLAB_B_MIN,MAX) ]    // :67  b manually denormed from [0,1]
  fromRawOklab(L,a,b): color2({colorSpace:"oklab", l:L,         // :102  inverse — a/b scaled [phys]→[0,1]
                         a:scale(a,MIN,MAX,0,1), b:scale(…)}, "oklab")
  sampleColorRamp(fromColor, toColor_, stopCount, {space,…})    // :205  and the 1024-sample ref at :221
  ```
- **Convention assumed**: the **NORMALIZED `[0,1]` channel convention throughout** — `color2` fed a
  normalized color returns normalized channels; backward-color reads `ok.l` as `[0,1]` and manually
  `scale`s `ok.a`/`ok.b` from `[0,1]` to physical `[-0.4,0.4]` for the CSS `oklab()` emit and for
  `deltaEOK`. `OKLAB_A_MIN/MAX/B_MIN/MAX` come from `COLOR_SPACE_RANGES.oklab` (`:34-37`). It depends
  on `sampleColorRamp`/`color2` being magnitude-IDENTITY on the normalized channels (Locus-P
  behavior). It never calls `toString`.
- **Break table**:
  - **denorm-on-output (Locus P)** / **normalize-on-construct** / **brand**: NO break — backward-color
    runs the ramp on colors it normalized itself (`normalizeColorUnit`) and never enters the mix/
    relative PARSER path (it feeds ordinary declared keyframe colors). The fix's parse-path/toString
    locus is invisible here.
  - **denorm-on-output MIS-SCOPED to Locus F**: **BREAKS — AND SILENTLY**. If the denorm lands inside
    `sampleColorRamp`/`color2`, its normalized-`[0,1]` reads become physical, and `scale(ok.a, 0,1,…)`
    double-transforms → wrong `oklab()` densify stops. **Green-over-broken (§28)**: the ΔE ship-vs-
    refuse proof is RELATIVE — `worstDelta` compares `channelMidpoint(ramp[s],ramp[s+1])` against
    `kfRefRamp[…]`, BOTH produced by the SAME `sampleColorRamp` (`:221-229`). A uniform convention
    shift CANCELS in the proof, so keyframes ships WRONG absolute stops while its own gate stays
    GREEN. There is no born-RED on this surface.
- **Verdict**: PRESERVED under the sanctioned cures. The Locus-F break here is the most dangerous of
  the four (silent, self-gate-masked) — the sharpest reason LIB-G6 must grep `backward-color.ts` (and
  spectrum-walk) at cut time rather than trust a formation-time list.

---

## Summary matrix

| # | Surface | Repo | File | Convention read | denorm-on-output (Locus P) | normalize-on-construct | brand | Locus-F risk |
|---|---|---|---|---|---|---|---|---|
| 1 | `parseCSSColor→colorUnit2` | glass-ui | composables/color/index.ts:118-124 | colorUnit2 fwd → normalized [0,1]; expects PHYSICAL stored | no break (fixes latent mix-string) | no break (fixes) | no break | n/a (goes through parser/normalize, self-heals) |
| 2 | direct `mixColors`/`sampleColorRamp` | glass-ui | border-progress/…/spectrum-walk.ts:22-93 | L∈[0,1], C∈physical, h∈turns | no break | no break | no break | BREAKS (spectrum shift, no gate) |
| 3 | `parseCSSValue ×3` (+SubValue/ValueUnit) | keyframes | resolve-function.ts:61,159 · resolve-if.ts:131 | single `ValueUnit\|FunctionValue`; all 3 guarded | — | — | — | U-F29: loud-fail SAFE (guarded DROP) · full-value BREAKS shape (ValueArray, unguarded) |
| 4 | direct `sampleColorRamp`/`color2` | keyframes | compile/emit/backward-color.ts:25-221 | normalized [0,1]; a/b hand-scaled | no break | no break | no break | BREAKS SILENTLY (ΔE proof cancels) |

## Standing recommendations to the design loop

1. **Pick a cure at Locus P (or the normalization-state brand).** Both keep LIB-G6 GREEN for surfaces
   2 + 4 with ZERO sibling co-migration. Locus F (denorm inside `mixColors`/`sampleColorRamp`/`color2`)
   strands both direct readers, one of them silently.
2. **LIB-G6 must physically grep `spectrum-walk.ts` and `backward-color.ts` at cut time** — the
   formation-time list is a snapshot of a living codebase; the born-RED owns the count.
3. **U-F29: loud-fail is the keyframes-cheaper shape** — the 3 guarded sites degrade to DROP/revert
   with no source change; full-value-default forces unwrap fixes at 3 unguarded downstreams (U-F77).
4. **Surface 1 is a beneficiary, not a risk** — every cure preserves the common concrete-color path
   and cures the latent `color-mix()`/relative-string double-normalize (LIB-G5).
