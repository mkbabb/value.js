// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · shim/stylesheet-positional.ts — value.js `src/css/bbnf/stylesheet.ts`, rewritten
// for the proto-pos arm onto the two idioms this route proposes (NOT value.js HEAD):
//   · TEXT actions — a rule that yields the text its match covered says so (`onText`); the compiler
//     runs it as a recognizer and hands over the matched text;
//   · POSITIONAL sequences (parse-that 2.x `all()`: an unmatched optional keeps its `undefined` slot)
//     — so every action DESTRUCTURES its parts where the grammar puts them, and the TAG protocol
//     (`tagsOf` walking whole subtrees to find parts wherever they sit) retires.
// The readers' answers (`sheet.ts`) are unchanged: the same objects, the same keys.

import type { Rules } from "./load";
import { ruleOf } from "./load";

/** The fault a rule list ends on: the named expectation and the offset it starts at. */
export type ListFault = Readonly<{ expected: string; start: number }>;
export type RuleBlock = Readonly<{ prelude: string; body: string | null }>;

type Rest<T> = readonly (readonly T[])[];

export function attachStylesheetActions(rules: Rules): void {
    const on = <T>(name: string, action: (value: never) => T): void => {
        rules[name] = ruleOf(rules, name).map(action as (value: unknown) => T);
    };
    const onText = <T>(name: string, action: (text: string) => T): void => {
        rules[name] = ruleOf(rules, name).text(action);
    };
    const spanned = <T>(name: string, action: (value: never, start: number, end: number) => T): void => {
        rules[name] = ruleOf(rules, name).mapState((next, prev) =>
            next.ok((action as (value: unknown, start: number, end: number) => T)(next.value, prev.offset, next.offset)));
    };
    const trim = (t: string) => t.trim();
    const same = (t: string) => t;
    const inner = (t: string) => t.slice(1, -1);
    /** `first ( sep item ) *` → the items; `at` is the item's slot in each repeated pair. */
    const list = <T>(first: T, rest: Rest<unknown>, at: number): T[] => [first, ...rest.map((pair) => pair[at] as T)];

    // Lists.
    for (const run of ["commaRun", "semiRun", "spaceRun", "argRun", "syntaxPart"]) onText(run, trim);
    on("commaItems", ([first, rest]: [string, Rest<string>]) => list(first, rest, 1).filter(Boolean));
    on("semiItems", ([first, rest]: [string, Rest<string>]) => list(first, rest, 1).filter(Boolean));
    on("spaceItems", ([, rest]: [unknown, Rest<string>]) => rest.map((pair) => pair[0]).filter(Boolean));
    on("syntaxAlts", ([first, rest]: [string, Rest<string>]) => list(first, rest, 1));
    on("timelineArgs", ([, rest]: [unknown, Rest<string>]) => rest.map((pair) => pair[0]));
    spanned("listComma", (_: unknown, start: number) => ({ comma: start }));
    on("commaSpans", ([first, rest]: [string, Rest<unknown>]) => {
        const parts: Record<string, unknown>[] = [{ item: first }];
        for (const [comma, item] of rest) parts.push(comma as Record<string, unknown>, { item });
        return parts;
    });
    onText("restText", same);

    // Rule lists.
    onText("preludeRun", same);
    on("semiTail", () => null);
    onText("blockTail", inner);
    on("ruleBlock", ([prelude, body]: [string, string | null]) => ({ prelude: prelude.trim(), body } satisfies RuleBlock));
    spanned("openComment", (_: unknown, start: number): ListFault => ({ expected: "closing comment", start }));
    spanned("openBlock", ([prelude]: [string], start: number): ListFault => ({ expected: "closing brace", start: start + prelude.length }));
    spanned("openRule", (_: unknown, start: number): ListFault => ({ expected: "rule", start }));
    on("ruleList", ([, rest, fault]: [unknown, Rest<unknown>, ListFault | undefined]) => ({
        blocks: rest.map((pair) => pair[0] as RuleBlock),
        fault,
    }));

    // At-rule preludes.
    const at = (kind: string) => ([, rest]: [unknown, string]) => ({ at: kind, name: kind, rest: rest.trim() });
    on("atKeyframes", at("keyframes"));
    on("atProperty", at("property"));
    on("atFunction", at("function"));
    on("atScope", at("scope"));
    on("atStartingStyle", () => ({ at: "starting-style", name: "starting-style", rest: "" }));
    on("atScrollTimeline", at("scroll-timeline"));
    on("atViewTimeline", at("view-timeline"));
    on("atName", (v: string) => v.slice(1));
    on("atOther", ([name, other]: [string, string | undefined]) => ({ at: "other", name, rest: other ?? "" }));
    onText("syntaxCore", same);
    on("syntaxText", ([, core]: [unknown, string | undefined]) => core ?? "");
    onText("scopeGroup", inner);
    on("scopePrelude", ([, part]: [unknown, [string, string | undefined, unknown] | undefined]) => ({ root: part?.[0], limit: part?.[1] }));
    onText("functionName", same);
    onText("functionParams", same);
    on("functionHead", ([name, params]: [string, string]) => ({ name, params }));
    onText("colonRun", trim);
    on("paramDefault", (rest: string) => rest.trim());
    on("functionParam", ([head, def]: [string, string | undefined]) => ({ head, default: def }));
    onText("paramName", same);
    onText("paramSyntax", trim);
    on("paramHead", ([name, syntax]: [string, string | undefined]) => ({ name, syntax }));

    // Declarations.
    on("declName", (v: string) => v.trim().toLowerCase());
    onText("declValue", trim);
    on("declImportant", () => true);
    on("declaration", ([name, , value, important]: [string, string, string, true | undefined]) => ({ name, value, important: important === true }));
}
