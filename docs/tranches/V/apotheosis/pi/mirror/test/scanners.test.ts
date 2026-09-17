import { describe, expect, it } from "vitest";
import { balancedUntil } from "../lexeme.js";
import { emptyComma, emptyTopLevelItem, splitTopLevel, splitValueTokens, topLevelColon } from "../util.js";

describe("imperative balanced scanners", () => {
    it("splits only at top level while preserving quoted and nested separators", () => {
        expect(splitTopLevel("a, fn(b, c), 'd,e'", ",")).toEqual(["a", "fn(b, c)", "'d,e'"]);
        expect(splitTopLevel("a   fn(b c)  d", "space")).toEqual(["a", "fn(b c)", "d"]);
    });

    it("keeps top-level colon and semicolon tokens separate", () => {
        expect(splitValueTokens("a fn(b : c) : d; e")).toEqual(["a", "fn(b : c)", ":", "d", ";", "e"]);
        expect(topLevelColon("--x syntax(<color>): red")).toBe(19);
    });

    it("detects empty comma arms without treating nested commas as empty", () => {
        expect(emptyComma("a, fn(b,c), d")).toBeUndefined();
        expect(emptyComma("a,,d")).toBe(2);
        expect(emptyComma("a,")).toBe(1);
    });

    it("detects empty balanced list arms for comma and slash separators", () => {
        expect(emptyTopLevelItem("a / fn(b / c) / d", "/")).toBeUndefined();
        expect(emptyTopLevelItem("a//d", "/")).toBe(2);
        expect(emptyTopLevelItem("/a", "/")).toBe(0);
        expect(emptyTopLevelItem("a/", "/")).toBe(1);
    });

    it("uses odd/even escape parity in every top-level utility", () => {
        expect(splitTopLevel("'a\\\\', b", ",")).toEqual(["'a\\\\'", "b"]);
        expect(splitTopLevel("'a\\', b', c", ",")).toEqual(["'a\\', b'", "c"]);
        expect(splitValueTokens("'a\\\\' : b")).toEqual(["'a\\\\'", ":", "b"]);
        expect(topLevelColon("'a\\\\': b")).toBe(5);
        expect(emptyTopLevelItem("'a\\\\',,b", ",")).toBe(6);
        expect(emptyTopLevelItem("'a\\',,b'", ",")).toBeUndefined();
    });

    it("captures raw text through nested, quoted, and commented stop characters", () => {
        const source = "  calc(1; 2) 'x;y' /* ; */ ;tail";
        const state = balancedUntil(";").parseState(source);
        expect(state.isError).toBe(false);
        expect(state.value).toBe("calc(1; 2) 'x;y' /* ; */");
        expect(source[state.offset]).toBe(";");
    });

    it("closes quotes after even backslash runs and preserves odd escaped quotes", () => {
        const even = String.raw`'a\\';tail`;
        const evenState = balancedUntil(";").parseState(even);
        expect(evenState.isError).toBe(false);
        expect(evenState.value).toBe(String.raw`'a\\'`);

        const odd = String.raw`'a\';inside';tail`;
        const oddState = balancedUntil(";").parseState(odd);
        expect(oddState.isError).toBe(false);
        expect(oddState.value).toBe(String.raw`'a\';inside'`);
    });
});
