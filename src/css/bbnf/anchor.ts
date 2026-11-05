// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.k10` (d) (XP-13) — css-anchor-position-1 `anchor()` and `anchor-size()` (§3.2, §4.1), which a
// VALUE LIST reads as generic calls, checked against their signatures over the call the grammar built, as
// `./palette` checks `palette-mix()`: the call stays as authored, and a call that breaks its signature is
// refused. A call holding an arbitrary substitution function is never checked (css-variables-1 §3). Which
// properties admit either function is the property's grammar (DR-a).
//
//   anchor()      = anchor( <anchor-name>? && <anchor-side>, <length-percentage>? )
//   anchor-size() = anchor-size( [ <anchor-name> || <anchor-size> ]? , <length-percentage>? )   (the comma
//                   elided with an omitted first argument, css-values-4 §2.6)
//   <anchor-side> = inside | outside | top | left | right | bottom | start | end | self-start | self-end
//                 | <percentage> | center
//   <anchor-size> = width | height | block | inline | self-block | self-inline
//
// `<anchor-name>` is a `<dashed-ident>`. A nested `anchor()` / `anchor-size()` has kept its own signature
// already (a call is built after its arguments).

import type { CssCall, CssValue } from "../../value";
import { baseOf, substitutes } from "./calc";

const ANCHOR = /^(?:anchor|anchor-size)$/i;
const SIDE = /^(?:inside|outside|top|left|right|bottom|start|end|self-start|self-end|center)$/i;
const SIZE = /^(?:width|height|block|inline|self-block|self-inline)$/i;
const NAME = /^--./;

const keyword = (v: CssValue): string | null => (v.kind === "scalar" && v.payload.type === "keyword" ? v.payload.value : null);
const isPercentage = (v: CssValue): boolean =>
    v.kind === "scalar" ? v.payload.type === "number" && v.payload.unit === "%" : v.kind === "call" && baseOf(v) === "percent";

/** `<length-percentage>`: a literal (unitless zero included), a calculation of that type, or a nested anchor function. */
function isLengthPercentage(v: CssValue): boolean {
    if (v.kind === "call" && ANCHOR.test(v.name)) return true;
    if (v.kind === "scalar" && v.payload.type === "number" && v.payload.unit === "" && v.payload.value === 0) return true;
    const base = v.kind === "list" ? null : baseOf(v);
    return base === "length" || base === "percent" || (base === "any" && v.kind === "call");
}

/** The first argument's tokens: at most one `<anchor-name>`, and the rest the function's own term, each at most once. */
function lead(v: CssValue, term: (t: CssValue) => boolean, needsTerm: boolean): boolean {
    const tokens = v.kind === "list" && v.separator === "space" ? v.items : [v];
    const names = tokens.filter((t) => NAME.test(keyword(t) ?? ""));
    const terms = tokens.filter(term);
    return names.length <= 1 && terms.length <= 1 && names.length + terms.length === tokens.length
        && (needsTerm ? terms.length === 1 : tokens.length > 0);
}

export function keepsAnchorSignature(call: CssCall): boolean {
    if (!ANCHOR.test(call.name) || substitutes(call)) return true;
    const [first, fallback, ...rest] = call.args;
    if (rest.length > 0) return false;
    if (fallback !== undefined && !isLengthPercentage(fallback)) return false;
    if (/^anchor$/i.test(call.name)) return first !== undefined && lead(first, (t) => SIDE.test(keyword(t) ?? "") || isPercentage(t), true);
    //  With its first argument omitted, `anchor-size()`'s comma is too (css-values-4 §2.6, the comma rule): `anchor-size(10px)`.
    return first === undefined || lead(first, (t) => SIZE.test(keyword(t) ?? ""), false) || (fallback === undefined && isLengthPercentage(first));
}
