/**
 * Shared color conversion utilities for the demo app.
 *
 * Bridges the parsed CSS color world (Color<ValueUnit<number>>)
 * with the math world (Color<number>) that mixColors/color2 expect.
 */

import type { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import { COLOR_SPACE_RANGES } from "@src/units/color/constants";
import { ValueUnit } from "@src/units";
import { parseCSSColor } from "@src/parsing/color";
import { normalizeColorUnit, colorUnit2 } from "@src/units/color/normalize";
import { color2 } from "@src/units/color/utils";
import { scale } from "@src/math";

/**
 * Parse a CSS color string → normalized Color<number> in the given space.
 * Components are in [0, 1]. Returns null on parse failure.
 */
export function cssToRawColor(css: string, space: ColorSpace): Color<number> | null {
    const parsed = parseCSSColor(css);
    if (!parsed) return null;

    const unit = normalizeColorUnit(parsed as any);
    const converted = colorUnit2(unit, space, true, false, false);
    const color = converted.value;

    // Unwrap ValueUnit<number> → number for each component
    const rawValues: number[] = [];
    for (const [key] of color.entries()) {
        if (key === "alpha") continue;
        const v = color[key];
        rawValues.push(v instanceof ValueUnit ? v.value : (v as number));
    }
    const alpha = color.alpha instanceof ValueUnit
        ? (color.alpha as any).value
        : (color.alpha as number);

    const Ctor = color.constructor as new (...args: any[]) => Color<number>;
    return new Ctor(...rawValues, alpha);
}

/**
 * Convert a raw Color<number> (normalized [0,1]) to a CSS string.
 * Denormalizes from [0,1] back to the physical ranges of the output space.
 *
 * @param color  Color with normalized components
 * @param outputSpace  Optional space to convert to before output. If omitted, uses the color's native space.
 */
export function rawColorToCSS(color: Color<number>, outputSpace?: ColorSpace): string {
    const out = outputSpace ? color2(color, outputSpace) : color;
    const space = out.colorSpace;
    const ranges = COLOR_SPACE_RANGES[space] as Record<string, Record<string, { min: number; max: number }>>;

    const parts: string[] = [];
    for (const [key] of out.entries()) {
        if (key === "alpha") continue;
        const range = ranges[key]?.number ?? { min: 0, max: 1 };
        const denorm = scale(out[key] as number, 0, 1, range.min, range.max);
        parts.push(formatNum(denorm));
    }

    const alpha = out.alpha as number;
    return `${space}(${parts.join(" ")} / ${formatNum(alpha)})`;
}

function formatNum(v: number): string {
    if (!Number.isFinite(v)) return "none";
    const s = v.toFixed(4);
    // Trim trailing zeros: "0.5000" → "0.5", "1.0000" → "1"
    return s.replace(/\.?0+$/, "");
}
