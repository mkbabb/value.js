import { lerp } from "../math";
import type { Color } from "./color";
import { ch, channelOf, setChannel } from "./color";
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

    const computedUnits: readonly string[] = COMPUTED_UNITS;
    const newUnit = !computedUnits.includes(newStart.unit ?? "")
        ? newStart.unit
        : newStop.unit;

    value.value = lerp(newStart.value, newStop.value, t);
    value.unit = newUnit;

    return value;
}

/**
 * A `Color` at interpolation time: its channels may be raw `number`s (numeric
 * pipeline) or `ValueUnit<number>` wrappers (parser-produced colors). Both
 * shapes flow through `lerpColorValue`; the per-channel `instanceof ValueUnit`
 * branch dispatches between them.
 */
type InterpColor = Color<ValueUnit<number> | number>;

/**
 * Frozen per-frame color-channel plan (B3). Built once at `prepareInterpVar`;
 * drives `lerpColorValue`'s closure-free hot loop. Parallel arrays (a light SoA)
 * indexed by channel position: the unwrapped start/stop numbers, the hue
 * channel index (or -1), the destination ValueUnit ref per channel (or null
 * when the destination slot is a raw number written via `setChannel`).
 */
export type ColorChannelPlan = {
    keys: readonly string[];
    startN: Float64Array;
    stopN: Float64Array;
    hueIndex: number;
    dstVU: (ValueUnit<number> | null)[];
};

/**
 * Interpolate a colour `ValueUnit` (`unit === "color"`). Walks each
 * channel of the parsed `Color` instance and lerps independently. The
 * surrounding `normalizeColorUnits` step is responsible for putting
 * `start` / `stop` in the same colour space (oklab, oklch, etc.) and
 * for hue handling.
 */
export function lerpColorValue(
    t: number,
    iv: InterpolatedVar<InterpColor>,
): ValueUnit<InterpColor> {
    const { value, _colorPlan, hueMethod } = iv;

    // B3 fast path — a closure-free flat loop over the frozen channel plan
    // (built once at `prepareInterpVar`). The start/stop channels are FIXED
    // endpoints, so their unwrapped numbers, the hue index, and the
    // destination accessor are all invariant for the iv's life. The per-frame
    // `keys()`/`forEach`-closure/`unwrapDeep`/dynamic-index churn the old path
    // re-paid every frame collapses to indexed numeric reads (vj-color-interp-aug
    // §2.2; the color twin of the D2 SoA discipline). Byte-identical output.
    if (_colorPlan) {
        const { keys, startN, stopN, hueIndex, dstVU } = _colorPlan;
        const dstColor = value.value;
        for (let i = 0; i < keys.length; i++) {
            const s = startN[i]!;
            const e = stopN[i]!;
            // Hue start/stop are pre-divided into the [0,1] domain that
            // `interpolateHue` expects (B5: the ÷360 is folded into the plan);
            // only the ×360 back to degrees remains per frame.
            const result =
                i === hueIndex
                    ? interpolateHue(s, e, t, hueMethod) * 360
                    : lerp(s, e, t);
            const cur = dstVU[i];
            if (cur != null) cur.value = result;
            else setChannel(dstColor, keys[i] as string, ch(result));
        }
        return value;
    }

    // Fallback — externally constructed iv with no prepared plan.
    const { start, stop, colorSpace } = iv;
    const hueKey = colorSpace ? CYLINDRICAL_HUE_COMPONENT[colorSpace] : undefined;

    start.value.keys().forEach((key: string) => {
        const sv = channelOf(start.value, key);
        const ev = channelOf(stop.value, key);
        const sn = ValueUnit.unwrapDeep(sv);
        const en = ValueUnit.unwrapDeep(ev);
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

        const current = channelOf(value.value, key);
        if (current instanceof ValueUnit) {
            current.value = result;
        } else {
            setChannel(value.value, key, ch(result));
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
    if (!iv.computed && iv.start.unit === "color") {
        iv._colorPlan = buildColorChannelPlan(iv as InterpolatedVar<InterpColor>);
    }
    return iv;
}

/**
 * Freeze the per-frame color-channel walk into a flat numeric plan (B3). The
 * start/stop channels are fixed endpoints, so their unwrapped numbers, the hue
 * index, and the destination accessor never change across frames — precompute
 * them once here so `lerpColorValue`'s hot loop is closure- and
 * `unwrapDeep`-free. Mirrors the `_lerp` predispatch already on the iv.
 */
function buildColorChannelPlan(
    iv: InterpolatedVar<InterpColor>,
): ColorChannelPlan {
    const { start, stop, value, colorSpace } = iv;
    const hueKey = colorSpace ? CYLINDRICAL_HUE_COMPONENT[colorSpace] : undefined;

    const keys = start.value.keys();
    const n = keys.length;
    const startN = new Float64Array(n);
    const stopN = new Float64Array(n);
    const dstVU = new Array<ValueUnit<number> | null>(n).fill(null);
    let hueIndex = -1;

    for (let i = 0; i < n; i++) {
        const key = keys[i] as string;
        const sn = ValueUnit.unwrapDeep(channelOf(start.value, key));
        const en = ValueUnit.unwrapDeep(channelOf(stop.value, key));
        if (key === hueKey) {
            hueIndex = i;
            // Pre-divide hue into the [0,1] domain interpolateHue expects (B5).
            startN[i] = sn / 360;
            stopN[i] = en / 360;
        } else {
            startN[i] = sn;
            stopN[i] = en;
        }
        const cur = channelOf(value.value, key);
        dstVU[i] = cur instanceof ValueUnit ? (cur as ValueUnit<number>) : null;
    }

    return { keys, startN, stopN, hueIndex, dstVU };
}
