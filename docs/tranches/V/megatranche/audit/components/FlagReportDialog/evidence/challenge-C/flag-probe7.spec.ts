import {
    userTest as test,
    expect,
} from "/Users/mkbabb/Programming/value.js/e2e/smoke/fixtures/user-auth";

const LONG_NAME = "A".repeat(100);
const P1 = {
    slug: "long-name",
    name: LONG_NAME,
    colors: [{ css: "#f00" }],
    userSlug: "spammer",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

const DIR =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";

test("P12: unbounded paletteName in the description", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [P1], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(2500);
    const geo = await page.evaluate(() => {
        const d = document.querySelector('[data-slot="dialog-content"]')!;
        const p = d.querySelector("p")!;
        const r = d.getBoundingClientRect();
        const pr = p.getBoundingClientRect();
        return {
            dialog: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.y.toFixed(1), bottom: +r.bottom.toFixed(1) },
            desc: { w: +pr.width.toFixed(1), h: +pr.height.toFixed(1), scrollW: p.scrollWidth, clientW: p.clientWidth, overflowWrap: getComputedStyle(p).overflowWrap, wordBreak: getComputedStyle(p).wordBreak },
            docScrollW: document.documentElement.scrollWidth,
            innerW: window.innerWidth,
            innerH: window.innerHeight,
            reportBtnVisible: (() => {
                const b = Array.from(d.querySelectorAll("button")).find((x) => x.textContent?.trim() === "Report");
                if (!b) return null;
                const br = b.getBoundingClientRect();
                return { y: +br.y.toFixed(1), inViewport: br.bottom <= window.innerHeight && br.top >= 0 };
            })(),
        };
    });
    console.log("=== LONG NAME GEOMETRY ===\n" + JSON.stringify(geo, null, 2));
    await page.screenshot({ path: DIR + "flag-longname100-mobile.png" });
});
