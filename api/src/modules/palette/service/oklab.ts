/**
 * Server-side OKLab index for the colour-distance search filter.
 *
 * `oklabColors` is denormalized onto each palette doc (Mongo can't run a
 * JS-level colour parser), so every write computes one OKLab triple per stop.
 *
 * VALIDATION LIVES IN ONE PLACE — value.js's own colour parser. A stop is
 * accepted iff `parseCssColor` (`@mkbabb/value.js/css`) parses it: hex, named
 * colours, rgb()/hsl()/hwb(), lab()/lch(), oklab()/oklch() and every
 * `color(<space> …)` the library reads (display-p3, rec2020, …). Anything it
 * refuses is REJECTED at the validation boundary with a `ValidationError`
 * (D-HARDEN-3 §3 W4: never silently drop a stop from the index). The stored
 * `css` is untouched — it stays the author's text; the triple here is derived
 * from it, never a rewrite of it. (Owner 2026-10-19: the prior hex/rgb()-only
 * regex refused the P3 Daraksha `oklch(73% 0.185 2)` at publish.)
 */

import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import { ValidationError } from "../../../platform/http/errors/index.js";
import type { PaletteColor, OklabTriple } from "../model.js";

/** CSS Color 4 §4.4: a `none` component converts as zero. */
const channel = (c: number | "none"): number => (c === "none" ? 0 : c);

/**
 * Convert a CSS colour string to OKLab. Throws `ValidationError` on any
 * input value.js's parser refuses.
 */
export function cssToOklab(css: string): OklabTriple {
    const parsed = parseCssColor(css.trim());
    if (!parsed.ok) {
        const [issue] = parsed.diagnostics;
        throw new ValidationError(
            `Unsupported color: ${css} (${issue.code}; the API accepts any CSS <color> value.js parses)`,
        );
    }
    const converted = convertColor(parsed.value, "oklab");
    if (!converted.ok) {
        throw new ValidationError(`Unsupported color: ${css} (not convertible to OKLab)`);
    }
    const [L, a, b] = converted.value.channels.map(channel) as [number, number, number];
    if (![L, a, b].every(Number.isFinite)) {
        throw new ValidationError(`Unsupported color: ${css} (non-finite OKLab coordinates)`);
    }
    return { L, a, b };
}

export function computeOklabColors(colors: PaletteColor[]): OklabTriple[] {
    return colors.map((c) => cssToOklab(c.css));
}
