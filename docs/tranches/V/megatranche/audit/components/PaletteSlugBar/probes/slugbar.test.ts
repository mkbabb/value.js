import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const base = { userSlug: "brave-amber-quiet-fox", cssColorOpaque: "oklch(70% 0.2 30)", hasSavedPalettes: false };

describe("CHALLENGE-D · PaletteSlugBar state probes", () => {
    it("P1 — enter edit mode: is the input focused after the documented settle?", async () => {
        vi.useFakeTimers();
        const wrapper = mount(PaletteSlugBar, { props: base, attachTo: document.body });
        // click the three-dot menu path is portaled; call the exposed path the
        // menu items call by flipping the same internal state the handler sets.
        (wrapper.vm as any).$.setupState.onStartSlugEdit();
        await vi.advanceTimersByTimeAsync(60);   // past the hardcoded 50ms
        await nextTick(); await nextTick(); await nextTick();
        vi.useRealTimers();
        await new Promise(r => setTimeout(r, 50));
        await nextTick();
        const input = wrapper.find("input").element as HTMLInputElement | undefined;
        console.log("[P1] slugEditMode =", (wrapper.vm as any).$.setupState.slugEditMode.value);
        console.log("[P1] input present =", !!input, " activeElement =", document.activeElement?.tagName, document.activeElement?.getAttribute?.("placeholder"));
        console.log("[P1] focused input? =", !!input && document.activeElement === input);
        expect(true).toBe(true);
        wrapper.unmount();
    });

    it("P2 — error state: role/aria + layout participation", async () => {
        const wrapper = mount(PaletteSlugBar, { props: base, attachTo: document.body });
        (wrapper.vm as any).$.setupState.setError("Already signed in as this slug.");
        await nextTick();
        const p = wrapper.find("p.text-destructive");
        console.log("[P2] error <p> exists =", p.exists());
        if (p.exists()) {
            console.log("[P2] role =", JSON.stringify(p.attributes("role") ?? null));
            console.log("[P2] aria-live =", JSON.stringify(p.attributes("aria-live") ?? null));
            console.log("[P2] id =", JSON.stringify(p.attributes("id") ?? null));
            console.log("[P2] classes =", p.attributes("class"));
        }
        console.log("[P2] any aria-describedby in tree =", wrapper.html().includes("aria-describedby"));
        console.log("[P2] any role=alert/status in tree =", /role="(alert|status)"/.test(wrapper.html()));
        wrapper.unmount();
    });

    it("P3 — slug pill ink is the RAW pick (no contrast certification)", async () => {
        const wrapper = mount(PaletteSlugBar, { props: base, attachTo: document.body });
        const pill = wrapper.find("span.slug-pill");
        console.log("[P3] pill style =", pill.attributes("style"));
        console.log("[P3] pill html =", pill.html().slice(0, 200));
        wrapper.unmount();
    });

    it("P4 — logged-out login control: tag/type/classes", async () => {
        const wrapper = mount(PaletteSlugBar, { props: { ...base, userSlug: null }, attachTo: document.body });
        const btns = wrapper.findAll("button");
        btns.forEach((b, i) => console.log(`[P4] btn${i} type=${JSON.stringify(b.attributes("type") ?? null)} aria-label=${JSON.stringify(b.attributes("aria-label") ?? null)} text=${JSON.stringify(b.text())} class=${b.attributes("class")?.slice(0,160)}`));
        wrapper.unmount();
    });

    it("P5 — edit-mode form: input attributes (secret handling / autocomplete)", async () => {
        vi.useFakeTimers();
        const wrapper = mount(PaletteSlugBar, { props: base, attachTo: document.body });
        (wrapper.vm as any).$.setupState.onStartSlugEdit();
        await vi.advanceTimersByTimeAsync(400);
        vi.useRealTimers();
        await new Promise(r => setTimeout(r, 400));
        await nextTick();
        const html = wrapper.html();
        const inp = wrapper.find("input");
        console.log("[P5] input exists =", inp.exists());
        if (inp.exists()) {
            console.log("[P5] type =", JSON.stringify(inp.attributes("type") ?? null));
            console.log("[P5] placeholder =", JSON.stringify(inp.attributes("placeholder") ?? null));
            console.log("[P5] autocomplete =", JSON.stringify(inp.attributes("autocomplete") ?? null));
            console.log("[P5] aria-label =", JSON.stringify(inp.attributes("aria-label") ?? null));
            console.log("[P5] spellcheck =", JSON.stringify(inp.attributes("spellcheck") ?? null));
            console.log("[P5] has <label> =", html.includes("<label"));
        }
        wrapper.unmount();
    });
});
