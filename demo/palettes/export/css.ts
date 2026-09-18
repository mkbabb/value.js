// V.W51 (F5) — CSS custom-properties export. Byte authority: Appendix W51 §4.
// One two-space-indented declaration per colour in order; no comment/name
// interpolation, no minified/pretty dual mode, no slugifier or CSS.escape branch.

import { utf8 } from "./bytes";
import { canonicalColor, identifierPrefix, positionalId } from "./canonical";
import type { ExportSnapshot } from "./types";

export function serializeCss(snapshot: ExportSnapshot): Uint8Array {
    const prefix = identifierPrefix(snapshot);
    let out = ":root {\n";
    snapshot.orderedNamedColors.forEach((color, i) => {
        out += `  --${prefix}-${positionalId(i + 1)}: ${canonicalColor(color)};\n`;
    });
    out += "}\n";
    return utf8(out);
}
