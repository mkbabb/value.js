// X.W12.u3 — UIA-V-49 (admin roster Retry inside the latch's cooldown) and
// UIA-V-51 (a notice that mounts visible dismisses on its own clock). Same
// harness as admin-crud: the REAL composition root under the REAL AdminPane,
// `fetch` stubbed at the platform boundary.
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, provide, ref } from "vue";

import AdminPane from "../../palettes/admin/AdminPane.vue";
import ActionFeedback from "../../palettes/browser/card/PaletteCard/ActionFeedback.vue";
import { providePalettePorts, type PalettePorts } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";
import { markApiReachable } from "../../platform/transport/availability";
import type { ViewId } from "../../shell/useViewManager";

type AdminView = "admin-users" | "admin-flagged";

const mounted: VueWrapper[] = [];
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    fetchMock = vi.fn(async () => json({ data: [], total: 0, limit: 20, offset: 0 }));
    vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
    markApiReachable();
    useAdminAuth().logout();
    vi.unstubAllGlobals();
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": status >= 400 ? "application/problem+json" : "application/json" },
    });
}

function urlOf(input: unknown): string {
    return typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
}

function mountAdmin(subView: AdminView) {
    let ports!: PalettePorts;
    const view = ref<ViewId>(subView);
    const Host = defineComponent({
        setup() {
            provide(SAFE_ACCENT_KEY, computed(() => "#335"));
            provide(CSS_COLOR_KEY, computed(() => "#335"));
            ports = providePalettePorts({
                currentView: computed(() => view.value),
                switchView: (id) => {
                    view.value = id;
                },
                savedColorStrings: ref<string[]>([]),
                emitApply: () => {},
                emitAddColor: () => {},
                emitStartEdit: () => {},
                emitSetCurrentColor: () => {},
            });
            return () => h(AdminPane, { subView });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push(wrapper);
    return { wrapper, ports, view };
}

const ROSTER = [{ slug: "azure-fox-01", createdAt: "2026-09-01T00:00:00Z", paletteCount: 4 }];

describe("UIA-V-49 · the roster's Retry is the latch's recovery probe", () => {
    it("a Retry pressed inside the cooldown issues the request and paints the roster", async () => {
        useAdminAuth().login("t");
        fetchMock.mockImplementation(async () => {
            throw new TypeError("Failed to fetch");
        });
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        await flushPromises();
        expect(wrapper.text()).toContain("Retry");
        // UIA-V-168: a dead backend is not an empty roster — no "0 users".
        expect(wrapper.text()).not.toMatch(/\b0 users\b/);
        // the header's duplicate Refresh stands down while the plate offers Retry
        const labels = wrapper.findAll("button").map((b) => b.text().trim());
        expect(labels).not.toContain("Refresh");

        const before = fetchMock.mock.calls.length;
        fetchMock.mockImplementation(async (input: unknown) =>
            urlOf(input).includes("/admin/users?")
                ? json({ data: ROSTER, total: 1, limit: 50, offset: 0 })
                : json({ data: [], total: 0, limit: 20, offset: 0 }),
        );
        const retry = wrapper.findAll("button").find((b) => b.text().trim() === "Retry")!;
        await retry.trigger("click");
        await flushPromises();
        expect(fetchMock.mock.calls.length).toBeGreaterThan(before);
        expect(wrapper.text()).toContain("azure-fox-01");
    });
});

describe("UIA-V-51 · a notice that mounts visible starts its dismissal at mount", () => {
    it("emits update:visible=false after autoDismissMs", async () => {
        vi.useFakeTimers();
        try {
            const w = mount(ActionFeedback, {
                props: { message: "Approved", variant: "success", visible: true, autoDismissMs: 4000 },
            });
            mounted.push(w);
            vi.advanceTimersByTime(3999);
            expect(w.emitted("update:visible")).toBeUndefined();
            vi.advanceTimersByTime(1);
            expect(w.emitted("update:visible")).toEqual([[false]]);
        } finally {
            vi.useRealTimers();
        }
    });
});

describe("UIA-V-176 · a dismiss refills the page, so page 2 skips no report", () => {
    it("after dismissing on page 1, the report that shifted up server-side is shown", async () => {
        useAdminAuth().login("t");
        // The server's queue: 25 reports; a dismiss drops its row, so every
        // later report shifts up one offset.
        let queue = Array.from({ length: 25 }, (_, i) => ({
            paletteSlug: `p-${String(i + 1).padStart(2, "0")}`,
            palette: null,
            flagCount: 1,
            flags: [],
        }));
        fetchMock.mockImplementation(async (input: unknown, init?: RequestInit) => {
            const url = urlOf(input);
            if (init?.method === "DELETE" && url.includes("/admin/flags/")) {
                const slug = decodeURIComponent(url.split("/admin/flags/")[1]!);
                queue = queue.filter((q) => q.paletteSlug !== slug);
                return json({ dismissed: 1 });
            }
            if (url.includes("/admin/flagged?")) {
                const u = new URL(url, "http://x");
                const limit = Number(u.searchParams.get("limit"));
                const offset = Number(u.searchParams.get("offset"));
                return json({ data: queue.slice(offset, offset + limit), total: queue.length, limit, offset });
            }
            return json({ data: [], total: 0, limit: 20, offset: 0 });
        });
        const { ports } = mountAdmin("admin-flagged");
        await ports.admin.flagged.loadFlagged();
        await flushPromises();
        await ports.admin.flagged.dismiss("p-01");
        await flushPromises();
        const seen = new Set(ports.admin.flagged.items.value.map((i) => i.paletteSlug));
        ports.admin.flagged.nextPage();
        await flushPromises();
        for (const i of ports.admin.flagged.items.value) seen.add(i.paletteSlug);
        // every report still in the queue was shown on page 1 or page 2
        expect(queue.filter((q) => !seen.has(q.paletteSlug)).map((q) => q.paletteSlug)).toEqual([]);
    });
});
