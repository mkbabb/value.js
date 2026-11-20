/**
 * SS-8 B14-card-grid-skeleton — cures.
 *
 *   · SS8-0404 (PCG U-7, static limb): PaletteInspector opened its template on
 *     a comment, which the dev compiler keeps as a sibling root, so the card
 *     mounted as a FRAGMENT (`$el` a text anchor, not the article). A fragment
 *     root under the grid's Sortable `insertNodeAt` moves only the element and
 *     leaves Vue's anchor behind. ES-2 cured PaletteCardSkeleton the same way:
 *     the template opens on its element and the note lives in <script>.
 *   · SS8-0413 / 0419 / 0420 (PCS U-6, SP-3, SP-6) — already cured at HEAD
 *     (X.W7.g G20, X-DS p5/p9 V9C-04); a regression pin: the loading
 *     silhouette (Browse's collapsed card) carries no swatch row.
 *     color-40 O-2 (his FORTIETH order: "a proper shadow palette skeleton")
 *     rewrote the instrument half: Extract's ghost is the DEVELOPED card's
 *     silhouette (strip, name row, k daubs), so its rows are fixed and its
 *     cells and daubs follow k, as the developed card's do.
 */
import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { computed, shallowRef } from "vue";
import PaletteInspector from "../../palettes/inspector/PaletteInspector.vue";
import PaletteCardSkeleton from "../../shared/ui/PaletteCardSkeleton.vue";
import { API_CLIENT_KEY, createApiClient } from "../../platform/transport/useApiClient";
import { INK_AMBIENT_KEY, SELECTED_ENTITY_KEY } from "../../color-session/keys";
import type { Palette } from "../../palettes/types";

const PALETTE: Palette = {
    id: "p-1",
    name: "Root fixture",
    slug: "root-fixture",
    colors: [
        { css: "#123456", position: 0 },
        { css: "#abcdef", position: 1 },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true,
};

afterEach(() => {
    document.body.innerHTML = "";
});

describe("SS8-0404 · the card grid's children mount on ONE element root (dev compile)", () => {
    it("PaletteInspector's root is the article element, not a fragment anchor", () => {
        const wrapper = mount(PaletteInspector, {
            props: { palette: PALETTE, expanded: false },
            global: {
                stubs: { transition: true },
                provide: {
                    [API_CLIENT_KEY as symbol]: createApiClient(),
                    [INK_AMBIENT_KEY as symbol]: computed(() => 0.5),
                    [SELECTED_ENTITY_KEY as symbol]: shallowRef([]),
                },
            },
            attachTo: document.body,
        });
        const el = wrapper.vm.$el as Node;
        expect(el.nodeType).toBe(Node.ELEMENT_NODE);
        expect((el as Element).getAttribute("role")).toBe("article");
        wrapper.unmount();
    });

    it("PaletteCardSkeleton (ES-2) stays on one element root", () => {
        const wrapper = mount(PaletteCardSkeleton, { attachTo: document.body });
        expect((wrapper.vm.$el as Node).nodeType).toBe(Node.ELEMENT_NODE);
        wrapper.unmount();
    });
});

describe("SS8-0413/0419/0420 · the skeleton's rows are k-invariant (regression pin)", () => {
    const rows = (count: number, variant: "instrument" | "shadow") => {
        const wrapper = mount(PaletteCardSkeleton, { props: { count, variant } });
        const root = wrapper.element as HTMLElement;
        const out = {
            rows: [...root.children].filter((e) => getComputedStyle(e).display !== "none").length,
            cells: root.firstElementChild!.children.length,
        };
        wrapper.unmount();
        return out;
    };

    it("instrument: the developed card's three rows at every k; its cells and daubs are k", () => {
        expect(rows(5, "instrument")).toEqual({ rows: 3, cells: 5 });
        expect(rows(16, "instrument")).toEqual({ rows: 3, cells: 16 });
        for (const k of [5, 16]) {
            const wrapper = mount(PaletteCardSkeleton, { props: { count: k, variant: "instrument" } });
            expect(wrapper.findAll('[data-slot="shadow-palette-daub"]')).toHaveLength(k);
            wrapper.unmount();
        }
    });

    it("instrument: still and silent at rest; breathing and announced mid-run", () => {
        const rest = mount(PaletteCardSkeleton, { props: { count: 5, variant: "instrument" } });
        expect(rest.attributes("aria-hidden")).toBe("true");
        expect(rest.attributes("role")).toBeUndefined();
        expect(rest.classes()).not.toContain("shadow-palette--loading");
        rest.unmount();
        const run = mount(PaletteCardSkeleton, { props: { count: 5, variant: "instrument", loading: true } });
        expect(run.attributes("role")).toBe("status");
        expect(run.attributes("aria-label")).toBe("Loading palette");
        expect(run.classes()).toContain("shadow-palette--loading");
        run.unmount();
    });

    it("loading: the row count does not grow with k (strip + meta, no swatch row)", () => {
        expect(rows(16, "shadow").rows).toBe(rows(5, "shadow").rows);
    });
});
