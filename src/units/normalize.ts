import { ValueUnit } from ".";
import type { InterpolatedVar } from ".";
import type { ColorSpace } from "./color/constants";
import type { HueInterpolationMethod } from "./color/mix";
import { normalizeColorUnits } from "./color/normalize";
import {
    ANGLE_UNITS,
    COMPUTED_UNITS,
    LENGTH_UNITS,
    RESOLUTION_UNITS,
    TIME_UNITS,
} from "./constants";
import {
    convertToDegrees,
    convertToDPI,
    convertToMs,
    convertToPixels,
    isColorUnit,
} from "./utils";

// ─── Type narrowing helpers ───────────────────────────────────────────────

const isLengthUnit = (unit: unknown): unit is (typeof LENGTH_UNITS)[number] =>
    typeof unit === "string" &&
    (LENGTH_UNITS as readonly string[]).includes(unit);

const isAngleUnit = (unit: unknown): unit is (typeof ANGLE_UNITS)[number] =>
    typeof unit === "string" &&
    (ANGLE_UNITS as readonly string[]).includes(unit);

const isTimeUnit = (unit: unknown): unit is (typeof TIME_UNITS)[number] =>
    typeof unit === "string" &&
    (TIME_UNITS as readonly string[]).includes(unit);

const isResolutionUnit = (
    unit: unknown,
): unit is (typeof RESOLUTION_UNITS)[number] =>
    typeof unit === "string" &&
    (RESOLUTION_UNITS as readonly string[]).includes(unit);

const isComputedUnit = (
    unit: unknown,
): unit is (typeof COMPUTED_UNITS)[number] =>
    typeof unit === "string" &&
    (COMPUTED_UNITS as readonly string[]).includes(unit);

const toNumericValue = (value: unknown, context: string): number => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new TypeError(
            `Expected numeric ${context}, got ${String(value)}.`,
        );
    }
    return value;
};

// ─── normalizeNumericUnits ────────────────────────────────────────────────

/**
 * Convert two `ValueUnit`s of the same superType to a common base
 * unit: length → px, angle → deg, time → ms, resolution → dpi.
 *
 * Throws if either input has a unit that isn't recognised for its
 * superType — silent passthrough hides bugs upstream.
 */
export const normalizeNumericUnits = (
    a: ValueUnit,
    b: ValueUnit,
    inplace: boolean = false,
): [ValueUnit, ValueUnit] => {
    if (a?.superType?.[0] !== b?.superType?.[0]) {
        if (inplace) return [a, b];
        return [a.clone(), b.clone()];
    }

    const convertToNormalizedUnit = (
        value: ValueUnit,
    ): { value: number; unit: string } => {
        const superType = value?.superType?.[0];
        const numericValue = toNumericValue(value.value, "ValueUnit");

        switch (superType) {
            case "length":
                if (!isLengthUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported length unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToPixels(
                        numericValue,
                        value.unit,
                        value.targets?.[0],
                    ),
                    unit: "px",
                };
            case "angle":
                if (!isAngleUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported angle unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToDegrees(numericValue, value.unit),
                    unit: "deg",
                };
            case "time":
                if (!isTimeUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported time unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToMs(numericValue, value.unit),
                    unit: "ms",
                };
            case "resolution":
                if (!isResolutionUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported resolution unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToDPI(numericValue, value.unit),
                    unit: "dpi",
                };
            default:
                return {
                    value: numericValue,
                    unit: typeof value.unit === "string" ? value.unit : "",
                };
        }
    };

    const [newA, newB] = [
        convertToNormalizedUnit(a),
        convertToNormalizedUnit(b),
    ];

    if (inplace) {
        a.value = newA.value;
        a.unit = newA.unit;

        b.value = newB.value;
        b.unit = newB.unit;

        return [a, b];
    }
    return [
        new ValueUnit(
            newA.value,
            newA.unit,
            a.superType,
            a.subProperty,
            a.property,
            a.targets,
        ),
        new ValueUnit(
            newB.value,
            newB.unit,
            b.superType,
            b.subProperty,
            b.property,
            b.targets,
        ),
    ];
};

// ─── normalizeValueUnits ──────────────────────────────────────────────────

/**
 * Type-predicate narrowing a generic `ValueUnit` to the exact input shape
 * expected by `normalizeColorUnits` (`ValueUnit<Color<ValueUnit<number>>,
 * "color">`). The runtime check is the `unit === "color"` discriminant —
 * the same check the prior `asColorValueUnit` helper bridged, lifted into
 * the type system so the narrowing flows without a double-cast.
 *
 * The inner `Color<ValueUnit<number>>` shape is a producer-side contract:
 * the parsing pipeline only mints `unit === "color"` `ValueUnit`s with
 * `Color<ValueUnit<number>>`-typed payloads. The discriminant alone is
 * the structurally honest narrowing.
 *
 * H.W2 Lane C (H-OPP-9): retires the boundary cast at the former line
 * 319 — see `docs/tranches/H/audit/H.W2-lane-c-type-predicate.md`.
 */
const isColorValueUnit = (
    value: ValueUnit,
): value is Parameters<typeof normalizeColorUnits>[0] => value.unit === "color";

export type NormalizeValueUnitsOptions = {
    /** Color space for color interpolation. Default: `"oklab"`. */
    colorSpace?: ColorSpace;
    /** Hue interpolation method for cylindrical color spaces. */
    hueMethod?: HueInterpolationMethod;
};

/**
 * Compute an `InterpolatedVar` from two endpoint `ValueUnit`s,
 * preparing them for later `lerpValue` calls.
 *
 * - Colors: collapsed to a common space via `normalizeColorUnits`.
 *   `colorSpace` defaults to `oklab` (perceptually uniform); `hueMethod`
 *   selects the cylindrical hue interpolation strategy.
 * - Mixed units (e.g. `10px` ↔ `1em`): collapsed via
 *   `normalizeNumericUnits` to a common base unit.
 * - Computed units (`var`, `calc` — `COMPUTED_UNITS` is these two ONLY):
 *   left as-is and marked `computed: true`; the numeric resolution is
 *   deferred to `lerpComputedValue` against a live target. Viewport /
 *   container units (`vh`, `vw`, `cqw`, …) are NOT deferred: a same-unit
 *   `vh→vh` pair lerps symbolically (resize-safe), while a mixed `vh→px`
 *   pair resolves `vh` eagerly to px here and does NOT track resize. (The
 *   docstring claimed these were `computed`/deferred — corrected at S.W1
 *   per lib-core-value-audit P2-1; wiring them through the computed path
 *   is a deferred behavior decision, not taken here.)
 */
export function normalizeValueUnits(
    left: ValueUnit,
    right: ValueUnit,
    options: NormalizeValueUnitsOptions = {},
): InterpolatedVar<unknown> {
    const colorSpace: ColorSpace = options.colorSpace ?? "oklab";
    const hueMethod = options.hueMethod;

    left = left.coalesce(right);
    right = right.coalesce(left);

    const out: InterpolatedVar<unknown> = {
        start: left,
        stop: right,
        value: left.clone(),
        computed: false,
    };

    if (isColorValueUnit(left) && isColorValueUnit(right)) {
        const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
            left,
            right,
            colorSpace,
            false,
            true,
            false,
            hueMethod,
        );

        out.start = leftCollapsed;
        out.stop = rightCollapsed;
        out.value = leftCollapsed.clone();
        // Producer side: carry hueMethod + colorSpace through to the
        // InterpolatedVar so `lerpColorValue` can dispatch `interpolateHue`
        // for the hue channel of cylindrical spaces.
        out.colorSpace = colorSpace;
        if (hueMethod) out.hueMethod = hueMethod;
    }

    if (left.unit !== right.unit) {
        const [leftCollapsed, rightCollapsed] = normalizeNumericUnits(
            left,
            right,
            true,
        );

        out.start = leftCollapsed;
        out.stop = rightCollapsed;
        out.value = leftCollapsed.clone();
    }

    out.computed = isComputedUnit(left.unit) || isComputedUnit(right.unit);

    return out;
}

// Re-export for consumers that want to query computed-unit-ness.
export { isColorUnit };
