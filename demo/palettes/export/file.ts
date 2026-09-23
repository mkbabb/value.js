// X.W7.b — the ONE format dispatch over the certified serializers: a captured
// snapshot + a format → the exact download bytes, filename and MIME
// (Appendix W51 §2), or the PNG serializer's typed terminal failure. The
// switch is exhaustive over `ExportFormat`; there is no default arm to fall
// through and no second spelling of any filename.

import { filenameFor, mimeFor } from "./canonical";
import { serializeCss } from "./css";
import { serializeJson } from "./json";
import { serializePng } from "./png";
import { serializeSvg } from "./svg";
import { serializeTailwind } from "./tailwind";
import type { ExportFormat, ExportSnapshot } from "./types";

export interface ExportFile {
    readonly bytes: Uint8Array;
    readonly filename: string;
    readonly mime: string;
}

export type ExportFileResult =
    | { readonly ok: true; readonly file: ExportFile }
    | { readonly ok: false; readonly failureCode: "serializer_contract" };

function bytesFor(snapshot: ExportSnapshot, format: ExportFormat): Uint8Array | null {
    switch (format) {
        case "json":
            return serializeJson(snapshot);
        case "css":
            return serializeCss(snapshot);
        case "tailwind":
            return serializeTailwind(snapshot);
        case "svg":
            return serializeSvg(snapshot);
        case "png": {
            const png = serializePng(snapshot);
            return png.ok ? png.bytes : null;
        }
    }
}

export function exportFile(snapshot: ExportSnapshot, format: ExportFormat): ExportFileResult {
    const bytes = bytesFor(snapshot, format);
    if (bytes === null) return { ok: false, failureCode: "serializer_contract" };
    return {
        ok: true,
        file: { bytes, filename: filenameFor(snapshot, format), mime: mimeFor(format) },
    };
}
