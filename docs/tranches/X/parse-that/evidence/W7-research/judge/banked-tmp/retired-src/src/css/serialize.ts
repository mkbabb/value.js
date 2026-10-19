/**
 * `serializeCssValue` — the canonical inverse of `parseCssValue`.
 *
 * Published on `./css` at X-W9.d (G15): keyframes.js re-implemented it at
 * `src/animation/compile/emit/css-text.ts` because the library withheld it,
 * and the two copies diverged. It joins the `Result` idiom BEFORE it is
 * exported: a `CssValue` can carry a colour in a space CSS cannot spell
 * (`hsv`, `kelvin`, `ictcp`, `jzazbz` — `AnyColor` is wider than `CssColor`),
 * and a public entry may not answer that with a thrown `TypeError`.
 *
 * `ParseResult` (text -> AST) and `Result` (value -> value) stay declared per
 * boundary and are never unified (PSL-3): this is a value -> value transform,
 * so it answers in `Result`, and it carries `serializeCssColor`'s own
 * `ColorIssue` rather than inventing a second error vocabulary.
 *
 * A pure leaf: it imports no split sibling, and both `./rules` and
 * `./stylesheet` are free to import it.
 */
import type { ColorIssue } from "../color/index";
import type { Result } from "../foundation/result";
import { ok } from "../foundation/result";
import type { CssValue } from "../value";
import { serializeCssColor } from "./grammar";
import type { CssColor } from "./types";

export function serializeCssValue(value: CssValue): Result<string, ColorIssue> {
    if (value.kind === "scalar") {
        const payload = value.payload;
        if (payload.type === "number") return ok(`${payload.value}${payload.unit}`);
        if (payload.type === "keyword") return ok(payload.value);
        return serializeCssColor(payload.value as CssColor);
    }
    const items = value.kind === "call" ? value.args : value.items;
    const parts: string[] = [];
    for (const item of items) {
        const part = serializeCssValue(item);
        if (!part.ok) return part;
        parts.push(part.value);
    }
    if (value.kind === "call") return ok(`${value.name}(${parts.join(", ")})`);
    const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
    const joined = parts.join(separator);
    // A space-separated list is how `if(supports(color: red): red; else: blue)`
    // parses — `:` and `;` arrive as their own keyword tokens, and a plain
    // space join would emit `color : red` and lose the source. This is the ONE
    // place the two serializers disagree (G15): keyframes' fork has no such
    // step, so it mangles every `if()` condition it is handed. Measured, with
    // the witness, in `evidence/W9/serialize-differential.txt`.
    return ok(value.separator === "space" ? joined.replace(/\s+([:;])/g, "$1") : joined);
}
