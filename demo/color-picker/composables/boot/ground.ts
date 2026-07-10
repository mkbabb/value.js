/**
 * boot/ground — THE GRADIENT GROUND record (T.W2 · W2-2).
 *
 * The page boots INSIDE the last session's atmosphere (t-aurora-boot §2.1):
 * the pre-hydration ground is the derived-palette GRADIENT — never the
 * deepest stop as a flat slab (F-2's dark-mud + L≈0.35→0.6 luminance leap),
 * and never a persisted gradient STRING (M-11: an image ground and the
 * `<color>` @property cure do not otherwise compose).
 *
 * The mechanism is a FIXED template over registered per-stop properties:
 *
 *   body { background-image: linear-gradient(135deg,
 *       var(--saved-bg-0) 0%, var(--saved-bg-1) 33%,
 *       var(--saved-bg-2) 67%, var(--saved-bg-3) 100%); }
 *
 * — the template never changes shape; only the four registered `<color>`
 * stops move, each riding a 200ms transition that interpolates in OKLab
 * (CSS Color 4's default interpolation space for registered <color>
 * properties), so the boot crossfade, the discrete-pick transition (F-12),
 * and the scheme flip all blend chroma-honest by construction — like-with-
 * like can never desaturate through sRGB mud (F-4).
 *
 * PERSISTED SHAPE — `{ stops, scheme, deriveVersion }`, STOPS ONLY:
 *   - stops: exactly GROUND_STOP_COUNT hex colors (the derived palette);
 *   - scheme: the scheme the stops were derived under — the fouc-guard
 *     resolves the ACTIVE scheme FIRST and paints the persisted gradient
 *     only on a scheme+version match (never the other band's material —
 *     F-6's dark-first-run honesty);
 *   - deriveVersion: bumped when the derive's meaning changes, so a stale
 *     record from an older derive falls to the first-visit constants.
 *
 * The reader (index.html's fouc-guard boot script) carries a mirrored
 * shape-validated parse + the same literals — it runs pre-module, so it
 * cannot import this file; keep the two in lockstep (both cite this header).
 *
 * Pure module — no Vue. The reactive writer is useAtmosphere's sink.
 */

export const GROUND_STORE_KEY = "color-picker-ground";

/** Bump when the derive's material meaning changes (stale records fall to
 *  the first-visit constants — never a wrong-material paint). */
export const GROUND_RECORD_VERSION = 1;

/** The fixed template's stop count — the template never changes shape. */
export const GROUND_STOP_COUNT = 4;

export type GroundScheme = "light" | "dark";

export interface GroundRecord {
    stops: string[]; // GROUND_STOP_COUNT hex stops, deep → pale
    scheme: GroundScheme;
    deriveVersion: number;
}

/**
 * THE FIRST-VISIT CONSTANT PAIR — the DEFAULT seed's derived gradient, one
 * member per scheme, dark-honest by construction (F-6: a dark first run
 * boots inside a dark-band material, never a light-pink page).
 *
 * Generated from the LIVE first-visit sink writes (the exact stops
 * useAtmosphere derives for the default model's opaque seed — light = the
 * field's own resolved palette; dark = the producer derive's dark band).
 * Constant ≡ the sink's first write BY CONSTRUCTION, so a first visit never
 * shifts material when the sink lands. Regenerate when the default seed or
 * the producer derive changes (then bump GROUND_RECORD_VERSION).
 * index.html carries the same literals (the pre-module mirror).
 */
export const FIRST_VISIT_GROUND: Record<GroundScheme, readonly string[]> = {
    light: ["#b37290", "#df8ea7", "#ffb0b4", "#ffd0c8"],
    dark: ["#673255", "#944a62", "#ba696b", "#d6917c"],
};

/** Normalize a derived palette to the template's fixed stop count (the
 *  derive ships GROUND_STOP_COUNT by default; pad/trim defensively so the
 *  fixed template always has a full stop set). */
export function normalizeGroundStops(stops: readonly string[]): string[] {
    if (!stops.length) return [...FIRST_VISIT_GROUND.light];
    const out = stops.slice(0, GROUND_STOP_COUNT);
    const last = out[out.length - 1] ?? "#000000"; // unreachable ?? (out is non-empty)
    while (out.length < GROUND_STOP_COUNT) out.push(last);
    return out;
}

/** Build the persist record (stops normalized; never a gradient string). */
export function buildGroundRecord(
    stops: readonly string[],
    scheme: GroundScheme,
): GroundRecord {
    return {
        stops: normalizeGroundStops(stops),
        scheme,
        deriveVersion: GROUND_RECORD_VERSION,
    };
}

/** Shape-validated parse of a persisted record (null on ANY malformation —
 *  the reader falls to the first-visit constants; F-8/N-1/N-3). */
export function parseGroundRecord(raw: string | null): GroundRecord | null {
    if (!raw) return null;
    try {
        const rec: unknown = JSON.parse(raw);
        if (typeof rec !== "object" || rec === null) return null;
        const { stops, scheme, deriveVersion } = rec as Partial<GroundRecord>;
        if (deriveVersion !== GROUND_RECORD_VERSION) return null;
        if (scheme !== "light" && scheme !== "dark") return null;
        if (!Array.isArray(stops) || stops.length !== GROUND_STOP_COUNT)
            return null;
        if (!stops.every((s) => typeof s === "string" && /^#[0-9a-f]{6}$/i.test(s)))
            return null;
        return { stops, scheme, deriveVersion };
    } catch {
        return null;
    }
}
