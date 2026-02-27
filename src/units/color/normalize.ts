import { Color } from ".";
import type { ColorSpaceMap } from ".";
import { ValueUnit } from "..";
import { scale } from "../../math";
import { COLOR_SPACE_RANGES, COLOR_SPACE_DENORM_UNITS } from "./constants";
import type { ColorSpace } from "./constants";
import { color2 } from "./utils";
import type { HueInterpolationMethod } from "./utils";

export type { HueInterpolationMethod };

const getColorSpaceBounds = (
    unit: string,
    colorSpace: ColorSpace,
    component: string,
) => {
    const ranges = (COLOR_SPACE_RANGES[colorSpace] as any)[component];
    return ranges[unit] ?? ranges.number;
};

export const normalizeColorUnitComponent = (
    v: number,
    unit: string,
    colorSpace: ColorSpace,
    component: string,
    inverse: boolean = false,
) => {
    unit = inverse ? (COLOR_SPACE_DENORM_UNITS[colorSpace] as any)[component] : unit;

    const { min, max } = getColorSpaceBounds(unit, colorSpace, component);

    const [toMin, toMax, fromMin, fromMax] = inverse
        ? [min, max, 0, 1]
        : [0, 1, min, max];

    const value = scale(v, fromMin, fromMax, toMin, toMax);

    return new ValueUnit(value, inverse ? unit : "");
};

export const normalizeColor = (
    color: Color<ValueUnit<number> | number>,
    inverse: boolean = false,
) => {
    const colorSpace = color.colorSpace;

    color.keys().forEach((component) => {
        const value =
            color[component] instanceof ValueUnit
                ? color[component].value
                : color[component];

        color[component] = normalizeColorUnitComponent(
            value,
            color[component]?.unit,
            colorSpace,
            component,
            inverse,
        );
    });

    return color as Color<ValueUnit<number>>;
};

export const normalizeColorUnit = (
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    inverse: boolean = false,
    inplace: boolean = false,
): ValueUnit<Color<ValueUnit<number>>, "color"> => {
    color = inplace ? color : color.clone() as typeof color;

    const normalizedColor = normalizeColor(color.value, inverse);

    if (inplace) {
        return color;
    } else {
        return new ValueUnit(normalizedColor).coalesce(color, true) as ValueUnit<Color<ValueUnit<number>>, "color">;
    }
};

export const colorUnit2 = <C extends ColorSpace>(
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    to: C | null = "oklab" as C,
    normalized: boolean = false,
    inverse: boolean = false,
    inplace: boolean = false,
): ValueUnit<ColorSpaceMap<ValueUnit<number>>[C], "color"> => {
    const normalizedColorUnit = (normalized
        ? inplace
            ? color
            : color.clone()
        : normalizeColorUnit(color, false, inplace)) as ValueUnit<Color<ValueUnit<number>>, "color">;

    const convertedColor = color2(normalizedColorUnit.toJSON(), to!);

    convertedColor.entries().forEach(([key, value]) => {
        convertedColor[key] = new ValueUnit(value);
    });
    normalizedColorUnit.value = convertedColor;

    normalizedColorUnit.superType![1] = to as string;

    return inverse
        ? (normalizeColorUnit(normalizedColorUnit as ValueUnit<Color<ValueUnit<number>>, "color">, true, true) as any)
        : normalizedColorUnit as ValueUnit<ColorSpaceMap<ValueUnit<number>>[C], "color">;
};

export const normalizeColorUnits = (
    a: ValueUnit<Color<ValueUnit<number>>, "color">,
    b: ValueUnit<Color<ValueUnit<number>>, "color">,
    to: ColorSpace = "oklab",
    normalized: boolean = false,
    inverse: boolean = false,
    inplace: boolean = false,
    hueMethod?: HueInterpolationMethod,
) => {
    return [
        colorUnit2(a, to, normalized, inverse, inplace),
        colorUnit2(b, to, normalized, inverse, inplace),
        hueMethod,
    ] as const;
};
