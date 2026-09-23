/**
 * `serializeCssValue` — the canonical inverse of `parseCssValue`.
 *
 * Published on `./css` at X-W9.d (G15): keyframes.js re-implemented it at
 * `src/animation/compile/emit/css-text.ts` because the library withheld it,
 * and the two copies diverged. It joins the `Result` idiom BEFORE it is
 * exported: a `CssValue` can carry a colour in a space CSS cannot spell
 * (`hsv`, `kelvin`, `ictcp`, `jzazbz` — `AnyColor` is wider than `CssColor`),
 * and a public entry may not answer that with a thrown `TypeError`.
 *
 * `ParseResult` (text -> AST) and `Result` (value -> value) stay declared per
 * boundary and are never unified (PSL-3): this is a value -> value transform,
 * so it answers in `Result`, and it carries `serializeCssColor`'s own
 * `ColorIssue` rather than inventing a second error vocabulary.
 *
 * A pure leaf: it imports no split sibling, and both `./rules` and
 * `./stylesheet` are free to import it.
 */
import type { ColorIssue } from "../color/index";
import { isAnyColor } from "../color/index";
import type { Result } from "../foundation/result";
import { err, ok } from "../foundation/result";
import type { Alpha, Channel, CssValue } from "../value";
import type { CssColor, CssColorSpace, KeyframeSelector } from "./types";

// `serializeCssColor` and `serializeKeyframeSelector` were carried by `./grammar`, the hand-rolled
// parser X.P.W6.x deleted; they write values and read no CSS text, so they moved here unchanged —
// beside `serializeCssValue`, the third inverse of a `./css` parse entry.

const CSS_COLOR_SPACES = new Set<CssColorSpace>([
    "rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch", "xyz",
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020",
]);

const format = (value: Channel): string => value === "none"
    ? value
    : Number(value.toFixed(12)).toString();
const angle = (value: Channel): string => value === "none" ? value : `${format(value)}deg`;
const alphaSuffix = (alpha: Alpha): string => alpha === 1 ? "" : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;

export function serializeCssColor(color: CssColor): Result<string, ColorIssue> {
    if (!isAnyColor(color) || !CSS_COLOR_SPACES.has(color.space as CssColorSpace)) {
        return err({ code: "color_invalid_input" });
    }
    if (color.channels.some((channel) => channel !== "none" && !Number.isFinite(channel))
        || (color.alpha !== "none" && !Number.isFinite(color.alpha))) {
        return err({ code: "color_non_finite" });
    }
    if (color.alpha !== "none" && (color.alpha < 0 || color.alpha > 1)) {
        return err({ code: "color_out_of_range" });
    }
    const [a, b, c] = color.channels as readonly [Channel, Channel, Channel];
    const alpha = alphaSuffix(color.alpha);
    switch (color.space) {
        case "rgb": return ok(`rgb(${format(a)} ${format(b)} ${format(c)}${alpha})`);
        case "hsl": return ok(`hsl(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
        case "hwb": return ok(`hwb(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
        case "lab": return ok(`lab(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${format(c)}${alpha})`);
        case "lch": return ok(`lch(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${angle(c)}${alpha})`);
        case "oklab": return ok(`oklab(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${format(c)}${alpha})`);
        case "oklch": return ok(`oklch(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${angle(c)}${alpha})`);
        case "xyz": return ok(`color(xyz ${format(a)} ${format(b)} ${format(c)}${alpha})`);
        default: return ok(`color(${color.space} ${format(a)} ${format(b)} ${format(c)}${alpha})`);
    }
}

/** Internal canonical spelling used by selector round-trip probes and emitters. */
export function serializeKeyframeSelector(selector: KeyframeSelector): string {
    if (selector.kind === "percent") return `${format(selector.value * 100)}%`;
    return selector.offset === undefined
        ? selector.name
        : `${selector.name} ${format(selector.offset * 100)}%`;
}

export function serializeCssValue(value: CssValue): Result<string, ColorIssue> {
    if (value.kind === "scalar") {
        const payload = value.payload;
        if (payload.type === "number") return ok(`${payload.value}${payload.unit}`);
        if (payload.type === "keyword") return ok(payload.value);
        return serializeCssColor(payload.value as CssColor);
    }
    const items = value.kind === "call" ? value.args : value.items;
    const parts: string[] = [];
    for (const item of items) {
        const part = serializeCssValue(item);
        if (!part.ok) return part;
        parts.push(part.value);
    }
    if (value.kind === "call") return ok(`${value.name}(${parts.join(", ")})`);
    const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
    const joined = parts.join(separator);
    // A space-separated list is how `if(supports(color: red): red; else: blue)`
    // parses — `:` and `;` arrive as their own keyword tokens, and a plain
    // space join would emit `color : red` and lose the source. This is the ONE
    // place the two serializers disagree (G15): keyframes' fork has no such
    // step, so it mangles every `if()` condition it is handed. Measured, with
    // the witness, in `evidence/W9/serialize-differential.txt`.
    return ok(value.separator === "space" ? joined.replace(/\s+([:;])/g, "$1") : joined);
}
