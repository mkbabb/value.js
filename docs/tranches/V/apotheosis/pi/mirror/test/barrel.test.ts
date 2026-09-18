import { describe, expect, expectTypeOf, it } from "vitest";
import * as api from "../index.js";
import type { BarrelTypes } from "../support/barrel-types.js";

const runtimeExports = [
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
    "parseStylesheet",
    "parseTimingFunction",
    "serializeCssColor",
    "serializeTimelineOptions",
] as const;

describe("W0 barrel", () => {
    it("exposes exactly the 19 runtime names", () => {
        expect(Object.keys(api).sort()).toEqual([...runtimeExports].sort());
    });

    it("keeps all 33 type names importable", () => {
        expectTypeOf<BarrelTypes>().toBeArray();
        expectTypeOf<BarrelTypes[32]>().not.toBeNever();
    });
});
