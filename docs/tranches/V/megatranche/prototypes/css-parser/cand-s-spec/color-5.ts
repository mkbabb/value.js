/**
 * CANDIDATE S · SPEC-SHAPED — CSS Color Level 5.
 *
 * Every production here needs `<color>` recursively, so each is a FACTORY that
 * takes it as a parameter. That keeps the single `Parser.lazy` back-edge in
 * `color.ts` (GROUND-B R-9: once per back-edge, not once per production) and
 * keeps this module free of an import cycle.
 *
 * These are the "reach further if your formulation makes it cheap" productions.
 * They are cheap here precisely BECAUSE the formulation is spec-shaped: each is
 * a transcription of one line of the spec over terminals that already exist.
 */

import { Parser, all, any } from "@mkbabb/parse-that";

import type {
    Channel,
    ColorSpace,
    ColorValue,
    MixComponent,
    Quad,
    RelativeTerm,
} from "./ast";
import {
    colorInterpolationMethod,
    colorspaceKeyword,
    legacyAlphaTail,
    modernAlphaTail,
    numberPercentageOrNone,
} from "./color-4";
import { comma, identToken, keyword, solidus } from "./syntax-3";
import { number, percentage } from "./values-4";

// ── §4 relative colour syntax ───────────────────────────────────────────────

/**
 * css-color-5 §4.
 *
 * > Each colour function … also accepts a `from <color>` prefix, which makes
 * > the channel keywords of that origin colour available as values.
 *
 * A channel slot in relative syntax may therefore be a channel KEYWORD (`r`,
 * `g`, `b`, `h`, `s`, `l`, `alpha`, …) as well as a number.
 */
const relativeTerm: Parser<RelativeTerm> = any(
    keyword("none").map((): RelativeTerm => ({ term: "none" })),
    percentage.map((value): RelativeTerm => ({ term: "percentage", value })),
    number.map((value): RelativeTerm => ({ term: "number", value })),
    identToken.map((name): RelativeTerm => ({ term: "channel", name })),
);

const relativeAlphaTail: Parser<RelativeTerm | undefined> = solidus
    .next(relativeTerm)
    .opt();

/**
 * `from <color> <term>{3} [ / <term> ]?` — the relative form of one function.
 *
 * The subject pre-empts this with `/\bfrom\b/i.test(body)`, which is a
 * substring test standing in for a grammar: it also fires on the perfectly
 * concrete `color(--from-scan 1 0 0)`. Recognising the production instead means
 * malformed relative syntax REJECTS, and well-formed relative syntax is refused
 * with the typed `color_context_required` — a difference the door can act on.
 */
export const relativeArguments = (
    space: ColorSpace,
    color: Parser<ColorValue>,
): Parser<ColorValue> =>
    keyword("from")
        .trim()
        .next(color)
        .trim()
        .then(all(relativeTerm.trim(), relativeTerm.trim(), relativeTerm.trim()))
        .then(relativeAlphaTail)
        .map(([[origin, channels], alpha]): ColorValue => ({
            kind: "relative",
            space,
            origin,
            channels,
            alpha,
        }));

/**
 * css-color-5 §4 — the `color()` relative form.
 *
 * > `color() = color( [from <color>]? <colorspace-params>
 * >                   [ / [<alpha-value> | none] ]? )`
 *
 * Adding this was one arm and one `all()`: that is the spec-shaped
 * formulation's actual claim — a spec addition is a mechanical addition.
 */
export const relativeColorArguments = (color: Parser<ColorValue>): Parser<ColorValue> =>
    keyword("from")
        .trim()
        .next(color)
        .trim()
        .then(
            all(
                colorspaceKeyword.trim(),
                relativeTerm.trim(),
                relativeTerm.trim(),
                relativeTerm.trim(),
            ),
        )
        .then(relativeAlphaTail)
        .map(([[origin, [space, first, second, third]], alpha]): ColorValue => ({
            kind: "relative",
            space: space.space,
            origin,
            channels: [first, second, third],
            alpha,
        }));

// ── §3 color-mix() ──────────────────────────────────────────────────────────

const mixComponent = (color: Parser<ColorValue>): Parser<MixComponent> =>
    any(
        color
            .then(percentage.trim().opt())
            .map(([value, share]): MixComponent => ({ color: value, percentage: share })),
        percentage
            .trim()
            .then(color)
            .map(([share, value]): MixComponent => ({ color: value, percentage: share })),
    );

/**
 * css-color-5 §3.
 *
 * > `color-mix() = color-mix( <color-interpolation-method> ,
 * >                           [ <color> && <percentage [0,100]>? ]#{2} )`
 *
 * The `&&` (any order) is two arms; the `#{2}` is the comma in the middle. Both
 * are grammar, so neither is a length check after the fact.
 */
export const colorMixArguments = (color: Parser<ColorValue>): Parser<ColorValue> =>
    all(
        colorInterpolationMethod.trim().skip(comma),
        mixComponent(color).trim().skip(comma),
        mixComponent(color).trim(),
    ).map(([interpolation, first, second]): ColorValue => ({
        kind: "color-mix",
        method: interpolation,
        components: [first, second],
    }));

// ── §7 light-dark() ─────────────────────────────────────────────────────────

/**
 * css-color-5 §7.
 *
 * > `light-dark() = light-dark( <color>, <color> )`
 *
 * Resolution needs the used colour scheme, so the door refuses it — but it
 * refuses it as a RECOGNISED production with a typed code, not as a syntax
 * error. `light-dark(red, blue)` and `light-dark(red)` are different failures.
 */
export const lightDarkArguments = (color: Parser<ColorValue>): Parser<ColorValue> =>
    all(color.trim().skip(comma), color.trim()).map(([light, dark]): ColorValue => ({
        kind: "light-dark",
        light,
        dark,
    }));

// ── §8 contrast-color() ─────────────────────────────────────────────────────

/**
 * css-color-5 §8.
 *
 * > `contrast-color() = contrast-color( <color> )`
 */
export const contrastColorArguments = (color: Parser<ColorValue>): Parser<ColorValue> =>
    color.trim().map((against): ColorValue => ({ kind: "contrast-color", against }));

// ── §9 device-cmyk() ────────────────────────────────────────────────────────

const cmykComponent: Parser<Channel> = numberPercentageOrNone(1);
const cmykNumber: Parser<Channel> = number.map((value): Channel => value);

const fourSpaceSeparated = (part: Parser<Channel>): Parser<Quad> =>
    all(part.trim(), part.trim(), part.trim(), part.trim());

const fourCommaSeparated = (part: Parser<Channel>): Parser<Quad> =>
    all(
        part.trim().skip(comma),
        part.trim().skip(comma),
        part.trim().skip(comma),
        part.trim(),
    );

/**
 * css-color-5 §9.
 *
 * > `<legacy-device-cmyk-syntax> = <number>#{4}`
 * > `<modern-device-cmyk-syntax> = <cmyk-component>{4}
 * >                                [ / [<alpha-value> | none] ]?`
 * > `<cmyk-component> = <number> | <percentage> | none`
 */
export const deviceCmykArguments: Parser<ColorValue> = any(
    fourSpaceSeparated(cmykComponent)
        .then(modernAlphaTail)
        .map(([channels, alpha]): ColorValue => ({
            kind: "device-cmyk",
            channels,
            alpha: alpha ?? 1,
        })),
    fourCommaSeparated(cmykNumber)
        .then(legacyAlphaTail)
        .map(([channels, alpha]): ColorValue => ({
            kind: "device-cmyk",
            channels,
            alpha: alpha ?? 1,
        })),
);
