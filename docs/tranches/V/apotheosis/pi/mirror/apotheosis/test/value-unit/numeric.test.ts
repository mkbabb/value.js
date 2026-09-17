import { ParserState, string } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";

import { consumeNumber } from "../../grammar/css/l4/value-unit/numeric.js";

describe("CSS consume a number", () => {
    it("returns the intrinsic maximal-prefix leaf", () => {
        const state = consumeNumber.parseState("-1.25e+2rest");

        expect(state.isError).toBe(false);
        expect(state.offset).toBe(8);
        expect(state.value).toEqual({ sign: "-", type: "number", value: -125 });
        expect(Object.keys(state.value)).toEqual(["sign", "type", "value"]);
    });

    it("leaves incomplete exponents and repeated fractions to the parent", () => {
        const exponent = consumeNumber.parseState("1e+");
        const fraction = consumeNumber.parseState("1.2.3");

        expect(exponent.offset).toBe(1);
        expect(exponent.value).toEqual({ sign: null, type: "integer", value: 1 });
        expect(fraction.offset).toBe(3);
        expect(fraction.value).toEqual({ sign: null, type: "number", value: 1.2 });
    });

    it("composes as the numeric leaf of a percentage production", () => {
        const percentage = consumeNumber.skip(string("%")).eof();

        expect(percentage.parse("+12.5%")).toEqual({
            sign: "+",
            type: "number",
            value: 12.5,
        });
    });

    it("fails transactionally without per-call parser construction", () => {
        const predecessor = { sentinel: true };
        const state = new ParserState<any>("not-a-number", predecessor);
        const parserId = consumeNumber.id;

        expect(consumeNumber.call(state)).toBe(state);
        expect(state.isError).toBe(true);
        expect(state.offset).toBe(0);
        expect(state.value).toBe(predecessor);

        for (let index = 0; index < 1_000; index += 1) {
            consumeNumber.parseState(`${index}`);
        }

        expect(consumeNumber.id).toBe(parserId);
    });
});
