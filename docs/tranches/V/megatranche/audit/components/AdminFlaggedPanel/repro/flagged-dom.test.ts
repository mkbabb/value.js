import { describe, it, expect } from "vitest";
import { ref, computed } from "vue";
import { mount } from "@vue/test-utils";
import AdminFlaggedPanel from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/admin/AdminFlaggedPanel.vue";
import { ADMIN_PORT_KEY } from "/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts";

const ROW = {
    paletteSlug: "sunset-riot-9a3f",
    palette: { name: "Sunset Riot", slug: "sunset-riot-9a3f", colors: [{ css: "#e11d48" }], userSlug: "crimson-owl-77" },
    flagCount: 2,
    flags: [{ reporterSlug: "a", reason: "spam", detail: "junk", createdAt: "2026-07-05T00:00:00.000Z" }],
};

describe("AdminFlaggedPanel — rendered button DOM", () => {
    it("D1: `variant` is not a glass-ui 7 Button prop — it lands as a dead DOM attribute", () => {
        const flagged = {
            items: ref<any[]>([ROW]), total: ref(1), page: ref(1), pageSize: 20,
            loading: ref(false), loadError: ref<string | null>(null),
            pageCount: computed(() => 1), hasNext: computed(() => false), hasPrev: computed(() => false),
            loadFlagged: async () => {}, dismiss: async () => {}, deletePalette: async () => {},
            nextPage: () => {}, prevPage: () => {}, report: async () => undefined,
        };
        const w = mount(AdminFlaggedPanel, { global: { provide: { [ADMIN_PORT_KEY as any]: { flagged } } } });
        for (const b of w.findAll("button")) {
            console.log("BUTTON:", b.element.outerHTML.replace(/\s+/g, " ").slice(0, 400));
            console.log("   attr variant =", JSON.stringify(b.attributes("variant")),
                "| data-emphasis =", JSON.stringify(b.attributes("data-emphasis")),
                "| data-tone =", JSON.stringify(b.attributes("data-tone")),
                "| data-size =", JSON.stringify(b.attributes("data-size")),
                "| data-icon-only =", JSON.stringify(b.attributes("data-icon-only")));
        }
        const emphases = w.findAll("button").map((b) => b.attributes("data-emphasis"));
        console.log("D1 emphases as RENDERED =", emphases);
        expect(new Set(emphases).size).toBe(1); // "asymmetric weighting" never reaches the DOM
    });
});
