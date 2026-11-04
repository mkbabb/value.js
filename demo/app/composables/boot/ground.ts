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
 * The reader (index.html's fouc-guard boot script) runs pre-module, so it
 * cannot import this file. Its CONSTANTS are no longer hand-duplicated: the
 * boot HTML carries `__GROUND_*__` tokens that `plugins/vite-ground-tokens.ts`
 * resolves THROUGH this module at build/serve time (U-F23 · G-CANON-4 — a
 * version bump here propagates to the boot read automatically; no hand-typed
 * constant survives to strand it). Only the guard LOGIC + scheme resolution are
 * mirrored inline — inherent to a pre-module reader — and every VALUE they
 * compare against is single-sourced here.
 *
 * X.W5.a (App L-3) — SPLIT BY LIFETIME: the node-only HTML transform that used
 * to close this file now lives at `plugins/vite-ground-tokens.ts`, beside its
 * two sibling plugins. This module is the RECORD, read and written in the
 * browser; the transform runs in a node process and is imported only by
 * `vite.config.ts`. A module carrying both shipped a build-time function into
 * the app chunk and made the config reach across the demo's boundary to find
 * it.
 * LOCKSTEP CLAUSE 2 — the reader's scheme resolution mirrors useColorMode
 * (the producer darkModeSyncScript semantics): the app persists "auto" by
 * default, so "auto" honors prefers-dark exactly like a missing key
 * (`stored === 'dark' || ((stored === 'auto' || !stored) && prefersDark)`).
 * The T.W4.5 R1 finding was this predicate dropping the 'auto' arm — every
 * returning dark-preference visit booted the LIGHT material and re-themed
 * mid-boot (D3/F-6 breach the first-visit oracles cannot see).
 *
 * Pure module — no Vue. The reactive writer is useAtmosphere's sink.
 */

export const GROUND_STORE_KEY = "color-picker-ground";

/** Bump when the derive's material meaning changes (stale records fall to
 *  the first-visit constants — never a wrong-material paint). A bump propagates
 *  into the pre-module boot guard automatically via `injectGroundTokens`
 *  (U-F23): the boot read no longer carries a hand-typed twin to strand. */
export const GROUND_RECORD_VERSION = 3; // §0hn arm B: dark ground = the held dark-band field (v2 = the seed-faithful dark ground; v1 = the raw dark derive)

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
 * member per scheme. Since §0hk OD-12 the ground is the field's own resolved
 * palette (one derive; the former dark member — the producer's raw dark band,
 * #673255… — is gone). §0hn arm B holds the DARK field on the producer's dark
 * band (glass O-130; `seeded-ground.ts`'s `DARK_FIELD_SEED_FAITHFUL`), so the
 * dark member is that held field's palette and light is the seed-faithful one.
 * The scheme-in-record fouc-guard reads them per scheme.
 *
 * Generated from the LIVE first-visit sink write (`seededGroundStops` for the
 * default model's opaque seed `oklch(73% 0.185 2)`, per scheme). Constant ≡
 * the sink's first write BY CONSTRUCTION, so a first visit never shifts
 * material when the sink lands. Regenerate when the default seed or the derive
 * changes (then bump GROUND_RECORD_VERSION). index.html receives these
 * literals through the build's token injection (`plugins/vite-ground-tokens.ts`)
 * — never by hand.
 */
export const FIRST_VISIT_GROUND: Record<GroundScheme, readonly string[]> = {
    light: ["#df77c2", "#ff83b9", "#ffa6b4", "#ffc3bd"],
    dark: ["#25001d", "#470027", "#6c0028", "#90131b"],
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

/* The build-time projection of these constants into the boot HTML lives at
 * `plugins/vite-ground-tokens.ts` (X.W5.a — the L-3 lifetime split). It retired
 * the former `parseGroundRecord` typed twin, which was DEAD: a pre-module
 * reader can never call it, and its shape-validation logic lives,
 * un-duplicated, in the inline guard whose VALUES the plugin injects. */
