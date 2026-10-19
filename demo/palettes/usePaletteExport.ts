import { shallowRef } from "vue";

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
 * the exact bytes. Every failure — a capture refusal, the PNG serializer's
 * terminal contract failure, an unknown format, or a thrown platform error —
 * resolves to a user-facing `ExportOutcome` and is held in `failure` for the
 * host to render (W7-failure-dispositions.md: SURFACE). Nothing is swallowed.
 */
export function usePaletteExport() {
    const failure = shallowRef<{ readonly palette: Palette; readonly message: string } | null>(null);

    function settle(palette: Palette, outcome: ExportOutcome): ExportOutcome {
        failure.value = outcome.ok ? null : { palette, message: outcome.message };
        return outcome;
    }

    async function run(palette: Palette, format: string): Promise<ExportOutcome> {
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

    async function onExport(palette: Palette, format: string): Promise<ExportOutcome> {
        let outcome: ExportOutcome;
        try {
            outcome = await run(palette, format);
        } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);
            outcome = { ok: false, message: `Export failed: ${reason}` };
        }
        return settle(palette, outcome);
    }

    return { onExport, failure };
}
