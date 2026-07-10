// W1-8 (S.W1 · lib-parsing F-5) — the ONE shared balanced-text scanner that the
// seven formerly hand-rolled scanners now build on. These gates lock the core
// engine's behavior (bracket sets, string-awareness, escapes, trim/keep-empty)
// directly, independent of the seven consumer grammars that also exercise it.

import { describe, expect, it } from "vitest";

import {
    BRACKETS_ALL,
    BRACKETS_ROUND,
    BRACKETS_ROUND_SQUARE,
    balancedText,
    findTopLevel,
    splitTopLevel,
    splitTopLevelCommas,
    tryParse,
} from "@src/parsing/utils";

const onComma = (ch: string) => ch === ",";
const onColon = (ch: string) => ch === ":";

describe("W1-8 splitTopLevel — the shared top-level splitter", () => {
    it("splits on top-level commas, trimming + dropping empties by default", () => {
        expect(splitTopLevel("a, b ,c", onComma)).toEqual(["a", "b", "c"]);
        expect(splitTopLevel("a,,b", onComma)).toEqual(["a", "b"]);
    });

    it("keeps parenthesised groups whole (round-only bracket set)", () => {
        expect(
            splitTopLevel("rgb(1, 2, 3), blue", onComma, {
                brackets: BRACKETS_ROUND,
            }),
        ).toEqual(["rgb(1, 2, 3)", "blue"]);
    });

    it("does not track square brackets when the set omits them", () => {
        // round-only: a comma inside [ ... ] IS a top-level split point.
        expect(
            splitTopLevel("[a, b], c", onComma, { brackets: BRACKETS_ROUND }),
        ).toEqual(["[a", "b]", "c"]);
        // round+square: the same comma is protected.
        expect(
            splitTopLevel("[a, b], c", onComma, {
                brackets: BRACKETS_ROUND_SQUARE,
            }),
        ).toEqual(["[a, b]", "c"]);
    });

    it("is string-aware by default — a delimiter inside a literal is protected", () => {
        expect(splitTopLevel('"a,b", c', onComma)).toEqual(['"a,b"', "c"]);
    });

    it("preserves backslash escapes inside a string literal verbatim", () => {
        expect(splitTopLevel('"a\\,b", c', onComma)).toEqual(['"a\\,b"', "c"]);
    });

    it("strings:false treats quotes as ordinary characters", () => {
        expect(
            splitTopLevel('"a,b", c', onComma, { strings: false }),
        ).toEqual(['"a', 'b"', "c"]);
    });

    it("keepEmpty + trim:false reproduce raw asymmetric splits (if()-clause shape)", () => {
        expect(
            splitTopLevel("a;;", (ch) => ch === ";", {
                brackets: BRACKETS_ALL,
                strings: false,
                trim: false,
                keepEmpty: true,
            }),
        ).toEqual(["a", "", ""]);
    });
});

describe("W1-8 findTopLevel — first top-level delimiter index", () => {
    it("finds the first top-level colon, skipping bracketed + string colons", () => {
        expect(findTopLevel("a:b", onColon)).toBe(1);
        expect(
            findTopLevel("type(a:b):c", onColon, {
                brackets: BRACKETS_ROUND_SQUARE,
            }),
        ).toBe(9);
        expect(findTopLevel('"a:b":c', onColon)).toBe(5);
    });

    it("returns -1 when no top-level delimiter exists", () => {
        expect(findTopLevel("abc", onColon)).toBe(-1);
        expect(findTopLevel("(a:b)", onColon, { brackets: BRACKETS_ROUND })).toBe(
            -1,
        );
    });
});

describe("W1-8 balancedText — the scan-to-stop Parser", () => {
    it("consumes up to the first top-level stop char, respecting nesting", () => {
        const upToSemi = balancedText((input, i) => input[i] === ";");
        expect(tryParse(upToSemi, "calc(1 + 2); rest")).toBe("calc(1 + 2)");
    });

    it("halts at a stray unbalanced close bracket (stopOnUnbalancedClose)", () => {
        const upToSemi = balancedText((input, i) => input[i] === ";");
        expect(tryParse(upToSemi, "abc}def")).toBe("abc");
    });
});

describe("W1-8 splitTopLevelCommas — the promoted shared splitter", () => {
    it("still splits #-list values keeping parenthesised timelines whole", () => {
        expect(splitTopLevelCommas("scroll(root block), --named")).toEqual([
            "scroll(root block)",
            "--named",
        ]);
    });
});
