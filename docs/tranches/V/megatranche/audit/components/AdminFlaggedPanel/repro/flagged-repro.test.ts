import { describe, it, expect } from "vitest";
import { ref, computed } from "vue";
import { mount } from "@vue/test-utils";
import AdminFlaggedPanel from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/admin/AdminFlaggedPanel.vue";
import { ADMIN_PORT_KEY } from "/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts";

function makePort(over: Record<string, unknown> = {}) {
    const flagged = {
        items: ref<any[]>([]),
        total: ref(0),
        page: ref(1),
        pageSize: 20,
        loading: ref(false),
        loadError: ref<string | null>(null),
        pageCount: computed(() => 1),
        hasNext: computed(() => false),
        hasPrev: computed(() => false),
        loadFlagged: async () => {},
        dismiss: async () => {},
        deletePalette: async () => {},
        nextPage: () => {},
        prevPage: () => {},
        report: async () => undefined,
        ...over,
    };
    return { flagged } as any;
}

const ROW = (over: Record<string, unknown> = {}) => ({
    paletteSlug: "sunset-riot-9a3f",
    palette: { name: "Sunset Riot", slug: "sunset-riot-9a3f", colors: [{ css: "#e11d48" }], userSlug: "crimson-owl-77" },
    flagCount: 2,
    flags: [{ reporterSlug: "a", reason: "spam", detail: "junk", createdAt: "2026-07-05T00:00:00.000Z" }],
    ...over,
});

function mountWith(port: any) {
    return mount(AdminFlaggedPanel, { global: { provide: { [ADMIN_PORT_KEY as any]: port } } });
}

describe("AdminFlaggedPanel — challenge-C reproductions", () => {
    it("R1: loading=true renders skeletons AND the stale rows simultaneously", async () => {
        const port = makePort({ items: ref([ROW()]), total: ref(1), loading: ref(true) });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const skeletons = w.findAll('[data-slot="admin-list-skeleton"]').length;
        const rows = w.text().includes("Sunset Riot");
        console.log("R1 skeletons =", skeletons, "| stale row rendered =", rows);
        expect(skeletons).toBe(2);
        expect(rows).toBe(true);
    });

    it("R2: loadError set renders the 'unreachable' plate AND the stale rows + moderation buttons", async () => {
        const port = makePort({ items: ref([ROW()]), total: ref(1), loadError: ref("Backend unreachable") });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const t = w.text();
        console.log("R2 text =", JSON.stringify(t.replace(/\s+/g, " ").slice(0, 260)));
        expect(t).toContain("The flag queue is unreachable.");
        expect(t).toContain("Sunset Riot");
        expect(w.findAll("button").filter((b) => b.text().includes("Dismiss")).length).toBe(1);
    });

    it("R3: the WIRE shape palette={} (proven by the mongo pipeline probe) kills the 'palette deleted' branch", async () => {
        const port = makePort({ items: ref([ROW({ palette: {} })]), total: ref(1) });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const t = w.text();
        console.log("R3 text =", JSON.stringify(t.replace(/\s+/g, " ").slice(0, 200)));
        console.log("R3 swatch count =", w.findAll(".rounded-full").length);
        expect(t).not.toContain("palette deleted");
        expect(t).toContain("sunset-riot-9a3f");
    });

    it("R3b: the DECLARED shape palette=null does render the annotation (so only the wire is wrong)", async () => {
        const port = makePort({ items: ref([ROW({ palette: null })]), total: ref(1) });
        const w = mountWith(port);
        await w.vm.$nextTick();
        expect(w.text()).toContain("palette deleted");
    });

    it("R4: a malformed / missing flag timestamp renders the literal string 'Invalid Date'", async () => {
        const port = makePort({
            items: ref([ROW({ flags: [{ reporterSlug: "a", reason: "spam", createdAt: undefined }] })]),
            total: ref(1),
        });
        const w = mountWith(port);
        await w.vm.$nextTick();
        console.log("R4 text =", JSON.stringify(w.text().replace(/\s+/g, " ").slice(0, 160)));
        expect(w.text()).toContain("Invalid Date");
    });

    it("R5: the toolbar count asserts '0 flagged' while the queue is unreachable", async () => {
        const port = makePort({ total: ref(0), loadError: ref("Backend unreachable") });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const t = w.text().replace(/\s+/g, " ");
        console.log("R5 text =", JSON.stringify(t.slice(0, 140)));
        expect(t).toContain("0 flagged");
        expect(t).toContain("The flag queue is unreachable.");
    });

    it("R6: no aria-live region exists for the moderation result / count", async () => {
        const port = makePort({ items: ref([ROW()]), total: ref(1) });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const live = w.findAll("[aria-live]").length;
        const status = w.findAll('[role="status"]').length;
        console.log("R6 aria-live nodes =", live, "| role=status nodes =", status);
        expect(live).toBe(0);
    });

    it("R7: the flag-detail line is truncate-only — a 400-char report body is unreadable and has no title/expand", async () => {
        const long = "x".repeat(400);
        const port = makePort({ items: ref([ROW({ flags: [{ reporterSlug: "a", reason: "offensive", detail: long, createdAt: "2026-07-05T00:00:00.000Z" }] })]), total: ref(1) });
        const w = mountWith(port);
        await w.vm.$nextTick();
        const el = w.findAll("span").find((s) => s.text().startsWith("xxxx"));
        console.log("R7 detail classes =", el?.attributes("class"), "| title attr =", el?.attributes("title"));
        expect(el?.attributes("class")).toContain("truncate");
        expect(el?.attributes("title")).toBeUndefined();
    });
});
