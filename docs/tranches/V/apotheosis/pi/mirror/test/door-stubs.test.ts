import { describe, expect, it } from "vitest";
import { differentialDoorStates } from "../harness/differential.js";
import * as api from "../index.js";

describe("Phase-A door-state bank through the authored waves", () => {
    it("enumerates every runtime export and flips only the implemented doors GREEN", () => {
        const states = differentialDoorStates();
        const names = states.map(({ exportName }) => exportName);
        expect(states).toHaveLength(19);
        expect(new Set(names).size).toBe(19);
        expect([...names].sort()).toEqual(Object.keys(api).sort());
        expect(states.every(({ liveGreen }) => liveGreen)).toBe(true);
        const green = states.filter(({ mirrorGreen }) => mirrorGreen).map(({ exportName }) => exportName).sort();
        expect(green).toEqual([
            "coerceToSyntax",
            "collectAnimationOptions",
            "collectCustomFunctions",
            "collectDeclarations",
            "collectKeyframes",
            "collectPropertyDescriptors",
            "collectStyleRules",
            "collectTimelineOptions",
            "parseAnimationRange",
            "parseAnimationTimeline",
            "parseCssColor",
            "parseCssScalar",
            "parseCssValue",
            "parseCssValues",
            "parseKeyframeSelector",
            "parseTimingFunction",
            "serializeCssColor",
            "serializeTimelineOptions",
        ].sort());
        expect(states.filter(({ exportName }) => !green.includes(exportName)).every(({ red }) => red)).toBe(true);
    });

    it("keeps all 19 runtime entries no-throw on hostile runtime values", () => {
        for (const [name, entry] of Object.entries(api)) {
            expect(() => (entry as (...args: unknown[]) => unknown)(undefined, undefined), name).not.toThrow();
        }
    });
});
