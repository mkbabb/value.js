import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Bar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const base = { userSlug: null as string | null, cssColorOpaque: "oklch(0.8 0.15 60)", hasSavedPalettes: false };

describe("CHALLENGE-D · the submit affordance itself", () => {
    it("enumerates the rendered edit-mode controls and their types", async () => {
        const w = mount(Bar, { props: base, attachTo: document.body });
        (w.vm as any).slugEditMode = true;
        await nextTick(); await nextTick();
        w.findAll("button").forEach((b, i) => {
            console.log(`[btn${i}] type=${JSON.stringify(b.attributes("type") ?? null)} aria-label=${JSON.stringify(b.attributes("aria-label") ?? null)} disabled=${JSON.stringify(b.attributes("disabled") ?? null)}`);
        });
        console.log("[slot] buttons render inside <form>? =", w.find("form").findAll("button").length);
        await w.find("input").setValue("brave-amber-quiet-fox");
        await nextTick();
        const first = w.findAll("button")[0]!;
        console.log("[click] clicking control 0 (the intended submit)…");
        await first.trigger("click");
        await nextTick();
        console.log("[click] switchSlug emitted =", JSON.stringify(w.emitted("switchSlug") ?? null));
        console.log("[click] slugEditMode still true =", w.find("form").exists());
        expect(true).toBe(true);
        w.unmount();
    });
});
