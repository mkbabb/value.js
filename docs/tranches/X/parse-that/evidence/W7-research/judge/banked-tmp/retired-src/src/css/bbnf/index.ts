// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — `/css`'s parse entries over the BBNF grammar (`src/css/grammar/*.bbnf`). INTERNAL:
// nothing here is re-exported by `src/css/index.ts` — the frozen `/css` surface does not move.
// X.P.W6.h measures these against the shipping parser (`src/css/grammar.ts`); X.P.W6.x swaps them
// in and deletes the hand parser.

import type { CssList, CssScalar, CssValue } from "../../value";
import { failure, success } from "../grammar";
import type { CssColor, CssTimingFunction, KeyframeSelector, ParseResult } from "../types";
import type { ColorNode } from "./color";
import { asColorNode, attachColorActions, keywordColor } from "./color";
import type { Rules } from "./load";
import { compileGrammar, ruleOf, run } from "./load";
import type { Refused, SelectorNode, TimingNode, ValueNode } from "./value";
import { attachValueActions, keyframeSelector } from "./value";

let compiled: Rules | undefined;

/** The grammar, compiled and given its semantic actions once, on first use. */
export function grammar(): Rules {
    if (compiled === undefined) {
        const rules = compileGrammar();
        attachColorActions(rules);
        attachValueActions(rules, keywordColor);
        compiled = rules;
    }
    return compiled;
}

const parseRule = (name: string, source: string) => run<unknown>(ruleOf(grammar(), name), source);
const refusal = <T>(source: string, node: Refused): ParseResult<T> => failure(source, node.code, [node.expected]);

function colorResult(source: string, node: ColorNode): ParseResult<CssColor> {
    switch (node.kind) {
        case "color": return success(node.color);
        case "context": return failure(source, "color_context_required", ["context-free color"]);
        default: return failure(source, "css_syntax", [node.expected]);
    }
}

/** `parseCssColor` — one whole `<color>`. */
export function parseCssColor(source: string): ParseResult<CssColor> {
    const parsed = parseRule("colorTop", source);
    return parsed.ok ? colorResult(source, asColorNode(parsed.value)) : failure(source, "css_syntax", ["color"]);
}

function valueResult<T extends CssValue>(source: string, node: ValueNode): ParseResult<T> {
    return node.kind === "refused" ? refusal(source, node) : success(node as T);
}

/** `parseCssValue` — a component-value list (comma, then slash, then space separated). */
export function parseCssValue(source: string): ParseResult<CssValue> {
    const parsed = parseRule("valueTop", source);
    return parsed.ok ? valueResult(source, parsed.value as ValueNode) : failure(source, "css_syntax", ["scalar"]);
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
    const parsed = parseRule("scalarTop", source);
    return parsed.ok ? valueResult(source, parsed.value as ValueNode) : failure(source, "css_syntax", ["scalar"]);
}

/** `parseKeyframeSelector` — one `<keyframe-selector>`. */
export function parseKeyframeSelector(source: string): ParseResult<KeyframeSelector> {
    const parsed = parseRule("keyframeSelector", source);
    if (!parsed.ok) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
    const node: SelectorNode = keyframeSelector(parsed.value);
    return node.kind === "refused" ? refusal(source, node) : success(node);
}

/** `parseTimingFunction` — one `<easing-function>`. */
export function parseTimingFunction(source: string): ParseResult<CssTimingFunction> {
    const parsed = parseRule("timingFunction", source);
    if (!parsed.ok) return failure(source, "css_syntax", ["timing function"]);
    const node = parsed.value as TimingNode;
    return node.kind === "refused" ? refusal(source, node) : success(node);
}
