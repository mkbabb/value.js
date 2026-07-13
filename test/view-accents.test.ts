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
    resolveViewAccent,
} from "../demo/@/composables/color/view-accent";
import {
    certifyAccentInk,
    resolveSurfaceLightness,
} from "../demo/@/composables/color/ink";
import { resolveSealInk } from "../demo/color-picker/composables/boot/view-accents";
import {
    PALETTES_RAMP_SHIFTS,
    RAMP_TEXT_CONTRAST_FLOOR,
    RAMP_LARGE_TEXT_CONTRAST_FLOOR,
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

describe("W6-4/WR-8 — the guarded letterform ramp (Q5 RULED; O-14's T-10 referent; the per-site surface cure)", () => {
    it("the ruled form: three analogous stops, ±40°; the two per-site floors", () => {
        expect(PALETTES_RAMP_SHIFTS).toEqual([-40, 0, 40]);
        expect(RAMP_TEXT_CONTRAST_FLOOR).toBe(4.5);
        expect(RAMP_LARGE_TEXT_CONTRAST_FLOOR).toBe(3);
    });

    /**
     * WR-8 — the cure certifies against the CARD SURFACE the letterforms sit
     * on (the `resolveSurfaceLightness` output band), NOT the mid page ambient
     * the wreck used. At these realistic per-scheme grounds every site floor
     * is reachable WITH chroma via the feasibility-aware cusp walk — the
     * near-black L≈0.02 clamp (2.03:1 dark / monochrome light) cannot recur.
     */
    const CARD_SURFACES = { "light card": 0.68, "dark card": 0.35 } as const;
    const SITE_FLOORS = {
        "menu 4.5": RAMP_TEXT_CONTRAST_FLOOR,
        "title 3": RAMP_LARGE_TEXT_CONTRAST_FLOOR,
    } as const;

    for (const [schemeName, surfaceL] of Object.entries(CARD_SURFACES)) {
        for (const [pickName, pickCss] of Object.entries(PICKS)) {
            for (const [floorName, floor] of Object.entries(SITE_FLOORS)) {
                it(`clears the ${floorName} floor on the ${schemeName} — ${pickName}, chromatic (never the near-black clamp)`, () => {
                    const ramp = resolvePalettesRamp(pickCss, surfaceL, floor);
                    expect(ramp, "ramp resolves").not.toBeNull();
                    expect(ramp).toHaveLength(3);
                    for (const stop of ramp!) {
                        expect(
                            ratioAgainst(stop, surfaceL),
                            `${stop} vs ${schemeName}`,
                        ).toBeGreaterThanOrEqual(floor);
                        // Feasibility: the cure never ships the L≈0.02 clamp.
                        expect(
                            parseResolved(stop).L,
                            `${stop} is not near-black-clamped`,
                        ).toBeGreaterThan(0.05);
                    }
                });
            }
        }
    }

    it("the fan is hue-distinct — the ramp reads as a ramp, not one ink", () => {
        const ramp = resolvePalettesRamp(
            PICKS["chromatic default (the P1-4 measured pick)"],
            CARD_SURFACES["dark card"],
            RAMP_TEXT_CONTRAST_FLOOR,
        )!;
        const hues = ramp.map((s) => Math.round(parseResolved(s).H / 10));
        expect(new Set(hues).size).toBe(3);
    });

    it("unparseable accent resolves to null (the writer keeps the last tokens)", () => {
        expect(
            resolvePalettesRamp("not-a-color", 0.5, RAMP_TEXT_CONTRAST_FLOOR),
        ).toBeNull();
    });
});

describe("VJ-U-F26 (BR-2) — the rendered-tier accent re-guard: one surface referent, not the page ambient", () => {
    // The DEFAULT SEED (useColorParsing.ts DEFAULT_COLOR = "lavendi").
    const DEFAULT_SEED = "oklch(0.799 0.11 318.24)";
    // FIRST_VISIT_GROUND (boot/ground.ts) — the default seed's derived field,
    // per scheme; the page ambient is its mean OKLab L. Inlined + cited (the
    // test gates the MECHANISM, not the exact literal — regenerate with it).
    // FIRST_VISIT_GROUND (boot/ground.ts) for reference: light pinks
    // #b37290→#ffcfc8 (mean OKLab L ≈ 0.77), dark #673255→#d6917c (mean ≈ 0.56).

    /**
     * Reproduce the boot cascade for the default seed, both schemes:
     *   --accent-live = certifyAccentInk(seed, restingL)  [useContrastSafeColor]
     *   --accent-view = resolveViewAccent(--accent-live, 0, referentL)  [useViewAccents]
     * The BUG was `referentL = page ambient`; the CURE is `referentL = surface`.
     */
    for (const scheme of ["light", "dark"] as const) {
        const dark = scheme === "dark";
        // The page ambient (mean OKLab L of the derived field) — parsed through
        // the census's own `ratioAgainst`/OKLCHColor instrument is overkill; a
        // representative value per scheme suffices (the measured band, F-1):
        // light field mean ≈ 0.77, dark field mean ≈ 0.56.
        const ambientL = dark ? 0.56 : 0.77;
        const restingL = resolveSurfaceLightness("resting", ambientL, dark);

        it(`${scheme}: the accent certified against the SURFACE clears ≥3:1 on that surface (the cure)`, () => {
            const accentLive = certifyAccentInk(DEFAULT_SEED, restingL);
            // POLE A — the shipped boot referent: the live-probed surface.
            const accentView = resolveViewAccent(accentLive, 0, restingL)!;
            expect(accentView, "accent resolves").not.toBeNull();
            expect(
                ratioAgainst(accentView, restingL),
                `accent ${accentView} on resting rung L=${restingL.toFixed(3)}`,
            ).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
        });

        if (dark) {
            it(`${scheme}: the PAGE-AMBIENT referent is the recorded defect — it breaches on the real surface`, () => {
                const accentLive = certifyAccentInk(DEFAULT_SEED, restingL);
                // THE DEFECT (pre-U-F26): certify against the mid page ambient…
                const accentAmbient = resolveViewAccent(accentLive, 0, ambientL)!;
                // …then MEASURE against the surface the accent renders on: the
                // measured 1.72:1 breach class — the ambient referent walks the
                // dark accent to a mid-relative L that fails on the dark tier.
                expect(
                    ratioAgainst(accentAmbient, restingL),
                    `ambient-referent accent ${accentAmbient} BREACHES on resting L=${restingL.toFixed(3)}`,
                ).toBeLessThan(GRAPHICS_CONTRAST_FLOOR);
                // The SAME cascade with the SURFACE referent (the cure) clears —
                // the crisp before/after on ONE deterministic instrument.
                const accentSurface = resolveViewAccent(accentLive, 0, restingL)!;
                expect(
                    ratioAgainst(accentSurface, restingL),
                    `surface-referent accent ${accentSurface} clears`,
                ).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
            });
        }
    }
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
