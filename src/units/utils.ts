import { FunctionValue, ValueArray, ValueUnit } from ".";
import { isObject } from "../utils";
import { Color } from "./color";

import {
    ABSOLUTE_LENGTH_UNITS,
    ANGLE_UNITS,
    FREQUENCY_UNITS,
    FUNCTION_IDENTITY,
    LENGTH_UNITS,
    PERCENTAGE_UNITS,
    RELATIVE_LENGTH_UNITS,
    RESOLUTION_UNITS,
    TIME_UNITS,
    UNITS,
} from "./constants";
import type { MatrixValues } from "./constants";
import { STYLE_NAMES } from "./style-names";

export function isColorUnit(
    value: ValueUnit,
): value is ValueUnit<Color<ValueUnit>> {
    return value.unit === "color";
}

/**
 * The `superType` a parsed leaf of `unit` carries, mirroring the dimension
 * parsers in `src/parsing/units.ts` (length → `["length", "absolute"|"relative"]`,
 * angle → `["angle"]`, unitless → `undefined`). Used by `functionIdentityValue`
 * so a synthesised identity reconciles with a real parsed sibling in
 * `normalizeValueUnits`.
 */
function superTypeForUnit(unit?: string): string[] | undefined {
    if (unit == null) return undefined;
    if ((LENGTH_UNITS as readonly string[]).includes(unit)) {
        const kind = (ABSOLUTE_LENGTH_UNITS as readonly string[]).includes(unit)
            ? "absolute"
            : (RELATIVE_LENGTH_UNITS as readonly string[]).includes(unit)
              ? "relative"
              : undefined;
        return kind ? ["length", kind] : ["length"];
    }
    if ((ANGLE_UNITS as readonly string[]).includes(unit)) return ["angle"];
    if ((TIME_UNITS as readonly string[]).includes(unit)) return ["time"];
    if ((PERCENTAGE_UNITS as readonly string[]).includes(unit)) return ["percentage"];
    return undefined;
}

/**
 * The CSS identity `ValueUnit` for a `<filter-function>` / `<transform-function>`
 * argument slot, by function name (MCI-5, tranche-N W7).
 *
 * The value-domain knowledge value.js owns so an interpolation arity pad is
 * **identity-aware**: when one endpoint has more functions than the other
 * (`filter: blur(4px)` vs `blur(4px) brightness(2)`), the shorter side's absent
 * slot must be padded with `brightness(1)`, NOT `new ValueUnit(0)` — so the slot
 * lerps `1 → 2` and holds the no-op `1` at `t=0` instead of `0` (black). The
 * synthesised leaf carries the function's identity unit (`hue-rotate` → `0deg`,
 * `blur` → `0px`, `brightness` → unitless `1`) and the matching `superType`, so
 * `normalizeValueUnits` reconciles it with the present sibling.
 *
 * Returns `undefined` for a function with no single-scalar identity (custom /
 * unknown, or composites like `drop-shadow`/`perspective`); the caller (the
 * keyframes pad) falls back to its prior `new ValueUnit(0)` behaviour, so an
 * unknown function is no worse off than before MCI-5.
 *
 * `argIndex` is accepted for symmetry with multi-argument functions but is
 * currently unused: every supported function's positional arguments share one
 * identity scalar (`scale(1, 1)`, `translate(0, 0)`).
 */
export function functionIdentityValue(
    name: string,
    argIndex?: number,
): ValueUnit<number> | undefined {
    void argIndex; // accepted for symmetry; every supported fn shares one identity
    const identity = FUNCTION_IDENTITY[name];
    if (identity == null) return undefined;
    return new ValueUnit<number>(
        identity.value,
        identity.unit,
        superTypeForUnit(identity.unit),
    );
}

export const flattenObject = (obj: any) => {
    const flat: Record<string, any> = {};

    // VJ-Q4 (1.2.0) — thread the enclosing CSS-function name down the recursion
    // so each flattened leaf is stamped with its `fnName` (the `scale` of
    // `scale(2)`). A `ValueUnit` leaf carries the name of the NEAREST enclosing
    // `FunctionValue`. `calc()` is atomic (no descent), so its leaf carries
    // `"calc"`. This is the `clone()`-stable provenance the keyframes.js S8
    // terminal reads (retiring the WeakMap + the restamp ceremony).
    const flatten = (
        obj: any,
        parentKey: string | undefined = undefined,
        fnName: string | undefined = undefined,
    ) => {
        if (Array.isArray(obj)) {
            obj.forEach((v) => flatten(v, parentKey, fnName));
            return;
        } else if (obj instanceof FunctionValue) {
            // Treat calc() as an atomic computed value — don't decompose the expression
            if (obj.name === "calc") {
                const innerExpr = obj.values.map((v) => v.toString()).join(", ");
                const calcUnit = new ValueUnit(
                    innerExpr,
                    "calc",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    obj.name,
                );
                const key = parentKey ?? "calc";
                if (flat[key] == null) {
                    flat[key] = new ValueArray();
                }
                flat[key].push(calcUnit);
                return;
            }

            let newKey = obj.name;

            if (parentKey) {
                if (!parentKey.endsWith(obj.name)) {
                    newKey = `${parentKey}.${obj.name}`;
                } else {
                    newKey = parentKey;
                }
            }

            // Descend with THIS function's name as the leaves' `fnName`.
            obj.values.forEach((v) => flatten(v, newKey, obj.name));

            return;
        } else if (isObject(obj)) {
            for (const [key, value] of Object.entries(obj)) {
                const currentKey = parentKey ? `${parentKey}.${key}` : key;
                // A plain-object descent crosses no function boundary — reset
                // `fnName` (the enclosing function context does not carry across
                // a nested object key).
                flatten(value, currentKey, undefined);
            }
            return;
        }

        const key = parentKey!;
        if (flat[key] == null) {
            flat[key] = new ValueArray();
        }

        // Stamp the enclosing function name onto the leaf (VJ-Q4). When the leaf
        // is a `ValueUnit` lacking its own `fnName`, inherit the enclosing one;
        // a leaf that already carries a name (a pre-stamped clone) keeps it.
        if (fnName !== undefined && obj instanceof ValueUnit && obj.fnName === undefined) {
            obj.fnName = fnName;
        }

        flat[key].push(obj);
    };

    flatten(obj);

    // Flatten each accumulated ValueArray ONCE, after the walk (S.W1 W1-7). The
    // prior per-leaf `.flat()` inside the recursion re-copied the whole array on
    // every push — O(N²) for a property accruing N leaves. One pass here is
    // output-identical (leaves are ValueUnits, never nested arrays) and O(N).
    for (const key of Object.keys(flat)) {
        flat[key] = flat[key].flat();
    }

    return flat;
};

/** A dynamically-built nested tree: object nodes keyed by string, array leaves. */
type UnflattenNode = Record<string, unknown> | unknown[];

export const unflattenObject = (flatObj: Record<string, any[]>): any => {
    const result: Record<string, unknown> = {};

    for (const [flatKey, values] of Object.entries(flatObj)) {
        const keys = flatKey.split(".");
        let current: UnflattenNode = result;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]!;
            const isLastKey = i === keys.length - 1;

            if (isLastKey) {
                if (Array.isArray(current)) {
                    current.push(values);
                } else {
                    current[key] = values;
                }
            } else {
                if (!Array.isArray(current) && !(key in current)) {
                    current[key] = {};
                }
                current = (current as Record<string, unknown>)[
                    key
                ] as UnflattenNode;
            }
        }
    }

    return result;
};

/**
 * Serialize a flat `{ "transform.translateX": [...] }` map back into the CSS
 * shorthand strings keyed by top-level property (`{ transform: "translateX(…)" }`).
 *
 * VJ-F4 / F8 (tranche-N W7) — buffer-reuse. The per-frame serialize is the real
 * garbage the W7 perf strand chased: a fresh `result` object plus the per-key
 * `left(`/`)`right` string churn. The optional `out` argument lets the caller
 * supply a reuse target that is **cleared and re-filled** in place, so a steady
 * rAF loop allocates no fresh object per frame. The output is byte-identical to
 * the no-arg form (the demo + keyframes serialize path round-trips through this
 * — the `.trim()` and leading-space join are preserved exactly); the reuse path
 * is purely opt-in via the second arg.
 */
export const unflattenObjectToString = (
    flatObj: Record<string, any[]>,
    out?: Record<string, string>,
): Record<string, string> => {
    const result = out ?? ({} as Record<string, string>);

    // Clear a supplied reuse target so a stale key from a prior frame cannot
    // leak through. Own enumerable keys only — mirrors a fresh `{}`.
    if (out) {
        for (const k of Object.keys(out)) {
            delete out[k];
        }
    }

    for (const [flatKey, values] of Object.entries(flatObj)) {
        const keys = flatKey.split(".");
        const propertyKey = keys[0]!;

        let current = result[propertyKey] ?? "";

        let leftS = "";
        let rightS = "";

        for (let i = 1; i < keys.length; i++) {
            leftS += `${keys[i]!}(`;
            rightS += ")";
        }

        let middleS = "";

        if (keys.length > 1 && Array.isArray(values)) {
            middleS = values.join(", ");
        } else {
            middleS = values.toString();
        }

        current += ` ${leftS}${middleS}${rightS}`;

        result[propertyKey] = current.trim();
    }

    return result;
};

const setStyleNames = new Set(STYLE_NAMES);

export function isCSSStyleName(value: any): value is (typeof STYLE_NAMES)[number] {
    return setStyleNames.has(value);
}

export const unpackMatrixValues = (value: FunctionValue): MatrixValues => {
    const name = value.name;
    const values = value.valueOf();

    if (!value.name.startsWith("matrix")) {
        throw new Error("Input must be a matrix or matrix3d value");
    }

    const defaultValues: MatrixValues = {
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        skewX: 0,
        skewY: 0,
        skewZ: 0,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        perspectiveX: 0,
        perspectiveY: 0,
        perspectiveZ: 0,
        perspectiveW: 1,
    };

    if (value.name === "matrix") {
        // 2D matrix: [a, b, c, d, tx, ty]
        return {
            ...defaultValues,
            scaleX: values[0] ?? 1,
            skewY: values[1] ?? 0,
            skewX: values[2] ?? 0,
            scaleY: values[3] ?? 1,
            translateX: values[4] ?? 0,
            translateY: values[5] ?? 0,
            // A 2D `matrix()` is planar — the ONLY rotation it can encode is the
            // in-plane rotateZ. The prior code derived rotateY/rotateX from the
            // same `a`/`b`/`c`/`d` cells via atan2, emitting nonsense
            // out-of-plane angles for a purely planar transform (lib-core P2-5).
            // The two out-of-plane rotations are identically 0.
            rotateZ: Math.atan2(values[1] ?? 0, values[0] ?? 1),
            rotateY: 0,
            rotateX: 0,
        };
    } else if (name === "matrix3d") {
        if (values.length === 4) {
            // Alternative 3D matrix form: [a4, b4, c4, d4]
            return {
                ...defaultValues,
                translateX: values[0] ?? 0,
                translateY: values[1] ?? 0,
                translateZ: values[2] ?? 0,
                perspectiveW: values[3] ?? 1,
            };
        } else if (values.length === 16) {
            // Standard 3D matrix: [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44]
            return {
                scaleX: values[0] ?? 1,
                skewY: values[1] ?? 0,
                skewX: values[4] ?? 0,
                scaleY: values[5] ?? 1,
                scaleZ: values[10] ?? 1,
                skewZ: values[2] ?? 0,
                translateX: values[12] ?? 0,
                translateY: values[13] ?? 0,
                translateZ: values[14] ?? 0,
                rotateX: Math.atan2(-(values[9] ?? 0), values[10] ?? 1),
                rotateY: Math.atan2(
                    values[8] ?? 0,
                    Math.sqrt(
                        Math.pow(values[0] ?? 1, 2) + Math.pow(values[1] ?? 0, 2),
                    ),
                ),
                rotateZ: Math.atan2(values[1] ?? 0, values[0] ?? 1),
                perspectiveX: values[3] ?? 0,
                perspectiveY: values[7] ?? 0,
                perspectiveZ: values[11] ?? 0,
                perspectiveW: values[15] ?? 1,
            };
        }
    }

    throw new Error("Unsupported matrix type or invalid number of values");
};

function findQueryContainer(element: HTMLElement): HTMLElement | null {
    let el = element.parentElement;
    while (el) {
        const ct = getComputedStyle(el).containerType;
        if (ct === "inline-size" || ct === "size") {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

function isVerticalWritingMode(el: HTMLElement): boolean {
    const wm = getComputedStyle(el).writingMode;
    return wm?.startsWith("vertical") || wm?.startsWith("sideways") || false;
}

/**
 * Every relative length unit that has a resolution branch in `convertToPixels`
 * or its helpers. A declared relative unit absent from this set has no
 * conversion and triggers the C5 fail-loud guard rather than a silent no-op.
 */
const HANDLED_RELATIVE_UNITS = new Set<string>([
    // font-relative (need an element / documentElement)
    "em", "rem", "ch", "ex", "cap", "ic", "lh", "rlh",
    // viewport + writing-mode (need window)
    "vw", "vh", "vmin", "vmax", "vi", "vb",
    "svw", "svh", "svi", "svb", "svmin", "svmax",
    "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
    "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
    // container-query (need a query container)
    "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
]);

/**
 * Resolve a viewport-relative length unit to pixels (C5).
 *
 * Covers the three CSS viewport variants — `sv*` (small, against
 * `visualViewport`), `lv*`/`dv*` (large/dynamic, against `innerWidth`/
 * `innerHeight`) — plus the writing-mode-relative `vi`/`vb`/`*vi`/`*vb`. Each
 * was previously a silent no-op (`50dvh` → `50px`). The `min`/`max` axes pick
 * the smaller/larger of the two physical dimensions per spec.
 *
 * `vh`/`vw`/`vmin`/`vmax` keep their existing branches in `convertToPixels`;
 * this handles their `s`/`l`/`d`-prefixed and inline/block siblings.
 *
 * Returns `null` when `unit` is not a recognised viewport unit, so the caller
 * can fall through to other unit families / the fail-loud guard.
 */
function convertViewportUnitToPixels(
    value: number,
    unit: string,
    element?: HTMLElement,
): number | null {
    const m = /^(sv|lv|dv|v)(w|h|i|b|min|max)$/.exec(unit);
    if (!m) return null;

    const variant = m[1]; // sv | lv | dv | v
    const axis = m[2]; // w | h | i | b | min | max

    // The `v` (no-prefix) variants other than the inline/block pair are already
    // handled by convertToPixels' dedicated branches; only `vi`/`vb` reach here.
    let width: number;
    let height: number;
    if (variant === "sv") {
        const vv = typeof window !== "undefined" ? window.visualViewport : undefined;
        width = vv?.width ?? window.innerWidth;
        height = vv?.height ?? window.innerHeight;
    } else {
        // lv / dv / v — the large/dynamic/default viewport.
        width = window.innerWidth;
        height = window.innerHeight;
    }

    // Inline/block resolve against writing mode; default horizontal when no
    // element is available (inline = horizontal = width, block = vertical = height).
    const isVertical = element ? isVerticalWritingMode(element) : false;

    let basis: number;
    switch (axis) {
        case "w":
            basis = width;
            break;
        case "h":
            basis = height;
            break;
        case "i":
            basis = isVertical ? height : width;
            break;
        case "b":
            basis = isVertical ? width : height;
            break;
        case "min":
            basis = Math.min(width, height);
            break;
        default: // max
            basis = Math.max(width, height);
            break;
    }

    return value * (basis / 100);
}

/**
 * Resolve a font-metric-relative length unit to pixels (C5): `cap`, `ic`,
 * `lh`, `rlh`. These previously no-op'd to raw px. Approximated from the
 * element's (or root's) computed font/line-height, mirroring the existing
 * `ex`/`ch` canvas-metric approach. Returns `null` for unrecognised units.
 */
function convertFontMetricUnitToPixels(
    value: number,
    unit: string,
    element?: HTMLElement,
): number | null {
    const styleEl =
        unit === "rlh"
            ? typeof document !== "undefined"
                ? document.documentElement
                : undefined
            : element;
    if (!styleEl) return null;

    const cs = getComputedStyle(styleEl);
    const fontSize = parseFloat(cs.fontSize) || 16;

    switch (unit) {
        case "lh":
        case "rlh": {
            const lh = parseFloat(cs.lineHeight);
            // `normal` line-height parses to NaN; approximate as 1.2 × font-size.
            const resolved = Number.isFinite(lh) ? lh : fontSize * 1.2;
            return value * resolved;
        }
        case "cap":
            // cap-height ≈ 0.7 × font-size (typical Latin cap-height ratio).
            return value * fontSize * 0.7;
        case "ic":
            // ideographic advance ≈ 1 × font-size (full-width glyph).
            return value * fontSize;
        default:
            return null;
    }
}

export function convertAbsoluteUnitToPixels(value: number, unit: string) {
    let pixels = value;
    if (unit === "cm") {
        pixels *= 96 / 2.54;
    } else if (unit === "mm") {
        pixels *= 96 / 25.4;
    } else if (unit === "Q") {
        pixels *= 96 / (25.4 * 4);
    } else if (unit === "in") {
        pixels *= 96;
    } else if (unit === "pt") {
        pixels *= 4 / 3;
    } else if (unit === "pc") {
        pixels *= 16;
    }

    return pixels;
}

export function convertToPixels(
    value: number,
    unit:
        | (typeof ABSOLUTE_LENGTH_UNITS)[number]
        | (typeof RELATIVE_LENGTH_UNITS)[number]
        | (typeof PERCENTAGE_UNITS)[number],
    element?: HTMLElement,
    property?: string,
): number {
    if (unit === "em" && element) {
        value *= parseFloat(getComputedStyle(element).fontSize);
    } else if (unit === "rem") {
        value *= parseFloat(getComputedStyle(document.documentElement).fontSize);
    } else if (unit === "vh") {
        value *= window.innerHeight / 100;
    } else if (unit === "vw") {
        value *= window.innerWidth / 100;
    } else if (unit === "vmin") {
        value *= Math.min(window.innerHeight, window.innerWidth) / 100;
    } else if (unit === "vmax") {
        value *= Math.max(window.innerHeight, window.innerWidth) / 100;
    } else if (unit === "%" && element?.parentElement && property) {
        const parentValue = parseFloat(
            getComputedStyle(element.parentElement).getPropertyValue(property),
        );
        value = (value / 100) * parentValue;
    } else if (unit === "ch" && element) {
        // ch = width of "0" glyph; approximate via canvas when available.
        const fontSize = parseFloat(getComputedStyle(element).fontSize) || 16;
        // `getContext("2d")` is genuinely nullable (a headless/jsdom target, or
        // a browser that declines a 2D context, returns null). Narrow it
        // EXPLICITLY — the prior `as CanvasRenderingContext2D` asserted non-null,
        // then a blanket `catch {}` two lines later silently folded the resulting
        // null-deref into the same fallback as "measurement unavailable"
        // (legacy-sweep-src P2). Each `getContext` call is on one concrete class,
        // so no cast is needed.
        let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;
        if (typeof OffscreenCanvas !== "undefined") {
            ctx = new OffscreenCanvas(1, 1).getContext("2d");
        } else if (typeof document !== "undefined") {
            ctx = document.createElement("canvas").getContext("2d");
        }
        if (ctx) {
            ctx.font = `${fontSize}px ${getComputedStyle(element).fontFamily}`;
            const zeroWidth = ctx.measureText("0").width;
            value *= zeroWidth > 0 ? zeroWidth : fontSize * 0.5;
        } else {
            // No 2D context available — fall back to the x-height approximation.
            value *= fontSize * 0.5;
        }
    } else if (unit === "ex" && element) {
        // ex ≈ x-height; approximate as 0.5 × font-size
        const fontSize = parseFloat(getComputedStyle(element).fontSize) || 16;
        value *= fontSize * 0.5;
    } else if (
        (unit === "cqw" || unit === "cqh" || unit === "cqi" || unit === "cqb" || unit === "cqmin" || unit === "cqmax") &&
        element
    ) {
        const container = findQueryContainer(element);
        if (container) {
            const cw = container.clientWidth;
            const ch = container.clientHeight;
            const isVertical = isVerticalWritingMode(container);
            const inlineSize = isVertical ? ch : cw;
            const blockSize = isVertical ? cw : ch;

            if (unit === "cqw") {
                value *= cw / 100;
            } else if (unit === "cqh") {
                value *= ch / 100;
            } else if (unit === "cqi") {
                value *= inlineSize / 100;
            } else if (unit === "cqb") {
                value *= blockSize / 100;
            } else if (unit === "cqmin") {
                value *= Math.min(cw, ch) / 100;
            } else {
                // cqmax
                value *= Math.max(cw, ch) / 100;
            }
        }
    } else {
        // vi/vb + the 18 sv*/lv*/dv* viewport units, then cap/ic/lh/rlh
        // font-metric units (C5 — previously silent no-ops).
        const viewport =
            typeof window !== "undefined"
                ? convertViewportUnitToPixels(value, unit, element)
                : null;
        const fontMetric =
            viewport === null ? convertFontMetricUnitToPixels(value, unit, element) : null;

        if (viewport !== null) {
            value = viewport;
        } else if (fontMetric !== null) {
            value = fontMetric;
        } else if (
            (RELATIVE_LENGTH_UNITS as readonly string[]).includes(unit) &&
            !HANDLED_RELATIVE_UNITS.has(unit)
        ) {
            // Fail-loud: a declared *relative* unit with NO resolution branch
            // reached here — a new unit added to the table without a conversion
            // would silently no-op otherwise (the exact C5 hazard). Units that
            // ARE handled but lack runtime context (e.g. `em` with no element,
            // a viewport unit with no `window`) fall through to graceful
            // degradation below, preserving the non-DOM-target contract.
            throw new Error(
                `convertToPixels: relative length unit "${unit}" has no resolution ` +
                    `branch. Add one in src/units/utils.ts (C5 fail-loud guard).`,
            );
        } else {
            // px, absolute units, and handled-but-context-less relative units
            // degrade to the raw value (the pre-C5 non-DOM contract).
            value = convertAbsoluteUnitToPixels(value, unit);
        }
    }

    return value;
}

export function convertToMs(value: number, unit: (typeof TIME_UNITS)[number]) {
    if (unit === "s") {
        value *= 1000;
    }
    return value;
}

export function convertToDegrees(value: number, unit: (typeof ANGLE_UNITS)[number]) {
    if (unit === "grad") {
        value *= 0.9;
    } else if (unit === "rad") {
        value *= 180 / Math.PI;
    } else if (unit === "turn") {
        value *= 360;
    }
    return value;
}

export function convertToHz(value: number, unit: (typeof FREQUENCY_UNITS)[number]) {
    if (unit === "kHz") {
        value *= 1000;
    }
    return value;
}

export function convertToDPI(value: number, unit: (typeof RESOLUTION_UNITS)[number]) {
    if (unit === "dpcm") {
        value *= 2.54;
    } else if (unit === "dppx") {
        value *= 96;
    }
    return value;
}

type ConversionFunction = (value: number, unit: any, target?: HTMLElement) => number;

const conversionFunctions: Record<string, ConversionFunction> = {
    length: convertToPixels as ConversionFunction,
    time: convertToMs as ConversionFunction,
    angle: convertToDegrees as ConversionFunction,
    frequency: convertToHz as ConversionFunction,
    resolution: convertToDPI as ConversionFunction,
};

type UnitGroupName = "length" | "time" | "angle" | "frequency" | "resolution";

// Widen the readonly tuple types once at the table — the runtime check is
// `.includes(string)`, which TS would otherwise reject because the tuples are
// declared `as const`. Widening at the table site preserves type safety at
// every other use of the unit-tuple constants.
const UNIT_GROUPS: ReadonlyArray<readonly [readonly string[], UnitGroupName]> = [
    [LENGTH_UNITS, "length"],
    [TIME_UNITS, "time"],
    [ANGLE_UNITS, "angle"],
    [FREQUENCY_UNITS, "frequency"],
    [RESOLUTION_UNITS, "resolution"],
];

function getUnitGroup(
    unit: (typeof UNITS)[number],
): readonly [readonly string[], UnitGroupName] | null {
    // UNITS includes `undefined` + `""` as sentinels; the unit-group tables
    // contain only non-empty strings, so an early bail-out narrows the type
    // for `.includes()` and dodges 5 redundant lookups for the sentinels.
    if (typeof unit !== "string" || unit === "") return null;
    for (const group of UNIT_GROUPS) {
        if (group[0].includes(unit)) return group;
    }
    return null;
}

function convert2(
    value: number,
    from: (typeof UNITS)[number],
    to: (typeof UNITS)[number],
    target?: HTMLElement,
): number {
    const fromGroup = getUnitGroup(from);
    const toGroup = getUnitGroup(to);

    if (!fromGroup || !toGroup || fromGroup[1] !== toGroup[1]) {
        throw new Error(`Incompatible units: ${from} and ${to}`);
    }

    const [, conversionType] = fromGroup;
    const convertToBase = conversionFunctions[conversionType]!;

    // Convert to base unit
    const baseValue = convertToBase(value, from as string, target);

    // Convert from base unit to target unit
    const conversionFactor = convertToBase(1, to as string, target);

    return baseValue / conversionFactor;
}

export { convert2 };
