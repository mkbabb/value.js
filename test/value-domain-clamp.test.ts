import { describe, expect, it } from "vitest";
import {
    PICKER_CHANNELS,
    clampPickerColor,
    convertPickerColor,
    parsePickerColor,
    type PickerColor,
    type PickerSpace,
} from "@lib/picker-color";

const SPACES = Object.keys(PICKER_CHANNELS) as PickerSpace[];

function seedColor(space: PickerSpace): PickerColor {
    return convertPickerColor(parsePickerColor("rgb(120 90 60)"), space);
}

function withRawChannel(
    color: PickerColor,
    index: number,
    value: number | "none",
): PickerColor {
    const channels = [...color.channels];
    channels[index] = value;
    return Object.freeze({
        space: color.space,
        channels: Object.freeze(channels),
        alpha: color.alpha,
    }) as PickerColor;
}

describe("clampPickerColor physical-coordinate contract", () => {
    it("clamps 999 to each non-hue channel's physical bound", () => {
        for (const space of SPACES) {
            for (const [index, meta] of PICKER_CHANNELS[space].entries()) {
                if (meta.hue) continue;
                const input = withRawChannel(seedColor(space), index, 999);
                const output = clampPickerColor(input);
                const expected = Math.min(meta.max, Math.max(meta.min, 999));

                expect(output.channels[index], `${space}.${meta.key}`).toBe(expected);
                expect(input.channels[index], `${space}.${meta.key} input`).toBe(999);
                expect(Object.isFrozen(output)).toBe(true);
                expect(Object.isFrozen(output.channels)).toBe(true);
            }
        }
    });

    it("clamps -999 to each non-hue channel's physical minimum", () => {
        for (const space of SPACES) {
            for (const [index, meta] of PICKER_CHANNELS[space].entries()) {
                if (meta.hue) continue;
                const input = withRawChannel(seedColor(space), index, -999);
                const output = clampPickerColor(input);

                expect(output.channels[index], `${space}.${meta.key}`).toBe(meta.min);
                expect(input.channels[index], `${space}.${meta.key} input`).toBe(-999);
            }
        }
    });

    it("wraps physical degree hues into [0, 360)", () => {
        for (const space of SPACES) {
            const index = PICKER_CHANNELS[space].findIndex((meta) => meta.hue);
            if (index < 0) continue;
            const key = PICKER_CHANNELS[space][index]!.key;

            for (const [inputValue, expected] of [
                [999, 279],
                [-90, 270],
                [360, 0],
                [180, 180],
            ] as const) {
                const input = withRawChannel(seedColor(space), index, inputValue);
                const output = clampPickerColor(input);
                expect(output.channels[index], `${space}.${key}: ${inputValue}°`).toBe(expected);
                expect(input.channels[index]).toBe(inputValue);
            }
        }
    });

    it("preserves missing channels and alpha", () => {
        const base = parsePickerColor("lab(40% 0 47)");
        const input = Object.freeze({
            space: "lab",
            channels: Object.freeze([base.channels[0], "none", base.channels[2]]),
            alpha: "none",
        }) as PickerColor;
        const output = clampPickerColor(input);

        expect(output.channels).toEqual([40, "none", 47]);
        expect(output.alpha).toBe("none");
        expect(input.channels).toEqual([40, "none", 47]);
    });

    it("leaves every in-range physical coordinate unchanged", () => {
        for (const space of SPACES) {
            const input = seedColor(space);
            const snapshot = [...input.channels];
            const output = clampPickerColor(input);

            expect(output, space).toEqual(input);
            expect(input.channels, `${space} input`).toEqual(snapshot);
            expect(Object.isFrozen(input)).toBe(true);
            expect(Object.isFrozen(input.channels)).toBe(true);
        }
    });

    it("clamps lab(40% 999 47) to physical a=125", () => {
        const input = parsePickerColor("lab(40% 999 47)");
        const output = clampPickerColor(input);

        expect(output.channels).toEqual([40, 125, 47]);
        expect(input.channels).toEqual([40, 999, 47]);
    });
});
