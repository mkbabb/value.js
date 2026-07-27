import { describe, expect, it, vi } from "vitest";
import { shallowRef, ref, computed } from "vue";
import { parseCssColor } from "@mkbabb/value.js/css";
import { useColorParsing } from "../../../../../../../demo/color-session/useColorParsing";
import { parsePickerColor } from "../../../../../../../demo/color-session/picker-color";
import {
    createDefaultColorModel,
    type ColorModel,
} from "../../../../../../../demo/color-session/color-model";

const CRASHERS = [
    "oklch()",
    "rgb()",
    "hsl()",
    "lab()",
    "lch()",
    "color()",
    "oklab()",
    "hsl(  )",
];

describe("CHALLENGE-L · MT-F001 through the ColorInput path", () => {
    it("the published /css surface THROWS instead of returning a failure Result", () => {
        for (const source of CRASHERS) {
            expect(() => parseCssColor(source)).toThrowError(TypeError);
        }
        // The contract it is supposed to honour, for contrast:
        expect(parseCssColor("oklch(").ok).toBe(false);
        expect(parseCssColor("notacolor").ok).toBe(false);
    });

    it("the demo façade re-throws the library TypeError as-is (not PickerColorError)", () => {
        for (const source of CRASHERS) {
            let caught: unknown;
            try {
                parsePickerColor(source);
            } catch (e) {
                caught = e;
            }
            expect(caught).toBeInstanceOf(TypeError);
            expect((caught as Error).constructor.name).toBe("TypeError");
        }
    });

    it("useColorParsing's bare catch makes a library CRASH indistinguishable from a user typo", () => {
        const model = shallowRef<ColorModel>(createDefaultColorModel());
        const parsing = useColorParsing({
            model,
            updateModel: (patch) => {
                model.value = { ...model.value, ...patch };
            },
            stableHue: ref(0),
            currentColorSpace: computed(() => model.value.color.space),
        });

        const before = model.value.color;

        // burn the `initialParse` gate with a legitimate typo
        parsing.parseAndSetColor("notacolor");

        for (const source of CRASHERS) {
            parsing.parseAndSetColor(source);
        }

        // No throw escaped, the model never moved, and the ONLY signal the user
        // gets is the same 2s boolean the typo produced.
        expect(model.value.color).toBe(before);
        expect(parsing.parseError.value).toBe(true);
    });

    it("the FIRST parse of the session is swallowed with zero user-visible signal", () => {
        const model = shallowRef<ColorModel>(createDefaultColorModel());
        const parsing = useColorParsing({
            model,
            updateModel: (patch) => {
                model.value = { ...model.value, ...patch };
            },
            stableHue: ref(0),
            currentColorSpace: computed(() => model.value.color.space),
        });

        const before = model.value.color;
        parsing.parseAndSetColor("oklch()");

        // `initialParse` gate at demo/color-session/useColorParsing.ts:80-85:
        // the first failure of a composable's life never flashes. Total silence.
        //
        // NOTE for later seats: in the SHIPPING app this gate is already burned
        // during boot by the `model.value.inputColor` watcher
        // (demo/picker/ColorPicker.vue:356-361), so the first *user* attempt does
        // flash the badge. The latent silencer that bites a real user is the
        // `previousInvalid` short-circuit proven in the next test.
        expect(parsing.parseError.value).toBe(false);
        expect(model.value.color).toBe(before);
    });

    it("a repeat of the SAME crasher is short-circuited by previousInvalid — the second Enter does nothing at all", () => {
        const model = shallowRef<ColorModel>(createDefaultColorModel());
        const parsing = useColorParsing({
            model,
            updateModel: (patch) => {
                model.value = { ...model.value, ...patch };
            },
            stableHue: ref(0),
            currentColorSpace: computed(() => model.value.color.space),
        });
        parsing.parseAndSetColor("oklch()"); // silent (initialParse)
        const spy = vi.spyOn(console, "warn");
        parsing.parseAndSetColor("oklch()"); // early-return on previousInvalid
        expect(parsing.parseError.value).toBe(false);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});
