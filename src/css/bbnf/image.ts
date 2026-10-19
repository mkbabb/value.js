// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.i` — the css-images-4 image functions a VALUE LIST reads as generic calls (the gradients,
// `image()`, `image-set()`) checked against their signatures over the call the grammar built, as
// `./color5` checks `alpha()` and `./calc` a math function: the colours stay as authored, the call stays
// the call it is, and a call that breaks its signature is refused. `element()`'s one valid form is a
// grammar leaf (`value.bbnf` `typeCall`, an `<id-selector>`); a generic call named `element` is refused.
// Grammar rules for the gradient preambles would cost far more than the E-6 headroom left (104 B gzip at
// `.t`; `.v`/`.t` moved their signature checks into actions for the same reason). A call holding an
// arbitrary substitution function is never checked (css-variables-1 §3).

import type { CssCall, CssValue } from "../../value";
import { type Base, MATH_FUNCTION, baseOf, substitutes } from "./calc";
import { isColor } from "./color5";

const lower = (s: string): string => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
const word = (v: CssValue | undefined): string | null =>
    v?.kind === "scalar" && v.payload.type === "keyword" ? lower(v.payload.value) : null;
/** A space list's items, or the one value. */
const words = (v: CssValue): readonly CssValue[] | null =>
    v.kind !== "list" ? [v] : v.separator === "space" ? v.items : null;

/**
 * A `<T>` or `<T-percentage>` position (`length`, `angle`, `resolution`): a number token or a math
 * function of that type, a percentage when `percent`, or the literal `0` (`<zero>`) for a length or an
 * angle. `min` bounds a literal (`<length [0,∞]>`).
 */
function typed(v: CssValue | undefined, base: Base, percent: boolean, min = -Infinity): boolean {
    if (v === undefined) return false;
    if (v.kind === "call" && !MATH_FUNCTION.test(v.name)) return false;
    if (v.kind === "scalar" && v.payload.type === "number") {
        const { value, unit } = v.payload;
        if (value < min) return false;
        if (unit === "" && value === 0 && base !== "resolution") return true;
    } else if (v.kind !== "call") return false;
    const t = baseOf(v);
    //  Where no percentage is allowed, a calculation may hold none (css-values-4 §10.8.1: its percent hint
    //  resolves only where the context resolves percentages): `from calc(50% + 30deg)`.
    return t === base || t === "any" ? percent || !holdsPercent(v) : percent && t === "percent";
}
/** Whether a calculation holds a percentage token outside a nested non-math function. */
const holdsPercent = (v: CssValue): boolean =>
    v.kind === "scalar" ? v.payload.type === "number" && v.payload.unit === "%"
        : v.kind === "list" ? v.items.some(holdsPercent)
            : (v.name === "" || MATH_FUNCTION.test(v.name)) && v.args.some(holdsPercent);
const lp = (v: CssValue | undefined, min?: number) => typed(v, "length", true, min);

/** css-color-4 §12 spaces; a polar space may carry a `<hue-interpolation-method>`. */
const RECTANGULAR = /^(?:srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65)$/;
const POLAR = /^(?:hsl|hwb|lch|oklch)$/;
const HUE = /^(?:shorter|longer|increasing|decreasing)$/;

/**
 * The words of a `<color-interpolation-method>` (css-color-4 §12.1) starting at `in`: how many it
 * spans, or 0 when it is malformed. `in [ <rectangular-color-space> | <polar-color-space>
 * <hue-interpolation-method>? | <custom-color-space> ]`, the custom space a `<dashed-ident>` (css-color-5).
 */
export function method(ws: readonly CssValue[], at: number): number {
    const space = word(ws[at + 1]);
    if (space === null) return 0;
    if (RECTANGULAR.test(space) || space.startsWith("--")) return 2;
    if (!POLAR.test(space)) return 0;
    const hue = word(ws[at + 2]);
    return hue !== null && HUE.test(hue) ? (word(ws[at + 3]) === "hue" ? 4 : 0) : 2;
}

/** Whether a word is a `<position>` keyword of the given axis (`center` is either axis's). */
const xWord = (w: string | null | undefined, center = true) => w != null && ((center && w === "center") || /^(?:left|right)$/.test(w));
const yWord = (w: string | null | undefined, center = true) => w != null && ((center && w === "center") || /^(?:top|bottom)$/.test(w));

/** css-values-4 §9.3 `<position>`: one, two or four values (a three-value form is no `<position>`). */
function isPosition(ws: readonly CssValue[]): boolean {
    const [a, b, c, d] = ws.map(word);
    const [p, q, , t] = ws;
    if (ws.length === 1) return a === null ? lp(p) : xWord(a) || yWord(a);
    if (ws.length === 2) {
        if ((a === null ? lp(p) : xWord(a)) && (b === null ? lp(q) : yWord(b))) return true;
        return yWord(a) && xWord(b);
    }
    if (ws.length !== 4 || b !== null || d !== null || !lp(q) || !lp(t)) return false;
    return (xWord(a, false) && yWord(c, false)) || (yWord(a, false) && xWord(c, false));
}

const EXTENT = /^(?:closest-corner|closest-side|farthest-corner|farthest-side)$/;

/** The geometry before an interpolation method, by gradient kind (css-images-4 §3.1–§3.3). */
function geometry(kind: string, ws: readonly CssValue[]): boolean {
    const k = ws.map(word);
    if (kind === "linear") {
        if (ws.length === 0) return true;
        if (k[0] !== "to") return ws.length === 1 && typed(ws[0], "angle", false);
        const [, s, t] = k;
        if (ws.length === 2) return xWord(s, false) || yWord(s, false);
        return ws.length === 3 && ((xWord(s, false) && yWord(t, false)) || (yWord(s, false) && xWord(t, false)));
    }
    const at = k.indexOf("at");
    const head = at < 0 ? ws : ws.slice(0, at);
    if (at >= 0 && !isPosition(ws.slice(at + 1))) return false;
    if (kind === "conic") return head.length === 0 || (head.length === 2 && k[0] === "from" && typed(head[1], "angle", false));
    // radial: `[ <radial-shape> || <radial-size> ]?`; a circle's size is an extent or one length, an
    // ellipse's an extent or two length-percentages, an omitted shape follows the size's count (§3.2).
    const hk = head.map(word);
    const shapes = hk.filter((w) => w === "circle" || w === "ellipse");
    if (shapes.length > 1) return false;
    const shape = shapes[0];
    const size = shape === undefined ? head : hk[0] === shape ? head.slice(1) : hk[hk.length - 1] === shape ? head.slice(0, -1) : null;
    if (size === null || size.length > 2) return false;
    if (size.length === 0) return true;
    const sk = size.map(word);
    if (size.length === 1) return sk[0] != null ? EXTENT.test(sk[0]) : shape !== "ellipse" && typed(size[0], "length", false, 0);
    return shape !== "circle" && lp(size[0], 0) && lp(size[1], 0);
}

/** The first argument when it is no colour stop: the geometry and the interpolation method, in either order. */
function preamble(kind: string, arg: CssValue): boolean {
    const ws = words(arg);
    if (ws === null) return false;
    const i = ws.findIndex((v) => word(v) === "in");
    if (i < 0) return ws.length > 0 && geometry(kind, ws);
    const n = method(ws, i);
    if (n === 0 || (i !== 0 && i + n !== ws.length)) return false;
    return geometry(kind, [...ws.slice(0, i), ...ws.slice(i + n)]);
}

/** A colour stop: `<color> && <T-percentage>{1,2}?`; or, `hint`, one position alone. */
function stop(v: CssValue, base: Base): "stop" | "hint" | null {
    const ws = words(v);
    if (ws === null) return null;
    const c = ws.findIndex(isColor);
    const at = (p: CssValue) => typed(p, base, true);
    const [only] = ws;
    if (c < 0) return ws.length === 1 && only !== undefined && at(only) ? "hint" : null;
    const rest = [...ws.slice(0, c), ...ws.slice(c + 1)];
    return rest.length <= 2 && (c === 0 || c === ws.length - 1) && rest.every(at) ? "stop" : null;
}

/** A `<color-stop-list>` (§3.4): stops, a hint only between two stops. */
function stopList(items: readonly CssValue[], base: Base): boolean {
    const kinds = items.map((v) => stop(v, base));
    return kinds.length > 0 && kinds.every((s, i) =>
        s === "stop" || (s === "hint" && kinds[i - 1] === "stop" && kinds[i + 1] === "stop"));
}

const GRADIENT = /^(?:repeating-)?(linear|radial|conic)-gradient$/;
const IMAGE_TAG = /^(?:ltr|rtl)$/;

/** An `<image>` (css-images-4 §2): a url, an image function, a gradient. */
const isImage = (v: CssValue): boolean =>
    v.kind === "call" && /^(?:url|src|image|image-set|cross-fade|element|paint|(?:repeating-)?(?:linear|radial|conic)-gradient)$/.test(lower(v.name));
const isString = (v: CssValue | undefined): boolean => v?.kind === "scalar" && v.payload.type === "keyword" && /^["']/.test(v.payload.value);

/** `image( <image-tags>? [ <image-src>? , <color>? ]! )` (css-images-4 §2.5): a tag, a source, a colour. */
function imageFn(args: readonly CssValue[]): boolean {
    const [first, second] = args;
    if (first === undefined || args.length > 2) return false;
    const ws = words(first);
    if (ws === null) return false;
    const tagged = IMAGE_TAG.test(word(ws[0]) ?? "");
    const lead = tagged ? ws.slice(1) : ws;
    const src = (v: CssValue | undefined) => isString(v) || (v?.kind === "call" && /^(?:url|src)$/i.test(v.name));
    if (lead.length > 1) return false;
    const [main] = lead;
    if (second !== undefined) return src(main) && isColor(second);
    return main !== undefined && (src(main) || isColor(main));
}

/** `image-set( [ [ <image> | <string> ] [ <resolution> || type(<string>) ]? ]# )` (css-images-4 §2.2). */
function imageSet(args: readonly CssValue[]): boolean {
    return args.length > 0 && args.every((a) => {
        const ws = words(a);
        if (ws === null || ws.length > 3) return false;
        const [img, ...rest] = ws;
        if (img === undefined || !(isImage(img) || isString(img))) return false;
        const res = rest.filter((v) => typed(v, "resolution", false, 0));
        const type = rest.filter((v) => v.kind === "call" && lower(v.name) === "type");
        return res.length <= 1 && type.length <= 1 && res.length + type.length === rest.length;
    });
}

/**
 * Whether a call this module governs keeps its signature (any other call does). `element()` read as a
 * generic call is never its `<id-selector>` form, which the grammar's own leaf reads.
 */
export function keepsImageSignature(call: CssCall): boolean {
    const name = lower(call.name);
    if (name === "element") return false;
    const gradient = GRADIENT.exec(name);
    if (gradient === null && name !== "image" && name !== "image-set") return true;
    if (substitutes(call)) return true;
    if (name === "image") return imageFn(call.args);
    if (name === "image-set") return imageSet(call.args);
    const kind = gradient?.[1] ?? "";
    const base: Base = kind === "conic" ? "angle" : "length";
    const [first, ...rest] = call.args;
    if (first === undefined) return false;
    return stop(first, base) === "stop" ? stopList(call.args, base) : preamble(kind, first) && stopList(rest, base);
}
