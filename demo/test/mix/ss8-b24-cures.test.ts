/**
 * SS-8 B24-mix-config — cures (Mix pane: the add slot).
 *
 * The packet (`docs/tranches/X/execution/SS8/packets/B24-mix-config.md`)
 * REFUTED these rows' FIGURES while re-witnessing the defects themselves; the
 * records' root cures are landed here and pinned:
 *
 *   · SS8-0678 / SS8-0684 (R-MP7 · U-1 · MSS-20): the add slot's ghost stroke
 *     WAS the live picker colour, so its non-text contrast had no floor
 *     (1.08:1 light at the default seed). It is now the picker colour
 *     certified to the 3:1 graphics floor on the resting plate it sits on
 *     (the house `useSafeAccentFn` walk): the hue survives, the floor holds
 *     for any picker colour. MP-4 (the WHCM keep-colour roster in
 *     foundation.css) is witnessed live, not here (jsdom resolves no media).
 *
 * Not cured here, routed (packet "## cures"): SS8-0671 (MC-7) and SS8-0673
 * (DD-1) — both ride the max-height collapse legs DESIGN.md §5 books as
 * PKT-3-gated; the batch's max-height attempt was witnessed live and reverted.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed } from "vue";
import { mount } from "@vue/test-utils";
import { oklch, parseCssColor, convertColor, safeAccentColor } from "@mkbabb/value.js/color";
import MixSourceSelector from "../../workbenches/mix/MixSourceSelector.vue";
import { INK_AMBIENT_KEY } from "../../color-session/keys";
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
import { resolveSurfaceLightness, GRAPHICS_CONTRAST_FLOOR } from "../../color-session/ink";

beforeEach(() => {
    // jsdom ships no ResizeObserver (glass's tab strip measures its indicator).
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
});
afterEach(() => vi.unstubAllGlobals());

describe("SS8-0678 / SS8-0684 · MSS-20 — the add slot's ghost stroke has a 3:1 floor", () => {
    const AMBIENT = 0.62;

    function mountSelector(cssColorOpaque: string) {
        return mount(MixSourceSelector, {
            props: { mode: "colors", selectedColors: [], selectedPalettes: [], cssColorOpaque },
            global: {
                provide: {
                    [INK_AMBIENT_KEY as symbol]: computed(() => AMBIENT),
                    [LIBRARY_PORT_KEY as symbol]: { savedPalettes: computed(() => []) },
                },
            },
        });
    }

    function strokeOf(wrapper: ReturnType<typeof mountSelector>): string {
        const dot = wrapper.find(".add-slot-ghost .watercolor-swatch");
        expect(dot.exists()).toBe(true);
        return (dot.element as HTMLElement).style.getPropertyValue("--watercolor-color").trim();
    }

    // The worst case the live witness measured: a picker colour at the plate's
    // own lightness (ring↔ground 1.08:1). Light scheme (jsdom's default).
    const surfaceL = resolveSurfaceLightness("resting", AMBIENT, false);
    const camouflaged = `oklch(${surfaceL.toFixed(4)} 0.12 2)`;

    it("a picker colour at the plate's lightness is walked to clear 3:1 on the resting plate", () => {
        const wrapper = mountSelector(camouflaged);
        const stroke = strokeOf(wrapper);
        expect(stroke).not.toBe(camouflaged);
        const parsed = parseCssColor(stroke);
        expect(parsed.ok).toBe(true);
        const ground = oklch(surfaceL, 0, 0, 1);
        if (!parsed.ok || !ground.ok) throw new Error("unparsable");
        const ink = convertColor(parsed.value, "oklch");
        if (!ink.ok) throw new Error("unconvertible");
        // The library guard returns the ink UNCHANGED exactly when it already
        // clears the floor (ink.ts `clearsAt`, the house idiom).
        const check = safeAccentColor(ink.value, ground.value, { minimumRatio: GRAPHICS_CONTRAST_FLOOR, gamut: "srgb" });
        expect(check.ok).toBe(true);
        if (check.ok) expect(Math.abs(Number(check.value.channels[0]) - Number(ink.value.channels[0]))).toBeLessThan(1e-6);
        wrapper.unmount();
    });

    it("the walk keeps the picker's hue (identity colour, not a neutral stand-in)", () => {
        const wrapper = mountSelector(camouflaged);
        const parsed = parseCssColor(strokeOf(wrapper));
        if (!parsed.ok) throw new Error("unparsable");
        const ink = convertColor(parsed.value, "oklch");
        if (!ink.ok) throw new Error("unconvertible");
        const [, c, h] = ink.value.channels.map(Number);
        expect(c).toBeGreaterThan(0.02);
        const dh = Math.abs(((h! - 2 + 540) % 360) - 180);
        expect(dh).toBeLessThan(15);
        wrapper.unmount();
    });
});
