// SERVED MODEL: claude-opus-5-5
//
// route engine-fusion COPY of value.js src/css/bbnf/index.ts (only grammar() differs: actions recorded, then seal).
// X.P.W6.b — `/css`'s parse entries over the BBNF grammar (`src/css/grammar/*.bbnf`).
// X.P.W6.x swapped them in: `src/css/index.ts` re-exports the six entries from here under the
// frozen `/css` names, and the hand-rolled `src/css/grammar.ts` is deleted. `splitTopLevel` is the
// stylesheet layer's list reader (`stylesheet.bbnf`), internal to `src/css/`.

import type { CssList, CssScalar, CssValue } from "/Users/mkbabb/Programming/value.js/src/css/../value";
import { failure, success } from "/Users/mkbabb/Programming/value.js/src/css/result";
import type { CssColor, CssTimingFunction, KeyframeSelector, ParseResult } from "/Users/mkbabb/Programming/value.js/src/css/types";
import type { ColorNode } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/color";
import { asColorNode, attachColorActions, keywordColor } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/color";
import type { Rules } from "./load";
import { compileGrammar, ruleOf, run } from "./load";
import { attachStylesheetActions } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/stylesheet";
import type { Refused, SelectorNode, TimingNode, ValueNode } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/value";
import { attachValueActions, keyframeSelector } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/value";

let compiled: Rules | undefined;

/** Every rule the three attach functions give an action — read by running them on a recorder. */
function actionBearing(): Map<string, { fn: unknown; kind: string; count: number }> {
    const actions = new Map<string, { fn: unknown; kind: string; count: number }>();
    const stub = (): any => ({ map: (fn: unknown) => ({ fn, kind: "map" }), mapState: (fn: unknown) => ({ fn, kind: "mapState" }) });
    const recorder = new Proxy({} as Rules, {
        get: () => stub(),
        set: (_t, name, v: any) => {
            const prev = actions.get(String(name));
            actions.set(String(name), { fn: v?.fn, kind: v?.kind ?? "other", count: (prev?.count ?? 0) + 1 });
            return true;
        },
    });
    attachColorActions(recorder);
    attachValueActions(recorder, keywordColor);
    attachStylesheetActions(recorder);
    return actions;
}

/** The grammar, compiled and given its semantic actions once, on first use, then sealed. */
export function grammar(): Rules {
    if (compiled === undefined) {
        const compilation = compileGrammar(actionBearing());
        const rules = compilation.rules;
        attachColorActions(rules);
        attachValueActions(rules, keywordColor);
        attachStylesheetActions(rules);
        compilation.seal();
        (globalThis as any).__fusion = { stats: compilation.stats, collapsedRules: compilation.collapsedRules, memoRules: compilation.memoRules };
        compiled = rules;
    }
    return compiled;
}

const parseRule = (name: string, source: string) => run<unknown>(ruleOf(grammar(), name), source);
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

const LISTS = { ",": "commaItems", ";": "semiItems", space: "spaceItems" } as const;

/**
 * A top-level list's items, trimmed, empty items dropped — split at `separator` only outside a
 * `()` block or a string. `null` when the text is not a well-formed list (an unclosed block or
 * string): the caller answers that with its own diagnostic.
 */
export function splitTopLevel(source: string, separator: keyof typeof LISTS): readonly string[] | null {
    const parsed = run<readonly string[]>(ruleOf(grammar(), LISTS[separator]), source);
    return parsed.ok ? parsed.value : null;
}
