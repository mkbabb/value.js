/**
 * SS-8 B21-gradient-easing — the falsifier for the REFUTED consumer row.
 *
 *   · SS8-0612 (EE U-8): the stage finds the producer's curve canvas by the
 *     accessible name it gives it (`svg[aria-label=<label>]`), which is right.
 *     The `canvasSvg()` doc comment still said the installed producer renders
 *     the canvas as `role="group"`; at glass 10.1.0 the canvas is the one
 *     `role="img"` node in the stage (packet recon `E/recon.json`). The prose
 *     is struck; the role census is carried here as a measured fact.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import EasingAuthoringStage from "../../workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue";

const STAGE = resolve(
    import.meta.dirname,
    "../../workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue",
);

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

describe("SS8-0612 · the stage's canvas lookup speaks the producer as it is", () => {
    it("the source asserts no stale producer shape (no role=\"group\" canvas claim)", () => {
        const src = readFileSync(STAGE, "utf8");
        expect(src).not.toMatch(/renders the canvas as `role="group"`/);
        expect(src).not.toMatch(/role="group"/);
    });

    it("role census: exactly one role=img node in the stage, and it is the labelled canvas", () => {
        // jsdom ships no CSS.escape; the stage queries its canvas by label with it.
        vi.stubGlobal("CSS", { ...globalThis.CSS, escape: (s: string) => s.replace(/["\\]/g, "\\$&") });
        const label = "Easing curve 1 → 2";
        const value = {
            mode: "bezier" as const,
            css: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            fn: (t: number) => t,
            points: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            steps: 4,
            term: "jump-end" as const,
        };
        const w = mount(EasingAuthoringStage, {
            props: { value, label },
            attachTo: document.body,
        });
        const imgs = w.element.querySelectorAll('[role="img"]');
        expect(imgs.length).toBe(1);
        const canvas = w.element.querySelector(`svg[aria-label="${CSS.escape(label)}"]`);
        expect(canvas).not.toBeNull();
        expect(imgs[0]).toBe(canvas);
        w.unmount();
    });
});
