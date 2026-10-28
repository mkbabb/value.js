/**
 * boot/atmosphere-calibration — THE T-26 IN-BRACKET CALIBRATION, Q2-NOW half
 * (T.W2 · W2-5; SYNTHESIS D4; RATIFICATION Q2 "full comp.", the NOW/FULL
 * split standing [h-refine-overture F-7]).
 *
 * THE BRACKET (the owner's third calibration, closed from both sides — R6):
 * (analogous ±28°, colorEnergy 0.7) read "too muted, not noticeable enough"
 * ← the target → (triad 240°, 0.82) read "too strong". The landing sits in
 * the lower-middle, judged by eye across green/warm/neutral seeds AFTER
 * W2-1 (C4: the bracket is only judgeable over an honest seed — GAP-ARM's
 * demo half is dead).
 *
 * Q2-NOW (the demo-knob half, base-reachable with SHIPPED producer doors —
 * this module):
 *   · colorEnergy 0.76        — the energy step (aurora-atoms.ts; saturation
 *                               ≈1.12, below the 0.82 pole's register)
 *   · softmaxBeta 3 → 4       — zones resolve as COMPOSITION, not blur (F-9)
 *   · breathPeriod 40 → 26s   — the breath crosses the perceptual floor (F-8)
 *   · vividness = smoothstep(0.02, 0.10, seedC) — a gray pick keeps a sage
 *     WHISPER (C≈0.03–0.05), never the marigold shout (F-11: the producer's
 *     stacked warm floors lift achromatic zones to C≈0.115–0.135 at
 *     vividness 1)
 *
 * Q2-FULL (P1-GATED, re-judged at W7 — deliberately NOT landed here):
 * chroma-adaptive hueSpread [24°,64°] · the +165° counterpoint stop ·
 * drift ×1.6. The POINTER retune is DEFERRED until P1's honesty fix lands
 * (F-10 — two of three axes are structurally dead shader paths on smooth;
 * never calibrate against dead axes).
 *
 * X-W6 · X.W6.i (i2) — THE DARK lBAND HAS LEFT THIS LIST. It was carried
 * here as "atom-unreachable at the consumed dist (probed: the seed-atom
 * derive clobbers a base palette override)". Re-probed at the installed
 * 7.0.0 packed bytes that is FALSE: `resolveAtoms` forwards
 * `lightnessScheme` → `deriveAurora`'s `scheme` and `lBand` → `lBand`, both
 * measured to move the derived ramp (light L 0.50–0.82 → dark L 0.18–0.42;
 * an explicit `lBand: [0.10, 0.34]` honoured exactly). The band now lands on
 * the field in `useAtmosphere`'s `fieldAtoms`, through the shipped door.
 * This module is deliberately unchanged by that: the scheme is a SHELL fact
 * and this resolver is pure, so `aurora-harmony-stops.ts` and the O-6
 * bracket test keep calling it with no shell to know about.
 *
 * THE DRAG PATH IS BYTE-IDENTICAL: this module changes only the RESOLVED
 * CONFIG's ambient knobs; the per-frame re-seed mechanism (the rAF coalesce
 * → seed watch → resolveAtoms) is untouched — the app's best living moment
 * is calibrated around, never through.
 *
 * Pure module — no Vue. O-6 (the bracket resolver test) probes it directly.
 */

import {
    resolveAtoms,
    DEFAULT_AURORA_CONFIG,
    type AuroraAtoms,
} from "@mkbabb/glass-ui/aurora";
import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
import { cssToOklch } from "@mkbabb/glass-ui/color";
import { clamp } from "@mkbabb/value.js/math";

/** Tempo: the 40s breath is arithmetic-invisible (±3.25% luminance over 40s
 *  — F-8's stills); 26s crosses the perceptual floor while a 2s glance stays
 *  sub-JND (the O-26 calm band). */
export const CALIBRATED_BREATH_PERIOD = 26;

/** Structure: zones resolve as composition, not blur (F-9's two-tone wash). */
export const CALIBRATED_SOFTMAX_BETA = 4;

/** The vividness ride-down band: below C 0.02 a pick is achromatic (vividness
 *  0 — sage whisper only); above 0.10 fully chromatic (the floor may sing). */
export const VIVIDNESS_C_LO = 0.02;
export const VIVIDNESS_C_HI = 0.1;

/** Hermite smoothstep on [lo, hi] (the F-11 ride-down curve). */
export function smoothstep(lo: number, hi: number, x: number): number {
    const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
    return t * t * (3 - 2 * t);
}

/** The seed-chroma → vividness ride (F-11): gray keeps a whisper, never
 *  marigold. */
export function vividnessForSeedChroma(seedC: number): number {
    return smoothstep(VIVIDNESS_C_LO, VIVIDNESS_C_HI, seedC);
}

/** The seed's OKLCh chroma, throw-free (an un-parseable seed reads as
 *  mid-chroma so the field never over- or under-reacts to a transient). */
export function seedChroma(seed: AuroraAtoms["seed"]): number {
    if (typeof seed !== "string") {
        return typeof seed === "object" && seed ? seed.C : VIVIDNESS_C_HI;
    }
    try {
        return cssToOklch(seed).C;
    } catch {
        return VIVIDNESS_C_HI;
    }
}

/**
 * Resolve the atoms over the CALIBRATED base (the `resolveAtoms(atoms, base)`
 * producer seam — base fields the ≤7-knob projection does not carry survive
 * the atom touch). Throw contract UNCHANGED from bare `resolveAtoms`: the
 * producer derive throws on an un-parseable seed, and the deep-watch law is
 * held where it always was — useAtmosphere's VALIDATED seed write (an
 * un-parseable string never reaches the atoms). `seedChroma` above is
 * throw-free on its own.
 */
export function resolveCalibratedAtmosphere(atoms: AuroraAtoms): AuroraConfig {
    const base: AuroraConfig = {
        ...DEFAULT_AURORA_CONFIG,
        breathPeriod: CALIBRATED_BREATH_PERIOD,
        softmaxBeta: CALIBRATED_SOFTMAX_BETA,
        vividness: vividnessForSeedChroma(seedChroma(atoms.seed)),
    };
    return resolveAtoms(atoms, base);
}

// --- T.W8 · P9-R3 / T-37 — THE DERIVE-SEAM GUARANTEE ---------------------------
// The collapsed dock's WAX SEAL is the LIVE picked colour (a WatercolorDot on
// `cssColorOpaque`); the atmosphere FIELD behind it is DERIVED from the SAME
// seed. At the owner's brick reference the two collided — wax↔field ΔL 0.004
// (WCAG 1.03:1) light / 0.016 dark — so the seal's swatch identity vanished
// into the field, carried only by the producer's collapsed-pill glass halo
// (which is strong over dark fields and DISSOLVES over light ones — the §6.4
// self-camouflage class). t33-research §6.4 named the idiomatic cure: "the
// field is DERIVED, so the demo owns a GUARANTEED delta at the derive seam —
// the atmosphere's lBand never equals the wax L". The true `lBand` atom is
// producer-gated at the consumed dist (Q2-FULL, P1-booked), so the demo owns
// the guarantee HERE, as a MATERIAL lightness offset on the derived field — a
// figure-ground standoff, NEVER a ring or rim (Q12 ABROGATE + the register law
// stand; O-15a's negative border watch stays green through this cure). The same
// closed-form floor idiom the HeroBlob ink-floor uses (bead↔plate) applied to
// the field↔wax seam: one mean, one bounded uniform shift, zero iteration.
//
// It fires ONLY when the field mean L would otherwise land within the floor of
// the wax L (most seeds derive a field whose L naturally stands off, so the
// composition is untouched); when it fires, the whole palette shifts uniformly
// AWAY from the wax (internal spread preserved), clamped to the derive domain.
export const DERIVE_SEAM_FLOOR = 0.06;

function seedLightness(seed: AuroraAtoms["seed"]): number | null {
    if (typeof seed !== "string") {
        return typeof seed === "object" && seed ? seed.L : null;
    }
    try {
        return cssToOklch(seed).L;
    } catch {
        return null;
    }
}

/**
 * Guarantee |field mean L − wax L| ≥ DERIVE_SEAM_FLOOR by shifting the whole
 * derived palette uniformly away from the seed when they would collide. Pure;
 * the seed-lightness read is throw-free (an un-parseable seed skips the guard).
 */
function guaranteeSeamOffset(config: AuroraConfig, seed: AuroraAtoms["seed"]): AuroraConfig {
    const seedL = seedLightness(seed);
    const palette = config.palette;
    if (seedL == null || !palette?.length) return config;
    const meanL = palette.reduce((sum, stop) => sum + stop.L, 0) / palette.length;
    const delta = meanL - seedL;
    if (Math.abs(delta) >= DERIVE_SEAM_FLOOR) return config;
    // Push AWAY from the wax on the side the field already leans; flip if that
    // side has no headroom (closed-form — two branches, zero iteration).
    let dir = delta >= 0 ? 1 : -1;
    const need = DERIVE_SEAM_FLOOR - Math.abs(delta);
    const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
    if (headroom < need) dir = -dir;
    const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);
    return {
        ...config,
        palette: palette.map((stop) => ({ ...stop, L: clamp(stop.L + push, 0.02, 0.98) })),
    };
}

/**
 * THE FIELD RESOLVER — the calibrated resolve under the derive-seam guarantee.
 * The ONE function the painted field (useAtmosphere's WebGL getter + CSS
 * fallback + D6 ink referent) AND AuroraPane's harmony strips resolve
 * through, so a strip is byte-identical to the field selecting it paints
 * (O-14; AP-5 / SS8-0063: the strip once read the UN-guarded resolve and
 * diverged from the field on 210/510 seed×harmony cells, up to 61 rgb).
 */
export function resolveAtmosphereField(atoms: AuroraAtoms): AuroraConfig {
    return guaranteeSeamOffset(resolveCalibratedAtmosphere(atoms), atoms.seed);
}
