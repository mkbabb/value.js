// SERVED MODEL: claude-opus-5-5
/**
 * V-D5 · BC-PCS-31 — an SVG export under `dir=rtl` orders its swatches right
 * to left (the first colour at the inline start, which is the right edge);
 * the ltr bytes are unchanged (the W51 byte-exact contract).
 */
import { describe, expect, it } from "vitest";
import { serializeSvg } from "../../palettes/export/serializers";
import { captureSnapshot } from "../../palettes/export/capture";
import type { Palette } from "../../palettes";

const palette = {
    id: "p-rtl",
    name: "Rtl",
    isLocal: true,
    colors: [
        { css: "oklch(0.6 0.1 30)", position: 0 },
        { css: "oklch(0.7 0.1 140)", position: 1 },
        { css: "oklch(0.5 0.1 250)", position: 2 },
    ],
} as unknown as Palette;

const decode = (b: Uint8Array) => new TextDecoder().decode(b);
const xs = (svg: string) => [...svg.matchAll(/<rect x="(\d+)"[^>]*fill="([^"]+)"/g)].map((m) => [Number(m[1]), m[2]] as const);

describe("SVG export · direction", () => {
    it("rtl places the first colour at the right edge; ltr bytes unchanged", async () => {
        const cap = await captureSnapshot(palette);
        expect(cap.ok).toBe(true);
        if (!cap.ok) return;
        const ltr = decode(serializeSvg(cap.snapshot));
        const rtl = decode(serializeSvg(cap.snapshot, { direction: "rtl" }));
        const l = xs(ltr);
        const r = xs(rtl);
        expect(l.map(([x]) => x)).toEqual([0, 1, 2]);
        // Same document order of colours; the geometry mirrors.
        expect(r.map(([, f]) => f)).toEqual(l.map(([, f]) => f));
        expect(r.map(([x]) => x)).toEqual([2, 1, 0]);
        expect(decode(serializeSvg(cap.snapshot, { direction: "ltr" }))).toBe(ltr);
    });
});
