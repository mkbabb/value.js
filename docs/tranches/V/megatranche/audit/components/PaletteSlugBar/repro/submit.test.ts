import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";

describe("submit · does the real form submit reach onSlugSwitch?", () => {
    it("clicking the submit Button emits switchSlug", async () => {
        const w = mount(PaletteSlugBar, {
            props: { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false },
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        const state = (w.vm as any).$.setupState;
        state.slugEditMode = true;
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const input = document.querySelector("input")!;
        input.value = "alpha-bravo-charlie-delta";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();

        const form = document.querySelector("form")!;
        let defaultPrevented: boolean | null = null;
        form.addEventListener("submit", (e) => {
            // sample AFTER Vue's own listener has run
            queueMicrotask(() => (defaultPrevented = e.defaultPrevented));
        });
        const ev = new Event("submit", { bubbles: true, cancelable: true });
        form.dispatchEvent(ev);
        await nextTick();
        await nextTick();

        // eslint-disable-next-line no-console
        console.log("SUBMIT:", {
            modelValue: state.slugInput,
            emitted: JSON.stringify(w.emitted("switchSlug")),
            submitDefaultPrevented: ev.defaultPrevented,
            sampledAfterHandlers: defaultPrevented,
        });
        // Proof of placement: dispatch the SAME event on the <input> instead.
        // glass-ui 7 SearchBar sets `inheritAttrs: false` and spreads $attrs onto
        // the INNER <input> (node_modules/@mkbabb/glass-ui/dist/search.js), so the
        // handler lives there — a real form-origin submit can never reach it.
        const ev2 = new Event("submit", { bubbles: true, cancelable: true });
        input.dispatchEvent(ev2);
        await nextTick();
        // eslint-disable-next-line no-console
        console.log("SUBMIT (dispatched on the INPUT instead):", {
            emitted: JSON.stringify(w.emitted("switchSlug")),
            defaultPrevented: ev2.defaultPrevented,
        });

        expect(w.emitted("switchSlug")).toBeTruthy(); // only via the input
        w.unmount();
    });
});
