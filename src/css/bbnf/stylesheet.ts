// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — `stylesheet.bbnf`'s semantic actions. Its rules yield TEXT: a run's action is a `text`
// action, which receives exactly the code units its match covered, so no action scans the source for
// a boundary of its own. X.P.W7: a composite rule's action DESTRUCTURES its parts where the grammar
// puts them (positional sequences: an unmatched optional keeps its `undefined` slot), so no tag is
// carried and no subtree is walked to find a part (the template: the W7 research's
// `route-ts-compiler/shim/stylesheet-positional.ts`).

import type { Actions } from "./generated/grammar";

/** The fault a rule list ends on: the named expectation and the offset it starts at. */
export type ListFault = Readonly<{ expected: string; start: number }>;
export type RuleBlock = Readonly<{ prelude: string; body: string | null }>;
/** One comma-list part: an item's trimmed text, or the offset of the comma after it. */
export type CommaSpan = Readonly<{ item: string }> | Readonly<{ comma: number }>;

/** `( sep item ) *`'s repeated pairs; `at` is the item's slot in each pair. */
type Rest<T> = readonly (readonly T[])[];
// Each list is built in ONE array, in one pass: no mapped array spread into another, no filtered copy
// (X.P.W7 `.l3`: an intermediate array is a value built only to be discarded, on every parse — the
// rule list's blocks on every refused sheet too; SpiderMonkey paid for them on large sheets).
/** The item at slot `at` of every pair. */
const column = <T>(rest: Rest<unknown>, at: number): T[] => {
    const out: T[] = [];
    for (const pair of rest) out.push(pair[at] as T);
    return out;
};
/** `first`, then the item at slot `at` of every pair. */
const list = <T>(first: T, rest: Rest<unknown>, at: number): T[] => {
    const out: T[] = [first];
    for (const pair of rest) out.push(pair[at] as T);
    return out;
};
/** `list`, its empty items dropped. */
const nonEmpty = (first: string, rest: Rest<unknown>, at: number): string[] => {
    const out: string[] = first ? [first] : [];
    for (const pair of rest) { const item = pair[at] as string; if (item) out.push(item); }
    return out;
};

const trim = (text: string): string => text.trim();
const same = (text: string): string => text;
const inner = (text: string): string => text.slice(1, -1);
/** A declaration's property name: `--*` kept as authored, any other name ASCII-lowercased. */
const declarationName = (name: string): string => (name.startsWith("--") ? name : name.toLowerCase());
const at = (kind: string) => ([, rest]: readonly [string, string]) => ({ at: kind, name: kind, rest: rest.trim() });

/** `stylesheet.bbnf`'s semantic actions, by production. */
export const stylesheetActions = {
    // Lists: each run its trimmed text; a list its runs (empty runs dropped, except where the
    // reader needs them — `syntaxAlts` and `commaSpans` keep them).
    commaRun: { kind: "text", fn: trim },
    semiRun: { kind: "text", fn: trim },
    spaceRun: { kind: "text", fn: trim },
    argRun: { kind: "text", fn: trim },
    syntaxPart: { kind: "text", fn: trim },
    commaItems: { kind: "map", fn: ([first, rest]: readonly [string, Rest<string>]) => nonEmpty(first, rest, 1) },
    semiItems: { kind: "map", fn: ([first, rest]: readonly [string, Rest<string>]) => nonEmpty(first, rest, 1) },
    spaceItems: { kind: "map", fn: ([, rest]: readonly [unknown, Rest<string>]) => nonEmpty("", rest, 0) },
    syntaxAlts: { kind: "map", fn: ([first, rest]: readonly [string, Rest<string>]) => list(first, rest, 1) },
    timelineArgs: { kind: "map", fn: ([, rest]: readonly [unknown, Rest<string>]) => column<string>(rest, 0) },
    listComma: { kind: "span", fn: (_: string, start: number): CommaSpan => ({ comma: start }) },
    commaSpans: { kind: "map", fn: ([first, rest]: readonly [string, Rest<unknown>]): CommaSpan[] => {
        const parts: CommaSpan[] = [{ item: first }];
        for (const [comma, item] of rest) parts.push(comma as CommaSpan, { item: item as string });
        return parts;
    } },
    restText: { kind: "text", fn: same },

    // Rule lists.
    preludeRun: { kind: "text", fn: same },
    semiTail: { kind: "map", fn: (): null => null },
    blockTail: { kind: "text", fn: inner },
    ruleBlock: { kind: "map", fn: ([prelude, body]: readonly [string, string | null]): RuleBlock => ({ prelude: prelude.trim(), body }) },
    openComment: { kind: "span", fn: (_: unknown, start: number): ListFault => ({ expected: "closing comment", start }) },
    openBlock: { kind: "span", fn: ([prelude]: readonly [string, string, string], start: number): ListFault =>
        ({ expected: "closing brace", start: start + prelude.length }) },
    openRule: { kind: "span", fn: (_: unknown, start: number): ListFault => ({ expected: "rule", start }) },
    ruleList: { kind: "map", fn: ([, rest, fault]: readonly [unknown, Rest<unknown>, ListFault | undefined]) => ({
        blocks: column<RuleBlock>(rest, 0),
        fault,
    }) },

    // At-rule preludes.
    atKeyframes: { kind: "map", fn: at("keyframes") },
    atProperty: { kind: "map", fn: at("property") },
    atFunction: { kind: "map", fn: at("function") },
    atScope: { kind: "map", fn: at("scope") },
    atStartingStyle: { kind: "map", fn: () => ({ at: "starting-style", name: "starting-style", rest: "" }) },
    atScrollTimeline: { kind: "map", fn: at("scroll-timeline") },
    atViewTimeline: { kind: "map", fn: at("view-timeline") },
    atName: { kind: "map", fn: (token: string) => token.slice(1) },
    atOther: { kind: "map", fn: ([name, other]: readonly [string, string | undefined]) => ({ at: "other", name, rest: other ?? "" }) },
    syntaxCore: { kind: "text", fn: same },
    syntaxText: { kind: "map", fn: ([, core]: readonly [unknown, string | undefined, unknown]) => core ?? "" },
    scopeGroup: { kind: "text", fn: inner },
    scopePrelude: { kind: "map", fn: ([, part]: readonly [unknown, readonly [string, string | undefined, unknown] | undefined]) =>
        ({ root: part?.[0], limit: part?.[1] }) },
    functionName: { kind: "text", fn: same },
    functionParams: { kind: "text", fn: same },
    functionHead: { kind: "map", fn: ([name, params]: readonly [string, string]) => ({ name, params }) },
    colonRun: { kind: "text", fn: trim },
    paramDefault: { kind: "map", fn: (rest: string) => rest.trim() },
    functionParam: { kind: "map", fn: ([head, def]: readonly [string, string | undefined]) => ({ head, default: def }) },
    paramName: { kind: "text", fn: same },
    paramSyntax: { kind: "text", fn: trim },
    paramHead: { kind: "map", fn: ([name, syntax]: readonly [string, string | undefined]) => ({ name, syntax }) },

    // Declarations.
    // A standard property name is ASCII case-insensitive (folded); a custom property name
    // (`--*`) is case-sensitive and kept as authored (css-variables-1 §2: `--Foo` ≠ `--foo`).
    declName: { kind: "map", fn: (token: string) => declarationName(token.trim()) },
    declValue: { kind: "text", fn: trim },
    declImportant: { kind: "map", fn: (): true => true },
    declaration: { kind: "map", fn: ([name, , value, important]: readonly [string, string, string, true | undefined]) =>
        ({ name, value, important: important === true }) },
} as const satisfies Partial<Actions>;
