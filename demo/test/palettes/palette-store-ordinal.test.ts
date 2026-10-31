// SERVED MODEL: claude-opus-5-5
// X.W11.api2 · COHESION §0gt.5 (PCS-11): the local library is normalized to the
// ordinal on read — Extract once stored `i / (n - 1)`, which the wire now
// refuses — and weights are carried through.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function memoryStorage(): Storage {
    const data = new Map<string, string>();
    return {
        get length() { return data.size; },
        clear: () => data.clear(),
        getItem: (k) => data.get(k) ?? null,
        key: (i) => [...data.keys()][i] ?? null,
        removeItem: (k) => void data.delete(k),
        setItem: (k, v) => void data.set(k, String(v)),
    };
}

describe("§0gt.5 · the at-rest local library reads as ordinal positions", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.stubGlobal("localStorage", memoryStorage());
    });
    afterEach(() => vi.unstubAllGlobals());

    it("a legacy extracted palette (i/(n-1)) reads back as 0, 1, 2 with its weights", async () => {
        localStorage.setItem(
            "color-palettes",
            JSON.stringify({
                version: 1,
                palettes: [
                    {
                        id: "local-1",
                        name: "Extracted",
                        slug: "extracted",
                        isLocal: true,
                        createdAt: "2026-01-01T00:00:00.000Z",
                        updatedAt: "2026-01-01T00:00:00.000Z",
                        colors: [
                            { css: "#aa0000", position: 0, weight: 0.5 },
                            { css: "#00aa00", position: 0.5, weight: 0.3 },
                            { css: "#0000aa", position: 1, weight: 0.2 },
                        ],
                    },
                ],
            }),
        );
        const { usePaletteStore } = await import("../../palettes/usePaletteStore");
        const [p] = usePaletteStore().savedPalettes.value;
        expect(p?.colors.map((c) => c.position)).toEqual([0, 1, 2]);
        expect(p?.colors.map((c) => c.weight)).toEqual([0.5, 0.3, 0.2]);
    });
});
