import { Parser, regex, string } from "@mkbabb/parse-that";
import type { ParserState } from "@mkbabb/parse-that";

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

export const none = istring("none");

/**
 * Split a property-level `#`-list value on its top-level commas, respecting
 * nested parens (so `scroll(root block)` stays one segment) and string literals.
 *
 * Promoted here (N.W11′ D2) from `animation-shorthand.ts`'s local — shared by
 * the `animation` shorthand splitter AND the scroll-timeline `#`-list grammars
 * (`animation-timeline` / `animation-range` / `timeline-scope`). KISS: one
 * paren/string-aware splitter, not a second copy.
 */
export const splitTopLevelCommas = (input: string): string[] => {
    const out: string[] = [];
    let buf = "";
    let depth = 0;
    let inString: string | null = null;
    for (let i = 0; i < input.length; i++) {
        const ch = input[i]!;
        if (inString) {
            if (ch === "\\" && i + 1 < input.length) {
                buf += ch + input[++i]!;
                continue;
            }
            if (ch === inString) inString = null;
            buf += ch;
            continue;
        }
        if (ch === '"' || ch === "'") {
            inString = ch;
            buf += ch;
            continue;
        }
        if (ch === "(") {
            depth++;
            buf += ch;
            continue;
        }
        if (ch === ")") {
            depth--;
            buf += ch;
            continue;
        }
        if (ch === "," && depth === 0) {
            const t = buf.trim();
            if (t.length > 0) out.push(t);
            buf = "";
            continue;
        }
        buf += ch;
    }
    const t = buf.trim();
    if (t.length > 0) out.push(t);
    return out;
};

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

/** Parser that always fails with the given message. */
export function fail(message: string): Parser<never> {
    return new Parser<never>((state: ParserState<any>) => {
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
