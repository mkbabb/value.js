/**
 * The runtime custom color-name registry — a self-contained, parse-that-free
 * low-level module (O.W1 S1).
 *
 * BACKGROUND. `parsing/color.ts` historically owned this registry inline, and
 * `units/index.ts:1` re-exported `registerColorNames`/`clearCustomColorNames`/
 * `getCustomColorNames` from there. That re-export dragged the ENTIRE parsing
 * grammar (and transitively `@mkbabb/parse-that`) into the static import closure
 * of `units/index.ts` — and therefore into anything composing the `./color` or
 * `./units` subpaths. The 145 KB monolith could never be tree-shaken because the
 * color/unit surface was statically welded to the parser.
 *
 * THE SEVERANCE. The mutable map + the three register/clear/get functions live
 * here, in the `units/color/` subgraph, which imports ZERO parsing modules. The
 * one coupling the registry has to the parser — invalidating `parseCSSColor`'s
 * memo cache when names change — is inverted via a subscription hook
 * (`onColorNamesChange`): the parser SUBSCRIBES its cache-clear at module load;
 * the registry NOTIFIES on every mutation WITHOUT importing the parser. The
 * dependency edge now points parser → registry (parsing already depends on
 * units), never registry → parser. `./color` reaches this module cleanly; the
 * grammar is gone from its graph.
 */

const customColorNames = new Map<string, string>();

/** Subscribers notified after every registry mutation (the parser's memo-cache
 *  invalidation, registered from `parsing/color.ts`). */
const changeListeners = new Set<() => void>();

/**
 * Subscribe a listener fired after every `registerColorNames` /
 * `clearCustomColorNames` mutation. Returns an unsubscribe function.
 *
 * This is the inversion that severs the registry → parser edge: the parser
 * registers its `parseCSSColor.cache.clear()` here at module load rather than
 * the registry reaching into the parser. The registry stays parse-that-free.
 */
export function onColorNamesChange(listener: () => void): () => void {
    changeListeners.add(listener);
    return () => {
        changeListeners.delete(listener);
    };
}

function notifyColorNamesChanged(): void {
    for (const listener of changeListeners) {
        listener();
    }
}

/**
 * The live custom-name map, exposed for the parser's map-first lookup
 * (`parsing/color.ts` reads it directly on the hot path). Read-only to callers
 * outside this module — mutate ONLY through `registerColorNames` /
 * `clearCustomColorNames` so the change-notification fires.
 */
export function getCustomColorNamesMap(): ReadonlyMap<string, string> {
    return customColorNames;
}

/**
 * Register custom color names that `parseCSSColor` resolves to their CSS value.
 * Names are matched case-insensitively (trimmed + lowercased on both register
 * and lookup).
 *
 * PRECEDENCE — custom names SHADOW built-in CSS color names (N.W7.B-F7). When a
 * registered name collides with a built-in (e.g. `registerColorNames({ red:
 * "#00ff00" })` then `parseCSSColor("red")`), the **custom** value wins — `red`
 * resolves to green. This is by design: the map is consulted before the rich
 * parser, so a registered name always takes precedence over the spec name it
 * collides with. To restore the built-in, `clearCustomColorNames()` (or
 * re-register the name to its canonical value). Names with no built-in
 * collision simply extend the recognised set.
 */
export function registerColorNames(names: Record<string, string>): void {
    for (const [name, css] of Object.entries(names)) {
        customColorNames.set(name.trim().toLowerCase(), css);
    }
    // Custom-name registration changes the resolution of unrecognized inputs;
    // notify subscribers so the parser's fallback memo re-runs.
    notifyColorNamesChanged();
}

export function clearCustomColorNames(): void {
    customColorNames.clear();
    notifyColorNamesChanged();
}

export function getCustomColorNames(): ReadonlyMap<string, string> {
    return customColorNames;
}

// ─── The static CSS named-color table (S.W1 W1-8 data lift) ─────────────────
//
// The 147 CSS named colors + 5 custom project colors, lifted from
// `color/constants.ts` to sit beside the runtime custom-name registry above —
// the cohesion-honest home (all color-NAME data + resolution in one
// parse-that-free module; the `./color` subpath invariant is preserved).
// `parseCSSColor` (`parsing/color.ts`) reads it for O(1) built-in lookup; a
// custom registration SHADOWS a built-in of the same name (see
// `registerColorNames`).
export const COLOR_NAMES = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    transparent: "rgba(0, 0, 0, 0)",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",

    padaleckipink: "oklch(100% 0.42 360deg / 71.70%)",
    "lodge blu color": "rgb(53	101	144)",
    lavendi: "oklch(79.90% 0.11 318.24deg / 100%)",
    shadyshroom: "oklch(53% 0.07 21.60deg / 100%)",
    patriarchalplum: "oklch(31.20% 0.11 19.80deg / 100%)",
    winterwind: "oklch(21.80% 0.28 210.96deg / 82.70%)",
    blackwellberry: "oklch(53.60% 0.35 267.12deg / 100%)",
} as const;
