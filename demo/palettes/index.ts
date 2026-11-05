/**
 * demo/palettes — THE AREA SEAM (X realization V-D5 · BC-PCS-9).
 *
 * Every other area reaches the palettes feature through this module, and
 * eslint refuses a static deep import from outside (`eslint.config.js`,
 * the V-D5 object). It is a seam, not a UI barrel: it names the area's ports,
 * its store, its scene actions, its export port and its domain types — no
 * component. A pane or component SFC is reached by its own path, so its
 * chunk stays lazy (`usePaneRouter`'s `import()` is never restricted).
 *
 * The certified serializers are the sibling seam `demo/palettes/export`.
 */
export {
    ADMIN_PORT_KEY,
    BROWSE_PORT_KEY,
    COLOR_TARGET_PORT_KEY,
    LIBRARY_PORT_KEY,
    SESSION_PORT_KEY,
    providePalettePorts,
} from "./usePalettePorts";
export type {
    AdminPort,
    BrowsePort,
    ColorTargetPort,
    LibraryPort,
    PalettePorts,
    PalettePortsDeps,
    SessionPort,
} from "./usePalettePorts";
export { usePaletteStore } from "./usePaletteStore";
export { paletteSceneActions } from "./sceneActions";
export { usePaletteExport } from "./export/usePaletteExport";
export type { ExportOutcome } from "./export/usePaletteExport";
export type { Palette, PaletteColor } from "./types";
