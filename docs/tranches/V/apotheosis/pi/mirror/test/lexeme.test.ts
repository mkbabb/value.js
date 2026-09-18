import { describe, expect, it } from "vitest";
import { fnHead, ident, lexeme, lit, num, numUnit, quoted, runComplete } from "../lexeme.js";

describe("fused CSS lexemes", () => {
    it("parses numbers and units in one leaf pass", () => {
        expect(runComplete(num, "+1.25e2")).toEqual({ value: 125, unit: "" });
        expect(runComplete(numUnit, "-2.5rem")).toEqual({ value: -2.5, unit: "rem" });
    });

    it("preserves identifier case, lowers function heads, and retains quoted raw text", () => {
        expect(runComplete(ident, "--My-Token")).toBe("--My-Token");
        for (const value of ["--", "---", "----", "--0", "--1"]) {
            expect(runComplete(ident, value)).toBe(value);
        }
        expect(runComplete(fnHead, "RGB(")).toBe("rgb");
        expect(runComplete(quoted, "'a\\'b'")).toBe("'a\\'b'");
    });

    it("accepts CSS string line continuations across LF, CRLF, CR, and FF", () => {
        for (const value of ['"a\\\nb"', '"a\\\r\nb"', '"a\\\rb"', '"a\\\fb"']) {
            expect(runComplete(quoted, value)).toBe(value);
        }
        expect(runComplete(quoted, '"a\nb"')).toBeNull();
        expect(runComplete(quoted, '"a\rb"')).toBeNull();
        expect(runComplete(quoted, '"a\fb"')).toBeNull();
    });

    it("advances later tokens by consumed length rather than absolute offset", () => {
        expect(runComplete(lit("a").then(numUnit), "a /* gap */ 2px")).toEqual(["a", { value: 2, unit: "px" }]);
    });

    it("seals the span before block-comment trivia", () => {
        const word = lexeme(/word/y, (_match, start, end) => ({ raw: "word", span: { start, end } }));
        expect(runComplete(word, "word /* trailing */ ")).toEqual({ raw: "word", span: { start: 0, end: 4 } });
    });

    it("rejects non-sticky patterns and unterminated trivia", () => {
        expect(() => lexeme(/x/, () => "x")).toThrow(/sticky/);
        expect(runComplete(lit("x"), "x /* open")).toBeNull();
    });
});
