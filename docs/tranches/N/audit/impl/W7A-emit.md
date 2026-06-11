# N.W7.A-2 — the emit slice (B1, B2, B4)

**Lane:** W7A-2 (impl). **Date:** 2026-06-11. **Branch:** `tranche-f-handoff`.
**Owner-scope honoured:** `src/**` + `test/**` only. No `package.json`, no
`vite.config.ts`, no `demo/`, no `api/`. No git commit/push.
**Spec sheet:** `docs/tranches/N/audit/impl/W7A-recon.md` §3 (B1), §4 (B2), §5 (B4).
**Prior slice (W7A-1, parsers):** status green (E1/E2/VJ-3 landed; 1640 tests).

Three items landed: the zero-alloc precision serializer `toAnimationString`
(B1), output-space emit (B2 — the corrected emit-space rule), and P3 egress
gamut mapping (B4). Every new public symbol exports through `src/index.ts`;
every feature carries vitest coverage in `test/color-emit.test.ts`.

---

## B1 — zero-alloc precision `toAnimationString`

**What landed.** A new apply-path serializer
`Color<T>.toAnimationString(digits = 4, outputSpace?)` on the `Color<T>` base
class (`src/units/color/index.ts`), beside `toFormattedString`. It is the
**apply-path** serializer; `toString`/`toFormattedString` stay the
canonical/round-trip serializers (the recon §3 division of labour — their
historical `xyz(…)`/`display-p3(…)` bare forms are left untouched, the test
corpus + demo round-trip through them).

**Where.**
- `src/units/color/index.ts`:
  - `formatAnimationNumber(value, digits)` (`:37`) — the compact number
    formatter: `digits` is a precision CEILING, ALL trailing fractional zeros
    stripped (`0.700`→`0.7`, `255.0`→`255`) to hit the ≤~28-char budget. `none`
    for NaN. (Distinct from `formatNumber`, which keeps partial trailing zeros
    for the canonical forms.)
  - `ANIMATION_SCRATCH` (`:75`) — a module-scoped scratch buffer. value.js is
    consumed in a single-threaded rAF loop and `formatAnimationNumber` never
    re-enters color serialize, so the buffer is re-entrancy-safe (written + read
    fully per call before any nested call could observe it). The buffer is
    written by index, joined in `formatAnimationColor` without `slice`, so a
    per-frame call allocates **no channel array** (the recon §3 zero-alloc half;
    the precision half pre-existed in `toFormattedString`).
  - `formatAnimationColor(space, channelCount, alpha)` (`:77`) — the alpha choke
    point: `/ 1` omitted at full opacity (B1b, unchanged), and the `color()`
    wrap (B2 form, below).
  - `toAnimationString` method (`:399`).
- `src/units/color/index.ts:212-218` re-export block — the method ships on the
  exported class; `dist/units/color/index.d.ts` carries
  `toAnimationString(digits?, outputSpace?): string`.

**Spec semantics honoured (recon §3).** `none`/NaN → `"none"`; opaque omits
`/ 1` (the B1b choke point, not re-introduced); the scratch is single-threaded-
safe. The `outputSpace` parameter is B2's concern (below); B1 lands it as an
accepted parameter that defaults to the color's own space (verbatim emit).

---

## B2 — output-space emit (the corrected emit-space rule)

**What landed.** The `outputSpace?: ColorSpace` overload on `toAnimationString`
serializes a stored color **as** a requested interpolation space, so a UA's
*implicit* interp space (chosen by syntax family, CSS Color 4 §12) equals the
request — the recon §4 corrected rule:
- a non-legacy request (`oklab` default, `oklch`, `display-p3`, …) emits that
  space's non-legacy syntax **regardless of input family** (so a stored
  `rgb(255 0 0)` requested as `oklab` emits `oklab(0.628 …)`, and the UA
  interpolates in OKLab);
- a legacy `srgb`/`rgb` request emits the legacy `rgb(…)` form (correct for
  explicit-sRGB / gradient / `color-mix` contexts).

`srgb` is accepted as the request alias for the internal `rgb` space.

**Where.**
- `src/units/color/constants.ts`:
  - `COLOR_SYNTAX_FAMILY` (`:235`) + `ColorSyntaxFamily` type (`:233`) — each
    `ColorSpace` tagged `"legacy"` (sRGB interp: `rgb`/`hsl`/`hwb`) or
    `"non-legacy"` (OKLab interp: everything else).
  - `COLOR_FUNCTION_FORM` (`:256`) + `ColorFunctionForm` type (`:254`) — the
    serialized shape: `"named"` (`oklab(…)`) vs `"color"` (the CSS-valid
    `color(display-p3 …)` wrapper — the bare `display-p3(…)` form is invalid
    CSS Color 4 §10). `toAnimationString` reads this so a wide-gamut/xyz emit is
    parseable.
- `src/units/color/index.ts`:
  - `convertColorSpaceDenorm<T>(color, to)` (`:144`) — the conversion helper.
    `color2` is normalized-[0,1] in AND out (verified live), so this mirrors
    `colorUnit2`'s discipline: normalize-in (a `ValueUnit`'s own unit selects the
    source range; a bare number reads the CSS `number` range — NEVER the denorm
    `%` unit, which would mis-scale a [0,1] `l`) → `color2` → (B4 egress gamut)
    → denormalize-out to the compact CSS `number` domain
    (`getColorSpaceBound(to, k, "number")`: oklab L→[0,1], a/b→[-0.4,0.4],
    hue→[0,360], rgb→[0,255]). The channel-unwrap is duck-typed
    (`asChannelWrapper`, `:101`) — the established `_assertChannel` idiom — to
    keep this module OUT of the `units/index` → `parsing/color` eval cycle
    (`units/index.ts:1` re-exports `parsing/color`, which captures the color
    classes; importing the `ValueUnit` barrel from this first-evaluated module
    read them before declaration — a real init-order break I hit and fixed).
- `src/units/color/dispatch.ts`:
  - `cssColorInterpKeyword(space, hueMethod = "shorter")` (`:319`) — the WAAPI
    `<color-interpolation-method>` keyword string (the value.js half of the
    recon §4 WAAPI lift): the bare space for a rectangular non-legacy space
    (`oklab`), `${space} ${hue} hue` for a polar space (`oklch shorter hue`),
    `undefined` for a legacy family (sRGB is the implicit default, no keyword).
    Consumes `COLOR_SYNTAX_FAMILY`.

**Barrel exports.** `src/index.ts` — `cssColorInterpKeyword`,
`COLOR_SYNTAX_FAMILY`, `COLOR_FUNCTION_FORM`, and the `ColorSyntaxFamily` /
`ColorFunctionForm` types. `src/units/color/index.ts` re-exports
`cssColorInterpKeyword` from `./dispatch`.

---

## B4 — P3 egress gamut

**What landed.** `gamutMap<C>(color, targetSpace = "rgb")`
(`src/units/color/dispatch.ts:269`) gained a target-space parameter. The
default (`"rgb"`) is the historical sRGB behavior — the zero-iteration Ottosson
analytical map (`gamut.ts` `gamutMapSRGB`, untouched). A wide-gamut egress
(`display-p3`, `rec2020`, `a98-rgb`, `prophoto-rgb`, `srgb-linear`) maps into
**that** space's own gamut, so a P3-only color stays saturated in P3 and is
only sRGB-clipped on an sRGB egress (the recon §5 "one real wide-gamut
correctness gap").

**Where.**
- `src/units/color/dispatch.ts`:
  - `RGB_GAMUT_SPACES` (`:201`) — the RGB-family egress spaces whose gamut is the
    unit `[0,1]³` box.
  - `gamutMapToRgbSpace<C>(color, target)` (`:223`) — the numeric egress map for
    the wide-gamut spaces. The Ottosson analytical map's polynomial coefficients
    are sRGB-fit (recon §5 flag), so non-sRGB egress reduces chroma in OKLCh
    toward the egress boundary (the CSS Color 4 §13.2 reference strategy: hold L
    + H, binary-search the largest in-gamut chroma — 24 steps ≈ 6e-8 resolution,
    sub-JND — then clamp the residual). Hue preserved exactly. The
    measure-first decision (recon §5): numeric-binary-search for non-sRGB egress
    vs per-space analytical coefficients — the numeric path is exact, allocation-
    cheap, and reuses the existing `color2` egress converters; analytical
    per-space coefficients would be a large color-science lift for no accuracy
    gain at the apply path.
  - `gamutMap<C>(color, targetSpace)` (`:269`) — routes `"rgb"` → analytical,
    wide-gamut → numeric; an in-target-gamut color is identical under either
    mapping (the common path unchanged — verified).
- `src/units/color/index.ts`: `convertColorSpaceDenorm` step 3 — when the B2
  egress is an RGB-family space (`EMIT_GAMUT_SPACES`, `:135`), the converted
  color is `gamutMap`-ed into that egress's own gamut. The wide-gamut family
  converters in `conversions/xyz-extended.ts` do **not** clip (verified — only
  `xyz2rgb` gamut-maps), so without this a P3 emit would spill out-of-[0,1].

**Call-compat.** `gamutMap(color)` keeps its 1-arg signature (default
`"rgb"`); the 4 internal `gamutMap(...)` callers in `conversions/direct.ts` +
`conversions/xyz-extended.ts` are unaffected (sRGB default).

---

## Tests

`test/color-emit.test.ts` — 22 tests, all green.

- **B1 (7):** digits-precision own-space emit (`oklab(0.7 0.1 0.05)`) · `/ 1`
  omitted at opacity · alpha clause when not opaque · `none`/NaN channel + alpha
  · digits ceiling + trailing-zero strip · `color()` wrap for a predefined space
  (`color(display-p3 …)`, `color(rec2020 … / 0.5)`) · scratch-reuse correctness
  (interleaved different-arity colors).
- **B2 (7):** non-legacy emit from `rgb()` input (oklab/oklch) · legacy `rgb()`
  for an `srgb` request · `rgb`≡`srgb` request alias · same-space verbatim no-op
  · `color()` wrapper for a wide-gamut request · parse(emit(x)) round-trips
  within a JND (deltaEOK < 0.02) · computed (number-domain) ≡ parsed conversion.
- **B4 (5):** display-p3 egress stays interior (no clamp) · the same P3-only
  color clamps a channel under the sRGB egress (desaturates) · the P3 egress
  preserves more OKLCh chroma than sRGB · an in-sRGB color is identical under
  either egress · hue preserved under a chroma-reducing egress map.
- **`cssColorInterpKeyword` (3):** bare space for rectangular · `… shorter hue`
  for polar (+ `longer`) · `undefined` for legacy families.

**The P3-only witness** (`color(display-p3 0.1 0.8 0.2)`) is empirically a
genuine in-P3-out-of-sRGB color: its display-p3 emit stays strictly interior
`(0.1 0.8 0.2)` (P3 fits it untouched), while its sRGB emit pins r→0
(`rgb(0 197 75)`) — the silent desaturation B4 fixes.

---

## Gate outputs

- `npx vitest run` → **1662 passed (39 files)** — up from 1640 by the 22 new
  emit tests. ALL green; zero regression in the existing 1640.
- `npm run build` → **green**; `.d.ts` emitted;
  `toAnimationString`/`cssColorInterpKeyword`/`COLOR_SYNTAX_FAMILY`/
  `COLOR_FUNCTION_FORM` + the family types resolve in `dist/index.d.ts` and
  `dist/units/color/index.d.ts`.
- `npm run lint` → **exit 0** (`eslint . --max-warnings=0`).
- `npx tsc --noEmit -p tsconfig.lib.json` → **exit 0** (library typecheck clean).

---

## Type discipline

- **Zero new `as any`; zero new `as unknown as`.** The conversion helper is
  generic over `T` (`convertColorSpaceDenorm<T>`), so `toAnimationString` passes
  `this` cast-free; an initial `this as unknown as Color<number>` was eliminated
  by the generic. The two existing `as` narrowings inside the new code
  (`color2(...) as Color<number>` once the channels are pure numbers;
  `gamutMap`'s constructor narrowings) are single-cast index/result narrowings,
  not type-erasing double casts — the documented `dispatch.ts`/`getDirectPath`
  precedent.

## Notes for downstream / coordination

- **Consume target (keyframes.js):** `toAnimationString` is the apply-path
  serializer kf consumes per frame (recon §3 — grep of kf for `toAnimationString`
  = 0, not yet wired). The B2 emit-space rule pairs with the kf-side WAAPI color
  lift (kf S4, the 4-clause hard-equality gate); `cssColorInterpKeyword` is the
  value.js half kf hands to `KeyframeEffect`. The B4 P3 egress is consumed when
  a `color(display-p3 …)` keyframe animates — kf BOOK.
- **The default `digits` is 4** (sub-JND per `DELTA_E_OK_JND`); callers wanting
  the canonical full-precision form use `toString`/`toFormattedString`.
- **Init-order caveat (durable):** `units/index.ts:1` re-exports `parsing/color`
  at the barrel top, which captures the color classes. Any NEW top-level import
  of the `..` (units) barrel or `./normalize` from `src/units/color/index.ts`
  (the first-evaluated module of the color subgraph) reads those classes before
  they are declared → a `mapping.ctor is not a constructor` break. The emit slice
  stays clear of that by duck-typing the channel unwrap + inlining the [0,1]
  scaling (`scale` + `getColorSpaceBound`) instead of importing the
  normalize/ValueUnit barrel. A future lane extending this module should keep the
  same discipline.
