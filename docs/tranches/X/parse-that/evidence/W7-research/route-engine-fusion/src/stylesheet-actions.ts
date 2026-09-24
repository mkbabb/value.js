// SERVED MODEL: claude-opus-5-5
//
// route engine-fusion COPY of value.js src/css/bbnf/stylesheet.ts — ONLY the three helpers (textOf, tagsOf,
// tag) and `items` are rewritten allocation-light; every action and its result are unchanged.
// X.P.W6.x — `stylesheet.bbnf`'s semantic actions. Its rules yield TEXT: every leaf is a matched
// run of code units, so an action joins the leaves back into the run the grammar delimited — it
// never scans the source for a boundary of its own.

import type { Rules } from "./load";
import { ruleOf } from "./load";

/** A rule's leaves, joined in order: the exact text its match covered. */
export function textOf(value: unknown): string {
    if (typeof value === "string") return value;
    if (!Array.isArray(value)) return "";
    let out = "";
    for (const v of value) out += textOf(v);
    return out;
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
    const out: Tag[] = [];
    collectTags(value, out);
    return out;
}
function collectTags(value: unknown, out: Tag[]): void {
    if (Array.isArray(value)) { for (const v of value) collectTags(v, out); return; }
    if (isTag(value)) out.push(value);
}

const ABSENT: unique symbol = Symbol("absent");
/** The first tag carrying `key` (depth-first, source order), without materializing the tag list. */
function findTag(value: unknown, key: string): unknown {
    if (Array.isArray(value)) {
        for (const v of value) { const r = findTag(v, key); if (r !== ABSENT) return r; }
        return ABSENT;
    }
    return isTag(value) && key in value ? value[key] : ABSENT;
}

/** The first tag carrying `key`, or `undefined` when the optional part it names was absent. */
function tag<T>(value: unknown, key: string): T | undefined {
    const r = findTag(value, key);
    return (r === ABSENT ? undefined : r) as T | undefined;
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
    // Literal-keyed tag builders (a computed key `{ [key]: … }` builds each tag through the
    // generic keyed-define path; a literal key is one boilerplate shape per tag kind).
    const TEXT: Record<string, (value: unknown) => Tag> = {
        rest: (v) => ({ rest: textOf(v) }), prelude: (v) => ({ prelude: textOf(v) }), body: (v) => ({ body: textOf(v) }),
        core: (v) => ({ core: textOf(v) }), group: (v) => ({ group: textOf(v) }), name: (v) => ({ name: textOf(v) }),
        params: (v) => ({ params: textOf(v) }),
    };
    const TRIMMED: Record<string, (value: unknown) => Tag> = {
        item: (v) => ({ item: textOf(v).trim() }), head: (v) => ({ head: textOf(v).trim() }), syntax: (v) => ({ syntax: textOf(v).trim() }),
    };
    const text = (key: string) => TEXT[key];
    const trimmed = (key: string) => TRIMMED[key];
    const items = (value: unknown): string[] => {
        const out: string[] = [];
        for (const t of tagsOf(value)) if ("item" in t) out.push(t.item as string);
        return out;
    };

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
