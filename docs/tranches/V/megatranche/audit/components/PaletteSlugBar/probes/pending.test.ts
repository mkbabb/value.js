import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Bar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const base = { userSlug: null as string | null, cssColorOpaque: "oklch(0.8 0.15 60)", hasSavedPalettes: false };

describe("CHALLENGE-D · pending state reachability (DOM-driven)", () => {
    it("submits the real form and watches for the spinner across every frame", async () => {
        const w = mount(Bar, { props: base, attachTo: document.body });
        // enter edit mode through the exposed contract the hosts use
        (w.vm as any).slugEditMode = true;
        await nextTick(); await nextTick();
        const input = w.find("input");
        console.log("[dom] edit-mode input present =", input.exists());
        if (!input.exists()) { console.log("[dom] html =", w.html().slice(0, 400)); return; }
        await input.setValue("brave-amber-quiet-fox");
        await nextTick();
        const spinnerSeen: string[] = [];
        // sample the DOM after EVERY microtask/macrotask boundary around submit
        const sample = (tag: string) => spinnerSeen.push(`${tag}:${w.find(".animate-spin").exists()}`);
        sample("before-submit");
        const form = w.find("form");
        console.log("[dom] form present =", form.exists());
        const p = form.trigger("submit");
        sample("sync-after-trigger");
        await Promise.resolve(); sample("microtask-1");
        await Promise.resolve(); sample("microtask-2");
        await p; sample("after-await-trigger");
        await nextTick(); sample("after-nextTick");
        await new Promise(r => setTimeout(r, 0)); await nextTick(); sample("after-macrotask");
        console.log("[dom] spinner presence timeline =", spinnerSeen.join("  "));
        console.log("[dom] emitted switchSlug =", JSON.stringify(w.emitted("switchSlug")));
        console.log("[dom] form still present after submit =", w.find("form").exists());
        expect(true).toBe(true);
        w.unmount();
    });
});
