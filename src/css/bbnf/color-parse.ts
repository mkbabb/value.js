// SERVED MODEL: claude-opus-5-5
//
// X-W12U `.g2s` — `parseCssColor` over the `<color>`-rooted parser: `color.bbnf` compiled alone
// (`./generated/color.js`, entry `colorTop`) and bound to its action table (`./color-actions`) once, at
// module load. The one `parseCssColor`: `@mkbabb/value.js/css` re-exports it (`./index`) and
// `@mkbabb/value.js/color` publishes it, so a colour parse carries the colour grammar and no more.

import type { CssColor, ParseResult } from "../types";
import { failure, notText, success } from "../result";
import type { ColorNode } from "./color";
import { asColorNode } from "./color";
import { actions } from "./color-actions";
import { createParser, FAIL } from "./generated/color";
import type { Numeric } from "./math";

const { colorTop } = createParser(actions).entries;

function colorResult(source: string, node: ColorNode): ParseResult<CssColor> {
    switch (node.kind) {
        case "color": return success(node.color);
        case "context": return failure(source, "color_context_required", ["context-free color"]);
        default: return failure(source, "css_syntax", [node.expected]);
    }
}

/** `parseCssColor` — one whole `<color>`. */
export function parseCssColor(source: string): ParseResult<CssColor> {
    if (typeof source !== "string") return notText();
    const node = colorTop(source);
    return node === FAIL ? failure(source, "css_syntax", ["color"]) : colorResult(source, asColorNode(node as ColorNode | Numeric));
}
