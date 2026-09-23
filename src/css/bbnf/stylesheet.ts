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

/** One list item: the text of a `*Run`, tagged so the list action finds it at any depth. */
type Item = Readonly<{ item: string }>;
const isItem = (value: unknown): value is Item =>
    typeof value === "object" && value !== null && !Array.isArray(value) && typeof (value as Item).item === "string";

/**
 * A list's items in order. parse-that drops an `undefined` (an unmatched optional) from a
 * sequence's value, so the list's shape is not positional; every item is tagged by its run's action
 * and collected wherever it sits.
 */
function itemsOf(value: unknown): string[] {
    if (isItem(value)) return [value.item];
    return Array.isArray(value) ? value.flatMap(itemsOf) : [];
}

/** Attaches `stylesheet.bbnf`'s actions: each run is its trimmed text; a list, its non-empty runs. */
export function attachStylesheetActions(rules: Rules): void {
    const on = <T>(name: string, action: (value: never) => T): void => {
        rules[name] = ruleOf(rules, name).map(action as (value: unknown) => T);
    };
    for (const run of ["commaRun", "semiRun", "spaceRun"]) on(run, (value: unknown): Item => ({ item: textOf(value).trim() }));
    for (const list of ["commaItems", "semiItems", "spaceItems"]) {
        on(list, (value: unknown): readonly string[] => itemsOf(value).filter(Boolean));
    }
}
