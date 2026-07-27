import { describe, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";
const base = { userSlug: "brave-amber-quiet-fox", cssColorOpaque: "oklch(70% 0.2 30)", hasSavedPalettes: false };

describe("CHALLENGE-D · probe 2", () => {
    it("Q1 — edit-mode raw HTML (role/aria surface of the SearchBar host)", async () => {
        vi.useFakeTimers();
        const w = mount(PaletteSlugBar, { props: base, attachTo: document.body });
        (w.vm as any).$.setupState.onStartSlugEdit();
        await vi.advanceTimersByTimeAsync(400);
        vi.useRealTimers();
        await new Promise(r => setTimeout(r, 300)); await nextTick();
        console.log("[Q1]", w.html().replace(/\s+/g, " "));
        w.unmount();
    });
    it("Q2 — admin state", async () => {
        const w = mount(PaletteSlugBar, { props: { ...base, userSlug: null, isAdmin: true }, attachTo: document.body });
        console.log("[Q2]", w.html().replace(/\s+/g, " ").slice(0, 900));
        w.unmount();
    });
    it("Q3 — long slug overflow behaviour (no truncation classes?)", async () => {
        const w = mount(PaletteSlugBar, { props: { ...base, userSlug: "a".repeat(48) }, attachTo: document.body });
        const pill = w.find("span.slug-pill");
        console.log("[Q3] pill class =", pill.attributes("class"), "| text len =", pill.text().length);
        console.log("[Q3] root class =", w.find("div").attributes("class"));
        w.unmount();
    });
});
