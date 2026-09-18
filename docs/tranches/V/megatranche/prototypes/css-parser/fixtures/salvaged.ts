/**
 * SALVAGED FIXTURE CORPUS — extracted from the failed V·π attempt.
 *
 * ## What this file is
 *
 * Every case below is an INPUT. Fixtures carry NO acceptance credit. A parser
 * that passes this whole corpus has earned exactly nothing except the right to
 * be reviewed. Nothing here confers architecture approval, performance credit,
 * spec coverage, or a claim that a feature is "done". The prior attempt's
 * central failure was treating evidence-about-inputs as progress; this header
 * exists so that mistake cannot be re-made by citing this file.
 *
 * ## Provenance
 *
 * Salvaged read-only from `docs/tranches/V/apotheosis/pi/` (untracked, 2,338
 * files, ~327 MiB) which produced ONE accepted 17-line operation. The fixtures
 * are the only part of that tree with durable value. Each export names its
 * exact source path below `pi/`.
 *
 * ## What could NOT be salvaged
 *
 * The 180 G16 "sealed cases", the 172-case G13 corpus, and seven sibling
 * holdouts are AES-256-GCM ciphertexts (the `holdout-ciphertext.b64` files,
 * 1.5 MiB total) whose keys lived in a "turn-local custodian key store" that
 * expired (`g14/holdout-recovery-reveal.json`: `original_key_continuity:
 * false`). No key, escrow, or plaintext exists anywhere in the tree. Several
 * were explicitly destroyed (the `holdout-destruction.json` files). Those
 * corpora are PERMANENTLY UNRECOVERABLE. What survives is their
 * public/revealed siblings, reproduced here.
 * Do not seal a corpus you cannot decrypt later.
 *
 * ## Verification status of the values below
 *
 * All numeric expectations were re-derived by executing `Number(source)` in
 * node at salvage time rather than copied on trust. Two values that the source
 * JSON encoded as `null` + a `value_kind` tag (`positive-infinity`,
 * `negative-zero`) are written here as real `Infinity` / `-0`; compare those
 * with `Object.is`, not `===`.
 */

// ---------------------------------------------------------------------------
// Shared shapes
// ---------------------------------------------------------------------------

/** The semantic leaf CSS Syntax §4.3.13 "consume a number" must produce. */
export type CssNumberLeaf = {
    readonly sign: "+" | "-" | null;
    readonly type: "integer" | "number";
    /** `Object.is`-compared: distinguishes `-0`, and admits `±Infinity`. */
    readonly value: number;
};

/**
 * A maximal-prefix case. The parser starts at `offset` and must consume the
 * longest legal prefix, leaving the remainder to its parent.
 * `expected: null` means it must FAIL TRANSACTIONALLY — no consumption, no
 * mutation of the predecessor value, offset unchanged.
 */
export type PrefixCase = {
    readonly id: string;
    readonly source: string;
    readonly offset: number;
    /** Exact substring the parser is permitted to consume. */
    readonly representation: string | null;
    /** UTF-16 offset one past the consumed prefix. Equals `offset` on failure. */
    readonly end: number;
    readonly expected: CssNumberLeaf | null;
};

/**
 * A case whose only requirement is "must not throw". The prior parser's
 * shipping defect (R1) was a `TypeError`, not a wrong answer, so no-throw is a
 * first-class obligation and gets its own family.
 */
export type NoThrowCase = {
    readonly id: string;
    readonly source: string;
};

/** A divergence between the retired regex parser (LIVE) and correct behaviour. */
export type LiveDivergenceCase = {
    readonly id: string;
    readonly source: string;
    /** What `src/css/grammar.ts` does today. */
    readonly live: "accepts" | "rejects" | "throws";
    /** What CSS Syntax 3 / Color 4 require. */
    readonly correct: "accepts" | "rejects";
    readonly rRow: RRow;
};

/**
 * The V·π spec-correction ledger. Closed whitelist: a LIVE/replacement
 * disagreement NOT on this list is a defect in the replacement.
 * Source: `pi/PI.md` §2d.
 */
export type RRow =
    | "R1" // empty functional-color -> clean failure, no throw
    | "R2" // animation substitution-guard (var/env defer + math-head slotting)
    | "R3" // trailing `/` with no alpha -> reject
    | "R4" // keyframe-selector bare percentage bounded 0..100 (LIVE is correct; KEEP)
    | "R5" // preceding comment is trivia; declaration name stays clean
    | "R6" // hsl/hwb bare <number> saturation/lightness === percentage, so /100
    | "R7" // preserve `--*` custom-property case
    | "R8" // reject empty/trailing list items (CSS Syntax 3)
    | "R9" // colour legacy = all-comma, modern = comma-free; mixed rejected
    | "R10" // scroll()/view() comma spellings rejected
    | "R11" // timeline/range offset requires a unit except for zero
    | "R12"; // `--*` value: parseCssValue, else raw-keyword scalar

// ===========================================================================
// 1. THE SHIPPING CRASH — the reason this band exists
// ===========================================================================

/**
 * `parseCssColor` in `src/css/grammar.ts` throws
 * `TypeError: Cannot read properties of undefined (reading 'replace')`
 * at grammar.ts:181 — `splitTopLevel(slash[0]!.replace(...))`, because
 * `splitTopLevel("", "/")` returns `[]` and the non-null assertion lies.
 *
 * These eight inputs are the live, shipping, user-reachable crash. They are the
 * highest-priority fixtures in this file: a replacement that still throws on
 * any of them has not replaced anything.
 *
 * Provenance: `pi/mirror/test/w2-color.test.ts:207` (R1 divergence bank),
 * independently reproduced at `megatranche/audit/probes/r1-hostile-parsecsscolor.test.ts`.
 */
export const r1ShippingCrashInputs: readonly NoThrowCase[] = [
    { id: "r1-oklch", source: "oklch()" },
    { id: "r1-rgb", source: "rgb()" },
    { id: "r1-hsl", source: "hsl()" },
    { id: "r1-lab", source: "lab()" },
    { id: "r1-lch", source: "lch()" },
    { id: "r1-color", source: "color()" },
    { id: "r1-oklab", source: "oklab()" },
    { id: "r1-hwb", source: "hwb()" },
    // The whitespace variant: `splitTopLevel` still yields `[]`.
    { id: "r1-rgb-spaces", source: "rgb( )" },
    { id: "r1-hsl-spaces", source: "hsl(  )" },
];

// ===========================================================================
// 2. CONSUME-A-NUMBER — the one production V·π actually got accepted
// ===========================================================================

/**
 * Maximal-prefix cases. CSS Syntax §4.3.13 consumes greedily and hands the rest
 * back; the tricky half is where it must STOP.
 *
 * Provenance:
 *   `pi/mirror/cells/syntax-consume-number/g5/fixtures/public-cases.json`
 *     -> `prefix_cases`
 *   `pi/mirror/cells/syntax-consume-number/g13/public-corpus.json`
 *     -> `guarded_suffix_cases`
 */
export const numberPrefixCases: readonly PrefixCase[] = [
    // --- the six §4.3.10 "starts a number" arms, each with a live continuation
    { id: "digit", source: "7x", offset: 0, representation: "7", end: 1, expected: { sign: null, type: "integer", value: 7 } },
    { id: "plus-digit", source: "+7x", offset: 0, representation: "+7", end: 2, expected: { sign: "+", type: "integer", value: 7 } },
    { id: "minus-digit", source: "-7x", offset: 0, representation: "-7", end: 2, expected: { sign: "-", type: "integer", value: -7 } },
    { id: "dot-digit", source: ".7x", offset: 0, representation: ".7", end: 2, expected: { sign: null, type: "number", value: 0.7 } },
    { id: "plus-dot-digit", source: "+.7x", offset: 0, representation: "+.7", end: 3, expected: { sign: "+", type: "number", value: 0.7 } },
    { id: "minus-dot-digit", source: "-.7x", offset: 0, representation: "-.7", end: 3, expected: { sign: "-", type: "number", value: -0.7 } },

    // --- signed zero must survive: `Object.is(value, -0)` for "-0"
    { id: "zero-before-percent", source: "0%", offset: 0, representation: "0", end: 1, expected: { sign: null, type: "integer", value: 0 } },
    { id: "positive-zero", source: "+0;", offset: 0, representation: "+0", end: 2, expected: { sign: "+", type: "integer", value: 0 } },
    { id: "negative-zero", source: "-0;", offset: 0, representation: "-0", end: 2, expected: { sign: "-", type: "integer", value: -0 } },
    { id: "leading-zeros", source: "00px", offset: 0, representation: "00", end: 2, expected: { sign: null, type: "integer", value: 0 } },

    // --- `type` is decided by SPELLING, not by numeric value: "1.0" is a number
    { id: "fraction-integral-value", source: "1.0rem", offset: 0, representation: "1.0", end: 3, expected: { sign: null, type: "number", value: 1 } },
    { id: "leading-dot", source: ".5%", offset: 0, representation: ".5", end: 2, expected: { sign: null, type: "number", value: 0.5 } },
    { id: "lower-exponent", source: "1e3px", offset: 0, representation: "1e3", end: 3, expected: { sign: null, type: "number", value: 1000 } },
    { id: "upper-signed-exponent", source: "1E+3%", offset: 0, representation: "1E+3", end: 4, expected: { sign: null, type: "number", value: 1000 } },

    // --- non-zero entry offset: the parser must not assume it starts at 0
    { id: "nonzero-offset", source: "x:+12.50E-2px", offset: 2, representation: "+12.50E-2", end: 11, expected: { sign: "+", type: "number", value: 0.125 } },
    // UTF-16: an astral prefix is TWO code units. Offsets are code units.
    { id: "astral-prefix-offset", source: "\u{1F642}-.5;", offset: 2, representation: "-.5", end: 5, expected: { sign: "-", type: "number", value: -0.5 } },

    // --- STOP-SHORT cases. These are the ones naive regexes get wrong.
    { id: "incomplete-decimal", source: "1.", offset: 0, representation: "1", end: 1, expected: { sign: null, type: "integer", value: 1 } },
    { id: "incomplete-decimal-plus", source: "+7.", offset: 0, representation: "+7", end: 2, expected: { sign: "+", type: "integer", value: 7 } },
    { id: "incomplete-decimal-exp-tail", source: "-7.e2", offset: 0, representation: "-7", end: 2, expected: { sign: "-", type: "integer", value: -7 } },
    { id: "incomplete-dot-exp", source: "1.e2", offset: 0, representation: "1", end: 1, expected: { sign: null, type: "integer", value: 1 } },
    { id: "incomplete-exponent", source: "1e+px", offset: 0, representation: "1", end: 1, expected: { sign: null, type: "integer", value: 1 } },
    { id: "malformed-exponent-double-plus", source: "1e++2", offset: 0, representation: "1", end: 1, expected: { sign: null, type: "integer", value: 1 } },
    { id: "malformed-exponent-double-minus", source: "1e--2", offset: 0, representation: "1", end: 1, expected: { sign: null, type: "integer", value: 1 } },
    { id: "repeated-fraction", source: "1.2.3", offset: 0, representation: "1.2", end: 3, expected: { sign: null, type: "number", value: 1.2 } },
    // A following `-` starts a NEW number; it does not extend this one.
    { id: "adjacent-sign-boundary", source: "10-20", offset: 0, representation: "10", end: 2, expected: { sign: null, type: "integer", value: 10 } },
    { id: "stop-short-nonzero-offset", source: "@@+7.", offset: 2, representation: "+7", end: 4, expected: { sign: "+", type: "integer", value: 7 } },
    { id: "stop-short-nonzero-exp-tail", source: "@@@-7.e2", offset: 3, representation: "-7", end: 5, expected: { sign: "-", type: "integer", value: -7 } },

    // --- binary64 edges. `value` is what `Number()` yields, including overflow.
    { id: "max-binary64", source: "1.7976931348623157e308x", offset: 0, representation: "1.7976931348623157e308", end: 22, expected: { sign: null, type: "number", value: 1.7976931348623157e308 } },
    { id: "min-subnormal", source: "5e-324x", offset: 0, representation: "5e-324", end: 6, expected: { sign: null, type: "number", value: 5e-324 } },
    { id: "positive-underflow", source: "1e-324x", offset: 0, representation: "1e-324", end: 6, expected: { sign: null, type: "number", value: 0 } },
    // -0 via underflow. `=== 0` passes here and hides the bug; use Object.is.
    { id: "negative-underflow", source: "-1e-324x", offset: 0, representation: "-1e-324", end: 7, expected: { sign: "-", type: "number", value: -0 } },
    { id: "positive-overflow", source: "+1e309x", offset: 0, representation: "+1e309", end: 6, expected: { sign: "+", type: "number", value: Infinity } },
    { id: "negative-overflow", source: "-1e309x", offset: 0, representation: "-1e309", end: 6, expected: { sign: "-", type: "number", value: -Infinity } },
    // Spelling says integer; binary64 cannot hold it. `type` still "integer".
    { id: "integer-rounding", source: "9007199254740993x", offset: 0, representation: "9007199254740993", end: 16, expected: { sign: null, type: "integer", value: 9007199254740992 } },

    // --- transactional failures: nothing consumed, at offset 0 and at depth
    { id: "fail-empty", source: "", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-plus-only", source: "+", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-minus-only", source: "-", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-dot-only", source: ".", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-plus-dot", source: "+.", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-minus-dot", source: "-.", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-bare-exponent", source: "e1", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-dot-exponent", source: ".e1", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-double-minus", source: "--1", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-plus-minus", source: "+-1", offset: 0, representation: null, end: 0, expected: null },
    // Leading whitespace is NOT the number production's business.
    { id: "fail-leading-trivia", source: " 1", offset: 0, representation: null, end: 0, expected: null },
    // Only ASCII 0-9 are digits. Arabic-Indic and fullwidth forms are not.
    { id: "fail-arabic-indic-digit", source: "١", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-fullwidth-digit", source: "１", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-replacement-char", source: "�1", offset: 0, representation: null, end: 0, expected: null },
    { id: "fail-nonzero-offset", source: "x+.", offset: 1, representation: null, end: 1, expected: null },
];

/**
 * Must not throw, must not hang, must return a clean failure or a clean leaf.
 * Includes lone surrogates (invalid UTF-16), NUL, and an exponent large enough
 * to overflow any accumulator.
 *
 * Provenance: `g13/public-corpus.json` -> `hostile_no_throw_sources` and
 * `failure_sources`; `g5/fixtures/public-cases.json` -> `hostile_cases`.
 */
export const numberHostileNoThrow: readonly NoThrowCase[] = [
    { id: "nul", source: "\u0000" },
    { id: "lone-high-surrogate", source: "\uD800" },
    { id: "lone-low-surrogate", source: "\uDFFF" },
    { id: "unicode-infinity-sign", source: "∞" },
    { id: "double-plus-exponent", source: "1e++2" },
    { id: "double-minus-exponent", source: "1e--2" },
    { id: "plus-dot-exponent", source: "+.e2" },
    { id: "minus-bare-exponent", source: "-e+2" },
    { id: "astral-then-plus", source: "\u{1F642}+" },
    { id: "astral-then-incomplete", source: "\u{1F642}-1e+" },
    { id: "absurd-exponent", source: "9e999999999999999999999999x" },
];

/**
 * Deterministic bounded-hostile inputs — pathological LENGTH, not pathological
 * characters. Built at test time so this file stays small; each is 32,768
 * repetitions. The prior tree's own hostile bank used exactly these shapes and
 * one 1,000,000-character prefix case.
 *
 * Provenance: `g5/fixtures/public-cases.json` -> `hostile_cases`;
 * `syntax-number-start/fixtures/cases.json` -> `deterministic_hostile`.
 * A quadratic-backtracking parser fails here and nowhere else.
 */
export const numberHostileGenerators: readonly {
    readonly id: string;
    readonly build: () => string;
}[] = [
    { id: "digits-32768", build: () => "9".repeat(32768) },
    { id: "fraction-32768", build: () => `0.${"9".repeat(32768)}` },
    { id: "exponent-32768", build: () => `1e${"9".repeat(32768)}` },
    { id: "incomplete-exponent-32768", build: () => `${"9".repeat(32768)}e+` },
    { id: "ascii-prefix-1M-then-number", build: () => `${"x".repeat(1_000_000)}+.5` },
    { id: "astral-prefix-500k-then-nonnumber", build: () => `${"\u{1F4A9}".repeat(500_000)}+x` },
    { id: "cr-prefix-1M-then-number", build: () => `${"\r".repeat(1_000_000)}-.5` },
];

// ===========================================================================
// 3. THE IDENTIFIER-BOUNDARY CASE THAT KILLED THE KNOWN-DIMENSIONS CANDIDATES
// ===========================================================================

/**
 * THE most valuable single finding in the salvaged tree. Three independently
 * authored candidates (H, B, S) all passed a 1,131-transaction evaluator and
 * ALL THREE were semantically wrong, because the evaluator's fixture bank
 * tested a valid non-EOF escape (`1px\78`) but tested NEITHER the
 * escape-to-EOF case NOR the backslash-newline case. Two omitted sides, three
 * dead candidates, and a green harness.
 *
 * The rule (CSS Syntax 3 "check if two code points are a valid escape"):
 * a backslash starts a valid escape UNLESS the next code point is a newline.
 * EOF is therefore a VALID second code point, and
 * "consume an escaped code point" turns escape-at-EOF into U+FFFD.
 *
 * Consequence:
 *   `1px\`  at EOF      -> unit is `px�`, NOT a known `px` dimension.
 *                          A known-unit parser must FAIL AT ITS ENTRY OFFSET.
 *   `1px\` + LF/CRLF/CR/FF -> backslash-newline is NOT a valid escape, so the
 *                          identifier ends at `px`; the parser must SUCCEED
 *                          through `px` and leave the backslash to the parent.
 *
 * Observed candidate behaviour (from the independent bounded probe):
 *   H: succeeds through `px` on `1px\`   (WRONG — under-rejects)
 *   S: succeeds through `px` on `1px\`   (WRONG — under-rejects)
 *   B: fails at entry                    (right here, but B then failed
 *      transactionally on LF/CRLF/FF too — WRONG — over-rejects the delimiter)
 *
 * There was no semantically correct candidate in the frozen set. The repair
 * named by the reviewers: consume the CANONICAL IDENTIFIER PRODUCTION, never
 * invent another boundary regex.
 *
 * Provenance:
 *   `pi/mirror/cells/value-unit-known-dimensions/g0/reviews/skeptic-1-semantic.md`
 *   `pi/formation/session-audit/receiving/opus-skeptic-2-prototypes.md` §4.2
 *     (finding O2-18, "CONFIRMED BY EXECUTABLE REPLAY"; F13 -> REJECTED_CLAIM)
 */
export type IdentBoundaryCase = {
    readonly id: string;
    readonly source: string;
    /** `"fail-at-entry"`: the escape swallows the boundary, unit is not `px`. */
    readonly expected: "fail-at-entry" | "succeed-through-px";
    readonly why: string;
};

export const identifierBoundaryCases: readonly IdentBoundaryCase[] = [
    {
        id: "backslash-at-eof",
        source: "1px\\",
        expected: "fail-at-entry",
        why: "EOF is a valid second code point; the escape yields U+FFFD, so the unit is `px\\uFFFD` and no known dimension matches. Killed H and S.",
    },
    {
        id: "backslash-lf",
        source: "1px\\\n",
        expected: "succeed-through-px",
        why: "backslash+newline is NOT a valid escape; the ident ends at `px` and the backslash belongs to the parent. Killed B.",
    },
    {
        id: "backslash-crlf",
        source: "1px\\\r\n",
        expected: "succeed-through-px",
        why: "CSS input preprocessing normalises CRLF to LF; same conclusion as LF. Killed B.",
    },
    {
        id: "backslash-cr",
        source: "1px\\\r",
        expected: "succeed-through-px",
        why: "preprocessing normalises lone CR to LF. Killed B.",
    },
    {
        id: "backslash-ff",
        source: "1px\\\f",
        expected: "succeed-through-px",
        why: "preprocessing normalises form feed to LF. Killed B.",
    },
    {
        id: "backslash-hex-escape",
        source: "1px\\78",
        expected: "fail-at-entry",
        why: "the ONLY escape case the original bank tested. `\\78` is a valid escape for `x`, so the unit is `pxx`. All three candidates passed this — which is exactly why it was insufficient.",
    },
];

/**
 * The 62 known dimension units, by family, that the rejected candidates agreed
 * on. This inventory reproduced correctly and is worth inheriting; only the
 * BOUNDARY logic above was wrong.
 * 49 lengths + 4 angle + 2 time + 2 frequency + 4 resolution + 1 flex = 62.
 *
 * Provenance: `pi/mirror/cells/value-unit-known-dimensions/g0/fixtures/manifest.json`
 * Cross-checked against CSS Values 4 and CSS Conditional 5 (the six `cq`
 * spellings) by the g0 semantic reviewer.
 */
export const knownDimensionUnits: {
    readonly length: readonly string[];
    readonly angle: readonly string[];
    readonly time: readonly string[];
    readonly frequency: readonly string[];
    readonly resolution: readonly string[];
    readonly flex: readonly string[];
} = {
    length: [
        "px", "cm", "mm", "q", "in", "pc", "pt",
        "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
        "vw", "vh", "vi", "vb", "vmin", "vmax",
        "svw", "svh", "svi", "svb", "svmin", "svmax",
        "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
        "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
        "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
    ],
    angle: ["deg", "grad", "rad", "turn"],
    time: ["s", "ms"],
    frequency: ["hz", "khz"],
    resolution: ["dpi", "dpcm", "dppx", "x"],
    flex: ["fr"],
};

/** Delimiters that must terminate a dimension and be left to the parent. */
export const dimensionBoundarySuccess: readonly string[] = [
    "1px,", "1REM)", "1kHz/", "1dppx ", "1turn;",
];

/** Must NOT parse as a known dimension. */
export const dimensionBoundaryFailure: readonly string[] = [
    "1pxrest", "1px-rest", "1px_", "1px\\78", "1pxé",
    "1dppx2", "1sv", "1cq", "1k", "1", "px", "1%",
];

/** Must not throw. */
export const dimensionHostile: readonly NoThrowCase[] = [
    { id: "empty", source: "" },
    { id: "plus", source: "+" },
    { id: "minus", source: "-" },
    { id: "dot", source: "." },
    { id: "exp-then-unit", source: "1e+px" },
    { id: "neg-exp-then-unit", source: "1e-px" },
    { id: "double-dot", source: "1..2px" },
    { id: "double-minus", source: "--1px" },
    { id: "escaped-p", source: "1\\70x" },
    { id: "fullwidth-unit", source: "1ｐｘ" },
    { id: "nan-unit", source: "NaNpx" },
    { id: "infinity-unit", source: "Infinitypx" },
];

// ===========================================================================
// 4. PERCENTAGE LITERAL — the one revealed (not destroyed) holdout
// ===========================================================================

/**
 * `<percentage>` = accepted number production + `%`.
 *
 * These 15 cases are the ONLY holdout plaintext that survived the key
 * expiry, because `value-percentage-literal/g0` wrote its reveal as literal
 * data rather than as a hash commitment.
 *
 * Provenance: `pi/mirror/cells/value-percentage-literal/g0/holdout-reveal.json`
 * (revealed post-freeze), plus `g2/bench/corpus.json`.
 */
export type PercentageCase = {
    readonly id: string;
    readonly source: string;
    /** UTF-16 offset one past the consumed `<number>%`. */
    readonly end: number;
    readonly number: CssNumberLeaf;
};

export const percentageSuccessCases: readonly PercentageCase[] = [
    { id: "negative-zero", source: "-0%", end: 3, number: { sign: "-", type: "integer", value: -0 } },
    { id: "signed-zero-exponent", source: "+.0e-0%", end: 7, number: { sign: "+", type: "number", value: 0 } },
    { id: "leading-zeros", source: "000%", end: 4, number: { sign: null, type: "integer", value: 0 } },
    { id: "exponent-with-tail", source: "1E-2%tail", end: 5, number: { sign: null, type: "number", value: 0.01 } },
    { id: "beyond-safe-integer", source: "999999999999999999999%", end: 22, number: { sign: null, type: "integer", value: 1e21 } },
    // The literal/domain is preserved BEFORE contextual bounds are applied:
    // `101%` is a valid <percentage> even where the context bounds it to 100.
    { id: "over-one-hundred", source: "101%", end: 4, number: { sign: null, type: "integer", value: 101 } },
    { id: "min-subnormal", source: "5e-324%", end: 7, number: { sign: null, type: "number", value: 5e-324 } },
    { id: "large-negative", source: "-1000.125%", end: 10, number: { sign: "-", type: "number", value: -1000.125 } },
];

/**
 * Must reject. Note the newline, tab and comment cases: trivia between the
 * number and the `%` does NOT bind — a percentage is a single token.
 */
export const percentageFailureCases: readonly string[] = [
    "+%", "-.%", ".%",
    "1\n%", "1\t%", "1/*x*/%",
    "1e%", "1E-%",
    "--1%", "+-1%",
];

// ===========================================================================
// 5. KEYFRAME SELECTOR — the normative asymmetry finding
// ===========================================================================

/**
 * The finding: the keyframe selector's TWO percentage positions have DIFFERENT
 * domains, and the shipped grammar collapses them.
 *
 *   keyframe-selector = from
 *                     | to
 *                     | <percentage [0,100]>                     <- BOUNDED
 *                     | <timeline-range-name> <percentage>        <- UNBOUNDED
 *                                                                    MANDATORY
 *   timeline-range-name = cover | contain | entry | exit
 *                       | entry-crossing | exit-crossing | scroll  <- SEVEN
 *
 * Three concrete defects in `pi/mirror/grammar/keyframe-selector.ts`:
 *   1. it recognises FOUR names (cover, contain, entry, exit) — missing
 *      `entry-crossing`, `exit-crossing`, `scroll`;
 *   2. it makes the named-range percentage OPTIONAL (`.opt()`) — it is
 *      mandatory;
 *   3. it clamps the named-range percentage to [0,100] — it is unbounded.
 * The bare percentage bound of [0,100] (R4) is the one part LIVE gets right and
 * must be KEPT.
 *
 * Both the pre-reset value.js mirror AND the current BBNF grammar are wrong on
 * material parts of this boundary. That is the whole reason the finding is
 * worth carrying: two independent implementations agreed on the same error.
 *
 * Provenance: `pi/MODULE-DAG.md` "Keyframe-selector ownership closure"
 * (SHA-256 291e5145…, terminally acknowledged by the BBNF task);
 * `pi/FEATURE-LEDGER.md` §2 (the KF-SELECTOR-G0 formation was REJECTED but its
 * grammar finding explicitly survives the rejection).
 */
export type KeyframeSelectorCase = {
    readonly id: string;
    readonly source: string;
    readonly accepts: boolean;
    readonly why: string;
};

export const keyframeSelectorCases: readonly KeyframeSelectorCase[] = [
    { id: "from", source: "from", accepts: true, why: "arm 1; equivalent to 0%" },
    { id: "to", source: "to", accepts: true, why: "arm 2; equivalent to 100%" },
    { id: "bare-zero", source: "0%", accepts: true, why: "arm 3, in bounds" },
    { id: "bare-hundred", source: "100%", accepts: true, why: "arm 3, at the upper bound" },
    { id: "bare-over", source: "101%", accepts: false, why: "arm 3 is BOUNDED [0,100] — R4, LIVE is correct here, KEEP" },
    { id: "bare-negative", source: "-1%", accepts: false, why: "arm 3 is BOUNDED [0,100]" },

    { id: "named-cover", source: "cover 50%", accepts: true, why: "arm 4, name 1 of 7" },
    { id: "named-contain", source: "contain 50%", accepts: true, why: "arm 4, name 2 of 7" },
    { id: "named-entry", source: "entry 50%", accepts: true, why: "arm 4, name 3 of 7" },
    { id: "named-exit", source: "exit 50%", accepts: true, why: "arm 4, name 4 of 7" },
    { id: "named-entry-crossing", source: "entry-crossing 50%", accepts: true, why: "arm 4, name 5 of 7 — MISSING from the shipped grammar" },
    { id: "named-exit-crossing", source: "exit-crossing 50%", accepts: true, why: "arm 4, name 6 of 7 — MISSING from the shipped grammar" },
    { id: "named-scroll", source: "scroll 50%", accepts: true, why: "arm 4, name 7 of 7 — MISSING from the shipped grammar" },

    { id: "named-over-hundred", source: "entry 150%", accepts: true, why: "the NAMED-range percentage is UNBOUNDED — the shipped grammar wrongly clamps it to [0,100]" },
    { id: "named-negative", source: "exit -50%", accepts: true, why: "the NAMED-range percentage is UNBOUNDED and signed" },
    { id: "named-bare", source: "entry", accepts: false, why: "the named-range percentage is MANDATORY — the shipped grammar wrongly makes it optional via .opt()" },

    { id: "unknown-name", source: "middle 50%", accepts: false, why: "only the seven names are timeline-range names" },
    { id: "bare-number-no-percent", source: "50", accepts: false, why: "a bare <number> is not a <percentage>" },
];

/**
 * A selector LIST is a nonempty comma-separated list ABOVE the singular
 * production. Composition belongs to the parent; the singular production must
 * not absorb commas.
 */
export const keyframeSelectorListCases: readonly KeyframeSelectorCase[] = [
    { id: "list-two", source: "from, to", accepts: true, why: "nonempty comma list" },
    { id: "list-mixed", source: "0%, 50%, to", accepts: true, why: "arms may be mixed within a list" },
    { id: "list-trailing-comma", source: "from,", accepts: false, why: "empty trailing list item — R8" },
    { id: "list-empty-item", source: "from,,to", accepts: false, why: "empty interior list item — R8" },
    { id: "list-empty", source: "", accepts: false, why: "the list is NONEMPTY" },
];

// ===========================================================================
// 6. R-ROW DIVERGENCES — where the retired regex parser is provably wrong
// ===========================================================================

/**
 * A closed whitelist. Any disagreement between a replacement parser and the
 * retired `src/css/grammar.ts` that is NOT on this list is a defect in the
 * REPLACEMENT — that inversion is the whole value of the list.
 *
 * Coverage caveat, stated honestly: R1/R3/R4/R6/R8/R9/R10/R11 have executable
 * fixtures below because V·π waves W1-W3 were authored. R2/R5/R7/R12 live in
 * waves W4/W5, which were never completed; they are named in the type above so
 * the row set stays closed, but this band must derive their inputs from spec,
 * not from V·π.
 *
 * Provenance:
 *   `pi/PI.md` §2d (the R1-R12 ledger)
 *   `pi/mirror/test/w1-values.test.ts:189` (R8)
 *   `pi/mirror/test/w2-color.test.ts:206`  (R1, R3, R6, R9)
 *   `pi/mirror/test/w3-easing-timeline.test.ts:149,166` (R10, R11)
 */
export const liveDivergences: readonly LiveDivergenceCase[] = [
    // --- R1: empty functional colours. LIVE THROWS. See §1 for the full set.
    { id: "R1-rgb-empty", source: "rgb()", live: "throws", correct: "rejects", rRow: "R1" },
    { id: "R1-oklch-empty", source: "oklch()", live: "throws", correct: "rejects", rRow: "R1" },

    // --- R3: a trailing alpha slash with no alpha. LIVE ACCEPTS. It must not.
    { id: "R3-rgb-dangling-slash", source: "rgb(1 2 3 /)", live: "accepts", correct: "rejects", rRow: "R3" },
    { id: "R3-hsl-dangling-slash", source: "hsl(0 50% 50% /)", live: "accepts", correct: "rejects", rRow: "R3" },
    { id: "R3-color-dangling-slash", source: "color(srgb 1 0 0 /)", live: "accepts", correct: "rejects", rRow: "R3" },

    // --- R6: bare <number> saturation/lightness. Both accept; VALUES differ.
    // LIVE keeps 50 as 50; correct is 50/100 = 0.5. A pure accept/reject
    // differential MISSES this entirely — compare values, not just `ok`.
    { id: "R6-hsl-bare-numbers", source: "hsl(120 50 50)", live: "accepts", correct: "accepts", rRow: "R6" },
    { id: "R6-hwb-bare-numbers", source: "hwb(120 10 20)", live: "accepts", correct: "accepts", rRow: "R6" },

    // --- R8: empty and repeated list items. LIVE ACCEPTS.
    { id: "R8-double-comma", source: "a,,b", live: "accepts", correct: "rejects", rRow: "R8" },
    { id: "R8-triple-comma", source: "a,,,b", live: "accepts", correct: "rejects", rRow: "R8" },
    { id: "R8-double-slash", source: "a//b", live: "accepts", correct: "rejects", rRow: "R8" },
    { id: "R8-triple-slash", source: "a///b", live: "accepts", correct: "rejects", rRow: "R8" },

    // --- R9: legacy is ALL-comma, modern is comma-free. Mixed is invalid.
    { id: "R9-rgb-mixed-1", source: "rgb(255, 0 0)", live: "accepts", correct: "rejects", rRow: "R9" },
    { id: "R9-rgb-mixed-2", source: "rgb(255 0, 0)", live: "accepts", correct: "rejects", rRow: "R9" },
    { id: "R9-hsl-mixed", source: "hsl(120, 50% 50%)", live: "accepts", correct: "rejects", rRow: "R9" },
    { id: "R9-lab-comma", source: "lab(50%, 0, 0)", live: "accepts", correct: "rejects", rRow: "R9" },
    { id: "R9-color-comma", source: "color(srgb, 1, 0, 0)", live: "accepts", correct: "rejects", rRow: "R9" },
    // The converse: LIVE wrongly REJECTS valid all-comma legacy alpha forms.
    { id: "R9-rgba-legacy", source: "rgba(1, 2, 3, 50%)", live: "rejects", correct: "accepts", rRow: "R9" },
    { id: "R9-hsla-legacy", source: "hsla(120deg, 25%, 75%, 50%)", live: "rejects", correct: "accepts", rRow: "R9" },

    // --- R10: scroll()/view() do not take commas. LIVE treats comma as space.
    { id: "R10-scroll-comma", source: "scroll(root,x)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-scroll-comma-space", source: "scroll(root, x)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-scroll-trailing", source: "scroll(root,)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-scroll-leading", source: "scroll(,root)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-scroll-bare-comma", source: "scroll(,)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-view-comma", source: "view(block,10%)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-view-comma-space", source: "view(block, 10%)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-view-two-pct", source: "view(10%,20%)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-view-trailing", source: "view(auto,)", live: "accepts", correct: "rejects", rRow: "R10" },
    { id: "R10-view-leading", source: "view(,block)", live: "accepts", correct: "rejects", rRow: "R10" },

    // --- R11: a non-zero offset needs a unit. Zero (any spelling) does not.
    { id: "R11-view-unitless", source: "view(5)", live: "accepts", correct: "rejects", rRow: "R11" },
    { id: "R11-view-unitless-neg", source: "view(-1)", live: "accepts", correct: "rejects", rRow: "R11" },
    { id: "R11-view-unitless-frac", source: "view(+.5)", live: "accepts", correct: "rejects", rRow: "R11" },
    { id: "R11-view-name-unitless", source: "view(block 5)", live: "accepts", correct: "rejects", rRow: "R11" },
    { id: "R11-range-unitless", source: "entry 5", live: "accepts", correct: "rejects", rRow: "R11" },
    { id: "R11-range-unitless-list", source: "entry 5, exit 10", live: "accepts", correct: "rejects", rRow: "R11" },
    // Zero is the exception, in every spelling. Both must ACCEPT these.
    { id: "R11-zero-view", source: "view(0)", live: "accepts", correct: "accepts", rRow: "R11" },
    { id: "R11-negative-zero-view", source: "view(-0)", live: "accepts", correct: "accepts", rRow: "R11" },
    { id: "R11-zero-named-range", source: "entry 0", live: "accepts", correct: "accepts", rRow: "R11" },
    { id: "R11-negative-zero-range", source: "-0", live: "accepts", correct: "accepts", rRow: "R11" },
];

// ===========================================================================
// 7. PARSE-THAT ENGINE CAVEAT — an integration obligation, not a defect
// ===========================================================================

/**
 * Reproduced in `@mkbabb/parse-that@1.0.0` by the V·π foundation hostility
 * review, and worth a test in this band before anyone is surprised by it:
 *
 *   After `leaf.skip(suffix)` where the LEAF SUCCEEDS and the SUFFIX FAILS,
 *   the offset rewinds but the child VALUE REMAINS on the state.
 *   Direct leaf failure, by contrast, is fully transactional.
 *
 * Treat this as a parent-integration TEST OBLIGATION. It is not a
 * candidate-specific defect and it is not grounds for asking BBNF for an engine
 * uplift until the intended contract is established and acknowledged.
 *
 * Provenance: `pi/HANDOFF-2026-07-24.md` §7.3.
 */
export const parseThatSkipRewindCaveat = {
    combinator: "leaf.skip(suffix)",
    scenario: "leaf succeeds, suffix fails",
    observed: "offset rewinds; child value remains on the state",
    contrast: "direct leaf failure is fully transactional",
    obligation: "every parent that uses .skip() needs an explicit failure-path test",
} as const;
