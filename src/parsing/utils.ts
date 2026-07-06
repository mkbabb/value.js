import { mergeErrorState, Parser, regex, string } from "@mkbabb/parse-that";
import type { ParserState } from "@mkbabb/parse-that";

// W1-5 (S.W1 · perf-general §4 / lib-parsing F-6) — the shared LRU bound for the
// parsing layer's memoized public entry points (`parseCSSValue`, `parseCSSColor`,
// `parseCSSValueUnit`, `parseCSSPercent`, `parseCSSTime`, `parseCSSStylesheet`,
// `parseAnimationShorthand`). Every one keyed on the raw input string, so a
// sustained interactive session (slider/spectrum drag, gradient editing) emits a
// stream of near-unique high-precision decimal strings — each a permanent,
// never-evicted `Map` key without a bound. The `memoize()` LRU machinery
// (`src/utils.ts`) already exists; this caps worst-case memory deterministically,
// mirroring `normalize.ts`'s `COMPUTED_MEMO_MAX_ENTRIES = 4096` precedent (a few
// thousand entries is generous for a CSS-value cache; a hot key survives a flood
// under LRU where FIFO would evict it).
export const PARSE_MEMO_MAX_ENTRIES = 4096;

// ─────────────────────────────────────────────────────────────────────────────
// O.W6 S2 — monolithic byte-loop scanners (the parse-that CSS-parser HARVEST).
//
// The technique (NOT the grammar) is harvested from parse-that's CSS parser
// (`scanIdent` / `scanNumber` byte-loops over `charCodeAt`), retired by
// parse-that A.W1. These INTERNAL scanners replace the `regex(...)` ident/number
// combinators in the value-parser hot path. They are byte-for-byte equivalent to
// the regexes they replace — the 1871-test suite + the identical-parse oracle are
// the proof. NOT exported on the public surface.
//
// Both scanners are ANCHORED at `pos` (no leading-whitespace skip) — identical to
// parse-that's sticky/anchored `regex` — and return the END OFFSET of the maximal
// matched token, or `pos` itself when no token matches (the caller reads `==pos`
// as "no match").
// ─────────────────────────────────────────────────────────────────────────────

const CC_MINUS = 45; // '-'
const CC_DOT = 46; // '.'
const CC_0 = 48;
const CC_9 = 57;
const CC_e = 101; // 'e'
const CC_E = 69; // 'E'
const CC_PLUS = 43; // '+'

function isDigit(c: number): boolean {
    return c >= CC_0 && c <= CC_9;
}

function isAsciiLetter(c: number): boolean {
    return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

function isIdentContinue(c: number): boolean {
    // [a-zA-Z0-9-]
    return isAsciiLetter(c) || isDigit(c) || c === CC_MINUS;
}

/**
 * Scan a maximal identifier token at `pos`. Byte-loop replacement for
 * `the ident regex` — an optional leading `-`, a required
 * ASCII letter, then a maximal run of `[a-zA-Z0-9-]`.
 *
 * @returns the end offset of the token, or `pos` if no identifier is present.
 */
export function scanIdentFast(src: string, pos: number): number {
    const len = src.length;
    let i = pos;
    if (i < len && src.charCodeAt(i) === CC_MINUS) i++; // optional leading '-'
    // A letter MUST follow (the optional '-' alone is not an identifier).
    if (i >= len || !isAsciiLetter(src.charCodeAt(i))) return pos;
    i++;
    while (i < len && isIdentContinue(src.charCodeAt(i))) i++;
    return i;
}

/**
 * Scan a numeric literal at `pos`. Byte-loop replacement for
 * `regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/)` — an optional `-`,
 * an integer part of either `0` (single) or `[1-9]\d*` with an optional `.\d+`
 * fraction, OR a bare `.\d+`, then an optional `[eE][+-]?\d+` exponent.
 *
 * The leading-zero rule matters: `007` tokenizes only `0`, `00.5` only `0` —
 * the byte loop reproduces this exactly (the `(0|[1-9]\d*)` alternation).
 *
 * @returns the end offset of the literal, or `pos` if no number is present.
 */
export function scanNumberFast(src: string, pos: number): number {
    const len = src.length;
    let i = pos;
    if (i < len && src.charCodeAt(i) === CC_MINUS) i++; // optional leading '-'

    const c = i < len ? src.charCodeAt(i) : -1;
    if (isDigit(c)) {
        if (c === CC_0) {
            // `(0|...)` — a leading 0 is a SINGLE 0 (no further int digits).
            i++;
        } else {
            // `[1-9]\d*`
            i++;
            while (i < len && isDigit(src.charCodeAt(i))) i++;
        }
        // optional `.\d+` fraction (requires ≥1 digit after the dot).
        if (i < len && src.charCodeAt(i) === CC_DOT) {
            let j = i + 1;
            let frac = false;
            while (j < len && isDigit(src.charCodeAt(j))) {
                j++;
                frac = true;
            }
            if (frac) i = j; // `1.` with no trailing digit stays at the dot
        }
    } else if (c === CC_DOT) {
        // bare `.\d+`
        let j = i + 1;
        let frac = false;
        while (j < len && isDigit(src.charCodeAt(j))) {
            j++;
            frac = true;
        }
        if (!frac) return pos; // a lone '.' (or '-.') is not a number
        i = j;
    } else {
        return pos; // no digit, no leading dot — not a number
    }

    // optional `[eE][+-]?\d+` exponent.
    if (i < len) {
        const e = src.charCodeAt(i);
        if (e === CC_e || e === CC_E) {
            let j = i + 1;
            if (j < len) {
                const sign = src.charCodeAt(j);
                if (sign === CC_PLUS || sign === CC_MINUS) j++;
            }
            let exp = false;
            let k = j;
            while (k < len && isDigit(src.charCodeAt(k))) {
                k++;
                exp = true;
            }
            if (exp) i = k; // a bare `e`/`e+` with no digits is not consumed
        }
    }

    return i;
}

/**
 * A `Parser<string>` over `scanIdentFast` — the byte-loop twin of
 * `the ident regex`. Anchored at the current offset; succeeds
 * with the matched substring or fails (no token).
 */
const identFastParser = new Parser<string>((state: ParserState<any>) => {
    const end = scanIdentFast(state.src, state.offset);
    if (end === state.offset) return state.err(undefined as never, 0);
    return state.ok(state.src.slice(state.offset, end), end - state.offset);
});

/**
 * A `Parser<number>` over `scanNumberFast` — the byte-loop twin of the numeric
 * regex, mapped through `Number`. Anchored at the current offset.
 */
const numberFastParser = new Parser<number>((state: ParserState<any>) => {
    const end = scanNumberFast(state.src, state.offset);
    if (end === state.offset) return state.err(undefined as never, 0);
    return state.ok(
        Number(state.src.slice(state.offset, end)),
        end - state.offset,
    );
});

/** Case-insensitive string match. Returns the matched portion of the input. */
export const istring = (str: string) => {
    const re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return regex(re);
};

/** Maximal run of identifier characters — the unit token. */
const unitToken = regex(/[a-zA-Z]+/);

/**
 * Maximal-munch unit classifier. Consumes the longest identifier-shaped token
 * and succeeds ONLY when the whole token (case-insensitively) is a member of
 * `units`; otherwise the parser fails.
 *
 * This replaces `any(...units.map(istring))`, which was order-dependent and —
 * because `istring` compiles a non-anchored RegExp re-flagged sticky `y` by
 * parse-that — matched a unit as a *prefix* of the continuation: `100vhx`
 * tokenized `vh` and silently dropped the trailing `x`, and a unit that was a
 * prefix of a later-declared one would shadow it. Maximal-munch over the full
 * token removes both hazards (vj-parser-aug §2.2). The canonical declared
 * spelling is returned so output is byte-identical for every valid unit.
 */
export const unitParser = (units: readonly string[]): Parser<string> => {
    // Lower-cased token -> canonical declared spelling.
    const lut = new Map<string, string>();
    for (const u of units) lut.set(u.toLowerCase(), u);

    return unitToken.chain((token: string) => {
        const canonical = lut.get(token.toLowerCase());
        return canonical != null ? succeed(canonical) : fail(`unit:${token}`);
    });
};

// O.W6 S2 — byte-loop scanner replaces the regex on the hot path (the function-
// name dispatch in `handleFunc`). Identical tokenization to
// `the ident regex`.
export const identifier = identFastParser;

/**
 * VJ-Q6 (1.2.0) — scan a CSS DASHED-IDENT custom-function name at `pos`: two
 * REQUIRED leading dashes `--`, then at least one ident-continue char
 * (`[a-zA-Z0-9-]`). `scanIdentFast` REJECTS the second dash (it accepts at most
 * one leading `-` then requires a letter), so the `--ident(args)` custom-function
 * CALL site dropped to a verbatim string. This scanner accepts the
 * custom-property-function ident so the call parses to a `FunctionValue`.
 *
 * @returns the end offset of the `--ident` token, or `pos` if absent.
 */
export function scanDashedIdentFast(src: string, pos: number): number {
    const len = src.length;
    let i = pos;
    // Require exactly the `--` prefix.
    if (i + 1 >= len) return pos;
    if (src.charCodeAt(i) !== CC_MINUS || src.charCodeAt(i + 1) !== CC_MINUS) {
        return pos;
    }
    i += 2;
    // At least one ident-continue char must follow the `--`.
    if (i >= len || !isIdentContinue(src.charCodeAt(i))) return pos;
    i++;
    while (i < len && isIdentContinue(src.charCodeAt(i))) i++;
    return i;
}

/**
 * A `Parser<string>` over {@link scanDashedIdentFast} — anchored at the current
 * offset; succeeds with the matched `--ident` substring or fails (no token).
 */
export const dashedIdentifier = new Parser<string>(
    (state: ParserState<any>) => {
        const end = scanDashedIdentFast(state.src, state.offset);
        if (end === state.offset) return state.err(undefined as never, 0);
        return state.ok(
            state.src.slice(state.offset, end),
            end - state.offset,
        );
    },
);

export const none = istring("none");

// ─────────────────────────────────────────────────────────────────────────────
// W1-8 (S.W1 · lib-parsing F-3/F-5) — the ONE shared balanced-text scanner.
//
// The identical escape-aware, string-toggling, bracket-depth-tracking character
// loop was hand-rolled SEVEN times across the parsing layer (this file's
// comma-split, `stylesheet.ts`'s `balancedText` + selector-list + top-level-colon,
// `animation-shorthand.ts`'s whitespace tokenise, `scroll-timeline.ts`'s trigger
// tokenise, `index.ts`'s if()-clause split). `balancedText`'s `StopPredicate`
// design was already the most general of the seven; it now lives here and every
// top-level splitter / finder / scanner is a thin call over `walkBalanced` — each
// site expresses only which brackets it tracks and its stop predicate. Behavior
// is byte-preserved per site (the bracket sets, string-awareness, trim/keep-empty
// semantics of each original are reproduced by options, verified by the suite).
// ─────────────────────────────────────────────────────────────────────────────

/** Which bracket pairs a balanced scan tracks toward depth. */
export interface BracketSet {
    /** `(` `)` */
    round?: boolean;
    /** `[` `]` */
    square?: boolean;
    /** `{` `}` */
    curly?: boolean;
}

/** Track `(` `)` only — the animation / scroll-timeline token splitters. */
export const BRACKETS_ROUND: BracketSet = { round: true };
/** Track `(` `)` and `[` `]` — selector lists + function-parameter scans. */
export const BRACKETS_ROUND_SQUARE: BracketSet = { round: true, square: true };
/** Track all three pairs — declaration values, at-rule bodies, if() bodies. */
export const BRACKETS_ALL: BracketSet = { round: true, square: true, curly: true };

export interface BalancedWalkOptions {
    /** Offset to start the walk at (default 0). */
    start?: number;
    /**
     * Bracket pairs to track; omitted → all three. When an object IS provided,
     * its unlisted pairs are NOT tracked (treated as ordinary characters) — so
     * `{ round: true }` tracks parens only, exactly like the original splitters.
     */
    brackets?: BracketSet;
    /** Track `"`/`'` string literals with `\` escapes (default true). */
    strings?: boolean;
    /**
     * Halt when a tracked close bracket underflows depth 0 — `balancedText`'s
     * "a stray `}`/`)` ends this value" behavior. Off for the splitters, whose
     * hand-rolled originals let depth run negative on unbalanced input.
     */
    stopOnUnbalancedClose?: boolean;
}

/**
 * The shared balanced-text engine. Walk `input` from `start`, tracking bracket
 * depth over the enabled pairs and (optionally) string literals. At every
 * TOP-LEVEL character (every tracked depth 0, outside a string) — tested BEFORE
 * the character is consumed as a bracket, so a stop char that is also a bracket
 * opener fires first — invoke `atTop(i)`; return `true` to halt. Returns the
 * index the walk halted at (an `atTop` stop, a `stopOnUnbalancedClose` underflow,
 * or `input.length`).
 */
export function walkBalanced(
    input: string,
    atTop: (i: number) => boolean,
    opts: BalancedWalkOptions = {},
): number {
    const strings = opts.strings ?? true;
    const b = opts.brackets;
    const round = b ? b.round === true : true;
    const square = b ? b.square === true : true;
    const curly = b ? b.curly === true : true;
    const stopUnbalanced = opts.stopOnUnbalancedClose ?? false;

    let paren = 0;
    let brack = 0;
    let curlyD = 0;
    let inString: string | null = null;

    let i = opts.start ?? 0;
    for (; i < input.length; i++) {
        const ch = input[i]!;

        if (strings && inString) {
            if (ch === "\\" && i + 1 < input.length) {
                i++; // skip the escaped char (net +2 with the loop increment)
                continue;
            }
            if (ch === inString) inString = null;
            continue;
        }
        if (strings && (ch === '"' || ch === "'")) {
            inString = ch;
            continue;
        }

        if (paren === 0 && brack === 0 && curlyD === 0 && atTop(i)) {
            return i;
        }

        if (round && ch === "(") paren++;
        else if (round && ch === ")") {
            if (paren === 0 && stopUnbalanced) return i;
            paren--; // may run negative (splitters) — matches the originals
        } else if (square && ch === "[") brack++;
        else if (square && ch === "]") {
            if (brack === 0 && stopUnbalanced) return i;
            brack--;
        } else if (curly && ch === "{") curlyD++;
        else if (curly && ch === "}") {
            if (curlyD === 0 && stopUnbalanced) return i;
            curlyD--;
        }
    }
    return i;
}

export interface TopLevelSplitOptions extends BalancedWalkOptions {
    /** Trim each segment (default true). */
    trim?: boolean;
    /** Keep empty segments instead of dropping them (default false). */
    keepEmpty?: boolean;
}

const pushSegment = (
    out: string[],
    seg: string,
    trim: boolean,
    keepEmpty: boolean,
): void => {
    const s = trim ? seg.trim() : seg;
    if (keepEmpty || s.length > 0) out.push(s);
};

/**
 * Split `input` on every TOP-LEVEL character matched by `isDelim` (one at bracket
 * depth 0, outside a string). The delimiter is dropped. Segments are trimmed and
 * empties dropped by default; the string content of each segment is sliced
 * verbatim from `input`, so escapes inside a literal are preserved.
 */
export function splitTopLevel(
    input: string,
    isDelim: (ch: string) => boolean,
    opts: TopLevelSplitOptions = {},
): string[] {
    const trim = opts.trim ?? true;
    const keepEmpty = opts.keepEmpty ?? false;
    const out: string[] = [];
    let segStart = opts.start ?? 0;
    walkBalanced(
        input,
        (i) => {
            if (isDelim(input[i]!)) {
                pushSegment(out, input.slice(segStart, i), trim, keepEmpty);
                segStart = i + 1;
            }
            return false; // visit every delimiter — never halt early
        },
        opts,
    );
    pushSegment(out, input.slice(segStart), trim, keepEmpty);
    return out;
}

/**
 * The index of the FIRST top-level character matched by `isDelim`, or `-1`. Same
 * depth/string bookkeeping as {@link splitTopLevel}.
 */
export function findTopLevel(
    input: string,
    isDelim: (ch: string) => boolean,
    opts: BalancedWalkOptions = {},
): number {
    let found = -1;
    walkBalanced(
        input,
        (i) => {
            if (isDelim(input[i]!)) {
                found = i;
                return true;
            }
            return false;
        },
        opts,
    );
    return found;
}

/**
 * A stop predicate for {@link balancedText}: return `true` to end the scan at
 * `i`. `depth` is always 0 — the predicate is only consulted at top level.
 */
export type StopPredicate = (input: string, i: number, depth: number) => boolean;

/**
 * A `Parser<string>` consuming the maximal run of input up to the first
 * top-level position where `stop` fires (or a stray close bracket, or end of
 * input), tracking `()`/`[]`/`{}` depth and string literals. The declaration
 * value / selector-list / at-rule-prelude / function-parameter scanner — moved
 * here from `stylesheet.ts` (W1-8 · F-5) as the one balanced scanner every site
 * shares. `stopOnUnbalancedClose` reproduces the original's "stray close ends
 * the scan" break; the stop predicate is checked before bracket consumption.
 */
export const balancedText = (stop: StopPredicate): Parser<string> =>
    new Parser((state: ParserState<any>) => {
        const start = state.offset;
        const end = walkBalanced(state.src, (i) => stop(state.src, i, 0), {
            start,
            brackets: BRACKETS_ALL,
            strings: true,
            stopOnUnbalancedClose: true,
        });
        return state.ok(state.src.slice(start, end), end - start);
    });

/**
 * Split a property-level `#`-list value on its top-level commas, respecting
 * nested parens (so `scroll(root block)` stays one segment) and string literals.
 *
 * Promoted here (N.W11′ D2) from `animation-shorthand.ts`'s local — shared by
 * the `animation` shorthand splitter AND the scroll-timeline `#`-list grammars
 * (`animation-timeline` / `animation-range` / `timeline-scope`). W1-8: now a thin
 * call over the shared {@link splitTopLevel} (parens only, string-aware).
 */
export const splitTopLevelCommas = (input: string): string[] =>
    splitTopLevel(input, (ch) => ch === ",", { brackets: BRACKETS_ROUND });

export const integer = regex(/-?\d+/).map(Number);

// O.W6 S2 — byte-loop scanner replaces the numeric regex on the hot path
// (`CSSValueUnit.Number` and every `all(number, unit)` dimension). Identical
// tokenization to `regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/)`,
// already mapped through `Number`.
export const number = numberFastParser;

/** Parser that always succeeds with the given value without consuming input. */
export function succeed<T>(value: T): Parser<T> {
    return new Parser<T>((state: ParserState<any>) => {
        return state.ok(value, 0);
    });
}

/**
 * Parser that always fails, routing `message` into parse-that's diagnostic
 * channel (W1-4 · lib-parsing F-4). Previously the `message` argument was dead
 * code — `state.err()` has no message parameter, so the three authored fail
 * messages (`Invalid color name: …`, `Not a system color: …`, `unit:…`) were
 * silently thrown away, and every failure surfaced only the generic
 * "Parse error at offset N" context. `mergeErrorState(state, message)` advances
 * the furthest-reach (so the failure offset is honestly reported even with
 * diagnostics off — value.js's default) and records `message` in
 * `state.expected` when a consumer opts in via parse-that's `enableDiagnostics`.
 */
export function fail(message: string): Parser<never> {
    return new Parser<never>((state: ParserState<any>) => {
        mergeErrorState(state, message);
        return state.err(undefined as never, 0);
    });
}

/**
 * A structured parse diagnostic (VJ-F2 / F10, tranche-N W7). The csstree
 * `onParseError`-shaped record a consumer (keyframes.js
 * `ResolvedKeyframes.diagnostics`) surfaces instead of value.js's historical
 * silent-swallow / `console.error`. Emitted on a failed (or partial) parse.
 */
export interface ParseDiagnostic {
    /** A human-readable summary of where + why the parse derailed. */
    message: string;
    /** The byte offset at which the parse failed (the furthest reach). */
    offset: number;
    /** 1-based line / 0-based column of `offset` within `input`. */
    line: number;
    column: number;
    /** The parser names/descriptions expected at the failure point, if known. */
    expected?: string[];
    /** The full input string the parse ran against. */
    input: string;
}

/** A pluggable diagnostics sink. Called once per failed parse with the record. */
export type OnParseError = (diagnostic: ParseDiagnostic) => void;

/**
 * Build the structured diagnostic for a failed `ParserState`. Uses the
 * `furthest` reach (the deepest offset any branch consumed to) when available —
 * it pinpoints the derail far better than the top-level `offset` for an `any`
 * dispatch — and the `expected` set parse-that records there.
 */
function buildDiagnostic(
    state: { offset: number; furthest?: number; expected?: string[];
        getLineAndColumn?: (offset?: number) => { line: number; column: number } },
    input: string,
): ParseDiagnostic {
    const offset = state.furthest ?? state.offset;
    const start = Math.max(0, offset - 8);
    const end = Math.min(input.length, offset + 8);
    const context = input.slice(start, end);
    const lc = state.getLineAndColumn?.(offset) ?? { line: 1, column: offset };
    return {
        message: `Parse error at offset ${offset}: "...${context}..."`,
        offset,
        line: lc.line,
        column: lc.column,
        // Only attach `expected` when parse-that recorded it (exactOptional).
        ...(state.expected ? { expected: state.expected } : {}),
        input,
    };
}

/**
 * Try to parse; return the result or throw on failure.
 * Equivalent to Parsimmon's `.tryParse()`.
 *
 * The thrown error includes a 16-char context window (8 before / 8 after
 * the failure offset) so callers — particularly the demo's color-picker
 * error toasts — can pinpoint where the parse derailed. (E.W1 Lane D /
 * E-AUDIT-5 §9 item 11.)
 *
 * When an `onParseError` sink is supplied (VJ-F2), the structured diagnostic is
 * emitted to it BEFORE the throw — a consumer can collect diagnostics without
 * try/catching every parse, and the throw still happens for the existing
 * fail-loud contract.
 */
export function tryParse<T>(
    parser: Parser<T>,
    input: string,
    onParseError?: OnParseError,
): T {
    const state = parser.parseState(input);
    if (state.isError) {
        const diagnostic = buildDiagnostic(state, input);
        onParseError?.(diagnostic);
        throw new Error(diagnostic.message);
    }
    return state.value;
}

/**
 * Parse and return a result object with `.status` and `.value`.
 * Equivalent to Parsimmon's `.parse()` return shape.
 *
 * When an `onParseError` sink is supplied (VJ-F2), a failed parse emits the
 * structured diagnostic to it (a successful parse emits nothing); the
 * `{status, value}` shape is unchanged so existing callers are unaffected.
 */
export function parseResult<T>(
    parser: Parser<T>,
    input: string,
    onParseError?: OnParseError,
): { status: boolean; value: T } {
    const state = parser.parseState(input);
    if (state.isError && onParseError) {
        onParseError(buildDiagnostic(state, input));
    }
    return { status: !state.isError, value: state.value };
}
