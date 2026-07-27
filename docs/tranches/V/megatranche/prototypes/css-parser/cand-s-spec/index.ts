/**
 * CANDIDATE S · SPEC-SHAPED — the door.
 *
 * THE ONE RULE THAT RETIRES R1 (GROUND-B R-11): every entry point goes through
 * `parseState()` and branches on `isError`. `Parser.parse()` is
 * `parseState(val).value` with no `isError` consult, so on a FAILED parse it
 * hands back whatever the last successful sub-parser left on the state —
 * `colourish.parse("oklch(")` returns `"oklch"`. A candidate that ports the
 * grammar and keeps an `if (p.parse(src))` call site has MOVED the crash, not
 * fixed it.
 *
 * The return type is a discriminated union. There is no way for a caller to
 * read `value` without having proven `ok`, no `null` in a tuple, and no thrown
 * exception on any input.
 */

import type { ParserState } from "@mkbabb/parse-that";

import type { AbsoluteColor, ColorValue } from "./ast";
import { isContextDependent } from "./ast";
import { colorRoot } from "./color";

export type { ColorValue, AbsoluteColor } from "./ast";
export { color, colorRoot } from "./color";

/**
 * The two refusal codes, matching `src/css/types.ts#ParseIssue["code"]` so this
 * candidate is a drop-in for the subject's contract.
 *
 * `color_context_required` means RECOGNISED BUT UNRESOLVABLE HERE — the input
 * is a well-formed `<color>` whose value depends on information a context-free
 * parser does not have. `css_syntax` means the input is not a `<color>`.
 */
export type IssueCode = "css_syntax" | "color_context_required";

export interface ParseSuccess<T> {
    readonly ok: true;
    readonly value: T;
}

export interface ParseFailure {
    readonly ok: false;
    readonly code: IssueCode;
    /** Furthest offset the parse reached — the caret position. */
    readonly offset: number;
    /** Populated only while `enableDiagnostics()` is on; `[]` otherwise. */
    readonly expected: readonly string[];
}

export type ParseOutcome<T> = ParseSuccess<T> | ParseFailure;

/**
 * `<color>` as WRITTEN — the whole css-color-4 + css-color-5 grammar, including
 * the forms whose VALUE needs a context (`currentColor`, `<system-color>`,
 * relative colour, `color-mix()`, `light-dark()`, `contrast-color()`, `var()`).
 *
 * This is the syntactic door. Use it when you want to know what the author
 * wrote; use `parseCssColor` when you want a colour you can render.
 */
export function parseColorSyntax(source: string): ParseOutcome<ColorValue> {
    let state: ParserState<ColorValue>;

    try {
        state = colorRoot.parseState(source);
    } catch (error) {
        // Recursive descent has a finite stack, and `<color>` is genuinely
        // recursive (`color-mix()`, `light-dark()`, relative colour). ~1000
        // nested levels exhaust it and V8 signals that as a `RangeError`.
        // A door that promises totality must convert it — so this is the ONE
        // catch in the candidate, narrowed to `RangeError` so that a genuine
        // defect still surfaces instead of being swallowed. The measured limit
        // is between 500 and 1000 nesting levels; `hostility.test.ts` pins the
        // behaviour, not the number.
        if (error instanceof RangeError) {
            return {
                ok: false,
                code: "css_syntax",
                offset: 0,
                expected: ["<color> nested within the implementation limit"],
            };
        }
        throw error;
    }

    if (state.isError) {
        return {
            ok: false,
            code: "css_syntax",
            offset: state.furthest >= 0 ? state.furthest : state.offset,
            expected: state.expected ?? [],
        };
    }

    return { ok: true, value: state.value };
}

/**
 * `<color>` as a RESOLVED, context-free colour — the subject's contract.
 *
 * Anything the grammar recognises but cannot resolve without a context is
 * refused with `color_context_required`, exactly as the subject refuses
 * `currentColor` today. The difference is that the refusal is now a decision
 * about a parsed NODE rather than a regex pre-empt run before parsing: the
 * subject's `/\bfrom\b/i.test(body)` also fires on `color(--from-scan 1 0 0)`,
 * which contains no relative colour at all.
 */
export function parseCssColor(source: string): ParseOutcome<AbsoluteColor> {
    const parsed = parseColorSyntax(source);

    if (!parsed.ok) return parsed;
    if (parsed.value.kind === "absolute") return { ok: true, value: parsed.value };

    return {
        ok: false,
        code: isContextDependent(parsed.value) ? "color_context_required" : "css_syntax",
        offset: 0,
        expected: ["context-free color"],
    };
}
