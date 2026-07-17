// V.W51 (F5) — Tailwind export: data, not executable JavaScript.
// Byte authority: Appendix W51 §5. Emits no CommonJS/ESM function, comment,
// plugin, `require`, `eval` or configuration side effect. Object keys occur
// canonically under RFC 8785; the ordinal makes lexical == semantic order.

import { withTrailingLf, utf8 } from "./bytes";
import { canonicalColor, positionalId } from "./canonical";
import { canonicalizeJson } from "./rfc8785";
import type { ExportSnapshot } from "./types";

export function serializeTailwind(snapshot: ExportSnapshot): Uint8Array {
    const colors: Record<string, string> = {};
    snapshot.orderedNamedColors.forEach((color, i) => {
        colors[positionalId(i + 1)] = canonicalColor(color);
    });
    const value = {
        schema: "value.palette-tailwind/v1",
        contentDigest: snapshot.contentDigest,
        colors,
    };
    return withTrailingLf(utf8(canonicalizeJson(value)));
}
