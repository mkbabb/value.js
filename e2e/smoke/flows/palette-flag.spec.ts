import { userTest as test, expect } from "../fixtures/user-auth";
import { mainPane } from "../fixtures/dock";

/**
 * E.W3 Lane A flow #7 — palette-flag (report a non-owned remote palette).
 *
 * Open Browse → open the menu on a non-owned remote palette → click
 * Report → FlagReportDialog opens → pick a reason radio → click Report
 * → POST /palettes/<slug>/flag fires with `{reason, detail?}` body.
 */
const REMOTE_PALETTE = {
    slug: "shady-spam",
    name: "Shady Spam",
    colors: [{ css: "#f00" }],
    userSlug: "spammer",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

test("flag a remote palette POSTs /palettes/<slug>/flag with reason", async ({
    page,
}) => {
    let flagBody: { reason?: string } | null = null;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [REMOTE_PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/shady-spam/flag", (route) => {
        flagBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ flagged: true }),
        });
    });

    await page.goto("/#/browse");
    const main = mainPane(page);
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    // FlagReportDialog: Spam radio + Report button.
    await page.getByRole("radio", { name: "Spam" }).click();
    await page.getByRole("button", { name: "Report" }).click();
    await expect.poll(() => flagBody?.reason).toBe("spam");
});

/**
 * SS8-0309 (FlagReportDialog C-9, SS-8 B11): every close path — submit, Cancel,
 * Escape — returns focus to the card's `Palette menu` trigger that opened the
 * report. At `df97486e2` all of them landed on <body>.
 */
for (const path of ["submit", "Cancel", "Escape"] as const) {
    test(`SS8-0309: closing the report by ${path} returns focus to the Palette menu trigger`, async ({
        page,
    }) => {
        await page.route("**/palettes?**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: [REMOTE_PALETTE], total: 1, limit: 50, offset: 0 }),
            }),
        );
        await page.route("**/palettes/shady-spam/flag", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ flagged: true }),
            }),
        );

        await page.goto("/#/browse");
        const main = mainPane(page);
        await expect(main).toBeVisible();
        const trigger = main.getByRole("button", { name: /Palette menu/ }).first();
        await trigger.click();
        await page.getByRole("menuitem", { name: /Report/ }).click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        if (path === "submit") {
            await page.getByRole("radio", { name: "Spam" }).click();
            await dialog.getByRole("button", { name: "Report" }).click();
        } else if (path === "Cancel") {
            await dialog.getByRole("button", { name: "Cancel" }).click();
        } else {
            await page.keyboard.press("Escape");
        }

        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });
}
