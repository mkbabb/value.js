# U.W-LIB — THE LIBRARY-CORRECTNESS WAVE

*U-F29/F30 owner-ruled AMELIORATE (§13.5) · F31/F32/F33 the same E-3 serialization/contract
class · folds F34/F35/F74. The headline defect the whole post-T audit surfaced: the published,
README-usage `parseCSSValue`/`Color.toString()` ship real data-loss bugs the T visual campaign
never looked at.*

**Wave class**: STRUCTURAL (a library-API design-loop, NOT frontend-design). designHeavy = **no**.
No visual surface — the "frame" this wave certifies is a **serialized string / resolved value**,
captured RED-then-GREEN (see §π/DELTA). E-6 process: opus/sonnet fanout; the design-loop
(research → synthesize → prototype → critique → agglomerate) picks the two greenfield invariants
(U-F29 amelioration shape, U-F30 normalization invariant) — no Fable/frontend-design leg.

---

## §Name / opens-after

- **Name**: `U.W-LIB` — THE LIBRARY-CORRECTNESS WAVE.
- **Opens-after**: **root** — the formation-foundation wave. It runs on the current `tranche-t`
  substrate (value.js **3.1.0** on the registry) with the §28.3 BH relay already discharged at
  glass-ui `17e0f522` (`valuejs-inbox-2026-07-12-u-formation.md`, §1 the mixColors-convention
  coupling). No inbound wave dependency; **LIB → ADOPT** is the sole outbound bind (U-F77: the
  version-cut/publish decision and the sibling co-migration ride U.W-ADOPT, owner-held §13.5).
- **The registry wins**: this doc distills `audit/registry.md §11/§13.5/§15/§19/§22/§23/§25/§26/§28`;
  where the two could diverge the registry governs, and above BOTH the owner's verbatim (§13.5).

---

## §Goal criterion

Every LIVE library-correctness defect the audit CONFIRMED in published 3.1.0 is reproduced by a
**born-RED** test that FLIPS green when the idiomatic, E-3-class fix lands — the fix addressing the
serialization/contract **CLASS**, never one symptom, never a cherry-pick around a sibling:

1. **U-F29** (owner-ruled AMELIORATE) — `parseCSSValue('1px solid red')` no longer *silently* loses
   every token after the first; the truncation is either LOUD (throws/warns on unconsumed input) or
   the primary export returns the full value, and the `parseCSSSubValue` discoverability footgun is
   resolved. The **design loop picks the shape**; the owner's intent ("a consumer must not silently
   lose data") is honored either way.
2. **U-F30** (owner-ruled AMELIORATE) — `parseCSSColor('color-mix(in srgb, red 30%, blue)').toString()`
   and `parseCSSColor('rgb(from red r g b)').toString()` emit **physical-range** CSS (`rgb(76.5 0 178.5)`
   / `rgb(255 0 0)`), matching the direct-parse convention — fixed at the **mix/relative OUTPUT
   locus**, NOT the shared `createColorValueUnit` wrapper (the R-2 double-denorm trap), with a guard
   asserting the direct path is **unchanged**. The chosen invariant provably preserves the raw
   `mixColors`/`sampleColorRamp`/`color2` channel convention across the constellation's
   convention-sensitive consumers — OR its co-migration is relayed and booked to U.W-ADOPT (§28).
3. **U-F31/F32/F33** — the three verifier-confirmed serialization/contract siblings land in the SAME
   wave (E-3 binds; no cherry-pick): `rotate(45deg)` stays Z-only; `sin(30deg)` is unitless; a
   positioned gradient stop round-trips to valid CSS.
4. The three **folds** (U-F34 naming coherence · U-F35 2D recompose · U-F74 silent-gamut-map) land
   in the coherence cut of the same wave.
5. The **version-cut/publish decision** is PREPARED for owner presentation WITH the landed fix
   (U-F29's reshape is semver-loaded against BOTH `^3.1.0` peer floors) — never taken unilaterally;
   the cut itself is U.W-ADOPT's row (U-F77).

## §Completion criterion

- All born-RED gates (§Hard gate LIB-G1..G11) **GREEN** on `npm test` **and** `test:dist`; the
  direct-path-unchanged **guard** (LIB-G4) GREEN and stays GREEN; the U-F34 naming-parity check
  (LIB-G12) GREEN against the chosen convention.
- The **build-time raw-channel re-enumeration** gate (LIB-G6, §28.2) either GREEN (the chosen U-F30
  invariant provably preserves every then-current raw-channel reader) **or** it names the surfaces
  that co-migrate and books them to U.W-ADOPT + the BH relay addendum (never a silent ship).
- `npm run typecheck` + `npm run lint` exit 0; no `as any` added (S-precept); `src/` `as unknown as`
  count regenerable-not-regressed.
- The BH-inbox **addendum** landed (path-scoped to `../glass-ui/docs/tranches/BH/**`, grep-clean,
  foreign-tree fence) naming the CHOSEN U-F30 invariant + the co-migration verdict.
- The **publish packet** (the reshape's semver classification + the both-floor co-land plan) authored
  and handed to U.W-ADOPT for the owner-held cut.
- **PP-16**: the fix landing WITHOUT the owner's publish is NOT a miss — the wave closes
  **build-complete** with the cut sequenced to U.W-ADOPT (§13.5 forbids the unilateral cut). A born-RED
  that cannot flip because its cure is a sibling co-migration is BOOKED, not counted red at close.

---

## §Scope — the families this wave builds (each with its cure APPROACH; E-3 binds)

> **E-3 (binding)**: NO quick solutions, NO workarounds, NO legacy shims. Idiomatic gestalt;
> architectural transposition for elegance/simplicity/performance is *desirable*. The two
> owner-ruled defects are AMELIORATE, not patch — the design loop picks the greenfield shape.

### U-F29 — `parseCSSValue` silent truncation *(build · owner-ruled AMELIORATE §13.5)*

- **Defect (LIVE, published 3.1.0)**: `parseCSSValue = memoize(tryParse(ValuesValue))`
  (`src/parsing/index.ts:494-500`) parses a **single** sub-value. `'1px solid red' → '1px'`,
  `'0 0 4px red' → '0'`, `'translate(10px) rotate(45deg)'` drops `rotate`. `tryParse` never requires
  full-input consumption → returns the partial with **no throw/warn** (registry §11, §15 WEAKENED-but-
  owner-ruled). The full-list `parseCSSSubValue` (`:502+`) exists but is absent from the README and
  *named as if it parses less* — the discoverability footgun.
- **Cure APPROACH (design-loop picks between / composes)**: two idiomatic candidates, weighed in the
  prototype phase against the whole export surface and the keyframes consumer (§22):
  1. **LOUD-FAIL** — `parseCSSValue` requires full-input consumption; on unconsumed trailing tokens
     it throws (or emits a typed warn). Preserves the single-value return type; keyframes' 3 call
     sites are try/catch-guarded (§22) so they degrade gracefully. E-3-idiomatic: the parser tells
     the truth instead of silently dropping.
  2. **FULL-VALUE default** — the primary export returns the whole value (the `parseCSSSubValue`
     `any(FunctionArgs, Value)` composition becomes the default; the single-value parser gets an
     explicit name). Breaking; changes keyframes' resolved shape (ValueArray vs single ValueUnit at
     the unguarded downstream) → the co-migration rides U-F77.
  - Either way the **naming footgun** is resolved (a discoverable name for the full-list parser) and
    the README gains a multi-token example. **NO legacy alias shim** (E-3) — the consumer migrates at
    the root.
- **Publish**: the shape is semver-loaded → the version-cut decision is OWNER-HELD (§13.5), presented
  WITH the landed fix, sequenced at U.W-ADOPT (U-F77). LIB lands the fix; LIB does not cut.

### U-F30 — computed-color normalized serialization *(build · owner-ruled AMELIORATE §13.5)*

- **Defect (LIVE, published 3.1.0)**: colors from the flagship CSS Color 4/5 paths carry internal
  normalized `[0,1]` channels and `Color.toString()` (`src/units/color/base.ts:202-214`) emits
  `values()` **verbatim**. `color-mix(in srgb, red 30%, blue).toString() → 'rgb(0.3 0 0.7)'`
  (near-black) vs direct-parse `'rgb(76.5 0 178.5)'`; the relative-color path ALSO leaks
  (`rgb(from red r g b) → 'rgb(1 0 0)'`, §15). Same `parseCSSColor`, two incompatible numeric
  conventions by input path. Root (R-2, §20 + §23, VERIFIED): the direct-parse path stores
  **physical** channels (`src/parsing/color/color.ts`, rgb→76.5); only `mixColors` (`src/units/color/mix.ts`,
  returns a normalized `Color<number>`) and `resolveRelativeColor` (`src/parsing/color/relative-color.ts:125-163`,
  `createColorValueUnit(result)` at `:163`) store **normalized** — both wrapped by the shared
  `createColorValueUnit` (`src/parsing/color/color-unit.ts:32`) WITHOUT denorm.
- **Cure APPROACH (fix locus is LOAD-BEARING — R-2)**: normalize the invariant at the
  **`mixColors`/`resolveRelativeColor` OUTPUT** (emit physical-range, matching direct-parse) — NOT at
  the shared `createColorValueUnit` wrapper (denormalizing there **double-denorms the working direct
  path**, the confirmed trap). The **born-RED MUST assert the direct path is unchanged** as a guard
  (LIB-G4). Two greenfield invariants the design loop weighs (prototype phase):
  - **denorm-on-output** (emit physical at the mix/relative locus; the machinery exists —
    `serialize.ts convertColorSpaceDenorm`, §23); OR
  - **normalize-on-construct** — the §23-preferred candidate: `resolveRelativeColor` evaluates calc
    component-exprs against NORMALIZED bindings (`relative-color.ts:137-142`), so
    `rgb(from red calc(r + 10) g b)` computes `1+10` normalized then denorms ≠ CSS's `255+10` —
    normalize-on-construct handles the calc case cleaner; OR
  - **a per-instance normalization-state brand** on the Color/ValueUnit (the §28.1 orthogonal
    greenfield candidate) so `toString` disambiguates WITHOUT changing the channel convention — the
    invariant-preserving option that touches NO direct-channel reader.
- **The convention constraint (§25/§28, load-bearing)**: the chosen invariant MUST provably preserve
  the raw `mixColors`/`sampleColorRamp`/`color2` output channel convention that the constellation's
  **convention-sensitive consumers** read RAW (bypassing `toString`) — OR those consumers co-migrate
  (U.W-ADOPT + BH relay). §23 STRENGTHENED: the normalized ValueUnit is ALSO wrong when re-fed through
  `normalizeColorUnit`/`colorUnit2` (double-normalizes `0.3 → 0.00118`) — the EXACT pipeline glass-ui
  uses; the physical-output fix resolves BOTH the serialization and the re-normalize symptom at one
  locus (LIB-G5).

### U-F31 — transform single-axis expansion *(build · same E-3 class)*

- **Defect (CONFIRMED, §15/§29)**: `rotate(45deg) → rotateX/rotateY/rotateZ` (CSS `rotate` is
  **Z-only**); `translate(10px) →` all-axis; `scale(2) → scaleZ(2)` too. Root: the single-value branch
  `src/parsing/index.ts:87-91` iterates ALL `dimensions` for `values.length === 1`. Multi-arg forms
  are correct. Blast radius (§29): DIRECT consumers of the parse output (an **apply/keyframes** path),
  NOT the library's own matrix-component decompose/interpolate (which never consumes the expanded
  `FunctionValue` list).
- **Cure APPROACH**: the single-value branch must respect each transform's axis-cardinality — `rotate`
  is Z-only (a `rotate(a)` scalar is a Z-rotation), `translate`/`scale`/`skew` have their documented
  single-arg semantics. Idiomatic: a per-transform axis-expansion table (co-located with
  `makeTransformName`/`TRANSFORM_DIMENSIONS`), not a special-case bolt-on. Feeds keyframes'
  apply/resolve path → the concrete "producer-coupling turns build → co-migrate" (§22) → U-F77 relay.

### U-F32 — math trig unit leak *(build · same class)*

- **Defect (CONFIRMED-bounded, §15)**: `evaluateMathFunction(sin(30deg)) → 0.5deg` (should be a
  unitless `<number>` per css-values-4); leaks into `calc(sin(30deg)*100px) → 50deg` not `50px`.
  Root: `inferResultUnit` (`src/parsing/math.ts:504-524`) lists only the INVERSE trig fns
  (`asin/acos/atan/atan2 → rad`, `:515`); the forward `sin/cos/tan` fall through to
  "inherit-from-argument" (`:518-522`) and carry `deg` out. Confined to the `evaluateMathFunction`
  resolve path (`parseCSSValue` round-trips the AST unevaluated).
- **Cure APPROACH**: `inferResultUnit` returns **unitless** for the forward trig fns (`sin/cos/tan`)
  — a named case alongside the inverse-fn `rad` case, not a downstream strip. E-3: fix the inference
  at the type-determining locus, not the emit.

### U-F33 — gradient-stop position round-trip *(build · same class)*

- **Defect (CONFIRMED-bounded, §15)**: `linear-gradient(90deg, red 20%, blue 80%)` serializes to
  `'linear-gradient(90deg, red), 20%, ...blue), 80%'` — the stop-position comma-joins away from its
  color (invalid CSS, reads as 5 stops). Root: `FunctionValue.toString` **default** comma-join
  (`src/units/index.ts:300`) has no positioned-stop case for `*-gradient` functions — the `linear()`
  easing-hint case (`:269-281`) handles `linear()` NOT `linear-gradient`, and the `:297` comment's
  "CONFIRMED-CORRECT" claim is falsified by the audit. The **demo** uses a SEPARATE strict gradient
  parser (`gradientParse`/`useGradientCSS`, test-asserted) → no app path hits it; confined to the
  library `FunctionValue` serialize.
- **Cure APPROACH**: a positioned-stop case in `FunctionValue.toString` for the gradient functions —
  a stop and its position(s) space-join, stops comma-join (the same shape the `linear()` hint case
  already models, generalized to `*-gradient`). E-3: one idiomatic serialize case, not a per-consumer
  patch.

### U-F34 — library naming incoherence *(FOLD → the library-coherence row)*

- **Defect (§11)**: `{from}2{to}` vs `{from}To{to}` coexist (`xyz2rgb` vs `xyzToICtCp`); `serialize*`
  vs `reverse*` for the same parse-inverse role; casing drift (`srgbToOKLab`/`linearToSrgb`/
  `oklabToLinearSRGB`).
- **Cure APPROACH (design-loop convention pick)**: adopt the **`{from}2{to}`** convention as the one
  true form (it is the documented convention — `src/units/color/CLAUDE.md` "Naming convention:
  `{from}2{to}`") and rename the drift at the root (`xyzToICtCp → xyz2ictcp`, etc.). E-3: NO legacy
  re-export aliases — consumers migrate at the root. A **naming-parity check** (LIB-G12) codifies the
  convention so a future `{from}To{to}` addition is caught.

### U-F35 — 2D recompose missing *(FOLD → the library-coherence row)*

- **Defect (§11)**: `decomposeMatrix2D` (`src/transform/decompose.ts:41`) has no `recomposeMatrix2D`
  inverse (`recomposeMatrix3D` exists at `:431`) and `interpolateDecomposed` (`:510`) is 3D-only —
  2D decompose is a **dead-end** (you can decompose but never recompose or interpolate a 2D matrix).
- **Cure APPROACH**: add `recomposeMatrix2D` (the algebraic inverse of `decomposeMatrix2D`) + extend
  `interpolateDecomposed` to accept the 2D shape (or route 2D through a unified path). born-RED
  round-trip (LIB-G11: `recompose(decompose(M)) ≈ M`).

### U-F74 — conversion silent gamut-map *(FOLD → the library-correctness wave, §26)*

- **Defect (§19)**: `xyz2rgb` defaults `correctGamut = true` (`src/units/color/conversions/xyz-extended.ts:71,81`)
  so `color2(x, 'rgb')` **silently gamut-maps** — a caller converting wide→sRGB to DETECT
  out-of-gamut never sees raw OOB channels, and `correctGamut = false` is **not dispatch-exposed**
  (`dispatch.ts color2` offers no way to pass it).
- **Cure APPROACH**: expose the raw-OOB detect path through dispatch — an idiomatic option on `color2`
  (or a sibling `color2Raw`/an options bag) that threads `correctGamut = false` so OOB detection is a
  first-class capability, not a buried default. born-RED (LIB-G10) asserts a known-OOB wide color
  reports raw OOB channels through the dispatch surface.

---

## §Hard gate — the born-RED gate table (concrete; cite the registry evidence)

**Born-RED law**: each gate below guards a **LIVE** defect (all confirmed shipping in published
3.1.0), so each is authored **born-RED** (`test.fail()` / expected-red) and FLIPS when the cure lands
(registry §11/§15/§19/§20/§23). Gates run on `npm test` (jsdom unit) AND `test:dist` (the built-bundle
behavioral slate). **No visual/GPU gate**: U.W-LIB has no rendered surface — the "still-red vs
real-GPU frame" clause (charter §real-GPU annex) does NOT apply here; the wave's "frame" is a
serialized string / resolved value (see §π/DELTA).

| Gate | Family | born-RED assertion (RED today → GREEN at cure) | Source anchor |
|---|---|---|---|
| **LIB-G1** | U-F29 | `parseCSSValue('1px solid red')` does NOT silently return `'1px'` — the multi-token input either throws-on-unconsumed OR returns the full value (per the chosen shape); no silent drop. | `parsing/index.ts:494-500` |
| **LIB-G2** | U-F30 | `parseCSSColor('color-mix(in srgb, red 30%, blue)').toString() === 'rgb(76.5 0 178.5)'` (today `'rgb(0.3 0 0.7)'`). | `mix.ts` + `color-unit.ts:32` + `base.ts:202` |
| **LIB-G3** | U-F30 | `parseCSSColor('rgb(from red r g b)').toString() === 'rgb(255 0 0)'` (today `'rgb(1 0 0)'`) **and** the calc case `rgb(from red calc(r + 10) g b)` computes in the CSS convention (`265`, not `11`-normalized). | `relative-color.ts:125-163,137-142` |
| **LIB-G4** | U-F30 | **GUARD (born-GREEN, must STAY green)** — the direct-parse path is UNCHANGED: `parseCSSColor('rgb(76.5 0 178.5)').toString() === 'rgb(76.5 0 178.5)'`. The R-2 double-denorm guard; if it reddens, the fix hit the wrong (shared-wrapper) locus. | `color.ts` direct-parse |
| **LIB-G5** | U-F30 | The re-fed pipeline is correct: a color-mix result pushed through `normalizeColorUnit`/`colorUnit2` does NOT double-normalize (today `0.3 → 0.00118`) — the exact glass-ui pipeline (§23). | `normalize.ts colorUnit2` |
| **LIB-G6** | U-F30 / §28 | **Build-time raw-channel re-enumeration** — a gate that greps the THEN-CURRENT constellation for raw readers of `mixColors`/`sampleColorRamp`/`color2` and asserts the chosen invariant preserves the channel convention for ALL of them (or names the co-migrants). Born-RED until the invariant is proven convention-preserving OR the co-migration is booked. | §28.2 (structural) |
| **LIB-G7** | U-F31 | `parseCSSValue('rotate(45deg)')` yields a single Z-rotation, NOT `rotateX/rotateY/rotateZ`; `translate(10px)`/`scale(2)` respect single-arg axis semantics. | `parsing/index.ts:87-91` |
| **LIB-G8** | U-F32 | `evaluateMathFunction(sin(30deg))` is unitless `0.5` (NOT `0.5deg`); `calc(sin(30deg)*100px) → 50px`. | `parsing/math.ts:504-524,515` |
| **LIB-G9** | U-F33 | `parseCSSValue('linear-gradient(90deg, red 20%, blue 80%)').toString()` round-trips to VALID CSS (stop+position space-joined, stops comma-joined), NOT the 5-token comma corruption. | `units/index.ts:300` |
| **LIB-G10** | U-F74 | A known-OOB wide color converted to sRGB via the dispatch surface can report RAW out-of-gamut channels (`correctGamut=false` dispatch-exposed), not a silently-mapped in-gamut result. | `xyz-extended.ts:71,81` + `dispatch.ts` |
| **LIB-G11** | U-F35 | `recomposeMatrix2D(decomposeMatrix2D(M)) ≈ M` and `interpolateDecomposed` accepts the 2D shape — today `recomposeMatrix2D` does not exist (compile/run RED). | `transform/decompose.ts:41,510` |
| **LIB-G12** | U-F34 | **Naming-parity check** (not born-RED — a convention gate): every conversion export matches the chosen `{from}2{to}` form; the drift (`xyzToICtCp`, `oklabToLinearSRGB`, …) is renamed. | `units/color/conversions/*` + `CLAUDE.md` |

**The FOUR consumer surfaces (U-F29/U-F30 born-RED drives them, per §25/§28)** — the born-RED set is
not unit-local; it certifies the change against the convention-sensitive consumers the audit
enumerated, with the build-time gate (LIB-G6) owning the exact count so a fresh sibling commit cannot
invalidate a formation-time list:

1. **glass-ui `parseCSSColor` auto-adopt path** (`^3.1.0` minor) — the U-F30 serialization change
   reaches glass-ui through its `parseCSSColor → colorUnit2` pipeline (LIB-G5 is this exact pipeline).
2. **glass-ui DIRECT `mixColors`/`sampleColorRamp` path** — `spectrum-walk.ts` reads RAW `OKLCHColor`
   channels bypassing `toString` (§25); the chosen invariant preserves that convention OR
   spectrum-walk co-migrates (relay).
3. **keyframes `parseCSSValue` ×3 + `parseCSSSubValue`/`parseCSSValueUnit`** (`resolve-function.ts:61,159`,
   `resolve-if.ts:131`, §22) — the U-F29 reshape changes keyframes' resolved values; the co-migration
   rides U-F77.

4. **keyframes DIRECT `sampleColorRamp`/`color2` path** (`backward-color.ts`, §28) — reads RAW oklab
   channels via `rawOklab`, bypassing `toString` exactly like glass-ui's spectrum-walk; the chosen
   invariant preserves that convention OR backward-color co-migrates (relay, rides U-F77).

*(The registry's re-frame is explicit: enumeration is the wrong tool for a living codebase — LIB-G6,
the build-time re-enumeration born-RED, owns the exact count at cut time; the formation gate is the
CLASS, proven four times over. This numbered set is the formation-time enumeration; LIB-G6 is the
standing authority.)*

---

## §π / DELTA obligations

The charter's rule: **every VISUAL claim carries a before/after π-frame obligation + a DELTA
measurement.** U.W-LIB makes **ZERO visual claims** — it is a pure library-API wave with no rendered
surface, no GPU frame, no owner-eye still-red. Therefore **U.W-LIB mints zero π-frame obligations**
and the real-GPU/owner-attested-frame annex does NOT apply to any of its gates.

The π/DELTA obligation is discharged in its **honest non-visual form** — the "frame" is the
**serialized string / resolved value**, captured RED-then-GREEN, and the DELTA is the exact output
transition + the consumer blast-radius measurement:

| Claim | "before" frame (RED) | "after" frame (GREEN) | DELTA obligation |
|---|---|---|---|
| U-F29 | `parseCSSValue('1px solid red')` returns the silent partial `'1px'` | throws-on-unconsumed OR returns the full value | the exact return transition + the **keyframes 3-call-site resolved-value DELTA** (multi-token today → shape at cure) |
| U-F30 mix | `'rgb(0.3 0 0.7)'` | `'rgb(76.5 0 178.5)'` | the string DELTA + the **glass-ui `colorUnit2` re-normalize DELTA** (`0.3 → 0.00118` today) + the **spectrum-walk raw-channel DELTA** (preserved = 0, or the co-migration delta) |
| U-F30 relative | `'rgb(1 0 0)'` (and the calc `11`-normalized) | `'rgb(255 0 0)'` (calc `265`) | the string DELTA + the calc-convention DELTA |
| U-F31 | `rotate(45deg) → 3 axes` | Z-only | the parse-output DELTA + the **keyframes apply/resolve blast-radius** measurement |
| U-F32 | `sin(30deg) → 0.5deg` | `0.5` | the resolved-unit DELTA |
| U-F33 | the comma-corrupted 5-token string | valid round-trip CSS | the serialize DELTA |
| U-F74 | silently-mapped in-gamut result | raw OOB channels reported | the detect-path DELTA (OOB flag now observable) |

Every born-RED gate above IS its own before/after capture — the RED assertion is the "before" frame,
the flip is the "after"; the DELTA is recorded in the wave's gate ledger at close.

---

## §Cross-repo RELAY (E-2 — the owner relay edict)

U.W-LIB touches the **glass-ui-level contract**: the `mixColors`/`sampleColorRamp`/`color2`
raw-channel output convention that TWO siblings read RAW (glass-ui `spectrum-walk.ts`, keyframes
`backward-color.ts`) and the `parseCSSValue`/`parseCSSColor` shape both consume. Per E-2 it carries a
**RELAY row**.

**RELAY-LIB-1 → the glass-ui BH inbox** (`../glass-ui/docs/tranches/BH/coordination/`):

- **Prior discharge (formation)**: the U→glass-ui BH communiqué already LANDED at glass-ui HEAD
  `17e0f522` (`valuejs-inbox-2026-07-12-u-formation.md`, §1 the mixColors-convention coupling —
  spectrum-walk co-migrate/hold at cut; §3 the 5.0.0 + parseCSSValue-reshape co-land). The relay half
  of §28.3 is REAL, not promised.
- **This wave's addendum (at fix-landing)**: a path-scoped addendum to the BH inbox at their HEAD
  naming (a) the **CHOSEN U-F30 invariant** (denorm-on-output / normalize-on-construct / normalization-
  state brand), (b) the **co-migration verdict** — does the invariant PRESERVE the raw-channel
  convention (spectrum-walk/backward-color unaffected, LIB-G6 GREEN) or must they co-migrate — and
  (c) the U-F29 shape (loud-fail vs full-value) so keyframes' 3 call-sites can plan. Path-scoped to
  `../glass-ui/docs/tranches/BH/**`, grep-clean, foreign-tree fence — U.W-LIB edits NO glass-ui source.
- **The co-land itself** (the version cut + the sibling pin-widen + the spectrum-walk/backward-color
  source co-migration) is **U.W-ADOPT's RELAY row** (U-F77), owner-held (§13.5). LIB names + relays;
  ADOPT co-lands.

---

## §Dispositions (each family → build / fold / retire + rationale)

| Family | Disposition | Rationale |
|---|---|---|
| **U-F29** | **build** (owner-ruled AMELIORATE §13.5) | The README-usage export silently loses data; loud-fail OR full-value reshape (design-loop). born-RED LIB-G1. Publish owner-held → U.W-ADOPT. |
| **U-F30** | **build** (owner-ruled AMELIORATE §13.5) | Two incompatible numeric conventions by input path; fixed at the mix/relative OUTPUT locus (NOT the shared wrapper — R-2), invariant provably convention-preserving or co-migrated (§28). born-RED LIB-G2/G3/G5/G6 + guard LIB-G4. |
| **U-F31** | **build** | `rotate(45deg)→3 axes`; CSS rotate is Z-only. Same E-3 serialization/contract class; feeds keyframes apply/resolve. born-RED LIB-G7. |
| **U-F32** | **build** | `sin(30deg)→0.5deg`; should be unitless. Confined to `inferResultUnit`. Same class. born-RED LIB-G8. |
| **U-F33** | **build** | Positioned gradient stops comma-join → invalid CSS. The library `FunctionValue.toString` default; demo unaffected (separate strict parser). Same class. born-RED LIB-G9. |
| **U-F34** | **fold** → the library-coherence row | Naming incoherence; pick `{from}2{to}` (the documented convention), rename the drift at the root, NO legacy aliases (E-3). Parity check LIB-G12. |
| **U-F35** | **fold** → the library-coherence row | `decomposeMatrix2D` has no recompose inverse + `interpolateDecomposed` 3D-only; add the 2D inverse + interp. born-RED LIB-G11. |
| **U-F74** | **fold** → the library-correctness wave (§26) | `xyz2rgb` silently gamut-maps; expose the `correctGamut=false` raw-OOB detect path through dispatch. born-RED LIB-G10. |

No family in this wave retires — every one is a LIVE correctness build (or a coherence fold that
lands the same cut). Zero silent drops; each terminates here with rationale, none re-books.

---

## §Dependencies

- **Inbound**: **root** — no wave dependency. Runs on the current substrate; the §28.3 BH relay is
  discharged.
- **Outbound (LIB → ADOPT, the U-F77 co-land bind)**: the version-cut/publish decision and the
  sibling co-migration ride **U.W-ADOPT** (owner-held §13.5), sequenced against **BOTH** `^3.1.0`
  peer floors — glass-ui (`../glass-ui/package.json:1114` peer + `:1152` dev) and keyframes
  (`../keyframes.js/package.json:268`, VERIFIED §22). A 4.0.0 cut strands TWO floors, not one; LIB
  lands the fix, ADOPT cuts coherently.
- **Tooling**: `npm test` (jsdom), `test:dist` (built-bundle behavioral slate — the born-RED gates
  wire here so the published surface is what's certified), `typecheck`, `lint`. No external service,
  no GPU, no live probe (the probe-parsimony edict is trivially satisfied — static + unit only).
- **NOT dependent on**: the glass-ui 5.0.0 trigger (that gates U.W-ADOPT's *cut*, not LIB's *fix*),
  T.W8 close (no visual inheritance here), or any designHeavy wave.

---

## §BOOKS (ride to a later wave — by name)

- **The PUBLISH / version-cut decision** → **U.W-ADOPT** (U-F77). LIB authors the fix + the publish
  packet (semver classification of the U-F29 reshape + the both-floor co-land plan); the OWNER takes
  the cut at ADOPT (§13.5 forbids the unilateral cut). Not a miss under PP-16 — a sequenced hand-off.
- **The spectrum-walk (glass-ui) + backward-color (keyframes) convention CO-MIGRATION** → **U.W-ADOPT**
  co-land + the BH relay (only IF the chosen U-F30 invariant does NOT preserve the raw-channel
  convention; LIB-G6 decides). LIB names it in the BH addendum; ADOPT co-lands.
- **The keyframes `^3.1.0` pin-widen + the 3 `parseCSSValue` call-sites' multi-token/throw-shape
  handling** → **U.W-ADOPT** (U-F77) + keyframes' dev process (relay). The reshape changes keyframes'
  resolved values (§22); the co-migration is theirs to land at the cut.
- **The `sampleColorRamp` convention link to the Q5-ramp reasoning** → **U.W-VISUAL** (U-F6 ramp-half).
  Per charter §W8-inheritance, "the Q5-ramp-resolver correctness feeds the U-F6-adjacent library
  reasoning." LIB does NOT own the ramp cure (WR-8 / U.W-VISUAL); it records that `sampleColorRamp`'s
  raw-channel convention (LIB-G6) is the shared surface, so a U-F30 invariant change is visible to the
  ramp resolver.
- **The O-14 feasibility-leg oracle law** (the U-F6 oracle-half, "every guard-constant gets a
  feasibility leg") → **U.W-ORACLE** (U-F62 split). Not this wave — recorded so the split-home is
  named.

---

**Precedence**: the owner's verbatim (§13.5 — U-F29/F30 AMELIORATE) → `audit/registry.md` → `U.md` →
this wave doc. Downstream never overrides upstream. The library-correctness cut lands the fix
born-RED-per-defect; the owner holds the publish.
