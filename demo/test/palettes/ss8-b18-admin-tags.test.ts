// SS-8 · B18-admin-panels — the two live AdminTagsPanel rows, over the REAL
// composition root (`providePalettePorts`) under the REAL `AdminPane`; `fetch`
// is stubbed at the platform boundary, nothing else is mocked.
//   SS8-0532 (C-18) — a `GET /admin/tags` row without a non-empty `name` never
//                     reaches the list: no empty pill, no "Delete tag undefined".
//   SS8-0533 (ATP-29) — the pane is kept alive and never evicted, so re-entry
//                     must refresh the list (the mount-only read went stale).
// Packet: docs/tranches/X/execution/SS8/packets/B18-admin-panels.md
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KeepAlive, computed, defineComponent, h, provide, ref } from "vue";

import AdminPane from "../../palettes/admin/AdminPane.vue";
import { providePalettePorts } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";
import type { ViewId } from "../../shell/useViewManager";

const GOOD = { id: "t1", name: "moody", category: "mood" };
let tagRows: unknown[];
let tagGets: number;
const mounted: VueWrapper[] = [];

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

beforeEach(() => {
    tagRows = [GOOD];
    tagGets = 0;
    vi.stubGlobal(
        "fetch",
        vi.fn(async (input: unknown) => {
            const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
            if (url.includes("/admin/tags")) {
                tagGets++;
                return json(tagRows);
            }
            return json({ data: [], total: 0, limit: 50, offset: 0 });
        }),
    );
    vi.stubGlobal("matchMedia", (media: string) => ({
        matches: media.includes("prefers-reduced-motion: reduce"),
        media,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }));
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
    Element.prototype.scrollIntoView = () => {};
    useAdminAuth().login("t");
});
afterEach(() => {
    useAdminAuth().logout();
    vi.unstubAllGlobals();
    delete (Element.prototype as Partial<Element>).scrollIntoView;
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

/** The tags pane inside a KeepAlive, as PaneSlot holds it; `shown` swaps it out and back. */
function mountTags() {
    const shown = ref(true);
    const Elsewhere = defineComponent({ name: "Elsewhere", render: () => h("div", "elsewhere") });
    const Host = defineComponent({
        setup() {
            provide(SAFE_ACCENT_KEY, computed(() => "#335"));
            provide(CSS_COLOR_KEY, computed(() => "#335"));
            providePalettePorts({
                currentView: computed<ViewId>(() => "admin-tags"),
                switchView: () => {},
                savedColorStrings: ref<string[]>([]),
                emitApply: () => {},
                emitAddColor: () => {},
                emitStartEdit: () => {},
                emitSetCurrentColor: () => {},
            });
            return () =>
                h(KeepAlive, null, [shown.value ? h(AdminPane, { subView: "admin-tags", key: "tags" }) : h(Elsewhere, { key: "else" })]);
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push(wrapper);
    return { shown };
}

const deleteLabels = () =>
    [...document.body.querySelectorAll<HTMLButtonElement>("button[aria-label^='Delete tag']")].map(
        (b) => b.getAttribute("aria-label"),
    );

describe("SS8-0532 · C-18 — a non-conforming tag row never renders", () => {
    it("drops rows whose name is empty or missing; the conforming row stays", async () => {
        tagRows = [GOOD, { id: "t2", name: "", category: "mood" }, { id: "t3", category: "mood" }];
        mountTags();
        await flushPromises();
        expect(deleteLabels()).toEqual(["Delete tag moody"]);
        expect(document.body.textContent).toContain("1 tag");
    });
});

describe("SS8-0533 · ATP-29 — re-entry refreshes the kept-alive list", () => {
    it("reads once on entry, and again on every return", async () => {
        const { shown } = mountTags();
        await flushPromises();
        expect(tagGets).toBe(1);
        tagRows = [GOOD, { id: "t9", name: "fresh", category: "mood" }];
        shown.value = false;
        await flushPromises();
        shown.value = true;
        await flushPromises();
        expect(tagGets).toBe(2);
        expect(deleteLabels()).toContain("Delete tag fresh");
    });
});
