/**
 * GROUND-B — the `skip` caveat, reproduced and characterised.
 *
 * V·π §7.3 reports: "after `leaf.skip(suffix)` consumes a successful leaf and the
 * suffix fails, the offset rewinds but the child value remains."
 *
 * This file is the executable answer. Every assertion below was first OBSERVED
 * against the published `@mkbabb/parse-that@1.0.0` bundle, then pinned. Nothing
 * here is inferred from reading the source.
 *
 * VERDICT (see GROUND-B-idiom.md §5 for the argument):
 *   · The behaviour is REAL and reproduces exactly as reported.
 *   · It is NOT a `skip` defect. `then`, `next`, `all` and `wrap` do the same
 *     thing. It is the library's uniform state discipline: on the error path a
 *     combinator restores `offset` and sets `isError`, and does NOT scrub
 *     `value`, because `value` is only defined when `isError === false`.
 *   · The exploitable surface is `Parser.parse()`, which returns `state.value`
 *     unconditionally — so a FAILED parse hands back a plausible-looking stale
 *     value. A consumer that branches on the truthiness of `parse()` reproduces
 *     the R1 class of bug in a new library. That is MISUSE, and the cure is one
 *     line: go through `parseState()` and branch on `isError`.
 */

import { describe, expect, it } from "vitest";
import { all, any, regex, string } from "@mkbabb/parse-that";

// ── §1 · the reported caveat, minimally ─────────────────────────────────────

describe("§1 the V·π §7.3 caveat reproduces exactly as reported", () => {
    const leaf = string("a");
    const suffix = string("b");
    const leafSkipSuffix = leaf.skip(suffix);

    it("rewinds the offset and RETAINS the child value on suffix failure", () => {
        const state = leafSkipSuffix.parseState("ax");

        expect(state.isError).toBe(true); // the parse failed …
        expect(state.offset).toBe(0); // … the offset rewound to the start …
        expect(state.value).toBe("a"); // … and the leaf's value survived.
    });

    it("so parse() hands back a stale value that looks like a success", () => {
        // THE HAZARD IN ONE LINE. `parse()` is `parseState(val).value` with no
        // isError consult, so a failed parse returns a truthy string.
        expect(leafSkipSuffix.parse("ax")).toBe("a");
    });

    it("the cure: parseState() + isError is total and never half-answers", () => {
        const attempt = (src: string): string | null => {
            const state = leafSkipSuffix.parseState(src);
            return state.isError ? null : state.value;
        };

        expect(attempt("ab")).toBe("ab".slice(0, 1)); // "a" — the real success
        expect(attempt("ax")).toBeNull(); // the stale "a" is not reported
        expect(attempt("")).toBeNull();
        expect(attempt("zz")).toBeNull();
    });
});

// ── §2 · scope: skip-specific defect, or library-wide discipline? ───────────

describe("§2 the retained value is library-wide, not a skip defect", () => {
    const a = string("a");
    const b = string("b");

    it("then() retains it too", () => {
        const state = a.then(b).parseState("ax");
        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe("a");
    });

    it("next() retains it too", () => {
        const state = a.next(b).parseState("ax");
        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe("a");
    });

    it("all() retains it too", () => {
        const state = all(a, b).parseState("ax");
        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe("a");
    });

    it("wrap() retains the INNER value when the closer fails", () => {
        // wrap(start, end) over /x/: "a" opens, "x" is the body, "b" never
        // arrives. The body's value is what survives.
        const state = regex(/x/).wrap(a, b).parseState("ax");
        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe("x");
    });

    it("any() leaves whatever the last arm left (here: nothing)", () => {
        const state = any(a, b).parseState("zz");
        expect(state.isError).toBe(true);
        expect(state.value).toBeUndefined();
    });

    it("opt() is the ONE combinator that scrubs the value — it must", () => {
        const state = a.skip(b).opt().parseState("zz");
        expect(state.isError).toBe(false);
        expect(state.offset).toBe(0);
        expect(state.value).toBeUndefined();
    });

    it("many()/sepBy() set [] on min-failure but do NOT rewind the offset", () => {
        // A separate, smaller sharp edge: every parent combinator restores its
        // own savedOffset on the error path, so this is contained — but a
        // hand-written driver that reads `state.offset` after a failed
        // `many(min>0)` reads a position the parse did not keep.
        const many = a.many(2).parseState("az");
        expect(many.isError).toBe(true);
        expect(many.value).toEqual([]);
        expect(many.offset).toBe(1); // NOT rewound to 0

        const sep = a.sepBy(string(","), 2).parseState("a,z");
        expect(sep.isError).toBe(true);
        expect(sep.value).toEqual([]);
        expect(sep.offset).toBe(1); // rewound past the separator, not to 0
    });
});

// ── §3 · does the stale value leak into a LATER success? ────────────────────

describe("§3 the stale value cannot leak into a subsequent success", () => {
    it("a succeeding or()-alternative overwrites it", () => {
        // `a.skip(b)` fails on "ax" leaving value "a"; the /x*/ alternative then
        // succeeds with an EMPTY match, whose value is `undefined`. The stale
        // "a" is overwritten, not inherited.
        const state = string("a").skip(string("b")).or(regex(/x*/)).parseState("ax");
        expect(state.isError).toBe(false);
        expect(state.value).toBeUndefined();
        // …but note the second trap it exposes: a SUCCESS that consumed nothing.
        expect(state.offset).toBe(0);
    });

    it("which is why every root production ends in .eof()", () => {
        const withoutEof = string("a").skip(string("b")).or(regex(/x*/));
        const withEof = withoutEof.eof();
        expect(withoutEof.parseState("ax").isError).toBe(false); // accepts garbage
        expect(withEof.parseState("ax").isError).toBe(true); // rejects it
    });
});

// ── §4 · ADJACENT FINDING A — all() drops `undefined` arms ──────────────────

describe("§4 all() drops undefined arms — positional misalignment", () => {
    const seq = all(string("a"), string("b").opt(), string("c"));

    it("keeps three positions when the optional arm matches", () => {
        expect(seq.parseState("abc").value).toEqual(["a", "b", "c"]);
    });

    it("SILENTLY COLLAPSES to two positions when it does not", () => {
        // TypeScript types this `[string, string | undefined, string]`.
        // At runtime it is length 2. `const [x, y, z] = value` then binds
        // z = undefined and y = "c" — every later index shifts by one.
        // This is the mechanism that breeds index-`!` assertions.
        const value = seq.parseState("ac").value;
        expect(value).toEqual(["a", "c"]);
        expect(value.length).toBe(2);
    });

    it("then() is optionality-safe: it builds its pair unconditionally", () => {
        const pair = string("a").then(string("b").opt()).parseState("ac").value;
        expect(pair.length).toBe(2);
        expect(pair[0]).toBe("a");
        expect(pair[1]).toBeUndefined();
    });

    it("an empty regex match is `undefined`, so it is dropped by all() too", () => {
        // A regex that CAN match zero characters yields `undefined` on the empty
        // match — a silent arm-dropper anywhere inside all().
        const empty = regex(/a*/).parseState("b");
        expect(empty.isError).toBe(false);
        expect(empty.value).toBeUndefined();
        expect(all(regex(/a*/), string("b")).parseState("b").value).toEqual(["b"]);
    });

    it("a regex ALWAYS fails at end-of-input, even if it could match empty", () => {
        expect(regex(/\s*/).parseState("").isError).toBe(true);
    });

    it("the trap is live in parse-that's OWN test suite (masked by parseFloat)", () => {
        // Verbatim shape from parse-that `test/math.test.ts` lines 18-22:
        //
        //   const exponent = all(regex(/[eE]/), regex(/[-+]/).opt(), digits)
        //       .map(([, exponentSign, exponent]) => `e${exponentSign ?? ""}${exponent}`)
        //       .opt();
        //
        // With no sign, all() yields ["e", "2"] — so `exponentSign` binds "2" and
        // `exponent` binds undefined. The producer emits the string "e2undefined".
        // The suite is green ONLY because parseFloat("123.456e2undefined") stops
        // at the first invalid character and returns 12345.6.
        //
        // This is pinned here as EVIDENCE, not as a proposal to change upstream:
        // the published 1.0.0 semantics are the contract this band builds on.
        const digits = regex(/[0-9]/)
            .many()
            .map((v) => v.join(""));
        const exponent = all(regex(/[eE]/), regex(/[-+]/).opt(), digits)
            .map(([, sign, exp]) => `e${sign ?? ""}${exp}`)
            .opt();

        expect(exponent.parse("e-2")).toBe("e-2"); // sign present — correct
        expect(exponent.parse("e2")).toBe("e2undefined"); // sign absent — WRONG
        expect(parseFloat("123.456e2undefined")).toBe(12345.6); // …and masked
    });
});

// ── §5 · ADJACENT FINDING B — .not() succeeds with the AMBIENT value ────────

describe("§5 zero-arg .not() yields the ambient value, not a void", () => {
    it("standalone it is undefined", () => {
        const state = string("b").not().parseState("c");
        expect(state.isError).toBe(false);
        expect(state.offset).toBe(0);
        expect(state.value).toBeUndefined();
    });

    it("inside all() it duplicates the PREVIOUS arm's value", () => {
        // `not()`'s negate branch is `return state.ok(savedValue)` where
        // savedValue is whatever the threaded state already held — i.e. the
        // previous sibling's value. It is therefore NOT undefined inside a
        // sequence, so all() does not drop it: a phantom third element appears.
        //
        // The declared return type is `Parser<string>`, which is a further lie:
        // the value is the ambient one, of whatever type that happens to be.
        expect(all(string("a"), string("b").not(), string("c")).parseState("ac").value)
            .toEqual(["a", "a", "c"]);
    });

    it("the idiomatic negative lookahead attaches the assertion with skip()", () => {
        // `x.skip(y.not())` keeps x's value, asserts y does not follow, consumes
        // nothing extra, and adds NO positional element.
        const guarded = all(string("a").skip(string("b").not()), string("c"));
        expect(guarded.parseState("ac").value).toEqual(["a", "c"]);
        expect(guarded.parseState("abc").isError).toBe(true);
    });
});

// ── §6 · the R1 shape, in the new library ───────────────────────────────────

describe("§6 the shape of the live parseCssColor bug, reproduced in parse-that", () => {
    // `<ident>(` … `)` — the skeleton of every CSS colour function.
    const colourish = regex(/[a-z]+/).skip(string("(")).skip(string(")"));

    it("parse() returns a truthy stale ident for an UNCLOSED function", () => {
        // `parseCssColor("oklch(")` must not be answerable. Through parse(),
        // it is answered — with "oklch".
        expect(colourish.parse("oklch(")).toBe("oklch");
        expect(colourish.parse("zzz")).toBe("zzz");
    });

    it("through parseState() the same inputs are cleanly unparseable", () => {
        const total = (src: string): string | null => {
            const state = colourish.parseState(src);
            return state.isError ? null : state.value;
        };

        expect(total("oklch()")).toBe("oklch");
        for (const hostile of ["oklch(", "zzz", "", "()", "oklch)", "oklch(  )"]) {
            expect(total(hostile), `expected ${JSON.stringify(hostile)} to be unparseable`).toBeNull();
        }
    });
});
