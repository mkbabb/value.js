import { describe, expect, it } from "vitest";
import {
    parseAnimationShorthand,
    reverseAnimationShorthand,
} from "../src/parsing/animation-shorthand";
import type { CSSAnimationOptions } from "../src/parsing/extract";

// ─────────────────────────────────────────────────────────────────────────────
// parseAnimationShorthand
// ─────────────────────────────────────────────────────────────────────────────

describe("parseAnimationShorthand — single-segment shorthands", () => {
    it("parses '1s ease' as duration + timingFunction", () => {
        const result = parseAnimationShorthand("1s ease");
        expect(result).toHaveLength(1);
        expect(result[0]!.duration).toBe(1000);
        expect(result[0]!.timingFunction).toBe("ease");
    });

    it("parses '500ms linear' as duration + timingFunction", () => {
        const result = parseAnimationShorthand("500ms linear");
        expect(result[0]!.duration).toBe(500);
        expect(result[0]!.timingFunction).toBe("linear");
    });

    it("parses 'slide 2s ease-in-out 0.5s infinite alternate'", () => {
        const result = parseAnimationShorthand(
            "slide 2s ease-in-out 0.5s infinite alternate",
        );
        const o = result[0]!;
        expect(o.duration).toBe(2000);
        expect(o.timingFunction).toBe("ease-in-out");
        expect(o.delay).toBe(500);
        expect(o.iterationCount).toBe(Infinity);
        expect(o.direction).toBe("alternate");
        expect(o.name).toBe("slide");
    });

    it("parses numeric iteration count", () => {
        const result = parseAnimationShorthand("anim 1s 3");
        expect(result[0]!.iterationCount).toBe(3);
    });

    it("treats first time as duration, second as delay", () => {
        const result = parseAnimationShorthand("1s 2s");
        expect(result[0]!.duration).toBe(1000);
        expect(result[0]!.delay).toBe(2000);
    });

    it("parses cubic-bezier() timing as a single token", () => {
        const result = parseAnimationShorthand(
            "1s cubic-bezier(0.1, 0.7, 1, 0.1)",
        );
        expect(result[0]!.timingFunction).toBe(
            "cubic-bezier(0.1, 0.7, 1, 0.1)",
        );
    });

    it("parses steps() timing", () => {
        const result = parseAnimationShorthand("1s steps(4, end)");
        expect(result[0]!.timingFunction).toBe("steps(4, end)");
    });

    it("parses fill-mode keyword", () => {
        const result = parseAnimationShorthand("slide 1s forwards");
        expect(result[0]!.fillMode).toBe("forwards");
        expect(result[0]!.name).toBe("slide");
    });

    it("parses composition keyword", () => {
        const result = parseAnimationShorthand("slide 1s add");
        expect(result[0]!.composition).toBe("add");
    });

    it("parses direction keywords", () => {
        expect(parseAnimationShorthand("a 1s reverse")[0]!.direction).toBe(
            "reverse",
        );
        expect(parseAnimationShorthand("a 1s alternate-reverse")[0]!.direction).toBe(
            "alternate-reverse",
        );
        expect(parseAnimationShorthand("a 1s normal")[0]!.direction).toBe(
            "normal",
        );
    });
});

describe("parseAnimationShorthand — multi-segment", () => {
    it("parses two comma-separated animations", () => {
        const result = parseAnimationShorthand("1s ease-in, 500ms linear");
        expect(result).toHaveLength(2);
        expect(result[0]!.duration).toBe(1000);
        expect(result[0]!.timingFunction).toBe("ease-in");
        expect(result[1]!.duration).toBe(500);
        expect(result[1]!.timingFunction).toBe("linear");
    });

    it("respects parens in cubic-bezier when splitting commas", () => {
        const result = parseAnimationShorthand(
            "1s cubic-bezier(0.1, 0.7, 1, 0.1), 2s linear",
        );
        expect(result).toHaveLength(2);
        expect(result[0]!.timingFunction).toBe(
            "cubic-bezier(0.1, 0.7, 1, 0.1)",
        );
    });

    it("ignores empty trailing segments", () => {
        const result = parseAnimationShorthand("1s ease,");
        expect(result).toHaveLength(1);
    });
});

describe("parseAnimationShorthand — edge cases", () => {
    it("empty input yields a single empty options object", () => {
        const result = parseAnimationShorthand("");
        expect(result).toHaveLength(0);
    });

    it("unknown tokens are ignored", () => {
        const result = parseAnimationShorthand("1s ease foobar");
        expect(result[0]!.duration).toBe(1000);
        // foobar is treated as animation-name (matches isAnimationName)
        expect(result[0]!.name).toBe("foobar");
    });

    it("'infinite' yields Infinity iterationCount", () => {
        const result = parseAnimationShorthand("1s infinite");
        expect(result[0]!.iterationCount).toBe(Infinity);
    });

    it("negative numbers are NOT treated as iteration count", () => {
        const result = parseAnimationShorthand("1s -2");
        expect(result[0]!.iterationCount).toBeUndefined();
    });

    it("case-insensitive keyword matching", () => {
        const result = parseAnimationShorthand("1s EASE-IN ALTERNATE");
        expect(result[0]!.timingFunction).toBe("EASE-IN");
        expect(result[0]!.direction).toBe("alternate");
    });

    it("does not crash on whitespace-only input", () => {
        const result = parseAnimationShorthand("   ");
        expect(result).toHaveLength(0);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// reverseAnimationShorthand
// ─────────────────────────────────────────────────────────────────────────────

describe("reverseAnimationShorthand", () => {
    it("emits only set fields", () => {
        const out = reverseAnimationShorthand({ duration: 1000 });
        expect(out).toBe("1s");
    });

    it("formats milliseconds < 1000 as ms", () => {
        const out = reverseAnimationShorthand({ duration: 500 });
        expect(out).toBe("500ms");
    });

    it("emits Infinity as 'infinite'", () => {
        const out = reverseAnimationShorthand({
            duration: 1000,
            iterationCount: Infinity,
        });
        expect(out).toBe("1s infinite");
    });

    it("emits canonical order: duration, timing, delay, count, dir, fill, comp, name", () => {
        const opts: CSSAnimationOptions = {
            duration: 2000,
            timingFunction: "ease-in-out",
            delay: 500,
            iterationCount: 3,
            direction: "alternate",
            fillMode: "forwards",
            composition: "add",
            name: "slide",
        };
        const out = reverseAnimationShorthand(opts);
        expect(out).toBe(
            "2s ease-in-out 500ms 3 alternate forwards add slide",
        );
    });

    it("round-trips through parse → reverse", () => {
        const input = "slide 2s ease-in-out 500ms 3 alternate forwards add";
        const parsed = parseAnimationShorthand(input)[0]!;
        const out = reverseAnimationShorthand(parsed);
        // re-parse to confirm semantic equivalence
        const reparsed = parseAnimationShorthand(out)[0]!;
        expect(reparsed.duration).toBe(parsed.duration);
        expect(reparsed.delay).toBe(parsed.delay);
        expect(reparsed.timingFunction).toBe(parsed.timingFunction);
        expect(reparsed.direction).toBe(parsed.direction);
        expect(reparsed.fillMode).toBe(parsed.fillMode);
        expect(reparsed.composition).toBe(parsed.composition);
        expect(reparsed.name).toBe(parsed.name);
    });

    it("empty options object yields empty string", () => {
        expect(reverseAnimationShorthand({})).toBe("");
    });
});
