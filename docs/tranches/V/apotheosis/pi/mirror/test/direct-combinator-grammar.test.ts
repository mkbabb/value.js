import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { whole } from "../grammar/css/l4/combinators.js";
import { cssString, dashedIdentifier, hash, identifier } from "../grammar/css/l4/tokens.js";
import {
    angle, frequency, genericDimension, length, percentage, resolution, time, valueUnit,
} from "../grammar/css/l4/value-unit.js";

const parse = <T>(parser: { parseState(source: string): { isError: boolean; value: T } }, source: string): T => {
    const state = parser.parseState(source);
    expect(state.isError, source).toBe(false);
    return state.value;
};

describe("direct parse-that CSS grammar foundation", () => {
    it("parses CSS identifier and string productions directly from source", () => {
        expect(parse(whole(identifier), String.raw`\66 oo`)).toBe("foo");
        expect(parse(whole(dashedIdentifier), String.raw`--f\6f o`)).toBe("--foo");
        expect(parse(whole(hash), String.raw`#\31 23`)).toEqual({ raw: String.raw`#\31 23`, value: "123" });
        expect(parse(whole(cssString), String.raw`"a\"b"`)).toBe(String.raw`"a\"b"`);
    });

    it("composes numeric and unit productions without an intermediate lexer", () => {
        const rows = [
            [length, "+.5rem", { value: 0.5, unit: "rem", raw: "+.5rem" }],
            [length, "1CQMIN", { value: 1, unit: "CQMIN", raw: "1CQMIN" }],
            [angle, "-.25turn", { value: -0.25, unit: "turn", raw: "-.25turn" }],
            [time, "1e2ms", { value: 100, unit: "ms", raw: "1e2ms" }],
            [frequency, "44.1kHz", { value: 44.1, unit: "kHz", raw: "44.1kHz" }],
            [resolution, "2dppx", { value: 2, unit: "dppx", raw: "2dppx" }],
            [percentage, "50%", { value: 50, unit: "%", raw: "50%" }],
            [genericDimension, "3foo", { value: 3, unit: "foo", raw: "3foo" }],
        ] as const;
        for (const [parser, source, expected] of rows) expect(parse(whole(parser), source)).toEqual(expected);
        for (const source of ["1px", "1deg", "1ms", "1khz", "1dpi", "1fr", "1%", "1"] as const) {
            expect(whole(valueUnit).parseState(source).isError, source).toBe(false);
        }
    });

    it("handles comments and whitespace through ordinary combinator trimming", () => {
        expect(parse(whole(length), " /**/ 1px /*x*/ ")).toEqual({ value: 1, unit: "px", raw: "1px" });
        expect(whole(length).parseState("1px/*").isError).toBe(true);
    });

    it("contains no atom, scanner, token-object, or whole-remainder adapter path", () => {
        const files = ["combinators.ts", "tokens.ts", "value-unit.ts"];
        for (const file of files) {
            const path = fileURLToPath(new URL(`../grammar/css/l4/${file}`, import.meta.url));
            const source = readFileSync(path, "utf8");
            expect(source, path).not.toMatch(/syntax\/(?:atom|component-value)|splitTopLevel|balancedUntil|state\.src\.slice\(state\.offset\)/);
        }
    });
});
