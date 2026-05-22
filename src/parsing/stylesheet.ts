import {
    Parser,
    all,
    any,
    regex,
    string,
    whitespace,
} from "@mkbabb/parse-that";
import { memoize } from "../utils";
import { ValueArray, ValueUnit } from "../units";
import { CSSValues } from "./index";
import { CSSValueUnit } from "./units";
import * as utils from "./utils";

// ─── Public types ─────────────────────────────────────────────────────────

export type Declaration = {
    name: string; // CSS-faithful: "background-color" or "--my-prop"
    value: ValueArray;
    important: boolean;
};

export type KeyframeSelector =
    | { kind: "percent"; value: number }
    | {
          kind: "named";
          name: "entry" | "exit" | "cover" | "contain";
      };

export type KeyframeRule = {
    selectors: KeyframeSelector[];
    declarations: Declaration[];
    timingFunction?: string; // hoisted from animation-timing-function
    composition?: "replace" | "add" | "accumulate";
};

export type PropertyDescriptor = {
    syntax?: string;
    inherits?: boolean;
    initialValue?: ValueArray;
};

export type StylesheetItem =
    | { kind: "keyframes"; name?: string; rules: KeyframeRule[] }
    | { kind: "property"; name: string; descriptor: PropertyDescriptor }
    | {
          kind: "style";
          selectors: string[];
          declarations: Declaration[];
      }
    | {
          kind: "unknown";
          atName: string;
          prelude: string;
          body: string | null;
      };

export type Stylesheet = StylesheetItem[];

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
// Declaration values, selector lists, and unknown at-rule bodies all
// need to scan ahead while respecting nested braces, parens, brackets,
// and string literals. parse-that's combinators don't compose well
// for this, so we use raw Parser instances that walk the input.

type StopPredicate = (input: string, i: number, depth: number) => boolean;

const balancedText = (stop: StopPredicate): Parser<string> =>
    new Parser((state) => {
        const input = state.src;
        const start = state.offset;
        let i = start;
        let parenDepth = 0;
        let brackDepth = 0;
        let curlyDepth = 0;
        let inString: string | null = null;

        while (i < input.length) {
            const ch = input[i]!;

            if (inString) {
                if (ch === "\\" && i + 1 < input.length) {
                    i += 2;
                    continue;
                }
                if (ch === inString) {
                    inString = null;
                }
                i++;
                continue;
            }

            if (ch === '"' || ch === "'") {
                inString = ch;
                i++;
                continue;
            }

            // Check stop predicate at depth 0 BEFORE handling brackets,
            // so a stop char like `{` for at-rule preludes can fire
            // before being consumed as a depth-opener.
            if (
                parenDepth === 0 &&
                brackDepth === 0 &&
                curlyDepth === 0 &&
                stop(input, i, 0)
            ) {
                break;
            }

            if (ch === "(") {
                parenDepth++;
                i++;
                continue;
            }
            if (ch === ")") {
                if (parenDepth === 0) break;
                parenDepth--;
                i++;
                continue;
            }
            if (ch === "[") {
                brackDepth++;
                i++;
                continue;
            }
            if (ch === "]") {
                if (brackDepth === 0) break;
                brackDepth--;
                i++;
                continue;
            }
            if (ch === "{") {
                curlyDepth++;
                i++;
                continue;
            }
            if (ch === "}") {
                if (curlyDepth === 0) break;
                curlyDepth--;
                i++;
                continue;
            }

            i++;
        }

        const text = input.slice(start, i);
        return state.ok(text, i - start);
    });

const declarationValueText: Parser<string> = balancedText((input, i) => {
    const ch = input[i]!;
    if (ch === ";" || ch === "}") return true;
    if (ch === "!") {
        return /^!important\b/i.test(input.slice(i));
    }
    return false;
});

const selectorListText: Parser<string> = balancedText(
    (input, i) => input[i] === "{",
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

const splitSelectorList = (text: string): string[] => {
    // Comma-split respecting nested parens/brackets/strings.
    const out: string[] = [];
    let depth = 0;
    let inString: string | null = null;
    let buf = "";
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]!;
        if (inString) {
            if (ch === "\\" && i + 1 < text.length) {
                buf += ch + text[++i]!;
                continue;
            }
            if (ch === inString) inString = null;
            buf += ch;
            continue;
        }
        if (ch === '"' || ch === "'") {
            inString = ch;
            buf += ch;
            continue;
        }
        if (ch === "(" || ch === "[") {
            depth++;
            buf += ch;
            continue;
        }
        if (ch === ")" || ch === "]") {
            depth--;
            buf += ch;
            continue;
        }
        if (ch === "," && depth === 0) {
            const s = buf.trim();
            if (s.length > 0) out.push(s);
            buf = "";
            continue;
        }
        buf += ch;
    }
    const s = buf.trim();
    if (s.length > 0) out.push(s);
    return out;
};

const styleRule: Parser<StylesheetItem> = all(
    selectorListText,
    declarationList.trim(ws).wrap(lcurly.trim(ws), rcurly.trim(ws)),
)
    .trim(ws)
    .map(([selectorText, declarations]: [string, Declaration[]]) => ({
        kind: "style" as const,
        selectors: splitSelectorList(selectorText),
        declarations,
    }));

// Unknown at-rule body — captured opaquely (e.g. `@media`, `@supports`,
// `@layer`, `@font-face`, `@import`). Inner @keyframes inside such
// blocks aren't recursively extracted; callers wanting that can
// re-parse `body`.
const unknownBody = (atName: string): Parser<StylesheetItem> =>
    all(
        atRulePrelude.map((s: string) => s.trim()),
        any(
            semi.map(() => null as string | null),
            blockBody.wrap(lcurly.trim(ws), rcurly.trim(ws)),
        ),
    ).map(
        ([prelude, body]: [string, string | null]): StylesheetItem => ({
            kind: "unknown",
            atName,
            prelude,
            body,
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
        return unknownBody(lower);
    });

// ─── Top level ────────────────────────────────────────────────────────────

const stylesheetItem: Parser<StylesheetItem> = any(atRule, styleRule).trim(ws);

const stylesheet: Parser<Stylesheet> = stylesheetItem.many().trim(ws).skip(
    new Parser((state) => {
        // require full input consumption — silent partial parses
        // hide bugs in the grammar.
        if (state.offset >= state.src.length) return state.ok(null, 0);
        return state.err(undefined as never, 0);
    }),
);

// ─── Public API ───────────────────────────────────────────────────────────

export const parseCSSStylesheet = memoize(
    (input: string): Stylesheet =>
        utils.tryParse(stylesheet, stripCSSComments(input)),
    // keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see
    // comment in src/parsing/index.ts.
    { keyFn: (input: string) => input },
);
