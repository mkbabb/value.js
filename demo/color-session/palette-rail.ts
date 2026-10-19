/**
 * THE PALETTE RAIL — a discrete palette painted as discrete bands
 * (X.W7.z2 · EC-10, fold W7.543).
 *
 * A quantizer or a generator returns N colours, not a continuum. The two
 * slider rails that carry a palette (extract's k rail, generate's count rail)
 * used to spread N soft stops at `i/(n-1)` and let the browser interpolate
 * between them, so most rail pixels were colours the palette never contained,
 * while the specimen strip beside it rendered the same data as crisp bands.
 * Here each colour owns an equal band `[i/n, (i+1)/n]` with two-position
 * (hard) stops: every painted pixel is a returned colour.
 *
 * The EMPTY arm is deliberately not here. The two consumers answer "no
 * palette" differently and must stay different: extract returns `null` (the
 * rail shows only its certified track ink, EC-25), generate paints
 * `var(--muted)` (a colour the capsule actually shows).
 */

/** One band's edge as a CSS percentage, exact to 4 decimals. */
function edge(i: number, n: number): string {
    return `${Number(((i / n) * 100).toFixed(4))}%`;
}

/** A hard-stop `linear-gradient`: one equal band per colour. `colors` must be non-empty. */
export function paletteRail(colors: readonly string[]): string {
    const n = colors.length;
    const bands = colors.map((css, i) => `${css} ${edge(i, n)} ${edge(i + 1, n)}`);
    return `linear-gradient(to right, ${bands.join(", ")})`;
}
