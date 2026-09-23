// X.W7.d — the client pre-flight over the server's palette write contract:
// G10's N_colors = 51 and N_tags = 11 cells, W7.80's tag vocabulary, and N-14's
// rejection arm (the wire carries no `weight`, so a weighted palette's publish is
// refused in words rather than silently stripped). Every refusal happens BEFORE
// a request: `fetch` is stubbed and must stay uncalled.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";

import { preflightColors, preflightTags, PALETTE_WIRE_LIMITS } from "../../palettes/api/preflight";
import { usePaletteActions } from "../../palettes/usePaletteActions";
import { useTagEdit } from "../../palettes/useTagEdit";
import type { Palette, PaletteColor } from "../../palettes/types";

const colors = (n: number, weighted = false): PaletteColor[] =>
    Array.from({ length: n }, (_, i) => ({ css: `#${(i % 256).toString(16).padStart(2, "0")}0000`, position: i, ...(weighted ? { weight: 1 / n } : {}) }));

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
    fetchMock = vi.fn(async () => new Response("{}", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

function actions() {
    return usePaletteActions({
        savedPalettes: ref([]),
        savedColorStrings: ref([]),
        createPalette: () => ({}) as Palette,
        updatePalette: () => {},
        deletePalette: () => {},
        emitApply: () => {},
        emitAddColor: () => {},
        emitStartEdit: () => {},
    });
}

const palette = (c: PaletteColor[]): Palette => ({ name: "Wide", slug: "wide", colors: c, isLocal: true, id: "x" }) as Palette;

describe("G10 · colours — the server cap is refused in words, before a request", () => {
    it.each([0, 1, 2, 5, 50])("N = %i: the boundary is %s", (n) => {
        expect(preflightColors(colors(n)).ok).toBe(n >= 1 && n <= PALETTE_WIRE_LIMITS.maxColors);
    });

    it.each([51, 200, 201])("N = %i: refused, naming the cap and the excess", (n) => {
        const r = preflightColors(colors(n));
        expect(r).toEqual({ ok: false, message: expect.stringContaining(`at most 50 colors — this one has ${n}`) });
    });

    it("publish at N = 51 returns the refusal and spends no request", async () => {
        const result = await actions().onPublish(palette(colors(51)));
        expect(result.success).toBe(false);
        expect(result.message).toContain("at most 50 colors");
        expect(fetchMock).not.toHaveBeenCalled();
    });
});

describe("N-14 · the rejection arm — a weighted palette is refused explicitly", () => {
    it("the pre-flight names the weights that publishing would discard", () => {
        const r = preflightColors(colors(5, true));
        expect(r.ok).toBe(false);
        expect(!r.ok && r.message).toContain("color weights");
    });

    it("publish returns that refusal as the card's verdict and spends no request", async () => {
        const result = await actions().onPublish(palette(colors(5, true)));
        expect(result).toEqual({ success: false, message: expect.stringContaining("color weights") });
        expect(fetchMock).not.toHaveBeenCalled();
    });
});

describe("G10 · tags — N_tags = 11 and the vocabulary", () => {
    it.each([0, 1, 2, 3, 10])("N_tags = %i passes", (n) => {
        expect(preflightTags(Array.from({ length: n }, (_, i) => `tag-${i}`)).ok).toBe(true);
    });

    it("N_tags = 11 is refused and the save spends no request", async () => {
        const edit = useTagEdit();
        const saved = await edit.saveTags("wide", Array.from({ length: 11 }, (_, i) => `tag-${i}`));
        expect(saved).toBeUndefined();
        expect(edit.error.value).toContain("at most 10 tags");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("W7.80 — lower-casing is not validation: a space or an over-long name is named", () => {
        expect(preflightTags(["dark blue"])).toEqual({ ok: false, message: expect.stringContaining("lowercase letters, digits and hyphens") });
        expect(preflightTags(["x".repeat(31)])).toEqual({ ok: false, message: expect.stringContaining("longer than 30") });
    });
});
