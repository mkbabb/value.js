// SERVED MODEL: claude-opus-5-5
/**
 * V-D3 · BC-PCS-10 (X realization, value-DESIGN §V-D3 cure 10) — the ONE
 * compact palette render and its one truncation policy.
 *
 *   - a palette that fits shows every colour; one that does not shows
 *     capacity − 1 swatches and a `+k` seat, so drawn + k = the count;
 *   - the capacity is the container's (`cqi / swatch`): size + every step;
 *   - PreviewStrip (the plate's 7 segments) follows the same policy: 9 stops
 *     draw 6 segments and `+3` (RED: 7 segments, the 7th masked, no count);
 *   - CompactPalette under a measured container draws its window and `+k`
 *     (RED: the component does not exist).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import * as chips from "../shared/ui/color-chips";

const NINE = ["#e11d48", "#f97316", "#facc15", "#16a34a", "#0ea5e9", "#2563eb", "#7c3aed", "#db2777", "#78716c"];

describe("the compact truncation policy", () => {
    it("fits → every colour; overflows → capacity − 1 and +k (never +1)", () => {
        expect(chips.compactWindow(5, 5)).toEqual({ shown: 5, more: 0 });
        expect(chips.compactWindow(6, 5)).toEqual({ shown: 4, more: 2 });
        expect(chips.compactWindow(9, 5)).toEqual({ shown: 4, more: 5 });
        expect(chips.compactWindow(9, 1)).toEqual({ shown: 0, more: 9 });
        expect(chips.compactWindow(0, 5)).toEqual({ shown: 0, more: 0 });
        for (let n = 0; n < 40; n++) {
            for (const cap of [1, 2, 5, 7, 12]) {
                const w = chips.compactWindow(n, cap);
                expect(w.shown + w.more, `n=${n} cap=${cap}`).toBe(n);
                expect(w.more === 1, `n=${n} cap=${cap}: a +1 seat`).toBe(false);
                expect(w.shown + (w.more ? 1 : 0), `n=${n} cap=${cap}: seats`).toBeLessThanOrEqual(cap);
            }
        }
    });

    it("the capacity is the container's: size plus every whole step", () => {
        // AdminFlaggedPanel's column: 84 px, 20 px discs overlapping by 4 px.
        expect(chips.compactCapacity(84, 20, 16)).toBe(5);
        // The mix result at a 390 plate (≈ 310 px): 40 px dots on an 8 px gap.
        expect(chips.compactCapacity(310, 40, 48)).toBe(6);
        expect(chips.compactCapacity(39, 40, 48)).toBe(1);
        // Not laid out yet → unbounded (every colour), never a 0-seat render.
        expect(chips.compactCapacity(0, 20, 16)).toBe(Number.POSITIVE_INFINITY);
        expect(chips.compactCapacity(84, Number.NaN, 16)).toBe(Number.POSITIVE_INFINITY);
    });
});

describe("PreviewStrip follows the policy", () => {
    it("9 stops → 6 segments and +3; 7 stops → 7 segments, no count", () => {
        const nine = mount(chips.PreviewStrip, { props: { stops: NINE } });
        expect(nine.findAll(".preview-strip-segment")).toHaveLength(6);
        expect(nine.find("[data-compact-more]").text()).toBe("+3");
        expect(nine.find(".preview-chip").attributes("data-stops")).toBeTruthy();
        const seven = mount(chips.PreviewStrip, { props: { stops: NINE.slice(0, 7) } });
        expect(seven.findAll(".preview-strip-segment")).toHaveLength(7);
        expect(seven.find("[data-compact-more]").exists()).toBe(false);
    });
});

describe("CompactPalette draws its window in a measured container", () => {
    let fire: ((width: number) => void) | null = null;
    class Observer {
        constructor(private cb: ResizeObserverCallback) {
            fire = (width) => this.cb([{ contentRect: { width } } as ResizeObserverEntry], this as unknown as ResizeObserver);
        }
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    afterEach(() => {
        vi.unstubAllGlobals();
        fire = null;
    });

    it("84 px · 20/16 px seats: 9 colours → 4 discs and +5; 5 colours → 5 discs", async () => {
        vi.stubGlobal("ResizeObserver", Observer);
        const style = vi.spyOn(window, "getComputedStyle").mockImplementation(
            () => ({ getPropertyValue: (p: string) => (p === "--compact-size" ? "20px" : p === "--compact-step" ? "16px" : "") }) as unknown as CSSStyleDeclaration,
        );
        const w = mount(chips.CompactPalette, { props: { colors: NINE } });
        await nextTick();
        expect(w.findAll("[data-compact-swatch]"), "before layout: every colour").toHaveLength(9);
        fire!(84);
        await nextTick();
        expect(w.findAll("[data-compact-swatch]")).toHaveLength(4);
        expect(w.find("[data-compact-more]").text()).toBe("+5");
        expect(w.attributes("data-count")).toBe("9");
        await w.setProps({ colors: NINE.slice(0, 5) });
        expect(w.findAll("[data-compact-swatch]")).toHaveLength(5);
        expect(w.find("[data-compact-more]").exists()).toBe(false);
        style.mockRestore();
    });
});
