// WatercolorDot's seeded PRNG — relocated from glass-ui 7.0.0 when glass 8.0.0 deleted
// the `./watercolor-dot` door ("the ornament itself RELOCATED to value.js", glass
// MIGRATION.md 8.0.0 `_Deleted — WatercolorDot_`). A dot keyed by `color + seed`
// reproduces the same organic blob shape across mounts; `mulberry32` + `hashString`
// are byte-identical to glass's internal procedural PRNG leaf.

/** Mulberry32 — fast 32-bit seeded PRNG. Returns a `() => number` in [0, 1). */
export function mulberry32(seed: number): () => number {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Simple string → u32 hash (djb2). */
export function hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
}


/** Generate 8 border-radius percentages for an organic blob, seeded by the PRNG.
 *
 * X-DS pass 7 (V7C-02): each SIDE's two corner radii are complementary (they sum
 * to 100%), so no side keeps a straight run. Eight independent draws in [20, 80]
 * let two corners on one side both land low (sum ~40%), and that side kept a flat
 * 60% edge, which read as a tile clipped by its box at the swatch's `fill` size.
 * The free corner of each side still draws in [lo, hi] (the seeded asymmetry, the
 * dot's identity); its sibling takes the rest of the side. All 8 draws are still
 * consumed, so the wobble channels seeded after them are unchanged. Order is the
 * CSS shorthand's: horizontal tl tr br bl / vertical tl tr br bl. */
export function randomRadii(rng: () => number, lo: number, hi: number): number[] {
    const out: number[] = [];
    for (let i = 0; i < 8; i++) {
        out.push(lo + rng() * (hi - lo));
    }
    out[1] = 100 - out[0]!; // top: tl-h + tr-h
    out[3] = 100 - out[2]!; // bottom: br-h + bl-h
    out[7] = 100 - out[4]!; // left: tl-v + bl-v
    out[6] = 100 - out[5]!; // right: tr-v + br-v
    return out;
}

/** Serialise 8 radii into a CSS `border-radius` shorthand (4 corners / 4 corners). */
export function radiiToCSS(r: number[]): string {
    return `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`;
}
