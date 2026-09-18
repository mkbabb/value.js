// V.W51 (F5) — the export serializer barrel. Byte authority:
// docs/tranches/V/PALETTE-CONTRACT.md Appendix W51.
//
// The five byte-exact serializers over one immutable `ExportSnapshot`, plus the
// shared canonical facility, the domain-separated digests and the pure
// reload-identity core. This module is intentionally NOT named `index.ts`: the
// sibling legacy `../export.ts` (the pre-contract routed seat that W50 will
// replace) still resolves `./export`; the byte-exact set is addressed by its
// explicit paths here so the two never collide.

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
export type { ReloadResult } from "./reload";
