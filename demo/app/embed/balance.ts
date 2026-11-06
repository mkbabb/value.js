/**
 * The swatch row's balance: as few rows as the width allows, and the swatches
 * shared evenly between them, so no swatch is ever left alone on a row (eight
 * that fit seven to a row sit four and four, not seven and one).
 */
export function balancedColumns(count: number, width: number, cell: number, gap: number): number {
    if (count <= 0 || cell <= 0) return Math.max(count, 1);
    const fit = Math.max(1, Math.floor((width + gap) / (cell + gap)));
    const rows = Math.ceil(count / fit);
    return Math.ceil(count / rows);
}
