import type { Palette } from "@lib/palette/types";
import {
    exportAsJSON,
    exportAsCSSCustomProperties,
    exportAsTailwindConfig,
    exportAsSVG,
    exportAsPNG,
    downloadExport,
} from "@lib/palette/export";

export function usePaletteExport() {
    async function onExport(palette: Palette, format: string) {
        try {
            switch (format) {
                case "json": downloadExport(exportAsJSON(palette)); break;
                case "css": downloadExport(exportAsCSSCustomProperties(palette)); break;
                case "tailwind": downloadExport(exportAsTailwindConfig(palette)); break;
                case "svg": downloadExport(exportAsSVG(palette)); break;
                case "png": downloadExport(await exportAsPNG(palette)); break;
            }
        } catch (e) {
            console.warn("Export failed:", e);
        }
    }

    return { onExport };
}
