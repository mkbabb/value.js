/**
 * demo/palettes/export — the certified serializer seam (X realization V-D5).
 *
 * The W51 byte-exact serializer leaf. It imports no palettes feature module
 * and no UI port, so a lower layer (the colour session's caption format) may
 * read `canonicalColor` here without pulling the area's ports graph. The UI
 * port over these serializers, `usePaletteExport`, is the area seam's
 * (`demo/palettes`), never this leaf's.
 */
export { canonicalColor } from "./canonical";
