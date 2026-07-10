import { createHash } from "node:crypto";
import type { PaletteColor } from "./models.js";

/**
 * Compute a deterministic SHA-256 content hash for palette content.
 * Identical content always produces the same hash (Merkle property).
 */
export function computeContentHash(name: string, colors: PaletteColor[]): string {
    const canonical = JSON.stringify({
        name: name.trim().toLowerCase(),
        colors: colors.map((c) => ({
            css: c.css.trim().toLowerCase(),
            position: Math.round(c.position * 1e6) / 1e6,
        })),
    });
    return createHash("sha256").update(canonical).digest("hex");
}

/**
 * Content hash of a single palette atom (a color stop). Canonicalizes the
 * atom's CONTENT — `(css, name)` — but NOT its `position`: position is the
 * atom KEY (its stable identity in the ladder), not part of what the atom IS.
 * A recolor at a fixed slot changes this hash; a re-order does not. The
 * per-atom basis of the WAVE-D atom-diff layer (J.W2).
 */
export function computeAtomHash(atom: PaletteColor): string {
    const canonical = JSON.stringify({
        css: atom.css.trim().toLowerCase(),
        name: (atom.name ?? "").trim().toLowerCase(),
    });
    return createHash("sha256").update(canonical).digest("hex");
}

/**
 * Order-independent set-hash over a palette's per-atom hashes, keyed by
 * position. Two palettes carrying the same atoms in ANY array order produce
 * the same set-hash — the atom-layer dedup fingerprint.
 *
 * Distinct from `computeContentHash`, which folds `name` into the palette
 * identity; the set-hash is the COLORS-ONLY identity. It is emitted on the
 * palette envelope as `atomSetHash` (the dedup hint). (The `/diff` read + the
 * atom-diff algebra that once also consumed it were excised at T.W1 — TA-4.)
 */
export function computeAtomSetHash(atoms: PaletteColor[]): string {
    const entries = atoms
        .map((a) => `${Math.round(a.position * 1e6) / 1e6}:${computeAtomHash(a)}`)
        .sort();
    return createHash("sha256").update(entries.join("|")).digest("hex");
}
