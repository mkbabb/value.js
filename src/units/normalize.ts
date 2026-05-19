import { parseCSSValue } from "../parsing";
import { ValueUnit } from ".";
import type { InterpolatedVar } from ".";
import { parseCSSValueUnit } from "../parsing/units";
import { memoize } from "../utils";
import type { HueInterpolationMethod } from "./color/utils";
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
    unpackMatrixValues,
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

// ─── Matrix sub-property handling for getComputedValue ────────────────────
//
// When a `calc()` value is set on a transform sub-property
// (`translateX`, `scaleY`, etc.), reading back `transform` yields
// a matrix() / matrix3d() that we decompose to recover the resolved
// numeric value for that axis.

const MATRIX_SUB_PROPERTIES = new Set([
    "scaleX",
    "scaleY",
    "scaleZ",
    "skewX",
    "skewY",
    "skewZ",
    "translateX",
    "translateY",
    "translateZ",
    "rotateX",
    "rotateY",
    "rotateZ",
    "perspectiveX",
    "perspectiveY",
    "perspectiveZ",
    "perspectiveW",
] as const);

type MatrixSubProperty =
    typeof MATRIX_SUB_PROPERTIES extends Set<infer T> ? T : never;

const isMatrixSubProperty = (value: string): value is MatrixSubProperty =>
    MATRIX_SUB_PROPERTIES.has(value as MatrixSubProperty);

// ─── Element identity for memoization ────────────────────────────────────
//
// Live HTMLElements aren't safely JSON-stringifiable; use a WeakMap
// to assign stable string ids without retaining references that
// would prevent GC.

const elementIdMap = new WeakMap<HTMLElement, number>();
let nextElementId = 0;
const getElementId = (el: HTMLElement): number => {
    let id = elementIdMap.get(el);
    if (id === undefined) {
        id = nextElementId++;
        elementIdMap.set(el, id);
    }
    return id;
};

const styleRecord = (style: CSSStyleDeclaration): Record<string, string> =>
    style as unknown as Record<string, string>;

// ─── getComputedValue ─────────────────────────────────────────────────────

/**
 * Resolve a computed CSS value (`var()`, `calc()`, or other
 * deferred-evaluation unit) against a target element by writing it
 * into the target's inline style and reading back the computed
 * style. Memoised by `(value.toString(), element-id)`.
 *
 * For `calc()` values whose `subProperty` names a transform axis
 * (`translateX`, `scaleY`, etc.), the round-trip yields a `matrix()`
 * or `matrix3d()`; this function decomposes the matrix to recover
 * the resolved numeric value for that single axis.
 *
 * Caching is suppressed when the target is disconnected — layout
 * units (`vh`, `cqw`, etc.) resolve to 0 outside the live tree, so
 * caching that value would poison later reads.
 */
export const getComputedValue = memoize(
    (value: ValueUnit, target?: HTMLElement) => {
        const get = (): ValueUnit => {
            if (!target) return value;

            if (value.unit === "var") {
                const computed = getComputedStyle(target).getPropertyValue(
                    value.value,
                );
                return parseCSSValueUnit(computed);
            }

            if (
                value.unit === "calc" &&
                value.property &&
                value.subProperty &&
                value.value
            ) {
                const prop = value.property;
                const style = styleRecord(target.style);
                const originalValue = style[prop] ?? "";

                const newValue = value.subProperty
                    ? `${value.subProperty}(${value.toString()})`
                    : value.toString();

                style[prop] = newValue;

                const computed = getComputedStyle(target).getPropertyValue(
                    prop,
                );

                style[prop] = originalValue;

                const p = parseCSSValue(computed);

                if (p instanceof ValueUnit) return p;

                if (p.name.startsWith("matrix")) {
                    const matrixValues = unpackMatrixValues(p);

                    if (isMatrixSubProperty(value.subProperty)) {
                        const matrixSubValue = matrixValues[value.subProperty];
                        if (matrixSubValue != null) {
                            return new ValueUnit(matrixSubValue, "px", [
                                "length",
                                "absolute",
                            ]);
                        }
                    }
                }
            }

            return value;
        };

        return get().coalesce(value);
    },
    {
        keyFn: (value: ValueUnit, target?: HTMLElement) =>
            `${value.toString()}-${target ? getElementId(target) : "null"}`,
        // Layout-dependent units (`vh`, `cqw`, etc.) resolve to 0
        // when the element is outside the live tree (e.g. inside a
        // detached DocumentFragment). Don't cache those reads.
        shouldCache: (
            _result: ValueUnit,
            _value: ValueUnit,
            target?: HTMLElement,
        ) => !target || target.isConnected,
    },
);

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

const asColorValueUnit = (value: ValueUnit): Parameters<typeof normalizeColorUnits>[0] => {
    if (value.unit !== "color") {
        throw new TypeError("Expected a color ValueUnit.");
    }
    return value as unknown as Parameters<typeof normalizeColorUnits>[0];
};

export type NormalizeValueUnitsOptions = {
    /** Color space for color interpolation. Default: `"oklab"`. */
    colorSpace?: string;
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
 * - Computed units (`var`, `calc`, `vh`, `cqw`, etc.): left as-is and
 *   marked `computed: true`. The actual numeric resolution happens
 *   later in `lerpComputedValue` against a live target.
 */
export function normalizeValueUnits(
    left: ValueUnit,
    right: ValueUnit,
    options: NormalizeValueUnitsOptions = {},
): InterpolatedVar<unknown> {
    const colorSpace = options.colorSpace ?? "oklab";
    const hueMethod = options.hueMethod;

    left = left.coalesce(right);
    right = right.coalesce(left);

    const out: InterpolatedVar<unknown> = {
        start: left,
        stop: right,
        value: left.clone(),
        computed: false,
    };

    if (left.unit === "color" && right.unit === "color") {
        const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
            asColorValueUnit(left),
            asColorValueUnit(right),
            colorSpace as any,
            false,
            true,
            false,
            hueMethod,
        );

        out.start = leftCollapsed;
        out.stop = rightCollapsed;
        out.value = leftCollapsed.clone();
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
