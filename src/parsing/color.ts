import {
    Color,
    HSLColor,
    HSVColor,
    HWBColor,
    KelvinColor,
    LABColor,
    LCHColor,
    OKLABColor,
    OKLCHColor,
    RGBColor,
    XYZColor,
} from "@src/units/color";
import P from "parsimmon";
import { ValueUnit } from "../units";
import { COLOR_NAMES } from "../units/color/constants";
import { hex2rgb, kelvin2rgb } from "../units/color/utils";
import { convertToDegrees } from "../units/utils";
import * as utils from "./utils";
import { CSSValueUnit, parseCSSValueUnit } from "./units";

const createColorValueUnit = (value: Color) => {
    return new ValueUnit(
        value,
        "color",
        ["color", value.colorSpace],
        undefined,
        "color",
    );
};

const colorOptionalAlpha = (r: P.Language, colorSpace: string) => {
    const name = P.string(colorSpace).skip(utils.opt(utils.istring("a")));

    const optionalAlpha = P.alt(
        P.seq(r.colorValue.skip(r.alphaSep), r.colorValue),
        P.seq(r.colorValue),
    );

    const args = P.seq(
        r.colorValue.skip(r.sep),
        r.colorValue.skip(r.sep),
        optionalAlpha,
    )
        .trim(P.optWhitespace)
        .wrap(P.string("("), P.string(")"));

    return name.then(args).map(([x, y, [z, a]]) => {
        return [x, y, z, a ?? new ValueUnit(1)];
    });
};

export const CSSColor = P.createLanguage({
    colorValue: () =>
        P.alt(
            CSSValueUnit.Percentage,
            CSSValueUnit.Angle.map((x) => {
                const deg = convertToDegrees(x.value, x.unit);
                return new ValueUnit(deg, "deg", ["angle"]);
            }),
            P.alt(utils.number, utils.integer).map((x) => new ValueUnit(x)),
            utils.none.map(() => new ValueUnit(0)),
        ),

    comma: () => P.string(","),
    space: () => P.regex(/\s+/),
    div: () => P.string("/"),

    sep: (r) => P.alt(r.comma.trim(P.optWhitespace), r.space),

    alphaSep: (r) => P.alt(r.div.trim(P.optWhitespace), r.sep),

    name: (r) =>
        P.alt(
            ...Object.keys(COLOR_NAMES)
                .sort((a, b) => b.length - a.length)
                .map(P.string),
        ).chain((x) => {
            const c = COLOR_NAMES[x];
            // Parse the color value as a r.Value:
            const value = parseCSSValueUnit(c);

            // Return the color value unit:
            if (value) {
                return P.succeed(value);
            } else {
                return P.fail(`Invalid color name: ${x}`);
            }
        }),

    hex: () =>
        P.regexp(/#[0-9a-fA-F]{3,8}/).map((x) => {
            const { r, g, b, alpha } = hex2rgb(x);
            return createColorValueUnit(new RGBColor(r, g, b, alpha));
        }),

    kelvin: () =>
        utils.number.skip(utils.istring("k")).map((kelvin) => {
            const rgb = kelvin2rgb(new KelvinColor(kelvin));
            return createColorValueUnit(rgb);
        }),

    rgb: (r) =>
        colorOptionalAlpha(r, "rgb").map(([r, g, b, alpha]) =>
            createColorValueUnit(new RGBColor(r, g, b, alpha)),
        ),

    hsl: (r) =>
        colorOptionalAlpha(r, "hsl").map(([h, s, l, alpha]) =>
            createColorValueUnit(new HSLColor(h, s, l, alpha)),
        ),

    hsv: (r) =>
        colorOptionalAlpha(r, "hsv").map(([h, s, v, alpha]) => {
            return createColorValueUnit(new HSVColor(h, s, v, alpha));
        }),

    hwb: (r) =>
        colorOptionalAlpha(r, "hwb").map(([h, w, b, alpha]) =>
            createColorValueUnit(new HWBColor(h, w, b, alpha)),
        ),

    lab: (r) =>
        colorOptionalAlpha(r, "lab").map(([l, a, b, alpha]) =>
            createColorValueUnit(new LABColor(l, a, b, alpha)),
        ),

    lch: (r) =>
        colorOptionalAlpha(r, "lch").map(([l, c, h, alpha]) =>
            createColorValueUnit(new LCHColor(l, c, h, alpha)),
        ),

    oklab: (r) =>
        colorOptionalAlpha(r, "oklab").map(([l, a, b, alpha]) =>
            createColorValueUnit(new OKLABColor(l, a, b, alpha)),
        ),

    oklch: (r) =>
        colorOptionalAlpha(r, "oklch").map(([l, c, h, alpha]) =>
            createColorValueUnit(new OKLCHColor(l, c, h, alpha)),
        ),

    xyz: (r) =>
        colorOptionalAlpha(r, "xyz").map(([x, y, z, alpha]) =>
            createColorValueUnit(new XYZColor(x, y, z, alpha)),
        ),

    Value: (r) =>
        P.alt(
            r.hex,
            r.kelvin,
            r.rgb,
            r.hsl,
            r.hsv,
            r.hwb,
            r.lab,
            r.lch,
            r.oklab,
            r.oklch,
            r.xyz,
            r.name,
        ).trim(P.optWhitespace),
});

export function parseCSSColor(input: string): ValueUnit {
    return CSSColor.Value.tryParse(input);
}
