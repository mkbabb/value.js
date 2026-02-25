import {
    AdobeRGBColor,
    Color,
    DisplayP3Color,
    HSLColor,
    HSVColor,
    HWBColor,
    KelvinColor,
    LABColor,
    LCHColor,
    LinearSRGBColor,
    OKLABColor,
    OKLCHColor,
    ProPhotoRGBColor,
    RGBColor,
    Rec2020Color,
    XYZColor,
} from "@src/units/color";
import P from "parsimmon";
import { ValueUnit } from "../units";
import { COLOR_NAMES } from "../units/color/constants";
import type { ColorSpace } from "../units/color/constants";
import { normalizeColorUnit } from "../units/color/normalize";
import { color2, hex2rgb, kelvin2rgb, mixColors } from "../units/color/utils";
import type { HueInterpolationMethod } from "../units/color/utils";
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

/** Resolve a parsed ValueUnit<Color<ValueUnit>> to a plain Color<number> with normalized [0,1] components. */
function resolveToPlainColor(colorUnit: ValueUnit): Color<number> {
    const normalized = normalizeColorUnit(colorUnit as any);
    const color = normalized.value;
    const plain = color.clone();
    for (const key of color.keys()) {
        const v = color[key];
        (plain as any)[key] = v instanceof ValueUnit ? v.value : v;
    }
    return plain as unknown as Color<number>;
}

// --- Phase 5: Relative color syntax helpers ---

type ComponentExpr =
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

/** Safe arithmetic evaluator: only allows digits, operators, parens, dots, whitespace. */
function evaluateSimpleCalc(expr: string): number {
    const sanitized = expr.replace(/[^0-9.+\-*/() e]/g, "");
    return new Function(`return (${sanitized})`)() as number;
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
            return evaluateSimpleCalc(s);
        }
    }
}

function resolveRelativeColor(
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
    const result = new Ctor(...values, alpha);
    return createColorValueUnit(result);
}

/** CSS color-mix() space name to internal ColorSpace mapping. */
const COLOR_MIX_SPACE_MAP: Record<string, ColorSpace> = {
    srgb: "rgb",
    "srgb-linear": "srgb-linear",
    "display-p3": "display-p3",
    "a98-rgb": "a98-rgb",
    "prophoto-rgb": "prophoto-rgb",
    rec2020: "rec2020",
    lab: "lab",
    oklab: "oklab",
    oklch: "oklch",
    hsl: "hsl",
    hwb: "hwb",
    lch: "lch",
    xyz: "xyz",
    "xyz-d65": "xyz",
    "xyz-d50": "xyz",
};

/** color() function space name to internal ColorSpace + constructor. */
const COLOR_FUNCTION_SPACES: Record<string, { space: ColorSpace; ctor: new (...args: any[]) => Color }> = {
    srgb: { space: "rgb", ctor: RGBColor },
    "srgb-linear": { space: "srgb-linear", ctor: LinearSRGBColor },
    "display-p3": { space: "display-p3", ctor: DisplayP3Color },
    "a98-rgb": { space: "a98-rgb", ctor: AdobeRGBColor },
    "prophoto-rgb": { space: "prophoto-rgb", ctor: ProPhotoRGBColor },
    rec2020: { space: "rec2020", ctor: Rec2020Color },
    xyz: { space: "xyz", ctor: XYZColor },
    "xyz-d65": { space: "xyz", ctor: XYZColor },
    "xyz-d50": { space: "xyz", ctor: XYZColor },
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

/** Build a relative color parser for a given space name (CSS function name). */
function relativeColorParser(r: P.Language, cssName: string, targetSpace: ColorSpace) {
    return P.string(cssName)
        .skip(utils.opt(utils.istring("a")))
        .then(
            P.seq(
                utils.istring("from")
                    .skip(P.optWhitespace)
                    .then(P.lazy(() => CSSColor.Value)),
                P.optWhitespace.then(r.componentExpr),
                P.optWhitespace.then(r.componentExpr),
                P.optWhitespace.then(r.componentExpr),
                utils.opt(
                    r.div.trim(P.optWhitespace).then(r.componentExpr),
                ),
            )
                .trim(P.optWhitespace)
                .wrap(P.string("("), P.string(")")),
        )
        .map(([origin, c1, c2, c3, alphaExpr]) => {
            return resolveRelativeColor(origin, targetSpace, [c1, c2, c3], alphaExpr);
        });
}

export const CSSColor: P.Language = P.createLanguage({
    colorValue: () =>
        P.alt(
            CSSValueUnit.Percentage,
            CSSValueUnit.Angle.map((x: ValueUnit) => {
                const deg = convertToDegrees(x.value, x.unit as any);
                return new ValueUnit(deg, "deg", ["angle"]);
            }),
            P.alt(utils.number, utils.integer).map((x) => new ValueUnit(x)),
            utils.none.map(() => new ValueUnit(NaN)),
        ),

    // Component expression for relative color syntax
    componentExpr: (r) =>
        P.alt(
            // calc(...)
            utils.istring("calc").then(
                P.regexp(/\(([^)]+)\)/, 1),
            ).map((expr): ComponentExpr => ({ type: "calc", expr })),
            // none
            utils.none.map((): ComponentExpr => ({ type: "none" })),
            // component reference (alpha must be tried before single 'a')
            P.regexp(/\b(alpha|r|g|b|h|s|l|c|w|a|x|y|z)\b/).map(
                (name): ComponentExpr => ({ type: "ref", name }),
            ),
            // literal number / percentage / angle
            r.colorValue.map((v: ValueUnit): ComponentExpr => ({ type: "literal", value: v.value })),
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
                .map(utils.istring),
        ).chain((x) => {
            const c = (COLOR_NAMES as Record<string, string>)[x];
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
        P.alt(
            relativeColorParser(r, "rgb", "rgb"),
            colorOptionalAlpha(r, "rgb").map(([r, g, b, alpha]) =>
                createColorValueUnit(new RGBColor(r, g, b, alpha)),
            ),
        ),

    hsl: (r) =>
        P.alt(
            relativeColorParser(r, "hsl", "hsl"),
            colorOptionalAlpha(r, "hsl").map(([h, s, l, alpha]) =>
                createColorValueUnit(new HSLColor(h, s, l, alpha)),
            ),
        ),

    hsv: (r) =>
        colorOptionalAlpha(r, "hsv").map(([h, s, v, alpha]) => {
            return createColorValueUnit(new HSVColor(h, s, v, alpha));
        }),

    hwb: (r) =>
        P.alt(
            relativeColorParser(r, "hwb", "hwb"),
            colorOptionalAlpha(r, "hwb").map(([h, w, b, alpha]) =>
                createColorValueUnit(new HWBColor(h, w, b, alpha)),
            ),
        ),

    lab: (r) =>
        P.alt(
            relativeColorParser(r, "lab", "lab"),
            colorOptionalAlpha(r, "lab").map(([l, a, b, alpha]) =>
                createColorValueUnit(new LABColor(l, a, b, alpha)),
            ),
        ),

    lch: (r) =>
        P.alt(
            relativeColorParser(r, "lch", "lch"),
            colorOptionalAlpha(r, "lch").map(([l, c, h, alpha]) =>
                createColorValueUnit(new LCHColor(l, c, h, alpha)),
            ),
        ),

    oklab: (r) =>
        P.alt(
            relativeColorParser(r, "oklab", "oklab"),
            colorOptionalAlpha(r, "oklab").map(([l, a, b, alpha]) =>
                createColorValueUnit(new OKLABColor(l, a, b, alpha)),
            ),
        ),

    oklch: (r) =>
        P.alt(
            relativeColorParser(r, "oklch", "oklch"),
            colorOptionalAlpha(r, "oklch").map(([l, c, h, alpha]) =>
                createColorValueUnit(new OKLCHColor(l, c, h, alpha)),
            ),
        ),

    xyz: (r) =>
        P.alt(
            relativeColorParser(r, "xyz", "xyz"),
            colorOptionalAlpha(r, "xyz").map(([x, y, z, alpha]) =>
                createColorValueUnit(new XYZColor(x, y, z, alpha)),
            ),
        ),

    // color-mix() parser
    colorMixSpace: () =>
        P.alt(
            utils.istring("srgb-linear").result("srgb-linear"),
            utils.istring("srgb").result("srgb"),
            utils.istring("display-p3").result("display-p3"),
            utils.istring("a98-rgb").result("a98-rgb"),
            utils.istring("prophoto-rgb").result("prophoto-rgb"),
            utils.istring("rec2020").result("rec2020"),
            utils.istring("oklab").result("oklab"),
            utils.istring("oklch").result("oklch"),
            utils.istring("lab").result("lab"),
            utils.istring("lch").result("lch"),
            utils.istring("hsl").result("hsl"),
            utils.istring("hwb").result("hwb"),
            utils.istring("xyz-d65").result("xyz-d65"),
            utils.istring("xyz-d50").result("xyz-d50"),
            utils.istring("xyz").result("xyz"),
        ),

    colorMixHueMethod: () =>
        P.alt(
            utils.istring("shorter"),
            utils.istring("longer"),
            utils.istring("increasing"),
            utils.istring("decreasing"),
        )
            .skip(P.optWhitespace)
            .skip(utils.istring("hue")),

    colorMixColorPct: (r) =>
        P.seq(
            r.Value,
            utils.opt(P.optWhitespace.then(CSSValueUnit.Percentage)),
        ),

    colorMix: (r) =>
        utils
            .istring("color-mix")
            .then(
                P.seq(
                    // "in <space> [<hueMethod>]"
                    utils
                        .istring("in")
                        .skip(P.optWhitespace)
                        .then(
                            P.seq(
                                r.colorMixSpace,
                                utils.opt(P.optWhitespace.then(r.colorMixHueMethod)),
                            ),
                        ),
                    // ", <color> [<pct>]?"
                    P.string(",")
                        .trim(P.optWhitespace)
                        .then(r.colorMixColorPct),
                    // ", <color> [<pct>]?"
                    P.string(",")
                        .trim(P.optWhitespace)
                        .then(r.colorMixColorPct),
                )
                    .trim(P.optWhitespace)
                    .wrap(P.string("("), P.string(")")),
            )
            .map(([[spaceName, hueMethod], [color1Unit, pct1], [color2Unit, pct2]]) => {
                const space = COLOR_MIX_SPACE_MAP[spaceName] ?? "oklab";
                const method: HueInterpolationMethod = (hueMethod as HueInterpolationMethod) ?? "shorter";

                // Resolve percentages (default 50% if omitted)
                let p1 = pct1 != null ? pct1.value / 100 : -1;
                let p2 = pct2 != null ? pct2.value / 100 : -1;

                // CSS spec: if one is omitted, it's the complement of the other
                if (p1 < 0 && p2 < 0) {
                    p1 = 0.5;
                    p2 = 0.5;
                } else if (p1 < 0) {
                    p1 = 1 - p2;
                } else if (p2 < 0) {
                    p2 = 1 - p1;
                }

                // Resolve both colors to plain normalized Color<number>
                const c1 = resolveToPlainColor(color1Unit);
                const c2 = resolveToPlainColor(color2Unit);

                const mixed = mixColors(c1, c2, p1, p2, space, method);
                return createColorValueUnit(mixed);
            }),

    // CSS color() function: color(<space> c1 c2 c3 [/ alpha])
    colorFunction: (r) =>
        utils.istring("color").then(
            P.seq(
                P.alt(
                    utils.istring("srgb-linear").result("srgb-linear"),
                    utils.istring("srgb").result("srgb"),
                    utils.istring("display-p3").result("display-p3"),
                    utils.istring("a98-rgb").result("a98-rgb"),
                    utils.istring("prophoto-rgb").result("prophoto-rgb"),
                    utils.istring("rec2020").result("rec2020"),
                    utils.istring("xyz-d65").result("xyz-d65"),
                    utils.istring("xyz-d50").result("xyz-d50"),
                    utils.istring("xyz").result("xyz"),
                ).skip(P.optWhitespace),
                r.colorValue.skip(P.optWhitespace),
                r.colorValue.skip(P.optWhitespace),
                P.alt(
                    P.seq(
                        r.colorValue.skip(r.div.trim(P.optWhitespace)),
                        r.colorValue,
                    ),
                    r.colorValue.map((v: ValueUnit) => [v, undefined]),
                ),
            )
                .trim(P.optWhitespace)
                .wrap(P.string("("), P.string(")")),
        ).map(([spaceName, c1, c2, [c3, alphaVal]]: [string, ValueUnit, ValueUnit, [ValueUnit, ValueUnit | undefined]]) => {
            const mapping = COLOR_FUNCTION_SPACES[spaceName];
            if (!mapping) {
                throw new Error(`Unknown color() space: ${spaceName}`);
            }

            const alpha = alphaVal ?? new ValueUnit(1);

            // color(srgb ...) values are [0,1] but RGBColor expects [0,255] for normalization
            if (spaceName === "srgb") {
                const scale = (v: ValueUnit) => new ValueUnit(v.value * 255, v.unit, v.superType);
                return createColorValueUnit(new RGBColor(scale(c1), scale(c2), scale(c3), alpha));
            }

            const result = new mapping.ctor(c1, c2, c3, alpha);
            return createColorValueUnit(result);
        }),

    Value: (r) =>
        P.alt(
            r.colorMix,
            r.colorFunction,
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
