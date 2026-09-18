// V.W51 (F5) — JSON export. Byte authority: Appendix W51 §3.
// No policy, owner, session, mutable count, alternate float or private
// provenance enters the file. `source` is copied without renaming `sourceKind`;
// `canonicalTags` is copied byte-for-byte at the value level (no label lookup).

import { withTrailingLf, utf8 } from "./bytes";
import { canonicalColor, positionalId } from "./canonical";
import { canonicalizeJson } from "./rfc8785";
import type { ExportSnapshot } from "./types";

export function serializeJson(snapshot: ExportSnapshot): Uint8Array {
    const value = {
        schema: "value.palette-export/v1",
        source: snapshot.source,
        displayName: snapshot.displayName,
        contentDigest: snapshot.contentDigest,
        colors: snapshot.orderedNamedColors.map((color, i) => ({
            id: positionalId(i + 1),
            name: color.name,
            oklch: { l: color.l, c: color.c, h: color.h, a: color.a },
            css: canonicalColor(color),
        })),
        canonicalTags: snapshot.canonicalTags.map((tag) => ({
            tagId: tag.tagId,
            label: tag.label,
        })),
    };
    return withTrailingLf(utf8(canonicalizeJson(value)));
}
