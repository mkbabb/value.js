// SERVED MODEL: claude-opus-5-5
/**
 * V-D4.2 (X realization, value-DESIGN · BC-CNL-4) — ink is a Result.
 * `contrastInk(fill)` chooses the WCAG-maximal neutral endpoint for an opaque
 * fill, and REFUSES (never `null`, never a silent inherit) where no single
 * ground exists or the floor is unreachable.
 */
import { describe, expect, it } from "vitest";
import * as color from "@src/subpaths/color";

const unwrap = <T>(r: { ok: true; value: T } | { ok: false; error: unknown }): T => {
    if (!r.ok) throw new Error(JSON.stringify(r.error));
    return r.value;
};

describe("contrastInk", () => {
    it("refuses a translucent fill (no single ground to certify against)", () => {
        const fill = unwrap(color.oklch(0.6, 0.1, 30, 0.5));
        const r = color.contrastInk(fill);
        expect(r.ok).toBe(false);
        expect(!r.ok && r.error.code).toBe("contrast_translucent");
    });

    it("returns the floor refusal where neither endpoint reaches the floor", () => {
        // A mid-grey fill: black and white both sit under 7:1 on it.
        const fill = unwrap(color.oklch(0.6, 0, 0));
        const r = color.contrastInk(fill, { floors: [7] });
        expect(r.ok).toBe(false);
        expect(!r.ok && r.error.code).toBe("contrast_unreachable");
    });

    it("chooses white on a dark fill and black on a light fill, clearing 4.5:1", () => {
        for (const [L, endpoint] of [[0.25, 1], [0.92, 0]] as const) {
            const fill = unwrap(color.oklch(L, 0.08, 250));
            const ink = unwrap(color.contrastInk(fill));
            expect(ink.channels[0]).toBe(endpoint);
            expect(unwrap(color.contrastRatio(ink, fill))).toBeGreaterThanOrEqual(4.5);
        }
    });

    it("is total over opaque out-of-gamut fills (mapped into sRGB first)", () => {
        const fill = unwrap(color.oklch(0.4, 0.5, 30));
        expect(color.contrastInk(fill).ok).toBe(true);
    });
});
