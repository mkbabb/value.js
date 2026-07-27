/**
 * GROUND-B — the anti-pattern list, made EXECUTABLE.
 *
 * A prose list of "things that are not idiomatic" is unfalsifiable. Each section
 * below builds the anti-pattern for real and pins the concrete failure it causes,
 * so a reviewer can point at a running assertion rather than at an opinion.
 *
 * The `!` non-null assertions in §1 are DELIBERATE — they are the transcribed
 * anti-pattern, and they are the only `!` in this workspace. `example.ts` has
 * zero.
 */

import { describe, expect, it } from "vitest";
import { Parser, any, regex, string } from "@mkbabb/parse-that";
import { parseMath } from "./example.js";

// ── §1 · a hand-rolled cursor beside the combinators ────────────────────────
//
// This is the shape of the LIVE R1 crash in `src/css/grammar.ts`. It is
// transcribed here (not imported) so the failure is reproduced from the
// technique, not from the one file: any hand-rolled scanner that filters its
// output by truthiness has this hole.

/** Transcription of the subject's `splitTopLevel` (grammar.ts:63), separator arm. */
function splitTopLevel(source: string, separator: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!; // ← index-`!` #1: overrides noUncheckedIndexedAccess
        if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && char === separator) {
            const part = source.slice(start, i).trim();
            if (part) parts.push(part); // ← the truthiness filter that opens the hole
            start = i + 1;
        }
    }
    const tail = source.slice(start).trim();
    if (tail) parts.push(tail); // ← …and again
    return parts;
}

describe("§1 hand-rolled cursor — the R1 crash reproduced from the technique", () => {
    it("returns [] for an empty body, which the caller does not expect", () => {
        expect(splitTopLevel("", "/")).toEqual([]);
        expect(splitTopLevel("   ", "/")).toEqual([]);
    });

    it("so the caller's `slash[0]!.replace(...)` throws a TypeError", () => {
        // Verbatim caller shape, grammar.ts:181:
        //     const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
        const caller = (body: string): string[] => {
            const slash = splitTopLevel(body, "/");
            return splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
        };

        expect(() => caller("1 2 3")).not.toThrow(); // the happy path hides it
        expect(() => caller("")).toThrowError(TypeError); // `oklch()` → body ""
        expect(() => caller("  ")).toThrowError(TypeError); // `hsl(  )` → body "  "
    });

    it("the `!` is not incidental — it is what silenced the compiler", () => {
        // Under `noUncheckedIndexedAccess`, `slash[0]` is `string | undefined`.
        // The type system stated the defect at compile time; the `!` overrode it.
        // 74 such overrides is 74 statements of "I know better", one of which is
        // the shipping crash.
        const slash: string[] = splitTopLevel("", "/");
        const zeroth: string | undefined = slash[0];
        expect(zeroth).toBeUndefined();
    });

    it("the combinator answer is TOTAL: an empty body is a clean failure", () => {
        // No array to index, so no index to assert on. `calc()` is unparseable
        // and says so; it does not throw and does not half-answer.
        const outcome = parseMath("calc()");
        expect(outcome.ok).toBe(false);
        expect(() => parseMath("calc()")).not.toThrow();
        expect(() => parseMath("calc(  )")).not.toThrow();
    });
});

// ── §2 · regex doing the parsing, combinators as decoration ─────────────────

describe("§2 regex-as-parser — the capture groups are not even reachable", () => {
    const RGB = /rgb\((\d+),(\d+),(\d+)\)/;

    it("parse-that's regex() yields the WHOLE match; groups are invisible", () => {
        // A structure-in-capture-groups design cannot read its own structure
        // through the default `regex()` path. The combinator contributes
        // nothing but a wrapper — the parsing all happened in the regex engine.
        expect(regex(RGB).parse("rgb(1,2,3)")).toBe("rgb(1,2,3)");
    });

    it("reaching a group needs matchFunction, which has a zero-width trap", () => {
        // `matchFunction` returning "" is routed to `state.ok(undefined)` —
        // SUCCESS, value `undefined`, and NOTHING CONSUMED. An optional group
        // that legitimately matched empty therefore silently yields a
        // zero-width success that a `many()` above it will treat as no-progress.
        const firstGroup = regex(/(a?)(b)/, (m) => m?.[1] ?? null);

        const matched = firstGroup.parseState("ab");
        expect(matched.isError).toBe(false);
        expect(matched.value).toBe("a");
        expect(matched.offset).toBe(2); // consumed the whole match span

        const empty = firstGroup.parseState("b");
        expect(empty.isError).toBe(false); // "succeeded" …
        expect(empty.value).toBeUndefined(); // … with no value …
        expect(empty.offset).toBe(0); // … and consumed nothing.
    });

    it("a single regex cannot see nesting; the combinator grammar can", () => {
        // `[^,]+` is blind to the comma inside `min(1px, 2px)`.
        const flat = /min\(([^,]+),([^,]+)\)/;
        expect(flat.test("min(1px, 2px)")).toBe(true);
        expect(flat.test("min(min(1px, 2px), 3px)")).toBe(true); // matches the WRONG span
        expect("min(min(1px, 2px), 3px)".match(flat)?.[0]).toBe("min(min(1px, 2px)");

        // The grammar recurses instead of guessing.
        expect(parseMath("min(min(1px, 2px), 3px)").ok).toBe(true);
    });
});

// ── §3 · broad remainder capture ────────────────────────────────────────────

describe("§3 broad `.*` / `[^)]*` remainder capture", () => {
    it("`.*` is greedy and eats the closer — VALID input is rejected", () => {
        const greedy = string("rgb(").next(regex(/.*/)).skip(string(")"));
        expect(greedy.parseState("rgb(1,2,3)").isError).toBe(true);
    });

    it("`[^)]*` stops at the FIRST closer — nested input is truncated", () => {
        const upToCloser = string("calc(")
            .next(regex(/[^)]*/))
            .skip(string(")"))
            .eof();
        expect(upToCloser.parseState("calc(1 + 2)").isError).toBe(false);
        // The body is `min(1px, 2px)`; `[^)]*` halts inside it.
        expect(upToCloser.parseState("calc(min(1px, 2px))").isError).toBe(true);
        expect(parseMath("calc(min(1px, 2px))").ok).toBe(true);
    });

    it("and the captured remainder is an unparsed string the caller must re-parse", () => {
        // The tell: the combinator's output type is `string`, not an AST node.
        // Every such capture defers the real parsing to a second pass, which is
        // where the `!` assertions and the split-on-comma heuristics breed.
        const captured: string | undefined = string("calc(")
            .next(regex(/[^)]*/))
            .skip(string(")"))
            .parse("calc(1 + 2)");
        expect(captured).toBe("1 + 2");
    });
});

// ── §4 · `chain` where `map` suffices ───────────────────────────────────────

/** `succeed(v)` — zero-width success. `string("")` always matches, consuming 0. */
const pure = <T>(value: T): Parser<T> => string("").map(() => value);

describe("§4 chain() vs map() — chain builds a parser per parse", () => {
    it("map() runs no factory; chain() runs one on EVERY parse", () => {
        let mapCalls = 0;
        let chainFactoryCalls = 0;

        const viaMap = regex(/\d+/).map((v) => {
            mapCalls++;
            return Number(v);
        });
        const viaChain = regex(/\d+/).chain((v) => {
            chainFactoryCalls++;
            return pure(Number(v));
        });

        for (let i = 0; i < 5; i++) {
            expect(viaMap.parse("42")).toBe(42);
            expect(viaChain.parse("42")).toBe(42);
        }

        // Identical results. The chain version additionally allocated a fresh
        // Parser (and its closure, and its context object) five times, for a
        // transformation with no grammatical dependency on the value.
        expect(mapCalls).toBe(5);
        expect(chainFactoryCalls).toBe(5);
    });

    it("chain() IS warranted when the value chooses the grammar of the tail", () => {
        // Length-prefixed token: the tail's shape is not knowable until the
        // prefix is read. No amount of `map` expresses this.
        const lengthPrefixed = regex(/\d/).chain((n) =>
            regex(new RegExp(`[a-z]{${n}}`)),
        );

        expect(lengthPrefixed.parse("3abc")).toBe("abc");
        expect(lengthPrefixed.parse("1abc")).toBe("a");
        expect(lengthPrefixed.eof().parseState("3ab").isError).toBe(true);
    });
});

// ── §5 · one god-production ─────────────────────────────────────────────────

describe("§5 the god-production, and why it is a correctness problem", () => {
    it("a wide positional tuple with an optional arm misaligns silently", () => {
        // `all()` DROPS `undefined` arms at runtime while TypeScript keeps the
        // position (pinned in detail in skip-caveat.test.ts §4). The wider the
        // production, the more positions there are to shift, and the more
        // tempting `parts[4]!` becomes.
        const godProduction = Parser.lazy(() =>
            any(
                string("("),
                regex(/\d+/),
                string(",").opt(),
                regex(/\d+/),
                string(")"),
            ),
        );
        // Not even exercised — the point is the shape below.
        expect(godProduction).toBeInstanceOf(Parser);
    });

    it("named sub-productions make each arm independently testable", () => {
        // Every production in example.ts is reachable and assertable on its own;
        // that is what let §1's totality claim be checked at four levels rather
        // than only at the root.
        expect(parseMath("calc(1)").ok).toBe(true);
        expect(parseMath("min(1px, 2px)").ok).toBe(true);
        expect(parseMath("clamp(1px, 2px, 3px)").ok).toBe(true);
        expect(parseMath("calc((1 + 2) * 3)").ok).toBe(true);
    });
});
