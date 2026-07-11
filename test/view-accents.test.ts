/**
 * S.W7 · W7-4 — the accent contrast probe (§Hard gate 3), O-13-SLIMMED at
 * T.W6 · W6-4 (the T-10 excise, same commit — the census's AT-RISK row).
 *
 * WHAT SLIMMED: the 9-per-view-token rows (`PRIMARY_VIEW_IDS`/
 * `PRIMARY_VIEW_SHIFTS` / `resolveViewAccentTokens`) died with the W7-4
 * color-wheel legend (the owner overrule — the menu speaks ink now). The
 * oracle no longer orbits a paint nobody renders.
 *
 * WHAT SURVIVES (the R1 survives-column): `resolveViewAccent` — the
 * CURRENT-view accent still resolves per the active view's schema shift, so
 * the WCAG 1.4.11 graphics floor (≥ 3:1) must hold POST-gamut-map for EVERY
 * shift the schema can make current, INCLUDING achromatic picks (probed at
 * C ≈ 0), at both ends of the measured ambient band. `resolveSealInk` — the
 * seal-ink rows, unchanged.
 *
 * WHAT JOINS (W6-4, Q5 RULED): the guarded letterform ramp rows — the THREE
 * analogous stops (the `--palettes-ramp-*` referent, O-14's re-pointed T-10
 * referent) each clear the WCAG 1.4.3 TEXT floor (≥ 4.5:1) and stay
 * hue-distinct.
 *
 * The probe verifies through the SAME library leaves the resolvers consume
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
    PALETTES_RAMP_SHIFTS,
    RAMP_TEXT_CONTRAST_FLOOR,
    resolvePalettesRamp,
} from "../demo/@/composables/color/palettes-ramp";
import { VIEW_MAP } from "../demo/@/composables/viewSchema";

/**
 * D6 (T.W3-5): the BG_LIGHTNESS constants are RETIRED — the live referent is
 * the atmosphere's `derivedLightness` (M-15). The resolver stays a pure
 * function of `bgL`, so the probe sweeps the MEASURED composited ambient
 * band instead (t-a11y-contrast F-1: 0.376–0.936 across schemes/surfaces) —
 * the floor must hold at BOTH ends of every ambient the app actually paints.
 */
const AMBIENT_BAND = { brightest: 0.936, darkest: 0.376 } as const;

/**
 * Every accentHueShift the schema can make CURRENT (the `--accent-view`
 * input domain) — derived from `VIEW_MAP` itself, never a hand list. The
 * per-view static tokens are dead (W6-4); the shift domain is not.
 */
const SCHEMA_SHIFTS = [
    ...new Set(Object.values(VIEW_MAP).map((c) => c.accentHueShift)),
];

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
    "bright ambient": AMBIENT_BAND.brightest,
    "dark ambient": AMBIENT_BAND.darkest,
} as const;

describe("W7-4 — the current-view accent (O-13-slimmed: the R1 survivor)", () => {
    it("the schema's shift domain is non-trivial (the sweep has teeth)", () => {
        expect(SCHEMA_SHIFTS.length).toBeGreaterThanOrEqual(2);
        expect(SCHEMA_SHIFTS).toContain(0);
    });

    for (const [schemeName, bgL] of Object.entries(SCHEMES)) {
        for (const [pickName, pickCss] of Object.entries(PICKS)) {
            it(`≥3:1 graphics floor — ${pickName}, ${schemeName} scheme, every schema shift`, () => {
                for (const shift of SCHEMA_SHIFTS) {
                    const resolved = resolveViewAccent(pickCss, shift, bgL);
                    expect(resolved, `shift ${shift}° resolves`).not.toBeNull();
                    const ratio = ratioAgainst(resolved!, bgL);
                    expect(
                        ratio,
                        `${shift}° → ${resolved} vs ${schemeName} bg`,
                    ).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
                }
            });
        }
    }

    it("achromatic picks stay chromatic — the axis survives C≈0", () => {
        // Pre-fix: rotations of a gray pick collapsed to ONE gray. Post: each
        // schema shift resolves visibly chromatic (C ≥ one OKLab JND mapped).
        for (const shift of SCHEMA_SHIFTS) {
            const resolved = resolveViewAccent(
                PICKS["achromatic mid (C≈0)"],
                shift,
                AMBIENT_BAND.brightest,
            );
            const { C } = parseResolved(resolved!);
            expect(C).toBeGreaterThanOrEqual(DELTA_E_OK_JND);
        }
    });

    it("the low-C floor is library-anchored (4 × the OKLab JND)", () => {
        expect(VIEW_ACCENT_MIN_CHROMA).toBeCloseTo(4 * DELTA_E_OK_JND, 12);
    });
});

describe("W6-4 — the guarded letterform ramp (Q5 RULED; O-14's T-10 referent)", () => {
    it("the ruled form: three analogous stops, ±40° about the live accent", () => {
        expect(PALETTES_RAMP_SHIFTS).toEqual([-40, 0, 40]);
        expect(RAMP_TEXT_CONTRAST_FLOOR).toBe(4.5);
    });

    for (const [schemeName, bgL] of Object.entries(SCHEMES)) {
        for (const [pickName, pickCss] of Object.entries(PICKS)) {
            it(`≥4.5:1 text floor — ${pickName}, ${schemeName} scheme, all 3 stops`, () => {
                const ramp = resolvePalettesRamp(pickCss, bgL);
                expect(ramp, "ramp resolves").not.toBeNull();
                expect(ramp).toHaveLength(3);
                for (const stop of ramp!) {
                    expect(
                        ratioAgainst(stop, bgL),
                        `${stop} vs ${schemeName} bg`,
                    ).toBeGreaterThanOrEqual(RAMP_TEXT_CONTRAST_FLOOR);
                }
            });
        }
    }

    it("the fan is hue-distinct — the ramp reads as a ramp, not one ink", () => {
        const ramp = resolvePalettesRamp(
            PICKS["chromatic default (the P1-4 measured pick)"],
            AMBIENT_BAND.brightest,
        )!;
        const hues = ramp.map((s) => Math.round(parseResolved(s).H / 10));
        expect(new Set(hues).size).toBe(3);
    });

    it("unparseable accent resolves to null (the writer keeps the last tokens)", () => {
        expect(resolvePalettesRamp("not-a-color", 0.5)).toBeNull();
    });
});

describe("W7-4 — the seal ink (the SEEDS.md w7 rider; R1 survivor)", () => {
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
