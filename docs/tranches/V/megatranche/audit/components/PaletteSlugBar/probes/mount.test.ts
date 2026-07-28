import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Bar from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";

const base = { userSlug: "brave-amber-quiet-fox", cssColorOpaque: "oklch(0.8 0.15 60)", hasSavedPalettes: false };

describe("CHALLENGE-D · PaletteSlugBar state matrix", () => {
    it("D-a · hover-popover trigger: focusability + role + name", async () => {
        const w = mount(Bar, { props: base, attachTo: document.body });
        await nextTick();
        const span = w.find("span.slug-pill");
        console.log("[trigger] tag =", span.element.tagName);
        console.log("[trigger] tabindex =", JSON.stringify(span.attributes("tabindex") ?? null));
        console.log("[trigger] role =", JSON.stringify(span.attributes("role") ?? null));
        console.log("[trigger] aria-label =", JSON.stringify(span.attributes("aria-label") ?? null));
        console.log("[trigger] aria-expanded =", JSON.stringify(span.attributes("aria-expanded") ?? null));
        console.log("[trigger] aria-describedby =", JSON.stringify(span.attributes("aria-describedby") ?? null));
        console.log("[trigger] all attrs =", JSON.stringify(span.attributes()));
        w.unmount();
    });

    it("D-b · error surface: role / live / association", async () => {
        const w = mount(Bar, { props: base, attachTo: document.body });
        (w.vm as any).$.setupState.setError("Rate limit exceeded: too many sign-in attempts");
        await nextTick();
        const p = w.find("p.text-destructive");
        console.log("[error] exists =", p.exists(), " attrs =", JSON.stringify(p.attributes()));
        console.log("[error] tree has role=alert|status =", /role="(alert|status)"/.test(w.html()));
        console.log("[error] tree has aria-live =", w.html().includes("aria-live"));
        console.log("[error] tree has aria-invalid =", w.html().includes("aria-invalid"));
        console.log("[error] tree has aria-describedby =", w.html().includes("aria-describedby"));
        w.unmount();
    });

    it("D-c · pending state reachability: does slugSwitching ever render?", async () => {
        vi.useFakeTimers();
        const w = mount(Bar, { props: { ...base, userSlug: null }, attachTo: document.body });
        const s = (w.vm as any).$.setupState;
        s.onStartSlugEdit();
        await vi.advanceTimersByTimeAsync(80);
        await nextTick(); await nextTick();
        vi.useRealTimers();
        await nextTick();
        console.log("[pending] slugEditMode after start =", s.slugEditMode.value);
        s.slugInput.value = "some-four-part-slug-x";
        await nextTick();
        const seen: boolean[] = [];
        const stop = setInterval(() => seen.push(s.slugSwitching.value), 0);
        const p = s.onSlugSwitch();
        console.log("[pending] slugSwitching IMMEDIATELY after calling onSlugSwitch (sync) =", s.slugSwitching.value);
        await p;
        clearInterval(stop);
        console.log("[pending] slugSwitching after await =", s.slugSwitching.value);
        console.log("[pending] slugEditMode after submit =", s.slugEditMode.value);
        console.log("[pending] emitted switchSlug =", JSON.stringify(w.emitted("switchSlug")));
        console.log("[pending] emitted copy =", JSON.stringify(w.emitted("copy") ?? null));
        w.unmount();
    });

    it("D-d · declared-but-unused surface", async () => {
        const src = await import("node:fs").then(fs => fs.readFileSync("/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue", "utf8"));
        const body = src.replace(/hasSavedPalettes[^\n]*\n/g, "");
        console.log("[unused] 'hasSavedPalettes' occurrences outside its declaration =", (body.match(/hasSavedPalettes/g) || []).length);
        console.log("[unused] emit(\"copy\") call sites =", (src.match(/emit\(\s*["']copy["']/g) || []).length, " / $emit('copy') =", (src.match(/\$emit\(\s*["']copy["']/g) || []).length);
        console.log("[unused] declared emits =", (src.match(/copy: \[\];/g) || []).length ? "copy DECLARED" : "?");
        console.log("[unused] awaits inside onSlugSwitch try-block =", (src.slice(src.indexOf("async function onSlugSwitch"), src.indexOf("function setError")).match(/await /g) || []).length);
        expect(true).toBe(true);
    });
});
