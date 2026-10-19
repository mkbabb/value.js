// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.f` — css-fonts-4 `palette-mix()` (#typedef-font-palette-mix), which a VALUE LIST reads as a
// generic call, checked against its signature over the call the grammar built, as `./image` checks the
// css-images-4 functions and `./color5` `alpha()`: the call stays as authored, and a call that breaks
// its signature is refused. A call holding an arbitrary substitution function is never checked
// (css-variables-1 §3).
//
//   palette-mix() = palette-mix( <color-interpolation-method>? ,
//                                [ [ normal | light | dark | <palette-identifier> | <palette-mix()> ]
//                                  && <percentage [0,100]>? ]# )
//
// `<palette-identifier>` is a `<dashed-ident>`; the `<color-interpolation-method>` is css-color-4 §12.1's
// (`./image` `method`), and when present it is the first argument, a comma after it.

import type { CssCall, CssValue } from "../../value";
import { MATH_FUNCTION, substitutes } from "./calc";
import { method } from "./image";

const lower = (s: string): string => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
const word = (v: CssValue): string | null =>
    v.kind === "scalar" && v.payload.type === "keyword" ? lower(v.payload.value) : null;

/** `normal | light | dark | <palette-identifier> | <palette-mix()>` (the nested call already kept its own signature). */
const isPalette = (v: CssValue): boolean => {
    if (v.kind === "call") return lower(v.name) === "palette-mix";
    const w = word(v);
    return w !== null && (/^(?:normal|light|dark)$/.test(w) || /^--./.test(w));
};
/** `<percentage [0,100]>`: a literal in range, or a math function (its range is checked when computed). */
const isPercent = (v: CssValue): boolean =>
    v.kind === "call" ? MATH_FUNCTION.test(v.name)
        : v.kind === "scalar" && v.payload.type === "number" && v.payload.unit === "%" && v.payload.value >= 0 && v.payload.value <= 100;

/** `[ <palette> && <percentage [0,100]>? ]`: the palette, and at most one percentage on either side of it. */
function isItem(v: CssValue): boolean {
    if (v.kind !== "list") return isPalette(v);
    if (v.separator !== "space" || v.items.length !== 2) return false;
    const [a, b] = v.items as readonly [CssValue, CssValue];
    return (isPalette(a) && isPercent(b)) || (isPercent(a) && isPalette(b));
}

/** Whether a call this module governs (`palette-mix()`) keeps its signature (any other call does). */
export function keepsPaletteSignature(call: CssCall): boolean {
    if (lower(call.name) !== "palette-mix" || substitutes(call)) return true;
    const [first, ...rest] = call.args;
    if (first === undefined) return false;
    const ws = first.kind === "list" && first.separator === "space" ? first.items : [first];
    const head = ws[0] !== undefined && word(ws[0]) === "in";
    if (head && method(ws, 0) !== ws.length) return false;
    const items = head ? rest : call.args;
    return items.length > 0 && items.every(isItem);
}
