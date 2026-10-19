// V.W51 (F5) — the export serializer barrel. Byte authority:
// docs/tranches/V/PALETTE-CONTRACT.md Appendix W51.
//
// The five byte-exact serializers over one immutable `ExportSnapshot`, plus the
// shared canonical facility, the domain-separated digests and the pure
// reload-identity core. X.W7.b made this the SHIPPING path: the legacy
// `../export.ts` seat is deleted, and `usePaletteExport` reaches capture →
// serialize → download through this barrel alone. (Still not named `index.ts`:
// the explicit path is the addressed surface.)

export type {
    CanonicalNamedColor,
    ExportFormat,
    ExportSnapshot,
    ExportTag,
    SnapshotSource,
} from "./types";

export { serializeJson } from "./json";
export { serializeCss } from "./css";
export { serializeTailwind } from "./tailwind";
export { serializeSvg } from "./svg";
export { serializePng } from "./png";
export type { PngResult } from "./png";

export {
    canonicalColor,
    filenameFor,
    filenameStem,
    identifierPrefix,
    mimeFor,
    positionalId,
    xmlEscape,
} from "./canonical";

export {
    computeContentDigest,
    computeSnapshotDigest,
    contentBytes,
    sha256Hex,
    snapshotBytes,
} from "./digest";

export { canonicalizeJson } from "./rfc8785";
export { utf8, withTrailingLf } from "./bytes";
export { reloadSnapshot } from "./reload";
export { captureSnapshot } from "./capture";
export type { CaptureFailureCode, CaptureResult } from "./capture";
export { exportFile } from "./file";
export type { ExportFile, ExportFileResult } from "./file";
export { downloadFile } from "./download";
export type { ReloadResult } from "./reload";
