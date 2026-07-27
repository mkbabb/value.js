/**
 * CHALLENGE-C reproduction harness for `demo/scenes/about/markdown/Markdown.vue`.
 *
 * NOT part of the shipping suite: `vitest.config.ts` includes only
 * `test/**` + `demo/test/**`. Run explicitly:
 *
 *   npx vitest run --config docs/tranches/V/megatranche/audit/components/Markdown/repro/vitest.repro.config.ts
 */
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, onErrorCaptured } from "vue";
import { describe, expect, it, vi } from "vitest";
import Markdown from "../../../../../../../../demo/scenes/about/markdown/Markdown.vue";

const DocA = defineComponent({
    render: () => h("div", { class: "markdown-body" }, [h("p", "Alpha body — RGB text")]),
});
const DocB = defineComponent({
    render: () => h("div", { class: "markdown-body" }, [h("p", "Bravo body — HSL text")]),
});

const stubs = {
    Skeleton: { template: `<div class="stub-skeleton" />` },
    Alert: { template: `<div class="stub-alert"><slot /></div>` },
    AlertTitle: { template: `<div class="stub-alert-title"><slot /></div>` },
    AlertDescription: { template: `<div class="stub-alert-desc"><slot /></div>` },
};

describe("R-1 — a rejecting doc module strands the component in the skeleton forever", () => {
    it("never reaches the Alert branch and leaves isLoading true", async () => {
        const unhandled: unknown[] = [];
        const onUnhandled = (e: PromiseRejectionEvent) => {
            unhandled.push(e.reason);
            e.preventDefault();
        };
        window.addEventListener("unhandledrejection", onUnhandled as EventListener);

        const failing = vi.fn(() => Promise.reject(new Error("Failed to fetch dynamically imported module")));
        const wrapper = mount(Markdown, { props: { module: failing as any }, global: { stubs } });

        await flushPromises();
        await flushPromises();

        // The skeleton is still mounted…
        expect(wrapper.find(".stub-skeleton").exists()).toBe(true);
        // …and the error surface the template declares is UNREACHABLE.
        expect(wrapper.text()).not.toContain("Oh snap");
        expect(wrapper.find(".stub-alert").exists()).toBe(false);

        window.removeEventListener("unhandledrejection", onUnhandled as EventListener);
        wrapper.unmount();
    });
});

describe("R-2 — the `module` prop is read ONCE at mount; it is not reactive", () => {
    it("keeps rendering doc A after the module prop swaps to doc B", async () => {
        const modA = () => Promise.resolve({ default: DocA });
        const modB = () => Promise.resolve({ default: DocB });

        const wrapper = mount(Markdown, { props: { module: modA as any }, global: { stubs } });
        await flushPromises();
        expect(wrapper.text()).toContain("Alpha body");

        await wrapper.setProps({ module: modB as any });
        await flushPromises();
        await flushPromises();

        // STALE: the swap is silently ignored — only the parent's `:key` remount saves it.
        expect(wrapper.text()).toContain("Alpha body");
        expect(wrapper.text()).not.toContain("Bravo body");
        wrapper.unmount();
    });
});

describe("R-3 — a `none` channel in a WELL-FORMED CSS color throws out of a computed, killing the render", () => {
    const mountWithColor = (cssColor: string) => {
        const modA = () => Promise.resolve({ default: DocA });
        const caught: unknown[] = [];
        const Host = defineComponent({
            setup(_, { expose }) {
                expose({});
                onErrorCaptured((e) => { caught.push(e); return false; });
                return () => h(Markdown as any, { module: modA, cssColor });
            },
        });
        const wrapper = mount(Host, { global: { stubs } });
        return { wrapper, caught };
    };

    it("the render function throws for cssColor='oklch(none 0.2 30)' (valid CSS Color 4)", async () => {
        const { wrapper, caught } = mountWithColor("oklch(none 0.2 30)");
        await flushPromises();
        await flushPromises();
        expect(caught.length).toBeGreaterThan(0);
        expect(String(caught[0])).toContain("OKLCH lightness and chroma are required");
        // the component rendered NOTHING — no skeleton, no body, no Alert
        expect(wrapper.text()).toBe("");
    });

    it("the render function throws for an unparseable cssColor (diagnostics path)", async () => {
        const { wrapper, caught } = mountWithColor("var(--accent-live)");
        await flushPromises();
        await flushPromises();
        expect(caught.length).toBeGreaterThan(0);
        expect(String(caught[0])).toContain("invalid CSS color");
        expect(wrapper.text()).toBe("");
    });
});

describe("R-5 — `onUpdated` re-walks the whole document on EVERY reactive tick when nothing matches", () => {
    it("runs a full TreeWalker pass per update when the name is absent from the body", async () => {
        const Doc = defineComponent({
            render: () =>
                h("div", { class: "markdown-body" },
                    Array.from({ length: 200 }, (_, i) => h("p", `paragraph ${i} of body prose`))),
        });
        const mod = () => Promise.resolve({ default: Doc });

        const walkerSpy = vi.spyOn(document, "createTreeWalker");
        const wrapper = mount(Markdown, {
            props: { module: mod as any, colorSpaceName: "Kelvin" }, // absent from this body
            attachTo: document.body,
            global: { stubs },
        });
        await flushPromises();
        await flushPromises();

        const afterMount = walkerSpy.mock.calls.length;
        expect(afterMount).toBe(1);

        // 20 further reactive ticks (what a colour drag produces)
        for (let i = 0; i < 20; i++) {
            await wrapper.setProps({ colorSpaceName: `Kelvin${i}` });
        }
        await flushPromises();

        // one FULL walk per tick — no latch, no memo, no dirty check
        expect(walkerSpy.mock.calls.length).toBe(afterMount + 20);
        walkerSpy.mockRestore();
        wrapper.unmount();
    });
});

describe("R-4 — the highlight guard is a ONE-SHOT latch: a colorSpaceName change leaves stale marks", () => {
    it("does not re-mark when colorSpaceName changes without a remount", async () => {
        const Doc = defineComponent({
            render: () => h("div", { class: "markdown-body" }, [h("p", "RGB and HSL both appear here.")]),
        });
        const mod = () => Promise.resolve({ default: Doc });

        const wrapper = mount(Markdown, {
            props: { module: mod as any, colorSpaceName: "RGB" },
            attachTo: document.body,
            global: { stubs },
        });
        await flushPromises();
        await flushPromises();

        const marksAfterFirst = wrapper.element.querySelectorAll("mark.cs-name");
        expect(marksAfterFirst.length).toBe(1);
        expect(marksAfterFirst[0]!.textContent).toBe("RGB");

        await wrapper.setProps({ colorSpaceName: "HSL" });
        await flushPromises();
        await flushPromises();

        const marks = [...wrapper.element.querySelectorAll("mark.cs-name")].map((m) => m.textContent);
        // STALE: still RGB only — the `if (body.querySelector("mark.cs-name")) return`
        // guard latches after the first pass and never re-marks.
        expect(marks).toEqual(["RGB"]);
        wrapper.unmount();
    });
});
