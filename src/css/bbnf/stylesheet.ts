// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — `stylesheet.bbnf`'s semantic actions. Its rules yield TEXT: every leaf is a matched
// run of code units, so an action joins the leaves back into the run the grammar delimited — it
// never scans the source for a boundary of its own.

import type { Rules } from "./load";
import { ruleOf } from "./load";

/** A rule's leaves, joined in order: the exact text its match covered. */
export function textOf(value: unknown): string {
    if (Array.isArray(value)) return value.map(textOf).join("");
    return typeof value === "string" ? value : "";
}

/**
 * A TAG: the value an action gives a sub-rule so the enclosing rule can find it. parse-that drops
 * an `undefined` (an unmatched optional) from a sequence's value, so a sequence's shape is not
 * positional; every part a rule needs is tagged by its own action and collected wherever it sits.
 */
type Tag = Readonly<Record<string, unknown>>;
const isTag = (value: unknown): value is Tag => typeof value === "object" && value !== null && !Array.isArray(value);

/** Every tag in `value`, in source order. */
export function tagsOf(value: unknown): Tag[] {
    if (isTag(value)) return [value];
    return Array.isArray(value) ? value.flatMap(tagsOf) : [];
}

/** The first tag carrying `key`, or `undefined` when the optional part it names was absent. */
function tag<T>(value: unknown, key: string): T | undefined {
    return tagsOf(value).find((t) => key in t)?.[key] as T | undefined;
}

/** The fault a rule list ends on: the named expectation and the offset it starts at. */
export type ListFault = Readonly<{ expected: string; start: number }>;
export type RuleBlock = Readonly<{ prelude: string; body: string | null }>;

/** Attaches `stylesheet.bbnf`'s actions: each rule answers text, or tags that carry text. */
export function attachStylesheetActions(rules: Rules): void {
    const on = <T>(name: string, action: (value: never) => T): void => {
        rules[name] = ruleOf(rules, name).map(action as (value: unknown) => T);
    };
    /** An action that also sees the offsets its rule matched between. */
    const spanned = <T>(name: string, action: (value: never, start: number, end: number) => T): void => {
        rules[name] = ruleOf(rules, name).mapState((next, prev) =>
            next.ok((action as (value: unknown, start: number, end: number) => T)(next.value, prev.offset, next.offset)));
    };
    const text = (key: string) => (value: unknown): Tag => ({ [key]: textOf(value) });
    const trimmed = (key: string) => (value: unknown): Tag => ({ [key]: textOf(value).trim() });
    const items = (value: unknown): string[] => tagsOf(value).filter((t) => "item" in t).map((t) => t.item as string);

    // Lists: each run its trimmed text; a list its runs (empty runs dropped, except where the
    // reader needs them — `syntaxAlts` and `commaSpans` keep them).
    for (const run of ["commaRun", "semiRun", "spaceRun", "argRun", "syntaxPart"]) on(run, trimmed("item"));
    for (const list of ["commaItems", "semiItems", "spaceItems"]) on(list, (v: unknown) => items(v).filter(Boolean));
    on("syntaxAlts", items);
    on("timelineArgs", items);
    spanned("listComma", (_: unknown, start: number): Tag => ({ comma: start }));
    on("commaSpans", (v: unknown) => tagsOf(v));
    on("restText", text("rest"));

    // Rule lists.
    on("preludeRun", text("prelude"));
    on("semiTail", (): Tag => ({ body: null }));
    on("blockTail", text("body"));
    on("ruleBlock", (v: unknown): Tag => ({
        block: { prelude: (tag<string>(v, "prelude") ?? "").trim(), body: tag<string | null>(v, "body") ?? null } satisfies RuleBlock,
    }));
    spanned("openComment", (_: unknown, start: number): Tag => ({ fault: { expected: "closing comment", start } }));
    spanned("openBlock", (v: unknown, start: number): Tag =>
        ({ fault: { expected: "closing brace", start: start + (tag<string>(v, "prelude") ?? "").length } }));
    spanned("openRule", (_: unknown, start: number): Tag => ({ fault: { expected: "rule", start } }));
    on("ruleList", (v: unknown) => ({
        blocks: tagsOf(v).filter((t) => "block" in t).map((t) => t.block as RuleBlock),
        fault: tag<ListFault>(v, "fault"),
    }));

    // At-rule preludes.
    const at = (kind: string) => (v: unknown): Tag => ({ at: kind, name: kind, rest: (tag<string>(v, "rest") ?? "").trim() });
    on("atKeyframes", at("keyframes"));
    on("atProperty", at("property"));
    on("atFunction", at("function"));
    on("atScope", at("scope"));
    on("atStartingStyle", (): Tag => ({ at: "starting-style", name: "starting-style", rest: "" }));
    on("atScrollTimeline", at("scroll-timeline"));
    on("atViewTimeline", at("view-timeline"));
    on("atName", (v: string): Tag => ({ name: v.slice(1) }));
    on("atRest", (v: unknown): Tag => ({ other: tag<string>(v, "rest") ?? "" }));
    on("atOther", (v: unknown): Tag => ({ at: "other", name: tag<string>(v, "name") ?? "", rest: tag<string>(v, "other") ?? "" }));
    on("syntaxCore", text("core"));
    on("syntaxText", (v: unknown) => tag<string>(v, "core") ?? "");
    on("scopeGroup", text("group"));
    on("scopeLimit", (v: unknown): Tag => ({ limit: tag<string>(v, "group") }));
    on("scopePrelude", (v: unknown) => ({ root: tag<string>(v, "group"), limit: tag<string>(v, "limit") }));
    on("functionName", text("name"));
    on("functionParams", text("params"));
    on("functionHead", (v: unknown) => ({ name: tag<string>(v, "name") ?? "", params: tag<string>(v, "params") ?? "" }));
    on("colonRun", trimmed("head"));
    on("paramDefault", (v: unknown): Tag => ({ default: (tag<string>(v, "rest") ?? "").trim() }));
    on("functionParam", (v: unknown) => ({ head: tag<string>(v, "head") ?? "", default: tag<string>(v, "default") }));
    on("paramName", text("name"));
    on("paramSyntax", trimmed("syntax"));
    on("paramHead", (v: unknown) => ({ name: tag<string>(v, "name") ?? "", syntax: tag<string>(v, "syntax") }));

    // Declarations.
    on("declName", (v: string): Tag => ({ name: v.trim().toLowerCase() }));
    on("declValue", (v: unknown): Tag => ({ value: textOf(v).trim() }));
    on("declImportant", (): Tag => ({ important: true }));
    on("declaration", (v: unknown) => ({
        name: tag<string>(v, "name") ?? "",
        value: tag<string>(v, "value") ?? "",
        important: tag<boolean>(v, "important") === true,
    }));
}
