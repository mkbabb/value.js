/**
 * The named snap (owner 2026-10-19): a colour within ΔE_OK ≤ 0.02 (CSS Color 4
 * §13's JND) of a named colour — a CSS keyword or an approved custom name —
 * resolves to that name, nearest first; outside the margin it has none.
 *
 * Driven through the composable the picker reads (`useColorNameResolution`),
 * with the approved-name read stubbed at its transport seam, so each case is
 * the main pane's own answer: `currentColorName` (shown IFF a name exists) and
 * `formattedCurrentColor` (the name, else the raw serialization).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, effectScope, nextTick, shallowRef } from "vue";

vi.mock("../../color-session/color-names", () => ({
    getApprovedColorNames: vi.fn(async () => ({
        data: [
            { id: "1", name: "daraksha", css: "oklch(73% 0.185 2)", status: "approved", createdAt: "" },
            { id: "2", name: "daraksha-sage", css: "oklch(72% 0.055 145)", status: "approved", createdAt: "" },
        ],
    })),
    proposeColorName: vi.fn(),
}));

import { useColorNameResolution } from "../../color-session/useColorNameResolution";
import { useCustomColorNames } from "../../color-session/useCustomColorNames";
import { parsePickerColor, convertPickerColor, serializePickerColor } from "../../color-session/picker-color";
import type { ColorModel } from "../../color-session/color-model";
import { NAME_SNAP_DELTA_E_OK } from "../../color-session/named-color-snap";

/** The resolver's answer for one CSS colour string, after the debounce. */
async function resolve(css: string) {
    const color = convertPickerColor(parsePickerColor(css), "oklch");
    const model = shallowRef<ColorModel>({
        selectedColorSpace: "oklch",
        color,
        inputColor: css,
        savedColors: [],
    });
    const scope = effectScope();
    const resolved = scope.run(() =>
        useColorNameResolution({
            model,
            currentPhysicalColor: computed(() => model.value.color),
            currentColorSpace: computed(() => "oklch" as const),
        }),
    )!;
    vi.advanceTimersByTime(150);
    await nextTick();
    const answer = {
        name: resolved.currentColorName.value,
        formatted: resolved.formattedCurrentColor.value,
        canPropose: resolved.canProposeName.value,
        raw: serializePickerColor(color),
    };
    scope.stop();
    return answer;
}

/** `oklab(L a b)` offset from a base colour by `d` along L. */
function offsetL(css: string, d: number): string {
    const lab = convertPickerColor(parsePickerColor(css), "oklab");
    const [l, a, b] = lab.channels as readonly number[];
    return `oklab(${l! + d} ${a} ${b})`;
}

beforeEach(async () => {
    vi.useFakeTimers();
    useCustomColorNames().reset();
    await useCustomColorNames().loadFromAPI();
});

afterEach(() => {
    vi.useRealTimers();
});

describe("the named snap — CSS named colours", () => {
    it("an exact named colour resolves to its keyword", async () => {
        expect((await resolve("#ff69b4")).name).toBe("hotpink");
        expect((await resolve("hotpink")).formatted).toBe("hotpink");
    });

    it("a near miss inside ΔE_OK 0.02 resolves to the keyword", async () => {
        const near = await resolve(offsetL("hotpink", 0.015));
        expect(near.name).toBe("hotpink");
        expect(near.formatted).toBe("hotpink");
        expect(near.canPropose).toBe(false);
    });

    it("outside the margin there is no name and the raw value shows", async () => {
        const far = await resolve(offsetL("hotpink", 0.03));
        expect(far.name).toBeNull();
        expect(far.formatted).toBe(far.raw);
        expect(far.canPropose).toBe(true);
    });

    it("a translucent colour is not its opaque namesake", async () => {
        expect((await resolve("rgb(255 105 180 / 50%)")).name).toBeNull();
    });
});

describe("the named snap — approved custom names", () => {
    it("the exact approved colour resolves to its name, shown as words", async () => {
        const exact = await resolve("oklch(73% 0.185 2)");
        expect(exact.name).toBe("Daraksha");
        expect(exact.formatted).toBe("daraksha");
        expect((await resolve("oklch(72% 0.055 145)")).name).toBe("Daraksha Sage");
    });

    it("a near miss inside the margin resolves to the approved name", async () => {
        expect((await resolve("oklch(72% 0.185 2)")).name).toBe("Daraksha");
    });

    it("outside the margin the approved name is not shown", async () => {
        const far = await resolve("oklch(70% 0.185 2)");
        expect(far.name).toBeNull();
        expect(far.formatted).toBe(far.raw);
    });

    it("the margin is the CSS Color 4 JND", () => {
        expect(NAME_SNAP_DELTA_E_OK).toBe(0.02);
    });
});
