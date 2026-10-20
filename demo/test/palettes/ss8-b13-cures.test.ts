/**
 * SS-8 · B13-card-swatches — the cure falsifier.
 *
 *   · L-1 (SwatchHoverMenu U-3, SH-14's mechanism): the swatch wrapper was a
 *     block box hosting an inline-block trigger, so every swatch sat on a line
 *     box and reserved its baseline descender (5.97px under each 40px swatch,
 *     live). The wrapper must be a flex container, so the trigger is a flex
 *     item and no line box (no descender) is formed.
 *
 * jsdom computes no layout, so this holds the structural cause; the measured
 * witness is `docs/tranches/X/execution/SS8/probes/B13/cure.mjs`
 * (wrapper height minus swatch height, 5.97 -> 0).
 */
import { afterEach, describe, expect, it } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import SwatchHoverMenu from "../../palettes/browser/card/SwatchHoverMenu.vue";

const mounted: VueWrapper[] = [];
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

describe("SS-8 B13 · L-1: the swatch wrapper forms no line box", () => {
    it("the SwatchHoverMenu root is a flex container", () => {
        const w = mount(SwatchHoverMenu, {
            props: { color: "#e11d48", open: false },
            attachTo: document.body,
        });
        mounted.push(w);
        // The template opens on a comment, so the root is a fragment: take its one div.
        const cls = w.find("div.relative").element.classList;
        expect(cls.contains("flex") || cls.contains("inline-flex")).toBe(true);
        expect(w.find('[aria-label^="Color swatch"]').exists()).toBe(true);
    });
});
