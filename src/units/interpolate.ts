import { lerp } from "../math";
import type { Color } from "./color";
import { ch, channelOf, setChannel } from "./color";
import { COMPUTED_UNITS } from "./constants";
import { ValueUnit, type InterpolatedVar } from "./index";
import { getComputedValue, getLayoutEpoch } from "./normalize";
import { CYLINDRICAL_HUE_COMPONENT, interpolateHue } from "./color/mix";

/**
 * Interpolate a `ValueUnit` whose unit is *computed* (`var`, `calc`,
 * `vh`, `vw`, etc.) by resolving both endpoints against a target
 * element's live computed style and lerping the resulting numeric
 * values.
 *
 * C1 (tranche-F Wave C) — the endpoint cache. The resolved
 * `(startN, stopN, unit)` pair is invariant while the layout epoch is
 * stable, so it is cached on the iv (`_computedCache`) the first frame
 * and every later steady frame collapses to a bare
 * `lerp(startN, stopN, t)` — no `getComputedValue` memo call, no
 * `value.toString()`, no forced reflow. The cache busts when the live
 * target changes or the layout epoch advances (resize → `bumpLayoutEpoch`).
 * Pixel-identical while the epoch is stable.
 *
 * Mutates and returns the `value` field of the InterpolatedVar.
 */
export function lerpComputedValue(
    t: number,
    iv: InterpolatedVar<any>,
): ValueUnit<any> {
    const { start, stop, value } = iv;
    const target = start.targets?.[0] ?? stop.targets?.[0];
    if (!target) {
        throw new Error(
            "Cannot interpolate computed values without a target element.",
        );
    }

    const epoch = getLayoutEpoch();
    let cache = iv._computedCache;

    // Fast path — the resolved endpoints are still valid (same target, same
    // layout epoch). Collapse to a bare lerp; this is the steady state.
    if (
        cache === undefined ||
        cache.target !== target ||
        cache.epoch !== epoch
    ) {
        // Cold / invalidated — resolve both endpoints against the live box and
        // (re)stamp the cache. Paid once per (target, epoch), not per frame.
        const newStart = getComputedValue(start, target);
        const newStop = getComputedValue(stop, target);

        const computedUnits: readonly string[] = COMPUTED_UNITS;
        const newUnit = !computedUnits.includes(newStart.unit ?? "")
            ? newStart.unit
            : newStop.unit;

        cache = {
            startN: newStart.value as number,
            stopN: newStop.value as number,
            unit: newUnit as string | undefined,
            target,
            epoch,
        };
        iv._computedCache = cache;
        value.unit = cache.unit;
    }

    value.value = lerp(cache.startN, cache.stopN, t);

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
 * Frozen per-frame color-INTERPOLATION plan (B3). Built once at
 * `prepareInterpVar`; drives `lerpColorValue`'s closure-free hot loop. Parallel
 * arrays (a light SoA) indexed by channel position: the unwrapped start/stop
 * numbers, the hue channel index (or -1), the destination ValueUnit ref per
 * channel (or null when the destination slot is a raw number written via
 * `setChannel`).
 *
 * Named `ColorInterpPlan` (renamed from `ColorChannelPlan` at VJ-Q8): a
 * per-iv endpoint cache. The former public `color-soa.ts` SoA layout that once
 * shared the `ColorChannelPlan` name was EXCISED at S.W1 (3.0.0) as an orphan
 * export — its named keyframes.js compositor consumer never adopted it.
 */
export type ColorInterpPlan = {
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

/** The interpolation dispatch function for an `InterpolatedVar`. */
type LerpFn = (t: number, iv: InterpolatedVar<any>) => ValueUnit<any>;

/**
 * Resolve the per-kind interpolation function for an `InterpolatedVar` from its
 * shape — the *single* dispatch decision tree, consumed by both the predispatch
 * (`prepareInterpVar` stamps the result as `_lerp`) and the runtime fallback
 * (`lerpValue` calls it when no `_lerp` is present). Collapsing the formerly
 * duplicated decision (E1.N5 — the predispatch tree mirrored an inline fallback
 * with a divergent branch order) keeps the two paths provably in lock-step:
 *
 *   - **computed** (`var`/`calc`/`vh`…) → `lerpComputedValue`. Checked FIRST: a
 *     computed leaf can also carry `unit === "color"` shapes downstream, and the
 *     computed resolution is the governing dispatch.
 *   - **color** (`unit === "color"`) → `lerpColorValue`.
 *   - **numeric** (both endpoints already `number`-typed) → `lerpNumericValue`.
 *   - otherwise → `undefined` (no interpolation; the iv's `value` is returned
 *     verbatim — the externally-constructed escape hatch).
 */
function resolveLerpFn(iv: InterpolatedVar<any>): LerpFn | undefined {
    if (iv.computed) return lerpComputedValue;
    if (iv.start.unit === "color") return lerpColorValue as LerpFn;
    if (typeof iv.start.value === "number" && typeof iv.stop.value === "number")
        return lerpNumericValue as LerpFn;
    return undefined;
}

/**
 * Interpolate any `InterpolatedVar` at progress `t`.
 *
 * Uses a pre-resolved dispatch function (`_lerp`) when the
 * InterpolatedVar was created via `prepareInterpVar` — avoids the
 * `resolveLerpFn` decision per call in hot paths. Falls back to
 * runtime dispatch (the SAME `resolveLerpFn`) for externally
 * constructed values; an unmatched shape returns `iv.value` verbatim.
 */
export function lerpValue(
    t: number,
    iv: InterpolatedVar<any>,
): ValueUnit<any> | undefined {
    const fn = iv._lerp ?? resolveLerpFn(iv);
    return fn ? fn(t, iv) : iv.value;
}

/**
 * Pre-resolve the interpolation dispatch function on an
 * `InterpolatedVar`. Sets a hidden `_lerp` property used by
 * `lerpValue`'s fast path (via the shared `resolveLerpFn`).
 *
 * Call once per InterpolatedVar after `normalizeValueUnits`; the
 * dispatch is invariant for the lifetime of the InterpolatedVar.
 */
export function prepareInterpVar(iv: InterpolatedVar<any>): InterpolatedVar<any> {
    iv._lerp = resolveLerpFn(iv) ?? lerpNumericValue;
    if (!iv.computed && iv.start.unit === "color") {
        iv._colorPlan = buildColorInterpPlan(iv as InterpolatedVar<InterpColor>);
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
function buildColorInterpPlan(
    iv: InterpolatedVar<InterpColor>,
): ColorInterpPlan {
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
