// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — the stylesheet layer's readers over `stylesheet.bbnf`. `../stylesheet.ts`,
// `../rules.ts`, `../timeline.ts` and `../syntax.ts` read CSS text ONLY through these: each is one
// whole-input run of one grammar rule, and answers the rule's value (or `null` when the text is not
// that production). None of them scans text; the grammar decides every boundary.

import { grammar } from "./index";
import { ruleOf, run } from "./load";
import type { ListFault, RuleBlock } from "./stylesheet";

const read = <T>(name: string, source: string): T | null => {
    const parsed = run<T>(ruleOf(grammar(), name), source);
    return parsed.ok ? parsed.value : null;
};
const matches = (name: string, source: string): boolean => run(ruleOf(grammar(), name), source).ok;

export type { ListFault, RuleBlock };

/** A rule list: its blocks, and the fault it ends on (an unclosed comment, block or prelude). */
export function ruleList(source: string): Readonly<{ blocks: readonly RuleBlock[]; fault?: ListFault }> {
    const parsed = read<{ blocks: readonly RuleBlock[]; fault?: ListFault }>("ruleList", source);
    // `ruleList` ends in a catch-all fault arm, so every input is one: a miss is a grammar defect.
    if (parsed === null) throw new Error("stylesheet.bbnf `ruleList` refused an input it must accept");
    return parsed;
}

export type AtPrelude = Readonly<{
    at: "keyframes" | "property" | "function" | "scope" | "starting-style" | "scroll-timeline" | "view-timeline" | "other";
    /** The at-keyword's name, without `@` (for `other`, its text up to the first space). */
    name: string;
    /** The text after the at-keyword (trimmed); for `other`, the text after its first space. */
    rest: string;
}>;

/** An at-rule's prelude, by kind; `null` for a prelude that is not an at-rule (a style rule). */
export const atPrelude = (prelude: string): AtPrelude | null => read<AtPrelude>("atPrelude", prelude);

/** `@property`'s name is a `<custom-property-name>`. */
export const isPropertyName = (name: string): boolean => matches("propertyName", name);

/** A `syntax` descriptor's text without its enclosing quotes. */
export function syntaxText(serialized: string): string {
    const parsed = read<string>("syntaxText", serialized);
    // Every part of `syntaxText` is optional and its core stops only before a final quote: a miss
    // is a grammar defect, never input.
    if (parsed === null) throw new Error("stylesheet.bbnf `syntaxText` refused an input it must accept");
    return parsed;
}

/** A `syntax` descriptor's `|`-separated components, trimmed (empty components kept). */
export const syntaxComponents = (syntax: string): readonly string[] | null => read<string[]>("syntaxAlts", syntax);

/** `@scope`'s prelude: the root and limit groups' text; `null` when it is not a scope prelude. */
export const scopePrelude = (text: string): Readonly<{ root?: string; limit?: string }> | null =>
    read<{ root?: string; limit?: string }>("scopePrelude", text);

/** `@function`'s signature: its name and the parameter list's text. */
export const functionHead = (prelude: string): Readonly<{ name: string; params: string }> | null =>
    read<{ name: string; params: string }>("functionHead", prelude);

/** One `@function` parameter: its head text and, when a `:` is present, its default text. */
export const functionParam = (row: string): Readonly<{ head: string; default?: string }> | null =>
    read<{ head: string; default?: string }>("functionParam", row);

/** A parameter head: `<custom-property-name> <syntax>?`. */
export const paramHead = (head: string): Readonly<{ name: string; syntax?: string }> | null =>
    read<{ name: string; syntax?: string }>("paramHead", head);

/** One declaration: `name: value !important?` (name lowercased; value trimmed, flag removed). */
export const declaration = (row: string): Readonly<{ name: string; value: string; important: boolean }> | null =>
    read<{ name: string; value: string; important: boolean }>("declaration", row);

/**
 * The offset of the comma that closes an EMPTY item of a top-level comma list (the comma after
 * it, or the last comma when the list ends empty); `undefined` when every item is non-empty.
 */
export function emptyListComma(source: string): number | undefined {
    const parts = read<Readonly<Record<string, unknown>>[]>("commaSpans", source);
    if (!parts) return undefined;
    let item = "";
    let last: number | undefined;
    for (const part of parts) {
        if ("item" in part) {
            item = part.item as string;
            continue;
        }
        const comma = part.comma as number;
        if (!item) return comma;
        last = comma;
        item = "";
    }
    return last !== undefined && !item ? last : undefined;
}

/** `scroll(…)` / `view(…)`'s argument runs; `null` when the text is not that function. */
export const timelineArgs = (kind: "scroll" | "view", source: string): readonly string[] | null =>
    read<string[]>(kind === "scroll" ? "scrollFn" : "viewFn", source);

/** The text opens a timeline (`auto`, `none`, a `--name`, `scroll(`, `view(`). */
export const opensTimeline = (token: string): boolean => matches("timelineLead", token);

/** `auto` or a length-percentage — a timeline inset or a range offset. */
export const isTimelineLength = (token: string): boolean => matches("timelineLength", token);

/** A `<dashed-ident>` (`--name`). */
export const isDashedIdent = (token: string): boolean => matches("dashedIdent", token);
