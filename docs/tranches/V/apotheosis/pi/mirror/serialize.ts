import {
    isAnyColor,
    type Alpha,
    type Channel,
    type ColorIssue,
} from "./deps/color-model.js";
import { err, ok, type Result } from "./deps/foundation.js";
import type { CssValue } from "./deps/value-types.js";
import type { CssColor, CssColorSpace } from "./types.js";

const CSS_COLOR_SPACES = new Set<CssColorSpace>([
    "rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch", "xyz",
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020",
]);

const format = (value: Channel): string => value === "none"
    ? value
    : Number(value.toFixed(12)).toString();
const angle = (value: Channel): string => value === "none" ? value : `${format(value)}deg`;
const alphaSuffix = (alpha: Alpha): string => alpha === 1
    ? ""
    : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;

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

export function serializeCssValue(value: CssValue): string {
    if (value.kind === "scalar") {
        if (value.payload.type === "number") return `${value.payload.value}${value.payload.unit}`;
        if (value.payload.type === "keyword") return value.payload.value;
        const serialized = serializeCssColor(value.payload.value as CssColor);
        if (!serialized.ok) throw new TypeError(`Cannot serialize CSS color: ${serialized.error.code}`);
        return serialized.value;
    }
    if (value.kind === "call") return `${value.name}(${value.args.map(serializeCssValue).join(", ")})`;
    const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
    const result = value.items.map(serializeCssValue).join(separator);
    return value.separator === "space" ? result.replace(/\s+([:;])/g, "$1") : result;
}
