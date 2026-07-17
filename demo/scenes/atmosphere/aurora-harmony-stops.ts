/**
 * aurora-harmony-stops — AuroraPane's STRIP truth function (T.W6 · W6-4,
 * T-17; t-nav-dropdowns F7: "AuroraPane's admin harmony select as a family
 * member" of the STRIP grammar). Colocated with its one consumer (E-1).
 *
 * THE TRUTH LAW (O-14): the strip a harmony row shows must be byte-identical
 * to the palette selecting it yields. What selecting yields is the CALIBRATED
 * resolve — `resolveCalibratedAtmosphere({...atoms, harmony})` (the Q2-NOW
 * knobs ride it; a raw `deriveAurora` preview would LIE about vividness/
 * energy). This module READ-CONSUMES that pure boot module (a consume,
 * never a boot-chain write — W2's chain is closed); the vitest oracle
 * (`test/preview-chips.test.ts`) holds this function strictly equal to a
 * direct recompute.
 *
 * Serialization: the resolved `OklchStop {L,C,h}` triples emit as paintable
 * `oklch(L C H)` strings (raw OKLCh domain — glass-ui's stops are already
 * physical values, no denorm needed).
 */

import type { AuroraAtoms } from "@mkbabb/glass-ui/aurora";
import type { AuroraHarmony } from "@mkbabb/glass-ui/aurora";

import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";

/** Trim to 4 decimals, dropping trailing zeros (the house formatNum shape). */
function fmt(v: number): string {
    return v.toFixed(4).replace(/\.?0+$/, "");
}

/**
 * The palette the CURRENT atoms would resolve under a CANDIDATE harmony —
 * serialized as paintable oklch stops for the PreviewStrip.
 */
export function auroraHarmonyStops(
    atoms: AuroraAtoms,
    harmony: AuroraHarmony,
): string[] {
    const palette = resolveCalibratedAtmosphere({ ...atoms, harmony }).palette;
    return palette.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`);
}
