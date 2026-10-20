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
 *     (X.W7.g G20, X-DS p5/p9 V9C-04); a regression pin, GREEN before and after:
 *     the instrument plate is ONE strip row at every k (no swatch rows, no meta
 *     row), and the loading silhouette carries no swatch row either.
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

    it("instrument: one strip row at k=5 and k=16 (no swatch rows, no meta row)", () => {
        expect(rows(5, "instrument")).toEqual({ rows: 1, cells: 5 });
        expect(rows(16, "instrument")).toEqual({ rows: 1, cells: 16 });
    });

    it("loading: the row count does not grow with k (strip + meta, no swatch row)", () => {
        expect(rows(16, "shadow").rows).toBe(rows(5, "shadow").rows);
    });
});
