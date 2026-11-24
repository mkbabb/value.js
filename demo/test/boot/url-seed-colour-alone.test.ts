/**
 * A share link that carries only its colour (`#/?color=…`) seeds the boot, as
 * the live reader already takes it (`useColorUrl`, CNL-26: either half of the
 * pair is enough). Before, the boot's seed reader required both halves, so
 * such a link was born on the stored or default colour: the pre-paint script
 * painted that colour's ground, the boot stamped its plate inks and accent,
 * and the live reader glided the page to the link's colour after mount. On
 * production, `#/?color=oklch(35% 0.12 250)` in light held the plate text at
 * the default's near-black for about 0.6 s (2 s on a phone at 4x) over the
 * dark-blue ground, then turned it white.
 *
 * The boot shows the colour in the space the stored or default colour holds,
 * the one the live reader converts it into at mount, so that reconciliation
 * re-commits the same value and nothing moves.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseUrlSeed } from "../../app/composables/boot/seeded-ground";
import { resolveHydratedBootModel } from "../../app/composables/boot/hydrate";
import { convertPickerColor, parsePickerColor } from "../../color-session/picker-color";
import { createDefaultColorModel, resolveColorSpace } from "../../color-session/color-model";
import { COLOR_STORE_KEY } from "../../color-session/useColorPersistence";

const SEED = "oklch(35% 0.12 250)";
const link = (query: string) => `#/?${query}`;

function memoryStorage(): Storage {
    const data = new Map<string, string>();
    return {
        get length() { return data.size; },
        clear: () => data.clear(),
        getItem: (k) => data.get(k) ?? null,
        key: (i) => [...data.keys()][i] ?? null,
        removeItem: (k) => void data.delete(k),
        setItem: (k, v) => void data.set(k, String(v)),
    };
}

describe("the boot seeds from a share link's colour alone", () => {
    beforeEach(() => {
        vi.stubGlobal("localStorage", memoryStorage());
    });
    afterEach(() => {
        window.location.hash = "";
        vi.unstubAllGlobals();
    });

    it("reads the colour with or without its space, and nothing without a colour", () => {
        expect(parseUrlSeed(link(`color=${encodeURIComponent(SEED)}`))).toEqual({ space: null, color: SEED });
        expect(parseUrlSeed(link(`space=lab&color=${encodeURIComponent(SEED)}`))).toEqual({ space: "lab", color: SEED });
        expect(parseUrlSeed(link("space=lab"))).toBeNull();
        expect(parseUrlSeed("#/")).toBeNull();
        expect(parseUrlSeed("")).toBeNull();
    });

    it("a colour alone is born in the default colour's space, as the live reader converts it", () => {
        window.location.hash = link(`color=${encodeURIComponent(SEED)}`);
        const { model, source } = resolveHydratedBootModel();
        const space = createDefaultColorModel().selectedColorSpace;
        expect(source).toBe("url");
        expect(model.selectedColorSpace).toBe(space);
        expect(model.inputColor).toBe(SEED);
        expect(model.color).toEqual(convertPickerColor(parsePickerColor(SEED), resolveColorSpace(space)));
    });

    it("a colour alone over a stored colour takes the stored colour's space", () => {
        localStorage.setItem(COLOR_STORE_KEY, JSON.stringify({ inputColor: "#3366cc", savedColors: [] }));
        window.location.hash = link(`color=${encodeURIComponent(SEED)}`);
        const { model, source } = resolveHydratedBootModel();
        expect(source).toBe("url");
        expect(model.selectedColorSpace).toBe("hex");
        expect(model.color).toEqual(convertPickerColor(parsePickerColor(SEED), resolveColorSpace("hex")));
    });

    it("the pair still seeds in its own space", () => {
        window.location.hash = link(`space=lab&color=${encodeURIComponent(SEED)}`);
        const { model, source } = resolveHydratedBootModel();
        expect(source).toBe("url");
        expect(model.selectedColorSpace).toBe("lab");
    });
});
