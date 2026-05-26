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
