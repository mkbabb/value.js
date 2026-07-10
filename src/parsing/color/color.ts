import {
    AdobeRGBColor,
    Color,
    DisplayP3Color,
    HSLColor,
    HSVColor,
    HWBColor,
    ICtCpColor,
    JzazbzColor,
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
    contrastColor as contrastColorEval,
} from "../../units/color";
import { Parser, all, any, dispatch, regex, string, whitespace } from "@mkbabb/parse-that";
import { FunctionValue, ValueUnit } from "../../units";
import { COLOR_NAMES } from "../../units/color/color-names";
import type { ColorSpace } from "../../units/color/constants";
import {
    clearCustomColorNames,
    getCustomColorNames,
    getCustomColorNamesMap,
    onColorNamesChange,
    registerColorNames,
} from "../../units/color/color-names";
import type { ANGLE_UNITS } from "../../units/constants";
import { hex2rgb } from "../../units/color/dispatch";
import { mixColors } from "../../units/color/mix";
import { kelvin2rgb } from "../../units/color/conversions/kelvin";
import type { HueInterpolationMethod } from "../../units/color/mix";
import { convertToDegrees } from "../../units/utils";
import * as utils from "../utils";
import { memoize } from "../../utils";
import { CSSValueUnit, parseCSSValueUnit } from "../units";

// ─── Boundary currency (W1-8 leaf-lift → color-unit.ts) ────────────────────
//
// `ParsedColorUnit` (the color-parse boundary type), `createColorValueUnit`, and
// `resolveToPlainColor` are the currency every color arm trades in — not parser
// combinators — so they lift to the leaf `color-unit.ts`. Re-export
// `ParsedColorUnit` verbatim so the `./parsing/color` surface (the `index.ts` +
// `subpaths/parsing.ts` barrels) stays byte-identical.
import {
    createColorValueUnit,
    resolveToPlainColor,
} from "./color-unit";
import type { ParsedColorUnit } from "./color-unit";
import { resolveRelativeColor } from "./relative-color";
import type { ComponentExpr } from "./relative-color";

export type { ParsedColorUnit };

// --- Relative color syntax (CSS Color L5) ---
//
// The semantic RESOLUTION helpers — `ComponentExpr`, `resolveRelativeColor`, and
// the lazily-built calc sub-parser — lift to the leaf `relative-color.ts`
// (W1-8). The `relativeColorParser` combinator below stays here (it references
// the recursive `CSSColor.Value`) and calls `resolveRelativeColor` from the leaf.

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

// HDR perceptual spaces (S.W1 remediation, 3.1.0). Non-CSS-native, so they parse
// the bare functional form `ictcp(I Ct Cp [/ a])` / `jzazbz(Jz az bz [/ a])` (the
// CSS Color HDR draft syntax) via `colorOptionalAlpha` — the same combinator the
// non-CSS-native `hsv(…)` precedent uses. No relative-color arm (HSV has none
// either; the component-ref regex does not carry ICtCp/Jzazbz channel names).
const ictcpParser: Parser<ValueUnit> = colorOptionalAlpha("ictcp").map(
    ([i, ct, cp, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new ICtCpColor(i, ct, cp, alpha)),
);

const jzazbzParser: Parser<ValueUnit> = colorOptionalAlpha("jzazbz").map(
    ([jz, az, bz, alpha]: [ValueUnit, ValueUnit, ValueUnit, ValueUnit]) =>
        createColorValueUnit(new JzazbzColor(jz, az, bz, alpha)),
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

// --- CSS Color 5 `contrast-color()` (L7, Baseline April 2026) — VJ-Q1 ---
//
// `contrast-color(<color>)` resolves EAGERLY to the maximally-contrasting of
// black/white against the argument, per the WCAG 2.x contrast ratio. It mirrors
// the `colorMix` combinator above: parse one `<color>`, resolve it to a plain
// `Color`, evaluate to ONE concrete `Color`, and wrap it through
// `createColorValueUnit`. kf inherits the resolved `Color` transparently (no kf
// API change); the Phase-2 resolve pass can lower `if(...)` over the result.
const contrastColorFn: Parser<ValueUnit> = utils
    .istring("contrast-color")
    .next(
        Parser.lazy(() => CSSColor.Value)
            .trim(whitespace)
            .wrap(lparen, rparen),
    )
    .map((colorUnit: ValueUnit) => {
        // The WCAG leaf accepts a PUBLIC-domain color (it normalizes internally)
        // and reads each channel's `ValueUnit.unit` to pick the right per-space
        // bound (e.g. the `%` on HSL s/l). Pass the parsed color's value with its
        // `ValueUnit` channels INTACT — do NOT pre-unwrap to bare numbers (that
        // strips the `%` unit and mis-normalizes HSL/LAB), and do NOT
        // `resolveToPlainColor` (that double-normalizes). `contrastColorEval`
        // returns the public-domain black/white endpoint.
        // `parsed` carries `ValueUnit<number>` channels; the leaf normalizes via
        // `normalizeColor` (which `ValueUnit.unwrapDeep`s each channel and reads
        // its `%`/unit), so the wrapped form is the correct input — cast through
        // `unknown` (the same boundary `resolveToPlainColor` asserts).
        const parsed = (colorUnit as ParsedColorUnit).value;
        return createColorValueUnit(
            contrastColorEval(parsed as unknown as Color),
        );
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

// --- System colors (CSS Color Level 4 §6.2 + legacy CSS Color 3 §4.5) ---
//
// O.W4 S12. System color keywords (`Canvas`, `ButtonText`, `GrayText`, …)
// previously fell through to the bare `CSSString` ValueUnit (`unit: undefined`,
// no `"system-color"` tag), so a consumer could not distinguish `Canvas` (a UA
// system color) from an arbitrary unknown identifier. The cure tags them with a
// dedicated `"system-color"` unit.
//
// Scope (division-of-labour law): value.js does NOT resolve a system color to an
// RGB triple at parse time — that is a rendering / environment concern. The
// parser emits the keyword VERBATIM (original casing preserved) under the
// `"system-color"` tag; the consumer (a browser / keyframes.js render seam)
// resolves it against the live UA theme. The serialized form is byte-stable:
// `ValueUnit("Canvas", "system-color").toString()` === `"Canvas"` (see the
// dedicated `system-color` arm in `units/index.ts`'s `ValueUnit.toString`).
const SYSTEM_COLOR_NAMES = [
    // CSS Color 4 §6.2
    "Canvas", "CanvasText", "LinkText", "VisitedText", "ActiveText",
    "ButtonFace", "ButtonText", "ButtonBorder", "Field", "FieldText",
    "Highlight", "HighlightText", "SelectedItem", "SelectedItemText",
    "Mark", "MarkText", "GrayText", "AccentColor", "AccentColorText",
    // Legacy / deprecated CSS Color 3 §4.5 set
    "ActiveBorder", "ActiveCaption", "AppWorkspace", "Background",
    "ButtonHighlight", "ButtonShadow", "CaptionText", "InactiveBorder",
    "InactiveCaption", "InactiveCaptionText", "InfoBackground", "InfoText",
    "Menu", "MenuText", "Scrollbar", "ThreeDDarkShadow", "ThreeDFace",
    "ThreeDHighlight", "ThreeDLightShadow", "ThreeDShadow", "Window",
    "WindowFrame", "WindowText",
] as const;

// Lower-cased token -> canonical (spec-cased) spelling. System colors are
// case-insensitive per spec, but the canonical CamelCase spelling is preserved
// on output for a byte-stable round-trip.
const SYSTEM_COLOR_LUT: ReadonlyMap<string, string> = new Map(
    SYSTEM_COLOR_NAMES.map((n) => [n.toLowerCase(), n]),
);

const systemColorParser: Parser<ValueUnit> = namedColorIdent.chain((x: string) => {
    const canonical = SYSTEM_COLOR_LUT.get(x.toLowerCase());
    if (canonical != null) {
        return utils.succeed(new ValueUnit(canonical, "system-color", ["color"]));
    }
    return utils.fail(`Not a system color: ${x}`);
});

// --- Late-bound color keyword / function sentinels (VJ-3) ---
//
// `currentColor` and `light-dark()` are colors whose RESOLUTION is deferred to
// the consumer's render seam — `currentColor` resolves against the target's
// inherited `color`, `light-dark()` against the target's own `color-scheme`.
// They must NOT bake to a fixed RGB triple at parse time, or that per-target
// resolution is lost. So they parse to typed *sentinels* that survive
// parse → normalize → serialize verbatim:
//   currentColor      → ValueUnit("currentColor", "color-keyword")
//   light-dark(a, b)  → ValueUnit(FunctionValue("light-dark", [a, b]), "color-keyword")
// The `"color-keyword"` superType lets a normalize/interpolation pass recognise
// the sentinel and skip RGB conversion; the consumer (keyframes.js) substitutes
// the resolved color per target at frame-prep.

const CURRENT_COLOR_KEYWORD = "currentColor" as const;

// `currentColor` (CSS Color 4 §6.3) — case-insensitive keyword, canonical
// camelCase spelling preserved on output so the round-trip is byte-stable.
const currentColorParser: Parser<ValueUnit> = utils
    .istring(CURRENT_COLOR_KEYWORD)
    .map(() => new ValueUnit(CURRENT_COLOR_KEYWORD, "color-keyword", ["color"]));

// `light-dark( <color> , <color> )` (CSS Color 5). Both arms are full colors;
// reference the top-level `Value` parser lazily (it is defined below). The two
// resolved color ValueUnits ride inside a `FunctionValue` sentinel so the
// per-scheme pick is deferred to the consumer.
const lightDarkParser: Parser<ValueUnit> = utils.istring("light-dark").next(
    all(
        Parser.lazy(() => Value).skip(sep),
        Parser.lazy(() => Value),
    )
        .trim(whitespace)
        .wrap(lparen, rparen)
        .map(([light, dark]: [ValueUnit, ValueUnit]) => {
            const fn = new FunctionValue("light-dark", [light, dark]);
            return new ValueUnit(fn, "color-keyword", ["color"]);
        }),
);

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
// The `currentColor` keyword and `light-dark()` sentinels (VJ-3) join their
// first-letter buckets ahead of `nameParser` — `currentColor` would otherwise
// be consumed by the broad named-color identifier regex and rejected on the
// COLOR_NAMES miss. Both are more specific than the named-color fallback, so
// they sit between the functional families and `nameParser`, preserving the
// byte-identical resolution of every currently-parsing input.
// The bucket parsers are heterogeneous: the functional-color families and
// `nameParser` produce a `ParsedColorUnit` (`"color"`), while the `currentColor`
// / `light-dark()` sentinels produce a deferred `"color-keyword"` unit (a
// `ValueUnit<string | FunctionValue>`). `any()` unifies them to the bare
// `ValueUnit`, so the tables are typed at that width.
// O.W4 S12: the system-color arm sits AFTER the named-color fallback in every
// bucket. A bare identifier is first tried as a CSS named color (`red`,
// `lavender`, …); only on the named-color miss is it tried as a system color
// (`Canvas`, `ButtonText`, …). The two name spaces are disjoint (no CSS named
// color collides with a system color keyword), so the ordering is observationally
// equivalent to either precedence — but named-first preserves byte-identical
// resolution of every currently-parsing named color.
const namedThenSystem = any(nameParser, systemColorParser);
const letterBuckets: Record<string, Parser<ValueUnit>> = {
    c: any(
        currentColorParser,
        colorMix,
        contrastColorFn,
        colorFunction,
        namedThenSystem,
    ),
    r: any(rgbParser, namedThenSystem),
    h: any(hslParser, hsvParser, hwbParser, namedThenSystem),
    l: any(labParser, lchParser, lightDarkParser, namedThenSystem),
    o: any(oklabParser, oklchParser, namedThenSystem),
    x: any(xyzParser, namedThenSystem),
    // `ictcp(…)` sits ahead of the `i…` named colors (indianred/indigo/ivory);
    // `jzazbz(…)` has no `j…` named-color collision but keeps the fallback for
    // uniformity (S.W1 remediation, 3.1.0).
    i: any(ictcpParser, namedThenSystem),
    j: any(jzazbzParser, namedThenSystem),
};
const dispatchTable: Record<string, Parser<ValueUnit>> = {
    "#": hex,
    "0-9": kelvin,
    "+": kelvin,
    "-": kelvin,
    ".": kelvin,
};
// Map every ASCII letter (both cases): a discriminating letter routes through
// its family bucket; every other letter starts a named color → system color
// fallback (`namedThenSystem`).
for (let cc = 97; cc <= 122; cc++) {
    const lower = String.fromCharCode(cc);
    const upper = lower.toUpperCase();
    const bucket = letterBuckets[lower] ?? namedThenSystem;
    dispatchTable[lower] = bucket;
    dispatchTable[upper] = bucket;
}

// The parse boundary's typed contract. `dispatch(...)` returns `Parser<ValueUnit>`
// (the heterogeneous bucket width above), but EVERY color-producing arm builds
// its payload through `createColorValueUnit` — which returns `ParsedColorUnit` by
// construction — and the named-color arm resolves a color string the same way.
// The deferred `"color-keyword"` sentinels (`currentColor` / `light-dark()`) ride
// the same parser as the one out-of-band variant; they survive verbatim for the
// keyframes.js render seam and never reach `normalizeColorUnit`. Narrowing the
// boundary here — codifying that parser-construction invariant once — is what
// lets every consumer drop the hand-written `as ValueUnit<Color<…>, "color">`
// cast (N.W2.C; the same invariant `resolveToPlainColor` above already asserts).
const Value = dispatch(dispatchTable).trim(whitespace) as Parser<ParsedColorUnit>;

export const CSSColor = {
    Value,
    colorValue,
    componentExpr,
    sep,
    alphaSep,
    div,
};

// --- Runtime custom color name registry ---
//
// The registry MAP + the register/clear/get functions live in the parse-that-
// free `units/color/color-names.ts` module (O.W1 S1 — the edge severance). The
// only coupling the registry had to THIS parser — invalidating `parseCSSColor`'s
// memo cache when names mutate — is inverted via the `onColorNamesChange`
// subscription: we register the cache-clear below; the registry notifies WITHOUT
// importing the parser. `registerColorNames` / `clearCustomColorNames` /
// `getCustomColorNames` are re-exported here verbatim so the monolithic `.`
// barrel surface is byte-identical (it always re-exported them from
// `parsing/color`).
//
// Wire the memo invalidation: when custom names change, clear the parse cache so
// fallback lookups (and any newly-shadowed built-in) re-resolve.
onColorNamesChange(() => {
    parseCSSColor.cache.clear();
});

// Re-export the registry surface verbatim so the monolithic `.` barrel (which
// imports these three from `./parsing/color`) is byte-identical post-severance.
export { registerColorNames, clearCustomColorNames, getCustomColorNames };

/**
 * Parse a CSS color string into a `ValueUnit<Color>`. Memoised — the returned
 * ValueUnit is shared across callers, so callers MUST NOT mutate it. Clone
 * before mutating if a per-call instance is needed.
 *
 * The cache is invalidated by `registerColorNames` and `clearCustomColorNames`.
 *
 * PRECEDENCE (N.W7.B-F7): a registered custom name SHADOWS the built-in CSS
 * color name it collides with — the custom-name map is consulted before the
 * rich parser, so a registered `red` wins over the spec `red`. See
 * `registerColorNames`. When the registry is empty the map branch is a no-op
 * and built-ins resolve through the rich parser exactly as before.
 */
// keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see comment in
// src/parsing/index.ts. maxCacheSize (W1-5): see PARSE_MEMO_MAX_ENTRIES.
export const parseCSSColor = memoize(
    (input: string): ParsedColorUnit => {
        // F7 — try the custom-name map BEFORE the speculative rich parse.
        // The rich parser fails on a registered custom name. Historically (≤
        // parse-that 0.8.2) the top-level `parseState` fired
        // `console.error(state.toString())` on that expected failure — a
        // per-parse console-I/O leak on every custom color name. The
        // N.W7.B `^0.9` re-pin closes that leak structurally (diagnostics are
        // OFF by default in parse-that 0.9.0 and only emit to console under an
        // explicit `enableDiagnostics()` value.js never calls), but the map-first
        // ordering is retained as a genuine optimization: it elides a doomed
        // speculative parse for every registered name (bounded, iso: when no
        // custom names are registered the map is empty and this is a no-op, so
        // the rich parser still resolves built-ins exactly as before).
        // (vj-parser-aug §2.3 fix (b).)
        const customColorNames = getCustomColorNamesMap();
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
    { keyFn: (input: string) => input, maxCacheSize: utils.PARSE_MEMO_MAX_ENTRIES },
);
