# Changelog

## [4.0.0] — 2026-07-16

The capability cut. Version 4 removes the omnibus package root and publishes exactly seven explicit entries:

- `@mkbabb/value.js/color`
- `@mkbabb/value.js/value`
- `@mkbabb/value.js/css`
- `@mkbabb/value.js/easing`
- `@mkbabb/value.js/math`
- `@mkbabb/value.js/transform`
- `@mkbabb/value.js/quantize`

### Breaking

- Removed the `@mkbabb/value.js` root export, `/parsing`, and `/units`. There are no aliases, compatibility shims, or dual paths.
- Replaced mutable class-oriented public values with immutable structural color, CSS value, and result types.
- CSS parsers return `ParseResult<T>`: success carries a value and empty diagnostics; failure carries a non-empty diagnostic tuple.
- Color, easing, serialization, and quantization operations that can fail return discriminated `Result` values instead of throwing, returning `null`, or substituting an identity/default.
- Removed legacy timing registries, `ValueUnit`/`ValueArray`/`InterpolatedVar` contracts, raw color-conversion exports, and other root-barrel internals. Consumers import the owning capability and handle failure explicitly.

### Added and changed

- `/color` owns immutable objects and failure-explicit conversion, mixing, gamut mapping, contrast, hue interpolation, and RGBA projection across 17 spaces.
- `/css` owns the thirteen CSS-spellable color spaces plus structured value, stylesheet, keyframe, animation/timeline, property, custom-function, and timing grammar with canonical serialization.
- `/easing` owns named numeric easings and failure-explicit cubic-bezier, stepped, linear, and dynamic lookup constructors.
- `/value` exposes the structural CSS value union and the single semantic `isLayoutTrackingUnit` classifier.
- `/math`, `/transform`, and `/quantize` remain DOM-free capability leaves.
- The package build is unconditional, deletes stale output before emission, and produces declarations for every exact export-map target.

## [3.1.0] — 2026-07-05 (S.W1 · remediation — ICtCp + Jzazbz land as FULL spaces; the 3.0.0 record corrected)

The honest completion of the S perceptual slate. The 3.0.0 cut shipped ICtCp (W1-6/Q9) and Jzazbz
(W1-11) as conversion-function **pairs only** — the transforms are excellent and independently
oracled — but the ratified mandate (Q9) and the S.W1 hard gate (rows 5+7) require **full spaces**:
`Color` subclasses + `color2()` dispatch + `color2Into` currency + parsing + serialization. The
independent 11-row gate caught the shortfall (rows 5+7 FAIL); worse, the published 3.0.0 CHANGELOG,
the `v3.0.0` tag message, and `audit/w1-close-artefacts.md §6` all **claimed** the full integration
— a dishonest record. This release completes the spaces and corrects the [3.0.0] entry above to its
true scope (the pushed `v3.0.0` tag is immutable and left untouched — the CHANGELOG correction is
the honest record).

Additive (a semver MINOR — new public API, no breaks):

- **`ICtCpColor` full space** (ITU-R BT.2100) — the `Color<T>` subclass (channels `i` / `ct` /
  `cp`), the `color2()` XYZ-hub dispatch arm (reusing the 3.0.0 `xyzToICtCp` / `ictcpToXYZ`
  transforms via `conversions/ictcp.ts`), `color2Into` currency, `ictcp(I Ct Cp / a)` parsing (the
  CSS Color HDR draft functional syntax; the `hsv(…)` non-CSS-native precedent), and
  serialization. Ranges: `i ∈ [0,1]`, `ct`/`cp ∈ [-0.5,0.5]` physical.
- **`JzazbzColor` full space** (Safdar 2017) — the `Color<T>` subclass (channels `jz` / `az` /
  `bz`), the dispatch arm (`conversions/jzazbz.ts` wrappers over the shipped `xyzToJzazbz` /
  `jzazbzToXYZ`), `color2Into` currency, `jzazbz(Jz az bz / a)` parsing, serialization. Ranges:
  `jz ∈ [0,0.222]` (the colorjs `xyz-abs-d65` convention — D65 media white lands at
  `Jz≈0.2220652`, so the bound normalizes white to ~1), `az`/`bz ∈ [-0.5,0.5]` physical.
- Both spaces join `ColorSpaceMap<T>`, `COLOR_SPACE_RANGES`, `COLOR_SPACE_DENORM_UNITS`,
  `COLOR_SYNTAX_FAMILY` (non-legacy), `COLOR_FUNCTION_FORM` (bare `named`), and `COLOR_SPACE_NAMES`;
  exported from the top-level barrel. New suite `test/color-hdr-spaces.test.ts` (16 tests):
  dispatch-wiring vs the raw oracle, `rgb→space→rgb` roundtrips (≤1e-9), `color2Into` currency
  through both, parse + serialize.
- **Demo**: the two spaces become legitimate picker options — `DISPLAY_COLOR_SPACE_NAMES` +
  `colorSpaceInfo` metadata rows added (the OKHSL/OKHSV precedent: new spaces JOIN the instrument;
  the selector enumerates `DISPLAY_COLOR_SPACE_NAMES` so they appear automatically).

## [3.0.0] — 2026-07-05 (S.W1 · the library major — near-black srgb cure + parsing P0s + two public-surface breaks + the perceptual slate)

The one honest major of tranche S's round 1 (`docs/tranches/S/waves/S.W1.md`; RATIFIED
2026-07-05, `audit/RATIFICATION-2026-07-05.md §2.1` — re-stamped from 2.1.0 because the Q2
`logerp` reorder + Q3 `color-soa.ts` excision are public-API breaks, and the srgb cure is
output-changing for near-black). Every breaking + output-changing row bundled into a single
3.0.0 (the keyframes-2.2.0 semver lesson: never dribble breaks across minors).

### BREAKING — the by-name MIGRATION table

| Symbol / behavior | 2.x | 3.0.0 | Migration |
|---|---|---|---|
| `logerp(t, start, end)` | t-**first** | `logerp(start, end, t)` — t-**last**, matching `lerp` (Q2 FLIP) | reorder the three arguments at every call site; **NO compat shim, NO deprecation alias** |
| `buildColorChannelPlan` · `packColorChannels` · `lerpColorChannels` · type `ColorChannelPlan` (`color-soa.ts`) | public exports | **REMOVED** — orphan API, phantom keyframes.js consumer, zero real consumers (Q3 EXCISE) | no replacement; `interpolate.ts`'s internal `ColorInterpPlan` is a different, non-public structure |
| `@mkbabb/value.js` self-dependency in `dependencies` (`^1.0.2`) | present | **REMOVED** (W0-9 excision, routed to this cut) | none — no real consumer relied on value.js self-depending; the entry forced a stale nested `node_modules/@mkbabb/value.js@1.0.2` self-install that `vite.config.ts`'s self-alias existed only to override, and was harmful to published consumers (nested stale major) |
| `srgbToLinear` near-black decode | encoded 1..10/255 decoded on the power branch (~3.2× too bright) | decode on the **linear** branch (`c/12.92`), IEC 61966-2-1-correct | OUTPUT-CHANGING for ≤10/255 (encoded) only — see below; no signature change |

### LIBRARY — output-changing (the near-black srgb decode cure — the booked defect, W1-1)

- **`srgbToLinear` decode-threshold fix** (`units/color/conversions/transfer.ts`). The DECODE
  branch now pivots on the ENCODED-axis threshold `SRGB_TRANSITION` (0.04045), not the
  linear-axis 0.0031308. The encoded 8-bit dark band 1..10/255 (all in [0.0031308, 0.04045])
  previously mis-routed through the power branch, decoding near-black ~3.2× too bright; it now
  decodes on the linear branch.
  - **Pixel-output-changing for ≤10/255 (encoded) ONLY.** At n=1/255, neutral `XYZ.Y` moves
    **9.837e-4 → 3.035e-4**. Hand-computed dark-band goldens, from an INDEPENDENT IEC 61966-2-1
    transfer + Rec.709/D65 matrix oracle (never the library as its own oracle): n=1 →
    `0.00030352698354883757` … n=10 → `0.003035269835488375`
    (`test/srgb-transfer-darkband.test.ts`).
  - `gamut.ts`'s inline `srgbToLinear` twin **DELETED** (DRY; `transfer.ts` is a 0-import leaf —
    the "circular dep" justification was stale). `gamut.ts` now imports the single canonical
    transfer.
  - **Regoldened fixtures: NONE.** The existing boundary goldens never sample ≤10/255; the cure
    adds NEW hand-computed dark-band goldens + a non-circular self-inverse roundtrip test
    (identity as oracle) instead of moving any fixture. The okhsl dodged dark+saturated corner is
    **reinstated** — the transfer pair is now mutually invertible across that band.

### LIBRARY — additive API (the S perceptual slate)

- **ICtCp perceptual transforms** (Q9) — the BT.2100/BT.2124 `xyzToICtCp` / `ictcpToXYZ`
  conversion pair (the matrix math already ships inside `deltaEITP`) + independent-oracle
  roundtrip goldens (`test/color-difference.test.ts`).
  - **CORRECTED (record-honesty patch, see [3.1.0]):** 3.0.0 shipped the **conversion pair
    ONLY**. The original entry claimed "full space class + parsing + `color2()` dispatch +
    `color2Into` currency" — that was **false**: the `ICtCpColor` subclass, the dispatch arm, the
    parsing, and the `color2Into` currency did **not** land in 3.0.0 and were caught FAILING the
    S.W1 11-row gate (rows 5+7). The full space was completed and published at **[3.1.0]**.
- **Jzazbz perceptual transforms** (Q9 widening, W1-11) — the NET-NEW PQ-variant `xyzToJzazbz` /
  `jzazbzToXYZ` conversion pair (Safdar 2017; its own PQ exponent set) + independent-oracle
  goldens (`test/color-jzazbz.test.ts`).
  - **CORRECTED (same patch):** 3.0.0 shipped the **conversion pair ONLY**; the `JzazbzColor`
    space class + dispatch + parsing + `color2Into` currency were completed at **[3.1.0]**.
- **Raytrace gamut map** (R-4 DISCHARGED, W1-10) — `units/color/gamut-raytrace.ts`, the
  exact-boundary reference; tested against the Ottosson analytical mapper as the ORACLE
  (agreement within stated tolerance on the shared domain; the divergences documented — that they
  exist is the point).
- **`sampleOKLChSliceBoundary(hue, columns)`** — the L×C sRGB cusp polyline (downstream never
  re-derives gamut geometry).
- **`resolveEasing(string → TimingFunction)`** — the canonical string→easing resolver the
  constellation can converge on (the KF courtesy note records the home).
- **`safeAccentCssString`** — gamut-guarded accent stringification (retires the demo's hand-denorm
  blocks; W2-2 consumes it).

### LIBRARY — parsing P0s + value hygiene

- `round()` optional-strategy no longer crashes on spec-legal CSS (W1-2; the carve-around test
  comment retired).
- `extractStyleRules` / `extractAnimationOptions` now **DEPTH-WALK** container at-rules
  (@media / @layer / @container / @supports / @scope / @starting-style) + CSS-Nesting child rules
  — previously they returned only top-level rules and silently DROPPED nested ones (W1-3). A
  behavior-observable bugfix: consumers relying on top-level-only results now also receive the
  nested rules.
- `fail(message)` reaches `mergeErrorState` (3 authored messages were discarded) + `.eof()` swap
  in `stylesheet.ts` (W1-4).
- All **7 unbounded memoize caches** now carry a `maxCacheSize` bound (the code-provable
  drag-time memory-growth vector) (W1-5).
- `reverseCSSIterationCount` wired to its inline twin (dead export kept, now live) ·
  `unpackMatrixValues` 2D-branch fix (a planar `matrix()` now returns 0 for the two out-of-plane
  rotations, was nonsense atan2-derived) · `ch`-unit explicit `getContext` null-narrow (kills the
  masking catch) · `flattenObject` O(N²)→O(N) · `toFixed` trailing-zero consistency · vh/cqw
  docstring truth (W1-7).

### LIBRARY — structural (god-module round, cohesion-driven — no LoC-chop splits)

- `color/index.ts` 968 → **71-LoC barrel**: `Color` base → `base.ts`, the 15 space subclasses →
  `spaces.ts`, apply-path serializers → `serialize.ts`.
- `units/constants.ts` → `STYLE_NAMES` data table lifted to `units/style-names.ts`;
  `color/constants.ts` → `COLOR_NAMES` lifted to `color/color-names.ts` (both back to their
  definition cores).
- `units/utils.ts` → DOM/layout unit resolvers to `units/dom-metrics.ts`; `units/normalize.ts` →
  layout-epoch cache to `units/layout-cache.ts` (the one documented `as unknown as` travels with
  it; `src/` stays at 8, CLAUDE.md's regenerable count).
- 7 hand-rolled scanners consolidated onto one shared balanced-text primitive in `parsing/utils.ts`.
- `stylesheet.ts` / `color.ts` recursive-grammar spines: AST + separable leaves lifted
  (`stylesheet-types.ts`, `color-unit.ts`, `relative-color.ts`), the mutually-recursive cores
  **deliberately stopped short** (cap-check ledger rows recorded, not silently missed).
- `dispatch.ts` comment-diet (NO structural split — cohesive runtime).

### Cross-repo (dispatched inside the cut)

- **parse-that PT-E** ask letter (`docs/tranches/S/letters/PARSE-THAT-PT-E.md`): scoped per-parse
  diagnostics (HIGH) · combinator-inference tightening (MED) · Pratt-stays-dormant on the record.
- **keyframes.js courtesy note** (`docs/tranches/S/letters/KF-COURTESY.md`): the canonical
  `resolveEasing` home.

### Deliberately NOT done (recorded)

R-8 gamut-relative spaces (KILLED) · sibling-index/count · device-cmyk · ICC · R-7 HCT/CAM16 ·
the Pratt calc() 2-tier transposition (KEEP-DORMANT — not pulled forward).

## [2.0.1] — 2026-07-04 (the parse-that `^1.0.0` re-pin — the booked post-R follow-on, kf-executed)

The R.md §4 book row ("parse-that `^1.0.0` re-pin", trigger: kf S.H4 publishes
the 1.0.0 cut) EXECUTED — by the keyframes.js S impl drive under its
owner-granted publish authorization, per this repo's own booked recipe (the
letter+book mechanism; the hand-back letter:
`docs/tranches/R/letters/KF-EXECUTED-THE-REPIN-2.0.1.md`). No surface change —
dependency-only.

- `@mkbabb/parse-that` `^0.13.0` → `^1.0.0` (the S.H1+S.H2 payload: the packrat
  `PACKRAT_ARMED` arming rides in transparently — KF-5's "transparent GC win";
  the `*Span` surface + `chainError` were deleted upstream).
- The WIDENED VERIFY, all green against the re-pinned build: span-absence
  (0 `*Span` consumers in src/), the `chainError` 0-caller scan (0 hits),
  the 4 live `.chain()` sites exercised through the FULL suite (58 files /
  1998 tests — `chain()`'s falsy-seed fix verified-not-assumed by the green
  run), `tsc` 0, `vite build` 0, `proof:css-parity` 0, and `color2Into`'s
  suite green (the kf fold-row-46 currency commitment holds).

## [2.0.0] — 2026-07-03 (R · the gamut + perceptual major — the R.W1 cut)

The one honest major of tranche R: every output-changing row bundled into a
single 2.0.0 (the keyframes-2.2.0 semver lesson applied — never dribble
output-changes across minors). Published `96f124d`, annotated tag `v2.0.0`,
`dist-tags.latest=2.0.0`; independent verifier 12/12; vitest 1996/1996 (56
files). The R corpus (`docs/tranches/R/`) is the authoritative record; this
entry is the CHANGELOG transcription the 2.0.1 hand-back letter explicitly left
to a successor tranche (S.W0 W0-5).

### LIBRARY — output-changing (the reason it is a major)

- **`GAMUT_ALPHA` 0.05 → 1.0** (`units/color/gamut.ts`) — the washed-out
  gamut-mapping cure (U10/Q7). Out-of-gamut colors now retain chroma: the oracle
  super-gamut pink `lab(92% 88.8 20)` maps to `rgb(255,167,180)` (39% chroma
  retention, hue-exact) instead of the prior desaturated wash. Every conversion
  through the gamut mapper shifts output for OOG inputs — the semver-major
  trigger. Tiered lightness guard (ΔL 0.0834 < 0.09).
- **ΔE-2000** (14 Sharma reference vectors) + **ΔE-ITP / ICtCp** (`difference.ts`)
  — new perceptual color-difference metrics.
- **OKHSL / OKHSV** color spaces (`okhsl.ts`, reusing the OKLab cusp math).
- **bezierPresets** tightened — smooth-step-3 exact; 15 presets re-fit (max
  deviation 0.0387).

### LIBRARY — additive API

- **Gamut-boundary sampler is now public**: `sampleGamutBoundary` /
  `sampleGamutBoundaryInto` + 4 types (`units/color/boundary.ts`), goldens locked
  @ 1e-3. Consumers get a registry export instead of forked math; the matrices
  stay package-internal (zero `.d.ts` leak).

### LIBRARY — grammar + internal

- **KF-1 grammar fix + rename** (`parseFunctionParameters`): the
  `@property`-descriptor parse now yields `{name, syntax, default}` (was the
  spec-violating `--x <length>: 0px` shape). This lets keyframes.js delete its
  `normalizeParam` / `NormalizedParam` / `VJS_PARAM_BUG_MAX` recovery shim and
  read the fields directly.
- **K-DISP decomposition** — `units/color/dispatch.ts` 760 → 522 LoC; the
  hue/mix cluster lifted to `mix.ts` (subpath barrels byte-identical).
- `/easing` 5-export stability guard; `extractFunctions` fresh-build `.d.ts` lock
  (`test/dts-published-surface.test.ts`).

### Cross-repo (dispatched inside the cut)

- keyframes.js KF-1 re-pin letter (kf `9a0f6cb`); fourier peer-floor note
  (fourier `cd26c65`).

## [1.2.0] — 2026-06-23 (Q · the perf + grammar + provenance minor — VJ-Q2…Q9)

The keyframes.js **Tranche Q** dispatch's 1.2.0 family (`KF-TO-VALUEJS-Q.md`):
the perf color-arch out-param family, two grammar arms, the `clone()`-stable leaf
provenance, the `/math` subpath contract hold, the SoA color-channel layout, and
the serialization-fidelity fix. All BC-additive. Every item carries a born-RED
gate verified to bite the unfixed tree.

### LIBRARY — perf (color-arch out-params)

- **VJ-Q2 — the egress-converter OUT-PARAM family** (`conversions/xyz-extended.ts`
  + `units/color/dispatch.ts`). `xyz2rgbFamilyInto` + the per-space `*Into`
  companions (`xyz2displayP3Into` / `xyz2rec2020Into` / `xyz2adobeRgbInto` /
  `xyz2linearSrgbInto` / `xyz2proPhotoInto`), routed by a `getXyzFromIntoFn`
  registry, write the egress channels DIRECTLY into `color2Into`'s caller-owned
  `out` scratch via `transformMat3Into` + `setChannel` — eliminating the ~28
  per-step `new <Space>Color(...)` wrappers the gamut bisection discarded. S2
  additionally seeds the bisection egress from a per-space module scratch (reused
  across calls). The wide-gamut `gamutMap(display-p3 OOG)` hot path drops
  **37 → 9 allocs/call** (MEASURED), bit-identical output (the DROPPED VJ-P1
  second half, redressed under no-deferral). Gate: `proof:gamut-alloc`
  (`N_TARGET` re-baselined 40 → 11).
- **VJ-Q3 — `mixColorsInto` + `sampleColorRampAt` + the structural clone.**
  `mixColorsInto` (`dispatch.ts`) writes channels via `setChannel` into a
  caller-owned `out`, killing `mixColors`'s `resultComponents` array + the
  `keys.filter()` array + the variadic-spread ctor deopt (bit-exact).
  `sampleColorRampAt(from, to, t, opts)` (`mix.ts`) is the array-free single-`t`
  sibling of `sampleColorRamp` — bit-exact to the indexed stop
  (`sampleColorRampAt(a,b,i/(n-1)) === sampleColorRamp(a,b,n)[i]`), so consumers
  hoist the ramp out of an inner loop. The `clone()` util (`src/utils.ts`) drops
  the `Object.entries().map().reduce()` three-array-per-level form for a direct
  `for…in` structural copy. Gate: `proof:color-arch-q` C1/C2.

### LIBRARY — grammar

- **VJ-Q6 — the dashed-function CALL arm.** `--ident(args)` parses to
  `FunctionValue('--ident', [args])` (`parsing/utils.ts scanDashedIdentFast` +
  `dashedIdentifier`; wired into the `-` dispatch bucket in `parsing/index.ts`).
  1.1.0 dropped it to a verbatim string because `scanIdentFast` rejects the
  second dash; the new scanner accepts the `--`-prefixed custom-function ident.
  Plus the **`<syntax>` validator** (`parsing/syntax.ts`: `validateSyntax`,
  `coerceToSyntax`, `parseSyntaxDescriptor`) — value.js's CSS Properties & Values
  L1 component-type checker is now exposed on the resolve path for the CSS
  Functions & Mixins L1 typed-arg coercion (the consumer inlines call args through
  it, not a re-authored checker). Gate: `proof:grammar-q` C1–C3.
- **VJ-Q7 — `if()` multibranch.** `handleIf` emits the FULL ordered clause list
  (`splitIfClauses` already computed it) as a flat
  `[condition, value, condition, value, …, elseValue]` pair list — NOT the prior
  lossy first-consequent + first-else collapse (which dropped every middle
  branch). The `FunctionValue.toString()` `if` serializer generalizes to the
  N-branch `<cond>: <value>; …; else: <value>` form (round-trip stable). The
  common 2-branch form is byte-identical to the prior 3-slot shape. Gate:
  `proof:grammar-q` C4/C5.

### LIBRARY — provenance + layout

- **VJ-Q4 — `flatLeaf .fnName`.** A 7th optional ctor field `fnName?: string` on
  `ValueUnit`, preserved by `clone()` + `coalesce`, stamped by `flattenObject`
  from the enclosing `FunctionValue.name`. The `clone()`-stable function-name
  carrier that retires the keyframes.js S8 WeakMap `FN_NAME_MAP` + clone-restamp
  ceremony (the consumer reads `u.fnName` directly). `subProperty` could not
  double as the carrier (clobbered by `parseCSSSubValue`). Gate:
  `proof:color-arch-q` C3.
- **VJ-Q8 — the `ColorChannelPlan` SoA layout** (NEW `units/color-soa.ts`,
  MEASURE-FIRST → **BUILD**). `buildColorChannelPlan` (a reusable `(Color →
  channel offsets)` Float64 oklab/oklch layout) + `packColorChannels` +
  `lerpColorChannels` (a closure-free buffer fold, hue slot routed through
  `interpolateHue`) — the layout the keyframes.js SoA compositor folds the boxed
  color tail through. value.js-side measure (`bench/color-soa-fold.mjs`): the
  Float64 fold is ~5× faster than the boxed per-element `Color` lerp over K=64
  leaves; bit-exact to it (the kf-side Amdahl authorization is the consumer's
  grounding gate). The internal per-iv interpolation cache was renamed
  `ColorChannelPlan → ColorInterpPlan` to free the public name. Gate:
  `proof:color-arch-q` C4.

### LIBRARY — serialization fidelity

- **VJ-Q9 — none-channel + `color()`-wrapper round-trip** (`units/color/index.ts`).
  S1: `Color.toString()` now coerces each channel via `Number(v)` before the NaN
  check, so a powerless `none` channel held as `ValueUnit<NaN>` serializes as
  `none`, not `NaN` (`oklch(0.6 none 200)` round-trips verbatim). S2: `formatColor`
  honors `COLOR_FUNCTION_FORM` to emit the CSS-valid `color(<space> …)` wrapper for
  the predefined `color()` spaces (display-p3 / rec2020 / a98-rgb / prophoto-rgb /
  srgb-linear / xyz) — the bare `display-p3(…)` form was invalid CSS and dropped
  the wrapper on round-trip. Gate: `proof:serialize-fidelity`. (The
  `color-classes`/`parser-snapshot` corpus that codified the bare form was updated
  to the round-trip-faithful wrapper form.)

### LIBRARY — contract hold

- **VJ-Q5 — the `/math` subpath stays `parse-that`-free across 1.2.0.** Confirmed
  via the existing `proof:subpath-budget` (C8 — the math chunk is parse-that-free)
  + `proof:subpath-resolve` (R4 — `@mkbabb/value.js/math` resolves
  `lerp`/`clamp`/`scale`); the built `math.js` imports ONE `math-*.js` chunk (zero
  grammar, zero parse-that). A contract hold, not a new build.

### GATES

- New: `proof:serialize-fidelity` (VJ-Q9), `proof:grammar-q` (VJ-Q6 + VJ-Q7),
  `proof:color-arch-q` (VJ-Q3 + VJ-Q4 + VJ-Q8) — wired to `npm run proof:*`.
  `proof:gamut-alloc` `N_TARGET` re-baselined to the measured VJ-Q2 residual.
  `bench/color-soa-fold.mjs` added to `npm run bench`.

## [1.1.1] — 2026-06-23 (Q · VJ-Q1 — the `contrast-color()` library-LEADS catch-up)

The ONE platform-parity gap the keyframes.js **Tranche Q** dispatch
(`KF-TO-VALUEJS-Q.md`, VJ-Q1) named: `contrast-color()` was the FIRST CSS feature
value.js trailed the platform on (Baseline April 2026), inverting the
library-LEADS precept. This PATCH closes it. parse-that re-pinned `^0.13.0`
(transparent — the deleted `thenMap`/`fuse` had zero value.js consumers; the full
suite stays green).

### LIBRARY

- **VJ-Q1 — `contrast-color(<color>)` (CSS Color L7) eager evaluation**
  (`src/units/color/contrast.ts`, re-exported from `src/index.ts` +
  `src/units/color/index.ts`; the parser arm in `src/parsing/color.ts`). A NET-NEW
  WCAG 2.x leaf — `wcagRelativeLuminance(color)` (the linear-light sRGB luminance
  `0.2126·R + 0.7152·G + 0.0722·B`, computed via `color2(color, "srgb-linear")` so
  the cross-space transform AND the gamma decode are one step) + `wcagContrastRatio(a, b)`
  (`(L1 + 0.05) / (L2 + 0.05)`, range [1, 21]) + `contrastColor(color)` (the
  maximally-contrasting black/white). This is DISTINCT from the OKLab-lightness
  `computeSafeAccent`/`safeAccentColor` accent helpers — the WCAG metric picks a
  different endpoint near the contrast boundary (a `#767676` mid-gray resolves to
  black under WCAG; the OKLab-L metric would mispick). The leaf accepts a
  PUBLIC-domain `Color` (RGB in [0,255], as `new RGBColor(255,…)` / `parseCSSColor`
  produce) and normalizes internally. The `contrast-color()` parse arm joins the
  `c` color-dispatch bucket and resolves EAGERLY to ONE concrete `Color` (mirroring
  the `color-mix()` combinator), so `parseCSSValue('contrast-color(red)')` is now a
  `Color` (`rgb(0 0 0)`), NOT the opaque `FunctionValue` it was at 1.1.0. kf inherits
  the resolved color transparently under its existing `^1.1.0` caret.

### NO-LEGACY

- **The dead CSS Color L6 `color-contrast(... vs ...)` grammar stub** was retired
  from `src/parsing/grammars/css-color.bbnf` (the never-shipped L6 `colorContrast`
  rule + its dangling `color` rule reference), replaced by the `contrastColor` L7
  rule. The `.bbnf` is a documentation grammar (the live parser is hand-rolled
  combinators), so the delete is parse-path-inert; only the new L7 arm changes
  behavior.

### GATE

- **`proof:contrast-color`** (NEW, born-RED — `scripts/proof-contrast-color.mjs`,
  wired to `npm run proof:contrast-color`). Exercises the BUILT `dist/value.js`:
  C1 the born-RED witness (`contrast-color(red)` is a concrete `Color`, not an
  opaque `FunctionValue`), C2 the WCAG endpoint picks (DISTINCT from the OKLab-L
  metric at the `#767676` crossover), C3 the WCAG leaf math (L(white)=1, L(black)=0,
  ratio=21), C4 the dead L6 stub is gone. Verified RED on the unfixed tree
  (plant-a-failure: reverting the L7 arm re-opaques the value + restores the stub →
  C1/C2/C4 red).

## [0.13.0] — 2026-06-16 (N · the kf-K-dispatched grammar fold — N.W11.D + N.W11′)

The two net-new grammars the keyframes.js-K frontier dispatched (`GRAMMAR-FOLD.md`,
ratified 2026-06-15), shipped jointly in the N R2 library track. Both were
born-RED at 0.12.0 (the symbols were absent across `src/` and `dist/`); they
resolve and their gate laws hold at this cut. Library-only — zero demo coupling,
zero glass-ui BA gate.

### LIBRARY

- **N.W11.D — `sampleColorRamp(from, to, n, opts)`** (`src/units/color/mix.ts`,
  re-exported `src/index.ts`). The INVERSE SIBLING of `mixColorsN`: where
  `mixColorsN` folds N colors → 1, `sampleColorRamp` expands 2 colors → N
  evenly-spaced perceptual stops. A COMPOSITION over the already-shipped color
  kernels — `mixColors` (the per-step perceptual lerp; premultiplied alpha, NaN
  propagation, and the cylindrical `hueMethod` hue path all inherited) +
  `gamutMap`/`gamutMapOKLab` (the per-stop sRGB egress, so no stop silently
  clips). ZERO new color science. The `space` conversion is HOISTED out of the
  per-stop loop (the ramp pays it 2×, not 2n×). `SampleRampOptions`:
  `{ space?, hueMethod?, endpoints?: "inclusive"|"exclusive", gamutMap? }`;
  `n ≥ 2` (throws otherwise, mirroring `mixColorsN`'s empty-input throw).
  Oracle suite (`test/color-ramp.test.ts`, 13 tests): monotone deltaEOK spacing
  (every step within ±20% of the mean), in-gamut egress at every stop (incl.
  out-of-gamut endpoints), hue-method fidelity (`"longer"` traverses the long
  arc; `"shorter"` does not — the path bare two-stop `@keyframes` cannot encode),
  and identity-exact inclusive endpoints. Un-blocks kf-K.W10's CC-2 oklab
  densify (`proof:compile-replay-equal` clause (d)).
- **N.W11′ — the `CSSTimelineOptions` scroll-VALUE grammar** (NEW
  `src/parsing/scroll-timeline.ts`, re-exported `src/index.ts`). The ONE genuine
  net-new grammar of N: a typed parser + inverse serializer over the
  `animation-timeline` / `animation-range` (+ `-start`/`-end`) / `timeline-scope`
  property values (plus the forward-looking `animation-trigger` sub-item),
  authored in the `parsing/easing.ts` parser-combinator idiom beside
  `parsing/extract.ts`. The division-of-labour law is held verbatim — the parser
  emits the typed options AS-WRITTEN (the named-timeline ref as a `<dashed-ident>`
  string, `auto`/`none` as themselves, the range-phase keyword + the
  `<length-percentage>` offset verbatim); it resolves no DOM defaults and no px
  offsets (that is the kf `ScrollScene` driver's job — value.js owns VALUES, kf
  owns TIME). Public surface: `parseAnimationTimeline` / `parseAnimationRange` /
  `parseAnimationRangeBoundary` / `parseTimelineScope` / `parseAnimationTrigger`
  + `extractTimelineOptions` (the stylesheet-aggregate, mirror of
  `extractAnimationOptions`) + `serializeAnimationTimeline` /
  `serializeAnimationRange` / `serializeTimelineScope` / `serializeAnimationTrigger`
  / `serializeTimelineOptions` (the inverse, mirror of `reverseAnimationShorthand`)
  + the typed value families (`CSSTimelineOptions`, `AnimationTimelineValue`,
  `AnimationRangeValue`, `AnimationTriggerValue`, `RangeBoundary`, `RangePhase`,
  `ViewInset`, `TimelineScopeValue`, `ScrollerKeyword`, `TimelineAxis`,
  `TriggerType`). The round-trip law `serialize(parse(s)) === s` (canonical form)
  is the gate core (`test/scroll-timeline.test.ts`, 55 tests). Fail-loud rides
  the shipped `tryParse` + `OnParseError`/`ParseDiagnostic` sink (N.W7). The
  order-free `[<axis> || <scroller>]` pair (the one combinator `easing.ts` has no
  precedent for) is parsed token-then-classify and canonicalizes to
  `<scroller> <axis>`. Un-blocks kf-K.W9's scroll-as-CSS parse round-trip
  (`proof:scroll-roundtrip` clause (b)).

### INTERNAL

- **`splitTopLevelCommas` promoted to `parsing/utils.ts`** (N.W11′ D2) — the
  paren/string-aware top-level `#`-list splitter, formerly local to
  `parsing/animation-shorthand.ts`, is now a shared export consumed by both the
  `animation` shorthand splitter and the scroll-timeline `#`-list grammars. Pure
  move, no behavior change (the 25 `parsing-animation-shorthand` tests stay green).

### NOTES (value.js stylesheet-parser limitations surfaced, not in scope to fix here)

- The stylesheet parser comma-joins function args (a `scroll(root block)`
  declaration value round-trips through `Declaration.value.toString()` as
  `scroll(root, block)`); `extractTimelineOptions` tolerates the comma form.
- A property-level `#`-list declaration value (`timeline-scope: --a, --b`) is
  truncated to its first segment by the stylesheet parser's `ValueArray`. The
  per-property `parseTimelineScope` handles the FULL comma-list correctly (it is
  the primitive kf-K.W9 consumes for a single declaration string); the aggregate
  extractor gets what the stylesheet preserves.

### Stats

- vitest: **1777** (was 1584 at H close; +68 from the two new oracle suites —
  `color-ramp.test.ts` 13, `scroll-timeline.test.ts` 55 — plus the 0.11/0.12
  growth between cuts). 43 test files.
- vue-tsc: 0 errors (`tsconfig.lib.json`).
- `dist/value.js`: 145,809 B (≤ 148,480 B ceiling).
- Born-RED probes inverted: `grep -rc sampleColorRamp src/ dist/` and
  `grep -rscE "CSSTimelineOptions|parseAnimationTimeline" src/` now nonzero
  (both were ZERO at 0.12.0); all 24 new symbols (12 functions + 12 types)
  present in `dist/value.js` + the `dist/index.d.ts` roll-up.

## [0.12.0] — 2026-06 (N.W7 library wave)

- N.W7 library wave: 11 keyframes.js next-slice items, parse-that `^0.9`, the
  Prettier eviction, `parseCSSColor` root typing; the structured
  `ParseDiagnostic`/`OnParseError` diagnostics sink. (Released at commit
  `3f4f0ed`; the CHANGELOG entry is reconstructed here from the release commit.)

## [0.11.2] — 2026-06 (Tranche I dependency)

- `parseCSSValueUnit` empty-input contract (the keyframes.js Tranche I B1
  dependency). (Released at commit `0cb5dd2`.)

## [0.11.0] — 2026-06 (Tranche F hand-off)

- The Tranche F performance hand-off: A2 maximal-munch unit classifier, the
  computed-unit endpoint cache, the SoA `lerpArray` primitive, the frozen
  color-channel plan (B3/B5), `formatColor` alpha-clause omission (B1b), the
  O(1) first-char `dispatch()` color fork (A1), and the relative-length
  no-op resolution (C5). (Released at commit `e8cc1fb`.)

## [0.10.0] — 2026-05-26 (H close)

### INTERNAL

- **H1 — Cascade-correctness completion**. Cross-collection write sites wrapped in `services.withTransaction(...)` expanded **9 → 16** at H.W1. Lane A repaired the H-AUDIT-6 §3 defect (`createPalette` + `patchPalette` previously wrote across `palettes` + `palette_versions` without a transaction — orphan-version exposure class). The in-wave Lane A.2 extension (per F1 "no deferrals" + H1 maximalist invariant text) added 7 admin-tree wraps: `registerSession`, `loginSession`, admin-variant `deletePalette`, `setUserStatus`, `deleteUserPalettes`, `pruneEmptyUsers`, `deleteTag`. 9 new rollback tests (api vitest 106 → 115). Standing reference `docs/tranches/H/audit/api-withTransaction-coverage.md` enumerates every cross-collection site + its session status — the H1 invariant codifier.
- **H2 — `as unknown as` corpus retired 4 → 2** in `src/`. Lane A: typed `XyzFunctionsTable` mapped-type at `units/color/dispatch.ts` (mirrors G.W2 Lane B's `DirectPathsTable` precedent). Lane C: type-predicate `isColorValueUnit` at `units/normalize.ts:319` (also removed a dead-helper double-discriminant check). The 2 residual sites are policy-documented irreducibles (`normalize.ts:117` DOM `CSSStyleDeclaration`; `parsing/color.ts:59` clone-reinterpret). Codified by NEW `proof:as-unknown-as-budget` script (budget = 2 — tightened from plan's 3 per the cleaner-than-anticipated outcome).
- **H3 — No `demo/` god module**. Every `demo/` file (excluding `demo/@/components/ui/` shadcn-vue) is now ≤ 400 LoC. Lane A decomposed `demo/@/lib/palette/api.ts` (484 LoC, 13 sections) → 9 cohesion-honest modules under `api/` (max 110 LoC), with the old `api.ts` DELETED (no shim — directory-as-module resolution). Lane B decomposed `PointerDebugOverlay.vue` (449 → 286) via `DebugEventLog.vue` sub-component lift + `usePointerDebug` composable extraction, and `PaletteCard.vue` (435 → 388) via `PaletteCardSwatches.vue` sub-component lift. Lane C lifted the pure-data `colorSpaceInfo` (291 LoC) out of `color-picker/index.ts` (376 → 99); zero consumer impact (barrel re-export).
- **H4 — Cross-tree invariant codification**. Three proof-script scope extensions land: `proof:no-ts-ignore` extended `src/` → `src/ + demo/` (with `--exclude-dir=ui` for vendored shadcn); `proof:no-bare-builtins` extended `api/src/` → `api/src/ + plugins/ + scripts/ + bench/`; NEW `proof:as-unknown-as-budget`. Demo `@ts-ignore` retired (2 sites in `useMarkdownHighlighting.ts` via `declare module "*.css?inline"` in `demo/color-picker/vite.d.ts`). `plugins/vite-source-export.ts` `from "fs"` → `from "node:fs"` outlier fixed. **All 9 proof scripts now run at their full applicability.**
- **api/tsconfig.json lifted to root strictness** at H.W1 Lane B — 4 missing flags added (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`). 36 surfaced errors repaired genuinely (zero `@ts-ignore`, zero `as any`, zero `as unknown as` added). Incidental: latent duplicate `PaletteColor` interface in `api/src/hash.ts` unified to canonical `models.ts` source-of-truth.
- **Rolldown `//#region` markers stripped** from `dist/value.js` via `vite.config.ts` `rolldownOptions.experimental.attachDebugInfo: "none"` (scoped to production only). `dist/value.js` 125,496 B (G close) → **124,130 B** (−1,366 B). 4× the H-SEED ~314 B estimate. Bench gates all GREEN (L8 ≥ 5×, DIRECT_PATHS HSL→RGB ≥ 2×, nameParser ≥ 5×).
- **Bench provenance hygiene**: 7 line-number references in `bench/color2-direct-paths.mjs` + `bench/parser-namelookup.mjs` repointed from `file:NNN` to `file: <SYMBOL>` (drift-resistant; line numbers churn on every refactor).
- **E2E reactivity-instant flake mitigation**: `e2e/smoke/reactivity-instant.spec.ts` had TWO 200ms `waitForFunction` double-duty timeouts (the cited slider-keyboard at :198 AND a discovered symmetric spectrum-drag at :95). Outer "alive?" budget widened 200 → 2000ms; perceptual gates (50ms spectrum, 100ms slider) UNCHANGED.
- **CONTRIBUTING.md + NEW docs/RELEASE.md**: the manual tranche-close publish ceremony is now codified (6 sections — prerequisites, pre-merge gate matrix, ceremony, rollback, cross-repo consumption, authority). NO automation (no `.github/workflows/release.yml`) — manual ceremony preserved per H-AUDIT-6 §3.4 Option (a).

### DEPS

- No dependency drift in H.

### Stats

- vitest: 1584 / 34 (unchanged from G close).
- api vitest: 115 / 22 (+9 new H.W1 rollback tests; was 106 / 21).
- e2e specs: 36 (unchanged from G close).
- 9 proof scripts (was 8 at G close; +1 from H.W2 Lane B `proof:as-unknown-as-budget`; 2 scope-extended at H.W3 Lanes D+E).
- vue-tsc: 0 errors.
- `dist/value.js`: 124,130 B (−1,366 B from G close's 125,496 B; ≤ 148,480 B ceiling).
- `as any` in src/: 0 (unchanged).
- `as unknown as` in src/: 2 (was 4 at H open; both irreducible per H2 policy).
- `@ts-ignore` / `@deprecated`: 0 (unchanged).
- `withTransaction` sites in api/: 16 (was 7 at G close).

## [0.9.0] — 2026-05-22 (G close)

### INTERNAL

- **`src/units/color/utils.ts` (1,430-LoC god-module) decomposed** into 9 focused modules ≤ 350 LoC each — a `conversions/` cluster (`hex`, `kelvin`, `cylindrical`, `lab`, `oklab`, `transfer`, `xyz-extended`, `direct`) + `dispatch.ts`. The barrel re-exports every public name; no consumer-visible change.
- **`as any` corpus in `src/` retired 35 → 0** via 4 typed-wrapper transpositions: a typed `getColorSpaceBound`, a typed `DIRECT_PATHS` mapped-type, a typed `Color<T>` channel accessor (`channelOf`/`setChannel`), and the `ValueUnit.unwrapDeep()` static (which codifies the Mar-2026 iOS-Safari nesting fix). Zero cast-laundering — every retirement is a genuine, correct type. The `Color<T>` channel-accessor change ran a BREAKING-decision protocol and resolved INTERNAL (the `[key: string]: any` index signature is structurally retained; the public typed `.l`/`.c`/`.r` API is unchanged).
- **6 invariant proof scripts codified** — `proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`, `proof:no-bare-builtins` — plus a `types`-key existence probe added to `proof:resolution`. All wired into CI post-build.
- **api/**: `withTransaction` expanded from 3 to 7 cross-collection write sites (`deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`) with rollback tests; `engines.node` `">=22"` declared.
- **CI**: the CHANGELOG-changed gate base-ref defect fixed (it referenced `origin/main` and was INERT since F.W3); an `npm pack --dry-run` publish-shape step added; `scripts/migrate-*.mjs` added to `package.json files:` so the published lerp codemod is discoverable by npm consumers.
- **demo/**: glass-ui's `useBreakpoint` composable adopted at 4 sites (retiring hand-rolled `matchMedia` patterns); PaletteSlugBar hand-rolled buttons migrated to glass-ui `<Button>`.
- 1 mobile-walk Playwright spec added (e2e 35 → 36 specs).

### DEPS

- No dependency drift in G.

## [0.8.0] — 2026-05-21 (F close)

### BREAKING

- **Removed `lerpLegacy`**. The legacy `lerp(t, a, b)` argument ordering was deprecated in v0.7.0 (canonical `lerp(a, b, t)` introduced at D.W3 Lane C); migration is now mandatory. Consumers using `lerpLegacy` must migrate to `lerp(a, b, t)`. Value.js's published codemod (`scripts/migrate-keyframes-js-lerp.mjs`) handles the keyframes.js-shape migration; manual migration is straightforward for other consumers (swap the first argument with the last two).

### INTERNAL

- W8–W12 consumer LOCKSTEP back-reference doc authored at `docs/tranches/F/W8-W12-consumer-lockstep.md` per F4 invariant.
- gh-pages chronic closed: 2 dock-menu Github icon refs migrated to inline SVG following W9-C's @lucide/vue rename punt.
- 3 post-W12 transpositions: typed `Memoized<T>` shape retires the sole `@ts-ignore` in src/; Rolldown declarative `codeSplitting` adopted; 29 zero-consumer shadcn-vue subdirs swept (165 → 22 files, −588 KiB).
- 5 CI hygiene gates: CHANGELOG-changed gate broadened; vue-tsc baseline lowered to 0; dts-shape invariant guard (`scripts/proof-dts-layout.mjs`); `dist/value.js` bundle-size gate (≤ 145 KB raw); (optional) proof:resolution types-key probe.
- keyframes.js cross-repo write: applied published lerp codemod against the keyframes.js sibling repo (HEAD `470814e`) per F3 invariant (LOCAL-ONLY commit; user-discretionary push).

### DEFERRED → ZERO (per F1)

- All E5 inherited deferrals either landed in F or carry sharpened (c) triggers in `coordination/Q.md`. Standing peer-authorship asks (7 glass-ui primitive asks; contract-v2 §2.1 font-asset residual; keyframes.js precept-pin drift) carry forward with sharpened TIME-BOUND (c) triggers per F1 invariant.

### DEPS

- (No dep drift in F; the W8–W12 lockstep dep-lift happened pre-F open on master `47399c2..e1549e0` — see `docs/tranches/F/W8-W12-consumer-lockstep.md`.)

## [0.7.0] — 2026-05-20 (E close)

### BREAKING

- 51 internal `<from>2<to>` color-conversion functions removed from the main barrel (`src/index.ts`). The public surface is `color2(value, "from", "to")` + `colorUnit2`. The 51 individual functions remain available internally (still imported by `color2`'s dispatch table) but are no longer part of `@mkbabb/value.js`'s exported API. **Migration**: replace direct `import { rgb2hsl } from "@mkbabb/value.js"` with `color2(rgb, "rgb", "hsl")`.
- Dead exports removed: `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`. **Migration**: consumers must declare their own constants if needed.
- `vue-router` moved from `dependencies` to `devDependencies` — the library does not consume vue-router; the demo does. **No consumer migration** unless an external consumer was relying on vue-router being transitively installed via `@mkbabb/value.js`.

### DEFERRED (not in v0.7.0)

- `lerpLegacy` removal — deferred until keyframes.js's `file:`-linked consumer migrates the single call site at `keyframes.js/src/animation/numeric.ts:159`. See `docs/tranches/E/coordination/Q.md §5` for the migration diff + E5 retirement trigger.

### FEATURES

- **`tryParse` error messages now include a 16-char context window** around the failure offset (`src/parsing/utils.ts`). Errors read `Parse error at offset N: "...<context>..."` instead of just an offset; diagnostics improve substantially when tracking down parse failures in user-supplied CSS. (E.W1 Lane D)

### PERFORMANCE

- **152-branch color-name parser → broad-regex + Set-lookup** (`src/parsing/color.ts`). The named-color lookup (`rebeccapurple`, `red`, the 147 CSS named colors + the kelvin lookup family + 8 custom registrations) is now O(1) Set.has() instead of 152 sequential `any(istring(...))` regex tests. **Median 37× speedup** on the lookup hot path (`bench/parser-namelookup.mjs`). The constructed Set is built once at module init. (E.W1 Lane D)
- **`memoize` `keyFn: (s) => s` override** at 7 single-string-input parser sites (`parseCSSValue`, `parseCSSColor`, `parseAnimationShorthand`, `parseCSSStylesheet`, `parseCSSTime`, `parseCSSPercent`, etc.). Identity key replaces `JSON.stringify(args)` — both faster and clearer about the cache shape. (E.W1 Lane D)

### SUBTLE BEHAVIORAL CHANGE

- **Color-name parser is now STRICT-NO-PREFIX-MATCH.** Pre-v0.7.0, parsing `"redwood"` would consume `"red"` and leave `"wood"` as residual input (a partial-match artefact of the 152-branch `any(istring(...))` shape). Post-v0.7.0, the broad-regex + Set-lookup parser parses the full identifier `"redwood"` and rejects it (not a known color name). For any CSS context where a color-name parser is the leaf of a longer grammar production, the parser composition (e.g., `colorParser.or(genericValueParser)`) still selects the right disjunct — this strictness change is only observable in standalone `parseCSSColor("redwood")` calls where the previous partial-match was effectively a misparse. All 1582 existing parser tests continue to pass; no real-world consumer relies on the pre-v0.7.0 partial-match semantics. (E.W1 Lane D)

### INTERNAL

- **`WhitePointColor<T>` intermediate class lifted into `Color<T>` base** (`src/units/color/index.ts`). Pre-v0.7.0 the inheritance graph was asymmetric: `OKLABColor extends WhitePointColor<T>` but `OKLCHColor extends Color<T>` directly — the same color family split across two inheritance levels. Post-v0.7.0 the `whitePoint` field lives on `Color<T>` base with a `"D65"` default; LAB and OKLAB override to `"D50"` in their constructors; XYZ inherits the default. `WhitePointColor<T>` was never exported from the barrel — no consumer migration required. L8 microbench held at 10.87× median (≥ 5× gate). (E.W1 Lane B)

### PERFORMANCE (continued)

- **`DIRECT_PATHS` table in `color2()` for hot-path conversions** (`src/units/color/utils.ts`). The 6-entry table covers `oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb` — the highest-frequency conversions per a typical app's render loop. Direct paths use Ottosson's LMS→linear-sRGB matrix (OKLab/OKLCh) or the well-known direct HSL↔RGB cylindrical conversion, skipping the XYZ hub entirely. `color2()` consults the table first; the existing XYZ-hub path remains the fallback. Bench: HSL→RGB **3.80×–4.40× speedup** (≥ 2× gate PASS); OKLab→RGB ~1.04× and OKLCh→RGB ~1.07× (smaller savings — dominated by the shared `linearToSrgb` transcendental + `gamutMap` cost; the saved matrix-multiply is real but a tiny fraction of total cost). 2 parser-snapshot tests updated for floating-point ε-equivalent values (delta ~3e-9 from the skipped matrix multiply). (E.W1 Lane C)
- **`rgbFamily2xyz` / `xyz2rgbFamily` extracted** (`src/units/color/utils.ts`). The 5 wide-gamut RGB-family classes (LinearSRGB, DisplayP3, AdobeRGB, ProPhotoRGB, Rec2020) share an identical matrix-multiply structure post-transfer-function; the helpers parameterize over the matrix. 8 of 10 family converters collapse to one-liners (ProPhoto's 2 cases keep the explicit D50 Bradford-adapt shape). (E.W1 Lane C)
- **`Color.keys()` cache via `static readonly channelKeysWithAlpha`** (`src/units/color/index.ts`). Pre-v0.7.0 `keys()` returned a new `[...channels, "alpha"]` array per call — a per-frame allocation source in `lerpColorValue`'s `forEach`. Post-v0.7.0 each subclass exposes a frozen static tuple; `keys()` returns the cached reference. 15 subclasses, 8 shared tuples (RGB/LinearSRGB/DisplayP3/AdobeRGB/ProPhoto/Rec2020 share `["r","g","b","alpha"]`; LAB/OKLAB share `["l","a","b","alpha"]`; LCH/OKLCH share `["l","c","h","alpha"]`). Zero per-call allocation. (E.W1 Lane C)

### INTERNAL

- **Type-tidy** (`src/units/normalize.ts` + `src/units/utils.ts`). 7 `as any` suppressions removed (2 in `normalize.ts` + 5 in `utils.ts`'s `getUnitGroup` chain, refactored as a table-driven sentinel-narrowing dispatch). Zero new suppressions introduced. (E.W1 Lane E)
- **`ch<T>` brand-eraser consolidated to `src/units/color/index.ts`** (alongside the `ColorChannel<T>` phantom brand). Pre-v0.7.0 the helper lived in two places — `utils.ts` AND `contrast.ts` — a D.W1 Lane L8 residual. Post-v0.7.0 there is exactly one canonical export; 2 consumers updated. (E.W1 Lane E)
- **CLAUDE.md drift-footgun cleanup** — 5 CLAUDE.md files (root + `src/units/` + `src/units/color/` + `src/parsing/` + `demo/`) had stale inline LoC counts that drifted across D + E waves. All inline counts STRIPPED with a `> LoC counts intentionally omitted — wc -l is the source of truth.` note. Missing file entries added (6 new entries across `src/units/color/` + `src/parsing/` for `contrast.ts`, `mix.ts`, `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`). Root CLAUDE.md's test/spec counts downgraded to ranges. Prevents re-drift across future tranches. (E.W1 Lane E)
- **`VENDOR-POLICY.md`** authored at repo root — formal policy for the 126-error `demo/@/components/ui/` shadcn-vue generated cluster. Decision: ACCEPT + DOCUMENT (Option 3). 94% of errors are TS2379 `exactOptionalPropertyTypes` regressions from reka-ui type version-skew (generator-noise, not authored-code defects). Lint + vitest + build are all GREEN; vue-tsc gate stays at 126 — any rise indicates either a new genuine error or a shadcn-vue regeneration drift. (E.W4 Lane C — closes B-01 + B-07 chronic ledger items.)
- **`scripts/migrate-keyframes-js-lerp.mjs`** authored (257 LoC) — idempotent codemod (`--dry-run`, parity-count assertion, `[unmatched]` refusal mode) for the keyframes.js `lerp(t,a,b) → lerp(a,b,t)` migration. Registered as `npm run codemod:keyframes-lerp`. Lane F's audit surfaced a SECOND silently-broken call site at `keyframes.js/src/animation/group.ts:251` beyond the originally-named `numeric.ts:159`; the codemod covers both. (E.W4 Lane F — `lerpLegacy` retirement deferred to the next tranche per the documented E5 trigger.)

## v0.6.0 — 2026-05-20

The first minor release since `v0.5.1`. Closes Tranche D (contract-v2 alignment + api/ refactor + frontend cohesion + library hardening + Playwright expansion). Also carries the work from Tranche A and Tranche B.

### BREAKING

- **`Color<T>` storage transposition** — color components are now own properties, not a `Map`. Read `color.L` instead of `color.components.get("L")`. The Map storage was a V8 hidden-class miss in every lerp hot path and a per-frame allocation source (`.keys()` / `.values()` / `.entries()`). Channel access is now monomorphic inline-cache friendly with a **median 10× speedup** (microbench `bench/color-channel-access.mjs`, 3-run close re-measure; range 10.02× to 10.67×). The flatten covers all 15 color-space classes; 45 channel-getter/setter pairs were deleted. (D.W1 Lane L8)
- **`AnimationOptions` rename** — `src/parsing/extract.ts` exported `AnimationOptions` (the CSS-shorthand-string type) renamed to `CSSAnimationOptions` to break the silent shadow with keyframes.js's same-named engine-options type. 14 internal sites updated; external consumers must rename imports. (D.W1 Lane L6 / `coordination/Q.md §9.5` — keyframes.js consumption update filed)
- **`package.json exports["."]` collapses to 3-key `{types, import, default}`** — the `development` condition is removed per contract-v2 (`docs/precepts@68d9b20`). Consumer dev tooling must resolve via the bundler default (Vite, esbuild, Rollup, etc.). (D.W1 Lane L1)

### FEATURES

- **`registerColorNames`, `clearCustomColorNames`, `getCustomColorNames`** exported from the barrel (G1 from B.W3 library-gap audit, ship-decided at D.W1 Lane L6).
- **`solveCubicBezierX`** exported from the barrel (G11 / K5 from B.W3 keyframes.js parity audit, ship-decided at D.W1 Lane L6).
- **`TimingFunction = (t: number) => number`** type alias exported from `src/easing.ts` and the barrel (canonical name for the easing function shape; consumers like keyframes.js can import the canonical name).
- **`parseCSSValue("inherit" | "unset" | "initial" | "revert")`** now correctly carries the `CSSWideKeyword` `superType` (was opaque-string before; L6 bug fix per CHALLENGE-Dm).
- **Case-insensitive color/math function names** — `RGB(...)` / `OKLCH(...)` / `CALC(...)` etc. now accepted per CSS Color L4 / CSS Values 4 ASCII case-insensitivity. (L7 bug fix per CHALLENGE-Dm)
- **`parseCSSColor` + `parseCSSValueUnit` memoized** with invalidation hooks — parity with the other parsers per the CLAUDE.md contract; cache invalidates on `registerColorNames` / `clearCustomColorNames`. (D.W3 Lane C L3 + L8)
- **`lerpColorValue` honours `hueMethod`** — cylindrical-space animations (oklch / hsl / lch) now interpolate via the requested method (default `shorter` per CSS Color 4 §12.4), not the long way round. `InterpolatedVar<T>` carries `hueMethod` + `colorSpace` through from `normalizeColorUnits`. Animation between `oklch(50% 0.2 350°) → oklch(50% 0.2 10°)` now goes 20° via 360→0, not 340° via 180°. (D.W3 Lane C L5 — 3-file fix)
- **`interpolate.ts` arg-order canonicalised** to `(a, b, t, opts?)` across `lerp` / `interpolateHue` / `slerp` family. `lerpLegacy(t, a, b)` aliased with `@deprecated` JSDoc + re-exported from the barrel for backward source-compat. (D.W3 Lane C L11)
- **`cssColorToRgb` memoised** in `useMetaballRenderer.ts:53` with 256-entry LRU cap — eliminates per-frame canvas `getImageData` + 3-element array allocation. (D.W3 Lane C — demo-side micro-fix)
- New **`build:watch`** script for fleet dev orchestration (`vite build --mode production --watch`).
- New **`proof:resolution`** script (ported from glass-ui `ce5aad8`) — verifies contract-v2 dev-resolution shape across the constellation.
- New **`lint`** script + eslint flat config (D.W1 L7) + CI step.

### INTERNAL

- `src/parsing/animation-shorthand.ts` / `extract.ts` / `serialize.ts` / `stylesheet.ts` and `src/units/interpolate.ts` are now tracked + tested (B.W3 committed the WIP; D.W1 Lane L7 added vitest specs).
- `evaluateSimpleCalc` routed through the existing calc AST evaluator — `new Function(...)` excised from `src/parsing/color.ts:78`; replaced with explicit `createCalcParser` + `evaluateMathFunction` pipeline. (`grep -rn 'new Function' src/parsing/` returns 0; D.W2 Lane D L4 — D6 invariant satisfaction)
- **Backend `api/` refactor** — service + repository + zod validation pipeline, fail-explicit migration, god modules split (`palettes.ts` 845 LoC → 5 concerns; `admin.ts` 750 LoC → 8 concerns). Cross-collection writes use idempotent-upsert + gated `$inc` (vote-toggle race fix). 9 typed repositories are the ONLY layer touching `db.collection(...)`; route handlers depend on services via Hono-context DI. 17 audit-emit invocations across admin services. 3 LRUs consolidated behind `api/src/cache/lru.ts`. SIGTERM + SIGINT handlers with 5s grace window. (D.W2 — 4 lanes)
- `PaletteDialog.vue` 652 LoC → 13-file colocated `PaletteDialog/` dir (340 LoC shell + 6 sub-components + 5 composables + constants); palette-manager facade exposes 5 sub-objects (`pm.audit` / `pm.flagged` / `pm.tags` / `pm.versions` / `pm.tagEdit`). Vue 3.5 reactive-props destructure across 32 SFCs (final `const props = defineProps<` count: 0; gate was ≤ 2). `viewSchema.ts` extracted as the canonical `ViewId` + `VIEW_MAP` source. (D.W3 — 4 lanes)
- **51 arbitrary `[var(--…)]` Tailwind callsites surfaced as first-class utilities** — 5 NEW `@theme` bridge declarations in `style.css` (`max-w-desktop-pane`, `min-w-menu`, `top-dock-inset`, `max-w-tooltip`, `shadow-card-hover`); 48 callsites resolved through glass-ui's existing bridges. NEW `--app-padding-x: 1rem` token breaks silent `.app-layout` ↔ `.pane-container` coupling. 4 style.css blocks colocated. Brittle selectors hardened. `demo/DESIGN.md` expanded 24 → 133 lines as the design-idiom catalog. (D.W4 — 2 lanes combined)
- **`e2e/smoke/` expanded from 3 specs to 21 across 3 projects** (`smoke` / `smoke-admin` / `smoke-mobile`): 6 user-view specs + walk + 2 WebGL + reactivity-instant (wall-clock ≤ 50ms median, **MERGE-GATE-BLOCKING**) + 5 admin specs + admin-walk + Pixel-7 mobile boot probe. Admin auth via `addInitScript` localStorage seeding fixture. CI runs all 3 projects. (D.W5)
- `test/bbnf-equivalence.test.ts` renamed to `test/parser-snapshot.test.ts` — the file imports zero BBNF runtime; it snapshots hand-written parsers. The KISS rename is the D.W6 close-ceremony disposition per `audit/D.W6-doc-drift.md`.

### RECURSION-PREVENTION HARDENING (D7 invariant)

The Mar-2026 `colorUnit2` nesting bug (`80cdd59` fix of `35cd9d5`) is now fortified by **4 cooperating safeguards** under L8 (D.W1 Lane L8 — non-optional, non-deferrable):

- **`ColorChannel<T>` TypeScript brand** (45 declare-applications) — compile-time refusal of `instance.L = colorInstance`.
- **DEV-only `_assertChannel` setters** — runtime guard, zero production cost (`grep -c "import.meta.env.DEV" dist/value.js` returns 0; DCE-verified).
- **`test/recursion-guard.test.ts`** — 5 named tests including 294-frame replay (the original iOS Safari reproduction), clone-no-amplify, depth-3 nest detection.
- **`clone()` depth-16 ceiling** — diagnostic-only fail-explicit.

Plus `Color.clone()` was rewritten to use per-channel explicit construction (not `new Constructor()` no-args), which was fragile under own-property storage.

### DEPS

- `docs/precepts` submodule advanced `3c32fae → 68d9b20` (the contract-v2 codification SHA — published to upstream main during the D.W0 Lane 0 pre-flight).

### Merge / release authority

The merge sequence (`tranche-b → master` with `--no-ff`), the `v0.6.0` tag, and the post-merge keyframes.js consumption-update filing all live in `docs/tranches/D/D-RELEASE-PLAN.md §3` and execute under orchestrator authority. See `docs/tranches/D/FINAL.md` for the close report; `docs/tranches/D/PROGRESS.md` for the per-wave execution log; `docs/tranches/D/findings.md §2` for the per-finding disposition table.
