import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";

const PROPS = { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false };

describe("probe A · does the out-in leave engage at all?", () => {
    it("observes whether vj-morph-* classes are ever applied", async () => {
        const seenClasses = new Set<string>();
        const mo = new MutationObserver((recs) => {
            for (const r of recs) {
                const t = r.target as Element;
                for (const c of Array.from(t.classList ?? [])) {
                    if (c.startsWith("vj-")) seenClasses.add(c);
                }
            }
        });
        mo.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ["class"],
        });

        const w = mount(PaletteSlugBar, {
            props: PROPS,
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        await w.find("button").trigger("click");
        for (let i = 0; i < 10; i++) {
            await new Promise((r) => setTimeout(r, 12));
            await nextTick();
        }
        // eslint-disable-next-line no-console
        console.log("PROBE-A vj classes observed:", [...seenClasses]);
        mo.disconnect();
        expect(true).toBe(true);
        w.unmount();
    });
});

describe("probe B · glass-ui 7 Button API drift", () => {
    it("dumps the rendered edit-mode buttons", async () => {
        const w = mount(PaletteSlugBar, {
            props: PROPS,
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        (w.vm as any).$.setupState.slugEditMode = true;
        for (let i = 0; i < 6; i++) {
            await new Promise((r) => requestAnimationFrame(() => r(0)));
            await nextTick();
        }
        const btns = [...document.querySelectorAll("form button")];
        // eslint-disable-next-line no-console
        console.log(
            "PROBE-B edit-mode buttons:\n" +
                btns
                    .map(
                        (b) =>
                            `  [${b.getAttribute("type")}] class="${b.getAttribute("class")}" variant=${JSON.stringify(b.getAttribute("variant"))} aria-label=${JSON.stringify(b.getAttribute("aria-label"))}`,
                    )
                    .join("\n"),
        );
        expect(btns.length).toBeGreaterThan(0);
        w.unmount();
    });
});

describe("probe C · error text semantics", () => {
    it("dumps the slugError node's a11y attributes", async () => {
        const w = mount(PaletteSlugBar, {
            props: PROPS,
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        (w.vm as any).setError("Slug not found.");
        await nextTick();
        const p = [...document.querySelectorAll("p")].find((n) =>
            n.textContent?.includes("Slug not found."),
        );
        // eslint-disable-next-line no-console
        console.log("PROBE-C error node:", p?.outerHTML);
        expect(p).toBeTruthy();
        w.unmount();
    });
});

describe("probe D · unmount while the 50ms edit timer is in flight", () => {
    it("reports whether the pending timer survives unmount", async () => {
        const w = mount(PaletteSlugBar, {
            props: PROPS,
            attachTo: document.body,
            global: { stubs: { transition: false } },
        });
        const state = (w.vm as any).$.setupState;
        const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
        const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
        await w.find("button").trigger("click");
        await w.find("button").trigger("click");
        await w.find("button").trigger("click"); // three rapid clicks
        const timersArmed = setTimeoutSpy.mock.calls.filter(
            (c) => c[1] === 50,
        ).length;
        w.unmount();
        const cleared = clearTimeoutSpy.mock.calls.length;
        await new Promise((r) => setTimeout(r, 80));
        // eslint-disable-next-line no-console
        console.log("PROBE-D:", {
            timersArmedAt50ms: timersArmed,
            clearTimeoutCallsOnUnmount: cleared,
            slugEditModeAfterUnmount: state.slugEditMode,
        });
        expect(timersArmed).toBe(3);
        setTimeoutSpy.mockRestore();
        clearTimeoutSpy.mockRestore();
    });
});
