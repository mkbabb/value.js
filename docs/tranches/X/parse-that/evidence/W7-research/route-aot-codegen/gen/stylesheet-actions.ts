// SERVED MODEL: claude-opus-5-5
//
// route-aot-codegen PROTOTYPE of the landing form (a copy of src/css/bbnf/stylesheet.ts; esbuild
// redirects index.ts's `./stylesheet` here for the aot-text variant only). Two changes, both
// output-identical: (1) every action that only joins its rule's leaves back into text is a TEXT action —
// it receives the exact span its rule matched, and the generated rule builds no value; (2) `tag` walks
// once with an early exit instead of flattening the whole subtree per key.
// X.P.W6.x — `stylesheet.bbnf`'s semantic actions. Its rules yield TEXT: every leaf is a matched
// run of code units, so an action joins the leaves back into the run the grammar delimited — it
// never scans the source for a boundary of its own.

import type { Rules } from "./load-aot";
import { ruleOf } from "./load-aot";

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
    const out: Tag[] = [];
    if (Array.isArray(value)) collectTags(value, out);
    return out;
}
function collectTags(value: readonly unknown[], out: Tag[]): void {
    for (const v of value) {
        if (isTag(v)) out.push(v);
        else if (Array.isArray(v)) collectTags(v, out);
    }
}

/** The first tag carrying `key`, or `undefined` when the optional part it names was absent. */
function tag<T>(value: unknown, key: string): T | undefined {
    if (isTag(value)) return (key in value ? value[key] : undefined) as T | undefined;
    if (!Array.isArray(value)) return undefined;
    for (const v of value) {
        if (isTag(v)) { if (key in v) return v[key] as T; continue; }
        if (Array.isArray(v)) { const found = firstTag(v, key); if (found !== MISSING) return found as T; }
    }
    return undefined;
}
const MISSING = Symbol("missing");
function firstTag(value: readonly unknown[], key: string): unknown {
    for (const v of value) {
        if (isTag(v)) { if (key in v) return v[key]; continue; }
        if (Array.isArray(v)) { const found = firstTag(v, key); if (found !== MISSING) return found; }
    }
    return MISSING;
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
    /** A TEXT action: `f` reads the exact text the rule matched (the generated rule builds no value). */
    const onText = <T>(name: string, f: (text: string) => T): void => {
        rules[name] = (ruleOf(rules, name) as unknown as { text(f: (text: string) => T): Rules[string] }).text(f);
    };
    /** A value-free SPAN action: `f` reads only the offsets its rule matched between. */
    const onRange = <T>(name: string, f: (start: number, end: number) => T): void => {
        rules[name] = (ruleOf(rules, name) as unknown as { range(f: (start: number, end: number) => T): Rules[string] }).range(f);
    };
    const text = (key: string) => (value: unknown): Tag => ({ [key]: textOf(value) });
    const trimmed = (key: string) => (value: unknown): Tag => ({ [key]: textOf(value).trim() });
    const items = (value: unknown): string[] => tagsOf(value).filter((t) => "item" in t).map((t) => t.item as string);

    // Lists: each run its trimmed text; a list its runs (empty runs dropped, except where the
    // reader needs them — `syntaxAlts` and `commaSpans` keep them).
    for (const run of ["commaRun", "semiRun", "spaceRun", "argRun", "syntaxPart"]) onText(run, (t): Tag => ({ item: t.trim() }));
    for (const list of ["commaItems", "semiItems", "spaceItems"]) on(list, (v: unknown) => items(v).filter(Boolean));
    on("syntaxAlts", items);
    on("timelineArgs", items);
    onRange("listComma", (start): Tag => ({ comma: start }));
    on("commaSpans", (v: unknown) => tagsOf(v));
    onText("restText", (t): Tag => ({ rest: t }));
    // The bodies read only as text: a `{}` body and a `()` group's inside are the text they span.
    onText("blockBody", (t) => t);
    onText("textBody", (t) => t);
    // Between rules: whitespace, stray `;` and comments carry no value.
    onText("ruleGap", () => undefined);

    // Rule lists.
    onText("preludeRun", (t): Tag => ({ prelude: t }));
    on("semiTail", (): Tag => ({ body: null }));
    on("blockTail", (body: string): Tag => ({ body }));
    on("ruleBlock", (v: unknown): Tag => ({
        block: { prelude: (tag<string>(v, "prelude") ?? "").trim(), body: tag<string | null>(v, "body") ?? null } satisfies RuleBlock,
    }));
    onRange("openComment", (start): Tag => ({ fault: { expected: "closing comment", start } }));
    spanned("openBlock", (v: unknown, start: number): Tag =>
        ({ fault: { expected: "closing brace", start: start + (tag<string>(v, "prelude") ?? "").length } }));
    onRange("openRule", (start): Tag => ({ fault: { expected: "rule", start } }));
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
    onText("syntaxCore", (t): Tag => ({ core: t }));
    on("syntaxText", (v: unknown) => tag<string>(v, "core") ?? "");
    on("scopeGroup", (group: string): Tag => ({ group }));
    on("scopeLimit", (v: unknown): Tag => ({ limit: tag<string>(v, "group") }));
    on("scopePrelude", (v: unknown) => ({ root: tag<string>(v, "group"), limit: tag<string>(v, "limit") }));
    onText("functionName", (t): Tag => ({ name: t }));
    onText("functionParams", (t): Tag => ({ params: t }));
    on("functionHead", (v: unknown) => ({ name: tag<string>(v, "name") ?? "", params: tag<string>(v, "params") ?? "" }));
    onText("colonRun", (t): Tag => ({ head: t.trim() }));
    on("paramDefault", (v: unknown): Tag => ({ default: (tag<string>(v, "rest") ?? "").trim() }));
    on("functionParam", (v: unknown) => ({ head: tag<string>(v, "head") ?? "", default: tag<string>(v, "default") }));
    onText("paramName", (t): Tag => ({ name: t }));
    onText("paramSyntax", (t): Tag => ({ syntax: t.trim() }));
    on("paramHead", (v: unknown) => ({ name: tag<string>(v, "name") ?? "", syntax: tag<string>(v, "syntax") }));

    // Declarations.
    on("declName", (v: string): Tag => ({ name: v.trim().toLowerCase() }));
    onText("declValue", (t): Tag => ({ value: t.trim() }));
    on("declImportant", (): Tag => ({ important: true }));
    on("declaration", (v: unknown) => ({
        name: tag<string>(v, "name") ?? "",
        value: tag<string>(v, "value") ?? "",
        important: tag<boolean>(v, "important") === true,
    }));
}
