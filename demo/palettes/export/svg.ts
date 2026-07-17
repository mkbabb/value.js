// V.W51 (F5) — SVG: a font-free swatch strip with exact logical geometry.
// Byte authority: Appendix W51 §6. No XML declaration, no text rendering, font,
// external reference, CSS, metadata, script, event attribute, animation, filter,
// image, foreignObject or embedded data URL. Empty elements end `/>`; every
// line (including `</svg>`) ends in one LF — no blank lines/tabs/trailing
// spaces/CR. Attribute and element order are exactly as constructed.

import { utf8 } from "./bytes";
import { canonicalColor, xmlEscape } from "./canonical";
import type { ExportSnapshot } from "./types";

export function serializeSvg(snapshot: ExportSnapshot): Uint8Array {
    const n = snapshot.orderedNamedColors.length;
    let out =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} 1" width="1200" height="240" role="img" aria-labelledby="title desc" shape-rendering="crispEdges">\n` +
        `  <title id="title">${xmlEscape(snapshot.displayName)}</title>\n` +
        `  <desc id="desc">${n}-color palette</desc>\n`;
    snapshot.orderedNamedColors.forEach((color, i) => {
        out += `  <rect x="${i}" y="0" width="1" height="1" fill="${xmlEscape(canonicalColor(color))}"/>\n`;
    });
    out += "</svg>\n";
    return utf8(out);
}
