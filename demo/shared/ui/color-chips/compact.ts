/**
 * color-chips/compact — THE ONE TRUNCATION POLICY of a compact palette render
 * (X realization V-D3 · BC-PCS-10).
 *
 * A compact render shows a palette in less room than its colours need. Five
 * renders did that with five policies (a silent `slice(0, 5)`, a cap of 7 with
 * a faded tail, an unbounded wrap, …), so the same palette read as different
 * palettes on one screen. One law now: the render holds `capacity` swatches;
 * a palette that fits shows every colour, and one that does not shows
 * `capacity − 1` swatches and a `+k` count in the last seat, so the count of
 * what is drawn plus `k` is always the palette's own count. A `+1` is never
 * shown: the seat the count would take holds the colour itself.
 *
 * The capacity comes from the render's own container (`cqi / swatch`): the
 * inline size the swatches get, the swatch's inline size and the step from one
 * swatch's start to the next (size + gap, or size − overlap).
 */

/** How many swatches fit: `size` + every further `step` inside `inline`. */
export function compactCapacity(inline: number, size: number, step: number): number {
    if (!(inline > 0) || !(size > 0) || !(step > 0)) return Number.POSITIVE_INFINITY;
    return Math.max(1, Math.floor((inline - size) / step + 1e-6) + 1);
}

/** The window a compact render draws: `shown` colours and `more` behind `+k`. */
export function compactWindow(count: number, capacity: number): { shown: number; more: number } {
    const n = Math.max(0, Math.floor(count));
    if (n <= capacity) return { shown: n, more: 0 };
    const shown = Math.max(0, Math.floor(capacity) - 1);
    return { shown, more: n - shown };
}
