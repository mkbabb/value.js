import { Color } from ".";
import type { ColorSpaceMap } from ".";
import { ValueUnit } from "..";
import { scale } from "../../math";
import { getColorSpaceBound, getColorSpaceDenormUnit } from "./constants";
import type { ColorSpace } from "./constants";
import { color2 } from "./dispatch";
import type { HueInterpolationMethod } from "./mix";

export type { HueInterpolationMethod };

export const normalizeColorUnitComponent = (
    v: number,
    unit: string | undefined,
    colorSpace: ColorSpace,
    component: string,
    inverse: boolean = false,
) => {
    // On the forward path `unit` may be absent (a numeric channel carries no
    // unit) — `getColorSpaceBound` then falls through to the `number` range.
    unit = inverse ? getColorSpaceDenormUnit(colorSpace, component) : unit;

    const { min, max } = getColorSpaceBound(colorSpace, component, unit ?? "");

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
        const channel = color[component];
        const value = ValueUnit.unwrapDeep(channel);
        const unit = channel instanceof ValueUnit ? channel.unit : undefined;

        color[component] = normalizeColorUnitComponent(
            value,
            unit,
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
        // Fully unwrap nested ValueUnits to prevent progressive nesting.
        // Conversion functions pass alpha through as-is, so if the input had
        // ValueUnit<number> components, alpha arrives still wrapped. Without
        // unwrapping, each frame adds a layer: VU<VU<VU<...>>> → stack overflow.
        // `ValueUnit.unwrapDeep` (G.W2 Lane D) is the codified form of this fix.
        convertedColor[key] = new ValueUnit(ValueUnit.unwrapDeep(value));
    });
    normalizedColorUnit.value = convertedColor;

    normalizedColorUnit.superType![1] = to as string;

    return inverse
        ? (normalizeColorUnit(
              normalizedColorUnit as ValueUnit<Color<ValueUnit<number>>, "color">,
              true,
              true,
          ) as ValueUnit<ColorSpaceMap<ValueUnit<number>>[C], "color">)
        : (normalizedColorUnit as ValueUnit<
              ColorSpaceMap<ValueUnit<number>>[C],
              "color"
          >);
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
