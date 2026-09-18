/**
 * CANDIDATE S · SPEC-SHAPED — `<color>`, assembled.
 *
 * css-color-4 §4:
 *
 * > `<color> = <color-base> | currentColor | <system-color>
 * >          | <device-cmyk()> | <light-dark()>`
 * > `<color-base> = <hex-color> | <color-function> | <named-color> | transparent`
 * > `<color-function> = <rgb()> | <rgba()> | <hsl()> | <hsla()> | <hwb()>
 * >                   | <lab()> | <lch()> | <oklab()> | <oklch()> | <color()>`
 *
 * This module owns the ONE `Parser.lazy` in the candidate. Every recursive
 * production (relative colour, `color-mix()`, `light-dark()`,
 * `contrast-color()`) receives `colorReference` as a parameter, so the
 * recursion has exactly one back-edge and every other production is built
 * eagerly. `Parser.lazy`-everywhere is the cargo cult; `lazy`-at-the-back-edge
 * is the idiom (GROUND-B R-9).
 *
 * There is no "match any function name, then dispatch on the name" step
 * anywhere below — which is structurally why the R1 crash class cannot exist
 * here. An unknown function name simply matches no arm.
 */

import { Parser, any, dispatch } from "@mkbabb/parse-that";

import type { ColorSpace, ColorValue } from "./ast";
import {
    colorArguments,
    colorKeyword,
    fn,
    hexColor,
    hslArguments,
    hwbArguments,
    labArguments,
    lchArguments,
    oklabArguments,
    oklchArguments,
    rgbArguments,
} from "./color-4";
import {
    colorMixArguments,
    contrastColorArguments,
    deviceCmykArguments,
    lightDarkArguments,
    relativeArguments,
    relativeColorArguments,
} from "./color-5";
import { anyValue } from "./syntax-3";

/** The single back-edge of the `<color>` recursion. */
const colorReference: Parser<ColorValue> = Parser.lazy(() => color);

/** `<name>( … | from <color> … )` — every colour function admits the relative form. */
const colorFunction = (
    name: string,
    space: ColorSpace,
    args: Parser<ColorValue>,
): Parser<ColorValue> =>
    fn(name, any(args, relativeArguments(space, colorReference)));

/**
 * css-variables-1 §3 / css-env-1 §2 — `var()` and `env()`.
 *
 * Recognised so that `var(--brand, red)` is well-formed input with a typed
 * refusal rather than a syntax error; substitution happens before a colour
 * exists, so no context-free parser can resolve one.
 */
const substitution = (name: "var" | "env"): Parser<ColorValue> =>
    fn(name, anyValue).map((args): ColorValue => ({
        kind: "substitution",
        name,
        arguments: args,
    }));

/**
 * `<color-function>` and the css-color-5 functions, narrowed by first character.
 *
 * Within a bucket the arms cannot overlap: a `<function-token>` includes its
 * `(`, so `color(` and `color-mix(` are distinguished by the token itself and
 * the alternation needs no ordering discipline.
 */
const colorFunctions: Parser<ColorValue> = dispatch<ColorValue>({
    rR: any(
        colorFunction("rgb", "rgb", rgbArguments),
        colorFunction("rgba", "rgb", rgbArguments),
    ),
    hH: any(
        colorFunction("hsl", "hsl", hslArguments),
        colorFunction("hsla", "hsl", hslArguments),
        colorFunction("hwb", "hwb", hwbArguments),
    ),
    lL: any(
        colorFunction("lab", "lab", labArguments),
        colorFunction("lch", "lch", lchArguments),
        fn("light-dark", lightDarkArguments(colorReference)),
    ),
    oO: any(
        colorFunction("oklab", "oklab", oklabArguments),
        colorFunction("oklch", "oklch", oklchArguments),
    ),
    cC: any(
        fn("color", any(colorArguments, relativeColorArguments(colorReference))),
        fn("color-mix", colorMixArguments(colorReference)),
        fn("contrast-color", contrastColorArguments(colorReference)),
    ),
    dD: fn("device-cmyk", deviceCmykArguments),
    vV: substitution("var"),
    eE: substitution("env"),
});

/** css-color-4 §4 `<color>`. */
export const color: Parser<ColorValue> = any(hexColor, colorFunctions, colorKeyword);

/**
 * The stylesheet-facing root: whitespace-tolerant, trailing-garbage-intolerant.
 *
 * `.eof()` is not decoration. Without it a zero-width or short success leaves a
 * remainder that a caller reading `parse()`'s value would never see — which is
 * the R1 bug class rebuilt in a new library (GROUND-B §4).
 */
export const colorRoot: Parser<ColorValue> = color.trim().eof();
