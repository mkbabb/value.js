/**
 * S.W7 · W7-4 — the accent contrast probe (§Hard gate 3).
 *
 * All 9 view accents must clear the WCAG 1.4.11 graphics floor (≥ 3:1)
 * POST-gamut-map, INCLUDING achromatic picks (probed at C ≈ 0), in both
 * schemes. The pre-fix state this gate exists to kill (design-dock-shell
 * P1-4, measured): mix 2.74:1 / generate 2.77:1 on the default pick, and
 * ALL nine rotations collapsing to one gray at C ≈ 0.
 *
 * The probe verifies through the SAME library leaves the resolver consumes
 * (`wcagContrastRatio`, `OKLCHColor`) — the oracle and the implementation
 * share the metric, not the pipeline.
 */

import { describe, expect, it } from "vitest";

import { OKLCHColor, wcagContrastRatio } from "@src/units/color";
import { DELTA_E_OK_JND } from "@src/units/color/gamut";
import {
    GRAPHICS_CONTRAST_FLOOR,
    VIEW_ACCENT_MIN_CHROMA,
    resolveSealInk,
    resolveViewAccent,
} from "../demo/color-picker/composables/boot/view-accents";
import {
    PRIMARY_VIEW_IDS,
    PRIMARY_VIEW_SHIFTS,
} from "../demo/color-picker/composables/boot/useViewAccents";
import {
    BG_LIGHTNESS_DARK,
    BG_LIGHTNESS_LIGHT,
} from "@composables/color/useContrastSafeColor";

/** Parse the resolver's `oklch(L C H)` output into raw components. */
function parseResolved(css: string): { L: number; C: number; H: number } {
    const m = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(css);
    expect(m, `resolver output shape: ${css}`).not.toBeNull();
    return { L: Number(m![1]), C: Number(m![2]), H: Number(m![3]) };
}

/** WCAG ratio of a resolved token against an achromatic scheme background. */
function ratioAgainst(css: string, bgL: number): number {
    const { L, C, H } = parseResolved(css);
    return wcagContrastRatio(
        new OKLCHColor(L, C, H, 1),
        new OKLCHColor(bgL, 0, 0, 1),
    );
}

/** The probe picks: the audit's default pick + the C≈0 achromatic family. */
const PICKS = {
    "chromatic default (the P1-4 measured pick)": "oklch(0.62 0.2725 9.8)",
    "achromatic mid (C≈0)": "oklch(0.62 0.0001 0)",
    "achromatic near-white": "oklch(0.98 0.0001 0)",
    "achromatic near-black": "oklch(0.05 0.0001 0)",
} as const;

const SCHEMES = {
    light: BG_LIGHTNESS_LIGHT,
    dark: BG_LIGHTNESS_DARK,
} as const;

describe("W7-4 — the 9 gamut-guarded per-view accents", () => {
    it("the schema yields exactly nine primary views", () => {
        expect(PRIMARY_VIEW_IDS).toHaveLength(9);
        expect(Object.keys(PRIMARY_VIEW_SHIFTS)).toHaveLength(9);
    });

    for (const [schemeName, bgL] of Object.entries(SCHEMES)) {
        for (const [pickName, pickCss] of Object.entries(PICKS)) {
            it(`≥3:1 graphics floor — ${pickName}, ${schemeName} scheme, all 9 views`, () => {
                for (const [id, shift] of Object.entries(
                    PRIMARY_VIEW_SHIFTS,
                )) {
                    const resolved = resolveViewAccent(pickCss, shift, bgL);
                    expect(resolved, `${id} resolves`).not.toBeNull();
                    const ratio = ratioAgainst(resolved!, bgL);
                    expect(
                        ratio,
                        `${id} (${shift}°) → ${resolved} vs ${schemeName} bg`,
                    ).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
                }
            });
        }
    }

    it("achromatic picks fan out chromatically — the axis survives C≈0", () => {
        // Pre-fix: all 9 rotations painted ONE gray. Post: nine hue-distinct,
        // visibly chromatic tokens (C at least one OKLab JND after mapping).
        const hues = new Set<number>();
        for (const shift of Object.values(PRIMARY_VIEW_SHIFTS)) {
            const resolved = resolveViewAccent(
                PICKS["achromatic mid (C≈0)"],
                shift,
                BG_LIGHTNESS_LIGHT,
            );
            const { C, H } = parseResolved(resolved!);
            expect(C).toBeGreaterThanOrEqual(DELTA_E_OK_JND);
            hues.add(Math.round(H / 10));
        }
        expect(hues.size).toBe(9);
    });

    it("the low-C floor is library-anchored (4 × the OKLab JND)", () => {
        expect(VIEW_ACCENT_MIN_CHROMA).toBeCloseTo(4 * DELTA_E_OK_JND, 12);
    });
});

describe("W7-4 — the seal ink (the 10th token, SEEDS.md w7 rider)", () => {
    it("light wax stamps dark ink; dark wax stamps light ink", () => {
        expect(resolveSealInk("white")).toBe("oklch(0 0 0)");
        expect(resolveSealInk("oklch(0.95 0.05 100)")).toBe("oklch(0 0 0)");
        expect(resolveSealInk("black")).toBe("oklch(1 0 0)");
        expect(resolveSealInk("oklch(0.3 0.1 260)")).toBe("oklch(1 0 0)");
    });

    it("unparseable wax resolves to null (the caller keeps the last ink)", () => {
        expect(resolveSealInk("not-a-color")).toBeNull();
    });
});
