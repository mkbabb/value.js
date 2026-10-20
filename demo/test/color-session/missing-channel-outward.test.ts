/**
 * SS8-0035 (CS R-2, B02-picker-sliders-debug) — a cold deep link
 * `#/?space=rgb&color=rgb(none 50 50)` hydrates a model that holds a MISSING
 * red channel. That is the library's law and the picker keeps it (gate N4,
 * ParseEchoReadout A-7: the echo shows `r none`; the stored value stays
 * `none`). The defect was downstream: the pipeline's OUTWARD strings
 * (`cssColor`, `cssColorOpaque`) carried `none` to consumers that convert
 * across spaces — `cssToOklch` in the atmosphere boot and the About
 * markdown's `convertColor(…, "oklch")` — and both threw
 * `color_missing_channel` into two error-boundary cards.
 *
 * The cure resolves a missing component to zero (CSS Color 4 §4.2) at that
 * outward boundary only. Falsifiers: the outward strings convert; the model,
 * the echo and the persisted string still carry `none`.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, nextTick, shallowRef } from "vue";
import { cssToOklch } from "@mkbabb/glass-ui/color";
import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";

import { useColorPipeline } from "../../color-session/useColorPipeline";
import { convertPickerColor, parsePickerColor } from "../../color-session/picker-color";
import type { ColorModel } from "../../color-session/color-model";
import { COLOR_STORE_KEY } from "../../color-session/useColorPersistence";

const LINK = "rgb(none 50 50)";

// jsdom here exposes no Web Storage (opaque about:blank origin), so the store
// the persistence collaborator writes is an in-memory one.
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

function hydrated(css: string): ColorModel {
    // The boot's own construction (boot/hydrate.ts `modelFrom`).
    return {
        selectedColorSpace: "rgb",
        color: convertPickerColor(parsePickerColor(css), "rgb"),
        inputColor: css,
        savedColors: [],
    };
}

describe("SS8-0035 — a `none` channel never reaches a cross-space consumer", () => {
    beforeEach(() => {
        vi.stubGlobal("localStorage", memoryStorage());
        vi.stubGlobal("sessionStorage", memoryStorage());
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it("the outward strings convert to OKLCH (atmosphere + markdown paths); the model keeps `none`", () => {
        const scope = effectScope();
        scope.run(() => {
            const model = shallowRef(hydrated(LINK));
            const { cssColor, cssColorOpaque, astEcho } = useColorPipeline(model);

            // The law the cure must not narrow: the model and the echo keep it.
            expect(model.value.color.channels[0]).toBe("none");
            expect(astEcho.value.parts[0]).toBe("r none");

            // The atmosphere path (glass-ui cssToOklch on the opaque string).
            expect(() => cssToOklch(cssColorOpaque.value)).not.toThrow();
            expect(cssColorOpaque.value).not.toContain("none");

            // The About markdown path (useMarkdownColors: parse → oklch).
            const parsed = parseCssColor(cssColor.value);
            expect(parsed.ok).toBe(true);
            if (parsed.ok) expect(convertColor(parsed.value, "oklch").ok).toBe(true);
            expect(cssColor.value).not.toContain("none");
        });
        scope.stop();
    });

    it("the persisted string stays faithful to the model (`none` survives a reload)", async () => {
        const scope = effectScope();
        scope.run(() => {
            const model = shallowRef(hydrated("rgb(10 50 50)"));
            useColorPipeline(model);
            model.value = hydrated(LINK);
        });
        await nextTick();
        vi.advanceTimersByTime(500);
        await nextTick();
        const stored = JSON.parse(localStorage.getItem(COLOR_STORE_KEY) ?? "{}");
        expect(stored.inputColor).toContain("none");
        scope.stop();
    });
});
