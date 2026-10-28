// SERVED MODEL: claude-opus-5-5
/**
 * SS-8 Z2-picker-cohort · Z-ColorInput-1 (ColorInput record L-1 / D-6, BANK-1).
 *
 * The π parser band made `parseCssColor` total: every degenerate body
 * (`oklch()`, `rgb()`, `hsl(  )` …) returns `ok:false` with `css_syntax`
 * diagnostics instead of throwing (`evidence/Z2-picker-cohort/lib-parse-
 * totality.json`). BANK-1 has therefore fired: the field's parse boundary
 * reads the parse Result, and the bare `catch {}` that turned ANY throw into
 * the user-blaming "not a valid color" badge is gone. An internal fault after
 * a successful parse is now loud (it propagates), never a typo's face.
 *
 * RED before the cure: the injected internal fault is swallowed and the badge
 * raises. GREEN after: the fault propagates and the badge stays down.
 */
import { describe, expect, it, vi } from "vitest";
import { ref, shallowRef } from "vue";

vi.mock("../../color-session/picker-color", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../color-session/picker-color")>();
    return { ...actual, convertPickerColor: vi.fn(actual.convertPickerColor) };
});

import * as pickerColor from "../../color-session/picker-color";
import { useColorParsing } from "../../color-session/useColorParsing";
import type { ColorModel } from "../../color-session/color-model";

function harness() {
    const color = pickerColor.convertPickerColor(pickerColor.parsePickerColor("oklch(73% 0.185 2deg)"), "oklch");
    const model = shallowRef({ color, selectedColorSpace: "oklch", inputColor: "" } as unknown as ColorModel);
    const updateModel = (patch: Partial<ColorModel>) => {
        model.value = { ...model.value, ...patch };
    };
    const api = useColorParsing({
        model,
        updateModel,
        stableHue: ref(2),
        currentColorSpace: { value: "oklch" } as never,
    });
    api.parseAndSetColor("oklch(73% 0.185 2deg)"); // spend the boot parse
    return { api, model };
}

describe("Z-ColorInput-1 — the field's parse boundary reads the Result (BANK-1 fired)", () => {
    it("a degenerate body raises the badge and throws nothing", () => {
        const { api } = harness();
        for (const body of ["oklch()", "rgb()", "hsl(  )", "notacolor"]) {
            api.clearParseError();
            expect(() => api.parseAndSetColor(body)).not.toThrow();
            expect(api.parseError.value, body).toBe(true);
        }
    });

    it("an internal fault after a successful parse is loud, never the user's badge", () => {
        const { api } = harness();
        const convert = vi.mocked(pickerColor.convertPickerColor);
        convert.mockImplementationOnce(() => {
            throw new Error("internal fault");
        });
        expect(() => api.parseAndSetColor("rgb(10 200 30)")).toThrow("internal fault");
        expect(api.parseError.value).toBe(false);
    });

    it("a valid entry commits and clears the badge", () => {
        const { api, model } = harness();
        api.parseAndSetColor("notacolor");
        expect(api.parseError.value).toBe(true);
        api.parseAndSetColor("rgb(10 200 30)");
        expect(api.parseError.value).toBe(false);
        expect(model.value.inputColor).toBe("rgb(10 200 30)");
    });
});
