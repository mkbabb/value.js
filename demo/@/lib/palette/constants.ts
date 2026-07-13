/**
 * Sentinel palette id for the "current working palette" — the in-memory edit
 * buffer that backs the swatch grid above the saved-palettes list.
 *
 * D.W3 Lane A: extracted from the `"__current__"` magic string previously
 * inlined in `PaletteDialog.vue:403`, `useSwatchActions.ts:25,78`, and
 * `usePaletteActions.ts:78`.
 */
export const CURRENT_PALETTE_ID = "__current__";

/**
 * localStorage key for the persisted color-picker state projection
 * (`{ inputColor, savedColors }` — a parseable-string projection, not the live
 * unit graph).
 *
 * U-F48: single-sourced here so the boot hydrator
 * (`color-picker/composables/boot/hydrate.ts`) and the shared persistence
 * collaborator (`composables/color/useColorPersistence.ts`) key the SAME
 * literal — a change to one can no longer silently diverge the persistence
 * contract (the former dual-definition trap).
 */
export const COLOR_STORE_KEY = "color-picker";
