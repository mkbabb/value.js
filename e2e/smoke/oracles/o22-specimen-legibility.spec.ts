import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * X.W6.f · X:CSS-1 gate **f4** — EVERY SPECIMEN CAPTION FITS ITS BOX.
 *
 * Born RED (`W6.md:257`, adjudicated `registry/adjudicated/ColorSpaceSelector.md`
 * L-2 / G4): **16 of 18 captions overflow, worst 758px in a 234px box**; the
 * failing input is the boot colour's RGB row
 * `rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)` — the raw
 * library serialization, 62 characters, printed into a caption whose own box is
 * ~23 characters wide at the eyebrow rung.
 *
 * The oracle measures the RENDERED caption, never the source string: for each of
 * the catalog's rows it reads `scrollWidth` (the text's true laid-out width) and
 * `clientWidth` (the box the row actually gives it). A caption whose scrollWidth
 * exceeds its clientWidth is ellipsised — the number the user came for is the
 * part that got cut. `truncate` is why the defect is invisible in a screenshot
 * and why this gate must read the two widths rather than look at the row.
 *
 * The census is always printed (pass or fail) so the AFTER reading is a
 * measurement, not an absence of failure — and so the per-character budget the
 * digit policy is sized against is re-derived at every run rather than
 * inherited (L-18 rider 4, citation inheritance).
 */

const CATALOG_SIZE = 18;

type CaptionRow = {
    space: string;
    text: string;
    chars: number;
    clientWidth: number;
    scrollWidth: number;
    fontSize: string;
    letterSpacing: string;
};

export async function openSpaceCatalog(page: Page): Promise<Locator> {
    await page.goto("/");
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();
    const trigger = main.getByRole("combobox", { name: "Select color space" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option")).toHaveCount(CATALOG_SIZE);
    return listbox;
}

export async function captionCensus(listbox: Locator): Promise<CaptionRow[]> {
    return listbox.evaluate((root) =>
        Array.from(root.querySelectorAll<HTMLElement>("[role=option]")).map(
            (option) => {
                const caption = option.querySelector<HTMLElement>(".specimen-caption");
                const style = caption ? getComputedStyle(caption) : null;
                return {
                    space:
                        option.getAttribute("data-space") ??
                        option.textContent?.trim() ??
                        "?",
                    text: caption?.textContent?.trim() ?? "",
                    chars: (caption?.textContent?.trim() ?? "").length,
                    clientWidth: caption?.clientWidth ?? 0,
                    scrollWidth: caption?.scrollWidth ?? 0,
                    fontSize: style?.fontSize ?? "",
                    letterSpacing: style?.letterSpacing ?? "",
                };
            },
        ),
    );
}

test("every specimen caption fits its box", async ({ page }) => {
    setupEnvNoise(page);
    const listbox = await openSpaceCatalog(page);
    const rows = await captionCensus(listbox);

    // §8 — the AFTER frame is taken by the gate that measures it, so witness and
    // measurement can never drift apart.
    await listbox.screenshot({
        path: "docs/tranches/X/waves/W6-evidence/catalog/after-catalog-open.png",
    });

    expect(rows).toHaveLength(CATALOG_SIZE);

    const overflowing = rows.filter((row) => row.scrollWidth > row.clientWidth);
    const worst = rows.reduce((a, b) => (b.scrollWidth > a.scrollWidth ? b : a));
    const budget = rows.reduce((a, b) => (b.clientWidth < a.clientWidth ? b : a));
    const perChar = worst.chars > 0 ? worst.scrollWidth / worst.chars : 0;

    console.log(
        [
            `X.W6.f f4 CENSUS — ${overflowing.length}/${rows.length} captions overflow`,
            `  box (narrowest clientWidth): ${budget.clientWidth}px`,
            `  worst scrollWidth: ${worst.scrollWidth}px (${worst.chars} chars, "${worst.text}")`,
            `  per-character advance: ${perChar.toFixed(3)}px`,
            `  caption type: font-size ${worst.fontSize} letter-spacing ${worst.letterSpacing}`,
            ...rows.map(
                (row) =>
                    `  ${row.scrollWidth > row.clientWidth ? "OVER" : "fits"} ` +
                    `${String(row.scrollWidth).padStart(4)}/${row.clientWidth} px ` +
                    `${String(row.chars).padStart(3)}ch  ${row.text}`,
            ),
        ].join("\n"),
    );

    // Every caption states its whole number. No row may rely on the ellipsis.
    expect(
        overflowing.map(
            (row) => `${row.text} (${row.scrollWidth}px > ${row.clientWidth}px)`,
        ),
    ).toEqual([]);
});
