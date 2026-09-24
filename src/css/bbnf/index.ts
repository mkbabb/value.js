// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — `/css`'s parse entries over the BBNF grammar (`src/css/grammar/*.bbnf`).
// X.P.W6.x swapped them in: `src/css/index.ts` re-exports the six entries from here under the
// frozen `/css` names, and the hand-rolled `src/css/grammar.ts` is deleted. `splitTopLevel` is the
// stylesheet layer's list reader (`stylesheet.bbnf`), internal to `src/css/`.

import type { CssList, CssScalar, CssValue } from "../../value";
import { failure, success } from "../result";
import type { CssColor, CssTimingFunction, KeyframeSelector, ParseResult } from "../types";
import type { ColorNode } from "./color";
import { asColorNode } from "./color";
import { FAIL, parser } from "./load";
import type { Numeric } from "./math";
import type { Refused, SelectorNode, TimingNode, ValueNode } from "./value";
import { keyframeSelector } from "./value";

const { entries } = parser;

const refusal = <T>(source: string, node: Refused): ParseResult<T> =>
    node.span === undefined
        ? failure(source, node.code, [node.expected])
        : failure(source, node.code, [node.expected], node.span.start, node.span.end);

function colorResult(source: string, node: ColorNode): ParseResult<CssColor> {
    switch (node.kind) {
        case "color": return success(node.color);
        case "context": return failure(source, "color_context_required", ["context-free color"]);
        default: return failure(source, "css_syntax", [node.expected]);
    }
}

/** `parseCssColor` — one whole `<color>`. */
export function parseCssColor(source: string): ParseResult<CssColor> {
    const node = entries.colorTop(source);
    return node === FAIL ? failure(source, "css_syntax", ["color"]) : colorResult(source, asColorNode(node as ColorNode | Numeric));
}

function valueResult<T extends CssValue>(source: string, node: ValueNode): ParseResult<T> {
    return node.kind === "refused" ? refusal(source, node) : success(node as T);
}

/** `parseCssValue` — a component-value list (comma, then slash, then space separated). */
export function parseCssValue(source: string): ParseResult<CssValue> {
    const node = entries.valueTop(source);
    return node === FAIL ? failure(source, "css_syntax", ["scalar"]) : valueResult(source, node as ValueNode);
}

/** `parseCssValues` — `parseCssValue`, always as a list (one item → a one-item space list). */
export function parseCssValues(source: string): ParseResult<CssList> {
    const parsed = parseCssValue(source);
    if (!parsed.ok) return parsed;
    return parsed.value.kind === "list"
        ? success(parsed.value)
        : success({ kind: "list", separator: "space", items: [parsed.value] });
}

/** `parseCssScalar` — one scalar: a colour, a number with its unit, a string, an operator or a keyword. */
export function parseCssScalar(source: string): ParseResult<CssScalar> {
    const node = entries.scalarTop(source);
    return node === FAIL ? failure(source, "css_syntax", ["scalar"]) : valueResult(source, node as ValueNode);
}

/** `parseKeyframeSelector` — one `<keyframe-selector>`. */
export function parseKeyframeSelector(source: string): ParseResult<KeyframeSelector> {
    const parsed = entries.keyframeSelector(source);
    if (parsed === FAIL) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
    const node: SelectorNode = keyframeSelector(parsed);
    return node.kind === "refused" ? refusal(source, node) : success(node);
}

/** `parseTimingFunction` — one `<easing-function>`. */
export function parseTimingFunction(source: string): ParseResult<CssTimingFunction> {
    const parsed = entries.timingFunction(source);
    if (parsed === FAIL) return failure(source, "css_syntax", ["timing function"]);
    const node = parsed as TimingNode;
    return node.kind === "refused" ? refusal(source, node) : success(node);
}

const LISTS = { ",": "commaItems", ";": "semiItems", space: "spaceItems" } as const;

/**
 * A top-level list's items, trimmed, empty items dropped — split at `separator` only outside a
 * `()` block or a string. `null` when the text is not a well-formed list (an unclosed block or
 * string): the caller answers that with its own diagnostic.
 */
export function splitTopLevel(source: string, separator: keyof typeof LISTS): readonly string[] | null {
    const items = entries[LISTS[separator]](source);
    return items === FAIL ? null : (items as readonly string[]);
}
