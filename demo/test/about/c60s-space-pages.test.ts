/**
 * c60s · FIFTY-THIRD N — the colour-space pages say what the library does.
 *
 * Born red on master 561137225: the catalog titled sRGB "CIE RGB", dated it
 * 1931 and gave it a varying white; Lab's and XYZ's whites were "variable"
 * though value.js fixes them (anchors.ts:180, :369); HWB was dated 1978;
 * Kelvin was created at "Beginning of time"; seven spaces had no guide; the
 * guides wrote hue in turns (`2πh`) where the library keeps degrees
 * (anchors.ts:199-205), credited value.js with Ottosson's analytic gamut
 * mapping it doesn't do (operations.ts:162-189) and with inverting Helland's
 * fit where it searches (anchors.ts:318-330). The roads and the code below
 * did not exist.
 *
 *   1 · facts: the corrected rows hold;
 *   2 · guides: every space has one, and none writes hue in turns or credits
 *       the library with a method it doesn't use;
 *   3 · roads: every space's step-by-step road lands where `convertColor`
 *       lands, and its screen leg on `toRgba8`'s bytes, for a battery of
 *       colours inside and outside sRGB;
 *   4 · code: every value.js block, run as printed, returns what its `// →`
 *       lines say.
 */
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
    convertColor,
    parseCssColor,
    toRgba8,
    type AnyColor,
    type HueInterpolationMethod,
    type SpaceId,
} from "@mkbabb/value.js/color";
import { SPACE_CATALOG } from "../../color-session/space-catalog";
import { resolveColorSpace, type DisplayColorSpace } from "../../color-session/color-model";
import { ROADS, walkRoad } from "../../scenes/about/space-road";
import { formatOut, LIBRARY, partnerFor, spaceBlocks, type Partner } from "../../scenes/about/space-code";

const ROOT = resolve(import.meta.dirname, "../../..");
const SPACES = Object.keys(SPACE_CATALOG) as DisplayColorSpace[];

const BATTERY = [
    "brown",
    "tan",
    "olive",
    "navy",
    "beige",
    "maroon",
    "grey",
    "white",
    "black",
    "oklch(73% 0.185 2)",
    "color(display-p3 1 0 0)",
    "oklch(70% 0.3 145)",
    "lab(50 80 -100)",
    "hsl(200 60% 40%)",
].map((text) => {
    const parsed = parseCssColor(text);
    if (!parsed.ok) throw new Error(`battery colour did not parse: ${text}`);
    return { text, color: parsed.value as AnyColor };
});

const into = (color: AnyColor, space: SpaceId): AnyColor => {
    const out = convertColor(color, space);
    if (!out.ok) throw new Error(`${space}: ${out.error.code}`);
    return out.value as AnyColor;
};
const close = (actual: readonly number[], expected: readonly number[], tolerance: number) =>
    actual.length === expected.length && actual.every((v, i) => Math.abs(v - expected[i]!) <= tolerance * Math.max(1, Math.abs(expected[i]!)));

describe("c60s · 1 · the facts say what value.js does", () => {
    it("sRGB is sRGB: 1996, D65, not CIE RGB of 1931", () => {
        const rgb = SPACE_CATALOG.rgb.info;
        expect(rgb.name).toMatch(/sRGB/);
        expect(rgb.name).not.toMatch(/CIE RGB/);
        expect(rgb.created).toMatch(/^1996/);
        expect(rgb.whitePoint).toBe("D65");
    });
    it("Lab and LCh are D50 (anchors.ts:180); XYZ is D65 (anchors.ts:369)", () => {
        expect(SPACE_CATALOG.lab.info.whitePoint).toMatch(/^D50/);
        expect(SPACE_CATALOG.lch.info.whitePoint).toMatch(/^D50/);
        expect(SPACE_CATALOG.xyz.info.whitePoint).toMatch(/^D65/);
        expect(SPACE_CATALOG["xyz-d50"].info.whitePoint).toBe("D50");
    });
    it("HWB is Smith's 1996 model; HSV makes no claim to perceptual uniformity", () => {
        expect(SPACE_CATALOG.hwb.info.created).toMatch(/^1996/);
        expect(SPACE_CATALOG.hsv.info.definition).not.toMatch(/perceptual uniformity/i);
    });
    it("Kelvin has a date, and its fit is named", () => {
        expect(SPACE_CATALOG.kelvin.info.created).not.toMatch(/beginning of time/i);
        expect(SPACE_CATALOG.kelvin.info.definition).toMatch(/Helland/);
    });
    it("Jzazbz names its four authors, and ICtCp's JND belongs to ΔE ITP", () => {
        expect(SPACE_CATALOG.jzazbz.info.created).toMatch(/Safdar, Cui, Kim and Luo/);
        expect(SPACE_CATALOG.ictcp.info.definition).toMatch(/ΔE ITP/);
    });
    it("every space states its CSS spelling", () => {
        for (const space of SPACES) expect(SPACE_CATALOG[space].info.css, space).not.toBe("");
    });
});

describe("c60s · 2 · every space has a guide, written in degrees", () => {
    const guide = (space: DisplayColorSpace) => resolve(ROOT, "assets/docs", `${space}.md`);
    it("every catalog row carries a guide, and its file exists", () => {
        for (const space of SPACES) {
            expect(SPACE_CATALOG[space].doc, space).not.toBeNull();
            expect(existsSync(guide(space)), `${space}.md`).toBe(true);
        }
    });
    it("no guide writes hue in turns or credits the library with a method it doesn't use", () => {
        for (const space of SPACES) {
            const text = readFileSync(guide(space), "utf8");
            expect(text, `${space}: hue in turns`).not.toMatch(/2\\pi\s*[hH]\b|\{2\\pi\}|H\s*=\s*H\s*\/\s*6|normalized to 0[–-]1|0 to 1 \(representing 0° to 360°\)/);
            expect(text, `${space}: analytic gamut mapping`).not.toMatch(/uses OKLab as the working space for Ottosson's analytical/);
            expect(text, `${space}: inverted fits`).not.toMatch(/Inverts the polynomial/);
            expect(text, `${space}: M1/M2 swap`).not.toMatch(/M_1\^\{-1\} \\begin\{bmatrix\} L/);
        }
    });
});

describe("c60s · 3 · every road lands where convertColor lands", () => {
    it("every offered space has a road", () => {
        for (const space of SPACES) expect(ROADS[space], space).toBeDefined();
    });

    for (const space of SPACES) {
        it(`${space}: the road ends at convertColor's XYZ, the screen leg at toRgba8's bytes`, () => {
            const held = resolveColorSpace(space);
            for (const { text, color } of BATTERY) {
                const inSpace = into(color, held);
                const walk = walkRoad(space, inSpace);
                // Hex starts from whole bytes, as a hex string does.
                const source = space === "hex"
                    ? (parseCssColor(`rgb(${walk.start.values.join(" ")})`) as { ok: true; value: AnyColor }).value
                    : inSpace;
                const xyz = into(source, "xyz").channels as readonly number[];
                const landed = walk.road.length ? walk.road[walk.road.length - 1]! : null;
                if (ROADS[space].toScreen) {
                    // XYZ is the hub: its road is empty and it starts where the others land.
                    if (landed) expect(landed.to, `${space} ${text}: road ends at XYZ`).toBe("XYZ (D65)");
                    const values = (landed ?? walk.start).values;
                    expect(close(values, xyz, 1e-9), `${space} ${text}: ${values} vs ${xyz}`).toBe(true);
                } else {
                    // The sRGB-encoded family goes through encoded sRGB, then on to XYZ.
                    const encoded = walk.road.find((s) => s.to === "sRGB, 0 to 1")!;
                    const rgb = into(source, "rgb").channels as readonly number[];
                    expect(close(encoded.values.map((v) => v * 255), rgb, 1e-9), `${space} ${text}: encoded`).toBe(true);
                    expect(close(landed!.values, xyz, 1e-9), `${space} ${text}: XYZ`).toBe(true);
                }
                if (walk.screen.length) {
                    const bytes = toRgba8(source, { gamut: "clip" });
                    expect(bytes.ok).toBe(true);
                    if (bytes.ok) expect(walk.screen[walk.screen.length - 1]!.values, `${space} ${text}: bytes`).toEqual(bytes.value.slice(0, 3));
                }
            }
        });
    }

    it("a colour outside sRGB is flagged, one inside is not", () => {
        const p3red = BATTERY.find((b) => b.text.startsWith("color(display-p3"))!.color;
        expect(walkRoad("display-p3", into(p3red, "display-p3")).outsideSrgb).toBe(true);
        const brown = BATTERY[0]!.color;
        expect(walkRoad("oklch", into(brown, "oklch")).outsideSrgb).toBe(false);
        expect(walkRoad("rgb", into(brown, "rgb")).outsideSrgb).toBe(false);
    });
});

/**
 * Run a block as printed. The import line is the published subpath's (checked
 * by name); each line followed by `// →` is captured and its value printed
 * with the page's own formatter.
 */
function runBlock(code: string): { actual: string[]; expected: string[]; imports: string[] } {
    const lines = code.split("\n");
    const importLine = lines.find((l) => l.startsWith("import "))!;
    const match = /^import \{ (.+) \} from "@mkbabb\/value\.js\/color";$/.exec(importLine);
    if (!match) throw new Error(`unexpected import: ${importLine}`);
    const imports = match[1]!.split(", ");
    const body: string[] = [];
    const expected: string[] = [];
    const rest = lines.filter((l) => l !== importLine);
    for (let i = 0; i < rest.length; i++) {
        const next = rest[i + 1];
        if (next?.startsWith("// → ")) {
            body.push(`__out.push(${rest[i]!.replace(/;$/, "")});`);
            expected.push(next.slice("// → ".length));
            i++;
        } else body.push(rest[i]!);
    }
    const run = new Function("__lib", "__out", `const { ${imports.join(", ")} } = __lib;\n${body.join("\n")}`);
    const out: unknown[] = [];
    run(LIBRARY, out);
    return { actual: out.map(formatOut), expected, imports };
}

describe("c60s · 4 · every value.js block returns what it prints", async () => {
    const published = await import("@mkbabb/value.js/color");
    const partners: Partner["id"][] = ["white", "black", "opposite", "blue"];
    const hues: HueInterpolationMethod[] = ["shorter", "longer", "increasing", "decreasing"];

    for (const space of SPACES) {
        it(space, () => {
            const held = resolveColorSpace(space);
            BATTERY.forEach(({ text, color }, i) => {
                const inSpace = into(color, held);
                const blocks = spaceBlocks(space, inSpace, SPACE_CATALOG[space].label, partnerFor(partners[i % 4]!, inSpace), hues[i % 4]!);
                expect(blocks.map((b) => b.id)).toEqual(["make", "mix", "css"]);
                for (const block of blocks.filter((b) => b.lang === "javascript")) {
                    const { actual, expected, imports } = runBlock(block.code);
                    for (const name of imports) expect(name in published, `${name} is published`).toBe(true);
                    expect(actual, `${space} ${text} · ${block.id}`).toEqual(expected);
                    expect(expected.length).toBeGreaterThan(0);
                }
                const cssBlock = blocks.find((b) => b.id === "css")!;
                expect(cssBlock.code).toMatch(/background-color: /);
            });
        });
    }
});
