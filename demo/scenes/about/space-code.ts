/**
 * The About page's code: value.js and CSS written for the colour on the page.
 *
 * Every value.js block is real, runnable code against the published
 * `@mkbabb/value.js/color` subpath, and every `// →` line under a call is what
 * that call returns for the colour shown. The page computes those answers by
 * making the same calls (`probe` below); `demo/test/about/c60s-space-pages.test.ts`
 * runs the rendered text itself and holds it to the printed answers, so a block
 * can never print what its code would not.
 */
import {
    a98Rgb,
    convertColor,
    displayP3,
    displayP3Linear,
    hsl,
    hsv,
    hwb,
    ictcp,
    jzazbz,
    kelvin,
    lab,
    lch,
    linearSrgb,
    oklab,
    oklch,
    parseCssColor,
    prophotoRgb,
    rec2020,
    rgb,
    sampleColorRamp,
    serializeCssColor,
    toHex,
    xyz,
    xyzD50,
    type AnyColor,
    type CssColor,
    type HueInterpolationMethod,
    type SpaceId,
} from "@mkbabb/value.js/color";

import { spaceLabel } from "../../color-session/space-catalog";

export type CodeSpace = SpaceId | "hex";

/** The library, by the names the blocks import. */
export const LIBRARY = {
    a98Rgb,
    convertColor,
    displayP3,
    displayP3Linear,
    hsl,
    hsv,
    hwb,
    ictcp,
    jzazbz,
    kelvin,
    lab,
    lch,
    linearSrgb,
    oklab,
    oklch,
    parseCssColor,
    prophotoRgb,
    rec2020,
    rgb,
    sampleColorRamp,
    serializeCssColor,
    toHex,
    xyz,
    xyzD50,
} as const;
type LibraryName = keyof typeof LIBRARY;

const FACTORY: Readonly<Record<SpaceId, LibraryName>> = {
    rgb: "rgb",
    hsl: "hsl",
    hsv: "hsv",
    hwb: "hwb",
    lab: "lab",
    lch: "lch",
    oklab: "oklab",
    oklch: "oklch",
    xyz: "xyz",
    kelvin: "kelvin",
    "srgb-linear": "linearSrgb",
    "display-p3": "displayP3",
    "a98-rgb": "a98Rgb",
    "prophoto-rgb": "prophotoRgb",
    rec2020: "rec2020",
    ictcp: "ictcp",
    jzazbz: "jzazbz",
    "xyz-d50": "xyzD50",
    "display-p3-linear": "displayP3Linear",
};

/** Where each space's first block carries the colour: its nearest neighbour. */
const NEIGHBOUR: Readonly<Record<CodeSpace, SpaceId>> = {
    rgb: "srgb-linear",
    hex: "oklch",
    hsl: "rgb",
    hsv: "hwb",
    hwb: "hsv",
    lab: "lch",
    lch: "lab",
    oklab: "oklch",
    oklch: "oklab",
    xyz: "oklab",
    kelvin: "xyz",
    "srgb-linear": "rgb",
    "display-p3": "rgb",
    "a98-rgb": "display-p3",
    "prophoto-rgb": "xyz-d50",
    rec2020: "display-p3",
    ictcp: "xyz",
    jzazbz: "oklab",
    "xyz-d50": "lab",
    "display-p3-linear": "display-p3",
};

/** CSS's name for interpolating in a space, where CSS has one. */
const CSS_INTERPOLATION: Readonly<Partial<Record<CodeSpace, string>>> = {
    rgb: "srgb",
    hex: "srgb",
    hsl: "hsl",
    hwb: "hwb",
    lab: "lab",
    lch: "lch",
    oklab: "oklab",
    oklch: "oklch",
    xyz: "xyz",
    "srgb-linear": "srgb-linear",
    "display-p3": "display-p3",
    "a98-rgb": "a98-rgb",
    "prophoto-rgb": "prophoto-rgb",
    rec2020: "rec2020",
    "xyz-d50": "xyz-d50",
};

export const POLAR: ReadonlySet<CodeSpace> = new Set<CodeSpace>(["hsl", "hsv", "hwb", "lch", "oklch"]);

/** A number as a code literal: enough digits to mean the colour, no more. */
export function literal(value: number): string {
    if (Number.isInteger(value)) return String(value);
    const abs = Math.abs(value);
    const digits = abs >= 10 ? 2 : abs >= 1 ? 3 : 4;
    return String(Number(value.toFixed(digits)));
}

/** How a `// →` line prints a value: numbers at three places, strings quoted. */
export function formatOut(value: unknown): string {
    if (typeof value === "number") {
        const s = String(Number(value.toFixed(3)));
        return s === "-0" ? "0" : s;
    }
    if (typeof value === "string") return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(formatOut).join(", ")}]`;
    return String(value);
}

export interface Block {
    readonly id: "make" | "mix" | "css";
    readonly lang: "javascript" | "css";
    /** One sentence above the block, saying what it does. */
    readonly lead: string;
    readonly code: string;
}

type Probe = Readonly<{ expr: string; value: unknown }>;

function jsBlock(id: Block["id"], lead: string, names: readonly LibraryName[], setup: readonly string[], probes: readonly Probe[]): Block {
    const imports = [...new Set(names)].sort();
    const lines = [
        `import { ${imports.join(", ")} } from "@mkbabb/value.js/color";`,
        "",
        "// Each call returns { ok, value } or { ok, error }.",
        ...setup,
        "",
        ...probes.flatMap((p) => [`${p.expr};`, `// → ${formatOut(p.value)}`]),
    ];
    return { id, lang: "javascript", lead, code: lines.join("\n") };
}

/** The colour as code literals in its own space, and the same colour rebuilt from them. */
function rounded(space: SpaceId, color: AnyColor): { args: string; color: AnyColor } {
    const parts = color.channels.map((c) => (c === "none" ? '"none"' : literal(c)));
    const values = color.channels.map((c) => (c === "none" ? "none" : Number(literal(c))));
    const factory = LIBRARY[FACTORY[space]] as (...a: unknown[]) => { ok: boolean; value?: AnyColor };
    const made = factory(...values);
    return { args: parts.join(", "), color: made.ok && made.value ? made.value : color };
}

const hexOf = (color: AnyColor) => {
    const out = toHex(color, { gamut: "clip" });
    return out.ok ? out.value : "";
};

const channelsOf = (color: AnyColor, space: SpaceId): unknown => {
    const out = convertColor(color, space);
    return out.ok ? out.value.channels : [];
};

export interface Partner {
    readonly id: "white" | "black" | "opposite" | "blue";
    /** The partner's sRGB bytes. */
    readonly bytes: readonly [number, number, number];
    /** How CSS spells it in a block. */
    readonly css: string;
}

/**
 * The colour's opposite: the same OKLCh lightness and chroma, half a turn
 * round the hue circle, fitted into sRGB (`toHex` clips, the bytes are what a
 * reader can paste).
 */
export function oppositeOf(color: AnyColor): readonly [number, number, number] {
    const ok = convertColor(color, "oklch");
    if (!ok.ok) return [128, 128, 128];
    const [l, c, h] = ok.value.channels;
    const turned = oklch(l === "none" ? 0 : l, c === "none" ? 0 : c, typeof h === "number" ? (h + 180) % 360 : 0);
    if (!turned.ok) return [128, 128, 128];
    const hex = hexOf(turned.value);
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

export function partnerFor(id: Partner["id"], color: AnyColor): Partner {
    switch (id) {
        case "white":
            return { id, bytes: [255, 255, 255], css: "white" };
        case "black":
            return { id, bytes: [0, 0, 0], css: "black" };
        case "blue":
            return { id, bytes: [0, 0, 255], css: "blue" };
        case "opposite": {
            const bytes = oppositeOf(color);
            return { id, bytes, css: `rgb(${bytes.join(" ")})` };
        }
    }
}

/** The ramp the Mixing figure paints, and the block prints. */
export function mixRamp(
    space: SpaceId,
    from: AnyColor,
    partner: Partner,
    count: number,
    hue: HueInterpolationMethod,
): readonly AnyColor[] {
    const to = rgb(...partner.bytes);
    if (!to.ok) return [];
    const ramp = sampleColorRamp(from, to.value, count, POLAR.has(space) ? { space, hue } : { space });
    return ramp.ok ? (ramp.value as readonly AnyColor[]) : [];
}

const KELVIN_STOPS = [1900, 2700, 4000, 5500, 6500, 9000] as const;

/** The CSS spelling of a colour the page can always paint. */
function cssOf(color: AnyColor): string {
    const out = serializeCssColor(color as CssColor);
    return out.ok ? out.value : hexOf(color);
}

/**
 * The three blocks for one space and one colour (held in that space, as the
 * picker holds it). `partner` and `hue` are the Mixing figure's choices, so the
 * second block is the figure's own code.
 */
export function spaceBlocks(
    space: CodeSpace,
    color: AnyColor,
    label: string,
    partner: Partner,
    hue: HueInterpolationMethod,
): readonly Block[] {
    const blocks: Block[] = [];
    const neighbour = NEIGHBOUR[space];
    const neighbourLabel = spaceLabel(neighbour);

    // ── 1 · make it, then move it ──
    let made: AnyColor;
    if (space === "hex") {
        const hex = hexOf(color);
        const parsed = parseCssColor(hex);
        made = parsed.ok ? (parsed.value as AnyColor) : color;
        blocks.push(
            jsBlock(
                "make",
                `Read a hex string, which is sRGB in bytes, and carry it to ${neighbourLabel}.`,
                ["parseCssColor", "convertColor"],
                [`const { value: color } = parseCssColor(${JSON.stringify(hex)});`],
                [
                    { expr: "color.channels", value: made.channels },
                    { expr: `convertColor(color, ${JSON.stringify(neighbour)}).value.channels`, value: channelsOf(made, neighbour) },
                ],
            ),
        );
    } else {
        const r = rounded(space, color);
        made = r.color;
        const factory = FACTORY[space];
        blocks.push(
            jsBlock(
                "make",
                `Make the colour in ${label}, carry it to ${neighbourLabel}, and write it as hex.`,
                [factory, "convertColor", "toHex"],
                [`const { value: color } = ${factory}(${r.args});`],
                [
                    { expr: `convertColor(color, ${JSON.stringify(neighbour)}).value.channels`, value: channelsOf(made, neighbour) },
                    { expr: 'toHex(color, { gamut: "clip" }).value', value: hexOf(made) },
                ],
            ),
        );
    }

    // ── 2 · mix in it (the figure's own call) ──
    if (space === "kelvin") {
        blocks.push(
            jsBlock(
                "mix",
                "Walk the temperatures a photographer knows, from candlelight to shade.",
                ["kelvin", "toHex"],
                [],
                [
                    {
                        expr: `[${KELVIN_STOPS.join(", ")}].map((k) => toHex(kelvin(k).value, { gamut: "clip" }).value)`,
                        value: KELVIN_STOPS.map((k) => {
                            const made = kelvin(k);
                            return made.ok ? hexOf(made.value) : "";
                        }),
                    },
                ],
            ),
        );
    } else {
        const mixSpace: SpaceId = space === "hex" ? "rgb" : space;
        const fromName: LibraryName = space === "hex" ? "parseCssColor" : FACTORY[mixSpace];
        const fromArgs = space === "hex" ? JSON.stringify(hexOf(color)) : rounded(mixSpace, color).args;
        const options = POLAR.has(space) ? `{ space: ${JSON.stringify(mixSpace)}, hue: ${JSON.stringify(hue)} }` : `{ space: ${JSON.stringify(mixSpace)} }`;
        const ramp = mixRamp(mixSpace, made, partner, 5, hue);
        blocks.push(
            jsBlock(
                "mix",
                `Mix toward ${partner.id === "opposite" ? "the opposite hue" : partner.id} in ${label}, five steps, as the figure above does.`,
                [fromName, "rgb", "sampleColorRamp", "toHex"],
                [
                    `const { value: from } = ${fromName}(${fromArgs});`,
                    `const { value: to } = rgb(${partner.bytes.join(", ")});`,
                    `const { value: ramp } = sampleColorRamp(from, to, 5, ${options});`,
                ],
                [{ expr: 'ramp.map((c) => toHex(c, { gamut: "clip" }).value)', value: ramp.map(hexOf) }],
            ),
        );
    }

    // ── 3 · CSS ──
    const keyword = CSS_INTERPOLATION[space];
    if (keyword) {
        const css = space === "hex" ? hexOf(color) : cssOf(made);
        const method = POLAR.has(space) && hue !== "shorter" ? ` ${hue} hue` : "";
        blocks.push({
            id: "css",
            lang: "css",
            lead: `In CSS, the colour itself, a mix and a gradient, both worked in ${label}.`,
            code: [
                ".swatch {",
                `    background-color: ${css};`,
                `    border-color: color-mix(in ${keyword}${method}, ${css}, ${partner.css} 40%);`,
                `    background-image: linear-gradient(in ${keyword}${method}, ${css}, ${partner.css});`,
                "}",
            ].join("\n"),
        });
    } else if (space === "display-p3-linear") {
        blocks.push({
            id: "css",
            lang: "css",
            lead: "In CSS, the colour in its own predefined space.",
            code: [".swatch {", `    background-color: ${cssOf(made)};`, "}"].join("\n"),
        });
    } else {
        const near: SpaceId = space === "hsv" ? "hwb" : space === "kelvin" ? "rgb" : "oklch";
        const converted = convertColor(made, near);
        const css = converted.ok ? cssOf(rounded(near, converted.value as AnyColor).color) : hexOf(made);
        const why =
            space === "hsv"
                ? "CSS has no hsv(); hwb() is the same cylinder, cut by whiteness and blackness."
                : space === "kelvin"
                  ? "CSS has no colour temperature; this is the temperature's sRGB."
                  : `CSS has no ${label} function; this is the same colour in oklch().`;
        blocks.push({
            id: "css",
            lang: "css",
            lead: why,
            code: [".swatch {", `    background-color: ${css};`, "}"].join("\n"),
        });
    }
    return blocks;
}

export { KELVIN_STOPS };
