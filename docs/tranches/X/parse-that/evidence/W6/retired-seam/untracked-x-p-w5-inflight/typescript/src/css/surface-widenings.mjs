// SERVED MODEL: claude-opus-5-5
//
// X.P.W5.g — SC-2 (COHESION §0bx; W5.md ADDENDUM 2026-09-23: "`color(display-p3-linear …)` (widen
// `CssColorSpace` — 2.0.0 is a major)"). THE PACKAGE'S TYPE SURFACE IS 4.0.0'S DECLARATION PLUS A
// DECLARED WIDENING, and both halves stay visible: `build.mjs` byte-copies the sha-pinned 4.0.0
// declaration untouched (`build/value-css-4.0.0.d.ts`) and emits `build/css-surface.d.ts` as that
// copy with EXACTLY the substitutions below applied. Each anchor must occur ONCE in the pinned bytes
// or the build HALTS, so a widening can neither drift onto the wrong line nor silently stop
// applying. Nothing else is re-typed. `CssColor` (a mapped type over `CssColorSpace`, whose
// `Color<S extends SpaceId>` reads `ChannelsBySpace[S]`) widens through its own definition.
//
// Side-effect free, so a test can read the table without running the build.

export const SURFACE_WIDENINGS = Object.freeze([
    Object.freeze({
        ruling: "SC-2",
        why: "css-color-4 §10.4 display-p3-linear — ChannelsBySpace gains its three rgb-like channels",
        find: `"display-p3": readonly [r: Channel, g: Channel, b: Channel];`,
        replace: `"display-p3": readonly [r: Channel, g: Channel, b: Channel];\n    "display-p3-linear": readonly [r: Channel, g: Channel, b: Channel];`,
    }),
    Object.freeze({
        ruling: "SC-2",
        why: "CssColorSpace gains display-p3-linear (the thirteen become fourteen)",
        find: `export declare type CssColorSpace = "rgb" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";`,
        replace: `export declare type CssColorSpace = "rgb" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "srgb-linear" | "display-p3" | "display-p3-linear" | "a98-rgb" | "prophoto-rgb" | "rec2020";`,
    }),
    Object.freeze({
        ruling: "SC-2",
        why: "SpaceId (Color<S>'s bound) gains display-p3-linear, so CssColor's mapped member exists",
        find: `declare type SpaceId = "rgb" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "kelvin" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020" | "ictcp" | "jzazbz";`,
        replace: `declare type SpaceId = "rgb" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "kelvin" | "srgb-linear" | "display-p3" | "display-p3-linear" | "a98-rgb" | "prophoto-rgb" | "rec2020" | "ictcp" | "jzazbz";`,
    }),
]);

/** The pinned bytes with each declared widening applied — exactly once each, or HALT. */
export const widenSurface = (frozenText) => {
    let text = frozenText;
    for (const w of SURFACE_WIDENINGS) {
        const count = text.split(w.find).length - 1;
        if (count !== 1) throw new Error(`HALT: widening ${w.ruling} anchor occurs ${count}× (expected 1) in the pinned declaration:\n  ${w.find}`);
        text = text.replace(w.find, w.replace);
    }
    return text;
};
