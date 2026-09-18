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

async function seed(page: Page) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [P1], total: 1, limit: 50, offset: 0 }),
        }),
    );
}

async function openFlagDialog(page: Page) {
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
}

test("P8: escape + outside-click dismissal, button style parity, screenshot", async ({
    page,
}) => {
    await seed(page);
    await page.goto("/#/browse");
    await openFlagDialog(page);
    await page.waitForTimeout(500);

    // --- button style parity (variant= is not a glass-ui 7 prop) ---
    const styles = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]')!;
        const btns = Array.from(dlg.querySelectorAll("button[data-slot=button]"));
        return btns.map((b) => {
            const cs = getComputedStyle(b);
            return {
                text: b.textContent?.trim(),
                strayVariantAttr: b.getAttribute("variant"),
                emphasis: b.getAttribute("data-emphasis"),
                tone: b.getAttribute("data-tone"),
                bg: cs.backgroundColor,
                color: cs.color,
                border: cs.borderColor,
                classes: b.className,
            };
        });
    });
    console.log("=== BUTTON PARITY ===\n" + JSON.stringify(styles, null, 2));

    await page.screenshot({
        path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/flag-dialog-open.png",
    });

    // --- ESCAPE: trace open state for 2s ---
    await page.locator('[role="dialog"] textarea').click();
    await page.keyboard.press("Escape");
    const trace: any[] = [];
    for (let i = 0; i < 10; i++) {
        trace.push(
            await page.evaluate(() => {
                const d = document.querySelector('[data-slot="dialog-content"]');
                return {
                    present: !!d,
                    state: d?.getAttribute("data-state") ?? null,
                    ariaModal: d?.getAttribute("aria-modal") ?? null,
                };
            }),
        );
        await page.waitForTimeout(200);
    }
    console.log("=== ESCAPE TRACE (200ms steps) ===\n" + JSON.stringify(trace));

    // --- ESCAPE with focus on a radio ---
    const stillOpen = await page.evaluate(
        () => !!document.querySelector('[data-slot="dialog-content"]'),
    );
    if (stillOpen) {
        await page.locator("#reason-spam").focus();
        await page.keyboard.press("Escape");
        await page.waitForTimeout(1000);
        console.log(
            "=== ESCAPE FROM RADIO === present=" +
                (await page.evaluate(
                    () => !!document.querySelector('[data-slot="dialog-content"]'),
                )),
        );
    }

    // --- OUTSIDE CLICK ---
    const present1 = await page.evaluate(
        () => !!document.querySelector('[data-slot="dialog-content"]'),
    );
    if (present1) {
        await page.mouse.click(20, 20);
        await page.waitForTimeout(1000);
        console.log(
            "=== OUTSIDE CLICK === present=" +
                (await page.evaluate(
                    () => !!document.querySelector('[data-slot="dialog-content"]'),
                )),
        );
    }
});
