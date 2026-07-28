import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Bar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const base = { userSlug: null as string | null, cssColorOpaque: "oklch(0.8 0.15 60)", hasSavedPalettes: false };

describe("CHALLENGE-D · where did @submit land?", () => {
    it("proves the submit listener is bound to the <input>, not the <form>", async () => {
        const w = mount(Bar, { props: base, attachTo: document.body });
        (w.vm as any).slugEditMode = true;
        await nextTick(); await nextTick();
        const form = w.find("form").element as HTMLFormElement;
        const input = w.find("input").element as HTMLInputElement;
        console.log("[dom] form tag =", form.tagName, " input type =", input.type);
        console.log("[dom] form attrs =", [...form.attributes].map(a => a.name).join(","));
        console.log("[dom] input attrs =", [...input.attributes].map(a => a.name).join(","));
        await w.find("input").setValue("brave-amber-quiet-fox");
        await nextTick();

        // 1. dispatch submit on the FORM (what a browser does on Enter / type=submit click)
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        await nextTick();
        console.log("[A] submit on <form> -> switchSlug emitted =", JSON.stringify(w.emitted("switchSlug") ?? null));

        // 2. dispatch submit on the INPUT (impossible in a real browser, but reveals binding)
        input.dispatchEvent(new Event("submit", { bubbles: false, cancelable: true }));
        await nextTick();
        console.log("[B] submit on <input> -> switchSlug emitted =", JSON.stringify(w.emitted("switchSlug") ?? null));

        // 3. clicking the type=submit Button inside the slot
        const btn = w.findAll("button").find(b => b.attributes("type") === "submit");
        console.log("[C] type=submit button found =", !!btn);
        if (btn) { await btn.trigger("click"); await nextTick(); }
        console.log("[C] after clicking submit button -> switchSlug emitted =", JSON.stringify(w.emitted("switchSlug") ?? null));
        console.log("[C] form still in DOM (edit mode not exited) =", w.find("form").exists());
        expect(true).toBe(true);
        w.unmount();
    });
});
