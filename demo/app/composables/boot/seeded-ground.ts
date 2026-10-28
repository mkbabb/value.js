/**
 * boot/seeded-ground — THE SEEDED GROUND, the one pure derive of the ground
 * stops from a seed (X.W11.h7b · COHESION §0gl.10 · DISPOSITION §8 E7 /
 * O28-114).
 *
 * The ground (`--saved-bg-0..3`) is the atmosphere's derived palette, banded
 * by scheme: in light it is the CALIBRATED FIELD's own resolved palette
 * (`resolveAtmosphereField`); in dark it is the producer derive's dark band
 * (`deriveAurora(seed, { scheme: "dark" })`). This module is that derive and
 * nothing else — no Vue, no DOM, no storage — so TWO callers run the SAME
 * function:
 *
 *   - `useAtmosphere`'s reactive ground sink (`fieldAtomsFor`,
 *     `groundPaletteFor`, `groundStopsFor`), over the live atoms;
 *   - the pre-paint boot script in `index.html`, which reads a `#/?color=`
 *     seed (`parseUrlSeed`, also hydrate's URL reader) and paints
 *     `seededGroundStops(seed, dark)` before any module runs.
 *
 * The boot script cannot import, so the build inlines THIS module into it:
 * `vite.config.ts`'s `seededGroundInline` plugin bundles this file (with the
 * producer derive it calls) as an IIFE and writes it into the boot HTML at
 * build/serve time. Nothing here is hand-copied into the HTML (§0gl.10: a
 * static table misses by ΔE_OK ~0.2; a second derive is forbidden, §4.3).
 */

import { deriveAurora, type AuroraAtoms } from "@mkbabb/glass-ui/aurora";
import { oklchStopToHex } from "@mkbabb/glass-ui/color";

import { DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";
import { resolveAtmosphereField } from "./atmosphere-calibration";
import { normalizeGroundStops } from "./ground";

/** One OKLCh stop of a derived palette (the producer derive's own shape). */
export type GroundPalette = ReturnType<typeof deriveAurora>;

/**
 * X-W6 · X.W6.i (i2): the dark lBand door, landed on the field. In dark the
 * field takes the producer's dark band through the atoms door
 * (`lightnessScheme: "dark"`), unless the atoms have spoken (an explicit
 * `lightnessScheme` or `lBand` authored in AuroraPane wins).
 */
export function fieldAtomsFor(atoms: AuroraAtoms, dark: boolean): AuroraAtoms {
    return !dark || atoms.lightnessScheme !== undefined || atoms.lBand !== undefined
        ? atoms
        : { ...atoms, lightnessScheme: "dark" };
}

/**
 * The ground's palette, SCHEME-BANDED (F-6): light is the field's resolved
 * palette; dark is the producer derive's dark band over the seed (consuming a
 * producer option, never a forked derive). Falls to the field palette when the
 * seed is not a string or the derive refuses it.
 */
export function groundPaletteFor(
    atoms: AuroraAtoms,
    dark: boolean,
    fieldPalette: GroundPalette,
): GroundPalette {
    if (!dark) return fieldPalette;
    const seed = atoms.seed;
    if (typeof seed !== "string") return fieldPalette;
    try {
        return deriveAurora(seed, { scheme: "dark" });
    } catch {
        return fieldPalette;
    }
}

/** The template's stop set: hex stops, normalized to the fixed count. */
export function groundStopsFor(palette: GroundPalette): string[] {
    return normalizeGroundStops(palette.map(oklchStopToHex));
}

/**
 * The share-link seed in a hash route (`#/…?space=…&color=…`). Both keys are
 * required (hydrate's contract); null otherwise.
 */
export function parseUrlSeed(hash: string): { space: string; color: string } | null {
    const q = hash.indexOf("?");
    if (q === -1) return null;
    const params = new URLSearchParams(hash.slice(q + 1));
    const space = params.get("space");
    const color = params.get("color");
    if (!space || !color) return null;
    return { space, color };
}

/**
 * The ground a seed paints under the default atoms — the stops the reactive
 * sink's first write lands on for that seed. Null when the producer derive
 * refuses the seed (the app keeps its default atoms then, too).
 */
export function seededGroundStops(seed: string, dark: boolean): string[] | null {
    try {
        deriveAurora(seed); // throws iff un-parseable (useAtmosphere's seed gate)
    } catch {
        return null;
    }
    const atoms: AuroraAtoms = { ...DEFAULT_AURORA_ATOMS, seed };
    const field = resolveAtmosphereField(fieldAtomsFor(atoms, dark)).palette;
    return groundStopsFor(groundPaletteFor(atoms, dark, field));
}
