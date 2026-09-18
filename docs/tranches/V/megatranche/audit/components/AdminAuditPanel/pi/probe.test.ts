/**
 * CHALLENGE-C probe — AdminAuditPanel implementation defects.
 * Throwaway PI artifact. NOT part of the shipping suite (own config).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref, computed, nextTick } from "vue";
import AdminAuditPanel from "../../../../../../../../demo/palettes/browser/admin/AdminAuditPanel.vue";
import { ADMIN_PORT_KEY } from "../../../../../../../../demo/palettes/usePalettePorts";
import { formatTime } from "../../../../../../../../demo/palettes/browser/dateFormat";

function makeAudit(over: Record<string, unknown> = {}) {
    const entries = ref<any[]>([]);
    const total = ref(0);
    const page = ref(1);
    const loading = ref(false);
    const loadError = ref<string | null>(null);
    const actionFilter = ref("");
    const targetFilter = ref("");
    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / 20)));
    const a: any = {
        entries,
        total,
        page,
        pageSize: 20,
        loading,
        loadError,
        actionFilter,
        targetFilter,
        pageCount,
        hasNext: computed(() => page.value < pageCount.value),
        hasPrev: computed(() => page.value > 1),
        loadAuditLog: vi.fn(async () => {}),
        nextPage: vi.fn(),
        prevPage: vi.fn(),
        ...over,
    };
    return a;
}

const ROWS = [
    { id: "a1", timestamp: "2026-07-05T00:00:00.000Z", action: "user.delete", target: "spammer-42", ipHash: "x" },
    { id: "a2", timestamp: "2026-07-05T01:00:00.000Z", action: "palette.feature", target: "sunset-riot", ipHash: "y" },
];

function mountPanel(audit: any) {
    return mount(AdminAuditPanel, {
        global: {
            provide: { [ADMIN_PORT_KEY as symbol]: { audit } },
            stubs: {
                Input: { template: `<input class="stub-input" />` },
                Button: { template: `<button class="stub-button"><slot/></button>` },
                Badge: { template: `<span class="stub-badge"><slot/></span>` },
                RefreshCw: { template: `<i/>` },
                EmptyState: {
                    props: ["variant", "message", "detail", "eyebrow"],
                    template: `<div class="stub-empty" :data-variant="variant">{{ message }}</div>`,
                },
                AdminListSkeleton: { template: `<div class="stub-skeleton"/>` },
                PaginationBar: { template: `<div class="stub-pagination"/>` },
            },
        },
    });
}

describe("C-1  loading state does NOT suppress stale rows", () => {
    it("renders 3 skeletons AND 2 real rows at the same time", async () => {
        const audit = makeAudit();
        audit.entries.value = ROWS;
        audit.total.value = 2;
        const w = mountPanel(audit);
        await nextTick();
        expect(w.findAll(".stub-skeleton").length).toBe(0);
        expect(w.findAll(".stub-badge").length).toBe(2);

        audit.loading.value = true; // a Refresh click
        await nextTick();
        const skeletons = w.findAll(".stub-skeleton").length;
        const rows = w.findAll(".stub-badge").length;
        console.log(`[C-1] loading=true -> skeletons=${skeletons} rows=${rows}`);
        expect(skeletons).toBe(3);
        expect(rows).toBe(2); // DEFECT: should be 0 while the shadow plate is up
    });
});

describe("C-2  error state does NOT suppress stale rows", () => {
    it("renders the 'ledger is unreachable' error AND 2 real rows at once", async () => {
        const audit = makeAudit();
        audit.entries.value = ROWS;
        audit.total.value = 2;
        const w = mountPanel(audit);
        await nextTick();

        audit.loadError.value = "Backend unreachable";
        await nextTick();
        const err = w.find(".stub-empty[data-variant='error']");
        const rows = w.findAll(".stub-badge").length;
        const countText = w.text().match(/(\d+) entr/)?.[1];
        console.log(
            `[C-2] loadError set -> errorBanner=${err.exists()} rows=${rows} toolbarCount="${countText}"`,
        );
        console.log(`[C-2] rendered text: ${JSON.stringify(w.text())}`);
        expect(err.exists()).toBe(true);
        expect(rows).toBe(2); // DEFECT: a dead backend shows a fully populated ledger
    });
});

describe("C-3  debounce timer is never cleared on unmount", () => {
    it("fires loadAuditLog + resets page AFTER the component is destroyed", async () => {
        vi.useFakeTimers();
        const audit = makeAudit();
        audit.page.value = 4;
        const w = mountPanel(audit);
        audit.actionFilter.value = "user";
        await nextTick(); // the watcher schedules the 300ms timer
        w.unmount();
        expect(audit.loadAuditLog).toHaveBeenCalledTimes(1); // onMounted only
        vi.advanceTimersByTime(400);
        console.log(
            `[C-3] after unmount + 400ms -> loadAuditLog calls=${audit.loadAuditLog.mock.calls.length} page=${audit.page.value}`,
        );
        expect(audit.loadAuditLog).toHaveBeenCalledTimes(2); // DEFECT: post-unmount fetch
        expect(audit.page.value).toBe(1); // DEFECT: post-unmount state write
        vi.useRealTimers();
    });
});

describe("C-4  formatTime: dead catch, 'Invalid Date' reaches the DOM", () => {
    it("never throws, so the `return iso` fallback is unreachable", () => {
        const out = formatTime("not-an-iso-timestamp");
        console.log(`[C-4] formatTime("not-an-iso-timestamp") = ${JSON.stringify(out)}`);
        expect(out).toBe("Invalid Date");
        console.log(`[C-4] formatTime(undefined as any) = ${JSON.stringify(formatTime(undefined as any))}`);
        console.log(`[C-4] formatTime("") = ${JSON.stringify(formatTime(""))}`);
    });

    it("renders 'Invalid Date' into the row", async () => {
        const audit = makeAudit();
        audit.entries.value = [{ id: "z", timestamp: "", action: "x.y", target: "t", ipHash: "" }];
        audit.total.value = 1;
        const w = mountPanel(audit);
        await nextTick();
        console.log(`[C-4b] row text: ${JSON.stringify(w.text())}`);
        expect(w.text()).toContain("Invalid Date");
    });
});

describe("C-5  aria: the loading plate's name is on a role-less generic", () => {
    it("puts aria-label on a bare <div> with no role and no aria-live", async () => {
        const audit = makeAudit({ loading: ref(true) });
        const w = mountPanel(audit);
        await nextTick();
        const el = w.find('[aria-label="Loading audit log"]');
        console.log(
            `[C-5] tag=${el.element.tagName} role=${el.attributes("role") ?? "(none)"} aria-live=${el.attributes("aria-live") ?? "(none)"} aria-busy=${el.attributes("aria-busy") ?? "(none)"}`,
        );
        expect(el.attributes("role")).toBeUndefined();
        // no live region anywhere in the panel
        expect(w.find("[aria-live]").exists()).toBe(false);
        // and no list semantics on the entries container
        expect(w.find('[role="list"]').exists()).toBe(false);
    });
});

function shimStorage(seed: Record<string, string> = {}) {
    const m = new Map(Object.entries(seed));
    const s = {
        getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
        setItem: (k: string, v: string) => void m.set(k, v),
        removeItem: (k: string) => void m.delete(k),
        clear: () => m.clear(),
        key: () => null,
        length: 0,
    };
    Object.defineProperty(globalThis, "localStorage", { value: s, configurable: true });
    if (typeof window !== "undefined")
        Object.defineProperty(window, "localStorage", { value: s, configurable: true });
}

describe("C-6  useAdminAudit: the no-token path costumes as a clear ledger", () => {
    beforeEach(() => {
        vi.resetModules();
        shimStorage();
    });
    it("returns silently — loading false, loadError null, entries [] => TRUE-empty render", async () => {
        const { useAdminAudit } = await import(
            "../../../../../../../../demo/palettes/useAdminAudit"
        );
        const a = useAdminAudit();
        await a.loadAuditLog();
        console.log(
            `[C-6] no token -> loading=${a.loading.value} loadError=${JSON.stringify(a.loadError.value)} entries=${a.entries.value.length} total=${a.total.value}`,
        );
        expect(a.loading.value).toBe(false);
        expect(a.loadError.value).toBeNull();
        expect(a.entries.value.length).toBe(0);

        // …and the panel therefore paints the specimen "ledger clear" plate.
        const w = mountPanel(a);
        await nextTick();
        console.log(`[C-6] panel text with no token: ${JSON.stringify(w.text())}`);
        expect(w.text()).toContain("No audit entries found.");
    });
});

describe("C-7  loadAuditLog has no request sequencing — last-writer-wins", () => {
    it("a slow page-2 response overwrites the newer page-3 response", async () => {
        const resolvers: ((v: any) => void)[] = [];
        vi.resetModules();
        vi.doMock("../../../../../../../../demo/palettes/api", () => ({
            getAuditLog: vi.fn(
                (_t: string, opts: any) =>
                    new Promise((res) => resolvers.push(() => res({ data: [{ id: `off-${opts.offset}` }], total: 100 }))),
            ),
        }));
        shimStorage({ "palette-admin-token": "tok" });
        const { useAdminAudit } = await import(
            "../../../../../../../../demo/palettes/useAdminAudit"
        );
        const a = useAdminAudit();
        a.page.value = 2;
        const p1 = a.loadAuditLog(); // offset 20
        a.page.value = 3;
        const p2 = a.loadAuditLog(); // offset 40
        resolvers[1]!(null); // page 3 lands first
        await p2;
        console.log(`[C-7] after fresh(page3) lands: entries=${JSON.stringify(a.entries.value)} loading=${a.loading.value}`);
        resolvers[0]!(null); // the stale page 2 lands second
        await p1;
        console.log(`[C-7] after stale(page2) lands: entries=${JSON.stringify(a.entries.value)} page=${a.page.value}`);
        expect((a.entries.value[0] as any).id).toBe("off-20"); // DEFECT: stale wins
        expect(a.page.value).toBe(3); // …while the pager says page 3
    });
});

describe("C-8  malformed 200 body -> unvalidated assignment -> render crash", () => {
    it("a 200 {} response makes entries undefined and the panel throws in render", async () => {
        vi.resetModules();
        shimStorage({ "palette-admin-token": "tok" });
        vi.doMock("../../../../../../../../demo/palettes/api", () => ({
            getAuditLog: vi.fn(async () => ({}) as any), // 200, wrong shape
        }));
        const { useAdminAudit } = await import(
            "../../../../../../../../demo/palettes/useAdminAudit"
        );
        const a = useAdminAudit();
        await a.loadAuditLog();
        console.log(
            `[C-8] after 200-with-{} -> entries=${String(a.entries.value)} total=${String(a.total.value)} loadError=${String(a.loadError.value)}`,
        );
        expect(a.entries.value).toBeUndefined();
        expect(a.loadError.value).toBeNull(); // the failure is INVISIBLE to the error plate

        let thrown: unknown = null;
        try {
            const w = mountPanel(a);
            await nextTick();
            console.log(`[C-8] panel text: ${JSON.stringify(w.text())}`);
        } catch (e: any) {
            thrown = e;
        }
        console.log(`[C-8] render threw: ${thrown ? (thrown as Error).message : "no"}`);
        expect(thrown).not.toBeNull();
    });
});

describe("C-9  domain boundaries on `total`", () => {
    const cases: [string, any][] = [
        ["NaN", NaN],
        ["Infinity", Infinity],
        ["-5", -5],
        ["null", null],
        ["string '40'", "40"],
    ];
    it("pageCount / hasNext / the toolbar count at the boundary", async () => {
        for (const [label, t] of cases) {
            const audit = makeAudit();
            audit.total.value = t;
            audit.entries.value = ROWS;
            const w = mountPanel(audit);
            await nextTick();
            const count = w.text().match(/^(\S+) entr\w+/)?.[1];
            console.log(
                `[C-9] total=${label} -> pageCount=${String(audit.pageCount.value)} hasNext=${String(audit.hasNext.value)} toolbar="${count}"`,
            );
        }
        expect(true).toBe(true);
    });
});
