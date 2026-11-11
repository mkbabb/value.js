import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { convertColor } from "../../../dist/subpaths/color.js";
import type { SpaceId } from "../../../dist/subpaths/color.js";
import { parseCssColor } from "../../../dist/subpaths/css.js";

/**
 * X.W6.f · X:CSS-1 gate **f6**, re-cut by the owner's order of 2026-11-09
 * ("too many digits of signif"; the restraint precept: no number a reader
 * cannot use) — OUT-OF-GAMUT IS MARKED; IN-GAMUT IS NEVER MOVED.
 *
 * The seeded colour leaves sRGB. The ruling this gate used to carry printed
 * such rows "as measured": `color(srgb 1.009 …)`, `hsl · 340 · 103.2 · 71.88`,
 * a negative HWB blackness. A space with a gamut now prints the colour as that
 * space can hold it, in its own CSS, the way the hex row's 8-bit encoding
 * always has, and the row keeps its out-of-gamut mark. So:
 *
 *  (i)  THE MARK IS HONEST. Every row's `data-out-of-gamut` is compared
 *       against an INDEPENDENT recomputation in this process.
 *  (ii) (a) every `form: "css"` caption parses with the shipped parser;
 *       (c) an UNMARKED row was rounded, never moved: its Lab recovery sits
 *           under the measured bound, against the hex row's clip as the run's
 *           positive control (tens of Lab units);
 *       (d) a MARKED gamut-bearing row prints coordinates INSIDE its own
 *           bounds: no negative channel, no 103% saturation.
 */

const CATALOG_SIZE = 18;
const SEED_COLOR = "lab(92% 88.8 20 / 82.70%)";

/**
 * The declared channel bounds of the gamut-bearing spaces, as the picker's own
 * channel metadata states them. Hue is cyclic and never participates; `null`
 * marks a space with no gamut boundary at all (a reference space, whose slider
 * extents are not a gamut).
 */
type GamutBounds = readonly (readonly [number, number] | null)[] | null;

/**
 * Keyed TOTALLY by the catalog's 18 members — the library's 17 `SpaceId`s plus
 * `hex` — so this fixture is also the typed witness that a caption's
 * `data-space` names a space the shipped library converts into.
 */
const GAMUT_BOUNDS: Readonly<Record<string, GamutBounds>> = {
    rgb: [
        [0, 255],
        [0, 255],
        [0, 255],
    ],
    hsl: [null, [0, 1], [0, 1]],
    hsv: [null, [0, 1], [0, 1]],
    hwb: [null, [0, 1], [0, 1]],
    lab: null,
    lch: null,
    oklab: null,
    oklch: null,
    xyz: null,
    kelvin: null,
    "srgb-linear": [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    "display-p3": [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    "a98-rgb": [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    "prophoto-rgb": [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    rec2020: [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    ictcp: null,
    jzazbz: null,
    // 4.3.0 (X·P W10 `.m10`): model members the catalog never lists (`listed: false`); the row
    // loop reads only listed spaces, and these bounds mirror the specimen's GAMUT_BEARING.
    "xyz-d50": null,
    "display-p3-linear": [
        [0, 1],
        [0, 1],
        [0, 1],
    ],
    // Hex is 8-bit sRGB: its encoding FORCES a clip, so the mark is measured on
    // the sRGB coordinates and the printed hex is allowed to be in range.
    hex: [
        [0, 255],
        [0, 255],
        [0, 255],
    ],
} satisfies Record<SpaceId | "hex", GamutBounds>;

/** A catalog key the library converts into; `hex` is 8-bit sRGB, read as `rgb`. */
function librarySpace(space: string): SpaceId {
    if (space === "hex") return "rgb";
    if (!isSpaceId(space)) throw new Error(`not a library space: ${space}`);
    return space;
}

function isSpaceId(space: string): space is SpaceId {
    return space !== "hex" && Object.hasOwn(GAMUT_BOUNDS, space);
}

/**
 * The digit policy's Lab recovery bound for an unmarked row. The rounding is
 * perceptual (CHANNEL_DECIMALS), well under one Lab unit; the run's positive
 * control, the hex row's clip, measures about 40. The bound sits between.
 */
const LAB_RECOVERY_BOUND = 1.0;

/** The clipped control's floor: the hex row's clip moves the colour this far. */
const CLIPPED_CONTROL_FLOOR = 10;

type Row = {
    space: string;
    text: string;
    form: string;
    marked: string;
};

function labOf(css: string): readonly number[] {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparseable: ${css}`);
    const lab = convertColor(parsed.value, "lab");
    if (!lab.ok) throw new Error(`unconvertible: ${css}`);
    return lab.value.channels.map((channel) =>
        typeof channel === "number" ? channel : Number.NaN,
    );
}

/** MEASURED, in this process, from the seed — never read back from the page. */
function leavesGamut(space: string): boolean {
    const bounds = GAMUT_BOUNDS[space];
    if (!bounds) return false;
    const parsed = parseCssColor(SEED_COLOR);
    if (!parsed.ok) throw new Error("seed unparseable");
    const converted = convertColor(parsed.value, librarySpace(space));
    if (!converted.ok) throw new Error(`seed unconvertible to ${space}`);
    return converted.value.channels.some((channel, index) => {
        const bound = bounds[index];
        if (!bound || typeof channel !== "number") return false;
        return channel < bound[0] - 1e-9 || channel > bound[1] + 1e-9;
    });
}

async function openCatalog(page: Page): Promise<Row[]> {
    await page.goto(`/#/?space=oklch&color=${encodeURIComponent(SEED_COLOR)}`);
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();
    const trigger = main.getByRole("combobox", { name: "Select color space" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option")).toHaveCount(CATALOG_SIZE);
    return listbox.evaluate((root) =>
        Array.from(root.querySelectorAll<HTMLElement>("[role=option][data-space]")).map(
            (option) => {
                const caption = option.querySelector<HTMLElement>(".specimen-caption");
                return {
                    space: option.getAttribute("data-space") ?? "",
                    text: caption?.textContent?.trim() ?? "",
                    form: caption?.getAttribute("data-specimen-form") ?? "",
                    marked: caption?.getAttribute("data-out-of-gamut") ?? "",
                };
            },
        ),
    );
}

test("out-of-gamut rows are marked and held in their gamut; in-gamut rows are only rounded", async ({
    page,
}) => {
    setupEnvNoise(page);
    const rows = await openCatalog(page);
    expect(rows).toHaveLength(CATALOG_SIZE);

    const seedLab = labOf(SEED_COLOR);
    const deltas: { space: string; delta: number }[] = [];

    console.log(
        [
            `X.W6.f f6 CENSUS — seed ${SEED_COLOR}`,
            ...rows.map(
                (row) =>
                    `  ${row.space.padEnd(13)} ${row.form.padEnd(9)} ` +
                    `${row.marked === "true" ? "MARKED  " : "in-gamut"}  ${row.text}`,
            ),
        ].join("\n"),
    );

    // (i) the mark is honest — every row, compared against this process's own
    //     measurement of the seed colour.
    expect(rows.map((row) => `${row.space}=${row.marked}`)).toEqual(
        rows.map((row) => `${row.space}=${String(leavesGamut(row.space))}`),
    );

    // …and the defect's own five rows are among the marked ones, by name.
    for (const space of ["rgb", "hsl", "hwb", "display-p3", "srgb-linear"]) {
        expect(rows.find((row) => row.space === space)?.marked, `${space} mark`).toBe(
            "true",
        );
    }

    for (const row of rows) {
        expect(["css", "channels"], `${row.space} form`).toContain(row.form);
        if (row.form !== "css") continue;

        // (ii)(a) the declared CSS grammar round-trips the shipped parser
        const parsed = parseCssColor(row.text);
        expect(parsed.ok, `${row.space} parses: ${row.text}`).toBe(true);
        if (!parsed.ok) continue;

        const recovered = labOf(row.text);
        const delta = Math.max(
            ...recovered.map((value, index) => Math.abs(value - (seedLab[index] ?? 0))),
        );
        deltas.push({ space: row.space, delta });

        // The hex row is the run's POSITIVE CONTROL: its 8-bit sRGB encoding
        // forces a clip, so it is the one row whose numbers DO move — and the
        // scale of that movement is what the bound below is calibrated against.
        if (row.space === "hex") {
            expect(
                delta,
                "the hex row is the clipped control and must stay far above the bound",
            ).toBeGreaterThan(CLIPPED_CONTROL_FLOOR);
            continue;
        }

        const bounds = GAMUT_BOUNDS[row.space];
        if (row.marked === "true" && bounds) {
            // (ii)(d) a marked row prints the colour as its space can hold it.
            parsed.value.channels.forEach((channel, index) => {
                const bound = bounds[index];
                if (!bound || typeof channel !== "number") return;
                expect(
                    channel >= bound[0] - 1e-9 && channel <= bound[1] + 1e-9,
                    `${row.space} channel ${index} printed ${channel} outside [${bound}] (${row.text})`,
                ).toBe(true);
            });
            continue;
        }

        // (ii)(c) an unmarked row was rounded, never moved
        expect(delta, `${row.space} Lab recovery (${row.text})`).toBeLessThanOrEqual(
            LAB_RECOVERY_BOUND,
        );
    }

    const unprojected = deltas.filter(
        (row) => row.space !== "hex" && rows.find((r) => r.space === row.space)?.marked !== "true",
    );
    const worst = unprojected.reduce((a, b) => (b.delta > a.delta ? b : a));
    const control = deltas.find((row) => row.space === "hex");
    console.log(
        `X.W6.f f6(ii) — worst un-projected Lab recovery ${worst.delta.toExponential(3)} ` +
            `(${worst.space}); bound ${LAB_RECOVERY_BOUND}; clipped control (hex) ` +
            `${control?.delta.toExponential(3)}`,
    );
});
