/**
 * The named snap — a colour within a just-noticeable difference of a named
 * colour IS that colour, and resolves to its name.
 *
 * Owner 2026-10-19: "named parse colors, within a certain error margin,
 * automatically switch to their named counterparts when parsed". The picker
 * did this until a68ecdc1c (V-A73 C1, 2026-07-17): it compared XYZ strings
 * rounded to two digits — an error margin by accident of the rounding grid,
 * anisotropic, and blind across a rounding boundary — against the CSS names
 * and the approved custom names. The v4 migration dropped the CSS half and
 * moved the custom half onto full-precision equality, so only a bit-identical
 * colour kept its name. This restores the margin at its root, in the space the
 * margin is defined in.
 *
 * THE THRESHOLD. ΔE_OK (Euclidean distance in OKLab) ≤ 0.02. CSS Color 4 §13
 * (gamut mapping) fixes the just-noticeable difference in this metric at
 * exactly 0.02 (`JND = 0.02`): two colours closer than that are, by the
 * specification's own measure, not told apart. A colour inside that ball of a
 * named colour reads as the name; one outside it reads as its own value. The
 * nearest name wins, and on an exact tie the CSS keyword wins (the order the
 * pre-v4 resolver checked them in), then the earlier entry (CSS aliases such
 * as `aqua`/`cyan` resolve to the alphabetically first).
 *
 * ALPHA. The names are opaque (save `transparent`), so a translucent colour is
 * not its opaque namesake: the alpha must match within 0.01 as well.
 */
import { NAMED_COLORS } from "@mkbabb/value.js/color";
import { convertPickerColor, parsePickerColor, type PickerColor } from "./picker-color";

/** CSS Color 4 §13's JND in ΔE_OK. */
export const NAME_SNAP_DELTA_E_OK = 0.02;
/** The alpha tolerance: one part in a hundred (the picker's alpha least count). */
export const NAME_SNAP_ALPHA_TOLERANCE = 0.01;

export type NamedColorSource = "css" | "custom";

export interface NamedColorEntry {
    /** The name as it is shown (a CSS keyword, or an approved name's key). */
    readonly name: string;
    readonly source: NamedColorSource;
    readonly l: number;
    readonly a: number;
    readonly b: number;
    readonly alpha: number;
}

export interface NamedColorMatch {
    readonly entry: NamedColorEntry;
    readonly deltaE: number;
}

function alphaOf(color: PickerColor): number {
    return color.alpha === "none" ? 0 : color.alpha;
}

/** A colour's OKLab coordinates + alpha — the snap's one projection. */
export function toSnapPoint(color: PickerColor): { l: number; a: number; b: number; alpha: number } {
    const lab = convertPickerColor(color, "oklab");
    const [l, a, b] = lab.channels.map((channel) => (typeof channel === "number" ? channel : 0));
    return { l: l!, a: a!, b: b!, alpha: alphaOf(color) };
}

/** Build one entry from a CSS colour string; `undefined` when it does not parse. */
export function namedColorEntry(
    name: string,
    css: string,
    source: NamedColorSource,
): NamedColorEntry | undefined {
    try {
        return { name, source, ...toSnapPoint(parsePickerColor(css)) };
    } catch {
        return undefined;
    }
}

/**
 * The CSS named colours, projected ONCE at module load (148 entries, from the
 * library's own table — the same one the parser reads).
 */
export const CSS_NAMED_COLOR_ENTRIES: readonly NamedColorEntry[] = Object.keys(NAMED_COLORS)
    .sort()
    .flatMap((name) => namedColorEntry(name, NAMED_COLORS[name]!, "css") ?? []);

/**
 * The nearest named colour within the margin, or `undefined`. Linear over the
 * entries (≈150 + the approved names): a handful of multiply-adds each, run
 * once per debounced colour change.
 */
export function nearestNamedColor(
    color: PickerColor,
    entries: readonly NamedColorEntry[],
    threshold: number = NAME_SNAP_DELTA_E_OK,
): NamedColorMatch | undefined {
    let point: ReturnType<typeof toSnapPoint>;
    try {
        point = toSnapPoint(color);
    } catch {
        return undefined;
    }
    let best: NamedColorEntry | undefined;
    let bestDistance = Infinity;
    for (const entry of entries) {
        if (Math.abs(entry.alpha - point.alpha) > NAME_SNAP_ALPHA_TOLERANCE) continue;
        const dl = entry.l - point.l;
        const da = entry.a - point.a;
        const db = entry.b - point.b;
        const distance = Math.sqrt(dl * dl + da * da + db * db);
        if (distance > threshold) continue;
        if (
            distance < bestDistance ||
            (distance === bestDistance && best?.source === "custom" && entry.source === "css")
        ) {
            best = entry;
            bestDistance = distance;
        }
    }
    return best ? { entry: best, deltaE: bestDistance } : undefined;
}
