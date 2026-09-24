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
import { composeTitle } from "../../color-picker/router/useDocumentTitle";

type AdminView = "admin-users" | "admin-flagged" | "admin-audit" | "admin-names" | "admin-tags";

const mounted: VueWrapper[] = [];
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    fetchMock = vi.fn(async () => json({ data: [], total: 0, limit: 20, offset: 0 }));
    vi.stubGlobal("fetch", fetchMock);
    // jsdom ships no ResizeObserver; the Names panel's glass SegmentedTabs
    // observes its track (a platform stub, like `fetch` — nothing under test).
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
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

const fail500 = () => json({ type: "about:blank", title: "Internal Server Error", status: 500 }, 500);

describe("UIA-V-409 · a search that matches no user says so, and offers the way back", () => {
    it("renders the filtered-zero plate with Clear search, not the empty-roster plate", async () => {
        useAdminAuth().login("t");
        fetchMock.mockImplementation(async (input: unknown) =>
            urlOf(input).includes("/admin/users?")
                ? json({ data: ROSTER, total: 1, limit: 50, offset: 0 })
                : json({ data: [], total: 0, limit: 20, offset: 0 }),
        );
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        ports.admin.usersSearch.value = "zzzz";
        await flushPromises();
        expect(wrapper.text()).toContain("No users match “zzzz”.");
        expect(wrapper.text()).not.toContain("No users found.");
        const clear = wrapper.findAll("button").find((b) => b.text().trim() === "Clear search")!;
        await clear.trigger("click");
        await flushPromises();
        expect(wrapper.text()).toContain("azure-fox-01");
    });
});

describe("UIA-V-426 · the audit count never stands beside the error plate", () => {
    it("a failed re-read hides the stale 'N entries'", async () => {
        useAdminAuth().login("t");
        const entries = Array.from({ length: 3 }, (_, i) => ({ id: `a${i}`, timestamp: "2026-09-01T00:00:00Z", action: "delete-color", target: `c${i}` }));
        fetchMock.mockImplementation(async (input: unknown) =>
            urlOf(input).includes("/admin/audit") ? json({ data: entries, total: 3, limit: 20, offset: 0 }) : json({ data: [], total: 0, limit: 20, offset: 0 }),
        );
        const { wrapper, ports } = mountAdmin("admin-audit");
        await flushPromises();
        expect(wrapper.text()).toContain("3 entries");
        fetchMock.mockImplementation(async () => fail500());
        await ports.admin.audit.loadAuditLog();
        await flushPromises();
        expect(wrapper.text()).toContain("Couldn't load the audit log.");
        expect(wrapper.text()).not.toContain("3 entries");
    });
});

describe("UIA-V-414 · the names counts do not read 0 over a load error", () => {
    it("the Pending tab label drops its number when the queue failed", async () => {
        useAdminAuth().login("t");
        fetchMock.mockImplementation(async () => fail500());
        const { wrapper, ports } = mountAdmin("admin-names");
        await ports.admin.loadColorQueue();
        await flushPromises();
        expect(ports.admin.queueLoadError.value).not.toBeNull();
        expect(wrapper.text()).not.toMatch(/Pending · 0/);
        // the header badge (AdminPane) drops its "0" too
        expect(wrapper.text()).not.toMatch(/Names\s*0/);
    });
});

describe("UIA-V-432 · a success notice does not stand beside the flagged error plate", () => {
    it("a failed re-read clears the earlier act's notice", async () => {
        useAdminAuth().login("t");
        let fail = false;
        const row = { paletteSlug: "p-01", palette: null, flagCount: 1, flags: [] };
        fetchMock.mockImplementation(async (input: unknown, init?: RequestInit) => {
            if (fail) return fail500();
            if (init?.method === "DELETE") return json({ dismissed: 1 });
            return urlOf(input).includes("/admin/flagged?")
                ? json({ data: [row, { ...row, paletteSlug: "p-02" }], total: 2, limit: 20, offset: 0 })
                : json({ data: [], total: 0, limit: 20, offset: 0 });
        });
        const { wrapper, ports } = mountAdmin("admin-flagged");
        await flushPromises();
        await ports.admin.flagged.dismiss("p-01");
        await flushPromises();
        expect(ports.admin.flagged.notice.value).not.toBeNull();
        fail = true;
        await ports.admin.flagged.loadFlagged();
        await flushPromises();
        expect(wrapper.text()).toContain("Couldn't load");
        expect(ports.admin.flagged.notice.value).toBeNull();
    });
});

describe("UIA-V-651/653 · admin tags: 'uncategorized' sorts last; no success notice over the error plate", () => {
    it("groups real categories alphabetically, then uncategorized; a failed re-read clears the notice", async () => {
        useAdminAuth().login("t");
        let fail = false;
        const TAGS = [
            { id: "1", name: "moody", category: "mood" },
            { id: "2", name: "loose", category: "" },
            { id: "3", name: "warm", category: "zeal" },
        ];
        fetchMock.mockImplementation(async (input: unknown, init?: RequestInit) => {
            if (fail) return fail500();
            if (init?.method === "DELETE") return new Response(null, { status: 204 });
            return urlOf(input).includes("/admin/tags") ? json(TAGS) : json({ data: [], total: 0, limit: 20, offset: 0 });
        });
        const { wrapper, ports } = mountAdmin("admin-tags");
        await flushPromises();
        const tagsApi = ports.admin.tags;
        expect(tagsApi.groupedTags.value.map(([c]) => c)).toEqual(["mood", "zeal", "uncategorized"]);
        await tagsApi.deleteTag("moody");
        await flushPromises();
        expect(tagsApi.notice.value).not.toBeNull();
        fail = true;
        await tagsApi.loadTags();
        await flushPromises();
        expect(wrapper.text()).toContain("Couldn't load");
        expect(tagsApi.notice.value).toBeNull();
    });
});

describe("UIA-V-659 · the dead end carries no colour voice in the document title", () => {
    it("composeTitle omits the colour on not-found and keeps it elsewhere", () => {
        expect(composeTitle("not-found", "red")).not.toContain("red");
        expect(composeTitle("gradient", "red")).toContain("red");
    });
});
