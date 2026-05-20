/**
 * usePaletteExport — dispatch-by-format wrapper around the palette export
 * utilities. Extracted from `PaletteDialog.vue` (D.W3 Lane A) to keep the
 * shell focused on layout + emit wiring.
 *
 * Format keys are accepted as `string` for parity with the PaletteCard's
 * `export` emit; unknown formats are silently ignored.
 */
import {
    exportAsJSON,
    exportAsCSSCustomProperties,
    exportAsTailwindConfig,
    exportAsSVG,
    exportAsPNG,
    downloadExport,
} from "@lib/palette/export";
import type { Palette } from "@lib/palette/types";

export function usePaletteExport() {
    async function onExport(palette: Palette, format: string) {
        try {
            switch (format) {
                case "json":
                    downloadExport(exportAsJSON(palette));
                    break;
                case "css":
                    downloadExport(exportAsCSSCustomProperties(palette));
                    break;
                case "tailwind":
                    downloadExport(exportAsTailwindConfig(palette));
                    break;
                case "svg":
                    downloadExport(exportAsSVG(palette));
                    break;
                case "png":
                    downloadExport(await exportAsPNG(palette));
                    break;
            }
        } catch (e) {
            console.warn("Export failed:", e);
        }
    }

    return { onExport };
}
