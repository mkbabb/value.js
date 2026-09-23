// X.W7.d — the admin CRUD surface over the REAL composition root
// (`providePalettePorts`) under the REAL `AdminPane`: N-2 (auth ≠ empty),
// N-3 (prune scope), N-4 (one query per domain), N-16 (paged-read order) and
// the G13 unit rows (one owner, one visible verdict). `fetch` is stubbed at the
// platform boundary — no composable, panel or port is mocked.
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, provide, ref } from "vue";

import AdminPane from "../../palettes/admin/AdminPane.vue";
import { providePalettePorts, type PalettePorts } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";
import type { ViewId } from "../../shell/useViewManager";

type AdminView = "admin-users" | "admin-names" | "admin-audit" | "admin-flagged" | "admin-tags";
const ADMIN_VIEWS: readonly AdminView[] = [
    "admin-users",
    "admin-names",
    "admin-audit",
    "admin-flagged",
    "admin-tags",
];

const mounted: VueWrapper[] = [];
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    fetchMock = vi.fn(async () => json({ data: [], total: 0, limit: 20, offset: 0 }));
    vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
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

// The TRUE-EMPTY species each panel paints when the collection is really empty.
const TRUE_EMPTY = /roster clear|No users found|queue clear|No pending proposals|ledger clear|No audit entries|nothing flagged|No flagged palettes|no tags minted|No tags yet|\d+ tags?\b|\d+ users?\b|\d+ flagged|\d+ entr/;

describe("N-2 · auth ≠ empty — five panels, five signed-out plates", () => {
    for (const view of ADMIN_VIEWS) {
        it(`${view}: no token ⇒ the signed-out plate, no empty fact, no operable control, no request`, async () => {
            useAdminAuth().logout();
            const { wrapper } = mountAdmin(view);
            await flushPromises();

            const plate = wrapper.find('[data-admin-access="signed-out"]');
            expect(plate.exists(), `${view}: signed-out plate`).toBe(true);
            expect(plate.text()).toContain("Admin sign-in required.");

            const panel = plate.element.parentElement!;
            expect(panel.textContent ?? "", `${view}: no empty-species fact`).not.toMatch(TRUE_EMPTY);
            const operable = [...panel.querySelectorAll("button, input, textarea, select")].filter(
                (el) => !(el as HTMLButtonElement).disabled,
            );
            expect(operable.map((el) => el.outerHTML.slice(0, 80)), `${view}: operable controls`).toEqual([]);
            expect(fetchMock, `${view}: requests`).not.toHaveBeenCalled();
        });
    }

    it("a server 401 on a held token is the signed-out register too, not an outage", async () => {
        useAdminAuth().login("stale-token");
        fetchMock.mockImplementation(async () =>
            json({ type: "about:blank", title: "Unauthorized", status: 401 }, 401),
        );
        const { wrapper } = mountAdmin("admin-audit");
        await flushPromises();
        expect(wrapper.find('[data-admin-access="signed-out"]').exists()).toBe(true);
        expect(wrapper.text()).not.toContain("unreachable");
    });
});

const ROSTER = [
    { slug: "azure-fox-01", createdAt: "2026-09-01T00:00:00Z", paletteCount: 4 },
    { slug: "empty-ghost-33", createdAt: "2026-09-02T00:00:00Z", paletteCount: 0 },
    { slug: "empty-ghost-77", createdAt: "2026-09-03T00:00:00Z", paletteCount: 0 },
];

function rosterFetch(extra?: (url: string, init?: RequestInit) => Response | undefined) {
    fetchMock.mockImplementation(async (input: unknown, init?: RequestInit) => {
        const url = urlOf(input);
        const hit = extra?.(url, init);
        if (hit) return hit;
        if (url.includes("/admin/users?")) return json({ data: ROSTER, total: 3, limit: 50, offset: 0 });
        return json({ data: [], total: 0, limit: 20, offset: 0 });
    });
}

describe("N-3 · prune scope — the confirm's number and the operation's scope are one quantity", () => {
    it("under a search that hides every empty user, the confirm still quotes the unfiltered count and names the server-global scope", async () => {
        useAdminAuth().login("t");
        rosterFetch();
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        ports.admin.usersSearch.value = "azure";
        await flushPromises();

        expect(wrapper.text()).toContain("2 empty");
        const prune = wrapper.findAll("button").find((b) => b.text().includes("Prune empty"))!;
        expect(prune.attributes("disabled")).toBeUndefined();
        await prune.trigger("click");
        await flushPromises();

        const dialog = document.body.querySelector('[role="dialog"]')!;
        expect(dialog.textContent).toContain("every user with 0 palettes on the server");
        expect(dialog.textContent).toContain("2 of the 3 loaded users are empty");
    });
});

describe("N-4 · one searchQuery per domain, and it resets", () => {
    it("the four domains hold four distinct refs; typing in one filters no other; a route change resets all", async () => {
        const { ports, view } = mountAdmin("admin-users");
        const refs = [
            ports.library.searchQuery,
            ports.browse.searchQuery,
            ports.admin.usersSearch,
            ports.admin.namesSearch,
        ];
        expect(new Set(refs).size).toBe(4);

        ports.browse.searchQuery.value = "sunset";
        expect(ports.library.searchQuery.value).toBe("");
        expect(ports.admin.usersSearch.value).toBe("");
        expect(ports.admin.namesSearch.value).toBe("");

        ports.admin.usersSearch.value = "fox";
        ports.library.searchQuery.value = "mine";
        view.value = "admin-names";
        await flushPromises();
        expect(refs.map((r) => r.value)).toEqual(["", "", "", ""]);
    });
});

function deferred<T>() {
    let resolve!: (v: T) => void;
    const promise = new Promise<T>((r) => (resolve = r));
    return { promise, resolve };
}

const entry = (id: string) => ({ id, timestamp: "2026-09-20T00:00:00Z", action: "delete-user", target: `user=${id}` });

describe("N-16 · a paged read cannot be overwritten by an older one", () => {
    it("page 3 then page 2, with page 3 settling LAST: the rendered page is page 2 and the pager agrees", async () => {
        useAdminAuth().login("t");
        const slow = deferred<Response>();
        fetchMock.mockImplementation(async (input: unknown) => {
            const url = urlOf(input);
            if (url.includes("offset=40")) return slow.promise; // page 3
            if (url.includes("offset=20")) return json({ data: [entry("p2")], total: 100, limit: 20, offset: 20 });
            return json({ data: [entry("p1")], total: 100, limit: 20, offset: 0 });
        });
        const { wrapper, ports } = mountAdmin("admin-audit");
        await flushPromises();
        const audit = ports.admin.audit;

        audit.page.value = 3;
        const third = audit.loadAuditLog();
        audit.page.value = 2;
        await audit.loadAuditLog();
        slow.resolve(json({ data: [entry("p3")], total: 100, limit: 20, offset: 40 }));
        await third;
        await flushPromises();

        expect(audit.entries.value.map((e) => e.id)).toEqual(["p2"]);
        expect(audit.page.value).toBe(2);
        expect(audit.loading.value).toBe(false);
        expect(wrapper.text()).toContain("user=p2");
        expect(wrapper.text()).not.toContain("user=p3");
    });
});

describe("G13 · one owner, one visible verdict (DAG §2.3 rows 1 · 3 · 6)", () => {
    const PALETTES = [
        { slug: "audit-aurora", name: "Audit Aurora", colors: [{ css: "red", position: 0 }], tier: "standard" },
        { slug: "feature-fixture", name: "Feature Fixture", colors: [{ css: "blue", position: 0 }], tier: "standard" },
    ];

    it("row 1 — a failed feature is ANNOUNCED, never silent", async () => {
        useAdminAuth().login("t");
        rosterFetch((url) => {
            if (url.includes("/palettes") && url.includes("/admin/users/")) return json(PALETTES);
            if (url.includes("/feature")) return json({ type: "about:blank", title: "Palette not found", status: 404 }, 404);
            return undefined;
        });
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        await ports.admin.toggleUserExpand("azure-fox-01");
        await flushPromises();

        const feature = wrapper.findAll("button").find((b) => b.text().includes("Feature"))!;
        await feature.trigger("click");
        await flushPromises();
        const notice = wrapper.find('[data-admin-notice="users"]');
        expect(notice.attributes("aria-live")).toBe("polite");
        expect(notice.text()).toContain("Could not feature the palette: Palette not found");
    });

    it("row 3 — a roster refresh re-reads the open disclosure (no deleted palette left on screen)", async () => {
        useAdminAuth().login("t");
        let served = PALETTES;
        rosterFetch((url) => (url.includes("/admin/users/azure-fox-01/palettes") ? json(served) : undefined));
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        await ports.admin.toggleUserExpand("azure-fox-01");
        await flushPromises();
        expect(wrapper.find('[data-admin-palette="audit-aurora"]').exists()).toBe(true);

        served = PALETTES.slice(1); // deleted elsewhere
        const refresh = wrapper.findAll("button").find((b) => b.text().includes("Refresh"))!;
        await refresh.trigger("click");
        await flushPromises();
        expect(wrapper.find('[data-admin-palette="audit-aurora"]').exists()).toBe(false);
        expect(wrapper.find('[data-admin-palette="feature-fixture"]').exists()).toBe(true);
    });

    it("row 6 — the Admin scene carries only its own verbs: Feature and Delete, no Save/Remix/Export/Report", async () => {
        useAdminAuth().login("t");
        rosterFetch((url) => (url.includes("/admin/users/azure-fox-01/palettes") ? json(PALETTES) : undefined));
        const { wrapper, ports } = mountAdmin("admin-users");
        await ports.admin.loadAdminUsers();
        await ports.admin.toggleUserExpand("azure-fox-01");
        await flushPromises();

        const row = wrapper.find('[data-admin-palette="audit-aurora"]');
        const names = row.findAll("button").map((b) => b.attributes("aria-label") ?? b.text());
        expect(names).toEqual(["Feature Audit Aurora", "Delete palette Audit Aurora"]);
        expect(row.text()).not.toMatch(/Save|Remix|Export|Report/);
    });
});
