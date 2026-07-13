import { test, expect } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * T.W6 · O-20 — REGENERATE-INSIDE-PLATE CONTAINMENT (SYNTHESIS §6.1 O-20;
 * the cheapest oracle in the census). W6-5 (T-16 / t-misc-elements F2):
 * the Generate view's one verb joins the specimen plate's own chrome —
 * name — count — regenerate — actions — the seed becomes the plate's
 * bench note, and the orphan toolbar row DIES. This spec is the locator
 * assert that holds the composition there.
 *
 * The second test closes the T-17 seed-exact truth law for the generate
 * preset/harmony strips (t-nav-dropdowns F5 — the Lane D chip-module
 * handoff, routed through Lane N per the intra-wave single-writer clause):
 * the strip a row shows is BYTE-IDENTICAL to the palette selecting it
 * yields — `generatePalette` is pure and mulberry32-seeded, so the stamped
 * `data-stops` of a row and the plate's live swatches after selecting that
 * row are the same rgb() strings. A preview that lies is worse than none.
 */

test.describe("O-20 · the Generate verb joins the plate chrome", () => {
    test("verb, actions, and bench-note seed live INSIDE the plate; the orphan row is dead", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await openView(page, "Generate");

        const plate = page.locator("[data-generate-plate]");
        await expect(plate).toBeVisible();

        // THE CONTAINMENT LAW: the verb is plate chrome.
        const regen = plate.getByRole("button", { name: "Regenerate" });
        await expect(regen).toBeVisible();

        // The orphan is dead: EVERY Regenerate on the page lives inside the
        // plate (page-count ≡ plate-count).
        expect(
            await page.getByRole("button", { name: "Regenerate" }).count(),
        ).toBe(await plate.getByRole("button", { name: "Regenerate" }).count());

        // seed = bench note, INSIDE the plate (provenance label, mono hex).
        const seedNote = plate.getByText(/seed: [0-9a-f]{8}/);
        await expect(seedNote).toBeVisible();

        // The plate's action chrome (the former card-menu verbs, first-class).
        await expect(
            plate.getByRole("button", { name: "Save palette" }),
        ).toBeVisible();
        await expect(
            plate.getByRole("button", { name: "Copy all colors" }),
        ).toBeVisible();

        // The verb ACTS on the plate it lives on: regenerating re-stamps the
        // bench note (a new seed) in place.
        const seedBefore = ((await seedNote.textContent()) ?? "").trim();
        await regen.click();
        await expect(plate.getByText(/seed: [0-9a-f]{8}/)).not.toHaveText(
            seedBefore,
        );
    });

    test("T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await openView(page, "Generate");

        const plate = page.locator("[data-generate-plate]");
        await expect(plate).toBeVisible();

        // Open the Preset menu; every row carries a stamped preview strip.
        await page
            .getByRole("combobox", { name: "Generation preset" })
            .click();
        const listbox = page.getByRole("listbox");
        await expect(listbox).toBeVisible();
        const chips = listbox.locator("[data-stops]");
        expect(
            await chips.count(),
            "every preset row previews its own truth",
        ).toBeGreaterThan(0);

        // Read a NON-selected row's stamp, then select it.
        const target = listbox
            .getByRole("option")
            .filter({ hasText: "Pastel" });
        const stamped = (
            (await target.locator("[data-stops]").getAttribute("data-stops")) ??
            ""
        ).split("|");
        expect(stamped.length).toBeGreaterThanOrEqual(1);
        await target.click();

        // The plate's live swatches ARE the stamped stops — same function,
        // same args, same seed: byte-identical rgb() strings, same order.
        const live = await plate
            .locator(".generate-swatch")
            .evaluateAll((els) =>
                els.map(
                    (el) => getComputedStyle(el as HTMLElement).backgroundColor,
                ),
            );
        expect(live).toEqual(stamped);
    });
});
