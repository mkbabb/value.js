/**
 * The slider ANNOUNCEMENT grammar (U.W-A11Y · U-F27; the demo-side formatter).
 *
 * Every keyboard/pointer-operable channel slider announces a HUMAN-READABLE,
 * unit-aware value via `aria-valuetext` — "Hue 210°", "Red 128",
 * "Saturation 42%" — instead of the reka primitive's raw ≥16-digit
 * `aria-valuenow` (e.g. `0.5833333333333334`), which a screen reader speaks
 * verbatim. The VALUE half reuses the console meter's exact formatted cell (ONE
 * voice, zero new state); this module owns only the CHANNEL-NAME half.
 *
 * The channel key alone is ambiguous — `b` is Blue in rgb, Blackness in hwb,
 * and the b* axis in lab/oklab; `l` is Lightness in hsl but the L* axis in
 * lab — so the label is resolved per (space, component), space-specific
 * overrides winning over the neutral defaults.
 *
 * The FORMATTER is the demo's; the clean `aria-valuetext` prop-through on the
 * glass-ui `Slider` primitive (so the demo's text reaches the a11y tree without
 * a DOM patch) is a producer RELAY — recorded in the wave close, folded by the
 * modality lane into the single BH addendum.
 */

// The neutral, space-agnostic channel names (rgb-family + the unambiguous keys).
const DEFAULT_LABELS: Record<string, string> = {
    r: "Red",
    g: "Green",
    b: "Blue",
    h: "Hue",
    s: "Saturation",
    l: "Lightness",
    v: "Value",
    c: "Chroma",
    a: "a axis",
    x: "X",
    y: "Y",
    z: "Z",
    kelvin: "Temperature",
    i: "I",
    ct: "Ct",
    cp: "Cp",
    jz: "Jz",
    az: "az axis",
    bz: "bz axis",
    alpha: "Alpha",
};

// Space-specific disambiguation for keys that mean different channels in
// different spaces (the `b`/`l`/`a` collisions).
const PER_SPACE_LABELS: Record<string, Record<string, string>> = {
    hwb: { w: "Whiteness", b: "Blackness" },
    lab: { l: "Lightness", a: "a axis", b: "b axis" },
    oklab: { l: "Lightness", a: "a axis", b: "b axis" },
    lch: { l: "Lightness", c: "Chroma", h: "Hue" },
    oklch: { l: "Lightness", c: "Chroma", h: "Hue" },
    xyz: { x: "X", y: "Y", z: "Z" },
    ictcp: { i: "I", ct: "Ct", cp: "Cp" },
    jzazbz: { jz: "Jz", az: "az axis", bz: "bz axis" },
};

/** The human channel name for a (space, component) — space override wins. */
export function channelLabel(space: string, component: string): string {
    return (
        PER_SPACE_LABELS[space]?.[component] ??
        DEFAULT_LABELS[component] ??
        component.toUpperCase()
    );
}

/**
 * The full `aria-valuetext`: the channel name + the already-formatted,
 * unit-aware meter string (the console's ONE voice). Empty meter → the name
 * alone (never an empty announcement).
 */
export function sliderValueText(
    space: string,
    component: string,
    meterText: string,
): string {
    const label = channelLabel(space, component);
    const value = (meterText ?? "").trim();
    return value ? `${label} ${value}` : label;
}
