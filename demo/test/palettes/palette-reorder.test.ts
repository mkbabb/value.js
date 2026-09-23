// X.W7.d · N-7 — DRAG ORDER INTEGRITY, the store half (fold W7.25 · PG-1 + PG-2,
// the named-addition rider; W7.371-372). `movePalette` permutes ONLY the slots
// the visible palettes occupy: a drag under a search never relocates a palette
// the user cannot see, and a non-local palette keeps its place. The first-drag
// half (the library's default `onUpdate` double-applying the move) is cured at
// `PalettesPane.vue`'s one `onUpdate`; its browser row is named in the record.
import { beforeEach, describe, expect, it } from "vitest";

import { usePaletteStore } from "../../palettes/usePaletteStore";
import type { Palette } from "../../palettes/types";

const STAMP = "2026-09-23T00:00:00.000Z";
const local = (id: string): Palette => ({
    id,
    name: id,
    slug: id,
    colors: [],
    isLocal: true,
    createdAt: STAMP,
    updatedAt: STAMP,
});

describe("N-7 · movePalette permutes only the visible slots", () => {
    const { store, movePalette } = usePaletteStore();
    const order = () => store.value.palettes.map((p) => p.id ?? p.slug);

    beforeEach(() => {
        store.value.palettes = [
            local("a"),
            local("b"),
            { name: "remote", slug: "remote", colors: [], isLocal: false, createdAt: STAMP, updatedAt: STAMP },
            local("c"),
            local("d"),
        ];
    });

    it("unfiltered: moving k to j persists exactly that permutation", () => {
        movePalette(["a", "b", "c", "d"], 0, 2);
        expect(order()).toEqual(["b", "c", "remote", "a", "d"]);
    });

    it("the FIRST move is applied once — a second read of the order does not move it again", () => {
        movePalette(["a", "b", "c", "d"], 3, 0);
        expect(order()).toEqual(["d", "a", "remote", "b", "c"]);
        expect(order()).toEqual(["d", "a", "remote", "b", "c"]);
    });

    it("filtered (b and d visible): the hidden palettes keep their slots", () => {
        movePalette(["b", "d"], 1, 0);
        expect(order()).toEqual(["a", "d", "remote", "c", "b"]);
    });

    it("a no-op move changes nothing", () => {
        movePalette(["a", "b", "c", "d"], 2, 2);
        expect(order()).toEqual(["a", "b", "remote", "c", "d"]);
    });
});
