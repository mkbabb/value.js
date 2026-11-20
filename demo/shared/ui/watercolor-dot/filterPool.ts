// color-40 L-5: the wet edge as a small page-level POOL of filters, in place of
// one `<filter>` per dot. 121 dots carried 123 filter graphs (inv-swatch p3), and
// mounting a list of 120 swatches cost 10 to 12 frames over 16.7 ms on a desk
// with them, 1 without. Each dot keeps its own seeded silhouette; its wet edge
// is one of POOL_SIZE seeded displacements, picked by the same hash.
//
// The pool is one hidden, zero-size `<svg>` appended to the document on the
// first dot's mount and kept for the page's life (the dots live under the
// app's KeepAlive and come and go; the eight graphs never do). The recipe is
// the dot's own, unchanged: fractal-noise turbulence displacing the source
// graphic, rasterised once and cached (the §H Safari rule: nothing under the
// filter is repainted per frame by the filter's own doing).

export const POOL_SIZE = 8;

/** The pool's seeds: spread over the feTurbulence seed's comfortable range. */
const SEEDS = [17, 53, 89, 127, 163, 199, 229, 251] as const;

const SVG_NS = "http://www.w3.org/2000/svg";
export const POOL_HOST_ID = "watercolor-wet-pool";

/** The id of pool filter `i` (0..POOL_SIZE-1). */
export const poolFilterId = (i: number) => `watercolor-wet-${((i % POOL_SIZE) + POOL_SIZE) % POOL_SIZE}`;

function filterEl(doc: Document, i: number): SVGFilterElement {
    const filter = doc.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", poolFilterId(i));
    // The widened region holds the wet bleed clear of the filter edge (the
    // pre-26.4 WebKit feDisplacementMap tiling-gap mitigation).
    filter.setAttribute("x", "-15%");
    filter.setAttribute("y", "-15%");
    filter.setAttribute("width", "130%");
    filter.setAttribute("height", "130%");
    // linearRGB: smoother edge antialiasing on Chrome and Firefox (WebKit
    // renders SVG filters in sRGB regardless; the small scale keeps it fine).
    filter.setAttribute("color-interpolation-filters", "linearRGB");
    const noise = doc.createElementNS(SVG_NS, "feTurbulence");
    noise.setAttribute("type", "fractalNoise");
    noise.setAttribute("baseFrequency", "0.05");
    noise.setAttribute("numOctaves", "5");
    noise.setAttribute("seed", String(SEEDS[i]));
    noise.setAttribute("stitchTiles", "stitch");
    noise.setAttribute("result", "noise");
    const displace = doc.createElementNS(SVG_NS, "feDisplacementMap");
    displace.setAttribute("in", "SourceGraphic");
    displace.setAttribute("in2", "noise");
    displace.setAttribute("scale", "1.3");
    displace.setAttribute("xChannelSelector", "R");
    displace.setAttribute("yChannelSelector", "G");
    filter.append(noise, displace);
    return filter;
}

/** Mounts the pool once per document; later calls find it. */
export function ensureWatercolorPool(doc: Document = document): void {
    if (doc.getElementById(POOL_HOST_ID)) return;
    const svg = doc.createElementNS(SVG_NS, "svg");
    svg.setAttribute("id", POOL_HOST_ID);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    const defs = doc.createElementNS(SVG_NS, "defs");
    for (let i = 0; i < POOL_SIZE; i++) defs.append(filterEl(doc, i));
    svg.append(defs);
    doc.body.append(svg);
}
