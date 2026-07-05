// Color serializers — the canonical/round-trip + apply-path string emitters.
//
// S.W1 W1-8 (god-module cohesion split): lifted verbatim from `color/index.ts`.
// `toString`/`toFormattedString` (the canonical round-trip forms) and
// `toAnimationString` (the N.W7.A B1/B2 apply-path emitter) are `Color` METHODS
// that stay on the class in `base.ts`; this module holds the free functions those
// methods delegate to.
//
// EVAL-ORDER (load-bearing): this module is a LEAF — it imports NOTHING from the
// color dispatch/space graph at eval. The only conversion the apply path needs
// (`convertColorSpaceDenorm`'s `color2`/`gamutMap`) is LATE-BOUND: `dispatch.ts`
// registers the two converters at its module eval via `registerColorConverters`.
// This is what lets `base.ts` (the `Color` home `spaces.ts` extends at eval-time)
// import this module and STILL be a leaf — a static `./dispatch` import here would
// re-form the `base → … → dispatch → spaces → base` cycle and TDZ the subclass
// `extends Color` (empirically: "Class extends value undefined"). The pre-split
// `index.ts` relied on the same converters via a live-binding import that only
// survived because `index` was the subgraph root with no cross-module `extends`;
// the registration makes the dependency explicit and cycle-safe.

import { scale } from "../../math";
import { COLOR_FUNCTION_FORM, getColorSpaceBound } from "./constants";
import type { ColorSpace } from "./constants";
// Type-only (erased) — `Color` is declared in `index.ts` at this lift; the very
// next lift (base.ts + spaces.ts) repoints this to `./base`. No runtime edge
// either way (this module stays a leaf).
import type { Color } from ".";

/** Structural guard for any value carrying a `toFixed(digits)` method —
 *  matches both `number` and `ValueUnit` (the two `T` shapes a channel holds). */
const hasToFixed = (
    value: unknown,
): value is { toFixed(digits: number): string } =>
    value != null &&
    typeof (value as { toFixed?: unknown }).toFixed === "function";

export const formatNumber = (value: unknown, digits: number = 2): string => {
    if (typeof value === "number" && !Number.isFinite(value)) return "none";
    const fixed = hasToFixed(value) ? value.toFixed(digits) : String(value);
    return fixed.trim().replace(/\.0+$/, "");
};

// N.W7.A B1 — the compact apply-path number formatter. Unlike `formatNumber`
// (which keeps partial trailing zeros for the canonical/round-trip forms), the
// apply path strips ALL trailing fractional zeros — `digits` is a precision
// CEILING, so `0.700`→`0.7`, `0.50`→`0.5`, `255.0`→`255` — to hit the ≤~28-char
// budget the keyframes apply loop wants per frame (the whole B1 point). 4–5
// sig-figs is sub-JND (`DELTA_E_OK_JND`), so the truncation is perceptually free.
export const formatAnimationNumber = (value: number, digits: number): string => {
    if (Number.isNaN(value)) return "none";
    const fixed = value.toFixed(digits);
    // Drop a trailing `.` + zeros, then a bare trailing `.` (e.g. `1.` → `1`).
    return fixed.includes(".")
        ? fixed.replace(/0+$/, "").replace(/\.$/, "")
        : fixed;
};

export const formatColor = <T>(colorSpace: ColorSpace, values: T[], alpha: T) => {
    // VJ-Q9 (1.2.0) S2 — preserve the CSS `color(<space> …)` function wrapper on
    // round-trip. The `color()`-predefined spaces (display-p3, rec2020, a98-rgb,
    // prophoto-rgb, srgb-linear, xyz) tagged `"color"` in `COLOR_FUNCTION_FORM`
    // are INVALID CSS in the bare `display-p3(…)` form; they must serialize as
    // `color(display-p3 …)` so `parseCSSValue(color(display-p3 1 0 0)).toString()`
    // round-trips verbatim (it was dropping to the bare `display-p3(1 0 0)`).
    // The `"named"` spaces (rgb/hsl/oklch/…) keep their bare `name(…)` form.
    const wrap = COLOR_FUNCTION_FORM[colorSpace] === "color";
    const head = wrap ? `color(${colorSpace} ` : `${colorSpace}(`;

    // Emit the `/ alpha` clause only when the color is NOT opaque. CSS Color 4
    // §4 makes the alpha clause optional and UAs canonicalize an opaque color
    // without it; emitting `/ 1` on every keyframe wastes ~4 chars the browser
    // re-parses and diverges from the canonical opaque form. `alpha` may arrive
    // as a number, a ValueUnit (numeric valueOf), or a pre-formatted string
    // ("1" / "0.5" / "none"); `Number(alpha) === 1` is opaque, "none" → NaN is
    // kept (vj-color-interp-aug §2.4 / Wave B1b).
    if (Number(alpha) === 1) {
        return `${head}${values.join(" ")})`;
    }
    return `${head}${values.join(" ")} / ${alpha})`;
};

// N.W7.A B1/B2 — the apply-path color serializer.
//
// `toString`/`toFormattedString` are the canonical/round-trip serializers (the
// historical `xyz(…)` / `display-p3(…)` bare forms there are kept — the test
// corpus + the demo round-trip through them). `toAnimationString` is a separate,
// CSS-valid apply-path serializer: it wraps `color()`-predefined + xyz spaces in
// the spec `color(<space> …)` form so a UA can parse the emitted keyframe value
// (B2 — output-space emit), and writes channels into a reused module scratch so
// the per-frame call allocates no channel array (B1 — zero-alloc).

// Module-scoped scratch buffer (B1 zero-alloc). value.js is consumed in a
// single-threaded rAF loop and `formatNumber` never re-enters color serialize,
// so a shared buffer is re-entrancy-safe: it is fully written and joined before
// any nested call could observe it. The buffer grows once to the widest color
// arity (3 channels) and is reused thereafter.
const ANIMATION_SCRATCH: string[] = [];

export const formatAnimationColor = (
    colorSpace: ColorSpace,
    channelCount: number,
    alpha: string,
): string => {
    // Join only the live prefix of the scratch — `slice` would re-allocate, so
    // the body is assembled from the first `channelCount` slots directly.
    let channels = ANIMATION_SCRATCH[0]!;
    for (let i = 1; i < channelCount; i++) channels += " " + ANIMATION_SCRATCH[i]!;

    const body = COLOR_FUNCTION_FORM[colorSpace] === "color"
        ? `color(${colorSpace} ${channels}`
        : `${colorSpace}(${channels}`;

    // The single alpha choke point (B1b) — omit `/ 1` at full opacity.
    return Number(alpha) === 1 ? `${body})` : `${body} / ${alpha})`;
};

/** Write a color's channels into the shared apply-path scratch (B1). Returns the
 *  live channel count. Kept here (not on the class) so the scratch stays module-
 *  private; `base.ts`'s `toAnimationString` calls this then `formatAnimationColor`. */
export const writeAnimationScratch = (
    channels: readonly string[],
    read: (key: string) => number,
    digits: number,
): number => {
    for (let i = 0; i < channels.length; i++) {
        ANIMATION_SCRATCH[i] = formatAnimationNumber(read(channels[i]!), digits);
    }
    return channels.length;
};

/**
 * The duck-typed shape a parsed channel may hold: a `ValueUnit`-like wrapper
 * carrying a numeric `value` + an optional `unit`. Detected structurally (no
 * `ValueUnit` class import — the `_assertChannel` idiom) to keep this module out
 * of the `units/index` → `parsing/color` eval cycle.
 */
const asChannelWrapper = (
    v: unknown,
): { value: number; unit?: string } | undefined => {
    if (
        v != null &&
        typeof v === "object" &&
        (v as { constructor?: { name?: string } }).constructor?.name ===
            "ValueUnit"
    ) {
        return v as { value: number; unit?: string };
    }
    return undefined;
};

// ── Late-bound space converters (the eval-cycle break — see file header) ──
//
// `convertColorSpaceDenorm` needs `color2` + `gamutMap` (in `dispatch.ts`). A
// static `./dispatch` import here would drag `base.ts` (which imports this leaf)
// into the dispatch → spaces eval cycle and TDZ the subclass `extends Color`.
// So `dispatch.ts` REGISTERS the two converters at its module eval; by the time
// any `toAnimationString(_, outputSpace)` runs at runtime the registration has
// long since happened (dispatch is always evaluated by every public entry).
type ColorConvertFn = (color: Color<number>, to: ColorSpace) => Color<number>;
let _color2: ColorConvertFn | undefined;
let _gamutMap: ColorConvertFn | undefined;

/** Wire `color2` + `gamutMap` into the apply-path convert step. Called once, from
 *  `dispatch.ts` at its module eval. */
export const registerColorConverters = (
    color2: ColorConvertFn,
    gamutMap: ColorConvertFn,
): void => {
    _color2 = color2;
    _gamutMap = gamutMap;
};

// The RGB-family egress spaces that must be gamut-mapped into their OWN gamut on
// emit (B4) — the wide-gamut converters do not clip, so a P3 emit stays in P3.
const EMIT_GAMUT_SPACES: ReadonlySet<ColorSpace> = new Set<ColorSpace>([
    "rgb",
    "srgb-linear",
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
]);

/**
 * Convert a `Color` into another color space, returning a `Color<number>` whose
 * channels are in the compact CSS **number** domain of the target space (N.W7.A
 * B2 helper).
 *
 * `color2`'s converters are **normalized [0,1]** in AND out (see
 * `conversions/*.ts`), so this mirrors `colorUnit2`'s discipline:
 *   1. normalize-in — each channel scales to [0,1]. A bare number (a computed
 *      denorm color: L [0,1], a/b physical, rgb [0,255], hue degrees) reads
 *      against the source space's `number` range; a parsed `ValueUnit` reads
 *      against the range its own unit selects (`oklab(70% …)` ⇒ `%` ⇒ [0,100]).
 *   2. `color2` to the egress space.
 *   3. (B4) when the egress is RGB-family, map into that egress's *own* gamut —
 *      the wide-gamut family converters in `conversions/xyz-extended.ts` do not
 *      clip, so a P3 emit stays in P3 rather than spilling out-of-[0,1].
 *   4. denormalize-out — scale [0,1] back to the target's CSS `number` domain
 *      (`getColorSpaceBound(to, k, "number")`). The number form (no `%`/`deg`
 *      suffix) is the apply-path canonical — `toString`/`toFormattedString` emit
 *      the same number channels.
 */
export const convertColorSpaceDenorm = <T>(
    color: Color<T>,
    to: ColorSpace,
): Color<number> => {
    if (_color2 === undefined || _gamutMap === undefined) {
        throw new Error(
            "color serialize: space converters not registered — import the color " +
                "dispatch module before an output-space toAnimationString().",
        );
    }
    const from = color.colorSpace;

    // (1) Normalize each channel to [0,1] for `color2`. The channel is read
    // through the dynamic index signature (`[key: string]: any`); a parsed
    // `ValueUnit` is detected structurally, a computed color is a raw number.
    const normalized = color.clone();
    for (const k of normalized.channels) {
        const channel = color[k];
        const wrapper = asChannelWrapper(channel);
        const raw = wrapper ? wrapper.value : (channel as number);
        // A ValueUnit's unit selects the source range; a bare number is the CSS
        // `number` domain (unit "") — never the denorm `%` unit, which would
        // mis-scale a [0,1] `l`.
        const unit = wrapper ? wrapper.unit ?? "" : "";
        const { min, max } = getColorSpaceBound(from, k, unit);
        normalized[k] = scale(raw, min, max, 0, 1);
    }

    // `color2` returns a normalized `Color<number>`; step 4 writes numbers.
    let converted = _color2(normalized as unknown as Color<number>, to);

    // (3, B4) map into the egress space's own gamut when the egress is RGB-family.
    if (EMIT_GAMUT_SPACES.has(to)) {
        converted = _gamutMap(converted, to);
    }

    // (4) Denormalize [0,1] → the compact CSS number domain for `to`.
    for (const k of converted.channels) {
        const { min, max } = getColorSpaceBound(to, k, "number");
        converted[k] = scale(converted[k] as number, 0, 1, min, max);
    }

    return converted;
};
