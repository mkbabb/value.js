import {
    AdobeRGBColor,
    Color,
    ch,
    channelOf,
    setChannel,
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
} from "../units/color";
import { Parser, all, any, dispatch, regex, string, whitespace } from "@mkbabb/parse-that";
import { FunctionValue, ValueUnit } from "../units";
import { COLOR_NAMES } from "../units/color/constants";
import type { ColorSpace } from "../units/color/constants";
import type { ANGLE_UNITS } from "../units/constants";
import { normalizeColorUnit } from "../units/color/normalize";
import { color2, hex2rgb, mixColors } from "../units/color/dispatch";
import { kelvin2rgb } from "../units/color/conversions/kelvin";
import type { HueInterpolationMethod } from "../units/color/dispatch";
import { convertToDegrees } from "../units/utils";
import * as utils from "./utils";
import { memoize } from "../utils";
import { CSSValueUnit, parseCSSValueUnit } from "./units";
import { createCalcParser, createMathFunctionParsers, evaluateMathFunction } from "./math";

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
    // Parser-produced color units always wrap a `Color<ValueUnit<number>>`
    // (see `createColorValueUnit`) — narrow the generic `ValueUnit` param to
    // the shape `normalizeColorUnit` requires.
    const normalized = normalizeColorUnit(
        colorUnit as ValueUnit<Color<ValueUnit<number>>, "color">,
    );
    const color = normalized.value;
    // `clone()` preserves the concrete subclass; the loop below overwrites
    // every channel slot with the unwrapped numeric value, so the cloned
    // instance is reinterpreted as a `Color<number>` for the writes.
    const plain = color.clone() as unknown as Color<number>;
    for (const key of color.keys()) {
        setChannel(plain, key, ch(ValueUnit.unwrapDeep(channelOf(color, key))));
    }
    return plain;
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
 * relationship with this file (units.ts ↔ color.ts), so the parser pair must
 * be created after both modules finish initialising.
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
    const result = new Ctor(...(values as [number, number, number]), alpha);
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
        // `CSSValueUnit.Angle` only produces angle-unit ValueUnits.
        const deg = convertToDegrees(
            x.value,
            x.unit as (typeof ANGLE_UNITS)[number],
        );
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
    const name = utils.istring(colorSpace).skip(utils.istring("a").opt());

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
    return utils.istring(cssName)
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
//
// Transposition (E.W1 Lane D / E-AUDIT-5 §9 item 2): rather than try each of
// the 155 names as a separate `istring()` branch via `any(...)` (155 sequential
// regex tests + 155 RegExp allocations at module init), we match a single
// broad CSS identifier regex once and then look the result up in the
// COLOR_NAMES table via O(1) object access. Case-insensitivity is preserved
// by lowercasing the captured identifier before the lookup (same semantics as
// the prior `istring()` + `x.toLowerCase()` chain).
const KNOWN_COLOR_NAMES: ReadonlySet<string> = new Set(Object.keys(COLOR_NAMES));

const namedColorIdent = regex(/[a-zA-Z][a-zA-Z0-9-]*/);

const nameParser: Parser<ValueUnit> = namedColorIdent.chain((x: string) => {
    const key = x.toLowerCase();
    if (KNOWN_COLOR_NAMES.has(key)) {
        const c = (COLOR_NAMES as Record<string, string>)[key];
        if (c) {
            const value = parseCSSValueUnit(c);
            if (value) {
                return utils.succeed(value);
            }
        }
    }
    return utils.fail(`Invalid color name: ${x}`);
});

// --- Main CSSColor Value parser ---
//
// A1 transposition (vj-parser-aug §2.1): the 14-way speculative `any(...)` fork
// is replaced with an O(1) first-char `dispatch(table)`. Each functional-color
// family discriminates on its first character (`#`→hex, digit→kelvin, `r`→rgb,
// `o`→oklab/oklch, `h`→hsl/hsv/hwb, `l`→lab/lch, `c`→color-mix/color(),
// `x`→xyz). Named colors span ALL letters, so every letter bucket retains a
// trailing `nameParser` fallback and unlisted letters default to `nameParser` —
// preserving byte-identical output to the old in-order `any()` (the dispatch
// reaches the SAME parser the `any()` would, with the same per-bucket priority).
// The discriminating letter buckets: each functional family, with `nameParser`
// retained last so a same-first-letter named color (e.g. `red`, `orange`,
// `coral`, `hotpink`, `lavender`, `xyzname`) still resolves — byte-identical to
// the old in-order `any()` per-bucket priority.
const letterBuckets: Record<string, Parser<ValueUnit>> = {
    c: any(colorMix, colorFunction, nameParser),
    r: any(rgbParser, nameParser),
    h: any(hslParser, hsvParser, hwbParser, nameParser),
    l: any(labParser, lchParser, nameParser),
    o: any(oklabParser, oklchParser, nameParser),
    x: any(xyzParser, nameParser),
};
const dispatchTable: Record<string, Parser<ValueUnit>> = {
    "#": hex,
    "0-9": kelvin,
    "+": kelvin,
    "-": kelvin,
    ".": kelvin,
};
// Map every ASCII letter (both cases): a discriminating letter routes through
// its family bucket; every other letter starts only named colors → `nameParser`.
for (let cc = 97; cc <= 122; cc++) {
    const lower = String.fromCharCode(cc);
    const upper = lower.toUpperCase();
    const bucket = letterBuckets[lower] ?? nameParser;
    dispatchTable[lower] = bucket;
    dispatchTable[upper] = bucket;
}

const Value: Parser<ValueUnit> = dispatch(dispatchTable).trim(whitespace);

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
    // Custom-name registration changes the resolution of unrecognized inputs;
    // invalidate the memo cache so fallback lookups re-run.
    parseCSSColor.cache.clear();
}

export function clearCustomColorNames(): void {
    customColorNames.clear();
    parseCSSColor.cache.clear();
}

export function getCustomColorNames(): ReadonlyMap<string, string> {
    return customColorNames;
}

/**
 * Parse a CSS color string into a `ValueUnit<Color>`. Memoised — the returned
 * ValueUnit is shared across callers, so callers MUST NOT mutate it. Clone
 * before mutating if a per-call instance is needed.
 *
 * The cache is invalidated by `registerColorNames` and `clearCustomColorNames`.
 */
// keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see comment in
// src/parsing/index.ts.
export const parseCSSColor = memoize(
    (input: string): ValueUnit => {
        // F7 — try the custom-name map BEFORE the speculative rich parse.
        // The rich parser fails on a registered custom name, and parse-that's
        // top-level `parseState` fires `console.error(state.toString())` on
        // that expected failure — a per-parse console-I/O leak on every custom
        // color name. A `Map.get` first elides it (bounded, iso: when no custom
        // names are registered the map is empty and this is a no-op, so the
        // rich parser still resolves built-ins exactly as before).
        // (vj-parser-aug §2.3 fix (b).)
        if (customColorNames.size > 0) {
            const key = input.trim().toLowerCase();
            const resolved = customColorNames.get(key);
            if (resolved) {
                return utils.tryParse(Value, resolved);
            }
        }

        const result = utils.parseResult(Value, input);
        if (result.status) {
            return result.value;
        }

        // Re-throw original parse failure
        return utils.tryParse(Value, input);
    },
    { keyFn: (input: string) => input },
);
