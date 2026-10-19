// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.t` — the css-color-5 colour functions a VALUE LIST reads as calls (`color-mix()`, `alpha()`,
// `contrast-color()`): kept as the calls they are (their colours as authored, never computed), and
// checked against their signatures over the call the grammar built, as `./calc` checks a math function.
// `color-mix()`'s interpolation method is the colour grammar's own `mixMethod` (`value.bbnf` `mixCall`);
// its items, and `alpha()`'s and `contrast-color()`'s arguments, are checked here: grammar rules for the
// two measured +100–155 B gzip on the generated parser (14,515–14,570 B against the E-6 ceiling of 14,517,
// leaving the wave's later units nothing; `.v`'s request-modifier check moved into its action for the same
// reason). A call holding an arbitrary substitution function is never checked (css-variables-1 §3).

import type { CssCall, CssValue } from "../../value";
import { MATH_FUNCTION, substitutes } from "./calc";
import { keywordColor } from "./color";

const lower = (s: string): string => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
const keywordOf = (v: CssValue): string | null =>
    v.kind === "scalar" && v.payload.type === "keyword" ? lower(v.payload.value) : null;

/** A `<color>` position: a colour, a colour keyword (`currentcolor`, a system colour), or a function that is no math function. */
export const isColor = (v: CssValue): boolean =>
    v.kind === "call" ? !MATH_FUNCTION.test(v.name)
        : v.kind === "scalar" && (v.payload.type === "color" || (v.payload.type === "keyword" && keywordColor(v.payload.value).kind !== "invalid"));

/** A `color-mix()` percentage: `true` for a literal in [0, 100] or a math function, `false` for one out of range, `null` for no percentage. */
function percent(v: CssValue): boolean | null {
    if (v.kind === "call") return MATH_FUNCTION.test(v.name) ? true : null;
    if (v.kind !== "scalar" || v.payload.type !== "number" || v.payload.unit !== "%") return null;
    return v.payload.value >= 0 && v.payload.value <= 100;
}

/** css-color-5 §3 `[ <color> && <percentage [0,100]>? ]`: one colour, and at most one percentage on either side of it. */
export function isMixItem(v: CssValue): boolean {
    if (v.kind !== "list") return isColor(v);
    if (v.separator !== "space" || v.items.length !== 2) return false;
    const [a, b] = v.items as readonly [CssValue, CssValue];
    const pa = percent(a);
    return pa !== null ? pa && isColor(b) : percent(b) === true && isColor(a);
}

/** The math constants (css-values-4 §10.7.1) and the operator tokens: what a calculation in `alpha()`'s alpha holds besides `alpha`. */
const CONSTANT = /^(?:e|pi|-?infinity|nan|[+*-])$/;

/** Whether every keyword inside `v` is `alpha`, a math constant or an operator (css-color-5 #relative-alpha: `alpha()`'s one channel keyword). */
function alphaOnly(v: CssValue): boolean {
    if (v.kind === "scalar") {
        const k = keywordOf(v);
        return k === null ? v.payload.type !== "color" : k === "alpha" || CONSTANT.test(k);
    }
    return (v.kind === "call" ? v.args : v.items).every(alphaOnly);
}

/** `alpha()`'s alpha: `none`, `alpha`, a number or percentage, or a function (a math function holding no other channel keyword). */
function isAlpha(v: CssValue): boolean {
    if (v.kind === "call") return !MATH_FUNCTION.test(v.name) || alphaOnly(v);
    const k = keywordOf(v);
    if (k !== null) return k === "none" || k === "alpha";
    return v.kind === "scalar" && v.payload.type === "number" && (v.payload.unit === "" || v.payload.unit === "%");
}

/**
 * Whether a call this module governs keeps its signature (any other call does):
 * `alpha( from <color> / <alpha-value> | none | alpha )` (css-color-5 #relative-alpha) and
 * `contrast-color( <color> )` (css-color-5 #contrast-color).
 */
export function keepsSignature(call: CssCall): boolean {
    const name = lower(call.name);
    if (name !== "alpha" && name !== "contrast-color") return true;
    if (substitutes(call)) return true;
    const [arg] = call.args;
    if (call.args.length !== 1 || arg === undefined) return false;
    if (name === "contrast-color") return isColor(arg);
    if (arg.kind !== "list" || arg.separator !== "slash" || arg.items.length !== 2) return false;
    const [head, alpha] = arg.items as readonly [CssValue, CssValue];
    if (head.kind !== "list" || head.separator !== "space" || head.items.length !== 2) return false;
    const [from, color] = head.items as readonly [CssValue, CssValue];
    return keywordOf(from) === "from" && isColor(color) && isAlpha(alpha);
}
