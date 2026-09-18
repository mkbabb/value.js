import {
    Parser,
    all,
    any,
    regex,
    string,
    whitespace,
} from "@mkbabb/parse-that";
import { memoize } from "../../utils";
import { ValueArray, ValueUnit } from "../../units";
import { CSSValues } from "../index";
import { CSSValueUnit } from "../units";
import * as utils from "../utils";

// ─── Public AST types ─────────────────────────────────────────────────────
//
// The parser's output-shape contract lives in the leaf `stylesheet-types.ts`
// (W1-8 · god-module-dry-census): the `extract.ts` / `serialize.ts` /
// `scroll-timeline.ts` siblings consume ONLY these types, never the parser
// combinators, so the AST contract is a separable surface. Imported here for
// the parsers' own annotations AND re-exported verbatim so the `./stylesheet`
// import surface (e.g. the `subpaths/parsing.ts` barrel) is byte-identical.
import type {
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    PropertyDescriptor,
    ScrollTimelineDescriptor,
    Stylesheet,
    StylesheetItem,
    ViewTimelineDescriptor,
} from "./stylesheet-types";

export type {
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    PropertyDescriptor,
    ScrollTimelineDescriptor,
    Stylesheet,
    StylesheetItem,
    ViewTimelineDescriptor,
};

// ─── Primitives ───────────────────────────────────────────────────────────

const ws = whitespace;
const lcurly = string("{");
const rcurly = string("}");
const lparen = string("(");
const rparen = string(")");
const lbrack = string("[");
const rbrack = string("]");
const semi = string(";");
const colon = string(":");
const comma = string(",");
const at = string("@");

const customPropertyName = regex(/--[a-zA-Z_][a-zA-Z0-9_-]*/);

/**
 * Declaration name: a CSS custom property (`--foo`) preserved verbatim,
 * or a regular hyphenated identifier (`background-color`) preserved
 * as-is. Case conversion (kebab → camel) is the consumer's job; the
 * AST is CSS-faithful.
 */
const declarationName: Parser<string> = any(
    customPropertyName,
    utils.identifier,
);

const stripCSSComments = (input: string): string =>
    input.replace(/\/\*[\s\S]*?\*\//g, "");

// ─── Balanced text scanners ───────────────────────────────────────────────
//
// Declaration values, selector lists, and unknown at-rule bodies all need to
// scan ahead while respecting nested braces, parens, brackets, and string
// literals. parse-that's combinators don't compose well for this, so we use a
// raw balanced-text scanner. W1-8 (lib-parsing F-5): `balancedText` + its
// `StopPredicate` moved to `parsing/utils.ts` as the ONE shared scanner every
// site in the directory now builds on (its `stopOnUnbalancedClose` reproduces
// the "stray close ends the scan" break). Aliased locally so the six call sites
// below read unchanged.
const balancedText = utils.balancedText;

const declarationValueText: Parser<string> = balancedText((input, i) => {
    const ch = input[i]!;
    if (ch === ";" || ch === "}") return true;
    if (ch === "!") {
        return /^!important\b/i.test(input.slice(i));
    }
    return false;
});

// A selector list never contains a top-level `;` — that delimits a preceding
// declaration. Stopping at `;` lets `styleRule` FAIL (and fall through to
// `declaration`) when the block content is actually `color: blue; .b { … }`:
// without the `;` stop the scanner greedily swallows `color: blue; .b` as a
// single (bogus) selector (O.W4 S9 — the CSS-Nesting declaration-before-rule
// disambiguation).
const selectorListText: Parser<string> = balancedText(
    (input, i) => input[i] === "{" || input[i] === ";",
);

const blockBody: Parser<string> = balancedText(
    (input, i) => input[i] === "}",
);

const atRulePrelude: Parser<string> = balancedText((input, i) => {
    const ch = input[i]!;
    return ch === "{" || ch === ";";
});

// ─── Declaration ──────────────────────────────────────────────────────────

const importantFlag: Parser<true> = string("!")
    .skip(ws)
    .next(utils.istring("important"))
    .map(() => true as const);

const parseDeclarationValue = (text: string): ValueArray => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return new ValueArray();

    // Try the rich CSS values parser (handles transforms, gradients,
    // var(), calc(), color spaces, etc.) — falls back to a single
    // string ValueUnit if the input contains tokens the value-level
    // parser can't handle (e.g. comma-separated lists like
    // `font-family: Arial, sans-serif`).
    const result = utils.parseResult(CSSValues.Values, trimmed);
    if (result.status && Array.isArray(result.value) && result.value.length > 0) {
        const flat: Array<ValueUnit | any> = [];
        for (const v of result.value) {
            if (Array.isArray(v)) {
                for (const inner of v) flat.push(inner);
            } else {
                flat.push(v);
            }
        }
        return new ValueArray(...flat);
    }

    return new ValueArray(new ValueUnit(trimmed, "string"));
};

const declaration: Parser<Declaration> = all(
    declarationName.skip(colon.trim(ws)),
    declarationValueText,
    importantFlag.opt(),
)
    .skip(semi.opt())
    .trim(ws)
    .map(([name, valueText, important]: [string, string, true | undefined]) => {
        const value = parseDeclarationValue(valueText);
        value.setProperty(name);
        return {
            name,
            value,
            important: important === true,
        };
    });

const declarationList: Parser<Declaration[]> = declaration.many();

// ─── Keyframe selectors ───────────────────────────────────────────────────

const namedKeyframeSelector: Parser<KeyframeSelector> = any(
    utils.istring("entry"),
    utils.istring("exit"),
    utils.istring("cover"),
    utils.istring("contain"),
).map((name: string) => ({
    kind: "named" as const,
    name: name.toLowerCase() as "entry" | "exit" | "cover" | "contain",
}));

const fromKeyword = utils.istring("from").map(
    (): KeyframeSelector => ({ kind: "percent", value: 0 }),
);
const toKeyword = utils.istring("to").map(
    (): KeyframeSelector => ({ kind: "percent", value: 100 }),
);
const percentSelector: Parser<KeyframeSelector> = CSSValueUnit.Percentage.map(
    (v: ValueUnit): KeyframeSelector => ({
        kind: "percent",
        value: Number(v.valueOf()),
    }),
);
// Bare-number selectors (`100 { ... }`) aren't valid CSS but several
// keyframe-authoring tools emit them. Accept and treat as percent.
const bareNumberSelector: Parser<KeyframeSelector> = utils.number.map(
    (n: number): KeyframeSelector => ({ kind: "percent", value: n }),
);

const keyframeSelector: Parser<KeyframeSelector> = any(
    percentSelector,
    fromKeyword,
    toKeyword,
    namedKeyframeSelector,
    bareNumberSelector,
).trim(ws);

const keyframeSelectorList: Parser<KeyframeSelector[]> =
    keyframeSelector.sepBy(comma.trim(ws));

// ─── @keyframes rule ──────────────────────────────────────────────────────

const KEYFRAME_TIMING_PROPERTY = "animation-timing-function";
const KEYFRAME_COMPOSITION_PROPERTY = "animation-composition";

type LiftedKeyframe = {
    declarations: Declaration[];
    timingFunction?: string;
    composition?: "replace" | "add" | "accumulate";
};

const liftKeyframeMetadata = (
    declarations: Declaration[],
): LiftedKeyframe => {
    const out: LiftedKeyframe = { declarations: [] };

    for (const d of declarations) {
        if (d.important) {
            // CSS Animations spec §3: !important is invalid in a
            // keyframe declaration and the entire declaration is
            // ignored. Drop it without an error — that's what the
            // spec text means by "ignored".
            continue;
        }
        if (d.name === KEYFRAME_TIMING_PROPERTY) {
            out.timingFunction = d.value.toString().trim();
            continue;
        }
        if (d.name === KEYFRAME_COMPOSITION_PROPERTY) {
            const v = d.value.toString().trim().toLowerCase();
            if (v === "replace" || v === "add" || v === "accumulate") {
                out.composition = v;
            }
            continue;
        }
        out.declarations.push(d);
    }

    return out;
};

const keyframeRule: Parser<KeyframeRule> = all(
    keyframeSelectorList,
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
)
    .trim(ws)
    .map(([selectors, declarations]: [KeyframeSelector[], Declaration[]]) => {
        const lifted = liftKeyframeMetadata(declarations);
        const out: KeyframeRule = {
            selectors,
            declarations: lifted.declarations,
        };
        if (lifted.timingFunction != null) {
            out.timingFunction = lifted.timingFunction;
        }
        if (lifted.composition != null) {
            out.composition = lifted.composition;
        }
        return out;
    });

// Keyframes body, run AFTER the `@keyframes` keyword has been consumed.
// Captures optional name and the rule list.
const keyframesBody = all(
    utils.identifier.trim(ws).opt(),
    keyframeRule.many().trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
).map((parts: any[]): StylesheetItem => {
    // parse-that's `all()` filters out values from `.opt()` that
    // didn't match, so the result may be either [name, rules] or
    // just [rules]. Detect by tail position.
    const rules: KeyframeRule[] = parts[parts.length - 1] as KeyframeRule[];
    const name: string | undefined =
        parts.length === 2 ? (parts[0] as string) : undefined;
    const out: StylesheetItem =
        name != null
            ? { kind: "keyframes", name, rules }
            : { kind: "keyframes", rules };
    return out;
});

// ─── @property rule ───────────────────────────────────────────────────────

const buildPropertyDescriptor = (
    declarations: Declaration[],
): PropertyDescriptor => {
    const desc: PropertyDescriptor = {};
    for (const d of declarations) {
        if (d.name === "syntax") {
            const raw = d.value.toString().trim();
            desc.syntax = raw.replace(/^["']|["']$/g, "");
        } else if (d.name === "inherits") {
            const v = d.value.toString().trim().toLowerCase();
            desc.inherits = v === "true";
        } else if (d.name === "initial-value") {
            desc.initialValue = d.value;
        }
    }
    return desc;
};

// Property body, run AFTER `@property` keyword.
const propertyBody = all(
    customPropertyName.trim(ws),
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
).map(
    ([name, decls]: [string, Declaration[]]): StylesheetItem => ({
        kind: "property",
        name,
        descriptor: buildPropertyDescriptor(decls),
    }),
);

// ─── Style rule (qualified rule) ──────────────────────────────────────────

// W1-8 (lib-parsing F-5): comma-split respecting nested parens/brackets/strings
// — the shared `splitTopLevel` scanner, tracking `()`+`[]` (no `{}`).
const splitSelectorList = (text: string): string[] =>
    utils.splitTopLevel(text, (ch) => ch === ",", {
        brackets: utils.BRACKETS_ROUND_SQUARE,
    });

// CSS Nesting L1 (O.W0): a style rule body is no longer declarations-only. It
// is a mix of declarations and NESTED qualified rules / at-rules. We tag each
// item so the `.map` can partition declarations from children. `styleBlockItem`
// is mutually recursive with `styleRule` (a nested rule is itself a style rule),
// so it goes through `Parser.lazy`.
type StyleBlockItem =
    | { t: "decl"; d: Declaration }
    | { t: "child"; c: StylesheetItem };

const styleBlockItem: Parser<StyleBlockItem> = Parser.lazy(() =>
    any(
        // A nested qualified rule or at-rule. Attempted BEFORE `declaration`
        // because a selector like `.b { … }` would otherwise be mis-consumed as a
        // (malformed) declaration name. `atRule`/`styleRule` only succeed on real
        // nested rules, so a plain `color: red;` still falls through to `declaration`.
        any(atRule, styleRule).map(
            (c: StylesheetItem): StyleBlockItem => ({ t: "child", c }),
        ),
        declaration.map((d: Declaration): StyleBlockItem => ({ t: "decl", d })),
    ),
);

const styleBlockContent: Parser<{
    declarations: Declaration[];
    children: StylesheetItem[];
}> = styleBlockItem.many().map((items: StyleBlockItem[]) => {
    const declarations: Declaration[] = [];
    const children: StylesheetItem[] = [];
    for (const item of items) {
        if (item.t === "decl") declarations.push(item.d);
        else children.push(item.c);
    }
    return { declarations, children };
});

const styleRule: Parser<StylesheetItem> = all(
    selectorListText,
    styleBlockContent.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
)
    .trim(ws)
    .map(
        ([selectorText, body]: [
            string,
            { declarations: Declaration[]; children: StylesheetItem[] },
        ]): StylesheetItem => {
            const item: StylesheetItem = {
                kind: "style" as const,
                selectors: splitSelectorList(selectorText),
                declarations: body.declarations,
            };
            // Keep the non-nested shape byte-identical: only attach `children`
            // when there actually are nested rules.
            if (body.children.length > 0) item.children = body.children;
            return item;
        },
    );

// ─── Recursive at-rule bodies (O.W4 S8) ───────────────────────────────────
//
// `stylesheetItem` / `stylesheet` are defined LATER in this module (after the
// `atRule` dispatcher below). A bare reference here is a temporal-dead-zone
// ReferenceError. `Parser.lazy(() => ...)` defers resolution until runtime,
// when `stylesheetItem` exists — the established forward-ref idiom (math.ts:49).
const lazyStylesheetItems: Parser<StylesheetItem[]> = Parser.lazy(() =>
    stylesheetItem.many().trim(ws),
);

// A recursively-parsed block body: `{ <stylesheet-items> }`. Nested rules and
// at-rules become typed children — so `@layer base { @keyframes fade { … } }`
// exposes the `@keyframes` to `extractKeyframes`'s depth-walk (the kf-critical
// fix).
const recursiveBlock: Parser<StylesheetItem[]> = lazyStylesheetItems.wrap(
    lcurly.trim(ws),
    rcurly.trim(ws),
);

// Unknown at-rule body — `@media`, `@supports`, `@layer`, `@container`, … and
// any at-rule without a dedicated typed arm. The semicolon form (`@layer a;`)
// keeps `body: null`; the block form parses RECURSIVELY into `children` (O.W4
// S8) so nested typed rules (incl. `@keyframes`) are reachable.
const unknownBody = (atName: string): Parser<StylesheetItem> =>
    all(
        atRulePrelude.map((s: string) => s.trim()),
        any(
            semi.map(() => ({ kind: "semi" as const })),
            recursiveBlock.map((children) => ({
                kind: "block" as const,
                children,
            })),
        ),
    ).map(
        ([prelude, bodyPart]): StylesheetItem =>
            bodyPart.kind === "semi"
                ? { kind: "unknown", atName, prelude, body: null }
                : {
                      kind: "unknown",
                      atName,
                      prelude,
                      body: null,
                      children: bodyPart.children,
                  },
    );

// ─── @function (O.W4 S7) ───────────────────────────────────────────────────
//
// `@function --name(<param>, …) { result: <value>; … }`, where each
// `<function-parameter> = <custom-property-name> <css-type>? [ : <default-value> ]?`
// (CSS Functions & Mixins L1 §3.1). The parameter list and the declaration
// block are captured; `result:` is hoisted into the descriptor (a special
// descriptor, §4.4).

// Index of the first TOP-LEVEL colon (depth 0, outside strings) in `text` — the
// `<default-value>` introducer. Colons nested in `type( … )` / `url( a:b )` or a
// string are skipped. `-1` when there is no default. W1-8 (lib-parsing F-5): the
// shared `findTopLevel` scanner, tracking `()`+`[]` (matching `splitSelectorList`).
const topLevelColonIndex = (text: string): number =>
    utils.findTopLevel(text, (ch) => ch === ":", {
        brackets: utils.BRACKETS_ROUND_SQUARE,
    });

const parseFunctionParameters = (raw: string): CustomFunctionParameter[] => {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return [];
    return splitSelectorList(trimmed).map((segment) => {
        // `<custom-property-name> <css-type>? [ : <default-value> ]?`. The single
        // top-level colon introduces the default; the `<css-type>` follows the
        // name by WHITESPACE. `--x <length>: 0px` → name "--x", syntax
        // "<length>", default "0px".
        const colonIdx = topLevelColonIndex(segment);
        const decl = (colonIdx === -1 ? segment : segment.slice(0, colonIdx)).trim();
        // Split the declaration head into <custom-property-name> + optional
        // <css-type> at the FIRST run of whitespace.
        const wsIdx = decl.search(/\s/);
        const name = wsIdx === -1 ? decl : decl.slice(0, wsIdx).trim();
        const syntax = wsIdx === -1 ? "" : decl.slice(wsIdx).trim();
        const param: CustomFunctionParameter = { name };
        if (syntax.length > 0) param.syntax = syntax;
        if (colonIdx !== -1) {
            const def = segment.slice(colonIdx + 1).trim();
            if (def.length > 0) param.default = def;
        }
        return param;
    });
};

const buildFunctionDescriptor = (
    paramsRaw: string,
    declarations: Declaration[],
): CustomFunctionDescriptor => {
    const desc: CustomFunctionDescriptor = {};
    const parameters = parseFunctionParameters(paramsRaw);
    if (parameters.length > 0) desc.parameters = parameters;
    const localDecls: Declaration[] = [];
    for (const d of declarations) {
        if (d.name === "result") {
            desc.result = d.value;
        } else {
            localDecls.push(d);
        }
    }
    if (localDecls.length > 0) desc.declarations = localDecls;
    return desc;
};

// The parenthesised parameter list — captured VERBATIM via the balanced-text
// scanner, then split by `parseFunctionParameters`.
const functionParamList: Parser<string> = balancedText(
    (input, i) => input[i] === ")",
).wrap(lparen.trim(ws), rparen.trim(ws));

// Function body, run AFTER the `@function` keyword.
const functionBody: Parser<StylesheetItem> = all(
    customPropertyName.trim(ws),
    functionParamList.trim(ws),
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
).map(
    ([name, paramsRaw, decls]: [
        string,
        string,
        Declaration[],
    ]): StylesheetItem => ({
        kind: "function",
        name,
        descriptor: buildFunctionDescriptor(paramsRaw, decls),
    }),
);

// ─── @scope (O.W4 S10) ─────────────────────────────────────────────────────
//
// `@scope (<scope-start>) to (<scope-end>) { <rules> }` — both selector lists
// optional. Body parsed recursively (so a nested `@keyframes` is reachable).

const parenSelectorList: Parser<string[]> = balancedText(
    (input, i) => input[i] === ")",
)
    .wrap(lparen, rparen)
    .map((s: string) => splitSelectorList(s));

const scopeBody: Parser<StylesheetItem> = all(
    parenSelectorList.trim(ws).opt(),
    utils.istring("to").trim(ws).next(parenSelectorList.trim(ws)).opt(),
    recursiveBlock.trim(ws),
).map((parts: any[]): StylesheetItem => {
    // `all()` compacts `.opt()` misses, so detect by tail (children is last).
    const children = parts[parts.length - 1] as StylesheetItem[];
    const head = parts.slice(0, parts.length - 1) as string[][];
    const item: StylesheetItem = { kind: "scope", children };
    // head is [] (no prelude), [root], or [root, limit]. Truthy-guard each so
    // the optional root?/limit? fields stay string[] under exactOptionalPropertyTypes.
    const [root, limit] = head;
    if (root) item.root = root;
    if (limit) item.limit = limit;
    return item;
});

// ─── @starting-style (O.W4 S11) ────────────────────────────────────────────

const startingStyleBody: Parser<StylesheetItem> = recursiveBlock
    .trim(ws)
    .map((children: StylesheetItem[]): StylesheetItem => ({
        kind: "starting-style",
        children,
    }));

// ─── @scroll-timeline / @view-timeline (O.W4b S3) ──────────────────────────

const buildScrollTimelineDescriptor = (
    declarations: Declaration[],
): ScrollTimelineDescriptor => {
    const desc: ScrollTimelineDescriptor = {};
    for (const d of declarations) {
        const v = d.value.toString().trim();
        if (d.name === "source") desc.source = v;
        else if (d.name === "orientation") desc.orientation = v;
    }
    return desc;
};

const buildViewTimelineDescriptor = (
    declarations: Declaration[],
): ViewTimelineDescriptor => {
    const desc: ViewTimelineDescriptor = {};
    for (const d of declarations) {
        const v = d.value.toString().trim();
        if (d.name === "subject") desc.subject = v;
        else if (d.name === "axis") desc.axis = v;
        else if (d.name === "inset") desc.inset = v;
    }
    return desc;
};

const scrollTimelineBody: Parser<StylesheetItem> = all(
    customPropertyName.trim(ws),
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
).map(
    ([name, decls]: [string, Declaration[]]): StylesheetItem => ({
        kind: "scroll-timeline",
        name,
        descriptor: buildScrollTimelineDescriptor(decls),
    }),
);

const viewTimelineBody: Parser<StylesheetItem> = all(
    customPropertyName.trim(ws),
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
).map(
    ([name, decls]: [string, Declaration[]]): StylesheetItem => ({
        kind: "view-timeline",
        name,
        descriptor: buildViewTimelineDescriptor(decls),
    }),
);

// At-rule dispatcher: consume `@<name>`, then route to the matching
// body parser. This avoids backtracking — each at-rule has exactly
// one body shape, decided by its name.
const atRule: Parser<StylesheetItem> = at
    .next(utils.identifier)
    .chain((name: string): Parser<StylesheetItem> => {
        const lower = name.toLowerCase();
        if (lower === "keyframes") return keyframesBody;
        if (lower === "property") return propertyBody;
        if (lower === "function") return functionBody;
        if (lower === "scope") return scopeBody;
        if (lower === "starting-style") return startingStyleBody;
        if (lower === "scroll-timeline") return scrollTimelineBody;
        if (lower === "view-timeline") return viewTimelineBody;
        return unknownBody(lower);
    });

// ─── Top level ────────────────────────────────────────────────────────────

const stylesheetItem: Parser<StylesheetItem> = any(atRule, styleRule).trim(ws);

// W1-4 (S.W1 · lib-parsing F-9): `.eof()` replaces the hand-rolled
// full-consumption check. `Parser.prototype.eof()` (= `.skip(eof())`) still
// requires the whole input to be consumed — a silent partial parse hides
// grammar bugs — but fails through `mergeErrorState(state, "<end of input>")`
// AND attaches a named "trailing-content" suggestion, strictly richer
// diagnostics than the silent hand-rolled `state.err(undefined, 0)`, for less
// code. The parsed `Stylesheet` value passes through `.skip()` unchanged.
const stylesheet: Parser<Stylesheet> = stylesheetItem.many().trim(ws).eof();

// ─── Public API ───────────────────────────────────────────────────────────

export const parseCSSStylesheet = memoize(
    (input: string): Stylesheet =>
        utils.tryParse(stylesheet, stripCSSComments(input)),
    // keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see
    // comment in src/parsing/index.ts. maxCacheSize (W1-5): bound the cache.
    { keyFn: (input: string) => input, maxCacheSize: utils.PARSE_MEMO_MAX_ENTRIES },
);
