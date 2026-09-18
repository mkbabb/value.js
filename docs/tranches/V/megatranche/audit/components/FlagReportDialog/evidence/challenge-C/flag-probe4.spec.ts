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

const DIR =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";

test("P9: settled render, light", async ({ page }) => {
    await seed(page);
    await page.goto("/#/browse");
    await openFlagDialog(page);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: DIR + "flag-settled-light.png" });

    const overlay = await page.evaluate(() => {
        const ov = document.querySelector(
            '[data-slot="dialog-overlay"],[data-slot="modal-overlay"],[data-dismissable-layer] ~ *',
        );
        const all = Array.from(document.querySelectorAll("[data-slot]"))
            .map((e) => e.getAttribute("data-slot"))
            .filter((s) => s && /overlay|scrim/.test(s));
        const ta = document.querySelector(
            '[role="dialog"] textarea',
        ) as HTMLTextAreaElement;
        const tacs = getComputedStyle(ta);
        const desc = document.querySelector(
            '[role="dialog"] p',
        ) as HTMLParagraphElement;
        return {
            overlaySlots: all,
            overlayStyle: ov ? getComputedStyle(ov).backgroundColor : null,
            textareaBg: tacs.backgroundColor,
            textareaBorder: tacs.borderColor,
            textareaColor: tacs.color,
            dialogBg: getComputedStyle(
                document.querySelector('[data-slot="dialog-content"]')!,
            ).backgroundColor,
            dialogBackdrop: getComputedStyle(
                document.querySelector('[data-slot="dialog-content"]')!,
            ).backdropFilter,
            descColor: getComputedStyle(desc).color,
            descFontSize: getComputedStyle(desc).fontSize,
        };
    });
    console.log("=== SURFACE ===\n" + JSON.stringify(overlay, null, 2));

    // Filled state — placeholder gone, no visible label remains.
    await page.locator('[role="dialog"] textarea').fill("hello");
    await page.waitForTimeout(300);
    await page.screenshot({ path: DIR + "flag-settled-filled.png" });
});

test("P10: settled render, mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await seed(page);
    await page.goto("/#/browse");
    await openFlagDialog(page);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: DIR + "flag-settled-mobile.png" });
    const geo = await page.evaluate(() => {
        const d = document.querySelector('[data-slot="dialog-content"]')!;
        const r = d.getBoundingClientRect();
        const close = Array.from(d.querySelectorAll("button")).find((b) =>
            b.textContent?.includes("Close"),
        )!;
        const cr = close.getBoundingClientRect();
        const btns = Array.from(d.querySelectorAll("button[data-slot=button]")).map(
            (b) => {
                const br = b.getBoundingClientRect();
                return {
                    t: b.textContent?.trim(),
                    w: +br.width.toFixed(1),
                    h: +br.height.toFixed(1),
                    y: +br.y.toFixed(1),
                };
            },
        );
        return {
            dialog: {
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
                y: +r.y.toFixed(1),
            },
            close: { w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) },
            buttons: btns,
            docScrollW: document.documentElement.scrollWidth,
            innerW: window.innerWidth,
        };
    });
    console.log("=== MOBILE GEOMETRY ===\n" + JSON.stringify(geo, null, 2));
});
