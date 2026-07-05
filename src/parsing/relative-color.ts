import { FunctionValue, ValueUnit } from "../units";
import {
    AdobeRGBColor,
    Color,
    DisplayP3Color,
    HSLColor,
    HWBColor,
    LABColor,
    LCHColor,
    LinearSRGBColor,
    OKLABColor,
    OKLCHColor,
    ProPhotoRGBColor,
    RGBColor,
    Rec2020Color,
    XYZColor,
} from "../units/color";
import type { ColorSpace } from "../units/color/constants";
import { color2 } from "../units/color/dispatch";
import * as utils from "./utils";
import { CSSValueUnit } from "./units";
import { createCalcParser, createMathFunctionParsers, evaluateMathFunction } from "./math";
import { createColorValueUnit, resolveToPlainColor } from "./color-unit";

// ─── Relative color syntax resolution (CSS Color L5) ───────────────────────
//
// Extracted from `color.ts` (W1-8 · god-module-dry-census): the semantic
// RESOLUTION of `<space>(from <origin> <c1> <c2> <c3> / <a>)` — origin →
// target-space conversion → per-component expression evaluation → result
// construction. These are pure helper functions + a lazily-built calc
// sub-parser, NOT part of `color.ts`'s recursive grammar spine (the
// `relativeColorParser` combinator, which references `CSSColor.Value`, stays in
// `color.ts` and calls `resolveRelativeColor` from here). Separating the
// resolution concern from the grammar keeps `color.ts` focused on the parser.

// Phase 5: Relative color syntax helpers

export type ComponentExpr =
    | { type: "ref"; name: string }
    | { type: "calc"; expr: string }
    | { type: "literal"; value: number }
    | { type: "none" };

/** Component names for each target color space. */
const COLOR_SPACE_COMPONENTS: Record<string, string[]> = {
    rgb: ["r", "g", "b"],
    hsl: ["h", "s", "l"],
    hwb: ["h", "w", "b"],
    lab: ["l", "a", "b"],
    lch: ["l", "c", "h"],
    oklab: ["l", "a", "b"],
    oklch: ["l", "c", "h"],
    xyz: ["x", "y", "z"],
    "srgb-linear": ["r", "g", "b"],
    "display-p3": ["r", "g", "b"],
    "a98-rgb": ["r", "g", "b"],
    "prophoto-rgb": ["r", "g", "b"],
    rec2020: ["r", "g", "b"],
};

/**
 * Internal calc-expression parser, built on top of the same `createCalcParser`
 * surface used by `parseCSSValue`. Accepts a bare arithmetic expression (the
 * inside of a `calc(...)` already-substituted with numeric bindings) and
 * returns the parsed AST (`FunctionValue | ValueUnit`).
 *
 * Invariant D6: no `new Function`, no `eval`. The math AST is evaluated via
 * the library's published `evaluateMathFunction` surface.
 *
 * Lazy initialization via a closure — `CSSValueUnit` is in a circular module
 * relationship with this file (units.ts ↔ color.ts ↔ relative-color.ts), so the
 * parser pair must be created after those modules finish initialising.
 */
let _relativeCalcExpr: ReturnType<typeof createCalcParser> | null = null;
function getRelativeCalcExpr() {
    if (_relativeCalcExpr) return _relativeCalcExpr;
    const { mathFunction } = createMathFunctionParsers(CSSValueUnit.Value);
    _relativeCalcExpr = createCalcParser(CSSValueUnit.Value, mathFunction);
    return _relativeCalcExpr;
}

/**
 * Evaluate the bare arithmetic body of a relative-color `calc(...)` expression
 * (e.g. `"r * 0.5 + 0.3"`) after numeric binding substitution. Routes through
 * the library's `evaluateMathFunction` rather than `new Function`.
 *
 * Throws on parse / evaluation failure — relative color syntax should fail at
 * the validation boundary, not silently return NaN.
 */
function evaluateRelativeCalc(expr: string): number {
    const ast = utils.tryParse(getRelativeCalcExpr(), expr);
    if (ast instanceof ValueUnit) {
        return ast.value as number;
    }
    if (ast instanceof FunctionValue) {
        const result = evaluateMathFunction(ast);
        if (result == null || typeof result.value !== "number") {
            throw new Error(`Could not evaluate calc expression: ${expr}`);
        }
        return result.value;
    }
    throw new Error(`Could not evaluate calc expression: ${expr}`);
}

function resolveExpr(expr: ComponentExpr, bindings: Record<string, number>): number {
    switch (expr.type) {
        case "ref":
            return bindings[expr.name] ?? 0;
        case "literal":
            return expr.value;
        case "none":
            return NaN;
        case "calc": {
            let s = expr.expr;
            // Substitute longer names first (alpha before a)
            const keys = Object.keys(bindings).sort((a, b) => b.length - a.length);
            for (const k of keys) {
                s = s.replace(new RegExp(`\\b${k}\\b`, "g"), String(bindings[k]));
            }
            return evaluateRelativeCalc(s);
        }
    }
}

export function resolveRelativeColor(
    originUnit: ValueUnit,
    targetSpace: ColorSpace,
    componentExprs: ComponentExpr[],
    alphaExpr: ComponentExpr | undefined,
): ValueUnit {
    // Normalize origin color to plain [0,1] values, then convert to target space
    const plainOrigin = resolveToPlainColor(originUnit);
    const converted = color2(plainOrigin, targetSpace);

    // Build bindings from the converted color
    const bindings: Record<string, number> = {};
    for (const [key, val] of converted.entries()) {
        bindings[key] = val as number;
    }

    // Resolve each component expression
    const values = componentExprs.map((expr) => resolveExpr(expr, bindings));
    const alpha = alphaExpr ? resolveExpr(alphaExpr, bindings) : (bindings.alpha ?? 1);

    // Create result color
    const CONSTRUCTORS: Record<string, new (...args: any[]) => Color> = {
        rgb: RGBColor,
        hsl: HSLColor,
        hwb: HWBColor,
        lab: LABColor,
        lch: LCHColor,
        oklab: OKLABColor,
        oklch: OKLCHColor,
        xyz: XYZColor,
        "srgb-linear": LinearSRGBColor,
        "display-p3": DisplayP3Color,
        "a98-rgb": AdobeRGBColor,
        "prophoto-rgb": ProPhotoRGBColor,
        rec2020: Rec2020Color,
    };
    const Ctor = CONSTRUCTORS[targetSpace] ?? RGBColor;
    const result = new Ctor(...(values as [number, number, number]), alpha);
    return createColorValueUnit(result);
}
