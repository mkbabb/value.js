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
import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import { ValueUnit } from "../units";
import { COLOR_NAMES } from "../units/color/constants";
import type { ColorSpace } from "../units/color/constants";
import { normalizeColorUnit } from "../units/color/normalize";
import { color2, hex2rgb, kelvin2rgb, mixColors } from "../units/color/utils";
import type { HueInterpolationMethod } from "../units/color/utils";
import { convertToDegrees } from "../units/utils";
import * as utils from "./utils";
import { CSSValueUnit, parseCSSValueUnit } from "./units";

const createColorValueUnit = (value: Color<any>) => {
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

// --- Shared sub-parsers ---

const comma = string(",");
const space_ = regex(/\s+/);
const div = string("/");
const lparen = string("(");
const rparen = string(")");

const sep = any(comma.trim(whitespace), space_);
const alphaSep = any(div.trim(whitespace), sep);

const colorValue: Parser<ValueUnit> = Parser.lazy(() => any(
    CSSValueUnit.Percentage,
    CSSValueUnit.Angle.map((x: ValueUnit) => {
        const deg = convertToDegrees(x.value, x.unit as any);
        return new ValueUnit(deg, "deg", ["angle"]);
    }),
    any(utils.number, utils.integer).map((x: number) => new ValueUnit(x)),
    utils.none.map(() => new ValueUnit(NaN)),
));

// Component expression for relative color syntax
const componentExpr: Parser<ComponentExpr> = any(
    // calc(...)
    utils.istring("calc").next(
        regex(/\(([^)]+)\)/, (m) => m?.[1] ?? null),
    ).map((expr: string): ComponentExpr => ({ type: "calc", expr })),
    // none
    utils.none.map((): ComponentExpr => ({ type: "none" })),
    // component reference (alpha must be tried before single 'a')
    regex(/\b(alpha|r|g|b|h|s|l|c|w|a|x|y|z)\b/).map(
        (name: string): ComponentExpr => ({ type: "ref", name }),
    ),
    // literal number / percentage / angle
    colorValue.map((v: ValueUnit): ComponentExpr => ({ type: "literal", value: v.value })),
);

// --- Color parser helpers ---

const colorOptionalAlpha = (colorSpace: string) => {
    const name = string(colorSpace).skip(utils.istring("a").opt());

    const optionalAlpha = any(
        all(colorValue.skip(alphaSep), colorValue),
        colorValue.map((v: ValueUnit) => [v] as [ValueUnit]),
    );

    const args = all(
        colorValue.skip(sep),
        colorValue.skip(sep),
        optionalAlpha,
    )
        .trim(whitespace)
        .wrap(lparen, rparen);

    return name.next(args).map(([x, y, [z, a]]: [ValueUnit, ValueUnit, [ValueUnit, ValueUnit?]]) => {
        return [x, y, z, a ?? new ValueUnit(1)] as [ValueUnit, ValueUnit, ValueUnit, ValueUnit];
    });
};

/** Build a relative color parser for a given space name (CSS function name). */
function relativeColorParser(cssName: string, targetSpace: ColorSpace) {
    return string(cssName)
        .skip(utils.istring("a").opt())
        .next(
            all(
                utils.istring("from")
                    .skip(whitespace)
                    .next(Parser.lazy(() => CSSColor.Value)),
                whitespace.next(componentExpr),
                whitespace.next(componentExpr),
                whitespace.next(componentExpr),
                div.trim(whitespace).next(componentExpr).opt(),
            )
                .trim(whitespace)
                .wrap(lparen, rparen),
        )
        .map(([origin, c1, c2, c3, alphaExpr]: [ValueUnit, ComponentExpr, ComponentExpr, ComponentExpr, ComponentExpr | undefined]) => {
            return resolveRelativeColor(origin, targetSpace, [c1, c2, c3], alphaExpr);
        });
}

// --- Individual color space parsers ---

const hex = regex(/#[0-9a-fA-F]{3,8}/).map((x: string) => {
    const { r, g, b, alpha } = hex2rgb(x);
    return createColorValueUnit(new RGBColor(r, g, b, alpha));
});

const kelvin = utils.number.skip(utils.istring("k")).map((k: number) => {
    const rgb = kelvin2rgb(new KelvinColor(k));
    return createColorValueUnit(rgb);
});

const rgbParser: Parser<ValueUnit> = any(
    relativeColorParser("rgb", "rgb"),
    colorOptionalAlpha("rgb").map(([r, g, b, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new RGBColor(r, g, b, alpha)),
    ),
);

const hslParser: Parser<ValueUnit> = any(
    relativeColorParser("hsl", "hsl"),
    colorOptionalAlpha("hsl").map(([h, s, l, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new HSLColor(h, s, l, alpha)),
    ),
);

const hsvParser: Parser<ValueUnit> = colorOptionalAlpha("hsv").map(
    ([h, s, v, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) => {
        return createColorValueUnit(new HSVColor(h, s, v, alpha));
    },
);

const hwbParser: Parser<ValueUnit> = any(
    relativeColorParser("hwb", "hwb"),
    colorOptionalAlpha("hwb").map(([h, w, b, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new HWBColor(h, w, b, alpha)),
    ),
);

const labParser: Parser<ValueUnit> = any(
    relativeColorParser("lab", "lab"),
    colorOptionalAlpha("lab").map(([l, a, b, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new LABColor(l, a, b, alpha)),
    ),
);

const lchParser: Parser<ValueUnit> = any(
    relativeColorParser("lch", "lch"),
    colorOptionalAlpha("lch").map(([l, c, h, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new LCHColor(l, c, h, alpha)),
    ),
);

const oklabParser: Parser<ValueUnit> = any(
    relativeColorParser("oklab", "oklab"),
    colorOptionalAlpha("oklab").map(([l, a, b, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new OKLABColor(l, a, b, alpha)),
    ),
);

const oklchParser: Parser<ValueUnit> = any(
    relativeColorParser("oklch", "oklch"),
    colorOptionalAlpha("oklch").map(([l, c, h, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new OKLCHColor(l, c, h, alpha)),
    ),
);

const xyzParser: Parser<ValueUnit> = any(
    relativeColorParser("xyz", "xyz"),
    colorOptionalAlpha("xyz").map(([x, y, z, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new XYZColor(x, y, z, alpha)),
    ),
);

// --- color-mix() parser ---

const colorMixSpace = any(
    utils.istring("srgb-linear").map(() => "srgb-linear"),
    utils.istring("srgb").map(() => "srgb"),
    utils.istring("display-p3").map(() => "display-p3"),
    utils.istring("a98-rgb").map(() => "a98-rgb"),
    utils.istring("prophoto-rgb").map(() => "prophoto-rgb"),
    utils.istring("rec2020").map(() => "rec2020"),
    utils.istring("oklab").map(() => "oklab"),
    utils.istring("oklch").map(() => "oklch"),
    utils.istring("lab").map(() => "lab"),
    utils.istring("lch").map(() => "lch"),
    utils.istring("hsl").map(() => "hsl"),
    utils.istring("hwb").map(() => "hwb"),
    utils.istring("xyz-d65").map(() => "xyz-d65"),
    utils.istring("xyz-d50").map(() => "xyz-d50"),
    utils.istring("xyz").map(() => "xyz"),
);

const colorMixHueMethod = any(
    utils.istring("shorter"),
    utils.istring("longer"),
    utils.istring("increasing"),
    utils.istring("decreasing"),
)
    .skip(whitespace)
    .skip(utils.istring("hue"));

const colorMixColorPct: Parser<[ValueUnit, ValueUnit | undefined]> = Parser.lazy(() =>
    all(
        CSSColor.Value,
        whitespace.next(CSSValueUnit.Percentage).opt(),
    ) as Parser<[ValueUnit, ValueUnit | undefined]>,
);

const colorMix: Parser<ValueUnit> = utils
    .istring("color-mix")
    .next(
        all(
            // "in <space> [<hueMethod>]"
            utils
                .istring("in")
                .skip(whitespace)
                .next(
                    all(
                        colorMixSpace,
                        whitespace.next(colorMixHueMethod).opt(),
                    ),
                ),
            // ", <color> [<pct>]?"
            string(",")
                .trim(whitespace)
                .next(colorMixColorPct),
            // ", <color> [<pct>]?"
            string(",")
                .trim(whitespace)
                .next(colorMixColorPct),
        )
            .trim(whitespace)
            .wrap(lparen, rparen),
    )
    .map(([[spaceName, hueMethod], [color1Unit, pct1], [color2Unit, pct2]]: [[string, string | undefined], [ValueUnit, ValueUnit | undefined], [ValueUnit, ValueUnit | undefined]]) => {
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
    });

// --- CSS color() function ---

const colorFunctionSpaces = any(
    utils.istring("srgb-linear").map(() => "srgb-linear"),
    utils.istring("srgb").map(() => "srgb"),
    utils.istring("display-p3").map(() => "display-p3"),
    utils.istring("a98-rgb").map(() => "a98-rgb"),
    utils.istring("prophoto-rgb").map(() => "prophoto-rgb"),
    utils.istring("rec2020").map(() => "rec2020"),
    utils.istring("xyz-d65").map(() => "xyz-d65"),
    utils.istring("xyz-d50").map(() => "xyz-d50"),
    utils.istring("xyz").map(() => "xyz"),
);

const colorFunction: Parser<ValueUnit> = utils.istring("color").next(
    all(
        colorFunctionSpaces.skip(whitespace),
        colorValue.skip(whitespace),
        colorValue.skip(whitespace),
        any(
            all(
                colorValue.skip(div.trim(whitespace)),
                colorValue,
            ),
            colorValue.map((v: ValueUnit) => [v, undefined] as [ValueUnit, undefined]),
        ),
    )
        .trim(whitespace)
        .wrap(lparen, rparen),
).map(([spaceName, c1, c2, [c3, alphaVal]]: [string, ValueUnit, ValueUnit, [ValueUnit, ValueUnit | undefined]]) => {
    const mapping = COLOR_FUNCTION_SPACES[spaceName];
    if (!mapping) {
        throw new Error(`Unknown color() space: ${spaceName}`);
    }

    const alpha = alphaVal ?? new ValueUnit(1);

    // color(srgb ...) values are [0,1] but RGBColor expects [0,255] for normalization
    if (spaceName === "srgb") {
        const s = (v: ValueUnit) => v.value * 255;
        return createColorValueUnit(new RGBColor(s(c1), s(c2), s(c3), alpha.value));
    }

    const result = new mapping.ctor(c1, c2, c3, alpha);
    // xyz-d50 values need Bradford adaptation to D65 (our internal XYZ reference)
    if (spaceName === "xyz-d50" && result instanceof XYZColor) {
        result.whitePoint = "D50";
    }
    return createColorValueUnit(result);
});

// --- Named color parser ---

const nameParser: Parser<ValueUnit> = any(
    ...Object.keys(COLOR_NAMES)
        .sort((a, b) => b.length - a.length)
        .map(utils.istring),
).chain((x: string) => {
    const c = (COLOR_NAMES as Record<string, string>)[x.toLowerCase()];
    if (c) {
        const value = parseCSSValueUnit(c);
        if (value) {
            return utils.succeed(value);
        }
    }
    return utils.fail(`Invalid color name: ${x}`);
});

// --- Main CSSColor Value parser ---

const Value: Parser<ValueUnit> = any(
    colorMix,
    colorFunction,
    hex,
    kelvin,
    rgbParser,
    hslParser,
    hsvParser,
    hwbParser,
    labParser,
    lchParser,
    oklabParser,
    oklchParser,
    xyzParser,
    nameParser,
).trim(whitespace);

export const CSSColor = {
    Value,
    colorValue,
    componentExpr,
    sep,
    alphaSep,
    div,
};

// --- Runtime custom color name registry ---

const customColorNames = new Map<string, string>();

export function registerColorNames(names: Record<string, string>): void {
    for (const [name, css] of Object.entries(names)) {
        customColorNames.set(name.trim().toLowerCase(), css);
    }
}

export function clearCustomColorNames(): void {
    customColorNames.clear();
}

export function getCustomColorNames(): ReadonlyMap<string, string> {
    return customColorNames;
}

export function parseCSSColor(input: string): ValueUnit {
    const result = utils.parseResult(Value, input);
    if (result.status) {
        return result.value;
    }

    // Fallback: check custom color names
    const key = input.trim().toLowerCase();
    const resolved = customColorNames.get(key);
    if (resolved) {
        return utils.tryParse(Value, resolved);
    }

    // Re-throw original parse failure
    return utils.tryParse(Value, input);
}
