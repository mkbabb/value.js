/**
 * Internal OKLab conversion helper (D.W2 Lane A — extracted from
 * `routes/palettes.ts` L48-104; Lane D W4 — fail-explicit refactor).
 *
 * Server-side OKLab computation for the color-distance search filter.
 * `oklabColors` is denormalized onto each palette doc; Mongo can't run a
 * JS-level color parser, so this server-side helper pre-computes the triples
 * written to the palettes collection.
 *
 * Scope: hex (#rrggbb, #rgb) and rgb()/rgba(). Anything else (hsl, oklch,
 * color(), named colors) is REJECTED at the validation boundary via a
 * thrown `ValidationError` — the previous behavior silently dropped
 * unrecognised formats from the index, leaving the at-rest data inconsistent
 * with the displayed palette (D-HARDEN-3 §3 W4).
 *
 * The library publishes a full CSS color parser at `@mkbabb/value.js`'s
 * `parseCSSColor` surface; the api intentionally does NOT import it here
 * (api/ is a standalone package, not a workspace member). When the api
 * is migrated to consume value.js the inline implementation below should
 * be replaced wholesale with a `parseCSSColor → convert(oklab)` pipeline.
 */

import { ValidationError } from "../../errors/index.js";
import type { PaletteColor, OklabTriple } from "../../models.js";

const linearize = (c: number): number =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

/**
 * Convert a CSS color string to OKLab. Throws `ValidationError` on
 * unrecognised / malformed input.
 */
export function cssToOklab(css: string): OklabTriple {
    let r = 0;
    let g = 0;
    let b = 0;
    const s = css.trim().toLowerCase();

    const hexMatch = s.match(/^#([0-9a-f]{3,8})$/);
    if (hexMatch) {
        const h = hexMatch[1];
        if (h.length === 3) {
            r = parseInt(h[0] + h[0], 16) / 255;
            g = parseInt(h[1] + h[1], 16) / 255;
            b = parseInt(h[2] + h[2], 16) / 255;
        } else if (h.length === 6 || h.length === 8) {
            r = parseInt(h.slice(0, 2), 16) / 255;
            g = parseInt(h.slice(2, 4), 16) / 255;
            b = parseInt(h.slice(4, 6), 16) / 255;
        } else {
            throw new ValidationError(
                `Unsupported hex color: ${css} (must be #rgb, #rrggbb, or #rrggbbaa)`,
            );
        }
    } else {
        const rgbMatch = s.match(/^rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/);
        if (rgbMatch) {
            r = parseInt(rgbMatch[1]) / 255;
            g = parseInt(rgbMatch[2]) / 255;
            b = parseInt(rgbMatch[3]) / 255;
        } else {
            throw new ValidationError(
                `Unsupported color format: ${css} (the API accepts hex (#rgb/#rrggbb) and rgb()/rgba() only)`,
            );
        }
    }

    const lr = linearize(r);
    const lg = linearize(g);
    const lb = linearize(b);

    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    };
}

export function computeOklabColors(colors: PaletteColor[]): OklabTriple[] {
    return colors.map((c) => cssToOklab(c.css));
}
