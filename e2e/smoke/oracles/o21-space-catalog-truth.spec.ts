import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * X.W6.f · X:CSS-1 gate **f3** — ABOUT STATES TRUE FACTS, NEVER A BARE HEADING.
 *
 * Born RED (`W6.md:256`, adjudicated `registry/adjudicated/ColorSpaceSelector.md`
 * L-1): the product OFFERED 18 spaces, DOCUMENTED 13 and GUIDED 11, and it
 * closed both gaps with fallbacks. Selecting "Display P3" rendered the CIE RGB
 * facts card — "Created: 1931", definition "additive mixture of red, green and
 * blue light" — under the Display P3 title, and the Detailed Guide section
 * rendered its heading over nothing (`h2` childCount 1). False colour science on
 * a first-class route, and a section promising content it did not have.
 *
 * This oracle walks the WHOLE catalog through the live About route and reads the
 * RENDERED cells, not the table the component was handed:
 *
 *  1 · Every offered space renders ITS OWN facts. The sharp test is
 *      DISTINCTNESS: the defect's signature was five rows sharing one card, so
 *      18 offered rows must produce 18 distinct definitions. A fallback of any
 *      shape — one row, five rows, a stub — collapses two rows together and
 *      reds here.
 *  2 · The facts belong to the SELECTED space: the label reads back the space
 *      the switch asked for, so a card can neither lag nor be borrowed.
 *  3 · The adjudicated failing input, named: `display-p3` does not say 1931.
 *  4 · The guide section is never a bare heading. Either a guide body renders,
 *      or the authored "none written" sentence does — and the section SAYS
 *      which, so an empty state is a decision rather than a silence.
 */

const CATALOG_SIZE = 18;

type Facts = {
    space: string;
    definition: string;
    created: string;
    whitePoint: string;
    gamut: string;
    guideState: string;
    guideBody: string;
};

/** The About pane is the right-hand companion of the default Home view. */
async function aboutCard(page: Page): Promise<Locator> {
    await page.goto("/");
    const card = page.locator(".about-card");
    await expect(card).toBeVisible();
    await expect(card.locator("[data-space-facts]")).toBeVisible();
    return card;
}

/** The About host's own copy of the selector (the picker's is `.first()`). */
function aboutTrigger(card: Locator): Locator {
    return card.getByRole("combobox", { name: "Select color space" });
}

/**
 * Open the catalog, act, and wait for it to CLOSE again. reka's Select seals the
 * page behind an overlay while it is open, so a walk that opens the next row
 * before the previous overlay has torn down stalls on the very next click.
 */
async function withCatalog(
    page: Page,
    card: Locator,
    trigger: Locator,
    act: (listbox: Locator) => Promise<void>,
): Promise<void> {
    await card.evaluate((element) => element.scrollTo(0, 0));
    await trigger.click();
    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await act(listbox);
    await expect(listbox).toBeHidden();
}

/** Which space the facts card says it is showing, right now. */
async function facsSpace(card: Locator): Promise<string> {
    return card.evaluate(
        (root) =>
            root
                .querySelector("[data-space-facts]")
                ?.getAttribute("data-space-facts") ?? "",
    );
}

async function readFacts(card: Locator): Promise<Facts> {
    return card.evaluate((root) => {
        const facts = root.querySelector<HTMLElement>("[data-space-facts]");
        const cell = (key: string) =>
            facts
                ?.querySelector<HTMLElement>(`[data-fact="${key}"]`)
                ?.textContent?.trim() ?? "";
        const guide = root.querySelector<HTMLElement>("[data-guide-section]");
        const heading = guide?.querySelector("h2")?.textContent?.trim() ?? "";
        const body = (guide?.textContent ?? "").replace(heading, "").trim();
        return {
            space: facts?.getAttribute("data-space-facts") ?? "",
            definition: cell("definition"),
            created: cell("created"),
            whitePoint: cell("white-point"),
            gamut: cell("gamut"),
            guideState: guide?.getAttribute("data-guide-state") ?? "",
            guideBody: body,
        };
    });
}

test("every offered space states its own facts, and the guide is never a bare heading", async ({
    page,
}) => {
    test.setTimeout(180_000); // eighteen live space switches, one page

    setupEnvNoise(page);
    const card = await aboutCard(page);
    const trigger = aboutTrigger(card);

    // The catalog names its own members — the oracle never restates them.
    let spaces: { id: string; label: string }[] = [];
    await withCatalog(page, card, trigger, async (listbox) => {
        spaces = await listbox.evaluate((list) =>
            Array.from(
                list.querySelectorAll<HTMLElement>("[role=option][data-space]"),
            ).map((option) => ({
                id: option.getAttribute("data-space") ?? "",
                label:
                    option.querySelector(".specimen-name")?.textContent?.trim() ?? "",
            })),
        );
        await page.keyboard.press("Escape");
    });
    expect(spaces).toHaveLength(CATALOG_SIZE);

    const pick = async (label: string) => {
        await card.evaluate((element) => element.scrollTo(0, 0));
        await trigger.click();
        const listbox = page.getByRole("listbox");
        await expect(listbox).toBeVisible();
        await listbox.getByRole("option", { name: label, exact: true }).click();
        return listbox;
    };

    // WARM PASS — the eleven authored guides are lazily imported, and a cold
    // dev-server fetch for one of them is slower than the measured read below
    // is allowed to be. Walk the catalog once with nothing asserted so every
    // guide chunk is resolved and cached; the measured pass then reads a
    // rendered section rather than a pending import.
    for (const { label } of spaces) {
        const listbox = await pick(label);
        await expect(listbox).toBeHidden();
        await expect
            .poll(() => card.evaluate((root) => (root.textContent ?? "").length), {
                timeout: 15_000,
            })
            .toBeGreaterThan(0);
        await page.waitForTimeout(150);
    }

    const census: Facts[] = [];
    const settled: { space: string; held: string }[] = [];
    for (const { id, label } of spaces) {
        const listbox = await pick(label);

        // Read the card IMMEDIATELY: the selection renders on the next tick,
        // the guide chunk is warm, and the URL round-trip below is 300ms away.
        await expect
            .poll(
                async () => {
                    const facts = await readFacts(card);
                    return `${facts.space}|${facts.guideBody.length > 0}`;
                },
                { timeout: 2_000, intervals: [20, 20, 40, 80, 160] },
            )
            .toBe(`${id}|true`);
        census.push(await readFacts(card));

        // §8 — the AFTER frame for the adjudicated failing input, taken by the
        // gate that measures it.
        if (id === "display-p3") {
            await expect(listbox).toBeHidden();
            await card.screenshot({
                path: "docs/tranches/X/waves/W6-evidence/catalog/after-display-p3-about.png",
            });
        }

        await expect(listbox).toBeHidden();

        // Let the model→URL→model round-trip land BEFORE the next selection, so
        // each read above sits inside its own fresh window rather than inheriting
        // the previous row's pending sync. What the model HOLDS after it settles
        // is RECORDED, not asserted — see the note at the foot of this file.
        await page.waitForTimeout(500);
        settled.push({ space: id, held: await facsSpace(card) });
    }

    const reverted = settled.filter((row) => row.held !== row.space);
    console.log(
        [
            `X.W6.f f3 CENSUS — ${census.length} spaces walked on the live About route`,
            ...census.map(
                (row) =>
                    `  ${row.space.padEnd(13)} created=${row.created.padEnd(20)} ` +
                    `guide=${row.guideState.padEnd(14)} ${row.definition.slice(0, 64)}…`,
            ),
            `X.W6.f — spaces that did NOT survive the model→URL→model round-trip: ` +
                (reverted.length
                    ? reverted.map((row) => `${row.space}→${row.held}`).join(", ")
                    : "none") +
                "  [PRE-EXISTING, escalated: see the note at the foot of this file]",
        ].join("\n"),
    );

    // 2 · the card belongs to the space that was selected
    expect(census.map((row) => row.space)).toEqual(spaces.map((entry) => entry.id));

    // 1 · 18 offered rows, 18 distinct facts cards — no row borrows another's
    const definitions = census.map((row) => row.definition);
    expect(definitions.filter((text) => text.length === 0)).toEqual([]);
    expect(new Set(definitions).size).toBe(CATALOG_SIZE);

    // …and no row is a stub: every fact cell carries content
    for (const row of census) {
        expect(row.created, `${row.space} created`).not.toBe("");
        expect(row.whitePoint, `${row.space} white point`).not.toBe("");
        expect(row.gamut, `${row.space} gamut`).not.toBe("");
    }

    // 3 · the adjudicated failing input, by name
    const p3 = census.find((row) => row.space === "display-p3");
    expect(p3, "display-p3 row").toBeDefined();
    expect(p3!.created).not.toBe("1931");
    expect(p3!.definition).not.toBe(
        census.find((row) => row.space === "rgb")?.definition,
    );

    // 4 · the guide section always states something, and says which state it is in
    for (const row of census) {
        expect(["authored", "none-authored"]).toContain(row.guideState);
        expect(row.guideBody.length, `${row.space} guide body`).toBeGreaterThan(0);
    }
});

/**
 * FOOTNOTE — the round-trip revert, measured here and NOT cured here.
 *
 * The walk above records, per space, what the model still holds ~500ms after the
 * selection. Four spaces do not survive it: `hsv`, `kelvin`, `ictcp` and
 * `jzazbz` — exactly the four whose specimen carries `form: "channels"`, because
 * CSS cannot name them. The chain, measured:
 *
 *   1 · `useColorUrl.syncModelToUrl` (300ms debounce) writes the model to the
 *       URL as `?space=ictcp&color=…`, serialising the colour with
 *       `serializePickerColor`, which for a non-CSS space converts to OKLCh —
 *       so the `color` query names a DIFFERENT space than the `space` query;
 *   2 · the `route.query.color` watcher fires `applyUrlToModel`, which writes
 *       that OKLCh string into `model.inputColor`;
 *   3 · `ColorPicker`'s `inputColor` watcher parses it, reads `parsed.space` as
 *       `oklch`, and sets `selectedColorSpace` to OKLCh.
 *
 * Every link is in `demo/color-session/useColorUrl.ts`,
 * `demo/color-session/useColorParsing.ts` and the picker's input watcher, and
 * the precondition — the model's colour living in a non-CSS space — was reached
 * identically before X-W6.f (the deleted `ColorPicker` watcher called the same
 * `updateToColorSpace`, and `ColorPicker`'s `model` IS the App-owned ref About
 * writes). It is PRE-EXISTING and it is not this unit's to cure: `useColorUrl.ts`
 * and `useColorParsing.ts` are outside `W6.md` §4's writable set, so cutting
 * here would be the file-bound expansion §3a forbids. Escalated in the X.W6.f
 * receipt with this measurement.
 *
 * This oracle therefore gates what f3 gates — that every offered space states
 * its OWN facts and that the guide section is never a bare heading — and reports
 * the revert as a number rather than absorbing it or being held hostage to it.
 */
