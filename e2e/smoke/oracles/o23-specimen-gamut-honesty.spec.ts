import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { convertColor } from "../../../dist/subpaths/color.js";
import { parseCssColor } from "../../../dist/subpaths/css.js";

/**
 * X.W6.f · X:CSS-1 gate **f6** — OUT-OF-GAMUT IS MARKED, NEVER PROJECTED,
 * with **(ii) the anti-projection lock**.
 *
 * Born RED (`W6.md:259`, adjudicated L-3): rows printed coordinates that leave
 * their own space's gamut with no mark at all (`data-out-of-gamut` grep → 0), so
 * the browser silently clamped them on paint — the sharpest witness being the
 * HSL row, which resolves to `rgba(255,255,255,0.827)`, pure white, sitting
 * beside a dot painting the true colour.
 *
 * The ruled cure is MARK, never project: a projection would replace an exact
 * statement with a lie, and the un-projected coordinates round-trip losslessly
 * today. So this oracle carries the cure AND its own tripwire:
 *
 *  (i)  THE MARK IS HONEST. Every row's `data-out-of-gamut` is compared against
 *       an INDEPENDENT recomputation in this process, from the seeded colour
 *       through the shipped library — not against the component's own answer.
 *       A mark that is merely present, or merely absent, cannot pass.
 *
 *  (ii) THE ANTI-PROJECTION LOCK, in four legs:
 *         (a) every `form: "css"` caption parses with the shipped parser;
 *         (b) EXACT, no tolerance: every printed coordinate sits within HALF A
 *             UNIT OF ITS OWN LAST PRINTED DIGIT of the true coordinate in that
 *             space. That is precisely "the numbers were digit-budgeted, not
 *             moved" — and it is the leg with no slack to hide in, because a
 *             projection moves a coordinate by whole units (385.3 → 255), which
 *             is thousands of times the resolution it prints at;
 *         (c) the same claim restated in Lab, as the gate words it, against a
 *             MEASURED bound. The run publishes its own worst reading and
 *             carries its own POSITIVE CONTROL: the hex row is the one row whose
 *             8-bit encoding FORCES a clip, and it measures ~40 Lab units of
 *             movement in the same run against ≤0.76 for every un-projected row.
 *             The bound therefore sits with a factor of ~50 either side of it;
 *         (d) a caption MARKED out-of-gamut still PRINTS coordinates outside
 *             that space's bounds. A projected value is inside the gamut by
 *             definition, so the numerals would fall back in range while the
 *             mark stayed on.
 *
 * The seed is the adjudicated failing input, passed in through the URL so the
 * oracle's reference colour is its own input rather than an inherited constant.
 */

const CATALOG_SIZE = 18;
const SEED_COLOR = "lab(92% 88.8 20 / 82.70%)";

/**
 * The declared channel bounds of the gamut-bearing spaces, as the picker's own
 * channel metadata states them. Hue is cyclic and never participates; `null`
 * marks a space with no gamut boundary at all (a reference space, whose slider
 * extents are not a gamut).
 */
const GAMUT_BOUNDS: Record<
    string,
    readonly (readonly [number, number] | null)[] | null
> = {
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
    // Hex is 8-bit sRGB: its encoding FORCES a clip, so the mark is measured on
    // the sRGB coordinates and the printed hex is allowed to be in range.
    hex: [
        [0, 255],
        [0, 255],
        [0, 255],
    ],
};

/**
 * The digit policy's Lab recovery bound for the seeded colour. MEASURED, not
 * chosen: the worst un-projected row is HSL at 0.752 (its saturation is far
 * outside 0..1, so four significant digits resolve it least finely), and the
 * run's own positive control — the hex row, whose encoding forces a clip —
 * measures 40.6 in the same pass. The bound sits between the two.
 */
const LAB_RECOVERY_BOUND = 1.0;

/**
 * A projection's floor, from this run's own clipped row. Nothing may sit
 * between the un-projected rows and this: if a cure starts mapping into gamut,
 * (ii)(c) crosses this line long before it reaches the bound above.
 */
const CLIPPED_CONTROL_FLOOR = 10;

type Row = {
    space: string;
    text: string;
    form: string;
    marked: string;
};

/** The true coordinates of the seeded colour in one space — this process's own. */
function seedChannelsIn(space: string): readonly number[] {
    const parsed = parseCssColor(SEED_COLOR);
    if (!parsed.ok) throw new Error("seed unparseable");
    const converted = convertColor(
        parsed.value,
        (space === "hex" ? "rgb" : space) as never,
    );
    if (!converted.ok) throw new Error(`seed unconvertible to ${space}`);
    return converted.value.channels.map((channel) =>
        typeof channel === "number" ? channel : Number.NaN,
    );
}

/**
 * What the digit policy alone may cost a coordinate. The policy is four
 * significant digits floored at four decimals (`specimen-format.ts`), so its
 * error is at most half a unit in the fourth significant digit OR half a unit in
 * the fourth decimal, whichever is coarser — a bound stated from the policy's
 * two published constants rather than a second copy of the function. A
 * PROJECTION is nothing like this: mapping 385.3 into sRGB moves it to 255, four
 * orders of magnitude past what rounding can account for.
 */
function policyResolution(truth: number): number {
    return Math.max(5e-5, 5e-4 * Math.abs(truth)) * 1.001 + 1e-12;
}

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
    const target = space === "hex" ? "rgb" : space;
    const converted = convertColor(parsed.value, target as never);
    if (!converted.ok) throw new Error(`seed unconvertible to ${space}`);
    return converted.value.channels.some((channel, index) => {
        const bound = bounds[index];
        if (!bound || typeof channel !== "number") return false;
        return channel < bound[0] - 1e-9 || channel > bound[1] + 1e-9;
    });
}

async function openCatalog(page: Page): Promise<Row[]> {
    await page.goto(`/#/?space=oklch&color=${encodeURIComponent(SEED_COLOR)}`);
    const main = page.getByRole("main", { name: "Color tool panes" });
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

test("out-of-gamut rows are marked, and no printed coordinate was projected", async ({
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

        // (ii)(b) EXACT: every printed coordinate sits within what the DIGIT
        //         POLICY alone can account for. Digit-budgeted, not moved.
        const trueChannels = seedChannelsIn(row.space);
        parsed.value.channels.forEach((channel, index) => {
            if (typeof channel !== "number") return;
            const truth = trueChannels[index];
            if (truth === undefined || Number.isNaN(truth)) return;
            expect(
                Math.abs(channel - truth),
                `${row.space} channel ${index} printed ${channel} against ${truth} (${row.text})`,
            ).toBeLessThanOrEqual(policyResolution(truth));
        });

        // (ii)(c) the same claim in Lab, against the measured bound
        expect(delta, `${row.space} Lab recovery (${row.text})`).toBeLessThanOrEqual(
            LAB_RECOVERY_BOUND,
        );

        // (ii)(d) THE LOCK: a marked row still prints outside its own gamut.
        const bounds = GAMUT_BOUNDS[row.space];
        if (row.marked !== "true" || !bounds) continue;
        const outside = parsed.value.channels.some((channel, index) => {
            const bound = bounds[index];
            if (!bound || typeof channel !== "number") return false;
            return channel < bound[0] || channel > bound[1];
        });
        expect(
            outside,
            `${row.space} is MARKED out-of-gamut but prints in-gamut coordinates ` +
                `(${row.text}) — a projection shipped under a green mark`,
        ).toBe(true);
    }

    const unprojected = deltas.filter((row) => row.space !== "hex");
    const worst = unprojected.reduce((a, b) => (b.delta > a.delta ? b : a));
    const control = deltas.find((row) => row.space === "hex");
    console.log(
        `X.W6.f f6(ii) — worst un-projected Lab recovery ${worst.delta.toExponential(3)} ` +
            `(${worst.space}); bound ${LAB_RECOVERY_BOUND}; clipped control (hex) ` +
            `${control?.delta.toExponential(3)}`,
    );
});
