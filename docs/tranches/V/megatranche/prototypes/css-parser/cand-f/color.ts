/**
 * M-12 candidate-F — CSS Color 4 `<color>` in idiomatic `@mkbabb/parse-that`.
 *
 * SURFACE (the M-9 brief): hex, named colours, rgb()/rgba(), hsl()/hsla(),
 * hwb(), lab()/lch(), oklab()/oklch(), color(), per-channel `none`,
 * number/percentage/angle channels, `/ <alpha>`, legacy comma forms.
 * Out of scope, stated not smuggled: <system-color>, color-mix(),
 * light-dark(), relative color syntax (`from`), device-cmyk().
 *
 * THE CONTRACT — TOTAL BY CONSTRUCTION:
 *   `parseColor(source)` never throws. There is no hand-rolled cursor, no
 *   index arithmetic, no `!`, no `as` into the AST, and the entry point reads
 *   `state.isError` — never `parse()` truthiness (the R1 crash class,
 *   MT-F024, was exactly a cursor + unchecked-index parser; the whole class
 *   is unrepresentable here). The R1 corpus (`rgb()`, `hsl(  )`, `oklch(/)`,
 *   every empty-argument form) lands on the ordinary failure path.
 *
 * IDIOM NOTES (deltas from the GROUND-B yardstick, each argued):
 *   · Fixed arity is expressed with `all(chan, sep.next(chan), sep.next(chan))`
 *     rather than `sepBy(sep, 3, 3)`. Both put arity in the grammar (the rule);
 *     `all` additionally yields a TYPED TUPLE `[T, T, T]`, so under
 *     `noUncheckedIndexedAccess` the AST builders destructure with zero `!`.
 *     `sepBy` returns `T[]` and would force `!` or a cast at every use site.
 *     No arm of any `all()` here can yield `undefined` (the drop-undefined
 *     trap), and every `.opt()` lives inside `.then()`, never `all()`.
 *   · ZERO `Parser.lazy`: the colour grammar is a DAG — no back-edges, so
 *     `lazy` anywhere would be the cargo cult GROUND-B names.
 *   · ZERO `memoize`: the band ruling stands — constructing any memoized
 *     wrapper arms the process-wide packrat epoch and never disarms it.
 *   · Two principled leaf extensions, `succeed`/`reject`, built on the public
 *     `Parser` constructor: `chain`-validation (hex length, keyword tables)
 *     needs a zero-width pure and a labelled failure. The library ships
 *     neither; a never-matching regex would mangle both the type and the
 *     diagnostic label.
 *   · Legacy/modern is an ALTERNATION, and legacy channel homogeneity
 *     (all-number xor all-percentage, css-color-4 §5.1) is two grammar
 *     alternates — never a post-hoc `if`.
 *
 * NORMALIZATION POLICY (css-color-4, parsed-value time; each clamp is a
 * spec citation or a declared policy, and each is pinned by a test):
 *   · <alpha-value>: percentage/100; clamped to [0,1]                  (§4.1)
 *   · rgb: number as-is, percentage×255/100; clamped to [0,255]        (§5.1)
 *   · hsl s/l, hwb w/b: number and percentage share the 0–100 scale;
 *     clamped to [0,100] (§7.1 mandates the lower clamp; the upper clamp
 *     is policy, matching browser serialization)                        (§7, §8)
 *   · <hue>: angle → degrees (grad×0.9, rad×180/π, turn×360), reduced
 *     mod 360 into [0,360) — "expressed modulo 360"; non-finite hue is
 *     passed through un-reduced rather than manufactured into NaN       (§6.1)
 *   · lab/lch L: L% → 100-scale; oklab/oklch L: L% → 1-scale; both
 *     clamped BELOW at 0 only — values above 100/1.0 are permitted
 *     (HDR forwards-compatibility)                                      (§9.1)
 *   · lab a/b: 100% = ±125 · oklab a/b: 100% = ±0.4 · lch C: 100% = 150 ·
 *     oklch C: 100% = 0.4; chroma clamped below at 0                    (§9, §10)
 *   · color(): percentage/100; deliberately UNCLAMPED (out-of-gamut and
 *     out-of-range are meaningful there)                                (§11)
 *   · Non-finite numerals (`1e999` → Infinity) are valid <number> tokens;
 *     they flow through and the clamps absorb them where clamps exist —
 *     the GROUND-C "±Infinity admitted?" contract question, answered by
 *     design and pinned by test.
 *
 * DECLARED SIMPLIFICATION: channels are whitespace-separated (`\s+`).
 * css-syntax token juxtaposition (`rgb(50%20%30%)`) is accepted by browser
 * tokenizers but rejected here; pinned by an explicit test, not hidden.
 */

import { Parser, all, any, dispatch, mergeErrorState, regex, string } from "@mkbabb/parse-that";

import { NAMED_COLORS, isNamedColor, type NamedColorName } from "./named-colors.js";

// ── AST ─────────────────────────────────────────────────────────────────────

/** A resolved channel: a number in the family's canonical scale, or `none`. */
export type Channel = number | "none";

export type ColorSyntax = "modern" | "legacy";

export const COLOR_SPACES = [
    "srgb",
    "srgb-linear",
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
    "xyz",
    "xyz-d50",
    "xyz-d65",
] as const;

export type PredefinedColorSpace = (typeof COLOR_SPACES)[number];

export type ColorNode =
    | { readonly kind: "hex"; readonly r: number; readonly g: number; readonly b: number; readonly alpha: number }
    | {
          readonly kind: "named";
          readonly name: NamedColorName | "transparent";
          readonly r: number;
          readonly g: number;
          readonly b: number;
          readonly alpha: number;
      }
    | { readonly kind: "currentcolor" }
    | {
          readonly kind: "rgb";
          readonly syntax: ColorSyntax;
          readonly r: Channel;
          readonly g: Channel;
          readonly b: Channel;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "hsl";
          readonly syntax: ColorSyntax;
          readonly h: Channel;
          readonly s: Channel;
          readonly l: Channel;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "hwb";
          readonly h: Channel;
          readonly w: Channel;
          readonly b: Channel;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "lab" | "oklab";
          readonly l: Channel;
          readonly a: Channel;
          readonly b: Channel;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "lch" | "oklch";
          readonly l: Channel;
          readonly c: Channel;
          readonly h: Channel;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "color";
          readonly space: PredefinedColorSpace;
          readonly c0: Channel;
          readonly c1: Channel;
          readonly c2: Channel;
          readonly alpha: Channel;
      };

// ── Leaf extensions ─────────────────────────────────────────────────────────
//
// `chain` validation needs exactly two primitives the library does not ship:
// a zero-width pure and a labelled failure. Both are built on PUBLIC surface
// (the `Parser` constructor and `mergeErrorState`); neither touches internals.

/** Zero-width success carrying `value` — the `pure` of the combinator algebra. */
const succeed = <T>(value: T): Parser<T> =>
    new Parser<T>((state) => state.ok(value));

/** Zero-width labelled failure — the refutation arm of `chain` validation. */
const reject = <T>(label: string): Parser<T> =>
    new Parser<T>((state) => {
        mergeErrorState(state, label);
        state.isError = true;
        return state;
    });

// ── Terminals ───────────────────────────────────────────────────────────────
//
// Each regex recognises exactly ONE CSS token and yields its text — never a
// delimiter, never a remainder, never structure-in-capture-groups.

/** `<number>` — CSS Syntax §4.3.12: sign, integer|decimal, optional exponent. */
const CSS_NUMBER = /[+-]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][+-]?\d+)?/;

const number: Parser<number> = regex(CSS_NUMBER).map(Number);

/** `<angle>` units, css-values-4 §6.1. One token: the unit ident. */
const ANGLE_UNIT = /deg|grad|rad|turn/i;

/** A CSS ident run — named colours, keywords, color() space names. */
const ident: Parser<string> = regex(/[a-zA-Z][a-zA-Z0-9-]*/);

const openParen = string("(");
const closeParen = string(")");
const comma = string(",").trim();
const slash = string("/").trim();

/** Modern-syntax channel separator: REQUIRED whitespace. */
const ws1 = regex(/\s+/);

/** Per-channel `none`, css-color-4 §4.4 — modern syntax only (see legacy bodies). */
const none: Parser<Channel> = regex(/none/i).map((): Channel => "none");

// ── Numeric semantics ───────────────────────────────────────────────────────

interface Numeric {
    readonly value: number;
    readonly isPercentage: boolean;
}

// `.opt()` lives inside `.then()` — NEVER inside `all()` (drop-undefined trap).
const numeric: Parser<Numeric> = number
    .then(string("%").opt())
    .map(([value, pct]): Numeric => ({ value, isPercentage: pct !== undefined }));

const clamp =
    (lo: number, hi: number) =>
    (n: number): number =>
        Math.min(hi, Math.max(lo, n));

const clamp01 = clamp(0, 1);
const clamp0255 = clamp(0, 255);
const clamp0100 = clamp(0, 100);
const atLeast0 = (n: number): number => Math.max(0, n);
const identity = (n: number): number => n;

/**
 * A modern-syntax channel: `none | <number> | <percentage>`, with the
 * family's number/percentage scalings applied at parsed-value time.
 */
const channel = (
    fromNumber: (n: number) => number,
    fromPercent: (p: number) => number,
): Parser<Channel> =>
    any(
        none,
        numeric.map(({ value, isPercentage }): Channel =>
            isPercentage ? fromPercent(value) : fromNumber(value),
        ),
    );

// Per-family channels — every scale factor is a css-color-4 citation (header).
// (p*255)/100, NOT p*2.55: 2.55 is inexact in binary; 100% must be exactly 255.
const rgbChannel = channel(clamp0255, (p) => clamp0255((p * 255) / 100));
const pct100Channel = channel(clamp0100, clamp0100); // hsl s/l · hwb w/b
const labL = channel(atLeast0, atLeast0); //           lab  L: 100% = 100
const oklabL = channel(atLeast0, (p) => atLeast0(p / 100)); // ok* L: 100% = 1
const labAB = channel(identity, (p) => p * 1.25); //   lab  a/b: 100% = ±125
const oklabAB = channel(identity, (p) => p * 0.004); // oklab a/b: 100% = ±0.4
const lchC = channel(atLeast0, (p) => atLeast0(p * 1.5)); //  lch C: 100% = 150
const oklchC = channel(atLeast0, (p) => atLeast0(p * 0.004)); // oklch C: 100% = 0.4
const colorChannel = channel(identity, (p) => p / 100); // color(): UNCLAMPED

// ── Hue ─────────────────────────────────────────────────────────────────────

const toDegrees = (value: number, unit: string | undefined): number => {
    switch (unit?.toLowerCase()) {
        case "grad":
            return value * 0.9;
        case "rad":
            return (value * 180) / Math.PI;
        case "turn":
            return value * 360;
        default: // undefined (bare <number>) and "deg" are both degrees.
            return value;
    }
};

/** §6.1: hue "expressed modulo 360"; a non-finite hue passes through un-reduced. */
const normalizeHue = (h: number): number =>
    Number.isFinite(h) ? ((h % 360) + 360) % 360 : h;

/** `<hue> = <number> | <angle>` — percentages are NOT hues (§6.1). */
const hue: Parser<number> = number
    .then(regex(ANGLE_UNIT).opt())
    .map(([value, unit]) => normalizeHue(toDegrees(value, unit)));

const hueChannel: Parser<Channel> = any(none, hue);

// ── Alpha ───────────────────────────────────────────────────────────────────

const alphaNumeric: Parser<number> = numeric.map(({ value, isPercentage }) =>
    clamp01(isPercentage ? value / 100 : value),
);

/** Modern `/ <alpha-value | none>` tail. */
const slashAlpha: Parser<Channel> = slash.next(any(none, alphaNumeric));

/** Legacy `, <alpha-value>` tail — `none` is a modern-only production. */
const commaAlpha: Parser<number> = comma.next(alphaNumeric);

/** Omitted alpha means fully opaque (§4.1). */
const withDefaultAlpha = (alpha: Channel | undefined): Channel =>
    alpha === undefined ? 1 : alpha;

// ── Legacy channel terminals (homogeneity lives in the grammar) ─────────────

const legacyRgbNumber: Parser<number> = number.map(clamp0255);
const legacyRgbPercent: Parser<number> = number
    .skip(string("%"))
    .map((v) => clamp0255((v * 255) / 100));
const legacyPct100: Parser<number> = number.skip(string("%")).map(clamp0100);

// ── Body shapes ─────────────────────────────────────────────────────────────
//
// `all(chan, sep.next(chan), sep.next(chan))` = arity {3} as a TYPED TUPLE.

/** Modern homogeneous triple: `chan \s+ chan \s+ chan`. */
const wsTriple = <T>(chan: Parser<T>): Parser<[T, T, T]> =>
    all(chan, ws1.next(chan), ws1.next(chan));

/** Legacy homogeneous triple: `chan , chan , chan`. */
const commaTriple = <T>(chan: Parser<T>): Parser<[T, T, T]> =>
    all(chan, comma.next(chan), comma.next(chan));

/**
 * `<name>( body )` — the head regex is ONE ident token; `wrap` owns the
 * parentheses (and reports unclosed delimiters); `trim` owns the inner
 * padding. An empty or degenerate body (`rgb()`, `hsl(  )`, `oklch(/)`)
 * fails INSIDE the wrap and surfaces as an ordinary error state.
 */
const fnCall = <T>(head: RegExp, body: Parser<T>): Parser<T> =>
    regex(head).next(body.trim().wrap(openParen, closeParen));

// ── rgb() / rgba() ──────────────────────────────────────────────────────────

const rgbModernBody: Parser<ColorNode> = wsTriple(rgbChannel)
    .then(slashAlpha.opt())
    .map(
        ([[r, g, b], alpha]): ColorNode => ({
            kind: "rgb",
            syntax: "modern",
            r,
            g,
            b,
            alpha: withDefaultAlpha(alpha),
        }),
    );

/** One legacy alternate per homogeneous channel type — §5.1's xor, as grammar. */
const rgbLegacyBody = (chan: Parser<number>): Parser<ColorNode> =>
    commaTriple(chan)
        .then(commaAlpha.opt())
        .map(
            ([[r, g, b], alpha]): ColorNode => ({
                kind: "rgb",
                syntax: "legacy",
                r,
                g,
                b,
                alpha: withDefaultAlpha(alpha),
            }),
        );

const rgbFn: Parser<ColorNode> = fnCall(
    /rgba?/i,
    any(rgbModernBody, rgbLegacyBody(legacyRgbNumber), rgbLegacyBody(legacyRgbPercent)),
);

// ── hsl() / hsla() ──────────────────────────────────────────────────────────

const hslModernBody: Parser<ColorNode> = all(
    hueChannel,
    ws1.next(pct100Channel),
    ws1.next(pct100Channel),
)
    .then(slashAlpha.opt())
    .map(
        ([[h, s, l], alpha]): ColorNode => ({
            kind: "hsl",
            syntax: "modern",
            h,
            s,
            l,
            alpha: withDefaultAlpha(alpha),
        }),
    );

/** Legacy hsl: `<hue>, <percentage>, <percentage>` — percentages REQUIRED, no none. */
const hslLegacyBody: Parser<ColorNode> = all(
    hue,
    comma.next(legacyPct100),
    comma.next(legacyPct100),
)
    .then(commaAlpha.opt())
    .map(
        ([[h, s, l], alpha]): ColorNode => ({
            kind: "hsl",
            syntax: "legacy",
            h,
            s,
            l,
            alpha: withDefaultAlpha(alpha),
        }),
    );

const hslFn: Parser<ColorNode> = fnCall(/hsla?/i, any(hslModernBody, hslLegacyBody));

// ── hwb() — modern only (css-color-4 §8: no legacy form) ────────────────────

const hwbFn: Parser<ColorNode> = fnCall(
    /hwb/i,
    all(hueChannel, ws1.next(pct100Channel), ws1.next(pct100Channel))
        .then(slashAlpha.opt())
        .map(
            ([[h, w, b], alpha]): ColorNode => ({
                kind: "hwb",
                h,
                w,
                b,
                alpha: withDefaultAlpha(alpha),
            }),
        ),
);

// ── lab() / oklab() ─────────────────────────────────────────────────────────

const labLikeBody = (
    kind: "lab" | "oklab",
    lightness: Parser<Channel>,
    ab: Parser<Channel>,
): Parser<ColorNode> =>
    all(lightness, ws1.next(ab), ws1.next(ab))
        .then(slashAlpha.opt())
        .map(
            ([[l, a, b], alpha]): ColorNode => ({
                kind,
                l,
                a,
                b,
                alpha: withDefaultAlpha(alpha),
            }),
        );

const labFn: Parser<ColorNode> = fnCall(/lab/i, labLikeBody("lab", labL, labAB));
const oklabFn: Parser<ColorNode> = fnCall(/oklab/i, labLikeBody("oklab", oklabL, oklabAB));

// ── lch() / oklch() ─────────────────────────────────────────────────────────

const lchLikeBody = (
    kind: "lch" | "oklch",
    lightness: Parser<Channel>,
    chroma: Parser<Channel>,
): Parser<ColorNode> =>
    all(lightness, ws1.next(chroma), ws1.next(hueChannel))
        .then(slashAlpha.opt())
        .map(
            ([[l, c, h], alpha]): ColorNode => ({
                kind,
                l,
                c,
                h,
                alpha: withDefaultAlpha(alpha),
            }),
        );

const lchFn: Parser<ColorNode> = fnCall(/lch/i, lchLikeBody("lch", labL, lchC));
const oklchFn: Parser<ColorNode> = fnCall(/oklch/i, lchLikeBody("oklch", oklabL, oklchC));

// ── color() ─────────────────────────────────────────────────────────────────

const colorSpace: Parser<PredefinedColorSpace> = ident.chain((word) => {
    const name = word.toLowerCase();
    const hit = COLOR_SPACES.find((space) => space === name);
    return hit === undefined
        ? reject<PredefinedColorSpace>("<predefined-color-space>")
        : succeed(hit);
});

const colorFn: Parser<ColorNode> = fnCall(
    /color/i,
    all(
        colorSpace,
        ws1.next(colorChannel),
        ws1.next(colorChannel),
        ws1.next(colorChannel),
    )
        .then(slashAlpha.opt())
        .map(
            ([[space, c0, c1, c2], alpha]): ColorNode => ({
                kind: "color",
                space,
                c0,
                c1,
                c2,
                alpha: withDefaultAlpha(alpha),
            }),
        ),
);

// ── hex ─────────────────────────────────────────────────────────────────────
//
// ONE terminal (the digit run) + `chain` length validation. `charAt`/`slice`
// never return `undefined`, so the expansion needs no `!` and no bounds cast.

const hexDigits: Parser<string> = string("#").next(regex(/[0-9a-fA-F]+/));

const hexColor: Parser<ColorNode> = hexDigits.chain((digits) => {
    const single = (i: number): number => {
        const d = digits.charAt(i);
        return parseInt(d + d, 16);
    };
    const pair = (i: number): number => parseInt(digits.slice(i, i + 2), 16);

    switch (digits.length) {
        case 3:
            return succeed<ColorNode>({
                kind: "hex",
                r: single(0),
                g: single(1),
                b: single(2),
                alpha: 1,
            });
        case 4:
            return succeed<ColorNode>({
                kind: "hex",
                r: single(0),
                g: single(1),
                b: single(2),
                alpha: single(3) / 255,
            });
        case 6:
            return succeed<ColorNode>({
                kind: "hex",
                r: pair(0),
                g: pair(2),
                b: pair(4),
                alpha: 1,
            });
        case 8:
            return succeed<ColorNode>({
                kind: "hex",
                r: pair(0),
                g: pair(2),
                b: pair(4),
                alpha: pair(6) / 255,
            });
        default:
            return reject<ColorNode>("<hex-color> (3, 4, 6 or 8 digits)");
    }
});

// ── Keywords: named colours, transparent, currentcolor ──────────────────────

const keywordColor: Parser<ColorNode> = ident.chain((word) => {
    const name = word.toLowerCase();
    if (name === "transparent") {
        return succeed<ColorNode>({
            kind: "named",
            name: "transparent",
            r: 0,
            g: 0,
            b: 0,
            alpha: 0,
        });
    }
    if (name === "currentcolor") {
        return succeed<ColorNode>({ kind: "currentcolor" });
    }
    if (isNamedColor(name)) {
        const [r, g, b] = NAMED_COLORS[name];
        return succeed<ColorNode>({ kind: "named", name, r, g, b, alpha: 1 });
    }
    return reject<ColorNode>("<named-color>");
});

// ── Assembly ────────────────────────────────────────────────────────────────
//
// `dispatch` narrows the fan-out in O(1); `any` orders the residual
// alternation (functions first — their heads fail in ≤5 chars on a named
// colour, then the keyword table takes over). No recursion ⇒ no lazy.

const functionColor: Parser<ColorNode> = dispatch<ColorNode>({
    rR: rgbFn,
    hH: any(hslFn, hwbFn),
    lL: any(labFn, lchFn),
    oO: any(oklabFn, oklchFn),
    cC: colorFn,
});

const letterColor: Parser<ColorNode> = any(functionColor, keywordColor);

export const cssColor: Parser<ColorNode> = dispatch<ColorNode>({
    "#": hexColor,
    "a-z": letterColor,
    "A-Z": letterColor,
});

/** The stylesheet-facing root: whitespace-tolerant, trailing-garbage-intolerant. */
export const cssColorRoot: Parser<ColorNode> = cssColor.trim().eof();

// ── Entry point ─────────────────────────────────────────────────────────────

export interface ColorParseSuccess {
    readonly ok: true;
    readonly color: ColorNode;
}

export interface ColorParseFailure {
    readonly ok: false;
    /** Furthest offset the parse reached — the caret position. */
    readonly offset: number;
    /** Populated only under `enableDiagnostics()`; `[]` otherwise. */
    readonly expected: readonly string[];
}

export type ColorParseResult = ColorParseSuccess | ColorParseFailure;

/**
 * TOTAL. Goes through `parseState()` and branches on `isError` — the value of
 * a failed state is undefined-by-contract and is never read. No try/catch:
 * a shield would convert an impossible-by-construction bug into a silent
 * `ok:false`; totality is instead demonstrated over the R1 corpus plus a
 * 10,000-case fuzz sweep in totality.test.ts.
 */
export function parseColor(source: string): ColorParseResult {
    if (typeof source !== "string") {
        // JS-boundary totality: R1 was a SHIPPING crash. Callers outside
        // TypeScript exist; a non-string is a parse failure, not a TypeError.
        return { ok: false, offset: 0, expected: ["<string source>"] };
    }
    const state = cssColorRoot.parseState(source);
    if (state.isError) {
        return {
            ok: false,
            offset: state.furthest >= 0 ? state.furthest : state.offset,
            expected: state.expected ?? [],
        };
    }
    return { ok: true, color: state.value };
}
