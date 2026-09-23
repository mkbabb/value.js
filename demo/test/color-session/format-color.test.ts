/**
 * X.W7.f — G16, the display formatting facility (W7.md §6 G16; fold S-16).
 *
 * One exact-string case per register per channel class. The falsifier: change
 * any per-channel decimal in `CHANNEL_DECIMALS` / `INTERCHANGE_DECIMALS` and an
 * exact string below fails. The import census closes the gate's second half:
 * every censused display site inside X.W7.f's bounds reads through the module.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    displayP3,
    hsl,
    ictcp,
    kelvin,
    lab,
    lch,
    oklab,
    oklch,
    rgb,
    xyz,
    type AnyColor,
} from "@mkbabb/value.js/color";
import {
    CHANNEL_DECIMALS,
    LCH_C_COMPACT_RULING,
    formatChannel,
    formatColor,
    formatCssCaption,
    formatExact,
} from "../../color-session/format-color";
import { canonicalColor } from "../../palettes/export/canonical";
import { PICKER_CHANNELS } from "../../color-session/picker-color";

function color(result: { ok: true; value: AnyColor } | { ok: false }): AnyColor {
    if (!result.ok) throw new Error("fixture colour failed to construct");
    return result.value;
}

/** One fixture per channel class, every channel off its register's grid. */
const FIXTURE = {
    rgb8: color(rgb(154.029889788152, 30.5, 30.4999, 0.8266)),
    hueAndFractionPercent: color(hsl(210.4, 0.5555, 0.4321)),
    lab: color(lab(62.3456, -20.1234, 30.9876)),
    lch: color(lch(62.3456, 45.678, 123.456)),
    oklab: color(oklab(0.62345, -0.123456, 0.0876543)),
    oklch: color(oklch(0.62345, 0.123456, 210.4567, 0.5)),
    xyz: color(xyz(0.2345, 0.3456, 0.4567)),
    unitEncoding: color(displayP3(0.123456, 0.654321, 0.5)),
    opponent: color(ictcp(0.4213, -0.0031, 0.0177)),
    kelvin: color(kelvin(6500.4)),
};

const CASES: readonly (readonly [keyof typeof FIXTURE, string, string, string])[] = [
    //  class                    compact                                  caption (X-W6 policy)                     interchange (W51 counts)
    ["rgb8", "rgb(154 31 30 / 83%)", "rgb(154 30.5 30.5 / 82.66%)", "oklch(44.872% 0.15941 26.528deg / 82.66%)"],
    ["hueAndFractionPercent", "hsl(210deg 56% 43%)", "hsl(210.4deg 55.55% 43.21%)", "oklch(52.659% 0.116336 251.499deg)"],
    ["lab", "lab(62.3% -20.1 31)", "lab(62.35% -20.12 30.99)", "oklch(66.636% 0.09876 129.286deg)"],
    ["lch", "lch(62% 46 123deg)", "lch(62.35% 45.68 123.5deg)", "oklch(66.443% 0.121064 130.576deg)"],
    ["oklab", "oklab(62.3% -0.123 0.088)", "oklab(62.34% -0.1235 0.0877)", "oklch(62.345% 0.151409 144.625deg)"],
    ["oklch", "oklch(62.3% 0.123 210deg / 50%)", "oklch(62.34% 0.1235 210.5deg / 50%)", "oklch(62.345% 0.123456 210.457deg / 50%)"],
    ["xyz", "color(xyz 0.23 0.35 0.46)", "color(xyz 0.2345 0.3456 0.4567)", "oklch(68.787% 0.117486 192.838deg)"],
    ["unitEncoding", "color(display-p3 0.1 0.7 0.5)", "color(display-p3 0.1235 0.6543 0.5)", "oklch(63.939% 0.162518 170.128deg)"],
    ["opponent", "oklch(58.8% 0.02 26deg)", "ictcp · 0.4213 · -0.0031 · 0.0177", "oklch(58.776% 0.020037 25.505deg)"],
    ["kelvin", "oklch(99.7% 0.005 97deg)", "kelvin · 6500", "oklch(99.692% 0.00543 96.549deg)"],
];

describe("G16 — the four registers, exact strings per channel class", () => {
    for (const [name, compact, caption, interchange] of CASES) {
        it(`${name}: compact`, () => expect(formatColor(FIXTURE[name], "compact")).toBe(compact));
        it(`${name}: caption`, () => expect(formatColor(FIXTURE[name], "caption")).toBe(caption));
        it(`${name}: interchange`, () => expect(formatColor(FIXTURE[name], "interchange")).toBe(interchange));
    }

    it("exact: the W51 authority itself, untouched (not a wrapper)", () => {
        expect(formatExact).toBe(canonicalColor);
        expect(formatExact({ name: null, l: 62345, c: 123456, h: 210457, a: 500000 })).toBe(
            "oklch(62.345% 0.123456 210.457 / 0.500000)",
        );
    });
});

describe("G16 — the per-channel table", () => {
    it("covers every picker channel of every space (total)", () => {
        for (const [space, metas] of Object.entries(PICKER_CHANNELS)) {
            const row: Record<string, unknown> = CHANNEL_DECIMALS[space as keyof typeof CHANNEL_DECIMALS];
            expect(Object.keys(row).sort(), space).toEqual(metas.map((m) => m.key).sort());
        }
    });

    it("the lch C compact cell is an OWNER-RULING marker, not a number", () => {
        expect(CHANNEL_DECIMALS.lch.c).toBe(LCH_C_COMPACT_RULING);
        expect(typeof CHANNEL_DECIMALS.lch.c).toBe("object");
        expect(LCH_C_COMPACT_RULING.ruling).toMatch(/OWNER-RULING/);
        // total: the shipped per-space value (readoutDecimals("lch") = 0) until ruled
        expect(formatChannel("lch", "c", 45.678)).toBe("46");
    });

    it("formatChannel — compact, display units, unit suffix, no negative zero", () => {
        expect(formatChannel("oklch", "l", 0.62345)).toBe("62.3%");
        expect(formatChannel("oklch", "c", 0.123456)).toBe("0.123");
        expect(formatChannel("oklch", "h", 210.46)).toBe("210°");
        expect(formatChannel("hsl", "s", 0.5555)).toBe("56%");
        expect(formatChannel("rgb", "r", 154.029889788152)).toBe("154");
        expect(formatChannel("lab", "a", -0.04)).toBe("0");
        expect(formatChannel("kelvin", "kelvin", 6500.4)).toBe("6500K");
    });
});

describe("G16 — stored CSS strings in the caption register", () => {
    it("a 12-decimal library spelling reads at the specimen policy", () => {
        expect(formatCssCaption("rgb(154.029889788152 30.5 30.4999)")).toBe("rgb(154 30.5 30.5)");
        expect(formatCssCaption("oklch(0.623456789012 0.123456789012 210.456789012345)")).toBe(
            "oklch(62.35% 0.1235 210.5deg)",
        );
    });
    it("a hex literal keeps its hex spelling", () => {
        expect(formatCssCaption("#ff8800")).toBe("#ff8800");
    });
    it("a string the parser rejects is its own caption (validation is X-W9's)", () => {
        expect(formatCssCaption("not a color")).toBe("not a color");
    });
});

describe("G16 — import census (the sites inside X.W7.f's bounds)", () => {
    const root = path.resolve(import.meta.dirname, "../..");
    const SITES = [
        "color-session/ColorSpaceSelector.vue",
        "workbenches/mix/MixSourceSelector.vue",
        "palettes/browser/card/PaletteCard/PaletteCardMeta.vue",
        "palettes/browser/card/PaletteSpecimen.vue",
    ];
    for (const site of SITES) {
        it(`${site} reads through format-color`, () => {
            const bytes = readFileSync(path.join(root, site), "utf8");
            expect(bytes).toMatch(/from "(?:\.\.\/)*(?:\.\/)?(?:[\w-]+\/)*format-color"/);
            expect(bytes).not.toMatch(/from "\.\/specimen-format"/);
        });
    }
    it("no raw colour string is interpolated into a title or aria-label in MixSourceSelector", () => {
        const bytes = readFileSync(path.join(root, "workbenches/mix/MixSourceSelector.vue"), "utf8");
        expect(bytes).not.toMatch(/:(?:title|aria-label)="[^"]*\$\{(?:sc|color)\.css\}/);
        expect(bytes).not.toMatch(/:title="(?:sc|color)\.css"/);
    });
});
