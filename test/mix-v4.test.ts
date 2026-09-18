import { describe, expect, it } from "vitest";
import { mixColors } from "@mkbabb/value.js/color";
import { parseColorIn } from "../demo/color-session/color-utils";
import { mixColorSequence } from "../demo/palettes/mix";

const colors = ["red", "lime", "blue"].map((source) => parseColorIn(source, "oklab"));

describe("Mix demo Value 4 reduction", () => {
    it("folds equal weights through failure-explicit mixColors results", () => {
        const first = mixColors(colors[0]!, colors[1]!, 1 / 2, {
            space: "oklab",
            hue: "shorter",
        });
        expect(first.ok).toBe(true);
        if (!first.ok) return;
        const direct = mixColors(first.value, colors[2]!, 1 / 3, {
            space: "oklab",
            hue: "shorter",
        });
        expect(direct.ok).toBe(true);
        if (!direct.ok) return;

        expect(mixColorSequence(colors, "oklab", "shorter")).toEqual(direct.value);
    });

    it("preserves explicit weighted accumulation", () => {
        const first = mixColors(colors[0]!, colors[1]!, 2 / 3, {
            space: "oklab",
            hue: "shorter",
        });
        expect(first.ok).toBe(true);
        if (!first.ok) return;
        const direct = mixColors(first.value, colors[2]!, 1 / 4, {
            space: "oklab",
            hue: "shorter",
        });
        expect(direct.ok).toBe(true);
        if (!direct.ok) return;

        expect(mixColorSequence(colors, "oklab", "shorter", [1, 2, 1])).toEqual(
            direct.value,
        );
    });

    it("rejects invalid weights instead of substituting a fallback", () => {
        expect(() => mixColorSequence(colors, "oklab", "shorter", [1, 1])).toThrow(
            "Each color requires a weight",
        );
        expect(() => mixColorSequence(colors, "oklab", "shorter", [0, 0, 0])).toThrow(
            "At least one color weight must be positive",
        );
    });
});
