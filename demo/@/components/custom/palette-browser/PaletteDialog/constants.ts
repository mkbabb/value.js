/**
 * PaletteDialog/constants — dialog-local constants.
 *
 * Re-exports the shared CURRENT_PALETTE_ID for in-dialog import-path locality.
 * The canonical source lives at `@lib/palette/constants` (cross-cutting:
 * used by usePaletteActions + useSwatchActions + the dialog itself).
 */
export { CURRENT_PALETTE_ID } from "@lib/palette/constants";
