import { lerp } from "../math";
import type { Color } from "./color";
import { COMPUTED_UNITS } from "./constants";
import { ValueUnit, type InterpolatedVar } from "./index";
import { getComputedValue } from "./normalize";
import { CYLINDRICAL_HUE_COMPONENT, interpolateHue } from "./color/dispatch";

/**
 * Interpolate a `ValueUnit` whose unit is *computed* (`var`, `calc`,
 * `vh`, `vw`, etc.) by resolving both endpoints against a target
 * element's live computed style and lerping the resulting numeric
 * values.
 *
 * Mutates and returns the `value` field of the InterpolatedVar.
 */
export function lerpComputedValue(
    t: number,
    { start, stop, value }: InterpolatedVar<any>,
): ValueUnit<any> {
    const target = start.targets?.[0] ?? stop.targets?.[0];
    if (!target) {
        throw new Error(
            "Cannot interpolate computed values without a target element.",
        );
    }

    const newStart = getComputedValue(start, target);
    const newStop = getComputedValue(stop, target);

    const newUnit = !COMPUTED_UNITS.includes(newStart.unit as any)
        ? newStart.unit
        : newStop.unit;

    value.value = lerp(newStart.value, newStop.value, t);
    value.unit = newUnit;

    return value;
}

/**
 * Interpolate a colour `ValueUnit` (`unit === "color"`). Walks each
 * channel of the parsed `Color` instance and lerps independently. The
 * surrounding `normalizeColorUnits` step is responsible for putting
 * `start` / `stop` in the same colour space (oklab, oklch, etc.) and
 * for hue handling.
 */
export function lerpColorValue(
    t: number,
    iv: InterpolatedVar<Color>,
): ValueUnit<Color> {
    const { start, stop, value, colorSpace, hueMethod } = iv;
    // Identify the hue channel for cylindrical spaces (hsl/hsv/hwb/lch/oklch).
    // CSS Color 4 §12.4 requires angular interpolation for that component;
    // other components stay on linear `lerp`.
    const hueKey = colorSpace ? CYLINDRICAL_HUE_COMPONENT[colorSpace] : undefined;

    start.value.keys().forEach((key: string) => {
        const sv = (start.value as any)[key];
        const ev = (stop.value as any)[key];
        const sn = sv instanceof ValueUnit ? sv.value : sv;
        const en = ev instanceof ValueUnit ? ev.value : ev;
        let result: number;
        if (key === hueKey) {
            // `normalizeColorUnits` denormalises back to physical units
            // (degrees in [0,360]) when inverse=true, but `interpolateHue`
            // operates on the normalised [0,1] range. Convert in/out here so
            // the cylindrical short-way logic (CSS Color 4 §12.4) lines up.
            const sNorm = sn / 360;
            const eNorm = en / 360;
            const interp = interpolateHue(sNorm, eNorm, t, hueMethod);
            result = interp * 360;
        } else {
            result = lerp(sn, en, t);
        }

        const current = (value.value as any)[key];
        if (current instanceof ValueUnit) {
            current.value = result;
        } else {
            (value.value as any)[key] = result;
        }
    });
    return value;
}

/** Lerp a simple numeric InterpolatedVar in-place. */
export function lerpNumericValue(
    t: number,
    { start, stop, value }: InterpolatedVar<number>,
): ValueUnit<number> {
    value.value = lerp(start.value, stop.value, t);
    return value;
}

/**
 * Interpolate any `InterpolatedVar` at progress `t`.
 *
 * Uses a pre-resolved dispatch function (`_lerp`) when the
 * InterpolatedVar was created via `prepareInterpVar` — avoids three
 * sequential type checks per call in hot paths. Falls back to
 * runtime dispatch for externally constructed values.
 */
export function lerpValue(
    t: number,
    iv: InterpolatedVar<any>,
): ValueUnit<any> | undefined {
    if (iv._lerp) {
        return iv._lerp(t, iv);
    }

    const { start, stop, computed } = iv;
    if (typeof start.value === "number" && typeof stop.value === "number") {
        iv.value.value = lerp(start.value, stop.value, t);
        return iv.value;
    }
    if (start.unit === "color") {
        return lerpColorValue(t, iv as InterpolatedVar<Color>);
    }
    if (computed) {
        return lerpComputedValue(t, iv);
    }
    return iv.value;
}

/**
 * Pre-resolve the interpolation dispatch function on an
 * `InterpolatedVar`. Sets a hidden `_lerp` property used by
 * `lerpValue`'s fast path.
 *
 * Call once per InterpolatedVar after `normalizeValueUnits`; the
 * dispatch is invariant for the lifetime of the InterpolatedVar.
 */
export function prepareInterpVar(iv: InterpolatedVar<any>): InterpolatedVar<any> {
    iv._lerp = iv.computed
        ? lerpComputedValue
        : iv.start.unit === "color"
          ? (lerpColorValue as (t: number, iv: InterpolatedVar<any>) => ValueUnit<any>)
          : lerpNumericValue;
    return iv;
}
