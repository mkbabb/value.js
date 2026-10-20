/**
 * SS-8 Z3-workbench-about-cohort — the falsifiers that hold the REFUTED
 * GenerateControls rows (packet
 * `docs/tranches/X/execution/SS8/packets/Z3-workbench-about-cohort.md`).
 *
 * Every row was REFUTED live at served HEAD: X-DS passes 1–9 already carry the
 * cure. These lock the cured state so the defect cannot return unseen.
 *
 *   · Z-GenerateControls-1 / -14 (per-swatch arm): every swatch is a button
 *     whose click writes the colour to the clipboard and whose name flips to
 *     "Copied …" (the record's SWATCH-INERT).
 *   · -2 SAVE-NAME-DROP: the typed plate name rides the save emit.
 *   · -3 A11Y-PALETTE-ABSENT: each swatch names its colour.
 *   · -5 BUTTON-VARIANT-INERT: no button carries the inert `variant` attribute.
 *   · -6 TRIPLE-DEPICTION: no full-bleed strip and no preview strip on the plate.
 *   · -12 NO-COUNT-LABEL / -18 COUNT-BADGE-DUP: a visible "Colors" label, the
 *     count printed once, and no badge.
 *   · -17 (dead-selector arm): `[data-color-surface]` HAS a producer
 *     (SwatchButton stamps it on every swatch) and foundation.css still rules
 *     it — the record's "delete it" cure stays retracted.
 *
 * Layout/geometry arms (-7 slider axis, -9 verb, -10 wrap, -11 shadow, -15
 * active scale) are witnessed live only (E/gc.json, E/gc2.json); jsdom paints
 * nothing they assert.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ref } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

const PALETTE = ["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)"];

vi.mock("../../workbenches/generate/composables/useColorGeneration", () => ({
    useColorGeneration: () => ({
        preset: ref("vibrant"),
        harmony: ref("golden"),
        count: ref(3),
        seed: ref(1),
        palette: ref(["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)"]),
        regenerate: () => {},
    }),
}));

const writes: string[] = [];

async function mountControls() {
    const { default: GenerateControls } = await import(
        "../../workbenches/generate/GenerateControls.vue"
    );
    return mount(GenerateControls, { attachTo: document.body });
}

describe("Z3 · GenerateControls REFUTED rows stay cured", () => {
    beforeEach(() => {
        writes.length = 0;
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
        Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: { writeText: async (s: string) => void writes.push(s) },
        });
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        document.body.innerHTML = "";
    });

    it("-1/-3/-14: each swatch is a named copy button; a click writes it and names it Copied", async () => {
        const w = await mountControls();
        const swatches = w.findAll("[data-generate-plate] [data-color-surface]");
        expect(swatches.length).toBe(PALETTE.length);
        for (const s of swatches) {
            expect(s.element.tagName).toBe("BUTTON");
            expect(s.attributes("aria-label")).toMatch(/^Copy \S/);
        }
        await swatches[1]!.trigger("click");
        await flushPromises();
        expect(writes.length).toBe(1);
        expect(writes[0]).not.toBe("");
        expect(swatches[1]!.attributes("aria-label")).toMatch(/^Copied \S/);
        expect(swatches[0]!.attributes("aria-label")).toMatch(/^Copy \S/);
        w.unmount();
    }, 30_000);

    it("-2: the typed plate name reaches the save emit", async () => {
        const w = await mountControls();
        const input = w.get("[data-generate-plate] input");
        await input.setValue("Z3 witness name");
        await w.get('[aria-label="Save palette"]').trigger("click");
        const saved = w.emitted("save");
        expect(saved).toBeTruthy();
        expect(saved![0]).toEqual([PALETTE, "Z3 witness name"]);
        w.unmount();
    }, 30_000);

    it("-5/-6: no inert variant attribute; no strip depicts the palette a second time", async () => {
        const w = await mountControls();
        for (const b of w.findAll("button")) expect(b.attributes("variant")).toBeUndefined();
        expect(w.find("[data-generate-plate] .preview-strip, [data-generate-plate] [data-preview-strip]").exists()).toBe(false);
        // The plate's direct children: title row, swatch row, bench-note row.
        expect(w.get("[data-generate-plate]").element.children.length).toBe(3);
        w.unmount();
    }, 30_000);

    it("-12/-18: a visible Colors label, the count printed once, no badge", async () => {
        const w = await mountControls();
        const row = w.get('[data-o18="generate-count"]');
        expect(row.text()).toMatch(/^Colors\s*3$/);
        expect(w.find('[data-slot="badge"]').exists()).toBe(false);
        w.unmount();
    }, 30_000);

    it("-17: [data-color-surface] has a live producer and foundation.css still rules it", async () => {
        const w = await mountControls();
        expect(w.findAll("[data-color-surface]").length).toBeGreaterThan(0);
        const css = readFileSync(resolve(import.meta.dirname, "../../styles/foundation.css"), "utf8");
        expect(css).toMatch(/\[data-color-surface\]\s*\{/);
        w.unmount();
    }, 30_000);
});
