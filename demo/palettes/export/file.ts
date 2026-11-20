// X.W7.b — the ONE format dispatch over the certified serializers: a captured
// snapshot + a format → the exact download bytes, filename and MIME
// (Appendix W51 §2), or the PNG serializer's typed terminal failure. The
// switch is exhaustive over `ExportFormat`; there is no default arm to fall
// through, and the download's name is decided here, once (`downloadName`).

import { filenameFor, filenameStem, mimeFor } from "./canonical";
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

/** Export options the serializers read (V-D5 · BC-PCS-31: the SVG strip's direction). */
export interface ExportFileOptions {
    readonly direction?: "ltr" | "rtl";
}

function bytesFor(snapshot: ExportSnapshot, format: ExportFormat, options: ExportFileOptions): Uint8Array | null {
    switch (format) {
        case "json":
            return serializeJson(snapshot);
        case "css":
            return serializeCss(snapshot);
        case "tailwind":
            return serializeTailwind(snapshot);
        case "svg":
            return serializeSvg(snapshot, options.direction ? { direction: options.direction } : {});
        case "png": {
            const png = serializePng(snapshot);
            return png.ok ? png.bytes : null;
        }
    }
}

/**
 * color-40 O-6 (his FORTIETH order's Extract): a palette that lives on this
 * device downloads under its own name. The canonical stem of a draft is its
 * device id, so Extract's result downloaded as `palette-draft--__extracted__`
 * and the card's verdict echoed that id. A published or workspace palette keeps
 * its canonical slug-and-revision stem, which already names it.
 *
 * The stem is the name's letters and numbers (any script), lowercased, every
 * other run (spaces, punctuation, the characters a file system refuses) one
 * hyphen. A name with nothing left is "palette".
 */
export function nameStem(name: string): string {
    const stem = name
        .normalize("NFC")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
        .replace(/^-+|-+$/g, "");
    return stem || "palette";
}

export function downloadName(snapshot: ExportSnapshot, format: ExportFormat): string {
    const canonical = filenameFor(snapshot, format);
    if (snapshot.source.sourceKind !== "device-draft") return canonical;
    const extension = canonical.slice(filenameStem(snapshot.source).length);
    return nameStem(snapshot.displayName) + extension;
}

export function exportFile(
    snapshot: ExportSnapshot,
    format: ExportFormat,
    options: ExportFileOptions = {},
): ExportFileResult {
    const bytes = bytesFor(snapshot, format, options);
    if (bytes === null) return { ok: false, failureCode: "serializer_contract" };
    return {
        ok: true,
        file: { bytes, filename: downloadName(snapshot, format), mime: mimeFor(format) },
    };
}
