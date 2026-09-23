import type { Palette } from "./types";
import {
    captureSnapshot,
    downloadFile,
    exportFile,
    type ExportFormat,
} from "./export/serializers";

const FORMATS: ReadonlySet<string> = new Set<ExportFormat>(["json", "css", "tailwind", "svg", "png"]);

function isExportFormat(format: string): format is ExportFormat {
    return FORMATS.has(format);
}

/** One export attempt's visible result. */
export type ExportOutcome =
    | { readonly ok: true; readonly filename: string }
    | { readonly ok: false; readonly message: string };

/**
 * X.W7.b — the shipping export path: capture the palette into one immutable
 * `ExportSnapshot`, serialize it with the certified W51 serializers, download
 * the exact bytes. A capture refusal, the PNG serializer's terminal contract
 * failure and an unknown format each resolve to a typed `ExportOutcome`.
 */
export function usePaletteExport() {
    async function onExport(palette: Palette, format: string): Promise<ExportOutcome> {
        if (!isExportFormat(format)) {
            return { ok: false, message: `Unknown export format "${format}".` };
        }
        const captured = await captureSnapshot(palette);
        if (!captured.ok) return { ok: false, message: captured.message };
        const result = exportFile(captured.snapshot, format);
        if (!result.ok) {
            return { ok: false, message: `The ${format.toUpperCase()} file could not be produced.` };
        }
        downloadFile(result.file);
        return { ok: true, filename: result.file.filename };
    }

    return { onExport };
}
