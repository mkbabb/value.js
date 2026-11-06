/**
 * boot/seeded-ground — THE SEEDED GROUND, the one pure derive of the ground
 * stops from a seed (X.W11.h7b · COHESION §0gl.10 · DISPOSITION §8 E7 /
 * O28-114).
 *
 * The ground (`--saved-bg-0..3`) IS the atmosphere field's own resolved
 * palette, in both schemes (§0hk OD-12: the former dark ground derive —
 * `deriveAurora(seed, { scheme: "dark" })` — was the second half of the
 * owner's flat crimson, and is gone; ONE derive paints field and ground,
 * banded by scheme only through `fieldAtomsFor`'s ceiling).
 * This module is that derive and nothing else — no Vue, no DOM, no storage —
 * so TWO callers run the SAME function:
 *
 *   - `useAtmosphere`'s field + reactive ground sink (`fieldAtomsFor`,
 *     `groundStopsFor`), over the live atoms;
 *   - the pre-paint boot script in `index.html`, which reads a `#/?color=`
 *     seed (`parseUrlSeed`, also hydrate's URL reader) and paints
 *     `seededGroundStops(seed, dark)` before any module runs.
 *
 * The boot script cannot import, so the build bundles THIS module for it:
 * `vite.config.ts`'s `seededGroundInline` plugin builds this file twice, as
 * IIFEs — its `parseUrlSeed` alone, inlined into the boot HTML, and the whole
 * module (with the producer derive it calls) as a hashed classic script the
 * boot writes in, parser-blocking, only when the URL carries a seed
 * (X.W11.p4b · §0gn.2(b)). Nothing here is hand-copied into the HTML
 * (§0gl.10: a static table misses by ΔE_OK ~0.2; a second derive is
 * forbidden, §4.3).
 */

import { deriveAurora, type AuroraAtoms } from "@mkbabb/glass-ui/aurora";
import { oklchStopToHex } from "@mkbabb/glass-ui/color";

import { DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";
import { resolveAtmosphereField, seedAnchoredLBand } from "./atmosphere-calibration";
import { normalizeGroundStops } from "./ground";

/** One OKLCh stop of a derived palette (the producer derive's own shape). */
export type GroundPalette = ReturnType<typeof deriveAurora>;

/**
 * The dark field's lightness ceiling. Glass's dark resting plate (veil
 * oklch(0.17 0.03 70) at α 0.18) over a field stop above L ≈ 0.59 leaves no
 * light ink at 4.5:1 on the worst seed (ss8-b09's grid); 0.55 clears every
 * cell of that grid. Glass W-0.1 (the plate L-floor) lifts it to 0.98, the
 * light ceiling, and the dark field is then the light one.
 */
export const DARK_FIELD_CEILING = 0.55;

/**
 * The field's atoms: the SEED-ANCHORED band through the shipped `lBand` door
 * (`seedAnchoredLBand`, §0hk OD-12: the dominant stop on the chosen colour),
 * under the 0.98 ceiling in light and `DARK_FIELD_CEILING` in dark. The atoms
 * stay the tuning surface: an explicit `lightnessScheme` or `lBand` authored
 * in AuroraPane WINS.
 */
export function fieldAtomsFor(atoms: AuroraAtoms, dark: boolean): AuroraAtoms {
    if (atoms.lightnessScheme !== undefined || atoms.lBand !== undefined) return atoms;
    const lBand = seedAnchoredLBand(atoms.seed, dark ? DARK_FIELD_CEILING : 0.98);
    return lBand ? { ...atoms, lBand } : atoms;
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
 * sink's first write lands on for that seed in that scheme (the ground is
 * the field). Null when the producer derive refuses the seed (the app keeps
 * its default atoms then, too).
 */
export function seededGroundStops(seed: string, dark: boolean): string[] | null {
    try {
        deriveAurora(seed); // throws iff un-parseable (useAtmosphere's seed gate)
    } catch {
        return null;
    }
    const atoms: AuroraAtoms = { ...DEFAULT_AURORA_ATOMS, seed };
    return groundStopsFor(resolveAtmosphereField(fieldAtomsFor(atoms, dark)).palette);
}
