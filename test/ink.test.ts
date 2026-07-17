/**
 * T.W3-5 — THE INK-ON-TIER CONTRACT probe (D6).
 *
 * The pure module (`demo/color-session/ink.ts`) is probed through the
 * same public color model the resolver consumes. The oracle independently
 * computes WCAG luminance after `/css` parsing and `/color` conversion.
 *
 * The probe SWEEPS the measured composited ambient band (t-a11y-contrast
 * F-1: 0.376–0.936) — the whole point of D6 is that the referent is live, so
 * a fixed-referent probe would rebuild the very blind spot the guard-leaf
 * unit tests have (the census note: they "share the stale referent and
 * cannot see this by construction").
 */

import { describe, expect, it } from "vitest";

import { convertColor, oklch, type AnyColor, type Color } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    CERTIFY_HEADROOM,
    TEXT_CONTRAST_FLOOR,
    certifyAccentInk,
    contrastInkFor,
    resolveMutedInk,
    resolveSurfaceLightness,
} from "../demo/color-session/ink";

function requiredOklch(source: string): Color<"oklch"> {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new Error(`Unparseable test color: ${source}`);
    const converted = convertColor(parsed.value, "oklch");
    if (!converted.ok) throw new Error(`Unconvertible test color: ${source}`);
    return converted.value;
}

function relativeLuminance(color: AnyColor): number {
    const converted = convertColor(color, "rgb");
    if (!converted.ok)
        throw new Error(`RGB conversion failed: ${converted.error.code}`);
    const encoded = converted.value.channels.map((channel) => {
        if (channel === "none") throw new Error("RGB test color is missing a channel");
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * encoded[0]! + 0.7152 * encoded[1]! + 0.0722 * encoded[2]!;
}

/** WCAG ratio of ANY CSS color against an achromatic surface lightness —
 *  measured through the library leaves (never trusted from the resolver). */
function ratioOn(css: string, surfaceL: number): number {
    const surface = oklch(surfaceL, 0, 0, 1);
    if (!surface.ok) throw new Error(`Invalid test surface: ${surface.error.code}`);
    const inkLuminance = relativeLuminance(requiredOklch(css));
    const surfaceLuminance = relativeLuminance(surface.value);
    return (
        (Math.max(inkLuminance, surfaceLuminance) + 0.05) /
        (Math.min(inkLuminance, surfaceLuminance) + 0.05)
    );
}

/** Parse `oklch(L C H)` (the resolver's output voice) into raw components. */
function parseOklch(css: string): { L: number; C: number; H: number } {
    const [L, C, H] = requiredOklch(css).channels;
    if (L === "none" || C === "none" || H === "none") {
        throw new Error(`Resolver output is missing a channel: ${css}`);
    }
    return { L, C, H };
}

/** The measured ambient band (F-1) + interior points. */
const AMBIENTS = [0.376, 0.5, 0.63, 0.8, 0.936] as const;

/** The producer card tint's own L (the veil composite's mix endpoint) —
 *  parsed through the same library leaf the resolver threads (never a
 *  hand-computed lightness). */
function veilCardBound(dark: boolean): number {
    const lightness = requiredOklch(dark ? "hsl(26 22% 17%)" : "hsl(30 85% 96%)")
        .channels[0];
    if (lightness === "none") throw new Error("Veil card is missing lightness");
    return lightness;
}

/** The owner's reference color (O-18's literal) + the failure-mode picks. */
const PICKS = [
    "lab(38% 32 24)", // the owner brown — the O-18 census referent
    "lab(20% 5 -30)", // deep navy — F-2's 1.16:1 dark-menu case
    "lab(96% 0 0)", // near-white — F-2's 1.11:1 light-menu case
    "lab(50% 0 0)", // mid gray — fails BOTH schemes unguarded
    "oklch(0.62 0.2725 9.8)", // the P1-4 chromatic default
] as const;

const SURFACES = ["page", "resting", "floating", "well"] as const;

describe("D6 — resolveSurfaceLightness (the ladder referent)", () => {
    it("page = the live ambient, verbatim", () => {
        for (const a of AMBIENTS) {
            expect(resolveSurfaceLightness("page", a, false)).toBe(a);
            expect(resolveSurfaceLightness("page", a, true)).toBe(a);
        }
    });

    it("translucent rungs obey the α-composite law: ambient-monotone, α-damped", () => {
        for (const dark of [false, true]) {
            for (const rung of ["resting", "floating"] as const) {
                for (let i = 1; i < AMBIENTS.length; i++) {
                    const a1 = AMBIENTS[i - 1];
                    const a2 = AMBIENTS[i];
                    const L1 = resolveSurfaceLightness(rung, a1, dark);
                    const L2 = resolveSurfaceLightness(rung, a2, dark);
                    // A brighter ambient can only brighten the composite…
                    expect(L2).toBeGreaterThan(L1);
                    // …and the rung's tint alpha DAMPS the swing (the whole
                    // point of a tier referent vs the bare page ambient).
                    expect(L2 - L1).toBeLessThan(a2 - a1);
                }
            }
        }
    });

    it("the well is opaque — closed-form, ambient-free (the C5/Q4 dividend)", () => {
        const light = resolveSurfaceLightness("well", 0.376, false);
        expect(resolveSurfaceLightness("well", 0.936, false)).toBe(light);
        const dark = resolveSurfaceLightness("well", 0.376, true);
        expect(resolveSurfaceLightness("well", 0.936, true)).toBe(dark);
        // Scheme honesty: bright cream light well, deep stone dark well.
        expect(light).toBeGreaterThan(0.8);
        expect(dark).toBeLessThan(0.5);
    });

    it("the veil is an IN-PLATE composite — quiet-α over the RESTING rung, never the bare ambient (T.W6.5-P · T-34)", () => {
        for (const dark of [false, true]) {
            for (const a of AMBIENTS) {
                const veil = resolveSurfaceLightness("veil", a, dark);
                const resting = resolveSurfaceLightness("resting", a, dark);
                // A convex mix of the card tint and its plate underlay: the
                // veil referent must sit BETWEEN the two, strictly inside.
                const lo = Math.min(resting, veilCardBound(dark));
                const hi = Math.max(resting, veilCardBound(dark));
                expect(veil).toBeGreaterThanOrEqual(lo);
                expect(veil).toBeLessThanOrEqual(hi);
            }
            // Ambient damping: the veil's swing across the band is strictly
            // smaller than the resting plate's own swing.
            const veilSwing =
                resolveSurfaceLightness("veil", 0.936, dark) -
                resolveSurfaceLightness("veil", 0.376, dark);
            const restingSwing =
                resolveSurfaceLightness("resting", 0.936, dark) -
                resolveSurfaceLightness("resting", 0.376, dark);
            expect(veilSwing).toBeGreaterThan(0);
            expect(veilSwing).toBeLessThan(restingSwing);
        }
    });

    it("the rail's rest rung clears the 4.5:1 floor on the veil ground (the O-18 channel-letter row's static twin)", () => {
        for (const dark of [false, true]) {
            for (const a of AMBIENTS) {
                const veilL = resolveSurfaceLightness("veil", a, dark);
                const muted = resolveMutedInk(veilL, dark);
                expect(
                    ratioOn(muted, veilL),
                    `muted ink on veil (ambient ${a}, ${dark ? "dark" : "light"})`,
                ).toBeGreaterThanOrEqual(4.5);
            }
        }
    });
});

describe("D6 — certifyAccentInk (a pass by construction, never a distance heuristic)", () => {
    for (const dark of [false, true]) {
        it(`clears the 4.5:1 text floor — ambient band × surfaces × failure picks (${dark ? "dark" : "light"})`, () => {
            for (const surface of SURFACES) {
                for (const a of AMBIENTS) {
                    const surfaceL = resolveSurfaceLightness(surface, a, dark);
                    for (const pick of PICKS) {
                        const ink = certifyAccentInk(pick, surfaceL);
                        expect(
                            ratioOn(ink, surfaceL),
                            `${pick} on ${surface}@${a} (${dark ? "dark" : "light"}) → ${ink}`,
                        ).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
                    }
                }
            }
        });
    }

    it("keeps the ORIGINAL string when it already clears floor + headroom (fidelity)", () => {
        // Owner brown (OKLab L≈0.47) on a bright ground — far past the target.
        expect(certifyAccentInk("lab(38% 32 24)", 0.936)).toBe("lab(38% 32 24)");
    });

    it("hue survives certification (the guard moves L, never spins H)", () => {
        const ink = certifyAccentInk("oklch(0.62 0.2725 9.8)", 0.62);
        const { H } = parseOklch(ink);
        expect(Math.abs(H - 9.8)).toBeLessThan(1);
    });

    it("unparseable input passes through (the null-tolerant house contract)", () => {
        expect(certifyAccentInk("not-a-color", 0.5)).toBe("not-a-color");
    });
});

describe("D6 — resolveMutedInk (de-emphasis as a floor-clamped rung, F-4)", () => {
    for (const dark of [false, true]) {
        it(`≥4.5:1 on the live resting plate across the ambient band (${dark ? "dark" : "light"})`, () => {
            for (const a of AMBIENTS) {
                const plateL = resolveSurfaceLightness("resting", a, dark);
                const ink = resolveMutedInk(plateL, dark);
                expect(
                    ratioOn(ink, plateL),
                    `muted ink on plate@${a} → ${ink}`,
                ).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
            }
        });

        it(`stays QUIETER than the raw foreground — a designed step, not a repaint (${dark ? "dark" : "light"})`, () => {
            const plateL = resolveSurfaceLightness("resting", 0.63, dark);
            const muted = parseOklch(resolveMutedInk(plateL, dark));
            // The muted rung sits strictly BETWEEN the foreground extreme and
            // the plate: dark ink lightens toward the plate, light ink darkens.
            if (dark) {
                expect(muted.L).toBeLessThan(0.95);
                expect(muted.L).toBeGreaterThan(plateL);
            } else {
                expect(muted.L).toBeGreaterThan(0.2);
                expect(muted.L).toBeLessThan(plateL);
            }
        });
    }
});

describe("D6 — contrastInkFor (the seal-ink exemplar, generalized — F-3's dependent guard)", () => {
    it("light fills stamp dark ink; dark fills stamp light ink", () => {
        expect(contrastInkFor("white")).toBe("oklch(0 0 0)");
        expect(contrastInkFor("oklch(0.95 0.05 100)")).toBe("oklch(0 0 0)");
        expect(contrastInkFor("black")).toBe("oklch(1 0 0)");
        expect(contrastInkFor("lab(38% 32 24)")).toBe("oklch(1 0 0)");
    });

    it("unparseable fill resolves to null (the caller keeps its resting ink)", () => {
        expect(contrastInkFor("not-a-color")).toBeNull();
    });
});

describe("T-35 — the cream-collapse cure (T.W6.5 row 7 · t33-research §5.1)", () => {
    // The archived repro (2026-07-11, pre-cure @ db1e9c9-era walk): the owner
    // brick `oklch(0.51 0.13 32)` against the live referents —
    //   page@0.5103          → oklch(0.9700 0.0148 32.0)   ← the CREAM COLLAPSE
    //   resting(light) 0.8117 → oklch(0.3817 0.1300 32.0)
    //   resting(dark)  0.3552 → oklch(0.8090 0.1092 32.0)
    // Post-cure (referent = the resting rung + the cusp walk):
    //   resting(light) 0.8117 → oklch(0.3817 0.1300 32.0)  (full pick chroma)
    //   resting(dark)  0.3552 → oklch(0.8252 0.0984 32.0)  (cusp-capped)
    const OWNER_BRICK = "oklch(0.51 0.13 32)";
    const OWNER_AMBIENT = 0.5103; // §5.1 live `--ink-ambient-l` at the owner URL
    const PICK_C = 0.13;
    /** The O-18 identity-leg floor: C ≥ 0.35 × the pick's C, gamut-permitting. */
    const IDENTITY_C_FLOOR = 0.35;

    for (const dark of [false, true]) {
        it(`the owner brick certifies CHROMATIC on the resting plate — hue held, C ≥ ${IDENTITY_C_FLOOR}× the pick (${dark ? "dark" : "light"})`, () => {
            const plateL = resolveSurfaceLightness("resting", OWNER_AMBIENT, dark);
            const ink = certifyAccentInk(OWNER_BRICK, plateL);
            expect(
                ratioOn(ink, plateL),
                `certified ink clears the floor: ${ink}`,
            ).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
            const { C, H } = parseOklch(ink);
            expect(
                C,
                `the cream collapse is dead — ${ink} keeps the pick's chroma voice`,
            ).toBeGreaterThanOrEqual(IDENTITY_C_FLOOR * PICK_C);
            expect(Math.abs(H - 32), `hue held: ${ink}`).toBeLessThan(1);
        });
    }

    it("the cusp walk lands the MOST chromatic clearing point (never constant-C-then-clamp)", () => {
        // A vivid pick on the light plate: the walk lands deep enough to
        // clear, and the landing C is the pick's own where the slice permits.
        const plateL = resolveSurfaceLightness("resting", OWNER_AMBIENT, false);
        const ink = certifyAccentInk("oklch(0.62 0.2725 9.8)", plateL);
        const { C } = parseOklch(ink);
        expect(ratioOn(ink, plateL)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
        // The P1-4 vivid red holds REAL chroma at its certified L (the old
        // walk's per-step projection bled it toward neutral).
        expect(C).toBeGreaterThanOrEqual(IDENTITY_C_FLOOR * 0.2725);
    });
});

describe("D6 — the certification headroom (the interim-model tolerance)", () => {
    it("is a named, positive constant (dies with the P3/P5 publish swap)", () => {
        expect(CERTIFY_HEADROOM).toBeGreaterThan(0);
        expect(CERTIFY_HEADROOM).toBeLessThan(2);
    });
});
