// V.W51 (F5) — the ONE shared canonical spelling + escape + identifier facility.
// Every serializer derives its colour strings and tokens from here; no
// serializer repeats a derivation. Byte authority: Appendix W51 §2/§6.

import type {
    CanonicalNamedColor,
    ExportFormat,
    ExportSnapshot,
    SnapshotSource,
} from "./types";

/**
 * A fixed-point decimal of a non-negative integer numerator over `10^digits`,
 * built by pure integer string-slicing — never `Number.toFixed`, so there is
 * no float rounding, no exponent, no trimmed digit and no negative zero.
 */
function fixedPoint(numerator: number, digits: number): string {
    const denom = 10 ** digits;
    const intPart = Math.floor(numerator / denom);
    const frac = String(numerator % denom).padStart(digits, "0");
    return `${intPart}.${frac}`;
}

/**
 * Appendix §2: the single canonical CSS colour spelling used everywhere —
 * `oklch(<l/1000 fixed 3>% <c/1000000 fixed 6> <h/1000 fixed 3> / <a/1000000 fixed 6>)`.
 */
export function canonicalColor(color: CanonicalNamedColor): string {
    return `oklch(${fixedPoint(color.l, 3)}% ${fixedPoint(color.c, 6)} ${fixedPoint(color.h, 3)} / ${fixedPoint(color.a, 6)})`;
}

/** Appendix §6: one scalar XML-escape pass — exactly five substitutions. */
const XML_ESCAPES: Readonly<Record<string, string>> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};
export function xmlEscape(text: string): string {
    return text.replace(/[&<>"']/g, (ch) => XML_ESCAPES[ch]!);
}

/** Appendix §2: colour `i` (1-based) → `color-001`…`color-050`. */
export function positionalId(oneBasedIndex: number): string {
    return `color-${String(oneBasedIndex).padStart(3, "0")}`;
}

/**
 * Appendix §2: the export identifier prefix — the canonical slug for
 * Workspace/Release and `palette-<full lowercase contentDigest>` for a Device
 * Draft. The prefix already satisfies the token grammar; no slugifier exists.
 */
export function identifierPrefix(snapshot: ExportSnapshot): string {
    const source = snapshot.source;
    if (source.sourceKind === "device-draft") {
        return `palette-${snapshot.contentDigest}`;
    }
    return source.slug;
}

/** Appendix §2: the exact source filename stem (display/colour names never enter it). */
export function filenameStem(source: SnapshotSource): string {
    switch (source.sourceKind) {
        case "device-draft":
            return `palette-draft--${source.deviceDraftId}`;
        case "workspace":
            return `${source.slug}--w${source.workspaceRevision}`;
        case "release":
            return `${source.slug}--r${source.releaseNo}`;
    }
}

const EXTENSIONS: Readonly<Record<ExportFormat, string>> = {
    json: ".json",
    css: ".css",
    tailwind: ".tailwind.json",
    svg: ".svg",
    png: ".png",
};

const MIMES: Readonly<Record<ExportFormat, string>> = {
    json: "application/json;charset=utf-8",
    css: "text/css;charset=utf-8",
    tailwind: "application/json;charset=utf-8",
    svg: "image/svg+xml;charset=utf-8",
    png: "image/png",
};

/** Appendix §2: the client download filename = stem + extension. */
export function filenameFor(snapshot: ExportSnapshot, format: ExportFormat): string {
    return filenameStem(snapshot.source) + EXTENSIONS[format];
}

/** Appendix §2: the exact MIME/extension pairing. */
export function mimeFor(format: ExportFormat): string {
    return MIMES[format];
}
