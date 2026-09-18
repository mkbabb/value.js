import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";

describe("escape · does @keydown.escape.stop on <SearchBar> actually close edit mode?", () => {
    it("dispatches a real Escape keydown from the input", async () => {
        const w = mount(PaletteSlugBar, {
            props: { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false },
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        (w.vm as any).$.setupState.slugEditMode = true;
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const input = document.querySelector("input")!;
        input.focus();
        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }),
        );
        for (let i = 0; i < 8; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        // eslint-disable-next-line no-console
        console.log("ESCAPE:", {
            slugEditMode: (w.vm as any).$.setupState.slugEditMode,
            inputStillMounted: !!document.querySelector("input"),
        });
        expect((w.vm as any).$.setupState.slugEditMode).toBe(false);
        w.unmount();
    });
});
