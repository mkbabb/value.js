import {
    userTest as test,
    expect,
} from "/Users/mkbabb/Programming/value.js/e2e/smoke/fixtures/user-auth";
import type { Page } from "@playwright/test";

const P1 = {
    slug: "shady-spam",
    name: "Shady Spam",
    colors: [{ css: "#f00" }],
    userSlug: "spammer",
    voteCount: 0,
    voted: false,
    isLocal: false,
};
const P2 = {
    slug: "other-palette",
    name: "Other Palette",
    colors: [{ css: "#0f0" }],
    userSlug: "someone-else",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

async function seedTwo(page: Page) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [P1, P2],
                total: 2,
                limit: 50,
                offset: 0,
            }),
        }),
    );
}

async function openFlagDialog(page: Page, cardIndex: number) {
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main
        .getByRole("button", { name: "Palette menu" })
        .nth(cardIndex)
        .click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
}

const describeActive = () =>
    ({
        tag: document.activeElement?.tagName,
        id: (document.activeElement as HTMLElement)?.id || null,
        role: document.activeElement?.getAttribute("role"),
        label: document.activeElement?.getAttribute("aria-label"),
        text: (document.activeElement?.textContent ?? "").trim().slice(0, 30),
    }) as any;

test("P6: focus lifecycle + full dialog markup", async ({ page }) => {
    await seedTwo(page);
    await page.route("**/palettes/shady-spam/flag", (route) =>
        route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({ flagged: true }),
        }),
    );
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await page.waitForTimeout(400);

    const html = await page.evaluate(
        () => document.querySelector('[role="dialog"]')!.outerHTML,
    );
    console.log("=== DIALOG HTML ===\n" + html);

    console.log(
        "=== FOCUS ON OPEN ===\n" +
            JSON.stringify(await page.evaluate(describeActive)),
    );

    // Keyboard-only reachability: tab order inside the dialog.
    const order: any[] = [];
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
        order.push(await page.evaluate(describeActive));
    }
    console.log("=== TAB ORDER ===\n" + JSON.stringify(order, null, 1));

    // Close by Escape; where does focus land?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    console.log(
        "=== FOCUS AFTER ESCAPE ===\n" +
            JSON.stringify(await page.evaluate(describeActive)) +
            " dialogPresent=" +
            (await page.evaluate(() => !!document.querySelector('[role="dialog"]'))),
    );

    // Reopen; close by Cancel.
    await openFlagDialog(page, 0);
    await page.getByRole("button", { name: "Cancel" }).click();
    await page.waitForTimeout(500);
    console.log(
        "=== FOCUS AFTER CANCEL ===\n" +
            JSON.stringify(await page.evaluate(describeActive)),
    );

    // Reopen; submit successfully.
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Spam" }).click();
    await page.getByRole("button", { name: "Report" }).click();
    await page.waitForTimeout(800);
    console.log(
        "=== FOCUS AFTER SUBMIT ===\n" +
            JSON.stringify(await page.evaluate(describeActive)) +
            " dialogPresent=" +
            (await page.evaluate(() => !!document.querySelector('[role="dialog"]'))),
    );

    // Second report of the SAME palette: menu still offers Report.
    const menuStillHasReport = await (async () => {
        const main = page.getByRole("main", { name: "Color tool panes" });
        await main.getByRole("button", { name: "Palette menu" }).nth(0).click();
        const n = await page.getByRole("menuitem", { name: /Report/ }).count();
        await page.keyboard.press("Escape");
        return n;
    })();
    console.log("=== REPORT MENUITEM COUNT AFTER SUCCESSFUL REPORT === " + menuStillHasReport);
});

test("P7: 500-char boundary + whitespace-only detail on the wire", async ({
    page,
}) => {
    await seedTwo(page);
    let body: any = null;
    await page.route("**/palettes/shady-spam/flag", (route) => {
        body = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({ flagged: true }),
        });
    });
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Other" }).click();
    const long = "x".repeat(600);
    await page.getByRole("textbox").fill(long);
    const typed = await page.evaluate(
        () =>
            (document.querySelector('[role="dialog"] textarea') as HTMLTextAreaElement)
                .value.length,
    );
    await page.getByRole("button", { name: "Report" }).click();
    await page.waitForTimeout(600);
    console.log(
        "=== BOUNDARY === typedLen=" +
            typed +
            " sentDetailLen=" +
            (body?.detail?.length ?? "none") +
            " keys=" +
            JSON.stringify(Object.keys(body ?? {})),
    );

    // whitespace-only detail
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Other" }).click();
    await page.getByRole("textbox").fill("     ");
    await page.getByRole("button", { name: "Report" }).click();
    await page.waitForTimeout(600);
    console.log("=== WHITESPACE === body=" + JSON.stringify(body));
});
