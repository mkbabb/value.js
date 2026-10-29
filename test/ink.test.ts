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

import { afterAll, chai, describe, expect, it } from "vitest";
import { getCurrentSuite } from "vitest/suite";

import { convertColor, oklch, type AnyColor, type Color } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    CERTIFY_HEADROOM,
    GRAPHICS_CONTRAST_FLOOR,
    IDENTITY_CHROMA_HOLD,
    TEXT_CONTRAST_FLOOR,
    certifyAccentInk,
    certifyIdentityInk,
    contrastInkFor,
    plateInkDeparts,
    resolveMutedInk,
    resolvePlateInk,
    resolveSurfaceLightness,
} from "../demo/color-session/ink";

import producerHeld from "./producer-held.json";

/**
 * §0gb.2 — the producer-held cases (`test/producer-held.json`, the one
 * manifest). A held case runs its UNCHANGED body and passes only if the body
 * throws an `AssertionError` (the producer-owned defect still stands). Any
 * other error fails it; a body that passes fails it (glass landed: adopt it
 * and delete the row); a call site with no row, or a row that matches no
 * registered test, fails the file. Nothing is skipped and nothing loosened.
 */
const HELD_ROWS = new Map(producerHeld.rows.map((row) => [row.test, row]));
const heldRegistered = new Set<string>();

function itProducerHeld(name: string, body: () => void): void {
    const path = [name];
    for (
        let suite = getCurrentSuite().suite;
        suite && suite !== suite.file;
        suite = suite.suite
    )
        path.unshift(suite.name);
    const fullName = path.join(" > ");
    const row = HELD_ROWS.get(fullName);
    if (!row) throw new Error(`producer-held: no manifest row for "${fullName}"`);
    heldRegistered.add(fullName);
    it(name, async ({ annotate }) => {
        try {
            body();
        } catch (error) {
            if (!(error instanceof chai.AssertionError)) throw error;
            await annotate(`HELD-PASSING ${row.o} — ${row.expiry}: ${error.message}`);
            return;
        }
        throw new Error(
            `producer-held body PASSED (${row.o}): glass landed — adopt it and delete the row "${fullName}" from test/producer-held.json`,
        );
    });
}

afterAll(() => {
    const unmatched = [...HELD_ROWS.keys()].filter((name) => !heldRegistered.has(name));
    if (unmatched.length > 0)
        throw new Error(
            `producer-held: manifest rows match no test: ${JSON.stringify(unmatched)}`,
        );
});

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

/** The producer veil ink's own L (the veil composite's mix endpoint) —
 *  glass-ui 10.1.0's `--glass-veil-ink` (light `tokens/glass.css`, dark
 *  `tokens/dark-arm.css`; X.W7L.i: 7.0.0's card-tint endpoint no longer
 *  paints) — parsed through the same library leaf the resolver threads
 *  (never a hand-computed lightness). */
function veilCardBound(dark: boolean): number {
    const lightness = requiredOklch(dark ? "oklch(0.17 0.03 70)" : "oklch(0.28 0.035 70)")
        .channels[0];
    if (lightness === "none") throw new Error("Veil ink is missing lightness");
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
                    // X-W1/NG-3: the unit tree is now typechecked. `i` runs
                    // 1..length-1, so both reads are in-range by the loop bound.
                    const a1 = AMBIENTS[i - 1]!;
                    const a2 = AMBIENTS[i]!;
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

    it("the well is an IN-PLATE wash: it lifts toward the scheme's default elevation and flips away only from a departed ink (COHESION §0gv.6)", () => {
        let departed = 0;
        for (const a of AMBIENTS) {
            // Dark: always a lift above the resting plate (SS8-0440).
            const restingDark = resolveSurfaceLightness("resting", a, true);
            expect(resolveSurfaceLightness("well", a, true)).toBeGreaterThan(restingDark);
            // Light: a lift while the plate ink keeps the dark default pole; a
            // sink where it departed to cream, so the well never closes on it.
            const restingLight = resolveSurfaceLightness("resting", a, false);
            const wellLight = resolveSurfaceLightness("well", a, false);
            const ink = resolvePlateInk(restingLight, false);
            if (plateInkDeparts(ink, false)) {
                departed++;
                expect(wellLight).toBeLessThan(restingLight);
            } else {
                expect(wellLight).toBeGreaterThan(restingLight);
            }
            // §0gk.2: the plate ink the light well carries holds the floor on it.
            expect(ratioOn(ink, wellLight)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
        }
        // Both light arms are exercised by the ambient band.
        expect(departed).toBeGreaterThan(0);
        expect(departed).toBeLessThan(AMBIENTS.length);
    });

    it("the veil is an IN-PLATE composite — quiet-α over the RESTING rung, never the bare ambient (T.W6.5-P · T-34)", () => {
        for (const dark of [false, true]) {
            for (const a of AMBIENTS) {
                const veil = resolveSurfaceLightness("veil", a, dark);
                const resting = resolveSurfaceLightness("resting", a, dark);
                // A convex mix of the veil ink and its plate underlay: the
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

        itProducerHeld(`stays QUIETER than the raw foreground — a designed step, not a repaint (${dark ? "dark" : "light"})`, () => {
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

describe("X-DS pass 4 · V4C-01 — resolvePlateInk (ONE polarity per plate)", () => {
    for (const dark of [false, true]) {
        it(`the primary clears 4.5:1 and the muted rung shares its pole, across the ambient band (${dark ? "dark" : "light"})`, () => {
            for (const a of AMBIENTS) {
                const plateL = resolveSurfaceLightness("resting", a, dark);
                const primary = resolvePlateInk(plateL, dark);
                const muted = resolveMutedInk(plateL, dark);
                expect(ratioOn(primary, plateL), `primary on plate@${a} → ${primary}`).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
                // The muted rung never flips on its own: it sits on the same
                // side of the plate as the primary (V4C-01's two-ink split).
                expect(
                    Math.sign(parseOklch(muted).L - plateL),
                    `muted ${muted} and primary ${primary} straddle plate@${a}`,
                ).toBe(Math.sign(parseOklch(primary).L - plateL));
                // …and it never outranks the primary.
                expect(ratioOn(muted, plateL)).toBeLessThanOrEqual(ratioOn(primary, plateL) + 1e-6);
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
        itProducerHeld(`the owner brick certifies CHROMATIC on the resting plate — hue held, C ≥ ${IDENTITY_C_FLOOR}× the pick (${dark ? "dark" : "light"})`, () => {
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

    itProducerHeld("the cusp walk lands the MOST chromatic clearing point (never constant-C-then-clamp)", () => {
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

describe("X-DS pass 18 (V18C-01) — certifyIdentityInk holds the identity hue", () => {
    const GOLD = "oklch(0.751 0.147 84.2)";
    const SURFACES = Array.from({ length: 41 }, (_, i) => 0.1 + i * 0.02);
    for (const floor of [TEXT_CONTRAST_FLOOR, GRAPHICS_CONTRAST_FLOOR]) {
        for (const headroom of [CERTIFY_HEADROOM, 0]) {
            it(`clears the floor and keeps the gold, or speaks the plate ink (floor ${floor}, headroom ${headroom})`, () => {
                for (const L of SURFACES) {
                    const dark = L < 0.5;
                    const ink = certifyIdentityInk(GOLD, L, dark, floor, headroom);
                    expect(ratioOn(ink, L)).toBeGreaterThanOrEqual(floor - 1e-6);
                    if (ink === resolvePlateInk(L, dark)) continue;
                    const { C, H } = parseOklch(ink);
                    expect(C).toBeGreaterThanOrEqual(IDENTITY_CHROMA_HOLD * 0.147 - 1e-9);
                    expect(Math.abs(H - 84.2)).toBeLessThan(10);
                }
            });
        }
    }
    it("the mid-dark band that drained gold to white now keeps it (owner brown, L 0.5)", () => {
        const drained = parseOklch(certifyAccentInk(GOLD, 0.5));
        expect(drained.C).toBeLessThan(0.03);
        // the word: gold that holds its chroma, or the plate's own ink (never a hueless "gold")
        const word = certifyIdentityInk(GOLD, 0.5, true, TEXT_CONTRAST_FLOOR);
        if (word !== resolvePlateInk(0.5, true)) expect(parseOklch(word).C).toBeGreaterThanOrEqual(0.06);
        // the glyph keeps the gold
        const glyph = parseOklch(certifyIdentityInk(GOLD, 0.5, true, GRAPHICS_CONTRAST_FLOOR));
        expect(glyph.C).toBeGreaterThanOrEqual(0.06);
        expect(Math.abs(glyph.H - 84.2)).toBeLessThan(10);
    });
});
