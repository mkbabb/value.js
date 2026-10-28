/**
 * SS8 B09 (About · Katex) — the two KaTeX rows cured at the root.
 *
 * SS8-0267 (X-W6 R1/R10): wide display formulas overflow the card (26 of 37
 * rows at 390 px, up to 352 px off the edge) inside a hand-rolled
 * `div.inline-block` with a trailing-only mask. A display formula must sit on
 * glass's scroll primitive: a FadingScroll port that feathers both edges and
 * takes keyboard focus.
 *
 * SS8-0272 (R5): a formula KaTeX cannot parse printed its source in #cc0000
 * (2.35:1 light / 2.03:1 dark on the tinted card) with nothing but colour to
 * mark it. The error must read the plate-certified destructive ink and carry
 * a role and an accessible name.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Katex from "../../scenes/about/katex/Katex.vue";

/** jsdom has no IntersectionObserver: every observed formula is in view. */
class InViewObserver {
    constructor(private readonly callback: IntersectionObserverCallback) {}
    observe(target: Element) {
        this.callback(
            [{ isIntersecting: true, target } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
        );
    }
    disconnect() {}
    unobserve() {}
    takeRecords() {
        return [];
    }
}

class NoopResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", InViewObserver);
    if (!("ResizeObserver" in globalThis)) vi.stubGlobal("ResizeObserver", NoopResizeObserver);
});
afterEach(() => vi.unstubAllGlobals());

/** The dynamic engine import resolves over several ticks. */
async function rendered(wrapper: ReturnType<typeof mount>, selector: string) {
    for (let i = 0; i < 50 && !wrapper.find(selector).exists(); i++) {
        await flushPromises();
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return wrapper.find(selector);
}

describe("SS8-0267 · a display formula rides glass's FadingScroll port", () => {
    it("the row is a focusable horizontal FadingScroll holding the formula", async () => {
        const wrapper = mount(Katex, {
            props: { expression: "L^* = 116 \\left(\\frac{Y}{Y_n}\\right)^{1/3} - 16", displayMode: true },
            attachTo: document.body,
        });
        await rendered(wrapper, ".katex-display");
        const root = wrapper.element as HTMLElement;
        expect(root.classList.contains("fading-scroll")).toBe(true);
        expect(root.classList.contains("katex-row")).toBe(true);
        expect(root.getAttribute("data-fade-axis")).toBe("x");
        expect(root.getAttribute("tabindex")).toBe("0");
        expect(root.querySelector(".katex-display")).not.toBeNull();
        wrapper.unmount();
    });

    it("inline math stays an inline box (no scroll port)", async () => {
        const wrapper = mount(Katex, {
            props: { expression: "Y_n", displayMode: false },
            attachTo: document.body,
        });
        await rendered(wrapper, ".katex");
        const root = wrapper.element as HTMLElement;
        expect(root.classList.contains("inline-block")).toBe(true);
        expect(root.classList.contains("fading-scroll")).toBe(false);
        wrapper.unmount();
    });
});

describe("SS8-0272 · a KaTeX error reads the certified destructive ink and is named", () => {
    it("an unparseable formula paints var(--destructive) with role img and a name", async () => {
        const wrapper = mount(Katex, {
            props: { expression: "\\frac{a", displayMode: true },
            attachTo: document.body,
        });
        const error = await rendered(wrapper, ".katex-error");
        expect(error.exists()).toBe(true);
        const el = error.element as HTMLElement;
        expect(el.style.color).toBe("var(--destructive)");
        expect(el.getAttribute("role")).toBe("img");
        expect(el.getAttribute("aria-label")).toMatch(/^Formula could not be rendered: .*\\frac\{a/);
        wrapper.unmount();
    });
});
