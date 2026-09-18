// DOM/layout pixel-resolution helpers — the C5-era viewport, font-metric, and
// container-query length-unit resolvers.
//
// S.W1 W1-8 (god-module cohesion split): lifted from `units/utils.ts` (the
// census's "genuinely mixed concerns" verdict). These five helpers query the
// LIVE DOM (getComputedStyle / window / document / OffscreenCanvas) to resolve
// the newer relative length families, while the rest of `utils.ts` is pure unit
// math + the flatten/unflatten tree walk. `convertToPixels` (the dispatcher) +
// the pure-math `convertAbsoluteUnitToPixels` STAY in `utils.ts` and import
// these; per the wave census the extraction improves cohesion but does NOT
// purify the utils.ts remainder of DOM (convertToPixels' own em/rem/vh/ch/ex
// branches touch the DOM too) — so utils.ts stays over-cap by construction (the
// booked cap-check ledger row). Zero module imports here — pure DOM globals +
// the `HTMLElement` type.

export function findQueryContainer(element: HTMLElement): HTMLElement | null {
    let el = element.parentElement;
    while (el) {
        const ct = getComputedStyle(el).containerType;
        if (ct === "inline-size" || ct === "size") {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

export function isVerticalWritingMode(el: HTMLElement): boolean {
    const wm = getComputedStyle(el).writingMode;
    return wm?.startsWith("vertical") || wm?.startsWith("sideways") || false;
}

/**
 * Every relative length unit that has a resolution branch in `convertToPixels`
 * or its helpers. A declared relative unit absent from this set has no
 * conversion and triggers the C5 fail-loud guard rather than a silent no-op.
 */
export const HANDLED_RELATIVE_UNITS = new Set<string>([
    // font-relative (need an element / documentElement)
    "em", "rem", "ch", "ex", "cap", "ic", "lh", "rlh",
    // viewport + writing-mode (need window)
    "vw", "vh", "vmin", "vmax", "vi", "vb",
    "svw", "svh", "svi", "svb", "svmin", "svmax",
    "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
    "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
    // container-query (need a query container)
    "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
]);

/**
 * Resolve a viewport-relative length unit to pixels (C5).
 *
 * Covers the three CSS viewport variants — `sv*` (small, against
 * `visualViewport`), `lv*`/`dv*` (large/dynamic, against `innerWidth`/
 * `innerHeight`) — plus the writing-mode-relative `vi`/`vb`/`*vi`/`*vb`. Each
 * was previously a silent no-op (`50dvh` → `50px`). The `min`/`max` axes pick
 * the smaller/larger of the two physical dimensions per spec.
 *
 * `vh`/`vw`/`vmin`/`vmax` keep their existing branches in `convertToPixels`;
 * this handles their `s`/`l`/`d`-prefixed and inline/block siblings.
 *
 * Returns `null` when `unit` is not a recognised viewport unit, so the caller
 * can fall through to other unit families / the fail-loud guard.
 */
export function convertViewportUnitToPixels(
    value: number,
    unit: string,
    element?: HTMLElement,
): number | null {
    const m = /^(sv|lv|dv|v)(w|h|i|b|min|max)$/.exec(unit);
    if (!m) return null;

    const variant = m[1]; // sv | lv | dv | v
    const axis = m[2]; // w | h | i | b | min | max

    // The `v` (no-prefix) variants other than the inline/block pair are already
    // handled by convertToPixels' dedicated branches; only `vi`/`vb` reach here.
    let width: number;
    let height: number;
    if (variant === "sv") {
        const vv = typeof window !== "undefined" ? window.visualViewport : undefined;
        width = vv?.width ?? window.innerWidth;
        height = vv?.height ?? window.innerHeight;
    } else {
        // lv / dv / v — the large/dynamic/default viewport.
        width = window.innerWidth;
        height = window.innerHeight;
    }

    // Inline/block resolve against writing mode; default horizontal when no
    // element is available (inline = horizontal = width, block = vertical = height).
    const isVertical = element ? isVerticalWritingMode(element) : false;

    let basis: number;
    switch (axis) {
        case "w":
            basis = width;
            break;
        case "h":
            basis = height;
            break;
        case "i":
            basis = isVertical ? height : width;
            break;
        case "b":
            basis = isVertical ? width : height;
            break;
        case "min":
            basis = Math.min(width, height);
            break;
        default: // max
            basis = Math.max(width, height);
            break;
    }

    return value * (basis / 100);
}

/**
 * Resolve a font-metric-relative length unit to pixels (C5): `cap`, `ic`,
 * `lh`, `rlh`. These previously no-op'd to raw px. Approximated from the
 * element's (or root's) computed font/line-height, mirroring the existing
 * `ex`/`ch` canvas-metric approach. Returns `null` for unrecognised units.
 */
export function convertFontMetricUnitToPixels(
    value: number,
    unit: string,
    element?: HTMLElement,
): number | null {
    const styleEl =
        unit === "rlh"
            ? typeof document !== "undefined"
                ? document.documentElement
                : undefined
            : element;
    if (!styleEl) return null;

    const cs = getComputedStyle(styleEl);
    const fontSize = parseFloat(cs.fontSize) || 16;

    switch (unit) {
        case "lh":
        case "rlh": {
            const lh = parseFloat(cs.lineHeight);
            // `normal` line-height parses to NaN; approximate as 1.2 × font-size.
            const resolved = Number.isFinite(lh) ? lh : fontSize * 1.2;
            return value * resolved;
        }
        case "cap":
            // cap-height ≈ 0.7 × font-size (typical Latin cap-height ratio).
            return value * fontSize * 0.7;
        case "ic":
            // ideographic advance ≈ 1 × font-size (full-width glyph).
            return value * fontSize;
        default:
            return null;
    }
}
