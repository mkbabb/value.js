import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import TagEditPopover from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/search/TagEditPopover.vue";
import { BROWSE_PORT_KEY } from "/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts";

const TAGS = [
    { name: "warm", category: "mood" },
    { name: "cool", category: "mood" },
    { name: "pastel", category: "style" },
];

function makePort(overrides: Record<string, unknown> = {}) {
    return {
        remotePalettes: ref([
            {
                slug: "sunset-01",
                name: "Sunset",
                tags: ["warm"],
                currentHash: "h1",
                updatedAt: "2026-07-01T00:00:00.000Z",
            },
        ]),
        tagEdit: {
            allTags: ref(TAGS),
            loading: ref(false),
            loaded: ref(true),
            loadAllTags: vi.fn(async () => {}),
            saveTags: vi.fn(async () => undefined),
        },
        ...overrides,
    };
}

function mountPopover(port: ReturnType<typeof makePort>, props: Record<string, unknown> = {}) {
    return mount(TagEditPopover as any, {
        props: {
            open: true,
            paletteSlug: "sunset-01",
            currentTags: ["warm"],
            ...props,
        },
        global: { provide: { [BROWSE_PORT_KEY as unknown as symbol]: port } },
        attachTo: document.body,
    });
}

describe("CHALLENGE-C · TagEditPopover implementation contract", () => {
    it("C-1 · the Checkbox is bound with :checked / @update:checked", async () => {
        const port = makePort();
        const w = mountPopover(port);
        await nextTick();
        await nextTick();
        const html = document.body.innerHTML;
        console.log("[C-1] body length =", html.length);
        const boxes = Array.from(
            document.querySelectorAll('[role="checkbox"], button[data-slot="checkbox"]'),
        );
        console.log("[C-1] checkbox count =", boxes.length);
        boxes.forEach((b, i) => {
            console.log(
                `[C-1] box[${i}] tag=${b.tagName} attrs=`,
                JSON.stringify(
                    Object.fromEntries(Array.from(b.attributes).map((a) => [a.name, a.value])),
                ),
            );
        });
        console.log("[C-1] rendered text =", document.body.textContent?.trim().slice(0, 200));
        w.unmount();
        document.body.innerHTML = "";
        expect(true).toBe(true);
    });

    it("C-2 · glass-ui Checkbox declares `modelValue`, NOT `checked`", async () => {
        const mod: any = await import("@mkbabb/glass-ui");
        const props = mod.Checkbox?.props ?? {};
        const emits = mod.Checkbox?.emits ?? [];
        console.log("[C-2] Checkbox prop names =", JSON.stringify(Object.keys(props)));
        console.log("[C-2] Checkbox emits =", JSON.stringify(emits));
        console.log("[C-2] has `checked` prop =", "checked" in props);
        console.log("[C-2] emits `update:checked` =", (emits as string[]).includes?.("update:checked"));
        expect("checked" in props).toBe(false);
    });

    it("C-3 · clicking a checkbox must emit update:tags and call saveTags", async () => {
        const port = makePort();
        const w = mountPopover(port);
        await nextTick();
        await nextTick();
        const boxes = Array.from(
            document.querySelectorAll('[role="checkbox"], button[data-slot="checkbox"]'),
        ) as HTMLElement[];
        console.log("[C-3] boxes =", boxes.length);
        if (boxes.length > 1) {
            const target = boxes[1]!; // "cool" — not currently applied
            console.log("[C-3] pre-click data-state =", target.getAttribute("data-state"));
            target.click();
            await nextTick();
            await nextTick();
            console.log("[C-3] post-click data-state =", target.getAttribute("data-state"));
        }
        console.log("[C-3] emitted =", JSON.stringify(w.emitted()));
        console.log("[C-3] saveTags calls =", (port.tagEdit.saveTags as any).mock.calls.length);
        console.log(
            "[C-3] saveTags args =",
            JSON.stringify((port.tagEdit.saveTags as any).mock.calls),
        );
        w.unmount();
        document.body.innerHTML = "";
    });

    it("C-4 · the popover trigger slot: is any anchor element rendered?", async () => {
        const port = makePort();
        const w = mountPopover(port);
        await nextTick();
        console.log("[C-4] wrapper html =", w.html().slice(0, 400));
        console.log(
            "[C-4] elements with aria-haspopup =",
            document.querySelectorAll("[aria-haspopup]").length,
        );
        console.log(
            "[C-4] elements with aria-expanded =",
            document.querySelectorAll("[aria-expanded]").length,
        );
        console.log(
            "[C-4] popover content nodes =",
            document.querySelectorAll('[data-slot="popover-content"], [data-radix-popper-content-wrapper], [role="dialog"]')
                .length,
        );
        w.unmount();
        document.body.innerHTML = "";
    });

    it("C-5 · a11y surface: loading region live-ness + names", async () => {
        const port = makePort({
            tagEdit: {
                allTags: ref([]),
                loading: ref(true),
                loaded: ref(false),
                loadAllTags: vi.fn(async () => {}),
                saveTags: vi.fn(async () => undefined),
            },
        } as any);
        const w = mountPopover(port as any);
        await nextTick();
        await nextTick();
        const html = document.body.innerHTML;
        console.log("[C-5] has aria-live =", html.includes("aria-live"));
        console.log("[C-5] has aria-busy =", html.includes("aria-busy"));
        console.log("[C-5] has role=status =", html.includes('role="status"'));
        console.log("[C-5] loading html =", html.slice(0, 600));
        w.unmount();
        document.body.innerHTML = "";
    });
});
