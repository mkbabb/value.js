/**
 * Sentinel palette id for the "current working palette" — the in-memory edit
 * buffer that backs the swatch grid above the saved-palettes list.
 *
 * D.W3 Lane A: extracted from the `"__current__"` magic string previously
 * inlined in `PaletteDialog.vue:403`, `useSwatchActions.ts:25,78`, and
 * `usePaletteActions.ts:78`.
 */
export const CURRENT_PALETTE_ID = "__current__";
