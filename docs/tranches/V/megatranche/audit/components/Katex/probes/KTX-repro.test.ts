import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Katex from "/Users/mkbabb/Programming/value.js/demo/scenes/about/katex/Katex.vue";

describe("KTX repro", () => {
    it("R1 — displayMode prop change does NOT re-render (watch only sees `expression`)", async () => {
        const w = mount(Katex, { props: { expression: "x^2", displayMode: true } });
        await nextTick();
        const beforeDisplay = w.element.innerHTML.includes("katex-display");
        await w.setProps({ displayMode: false });
        await nextTick();
        await nextTick();
        const afterDisplay = w.element.innerHTML.includes("katex-display");
        console.log("R1 before katex-display:", beforeDisplay, "after:", afterDisplay);
        // BUG: still display-mode markup after flipping the prop to false
        expect(beforeDisplay).toBe(true);
        expect(afterDisplay).toBe(true); // <-- should have been false
    });

    it("R2 — root element is always a <div>, even for inline math", async () => {
        const w = mount(Katex, { props: { expression: "x^2", displayMode: false } });
        await nextTick();
        console.log("R2 tagName:", w.element.tagName, "class:", w.element.getAttribute("class"));
        expect(w.element.tagName).toBe("DIV");
    });

    it("R3 — malformed LaTeX renders silently (masking fallback), no throw, no console signal", async () => {
        const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const w = mount(Katex, { props: { expression: "\\frac{1}", displayMode: true } });
        await nextTick();
        console.log("R3 html:", w.element.innerHTML.slice(0, 200));
        console.log("R3 console.error calls:", errSpy.mock.calls.length, "warn:", warnSpy.mock.calls.length);
        expect(w.element.innerHTML).toContain("katex-error");
        expect(errSpy).not.toHaveBeenCalled();
        errSpy.mockRestore();
        warnSpy.mockRestore();
    });

    it("R4 — non-string expression throws out of onMounted AND leaves the node wiped", async () => {
        const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const w = mount(Katex, { props: { expression: undefined as unknown as string } });
        await nextTick();
        console.log("R4 innerHTML:", JSON.stringify(w.element.innerHTML));
        console.log(
            "R4 console.error msgs:",
            errSpy.mock.calls.map((c) => String(c[0]).slice(0, 120)),
        );
        expect(w.element.innerHTML).toBe("");
        errSpy.mockRestore();
    });

    it("R5 — a throwing expression AFTER a good one blanks the already-rendered node", async () => {
        const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const w = mount(Katex, { props: { expression: "x^2", displayMode: true } });
        await nextTick();
        expect(w.element.innerHTML).toContain("katex");
        // deep nesting -> RangeError, which throwOnError:false does NOT catch
        await w.setProps({ expression: "{".repeat(20000) + "}".repeat(20000) });
        await nextTick();
        await nextTick();
        console.log("R5 innerHTML after RangeError:", JSON.stringify(w.element.innerHTML.slice(0, 80)));
        console.log(
            "R5 console.error msgs:",
            errSpy.mock.calls.map((c) => String(c[0]).slice(0, 120)),
        );
        expect(w.element.innerHTML).toBe("");
        errSpy.mockRestore();
    });

    it("R6 — htmlAndMathml node count vs html-only", async () => {
        const w = mount(Katex, {
            props: {
                expression:
                    "L^* = 116\\, f\\!\\left(\\frac{Y}{Y_n}\\right) - 16, \\quad a^* = 500\\left[f\\!\\left(\\frac{X}{X_n}\\right) - f\\!\\left(\\frac{Y}{Y_n}\\right)\\right]",
                displayMode: true,
            },
        });
        await nextTick();
        const all = w.element.querySelectorAll("*").length;
        const mathml = w.element.querySelectorAll(".katex-mathml *").length;
        console.log("R6 total elements:", all, "mathml subtree:", mathml, "html layer:", all - mathml);
    });
});
