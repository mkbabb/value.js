/**
 * GROUND-A · the numbered denominator.
 *
 * Every production value.js's CSS parser is measured against, numbered once and
 * for all. `owed` is what the PINNED SPEC requires of a conforming parser; the
 * measurement harness (`measure.ts`) records what the LIVE parser at
 * `src/css/*` actually does. The difference is the band's scoreboard.
 *
 * Numbering is stable: an id is never reused or renumbered. New productions
 * append. Later coverage claims cite these ids.
 *
 * Tiers:
 *   1 — ships today; must not regress.
 *   2 — named gap with real consumer demand.
 *   3 — speculative / spec-present but unclaimed.
 */

/** The nine public parse entries of the `./css` subpath, plus the syntax coercer. */
export type Entry =
    | "parseCssColor"
    | "parseCssScalar"
    | "parseCssValue"
    | "parseTimingFunction"
    | "parseKeyframeSelector"
    | "parseAnimationTimeline"
    | "parseAnimationRange"
    | "parseStylesheet"
    | "coerceToSyntax";

export type Tier = 1 | 2 | 3;

/** What a parser does with one input. */
export type Verdict = "ACCEPT" | "REJECT" | "THROW";

/**
 * One probe: an input and the verdict the pinned spec owes it.
 * `arg` is the second parameter for two-argument entries (only coerceToSyntax).
 */
export type Case = Readonly<{ input: string; owed: Verdict; arg?: string }>;

export type Production = Readonly<{
    id: string;
    tier: Tier;
    entry: Entry;
    /** The spec production or feature name — not prose. */
    name: string;
    /** Pinned-spec anchor. */
    spec: string;
    cases: readonly Case[];
    note?: string;
}>;

const accept = (...inputs: readonly string[]): readonly Case[] =>
    inputs.map((input) => ({ input, owed: "ACCEPT" as const }));
const reject = (...inputs: readonly string[]): readonly Case[] =>
    inputs.map((input) => ({ input, owed: "REJECT" as const }));
/** `coerceToSyntax(input, arg)` probes — the only two-argument entry. */
const coerce = (arg: string, owed: Verdict, ...inputs: readonly string[]): readonly Case[] =>
    inputs.map((input) => ({ input, owed, arg }));

/* ------------------------------------------------------------------ *
 * §A — <color>  (css-color-4, css-color-5)          entry parseCssColor
 * ------------------------------------------------------------------ */

const COLOR: readonly Production[] = [
    {
        id: "P-001",
        tier: 1,
        entry: "parseCssColor",
        name: "<hex-color> — 3 digits",
        spec: "css-color-4 §5.2",
        cases: [...accept("#abc", "#ABC", "#f0f"), ...reject("#ab", "#z12")],
    },
    {
        id: "P-002",
        tier: 1,
        entry: "parseCssColor",
        name: "<hex-color> — 4 digits (RGBA)",
        spec: "css-color-4 §5.2",
        cases: [...accept("#abcd", "#ABCD"), ...reject("#abcde")],
    },
    {
        id: "P-003",
        tier: 1,
        entry: "parseCssColor",
        name: "<hex-color> — 6 digits",
        spec: "css-color-4 §5.2",
        cases: [...accept("#aabbcc", "#AABBCC"), ...reject("#aabbc")],
    },
    {
        id: "P-004",
        tier: 1,
        entry: "parseCssColor",
        name: "<hex-color> — 8 digits (RRGGBBAA)",
        spec: "css-color-4 §5.2",
        cases: [...accept("#aabbccdd"), ...reject("#aabbccddee")],
    },
    {
        id: "P-005",
        tier: 1,
        entry: "parseCssColor",
        name: "<named-color> — the 148-entry table, ASCII case-insensitive",
        spec: "css-color-4 §6.1",
        cases: [...accept("red", "Red", "REBECCAPURPLE", "aliceblue", "yellowgreen")],
        note: "Full 148/148 identity is asserted separately — see denominator.test.ts §P-005.",
    },
    {
        id: "P-006",
        tier: 1,
        entry: "parseCssColor",
        name: "transparent",
        spec: "css-color-4 §6.2",
        cases: accept("transparent", "TRANSPARENT"),
    },
    {
        id: "P-007",
        tier: 2,
        entry: "parseCssColor",
        name: "currentColor",
        spec: "css-color-4 §6.3",
        cases: accept("currentcolor", "currentColor"),
        note: "Refused on purpose with code color_context_required — a context-free parser cannot resolve it. Classified DEFERRED, not GAP.",
    },
    {
        id: "P-008",
        tier: 2,
        entry: "parseCssColor",
        name: "<system-color> — the 19-keyword set",
        spec: "css-color-4 §6.4",
        cases: accept("Canvas", "CanvasText", "AccentColor", "VisitedText"),
        note: "Refused with color_context_required. Full 19/19 refusal identity asserted in denominator.test.ts §P-008.",
    },
    {
        id: "P-009",
        tier: 1,
        entry: "parseCssColor",
        name: "<modern-rgb-syntax> — rgb([<number>|<percentage>|none]{3} [/ <alpha>]?)",
        spec: "css-color-4 §7.1",
        cases: [
            ...accept(
                "rgb(1 2 3)",
                "rgb(50% 50% 50%)",
                "rgb(1 2 3 / 0.5)",
                "rgb(1 2 3 / 50%)",
                "rgb(1 2 3/50%)",
                "rgb(1e2 2 3)",
                "rgb(+1 -2 3)",
                "rgb(300 -5 3)",
            ),
            ...reject("rgb(1 2)", "rgb(1 2 3 4)", "rgb(1 2 3 / 1 / 1)", "rgb(1 2 3) extra"),
        ],
    },
    {
        id: "P-010",
        tier: 1,
        entry: "parseCssColor",
        name: "<modern-rgba-syntax> — rgba() spelt as the modern form",
        spec: "css-color-4 §7.1",
        cases: accept("rgba(1 2 3 / 50%)", "rgba(1 2 3)"),
    },
    {
        id: "P-011",
        tier: 1,
        entry: "parseCssColor",
        name: "<legacy-rgb-syntax> — rgb(<number>#{3}) / rgb(<percentage>#{3}), no alpha",
        spec: "css-color-4 §7.1",
        cases: accept("rgb(1,2,3)", "rgb(1, 2, 3)", "rgb(50%, 50%, 50%)"),
    },
    {
        id: "P-012",
        tier: 2,
        entry: "parseCssColor",
        name: "<legacy-rgb-syntax> WITH alpha — rgb(r,g,b,a) / rgba(r,g,b,a)",
        spec: "css-color-4 §7.1 (<legacy-rgba-syntax>)",
        cases: accept("rgba(1,2,3,0.5)", "rgb(1,2,3,0.5)", "rgba(50%,50%,50%,50%)"),
        note: "The single most-deployed colour syntax on the live web. Measured REJECT.",
    },
    {
        id: "P-013",
        tier: 1,
        entry: "parseCssColor",
        name: "<modern-hsl-syntax> — hsl([<hue>|none] [<percentage>|none]{2} [/ <alpha>]?)",
        spec: "css-color-4 §7.2",
        cases: [
            ...accept("hsl(120deg 50% 50%)", "hsl(120 50% 50%)", "hsl(120 50% 50% / .5)"),
            ...reject("hsl(120 50%)"),
        ],
    },
    {
        id: "P-014",
        tier: 1,
        entry: "parseCssColor",
        name: "<legacy-hsl-syntax> — hsl(<hue>, <percentage>, <percentage>), no alpha",
        spec: "css-color-4 §7.2",
        cases: accept("hsl(120, 50%, 50%)"),
    },
    {
        id: "P-015",
        tier: 2,
        entry: "parseCssColor",
        name: "<legacy-hsla-syntax> — hsla(h, s%, l%, a)",
        spec: "css-color-4 §7.2",
        cases: accept("hsla(120,50%,50%,0.5)", "hsl(120,50%,50%,0.5)"),
    },
    {
        id: "P-016",
        tier: 1,
        entry: "parseCssColor",
        name: "hwb()",
        spec: "css-color-4 §7.3",
        cases: accept("hwb(120 10% 20%)", "hwb(120deg 10% 20% / 50%)"),
    },
    {
        id: "P-017",
        tier: 1,
        entry: "parseCssColor",
        name: "lab() — L as <percentage>|<number>, a/b ±125 = ±100%",
        spec: "css-color-4 §9.1",
        cases: accept("lab(50% 20 -30)", "lab(50 20 -30)", "lab(50% 20 -30 / 1)"),
    },
    {
        id: "P-018",
        tier: 1,
        entry: "parseCssColor",
        name: "lch() — C ±150 = 100%, H as <hue>",
        spec: "css-color-4 §9.2",
        cases: accept("lch(50% 30 120deg)", "lch(50% 30 120)"),
    },
    {
        id: "P-019",
        tier: 1,
        entry: "parseCssColor",
        name: "oklab() — L 0..1 = 0..100%, a/b ±0.4 = ±100%",
        spec: "css-color-4 §9.3",
        cases: accept("oklab(0.5 0.1 -0.1)", "oklab(50% 0.1 -0.1)"),
    },
    {
        id: "P-020",
        tier: 1,
        entry: "parseCssColor",
        name: "oklch() — C 0..0.4 = 0..100%, H as <hue>",
        spec: "css-color-4 §9.4",
        cases: accept("oklch(0.7 0.15 200)", "oklch(70% 0.15 200deg)", "OKLCH(0.7 0.15 200)"),
    },
    {
        id: "P-021",
        tier: 1,
        entry: "parseCssColor",
        name: "color() <predefined-rgb-params> — srgb | srgb-linear | display-p3 | a98-rgb | prophoto-rgb | rec2020",
        spec: "css-color-4 §10",
        cases: accept(
            "color(srgb 1 0 0)",
            "color(srgb-linear 1 0 0)",
            "color(display-p3 1 0 0)",
            "color(a98-rgb 1 0 0)",
            "color(prophoto-rgb 1 0 0)",
            "color(rec2020 1 0 0)",
            "color(srgb 100% 0% 0%)",
            "color(srgb 1 0 0 / .5)",
        ),
    },
    {
        id: "P-022",
        tier: 1,
        entry: "parseCssColor",
        name: "color() <xyz-params> — xyz | xyz-d50 | xyz-d65",
        spec: "css-color-4 §10.1",
        cases: accept(
            "color(xyz 0.4 0.2 0.1)",
            "color(xyz-d65 0.4 0.2 0.1)",
            "color(xyz-d50 0.4 0.2 0.1)",
            "color(xyz-d50 0.4 0.2 0.1 / .5)",
        ),
    },
    {
        id: "P-023",
        tier: 1,
        entry: "parseCssColor",
        name: "none as a channel keyword (missing components)",
        spec: "css-color-4 §4.4",
        cases: accept("rgb(none 2 3)", "rgb(1 2 3 / none)", "color(xyz none 0.2 0.1)"),
    },
    {
        id: "P-024",
        tier: 2,
        entry: "parseCssColor",
        name: "none in the xyz-d50 chromatic-adaptation path",
        spec: "css-color-4 §4.4 + §10.1",
        cases: accept("color(xyz-d50 none 0.2 0.1)"),
        note: "Rejected because adaptXyzD50ToD65 takes concrete numbers only. The only channel-keyword hole in P-023.",
    },
    {
        id: "P-025",
        tier: 1,
        entry: "parseCssColor",
        name: "<hue> as <angle> — deg | grad | rad | turn, and as bare <number>",
        spec: "css-values-4 §7.1 <angle>",
        cases: accept(
            "hsl(0.5turn 50% 50%)",
            "hsl(200grad 50% 50%)",
            "hsl(3.14rad 50% 50%)",
            "hsl(120deg 50% 50%)",
            "hsl(120 50% 50%)",
        ),
    },
    {
        id: "P-026",
        tier: 3,
        entry: "parseCssColor",
        name: "color() with a <dashed-ident> custom colour space (@color-profile)",
        spec: "css-color-5 §5",
        cases: accept("color(--swop5c 0.1 0.2 0.3 0.4)"),
    },
    {
        id: "P-027",
        tier: 2,
        entry: "parseCssColor",
        name: "Relative Colour Syntax — [from <color>] in all eight colour functions",
        spec: "css-color-5 §2",
        cases: accept(
            "rgb(from red r g b)",
            "hsl(from red h s l)",
            "oklch(from red l c h)",
            "oklch(from red calc(l * 1.2) c h)",
            "color(from red srgb r g b)",
        ),
        note: "Refused with color_context_required. Classified DEFERRED — the refusal is typed and deliberate.",
    },
    {
        id: "P-028",
        tier: 2,
        entry: "parseCssColor",
        name: "color-mix()",
        spec: "css-color-5 §3",
        cases: accept(
            "color-mix(in oklch, red, blue)",
            "color-mix(in srgb, red 30%, blue)",
            "color-mix(in hsl longer hue, red, blue)",
        ),
        note: "value.js already ships mixColors + interpolateHue on ./color; only the SYNTAX is missing.",
    },
    {
        id: "P-029",
        tier: 2,
        entry: "parseCssColor",
        name: "light-dark()",
        spec: "css-color-5 §6",
        cases: accept("light-dark(red, blue)", "light-dark(#fff, #000)"),
    },
    {
        id: "P-030",
        tier: 3,
        entry: "parseCssColor",
        name: "contrast-color()",
        spec: "css-color-5 §7",
        cases: accept("contrast-color(red)"),
    },
    {
        id: "P-031",
        tier: 3,
        entry: "parseCssColor",
        name: "device-cmyk()",
        spec: "css-color-5 §9",
        cases: accept("device-cmyk(0 1 1 0)"),
    },
    {
        id: "P-032",
        tier: 2,
        entry: "parseCssColor",
        name: "<color-interpolation-method> — in <rectangular-colour-space> | in <polar> <hue-method>",
        spec: "css-color-4 §12.3",
        cases: accept("color-mix(in oklch shorter hue, red, blue)"),
        note: "Only reachable through P-028 / P-027 today; numbered separately because it is its own production.",
    },
    {
        id: "P-033",
        tier: 3,
        entry: "parseCssColor",
        name: "<math-function> as a colour component",
        spec: "css-values-4 §10 within css-color-4 §4",
        cases: accept("rgb(calc(1 + 1) 2 3)", "oklch(calc(0.5 * 2) 0.1 200)"),
    },
    {
        id: "P-034",
        tier: 1,
        entry: "parseCssColor",
        name: "var() / env() substitution is NOT resolved context-free",
        spec: "css-variables-1 §3 (deliberate refusal)",
        cases: reject("var(--x)", "env(safe-area-inset-top)"),
        note: "Owed REJECT: a context-free colour parser must not invent a substitution.",
    },
    {
        id: "P-035",
        tier: 1,
        entry: "parseCssColor",
        name: "Non-CSS spaces on ./color are refused by ./css",
        spec: "value.js contract (hsv/kelvin/ictcp/jzazbz are library spaces, not CSS)",
        cases: reject("hsv(1 2 3)", "kelvin(6500)", "ictcp(1 2 3)", "jzazbz(1 2 3)"),
    },
    {
        id: "P-036",
        tier: 1,
        entry: "parseCssColor",
        name: "Hostility floor — a colour parser must not throw on any input",
        spec: "value.js contract: ParseResult is failure-explicit, never exceptional",
        cases: reject(
            "rgb()",
            "oklch()",
            "hsl(  )",
            "hwb()",
            "rgba()",
            "hsla()",
            "lab()",
            "lch()",
            "oklab()",
            "color()",
            "foo()",
            "xyz()",
            "calc()",
            "url()",
            "rgb( )",
            "rgb(/)",
            "rgb( / )",
            "rgb(\t)",
            "rgb(\n)",
        ),
        note:
            "R1. The crash class is the input language /^[a-z][\\w-]*\\([\\s\\/]*\\)$/i minus the six " +
            "guarded heads (var, env, hsv, kelvin, ictcp, jzazbz) — an unbounded class, not eight strings.",
    },
    {
        id: "P-037",
        tier: 1,
        entry: "parseCssColor",
        name: "Malformed alpha must not be silently accepted",
        spec: "css-color-4 §7.1 — [/ [<alpha-value>|none]]? admits no empty tail",
        cases: reject("rgb(1 2 3 / )", "rgb(1,2,3,)", "rgb(1 2 3 /)"),
        note: "Unsound ACCEPT today: an empty slash tail collapses to alpha = 1.",
    },
];

/* ------------------------------------------------------------------ *
 * §B — <declaration-value> / component values (css-values-4)
 * ------------------------------------------------------------------ */

const VALUE: readonly Production[] = [
    {
        id: "P-038",
        tier: 1,
        entry: "parseCssScalar",
        name: "<number> / <dimension> / <percentage> token",
        spec: "css-values-4 §5, §6",
        cases: [...accept("1", "1px", "1e3px", "-1.5em", "10%", "1fr", ".5s"), ...reject("1px 2px")],
    },
    {
        id: "P-039",
        tier: 1,
        entry: "parseCssScalar",
        name: "<ident> / <custom-ident> / <dashed-ident> token",
        spec: "css-values-4 §3.2",
        cases: accept("red", "solid", "--x", "-webkit-thing"),
    },
    {
        id: "P-040",
        tier: 1,
        entry: "parseCssScalar",
        name: "<string> token",
        spec: "css-values-4 §3.3",
        cases: accept('"str"', "'str'", '"a \\" b"'),
    },
    {
        id: "P-041",
        tier: 1,
        entry: "parseCssValue",
        name: "Space-, comma- and slash-separated component lists",
        spec: "css-values-4 §2.2",
        cases: accept("1px solid red", "a, b, c", "1px/2px", "1px 2px, 3px"),
    },
    {
        id: "P-042",
        tier: 1,
        entry: "parseCssValue",
        name: "<function-token> with a non-empty argument list (generic)",
        spec: "css-syntax-3 §5.4.9",
        cases: [...accept("translate(1px)", "repeat(2, 1fr)", "counter(x)"), ...reject("foo()")],
        note: "Any ident + balanced parens + non-empty body becomes an opaque CssCall. No per-function arity or type check.",
    },
    {
        id: "P-043",
        tier: 1,
        entry: "parseCssValue",
        name: "var() / env() with fallback",
        spec: "css-variables-1 §3, css-env-1",
        cases: accept("var(--x)", "var(--x, red)", "env(safe-area-inset-top, 0px)"),
    },
    {
        id: "P-044",
        tier: 1,
        entry: "parseCssValue",
        name: "<math-function> arity — calc/min/max/clamp parse as generic calls",
        spec: "css-values-4 §10.1–10.2",
        cases: accept("calc(1px + 2px)", "min(1px, 2px)", "max(1px, 2px)", "clamp(1px, 2vw, 3px)"),
        note: "Parsed as an un-evaluated CssCall. No math-function TYPE CHECKING exists (see P-046).",
    },
    {
        id: "P-045",
        tier: 2,
        entry: "parseCssValue",
        name: "<url> — the unquoted url-token form",
        spec: "css-values-4 §4.5.1",
        cases: accept("url(a.png)", "url(https://x/y.png)"),
        note: 'Only the quoted form url("a.png") parses. The unquoted url-token needs a dedicated tokenizer mode.',
    },
    {
        id: "P-046",
        tier: 2,
        entry: "parseCssValue",
        name: "<calc-sum> / <calc-product> internal structure + <calc-keyword> (e, pi, infinity, NaN)",
        spec: "css-values-4 §10.10–10.11",
        cases: [
            ...accept("calc(1px + 2px)", "calc(pi * 1rad)"),
            ...reject("calc(1px + )", "calc(1px +)", "calc(*)", "calc(+)", "calc(1px 2px)"),
        ],
        note:
            "The body becomes an opaque space-list, so malformed arithmetic is indistinguishable from " +
            "valid arithmetic. No operator precedence, no unit algebra, no <calc-keyword> resolution.",
    },
    {
        id: "P-047",
        tier: 2,
        entry: "parseCssValue",
        name: "Stepped-value + trig + exponential + sign math functions (18 names)",
        spec: "css-values-4 §10.4–10.8 (round mod rem sin cos tan asin acos atan atan2 pow sqrt hypot log exp abs sign)",
        cases: [
            ...accept("round(1.2px, 1px)", "sin(30deg)", "pow(2, 3)", "abs(-1px)", "hypot(3px, 4px)"),
            ...reject("pow(2)", "clamp(1px)", "atan2(1)"),
        ],
        note: "They parse only as generic calls — arity is never checked, so pow(2) and clamp(1px) pass.",
    },
    {
        id: "P-048",
        tier: 3,
        entry: "parseCssValue",
        name: "<an+b> — nth-child style micro-syntax",
        spec: "css-syntax-3 §5.5",
        cases: accept("nth-child(2n+1)", "2n+1"),
    },
    {
        id: "P-049",
        tier: 3,
        entry: "parseCssValue",
        name: "<unicode-range-token>",
        spec: "css-syntax-3 §5.4.2",
        cases: accept("U+26", "U+0-7F", "U+4??"),
    },
    {
        id: "P-050",
        tier: 1,
        entry: "parseCssValue",
        name: "Hostility floor — parseCssValue must not throw",
        spec: "value.js contract",
        cases: reject("rgb()", "hsl(  )", "oklch()"),
        note: "R1 propagates: parseScalarInternal calls parseCssColor first for every scalar.",
    },
];

/* ------------------------------------------------------------------ *
 * §C — <easing-function>  (css-easing-2)
 * ------------------------------------------------------------------ */

const EASING: readonly Production[] = [
    {
        id: "P-051",
        tier: 1,
        entry: "parseTimingFunction",
        name: "<cubic-bezier-easing-function> keywords — ease | ease-in | ease-out | ease-in-out",
        spec: "css-easing-2 §2.1",
        cases: accept("ease", "ease-in", "ease-out", "ease-in-out", "EASE-IN"),
    },
    {
        id: "P-052",
        tier: 1,
        entry: "parseTimingFunction",
        name: "linear keyword",
        spec: "css-easing-2 §2.2",
        cases: accept("linear"),
    },
    {
        id: "P-053",
        tier: 1,
        entry: "parseTimingFunction",
        name: "cubic-bezier() with the [0,1] x-value constraint",
        spec: "css-easing-2 §2.1",
        cases: [
            ...accept("cubic-bezier(.42,0,.58,1)", "cubic-bezier(0, -2, 1, 3)"),
            ...reject("cubic-bezier(2,0,.5,1)", "cubic-bezier(0,0,1)"),
        ],
    },
    {
        id: "P-054",
        tier: 1,
        entry: "parseTimingFunction",
        name: "<step-easing-function> — step-start | step-end | steps(<integer>, <step-position>?)",
        spec: "css-easing-2 §2.3",
        cases: [
            ...accept("step-start", "step-end", "steps(4)", "steps(4, jump-none)", "steps(4, start)", "steps(4, end)"),
            ...reject("steps(1, jump-none)", "steps(0)", "steps(1.5)"),
        ],
    },
    {
        id: "P-055",
        tier: 1,
        entry: "parseTimingFunction",
        name: "linear() with a <linear-stop-list> of two or more stops",
        spec: "css-easing-2 §2.2",
        cases: accept("linear(0, 1)", "linear(0, 0.5 50%, 1)", "linear(0 0% 50%, 1)"),
    },
    {
        id: "P-056",
        tier: 2,
        entry: "parseTimingFunction",
        name: "linear() with a single stop",
        spec: "css-easing-2 §2.2 — linear( [<number> && <percentage>{0,2}]# ), '#' is one-or-more",
        cases: accept("linear(0)", "linear(0.5)"),
        note: "The canonicalisation algorithm explicitly handles the one-point case ('return the output progress value of that item').",
    },
    {
        id: "P-057",
        tier: 1,
        entry: "parseTimingFunction",
        name: "Non-easing input is refused",
        spec: "css-easing-2 §2",
        cases: reject("spring(1 100 10 0)", "ease-in-out-back", "rgb()"),
        note: "rgb() is listed here as the hostility floor for this entry — it already REJECTs cleanly.",
    },
];

/* ------------------------------------------------------------------ *
 * §D — <keyframe-selector>  (css-animations-1/2 + scroll-animations-1)
 * ------------------------------------------------------------------ */

const KEYFRAME_SELECTOR: readonly Production[] = [
    {
        id: "P-058",
        tier: 1,
        entry: "parseKeyframeSelector",
        name: "from | to",
        spec: "css-animations-1 §3",
        cases: accept("from", "to", "FROM"),
    },
    {
        id: "P-059",
        tier: 1,
        entry: "parseKeyframeSelector",
        name: "<percentage [0,100]> with the range constraint",
        spec: "css-animations-1 §3",
        cases: [...accept("0%", "100%", "50.5%"), ...reject("-10%", "150%", "50")],
    },
    {
        id: "P-060",
        tier: 1,
        entry: "parseKeyframeSelector",
        name: "<timeline-range-name> <percentage> — cover | contain | entry | exit",
        spec: "scroll-animations-1 §5.2",
        cases: accept("entry", "exit 50%", "cover 0%", "contain", "entry 100%"),
    },
    {
        id: "P-061",
        tier: 2,
        entry: "parseKeyframeSelector",
        name: "<timeline-range-name> — entry-crossing | exit-crossing | scroll",
        spec: "scroll-animations-1 §5.2 (the full 7-name set)",
        cases: accept("entry-crossing 50%", "exit-crossing 50%", "scroll 50%"),
        note: "value.js implements 4 of the 7 named ranges. Measured REJECT for the other 3.",
    },
];

/* ------------------------------------------------------------------ *
 * §E — timelines and ranges  (scroll-animations-1)
 * ------------------------------------------------------------------ */

const TIMELINE: readonly Production[] = [
    {
        id: "P-062",
        tier: 1,
        entry: "parseAnimationTimeline",
        name: "<single-animation-timeline> — auto | none | <dashed-ident>",
        spec: "css-animations-2 §3.5",
        cases: [...accept("auto", "none", "--tl"), ...reject("tl")],
    },
    {
        id: "P-063",
        tier: 1,
        entry: "parseAnimationTimeline",
        name: "scroll( [<scroller> || <axis>]? )",
        spec: "scroll-animations-1 §4.1",
        cases: [
            ...accept("scroll()", "scroll(root block)", "scroll(nearest)", "scroll(self x)", "scroll(block root)"),
            ...reject("scroll(bogus)", "scroll(root root)"),
        ],
    },
    {
        id: "P-064",
        tier: 1,
        entry: "parseAnimationTimeline",
        name: "view( [<axis> || <'view-timeline-inset'>]? )",
        spec: "scroll-animations-1 §4.2",
        cases: [...accept("view()", "view(block 10%)", "view(inline auto)", "view(10% 20%)"), ...reject("view(bogus)")],
    },
    {
        id: "P-065",
        tier: 1,
        entry: "parseAnimationRange",
        name: "animation-range-start/end — normal | <length-percentage> | <timeline-range-name> <length-percentage>?",
        spec: "scroll-animations-1 §5.3",
        cases: accept("normal", "cover", "contain 25%", "50%", "entry 0% exit 100%", "cover 0% cover 100%"),
    },
    {
        id: "P-066",
        tier: 2,
        entry: "parseAnimationRange",
        name: "animation-range must not accept a non-<length-percentage> tail",
        spec: "scroll-animations-1 §5.3",
        cases: reject("wobble", "entry blue", "entry 1deg", "1s"),
        note:
            "LENGTH_PERCENTAGE is /^auto$|^[+-]?<number>(%|[a-z]+)?$/ — it admits every dimension unit, " +
            "so '1s' and 'entry 1deg' pass where only <length-percentage> is legal.",
    },
];

/* ------------------------------------------------------------------ *
 * §F — stylesheet + at-rules  (css-syntax-3, css-animations-2, css-properties-values-api, css-mixins)
 * ------------------------------------------------------------------ */

const STYLESHEET: readonly Production[] = [
    {
        id: "P-067",
        tier: 1,
        entry: "parseStylesheet",
        name: "<qualified-rule> — selector prelude + <declaration-list>, with comments and !important",
        spec: "css-syntax-3 §5.4",
        cases: accept(
            "a { color: red }",
            "a{color:red;}",
            "/* c */ a{color:red}",
            "a { color: red !important }",
            "a{}",
            "",
        ),
    },
    {
        id: "P-068",
        tier: 1,
        entry: "parseStylesheet",
        name: "Nested style rules",
        spec: "css-nesting-1 §2",
        cases: accept("a { &:hover { color: red } }", "a { color: red; & b { color: blue } }"),
    },
    {
        id: "P-069",
        tier: 1,
        entry: "parseStylesheet",
        name: "@keyframes <keyframes-name> { <keyframe-block-list> }",
        spec: "css-animations-1 §3",
        cases: accept(
            "@keyframes k { from { opacity: 0 } to { opacity: 1 } }",
            "@keyframes k { 0%, 100% { opacity: 0 } }",
            "@keyframes k { entry 50% { opacity: 0 } }",
        ),
    },
    {
        id: "P-070",
        tier: 1,
        entry: "parseStylesheet",
        name: "@property with syntax / inherits / initial-value descriptors and their validity rules",
        spec: "css-properties-values-api-1 §2",
        cases: [
            ...accept('@property --x { syntax: "<color>"; inherits: false; initial-value: red }'),
            ...reject(
                '@property --x { syntax: "<color>"; inherits: false }',
                '@property x { syntax: "*"; inherits: false }',
                '@property --x { syntax: "<color>"; inherits: false; initial-value: 1px }',
            ),
        ],
    },
    {
        id: "P-071",
        tier: 1,
        entry: "parseStylesheet",
        name: "@function --name(<parameter-list>) { result: ... }",
        spec: "css-mixins-1 §2",
        cases: accept("@function --f(--a: 1px) { result: var(--a) }", "@function --f() { result: 1px }"),
    },
    {
        id: "P-072",
        tier: 1,
        entry: "parseStylesheet",
        name: "@scope (<root>) [to (<limit>)]? and @starting-style",
        spec: "css-cascade-6 §3, css-transitions-2 §5",
        cases: accept("@scope (.a) to (.b) { p { color: red } }", "@starting-style { a { opacity: 0 } }"),
    },
    {
        id: "P-073",
        tier: 1,
        entry: "parseStylesheet",
        name: "Unknown at-rules are preserved verbatim as kind:'unknown' (never dropped, never fatal)",
        spec: "css-syntax-3 §5.4.2 (forward-compatible parsing)",
        cases: accept(
            "@media (min-width: 100px) { a { color: red } }",
            "@supports (display: grid) { a { color: red } }",
            "@container (width > 100px) { a { color: red } }",
            "@layer base;",
            '@import url("a.css");',
            '@charset "utf-8";',
            '@font-face { font-family: x; src: url("a.woff2") }',
        ),
        note: "This is the forward-compatibility escape hatch. @media/@supports/@container are NOT modelled — only retained.",
    },
    {
        id: "P-074",
        tier: 3,
        entry: "parseStylesheet",
        name: "@scroll-timeline / @view-timeline at-rules",
        spec: "REMOVED from scroll-animations-1 — timelines are declared by properties only",
        cases: accept("@scroll-timeline t { source: auto; orientation: block }"),
        note:
            "value.js MODELS two at-rules the current draft does not define, and exports " +
            "ScrollTimelineDescriptor / ViewTimelineDescriptor for them. Obsolete public surface.",
    },
    {
        id: "P-075",
        tier: 1,
        entry: "parseStylesheet",
        name: "animation shorthand expansion into 10 longhands",
        spec: "css-animations-2 §4",
        cases: [...accept("a { animation: 1s slide }", "a { animation: 1s ease-in 2s infinite alternate both k }"), ...reject("a { animation: 1s, }")],
    },
    {
        id: "P-076",
        tier: 1,
        entry: "parseStylesheet",
        name: "animation-timeline / animation-range / timeline-scope / animation-trigger declarations",
        spec: "css-animations-2 §3.5, scroll-animations-1 §5.3/§6, animation-triggers-1",
        cases: accept(
            "a { animation-timeline: scroll(root block) }",
            "a { animation-range: entry 0% exit 100% }",
            "a { timeline-scope: --a, --b }",
            "a { animation-trigger: once --tl }",
        ),
    },
    {
        id: "P-077",
        tier: 2,
        entry: "parseStylesheet",
        name: "animation-delay-start / animation-delay-end longhands",
        spec: "css-animations-2 §3.3 (animation-delay is now a shorthand for the two)",
        cases: accept("a { animation-delay-start: 1s }", "a { animation-delay-end: 1s }"),
        note: "They parse, but only as untyped declarations — collectAnimationOptions models a single `delay`.",
    },
    {
        id: "P-078",
        tier: 1,
        entry: "parseStylesheet",
        name: "Hostility floor — parseStylesheet must not throw on a malformed declaration value",
        spec: "value.js contract",
        cases: reject("a{color:rgb()}", "a{color:foo()}"),
        note: "R1 reaches the whole stylesheet entry through parseDeclarations → parseCssValue.",
    },
    {
        id: "P-079",
        tier: 2,
        entry: "parseStylesheet",
        name: "selector() / unquoted-url descriptor values inside @view-timeline",
        spec: "scroll-animations-1 (descriptor forms)",
        cases: accept("@view-timeline v { subject: selector(#x) }"),
        note: "Rejected because '#x' is neither a hex colour nor an <ident>. A tokenizer hole, not a colour hole.",
    },
];

/* ------------------------------------------------------------------ *
 * §G — @property <syntax> descriptor  (css-properties-values-api-1)
 * ------------------------------------------------------------------ */

const SYNTAX: readonly Production[] = [
    {
        id: "P-080",
        tier: 1,
        entry: "coerceToSyntax",
        name: "The 13 supported <syntax-component> names, '*', and '|' alternation",
        spec: "css-properties-values-api-1 §3",
        cases: [
            ...coerce("<color>", "ACCEPT", "red", "#abc", "oklch(0.7 0.15 200)"),
            ...coerce("<length>", "ACCEPT", "1px", "1rem", "1cqi"),
            ...coerce("<length>", "REJECT", "10%", "red"),
            ...coerce("<length-percentage>", "ACCEPT", "10%", "1px"),
            ...coerce("<integer>", "ACCEPT", "3"),
            ...coerce("<integer>", "REJECT", "3.5"),
            ...coerce("<time>", "ACCEPT", "1s", "250ms"),
            ...coerce("<angle>", "ACCEPT", "90deg", "1turn"),
            ...coerce("<resolution>", "ACCEPT", "2x", "96dpi"),
            ...coerce("<flex>", "ACCEPT", "1fr"),
            ...coerce("<transform-function>", "ACCEPT", "translate(1px)"),
            ...coerce("<transform-list>", "ACCEPT", "translate(1px) rotate(3deg)"),
            ...coerce("<custom-ident>", "ACCEPT", "foo"),
            ...coerce("<custom-ident>", "REJECT", "inherit"),
            ...coerce("<number> | <percentage>", "ACCEPT", "1", "10%"),
            ...coerce("*", "ACCEPT", "anything 1px red"),
        ],
        note:
            "Supported: <angle> <color> <custom-ident> <flex> <integer> <length> <length-percentage> " +
            "<number> <percentage> <resolution> <time> <transform-function> <transform-list>.",
    },
    {
        id: "P-081",
        tier: 2,
        entry: "coerceToSyntax",
        name: "<syntax> multipliers — '+' (space list) and '#' (comma list)",
        spec: "css-properties-values-api-1 §3",
        cases: [...coerce("<length>+", "ACCEPT", "1px 2px"), ...coerce("<length>#", "ACCEPT", "1px, 2px")],
        note: "syntaxAlternatives() accepts only bare component names and '|', so any multiplier is a syntax_descriptor_invalid.",
    },
    {
        id: "P-082",
        tier: 3,
        entry: "coerceToSyntax",
        name: "<syntax> literal idents (e.g. 'solid | double')",
        spec: "css-properties-values-api-1 §3",
        cases: coerce("solid | double", "ACCEPT", "solid"),
    },
    {
        id: "P-083",
        tier: 1,
        entry: "coerceToSyntax",
        name: "Hostility floor — coerceToSyntax must not throw",
        spec: "value.js contract",
        cases: [...coerce("*", "REJECT", "rgb()"), ...coerce("<color>", "REJECT", "oklch()")],
    },
];

export const PRODUCTIONS: readonly Production[] = Object.freeze([
    ...COLOR,
    ...VALUE,
    ...EASING,
    ...KEYFRAME_SELECTOR,
    ...TIMELINE,
    ...STYLESHEET,
    ...SYNTAX,
]);

export const SECTIONS: readonly Readonly<{ key: string; title: string; ids: readonly string[] }>[] =
    Object.freeze([
        { key: "A", title: "<color> — css-color-4 / css-color-5", ids: COLOR.map((p) => p.id) },
        { key: "B", title: "component values — css-values-4 / css-syntax-3", ids: VALUE.map((p) => p.id) },
        { key: "C", title: "<easing-function> — css-easing-2", ids: EASING.map((p) => p.id) },
        { key: "D", title: "<keyframe-selector> — css-animations-1/2 + scroll-animations-1", ids: KEYFRAME_SELECTOR.map((p) => p.id) },
        { key: "E", title: "timelines and ranges — scroll-animations-1", ids: TIMELINE.map((p) => p.id) },
        { key: "F", title: "stylesheet + at-rules — css-syntax-3 and friends", ids: STYLESHEET.map((p) => p.id) },
        { key: "G", title: "@property <syntax> — css-properties-values-api-1", ids: SYNTAX.map((p) => p.id) },
    ]);
