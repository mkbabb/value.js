import { describe, it, expect } from "vitest";
import { ref, computed, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import AdminFlaggedPanel from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/admin/AdminFlaggedPanel.vue";
import { ADMIN_PORT_KEY } from "/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts";

const ROW = (slug: string) => ({
    paletteSlug: slug,
    palette: { name: slug, slug, colors: [{ css: "#e11d48" }], userSlug: "u" },
    flagCount: 2,
    flags: [{ reporterSlug: "a", reason: "spam", detail: "junk", createdAt: "2026-07-05T00:00:00.000Z" }],
});

function port(over: Record<string, unknown> = {}) {
    const items = ref<any[]>([ROW("a"), ROW("b")]);
    const flagged = {
        items, total: ref(2), page: ref(1), pageSize: 20,
        loading: ref(false), loadError: ref<string | null>(null),
        pageCount: computed(() => 1), hasNext: computed(() => false), hasPrev: computed(() => false),
        loadFlagged: async () => {},
        dismiss: async (slug: string) => { items.value = items.value.filter((i) => i.paletteSlug !== slug); },
        deletePalette: async () => {}, nextPage: () => {}, prevPage: () => {}, report: async () => undefined,
        ...over,
    };
    return { flagged } as any;
}

describe("AdminFlaggedPanel — a11y reproductions", () => {
    it("A1: the loading state emits TWO identical role=status 'Loading' regions, and the wrapper's aria-label sits on a role-less div", async () => {
        const p = port({ loading: ref(true) });
        const w = mount(AdminFlaggedPanel, { attachTo: document.body, global: { provide: { [ADMIN_PORT_KEY as any]: p } } });
        await nextTick();
        const statuses = w.findAll('[role="status"]');
        console.log("A1 role=status count =", statuses.length,
            "| labels =", statuses.map((s) => s.attributes("aria-label")));
        const wrapper = w.findAll("div").find((d) => d.attributes("aria-label") === "Loading flagged palettes");
        console.log("A1 wrapper role =", JSON.stringify(wrapper?.attributes("role")), "| aria-label =", JSON.stringify(wrapper?.attributes("aria-label")));
        expect(statuses.length).toBe(2);
        expect(wrapper?.attributes("role")).toBeUndefined();
    });

    it("A2: dismissing a row destroys the focused control and strands focus on <body>", async () => {
        const p = port();
        const w = mount(AdminFlaggedPanel, { attachTo: document.body, global: { provide: { [ADMIN_PORT_KEY as any]: p } } });
        await nextTick();
        const dismiss = w.findAll("button").filter((b) => b.text().includes("Dismiss"))[0];
        (dismiss.element as HTMLButtonElement).focus();
        console.log("A2 focus before =", document.activeElement?.textContent?.trim());
        await dismiss.trigger("click");
        await nextTick(); await nextTick();
        console.log("A2 focus after  =", document.activeElement?.tagName,
            "| rows left =", w.findAll("button").filter((b) => b.text().includes("Dismiss")).length);
        expect(document.activeElement?.tagName).toBe("BODY");
    });

    it("A3: the flag-count badge is an unlabelled bare number", async () => {
        const p = port();
        const w = mount(AdminFlaggedPanel, { global: { provide: { [ADMIN_PORT_KEY as any]: p } } });
        await nextTick();
        const badge = w.findAll('[data-slot="badge"]')[0] ?? w.findAll("span").find((s) => s.text() === "2");
        console.log("A3 badge outerHTML =", badge?.element.outerHTML.replace(/\s+/g, " ").slice(0, 220));
        expect(badge?.attributes("aria-label")).toBeUndefined();
    });

    it("A4: no confirmation guards the destructive delete — one click fires it", async () => {
        let called: string[] = [];
        const p = port({ deletePalette: async (s: string) => { called.push(s); } });
        const w = mount(AdminFlaggedPanel, { global: { provide: { [ADMIN_PORT_KEY as any]: p } } });
        await nextTick();
        const del = w.findAll("button").filter((b) => (b.attributes("aria-label") ?? "").startsWith("Delete palette"))[0];
        await del.trigger("click");
        console.log("A4 deletePalette called with =", called, "| dialogs in DOM =", w.findAll('[role="dialog"]').length);
        expect(called).toEqual(["a"]);
    });
});
