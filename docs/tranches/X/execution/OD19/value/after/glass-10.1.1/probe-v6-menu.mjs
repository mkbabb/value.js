// glass-10.1.1 live re-read (value): OD19-V6 plate shimmer + the dock menu's z rung
// with the consumer `z-popover` lift retired. Headless chromium, one browser,
// one context per cell, closed in finally. Usage: node probe-v6-menu.mjs <origin> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const [origin, out] = process.argv.slice(2);
const cells = [
    { name: "1440", viewport: { width: 1440, height: 900 } },
    { name: "390", viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
];
const result = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of cells) {
        const ctx = await browser.newContext({ viewport: cell.viewport, hasTouch: !!cell.hasTouch, isMobile: !!cell.isMobile });
        try {
            const page = await ctx.newPage();
            let release;
            const held = new Promise((r) => (release = r));
            await page.route(/\/workbenches\/gradient\/GradientPane\.vue/, async (r) => {
                await held;
                await r.continue().catch(() => {});
            });
            await page.goto(`${origin}/#/`, { waitUntil: "load", timeout: 90_000 });
            await page.getByRole("main", { name: "Home" }).waitFor({ timeout: 60_000 });
            await page.evaluate(() => (location.hash = "#/gradient"));
            const plate = page.locator(".pane-plate[role='status']").first();
            await plate.waitFor({ timeout: 20_000 });
            const read = () =>
                plate.evaluate((el) =>
                    [...el.querySelectorAll(".skeleton")].map((s) => {
                        const a = getComputedStyle(s, "::after");
                        return {
                            shimmer: s.hasAttribute("data-shimmer"),
                            afterAnimation: a.animationName,
                            afterTransform: a.transform,
                            text: s.textContent.trim(),
                        };
                    }),
                );
            const t0 = await read();
            await page.waitForTimeout(400);
            const t1 = await read();
            const plateText = (await plate.innerText()).trim();
            release();
            await page.unrouteAll({ behavior: "ignoreErrors" });
            const v6 = { plateText, ariaBusy: await plate.getAttribute("aria-busy").catch(() => null), t0, t1,
                moving: t0.map((b, i) => b.afterTransform !== t1[i]?.afterTransform) };

            let menu = null;
            if (cell.name === "390") {
                await page.evaluate(() => (location.hash = "#/"));
                const trigger = page.getByRole("button", { name: "Menu" }).first();
                if (await trigger.count()) {
                    await trigger.click();
                    const content = page.locator("[role='menu']").first();
                    await content.waitFor({ timeout: 5000 });
                    menu = await content.evaluate((el) => {
                        const wrap = el.closest("[data-reka-popper-content-wrapper]") ?? el;
                        const r = el.getBoundingClientRect();
                        const hits = [[r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4], [r.left + r.width / 2, r.top + r.height / 2]]
                            .map(([x, y]) => el.contains(document.elementFromPoint(x, y)));
                        return { className: el.className, hasZPopoverClass: /\bz-popover\b/.test(el.className),
                            zIndex: getComputedStyle(el).zIndex, wrapperZ: getComputedStyle(wrap).zIndex,
                            dockZ: getComputedStyle(document.querySelector("[data-glass-dock], .glass-dock") ?? document.body).zIndex,
                            hitsOnMenu: hits };
                    });
                }
            }
            result[cell.name] = { v6, menu };
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(out, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 1).slice(0, 3000));
