import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";

const PROPS = {
    userSlug: null as string | null,
    cssColorOpaque: "#336699",
    hasSavedPalettes: false,
};

async function flushFrames(n = 8) {
    for (let i = 0; i < n; i++) {
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        await nextTick();
    }
}

// vitest runs with `css: false`, so jsdom reports transitionDuration "" for the
// `.vj-morph-leave-active` class and Vue's <Transition> resolves the leave in the
// SAME frame — which hides the shipped behaviour. This shim replays the REAL
// stylesheet value (demo/styles/animations.css:113 → `--duration-fast` = 0.2s,
// node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css) so the
// harness sees what a browser sees.
function withRealMorphDuration() {
    const real = window.getComputedStyle.bind(window);
    const spy = vi.spyOn(window, "getComputedStyle").mockImplementation(((
        el: Element,
        pe?: string | null,
    ) => {
        const s = real(el, pe ?? undefined);
        if (el instanceof Element && el.classList?.contains("vj-morph-leave-active")) {
            return new Proxy(s, {
                get(t, k) {
                    if (k === "transitionDuration") return "0.2s";
                    if (k === "transitionDelay") return "0s";
                    if (k === "transitionProperty") return "opacity";
                    if (k === "animationDuration") return "0s";
                    if (k === "animationDelay") return "0s";
                    const v = (t as any)[k];
                    return typeof v === "function" ? v.bind(t) : v;
                },
            }) as CSSStyleDeclaration;
        }
        return s;
    }) as any);
    return () => spy.mockRestore();
}

describe("D-1 · Transition mode=out-in defeats the nextTick focus", () => {
    it("the slug input never receives focus after Login is clicked", async () => {
        const restore = withRealMorphDuration();
        const focusCalls: string[] = [];
        const realFocus = HTMLElement.prototype.focus;
        HTMLElement.prototype.focus = function (this: HTMLElement, ...a: any[]) {
            focusCalls.push(this.tagName + "." + (this.className || ""));
            return realFocus.apply(this, a as []);
        };

        const w = mount(PaletteSlugBar, {
            props: PROPS,
            attachTo: document.body,
            // VTU stubs <Transition> by default; un-stub or the harness erases
            // the very `mode="out-in"` under test.
            global: { stubs: { transition: false } },
        });
        await w.find("button").trigger("click"); // the Login button

        // The 50ms setTimeout fires, flips slugEditMode, then the component's
        // own nextTick focus attempt runs. Wait just past 50ms in REAL time so
        // no frame bookkeeping is skipped, then sample.
        await new Promise((r) => setTimeout(r, 70));
        await nextTick();
        const inputAtFocusTime = document.querySelector("input");

        await new Promise((r) => setTimeout(r, 300)); // past the 200ms leave
        await flushFrames(4);
        const inputAfterLeave = document.querySelector("input");

        // eslint-disable-next-line no-console
        console.log("REPRO D-1:", {
            inputExistedWhenFocusRan: inputAtFocusTime !== null,
            inputExistsAfterLeaveResolved: inputAfterLeave !== null,
            focusCalls,
            activeElementTag: document.activeElement?.tagName,
            activeElementIsSlugInput: document.activeElement === inputAfterLeave,
        });

        expect(inputAtFocusTime).toBeNull(); // focus() had no target
        expect(focusCalls).toEqual([]); // …so focus was never called at all
        HTMLElement.prototype.focus = realFocus;
        restore();
        w.unmount();
    });
});

describe("D-2 · slugSwitching is never observable (spinner is dead UI)", () => {
    it("stays false across every render tick of a submit", async () => {
        const w = mount(PaletteSlugBar, { props: PROPS, attachTo: document.body });
        const vm = w.vm as any;
        const seen: boolean[] = [];
        // Sample the reactive flag exactly where the renderer would.
        const raw = vm.$.setupState;
        raw.slugInput = "alpha-bravo-charlie-delta";
        await nextTick();
        raw.slugEditMode = true;
        await nextTick();

        const p = raw.onSlugSwitch();
        seen.push(raw.slugSwitching); // synchronously after the call returns
        await nextTick();
        seen.push(raw.slugSwitching);
        await p;
        await nextTick();
        seen.push(raw.slugSwitching);

        // eslint-disable-next-line no-console
        console.log("REPRO D-2 slugSwitching samples:", seen);
        expect(seen).toEqual([false, false, false]);
        expect(w.emitted("switchSlug")).toBeTruthy();
        w.unmount();
    });
});

describe("D-3 · quoted-empty input logs the user in as admin with an empty token", () => {
    it('emits switchSlug("", true) for the input `""`', async () => {
        const w = mount(PaletteSlugBar, { props: PROPS, attachTo: document.body });
        const raw = (w.vm as any).$.setupState;
        raw.slugEditMode = true;
        await nextTick();
        raw.slugInput = '""';
        await raw.onSlugSwitch();
        // eslint-disable-next-line no-console
        console.log("REPRO D-3 emitted:", JSON.stringify(w.emitted("switchSlug")));
        expect(w.emitted("switchSlug")).toEqual([["", true]]);
        w.unmount();
    });

    it("a 3-word typo'd slug is emitted as an ADMIN token, not rejected", async () => {
        const w = mount(PaletteSlugBar, {
            props: { ...PROPS, userSlug: "alpha-bravo-charlie-delta" },
            attachTo: document.body,
        });
        const raw = (w.vm as any).$.setupState;
        raw.slugEditMode = true;
        await nextTick();
        raw.slugInput = "alpha-bravo-charlie"; // one token short
        await raw.onSlugSwitch();
        // eslint-disable-next-line no-console
        console.log("REPRO D-3b emitted:", JSON.stringify(w.emitted("switchSlug")));
        expect(w.emitted("switchSlug")).toEqual([["alpha-bravo-charlie", true]]);
        w.unmount();
    });
});

describe("D-4 · setError leaves a stale error pinned forever", () => {
    it("resetEditMode() does not clear slugError", async () => {
        const w = mount(PaletteSlugBar, { props: PROPS, attachTo: document.body });
        const exposed = w.vm as any;
        exposed.setError("Slug not found.");
        await nextTick();
        expect(w.text()).toContain("Slug not found.");
        exposed.resetEditMode();
        await nextTick();
        // eslint-disable-next-line no-console
        console.log("REPRO D-4 text after resetEditMode:", JSON.stringify(w.text()));
        expect(w.text()).toContain("Slug not found.");
        w.unmount();
    });
});

describe("D-5 · the declared `copy` emit is never emitted", () => {
    it("onCopySlug writes the clipboard and emits nothing", async () => {
        const w = mount(PaletteSlugBar, {
            props: { ...PROPS, userSlug: "alpha-bravo-charlie-delta" },
            attachTo: document.body,
        });
        const raw = (w.vm as any).$.setupState;
        raw.onCopySlug();
        await nextTick();
        // eslint-disable-next-line no-console
        console.log("REPRO D-5 emitted keys:", Object.keys(w.emitted()));
        expect(w.emitted("copy")).toBeUndefined();
        w.unmount();
    });
});

describe("D-6 · tap-target geometry of the three-dot menu trigger", () => {
    it("reports the rendered class list (measured in-browser separately)", () => {
        const w = mount(PaletteSlugBar, { props: PROPS, attachTo: document.body });
        const trigger = document.querySelector('[aria-label="Account menu"]');
        // eslint-disable-next-line no-console
        console.log("REPRO D-6 trigger class:", trigger?.getAttribute("class"));
        expect(trigger).not.toBeNull();
        w.unmount();
    });
});
